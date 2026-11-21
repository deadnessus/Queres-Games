// POST /api/invasao-estelar/desafio-enviar { dia, pontos, fase, naves, tempoMs, est, nave } (precisa estar logado)
// Termina a tentativa do dia: confere a pontuação (como no ranking comum) e os números da partida, grava e soma ao
// progresso do piloto. Devolve a posição no ranking do dia.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import {
  prepararPartidas, conferirEnvio, VIDA_DA_PARTIDA_MS, progressoDa, naveValida, registrarProgresso, rankingDoDesafio,
} from '../../_lib/invasao-estelar.js';
import { conferirEstatisticas } from '../../_lib/ie-progresso.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  const dia = typeof corpo.dia === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(corpo.dia) ? corpo.dia : null;
  if (!dia) return json({ erro: 'dia inválido' }, 400);
  const linha = await env.DB.prepare('SELECT estado, iniciado_em FROM ie_desafio WHERE conta_id = ? AND dia = ?').bind(conta.id, dia).first();
  if (!linha) return json({ erro: 'desafio não encontrado' }, 404);
  if (linha.estado !== 'jogando') return json({ erro: 'esse desafio já foi enviado' }, 409);
  const agora = Date.now();
  const decorrido = agora - linha.iniciado_em;
  if (decorrido > VIDA_DA_PARTIDA_MS) {
    await env.DB.prepare("UPDATE ie_desafio SET estado = 'expirada' WHERE conta_id = ? AND dia = ?").bind(conta.id, dia).run();
    return json({ erro: 'o desafio expirou' }, 410);
  }
  const motivo = conferirEnvio(corpo, decorrido);
  if (motivo) return json({ erro: motivo }, 422);
  const r = { pontos: corpo.pontos, fase: corpo.fase, naves: corpo.naves, tempoMs: corpo.tempoMs };
  const errado = conferirEstatisticas(corpo.est, r);
  if (errado) return json({ erro: errado }, 422);
  const prog = await progressoDa(env.DB, conta.id);
  const nave = naveValida(corpo.nave, prog);
  const res = await env.DB.prepare(
    "UPDATE ie_desafio SET estado = 'enviada', pontos = ?, fase = ?, naves = ?, tempo_ms = ?, nave = ?, enviado_em = ? WHERE conta_id = ? AND dia = ? AND estado = 'jogando'",
  ).bind(r.pontos, r.fase, r.naves, r.tempoMs, nave, agora, conta.id, dia).run();
  if (!res.meta.changes) return json({ erro: 'esse desafio já foi enviado' }, 409);
  const progresso = await registrarProgresso(env.DB, conta.id, r, corpo.est, { desafio: true, agora });
  const ranking = await rankingDoDesafio(env.DB, { dia, contaId: conta.id });
  return json({
    ok: true,
    dia,
    pontos: r.pontos,
    posicao: ranking.eu ? ranking.eu.posicao : null,
    total: ranking.total,
    faltam: ranking.eu ? ranking.eu.faltam : null,
    progresso,
  });
}
