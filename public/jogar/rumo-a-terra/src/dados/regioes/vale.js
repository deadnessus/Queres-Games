// Vale da Queda: a região onde a Andorinha caiu (base central do jogo).
// Coordenadas em metros. x = leste, z = sul (no Three.js, -z é o norte). y = altura.
// O Vale DÁ A VOLTA (decisão D21): andando sempre para o mesmo lado, você volta ao mesmo lugar.
// Por isso não há paredões nas bordas e o relevo se repete a cada "tamanho" metros, sem emenda.
// Relevo, lagos, trilhas, plantas, pedras, a nave caída, alvos de treino e o chão dos lugares das missões.
export default {
  id: 'vale',
  nome: 'Vale da Queda',
  semente: 1207,
  tamanho: 512,
  passo: 2,
  nivelAgua: 0,

  terreno: {
    base: { altura: 4.5, amplitude: 10, escala: 128, detalhe: 1.4, escalaDetalhe: 21.3 },
    bordaParedao: 0, // sem paredões: o mundo dá a volta
    alturaParedao: 0,
    ops: [
      { tipo: 'achatar', x: 0, z: 0, raio: 20, borda: 26, altura: 3.2 }, // clareira da nave
      { tipo: 'lago', x: 82, z: -52, raio: 40, prof: 4.5, borda: 16 },
      { tipo: 'trilha', pontos: [[2, 10], [-18, 60], [-6, 118], [10, 170]], largura: 4.5, borda: 6 }, // rumo ao sul
      { tipo: 'trilha', pontos: [[10, -6], [44, -26], [58, -30]], largura: 3.5, borda: 5 }, // até o lago
      { tipo: 'colina', x: 104, z: 46, raio: 36, altura: 10 }, // colina da bateria (Etapa 1)
      { tipo: 'colina', x: -112, z: -70, raio: 54, altura: 16 },
      { tipo: 'colina', x: -60, z: 120, raio: 40, altura: 8 },
      { tipo: 'colina', x: 170, z: -150, raio: 70, altura: 22 }, // morro grande do outro lado do mundo
      { tipo: 'colina', x: -190, z: 190, raio: 60, altura: 14 },
      { tipo: 'lago', x: -150, z: 40, raio: 30, prof: 3.5, borda: 12 },
      { tipo: 'sulco', de: [-46, 44], ate: [-5, 5], largura: 8, prof: 1.3 }, // rastro da queda
      // lugares das missões (src/dados/locais.js): chão chato para as construções
      { tipo: 'achatar', x: -205, z: 115, raio: 16, borda: 10, altura: 5.6 }, // Base da Expedição Cruzeiro
      { tipo: 'achatar', x: -130, z: 230, raio: 18, borda: 12, altura: 4.8 }, // Ruínas dos Antigos
      { tipo: 'achatar', x: -70, z: -175, raio: 12, borda: 10, altura: 3.4 }, // Ninho dos Zumbidores
      { tipo: 'achatar', x: 170, z: -150, raio: 7, borda: 6, altura: 27.4 }, // Observatório (no alto do morro grande)
      { tipo: 'achatar', x: 150, z: 190, raio: 30, borda: 10, altura: 4.6 },
      { tipo: 'cratera', x: 150, z: 190, raio: 24, prof: 3.6, borda: 5, aba: 2.2 }, // Cratera do Núcleo
    ],
  },

  // Onde o jogador aparece e para onde olha (graus; 0 = norte, 90 = leste).
  inicio: { x: 15, z: 19, olhar: -38 },

  // A Andorinha caída. "giro" em graus (para onde o nariz aponta).
  nave: { x: 0, z: 0, giro: 50, inclinacao: 7, afundar: 0.9 },

  vegetacao: {
    gramaPena: { densidade: 0.045, maximo: 10000 }, // tufos de "grama-pena" roxa por m²
    arbustoChama: { quantidade: 440 },
    arvoreTaca: { quantidade: 230 },
    pedras: { quantidade: 300, grandes: 38 },
    cristais: { quantidade: 70 },
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
