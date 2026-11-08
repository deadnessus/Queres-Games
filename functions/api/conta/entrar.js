// POST /api/conta/entrar { apelido, codigo } -> { apelido } e cookie de sessão.
// Depois de 5 códigos errados o apelido fica bloqueado por 30 minutos (o código só tem 3 caracteres).
import {
  json, lerJson, origemInvalida, prepararBanco, semBanco, normalizarCodigo, criarSessao, MAX_ERROS, BLOQUEIO_SEG,
} from '../../_lib/conta.js';

const INCORRETO = { erro: 'apelido ou código incorreto' };

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararBanco(env.DB);
  const corpo = await lerJson(request);
  const apelido = String(corpo.apelido ?? '');
  const codigo = normalizarCodigo(corpo.codigo);

  const conta = await env.DB.prepare('SELECT id, codigo, erros, bloqueado_ate FROM contas WHERE apelido = ?').bind(apelido).first();
  if (!conta) return json(INCORRETO, 401);
  const agora = Math.floor(Date.now() / 1000);
  if (conta.bloqueado_ate > agora) {
    return json({ erro: 'muitas tentativas, espere um pouco', segundos: conta.bloqueado_ate - agora }, 429);
  }
  if (codigo !== conta.codigo) {
    const erros = conta.erros + 1;
    if (erros >= MAX_ERROS) {
      await env.DB.prepare('UPDATE contas SET erros = 0, bloqueado_ate = ? WHERE id = ?').bind(agora + BLOQUEIO_SEG, conta.id).run();
      return json({ erro: 'muitas tentativas, espere um pouco', segundos: BLOQUEIO_SEG }, 429);
    }
    await env.DB.prepare('UPDATE contas SET erros = ? WHERE id = ?').bind(erros, conta.id).run();
    return json({ ...INCORRETO, restantes: MAX_ERROS - erros }, 401);
  }
  if (conta.erros) await env.DB.prepare('UPDATE contas SET erros = 0 WHERE id = ?').bind(conta.id).run();
  const cookie = await criarSessao(env, request, conta.id);
  return json({ apelido }, 200, { 'set-cookie': cookie });
}
