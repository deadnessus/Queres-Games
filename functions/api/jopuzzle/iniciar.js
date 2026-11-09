// POST /api/jopuzzle/iniciar -> começa (ou continua) a tentativa de hoje. Só existe UMA por pessoa por dia:
// o relógio é do servidor e não para se a pessoa sair da página.
// Devolve o estado e, se estiver jogando, o tabuleiro: { cols, rows, alvo, pecas }.
import { json, semBanco, origemInvalida } from '../../_lib/conta.js';
import {
  diaDeHoje, exigirConta, prepararTentativas, tentativaDe, resumo, desafioDoDia, dadosDoTabuleiro, posicaoDe,
} from '../../_lib/jopuzzle.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararTentativas(env.DB);
  const { conta, resposta } = await exigirConta(request, env);
  if (resposta) return resposta;
  const dia = diaDeHoje();
  const agora = Date.now();
  await env.DB.prepare("INSERT OR IGNORE INTO jp_tentativas (conta_id, dia, inicio, estado) VALUES (?, ?, ?, 'jogando')")
    .bind(conta.id, dia, agora).run();
  const t = await tentativaDe(env.DB, conta.id, dia, agora);
  const corpo = { logado: true, apelido: conta.apelido, ...resumo(dia, t, agora) };
  if (t.estado === 'jogando') corpo.tabuleiro = dadosDoTabuleiro(desafioDoDia(dia));
  if (t.estado === 'concluido') Object.assign(corpo, await posicaoDe(env.DB, dia, t.tempo_ms));
  return json(corpo);
}
