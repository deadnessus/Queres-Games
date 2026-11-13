// Motor da partida: estado e atualização a cada quadro. Não desenha nada (quem desenha é desenho.js).
import * as L from './logica.js?v=3';

export function novaPartida({ rand = Math.random } = {}) {
  const p = {
    rand,
    fase: 1,
    pontos: 0,
    vidas: L.VIDAS_INICIAIS,
    abates: 0,
    tempo: 0,
    estado: 'jogando', // 'jogando' | 'fim'
    jx: L.LARGURA / 2,
    vx: 0,
    tipo: 0,
    padrao: 0,
    vel: 1,
    naves: [],
    descida: 0,
    tempoFase: 0, // segundos desde o começo da onda
    tm: 0, // tempo do grupo: anda mais depressa quando sobram poucas naves
    abertura: 0, // segundos que faltam da entrada das naves (enquanto > 0 ninguém atira nem colide)
    energia: 0,
    energiaMax: 0,
    cooldown: 0.3,
    invulneravel: 0,
    tiros: [], // lasers do jogador
    disparos: [], // plasma dos inimigos
    // 'tiro' | 'explosao' | 'disparo' | 'perdeu' | 'fase' | 'vida' | 'fim', cada um com a posição do acontecimento
    eventos: [],
  };
  comecarFase(p);
  return p;
}

function comecarFase(p) {
  const n = L.numNaves(p.fase);
  p.tipo = L.tipoDaFase(p.fase);
  p.padrao = L.padraoDaFase(p.fase);
  p.vel = L.multVelocidade(p.fase);
  p.naves = [];
  for (let i = 0; i < n; i++) {
    const col = i % 4;
    const linha = Math.floor(i / 4);
    p.naves.push({ i, n, hx: 75 + col * 70, hy: 108 + linha * 46, x: 180, y: -50, vivo: true, inclina: 0 });
  }
  p.descida = 0;
  p.tempoFase = 0;
  p.tm = 0;
  p.abertura = L.ABERTURA_SEG;
  p.energiaMax = L.energiaDaFase(p.fase);
  p.energia = p.energiaMax;
  p.tiros = [];
  p.disparos = [];
  atualizarPosicoes(p, 0);
}

function vivosFrac(p) {
  const total = p.naves.length;
  return total ? p.naves.filter((n) => n.vivo).length / total : 0;
}

function atualizarPosicoes(p, d) {
  const ctx = { jx: p.jx, vel: p.vel, descida: p.descida };
  for (const n of p.naves) {
    if (!n.vivo) continue;
    const pos = L.posicaoNave(p.padrao, n, p.tempoFase, p.tm, ctx);
    if (d > 0) {
      // inclinação da nave conforme anda de lado (só para o desenho)
      const alvo = L.clamp(((pos.x - n.x) / d) * 0.0016, -0.4, 0.4);
      n.inclina += (alvo - n.inclina) * Math.min(1, d * 10);
    }
    n.x = pos.x;
    n.y = pos.y;
  }
}

function ganharPontos(p, quantidade) {
  const antes = p.pontos;
  p.pontos += quantidade;
  const extras = L.vidasGanhas(antes, p.pontos);
  if (extras > 0) {
    p.vidas = Math.min(L.VIDAS_MAX, p.vidas + extras);
    p.eventos.push({ tipo: 'vida', x: p.jx, y: L.Y_JOGADOR });
  }
}

function abater(p, nave) {
  nave.vivo = false;
  p.abates++;
  ganharPontos(p, L.pontosPorNave(p.fase));
  p.eventos.push({ tipo: 'explosao', x: nave.x, y: nave.y, nave: p.tipo });
}

// Perde uma vida. Depois de um acerto, fica um tempo invulnerável (não vale para a energia zerada).
export function perderVida(p, motivo) {
  if (p.estado !== 'jogando') return;
  if (motivo !== 'energia' && p.invulneravel > 0) return;
  p.vidas--;
  p.invulneravel = 1.6;
  p.eventos.push({ tipo: 'perdeu', x: p.jx, y: L.Y_JOGADOR });
  if (p.vidas <= 0) {
    p.vidas = 0;
    p.estado = 'fim';
    p.eventos.push({ tipo: 'fim', x: p.jx, y: L.Y_JOGADOR });
  }
}

// Avança a partida em `dt` segundos. `dirEntrada` é -1 (esquerda), 0 (parado) ou 1 (direita).
export function atualizar(p, dt, dirEntrada) {
  if (p.estado !== 'jogando') return;
  const d = Math.min(Math.max(dt, 0), 0.05);
  p.tempo += d;

  // a nave acelera e freia: o movimento fica mais suave que mudar de velocidade de uma vez
  const alvoVx = dirEntrada * L.VEL_MAX_JOGADOR;
  const passo = L.ACEL_JOGADOR * d;
  p.vx += L.clamp(alvoVx - p.vx, -passo, passo);
  p.jx += p.vx * d;
  if (p.jx < L.MARGEM_JOGADOR) { p.jx = L.MARGEM_JOGADOR; p.vx = Math.max(0, p.vx); }
  if (p.jx > L.LARGURA - L.MARGEM_JOGADOR) { p.jx = L.LARGURA - L.MARGEM_JOGADOR; p.vx = Math.min(0, p.vx); }
  p.invulneravel = Math.max(0, p.invulneravel - d);

  // as naves se mexem desde a entrada
  p.tempoFase += d;
  p.tm += d * L.rapidezDoGrupo(vivosFrac(p));
  p.descida = L.avancarDescida(p.descida, d, p.padrao, vivosFrac(p));
  atualizarPosicoes(p, d);

  if (p.abertura > 0) {
    p.abertura = Math.max(0, p.abertura - d);
    return; // ninguém atira nem colide durante a entrada
  }

  // tiro automático: um laser por vez
  p.cooldown -= d;
  if (p.tiros.length === 0 && p.cooldown <= 0) {
    p.tiros.push({ x: p.jx, y: L.Y_JOGADOR - 26 });
    p.cooldown = 0.14;
    p.eventos.push({ tipo: 'tiro', x: p.jx, y: L.Y_JOGADOR - 26 });
  }
  p.tiros = p.tiros.filter((t) => {
    const yAntes = t.y;
    t.y -= L.VEL_TIRO * d;
    if (t.y < -20) return false;
    // confere o trecho percorrido neste quadro (o laser é rápido e poderia "pular" uma nave)
    const alvo = p.naves.find((n) => n.vivo && Math.abs(n.x - t.x) < L.RAIO_NAVE + 3 && n.y > t.y - L.RAIO_NAVE && n.y < yAntes + L.RAIO_NAVE);
    if (alvo) {
      abater(p, alvo);
      return false;
    }
    return true;
  });

  // plasma dos inimigos: mira um pouco no jogador, mais a cada volta
  const chance = 0.05 * p.vel * d;
  const ciclo = L.cicloDaFase(p.fase);
  const maxDisparos = 5 + Math.min(2, ciclo);
  for (const n of p.naves) {
    if (n.vivo && n.y > 0 && p.disparos.length < maxDisparos && p.rand() < chance) {
      const mira = Math.min(1, 0.3 + 0.25 * ciclo);
      const vy = 190 + 30 * ciclo + p.rand() * 40;
      const vx = L.clamp((p.jx - n.x) * 0.35 * mira, -70, 70);
      p.disparos.push({ x: n.x, y: n.y + 16, vx, vy });
      p.eventos.push({ tipo: 'disparo', x: n.x, y: n.y + 16 });
    }
  }
  for (const s of p.disparos) {
    s.x += s.vx * d;
    s.y += s.vy * d;
  }
  let acertou = false;
  p.disparos = p.disparos.filter((s) => {
    if (s.y > L.ALTURA + 20 || s.x < -20 || s.x > L.LARGURA + 20) return false;
    if (Math.abs(s.x - p.jx) < 17 && Math.abs(s.y - L.Y_JOGADOR) < 22) {
      acertou = true;
      return false;
    }
    return true;
  });
  if (acertou) perderVida(p, 'disparo');

  // nave que encosta na nave do jogador: perde uma vida e a inimiga explode (sem pontos)
  for (const n of p.naves) {
    if (n.vivo && n.y > L.Y_JOGADOR - 44 && Math.abs(n.x - p.jx) < 32) {
      n.vivo = false;
      p.eventos.push({ tipo: 'explosao', x: n.x, y: n.y, nave: p.tipo });
      perderVida(p, 'colisao');
    }
  }
  if (p.estado !== 'jogando') return;

  // energia: se zerar, perde uma vida e a onda recomeça
  p.energia -= d;
  if (p.energia <= 0) {
    p.energia = 0;
    perderVida(p, 'energia');
    if (p.estado === 'jogando') comecarFase(p);
    return;
  }

  // onda limpa: a energia que sobrou vira bônus e vem a próxima
  if (p.naves.every((n) => !n.vivo)) {
    ganharPontos(p, L.bonusDeFase(p.fase, p.energia));
    p.eventos.push({ tipo: 'fase', x: L.LARGURA / 2, y: 300 });
    p.fase++;
    comecarFase(p);
  }
}

// Resultado final, para mandar ao servidor.
export function resultado(p) {
  return {
    pontos: p.pontos,
    fase: p.fase,
    naves: p.abates,
    tempoMs: Math.round(p.tempo * 1000),
  };
}
