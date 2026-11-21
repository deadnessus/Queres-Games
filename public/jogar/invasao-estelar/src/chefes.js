// Chefões: no fim de cada volta (ondas 8, 16, 24...), um dos três, em rodízio: Nave-mãe, Rainha Aranha e Olho
// Gigante. Todo ataque avisa antes (brilho, linha ou a área do raio pintada). Sem tela nem canvas (testado com
// node --test). Quem dá os pontos e tira as vidas é motor.js; aqui só se move, se ataca e se conta a vida.
import * as L from './logica.js?v=11';
import { CHEFES, MINIONS_MAX, PONTOS_CHEFE, forcaDoChefe } from './dados.js?v=11';
import { novoTiro } from './tiros.js?v=11';
import { novaNave } from './inimigos.js?v=11';

export const Y_CHEFE = 182; // altura onde o chefão fica depois de entrar (abaixo da barra de vida)
const ENTRADA = 2.2; // segundos descendo do alto
export const DURACAO_MORTE = 1.5; // segundos de explosões antes da próxima onda

// Nave-mãe: 4 canhões pendurados embaixo do casco e o núcleo no meio (protegido enquanto houver canhão).
export const CANHOES = [[-96, 18], [-52, 30], [52, 30], [96, 18]];
// metade da largura e alturas do casco, a partir do centro: os canhões e o núcleo ficam abaixo dele, ao alcance dos tiros
export const CASCO_NAVE_MAE = { larg: 128, cima: 46, baixo: 2 };

export function criarChefe(p) {
  const o = p.onda;
  const def = CHEFES[o.chefe];
  // no esquadrão (Etapa 4) o chefão aguenta mais: +50% de vida por piloto a mais
  const forca = forcaDoChefe(o.volta, p.modo) * (p.pilotos > 1 ? 1 + 0.5 * (p.pilotos - 1) : 1);
  const pressa = p.modo === 'recruta' ? 1.4 : Math.max(0.6, 1 - 0.08 * o.volta); // intervalo entre ataques
  const c = {
    indice: o.chefe,
    id: def.id,
    x: L.LARGURA / 2,
    y: -110,
    xa: L.LARGURA / 2,
    ya: -110,
    t: 0, // segundos de luta
    vivo: true,
    morrendo: 0, // segundos que faltam das explosões finais
    pressa,
    partes: [],
    ataque: null, // { tipo, fase: 'aviso' | 'ativo', t, ... }
    proximo: 1.6 * pressa, // segundos até o próximo ataque
    proximoMinion: def.cacas || def.ovos || 0,
    // rainha: anda de um lado para o outro; olho: abre e fecha
    lado: -1,
    estado: 'parada',
    estadoT: def.parada || def.aberto || 0,
    origemX: L.LARGURA / 2,
    destinoX: L.LARGURA / 2,
    fechado: false,
  };
  if (def.id === 'nave-mae') {
    for (const [dx, dy] of CANHOES) c.partes.push(novaParte('canhao', dx, dy, 17, Math.round(def.vidaCanhao * forca)));
    c.partes.push(novaParte('nucleo', 0, 10, 22, Math.round(def.vidaNucleo * forca)));
  } else if (def.id === 'rainha') {
    c.partes.push(novaParte('corpo', 0, 0, 46, Math.round(def.vida * forca)));
  } else {
    c.partes.push(novaParte('olho', 0, 0, 44, Math.round(def.vida * forca)));
  }
  p.chefe = c;
}

function novaParte(tipo, dx, dy, r, vida) {
  return { tipo, dx, dy, r, vida, max: vida, viva: true, flash: 0 };
}

// Vida que falta, de 0 a 1 (para a barra no topo).
export function vidaDoChefe(c) {
  let vida = 0;
  let max = 0;
  for (const pt of c.partes) {
    vida += Math.max(0, pt.vida);
    max += pt.max;
  }
  return max ? vida / max : 0;
}

const protegida = (c, pt) => (pt.tipo === 'nucleo' && c.partes.some((q) => q.tipo === 'canhao' && q.viva)) || (pt.tipo === 'olho' && c.fechado);

// O laser em (x, y), que neste passo veio de yAntes, acertou o chefão? Devolve null (passou), { parte, absorvido }.
// `absorvido`: bateu no casco, no escudo do núcleo ou no olho fechado (sem dano).
export function laserNoChefe(c, x, y, yAntes) {
  if (!c || !c.vivo || c.y < 0) return null;
  let melhor = null;
  for (const pt of c.partes) {
    if (!pt.viva) continue;
    const px = c.x + pt.dx;
    const py = c.y + pt.dy;
    if (Math.abs(x - px) < pt.r + 3 && py > y - pt.r && py < yAntes + pt.r && (!melhor || py > c.y + melhor.dy)) melhor = pt;
  }
  if (melhor) return { parte: melhor, absorvido: protegida(c, melhor) };
  if (c.id === 'nave-mae') {
    const k = CASCO_NAVE_MAE;
    if (Math.abs(x - c.x) < k.larg && y < c.y + k.baixo && yAntes > c.y - k.cima) return { parte: null, absorvido: true };
  }
  return null;
}

// Tira 1 de vida da parte. Devolve { pontos, derrotado, parteCaiu }. Pontos: cada canhão que cai, e o chefão derrotado.
export function danoNoChefe(p, parte) {
  const c = p.chefe;
  parte.vida -= 1;
  parte.flash = 0.09;
  const r = { pontos: 0, derrotado: false, parteCaiu: false };
  if (parte.vida > 0) return r;
  parte.viva = false;
  if (parte.tipo === 'canhao') {
    r.parteCaiu = true;
    r.pontos += L.pontosPorNave(p.fase) * PONTOS_CHEFE.parte;
    p.eventos.push({ tipo: 'parte_caiu', x: c.x + parte.dx, y: c.y + parte.dy });
    return r;
  }
  // núcleo, corpo da rainha ou olho: o chefão caiu
  c.vivo = false;
  c.morrendo = DURACAO_MORTE;
  c.ataque = null;
  r.derrotado = true;
  r.pontos += L.pontosPorNave(p.fase) * PONTOS_CHEFE.derrotado;
  p.disparos = []; // os tiros somem junto com ele
  for (const n of p.naves) {
    if (!n.vivo) continue;
    n.vivo = false;
    p.eventos.push({ tipo: 'explosao', x: n.x, y: n.y, nave: n.tipo, pontos: 0, mult: 1, filhote: true });
  }
  p.eventos.push({ tipo: 'chefe_derrotado', x: c.x, y: c.y, chefe: c.indice });
  return r;
}

/* ---------- movimento ---------- */

const suave = (k) => k * k * (3 - 2 * k);

function mover(p, c, de) {
  const def = CHEFES[c.indice];
  // o olho fica parado enquanto avisa e varre: a fatia pintada é exatamente onde o raio vai passar
  if (c.ataque && c.ataque.tipo === 'varredura') return;
  if (c.t < ENTRADA) {
    c.y = -110 + (Y_CHEFE + 110) * suave(Math.min(1, c.t / ENTRADA));
  } else {
    c.y = Y_CHEFE + Math.sin(c.t * 0.9) * 6;
  }
  if (def.id === 'nave-mae') {
    // balança devagar; para enquanto o núcleo mira o raio
    if (!(c.ataque && c.ataque.tipo === 'raio')) c.x += (L.LARGURA / 2 + Math.sin(c.t * 0.45) * 36 - c.x) * Math.min(1, de * 3);
  } else if (def.id === 'rainha') {
    if (c.t < ENTRADA) return;
    c.estadoT -= de;
    if (c.estado === 'parada' && c.estadoT <= 0 && !c.ataque) {
      c.estado = 'agachada'; // avisa antes de atravessar
      c.estadoT = 0.6;
      p.eventos.push({ tipo: 'aviso', x: c.x, y: c.y, tiro: 'teia' });
    } else if (c.estado === 'agachada' && c.estadoT <= 0) {
      c.estado = 'atravessando';
      c.estadoT = def.travessia;
      c.origemX = c.x;
      c.lado = -c.lado;
      c.destinoX = L.LARGURA / 2 + c.lado * 92;
    } else if (c.estado === 'atravessando') {
      const k = 1 - Math.max(0, c.estadoT) / def.travessia;
      c.x = c.origemX + (c.destinoX - c.origemX) * suave(k);
      if (c.estadoT <= 0) {
        c.estado = 'parada';
        c.estadoT = def.parada;
      }
    }
  } else {
    // olho: passeia devagar e pisca (fechado, os tiros batem e voltam)
    c.x += (L.LARGURA / 2 + Math.sin(c.t * 0.4) * 70 - c.x) * Math.min(1, de * 2);
    if (c.t < ENTRADA) return;
    c.estadoT -= de;
    if (c.estadoT <= 0) {
      c.fechado = !c.fechado;
      c.estadoT = c.fechado ? def.fechado : def.aberto;
      if (c.fechado) c.ataque = null;
    }
  }
}

/* ---------- ataques ---------- */

function minionsVivos(p) {
  return p.naves.filter((n) => n.vivo).length;
}

function soltarMinions(p, c, tipo) {
  for (const lado of [-1, 1]) {
    if (minionsVivos(p) >= MINIONS_MAX) return;
    const f = novaNave(p.naves.length, 1, c.x, c.y, tipo);
    f.filhote = true;
    f.vida = 1;
    f.escudo = false;
    f.x = c.x + lado * 20;
    f.y = c.y + 30;
    f.xa = f.x;
    f.ya = f.y;
    f.vx = lado * (70 + p.rand() * 40);
    f.vy = 40 + p.rand() * 25;
    p.naves.push(f);
  }
}

function cabeTiro(p, quantos) {
  return p.disparos.length + quantos <= p.onda.maxDisparos + 3;
}

// Escolhe o próximo ataque de cada chefão (sempre começando por um aviso).
function escolherAtaque(p, c) {
  const def = CHEFES[c.indice];
  const vivos = c.partes.filter((pt) => pt.viva);
  if (def.id === 'nave-mae') {
    const canhoes = vivos.filter((pt) => pt.tipo === 'canhao');
    if (canhoes.length) {
      const pt = canhoes[Math.floor(p.rand() * canhoes.length)];
      return { tipo: 'canhao', parte: c.partes.indexOf(pt), fase: 'aviso', t: 0.45, espera: def.ataque };
    }
    return { tipo: 'raio', fase: 'aviso', t: 1.0, x: c.x, espera: def.raio };
  }
  if (def.id === 'rainha') {
    if (c.estado !== 'parada') return null;
    return { tipo: 'teias', fase: 'aviso', t: 0.6, espera: def.ataque };
  }
  if (c.fechado) return null;
  // olho: raio que varre uma fatia avisada, ou tiros guiados
  if (p.rand() < 0.5) {
    const centro = Math.atan2(L.Y_JOGADOR - c.y, L.alvoX(p) - c.x);
    const dir = p.rand() < 0.5 ? -1 : 1;
    const meia = 0.2; // meia abertura da fatia (rad): na altura da nave dá uns 85 px para cada lado
    return { tipo: 'varredura', fase: 'aviso', t: 1.0, de: centro - dir * meia, ate: centro + dir * meia, ang: centro - dir * meia, espera: def.varredura };
  }
  return { tipo: 'guiados', fase: 'aviso', t: 0.6, espera: def.guiados };
}

function executar(p, c) {
  const a = c.ataque;
  const o = p.onda;
  if (a.tipo === 'canhao') {
    const pt = c.partes[a.parte];
    if (pt.viva && cabeTiro(p, 1)) {
      const x = c.x + pt.dx;
      const y = c.y + pt.dy + 12;
      const vx = L.clamp((L.alvoX(p) - x) * 0.4 * Math.max(0.5, o.mira), -80, 80);
      p.disparos.push(novoTiro('reto', x, y, vx, o.velDisparo));
      p.eventos.push({ tipo: 'disparo', x, y, tiro: 'reto' });
    }
    c.ataque = null;
  } else if (a.tipo === 'raio') {
    c.ataque = { tipo: 'raio', fase: 'ativo', t: 0.5, x: a.x };
    p.eventos.push({ tipo: 'raio', x: a.x, y: c.y + 30 });
  } else if (a.tipo === 'teias') {
    if (cabeTiro(p, 3)) {
      const mira = L.clamp((L.alvoX(p) - c.x) * 0.35, -70, 70);
      for (const dx of [-60, 0, 60]) p.disparos.push(novoTiro('teia', c.x, c.y + 34, mira + dx, o.velDisparo * L.VEL_TEIA));
      p.eventos.push({ tipo: 'disparo', x: c.x, y: c.y + 34, tiro: 'teia' });
    }
    c.ataque = null;
  } else if (a.tipo === 'varredura') {
    c.ataque = { ...a, fase: 'ativo', t: 0.8, ang: a.de };
    p.eventos.push({ tipo: 'raio', x: c.x, y: c.y });
  } else if (a.tipo === 'guiados') {
    if (cabeTiro(p, 3)) {
      for (const vx of [-45, 0, 45]) p.disparos.push(novoTiro('guiado', c.x + vx * 0.3, c.y + 40, vx, L.VEL_GUIADO * o.acel));
      p.eventos.push({ tipo: 'disparo', x: c.x, y: c.y + 40, tiro: 'guiado' });
    }
    c.ataque = null;
  } else {
    c.ataque = null;
  }
}

// Distância do ponto (px, py) à semirreta que sai de (x, y) no ângulo `ang`.
function distanciaAoRaio(x, y, ang, px, py) {
  const ux = Math.cos(ang);
  const uy = Math.sin(ang);
  const k = (px - x) * ux + (py - y) * uy;
  if (k < 0) return Infinity;
  return Math.hypot(px - (x + ux * k), py - (y + uy * k));
}

// Anda o chefão (`de` já vem mais lento na câmera lenta). Devolve true se um raio dele está passando pela nave.
export function atualizarChefe(p, de) {
  const c = p.chefe;
  if (!c) return false;
  for (const pt of c.partes) pt.flash = Math.max(0, pt.flash - de);
  if (!c.vivo) {
    c.morrendo = Math.max(0, c.morrendo - de);
    return false;
  }
  c.t += de;
  mover(p, c, de);
  if (c.t < ENTRADA) return false;
  const def = CHEFES[c.indice];

  // inimigos pequenos: caças da nave-mãe e aranhas da rainha (avisam antes: a escotilha ou o ovo brilha)
  if (def.cacas || def.ovos) {
    c.proximoMinion -= de;
    if (c.proximoMinion <= 0 && !c.chocando && minionsVivos(p) < MINIONS_MAX - 1 && (def.id !== 'rainha' || c.estado === 'parada')) {
      c.chocando = 0.7;
      p.eventos.push({ tipo: 'aviso', x: c.x, y: c.y + 30, tiro: 'ovo' });
    }
    if (c.chocando) {
      c.chocando -= de;
      if (c.chocando <= 0) {
        c.chocando = 0;
        soltarMinions(p, c, def.id === 'rainha' ? 5 : 0);
        c.proximoMinion = (def.cacas || def.ovos) * c.pressa;
      }
    }
  }

  // ataques
  let atingiu = false;
  if (!c.ataque) {
    c.proximo -= de;
    if (c.proximo <= 0) {
      c.ataque = escolherAtaque(p, c);
      if (c.ataque) {
        c.proximo = c.ataque.espera * c.pressa * (0.85 + p.rand() * 0.3);
        p.eventos.push({ tipo: 'aviso', x: c.x, y: c.y, tiro: c.ataque.tipo === 'teias' ? 'teia' : c.ataque.tipo === 'guiados' ? 'guiado' : 'raio' });
      } else {
        c.proximo = 0.3;
      }
    }
  } else {
    const a = c.ataque;
    a.t -= de;
    if (a.fase === 'aviso') {
      if (a.t <= 0) executar(p, c);
    } else if (a.tipo === 'raio') {
      if (raioDoChefeEm(c, p.jx)) atingiu = true;
      if (a.t <= 0) c.ataque = null;
    } else if (a.tipo === 'varredura') {
      const k = 1 - Math.max(0, a.t) / 0.8;
      a.ang = a.de + (a.ate - a.de) * k;
      if (raioDoChefeEm(c, p.jx)) atingiu = true;
      if (a.t <= 0) c.ataque = null;
    }
  }
  return atingiu;
}

// Um raio do chefão (o reto da nave-mãe ou a varredura do olho) está passando pela nave em `x`?
export function raioDoChefeEm(c, x) {
  const a = c && c.vivo ? c.ataque : null;
  if (!a || a.fase !== 'ativo') return false;
  if (a.tipo === 'raio') return Math.abs(x - a.x) < L.RAIO_LARGURA / 2 + 14;
  if (a.tipo === 'varredura') return distanciaAoRaio(c.x, c.y, a.ang, x, L.Y_JOGADOR) < 14;
  return false;
}

// A nave do jogador está dentro da fatia avisada da varredura? (usado nos testes e no desenho)
export function dentroDaFatia(c, a, x) {
  const ang = Math.atan2(L.Y_JOGADOR - c.y, x - c.x);
  const lo = Math.min(a.de, a.ate) - 0.05;
  const hi = Math.max(a.de, a.ate) + 0.05;
  return ang >= lo && ang <= hi;
}
