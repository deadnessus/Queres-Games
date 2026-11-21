// POST /api/invasao-estelar/amigo-enviar { partida, pontos, fase, naves, tempoMs, est, nave } (precisa estar logado)
// Termina uma partida do código: confere como no ranking comum, grava no placar do código e soma o progresso.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import {
  prepararPartidas, conferirEnvio, VIDA_DA_PARTIDA_MS, progressoDa, naveValida, registrarProgresso, placarDoAmigo,
} from '../../_lib/invasao-estelar.js';
import { conferirEstatisticas } from '../../_lib/ie-progresso.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  const partida = Number(corpo.partida);
  if (!Number.isInteger(partida) || partida < 1) return json({ erro: 'partida inválida' }, 400);
  const linha = await env.DB.prepare('SELECT codigo, estado, iniciado_em FROM ie_amigo_partidas WHERE id = ? AND conta_id = ?').bind(partida, conta.id).first();
  if (!linha) return json({ erro: 'partida não encontrada' }, 404);
  if (linha.estado !== 'jogando') return json({ erro: 'essa partida já foi enviada' }, 409);
  const agora = Date.now();
  const decorrido = agora - linha.iniciado_em;
  if (decorrido > VIDA_DA_PARTIDA_MS) {
    await env.DB.prepare("UPDATE ie_amigo_partidas SET estado = 'expirada' WHERE id = ?").bind(partida).run();
    return json({ erro: 'a partida expirou' }, 410);
  }
  const motivo = conferirEnvio(corpo, decorrido);
  if (motivo) return json({ erro: motivo }, 422);
  const r = { pontos: corpo.pontos, fase: corpo.fase, naves: corpo.naves, tempoMs: corpo.tempoMs };
  const errado = conferirEstatisticas(corpo.est, r);
  if (errado) return json({ erro: errado }, 422);
  const prog = await progressoDa(env.DB, conta.id);
  const nave = naveValida(corpo.nave, prog);
  const res = await env.DB.prepare(
    "UPDATE ie_amigo_partidas SET estado = 'enviada', pontos = ?, fase = ?, naves = ?, tempo_ms = ?, nave = ?, enviado_em = ? WHERE id = ? AND estado = 'jogando'",
  ).bind(r.pontos, r.fase, r.naves, r.tempoMs, nave, agora, partida).run();
  if (!res.meta.changes) return json({ erro: 'essa partida já foi enviada' }, 409);
  const progresso = await registrarProgresso(env.DB, conta.id, r, corpo.est, { desafio: false, agora });
  const placar = await placarDoAmigo(env.DB, { codigo: linha.codigo, contaId: conta.id });
  return json({ ok: true, codigo: linha.codigo, posicao: placar.eu ? placar.eu.posicao : null, total: placar.total, faltam: placar.eu ? placar.eu.faltam : null, progresso });
}
