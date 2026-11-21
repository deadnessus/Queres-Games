// Origines: jogar com um amigo (convite por código de 4 letras). Roda DENTRO do Worker do Fúria (furia-online), que
// já está publicado e é atualizado sozinho a cada merge na main; o index.js do Fúria manda para cá tudo o que chega em
// /online/origines/. Salas próprias (Durable Object SalaOrigines, ligação SALAS_ORI): nada é dividido com o Fúria.
//
// Como o jogo funciona (repositório deadnessus/idade-da-pedra, docs/10-plano-convite.md e src/net/):
//  - o anfitrião está no jogo dele e gera o código; UM amigo entra com o código, no mesmo jogo;
//  - os dois aparelhos rodam a mesma partida (a simulação do Origines dá o mesmo resultado em qualquer aparelho).
//    Pela internet só viajam as ORDENS, em números: o anfitrião manda o ritmo ("turnos": até que passo foi e as ordens
//    de cada passo) e, quando o amigo entra, o jogo salvo; o amigo manda as ordens dele para o anfitrião;
//  - se o anfitrião sai, o jogo para para o amigo (espera até 30 s, para a internet que pisca).
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta;
//  - NÃO existe chat: turnos, ordens e pausa só podem ter NÚMEROS; o jogo salvo passa pela mesma conferência do save
//    na nuvem (só números, verdadeiro/falso e palavras curtas de letras minúsculas; no máximo 300 KB). Qualquer outra
//    coisa faz a mensagem ser descartada;
//  - só o anfitrião manda turnos, jogo salvo e pausa; só o amigo manda ordens; um amigo por vez;
//  - guarda só o necessário para a sala existir (quem é o anfitrião, enquanto ele joga): nada de IP, nome real,
//    partida ou histórico. A sala some quando o anfitrião sai.
//
// Rotas (todas sob /online/origines):
//   GET  /saude                              -> { ok: true, banco: true|false }
//   POST /nova                               -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar    (WebSocket)                (precisa de login)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const BASE = '/online/origines';
const MAX_BYTES = 32 * 1024;            // turnos, ordens e pausa
const MAX_BYTES_JOGO = 320 * 1024;      // o jogo salvo (o save do Origines tem no máximo 300 KB)
const MAX_SAVE = 300_000;
const MAX_NUMEROS_TURNO = 8000;
const MAX_NUMEROS_ORDEM = 600;
const MAX_NIVEL = 4;
const ESPERA_ANFITRIAO_MS = 30 * 1000;  // o anfitrião caiu: o amigo espera isso antes do jogo parar
const PALAVRA = /^[a-z]{1,16}$/;
const CHAVE = /^[A-Za-z0-9_]{1,24}$/;

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

export async function fetchOrigines(req, env) {
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
    interno.headers.set('x-qg-apelido', encodeURIComponent(conta.apelido));   // apelidos com acento ("Onça") passam inteiros
    interno.headers.set('x-qg-codigo', codigo);
    return env.SALAS_ORI.get(env.SALAS_ORI.idFromName(codigo)).fetch(interno);
  }
  return new Response('Not found', { status: 404 });
}

// Só números (em listas de até MAX_NIVEL níveis). Devolve a quantidade de números, ou -1 se houver qualquer outra coisa.
function contarNumeros(v, nivel = 0) {
  if (typeof v === 'number') return Number.isFinite(v) ? 1 : -1;
  if (!Array.isArray(v) || nivel >= MAX_NIVEL) return -1;
  let n = 0;
  for (const x of v) { const c = contarNumeros(x, nivel + 1); if (c < 0) return -1; n += c; }
  return n;
}
// O jogo salvo: a mesma conferência do save na nuvem (functions/_lib/origines.js): só números, verdadeiro/falso, null,
// listas, objetos de chaves curtas e palavras curtas de letras minúsculas. Nada de texto livre.
function soNumeros(x, nivel) {
  if (nivel > 8) return false;
  if (x === null || typeof x === 'boolean') return true;
  if (typeof x === 'number') return Number.isFinite(x);
  if (typeof x === 'string') return PALAVRA.test(x);
  if (Array.isArray(x)) { for (const v of x) if (!soNumeros(v, nivel + 1)) return false; return true; }
  if (typeof x === 'object') {
    const chaves = Object.keys(x);
    if (chaves.length > 300) return false;
    for (const k of chaves) if (!CHAVE.test(k) || !soNumeros(x[k], nivel + 1)) return false;
    return true;
  }
  return false;
}
const jogoValido = (d) => !!d && typeof d === 'object' && !Array.isArray(d) && d.v === 1 && !!d.meta && typeof d.meta === 'object' && soNumeros(d, 0);

export class SalaOrigines {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }
  /** as conexões ativas (sem as recusadas e as trocadas por outra da mesma conta) */
  ativos() {
    return this.ctx.getWebSockets()
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => a.papel && !a.fora);
  }
  anfitriao() { return this.ativos().find(({ a }) => a.papel === 'anfitriao') || null; }
  convidado() { return this.ativos().find(({ a }) => a.papel === 'convidado') || null; }
  enviar(w, msg) { try { w.send(typeof msg === 'string' ? msg : JSON.stringify(msg)); } catch { /* conexão caída */ } }
  tirar(w, codigo, motivo) { try { const a = w.deserializeAttachment() || {}; a.fora = true; w.serializeAttachment(a); w.close(codigo, motivo); } catch { /* já fechada */ } }
  /** o fim da sala: avisa quem ainda está e apaga tudo */
  async encerrar() {
    for (const { w, a } of this.ativos()) { if (a.papel === 'convidado') this.enviar(w, { t: 'fim' }); this.tirar(w, 1000, 'fim'); }
    await this.ctx.storage.deleteAll();
  }

  async fetch(req) {
    const conta = req.headers.get('x-qg-conta');
    let apelido = req.headers.get('x-qg-apelido');
    try { apelido = apelido && decodeURIComponent(apelido); } catch { apelido = null; }
    const codigo = req.headers.get('x-qg-codigo');
    if (!conta || !apelido || !codigo) return new Response('Forbidden', { status: 403 });
    const modo = new URL(req.url).searchParams.get('modo') === 'criar' ? 'criar' : 'entrar';

    const { 0: cliente, 1: servidor } = new WebSocketPair();
    this.ctx.acceptWebSocket(servidor);
    const recusar = (msg) => {
      try {
        servidor.serializeAttachment({ fora: true });
        servidor.send(JSON.stringify({ t: 'erro', msg }));
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return new Response(null, { status: 101, webSocket: cliente });
    };

    const sala = await this.ctx.storage.get('sala');
    const anf = this.anfitriao(), conv = this.convidado();
    if (modo === 'criar') {
      if (sala && sala.host !== conta) return recusar('Esse código já está em uso. Tente de novo.');
      // o mesmo anfitrião voltando (a internet piscou, ou outra aba): a conexão antiga sai
      if (anf) this.tirar(anf.w, 4001, 'outra-aba');
      await this.ctx.storage.put('sala', { codigo, host: conta, nome: apelido, em: (sala && sala.em) || Date.now() });
      await this.ctx.storage.deleteAlarm();
      servidor.serializeAttachment({ papel: 'anfitriao', conta, nome: apelido });
      // amigo: quem está no jogo agora ('' = ninguém), para o anfitrião que volta saber se o amigo saiu enquanto isso
      this.enviar(servidor, { t: 'ok', papel: 'anfitriao', codigo, amigo: conv ? conv.a.nome : '' });
      if (conv) { this.enviar(conv.w, { t: 'voltou' }); this.enviar(servidor, { t: 'entrou', nome: conv.a.nome }); }
      return new Response(null, { status: 101, webSocket: cliente });
    }
    // entrar (o amigo)
    if (!sala) return recusar('Não achei esse jogo. Confira o código com o seu amigo.');
    if (sala.host === conta) return recusar('Esse é o seu próprio jogo: para jogar, toque em Continuar.');
    if (!anf) return recusar('O seu amigo não está jogando agora. Tente de novo daqui a pouco.');
    if (conv && conv.a.conta !== conta) return recusar('Esse jogo já tem um amigo jogando.');
    if (conv) this.tirar(conv.w, 4001, 'outra-aba');
    servidor.serializeAttachment({ papel: 'convidado', conta, nome: apelido });
    this.enviar(servidor, { t: 'ok', papel: 'convidado', codigo, nome: sala.nome });
    this.enviar(anf.w, { t: 'entrou', nome: apelido });
    return new Response(null, { status: 101, webSocket: cliente });
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES_JOGO) return;
    const a = ws.deserializeAttachment();
    if (!a || !a.papel || a.fora) return;
    // limite de mensagens: o anfitrião manda uns 5 turnos por segundo; o amigo, ordens de vez em quando
    const agora = Date.now(), anf = a.papel === 'anfitriao';
    const lim = this.limites.get(ws) || { fichas: anf ? 60 : 30, t: agora };
    lim.fichas = Math.min(anf ? 60 : 30, lim.fichas + ((agora - lim.t) / 1000) * (anf ? 30 : 15)); lim.t = agora;
    const custo = bruto.length > MAX_BYTES ? 20 : 1;
    if (lim.fichas < custo) { this.limites.set(ws, lim); return; }
    lim.fichas -= custo; this.limites.set(ws, lim);

    let m; try { m = JSON.parse(bruto); } catch { return; }
    if (!m || typeof m.t !== 'string') return;
    if (m.t !== 's' && bruto.length > MAX_BYTES) return;

    if (anf) {
      const outro = this.convidado();
      if (m.t === 'fim') { await this.encerrar(); return; }
      if (!outro) return;
      if (m.t === 't') { const n = contarNumeros(m.d); if (n >= 1 && n <= MAX_NUMEROS_TURNO) this.enviar(outro.w, JSON.stringify({ t: 't', d: m.d })); return; }
      if (m.t === 'p') { const n = contarNumeros(m.d); if (n >= 1 && n <= 4) this.enviar(outro.w, JSON.stringify({ t: 'p', d: m.d })); return; }
      if (m.t === 's') {
        if (!Number.isFinite(m.v) || !jogoValido(m.d)) return;
        const texto = JSON.stringify({ t: 's', v: m.v, d: m.d });
        if (texto.length > MAX_SAVE + 1000) return;
        this.enviar(outro.w, texto);
      }
      return;
    }
    // o amigo
    const dono = this.anfitriao();
    if (m.t === 'sai') { this.tirar(ws, 1000, 'saiu'); if (dono) this.enviar(dono.w, { t: 'saiu', nome: a.nome }); return; }
    if (!dono) return;
    if (m.t === 'c') { const n = contarNumeros(m.d); if (n >= 2 && n <= MAX_NUMEROS_ORDEM) this.enviar(dono.w, JSON.stringify({ t: 'c', d: m.d })); return; }
    if (m.t === 'r') this.enviar(dono.w, JSON.stringify({ t: 'r' }));
  }

  async sair(ws) {
    const a = ws.deserializeAttachment();
    if (!a || !a.papel || a.fora) return;
    a.fora = true; ws.serializeAttachment(a);
    if (a.papel === 'convidado') { const dono = this.anfitriao(); if (dono) this.enviar(dono.w, { t: 'saiu', nome: a.nome }); return; }
    // o anfitrião caiu: o amigo espera um pouco (a internet pode ter piscado); se ele não voltar, o jogo para
    const outro = this.convidado();
    if (!outro) { await this.ctx.storage.deleteAll(); return; }
    this.enviar(outro.w, { t: 'espera' });
    await this.ctx.storage.setAlarm(Date.now() + ESPERA_ANFITRIAO_MS);
  }
  async webSocketClose(ws) {
    await this.sair(ws);
    try { ws.close(1000, 'tchau'); } catch { /* já fechada */ }   // responde ao "tchau" de quem fechou: a conexão termina logo dos dois lados
  }
  async webSocketError(ws) { await this.sair(ws); }

  async alarm() {
    if (!this.anfitriao()) await this.encerrar();
  }
}
