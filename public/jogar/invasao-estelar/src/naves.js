// Desenho das naves (canvas): 10 tipos de inimigo, cada um com 2 quadros de animação, e a nave do jogador.
// Os inimigos são naves de guerra e criaturas alienígenas: escuros, com garras, presas e olhos acesos.
// Os sprites são desenhados uma vez e guardados; o tamanho acompanha a resolução da tela.
import { clamp } from './logica.js';

const TAU = Math.PI * 2;
const LARG_INIMIGO = 60;
const ALT_INIMIGO = 48;
const FOLGA = 8; // borda extra no sprite, para o brilho não ser cortado
const LARG_JOGADOR = 56;
const ALT_JOGADOR = 64;
const CONTORNO = '#07050f';

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

// polígono fechado
function forma(g, pontos, preenche, contorno = CONTORNO, larg = 1.2) {
  g.beginPath();
  pontos.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
  if (preenche) { g.fillStyle = preenche; g.fill(); }
  if (contorno) { g.strokeStyle = contorno; g.lineWidth = larg; g.stroke(); }
}

// desenha a metade esquerda e repete espelhada na direita (o sprite tem 60 de largura)
function espelhar(g, desenhar) {
  desenhar();
  g.save();
  g.translate(LARG_INIMIGO, 0);
  g.scale(-1, 1);
  desenhar();
  g.restore();
}

// o brilho é medido em unidades do jogo (a sombra do canvas não acompanha a escala sozinha)
function brilho(g, cor, forca = 4) {
  g.shadowColor = cor;
  g.shadowBlur = forca * ESC;
}
function semBrilho(g) {
  g.shadowBlur = 0;
  g.shadowColor = 'transparent';
}

// ponto de luz aceso (olho, lâmpada, boca de canhão)
function luz(g, x, y, r, cor) {
  brilho(g, cor, r * 2.5);
  g.fillStyle = cor;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  semBrilho(g);
  g.fillStyle = 'rgba(255,255,255,.85)';
  g.beginPath(); g.arc(x, y, r * 0.42, 0, TAU); g.fill();
}

function traco(g, pontos, cor, larg) {
  g.strokeStyle = cor;
  g.lineWidth = larg;
  g.beginPath();
  pontos.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.stroke();
}

/* ---------- inimigos (60 x 48, centro em 30,24, de frente para baixo) ---------- */

// nave de ataque com duas garras
function cacaGarra(g, f) {
  const ponta = f ? -1.5 : 1.5;
  for (const x of [25, 35]) {
    forma(g, [[x - 2.6, 8], [x + 2.6, 8], [x, ponta]], grad(g, 0, 8, 0, ponta, [[0, 'rgba(255,240,200,.95)'], [0.5, 'rgba(255,90,60,.8)'], [1, 'rgba(255,60,60,0)']]), null);
  }
  espelhar(g, () => {
    brilho(g, '#ff2a40', 2.5);
    forma(g, [[22, 13], [7, 8], [1, 22], [6, 46], [10.5, 30], [19, 25]], grad(g, 0, 8, 0, 46, [[0, '#5d6480'], [0.55, '#292e48'], [1, '#0e1022']]));
    semBrilho(g);
    traco(g, [[8, 10.5], [3.6, 22], [6, 36]], 'rgba(165,180,225,.55)', 0.8);
    brilho(g, '#ff2a40', 2.5);
    traco(g, [[6.6, 43.5], [10.8, 29.5], [18.2, 24.8]], '#ff5a6a', 1.1);
    semBrilho(g);
  });
  forma(g, [[30, 46], [36.5, 31], [40, 16], [35, 6], [25, 6], [20, 16], [23.5, 31]], grad(g, 20, 0, 40, 0, [[0, '#2a2f4c'], [0.5, '#7a82a2'], [1, '#2a2f4c']]));
  traco(g, [[22, 17], [38, 17]], 'rgba(8,8,26,.65)', 0.9);
  traco(g, [[25, 10.5], [35, 10.5]], 'rgba(8,8,26,.65)', 0.9);
  brilho(g, '#ff2a40', 3.5);
  forma(g, [[25.3, 22.5], [34.7, 22.5], [32.6, 34], [30, 39.5], [27.4, 34]], grad(g, 0, 22, 0, 40, [[0, '#ffc0b0'], [0.35, '#ff3b4d'], [1, '#7a0a1c']]), CONTORNO, 1);
  semBrilho(g);
  traco(g, [[30, 23.5], [30, 38]], CONTORNO, 1);
  traco(g, [[26.5, 28], [33.5, 28]], CONTORNO, 0.8);
}

// inseto alienígena com mandíbulas e ferrão
function vespa(g, f) {
  const bate = f ? 0.55 : 0.05;
  espelhar(g, () => {
    for (const [dx, dy, rx, ry, rot] of [[-14, -5, 14.5, 4.6, 0.22 + bate], [-10.5, 2.5, 10.5, 3.4, -0.12 + bate * 0.6]]) {
      g.save();
      g.translate(24.5, 26);
      g.rotate(rot);
      elipse(g, dx, dy, rx, ry, 'rgba(170,255,190,.2)', 'rgba(205,255,220,.75)');
      traco(g, [[-3, dy * 0.4], [dx * 1.8, dy]], 'rgba(205,255,220,.5)', 0.6);
      g.restore();
    }
    for (const pts of [[[23.5, 27], [15, 31], [12.5, 38]], [[23.5, 25], [14, 23.5], [9.5, 27.5]], [[24.5, 30], [19, 35], [18, 41]]]) {
      traco(g, pts, CONTORNO, 2.4);
      traco(g, pts, '#5d3f8c', 1.2);
    }
  });
  // ferrão e abdômen (atrás)
  brilho(g, '#a6ff3c', 3);
  forma(g, [[28.3, 4.2], [31.7, 4.2], [30, 0.4]], '#e8ffc0', CONTORNO, 0.8);
  semBrilho(g);
  const casca = (y) => grad(g, 22, y - 5, 38, y + 5, [[0, '#5a3a8c'], [0.5, '#2c1a4a'], [1, '#110a20']]);
  elipse(g, 30, 7.5, 4.6, 4.2, casca(7.5), CONTORNO);
  elipse(g, 30, 13, 6.6, 5, casca(13), CONTORNO);
  elipse(g, 30, 19.5, 7.6, 5.4, casca(19.5), CONTORNO);
  brilho(g, '#a6ff3c', 3);
  for (const [y, rx] of [[10.2, 4.6], [16.2, 6.4]]) {
    g.strokeStyle = '#b8ff5a';
    g.lineWidth = 1.3;
    g.beginPath(); g.ellipse(30, y - 2.2, rx, 2.6, 0, 0.35, Math.PI - 0.35); g.stroke();
  }
  semBrilho(g);
  // tórax e cabeça
  elipse(g, 30, 27.5, 8.2, 6.6, radial(g, 27, 25, 1, 10, [[0, '#7a55b4'], [0.6, '#3a2360'], [1, '#150b28']]), CONTORNO);
  elipse(g, 30, 38, 7.4, 6.2, radial(g, 28, 36, 1, 9, [[0, '#6a48a0'], [1, '#170c2a']]), CONTORNO);
  espelhar(g, () => {
    brilho(g, '#ff2a40', 3);
    elipse(g, 25.4, 38.4, 2.7, 4, radial(g, 25.4, 38, 0, 4, [[0, '#ffd0c0'], [0.4, '#ff3b4d'], [1, '#8a0a1c']]), CONTORNO, -0.5);
    semBrilho(g);
    forma(g, [[26, 42.6], [23.6, 47.6], [28.8, 44.6]], '#efe6cc', CONTORNO, 0.8);
  });
}

// nave em forma de lâmina curva, com fio de energia
function lamina(g, f) {
  const corpo = () => {
    g.beginPath();
    g.moveTo(5, 46);
    g.bezierCurveTo(-3, 22, 12, 5, 30, 5);
    g.bezierCurveTo(48, 5, 63, 22, 55, 46);
    g.bezierCurveTo(53, 31, 45, 21, 30, 21);
    g.bezierCurveTo(15, 21, 7, 31, 5, 46);
    g.closePath();
  };
  espelhar(g, () => forma(g, [[21, 8], [17.5, 0.6], [26.5, 5.8]], '#3c4662'));
  brilho(g, '#38e8ff', 3);
  corpo();
  g.fillStyle = grad(g, 0, 5, 0, 46, [[0, '#7482a2'], [0.4, '#303a58'], [1, '#0c1024']]);
  g.fill();
  semBrilho(g);
  g.strokeStyle = CONTORNO;
  g.lineWidth = 1.3;
  corpo();
  g.stroke();
  espelhar(g, () => {
    traco(g, [[14, 11], [17.5, 22.5]], 'rgba(8,10,30,.6)', 0.9);
    traco(g, [[7, 19], [11, 28]], 'rgba(8,10,30,.6)', 0.9);
    traco(g, [[9, 13.5], [20, 7.5]], 'rgba(170,190,235,.5)', 0.8);
    luz(g, 21.5, 14.5, 1.2, '#ff3b4d');
  });
  brilho(g, '#38e8ff', 3.5);
  g.strokeStyle = '#9ff8ff';
  g.lineWidth = 1.3;
  g.beginPath();
  g.moveTo(6.6, 41);
  g.bezierCurveTo(9.5, 29.5, 16, 19.4, 30, 19.4);
  g.bezierCurveTo(44, 19.4, 50.5, 29.5, 53.4, 41);
  g.stroke();
  forma(g, [[30, 7.6], [34.6, 12.6], [30, 17.6], [25.4, 12.6]], radial(g, 30, 12.6, 0, 5, [[0, '#ffffff'], [f ? 0.6 : 0.35, '#38e8ff'], [1, '#0a6a8a']]), CONTORNO, 1);
  if (f) {
    traco(g, [[6.5, 44], [14, 40.5], [21, 45], [30, 39.5], [39, 45], [46, 40.5], [53.5, 44]], 'rgba(190,250,255,.9)', 0.9);
  }
  semBrilho(g);
  luz(g, 5.6, 45, f ? 1.7 : 1.2, '#7ff0ff');
  luz(g, 54.4, 45, f ? 1.7 : 1.2, '#7ff0ff');
}

// criatura que é quase só boca
function devorador(g, f) {
  const marfim = grad(g, 0, 0, 0, 10, [[0, '#f4ecd6'], [1, '#8a6a9a']]);
  for (const pts of [[[19.5, 9.5], [14, 0.6], [25, 6.4]], [[40.5, 9.5], [46, 0.6], [35, 6.4]], [[27.2, 5.8], [30, 0.4], [32.8, 5.8]]]) forma(g, pts, marfim, CONTORNO, 1);
  espelhar(g, () => {
    g.beginPath(); g.moveTo(14, 23); g.quadraticCurveTo(4.5, 25, 5, 35);
    g.strokeStyle = CONTORNO; g.lineWidth = 4.4; g.stroke();
    g.strokeStyle = '#4a1c6a'; g.lineWidth = 2.8; g.stroke();
    forma(g, [[2.6, 34], [7.6, 34], [5.6, 41.5]], '#efe6cc', CONTORNO, 0.8);
  });
  brilho(g, '#c44bff', 3);
  g.beginPath();
  g.moveTo(11, 24);
  g.bezierCurveTo(9, 3.5, 51, 3.5, 49, 24);
  g.bezierCurveTo(50, 40, 40, 46.5, 30, 46.5);
  g.bezierCurveTo(20, 46.5, 10, 40, 11, 24);
  g.closePath();
  g.fillStyle = radial(g, 25, 13, 2, 32, [[0, '#b866e6'], [0.5, '#6a2a96'], [1, '#220a3a']]);
  g.fill();
  semBrilho(g);
  g.strokeStyle = CONTORNO; g.lineWidth = 1.3; g.stroke();
  g.fillStyle = 'rgba(30,6,50,.45)';
  for (const [x, y, r] of [[16, 15, 1.6], [44, 16, 1.9], [41, 9.5, 1.2], [18, 22, 1.1]]) { g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); }
  // boca
  const ab = f ? 6.6 : 10;
  const cy = 34.5;
  g.beginPath(); g.ellipse(30, cy, 14.5, ab, 0, 0, TAU);
  g.fillStyle = radial(g, 30, cy + 2, 1, 14, [[0, '#ff6aa8'], [0.45, '#8a0a40'], [1, '#1a0210']]);
  g.fill();
  g.strokeStyle = CONTORNO; g.lineWidth = 1.3; g.stroke();
  for (let i = 0; i < 8; i++) {
    const x = 18.2 + i * 3.37;
    const dx = (x - 30) / 14.5;
    const borda = ab * Math.sqrt(Math.max(0, 1 - dx * dx));
    const cima = Math.min(borda * 0.95, i % 2 ? 4.4 : 6);
    const baixo = Math.min(borda * 0.9, i % 2 ? 4.6 : 3.4);
    forma(g, [[x - 1.75, cy - borda + 0.4], [x + 1.75, cy - borda + 0.4], [x, cy - borda + cima]], '#fff8e6', CONTORNO, 0.5);
    forma(g, [[x - 1.75, cy + borda - 0.4], [x + 1.75, cy + borda - 0.4], [x, cy + borda - baixo]], '#fff8e6', CONTORNO, 0.5);
  }
  // um olho só, com a sobrancelha fechada
  brilho(g, '#ffd21f', 3);
  elipse(g, 30, 15.5, 6.4, 4.8, radial(g, 30, 15.5, 0, 6.5, [[0, '#fffbd0'], [0.5, '#ffd21f'], [1, '#b05a00']]), CONTORNO);
  semBrilho(g);
  elipse(g, 30, 16, 1.3, 3.9, '#170500');
  traco(g, [[21, 9.6], [29.4, 12.6]], '#1c0830', 2.6);
  traco(g, [[39, 9.6], [30.6, 12.6]], '#1c0830', 2.6);
}

// nave pesada com dois canhões
function bombardeiro(g, f) {
  const ponta = f ? 0.4 : 3;
  for (const x of [20, 30, 40]) {
    forma(g, [[x - 3, 8], [x + 3, 8], [x, ponta]], grad(g, 0, 8, 0, ponta, [[0, 'rgba(255,245,200,.95)'], [0.5, 'rgba(255,150,40,.8)'], [1, 'rgba(255,90,20,0)']]), null);
  }
  espelhar(g, () => {
    forma(g, [[10.6, 28], [17.4, 28], [16.8, 45.5], [11.2, 45.5]], grad(g, 10, 0, 18, 0, [[0, '#1c2029'], [0.5, '#737b8c'], [1, '#1c2029']]));
    forma(g, [[9.8, 39.6], [18.2, 39.6], [18.2, 42.6], [9.8, 42.6]], '#2c313e', CONTORNO, 0.9);
  });
  luz(g, 14, 46, f ? 2.2 : 1.3, '#ffb02e');
  luz(g, 46, 46, f ? 1.3 : 2.2, '#ffb02e');
  brilho(g, '#ffb02e', 2.5);
  forma(g, [[11, 7], [49, 7], [58, 19], [55, 31], [41, 35], [30, 41.5], [19, 35], [5, 31], [2, 19]], grad(g, 0, 7, 0, 42, [[0, '#7e8694'], [0.5, '#454c5b'], [1, '#161924']]), CONTORNO, 1.3);
  semBrilho(g);
  espelhar(g, () => {
    forma(g, [[4.2, 19], [12, 9], [22, 9], [18.5, 22], [7.5, 29]], grad(g, 0, 9, 0, 29, [[0, '#a4acb9'], [1, '#3b4151']]), CONTORNO, 1);
    g.fillStyle = 'rgba(12,14,22,.8)';
    for (const [x, y] of [[9, 18], [13.5, 12.5], [18, 12.5], [11, 24]]) { g.beginPath(); g.arc(x, y, 0.8, 0, TAU); g.fill(); }
    traco(g, [[23.5, 9], [21, 30]], 'rgba(8,10,20,.6)', 0.9);
  });
  brilho(g, '#ffb02e', 3.5);
  forma(g, [[20.5, 16.5], [39.5, 16.5], [36.4, 23], [23.6, 23]], grad(g, 0, 16.5, 0, 23, [[0, '#fff2b8'], [1, '#ff9a1e']]), CONTORNO, 1);
  semBrilho(g);
  forma(g, [[29, 16.5], [31, 16.5], [30.6, 23], [29.4, 23]], CONTORNO, null);
  // faixa de perigo no bico
  g.save();
  forma(g, [[24, 28.5], [36, 28.5], [33, 36.6], [30, 38.6], [27, 36.6]], '#ffb02e', CONTORNO, 1);
  g.clip();
  for (let x = 18; x < 44; x += 4.4) traco(g, [[x, 40], [x + 6, 27]], '#15161c', 1.7);
  g.restore();
}

// aranha de guerra
function aranha(g, f) {
  const a = f ? 1.7 : -1.3;
  espelhar(g, () => {
    const pernas = [
      [[24.5, 35], [15.5, 37.5 + a], [11.5, 47]],
      [[23.5, 33], [10.5, 30.5 - a], [3.5, 42]],
      [[23.5, 31], [9.5, 21.5 + a], [1.2, 27.5]],
      [[24.5, 29], [11.5, 13.5 - a], [3.4, 8]],
    ];
    for (const pts of pernas) {
      traco(g, pts, CONTORNO, 3.6);
      traco(g, pts, '#7c46b8', 1.9);
      traco(g, [pts[1], pts[2]], '#c79bf0', 0.7);
    }
  });
  brilho(g, '#b455ff', 3);
  elipse(g, 30, 16.5, 11, 12, radial(g, 26, 11, 1, 16, [[0, '#a66ae0'], [0.5, '#5a2a96'], [1, '#1c0a36']]), CONTORNO);
  semBrilho(g);
  brilho(g, '#ff3b6e', 3);
  forma(g, [[26, 10.5], [34, 10.5], [30, 16.5]], '#ff4d7a', null);
  forma(g, [[30, 16.5], [34, 22.5], [26, 22.5]], '#ff4d7a', null);
  semBrilho(g);
  elipse(g, 30, 33.5, 8.6, 7.4, radial(g, 28, 31, 1, 10, [[0, '#8a52c8'], [1, '#1c0a36']]), CONTORNO);
  espelhar(g, () => {
    forma(g, [[26.6, 39.4], [25, 47], [29.2, 41.4]], '#efe6cc', CONTORNO, 0.8);
    luz(g, 26.4, 35.4, 1.9, '#ff2a40');
    luz(g, 28.6, 31.6, 1.1, '#ff2a40');
    luz(g, 23.8, 32.4, 0.9, '#ff2a40');
  });
}

// disco de vigia com espinhos e um olho vermelho
function sentinela(g, f) {
  const metal = grad(g, 0, 30, 0, 45, [[0, '#5a6280'], [1, '#161a2c']]);
  for (const [x, comp] of [[12, 6.5], [21, 9.5], [30, 12.5], [39, 9.5], [48, 6.5]]) forma(g, [[x - 2.8, 31.5], [x + 2.8, 31.5], [x, 33 + comp]], metal, CONTORNO, 1);
  espelhar(g, () => {
    forma(g, [[6.5, 21.5], [0.4, 27.5], [7.5, 30.5]], '#3c4460', CONTORNO, 1);
    forma(g, [[22, 12.5], [18.6, 1.6], [25.8, 11]], '#3c4460', CONTORNO, 1);
  });
  brilho(g, '#ff5a3c', 3);
  elipse(g, 30, 27, 26, 9.6, grad(g, 0, 17, 0, 37, [[0, '#8690b0'], [0.5, '#3c4362'], [1, '#12152a']]), CONTORNO);
  semBrilho(g);
  g.beginPath();
  g.ellipse(30, 22.5, 13, 12.5, 0, Math.PI, 0);
  g.closePath();
  g.fillStyle = grad(g, 0, 10, 0, 22.5, [[0, '#4a3e5e'], [1, '#120c1e']]);
  g.fill();
  g.strokeStyle = CONTORNO; g.lineWidth = 1.2; g.stroke();
  g.strokeStyle = 'rgba(200,190,230,.45)'; g.lineWidth = 0.9;
  g.beginPath(); g.ellipse(30, 22.5, 10, 9.6, 0, Math.PI * 1.15, Math.PI * 1.5); g.stroke();
  brilho(g, '#ff2a2a', 4.5);
  elipse(g, 30, 27.2, 8.4, 4.8, radial(g, 30, 27.2, 0, 8.4, [[0, '#fff0d0'], [0.3, '#ff5a3c'], [1, '#8a0a0a']]), CONTORNO);
  semBrilho(g);
  elipse(g, 30 + (f ? 2.4 : -2.4), 27.2, 1.5, 3.8, '#14030a');
  [7.5, 14, 20.5, 39.5, 46, 52.5].forEach((x, i) => {
    const dx = (x - 30) / 26;
    const y = 27 + 9.6 * Math.sqrt(1 - dx * dx) * 0.5;
    if ((i + f) % 2) luz(g, x, y, 1.3, '#ff6a4c');
    else { g.fillStyle = '#4a1410'; g.beginPath(); g.arc(x, y, 1.3, 0, TAU); g.fill(); }
  });
}

// parasita: cérebro com olhos de raiva e tentáculos com gancho
function parasita(g, f) {
  for (let i = 0; i < 5; i++) {
    const x0 = 17 + i * 6.5;
    const o = Math.sin((f ? 1.7 : 0) + i * 1.4) * 4;
    const fx = x0 + o * 0.7;
    const fy = 44 - Math.abs(i - 2) * 1.6;
    g.beginPath(); g.moveTo(x0, 27); g.bezierCurveTo(x0 + o, 33, x0 - o, 38, fx, fy);
    g.strokeStyle = CONTORNO; g.lineWidth = 4.4; g.stroke();
    g.strokeStyle = '#a3345e'; g.lineWidth = 2.6; g.stroke();
    forma(g, [[fx - 1.9, fy - 0.8], [fx + 1.9, fy - 0.8], [fx + (i < 2 ? -1.6 : i > 2 ? 1.6 : 0), fy + 3.8]], '#f2e8d0', CONTORNO, 0.6);
  }
  brilho(g, '#ff5a8a', 3);
  g.beginPath();
  g.moveTo(10, 25);
  g.bezierCurveTo(4.5, 0.5, 55.5, 0.5, 50, 25);
  g.bezierCurveTo(48, 34, 12, 34, 10, 25);
  g.closePath();
  g.fillStyle = radial(g, 24, 10, 2, 30, [[0, '#ee82a4'], [0.5, '#a83562'], [1, '#3a0c2a']]);
  g.fill();
  semBrilho(g);
  g.strokeStyle = CONTORNO; g.lineWidth = 1.3; g.stroke();
  // dobras do cérebro
  g.strokeStyle = 'rgba(58,8,38,.65)';
  g.lineWidth = 1.1;
  g.beginPath(); g.moveTo(30, 3.5); g.lineTo(30, 14.5); g.stroke();
  espelhar(g, () => {
    g.strokeStyle = 'rgba(58,8,38,.65)'; g.lineWidth = 1.1;
    g.beginPath(); g.moveTo(26, 5.5); g.quadraticCurveTo(21, 4, 20, 8.5); g.quadraticCurveTo(19.5, 12.5, 25, 12); g.stroke();
    g.beginPath(); g.moveTo(17, 7.5); g.quadraticCurveTo(12, 10, 14, 15); g.quadraticCurveTo(17, 17.5, 21, 15); g.stroke();
    brilho(g, '#ffe14d', 3);
    forma(g, [[14.6, 17.6], [27, 23.6], [25, 27.6], [15.4, 24]], grad(g, 0, 17.6, 0, 27.6, [[0, '#fffbe0'], [1, '#ffb81f']]), CONTORNO, 1);
    semBrilho(g);
    elipse(g, 22, 23.6, 1.2, 2.4, '#1a0210', null, 0.45);
  });
  forma(g, [[24.5, 28.6], [35.5, 28.6], [34, 32.4], [26, 32.4]], '#1a0210', CONTORNO, 0.9);
  for (let x = 25.6; x < 34; x += 2.2) forma(g, [[x, 28.8], [x + 2, 28.8], [x + 1, 31.6]], '#fff8e6', null);
}

// crânio alienígena com chifres
function cranio(g, f) {
  const j = f ? 2.2 : 0;
  const osso = (y0, y1) => grad(g, 0, y0, 0, y1, [[0, '#f6eed8'], [1, '#877c66']]);
  espelhar(g, () => {
    g.beginPath(); g.moveTo(18, 13); g.quadraticCurveTo(7, 11, 3, 0.6); g.quadraticCurveTo(13.5, 3, 23.5, 8); g.closePath();
    g.fillStyle = osso(0, 13); g.fill();
    g.strokeStyle = CONTORNO; g.lineWidth = 1.2; g.stroke();
  });
  // boca por dentro e mandíbula
  brilho(g, '#ff3030', f ? 4 : 1.5);
  forma(g, [[22, 33], [38, 33], [37, 41 + j], [23, 41 + j]], f ? '#c01828' : '#4a0810', null);
  semBrilho(g);
  forma(g, [[21.4, 38.2 + j], [38.6, 38.2 + j], [36.8, 43 + j], [33, 45.4 + j], [27, 45.4 + j], [23.2, 43 + j]], osso(36, 47));
  for (let x = 24; x < 35.5; x += 2.9) forma(g, [[x, 38.4 + j], [x + 2.4, 38.4 + j], [x + 1.2, 35.6 + j]], '#fff8e6', CONTORNO, 0.5);
  // crânio
  brilho(g, '#ff3030', 2.5);
  g.beginPath();
  g.moveTo(13, 19);
  g.bezierCurveTo(12, 1.5, 48, 1.5, 47, 19);
  g.bezierCurveTo(47, 26, 43, 29, 41, 31);
  g.lineTo(40, 35.6); g.lineTo(20, 35.6); g.lineTo(19, 31);
  g.bezierCurveTo(17, 29, 13, 26, 13, 19);
  g.closePath();
  g.fillStyle = radial(g, 25, 10, 2, 29, [[0, '#fffaf0'], [0.6, '#d9d0b8'], [1, '#877c66']]);
  g.fill();
  semBrilho(g);
  g.strokeStyle = CONTORNO; g.lineWidth = 1.3; g.stroke();
  traco(g, [[33, 3.6], [35.4, 7.6], [33.6, 10], [36.6, 13.6]], 'rgba(40,30,30,.6)', 0.8);
  espelhar(g, () => {
    forma(g, [[15.6, 16.6], [27.2, 22], [26.2, 27.8], [18.6, 26.8], [15.4, 22]], '#14060c', CONTORNO, 1);
    luz(g, 21.8, 23.6, 1.9, '#ff3030');
    forma(g, [[20.4, 34.4], [23.6, 34.4], [22, 41.4]], '#fff8e6', CONTORNO, 0.6);
  });
  forma(g, [[30, 25.4], [27.5, 31.2], [32.5, 31.2]], '#14060c', null);
  for (let x = 24.6; x < 35; x += 2.8) forma(g, [[x, 34.4], [x + 2.3, 34.4], [x + 2.3, 37.6], [x, 37.6]], '#fff8e6', CONTORNO, 0.5);
}

// olho gigante com espinhos
function olhoVigia(g, f) {
  for (let i = 0; i < 4; i++) {
    const x0 = 21 + i * 6;
    const o = Math.sin((f ? 1.5 : 0) + i * 1.9) * 3.2;
    g.beginPath(); g.moveTo(x0, 35); g.bezierCurveTo(x0 + o, 39, x0 - o, 43, x0 + o * 0.6, 47);
    g.strokeStyle = CONTORNO; g.lineWidth = 3.4; g.stroke();
    g.strokeStyle = '#8a2a4a'; g.lineWidth = 1.9; g.stroke();
  }
  const casca = grad(g, 0, 0, 0, 40, [[0, '#6a7a3c'], [1, '#141c10']]);
  for (let i = 0; i < 5; i++) {
    const an = Math.PI * (1.12 + i * 0.19);
    const c = Math.cos(an);
    const s = Math.sin(an);
    forma(g, [[30 + c * 13 - s * 3.4, 23 + s * 13 + c * 3.4], [30 + c * 13 + s * 3.4, 23 + s * 13 - c * 3.4], [30 + c * 22.6, 23 + s * 22.6]], casca, CONTORNO, 1);
  }
  brilho(g, '#c8f03c', 3);
  elipse(g, 30, 23, 16.6, 16.6, casca, CONTORNO);
  semBrilho(g);
  elipse(g, 30, 24, 13.4, 13.4, radial(g, 27, 20, 1, 15, [[0, '#fffff0'], [0.6, '#e6e0b0'], [1, '#8f8850']]), CONTORNO);
  g.save();
  g.beginPath(); g.arc(30, 24, 13.4, 0, TAU); g.clip();
  g.strokeStyle = 'rgba(200,40,40,.65)';
  g.lineWidth = 0.7;
  for (const [x1, y1, x2, y2, x3, y3] of [[17, 27, 20, 29, 22.6, 27.6], [18.5, 33, 22, 32.6, 23.6, 34], [43, 27, 40, 29.4, 37.6, 28], [41.5, 33.5, 38.6, 32.4, 37, 34.4], [25, 36.6, 26.4, 34.6, 25.6, 33.4], [35, 36.6, 33.6, 35, 34.6, 33.6]]) {
    g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.lineTo(x3, y3); g.stroke();
  }
  brilho(g, '#c8f03c', 2.5);
  elipse(g, 30, 26.8, 7.6, 7.6, radial(g, 30, 26.8, 1, 7.6, [[0, '#f6ffa0'], [0.55, '#b0e01c'], [1, '#34500a']]), CONTORNO);
  semBrilho(g);
  elipse(g, 30, 26.8, f ? 2.7 : 1.5, 6.3, '#070a00');
  g.fillStyle = 'rgba(255,255,255,.9)';
  g.beginPath(); g.arc(26.8, 23.8, 1.5, 0, TAU); g.fill();
  // pálpebra fechando em V: olhar de raiva
  forma(g, [[10, 5], [50, 5], [50, 17.4], [30, 22.6], [10, 17.4]], '#3c4a26', null);
  traco(g, [[10, 17.4], [30, 22.6], [50, 17.4]], CONTORNO, 1.5);
  g.restore();
}

export const TIPOS = [
  { nome: 'Caças Garra', cor: '#ff4d5e', desenhar: cacaGarra },
  { nome: 'Vespas', cor: '#a6ff3c', desenhar: vespa },
  { nome: 'Lâminas', cor: '#38e8ff', desenhar: lamina },
  { nome: 'Devoradores', cor: '#d86bff', desenhar: devorador },
  { nome: 'Bombardeiros', cor: '#ffb02e', desenhar: bombardeiro },
  { nome: 'Aranhas', cor: '#b455ff', desenhar: aranha },
  { nome: 'Sentinelas', cor: '#ff6a4c', desenhar: sentinela },
  { nome: 'Parasitas', cor: '#ff5a8a', desenhar: parasita },
  { nome: 'Crânios', cor: '#ffe9c8', desenhar: cranio },
  { nome: 'Olhos', cor: '#c8f03c', desenhar: olhoVigia },
];

function spriteInimigo(tipo, quadro) {
  const chave = `${tipo}|${quadro}`;
  let c = cacheInimigos.get(chave);
  if (!c) {
    const nova = novoCanvas(LARG_INIMIGO + FOLGA * 2, ALT_INIMIGO + FOLGA * 2);
    nova.g.translate(FOLGA, FOLGA);
    TIPOS[tipo].desenhar(nova.g, quadro);
    c = nova.c;
    cacheInimigos.set(chave, c);
  }
  return c;
}

// Desenha o inimigo com o centro na origem (quem chama já posicionou e girou o canvas).
export function desenharInimigo(g, tipo, quadro, escala = 1) {
  const l = (LARG_INIMIGO + FOLGA * 2) * escala;
  const a = (ALT_INIMIGO + FOLGA * 2) * escala;
  g.drawImage(spriteInimigo(tipo, quadro), -l / 2, -a / 2, l, a);
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
    brilho(g, g.fillStyle, 2.5);
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
