// Peças de construção e colisão (mesmo código no cliente e no servidor).
export const CELL = 4;      // largura de um módulo
export const WALL_H = 3;    // altura de uma parede
export const MATS = ['madeira', 'pedra', 'palha'];

// snap: cell | edge | corner | free ; m = custo em unidades do material escolhido ; fixed = custo fixo
export const PIECES = {
  piso:    { nome: 'Piso',            snap: 'cell',   m: 2 },
  pisoR:   { nome: 'Piso redondo',    snap: 'cell',   m: 2 },
  parede:  { nome: 'Parede',          snap: 'edge',   m: 3 },
  porta:   { nome: 'Porta',           snap: 'edge',   m: 3 },
  janela:  { nome: 'Janela',          snap: 'edge',   m: 3 },
  arco:    { nome: 'Arco redondo',    snap: 'edge',   m: 4 },
  pilar:   { nome: 'Pilar',           snap: 'corner', m: 1 },
  coluna:  { nome: 'Coluna redonda',  snap: 'corner', m: 2 },
  rampa:   { nome: 'Escada',          snap: 'cell',   m: 4 },
  telhado: { nome: 'Telhado',         snap: 'cell',   m: 3, rise: 3 },
  cupula:  { nome: 'Cúpula',          snap: 'cell',   m: 6, rise: 3 },
  cerca:   { nome: 'Cerca',           snap: 'edge',   m: 1 },
  mesa:    { nome: 'Mesa',            snap: 'free',   fixed: { madeira: 4 } },
  banco:   { nome: 'Banco',           snap: 'free',   fixed: { madeira: 3 } },
  cama:    { nome: 'Cama',            snap: 'free',   fixed: { madeira: 5, palha: 4 } },
  bau:     { nome: 'Baú',             snap: 'free',   fixed: { madeira: 5 } },
  fogueira:{ nome: 'Fogueira',        snap: 'free',   fixed: { madeira: 3, pedra: 2 } },
  tocha:   { nome: 'Tocha',           snap: 'free',   fixed: { madeira: 1 } },
};
export const PIECE_IDS = Object.keys(PIECES);

export function pieceCost(kind, mat) {
  const d = PIECES[kind];
  if (!d) return null;
  if (d.fixed) return { ...d.fixed };
  const mult = mat === 'pedra' ? 1.0 : 1.0;
  return { [mat]: Math.ceil(d.m * mult) };
}

// converte local->mundo: x' = x*c + z*s ; z' = -x*s + z*c  (mesma convenção do three.js, rotation.y = ry)
function box(p, lx, lz, hx, hz, y0, y1) {
  const c = Math.cos(p.ry), s = Math.sin(p.ry);
  return { cx: p.x + lx * c + lz * s, cz: p.z - lx * s + lz * c, hx, hz, c, s, y0: p.y + y0, y1: p.y + y1 };
}
function circ(p, lx, lz, r, y0, y1) {
  const c = Math.cos(p.ry), s = Math.sin(p.ry);
  return { cx: p.x + lx * c + lz * s, cz: p.z - lx * s + lz * c, r, y0: p.y + y0, y1: p.y + y1 };
}
export function pieceBoxes(p) {
  switch (p.k) {
    case 'parede': case 'janela': return [box(p, 0, 0, 2, 0.16, 0, WALL_H)];
    case 'porta': return p.open ? [box(p, -1.45, 0, 0.6, 0.16, 0, WALL_H), box(p, 1.45, 0, 0.6, 0.16, 0, WALL_H)] : [box(p, 0, 0, 2, 0.16, 0, WALL_H)];
    case 'arco': return [box(p, -1.55, 0, 0.45, 0.16, 0, WALL_H), box(p, 1.55, 0, 0.45, 0.16, 0, WALL_H), box(p, 0, 0, 1.1, 0.16, 2.7, WALL_H)];
    case 'pilar': return [box(p, 0, 0, 0.25, 0.25, 0, WALL_H)];
    case 'coluna': return [circ(p, 0, 0, 0.42, 0, WALL_H)];
    case 'cerca': return [box(p, 0, 0, 2, 0.1, 0, 1.15)];
    case 'mesa': return [box(p, 0, 0, 0.85, 0.5, 0, 0.9)];
    case 'cama': return [box(p, 0, 0, 0.55, 1.05, 0, 0.55)];
    case 'bau': return [box(p, 0, 0, 0.5, 0.35, 0, 0.75)];
    default: return [];
  }
}
export function pieceSurface(p) { // null | {type, hx, hz, r}
  switch (p.k) {
    case 'piso': return { type: 'flat', hx: 2, hz: 2 };
    case 'pisoR': return { type: 'disc', r: 2 };
    case 'rampa': return { type: 'ramp', hx: 2, hz: 2 };
    default: return null;
  }
}
export function pieceRadius(p) { return 3.2; }

const GS = 8;
export class BuildIndex {
  constructor() { this.byId = new Map(); this.grid = new Map(); this.keys = new Set(); }
  static key(p) { return `${p.k}|${Math.round(p.x * 10)}|${Math.round(p.y * 10)}|${Math.round(p.z * 10)}|${Math.round(p.ry * 100)}`; }
  has(p) { return this.keys.has(BuildIndex.key(p)); }
  _cells(p) {
    const out = [];
    const x0 = Math.floor((p.x - 3.2) / GS), x1 = Math.floor((p.x + 3.2) / GS), z0 = Math.floor((p.z - 3.2) / GS), z1 = Math.floor((p.z + 3.2) / GS);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) out.push(i + ',' + j);
    return out;
  }
  add(p) {
    this.byId.set(p.id, p); this.keys.add(BuildIndex.key(p));
    for (const k of this._cells(p)) { let s = this.grid.get(k); if (!s) this.grid.set(k, (s = new Set())); s.add(p); }
  }
  remove(id) {
    const p = this.byId.get(id); if (!p) return null;
    this.byId.delete(id); this.keys.delete(BuildIndex.key(p));
    for (const k of this._cells(p)) { const s = this.grid.get(k); if (s) { s.delete(p); if (!s.size) this.grid.delete(k); } }
    return p;
  }
  near(x, z, r) {
    const out = new Set();
    const x0 = Math.floor((x - r) / GS), x1 = Math.floor((x + r) / GS), z0 = Math.floor((z - r) / GS), z1 = Math.floor((z + r) / GS);
    for (let i = x0; i <= x1; i++) for (let j = z0; j <= z1; j++) { const s = this.grid.get(i + ',' + j); if (s) for (const p of s) out.add(p); }
    return out;
  }
  // empurra um círculo (x,z,r) para fora das peças sólidas. y = pés, h = altura do corpo.
  resolve(x, z, y, r, h, out) {
    let px = x, pz = z, hit = false;
    for (let it = 0; it < 2; it++) {
      for (const p of this.near(px, pz, r + 3)) {
        for (const b of pieceBoxes(p)) {
          if (!(b.y1 > y + 0.4 && b.y0 < y + h)) continue;
          if (b.r !== undefined) {
            const dx = px - b.cx, dz = pz - b.cz, d = Math.hypot(dx, dz), m = b.r + r;
            if (d < m) { const k = d > 1e-6 ? (m - d) / d : 0; if (d < 1e-6) { px += m; } else { px += dx * k; pz += dz * k; } hit = true; }
            continue;
          }
          const dx = px - b.cx, dz = pz - b.cz;
          const lx = dx * b.c - dz * b.s, lz = dx * b.s + dz * b.c;
          const qx = Math.max(-b.hx, Math.min(b.hx, lx)), qz = Math.max(-b.hz, Math.min(b.hz, lz));
          let ox = lx - qx, oz = lz - qz; const d = Math.hypot(ox, oz);
          if (d < r) {
            if (d < 1e-6) { // centro dentro da caixa: sai pelo lado mais próximo
              const ex = b.hx - Math.abs(lx), ez = b.hz - Math.abs(lz);
              if (ex < ez) { ox = Math.sign(lx || 1) * (ex + r); oz = 0; } else { ox = 0; oz = Math.sign(lz || 1) * (ez + r); }
            } else { const k = (r - d) / d; ox *= k; oz *= k; }
            px += ox * b.c + oz * b.s; pz += -ox * b.s + oz * b.c; hit = true;
          }
        }
      }
    }
    out.x = px; out.z = pz; out.hit = hit; return out;
  }
  // altura da superfície onde se pode pisar (<= y + step); -Infinity se nenhuma
  surfaceAt(x, z, y, step) {
    let best = -Infinity;
    for (const p of this.near(x, z, 3)) {
      const s = pieceSurface(p); if (!s) continue;
      const c = Math.cos(p.ry), sn = Math.sin(p.ry);
      const dx = x - p.x, dz = z - p.z;
      const lx = dx * c - dz * sn, lz = dx * sn + dz * c;
      let sy;
      if (s.type === 'flat') { if (Math.abs(lx) > s.hx || Math.abs(lz) > s.hz) continue; sy = p.y; }
      else if (s.type === 'disc') { if (lx * lx + lz * lz > s.r * s.r) continue; sy = p.y; }
      else { if (Math.abs(lx) > s.hx || Math.abs(lz) > s.hz) continue; sy = p.y + WALL_H * (lz + 2) / 4; }
      if (sy <= y + step && sy > best) best = sy;
    }
    return best;
  }
}

// posição "encaixada" a partir de um ponto do mundo
export function snapPiece(kind, px, pz, rotIdx) {
  const d = PIECES[kind];
  const R = Math.PI / 2;
  if (d.snap === 'cell') return { x: (Math.floor(px / CELL) + 0.5) * CELL, z: (Math.floor(pz / CELL) + 0.5) * CELL, ry: rotIdx * R };
  if (d.snap === 'corner') return { x: Math.round(px / CELL) * CELL, z: Math.round(pz / CELL) * CELL, ry: 0 };
  if (d.snap === 'edge') {
    const fx = px / CELL, fz = pz / CELL;
    const dx = Math.abs(fx - Math.round(fx)), dz = Math.abs(fz - Math.round(fz));
    if (dx < dz) return { x: Math.round(fx) * CELL, z: (Math.floor(fz) + 0.5) * CELL, ry: R + (rotIdx % 2) * Math.PI };
    return { x: (Math.floor(fx) + 0.5) * CELL, z: Math.round(fz) * CELL, ry: (rotIdx % 2) * Math.PI };
  }
  return { x: Math.round(px * 2) / 2, z: Math.round(pz * 2) / 2, ry: rotIdx * R / 2 };
}
