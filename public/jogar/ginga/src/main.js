// Inicialização, laço principal e ligação entre jogo, desenho e interface.
import { CONFIG } from './config.js';
import { criarRng } from './rng.js';
import { criarReconhecedor } from './gestures.js';
import { JogoLivre } from './livre.js';
import { criarRender } from './render.js';
import { ligarEntrada } from './input.js';
import { criarUI } from './ui.js';
import { ler, gravar, CHAVES } from './storage.js';

const url = new URLSearchParams(location.search);
const DEBUG = url.get('debug') === '1';
const TESTE = DEBUG || url.get('teste') === '1';
const semente = url.has('seed') ? Number(url.get('seed')) : Date.now();

const canvas = document.getElementById('jogo');
const rec = criarReconhecedor(CONFIG.gestos);
const render = criarRender(canvas);
const telaDeToque = window.matchMedia('(pointer: coarse)').matches;

let pausado = false;
let modoMenu = ler(CHAVES.modo, 'classico') === 'livre' ? 'livre' : 'classico';
let girar = false;
let alturaHud = 0;

const ui = criarUI({
  aoEscolherDificuldade(dif) {
    if (modoMenu === 'livre') {
      comecar(dif, 'livre');
      return;
    }
    if (!ler(CHAVES.tutorialVisto, false)) {
      ui.esconderMenu();
      ui.mostrarHud();
      ui.mostrarTutorial();
      medirHud();
      jogo.iniciarTutorial(dif);
      rec.reset();
      return;
    }
    comecar(dif, 'normal');
  },
  aoTreino: () => comecar('facil', 'treino'),
  aoTrocarModo(m) {
    modoMenu = m;
    gravar(CHAVES.modo, m);
    ui.mostrarMenu(infoRecorde());
  },
  aoComoDriblarMenu: () => ui.abrirConsulta('menu'),
  aoAjuda: () => alternarAjuda(),
  aoContinuar: () => fecharPausa(),
  aoSairMenu: () => irParaMenu(),
  aoProximaFase() {
    ui.esconderResultado();
    jogo.proximaFase();
    rec.reset();
  },
  aoRepetirFase() {
    ui.esconderResultado();
    jogo.repetirFase();
    rec.reset();
  },
  aoPularTutorial: () => jogo.pularTutorial(),
});

const jogo = new JogoLivre({
  rng: criarRng(semente),
  eventos: {
    resetGestos: () => rec.reset(),
    vibrar(ms) {
      try {
        if (navigator.vibrate) navigator.vibrate(ms);
      } catch {
        // sem vibração: ignora
      }
    },
    resultado: (res) => aoResultado(res),
    tutorialFim(dif) {
      gravar(CHAVES.tutorialVisto, true);
      ui.esconderTutorial();
      comecar(dif, 'normal');
    },
  },
});

function jogando() {
  return jogo.estado !== 'MENU' && jogo.estado !== 'RESULTADO';
}

function medirHud() {
  alturaHud = ui.alturaHud();
}

function comecar(dif, modo) {
  if (modo === 'normal' || modo === 'livre') gravar(CHAVES.ultimaDificuldade, dif);
  ui.esconderMenu();
  ui.esconderResultado();
  ui.esconderTutorial();
  ui.mostrarHud();
  medirHud();
  pausado = false;
  rec.reset();
  jogo.iniciar(dif, modo);
}

function infoRecorde() {
  const dificuldade = ler(CHAVES.ultimaDificuldade, 'facil');
  const dif = CONFIG.dificuldades[dificuldade] ? dificuldade : 'facil';
  return { dificuldade: dif, nome: CONFIG.dificuldades[dif].nome, recorde: ler(chaveRecorde(modoMenu, dif), 0), modo: modoMenu };
}

function chaveRecorde(modo, dif) {
  return modo === 'livre' ? CHAVES.recorde(`livre.${dif}`) : CHAVES.recorde(dif);
}

function irParaMenu() {
  pausado = false;
  rec.reset();
  jogo.irParaMenu();
  ui.fecharConsulta();
  ui.esconderResultado();
  ui.esconderTutorial();
  ui.esconderHud();
  medirHud();
  ui.mostrarMenu(infoRecorde());
}

function alternarAjuda() {
  if (ui.consultaAberta()) {
    if (ui.origemConsulta() === 'jogo') fecharPausa();
    else ui.fecharConsulta();
    return;
  }
  abrirPausa();
}

function abrirPausa() {
  if (!jogando()) return;
  pausado = true;
  rec.reset();
  jogo.cancelarGesto();
  ui.abrirConsulta('jogo');
}

function fecharPausa() {
  pausado = false;
  ui.fecharConsulta();
  ultimo = performance.now();
}

function aoResultado(res) {
  let novoRecorde = false;
  if (res.concluida && (jogo.modo === 'normal' || jogo.modo === 'livre')) {
    const chave = chaveRecorde(jogo.modo === 'livre' ? 'livre' : 'classico', res.dificuldade);
    if (res.total > ler(chave, 0)) {
      gravar(chave, res.total);
      novoRecorde = true;
    }
  }
  ui.mostrarResultado({ ...res, novoRecorde });
}

function tratar(ev) {
  if (ev.tipo === 'start') jogo.inicioGesto(ev.lado);
  else jogo.gesto(ev.drible, ev);
}

function verificarTela() {
  render.redimensionar();
  medirHud();
  const deitado = telaDeToque && window.innerWidth > window.innerHeight;
  if (deitado !== girar) {
    girar = deitado;
    ui.mostrarGirar(girar);
    if (girar) {
      rec.reset();
      jogo.cancelarGesto();
    }
  }
}

ligarEntrada({
  canvas,
  rec,
  jogo,
  tratar,
  ativo: () => !pausado && !girar,
  aoAjuda: alternarAjuda,
});

window.addEventListener('resize', verificarTela);
window.addEventListener('orientationchange', verificarTela);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && jogando() && !pausado) abrirPausa();
});

let ultimo = performance.now();
function quadro(agora) {
  const dt = Math.min(0.05, Math.max(0, (agora - ultimo) / 1000));
  ultimo = agora;
  if (!pausado && !girar) {
    for (const ev of rec.tick(agora)) tratar(ev);
    const escala = jogo.modo === 'treino' ? CONFIG.treino.velocidadeTempo : 1;
    jogo.atualizar(dt * escala);
  }
  if (jogando()) ui.atualizarHud(jogo.infoHud());
  render.desenhar(jogo, { debug: DEBUG, topoPx: alturaHud, dt });
  requestAnimationFrame(quadro);
}

verificarTela();
ui.mostrarMenu(infoRecorde());
requestAnimationFrame(quadro);

// Para testes automáticos no navegador.
if (TESTE) window.__ginga = { jogo, rec };
