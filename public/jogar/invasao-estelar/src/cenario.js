// Cenários de guerra do fundo (só desenho). Quatro lugares, um a cada duas ondas:
// planeta em chamas, batalha de frotas, cemitério de naves e lua partida.
// Tudo fica escuro e sem contraste de propósito: o que importa na tela são as naves e os tiros.
// O cenário cobre mais que o campo do jogo (de TOPO a BASE), porque em celulares compridos
// a tela mostra um pedaço acima e abaixo do campo.
import { LARGURA } from './logica.js';

const TAU = Math.PI * 2;
const W = LARGURA;
export const TOPO = -160;
export const BASE = 800;
const ALT = BASE - TOPO;

function sorteio(semente) {
  let s = semente;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}
// número fixo entre 0 e 1 para o par (a, b): serve para sortear sem guardar estado
function ruido(a, b) {
  const x = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const volta = (v, periodo) => ((v % periodo) + periodo) % periodo;

function tela(l, a, esc = 2) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(l * esc);
  c.height = Math.ceil(a * esc);
  const g = c.getContext('2d');
  g.scale(esc, esc);
  g.lineJoin = 'round';
  g.lineCap = 'round';
  return { c, g, l, a };
}

const guardados = new Map();
function guardado(chave, criar) {
  let v = guardados.get(chave);
  if (!v) { v = criar(); guardados.set(chave, v); }
  return v;
}

function poligono(g, pontos) {
  g.beginPath();
  pontos.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
  g.closePath();
}

function clarao(g, x, y, r, alfa, cor = '255,170,90') {
  const gr = g.createRadialGradient(x, y, 0, x, y, r);
  gr.addColorStop(0, `rgba(255,255,255,${0.8 * alfa})`);
  gr.addColorStop(0.35, `rgba(${cor},${0.55 * alfa})`);
  gr.addColorStop(1, `rgba(${cor},0)`);
  g.fillStyle = gr;
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
}

/* ---------- estrelas e névoa ---------- */

const ESTRELAS = [
  { v: 5, alfa: 0.5, lista: [] },
  { v: 14, alfa: 0.8, lista: [] },
];
{
  const r = sorteio(11);
  for (let i = 0; i < 90; i++) ESTRELAS[0].lista.push({ x: r() * W, y: r() * ALT, r: 0.4 + r() * 0.5, f: r() * TAU });
  for (let i = 0; i < 34; i++) ESTRELAS[1].lista.push({ x: r() * W, y: r() * ALT, r: 0.6 + r() * 0.7, f: r() * TAU });
}

function estrelas(g, t, mov) {
  g.fillStyle = '#ffffff';
  for (const camada of ESTRELAS) {
    for (const e of camada.lista) {
      g.globalAlpha = camada.alfa * (0.55 + 0.45 * Math.sin(t * 2 + e.f));
      g.beginPath();
      g.arc(e.x, TOPO + volta(e.y + t * camada.v * mov, ALT), e.r, 0, TAU);
      g.fill();
    }
  }
  g.globalAlpha = 1;
}

// manchas de fumaça e gás; a imagem emenda em cima e embaixo para poder rolar sem costura
function nevoa(manchas) {
  const n = tela(W, ALT, 1);
  for (const [x, y, r, rgb, a] of manchas) {
    for (const dy of [-ALT, 0, ALT]) {
      const gr = n.g.createRadialGradient(x, y + dy, 0, x, y + dy, r);
      gr.addColorStop(0, `rgba(${rgb},${a})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      n.g.fillStyle = gr;
      n.g.fillRect(0, 0, W, ALT);
    }
  }
  return n.c;
}

function ceu(g, cores) {
  const gr = g.createLinearGradient(0, TOPO, 0, BASE);
  cores.forEach((c, i) => gr.addColorStop(i / (cores.length - 1), c));
  g.fillStyle = gr;
  g.fillRect(0, TOPO, W, ALT);
}

/* ---------- combates ao longe: clarões e rajadas ---------- */

function claroesAoLonge(g, t, qtd, sem) {
  for (let i = 0; i < qtd; i++) {
    const per = 1.6 + ruido(i, sem) * 2.6;
    const u = t / per + ruido(sem, i) * 9;
    const k = Math.floor(u);
    const f = (u - k) / 0.3;
    if (f > 1) continue;
    const x = ruido(k, i + sem) * W;
    const y = TOPO + ruido(i + sem, k) * ALT;
    clarao(g, x, y, 6 + 24 * f * (0.5 + ruido(k, i)), 0.85 * (1 - f));
  }
}

// rajadas de tiros cruzando a tela bem ao fundo: azuis das naves aliadas, verdes das alienígenas
function rajadas(g, t, qtd, sem) {
  g.lineWidth = 1.6;
  for (let i = 0; i < qtd; i++) {
    const per = 1.6 + ruido(i, sem) * 1.8;
    const u = t / per + ruido(sem, i) * 7;
    const k = Math.floor(u);
    const f = (u - k) / 0.42;
    if (f > 1) continue;
    const aliado = i % 2 === 0;
    const dir = aliado ? 1 : -1;
    const dx = dir * (W + 60);
    const dy = (ruido(i, k + sem) - 0.5) * 260;
    const comp = Math.hypot(dx, dy);
    const nx = dx / comp;
    const ny = dy / comp;
    const x0 = (aliado ? -30 : W + 30) + dx * f;
    const y0 = TOPO + ruido(k, i + sem) * ALT + dy * f;
    g.strokeStyle = aliado ? 'rgba(120,205,255,.7)' : 'rgba(160,255,110,.7)';
    for (let j = 0; j < 4; j++) {
      const x = x0 - nx * j * 15;
      const y = y0 - ny * j * 15;
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x - nx * 8, y - ny * 8);
      g.stroke();
    }
  }
}

/* ---------- naves de guerra grandes (ao fundo) ---------- */

// cruzador aliado visto de cima, proa para a direita (170 x 70)
function desenharCruzadorAliado(g) {
  const casco = [[4, 35], [16, 19], [70, 12], [122, 16], [166, 35], [122, 54], [70, 58], [16, 51]];
  const gr = g.createLinearGradient(0, 10, 0, 60);
  gr.addColorStop(0, '#46558e');
  gr.addColorStop(0.5, '#28336a');
  gr.addColorStop(1, '#121942');
  poligono(g, casco);
  g.fillStyle = gr;
  g.fill();
  g.strokeStyle = 'rgba(165,195,255,.7)';
  g.lineWidth = 1.2;
  g.stroke();
  poligono(g, [[46, 25], [100, 23], [116, 35], [100, 47], [46, 45]]);
  g.fillStyle = '#4b5a98';
  g.fill();
  poligono(g, [[60, 30], [92, 29], [100, 35], [92, 41], [60, 40]]);
  g.fillStyle = '#6676b8';
  g.fill();
  g.strokeStyle = 'rgba(10,14,40,.7)';
  for (const x of [34, 58, 84, 110, 134]) { g.beginPath(); g.moveTo(x, 18); g.lineTo(x, 52); g.stroke(); }
  g.fillStyle = '#0d1230';
  for (const [x, y] of [[30, 26], [30, 44], [128, 27], [128, 43]]) {
    g.beginPath(); g.arc(x, y, 3.4, 0, TAU); g.fill();
    g.fillRect(x, y - 0.8, 9, 1.6);
  }
  g.fillStyle = 'rgba(190,225,255,.85)';
  for (let x = 24; x < 150; x += 7) {
    if ((x * 7) % 5 === 0) continue;
    g.fillRect(x, 20.5 + (x > 120 ? (x - 120) * 0.3 : 0), 1.6, 1);
    g.fillRect(x, 48.5 - (x > 120 ? (x - 120) * 0.3 : 0), 1.6, 1);
  }
  // motores na popa
  g.globalCompositeOperation = 'lighter';
  for (const y of [27, 35, 43]) clarao(g, 5, y, 9, 0.8, '90,190,255');
  g.globalCompositeOperation = 'source-over';
}

// nave-mãe alienígena, com garras para a frente (esquerda) (170 x 80)
function desenharCruzadorAlien(g) {
  const gr = g.createLinearGradient(0, 10, 0, 70);
  gr.addColorStop(0, '#3f6456');
  gr.addColorStop(0.5, '#213832');
  gr.addColorStop(1, '#0c1816');
  g.beginPath();
  g.moveTo(6, 15);
  g.quadraticCurveTo(60, 8, 110, 21);
  g.lineTo(150, 12); g.lineTo(141, 30); g.lineTo(166, 40); g.lineTo(141, 50); g.lineTo(150, 68); g.lineTo(110, 59);
  g.quadraticCurveTo(60, 72, 6, 65);
  g.quadraticCurveTo(52, 57, 64, 40);
  g.quadraticCurveTo(52, 23, 6, 15);
  g.closePath();
  g.fillStyle = gr;
  g.fill();
  g.strokeStyle = 'rgba(140,255,175,.7)';
  g.lineWidth = 1.2;
  g.stroke();
  g.strokeStyle = 'rgba(0,0,0,.5)';
  for (const [x1, y1, x2, y2] of [[80, 20, 92, 60], [108, 22, 116, 58], [130, 28, 132, 52]]) {
    g.beginPath(); g.moveTo(x1, y1); g.quadraticCurveTo((x1 + x2) / 2 - 8, 40, x2, y2); g.stroke();
  }
  g.fillStyle = 'rgba(150,255,140,.9)';
  for (let i = 0; i < 9; i++) {
    g.fillRect(22 + i * 9, 14.5 + i * 0.8, 1.6, 1.2);
    g.fillRect(22 + i * 9, 64.5 - i * 0.8, 1.6, 1.2);
  }
  g.globalCompositeOperation = 'lighter';
  clarao(g, 96, 40, 13, 0.9, '110,255,120');
  clarao(g, 163, 40, 10, 0.7, '255,90,60');
  g.globalCompositeOperation = 'source-over';
}

function cruzador(alien) {
  return guardado(alien ? 'cruzador-alien' : 'cruzador-aliado', () => {
    const s = tela(170, alien ? 80 : 70);
    (alien ? desenharCruzadorAlien : desenharCruzadorAliado)(s.g);
    return s;
  });
}

// pedaço de nave destruída: a nave inteira com um lado arrancado e a borda queimada
function destroco(alien, lado) {
  return guardado(`destroco-${alien}-${lado}`, () => {
    const base = cruzador(alien);
    const s = tela(base.l, base.a);
    s.g.drawImage(base.c, 0, 0, base.l, base.a);
    // o corte é uma linha em zigue-zague perto do meio
    const corte = [];
    const r = sorteio(alien ? 77 + lado : 31 + lado);
    for (let y = -4; y <= base.a + 4; y += 8) corte.push([78 + (r() - 0.5) * 26, y]);
    const borda = lado ? 180 : -10; // lado 0: some a metade esquerda; lado 1: some a direita
    const fora = [[borda, -4], ...corte, [borda, base.a + 4]];
    s.g.globalCompositeOperation = 'destination-out';
    poligono(s.g, fora);
    s.g.fill();
    // borda queimada
    s.g.globalCompositeOperation = 'source-atop';
    s.g.strokeStyle = 'rgba(0,0,0,.75)';
    s.g.lineWidth = 7;
    poligono(s.g, fora);
    s.g.stroke();
    s.g.strokeStyle = 'rgba(255,120,40,.55)';
    s.g.lineWidth = 1.6;
    s.g.stroke();
    s.g.globalCompositeOperation = 'source-over';
    s.brasa = lado ? [78, base.a * 0.35] : [78, base.a * 0.6];
    return s;
  });
}

/* ---------- planeta em chamas ---------- */

const PLANETA = { cx: -165, cy: 330, r: 285 };

function planeta() {
  return guardado('planeta', () => {
    const larg = PLANETA.cx + PLANETA.r + 30; // só a fatia que aparece na tela
    const s = tela(larg, 620);
    const g = s.g;
    const cx = PLANETA.cx;
    const cy = 310;
    const R = PLANETA.r;
    // brilho da atmosfera, para fora do disco
    g.save();
    g.shadowColor = 'rgba(255,110,50,.9)';
    g.shadowBlur = 22;
    g.fillStyle = '#2a0d12';
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.restore();
    g.save();
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.clip();
    const base = g.createRadialGradient(cx + R * 0.75, cy - 40, 20, cx, cy, R);
    base.addColorStop(0, '#6a2a22');
    base.addColorStop(0.5, '#3a141c');
    base.addColorStop(1, '#0c0612');
    g.fillStyle = base;
    g.fillRect(cx - R, cy - R, R * 2, R * 2);
    const r = sorteio(5);
    // terras mais escuras
    g.fillStyle = 'rgba(4,2,8,.45)';
    for (let i = 0; i < 16; i++) {
      g.beginPath();
      g.ellipse(r() * larg, 40 + r() * 540, 14 + r() * 34, 8 + r() * 26, r() * 3, 0, TAU);
      g.fill();
    }
    // rachaduras de fogo
    g.shadowColor = '#ff6a1e';
    g.shadowBlur = 5;
    g.lineWidth = 1.4;
    for (let i = 0; i < 22; i++) {
      let x = r() * (larg - 10);
      let y = 50 + r() * 520;
      g.strokeStyle = `rgba(255,${120 + Math.floor(r() * 90)},40,${0.6 + r() * 0.4})`;
      g.beginPath();
      g.moveTo(x, y);
      for (let k = 0; k < 6; k++) { x += (r() - 0.45) * 18; y += (r() - 0.5) * 22; g.lineTo(x, y); }
      g.stroke();
    }
    // cidades em chamas
    g.shadowBlur = 0;
    g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 20; i++) {
      const x = r() * (larg - 14);
      const y = 60 + r() * 500;
      clarao(g, x, y, 8 + r() * 13, 0.7, '255,120,40');
      g.fillStyle = 'rgba(255,220,150,.9)';
      for (let k = 0; k < 6; k++) g.fillRect(x + (r() - 0.5) * 14, y + (r() - 0.5) * 12, 1, 1);
    }
    g.globalCompositeOperation = 'source-over';
    // sombra do lado de fora
    const sombra = g.createLinearGradient(0, 0, larg, 0);
    sombra.addColorStop(0, 'rgba(2,2,10,.75)');
    sombra.addColorStop(1, 'rgba(2,2,10,0)');
    g.fillStyle = sombra;
    g.fillRect(0, 0, larg, 620);
    g.restore();
    // linha fina de atmosfera
    g.strokeStyle = 'rgba(255,170,110,.55)';
    g.lineWidth = 1.4;
    g.beginPath(); g.arc(cx, cy, R - 0.7, -1.1, 1.1); g.stroke();
    return s;
  });
}

function cenarioPlaneta(g, t, mov) {
  const s = planeta();
  g.drawImage(s.c, 0, PLANETA.cy - 310, s.l, s.a);
  // duas naves alienígenas bombardeando
  const naves = [[306, 180, 0.6], [322, 440, 0.46]];
  const a = cruzador(true);
  for (const [x, y, e] of naves) {
    g.globalAlpha = 0.9;
    g.drawImage(a.c, x - (a.l * e) / 2, y - (a.a * e) / 2 + Math.sin(t * 0.5 + x) * 3, a.l * e, a.a * e);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 8; i++) {
    const per = 1.5 + i * 0.4;
    const u = t * (0.4 + 0.6 * mov) / per + i * 0.37;
    const k = Math.floor(u);
    const f = u - k;
    const ang = (ruido(i, k) - 0.5) * 1.7;
    const dist = PLANETA.r * (0.62 + 0.34 * ruido(k, i + 3));
    const x = PLANETA.cx + Math.cos(ang) * dist;
    const y = PLANETA.cy + Math.sin(ang) * dist;
    if (x < 3) continue;
    if (f < 0.1) {
      const [nx, ny, ne] = naves[i % 2];
      g.strokeStyle = `rgba(150,255,110,${0.75 * (1 - f / 0.1)})`;
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(nx - 80 * ne, ny);
      g.lineTo(x, y);
      g.stroke();
    }
    if (f < 0.5) clarao(g, x, y, 7 + 30 * (f / 0.5), 0.95 * (1 - f / 0.5), '255,130,50');
  }
  g.globalCompositeOperation = 'source-over';
}

/* ---------- batalha de frotas ---------- */

const FROTA = [
  // alien?, x do centro, y inicial, escala
  [false, 78, 60, 1.05], [true, 284, 250, 1.05], [false, 96, 520, 0.72], [true, 272, 730, 0.8], [false, 60, 940, 0.6],
];
const PERIODO_FROTA = ALT + 140;

function cenarioFrota(g, t, mov) {
  const pos = FROTA.map(([alien, x, y0, e]) => ({ alien, x, e, y: TOPO - 70 + volta(y0 + t * 8 * mov, PERIODO_FROTA) }));
  for (const p of pos) {
    const s = cruzador(p.alien);
    g.globalAlpha = 0.8;
    g.drawImage(s.c, p.x - (s.l * p.e) / 2, p.y - (s.a * p.e) / 2, s.l * p.e, s.a * p.e);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'lighter';
  // incêndios nos cascos atingidos
  pos.forEach((p, i) => {
    for (let k = 0; k < 2; k++) {
      const x = p.x + (ruido(i, k + 40) - 0.5) * 90 * p.e;
      const y = p.y + (ruido(k + 40, i) - 0.5) * 22 * p.e;
      clarao(g, x, y, (7 + 3 * Math.sin(t * 8 + i * 3 + k)) * p.e, 0.55 + 0.25 * Math.sin(t * 11 + i + k * 2), '255,120,40');
    }
  });
  // troca de tiros entre as duas frotas
  const duelos = [[0, 1], [1, 0], [2, 3], [3, 2], [2, 1], [3, 4], [4, 3], [1, 2]];
  duelos.forEach(([de, para], i) => {
    const per = 1.0 + i * 0.23;
    const u = t / per + i * 0.61;
    const k = Math.floor(u);
    const f = u - k;
    const a = pos[de];
    const b = pos[para];
    if (Math.abs(a.y - b.y) > 330) return;
    const x1 = a.x + (a.alien ? -1 : 1) * 60 * a.e;
    const y1 = a.y + (ruido(i, k) - 0.5) * 24 * a.e;
    const x2 = b.x + (b.alien ? -1 : 1) * (ruido(k, i) * 50) * b.e;
    const y2 = b.y + (ruido(k, i + 9) - 0.5) * 30 * b.e;
    if (f < 0.2) {
      g.strokeStyle = a.alien ? `rgba(150,255,110,${0.85 * (1 - f / 0.2)})` : `rgba(120,205,255,${0.85 * (1 - f / 0.2)})`;
      g.lineWidth = 2;
      g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
    }
    if (f < 0.45) clarao(g, x2, y2, 6 + 24 * (f / 0.45), 0.9 * (1 - f / 0.45), a.alien ? '255,150,70' : '255,190,120');
  });
  g.globalCompositeOperation = 'source-over';
}

/* ---------- cemitério de naves ---------- */

const DESTROCOS = [
  // alien?, lado, x, y inicial, escala, giro inicial, velocidade do giro, velocidade de descida
  [false, 1, 215, 380, 2.1, 0.35, 0.006, 5],
  [false, 0, 80, 40, 0.7, 0.5, 0.05, 9], [true, 1, 290, 300, 0.66, -0.8, -0.04, 9],
  [false, 1, 250, 620, 0.6, 2.2, 0.06, 9], [true, 0, 60, 860, 0.64, 1.2, -0.05, 9],
  [true, 0, 250, 100, 1.05, -0.4, 0.035, 19], [false, 1, 70, 480, 1.1, 0.9, -0.03, 19], [false, 0, 300, 900, 0.95, 2.8, 0.04, 19],
];
const PERIODO_DESTROCOS = ALT + 240;
const ESTILHACOS = [];
{
  const r = sorteio(91);
  for (let i = 0; i < 46; i++) ESTILHACOS.push({ x: r() * W, y: r() * ALT, v: 24 + r() * 30, l: 1 + r() * 2.4, a: 0.25 + r() * 0.4 });
}

function cenarioCemiterio(g, t, mov) {
  DESTROCOS.forEach(([alien, lado, x, y0, e, giro, vGiro, v], i) => {
    const s = destroco(alien, lado);
    const y = TOPO - 120 + volta(y0 + t * v * mov, PERIODO_DESTROCOS);
    g.save();
    g.translate(x, y);
    g.rotate(giro + t * vGiro);
    g.scale(e, e);
    g.globalAlpha = v > 10 ? 1 : v > 6 ? 0.85 : 0.55;
    g.drawImage(s.c, -s.l / 2, -s.a / 2, s.l, s.a);
    // brasa que ainda queima na parte arrancada
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = 1;
    clarao(g, s.brasa[0] - s.l / 2, s.brasa[1] - s.a / 2, 12 + 4 * Math.sin(t * 9 + i * 2), 0.65 + 0.25 * Math.sin(t * 13 + i), '255,120,40');
    clarao(g, s.brasa[0] - s.l / 2 + (lado ? -22 : 22), s.a * 0.2 * (i % 2 ? 1 : -1), 7 + 3 * Math.sin(t * 7 + i), 0.5 + 0.25 * Math.sin(t * 10 + i * 3), '255,150,60');
    g.restore();
  });
  ESTILHACOS.forEach((p, i) => {
    // um em cada quatro estilhaços ainda está em brasa
    g.fillStyle = i % 4 ? '#9aa3c4' : '#ff9a40';
    g.globalAlpha = i % 4 ? p.a : 0.9;
    g.fillRect(p.x, TOPO + volta(p.y + t * p.v * mov, ALT), p.l, p.l * 0.6);
  });
  g.globalAlpha = 1;
}

/* ---------- lua partida e asteroides ---------- */

function pedra(g, cx, cy, raio, sem, claro = '#4c4560', escuro = '#17141f') {
  const r = sorteio(sem);
  const pts = [];
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU;
    const d = raio * (0.72 + r() * 0.34);
    pts.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]);
  }
  const gr = g.createLinearGradient(cx - raio, cy - raio, cx + raio, cy + raio);
  gr.addColorStop(0, claro);
  gr.addColorStop(1, escuro);
  poligono(g, pts);
  g.fillStyle = gr;
  g.fill();
  g.strokeStyle = 'rgba(0,0,0,.55)';
  g.lineWidth = 1;
  g.stroke();
  g.fillStyle = 'rgba(0,0,0,.28)';
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.ellipse(cx + (r() - 0.5) * raio, cy + (r() - 0.5) * raio, raio * (0.1 + r() * 0.14), raio * (0.07 + r() * 0.1), r() * 3, 0, TAU);
    g.fill();
  }
}

function lua() {
  return guardado('lua', () => {
    const s = tela(300, 300);
    const g = s.g;
    const cx = 130;
    const cy = 130;
    const R = 100;
    g.save();
    g.shadowColor = 'rgba(255,90,40,.6)';
    g.shadowBlur = 16;
    g.fillStyle = '#1c1826';
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill();
    g.restore();
    g.save();
    g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.clip();
    const base = g.createRadialGradient(cx - 40, cy - 45, 10, cx, cy, R);
    base.addColorStop(0, '#5a5270');
    base.addColorStop(0.6, '#352f48');
    base.addColorStop(1, '#14111e');
    g.fillStyle = base;
    g.fillRect(0, 0, 300, 300);
    const r = sorteio(42);
    for (let i = 0; i < 14; i++) {
      const x = 40 + r() * 180;
      const y = 40 + r() * 180;
      const rr = 5 + r() * 13;
      g.fillStyle = 'rgba(8,6,16,.5)';
      g.beginPath(); g.arc(x, y, rr, 0, TAU); g.fill();
      g.strokeStyle = 'rgba(160,150,190,.25)';
      g.lineWidth = 1;
      g.beginPath(); g.arc(x, y, rr, 2.4, 5.2); g.stroke();
    }
    // a ferida: um rasgo do centro até a borda, com o interior em brasa
    const rasgo = [[cx - 8, cy - 14], [cx + 30, cy - 6], [cx + 62, cy + 18], [cx + 110, cy + 30], [cx + 110, cy + 110], [cx + 40, cy + 110], [cx + 52, cy + 62], [cx + 22, cy + 40], [cx + 4, cy + 12]];
    const brasa = g.createRadialGradient(cx + 30, cy + 30, 4, cx + 50, cy + 50, 90);
    brasa.addColorStop(0, '#ffe1a0');
    brasa.addColorStop(0.3, '#ff8a2a');
    brasa.addColorStop(1, '#7a1408');
    poligono(g, rasgo);
    g.fillStyle = brasa;
    g.fill();
    g.strokeStyle = 'rgba(20,6,6,.8)';
    g.lineWidth = 3;
    g.stroke();
    g.strokeStyle = 'rgba(255,150,60,.7)';
    g.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      let x = cx + (r() - 0.3) * 40;
      let y = cy + (r() - 0.3) * 40;
      g.beginPath(); g.moveTo(x, y);
      for (let k = 0; k < 5; k++) { x += (r() - 0.5) * 26; y += (r() - 0.5) * 26; g.lineTo(x, y); }
      g.stroke();
    }
    g.restore();
    // pedaços arrancados, se afastando
    [[218, 190, 20, 3], [246, 232, 14, 8], [196, 238, 17, 13], [262, 182, 9, 21], [232, 268, 10, 34], [276, 244, 7, 55]]
      .forEach(([x, y, raio, sem]) => pedra(g, x, y, raio, sem, '#5a5270', '#1a1626'));
    return s;
  });
}

function asteroide(i) {
  return guardado(`asteroide-${i}`, () => {
    const s = tela(48, 48);
    pedra(s.g, 24, 24, 20, 100 + i * 17, '#474058', '#131019');
    return s;
  });
}

const ASTEROIDES = [];
{
  const r = sorteio(303);
  for (let i = 0; i < 9; i++) ASTEROIDES.push({ x: r() * W, y: r() * ALT, e: 0.3 + r() * 0.3, v: 11, g: r() * 6, vg: (r() - 0.5) * 0.3, s: i % 5, a: 0.7 });
  for (let i = 0; i < 5; i++) ASTEROIDES.push({ x: r() * W, y: r() * ALT, e: 0.6 + r() * 0.35, v: 24, g: r() * 6, vg: (r() - 0.5) * 0.4, s: (i + 2) % 5, a: 0.85 });
}
const PERIODO_ASTEROIDES = ALT + 60;

function cenarioLua(g, t, mov) {
  const s = lua();
  g.drawImage(s.c, 305 - 130, 405 - 130 + Math.sin(t * 0.25) * 3, s.l, s.a);
  g.globalCompositeOperation = 'lighter';
  clarao(g, 345, 445, 34 + 5 * Math.sin(t * 1.7), 0.22 + 0.08 * Math.sin(t * 2.3), '255,120,50');
  g.globalCompositeOperation = 'source-over';
  for (const a of ASTEROIDES) {
    const sp = asteroide(a.s);
    g.save();
    g.translate(a.x, TOPO - 30 + volta(a.y + t * a.v * mov, PERIODO_ASTEROIDES));
    g.rotate(a.g + t * a.vg);
    g.globalAlpha = a.a;
    g.drawImage(sp.c, -24 * a.e, -24 * a.e, 48 * a.e, 48 * a.e);
    g.restore();
  }
  g.globalAlpha = 1;
}

/* ---------- os quatro cenários ---------- */

export const CENARIOS = [
  {
    nome: 'Órbita em chamas',
    ceu: ['#04051a', '#0e0a2c', '#2a0d1e', '#3a1218'],
    nevoa: [[250, 80, 240, '150,50,40', 0.2], [300, 520, 230, '255,90,40', 0.13], [120, 800, 220, '110,60,200', 0.14]],
    desenhar: cenarioPlaneta,
    semente: 3,
  },
  {
    nome: 'Batalha das frotas',
    ceu: ['#030718', '#07143a', '#0b1c44', '#150f3c'],
    nevoa: [[80, 120, 230, '40,110,255', 0.2], [300, 420, 240, '0,190,220', 0.14], [100, 760, 230, '120,70,255', 0.16]],
    desenhar: cenarioFrota,
    semente: 17,
  },
  {
    nome: 'Cemitério de naves',
    ceu: ['#060b16', '#0e1c2c', '#1c2a30', '#2c1c14'],
    nevoa: [[90, 160, 250, '70,130,150', 0.24], [290, 480, 250, '230,110,40', 0.2], [140, 820, 240, '200,80,40', 0.16]],
    desenhar: cenarioCemiterio,
    semente: 29,
  },
  {
    nome: 'Lua partida',
    ceu: ['#080418', '#1a0a30', '#2c0c2c', '#160a24'],
    nevoa: [[300, 420, 250, '255,80,60', 0.15], [70, 160, 230, '150,60,220', 0.18], [200, 820, 240, '90,50,170', 0.16]],
    desenhar: cenarioLua,
    semente: 41,
  },
];

// Desenha o cenário `indice` inteiro (de TOPO a BASE, na largura do campo).
// `mov` é quanto o cenário anda: 1 na partida, menos nos menus, 0 parado.
export function desenharCenario(g, t, indice, mov = 1) {
  const c = CENARIOS[indice % CENARIOS.length];
  ceu(g, c.ceu);
  const n = guardado(`nevoa-${indice}`, () => nevoa(c.nevoa));
  const desl = volta(t * 6 * mov, ALT);
  g.drawImage(n, 0, TOPO + desl, W, ALT);
  g.drawImage(n, 0, TOPO + desl - ALT, W, ALT);
  estrelas(g, t, mov);
  c.desenhar(g, t, mov);
  g.globalCompositeOperation = 'lighter';
  claroesAoLonge(g, t, 9, c.semente);
  rajadas(g, t, 8, c.semente);
  g.globalCompositeOperation = 'source-over';
  // véu escuro: empurra o cenário para trás das naves e dos tiros
  g.fillStyle = 'rgba(3,4,16,.2)';
  g.fillRect(0, TOPO, W, ALT);
}
