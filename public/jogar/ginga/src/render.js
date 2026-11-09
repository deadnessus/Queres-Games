// Desenho no canvas. Coordenadas em unidades do mundo (360 de largura), vistas de cima.
import { CONFIG } from './config.js';
import * as R from './regras.js';
import { CAMPO, dxPostura, PASSOS_TUTORIAL } from './jogo.js';
import {
  PE, KITS, POSE, poseCorrida, misturar, aparencia, APARENCIA_JOGADOR, APARENCIA_GOLEIRO,
  desenharBoneco, desenharDeitado, criarSpriteBola, desenharBola,
} from './sprites.js';
import { GRAMA, TORCIDA, PLACA, LATERAL, criarGrama, criarTorcida, criarPlacas, criarLateral } from './cenario.js';
import { criarParticulas } from './efeitos.js';
import { criarBola } from './bola.js';

const M = CONFIG.mundo;
const TAU = Math.PI * 2;

const COR = {
  linha: 'rgba(255,255,255,0.88)',
  verde: '#8CF0A0',
  amarelo: '#FFD23F',
  escuro: 'rgba(6,25,13,0.86)',
  vermelho: '#D7263D',
  bloco: '#7A1020',
  golBarra: '#39C16C',
  contorno: '#0D2416',
};

const FONTE_D = '"Saira Extra Condensed", "Barlow Condensed", "Arial Narrow", sans-serif';
const FONTE_B = '"Barlow Condensed", "Arial Narrow", system-ui, sans-serif';
const R_MIN = 30;
const R_MAX = 78;

// Geometria do campo (unidades do mundo).
const LINHA_ESQ = 24;
const LINHA_DIR = 336;
const DIST_PLACA = 44; // da linha de fundo até as placas de publicidade

const ease = (u) => u * u * (3 - 2 * u);
const easeBack = (u) => {
  const t = u - 1;
  return 1 + 2.70158 * t * t * t + 1.70158 * t * t;
};
const lerp = (a, b, u) => a + (b - a) * u;

function clarear(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.round(v + (255 - v) * f);
  return `rgb(${c((n >> 16) & 255)},${c((n >> 8) & 255)},${c(n & 255)})`;
}

export function criarRender(canvas) {
  const ctx = canvas.getContext('2d');
  const v = { escala: 1, dpr: 1, W: M.largura, H: 640, topo: 0, larguraCss: 360, alturaCss: 640 };
  const fx = criarParticulas();
  const bola = criarBola();
  const bolaMenu = criarBola();
  const jogoMenu = { pts: {}, bolaDono: 'jogador', anim: null, tackle: null, chute: null, distGol: null, duelo: null };
  let tex = null;
  let relogio = 0;
  let sacudida = 0;
  let acumPisada = 0;
  let acumPoeira = 0;
  let leanJog = 0;
  let jogDXAnterior = 0;
  let trilha = [];
  let anterior = { estado: null, tackle: false, anunciado: false, chegada: false };

  function construirTexturas() {
    const px = v.dpr * v.escala;
    if (tex && Math.abs(tex.px - px) < 0.01) return;
    tex = {
      px,
      grama: criarGrama(px),
      torcida: criarTorcida(px),
      placas: criarPlacas(px, FONTE_B),
      lateral: criarLateral(px),
      bola: criarSpriteBola(px),
    };
  }

  function redimensionar() {
    const r = canvas.getBoundingClientRect();
    v.larguraCss = r.width || 360;
    v.alturaCss = r.height || 640;
    v.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(v.larguraCss * v.dpr);
    canvas.height = Math.round(v.alturaCss * v.dpr);
    v.escala = v.larguraCss / M.largura;
    v.H = v.alturaCss / v.escala;
    construirTexturas();
  }

  // As placas usam texto: refaz quando a fonte terminar de carregar.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (tex) tex.placas = criarPlacas(tex.px, FONTE_B);
    });
  }

  // ---------- auxiliares ----------

  function retArredondado(x, y, w, h, r) {
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

  function seta(x1, y1, x2, y2, cor = '#FFFFFF') {
    const ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const [w, c] of [[5, 'rgba(5,22,11,0.45)'], [2.5, cor]]) {
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.moveTo(x2 - 7 * Math.cos(ang - 0.6), y2 - 7 * Math.sin(ang - 0.6));
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2 - 7 * Math.cos(ang + 0.6), y2 - 7 * Math.sin(ang + 0.6));
      ctx.stroke();
    }
    ctx.restore();
  }

  function tracos(lista, cor = 'rgba(255,255,255,0.65)', largura = 2) {
    ctx.save();
    ctx.strokeStyle = cor;
    ctx.lineWidth = largura;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (const [x1, y1, x2, y2] of lista) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();
    ctx.restore();
  }

  function balao(texto, x, y, { fundo = COR.escuro, cor = '#FFFFFF', tamanho = 12.5, peso = 600 } = {}) {
    ctx.save();
    ctx.font = `${peso} ${tamanho}px ${FONTE_B}`;
    const w = ctx.measureText(texto).width + 20;
    const h = tamanho + 11;
    let bx = x - w / 2;
    bx = Math.max(8, Math.min(M.largura - 8 - w, bx));
    retArredondado(bx, y - h / 2, w, h, h / 2);
    ctx.fillStyle = fundo;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.stroke();
    ctx.fillStyle = cor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, bx + w / 2, y + 1);
    ctx.restore();
  }

  function quebrarTexto(texto, larguraMax) {
    const palavras = texto.split(' ');
    const linhas = [];
    let atual = '';
    for (const p of palavras) {
      const teste = atual ? `${atual} ${p}` : p;
      if (ctx.measureText(teste).width > larguraMax && atual) {
        linhas.push(atual);
        atual = p;
      } else {
        atual = teste;
      }
    }
    if (atual) linhas.push(atual);
    return linhas;
  }

  // ---------- campo ----------

  function campo(distancia) {
    const alt = GRAMA.altura;
    const s = v.dpr * v.escala;
    const off = ((distancia % alt) + alt) % alt;
    for (let y = off - alt; y < v.H; y += alt) {
      const yy = Math.round(y * s) / s;
      ctx.drawImage(tex.grama, 0, yy, GRAMA.largura, alt + 1 / s);
    }
  }

  // Faixa fora do campo, placas laterais e linhas laterais. `fundoY`: onde termina o campo (linha de fundo).
  function laterais(distancia, fundoY) {
    ctx.fillStyle = 'rgba(2,28,10,0.34)';
    ctx.fillRect(0, 0, LINHA_ESQ, v.H);
    ctx.fillRect(LINHA_DIR, 0, M.largura - LINHA_DIR, v.H);
    const alt = LATERAL.altura;
    const off = ((distancia % alt) + alt) % alt;
    for (let y = off - alt; y < v.H; y += alt) ctx.drawImage(tex.lateral, 0, y, LATERAL.largura, alt);
    ctx.save();
    ctx.translate(M.largura, 0);
    ctx.scale(-1, 1);
    for (let y = off - alt; y < v.H; y += alt) ctx.drawImage(tex.lateral, 0, y, LATERAL.largura, alt);
    ctx.restore();
    ctx.fillStyle = 'rgba(0,12,4,0.32)';
    ctx.fillRect(LATERAL.largura, 0, 3, v.H);
    ctx.fillRect(M.largura - LATERAL.largura - 3, 0, 3, v.H);
    const y0 = Math.max(0, fundoY);
    ctx.strokeStyle = COR.linha;
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(LINHA_ESQ, y0);
    ctx.lineTo(LINHA_ESQ, v.H);
    ctx.moveTo(LINHA_DIR, y0);
    ctx.lineTo(LINHA_DIR, v.H);
    ctx.stroke();
  }

  function vinheta() {
    const g1 = ctx.createLinearGradient(0, 0, M.largura, 0);
    g1.addColorStop(0, 'rgba(0,20,8,0.34)');
    g1.addColorStop(0.24, 'rgba(0,20,8,0)');
    g1.addColorStop(0.76, 'rgba(0,20,8,0)');
    g1.addColorStop(1, 'rgba(0,20,8,0.34)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, M.largura, v.H);
    const g2 = ctx.createLinearGradient(0, 0, 0, v.H);
    g2.addColorStop(0, 'rgba(0,16,6,0.30)');
    g2.addColorStop(0.2, 'rgba(0,16,6,0)');
    g2.addColorStop(0.82, 'rgba(0,16,6,0)');
    g2.addColorStop(1, 'rgba(0,16,6,0.24)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, M.largura, v.H);
  }

  // Estádio atrás do gol: faixa de escape, placas e arquibancada.
  function fundoDoGol(gy) {
    const yPlaca = gy - DIST_PLACA - PLACA.altura;
    if (yPlaca > v.H) return;
    // faixa de escape (grama mais escura)
    ctx.fillStyle = 'rgba(2,28,10,0.30)';
    ctx.fillRect(0, gy - DIST_PLACA, M.largura, DIST_PLACA);
    // arquibancada
    const alt = TORCIDA.altura;
    const s = v.dpr * v.escala;
    for (let y = yPlaca - alt; y + alt > -1; y -= alt) {
      const yy = Math.round(y * s) / s;
      ctx.drawImage(tex.torcida, 0, yy, TORCIDA.largura, alt + 1 / s);
    }
    const sombra = ctx.createLinearGradient(0, yPlaca, 0, yPlaca - 260);
    sombra.addColorStop(0, 'rgba(0,8,6,0.10)');
    sombra.addColorStop(1, 'rgba(0,8,6,0.78)');
    ctx.fillStyle = sombra;
    ctx.fillRect(0, yPlaca - 260, M.largura, 260);
    // placas
    ctx.drawImage(tex.placas, 0, yPlaca, 360, PLACA.altura);
    ctx.fillStyle = 'rgba(0,12,4,0.38)';
    ctx.fillRect(0, yPlaca + PLACA.altura, M.largura, 5);
  }

  function linhasDaArea(gy) {
    const ga = CAMPO.grandeArea;
    const pa = CAMPO.pequenaArea;
    const cx = M.xCentro;
    ctx.save();
    ctx.strokeStyle = COR.linha;
    ctx.lineWidth = 2.6;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(LINHA_ESQ, gy);
    ctx.lineTo(LINHA_DIR, gy);
    ctx.rect(cx - ga.largura / 2, gy, ga.largura, ga.profundidade);
    ctx.rect(cx - pa.largura / 2, gy, pa.largura, pa.profundidade);
    ctx.stroke();
    const py = gy + CAMPO.penalti;
    const teta = Math.acos((ga.profundidade - CAMPO.penalti) / CAMPO.raioMeiaLua);
    ctx.beginPath();
    ctx.arc(cx, py, CAMPO.raioMeiaLua, Math.PI / 2 - teta, Math.PI / 2 + teta);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, py, 2.6, 0, TAU);
    ctx.fillStyle = COR.linha;
    ctx.fill();
    ctx.restore();
  }

  function gol(gy, jogo) {
    const L = CAMPO.traveEsq;
    const Rr = CAMPO.traveDir;
    const p = CAMPO.profRede;
    ctx.save();
    ctx.fillStyle = 'rgba(0,16,4,0.24)';
    ctx.fillRect(L + 3, gy - p + 4, Rr - L, p);
    ctx.fillStyle = 'rgba(232,244,238,0.15)';
    ctx.fillRect(L, gy - p, Rr - L, p);
    ctx.save();
    ctx.beginPath();
    ctx.rect(L, gy - p, Rr - L, p);
    ctx.clip();
    ctx.strokeStyle = 'rgba(255,255,255,0.42)';
    ctx.lineWidth = 0.7;
    ctx.beginPath();
    for (let k = -p; k < Rr - L + p; k += 5.5) {
      ctx.moveTo(L + k, gy - p);
      ctx.lineTo(L + k + p, gy);
      ctx.moveTo(L + k + p, gy - p);
      ctx.lineTo(L + k, gy);
    }
    ctx.stroke();
    if (jogo && jogo.chute && jogo.chute.resultado === 'GOL' && jogo.chute.t > 0.4) {
      const b = Math.max(0, 1 - (jogo.chute.t - 0.4) / 0.55);
      ctx.fillStyle = `rgba(255,255,255,${(0.34 * b).toFixed(3)})`;
      ctx.fillRect(L, gy - p, Rr - L, p);
    }
    ctx.restore();
    ctx.strokeStyle = '#F4F7F2';
    ctx.lineWidth = 2.4;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(L, gy);
    ctx.lineTo(L, gy - p);
    ctx.lineTo(Rr, gy - p);
    ctx.lineTo(Rr, gy);
    ctx.stroke();
    for (const x of [L, Rr]) {
      ctx.fillStyle = 'rgba(0,16,4,0.3)';
      ctx.beginPath();
      ctx.ellipse(x + 2, gy + 2.6, 3.6, 3, 0, 0, TAU);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, gy, 3.3, 0, TAU);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = COR.contorno;
      ctx.stroke();
    }
    ctx.restore();
  }

  function linhasDeVelocidade(distancia) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 9; i++) {
      const x = 34 + ((i * 97) % 292);
      const y = ((distancia * 1.7 + i * 151) % (v.H + 120)) - 60;
      const len = 22 + (i % 3) * 10;
      ctx.strokeStyle = `rgba(255,255,255,${0.04 + (i % 3) * 0.015})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + len);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ---------- personagens ----------
  // Os bonecos ficam em pé: (X, Y) é o CENTRO do corpo e os pés ficam PE unidades abaixo.

  function mixPostura(duelo) {
    if (!duelo || !duelo.posturaVisivel) return 0;
    return ease(R.clamp((duelo.mudouEm - duelo.ttc) / 0.15, 0, 1));
  }

  function poseParada(t) {
    return misturar(POSE.jockey, POSE.parado, 0.5 + 0.5 * Math.sin(t * 4));
  }

  function defensor(x, y, postura, mix, { dxExtra = 0, rot = 0, id = 0, sinais = true, alpha = 1, bloqueio = null } = {}) {
    const dx = dxPostura(postura) * mix;
    let dy = 0;
    let escala = 1;
    let pose = poseParada(relogio + id);
    let deitado = false;
    if (postura === 'FECHA_ESQ') {
      pose = misturar(pose, POSE.passoE, mix);
    } else if (postura === 'FECHA_DIR') {
      pose = misturar(pose, POSE.passoD, mix);
    } else if (postura === 'BOTE') {
      dy = 10 * mix;
      escala = 1 + 0.12 * mix;
      const w = Math.sin(relogio * 16) * 3.2;
      const aberta = POSE.abertas.slice();
      aberta[1] = 1 - Math.max(0, w) * 2.2;
      aberta[3] = 1 - Math.max(0, -w) * 2.2;
      pose = misturar(pose, aberta, mix);
    } else if (postura === 'CONTIDO') {
      dy = -10 * mix;
      pose = misturar(pose, POSE.jockey, mix);
    } else if (postura === 'CARRINHO') {
      dy = 9 * mix;
      deitado = mix > 0.55;
      pose = misturar(pose, POSE.jockey, mix);
    }
    if (bloqueio && bloqueio.u > 0) {
      // anda até a bola (passos curtos) e estica a perna para fechar a passagem
      const andando = bloqueio.u < 1 ? Math.sin(relogio * 18) * 2.5 * (1 - bloqueio.u) : 0;
      pose = misturar(pose, bloqueio.lado > 0 ? POSE.bloqueioD : POSE.bloqueioE, ease(bloqueio.u)).slice();
      pose[1] += andando;
      pose[3] -= andando;
      deitado = false;
    }
    const X = x + dx + dxExtra;
    const Y = y + dy;
    const pe = Y + PE;
    // marca no gramado sob o defensor
    if (sinais && mix > 0) {
      ctx.fillStyle = `rgba(215,38,61,${(0.18 * mix).toFixed(3)})`;
      ctx.beginPath();
      ctx.ellipse(X, pe, 27, 10, 0, 0, TAU);
      ctx.fill();
    }
    if (postura === 'CARRINHO' && mix > 0.2) {
      ctx.save();
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(0,22,6,${(0.26 * mix).toFixed(3)})`;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(X, pe - 70 * mix);
      ctx.lineTo(X, pe - 2);
      ctx.stroke();
      ctx.restore();
    }
    if (deitado) {
      desenharDeitado(ctx, { x: X, y: Y + 2, modo: 'carrinho', kit: KITS.defensor, aparencia: aparencia(id), alpha });
    } else {
      desenharBoneco(ctx, {
        x: X, y: pe, vista: 'frente', escala, rot: rot * 0.8, alpha,
        kit: KITS.defensor, aparencia: aparencia(id), pose,
      });
    }
    if (sinais && postura === 'BOTE' && mix > 0.3) {
      tracos([[X - 20, Y - 66, X - 20, Y - 46], [X, Y - 72, X, Y - 50], [X + 20, Y - 66, X + 20, Y - 46]], 'rgba(255,255,255,0.7)', 2.4);
    }
    if (sinais && postura === 'CARRINHO' && mix > 0.3) {
      tracos([[X - 34, Y - 36, X - 26, Y - 12], [X + 34, Y - 36, X + 26, Y - 12]], 'rgba(255,255,255,0.6)', 2.4);
    }
    if (sinais && mix > 0.5) {
      if (postura === 'FECHA_ESQ') seta(X + 22, pe + 14, X - 22, pe + 14);
      if (postura === 'FECHA_DIR') seta(X - 22, pe + 14, X + 22, pe + 14);
      if (postura === 'CONTIDO') seta(X, Y - 36, X, Y - 64);
    }
    return { X, Y, pe };
  }

  function goleiroBoneco(X, Y, postura, rot, mergulhando) {
    const pe = Y + PE;
    if (!mergulhando && postura === 'ABAFA') {
      tracos([[X - 24, Y - 60, X - 17, Y - 40], [X, Y - 66, X + 1, Y - 44], [X + 24, Y - 60, X + 17, Y - 40]], 'rgba(255,255,255,0.7)', 2.4);
      desenharDeitado(ctx, { x: X, y: Y, modo: 'abafa', kit: KITS.goleiro, aparencia: APARENCIA_GOLEIRO, luvas: true });
      return;
    }
    let pose;
    let escala = 1;
    if (mergulhando) {
      pose = POSE.esticado;
    } else if (postura === 'EM_PE') {
      pose = POSE.empe;
      escala = 1.06;
    } else {
      pose = misturar(POSE.empe, POSE.jockey, 0.5 + 0.5 * Math.sin(relogio * 3.4));
    }
    desenharBoneco(ctx, {
      x: X, y: pe, vista: 'frente', escala, rot,
      kit: KITS.goleiro, aparencia: APARENCIA_GOLEIRO, pose, luvas: true, numero: null,
    });
  }

  function jogadorBoneco(jx, py, jogo, correndo) {
    const fase = correndo ? jogo.distancia * 0.15 : relogio * 3.2;
    const pose = poseCorrida(fase, correndo ? 1 : 0.12);
    desenharBoneco(ctx, {
      x: jx, y: py + PE, vista: 'costas', numero: '10', incl: pose[9] + leanJog,
      kit: KITS.jogador, aparencia: APARENCIA_JOGADOR, pose,
    });
  }

  // ---------- anel de tempo ----------

  function anel(X, Y, duelo) {
    const lt = duelo.lt;
    const r0 = R.raioAnel(lt.fimJanela, lt, R_MIN, R_MAX);
    const r1 = R.raioAnel(lt.inicioJanela, lt, R_MIN, R_MAX);
    const janela = lt.inicioJanela - lt.fimJanela;
    const centro = lt.fimJanela + janela / 2;
    const ra = R.raioAnel(centro - janela / 6, lt, R_MIN, R_MAX);
    const rb = R.raioAnel(centro + janela / 6, lt, R_MIN, R_MAX);
    const rAtual = R.raioAnel(duelo.ttc, lt, R_MIN, R_MAX);
    const naFaixa = rAtual <= r1 + 0.4 && rAtual >= r0 - 0.4;
    const perfeito = rAtual >= ra && rAtual <= rb;
    ctx.save();
    const fundo = ctx.createRadialGradient(X, Y, r0, X, Y, R_MAX);
    fundo.addColorStop(0, 'rgba(255,255,255,0.10)');
    fundo.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = fundo;
    ctx.beginPath();
    ctx.arc(X, Y, R_MAX, 0, TAU);
    ctx.fill();
    // faixa verde
    ctx.beginPath();
    ctx.arc(X, Y, (r0 + r1) / 2, 0, TAU);
    ctx.lineWidth = r1 - r0;
    ctx.strokeStyle = naFaixa ? 'rgba(140,240,160,0.42)' : 'rgba(140,240,160,0.28)';
    ctx.stroke();
    ctx.lineWidth = 1.1;
    ctx.strokeStyle = 'rgba(160,255,180,0.8)';
    for (const r of [r0, r1]) {
      ctx.beginPath();
      ctx.arc(X, Y, r, 0, TAU);
      ctx.stroke();
    }
    // meio da faixa: toque perfeito
    ctx.beginPath();
    ctx.arc(X, Y, (ra + rb) / 2, 0, TAU);
    ctx.lineWidth = Math.max(2.4, rb - ra);
    ctx.strokeStyle = perfeito ? '#E4FFEA' : COR.verde;
    ctx.stroke();
    // anel que encolhe
    ctx.beginPath();
    ctx.arc(X, Y, rAtual, 0, TAU);
    ctx.lineWidth = 7;
    ctx.strokeStyle = naFaixa ? 'rgba(160,255,180,0.30)' : 'rgba(255,255,255,0.20)';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(X, Y, rAtual, 0, TAU);
    ctx.lineWidth = 2.6;
    ctx.strokeStyle = '#FFFFFF';
    ctx.stroke();
    ctx.restore();
  }

  function dica(chave, X, Y) {
    const texto = R.TEXTO_DICA[chave];
    ctx.save();
    ctx.font = `700 14px ${FONTE_B}`;
    const w = Math.max(ctx.measureText(texto).width, 70) + 20;
    const h = 42;
    let bx = X + 52;
    if (bx + w > M.largura - 6) bx = X - 52 - w;
    bx = Math.max(6, bx);
    const by = Y + 44;
    retArredondado(bx + 1, by + 3, w, h, 9);
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fill();
    retArredondado(bx, by, w, h, 9);
    ctx.fillStyle = COR.amarelo;
    ctx.fill();
    ctx.fillStyle = COR.contorno;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.font = `700 9.5px ${FONTE_B}`;
    ctx.fillText('DICA', bx + w / 2, by + 15);
    ctx.font = `700 14px ${FONTE_B}`;
    ctx.fillText(texto, bx + w / 2, by + 33);
    ctx.restore();
  }

  // ---------- barra de chute ----------

  function desenharBarra(jogo, py) {
    const b = jogo.barra;
    const cfg = CONFIG.barra;
    const x0 = 30;
    const w = 300;
    const topo = v.topo;
    const y = topo + 16;
    const h = 16;
    const X = (p) => x0 + p * w;
    ctx.save();
    const painel = ctx.createLinearGradient(0, topo, 0, topo + 70);
    painel.addColorStop(0, 'rgba(6,25,13,0.85)');
    painel.addColorStop(1, 'rgba(6,25,13,0.55)');
    ctx.fillStyle = painel;
    ctx.fillRect(0, topo, M.largura, 66);
    // trilho arredondado
    retArredondado(x0 - 2, y - 2, w + 4, h + 4, 9);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fill();
    ctx.save();
    retArredondado(x0, y, w, h, 7);
    ctx.clip();
    const faixas = [
      [0, cfg.fora, COR.vermelho],
      [cfg.fora, cfg.trave, COR.amarelo],
      [cfg.trave, 1 - cfg.trave, COR.golBarra],
      [1 - cfg.trave, 1 - cfg.fora, COR.amarelo],
      [1 - cfg.fora, 1, COR.vermelho],
    ];
    for (const [a, c, cor] of faixas) {
      ctx.fillStyle = cor;
      ctx.fillRect(X(a), y, X(c) - X(a), h);
    }
    const a = Math.max(cfg.trave, b.kc - b.hw);
    const c = Math.min(1 - cfg.trave, b.kc + b.hw);
    ctx.fillStyle = COR.bloco;
    ctx.fillRect(X(a), y, X(c) - X(a), h);
    ctx.fillStyle = 'rgba(255,255,255,0.10)';
    for (let hx = X(a) - h; hx < X(c); hx += 6) {
      ctx.beginPath();
      ctx.moveTo(hx, y + h);
      ctx.lineTo(hx + h, y);
      ctx.lineTo(hx + h + 2.5, y);
      ctx.lineTo(hx + 2.5, y + h);
      ctx.fill();
    }
    const brilho = ctx.createLinearGradient(0, y, 0, y + h);
    brilho.addColorStop(0, 'rgba(255,255,255,0.32)');
    brilho.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    brilho.addColorStop(1, 'rgba(0,0,0,0.18)');
    ctx.fillStyle = brilho;
    ctx.fillRect(x0, y, w, h);
    ctx.restore();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (X(c) - X(a) > 44) {
      ctx.font = `700 9px ${FONTE_B}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('GOLEIRO', (X(a) + X(c)) / 2, y + h / 2 + 0.5);
    }
    // marcador
    const mx = X(b.p);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(mx - 4, y - 3, 8, h + 6);
    ctx.beginPath();
    ctx.moveTo(mx - 7.5, y - 11);
    ctx.lineTo(mx + 7.5, y - 11);
    ctx.lineTo(mx, y - 1);
    ctx.closePath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 0.9;
    ctx.strokeStyle = COR.contorno;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mx, y);
    ctx.lineTo(mx, y + h);
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.4;
    ctx.stroke();
    // tempo restante
    retArredondado(x0, y + h + 8, w, 4, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fill();
    retArredondado(x0, y + h + 8, Math.max(4, w * (1 - b.t / b.duracao)), 4, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.88)';
    ctx.fill();
    ctx.font = `700 8px ${FONTE_B}`;
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText('FORA', X(cfg.fora / 2), y + h / 2 + 0.5);
    ctx.fillText('FORA', X(1 - cfg.fora / 2), y + h / 2 + 0.5);
    if (jogo.params.dicas) {
      const ch = b.chanceAtual();
      const rotulo = ch.zona === 'GOL' ? `${Math.floor(ch.chance)}%` : ch.zona === 'TRAVE' ? 'trave' : 'fora';
      ctx.font = `700 13px ${FONTE_B}`;
      ctx.fillStyle = ch.zona === 'GOL' && ch.chance >= 50 ? COR.verde : '#FF9B9B';
      ctx.fillText(rotulo, Math.max(48, Math.min(312, mx)), y + h + 24);
    }
    // ligação da barra com as traves
    const gy = py - jogo.distGol;
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(X(cfg.trave), y + h);
    ctx.lineTo(CAMPO.traveEsq, gy - CAMPO.profRede);
    ctx.moveTo(X(1 - cfg.trave), y + h);
    ctx.lineTo(CAMPO.traveDir, gy - CAMPO.profRede);
    ctx.stroke();
    ctx.setLineDash([]);
    // instrução
    ctx.font = `800 30px ${FONTE_D}`;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(6,25,13,0.75)';
    ctx.lineWidth = 5;
    const yi = Math.min(py + 70, v.H - 50);
    for (const [txt, dy] of [['TOQUE EM QUALQUER', 0], ['LUGAR PARA CHUTAR', 30]]) {
      ctx.strokeText(txt, M.xCentro, yi + dy);
      ctx.fillStyle = COR.amarelo;
      ctx.fillText(txt, M.xCentro, yi + dy);
    }
    ctx.restore();
  }

  // ---------- textos ----------

  function textos(jogo) {
    for (const t of jogo.textos) {
      const entrada = R.clamp(t.t / 0.22, 0, 1);
      const alpha = t.t > t.dur - 0.25 ? Math.max(0, (t.dur - t.t) / 0.25) : 1;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      if (t.tipo === 'faixa') {
        balao(t.texto, M.xCentro, v.topo + 30, { tamanho: 14, peso: 700, cor: COR.amarelo });
      } else {
        const y = v.H * 0.27;
        const s = 0.5 + 0.5 * easeBack(entrada);
        ctx.translate(M.xCentro, y);
        ctx.rotate(-0.045);
        ctx.scale(s, s);
        ctx.font = `800 54px ${FONTE_D}`;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 9;
        ctx.strokeStyle = 'rgba(4,20,9,0.85)';
        ctx.strokeText(t.texto, 0, 0);
        const g = ctx.createLinearGradient(0, -40, 0, 8);
        g.addColorStop(0, clarear(t.cor, 0.6));
        g.addColorStop(0.55, t.cor);
        g.addColorStop(1, t.cor);
        ctx.fillStyle = g;
        ctx.fillText(t.texto, 0, 0);
        if (t.sub) {
          ctx.font = `700 21px ${FONTE_B}`;
          ctx.lineWidth = 5;
          ctx.strokeText(t.sub, 0, 30);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(t.sub, 0, 30);
        }
        if (t.sub2) {
          ctx.font = `600 16px ${FONTE_B}`;
          ctx.lineWidth = 4;
          ctx.strokeText(t.sub2, 0, t.sub ? 54 : 30);
          ctx.fillStyle = 'rgba(255,255,255,0.92)';
          ctx.fillText(t.sub2, 0, t.sub ? 54 : 30);
        }
      }
      ctx.restore();
    }
  }

  // ---------- tutorial ----------

  function zonas(destaque) {
    const meio = v.H / 2;
    ctx.save();
    for (const [x, rotulo, sub] of [[4, 'ESQUERDA', 'polegar esquerdo'], [182, 'DIREITA', 'polegar direito']]) {
      retArredondado(x, meio + 4, 174, v.H - meio - 8, 12);
      ctx.fillStyle = destaque ? 'rgba(255,210,63,0.14)' : 'rgba(255,255,255,0.06)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = destaque ? COR.amarelo : 'rgba(255,255,255,0.4)';
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = destaque ? COR.amarelo : 'rgba(255,255,255,0.7)';
      ctx.font = `700 17px ${FONTE_B}`;
      ctx.fillText(rotulo, x + 87, meio + 30);
      ctx.font = `500 12px ${FONTE_B}`;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(sub, x + 87, meio + 47);
    }
    ctx.restore();
  }

  function tutorial(jogo) {
    zonas(true);
    const passo = PASSOS_TUTORIAL[Math.min(jogo.passo, PASSOS_TUTORIAL.length - 1)];
    const x = 20;
    const y = v.topo + 16;
    const w = 320;
    ctx.save();
    ctx.font = `500 15px ${FONTE_B}`;
    const linhas = quebrarTexto(passo.texto, w - 32);
    const h = 74 + linhas.length * 19;
    retArredondado(x + 1, y + 3, w, h, 14);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fill();
    retArredondado(x, y, w, h, 14);
    ctx.fillStyle = COR.escuro;
    ctx.fill();
    ctx.textAlign = 'left';
    ctx.fillStyle = COR.amarelo;
    ctx.font = `700 11px ${FONTE_B}`;
    ctx.fillText(`PASSO ${Math.min(jogo.passo + 1, 4)} DE 4`, x + 16, y + 22);
    ctx.font = `800 27px ${FONTE_D}`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(passo.titulo.toUpperCase(), x + 16, y + 52);
    ctx.font = `500 15px ${FONTE_B}`;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    linhas.forEach((l, i) => ctx.fillText(l, x + 16, y + 76 + i * 19));
    ctx.restore();
  }

  // ---------- depuração ----------

  function depuracao(jogo) {
    zonas(false);
    const d = jogo.duelo;
    const g = jogo.ultimoGesto;
    const linhas = [
      `estado ${jogo.estado}`,
      d ? `ttc ${d.ttc.toFixed(2)} · ${d.fase} · real ${d.posturaReal}` : 'sem duelo',
      d && d.pendente ? `toque ${d.pendente.tempo} em ttc ${d.pendente.ttc.toFixed(2)}` : '',
      d && d.resultado ? `${d.resultado.drible ?? '—'} ${d.resultado.tempo} chance ${d.resultado.chance.toFixed(1)} ${d.resultado.sucesso ? 'ok' : 'falhou'}` : '',
      g ? `gesto ${g.drible}${g.t0 !== undefined ? ` t0 ${Math.round(g.t0)} decidido +${Math.round(g.t - g.t0)} ms` : ''}` : '',
    ].filter(Boolean);
    ctx.save();
    ctx.font = '11px ui-monospace, Menlo, monospace';
    const h = linhas.length * 14 + 10;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(4, v.H - h - 4, 352, h);
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    linhas.forEach((l, i) => ctx.fillText(l, 10, v.H - h + 10 + i * 14));
    ctx.restore();
  }

  // ---------- efeitos ligados a mudanças de estado ----------

  function efeitos(jogo, py, alvo, dt) {
    const est = jogo.estado;
    const gy = jogo.distGol !== null ? py - jogo.distGol : null;
    if (est !== anterior.estado) {
      if (est === 'MENU' || (anterior.estado === 'RESULTADO' && est === 'CORRIDA')) fx.limpar();
      if (est === 'DRIBLE_OK' && alvo) {
        fx.faiscas(alvo.X, alvo.pe - 10, 14);
        fx.grama(alvo.X, alvo.pe, 8, 0.8);
      }
      if (est === 'CHUTE' && jogo.chute) {
        fx.poeira(jogo.chute.origemX, py + PE - 6, 6, 0.8);
        fx.grama(jogo.chute.origemX, py + PE - 2, 8, 0.9);
      }
    }
    if (jogo.tackle && !anterior.tackle && alvo) {
      fx.poeira(alvo.X, alvo.pe, 12, 1.1);
      fx.grama(alvo.X, alvo.pe, 12, 1);
      sacudida = 4;
    }
    const c = jogo.chute;
    if (c && c.anunciado && !anterior.anunciado && gy !== null) {
      if (c.resultado === 'GOL') {
        fx.confete(M.xCentro, gy - 8, 130);
        sacudida = 5;
      } else if (c.resultado === 'TRAVE') {
        fx.faiscas(c.alvoX, gy - 4, 16, ['#FFFFFF', '#FFD23F']);
        sacudida = 6;
      } else if (c.resultado === 'DEFESA') {
        fx.poeira(M.xCentro + jogo.goleiro.mergulhoAlvo, gy + 8, 8, 0.8);
      }
    }
    const chegou = est === 'GOL_DE_PLACA' && jogo.chegada !== null;
    if (chegou && !anterior.chegada && gy !== null) {
      fx.confete(M.xCentro, gy - 8, 140);
      sacudida = 5;
    }
    anterior = { estado: est, tackle: !!jogo.tackle, anunciado: !!(c && c.anunciado), chegada: chegou };

    // grama voando sob a chuteira e poeira do carrinho
    const correndo = jogo.velocidadeDoEstado() > 0;
    if (correndo) {
      acumPisada += dt;
      while (acumPisada > 0.07) {
        acumPisada -= 0.07;
        fx.pisada(M.xCentro + jogo.jogDX, py + PE + 2);
      }
    }
    const d = jogo.duelo;
    if (d && d.tipo === 'defensor' && d.posturaVisivel === 'CARRINHO' && alvo && d.fase !== 'APROXIMA') {
      acumPoeira += dt;
      while (acumPoeira > 0.09) {
        acumPoeira -= 0.09;
        fx.poeira(alvo.X + (Math.random() - 0.5) * 12, alvo.pe - 8, 1, 0.5);
        fx.grama(alvo.X + (Math.random() - 0.5) * 18, alvo.pe + 4, 1, 0.6);
      }
    }
  }

  // ---------- menu: cena de fundo ----------

  function cenaDoMenu(jogo, py) {
    const passo = 260;
    const k0 = Math.floor((jogo.distancia - 140) / passo);
    for (let k = k0; k < k0 + 5; k++) {
      const y = py - (k * passo + 80 - jogo.distancia);
      if (y < -60 || y > v.H + 60) continue;
      const lado = k % 2 === 0 ? -1 : 1;
      const x = M.xCentro + lado * (78 + (((k * 37) % 43) + 43) % 43);
      const postura = ['FECHA_ESQ', 'BOTE', 'CONTIDO', 'FECHA_DIR'][((k % 4) + 4) % 4];
      defensor(x - dxPostura(postura), y, postura, 1, { id: k + 20, sinais: false });
    }
    jogadorBoneco(M.xCentro, py, jogo, true);
    bolaMenu.atualizar(1 / 60, jogoMenu, { vP: 40, jogX: 0 });
    const bm = bolaMenu.estado;
    desenharBola(ctx, tex.bola, M.xCentro + bm.x, py - bm.f, { rot: bm.giro, alto: bm.z, escala: 1 + bm.z / 150 });
  }

  // ---------- quadro ----------

  function desenhar(jogo, { debug = false, topoPx = 0, dt = 1 / 60 } = {}) {
    if (!tex) construirTexturas();
    relogio += dt;
    v.topo = topoPx / v.escala;
    const base = [v.dpr * v.escala, 0, 0, v.dpr * v.escala, 0, 0];
    ctx.setTransform(...base);
    const cx = M.xCentro;
    const py = v.H * M.jogadorYFrac;

    // tremor de câmera
    sacudida = Math.max(0, sacudida - dt * 22);
    if (sacudida > 0.2) ctx.translate((Math.random() - 0.5) * sacudida, (Math.random() - 0.5) * sacudida);

    campo(jogo.distancia);
    const gy = jogo.distGol !== null ? py - jogo.distGol : null;
    laterais(jogo.distancia, gy !== null ? gy : -1e6);
    if (gy !== null && gy > -400) {
      fundoDoGol(gy);
      linhasDaArea(gy);
    }
    vinheta();

    if (jogo.estado === 'MENU') {
      cenaDoMenu(jogo, py);
      fx.atualizar(dt);
      fx.desenhar(ctx);
      ctx.setTransform(...base);
      return;
    }

    if (jogo.distGol !== null) gol(gy, jogo);
    if (jogo.estado !== 'TUTORIAL' && jogo.velocidadeDoEstado() > 0) linhasDeVelocidade(jogo.distancia);

    // Tudo que fica em pé (jogadores) e a bola é desenhado do fundo para a frente da cena:
    // quem está mais abaixo na tela está mais perto da câmera e aparece por cima.
    const cena = [];
    const rotulos = [];
    for (const p of jogo.passados) {
      cena.push({ y: py - p.dist, f: () => defensor(cx, py - p.dist - PE, p.postura, 1, { dxExtra: p.dx - dxPostura(p.postura), rot: p.rot, id: p.id ?? 0, sinais: false }) });
    }

    const d = jogo.duelo;
    let alvo = null;

    // goleiro
    const g = jogo.goleiro;
    if (g && jogo.distGol !== null) {
      let dist = jogo.distGol - g.avanco;
      let dx = g.dx;
      let postura = null;
      let rot = 0;
      let mergulhando = false;
      if (d && d.tipo === 'goleiro') {
        dist = jogo.alvoDist();
        dx = g.dx + jogo.alvoDX;
        postura = d.posturaVisivel;
        rot = jogo.alvoRot * 0.8;
      } else if (jogo.chute) {
        dx = g.mergulho;
        rot = g.rotMergulho;
        mergulhando = true;
      } else if (g.distFixa !== undefined) {
        dist = g.distFixa;
        dx = g.dxFixa;
        postura = g.posturaFixa;
        rot = g.rotFixa * 0.8;
      }
      const X = cx + dx;
      const Y = py - dist - PE;
      if (d && d.tipo === 'goleiro' && d.aceita()) anel(X, Y, d);
      cena.push({ y: Y + PE, f: () => goleiroBoneco(X, Y, postura, rot, mergulhando) });
      if (d && d.tipo === 'goleiro') {
        alvo = { X, Y, pe: Y + PE };
        if (d.posturaVisivel && !d.resultado && jogo.params.dicas) {
          rotulos.push(() => {
            balao(R.NOME_POSTURA[d.posturaVisivel], X, Y - 94);
            dica(R.melhorDrible(CONFIG.matrizGoleiro, d.posturaVisivel), X, Y);
          });
        }
      }
    }

    // defensor do duelo
    if (d && d.tipo === 'defensor') {
      const Yc = py - jogo.alvoDist() - PE;
      const mix = mixPostura(d);
      const X0 = cx + dxPostura(d.posturaVisivel) * mix;
      const entrada = R.clamp((d.lt.nascimento - d.ttc) / 0.4, 0, 1);
      if (d.aceita()) anel(X0, Yc, d);
      alvo = { X: X0 + jogo.alvoDX, Y: Yc, pe: Yc + PE };
      // desarme: ele avança até a bola, estica a perna e depois recolhe com a bola dominada
      let bloqueio = d.bloqueio || null;
      if (!bloqueio && jogo.estado === 'DESARME' && jogo.anim) {
        const a = jogo.anim;
        const lado = Math.sign(jogo.jogDX - jogo.baseDXAlvo()) || 1;
        let u;
        if (!jogo.tackle) u = R.clamp((a.ttc0 - d.ttc) / Math.max(0.15, a.ttc0 - CAMPO.bolaAFrente / CONFIG.mundo.velocidade), 0, 1);
        else u = 1 - R.clamp((jogo.tackle.t - 0.45) / 0.3, 0, 1) * 0.7;
        bloqueio = { lado, u };
      }
      cena.push({
        y: Yc + PE,
        f: () => {
          alvo = defensor(cx, Yc, d.posturaVisivel, mix, { dxExtra: jogo.alvoDX, rot: jogo.alvoRot, id: d.id ?? 0, sinais: !d.resultado, alpha: entrada, bloqueio });
        },
      });
      if (d.posturaVisivel && !d.resultado && jogo.params.dicas) {
        rotulos.push(() => {
          balao(R.NOME_POSTURA[d.posturaVisivel], alvo.X, Yc - 96);
          if (!d.livre) dica(R.melhorDrible(CONFIG.matrizDefensor, d.posturaMostrada), alvo.X, Yc);
        });
      }
    }

    // jogador
    const correndo = jogo.velocidadeDoEstado() > 0;
    const jx = cx + jogo.jogDX;
    const vel = (jogo.jogDX - jogDXAnterior) / Math.max(dt, 0.001);
    jogDXAnterior = jogo.jogDX;
    leanJog = lerp(leanJog, R.clamp(vel * 0.0035, -0.3, 0.3), 0.25);
    cena.push({
      y: py + PE,
      f: () => {
        if (jogo.estado === 'DRIBLE_OK') {
          trilha.push({ x: jx, y: py });
          if (trilha.length > 8) trilha.shift();
          for (let i = 0; i < trilha.length - 1; i++) {
            ctx.fillStyle = `rgba(255,210,63,${((i / trilha.length) * 0.2).toFixed(3)})`;
            retArredondado(trilha[i].x - 11, trilha[i].y - 22, 22, 44, 10);
            ctx.fill();
          }
        } else if (trilha.length) {
          trilha = [];
        }
        jogadorBoneco(jx, py, jogo, correndo);
      },
    });

    // bola: física própria (rola, quica, passa entre as pernas, bate na rede)
    // no modo Livre a bola é do próprio jogo (o defensor precisa saber onde ela está)
    const bolaDoJogo = jogo.modo === 'livre' && jogo.bola;
    const eventosBola = bolaDoJogo ? jogo.eventosBola.splice(0) : bola.atualizar(dt, jogo, { vP: jogo.velocidadeDoEstado(), jogX: jogo.jogDX });
    const b = (bolaDoJogo ? jogo.bola : bola).estado;
    const bx = cx + b.x;
    const by = py - b.f;
    cena.push({ y: by + 0.01, f: () => desenharBola(ctx, tex.bola, bx, by, { escala: 1 + b.z / 150, rot: b.giro, alto: b.z }) });
    for (const e of eventosBola) {
      if (e === 'quique') fx.poeira(bx, by, 3, 0.5);
      else if (e === 'toque') fx.grama(bx, by + 2, 5, 0.6);
      else if (e === 'rede') fx.grama(bx, by, 4, 0.4);
    }

    cena.sort((a1, a2) => a1.y - a2.y);
    for (const c of cena) c.f();
    for (const r of rotulos) r();

    efeitos(jogo, py, alvo, dt);
    fx.atualizar(dt);
    fx.desenhar(ctx);

    // camada de interface (sem tremor)
    ctx.setTransform(...base);
    if (jogo.estado === 'BARRA' && jogo.barra) desenharBarra(jogo, py);
    if (jogo.estado === 'TUTORIAL') tutorial(jogo);
    textos(jogo);
    if (debug) depuracao(jogo);
  }

  return { redimensionar, desenhar, vista: v };
}
