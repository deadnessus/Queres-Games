// GET /api/jogos -> { "<slug>": n, ... } com quantas vezes cada jogo foi aberto.
// Só números; não guarda nada sobre quem jogou. Usa o banco D1 (binding "DB").
const CABECALHOS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };

export async function onRequestGet({ env }) {
  if (!env.DB) return new Response(JSON.stringify({ erro: 'contador não configurado' }), { status: 503, headers: CABECALHOS });
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS contador_jogos (slug TEXT PRIMARY KEY, valor INTEGER NOT NULL)').run();
  const { results } = await env.DB.prepare('SELECT slug, valor FROM contador_jogos').all();
  const contagens = {};
  for (const r of results) contagens[r.slug] = r.valor;
  return new Response(JSON.stringify(contagens), { headers: CABECALHOS });
}
