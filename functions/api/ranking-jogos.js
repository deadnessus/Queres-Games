// GET /api/ranking-jogos -> { ordem: ["slug", ...], mais_jogados: ["slug", ...], dias: 14, gerado_em }
// Ordem dos jogos no site: pelos MINUTOS realmente jogados nos últimos 14 dias (telemetria anônima, tabela tel_diario;
// tempo ativo = aba visível e com toque/clique recente). Empate: mais sessões. Quem usa: a página inicial e /jogos/
// (src/components/OrdemJogos.astro), que reordenam os cards e trocam o destaque pelo 1º da lista.
// É pública, então devolve SÓ nomes de jogos, nunca números. Jogos sem nenhum minuto ficam de fora: o site mantém
// para eles a ordem fixa do campo "ordem" do card. "mais_jogados" = os 3 primeiros com pelo menos 3 sessões no período.
// A resposta fica guardada 10 min no cache do Cloudflare (poupa o banco e as requisições do plano grátis).
import { diaBrasilia, lerConfig } from '../_lib/telemetria.js';

export const DIAS = 14;
export const MIN_SESSOES_SELO = 3;
export const QTD_SELO = 3;
const CACHE_S = 600;
const json = (corpo, status, cache) =>
  new Response(JSON.stringify(corpo), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache } });

// Ordena e escolhe os selos (separado para poder testar sem banco).
export function calcularRanking(linhas, jogosValidos) {
  const validos = new Set(jogosValidos);
  const lista = linhas
    .filter((l) => validos.has(l.jogo) && Number(l.tempo) > 0)
    .sort((a, b) => Number(b.tempo) - Number(a.tempo) || Number(b.sessoes) - Number(a.sessoes) || (a.jogo < b.jogo ? -1 : 1));
  return {
    ordem: lista.map((l) => l.jogo),
    mais_jogados: lista.filter((l) => Number(l.sessoes) >= MIN_SESSOES_SELO).slice(0, QTD_SELO).map((l) => l.jogo),
  };
}

export async function onRequestGet(context) {
  const { request, env } = context;
  if (!env.DB) return json({ erro: 'ranking indisponível' }, 503, 'no-store');
  const cache = typeof caches !== 'undefined' ? caches.default : null;
  const chave = new Request(new URL('/api/ranking-jogos', request.url).toString());
  if (cache) {
    const salvo = await cache.match(chave).catch(() => null);
    if (salvo) return salvo;
  }
  let corpo;
  try {
    const de = diaBrasilia(Date.now() - (DIAS - 1) * 86400 * 1000);
    const { results } = await env.DB
      .prepare('SELECT jogo, SUM(tempo_s) AS tempo, SUM(sessoes) AS sessoes FROM tel_diario WHERE dia >= ? GROUP BY jogo')
      .bind(de)
      .all();
    const cfg = await lerConfig(request, env);
    corpo = { ...calcularRanking(results, Object.keys(cfg)), dias: DIAS, gerado_em: new Date().toISOString() };
  } catch {
    // ainda sem a tabela (nenhuma telemetria) ou banco fora do ar: o site fica com a ordem fixa
    return json({ ordem: [], mais_jogados: [], dias: DIAS }, 200, 'no-store');
  }
  const resposta = json(corpo, 200, `public, max-age=${CACHE_S}`);
  if (cache) context.waitUntil(cache.put(chave, resposta.clone()).catch(() => {}));
  return resposta;
}
