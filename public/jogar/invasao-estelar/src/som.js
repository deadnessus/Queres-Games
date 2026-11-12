// Sons feitos no código (Web Audio), sem arquivos de áudio. Ligado/desligado fica salvo no aparelho.
const LS_SOM = 'invasao_estelar_som';

let ctx = null;
let ruido = null;
let ligado = true;

try { ligado = localStorage.getItem(LS_SOM) !== 'desligado'; } catch (e) { /* sem armazenamento */ }

export const somLigado = () => ligado;

export function alternarSom() {
  ligado = !ligado;
  try { localStorage.setItem(LS_SOM, ligado ? 'ligado' : 'desligado'); } catch (e) { /* sem armazenamento */ }
  return ligado;
}

// O navegador só deixa tocar som depois de um toque da pessoa: crie o contexto no primeiro toque.
export function liberarSom() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  const n = ctx.sampleRate * 0.3;
  ruido = ctx.createBuffer(1, n, ctx.sampleRate);
  const dados = ruido.getChannelData(0);
  for (let i = 0; i < n; i++) dados[i] = (Math.random() * 2 - 1) * (1 - i / n);
}

function tom(tipo, freq, fim, dur, vol, atraso = 0) {
  const t0 = ctx.currentTime + atraso;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, t0);
  o.frequency.exponentialRampToValueAtTime(fim, t0 + dur);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

const SONS = {
  tiro: () => tom('square', 1100, 260, 0.09, 0.06),
  explosao: () => {
    const s = ctx.createBufferSource();
    const g = ctx.createGain();
    s.buffer = ruido;
    g.gain.value = 0.22;
    s.connect(g).connect(ctx.destination);
    s.start();
  },
  disparo: () => tom('sawtooth', 340, 120, 0.2, 0.05),
  perdeu: () => tom('sawtooth', 300, 70, 0.45, 0.12),
  fase: () => { tom('triangle', 523, 523, 0.1, 0.12); tom('triangle', 659, 659, 0.1, 0.12, 0.09); tom('triangle', 784, 784, 0.16, 0.12, 0.18); },
  vida: () => { tom('sine', 660, 660, 0.1, 0.12); tom('sine', 880, 880, 0.14, 0.12, 0.1); },
  fim: () => tom('sawtooth', 220, 60, 0.7, 0.1),
};

export function tocar(nome) {
  if (!ligado || !ctx || ctx.state !== 'running' || !SONS[nome]) return;
  SONS[nome]();
}

export function vibrar(ms) {
  if (ligado && navigator.vibrate) navigator.vibrate(ms);
}
