// GET /api/jopuzzle/desafio -> estado do desafio de hoje para quem está logado.
//   { logado: true, apelido, dia, estado: 'novo' | 'jogando' | 'concluido' | 'expirado', limiteMs,
//     restanteMs?, tempoMs?, posicao?, total? }
// Não devolve o tabuleiro: ele só sai em POST /api/jopuzzle/iniciar.
import { json, semBanco } from '../../_lib/conta.js';
import { diaDeHoje, exigirConta, prepararTentativas, tentativaDe, resumo, posicaoDe } from '../../_lib/jopuzzle.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararTentativas(env.DB);
  const { conta, resposta } = await exigirConta(request, env);
  if (resposta) return resposta;
  const dia = diaDeHoje();
  const t = await tentativaDe(env.DB, conta.id, dia);
  const estado = { logado: true, apelido: conta.apelido, ...resumo(dia, t) };
  if (t && t.estado === 'concluido') Object.assign(estado, await posicaoDe(env.DB, dia, t.tempo_ms));
  return json(estado, 200, conta.setCookie ? { 'set-cookie': conta.setCookie } : {});
}
