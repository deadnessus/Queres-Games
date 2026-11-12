// Invasão Estelar: partidas, conferência da pontuação e ranking (geral e do mês).
// Copie para functions/_lib/ do queres-games. Os números espelham src/logica.js do jogo.
import { prepararBanco } from './conta.js';

// Números do jogo (espelho de src/logica.js).
const PONTOS_NAVE_BASE = 20;
const MULT_MAX = 10;
const ENERGIA_MAX_SEG = 60;
const BONUS_POR_SEG = 10;

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
  ]);
  partidasProntas = true;
}

// "AAAA-MM" no horário de Brasília.
export function mesDe(agora = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit' })
    .format(new Date(agora))
    .slice(0, 7);
}

export const mesValido = (m) => (typeof m === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(m) ? m : null);

// Pontuação máxima possível para `naves` derrubadas, terminando na onda informada (espelho de logica.js).
// Quando o fôlego acaba a onda recomeça, então as naves se acumulam entre as fases.
export function pontosMaximos(fase, naves) {
  let bonus = 0;
  for (let k = 1; k <= fase; k++) bonus += ENERGIA_MAX_SEG * BONUS_POR_SEG * k;
  return naves * PONTOS_NAVE_BASE * Math.min(fase, MULT_MAX) + bonus;
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

// Ranking: a melhor partida de cada pessoa. `mes` = "AAAA-MM" ou null para o geral.
// Devolve o top e, se a pessoa estiver logada, a linha dela (mesmo fora do top).
const SQL_RANKING = `
WITH melhores AS (
  SELECT conta_id, pontos, fase, enviado_em,
         ROW_NUMBER() OVER (PARTITION BY conta_id ORDER BY pontos DESC, enviado_em ASC) AS rn
  FROM ie_partidas
  WHERE estado = 'enviada' AND (? IS NULL OR mes = ?)
), topo AS (
  SELECT conta_id, pontos, fase, enviado_em,
         ROW_NUMBER() OVER (ORDER BY pontos DESC, enviado_em ASC) AS posicao,
         COUNT(*) OVER () AS total
  FROM melhores WHERE rn = 1
)
SELECT t.posicao, c.apelido, t.pontos, t.fase, t.total, t.conta_id
FROM topo t JOIN contas c ON c.id = t.conta_id
WHERE t.posicao <= ? OR t.conta_id = ?
ORDER BY t.posicao`;

export async function rankingDo(db, { mes = null, contaId = 0 }) {
  const { results } = await db.prepare(SQL_RANKING).bind(mes, mes, MAX_RANKING, contaId).all();
  const linha = (r) => ({ posicao: r.posicao, apelido: r.apelido, pontos: r.pontos, fase: r.fase });
  const eu = results.find((r) => r.conta_id === contaId);
  return {
    total: results.length ? results[0].total : 0,
    top: results.filter((r) => r.posicao <= MAX_RANKING).map(linha),
    eu: eu ? linha(eu) : null,
  };
}
