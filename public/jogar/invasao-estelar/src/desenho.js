// Desenho da partida no canvas (coordenadas lógicas 360 x 640).
import * as L from './logica.js';
import { TIPOS, spriteInimigo, desenharJogador, LARG_INIMIGO, ALT_INIMIGO } from './naves.js';
import { desenharEfeitos, deslocamentoDoTremor } from './efeitos.js';

const TAU = Math.PI * 2;

/* ---------- fundo: nebulosa e estrelas em camadas ---------- */

function gerarEstrelas(n, vMin, vMax, rMin, rMax, semente) {
  const estrelas = [];
  let s = semente;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < n; i++) {
    estrelas.push({ x: rnd() * L.LARGURA, y: rnd() * L.ALTURA, v: vMin + rnd() * (vMax - vMin), r: rMin + rnd() * (rMax - rMin), f: rnd() * TAU });
  }
  return estrelas;
}
const CAMADAS = [
  { estrelas: gerarEstrelas(55, 5, 9, 0.4, 0.9, 11), alfa: 0.55, risco: 0 },
  { estrelas: gerarEstrelas(28, 16, 26, 0.7, 1.3, 23), alfa: 0.85, risco: 0 },
  { estrelas: gerarEstrelas(12, 50, 80, 0.9, 1.6, 37), alfa: 1, risco: 1 },
];

let nebulosa = null;
function criarNebulosa() {
  const c = document.createElement('canvas');
  c.width = L.LARGURA;
  c.height = L.ALTURA;
  const g = c.getContext('2d');
  const manchas = [
    [70, 110, 210, '110,70,255', 0.32], [310, 290, 230, '0,190,255', 0.2],
    [90, 470, 250, '255,60,170', 0.17], [300, 600, 200, '120,80,255', 0.22],
  ];
  // cada mancha é repetida acima e abaixo para a rolagem não mostrar emenda
  for (const [x, y, r, rgb, a] of manchas) {
    for (const dy of [-L.ALTURA, 0, L.ALTURA]) {
      const gr = g.createRadialGradient(x, y + dy, 0, x, y + dy, r);
      gr.addColorStop(0, `rgba(${rgb},${a})`);
      gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr;
      g.fillRect(0, 0, L.LARGURA, L.ALTURA);
    }
  }
  return c;
}

export function desenharFundo(g, t, movimento = 1) {
  const grad = g.createLinearGradient(0, 0, 0, L.ALTURA);
  grad.addColorStop(0, '#04061a');
  grad.addColorStop(0.55, '#0a0b32');
  grad.addColorStop(1, '#170f45');
  g.fillStyle = grad;
  g.fillRect(0, 0, L.LARGURA, L.ALTURA);

  if (!nebulosa) nebulosa = criarNebulosa();
  const desl = (t * 7 * movimento) % L.ALTURA;
  g.drawImage(nebulosa, 0, desl);
  g.drawImage(nebulosa, 0, desl - L.ALTURA);

  g.fillStyle = '#fff';
  g.strokeStyle = '#cfe6ff';
  for (const camada of CAMADAS) {
    for (const e of camada.estrelas) {
      const y = (e.y + t * e.v * movimento) % L.ALTURA;
      g.globalAlpha = camada.alfa * (0.55 + 0.45 * Math.sin(t * 2 + e.f));
      if (camada.risco && movimento > 0) {
        g.lineWidth = e.r;
        g.beginPath();
        g.moveTo(e.x, y - e.v * 0.05);
        g.lineTo(e.x, y);
        g.stroke();
      } else {
        g.beginPath();
        g.arc(e.x, y, e.r, 0, TAU);
        g.fill();
      }
    }
  }
  g.globalAlpha = 1;
}

/* ---------- tiros ---------- */

function desenharLaser(g, tiro) {
  g.save();
  g.globalCompositeOperation = 'lighter';
  const rastro = g.createLinearGradient(0, tiro.y, 0, tiro.y + 54);
  rastro.addColorStop(0, 'rgba(110,235,255,.8)');
  rastro.addColorStop(1, 'rgba(110,235,255,0)');
  g.fillStyle = rastro;
  g.fillRect(tiro.x - 2.2, tiro.y, 4.4, 54);
  const halo = g.createRadialGradient(tiro.x, tiro.y, 0, tiro.x, tiro.y, 15);
  halo.addColorStop(0, 'rgba(140,245,255,.7)');
  halo.addColorStop(1, 'rgba(140,245,255,0)');
  g.fillStyle = halo;
  g.beginPath(); g.arc(tiro.x, tiro.y, 15, 0, TAU); g.fill();
  g.restore();
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.roundRect ? g.roundRect(tiro.x - 1.8, tiro.y - 10, 3.6, 20, 1.8) : g.rect(tiro.x - 1.8, tiro.y - 10, 3.6, 20);
  g.fill();
}

function desenharPlasma(g, s, t) {
  g.save();
  g.globalCompositeOperation = 'lighter';
  const cauda = g.createLinearGradient(0, s.y, 0, s.y - 26);
  cauda.addColorStop(0, 'rgba(255,110,60,.7)');
  cauda.addColorStop(1, 'rgba(255,110,60,0)');
  g.fillStyle = cauda;
  g.fillRect(s.x - 2.5, s.y - 26, 5, 26);
  const pulsa = 1 + 0.15 * Math.sin(t * 30 + s.x);
  const r = 9 * pulsa;
  const orbe = g.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
  orbe.addColorStop(0, 'rgba(255,255,220,1)');
  orbe.addColorStop(0.35, 'rgba(255,150,60,.95)');
  orbe.addColorStop(1, 'rgba(255,50,60,0)');
  g.fillStyle = orbe;
  g.beginPath(); g.arc(s.x, s.y, r, 0, TAU); g.fill();
  g.restore();
}

/* ---------- HUD ---------- */

function textoEsp(g, texto, x, y, esp, alinha = 'left') {
  const larg = [...texto].reduce((s, ch) => s + g.measureText(ch).width + esp, -esp);
  let cx = alinha === 'center' ? x - larg / 2 : alinha === 'right' ? x - larg : x;
  const alinhamento = g.textAlign;
  g.textAlign = 'left';
  for (const ch of texto) {
    g.fillText(ch, cx, y);
    cx += g.measureText(ch).width + esp;
  }
  g.textAlign = alinhamento;
}

const FONTE = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

function desenharHud(g, p, t) {
  const painel = g.createLinearGradient(0, 0, 0, 72);
  painel.addColorStop(0, 'rgba(6,9,36,.92)');
  painel.addColorStop(1, 'rgba(6,9,36,.55)');
  g.fillStyle = painel;
  g.fillRect(0, 0, L.LARGURA, 72);
  g.fillStyle = 'rgba(94,242,255,.5)';
  g.fillRect(0, 71, L.LARGURA, 1);

  // pontos
  g.textBaseline = 'alphabetic';
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'PONTOS', 14, 18, 1.6);
  g.save();
  g.shadowColor = '#5ef2ff';
  g.shadowBlur = 8;
  g.fillStyle = '#ffffff';
  g.font = `800 22px ${FONTE}`;
  g.fillText(String(p.pontos).padStart(5, '0'), 14, 40);
  g.restore();

  // onda
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'ONDA', L.LARGURA / 2, 18, 1.6, 'center');
  g.save();
  g.shadowColor = '#ffd45e';
  g.shadowBlur = 8;
  g.fillStyle = '#ffd45e';
  g.font = `800 22px ${FONTE}`;
  g.textAlign = 'center';
  g.fillText(String(p.fase), L.LARGURA / 2, 40);
  g.restore();
  g.textAlign = 'left';

  // vidas: naves pequenas
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'NAVES', L.LARGURA - 14, 18, 1.6, 'right');
  for (let i = 0; i < L.VIDAS_MAX; i++) {
    const x = L.LARGURA - 20 - i * 17;
    g.save();
    g.globalAlpha = i < p.vidas ? 1 : 0.18;
    g.translate(x, 33);
    desenharJogador(g, 0, 0, 0, 0, 0.3);
    g.restore();
  }

  // energia
  const frac = p.energiaMax ? Math.max(0, p.energia / p.energiaMax) : 0;
  const x0 = 14;
  const larg = L.LARGURA - 28 - 36; // sobra espaço para o botão de pausa
  const y0 = 55;
  g.fillStyle = 'rgba(255,255,255,.12)';
  g.beginPath(); g.roundRect ? g.roundRect(x0, y0, larg, 9, 4.5) : g.rect(x0, y0, larg, 9); g.fill();
  const baixa = frac < 0.2;
  const cor = frac > 0.5 ? ['#3dffa5', '#00c2ff'] : frac > 0.2 ? ['#ffe14d', '#ff9a3c'] : ['#ff5470', '#ff2b4f'];
  const pulso = baixa ? 0.65 + 0.35 * Math.sin(t * 14) : 1;
  g.save();
  g.globalAlpha = pulso;
  const barra = g.createLinearGradient(x0, 0, x0 + larg, 0);
  barra.addColorStop(0, cor[0]);
  barra.addColorStop(1, cor[1]);
  g.fillStyle = barra;
  g.shadowColor = cor[0];
  g.shadowBlur = 8;
  g.beginPath(); g.roundRect ? g.roundRect(x0, y0, Math.max(6, larg * frac), 9, 4.5) : g.rect(x0, y0, Math.max(6, larg * frac), 9); g.fill();
  g.restore();
  g.fillStyle = 'rgba(8,12,50,.85)';
  g.font = `800 8px ${FONTE}`;
  textoEsp(g, 'ENERGIA', x0 + 7, y0 + 7.2, 1.4);

  // botão de pausa (o toque nessa área é tratado em main.js)
  const b = L.AREA_PAUSA;
  g.fillStyle = 'rgba(255,255,255,.08)';
  g.strokeStyle = 'rgba(255,255,255,.4)';
  g.lineWidth = 1.2;
  g.beginPath(); g.roundRect ? g.roundRect(b.x + 6, b.y + 4, 26, 21, 6) : g.rect(b.x + 6, b.y + 4, 26, 21); g.fill(); g.stroke();
  g.fillStyle = '#ffffff';
  g.fillRect(b.x + 14, b.y + 9, 3.4, 11);
  g.fillRect(b.x + 21, b.y + 9, 3.4, 11);
}

function desenharFaixa(g, p) {
  const total = L.ABERTURA_SEG;
  const alfa = Math.min(1, p.abertura / 0.5, (total - p.abertura) / 0.35);
  if (alfa <= 0) return;
  const tipo = TIPOS[p.tipo];
  g.save();
  g.globalAlpha = alfa;
  const fundo = g.createLinearGradient(0, 255, 0, 395);
  fundo.addColorStop(0, 'rgba(4,6,26,0)');
  fundo.addColorStop(0.25, 'rgba(4,6,26,.78)');
  fundo.addColorStop(0.75, 'rgba(4,6,26,.78)');
  fundo.addColorStop(1, 'rgba(4,6,26,0)');
  g.fillStyle = fundo;
  g.fillRect(0, 255, L.LARGURA, 140);
  g.textAlign = 'center';
  g.shadowColor = '#ffd45e';
  g.shadowBlur = 16;
  g.fillStyle = '#ffd45e';
  g.font = `900 38px ${FONTE}`;
  textoEsp(g, `ONDA ${p.fase}`, L.LARGURA / 2, 315, 3, 'center');
  g.shadowColor = tipo.cor;
  g.shadowBlur = 12;
  g.fillStyle = tipo.cor;
  g.font = `800 20px ${FONTE}`;
  textoEsp(g, tipo.nome.toUpperCase(), L.LARGURA / 2, 350, 2.4, 'center');
  g.restore();
}

/* ---------- partida inteira ---------- */

export function desenharPartida(g, p, ef, t) {
  desenharFundo(g, t, 1);

  const tr = deslocamentoDoTremor(ef);
  g.save();
  g.translate(tr.x, tr.y);

  // inimigos: batem as asas (2 quadros), inclinam ao andar de lado e brilham de leve
  for (const n of p.naves) {
    if (!n.vivo) continue;
    const quadro = Math.floor(t * 5 + n.i) % 2;
    g.save();
    g.translate(n.x, n.y);
    g.rotate(n.inclina);
    g.drawImage(spriteInimigo(p.tipo, quadro), -LARG_INIMIGO / 2, -ALT_INIMIGO / 2, LARG_INIMIGO, ALT_INIMIGO);
    g.restore();
  }

  for (const s of p.disparos) desenharPlasma(g, s, t);
  for (const tiro of p.tiros) desenharLaser(g, tiro);

  // nave do jogador (pisca quando está invulnerável)
  if (!(p.invulneravel > 0 && Math.floor(p.invulneravel * 14) % 2 === 0)) {
    desenharJogador(g, p.jx, L.Y_JOGADOR, t, p.vx);
  }

  desenharEfeitos(g, ef);
  g.restore();

  if (ef.clarao > 0) {
    g.fillStyle = `rgba(255,120,60,${ef.clarao * 0.55})`;
    g.fillRect(0, 0, L.LARGURA, L.ALTURA);
  }

  desenharHud(g, p, t);
  if (p.abertura > 0) desenharFaixa(g, p);
}
