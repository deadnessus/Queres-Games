// Desafio diário do JoPuzzle: regras do dia, tentativa única e conferência da solução.
import { DESAFIOS } from './jopuzzle-desafios.js';
import { json, contaAtual, prepararBanco } from './conta.js';

export const LIMITE_MS = 600 * 1000; // tempo para resolver
export const TOLERANCIA_MS = 5 * 1000; // folga para a rede
export const MINIMO_MS = 4 * 1000; // mais rápido que isso não é humano
const PRIMEIRO_DIA = '2026-11-09';

// "Hoje" vale no horário de Brasília: o desafio troca à meia-noite de lá.
export function diaDeHoje(agora = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' })
    .format(new Date(agora));
}

export function desafioDoDia(dia) {
  const dias = Math.round((Date.parse(`${dia}T00:00:00Z`) - Date.parse(`${PRIMEIRO_DIA}T00:00:00Z`)) / 86400000);
  const n = DESAFIOS.length;
  return DESAFIOS[((dias % n) + n) % n];
}

let tabelasProntas = false;
export async function prepararTentativas(db) {
  await prepararBanco(db);
  if (tabelasProntas) return;
  await db.batch([
    db.prepare(
      'CREATE TABLE IF NOT EXISTS jp_tentativas (conta_id INTEGER NOT NULL, dia TEXT NOT NULL, inicio INTEGER NOT NULL, fim INTEGER, tempo_ms INTEGER, estado TEXT NOT NULL, PRIMARY KEY (conta_id, dia))',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS jp_ranking ON jp_tentativas (dia, estado, tempo_ms)'),
  ]);
  tabelasProntas = true;
}

// Exige login. Devolve { conta } ou { resposta } (um 401 pronto).
export async function exigirConta(request, env) {
  const conta = await contaAtual(request, env);
  if (!conta) return { resposta: json({ logado: false }, 401) };
  return { conta };
}

// Estado da tentativa de hoje; marca como expirada se o tempo já passou.
export async function tentativaDe(db, contaId, dia, agora = Date.now()) {
  const t = await db.prepare('SELECT inicio, fim, tempo_ms, estado FROM jp_tentativas WHERE conta_id = ? AND dia = ?').bind(contaId, dia).first();
  if (!t) return null;
  if (t.estado === 'jogando' && agora > t.inicio + LIMITE_MS + TOLERANCIA_MS) {
    await db.prepare("UPDATE jp_tentativas SET estado = 'expirado' WHERE conta_id = ? AND dia = ? AND estado = 'jogando'").bind(contaId, dia).run();
    t.estado = 'expirado';
  }
  return t;
}

export async function posicaoDe(db, dia, tempoMs) {
  const r = await db.prepare("SELECT COUNT(*) AS antes FROM jp_tentativas WHERE dia = ? AND estado = 'concluido' AND tempo_ms < ?").bind(dia, tempoMs).first();
  const t = await db.prepare("SELECT COUNT(*) AS total FROM jp_tentativas WHERE dia = ? AND estado = 'concluido'").bind(dia).first();
  return { posicao: r.antes + 1, total: t.total };
}

export function resumo(dia, t, agora = Date.now()) {
  if (!t) return { dia, estado: 'novo', limiteMs: LIMITE_MS };
  const base = { dia, estado: t.estado, limiteMs: LIMITE_MS };
  if (t.estado === 'jogando') base.restanteMs = Math.max(0, t.inicio + LIMITE_MS - agora);
  if (t.estado === 'concluido') base.tempoMs = t.tempo_ms;
  return base;
}

export const dadosDoTabuleiro = (d) => ({ cols: d.cols, rows: d.rows, alvo: d.alvo, pecas: d.pecas });

// ---- conferência da solução ----
// Forma "canônica" de uma peça: a menor entre as 8 posições (4 giros, com e sem espelho).
export function canonico(cells) {
  let melhor = null;
  let atual = cells.map(([x, y]) => [x, y]);
  for (let espelho = 0; espelho < 2; espelho++) {
    for (let giro = 0; giro < 4; giro++) {
      atual = atual.map(([x, y]) => [-y, x]);
      const mx = Math.min(...atual.map((c) => c[0]));
      const my = Math.min(...atual.map((c) => c[1]));
      const s = JSON.stringify(atual.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]));
      if (melhor === null || s < melhor) melhor = s;
    }
    atual = atual.map(([x, y]) => [-x, y]);
  }
  return melhor;
}

// Cada peça do desafio precisa aparecer uma vez, com o mesmo formato (girada ou espelhada), dentro da
// silhueta e sem sobrepor outra. Como as áreas batem, cobrir tudo é consequência.
export function solucaoValida(desafio, colocacoes) {
  if (!Array.isArray(colocacoes) || colocacoes.length !== desafio.pecas.length) return false;
  const alvo = new Set(desafio.alvo.map(([x, y]) => `${x},${y}`));
  const usadas = new Set();
  const vistas = new Set();
  for (const c of colocacoes) {
    const peca = desafio.pecas.find((p) => p.id === (c && c.id));
    if (!peca || vistas.has(peca.id) || !Array.isArray(c.cels) || c.cels.length !== peca.cells.length) return false;
    vistas.add(peca.id);
    for (const celula of c.cels) {
      if (!Array.isArray(celula) || celula.length !== 2 || !celula.every(Number.isInteger)) return false;
      const k = `${celula[0]},${celula[1]}`;
      if (!alvo.has(k) || usadas.has(k)) return false;
      usadas.add(k);
    }
    if (canonico(c.cels) !== canonico(peca.cells)) return false;
  }
  return usadas.size === alvo.size;
}
