// Telemetria anônima dos jogos (Cloudflare Pages Functions + D1, binding "DB").
// Regras de privacidade (site infantil): nenhum identificador de pessoa ou de aparelho chega aqui,
// nada de IP, nome, e-mail ou texto livre, e NADA é ligado à conta de apelido. Só chegam contagens.
// Detalhes e motivos: CLAUDE.md, seção "Telemetria".
//
// Para não estourar o plano grátis (D1: 100 mil linhas gravadas por dia; Functions: 100 mil
// requisições por dia, divididas com o resto do site):
//  - o navegador manda poucos lotes por sessão (começo, e um lote ao sair/esconder a aba);
//  - cada lote vira UMA gravação "somar nos contadores" em tel_diario (jogo, dia, versão);
//  - eventos individuais só existem para erros, agrupados por "impressão digital" e com teto por dia;
//  - há um freio: passado de LIMITE_LOTES_DIA lotes no dia, os lotes novos são descartados.

export const FUSO = 'America/Sao_Paulo (UTC-3, sem horário de verão)';
export const LIMITE_LOTES_DIA = 15000; // no máximo ~3 gravações por lote => teto de ~45 mil das 100 mil/dia
export const MAX_VERSOES_POR_JOGO_DIA = 6; // versões além disso entram como "outra"
export const MAX_ERROS_DISTINTOS_POR_JOGO_DIA = 30;
export const MAX_EVENTOS_DISTINTOS_POR_JOGO_DIA = 100;
export const MAX_BYTES_LOTE = 4096;
export const MAX_BOTOES_DISTINTOS_POR_JOGO_DIA = 60; // nomes de elementos por jogo, dia e versão; o resto vira "outros"

export const CABECALHOS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
export const json = (corpo, status = 200, extra = {}) =>
  new Response(JSON.stringify(corpo), { status, headers: { ...CABECALHOS, ...extra } });

// Dia no horário de Brasília (o Brasil não tem horário de verão desde 2019: sempre UTC-3).
export const diaBrasilia = (agoraMs = Date.now()) => new Date(agoraMs - 3 * 3600 * 1000).toISOString().slice(0, 10);

export const COLUNAS_DIARIO = [
  'lotes', 'sessoes', 'aparelhos', 'novos', 'ret_1', 'ret_2a7', 'ret_8mais', 'cel', 'comp',
  'tela_1', 'tela_2', 'tela_3', 'tela_4', 'tela_5', 'tela_6',
  'tempo_s', 'm10', 'm60', 'm300', 'm900', 'erros',
];
export const MARCOS = [10, 60, 300, 900];

let bancoPronto = false;
export async function prepararBanco(db) {
  if (bancoPronto) return;
  // WITHOUT ROWID: a chave primária É a tabela; assim cada gravação conta como 1 linha (sem linha extra de índice).
  await db.batch([
    db.prepare(
      `CREATE TABLE IF NOT EXISTS tel_diario (jogo TEXT NOT NULL, dia TEXT NOT NULL, versao TEXT NOT NULL, ${COLUNAS_DIARIO.map((c) => `${c} INTEGER NOT NULL DEFAULT 0`).join(', ')}, PRIMARY KEY (jogo, dia, versao)) WITHOUT ROWID`,
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS tel_erros (jogo TEXT NOT NULL, dia TEXT NOT NULL, versao TEXT NOT NULL, impressao TEXT NOT NULL, mensagem TEXT NOT NULL, arquivo TEXT NOT NULL, linha INTEGER NOT NULL, vezes INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (jogo, dia, versao, impressao)) WITHOUT ROWID',
    ),
    // Uma linha por jogo/dia/versão com os contadores de uso de botões em JSON ({ "btn-skip": 12, ... }): 1 gravação por lote.
    db.prepare(
      "CREATE TABLE IF NOT EXISTS tel_cliques (jogo TEXT NOT NULL, dia TEXT NOT NULL, versao TEXT NOT NULL, dados TEXT NOT NULL DEFAULT '{}', PRIMARY KEY (jogo, dia, versao)) WITHOUT ROWID",
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS tel_eventos (jogo TEXT NOT NULL, dia TEXT NOT NULL, versao TEXT NOT NULL, nome TEXT NOT NULL, valor TEXT NOT NULL, vezes INTEGER NOT NULL DEFAULT 0, sessoes INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (jogo, dia, versao, nome, valor)) WITHOUT ROWID',
    ),
  ]);
  bancoPronto = true;
}

// Jogos, versões e eventos permitidos: arquivo gerado no build (scripts/pos-build.mjs).
let config = null;
export async function lerConfig(request, env) {
  if (config) return config;
  try {
    const r = await env.ASSETS.fetch(new URL('/telemetria-jogos.json', request.url));
    if (r.ok) config = await r.json();
  } catch {}
  return config || {};
}

// ---------- validação e limpeza ----------
export const SLUG = /^[a-z0-9-]{1,60}$/;
export const VERSAO = /^[A-Za-z0-9._-]{1,24}$/;
const NOME_EVENTO = /^[a-z][a-z0-9_]{1,31}$/;

export const inteiro = (v, min, max) => {
  const n = Math.trunc(Number(v));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : 0;
};

// Texto curto sem dados pessoais: tira endereços, e-mails, números longos e caracteres de controle.
export function limparTexto(texto, max = 120) {
  return String(texto ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/https?:\/\/\S+/gi, '<url>')
    .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '<email>')
    .replace(/\d{6,}/g, '<n>')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}
// Nome de elemento da tela (id ou data-...): mesmas regras do /telemetria.js e do scripts/pos-build.mjs. Nunca é o texto do botão.
export const limparNomeElemento = (t) => String(t ?? '').replace(/\d{3,}/g, '#').replace(/[^A-Za-z0-9_.:#>-]/g, '').slice(0, 32);
export const limparArquivo = (a) =>
  String(a ?? '').split(/[?#]/)[0].split('/').pop().replace(/[^A-Za-z0-9._-]/g, '').slice(0, 60);

// Valor de evento: 'chave=valor' (até 2 pares), tudo em minúsculas e curto.
function limparValorEvento(v) {
  const s = String(v ?? '');
  if (!s) return '';
  const pares = s.split(',').slice(0, 2).map((p) => {
    const [k, ...resto] = p.split('=');
    const chave = String(k).toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 16);
    const valor = resto.join('=').toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 16);
    return chave && valor ? `${chave}=${valor}` : '';
  });
  return pares.filter(Boolean).join(',');
}

async function impressao(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(buf).slice(0, 6)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Transforma o corpo do lote em algo seguro. Devolve null se não valer a pena guardar.
// Formato do lote (chaves curtas, para caber em poucos bytes):
//  j jogo, v versão,
//  i {d 'c'|'p' (celular|computador), t 1..6 (faixa de tela), n 0|1 (aparelho novo),
//     a 0|1 (primeira vez do aparelho hoje), r 0..3 (voltou depois de: 1 dia | 2-7 dias | 8+ dias)}   <- só no começo da sessão
//  a segundos ativos desde o último lote, m marcos novos [10,60,300,900],
//  e erros [{m mensagem, f arquivo, l linha}], x eventos [{n nome, v valor, c vezes, s 0|1}],
//  c cliques em botões { nome do elemento: vezes } (até 30 nomes)
export async function normalizarLote(bruto, cfgJogo) {
  const l = { jogo: null, versao: null, inicio: null, ativo: 0, marcos: [], erros: [], eventos: [], cliques: {} };
  if (!bruto || typeof bruto !== 'object') return null;
  l.versao = VERSAO.test(String(bruto.v ?? '')) ? String(bruto.v) : 'sem-versao';
  if (bruto.i && typeof bruto.i === 'object') {
    l.inicio = {
      comp: bruto.i.d === 'p',
      tela: inteiro(bruto.i.t, 1, 6),
      novo: bruto.i.n === 1 ? 1 : 0,
      ap: bruto.i.a === 1 ? 1 : 0,
      ret: inteiro(bruto.i.r, 0, 3),
    };
  }
  l.ativo = inteiro(bruto.a, 0, 1800); // um lote nunca vale mais de 30 min de tempo ativo
  if (Array.isArray(bruto.m)) l.marcos = MARCOS.filter((m) => bruto.m.includes(m));
  if (Array.isArray(bruto.e)) {
    for (const e of bruto.e.slice(0, 3)) {
      if (!e || typeof e !== 'object') continue;
      const mensagem = limparTexto(e.m) || '(sem mensagem)';
      const arquivo = limparArquivo(e.f);
      const linha = inteiro(e.l, 0, 999999);
      l.erros.push({ mensagem, arquivo, linha, impressao: await impressao(`${mensagem}|${arquivo}|${linha}`) });
    }
  }
  const permitidos = new Set(Array.isArray(cfgJogo?.eventos) ? cfgJogo.eventos : []);
  if (Array.isArray(bruto.x) && permitidos.size) {
    for (const x of bruto.x.slice(0, 20)) {
      if (!x || typeof x !== 'object') continue;
      const nome = String(x.n ?? '');
      if (!NOME_EVENTO.test(nome) || !permitidos.has(nome)) continue;
      l.eventos.push({ nome, valor: limparValorEvento(x.v), vezes: inteiro(x.c, 1, 100), sessoes: x.s === 1 ? 1 : 0 });
    }
  }
  if (bruto.c && typeof bruto.c === 'object' && !Array.isArray(bruto.c)) {
    for (const [nome, vezes] of Object.entries(bruto.c).slice(0, 30)) {
      const n = limparNomeElemento(nome) || 'sem-nome';
      const v = inteiro(vezes, 0, 999);
      if (v > 0) l.cliques[n] = Math.min(999, (l.cliques[n] || 0) + v);
    }
  }
  const vazio = !l.inicio && !l.ativo && !l.marcos.length && !l.erros.length && !l.eventos.length && !Object.keys(l.cliques).length;
  return vazio ? null : l;
}

// ---------- chave do painel ----------
// A chave fica só no segredo PAINEL_CHAVE do Cloudflare. Comparamos os SHA-256 (tempo constante).
export async function chaveValida(request, env) {
  const esperado = String(env.PAINEL_CHAVE || '');
  const enviado = (request.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim();
  if (!enviado) return false;
  const [a, b] = await Promise.all([impressaoCompleta(esperado), impressaoCompleta(enviado)]);
  let dif = a.length ^ b.length;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}
async function impressaoCompleta(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
export const chaveConfigurada = (env) => String(env.PAINEL_CHAVE || '').length >= 16;
