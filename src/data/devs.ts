export type DevId = 'jojo' | 'bento';

export const devs: Record<DevId, { nome: string; nomeReal: string; inicial: string; cor: string; bio: string }> = {
  jojo: {
    nome: 'Jojô',
    nomeReal: 'Joaquim',
    inicial: 'J',
    cor: 'var(--rosa)',
    bio: '', // escreva aqui uma frase sobre o Jojô
  },
  bento: {
    nome: 'Bento',
    nomeReal: 'Bento',
    inicial: 'B',
    cor: 'var(--ciano)',
    bio: '', // escreva aqui uma frase sobre o Bento
  },
};

export function creditos(autores: DevId[]): string {
  return autores.map((a) => devs[a].nome).join(' e ');
}
