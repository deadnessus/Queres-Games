// Sons sintetizados na hora (Web Audio), sem nenhum arquivo de som de fora.
// O navegador só deixa tocar som depois de um toque: destravar() é chamado no primeiro toque ou tecla.
let ctx = null, mestre = null, ruidoBuf = null, vento = null;
let volume = 0.7;

export function destravarAudio() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      mestre = ctx.createGain();
      mestre.gain.value = volume;
      mestre.connect(ctx.destination);
      ruidoBuf = criarRuido(1.5);
    }
    if (ctx.state === 'suspended') ctx.resume();
  } catch (e) { /* sem som: o jogo segue */ }
}

export function pausarAudio() { try { if (ctx && ctx.state === 'running') ctx.suspend(); } catch (e) { /* nada */ } }
export function retomarAudio() { try { if (ctx && ctx.state === 'suspended') ctx.resume(); } catch (e) { /* nada */ } }

export function definirVolume(v0a10) {
  volume = Math.max(0, Math.min(10, v0a10)) / 10;
  if (mestre) mestre.gain.value = volume;
}

function criarRuido(seg) {
  const n = Math.floor(ctx.sampleRate * seg);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

const pronto = () => ctx && ctx.state === 'running' && volume > 0;

function envelope(g, t, ataque, total, pico) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(pico, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + total);
}

function tom(tipo, f0, f1, dur, pico = 0.3, destino = mestre) {
  const t = ctx.currentTime;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(f1, 20), t + dur);
  envelope(g, t, 0.005, dur, pico);
  o.connect(g).connect(destino);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function chiado(dur, freq, pico = 0.2, q = 1, tipoFiltro = 'lowpass') {
  const t = ctx.currentTime;
  const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
  s.buffer = ruidoBuf;
  f.type = tipoFiltro;
  f.frequency.value = freq;
  f.Q.value = q;
  envelope(g, t, 0.004, dur, pico);
  s.connect(f).connect(g).connect(mestre);
  s.start(t, Math.random() * 0.5);
  s.stop(t + dur + 0.02);
}

export const som = {
  tiro() { if (!pronto()) return; tom('square', 1300, 180, 0.13, 0.11); tom('sine', 600, 90, 0.16, 0.18); chiado(0.06, 3000, 0.06, 0.7, 'highpass'); },
  passo() { if (!pronto()) return; chiado(0.07, 380 + Math.random() * 200, 0.12, 0.8); },
  pulo() { if (!pronto()) return; tom('sine', 260, 520, 0.14, 0.12); },
  aterrissar() { if (!pronto()) return; chiado(0.1, 250, 0.2, 0.7); },
  estouro() { if (!pronto()) return; chiado(0.25, 2200, 0.18, 0.6, 'bandpass'); tom('triangle', 880, 1760, 0.18, 0.1); tom('sine', 1320, 2640, 0.25, 0.06); },
  acerto() { if (!pronto()) return; chiado(0.05, 900, 0.08, 1); },
  superaquecido() { if (!pronto()) return; tom('sawtooth', 140, 90, 0.35, 0.08); },
  clique() { if (!pronto()) return; tom('sine', 900, 700, 0.05, 0.08); },
  mensagem() { if (!pronto()) return; tom('sine', 1200, 1200, 0.04, 0.05); setTimeout(() => pronto() && tom('sine', 1600, 1600, 0.05, 0.05), 70); },

  // Vento de fundo: ruído filtrado bem baixinho, que sobe e desce devagar.
  ligarVento() {
    if (!ctx || vento) return;
    try {
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
      s.buffer = ruidoBuf; s.loop = true;
      f.type = 'lowpass'; f.frequency.value = 420; f.Q.value = 0.4;
      g.gain.value = 0.035;
      lfo.frequency.value = 0.07; lfoG.gain.value = 0.02;
      lfo.connect(lfoG).connect(g.gain);
      s.connect(f).connect(g).connect(mestre);
      s.start(); lfo.start();
      vento = { s, lfo };
    } catch (e) { /* sem vento */ }
  },
};
