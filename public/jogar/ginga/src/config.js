// Todos os números de balanceamento do jogo. Ver docs/ESPEC.md, seção 6.
export const CONFIG = {
  mundo: {
    largura: 360,
    jogadorYFrac: 0.75,
    xCentro: 180,
    velocidade: 120,       // unidades por segundo
    velocidadeArea: 30,
    saidaGoleiro: 30,      // quanto o goleiro avança durante a barra
  },
  gestos: { simultaneoMs: 90, sequenciaMs: 170, segurarMs: 250 },
  // movimento lateral do jogador (unidades do mundo; o campo tem 312 de largura útil)
  movimento: {
    gingaDist: 12,       // ao encostar o dedo: só um aviso de que vai para esse lado
    gingaVel: 140,       // (un/s)
    ladoDist: 46,        // drible lateral e elástico: um passo claro para o lado
    ladoTempo: 0.3,      // tempo para completar esse passo (s)
    bolaAdiante: 16,     // a bola vai na diagonal, à frente do jogador, para o lado do drible
    meioDist: 40,        // caneta e chapéu
    meioTempo: 0.3,
    falhaDist: 26,       // até onde vai antes de perder a bola
    voltaVel: 70,        // volta ao centro depois de passar (un/s)
    voltaTempo: 1.1,     // tempo da volta suave logo depois de passar pelo defensor (s)
  },

  duelo: {
    fimJanela: 0.4,
    antesDoTell: 0.8,      // nascimento = tell + antesDoTell
    intervaloEntreDefensores: 1.0,
    voltaAoCentro: 0.6,
    animacaoDrible: 0.5,
    pausaDesarme: 1.2,
    mult: { CEDO: 0.8, JANELA: 1.0, PERFEITO: 1.1 },
    chanceMin: 5,
    chanceMax: 95,
  },
  dificuldades: {
    facil: {
      nome: 'Fácil', adversarios: 3, leitura: 0.7, janela: 0.6,
      finta: 0, fintaPorFase: 0, dicas: true,
      barra: { duracao: 3.0, periodo: 2.4, chanceCanto: 0 },
      goleiro: { leitura: 0.65, janela: 0.6 },
    },
    medio: {
      nome: 'Médio', adversarios: 6, leitura: 0.5, janela: 0.45,
      finta: 0.10, fintaPorFase: 0.03, dicas: false,
      barra: { duracao: 2.5, periodo: 1.8, chanceCanto: 0.3 },
      goleiro: { leitura: 0.45, janela: 0.45 },
    },
    dificil: {
      nome: 'Difícil', adversarios: 10, leitura: 0.35, janela: 0.30,
      finta: 0.25, fintaPorFase: 0.03, dicas: false,
      barra: { duracao: 2.0, periodo: 1.3, chanceCanto: 0.5 },
      goleiro: { leitura: 0.35, janela: 0.35 },
    },
  },
  fases: { reducaoLeitura: 0.08, reducaoJanela: 0.05, pisoFrac: 0.6, fintaMax: 0.40 },
  matrizDefensor: {
    FECHA_ESQ: { DIREITA: 85, ESQUERDA: 20, CANETA: 30, CHAPEU: 25, ELASTICO_DIR: 60, ELASTICO_ESQ: 15 },
    FECHA_DIR: { DIREITA: 20, ESQUERDA: 85, CANETA: 30, CHAPEU: 25, ELASTICO_DIR: 15, ELASTICO_ESQ: 60 },
    BOTE:      { DIREITA: 55, ESQUERDA: 55, CANETA: 85, CHAPEU: 55, ELASTICO_DIR: 30, ELASTICO_ESQ: 30 },
    CONTIDO:   { DIREITA: 50, ESQUERDA: 50, CANETA: 10, CHAPEU: 35, ELASTICO_DIR: 85, ELASTICO_ESQ: 85 },
    CARRINHO:  { DIREITA: 45, ESQUERDA: 45, CANETA: 5,  CHAPEU: 90, ELASTICO_DIR: 20, ELASTICO_ESQ: 20 },
  },
  matrizGoleiro: {
    ABAFA: { DIREITA: 45, ESQUERDA: 45, CANETA: 10, CHAPEU: 85, ELASTICO_DIR: 30, ELASTICO_ESQ: 30 },
    EM_PE: { DIREITA: 75, ESQUERDA: 75, CANETA: 40, CHAPEU: 30, ELASTICO_DIR: 55, ELASTICO_ESQ: 55 },
  },
  barra: {
    fora: 0.08, trave: 0.11,          // limites a partir de cada ponta
    blocoInicial: 0.08, blocoFinal: 0.30,
    desvioCanto: 0.12,
    chanceNoBloco: 10, chanceBase: 60, chanceExtra: 35,
    larguraCanto: 0.06,
  },
  pontos: {
    DIREITA: 100, ESQUERDA: 100, CANETA: 200, ELASTICO_DIR: 200, ELASTICO_ESQ: 200, CHAPEU: 250,
    perfeitoMult: 1.5, gol: 500, noCanto: 250, golDePlaca: 1000,
  },
  treino: { velocidadeTempo: 0.6 },
  // Modo Livre: o usuário controla o jogador o tempo todo (ver docs/ESPEC.md, seção 15)
  livre: {
    velBase: 70,         // corrida sem dedo na tela (un/s)
    velMin: 30,          // dedo bem embaixo: quase parando
    velMax: 170,         // dedo lá em cima: arrancada
    dedoBase: 0.8,       // altura do dedo (0 = topo da tela, 1 = base) que mantém a velocidade base
    velPorAltura: 230,   // quanto a velocidade muda por tela de altura do dedo
    aceleracao: 260,     // un/s²
    latVel: 95,          // andar para o lado segurando (un/s)
    latAcel: 700,        // un/s²
    limiteLateral: 125,
    toqueMs: 170,        // soltou antes disso = corte; segurou mais = andar
    corteDist: 48,       // passo lateral do corte, com a bola colada no pé
    corteTempo: 0.26,    // segundos do corte
    bolaNaFrente: 0.1,   // a bola vai um pouco à frente do pé no sentido em que ele anda (s)
    elasticoMs: 240,     // segundo corte para o lado oposto dentro deste tempo = elástico
    elasticoMult: 1.9,
    chanceSemBote: { caneta: 0.15, chapeu: 0.25 }, // caneta/chapéu antes de ele armar o bote   // a volta do elástico é deste tanto do corte
    distNascer: 260,
    intervalo: 1.0,
    defensor: {
      facil: { vLat: 55, reacao: 0.5, avanco: 70, marca: 25, prepara: 0.4, boteDist: 58, boteVel: 170, alcance: 20, recupera: 0.8, carrinho: 0.15 },
      medio: { vLat: 70, reacao: 0.38, avanco: 80, marca: 30, prepara: 0.3, boteDist: 62, boteVel: 190, alcance: 22, recupera: 0.6, carrinho: 0.25 },
      dificil: { vLat: 90, reacao: 0.28, avanco: 90, marca: 35, prepara: 0.22, boteDist: 68, boteVel: 210, alcance: 24, recupera: 0.45, carrinho: 0.35 },
    },
    pontos: { passar: 100, corte: 150, caneta: 250, chapeu: 300, elastico: 250 },
  },
};
