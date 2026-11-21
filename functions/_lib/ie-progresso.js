// Progresso do piloto (Etapa 3): patentes, medalhas, missões da semana, naves do hangar e a semente do desafio do
// dia. Sem tela e sem banco, sem imports: o MESMO arquivo roda no jogo (src/progresso.js) e no servidor do site
// (servidor/functions/_lib/ie-progresso.js); um teste confere que as duas cópias são iguais.
// Só números e nomes desta lista: nada de texto livre de quem joga.

export const ONDAS_POR_VOLTA = 8;
export const POSICAO_METEOROS = 4; // posição da chuva de meteoros na volta (dados.js do jogo)
export const POSICAO_CHEFE = 8;
export const METEOROS_MAX = 44; // meteoros de uma chuva, no máximo (dados.js do jogo)
export const NUM_TIPOS = 10; // tipos de inimigo
export const NUM_CHEFES = 3;
export const CAPSULAS_IDS = ['duplo', 'leque', 'escudo', 'energia', 'lento', 'bomba'];

/* ---------- patentes ---------- */

export const PATENTES = [
  { id: 'cadete', nome: 'Cadete', xp: 0 },
  { id: 'aspirante', nome: 'Aspirante', xp: 400 },
  { id: 'tenente', nome: 'Tenente', xp: 1200 },
  { id: 'capitao', nome: 'Capitão', xp: 3000 },
  { id: 'major', nome: 'Major', xp: 6000 },
  { id: 'coronel', nome: 'Coronel', xp: 10000 },
  { id: 'comandante', nome: 'Comandante', xp: 16000 },
  { id: 'almirante', nome: 'Almirante', xp: 25000 },
];

export function patenteDo(xp) {
  let i = 0;
  while (i + 1 < PATENTES.length && xp >= PATENTES[i + 1].xp) i++;
  return i;
}

// Experiência de uma partida já conferida: 1 por 100 pontos, 15 por onda e 50 por chefão (no máximo 1500).
export function xpDaPartida(r, est) {
  return Math.min(1500, Math.floor(r.pontos / 100) + 15 * r.fase + 50 * somar(est.chefesPorTipo));
}

/* ---------- naves do hangar (o traço de cada uma fica em dados.js do jogo) ---------- */

export const NAVES = [
  { id: 'padrao', nome: 'Falcão', traco: 'Equilibrada', requisito: null },
  { id: 'flecha', nome: 'Flecha', traco: 'Mais rápida', requisito: { patente: 'tenente' } },
  { id: 'guardia', nome: 'Guardiã', traco: 'Começa com escudo', requisito: { medalha: 'primeiro-chefao' } },
  { id: 'rajada', nome: 'Rajada', traco: 'Atira mais rápido', requisito: { patente: 'capitao' } },
  { id: 'cometa', nome: 'Cometa', traco: 'Energia dura mais', requisito: { medalha: 'onda-20' } },
];

export const CORES_COM_CONTA = ['dourada']; // presente de boas-vindas
export const CORES = ['azul', 'vermelha', 'verde', 'roxa', 'laranja', 'dourada'];

export function naveLiberada(nave, prog) {
  const r = nave.requisito;
  if (!r) return true;
  if (!prog) return false;
  if (r.patente) return patenteDo(prog.xp) >= PATENTES.findIndex((p) => p.id === r.patente);
  if (r.medalha) return prog.medalhas.includes(r.medalha);
  return false;
}

export function textoDoRequisito(nave) {
  const r = nave.requisito;
  if (!r) return '';
  if (r.patente) return `Patente ${PATENTES.find((p) => p.id === r.patente).nome}`;
  return `Medalha "${MEDALHAS.find((m) => m.id === r.medalha).nome}"`;
}

/* ---------- medalhas ---------- */

// `ganha(c)`: c = { r (resultado da partida), est (números da partida), t (totais da conta, já somando a partida),
// desafio (a partida foi o desafio do dia), semanaCompleta (completou as 3 missões agora) }.
export const MEDALHAS = [
  { id: 'piloto-registrado', nome: 'Piloto registrado', texto: 'Criou a conta do site.', ganha: () => true },
  { id: 'primeira-partida', nome: 'Primeira partida', texto: 'Terminou a primeira partida com conta.', ganha: (c) => c.t.partidas >= 1 },
  { id: 'onda-5', nome: 'Onda 5', texto: 'Chegou à onda 5.', ganha: (c) => c.r.fase >= 5 },
  { id: 'onda-10', nome: 'Onda 10', texto: 'Chegou à onda 10.', ganha: (c) => c.r.fase >= 10 },
  { id: 'onda-20', nome: 'Onda 20', texto: 'Chegou à onda 20.', ganha: (c) => c.r.fase >= 20 },
  { id: 'onda-30', nome: 'Onda 30', texto: 'Chegou à onda 30.', ganha: (c) => c.r.fase >= 30 },
  { id: 'primeiro-chefao', nome: 'Primeiro chefão', texto: 'Derrotou um chefão.', ganha: (c) => somar(c.t.chefes) >= 1 },
  { id: 'tres-chefoes', nome: 'Caçador de chefões', texto: 'Derrotou os três chefões.', ganha: (c) => c.t.chefes.every((n) => n >= 1) },
  { id: 'sem-arranhao', nome: 'Sem arranhão', texto: 'Chegou à onda 5 sem perder nave.', ganha: (c) => c.r.fase >= 5 && (c.est.primeiraPerda === 0 || c.est.primeiraPerda >= 5) },
  { id: 'combo-5', nome: 'Combo ×5', texto: 'Fez um combo ×5.', ganha: (c) => c.est.maiorCombo >= 5 },
  { id: 'os-dez', nome: 'Os dez', texto: 'Derrubou os 10 tipos de inimigo.', ganha: (c) => c.t.tipos === (1 << NUM_TIPOS) - 1 },
  { id: 'mil-naves', nome: 'Mil naves', texto: 'Derrubou 1.000 naves no total.', ganha: (c) => c.t.abates >= 1000 },
  { id: 'chuva-perfeita', nome: 'Chuva perfeita', texto: 'Passou por uma chuva de meteoros sem ser atingido.', ganha: (c) => c.est.chuvasSemDano >= 1 },
  { id: 'colecionador', nome: 'Colecionador', texto: 'Pegou os 6 tipos de cápsula.', ganha: (c) => c.t.capsulas === (1 << CAPSULAS_IDS.length) - 1 },
  { id: 'certeiro', nome: 'Certeiro', texto: 'Acertou 80% dos tiros numa partida (com 60 tiros ou mais).', ganha: (c) => c.est.tiros >= 60 && c.est.acertos >= 0.8 * c.est.tiros },
  { id: 'pontos-20k', nome: '20 mil', texto: 'Fez 20.000 pontos numa partida.', ganha: (c) => c.r.pontos >= 20000 },
  { id: 'pontos-60k', nome: '60 mil', texto: 'Fez 60.000 pontos numa partida.', ganha: (c) => c.r.pontos >= 60000 },
  { id: 'desafio-1', nome: 'Desafiante', texto: 'Jogou o desafio do dia.', ganha: (c) => c.t.desafios >= 1 },
  { id: 'desafio-7', nome: 'Sete desafios', texto: 'Jogou 7 desafios do dia (não precisa ser seguido).', ganha: (c) => c.t.desafios >= 7 },
  { id: 'semana-completa', nome: 'Semana completa', texto: 'Completou as 3 missões de uma semana.', ganha: (c) => c.semanaCompleta },
];

/* ---------- missões da semana (3 por semana, iguais para todo mundo) ---------- */

// soma: vai somando as partidas da semana. maximo: vale a melhor partida da semana.
export const MISSOES = [
  { id: 'aranhas-30', texto: 'Derrube 30 Aranhas', alvo: 30, jeito: 'soma', valor: (e) => e.porTipo[5] },
  { id: 'vespas-30', texto: 'Derrube 30 Vespas', alvo: 30, jeito: 'soma', valor: (e) => e.porTipo[1] },
  { id: 'devoradores-20', texto: 'Derrube 20 Devoradores', alvo: 20, jeito: 'soma', valor: (e) => e.porTipo[3] },
  { id: 'sentinelas-15', texto: 'Derrube 15 Sentinelas', alvo: 15, jeito: 'soma', valor: (e) => e.porTipo[6] },
  { id: 'naves-150', texto: 'Derrube 150 naves', alvo: 150, jeito: 'soma', valor: (e, r) => r.naves },
  { id: 'onda-8', texto: 'Chegue à onda 8', alvo: 8, jeito: 'maximo', valor: (e, r) => r.fase },
  { id: 'onda-12', texto: 'Chegue à onda 12', alvo: 12, jeito: 'maximo', valor: (e, r) => r.fase },
  { id: 'combo-4', texto: 'Faça um combo ×4', alvo: 4, jeito: 'maximo', valor: (e) => e.maiorCombo },
  { id: 'chefao', texto: 'Derrote um chefão', alvo: 1, jeito: 'soma', valor: (e) => somar(e.chefesPorTipo) },
  { id: 'pontos-15k', texto: 'Faça 15.000 pontos numa partida', alvo: 15000, jeito: 'maximo', valor: (e, r) => r.pontos },
  { id: 'capsulas-10', texto: 'Pegue 10 cápsulas', alvo: 10, jeito: 'soma', valor: (e) => e.capsulas },
  { id: 'meteoros-40', texto: 'Desvie de 40 meteoros', alvo: 40, jeito: 'soma', valor: (e) => e.meteoros },
  { id: 'partidas-5', texto: 'Jogue 5 partidas', alvo: 5, jeito: 'soma', valor: () => 1 },
  { id: 'desafio-3', texto: 'Jogue o desafio do dia 3 vezes', alvo: 3, jeito: 'soma', valor: (e, r, desafio) => (desafio ? 1 : 0) },
];

const DIA_MS = 86400000;
const BRASILIA_MS = 3 * 3600000; // Brasília é UTC-3 (sem horário de verão)
const SEGUNDA_BASE = Date.UTC(2026, 0, 5); // uma segunda-feira

// Dia no horário de Brasília, "AAAA-MM-DD" (o dia troca à meia-noite de lá).
export function diaDe(agora = Date.now()) {
  return new Date(agora - BRASILIA_MS).toISOString().slice(0, 10);
}

// Número da semana (de segunda a domingo, no horário de Brasília).
export function semanaDe(agora = Date.now()) {
  return Math.floor((agora - BRASILIA_MS - SEGUNDA_BASE) / (7 * DIA_MS));
}

// Sorteio pequeno com semente (o mesmo do jogo), para escolher as missões e a semente do desafio.
function sorteio(semente) {
  let a = semente >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Número a partir de um texto (FNV-1a de 32 bits).
function hash(texto) {
  let h = 0x811c9dc5;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

export function missoesDaSemana(semana) {
  const r = sorteio(hash(`missoes:${semana}`));
  const ids = MISSOES.map((_, i) => i);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 3).map((i) => MISSOES[i]);
}

/* ---------- desafio do dia ---------- */

// As mesmas ondas para todo mundo no dia: a semente da partida vem da data.
export function sementeDoDia(dia) {
  return hash(`desafio:${dia}`);
}

/* ---------- conferência dos números da partida (feita no servidor) ---------- */

export function somar(lista) {
  return lista.reduce((s, n) => s + n, 0);
}

const inteiro = (n, min = 0, max = 1e9) => Number.isInteger(n) && n >= min && n <= max;

// Quantas ondas da posição `posicao` (na volta) a pessoa alcançou (inclusive a atual) ou completou, terminando na
// onda `fase`. Ex.: chuvas de meteoros (posição 4) alcançadas até a onda 12: a 4 e a 12.
export function ondasAlcancadas(fase, posicao) {
  return fase < posicao ? 0 : Math.floor((fase - posicao) / ONDAS_POR_VOLTA) + 1;
}
export function ondasCompletas(fase, posicao) {
  return ondasAlcancadas(fase - 1, posicao);
}

// Os números da partida (estatisticas do motor) batem com o resultado já conferido? Devolve null ou o motivo.
export function conferirEstatisticas(est, r) {
  if (!est || typeof est !== 'object') return 'números da partida faltando';
  if (!Array.isArray(est.porTipo) || est.porTipo.length !== NUM_TIPOS || !est.porTipo.every((n) => inteiro(n))) return 'naves por tipo inválidas';
  if (somar(est.porTipo) !== r.naves) return 'naves por tipo não somam as naves';
  if (!Array.isArray(est.chefesPorTipo) || est.chefesPorTipo.length !== NUM_CHEFES || !est.chefesPorTipo.every((n) => inteiro(n))) return 'chefões inválidos';
  // o chefão pode cair e a partida acabar ainda na onda dele (nas explosões): conta a onda alcançada
  if (somar(est.chefesPorTipo) > ondasAlcancadas(r.fase, POSICAO_CHEFE)) return 'chefões demais para a onda';
  if (!inteiro(est.maiorCombo, 1, 5) || (r.naves === 0 && est.maiorCombo > 1) || est.maiorCombo > Math.max(1, r.naves)) return 'combo inválido';
  const chuvas = ondasAlcancadas(r.fase, POSICAO_METEOROS);
  if (!inteiro(est.meteoros, 0, chuvas * METEOROS_MAX)) return 'meteoros demais';
  if (!inteiro(est.chuvasSemDano, 0, ondasCompletas(r.fase, POSICAO_METEOROS))) return 'chuvas inválidas';
  if (!inteiro(est.capsulas, 0, r.naves + chuvas)) return 'cápsulas demais';
  if (!inteiro(est.capsulasTipos, 0, (1 << CAPSULAS_IDS.length) - 1)) return 'tipos de cápsula inválidos';
  if (!inteiro(est.tiros, 0, Math.ceil((r.tempoMs / 1000) * 25) + 3) || !inteiro(est.acertos, 0, est.tiros)) return 'tiros inválidos';
  if (!inteiro(est.primeiraPerda, 0, r.fase)) return 'primeira perda inválida';
  return null;
}

/* ---------- progresso da conta ---------- */

export function progressoNovo() {
  return {
    xp: 0,
    partidas: 0,
    abates: 0,
    chefes: [0, 0, 0],
    tipos: 0, // tipos de inimigo já derrubados (um bit por tipo)
    capsulas: 0, // tipos de cápsula já pegos (um bit por tipo)
    desafios: 0,
    medalhas: ['piloto-registrado'],
    semana: -1,
    missoes: [0, 0, 0], // progresso das 3 missões da semana
    feitas: [false, false, false],
    nave: 'padrao',
    cor: 'azul',
  };
}

// Lê o progresso guardado (JSON do banco), aceitando só o que é desta lista.
export function lerProgresso(texto) {
  const p = progressoNovo();
  let d = null;
  try { d = JSON.parse(texto); } catch (e) { return p; }
  if (!d || typeof d !== 'object') return p;
  for (const k of ['xp', 'partidas', 'abates', 'tipos', 'capsulas', 'desafios', 'semana']) if (Number.isInteger(d[k])) p[k] = d[k];
  if (Array.isArray(d.chefes) && d.chefes.length === NUM_CHEFES && d.chefes.every((n) => inteiro(n))) p.chefes = d.chefes;
  if (Array.isArray(d.medalhas)) p.medalhas = MEDALHAS.map((m) => m.id).filter((id) => id === 'piloto-registrado' || d.medalhas.includes(id));
  if (Array.isArray(d.missoes) && d.missoes.length === 3 && d.missoes.every((n) => inteiro(n))) p.missoes = d.missoes;
  if (Array.isArray(d.feitas) && d.feitas.length === 3) p.feitas = d.feitas.map(Boolean);
  if (NAVES.some((n) => n.id === d.nave)) p.nave = d.nave;
  if (CORES.includes(d.cor)) p.cor = d.cor;
  return p;
}

// Troca de semana: as missões recomeçam.
export function atualizarSemana(prog, semana) {
  if (prog.semana === semana) return;
  prog.semana = semana;
  prog.missoes = [0, 0, 0];
  prog.feitas = [false, false, false];
}

// Soma uma partida conferida ao progresso. Devolve o que mudou: { xp, patenteAntes, patente, medalhas: [novas],
// missoes: [{ indice, feita }] (as que completaram agora) }.
export function somarPartida(prog, r, est, { desafio = false, agora = Date.now() } = {}) {
  atualizarSemana(prog, semanaDe(agora));
  const patenteAntes = patenteDo(prog.xp);
  const xp = xpDaPartida(r, est);
  prog.xp += xp;
  prog.partidas += 1;
  prog.abates += r.naves;
  prog.chefes = prog.chefes.map((n, i) => n + est.chefesPorTipo[i]);
  est.porTipo.forEach((n, i) => { if (n > 0) prog.tipos |= 1 << i; });
  prog.capsulas |= est.capsulasTipos;
  if (desafio) prog.desafios += 1;
  // missões da semana
  const missoesCompletas = [];
  missoesDaSemana(prog.semana).forEach((m, i) => {
    const v = m.valor(est, r, desafio);
    prog.missoes[i] = Math.min(m.alvo, m.jeito === 'soma' ? prog.missoes[i] + v : Math.max(prog.missoes[i], v));
    if (!prog.feitas[i] && prog.missoes[i] >= m.alvo) {
      prog.feitas[i] = true;
      missoesCompletas.push(i);
    }
  });
  const semanaCompleta = prog.feitas.every(Boolean) && missoesCompletas.length > 0;
  // medalhas novas
  const c = { r, est, t: prog, desafio, semanaCompleta };
  const novas = MEDALHAS.filter((m) => !prog.medalhas.includes(m.id) && m.ganha(c)).map((m) => m.id);
  prog.medalhas = MEDALHAS.map((m) => m.id).filter((id) => prog.medalhas.includes(id) || novas.includes(id));
  return { xp, patenteAntes, patente: patenteDo(prog.xp), medalhas: novas, missoes: missoesCompletas };
}

// O que o jogo mostra na tela do piloto (sem nada da conta além dos números).
export function resumoDoProgresso(prog, agora = Date.now()) {
  atualizarSemana(prog, semanaDe(agora));
  const i = patenteDo(prog.xp);
  return {
    xp: prog.xp,
    patente: i,
    proxima: i + 1 < PATENTES.length ? PATENTES[i + 1].xp : null,
    medalhas: prog.medalhas.slice(),
    missoes: missoesDaSemana(prog.semana).map((m, k) => ({ id: m.id, progresso: prog.missoes[k], alvo: m.alvo, feita: prog.feitas[k] })),
    naves: NAVES.filter((n) => naveLiberada(n, prog)).map((n) => n.id),
    nave: prog.nave,
    cor: prog.cor,
    desafios: prog.desafios,
  };
}
