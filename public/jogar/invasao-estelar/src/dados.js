// Tabelas do jogo: dificuldade, padrões de movimento, inimigos e a descrição de cada onda.
// Para deixar o jogo mais fácil ou mais difícil, mude os números aqui (os testes avisam se algo sair do lugar).
// Os pontos, que o servidor confere, ficam em logica.js e em servidor/functions/_lib/invasao-estelar.js.

export const DIFICULDADE = {
  ondasPorVolta: 8, // a cada volta de 8 ondas o jogo acelera
  aceleracaoPorVolta: 0.12, // +12% de velocidade a cada volta
  navesNoComeco: 8,
  navesNoMaximo: 12,
  ondasParaMaisUmaNave: 2, // +1 nave a cada 2 ondas, até o máximo
  energiaNoComeco: 60, // segundos de energia na 1ª volta (não pode passar de ENERGIA_MAX_SEG, que o servidor usa)
  energiaMinima: 35,
  energiaPerdidaPorVolta: 3,
  chanceDeTiro: 0.05, // chance de cada nave atirar, por segundo, multiplicada pela velocidade da onda
  disparosNaTela: 5, // máximo de tiros inimigos na tela na 1ª volta
  disparosExtrasPorVolta: 1,
  disparosExtrasMax: 2,
  miraNoComeco: 0.3, // quanto o tiro inimigo mira na nave (0 = reto, 1 = mira bem)
  miraPorVolta: 0.25,
  velDisparo: 190, // px/s
  velDisparoPorVolta: 30,
  velDisparoVariacao: 40, // cada tiro sorteia um pouco a mais de velocidade, até isso
};

// Os 8 jeitos de se mover (o movimento de cada um está em logica.js, posicaoPadrao).
export const PADROES = [
  { id: 'ondas', nome: 'Ondas' },
  { id: 'serpente', nome: 'Serpente' },
  { id: 'cortina', nome: 'Cortina' },
  { id: 'mergulho', nome: 'Mergulho' },
  { id: 'roda', nome: 'Roda' },
  { id: 'oito', nome: 'Oito' },
  { id: 'barreira', nome: 'Barreira' },
  { id: 'caos', nome: 'Caos' },
];

// Os 10 inimigos, na mesma ordem dos desenhos de naves.js (TIPOS). Hoje todos têm 1 de vida e o mesmo tiro;
// a Etapa 1 do plano dá um comportamento próprio a cada um.
export const INIMIGOS = [
  { id: 'caca-garra', vida: 1, tiro: 'reto' },
  { id: 'vespa', vida: 1, tiro: 'reto' },
  { id: 'lamina', vida: 1, tiro: 'reto' },
  { id: 'devorador', vida: 1, tiro: 'reto' },
  { id: 'bombardeiro', vida: 1, tiro: 'reto' },
  { id: 'aranha', vida: 1, tiro: 'reto' },
  { id: 'sentinela', vida: 1, tiro: 'reto' },
  { id: 'parasita', vida: 1, tiro: 'reto' },
  { id: 'cranio', vida: 1, tiro: 'reto' },
  { id: 'olho', vida: 1, tiro: 'reto' },
];

// Ordem em que inimigos e padrões aparecem. 10 inimigos contra 8 padrões: as combinações só se repetem depois de 40 ondas.
export const SEQUENCIA_INIMIGOS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const SEQUENCIA_PADROES = [0, 1, 2, 3, 4, 5, 6, 7];

// Tudo o que define uma onda, a partir do número dela.
export function ondaDaFase(fase) {
  const D = DIFICULDADE;
  const volta = Math.floor((fase - 1) / D.ondasPorVolta);
  return {
    fase,
    volta,
    tipo: SEQUENCIA_INIMIGOS[(fase - 1) % SEQUENCIA_INIMIGOS.length],
    padrao: SEQUENCIA_PADROES[(fase - 1) % SEQUENCIA_PADROES.length],
    naves: Math.min(D.navesNoMaximo, D.navesNoComeco + Math.floor((fase - 1) / D.ondasParaMaisUmaNave)),
    vel: 1 + D.aceleracaoPorVolta * volta,
    energia: Math.max(D.energiaMinima, D.energiaNoComeco - D.energiaPerdidaPorVolta * volta),
    maxDisparos: D.disparosNaTela + Math.min(D.disparosExtrasMax, D.disparosExtrasPorVolta * volta),
    mira: Math.min(1, D.miraNoComeco + D.miraPorVolta * volta),
    velDisparo: D.velDisparo + D.velDisparoPorVolta * volta,
  };
}
