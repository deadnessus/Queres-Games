// GET /api/conta/sugestoes -> { apelidos: [20 apelidos livres, sorteados] }
import { json, prepararBanco, semBanco } from '../../_lib/conta.js';
import { sugerir } from '../../_lib/apelidos.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return semBanco();
  await prepararBanco(env.DB);
  const { results } = await env.DB.prepare('SELECT apelido FROM contas').all();
  return json({ apelidos: sugerir(new Set(results.map((r) => r.apelido)), 20) });
}
