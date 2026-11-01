export type DevId = 'jojo' | 'bento';

export const devs: Record<DevId, { nome: string; nomeReal: string; inicial: string; cor: string; bio: string }> = {
  jojo: {
    nome: 'Jojô',
    nomeReal: 'Joaquim',
    inicial: 'J',
    cor: 'var(--rosa)',
    bio: '[Uma frase sobre o Jojô: o que faz nos jogos, o que mais gosta.]',
  },
  bento: {
    nome: 'Bento',
    nomeReal: 'Bento',
    inicial: 'B',
    cor: 'var(--ciano)',
    bio: '[Uma frase sobre o Bento: o que faz nos jogos, o que mais gosta.]',
  },
};

export function creditos(autores: DevId[]): string {
  return autores.map((a) => devs[a].nome).join(' e ');
}
