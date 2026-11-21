// Fúria online: Cloudflare Worker + um Durable Object por partida (código de 4 letras).
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta,
//    nunca um texto digitado;
//  - NÃO existe chat: os controles (de quem entrou) e as "fotos" do jogo (de quem criou) só podem ter NÚMEROS;
//    qualquer texto é recusado aqui, então nada escrito atravessa o servidor. O visual do personagem só aceita
//    valores das listas do jogo;
//  - a partida tem 3 fases: SALA DE ESPERA (quem tem o código entra) -> PREPARO/JOGO (ninguém mais entra) -> FIM.
//    Quem criou escolhe o modo (Luta 1x1, Luta 2x2 ou Battlefield) e os times, e dá a largada; com a sala cheia
//    para o modo escolhido a partida começa sozinha;
//  - o celular de quem criou roda o jogo de verdade (bots, golpes, tiros); os outros mandam os controles e
//    recebem as fotos do jogo. Se quem criou sair durante a partida, ela acaba para todos;
//  - guarda só o necessário para a sala existir (nada de IP, nome real ou histórico); a sala some 10 min
//    depois que o último jogador sai.
//
// Rotas (todas sob /online/furia):
//   GET  /saude                     -> { ok: true, banco: true|false }
//   POST /nova                      -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar   (WebSocket)        (precisa de login)

import { fetchInfiltrados, SalaInfiltrados } from './infiltrados.js';
export { SalaInfiltrados };
import { fetchOrigines, SalaOrigines } from './origines.js';
export { SalaOrigines };

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const MAX_SALA = 8;
const MODOS = { luta1: { max: 2 }, luta2: { max: 4 }, bf: { max: 8 } };
const MIN_PARA_COMECAR = 2;
const MAX_BYTES = 48 * 1024;
const MAX_NUMEROS_FOTO = 6000;
const MAX_NUMEROS_CONTROLE = 40;
const SALA_EXPIRA_MS = 10 * 60 * 1000;
const PREPARO_MAX_MS = 15 * 1000;
const PARTIDA_MAX_MS = 45 * 60 * 1000;
const BASE = '/online/furia';

const CLASSES = ['guerreiro', 'ninja', 'tanque', 'mago'];
const ELEMENTOS = ['fogo', 'gelo', 'raio', 'terra'];
const CHAPEUS = ['nenhum', 'capacete', 'bandana', 'chapeu', 'chifres', 'coroa'];
const COR_RE = /^#[0-9a-f]{6}$/;

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
    // Infiltrados na Órbita: outro jogo, mesmo Worker (ver infiltrados.js).
    if (url.pathname.startsWith('/online/infiltrados/')) return fetchInfiltrados(req, env);
    // Origines (jogar com um amigo): outro jogo, mesmo Worker (ver origines.js).
    if (url.pathname.startsWith('/online/origines/')) return fetchOrigines(req, env);
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

// ---------- utilidades ----------
const escolha = (v, lista, padrao) => (lista.includes(v) ? v : padrao);
// Visual do personagem: só valores das listas do jogo (nada de texto livre).
function limparLook(l) {
  const o = l && typeof l === 'object' ? l : {};
  return {
    cls: escolha(o.cls, CLASSES, 'guerreiro'),
    el: escolha(o.el, ELEMENTOS, 'fogo'),
    color: typeof o.color === 'string' && COR_RE.test(o.color) ? o.color : '#c0392b',
    skin: typeof o.skin === 'string' && COR_RE.test(o.skin) ? o.skin : '#e0ac85',
    hat: escolha(o.hat, CHAPEUS, 'nenhum'),
  };
}
// Só números (em listas de até 4 níveis). Devolve a quantidade de números, ou -1 se houver qualquer outra coisa.
function contarNumeros(v, nivel = 0) {
  if (typeof v === 'number') return Number.isFinite(v) ? 1 : -1;
  if (!Array.isArray(v) || nivel >= 4) return -1;
  let n = 0;
  for (const x of v) { const c = contarNumeros(x, nivel + 1); if (c < 0) return -1; n += c; }
  return n;
}

// fases: 'espera' | 'preparo' | 'jogo' | 'fim'
const ESTADO_PADRAO = () => ({ fase: 'espera', cfg: { modo: 'luta2', times: 'contra', dif: 1 }, ordem: 0, humanos: [], prontos: [] });

export class Sala {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }

  async estado() { return (await this.ctx.storage.get('estado')) || ESTADO_PADRAO(); }
  async gravar(e) { await this.ctx.storage.put('estado', e); }

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
  dono() { return this.jogadores().find(({ a }) => a.host) || null; }

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
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return new Response(null, { status: 101, webSocket: cliente });
    };

    const outros = this.conexoes(servidor);
    const criada = await this.ctx.storage.get('criada');
    const estado = await this.estado();
    if (modo === 'criar') {
      if (outros.length > 0 || criada) return recusar('Esse código já está em uso. Tente criar de novo.');
      await this.ctx.storage.put('criada', { codigo, em: Date.now() });
    } else if (!criada) {
      return recusar(`Código "${codigo}" não encontrado. Confira com quem criou a partida.`);
    } else if (estado.fase !== 'espera') {
      return recusar('Essa partida já começou. Só dá para entrar antes de começar.');
    }
    for (const { w, a } of outros) if (a.conta === conta) { try { w.close(4001, 'outra-aba'); } catch { /* ignorar */ } }
    const presentes = outros.filter(({ a }) => a.conta !== conta).length;
    if (presentes >= MAX_SALA) return recusar(`Essa sala está cheia (${MAX_SALA} jogadores).`);

    estado.ordem += 1;
    await this.gravar(estado);
    servidor.serializeAttachment({
      id: 'u' + crypto.randomUUID().slice(0, 6), conta, name: apelido, look: limparLook(null), entrou: false,
      ordem: estado.ordem, host: modo === 'criar',
    });
    await this.ctx.storage.deleteAlarm();
    return new Response(null, { status: 101, webSocket: cliente });
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES) return;
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

    // Controles de quem entrou: só números, e só para o celular de quem criou.
    if (m.t === 'i') {
      if (a.host) return;
      const n = contarNumeros(m.d);
      if (n < 0 || n > MAX_NUMEROS_CONTROLE) return;
      const dono = this.dono();
      if (dono) this.enviar(dono.w, { t: 'i', id: a.id, d: m.d });
      return;
    }
    // "Foto" do jogo (só de quem criou): só números, repassada para os outros.
    if (m.t === 'st') {
      if (!a.host) return;
      const n = contarNumeros(m.d);
      if (n < 0 || n > MAX_NUMEROS_FOTO) return;
      this.enviarTodos({ t: 'st', d: m.d }, ws);
      return;
    }

    const estado = await this.estado();
    if (m.t === 'look') {
      if (estado.fase !== 'espera') return;
      a.look = limparLook(m.look); ws.serializeAttachment(a);
      this.enviarTodos({ t: 'look', id: a.id, look: a.look }, ws);
      return;
    }
    if (m.t === 'cfg') return this.configurar(a, m, estado);
    if (m.t === 'start') {
      if (!a.host || estado.fase !== 'espera') return;
      const n = this.jogadores().length;
      const max = MODOS[estado.cfg.modo].max;
      if (n < MIN_PARA_COMECAR) { this.enviar(ws, { t: 'aviso', k: 'poucos' }); return; }
      if (n > max) { this.enviar(ws, { t: 'aviso', k: 'muitos', max }); return; }
      return this.comecar(estado);
    }
    if (m.t === 'ready') return this.pronto(a, estado);
    if (m.t === 'end') { if (a.host) await this.terminar(estado, 'fim'); }
  }

  async entrar(ws, a, m) {
    if (a.entrou) return;
    a.entrou = true; a.look = limparLook(m.look);
    ws.serializeAttachment(a);
    const criada = (await this.ctx.storage.get('criada')) || {};
    const estado = await this.estado();
    this.enviar(ws, { t: 'welcome', id: a.id, room: criada.codigo || '', max: MAX_SALA, modos: MODOS, host: a.host, cfg: estado.cfg, players: this.lista() });
    this.enviarTodos({ t: 'join', id: a.id, name: a.name, look: a.look, host: !!a.host }, ws);
    if (estado.fase === 'espera' && this.jogadores().length >= MODOS[estado.cfg.modo].max) await this.comecar(estado);
  }

  async configurar(a, m, estado) {
    if (!a.host || estado.fase !== 'espera') return;
    const dif = Math.floor(Number(m.dif));
    estado.cfg = {
      modo: escolha(m.modo, Object.keys(MODOS), estado.cfg.modo),
      times: escolha(m.times, ['contra', 'juntos'], estado.cfg.times),
      dif: dif >= 0 && dif <= 2 ? dif : estado.cfg.dif,
    };
    await this.gravar(estado);
    this.enviarTodos({ t: 'cfg', cfg: estado.cfg });
  }

  // Preparo: todos montam a mesma arena/mapa (mesma semente) e avisam "ready"; só então a partida começa.
  async comecar(estado) {
    const humanos = this.lista();
    const juntos = estado.cfg.modo !== 'luta1' && estado.cfg.times === 'juntos';
    humanos.forEach((h, i) => { h.team = juntos ? 0 : i % 2; });
    const semente = (crypto.getRandomValues(new Uint32Array(1))[0] % 2147483646) + 1;
    estado.fase = 'preparo';
    estado.humanos = humanos.map((h) => h.id);
    estado.prontos = [];
    await this.gravar(estado);
    await this.ctx.storage.setAlarm(Date.now() + PREPARO_MAX_MS);
    this.enviarTodos({ t: 'go', semente, cfg: estado.cfg, players: humanos });
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
    estado.fase = 'jogo';
    await this.gravar(estado);
    await this.ctx.storage.setAlarm(Date.now() + PARTIDA_MAX_MS);
    this.enviarTodos({ t: 'lights' });
  }

  async terminar(estado, motivo) {
    if (estado.fase === 'fim') return;
    estado.fase = 'fim';
    await this.gravar(estado);
    this.enviarTodos({ t: 'over', motivo });
    await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS);
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (!a || a.recusado || !a.entrou) return;
    const restantes = this.jogadores(ws);
    const estado = await this.estado();
    if (restantes.length === 0) { await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS); return; }
    if (estado.fase === 'espera') {
      // Quem criou saiu antes de começar: o próximo da fila vira o dono da sala.
      let novoDono = null;
      if (a.host) {
        restantes.sort((x, y) => x.a.ordem - y.a.ordem);
        const n = restantes[0];
        n.a.host = true; n.w.serializeAttachment(n.a);
        novoDono = n.a.id;
      }
      this.enviarTodos({ t: 'leave', id: a.id, host: novoDono }, ws);
      return;
    }
    if (estado.fase === 'fim') { this.enviarTodos({ t: 'leave', id: a.id, host: null }, ws); return; }
    // Durante o preparo ou o jogo: sem quem criou não há partida (é o celular dele que roda o jogo).
    if (a.host) { await this.terminar(estado, 'dono'); return; }
    this.enviarTodos({ t: 'leave', id: a.id, host: null }, ws);
    if (estado.fase === 'preparo') {
      const ids = restantes.map(({ a: x }) => x.id);
      if (ids.every((id) => estado.prontos.includes(id))) await this.luzes(estado);
    }
  }
  async webSocketClose(ws) { await this.sair(ws); }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (this.jogadores().length === 0) { await this.ctx.storage.deleteAll(); return; }
    const estado = await this.estado();
    if (estado.fase === 'preparo') await this.luzes(estado);
    else if (estado.fase === 'jogo') await this.terminar(estado, 'tempo');
  }
}
