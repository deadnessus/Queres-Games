// Vale da Queda: a região onde a Andorinha caiu (base central do jogo).
// Coordenadas em metros. x = leste, z = sul (no Three.js, -z é o norte). y = altura.
// Etapa 0: relevo, lago, trilha, plantas, pedras, a nave caída (provisória) e alvos de treino.
export default {
  id: 'vale',
  nome: 'Vale da Queda',
  semente: 1207,
  tamanho: 384,
  passo: 2,
  nivelAgua: 0,

  terreno: {
    base: { altura: 4.5, amplitude: 8, escala: 110, detalhe: 1.4, escalaDetalhe: 21 },
    bordaParedao: 36,
    alturaParedao: 34,
    ops: [
      { tipo: 'achatar', x: 0, z: 0, raio: 20, borda: 26, altura: 3.2 }, // clareira da nave
      { tipo: 'lago', x: 82, z: -52, raio: 40, prof: 4.5, borda: 16 },
      { tipo: 'trilha', pontos: [[2, 10], [-18, 60], [-6, 118], [0, 186]], largura: 4.5, borda: 6 }, // para a Floresta (sul)
      { tipo: 'trilha', pontos: [[10, -6], [44, -26], [58, -30]], largura: 3.5, borda: 5 }, // até o lago
      { tipo: 'colina', x: 104, z: 46, raio: 36, altura: 10 }, // colina da bateria (Etapa 1)
      { tipo: 'colina', x: -112, z: -70, raio: 54, altura: 16 },
      { tipo: 'colina', x: -60, z: 120, raio: 40, altura: 8 },
      { tipo: 'sulco', de: [-46, 44], ate: [-5, 5], largura: 8, prof: 1.3 }, // rastro da queda
    ],
  },

  // Onde o jogador aparece e para onde olha (graus; 0 = norte, 90 = leste).
  inicio: { x: 15, z: 19, olhar: -38 },

  // A Andorinha caída. "giro" em graus (para onde o nariz aponta).
  nave: { x: 0, z: 0, giro: 50, inclinacao: 7, afundar: 0.9 },

  vegetacao: {
    gramaPena: { densidade: 0.07 }, // tufos de "grama-pena" roxa por m²
    arbustoChama: { quantidade: 260 },
    arvoreTaca: { quantidade: 130 },
    pedras: { quantidade: 170, grandes: 22 },
    cristais: { quantidade: 40 },
  },

  // Alvos de treino (Etapa 0): bolhas de cristal que flutuam e estouram com um tiro.
  alvos: [
    { x: -14, z: -12, alturaExtra: 2.2 },
    { x: 18, z: -16, alturaExtra: 3.0 },
    { x: 30, z: 8, alturaExtra: 1.8 },
    { x: -26, z: 14, alturaExtra: 2.6 },
    { x: 6, z: -34, alturaExtra: 4.0 },
  ],

  // Céu (Etapa 0: a hora fica parada; o dia de 16 minutos entra na Etapa 1).
  ceu: { hora: 0.36, colosso: { direcao: -12, elevacao: 25 } },
};
