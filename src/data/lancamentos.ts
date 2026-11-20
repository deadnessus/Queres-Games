import { getCollection } from 'astro:content';

// Dia em que cada jogo chegou ao site: o campo "lancamento" do card ou, sem ele, a data do 1º post do blog com
// "jogo: <slug>". Usado na etiqueta NOVO (src/components/OrdemJogos.astro). Jogo sem nenhum dos dois: sem data.
export async function lancamentos(): Promise<Record<string, string>> {
  const posts = await getCollection('blog');
  const primeiro: Record<string, Date> = {};
  for (const p of posts) {
    const j = p.data.jogo;
    if (j && (!primeiro[j] || p.data.data < primeiro[j])) primeiro[j] = p.data.data;
  }
  const jogos = await getCollection('jogos');
  const out: Record<string, string> = {};
  for (const j of jogos) {
    const d = j.data.lancamento ?? primeiro[j.id];
    if (d) out[j.id] = d.toISOString();
  }
  return out;
}
