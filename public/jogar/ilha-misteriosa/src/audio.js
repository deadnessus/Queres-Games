/* =====================================================================
 * audio.js — Som procedural (Web Audio), sem arquivos externos.
 * O áudio só é liberado após o primeiro gesto do jogador (regra dos
 * navegadores). Qualquer falha é engolida: som nunca quebra o jogo.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const MUTE_KEY = 'ilha_mute';

  const Audio = {
    ctx: null, master: null, noiseBuf: null, rain: null,
    muted: false, unlocked: false, lastStep: 0,

    init() {
      try { this.muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) { /* sem storage */ }
      const unlock = () => { this.unlock(); };
      ['pointerdown', 'keydown', 'touchstart'].forEach((ev) => document.addEventListener(ev, unlock, { passive: true }));
      document.addEventListener('click', (e) => { if (e.target && e.target.closest && e.target.closest('button')) this.play('click'); });
      this.updateButton();
    },

    /** Cria o AudioContext (uma vez) dentro de um gesto do usuário. */
    unlock() {
      if (this.unlocked) { try { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); } catch (e) { /* ignore */ } return; }
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.muted ? 0 : 0.5;
        this.master.connect(this.ctx.destination);
        const n = Math.floor(this.ctx.sampleRate);
        const buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
        const ch = buf.getChannelData(0);
        for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
        this.noiseBuf = buf;
        this.unlocked = true;
      } catch (e) { this.ctx = null; }
    },

    setMuted(m) {
      this.muted = !!m;
      try { localStorage.setItem(MUTE_KEY, this.muted ? '1' : '0'); } catch (e) { /* sem storage */ }
      try { if (this.master) this.master.gain.value = this.muted ? 0 : 0.5; } catch (e) { /* ignore */ }
      this.updateButton();
    },
    toggleMute() { this.setMuted(!this.muted); this.unlock(); return this.muted; },
    updateButton() {
      const b = document.getElementById('muteBtn');
      if (b) { b.textContent = this.muted ? '🔇' : '🔊'; b.title = this.muted ? 'Som desligado (clique para ligar)' : 'Som ligado (clique para desligar)'; }
    },

    ready() { return !!(this.ctx && this.master && !this.muted); },

    // ---- blocos básicos ----
    tone(freq, dur, type, vol, slideTo, delay) {
      const c = this.ctx; const t = c.currentTime + (delay || 0);
      const o = c.createOscillator(); const g = c.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.02);
    },
    noise(dur, vol, ftype, freq, q, delay) {
      const c = this.ctx; const t = c.currentTime + (delay || 0);
      const s = c.createBufferSource(); s.buffer = this.noiseBuf;
      const f = c.createBiquadFilter(); f.type = ftype || 'lowpass'; f.frequency.value = freq || 800; f.Q.value = q || 1;
      const g = c.createGain();
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      s.connect(f); f.connect(g); g.connect(this.master); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
    },

    /** Toca um efeito pelo nome. Nunca lança erro. */
    play(name, arg) {
      try {
        if (!this.ready()) return;
        switch (name) {
          case 'click': this.tone(660, 0.05, 'square', 0.04); break;
          case 'chop': this.noise(0.12, 0.5, 'bandpass', 900, 1.2); this.tone(140, 0.09, 'triangle', 0.25, 70); break;
          case 'stone': this.noise(0.08, 0.35, 'highpass', 2500, 0.8); this.tone(320, 0.06, 'square', 0.06, 200); break;
          case 'pick': this.noise(0.09, 0.3, 'bandpass', 1800, 1); this.tone(420, 0.07, 'triangle', 0.08, 300); break;
          case 'pickup': this.tone(520, 0.08, 'triangle', 0.1, 780); break;
          case 'build': this.noise(0.1, 0.5, 'lowpass', 500, 1); this.tone(110, 0.1, 'triangle', 0.3, 60); this.noise(0.1, 0.5, 'lowpass', 500, 1, 0.14); this.tone(100, 0.1, 'triangle', 0.3, 55, 0.14); break;
          case 'fire': this.noise(0.45, 0.28, 'lowpass', 420, 1); for (let i = 0; i < 5; i++) this.noise(0.03, 0.4, 'highpass', 3000, 1, 0.06 + i * 0.07 + Math.random() * 0.04); break;
          case 'drink': for (let i = 0; i < 3; i++) this.tone(260 + i * 20, 0.09, 'sine', 0.12, 180, i * 0.12); break;
          case 'levelup': [523, 659, 784].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.14, 0, i * 0.12)); break;
          case 'achieve': this.tone(880, 0.5, 'sine', 0.1); this.tone(1320, 0.5, 'sine', 0.06, 0, 0.08); break;
          case 'death': this.tone(220, 1.2, 'sawtooth', 0.12, 55); break;
          case 'step': {
            const now = performance.now();
            if (now - this.lastStep < 140) return;
            this.lastStep = now;
            if (arg === 'water') this.noise(0.1, 0.18, 'lowpass', 1200, 1);
            else if (arg === 'sand') this.noise(0.06, 0.12, 'highpass', 1800, 0.7);
            else this.noise(0.05, 0.14, 'lowpass', 600, 1);
            break;
          }
          default: break;
        }
      } catch (e) { /* som nunca quebra o jogo */ }
    },

    /** Chuva contínua e suave enquanto o clima estiver úmido. */
    setRain(on) {
      try {
        if (!this.ctx || !this.master) return;
        if (on && !this.rain) {
          const s = this.ctx.createBufferSource(); s.buffer = this.noiseBuf; s.loop = true;
          const f = this.ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 0.5;
          const g = this.ctx.createGain(); g.gain.value = 0.05;
          s.connect(f); f.connect(g); g.connect(this.master); s.start();
          this.rain = { s, g };
        } else if (!on && this.rain) {
          try { this.rain.s.stop(); } catch (e) { /* ignore */ }
          this.rain = null;
        }
      } catch (e) { /* ignore */ }
    },
  };

  Ilha.Audio = Audio;
})();
