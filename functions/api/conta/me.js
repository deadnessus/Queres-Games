// GET /api/conta/me -> { logado: false } ou { logado: true, apelido }
import { json, contaAtual, semBanco } from '../../_lib/conta.js';

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false });
  return json({ logado: true, apelido: conta.apelido }, 200, conta.setCookie ? { 'set-cookie': conta.setCookie } : {});
}
