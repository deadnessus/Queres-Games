// Esquadrão (Etapa 4, #25): 2 a 4 pilotos juntos contra as mesmas ondas. Sem tela nem canvas (testado com node --test).
//
// Como funciona por dentro:
//  - o celular de quem criou a sala ("anfitrião") roda as ondas no motor (motor.js), com os colegas em `p.aliados`;
//    umas 15 vezes por segundo ele manda a FOTO do jogo para os outros (só números: fotoDoEsquadrao);
//  - cada colega ("convidado") move a própria nave na hora e atira sozinho; manda a posição e os lasers novos
//    (mensagemDoConvidado). O anfitrião confere quem derrubou o quê e avisa os lasers que acertaram;
//  - quem decide se a nave foi atingida é o celular do dono da nave (como no duelo: desviar no último instante vale).
//    O convidado avisa o anfitrião ("e"), que apaga o tiro, o meteoro ou a nave que bateu;
//  - quem perde todas as naves deixa uma cápsula de resgate no chão; um colega que passa por cima traz de volta.
import * as L from './logica.js?v=11';
import { NAVES_JOGADOR, CAPSULAS, CHEFES, COMBO } from './dados.js?v=11';
import { tiroNaNave } from './tiros.js?v=11';
import { raioDaNave } from './inimigos.js?v=11';
import { laserNoChefe, raioDoChefeEm, CANHOES } from './chefes.js?v=11';
import { colegaCaiu, AVISO } from './motor.js?v=11';
import { ORDEM_NAVES, ORDEM_CORES } from './duelo.js?v=11';

export const FOTOS_POR_SEGUNDO = 15;
export const TIROS = ['reto', 'ferrao', 'bomba', 'estilhaco', 'teia', 'guiado'];
const ESPECIES = ['normal', 'meteoros', 'bonus', 'chefe'];
const ATAQUES_CHEFE = ['canhao', 'raio', 'teias', 'varredura', 'guiados'];
const ESTADOS_CHEFE = ['parada', 'agachada', 'atravessando'];
const FASES_CHEFE = ['aviso', 'ativo'];
const TIROS_AVISO = ['reto', 'duplo', 'ferrao', 'bomba', 'teia', 'raio', 'leque', 'guiado', 'ovo', 'estilhaco'];
// acontecimentos que vão na foto (para os efeitos e os sons dos outros celulares)
export const EVENTOS = [
  'explosao', 'dano', 'escudo_quebrou', 'furia', 'perdeu', 'escudo_gasto', 'bomba', 'raio', 'teia', 'capsula',
  'bomba_jogador', 'meteoro_quebrou', 'meteoro_passou', 'fugiram', 'casco', 'dano_chefe', 'parte_caiu', 'parte',
  'chefe_caiu', 'chefe_derrotado', 'salto', 'fase', 'vida', 'disparo', 'aviso', 'caiu', 'resgate',
];
// o que o convidado avisa quando é atingido
export const ATINGIDO = { disparo: 1, raio: 2, colisao: 3, meteoro: 4, teia: 5 };
const EFEITO = { nada: 0, escudo: 1, nave: 2 };
const MAX_LASERS_MSG = 4;

const d1 = (v) => Math.round(v * 10); // décimos
const d3 = (v) => Math.round(v * 1000); // milésimos
const idx = (lista, v) => Math.max(0, lista.indexOf(v));
const capsulaIdx = (id) => CAPSULAS.findIndex((c) => c.id === id);

/* ---------- anfitrião ---------- */

// Põe um colega na partida. `nave` e `cor`: índices das listas do hangar (o servidor só aceita esses).
export function novoColega(p, { id, nave = 'padrao', cor = 'azul' }) {
  const traco = NAVES_JOGADOR[nave] || {};
  const a = {
    id, nave, cor,
    x: L.LARGURA / 2, xa: L.LARGURA / 2, alvoX: L.LARGURA / 2, vx: 0,
    vidas: L.VIDAS_INICIAIS, escudo: Boolean(traco.escudo), invulneravel: 0, caido: false, arma: null, armaT: 0,
    velTiro: L.VEL_TIRO * (traco.velTiro || 1),
    tiros: [], // os lasers dele (andam aqui, a partir do que o celular dele mandou)
    vistos: new Set(), // lasers que já chegaram (cada um entra uma vez só)
    gastos: [], // lasers dele que acertaram algo desde a última foto
    avisos: [], // o que mandar para ele na próxima foto: [AVISO.*, valor]
    resgateAte: -1, // logo depois do resgate, ignora o "caído" que ainda vem do celular dele
  };
  p.aliados.push(a);
  return a;
}

// Um colega saiu da sala: a nave dele some (e a cápsula de resgate dele também).
export function colegaSaiu(p, id) {
  p.aliados = p.aliados.filter((a) => a.id !== id);
  p.resgates = p.resgates.filter((r) => r.id !== id);
}

// Mensagem "p" de um colega: [x, vx, vidas, escudo, protegido, caído, arma, armaT×10, n, (id, x, y, vx) × n].
export function atualizarColega(p, id, m) {
  const a = p.aliados.find((x) => x.id === id);
  if (!a || !Array.isArray(m) || m.length < 9) return;
  a.alvoX = L.clamp(Number(m[0]) || 0, L.MARGEM_JOGADOR, L.LARGURA - L.MARGEM_JOGADOR);
  a.vx = L.clamp(Number(m[1]) || 0, -400, 400);
  a.escudo = m[3] === 1;
  a.invulneravel = m[4] === 1 ? 0.3 : 0;
  a.arma = m[6] === 0 ? 'duplo' : m[6] === 1 ? 'leque' : null;
  a.armaT = L.clamp((Number(m[7]) || 0) / 10, 0, 20);
  if (m[5] === 1 && !a.caido && p.tempo > a.resgateAte) colegaCaiu(p, a);
  if (!a.caido) a.vidas = L.clamp(Math.round(Number(m[2]) || 0), 1, L.VIDAS_MAX);
  const n = Math.min(MAX_LASERS_MSG, Math.max(0, Math.round(Number(m[8]) || 0)));
  for (let k = 0; k < n; k++) {
    const [lid, x, y, vx] = m.slice(9 + 4 * k, 13 + 4 * k).map(Number);
    if (!Number.isFinite(lid) || a.vistos.has(lid)) continue;
    a.vistos.add(lid);
    if (a.vistos.size > 80) a.vistos.delete(a.vistos.values().next().value);
    if (a.caido || !(y > 0 && y < L.ALTURA)) continue;
    a.tiros.push({ id: lid, x, y, xa: x, ya: y, vx: L.clamp(vx || 0, -L.VEL_LEQUE, L.VEL_LEQUE) });
  }
}

// Mensagem "e" de um colega atingido: [2, ATINGIDO.*, referência, EFEITO.*]. Some o que o atingiu.
export function colegaAtingido(p, id, m) {
  const a = p.aliados.find((x) => x.id === id);
  if (!a || !Array.isArray(m) || m[0] !== 2) return;
  const [, tipo, ref, efeito] = m;
  if (tipo === ATINGIDO.disparo || tipo === ATINGIDO.teia) {
    p.disparos = p.disparos.filter((s) => s.id !== ref);
  } else if (tipo === ATINGIDO.colisao) {
    const n = p.naves.find((x) => x.vivo && x.i === ref);
    if (n) {
      n.vivo = false;
      n.ataque = null;
      p.eventos.push({ tipo: 'explosao', x: n.x, y: n.y, nave: n.tipo, pontos: 0, mult: 1 });
    }
  } else if (tipo === ATINGIDO.meteoro) {
    const mt = p.meteoros.find((x) => x.id === ref);
    if (mt) {
      p.meteoros = p.meteoros.filter((x) => x !== mt);
      p.eventos.push({ tipo: 'meteoro_quebrou', x: mt.x, y: mt.y, r: mt.r });
    }
  }
  if (efeito === EFEITO.escudo) p.eventos.push({ tipo: 'escudo_gasto', x: a.x, y: L.Y_JOGADOR, piloto: id });
  if (efeito === EFEITO.nave) {
    p.eventos.push({ tipo: 'perdeu', x: a.x, y: L.Y_JOGADOR, piloto: id });
    p.combo.mult = 1; // levar um tiro zera o combo do esquadrão
    p.combo.desde = COMBO.janela + 1;
    p.danoNaChuva = true;
  }
}

// A foto do jogo, só números. `pilotos`: Map(id -> { nave, cor }) com os índices do hangar de cada um.
export function fotoDoEsquadrao(p, seq, eventos, pilotos) {
  p.proxId = p.proxId || 0;
  const novoId = (o) => (o.id || (o.id = ++p.proxId));
  const o = p.onda;
  const cab = [seq, p.fase, p.tipo, idx(ESPECIES, o.especie), o.chefe ?? -1, d3(p.abertura), d3(p.energia), d3(p.energiaMax),
    p.pontos, p.combo.mult, d3(Math.min(9, p.combo.desde)), d3(p.poderes.lento), p.estado === 'fim' ? 1 : 0];
  const naves = [];
  for (const n of p.naves) {
    if (!n.vivo) continue;
    const a = n.ataque;
    const marcas = (n.filhote ? 1 : 0) | (n.furia ? 2 : 0) | (n.escudo ? 4 : 0) | (n.flash > 0 ? 8 : 0);
    naves.push(n.i, n.tipo, d1(n.x), d1(n.y), d3(n.inclina), marcas, a ? (a.fase === 'raio' ? 2 : 1) : 0, a ? d3(a.t) : 0, a ? d1(a.x) : 0);
  }
  const disparos = [];
  for (const s of p.disparos) disparos.push(novoId(s), idx(TIROS, s.tipo), d1(s.x), d1(s.y), d1(s.vx), d1(s.vy), s.estoura ? d1(s.estoura) : 0);
  const capsulas = [];
  for (const c of p.capsulas) capsulas.push(novoId(c), capsulaIdx(c.tipo), d1(c.x), d1(c.y));
  const meteoros = [];
  for (const m of p.meteoros) meteoros.push(novoId(m), d1(m.x), d1(m.y), d1(m.vx), d1(m.vy), d1(m.r), d3(Math.max(0, m.aviso)), d3(m.giro % (Math.PI * 2)));
  const chefe = [];
  const c = p.chefe;
  if (c) {
    const a = c.ataque;
    chefe.push(c.indice, d1(c.x), d1(c.y), c.vivo ? 1 : 0, d3(c.morrendo), idx(ESTADOS_CHEFE, c.estado), c.fechado ? 1 : 0, d3(c.chocando || 0),
      a ? ATAQUES_CHEFE.indexOf(a.tipo) : -1, a ? idx(FASES_CHEFE, a.fase) : 0, a ? d3(a.t) : 0, a && a.x !== undefined ? d1(a.x) : 0,
      a && a.de !== undefined ? d3(a.de) : 0, a && a.ate !== undefined ? d3(a.ate) : 0, a && a.ang !== undefined ? d3(a.ang) : 0,
      a && a.parte !== undefined ? a.parte : -1);
    for (const pt of c.partes) chefe.push(pt.vida, pt.max, pt.viva ? 1 : 0, d3(pt.flash));
  }
  const naveDe = (id) => pilotos.get(id) || { nave: 0, cor: 0 };
  const armaIdx = (arma) => (arma === 'duplo' ? 0 : arma === 'leque' ? 1 : -1);
  const eu = naveDe(p.idPiloto);
  const naveDosPilotos = [p.idPiloto, d1(p.jx), Math.round(p.vx), p.vidas, p.poderes.escudo ? 1 : 0, d3(p.invulneravel), p.caido ? 1 : 0,
    armaIdx(p.poderes.arma), d1(p.poderes.armaT), eu.nave, eu.cor];
  for (const a of p.aliados) {
    const n = naveDe(a.id);
    naveDosPilotos.push(a.id, d1(a.x), Math.round(a.vx), a.vidas, a.escudo ? 1 : 0, d3(a.invulneravel), a.caido ? 1 : 0, armaIdx(a.arma), d1(a.armaT), n.nave, n.cor);
  }
  const lasers = [];
  for (const t of p.tiros) lasers.push(p.idPiloto, novoId(t), d1(t.x), d1(t.y), Math.round(t.vx || 0));
  for (const a of p.aliados) for (const t of a.tiros) lasers.push(a.id, t.id, d1(t.x), d1(t.y), Math.round(t.vx || 0));
  const pontos = [];
  for (const [id, v] of Object.entries(p.porPiloto || {})) pontos.push(Number(id), v);
  const gastos = [];
  const avisos = [];
  for (const a of p.aliados) {
    for (const id of a.gastos.splice(0)) gastos.push(a.id, id);
    for (const [cod, valor] of a.avisos.splice(0)) avisos.push(a.id, cod, valor);
  }
  const resgates = [];
  for (const r of p.resgates) resgates.push(r.id, d1(r.x));
  const evs = [];
  for (const ev of eventos) {
    const k = EVENTOS.indexOf(ev.tipo);
    if (k < 0) continue;
    let a = 0;
    let b = 0;
    if (ev.tipo === 'explosao') {
      a = (ev.nave || 0) + (ev.grande ? 16 : 0) + (ev.filhote ? 32 : 0);
      b = (ev.pontos || 0) * 10 + (ev.mult || 1);
    } else if (ev.tipo === 'perdeu' || ev.tipo === 'escudo_gasto' || ev.tipo === 'caiu' || ev.tipo === 'resgate' || ev.tipo === 'teia') {
      a = ev.piloto ?? p.idPiloto;
    } else if (ev.tipo === 'capsula') {
      a = capsulaIdx(ev.capsula);
    } else if (ev.tipo === 'disparo' || ev.tipo === 'aviso') {
      a = idx(TIROS_AVISO, ev.tiro);
    } else if (ev.tipo === 'parte' || ev.tipo === 'chefe_caiu') {
      b = ev.pontos || 0;
    } else if (ev.tipo === 'chefe_derrotado') {
      a = ev.chefe || 0;
    } else if (ev.tipo === 'dano' || ev.tipo === 'escudo_quebrou' || ev.tipo === 'furia') {
      a = ev.nave || 0;
    } else if (ev.tipo === 'meteoro_quebrou') {
      a = Math.round(ev.r || 10);
    }
    evs.push(k, d1(ev.x || 0), d1(ev.y || 0), a, b);
    if (evs.length >= 5 * 40) break;
  }
  return [cab, naves, disparos, capsulas, meteoros, chefe, naveDosPilotos, lasers, pontos, gastos, avisos, resgates, evs];
}

/* ---------- convidado ---------- */

// Lê a foto. `anterior`: a foto lida antes (para o desenho ir de uma para a outra sem pular).
export function lerFoto(f, anterior = null, agora = 0) {
  if (!Array.isArray(f) || f.length < 13) return null;
  const [cab, naves, disparos, capsulas, meteoros, chefe, pilotos, lasers, pontos, gastos, avisos, resgates, evs] = f;
  const lista = (v) => (Array.isArray(v) ? v : []);
  const q = {
    seq: cab[0], recebido: agora, fase: cab[1], tipo: cab[2], especie: ESPECIES[cab[3]] || 'normal', chefeIdx: cab[4],
    abertura: cab[5] / 1000, energia: cab[6] / 1000, energiaMax: cab[7] / 1000, pontos: cab[8],
    combo: { mult: cab[9], desde: cab[10] / 1000 }, lento: cab[11] / 1000, fim: cab[12] === 1,
    naves: [], disparos: [], capsulas: [], meteoros: [], chefe: null, pilotos: [], lasers: [], porPiloto: {},
    gastos: [], avisos: [], resgates: [], eventos: [],
  };
  const ant = anterior && anterior.fase === q.fase ? anterior : null;
  const mapa = (l, chave) => new Map((l || []).map((o) => [chave(o), o]));
  const antNaves = mapa(ant && ant.naves, (o) => o.i);
  const antDisp = mapa(anterior && anterior.disparos, (o) => o.id);
  const antCaps = mapa(anterior && anterior.capsulas, (o) => o.id);
  const antMet = mapa(anterior && anterior.meteoros, (o) => o.id);
  const antPil = mapa(anterior && anterior.pilotos, (o) => o.id);
  const antLas = mapa(anterior && anterior.lasers, (o) => `${o.dono}:${o.id}`);
  const de = (m, chave, o) => {
    const v = m.get(chave);
    o.xa = v ? v.x : o.x;
    o.ya = v ? v.y : o.y;
    return o;
  };
  const N = lista(naves);
  for (let k = 0; k + 8 < N.length; k += 9) {
    const marcas = N[k + 5];
    q.naves.push(de(antNaves, N[k], {
      i: N[k], tipo: N[k + 1], x: N[k + 2] / 10, y: N[k + 3] / 10, inclina: N[k + 4] / 1000, vivo: true,
      filhote: Boolean(marcas & 1), furia: Boolean(marcas & 2), escudo: Boolean(marcas & 4), flash: marcas & 8 ? 0.05 : 0,
      ataque: N[k + 6] ? { fase: N[k + 6] === 2 ? 'raio' : 'aviso', t: N[k + 7] / 1000, x: N[k + 8] / 10 } : null,
    }));
  }
  const D = lista(disparos);
  for (let k = 0; k + 6 < D.length; k += 7) {
    q.disparos.push(de(antDisp, D[k], { id: D[k], tipo: TIROS[D[k + 1]] || 'reto', x: D[k + 2] / 10, y: D[k + 3] / 10, vx: D[k + 4] / 10, vy: D[k + 5] / 10, estoura: D[k + 6] / 10 }));
  }
  const C = lista(capsulas);
  for (let k = 0; k + 3 < C.length; k += 4) {
    q.capsulas.push(de(antCaps, C[k], { id: C[k], tipo: (CAPSULAS[C[k + 1]] || CAPSULAS[0]).id, x: C[k + 2] / 10, y: C[k + 3] / 10, t: 0 }));
  }
  const M = lista(meteoros);
  for (let k = 0; k + 7 < M.length; k += 8) {
    q.meteoros.push(de(antMet, M[k], { id: M[k], x: M[k + 1] / 10, y: M[k + 2] / 10, vx: M[k + 3] / 10, vy: M[k + 4] / 10, r: M[k + 5] / 10, aviso: M[k + 6] / 1000, giro: M[k + 7] / 1000 }));
  }
  const B = lista(chefe);
  if (B.length >= 16) {
    const def = CHEFES[B[0]] || CHEFES[0];
    const tipoAtaque = ATAQUES_CHEFE[B[8]];
    const ataque = tipoAtaque ? { tipo: tipoAtaque, fase: FASES_CHEFE[B[9]] || 'aviso', t: B[10] / 1000, x: B[11] / 10, de: B[12] / 1000, ate: B[13] / 1000, ang: B[14] / 1000 } : null;
    if (ataque && B[15] >= 0) ataque.parte = B[15];
    const antC = anterior && anterior.chefe;
    const c = {
      indice: B[0], id: def.id, x: B[1] / 10, y: B[2] / 10, vivo: B[3] === 1, morrendo: B[4] / 1000, estado: ESTADOS_CHEFE[B[5]] || 'parada',
      fechado: B[6] === 1, chocando: B[7] / 1000, ataque, partes: [],
    };
    c.xa = antC ? antC.x : c.x;
    c.ya = antC ? antC.y : c.y;
    for (let k = 16, j = 0; k + 3 < B.length; k += 4, j++) c.partes.push({ ...parteDo(def.id, j), vida: B[k], max: B[k + 1], viva: B[k + 2] === 1, flash: B[k + 3] / 1000 });
    q.chefe = c;
  }
  const P = lista(pilotos);
  for (let k = 0; k + 10 < P.length; k += 11) {
    q.pilotos.push(de(antPil, P[k], {
      id: P[k], x: P[k + 1] / 10, vx: P[k + 2], vidas: P[k + 3], escudo: P[k + 4] === 1, invulneravel: P[k + 5] / 1000, caido: P[k + 6] === 1,
      arma: P[k + 7] === 0 ? 'duplo' : P[k + 7] === 1 ? 'leque' : null, armaT: P[k + 8] / 10, nave: P[k + 9], cor: P[k + 10],
    }));
  }
  const T = lista(lasers);
  for (let k = 0; k + 4 < T.length; k += 5) {
    q.lasers.push(de(antLas, `${T[k]}:${T[k + 1]}`, { dono: T[k], id: T[k + 1], x: T[k + 2] / 10, y: T[k + 3] / 10, vx: T[k + 4] }));
  }
  const S = lista(pontos);
  for (let k = 0; k + 1 < S.length; k += 2) q.porPiloto[S[k]] = S[k + 1];
  const G = lista(gastos);
  for (let k = 0; k + 1 < G.length; k += 2) q.gastos.push([G[k], G[k + 1]]);
  const A = lista(avisos);
  for (let k = 0; k + 2 < A.length; k += 3) q.avisos.push([A[k], A[k + 1], A[k + 2]]);
  const R = lista(resgates);
  for (let k = 0; k + 1 < R.length; k += 2) q.resgates.push({ id: R[k], x: R[k + 1] / 10 });
  const E = lista(evs);
  for (let k = 0; k + 4 < E.length; k += 5) {
    const tipo = EVENTOS[E[k]];
    if (!tipo) continue;
    const ev = { tipo, x: E[k + 1] / 10, y: E[k + 2] / 10 };
    const a = E[k + 3];
    const b = E[k + 4];
    if (tipo === 'explosao') Object.assign(ev, { nave: a & 15, grande: Boolean(a & 16), filhote: Boolean(a & 32), pontos: Math.floor(b / 10), mult: b % 10 || 1 });
    else if (tipo === 'perdeu' || tipo === 'escudo_gasto' || tipo === 'caiu' || tipo === 'resgate' || tipo === 'teia') ev.piloto = a;
    else if (tipo === 'capsula') ev.capsula = (CAPSULAS[a] || CAPSULAS[0]).id;
    else if (tipo === 'disparo' || tipo === 'aviso') ev.tiro = TIROS_AVISO[a];
    else if (tipo === 'parte' || tipo === 'chefe_caiu') ev.pontos = b;
    else if (tipo === 'chefe_derrotado') ev.chefe = a;
    else if (tipo === 'dano' || tipo === 'escudo_quebrou' || tipo === 'furia') ev.nave = a;
    else if (tipo === 'meteoro_quebrou') ev.r = a;
    q.eventos.push(ev);
  }
  return q;
}

// Forma das partes do chefão (a mesma de chefes.js), para o desenho e a conferência dos lasers do convidado.
function parteDo(id, j) {
  if (id === 'nave-mae') {
    if (j < CANHOES.length) return { tipo: 'canhao', dx: CANHOES[j][0], dy: CANHOES[j][1], r: 17 };
    return { tipo: 'nucleo', dx: 0, dy: 10, r: 22 };
  }
  if (id === 'rainha') return { tipo: 'corpo', dx: 0, dy: 0, r: 46 };
  return { tipo: 'olho', dx: 0, dy: 0, r: 44 };
}

// A nave do convidado (só ele a move; o anfitrião só recebe a posição).
export function novoConvidado({ id, nave = 'padrao' }) {
  const traco = NAVES_JOGADOR[nave] || {};
  return {
    id, nave, traco,
    x: L.LARGURA / 2, xa: L.LARGURA / 2, vx: 0,
    vidas: L.VIDAS_INICIAIS, escudo: Boolean(traco.escudo), invulneravel: 2, caido: false,
    arma: null, armaT: 0, teia: 0,
    tiros: [], proxTiro: 1, cooldown: 0.3,
    pendentes: [], // lasers que sumiram antes de chegar ao anfitrião (vão na próxima mensagem mesmo assim)
    vistos: new Set(), // tiros, meteoros e naves que já me acertaram (não acertam de novo)
    eventos: [],
  };
}

// Onde cada coisa da foto está agora (o desenho vai de uma foto para a outra no tempo entre as duas).
export function entreFotos(q, u) {
  const k = L.clamp(u, 0, 1);
  const pos = (o) => [L.entre(o.xa, o.x, k), L.entre(o.ya, o.y, k)];
  return { pos, k };
}

// Anda a minha nave um passo (L.PASSO): movimento, tiro automático e os meus lasers. `q`: a foto mais nova.
export function passoConvidado(cv, d, dir, q) {
  cv.xa = cv.x;
  const velMax = L.VEL_MAX_JOGADOR * (cv.teia > 0 ? L.LENTO_TEIA : 1) * (cv.traco.vel || 1);
  const alvoVx = cv.caido || (q && q.fim) ? 0 : dir * velMax;
  const passo = L.ACEL_JOGADOR * d;
  cv.vx += L.clamp(alvoVx - cv.vx, -passo, passo);
  cv.x += cv.vx * d;
  if (cv.x < L.MARGEM_JOGADOR) { cv.x = L.MARGEM_JOGADOR; cv.vx = Math.max(0, cv.vx); }
  if (cv.x > L.LARGURA - L.MARGEM_JOGADOR) { cv.x = L.LARGURA - L.MARGEM_JOGADOR; cv.vx = Math.min(0, cv.vx); }
  cv.invulneravel = Math.max(0, cv.invulneravel - d);
  cv.teia = Math.max(0, cv.teia - d);
  cv.armaT = Math.max(0, cv.armaT - d);
  if (cv.armaT <= 0) cv.arma = null;
  // tiro automático, como no motor (ninguém atira na entrada da onda nem na chuva de meteoros)
  cv.cooldown -= d;
  const pode = q && !q.fim && !cv.caido && q.abertura <= 0 && q.especie !== 'meteoros';
  if (pode && cv.tiros.length === 0 && cv.cooldown <= 0) {
    const y = L.Y_JOGADOR - 26;
    const rajada = cv.arma === 'duplo' ? [[-7, 0], [7, 0]] : cv.arma === 'leque' ? [[-4, -L.VEL_LEQUE], [0, 0], [4, L.VEL_LEQUE]] : [[0, 0]];
    for (const [dx, vx] of rajada) cv.tiros.push({ id: cv.proxTiro++, x: cv.x + dx, y, xa: cv.x + dx, ya: y, vx, novo: true });
    cv.cooldown = cv.traco.cadencia || 0.14;
    cv.eventos.push({ tipo: 'tiro', x: cv.x, y });
  }
  const vel = L.VEL_TIRO * (cv.traco.velTiro || 1);
  cv.tiros = cv.tiros.filter((t) => {
    t.xa = t.x;
    t.ya = t.y;
    const yAntes = t.y;
    t.y -= vel * d;
    t.x += (t.vx || 0) * d;
    const fora = t.y < -20 || t.x < -20 || t.x > L.LARGURA + 20;
    // previsão: encostou numa nave ou no chefão da foto? some já (quem decide o acerto é o anfitrião)
    if (!fora && !(q && laserPareceAcertar(q, t.x, t.y, yAntes))) return true;
    if ((t.enviado || 0) < 2) cv.pendentes.push(t);
    return false;
  });
}

function laserPareceAcertar(q, x, y, yAntes) {
  if (q.chefe && laserNoChefe(q.chefe, x, y, yAntes)) return true;
  for (const n of q.naves) {
    const r = raioDaNave(n);
    if (Math.abs(n.x - x) < r + 3 && n.y > y - r && n.y < yAntes + r) return true;
  }
  return false;
}

// O que está acertando a minha nave agora (na posição `x`), com as coisas da foto onde estão desenhadas (`u`).
// Devolve { tipo: ATINGIDO.*, ref, chave } ou null. O que já me acertou (`vistos`) não acerta de novo.
export function ameacaNaNave(q, x, u, vistos = new Set()) {
  if (!q) return null;
  const { pos } = entreFotos(q, u);
  const nova = (am) => (vistos.has(am.chave) ? null : am);
  for (const s of q.disparos) {
    const [sx, sy] = pos(s);
    if (!tiroNaNave({ tipo: s.tipo, x: sx, y: sy }, x)) continue;
    const am = nova({ tipo: s.tipo === 'teia' ? ATINGIDO.teia : ATINGIDO.disparo, ref: s.id, chave: `d${s.id}` });
    if (am) return am;
  }
  for (const n of q.naves) {
    const a = n.ataque;
    if (a && a.fase === 'raio' && Math.abs(x - a.x) < L.RAIO_LARGURA / 2 + 12) {
      const am = nova({ tipo: ATINGIDO.raio, ref: n.i, chave: `r${q.fase}:${n.i}:${Math.round(a.x)}` });
      if (am) return am;
    }
    const [nx, ny] = pos(n);
    if (ny > L.Y_JOGADOR - 44 && Math.abs(nx - x) < 32) {
      const am = nova({ tipo: ATINGIDO.colisao, ref: n.i, chave: `n${q.fase}:${n.i}` });
      if (am) return am;
    }
  }
  if (q.chefe && raioDoChefeEm(q.chefe, x)) {
    const am = nova({ tipo: ATINGIDO.raio, ref: -1, chave: `c${q.seq}` });
    if (am) return am;
  }
  for (const m of q.meteoros) {
    if (m.aviso > 0) continue;
    const [mx, my] = pos(m);
    if (Math.hypot(mx - x, my - L.Y_JOGADOR) < m.r + 10) {
      const am = nova({ tipo: ATINGIDO.meteoro, ref: m.id, chave: `m${m.id}` });
      if (am) return am;
    }
  }
  return null;
}

// Confere se a minha nave foi atingida. Devolve a mensagem "e" para o anfitrião (ou null). Como no motor: protegida
// (logo depois de um acerto), o tiro some e a nave que bateu explode, mas não tira nave; raio e meteoro passam.
export function conferirAtingido(cv, q, u) {
  if (cv.caido || !q || q.fim || q.abertura > 0) return null;
  const am = ameacaNaNave(q, cv.x, u, cv.vistos);
  if (!am) return null;
  const protegida = cv.invulneravel > 0;
  if (protegida && (am.tipo === ATINGIDO.raio || am.tipo === ATINGIDO.meteoro)) return null;
  cv.vistos.add(am.chave);
  if (cv.vistos.size > 200) cv.vistos.delete(cv.vistos.values().next().value);
  if (protegida) return [2, am.tipo, am.ref, EFEITO.nada];
  if (am.tipo === ATINGIDO.teia) {
    cv.teia = L.TEIA_SEG;
    cv.eventos.push({ tipo: 'teia', x: cv.x, y: L.Y_JOGADOR });
    return [2, am.tipo, am.ref, EFEITO.nada];
  }
  if (cv.escudo) {
    cv.escudo = false;
    cv.invulneravel = 0.8;
    cv.eventos.push({ tipo: 'escudo_gasto', x: cv.x, y: L.Y_JOGADOR });
    return [2, am.tipo, am.ref, EFEITO.escudo];
  }
  cv.vidas -= 1;
  cv.invulneravel = 1.6;
  cv.eventos.push({ tipo: 'perdeu', x: cv.x, y: L.Y_JOGADOR });
  if (cv.vidas <= 0) {
    cv.vidas = 0;
    cv.caido = true;
    cv.tiros = [];
  }
  return [2, am.tipo, am.ref, EFEITO.nave];
}

// O que o anfitrião mandou só para mim (cápsula, nave extra, resgate, energia que acabou) e os meus lasers que acertaram.
export function aplicarFotoNoConvidado(cv, q) {
  for (const [dono, id] of q.gastos) if (dono === cv.id) cv.tiros = cv.tiros.filter((t) => t.id !== id);
  for (const [para, cod, valor] of q.avisos) {
    if (para !== cv.id) continue;
    if (cod === AVISO.capsula) {
      const tipo = (CAPSULAS[valor] || {}).id;
      if (tipo === 'escudo') cv.escudo = true;
      else if (tipo === 'duplo' || tipo === 'leque') {
        cv.arma = tipo;
        cv.armaT = CAPSULAS[valor].segundos;
      }
    } else if (cod === AVISO.vida) {
      if (!cv.caido) cv.vidas = Math.min(L.VIDAS_MAX, cv.vidas + valor);
    } else if (cod === AVISO.resgate) {
      if (cv.caido) {
        cv.caido = false;
        cv.vidas = 1;
        cv.invulneravel = 2;
        cv.eventos.push({ tipo: 'vida', x: cv.x, y: L.Y_JOGADOR });
      }
    } else if (cod === AVISO.energia) {
      if (!cv.caido) {
        cv.vidas -= 1;
        cv.eventos.push({ tipo: 'perdeu', x: cv.x, y: L.Y_JOGADOR });
        if (cv.vidas <= 0) {
          cv.vidas = 0;
          cv.caido = true;
          cv.tiros = [];
        }
      }
    }
  }
}

// O que o convidado desenha: a foto `q` no ponto `u` entre a anterior e a nova (0 a 1), e a minha nave entre dois
// passos (`alfa`). Tem os mesmos campos de uma partida do motor (desenho.js desenha as duas do mesmo jeito).
// `nomes`: Map(id -> { nome, nave, cor }).
export function vistaDoConvidado(q, cv, u, alfa, nomes) {
  const fix = (o) => {
    const x = L.entre(o.xa, o.x, u);
    const y = L.entre(o.ya, o.y, u);
    return { ...o, x, y, xa: x, ya: y };
  };
  const meuX = L.entre(cv.xa, cv.x, alfa);
  const aliados = q.pilotos.filter((pl) => pl.id !== cv.id).map((pl) => {
    const x = L.entre(pl.xa, pl.x, u);
    return {
      id: pl.id, x, xa: x, vx: pl.vx, nave: ORDEM_NAVES[pl.nave] || 'padrao', cor: ORDEM_CORES[pl.cor] || 'azul',
      invulneravel: pl.invulneravel, escudo: pl.escudo, caido: pl.caido, tiros: q.lasers.filter((t) => t.dono === pl.id).map(fix),
    };
  });
  const placar = q.pilotos.map((pl) => ({
    id: pl.id, vidas: pl.id === cv.id ? cv.vidas : pl.vidas, caido: pl.id === cv.id ? cv.caido : pl.caido,
    ...(nomes.get(pl.id) || { nome: 'Piloto', cor: 'azul' }), eu: pl.id === cv.id,
  }));
  return {
    fase: q.fase, tipo: q.tipo, onda: { especie: q.especie, chefe: q.chefeIdx >= 0 ? q.chefeIdx : null }, abertura: q.abertura,
    energia: q.energia, energiaMax: q.energiaMax, pontos: q.pontos, vidas: cv.vidas, rotulo: 'ESQUADRÃO', modo: 'normal',
    poderes: { arma: cv.arma, armaT: cv.armaT, escudo: cv.escudo, lento: q.lento, teia: cv.teia },
    combo: q.combo,
    naves: q.naves.map(fix), disparos: q.disparos.map(fix), capsulas: q.capsulas.map(fix), meteoros: q.meteoros.map(fix),
    chefe: q.chefe ? fix(q.chefe) : null,
    tiros: cv.tiros.map((t) => {
      const x = L.entre(t.xa, t.x, alfa);
      const y = L.entre(t.ya, t.y, alfa);
      return { x, y, xa: x, ya: y, vx: t.vx };
    }),
    jx: meuX, jxAntes: meuX, vx: cv.vx, invulneravel: cv.invulneravel, caido: cv.caido,
    aliados, resgates: q.resgates, esquadrao: { meuId: cv.id, nomes, placar }, eventos: [],
  };
}

// O que eu mando ("p"): [x, vx, vidas, escudo, protegido, caído, arma, armaT×10, n, (id, x, y, vx) × n].
// Só vão os lasers que o anfitrião ainda não viu (cada laser vai em 2 mensagens seguidas, por garantia).
export function mensagemDoConvidado(cv) {
  const novos = [...cv.pendentes, ...cv.tiros].filter((t) => (t.enviado || 0) < 2).slice(0, MAX_LASERS_MSG);
  const m = [Math.round(cv.x * 10) / 10, Math.round(cv.vx), cv.vidas, cv.escudo ? 1 : 0, cv.invulneravel > 0 ? 1 : 0, cv.caido ? 1 : 0,
    cv.arma === 'duplo' ? 0 : cv.arma === 'leque' ? 1 : -1, Math.round(cv.armaT * 10), novos.length];
  for (const t of novos) {
    t.enviado = (t.enviado || 0) + 1;
    m.push(t.id, Math.round(t.x), Math.round(t.y), Math.round(t.vx || 0));
  }
  cv.pendentes = cv.pendentes.filter((t) => t.enviado < 2);
  return m;
}
