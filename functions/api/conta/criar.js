// POST /api/conta/criar { apelido } -> { apelido, codigo } e já deixa a pessoa logada (cookie).
// O apelido precisa ser um dos gerados (lista em _lib/apelidos.js) e ainda estar livre.
import {
  json, lerJson, origemInvalida, prepararBanco, semBanco, codigoAleatorio, criarSessao, MAX_CONTAS_POR_HORA,
} from '../../_lib/conta.js';
import { apelidoValido } from '../../_lib/apelidos.js';

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararBanco(env.DB);
  const { apelido } = await lerJson(request);
  if (!apelidoValido(apelido)) return json({ erro: 'apelido inválido' }, 400);

  const agora = Math.floor(Date.now() / 1000);
  const recentes = await env.DB.prepare('SELECT COUNT(*) AS n FROM contas WHERE criada_em > ?').bind(agora - 3600).first();
  if (recentes.n >= MAX_CONTAS_POR_HORA) return json({ erro: 'muitas contas novas agora, tente daqui a pouco' }, 429);

  const codigo = codigoAleatorio();
  let id;
  try {
    const r = await env.DB.prepare('INSERT INTO contas (apelido, codigo, criada_em) VALUES (?, ?, ?) RETURNING id')
      .bind(apelido, codigo, agora).first();
    id = r.id;
  } catch (e) {
    if (/UNIQUE/i.test(String(e && e.message))) return json({ erro: 'apelido já escolhido' }, 409);
    throw e;
  }
  const cookie = await criarSessao(env, request, id);
  return json({ apelido, codigo }, 201, { 'set-cookie': cookie });
}
