// POST /api/invasao-estelar/desafio-iniciar {} (precisa estar logado) -> { dia, semente }
// Começa a tentativa do dia (uma por conta por dia; o relógio é do servidor e não para). Se já começou, recusa.
import { json, semBanco, origemInvalida, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, mesDe } from '../../_lib/invasao-estelar.js';
import { diaDe, sementeDoDia } from '../../_lib/ie-progresso.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const agora = Date.now();
  const dia = diaDe(agora);
  const r = await env.DB.prepare(
    "INSERT INTO ie_desafio (conta_id, dia, mes, iniciado_em, estado) VALUES (?, ?, ?, ?, 'jogando') ON CONFLICT(conta_id, dia) DO NOTHING",
  ).bind(conta.id, dia, mesDe(agora), agora).run();
  if (!r.meta.changes) return json({ erro: 'você já jogou o desafio de hoje', dia }, 409);
  return json({ dia, semente: sementeDoDia(dia) });
}
