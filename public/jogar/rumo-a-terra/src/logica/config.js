// Opções do jogador (guardadas só neste aparelho). Sem DOM: a leitura e a gravação ficam em src/nucleo/config.js.

export const PADRAO = Object.freeze({
  versao: 3, // 3: o botão de atirar fica na esquerda (pedido do dono, de novo)
  sensibilidade: 5, // 1 a 10: quanto a câmera gira ao arrastar o dedo
  inverterY: false,
  visual: 'pixelado', // 'pixelado' (anos 90) ou 'liso' (low poly) — o dono escolhe mais para frente (D11)
  qualidade: 'auto', // 'auto', 'leve' ou 'bonita'
  mira: 'media', // ajuda na mira: 'forte', 'media' ou 'desligada' (nunca atira sozinho)
  botoes: 'normal', // tamanho dos botões de toque: 'normal' ou 'grande'
  atirar: 'esquerda', // lado do botão de atirar: 'esquerda' (pedido do dono) ou 'direita' (nas Opções)
  reduzirTremor: false, // tira o balanço da câmera ao andar
  volume: 7, // 0 a 10
});

const OPCOES = {
  visual: ['pixelado', 'liso'],
  qualidade: ['auto', 'leve', 'bonita'],
  mira: ['forte', 'media', 'desligada'],
  botoes: ['normal', 'grande'],
  atirar: ['esquerda', 'direita'],
};

const inteiroEntre = (v, a, b, padrao) => (Number.isInteger(v) && v >= a && v <= b ? v : padrao);

// Confere opções lidas do aparelho: qualquer valor estranho volta para o padrão.
export function validarConfig(obj) {
  const o = obj && typeof obj === 'object' ? obj : {};
  const c = { ...PADRAO };
  c.sensibilidade = inteiroEntre(o.sensibilidade, 1, 10, PADRAO.sensibilidade);
  c.volume = inteiroEntre(o.volume, 0, 10, PADRAO.volume);
  c.inverterY = o.inverterY === true;
  c.reduzirTremor = o.reduzirTremor === true;
  for (const [chave, lista] of Object.entries(OPCOES)) c[chave] = lista.includes(o[chave]) ? o[chave] : PADRAO[chave];
  // Opções guardadas antes da versão 3: o botão de atirar vai para a esquerda (o lado que o dono escolheu).
  if (o.versao !== PADRAO.versao) c.atirar = PADRAO.atirar;
  return c;
}

// Ângulo do cone de ajuda na mira (graus), por opção. "desligada" = 0.
export const ANGULO_MIRA = Object.freeze({ forte: 7, media: 4, desligada: 0 });
