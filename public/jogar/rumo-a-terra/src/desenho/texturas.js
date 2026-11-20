// Texturas geradas por código num <canvas> (nenhuma imagem de fora).
import * as THREE from 'three';
import { criarAleatorio, fbm, ruido2 } from '../logica/ruido.js';

function canvas(l, a) {
  const c = document.createElement('canvas');
  c.width = l; c.height = a;
  return [c, c.getContext('2d')];
}

function comoTextura(c, { pixelada = false, repetir = false, cor = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (cor) t.colorSpace = THREE.SRGBColorSpace;
  if (repetir) { t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping; }
  if (pixelada) { t.magFilter = THREE.NearestFilter; t.minFilter = THREE.NearestMipmapLinearFilter; }
  t.anisotropy = 1;
  return t;
}

// Textura de "detalhe" em tons de cinza (multiplica a cor da malha): manchas, grãos e pedrinhas.
// Usada no visual pixelado, no chão e nas plantas/pedras.
export function texturaDetalhe(semente = 3, tam = 64, contraste = 1) {
  const [c, g] = canvas(tam, tam);
  const img = g.createImageData(tam, tam);
  const rnd = criarAleatorio(semente);
  for (let y = 0; y < tam; y++) {
    for (let x = 0; x < tam; x++) {
      // ruído que "dá a volta" (repete sem emenda): amostra num toro
      const ax = (x / tam) * Math.PI * 2, ay = (y / tam) * Math.PI * 2;
      const n = fbm(Math.cos(ax) * 1.6 + 10, Math.sin(ax) * 1.6 + Math.cos(ay) * 1.6, semente, 3) * 0.5
        + ruido2(Math.sin(ay) * 3 + 5, Math.cos(ax) * 3, semente + 9) * 0.25;
      let v = 0.86 + n * 0.22 * contraste + (rnd() - 0.5) * 0.09 * contraste;
      if (rnd() < 0.025) v -= 0.12 * contraste; // pedrinhas escuras
      v = Math.max(0.55, Math.min(1, v));
      const i = (y * tam + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.round(v * 255);
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return comoTextura(c, { pixelada: true, repetir: true });
}

// Painéis de metal para a nave (cinza com emendas e rebites), também multiplicando a cor.
export function texturaPaineis(tam = 64) {
  const [c, g] = canvas(tam, tam);
  g.fillStyle = 'rgb(236,236,236)';
  g.fillRect(0, 0, tam, tam);
  const rnd = criarAleatorio(77);
  for (let i = 0; i < 260; i++) {
    const v = 215 + Math.floor(rnd() * 40);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect(Math.floor(rnd() * tam), Math.floor(rnd() * tam), 1 + Math.floor(rnd() * 3), 1);
  }
  g.fillStyle = 'rgb(150,150,155)';
  g.fillRect(0, 0, tam, 1); g.fillRect(0, tam / 2, tam, 1); g.fillRect(0, 0, 1, tam); g.fillRect(tam * 0.62, 0, 1, tam / 2);
  g.fillStyle = 'rgb(175,175,180)';
  for (const [x, y] of [[3, 3], [tam - 4, 3], [3, tam / 2 + 3], [tam - 4, tam / 2 + 3], [tam * 0.62 + 3, 6]]) g.fillRect(x, y, 1, 1);
  return comoTextura(c, { pixelada: true, repetir: true });
}

// Listras do planeta gigante Colosso (creme, laranja e marrom, com redemoinhos).
export function texturaColosso() {
  const L = 512, A = 256;
  const [c, g] = canvas(L, A);
  const img = g.createImageData(L, A);
  const faixas = [
    [0.0, [236, 218, 184]], [0.12, [214, 150, 96]], [0.2, [242, 228, 200]], [0.3, [190, 112, 66]],
    [0.38, [238, 206, 160]], [0.47, [222, 160, 104]], [0.53, [248, 236, 212]], [0.62, [184, 104, 62]],
    [0.7, [232, 196, 150]], [0.8, [210, 146, 94]], [0.9, [240, 222, 190]], [1.0, [220, 190, 150]],
  ];
  const corEm = (t) => {
    t = Math.max(0, Math.min(1, t));
    for (let i = 0; i < faixas.length - 1; i++) {
      const [ta, ca] = faixas[i], [tb, cb] = faixas[i + 1];
      if (t <= tb) { const k = (t - ta) / (tb - ta); return ca.map((v, j) => v + (cb[j] - v) * k); }
    }
    return faixas[faixas.length - 1][1];
  };
  for (let y = 0; y < A; y++) {
    for (let x = 0; x < L; x++) {
      const ang = (x / L) * Math.PI * 2;
      const u = Math.cos(ang) * 2, v = Math.sin(ang) * 2;
      const lat = y / A;
      const torcao = fbm(u + lat * 6, v, 11, 4) * 0.05 + fbm(u * 3, v * 3 + lat * 20, 12, 2) * 0.012;
      let [r, gg, b] = corEm(lat + torcao);
      // uma grande mancha clara girando (tempestade)
      const dx = (Math.atan2(Math.sin(ang - 1.1), Math.cos(ang - 1.1))) / 0.32, dy = (lat - 0.66) / 0.05;
      const d = dx * dx + dy * dy;
      if (d < 1) { const k = (1 - d) * 0.6; r += (250 - r) * k; gg += (226 - gg) * k; b += (196 - b) * k; }
      const i = (y * L + x) * 4;
      img.data[i] = r; img.data[i + 1] = gg; img.data[i + 2] = b; img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return comoTextura(c, { cor: true });
}

// Anéis do Colosso: faixa com transparência (de dentro para fora).
export function texturaAneis() {
  const L = 256;
  const [c, g] = canvas(L, 4);
  const img = g.createImageData(L, 4);
  for (let x = 0; x < L; x++) {
    const t = x / L;
    let a = 0.25 + 0.55 * Math.abs(Math.sin(t * 38)) * (0.6 + 0.4 * Math.sin(t * 7));
    if (t > 0.58 && t < 0.63) a *= 0.12; // uma divisão escura
    a *= Math.min(1, t * 8) * Math.min(1, (1 - t) * 6);
    for (let y = 0; y < 4; y++) {
      const i = (y * L + x) * 4;
      img.data[i] = 236; img.data[i + 1] = 214; img.data[i + 2] = 178; img.data[i + 3] = Math.round(a * 255);
    }
  }
  g.putImageData(img, 0, 0);
  return comoTextura(c, { cor: true });
}

// Bolinha macia para fumaça e faíscas.
export function texturaParticula() {
  const [c, g] = canvas(32, 32);
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return comoTextura(c);
}

// Nome pintado no casco da nave.
export function texturaLetreiro(texto) {
  const [c, g] = canvas(256, 48);
  g.clearRect(0, 0, 256, 48);
  g.font = 'bold 34px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillStyle = 'rgba(31,47,92,0.92)';
  g.fillText(texto, 128, 26);
  return comoTextura(c, { cor: true });
}

// Texturas dos blocos de construir (32 px, pixeladas): tábuas de madeira, tijolos de pedra e cristal.
export function texturaBloco(tipo) {
  const T = 32;
  const [c, g] = canvas(T, T);
  const rnd = criarAleatorio(tipo === 'madeira' ? 11 : tipo === 'pedra' ? 12 : 13);
  const px = (x, y, r, gg, b) => { g.fillStyle = `rgb(${r},${gg},${b})`; g.fillRect(x, y, 1, 1); };
  for (let y = 0; y < T; y++) {
    for (let x = 0; x < T; x++) {
      const v = (rnd() - 0.5) * 22;
      if (tipo === 'madeira') {
        const tabua = Math.floor(y / 8);
        const veio = Math.sin((x + tabua * 7) * 0.7 + Math.sin(y * 1.3) * 0.8) * 10;
        const emenda = y % 8 === 0 || (x + tabua * 11) % 32 === 0;
        const base = emenda ? [70, 44, 28] : [150 + veio, 98 + veio * 0.7, 58];
        px(x, y, base[0] + v, base[1] + v * 0.7, base[2] + v * 0.4);
      } else if (tipo === 'pedra') {
        const linha = Math.floor(y / 8);
        const junta = y % 8 === 0 || (x + (linha % 2) * 8) % 16 === 0;
        const base = junta ? [72, 66, 84] : [132, 126, 150];
        px(x, y, base[0] + v, base[1] + v, base[2] + v);
      } else {
        const faceta = (x + y) % 16 === 0 || (x - y + 32) % 16 === 0;
        const borda = x === 0 || y === 0 || x === T - 1 || y === T - 1;
        const base = borda ? [40, 160, 200] : faceta ? [200, 255, 255] : [90, 220, 245];
        px(x, y, base[0] + v * 0.5, base[1] + v * 0.3, base[2]);
      }
    }
  }
  if (tipo === 'madeira') { g.fillStyle = 'rgb(60,50,45)'; for (const [x, y] of [[2, 3], [29, 3], [2, 11], [29, 11], [2, 19], [29, 19], [2, 27], [29, 27]]) g.fillRect(x, y, 1, 1); }
  return comoTextura(c, { pixelada: true, cor: true });
}
