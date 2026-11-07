import * as THREE from 'three';

// ---------- partículas (InstancedMesh) ----------
export class Particles {
  constructor(scene, max = 700) {
    this.max = max; this.n = 0;
    const g = new THREE.IcosahedronGeometry(0.5, 0);
    this.mesh = new THREE.InstancedMesh(g, new THREE.MeshBasicMaterial({ color: 0xffffff }), max);
    this.mesh.frustumCulled = false; this.mesh.count = 0;
    this.mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3);
    scene.add(this.mesh);
    this.p = [];
    this.m = new THREE.Matrix4(); this.q = new THREE.Quaternion(); this.v = new THREE.Vector3(); this.s = new THREE.Vector3(); this.c = new THREE.Color();
  }
  burst(x, y, z, color, n = 10, speed = 3, size = 0.12, life = 0.7, grav = 9) {
    for (let i = 0; i < n; i++) {
      if (this.p.length >= this.max) this.p.shift();
      const a = Math.random() * 6.283, u = Math.random() * 0.8 + 0.2;
      this.p.push({ x, y, z, vx: Math.cos(a) * speed * u, vy: (Math.random() * 0.8 + 0.4) * speed, vz: Math.sin(a) * speed * u, life, t: life, size: size * (0.6 + Math.random() * 0.8), color: Array.isArray(color) ? color[(Math.random() * color.length) | 0] : color, grav });
    }
  }
  update(dt) {
    const arr = this.p; let k = 0;
    for (let i = 0; i < arr.length; i++) {
      const p = arr[i]; p.t -= dt; if (p.t <= 0) continue;
      p.vy -= p.grav * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      const sc = p.size * Math.min(1, p.t / (p.life * 0.5));
      this.v.set(p.x, p.y, p.z); this.s.set(sc, sc, sc);
      this.m.compose(this.v, this.q, this.s); this.mesh.setMatrixAt(k, this.m);
      this.c.set(p.color); this.mesh.instanceColor.setXYZ(k, this.c.r, this.c.g, this.c.b);
      arr[k++] = p;
    }
    arr.length = k; this.mesh.count = k;
    this.mesh.instanceMatrix.needsUpdate = true; this.mesh.instanceColor.needsUpdate = true;
  }
}

// ---------- sons sintetizados (sem arquivos) ----------
export class Sfx {
  constructor() { this.ctx = null; this.on = true; }
  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
      const d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      this.noiseBuf = buf;
      // vento ambiente
      const src = this.ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = this.ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 380;
      this.windGain = this.ctx.createGain(); this.windGain.gain.value = 0.05;
      src.connect(f); f.connect(this.windGain); this.windGain.connect(this.ctx.destination); src.start();
      this.windF = f;
    } catch { this.ctx = null; }
  }
  tone(freq, dur, type = 'sine', vol = 0.15, slide = 0) {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(this.ctx.destination); o.start(t); o.stop(t + dur);
  }
  noise(dur, freq = 1200, vol = 0.2, type = 'bandpass') {
    if (!this.ctx || !this.on) return;
    const t = this.ctx.currentTime, s = this.ctx.createBufferSource(); s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq;
    const g = this.ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    s.connect(f); f.connect(g); g.connect(this.ctx.destination); s.start(t, Math.random()); s.stop(t + dur);
  }
  hit() { this.noise(0.12, 900, 0.25); this.tone(140, 0.12, 'square', 0.1, -60); }
  chop() { this.noise(0.09, 500, 0.3); this.tone(220, 0.08, 'triangle', 0.12, -100); }
  place() { this.tone(300, 0.1, 'triangle', 0.15, 200); this.noise(0.07, 2200, 0.08); }
  hurt() { this.tone(180, 0.25, 'sawtooth', 0.15, -110); }
  splash() { this.noise(0.35, 1800, 0.18); }
  growl(big = 1) { this.tone(90 / big, 0.45, 'sawtooth', 0.1, -30); this.noise(0.4, 300, 0.12); }
  pick() { this.tone(660, 0.08, 'sine', 0.12, 330); }
  door() { this.tone(110, 0.18, 'square', 0.08, -40); }
  setWind(v) { if (this.windGain) this.windGain.gain.value = 0.02 + v * 0.08; }
  setUnderwater(u) { if (this.windF) this.windF.frequency.value = u ? 160 : 380; }
}
