// Itens da mochila e receitas de criar (pedido do dono em 20/11/2026: quebrar madeira e criar itens).
// Ícones são emojis (aparecem bem no iPhone e no iPad). "colocavel" = dá para pôr no mundo.
export const ITENS = {
  madeira: { nome: 'Madeira', icone: '🪵', tipo: 'material', texto: 'Das árvores-taça. Segure ✋ mirando no tronco.' },
  fibra: { nome: 'Fibra', icone: '🌿', tipo: 'material', texto: 'Dos arbustos laranja.' },
  pedra: { nome: 'Pedra', icone: '🪨', tipo: 'material', texto: 'Das pedras pequenas. As grandes precisam de picareta.' },
  cristal: { nome: 'Cristal', icone: '💎', tipo: 'material', texto: 'Dos cristais azuis que brilham. Precisa de picareta.' },
  carne: { nome: 'Carne crua', icone: '🥩', tipo: 'comida', texto: 'De caça (Saltitos e Rastejadores). Logo vai dar para assar na fogueira.' },
  carapaca: { nome: 'Carapaça', icone: '🪲', tipo: 'material', texto: 'Dos Zumbidores. Serve para fazer armadura.' },
  armadura: { nome: 'Armadura de carapaça', icone: '🛡️', tipo: 'ferramenta', texto: 'Você usa sozinho: as mordidas e rasantes tiram menos vida.' },
  // segredos
  coracao: { nome: 'Coração do Vulcão', icone: '❤️‍🔥', tipo: 'especial', texto: 'Achado no alto do Vulcão. Sua vida máxima é 150.' },
  pedra_antiga: { nome: 'Pedra dos Antigos', icone: '🔮', tipo: 'especial', texto: 'Dos três monólitos. A sua vida volta duas vezes mais rápido.' },
  // peças da nave (achadas no mundo durante as missões)
  bateria: { nome: 'Bateria principal', icone: '🔋', tipo: 'peca', texto: 'A bateria da Andorinha.' },
  bocal: { nome: 'Bocal do motor', icone: '🚀', tipo: 'peca', texto: 'O "sino" atrás do motor, que direciona o fogo.' },
  antena: { nome: 'Antena de rádio', icone: '📡', tipo: 'peca', texto: 'Para falar com a Terra.' },
  nucleo: { nome: 'Núcleo do reator', icone: '⚛️', tipo: 'peca', texto: 'Energia forte o bastante para decolar.' },
  placa: { nome: 'Placa do escudo', icone: '🟧', tipo: 'peca', texto: 'Protege a nave do calor ao entrar na atmosfera da Terra.' },
  cristal_salto: { nome: 'Cristal de Salto', icone: '💠', tipo: 'peca', texto: 'O coração do motor de salto. Com ele dá para viajar entre as estrelas.' },
  rifle: { nome: 'Rifle de raio', icone: '💥', tipo: 'arma', texto: 'Era do Tavares, da Expedição Cruzeiro. Segure o tiro: em 2 segundos ele carrega e solta um raio bem forte.' },
  machado: { nome: 'Machado de pedra', icone: '🪓', tipo: 'ferramenta', texto: 'Corta árvores bem mais rápido.' },
  picareta: { nome: 'Picareta de pedra', icone: '⛏️', tipo: 'ferramenta', texto: 'Quebra pedras grandes e cristais.' },
  fogueira: { nome: 'Fogueira', icone: '🔥', tipo: 'colocavel', texto: 'Coloque no chão: ilumina e esquenta. Depois vai servir para cozinhar.' },
  bloco_madeira: { nome: 'Bloco de madeira', icone: '📦', tipo: 'colocavel', bloco: 'madeira', texto: 'Para construir. Dá para empilhar.' },
  bloco_pedra: { nome: 'Bloco de pedra', icone: '🧱', tipo: 'colocavel', bloco: 'pedra', texto: 'Mais firme, para muros e casas.' },
  bloco_cristal: { nome: 'Bloco de cristal', icone: '🔷', tipo: 'colocavel', bloco: 'cristal', texto: 'Um bloco que brilha.' },
};

// Ordem em que aparecem na mochila.
export const ORDEM_ITENS = Object.keys(ITENS);

// Receitas: no máximo 3 ingredientes, sempre mostrando o que falta. "unico": só precisa de um (ferramentas).
export const RECEITAS = [
  { id: 'machado', resultado: 'machado', qtd: 1, unico: true, custo: { madeira: 2, pedra: 2, fibra: 1 } },
  { id: 'picareta', resultado: 'picareta', qtd: 1, unico: true, custo: { madeira: 2, pedra: 3, fibra: 1 } },
  { id: 'fogueira', resultado: 'fogueira', qtd: 1, custo: { madeira: 4, pedra: 3 } },
  { id: 'bloco_madeira', resultado: 'bloco_madeira', qtd: 2, custo: { madeira: 1 } },
  { id: 'bloco_pedra', resultado: 'bloco_pedra', qtd: 2, custo: { pedra: 2 } },
  { id: 'bloco_cristal', resultado: 'bloco_cristal', qtd: 2, custo: { cristal: 1 } },
  { id: 'armadura', resultado: 'armadura', qtd: 1, unico: true, custo: { carapaca: 6, fibra: 6 } },
  // receitas com "desde" só aparecem quando a missão chega nelas
];

// O que cada coisa do mundo dá ao quebrar e quanto custa quebrar.
//  vida: quantos "golpes" de força 1 aguenta; ferramenta: a que deixa mais rápido (força "forca");
//  exige: sem essa ferramenta não quebra; volta: segundos até crescer de novo (0 = não volta).
export const COLETA = {
  arvore: { verbo: 'Cortar', vida: 8, ferramenta: 'machado', forca: 3, da: [['madeira', 3, 4]], volta: 240, lasca: 0x8a5a3c, som: 'madeira' },
  arbusto: { verbo: 'Colher', vida: 2, da: [['fibra', 1, 2]], volta: 150, lasca: 0xf2a03c, som: 'folha' },
  pedra: { verbo: 'Quebrar', vida: 3, ferramenta: 'picareta', forca: 3, da: [['pedra', 1, 2]], volta: 360, lasca: 0x8f89a3, som: 'pedra' },
  pedraGrande: { verbo: 'Quebrar', vida: 8, exige: 'picareta', forca: 2, da: [['pedra', 4, 6]], volta: 600, lasca: 0x8f89a3, som: 'pedra' },
  cristal: { verbo: 'Quebrar', vida: 3, exige: 'picareta', forca: 1, da: [['cristal', 2, 3]], volta: 600, lasca: 0x6ff3ff, som: 'cristal' },
};
