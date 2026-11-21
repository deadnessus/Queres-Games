// POST /api/invasao-estelar/amigo-criar {} (precisa estar logado) -> { codigo, expiraEm }
// Cria um código de 4 letras para desafiar amigos: quem tiver o código joga exatamente as mesmas ondas, quando quiser,
// durante 7 dias, com um placar só daquele código. No máximo 10 códigos novos por conta por dia.
import { json, semBanco, origemInvalida, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, codigoAmigoNovo, AMIGO_DIAS, AMIGO_MAX_POR_DIA } from '../../_lib/invasao-estelar.js';

const DIA_MS = 86400000;

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararPartidas(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const agora = Date.now();
  const hoje = await env.DB.prepare('SELECT COUNT(*) AS n FROM ie_amigo WHERE criador_id = ? AND criado_em > ?').bind(conta.id, agora - DIA_MS).first();
  if (hoje.n >= AMIGO_MAX_POR_DIA) return json({ erro: 'você já criou muitos códigos hoje; tente amanhã' }, 429);
  const semente = crypto.getRandomValues(new Uint32Array(1))[0];
  const expiraEm = agora + AMIGO_DIAS * DIA_MS;
  for (let tentativa = 0; tentativa < 5; tentativa++) {
    const codigo = codigoAmigoNovo();
    const r = await env.DB.prepare(
      'INSERT INTO ie_amigo (codigo, semente, criador_id, criado_em, expira_em) VALUES (?, ?, ?, ?, ?) ON CONFLICT(codigo) DO NOTHING',
    ).bind(codigo, semente, conta.id, agora, expiraEm).run();
    if (r.meta.changes) return json({ codigo, expiraEm });
  }
  return json({ erro: 'não consegui criar um código agora; tente de novo' }, 503);
}
