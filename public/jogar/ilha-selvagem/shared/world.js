import { makeNoise, fbm, mulberry32, clamp, lerp, smooth } from './noise.js';

export const WATER = 0;      // nível do mar
export const CHUNK = 48;     // tamanho do pedaço de mapa
export const RADIUS = 1500;  // raio da ilha principal (a ilha tem ~3 km de ponta a ponta)

// Biomas. c = cor do chão (hex), m = cor no mapa
export const BIOMES = {
  mar_profundo: { nome: 'Mar profundo', c: 0x2a4a5c, m: 0x0b2a6b, agua: true },
  mar:          { nome: 'Mar',          c: 0xc9b98a, m: 0x1d5fb4, agua: true },
  recife:       { nome: 'Recife de corais', c: 0xe3d3a0, m: 0x27b3c9, agua: true },
  lago:         { nome: 'Lago / rio',   c: 0x7d7a5c, m: 0x3b86d6, agua: true },
  praia:        { nome: 'Praia',        c: 0xf0dfa4, m: 0xf2e3a8 },
  deserto:      { nome: 'Deserto',      c: 0xe3b866, m: 0xe8c273 },
  planicie:     { nome: 'Planície',     c: 0x7cc255, m: 0x8ed063 },
  floresta:     { nome: 'Floresta',     c: 0x3f8f3c, m: 0x2f7d32 },
  selva:        { nome: 'Selva',        c: 0x1f7a34, m: 0x0f6a2a },
  pantano:      { nome: 'Pântano',      c: 0x55663a, m: 0x586b3a },
  taiga:        { nome: 'Taiga',        c: 0x4f7a5a, m: 0x3f6b55 },
  neve:         { nome: 'Tundra gelada', c: 0xe8f0f5, m: 0xe8f0f5 },
  montanha:     { nome: 'Montanha',     c: 0x8a8782, m: 0x8a8782 },
  pico:         { nome: 'Pico nevado',  c: 0xf7fbff, m: 0xffffff },
};
export const BIOME_IDS = Object.keys(BIOMES);

export function createWorld(seed) {
  const N = (k) => makeNoise((seed * 131 + k * 977 + 1) | 0);
  const nC = N(1), nI = N(2), nE = N(3), nH = N(4), nM = N(5), nMM = N(6), nL = N(7), nR = N(8), nW = N(9), nT = N(10);

  function sample(x, z) {
    const d = Math.hypot(x, z) / RADIUS;
    const c = fbm(nC, x / 900, z / 900, 4);
    const mask = 1 - smooth(0.4, 1.0, d + 0.55 * c);
    const isl = smooth(0.35, 0.6, fbm(nI, x / 280, z / 280, 3)) * smooth(0.8, 1.0, d) * 0.55;
    const L = Math.max(mask, isl);
    const raw = L - 0.16;
    let h, mt = 0;
    if (raw < 0) {
      h = -Math.pow(clamp(-raw / 0.16, 0, 1.4), 1.25) * 30;
    } else {
      const baseH = raw < 0.04 ? raw * 30 : 1.2 + 9 * smooth(0.04, 0.7, raw);
      const hills = fbm(nH, x / 170, z / 170, 4) * 5.5 * smooth(0.04, 0.22, raw);
      const mmask = smooth(0.52, 0.8, fbm(nMM, x / 650, z / 650, 3) * 1.6 + 0.5) * smooth(0.12, 0.4, raw);
      const ridge = 1 - Math.abs(fbm(nM, x / 380, z / 380, 4)) * 2.6;
      mt = mmask * Math.pow(clamp(ridge, 0, 1), 1.8);
      h = baseH + hills + mt * 62;
    }
    let lake = false;
    if (raw > 0.03) {
      const ln = fbm(nL, x / 230, z / 230, 3);
      const lf = smooth(0.2, 0.3, ln) * (1 - smooth(10, 16, h));
      if (lf > 0) { h = lerp(h, -3.6, lf); if (lf > 0.5) lake = true; }
      const rv = Math.abs(fbm(nR, x / 700, z / 700, 3));
      const rf = (1 - smooth(0.0, 0.012, rv)) * (1 - smooth(8, 20, h));
      if (rf > 0) { h = lerp(h, -2.8, rf); if (rf > 0.5) lake = true; }
    }
    const moist = clamp(fbm(nW, x / 800, z / 800, 3) * 1.7 + 0.52, 0, 1);
    let temp = fbm(nT, x / 1100, z / 1100, 3) * 1.7 + 0.6 + (-z / RADIUS) * 0.15;
    temp -= Math.max(0, h - 14) / 90;
    let b;
    if (h < WATER) {
      if (lake || raw > 0.02 && h > -6 && d < 0.8 && raw > 0.05) b = 'lago';
      else if (h < -16) b = 'mar_profundo';
      else if (h > -9 && h < -0.8 && temp > 0.5 && fbm(nW, x / 90, z / 90, 2) > -0.1) b = 'recife';
      else b = 'mar';
    } else if (h < 1.25) b = 'praia';
    else if (h > 40) b = 'pico';
    else if (h > 24) b = temp < 0.42 ? 'pico' : 'montanha';
    else if (temp < 0.33) b = moist > 0.45 ? 'taiga' : 'neve';
    else if (temp > 0.62 && moist < 0.4) b = 'deserto';
    else if (temp > 0.58 && moist > 0.58) b = 'selva';
    else if (moist > 0.62 && h < 7) b = 'pantano';
    else if (moist > 0.5) b = 'floresta';
    else b = 'planicie';
    return { h, b, raw, moist, temp };
  }
  const heightAt = (x, z) => sample(x, z).h;

  // ponto de nascimento: uma praia da ilha principal
  let spawn = null;
  function findSpawn() {
    if (spawn) return spawn;
    for (let r = 300; r < 1700 && !spawn; r += 25) {
      for (let a = 0; a < 360; a += 7) {
        const x = Math.cos(a * Math.PI / 180) * r, z = Math.sin(a * Math.PI / 180) * r;
        const s = sample(x, z);
        if (s.b === 'praia' && s.h > 0.6 && sample(x * 0.99, z * 0.99).b !== 'lago') { spawn = { x, z }; break; }
      }
    }
    if (!spawn) spawn = { x: 0, z: 0 };
    spawn.y = Math.max(heightAt(spawn.x, spawn.z), 0.3);
    return spawn;
  }

  // ---- objetos (árvores, pedras...) gerados por pedaço, deterministicamente ----
  const TABLE = {
    praia:    [['tree', 'palma', 0.07], ['rock', 'praia', 0.02], ['grass', 'capim', 0.1]],
    planicie: [['tree', 'carvalho', 0.05], ['grass', 'capim', 0.3], ['rock', 'cinza', 0.03], ['decor', 'flor', 0.25]],
    floresta: [['tree', 'carvalho', 0.38], ['tree', 'pinheiro', 0.08], ['grass', 'capim', 0.14], ['rock', 'cinza', 0.03], ['decor', 'flor', 0.04]],
    selva:    [['tree', 'selva', 0.55], ['grass', 'capim', 0.14], ['decor', 'flor', 0.06]],
    pantano:  [['tree', 'pantano', 0.2], ['grass', 'junco', 0.35], ['rock', 'cinza', 0.02]],
    deserto:  [['decor', 'cacto', 0.07], ['rock', 'areia', 0.06], ['grass', 'seco', 0.04], ['tree', 'seca', 0.02]],
    taiga:    [['tree', 'pinheiro', 0.5], ['rock', 'cinza', 0.05]],
    neve:     [['tree', 'pinheiro_neve', 0.07], ['rock', 'gelo', 0.08]],
    montanha: [['rock', 'cinza', 0.11], ['tree', 'pinheiro', 0.03]],
    pico:     [['rock', 'gelo', 0.08]],
    recife:   [['decor', 'coral', 0.4]],
    mar:      [['decor', 'alga', 0.07]],
    lago:     [['decor', 'alga', 0.05]],
  };
  const RES = { tree: ['madeira', 3, 5, 4], rock: ['pedra', 2, 4, 5], grass: ['palha', 1, 2, 1] }; // recurso, min, max, golpes
  const cache = new Map();
  const CELL = 6;
  function chunkObjects(cx, cz) {
    const key = cx + ',' + cz;
    let list = cache.get(key);
    if (list) return list;
    const rnd = mulberry32((seed * 7919 + cx * 73856093 + cz * 19349663) | 0);
    list = [];
    const n = CHUNK / CELL;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = cx * CHUNK + (i + 0.15 + rnd() * 0.7) * CELL;
      const z = cz * CHUNK + (j + 0.15 + rnd() * 0.7) * CELL;
      const s = sample(x, z);
      const tab = TABLE[s.b];
      const roll = rnd(); const rs = 0.6 + rnd() * 0.8; const ry = rnd() * Math.PI * 2; const vv = Math.floor(rnd() * 3);
      if (!tab) continue;
      let acc = 0;
      for (const [t, v, p] of tab) {
        acc += p;
        if (roll < acc) {
          if (s.h > 6 && v === 'flor' && roll > 0.1) break;
          list.push({ id: `${cx},${cz},${i * n + j}`, t, v, vv, x, z, y: s.h, s: rs * (t === 'rock' && s.b === 'montanha' ? 1.8 : 1), ry, res: RES[t] || null });
          break;
        }
      }
    }
    cache.set(key, list);
    if (cache.size > 6000) cache.clear();
    return list;
  }
  function findObject(id) {
    const [cx, cz] = id.split(',').map(Number);
    if (!Number.isFinite(cx) || !Number.isFinite(cz)) return null;
    return chunkObjects(cx, cz).find((o) => o.id === id) || null;
  }
  return { seed, sample, heightAt, chunkObjects, findObject, findSpawn };
}
