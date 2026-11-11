/* =====================================================================
 * sprites.js — SpriteEngine (isométrico, 100% procedural)
 *  - Terreno: losangos 64x32 texturizados por ruído, bordas e espuma
 *  - Objetos e Cyrus: sprites pré-renderizados pelo VoxelEngine
 *  - Ícones de item: matrizes 16x16 + paleta de 32 cores (UI)
 * Nenhum arquivo de imagem externo.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const TW = Config.ISO_TW, TH = Config.ISO_TH;

  // ---------------------------------------------------------------
  // Paleta de 32 cores (ícones de item). Chave = 1 caractere ('.' = transparente)
  // ---------------------------------------------------------------
  const PALETTE = {
    '0': '#0d0a08', // contorno / carvão
    '1': '#2b1d14', // marrom escuro (sombra, couro)
    '2': '#5a3a22', // madeira escura
    '3': '#8b5a2b', // madeira clara
    '4': '#c9a66b', // areia média
    '5': '#e6d3a3', // areia clara
    '6': '#b8935a', // areia escura
    '7': '#1b3a5c', // oceano profundo (escuro)
    '8': '#235a8c', // oceano profundo
    '9': '#3d8fc4', // água rasa
    'a': '#8fd0e8', // espuma / brilho de água
    'b': '#2f7f8f', // água doce de rio
    'c': '#6fc0c0', // brilho de rio
    'd': '#2d6a2f', // grama escura
    'e': '#4a9a3c', // grama média
    'f': '#7bc450', // grama clara
    'g': '#1d4a26', // floresta densa escura
    'h': '#2e6b3a', // floresta densa média
    'i': '#5a5a5e', // granito escuro
    'j': '#85858a', // granito médio
    'k': '#b4b4b8', // granito claro
    'l': '#a8643c', // argila
    'm': '#7a4527', // argila escura
    'n': '#9c4a2e', // ferro / ferrugem
    'o': '#d4a82a', // latão
    'p': '#b8602a', // cobre
    'q': '#f2e8c8', // linho / papel
    'r': '#e8441c', // fogo vermelho
    's': '#f58a1f', // fogo laranja
    't': '#ffd84a', // fogo amarelo
    'u': '#e8b894', // pele
    'v': '#2a3a6a', // casaco vitoriano
  };


  // ---------------------------------------------------------------
  // Terreno procedural
  // ---------------------------------------------------------------
  function hash2(x, y, s) {
    let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 2147483647)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  const sm = (t) => t * t * (3 - 2 * t);
  function vnoise(x, y, s) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
    const u = sm(xf), v = sm(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  const fbm = (x, y, s) => vnoise(x, y, s) * 0.58 + vnoise(x * 2.1, y * 2.1, s + 1) * 0.28 + vnoise(x * 4.3, y * 4.3, s + 2) * 0.14;
  const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const scale = (c, f) => [c[0] * f, c[1] * f, c[2] * f];
  const add = (c, d) => [c[0] + d, c[1] + d, c[2] + d];

  // Cada função recebe (px, py, v, frame) e devolve [r,g,b]
  const TERRAIN_FN = {
    SAND(px, py, v) {
      const o = v * 41;
      const n = fbm((px + o) * 0.05, (py + o) * 0.1, 11);
      let c = mixc([184, 158, 108], [214, 190, 136], n);
      c = add(c, (hash2(px, py, v + 3) - 0.5) * 14 + Math.sin(px * 0.22 + py * 0.85 + n * 7) * 4);
      const h = hash2(px, py, v + 9);
      if (h > 0.986) c = [146, 122, 86]; else if (h < 0.008) c = [236, 220, 176];
      return c;
    },
    GRASS(px, py, v) {
      const o = v * 37;
      const n = vnoise((px + o) * 0.55, (py + o) * 0.16, 21);
      const blot = fbm((px + o) * 0.04, (py + o) * 0.08, 23);
      let c = mixc([62, 94, 42], [114, 148, 68], n * 0.7 + blot * 0.3);
      const h = hash2(px, py, v + 5);
      if (h > 0.972) c = [150, 182, 88]; else if (h < 0.035) c = [44, 70, 32];
      return add(c, (hash2(px, py, v + 1) - 0.5) * 8);
    },
    JUNGLE_FLOOR(px, py, v) {
      const o = v * 29;
      const n = fbm((px + o) * 0.07, (py + o) * 0.14, 31);
      let c = mixc([36, 62, 36], [70, 98, 50], n);
      const h = hash2(px, py, v + 4);
      if (h > 0.93) c = [98, 74, 46]; else if (h < 0.05) c = [26, 44, 26]; else if (h > 0.9) c = [92, 122, 62];
      return add(c, (hash2(px, py, v + 2) - 0.5) * 8);
    },
    GRANITE_FLOOR(px, py, v) {
      const o = v * 53;
      const n = fbm((px + o) * 0.07, (py + o) * 0.14, 41);
      let c = mixc([102, 100, 96], [150, 148, 142], n);
      const crack = Math.abs(vnoise((px + o) * 0.09, (py + o) * 0.18, 45) - 0.5);
      if (crack < 0.016) c = [66, 64, 62];
      else if (crack < 0.03) c = scale(c, 0.9);
      return add(c, (hash2(px, py, v + 6) - 0.5) * 16);
    },
    CLAY_BANK(px, py, v) {
      const o = v * 43;
      const n = fbm((px + o) * 0.06, (py + o) * 0.12, 51);
      let c = mixc([138, 92, 62], [176, 126, 88], n);
      if (fbm((px + o) * 0.035, (py + o) * 0.07, 53) > 0.6) c = scale(c, 0.82);
      const crack = Math.abs(vnoise((px + o) * 0.12, (py + o) * 0.24, 55) - 0.5);
      if (crack < 0.015) c = [100, 62, 40];
      return add(c, (hash2(px, py, v + 7) - 0.5) * 12);
    },
    RIVER_WATER(px, py, v, f) {
      const o = v * 31;
      const n = fbm((px + o) * 0.06, (py + o) * 0.16, 61);
      const w = 0.5 + 0.5 * Math.sin((f * Math.PI) / 2 + n * 12.566);
      let c = mixc([52, 100, 108], [68, 120, 126], n);
      if (w > 0.93) c = mixc(c, [150, 196, 192], 0.55); else if (w < 0.06) c = scale(c, 0.88);
      if (hash2(px, py, v + f * 3) > 0.996) c = [210, 234, 228];
      return c;
    },
    SHALLOW_WATER(px, py, v, f) {
      const o = v * 33;
      const n = fbm((px + o) * 0.05, (py + o) * 0.12, 71);
      const w = 0.5 + 0.5 * Math.sin((f * Math.PI) / 2 + n * 12.566 + px * 0.05);
      let c = mixc([64, 134, 156], [108, 178, 188], n);
      if (fbm((px + o) * 0.04, (py + o) * 0.09, 73) > 0.58) c = mixc(c, [186, 172, 130], 0.38);
      if (w > 0.88) c = mixc(c, [214, 238, 236], 0.6);
      if (hash2(px, py, v + f * 5) > 0.994) c = [240, 250, 246];
      return c;
    },
    DEEP_OCEAN(px, py, v, f) {
      const o = v * 35;
      const n = fbm((px + o) * 0.05, (py + o) * 0.11, 81);
      const w = 0.5 + 0.5 * Math.sin((f * Math.PI) / 2 + n * 14 + py * 0.15);
      let c = mixc([20, 48, 84], [34, 70, 110], n);
      if (w > 0.9) c = mixc(c, [74, 114, 156], 0.55); else if (w < 0.1) c = scale(c, 0.82);
      return c;
    },
  };
  TERRAIN_FN.TILLED_SOIL = function (px, py, v) {
    const o = v * 47;
    const n = fbm((px + o) * 0.08, (py + o) * 0.16, 91);
    let c = mixc([84, 58, 38], [118, 84, 56], n);
    // sulcos paralelos ao eixo x do grid (diagonais na tela)
    const gx = (py + 0.5 - 16) / 32 + (px + 0.5 - 32) / 64;
    const furrow = Math.sin(gx * 38);
    if (furrow > 0.55) c = scale(c, 0.74); else if (furrow < -0.7) c = scale(c, 1.14);
    if (hash2(px, py, v + 8) > 0.97) c = [138, 104, 72];
    return add(c, (hash2(px, py, v + 5) - 0.5) * 9);
  };
  TERRAIN_FN.IRRIGATION_CANAL = function (px, py, v, f) {
    const o = v * 33;
    const n = fbm((px + o) * 0.06, (py + o) * 0.16, 101);
    const w = 0.5 + 0.5 * Math.sin((f * Math.PI) / 2 + n * 12.566);
    let c = mixc([46, 90, 98], [66, 118, 124], n);
    if (w > 0.9) c = mixc(c, [150, 196, 192], 0.5);
    // margem de terra escura nas bordas do losango
    const sx = Math.abs(px + 0.5 - 32) / 32, sy = Math.abs(py + 0.5 - 16) / 16;
    if (sx + sy > 0.84) c = mixc(c, [78, 54, 36], 0.75);
    return c;
  };

  // Pisos (losango sobre o terreno)
  const FLOOR_FN = {
    FLOOR_WOOD(px, py, v) {
      const gx = (py + 0.5 - 16) / 32 + (px + 0.5 - 32) / 64;
      const board = Math.floor((gx + 0.5) * 6);
      const seam = Math.abs(((gx + 0.5) * 6) % 1 - 0.0) < 0.07;
      let c = mixc([156, 112, 64], [182, 138, 82], hash2(board, v, 7));
      if (seam) c = [92, 62, 36];
      if (hash2(px, py, v + 1) > 0.97) c = [124, 86, 48];
      return add(c, (hash2(px, py, v + 2) - 0.5) * 10);
    },
    FLOOR_STONE(px, py, v) {
      const gx = (py + 0.5 - 16) / 32 + (px + 0.5 - 32) / 64, gy = (py + 0.5 - 16) / 32 - (px + 0.5 - 32) / 64;
      const bx = Math.floor((gx + 0.5) * 3), by = Math.floor((gy + 0.5) * 3);
      const fx = ((gx + 0.5) * 3) % 1, fy = ((gy + 0.5) * 3) % 1;
      let c = mixc([112, 110, 106], [154, 152, 146], hash2(bx, by, v + 3));
      if (fx < 0.06 || fy < 0.06) c = [72, 70, 68];
      return add(c, (hash2(px, py, v + 4) - 0.5) * 10);
    },
    FLOOR_BRICK(px, py, v) {
      const gx = (py + 0.5 - 16) / 32 + (px + 0.5 - 32) / 64, gy = (py + 0.5 - 16) / 32 - (px + 0.5 - 32) / 64;
      const row = Math.floor((gy + 0.5) * 8), off = (row & 1) * 0.5;
      const bx = (((gx + 0.5) * 4) + off);
      const fx = bx % 1, fy = ((gy + 0.5) * 8) % 1;
      let c = hash2(Math.floor(bx), row, v + 5) > 0.5 ? [160, 80, 56] : [134, 64, 46];
      if (fx < 0.08 || fy < 0.12) c = [184, 170, 144];
      return add(c, (hash2(px, py, v + 6) - 0.5) * 10);
    },
  };

  const WATER = { DEEP_OCEAN: 1, SHALLOW_WATER: 1, RIVER_WATER: 1, IRRIGATION_CANAL: 1 };
  // prioridade de sobreposição de bordas (quem tem prioridade maior "invade" o vizinho)
  const PRI = { DEEP_OCEAN: 0, SHALLOW_WATER: 1, RIVER_WATER: 1, IRRIGATION_CANAL: 1, SAND: 2, CLAY_BANK: 3, TILLED_SOIL: 3.5, GRASS: 4, JUNGLE_FLOOR: 5, GRANITE_FLOOR: 6 };
  const NEIGH = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // arestas: 0:-x 1:+x 2:-y 3:+y

  function newCanvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

  /** Gera um losango 64x32 a partir de fn(px,py,gx,gy). Retorna também o ImageData cru. */
  function genDiamond(fn) {
    const c = newCanvas(TW, TH); const g = c.getContext('2d');
    const img = g.createImageData(TW, TH); const d = img.data;
    for (let py = 0; py < TH; py++) {
      for (let px = 0; px < TW; px++) {
        const sx = px + 0.5 - TW / 2, sy = py + 0.5 - TH / 2;
        if (Math.abs(sx) / (TW / 2) + Math.abs(sy) / (TH / 2) >= 1) continue;
        const gx = sy / TH + sx / TW, gy = sy / TH - sx / TW;
        const col = fn(px, py, gx, gy);
        const i = (py * TW + px) * 4;
        d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = col[3] === undefined ? 255 : col[3];
      }
    }
    g.putImageData(img, 0, 0);
    return c;
  }

  /** Sobreposição de borda: textura do terreno T esmaecida junto da aresta e. */
  function genEdge(tex, e) {
    const c = newCanvas(TW, TH); const g = c.getContext('2d');
    g.drawImage(tex, 0, 0);
    const img = g.getImageData(0, 0, TW, TH); const d = img.data;
    for (let py = 0; py < TH; py++) {
      for (let px = 0; px < TW; px++) {
        const i = (py * TW + px) * 4;
        if (!d[i + 3]) continue;
        const sx = px + 0.5 - TW / 2, sy = py + 0.5 - TH / 2;
        const gx = sy / TH + sx / TW, gy = sy / TH - sx / TW;
        const dist = e === 0 ? gx + 0.5 : e === 1 ? 0.5 - gx : e === 2 ? gy + 0.5 : 0.5 - gy;
        const a = (0.34 - dist) / 0.34 + (hash2(px, py, 91 + e) - 0.5) * 0.55;
        d[i + 3] = a <= 0 ? 0 : Math.min(255, Math.round(a * 330));
      }
    }
    g.putImageData(img, 0, 0);
    return c;
  }

  /** Espuma da arrebentação na aresta e (para água rasa vizinha de terra). */
  function genFoam(e, frame) {
    return genDiamond((px, py, gx, gy) => {
      const dist = e === 0 ? gx + 0.5 : e === 1 ? 0.5 - gx : e === 2 ? gy + 0.5 : 0.5 - gy;
      const band = 0.16 + 0.05 * Math.sin(frame * Math.PI / 2 + (px + py) * 0.3);
      const k = Math.abs(dist - band);
      const n = hash2(px, py, 120 + e + frame * 7);
      const a = k < 0.045 && n > 0.25 ? 190 : 0;
      return [238, 244, 238, a];
    });
  }
  const IC = {};

  IC.twigs = [
    '................',
    '..........2.....',
    '.....2...23.....',
    '..3...2.32......',
    '...3..23.2..3...',
    '....3.2.32.3....',
    '..2..32.2.3..2..',
    '...23.2.32.32...',
    '....232.2323....',
    '.....3223232....',
    '......23223.....',
    '.....e2.32e.....',
    '......2ee2......',
    '................',
    '................',
    '................',
  ];
  IC.stone = [
    '................',
    '................',
    '................',
    '................',
    '.....0000.......',
    '....0kkjj0......',
    '...0kkjjjj0.....',
    '..0kjjjjijj0....',
    '..0jjjjjiijj00..',
    '..0jjjjiiijjkj0.',
    '...0jjiiiijjjj0.',
    '....00iiiiijj0..',
    '......0000000...',
    '................',
    '................',
    '................',
  ];
  IC.log = [
    '................',
    '................',
    '................',
    '................',
    '...00000000000..',
    '..0333333333320.',
    '.03333333333320.',
    '.0q5q3333333320.',
    '.0q3q3322333320.',
    '.0q5q3333333320.',
    '..0q33333333220.',
    '...00222222220..',
    '.....000000000..',
    '................',
    '................',
    '................',
  ];
  IC.clay = [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....000000.....',
    '...00llllll00...',
    '..0lllmlllllm0..',
    '.0llml3lllllll0.',
    '.0lllllllmllll0.',
    '..0mllllllllm0..',
    '...00mmmmmm00...',
    '.....000000.....',
    '................',
    '................',
    '................',
  ];
  IC.citrus = [
    '................',
    '................',
    '.........ff.....',
    '........fed.....',
    '......00000.....',
    '....00sssssss0..',
    '...0ssttssssss0.',
    '..0sstttsssrsss0',
    '..0sstssssssrss0',
    '..0ssssssssssrs0',
    '..0sssssssssrrs0',
    '...0ssssssssrs0.',
    '....00ssssss00..',
    '......000000....',
    '................',
    '................',
  ];
  IC.root = [
    '................',
    '................',
    '.....f..f.......',
    '....fef.ef......',
    '.....d.d........',
    '....0ddd0.......',
    '...03333330.....',
    '..0333q33330....',
    '..03333333330...',
    '...0333333330...',
    '....03333320....',
    '.....0222200....',
    '......00200.....',
    '.......020......',
    '........0.......',
    '................',
  ];
  IC.herb = [
    '................',
    '................',
    '.......f........',
    '...f...f..f.....',
    '..fef.fef.fe....',
    '..fedfefdfed.q..',
    '...ededede.qrq..',
    '....dedede..q...',
    '.....dedd.......',
    '.....ded........',
    '......d.........',
    '......d.........',
    '.....0d0........',
    '................',
    '................',
    '................',
  ];
  IC.resin = [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.....0000.......',
    '....0ootto0.....',
    '...0otttttoo0...',
    '...0ottsttto0...',
    '...0osttttso0...',
    '....0ooooso0....',
    '.....000000.....',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.sand = [
    '................',
    '................',
    '................',
    '................',
    '................',
    '.......00.......',
    '.....005500.....',
    '....05555540....',
    '...0555545540...',
    '..055454555540..',
    '.04555555454540.',
    '.06666666666660.',
    '..00000000000...',
    '................',
    '................',
    '................',
  ];
  IC.charcoal = [
    '................',
    '................',
    '................',
    '................',
    '.....000........',
    '....0i0j00......',
    '...0iii0j00.....',
    '..00ij0000i0....',
    '.0ij0i00ij0.....',
    '.00ii0ij00i0....',
    '..00000000000...',
    '................',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.raw_fish = [
    '................',
    '................',
    '................',
    '................',
    '.....0000.......',
    '...00kkkkk0..0..',
    '..0kkjkkkkk00k0.',
    '.0kk0kjjjkkkkk0.',
    '.0kkkkkjjkkkk0..',
    '..0kqqqqqkk00k0.',
    '...00qqqq00..0..',
    '.....0000.......',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.bottle = [
    '................',
    '......000.......',
    '......020.......',
    '......0q0.......',
    '.....0qqq0......',
    '.....0qbq0......',
    '....0qbbbq0.....',
    '....0qbbbq0.....',
    '....0qbbbq0.....',
    '....0qbbbq0.....',
    '....0qbbbq0.....',
    '.....0qqq0......',
    '......000.......',
    '................',
    '................',
    '................',
  ];
  IC.cup = [
    '................',
    '................',
    '....a..a........',
    '.....a..a.......',
    '................',
    '..00000000......',
    '..0qqqqqq000....',
    '..0qsssssq0q0...',
    '..0qsssssq0q0...',
    '..0qqqqqq00q0...',
    '...0qqqqq0q0....',
    '....000000......',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.ration = [
    '................',
    '................',
    '................',
    '..0000000000....',
    '.0oooooooooo0...',
    '.0o00000000o0...',
    '.0orrrrqqrro0...',
    '.0orqqqqqqro0...',
    '.0orrrrrrrro0...',
    '.0o00000000o0...',
    '.0oooooooooo0...',
    '..0000000000....',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.watch = [
    '................',
    '.......00.......',
    '......0oo0......',
    '.......00.......',
    '.....000000.....',
    '....0oooooo0....',
    '...0oqqqqqqo0...',
    '...0oq0qq0qo0...',
    '...0oqq0q0qo0...',
    '...0oq0000qo0...',
    '...0oqqqqqqo0...',
    '....0oooooo0....',
    '.....000000.....',
    '................',
    '................',
    '................',
  ];
  IC.compass = [
    '................',
    '................',
    '.....000000.....',
    '....0oooooo0....',
    '...0oqqrqqqo0...',
    '...0oqqrqqqo0...',
    '...0oqq0qqqo0...',
    '...0oqqjqqqo0...',
    '...0oqqjqqqo0...',
    '...0oqqqqqqo0...',
    '....0oooooo0....',
    '.....000000.....',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.toolbox = [
    '................',
    '................',
    '.......0000.....',
    '......0n00n0....',
    '..00000000000...',
    '.0nnnnnnnnnnn0..',
    '.0nnpnnnnnnpn0..',
    '.0nnnnnooonnn0..',
    '.00000000000000.',
    '.0nnnnnnnnnnnn0.',
    '.0npnnnnnnnnpn0.',
    '.0nnnnnnnnnnnn0.',
    '..000000000000..',
    '................',
    '................',
    '................',
  ];
  IC.gear = [
    '................',
    '.......00.......',
    '....0.0oo0.0....',
    '...0o00oo00o0...',
    '....0oooooo0....',
    '..00oo0..0oo00..',
    '..0oo0....0oo0..',
    '..0oo0....0oo0..',
    '..00oo0..0oo00..',
    '....0oooooo0....',
    '...0o00oo00o0...',
    '....0.0oo0.0....',
    '.......00.......',
    '................',
    '................',
    '................',
  ];
  IC.spring = [
    '................',
    '................',
    '...000000000....',
    '..0kkkkkkkkk0...',
    '...000000000....',
    '..0jjjjjjjjj0...',
    '...000000000....',
    '..0kkkkkkkkk0...',
    '...000000000....',
    '..0jjjjjjjjj0...',
    '...000000000....',
    '................',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.lens = [
    '................',
    '................',
    '.....000000.....',
    '....0aaaaaa0....',
    '...0aqqaaaaa0...',
    '...0aqaaaaaa0...',
    '...0aaaaaaaa0...',
    '...0aaaaaaaa0...',
    '...0aaaaaaaa0...',
    '....0aaaaaa0....',
    '.....000000.....',
    '................',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.needle = [
    '................',
    '................',
    '................',
    '..............0.',
    '.............0r0',
    '............0r0.',
    '...........0r0..',
    '..........0r0...',
    '.........0j0....',
    '........0j0.....',
    '.......0j0......',
    '......0j0.......',
    '.....0k0........',
    '....0k0.........',
    '................',
    '................',
  ];
  IC.brass_case = [
    '................',
    '................',
    '................',
    '....00000000....',
    '...0oooooooo0...',
    '..0ottttttttoo0.',
    '..0oo00000000o0.',
    '..0oo0oooooo0o0.',
    '..0oo0oooooo0o0.',
    '..0oo00000000o0.',
    '...0oooooooooo0.',
    '....0000000000..',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.iron_scrap = [
    '................',
    '................',
    '................',
    '.....0000.......',
    '....0jkkj0......',
    '...0jkjjjj00....',
    '..0jjjnjjjij0...',
    '..0ijnnnjjiij0..',
    '...0iinnijiij0..',
    '....00iiiiii0...',
    '......00000.....',
    '................',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.screw = [
    '................',
    '................',
    '..........00....',
    '.........0kk0...',
    '........0k00k0..',
    '.......0j0..0...',
    '......0j0.......',
    '.....0j0j.......',
    '....0j0j0.......',
    '...0j0j0........',
    '..0j0j0.........',
    '...00...........',
    '................',
    '................',
    '................',
    '................',
  ];
  IC.steel_blade = [
    '................',
    '................',
    '..............0.',
    '.............0k0',
    '............0kk0',
    '...........0kk0.',
    '..........0kj0..',
    '.........0kj0...',
    '........0kj0....',
    '.......0kj0.....',
    '......0kj0......',
    '...000kj0.......',
    '..02320.........',
    '..0220..........',
    '...00...........',
    '................',
  ];
  IC.stone_axe = [
    '................',
    '................',
    '.......0000.....',
    '......0kkjj0....',
    '.....0kkjjij0...',
    '....0kkjjij0230.',
    '....0kjjij03330.',
    '.....0jjj02330..',
    '......00.023.0..',
    '........023.....',
    '.......0233.....',
    '......0233......',
    '.....0233.......',
    '....0233........',
    '....000.........',
    '................',
  ];
  IC.wood_spear = [
    '................',
    '...............0',
    '..............0k',
    '.............0kj',
    '............03j0',
    '...........032..',
    '..........032...',
    '.........032....',
    '........032.....',
    '.......032......',
    '......032.......',
    '.....032........',
    '....032.........',
    '...032..........',
    '..00............',
    '................',
  ];
  IC.resin_torch = [
    '................',
    '.......t........',
    '......tst.......',
    '.....tsrst......',
    '.....srrrs......',
    '......srs.......',
    '.....0ooo0......',
    '......023.......',
    '......023.......',
    '......023.......',
    '......023.......',
    '......023.......',
    '......023.......',
    '.......00.......',
    '................',
    '................',
  ];


  // ---------------------------------------------------------------
  // Utilidades de matriz de ícones
  // ---------------------------------------------------------------
  const swapChars = (rows, map) => rows.map((r) => r.split('').map((c) => map[c] || c).join(''));
  function rasterize(rows) {
    const c = newCanvas(16, 16); const ctx = c.getContext('2d');
    for (let y = 0; y < 16; y++) {
      const row = rows[y] || '';
      for (let x = 0; x < 16; x++) {
        const ch = row[x];
        if (!ch || ch === '.') continue;
        const col = PALETTE[ch]; if (!col) continue;
        ctx.fillStyle = col; ctx.fillRect(x, y, 1, 1);
      }
    }
    return c;
  }
  const ICON_VARIANTS = {
    fiber: ['twigs', { '2': '4', '3': '5', e: 'f' }],
    ash: ['sand', { '4': 'j', '5': 'k', '6': 'i' }],
    iron_ore: ['stone', { k: 'p', j: 'n', i: 'm' }],
    copper_ore: ['stone', { k: 's', j: 'p', i: 'n' }],
    sulfur: ['stone', { k: 't', j: 'o', i: '6' }],
    iron_gear: ['gear', { o: 'k' }],
    iron_axe: ['stone_axe', { k: 'q', j: 'k', i: 'j' }],
    steel_axe: ['stone_axe', { k: 'a', j: 'k', i: 'j' }],
    salted_fish: ['raw_fish', { k: 'q', j: '6', a: '5' }],
    fish_oil: ['bottle', { b: 's' }],
    sulfuric_acid: ['bottle', { b: 'f' }],
    quinine: ['bottle', { b: 'r' }],
    nitro: ['bottle', { b: 't' }],
    water_dirty: ['bottle', { b: 'l' }],
    water_boiled: ['bottle', { b: 'a' }],
    water_clean: ['bottle', { b: 'c' }],
    cooked_fish: ['raw_fish', { k: 's', j: '3', q: 't', a: 's' }],
    herb_tea: ['cup', {}],
  };


  // Ícones desenhados por código (itens da Sprint 2)
  const ICON_DRAW = (() => {
    const R = (g, c, x, y, w, h) => { g.fillStyle = c; g.fillRect(x, y, w || 1, h || 1); };
    const OL = '#1b130d';
    const box = (g, x, y, w, h, fill, hi) => { R(g, OL, x, y, w, h); R(g, fill, x + 1, y + 1, w - 2, h - 2); if (hi) R(g, hi, x + 1, y + 1, w - 2, 1); };
    const handle = (g, x0, y0, x1, y1) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let i = 0; i <= n; i++) { const x = Math.round(x0 + (x1 - x0) * i / n), y = Math.round(y0 + (y1 - y0) * i / n); R(g, OL, x - 1, y, 3, 1); R(g, '#8b5a2b', x, y); } };
    const ingot = (g, base, top) => { R(g, OL, 2, 7, 12, 6); R(g, base, 3, 8, 10, 4); R(g, OL, 4, 4, 8, 4); R(g, top, 5, 5, 6, 3); R(g, '#ffffff55', 5, 5, 6, 1); };
    const seed = (g, c1, c2) => { box(g, 3, 5, 10, 9, '#d8c48c'); R(g, OL, 5, 3, 6, 3); R(g, '#c9a66b', 6, 4, 4, 1); R(g, c1, 5, 8, 2, 2); R(g, c2, 8, 7, 2, 2); R(g, c1, 10, 10, 2, 2); R(g, c2, 6, 11, 2, 1); };
    const tool = (g, head) => { handle(g, 3, 13, 11, 5); head(g); };
    // Ícones do HUD (as 4 barras): arte em texto, 1 caractere = 1 pixel
    const PAL = { X: OL, r: '#d8483a', h: '#ffd0c8', b: '#c8742c', w: '#f1e6cc', c: '#4da3d8', g: '#8ee06a' };
    const art = (g, rows, pal) => rows.forEach((row, y) => { for (let x = 0; x < row.length; x++) { const c = pal[row[x]]; if (c) R(g, c, x, y); } });
    return {
      hud_hp: (g) => art(g, ["................", "................", "...XXX...XXX....", "..XrrrX.XrrrX...", ".XrhrrrXrrrrrX..", ".XrhrrrrrrrrrX..", ".XrrrrrrrrrrrX..", "..XrrrrrrrrrX...", "...XrrrrrrrX....", "....XrrrrrX.....", ".....XrrrX......", "......XrX.......", ".......X........", "................"], PAL),
      hud_food: (g) => art(g, ["................", "......XXXX......", ".....XbbbbX.....", "....XbbbbbbX....", "....XbhbbbbX....", "....XbbbbbbX....", ".....XbbbbX.....", "......XbbX......", ".......XwX......", ".......XwX......", "......XwwwX.....", "......XwXwX.....", ".......X.X......", "................"], PAL),
      hud_water: (g) => art(g, ["................", ".......X........", "......XcX.......", "......XcX.......", ".....XcccX......", ".....XcccX......", "....XchcccX.....", "....XchcccX.....", "...XchcccccX....", "...XcccccccX....", "...XcccccccX....", "....XcccccX.....", ".....XXXXX......", "................"], PAL),
      hud_breath: (g) => art(g, ["................", "........ggg.....", ".......g...g....", "...........g....", ".ggggggggggg....", ".gggggggggg.....", "................", "..gggggggggggg..", "..ggggggggggggg.", "..............g.", ".............g..", ".ggggggg........", ".gggggggg.......", "........g.......", ".......g........", "................"], PAL),
      plank: (g) => { box(g, 1, 3, 13, 3, '#c9a66b', '#e6d3a3'); box(g, 2, 7, 13, 3, '#b8935a', '#d8c08a'); box(g, 1, 11, 13, 3, '#c9a66b', '#e6d3a3'); },
      refractory_brick: (g) => { box(g, 1, 4, 10, 6, '#a85a38', '#c87a52'); box(g, 5, 9, 10, 6, '#944c30', '#b86a48'); R(g, '#d8c8a0', 6, 6, 3, 1); },
      roof_tile: (g) => { box(g, 2, 4, 12, 9, '#b0583a', '#d07852'); for (let i = 0; i < 4; i++) R(g, '#7a3c28', 4 + i * 3, 5, 1, 7); },
      glass: (g) => { box(g, 2, 2, 12, 12, '#8fd0e8', '#c0ecf8'); R(g, '#ffffff', 4, 4, 2, 1); R(g, '#ffffff', 5, 5, 2, 1); R(g, '#ffffff', 4, 6, 1, 3); },
      iron_ingot: (g) => ingot(g, '#5a5a5e', '#9a9aa0'),
      steel_ingot: (g) => ingot(g, '#4a5a7a', '#9ab0d0'),
      copper_ingot: (g) => ingot(g, '#a8643c', '#e08a52'),
      copper_wire: (g) => { for (let i = 0; i < 4; i++) { R(g, OL, 2 + i, 3 + i, 12 - i * 2, 10 - i * 2); R(g, i % 2 ? '#e08a52' : '#b8602a', 3 + i, 4 + i, 10 - i * 2, 8 - i * 2); } R(g, OL, 6, 7, 4, 2); },
      fabric: (g) => { box(g, 2, 3, 12, 10, '#4a60a0', '#6a82c0'); R(g, '#34487c', 2, 7, 12, 1); R(g, '#34487c', 2, 10, 12, 1); },
      bean: (g) => { [[3, 5], [8, 4], [6, 9]].forEach(([x, y]) => { R(g, OL, x, y, 5, 4); R(g, '#a8442c', x + 1, y + 1, 3, 2); R(g, '#d8785a', x + 1, y + 1, 2, 1); }); },
      vegetable: (g) => { R(g, OL, 3, 3, 10, 10); R(g, '#5a9a3c', 4, 4, 8, 8); R(g, '#8ac85a', 5, 5, 4, 3); R(g, '#3c7a2c', 7, 8, 4, 3); R(g, '#d8e8a0', 6, 6, 2, 2); },
      pot: (g) => { R(g, OL, 3, 3, 10, 2); R(g, '#c87a4a', 4, 3, 8, 1); R(g, OL, 2, 5, 12, 8); R(g, '#b0603a', 3, 5, 10, 7); R(g, '#d08a5a', 4, 6, 3, 4); R(g, OL, 4, 13, 8, 1); },
      pot_water: (g) => { R(g, OL, 3, 3, 10, 2); R(g, '#3d8fc4', 4, 3, 8, 1); R(g, OL, 2, 5, 12, 8); R(g, '#b0603a', 3, 5, 10, 7); R(g, '#d08a5a', 4, 6, 3, 4); R(g, '#6ab8e8', 9, 7, 2, 2); R(g, OL, 4, 13, 8, 1); },
      seed_tuber: (g) => seed(g, '#8b5a2b', '#c9a66b'),
      seed_legume: (g) => seed(g, '#a8442c', '#d8785a'),
      seed_veg: (g) => seed(g, '#3c7a2c', '#8ac85a'),
      seed_fiber: (g) => seed(g, '#f2e8c8', '#ffffff'),
      flour: (g) => { R(g, OL, 3, 5, 10, 9); R(g, '#e8dcc0', 4, 6, 8, 7); R(g, '#c8b890', 4, 11, 8, 2); R(g, OL, 6, 3, 4, 3); R(g, '#b08d4a', 6, 4, 4, 1); },
      soap: (g) => { R(g, OL, 2, 6, 12, 6); R(g, '#e8f0e8', 3, 7, 10, 4); R(g, '#ffffff', 4, 7, 4, 1); R(g, '#b8c8c0', 3, 10, 10, 1); },
      leather: (g) => { R(g, OL, 2, 4, 12, 9); R(g, '#9a5a30', 3, 5, 10, 7); R(g, '#b87a48', 4, 6, 4, 3); R(g, '#7a4424', 9, 9, 4, 3); R(g, '#c89a68', 3, 5, 10, 1); },
      pearl: (g) => { R(g, OL, 4, 4, 8, 8); R(g, '#f2f0f0', 5, 5, 6, 6); R(g, '#ffffff', 6, 6, 2, 2); R(g, '#c8d0e0', 8, 9, 2, 2); },
      volt_cell: (g) => { box(g, 4, 3, 8, 11, '#2a6a58', '#4a9a80'); R(g, OL, 6, 1, 4, 2); R(g, '#d8a82a', 7, 1, 2, 1); R(g, '#e8d870', 6, 6, 4, 1); R(g, '#e8d870', 7, 8, 2, 3); },
      iron_pickaxe: (g) => tool(g, (q) => { R(q, OL, 6, 2, 8, 3); R(q, '#9a9aa0', 7, 3, 6, 1); R(q, OL, 5, 4, 2, 2); R(q, OL, 13, 4, 2, 2); R(q, '#9a9aa0', 13, 4, 1, 1); }),
      steel_pickaxe: (g) => tool(g, (q) => { R(q, OL, 6, 2, 8, 3); R(q, '#9ab0d0', 7, 3, 6, 1); R(q, OL, 5, 4, 2, 2); R(q, OL, 13, 4, 2, 2); R(q, '#9ab0d0', 13, 4, 1, 1); }),
      iron_hoe: (g) => tool(g, (q) => { R(q, OL, 9, 3, 5, 2); R(q, '#9a9aa0', 10, 3, 3, 1); R(q, OL, 13, 4, 2, 4); R(q, '#9a9aa0', 13, 5, 1, 2); }),
      iron_shovel: (g) => tool(g, (q) => { R(q, OL, 10, 1, 5, 6); R(q, '#9a9aa0', 11, 2, 3, 4); R(q, '#c8c8d0', 11, 2, 1, 3); }),
      iron_knife: (g) => tool(g, (q) => { R(q, OL, 9, 1, 5, 6); R(q, '#c8c8d0', 10, 2, 2, 4); R(q, '#9a9aa0', 12, 3, 1, 3); }),
    };
  })();

  // ---------------------------------------------------------------
  // SpriteEngine
  // ---------------------------------------------------------------
  const cache = { terrain: {}, edge: {}, foam: [], floor: {}, obj: {}, player: {}, playerModels: null, icon: {}, url: {} };
  const DIR_ORDER = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const TERRAIN_NAMES = Object.keys(TERRAIN_FN);
  const LAND_VARIANTS = 6, WATER_VARIANTS = 2;

  const SpriteEngine = {
    PALETTE, icons: IC, ready: false, DIR_ORDER, PRI, NEIGH,
    terrainNames: TERRAIN_NAMES,

    validate() {
      const bad = [];
      Object.keys(IC).forEach((k) => {
        if (IC[k].length !== 16) bad.push(`IC.${k}: ${IC[k].length} linhas`);
        IC[k].forEach((r, i) => { if (r.length !== 16) bad.push(`IC.${k}[${i}]: ${r.length} colunas`); });
      });
      return bad;
    },

    init() {
      const t0 = performance.now();
      // Terrenos
      TERRAIN_NAMES.forEach((n) => {
        const fn = TERRAIN_FN[n];
        if (WATER[n]) {
          cache.terrain[n] = [];
          for (let v = 0; v < WATER_VARIANTS; v++) {
            const frames = [];
            for (let f = 0; f < 4; f++) frames.push(genDiamond((px, py) => fn(px, py, v, f)));
            cache.terrain[n].push(frames);
          }
          cache.edge[n] = [0, 1, 2, 3].map((e) => genEdge(cache.terrain[n][0][0], e));
        } else {
          cache.terrain[n] = [];
          for (let v = 0; v < LAND_VARIANTS; v++) cache.terrain[n].push(genDiamond((px, py) => fn(px, py, v, 0)));
          cache.edge[n] = [0, 1, 2, 3].map((e) => genEdge(cache.terrain[n][0], e));
        }
      });
      for (let f = 0; f < 4; f++) cache.foam.push([0, 1, 2, 3].map((e) => genFoam(e, f)));

      // Pisos
      Object.keys(FLOOR_FN).forEach((n) => {
        cache.floor[n] = [];
        for (let v = 0; v < 3; v++) cache.floor[n].push(genDiamond((px, py) => FLOOR_FN[n](px, py, v)));
      });
      // Objetos e jogador: renderizados sob demanda (e pré-aquecidos em segundo plano)
      this.prewarm();

      // Ícones
      Object.keys(IC).forEach((n) => { cache.icon[n] = rasterize(IC[n]); });
      Object.keys(ICON_VARIANTS).forEach((n) => {
        const [src, map] = ICON_VARIANTS[n];
        cache.icon[n] = rasterize(swapChars(IC[src], map));
      });
      Object.keys(ICON_DRAW).forEach((n) => {
        const c = newCanvas(16, 16); ICON_DRAW[n](c.getContext('2d')); cache.icon[n] = c;
      });
      this.initMs = performance.now() - t0;
      this.ready = true;
    },

    variantOf(x, y, n) { return (((x * 73856093) ^ (y * 19349663)) >>> 0) % n; },

    /** Losango do terreno (água é animada). */
    terrain(name, x, y, timeMs) {
      const t = cache.terrain[name];
      if (WATER[name]) return t[this.variantOf(x, y, WATER_VARIANTS)][Math.floor(timeMs / 420) % 4];
      return t[this.variantOf(x, y, LAND_VARIANTS)];
    },
    edge(name, e) { return cache.edge[name] ? cache.edge[name][e] : null; },
    foam(e, timeMs) { return cache.foam[Math.floor(timeMs / 420) % 4][e]; },

    /** Piso (losango sobre o terreno). */
    floor(name, x, y) { const l = cache.floor[name]; return l ? l[this.variantOf(x, y, l.length)] : null; },

    _objList(name) {
      let list = cache.obj[name];
      if (list) return list;
      const def = Ilha.Models.OBJECTS[name];
      if (!def) return null;
      const VE = Ilha.VoxelEngine;
      list = [];
      for (let v = 0; v < def.variants; v++) {
        const frames = [];
        for (let f = 0; f < (def.frames || 1); f++) frames.push(VE.render(def.build(v, f), 0, def.noShadow ? { shadow: false } : null));
        list.push(frames);
      }
      cache.obj[name] = list;
      return list;
    },

    /** Sprite de objeto: { c, ax, ay } (âncora = centro do tile no canvas). */
    object(name, x, y, timeMs) {
      const list = this._objList(name);
      if (!list) return null;
      const frames = list[this.variantOf(x, y, list.length)];
      if (frames.length > 1) return frames[Math.floor(timeMs / 140 + x * 3 + y) % frames.length];
      return frames[0];
    },

    /** Jogador: dir (N..NW), quadro 0=parado 1/2=passos (renderiza a direção sob demanda). */
    player(dir, frame) {
      if (!cache.player[dir]) {
        const VE = Ilha.VoxelEngine;
        if (!cache.playerModels) cache.playerModels = [0, 1, 2].map((f) => Ilha.Models.PLAYER.build(f));
        const v = Config.DIR8[dir];
        const yaw = Math.atan2(v[1], v[0]);
        cache.player[dir] = cache.playerModels.map((m) => VE.render(m, yaw, { shadowAlpha: 0.38 }));
      }
      return cache.player[dir][frame];
    },

    /** Pré-aquece sprites em segundo plano (um por quadro de animação) para evitar engasgos. */
    prewarm() {
      const tasks = [];
      DIR_ORDER.forEach((d) => tasks.push(() => this.player(d, 0)));
      Object.keys(Ilha.Models.OBJECTS).forEach((n) => tasks.push(() => this._objList(n)));
      const step = () => {
        const t0 = performance.now();
        while (tasks.length && performance.now() - t0 < 12) tasks.shift()();
        if (tasks.length) setTimeout(step, 4);
      };
      setTimeout(step, 50);
    },

    /** Máscara de alfa para picking. */
    hit(sprite, lx, ly) {
      if (lx < 0 || ly < 0 || lx >= sprite.w || ly >= sprite.h) return false;
      return Ilha.VoxelEngine.mask(sprite)[ly * sprite.w + lx] === 1;
    },

    icon(name) { return cache.icon[name] || cache.icon.stone; },
    iconURL(name, scale) {
      const k = name + '@' + (scale || 3);
      if (!cache.url[k]) {
        const s = scale || 3;
        const c = newCanvas(16 * s, 16 * s); const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.icon(name), 0, 0, 16 * s, 16 * s);
        cache.url[k] = c.toDataURL();
      }
      return cache.url[k];
    },

    /** Miniatura 48x48 de um objeto do mapa (para a UI). */
    spriteURL(name) {
      const k = 'sp:' + name;
      if (!cache.url[k]) {
        const c = newCanvas(48, 48); const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        const list = this._objList(name);
        if (list) {
          const s = list[0][0];
          const f = Math.min(44 / s.w, 44 / s.h);
          const w = Math.round(s.w * f), h = Math.round(s.h * f);
          ctx.drawImage(s.c, Math.round((48 - w) / 2), Math.round((48 - h) / 2), w, h);
        }
        cache.url[k] = c.toDataURL();
      }
      return cache.url[k];
    },
    objectNames() { return Object.keys(Ilha.Models.OBJECTS); },
    iconNames() { return Object.keys(cache.icon); },
  };

  Ilha.SpriteEngine = SpriteEngine;
})();
