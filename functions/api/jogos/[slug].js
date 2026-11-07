// POST /api/jogos/<slug> -> soma 1 vez jogada e devolve { jogo, jogadas }
// GET  /api/jogos/<slug> -> só lê.
// Só aceita jogos que existem no site (lista gerada no build em /jogos.json).
// Não guarda nada sobre quem jogou; só um número por jogo.
const CABECALHOS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const resposta = (corpo, status = 200) => new Response(JSON.stringify(corpo), { status, headers: CABECALHOS });

let jogosConhecidos = null;
async function listaDeJogos(request, env) {
  if (jogosConhecidos) return jogosConhecidos;
  const r = await env.ASSETS.fetch(new URL('/jogos.json', request.url));
  if (!r.ok) return [];
  jogosConhecidos = await r.json();
  return jogosConhecidos;
}

export async function onRequest({ request, env, params }) {
  if (!env.DB) return resposta({ erro: 'contador não configurado' }, 503);
  if (request.method !== 'GET' && request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { allow: 'GET, POST' } });
  }
  const slug = String(params.slug || '');
  if (!/^[a-z0-9-]{1,60}$/.test(slug) || !(await listaDeJogos(request, env)).includes(slug)) {
    return resposta({ erro: 'jogo desconhecido' }, 404);
  }
  await env.DB.prepare('CREATE TABLE IF NOT EXISTS contador_jogos (slug TEXT PRIMARY KEY, valor INTEGER NOT NULL)').run();
  const linha =
    request.method === 'POST'
      ? await env.DB.prepare(
          'INSERT INTO contador_jogos (slug, valor) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET valor = valor + 1 RETURNING valor',
        ).bind(slug).first()
      : await env.DB.prepare('SELECT valor FROM contador_jogos WHERE slug = ?').bind(slug).first();
  return resposta({ jogo: slug, jogadas: linha ? linha.valor : 0 });
}
