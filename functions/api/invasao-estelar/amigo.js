// GET /api/invasao-estelar/amigo?codigo=ABCD -> { codigo, criador, expiraEm, expirado, total, top, eu? }
// O placar de um código de desafio (a melhor partida de cada pessoa). Precisa estar logado, como para jogar.
import { json, semBanco, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, codigoAmigoValido, placarDoAmigo } from '../../_lib/invasao-estelar.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const codigo = String(new URL(request.url).searchParams.get('codigo') || '').toUpperCase();
  if (!codigoAmigoValido(codigo)) return json({ erro: 'código inválido' }, 400);
  const linha = await env.DB.prepare('SELECT a.expira_em, c.apelido FROM ie_amigo a JOIN contas c ON c.id = a.criador_id WHERE a.codigo = ?').bind(codigo).first();
  if (!linha) return json({ erro: 'não achei esse código' }, 404);
  const r = await placarDoAmigo(env.DB, { codigo, contaId: conta.id });
  const corpo = { codigo, criador: linha.apelido, expiraEm: linha.expira_em, expirado: linha.expira_em < Date.now(), total: r.total, top: r.top };
  if (r.eu) corpo.eu = r.eu;
  return json(corpo);
}
