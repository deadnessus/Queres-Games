// GET  /api/invasao-estelar/progresso -> patente, experiência, medalhas, missões da semana e naves liberadas
// POST /api/invasao-estelar/progresso { nave?, cor? } -> escolhe a nave (só das liberadas) e a cor (da lista)
// Precisa estar logado. Só números e nomes da lista de ie-progresso.js: nada de texto livre.
import { json, semBanco, origemInvalida, lerJson, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, progressoDa, guardarProgresso, naveValida } from '../../_lib/invasao-estelar.js';
import { resumoDoProgresso, CORES } from '../../_lib/ie-progresso.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const prog = await progressoDa(env.DB, conta.id);
  return json(resumoDoProgresso(prog));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  const prog = await progressoDa(env.DB, conta.id);
  if (corpo.nave !== undefined) {
    if (naveValida(corpo.nave, prog) !== corpo.nave) return json({ erro: 'nave ainda não liberada' }, 422);
    prog.nave = corpo.nave;
  }
  if (corpo.cor !== undefined) {
    if (!CORES.includes(corpo.cor)) return json({ erro: 'cor inválida' }, 422);
    prog.cor = corpo.cor;
  }
  await guardarProgresso(env.DB, conta.id, prog);
  return json(resumoDoProgresso(prog));
}
