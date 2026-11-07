// Roda depois do `astro build`:
// 1) acrescenta o contador (/contar-jogo.js) na página de cada jogo em dist/jogar/<slug>/index.html;
// 2) grava dist/jogos.json com a lista de jogos (usada por /api/jogos/<slug> para recusar nomes inventados).
// Não altera os arquivos em public/jogar: a cópia original dos jogos fica intacta.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pasta = join(dist, 'jogar');
const slugs = readdirSync(pasta, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

for (const slug of slugs) {
  const arquivo = join(pasta, slug, 'index.html');
  if (!existsSync(arquivo)) { console.warn(`[pos-build] ${slug}: sem index.html, pulei`); continue; }
  let html = readFileSync(arquivo, 'utf8');
  if (html.includes('/contar-jogo.js')) continue;
  const tag = `<script src="/contar-jogo.js" data-jogo="${slug}" defer></script>`;
  html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${tag}\n</body>`) : `${html}\n${tag}\n`;
  writeFileSync(arquivo, html);
}
writeFileSync(join(dist, 'jogos.json'), JSON.stringify(slugs));
console.log(`[pos-build] contador incluído em ${slugs.length} jogos: ${slugs.join(', ')}`);
