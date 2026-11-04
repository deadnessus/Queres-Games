/* =====================================================================
 * world.js — Geração determinística do Setor Inicial (64x64):
 * Praia do Naufrágio & Casa de Granito
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  // ---------------- PRNG e ruído ----------------
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash2(x, y, seed) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 2147483647)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  const smooth = (t) => t * t * (3 - 2 * t);
  function noise(x, y, seed) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const a = hash2(xi, yi, seed), b = hash2(xi + 1, yi, seed);
    const c = hash2(xi, yi + 1, seed), d = hash2(xi + 1, yi + 1, seed);
    const u = smooth(xf), v = smooth(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  const key = (x, y) => x + ',' + y;

  // ---------------- Geração ----------------
  function generate(seed) {
    const W = Config.MAP_W, H = Config.MAP_H;
    const rng = mulberry32(seed);
    const terrain = [];
    const objects = [];
    for (let y = 0; y < H; y++) { terrain.push(new Array(W).fill('GRASS')); objects.push(new Array(W).fill(null)); }
    const T = (x, y) => terrain[y][x];
    const inB = (x, y) => x >= 0 && y >= 0 && x < W && y < H;

    // Linha da costa e início da praia
    const shore = (x) => Math.round(53 + 2.5 * Math.sin(x * 0.19 + 1) + (noise(x * 0.12, 3.3, seed) - 0.5) * 3);
    const sandStart = (x) => shore(x) - 10 + Math.round((noise(x * 0.15, 7.7, seed) - 0.5) * 3);
    // Eixo do rio (Centro/Leste): desce do norte e desagua no mar
    const riverX = (y) => 44 + 4 * Math.sin(y * 0.11 + 0.5) + (noise(y * 0.08, 9.1, seed) - 0.5) * 3;
    const halfWidth = (y) => (y > 44 ? 2 : 1);

    // 1) Terrenos base
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const s = shore(x);
        const nShallow = 3 + Math.round((noise(x * 0.2, 5.5, seed) - 0.5) * 2);
        if (y >= s + nShallow) { terrain[y][x] = 'DEEP_OCEAN'; continue; }
        if (y >= s) { terrain[y][x] = 'SHALLOW_WATER'; continue; }
        if (y >= sandStart(x)) { terrain[y][x] = 'SAND'; continue; }

        // Interior: Granito (NO e NE), Floresta (Norte/Oeste), Grama
        const g1 = Math.pow(x / 27, 2) + Math.pow(y / 25, 2) + (noise(x * 0.18, y * 0.18, seed + 2) - 0.5) * 0.5;
        const g2 = Math.pow((63 - x) / 20, 2) + Math.pow(y / 19, 2) + (noise(x * 0.18, y * 0.18, seed + 3) - 0.5) * 0.5;
        if (g1 < 1 || g2 < 1) { terrain[y][x] = 'GRANITE_FLOOR'; continue; }
        const jf = 0.55 * clamp01((40 - y) / 40) + 0.35 * clamp01((34 - x) / 34) + (noise(x * 0.1, y * 0.1, seed + 4) - 0.5) * 0.6;
        terrain[y][x] = jf > 0.33 ? 'JUNGLE_FLOOR' : 'GRASS';
      }
    }

    // 2) Rio de água doce + margens de argila
    const riverTiles = [];
    for (let y = 0; y < H; y++) {
      const rx = riverX(y);
      const hw = halfWidth(y);
      for (let x = Math.floor(rx - hw - 3); x <= Math.ceil(rx + hw + 3); x++) {
        if (!inB(x, y)) continue;
        const t = T(x, y);
        if (t === 'SHALLOW_WATER' || t === 'DEEP_OCEAN') continue;
        const d = Math.abs(x - rx);
        if (d <= hw + 0.4) { terrain[y][x] = 'RIVER_WATER'; riverTiles.push([x, y]); }
      }
    }
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const t = T(x, y);
        if (t === 'RIVER_WATER' || t === 'SHALLOW_WATER' || t === 'DEEP_OCEAN' || t === 'GRANITE_FLOOR') continue;
        const rx = riverX(y), hw = halfWidth(y);
        const d = Math.abs(x - rx) - hw;
        if (d <= 1.6 && hash2(x, y, seed + 5) < 0.88) terrain[y][x] = 'CLAY_BANK';
        else if (d <= 3.1 && hash2(x, y, seed + 6) < 0.3) terrain[y][x] = 'CLAY_BANK';
      }
    }

    // 3) Objetos de recursos
    const spawn = Config.SPAWN;
    const nearSpawn = (x, y, r) => Math.abs(x - spawn.x) <= r && Math.abs(y - spawn.y) <= r;
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (nearSpawn(x, y, 3)) continue;
        const t = T(x, y);
        const r = hash2(x, y, seed + 11);
        const jf = t === 'JUNGLE_FLOOR' ? 1 : 0.35;
        let o = null;
        if (t === 'JUNGLE_FLOOR' || t === 'GRASS') {
          const treeP = t === 'JUNGLE_FLOOR' ? 0.21 : 0.035 + 0.1 * clamp01((36 - y) / 36) * (x < 40 ? 1 : 0.5);
          if (r < treeP) o = 'TREE_HARDWOOD';
          else if (r < treeP + 0.05) o = 'BUSH_TWIGS';
          else if (r < treeP + 0.05 + 0.011 * (jf + 0.5)) o = 'CITRUS_TREE';
          else if (r < treeP + 0.05 + 0.011 * (jf + 0.5) + 0.012) o = 'HERB_PLANT';
        } else if (t === 'GRANITE_FLOOR') {
          if (r < 0.07) o = 'BOULDER_STONE';
          else if (r < 0.082) o = 'IRON_VEIN';
        } else if (t === 'CLAY_BANK') {
          if (r < 0.16) o = 'CLAY_DEPOSIT';
        } else if (t === 'SAND') {
          if (r < 0.006 && y < shore(x) - 4) o = 'BUSH_TWIGS';
        }
        objects[y][x] = o;
      }
    }

    const free = (x, y) => inB(x, y) && !objects[y][x] && !nearSpawn(x, y, 3) &&
      ['GRASS', 'JUNGLE_FLOOR', 'GRANITE_FLOOR', 'SAND'].includes(T(x, y));
    const count = (id) => { let n = 0; objects.forEach((row) => row.forEach((o) => { if (o === id) n++; })); return n; };

    // 3b) Bosque inicial perto do spawn (acesso imediato a recursos básicos)
    const placeNear = (id, n, x0, x1, y0, y1, terrains) => {
      let placed = 0, tries = 0;
      while (placed < n && tries < 600) {
        tries++;
        const x = x0 + Math.floor(rng() * (x1 - x0 + 1));
        const y = y0 + Math.floor(rng() * (y1 - y0 + 1));
        if (free(x, y) && terrains.includes(T(x, y)) && !(Math.abs(x - spawn.x) < 5 && Math.abs(y - spawn.y) < 5 && T(x, y) === 'SAND')) {
          objects[y][x] = id; placed++;
        }
      }
    };
    placeNear('BOULDER_STONE', 5, 22, 40, 34, 44, ['GRASS', 'SAND']);
    placeNear('BUSH_TWIGS', 7, 22, 40, 34, 44, ['GRASS', 'SAND']);
    placeNear('CITRUS_TREE', 2, 24, 38, 34, 43, ['GRASS']);
    placeNear('HERB_PLANT', 2, 24, 38, 34, 43, ['GRASS']);
    placeNear('TREE_HARDWOOD', 4, 24, 40, 33, 42, ['GRASS']);

    // 3c) Garantias mínimas de recursos
    const ensure = (id, min, terrains, x0, x1, y0, y1) => {
      let tries = 0;
      while (count(id) < min && tries < 5000) {
        tries++;
        const x = x0 + Math.floor(rng() * (x1 - x0 + 1));
        const y = y0 + Math.floor(rng() * (y1 - y0 + 1));
        if (free(x, y) && terrains.includes(T(x, y))) objects[y][x] = id;
      }
    };
    ensure('TREE_HARDWOOD', 80, ['JUNGLE_FLOOR', 'GRASS'], 0, 63, 0, 44);
    ensure('CITRUS_TREE', 10, ['JUNGLE_FLOOR', 'GRASS'], 0, 63, 0, 44);
    ensure('HERB_PLANT', 10, ['JUNGLE_FLOOR', 'GRASS'], 0, 63, 0, 44);
    ensure('BOULDER_STONE', 20, ['GRANITE_FLOOR'], 0, 63, 0, 30);
    ensure('IRON_VEIN', 6, ['GRANITE_FLOOR'], 0, 63, 0, 30);
    ensure('CLAY_DEPOSIT', 6, ['CLAY_BANK'], 30, 60, 0, 60);

    // 4) Destroços do Balão (perto do spawn) e caixas de naufrágio
    const loot = {};
    const wreck = [
      [30, 47, [{ id: 'compass_rusty', qty: 1 }, { id: 'wood_branch', qty: 2 }, { id: 'ration', qty: 2 }, { id: 'clean_water', qty: 2 }]],
      [29, 50, [{ id: 'toolbox_rusty', qty: 1 }, { id: 'ration', qty: 1 }, { id: 'clean_water', qty: 2 }]],
      [35, 47, [{ id: 'ration', qty: 3 }, { id: 'wood_branch', qty: 3 }, { id: 'clean_water', qty: 2 }]],
      [34, 51, [{ id: 'pocket_watch_broken', qty: 1 }, { id: 'ration', qty: 2 }, { id: 'clean_water', qty: 2 }]],
    ];
    wreck.forEach(([x, y, l]) => {
      terrain[y][x] = 'SAND'; objects[y][x] = 'BALLOON_WRECKAGE'; loot[key(x, y)] = l;
    });
    // área livre ao redor do spawn
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const x = spawn.x + dx, y = spawn.y + dy;
      if (!inB(x, y)) continue;
      if (!objects[y][x] || objects[y][x] !== 'BALLOON_WRECKAGE') objects[y][x] = null;
      if (T(x, y) !== 'SAND') terrain[y][x] = 'SAND';
    }
    const crateTable = [
      [{ id: 'ration', qty: 1 }], [{ id: 'ration', qty: 2 }], [{ id: 'compass_rusty', qty: 1 }],
      [{ id: 'toolbox_rusty', qty: 1 }], [{ id: 'wood_branch', qty: 3 }, { id: 'stone', qty: 2 }],
      [{ id: 'iron_scrap', qty: 2 }, { id: 'screw', qty: 2 }], [{ id: 'pocket_watch_broken', qty: 1 }],
      [{ id: 'ration', qty: 1 }, { id: 'resin', qty: 1 }],
    ];
    const crates = [[26, 51], [38, 50], [33, 53], [37, 47]];
    // + caixas aleatórias na faixa de areia
    let guard = 0;
    while (crates.length < 9 && guard++ < 500) {
      const x = 10 + Math.floor(rng() * 40);
      const y = sandStart(x) + 1 + Math.floor(rng() * 7);
      if (T(x, y) === 'SAND' && !objects[y][x] && !nearSpawn(x, y, 3)) crates.push([x, y]);
    }
    crates.forEach(([x, y], i) => {
      if (T(x, y) !== 'SAND' || (objects[y][x] && objects[y][x] !== 'BUSH_TWIGS')) return;
      objects[y][x] = 'WASHED_CRATE';
      loot[key(x, y)] = crateTable[i % crateTable.length].map((o) => ({ id: o.id, qty: o.qty }));
    });

    const blank = () => Array.from({ length: H }, () => new Array(W).fill(null));
    return {
      terrain, objects, loot, regen: {}, uses: {}, fires: {}, dug: {}, seed,
      floors: blank(), roofs: blank(), crops: {}, stations: {}, doorsOpen: {}, mods: {}, ash: {}, drops: {}, sites: {},
    };
  }

  // ---------------- Acesso ao mundo atual ----------------
  const W = () => Ilha.State.data.world;
  const World = {
    generate, mulberry32, hash2, noise, key,

    /** Versão das estruturas: invalida caches (cômodos, irrigação). */
    version: 0,
    bump() { this.version++; },

    inBounds(x, y) { return x >= 0 && y >= 0 && x < Config.MAP_W && y < Config.MAP_H; },
    floorAt(x, y) { return this.inBounds(x, y) ? W().floors[y][x] : null; },
    roofAt(x, y) { return this.inBounds(x, y) ? W().roofs[y][x] : null; },
    setFloor(x, y, id) { if (this.inBounds(x, y)) { W().floors[y][x] = id; this.bump(); } },
    setRoof(x, y, id) { if (this.inBounds(x, y)) { W().roofs[y][x] = id; this.bump(); } },
    /** Altera o terreno (arar, canal) e registra para sobreviver ao save/load. */
    setTerrain(x, y, t) {
      if (!this.inBounds(x, y)) return;
      W().terrain[y][x] = t;
      W().mods[x + ',' + y] = t;
      this.bump();
    },
    /** Reaplica modificações de terreno sobre o terreno regenerado da semente. */
    applyMods(w) {
      Object.keys(w.mods || {}).forEach((k) => { const [x, y] = k.split(',').map(Number); w.terrain[y][x] = w.mods[k]; });
    },
    terrainAt(x, y) { return this.inBounds(x, y) ? W().terrain[y][x] : null; },
    objectAt(x, y) { return this.inBounds(x, y) ? W().objects[y][x] : null; },
    setObject(x, y, id) { if (this.inBounds(x, y)) { W().objects[y][x] = id; this.bump(); } },

    isSolidObject(id) { return !!(id && Config.OBJECTS[id] && Config.OBJECTS[id].solid); },

    isWalkable(x, y) {
      if (!this.inBounds(x, y)) return false;
      const t = Config.TERRAIN[W().terrain[y][x]];
      if (!t.walk) return false;
      return !this.isSolidObject(W().objects[y][x]);
    },

    /** Esgota um recurso: troca pelo objeto esgotado e agenda a regeneração. */
    deplete(x, y, id) {
      const def = Config.OBJECTS[id];
      const w = W();
      w.objects[y][x] = def.depleted || null;
      const jitter = Math.floor(hash2(x, y, Ilha.State.data.time.day) * 3);
      w.regen[key(x, y)] = { day: Ilha.State.data.time.day + (def.regen || 5) + jitter, to: id };
      delete w.uses[key(x, y)];
    },

    /** onDayTick: rebrota de recursos naturais. Retorna quantidade regenerada. */
    regenerate(day) {
      const w = W();
      let n = 0;
      Object.keys(w.regen).forEach((k) => {
        const r = w.regen[k];
        if (r.day > day) return;
        const [x, y] = k.split(',').map(Number);
        const cur = w.objects[y][x];
        const curDef = cur ? Config.OBJECTS[cur] : null;
        if (!cur || (curDef && curDef.inert)) { w.objects[y][x] = r.to; n++; }
        delete w.regen[k];
      });
      Object.keys(w.dug).forEach((k) => { if (w.dug[k] <= day) delete w.dug[k]; });
      return n;
    },

    /** Teste de conectividade (BFS) a partir de (sx,sy). */
    reachable(sx, sy) {
      const seen = new Set([key(sx, sy)]);
      const q = [[sx, sy]];
      while (q.length) {
        const [x, y] = q.shift();
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = x + dx, ny = y + dy;
          const k = key(nx, ny);
          if (!seen.has(k) && this.isWalkable(nx, ny)) { seen.add(k); q.push([nx, ny]); }
        });
      }
      return seen;
    },
  };

  Ilha.World = World;
})();
