// Telas do online: conta do queres.games, criar/entrar com código e sala de espera.
// Não existe chat: o nome de cada um é o apelido da conta (decidido no servidor) e o visual do personagem só
// aceita valores das listas do jogo.
import { CLASSES, ELEMENTS } from './character.js';
import { escapeHtml } from './fight.js';
import { onlineBase, httpDe, conectar } from './rede.js';

const $ = (id) => document.getElementById(id);
const esc = escapeHtml;

export const ON = { on: false, ws: null, id: null, host: false, room: '', players: [], cfg: { modo: 'luta2', times: 'contra', dif: 1 }, modos: {}, emJogo: false };
let H = {}; // ganchos do main.js: show, look(), startOnline(go), onLights(), onState(d), onInput(id, d), onSaiu(id, nome), onFim(motivo)

const MODO_NOME = { luta1: '🥊 Luta 1 x 1', luta2: '🥊 Luta 2 x 2', bf: '🪖 Battlefield' };
const MAX_PADRAO = { luta1: 2, luta2: 4, bf: 8 };
const maxDo = (modo) => (ON.modos[modo] && ON.modos[modo].max) || MAX_PADRAO[modo] || 8;

export function avisoRede(t) {
  const el = $('netToast');
  if (!el) return;
  el.textContent = t;
  el.classList.add('on');
  clearTimeout(avisoRede.to);
  avisoRede.to = setTimeout(() => el.classList.remove('on'), 4000);
}

function send(m) { if (ON.ws && ON.ws.readyState === 1) ON.ws.send(JSON.stringify(m)); }
export const enviarFoto = (d) => send({ t: 'st', d });
export const enviarControle = (d) => send({ t: 'i', d });
export const enviarPronto = () => send({ t: 'ready' });
export function avisarFim() { if (ON.host) send({ t: 'end' }); }

export function sairOnline() {
  const ws = ON.ws;
  ON.ws = null; ON.on = false; ON.emJogo = false; ON.players = [];
  try { if (ws) ws.close(); } catch (e) { /* já fechada */ }
}

// ---------- conta ----------
let apelidoAtual = null;
async function atualizarConta() {
  const area = $('onConta'); const acoes = $('onAcoes');
  acoes.classList.add('hidden');
  if (!window.QGConta) { area.innerHTML = '<p class="on-help">O modo online só funciona no site queres.games.</p>'; return null; }
  area.innerHTML = '<p class="on-help">Verificando sua conta...</p>';
  let eu = null;
  try { eu = await window.QGConta.me(); } catch (e) { eu = null; }
  if (!eu) { area.innerHTML = '<p class="on-help">Não consegui falar com o servidor de contas. Confira a internet e tente de novo.</p>'; return null; }
  if (eu.logado) {
    apelidoAtual = eu.apelido;
    area.innerHTML = `<div class="on-logada"><span>Você está como <b>${esc(eu.apelido)}</b></span><button type="button" class="on-link" id="onMinha">minha conta</button></div>`;
    $('onMinha').onclick = async () => { await window.QGConta.perfil(); atualizarConta(); };
    acoes.classList.remove('hidden');
    return eu.apelido;
  }
  apelidoAtual = null;
  area.innerHTML = '<p class="on-help"><b>Para jogar online, entre na sua conta do queres.games.</b><br>Seu nome no jogo vai ser o apelido da conta.</p><div class="on-conta-box"></div>';
  window.QGConta.montar(area.querySelector('.on-conta-box'), { aba: 'criar', rotuloFechar: 'Voltar', aoConcluir: () => atualizarConta(), aoFechar: () => H.show('menu') });
  return null;
}

export function abrirOnline() {
  H.show('online');
  $('onStatus').textContent = '';
  const c = H.look();
  $('onChar').innerHTML = `Você entra com o <b>Jogador 1</b>: ${CLASSES[c.cls].ico} ${CLASSES[c.cls].nome} · ${ELEMENTS[c.el].ico} ${ELEMENTS[c.el].nome}. Para trocar, monte o Jogador 1 antes de entrar.`;
  atualizarConta();
}

// ---------- criar / entrar ----------
async function entrarNaSala(modo, codigo) {
  const st = (t) => { $('onStatus').textContent = t; };
  if (!window.QGConta) { st('O modo online só funciona no site queres.games.'); return; }
  const apelido = apelidoAtual || (await atualizarConta());
  if (!apelido) { st('Entre na sua conta (acima) para jogar online.'); return; }
  if (modo === 'entrar' && !/^[A-Z2-9]{4}$/.test(codigo || '')) { st('Digite o código de 4 letras que seu amigo mandou.'); return; }
  $('onCriar').disabled = $('onEntrar').disabled = true;
  const base = onlineBase();
  try {
    if (modo === 'criar') {
      st('Criando a partida...');
      const r = await fetch(httpDe(base) + '/nova', { method: 'POST', credentials: 'include' });
      if (r.status === 401) throw new Error('Sua conta saiu. Entre de novo para jogar online.');
      if (!r.ok) throw new Error('Não consegui criar a partida agora. Tente de novo.');
      codigo = (await r.json()).codigo;
    } else st(`Entrando na partida ${codigo}...`);
    const { ws, welcome: w } = await conectar(`${base}/sala/${codigo}?modo=${modo}`, { t: 'join', look: H.look() }, aoReceber, aoFechar);
    Object.assign(ON, { on: true, ws, id: w.id, host: !!w.host, room: w.room, players: w.players || [], cfg: w.cfg || ON.cfg, modos: w.modos || {}, emJogo: false });
    if (ON.host) send({ t: 'cfg', ...ON.cfg });
    st('');
    H.show('lobby');
    $('lbMsg').textContent = '';
    renderLobby();
  } catch (e) {
    st('❌ ' + e.message);
  } finally {
    $('onCriar').disabled = $('onEntrar').disabled = false;
  }
}

// ---------- sala de espera ----------
function timeDe(i) {
  if (ON.cfg.modo === 'luta1') return i % 2;
  return ON.cfg.times === 'juntos' ? 0 : i % 2;
}
function renderLobby() {
  if (!ON.on) return;
  $('lbCode').textContent = ON.room;
  const max = maxDo(ON.cfg.modo);
  const n = ON.players.length;
  $('lbCount').textContent = `${n} na sala · ${MODO_NOME[ON.cfg.modo]}: até ${max}`;
  const linhas = ON.players.map((p, i) => {
    const c = CLASSES[(p.look || {}).cls] || CLASSES.guerreiro; const e = ELEMENTS[(p.look || {}).el] || ELEMENTS.fogo;
    const t = timeDe(i);
    return `<div class="lb-row ${p.id === ON.id ? 'eu' : ''}"><i class="lb-time t${t}" title="Time ${t ? 'Vermelho' : 'Azul'}"></i>
      <span>${c.ico}${e.ico} ${esc(p.name)}${p.id === ON.id ? ' (você)' : ''}</span>${p.host ? '<b title="criou a partida">👑</b>' : ''}</div>`;
  });
  for (let i = n; i < max; i++) linhas.push('<div class="lb-row vazio"><i class="lb-time"></i><span>vaga (vira bot)</span></div>');
  $('lbList').innerHTML = linhas.join('');
  $('lbHost').classList.toggle('hidden', !ON.host);
  $('lbGuest').classList.toggle('hidden', ON.host);
  document.querySelectorAll('#lbModo [data-v]').forEach((b) => b.classList.toggle('sel', b.dataset.v === ON.cfg.modo));
  document.querySelectorAll('#lbTimes [data-v]').forEach((b) => b.classList.toggle('sel', b.dataset.v === ON.cfg.times));
  document.querySelectorAll('#lbDif [data-v]').forEach((b) => b.classList.toggle('sel', +b.dataset.v === ON.cfg.dif));
  $('lbTimes').classList.toggle('hidden', ON.cfg.modo === 'luta1');
  let motivo = '';
  if (n < 2) motivo = 'Esperando pelo menos mais um amigo entrar…';
  else if (n > max) motivo = `${MODO_NOME[ON.cfg.modo]} é para até ${max} jogadores. Escolha outro modo.`;
  $('lbStart').disabled = !!motivo;
  $('lbStart').textContent = motivo ? 'Esperando…' : '▶ Começar a partida';
  $('lbWhy').textContent = motivo;
  const timesTxt = ON.cfg.modo === 'luta1' ? 'um contra o outro' : ON.cfg.times === 'juntos' ? 'todos juntos contra os bots' : 'times um contra o outro';
  $('lbGuest').innerHTML = `Modo: <b>${MODO_NOME[ON.cfg.modo]}</b> · ${timesTxt} · bots ${['fáceis', 'normais', 'difíceis'][ON.cfg.dif] || 'normais'}<br>Esperando quem criou começar…`;
}
function mudarCfg(campo, valor) {
  if (!ON.host) return;
  ON.cfg = { ...ON.cfg, [campo]: valor };
  renderLobby();
  send({ t: 'cfg', ...ON.cfg });
}

// ---------- mensagens do servidor ----------
function aoReceber(m) {
  switch (m.t) {
    case 'join':
      if (!ON.players.some((p) => p.id === m.id)) ON.players.push({ id: m.id, name: m.name, look: m.look, host: !!m.host });
      renderLobby();
      break;
    case 'look': { const p = ON.players.find((x) => x.id === m.id); if (p) { p.look = m.look; renderLobby(); } break; }
    case 'leave': {
      const p = ON.players.find((x) => x.id === m.id);
      ON.players = ON.players.filter((x) => x.id !== m.id);
      if (m.host) {
        ON.players.forEach((x) => { x.host = x.id === m.host; });
        if (m.host === ON.id) { ON.host = true; send({ t: 'cfg', ...ON.cfg }); avisoRede('Quem criou saiu: agora você comanda a sala.'); }
      }
      if (ON.emJogo) H.onSaiu(m.id, p ? p.name : '');
      else renderLobby();
      break;
    }
    case 'cfg': ON.cfg = m.cfg || ON.cfg; renderLobby(); break;
    case 'aviso':
      $('lbMsg').textContent = m.k === 'muitos' ? `Esse modo é para até ${m.max} jogadores.` : 'Espere pelo menos mais um amigo entrar.';
      break;
    case 'go':
      ON.emJogo = true;
      ON.players = m.players || ON.players;
      H.startOnline(m);
      send({ t: 'ready' });
      break;
    case 'lights': H.onLights(); break;
    case 'st': H.onState(m.d); break;
    case 'i': H.onInput(m.id, m.d); break;
    case 'over': H.onFim(m.motivo); break;
    default: break;
  }
}
function aoFechar(ws, ev) {
  if (ws !== ON.ws) return; // saída pedida por mim
  const emJogo = ON.emJogo;
  sairOnline();
  if (emJogo) H.onFim(ev && ev.code === 4001 ? 'outra' : 'caiu');
  else { H.show('menu'); avisoRede(ev && ev.code === 4001 ? 'Você entrou em outro lugar com a mesma conta.' : 'A conexão com a sala caiu.'); }
}

// ---------- início ----------
export function initOnline(hooks) {
  H = hooks;
  $('btnOnline').addEventListener('click', abrirOnline);
  $('onVoltar').addEventListener('click', () => H.show('menu'));
  $('onCriar').addEventListener('click', () => entrarNaSala('criar'));
  $('onEntrar').addEventListener('click', () => entrarNaSala('entrar', $('onCodigo').value.trim().toUpperCase()));
  $('onCodigo').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
  $('onCodigo').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('onEntrar').click(); });
  $('lbModo').addEventListener('click', (e) => { const v = e.target.closest('[data-v]'); if (v) mudarCfg('modo', v.dataset.v); });
  $('lbTimes').addEventListener('click', (e) => { const v = e.target.closest('[data-v]'); if (v) mudarCfg('times', v.dataset.v); });
  $('lbDif').addEventListener('click', (e) => { const v = e.target.closest('[data-v]'); if (v) mudarCfg('dif', +v.dataset.v); });
  $('lbStart').addEventListener('click', () => { if (ON.host) send({ t: 'start' }); });
  $('lbSair').addEventListener('click', () => { sairOnline(); H.show('menu'); });
  $('lbCopy').addEventListener('click', async () => {
    const link = `${location.origin}${location.pathname}?sala=${ON.room}`;
    const txt = `Vem jogar Fúria comigo! Abra ${link}, entre na sua conta e use o código ${ON.room}. Só dá para entrar antes de começar!`;
    try { await navigator.clipboard.writeText(txt); $('lbMsg').textContent = 'Convite copiado! 📋'; } catch (e) { $('lbMsg').textContent = 'Código: ' + ON.room; }
  });
  if (window.QGConta && window.QGConta.aoMudar) {
    // enquanto as telas de conta estão abertas, quem avisa é o aoConcluir (senão a tela "Conta criada!" sumiria)
    window.QGConta.aoMudar(() => { if ($('online').classList.contains('active') && !$('onConta').querySelector('.on-conta-box')) atualizarConta(); });
  }
  // link de convite: ?sala=ABCD abre a tela online com o código preenchido
  const c = (new URLSearchParams(location.search).get('sala') || '').toUpperCase();
  if (/^[A-Z2-9]{4}$/.test(c)) { $('onCodigo').value = c; setTimeout(abrirOnline, 0); }
}
