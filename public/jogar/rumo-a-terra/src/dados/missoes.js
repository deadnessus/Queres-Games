// A campanha: 12 missões grandes para reconstruir a Andorinha e voltar para a Terra (pedido do dono, 20/11/2026:
// "as missões têm que ser muito grandes, têm que demorar"). Cerca de 50 passos.
//
// Tipos de passo:
//  falar     — tocar em "Falar com a ÍRIS" na porta da nave
//  ir        — chegar perto de um lugar (src/dados/locais.js)
//  derrotar  — vencer N bichos que aparecem num lugar ("bicho", "qtd", "local")
//  chefe     — vencer um chefe que aparece num lugar
//  pegar     — pegar uma peça que aparece num lugar ("item", "local")
//  achar     — pegar várias peças espalhadas ("item", pontos em PONTOS[item])
//  coletar   — ter os itens na mochila (não gasta)
//  criar     — ter o item criado na mochila (aba Criar)
//  instalar  — instalar na nave pelo Painel (gasta os itens de "precisa"), sobe o "sistema"
//  construir — ter uma fogueira perto da nave
//  esperar   — o tanque de combustível encher
//  minijogo  — calibrar o rastreador (estrelas), no Painel
//  abrir     — usar as pedras-chave na porta das Ruínas
//  decolar   — o fim!
// "msgFim" é o que a ÍRIS fala quando o passo termina. "guardas": bichos que aparecem para guardar o lugar.
export const MISSOES = [
  {
    id: 'luz', titulo: 'Luz na nave', sistema: 'energia', icone: '🔋',
    passos: [
      { tipo: 'falar', texto: 'Fale com a ÍRIS na porta da Andorinha.',
        msgFim: ['A bateria principal foi arrancada na queda, Comandante.', 'O sinal vem da colina a leste, perto do lago. Mas tem um ninho de Rastejadores lá. Cuidado!'] },
      { tipo: 'ir', local: 'colina', texto: 'Vá até a Colina da Bateria. Siga a ⭐ da bússola.' },
      { tipo: 'derrotar', bicho: 'rastejador', qtd: 4, local: 'colina', texto: 'Derrote os Rastejadores do ninho.', msgFim: ['O ninho está livre! A bateria deve estar por aqui.'] },
      { tipo: 'pegar', item: 'bateria', local: 'colina', texto: 'Pegue a bateria principal no alto da colina.' },
      { tipo: 'instalar', precisa: { bateria: 1 }, texto: 'Leve a bateria para a nave e instale (na porta, toque em "Painel da nave").',
        msgFim: ['Energia ligada! As luzes da Andorinha voltaram.', 'Meu scanner também voltou: agora a ⭐ da bússola mostra onde estão as peças.'] },
    ],
  },
  {
    id: 'casco', titulo: 'Remendar o casco', sistema: 'casco', icone: '🪚',
    passos: [
      { tipo: 'coletar', itens: { madeira: 24, pedra: 18, fibra: 8 }, texto: 'Junte madeira, pedra e fibra para os remendos.' },
      { tipo: 'criar', item: 'remendo', qtd: 4, texto: 'Na 🎒, aba Criar, faça 4 Placas de remendo.' },
      { tipo: 'instalar', precisa: { remendo: 4 }, texto: 'Instale os remendos no casco da nave.', msgFim: ['Os buracos do casco estão tapados. O ar não vai mais escapar lá em cima!'] },
      { tipo: 'construir', texto: 'Faça um acampamento: coloque uma fogueira perto da nave.', msgFim: ['Ótimo acampamento! Os Rastejadores têm medo de fogo.'] },
    ],
  },
  {
    id: 'bocal', titulo: 'O bocal do motor', sistema: 'motor', icone: '🚀',
    passos: [
      { tipo: 'ir', local: 'ninho', texto: 'O bocal do motor caiu no Ninho dos Zumbidores, ao norte. Vá até lá.',
        msgFim: ['Os Zumbidores colecionam coisas brilhantes... e levaram o nosso bocal!'] },
      { tipo: 'derrotar', bicho: 'zumbidor', qtd: 5, local: 'ninho', texto: 'Derrote os Zumbidores que guardam o ninho.' },
      { tipo: 'chefe', chefe: 'rainha', local: 'ninho', texto: 'A Rainha Zumbidora chegou! Derrote-a.', msgFim: ['A Rainha caiu! Que pontaria, Comandante!'] },
      { tipo: 'pegar', item: 'bocal', local: 'ninho', texto: 'Pegue o bocal do motor no meio do ninho.' },
      { tipo: 'instalar', precisa: { bocal: 1, pedra: 12 }, texto: 'Instale o bocal no motor (precisa de 12 pedras para prender).', msgFim: ['Motor principal no lugar!'] },
    ],
  },
  {
    id: 'antena', titulo: 'Chamando a Terra', sistema: 'comunicacao', icone: '📡',
    passos: [
      { tipo: 'ir', local: 'base', texto: 'Vá até a Base da Expedição Cruzeiro, a oeste.',
        msgFim: ['Uma base humana! A Expedição Cruzeiro esteve aqui há 60 anos.', 'Eles tinham um rádio. Procure os fusíveis e a antena.'] },
      { tipo: 'achar', item: 'fusivel', guardas: { bicho: 'rastejador', qtd: 3, local: 'base' }, texto: 'Ache os 3 fusíveis espalhados pela base.' },
      { tipo: 'pegar', item: 'antena', local: 'base', texto: 'Pegue a antena caída ao lado da torre de rádio.' },
      { tipo: 'coletar', itens: { cristal: 8 }, texto: 'Junte 8 cristais para o amplificador do rádio (precisa de picareta).' },
      { tipo: 'instalar', precisa: { antena: 1, fusivel: 3, cristal: 8 }, texto: 'Instale a antena, os fusíveis e os cristais na nave.' },
      { tipo: 'falar', texto: 'Fale com a ÍRIS para chamar a Terra.',
        msgFim: ['Terra respondendo! "Andorinha, recebemos vocês!"', '"A nave de resgate mais perto leva 2 anos para chegar..."',
          '"Mas a Expedição Cruzeiro achou cristais de salto nas Ruínas dos Antigos. Consertem a nave e voltem!"', 'Vamos conseguir, Comandante. Uma peça de cada vez.'] },
    ],
  },
  {
    id: 'armadura', titulo: 'Pronto para a luta', sistema: null, icone: '🛡️',
    passos: [
      { tipo: 'coletar', itens: { carapaca: 6 }, texto: 'Derrote Zumbidores e junte 6 carapaças.',
        msgFim: ['Com essas carapaças dá para fazer uma armadura.'] },
      { tipo: 'criar', item: 'armadura', qtd: 1, texto: 'Crie a Armadura de carapaça na 🎒 (as mordidas vão tirar menos vida).',
        msgFim: ['Armadura no corpo! Agora dá para enfrentar bichos maiores.'] },
    ],
  },
  {
    id: 'nucleo', titulo: 'Energia de verdade', sistema: 'energia', icone: '⚛️',
    passos: [
      { tipo: 'ir', local: 'cratera', texto: 'O núcleo do reator caiu numa cratera ao sudeste. Vá até lá.' },
      { tipo: 'chefe', chefe: 'grandeGarra', local: 'cratera', texto: 'A Grande Garra protege a cratera. Derrote-a!', msgFim: ['A Grande Garra foi vencida!'] },
      { tipo: 'pegar', item: 'nucleo', local: 'cratera', texto: 'Pegue o núcleo do reator no fundo da cratera.' },
      { tipo: 'coletar', itens: { cristal: 12 }, texto: 'Junte 12 cristais para ligar o núcleo.' },
      { tipo: 'instalar', precisa: { nucleo: 1, cristal: 12 }, texto: 'Instale o núcleo do reator na nave.', msgFim: ['Reator ligado! Agora temos força para decolar.'] },
    ],
  },
  {
    id: 'escudo', titulo: 'As placas do escudo', sistema: 'casco', icone: '🟧',
    passos: [
      { tipo: 'achar', item: 'placa', texto: 'Ache as 6 placas do escudo térmico espalhadas por Lúmen. A ⭐ mostra a mais perto.',
        msgFim: ['Todas as placas! Sem elas, a nave queimaria ao entrar na atmosfera da Terra.'] },
      { tipo: 'instalar', precisa: { placa: 6, pedra: 10 }, texto: 'Instale as placas do escudo (precisa de 10 pedras).' },
    ],
  },
  {
    id: 'ar', titulo: 'Ar para a viagem', sistema: 'suporte', icone: '🫧',
    passos: [
      { tipo: 'achar', item: 'musgo', texto: 'Colha 10 tufos de musgo-de-ar perto dos lagos.',
        msgFim: ['As plantas fazem oxigênio com a luz. Isso se chama fotossíntese!'] },
      { tipo: 'criar', item: 'biofiltro', qtd: 1, texto: 'Crie o Biofiltro na 🎒.' },
      { tipo: 'instalar', precisa: { biofiltro: 1 }, texto: 'Instale o biofiltro na nave.', msgFim: ['Ar garantido para a viagem inteira!'] },
    ],
  },
  {
    id: 'combustivel', titulo: 'Combustível', sistema: 'combustivel', icone: '⚗️',
    passos: [
      { tipo: 'coletar', itens: { sucata: 12 }, texto: 'Desmonte destroços da Andorinha (perto do rastro da queda) e junte 12 sucatas.' },
      { tipo: 'criar', item: 'eletrolisador', qtd: 1, texto: 'Crie o Eletrolisador na 🎒.' },
      { tipo: 'instalar', precisa: { eletrolisador: 1 }, texto: 'Instale o eletrolisador na nave.',
        msgFim: ['Ele separa a água em hidrogênio e oxigênio: é com isso que os foguetes voam!'] },
      { tipo: 'esperar', texto: 'Espere o tanque encher. Enquanto isso, explore Lúmen!', msgFim: ['Tanque cheio!'] },
    ],
  },
  {
    id: 'navegacao', titulo: 'Navegar pelas estrelas', sistema: 'navegacao', icone: '🔭',
    passos: [
      { tipo: 'ir', local: 'observatorio', texto: 'Suba o morro grande até o Observatório da expedição.' },
      { tipo: 'pegar', item: 'rastreador', local: 'observatorio', texto: 'Pegue o rastreador de estrelas no observatório.' },
      { tipo: 'instalar', precisa: { rastreador: 1 }, texto: 'Instale o rastreador na nave.' },
      { tipo: 'minijogo', texto: 'Calibre o rastreador no Painel da nave: toque nas estrelas do Cruzeiro do Sul na ordem certa.',
        msgFim: ['Calibrado! Os navegadores antigos também se guiavam pelo Cruzeiro do Sul.'] },
    ],
  },
  {
    id: 'salto', titulo: 'O cristal de salto', sistema: 'salto', icone: '💠',
    passos: [
      { tipo: 'achar', item: 'chave', guardas: { bicho: 'rastejador', qtd: 2, porPonto: true }, texto: 'Ache as 3 pedras-chave dos Antigos, uma em cada monólito.' },
      { tipo: 'ir', local: 'ruinas', texto: 'Vá até as Ruínas dos Antigos.' },
      { tipo: 'abrir', local: 'ruinas', precisa: { chave: 3 }, texto: 'Use as 3 pedras-chave na porta das ruínas.', msgFim: ['A porta abriu... alguma coisa está acordando lá dentro!'] },
      { tipo: 'chefe', chefe: 'guardiao', local: 'ruinas', texto: 'Derrote o Guardião de Cristal! Cuidado com os cristais que ele joga.', msgFim: ['O Guardião se desfez em luz!'] },
      { tipo: 'pegar', item: 'cristal_salto', local: 'ruinas', texto: 'Pegue o Cristal de Salto.' },
      { tipo: 'instalar', precisa: { cristal_salto: 1 }, texto: 'Instale o Cristal de Salto no motor de salto.', msgFim: ['O motor de salto voltou a funcionar!'] },
    ],
  },
  {
    id: 'decolar', titulo: 'Rumo à Terra', sistema: null, icone: '🌍',
    passos: [
      { tipo: 'decolar', texto: 'Tudo pronto! Vá até a nave e toque em "Decolar".' },
    ],
  },
];

// Sistemas da nave (Painel de Conserto) e quantas etapas cada um tem.
export const SISTEMAS = [
  { id: 'energia', nome: 'Energia', icone: '⚡', etapas: 2 },
  { id: 'casco', nome: 'Casco e escudo', icone: '🛡️', etapas: 2 },
  { id: 'motor', nome: 'Motor', icone: '🚀', etapas: 1 },
  { id: 'comunicacao', nome: 'Comunicação', icone: '📡', etapas: 1 },
  { id: 'suporte', nome: 'Suporte de vida', icone: '🫧', etapas: 1 },
  { id: 'combustivel', nome: 'Combustível', icone: '⚗️', etapas: 1 },
  { id: 'navegacao', nome: 'Navegação', icone: '🔭', etapas: 1 },
  { id: 'salto', nome: 'Motor de salto', icone: '💠', etapas: 1 },
];

export const TEMPO_TANQUE_S = 360; // o tanque leva 6 minutos de jogo para encher
