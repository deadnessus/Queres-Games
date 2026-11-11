/* =====================================================================
 * fx.js — Efeitos visuais baratos e procedurais:
 *  · ação visível (balanço + anel de progresso sobre Cyrus)      [G1]
 *  · contorno do objeto sob o cursor e brilho no alvo da meta    [G3]
 *  · passagem de tempo (escurece, relógio gira, cartão)          [G5]
 *  · vida do mundo: fumaça, copas balançando, pássaros           [G6]
 *  · poeira e brilho ao construir                                [G7]
 * Nada daqui vai para o save; tudo é função do relógio da tela.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const nowMs = () => performance.now();
  const reduced = () => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const TREE_RE = /^(TREE_|CITRUS_TREE|PALM|COCONUT|JUNGLE_TREE)/;
  const outlineCache = new WeakMap();

  const Fx = {
    cur: null,
    bursts: [],
    hits: [],
    tp: null,

    // ------------------------------------------------------------
    // G1 — ação visível
    // ------------------------------------------------------------
    /** Inicia o balanço + anel (a lógica do jogo já foi aplicada; isto é só a "encenação"). */
    act(minutes) {
      if (!(minutes >= 4) || reduced()) return;
      this.cur = { t0: nowMs(), dur: clamp(320 + minutes * 7, 450, 1400) };
    },
    active() {
      const c = this.cur; if (!c) return null;
      const t = nowMs() - c.t0;
      if (t > c.dur) { this.cur = null; return null; }
      return { p: t / c.dur, t };
    },
    /** Quanto falta (ms) para a ação visível terminar: textos flutuantes esperam o anel fechar. */
    floatDelay() { const a = this.active(); return a ? this.cur.dur - a.t : 0; },

    /** Deslocamento do sprite de Cyrus durante a ação (inclinação para a frente + batida). */
    pose(facing, S) {
      const a = this.active(); if (!a) return { dx: 0, dy: 0 };
      const swing = Math.max(0, Math.sin((a.t / 1000) * 6 * Math.PI * 2));
      const dv = Ilha.Config.DIR8[facing] || [1, 1];
      const sx = (dv[0] - dv[1]) * 32, sy = (dv[0] + dv[1]) * 16; const len = Math.hypot(sx, sy) || 1;
      return { dx: (sx / len) * swing * 3 * S, dy: (sy / len) * swing * 2 * S + swing * 1.5 * S };
    },

    /** Cyrus "respira" parado: a parte de cima do corpo desce 1 px a cada ~1,4 s; pés e sombra ficam fixos. */
    breathOffset(now, S) { return reduced() ? 0 : (Math.sin(now / 445) > 0 ? S : 0); },
    drawBreath(ctx, spr, x, y, w, h, S, now) {
      const dy = this.breathOffset(now, S);
      if (!dy) { ctx.drawImage(spr.c, x, y, w, h); return; }
      const split = 0.6; const sh = spr.c.height;
      ctx.drawImage(spr.c, 0, sh * split, spr.c.width, sh * (1 - split), x, y + h * split, w, h * (1 - split)); // pernas e sombra
      ctx.drawImage(spr.c, 0, 0, spr.c.width, sh * split, x, y + dy, w, h * split);                              // tronco e cabeça
    },

    drawRing(ctx, cx, cy, S) {
      const a = this.active(); if (!a) return;
      const r = 11 * S; const y = cy - 6 * S;
      ctx.save();
      ctx.lineWidth = 3.5 * S;
      ctx.fillStyle = 'rgba(14,9,4,.72)'; ctx.beginPath(); ctx.arc(cx, y, r + 2 * S, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#4a3512'; ctx.beginPath(); ctx.arc(cx, y, r, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = '#f0c060'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, y, r, -Math.PI / 2, -Math.PI / 2 + a.p * Math.PI * 2); ctx.stroke();
      ctx.restore();
    },

    // ------------------------------------------------------------
    // O objeto reage ao trabalho: treme e solta lascas/folhas/respingos enquanto o anel fecha.
    // `prev` = nome do objeto antes da ação: ele continua na tela até o anel fechar (a árvore só
    // vira toco no fim do golpe), porque a lógica do jogo já foi aplicada.
    // ------------------------------------------------------------
    hit(x, y, kind, prev) {
      if (reduced()) return;
      const dur = this.cur ? this.cur.dur : 500;
      this.hits = this.hits.filter((h) => !(h.x === x && h.y === y));
      this.hits.push({ x, y, kind: kind || 'leaf', prev: prev || null, t0: nowMs(), dur });
      if (this.hits.length > 8) this.hits.shift();
    },
    hitFacing(kind) { const t = Ilha.Player.facingTile(); this.hit(t.x, t.y, kind); },
    _liveHits() {
      if (!this.hits.length) return this.hits;
      const t = nowMs();
      this.hits = this.hits.filter((h) => t - h.t0 < h.dur + 500);
      return this.hits;
    },
    /** Objetos "fantasma" a manter na tela até o golpe terminar: [{x, y, name}]. */
    ghosts() { const t = nowMs(); return this._liveHits().filter((h) => h.prev && t - h.t0 < h.dur); },
    /** Tremor horizontal (px) do objeto em (x,y), em impulsos que decaem a cada golpe. */
    shake(x, y, S) {
      const hs = this.hits; if (!hs.length) return 0;
      const t = nowMs();
      for (let i = 0; i < hs.length; i++) {
        const h = hs[i]; if (h.x !== x || h.y !== y) continue;
        const e = t - h.t0; if (e > h.dur) return 0;
        return Math.sin(e / 24) * 2 * S * (1 - (e % 240) / 240);
      }
      return 0;
    },
    drawHits(ctx, proj, S) {
      const hs = this._liveHits(); if (!hs.length) return;
      const t = nowMs();
      const COL = { leaf: ['#4f9a3a', '#7cc257', '#2f6a22'], wood: ['#c79a5a', '#8b5a2b', '#e2c088'], stone: ['#b9b9b9', '#8a8a8a', '#e0e0e0'],
        dirt: ['#8b5a2b', '#6b4423', '#b07a45'], sand: ['#e2cf9a', '#cdb77d', '#f3e6bd'], water: ['#bfe6ff', '#7cc4f0', '#ffffff'] };
      ctx.save();
      hs.forEach((h) => {
        const c = proj(h.x, h.y); const cols = COL[h.kind] || COL.leaf; const e = t - h.t0;
        const lift = h.kind === 'dirt' || h.kind === 'sand' || h.kind === 'water' ? 2 : 16; // altura de onde saem (chão x copa)
        const nb = Math.max(1, Math.floor(h.dur / 240));
        for (let j = 0; j < nb; j++) {
          const le = e - j * 240; if (le < 0 || le > 520) continue;
          const a = le / 520;
          for (let i = 0; i < 8; i++) {
            const seed = (i * 37 + j * 91 + h.x * 13 + h.y * 7) % 100;
            const ang = -Math.PI / 2 + ((seed / 100) - 0.5) * 2.2;
            const sp = (26 + (seed % 17)) * S;
            const px = c.x + Math.cos(ang) * sp * a;
            const py = c.y - lift * S + Math.sin(ang) * sp * a + 46 * S * a * a;
            const sz = (h.kind === 'water' ? 3 : 4) * S;
            ctx.globalAlpha = 1 - a * a;
            ctx.fillStyle = cols[i % cols.length];
            ctx.fillRect(Math.round(px), Math.round(py), sz, sz);
          }
        }
      });
      ctx.restore();
    },

    // ------------------------------------------------------------
    // G3 — contorno e brilho
    // ------------------------------------------------------------
    /** Silhueta sólida (cacheada por canvas de origem e cor). */
    silhouette(src, color) {
      let m = outlineCache.get(src); if (!m) { m = {}; outlineCache.set(src, m); }
      if (m[color]) return m[color];
      const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
      const g = c.getContext('2d'); g.drawImage(src, 0, 0);
      g.globalCompositeOperation = 'source-in'; g.fillStyle = color; g.fillRect(0, 0, c.width, c.height);
      m[color] = c; return c;
    },
    /** Desenha o contorno de 1 px (em unidades de tela) ao redor do sprite já posicionado. */
    outline(ctx, spr, x, y, w, h, S, color, alpha) {
      const sil = this.silhouette(spr.c, color); const dark = this.silhouette(spr.c, '#1a1006');
      const o = Math.max(1, Math.round(S));
      const k = w / spr.c.width; // fator de escala do sprite na tela
      ctx.save(); ctx.globalAlpha = (alpha == null ? 1 : alpha) * 0.8;
      [[2 * o, 0], [-2 * o, 0], [0, 2 * o], [0, -2 * o]].forEach(([dx, dy]) => ctx.drawImage(dark, x + dx * 1.5, y + dy * 1.5, w, h));
      ctx.globalAlpha = alpha == null ? 1 : alpha;
      [[o, 0], [-o, 0], [0, o], [0, -o], [o, o], [-o, -o], [o, -o], [-o, o]].forEach(([dx, dy]) => ctx.drawImage(sil, x + dx * 1.5, y + dy * 1.5, w, h));
      ctx.restore(); return k;
    },

    // ------------------------------------------------------------
    // G5 — passagem de tempo
    // ------------------------------------------------------------
    _dom() {
      let el = document.getElementById('timeFx');
      if (el) return el;
      const world = document.getElementById('world'); if (!world) return null;
      el = document.createElement('div'); el.id = 'timeFx'; el.className = 'hidden';
      el.innerHTML = '<div class="tf-card"><div class="tf-clock"><i class="tf-h"></i><i class="tf-m"></i></div><div class="tf-txt"></div><div class="tf-sub"></div></div>';
      world.appendChild(el); return el;
    },
    /** Mostra "o tempo passou": relógio girando, escurecimento e cartão curto com o resultado.
     *  Só para 1 h ou mais (ou `force`, usado pelas rotinas a partir de 20 min). */
    timePass(minutes, label, kind, force) {
      if (!(minutes >= (force ? 20 : 60)) || reduced()) return;
      const el = this._dom(); if (!el) return;
      const t = nowMs();
      if (this.tp && t - this.tp.t < 700) { minutes += this.tp.minutes; label = label || this.tp.label; kind = kind || this.tp.kind; }
      const dur = clamp(700 + minutes * 2.2, 1000, 2200);
      this.tp = { t, minutes, label, kind, dur };
      const h = Math.floor(minutes / 60), m = Math.round(minutes % 60);
      const txt = (h ? h + ' h' : '') + (h && m ? ' ' : '') + (m ? m + ' min' : '');
      const dd = Ilha.State.data;
      const clk = dd ? `${String(dd.time.hour).padStart(2, '0')}:${String(dd.time.minute).padStart(2, '0')}` : '';
      el.classList.remove('hidden');
      el.classList.toggle('sleep', kind === 'sleep');
      el.querySelector('.tf-txt').textContent = `${kind === 'sleep' ? '😴' : '⏳'} ${txt}`;
      this.tp.clk = clk;
      el.querySelector('.tf-sub').textContent = (label ? label + ' · ' : '') + 'agora ' + clk;
      el.style.setProperty('--dur', dur + 'ms');
      el.style.setProperty('--mdeg', Math.round((minutes / 60) * 360) + 'deg');
      el.style.setProperty('--hdeg', Math.round((minutes / 720) * 360) + 'deg');
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
      el.classList.remove('run'); void el.offsetWidth; el.classList.add('run');
      clearTimeout(this._tpT); this._tpT = setTimeout(() => { el.classList.add('hidden'); el.classList.remove('run'); }, dur + 40);
    },

    /** Troca o texto do cartão que está na tela (ex.: resultado da obra). */
    note(label) {
      const el = document.getElementById('timeFx'); const tp = this.tp;
      if (!el || !tp || nowMs() - tp.t > tp.dur) return;
      tp.label = label;
      el.querySelector('.tf-sub').textContent = label + ' · agora ' + (tp.clk || '');
    },

    // ------------------------------------------------------------
    // G7 — poeira e brilho ao construir
    // ------------------------------------------------------------
    burst(x, y, kind) {
      if (reduced()) return;
      this.bursts.push({ x, y, kind: kind || 'dust', t0: nowMs() });
      if (this.bursts.length > 12) this.bursts.shift();
    },
    drawBursts(ctx, proj, S) {
      if (!this.bursts.length) return;
      const t = nowMs();
      const life = (b) => (b.kind === 'glow' ? 1500 : 1000);
      this.bursts = this.bursts.filter((b) => t - b.t0 < life(b));
      this.bursts.forEach((b) => {
        const c = proj(b.x, b.y); const a = (t - b.t0) / life(b);
        ctx.save();
        if (b.kind === 'glow') {
          // coluna de luz + dois anéis + faíscas subindo
          const g = ctx.createLinearGradient(0, c.y - 110 * S, 0, c.y);
          g.addColorStop(0, 'rgba(255,236,160,0)'); g.addColorStop(1, `rgba(255,226,130,${0.55 * (1 - a)})`);
          ctx.fillStyle = g; ctx.fillRect(c.x - 14 * S, c.y - 110 * S, 28 * S, 110 * S);
          ctx.lineWidth = 4 * S;
          for (let k = 0; k < 2; k++) {
            const aa = Math.max(0, a - k * 0.18); if (aa <= 0) continue;
            ctx.strokeStyle = `rgba(255,226,130,${0.95 * (1 - aa)})`;
            ctx.beginPath(); ctx.ellipse(c.x, c.y, (10 + aa * 70) * S, (5 + aa * 35) * S, 0, 0, Math.PI * 2); ctx.stroke();
          }
          ctx.fillStyle = `rgba(255,244,190,${Math.min(1, 1.4 * (1 - a))})`;
          for (let i = 0; i < 12; i++) {
            const ang = i * 0.5236 + 0.3; const rr = (8 + a * 54) * S;
            const sx = c.x + Math.cos(ang) * rr, sy = c.y - a * 60 * S + Math.sin(ang) * rr * 0.5 - 6 * S;
            ctx.fillRect(sx - S, sy - 4 * S, 2 * S, 8 * S); ctx.fillRect(sx - 4 * S, sy - S, 8 * S, 2 * S);
          }
        } else {
          for (let i = 0; i < 14; i++) {
            const ang = i * 0.449 + b.x; const rr = (6 + a * 34) * S;
            ctx.fillStyle = `rgba(232,216,180,${0.8 * (1 - a)})`;
            ctx.beginPath(); ctx.arc(c.x + Math.cos(ang) * rr, c.y - a * 20 * S + Math.sin(ang) * rr * 0.5 - 4 * S, (4 + a * 6) * S, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.restore();
      });
    },

    /** Seta saltitante sobre o alvo do "Próximo passo". */
    drawArrow(ctx, x, y, S, now) {
      const by = y - (10 + 4 * Math.sin(now / 220)) * S;
      ctx.save();
      ctx.beginPath(); ctx.moveTo(x - 7 * S, by - 10 * S); ctx.lineTo(x + 7 * S, by - 10 * S); ctx.lineTo(x, by); ctx.closePath();
      ctx.fillStyle = '#ffd24a'; ctx.strokeStyle = '#1a1006'; ctx.lineWidth = 2 * S; ctx.lineJoin = 'round';
      ctx.stroke(); ctx.fill();
      ctx.restore();
    },

    // ------------------------------------------------------------
    // G6 — vida barata
    // ------------------------------------------------------------
    /** Fumaça sobre cada fogo aceso (puffs determinísticos em função do relógio). */
    drawSmoke(ctx, fires, proj, S, now, W, H, windy) {
      if (!fires.length) return;
      ctx.save();
      fires.forEach((f) => {
        const c = proj(f.x, f.y);
        if (c.x < -40 || c.x > W + 40 || c.y < -20 || c.y > H + 80) return;
        for (let i = 0; i < 6; i++) {
          const ph = ((now / 2800) + i / 6 + f.seed * 0.137) % 1;
          const x = c.x + Math.sin(ph * 5 + f.seed) * 6 * S * ph + (windy ? ph * 24 * S : ph * 7 * S);
          const y = c.y - (16 + ph * 54) * S;
          ctx.fillStyle = `rgba(228,222,212,${0.62 * Math.sin(ph * Math.PI)})`;
          ctx.beginPath(); ctx.arc(x, y, (3 + ph * 7) * S, 0, Math.PI * 2); ctx.fill();
        }
      });
      ctx.restore();
    },

    /** Dois ou três pássaros cruzando a tela de dia, com tempo bom. */
    drawBirds(ctx, W, H, now, S, hour, weather) {
      if (hour < 7 || hour >= 18 || (weather !== 'CLEAR' && weather !== 'WIND')) return;
      ctx.save(); ctx.strokeStyle = 'rgba(30,24,20,.75)'; ctx.lineWidth = 1.6 * S; ctx.lineCap = 'round';
      for (let i = 0; i < 3; i++) {
        const sp = 0.022 + i * 0.006; const span = W + 240;
        const x = ((now * sp + i * span * 0.37) % span) - 120;
        const y = H * (0.14 + i * 0.07) + Math.sin(now / 1300 + i * 2) * 8 * S;
        const fl = Math.sin(now / 95 + i * 1.7) * 4 * S;
        ctx.beginPath(); ctx.moveTo(x - 7 * S, y - fl); ctx.quadraticCurveTo(x - 3 * S, y - 3 * S, x, y); ctx.quadraticCurveTo(x + 3 * S, y - 3 * S, x + 7 * S, y - fl); ctx.stroke();
      }
      ctx.restore();
    },

    /** Copa de árvore balançando: devolve true se o objeto deve balançar. */
    swaying(name) { return TREE_RE.test(name); },
    drawSway(ctx, spr, x, y, w, h, S, now, ox, oy, windy) {
      const split = 0.58; const sh = spr.c.height;
      const amp = (windy ? 2.6 : 1.3) * S;
      const dx = Math.sin(now / 1100 + ox * 0.9 + oy * 0.5) * amp;
      ctx.drawImage(spr.c, 0, sh * split, spr.c.width, sh * (1 - split), x, y + h * split, w, h * (1 - split));
      ctx.drawImage(spr.c, 0, 0, spr.c.width, sh * split, x + dx, y, w, h * split);
    },
  };

  Ilha.Fx = Fx;
})();
