// O mundo "dá a volta": saindo por um lado, você entra pelo outro (como andar em volta de um planeta pequeno).
// Matematicamente é um "toro": x e z se repetem a cada "tamanho" metros. Sem DOM: testável no Node.

// Leva um valor para o intervalo [-tamanho/2, tamanho/2).
export function embrulhar(v, tamanho) {
  const meio = tamanho / 2;
  return ((((v + meio) % tamanho) + tamanho) % tamanho) - meio;
}

// Diferença mais curta de a até b (pelo caminho que der a volta, se for mais perto).
export const delta = (a, b, tamanho) => embrulhar(b - a, tamanho);

// A cópia de "v" que fica mais perto de "perto" (para desenhar e testar coisas do outro lado da emenda).
export const maisPerto = (v, perto, tamanho) => perto + embrulhar(v - perto, tamanho);
