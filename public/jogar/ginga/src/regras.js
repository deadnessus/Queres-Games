// Cálculos puros do jogo: tempo do toque, chances, chute, fases e pontos. Sem DOM.
export const DRIBLES = ['DIREITA', 'ESQUERDA', 'CANETA', 'CHAPEU', 'ELASTICO_DIR', 'ELASTICO_ESQ'];
export const POSTURAS = ['FECHA_ESQ', 'FECHA_DIR', 'BOTE', 'CONTIDO', 'CARRINHO'];
export const POSTURAS_GOLEIRO = ['ABAFA', 'EM_PE'];

export function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// Parâmetros de uma fase (n começa em 1). ESPEC 6.2.
export function parametrosDaFase(config, dificuldade, n) {
  const base = config.dificuldades[dificuldade];
  const f = config.fases;
  const k = n - 1;
  return {
    dificuldade,
    fase: n,
    nome: base.nome,
    adversarios: base.adversarios,
    dicas: base.dicas,
    leitura: base.leitura * Math.max(f.pisoFrac, 1 - f.reducaoLeitura * k),
    janela: base.janela * Math.max(f.pisoFrac, 1 - f.reducaoJanela * k),
    finta: Math.min(f.fintaMax, base.finta + base.fintaPorFase * k),
    barra: { ...base.barra },
    goleiro: { ...base.goleiro },
  };
}

// Momentos-chave do duelo, em TTC (segundos até o contato). ESPEC 4.1.
export function linhaDoTempo(leitura, janela, cfgDuelo) {
  const fimJanela = cfgDuelo.fimJanela;
  const inicioJanela = fimJanela + janela;
  const tell = inicioJanela + leitura;
  return { fimJanela, inicioJanela, tell, nascimento: tell + cfgDuelo.antesDoTell };
}

// null = antes da postura aparecer (toque ignorado).
export function classificarTempo(ttc, lt) {
  if (ttc > lt.tell) return null;
  if (ttc > lt.inicioJanela) return 'CEDO';
  if (ttc > lt.fimJanela) {
    const janela = lt.inicioJanela - lt.fimJanela;
    const centro = lt.fimJanela + janela / 2;
    return Math.abs(ttc - centro) <= janela / 6 + 1e-9 ? 'PERFEITO' : 'JANELA';
  }
  return 'TARDE';
}

export function calcularChance(matriz, postura, drible, tempo, cfgDuelo) {
  if (!tempo || tempo === 'TARDE') return 0;
  const base = matriz[postura][drible];
  return clamp(base * cfgDuelo.mult[tempo], cfgDuelo.chanceMin, cfgDuelo.chanceMax);
}

// Chave da dica: 'DIREITA' | 'ESQUERDA' | 'LADO' | 'CANETA' | 'CHAPEU' | 'ELASTICO'.
export function melhorDrible(matriz, postura) {
  const linha = matriz[postura];
  const max = Math.max(...DRIBLES.map((d) => linha[d]));
  const melhores = DRIBLES.filter((d) => linha[d] === max);
  if (melhores.some((d) => d.startsWith('ELASTICO'))) return 'ELASTICO';
  if (melhores.includes('DIREITA') && melhores.includes('ESQUERDA')) return 'LADO';
  return melhores[0];
}

export const TEXTO_DICA = {
  DIREITA: 'vá pela direita',
  ESQUERDA: 'vá pela esquerda',
  LADO: 'drible para um lado',
  CANETA: 'caneta: os dois juntos',
  CHAPEU: 'chapéu: segure os dois',
  ELASTICO: 'elástico: um lado e o outro',
};

export const NOME_POSTURA = {
  FECHA_ESQ: 'fechando a esquerda',
  FECHA_DIR: 'fechando a direita',
  BOTE: 'bote de pernas abertas',
  CONTIDO: 'contido',
  CARRINHO: 'carrinho',
  ABAFA: 'se jogando nos pés',
  EM_PE: 'saindo em pé',
};

// Sorteio igual entre as posturas; evita a mesma três vezes seguidas.
export function sortearPostura(rng, lista, historico = []) {
  for (let i = 0; i < 20; i++) {
    const p = lista[Math.floor(rng() * lista.length)];
    const n = historico.length;
    if (n >= 2 && historico[n - 1] === p && historico[n - 2] === p) continue;
    return p;
  }
  return lista.find((p) => p !== historico[historico.length - 1]) ?? lista[0];
}

export function sortearOutra(rng, lista, exceto) {
  const outras = lista.filter((p) => p !== exceto);
  return outras[Math.floor(rng() * outras.length)];
}

// Barra de chute. ESPEC 5.1 e 5.2.
export function posicaoMarcador(t, periodo) {
  const f = (t % periodo) / periodo;
  return f < 0.5 ? f * 2 : 2 - f * 2;
}

export function meiaLarguraBloco(t, duracao, cfgBarra) {
  return cfgBarra.blocoInicial + (cfgBarra.blocoFinal - cfgBarra.blocoInicial) * clamp(t / duracao, 0, 1);
}

export function zonaDaBarra(p, cfgBarra) {
  if (p < cfgBarra.fora || p > 1 - cfgBarra.fora) return 'FORA';
  if (p < cfgBarra.trave || p > 1 - cfgBarra.trave) return 'TRAVE';
  return 'GOL';
}

export function calcularChute(p, kc, hw, cfgBarra) {
  const zona = zonaDaBarra(p, cfgBarra);
  if (zona !== 'GOL') return { zona, chance: 0, noCanto: false };
  const g0 = cfgBarra.trave;
  const g1 = 1 - cfgBarra.trave;
  let chance;
  if (p >= kc - hw && p <= kc + hw) {
    chance = cfgBarra.chanceNoBloco;
  } else {
    let d;
    let dMax;
    if (p < kc) {
      const borda = kc - hw;
      d = borda - p;
      dMax = borda - g0;
    } else {
      const borda = kc + hw;
      d = p - borda;
      dMax = g1 - borda;
    }
    chance = dMax > 0
      ? cfgBarra.chanceBase + cfgBarra.chanceExtra * clamp(d / dMax, 0, 1)
      : cfgBarra.chanceNoBloco;
  }
  const noCanto = p <= g0 + cfgBarra.larguraCanto || p >= g1 - cfgBarra.larguraCanto;
  return { zona, chance, noCanto };
}

export function resolverChute(p, kc, hw, cfgBarra, rng) {
  const c = calcularChute(p, kc, hw, cfgBarra);
  if (c.zona !== 'GOL') return { resultado: c.zona, chance: 0, noCanto: false, p };
  const gol = rng() * 100 < c.chance;
  return { resultado: gol ? 'GOL' : 'DEFESA', chance: c.chance, noCanto: gol && c.noCanto, p };
}

// Converte a posição na barra (p) para x no campo, dadas as traves.
export function pParaX(p, cfgBarra, traveEsq, traveDir) {
  const g0 = cfgBarra.trave;
  const g1 = 1 - cfgBarra.trave;
  return traveEsq + ((p - g0) / (g1 - g0)) * (traveDir - traveEsq);
}

// Pontos e estrelas. ESPEC 7.
export function pontosDrible(cfgPontos, drible, tempo) {
  return cfgPontos[drible] * (tempo === 'PERFEITO' ? cfgPontos.perfeitoMult : 1);
}

export function contarEstrelas({ concluida, perfeitos, dribles, placa, noCanto }) {
  if (!concluida) return 0;
  let e = 1;
  if (dribles > 0 && perfeitos * 2 >= dribles) e++;
  if (placa || noCanto) e++;
  return e;
}

// Anel de tempo em volta do defensor. ESPEC 4.4.
export function raioAnel(ttc, lt, rMin, rMax) {
  return rMin + (rMax - rMin) * clamp((ttc - lt.fimJanela) / (lt.tell - lt.fimJanela), 0, 1);
}

export function formatarPontos(n) {
  return Math.round(n).toLocaleString('pt-BR');
}
