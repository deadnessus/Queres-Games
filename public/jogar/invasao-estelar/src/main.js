// Invasão Estelar: telas, entrada (toque e teclado), laço do jogo e fluxo de conta/ranking.
import * as L from './logica.js?v=11';
import { novaPartida, avancar, resultado, estatisticas } from './motor.js?v=11';
import { desenharPartida, pintarFundo, definirQualidade, iniciarSalto, definirMenosTremor } from './desenho.js?v=11';
import {
  desenharJogador, desenharInimigo, definirResolucao, TIPOS, CORES_NAVE, definirCorDaNave, corAtualDaNave,
  definirNaveDoJogador, naveAtualDoJogador,
} from './naves.js?v=11';
import { novosEfeitos, reagir, atualizarEfeitos, rastroDoMotor, chefeExplodindo } from './efeitos.js?v=11';
import {
  temSite, eu, iniciarPartida, enviarPartida, ranking, progresso, escolherNaveECor, desafio, iniciarDesafio, enviarDesafio,
  amigoEnviar,
} from './conta-ponte.js?v=11';
import { iniciarAmigos } from './amigos.js?v=11';
import {
  montarPatente, montarMissoes, montarMedalhas, montarProgressoDoFim, linhaDeRanking, textoDoMeuLugar, iconeNave, faltamPontos,
} from './piloto.js?v=11';
import { NAVES, textoDoRequisito, resumoDoProgresso, progressoNovo } from './progresso.js?v=11';
import { liberarSom, tocar, vibrar, alternarEfeitos, alternarMusica, efeitosLigados, musicaLigada } from './som.js?v=11';
import { tocarMusica, pararMusica, intensidadeDaOnda } from './musica.js?v=11';
import { explodirCruzadorAoFundo, limparAcontecimentos } from './cenario.js?v=11';
import { NIVEIS, novoMedidor, contarQuadro, nivelInicial } from './qualidade.js?v=11';

const $ = (id) => document.getElementById(id);
// Aviso anônimo para a medição do queres.games (nunca dá erro; sem o site, não faz nada). Ver CLAUDE.md.
const evento = (nome, dados) => { try { if (window.QG && window.QG.evento) window.QG.evento(nome, dados); } catch (e) { /* medição nunca atrapalha o jogo */ } };
const LS_RECORDE = 'invasao_estelar_recorde';
const recordeDo = (modo) => (modo === 'recruta' ? `${LS_RECORDE}_recruta` : LS_RECORDE);
const LS_QUALIDADE = 'invasao_estelar_qualidade';
const LS_COR = 'invasao_estelar_cor';
const LS_NAVE = 'invasao_estelar_nave';
const LS_TREMOR = 'invasao_estelar_menos_tremor';
const TELAS = [
  'tela-inicio', 'tela-ranking', 'tela-desafio', 'tela-piloto', 'tela-hangar', 'tela-opcoes', 'tela-jogo', 'tela-fim',
  'tela-amigos', 'tela-sala', 'tela-codigo', 'tela-fim-online',
];
const naveHangar = document.getElementById('nave-hangar');
const gh = naveHangar.getContext('2d');

const canvas = $('campo');
const g = canvas.getContext('2d');
const fundo = $('fundo');
const gf = fundo.getContext('2d');
const naveMenu = $('nave-menu');
const gn = naveMenu.getContext('2d');

let partida = null; // estado do motor
let efeitos = novosEfeitos();
let partidaServidor = null; // id da partida no servidor (só se a pessoa estiver logada)
// null | 'sem-site' (jogo fora do queres.games) | 'sem-servidor' (sem conexão agora) | 'convidado' (jogando sem conta)
// | 'recruta' (o Recruta não vale ranking)
let semRanking = null;
let modoAtual = 'normal'; // 'normal' ou 'recruta'
let parada = 0; // segundos de pausa curtinha num impacto grande (o jogo para, os efeitos continuam)
let rodando = false;
let pausado = false;
let ultimoQuadro = 0;
const relogio = { sobra: 0 }; // tempo que ainda falta andar, em passos fixos de L.PASSO (ver avancar, em motor.js)
let estadoConta = null; // { logado, apelido } ou null (sem servidor)
let progressoConta = null; // patente, medalhas, missões e naves da conta (do servidor), ou null sem conta
let desafioAtual = null; // { dia, semente, oficial } quando a partida é o desafio do dia (ou o treino dele)
let codigoAtual = null; // { codigo, partida } quando a partida é um desafio por código (de um amigo)
let online = null; // partida online (duelo ou esquadrão) rodando: { tocarPausa }
let desafioDoDia = null; // a situação do desafio de hoje (do servidor)
let escopoDesafio = 'dia';
let escopoRanking = 'geral';
const teclas = { esq: false, dir: false };
const toques = new Map(); // pointerId -> -1 (esquerda) ou 1 (direita)

/* ---------- utilidades ---------- */
function mostrar(id) {
  for (const t of TELAS) $(t).hidden = t !== id;
}

function lerRecorde(modo) {
  try { return Number(localStorage.getItem(recordeDo(modo))) || 0; } catch (e) { return 0; }
}
function guardarRecorde(modo, pontos) {
  try { localStorage.setItem(recordeDo(modo), String(pontos)); } catch (e) { /* sem armazenamento */ }
}

function lerTexto(chave) {
  try { return localStorage.getItem(chave); } catch (e) { return null; }
}
function guardarTexto(chave, valor) {
  try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ }
}

/* ---------- menos tremor (acessibilidade): sem balanço de tela nem clarões fortes ---------- */
function reduzirMovimentoDoSistema() {
  try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
}
let menosTremor = lerTexto(LS_TREMOR) ? lerTexto(LS_TREMOR) === 'sim' : reduzirMovimentoDoSistema();
function aplicarTremor() {
  definirMenosTremor(menosTremor);
  efeitos.tremorMax = menosTremor ? 0 : 1;
}

/* ---------- qualidade automática (qualidade.js) ---------- */
function lerQualidade() {
  try { return localStorage.getItem(LS_QUALIDADE); } catch (e) { return null; }
}
function guardarQualidade(nivel) {
  try { localStorage.setItem(LS_QUALIDADE, String(nivel)); } catch (e) { /* sem armazenamento */ }
}
// Começa um nível melhor que o guardado: se o celular só estava ocupado, o jogo volta a ficar bonito.
const medidor = novoMedidor(nivelInicial(lerQualidade()));
function aplicarQualidade() {
  const q = NIVEIS[medidor.nivel];
  definirQualidade(q);
  efeitos.fator = q.particulas;
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
  definirResolucao(ajustarTela(canvas, g, NIVEIS[medidor.nivel].densidade));
}

function ajustarFundo() {
  medirVista();
  ajustarTela(fundo, gf, Math.min(1.5, NIVEIS[medidor.nivel].densidade));
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
  if (!$('tela-hangar').hidden) desenharNaveGirando(s);
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
  if (!rodando && !online) return;
  e.preventDefault();
  liberarSom();
  if (noBotaoDePausa(e)) {
    if (online) online.tocarPausa(); // no online a partida não para: o botão pergunta se quer sair
    else alternarPausa();
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
  if (!rodando && !online) return;
  if (TECLAS_ESQ.includes(e.code)) { teclas.esq = true; e.preventDefault(); }
  if (TECLAS_DIR.includes(e.code)) { teclas.dir = true; e.preventDefault(); }
  if (e.code === 'KeyP' || e.code === 'Escape') {
    if (online) online.tocarPausa();
    else alternarPausa();
  }
});
window.addEventListener('keyup', (e) => {
  if (TECLAS_ESQ.includes(e.code)) teclas.esq = false;
  if (TECLAS_DIR.includes(e.code)) teclas.dir = false;
});
document.addEventListener('visibilitychange', () => {
  if (online) amigos.visibilidade(document.hidden);
  else if (document.hidden && rodando && !pausado) alternarPausa();
});
window.addEventListener('resize', () => {
  ajustarFundo();
  if (rodando || online) ajustarCanvas();
  else ajustarMenu();
});

/* ---------- laço do jogo ---------- */
const SONS = {
  tiro: 'tiro', explosao: 'explosao', perdeu: 'perdeu', fase: 'fase', vida: 'vida',
  escudo_gasto: 'escudo', escudo_quebrou: 'vidro', dano: 'dano', furia: 'furia', bomba: 'bomba',
  raio: 'raio', teia: 'teia', meteoro_passou: 'ponto', meteoro_quebrou: 'explosao', bomba_jogador: 'bombaJogador',
  fugiram: 'fugiram', casco: 'casco', parte_caiu: 'parte', chefe_derrotado: 'chefeCaiu', salto: 'salto',
};

// Música da partida: a do chefão na onda dele; nas outras, mais intensa conforme a onda.
function atualizarMusica() {
  if (!partida) return;
  if (partida.onda.especie === 'chefe') tocarMusica('chefe', 3);
  else tocarMusica('partida', intensidadeDaOnda(partida.onda));
}

function tratarEventos(t) {
  const tocados = new Set(); // o mesmo som uma vez só por quadro
  const som = (nome, arg) => {
    if (tocados.has(nome)) return;
    tocados.add(nome);
    tocar(nome, arg);
  };
  for (const ev of partida.eventos.splice(0)) {
    parada = Math.max(parada, reagir(efeitos, ev));
    if (SONS[ev.tipo]) som(SONS[ev.tipo]);
    if (ev.tipo === 'disparo') som('disparo', ev.tiro);
    if (ev.tipo === 'capsula') som('capsula', ev.capsula);
    if (ev.tipo === 'aviso' && ev.tiro === 'raio') som('carregando');
    if (ev.tipo === 'fase') {
      explodirCruzadorAoFundo(t); // ao fundo, um cruzador explode quando a onda acaba
      atualizarMusica();
    }
    if (ev.tipo === 'salto') iniciarSalto(t);
    if (ev.tipo === 'chefe_derrotado') evento('chefe', { numero: ev.chefe + 1, resultado: 'venceu' });
    if (ev.tipo === 'explosao' && ev.mult >= 2) som('combo', ev.mult);
    if (ev.tipo === 'perdeu') vibrar(80);
    if (ev.tipo === 'escudo_gasto') vibrar(30);
  }
}

function quadro(t) {
  if (!rodando) return;
  const dt = ultimoQuadro ? Math.min((t - ultimoQuadro) / 1000, 0.25) : 0;
  ultimoQuadro = t;
  let alfa = L.clamp(relogio.sobra / L.PASSO, 0, 1);
  if (!pausado) {
    if (parada > 0) {
      // pausa curtinha num impacto grande: a partida para, os efeitos continuam
      parada = Math.max(0, parada - dt);
    } else {
      // o jogo anda em passos fixos (L.PASSO): em qualquer celular, a mesma semente e os mesmos toques dão a mesma partida.
      // O desenho fica entre o passo anterior e o atual (alfa), para o movimento sair liso em qualquer tela.
      alfa = avancar(partida, relogio, dt, direcaoDaEntrada());
      tratarEventos(t / 1000);
    }
    const dtVisual = Math.min(dt, 0.05);
    atualizarEfeitos(efeitos, dtVisual);
    const c = partida.chefe;
    if (c && !c.vivo && c.morrendo > 0) chefeExplodindo(efeitos, c.x, c.y, c.id === 'nave-mae' ? 240 : 110, dtVisual);
    if (partida.estado === 'jogando') rastroDoMotor(efeitos, L.entre(partida.jxAntes, partida.jx, alfa), L.Y_JOGADOR, dtVisual);
    if (contarQuadro(medidor, dt)) {
      guardarQualidade(medidor.nivel);
      aplicarQualidade();
      ajustarCanvas();
      evento('qualidade_reduzida', { nivel: medidor.nivel });
    }
  }
  desenharPartida(g, partida, efeitos, t / 1000, vista, alfa);
  if (partida.estado === 'fim') {
    terminar();
    return;
  }
  requestAnimationFrame(quadro);
}

function alternarPausa() {
  if (!rodando) return;
  pausado = !pausado;
  if (pausado) {
    evento('partida_pausada');
    pararMusica();
  } else {
    atualizarMusica();
  }
  $('pausa').hidden = !pausado;
  ultimoQuadro = 0; // não cobra o tempo da pausa (a sobra fica: o desenho não pula ao pausar)
}

function comecarPartida({ semente, rotulo = '' } = {}) {
  partida = novaPartida({ modo: modoAtual, nave: naveAtualDoJogador(), semente, rotulo });
  const modo = codigoAtual ? 'amigo' : desafioAtual ? (desafioAtual.oficial ? 'desafio' : 'treino') : modoAtual;
  const comConta = partidaServidor || codigoAtual || (desafioAtual && desafioAtual.oficial);
  evento('partida_iniciada', { modo, conta: comConta ? 'sim' : 'nao' });
  parada = 0;
  efeitos = novosEfeitos();
  aplicarQualidade();
  aplicarTremor();
  limparAcontecimentos();
  atualizarMusica();
  desligarMenu();
  mostrar('tela-jogo');
  ajustarCanvas();
  rodando = true;
  pausado = false;
  $('pausa').hidden = true;
  ultimoQuadro = 0;
  relogio.sobra = 0;
  toques.clear();
  requestAnimationFrame(quadro);
}

async function terminar() {
  rodando = false;
  toques.clear();
  tocar('fim');
  vibrar(200);
  const res = resultado(partida);
  const est = estatisticas(partida);
  evento('partida_terminada', { onda: res.fase });
  if (partida.onda.especie === 'chefe') evento('chefe', { numero: partida.onda.chefe + 1, resultado: 'perdeu' });
  pararMusica();
  partida = null;
  mostrar('tela-fim');
  ligarMenu();
  $('fim-pontos').textContent = String(res.pontos);
  const partes = [`${res.naves} ${res.naves === 1 ? 'nave derrubada' : 'naves derrubadas'}`];
  if (est.meteoros) partes.push(`${est.meteoros} ${est.meteoros === 1 ? 'meteoro desviado' : 'meteoros desviados'}`);
  if (est.capsulas) partes.push(`${est.capsulas} ${est.capsulas === 1 ? 'cápsula' : 'cápsulas'}`);
  $('fim-detalhe').textContent = partes.join(' · ');
  const recorde = lerRecorde(modoAtual);
  const novoRecorde = res.pontos > recorde && res.pontos > 0;
  if (novoRecorde) guardarRecorde(modoAtual, res.pontos);
  $('fim-recorde').textContent = `${modoAtual === 'recruta' ? 'Recorde do Recruta' : 'Recorde'} neste aparelho: ${Math.max(recorde, res.pontos)}`;
  mostrarEstatisticas(res, est, novoRecorde);

  const aviso = $('fim-ranking');
  $('fim-progresso').hidden = true;
  $('btn-placar-codigo').hidden = !codigoAtual;
  $('fim-convite').hidden = semRanking !== 'convidado';
  $('btn-entrar-fim').hidden = false;
  $('fim-convite-texto').textContent = 'Sem conta, este recorde fica só neste aparelho. Entre na conta para aparecer no ranking, ganhar patente, medalhas, missões e naves novas.';
  const desafioOficial = desafioAtual && desafioAtual.oficial;
  if (codigoAtual && codigoAtual.partida) {
    // desafio por código: cada partida conta (vale a melhor de cada piloto)
    const { codigo, partida: id } = codigoAtual;
    codigoAtual = { codigo, partida: null };
    aviso.textContent = 'Salvando no placar do código...';
    const r = await amigoEnviar(id, res, est, est.nave);
    if (r.ok) {
      aviso.textContent = `Desafio ${codigo}: ${r.posicao}º de ${r.total}${r.faltam ? ` · ${faltamPontos(r.faltam, r.posicao - 1)}` : ''}`;
      evento('online', { modo: 'amigo', resultado: r.posicao === 1 ? 'venceu' : 'perdeu' });
      mostrarProgresso(r.progresso);
    } else {
      aviso.textContent = `Não deu para salvar no placar do código: ${r.erro}.`;
    }
  } else if (desafioOficial) {
    const { dia } = desafioAtual;
    desafioAtual = { ...desafioAtual, oficial: false }; // a tentativa vale uma vez; "jogar de novo" vira treino
    aviso.textContent = 'Salvando o desafio...';
    const r = await enviarDesafio(dia, res, est, est.nave);
    if (r.ok) {
      aviso.textContent = `Desafio de hoje: ${r.posicao}º de ${r.total}${r.faltam ? ` · ${faltamPontos(r.faltam, r.posicao - 1)}` : ''}`;
      mostrarProgresso(r.progresso);
    } else {
      aviso.textContent = `Não deu para salvar o desafio: ${r.erro}.`;
    }
  } else if (desafioAtual) {
    aviso.textContent = 'Treino do desafio: não vale ranking.';
  } else if (partidaServidor) {
    const id = partidaServidor;
    partidaServidor = null;
    aviso.textContent = 'Salvando no ranking...';
    const r = await enviarPartida(id, res, est, est.nave);
    if (r.ok) {
      const partes = [];
      if (r.geral.posicao) partes.push(`Geral: ${r.geral.posicao}º de ${r.geral.total}`);
      if (r.mes.posicao) partes.push(`Do mês: ${r.mes.posicao}º de ${r.mes.total}`);
      if (r.geral.faltam) partes.push(faltamPontos(r.geral.faltam, r.geral.posicao - 1));
      aviso.textContent = partes.length ? partes.join(' · ') : 'Salvo no ranking.';
      mostrarProgresso(r.progresso);
    } else {
      aviso.textContent = `Não deu para salvar no ranking: ${r.erro}.`;
    }
  } else if (semRanking === 'sem-servidor') {
    aviso.textContent = 'Sem conexão com o ranking. Esta partida não foi salva lá.';
  } else if (semRanking === 'recruta') {
    aviso.textContent = temSite() ? 'O Recruta é para treinar: não vale ranking.' : '';
  } else {
    aviso.textContent = '';
  }
}

// Experiência, patente, medalhas novas e missões que completaram nesta partida.
function mostrarProgresso(prog) {
  if (!prog) return;
  montarProgressoDoFim($('fim-progresso'), prog);
  progressoConta = prog.resumo;
  prog.missoes.forEach((i) => evento('missao_concluida', { numero: i + 1 }));
  atualizarHangar();
}

// Tela de resultado: onda, maior combo, precisão e os inimigos derrubados de cada tipo.
function caixaDeNumero(rotulo, valor) {
  return elemento('div', { class: 'numero' }, elemento('span', { class: 'valor', text: valor }), elemento('span', { class: 'rotulo', text: rotulo }));
}

function iconeInimigo(tipo, quantos) {
  const tela = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  tela.width = Math.round(44 * dpr);
  tela.height = Math.round(36 * dpr);
  const gi = tela.getContext('2d');
  gi.scale(dpr, dpr);
  gi.translate(22, 18);
  desenharInimigo(gi, tipo, 0, 0.5);
  return elemento('div', { class: 'inimigo-fim', title: TIPOS[tipo].nome }, tela, elemento('span', { text: `×${quantos}` }));
}

function mostrarEstatisticas(res, est, novoRecorde) {
  $('fim-novo-recorde').hidden = !novoRecorde;
  $('fim-stats').replaceChildren(
    caixaDeNumero('onda', String(res.fase)),
    caixaDeNumero('maior combo', `×${est.maiorCombo}`),
    caixaDeNumero('precisão', `${est.precisao}%`),
  );
  const inimigos = est.porTipo.map((n, tipo) => (n ? iconeInimigo(tipo, n) : null)).filter(Boolean);
  $('fim-inimigos').replaceChildren(...inimigos);
  $('fim-inimigos').hidden = inimigos.length === 0;
}

/* ---------- início, ranking e conta ---------- */
function atualizarBotoesDeConta() {
  const servidor = estadoConta !== null;
  $('btn-conta').hidden = !servidor;
  $('btn-ranking').hidden = !servidor;
  $('btn-desafio').hidden = !servidor;
  $('btn-amigos').hidden = !servidor;
  $('btn-piloto').hidden = !servidor;
  $('dica-conta').hidden = !servidor || estadoConta.logado;
  if (servidor) $('btn-conta').textContent = estadoConta.logado ? `Perfil: ${estadoConta.apelido}` : 'Entrar';
}

// No fim de uma partida sem conta: entrar (ou criar a conta) para a próxima valer no ranking.
async function entrarDepoisDaPartida() {
  const r = await window.QGConta.entrar();
  if (!r) return;
  estadoConta = await eu() || { logado: true, apelido: r.apelido };
  atualizarBotoesDeConta();
  carregarProgresso();
  $('btn-entrar-fim').hidden = true;
  $('fim-convite-texto').textContent = `Pronto, você entrou como ${r.apelido}. A próxima partida já vale para o ranking, a patente e as missões.`;
}

function abrirInicio() {
  mostrar('tela-inicio');
  ajustarMenu();
  ligarMenu();
  tocarMusica('menu', 0);
}

/* ---------- progresso da conta (patente, medalhas, missões, naves) ---------- */
const logado = () => Boolean(estadoConta && estadoConta.logado);
const navesLiberadas = () => (progressoConta ? progressoConta.naves : ['padrao']);

// Lê o progresso da conta. A nave e a cor escolhidas antes de entrar (se liberadas) vão para a conta.
async function carregarProgresso() {
  progressoConta = logado() ? await progresso() : null;
  const p = progressoConta;
  if (p) {
    const local = lerTexto(LS_NAVE);
    if (local && local !== p.nave && p.naves.includes(local)) escolherNaveECor({ nave: local });
    else definirNaveDoJogador(p.nave);
    const cor = lerTexto(LS_COR);
    if (cor && cor !== p.cor) escolherNaveECor({ cor });
    else definirCorDaNave(p.cor);
  }
  // sem conta, só a nave inicial e as cores que não são de conta
  if (!navesLiberadas().includes(naveAtualDoJogador())) definirNaveDoJogador('padrao');
  const cor = CORES_NAVE.find((c) => c.id === corAtualDaNave());
  if (!corLiberada(cor)) definirCorDaNave('azul');
  atualizarHangar();
}

/* ---------- hangar: a nave girando, as naves e a cor ---------- */
function corLiberada(cor) {
  return !cor.conta || logado();
}

function montarHangar() {
  $('naves-do-hangar').replaceChildren(...NAVES.map((nave) => {
    const b = elemento('button', { class: 'nave-opcao', type: 'button', role: 'radio', 'data-nave': nave.id, 'aria-label': nave.nome });
    b.append(iconeNave(nave.id, 34), elemento('span', { text: nave.nome }));
    b.addEventListener('click', () => escolherNave(nave.id));
    return b;
  }));
  const lista = $('cores-da-nave');
  lista.replaceChildren(...CORES_NAVE.map((cor) => {
    const b = elemento('button', { class: 'cor', type: 'button', role: 'radio', 'data-cor': cor.id, 'aria-label': cor.nome });
    b.style.setProperty('--cor', `linear-gradient(135deg, ${cor.asa[0]}, ${cor.asa[1]} 60%, ${cor.faixa})`);
    b.addEventListener('click', () => escolherCor(cor.id));
    return b;
  }));
  atualizarHangar();
}

function atualizarHangar() {
  const naveAtual = naveAtualDoJogador();
  const liberadas = navesLiberadas();
  for (const b of document.querySelectorAll('.nave-opcao')) {
    b.setAttribute('aria-checked', String(b.dataset.nave === naveAtual));
    b.disabled = !liberadas.includes(b.dataset.nave);
  }
  const nave = NAVES.find((n) => n.id === naveAtual);
  const bloqueadas = NAVES.filter((n) => !liberadas.includes(n.id));
  $('traco-da-nave').textContent = `${nave.nome}: ${nave.traco.toLowerCase()}.`
    + (bloqueadas.length ? ` ${logado() ? 'Para liberar' : 'Com conta, dá para liberar'}: ${bloqueadas.map((n) => `${n.nome} (${textoDoRequisito(n)})`).join(', ')}.` : '');
  const atual = corAtualDaNave();
  for (const b of document.querySelectorAll('.cor')) {
    const cor = CORES_NAVE.find((c) => c.id === b.dataset.cor);
    b.setAttribute('aria-checked', String(cor.id === atual));
    b.disabled = !corLiberada(cor);
  }
  $('nome-da-cor').textContent = CORES_NAVE.find((c) => c.id === atual).nome;
  const dourada = CORES_NAVE.find((c) => c.conta);
  $('dica-hangar').textContent = corLiberada(dourada)
    ? `A cor ${dourada.nome.toLowerCase()} é um presente para quem tem conta.`
    : `A cor ${dourada.nome.toLowerCase()} é para quem entra na conta do site.`;
}

function escolherCor(id) {
  const cor = CORES_NAVE.find((c) => c.id === id);
  if (!cor || !corLiberada(cor)) return;
  definirCorDaNave(id);
  guardarTexto(LS_COR, id);
  if (logado()) escolherNaveECor({ cor: id });
  tocar('capsula', 'duplo');
  atualizarHangar();
}

function escolherNave(id) {
  if (!navesLiberadas().includes(id)) return;
  definirNaveDoJogador(id);
  guardarTexto(LS_NAVE, id);
  if (logado()) escolherNaveECor({ nave: id });
  tocar('capsula', 'escudo');
  atualizarHangar();
}

/* ---------- tela do piloto: patente, missões da semana e medalhas ---------- */
async function abrirPiloto() {
  mostrar('tela-piloto');
  ligarMenu();
  $('status-piloto').textContent = 'Carregando...';
  await carregarProgresso();
  const resumo = progressoConta || { ...resumoDoProgresso(progressoNovo()), medalhas: [] };
  montarPatente($('piloto-patente'), resumo);
  montarMissoes($('piloto-missoes'), resumo);
  montarMedalhas($('piloto-medalhas'), resumo);
  $('status-piloto').textContent = progressoConta ? '' : 'Entre na conta para ganhar experiência, patente, medalhas, missões e naves novas.';
}

/* ---------- desafio do dia ---------- */
const formatarDia = (dia) => `${dia.slice(8, 10)}/${dia.slice(5, 7)}`;
function formatarEspera(ms) {
  const min = Math.max(1, Math.round(ms / 60000));
  return min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`;
}

async function abrirDesafio(escopo = escopoDesafio) {
  escopoDesafio = escopo;
  mostrar('tela-desafio');
  ligarMenu();
  for (const b of document.querySelectorAll('[data-desafio]')) b.classList.toggle('on', b.dataset.desafio === escopo);
  const situacao = $('desafio-situacao');
  situacao.textContent = 'Carregando...';
  $('lista-desafio').replaceChildren();
  $('status-desafio').textContent = '';
  const d = await desafio(escopo);
  if (escopo !== escopoDesafio) return;
  $('btn-jogar-desafio').hidden = true;
  $('btn-treinar-desafio').hidden = true;
  if (!d) {
    situacao.textContent = 'O desafio está indisponível agora.';
    return;
  }
  desafioDoDia = d;
  $('desafio-dia').textContent = `Desafio de ${formatarDia(d.dia)} · o próximo começa em ${formatarEspera(d.proximoEm)}`;
  if (!logado()) {
    situacao.textContent = 'Todo mundo joga as mesmas ondas hoje. Entre na conta para jogar: uma tentativa vale ranking, e depois dá para treinar à vontade.';
    $('btn-jogar-desafio').hidden = false;
    $('btn-jogar-desafio').textContent = 'Entrar e jogar';
  } else if (!d.jogou) {
    situacao.textContent = 'Todo mundo joga as mesmas ondas hoje. Você tem uma tentativa que vale ranking; depois dá para treinar à vontade.';
    $('btn-jogar-desafio').hidden = false;
    $('btn-jogar-desafio').textContent = 'Jogar o desafio';
  } else if (d.resultado) {
    situacao.textContent = `Hoje você fez ${d.resultado.pontos.toLocaleString('pt-BR')} pontos (onda ${d.resultado.fase}). Agora é treino à vontade.`;
    $('btn-treinar-desafio').hidden = !d.semente;
  } else {
    situacao.textContent = 'Sua tentativa de hoje começou e não terminou. Dá para treinar à vontade; amanhã tem outro desafio.';
    $('btn-treinar-desafio').hidden = !d.semente;
  }
  const rotuloFase = escopo === 'mes' ? (i) => `${i.dias} ${i.dias === 1 ? 'dia' : 'dias'}` : (i) => `onda ${i.fase}`;
  const lista = $('lista-desafio');
  lista.replaceChildren(...d.top.map((i) => linhaDeRanking(i, { eu: Boolean(d.eu && i.posicao === d.eu.posicao), rotuloFase })));
  if (d.eu && d.eu.posicao > d.top.length) lista.append(elemento('li', { class: 'separador', text: '···' }), linhaDeRanking(d.eu, { eu: true, rotuloFase }));
  $('status-desafio').textContent = d.total
    ? `${d.total} ${d.total === 1 ? 'piloto' : 'pilotos'} ${escopo === 'mes' ? 'neste mês (pontos por posição de cada dia)' : 'hoje'}`
    : `Ninguém jogou ${escopo === 'mes' ? 'neste mês' : 'hoje'} ainda.`;
}

async function jogarDesafio() {
  liberarSom();
  if (!logado()) {
    const r = await window.QGConta.entrar();
    if (!r) return;
    estadoConta = await eu() || { logado: true, apelido: r.apelido };
    atualizarBotoesDeConta();
    await carregarProgresso();
    abrirDesafio('dia');
    return;
  }
  const d = await iniciarDesafio();
  if (d.erro) {
    $('desafio-situacao').textContent = `${d.erro[0].toUpperCase()}${d.erro.slice(1)}.`;
    return;
  }
  desafioAtual = { dia: d.dia, semente: d.semente, oficial: true };
  desafioDoDia = { ...(desafioDoDia || {}), dia: d.dia, semente: d.semente, jogou: true };
  codigoAtual = null;
  modoAtual = 'normal';
  partidaServidor = null;
  semRanking = null;
  evento('desafio_dia');
  comecarPartida({ semente: d.semente, rotulo: 'DESAFIO' });
}

function treinarDesafio() {
  if (!desafioDoDia || !desafioDoDia.semente) return;
  liberarSom();
  desafioAtual = { dia: desafioDoDia.dia, semente: desafioDoDia.semente, oficial: false };
  codigoAtual = null;
  modoAtual = 'normal';
  partidaServidor = null;
  semRanking = 'treino';
  comecarPartida({ semente: desafioDoDia.semente, rotulo: 'TREINO' });
}

function ajustarHangar() {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const caixa = naveHangar.getBoundingClientRect();
  naveHangar.width = Math.max(1, Math.round(caixa.width * dpr));
  naveHangar.height = Math.max(1, Math.round(caixa.height * dpr));
  const escala = naveHangar.width / 200;
  gh.setTransform(escala, 0, 0, escala, 0, 0);
  definirResolucao(Math.max(escala * 2.2, 2));
}

// Gira em volta do próprio eixo, como num toca-discos: a largura encolhe e cresce.
function desenharNaveGirando(s) {
  gh.clearRect(0, 0, 200, 200);
  const giro = Math.cos(s * 1.4);
  gh.save();
  gh.translate(100, 104 + Math.sin(s * 2) * 4);
  gh.scale(Math.max(0.06, Math.abs(giro)), 1);
  desenharJogador(gh, 0, 0, s, 0, 2.3);
  gh.restore();
  // brilho passando pela nave
  gh.save();
  gh.globalCompositeOperation = 'lighter';
  const brilho = gh.createRadialGradient(100, 104, 4, 100, 104, 90);
  brilho.addColorStop(0, `rgba(120,200,255,${0.12 + 0.1 * Math.abs(Math.sin(s * 1.4))})`);
  brilho.addColorStop(1, 'rgba(120,200,255,0)');
  gh.fillStyle = brilho;
  gh.fillRect(0, 0, 200, 200);
  gh.restore();
}

function abrirHangar() {
  mostrar('tela-hangar');
  atualizarHangar();
  ajustarHangar();
  ligarMenu();
}

/* ---------- opções ---------- */
function atualizarOpcoes() {
  const m = musicaLigada();
  const e = efeitosLigados();
  $('btn-musica').textContent = m ? 'Música: ligada' : 'Música: desligada';
  $('btn-musica').setAttribute('aria-pressed', String(m));
  $('btn-efeitos').textContent = e ? 'Efeitos: ligados' : 'Efeitos: desligados';
  $('btn-efeitos').setAttribute('aria-pressed', String(e));
  $('btn-tremor').textContent = menosTremor ? 'Menos tremor: sim' : 'Menos tremor: não';
  $('btn-tremor').setAttribute('aria-pressed', String(menosTremor));
}

function abrirOpcoes() {
  mostrar('tela-opcoes');
  atualizarOpcoes();
  ligarMenu();
}

async function abrirRanking(escopo = escopoRanking) {
  escopoRanking = escopo;
  evento('ranking_aberto', { escopo });
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
  const linha = (item) => linhaDeRanking(item, { eu: Boolean(logado() && r.eu && item.posicao === r.eu.posicao) });
  lista.replaceChildren(...r.top.map(linha));
  if (r.eu && r.eu.posicao > r.top.length) lista.append(elemento('li', { class: 'separador', text: '···' }), linha(r.eu));
  $('meu-lugar').textContent = logado() ? textoDoMeuLugar(r.eu) : '';
  const onde = escopo === 'mes' ? 'neste mês' : 'no geral';
  status.textContent = r.total ? `${r.total} ${r.total === 1 ? 'piloto' : 'pilotos'} ${onde}` : `Ainda não há partidas ${onde}.`;
}

async function jogar(modo = modoAtual) {
  modoAtual = modo === 'recruta' ? 'recruta' : 'normal';
  desafioAtual = null;
  codigoAtual = null;
  liberarSom();
  partidaServidor = null;
  semRanking = null;
  if (modoAtual === 'recruta') {
    semRanking = 'recruta'; // treino: não abre partida no servidor
  } else if (temSite()) {
    const e = await eu();
    if (e === null) {
      semRanking = 'sem-servidor'; // sem conexão com o servidor: joga, mas não entra no ranking
    } else if (!e.logado) {
      // sem conta, joga normalmente; só o ranking fica de fora (o servidor precisa contar o tempo desde o começo)
      semRanking = 'convidado';
      $('aviso-inicio').textContent = '';
    } else {
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
  if (partida && rodando) evento('saiu_da_partida', { onda: partida.fase });
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
  await carregarProgresso();
}


/* ---------- jogar com amigos (amigos.js): online e desafio por código ---------- */
const amigos = iniciarAmigos({
  $, elemento, mostrar, ligarMenu, desligarMenu, abrirInicio, evento,
  g, vista,
  logado,
  async entrar() {
    const r = await window.QGConta.entrar();
    if (!r) return false;
    estadoConta = await eu() || { logado: true, apelido: r.apelido };
    atualizarBotoesDeConta();
    await carregarProgresso();
    return logado();
  },
  naveAtual: () => naveAtualDoJogador(),
  naveIndice: () => Math.max(0, NAVES.findIndex((n) => n.id === naveAtualDoJogador())),
  corIndice: () => Math.max(0, CORES_NAVE.findIndex((c) => c.id === corAtualDaNave())),
  menosTremor: () => menosTremor,
  direcaoDaEntrada,
  // a tela do jogo passa a ser do online (o duelo e o esquadrão têm laço próprio)
  entrarNoJogo(ganchos) {
    rodando = false;
    pausado = false;
    partida = null;
    online = ganchos;
    $('pausa').hidden = true;
    desligarMenu();
    aplicarQualidade();
    aplicarTremor();
    limparAcontecimentos();
    mostrar('tela-jogo');
    ajustarCanvas();
    toques.clear();
  },
  sairDoJogo() {
    online = null;
    toques.clear();
  },
  // desafio por código: uma partida normal com a semente do código (vale o placar do código)
  jogarCodigo({ codigo, semente, partida: id }) {
    modoAtual = 'normal';
    desafioAtual = null;
    partidaServidor = null;
    semRanking = 'codigo';
    codigoAtual = { codigo, partida: id };
    comecarPartida({ semente, rotulo: 'AMIGO' });
  },
});

/* ---------- ligar tudo ---------- */
function ligarBotoes() {
  $('btn-jogar').addEventListener('click', () => jogar('normal'));
  $('btn-recruta').addEventListener('click', () => jogar('recruta'));
  $('btn-ranking').addEventListener('click', () => abrirRanking('geral'));
  $('btn-conta').addEventListener('click', botaoConta);
  $('btn-hangar').addEventListener('click', abrirHangar);
  $('btn-opcoes').addEventListener('click', abrirOpcoes);
  $('btn-voltar-hangar').addEventListener('click', abrirInicio);
  $('btn-voltar-opcoes').addEventListener('click', abrirInicio);
  $('btn-musica').addEventListener('click', () => {
    if (alternarMusica()) tocarMusica('menu', 0);
    else pararMusica();
    atualizarOpcoes();
  });
  $('btn-efeitos').addEventListener('click', () => { alternarEfeitos(); atualizarOpcoes(); tocar('capsula', 'duplo'); });
  $('btn-tremor').addEventListener('click', () => {
    menosTremor = !menosTremor;
    guardarTexto(LS_TREMOR, menosTremor ? 'sim' : 'nao');
    aplicarTremor();
    atualizarOpcoes();
  });
  // o navegador só toca som depois de um toque: o primeiro toque em qualquer lugar liga a música do menu
  document.addEventListener('pointerdown', () => {
    liberarSom();
    if (!rodando && $('tela-jogo').hidden) tocarMusica('menu', 0);
  });
  $('btn-voltar-ranking').addEventListener('click', abrirInicio);
  for (const b of document.querySelectorAll('[data-escopo]')) b.addEventListener('click', () => abrirRanking(b.dataset.escopo));
  $('btn-continuar').addEventListener('click', alternarPausa);
  $('btn-sair').addEventListener('click', sairParaInicio);
  // depois do desafio do dia (ou do treino dele), "jogar de novo" treina o mesmo desafio; no desafio por código, joga
  // o mesmo código de novo
  $('btn-de-novo').addEventListener('click', () => {
    if (codigoAtual) amigos.jogarCodigo(codigoAtual.codigo);
    else if (desafioAtual) treinarDesafio();
    else jogar(modoAtual);
  });
  $('btn-amigos').addEventListener('click', () => amigos.abrir());
  $('btn-placar-codigo').addEventListener('click', () => codigoAtual && amigos.abrirCodigo(codigoAtual.codigo));
  $('btn-desafio').addEventListener('click', () => abrirDesafio('dia'));
  $('btn-piloto').addEventListener('click', abrirPiloto);
  $('btn-voltar-desafio').addEventListener('click', abrirInicio);
  $('btn-voltar-piloto').addEventListener('click', abrirInicio);
  $('btn-jogar-desafio').addEventListener('click', jogarDesafio);
  $('btn-treinar-desafio').addEventListener('click', treinarDesafio);
  for (const b of document.querySelectorAll('[data-desafio]')) b.addEventListener('click', () => abrirDesafio(b.dataset.desafio));
  $('btn-inicio-fim').addEventListener('click', abrirInicio);
  $('btn-entrar-fim').addEventListener('click', entrarDepoisDaPartida);
  if (window.QGConta) window.QGConta.aoMudar((e) => { estadoConta = e; atualizarBotoesDeConta(); carregarProgresso(); });
}

async function iniciar() {
  aplicarQualidade();
  aplicarTremor();
  definirCorDaNave(lerTexto(LS_COR) || 'azul');
  definirNaveDoJogador(lerTexto(LS_NAVE) || 'padrao');
  ligarBotoes();
  montarHangar();
  ajustarFundo();
  abrirInicio();
  estadoConta = await eu();
  atualizarBotoesDeConta();
  await carregarProgresso(); // naves e cor dourada só com conta
}

iniciar();
