// Recorde, última dificuldade e tutorial no aparelho. Sem armazenamento, o jogo funciona igual.
export function ler(chave, padrao) {
  try {
    const v = localStorage.getItem(chave);
    return v === null ? padrao : JSON.parse(v);
  } catch {
    return padrao;
  }
}

export function gravar(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // sem armazenamento: ignora
  }
}

export const CHAVES = {
  recorde: (dif) => `ginga.recorde.${dif}`,
  ultimaDificuldade: 'ginga.ultimaDificuldade',
  tutorialVisto: 'ginga.tutorialVisto',
  modo: 'ginga.modo',
};
