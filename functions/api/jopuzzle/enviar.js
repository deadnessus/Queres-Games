// POST /api/jopuzzle/enviar { colocacoes: [{ id, cels: [[x, y], ...] }, ...] }
// Confere a solução e o tempo (medido pelo servidor, do /iniciar até agora). Vale uma vez por dia.
import { json, semBanco, origemInvalida, lerJson } from '../../_lib/conta.js';
import {
  diaDeHoje, exigirConta, prepararTentativas, tentativaDe, desafioDoDia, solucaoValida, posicaoDe,
  LIMITE_MS, TOLERANCIA_MS, MINIMO_MS,
} from '../../_lib/jopuzzle.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararTentativas(env.DB);
  const { conta, resposta } = await exigirConta(request, env);
  if (resposta) return resposta;
  const agora = Date.now();
  // Quem começou antes da meia-noite (Brasília) e termina depois ainda envia o desafio que começou.
  let dia = diaDeHoje();
  let t = await tentativaDe(env.DB, conta.id, dia, agora);
  if (!t || t.estado !== 'jogando') {
    const aberta = await env.DB.prepare("SELECT dia FROM jp_tentativas WHERE conta_id = ? AND estado = 'jogando' ORDER BY inicio DESC LIMIT 1").bind(conta.id).first();
    if (aberta) {
      dia = aberta.dia;
      t = await tentativaDe(env.DB, conta.id, dia, agora);
    }
  }
  if (!t) return json({ erro: 'você ainda não começou o desafio de hoje' }, 409);
  if (t.estado === 'concluido') return json({ erro: 'desafio de hoje já concluído', tempoMs: t.tempo_ms }, 409);
  if (t.estado === 'expirado') return json({ erro: 'o tempo acabou', estado: 'expirado' }, 410);

  const { colocacoes } = await lerJson(request);
  if (!solucaoValida(desafioDoDia(dia), colocacoes)) return json({ erro: 'solução inválida' }, 400);
  const tempoMs = agora - t.inicio;
  if (tempoMs > LIMITE_MS + TOLERANCIA_MS) return json({ erro: 'o tempo acabou', estado: 'expirado' }, 410);
  if (tempoMs < MINIMO_MS) return json({ erro: 'rápido demais' }, 422);

  const r = await env.DB.prepare(
    "UPDATE jp_tentativas SET estado = 'concluido', fim = ?, tempo_ms = ? WHERE conta_id = ? AND dia = ? AND estado = 'jogando'",
  ).bind(agora, tempoMs, conta.id, dia).run();
  if (!r.meta.changes) return json({ erro: 'desafio de hoje já concluído' }, 409);
  return json({ ok: true, dia, tempoMs, ...(await posicaoDe(env.DB, dia, tempoMs)) });
}
