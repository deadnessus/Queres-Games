// GET /api/invasao-estelar/ranking?escopo=geral|mes[&mes=AAAA-MM]
//   -> { escopo, mes, total, top: [{ posicao, apelido, pontos, fase }], eu? }
// Público (não precisa de login). Com login, "eu" traz a linha da pessoa mesmo fora do top 20.
import { json, semBanco, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, rankingDo, mesDe, mesValido } from '../../_lib/invasao-estelar.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararPartidas(env.DB);
  const url = new URL(request.url);
  const escopo = url.searchParams.get('escopo') === 'mes' ? 'mes' : 'geral';
  const mes = escopo === 'mes' ? (mesValido(url.searchParams.get('mes')) || mesDe()) : null;
  const conta = await contaAtual(request, env);
  const r = await rankingDo(env.DB, { mes, contaId: conta ? conta.id : 0 });
  const corpo = { escopo, mes, total: r.total, top: r.top };
  if (r.eu) corpo.eu = r.eu;
  return json(corpo);
}
