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
  // ---- chefes (um em cada peça da nave; aparecem nas missões e não voltam depois de derrotados) ----
  reiRastejador: {
    nome: 'Rei Rastejador', base: 'rastejador', chefe: true, vida: 18, dano: 14, vel: 2.6, velCaca: 5.6, visao: 30, raio: 1.3, alturaAlvo: 0.9,
    escala: 2.1, cor: 0xffd27a, quantidade: 0, grupo: 1, da: [['carne', 3, 4, 1], ['cristal', 2, 3, 1]], chama: 'rastejador', ajudantes: 2,
  },
  saltitao: {
    nome: 'Saltitão', base: 'saltito', chefe: true, vida: 30, dano: 18, vel: 3, visao: 34, raio: 1.6, alturaAlvo: 1.4,
    escala: 3.6, cor: 0xffb0b0, quantidade: 0, grupo: 1, da: [['carne', 5, 6, 1]],
  },
  magma: {
    nome: 'Gigante de Magma', base: 'guardiao', chefe: true, vida: 50, dano: 12, vel: 2.2, visao: 45, raio: 1.9, alturaAlvo: 2.6,
    escala: 1.25, cor: 0xff8a50, brilho: 0x3a0e00, corTiro: 0xff7a20, quantidade: 0, grupo: 1, da: [['cristal', 6, 8, 1]],
  },
  rainha: {
    nome: 'Rainha Zumbidora', base: 'zumbidor', chefe: true, vida: 30, dano: 14, vel: 7, velRasante: 15, visao: 45, raio: 1.6, alturaAlvo: 0,
    escala: 2.6, cor: 0xffb070, quantidade: 0, grupo: 1, da: [['carapaca', 3, 4, 1]], chama: 'zumbidor',
  },
  grandeGarra: {
    nome: 'Grande Garra', base: 'rastejador', chefe: true, vida: 45, dano: 22, vel: 3, velCaca: 6.2, visao: 40, raio: 1.8, alturaAlvo: 1.2,
    escala: 2.8, cor: 0xdfeaff, quantidade: 0, grupo: 1, da: [['carne', 4, 6, 1], ['cristal', 3, 5, 1]], semMedo: true,
  },
  guardiao: {
    nome: 'Guardião de Cristal', chefe: true, vida: 60, dano: 10, vel: 2.5, visao: 45, raio: 1.6, alturaAlvo: 2.2,
    escala: 1, quantidade: 0, grupo: 1, da: [['cristal', 6, 8, 1]],
  },
  zumbidor: {
    nome: 'Zumbidor', vida: 2, dano: 9, vel: 6, velRasante: 14, visao: 28, raio: 0.8, alturaAlvo: 0,
    quantidade: 6, grupo: 1, da: [['carapaca', 1, 1, 1]],
    curiosidade: 'Um inseto do tamanho de um cachorro. No ar de Lúmen tem mais oxigênio, e os insetos crescem mais.',
  },
};
