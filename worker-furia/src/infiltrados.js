// Infiltrados na Órbita online. Roda DENTRO do Worker do Fúria (furia-online), que já está publicado e
// é atualizado sozinho a cada merge na main; o index.js do Fúria manda para cá tudo o que chega em
// /online/infiltrados/. Salas próprias (Durable Object SalaInfiltrados, ligação SALAS_INF): nada é dividido
// com as partidas do Fúria. A cópia em worker-infiltrados/ é a mesma lógica como Worker separado.
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta,
//    nunca um texto digitado;
//  - NÃO existe chat: tudo o que os jogadores mandam ("p" = o próprio tripulante, "g" = o estado da partida,
//    que só o celular do anfitrião monta) só pode ter NÚMEROS; qualquer texto faz a mensagem ser descartada.
//    Os nomes saem da lista que este servidor manda (apelidos das contas) e as falas dos robôs são códigos;
//  - o servidor só repassa: guarda na memória a última mensagem de cada jogador, para quem chegar depois ver
//    a sala na hora. Quem chega com a partida em andamento assiste e joga na próxima rodada;
//  - até 16 tripulantes jogam (o jogo controla isso); o servidor aceita até 20 conexões (as 4 extras assistem);
//  - guarda só o necessário para a sala existir (nada de IP, nome real ou histórico); a sala some 10 min
//    depois que o último jogador sai.
//
// Rotas (todas sob /online/infiltrados):
//   GET  /saude                              -> { ok: true, banco: true|false }
//   POST /nova                               -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar    (WebSocket)                (precisa de login)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const MAX_CONEXOES = 20;
const MAX_BYTES = 16 * 1024;
const MAX_NUMEROS_P = 120;   // um tripulante: posição, cor, roupas, voto, últimas ações
const MAX_NUMEROS_G = 2500;  // estado da partida (só do anfitrião)
const MAX_NIVEL = 5;         // listas dentro de listas
const SALA_EXPIRA_MS = 10 * 60 * 1000;
const BASE = '/online/infiltrados';

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

export async function fetchInfiltrados(req, env) {
  {
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
      return env.SALAS_INF.get(env.SALAS_INF.idFromName(codigo)).fetch(interno);
    }
    return new Response('Not found', { status: 404 });
  }
}

// Só números (em listas de até MAX_NIVEL níveis). Devolve a quantidade de números, ou -1 se houver qualquer outra coisa.
function contarNumeros(v, nivel = 0) {
  if (typeof v === 'number') return Number.isFinite(v) ? 1 : -1;
  if (!Array.isArray(v) || nivel >= MAX_NIVEL) return -1;
  let n = 0;
  for (const x of v) { const c = contarNumeros(x, nivel + 1); if (c < 0) return -1; n += c; }
  return n;
}

export class SalaInfiltrados {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
    this.ultimas = new Map();     // id -> { p, g }: última mensagem de cada jogador (só em memória)
  }

  jogadores(menos) {
    return this.ctx.getWebSockets()
      .filter((w) => w !== menos)
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => !a.recusado && a.entrou);
  }
  conexoes(menos) {
    return this.ctx.getWebSockets()
      .filter((w) => w !== menos)
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => !a.recusado);
  }
  enviarTodos(msg, menos) {
    const dados = typeof msg === 'string' ? msg : JSON.stringify(msg);
    for (const { w } of this.jogadores(menos)) { try { w.send(dados); } catch { /* conexão caída */ } }
  }
  enviar(w, msg) { try { w.send(typeof msg === 'string' ? msg : JSON.stringify(msg)); } catch { /* conexão caída */ } }

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
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return new Response(null, { status: 101, webSocket: cliente });
    };

    const outros = this.conexoes(servidor);
    const criada = await this.ctx.storage.get('criada');
    if (modo === 'criar') {
      if (outros.length > 0 || criada) return recusar('Esse código já está em uso. Tente criar de novo.');
      await this.ctx.storage.put('criada', { codigo, em: Date.now() });
    } else if (!criada) {
      return recusar(`Sala "${codigo}" não encontrada. Confira o código com quem criou.`);
    }
    // A mesma conta em outra aba: a conexão antiga sai.
    for (const { w, a } of outros) if (a.conta === conta) { try { w.close(4001, 'outra-aba'); } catch { /* ignorar */ } }
    const presentes = outros.filter(({ a }) => a.conta !== conta).length;
    if (presentes >= MAX_CONEXOES) return recusar(`Essa sala está cheia (${MAX_CONEXOES} pessoas).`);

    const ordem = ((await this.ctx.storage.get('ordem')) || 0) + 1; // número de cada jogador nesta sala
    await this.ctx.storage.put('ordem', ordem);
    const nomes = (await this.ctx.storage.get('nomes')) || {};
    nomes[ordem] = apelido; // para quem chegar depois ainda ver o nome de quem já saiu
    await this.ctx.storage.put('nomes', nomes);
    servidor.serializeAttachment({ id: ordem, conta, name: apelido, entrou: false });
    await this.ctx.storage.deleteAlarm();
    return new Response(null, { status: 101, webSocket: cliente });
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES) return;
    const agora = Date.now();
    const lim = this.limites.get(ws) || { fichas: 60, t: agora };
    lim.fichas = Math.min(60, lim.fichas + ((agora - lim.t) / 1000) * 40); lim.t = agora;
    if (lim.fichas < 1) { this.limites.set(ws, lim); return; }
    lim.fichas -= 1; this.limites.set(ws, lim);

    let m; try { m = JSON.parse(bruto); } catch { return; }
    if (!m || typeof m.t !== 'string') return;
    const a = ws.deserializeAttachment();
    if (!a || a.recusado) return;

    if (m.t === 'join') return this.entrar(ws, a);
    if (!a.entrou) return;

    if (m.t === 'p' || m.t === 'g') {
      const n = contarNumeros(m.d);
      if (n < 0 || n > (m.t === 'p' ? MAX_NUMEROS_P : MAX_NUMEROS_G)) return;
      const u = this.ultimas.get(a.id) || { p: null, g: null };
      u[m.t] = m.d; this.ultimas.set(a.id, u);
      this.enviarTodos(JSON.stringify({ t: m.t, id: a.id, d: m.d }), ws);
    }
  }

  async entrar(ws, a) {
    if (a.entrou) return;
    a.entrou = true;
    ws.serializeAttachment(a);
    const criada = (await this.ctx.storage.get('criada')) || {};
    const nomes = (await this.ctx.storage.get('nomes')) || {};
    const lista = this.jogadores().map(({ a: x }) => ({ id: x.id, name: x.name }));
    // quem já saiu também vai na lista de nomes (sem estar na sala), para a partida mostrar o apelido certo
    const antigos = Object.entries(nomes).map(([id, name]) => ({ id: +id, name })).filter((x) => !lista.some((y) => y.id === x.id));
    this.enviar(ws, { t: 'welcome', id: a.id, room: criada.codigo || '', players: lista, nomes: antigos });
    this.enviarTodos({ t: 'join', id: a.id, name: a.name }, ws);
    // o que cada um mandou por último, para quem chegou ver a sala na hora
    for (const { a: x } of this.jogadores(ws)) {
      const u = this.ultimas.get(x.id);
      if (!u) continue;
      if (u.p) this.enviar(ws, { t: 'p', id: x.id, d: u.p });
      if (u.g) this.enviar(ws, { t: 'g', id: x.id, d: u.g });
    }
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (!a || a.recusado || !a.entrou) return;
    a.entrou = false; a.recusado = true; ws.serializeAttachment(a);
    this.ultimas.delete(a.id);
    this.enviarTodos({ t: 'leave', id: a.id }, ws);
    if (this.jogadores(ws).length === 0) await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS);
  }
  async webSocketClose(ws) { await this.sair(ws); }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (this.jogadores().length === 0) await this.ctx.storage.deleteAll();
  }
}
