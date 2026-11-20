// A campanha: 7 missões para reconstruir a Andorinha e voltar para a Terra.
// Pedido do dono (20/11/2026): um jogo mais curto, e cada peça da nave fica com um alien grande (um chefe)
// que é preciso vencer para pegar a peça. Cerca de 28 passos. Os segredos (que não são obrigatórios) ficam em
// src/dados/locais.js (SEGREDOS).
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
//  instalar  — instalar na nave pelo Painel (gasta os itens de "precisa"), conserta o "sistema"
//  construir — ter uma fogueira perto da nave
//  esperar   — o tanque de combustível encher
//  minijogo  — calibrar o rastreador (estrelas), no Painel
//  abrir     — abrir a porta das Ruínas ("precisa": itens que a porta pede; sem "precisa", abre com um toque)
//  decolar   — o fim!
// "msgFim" é o que a ÍRIS fala quando o passo termina.
export const VERSAO_CAMPANHA = 2; // 1: a campanha de 12 missões; 2: 7 missões, um chefe por peça

export const MISSOES = [
  {
    id: 'luz', titulo: 'Luz na nave', sistema: 'energia', icone: '🔋',
    passos: [
      { tipo: 'falar', texto: 'Fale com a ÍRIS na porta da Andorinha.',
        msgFim: ['A bateria principal foi arrancada na queda, Comandante.', 'O sinal vem da colina a leste. Mas tem um bicho enorme lá: o Rei Rastejador! Cuidado.'] },
      { tipo: 'ir', local: 'colina', texto: 'Vá até a Colina da Bateria. Siga a ⭐ da bússola.' },
      { tipo: 'chefe', chefe: 'reiRastejador', local: 'colina', texto: 'O Rei Rastejador guarda a bateria! Derrote-o (ele chama outros Rastejadores).',
        msgFim: ['O Rei Rastejador caiu! A bateria deve estar no ninho.'] },
      { tipo: 'pegar', item: 'bateria', local: 'colina', texto: 'Pegue a bateria principal no ninho do alto da colina.' },
      { tipo: 'instalar', precisa: { bateria: 1 }, texto: 'Leve a bateria para a nave e instale (na porta, toque em "Painel da nave").',
        msgFim: ['Energia ligada! As luzes da Andorinha voltaram.', 'Meu scanner também voltou: a ⭐ da bússola mostra onde estão as peças. Cada peça tem um alien grande perto...'] },
    ],
  },
  {
    id: 'bocal', titulo: 'O bocal do motor', sistema: 'motor', icone: '🚀',
    passos: [
      { tipo: 'ir', local: 'ninho', texto: 'O bocal do motor caiu no Ninho dos Zumbidores, ao norte. Vá até lá.',
        msgFim: ['Os Zumbidores colecionam coisas brilhantes... e a Rainha deles pegou o nosso bocal!'] },
      { tipo: 'chefe', chefe: 'rainha', local: 'ninho', texto: 'A Rainha Zumbidora chegou! Derrote-a (atire quando ela vier em você).', msgFim: ['A Rainha caiu! Que pontaria, Comandante!'] },
      { tipo: 'pegar', item: 'bocal', local: 'ninho', texto: 'Pegue o bocal do motor no meio do ninho.' },
      { tipo: 'instalar', precisa: { bocal: 1 }, texto: 'Instale o bocal no motor da nave.', msgFim: ['Motor principal no lugar! E a fumaça parou.'] },
    ],
  },
  {
    id: 'antena', titulo: 'Chamando a Terra', sistema: 'comunicacao', icone: '📡',
    passos: [
      { tipo: 'ir', local: 'base', texto: 'Vá até a Base da Expedição Cruzeiro, a oeste.',
        msgFim: ['Uma base humana! A Expedição Cruzeiro esteve aqui há 60 anos.'] },
      { tipo: 'chefe', chefe: 'saltitao', local: 'base', texto: 'Um Saltitão gigante tomou conta da base! Saia de perto quando ele pular.',
        msgFim: ['Ufa! O Saltitão caiu. A base está livre.'] },
      { tipo: 'pegar', item: 'antena', local: 'base', texto: 'Pegue a antena de rádio ao lado da torre.' },
      { tipo: 'instalar', precisa: { antena: 1 }, texto: 'Instale a antena na nave.' },
      { tipo: 'falar', texto: 'Fale com a ÍRIS para chamar a Terra.',
        msgFim: ['Terra respondendo! "Andorinha, recebemos vocês!"', '"Consertem a nave e voltem! As Ruínas dos Antigos guardam um Cristal de Salto."', 'Vamos conseguir, Comandante. Uma peça de cada vez.'] },
    ],
  },
  {
    id: 'nucleo', titulo: 'Energia de verdade', sistema: 'reator', icone: '⚛️',
    passos: [
      { tipo: 'ir', local: 'cratera', texto: 'O núcleo do reator caiu numa cratera ao sudeste. Vá até lá.' },
      { tipo: 'chefe', chefe: 'grandeGarra', local: 'cratera', texto: 'A Grande Garra protege a cratera! Saia da frente quando ela abaixar para dar a investida.', msgFim: ['A Grande Garra foi vencida!'] },
      { tipo: 'pegar', item: 'nucleo', local: 'cratera', texto: 'Pegue o núcleo do reator no fundo da cratera.' },
      { tipo: 'instalar', precisa: { nucleo: 1 }, texto: 'Instale o núcleo do reator na nave.', msgFim: ['Reator ligado! Agora temos força para decolar.'] },
    ],
  },
  {
    id: 'escudo', titulo: 'O escudo de fogo', sistema: 'escudo', icone: '🌋',
    passos: [
      { tipo: 'ir', local: 'vulcao', texto: 'A placa do escudo caiu no pé do Vulcão, ao sul. Siga a trilha!',
        msgFim: ['Que calor! Não pise na lava, Comandante.'] },
      { tipo: 'chefe', chefe: 'magma', local: 'vulcao', texto: 'O Gigante de Magma! Desvie das bolas de fogo e atire.', msgFim: ['O Gigante de Magma esfriou e virou pedra!'] },
      { tipo: 'pegar', item: 'placa', local: 'vulcao', texto: 'Pegue a placa do escudo térmico.' },
      { tipo: 'instalar', precisa: { placa: 1 }, texto: 'Instale a placa do escudo na nave.',
        msgFim: ['Escudo térmico pronto: a nave não vai queimar ao entrar na atmosfera da Terra.'] },
    ],
  },
  {
    id: 'salto', titulo: 'O cristal de salto', sistema: 'salto', icone: '💠',
    passos: [
      { tipo: 'ir', local: 'ruinas', texto: 'Vá até as Ruínas dos Antigos, longe ao sudoeste.' },
      { tipo: 'abrir', local: 'ruinas', texto: 'Toque na porta grande das Ruínas para abrir.', msgFim: ['A porta abriu... alguma coisa está acordando lá dentro!'] },
      { tipo: 'chefe', chefe: 'guardiao', local: 'ruinas', texto: 'Derrote o Guardião de Cristal! Desvie dos cristais que ele joga.', msgFim: ['O Guardião se desfez em luz!'] },
      { tipo: 'pegar', item: 'cristal_salto', local: 'ruinas', texto: 'Pegue o Cristal de Salto no altar.' },
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

// Sistemas da nave (Painel da nave): um por peça.
export const SISTEMAS = [
  { id: 'energia', nome: 'Energia', icone: '🔋', etapas: 1 },
  { id: 'motor', nome: 'Motor', icone: '🚀', etapas: 1 },
  { id: 'comunicacao', nome: 'Rádio', icone: '📡', etapas: 1 },
  { id: 'reator', nome: 'Reator', icone: '⚛️', etapas: 1 },
  { id: 'escudo', nome: 'Escudo', icone: '🛡️', etapas: 1 },
  { id: 'salto', nome: 'Motor de salto', icone: '💠', etapas: 1 },
];

export const TEMPO_TANQUE_S = 360; // para o passo "esperar" (não usado nesta campanha)
