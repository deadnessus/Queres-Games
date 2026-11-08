// GET /api/conta/codigo -> { apelido, codigo } da conta logada (para a pessoa rever o código dela).
import { json, contaAtual, semBanco } from '../../_lib/conta.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  const conta = await contaAtual(request, env);
  if (!conta) return json({ erro: 'não logado' }, 401);
  const linha = await env.DB.prepare('SELECT codigo FROM contas WHERE id = ?').bind(conta.id).first();
  return json({ apelido: conta.apelido, codigo: linha.codigo });
}
