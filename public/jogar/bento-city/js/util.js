export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export function wrapAngle(a) {
  a = (a + Math.PI) % (Math.PI * 2);
  if (a < 0) a += Math.PI * 2;
  return a - Math.PI;
}
export const angLerp = (a, b, t) => a + wrapAngle(b - a) * t;
export const dist2 = (ax, az, bx, bz) => Math.hypot(ax - bx, az - bz);
export const rand = (a, b) => a + Math.random() * (b - a);
export const pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];

// Uniform grid for axis-aligned colliders on the XZ plane
export class ColliderGrid {
  constructor(cell = 16) { this.cell = cell; this.map = new Map(); this.list = []; this.stamp = 0; }
  key(i, j) { return (i + 2000) * 8192 + (j + 2000); }
  add(c) {
    c._s = 0;
    this.list.push(c);
    const cs = this.cell;
    for (let i = Math.floor(c.x0 / cs); i <= Math.floor(c.x1 / cs); i++)
      for (let j = Math.floor(c.z0 / cs); j <= Math.floor(c.z1 / cs); j++) {
        const k = this.key(i, j);
        let a = this.map.get(k); if (!a) { a = []; this.map.set(k, a); }
        a.push(c);
      }
    return c;
  }
  query(x0, z0, x1, z1, out) {
    out.length = 0;
    const s = ++this.stamp, cs = this.cell;
    for (let i = Math.floor(x0 / cs); i <= Math.floor(x1 / cs); i++)
      for (let j = Math.floor(z0 / cs); j <= Math.floor(z1 / cs); j++) {
        const a = this.map.get(this.key(i, j));
        if (!a) continue;
        for (const c of a) if (c._s !== s) { c._s = s; out.push(c); }
      }
    return out;
  }
}

export function canvasTexture(w, h, draw, THREE) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}
