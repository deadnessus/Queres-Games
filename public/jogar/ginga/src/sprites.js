// Jogadores e bola vistos de cima, em ângulo: bonecos em pé desenhados direto no canvas (sem imagens).
// Coordenadas do boneco: origem nos PÉS (no chão), y negativo = para cima, x negativo = esquerda da tela.
// O jogador aparece de costas (corre para o gol); os adversários aparecem de frente (encaram o jogador).
const TAU = Math.PI * 2;
const CONTORNO = 'rgba(5,22,11,0.66)';

export const ALTURA = 48; // dos pés ao topo da cabeça
export const PE = 24; // do centro do corpo até os pés

const FONTE_NUMERO = '800 12px "Saira Extra Condensed", "Barlow Condensed", "Arial Narrow", sans-serif';

export const KITS = {
  jogador: { camisa: '#FFD23F', sombra: '#D39A04', brilho: '#FFE680', detalhe: '#1E8B4C', calcao: '#1F57B8', meia: '#F4F7F2', padrao: 'faixa' },
  defensor: { camisa: '#D7263D', sombra: '#8F1024', brilho: '#F2606F', detalhe: '#FFFFFF', calcao: '#20262F', meia: '#D7263D', padrao: 'listras' },
  goleiro: { camisa: '#8E5BE0', sombra: '#5E32AE', brilho: '#B691F2', detalhe: '#C8FF4D', calcao: '#1B1330', meia: '#6C3FC0', padrao: 'faixa', luva: '#E4FF6E' },
};

const PELES = ['#F3CDA8', '#E0A878', '#C58A5B', '#A06A42', '#6F4528'];
const CABELOS = ['#16110D', '#2E1D12', '#5A3A1E', '#C9A24A', '#8E3418', null];
const CHUTEIRAS = ['#101418', '#F4F4F4', '#FF7A2F', '#2F7BFF', '#101418'];

function hash(n) {
  n = (n ^ 61) ^ (n >>> 16);
  n = Math.imul(n, 9);
  n ^= n >>> 4;
  n = Math.imul(n, 0x27d4eb2d);
  n ^= n >>> 15;
  return n >>> 0;
}

export function aparencia(id) {
  const h = hash(id + 7);
  return {
    pele: PELES[h % PELES.length],
    cabelo: CABELOS[(h >>> 8) % CABELOS.length],
    chuteira: CHUTEIRAS[(h >>> 16) % CHUTEIRAS.length],
    barba: (h >>> 22) % 4 === 0,
  };
}

export const APARENCIA_JOGADOR = { pele: '#C58A5B', cabelo: '#16110D', chuteira: '#101418', barba: false };
export const APARENCIA_GOLEIRO = { pele: '#E0A878', cabelo: '#2E1D12', chuteira: '#C8FF4D', barba: true };

// ---------- poses ----------
// [peE x,y, peD x,y, maoE x,y, maoD x,y, agacha 0..1, inclina (rad), cabeça dx, cabeça dy]
// Pés no chão ficam em y = 0; mãos e pés em coordenadas do boneco (origem nos pés).

export const POSE = {
  parado: [-5, 0, 5, 0, -14.5, -18, 14.5, -18, 0, 0, 0, 0],
  jockey: [-7, -1, 7, 1, -18, -27, 18, -27, 0.28, 0, 0, 1],
  abertas: [-12.5, 1, 12.5, 1, -23, -34, 23, -34, 0.42, 0, 0, 3],
  passoE: [-16, -1, 3.5, 0, -23, -23, 15, -27, 0.28, -0.3, -1.5, 1], // leva o corpo para a ESQUERDA da tela
  passoD: [-3.5, 0, 16, -1, -15, -27, 23, -23, 0.28, 0.3, 1.5, 1], // leva o corpo para a DIREITA da tela
  empe: [-6.5, 0, 6.5, 0, -24, -39, 24, -39, 0.18, 0, 0, 0],
  esticado: [-3.5, 0, 3.5, 0, -7, -54, 7, -54, 0, 0, 0, -1],
  // desarme: estica uma perna para o lado da bola e fecha a passagem
  bloqueioD: [-6, 0, 24, -4, -18, -24, 22, -30, 0.38, 0.2, 2.5, 1],
  bloqueioE: [-24, -4, 6, 0, -22, -30, 18, -24, 0.38, -0.2, -2.5, 1],
};

// Corrida vista de costas: o pé que vai à frente sobe; os braços balançam ao contrário das pernas.
export function poseCorrida(fase, amp) {
  const s = Math.sin(fase) * amp;
  const subE = Math.max(0, s);
  const subD = Math.max(0, -s);
  return [
    -5.4, -s * 4.2 - subE * 3.4,
    5.4, s * 4.2 - subD * 3.4,
    -13.5, -19 + s * 5, 13.5, -19 - s * 5,
    -Math.abs(Math.cos(fase)) * 0.1 * amp, Math.sin(fase) * 0.05 * amp, 0, 0,
  ];
}

export function misturar(a, b, u) {
  if (u <= 0) return a;
  if (u >= 1) return b;
  return a.map((v, i) => v + (b[i] - v) * u);
}

// ---------- peças ----------

function traco(ctx, x1, y1, x2, y2, largura, cor) {
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineWidth = largura + 1.4;
  ctx.strokeStyle = CONTORNO;
  ctx.stroke();
  ctx.lineWidth = largura;
  ctx.strokeStyle = cor;
  ctx.stroke();
}

function circulo(ctx, x, y, r, cor, contorno = true) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = cor;
  ctx.fill();
  if (contorno) {
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = CONTORNO;
    ctx.stroke();
  }
}

function retArr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

function chuteira(ctx, x, y, lado, ap) {
  ctx.beginPath();
  ctx.ellipse(x + lado * 0.4, y - 0.6, 5.4, 3.3, 0, 0, TAU);
  ctx.fillStyle = ap.chuteira;
  ctx.fill();
  ctx.lineWidth = 0.9;
  ctx.strokeStyle = CONTORNO;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(x - lado * 0.9, y - 1.5, 2.3, 0.9, -0.15, 0, TAU);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.fill();
}

function perna(ctx, kit, ap, qx, qy, px, py, agacha, lado) {
  const kx = (qx + px) / 2 + lado * agacha * 3.6;
  const ky = (qy + py) / 2 - agacha * 0.6;
  traco(ctx, qx, qy, kx, ky, 7.2, kit.calcao);
  traco(ctx, kx, ky, px, py - 1.8, 5.6, kit.meia);
  chuteira(ctx, px, py, lado, ap);
}

function caminhoTronco(ctx, b) {
  ctx.beginPath();
  ctx.moveTo(-9.6, -33 + b);
  ctx.quadraticCurveTo(0, -35.8 + b, 9.6, -33 + b);
  ctx.quadraticCurveTo(13.2, -32.4 + b, 12.6, -27.5 + b);
  ctx.lineTo(9.4, -15.6 + b);
  ctx.quadraticCurveTo(0, -13.8 + b, -9.4, -15.6 + b);
  ctx.lineTo(-12.6, -27.5 + b);
  ctx.quadraticCurveTo(-13.2, -32.4 + b, -9.6, -33 + b);
  ctx.closePath();
}

function tronco(ctx, kit, ap, vista, b, numero) {
  const g = ctx.createLinearGradient(-13, 0, 13, 0);
  g.addColorStop(0, kit.sombra);
  g.addColorStop(0.3, kit.camisa);
  g.addColorStop(0.7, kit.camisa);
  g.addColorStop(1, kit.sombra);
  caminhoTronco(ctx, b);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.save();
  ctx.clip();
  const topo = ctx.createLinearGradient(0, -36 + b, 0, -14 + b);
  topo.addColorStop(0, 'rgba(255,255,255,0.22)');
  topo.addColorStop(0.35, 'rgba(255,255,255,0)');
  topo.addColorStop(1, 'rgba(0,0,0,0.2)');
  ctx.fillStyle = topo;
  ctx.fillRect(-14, -36 + b, 28, 24);
  if (kit.padrao === 'listras') {
    ctx.fillStyle = kit.detalhe;
    ctx.globalAlpha = 0.6;
    for (const x of [-8.4, -3.2, 2, 7.2]) ctx.fillRect(x, -36 + b, 2.3, 24);
    ctx.globalAlpha = 1;
  } else {
    ctx.fillStyle = kit.detalhe;
    ctx.fillRect(-14, -33.4 + b, 28, 2.6);
  }
  ctx.restore();
  caminhoTronco(ctx, b);
  ctx.lineWidth = 1;
  ctx.strokeStyle = CONTORNO;
  ctx.stroke();
  if (vista === 'costas' && numero) {
    ctx.save();
    ctx.font = FONTE_NUMERO;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = kit.detalhe;
    ctx.fillText(numero, 0, -19.4 + b);
    ctx.restore();
  } else if (vista === 'frente') {
    ctx.beginPath();
    ctx.moveTo(-3.6, -33.6 + b);
    ctx.lineTo(0, -28.6 + b);
    ctx.lineTo(3.6, -33.6 + b);
    ctx.fillStyle = ap.pele;
    ctx.fill();
    circulo(ctx, -6, -25.5 + b, 1.7, kit.detalhe, false);
  }
}

function braco(ctx, kit, ap, sx, sy, mx, my, lado, luvas) {
  const ex = (sx + mx) / 2 + lado * 2.4;
  const ey = (sy + my) / 2 + 1.4;
  traco(ctx, sx, sy, ex, ey, 6, kit.camisa);
  traco(ctx, ex, ey, mx, my, 4.4, ap.pele);
  if (luvas) {
    circulo(ctx, mx, my, 4.6, kit.luva);
    ctx.beginPath();
    ctx.arc(mx, my, 2.4, 0, TAU);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();
  } else {
    circulo(ctx, mx, my, 3, ap.pele);
  }
}

function cabeca(ctx, ap, vista, cx, cy) {
  ctx.fillStyle = ap.pele;
  retArr(ctx, cx - 3.6, cy + 6, 7.2, 5.5, 2);
  ctx.fill();
  circulo(ctx, cx - 8.2, cy + 1.2, 2.3, ap.pele);
  circulo(ctx, cx + 8.2, cy + 1.2, 2.3, ap.pele);
  if (vista === 'costas') {
    circulo(ctx, cx, cy, 8.4, ap.cabelo || ap.pele);
    if (!ap.cabelo) circulo(ctx, cx, cy + 0.6, 7.6, 'rgba(0,0,0,0.14)', false);
    ctx.beginPath();
    ctx.arc(cx - 1.6, cy - 2, 5, Math.PI * 1.08, Math.PI * 1.72);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(255,255,255,0.26)';
    ctx.stroke();
    return;
  }
  circulo(ctx, cx, cy, 8.2, ap.pele);
  ctx.beginPath();
  ctx.ellipse(cx - 2.6, cy - 2.2, 4.2, 2.6, -0.4, 0, TAU);
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.fill();
  if (ap.barba) {
    ctx.beginPath();
    ctx.arc(cx, cy, 8.2, Math.PI * 0.08, Math.PI * 0.92);
    ctx.quadraticCurveTo(cx, cy + 3.2, cx + 8, cy + 1.6);
    ctx.closePath();
    ctx.fillStyle = 'rgba(32,20,14,0.6)';
    ctx.fill();
  }
  if (ap.cabelo) {
    ctx.beginPath();
    ctx.arc(cx, cy, 8.6, Math.PI * 0.97, Math.PI * 2.03);
    ctx.quadraticCurveTo(cx + 6, cy - 4.6, cx + 2.2, cy - 3.8);
    ctx.quadraticCurveTo(cx - 1.4, cy - 5.6, cx - 8.4, cy - 0.6);
    ctx.closePath();
    ctx.fillStyle = ap.cabelo;
    ctx.fill();
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = CONTORNO;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 1.2, cy - 2.6, 5.4, Math.PI * 1.1, Math.PI * 1.6);
    ctx.lineWidth = 1.3;
    ctx.strokeStyle = 'rgba(255,255,255,0.28)';
    ctx.stroke();
  }
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.ellipse(cx + s * 3.4, cy + 1.4, 1.9, 2.3, 0, 0, TAU);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    circulo(ctx, cx + s * 3.4, cy + 1.9, 1.15, '#1B130E', false);
    ctx.beginPath();
    ctx.moveTo(cx + s * 5.9, cy - 1.3);
    ctx.lineTo(cx + s * 1.5, cy - 0.1);
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = ap.cabelo || '#2E1D12';
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.ellipse(cx, cy + 3.8, 1.2, 0.9, 0, 0, TAU);
  ctx.fillStyle = 'rgba(70,30,15,0.28)';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx - 2, cy + 6);
  ctx.lineTo(cx + 2, cy + 6);
  ctx.lineWidth = 1.3;
  ctx.strokeStyle = '#5A2A1A';
  ctx.stroke();
}

function sombraNoChao(ctx, escala, rx, ry) {
  ctx.fillStyle = 'rgba(0,18,6,0.34)';
  ctx.beginPath();
  ctx.ellipse(3 * escala, 1.5 * escala, rx * escala, ry * escala, 0, 0, TAU);
  ctx.fill();
}

// o: { x, y (pés), vista 'costas'|'frente', escala, esticar, rot, kit, aparencia, pose, luvas, numero, sombra, alpha, incl }
export function desenharBoneco(ctx, o) {
  const { x, y, vista = 'frente', escala = 1, esticar = 1, rot = 0, kit, aparencia: ap, pose, luvas = false, numero = null, sombra = true, alpha = 1, incl } = o;
  const [peEx, peEy, peDx, peDy, mEx, mEy, mDx, mDy, agacha = 0, inclPose = 0, cdx = 0, cdy = 0] = pose;
  const inclina = incl !== undefined ? incl : inclPose;
  const b = agacha * 6;
  ctx.save();
  if (alpha < 1) ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  if (sombra) sombraNoChao(ctx, escala, 14, 5.4);
  ctx.translate(0, -PE * escala);
  ctx.rotate(rot);
  ctx.translate(0, PE * escala);
  ctx.scale(escala, escala * esticar);
  const quadril = -15 + b;
  perna(ctx, kit, ap, -4.8, quadril, peEx, peEy, agacha, -1);
  perna(ctx, kit, ap, 4.8, quadril, peDx, peDy, agacha, 1);
  retArr(ctx, -10, quadril - 6, 20, 12.5, 3.4);
  ctx.fillStyle = kit.calcao;
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = CONTORNO;
  ctx.stroke();
  ctx.save();
  ctx.translate(0, quadril);
  ctx.rotate(inclina);
  ctx.translate(0, -quadril);
  if (vista === 'costas') {
    braco(ctx, kit, ap, -11.8, -31 + b, mEx, mEy + b, -1, luvas);
    braco(ctx, kit, ap, 11.8, -31 + b, mDx, mDy + b, 1, luvas);
    tronco(ctx, kit, ap, vista, b, numero);
  } else {
    tronco(ctx, kit, ap, vista, b, numero);
    braco(ctx, kit, ap, -11.8, -31 + b, mEx, mEy + b, -1, luvas);
    braco(ctx, kit, ap, 11.8, -31 + b, mDx, mDy + b, 1, luvas);
  }
  cabeca(ctx, ap, vista, cdx, -40 + b + cdy);
  ctx.restore();
  ctx.restore();
}

// Personagem deitado: 'carrinho' (desliza com a perna esticada na direção da bola) e
// 'abafa' (goleiro se jogando nos pés, braços à frente). (x, y) é o CENTRO do corpo.
export function desenharDeitado(ctx, o) {
  const { x, y, modo = 'carrinho', escala = 1, kit, aparencia: ap, luvas = false, alpha = 1 } = o;
  ctx.save();
  if (alpha < 1) ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,18,6,0.30)';
  ctx.beginPath();
  ctx.ellipse(3 * escala, 8 * escala, 15 * escala, 29 * escala, 0, 0, TAU);
  ctx.fill();
  ctx.scale(escala, escala);
  const lisos = (x1, y1, x2, y2, x3, y3, lado) => {
    traco(ctx, x1, y1, x2, y2, 7.2, kit.calcao);
    traco(ctx, x2, y2, x3, y3, 5.6, kit.meia);
    chuteira(ctx, x3, y3, lado, ap);
  };
  const caixa = (cx, cy, w, h, rot) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    const g = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
    g.addColorStop(0, kit.sombra);
    g.addColorStop(0.3, kit.camisa);
    g.addColorStop(0.7, kit.camisa);
    g.addColorStop(1, kit.sombra);
    retArr(ctx, -w / 2, -h / 2, w, h, 7);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.fillStyle = kit.detalhe;
    if (kit.padrao === 'listras') {
      ctx.globalAlpha = 0.6;
      for (let i = -w / 2 + 3; i < w / 2; i += 5.2) ctx.fillRect(i, -h / 2, 2.3, h);
      ctx.globalAlpha = 1;
    } else {
      ctx.fillRect(-w / 2, -h / 2 + 2, w, 2.6);
    }
    ctx.restore();
    retArr(ctx, -w / 2, -h / 2, w, h, 7);
    ctx.lineWidth = 1;
    ctx.strokeStyle = CONTORNO;
    ctx.stroke();
    ctx.restore();
  };
  if (modo === 'abafa') {
    lisos(-4.5, -7, -5.5, -17, -7, -27, -1);
    lisos(4.5, -7, 5.5, -16, 6.5, -25, 1);
    retArr(ctx, -10.5, -9, 21, 12, 4);
    ctx.fillStyle = kit.calcao;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = CONTORNO;
    ctx.stroke();
    caixa(0, 3, 23, 19, 0);
    cabeca(ctx, ap, 'frente', 0, 17);
    braco(ctx, kit, ap, -11, 7, -9.5, 31, -1, luvas);
    braco(ctx, kit, ap, 11, 7, 9.5, 31, 1, luvas);
  } else {
    lisos(5, 6, 13, 0, 8, 12, 1);
    lisos(-2.5, 7, -3.5, 19, -4.5, 31, -1);
    retArr(ctx, -10, 3, 20, 10, 3.4);
    ctx.fillStyle = kit.calcao;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = CONTORNO;
    ctx.stroke();
    caixa(0.5, -6, 22, 21, 0.06);
    braco(ctx, kit, ap, -11, -13, -20, -3, -1, luvas);
    braco(ctx, kit, ap, 11, -13, 19, -20, 1, luvas);
    cabeca(ctx, ap, 'frente', 1.5, -26);
  }
  ctx.restore();
}

// ---------- bola ----------

export const RAIO_BOLA = 5.2;
const ESC_BOLA = 1.35; // a bola é desenhada um pouco maior que o real, para ler bem no celular

// px = pixels por unidade do mundo. A bola é pré-desenhada uma vez e girada a cada quadro.
export function criarSpriteBola(px) {
  const r = RAIO_BOLA;
  const lado = Math.ceil((r * 2 + 2) * px);
  const c = document.createElement('canvas');
  c.width = lado;
  c.height = lado;
  const g = c.getContext('2d');
  g.scale(px, px);
  const cx = lado / px / 2;
  const cy = cx;
  const grad = g.createRadialGradient(cx - 1.6, cy - 1.8, 0.4, cx, cy, r);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.65, '#EEF2F3');
  grad.addColorStop(1, '#B6C1C5');
  g.beginPath();
  g.arc(cx, cy, r, 0, TAU);
  g.fillStyle = grad;
  g.fill();
  g.save();
  g.clip();
  const pent = (x, y, raio, rot) => {
    g.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = rot + (i * TAU) / 5;
      const px2 = x + Math.cos(a) * raio;
      const py2 = y + Math.sin(a) * raio;
      if (i === 0) g.moveTo(px2, py2);
      else g.lineTo(px2, py2);
    }
    g.closePath();
    g.fill();
  };
  g.strokeStyle = 'rgba(70,80,86,0.55)';
  g.lineWidth = 0.5;
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * TAU) / 5;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * 2, cy + Math.sin(a) * 2);
    g.lineTo(cx + Math.cos(a) * 4.4, cy + Math.sin(a) * 4.4);
    g.stroke();
  }
  g.fillStyle = '#161B1F';
  pent(cx, cy, 2.1, -Math.PI / 2);
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * TAU) / 5 + TAU / 10;
    pent(cx + Math.cos(a) * 5.6, cy + Math.sin(a) * 5.6, 2.3, a + Math.PI);
  }
  g.restore();
  g.beginPath();
  g.arc(cx, cy, r, 0, TAU);
  g.lineWidth = 0.8;
  g.strokeStyle = 'rgba(8,26,14,0.75)';
  g.stroke();
  return { canvas: c, lado: lado / px };
}

// alto: altura da bola no ar, em unidades (a sombra fica no chão).
export function desenharBola(ctx, sprite, x, y, { escala = 1, rot = 0, alto = 0 } = {}) {
  ctx.save();
  const sx = x + 1.5 + alto * 0.5;
  const sy = y + 2.4 + alto * 0.9;
  ctx.fillStyle = `rgba(0,18,6,${alto > 0.5 ? 0.22 : 0.32})`;
  ctx.beginPath();
  ctx.ellipse(sx, sy, RAIO_BOLA * 0.95 * ESC_BOLA * escala, RAIO_BOLA * 0.6 * ESC_BOLA * escala, 0, 0, TAU);
  ctx.fill();
  ctx.translate(x, y - alto);
  ctx.rotate(rot);
  ctx.scale(escala * ESC_BOLA, escala * ESC_BOLA);
  ctx.drawImage(sprite.canvas, -sprite.lado / 2, -sprite.lado / 2, sprite.lado, sprite.lado);
  ctx.restore();
}
