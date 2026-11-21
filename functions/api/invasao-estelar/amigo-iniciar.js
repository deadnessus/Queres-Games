// POST /api/invasao-estelar/amigo-iniciar { codigo } (precisa estar logado) -> { partida, semente, codigo }
// Começa uma partida com as ondas do código (o relógio é do servidor, como no ranking). Vale enquanto o código vale.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, codigoAmigoValido } from '../../_lib/invasao-estelar.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  const codigo = String(corpo.codigo || '').toUpperCase();
  if (!codigoAmigoValido(codigo)) return json({ erro: 'código inválido' }, 400);
  const linha = await env.DB.prepare('SELECT semente, expira_em FROM ie_amigo WHERE codigo = ?').bind(codigo).first();
  if (!linha) return json({ erro: 'não achei esse código' }, 404);
  const agora = Date.now();
  if (linha.expira_em < agora) return json({ erro: 'esse código já venceu (valia 7 dias)' }, 410);
  await env.DB.prepare("UPDATE ie_amigo_partidas SET estado = 'abandonada' WHERE conta_id = ? AND estado = 'jogando'").bind(conta.id).run();
  const r = await env.DB.prepare(
    "INSERT INTO ie_amigo_partidas (codigo, conta_id, iniciado_em, estado) VALUES (?, ?, ?, 'jogando')",
  ).bind(codigo, conta.id, agora).run();
  return json({ partida: r.meta.last_row_id, semente: linha.semente, codigo });
}
