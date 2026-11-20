// Números aleatórios com semente e ruído suave (para relevo, plantas e texturas).
// Sem Three.js e sem DOM: dá para testar no Node. O mesmo número de semente gera sempre o mesmo mundo.

// Gerador de números aleatórios com semente (mulberry32). Devolve uma função que dá números em [0, 1).
export function criarAleatorio(semente) {
  let a = semente >>> 0;
  return function aleatorio() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Mistura dois inteiros e a semente num número em [0, 1). Sempre o mesmo para os mesmos valores.
export function hash2(ix, iy, semente) {
  let h = (ix * 374761393 + iy * 668265263 + semente * 982451653) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

const suave = (t) => t * t * t * (t * (t * 6 - 15) + 10);
const misturar = (a, b, t) => a + (b - a) * t;

function gradiente(ix, iy, semente, dx, dy) {
  const ang = hash2(ix, iy, semente) * Math.PI * 2;
  return Math.cos(ang) * dx + Math.sin(ang) * dy;
}

// Ruído de gradiente 2D (tipo Perlin). Devolve um valor em [-1, 1], suave e contínuo.
export function ruido2(x, y, semente = 0) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const u = suave(fx), v = suave(fy);
  const n00 = gradiente(ix, iy, semente, fx, fy);
  const n10 = gradiente(ix + 1, iy, semente, fx - 1, fy);
  const n01 = gradiente(ix, iy + 1, semente, fx, fy - 1);
  const n11 = gradiente(ix + 1, iy + 1, semente, fx - 1, fy - 1);
  const n = misturar(misturar(n00, n10, u), misturar(n01, n11, u), v);
  return Math.max(-1, Math.min(1, n * 1.4142));
}

// Várias camadas de ruído somadas (fBm): detalhes grandes e pequenos. Valor em [-1, 1].
export function fbm(x, y, semente = 0, oitavas = 4, ganho = 0.5, lacunaridade = 2) {
  let soma = 0, amp = 1, freq = 1, total = 0;
  for (let i = 0; i < oitavas; i++) {
    soma += ruido2(x * freq, y * freq, semente + i * 101) * amp;
    total += amp;
    amp *= ganho;
    freq *= lacunaridade;
  }
  return soma / total;
}
