// Invasão Estelar: telas, entrada (toque e teclado), laço do jogo e fluxo de conta/ranking.
import * as L from './logica.js';
import { novaPartida, atualizar, resultado } from './motor.js';
import { desenharPartida, pintarFundo } from './desenho.js';
import { desenharJogador, definirResolucao } from './naves.js';
import { novosEfeitos, reagir, atualizarEfeitos, rastroDoMotor } from './efeitos.js';
import { temSite, eu, iniciarPartida, enviarPartida, ranking } from './conta-ponte.js';
import { liberarSom, tocar, vibrar, alternarSom, somLigado } from './som.js';

const $ = (id) => document.getElementById(id);
const LS_RECORDE = 'invasao_estelar_recorde';
const TELAS = ['tela-inicio', 'tela-ranking', 'tela-jogo', 'tela-fim'];

const canvas = $('campo');
const g = canvas.getContext('2d');
const fundo = $('fundo');
const gf = fundo.getContext('2d');
const naveMenu = $('nave-menu');
const gn = naveMenu.getContext('2d');

let partida = null; // estado do motor
let efeitos = novosEfeitos();
let partidaServidor = null; // id da partida no servidor (só se a pessoa estiver logada)
let semRanking = null; // null | 'sem-site' (jogo fora do queres.games) | 'sem-servidor' (sem conexão agora)
let rodando = false;
let pausado = false;
let ultimoQuadro = 0;
let estadoConta = null; // { logado, apelido } ou null (sem servidor)
let escopoRanking = 'geral';
const teclas = { esq: false, dir: false };
const toques = new Map(); // pointerId -> -1 (esquerda) ou 1 (direita)

/* ---------- utilidades ---------- */
function mostrar(id) {
  for (const t of TELAS) $(t).hidden = t !== id;
}

function lerRecorde() {
  try { return Number(localStorage.getItem(LS_RECORDE)) || 0; } catch (e) { return 0; }
}
function guardarRecorde(pontos) {
  try { localStorage.setItem(LS_RECORDE, String(pontos)); } catch (e) { /* sem armazenamento */ }
}

function elemento(tag, attrs = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v);
  }
  n.append(...filhos);
  return n;
}

/* ---------- tamanho das telas ---------- */
// O campo do jogo é sempre 360 x 640. A tela inteira é usada: o que sobra acima e abaixo (celular comprido)
// mostra mais cenário; o que sobra dos lados (computador) fica escuro.
const vista = { escala: 1, ex: 0, ey: 0, topo: 0 };
const CENARIO_DO_MENU = 1;

function medirVista() {
  const larg = window.innerWidth;
  const alt = window.innerHeight;
  vista.escala = Math.min(larg / L.LARGURA, alt / L.ALTURA);
  vista.ex = (larg / vista.escala - L.LARGURA) / 2;
  vista.ey = (alt / vista.escala - L.ALTURA) / 2;
  // área do topo que o celular reserva (entalhe, barra): o painel fica abaixo dela
  vista.topo = $('sonda-topo').offsetHeight / vista.escala;
}

function ajustarTela(tela, contexto, densidadeMax) {
  const dpr = Math.min(densidadeMax, window.devicePixelRatio || 1);
  tela.width = Math.round(window.innerWidth * dpr);
  tela.height = Math.round(window.innerHeight * dpr);
  const e = vista.escala * dpr;
  contexto.setTransform(e, 0, 0, e, vista.ex * e, vista.ey * e);
  return e;
}

function ajustarCanvas() {
  medirVista();
  definirResolucao(ajustarTela(canvas, g, 2));
}

function ajustarFundo() {
  medirVista();
  ajustarTela(fundo, gf, 1.5);
}

function ajustarMenu() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const caixa = naveMenu.getBoundingClientRect();
  naveMenu.width = Math.max(1, Math.round(caixa.width * dpr));
  naveMenu.height = Math.max(1, Math.round(caixa.height * dpr));
  const escala = naveMenu.width / 200;
  gn.setTransform(escala, 0, 0, escala, 0, 0);
  definirResolucao(Math.max(escala * 1.6, 2));
}

/* ---------- fundo animado dos menus ---------- */
let menuRodando = false;
let menuInicio = 0;
function quadroMenu(t) {
  if (!menuRodando) return;
  if (!menuInicio) menuInicio = t;
  const s = (t - menuInicio) / 1000;
  pintarFundo(gf, s, vista, CENARIO_DO_MENU, 0.5);
  // nos menus o cenário fica mais apagado, para o texto e os botões lerem bem
  gf.fillStyle = 'rgba(2,3,12,.45)';
  gf.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  if (!$('tela-inicio').hidden) {
    gn.clearRect(0, 0, 200, 163);
    desenharJogador(gn, 100, 74 + Math.sin(s * 2) * 4, s, Math.sin(s * 1.3) * 90, 1.7);
  }
  requestAnimationFrame(quadroMenu);
}
function ligarMenu() {
  if (menuRodando) return;
  menuRodando = true;
  menuInicio = 0;
  requestAnimationFrame(quadroMenu);
}
function desligarMenu() {
  menuRodando = false;
}

/* ---------- entrada ---------- */
function ladoDoToque(e) {
  return e.clientX < window.innerWidth / 2 ? -1 : 1;
}

function direcaoDaEntrada() {
  let d = 0;
  for (const v of toques.values()) d += v;
  if (teclas.esq) d -= 1;
  if (teclas.dir) d += 1;
  return L.clamp(d, -1, 1);
}

// o toque no botão de pausa do painel não vale como movimento
function noBotaoDePausa(e) {
  // o painel fica no topo da tela: a posição do toque é medida a partir dele
  const x = e.clientX / vista.escala - vista.ex;
  const y = e.clientY / vista.escala - vista.topo;
  const a = L.AREA_PAUSA;
  return x >= a.x && x <= a.x + a.w && y >= a.y && y <= a.y + a.h;
}

canvas.addEventListener('pointerdown', (e) => {
  if (!rodando) return;
  e.preventDefault();
  liberarSom();
  if (noBotaoDePausa(e)) {
    alternarPausa();
    return;
  }
  canvas.setPointerCapture(e.pointerId);
  toques.set(e.pointerId, ladoDoToque(e));
});
for (const tipo of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  canvas.addEventListener(tipo, (e) => toques.delete(e.pointerId));
}

const TECLAS_ESQ = ['ArrowLeft', 'KeyA'];
const TECLAS_DIR = ['ArrowRight', 'KeyD'];
window.addEventListener('keydown', (e) => {
  if (!rodando) return;
  if (TECLAS_ESQ.includes(e.code)) { teclas.esq = true; e.preventDefault(); }
  if (TECLAS_DIR.includes(e.code)) { teclas.dir = true; e.preventDefault(); }
  if (e.code === 'KeyP' || e.code === 'Escape') alternarPausa();
});
window.addEventListener('keyup', (e) => {
  if (TECLAS_ESQ.includes(e.code)) teclas.esq = false;
  if (TECLAS_DIR.includes(e.code)) teclas.dir = false;
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden && rodando && !pausado) alternarPausa();
});
window.addEventListener('resize', () => {
  ajustarFundo();
  if (rodando) ajustarCanvas();
  else ajustarMenu();
});

/* ---------- laço do jogo ---------- */
const SONS = { tiro: 'tiro', explosao: 'explosao', disparo: 'disparo', perdeu: 'perdeu', fase: 'fase', vida: 'vida' };

function tratarEventos() {
  for (const ev of partida.eventos.splice(0)) {
    reagir(efeitos, ev);
    if (SONS[ev.tipo]) tocar(SONS[ev.tipo]);
    if (ev.tipo === 'perdeu') vibrar(80);
  }
}

function quadro(t) {
  if (!rodando) return;
  const dt = ultimoQuadro ? (t - ultimoQuadro) / 1000 : 0;
  ultimoQuadro = t;
  if (!pausado) {
    atualizar(partida, dt, direcaoDaEntrada());
    tratarEventos();
    atualizarEfeitos(efeitos, Math.min(dt, 0.05));
    if (partida.estado === 'jogando') rastroDoMotor(efeitos, partida.jx, L.Y_JOGADOR, Math.min(dt, 0.05));
  }
  desenharPartida(g, partida, efeitos, t / 1000, vista);
  if (partida.estado === 'fim') {
    terminar();
    return;
  }
  requestAnimationFrame(quadro);
}

function alternarPausa() {
  if (!rodando) return;
  pausado = !pausado;
  $('pausa').hidden = !pausado;
  ultimoQuadro = 0; // não cobra o tempo da pausa
}

function comecarPartida() {
  partida = novaPartida();
  efeitos = novosEfeitos();
  desligarMenu();
  mostrar('tela-jogo');
  ajustarCanvas();
  rodando = true;
  pausado = false;
  $('pausa').hidden = true;
  ultimoQuadro = 0;
  toques.clear();
  requestAnimationFrame(quadro);
}

async function terminar() {
  rodando = false;
  toques.clear();
  tocar('fim');
  vibrar(200);
  const res = resultado(partida);
  partida = null;
  mostrar('tela-fim');
  ligarMenu();
  $('fim-pontos').textContent = String(res.pontos);
  $('fim-detalhe').textContent = `Onda ${res.fase} · ${res.naves} ${res.naves === 1 ? 'nave derrubada' : 'naves derrubadas'}`;
  const recorde = lerRecorde();
  if (res.pontos > recorde) guardarRecorde(res.pontos);
  $('fim-recorde').textContent = `Recorde neste aparelho: ${Math.max(recorde, res.pontos)}`;

  const aviso = $('fim-ranking');
  if (partidaServidor) {
    const id = partidaServidor;
    partidaServidor = null;
    aviso.textContent = 'Salvando no ranking...';
    const r = await enviarPartida(id, res);
    if (r.ok) {
      const partes = [];
      if (r.geral.posicao) partes.push(`Geral: ${r.geral.posicao}º de ${r.geral.total}`);
      if (r.mes.posicao) partes.push(`Do mês: ${r.mes.posicao}º de ${r.mes.total}`);
      aviso.textContent = partes.length ? partes.join(' · ') : 'Salvo no ranking.';
    } else {
      aviso.textContent = `Não deu para salvar no ranking: ${r.erro}.`;
    }
  } else if (semRanking === 'sem-servidor') {
    aviso.textContent = 'Sem conexão com o ranking. Esta partida não foi salva lá.';
  } else {
    aviso.textContent = '';
  }
}

/* ---------- início, ranking e conta ---------- */
function atualizarBotoesDeConta() {
  const servidor = estadoConta !== null;
  $('btn-conta').hidden = !servidor;
  $('btn-ranking').hidden = !servidor;
  if (servidor) $('btn-conta').textContent = estadoConta.logado ? `Perfil: ${estadoConta.apelido}` : 'Entrar';
}

function abrirInicio() {
  mostrar('tela-inicio');
  ajustarMenu();
  ligarMenu();
}

async function abrirRanking(escopo = escopoRanking) {
  escopoRanking = escopo;
  mostrar('tela-ranking');
  ligarMenu();
  for (const b of document.querySelectorAll('[data-escopo]')) b.classList.toggle('on', b.dataset.escopo === escopo);
  const lista = $('lista-ranking');
  const status = $('status-ranking');
  lista.replaceChildren();
  status.textContent = 'Carregando...';
  const r = await ranking(escopo);
  if (escopo !== escopoRanking) return; // a pessoa trocou de aba enquanto carregava
  if (!r) {
    status.textContent = 'Ranking indisponível agora.';
    return;
  }
  const linha = (item) => elemento('li', { class: 'linha-rank' + (estadoConta && estadoConta.logado && r.eu && item.posicao === r.eu.posicao ? ' eu' : '') },
    elemento('span', { class: 'pos', text: `${item.posicao}º` }),
    elemento('span', { class: 'apelido', text: item.apelido }),
    elemento('span', { class: 'onda', text: `onda ${item.fase}` }),
    elemento('span', { class: 'pontos', text: String(item.pontos) }));
  lista.replaceChildren(...r.top.map(linha));
  if (r.eu && r.eu.posicao > r.top.length) lista.append(elemento('li', { class: 'separador', text: '···' }), linha(r.eu));
  const onde = escopo === 'mes' ? 'neste mês' : 'no geral';
  status.textContent = r.total ? `${r.total} ${r.total === 1 ? 'piloto' : 'pilotos'} ${onde}` : `Ainda não há partidas ${onde}.`;
}

async function jogar() {
  liberarSom();
  partidaServidor = null;
  semRanking = null;
  if (temSite()) {
    let e = await eu();
    if (e === null) {
      semRanking = 'sem-servidor'; // sem conexão com o servidor: joga, mas não entra no ranking
    } else {
      if (!e.logado) {
        // a partida só entra no ranking se o servidor começar a contar antes de jogar
        const r = await window.QGConta.entrar();
        if (!r) return;
        e = { logado: true, apelido: r.apelido };
      }
      partidaServidor = await iniciarPartida();
      if (!partidaServidor) {
        abrirInicio();
        $('aviso-inicio').textContent = 'Não consegui começar a partida agora. Tente de novo.';
        return;
      }
      $('aviso-inicio').textContent = '';
    }
    estadoConta = await eu() || estadoConta;
    atualizarBotoesDeConta();
  } else {
    semRanking = 'sem-site';
  }
  comecarPartida();
}

function sairParaInicio() {
  rodando = false;
  pausado = false;
  partida = null;
  partidaServidor = null;
  $('pausa').hidden = true;
  abrirInicio();
}

async function botaoConta() {
  if (estadoConta && estadoConta.logado) await window.QGConta.perfil();
  else await window.QGConta.entrar();
  estadoConta = await eu();
  atualizarBotoesDeConta();
}

function atualizarBotaoSom() {
  $('btn-som').textContent = somLigado() ? 'Som: ligado' : 'Som: desligado';
}

/* ---------- ligar tudo ---------- */
function ligarBotoes() {
  $('btn-jogar').addEventListener('click', jogar);
  $('btn-ranking').addEventListener('click', () => abrirRanking('geral'));
  $('btn-conta').addEventListener('click', botaoConta);
  $('btn-som').addEventListener('click', () => { alternarSom(); atualizarBotaoSom(); });
  $('btn-voltar-ranking').addEventListener('click', abrirInicio);
  for (const b of document.querySelectorAll('[data-escopo]')) b.addEventListener('click', () => abrirRanking(b.dataset.escopo));
  $('btn-continuar').addEventListener('click', alternarPausa);
  $('btn-sair').addEventListener('click', sairParaInicio);
  $('btn-de-novo').addEventListener('click', jogar);
  $('btn-inicio-fim').addEventListener('click', abrirInicio);
  if (window.QGConta) window.QGConta.aoMudar((e) => { estadoConta = e; atualizarBotoesDeConta(); });
}

async function iniciar() {
  ligarBotoes();
  atualizarBotaoSom();
  ajustarFundo();
  abrirInicio();
  estadoConta = await eu();
  atualizarBotoesDeConta();
}

iniciar();
