// Inimigos: movimento (padrão da onda + desvios), ataques com aviso e filhotes. Sem tela nem canvas.
// Todo ataque avisa antes: a nave fica em `ataque.fase = 'aviso'` pelo tempo de aviso dela (dados.js) e só depois
// atira. Quem decide o que acontece quando um tiro acerta é motor.js; aqui só se move e se criam tiros.
import * as L from './logica.js?v=11';
import { INIMIGOS, CUSTO_DO_TIRO, DIFICULDADE } from './dados.js?v=11';
import { novoTiro } from './tiros.js?v=11';

const INVESTIDA_DUR = 1.5; // segundos da investida da vespa (desce em zigue-zague e volta)
const INVESTIDA_FUNDO = 125; // px que ela desce
const INVESTIDA_LADO = 26; // px do zigue-zague
const FILHOTE_TOPO = 110;
const FILHOTE_FUNDO = 400;
const ATACA_ATE = 400; // abaixo disso (perto da nave) ninguém começa um ataque: nada de tiro à queima-roupa

export function novaNave(i, n, hx, hy, tipo) {
  const def = INIMIGOS[tipo];
  return {
    i, n, hx, hy, tipo,
    x: L.LARGURA / 2,
    y: -50,
    vivo: true,
    vida: def.vida,
    escudo: def.especial === 'escudo',
    furia: false,
    adianto: 0, // a nave furiosa anda à frente do grupo no padrão
    ataque: null, // { fase: 'aviso' | 'raio', t, x }
    investida: null, // vespa: { u (0 a 1), dur, lado, atirou }
    ox: 0, // desvio do padrão (investida, sentinela parada mirando)
    oy: 0,
    flash: 0, // segundos piscando branco depois de levar um tiro (só para o desenho)
    inclina: 0,
    filhote: false,
  };
}

export const raioDaNave = (n) => (n.filhote ? L.RAIO_FILHOTE : L.RAIO_NAVE);

// Fração das naves da formação que ainda estão vivas (os filhotes não contam).
export function vivosFrac(p) {
  let total = 0;
  let vivos = 0;
  for (const n of p.naves) {
    if (n.filhote) continue;
    total++;
    if (n.vivo) vivos++;
  }
  return total ? vivos / total : 0;
}

/* ---------- movimento ---------- */

function desviar(n, pos, de) {
  const a = n.ataque;
  if (a && INIMIGOS[n.tipo].tiro === 'raio') {
    // a sentinela para de andar de lado enquanto mira e atira: a linha mostra exatamente onde o raio vai passar
    n.ox = a.x - pos.x;
    n.oy *= Math.max(0, 1 - de * 8);
    return;
  }
  const v = n.investida;
  if (v) {
    v.u = Math.min(1, v.u + de / v.dur);
    n.ox = Math.sin(v.u * Math.PI * 4) * INVESTIDA_LADO * v.lado;
    n.oy = Math.sin(v.u * Math.PI) * INVESTIDA_FUNDO;
    return;
  }
  // depois de um desvio, volta aos poucos para o padrão
  const k = Math.max(0, 1 - de * 8);
  n.ox *= k;
  n.oy *= k;
}

function moverFilhote(n, de) {
  n.x += n.vx * de;
  n.y += n.vy * de;
  if (n.x < 24) { n.x = 24; n.vx = Math.abs(n.vx); }
  if (n.x > L.LARGURA - 24) { n.x = L.LARGURA - 24; n.vx = -Math.abs(n.vx); }
  if (n.y > FILHOTE_FUNDO) n.vy = -Math.abs(n.vy);
  if (n.y < FILHOTE_TOPO) n.vy = Math.abs(n.vy);
}

// Põe cada nave no lugar: padrão da onda (logica.js) + desvio, ou movimento próprio dos filhotes.
export function posicionarNaves(p, de) {
  const ctx = { jx: L.alvoX(p), vel: p.vel, descida: p.descida, fundo: p.onda.fundoMergulho };
  for (const n of p.naves) {
    if (!n.vivo) continue;
    n.flash = Math.max(0, n.flash - de);
    const antes = n.x;
    if (n.filhote) {
      moverFilhote(n, de);
    } else {
      if (n.furia) n.adianto += de * 0.6; // furiosa: anda 60% mais depressa no padrão
      const pos = L.posicaoNave(p.padrao, n, p.tempoFase, p.tm + n.adianto, ctx);
      desviar(n, pos, de);
      n.x = pos.x + n.ox;
      n.y = pos.y + n.oy;
      const v = n.investida;
      if (v && !v.atirou && v.u >= 0.5) {
        v.atirou = true;
        ferroada(p, n);
      }
      if (v && v.u >= 1) n.investida = null;
    }
    if (de > 0) {
      // inclinação conforme anda de lado (só para o desenho)
      const alvo = L.clamp(((n.x - antes) / de) * 0.0016, -0.4, 0.4);
      n.inclina += (alvo - n.inclina) * Math.min(1, de * 10);
    }
  }
}

// O parasita derrubado vira 2 filhotes pequenos, que voam soltos pela tela.
export function soltarFilhotes(p, nave) {
  for (const lado of [-1, 1]) {
    const f = novaNave(p.naves.length, 1, nave.x, nave.y, nave.tipo);
    f.filhote = true;
    f.vida = 1;
    f.escudo = false;
    f.x = nave.x + lado * 8;
    f.y = nave.y;
    f.xa = f.x;
    f.ya = f.y;
    f.vx = lado * (70 + p.rand() * 40);
    f.vy = 35 + p.rand() * 25;
    p.naves.push(f);
  }
}

/* ---------- ataques ---------- */

const tiroDe = (n) => (n.filhote ? 'reto' : INIMIGOS[n.tipo].tiro);

// Tiros já reservados por quem está avisando ou investindo (contam para o limite de tiros na tela).
function reservados(p) {
  let r = 0;
  for (const n of p.naves) {
    if (!n.vivo) continue;
    if (n.ataque) r += n.ataque.fase === 'raio' ? 1 : CUSTO_DO_TIRO[tiroDe(n)];
    else if (n.investida && !n.investida.atirou) r += 1;
  }
  return r;
}

function raiosAtivos(p) {
  let r = 0;
  for (const n of p.naves) if (n.vivo && n.ataque && tiroDe(n) === 'raio') r++;
  return r;
}

// Cada nave pode começar um ataque: primeiro avisa (pisca, treme ou mostra a linha), depois atira.
export function decidirAtaques(p, de) {
  const o = p.onda;
  let ocupados = p.disparos.length + reservados(p);
  const maxRaios = o.volta >= 1 ? 2 : 1;
  for (const n of p.naves) {
    if (!n.vivo || n.ataque || n.investida) continue;
    const tiro = tiroDe(n);
    if (n.y < 40 || n.y > (tiro === 'bomba' ? L.ALTURA_ESTOURO - 100 : ATACA_ATE)) continue;
    const custo = CUSTO_DO_TIRO[tiro];
    if (ocupados + custo > o.maxDisparos) continue;
    if (tiro === 'raio' && raiosAtivos(p) >= maxRaios) continue;
    const def = INIMIGOS[n.tipo];
    const chance = o.chance * def.chance * (n.furia ? 1.6 : 1) * (n.filhote ? 0.5 : 1) * de;
    if (p.rand() < chance) {
      n.ataque = { fase: 'aviso', t: n.filhote ? 0.35 : def.aviso, x: n.x };
      ocupados += custo;
      p.eventos.push({ tipo: 'aviso', x: n.x, y: n.y, tiro });
    }
  }
}

function ferroada(p, n) {
  const o = p.onda;
  const vx = L.clamp((L.alvoX(p) - n.x) * 0.9 * Math.max(0.4, o.mira), -120, 120);
  p.disparos.push(novoTiro('ferrao', n.x, n.y + 14, vx, L.VEL_FERRAO * Math.min(1.3, o.acel)));
  p.eventos.push({ tipo: 'disparo', x: n.x, y: n.y + 14, tiro: 'ferrao' });
}

// O aviso acabou: o ataque sai, do jeito de cada inimigo.
function executar(p, n) {
  const o = p.onda;
  const travado = n.ataque.x;
  const x = n.x;
  const y = n.y + 16;
  const vy = () => o.velDisparo + p.rand() * DIFICULDADE.velDisparoVariacao;
  const mira = () => L.clamp((L.alvoX(p) - x) * 0.35 * o.mira, -70, 70);
  const tiro = tiroDe(n);
  n.ataque = null;
  switch (tiro) {
    case 'duplo': {
      const v = vy();
      p.disparos.push(novoTiro('reto', x - 7, y, 0, v), novoTiro('reto', x + 7, y, 0, v));
      break;
    }
    case 'ferrao':
      // a vespa se solta em zigue-zague; a ferroada sai no fundo da investida (posicionarNaves)
      n.investida = { u: 0, dur: INVESTIDA_DUR, lado: p.rand() < 0.5 ? -1 : 1, atirou: false };
      return;
    case 'bomba':
      p.disparos.push(novoTiro('bomba', x, y, 0, L.VEL_BOMBA * o.acel, { estoura: L.ALTURA_ESTOURO + p.rand() * 30 }));
      break;
    case 'teia':
      if (p.rand() < 0.6) p.disparos.push(novoTiro('teia', x, y, mira() * 0.6, vy() * L.VEL_TEIA));
      else p.disparos.push(novoTiro('reto', x, y, mira(), vy()));
      break;
    case 'raio':
      n.ataque = { fase: 'raio', t: L.RAIO_DURACAO, x: travado };
      p.eventos.push({ tipo: 'raio', x: travado, y });
      return;
    case 'leque': {
      const v = vy();
      const c = mira();
      for (const dx of [-70, 0, 70]) p.disparos.push(novoTiro('reto', x, y, c + dx, v));
      break;
    }
    case 'guiado':
      p.disparos.push(novoTiro('guiado', x, y, 0, L.VEL_GUIADO * o.acel));
      break;
    default:
      p.disparos.push(novoTiro('reto', x, y, mira(), vy()));
  }
  p.eventos.push({ tipo: 'disparo', x, y, tiro });
}

// Conta o tempo dos avisos e dos raios. Devolve true se um raio está passando pela nave do jogador.
export function atualizarAtaques(p, de) {
  let raioAtingiu = false;
  for (const n of p.naves) {
    const a = n.ataque;
    if (!a) continue;
    if (!n.vivo) {
      n.ataque = null;
      continue;
    }
    a.t -= de;
    if (a.fase === 'aviso') {
      if (a.t <= 0) executar(p, n);
    } else if (a.fase === 'raio') {
      if (Math.abs(p.jx - a.x) < L.RAIO_LARGURA / 2 + 12) raioAtingiu = true;
      if (a.t <= 0) n.ataque = null;
    }
  }
  return raioAtingiu;
}
