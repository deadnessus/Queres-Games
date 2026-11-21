// POST /api/invasao-estelar/enviar { partida, pontos, fase, naves, tempoMs, est?, nave? } (precisa estar logado)
// Confere a partida (é desta conta, está aberta e não foi enviada) e a pontuação (possível para a fase, as naves e o
// tempo medido pelo servidor). Cada partida vale uma vez. Com `est` (os números da partida, só números), confere
// também esses números e soma a partida ao progresso do piloto (patente, medalhas, missões da semana).
// Sem `est` (jogo antigo, ainda no cache do celular), grava só o ranking.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import {
  prepararPartidas, conferirEnvio, rankingDo, mesDe, VIDA_DA_PARTIDA_MS, progressoDa, naveValida, registrarProgresso,
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
  const r = { pontos: corpo.pontos, fase: corpo.fase, naves: corpo.naves, tempoMs: corpo.tempoMs };
  const est = corpo.est === undefined ? null : corpo.est;
  if (est !== null) {
    const errado = conferirEstatisticas(est, r);
    if (errado) return json({ erro: errado }, 422);
  }
  const prog = await progressoDa(env.DB, conta.id);
  const nave = naveValida(corpo.nave, prog);

  const res = await env.DB.prepare(
    "UPDATE ie_partidas SET estado = 'enviada', pontos = ?, fase = ?, naves = ?, tempo_ms = ?, nave = ?, enviado_em = ? WHERE id = ? AND estado = 'jogando'",
  ).bind(r.pontos, r.fase, r.naves, r.tempoMs, nave, agora, partida).run();
  if (!res.meta.changes) return json({ erro: 'essa partida já foi enviada' }, 409);

  const progresso = est ? await registrarProgresso(env.DB, conta.id, r, est, { desafio: false, agora }) : null;
  const geral = await rankingDo(env.DB, { mes: null, contaId: conta.id });
  const doMes = await rankingDo(env.DB, { mes: mesDe(agora), contaId: conta.id });
  return json({
    ok: true,
    pontos: r.pontos,
    geral: { posicao: geral.eu ? geral.eu.posicao : null, total: geral.total, recorde: geral.eu ? geral.eu.pontos : null, faltam: geral.eu ? geral.eu.faltam : null },
    mes: { posicao: doMes.eu ? doMes.eu.posicao : null, total: doMes.total },
    progresso,
  });
}
