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
  golpe(tipo) {
    if (!pronto()) return;
    if (tipo === 'madeira') { tom('sine', 190, 90, 0.12, 0.22); chiado(0.06, 700, 0.12, 1); }
    else if (tipo === 'pedra') { chiado(0.05, 2600, 0.14, 1.2, 'bandpass'); tom('square', 520, 300, 0.05, 0.05); }
    else if (tipo === 'cristal') { tom('triangle', 1500, 1700, 0.12, 0.08); chiado(0.04, 4000, 0.06, 1, 'highpass'); }
    else chiado(0.09, 1400, 0.12, 0.6, 'bandpass');
  },
  quebrar(tipo) {
    if (!pronto()) return;
    if (tipo === 'madeira') { tom('sine', 140, 50, 0.35, 0.25); chiado(0.3, 500, 0.2, 0.7); }
    else if (tipo === 'cristal') { tom('triangle', 1800, 900, 0.3, 0.1); chiado(0.25, 3500, 0.12, 0.6, 'highpass'); }
    else chiado(0.25, tipo === 'pedra' ? 1800 : 1100, 0.2, 0.7, 'bandpass');
  },
  pegar() { if (!pronto()) return; tom('sine', 660, 990, 0.08, 0.08); },
  colocar() { if (!pronto()) return; tom('sine', 160, 110, 0.1, 0.2); chiado(0.05, 600, 0.1, 1); },
  criar() { if (!pronto()) return; [523, 659, 784].forEach((f, i) => setTimeout(() => pronto() && tom('triangle', f, f, 0.14, 0.09), i * 70)); },
  negado() { if (!pronto()) return; tom('square', 220, 160, 0.12, 0.06); },
  clique() { if (!pronto()) return; tom('sine', 900, 700, 0.05, 0.08); },
  mensagem() { if (!pronto()) return; tom('sine', 1200, 1200, 0.04, 0.05); setTimeout(() => pronto() && tom('sine', 1600, 1600, 0.05, 0.05), 70); },

  // ---- bichos ----
  rosnado() { if (!pronto()) return; tom('sawtooth', 120, 70, 0.3, 0.08); chiado(0.25, 500, 0.08, 2, 'bandpass'); },
  zumbido() { if (!pronto()) return; tom('sawtooth', 210, 260, 0.5, 0.06); tom('square', 420, 380, 0.5, 0.03); },
  bichoAcertado(tipo) { if (!pronto()) return; tom(tipo === 'saltito' ? 'sine' : 'square', tipo === 'saltito' ? 900 : 300, tipo === 'saltito' ? 1300 : 160, 0.12, 0.1); },
  bichoCaiu(tipo) { if (!pronto()) return; tom('triangle', tipo === 'saltito' ? 700 : 220, 80, 0.4, 0.12); chiado(0.3, 800, 0.08, 0.7); },
  dor() { if (!pronto()) return; tom('sine', 260, 120, 0.25, 0.2); chiado(0.12, 600, 0.12, 1); },
  desmaio() { if (!pronto()) return; tom('sine', 400, 60, 1.2, 0.18); },

  // ---- missões ----
  objetivo() { if (!pronto()) return; tom('triangle', 660, 660, 0.12, 0.08); setTimeout(() => pronto() && tom('triangle', 990, 990, 0.18, 0.08), 110); },
  missaoCompleta() {
    if (!pronto()) return;
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => pronto() && tom('triangle', f, f, i === 3 ? 0.5 : 0.16, 0.1), i * 120));
  },
  instalar() { if (!pronto()) return; chiado(0.08, 1200, 0.15, 1); setTimeout(() => pronto() && chiado(0.08, 900, 0.15, 1), 120); setTimeout(() => pronto() && tom('sine', 300, 900, 0.4, 0.12), 260); },
  bolaDeFogo() { if (!pronto()) return; chiado(0.5, 700, 0.12, 0.8); tom('sawtooth', 300, 120, 0.4, 0.05); },
  lava() { if (!pronto()) return; chiado(0.3, 2500, 0.12, 0.6, 'highpass'); tom('sine', 500, 200, 0.25, 0.1); },
  segredo() {
    if (!pronto()) return;
    [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => pronto() && tom('sine', f, f, i === 3 ? 0.6 : 0.18, 0.08), i * 90));
  },
  cristalVoando() { if (!pronto()) return; tom('sine', 1800, 700, 0.35, 0.06); tom('triangle', 2400, 1200, 0.3, 0.04); },
  estrela() { if (!pronto()) return; tom('sine', 1320, 1760, 0.2, 0.08); },

  // ---- Rifle de raio ----
  tiroForte() {
    if (!pronto()) return;
    tom('sawtooth', 900, 60, 0.5, 0.16); tom('sine', 220, 40, 0.6, 0.3); chiado(0.35, 2400, 0.14, 0.8, 'bandpass');
  },
  trocarArma() { if (!pronto()) return; chiado(0.06, 1800, 0.12, 1); setTimeout(() => pronto() && tom('square', 500, 760, 0.08, 0.05), 160); },
  // Zumbido que sobe enquanto o rifle carrega. Devolve { definir(0..1), parar() }.
  carga() {
    if (!pronto()) return { definir() {}, parar() {} };
    try {
      const o = ctx.createOscillator(), o2 = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      o.type = 'sawtooth'; o2.type = 'triangle'; f.type = 'lowpass'; f.frequency.value = 1800;
      o.frequency.value = 160; o2.frequency.value = 320; g.gain.value = 0;
      o.connect(f); o2.connect(f); f.connect(g).connect(mestre);
      o.start(); o2.start();
      return {
        definir(k) {
          const t = ctx.currentTime;
          o.frequency.setTargetAtTime(160 + 640 * k, t, 0.03);
          o2.frequency.setTargetAtTime(320 + 1300 * k, t, 0.03);
          g.gain.setTargetAtTime(0.02 + 0.06 * k, t, 0.05);
        },
        parar() { g.gain.setTargetAtTime(0, ctx.currentTime, 0.03); setTimeout(() => { try { o.stop(); o2.stop(); } catch (e) { /* já parou */ } }, 250); },
      };
    } catch (e) { return { definir() {}, parar() {} }; }
  },

  // ---- sons da abertura (no espaço) ----
  alarme() { if (!pronto()) return; tom('square', 880, 880, 0.18, 0.06); setTimeout(() => pronto() && tom('square', 660, 660, 0.18, 0.06), 220); },
  explosao(forte = 1) {
    if (!pronto()) return;
    chiado(1.4 * forte, 900, 0.5 * forte, 0.5); chiado(0.5, 3000, 0.2 * forte, 0.6, 'bandpass');
    tom('sine', 120, 28, 1.3 * forte, 0.5 * forte);
  },
  meteoroPassando() { if (!pronto()) return; chiado(0.5, 500 + Math.random() * 600, 0.08, 3, 'bandpass'); },
  // Som que fica tocando (motor, ronco da queda). Devolve { nivel(0..1), parar() }.
  laco(tipo) {
    if (!pronto()) return { nivel() {}, parar() {} };
    try {
      const g = ctx.createGain();
      g.gain.value = 0;
      g.connect(mestre);
      const fontes = [];
      if (tipo === 'motor') {
        for (const [f, tipoOnda] of [[55, 'sawtooth'], [82.5, 'triangle']]) {
          const o = ctx.createOscillator(), filtro = ctx.createBiquadFilter();
          o.type = tipoOnda; o.frequency.value = f; filtro.type = 'lowpass'; filtro.frequency.value = 260;
          o.connect(filtro).connect(g); o.start(); fontes.push(o);
        }
      } else {
        const s = ctx.createBufferSource(), filtro = ctx.createBiquadFilter();
        s.buffer = ruidoBuf; s.loop = true; filtro.type = 'lowpass'; filtro.frequency.value = 380;
        s.connect(filtro).connect(g); s.start(); fontes.push(s);
      }
      const max = tipo === 'motor' ? 0.12 : 0.6;
      return {
        nivel(n) { g.gain.setTargetAtTime(Math.max(0, Math.min(1, n)) * max, ctx.currentTime, 0.1); },
        parar() { g.gain.setTargetAtTime(0, ctx.currentTime, 0.03); setTimeout(() => { for (const f of fontes) try { f.stop(); } catch (e) { /* já parou */ } }, 300); },
      };
    } catch (e) { return { nivel() {}, parar() {} }; }
  },

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
