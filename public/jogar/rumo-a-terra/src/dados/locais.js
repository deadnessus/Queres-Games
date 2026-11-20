// Lugares das missões no Vale (que dá a volta: x e z vão de -256 a 256). Ver docs/1 e a campanha em src/dados/missoes.js.
// Cada lugar tem um nome (aparece na bússola e no mapa) e uma "construção" feita com formas simples (src/mundo/locais.js).
export const LOCAIS = {
  nave: { nome: 'Andorinha', x: 0, z: 0 },
  colina: { nome: 'Colina da Bateria', x: 104, z: 46, construcao: 'ninhoRastejador', raio: 14 },
  ninho: { nome: 'Ninho dos Zumbidores', x: -70, z: -175, construcao: 'ninhoZumbidor', raio: 16 },
  base: { nome: 'Base da Expedição Cruzeiro', x: -205, z: 115, construcao: 'base', raio: 20 },
  cratera: { nome: 'Cratera do Núcleo', x: 150, z: 190, construcao: 'cratera', raio: 24 },
  observatorio: { nome: 'Observatório', x: 170, z: -150, construcao: 'observatorio', raio: 10 },
  ruinas: { nome: 'Ruínas dos Antigos', x: -130, z: 230, construcao: 'ruinas', raio: 20 },
  monolito1: { nome: 'Monólito do Leste', x: 230, z: 60, construcao: 'monolito', raio: 8 },
  monolito2: { nome: 'Monólito do Oeste', x: -240, z: -60, construcao: 'monolito', raio: 8 },
  monolito3: { nome: 'Monólito do Norte', x: 40, z: -235, construcao: 'monolito', raio: 8 },
  // O esqueleto do Tavares (Expedição Cruzeiro), perto da nave, ao lado da trilha do lago. O Rifle de raio fica com ele.
  esqueleto: { nome: 'Traje antigo', x: 24, z: -8, construcao: 'esqueleto', raio: 3 },
};

// Onde o Rifle de raio fica no chão, ao lado do esqueleto.
export const RIFLE_NO_CHAO = { x: 25.6, z: -6.6 };

// Pontos onde aparecem peças espalhadas (só durante a missão que precisa delas).
export const PONTOS = {
  fusivel: [[-190, 104], [-221, 128], [-212, 96]],
  placa: [[60, 120], [-110, -60], [200, -230], [-180, -150], [125, -95], [-30, 160]],
  musgo: [[130, -40], [118, -10], [70, -100], [40, -60], [95, -2], [-115, 52], [-150, 78], [-186, 34], [-128, 8], [-170, 0]],
  chave: [[233, 63], [-237, -57], [43, -232]],
};

// Montes de destroços da Andorinha (dão sucata), perto do rastro da queda e da nave.
export const SUCATA = [[-34, 30], [-26, 24], [-40, 40], [-18, 14], [-48, 34], [-30, 44], [12, -14], [-14, -12], [20, 10], [-44, 22]];

// Onde cada peça do tipo "pegar" aparece, a partir do centro do lugar: [dx, dz, altura extra]
// (a bateria fica no ninho de gravetos, o núcleo em cima do caixote do reator, o cristal em cima do altar...).
export const PECAS_NO_LOCAL = {
  bateria: [0, 0, 0.3],
  bocal: [0, 0, 0],
  antena: [7, 7, 0],
  nucleo: [0, 0, 0.75],
  rastreador: [4.5, 1.5, 0],
  cristal_salto: [0, 0, 1.0],
};

// Onde os chefes aparecem, a partir do centro do lugar.
export const CHEFE_NO_LOCAL = { rainha: [0, 0], grandeGarra: [0, 6], guardiao: [0, 4] };

