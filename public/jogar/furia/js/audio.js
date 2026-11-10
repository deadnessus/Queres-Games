// Efeitos sonoros sintetizados com WebAudio (sem arquivos externos).
let ctx = null;
let master = null;
let noiseBuf = null;

export function initAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { ctx = null; }
}

function env(g, t, a, peak, dec) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
}

function tone(type, f0, f1, dur, vol = 0.3) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  env(g, t, 0.005, vol, dur);
  o.connect(g).connect(master);
  o.start(t); o.stop(t + dur + 0.05);
}

function noise(dur, vol, freq = 1200, q = 0.8, type = 'lowpass', vol2) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const s = ctx.createBufferSource();
  s.buffer = noiseBuf;
  const f = ctx.createBiquadFilter();
  f.type = type; f.frequency.value = freq; f.Q.value = q;
  const g = ctx.createGain();
  env(g, t, 0.004, vol2 ?? vol, dur);
  s.connect(f).connect(g).connect(master);
  s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
}

// volume relativo à distância (para sons 3D simples)
function dv(dist) { return dist == null ? 1 : Math.max(0, 1 - dist / 90); }

export const sfx = {
  swing() { noise(0.12, 0.25, 2500, 1, 'bandpass'); },
  hit(heavy) { noise(0.15, heavy ? 0.6 : 0.4, heavy ? 600 : 1200); tone('square', heavy ? 160 : 260, 60, 0.12, 0.15); },
  block() { tone('triangle', 900, 700, 0.08, 0.2); noise(0.06, 0.2, 4000, 2, 'highpass'); },
  special(color) { tone('sawtooth', 220, 880, 0.35, 0.12); noise(0.35, 0.2, 1800, 2, 'bandpass'); },
  ultimate() { tone('sawtooth', 80, 600, 0.9, 0.18); tone('square', 120, 900, 0.9, 0.08); noise(0.9, 0.3, 900); },
  jump() { tone('sine', 300, 600, 0.12, 0.12); },
  ko() { tone('sawtooth', 400, 40, 1.0, 0.25); },
  shoot(kind, dist) {
    const v = dv(dist);
    if (v <= 0.02) return;
    if (kind === 'sniper') { noise(0.4, 0.9 * v, 900); tone('square', 120, 40, 0.3, 0.2 * v); }
    else if (kind === 'lmg') { noise(0.09, 0.5 * v, 1100); }
    else if (kind === 'pistol') { noise(0.1, 0.45 * v, 1600); }
    else if (kind === 'smg') { noise(0.07, 0.4 * v, 2000); }
    else if (kind === 'cannon') { noise(0.8, 1.0 * v, 400); tone('sine', 90, 30, 0.6, 0.4 * v); }
    else { noise(0.1, 0.55 * v, 1300); }
  },
  explosion(dist) {
    const v = dv(dist);
    if (v <= 0.02) return;
    noise(1.2, 1.0 * v, 500); tone('sine', 70, 25, 1.0, 0.5 * v);
  },
  reload() { tone('square', 500, 450, 0.05, 0.08); setTimeout(() => tone('square', 700, 650, 0.05, 0.08), 180); },
  empty() { tone('square', 1200, 1100, 0.03, 0.06); },
  pickup() { tone('sine', 600, 1200, 0.15, 0.15); },
  hitmarker() { tone('triangle', 1500, 1400, 0.04, 0.08); },
  capture() { tone('sine', 500, 1000, 0.3, 0.15); setTimeout(() => tone('sine', 700, 1400, 0.3, 0.15), 150); },
  engine(dist) { tone('sawtooth', 60, 55, 0.15, 0.04 * dv(dist)); },
  whistle() { tone('sine', 1800, 500, 1.0, 0.07); },
  heal() { tone('sine', 500, 900, 0.4, 0.15); },
};
