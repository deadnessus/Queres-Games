// Origines: partida online (M6), cada pessoa com a sua tribo, até 4, por código de 4 letras. Roda DENTRO do Worker do
// Fúria (furia-online), como o jogo com um amigo (origines.js): o index.js manda para cá o que chega em
// /online/origines/partida/. Salas próprias (Durable Object SalaPartidaOrigines, ligação SALAS_PARTIDA, migração v5).
//
// Como o jogo funciona (repositório deadnessus/idade-da-pedra, docs/11-plano-multiplayer.md e src/net/):
//  - sala de espera: quem criou escolhe o modo (1 contra 1, 2 contra 2, todos contra todos com 3 ou 4) e a dificuldade
//    do computador, troca as pessoas de vaga e começa (com pelo menos 2 pessoas). As vagas vazias viram computador;
//  - todos os aparelhos rodam a mesma partida, a partir da semente sorteada aqui. Pela internet só viajam as ORDENS, em
//    números: o anfitrião (quem dá o ritmo) manda os turnos para todos; cada um manda as ordens da própria tribo para o
//    anfitrião, e este servidor CARIMBA a vaga de quem mandou (ninguém dá ordem para a tribo dos outros);
//  - quem cai tem 30 s para voltar; depois disso (ou se tocou em Sair), o computador assume a tribo dele. Se quem sai é
//    o anfitrião, a pessoa que entrou primeiro passa a dar o ritmo (troca de anfitrião).
//
// Regras deste servidor (site infantil):
//  - só entra quem está LOGADO na conta do site (cookie qg_sessao); o nome mostrado é o APELIDO da conta;
//  - NÃO existe chat: do aparelho para cá só passam NÚMEROS (turnos, ordens, pausa, sinais e os botões da sala de
//    espera) e o jogo salvo, com a mesma conferência do save na nuvem (só números, verdadeiro/falso e palavras curtas
//    de letras minúsculas; no máximo 300 KB). Qualquer outra coisa faz a mensagem ser descartada;
//  - sinais prontos (Ajuda aqui, Atacar aqui, Cuidado: só o número do sinal e o lugar) vão SÓ para os aliados;
//  - guarda só o necessário para a sala existir: nada de IP, nome real ou histórico. A sala some quando todos saem.
//
// Rotas (todas sob /online/origines/partida):
//   GET  /saude                                   -> { ok: true, banco: true|false }
//   POST /nova                                    -> { codigo }              (precisa de login)
//   GET  /sala/<CODIGO>?modo=criar|entrar&v=<n>   (WebSocket)                (precisa de login; v = versão do jogo)
//
// Mensagens (só números, fora o jogo salvo):
//   sala de espera, de quem criou: cfg [modo, dificuldade], troca [vaga, vaga], comeca; de todos: sai
//   partida, do anfitrião: t (turno), s (jogo salvo), p [pausa], cede; dos outros: c (ordem), r (pede o jogo de novo);
//   de todos: sinal [tipo, x, z], sai
//   daqui para os aparelhos: ok, sala, comeca, t, s, p, c {v: vaga}, r {v}, sinal [vaga, tipo, x, z], caiu {v},
//   voltou {v}, saiu {v}, anfitriao {v, fora}, fim, erro (os nomes são os apelidos das contas)

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/;
const BASE = '/online/origines/partida';
const MAX_BYTES = 32 * 1024;            // turnos, ordens, pausa, sinais
const MAX_BYTES_JOGO = 320 * 1024;      // o jogo salvo (o save do Origines tem no máximo 300 KB)
const MAX_SAVE = 300_000;
const MAX_NUMEROS_TURNO = 8000;
const MAX_NUMEROS_ORDEM = 600;
const MAX_NIVEL = 4;
const ESPERA_MS = 30 * 1000;            // quem caiu tem isso para voltar
const PALAVRA = /^[a-z]{1,16}$/;
const CHAVE = /^[A-Za-z0-9_]{1,24}$/;
/** os modos: quantas vagas e o time de cada vaga (no 2 contra 2, as vagas 0 e 1 são vizinhas no mapa) */
export const MODOS = { 1: { vagas: 2, times: [0, 1] }, 2: { vagas: 4, times: [0, 0, 1, 1] }, 3: { vagas: 3, times: [0, 1, 2] }, 4: { vagas: 4, times: [0, 1, 2, 3] } };
const SINAIS = 3;   // 0 Ajuda aqui, 1 Atacar aqui, 2 Cuidado

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

export async function fetchPartida(req, env) {
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
    // o Durable Object só aceita quem passou por aqui: a identidade vai em cabeçalhos que o cliente não controla
    const interno = new Request(req);
    interno.headers.set('x-qg-conta', String(conta.id));
    interno.headers.set('x-qg-apelido', encodeURIComponent(conta.apelido));
    interno.headers.set('x-qg-codigo', codigo);
    return env.SALAS_PARTIDA.get(env.SALAS_PARTIDA.idFromName(codigo)).fetch(interno);
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
const inteiros = (d, n) => Array.isArray(d) && d.length === n && d.every((x) => Number.isInteger(x));
// O jogo salvo: a mesma conferência do save na nuvem (functions/_lib/origines.js).
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
const jogoValido = (d) => !!d && typeof d === 'object' && !Array.isArray(d) && (d.v === 1 || d.v === 2) && !!d.meta && typeof d.meta === 'object' && soNumeros(d, 0);

export class SalaPartidaOrigines {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.env = env;
    this.limites = new WeakMap(); // limite de mensagens por conexão (só em memória)
  }
  /** as conexões ativas (sem as recusadas e as trocadas por outra da mesma conta) */
  ativos() {
    return this.ctx.getWebSockets()
      .map((w) => ({ w, a: w.deserializeAttachment() || {} }))
      .filter(({ a }) => a.conta && !a.fora);
  }
  de(conta) { return this.ativos().find(({ a }) => a.conta === conta) || null; }
  enviar(w, msg) { try { w.send(typeof msg === 'string' ? msg : JSON.stringify(msg)); } catch { /* conexão caída */ } }
  todos(msg, menos = null) { const t = typeof msg === 'string' ? msg : JSON.stringify(msg); for (const { w, a } of this.ativos()) if (a.conta !== menos) this.enviar(w, t); }
  tirar(w, codigo, motivo) { try { const a = w.deserializeAttachment() || {}; a.fora = true; w.serializeAttachment(a); w.close(codigo, motivo); } catch { /* já fechada */ } }
  async guardar(sala) { await this.ctx.storage.put('sala', sala); }
  /** o fim da sala: avisa quem ainda está e apaga tudo */
  async encerrar(motivo) {
    for (const { w } of this.ativos()) { this.enviar(w, { t: 'fim', motivo }); this.tirar(w, 1000, 'fim'); }
    await this.ctx.storage.deleteAll();
  }
  vaga(sala, conta) { return sala.vagas.indexOf(conta); }
  nomes(sala) { return sala.vagas.slice(0, MODOS[sala.modo].vagas).map((c) => (c === null ? '' : sala.nomes[c] || '?')); }
  /** a sala de espera para cada um (com a vaga dele) */
  mostrarSala(sala) {
    const nomes = this.nomes(sala), criador = this.vaga(sala, sala.criador);
    for (const { w, a } of this.ativos()) this.enviar(w, { t: 'sala', codigo: sala.codigo, modo: sala.modo, dif: sala.dif, vagas: nomes, criador, eu: this.vaga(sala, a.conta) });
  }
  /** a partida para quem está (ou volta) nela: semente, modo, vagas, o anfitrião e quem já saiu */
  comeca(sala, w, conta, volta) {
    const fora = sala.saiu.map((c) => this.vaga(sala, c));
    this.enviar(w, { t: 'comeca', semente: sala.semente, modo: sala.modo, dif: sala.dif, vagas: this.nomes(sala), eu: this.vaga(sala, conta), anf: this.vaga(sala, sala.anfitriao), fora, volta: !!volta });
  }

  async fetch(req) {
    const conta = Number(req.headers.get('x-qg-conta'));
    let apelido = req.headers.get('x-qg-apelido');
    try { apelido = apelido && decodeURIComponent(apelido); } catch { apelido = null; }
    const codigo = req.headers.get('x-qg-codigo');
    if (!conta || !apelido || !codigo) return new Response('Forbidden', { status: 403 });
    const q = new URL(req.url).searchParams;
    const modo = q.get('modo') === 'criar' ? 'criar' : 'entrar';
    const versao = Number(q.get('v')) || 0;

    const { 0: cliente, 1: servidor } = new WebSocketPair();
    this.ctx.acceptWebSocket(servidor);
    const aceitar = () => new Response(null, { status: 101, webSocket: cliente });
    const recusar = (msg) => {
      try {
        servidor.serializeAttachment({ fora: true });
        servidor.send(JSON.stringify({ t: 'erro', msg }));
        this.ctx.waitUntil(new Promise((fim) => setTimeout(fim, 150)).then(() => { try { servidor.close(4000, 'recusado'); } catch { /* já fechada */ } }));
      } catch { /* ignorar */ }
      return aceitar();
    };

    let sala = await this.ctx.storage.get('sala');
    // quem já está na partida voltando (a internet piscou, ou outra aba): a conexão antiga sai e a vaga é dele
    if (sala && sala.vagas.includes(conta)) {
      if (sala.estado === 'jogo' && sala.saiu.includes(conta)) return recusar('A partida continuou sem você: o computador assumiu a sua tribo.');
      if (versao !== sala.versao) return recusar('Vocês estão com versões diferentes do jogo. Recarreguem a página e tentem de novo.');
      const antiga = this.de(conta); if (antiga) this.tirar(antiga.w, 4001, 'outra-aba');
      servidor.serializeAttachment({ conta, nome: apelido });
      const caiu = sala.caiu[conta] !== undefined; delete sala.caiu[conta];
      if (sala.estado === 'jogo' && sala.saiu.includes(sala.anfitriao)) sala.anfitriao = conta;   // o anfitrião saiu quando ninguém estava: quem volta assume
      await this.guardar(sala); await this.agendar(sala);
      this.enviar(servidor, { t: 'ok', codigo: sala.codigo, eu: this.vaga(sala, conta) });
      if (sala.estado === 'espera') { this.mostrarSala(sala); return aceitar(); }
      this.comeca(sala, servidor, conta, true);
      if (caiu || antiga) this.todos({ t: 'voltou', v: this.vaga(sala, conta) }, conta);   // o anfitrião manda o jogo de novo para todos
      return aceitar();
    }
    if (modo === 'criar') {
      if (sala) return recusar('Esse código já está em uso. Tente de novo.');
      sala = { codigo, versao, criador: conta, anfitriao: conta, modo: 1, dif: 1, vagas: [conta, null, null, null], nomes: { [conta]: apelido }, ordem: [conta], estado: 'espera', semente: 0, saiu: [], caiu: {}, em: Date.now() };
      await this.guardar(sala);
      servidor.serializeAttachment({ conta, nome: apelido });
      this.enviar(servidor, { t: 'ok', codigo, eu: 0 });
      this.mostrarSala(sala);
      return aceitar();
    }
    // entrar (gente nova)
    if (!sala) return recusar('Não achei essa partida. Confira o código.');
    if (sala.estado !== 'espera') return recusar('Essa partida já começou. Só dá para entrar antes de começar.');
    if (versao !== sala.versao) return recusar('Vocês estão com versões diferentes do jogo. Recarreguem a página e tentem de novo.');
    const livre = sala.vagas.slice(0, MODOS[sala.modo].vagas).indexOf(null);
    if (livre < 0) return recusar('Essa partida está cheia.');
    sala.vagas[livre] = conta; sala.nomes[conta] = apelido; sala.ordem.push(conta);
    await this.guardar(sala);
    servidor.serializeAttachment({ conta, nome: apelido });
    this.enviar(servidor, { t: 'ok', codigo, eu: livre });
    this.mostrarSala(sala);
    return aceitar();
  }

  async webSocketMessage(ws, bruto) {
    if (typeof bruto !== 'string' || bruto.length > MAX_BYTES_JOGO) return;
    const a = ws.deserializeAttachment();
    if (!a || !a.conta || a.fora) return;
    const sala = await this.ctx.storage.get('sala'); if (!sala) return;
    // limite de mensagens: o anfitrião manda uns 5 turnos por segundo; os outros, ordens e sinais de vez em quando
    const agora = Date.now(), anf = sala.estado === 'jogo' && a.conta === sala.anfitriao;
    const lim = this.limites.get(ws) || { fichas: anf ? 60 : 30, t: agora };
    lim.fichas = Math.min(anf ? 60 : 30, lim.fichas + ((agora - lim.t) / 1000) * (anf ? 30 : 15)); lim.t = agora;
    const custo = bruto.length > MAX_BYTES ? 20 : 1;
    if (lim.fichas < custo) { this.limites.set(ws, lim); return; }
    lim.fichas -= custo; this.limites.set(ws, lim);

    let m; try { m = JSON.parse(bruto); } catch { return; }
    if (!m || typeof m.t !== 'string') return;
    if (m.t !== 's' && bruto.length > MAX_BYTES) return;
    const eu = this.vaga(sala, a.conta);
    if (eu < 0) return;

    if (m.t === 'sai') { await this.saiu(sala, a.conta, ws); return; }
    if (sala.estado === 'espera') {
      if (a.conta !== sala.criador) return;   // só quem criou mexe na sala de espera
      const n = MODOS[sala.modo].vagas;
      if (m.t === 'cfg' && inteiros(m.d, 2) && MODOS[m.d[0]] && m.d[1] >= 0 && m.d[1] <= 2) {
        const gente = sala.vagas.filter((c) => c !== null);
        if (gente.length > MODOS[m.d[0]].vagas) return;   // não cabe quem já está
        if (MODOS[m.d[0]].vagas < n || sala.vagas.slice(MODOS[m.d[0]].vagas).some((c) => c !== null)) sala.vagas = [...gente, null, null, null, null].slice(0, 4);   // menos vagas: junta todo mundo no começo
        sala.modo = m.d[0]; sala.dif = m.d[1];
        await this.guardar(sala); this.mostrarSala(sala); return;
      }
      if (m.t === 'troca' && inteiros(m.d, 2) && m.d.every((i) => i >= 0 && i < n) && m.d[0] !== m.d[1]) {
        const [i, j] = m.d; [sala.vagas[i], sala.vagas[j]] = [sala.vagas[j], sala.vagas[i]];
        await this.guardar(sala); this.mostrarSala(sala); return;
      }
      if (m.t === 'comeca') {
        if (sala.vagas.filter((c) => c !== null).length < 2) return;   // pelo menos 2 pessoas
        sala.estado = 'jogo'; sala.anfitriao = sala.criador; sala.semente = 1 + (crypto.getRandomValues(new Uint32Array(1))[0] % 2_000_000_000);
        sala.vagas = sala.vagas.map((c, i) => (i < n ? c : null));
        await this.guardar(sala);
        for (const { w, a: x } of this.ativos()) this.comeca(sala, w, x.conta, false);
      }
      return;
    }
    // a partida
    const dono = this.de(sala.anfitriao);
    if (m.t === 'sinal') {   // sinal pronto: só para os aliados, com a vaga de quem mandou
      if (!inteiros(m.d, 3) || m.d[0] < 0 || m.d[0] >= SINAIS || m.d.some((x) => x < 0 || x > 1_000_000)) return;
      const times = MODOS[sala.modo].times, texto = JSON.stringify({ t: 'sinal', d: [eu, ...m.d] });
      for (const { w, a: x } of this.ativos()) { const v = this.vaga(sala, x.conta); if (v !== eu && v >= 0 && times[v] === times[eu]) this.enviar(w, texto); }
      return;
    }
    if (anf) {
      // o anfitrião voltou sem a partida (recarregou a página): outra pessoa passa a dar o ritmo e manda o jogo para ele
      if (m.t === 'cede') { await this.trocarAnfitriao(sala, a.conta); await this.guardar(sala); return; }
      if (m.t === 't') { const n = contarNumeros(m.d); if (n >= 1 && n <= MAX_NUMEROS_TURNO) this.todos(JSON.stringify({ t: 't', d: m.d }), a.conta); return; }
      if (m.t === 'p') { const n = contarNumeros(m.d); if (n >= 1 && n <= 4) this.todos(JSON.stringify({ t: 'p', d: m.d }), a.conta); return; }
      if (m.t === 's') {
        if (!Number.isFinite(m.v) || !jogoValido(m.d)) return;
        const texto = JSON.stringify({ t: 's', v: m.v, d: m.d });
        if (texto.length > MAX_SAVE + 1000) return;
        this.todos(texto, a.conta);
      }
      return;
    }
    // quem não dá o ritmo: as ordens da própria tribo (com a vaga carimbada aqui) e o pedido do jogo de novo
    if (!dono) return;
    if (m.t === 'c') { const n = contarNumeros(m.d); if (n >= 2 && n <= MAX_NUMEROS_ORDEM) this.enviar(dono.w, JSON.stringify({ t: 'c', v: eu, d: m.d })); return; }
    if (m.t === 'r') this.enviar(dono.w, JSON.stringify({ t: 'r', v: eu }));
  }

  /** alguém saiu de vez (tocou em Sair, ou caiu e não voltou em 30 s) */
  async saiu(sala, conta, ws) {
    if (ws) this.tirar(ws, 1000, 'saiu');
    const vaga = this.vaga(sala, conta);
    if (sala.estado === 'espera') {
      if (conta === sala.criador) { await this.encerrar('criador'); return; }   // na sala de espera, sem quem criou não há partida
      sala.vagas[vaga] = null; delete sala.nomes[conta]; sala.ordem = sala.ordem.filter((c) => c !== conta); delete sala.caiu[conta];
      await this.guardar(sala); this.mostrarSala(sala); return;
    }
    if (!sala.saiu.includes(conta)) sala.saiu.push(conta);
    delete sala.caiu[conta];
    // ninguém mais na partida: acabou
    const ficam = sala.vagas.filter((c) => c !== null && !sala.saiu.includes(c));
    if (!ficam.length) { await this.encerrar('vazia'); return; }
    this.todos({ t: 'saiu', v: vaga });
    if (conta === sala.anfitriao) await this.trocarAnfitriao(sala);
    await this.guardar(sala); await this.agendar(sala);
  }
  /** troca de anfitrião: quem entrou primeiro (e está conectado) passa a dar o ritmo; ele manda o jogo de novo para todos */
  async trocarAnfitriao(sala, menos = null) {
    const novo = sala.ordem.find((c) => c !== menos && !sala.saiu.includes(c) && sala.caiu[c] === undefined && this.de(c));
    if (novo === undefined) return;   // ninguém conectado agora: quem voltar primeiro assume (ver alarm)
    sala.anfitriao = novo;
    this.todos({ t: 'anfitriao', v: this.vaga(sala, novo), fora: sala.saiu.map((c) => this.vaga(sala, c)) });
  }
  /** caiu: espera 30 s para voltar (as pessoas da tribo continuam o que faziam; o anfitrião caído para o ritmo) */
  async caiu(ws) {
    const a = ws.deserializeAttachment();
    if (!a || !a.conta || a.fora) return;
    a.fora = true; ws.serializeAttachment(a);
    const sala = await this.ctx.storage.get('sala'); if (!sala || this.vaga(sala, a.conta) < 0) return;
    if (this.de(a.conta)) return;   // já voltou por outra conexão
    if (sala.estado === 'espera' && a.conta !== sala.criador) { await this.saiu(sala, a.conta, null); return; }   // na espera: a vaga fica livre
    sala.caiu[a.conta] = Date.now() + ESPERA_MS;
    await this.guardar(sala); await this.agendar(sala);
    this.todos({ t: 'caiu', v: this.vaga(sala, a.conta) });
  }
  async agendar(sala) {
    const prazos = Object.values(sala.caiu);
    if (prazos.length) await this.ctx.storage.setAlarm(Math.min(...prazos)); else await this.ctx.storage.deleteAlarm();
  }
  async webSocketClose(ws) {
    await this.caiu(ws);
    try { ws.close(1000, 'tchau'); } catch { /* já fechada */ }
  }
  async webSocketError(ws) { await this.caiu(ws); }

  async alarm() {
    const sala = await this.ctx.storage.get('sala'); if (!sala) return;
    const agora = Date.now();
    for (const [c, prazo] of Object.entries(sala.caiu)) {
      const conta = Number(c);
      if (prazo > agora) continue;
      if (this.de(conta)) { delete sala.caiu[c]; continue; }
      if (sala.estado === 'espera') { await this.encerrar('criador'); return; }   // quem criou não voltou
      await this.saiu(sala, conta, null);
      const ainda = await this.ctx.storage.get('sala'); if (!ainda) return;
      Object.assign(sala, ainda);
    }
    // o anfitrião saiu quando ninguém estava conectado: quem estiver agora assume
    if (sala.estado === 'jogo' && (sala.saiu.includes(sala.anfitriao)) && !this.de(sala.anfitriao)) await this.trocarAnfitriao(sala);
    await this.guardar(sala); await this.agendar(sala);
  }
}
