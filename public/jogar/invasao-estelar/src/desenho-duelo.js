// Desenho do duelo frente a frente (Etapa 4): a minha nave embaixo, a do adversário em cima (de cabeça para baixo),
// asteroides no meio para se esconder, alienígenas que cruzam e as paredes que fecham se a rodada demora.
import * as L from './logica.js?v=11';
import { pintarFundo, desenharLaser, desenharCapsula, desenharEscudoJogador, textoEsp } from './desenho.js?v=11';
import { desenharJogador, desenharOutraNave, desenharInimigo, TIPOS } from './naves.js?v=11';
import { desenharEfeitos, deslocamentoDoTremor, CORES_CAPSULA, NOMES_CAPSULA } from './efeitos.js?v=11';
import { Y_EU, Y_ELE, Y_MEIO, CONTAGEM, VIDAS, asteroides, aliens, parede, posicaoDele, ORDEM_NAVES, ORDEM_CORES } from './duelo.js?v=11';

const TAU = Math.PI * 2;
const FONTE = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
export const COR_ADVERSARIO = ['255,110,150', '255,150,190']; // os tiros dele: rosa (os meus são azul-claro)
const ROSA = '#ff8fb8';
const CIANO = '#7df3ff';

// Pedra do meio: um polígono irregular com crateras, girando devagar.
const FORMA_PEDRA = [1, 0.86, 0.97, 0.8, 1.04, 0.9, 0.82, 1, 0.88, 0.95];
function desenharPedra(g, x, y, r, giro) {
  g.save();
  g.translate(x, y);
  g.rotate(giro);
  const corpo = g.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.15, 0, 0, r * 1.05);
  corpo.addColorStop(0, '#9a8a7c');
  corpo.addColorStop(0.6, '#5d5047');
  corpo.addColorStop(1, '#2b231f');
  g.fillStyle = corpo;
  g.strokeStyle = '#1a1412';
  g.lineWidth = 2;
  g.beginPath();
  FORMA_PEDRA.forEach((k, i) => {
    const a = (i / FORMA_PEDRA.length) * TAU;
    const px = Math.cos(a) * r * k;
    const py = Math.sin(a) * r * k;
    if (i) g.lineTo(px, py); else g.moveTo(px, py);
  });
  g.closePath();
  g.fill();
  g.stroke();
  g.fillStyle = 'rgba(30,22,18,.55)';
  for (const [cx, cy, cr] of [[-0.3, 0.2, 0.22], [0.35, -0.2, 0.16], [0.1, 0.45, 0.12]]) {
    g.beginPath(); g.arc(cx * r, cy * r, cr * r, 0, TAU); g.fill();
  }
  g.restore();
}

// Alienígena cruzando o meio: brilha na cor da cápsula que solta.
function desenharAlien(g, a, t, pedido) {
  const cor = CORES_CAPSULA[a.capsula] || '#ffffff';
  g.save();
  g.globalCompositeOperation = 'lighter';
  const halo = g.createRadialGradient(a.x, a.y, 4, a.x, a.y, 34);
  halo.addColorStop(0, cor + '88');
  halo.addColorStop(1, cor + '00');
  g.fillStyle = halo;
  g.beginPath(); g.arc(a.x, a.y, 34, 0, TAU); g.fill();
  g.restore();
  g.save();
  g.globalAlpha = pedido ? 0.45 : 1;
  g.translate(a.x, a.y);
  desenharInimigo(g, a.tipo % TIPOS.length, Math.floor(t * 6 + a.i) % 2, 0.7);
  g.restore();
}

function linhaDoMeio(g, t) {
  g.save();
  g.strokeStyle = 'rgba(160,190,255,.16)';
  g.lineWidth = 1.5;
  g.setLineDash([8, 10]);
  g.lineDashOffset = -t * 12;
  g.beginPath(); g.moveTo(0, Y_MEIO); g.lineTo(L.LARGURA, Y_MEIO); g.stroke();
  g.restore();
}

// Paredes de energia que fecham dos lados quando a rodada demora.
function desenharParedes(g, larg, t, vista) {
  if (larg <= 0) return;
  const y0 = -vista.ey;
  const alt = L.ALTURA + 2 * vista.ey;
  for (const lado of [0, 1]) {
    const x = lado ? L.LARGURA - larg : 0;
    g.save();
    g.fillStyle = 'rgba(255,70,110,.14)';
    g.fillRect(x, y0, larg, alt);
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = `rgba(255,90,130,${0.55 + 0.25 * Math.sin(t * 9)})`;
    g.fillRect(lado ? x : x + larg - 3, y0, 3, alt);
    g.restore();
  }
}

function navesPequenas(g, quantas, x, y, cor, passo) {
  for (let i = 0; i < VIDAS; i++) {
    g.save();
    g.globalAlpha = i < quantas ? 1 : 0.2;
    g.fillStyle = cor;
    g.translate(x + i * passo, y);
    g.beginPath();
    g.moveTo(0, -6); g.lineTo(6, 5); g.lineTo(0, 2); g.lineTo(-6, 5);
    g.closePath();
    g.fill();
    g.restore();
  }
}

// Painel: o adversário em cima (perto da nave dele), eu embaixo (perto da minha).
function desenharPainel(g, d, info, t, vista) {
  g.save();
  g.translate(0, -vista.ey + vista.topo);
  const painel = g.createLinearGradient(0, 0, 0, 72);
  painel.addColorStop(0, 'rgba(5,7,28,.95)');
  painel.addColorStop(1, 'rgba(5,7,28,.7)');
  g.fillStyle = painel;
  g.fillRect(0, -vista.topo, L.LARGURA, 72 + vista.topo);
  g.fillStyle = 'rgba(255,143,184,.5)';
  g.fillRect(0, 71, L.LARGURA, 1);
  g.textBaseline = 'alphabetic';
  // adversário
  g.fillStyle = 'rgba(255,190,215,.8)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'ADVERSÁRIO', 14, 18, 1.4);
  g.fillStyle = ROSA;
  g.font = `800 14px ${FONTE}`;
  g.fillText(info.nomeDele, 14, 37, 150);
  navesPequenas(g, d.ele.vidas, 20, 56, ROSA, 16);
  // rodada e placar
  g.textAlign = 'center';
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, `RODADA ${d.rodada}`, L.LARGURA / 2 + 30, 18, 1.4, 'center');
  g.font = `900 24px ${FONTE}`;
  g.fillStyle = CIANO;
  g.fillText(String(info.minhas), L.LARGURA / 2 + 4, 46);
  g.fillStyle = 'rgba(255,255,255,.6)';
  g.fillText('×', L.LARGURA / 2 + 30, 45);
  g.fillStyle = ROSA;
  g.fillText(String(info.dele), L.LARGURA / 2 + 56, 46);
  g.fillStyle = 'rgba(160,190,255,.6)';
  g.font = `700 8px ${FONTE}`;
  g.fillText('você', L.LARGURA / 2 + 4, 60);
  g.fillText('rival', L.LARGURA / 2 + 56, 60);
  g.textAlign = 'left';
  // botão de sair (no lugar do de pausa: o toque nessa área é tratado em main.js)
  const b = L.AREA_PAUSA;
  g.fillStyle = 'rgba(255,255,255,.08)';
  g.strokeStyle = 'rgba(255,255,255,.4)';
  g.lineWidth = 1.2;
  g.beginPath(); g.roundRect ? g.roundRect(b.x + 6, b.y + 4, 26, 21, 6) : g.rect(b.x + 6, b.y + 4, 26, 21); g.fill(); g.stroke();
  g.strokeStyle = '#ffffff';
  g.lineWidth = 2.2;
  g.beginPath();
  g.moveTo(b.x + 14, b.y + 9.5); g.lineTo(b.x + 24, b.y + 19.5);
  g.moveTo(b.x + 24, b.y + 9.5); g.lineTo(b.x + 14, b.y + 19.5);
  g.stroke();
  g.restore();

  // eu, embaixo
  g.save();
  g.fillStyle = 'rgba(160,190,255,.75)';
  g.font = `700 9px ${FONTE}`;
  textoEsp(g, 'VOCÊ', 14, L.ALTURA - 26, 1.4);
  navesPequenas(g, d.eu.vidas, 22, L.ALTURA - 12, CIANO, 16);
  if (d.eu.arma) {
    g.textAlign = 'right';
    g.fillStyle = CORES_CAPSULA[d.eu.arma] || '#fff';
    g.font = `800 11px ${FONTE}`;
    g.fillText(`${NOMES_CAPSULA[d.eu.arma] || ''} ${Math.ceil(d.eu.armaT)} s`, L.LARGURA - 14, L.ALTURA - 14);
  }
  g.restore();
}

// Texto grande no meio: contagem, "rodada 2", "você venceu a rodada"...
function desenharAvisoGrande(g, titulo, sub, cor, t) {
  g.save();
  const fundo = g.createLinearGradient(0, Y_MEIO - 70, 0, Y_MEIO + 60);
  fundo.addColorStop(0, 'rgba(4,6,26,0)');
  fundo.addColorStop(0.3, 'rgba(4,6,26,.75)');
  fundo.addColorStop(0.7, 'rgba(4,6,26,.75)');
  fundo.addColorStop(1, 'rgba(4,6,26,0)');
  g.fillStyle = fundo;
  g.fillRect(0, Y_MEIO - 70, L.LARGURA, 130);
  g.textAlign = 'center';
  g.fillStyle = cor;
  g.shadowColor = cor;
  g.shadowBlur = 14;
  g.font = `900 ${titulo.length > 3 ? 30 : 54}px ${FONTE}`;
  g.fillText(titulo, L.LARGURA / 2, Y_MEIO + (titulo.length > 3 ? 6 : 16) + Math.sin(t * 6) * 1.5);
  g.shadowBlur = 0;
  if (sub) {
    g.fillStyle = 'rgba(225,232,255,.85)';
    g.font = `700 12px ${FONTE}`;
    g.fillText(sub, L.LARGURA / 2, Y_MEIO + 40);
  }
  g.restore();
}

// `info`: { nomeDele, minhas, dele (rodadas ganhas), aviso: { titulo, sub, cor } ou null }
export function desenharDuelo(g, d, ef, t, vista, alfa, agora, info) {
  pintarFundo(g, t, vista, (d.rodada - 1) % 4, 0.4);
  g.fillStyle = 'rgba(2,3,12,.4)';
  g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  const tr = deslocamentoDoTremor(ef);
  g.save();
  if (vista.ex > 0.5) {
    g.beginPath();
    g.rect(0, -vista.ey, L.LARGURA, L.ALTURA + 2 * vista.ey);
    g.clip();
  }
  g.translate(tr.x, tr.y);
  linhaDoMeio(g, t);
  desenharParedes(g, parede(d), t, vista);
  for (const a of asteroides(d)) desenharPedra(g, a.x, a.y, a.r, a.giro);
  for (const a of aliens(d)) desenharAlien(g, a, t, d.aliensPedidos.has(a.i));
  for (const c of d.capsulas) desenharCapsula(g, c, c.x, c.y, t);

  // tiros dele: andam a partir da última posição que ele mandou (calculados na hora, para sair liso)
  const idade = d.ele.recebido < 0 ? 0 : Math.max(0, (agora - d.ele.recebido) / 1000);
  for (const s of d.ele.tiros) {
    if (!s.fora) desenharLaser(g, s.x0 + s.vxm * idade, s.y0 + s.vy * idade, s.vxm, { paraBaixo: true, cor: COR_ADVERSARIO });
  }
  for (const s of d.eu.tiros) desenharLaser(g, L.entre(s.xa, s.x, alfa), L.entre(s.ya, s.y, alfa), s.vx);

  // nave dele, em cima, de cabeça para baixo (pisca quando está protegida depois de um tiro)
  const xe = posicaoDele(d, agora);
  if (d.ele.vidas > 0 && !(d.ele.invulneravel && Math.floor(t * 14) % 2 === 0)) {
    desenharOutraNave(g, ORDEM_NAVES[d.ele.nave] || 'padrao', ORDEM_CORES[d.ele.cor] || 'vermelha', xe, Y_ELE, t, d.ele.vx, 1, true);
  }
  if (d.ele.escudo && d.ele.vidas > 0) desenharEscudoJogador(g, xe, Y_ELE, t);

  // a minha nave
  const xm = L.entre(d.eu.xa, d.eu.x, alfa);
  if (!d.perdeu && !(d.eu.invulneravel > 0 && Math.floor(d.eu.invulneravel * 14) % 2 === 0)) desenharJogador(g, xm, Y_EU, t, d.eu.vx);
  if (d.eu.escudo && !d.perdeu) desenharEscudoJogador(g, xm, Y_EU, t);

  desenharEfeitos(g, ef);
  g.restore();
  if (ef.clarao > 0) {
    g.fillStyle = `rgba(${ef.corClarao},${ef.clarao * 0.35})`;
    g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  }
  desenharPainel(g, d, info, t, vista);

  if (info.aviso) {
    desenharAvisoGrande(g, info.aviso.titulo, info.aviso.sub, info.aviso.cor || '#ffd45e', t);
  } else if (d.t < CONTAGEM + 0.6) {
    const falta = CONTAGEM - d.t;
    if (falta > 0) desenharAvisoGrande(g, String(Math.ceil(falta / (CONTAGEM / 3))), d.t < 0.9 ? `Rodada ${d.rodada}` : '', '#ffd45e', t);
    else desenharAvisoGrande(g, 'VALENDO!', '', '#7dff9a', t);
  }
}
