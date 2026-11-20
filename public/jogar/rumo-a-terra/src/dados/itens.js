// Itens da mochila e receitas de criar (pedido do dono em 20/11/2026: quebrar madeira e criar itens).
// Ícones são emojis (aparecem bem no iPhone e no iPad). "colocavel" = dá para pôr no mundo.
export const ITENS = {
  madeira: { nome: 'Madeira', icone: '🪵', tipo: 'material', texto: 'Das árvores-taça. Segure ✋ mirando no tronco.' },
  fibra: { nome: 'Fibra', icone: '🌿', tipo: 'material', texto: 'Dos arbustos laranja.' },
  pedra: { nome: 'Pedra', icone: '🪨', tipo: 'material', texto: 'Das pedras pequenas. As grandes precisam de picareta.' },
  cristal: { nome: 'Cristal', icone: '💎', tipo: 'material', texto: 'Dos cristais azuis que brilham. Precisa de picareta.' },
  carne: { nome: 'Carne crua', icone: '🥩', tipo: 'comida', texto: 'De caça (Saltitos e Rastejadores). Logo vai dar para assar na fogueira.' },
  carapaca: { nome: 'Carapaça', icone: '🪲', tipo: 'material', texto: 'Dos Zumbidores. Serve para fazer armadura.' },
  sucata: { nome: 'Sucata', icone: '🔩', tipo: 'material', texto: 'Pedaços de metal dos destroços da Andorinha (perto do rastro da queda).' },
  musgo: { nome: 'Musgo-de-ar', icone: '🌱', tipo: 'material', texto: 'Um musgo que faz oxigênio com a luz. Cresce perto dos lagos.' },
  remendo: { nome: 'Placa de remendo', icone: '🪚', tipo: 'material', texto: 'Para tapar os buracos do casco da nave.' },
  armadura: { nome: 'Armadura de carapaça', icone: '🛡️', tipo: 'ferramenta', texto: 'Você usa sozinho: as mordidas e rasantes tiram menos vida.' },
  biofiltro: { nome: 'Biofiltro', icone: '🫧', tipo: 'material', texto: 'Faz ar para respirar na viagem, com o musgo-de-ar.' },
  eletrolisador: { nome: 'Eletrolisador', icone: '⚗️', tipo: 'material', texto: 'Separa a água em hidrogênio e oxigênio: combustível de foguete!' },
  // peças da nave (achadas no mundo durante as missões)
  bateria: { nome: 'Bateria principal', icone: '🔋', tipo: 'peca', texto: 'A bateria da Andorinha.' },
  bocal: { nome: 'Bocal do motor', icone: '🚀', tipo: 'peca', texto: 'O "sino" atrás do motor, que direciona o fogo.' },
  fusivel: { nome: 'Fusível', icone: '⚡', tipo: 'peca', texto: 'Da Base da Expedição Cruzeiro.' },
  antena: { nome: 'Antena de rádio', icone: '📡', tipo: 'peca', texto: 'Para falar com a Terra.' },
  nucleo: { nome: 'Núcleo do reator', icone: '⚛️', tipo: 'peca', texto: 'Energia forte o bastante para decolar.' },
  placa: { nome: 'Placa do escudo', icone: '🟧', tipo: 'peca', texto: 'Protege a nave do calor ao entrar na atmosfera da Terra.' },
  rastreador: { nome: 'Rastreador de estrelas', icone: '🔭', tipo: 'peca', texto: 'Uma câmera que reconhece as estrelas para saber o caminho.' },
  chave: { nome: 'Pedra-chave dos Antigos', icone: '🗝️', tipo: 'peca', texto: 'Abre a porta das Ruínas dos Antigos.' },
  cristal_salto: { nome: 'Cristal de Salto', icone: '💠', tipo: 'peca', texto: 'O coração do motor de salto. Com ele dá para viajar entre as estrelas.' },
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
  // receitas das missões (aparecem quando a missão chega nelas: "desde")
  { id: 'remendo', resultado: 'remendo', qtd: 1, custo: { madeira: 4, pedra: 3, fibra: 2 }, desde: 'casco' },
  { id: 'armadura', resultado: 'armadura', qtd: 1, unico: true, custo: { carapaca: 6, fibra: 6 }, desde: 'armadura' },
  { id: 'biofiltro', resultado: 'biofiltro', qtd: 1, custo: { musgo: 10, madeira: 10, cristal: 4 }, desde: 'ar' },
  { id: 'eletrolisador', resultado: 'eletrolisador', qtd: 1, custo: { sucata: 12, cristal: 10, pedra: 15 }, desde: 'combustivel' },
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
  sucata: { verbo: 'Desmontar', vida: 4, ferramenta: 'picareta', forca: 2, da: [['sucata', 2, 3]], volta: 420, lasca: 0xb8bcc6, som: 'pedra' },
};
