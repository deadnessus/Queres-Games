// Invasão Estelar online (Etapa 4). Roda DENTRO do Worker do Fúria (furia-online), como o Infiltrados: o index.js do
// Fúria manda para cá tudo o que chega em /online/invasao-estelar/. Salas próprias (Durable Object SalaInvasao,
// ligação SALAS_IE, migração v4; a v3 é a do Origines). Copie para worker-furia/src/invasao-estelar.js do queres-games.
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta;
//  - NÃO existe chat: o que os jogadores mandam ("p" a própria nave, "g" o estado da partida, só do dono, "e"
//    acontecimentos) só pode ter NÚMEROS; qualquer texto faz a mensagem ser descartada;
//  - dois jogos: DUELO (2 pilotos, um contra o outro, melhor de 3 rodadas; o servidor conta as rodadas) e ESQUADRÃO
//    (2 a 4 pilotos juntos contra as ondas; o celular de quem criou roda as ondas);
//  - SALA DE ESPERA: só entra antes de começar; quem criou dá a largada. Depois disso ninguém mais entra. No fim,
//    quem criou pode começar de novo com quem ficou na sala ("jogar de novo");
//  - no duelo, quem sai perde; no esquadrão, se quem criou sair, a partida acaba para todos;
//  - guarda só o necessário para a sala existir (nada de IP, nome real ou histórico); a sala some 10 min depois que o
//    último jogador sai.
//
// Rotas (todas sob /online/invasao-estelar):
//   GET  /saude                                        -> { ok: true, banco: true|false }
//   POST /nova                                         -> { codigo }    (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar&jogo=duelo|esquadrao (WebSocket)    (precisa de login)
//   GET  /sala/<CODIGO>?modo=entrar                     (WebSocket)    (precisa de login)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
export const JOGOS = { duelo: { min: 2, max: 2 }, esquadrao: { min: 2, max: 4 } };
const MAX_BYTES = 24 * 1024;
const MAX_NUMEROS = { p: 80, g: 3000, e: 16 };
const MAX_NIVEL = 3; // listas dentro de listas
const NUM_NAVES = 5; // naves do hangar (índices 0 a 4)
const NUM_CORES = 6;
export const RODADAS_PARA_VENCER = 2;
const SALA_EXPIRA_MS = 10 * 60 * 1000;
const BASE = '/online/invasao-estelar';

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

export async function fetchInvasao(req, env) {
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
    return env.SALAS_IE.get(env.SALAS_IE.idFromName(codigo)).fetch(interno);
  }
  return new Response('Not found', { status: 404 });
}

// Só números (em listas de até MAX_NIVEL níveis). Devolve a quantidade de números, ou -1 se houver qualquer outra coisa.
export function contarNumeros(v, nivel = 0) {
  if (typeof v === 'number') return Number.isFinite(v) ? 1 : -1;
  if (!Array.isArray(v) || nivel >= MAX_NIVEL) return -1;
  let n = 0;
  for (const x of v) {
    const c = contarNumeros(x, nivel + 1);
    if (c < 0) return -1;
    n += c;
  }
  return n;
}

const inteiroEntre = (n, a, b) => (Number.isInteger(n) && n >= a && n <= b ? n : a);
const sementeNova = () => crypto.getRandomValues(new Uint32Array(1))[0];

export class SalaInvasao {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }

  conexoes(menos) {
    return this.ctx.getWebSockets().filter((w) => w !== menos).map((w) => ({ w, a: w.deserializeAttachment() || {} })).filter(({ a }) => !a.recusado);
  }
  jogadores(menos) {
    return this.conexoes(menos).filter(({ a }) => a.entrou);
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
    const params = new URL(req.url).searchParams;
    const modo = params.get('modo') === 'criar' ? 'criar' : 'entrar';
    const { 0: cliente, 1: servidor } = new WebSocketPair();
    this.ctx.acceptWebSocket(servidor);
    const recusar = (msg) => {
      try {
        servidor.serializeAttachment({ recusado: true });
        servidor.send(JSON.stringify({ t: 'erro', msg }));
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return new Response(null, { status: 101, webSocket: cliente });
    };

    const outros = this.conexoes(servidor);
    let sala = await this.ctx.storage.get('sala');
    if (modo === 'criar') {
      if (sala || outros.length) return recusar('Esse código já está em uso. Tente criar de novo.');
      const jogo = params.get('jogo') === 'esquadrao' ? 'esquadrao' : 'duelo';
      sala = { codigo, jogo, dono: 0, fase: 'espera', rodada: 0, vitorias: {}, semente: 0 };
      await this.ctx.storage.put('sala', sala);
    } else {
      if (!sala) return recusar('Não achei essa sala. Confira o código.');
      if (sala.fase !== 'espera') return recusar('Essa partida já começou.');
    }
    // A mesma conta em outra aba: a conexão antiga sai.
    for (const { w, a } of outros) if (a.conta === conta) { try { w.close(4001, 'outra-aba'); } catch { /* ignorar */ } }
    const presentes = outros.filter(({ a }) => a.conta !== conta).length;
    if (presentes >= JOGOS[sala.jogo].max) return recusar('Essa sala está cheia.');

    const ordem = ((await this.ctx.storage.get('ordem')) || 0) + 1; // número de cada jogador nesta sala
    await this.ctx.storage.put('ordem', ordem);
    servidor.serializeAttachment({ id: ordem, conta, name: apelido, entrou: false, nave: 0, cor: 0 });
    await this.ctx.storage.deleteAlarm();
    return new Response(null, { status: 101, webSocket: cliente });
  }

  lista() {
    return this.jogadores().map(({ a }) => ({ id: a.id, name: a.name, nave: a.nave, cor: a.cor }));
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES) return;
    const agora = Date.now();
    const lim = this.limites.get(ws) || { fichas: 60, t: agora };
    lim.fichas = Math.min(60, lim.fichas + ((agora - lim.t) / 1000) * 45);
    lim.t = agora;
    if (lim.fichas < 1) { this.limites.set(ws, lim); return; }
    lim.fichas -= 1;
    this.limites.set(ws, lim);

    let m;
    try { m = JSON.parse(bruto); } catch { return; }
    if (!m || typeof m.t !== 'string') return;
    const a = ws.deserializeAttachment();
    if (!a || a.recusado) return;
    const sala = await this.ctx.storage.get('sala');
    if (!sala) return;

    if (m.t === 'join') return this.entrar(ws, a, sala, m.d);
    if (!a.entrou) return;

    if (m.t === 'comecar') {
      const n = this.jogadores().length;
      const podeComecar = sala.fase === 'espera' || sala.fase === 'fim'; // no fim: jogar de novo com quem ficou
      if (a.id !== sala.dono || !podeComecar || n < JOGOS[sala.jogo].min || n > JOGOS[sala.jogo].max) return;
      sala.fase = 'jogo';
      sala.rodada = 1;
      sala.semente = sementeNova();
      sala.vitorias = {};
      sala.alienigenas = [];
      sala.ordem = this.jogadores().map(({ a: x }) => x.id).sort((p, q) => p - q);
      await this.ctx.storage.put('sala', sala);
      this.enviarTodos({ t: 'comecar', semente: sala.semente, rodada: 1, ordem: sala.ordem });
      return;
    }
    if (sala.fase !== 'jogo') return;

    if (m.t === 'p' || m.t === 'g' || m.t === 'e') {
      if (m.t === 'g' && a.id !== sala.dono) return; // só o celular de quem criou manda o estado das ondas
      const n = contarNumeros(m.d);
      if (n < 0 || n > MAX_NUMEROS[m.t]) return;
      this.enviarTodos(JSON.stringify({ t: m.t, id: a.id, d: m.d }), ws);
      return;
    }
    // duelo: um alienígena do meio só pode ser derrubado uma vez por rodada; vale quem avisou primeiro
    if (m.t === 'alien' && sala.jogo === 'duelo') {
      const i = m.i;
      if (!Number.isInteger(i) || i < 0 || i > 1000 || m.r !== sala.rodada) return;
      sala.alienigenas = sala.alienigenas || [];
      if (sala.alienigenas.includes(i)) return;
      sala.alienigenas.push(i);
      await this.ctx.storage.put('sala', sala);
      this.enviarTodos({ t: 'alien', i, por: a.id, r: sala.rodada });
      return;
    }
    // duelo: quem perdeu as 3 naves avisa; o servidor conta as rodadas (melhor de 3)
    if (m.t === 'perdi' && sala.jogo === 'duelo') {
      if (m.r !== sala.rodada) return; // aviso repetido ou atrasado
      const outro = sala.ordem.find((id) => id !== a.id);
      sala.vitorias[outro] = (sala.vitorias[outro] || 0) + 1;
      if (sala.vitorias[outro] >= RODADAS_PARA_VENCER) {
        sala.fase = 'fim';
        await this.ctx.storage.put('sala', sala);
        this.enviarTodos({ t: 'fim', vencedor: outro, vitorias: sala.vitorias });
      } else {
        sala.rodada += 1;
        sala.semente = sementeNova();
        sala.alienigenas = [];
        await this.ctx.storage.put('sala', sala);
        this.enviarTodos({ t: 'rodada', rodada: sala.rodada, semente: sala.semente, vitorias: sala.vitorias, ganhou: outro });
      }
      return;
    }
    // esquadrão: quem criou avisa que a partida acabou (todos caíram)
    if (m.t === 'fim' && sala.jogo === 'esquadrao' && a.id === sala.dono) {
      sala.fase = 'fim';
      await this.ctx.storage.put('sala', sala);
      this.enviarTodos({ t: 'fim' });
    }
  }

  async entrar(ws, a, sala, d) {
    if (a.entrou) return;
    a.entrou = true;
    // nave e cor: só números das listas do jogo
    a.nave = inteiroEntre(Array.isArray(d) ? d[0] : 0, 0, NUM_NAVES - 1);
    a.cor = inteiroEntre(Array.isArray(d) ? d[1] : 0, 0, NUM_CORES - 1);
    ws.serializeAttachment(a);
    if (!sala.dono) {
      sala.dono = a.id;
      await this.ctx.storage.put('sala', sala);
    }
    this.enviar(ws, { t: 'welcome', id: a.id, room: sala.codigo, jogo: sala.jogo, dono: sala.dono, players: this.lista() });
    this.enviarTodos({ t: 'join', id: a.id, name: a.name, nave: a.nave, cor: a.cor }, ws);
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (!a || a.recusado || !a.entrou) return;
    a.entrou = false;
    a.recusado = true;
    ws.serializeAttachment(a);
    this.enviarTodos({ t: 'leave', id: a.id }, ws);
    const sala = await this.ctx.storage.get('sala');
    const restam = this.jogadores(ws);
    if (sala) {
      if (sala.fase === 'espera' && sala.dono === a.id && restam.length) {
        // quem criou saiu antes de começar: o próximo vira o dono
        sala.dono = restam[0].a.id;
        await this.ctx.storage.put('sala', sala);
        this.enviarTodos({ t: 'dono', id: sala.dono }, ws);
      } else if (sala.fase === 'jogo' && sala.jogo === 'duelo' && restam.length) {
        sala.fase = 'fim';
        const vencedor = restam[0].a.id;
        sala.vitorias[vencedor] = RODADAS_PARA_VENCER;
        await this.ctx.storage.put('sala', sala);
        this.enviarTodos({ t: 'fim', vencedor, vitorias: sala.vitorias, motivo: 'saiu' }, ws);
      } else if (sala.fase === 'jogo' && sala.jogo === 'esquadrao' && sala.dono === a.id) {
        sala.fase = 'fim';
        await this.ctx.storage.put('sala', sala);
        this.enviarTodos({ t: 'fim', motivo: 'dono-saiu' }, ws);
      }
    }
    if (restam.length === 0) await this.ctx.storage.setAlarm(Date.now() + SALA_EXPIRA_MS);
  }
  async webSocketClose(ws) { await this.sair(ws); }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (this.jogadores().length === 0) await this.ctx.storage.deleteAll();
  }
}
