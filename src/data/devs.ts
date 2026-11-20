export type DevId = 'jojo' | 'bento' | 'pai';

export const devs: Record<DevId, { nome: string; nomeReal: string; inicial: string; cor: string; bio: string; foto?: string; naEquipe?: boolean }> = {
  jojo: {
    nome: 'Jojô',
    nomeReal: 'Joaquim',
    inicial: 'J',
    cor: 'var(--rosa)',
    bio: '', // escreva aqui uma frase sobre o Jojô
    foto: '/devs/jojo.webp', // ilustração autorizada pelo pai
  },
  bento: {
    nome: 'Bento',
    nomeReal: 'Bento',
    inicial: 'B',
    cor: 'var(--ciano)',
    bio: '', // escreva aqui uma frase sobre o Bento
    foto: '/devs/bento.webp', // controle de videogame com o nome do Bento
  },
  // o pai dos meninos: aparece só nos créditos do card (Origines: "Feito por Bento, Jojô e Pai"), não em "Quem faz"
  pai: {
    nome: 'Pai',
    nomeReal: 'Pai',
    inicial: 'P',
    cor: 'var(--amarelo)',
    bio: '',
    naEquipe: false,
  },
};

export function creditos(autores: DevId[]): string {
  const nomes = autores.map((a) => devs[a].nome);
  // "Jojô e Bento"; com três ou mais: "Bento, Jojô e Pai"
  return nomes.length > 2 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes.join(' e ');
}
