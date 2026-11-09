// GET /api/conta/apelidos -> { apelidos: [todos os apelidos que já têm conta] } (para a tela "Entrar").
import { json, prepararBanco, semBanco } from '../../_lib/conta.js';

export async function onRequestGet({ env }) {
  if (!env.DB) return semBanco();
  await prepararBanco(env.DB);
  const { results } = await env.DB.prepare('SELECT apelido FROM contas ORDER BY apelido COLLATE NOCASE').all();
  return json({ apelidos: results.map((r) => r.apelido) });
}
