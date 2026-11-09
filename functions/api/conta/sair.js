// POST /api/conta/sair -> apaga a sessão deste aparelho.
import { json, origemInvalida, prepararBanco, semBanco, apagarSessao, cookieDeSessao } from '../../_lib/conta.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararBanco(env.DB);
  await apagarSessao(request, env);
  return json({ ok: true }, 200, { 'set-cookie': cookieDeSessao(request, '', 0) });
}
