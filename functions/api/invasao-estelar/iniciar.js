// POST /api/invasao-estelar/iniciar {} (precisa estar logado) -> { partida, mes }
// O relógio da partida é o do servidor: começa aqui. Uma partida por vez: a anterior aberta é descartada.
import { json, semBanco, origemInvalida, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, mesDe } from '../../_lib/invasao-estelar.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const agora = Date.now();
  const mes = mesDe(agora);
  await env.DB.prepare("UPDATE ie_partidas SET estado = 'abandonada' WHERE conta_id = ? AND estado = 'jogando'").bind(conta.id).run();
  const r = await env.DB.prepare(
    "INSERT INTO ie_partidas (conta_id, mes, iniciado_em, estado) VALUES (?, ?, ?, 'jogando')",
  ).bind(conta.id, mes, agora).run();
  return json({ partida: r.meta.last_row_id, mes });
}
