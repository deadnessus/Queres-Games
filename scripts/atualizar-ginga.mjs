// Copia o jogo Ginga (Dribble Game) para public/jogar/ginga/, sem depender de sites externos.
//
// Uso:  node scripts/atualizar-ginga.mjs <pasta-do-repositorio-dribble-game>
//
// O que faz:
//  - copia index.html, style.css, manifest.webmanifest, icones/ e src/ (nada de docs/, tests/, README, package.json);
//  - troca as fontes do Google Fonts por ./fonts/fonts.css (as fontes já estão em public/jogar/ginga/fonts/
//    e são preservadas); se o jogo passar a usar outra fonte, acrescente os arquivos em fonts/.
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const origem = resolve(process.argv[2] || '');
if (!process.argv[2] || !existsSync(join(origem, 'index.html')) || !existsSync(join(origem, 'src/main.js'))) {
  console.error('Uso: node scripts/atualizar-ginga.mjs <pasta do repositório dribble-game>');
  process.exit(1);
}
const destino = join(dirname(fileURLToPath(import.meta.url)), '../public/jogar/ginga');

for (const f of ['src', 'icones']) rmSync(join(destino, f), { recursive: true, force: true });
for (const f of ['src', 'icones', 'style.css', 'manifest.webmanifest']) cpSync(join(origem, f), join(destino, f), { recursive: true });

let html = readFileSync(join(origem, 'index.html'), 'utf8');
const antes = html;
html = html
  .replace(/\s*<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>/g, '')
  .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, '<link rel="stylesheet" href="fonts/fonts.css">');
if (html === antes || !html.includes('fonts/fonts.css')) throw new Error('não achei os links do Google Fonts no index.html; o jogo mudou?');
const externos = html.match(/https?:\/\/(?!www\.w3\.org)[^"'\s)]+/g);
if (externos) console.warn('[aviso] ainda há endereços externos no index.html:', externos);
writeFileSync(join(destino, 'index.html'), html);
console.log('[ginga] jogo copiado para', destino);
