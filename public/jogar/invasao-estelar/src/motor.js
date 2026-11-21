// Motor da partida: estado e atualização a cada passo. Não desenha nada (quem desenha é desenho.js).
// Repetível: com a mesma semente e as mesmas entradas (esquerda/direita a cada passo), a partida sai igual.
// Cada passo guarda também as posições de antes (jxAntes, xa, ya), só para o desenho ficar entre dois passos.
import * as L from './logica.js?v=11';
import { INIMIGOS, COMBO, NAVES_JOGADOR, CAPSULAS, ondaDaFase } from './dados.js?v=11';
import { novaNave, raioDaNave, vivosFrac, posicionarNaves, decidirAtaques, atualizarAtaques, soltarFilhotes } from './inimigos.js?v=11';
import { moverTiros, tiroNaNave } from './tiros.js?v=11';
import { talvezSoltarCapsula, soltarCapsula, sortearCapsula, moverCapsulas, aplicarCapsula, atualizarPoderes } from './capsulas.js?v=11';
import { comecarMeteoros, atualizarMeteoros } from './especiais.js?v=11';
import { criarChefe, atualizarChefe, laserNoChefe, danoNoChefe } from './chefes.js?v=11';

// `semente`: número do sorteio (sem ela, uma nova é sorteada). `rand`: troca o sorteio inteiro (usado nos testes).
// `modo`: 'normal' ou 'recruta' (mais calmo, sem ranking). `nave`: a do hangar (cada uma com um traço leve).
// `rotulo`: só para o painel (ex.: 'DESAFIO', 'TREINO').
// Esquadrão (Etapa 4): `pilotos` (2 a 4) deixa as ondas maiores; `idPiloto` é o número de quem roda as ondas na sala.
// Os colegas ficam em `p.aliados` (esquadrao.js). Com 1 piloto, nada disso muda a partida.
export function novaPartida({ semente, rand, modo = 'normal', nave = 'padrao', rotulo = '', pilotos = 1, idPiloto = 0 } = {}) {
  const s = semente ?? L.sementeAleatoria();
  const idNave = NAVES_JOGADOR[nave] ? nave : 'padrao';
  const p = {
    semente: s,
    rand: rand || L.criarSorteio(s),
    modo,
    rotulo,
    nave: idNave,
    traco: NAVES_JOGADOR[idNave],
    quadro: 0, // quantos passos a partida já andou
    entradas: [], // gravação: [passo, direção] sempre que a direção muda
    ultimaEntrada: 0,
    onda: null, // a descrição da onda atual (dados.js)
    fase: 1,
    pontos: 0,
    vidas: L.VIDAS_INICIAIS,
    abates: 0,
    tempo: 0,
    estado: 'jogando', // 'jogando' | 'fim'
    jx: L.LARGURA / 2,
    jxAntes: undefined, // posição da nave no passo anterior (só para o desenho)
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
    disparos: [], // tiros dos inimigos (tiros.js)
    capsulas: [],
    meteoros: [],
    proximoMeteoro: 0,
    presente: 0,
    chefe: null, // o chefão da onda (chefes.js), só nas ondas de chefão
    combo: { mult: 1, desde: COMBO.janela + 1 }, // `desde`: segundos desde o último inimigo derrubado
    // arma: 'duplo' | 'leque' | null (por armaT segundos); escudo aguenta 1 tiro; lento = câmera lenta; teia = nave lenta
    poderes: { arma: null, armaT: 0, escudo: false, lento: 0, teia: 0 },
    stats: {
      tiros: 0, // lasers disparados
      acertos: 0, // lasers que acertaram um inimigo
      porTipo: new Array(INIMIGOS.length).fill(0), // inimigos derrubados de cada tipo
      maiorCombo: 1,
      capsulas: 0,
      meteoros: 0, // meteoros que passaram sem acertar
      chefes: 0, // chefões derrotados
      chefesPorTipo: [0, 0, 0],
      chuvasSemDano: 0, // chuvas de meteoros inteiras sem ser atingido
      capsulasTipos: 0, // tipos de cápsula pegos (um bit por tipo)
      primeiraPerda: 0, // onda em que perdeu a 1ª nave (0 = não perdeu)
    },
    danoNaChuva: false,
    // o que aconteceu neste passo, para efeitos e sons (cada um com a posição do acontecimento)
    eventos: [],
    // esquadrão (Etapa 4)
    pilotos,
    idPiloto,
    aliados: [], // colegas: { id, x, vidas, caido, tiros, ... } (esquadrao.js)
    caido: false, // perdeu todas as naves e espera um colega passar pela cápsula de resgate
    resgates: [], // cápsulas de resgate no chão: { id do piloto, x }
    porPiloto: pilotos > 1 ? {} : null, // pontos de cada piloto (os inimigos que cada um derrubou)
    quem: idPiloto, // quem atirou o laser que está sendo conferido agora
  };
  if (p.traco.escudo) p.poderes.escudo = true; // a Guardiã começa com escudo
  comecarFase(p);
  return p;
}

// `mudancas`: troca números da descrição da onda (usado nos testes para montar uma situação).
function comecarFase(p, mudancas = null) {
  const o = { ...ondaDaFase(p.fase, p.modo), ...mudancas };
  if (mudancas && mudancas.tipo !== undefined && mudancas.vel === undefined) o.vel = o.acel * INIMIGOS[o.tipo].rapidez;
  if (p.pilotos > 1) {
    // esquadrão: mais inimigos (e mais tiros na tela) para cada piloto a mais
    o.naves = Math.min(16, Math.round(o.naves * (1 + 0.25 * (p.pilotos - 1))));
    o.maxDisparos = Math.round(o.maxDisparos * (1 + 0.2 * (p.pilotos - 1)));
  }
  p.onda = o;
  p.tipo = o.tipo;
  p.padrao = o.padrao;
  p.vel = o.vel;
  p.naves = [];
  for (let i = 0; i < o.naves; i++) {
    const col = i % 4;
    const linha = Math.floor(i / 4);
    p.naves.push(novaNave(i, o.naves, 75 + col * 70, 108 + linha * 46, o.tipo));
  }
  p.descida = 0;
  p.tempoFase = 0;
  p.tm = 0;
  p.abertura = L.ABERTURA_SEG;
  p.energiaMax = o.energia;
  p.energia = p.energiaMax;
  p.tiros = [];
  p.disparos = [];
  p.meteoros = [];
  p.chefe = null;
  p.danoNaChuva = false;
  if (o.especie === 'meteoros') comecarMeteoros(p);
  if (o.especie === 'chefe') criarChefe(p);
  posicionarNaves(p, 0);
}

// Recomeça a onda atual trocando números da descrição dela (testes e treinos).
export function comecarOndaCom(p, mudancas) {
  comecarFase(p, mudancas);
}

// Posições antes do passo: o desenho fica entre elas e as novas. Não muda nada no jogo.
function guardarPosicoes(p) {
  p.jxAntes = p.jx;
  for (const lista of [p.naves, p.tiros, p.disparos, p.capsulas, p.meteoros]) {
    for (const o of lista) {
      o.xa = o.x;
      o.ya = o.y;
    }
  }
  for (const a of p.aliados) {
    a.xa = a.x;
    for (const t of a.tiros) {
      t.xa = t.x;
      t.ya = t.y;
    }
  }
}

// `doPiloto`: pontos de um inimigo derrubado (no esquadrão, contam também para quem atirou, `p.quem`).
function ganharPontos(p, quantidade, doPiloto = false) {
  const antes = p.pontos;
  p.pontos += quantidade;
  const extras = L.vidasGanhas(antes, p.pontos);
  if (extras > 0) {
    if (!p.caido) p.vidas = Math.min(L.VIDAS_MAX, p.vidas + extras);
    p.eventos.push({ tipo: 'vida', x: p.jx, y: L.Y_JOGADOR });
    for (const a of p.aliados) if (!a.caido) a.avisos.push([AVISO.vida, extras]); // no esquadrão, nave extra para todos
  }
  if (doPiloto && p.porPiloto) p.porPiloto[p.quem] = (p.porPiloto[p.quem] || 0) + quantidade;
}

// Esquadrão (Etapa 4): o que o celular de quem roda as ondas manda para cada colega (esquadrao.js).
export const AVISO = { capsula: 1, energia: 2, resgate: 3, vida: 4 };

function zerarCombo(p) {
  p.combo.mult = 1;
  p.combo.desde = COMBO.janela + 1;
}

// Derrubou um inimigo com laser: combo, pontos, filhotes do parasita e, às vezes, uma cápsula.
function abater(p, nave) {
  nave.vivo = false;
  nave.ataque = null;
  p.abates++;
  p.stats.porTipo[nave.tipo]++;
  const c = p.combo;
  c.mult = c.desde <= COMBO.janela ? Math.min(COMBO.maximo, c.mult + 1) : 1;
  c.desde = 0;
  p.stats.maiorCombo = Math.max(p.stats.maiorCombo, c.mult);
  const pontos = L.pontosPorNave(p.fase) * c.mult * p.onda.pontosMult;
  ganharPontos(p, pontos, true);
  const grande = INIMIGOS[nave.tipo].vida > 1;
  p.eventos.push({ tipo: 'explosao', x: nave.x, y: nave.y, nave: nave.tipo, pontos, mult: c.mult, grande, filhote: nave.filhote });
  if (INIMIGOS[nave.tipo].especial === 'filhotes' && !nave.filhote) soltarFilhotes(p, nave);
  talvezSoltarCapsula(p, nave.x, nave.y);
}

// Um laser acertou: tira 1 de vida. O 1º tiro quebra o escudo da lâmina e deixa o devorador furioso.
function acertar(p, nave) {
  nave.vida -= 1;
  nave.flash = 0.09;
  if (nave.vida > 0) {
    let tipo = 'dano';
    if (nave.escudo) {
      nave.escudo = false;
      tipo = 'escudo_quebrou';
    } else if (INIMIGOS[nave.tipo].especial === 'furia' && !nave.furia) {
      nave.furia = true;
      tipo = 'furia';
    }
    p.eventos.push({ tipo, x: nave.x, y: nave.y, nave: nave.tipo });
    return;
  }
  abater(p, nave);
}

// Perde uma vida. Depois de um acerto, fica um tempo invulnerável (não vale para a energia zerada).
// O escudo da cápsula aguenta um acerto no lugar da vida.
export function perderVida(p, motivo) {
  if (p.estado !== 'jogando' || p.caido) return;
  if (motivo !== 'energia' && p.invulneravel > 0) return;
  if (motivo !== 'energia' && p.poderes.escudo) {
    p.poderes.escudo = false;
    p.invulneravel = 0.8;
    p.eventos.push({ tipo: 'escudo_gasto', x: p.jx, y: L.Y_JOGADOR });
    return;
  }
  zerarCombo(p); // levar um tiro zera o combo
  if (!p.stats.primeiraPerda) p.stats.primeiraPerda = p.fase;
  p.danoNaChuva = true;
  p.vidas--;
  p.invulneravel = 1.6;
  p.eventos.push({ tipo: 'perdeu', x: p.jx, y: L.Y_JOGADOR, motivo });
  if (p.vidas <= 0) {
    p.vidas = 0;
    if (p.pilotos > 1) {
      // esquadrão: a nave cai e deixa uma cápsula de resgate; a partida só acaba quando todos caírem
      p.caido = true;
      p.tiros = [];
      p.resgates.push({ id: p.idPiloto, x: p.jx });
      p.eventos.push({ tipo: 'caiu', x: p.jx, y: L.Y_JOGADOR, piloto: p.idPiloto });
      return;
    }
    p.estado = 'fim';
    p.eventos.push({ tipo: 'fim', x: p.jx, y: L.Y_JOGADOR });
  }
}

// Esquadrão: um colega caiu (perdeu todas as naves): fica a cápsula de resgate dele no chão.
export function colegaCaiu(p, a) {
  if (a.caido) return;
  a.caido = true;
  a.vidas = 0;
  a.tiros = [];
  p.resgates = p.resgates.filter((r) => r.id !== a.id);
  p.resgates.push({ id: a.id, x: a.x });
  p.eventos.push({ tipo: 'caiu', x: a.x, y: L.Y_JOGADOR, piloto: a.id });
}

// Esquadrão: quem está de pé e passa por cima de uma cápsula de resgate traz o colega de volta (com 1 nave).
// A partida acaba quando todos caíram ao mesmo tempo.
function esquadrao(p) {
  const vivos = [];
  if (!p.caido) vivos.push(p.jx);
  for (const a of p.aliados) if (!a.caido) vivos.push(a.x);
  p.resgates = p.resgates.filter((r) => {
    if (!vivos.some((x) => Math.abs(x - r.x) < 26)) return true;
    if (r.id === p.idPiloto) {
      p.caido = false;
      p.vidas = 1;
      p.invulneravel = 2;
    } else {
      const a = p.aliados.find((x) => x.id === r.id);
      if (!a) return false;
      a.caido = false;
      a.vidas = 1;
      a.resgateAte = p.tempo + 2; // o celular dele ainda vai dizer "caído" por um instante
      a.avisos.push([AVISO.resgate, 1]);
    }
    p.eventos.push({ tipo: 'resgate', x: r.x, y: L.Y_JOGADOR, piloto: r.id });
    return false;
  });
  // alvo dos inimigos: uma nave de pé por vez, trocando a cada 4 s
  const naves = [];
  if (!p.caido) naves.push(p.jx);
  for (const a of p.aliados) if (!a.caido) naves.push(a.x);
  p.alvo = naves.length ? naves[Math.floor(p.tempo / 4) % naves.length] : p.jx;
  if (p.caido && p.aliados.every((a) => a.caido)) {
    p.estado = 'fim';
    p.eventos.push({ tipo: 'fim', x: p.jx, y: L.Y_JOGADOR });
  }
}

function proximaFase(p, comBonusDeEnergia) {
  if (comBonusDeEnergia) ganharPontos(p, L.bonusDeFase(p.fase, p.energia));
  if (p.onda.especie === 'meteoros' && !p.danoNaChuva) p.stats.chuvasSemDano++;
  p.eventos.push({ tipo: 'fase', x: L.LARGURA / 2, y: 300, especie: p.onda.especie });
  p.fase++;
  comecarFase(p);
  // começo de uma volta nova: salto no hiperespaço (só desenho e som)
  if (p.onda.posicao === 1) p.eventos.push({ tipo: 'salto', x: L.LARGURA / 2, y: 300 });
}

/* ---------- lasers do jogador ---------- */

// Tiro automático: uma rajada por vez (1 laser; 2 com o tiro duplo; 3 abertos com o leque).
function dispararLasers(p, d) {
  p.cooldown -= d;
  if (p.caido || p.tiros.length > 0 || p.cooldown > 0) return;
  const y = L.Y_JOGADOR - 26;
  const arma = p.poderes.arma;
  const rajada = arma === 'duplo' ? [[-7, 0], [7, 0]] : arma === 'leque' ? [[-4, -L.VEL_LEQUE], [0, 0], [4, L.VEL_LEQUE]] : [[0, 0]];
  for (const [dx, vx] of rajada) p.tiros.push({ x: p.jx + dx, y, xa: p.jx + dx, ya: y, vx });
  p.stats.tiros += rajada.length;
  p.cooldown = p.traco.cadencia || 0.14;
  p.eventos.push({ tipo: 'tiro', x: p.jx, y, arma });
}

function moverLasers(p, d) {
  p.quem = p.idPiloto;
  const vel = L.VEL_TIRO * (p.traco.velTiro || 1);
  p.tiros = p.tiros.filter((t) => laserAnda(p, t, d, vel));
  // esquadrão: os lasers dos colegas (cada celular atira e manda; aqui se confere quem acertou o quê)
  for (const a of p.aliados) {
    p.quem = a.id;
    a.tiros = a.tiros.filter((t) => {
      if (laserAnda(p, t, d, a.velTiro)) return true;
      if (t.acertou) a.gastos.push(t.id);
      return false;
    });
  }
  p.quem = p.idPiloto;
}

// Anda um laser. Devolve false quando ele some (saiu da tela ou acertou algo; `t.acertou` diz se acertou).
function laserAnda(p, t, d, vel) {
  const yAntes = t.y;
  t.y -= vel * d;
  t.x += (t.vx || 0) * d;
  if (t.y < -20 || t.x < -20 || t.x > L.LARGURA + 20) return false;
  // chefão: acerta uma parte, ou bate no casco, no escudo do núcleo ou no olho fechado
  const noChefe = p.chefe ? laserNoChefe(p.chefe, t.x, t.y, yAntes) : null;
  if (noChefe) {
    p.stats.acertos++;
    if (noChefe.absorvido) {
      p.eventos.push({ tipo: 'casco', x: t.x, y: t.y });
    } else {
      const r = danoNoChefe(p, noChefe.parte);
      if (r.pontos) ganharPontos(p, r.pontos, true);
      if (r.derrotado) {
        p.stats.chefes++;
        p.stats.chefesPorTipo[p.chefe.indice]++;
      }
      p.eventos.push({ tipo: r.derrotado ? 'chefe_caiu' : r.parteCaiu ? 'parte' : 'dano_chefe', x: t.x, y: t.y, pontos: r.pontos });
    }
    t.acertou = true;
    return false;
  }
  // confere o trecho percorrido neste passo (o laser é rápido e poderia "pular" uma nave); acerta a mais baixa
  let alvo = null;
  for (const n of p.naves) {
    if (!n.vivo) continue;
    const r = raioDaNave(n);
    if (Math.abs(n.x - t.x) < r + 3 && n.y > t.y - r && n.y < yAntes + r && (!alvo || n.y > alvo.y)) alvo = n;
  }
  if (!alvo) return true;
  p.stats.acertos++;
  acertar(p, alvo);
  t.acertou = true;
  return false;
}

/* ---------- esquadrão (Etapa 4) ---------- */

// As naves dos colegas vão até a última posição que cada celular mandou (sem pular), e os lasers deles andam aqui.
function moverColegas(p, d) {
  for (const a of p.aliados) {
    if (a.caido) continue;
    const passo = L.VEL_MAX_JOGADOR * 1.6 * d;
    a.x += L.clamp(a.alvoX - a.x, -passo, passo);
    a.invulneravel = Math.max(0, a.invulneravel - d);
  }
}

/* ---------- passo ---------- */

// Avança a partida em `dt` segundos (no jogo, sempre L.PASSO). `dirEntrada` é -1 (esquerda), 0 (parado) ou 1 (direita).
export function atualizar(p, dt, dirEntrada) {
  if (p.estado !== 'jogando') return;
  const d = Math.min(Math.max(dt, 0), 0.05);
  guardarPosicoes(p);
  p.tempo += d;
  p.quadro++;
  if (dirEntrada !== p.ultimaEntrada) {
    p.entradas.push([p.quadro, dirEntrada]);
    p.ultimaEntrada = dirEntrada;
  }

  // a nave acelera e freia (com teia, fica lenta); caída (esquadrão), fica parada esperando o resgate
  const pod = p.poderes;
  const velMax = L.VEL_MAX_JOGADOR * (pod.teia > 0 ? L.LENTO_TEIA : 1) * (p.traco.vel || 1);
  const alvoVx = p.caido ? 0 : dirEntrada * velMax;
  const passo = L.ACEL_JOGADOR * d;
  p.vx += L.clamp(alvoVx - p.vx, -passo, passo);
  p.jx += p.vx * d;
  if (p.jx < L.MARGEM_JOGADOR) { p.jx = L.MARGEM_JOGADOR; p.vx = Math.max(0, p.vx); }
  if (p.jx > L.LARGURA - L.MARGEM_JOGADOR) { p.jx = L.LARGURA - L.MARGEM_JOGADOR; p.vx = Math.min(0, p.vx); }
  p.invulneravel = Math.max(0, p.invulneravel - d);
  atualizarPoderes(p, d);
  p.combo.desde += d;
  if (p.combo.desde > COMBO.janela) p.combo.mult = 1;

  // inimigos e tiros deles andam a meia velocidade na câmera lenta
  const de = pod.lento > 0 ? d * L.CAMERA_LENTA : d;
  if (p.pilotos > 1) {
    moverColegas(p, d);
    esquadrao(p);
    if (p.estado !== 'jogando') return;
  }
  p.tempoFase += de;
  const frac = vivosFrac(p);
  p.tm += de * L.rapidezDoGrupo(frac);
  p.descida = L.avancarDescida(p.descida, de, p.padrao, frac);
  posicionarNaves(p, de);
  const raioDoChefe = atualizarChefe(p, de); // o chefão entra voando durante a abertura

  for (const c of moverCapsulas(p, d)) {
    if (!c.quem) aplicarCapsula(p, c);
    else if (c.tipo === 'duplo' || c.tipo === 'leque' || c.tipo === 'escudo') {
      // esquadrão: a arma e o escudo são de quem pegou (o celular dele aplica); o resto vale para todos
      c.quem.avisos.push([AVISO.capsula, CAPSULAS.findIndex((x) => x.id === c.tipo)]);
      p.eventos.push({ tipo: 'capsula', x: c.x, y: L.Y_JOGADOR - 30, capsula: c.tipo });
    } else aplicarCapsula(p, c);
  }

  if (p.abertura > 0) {
    p.abertura = Math.max(0, p.abertura - d);
    return; // ninguém atira nem colide durante a entrada
  }

  if (p.onda.especie === 'meteoros') {
    atualizarChuva(p, d, de);
    return;
  }

  dispararLasers(p, d);
  moverLasers(p, d);

  // ataques dos inimigos (na onda bônus eles não atiram)
  if (p.onda.atira) decidirAtaques(p, de);
  const raio = atualizarAtaques(p, de);
  moverTiros(p, de);
  let acertou = !p.caido && (raio || raioDoChefe);
  p.disparos = p.disparos.filter((s) => {
    if (p.caido || !tiroNaNave(s, p.jx)) return true;
    if (s.tipo === 'teia') {
      // a teia não tira vida: deixa a nave lenta por um tempo
      if (p.invulneravel <= 0) {
        pod.teia = L.TEIA_SEG;
        p.eventos.push({ tipo: 'teia', x: p.jx, y: L.Y_JOGADOR });
      }
      return false;
    }
    acertou = true;
    return false;
  });
  if (acertou) perderVida(p, !p.caido && (raio || raioDoChefe) ? 'raio' : 'disparo');

  // nave que encosta na nave do jogador: perde uma vida e a inimiga explode (sem pontos)
  for (const n of p.naves) {
    if (!p.caido && n.vivo && n.y > L.Y_JOGADOR - 44 && Math.abs(n.x - p.jx) < 32) {
      n.vivo = false;
      n.ataque = null;
      p.eventos.push({ tipo: 'explosao', x: n.x, y: n.y, nave: n.tipo, pontos: 0, mult: 1 });
      perderVida(p, 'colisao');
    }
  }
  if (p.estado !== 'jogando') return;

  // chefão derrotado: depois das explosões, a energia que sobrou vira bônus e vem a próxima volta
  if (p.chefe && !p.chefe.vivo) {
    if (p.chefe.morrendo <= 0) proximaFase(p, true);
    return;
  }

  // energia: se zerar, perde uma vida e a onda recomeça (na onda bônus, as naves só fogem; no chefão, a luta continua)
  p.energia -= p.onda.especie === 'bonus' ? d : d * (p.traco.energia || 1); // a Cometa gasta menos energia
  if (p.energia <= 0) {
    p.energia = 0;
    if (p.onda.especie === 'bonus') {
      p.eventos.push({ tipo: 'fugiram', x: L.LARGURA / 2, y: 300 });
      proximaFase(p, false);
      return;
    }
    perderVida(p, 'energia');
    for (const a of p.aliados) if (!a.caido) a.avisos.push([AVISO.energia, 1]); // esquadrão: todos perdem uma nave
    if (p.estado !== 'jogando') return;
    if (p.chefe) p.energia = p.energiaMax;
    else comecarFase(p);
    return;
  }

  // onda limpa: a energia que sobrou vira bônus e vem a próxima
  if (!p.chefe && p.naves.every((n) => !n.vivo)) proximaFase(p, true);
}

// Chuva de meteoros: só desviar. A barra mostra o tempo que falta; a nave não atira.
function atualizarChuva(p, d, de) {
  const r = atualizarMeteoros(p, de);
  if (r.passaram) {
    ganharPontos(p, r.passaram * L.pontosMeteoro(p.fase));
    p.stats.meteoros += r.passaram;
  }
  if (r.atingiu) {
    p.danoNaChuva = true; // mesmo se o escudo segurar, foi atingido
    perderVida(p, 'meteoro');
  }
  if (p.estado !== 'jogando') return;
  if (p.presente > 0) {
    p.presente -= de;
    // presente no meio da chuva: uma cápsula (nunca energia, que aumentaria a chuva)
    if (p.presente <= 0) soltarCapsula(p, 40 + p.rand() * (L.LARGURA - 80), 90, sortearCapsula(p, true));
  }
  p.energia = Math.max(0, p.energia - d);
  if (p.energia <= 0 && p.meteoros.length === 0) proximaFase(p, false);
}

// Anda a partida pelo tempo real `dt` (segundos) em passos fixos de L.PASSO. O que sobra fica em `relogio.sobra`
// para o próximo quadro. Devolve quanto do próximo passo já passou (de 0 a 1): o desenho usa isso para ficar entre
// o passo anterior e o atual (L.entre), e o movimento sai liso em qualquer tela.
export function avancar(p, relogio, dt, dir) {
  relogio.sobra += dt;
  let passos = 0;
  while (relogio.sobra >= L.PASSO && passos < L.PASSOS_POR_QUADRO_MAX) {
    atualizar(p, L.PASSO, dir);
    relogio.sobra -= L.PASSO;
    passos++;
  }
  if (passos >= L.PASSOS_POR_QUADRO_MAX) relogio.sobra = 0; // celular muito atrasado: não tenta recuperar tudo de uma vez
  return L.clamp(relogio.sobra / L.PASSO, 0, 1);
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

// Números da partida: para a tela de resultado e, com conta, para o servidor (missões, medalhas, patente).
// Só números; o servidor confere se batem com o resultado (progresso.js, conferirEstatisticas).
export function estatisticas(p) {
  const s = p.stats;
  return {
    modo: p.modo,
    nave: p.nave,
    maiorCombo: s.maiorCombo,
    precisao: s.tiros ? Math.round((100 * s.acertos) / s.tiros) : 0,
    tiros: s.tiros,
    acertos: s.acertos,
    porTipo: s.porTipo.slice(),
    capsulas: s.capsulas,
    capsulasTipos: s.capsulasTipos,
    meteoros: s.meteoros,
    chuvasSemDano: s.chuvasSemDano,
    chefes: s.chefes,
    chefesPorTipo: s.chefesPorTipo.slice(),
    primeiraPerda: s.primeiraPerda,
  };
}

// Repete uma partida a partir da semente e das entradas gravadas, passo a passo (L.PASSO).
// Para depois de `quadros` passos ou quando a partida acaba. Serve para testes e, no futuro, para conferir partidas.
export function repetirPartida({ semente, entradas, quadros, modo = 'normal', nave = 'padrao' }) {
  const p = novaPartida({ semente, modo, nave });
  let i = 0;
  let dir = 0;
  while (p.estado === 'jogando' && p.quadro < quadros) {
    const proximo = p.quadro + 1;
    while (i < entradas.length && entradas[i][0] === proximo) {
      dir = entradas[i][1];
      i++;
    }
    atualizar(p, L.PASSO, dir);
    p.eventos.length = 0;
  }
  return p;
}
