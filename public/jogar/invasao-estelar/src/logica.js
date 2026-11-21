// Regras do jogo, sem tela nem canvas. Testadas com `node --test`.
// Os números que contam pontos estão também no servidor (servidor/functions/_lib/invasao-estelar.js).
// Se mudar um número aqui, mude lá também. A dificuldade (naves, velocidade, energia, tiros) fica em dados.js.
import { DIFICULDADE, INIMIGOS, ondaDaFase } from './dados.js?v=6';

export const PASSO = 1 / 60; // o jogo anda sempre em passos iguais de 1/60 s: a mesma semente dá a mesma partida
export const LARGURA = 360;
export const ALTURA = 640;
export const Y_JOGADOR = 580;
export const MARGEM_JOGADOR = 28;
export const VEL_MAX_JOGADOR = 290; // px/s
export const ACEL_JOGADOR = 2400; // px/s²: a nave acelera e freia, não muda de velocidade de uma vez
export const VEL_TIRO = 640; // px/s, subindo
export const RAIO_NAVE = 20;
export const PONTOS_NAVE_BASE = 20;
export const MULT_MAX = 10; // a pontuação por nave para de subir na onda 10
export const NAVES_MAX_FASE = DIFICULDADE.navesNoMaximo;
export const NAVES_MIN_FASE = DIFICULDADE.navesNoComeco;
export const VIDAS_INICIAIS = 3;
export const VIDA_EXTRA_CADA = 30000; // nave extra: bem rara, para o jogo ser difícil
export const VIDAS_MAX = 6;
export const ENERGIA_MAX_SEG = 60; // teto da energia de uma onda: o servidor usa este número para conferir o bônus
export const ENERGIA_MIN_SEG = DIFICULDADE.energiaMinima;
export const BONUS_POR_SEG = 10; // pontos por segundo de energia sobrando, vezes a onda
export const ABERTURA_SEG = 2.4; // as naves entram voando e a faixa da onda aparece
export const ATRASO_ENTRADA = 0.09; // segundos entre uma nave e a próxima na entrada
export const DURACAO_ENTRADA = 1.25;
export const DESCIDA_MAX = 110; // px: quanto o grupo desce no máximo
export const PADROES_NA_VOLTA = DIFICULDADE.ondasPorVolta;
// Área do botão de pausa no painel (coordenadas do jogo): x, y, largura, altura
export const AREA_PAUSA = { x: 312, y: 46, w: 48, h: 26 };
export const PAUSA_MERGULHO = 5; // segundos (do grupo) até o primeiro mergulho; a abertura da onda já gasta 2,4
export const NUM_TIPOS = INIMIGOS.length; // tipos de inimigo (um por onda, em ciclo)
export const NUM_CENARIOS = 4; // cenários de guerra do fundo
export const ONDAS_POR_CENARIO = 2; // o cenário troca a cada 2 ondas

export const PASSOS_POR_QUADRO_MAX = 8; // celular muito atrasado: o jogo não tenta recuperar mais que isso de uma vez
export const SALTO_DESENHO = 60; // px: acima disso, de um passo para o outro, a nave deu a volta na tela

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const suave = (k) => 1 - (1 - k) ** 3; // desacelera no fim

// Sorteio com semente (mulberry32): a mesma semente sempre dá a mesma sequência de números entre 0 e 1.
export function criarSorteio(semente) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function sementeAleatoria() {
  return Math.floor(Math.random() * 4294967296) >>> 0;
}

export function pontosPorNave(fase) {
  return PONTOS_NAVE_BASE * Math.min(fase, MULT_MAX);
}

// O desenho fica entre a posição do passo anterior (`antes`) e a do passo atual, com `alfa` de 0 a 1.
// Assim o movimento sai liso em telas de 60, 90 ou 120 quadros por segundo, mesmo com o jogo andando em passos fixos.
// Sem posição anterior (algo que acabou de aparecer) ou num salto grande (nave dando a volta), vale a posição atual.
export function entre(antes, atual, alfa) {
  if (antes === undefined || Math.abs(atual - antes) > SALTO_DESENHO) return atual;
  return antes + (atual - antes) * alfa;
}

// Atalhos para a tabela da onda (dados.js), usados pelos testes e pelo desenho.
export const numNaves = (fase) => ondaDaFase(fase).naves;
export const cicloDaFase = (fase) => ondaDaFase(fase).volta;
export const padraoDaFase = (fase) => ondaDaFase(fase).padrao;
export const tipoDaFase = (fase) => ondaDaFase(fase).tipo;
export const multVelocidade = (fase) => ondaDaFase(fase).vel;
export const energiaDaFase = (fase) => ondaDaFase(fase).energia;

// O cenário do fundo muda a cada duas ondas.
export function cenarioDaFase(fase) {
  return Math.floor((fase - 1) / ONDAS_POR_CENARIO) % NUM_CENARIOS;
}

export function bonusDeFase(fase, energiaRestanteSeg) {
  return Math.floor(energiaRestanteSeg) * BONUS_POR_SEG * fase;
}

// Quantas vidas extras entram quando a pontuação passa de um múltiplo de VIDA_EXTRA_CADA.
export function vidasGanhas(pontosAntes, pontosDepois) {
  return Math.floor(pontosDepois / VIDA_EXTRA_CADA) - Math.floor(pontosAntes / VIDA_EXTRA_CADA);
}

// Quanto mais naves caem, mais o grupo acelera (de 1x até 1,8x quando sobra a última).
export function rapidezDoGrupo(vivosFrac) {
  return 1 + (1 - vivosFrac) * 0.8;
}

// O grupo desce devagar. Na barreira (padrão 6) desce mais rápido quando sobram poucas naves.
export function avancarDescida(descida, dt, padrao, vivosFrac) {
  const taxa = padrao === 6 ? 5 + (1 - vivosFrac) * 40 : 4;
  return Math.min(DESCIDA_MAX, descida + taxa * dt);
}

// Faz x dar a volta na tela (com folga de 30 px nas bordas).
function darVolta(x) {
  return (((x + 30) % 420) + 420) % 420 - 30;
}

// Posição de uma nave no padrão de movimento, em função do tempo do grupo `tm` (que acelera quando
// sobram poucas naves). `nave` tem a origem na formação (hx, hy), o índice i e o total n.
// `ctx`: jx = posição da nave do jogador, vel = multiplicador da volta, descida = quanto o grupo desceu.
export function posicaoPadrao(padrao, nave, tm, ctx) {
  const { i, n, hx, hy } = nave;
  const k = ctx.vel;
  const y0 = hy + ctx.descida;
  const fase = (i / n) * 2 * Math.PI;
  switch (padrao) {
    case 0: { // ondas: cada fileira balança para um lado, com a altura ondulando
      const r = Math.floor(i / 4);
      const dir = r % 2 ? 1 : -1;
      return { x: hx + dir * Math.sin(tm * 1.3 * k + r * 0.8) * 45, y: y0 + Math.sin(tm * 2.2 * k + i * 0.5) * 14 };
    }
    case 1: { // serpente: uma fila só que passeia pela tela inteira
      const a = tm * 1.0 * k - i * 0.55;
      return { x: LARGURA / 2 + Math.sin(a) * 138, y: 135 + ctx.descida * 0.5 + Math.cos(a * 2) * 40 };
    }
    case 2: { // cortina: as fileiras cruzam a tela e dão a volta, cada uma numa velocidade
      const r = Math.floor(i / 4);
      const dir = r % 2 ? 1 : -1;
      return { x: darVolta(hx + dir * tm * (55 + r * 20) * k), y: y0 + Math.sin(tm * 1.5 + i) * 6 };
    }
    case 3: { // mergulho: a formação balança e, depois de uma pausa, UMA nave de cada vez se solta em curva até perto do jogador
      const fx = hx + Math.sin(tm * 0.9) * 30;
      const fy = y0;
      const intervalo = 1.6 / k; // uma nave nova começa a mergulhar a cada intervalo...
      const duracao = 2.8 / k; // ...e cada mergulho dura mais que isso, então são no máximo 2 ao mesmo tempo
      const ciclo = n * intervalo;
      const desde = tm - PAUSA_MERGULHO - i * intervalo;
      if (desde < 0 || desde % ciclo >= duracao) return { x: fx, y: fy + Math.sin(tm * 2 + i) * 3 };
      const u = (desde % ciclo) / duracao;
      const fundo = Math.sin(Math.PI * u);
      const lado = i % 2 ? 1 : -1;
      return {
        x: clamp(fx + (ctx.jx - fx) * fundo * 0.6 + lado * 55 * Math.sin(2 * Math.PI * u), 30, LARGURA - 30),
        y: fy + (Y_JOGADOR - 28 - fy) * fundo,
      };
    }
    case 4: { // roda: um anel que gira, respira e anda de um lado para o outro
      const a = tm * 0.9 * k + fase;
      const R = 90 + Math.sin(tm * 0.9) * 18;
      return {
        x: LARGURA / 2 + Math.sin(tm * 0.5) * 22 + Math.cos(a) * R * 1.2,
        y: 195 + ctx.descida * 0.4 + Math.sin(tm * 0.35) * 30 + Math.sin(a) * R * 0.5,
      };
    }
    case 5: { // oito: cada nave desenha um oito deitado, defasada das outras
      const a = tm * 0.9 * k + fase;
      return { x: LARGURA / 2 + Math.sin(a) * 135, y: 190 + ctx.descida * 0.4 + Math.sin(2 * a) * 65 };
    }
    case 6: // barreira: bloco que vai de um lado a outro e desce aos poucos
      return { x: hx + Math.sin(tm * 0.55 * k) * 42, y: y0 + Math.sin(tm * 3 + i) * 3 };
    default: // 7: caos controlado
      return {
        x: hx + Math.sin(tm * 1.9 * k + i * 1.7) * 45 * Math.sin(tm * 0.37 + i),
        y: y0 + 25 * Math.sin(tm * 2.3 * k + i * 2.1) + 20 * Math.sin(tm * 0.6),
      };
  }
}

// Posição final: nos primeiros instantes a nave entra voando em curva, vinda do alto da tela,
// e vai se juntando ao padrão (que já está em movimento).
export function posicaoNave(padrao, nave, t, tm, ctx) {
  const alvo = posicaoPadrao(padrao, nave, tm, ctx);
  const a = clamp((t - nave.i * ATRASO_ENTRADA) / DURACAO_ENTRADA, 0, 1);
  if (a >= 1) return alvo;
  const e = suave(a);
  const lado = nave.i % 2 ? 1 : -1;
  const inicioX = LARGURA / 2 + lado * 190 + (alvo.x - LARGURA / 2) * 0.2;
  return {
    x: lerp(inicioX, alvo.x, e) + lado * Math.sin(Math.PI * a) * 36,
    y: lerp(-50, alvo.y, e),
  };
}

// Pontuação máxima possível para `naves` derrubadas, terminando na onda informada (usada pelo servidor).
// As naves valem no máximo o multiplicador da onda mais alta. Quando a energia acaba a onda recomeça,
// então as naves derrubadas se acumulam: por isso o limite é por total de naves, não por onda.
export function pontosMaximos(fase, naves) {
  let bonus = 0;
  for (let k = 1; k <= fase; k++) bonus += ENERGIA_MAX_SEG * BONUS_POR_SEG * k;
  return naves * pontosPorNave(fase) + bonus;
}
