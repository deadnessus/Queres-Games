// Invasão Estelar: partidas, conferência da pontuação, ranking (geral e do mês), progresso do piloto e desafio do dia.
// Copie para functions/_lib/ do queres-games, junto com ie-progresso.js. Os números espelham src/logica.js do jogo.
import { prepararBanco } from './conta.js';
import {
  lerProgresso, progressoNovo, somarPartida, resumoDoProgresso, patenteDo, NAVES, naveLiberada,
} from './ie-progresso.js';

// Números do jogo (espelho de src/logica.js e src/dados.js; um teste confere que o limite dá igual).
const PONTOS_NAVE_BASE = 20;
const MULT_MAX = 10;
const ENERGIA_MAX_SEG = 60;
const BONUS_POR_SEG = 10;
const COMBO_MAX = 5; // combo ×5
const NAVES_MAX_FASE = 12;
const BONUS_MULT = 2; // a onda bônus vale o dobro
const ONDAS_POR_VOLTA = 8;
const ESPECIAIS = { 4: 'meteoros', 6: 'bonus', 8: 'chefe' }; // posição da onda na volta
const CHEFE_NAVES = 4 * 5 + 25; // canhões (5 naves cada) e o chefão derrotado (25 naves), em pontos de nave da onda
const METEOROS_MAX = Math.ceil(15 / 0.35) + 1; // duração da chuva / menor intervalo entre meteoros

// Limites que o servidor confere.
export const MAX_FASE = 200;
export const MAX_TEMPO_MS = 60 * 60 * 1000; // uma hora de jogo
export const VIDA_DA_PARTIDA_MS = 3 * 60 * 60 * 1000; // a partida deixa de valer depois de 3 horas
export const FOLGA_TEMPO_MS = 5000; // folga para a rede e para o relógio do aparelho
export const MIN_TEMPO_POR_FASE_MS = 6000; // cada fase leva pelo menos isso (a faixa de abertura já dura 2 s)
export const MIN_TEMPO_POR_NAVE_MS = 250;
export const MAX_RANKING = 20;

let partidasProntas = false;
export async function prepararPartidas(db) {
  await prepararBanco(db);
  if (partidasProntas) return;
  await db.batch([
    db.prepare(
      'CREATE TABLE IF NOT EXISTS ie_partidas (id INTEGER PRIMARY KEY AUTOINCREMENT, conta_id INTEGER NOT NULL, mes TEXT NOT NULL, iniciado_em INTEGER NOT NULL, estado TEXT NOT NULL, pontos INTEGER, fase INTEGER, naves INTEGER, tempo_ms INTEGER, enviado_em INTEGER)',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_ranking ON ie_partidas (estado, mes, pontos)'),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_conta ON ie_partidas (conta_id, estado)'),
    // progresso do piloto: uma linha por conta, só números e nomes da lista de ie-progresso.js (JSON)
    db.prepare('CREATE TABLE IF NOT EXISTS ie_progresso (conta_id INTEGER PRIMARY KEY, dados TEXT NOT NULL, atualizado_em INTEGER NOT NULL)'),
    // desafio do dia: uma tentativa por conta por dia (horário de Brasília)
    db.prepare(
      'CREATE TABLE IF NOT EXISTS ie_desafio (conta_id INTEGER NOT NULL, dia TEXT NOT NULL, mes TEXT NOT NULL, iniciado_em INTEGER NOT NULL, estado TEXT NOT NULL, pontos INTEGER, fase INTEGER, naves INTEGER, tempo_ms INTEGER, nave TEXT, enviado_em INTEGER, PRIMARY KEY (conta_id, dia))',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_desafio_dia ON ie_desafio (dia, estado, pontos)'),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_desafio_mes ON ie_desafio (mes, estado)'),
    // desafie um amigo por código: o código guarda a semente (as mesmas ondas) e vale 7 dias, com placar próprio
    db.prepare('CREATE TABLE IF NOT EXISTS ie_amigo (codigo TEXT PRIMARY KEY, semente INTEGER NOT NULL, criador_id INTEGER NOT NULL, criado_em INTEGER NOT NULL, expira_em INTEGER NOT NULL)'),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_amigo_criador ON ie_amigo (criador_id, criado_em)'),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS ie_amigo_partidas (id INTEGER PRIMARY KEY AUTOINCREMENT, codigo TEXT NOT NULL, conta_id INTEGER NOT NULL, iniciado_em INTEGER NOT NULL, estado TEXT NOT NULL, pontos INTEGER, fase INTEGER, naves INTEGER, tempo_ms INTEGER, nave TEXT, enviado_em INTEGER)',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS ie_amigo_placar ON ie_amigo_partidas (codigo, estado, pontos)'),
  ]);
  // a nave usada em cada partida (coluna nova numa tabela que já existia)
  try {
    await db.prepare('ALTER TABLE ie_partidas ADD COLUMN nave TEXT').run();
  } catch (e) {
    if (!/duplicate column/i.test(String(e && e.message))) throw e;
  }
  partidasProntas = true;
}

/* ---------- progresso do piloto (regras em ie-progresso.js) ---------- */

export async function progressoDa(db, contaId) {
  const linha = await db.prepare('SELECT dados FROM ie_progresso WHERE conta_id = ?').bind(contaId).first();
  return linha ? lerProgresso(linha.dados) : progressoNovo();
}

export async function guardarProgresso(db, contaId, prog, agora = Date.now()) {
  await db.prepare(
    'INSERT INTO ie_progresso (conta_id, dados, atualizado_em) VALUES (?, ?, ?) ON CONFLICT(conta_id) DO UPDATE SET dados = excluded.dados, atualizado_em = excluded.atualizado_em',
  ).bind(contaId, JSON.stringify(prog), agora).run();
}

// Só vale uma nave da lista que a conta já liberou; senão, a Falcão.
export function naveValida(id, prog) {
  const n = NAVES.find((x) => x.id === id);
  return n && naveLiberada(n, prog) ? n.id : 'padrao';
}

// Soma a partida já conferida ao progresso da conta e guarda. Devolve o que mudou, para a tela de resultado.
export async function registrarProgresso(db, contaId, r, est, { desafio = false, agora = Date.now() } = {}) {
  const prog = await progressoDa(db, contaId);
  const mudou = somarPartida(prog, r, est, { desafio, agora });
  await guardarProgresso(db, contaId, prog, agora);
  return { ...mudou, resumo: resumoDoProgresso(prog, agora) };
}

// "AAAA-MM" no horário de Brasília.
export function mesDe(agora = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit' })
    .format(new Date(agora))
    .slice(0, 7);
}

export const mesValido = (m) => (typeof m === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(m) ? m : null);

const pontosPorNave = (fase) => PONTOS_NAVE_BASE * Math.min(fase, MULT_MAX);
const especieDaFase = (fase) => ESPECIAIS[((fase - 1) % ONDAS_POR_VOLTA) + 1] || 'normal';

// Pontuação máxima possível para `naves` derrubadas, terminando na onda informada (espelho de logica.js):
// cada nave vale no máximo o multiplicador da onda mais alta vezes o combo máximo; cada onda bônus pode dar o
// dobro para as naves dela (contando filhotes, até 3 vezes as naves da onda); cada chuva de meteoros tem no
// máximo METEOROS_MAX meteoros (meia nave cada); cada chefão dá no máximo os canhões e ele derrotado; e o bônus de
// energia de cada onda é de no máximo ENERGIA_MAX_SEG.
// Quando a energia acaba a onda recomeça, então as naves se acumulam entre as fases.
export function pontosMaximos(fase, naves) {
  let extra = 0;
  for (let k = 1; k <= fase; k++) {
    extra += ENERGIA_MAX_SEG * BONUS_POR_SEG * k;
    const especie = especieDaFase(k);
    if (especie === 'bonus') extra += 3 * NAVES_MAX_FASE * pontosPorNave(k) * COMBO_MAX * (BONUS_MULT - 1);
    if (especie === 'meteoros') extra += METEOROS_MAX * (pontosPorNave(k) / 2);
    if (especie === 'chefe') extra += CHEFE_NAVES * pontosPorNave(k);
  }
  return naves * pontosPorNave(fase) * COMBO_MAX + extra;
}

// Confere o envio. Devolve null se estiver tudo certo, ou o motivo da recusa.
// `decorridoMs` é o tempo desde o início da partida, medido aqui. O tempo do jogo não pode passar dele.
export function conferirEnvio({ pontos, fase, naves, tempoMs }, decorridoMs) {
  if (!Number.isInteger(pontos) || pontos < 0) return 'pontuação inválida';
  if (!Number.isInteger(fase) || fase < 1 || fase > MAX_FASE) return 'fase inválida';
  if (!Number.isInteger(naves) || naves < 0) return 'naves inválidas';
  if (!Number.isInteger(tempoMs) || tempoMs < 0 || tempoMs > MAX_TEMPO_MS) return 'tempo inválido';
  if (tempoMs > decorridoMs + FOLGA_TEMPO_MS) return 'tempo maior que o tempo da partida';
  if (pontos > pontosMaximos(fase, naves)) return 'pontuação impossível para essas naves';
  if (pontos < PONTOS_NAVE_BASE * naves) return 'pontuação impossível para essas naves';
  if (tempoMs < (fase - 1) * MIN_TEMPO_POR_FASE_MS + naves * MIN_TEMPO_POR_NAVE_MS) return 'rápido demais';
  return null;
}

// Linha de ranking: apelido, posição, pontos, onda, a patente (pelo progresso) e a nave usada.
const linhaDeRanking = (r) => ({
  posicao: r.posicao,
  apelido: r.apelido,
  pontos: r.pontos,
  fase: r.fase,
  patente: patenteDo(Number(r.xp) || 0),
  nave: NAVES.some((n) => n.id === r.nave) ? r.nave : 'padrao',
});

// Monta { total, top, eu } e, para quem está no ranking, quantos pontos faltam para passar o de cima.
function montarRanking(results, contaId) {
  const top = results.filter((r) => r.posicao <= MAX_RANKING).map(linhaDeRanking);
  const minha = results.find((r) => r.conta_id === contaId);
  let eu = null;
  if (minha) {
    eu = linhaDeRanking(minha);
    const acima = results.find((r) => r.posicao === minha.posicao - 1);
    eu.faltam = acima ? acima.pontos - minha.pontos + 1 : null; // null: já é o 1º
  }
  return { total: results.length ? results[0].total : 0, top, eu };
}

// Ranking: a melhor partida de cada pessoa. `mes` = "AAAA-MM" ou null para o geral.
// Devolve o top, a linha da pessoa (mesmo fora do top) e a linha logo acima dela (para o "faltam N pontos").
const SQL_RANKING = `
WITH melhores AS (
  SELECT conta_id, pontos, fase, nave, enviado_em,
         ROW_NUMBER() OVER (PARTITION BY conta_id ORDER BY pontos DESC, enviado_em ASC) AS rn
  FROM ie_partidas
  WHERE estado = 'enviada' AND (? IS NULL OR mes = ?)
), topo AS (
  SELECT conta_id, pontos, fase, nave, enviado_em,
         ROW_NUMBER() OVER (ORDER BY pontos DESC, enviado_em ASC) AS posicao,
         COUNT(*) OVER () AS total
  FROM melhores WHERE rn = 1
)
SELECT t.posicao, c.apelido, t.pontos, t.fase, t.nave, t.total, t.conta_id, json_extract(pg.dados, '$.xp') AS xp
FROM topo t JOIN contas c ON c.id = t.conta_id LEFT JOIN ie_progresso pg ON pg.conta_id = t.conta_id
WHERE t.posicao <= ? OR t.conta_id = ? OR t.posicao = (SELECT posicao - 1 FROM topo WHERE conta_id = ?)
ORDER BY t.posicao`;

export async function rankingDo(db, { mes = null, contaId = 0 }) {
  const { results } = await db.prepare(SQL_RANKING).bind(mes, mes, MAX_RANKING, contaId, contaId).all();
  return montarRanking(results, contaId);
}

/* ---------- desafie um amigo por código ---------- */

export const AMIGO_DIAS = 7;
export const AMIGO_MAX_POR_DIA = 10; // códigos novos por conta por dia
const ALFABETO_AMIGO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sem 0/O/1/I
export const codigoAmigoValido = (c) => typeof c === 'string' && /^[A-HJ-NP-Z2-9]{4}$/.test(c);

export function codigoAmigoNovo() {
  const b = crypto.getRandomValues(new Uint8Array(4));
  return Array.from(b, (x) => ALFABETO_AMIGO[x % ALFABETO_AMIGO.length]).join('');
}

// Placar do código: a melhor partida de cada pessoa.
const SQL_AMIGO = `
WITH melhores AS (
  SELECT conta_id, pontos, fase, nave, enviado_em,
         ROW_NUMBER() OVER (PARTITION BY conta_id ORDER BY pontos DESC, enviado_em ASC) AS rn
  FROM ie_amigo_partidas WHERE codigo = ? AND estado = 'enviada'
), topo AS (
  SELECT conta_id, pontos, fase, nave, enviado_em,
         ROW_NUMBER() OVER (ORDER BY pontos DESC, enviado_em ASC) AS posicao,
         COUNT(*) OVER () AS total
  FROM melhores WHERE rn = 1
)
SELECT t.posicao, c.apelido, t.pontos, t.fase, t.nave, t.total, t.conta_id, json_extract(pg.dados, '$.xp') AS xp
FROM topo t JOIN contas c ON c.id = t.conta_id LEFT JOIN ie_progresso pg ON pg.conta_id = t.conta_id
WHERE t.posicao <= ? OR t.conta_id = ? OR t.posicao = (SELECT posicao - 1 FROM topo WHERE conta_id = ?)
ORDER BY t.posicao`;

export async function placarDoAmigo(db, { codigo, contaId = 0 }) {
  const { results } = await db.prepare(SQL_AMIGO).bind(codigo, MAX_RANKING, contaId, contaId).all();
  return montarRanking(results, contaId);
}

/* ---------- desafio do dia ---------- */

// Ranking do dia: a única tentativa de cada pessoa.
const SQL_DESAFIO_DIA = `
WITH dia AS (
  SELECT conta_id, pontos, fase, nave, enviado_em,
         ROW_NUMBER() OVER (ORDER BY pontos DESC, enviado_em ASC) AS posicao,
         COUNT(*) OVER () AS total
  FROM ie_desafio WHERE dia = ? AND estado = 'enviada'
)
SELECT d.posicao, c.apelido, d.pontos, d.fase, d.nave, d.total, d.conta_id, json_extract(pg.dados, '$.xp') AS xp
FROM dia d JOIN contas c ON c.id = d.conta_id LEFT JOIN ie_progresso pg ON pg.conta_id = d.conta_id
WHERE d.posicao <= ? OR d.conta_id = ? OR d.posicao = (SELECT posicao - 1 FROM dia WHERE conta_id = ?)
ORDER BY d.posicao`;

export async function rankingDoDesafio(db, { dia, contaId = 0 }) {
  const { results } = await db.prepare(SQL_DESAFIO_DIA).bind(dia, MAX_RANKING, contaId, contaId).all();
  return montarRanking(results, contaId);
}

// Pontos do mês no desafio (como no Jopuzzle): a posição de cada dia vale 1º 10, 2º 8, 3º 6, 4º 5, 5º 4, 6º 3,
// 7º 2 e os demais 1. Desempate: mais vitórias, mais dias, mais pontos somados.
const SQL_DESAFIO_MES = `
WITH pos AS (
  SELECT conta_id, dia, pontos,
         ROW_NUMBER() OVER (PARTITION BY dia ORDER BY pontos DESC, enviado_em ASC) AS p
  FROM ie_desafio WHERE mes = ? AND estado = 'enviada'
), soma AS (
  SELECT conta_id,
         SUM(CASE p WHEN 1 THEN 10 WHEN 2 THEN 8 WHEN 3 THEN 6 WHEN 4 THEN 5 WHEN 5 THEN 4 WHEN 6 THEN 3 WHEN 7 THEN 2 ELSE 1 END) AS pts,
         SUM(CASE WHEN p = 1 THEN 1 ELSE 0 END) AS vitorias, COUNT(*) AS dias, SUM(pontos) AS soma_pontos
  FROM pos GROUP BY conta_id
), topo AS (
  SELECT conta_id, pts, dias,
         ROW_NUMBER() OVER (ORDER BY pts DESC, vitorias DESC, dias DESC, soma_pontos DESC) AS posicao,
         COUNT(*) OVER () AS total
  FROM soma
)
SELECT t.posicao, c.apelido, t.pts AS pontos, t.dias AS fase, NULL AS nave, t.total, t.conta_id, json_extract(pg.dados, '$.xp') AS xp
FROM topo t JOIN contas c ON c.id = t.conta_id LEFT JOIN ie_progresso pg ON pg.conta_id = t.conta_id
WHERE t.posicao <= ? OR t.conta_id = ? OR t.posicao = (SELECT posicao - 1 FROM topo WHERE conta_id = ?)
ORDER BY t.posicao`;

export async function rankingMensalDoDesafio(db, { mes, contaId = 0 }) {
  const { results } = await db.prepare(SQL_DESAFIO_MES).bind(mes, MAX_RANKING, contaId, contaId).all();
  const r = montarRanking(results, contaId);
  // no ranking do mês, "fase" é o número de dias jogados
  const dias = (l) => ({ ...l, dias: l.fase, fase: undefined });
  return { total: r.total, top: r.top.map(dias), eu: r.eu ? dias(r.eu) : null };
}
