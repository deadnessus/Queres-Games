// Bento City online: Cloudflare Worker + um Durable Object por sala (código de 4 letras).
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta,
//    nunca um texto digitado;
//  - NÃO existe chat: só passam as mensagens fixas do jogo (posição, veículos, buzina, visual) e as dos
//    modos (estado da brincadeira, mandado só por quem criou a sala, e ações dos jogadores), que levam
//    só números e os códigos dos jogadores (texto é descartado);
//  - guarda só o necessário para a sala existir (nada de IP, nome real ou histórico); a sala some 10 min
//    depois que o último jogador sai;
//  - entra quem tem o código (até 16 jogadores por sala).
//
// Rotas (todas sob /online/bento-city):
//   GET  /saude                     -> { ok: true }
//   POST /nova                      -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar   (WebSocket)        (precisa de login)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const MAX_JOGADORES = 16;
const MAX_BYTES = 4096;
const SALA_EXPIRA_MS = 10 * 60 * 1000;
const BASE = '/online/bento-city';
const TIPOS_REPASSADOS = new Set(['s', 'v', 'vdel', 'honk', 'look', 'm', 'ma']);
// Códigos de jogador que podem aparecer no estado de um modo: os do servidor ('u' + 6) e os robôs ('b0'..'b9').
const ID_JOGADOR_RE = /^(u[0-9a-f-]{6}|b[0-9])$/;

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra } });

function origemPermitida(req, url) {
  const o = req.headers.get('Origin');
  if (!o) return false;
  try {
    const h = new URL(o).hostname;
    return h === url.hostname || h === 'localhost' || h === '127.0.0.1';
  } catch { return false; }
}
const cors = (req, url) => (origemPermitida(req, url)
  ? { 'access-control-allow-origin': req.headers.get('Origin'), 'access-control-allow-credentials': 'true', vary: 'Origin' }
  : {});

async function sha256Hex(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Quem está logado? { id, apelido } ou null. Mesma lógica de functions/_lib/conta.js (só leitura).
async function contaAtual(req, env) {
  if (!env.DB) return null;
  const m = /(?:^|; )qg_sessao=([0-9a-f]{64})/.exec(req.headers.get('cookie') || '');
  if (!m) return null;
  const agora = Math.floor(Date.now() / 1000);
  let linha;
  try {
    linha = await env.DB.prepare(
      'SELECT c.id, c.apelido, s.expira_em FROM sessoes s JOIN contas c ON c.id = s.conta_id WHERE s.token_hash = ?',
    ).bind(await sha256Hex(m[1])).first();
  } catch { return null; }
  if (!linha || linha.expira_em < agora) return null;
  return { id: linha.id, apelido: linha.apelido };
}

function codigoNovo() {
  const b = crypto.getRandomValues(new Uint8Array(4));
  return Array.from(b, (x) => ALFABETO[x % ALFABETO.length]).join('');
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith(BASE + '/')) return new Response('Not found', { status: 404 });
    const rota = url.pathname.slice(BASE.length);

    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: { ...cors(req, url), 'access-control-allow-methods': 'GET, POST', 'access-control-allow-headers': 'content-type' } });
    }
    if (rota === '/saude') return json({ ok: true, banco: !!env.DB }, 200, cors(req, url));

    if (rota === '/nova') {
      if (req.method !== 'POST') return json({ erro: 'método' }, 405);
      if (!origemPermitida(req, url)) return json({ erro: 'pedido recusado' }, 403);
      if (!(await contaAtual(req, env))) return json({ erro: 'entre na sua conta' }, 401, cors(req, url));
      return json({ codigo: codigoNovo() }, 200, cors(req, url));
    }

    const m = /^\/sala\/([A-Za-z0-9]{4})$/.exec(rota);
    if (m) {
      if (req.headers.get('Upgrade') !== 'websocket') return new Response('Expected WebSocket', { status: 426 });
      if (!origemPermitida(req, url)) return new Response('Forbidden', { status: 403 });
      const codigo = m[1].toUpperCase();
      if (!CODIGO_RE.test(codigo)) return new Response('Bad code', { status: 400 });
      const conta = await contaAtual(req, env);
      if (!conta) return new Response('Unauthorized', { status: 401 });
      // O Durable Object só aceita quem passou por aqui: a identidade vai em cabeçalhos que o cliente não controla.
      const interno = new Request(req);
      interno.headers.set('x-qg-conta', String(conta.id));
      interno.headers.set('x-qg-apelido', conta.apelido);
      interno.headers.set('x-qg-codigo', codigo);
      return env.SALAS.get(env.SALAS.idFromName(codigo)).fetch(interno);
    }
    return new Response('Not found', { status: 404 });
  },
};

const numero = (v, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
const limparLook = (l) => (l && typeof l === 'object' && !Array.isArray(l) ? l : {});
const inteiro = (v, min, max, d = 0) => (Number.isInteger(v) && v >= min && v <= max ? v : d);
// Estado de um modo (Pega-pega, Esconde-esconde, Infiltrados): só números inteiros e códigos de jogador.
const limparModo = (m) => ({
  t: 'm',
  d: (Array.isArray(m.d) ? m.d.slice(0, 400) : []).map((n) => (typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : 0)),
  ids: (Array.isArray(m.ids) ? m.ids.slice(0, 24) : []).map((x) => (typeof x === 'string' && ID_JOGADOR_RE.test(x) ? x : '')),
});
// Ação de um jogador num modo (nocautear, reportar, alarme, votar, tarefa): dois números pequenos.
const limparAcao = (m) => ({ t: 'ma', a: inteiro(m.a, 0, 20), p: inteiro(m.p, -1, 30, -1) });

export class Sala {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }

  // Conexões da sala, sem a indicada e sem as que foram recusadas (essas só existem para entregar a mensagem de erro).
  jogadores(menos) {
    return this.ctx.getWebSockets()
      .filter((w) => w !== menos)
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => !a.recusado);
  }

  enviarTodos(msg, menos) {
    const dados = JSON.stringify(msg);
    for (const { w, a } of this.jogadores(menos)) if (a.entrou) { try { w.send(dados); } catch { /* conexão caída */ } }
  }

  async fetch(req) {
    const conta = req.headers.get('x-qg-conta');
    const apelido = req.headers.get('x-qg-apelido');
    const codigo = req.headers.get('x-qg-codigo');
    if (!conta || !apelido || !codigo) return new Response('Forbidden', { status: 403 });
    const modo = new URL(req.url).searchParams.get('modo') === 'criar' ? 'criar' : 'entrar';

    const { 0: cliente, 1: servidor } = new WebSocketPair();
    this.ctx.acceptWebSocket(servidor);
    const recusar = (msg) => {
      try {
        servidor.serializeAttachment({ recusado: true });
        servidor.send(JSON.stringify({ t: 'error', msg }));
        // fecha um instante depois, para a mensagem de erro chegar antes do fechamento
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return new Response(null, { status: 101, webSocket: cliente });
    };

    const outros = this.jogadores(servidor);
    const criada = await this.ctx.storage.get('criada');
    if (modo === 'criar') {
      if (outros.length > 0) return recusar('Esse código já está em uso. Tente criar de novo.');
      await this.ctx.storage.put('criada', { anfitriao: apelido, codigo, em: Date.now() });
    } else if (!criada) {
      return recusar(`Código "${codigo}" não encontrado. Confira com quem criou a partida.`);
    }
    // A mesma conta em outra aba ou aparelho: a conexão antiga sai.
    for (const { w, a } of outros) if (a.conta === conta) { try { w.close(4001, 'outra-aba'); } catch { /* ignorar */ } }
    const presentes = outros.filter(({ a }) => a.conta !== conta).length;
    if (presentes >= MAX_JOGADORES) return recusar(`Essa partida está cheia (${MAX_JOGADORES} jogadores).`);

    servidor.serializeAttachment({ id: 'u' + crypto.randomUUID().slice(0, 6), conta, name: apelido, look: {}, s: null, entrou: false, anfitriao: modo === 'criar' });
    await this.ctx.storage.deleteAlarm();
    return new Response(null, { status: 101, webSocket: cliente });
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES) return;
    // no máximo ~60 mensagens por segundo por jogador
    const agora = Date.now();
    const lim = this.limites.get(ws) || { fichas: 90, t: agora };
    lim.fichas = Math.min(90, lim.fichas + ((agora - lim.t) / 1000) * 60); lim.t = agora;
    if (lim.fichas < 1) { this.limites.set(ws, lim); return; }
    lim.fichas -= 1; this.limites.set(ws, lim);

    let m; try { m = JSON.parse(bruto); } catch { return; }
    if (!m || typeof m.t !== 'string') return;
    const a = ws.deserializeAttachment();
    if (!a || a.recusado) return;

    if (m.t === 'join') {
      if (a.entrou) return;
      a.entrou = true; a.look = limparLook(m.look);
      ws.serializeAttachment(a);
      const criada = (await this.ctx.storage.get('criada')) || {};
      const outros = this.jogadores(ws).filter(({ a: x }) => x.entrou);
      ws.send(JSON.stringify({
        t: 'welcome', id: a.id, room: criada.codigo || '', host: criada.anfitriao || '',
        players: outros.map(({ a: x }) => ({ id: x.id, name: x.name, look: x.look, ...(x.s || {}) })),
      }));
      this.enviarTodos({ t: 'join', id: a.id, name: a.name, look: a.look }, ws);
      return;
    }
    if (!a.entrou || !TIPOS_REPASSADOS.has(m.t)) return; // chat ('c') e qualquer outro tipo são descartados

    if (m.t === 's') { a.s = { x: numero(m.x), y: numero(m.y), z: numero(m.z) }; ws.serializeAttachment(a); }
    else if (m.t === 'look') { a.look = limparLook(m.look); ws.serializeAttachment(a); }
    else if (m.t === 'm') { if (!a.anfitriao) return; m = limparModo(m); } // só quem criou a sala manda o estado do modo
    else if (m.t === 'ma') m = limparAcao(m);
    m.id = a.id;
    this.enviarTodos(m, ws);
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (a && a.recusado) return;
    if (a && a.entrou) this.enviarTodos({ t: 'leave', id: a.id }, ws);
    if (this.jogadores(ws).length === 0) await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS);
  }
  async webSocketClose(ws) { await this.sair(ws); }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (this.jogadores().length === 0) await this.ctx.storage.deleteAll();
  }
}
