// Física da bola (só visual; o resultado de cada lance já foi decidido pelas regras).
// A bola rola com atrito, é conduzida com toques, sobe e quica (chapéu), passa entre as pernas
// (caneta), é tocada na diagonal (drible lateral), e no chute bate na rede, na trave ou nas placas.
//
// Coordenadas: x = deslocamento lateral em relação ao centro do campo (como jogo.jogDX);
// f = quanto a bola está À FRENTE do centro do jogador (como CAMPO.bolaAFrente); z = altura.
// Velocidades em unidades/s no referencial do CAMPO (vf > 0 = rumo ao gol). Sem DOM.
import { CONFIG } from './config.js';
import { CAMPO } from './jogo.js';

export const FISICA = {
  atrito: 1.9, // arrasto no chão (1/s): v -> v·e^(−atrito·t)
  gravidade: 900, // un/s²
  quique: 0.42, // quanto a bola devolve de velocidade vertical ao bater no chão
  alcance: 34, // a bola é tocada de novo quando volta até esta distância à frente do jogador
  raio: 7,
  tempoChute: 0.45, // segundos do chute até o gol (igual à animação das regras)
};

const MEIO_GOL = (CAMPO.traveDir - CAMPO.traveEsq) / 2;

export function criarBola() {
  const b = {
    x: 0,
    f: CAMPO.bolaAFrente,
    z: 0,
    vx: 0,
    vf: 0,
    vz: 0,
    giro: 0,
    dono: 'jogador', // 'jogador' | 'alvo' (desarmada) | 'presa' (nas luvas) | 'livre' (chutada)
    espera: 0, // tempo sem toque automático de condução
    balistico: 0, // tempo de voo calculado do chute (sem atrito)
    agenda: [],
    ult: { anim: null, tackle: false, chute: null, pts: null, dono: null },
  };

  function reiniciar(jogX) {
    Object.assign(b, { x: jogX, f: CAMPO.bolaAFrente, z: 0, vx: 0, vf: 0, vz: 0, dono: 'jogador', espera: 0, balistico: 0, agenda: [] });
  }

  function alvoDoDuelo(jogo) {
    if (!jogo.duelo) return null;
    return { x: jogo.baseDXAlvo() + jogo.alvoDX, f: jogo.alvoDist() };
  }

  // Toque rasteiro que leva a bola até destX (lateral) e a empurra `frente` un/s além do jogador.
  function tocar(destX, frente, vP) {
    b.vx = (destX - b.x) * FISICA.atrito;
    b.vf = vP + frente;
    b.vz = 0;
    b.z = 0;
  }

  function driblar(jogo, vP) {
    const a = jogo.anim;
    const mv = CONFIG.movimento;
    const alvo = alvoDoDuelo(jogo) || { x: 0, f: b.f + 80 };
    const lado = a.lado || 1;
    b.agenda = [];
    b.balistico = 0;
    b.dono = 'jogador';
    const destLado = lado * (a.sucesso ? mv.ladoDist + mv.bolaAdiante : mv.falhaDist + 10);
    switch (a.drible) {
      case 'DIREITA':
      case 'ESQUERDA':
        tocar(destLado, 70, vP);
        b.espera = 0.6;
        return true;
      case 'ELASTICO_DIR':
      case 'ELASTICO_ESQ':
        // puxa para um lado e, logo em seguida, joga para o outro
        tocar(b.x - lado * 22, 40, vP);
        b.espera = 0.9;
        b.agenda.push({ t: 0.13, fn: (ev) => { tocar(destLado, 70, vP); ev.push('toque'); } });
        return true;
      case 'CANETA': {
        // rasteira, mirando o meio das pernas do defensor; no acerto passa e segue
        const mundo = Math.max(10, alvo.f - b.f);
        const sobra = a.sucesso ? 70 : 0;
        b.vf = Math.max(vP + 60, (mundo + sobra) * FISICA.atrito);
        const tChegada = sobra > 0 ? Math.log((mundo + sobra) / sobra) / FISICA.atrito : 0.5;
        b.vx = ((alvo.x - b.x) * FISICA.atrito) / (1 - Math.exp(-FISICA.atrito * tChegada));
        b.vz = 0;
        b.z = 0;
        b.espera = 1.2;
        return true;
      }
      case 'CHAPEU': {
        // por cima: chega ao ponto mais alto bem em cima do defensor
        const vz0 = a.sucesso ? 380 : 230;
        const T = (2 * vz0) / FISICA.gravidade;
        const mundo = Math.max(10, alvo.f - b.f);
        b.vz = vz0;
        b.z = 0.1;
        // mais rápida que o jogador e ainda alta ao passar sobre o defensor (a 40% do voo)
        b.vf = Math.min(620, Math.max(vP + 90, mundo / (0.4 * T)));
        b.vx = (jogo.jogDX - b.x) / T;
        b.espera = 1.2;
        return true;
      }
      default:
        return false;
    }
  }

  function chutar(jogo) {
    const c = jogo.chute;
    const g = jogo.goleiro;
    const linha = jogo.distGol;
    let dx;
    let df;
    if (c.resultado === 'DEFESA') {
      dx = g.mergulhoAlvo;
      df = linha - g.avanco - 6;
    } else if (c.resultado === 'GOL') {
      dx = c.alvoX - CONFIG.mundo.xCentro;
      df = linha + 9;
    } else if (c.resultado === 'FORA') {
      dx = c.alvoX - CONFIG.mundo.xCentro + (c.p < 0.5 ? -10 : 10);
      df = linha + 30;
    } else {
      dx = c.alvoX - CONFIG.mundo.xCentro;
      df = linha + 1;
    }
    const T = FISICA.tempoChute;
    b.vx = (dx - b.x) / T;
    b.vf = (df - b.f) / T; // o jogador está parado durante o chute
    b.vz = (FISICA.gravidade * T) / 2;
    b.z = 0.01;
    b.balistico = T;
    b.dono = 'livre';
    b.espera = 99;
    b.agenda = [{ t: T, fn: (ev) => chegada(c.resultado, dx, ev) }];
  }

  function chegada(resultado, dx, ev) {
    b.balistico = 0;
    if (resultado === 'GOL') {
      b.vf = 170;
      b.vx *= 0.3;
      b.vz = 90;
    } else if (resultado === 'DEFESA') {
      b.dono = 'presa';
      b.vx = 0;
      b.vf = 0;
      b.vz = 0;
      b.z = 9;
      ev.push('defesa');
    } else if (resultado === 'TRAVE') {
      b.vf = -160;
      b.vx = (dx < 0 ? -1 : 1) * 90;
      b.vz = 170;
      ev.push('trave');
    } else {
      b.vf *= 0.8;
    }
  }

  // Avança a física. `vP`: velocidade do jogador (un/s); `jogX`: posição lateral dele.
  // Retorna eventos para efeitos visuais: 'toque', 'conducao', 'quique', 'rede', 'trave', 'defesa', 'chute'.
  function atualizar(dt, jogo, { vP, jogX }) {
    const ev = [];
    if (jogo.pts !== b.ult.pts) {
      reiniciar(jogX);
      b.ult.pts = jogo.pts;
      b.ult.anim = jogo.anim;
      b.ult.chute = jogo.chute;
    }
    if (jogo.bolaDono === 'jogador' && b.ult.dono === 'alvo') reiniciar(jogX);
    b.ult.dono = jogo.bolaDono;

    if (jogo.anim && jogo.anim !== b.ult.anim && driblar(jogo, vP)) ev.push('toque');
    b.ult.anim = jogo.anim;
    if (jogo.tackle && !b.ult.tackle) {
      b.dono = 'alvo';
      b.tAlvo = 0;
      const alvo0 = alvoDoDuelo(jogo);
      b.ladoBloqueio = alvo0 ? Math.sign(b.x - alvo0.x) || 1 : 1;
    }
    b.ult.tackle = !!jogo.tackle;
    if (jogo.chute && jogo.chute !== b.ult.chute) {
      chutar(jogo);
      ev.push('chute');
    }
    b.ult.chute = jogo.chute;

    if (b.agenda.length) {
      for (const a of b.agenda) a.t -= dt;
      const prontas = b.agenda.filter((a) => a.t <= 0);
      b.agenda = b.agenda.filter((a) => a.t > 0);
      for (const a of prontas) a.fn(ev);
    }

    if (b.dono === 'alvo') {
      // o adversário dominou: a bola vai para os pés dele e fica ali
      const alvo = alvoDoDuelo(jogo);
      b.tAlvo += dt;
      if (alvo) {
        // primeiro a bola bate no pé esticado; depois ele a puxa para baixo do corpo
        const pe = 20 * (1 - Math.min(1, Math.max(0, (b.tAlvo - 0.45) / 0.3)));
        const k = 1 - Math.exp(-dt * 16);
        b.x += (alvo.x + b.ladoBloqueio * pe - b.x) * k;
        b.f += (alvo.f - 6 - b.f) * k;
        b.z *= 1 - k;
      }
      b.vx = 0;
      b.vf = 0;
      b.vz = 0;
      return ev;
    }
    if (b.dono === 'presa') return ev;

    // condução: quando a bola volta para perto, o jogador dá mais um toque
    b.espera = Math.max(0, b.espera - dt);
    if (b.dono === 'jogador' && vP > 5 && b.espera <= 0 && b.z < 1 && b.f <= FISICA.alcance && b.vf - vP <= 0) {
      // toque curto: a bola fica perto do pé (toques longos fazem ela ir e voltar na tela)
      tocar(jogX, vP * 0.5 + 15, vP);
      b.vx *= 1.1;
      b.espera = 0.25;
      ev.push('conducao');
    }

    // no ar: gravidade e quique
    if (b.z > 0 || b.vz > 0) {
      b.vz -= FISICA.gravidade * dt;
      b.z += b.vz * dt;
      if (b.z <= 0) {
        b.z = 0;
        if (b.vz < -70) {
          b.vz = -b.vz * FISICA.quique;
          b.vx *= 0.8;
          b.vf *= 0.8;
          ev.push('quique');
        } else {
          b.vz = 0;
        }
      }
    }
    // no chão: atrito (o chute calculado voa sem atrito até chegar)
    if (b.balistico > 0) b.balistico -= dt;
    else if (b.z <= 0.01) {
      const k = Math.exp(-FISICA.atrito * dt);
      b.vx *= k;
      b.vf *= k;
    }
    b.x += b.vx * dt;
    b.f += (b.vf - vP) * dt;

    // laterais do campo
    if (Math.abs(b.x) > 150) {
      b.x = Math.sign(b.x) * 150;
      b.vx = -b.vx * 0.4;
    }
    // rede e placas atrás do gol
    if (jogo.distGol !== null && b.f > jogo.distGol) {
      const linha = jogo.distGol;
      const dentro = Math.abs(b.x) < MEIO_GOL - 2;
      if (dentro && b.f > linha + CAMPO.profRede - 4) {
        b.f = linha + CAMPO.profRede - 4;
        if (b.vf > 0) ev.push('rede');
        b.vf = 0;
        b.vx *= 0.5;
        b.balistico = 0;
      } else if (!dentro && b.f > linha + 40) {
        b.f = linha + 40;
        b.vf = -Math.abs(b.vf) * 0.3;
        b.balistico = 0;
      }
    }
    b.giro += (Math.hypot(b.vx, b.vf) / FISICA.raio) * dt * 0.35;
    return ev;
  }

  return { estado: b, atualizar, reiniciar };
}
