// Origines: o jogo salvo na conta (um por conta), para continuar em outro aparelho.
//   GET  /api/origines/save             -> { save: { era, ano, rivais, dificuldade, minutos, salvoEm, atualizadoEm } | null }
//   GET  /api/origines/save?dados=1     -> { save, dados }   (dados = o save completo, para continuar)
//   POST /api/origines/save { dados }   -> { save }          (substitui o anterior)
//   POST /api/origines/save { apagar: true } -> { save: null }  (fim de partida)
// Precisa de login (sem login: 401). Conferência e limites em functions/_lib/origines.js: só números, nada de texto livre.
import { json, contaAtual, lerJson, origemInvalida, prepararBanco, semBanco } from '../../_lib/conta.js';
import { prepararOrigines, conferirSave, linhaParaResumo } from '../../_lib/origines.js';

const comCookie = (conta) => (conta && conta.setCookie ? { 'set-cookie': conta.setCookie } : {});

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararBanco(env.DB);
  await prepararOrigines(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const comDados = new URL(request.url).searchParams.get('dados') === '1';
  const linha = await env.DB.prepare(`SELECT ${comDados ? '*' : 'era, ano, rivais, dificuldade, minutos, salvo_em, atualizado_em'} FROM or_saves WHERE conta_id = ?`).bind(conta.id).first();
  const corpo = { save: linhaParaResumo(linha) };
  if (comDados) corpo.dados = linha ? JSON.parse(linha.dados) : null;
  return json(corpo, 200, comCookie(conta));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararBanco(env.DB);
  await prepararOrigines(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const corpo = await lerJson(request);
  if (corpo.apagar === true) {
    await env.DB.prepare('DELETE FROM or_saves WHERE conta_id = ?').bind(conta.id).run();
    return json({ save: null }, 200, comCookie(conta));
  }
  const r = conferirSave(corpo.dados);
  if (r.erro) return json({ erro: r.erro }, 400, comCookie(conta));
  const agoraS = Math.floor(Date.now() / 1000), m = r.meta;
  await env.DB.prepare(
    `INSERT INTO or_saves (conta_id, dados, era, ano, rivais, dificuldade, minutos, salvo_em, atualizado_em) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(conta_id) DO UPDATE SET dados = excluded.dados, era = excluded.era, ano = excluded.ano, rivais = excluded.rivais,
       dificuldade = excluded.dificuldade, minutos = excluded.minutos, salvo_em = excluded.salvo_em, atualizado_em = excluded.atualizado_em`,
  ).bind(conta.id, r.texto, m.era, m.ano, m.rivais, m.dificuldade, m.minutos, m.salvoEm, agoraS).run();
  return json({ save: { era: m.era, ano: m.ano, rivais: m.rivais, dificuldade: m.dificuldade, minutos: m.minutos, salvoEm: m.salvoEm, atualizadoEm: agoraS } }, 200, comCookie(conta));
}
