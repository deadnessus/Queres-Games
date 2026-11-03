/* =====================================================================
 * models2.js — Modelos de voxels da Sprint 2: paredes, portas, janelas,
 * telhados, móveis, estações, máquinas, rede elétrica e culturas.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const V = Ilha.VoxelEngine;
  const { Model, hash3, mulberry32, mul, mix, jit } = V;

  const C = {
    woodA: [164, 120, 70], woodB: [140, 98, 56], woodD: [96, 66, 38], woodL: [186, 142, 84],
    stone: [128, 126, 120], stoneD: [92, 90, 88], stoneL: [162, 160, 150],
    brick: [166, 82, 56], brickD: [128, 62, 44], mortar: [190, 176, 150],
    glass: [150, 204, 222], glassD: [112, 170, 192],
    iron: [110, 112, 118], ironL: [158, 160, 166], ironD: [70, 72, 78],
    copper: [184, 104, 56], copperL: [220, 140, 80], brass: [208, 164, 54],
    coal: [34, 28, 26], straw: [196, 170, 100], thatch: [186, 156, 78], thatchD: [140, 116, 56],
    tile: [176, 86, 54], tileD: [132, 62, 40],
    leaf: [72, 112, 52], leafL: [118, 154, 70], leafD: [48, 82, 40],
    white: [232, 232, 222], red: [190, 56, 42], blue: [74, 96, 150],
    fire1: [236, 70, 24, 1], fire2: [250, 150, 32, 1], fire3: [255, 228, 100, 1], glow: [255, 236, 170, 1],
    soil: [96, 66, 44],
  };

  // ---------------- Paredes (bloco cheio de 28 voxels) ----------------
  function wallBlock(kind, seed, withWindow) {
    const m = new Model();
    const H = 28;
    const col = (x, y, z) => {
      const u = x + y;
      if (withWindow && z >= 9 && z <= 22 && ((x >= 5 && y >= -5 && y <= 4) || (y >= 5 && x >= -5 && x <= 4))) {
        return jit(((z === 9 || z === 22 || (z % 7 === 2)) ? C.glassD : C.glass), 0.04, x, y, z, seed);
      }
      if (z >= H - 2) return jit(kind === 'wood' ? C.woodL : kind === 'brick' ? C.brickD : C.stoneL, 0.05, x, y, z, seed);
      if (kind === 'wood') {
        const stripe = ((u + 16) >> 2) & 1;
        if (z % 14 === 0 || z < 2) return jit(C.woodD, 0.08, x, y, z, seed);
        return jit(stripe ? C.woodA : C.woodB, 0.05, x, y, z, seed);
      }
      if (kind === 'brick') {
        const course = z >> 1, off = (course & 1) * 2;
        if ((z & 1) === 1 || ((u + off + 32) & 3) === 3) return jit(C.mortar, 0.04, x, y, z, seed);
        return jit(hash3(course, (u + off + 32) >> 2, 3, seed) > 0.5 ? C.brick : C.brickD, 0.06, x, y, z, seed);
      }
      const course = z >> 2, off = (course & 1) * 2;
      if ((z & 3) === 3 || ((u + off + 32) & 3) === 3) return jit(C.stoneD, 0.04, x, y, z, seed);
      return jit(mix(C.stone, C.stoneL, hash3(course, (u + off + 32) >> 2, 5, seed)), 0.06, x, y, z, seed);
    };
    m.box(-8, 8, -8, 8, 0, H, col);
    return m;
  }

  // ---------------- Porta (eixo X ou Y; aberta/fechada) ----------------
  function door(axis, open) {
    const m = new Model();
    const put = (a0, a1, b0, b1, z0, z1, col) => {
      if (axis === 'X') m.box(a0, a1, b0, b1, z0, z1, col);
      else m.box(b0, b1, a0, a1, z0, z1, col);
    };
    const post = (x, y, z) => jit(C.woodD, 0.08, x, y, z, 3);
    put(-8, -6, -2, 2, 0, 28, post); put(6, 8, -2, 2, 0, 28, post); put(-8, 8, -2, 2, 24, 28, post);
    const panel = (x, y, z) => jit((((axis === 'X' ? x : y) + 16) >> 1) & 1 ? C.woodA : C.woodB, 0.05, x, y, z, 4);
    if (!open) {
      put(-6, 6, -1, 1, 0, 24, panel);
      put(3, 5, -2, 0, 11, 13, C.brass);
    } else {
      put(-6, -4, -9, -1, 0, 24, panel); // folha girada para fora
      put(-6, -4, -9, -8, 11, 13, C.brass);
    }
    return m;
  }

  // ---------------- Telhados (lajes a 28 voxels de altura) ----------------
  function roof(kind) {
    const m = new Model();
    m.box(-8, 8, -8, 8, 28, 31, (x, y, z) => {
      const u = x + y;
      if (kind === 'thatch') {
        const strand = ((u + 32) % 3 === 0);
        return jit(strand ? C.thatchD : C.thatch, 0.1, x, y, z, 6);
      }
      return jit((((u + 32) & 3) === 0 || z === 28) ? C.tileD : C.tile, 0.06, x, y, z, 7);
    });
    m.box(-8, 8, -8, 8, 31, 32, (x, y, z) => jit(kind === 'thatch' ? C.thatch : C.tile, 0.08, x, y, z, 8));
    return m;
  }

  // ---------------- Móveis ----------------
  function bed(comfort) {
    const m = new Model();
    m.box(-7, 7, -5, 5, 0, 3, (x, y, z) => ((Math.abs(x) > 5 && Math.abs(y) > 3) ? C.woodD : C.woodB));
    m.box(-7, 7, -5, 5, 3, 5, (x, y, z) => jit(C.woodA, 0.05, x, y, z, 11));
    m.box(-6, 6, -4, 4, 5, 8, (x, y, z) => jit(comfort ? (((x + 8) >> 2) & 1 ? C.blue : mul(C.blue, 0.88)) : C.straw, 0.07, x, y, z, 12));
    m.box(-6, -2, -3, 3, 8, 10, (x, y, z) => jit(C.white, 0.04, x, y, z, 13)); // travesseiro
    m.box(-8, -7, -5, 5, 0, 12, (x, y, z) => jit(C.woodD, 0.06, x, y, z, 14)); // cabeceira
    return m;
  }
  function chest() {
    const m = new Model();
    m.box(-6, 6, -4, 4, 0, 8, (x, y, z) => jit(((z >> 1) & 1) ? C.woodA : C.woodB, 0.06, x, y, z, 21));
    m.ellipsoid(0, 0, 8, 6, 4, 3, (x, y, z) => jit(C.woodL, 0.06, x, y, z, 22));
    m.box(-1, 2, -5, -3, 3, 10, C.brass);
    m.box(-6, 6, -1, 1, 0, 11, (x, y, z) => (z >= 7 ? C.iron : C.woodD));
    m.box(-6, 6, 3, 4, 0, 8, (x, y, z) => ((x + 6) % 6 === 0 ? C.iron : jit(C.woodB, 0.05, x, y, z, 23)));
    return m;
  }
  function fireplace(lit, frame) {
    const m = new Model();
    const st = (x, y, z) => jit(mix(C.stoneD, C.stoneL, hash3(x >> 1, y >> 1, z >> 1, 31)), 0.07, x, y, z, 31);
    m.box(-7, 7, -6, 6, 0, 14, st);
    m.box(-3, 4, -2, 6, 0, 30, st); // chaminé
    m.box(-3, 3, 2, 7, 0, 8, null); // vão da lareira (frente +Y)
    m.map.forEach((c, k) => { if (c === null) m.map.delete(k); });
    m.box(-3, 3, 2, 6, 0, 1, C.coal);
    m.box(-3, 3, 5, 6, 1, 8, (x, y, z) => C.coal);
    m.line(-2, 3, 1, 2, 4, 2, C.woodD, 1);
    if (lit) {
      const r = mulberry32(41 + (frame || 0) * 9);
      for (let i = 0; i < 4; i++) {
        const cx = -2 + r() * 4, cy = 3 + r() * 1.2, hgt = 4 + r() * 3 + (frame || 0);
        for (let z = 2; z < hgt + 2; z++) { const t = (z - 2) / hgt; m.ellipsoid(cx, cy, z, 1.2 * (1 - t) + 0.4, 1.2 * (1 - t) + 0.4, 0.7, t < 0.4 ? C.fire1 : t < 0.75 ? C.fire2 : C.fire3); }
      }
    }
    return m;
  }

  // ---------------- Estações ----------------
  function workbench() {
    const m = new Model();
    m.box(-7, 7, -5, 5, 9, 12, (x, y, z) => jit(((x + 8) >> 2) & 1 ? C.woodA : C.woodB, 0.05, x, y, z, 51));
    [[-6, -4], [5, -4], [-6, 3], [5, 3]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 0, 9, C.woodD));
    m.box(-7, 7, -5, -4, 3, 6, C.woodD);
    m.box(3, 6, -2, 2, 12, 16, C.iron); m.box(4, 5, -3, 3, 15, 18, C.ironL); // torno de bancada
    m.box(-5, -1, -3, 1, 12, 13, C.stoneL); // pedra de afiar / peça
    m.line(-4, 3, 12, 0, 3, 17, C.woodL, 0.7); m.box(-1, 2, 2, 5, 17, 19, C.ironL); // martelo
    return m;
  }
  function kiln(on) {
    const m = new Model();
    const br = (x, y, z) => jit(((z >> 1) & 1 ^ ((x + y) >> 2) & 1) ? C.brick : C.brickD, 0.07, x, y, z, 61);
    m.ellipsoid(0, 0, 4, 8, 8, 11, br);
    m.cyl(-3, -3, 14, 28, 2.5, br);
    // boca do forno (frente +X/+Y): vão
    for (let z = 1; z < 7; z++) for (let y = -2; y <= 2; y++) for (let x = 6; x <= 9; x++) m.del(x, y, z);
    m.box(5, 8, -2, 3, 1, 6, on ? C.fire2 : C.coal);
    if (on) m.box(5, 8, -1, 2, 2, 5, C.fire3);
    return m;
  }
  function blast(on, frame) {
    const m = new Model();
    const br = (x, y, z) => jit(((z >> 1) & 1 ^ ((x + y) >> 2) & 1) ? C.stone : C.stoneD, 0.07, x, y, z, 71);
    m.cone(0, 0, 0, 32, 7.5, 4.2, br);
    m.cyl(0, 0, 32, 34, 5, C.ironD);
    for (let z = 1; z < 7; z++) for (let y = -2; y <= 2; y++) for (let x = 5; x <= 9; x++) m.del(x, y, z);
    m.box(4, 8, -2, 3, 1, 6, on ? C.fire2 : C.coal);
    m.box(7, 9, -7, -1, 4, 10, (x, y, z) => jit([120, 84, 52], 0.08, x, y, z, 72)); // fole de couro
    if (on) { const r = mulberry32(81 + (frame || 0)); for (let i = 0; i < 4; i++) m.ellipsoid(-1 + r() * 2, -1 + r() * 2, 34 + i, 1.8 - i * 0.3, 1.8 - i * 0.3, 1, i < 2 ? C.fire2 : C.fire3); }
    return m;
  }
  function lab() {
    const m = new Model();
    m.box(-7, 7, -5, 5, 8, 11, (x, y, z) => jit(((x + 8) >> 2) & 1 ? C.woodA : C.woodB, 0.05, x, y, z, 91));
    [[-6, -4], [5, -4], [-6, 3], [5, 3]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 0, 8, C.woodD));
    [[-4, -2, C.red], [0, 0, C.glass], [4, -2, [100, 190, 110]]].forEach(([x, y, c]) => {
      m.cyl(x, y, 11, 17, 2.2, c); m.cyl(x, y, 17, 20, 1.2, C.glassD);
    });
    m.line(-4, 2, 12, 3, 2, 19, C.copper, 0.8); m.cyl(3, 2, 11, 14, 2, C.ironL); // serpentina
    m.box(-2, 3, 3, 5, 11, 12, C.white);
    return m;
  }
  function waterWheel(frame) {
    const m = new Model();
    const ang0 = (frame || 0) * (Math.PI / 16);
    const R = 12, cz = 14;
    for (let a = 0; a < 16; a++) {
      const ang = a * (Math.PI / 8) + ang0;
      const bx = Math.cos(ang) * R, bz = cz + Math.sin(ang) * R;
      m.box(Math.round(bx) - 2, Math.round(bx) + 2, -3, 3, Math.round(bz) - 1, Math.round(bz) + 2, (x, y, z) => jit(C.woodA, 0.06, x, y, z, 101)); // pás
      for (let t = 1; t < R; t += 1) m.set(Math.cos(ang) * t, y0(a), cz + Math.sin(ang) * t, jit(C.woodD, 0.08, t, a, 0, 102));
    }
    function y0() { return 0; }
    for (let a = 0; a < 48; a++) { const ang = (a / 48) * Math.PI * 2; m.box(Math.round(Math.cos(ang) * R) - 1, Math.round(Math.cos(ang) * R) + 1, -3, 3, Math.round(cz + Math.sin(ang) * R) - 1, Math.round(cz + Math.sin(ang) * R) + 1, C.woodD); }
    m.cyl(0, 0, 0, 0, 0.1, C.iron);
    m.box(-2, 2, -4, 4, cz - 2, cz + 2, C.iron); // eixo
    m.box(-9, -7, -4, 4, 0, cz, C.woodD); m.box(7, 9, -4, 4, 0, cz, C.woodD); // cavaletes
    return m;
  }
  function sawmill(on, frame) {
    const m = new Model();
    m.box(-8, 8, -7, 7, 0, 4, (x, y, z) => jit(((y + 8) >> 2) & 1 ? C.woodA : C.woodB, 0.05, x, y, z, 111));
    m.box(-8, -6, -7, 7, 4, 16, C.woodD); m.box(6, 8, -7, 7, 4, 16, C.woodD);
    m.box(-8, 8, -7, -5, 16, 18, C.woodD);
    // serra circular (disco no plano x-z)
    const a0 = on ? (frame || 0) * 0.35 : 0;
    for (let z = -8; z <= 8; z++) for (let x = -8; x <= 8; x++) {
      const r = Math.hypot(x, z);
      if (r <= 8 && r >= 1.5) {
        const teeth = r > 6.6 && (Math.floor((Math.atan2(z, x) + a0) * 4) & 1);
        if (!teeth || r <= 7.4) m.box(x, x + 1, -1, 1, 11 + z, 12 + z, jit(C.ironL, 0.08, x, z, 0, 112));
      }
    }
    m.box(-7, 7, 2, 6, 4, 8, (x, y, z) => jit(C.woodD, 0.1, x, y, z, 113)); // tora
    m.cyl(0, 0, 11, 12, 0.1, C.iron);
    return m;
  }
  function mill(on, frame) {
    const m = new Model();
    m.box(-7, 7, -7, 7, 0, 14, (x, y, z) => jit(mix(C.stone, C.stoneL, hash3((x + y) >> 2, z >> 2, 0, 121)), 0.06, x, y, z, 121));
    m.cone(0, 0, 14, 26, 9, 1.2, (x, y, z) => jit(((x + y + z) & 3) ? C.thatch : C.thatchD, 0.07, x, y, z, 122));
    m.box(5, 8, -2, 3, 0, 8, C.woodD);
    m.cyl(0, 0, 4, 6, 4, C.stoneL); // mó
    const a0 = on ? (frame || 0) * 0.5 : 0;
    for (let i = 0; i < 4; i++) { const a = i * (Math.PI / 2) + a0; m.line(8, 0, 9, 8, Math.cos(a) * 8, 9 + Math.sin(a) * 8, C.woodA, 0.8); }
    m.cyl(8, 0, 8, 10, 1.5, C.iron);
    return m;
  }
  function dynamo(on, frame) {
    const m = new Model();
    m.box(-7, 7, -6, 6, 0, 4, (x, y, z) => jit(C.ironD, 0.08, x, y, z, 131));
    m.cyl(0, 0, 4, 16, 5.5, (x, y, z) => jit(((z >> 1) & 1) ? C.copper : C.copperL, 0.06, x, y, z, 132));
    m.cyl(0, 0, 16, 18, 4, C.ironL);
    m.box(-6, -4, -1, 1, 4, 12, C.iron); m.box(4, 7, -1, 1, 6, 10, C.iron);
    m.cyl(0, 6, 8, 10, 2, C.ironD);
    m.ellipsoid(0, 0, 20, 1.6, 1.6, 1.6, on ? (frame ? C.glow : C.fire3) : C.ironD);
    return m;
  }
  function battery() {
    const m = new Model();
    m.box(-8, 8, -7, 7, 0, 2, C.woodD);
    [[-4, -3], [4, -3], [0, 3]].forEach(([x, y]) => {
      m.cyl(x, y, 2, 14, 3.2, (xx, yy, z) => (z < 10 ? [116, 196, 120] : C.glass));
      m.cyl(x, y, 14, 16, 3.4, C.iron);
      m.box(x - 1, x + 1, y - 1, y + 1, 16, 19, C.copperL);
    });
    m.line(-4, -3, 19, 4, -3, 19, C.copper, 0.6); m.line(4, -3, 19, 0, 3, 19, C.copper, 0.6);
    return m;
  }
  function lampPost(on) {
    const m = new Model();
    m.cyl(0, 0, 0, 3, 3.2, C.ironD);
    m.cyl(0, 0, 3, 34, 1.3, (x, y, z) => jit(C.iron, 0.06, x, y, z, 141));
    m.cyl(0, 0, 34, 36, 3, C.ironD);
    m.ellipsoid(0, 0, 39, 3.2, 3.2, 3.2, on ? C.glow : C.glass);
    m.cyl(0, 0, 42, 44, 3.6, C.ironD);
    m.line(0, 0, 30, 5, 0, 36, C.copper, 0.5);
    return m;
  }
  function greenhouse() {
    const m = new Model();
    const gl = (x, y, z) => jit(((x + y + z) & 3) === 0 ? C.glassD : C.glass, 0.05, x, y, z, 151);
    for (let z = 0; z < 14; z++) for (let y = -8; y < 8; y++) for (let x = -8; x < 8; x++) {
      const edge = x === -8 || x === 7 || y === -8 || y === 7;
      if (!edge) continue;
      const frame = (Math.abs(x) >= 7 && Math.abs(y) >= 7) || z === 0 || z === 13 || (z % 7 === 6 && false);
      m.set(x, y, z, frame ? C.ironD : gl(x, y, z));
    }
    for (let z = 14; z < 21; z++) { const w = 8 - (z - 13) * 1.1; for (let y = -8; y < 8; y++) for (let x = -Math.ceil(w); x < Math.ceil(w); x++) { if (Math.abs(x) >= Math.ceil(w) - 1 || y === -8 || y === 7) m.set(x, y, z, z === 20 ? C.ironD : gl(x, y, z)); } }
    m.box(-8, 8, -8, 8, 0, 1, (x, y, z) => jit(C.soil, 0.1, x, y, z, 152));
    for (let i = 0; i < 6; i++) m.ellipsoid(-5 + (i % 3) * 5, -3 + Math.floor(i / 3) * 6, 3, 2.2, 2.2, 2.4, C.leafL);
    return m;
  }
  function workshop() {
    const m = new Model();
    m.box(-8, 8, -6, 6, 0, 6, (x, y, z) => jit(C.ironD, 0.08, x, y, z, 161));
    m.box(-7, 7, -3, 3, 6, 9, (x, y, z) => jit(C.ironL, 0.06, x, y, z, 162));
    m.box(-7, -3, -4, 4, 9, 19, (x, y, z) => jit(C.iron, 0.06, x, y, z, 163)); // cabeçote
    m.cyl(-5, 0, 19, 22, 3, C.copper);
    m.box(4, 7, -2, 2, 9, 15, C.steel || C.ironL);
    for (let a = 0; a < 16; a++) { const ang = a * Math.PI / 8; m.box(Math.round(Math.cos(ang) * 6) + 5, Math.round(Math.cos(ang) * 6) + 7, 6, 8, 12 + Math.round(Math.sin(ang) * 6), 14 + Math.round(Math.sin(ang) * 6), C.brass); }
    m.box(-2, 2, -6, -4, 9, 14, C.glassD);
    return m;
  }
  function telegraph(on, frame) {
    const m = new Model();
    m.box(-7, 7, -6, 6, 8, 11, (x, y, z) => jit(C.woodA, 0.05, x, y, z, 171));
    [[-6, -5], [5, -5], [-6, 4], [5, 4]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 0, 8, C.woodD));
    m.box(-5, 1, -3, 3, 11, 14, C.woodD);
    m.line(-4, 0, 14, 0, 0, 16, C.brass, 0.7); m.ellipsoid(1, 0, 16, 1.2, 1.2, 1.2, C.brass); // manipulador
    m.box(2, 6, -4, 1, 11, 17, C.brass);
    m.cyl(4, -2, 17, 19, 1.5, on ? (frame ? C.glow : C.fire2) : C.ironD);
    m.line(-6, 5, 11, -6, 5, 34, C.woodD, 1); // poste
    m.line(-9, 5, 33, -3, 5, 33, C.woodD, 0.8);
    [[-9, 33], [-3, 33]].forEach(([x, z]) => m.ellipsoid(x, 5, z + 1, 1.2, 1.2, 1.2, C.glass));
    m.line(-9, 5, 34, 6, 0, 17, C.copper, 0.4);
    return m;
  }

  // ---------------- Culturas ----------------
  function crop(type, stage) {
    const m = new Model(); const r = mulberry32(300 + stage * 7 + type.length);
    const soil = (x, y, z) => jit(C.soil, 0.1, x, y, z, 5);
    if (stage === 0) {
      for (let i = 0; i < 6; i++) m.ellipsoid(-5 + (i % 3) * 5, -3 + Math.floor(i / 3) * 6, 0.5, 1.6, 1.6, 1, soil);
      return m;
    }
    const spots = [[-5, -4], [0, -4], [5, -4], [-5, 3], [0, 3], [5, 3]];
    spots.forEach(([cx, cy], i) => {
      const jx = cx + Math.round((r() - 0.5) * 2), jy = cy + Math.round((r() - 0.5) * 2);
      if (type === 'tuber') {
        const h = [0, 3, 6, 8][stage];
        m.ellipsoid(jx, jy, 1 + h / 2, 1.2 + stage * 0.7, 1.2 + stage * 0.7, 1 + h / 2, (x, y, z) => jit(C.leaf, 0.12, x, y, z, 31));
        if (stage === 3) m.ellipsoid(jx + 1, jy + 1, 0.8, 1.8, 1.8, 1.4, [176, 120, 70]);
      } else if (type === 'legume') {
        const h = [0, 5, 10, 14][stage];
        m.line(jx, jy, 0, jx, jy, h, C.woodD, 0.5);
        m.line(jx - 1, jy, 1, jx, jy, h * 0.9, (x, y, z) => jit(C.leafL, 0.1, x, y, z, 32), 0.8);
        if (stage === 3) for (let k = 0; k < 3; k++) m.line(jx + 1, jy, 5 + k * 3, jx + 1, jy, 7 + k * 3, [96, 150, 70], 0.6);
      } else if (type === 'veg') {
        const rad = [0, 1.6, 2.6, 3.4][stage];
        m.ellipsoid(jx, jy, 1.5 + stage * 0.5, rad, rad, 1.4 + stage * 0.6, (x, y, z) => jit(stage === 3 ? mix(C.leaf, C.leafL, hash3(x, y, z, 33)) : C.leaf, 0.1, x, y, z, 33));
        if (stage === 3) m.ellipsoid(jx, jy, 3, 1.6, 1.6, 1.4, [190, 210, 120]);
      } else {
        const h = [0, 4, 8, 11][stage];
        m.line(jx, jy, 0, jx, jy, h, (x, y, z) => jit(C.leafD, 0.1, x, y, z, 34), 0.7);
        m.ellipsoid(jx, jy, h, 1.4 + stage * 0.4, 1.4 + stage * 0.4, 1.2 + stage * 0.3, (x, y, z) => jit(C.leaf, 0.12, x, y, z, 35));
        if (stage === 3) { m.ellipsoid(jx + 1, jy, h + 1, 1.5, 1.5, 1.5, C.white); m.ellipsoid(jx - 1, jy, h, 1.3, 1.3, 1.3, C.white); }
      }
    });
    return m;
  }

  // ---------------- Pilhas de itens largados ----------------
  function pile(large) {
    const m = new Model(); const R = mulberry32(large ? 77 : 33);
    const burlap = (x, y, z) => jit([180, 142, 86], 0.1, x, y, z, 5);
    m.ellipsoid(-3, -1, 3, 4.2, 3.6, 3.6, burlap);
    m.cyl(-3, -1, 6, 8, 1, [120, 90, 50]);
    m.box(2, 6, 1, 5, 0, 3, (x, y, z) => jit(((z >> 1) & 1) ? C.woodA : C.woodB, 0.08, x, y, z, 6));
    m.ellipsoid(0, 4, 1, 1.6, 1.4, 1.2, C.stone); m.ellipsoid(-6, 3, 1, 1.3, 1.3, 1.1, C.stoneL);
    if (large) {
      m.ellipsoid(3, -4, 4, 4, 3.4, 3.6, (x, y, z) => jit([196, 158, 98], 0.1, x, y, z, 7));
      m.cyl(3, -4, 7, 9, 1, [120, 90, 50]);
      m.box(-7, -2, 4, 9, 0, 4, (x, y, z) => jit(((x >> 1) & 1) ? C.woodB : C.woodA, 0.08, x, y, z, 8));
      m.line(-7, -5, 1, 1, -6, 2, C.woodD, 1.3); m.line(-4, 6, 1, 3, 7, 2, C.woodL, 1.1);
      m.ellipsoid(6, 0, 3, 1.4, 1.4, 3, [116, 196, 120]); m.cyl(6, 0, 5, 7, 0.9, C.glass);
      for (let i = 0; i < 4; i++) m.line(-1, -2, 1, -1 + (R() - 0.5) * 6, -2 + (R() - 0.5) * 6, 3 + R() * 2, C.woodA, 0.6);
    }
    return m;
  }


  // ---------------- Canteiros de obra (construção inacabada) ----------------
  // stage 0: estacas e corda · 1: montantes e tábuas · 2: quase pronta, cavalete e material
  function siteWall(stage) {
    const m = new Model(); const R = mulberry32(900 + stage);
    const dirt = (x, y, z) => jit([118, 92, 60], 0.12, x, y, z, 11);
    const raw = (x, y, z) => jit((((x + y + 32) >> 2) & 1) ? C.woodL : C.woodA, 0.07, x, y, z, 12);
    const post = (x, y, z) => jit(C.woodB, 0.07, x, y, z, 13);
    const rope = [216, 198, 142];
    m.box(-8, 8, -8, 8, 0, 1, dirt);
    const px = [-7, 0, 6];
    if (stage === 0) {
      [[-7, -7], [6, -7], [-7, 6], [6, 6], [0, 0]].forEach(([x, y], i) => m.box(x, x + 2, y, y + 2, 1, 9 + (i % 2) * 3, post));
      m.line(-6, -6, 8, 6, -6, 8, rope); m.line(6, -6, 8, 6, 6, 8, rope); m.line(6, 6, 8, -6, 6, 8, rope); m.line(-6, 6, 8, -6, -6, 8, rope);
      m.box(-6, 3, 1, 4, 1, 3, raw); m.box(-5, 4, 2, 5, 3, 5, raw);   // tábuas empilhadas
      m.ellipsoid(4, -3, 2, 2.5, 2.5, 1.8, C.stoneD);
    } else if (stage === 1) {
      px.forEach((x) => [-7, 6].forEach((y) => m.box(x, x + 2, y, y + 2, 1, 21, post)));
      m.box(-7, 8, -7, -5, 18, 20, raw); m.box(-7, 8, 5, 7, 18, 20, raw);          // vigas superiores
      m.box(-7, 8, -7, -5, 1, 9, raw);                                              // cladding parcial (face)
      m.line(-7, 6, 2, 6, 6, 19, C.woodD, 0.9);                                     // escora diagonal
      m.box(-7, 0, 5, 7, 1, 5, (x, y, z) => jit(C.woodA, 0.07, x, y, z, 14));
      m.line(-6, -6, 17, 6, -6, 17, rope);
      for (let i = 0; i < 3; i++) m.box(-3 + i * 4, -1 + i * 4, 0, 6, 1, 3, raw);   // tábuas no chão
    } else {
      px.forEach((x) => [-7, 6].forEach((y) => m.box(x, x + 2, y, y + 2, 1, 29, post)));
      m.box(-7, 8, -7, -5, 1, 18, raw); m.box(-7, 8, 5, 7, 1, 14, raw);            // cladding alto
      m.box(-7, 8, -7, -5, 26, 29, (x, y, z) => jit(C.woodL, 0.06, x, y, z, 15));  // viga de topo
      m.box(-7, 8, 5, 7, 26, 29, (x, y, z) => jit(C.woodL, 0.06, x, y, z, 16));
      m.line(-7, -6, 18, 6, -6, 26, C.woodD, 0.9);
      m.box(-4, 6, 0, 3, 1, 9, raw);                                                // cavalete + tábuas
      m.box(-4, -3, 0, 3, 1, 13, post); m.box(5, 6, 0, 3, 1, 13, post);
      m.ellipsoid(2, 4, 2, 2.2, 2.2, 1.6, C.thatchD);
    }
    return m;
  }

  function siteSmall(stage) {
    const m = new Model();
    const dirt = (x, y, z) => jit([118, 92, 60], 0.12, x, y, z, 21);
    const raw = (x, y, z) => jit((((x + y + 32) >> 2) & 1) ? C.woodL : C.woodA, 0.07, x, y, z, 22);
    const post = (x, y, z) => jit(C.woodB, 0.07, x, y, z, 23);
    const blk = (x, y, z) => { const u = x + y; return jit(((z >> 1) & 1) ? (((u + 32) >> 2) & 1 ? C.stone : C.stoneD) : C.brick, 0.08, x, y, z, 24); };
    const rope = [216, 198, 142];
    m.box(-8, 8, -8, 8, 0, 1, dirt);
    if (stage === 0) {
      [[-7, -7], [6, -7], [-7, 6], [6, 6]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 1, 11, post));
      m.line(-6, -6, 10, 6, -6, 10, rope); m.line(6, -6, 10, 6, 6, 10, rope); m.line(6, 6, 10, -6, 6, 10, rope); m.line(-6, 6, 10, -6, -6, 10, rope);
      m.box(-4, 4, -3, 3, 1, 3, (x, y, z) => jit(C.stoneD, 0.1, x, y, z, 25));      // base de pedra
      m.box(-6, 2, 3, 6, 1, 3, raw); m.box(-5, 3, 4, 7, 3, 5, raw);
    } else if (stage === 1) {
      [[-7, -7], [6, -7], [-7, 6], [6, 6]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 1, 20, post));
      m.box(-7, 8, -7, -5, 14, 16, raw); m.box(-7, 8, 5, 7, 14, 16, raw);
      m.box(-7, -5, -7, 8, 14, 16, raw); m.box(5, 7, -7, 8, 14, 16, raw);
      m.box(-4, 4, -4, 4, 1, 11, blk);                                               // metade do corpo
      m.line(-7, 6, 2, 6, 6, 14, C.woodD, 0.9);
      m.box(-6, 0, -1, 3, 1, 3, raw);
    } else {
      [[-7, -7], [6, -7], [-7, 6], [6, 6]].forEach(([x, y]) => m.box(x, x + 2, y, y + 2, 1, 29, post));
      m.box(-7, 8, -7, -5, 24, 26, raw); m.box(-7, 8, 5, 7, 24, 26, raw);
      m.box(-7, -5, -7, 8, 24, 26, raw); m.box(5, 7, -7, 8, 24, 26, raw);
      m.box(-7, 8, -7, -5, 12, 14, raw); m.box(-7, 8, 5, 7, 12, 14, raw);
      m.box(-5, 5, -5, 5, 1, 19, blk);                                               // corpo quase pronto
      m.line(-5, -6, 1, -5, -6, 26, C.woodD, 0.8);                                   // escada
      m.box(2, 8, -8, -4, 1, 5, raw);
    }
    return m;
  }

  // ---------------- Registro ----------------
  const O = Ilha.Models.OBJECTS;
  const add = (name, variants, build, extra) => { O[name] = Object.assign({ variants, build }, extra); };
  add('WALL_WOOD', 1, () => wallBlock('wood', 1));
  add('WALL_STONE', 1, () => wallBlock('stone', 2));
  add('WALL_BRICK', 1, () => wallBlock('brick', 3));
  add('WINDOW_GLASS', 1, () => wallBlock('wood', 4, true));
  ['X', 'Y'].forEach((ax) => {
    add(`DOOR_${ax}_CLOSED`, 1, () => door(ax, false));
    add(`DOOR_${ax}_OPEN`, 1, () => door(ax, true));
  });
  add('DOOR_WOOD', 1, () => door('X', false));
  add('ROOF_THATCH', 1, () => roof('thatch'), { noShadow: true });
  add('ROOF_TILE', 1, () => roof('tile'), { noShadow: true });
  for (let st = 0; st < 3; st++) {
    add(`SITE_WALL_${st}`, 1, () => siteWall(st));
    add(`SITE_SMALL_${st}`, 1, () => siteSmall(st));
  }
  add('BED_RUSTIC', 1, () => bed(false));
  add('BED_COMFORT', 1, () => bed(true));
  add('CHEST', 1, () => chest());
  add('ITEM_PILE_S', 1, () => pile(false));
  add('ITEM_PILE_L', 1, () => pile(true));
  add('FIREPLACE_UNLIT', 1, () => fireplace(false, 0));
  add('FIREPLACE_LIT', 1, (v, f) => fireplace(true, f), { frames: 3 });
  add('WORKBENCH', 1, () => workbench());
  add('KILN', 1, () => kiln(false));
  add('KILN_ON', 1, () => kiln(true));
  add('BLAST_FURNACE', 1, () => blast(false, 0));
  add('BLAST_FURNACE_ON', 1, (v, f) => blast(true, f), { frames: 3 });
  add('LAB', 1, () => lab());
  add('WATER_WHEEL', 1, (v, f) => waterWheel(f), { frames: 4 });
  add('SAWMILL', 1, () => sawmill(false, 0));
  add('SAWMILL_ON', 1, (v, f) => sawmill(true, f), { frames: 3 });
  add('MILL', 1, () => mill(false, 0));
  add('MILL_ON', 1, (v, f) => mill(true, f), { frames: 3 });
  add('DYNAMO', 1, () => dynamo(false, 0));
  add('DYNAMO_ON', 1, (v, f) => dynamo(true, f), { frames: 2 });
  add('BATTERY', 1, () => battery());
  add('LAMP_POST', 1, () => lampPost(false));
  add('LAMP_POST_ON', 1, () => lampPost(true));
  add('GREENHOUSE', 1, () => greenhouse());
  add('WORKSHOP', 1, () => workshop());
  add('TELEGRAPH', 1, () => telegraph(false, 0));
  add('TELEGRAPH_ON', 1, (v, f) => telegraph(true, f), { frames: 2 });
  ['tuber', 'legume', 'veg', 'fiber'].forEach((t) => {
    for (let s = 0; s < 4; s++) add(`CROP_${t.toUpperCase()}_${s}`, 1, () => crop(t, s), { noShadow: s < 2 });
  });
})();
