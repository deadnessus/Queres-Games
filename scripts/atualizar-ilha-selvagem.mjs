// Monta a versão SOLO da Ilha Selvagem em public/jogar/ilha-selvagem/, com o Three.js guardado
// dentro do site (nada é carregado de sites externos).
//
// Uso:  node scripts/atualizar-ilha-selvagem.mjs <pasta-ilha>
//   <pasta-ilha> = a pasta `ilha/` do repositório deadnessus/jojo-game-2 (branch claude/3d-building-game-animals-b49gqr)
//
// O que faz:
//  1. roda `node tools/build-solo.mjs` na pasta do jogo (gera dist-solo/);
//  2. instala as dependências do jogo, se faltarem (precisa do pacote `three`);
//  3. copia os arquivos do jogo, cria o index.html e troca o Three.js externo (unpkg) por ./vendor/three/;
//  4. copia para vendor/three só os arquivos do Three.js que o jogo realmente usa.
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ilha = resolve(process.argv[2] || '');
if (!process.argv[2] || !existsSync(join(ilha, 'tools/build-solo.mjs'))) {
  console.error('Uso: node scripts/atualizar-ilha-selvagem.mjs <pasta ilha/ do jojo-game-2>');
  process.exit(1);
}
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'public/jogar/ilha-selvagem');

if (!existsSync(join(ilha, 'node_modules/three/package.json'))) {
  execFileSync('npm', ['install', '--no-audit', '--no-fund'], { cwd: ilha, stdio: 'inherit' });
}
execFileSync('node', ['tools/build-solo.mjs'], { cwd: ilha, stdio: 'inherit' });
const solo = join(ilha, 'dist-solo');
const three = join(ilha, 'node_modules/three');
const versao = JSON.parse(readFileSync(join(three, 'package.json'), 'utf8')).version;

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
for (const f of readdirSync(solo)) {
  if (f === 'page.html') continue;
  cpSync(join(solo, f), join(destino, f), { recursive: true });
}

// index.html completo a partir do page.html (que é só um trecho para embutir)
let page = readFileSync(join(solo, 'page.html'), 'utf8');
const externo = `https://unpkg.com/three@${versao}/`;
if (!page.includes(externo)) throw new Error(`importmap esperado (${externo}) não encontrado em page.html; o build-solo mudou?`);
page = page.split(externo).join('./vendor/three/');
if (/https?:\/\//.test(page.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/xmlns="[^"]*"/g, ''))) {
  console.warn('[aviso] page.html ainda tem endereço externo:', page.match(/https?:\/\/[^"'\s)]+/g));
}
writeFileSync(
  join(destino, 'index.html'),
  `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n</head>\n<body>\n${page}\n</body>\n</html>\n`,
);

// Three.js: só o que o jogo importa (e o que esses arquivos importam)
const copiados = new Set();
function copiar(rel) {
  if (copiados.has(rel)) return;
  copiados.add(rel);
  const origem = join(three, rel);
  mkdirSync(dirname(join(destino, 'vendor/three', rel)), { recursive: true });
  cpSync(origem, join(destino, 'vendor/three', rel));
  if (!rel.startsWith('examples/jsm/')) return;
  const codigo = readFileSync(origem, 'utf8');
  for (const m of codigo.matchAll(/from\s+'(\.[^']+)'/g)) copiar(join('examples/jsm', dirname(rel.slice('examples/jsm/'.length)), m[1]).replace(/\\/g, '/'));
}
copiar('build/three.module.js');
const importmap = JSON.parse(page.match(/<script type="importmap">([\s\S]*?)<\/script>/)[1]);
const usados = new Set();
const varrer = (dir) => {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory() && f.name !== 'vendor') varrer(p);
    else if (f.name.endsWith('.js')) for (const m of readFileSync(p, 'utf8').matchAll(/from\s+'three\/addons\/([^']+)'/g)) usados.add(m[1]);
  }
};
varrer(destino);
for (const u of usados) copiar(`examples/jsm/${u}`);
if (!importmap.imports['three/addons/']) throw new Error('importmap sem three/addons/');
console.log(`[ilha-selvagem] Three.js ${versao}: ${copiados.size} arquivos em vendor/three; addons usados: ${[...usados].join(', ')}`);
