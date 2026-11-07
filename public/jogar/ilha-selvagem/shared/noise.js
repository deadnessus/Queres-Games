// Ruído Perlin 2D com semente. Mesmo código no servidor e no cliente => mundo idêntico.
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const G = [[1, 1], [-1, 1], [1, -1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]];
export function makeNoise(seed) {
  const rnd = mulberry32(seed);
  const a = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  const p = new Uint8Array(512);
  for (let i = 0; i < 512; i++) p[i] = a[i & 255];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const g = (h, dx, dy) => { const v = G[h & 7]; return v[0] * dx + v[1] * dy; };
  return function (x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const X = xi & 255, Y = yi & 255;
    const aa = p[p[X] + Y], ab = p[p[X] + Y + 1], ba = p[p[X + 1] + Y], bb = p[p[X + 1] + Y + 1];
    const u = fade(xf), v = fade(yf);
    const g1 = g(aa, xf, yf), g2 = g(ba, xf - 1, yf), g3 = g(ab, xf, yf - 1), g4 = g(bb, xf - 1, yf - 1);
    const x1 = g1 + u * (g2 - g1), x2 = g3 + u * (g4 - g3);
    return (x1 + v * (x2 - x1)) * 1.1;
  };
}
export function fbm(n, x, y, oct = 4, lac = 2, gain = 0.5) {
  let s = 0, amp = 1, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) { s += n(x * f + i * 17.3, y * f - i * 9.1) * amp; norm += amp; amp *= gain; f *= lac; }
  return s / norm;
}
export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
