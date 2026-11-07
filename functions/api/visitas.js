// Contador de visitas do queres.games (Cloudflare Pages Function + D1).
// GET  /api/visitas  -> { visitas: n }  (só lê)
// POST /api/visitas  -> { visitas: n }  (soma 1 e devolve o total)
// Não guarda nada sobre quem visita: só um número.
// Precisa do banco D1 ligado ao projeto com o nome "DB" (ver wrangler.jsonc).

const CABECALHOS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };

async function prepararTabela(db) {
  await db.batch([
    db.prepare('CREATE TABLE IF NOT EXISTS contador (nome TEXT PRIMARY KEY, valor INTEGER NOT NULL)'),
    db.prepare("INSERT OR IGNORE INTO contador (nome, valor) VALUES ('visitas', 0)"),
  ]);
}

export async function onRequest({ request, env }) {
  if (!env.DB) {
    return new Response(JSON.stringify({ erro: 'contador não configurado' }), { status: 503, headers: CABECALHOS });
  }
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { allow: 'GET, POST' } });
  }
  await prepararTabela(env.DB);
  const linha =
    request.method === 'POST'
      ? await env.DB.prepare("UPDATE contador SET valor = valor + 1 WHERE nome = 'visitas' RETURNING valor").first()
      : await env.DB.prepare("SELECT valor FROM contador WHERE nome = 'visitas'").first();
  return new Response(JSON.stringify({ visitas: linha ? linha.valor : 0 }), { headers: CABECALHOS });
}
