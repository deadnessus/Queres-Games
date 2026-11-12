// Desenho das naves (canvas): 10 tipos de inimigo, cada um com 2 quadros de animação, e a nave do jogador.
// Os sprites são desenhados uma vez e guardados; o tamanho acompanha a resolução da tela.
import { clamp } from './logica.js';

const TAU = Math.PI * 2;
export const LARG_INIMIGO = 60;
export const ALT_INIMIGO = 48;
const LARG_JOGADOR = 56;
const ALT_JOGADOR = 64;

let ESC = 2; // pixels por unidade do jogo nos sprites
const cacheInimigos = new Map();
let cacheJogador = null;

export function definirResolucao(fator) {
  const novo = clamp(Math.round(fator * 2) / 2, 1, 3);
  if (novo === ESC) return;
  ESC = novo;
  cacheInimigos.clear();
  cacheJogador = null;
}

function novoCanvas(l, a) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(l * ESC);
  c.height = Math.ceil(a * ESC);
  const g = c.getContext('2d');
  g.scale(ESC, ESC);
  g.lineJoin = 'round';
  g.lineCap = 'round';
  return { c, g };
}

function grad(g, x0, y0, x1, y1, paradas) {
  const r = g.createLinearGradient(x0, y0, x1, y1);
  for (const [o, cor] of paradas) r.addColorStop(o, cor);
  return r;
}

function radial(g, x, y, r0, r1, paradas) {
  const r = g.createRadialGradient(x, y, r0, x, y, r1);
  for (const [o, cor] of paradas) r.addColorStop(o, cor);
  return r;
}

function elipse(g, x, y, rx, ry, preenche, contorno, rot = 0) {
  g.beginPath();
  g.ellipse(x, y, rx, ry, rot, 0, TAU);
  if (preenche) { g.fillStyle = preenche; g.fill(); }
  if (contorno) { g.strokeStyle = contorno; g.lineWidth = 1.2; g.stroke(); }
}

function brilho(g, cor, forca = 7) {
  g.shadowColor = cor;
  g.shadowBlur = forca;
}
function semBrilho(g) {
  g.shadowBlur = 0;
  g.shadowColor = 'transparent';
}

/* ---------- inimigos (60 x 48, centro em 30,24, de frente para baixo) ---------- */

function disco(g, f) {
  brilho(g, '#5ef2ff', 8);
  elipse(g, 30, 28, 27, 9, grad(g, 0, 18, 0, 38, [[0, '#e4ebff'], [0.5, '#7b86c9'], [1, '#2c3166']]), '#10153f');
  semBrilho(g);
  g.fillStyle = grad(g, 0, 8, 0, 24, [[0, '#d6fbff'], [0.6, '#4fd8ff'], [1, '#1d7fd1']]);
  g.beginPath();
  g.ellipse(30, 24, 13, 13, 0, Math.PI, 0);
  g.closePath();
  g.fill();
  g.strokeStyle = '#10153f';
  g.lineWidth = 1.2;
  g.stroke();
  g.fillStyle = 'rgba(255,255,255,.7)';
  g.beginPath(); g.ellipse(25, 15, 3, 5, -0.5, 0, TAU); g.fill();
  for (let i = 0; i < 5; i++) {
    g.fillStyle = (i + f) % 2 ? '#ffe66d' : '#ff6ec7';
    g.beginPath(); g.arc(11 + i * 9.5, 30 + Math.abs(i - 2) * -0.6 + 1.5, 1.9, 0, TAU); g.fill();
  }
  g.fillStyle = 'rgba(94,242,255,.55)';
  g.beginPath(); g.ellipse(30, 40, 9, 2.2, 0, 0, TAU); g.fill();
}

function besouro(g, f) {
  const a = f ? 0.95 : 0.35;
  for (const s of [-1, 1]) {
    g.save(); g.translate(30, 22); g.rotate(s * a);
    g.fillStyle = 'rgba(190,255,230,.5)'; g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 1;
    g.beginPath(); g.ellipse(s * 15, -3, 15, 6, 0, 0, TAU); g.fill(); g.stroke();
    g.restore();
  }
  brilho(g, '#7dff6b', 8);
  elipse(g, 30, 28, 15, 18, grad(g, 15, 10, 45, 46, [[0, '#d9ff8a'], [0.45, '#38c24a'], [1, '#0e5a2a']]), '#06301a');
  semBrilho(g);
  g.strokeStyle = '#06301a'; g.lineWidth = 1.2;
  g.beginPath(); g.moveTo(30, 12); g.lineTo(30, 46); g.stroke();
  g.fillStyle = 'rgba(255,255,255,.35)';
  for (const [x, y] of [[23, 24], [37, 24], [24, 35], [36, 35]]) { g.beginPath(); g.arc(x, y, 2.4, 0, TAU); g.fill(); }
  elipse(g, 30, 10, 7, 6, grad(g, 0, 4, 0, 16, [[0, '#9aff7c'], [1, '#1f8a3c']]), '#06301a');
  g.fillStyle = '#ff3d6e'; g.beginPath(); g.arc(27, 9, 1.6, 0, TAU); g.arc(33, 9, 1.6, 0, TAU); g.fill();
  g.strokeStyle = '#9aff7c'; g.lineWidth = 1.4;
  g.beginPath(); g.moveTo(26, 5); g.lineTo(22, 0); g.moveTo(34, 5); g.lineTo(38, 0); g.stroke();
}

function caranguejo(g, f) {
  g.strokeStyle = '#a84a00'; g.lineWidth = 2;
  for (const s of [-1, 1]) for (let i = 0; i < 3; i++) {
    g.beginPath(); g.moveTo(30 + s * 12, 28 + i * 4); g.lineTo(30 + s * 22, 32 + i * 5 + (f ? 2 : -1)); g.lineTo(30 + s * 25, 40 + i * 2); g.stroke();
  }
  for (const s of [-1, 1]) {
    g.save(); g.translate(30 + s * 22, 17);
    g.fillStyle = grad(g, 0, -10, 0, 10, [[0, '#ffb25c'], [1, '#d9540a']]); g.strokeStyle = '#7a2e00'; g.lineWidth = 1.2;
    g.beginPath(); g.arc(0, 0, 8, 0, TAU); g.fill(); g.stroke();
    const ab = f ? 0.9 : 0.3;
    g.fillStyle = '#ff7a1e';
    g.beginPath(); g.moveTo(0, -4); g.lineTo(s * 9, -10 - ab * 4); g.lineTo(s * 4, -3); g.closePath(); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(0, 4); g.lineTo(s * 9, 10 + ab * 4); g.lineTo(s * 4, 3); g.closePath(); g.fill(); g.stroke();
    g.restore();
  }
  brilho(g, '#ff9a3c', 8);
  elipse(g, 30, 27, 17, 13, grad(g, 0, 14, 0, 40, [[0, '#ffc27a'], [0.5, '#ff7a1e'], [1, '#a83a00']]), '#6a2600');
  semBrilho(g);
  for (const s of [-1, 1]) {
    g.strokeStyle = '#d9540a'; g.lineWidth = 2; g.beginPath(); g.moveTo(30 + s * 7, 17); g.lineTo(30 + s * 8, 9); g.stroke();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(30 + s * 8, 8, 3.6, 0, TAU); g.fill();
    g.fillStyle = '#111'; g.beginPath(); g.arc(30 + s * 8, 9, 1.6, 0, TAU); g.fill();
  }
  g.strokeStyle = '#6a2600'; g.lineWidth = 1.4; g.beginPath(); g.arc(30, 28, 6, 0.2, Math.PI - 0.2); g.stroke();
}

function libelula(g, f) {
  const a = f ? 0.35 : -0.15;
  for (const s of [-1, 1]) for (const [y, comp] of [[17, 18], [28, 15]]) {
    g.save(); g.translate(30, y); g.rotate(s * (a + (y > 20 ? 0.25 : 0)));
    g.fillStyle = 'rgba(150,215,255,.55)'; g.strokeStyle = 'rgba(220,245,255,.8)'; g.lineWidth = 1;
    g.beginPath(); g.ellipse(s * comp, 0, comp, 4.6, 0, 0, TAU); g.fill(); g.stroke();
    g.beginPath(); g.moveTo(s * 4, 0); g.lineTo(s * comp * 1.7, 0); g.stroke();
    g.restore();
  }
  brilho(g, '#4aa8ff', 8);
  elipse(g, 30, 25, 4.8, 20, grad(g, 25, 0, 35, 0, [[0, '#9fe8ff'], [0.5, '#2f8bff'], [1, '#14308f']]), '#0b1a55');
  semBrilho(g);
  g.strokeStyle = '#0b1a55'; g.lineWidth = 1;
  for (let y = 14; y < 42; y += 5) { g.beginPath(); g.moveTo(26, y); g.lineTo(34, y); g.stroke(); }
  elipse(g, 30, 6, 6, 5.5, grad(g, 0, 1, 0, 12, [[0, '#cfffff'], [1, '#2aa0e8']]), '#0b1a55');
  g.fillStyle = '#ff3d6e'; g.beginPath(); g.arc(27, 5.5, 2, 0, TAU); g.arc(33, 5.5, 2, 0, TAU); g.fill();
}

function caveira(g, f) {
  brilho(g, '#ff3b4d', 9);
  g.fillStyle = grad(g, 0, 6, 0, 36, [[0, '#ffffff'], [1, '#aeb6d4']]);
  g.strokeStyle = '#3a3f66'; g.lineWidth = 1.4;
  g.beginPath(); g.arc(30, 20, 16, 0, TAU); g.fill(); g.stroke();
  semBrilho(g);
  const j = f ? 2 : 0;
  g.fillStyle = grad(g, 0, 30, 0, 44, [[0, '#f1f4ff'], [1, '#9aa2c4']]);
  g.beginPath(); g.roundRect ? g.roundRect(21, 30 + j, 18, 11, 3) : g.rect(21, 30 + j, 18, 11); g.fill(); g.stroke();
  g.strokeStyle = '#3a3f66'; g.lineWidth = 1;
  for (let x = 24; x <= 36; x += 3) { g.beginPath(); g.moveTo(x, 31 + j); g.lineTo(x, 40 + j); g.stroke(); }
  for (const s of [-1, 1]) {
    elipse(g, 30 + s * 7, 20, 5, 6, '#14081f');
    elipse(g, 30 + s * 7, 20, 2.6, 3.2, radial(g, 30 + s * 7, 20, 0, 4, [[0, '#fff'], [0.4, '#ff5566'], [1, '#c01030']]));
  }
  g.fillStyle = '#3a3f66'; g.beginPath(); g.moveTo(30, 25); g.lineTo(27.5, 30); g.lineTo(32.5, 30); g.closePath(); g.fill();
}

function aranha(g, f) {
  g.strokeStyle = '#8a3ed1'; g.lineWidth = 2.2;
  for (const s of [-1, 1]) for (let i = 0; i < 4; i++) {
    const y0 = 16 + i * 5;
    const joelho = (i + f) % 2 ? -3 : 2;
    g.beginPath(); g.moveTo(30 + s * 8, y0); g.lineTo(30 + s * 22, y0 - 8 + joelho); g.lineTo(30 + s * 27, y0 + 10 + joelho * 0.5); g.stroke();
  }
  brilho(g, '#c36bff', 8);
  elipse(g, 30, 29, 11, 13, grad(g, 0, 16, 0, 42, [[0, '#d99bff'], [0.5, '#8a3ed1'], [1, '#3a1470']]), '#220a45');
  semBrilho(g);
  g.fillStyle = 'rgba(255,255,255,.25)';
  g.beginPath(); g.moveTo(30, 24); g.lineTo(34, 31); g.lineTo(30, 38); g.lineTo(26, 31); g.closePath(); g.fill();
  elipse(g, 30, 13, 7, 6, grad(g, 0, 7, 0, 19, [[0, '#e3b3ff'], [1, '#7a2fc4']]), '#220a45');
  g.fillStyle = '#ff3d6e';
  for (const [x, y, r] of [[27.5, 12, 1.7], [32.5, 12, 1.7], [29, 9.5, 1.2], [31, 9.5, 1.2]]) { g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); }
}

function caca(g, f) {
  const fx = f ? 7 : 4;
  g.fillStyle = grad(g, 30, 0, 30, 14, [[0, '#fff3a8'], [1, 'rgba(255,120,40,0)']]);
  g.beginPath(); g.moveTo(25, 6); g.lineTo(30, -1 - fx * 0.2); g.lineTo(35, 6); g.closePath(); g.fill();
  brilho(g, '#ff5f7a', 9);
  g.fillStyle = grad(g, 0, 8, 0, 47, [[0, '#ff9aae'], [0.5, '#e5243f'], [1, '#6e0a22']]);
  g.strokeStyle = '#3a0412'; g.lineWidth = 1.3;
  g.beginPath();
  g.moveTo(30, 46); g.lineTo(39, 24); g.lineTo(56, 9); g.lineTo(55, 20); g.lineTo(43, 14);
  g.lineTo(37, 8); g.lineTo(23, 8); g.lineTo(17, 14); g.lineTo(5, 20); g.lineTo(4, 9); g.lineTo(21, 24);
  g.closePath(); g.fill(); g.stroke();
  semBrilho(g);
  g.fillStyle = grad(g, 0, 16, 0, 34, [[0, '#fff1c2'], [1, '#e8932b']]);
  g.beginPath(); g.ellipse(30, 25, 4.8, 9, 0, 0, TAU); g.fill(); g.strokeStyle = '#3a0412'; g.lineWidth = 1; g.stroke();
  g.fillStyle = '#ffe66d'; g.beginPath(); g.arc(11, 17, 1.7, 0, TAU); g.arc(49, 17, 1.7, 0, TAU); g.fill();
}

function polvo(g, f) {
  g.strokeStyle = '#d63aa6'; g.lineWidth = 3.4;
  for (let i = 0; i < 5; i++) {
    const x0 = 17 + i * 6.5;
    const ond = Math.sin((f ? 1.6 : 0) + i * 1.3) * 4;
    g.beginPath(); g.moveTo(x0, 30); g.bezierCurveTo(x0 + ond, 36, x0 - ond, 41, x0 + ond * 0.6, 47); g.stroke();
  }
  brilho(g, '#ff62d1', 9);
  g.fillStyle = grad(g, 0, 4, 0, 36, [[0, '#ffa8ec'], [0.55, '#ff4fc0'], [1, '#8c1a78']]);
  g.strokeStyle = '#4a0a40'; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(12, 32); g.bezierCurveTo(10, 6, 50, 6, 48, 32); g.closePath(); g.fill(); g.stroke();
  semBrilho(g);
  for (const s of [-1, 1]) {
    elipse(g, 30 + s * 8, 22, 5.4, 6.4, '#fff', '#4a0a40');
    elipse(g, 30 + s * 8 + (f ? 1 : -1), 23, 2.6, 3.4, '#1a0720');
  }
  g.fillStyle = 'rgba(255,255,255,.3)'; g.beginPath(); g.ellipse(22, 12, 6, 3, -0.4, 0, TAU); g.fill();
}

function cristal(g, f) {
  brilho(g, '#6fa8ff', 11);
  g.fillStyle = '#2a5fd1'; g.strokeStyle = '#0d2160'; g.lineWidth = 1.3;
  g.beginPath(); g.moveTo(30, 1); g.lineTo(52, 24); g.lineTo(30, 47); g.lineTo(8, 24); g.closePath(); g.fill(); g.stroke();
  semBrilho(g);
  const facetas = [
    [[30, 1], [52, 24], [30, 24], '#7fb0ff'], [[30, 1], [30, 24], [8, 24], '#3f78e8'],
    [[8, 24], [30, 24], [30, 47], '#1c3f9e'], [[52, 24], [30, 47], [30, 24], '#2a5fd1'],
  ];
  for (const [a, b, c, cor] of facetas) {
    g.fillStyle = cor; g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c); g.closePath(); g.fill();
  }
  g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(30, 1); g.lineTo(52, 24); g.lineTo(30, 47); g.lineTo(8, 24); g.closePath(); g.stroke();
  g.fillStyle = radial(g, 30, 24, 0, f ? 12 : 8, [[0, 'rgba(255,255,255,.95)'], [1, 'rgba(160,210,255,0)']]);
  g.beginPath(); g.arc(30, 24, f ? 12 : 8, 0, TAU); g.fill();
  if (f) {
    g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(30, 12); g.lineTo(30, 36); g.moveTo(18, 24); g.lineTo(42, 24); g.stroke();
  }
}

function robo(g, f) {
  g.strokeStyle = '#8791ab'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(30, 9); g.lineTo(30, 3); g.stroke();
  g.fillStyle = f ? '#ff4d6d' : '#ffd23d'; g.beginPath(); g.arc(30, 3, 2.6, 0, TAU); g.fill();
  brilho(g, '#b9c3d6', 6);
  g.fillStyle = grad(g, 0, 9, 0, 40, [[0, '#e6ebf5'], [0.5, '#a3adc4'], [1, '#5c667f']]);
  g.strokeStyle = '#262c40'; g.lineWidth = 1.4;
  g.beginPath(); g.roundRect ? g.roundRect(11, 9, 38, 30, 7) : g.rect(11, 9, 38, 30); g.fill(); g.stroke();
  semBrilho(g);
  g.fillStyle = '#14172a'; g.beginPath(); g.roundRect ? g.roundRect(16, 16, 28, 11, 4) : g.rect(16, 16, 28, 11); g.fill();
  g.fillStyle = radial(g, 30, 21, 0, 14, [[0, '#fff'], [0.35, '#ff3d55'], [1, '#8a0a20']]);
  const olho = f ? 5 : 8;
  g.beginPath(); g.roundRect ? g.roundRect(30 - olho * 1.6, 18, olho * 3.2, 6, 3) : g.rect(30 - olho * 1.6, 18, olho * 3.2, 6); g.fill();
  g.strokeStyle = '#262c40'; g.lineWidth = 1.2;
  for (let x = 20; x <= 40; x += 5) { g.beginPath(); g.moveTo(x, 31); g.lineTo(x, 36); g.stroke(); }
  g.fillStyle = '#5c667f';
  for (const [x, y] of [[14, 13], [46, 13], [14, 35], [46, 35]]) { g.beginPath(); g.arc(x, y, 1.6, 0, TAU); g.fill(); }
  g.fillStyle = grad(g, 0, 39, 0, 47, [[0, 'rgba(120,200,255,.95)'], [1, 'rgba(120,200,255,0)']]);
  for (const x of [20, 40]) { g.beginPath(); g.moveTo(x - 4, 39); g.lineTo(x + 4, 39); g.lineTo(x, 46 + (f ? 1.5 : 0)); g.closePath(); g.fill(); }
}

export const TIPOS = [
  { nome: 'Discos Voadores', cor: '#5ef2ff', desenhar: disco },
  { nome: 'Besouros', cor: '#7dff6b', desenhar: besouro },
  { nome: 'Caranguejos', cor: '#ff9a3c', desenhar: caranguejo },
  { nome: 'Libélulas', cor: '#4aa8ff', desenhar: libelula },
  { nome: 'Caveiras', cor: '#e8ecff', desenhar: caveira },
  { nome: 'Aranhas', cor: '#c36bff', desenhar: aranha },
  { nome: 'Caças', cor: '#ff5f7a', desenhar: caca },
  { nome: 'Polvos', cor: '#ff62d1', desenhar: polvo },
  { nome: 'Cristais', cor: '#6fa8ff', desenhar: cristal },
  { nome: 'Robôs', cor: '#b9c3d6', desenhar: robo },
];

export function spriteInimigo(tipo, quadro) {
  const chave = `${tipo}|${quadro}`;
  let c = cacheInimigos.get(chave);
  if (!c) {
    const nova = novoCanvas(LARG_INIMIGO, ALT_INIMIGO);
    TIPOS[tipo].desenhar(nova.g, quadro);
    c = nova.c;
    cacheInimigos.set(chave, c);
  }
  return c;
}

/* ---------- nave do jogador (56 x 64, centro em 28,32, de frente para cima) ---------- */

function corpoJogador(g) {
  // asas
  for (const s of [-1, 1]) {
    g.save();
    g.translate(28, 0);
    g.scale(s, 1);
    g.fillStyle = grad(g, 4, 26, 26, 58, [[0, '#7f93ee'], [0.55, '#34479e'], [1, '#141d57']]);
    g.strokeStyle = '#080c33';
    g.lineWidth = 1.2;
    g.beginPath(); g.moveTo(6, 24); g.lineTo(25, 44); g.lineTo(26, 57); g.lineTo(18, 55); g.lineTo(6, 47); g.closePath();
    g.fill(); g.stroke();
    g.strokeStyle = 'rgba(160,190,255,.6)';
    g.beginPath(); g.moveTo(8, 30); g.lineTo(22, 46); g.stroke();
    g.fillStyle = s < 0 ? '#ff4d6d' : '#3dff9a';
    brilho(g, g.fillStyle, 6);
    g.beginPath(); g.arc(24.5, 51, 2.2, 0, TAU); g.fill();
    semBrilho(g);
    g.restore();
  }
  // fuselagem
  g.fillStyle = grad(g, 19, 0, 37, 0, [[0, '#8e9fe6'], [0.5, '#ffffff'], [1, '#8e9fe6']]);
  g.strokeStyle = '#080c33';
  g.lineWidth = 1.3;
  g.beginPath();
  g.moveTo(28, 1);
  g.bezierCurveTo(34, 12, 36.5, 24, 36, 38);
  g.lineTo(34, 55); g.lineTo(22, 55); g.lineTo(20, 38);
  g.bezierCurveTo(19.5, 24, 22, 12, 28, 1);
  g.closePath(); g.fill(); g.stroke();
  // faixa vermelha e detalhes
  g.fillStyle = '#ff4d6d';
  g.beginPath(); g.moveTo(26, 36); g.lineTo(30, 36); g.lineTo(30.6, 50); g.lineTo(25.4, 50); g.closePath(); g.fill();
  g.strokeStyle = 'rgba(40,60,140,.45)'; g.lineWidth = 1;
  g.beginPath(); g.moveTo(22, 34); g.lineTo(22.5, 52); g.moveTo(34, 34); g.lineTo(33.5, 52); g.stroke();
  // cabine
  g.fillStyle = grad(g, 28, 12, 28, 34, [[0, '#e6fdff'], [0.45, '#3ec9ff'], [1, '#1456b8']]);
  g.strokeStyle = '#080c33';
  g.beginPath(); g.ellipse(28, 23, 4.8, 9.5, 0, 0, TAU); g.fill(); g.stroke();
  g.fillStyle = 'rgba(255,255,255,.85)';
  g.beginPath(); g.ellipse(26.6, 19, 1.4, 4, 0.1, 0, TAU); g.fill();
  // bocais dos motores
  g.fillStyle = '#12173a';
  g.fillRect(21.5, 54, 6.5, 4.5);
  g.fillRect(28, 54, 6.5, 4.5);
  // canhões
  g.fillStyle = '#c9d4ff';
  g.fillRect(14.5, 26, 2.2, 9); g.fillRect(39.3, 26, 2.2, 9);
}

export function spriteJogador() {
  if (!cacheJogador) {
    const nova = novoCanvas(LARG_JOGADOR, ALT_JOGADOR);
    corpoJogador(nova.g);
    cacheJogador = nova.c;
  }
  return cacheJogador;
}

// Desenha a nave do jogador com o centro em (x, y). `vx` inclina a nave para o lado em que ela anda.
export function desenharJogador(g, x, y, t, vx, escala = 1) {
  const banco = clamp(vx / 290, -1, 1);
  g.save();
  g.translate(x, y);
  g.scale(escala, escala);
  // brilho suave embaixo da nave
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = radial(g, 0, 6, 2, 46, [[0, 'rgba(90,200,255,.28)'], [1, 'rgba(90,200,255,0)']]);
  g.beginPath(); g.arc(0, 6, 46, 0, TAU); g.fill();
  // chamas dos dois motores
  const tremida = 18 + 5 * Math.sin(t * 46) + 3 * Math.sin(t * 23 + 1);
  for (const s of [-1, 1]) {
    const cx = s * 3.3;
    const comp = tremida * (0.9 + 0.1 * Math.sin(t * 31 + s));
    g.fillStyle = grad(g, 0, 26, 0, 26 + comp, [[0, 'rgba(255,255,230,.95)'], [0.3, 'rgba(255,190,70,.85)'], [0.7, 'rgba(255,90,40,.45)'], [1, 'rgba(255,60,40,0)']]);
    g.beginPath();
    g.moveTo(cx - 3.2, 26); g.quadraticCurveTo(cx - 2.2, 26 + comp * 0.55, cx, 26 + comp); g.quadraticCurveTo(cx + 2.2, 26 + comp * 0.55, cx + 3.2, 26);
    g.closePath(); g.fill();
  }
  g.globalCompositeOperation = 'source-over';
  g.scale(1 - 0.1 * Math.abs(banco), 1);
  g.rotate(banco * 0.07);
  g.drawImage(spriteJogador(), -LARG_JOGADOR / 2, -ALT_JOGADOR / 2, LARG_JOGADOR, ALT_JOGADOR);
  g.restore();
}
