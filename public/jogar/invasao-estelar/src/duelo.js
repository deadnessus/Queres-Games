// Duelo frente a frente (Etapa 4): dois pilotos, cada um vê a PRÓPRIA nave embaixo e a do outro em cima. É como
// sentar frente a frente numa mesa: o que é esquerda para um é direita para o outro (a vista de um é a do outro
// girada meia volta). Sem tela nem canvas (testado com node --test).
//
// Cada celular cuida da própria nave e dos próprios tiros e manda a posição umas 20 vezes por segundo. Quem decide se
// um tiro acertou é o celular de quem foi atingido (desviar no último instante sempre vale). O servidor só repassa
// números, conta as rodadas e decide quem derrubou cada alienígena do meio.
import * as L from './logica.js?v=11';
import { NAVES_JOGADOR } from './dados.js?v=11';

export const Y_EU = 560; // a minha nave, embaixo
export const Y_ELE = 120; // a nave do outro, em cima
export const SOMA_Y = Y_EU + Y_ELE; // a vista do outro: (x, y) -> (LARGURA - x, SOMA_Y - y)
export const Y_MEIO = SOMA_Y / 2;
export const Y_FIM_TIRO = Y_ELE - 40; // o meu tiro some depois de passar da linha do outro (assim sai o próximo)
export const VIDAS = 3;
export const CONTAGEM = 2.5; // segundos de "3, 2, 1" antes de poder atirar
export const ALIEN_CADA = 7; // um alienígena cruza o meio a cada tantos segundos
export const PAREDE_DEPOIS = 35; // segundos de rodada até as paredes começarem a fechar
export const PAREDE_VEL = 5; // px/s
// px de cada lado. No fim sobra só o meio, mais estreito que uma nave: os dois ficam na mira um do outro e a rodada
// acaba (morte súbita), mesmo que ninguém se mexa.
export const PAREDE_MAX = L.LARGURA / 2 - L.MARGEM_JOGADOR - 6;
const ALCANCE_NAVE = { x: 18, y: 22 };
const CAPSULAS_DUELO = ['duplo', 'leque', 'escudo'];

// A vista do outro: meia volta.
export const espelhar = (x, y) => [L.LARGURA - x, SOMA_Y - y];

// Sorteio pequeno com semente (o mesmo do jogo), para os asteroides e os alienígenas da rodada.
function aleatorio(semente, i) {
  const r = L.criarSorteio((semente ^ Math.imul(i + 1, 0x9e3779b1)) >>> 0);
  return r();
}

// `primeiro`: quem tem o menor número na sala. A rodada é descrita na vista dele; o outro vê tudo espelhado.
export function novoDuelo({ semente, rodada = 1, primeiro = true, nave = 'padrao' }) {
  return {
    semente: semente >>> 0,
    rodada,
    primeiro,
    t: 0,
    traco: NAVES_JOGADOR[nave] || {},
    eu: { x: L.LARGURA / 2, xa: L.LARGURA / 2, vx: 0, vidas: VIDAS, invulneravel: 0, tiros: [], proxTiro: 1, cooldown: 0, arma: null, armaT: 0, escudo: Boolean((NAVES_JOGADOR[nave] || {}).escudo) },
    ele: { x: L.LARGURA / 2, xa: L.LARGURA / 2, vx: 0, vidas: VIDAS, invulneravel: 0, escudo: false, tiros: [], recebido: -1, intervalo: 50, nave: 0, cor: 0 },
    aliensMortos: new Set(), // índices confirmados pelo servidor
    aliensPedidos: new Set(), // índices que eu avisei ter derrubado (esperando o servidor)
    capsulas: [],
    perdeu: false,
    eventos: [],
  };
}

/* ---------- o que é igual para os dois (calculado pelo tempo da rodada) ---------- */

// Asteroides: duas pedras perto do meio, indo e vindo de lado. Escondem a nave dos tiros.
export function asteroides(d) {
  const lista = [];
  for (let k = 0; k < 2; k++) {
    const fase = aleatorio(d.semente, 10 + k) * Math.PI * 2;
    const vel = 0.3 + aleatorio(d.semente, 20 + k) * 0.25;
    const yMundo = k === 0 ? Y_MEIO - 55 : Y_MEIO + 55;
    const xMundo = L.LARGURA / 2 + Math.sin(d.t * vel + fase) * 115;
    const [x, y] = d.primeiro ? [xMundo, yMundo] : espelhar(xMundo, yMundo);
    lista.push({ x, y, r: 22, giro: d.t * (k ? -0.6 : 0.5) });
  }
  return lista;
}

// Alienígenas: um cruza o meio a cada ALIEN_CADA segundos, de um lado para o outro. Quem derrubar ganha uma cápsula.
export function aliens(d) {
  const lista = [];
  const n = Math.floor((d.t - CONTAGEM) / ALIEN_CADA);
  for (let i = Math.max(0, n - 1); i <= n; i++) {
    if (i < 0 || d.aliensMortos.has(i)) continue;
    const t0 = CONTAGEM + i * ALIEN_CADA + 1;
    const u = (d.t - t0) / 5.5; // 5,5 s para atravessar
    if (u < 0 || u > 1) continue;
    const daEsquerda = aleatorio(d.semente, 100 + i) < 0.5;
    const xMundo = daEsquerda ? -30 + 420 * u : 390 - 420 * u;
    const yMundo = Y_MEIO + Math.sin(u * Math.PI * 3) * 18;
    const [x, y] = d.primeiro ? [xMundo, yMundo] : espelhar(xMundo, yMundo);
    lista.push({ i, x, y, tipo: Math.floor(aleatorio(d.semente, 200 + i) * 10), capsula: CAPSULAS_DUELO[Math.floor(aleatorio(d.semente, 300 + i) * 3)] });
  }
  return lista;
}

// Paredes: se a rodada demora, os lados fecham um pouco (as naves ficam mais perto uma da outra na mira).
export function parede(d) {
  return Math.min(PAREDE_MAX, Math.max(0, d.t - PAREDE_DEPOIS) * PAREDE_VEL);
}

/* ---------- passo ---------- */

function noAsteroide(lista, x, y) {
  return lista.some((a) => Math.hypot(a.x - x, a.y - y) < a.r + 3);
}

// Anda o duelo (passos de L.PASSO). `dir`: -1, 0 ou 1. `agora`: relógio do celular (para os tiros do outro).
export function passoDuelo(d, dt, dir, agora) {
  const eu = d.eu;
  d.t += dt;
  eu.xa = eu.x; // para o desenho ficar entre um passo e o outro
  const margem = L.MARGEM_JOGADOR + parede(d);
  const velMax = L.VEL_MAX_JOGADOR * (d.traco.vel || 1);
  const passo = L.ACEL_JOGADOR * dt;
  eu.vx += L.clamp(dir * velMax - eu.vx, -passo, passo);
  eu.x += eu.vx * dt;
  if (eu.x < margem) { eu.x = margem; eu.vx = Math.max(0, eu.vx); }
  if (eu.x > L.LARGURA - margem) { eu.x = L.LARGURA - margem; eu.vx = Math.min(0, eu.vx); }
  eu.invulneravel = Math.max(0, eu.invulneravel - dt);
  eu.armaT = Math.max(0, eu.armaT - dt);
  if (eu.armaT <= 0) eu.arma = null;
  const pedras = asteroides(d);
  const naves = aliens(d);

  // meus tiros: sobem; batem nos asteroides e nos alienígenas (o alienígena é pedido ao servidor)
  if (d.t > CONTAGEM && !d.perdeu) {
    eu.cooldown -= dt;
    if (eu.tiros.length === 0 && eu.cooldown <= 0) {
      const y = Y_EU - 26;
      const rajada = eu.arma === 'duplo' ? [[-7, 0], [7, 0]] : eu.arma === 'leque' ? [[-4, -L.VEL_LEQUE], [0, 0], [4, L.VEL_LEQUE]] : [[0, 0]];
      for (const [dx, vx] of rajada) eu.tiros.push({ id: eu.proxTiro++, x: eu.x + dx, y, xa: eu.x + dx, ya: y, vx });
      eu.cooldown = d.traco.cadencia || 0.14;
      d.eventos.push({ tipo: 'tiro', x: eu.x, y });
    }
  }
  const velTiro = L.VEL_TIRO * (d.traco.velTiro || 1);
  eu.tiros = eu.tiros.filter((t) => {
    t.xa = t.x;
    t.ya = t.y;
    t.y -= velTiro * dt;
    t.x += (t.vx || 0) * dt;
    if (t.y < Y_FIM_TIRO || t.x < -20 || t.x > L.LARGURA + 20) return false;
    if (noAsteroide(pedras, t.x, t.y)) {
      d.eventos.push({ tipo: 'casco', x: t.x, y: t.y });
      return false;
    }
    const alvo = naves.find((a) => !d.aliensPedidos.has(a.i) && Math.abs(a.x - t.x) < 22 && Math.abs(a.y - t.y) < 20);
    if (alvo) {
      d.aliensPedidos.add(alvo.i);
      d.eventos.push({ tipo: 'pedir_alien', i: alvo.i, x: alvo.x, y: alvo.y });
      return false;
    }
    return true;
  });

  // tiros do outro: vêm de cima, andando a partir da última posição que ele mandou (seguem voando mesmo se a conexão
  // engasgar; somem onde o celular dele os apaga, logo depois da minha linha)
  const idade = d.ele.recebido < 0 ? 0 : Math.max(0, (agora - d.ele.recebido) / 1000);
  for (const t of d.ele.tiros) {
    if (t.fora) continue;
    t.y = t.y0 + t.vy * idade;
    t.x = t.x0 + t.vxm * idade;
    if (t.y > SOMA_Y - Y_FIM_TIRO) t.fora = true;
    else if (noAsteroide(pedras, t.x, t.y)) t.fora = true;
    else if (!d.perdeu && eu.invulneravel <= 0 && Math.abs(t.x - eu.x) < ALCANCE_NAVE.x && Math.abs(t.y - Y_EU) < ALCANCE_NAVE.y) {
      t.fora = true;
      d.eventos.push({ tipo: 'acertado', id: t.id, escudo: eu.escudo, x: eu.x, y: Y_EU });
      if (eu.escudo) {
        eu.escudo = false;
        eu.invulneravel = 0.8;
        d.eventos.push({ tipo: 'escudo_gasto', x: eu.x, y: Y_EU });
      } else {
        eu.vidas -= 1;
        eu.invulneravel = 1.6;
        d.eventos.push({ tipo: 'perdeu', x: eu.x, y: Y_EU });
        if (eu.vidas <= 0) {
          d.perdeu = true;
          d.eventos.push({ tipo: 'perdi_rodada' });
        }
      }
    }
  }

  // cápsulas: caem do alienígena para quem o derrubou
  d.capsulas = d.capsulas.filter((c) => {
    c.y += c.vy * dt;
    if (c.minha && Math.abs(c.x - eu.x) < 26 && Math.abs(c.y - Y_EU) < 28) {
      if (c.tipo === 'escudo') eu.escudo = true;
      else { eu.arma = c.tipo; eu.armaT = 8; }
      d.eventos.push({ tipo: 'capsula', capsula: c.tipo, x: c.x, y: Y_EU - 30 });
      return false;
    }
    return c.y > 60 && c.y < L.ALTURA + 20;
  });
}

// O servidor confirmou quem derrubou o alienígena `i`.
export function alienDerrubado(d, i, meu) {
  if (d.aliensMortos.has(i)) return;
  const a = aliens(d).find((x) => x.i === i);
  d.aliensMortos.add(i);
  if (!a) return;
  d.eventos.push({ tipo: 'explosao', x: a.x, y: a.y, nave: a.tipo, pontos: 0, mult: 1 });
  d.capsulas.push({ tipo: a.capsula, x: a.x, y: a.y, vy: meu ? 120 : -120, minha: meu, t: 0 });
}

/* ---------- mensagens (só números) ---------- */

// O que eu mando ("p"): [x, vx, vidas, invulnerável, escudo, rodada, nave, cor, n, (id, x, y, vx) × n], na MINHA vista.
export function mensagemDuelo(d, naveIndice = 0, corIndice = 0) {
  const eu = d.eu;
  const tiros = eu.tiros.slice(0, 6);
  const m = [Math.round(eu.x * 10) / 10, Math.round(eu.vx), eu.vidas, eu.invulneravel > 0 ? 1 : 0, eu.escudo ? 1 : 0, d.rodada, naveIndice, corIndice, tiros.length];
  for (const t of tiros) m.push(t.id, Math.round(t.x), Math.round(t.y), Math.round(t.vx || 0));
  return m;
}

// Ordem das naves e das cores nas mensagens (índices de progresso.js).
export const ORDEM_NAVES = ['padrao', 'flecha', 'guardia', 'rajada', 'cometa'];
export const ORDEM_CORES = ['azul', 'vermelha', 'verde', 'roxa', 'laranja', 'dourada'];

// Recebe a nave do outro (na vista dele) e põe na minha (meia volta). `agora`: relógio do meu celular.
export function receberDuelo(d, m, agora) {
  if (!Array.isArray(m) || m.length < 9 || m[5] !== d.rodada) return;
  const traco = NAVES_JOGADOR[ORDEM_NAVES[m[6]]] || {};
  const velTiroDele = L.VEL_TIRO * (traco.velTiro || 1);
  const ele = d.ele;
  // a nave dele anda lisa: do lugar em que está desenhada agora até a posição nova, no tempo entre duas mensagens
  if (ele.recebido >= 0) ele.intervalo = L.clamp(agora - ele.recebido, 30, 200);
  ele.xa = ele.recebido < 0 ? L.LARGURA - m[0] : posicaoDele(d, agora); // a 1ª mensagem já põe a nave no lugar
  ele.x = L.LARGURA - m[0];
  ele.vx = -m[1];
  ele.vidas = m[2];
  ele.invulneravel = m[3];
  ele.escudo = m[4] === 1;
  ele.nave = m[6];
  ele.cor = m[7];
  const n = Math.min(6, m[8]);
  const fora = new Set(ele.tiros.filter((t) => t.fora).map((t) => t.id));
  const tiros = [];
  for (let k = 0; k < n; k++) {
    const [id, x, y, vx] = m.slice(9 + 4 * k, 13 + 4 * k);
    const [xm, ym] = espelhar(x, y);
    tiros.push({ id, x0: xm, y0: ym, x: xm, y: ym, vy: velTiroDele, vxm: -vx, fora: fora.has(id) });
  }
  ele.tiros = tiros;
  ele.recebido = agora;
}

// Onde desenhar a nave do outro agora (vai da posição antiga até a nova no tempo entre duas mensagens).
export function posicaoDele(d, agora) {
  const e = d.ele;
  if (e.recebido < 0) return e.x;
  const u = L.clamp((agora - e.recebido) / e.intervalo, 0, 1);
  return e.xa + (e.x - e.xa) * u;
}

// O outro avisou que um tiro meu acertou nele: o tiro some.
export function meuTiroAcertou(d, id) {
  d.eu.tiros = d.eu.tiros.filter((t) => t.id !== id);
}
