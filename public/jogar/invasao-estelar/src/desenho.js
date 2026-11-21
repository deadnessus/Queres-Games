// Desenho da partida no canvas. O campo do jogo é 360 x 640; em celulares compridos a tela mostra
// também um pedaço acima e abaixo dele (o cenário cobre essa sobra e o painel sobe para o topo).
import * as L from './logica.js?v=11';
import { INIMIGOS, COMBO, CHEFES } from './dados.js?v=11';
import { TIPOS, desenharInimigo, desenharJogador, desenharOutraNave, resolucao, CORES_NAVE } from './naves.js?v=11';
import { desenharChefe, desenharBarraDoChefe } from './desenho-chefes.js?v=11';
import { desenharEfeitos, deslocamentoDoTremor, CORES_CAPSULA } from './efeitos.js?v=11';
import { CENARIOS, desenharCenario, TOPO, BASE } from './cenario.js?v=11';
import { capsulaPorId } from './capsulas.js?v=11';

const TAU = Math.PI * 2;
const ESCURO = '#02030c';
const FONTE = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

// Nível de qualidade (qualidade.js): main.js troca quando o celular pede menos enfeites.
let Q = { brilhoPainel: true, halos: true, cenario: 'completo' };
export function definirQualidade(nivel) {
  Q = nivel;
}

// vista: quanto da tela sobra além do campo, em unidades do jogo.
// ex = sobra de cada lado; ey = sobra em cima e embaixo; topo = área do celular que o painel deve evitar.
export const VISTA_PADRAO = { ex: 0, ey: 0, topo: 0 };

// "#rrggbb" + transparência -> "rgba(...)"
function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}

function brilhoRedondo(g, x, y, r, cor, forca = 1) {
  if (Q.halos) {
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

/* ---------- fundo ---------- */

// Pinta o cenário `indice` no campo. Em telas largas, os lados ficam escuros com a borda suave.
export function pintarFundo(g, t, vista, indice, mov = 1) {
  const { ex, ey } = vista;
  g.fillStyle = ESCURO;
  g.fillRect(-ex, -ey, L.LARGURA + 2 * ex, L.ALTURA + 2 * ey);
  const y0 = Math.max(-ey, TOPO);
  const y1 = Math.min(L.ALTURA + ey, BASE);
  g.save();
  g.beginPath();
  g.rect(0, y0, L.LARGURA, y1 - y0);
  g.clip();
  desenharCenario(g, t, indice, mov, Q.cenario);
  g.restore();
  if (ex > 0.5) {
    for (const [de, ate] of [[0, 28], [L.LARGURA, L.LARGURA - 28]]) {
      const gr = g.createLinearGradient(de, 0, ate, 0);
      gr.addColorStop(0, ESCURO);
      gr.addColorStop(1, 'rgba(2,3,12,0)');
      g.fillStyle = gr;
      g.fillRect(Math.min(de, ate), y0, 28, y1 - y0);
    }
  }
}

// Na partida o cenário acompanha a onda. Na troca, a tela escurece e volta com o cenário novo.
// No começo de cada volta (depois do chefão) é um salto no hiperespaço: as estrelas viram riscos e a tela clareia.
const troca = { atual: -1, anterior: -1, t0: 0 };
const DURACAO_TROCA = 1.4;
const salto = { t0: -99 };
const DURACAO_SALTO = 1.8;
let menosClarao = false; // opção "menos tremor": sem clarões fortes

export function iniciarSalto(t) {
  salto.t0 = t;
}

export function definirMenosTremor(sim) {
  menosClarao = sim;
}

// Riscos de luz saindo do meio da tela, cada vez mais longos.
function desenharSalto(g, k, vista) {
  const cx = L.LARGURA / 2;
  const cy = 280;
  const forca = Math.sin(Math.PI * k);
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.lineCap = 'round';
  for (let i = 0; i < 70; i++) {
    const ang = (i * 2.39996) % (Math.PI * 2);
    const d0 = 18 + ((i * 53) % 260) * (0.4 + k);
    const comp = 30 + 420 * k * k;
    g.strokeStyle = i % 3 ? `rgba(170,220,255,${0.75 * forca})` : `rgba(255,255,255,${0.9 * forca})`;
    g.lineWidth = i % 3 ? 1.4 : 2.2;
    g.beginPath();
    g.moveTo(cx + Math.cos(ang) * d0, cy + Math.sin(ang) * d0);
    g.lineTo(cx + Math.cos(ang) * (d0 + comp), cy + Math.sin(ang) * (d0 + comp));
    g.stroke();
  }
  g.restore();
  const claro = Math.max(0, 1 - Math.abs(2 * k - 1) * 1.6) * (menosClarao ? 0.25 : 0.75);
  if (claro > 0) {
    g.fillStyle = `rgba(225,240,255,${claro})`;
    g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  }
}

function pintarFundoDaOnda(g, t, vista, fase) {
  const c = L.cenarioDaFase(fase);
  if (c !== troca.atual) {
    troca.anterior = troca.atual;
    troca.atual = c;
    troca.t0 = t;
  }
  const ks = (t - salto.t0) / DURACAO_SALTO;
  const saltando = ks >= 0 && ks < 1;
  const k = troca.anterior < 0 ? 1 : (t - troca.t0) / DURACAO_TROCA;
  pintarFundo(g, t, vista, k < 0.5 ? troca.anterior : c);
  if (saltando) desenharSalto(g, ks, vista);
  else if (k < 1) {
    g.fillStyle = `rgba(2,3,12,${1 - Math.abs(2 * k - 1)})`;
    g.fillRect(0, -vista.ey, L.LARGURA, L.ALTURA + 2 * vista.ey);
  }
}

/* ---------- lasers do jogador ---------- */

// Laser da nave. No duelo, o do adversário desce (`paraBaixo`) e tem outra cor (`cor`: [rastro, halo] em "r,g,b").
const COR_LASER = ['110,235,255', '140,245,255'];
export function desenharLaser(g, x, y, vx, { paraBaixo = false, cor = COR_LASER } = {}) {
  g.save();
  g.translate(x, y);
  if (paraBaixo) g.rotate(Math.PI);
  if (vx) g.rotate(Math.atan2(paraBaixo ? -vx : vx, L.VEL_TIRO));
  if (Q.halos) {
    g.globalCompositeOperation = 'lighter';
    const rastro = g.createLinearGradient(0, 0, 0, 54);
    rastro.addColorStop(0, `rgba(${cor[0]},.8)`);
    rastro.addColorStop(1, `rgba(${cor[0]},0)`);
    g.fillStyle = rastro;
    g.fillRect(-2.2, 0, 4.4, 54);
    const halo = g.createRadialGradient(0, 0, 0, 0, 0, 15);
    halo.addColorStop(0, `rgba(${cor[1]},.7)`);
    halo.addColorStop(1, `rgba(${cor[1]},0)`);
    g.fillStyle = halo;
    g.beginPath(); g.arc(0, 0, 15, 0, TAU); g.fill();
    g.globalCompositeOperation = 'source-over';
  } else {
    // versão leve: rastro reto, sem degradê nem halo
    g.fillStyle = `rgba(${cor[0]},.45)`;
    g.fillRect(-1.6, 0, 3.2, 30);
  }
  g.fillStyle = '#ffffff';
  g.beginPath();
  g.roundRect ? g.roundRect(-1.8, -10, 3.6, 20, 1.8) : g.rect(-1.8, -10, 3.6, 20);
  g.fill();
  g.restore();
}

/* ---------- tiros dos inimigos (cada tipo com uma forma, não só uma cor) ---------- */

// plasma comum: bolinha verde ácida com cauda
function desenharPlasma(g, x, y, t) {
  if (!Q.halos) {
    g.fillStyle = '#9dff3c';
    g.beginPath(); g.arc(x, y, 5.5, 0, TAU); g.fill();
    g.fillStyle = '#ffffff';
    g.beginPath(); g.arc(x, y, 2.2, 0, TAU); g.fill();
    return;
  }
  g.save();
  g.globalCompositeOperation = 'lighter';
  const cauda = g.createLinearGradient(0, y, 0, y - 26);
  cauda.addColorStop(0, 'rgba(150,255,60,.7)');
  cauda.addColorStop(1, 'rgba(150,255,60,0)');
  g.fillStyle = cauda;
  g.fillRect(x - 2.5, y - 26, 5, 26);
  const pulsa = 1 + 0.15 * Math.sin(t * 30 + x);
  const r = 9.5 * pulsa;
  const orbe = g.createRadialGradient(x, y, 0, x, y, r);
  orbe.addColorStop(0, 'rgba(255,255,235,1)');
  orbe.addColorStop(0.35, 'rgba(170,255,60,.95)');
  orbe.addColorStop(1, 'rgba(40,190,40,0)');
  g.fillStyle = orbe;
  g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
  g.restore();
}

// ferroada da vespa: dardo fino apontando para onde vai
function desenharFerrao(g, s, x, y) {
  g.save();
  g.translate(x, y);
  g.rotate(Math.atan2(s.vy, s.vx) - Math.PI / 2);
  if (Q.halos) brilhoRedondo(g, 0, 0, 13, '#d4ff3c', 0.6);
  g.fillStyle = '#d4ff3c';
  g.beginPath(); g.moveTo(0, 12); g.lineTo(3.4, -1); g.lineTo(0, -11); g.lineTo(-3.4, -1); g.closePath(); g.fill();
  g.fillStyle = '#ffffff';
  g.fillRect(-0.8, -4, 1.6, 12);
  g.restore();
}

// bomba: redonda, com aletas e uma luz que pisca mais rápido perto de estourar
function desenharBomba(g, s, x, y, t) {
  const falta = L.clamp((s.estoura - y) / 300, 0, 1);
  const pisca = Math.sin(t * (10 + 40 * (1 - falta))) > 0;
  g.save();
  g.translate(x, y);
  g.save();
  g.globalCompositeOperation = 'lighter';
  brilhoRedondo(g, 0, 0, 18, '#ffb02e', 0.4);
  g.restore();
  g.fillStyle = '#a87a3c';
  g.beginPath(); g.moveTo(-6, -7); g.lineTo(-10, -14); g.lineTo(-2, -9); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(6, -7); g.lineTo(10, -14); g.lineTo(2, -9); g.closePath(); g.fill();
  g.fillStyle = '#4b3a28';
  g.strokeStyle = '#ffc24d';
  g.lineWidth = 2.2;
  g.beginPath(); g.arc(0, 0, 9.5, 0, TAU); g.fill(); g.stroke();
  if (pisca) {
    brilhoRedondo(g, 0, 0, 12, '#ff3b3b', 0.9);
    g.fillStyle = '#ff6b6b';
    g.beginPath(); g.arc(0, 0, 3, 0, TAU); g.fill();
  }
  g.restore();
}

// estilhaço: triangulinho laranja girando
function desenharEstilhaco(g, x, y, t) {
  g.save();
  g.translate(x, y);
  g.rotate(t * 14 + x);
  if (Q.halos) brilhoRedondo(g, 0, 0, 10, '#ff9a3c', 0.6);
  g.fillStyle = '#ffb02e';
  g.beginPath(); g.moveTo(0, -6); g.lineTo(5.5, 4); g.lineTo(-5.5, 4); g.closePath(); g.fill();
  g.restore();
}

// teia: roda branca de fios
function desenharTeia(g, x, y, t) {
  g.save();
  g.translate(x, y);
  g.rotate(t * 1.5);
  g.strokeStyle = 'rgba(240,240,255,.9)';
  g.lineWidth = 1.2;
  g.beginPath();
  for (let k = 0; k < 6; k++) {
    const a = (k / 6) * TAU;
    g.moveTo(0, 0);
    g.lineTo(Math.cos(a) * 11, Math.sin(a) * 11);
  }
  g.stroke();
  for (const r of [4.5, 8.5]) {
    g.beginPath();
    for (let k = 0; k <= 6; k++) {
      const a = (k / 6) * TAU;
      if (k === 0) g.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    g.stroke();
  }
  g.restore();
}

// tiro guiado: losango rosa com um anel girando
function desenharGuiado(g, x, y, t) {
  g.save();
  g.translate(x, y);
  if (Q.halos) brilhoRedondo(g, 0, 0, 16, '#ff5fd2', 0.7);
  g.rotate(t * 3);
  g.fillStyle = '#ff5fd2';
  g.beginPath(); g.moveTo(0, -7); g.lineTo(6, 0); g.lineTo(0, 7); g.lineTo(-6, 0); g.closePath(); g.fill();
  g.strokeStyle = '#ffd1f2';
  g.lineWidth = 1.4;
  g.beginPath(); g.ellipse(0, 0, 10, 4, 0, 0, TAU); g.stroke();
  g.fillStyle = '#ffffff';
  g.beginPath(); g.arc(0, 0, 2, 0, TAU); g.fill();
  g.restore();
}

function desenharTiroInimigo(g, s, x, y, t) {
  switch (s.tipo) {
    case 'ferrao': desenharFerrao(g, s, x, y); break;
    case 'bomba': desenharBomba(g, s, x, y, t); break;
    case 'estilhaco': desenharEstilhaco(g, x, y, t); break;
    case 'teia': desenharTeia(g, x, y, t); break;
    case 'guiado': desenharGuiado(g, x, y, t); break;
    default: desenharPlasma(g, x, y, t);
  }
}

/* ---------- inimigos: avisos, escudo, raio ---------- */

const COR_AVISO = { reto: '#9dff3c', duplo: '#ff6070', ferrao: '#d4ff3c', bomba: '#ffb02e', teia: '#f0f0ff', raio: '#ff3b3b', leque: '#ffe9c8', guiado: '#ff5fd2' };

// Antes de atacar, a nave avisa: um brilho cresce embaixo dela (e a sentinela mostra a linha do raio).
function desenharAviso(g, n, x, y, tiro, t) {
  const a = n.ataque;
  const total = n.filhote ? 0.35 : INIMIGOS[n.tipo].aviso;
  const k = L.clamp(1 - a.t / total, 0, 1);
  const cor = COR_AVISO[tiro] || '#ffffff';
  if (tiro === 'raio') {
    // linha piscando no lugar exato do raio, mais forte quanto mais perto de disparar, e uma marca na altura da nave
    const forte = Math.floor(t * (10 + 14 * k)) % 2 === 0;
    g.save();
    g.strokeStyle = cor;
    g.globalAlpha = forte ? 1 : 0.45;
    g.lineWidth = 2.5 + 1.5 * k;
    g.setLineDash([10, 6]);
    g.beginPath(); g.moveTo(a.x, y + 22); g.lineTo(a.x, L.ALTURA + 400); g.stroke();
    g.setLineDash([]);
    g.fillStyle = cor;
    for (const lado of [-1, 1]) {
      g.beginPath();
      g.moveTo(a.x + lado * 9, L.Y_JOGADOR - 52);
      g.lineTo(a.x + lado * 20, L.Y_JOGADOR - 60);
      g.lineTo(a.x + lado * 20, L.Y_JOGADOR - 44);
      g.closePath();
      g.fill();
    }
    g.restore();
  }
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.globalAlpha = 0.65 + 0.35 * Math.sin(t * 32);
  brilhoRedondo(g, x, y + 16, 7 + 13 * k, cor, 1);
  g.restore();
}

function desenharRaio(g, x, yTopo, t, vista) {
  const y1 = L.ALTURA + vista.ey;
  const tremida = 0.85 + 0.15 * Math.sin(t * 60);
  g.save();
  g.globalCompositeOperation = 'lighter';
  if (Q.halos) {
    const gr = g.createLinearGradient(x - 16, 0, x + 16, 0);
    gr.addColorStop(0, 'rgba(255,40,40,0)');
    gr.addColorStop(0.5, `rgba(255,60,60,${0.55 * tremida})`);
    gr.addColorStop(1, 'rgba(255,40,40,0)');
    g.fillStyle = gr;
    g.fillRect(x - 16, yTopo, 32, y1 - yTopo);
  }
  g.fillStyle = `rgba(255,120,110,${0.9 * tremida})`;
  g.fillRect(x - L.RAIO_LARGURA / 2, yTopo, L.RAIO_LARGURA, y1 - yTopo);
  g.fillStyle = '#fff4f0';
  g.fillRect(x - 2.5, yTopo, 5, y1 - yTopo);
  g.restore();
}

// Escudo da lâmina: um arco na frente (embaixo), que quebra no 1º tiro.
function desenharEscudoInimigo(g, x, y, t) {
  g.save();
  g.translate(x, y);
  g.globalCompositeOperation = 'lighter';
  g.strokeStyle = `rgba(127,233,255,${0.7 + 0.2 * Math.sin(t * 6)})`;
  g.lineWidth = 3;
  g.beginPath(); g.arc(0, 2, 27, 0.2 * Math.PI, 0.8 * Math.PI); g.stroke();
  g.strokeStyle = 'rgba(200,250,255,.5)';
  g.lineWidth = 1;
  g.beginPath(); g.arc(0, 2, 23, 0.25 * Math.PI, 0.75 * Math.PI); g.stroke();
  g.restore();
}

function desenharInimigos(g, p, t, alfa, vista) {
  const bonus = p.onda.especie === 'bonus';
  for (const n of p.naves) {
    if (!n.vivo) continue;
    let x = L.entre(n.xa, n.x, alfa);
    const y = L.entre(n.ya, n.y, alfa);
    const tiro = n.filhote ? 'reto' : INIMIGOS[n.tipo].tiro;
    const a = n.ataque;
    if (a && a.fase === 'aviso' && tiro === 'ferrao') x += Math.sin(t * 70 + n.i) * 2.6; // a vespa treme antes de se soltar
    if (bonus) {
      g.save();
      g.globalCompositeOperation = 'lighter';
      brilhoRedondo(g, x, y, 34, '#ffd45e', 0.45 + 0.15 * Math.sin(t * 5 + n.i));
      g.restore();
    }
    if (a && a.fase === 'aviso') desenharAviso(g, n, x, y, tiro, t);
    if (a && a.fase === 'raio') desenharRaio(g, a.x, y + 18, t, vista);
    g.save();
    g.translate(x, y);
    g.rotate(n.inclina);
    const variante = n.flash > 0 ? 'branco' : n.furia ? 'furia' : '';
    desenharInimigo(g, n.tipo, Math.floor(t * (n.furia ? 9 : 5) + n.i) % 2, n.filhote ? 0.55 : 1, variante);
    g.restore();
    if (n.escudo) desenharEscudoInimigo(g, x, y, t);
  }
}

/* ---------- cápsulas e meteoros ---------- */

function iconeCapsula(g, tipo, cor) {
  g.fillStyle = cor;
  g.strokeStyle = cor;
  g.lineWidth = 2;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  switch (tipo) {
    case 'duplo':
      g.fillRect(-4.6, -6, 2.8, 12);
      g.fillRect(1.8, -6, 2.8, 12);
      break;
    case 'leque':
      g.beginPath();
      g.moveTo(0, 6); g.lineTo(-6, -6);
      g.moveTo(0, 6); g.lineTo(0, -6.5);
      g.moveTo(0, 6); g.lineTo(6, -6);
      g.stroke();
      break;
    case 'escudo':
      g.beginPath();
      g.moveTo(0, -7); g.lineTo(6, -4.5); g.lineTo(5, 2); g.quadraticCurveTo(3, 6, 0, 7.5);
      g.quadraticCurveTo(-3, 6, -5, 2); g.lineTo(-6, -4.5); g.closePath();
      g.fill();
      break;
    case 'energia':
      g.beginPath();
      g.moveTo(1.5, -7.5); g.lineTo(-4.5, 1); g.lineTo(-0.5, 1); g.lineTo(-2, 7.5); g.lineTo(4.5, -1.5); g.lineTo(0.5, -1.5);
      g.closePath();
      g.fill();
      break;
    case 'lento':
      g.lineWidth = 1.6;
      g.beginPath(); g.arc(0, 0, 6.2, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -4); g.moveTo(0, 0); g.lineTo(3, 1.5); g.stroke();
      break;
    case 'bomba':
      g.beginPath(); g.arc(-1, 1.5, 4.8, 0, TAU); g.fill();
      g.beginPath(); g.moveTo(2, -2); g.quadraticCurveTo(4, -6, 6.5, -6); g.stroke();
      g.fillStyle = '#ffffff';
      g.beginPath(); g.arc(6.5, -6, 1.4, 0, TAU); g.fill();
      break;
    default:
  }
}

export function desenharCapsula(g, c, x, y, t) {
  const cor = CORES_CAPSULA[c.tipo] || '#ffffff';
  const balanca = Math.sin(t * 5 + c.x) * 1.5;
  g.save();
  g.translate(x, y + balanca);
  g.save();
  g.globalCompositeOperation = 'lighter';
  brilhoRedondo(g, 0, 0, 26, cor, 0.55 + 0.2 * Math.sin(t * 8));
  g.restore();
  g.fillStyle = 'rgba(8,12,40,.92)';
  g.strokeStyle = cor;
  g.lineWidth = 2;
  g.beginPath();
  g.roundRect ? g.roundRect(-15, -11, 30, 22, 11) : g.rect(-15, -11, 30, 22);
  g.fill();
  g.stroke();
  iconeCapsula(g, c.tipo, cor);
  g.restore();
}

function desenharMeteoro(g, m, x, y, t) {
  if (m.aviso > 0) {
    // o lugar onde o meteoro vai entrar pisca antes
    if (Math.floor(t * 10) % 2 === 0) {
      g.save();
      g.fillStyle = 'rgba(255,90,60,.92)';
      g.beginPath(); g.moveTo(m.x - 9, 80); g.lineTo(m.x + 9, 80); g.lineTo(m.x, 94); g.closePath(); g.fill();
      g.fillStyle = '#ffffff';
      g.font = `900 9px ${FONTE}`;
      g.textAlign = 'center';
      g.fillText('!', m.x, 88.5);
      g.restore();
    }
    return;
  }
  // cauda de fogo para trás do movimento, afinando na ponta
  {
    const comp = m.r * 3.6;
    const nv = Math.hypot(m.vx, m.vy) || 1;
    const ux = m.vx / nv;
    const uy = m.vy / nv;
    const tx = x - ux * comp;
    const ty = y - uy * comp;
    const lx = -uy * m.r * 0.85;
    const ly = ux * m.r * 0.85;
    g.save();
    g.globalCompositeOperation = 'lighter';
    if (Q.halos) {
      const gr = g.createLinearGradient(x, y, tx, ty);
      gr.addColorStop(0, 'rgba(255,200,90,.85)');
      gr.addColorStop(0.45, 'rgba(255,110,40,.45)');
      gr.addColorStop(1, 'rgba(255,60,20,0)');
      g.fillStyle = gr;
    } else {
      g.fillStyle = 'rgba(255,130,50,.35)';
    }
    g.beginPath();
    g.moveTo(x + lx, y + ly);
    g.quadraticCurveTo(x - ux * comp * 0.5 + lx * 0.4, y - uy * comp * 0.5 + ly * 0.4, tx, ty);
    g.quadraticCurveTo(x - ux * comp * 0.5 - lx * 0.4, y - uy * comp * 0.5 - ly * 0.4, x - lx, y - ly);
    g.closePath();
    g.fill();
    g.restore();
  }
  g.save();
  g.translate(x, y);
  g.rotate(m.giro);
  const pedra = Q.halos ? g.createRadialGradient(-m.r * 0.3, -m.r * 0.3, m.r * 0.1, 0, 0, m.r) : null;
  if (pedra) {
    pedra.addColorStop(0, '#a3836a');
    pedra.addColorStop(1, '#4a3628');
  }
  g.fillStyle = pedra || '#7a5d48';
  g.strokeStyle = '#2a1d14';
  g.lineWidth = 1.5;
  g.beginPath();
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * TAU;
    const rr = m.r * (0.86 + 0.14 * Math.sin(k * 2.7 + m.r));
    if (k === 0) g.moveTo(Math.cos(a) * rr, Math.sin(a) * rr);
    else g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
  g.stroke();
  g.fillStyle = 'rgba(40,26,18,.55)';
  for (const [cx, cy, cr] of [[0.3, -0.2, 0.22], [-0.35, 0.3, 0.16], [0.1, 0.45, 0.12]]) {
    g.beginPath(); g.arc(cx * m.r, cy * m.r, cr * m.r, 0, TAU); g.fill();
  }
  g.restore();
}

/* ---------- nave do jogador: escudo e teia ---------- */

export function desenharEscudoJogador(g, x, y, t) {
  g.save();
  g.globalCompositeOperation = 'lighter';
  if (Q.halos) {
    const gr = g.createRadialGradient(x, y, 18, x, y, 36);
    gr.addColorStop(0, 'rgba(127,155,255,0)');
    gr.addColorStop(0.8, 'rgba(127,155,255,.22)');
    gr.addColorStop(1, 'rgba(127,155,255,0)');
    g.fillStyle = gr;
    g.beginPath(); g.arc(x, y, 36, 0, TAU); g.fill();
  }
  g.strokeStyle = `rgba(160,185,255,${0.65 + 0.25 * Math.sin(t * 5)})`;
  g.lineWidth = 2;
  g.beginPath(); g.arc(x, y, 33, 0, TAU); g.stroke();
  g.restore();
}

export function desenharTeiaNaNave(g, x, y, forca) {
  g.save();
  g.globalAlpha = Math.min(1, forca);
  g.strokeStyle = 'rgba(235,235,255,.85)';
  g.lineWidth = 1.1;
  g.beginPath();
  for (const [x0, y0, x1, y1] of [[-22, -14, 20, 16], [-20, 18, 22, -10], [-26, 2, 26, 4], [-4, -24, 6, 26]]) {
    g.moveTo(x + x0, y + y0);
    g.quadraticCurveTo(x + (x0 + x1) / 2 + 4, y + (y0 + y1) / 2 - 4, x + x1, y + y1);
  }
  g.stroke();
  g.restore();
}

/* ---------- HUD ---------- */

export function textoEsp(g, texto, x, y, esp, alinha = 'left') {
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

// o painel é desenhado com o topo em y = 0; `acima` é quanto ele precisa cobrir para cima (área do celular)
function desenharHud(g, p, t, acima) {
  const painel = g.createLinearGradient(0, 0, 0, 72);
  painel.addColorStop(0, 'rgba(5,7,28,.96)');
  painel.addColorStop(1, 'rgba(5,7,28,.78)');
  g.fillStyle = painel;
  g.fillRect(0, -acima, L.LARGURA, 72 + acima);
  g.fillStyle = 'rgba(94,242,255,.5)';
  g.fillRect(0, 71, L.LARGURA, 1);

  // pontos
  g.textBaseline = 'alphabetic';
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'PONTOS', 14, 18, 1.6);
  g.save();
  g.shadowColor = '#5ef2ff';
  g.shadowBlur = Q.brilhoPainel ? 8 : 0;
  g.fillStyle = '#ffffff';
  g.font = `800 22px ${FONTE}`;
  g.fillText(String(p.pontos).padStart(5, '0'), 14, 40);
  g.restore();

  // onda
  const rotulo = p.rotulo || (p.modo === 'recruta' ? 'RECRUTA' : '');
  g.fillStyle = rotulo === 'DESAFIO' ? '#ff9ad2' : rotulo ? '#7dff9a' : 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, rotulo ? `ONDA · ${rotulo}` : 'ONDA', L.LARGURA / 2, 18, 1.6, 'center');
  g.save();
  g.shadowColor = '#ffd45e';
  g.shadowBlur = Q.brilhoPainel ? 8 : 0;
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

  // energia (nas ondas especiais, a barra é o tempo que falta)
  const frac = p.energiaMax ? Math.max(0, p.energia / p.energiaMax) : 0;
  const x0 = 14;
  const larg = L.LARGURA - 28 - 36; // sobra espaço para o botão de pausa
  const y0 = 55;
  g.fillStyle = 'rgba(255,255,255,.12)';
  g.beginPath(); g.roundRect ? g.roundRect(x0, y0, larg, 9, 4.5) : g.rect(x0, y0, larg, 9); g.fill();
  const especial = p.onda.especie === 'meteoros' || p.onda.especie === 'bonus';
  const baixa = !especial && frac < 0.2;
  const cor = especial ? ['#ffd45e', '#ff9a3c'] : frac > 0.5 ? ['#3dffa5', '#00c2ff'] : frac > 0.2 ? ['#ffe14d', '#ff9a3c'] : ['#ff5470', '#ff2b4f'];
  const pulso = baixa ? 0.65 + 0.35 * Math.sin(t * 14) : 1;
  g.save();
  g.globalAlpha = pulso;
  const barra = g.createLinearGradient(x0, 0, x0 + larg, 0);
  barra.addColorStop(0, cor[0]);
  barra.addColorStop(1, cor[1]);
  g.fillStyle = barra;
  g.shadowColor = cor[0];
  g.shadowBlur = Q.brilhoPainel ? 8 : 0;
  g.beginPath(); g.roundRect ? g.roundRect(x0, y0, Math.max(6, larg * frac), 9, 4.5) : g.rect(x0, y0, Math.max(6, larg * frac), 9); g.fill();
  g.restore();
  g.fillStyle = 'rgba(8,12,50,.85)';
  g.font = `800 8px ${FONTE}`;
  textoEsp(g, especial ? 'TEMPO' : 'ENERGIA', x0 + 7, y0 + 7.2, 1.4);

  // botão de pausa (o toque nessa área é tratado em main.js)
  const b = L.AREA_PAUSA;
  g.fillStyle = 'rgba(255,255,255,.08)';
  g.strokeStyle = 'rgba(255,255,255,.4)';
  g.lineWidth = 1.2;
  g.beginPath(); g.roundRect ? g.roundRect(b.x + 6, b.y + 4, 26, 21, 6) : g.rect(b.x + 6, b.y + 4, 26, 21); g.fill(); g.stroke();
  g.fillStyle = '#ffffff';
  g.fillRect(b.x + 14, b.y + 9, 3.4, 11);
  g.fillRect(b.x + 21, b.y + 9, 3.4, 11);

  desenharPoderes(g, p, t);
  desenharCombo(g, p);
}

// Logo abaixo do painel, à esquerda: o que a nave tem agora (arma, escudo, câmera lenta, teia).
function desenharPoderes(g, p, t) {
  const pod = p.poderes;
  const itens = [];
  if (pod.arma) itens.push([pod.arma, pod.armaT / capsulaPorId(pod.arma).segundos]);
  if (pod.escudo) itens.push(['escudo', 1]);
  if (pod.lento > 0) itens.push(['lento', pod.lento / capsulaPorId('lento').segundos]);
  if (pod.teia > 0) itens.push(['teia', pod.teia / L.TEIA_SEG]);
  let x = 22;
  for (const [tipo, frac] of itens) {
    const cor = tipo === 'teia' ? '#e6e6ff' : CORES_CAPSULA[tipo];
    g.save();
    g.translate(x, 88);
    g.globalAlpha = frac < 0.25 && Math.floor(t * 8) % 2 ? 0.45 : 1;
    g.fillStyle = 'rgba(8,12,40,.85)';
    g.strokeStyle = cor;
    g.lineWidth = 1.5;
    g.beginPath(); g.arc(0, 0, 11, 0, TAU); g.fill(); g.stroke();
    g.save();
    g.scale(0.85, 0.85);
    if (tipo === 'teia') desenharTeia(g, 0, 0, 0);
    else iconeCapsula(g, tipo, cor);
    g.restore();
    // tempo que falta: arco em volta
    g.strokeStyle = cor;
    g.lineWidth = 2.4;
    g.beginPath(); g.arc(0, 0, 14, -Math.PI / 2, -Math.PI / 2 + TAU * L.clamp(frac, 0, 1)); g.stroke();
    g.restore();
    x += 34;
  }
}

// À direita, abaixo do painel: o combo e o tempo que falta para ele acabar.
function desenharCombo(g, p) {
  const c = p.combo;
  if (c.mult < 2 || c.desde > COMBO.janela) return;
  const frac = 1 - c.desde / COMBO.janela;
  g.save();
  g.textAlign = 'right';
  g.font = `900 17px ${FONTE}`;
  g.shadowColor = '#ffd45e';
  g.shadowBlur = Q.brilhoPainel ? 10 : 0;
  g.fillStyle = c.mult >= 5 ? '#ff8a3c' : '#ffd45e';
  g.fillText(`COMBO ×${c.mult}`, L.LARGURA - 14, 94);
  g.shadowBlur = 0;
  g.fillStyle = 'rgba(255,255,255,.15)';
  g.fillRect(L.LARGURA - 104, 99, 90, 3);
  g.fillStyle = '#ffd45e';
  g.fillRect(L.LARGURA - 14 - 90 * frac, 99, 90 * frac, 3);
  g.restore();
}

const FAIXAS = {
  normal: (p) => [TIPOS[p.tipo].nome.toUpperCase(), TIPOS[p.tipo].cor, CENARIOS[L.cenarioDaFase(p.fase)].nome.toUpperCase()],
  meteoros: () => ['CHUVA DE METEOROS', '#ff9a3c', 'DESVIE! CADA UM QUE PASSA VALE PONTOS'],
  bonus: (p) => ['ONDA BÔNUS ×2', '#ffd45e', `${TIPOS[p.tipo].nome.toUpperCase()} QUE NÃO ATIRAM`],
  chefe: (p) => [CHEFES[p.onda.chefe].nome.toUpperCase(), CHEFES[p.onda.chefe].cor, 'CHEFÃO! DERRUBE PARA SALTAR'],
};

function desenharFaixa(g, p) {
  const total = L.ABERTURA_SEG;
  const alfa = Math.min(1, p.abertura / 0.5, (total - p.abertura) / 0.35);
  if (alfa <= 0) return;
  const [titulo, cor, sub] = (FAIXAS[p.onda.especie] || FAIXAS.normal)(p);
  g.save();
  g.globalAlpha = alfa;
  const fundo = g.createLinearGradient(0, 255, 0, 410);
  fundo.addColorStop(0, 'rgba(4,6,26,0)');
  fundo.addColorStop(0.25, 'rgba(4,6,26,.78)');
  fundo.addColorStop(0.75, 'rgba(4,6,26,.78)');
  fundo.addColorStop(1, 'rgba(4,6,26,0)');
  g.fillStyle = fundo;
  g.fillRect(0, 255, L.LARGURA, 155);
  g.textAlign = 'center';
  g.shadowColor = '#ffd45e';
  g.shadowBlur = Q.brilhoPainel ? 16 : 0;
  g.fillStyle = '#ffd45e';
  g.font = `900 38px ${FONTE}`;
  textoEsp(g, `ONDA ${p.fase}`, L.LARGURA / 2, 315, 3, 'center');
  g.shadowColor = cor;
  g.shadowBlur = Q.brilhoPainel ? 12 : 0;
  g.fillStyle = cor;
  g.font = `800 20px ${FONTE}`;
  textoEsp(g, titulo, L.LARGURA / 2, 350, titulo.length > 16 ? 1.2 : 2.4, 'center');
  g.shadowBlur = 0;
  g.fillStyle = 'rgba(225,232,255,.8)';
  g.font = `700 11px ${FONTE}`;
  textoEsp(g, sub, L.LARGURA / 2, 374, sub.length > 24 ? 0.8 : 2.2, 'center');
  g.restore();
}

/* ---------- esquadrão (Etapa 4): colegas, cápsulas de resgate e o placar de cada piloto ---------- */

const corDaNave = (id) => CORES_NAVE.find((c) => c.id === id) || CORES_NAVE[0];
const infoDoPiloto = (p, id) => (p.esquadrao && p.esquadrao.nomes.get(id)) || { nome: 'Piloto', cor: 'azul', nave: 'padrao' };

function desenharColegas(g, p, t, alfa) {
  for (const a of p.aliados) {
    if (a.caido) continue;
    for (const tiro of a.tiros) desenharLaser(g, L.entre(tiro.xa, tiro.x, alfa), L.entre(tiro.ya, tiro.y, alfa), tiro.vx);
    const x = L.entre(a.xa, a.x, alfa);
    if (!(a.invulneravel > 0 && Math.floor(t * 14) % 2 === 0)) desenharOutraNave(g, a.nave, a.cor, x, L.Y_JOGADOR, t, a.vx || 0, 1);
    if (a.escudo) desenharEscudoJogador(g, x, L.Y_JOGADOR, t);
    // o nome em cima, pequeno, para saber quem é quem
    g.save();
    g.font = `800 9px ${FONTE}`;
    g.textAlign = 'center';
    g.fillStyle = 'rgba(225,232,255,.75)';
    g.fillText(infoDoPiloto(p, a.id).nome.split(' ')[0], x, L.Y_JOGADOR + 44);
    g.restore();
  }
}

// Cápsula de resgate: fica no chão onde a nave caiu; um colega passa por cima e traz o piloto de volta.
function desenharResgates(g, p, t) {
  for (const r of p.resgates) {
    const info = infoDoPiloto(p, r.id);
    const cor = corDaNave(info.cor).asa[0];
    const pulso = 0.5 + 0.5 * Math.sin(t * 5 + r.id);
    g.save();
    g.globalCompositeOperation = 'lighter';
    brilhoRedondo(g, r.x, L.Y_JOGADOR, 30 + 8 * pulso, cor, 0.5);
    g.restore();
    g.save();
    g.globalAlpha = 0.55 + 0.25 * pulso;
    desenharOutraNave(g, info.nave, info.cor, r.x, L.Y_JOGADOR, t, 0, 0.6);
    g.restore();
    g.save();
    g.strokeStyle = cor;
    g.lineWidth = 2.5;
    g.setLineDash([6, 5]);
    g.lineDashOffset = -t * 20;
    g.beginPath(); g.arc(r.x, L.Y_JOGADOR, 28, 0, TAU); g.stroke();
    g.setLineDash([]);
    g.fillStyle = '#7dff9a';
    g.fillRect(r.x - 2.5, L.Y_JOGADOR - 9, 5, 18);
    g.fillRect(r.x - 9, L.Y_JOGADOR - 2.5, 18, 5);
    g.font = `900 9px ${FONTE}`;
    g.textAlign = 'center';
    g.fillStyle = '#7dff9a';
    textoEsp(g, 'RESGATE', r.x, L.Y_JOGADOR - 36, 1.2, 'center');
    g.fillStyle = 'rgba(225,232,255,.85)';
    g.font = `800 9px ${FONTE}`;
    g.fillText(info.nome.split(' ')[0], r.x, L.Y_JOGADOR + 44);
    g.restore();
  }
}

// Embaixo da tela: cada piloto com a cor da nave, o nome e as naves que sobram (caído: "resgate!").
function desenharPlacarDoEsquadrao(g, p, vista) {
  const lista = p.esquadrao.placar || [];
  if (!lista.length) return;
  const y = L.ALTURA + Math.max(0, vista.ey) - 10;
  const larg = L.LARGURA / lista.length;
  g.save();
  g.fillStyle = 'rgba(5,7,28,.7)';
  g.fillRect(0, y - 14, L.LARGURA, 22);
  lista.forEach((pl, k) => {
    const x0 = k * larg + 8;
    const cor = corDaNave(pl.cor).asa[0];
    g.fillStyle = cor;
    g.beginPath(); g.arc(x0 + 4, y - 3, 4, 0, TAU); g.fill();
    g.font = `${pl.eu ? 900 : 700} 10px ${FONTE}`;
    g.textAlign = 'left';
    g.fillStyle = pl.eu ? '#ffffff' : 'rgba(225,232,255,.8)';
    const nome = pl.nome.split(' ')[0];
    g.fillText(nome.length > 9 ? `${nome.slice(0, 8)}.` : nome, x0 + 12, y + 1, larg - 40);
    g.textAlign = 'right';
    g.fillStyle = pl.caido ? '#ff8fb8' : '#7dff9a';
    g.fillText(pl.caido ? '✚' : `×${pl.vidas}`, (k + 1) * larg - 6, y + 1);
  });
  g.restore();
}

/* ---------- partida inteira ---------- */

// `alfa` (0 a 1): quanto do próximo passo já passou. O desenho fica entre o passo anterior e o atual (L.entre).
export function desenharPartida(g, p, ef, t, vista = VISTA_PADRAO, alfa = 1) {
  pintarFundoDaOnda(g, t, vista, p.fase);

  const tr = deslocamentoDoTremor(ef);
  g.save();
  if (vista.ex > 0.5) {
    // em tela larga, nada do jogo aparece fora do campo
    g.beginPath();
    g.rect(0, -vista.ey, L.LARGURA, L.ALTURA + 2 * vista.ey);
    g.clip();
  }
  g.translate(tr.x, tr.y);

  const entre = (o) => [L.entre(o.xa, o.x, alfa), L.entre(o.ya, o.y, alfa)];
  desenharChefe(g, p, t, alfa, vista, resolucao(), Q.halos);
  desenharInimigos(g, p, t, alfa, vista);
  for (const c of p.capsulas) desenharCapsula(g, c, ...entre(c), t);
  for (const m of p.meteoros) desenharMeteoro(g, m, ...entre(m), t);
  for (const s of p.disparos) desenharTiroInimigo(g, s, ...entre(s), t);
  for (const tiro of p.tiros) desenharLaser(g, ...entre(tiro), tiro.vx);
  if (p.resgates && p.resgates.length) desenharResgates(g, p, t);
  if (p.aliados && p.aliados.length) desenharColegas(g, p, t, alfa);

  // nave do jogador (pisca quando está invulnerável; no esquadrão, caída, fica só a cápsula de resgate)
  const jx = L.entre(p.jxAntes, p.jx, alfa);
  if (!p.caido && !(p.invulneravel > 0 && Math.floor(p.invulneravel * 14) % 2 === 0)) {
    desenharJogador(g, jx, L.Y_JOGADOR, t, p.vx);
    if (p.poderes.teia > 0) desenharTeiaNaNave(g, jx, L.Y_JOGADOR, p.poderes.teia);
  }
  if (p.poderes.escudo && !p.caido) desenharEscudoJogador(g, jx, L.Y_JOGADOR, t);

  desenharEfeitos(g, ef);
  g.restore();

  if (p.poderes.lento > 0) {
    // câmera lenta: a tela fica levemente roxa
    g.fillStyle = `rgba(140,90,255,${0.08 * Math.min(1, p.poderes.lento)})`;
    g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  }
  if (ef.clarao > 0) {
    g.fillStyle = `rgba(${ef.corClarao},${ef.clarao * (menosClarao ? 0.2 : 0.55)})`;
    g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  }

  // o painel fica no topo da tela, abaixo da área que o celular reserva
  g.save();
  g.translate(0, -vista.ey + vista.topo);
  desenharHud(g, p, t, vista.topo);
  desenharBarraDoChefe(g, p, t);
  g.restore();
  if (p.esquadrao) desenharPlacarDoEsquadrao(g, p, vista);
  if (p.abertura > 0) desenharFaixa(g, p);
}
