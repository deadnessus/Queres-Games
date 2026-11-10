// GET /api/jopuzzle/ranking-mensal[?mes=AAAA-MM]
//   -> { mes, mesAtual, total, pontosPorPosicao, pontosParticipacao,
//        top: [{ posicao, apelido, pontos, dias, vitorias }], eu? }
// Soma, no mês (horário de Brasília), os pontos que cada pessoa fez nos desafios do dia:
// a posição de cada dia (mais rápido primeiro) vale PONTOS_POR_POSICAO; depois da 7ª, 1 ponto.
// Desempate: mais vitórias, mais dias jogados, menor tempo total. Vêm os 20 primeiros e, se a pessoa
// estiver logada e tiver jogado no mês, a linha dela em "eu".
import { json, semBanco, contaAtual } from '../../_lib/conta.js';
import {
  diaDeHoje, prepararTentativas, mesValido, mesSeguinte, PONTOS_POR_POSICAO, PONTOS_PARTICIPACAO,
} from '../../_lib/jopuzzle.js';

// Só números das constantes entram no texto do SQL; nada que venha do pedido.
const PONTOS_SQL = `CASE ${PONTOS_POR_POSICAO.map((p, i) => `WHEN pos = ${i + 1} THEN ${p}`).join(' ')} ELSE ${PONTOS_PARTICIPACAO} END`;
const SQL = `
WITH r AS (
  SELECT conta_id, tempo_ms, RANK() OVER (PARTITION BY dia ORDER BY tempo_ms ASC) AS pos
  FROM jp_tentativas
  WHERE estado = 'concluido' AND dia >= ?1 AND dia < ?2
), agg AS (
  SELECT conta_id, SUM(${PONTOS_SQL}) AS pontos, COUNT(*) AS dias, SUM(CASE WHEN pos = 1 THEN 1 ELSE 0 END) AS vitorias, SUM(tempo_ms) AS tempo
  FROM r GROUP BY conta_id
), ord AS (
  SELECT conta_id, pontos, dias, vitorias,
         ROW_NUMBER() OVER (ORDER BY pontos DESC, vitorias DESC, dias DESC, tempo ASC, conta_id ASC) AS posicao,
         COUNT(*) OVER () AS total
  FROM agg
)
SELECT o.posicao, c.apelido, o.pontos, o.dias, o.vitorias, o.total, o.conta_id
FROM ord o JOIN contas c ON c.id = o.conta_id
WHERE o.posicao <= 20 OR o.conta_id = ?3
ORDER BY o.posicao`;

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararTentativas(env.DB);
  const mesAtual = diaDeHoje().slice(0, 7);
  const mes = mesValido(new URL(request.url).searchParams.get('mes')) || mesAtual;
  const conta = await contaAtual(request, env);
  const { results } = await env.DB.prepare(SQL).bind(`${mes}-01`, `${mesSeguinte(mes)}-01`, conta ? conta.id : 0).all();
  const linha = (r) => ({ posicao: r.posicao, apelido: r.apelido, pontos: r.pontos, dias: r.dias, vitorias: r.vitorias });
  const corpo = {
    mes,
    mesAtual,
    total: results.length ? results[0].total : 0,
    pontosPorPosicao: PONTOS_POR_POSICAO,
    pontosParticipacao: PONTOS_PARTICIPACAO,
    top: results.filter((r) => r.posicao <= 20).map(linha),
  };
  const minha = conta && results.find((r) => r.conta_id === conta.id);
  if (minha) corpo.eu = linha(minha);
  return json(corpo);
}
