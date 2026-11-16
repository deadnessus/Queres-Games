// POST /api/telemetria  -> recebe um lote anônimo de contagens de um jogo e SOMA nos contadores do dia.
// Quem chama é o /telemetria.js que o build coloca nas páginas de /jogar/<slug>/ (scripts/pos-build.mjs).
// Não lê cookie, não guarda IP, não tem identificador de aparelho nem de conta. Ver functions/_lib/telemetria.js.
// Responde 204 mesmo quando descarta o lote (o jogo nunca precisa tentar de novo); 503 sem o banco.
import { origemInvalida } from '../_lib/conta.js';
import {
  COLUNAS_DIARIO, LIMITE_LOTES_DIA, MAX_BYTES_LOTE, MAX_ERROS_DISTINTOS_POR_JOGO_DIA, MAX_EVENTOS_DISTINTOS_POR_JOGO_DIA,
  MAX_BOTOES_DISTINTOS_POR_JOGO_DIA, MAX_VERSOES_POR_JOGO_DIA, SLUG, diaBrasilia, json, lerConfig, normalizarLote, prepararBanco,
} from '../_lib/telemetria.js';

const vazio = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } });

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { allow: 'POST' } });
  if (!env.DB) return json({ erro: 'telemetria não configurada' }, 503);
  if (origemInvalida(request)) return json({ erro: 'origem inválida' }, 403);

  const texto = await request.text();
  if (texto.length > MAX_BYTES_LOTE) return vazio();
  let bruto;
  try { bruto = JSON.parse(texto); } catch { return vazio(); }

  const cfg = await lerConfig(request, env);
  const jogo = String(bruto?.j ?? '');
  if (!SLUG.test(jogo) || !Object.prototype.hasOwnProperty.call(cfg, jogo)) return vazio();
  const lote = await normalizarLote(bruto, cfg[jogo]);
  if (!lote) return vazio();

  try {
    await prepararBanco(env.DB);
    const db = env.DB;
    const dia = diaBrasilia();

    // Leituras baratas: freio diário e limites de versões. (D1 grátis: 5 milhões de leituras por dia.)
    const estado = await db
      .prepare(
        `SELECT (SELECT COALESCE(SUM(lotes), 0) FROM tel_diario WHERE dia = ?1) AS lotes_dia,
                (SELECT COUNT(*) FROM tel_diario WHERE jogo = ?2 AND dia = ?1) AS versoes,
                (SELECT COUNT(*) FROM tel_diario WHERE jogo = ?2 AND dia = ?1 AND versao = ?3) AS existe`,
      )
      .bind(dia, jogo, lote.versao)
      .first();
    if (estado.lotes_dia >= (Number(env.TELEMETRIA_LIMITE_LOTES) || LIMITE_LOTES_DIA)) return vazio(); // freio: protege as gravações das contas e rankings
    const versao = !estado.existe && estado.versoes >= MAX_VERSOES_POR_JOGO_DIA ? 'outra' : lote.versao;

    const delta = Object.fromEntries(COLUNAS_DIARIO.map((c) => [c, 0]));
    delta.lotes = 1;
    delta.tempo_s = lote.ativo;
    delta.erros = lote.erros.length;
    for (const m of lote.marcos) delta[`m${m}`] = 1;
    if (lote.inicio) {
      const i = lote.inicio;
      delta.sessoes = 1;
      delta[i.comp ? 'comp' : 'cel'] = 1;
      if (i.tela) delta[`tela_${i.tela}`] = 1;
      delta.aparelhos = i.ap;
      delta.novos = i.novo;
      if (i.ret === 1) delta.ret_1 = 1;
      if (i.ret === 2) delta.ret_2a7 = 1;
      if (i.ret === 3) delta.ret_8mais = 1;
    }
    const cols = COLUNAS_DIARIO;
    const comandos = [
      db
        .prepare(
          `INSERT INTO tel_diario (jogo, dia, versao, ${cols.join(', ')}) VALUES (?, ?, ?, ${cols.map(() => '?').join(', ')})
           ON CONFLICT (jogo, dia, versao) DO UPDATE SET ${cols.map((c) => `${c} = ${c} + excluded.${c}`).join(', ')}`,
        )
        .bind(jogo, dia, versao, ...cols.map((c) => delta[c])),
    ];

    if (lote.erros.length) {
      const { results } = await db.prepare('SELECT versao, impressao FROM tel_erros WHERE jogo = ? AND dia = ?').bind(jogo, dia).all();
      const conhecidos = new Set(results.map((r) => `${r.versao}|${r.impressao}`));
      let distintos = results.length;
      for (const e of lote.erros) {
        const chave = `${versao}|${e.impressao}`;
        if (!conhecidos.has(chave)) {
          if (distintos >= MAX_ERROS_DISTINTOS_POR_JOGO_DIA) continue; // teto por jogo e dia: o resto só entra no contador
          conhecidos.add(chave);
          distintos++;
        }
        comandos.push(
          db
            .prepare(
              `INSERT INTO tel_erros (jogo, dia, versao, impressao, mensagem, arquivo, linha, vezes) VALUES (?, ?, ?, ?, ?, ?, ?, 1)
               ON CONFLICT (jogo, dia, versao, impressao) DO UPDATE SET vezes = vezes + 1`,
            )
            .bind(jogo, dia, versao, e.impressao, e.mensagem, e.arquivo, e.linha),
        );
      }
    }

    if (lote.eventos.length) {
      const { results } = await db.prepare('SELECT versao, nome, valor FROM tel_eventos WHERE jogo = ? AND dia = ?').bind(jogo, dia).all();
      const conhecidos = new Set(results.map((r) => `${r.versao}|${r.nome}|${r.valor}`));
      let distintos = results.length;
      for (const e of lote.eventos) {
        let valor = e.valor;
        let chave = `${versao}|${e.nome}|${valor}`;
        if (!conhecidos.has(chave)) {
          if (distintos >= MAX_EVENTOS_DISTINTOS_POR_JOGO_DIA) { valor = 'outros'; chave = `${versao}|${e.nome}|outros`; }
          if (!conhecidos.has(chave)) { conhecidos.add(chave); distintos++; }
        }
        comandos.push(
          db
            .prepare(
              `INSERT INTO tel_eventos (jogo, dia, versao, nome, valor, vezes, sessoes) VALUES (?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT (jogo, dia, versao, nome, valor) DO UPDATE SET vezes = vezes + excluded.vezes, sessoes = sessoes + excluded.sessoes`,
            )
            .bind(jogo, dia, versao, e.nome, valor, e.vezes, e.sessoes),
        );
      }
    }

    if (Object.keys(lote.cliques).length) {
      // Nomes novos só entram até o teto (o resto soma em "outros"); a soma com o que já existe é feita no banco (json_each),
      // de uma vez só, então dois lotes ao mesmo tempo não perdem contagem.
      const atual = await db.prepare('SELECT dados FROM tel_cliques WHERE jogo = ? AND dia = ? AND versao = ?').bind(jogo, dia, versao).first();
      let conhecidos = {};
      try { conhecidos = atual ? JSON.parse(atual.dados) : {}; } catch { conhecidos = {}; }
      let distintos = Object.keys(conhecidos).length;
      const novos = {};
      for (const [nome, vezes] of Object.entries(lote.cliques)) {
        let n = nome;
        if (!(n in conhecidos) && !(n in novos)) {
          if (distintos >= MAX_BOTOES_DISTINTOS_POR_JOGO_DIA) n = 'outros'; else distintos++;
        }
        novos[n] = (novos[n] || 0) + vezes;
      }
      comandos.push(
        db
          .prepare(
            `INSERT INTO tel_cliques (jogo, dia, versao, dados) VALUES (?1, ?2, ?3, ?4)
             ON CONFLICT (jogo, dia, versao) DO UPDATE SET dados = (
               SELECT json_group_object(k, s) FROM (
                 SELECT k, SUM(v) AS s FROM (
                   SELECT key AS k, value AS v FROM json_each(tel_cliques.dados)
                   UNION ALL
                   SELECT key, value FROM json_each(excluded.dados)
                 ) GROUP BY k
               )
             )`,
          )
          .bind(jogo, dia, versao, JSON.stringify(novos)),
      );
    }

    await db.batch(comandos);
    return vazio();
  } catch {
    return json({ erro: 'não foi possível guardar agora' }, 503);
  }
}
