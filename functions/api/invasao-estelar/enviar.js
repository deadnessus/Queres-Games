// POST /api/invasao-estelar/enviar { partida, pontos, fase, naves, tempoMs } (precisa estar logado)
// Confere a partida (é desta conta, está aberta e não foi enviada) e a pontuação (possível para a fase,
// as naves e o tempo medido pelo servidor). Cada partida vale uma vez.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import {
  prepararPartidas, conferirEnvio, rankingDo, mesDe, VIDA_DA_PARTIDA_MS,
} from '../../_lib/invasao-estelar.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  const partida = Number(corpo.partida);
  if (!Number.isInteger(partida) || partida < 1) return json({ erro: 'partida inválida' }, 400);

  const linha = await env.DB.prepare('SELECT id, estado, iniciado_em, mes FROM ie_partidas WHERE id = ? AND conta_id = ?')
    .bind(partida, conta.id).first();
  if (!linha) return json({ erro: 'partida não encontrada' }, 404);
  if (linha.estado !== 'jogando') return json({ erro: 'essa partida já foi enviada ou não vale mais' }, 409);

  const agora = Date.now();
  const decorrido = agora - linha.iniciado_em;
  if (decorrido > VIDA_DA_PARTIDA_MS) {
    await env.DB.prepare("UPDATE ie_partidas SET estado = 'expirada' WHERE id = ?").bind(partida).run();
    return json({ erro: 'a partida expirou' }, 410);
  }
  const motivo = conferirEnvio(corpo, decorrido);
  if (motivo) return json({ erro: motivo }, 422);

  const r = await env.DB.prepare(
    "UPDATE ie_partidas SET estado = 'enviada', pontos = ?, fase = ?, naves = ?, tempo_ms = ?, enviado_em = ? WHERE id = ? AND estado = 'jogando'",
  ).bind(corpo.pontos, corpo.fase, corpo.naves, corpo.tempoMs, agora, partida).run();
  if (!r.meta.changes) return json({ erro: 'essa partida já foi enviada' }, 409);

  const geral = await rankingDo(env.DB, { mes: null, contaId: conta.id });
  const doMes = await rankingDo(env.DB, { mes: mesDe(agora), contaId: conta.id });
  return json({
    ok: true,
    pontos: corpo.pontos,
    geral: { posicao: geral.eu ? geral.eu.posicao : null, total: geral.total },
    mes: { posicao: doMes.eu ? doMes.eu.posicao : null, total: doMes.total },
  });
}
