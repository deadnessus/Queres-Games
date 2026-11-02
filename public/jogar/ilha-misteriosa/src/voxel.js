/* =====================================================================
 * voxel.js — VoxelEngine: "pré-renderização 3D" procedural.
 * Modelos de voxels (caixas, elipsoides, cilindros) são rasterizados em
 * sprites isométricos 2:1 com sombreamento por face, contorno e sombra
 * projetada. Tudo é gerado por código e cacheado em <canvas>.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});

  // Projeção: 1 voxel em X => (+2,+1) px ; em Y => (-2,+1) px ; em Z => -VZ px
  const UX = 2, UY = 1, VZ = 1.8;
  const OFF = 24; // deslocamento de coordenadas para chave numérica
  const SPAN = 48;

  // Luz (de cima-esquerda). A sombra cai para a direita.
  const LIGHT = (() => { const l = [-0.5, 0.3, 0.8]; const n = Math.hypot(...l); return l.map((v) => v / n); })();
  const VIEW = (() => { const v = [1, 1, 1.11]; const n = Math.hypot(...v); return v.map((c) => c / n); })();
  const SHADOW_DIR = [-LIGHT[0] / LIGHT[2], -LIGHT[1] / LIGHT[2]]; // deslocamento no chão por unidade de altura

  // 6 faces: normal + 4 cantos (offsets de ±0.5 no espaço do modelo)
  const FACES = (() => {
    const h = 0.5;
    const mk = (n, c) => ({ n, c });
    return [
      mk([0, 0, 1], [[-h, -h, h], [h, -h, h], [h, h, h], [-h, h, h]]),
      mk([1, 0, 0], [[h, -h, -h], [h, h, -h], [h, h, h], [h, -h, h]]),
      mk([-1, 0, 0], [[-h, h, -h], [-h, -h, -h], [-h, -h, h], [-h, h, h]]),
      mk([0, 1, 0], [[h, h, -h], [-h, h, -h], [-h, h, h], [h, h, h]]),
      mk([0, -1, 0], [[-h, -h, -h], [h, -h, -h], [h, -h, h], [-h, -h, h]]),
    ];
  })();

  // ---------------- ruído / utilidades ----------------
  function hash3(x, y, z, s) {
    let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 1274126177) + Math.imul(s | 0, 2147483647)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const clamp255 = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
  const mul = (c, f) => [clamp255(c[0] * f), clamp255(c[1] * f), clamp255(c[2] * f), c[3] || 0];
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 0];
  const jit = (c, amt, x, y, z, s) => mul(c, 1 + (hash3(x, y, z, s || 7) - 0.5) * 2 * amt);

  // ---------------- Modelo de voxels ----------------
  class Model {
    constructor() { this.map = new Map(); }
    key(x, y, z) { return (z * SPAN + (y + OFF)) * SPAN + (x + OFF); }
    set(x, y, z, c) {
      x = Math.round(x); y = Math.round(y); z = Math.round(z);
      if (z < 0 || x < -OFF || x >= SPAN - OFF || y < -OFF || y >= SPAN - OFF || z >= 80) return;
      this.map.set(this.key(x, y, z), c);
    }
    has(x, y, z) { return this.map.has(this.key(x, y, z)); }
    del(x, y, z) { this.map.delete(this.key(x, y, z)); }
    /** col: [r,g,b] ou função (x,y,z)->[r,g,b] */
    box(x0, x1, y0, y1, z0, z1, col) {
      for (let z = z0; z < z1; z++) for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        this.set(x, y, z, typeof col === 'function' ? col(x, y, z) : col);
      }
    }
    ellipsoid(cx, cy, cz, rx, ry, rz, col) {
      for (let z = Math.floor(cz - rz); z <= Math.ceil(cz + rz); z++) {
        for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
          for (let x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
            const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 + ((z - cz) / rz) ** 2;
            if (d <= 1) this.set(x, y, z, typeof col === 'function' ? col(x, y, z) : col);
          }
        }
      }
    }
    cyl(cx, cy, z0, z1, r, col) {
      for (let z = Math.floor(z0); z < Math.ceil(z1); z++) {
        for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
          for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
            if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r) this.set(x, y, z, typeof col === 'function' ? col(x, y, z) : col);
          }
        }
      }
    }
    /** Cone/tronco: raio vai de r0 (z0) a r1 (z1). */
    cone(cx, cy, z0, z1, r0, r1, col) {
      for (let z = z0; z < z1; z++) {
        const r = r0 + (r1 - r0) * ((z - z0) / Math.max(1, z1 - z0 - 1));
        this.cyl(cx, cy, z, z + 1, Math.max(0.5, r), col);
      }
    }
    /** Linha 3D de voxels (galhos, cabos, chamas finas). */
    line(x0, y0, z0, x1, y1, z1, col, thick) {
      const n = Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0))) * 2 || 1;
      for (let i = 0; i <= n; i++) {
        const t = i / n;
        const x = x0 + (x1 - x0) * t, y = y0 + (y1 - y0) * t, z = z0 + (z1 - z0) * t;
        if (thick) this.ellipsoid(x, y, z, thick, thick, thick, col);
        else this.set(x, y, z, typeof col === 'function' ? col(x, y, z) : col);
      }
    }
  }

  // ---------------- Rasterização ----------------
  function newCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  /**
   * Renderiza um modelo para um sprite. yaw em radianos (rotação em torno do eixo vertical).
   * Retorna { c: canvas, ax, ay } onde (ax,ay) é a posição do centro do tile no canvas.
   */
  function render(model, yaw, opts) {
    opts = opts || {};
    const cs = Math.cos(yaw || 0), sn = Math.sin(yaw || 0);
    const vox = [];
    model.map.forEach((col, k) => {
      const x = (k % SPAN) - OFF;
      const y = (Math.floor(k / SPAN) % SPAN) - OFF;
      const z = Math.floor(k / (SPAN * SPAN));
      const X = cs * x - sn * y, Y = sn * x + cs * y;
      vox.push({ x, y, z, X, Y, col, d: X + Y + z });
    });
    if (!vox.length) return { c: newCanvas(1, 1), ax: 0, ay: 0 };

    // Limites projetados (incluindo sombra)
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    const proj = (X, Y, Z) => [(X - Y) * UX, (X + Y) * UY - Z * VZ];
    const shadow = opts.shadow !== false;
    for (const v of vox) {
      const p = proj(v.X, v.Y, v.z);
      minX = Math.min(minX, p[0] - 3); maxX = Math.max(maxX, p[0] + 3);
      minY = Math.min(minY, p[1] - 3); maxY = Math.max(maxY, p[1] + 3);
      if (shadow) {
        const s = proj(v.X + SHADOW_DIR[0] * v.z, v.Y + SHADOW_DIR[1] * v.z, 0);
        minX = Math.min(minX, s[0] - 3); maxX = Math.max(maxX, s[0] + 3);
        minY = Math.min(minY, s[1] - 2); maxY = Math.max(maxY, s[1] + 2);
      }
    }
    const M = 4;
    const W = Math.ceil(maxX - minX) + M * 2, H = Math.ceil(maxY - minY) + M * 2;
    const ax = Math.round(-minX + M), ay = Math.round(-minY + M);

    // 1) modelo
    vox.sort((a, b) => a.d - b.d);
    const mc = newCanvas(W, H);
    const g = mc.getContext('2d');
    const nrm = FACES.map((f) => {
      const n = f.n; return [cs * n[0] - sn * n[1], sn * n[0] + cs * n[1], n[2]];
    });
    const vis = nrm.map((n) => n[0] * VIEW[0] + n[1] * VIEW[1] + n[2] * VIEW[2] > 0.001);
    const shade = nrm.map((n) => 0.6 + 0.52 * Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]));
    for (const v of vox) {
      const c = v.col;
      const ao = 0.84 + 0.16 * Math.min(1, v.z / 5);
      for (let fi = 0; fi < FACES.length; fi++) {
        if (!vis[fi]) continue;
        const f = FACES[fi];
        if (model.has(v.x + f.n[0], v.y + f.n[1], v.z + f.n[2])) continue;
        const sh = c[3] ? 1.05 : shade[fi] * ao;
        g.fillStyle = `rgb(${clamp255(c[0] * sh) | 0},${clamp255(c[1] * sh) | 0},${clamp255(c[2] * sh) | 0})`;
        g.beginPath();
        for (let i = 0; i < 4; i++) {
          const o = f.c[i];
          const ox = cs * o[0] - sn * o[1], oy = sn * o[0] + cs * o[1];
          const p = proj(v.X + ox, v.Y + oy, v.z + o[2]);
          if (i === 0) g.moveTo(p[0] + ax, p[1] + ay); else g.lineTo(p[0] + ax, p[1] + ay);
        }
        g.closePath();
        g.fill();
      }
    }
    // Pós: alfa duro + contorno
    const img = g.getImageData(0, 0, W, H);
    const d = img.data;
    const solid = new Uint8Array(W * H);
    for (let i = 0; i < W * H; i++) {
      if (d[i * 4 + 3] >= 110) { d[i * 4 + 3] = 255; solid[i] = 1; } else { d[i * 4 + 3] = 0; }
    }
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const i = y * W + x;
        if (solid[i]) continue;
        if ((x > 0 && solid[i - 1]) || (x < W - 1 && solid[i + 1]) || (y > 0 && solid[i - W]) || (y < H - 1 && solid[i + W])) {
          d[i * 4] = 24; d[i * 4 + 1] = 17; d[i * 4 + 2] = 12; d[i * 4 + 3] = 235;
        }
      }
    }
    g.putImageData(img, 0, 0);

    // 2) sombra projetada (assada) + modelo
    const out = newCanvas(W, H);
    const og = out.getContext('2d');
    if (shadow) {
      const sc = newCanvas(W, H); const sg = sc.getContext('2d');
      sg.fillStyle = '#000';
      for (const v of vox) {
        const p = proj(v.X + SHADOW_DIR[0] * v.z, v.Y + SHADOW_DIR[1] * v.z, 0);
        sg.beginPath();
        sg.moveTo(p[0] + ax, p[1] + ay - 1.2); sg.lineTo(p[0] + ax + 2.4, p[1] + ay);
        sg.lineTo(p[0] + ax, p[1] + ay + 1.2); sg.lineTo(p[0] + ax - 2.4, p[1] + ay);
        sg.closePath(); sg.fill();
      }
      const sd = sg.getImageData(0, 0, W, H);
      for (let i = 0; i < W * H; i++) sd.data[i * 4 + 3] = sd.data[i * 4 + 3] >= 110 ? 255 : 0;
      sg.putImageData(sd, 0, 0);
      og.globalAlpha = opts.shadowAlpha || 0.34;
      og.drawImage(sc, 0, 0);
      og.globalAlpha = 1;
    }
    og.drawImage(mc, 0, 0);
    return { c: out, ax, ay, w: W, h: H };
  }

  /** Máscara de alfa (para picking por pixel). */
  function mask(sprite) {
    if (sprite.mask) return sprite.mask;
    const g = sprite.c.getContext('2d');
    const d = g.getImageData(0, 0, sprite.c.width, sprite.c.height).data;
    const m = new Uint8Array(sprite.c.width * sprite.c.height);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 200 ? 1 : 0;
    sprite.mask = m;
    return m;
  }

  Ilha.VoxelEngine = { Model, render, mask, hash3, mulberry32, mul, mix, jit, UX, UY, VZ };
})();
