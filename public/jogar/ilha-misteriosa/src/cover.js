/* =====================================================================
 * cover.js — Tela de abertura: título + diorama isométrico da ilha
 * (desenhado com os mesmos sprites do jogo). Fecha com o botão, Enter,
 * Espaço ou Esc (Esc/clique fora do botão pulam também a introdução).
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const TW = Config.ISO_TW, TH = Config.ISO_TH;

  const N = 7; // diorama N x N
  const terrainAt = (x, y) => {
    const d = Math.hypot(x - 3, y - 3.1);
    return d < 1.7 ? 'GRASS' : d < 2.5 ? 'SAND' : d < 3.5 ? 'SHALLOW_WATER' : 'DEEP_OCEAN';
  };
  const OBJECTS = [
    { x: 2, y: 2, n: 'TREE_HARDWOOD' }, { x: 4, y: 2, n: 'TREE_HARDWOOD' }, { x: 3, y: 1, n: 'TREE_HARDWOOD' },
    { x: 2, y: 3, n: 'BUSH_TWIGS' }, { x: 4, y: 4, n: 'CAMPFIRE_LIT' }, { x: 1, y: 4, n: 'BALLOON_WRECKAGE' },
  ];

  const Cover = {
    el: null, raf: 0, visible: false, loaded: false,

    show(loaded) {
      this.el = document.getElementById('cover');
      if (!this.el || !Ilha.SpriteEngine) { if (!loaded && Ilha.UI) Ilha.UI.showIntro(); return; }
      this.loaded = !!loaded; this.visible = true;
      const d = Ilha.State.data;
      const play = document.getElementById('cvPlay'); const nw = document.getElementById('cvNew');
      play.textContent = loaded ? `▶ Continuar — Dia ${d.time.day} · Nível ${d.player.level}` : '▶ Jogar';
      nw.classList.toggle('hidden', !loaded);
      play.onclick = () => this.hide(false);
      nw.onclick = () => { this.hide(true); Ilha.UI.action('newgame'); };
      this.el.classList.remove('hidden');
      this._key = (e) => {
        if (!this.visible) return;
        if (e.key === 'Escape') { this.hide(true); e.stopPropagation(); e.preventDefault(); }
        else if (e.key === 'Enter' || e.key === ' ') { this.hide(false); e.stopPropagation(); e.preventDefault(); }
      };
      window.addEventListener('keydown', this._key, true);
      try { play.focus({ preventScroll: true }); } catch (e) { /* ok */ }
      const loop = (t) => { if (!this.visible) return; this.draw(t); this.raf = requestAnimationFrame(loop); };
      this.raf = requestAnimationFrame(loop);
    },

    /** skipIntro: Esc e "Nova aventura" não abrem a introdução. */
    hide(skipIntro) {
      if (!this.visible) return;
      this.visible = false; cancelAnimationFrame(this.raf);
      window.removeEventListener('keydown', this._key, true);
      if (this.el) this.el.classList.add('hidden');
      if (!this.loaded && !skipIntro && Ilha.UI) Ilha.UI.showIntro();
    },

    draw(now) { const c = document.getElementById('coverCanvas'); if (c) this.drawScene(c, now); },

    /** Diorama da ilha. opts: { n: tamanho do mar (7 ou 9), ship: instante em que o navio surge, fireworks: bool } */
    drawScene(c, now, opts) {
      opts = opts || {};
      const g = c.getContext('2d'); const SE = Ilha.SpriteEngine; const S = 2;
      const n = opts.n || N; const off = (n - N) / 2; // ilha sempre no centro
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, c.width, c.height);
      const ox = c.width / 2, oy = opts.oy != null ? opts.oy : 70;
      const proj = (x, y) => ({ x: ox + (x - y) * (TW / 2) * S, y: oy + (x + y) * (TH / 2) * S });
      const hw = (TW / 2) * S, hh = (TH / 2) * S;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
        const t = terrainAt(x - off, y - off);
        const p = proj(x, y);
        g.drawImage(SE.terrain(t, x, y, now), p.x - hw, p.y - hh, TW * S, TH * S);
      }
      const list = OBJECTS.map((o) => ({ depth: o.x + o.y, x: o.x + off, y: o.y + off, n: o.n }))
        .concat([{ depth: 3 + 5 + 0.2, player: true, x: 3 + off, y: 5 + off }]);
      list.sort((a, b) => a.depth - b.depth);
      list.forEach((o) => {
        const p = proj(o.x, o.y);
        const spr = o.player ? SE.player('SE', 0) : SE.object(o.n, o.x - off, o.y - off, now);
        if (spr) g.drawImage(spr.c, p.x - spr.ax * S, p.y - spr.ay * S, spr.w * S, spr.h * S);
      });
      // fumaça da fogueira
      const f = proj(4 + off, 4 + off);
      for (let i = 0; i < 5; i++) {
        const ph = ((now / 2600) + i * 0.2) % 1;
        g.fillStyle = `rgba(222,216,206,${0.5 * Math.sin(ph * Math.PI)})`;
        g.beginPath(); g.arc(f.x + Math.sin(ph * 5) * 6 * S + ph * 8 * S, f.y - (18 + ph * 44) * S, (2.5 + ph * 6) * S, 0, Math.PI * 2); g.fill();
      }
      if (opts.ship != null) this._ship(g, proj, now, opts.ship, n);
      if (opts.fireworks) this._fireworks(g, c, now);
    },

    /** Vapor de 1865 chegando pelo mar da frente (desenhado com retângulos, sem arte externa). */
    _ship(g, proj, now, t0, n) {
      const k = Math.min(1, Math.max(0, (now - t0) / 6000)); const e = 1 - Math.pow(1 - k, 3);
      const from = { x: n + 0.6, y: n - 2.6 }, to = { x: n - 2.2, y: n - 1.2 };
      const p = proj(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
      const bob = Math.sin(now / 420) * 2; const u = 2;
      const R = (col, x, y, w, h) => { g.fillStyle = col; g.fillRect(Math.round(p.x + x * u), Math.round(p.y + bob + y * u), w * u, h * u); };
      // esteira
      g.fillStyle = 'rgba(255,255,255,.55)'; for (let i = 0; i < 4; i++) g.fillRect(Math.round(p.x + (30 + i * 9) * u), Math.round(p.y + (3 + (i % 2)) * u), 6 * u, u);
      // casco
      R('#1b130d', -30, -6, 60, 12); R('#5a3a22', -29, -5, 58, 10); R('#8b5a2b', -29, -5, 58, 3); R('#1b130d', -26, 6, 52, 2); R('#3a2414', -24, 5, 48, 2);
      // cabine e chaminé
      R('#1b130d', -10, -16, 22, 11); R('#e6d6ac', -9, -15, 20, 9); R('#4a6a8a', -6, -13, 4, 4); R('#4a6a8a', 1, -13, 4, 4);
      R('#1b130d', 4, -30, 8, 15); R('#2a2a2a', 5, -29, 6, 14); R('#b0352a', 5, -26, 6, 3);
      // mastro, vela e bandeira
      R('#1b130d', -21, -34, 2, 29); R('#f1e6cc', -19, -30, 9, 16); R('#d9ccaa', -19, -18, 9, 4); R('#b0352a', -19, -34, 7, 3);
      // fumaça da chaminé
      for (let i = 0; i < 4; i++) {
        const ph = ((now / 1800) + i * 0.25) % 1;
        g.fillStyle = `rgba(236,232,224,${0.7 * Math.sin(ph * Math.PI)})`;
        g.beginPath(); g.arc(p.x + (8 + ph * 26) * u, p.y + bob - (32 + ph * 26) * u, (3 + ph * 6) * u, 0, Math.PI * 2); g.fill();
      }
    },

    _fireworks(g, c, now) {
      const COL = ['#ffd24a', '#ff8a5c', '#8ee06a', '#7cc4f0', '#f7a8e0'];
      for (let b = 0; b < 4; b++) {
        const period = 1900 + b * 330; const ph = ((now + b * 700) % period) / period;
        const cycle = Math.floor((now + b * 700) / period);
        const cx = c.width * (0.14 + 0.72 * (((cycle * 37 + b * 53) % 100) / 100));
        const cy = 40 + ((cycle * 61 + b * 29) % 70);
        if (ph < 0.12) continue; const a = (ph - 0.12) / 0.88;
        g.fillStyle = COL[(cycle + b) % COL.length]; g.globalAlpha = Math.max(0, 1 - a * a * a);
        for (let ring = 0; ring < 2; ring++) { // dois anéis de faíscas: o de fora e um miolo
          const n = ring ? 10 : 18; const k = ring ? 0.5 : 1;
          for (let i = 0; i < n; i++) {
            const ang = i * (Math.PI * 2 / n) + ring * 0.3; const rr = (8 + a * 70) * k;
            g.fillRect(Math.round(cx + Math.cos(ang) * rr), Math.round(cy + Math.sin(ang) * rr + a * a * 26), 8, 8);
          }
        }
        g.globalAlpha = 1;
      }
    },
  };

  Ilha.Cover = Cover;
})();
