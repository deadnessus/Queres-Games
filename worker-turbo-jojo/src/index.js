// Turbo Jojo online: Cloudflare Worker + um Durable Object por corrida (código de 4 letras).
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta,
//    nunca um texto digitado;
//  - NÃO existe chat: só passam as mensagens fixas do jogo (posição dos carros, largada, chegada), e cada
//    campo é reconstruído aqui com números, então nenhum texto livre atravessa o servidor;
//  - a corrida tem 3 fases: SALA DE ESPERA (quem tem o código entra) -> PREPARAÇÃO/CORRIDA (ninguém mais entra)
//    -> FIM. Quem criou a corrida dá a largada; com 6 jogadores ela começa sozinha;
//  - guarda só o necessário para a sala existir (nada de IP, nome real ou histórico); a sala some 10 min
//    depois que o último jogador sai.
//
// Rotas (todas sob /online/turbo-jojo):
//   GET  /saude                     -> { ok: true, banco: true|false }
//   POST /nova                      -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar   (WebSocket)        (precisa de login)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const MAX_CORREDORES = 6; // carros na pista (humanos + rivais do computador)
const MIN_PARA_LARGAR = 2;
const MAX_BYTES = 2048;
const SALA_EXPIRA_MS = 10 * 60 * 1000;
const PREPARO_MAX_MS = 12 * 1000; // espera, no máximo, todos terminarem de montar a pista
const CORRIDA_MAX_MS = 6 * 60 * 1000;
const BASE = '/online/turbo-jojo';
const TEMAS = ['forest', 'city', 'mountain'];
const DIFS = ['easy', 'normal', 'hard'];

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

// ---------- utilidades da corrida ----------
const num = (v, d = 0, casas = 2) => {
  if (typeof v !== 'number' || !Number.isFinite(v)) return d;
  const k = 10 ** casas;
  return Math.round(Math.max(-1e5, Math.min(1e5, v)) * k) / k;
};
const bit = (v) => (v ? 1 : 0);
const escolha = (v, lista, padrao) => (lista.includes(v) ? v : padrao);
const idDeIa = (id) => typeof id === 'string' && /^a[0-4]$/.test(id);

// Visual do carro: só ids da loja (texto curto e seguro). O jogo ignora ids que não conhece.
const idSeguro = (v) => (typeof v === 'string' && /^[a-z_]{1,16}$/.test(v) ? v : '');
const limparLook = (l) => ({ car: idSeguro(l && l.car), skin: idSeguro(l && l.skin), driver: idSeguro(l && l.driver) });

function embaralhar(lista) {
  const a = lista.slice();
  const r = crypto.getRandomValues(new Uint32Array(a.length));
  for (let i = a.length - 1; i > 0; i--) { const j = r[i] % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Fases guardadas em storage: 'espera' | 'preparo' | 'corrida' | 'fim'
const ESTADO_PADRAO = () => ({ fase: 'espera', cfg: { tema: 'sorteio', dif: 'normal', tier: 0 }, ordem: 0, colocados: {}, humanos: [], prontos: [] });

export class Sala {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }

  async estado() { return (await this.ctx.storage.get('estado')) || ESTADO_PADRAO(); }
  async gravar(e) { await this.ctx.storage.put('estado', e); }

  // Conexões da sala, sem a indicada e sem as recusadas (essas só existem para entregar a mensagem de erro).
  jogadores(menos) {
    return this.ctx.getWebSockets()
      .filter((w) => w !== menos)
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => !a.recusado && a.entrou);
  }
  conexoes(menos) { // inclui quem ainda não mandou "join" (para contar a vaga logo ao conectar)
    return this.ctx.getWebSockets()
      .filter((w) => w !== menos)
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => !a.recusado);
  }

  enviarTodos(msg, menos) {
    const dados = JSON.stringify(msg);
    for (const { w } of this.jogadores(menos)) { try { w.send(dados); } catch { /* conexão caída */ } }
  }
  enviar(w, msg) { try { w.send(JSON.stringify(msg)); } catch { /* conexão caída */ } }

  lista() {
    return this.jogadores().sort((x, y) => x.a.ordem - y.a.ordem)
      .map(({ a }) => ({ id: a.id, name: a.name, look: a.look, host: !!a.host }));
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

    const outros = this.conexoes(servidor);
    const criada = await this.ctx.storage.get('criada');
    const estado = await this.estado();
    if (modo === 'criar') {
      if (outros.length > 0 || criada) return recusar('Esse código já está em uso. Tente criar de novo.');
      await this.ctx.storage.put('criada', { anfitriao: apelido, codigo, em: Date.now() });
    } else if (!criada) {
      return recusar(`Código "${codigo}" não encontrado. Confira com quem criou a corrida.`);
    } else if (estado.fase !== 'espera') {
      return recusar('Essa corrida já começou. Só dá para entrar antes da largada.');
    }
    // A mesma conta em outra aba ou aparelho: a conexão antiga sai.
    for (const { w, a } of outros) if (a.conta === conta) { try { w.close(4001, 'outra-aba'); } catch { /* ignorar */ } }
    const presentes = outros.filter(({ a }) => a.conta !== conta).length;
    if (presentes >= MAX_CORREDORES) return recusar(`Essa corrida está cheia (${MAX_CORREDORES} corredores).`);

    estado.ordem += 1;
    await this.gravar(estado);
    const primeiro = modo === 'criar';
    servidor.serializeAttachment({
      id: 'u' + crypto.randomUUID().slice(0, 6), conta, name: apelido, look: {}, entrou: false,
      ordem: estado.ordem, host: primeiro,
    });
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

    if (m.t === 'join') return this.entrar(ws, a, m);
    if (!a.entrou) return;

    // Posição do próprio carro: reconstruída campo a campo (só números) e repassada.
    if (m.t === 'p') {
      this.enviarTodos({
        t: 'p', id: a.id, s: num(m.s, 0, 1), d: num(m.d), h: num(m.h, 0, 3), y: num(m.y), pi: num(m.pi, 0, 3),
        v: num(m.v, 0, 1), sa: num(m.sa, 0, 2), st: num(m.st, 0, 2), c: bit(m.c), im: bit(m.im),
      }, ws);
      return;
    }
    // Posição dos rivais do computador: só quem criou a corrida (ou herdou) os dirige.
    if (m.t === 'a') {
      if (!a.host || !Array.isArray(m.l)) return;
      const l = m.l.slice(0, 5).map((x) => (Array.isArray(x) ? [
        Math.max(0, Math.min(4, Math.floor(num(x[0])))), num(x[1], 0, 1), num(x[2]), num(x[3], 0, 3), num(x[4]),
        num(x[5], 0, 3), num(x[6], 0, 1), num(x[7], 0, 2), num(x[8], 0, 2), bit(x[9]), bit(x[10]),
      ] : null)).filter(Boolean);
      this.enviarTodos({ t: 'a', l }, ws);
      return;
    }

    const estado = await this.estado();
    if (m.t === 'look') { a.look = limparLook(m.look); ws.serializeAttachment(a); this.enviarTodos({ t: 'look', id: a.id, look: a.look }, ws); return; }
    if (m.t === 'cfg') return this.configurar(a, m, estado);
    if (m.t === 'start') {
      if (!a.host || estado.fase !== 'espera') return;
      if (this.jogadores().length < MIN_PARA_LARGAR) { this.enviar(ws, { t: 'aviso', msg: 'Espere pelo menos mais um amigo entrar.' }); return; }
      return this.largar(estado);
    }
    if (m.t === 'ready') return this.pronto(a, estado);
    if (m.t === 'fin') return this.chegou(a, m, estado);
  }

  async entrar(ws, a, m) {
    if (a.entrou) return;
    a.entrou = true; a.look = limparLook(m.look);
    ws.serializeAttachment(a);
    const criada = (await this.ctx.storage.get('criada')) || {};
    const estado = await this.estado();
    this.enviar(ws, {
      t: 'welcome', id: a.id, room: criada.codigo || '', max: MAX_CORREDORES, min: MIN_PARA_LARGAR,
      host: a.host, cfg: estado.cfg, players: this.lista(),
    });
    this.enviarTodos({ t: 'join', id: a.id, name: a.name, look: a.look, host: !!a.host }, ws);
    // Chegou ao limite de corredores: a corrida começa sozinha.
    if (estado.fase === 'espera' && this.jogadores().length >= MAX_CORREDORES) await this.largar(estado);
  }

  async configurar(a, m, estado) {
    if (!a.host || estado.fase !== 'espera') return;
    estado.cfg = {
      tema: m.tema === 'sorteio' ? 'sorteio' : escolha(m.tema, TEMAS, estado.cfg.tema),
      dif: escolha(m.dif, DIFS, estado.cfg.dif),
      tier: Math.max(0, Math.min(4, Math.floor(num(m.tier, estado.cfg.tier)))),
    };
    await this.gravar(estado);
    this.enviarTodos({ t: 'cfg', cfg: estado.cfg });
  }

  // Fase de preparo: todos montam a mesma pista e avisam "ready"; só então acendem as luzes.
  async largar(estado) {
    const humanos = this.lista();
    const naIa = MAX_CORREDORES - humanos.length;
    const ids = humanos.map((h) => h.id).concat(Array.from({ length: naIa }, (_, i) => 'a' + i));
    const vagas = embaralhar([0, 1, 2, 3, 4, 5]);
    const grade = {};
    ids.forEach((id, i) => { grade[id] = vagas[i]; });
    const tema = estado.cfg.tema === 'sorteio' ? TEMAS[crypto.getRandomValues(new Uint32Array(1))[0] % TEMAS.length] : estado.cfg.tema;
    const semente = (crypto.getRandomValues(new Uint32Array(1))[0] % 2147483646) + 1;
    estado.fase = 'preparo';
    estado.humanos = humanos.map((h) => h.id);
    estado.prontos = [];
    estado.colocados = {};
    estado.colocadosN = 0;
    estado.inicio = Date.now();
    await this.gravar(estado);
    await this.ctx.storage.setAlarm(Date.now() + PREPARO_MAX_MS);
    this.enviarTodos({
      t: 'go', semente, tema, dif: estado.cfg.dif, tier: estado.cfg.tier, grade, ias: naIa,
      players: humanos,
    });
  }

  async pronto(a, estado) {
    if (estado.fase !== 'preparo' || estado.prontos.includes(a.id)) return;
    estado.prontos.push(a.id);
    await this.gravar(estado);
    const presentes = this.jogadores().map(({ a: x }) => x.id);
    if (presentes.every((id) => estado.prontos.includes(id))) await this.luzes(estado);
  }

  async luzes(estado) {
    if (estado.fase !== 'preparo') return;
    estado.fase = 'corrida';
    estado.largada = Date.now();
    await this.gravar(estado);
    await this.ctx.storage.setAlarm(Date.now() + CORRIDA_MAX_MS);
    this.enviarTodos({ t: 'lights' });
  }

  // Quem cruzou a linha. A ordem de chegada ao servidor decide o lugar de cada um.
  async chegou(a, m, estado) {
    if (estado.fase !== 'corrida') return;
    let id = a.id;
    if (idDeIa(m.id)) { if (!a.host) return; id = m.id; } else if (m.id && m.id !== a.id) return;
    if (estado.colocados[id]) return;
    estado.colocadosN = (estado.colocadosN || 0) + 1;
    estado.colocados[id] = estado.colocadosN;
    await this.gravar(estado);
    this.enviarTodos({ t: 'placed', id, place: estado.colocadosN });
    await this.verFim(estado);
  }

  async verFim(estado) {
    if (estado.fase !== 'corrida') return;
    const faltam = this.jogadores().filter(({ a }) => estado.humanos.includes(a.id) && !estado.colocados[a.id]);
    if (faltam.length === 0) await this.terminar(estado);
  }

  async terminar(estado) {
    if (estado.fase === 'fim') return;
    estado.fase = 'fim';
    await this.gravar(estado);
    this.enviarTodos({ t: 'over' });
    await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS);
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (!a || a.recusado) return;
    if (!a.entrou) return;
    const restantes = this.jogadores(ws);
    const estado = await this.estado();
    // Quem criou saiu: o próximo da fila vira o dono (e passa a dirigir os rivais do computador).
    let novoDono = null;
    if (a.host && restantes.length > 0) {
      restantes.sort((x, y) => x.a.ordem - y.a.ordem);
      const n = restantes[0];
      n.a.host = true; n.w.serializeAttachment(n.a);
      novoDono = n.a.id;
    }
    this.enviarTodos({ t: 'leave', id: a.id, host: novoDono }, ws);
    if (restantes.length === 0) { await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS); return; }
    if (estado.fase === 'preparo') {
      const ids = restantes.map(({ a: x }) => x.id);
      if (ids.every((id) => estado.prontos.includes(id))) await this.luzes(estado);
    } else if (estado.fase === 'corrida') {
      // a conexão que saiu ainda aparece em getWebSockets durante o evento: marca como colocada para não travar o fim
      estado.colocados[a.id] = estado.colocados[a.id] || -1;
      const faltam = restantes.filter(({ a: x }) => estado.humanos.includes(x.id) && !estado.colocados[x.id]);
      if (faltam.length === 0) await this.terminar(estado);
      else await this.gravar(estado);
    }
  }
  async webSocketClose(ws) { await this.sair(ws); }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (this.jogadores().length === 0) { await this.ctx.storage.deleteAll(); return; }
    const estado = await this.estado();
    if (estado.fase === 'preparo') await this.luzes(estado); // alguém demorou: largam os que estão prontos
    else if (estado.fase === 'corrida') await this.terminar(estado);
  }
}
