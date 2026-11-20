// Lugares das missões no Vale (que dá a volta: x e z vão de -256 a 256). Ver docs/1 e a campanha em src/dados/missoes.js.
// Cada lugar tem um nome (aparece na bússola e no mapa) e uma "construção" feita com formas simples (src/mundo/locais.js).
export const LOCAIS = {
  nave: { nome: 'Andorinha', x: 0, z: 0 },
  colina: { nome: 'Colina da Bateria', x: 104, z: 46, construcao: 'ninhoRastejador', raio: 14 },
  ninho: { nome: 'Ninho dos Zumbidores', x: -70, z: -175, construcao: 'ninhoZumbidor', raio: 16 },
  base: { nome: 'Base da Expedição Cruzeiro', x: -205, z: 115, construcao: 'base', raio: 20 },
  cratera: { nome: 'Cratera do Núcleo', x: 150, z: 190, construcao: 'cratera', raio: 24 },
  observatorio: { nome: 'Observatório', x: 170, z: -150, construcao: 'observatorio', raio: 10 },
  vulcao: { nome: 'Pé do Vulcão', x: -30, z: 126, construcao: 'vulcao', raio: 14 }, // o cone fica ao sul (VULCAO)
  ruinas: { nome: 'Ruínas dos Antigos', x: -130, z: 230, construcao: 'ruinas', raio: 20 },
  monolito1: { nome: 'Monólito do Leste', x: 230, z: 60, construcao: 'monolito', raio: 8 },
  monolito2: { nome: 'Monólito do Oeste', x: -240, z: -60, construcao: 'monolito', raio: 8 },
  monolito3: { nome: 'Monólito do Norte', x: 40, z: -235, construcao: 'monolito', raio: 8 },
  // O esqueleto do Tavares (Expedição Cruzeiro), perto da nave, ao lado da trilha do lago. O Rifle de raio fica com ele.
  esqueleto: { nome: 'Traje antigo', x: 24, z: -8, construcao: 'esqueleto', raio: 3 },
};

// Onde o Rifle de raio fica no chão, ao lado do esqueleto.
export const RIFLE_NO_CHAO = { x: 25.6, z: -6.6 };

// Pontos onde aparecem peças espalhadas (passo "achar"). A campanha atual não usa (cada peça tem um chefe).
export const PONTOS = {};

// Montes de destroços que dão sucata (a campanha atual não usa).
export const SUCATA = [];

// O Vulcão (pedido do dono: "mais segredos, tipo um vulcão"): um cone com lava no alto e rios de lava descendo.
// Pisar na lava tira vida. O mesmo número está no relevo (src/dados/regioes/vale.js, operação "vulcao").
export const VULCAO = {
  x: -30, z: 190, raio: 60, altura: 34, crateraRaio: 10, crateraProf: 6,
  // rios de lava (do alto até o pé), [x, z] em metros
  rios: [
    [[-22, 186], [-4, 192], [12, 200], [24, 212]],
    [[-38, 194], [-56, 204], [-70, 220], [-80, 236]],
    [[-30, 200], [-28, 220], [-22, 238], [-14, 252]],
  ],
  larguraRio: 2.6,
};

// Segredos (não são obrigatórios; contam em "Segredos achados" na aba Missões). Escondidos: sem facho de luz e sem
// estrela na bússola; só brilham quando você chega perto.
export const SEGREDOS = [
  { id: 'gravador2', tipo: 'gravador', x: -213, z: 117, nome: 'Registro 2 do Tavares',
    msgs: ['🎙️ "Registro 2. Montamos a base perto do lago oeste. Somos seis cientistas. Lúmen é linda: o Colosso no céu e as plantas roxas."'] },
  { id: 'telescopio', tipo: 'telescopio', x: 170, z: -145.5, nome: 'Telescópio do Observatório', da: [['cristal', 10]],
    msgs: ['Achou o Cruzeiro do Sul! Os navegadores antigos usavam essas estrelas para achar o caminho.', '🎙️ "Registro 3. Daqui de cima dá para ver o Cruzeiro do Sul. Por isso o nome da nossa expedição."'] },
  { id: 'gravador4', tipo: 'gravador', x: -115, z: 218, nome: 'Registro 4 do Tavares',
    msgs: ['🎙️ "Registro 4. Achamos as ruínas de um povo antigo. Três monólitos de pedra escura... será que eles acendem?"'] },
  { id: 'gravador5', tipo: 'gravador', x: -8, z: 184, nome: 'Registro 5 do Tavares',
    msgs: ['🎙️ "Registro 5. O vulcão está acordando. Mandei todos voltarem para a nave. Eu fico mais um pouco para estudar os cristais..."'] },
  { id: 'coracao', tipo: 'tesouro', item: 'coracao', x: -30, z: 177, nome: 'Coração do Vulcão',
    msgs: ['Um cristal quente que pulsa como um coração! Sua vida máxima subiu de 100 para 150.'] },
  { id: 'monolitos', tipo: 'monolitos', nome: 'Os três monólitos', toques: ['monolito1', 'monolito2', 'monolito3'], item: 'pedra_antiga', da: [['cristal', 15]],
    msgs: ['Os três monólitos acenderam! Apareceu uma Pedra dos Antigos: com ela, a sua vida volta duas vezes mais rápido.'] },
];

// Onde cada peça do tipo "pegar" aparece, a partir do centro do lugar: [dx, dz, altura extra]
// (a bateria fica no ninho de gravetos, o núcleo em cima do caixote do reator, o cristal em cima do altar...).
export const PECAS_NO_LOCAL = {
  bateria: [0, 0, 0.3],
  bocal: [0, 0, 0],
  antena: [7, 7, 0],
  nucleo: [0, 0, 0.75],
  rastreador: [4.5, 1.5, 0],
  cristal_salto: [0, 0, 1.0],
  placa: [4, -3, 0],
};

// Onde os chefes aparecem, a partir do centro do lugar.
export const CHEFE_NO_LOCAL = { reiRastejador: [0, 0], rainha: [0, 0], saltitao: [-4, 2], grandeGarra: [0, 6], magma: [0, 8], guardiao: [0, 4] };

