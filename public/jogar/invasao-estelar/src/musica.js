// Música feita no próprio jogo (Web Audio), sem arquivos de fora: baixo, arpejo, acordes e bateria tocados por um
// sequenciador que agenda as notas um pouquinho à frente. Três climas: menu (calmo), partida (fica mais intensa nas
// ondas difíceis) e chefão (outra música, mais rápida). A música liga e desliga separada dos efeitos (som.js).
import { audio, musicaLigada } from './som.js?v=11';

const nota = (m) => 440 * Math.pow(2, (m - 69) / 12); // número MIDI -> Hz

// Cada clima: andamento, 4 acordes (um por compasso, em notas MIDI) e o baixo de cada compasso.
const CLIMAS = {
  // Lá menor, calmo: Am, Em, F, G
  menu: { bpm: 92, acordes: [[57, 60, 64], [52, 55, 59], [53, 57, 60], [55, 59, 62]], baixo: [45, 40, 41, 43] },
  // Lá menor, para a frente: Am, F, C, G
  partida: { bpm: 124, acordes: [[57, 60, 64], [53, 57, 60], [60, 64, 67], [55, 59, 62]], baixo: [45, 41, 36, 43] },
  // Ré menor, tenso: Dm, Bb, Gm, A
  chefe: { bpm: 140, acordes: [[50, 53, 57], [46, 50, 53], [43, 46, 50], [45, 49, 52]], baixo: [38, 34, 31, 33] },
};

const PASSOS = 64; // 4 compassos de 16 semicolcheias
const ADIANTE = 0.12; // segundos agendados à frente

let atual = null; // { clima, intensidade, passo, proximo }
let relogio = null;

function voz(a, tipo, freq, t0, dur, vol, filtro = 0) {
  const o = a.ctx.createOscillator();
  const g = a.ctx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  let saida = g;
  if (filtro) {
    const f = a.ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = filtro;
    g.connect(f);
    saida = f;
  }
  o.connect(g);
  saida.connect(a.saida);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

function bumbo(a, t0, vol) {
  const o = a.ctx.createOscillator();
  const g = a.ctx.createGain();
  o.frequency.setValueAtTime(150, t0);
  o.frequency.exponentialRampToValueAtTime(45, t0 + 0.12);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
  o.connect(g).connect(a.saida);
  o.start(t0);
  o.stop(t0 + 0.2);
}

function chiadoMusical(a, t0, dur, vol, tipo, freq) {
  const s = a.ctx.createBufferSource();
  const f = a.ctx.createBiquadFilter();
  const g = a.ctx.createGain();
  s.buffer = a.ruido;
  f.type = tipo;
  f.frequency.value = freq;
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  s.connect(f).connect(g).connect(a.saida);
  s.start(t0);
  s.stop(t0 + dur + 0.02);
}

// Toca um passo (semicolcheia) do clima. `n`: intensidade (0 calma, 1 normal, 2 forte, 3 muito forte).
function passo(a, c, n, p, t0, dur) {
  const compasso = Math.floor(p / 16) % 4;
  const s = p % 16;
  const acorde = c.acordes[compasso];
  const baixo = c.baixo[compasso];
  const menu = c === CLIMAS.menu;
  if (menu) {
    if (s === 0) for (const m of acorde) voz(a, 'triangle', nota(m), t0, dur * 16, 0.05);
    if (s % 4 === 0) voz(a, 'sine', nota(acorde[(s / 4) % 3] + 12), t0, dur * 3, 0.04);
    if (s === 0 || s === 8) voz(a, 'sine', nota(baixo), t0, dur * 7, 0.08);
    return;
  }
  // baixo em colcheias (na intensidade 3, pula oitava nos contratempos)
  if (s % 2 === 0) voz(a, 'sawtooth', nota(baixo + (n >= 3 && s % 4 === 2 ? 12 : 0)), t0, dur * 1.8, 0.1, 700);
  // arpejo em semicolcheias, subindo e descendo pelo acorde
  const ordem = [0, 1, 2, 1];
  const oitava = n >= 3 ? 24 : 12;
  voz(a, 'square', nota(acorde[ordem[s % 4]] + oitava), t0, dur * 0.9, n >= 2 ? 0.035 : 0.028, 2600);
  // acorde longo no começo do compasso
  if (s === 0) for (const m of acorde) voz(a, 'triangle', nota(m), t0, dur * 12, 0.025);
  // bateria
  const chefe = c === CLIMAS.chefe;
  if (s % (chefe ? 4 : 8) === 0) bumbo(a, t0, 0.32);
  if (n >= 2 && (s === 4 || s === 12)) chiadoMusical(a, t0, 0.12, 0.12, 'bandpass', 1800);
  if (n >= 2 && s % 2 === 0) chiadoMusical(a, t0, 0.04, 0.05, 'highpass', 7000);
  if (n >= 3 && s % 2 === 1) chiadoMusical(a, t0, 0.03, 0.03, 'highpass', 9000);
}

function agendar() {
  const a = audio();
  if (!atual || !a || !musicaLigada()) return;
  const c = CLIMAS[atual.clima];
  const dur = 60 / c.bpm / 4;
  // aba escondida ou celular travado: em vez de tocar tudo o que atrasou de uma vez, recomeça do agora
  if (atual.proximo < a.ctx.currentTime - 0.1) atual.proximo = a.ctx.currentTime + 0.05;
  while (atual.proximo < a.ctx.currentTime + ADIANTE) {
    passo(a, c, atual.intensidade, atual.passo, atual.proximo, dur);
    atual.proximo += dur;
    atual.passo = (atual.passo + 1) % PASSOS;
  }
}

// Começa (ou continua) a música de um clima. Trocar só a intensidade não recomeça a música.
export function tocarMusica(clima, intensidade = 1) {
  if (atual && atual.clima === clima) {
    atual.intensidade = intensidade;
    return;
  }
  const a = audio();
  atual = { clima, intensidade, passo: 0, proximo: a ? a.ctx.currentTime + 0.08 : 0 };
  if (!relogio) relogio = setInterval(agendar, 25);
}

export function pararMusica() {
  atual = null;
  if (relogio) {
    clearInterval(relogio);
    relogio = null;
  }
}

// Intensidade da partida pela onda: o começo de cada volta é mais calmo e as voltas seguintes, mais fortes.
export function intensidadeDaOnda(onda) {
  return Math.min(3, 1 + (onda.degrau >= 1 ? 1 : 0) + (onda.volta >= 2 ? 1 : 0));
}
