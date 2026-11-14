// Tiny procedural sound effects via WebAudio
export class Sfx {
  constructor() { this.ctx = null; this.engine = null; this.vol = 0.5; }
  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master = this.ctx.createGain(); this.master.gain.value = this.vol; this.master.connect(this.ctx.destination);
      const o = this.ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 50;
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 400;
      const g = this.ctx.createGain(); g.gain.value = 0;
      o.connect(f); f.connect(g); g.connect(this.master); o.start();
      this.engine = { o, g, f };
    } catch (e) { this.ctx = null; }
  }
  tone(freq, dur = 0.15, type = 'square', vol = 0.2, slide = 0) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
  }
  noise(dur = 0.2, vol = 0.3, freq = 800) {
    if (!this.ctx) return;
    const n = this.ctx.sampleRate * dur, b = this.ctx.createBuffer(1, n, this.ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const s = this.ctx.createBufferSource(); s.buffer = b;
    const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = freq;
    const g = this.ctx.createGain(); g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(this.master); s.start();
  }
  jump() { this.tone(300, 0.18, 'sine', 0.2, 300); }
  grab() { this.tone(500, 0.08, 'triangle', 0.2, 200); }
  throw() { this.tone(400, 0.2, 'triangle', 0.2, -250); }
  coin() { this.tone(988, 0.08, 'square', 0.12); setTimeout(() => this.tone(1319, 0.25, 'square', 0.12), 80); }
  bonk() { this.noise(0.25, 0.4, 500); this.tone(120, 0.2, 'sine', 0.3, -60); }
  crash(power) { this.noise(0.35, Math.min(0.6, power * 0.04), 1200); }
  horn() { this.tone(420, 0.5, 'square', 0.12); this.tone(530, 0.5, 'square', 0.1); }
  door() { this.tone(160, 0.1, 'square', 0.15, -40); }
  success() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.18, 'square', 0.12), i * 110)); }
  fail() { [392, 330, 262].forEach((f, i) => setTimeout(() => this.tone(f, 0.25, 'sawtooth', 0.1), i * 150)); }
  chat() { this.tone(880, 0.06, 'sine', 0.12); }
  splash() { this.noise(0.4, 0.3, 2000); }
  setEngine(on, speed, max) {
    if (!this.engine) return;
    const t = this.ctx.currentTime, k = Math.min(1, Math.abs(speed) / max);
    this.engine.g.gain.setTargetAtTime(on ? 0.06 + k * 0.05 : 0, t, 0.1);
    this.engine.o.frequency.setTargetAtTime(45 + k * 110, t, 0.1);
    this.engine.f.frequency.setTargetAtTime(300 + k * 900, t, 0.1);
  }
}
