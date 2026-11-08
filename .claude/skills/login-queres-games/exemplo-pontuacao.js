// MODELO para a skill login-queres-games: melhor pontuação por conta + ranking de um jogo.
// Copie para functions/api/<slug>/pontuacao.js e troque PREFIXO pelo prefixo do jogo (ex.: "ilha").
//
//   GET  /api/<slug>/pontuacao  -> { top: [{ posicao, apelido, pontos }], eu?: { posicao, pontos } }
//   POST /api/<slug>/pontuacao  { pontos }  (precisa estar logado) -> { melhor, posicao }
//
// Só guarda número e conta_id. Sem nome, e-mail, IP nem texto livre.
// ATENÇÃO: aqui os "pontos" vêm do navegador, então servem para brincadeira. Se o ranking
// importar, confira a jogada no servidor (como functions/api/jopuzzle/enviar.js faz).
import { json, contaAtual, lerJson, origemInvalida, prepararBanco, semBanco } from '../../_lib/conta.js';

const PREFIXO = 'exemplo';
const TABELA = `${PREFIXO}_pontuacao`;
const MAX_PONTOS = 1_000_000; // limite do que o jogo consegue fazer

let pronto = false;
async function preparar(db) {
  await prepararBanco(db);
  if (pronto) return;
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS ${TABELA} (conta_id INTEGER PRIMARY KEY, pontos INTEGER NOT NULL, atualizado_em INTEGER NOT NULL)`,
  ).run();
  await db.prepare(`CREATE INDEX IF NOT EXISTS ${TABELA}_rank ON ${TABELA} (pontos DESC)`).run();
  pronto = true;
}

async function posicao(db, pontos) {
  const r = await db.prepare(`SELECT COUNT(*) AS acima FROM ${TABELA} WHERE pontos > ?`).bind(pontos).first();
  return r.acima + 1;
}

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await preparar(env.DB);
  const { results } = await env.DB.prepare(
    `SELECT c.apelido, p.pontos FROM ${TABELA} p JOIN contas c ON c.id = p.conta_id ORDER BY p.pontos DESC, p.atualizado_em ASC LIMIT 20`,
  ).all();
  const corpo = { top: results.map((r, i) => ({ posicao: i + 1, apelido: r.apelido, pontos: r.pontos })) };
  const conta = await contaAtual(request, env);
  if (conta) {
    const minha = await env.DB.prepare(`SELECT pontos FROM ${TABELA} WHERE conta_id = ?`).bind(conta.id).first();
    if (minha) corpo.eu = { posicao: await posicao(env.DB, minha.pontos), pontos: minha.pontos };
  }
  return json(corpo);
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return semBanco();
  if (origemInvalida(request)) return json({ erro: 'pedido recusado' }, 403);
  await preparar(env.DB);
  const conta = await contaAtual(request, env);
  if (!conta) return json({ logado: false }, 401);
  const { pontos } = await lerJson(request);
  if (!Number.isInteger(pontos) || pontos < 0 || pontos > MAX_PONTOS) return json({ erro: 'pontuação inválida' }, 400);
  const agora = Date.now();
  // guarda só se for melhor que a anterior
  await env.DB.prepare(
    `INSERT INTO ${TABELA} (conta_id, pontos, atualizado_em) VALUES (?, ?, ?)
     ON CONFLICT(conta_id) DO UPDATE SET pontos = excluded.pontos, atualizado_em = excluded.atualizado_em WHERE excluded.pontos > ${TABELA}.pontos`,
  ).bind(conta.id, pontos, agora).run();
  const melhor = (await env.DB.prepare(`SELECT pontos FROM ${TABELA} WHERE conta_id = ?`).bind(conta.id).first()).pontos;
  return json({ melhor, posicao: await posicao(env.DB, melhor) });
}
