// Tabelas do jogo: dificuldade, modos, padrões de movimento, inimigos, cápsulas, ondas especiais e a descrição
// de cada onda. Para deixar o jogo mais fácil ou mais difícil, mude os números aqui (os testes avisam se algo
// sair do lugar). Os pontos, que o servidor confere, ficam em logica.js e em servidor/functions/_lib/invasao-estelar.js.

export const DIFICULDADE = {
  ondasPorVolta: 8, // a cada volta de 8 ondas o jogo acelera
  aceleracaoPorVolta: 0.12, // +12% de velocidade a cada volta
  navesNoComeco: 8,
  navesNoMaximo: 12,
  ondasParaMaisUmaNave: 2, // +1 nave a cada 2 ondas, até o máximo
  energiaNoComeco: 60, // segundos de energia na 1ª volta (não pode passar de ENERGIA_MAX_SEG, que o servidor usa)
  energiaMinima: 35,
  energiaPerdidaPorVolta: 3,
  chanceDeTiro: 0.06, // chance de cada nave atacar, por segundo, multiplicada pela aceleração da volta
  disparosNaTela: 5, // máximo de tiros inimigos na tela na 1ª volta
  disparosExtrasPorVolta: 1,
  disparosExtrasMax: 2,
  miraNoComeco: 0.3, // quanto o tiro inimigo mira na nave (0 = reto, 1 = mira bem)
  miraPorVolta: 0.25,
  velDisparo: 190, // px/s
  velDisparoPorVolta: 30,
  velDisparoVariacao: 40, // cada tiro sorteia um pouco a mais de velocidade, até isso
  // Degraus dentro de cada volta, pela posição da onda (1 a 8): o começo da volta é mais calmo.
  // Calibrar com o painel do site (em que onda as partidas terminam, por versão).
  degrauDaPosicao: [0, 0, 1, 1, 1, 2, 2, 2],
  chancePorDegrau: 0.1, // +10% de ataques por degrau
  velDisparoPorDegrau: 0.05, // +5% na velocidade dos tiros por degrau
};

// Modos de jogo. O Recruta é mais calmo e não entra no ranking.
//   fundoMergulho: até onde o inimigo desce no padrão Mergulho (no Recruta ele para antes de chegar na nave)
export const MODOS = {
//   meteoros: quanto mais espaçados vêm os meteoros da chuva
  normal: { vel: 1, chance: 1, disparosAMenos: 0, velDisparo: 1, mira: 1, energiaExtra: 0, fundoMergulho: 552, meteoros: 1, ranking: true },
  recruta: { vel: 0.8, chance: 0.5, disparosAMenos: 2, velDisparo: 0.8, mira: 0.5, energiaExtra: 10, fundoMergulho: 485, meteoros: 1.4, ranking: false },
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

// Os 10 inimigos, na mesma ordem dos desenhos de naves.js (TIPOS). Todo ataque avisa antes (`aviso`, em segundos):
// o inimigo brilha, treme ou mostra uma linha.
//   vida: tiros para derrubar
//   tiro: reto | duplo | ferrao (a vespa se solta em zigue-zague e dá uma ferroada) | bomba (estoura em 3 perto
//         do chão) | teia (deixa a nave lenta) | raio (linha piscando e depois um raio reto) | leque (3 tiros) |
//         guiado (tiro lento que segue a nave)
//   chance: quanto ataca, comparado com o normal (ataques fortes vêm menos)
//   rapidez: velocidade do movimento, comparada com o normal
//   especial: escudo (o 1º tiro quebra o escudo) | furia (fica vermelho e mais rápido depois do 1º tiro) |
//             filhotes (derrubado, vira 2 filhotes pequenos)
export const INIMIGOS = [
  { id: 'caca-garra', vida: 1, tiro: 'duplo', aviso: 0.35, chance: 0.8, rapidez: 1.25 },
  { id: 'vespa', vida: 1, tiro: 'ferrao', aviso: 0.45, chance: 0.9, rapidez: 1 },
  { id: 'lamina', vida: 2, tiro: 'reto', aviso: 0.35, chance: 1, rapidez: 1, especial: 'escudo' },
  { id: 'devorador', vida: 2, tiro: 'reto', aviso: 0.35, chance: 0.9, rapidez: 1, especial: 'furia' },
  { id: 'bombardeiro', vida: 1, tiro: 'bomba', aviso: 0.5, chance: 0.55, rapidez: 0.9 },
  { id: 'aranha', vida: 1, tiro: 'teia', aviso: 0.4, chance: 1, rapidez: 1 },
  { id: 'sentinela', vida: 1, tiro: 'raio', aviso: 0.9, chance: 0.45, rapidez: 0.9 },
  { id: 'parasita', vida: 1, tiro: 'reto', aviso: 0.35, chance: 0.8, rapidez: 1, especial: 'filhotes' },
  { id: 'cranio', vida: 1, tiro: 'leque', aviso: 0.45, chance: 0.6, rapidez: 1 },
  { id: 'olho', vida: 1, tiro: 'guiado', aviso: 0.5, chance: 0.6, rapidez: 1 },
];

// Quantos tiros cada ataque põe na tela (conta para o limite de tiros inimigos).
export const CUSTO_DO_TIRO = { reto: 1, duplo: 2, ferrao: 1, bomba: 1, teia: 1, raio: 1, leque: 3, guiado: 1 };

// Ordem em que inimigos e padrões aparecem nas ondas com inimigos. Bombardeiros (4) vêm antes dos devoradores (3):
// assim a 1ª onda de Mergulho (padrão 3, a mais perigosa) é de bombardeiros, com 1 de vida, e as contas mostram que
// lâminas e devoradores (2 de vida) nunca caem no Mergulho (10 inimigos contra 8 padrões).
export const SEQUENCIA_INIMIGOS = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9];
export const SEQUENCIA_PADROES = [0, 1, 2, 3, 4, 5, 6, 7];

// Ondas especiais, pela posição da onda na volta (1 a 8). As outras posições são ondas normais.
// meteoros: só desviar, cada meteoro que passa vale pontos. bonus: os inimigos não atiram e valem o dobro.
// chefe: no fim de cada volta, um chefão (em rodízio: Nave-mãe, Rainha Aranha, Olho Gigante).
export const ESPECIAIS = { 4: 'meteoros', 6: 'bonus', 8: 'chefe' };

// Chefões. A vida e a pressa dos ataques crescem com a volta (forcaDoChefe); no Recruta eles são mais fracos.
//   nave-mae: canhões que precisam cair um a um antes do núcleo; solta caças e, sem canhões, dispara um raio.
//   rainha: muda de lado, solta teias em leque e ovos que viram aranhas pequenas.
//   olho: pisca (fechado, os tiros batem e voltam), varre a tela com um raio avisado e solta tiros guiados.
export const CHEFES = [
  { id: 'nave-mae', nome: 'Nave-mãe', cor: '#ff6a4c', canhoes: 4, vidaCanhao: 4, vidaNucleo: 12, ataque: 1.8, cacas: 9, raio: 3.5 },
  { id: 'rainha', nome: 'Rainha Aranha', cor: '#b455ff', vida: 30, parada: 4.5, travessia: 1.6, ataque: 1.9, ovos: 7 },
  { id: 'olho', nome: 'Olho Gigante', cor: '#c8f03c', vida: 36, aberto: 5, fechado: 1.2, varredura: 4.2, guiados: 3.6 },
];
export const MINIONS_MAX = 3; // inimigos pequenos que o chefão pode ter soltos ao mesmo tempo
export const forcaDoChefe = (volta, modo = 'normal') => (1 + 0.25 * volta) * (modo === 'recruta' ? 0.7 : 1);
// Pontos do chefão, em "naves" da onda: cada parte que cai (canhão) e o chefão derrotado.
export const PONTOS_CHEFE = { parte: 5, derrotado: 25, partesMax: 4 };

export const METEOROS = {
  duracao: 15, // segundos de chuva
  intervaloMin: 0.6, // segundos entre um meteoro e o próximo
  intervaloMax: 1.0,
  intervaloPorVolta: -0.05,
  intervaloMinimo: 0.35,
  aviso: 0.9, // o lugar onde o meteoro vai cair pisca antes
  velMin: 130,
  velMax: 200,
  velPorVolta: 12,
  raioMin: 9,
  raioMax: 17,
};
// Quantos meteoros cabem numa chuva, no máximo (o servidor usa para conferir os pontos).
export const METEOROS_MAX = Math.ceil(METEOROS.duracao / METEOROS.intervaloMinimo) + 1;

export const BONUS = { energia: 20, multiplicador: 2 };

// Traço leve de cada nave do hangar (nomes e o que libera cada uma estão em progresso.js).
//   vel: velocidade da nave · escudo: começa com escudo · cadencia: segundos entre rajadas · velTiro: velocidade do
//   laser (como só sai uma rajada quando a anterior some, laser mais rápido é tiro mais frequente) · energia: gasto da barra
export const NAVES_JOGADOR = {
  padrao: {},
  flecha: { vel: 1.12 },
  guardia: { escudo: true },
  rajada: { cadencia: 0.11, velTiro: 1.3 },
  cometa: { energia: 0.9 },
};

// Combo: derrubar inimigos em sequência (até `janela` segundos entre um e outro) sobe o multiplicador até o máximo.
export const COMBO = { janela: 1.5, maximo: 5 };

// Cápsulas: caem às vezes de inimigos derrubados; a nave pega encostando nelas.
export const CAPSULA = { chance: 0.1, vel: 95, maxNaTela: 2 };
export const CAPSULAS = [
  { id: 'duplo', nome: 'Tiro duplo', segundos: 10, peso: 22 }, // 2 lasers por vez
  { id: 'leque', nome: 'Leque', segundos: 8, peso: 16 }, // 3 lasers abertos
  { id: 'escudo', nome: 'Escudo', segundos: 0, peso: 18 }, // aguenta 1 tiro
  { id: 'energia', nome: 'Energia', segundos: 10, peso: 18 }, // +10 s na barra
  { id: 'lento', nome: 'Câmera lenta', segundos: 5, peso: 12 }, // inimigos e tiros a meia velocidade
  { id: 'bomba', nome: 'Bomba', segundos: 0, peso: 14 }, // apaga os tiros inimigos da tela
];

// Posições da volta com ondas de inimigos (normal e bônus); a chuva de meteoros e o chefão não contam.
const POSICOES_COM_INIMIGOS = Array.from({ length: DIFICULDADE.ondasPorVolta }, (_, k) => k + 1)
  .filter((pos) => !ESPECIAIS[pos] || ESPECIAIS[pos] === 'bonus');

// Quantas ondas com inimigos vieram antes desta: escolhe o inimigo e o padrão sem pular nenhum da sequência.
export function indiceComInimigos(fase) {
  const volta = Math.floor((fase - 1) / DIFICULDADE.ondasPorVolta);
  const pos = ((fase - 1) % DIFICULDADE.ondasPorVolta) + 1;
  return volta * POSICOES_COM_INIMIGOS.length + POSICOES_COM_INIMIGOS.filter((q) => q < pos).length;
}

export const especieDaFase = (fase) => ESPECIAIS[((fase - 1) % DIFICULDADE.ondasPorVolta) + 1] || 'normal';

// Tudo o que define uma onda, a partir do número dela e do modo de jogo.
export function ondaDaFase(fase, modo = 'normal') {
  const D = DIFICULDADE;
  const M = MODOS[modo] || MODOS.normal;
  const volta = Math.floor((fase - 1) / D.ondasPorVolta);
  const posicao = ((fase - 1) % D.ondasPorVolta) + 1;
  const especie = especieDaFase(fase);
  const degrau = D.degrauDaPosicao[posicao - 1];
  const k = indiceComInimigos(fase);
  const tipo = SEQUENCIA_INIMIGOS[k % SEQUENCIA_INIMIGOS.length];
  let padrao = SEQUENCIA_PADROES[k % SEQUENCIA_PADROES.length];
  if (especie === 'bonus' && padrao === 3) padrao = 5; // na onda bônus ninguém mergulha até a nave
  const acel = 1 + D.aceleracaoPorVolta * volta;
  let naves = Math.min(D.navesNoMaximo, D.navesNoComeco + Math.floor((fase - 1) / D.ondasParaMaisUmaNave));
  if (INIMIGOS[tipo].vida > 1) naves = Math.max(6, Math.round(naves * 0.75)); // quem aguenta 2 tiros vem em menos naves
  if (especie === 'meteoros' || especie === 'chefe') naves = 0; // o chefão solta os inimigos dele durante a luta
  let energia = Math.max(D.energiaMinima, D.energiaNoComeco - D.energiaPerdidaPorVolta * volta) + M.energiaExtra;
  if (especie === 'bonus') energia = BONUS.energia;
  if (especie === 'meteoros') energia = METEOROS.duracao;
  return {
    fase,
    modo,
    volta,
    posicao,
    especie, // normal | meteoros | bonus | chefe
    chefe: especie === 'chefe' ? volta % CHEFES.length : null, // qual chefão (índice em CHEFES)
    degrau,
    tipo,
    padrao,
    naves,
    fundoMergulho: M.fundoMergulho,
    acel: acel * M.vel, // aceleração da volta (e do modo)
    vel: acel * M.vel * INIMIGOS[tipo].rapidez, // velocidade do movimento desta onda
    chance: D.chanceDeTiro * acel * (1 + D.chancePorDegrau * degrau) * M.chance, // ataques por segundo de cada nave
    atira: especie !== 'bonus',
    energia,
    maxDisparos: Math.max(1, D.disparosNaTela + Math.min(D.disparosExtrasMax, D.disparosExtrasPorVolta * volta) - M.disparosAMenos),
    mira: Math.min(1, D.miraNoComeco + D.miraPorVolta * volta) * M.mira,
    velDisparo: (D.velDisparo + D.velDisparoPorVolta * volta) * (1 + D.velDisparoPorDegrau * degrau) * M.velDisparo,
    pontosMult: especie === 'bonus' ? BONUS.multiplicador : 1,
  };
}
