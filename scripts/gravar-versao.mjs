// Grava public/jogar/<slug>/versao.json: de qual commit do repositório do jogo veio a cópia que está no site.
// O build usa isso para marcar os números da telemetria com a "versão" (compare antes e depois de cada atualização).
//
// Uso:  node scripts/gravar-versao.mjs <slug> <pasta-dentro-do-repositorio-do-jogo> [--origem dono/repositorio]
//   ex.: node scripts/gravar-versao.mjs invasao-estelar ../megamania --origem deadnessus/Megamania
// Rode DEPOIS de copiar os arquivos do jogo (e do commit certo já em checkout). Se o repositório do jogo tiver um
// arquivo qg-eventos.json na raiz ({ "eventos": ["fase_concluida"] }), a lista vai junto: é ela que libera QG.evento().
// Não grava o endereço do repositório lido da configuração do git (pode conter credenciais): só o que você passar em --origem.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raizSite = join(dirname(fileURLToPath(import.meta.url)), '..');
const git = (cwd, ...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();

export function gravarVersao(slug, pastaDoJogo, { origem } = {}) {
  if (!/^[a-z0-9-]{1,60}$/.test(slug)) throw new Error(`slug inválido: ${slug}`);
  const pasta = resolve(pastaDoJogo);
  const raizJogo = git(pasta, 'rev-parse', '--show-toplevel');
  const commit = git(pasta, 'rev-parse', 'HEAD');
  const sujo = git(pasta, 'status', '--porcelain', '--', pasta);
  if (sujo) console.warn('[aviso] a pasta do jogo tem mudanças ainda não commitadas: a versão gravada não representa exatamente o que foi copiado.');
  let eventos = [];
  const arqEventos = join(raizJogo, 'qg-eventos.json');
  if (existsSync(arqEventos)) {
    const lido = JSON.parse(readFileSync(arqEventos, 'utf8'));
    eventos = (Array.isArray(lido) ? lido : lido.eventos || []).map(String);
    const ruins = eventos.filter((n) => !/^[a-z][a-z0-9_]{1,31}$/.test(n));
    if (ruins.length) throw new Error(`nomes de evento inválidos (use minúsculas, números e _; 2 a 32 letras): ${ruins.join(', ')}`);
    if (eventos.length > 12) throw new Error('no máximo 12 nomes de evento por jogo');
  }
  const versao = {
    commit: commit.slice(0, 7),
    data_do_commit: git(pasta, 'log', '-1', '--format=%cI'),
    branch: git(pasta, 'rev-parse', '--abbrev-ref', 'HEAD'),
    ...(origem ? { origem } : {}),
    ...(relative(raizJogo, pasta) ? { pasta: relative(raizJogo, pasta) } : {}),
    gravado_em: new Date().toISOString(),
    eventos,
  };
  const destino = join(raizSite, 'public/jogar', slug, 'versao.json');
  writeFileSync(destino, JSON.stringify(versao, null, 2) + '\n');
  console.log(`[versao] ${slug}: ${versao.commit}${eventos.length ? ` (eventos: ${eventos.join(', ')})` : ''} -> ${relative(raizSite, destino)}`);
  return versao;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const i = args.indexOf('--origem');
  const origem = i >= 0 ? args.splice(i, 2)[1] : undefined;
  const [slug, pasta] = args;
  if (!slug || !pasta) {
    console.error('Uso: node scripts/gravar-versao.mjs <slug> <pasta-dentro-do-repositorio-do-jogo> [--origem dono/repositorio]');
    process.exit(1);
  }
  gravarVersao(slug, pasta, { origem });
}
