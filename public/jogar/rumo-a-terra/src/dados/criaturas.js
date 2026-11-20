// Os bichos (aliens) de Lúmen que já estão no jogo, com números de jogo (decisões D4 e D5:
// derrotado cai, some e deixa itens; dá para caçar). Ver docs/1, seção 1.4.
//  vida: quantos tiros aguenta; dano: quanto tira da sua vida (de 100); vel: metros por segundo.
//  visao: a que distância percebe você; da: o que deixa cair [[item, mínimo, máximo, chance]].
export const CRIATURAS = {
  saltito: {
    nome: 'Saltito', vida: 1, dano: 0, vel: 3.2, velFuga: 7.5, visao: 14, raio: 0.5, alturaAlvo: 0.45,
    quantidade: 14, grupo: 3, da: [['carne', 1, 1, 1]],
    curiosidade: 'Pula com as patas de trás, como o jerboa, um roedor do deserto da Terra.',
  },
  rastejador: {
    nome: 'Rastejador', vida: 3, dano: 12, vel: 2.2, velCaca: 5.3, visao: 24, raio: 0.75, alturaAlvo: 0.55,
    quantidade: 12, grupo: 3, da: [['carne', 1, 2, 1], ['cristal', 1, 1, 0.5]],
    curiosidade: 'Caça em grupo, como os lobos. Tem medo de fogo: fique perto de uma fogueira.',
  },
  zumbidor: {
    nome: 'Zumbidor', vida: 2, dano: 9, vel: 6, velRasante: 14, visao: 28, raio: 0.8, alturaAlvo: 0,
    quantidade: 6, grupo: 1, da: [['carapaca', 1, 1, 1]],
    curiosidade: 'Um inseto do tamanho de um cachorro. No ar de Lúmen tem mais oxigênio, e os insetos crescem mais.',
  },
};
