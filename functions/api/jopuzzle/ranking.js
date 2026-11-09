// GET /api/jopuzzle/ranking[?dia=AAAA-MM-DD] -> { dia, total, top: [{ posicao, apelido, tempoMs }], eu? }
// Os 20 mais rápidos do dia. Se a pessoa estiver logada e fora do top, vem também a posição dela em "eu".
import { json, semBanco, contaAtual } from '../../_lib/conta.js';
import { diaDeHoje, prepararTentativas, posicaoDe } from '../../_lib/jopuzzle.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararTentativas(env.DB);
  const pedido = new URL(request.url).searchParams.get('dia');
  const dia = pedido && /^\d{4}-\d{2}-\d{2}$/.test(pedido) ? pedido : diaDeHoje();
  const { results } = await env.DB.prepare(
    "SELECT c.apelido, t.tempo_ms FROM jp_tentativas t JOIN contas c ON c.id = t.conta_id WHERE t.dia = ? AND t.estado = 'concluido' ORDER BY t.tempo_ms ASC, t.fim ASC LIMIT 20",
  ).bind(dia).all();
  const total = (await env.DB.prepare("SELECT COUNT(*) AS n FROM jp_tentativas WHERE dia = ? AND estado = 'concluido'").bind(dia).first()).n;
  const corpo = {
    dia,
    total,
    top: results.map((r, i) => ({ posicao: i + 1, apelido: r.apelido, tempoMs: r.tempo_ms })),
  };
  const conta = await contaAtual(request, env);
  if (conta) {
    const minha = await env.DB.prepare("SELECT tempo_ms FROM jp_tentativas WHERE conta_id = ? AND dia = ? AND estado = 'concluido'").bind(conta.id, dia).first();
    if (minha) corpo.eu = { apelido: conta.apelido, tempoMs: minha.tempo_ms, ...(await posicaoDe(env.DB, dia, minha.tempo_ms)) };
  }
  return json(corpo);
}
