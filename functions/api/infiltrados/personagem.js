// Infiltrados na Órbita: o personagem de cada conta (cor, roupas da loja, créditos).
//   GET  /api/infiltrados/personagem  -> { personagem: {...} | null }        (precisa de login; sem login: 401)
//   POST /api/infiltrados/personagem  { cor, creditos, roupas, vestindo }  -> { personagem }
// Regras e limites em functions/_lib/infiltrados.js. Nada de texto livre: só números e itens da loja.
import { json, contaAtual, lerJson, origemInvalida, prepararBanco, semBanco } from '../../_lib/conta.js';
import { prepararInfiltrados, conferir, linhaParaPersonagem } from '../../_lib/infiltrados.js';

const comCookie = (conta) => (conta && conta.setCookie ? { 'set-cookie': conta.setCookie } : {});
const ler = (db, id) => db.prepare('SELECT * FROM inf_personagens WHERE conta_id = ?').bind(id).first();

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararBanco(env.DB);
  await prepararInfiltrados(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  return json({ personagem: linhaParaPersonagem(await ler(env.DB, conta.id)) }, 200, comCookie(conta));
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await prepararBanco(env.DB);
  await prepararInfiltrados(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const agoraS = Math.floor(Date.now() / 1000);
  const antes = await ler(env.DB, conta.id);
  const r = conferir(await lerJson(request), antes, agoraS);
  if (r.erro) return json({ erro: r.erro, personagem: linhaParaPersonagem(antes) }, 400, comCookie(conta));
  const ganhoEm = !antes || r.ganhou ? agoraS : antes.ganho_em;
  await env.DB.prepare(
    `INSERT INTO inf_personagens (conta_id, cor, creditos, roupas, vestindo, ganho_em, atualizado_em) VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(conta_id) DO UPDATE SET cor = excluded.cor, creditos = excluded.creditos, roupas = excluded.roupas,
       vestindo = excluded.vestindo, ganho_em = excluded.ganho_em, atualizado_em = excluded.atualizado_em`,
  ).bind(conta.id, r.cor, r.creditos, r.roupas.join(','), r.vestindo.join(','), ganhoEm, agoraS).run();
  return json({ personagem: linhaParaPersonagem(await ler(env.DB, conta.id)) }, 200, comCookie(conta));
}
