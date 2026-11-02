/* =====================================================================
 * models.js — Modelos procedurais de voxels: objetos do mapa e Cyrus.
 * Semente fixa => resultado idêntico a cada execução.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const V = Ilha.VoxelEngine;
  const { Model, hash3, mulberry32, mul, mix, jit } = V;

  // Paleta (tons levemente dessaturados, estilo "pós-apocalipse tropical")
  const C = {
    barkD: [66, 46, 30], bark: [98, 68, 42], barkL: [128, 92, 58],
    leafD: [58, 92, 42], leafM: [88, 126, 56], leafL: [134, 166, 76],
    stoneD: [88, 88, 86], stone: [124, 122, 116], stoneL: [158, 156, 148],
    rust: [150, 72, 44], copper: [176, 98, 52],
    clay: [150, 94, 60], clayD: [112, 70, 46], clayL: [176, 118, 78],
    wick: [150, 110, 62], wickD: [112, 80, 44],
    red: [176, 52, 38], cream: [226, 212, 178], rope: [168, 140, 90],
    wood: [140, 98, 56], woodD: [96, 66, 38], woodL: [168, 124, 72],
    brass: [200, 158, 52], brassD: [140, 108, 36],
    ash: [70, 66, 62], coal: [40, 30, 26],
    fire1: [236, 70, 24, 1], fire2: [250, 150, 32, 1], fire3: [255, 228, 100, 1],
    orange: [240, 140, 30], white: [232, 232, 220], skin: [222, 176, 140],
    hair: [86, 56, 34], coat: [64, 74, 98], coatD: [46, 54, 76], shirt: [226, 216, 190],
    pants: [86, 66, 46], boots: [34, 26, 22],
  };

  const leafAt = (seed, zN) => (x, y, z) => {
    const n = hash3(x, y, z, seed);
    const t = Math.min(1, Math.max(0, zN(z) * 0.75 + (n - 0.5) * 0.7));
    return t < 0.5 ? mix(C.leafD, C.leafM, t * 2) : mix(C.leafM, C.leafL, (t - 0.5) * 2);
  };

  // ---------------- Árvores ----------------
  function tree(seed, o) {
    o = o || {};
    const m = new Model(); const R = mulberry32(seed);
    const h = (o.h || 22) + Math.floor(R() * 5);
    const bark = (x, y, z) => jit(mix(C.barkD, C.bark, ((x * 3 + y * 5 + z) & 3) / 3), 0.1, x, y, z, seed);
    m.cone(0, 0, 0, h, 3.6, 2.2, bark);
    m.cone(0, 0, 0, 3, 5, 3.6, bark);
    const leaf = leafAt(seed, (z) => (z - h) / 22);
    const n = 6 + Math.floor(R() * 3);
    for (let i = 0; i < n; i++) {
      const a = R() * 6.283, r = R() * 5.5;
      const rad = 5.4 + R() * 3;
      m.ellipsoid(Math.cos(a) * r, Math.sin(a) * r, h + 1 + R() * 9, rad, rad, rad * 0.82, leaf);
    }
    m.ellipsoid(0, 0, h + 9, 6.2, 6.2, 5, leaf);
    if (o.fruit) {
      const fr = [];
      m.map.forEach((c, k) => { if (c[2] < 80 && hash3(k, 3, 9, seed) < 0.035) fr.push(k); });
      fr.forEach((k) => m.map.set(k, jit(C.orange, 0.1, k, 1, 1, seed)));
    }
    return m;
  }
  const stump = (seed) => {
    const m = new Model();
    const bark = (x, y, z) => jit(mix(C.barkD, C.bark, ((x + y * 3 + z) & 3) / 3), 0.1, x, y, z, seed);
    m.cone(0, 0, 0, 5, 4.6, 3.6, bark);
    m.cyl(0, 0, 5, 6, 3.4, (x, y) => ((Math.round(Math.hypot(x, y)) & 1) ? C.woodL : C.wood));
    m.cone(0, 0, 0, 2, 6, 4.6, bark);
    return m;
  };
  const treeBare = (seed) => {
    // cítrica sem frutos: copa menor e mais clara
    return tree(seed, { h: 20 });
  };

  // ---------------- Arbustos e plantas ----------------
  function bush(seed) {
    const m = new Model(); const R = mulberry32(seed);
    const leaf = leafAt(seed, (z) => (z - 1) / 9);
    for (let i = 0; i < 5; i++) {
      const a = R() * 6.283, r = 1 + R() * 4;
      m.ellipsoid(Math.cos(a) * r, Math.sin(a) * r, 3 + R() * 2.5, 3.6 + R() * 1.6, 3.6 + R() * 1.6, 3.2, leaf);
    }
    for (let i = 0; i < 6; i++) {
      const a = R() * 6.283;
      m.line(0, 0, 1, Math.cos(a) * 6.5, Math.sin(a) * 6.5, 6 + R() * 4, (x, y, z) => jit(C.wood, 0.15, x, y, z, seed));
    }
    return m;
  }
  function bushBare(seed) {
    const m = new Model(); const R = mulberry32(seed);
    for (let i = 0; i < 9; i++) {
      const a = R() * 6.283;
      m.line(0, 0, 0, Math.cos(a) * 6, Math.sin(a) * 6, 5 + R() * 5, (x, y, z) => jit(C.woodD, 0.2, x, y, z, seed));
    }
    return m;
  }
  function herb(seed) {
    const m = new Model(); const R = mulberry32(seed);
    const lc = (x, y, z) => jit(mix(C.leafM, C.leafL, (hash3(x, y, z, seed))), 0.1, x, y, z, seed);
    for (let i = 0; i < 6; i++) {
      const a = R() * 6.283, r = R() * 3.5;
      const bx = Math.cos(a) * r, by = Math.sin(a) * r, hh = 7 + R() * 7;
      m.line(bx, by, 0, bx + (R() - 0.5) * 2, by + (R() - 0.5) * 2, hh, lc);
      m.box(Math.round(bx) - 2, Math.round(bx) + 3, Math.round(by), Math.round(by) + 1, Math.round(hh * 0.6), Math.round(hh * 0.6) + 1, lc);
      if (i % 3 === 0) m.ellipsoid(bx, by, hh + 1, 1.2, 1.2, 1.2, i % 2 ? C.white : [214, 70, 60]);
    }
    return m;
  }
  function herbSprout(seed) {
    const m = new Model(); const R = mulberry32(seed);
    for (let i = 0; i < 3; i++) {
      const a = R() * 6.283;
      m.line(0, 0, 0, Math.cos(a) * 2, Math.sin(a) * 2, 3 + R() * 2, (x, y, z) => jit(C.leafL, 0.1, x, y, z, seed));
    }
    return m;
  }

  // ---------------- Rochas ----------------
  function rock(seed, o) {
    o = o || {};
    const m = new Model();
    const rx = o.rx || 7, ry = o.ry || 6, rz = o.rz || 5.5;
    for (let z = 0; z <= rz + 1; z++) for (let y = -9; y <= 9; y++) for (let x = -9; x <= 9; x++) {
      const rough = 0.82 + 0.34 * hash3(Math.floor(x / 2), Math.floor(y / 2), Math.floor(z / 2), seed);
      const d = (x / (rx * rough)) ** 2 + (y / (ry * rough)) ** 2 + ((z - 1) / (rz * rough)) ** 2;
      if (d > 1) continue;
      const n = hash3(x, y, z, seed + 1);
      let c = mix(C.stoneD, C.stoneL, Math.min(1, z / (rz * 1.2) + (n - 0.5) * 0.5));
      if (o.vein && Math.abs(((x * 0.7 + y * 0.4 + z * 0.9) % 6)) < 1.4 && n > 0.25) c = jit(n > 0.6 ? C.copper : C.rust, 0.12, x, y, z, seed);
      if (o.clay) c = mix(C.clayD, C.clayL, Math.min(1, z / 6 + (n - 0.5) * 0.45));
      m.set(x, y, z, jit(c, 0.07, x, y, z, seed));
    }
    return m;
  }

  // ---------------- Destroços e caixas ----------------
  function wreckage(seed) {
    const m = new Model(); const R = mulberry32(seed);
    // cesto de vime
    const wick = (x, y, z) => jit(((x + z) & 1) ? C.wick : C.wickD, 0.08, x, y, z, seed);
    m.box(-5, 6, -4, 5, 0, 7, wick);
    m.box(-4, 5, -3, 4, 1, 7, null); // oco (null removido abaixo)
    m.map.forEach((c, k) => { if (c === null) m.map.delete(k); });
    // borda
    m.box(-5, 6, -4, 5, 6, 7, C.woodD);
    m.box(-4, 5, -3, 4, 6, 7, null);
    m.map.forEach((c, k) => { if (c === null) m.map.delete(k); });
    // lona listrada (vermelho/creme), desabada
    const sty = (x, y, z) => {
      const band = Math.floor((Math.atan2(y, x + 3) + 3.2) * 2.2) % 2;
      return jit(band ? C.red : C.cream, 0.08, x, y, z, seed);
    };
    for (let z = 5; z <= 15; z++) for (let y = -9; y <= 9; y++) for (let x = -10; x <= 6; x++) {
      const d = ((x + 2) / 9.5) ** 2 + (y / 8) ** 2 + ((z - 5) / 9) ** 2;
      if (d <= 1 && d > 0.52) m.set(x, y, z, sty(x, y, z));
    }
    // cordas
    [[-4, -3], [4, -3], [-4, 3], [4, 3]].forEach(([x, y]) => m.line(x, y, 6, x * 1.6, y * 2, 13, (a, b, c) => jit(C.rope, 0.1, a, b, c, seed)));
    // rasgo: remove alguns voxels
    for (let i = 0; i < 40; i++) m.del(-9 + Math.floor(R() * 14), -7 + Math.floor(R() * 14), 8 + Math.floor(R() * 6));
    return m;
  }
  function rags(seed) {
    const m = new Model();
    for (let y = -6; y <= 6; y++) for (let x = -7; x <= 7; x++) {
      const n = hash3(x >> 1, y >> 1, 0, seed);
      if (n < 0.55 && (x * x) / 40 + (y * y) / 30 < 1) m.set(x, y, 0, jit(((x >> 1) + (y >> 1)) & 1 ? C.red : C.cream, 0.08, x, y, 0, seed));
    }
    m.line(-5, 3, 0, 6, -4, 0, C.rope);
    return m;
  }
  function crate(seed) {
    const m = new Model();
    const plank = (x, y, z) => {
      const edge = (Math.abs(x) >= 6 || Math.abs(y) >= 5) && (z <= 1 || z >= 9 || (Math.abs(x) >= 6 && Math.abs(y) >= 5));
      if (edge) return C.brass;
      return jit(((z >> 1) & 1) ? C.wood : C.woodD, 0.1, x, y, z, seed);
    };
    m.box(-6, 7, -5, 6, 0, 11, plank);
    m.box(-6, 7, -5, 6, 10, 11, (x, y, z) => jit(C.woodL, 0.08, x, y, z, seed));
    return m;
  }

  // ---------------- Fogueira ----------------
  function campfire(lit, frame) {
    const m = new Model(); const R = mulberry32(11);
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 6.283;
      m.ellipsoid(Math.cos(a) * 6.5, Math.sin(a) * 6.5, 1.5, 2.3, 2.3, 2, (x, y, z) => jit(mix(C.stoneD, C.stoneL, hash3(x, y, z, 5)), 0.08, x, y, z, 5));
    }
    m.cyl(0, 0, 0, 1, 5.5, (x, y, z) => jit(lit ? C.coal : C.ash, 0.2, x, y, z, 3));
    const log = (x, y, z) => jit(lit ? mix(C.woodD, C.coal, 0.35) : C.woodD, 0.15, x, y, z, 2);
    m.line(-5, -3, 1.5, 4, 3.5, 4.5, log, 1.4);
    m.line(-4, 4, 1.5, 4, -3.5, 4.5, log, 1.4);
    m.line(-1, -5, 1.5, 1, 5, 4, log, 1.4);
    if (lit) {
      const f = frame || 0;
      const rr = mulberry32(31 + f * 7);
      for (let i = 0; i < 7; i++) {
        const a = rr() * 6.283, r = rr() * 2.6;
        const hgt = 7 + rr() * 8 + (i === 0 ? 4 : 0) + f;
        const cx = Math.cos(a) * r, cy = Math.sin(a) * r;
        for (let z = 3; z < hgt; z++) {
          const t = (z - 3) / (hgt - 3);
          const rad = 2.4 * (1 - t) + 0.4;
          const col = t < 0.35 ? C.fire1 : t < 0.7 ? C.fire2 : C.fire3;
          m.ellipsoid(cx * (1 - t * 0.5), cy * (1 - t * 0.5), z, rad, rad, 0.8, col);
        }
      }
    }
    return m;
  }

  // ---------------- Abrigo de folhas ----------------
  function shelter(seed) {
    const m = new Model();
    const leaf = (x, y, z) => jit(mix(C.leafM, C.leafL, hash3(x, y, z, seed)), 0.12, x, y, z, seed);
    for (let y = -7; y <= 7; y++) {
      for (let x = -8; x <= 8; x++) {
        const zl = 15 - Math.abs(x) * 1.75;
        if (zl < 0) continue;
        for (let z = Math.max(0, Math.floor(zl) - 1); z <= Math.floor(zl); z++) {
          if (y === 7 && Math.abs(x) <= 2 && z < 9) continue; // entrada
          m.set(x, y, z, leaf(x, y, z));
        }
      }
    }
    // parede dos fundos fechada, chão escuro
    m.cyl(0, 0, 0, 1, 0.1, C.coal);
    for (let y = -7; y <= 7; y++) for (let x = -7; x <= 7; x++) m.set(x, y, 0, jit(C.woodD, 0.2, x, y, 0, seed));
    // estacas
    m.line(-8, -7, 0, 0, -7, 16, C.wood, 0.8);
    m.line(8, -7, 0, 0, -7, 16, C.wood, 0.8);
    m.line(-8, 7, 0, 0, 7, 16, C.wood, 0.8);
    m.line(8, 7, 0, 0, 7, 16, C.wood, 0.8);
    m.line(0, -7, 16, 0, 7, 16, C.woodL, 0.9);
    return m;
  }

  // ---------------- Filtro de água ----------------
  function filter(seed) {
    const m = new Model();
    const pole = (x, y, z) => jit(C.wood, 0.12, x, y, z, seed);
    [[-8, -6], [8, -6], [0, 9]].forEach(([x, y]) => m.line(x, y, 0, x * 0.25, y * 0.25, 27, pole, 1.2));
    m.cyl(0, 0, 11, 25, 2.8, (x, y, z) => {
      const layers = [C.cream, [220, 200, 150], C.coal, [120, 120, 118], [90, 90, 88]];
      const i = Math.min(4, Math.floor((24 - z) / 3));
      return jit(layers[i], 0.1, x, y, z, seed);
    });
    m.cyl(0, 0, 25, 28, 4.6, (x, y, z) => jit(z === 27 ? C.cream : C.brassD, 0.06, x, y, z, seed));
    m.cyl(0, 0, 0, 9, 4, (x, y, z) => jit(z < 1 ? C.brassD : C.copper, 0.08, x, y, z, seed));
    m.cyl(0, 0, 8, 9, 3, [70, 120, 130]);
    return m;
  }

  // ---------------- Cyrus Smith ----------------
  /** sw: balanço das pernas em voxels (-3..3); o modelo "olha" para +X. */
  function cyrus(sw) {
    const m = new Model();
    const j = (c, a) => (x, y, z) => jit(c, a || 0.06, x, y, z, 9);
    [-1, 1].forEach((side) => {
      const ox = side < 0 ? sw : -sw;
      const lift = ox > 1 ? 1 : 0;
      const y0 = side < 0 ? -4 : 1;
      m.box(ox - 2, ox + 2, y0, y0 + 3, lift + 4, 15, j(C.pants));
      m.box(ox - 2, ox + 3, y0, y0 + 3, lift, lift + 4, j(C.boots));
    });
    // torso
    m.box(-3, 4, -6, 6, 14, 28, (x, y, z) => {
      if (x === 3 && Math.abs(y) <= 1 && z > 15) return (z % 4 === 2 && y === 0) ? C.brass : C.shirt;
      if (z <= 15) return jit([46, 36, 30], 0.06, x, y, z, 9); // cinto
      return jit(z > 24 ? C.coat : (y < -1 ? C.coat : C.coatD), 0.05, x, y, z, 9);
    });
    // braços
    [-1, 1].forEach((side) => {
      const ox = side < 0 ? -sw : sw;
      const y0 = side < 0 ? -9 : 6;
      m.box(ox - 2, ox + 2, y0, y0 + 3, 16, 26, j(C.coat));
      m.box(ox - 2, ox + 2, y0, y0 + 3, 13, 16, j(C.skin));
    });
    // pescoço e cabeça
    m.box(-1, 2, -2, 3, 28, 30, j(C.skin));
    m.box(-3, 4, -4, 5, 30, 38, (x, y, z) => {
      if (x >= 3 && z <= 33 && z >= 30) return jit(C.hair, 0.1, x, y, z, 9); // barba
      if (x === 3 && z === 35 && (y === -3 || y === 2)) return [30, 24, 22]; // olhos
      if (z >= 36 || x <= -2 || Math.abs(y + 0.5) >= 4) return jit(C.hair, 0.12, x, y, z, 9); // cabelo
      return jit(C.skin, 0.04, x, y, z, 9);
    });
    // chapéu-coco
    m.cyl(0, 0, 38, 39, 5.6, j([34, 28, 26]));
    m.cyl(0, 0, 39, 42, 3.6, j([40, 34, 32]));
    return m;
  }

  // ---------------- Tabela de modelos ----------------
  // variants: quantidade de variações; build(variant) -> Model
  const OBJECTS = {
    TREE_HARDWOOD: { variants: 3, build: (v) => tree(101 + v * 17, { h: 22 }) },
    STUMP: { variants: 1, build: () => stump(5) },
    BUSH_TWIGS: { variants: 3, build: (v) => bush(201 + v * 13) },
    BUSH_BARE: { variants: 1, build: () => bushBare(207) },
    CITRUS_TREE: { variants: 2, build: (v) => tree(301 + v * 19, { h: 19, fruit: true }) },
    CITRUS_BARE: { variants: 1, build: () => treeBare(305) },
    HERB_PLANT: { variants: 2, build: (v) => herb(401 + v * 7) },
    HERB_SPROUT: { variants: 1, build: () => herbSprout(411) },
    BOULDER_STONE: { variants: 3, build: (v) => rock(501 + v * 11, { rx: 6.5 + v, ry: 6 + (v % 2), rz: 5 + v * 0.6 }) },
    IRON_VEIN: { variants: 2, build: (v) => rock(601 + v * 11, { vein: true, rx: 7, ry: 6.5, rz: 7 }) },
    CLAY_DEPOSIT: { variants: 2, build: (v) => rock(701 + v * 5, { clay: true, rx: 7, ry: 6, rz: 4.5 }) },
    BALLOON_WRECKAGE: { variants: 2, build: (v) => wreckage(801 + v * 3) },
    BALLOON_RAGS: { variants: 1, build: () => rags(811) },
    WASHED_CRATE: { variants: 2, build: (v) => crate(901 + v) },
    CAMPFIRE_UNLIT: { variants: 1, build: () => campfire(false, 0) },
    CAMPFIRE_LIT: { variants: 1, frames: 3, build: (v, f) => campfire(true, f) },
    LEAF_SHELTER: { variants: 1, build: () => shelter(1001) },
    WATER_FILTER: { variants: 1, build: () => filter(1101) },
  };

  const PLAYER = {
    frames: [0, 3, -3], // parado, passo A, passo B
    build: (frame) => cyrus(PLAYER.frames[frame]),
  };

  Ilha.Models = { OBJECTS, PLAYER, tree, cyrus };
})();
