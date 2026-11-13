// Desenho da partida no canvas. O campo do jogo é 360 x 640; em celulares compridos a tela mostra
// também um pedaço acima e abaixo dele (o cenário cobre essa sobra e o painel sobe para o topo).
import * as L from './logica.js?v=3';
import { TIPOS, desenharInimigo, desenharJogador } from './naves.js?v=3';
import { desenharEfeitos, deslocamentoDoTremor } from './efeitos.js?v=3';
import { CENARIOS, desenharCenario, TOPO, BASE } from './cenario.js?v=3';

const TAU = Math.PI * 2;
const ESCURO = '#02030c';

// vista: quanto da tela sobra além do campo, em unidades do jogo.
// ex = sobra de cada lado; ey = sobra em cima e embaixo; topo = área do celular que o painel deve evitar.
export const VISTA_PADRAO = { ex: 0, ey: 0, topo: 0 };

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
  desenharCenario(g, t, indice, mov);
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
const troca = { atual: -1, anterior: -1, t0: 0 };
const DURACAO_TROCA = 1.4;

function pintarFundoDaOnda(g, t, vista, fase) {
  const c = L.cenarioDaFase(fase);
  if (c !== troca.atual) {
    troca.anterior = troca.atual;
    troca.atual = c;
    troca.t0 = t;
  }
  const k = troca.anterior < 0 ? 1 : (t - troca.t0) / DURACAO_TROCA;
  pintarFundo(g, t, vista, k < 0.5 ? troca.anterior : c);
  if (k < 1) {
    g.fillStyle = `rgba(2,3,12,${1 - Math.abs(2 * k - 1)})`;
    g.fillRect(0, -vista.ey, L.LARGURA, L.ALTURA + 2 * vista.ey);
  }
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

// tiro dos inimigos: plasma verde ácido (bem diferente do fogo dos cenários)
function desenharPlasma(g, s, t) {
  g.save();
  g.globalCompositeOperation = 'lighter';
  const cauda = g.createLinearGradient(0, s.y, 0, s.y - 26);
  cauda.addColorStop(0, 'rgba(150,255,60,.7)');
  cauda.addColorStop(1, 'rgba(150,255,60,0)');
  g.fillStyle = cauda;
  g.fillRect(s.x - 2.5, s.y - 26, 5, 26);
  const pulsa = 1 + 0.15 * Math.sin(t * 30 + s.x);
  const r = 9.5 * pulsa;
  const orbe = g.createRadialGradient(s.x, s.y, 0, s.x, s.y, r);
  orbe.addColorStop(0, 'rgba(255,255,235,1)');
  orbe.addColorStop(0.35, 'rgba(170,255,60,.95)');
  orbe.addColorStop(1, 'rgba(40,190,40,0)');
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
  const fundo = g.createLinearGradient(0, 255, 0, 410);
  fundo.addColorStop(0, 'rgba(4,6,26,0)');
  fundo.addColorStop(0.25, 'rgba(4,6,26,.78)');
  fundo.addColorStop(0.75, 'rgba(4,6,26,.78)');
  fundo.addColorStop(1, 'rgba(4,6,26,0)');
  g.fillStyle = fundo;
  g.fillRect(0, 255, L.LARGURA, 155);
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
  g.shadowBlur = 0;
  g.fillStyle = 'rgba(225,232,255,.8)';
  g.font = `700 11px ${FONTE}`;
  textoEsp(g, CENARIOS[L.cenarioDaFase(p.fase)].nome.toUpperCase(), L.LARGURA / 2, 374, 2.2, 'center');
  g.restore();
}

/* ---------- partida inteira ---------- */

export function desenharPartida(g, p, ef, t, vista = VISTA_PADRAO) {
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

  // inimigos: dois quadros de animação e inclinação ao andar de lado
  for (const n of p.naves) {
    if (!n.vivo) continue;
    g.save();
    g.translate(n.x, n.y);
    g.rotate(n.inclina);
    desenharInimigo(g, p.tipo, Math.floor(t * 5 + n.i) % 2);
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
    g.fillRect(-vista.ex, -vista.ey, L.LARGURA + 2 * vista.ex, L.ALTURA + 2 * vista.ey);
  }

  // o painel fica no topo da tela, abaixo da área que o celular reserva
  g.save();
  g.translate(0, -vista.ey + vista.topo);
  desenharHud(g, p, t, vista.topo);
  g.restore();
  if (p.abertura > 0) desenharFaixa(g, p);
}
