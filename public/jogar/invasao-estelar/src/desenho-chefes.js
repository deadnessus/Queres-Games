// Desenho dos chefões (canvas): Nave-mãe, Rainha Aranha e Olho Gigante, os avisos dos ataques deles e a barra de
// vida. A lógica fica em chefes.js; aqui só se desenha.
import * as L from './logica.js?v=11';
import { CHEFES } from './dados.js?v=11';
import { CASCO_NAVE_MAE, DURACAO_MORTE, vidaDoChefe } from './chefes.js?v=11';

const TAU = Math.PI * 2;
const FONTE = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

function brilho(g, x, y, r, cor, forca, halos) {
  if (halos) {
    const gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, rgba(cor, 0.9 * forca));
    gr.addColorStop(1, rgba(cor, 0));
    g.fillStyle = gr;
  } else {
    g.fillStyle = rgba(cor, 0.35 * forca);
    r *= 0.6;
  }
  g.beginPath();
  g.arc(x, y, r, 0, TAU);
  g.fill();
}

/* ---------- casco da nave-mãe (desenhado uma vez e guardado) ---------- */

let cascoGuardado = null;
let cascoEscala = 0;

function cascoNaveMae(escala) {
  if (cascoGuardado && cascoEscala === escala) return cascoGuardado;
  const l = 280;
  const a = 110;
  const c = document.createElement('canvas');
  c.width = Math.ceil(l * escala);
  c.height = Math.ceil(a * escala);
  const g = c.getContext('2d');
  g.scale(escala, escala);
  g.translate(l / 2, 70); // centro do chefão
  const k = CASCO_NAVE_MAE;
  // casco: um disco achatado, de metal escuro, com bordas vermelhas
  const corpo = g.createLinearGradient(0, -k.cima, 0, k.baixo);
  corpo.addColorStop(0, '#5a4a66');
  corpo.addColorStop(0.45, '#2e2338');
  corpo.addColorStop(1, '#140e1c');
  g.fillStyle = corpo;
  g.strokeStyle = '#0a0610';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(-62, -k.cima);
  g.lineTo(62, -k.cima);
  g.lineTo(112, -30);
  g.lineTo(k.larg, -10);
  g.lineTo(118, k.baixo);
  g.lineTo(-118, k.baixo);
  g.lineTo(-k.larg, -10);
  g.lineTo(-112, -30);
  g.closePath();
  g.fill();
  g.stroke();
  // faixa vermelha e painéis
  g.strokeStyle = 'rgba(255,106,76,.75)';
  g.lineWidth = 2;
  g.beginPath(); g.moveTo(-120, -12); g.lineTo(120, -12); g.stroke();
  g.strokeStyle = 'rgba(160,140,190,.25)';
  g.lineWidth = 1;
  for (const x of [-90, -60, -30, 30, 60, 90]) { g.beginPath(); g.moveTo(x, -40); g.lineTo(x * 1.08, -2); g.stroke(); }
  // cúpula de comando
  const cupula = g.createRadialGradient(0, -44, 2, 0, -40, 34);
  cupula.addColorStop(0, '#ffd0c0');
  cupula.addColorStop(0.35, '#ff6a4c');
  cupula.addColorStop(1, '#5a1410');
  g.fillStyle = cupula;
  g.strokeStyle = '#0a0610';
  g.lineWidth = 1.5;
  g.beginPath(); g.ellipse(0, -44, 34, 12, 0, Math.PI, TAU); g.closePath(); g.fill(); g.stroke();
  // luzes de posição
  for (const x of [-118, -96, -74, 74, 96, 118]) {
    g.fillStyle = '#ff8a6a';
    g.beginPath(); g.arc(x, -6, 1.8, 0, TAU); g.fill();
  }
  // escotilhas dos caças, perto do núcleo
  g.fillStyle = '#0d0912';
  g.strokeStyle = 'rgba(255,106,76,.5)';
  for (const s of [-1, 1]) {
    g.beginPath(); g.rect(s * 30 - 7, -6, 14, 7); g.fill(); g.stroke();
  }
  cascoGuardado = c;
  cascoEscala = escala;
  return c;
}

/* ---------- avisos e raios ---------- */

function linhaDeAviso(g, x, y0, k, t, cor = '#ff3b3b') {
  const forte = Math.floor(t * (10 + 14 * k)) % 2 === 0;
  g.save();
  g.strokeStyle = cor;
  g.globalAlpha = forte ? 1 : 0.45;
  g.lineWidth = 2.5 + 1.5 * k;
  g.setLineDash([10, 6]);
  g.beginPath(); g.moveTo(x, y0); g.lineTo(x, L.ALTURA + 400); g.stroke();
  g.setLineDash([]);
  g.fillStyle = cor;
  for (const lado of [-1, 1]) {
    g.beginPath();
    g.moveTo(x + lado * 9, L.Y_JOGADOR - 52);
    g.lineTo(x + lado * 20, L.Y_JOGADOR - 60);
    g.lineTo(x + lado * 20, L.Y_JOGADOR - 44);
    g.closePath();
    g.fill();
  }
  g.restore();
}

function raioVertical(g, x, yTopo, t, vista, halos) {
  const y1 = L.ALTURA + vista.ey;
  const tremida = 0.85 + 0.15 * Math.sin(t * 60);
  g.save();
  g.globalCompositeOperation = 'lighter';
  if (halos) {
    const gr = g.createLinearGradient(x - 20, 0, x + 20, 0);
    gr.addColorStop(0, 'rgba(255,40,40,0)');
    gr.addColorStop(0.5, `rgba(255,60,60,${0.6 * tremida})`);
    gr.addColorStop(1, 'rgba(255,40,40,0)');
    g.fillStyle = gr;
    g.fillRect(x - 20, yTopo, 40, y1 - yTopo);
  }
  g.fillStyle = `rgba(255,120,110,${0.9 * tremida})`;
  g.fillRect(x - L.RAIO_LARGURA / 2, yTopo, L.RAIO_LARGURA, y1 - yTopo);
  g.fillStyle = '#fff4f0';
  g.fillRect(x - 3, yTopo, 6, y1 - yTopo);
  g.restore();
}

/* ---------- nave-mãe ---------- */

function desenharNaveMae(g, c, x, y, t, escala, halos, vista) {
  const a = c.ataque;
  if (a && a.tipo === 'raio' && a.fase === 'aviso') linhaDeAviso(g, a.x, y + 34, 1 - a.t / 1.0, t);
  if (a && a.tipo === 'raio' && a.fase === 'ativo') raioVertical(g, a.x, y + 28, t, vista, halos);
  g.drawImage(cascoNaveMae(escala), x - 140, y - 70, 280, 110);
  // escotilhas brilhando: vai soltar caças
  if (c.chocando) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    for (const s of [-1, 1]) brilho(g, x + s * 30, y - 2, 16, '#ffb02e', 0.6 + 0.4 * Math.sin(t * 30), halos);
    g.restore();
  }
  for (const [i, pt] of c.partes.entries()) {
    const px = x + pt.dx;
    const py = y + pt.dy;
    if (pt.tipo === 'canhao') {
      if (!pt.viva) {
        // toco queimado
        g.fillStyle = '#1a1016';
        g.beginPath(); g.arc(px, py - 4, 9, 0, TAU); g.fill();
        g.fillStyle = 'rgba(255,120,40,.6)';
        g.beginPath(); g.arc(px, py - 4, 3 + Math.sin(t * 9 + i) * 1.2, 0, TAU); g.fill();
        continue;
      }
      const mirando = a && a.tipo === 'canhao' && a.parte === i && a.fase === 'aviso';
      g.fillStyle = pt.flash > 0 ? '#ffffff' : '#3a2c44';
      g.strokeStyle = '#ff6a4c';
      g.lineWidth = 2;
      g.beginPath(); g.arc(px, py - 3, pt.r - 3, 0, TAU); g.fill(); g.stroke();
      g.fillStyle = pt.flash > 0 ? '#ffffff' : '#57475f';
      g.fillRect(px - 3, py, 6, 16);
      // luzinha de vida do canhão
      g.fillStyle = pt.vida > pt.max / 2 ? '#7dff9a' : '#ffd45e';
      g.beginPath(); g.arc(px, py - 4, 3, 0, TAU); g.fill();
      if (mirando) {
        g.save();
        g.globalCompositeOperation = 'lighter';
        brilho(g, px, py + 18, 8 + 14 * (1 - a.t / 0.45), '#9dff3c', 1, halos);
        g.restore();
      }
    } else {
      const protegido = c.partes.some((q) => q.tipo === 'canhao' && q.viva);
      const pulsa = 0.8 + 0.2 * Math.sin(t * (protegido ? 4 : 10));
      g.save();
      g.globalCompositeOperation = 'lighter';
      brilho(g, px, py, pt.r * 1.6, protegido ? '#ffb02e' : '#ff3b3b', pulsa, halos);
      g.restore();
      g.fillStyle = pt.flash > 0 ? '#ffffff' : protegido ? '#ff9a3c' : '#ff4d5e';
      g.beginPath(); g.arc(px, py, pt.r * 0.62, 0, TAU); g.fill();
      g.fillStyle = '#fff2d8';
      g.beginPath(); g.arc(px, py, pt.r * 0.25, 0, TAU); g.fill();
      if (protegido) {
        // escudo do núcleo: só cai quando os canhões caem
        g.strokeStyle = `rgba(127,233,255,${0.55 + 0.25 * Math.sin(t * 5)})`;
        g.lineWidth = 2;
        g.beginPath();
        for (let k = 0; k <= 6; k++) {
          const ang = (k / 6) * TAU + t * 0.6;
          const sx = px + Math.cos(ang) * (pt.r + 4);
          const sy = py + Math.sin(ang) * (pt.r + 4);
          if (k === 0) g.moveTo(sx, sy);
          else g.lineTo(sx, sy);
        }
        g.stroke();
      }
    }
  }
}

/* ---------- rainha aranha ---------- */

function pernaDeAranha(g, x, y, lado, i, t, andando, agachada) {
  const base = [-14, -4, 8, 18][i];
  const ombroX = x + lado * 26;
  const ombroY = y + base;
  const passo = andando ? Math.sin(t * 14 + i * 1.7 + (lado > 0 ? Math.PI : 0)) * 8 : Math.sin(t * 2 + i) * 2;
  const abre = agachada ? 0.65 : 1;
  const joelhoX = ombroX + lado * (30 + i * 4) * abre;
  const joelhoY = ombroY - 26 + i * 6 + passo;
  const peX = ombroX + lado * (44 + i * 8) * abre;
  const peY = ombroY + 24 + i * 10 - passo * 0.5;
  g.beginPath();
  g.moveTo(ombroX, ombroY);
  g.lineTo(joelhoX, joelhoY);
  g.lineTo(peX, peY);
  g.stroke();
}

function desenharRainha(g, c, x, y, t, halos) {
  const a = c.ataque;
  const agachada = c.estado === 'agachada';
  const andando = c.estado === 'atravessando';
  const pisca = agachada && Math.floor(t * 16) % 2 === 0;
  // pernas
  g.save();
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.strokeStyle = pisca ? '#ff5a5a' : '#2a1240';
  g.lineWidth = 6;
  for (const lado of [-1, 1]) for (let i = 0; i < 4; i++) pernaDeAranha(g, x, y, lado, i, t, andando, agachada);
  g.strokeStyle = pisca ? '#ffb0b0' : '#7a3cb0';
  g.lineWidth = 2;
  for (const lado of [-1, 1]) for (let i = 0; i < 4; i++) pernaDeAranha(g, x, y, lado, i, t, andando, agachada);
  g.restore();
  const flash = c.partes[0].flash > 0;
  // abdômen (atrás), com a marca vermelha; brilha quando vai botar ovos
  if (c.chocando) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    brilho(g, x, y - 22, 60, '#ff5fd2', 0.5 + 0.4 * Math.sin(t * 24), halos);
    g.restore();
  }
  const abd = g.createRadialGradient(x - 12, y - 34, 4, x, y - 22, 46);
  abd.addColorStop(0, flash ? '#ffffff' : '#a061d8');
  abd.addColorStop(0.6, flash ? '#ffffff' : '#5a2490');
  abd.addColorStop(1, flash ? '#dddddd' : '#25103e');
  g.fillStyle = abd;
  g.strokeStyle = '#120820';
  g.lineWidth = 2;
  g.beginPath(); g.ellipse(x, y - 22, 44, 34, 0, 0, TAU); g.fill(); g.stroke();
  g.fillStyle = '#ff4d6d';
  g.beginPath();
  g.moveTo(x - 9, y - 40); g.lineTo(x + 9, y - 40); g.lineTo(x + 2, y - 28); g.lineTo(x + 9, y - 16);
  g.lineTo(x - 9, y - 16); g.lineTo(x - 2, y - 28); g.closePath(); g.fill();
  // cabeça
  const cab = g.createRadialGradient(x, y + 10, 3, x, y + 18, 30);
  cab.addColorStop(0, flash ? '#ffffff' : '#6c3398');
  cab.addColorStop(1, flash ? '#dddddd' : '#1e0c32');
  g.fillStyle = cab;
  g.beginPath(); g.ellipse(x, y + 18, 30, 24, 0, 0, TAU); g.fill(); g.stroke();
  // olhos acesos
  for (const [ox, oy, r] of [[-9, 18, 4], [9, 18, 4], [-17, 12, 2.6], [17, 12, 2.6], [-4, 9, 2.2], [4, 9, 2.2]]) {
    g.fillStyle = '#ff2b4f';
    g.beginPath(); g.arc(x + ox, y + oy, r, 0, TAU); g.fill();
    g.fillStyle = '#ffd0d8';
    g.beginPath(); g.arc(x + ox - r * 0.3, y + oy - r * 0.3, r * 0.35, 0, TAU); g.fill();
  }
  // presas
  g.fillStyle = '#e8e0f0';
  for (const s of [-1, 1]) {
    g.beginPath(); g.moveTo(x + s * 6, y + 34); g.lineTo(x + s * 11, y + 36); g.lineTo(x + s * 7, y + 48); g.closePath(); g.fill();
  }
  // vai soltar teias: a boca brilha
  if (a && a.tipo === 'teias' && a.fase === 'aviso') {
    g.save();
    g.globalCompositeOperation = 'lighter';
    brilho(g, x, y + 42, 8 + 16 * (1 - a.t / 0.6), '#f0f0ff', 1, halos);
    g.restore();
  }
}

/* ---------- olho gigante ---------- */

function desenharOlho(g, c, x, y, t, jx, halos, vista) {
  const a = c.ataque;
  // a fatia que o raio vai varrer fica pintada antes
  if (a && a.tipo === 'varredura') {
    const longe = 900;
    if (a.fase === 'aviso') {
      const forte = Math.floor(t * 12) % 2 === 0;
      g.save();
      g.fillStyle = `rgba(255,50,50,${forte ? 0.22 : 0.12})`;
      g.strokeStyle = 'rgba(255,80,80,.7)';
      g.lineWidth = 2;
      g.setLineDash([8, 6]);
      g.beginPath();
      g.moveTo(x, y);
      g.lineTo(x + Math.cos(a.de) * longe, y + Math.sin(a.de) * longe);
      g.lineTo(x + Math.cos(a.ate) * longe, y + Math.sin(a.ate) * longe);
      g.closePath();
      g.fill();
      g.stroke();
      g.restore();
    } else {
      const fx = x + Math.cos(a.ang) * longe;
      const fy = y + Math.sin(a.ang) * longe;
      g.save();
      g.globalCompositeOperation = 'lighter';
      g.lineCap = 'round';
      if (halos) {
        g.strokeStyle = 'rgba(255,60,60,.45)';
        g.lineWidth = 30;
        g.beginPath(); g.moveTo(x, y); g.lineTo(fx, fy); g.stroke();
      }
      g.strokeStyle = 'rgba(255,130,120,.95)';
      g.lineWidth = 12;
      g.beginPath(); g.moveTo(x, y); g.lineTo(fx, fy); g.stroke();
      g.strokeStyle = '#fff4f0';
      g.lineWidth = 4;
      g.beginPath(); g.moveTo(x, y); g.lineTo(fx, fy); g.stroke();
      g.restore();
    }
  }
  // tentáculos
  g.save();
  g.lineCap = 'round';
  for (let i = 0; i < 7; i++) {
    const ang = Math.PI * (0.15 + (i / 6) * 0.7);
    const bx = x + Math.cos(ang) * 40;
    const by = y + Math.sin(ang) * 40;
    const onda = Math.sin(t * 3 + i * 1.3) * 10;
    g.strokeStyle = '#5a1e34';
    g.lineWidth = 7 - Math.abs(i - 3);
    g.beginPath();
    g.moveTo(bx, by);
    g.quadraticCurveTo(bx + Math.cos(ang) * 22 + onda, by + 30, bx + Math.cos(ang) * 30 - onda, by + 52);
    g.stroke();
  }
  g.restore();
  // borda de carne
  g.fillStyle = '#4a1a2e';
  g.beginPath(); g.arc(x, y, 50, 0, TAU); g.fill();
  const olho = c.partes[0];
  const flash = olho.flash > 0;
  if (c.fechado) {
    // pálpebras fechadas: o tiro bate e volta
    const pele = g.createLinearGradient(0, y - 44, 0, y + 44);
    pele.addColorStop(0, '#8a4458');
    pele.addColorStop(1, '#4e2232');
    g.fillStyle = pele;
    g.beginPath(); g.arc(x, y, 44, 0, TAU); g.fill();
    g.strokeStyle = '#2a0c18';
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(x - 42, y); g.quadraticCurveTo(x, y + 12, x + 42, y); g.stroke();
    for (let k = -3; k <= 3; k++) { g.beginPath(); g.moveTo(x + k * 10, y + 6 - Math.abs(k)); g.lineTo(x + k * 11, y + 14 - Math.abs(k)); g.stroke(); }
    return;
  }
  // branco do olho, com veias
  const branco = g.createRadialGradient(x - 12, y - 14, 6, x, y, 46);
  branco.addColorStop(0, flash ? '#ffffff' : '#fff6f2');
  branco.addColorStop(0.75, flash ? '#ffffff' : '#f0c8c8');
  branco.addColorStop(1, flash ? '#eeeeee' : '#b06070');
  g.fillStyle = branco;
  g.beginPath(); g.arc(x, y, 44, 0, TAU); g.fill();
  g.strokeStyle = 'rgba(200,40,60,.45)';
  g.lineWidth = 1.2;
  for (let k = 0; k < 8; k++) {
    const ang = (k / 8) * TAU + 0.3;
    g.beginPath();
    g.moveTo(x + Math.cos(ang) * 44, y + Math.sin(ang) * 44);
    g.quadraticCurveTo(x + Math.cos(ang + 0.2) * 34, y + Math.sin(ang + 0.2) * 34, x + Math.cos(ang - 0.1) * 26, y + Math.sin(ang - 0.1) * 26);
    g.stroke();
  }
  // íris olhando para a nave (fica vermelha antes da varredura)
  const dirAng = Math.atan2(L.Y_JOGADOR - y, jx - x);
  const ix = x + Math.cos(dirAng) * 13;
  const iy = y + Math.sin(dirAng) * 13;
  const brava = a && a.tipo === 'varredura';
  const iris = g.createRadialGradient(ix, iy, 3, ix, iy, 20);
  iris.addColorStop(0, brava ? '#ffd0c0' : '#f4ffb0');
  iris.addColorStop(0.6, brava ? '#ff3b3b' : '#c8f03c');
  iris.addColorStop(1, brava ? '#6a0a10' : '#3a5a10');
  g.fillStyle = iris;
  g.beginPath(); g.arc(ix, iy, 20, 0, TAU); g.fill();
  const guiando = a && a.tipo === 'guiados' && a.fase === 'aviso';
  if (guiando) {
    g.save();
    g.globalCompositeOperation = 'lighter';
    brilho(g, ix, iy, 26, '#ff5fd2', 0.8 + 0.2 * Math.sin(t * 30), halos);
    g.restore();
  }
  g.fillStyle = '#05030a';
  g.beginPath(); g.arc(ix, iy, guiando ? 11 : 8, 0, TAU); g.fill();
  g.fillStyle = 'rgba(255,255,255,.9)';
  g.beginPath(); g.arc(ix - 5, iy - 6, 3.4, 0, TAU); g.fill();
}

/* ---------- chefão inteiro e barra de vida ---------- */

// `escala`: pixels por unidade do jogo (para o casco guardado ficar nítido). `halos`: brilhos (qualidade).
export function desenharChefe(g, p, t, alfa, vista, escala, halos) {
  const c = p.chefe;
  if (!c) return;
  if (!c.vivo && c.morrendo <= 0) return;
  const x = L.entre(c.xa, c.x, alfa);
  const y = L.entre(c.ya, c.y, alfa);
  g.save();
  if (!c.vivo) {
    // explodindo: treme, pisca e vai sumindo
    const k = c.morrendo / DURACAO_MORTE;
    g.globalAlpha = Math.max(0, Math.min(1, k * 1.4));
    g.translate(Math.sin(t * 90) * 3 * k, Math.cos(t * 77) * 2 * k);
  }
  if (c.id === 'nave-mae') desenharNaveMae(g, c, x, y, t, escala, halos, vista);
  else if (c.id === 'rainha') desenharRainha(g, c, x, y, t, halos);
  else desenharOlho(g, c, x, y, t, p.jx, halos, vista);
  g.restore();
}

// Barra de vida no topo, logo abaixo do painel (desenhada no mesmo lugar do painel).
export function desenharBarraDoChefe(g, p, t) {
  const c = p.chefe;
  if (!c || (!c.vivo && c.morrendo <= 0) || c.y < 0) return;
  const def = CHEFES[c.indice];
  const frac = vidaDoChefe(c);
  const larg = 200;
  const x0 = (L.LARGURA - larg) / 2;
  const y0 = 112;
  g.save();
  g.textAlign = 'center';
  g.font = `900 10px ${FONTE}`;
  g.fillStyle = def.cor;
  g.fillText(def.nome.toUpperCase(), L.LARGURA / 2, y0 - 4);
  g.fillStyle = 'rgba(8,10,30,.85)';
  g.fillRect(x0 - 2, y0 - 2, larg + 4, 10);
  g.fillStyle = 'rgba(255,255,255,.12)';
  g.fillRect(x0, y0, larg, 6);
  const pulsa = frac < 0.25 ? 0.7 + 0.3 * Math.sin(t * 12) : 1;
  g.globalAlpha = pulsa;
  g.fillStyle = def.cor;
  g.fillRect(x0, y0, larg * frac, 6);
  g.restore();
}
