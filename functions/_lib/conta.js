// Contas do queres.games, compartilhadas por todos os jogos (Cloudflare Pages Functions + D1, binding "DB").
// Uma conta é só um apelido ("Lobo Azul") e um código de 3 caracteres. Não guardamos nome, e-mail nem IP.
// A sessão é um cookie HttpOnly de 1 ano; no banco fica só o hash dele.
// Regras do código: ver CLAUDE.md ("Contas").

export const CABECALHOS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
export const json = (corpo, status = 200, extra = {}) =>
  new Response(JSON.stringify(corpo), { status, headers: { ...CABECALHOS, ...extra } });

export const COOKIE = 'qg_sessao';
const UM_ANO = 365 * 24 * 3600;
const RENOVAR_APOS = 30 * 24 * 3600; // renova o cookie a cada ~30 dias de uso
export const MAX_ERROS = 5;
export const BLOQUEIO_SEG = 30 * 60;
export const MAX_CONTAS_POR_HORA = 120;
// Sem 0/O e 1/I/L, que se confundem: 31 caracteres => 29.791 códigos.
const ALFABETO = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

let bancoPronto = false;
export async function prepararBanco(db) {
  if (bancoPronto) return;
  await db.batch([
    db.prepare(
      'CREATE TABLE IF NOT EXISTS contas (id INTEGER PRIMARY KEY AUTOINCREMENT, apelido TEXT NOT NULL UNIQUE, codigo TEXT NOT NULL, criada_em INTEGER NOT NULL, erros INTEGER NOT NULL DEFAULT 0, bloqueado_ate INTEGER NOT NULL DEFAULT 0)',
    ),
    db.prepare(
      'CREATE TABLE IF NOT EXISTS sessoes (token_hash TEXT PRIMARY KEY, conta_id INTEGER NOT NULL, criada_em INTEGER NOT NULL, expira_em INTEGER NOT NULL)',
    ),
    db.prepare('CREATE INDEX IF NOT EXISTS sessoes_conta ON sessoes (conta_id)'),
  ]);
  bancoPronto = true;
}

export async function sha256Hex(texto) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function codigoAleatorio() {
  const limite = 256 - (256 % ALFABETO.length); // evita viés no sorteio
  let codigo = '';
  while (codigo.length < 3) {
    const [b] = crypto.getRandomValues(new Uint8Array(1));
    if (b < limite) codigo += ALFABETO[b % ALFABETO.length];
  }
  return codigo;
}

export const normalizarCodigo = (c) => String(c ?? '').toUpperCase().replace(/[\s-]/g, '');
export const codigoValido = (c) => c.length === 3 && [...c].every((ch) => ALFABETO.includes(ch));

// POST só vale vindo do próprio site e com JSON (um formulário de outro site não consegue isso).
export function origemInvalida(request) {
  const origem = request.headers.get('origin');
  if (origem && origem !== new URL(request.url).origin) return true;
  return !(request.headers.get('content-type') || '').includes('application/json');
}

export async function lerJson(request) {
  try {
    const corpo = await request.json();
    return corpo && typeof corpo === 'object' ? corpo : {};
  } catch {
    return {};
  }
}

function lerCookie(request) {
  const m = new RegExp(`(?:^|; )${COOKIE}=([0-9a-f]{64})`).exec(request.headers.get('cookie') || '');
  return m ? m[1] : null;
}

export function cookieDeSessao(request, token, segundos = UM_ANO) {
  const seguro = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${COOKIE}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${segundos}${seguro}`;
}

export async function criarSessao(env, request, contaId) {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  const agora = Math.floor(Date.now() / 1000);
  await env.DB.prepare('INSERT INTO sessoes (token_hash, conta_id, criada_em, expira_em) VALUES (?, ?, ?, ?)')
    .bind(await sha256Hex(token), contaId, agora, agora + UM_ANO)
    .run();
  return cookieDeSessao(request, token);
}

// Quem está logado? Devolve { id, apelido, setCookie? } ou null. Renova a sessão de tempos em tempos.
export async function contaAtual(request, env) {
  if (!env.DB) return null;
  await prepararBanco(env.DB);
  const token = lerCookie(request);
  if (!token) return null;
  const hash = await sha256Hex(token);
  const agora = Math.floor(Date.now() / 1000);
  const linha = await env.DB.prepare(
    'SELECT c.id, c.apelido, s.criada_em, s.expira_em FROM sessoes s JOIN contas c ON c.id = s.conta_id WHERE s.token_hash = ?',
  ).bind(hash).first();
  if (!linha || linha.expira_em < agora) return null;
  const conta = { id: linha.id, apelido: linha.apelido };
  if (agora - linha.criada_em > RENOVAR_APOS) {
    await env.DB.prepare('UPDATE sessoes SET criada_em = ?, expira_em = ? WHERE token_hash = ?')
      .bind(agora, agora + UM_ANO, hash).run();
    conta.setCookie = cookieDeSessao(request, token);
  }
  return conta;
}

export async function apagarSessao(request, env) {
  const token = lerCookie(request);
  if (token) await env.DB.prepare('DELETE FROM sessoes WHERE token_hash = ?').bind(await sha256Hex(token)).run();
}

export const semBanco = () => json({ erro: 'contas não configuradas' }, 503);
