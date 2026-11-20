// Origines (deadnessus/idade-da-pedra): jogo salvo na conta do site, um por conta, para continuar em outro aparelho.
//
// O save é o estado da partida em números, gerado pelo próprio jogo (src/sim/save.ts no repositório do jogo).
// O servidor não entende a partida (não há ranking nem prêmio: é o jogo da própria criança); ele só confere que é
// um save do Origines, sem texto livre e pequeno:
//  - objeto com `v` (versão do formato) e `meta` (era, ano, rivais, dificuldade, minutos de jogo, salvoEm);
//  - só números, verdadeiro/falso, listas e objetos; texto só em palavras curtas de letras minúsculas (como "playing"
//    ou "food") e chaves curtas (letras, números e _). Assim não dá para guardar mensagem nem dado pessoal;
//  - no máximo MAX_BYTES.
// Tabela própria `or_saves`, ligada a contas.id (uma linha por conta).

export const MAX_BYTES = 300_000;
export const VERSOES = [1];
const PALAVRA = /^[a-z]{1,16}$/;
const CHAVE = /^[A-Za-z0-9_]{1,24}$/;

let pronto = false;
export async function prepararOrigines(db) {
  if (pronto) return;
  await db.prepare(
    'CREATE TABLE IF NOT EXISTS or_saves (conta_id INTEGER PRIMARY KEY, dados TEXT NOT NULL, era INTEGER NOT NULL, ano INTEGER NOT NULL, rivais INTEGER NOT NULL, dificuldade INTEGER NOT NULL, minutos INTEGER NOT NULL, salvo_em INTEGER NOT NULL, atualizado_em INTEGER NOT NULL)',
  ).run();
  pronto = true;
}

const inteiro = (n, min, max) => Number.isInteger(n) && n >= min && n <= max;

/** só números, booleanos, null, listas, objetos de chaves curtas e palavras curtas (nada de texto livre) */
function soNumeros(x, nivel) {
  if (nivel > 8) return false;
  if (x === null || typeof x === 'boolean') return true;
  if (typeof x === 'number') return Number.isFinite(x);
  if (typeof x === 'string') return PALAVRA.test(x);
  if (Array.isArray(x)) { for (const v of x) if (!soNumeros(v, nivel + 1)) return false; return true; }
  if (typeof x === 'object') {
    const chaves = Object.keys(x);
    if (chaves.length > 300) return false;
    for (const k of chaves) if (!CHAVE.test(k) || !soNumeros(x[k], nivel + 1)) return false;
    return true;
  }
  return false;
}

/** confere o save vindo do jogo: { erro } ou { texto, meta } (meta já limpa para as colunas da tabela) */
export function conferirSave(dados) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) return { erro: 'save inválido' };
  if (!VERSOES.includes(dados.v)) return { erro: 'versão de save desconhecida' };
  const m = dados.meta;
  if (!m || typeof m !== 'object') return { erro: 'save sem resumo' };
  if (!inteiro(m.era, 0, 5) || !inteiro(m.year, 1, 100_000) || !inteiro(m.rivals, 1, 3) || !inteiro(m.difficulty, 0, 2) || !inteiro(m.minutes, 0, 10_000_000)) return { erro: 'resumo do save inválido' };
  const salvoEm = Number.isInteger(m.savedAt) && m.savedAt > 0 ? m.savedAt : 0;
  const texto = JSON.stringify(dados);
  if (new TextEncoder().encode(texto).length > MAX_BYTES) return { erro: 'save grande demais' };
  if (!soNumeros(dados, 0)) return { erro: 'o save só pode ter números' };
  return { texto, meta: { era: m.era, ano: m.year, rivais: m.rivals, dificuldade: m.difficulty, minutos: m.minutes, salvoEm } };
}

/** resumo para o menu do jogo (sem os dados da partida) */
export function linhaParaResumo(l) {
  if (!l) return null;
  return { era: l.era, ano: l.ano, rivais: l.rivais, dificuldade: l.dificuldade, minutos: l.minutos, salvoEm: l.salvo_em, atualizadoEm: l.atualizado_em };
}
