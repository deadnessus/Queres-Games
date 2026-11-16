// Roda depois do `astro build`:
// 1) acrescenta o contador (/contar-jogo.js) na página de cada jogo em dist/jogar/<slug>/index.html;
// 2) acrescenta a telemetria anônima (/telemetria.js) em TODAS as páginas .html de cada jogo, com a versão do jogo
//    (lida de public/jogar/<slug>/versao.json; sem o arquivo, "sem-versao") e os nomes de eventos permitidos;
// 3) grava dist/jogos.json (lista de jogos, usada por /api/jogos/<slug>) e dist/telemetria-jogos.json
//    ({ slug: { versao, eventos } }, usado por /api/telemetria para recusar jogos, versões e eventos inventados).
// Não altera os arquivos em public/jogar: a cópia original dos jogos fica intacta.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pasta = join(dist, 'jogar');
const slugs = readdirSync(pasta, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

const VERSAO_TEL = 1; // troque ao mudar public/telemetria.js (fura o cache do navegador)
const NOME_EVENTO = /^[a-z][a-z0-9_]{1,31}$/;
const PASTAS_IGNORADAS = new Set(['vendor', 'lib', 'node_modules']); // bibliotecas guardadas no site: não são páginas do jogo

// Rótulo da versão: o campo "versao" de versao.json, ou o commit de origem (7 letras/números), ou "sem-versao".
function lerVersao(slug) {
  const arquivo = join(pasta, slug, 'versao.json');
  if (!existsSync(arquivo)) return { versao: 'sem-versao', eventos: [] };
  try {
    const v = JSON.parse(readFileSync(arquivo, 'utf8'));
    const candidata = String(v.versao || (/^[0-9a-f]{7,40}$/.test(String(v.commit || '')) ? String(v.commit).slice(0, 7) : ''));
    const versao = /^[A-Za-z0-9._-]{1,24}$/.test(candidata) ? candidata : 'sem-versao';
    const eventos = (Array.isArray(v.eventos) ? v.eventos : []).map(String).filter((n) => NOME_EVENTO.test(n)).slice(0, 12);
    return { versao, eventos };
  } catch (e) {
    console.warn(`[pos-build] ${slug}: versao.json inválido (${e.message}); usando sem-versao`);
    return { versao: 'sem-versao', eventos: [] };
  }
}

function paginasHtml(dir) {
  const achadas = [];
  for (const d of readdirSync(dir, { withFileTypes: true })) {
    if (d.isDirectory()) { if (!PASTAS_IGNORADAS.has(d.name)) achadas.push(...paginasHtml(join(dir, d.name))); }
    else if (/\.html?$/i.test(d.name)) achadas.push(join(dir, d.name));
  }
  return achadas;
}

// Antes de tudo, um pequeno trecho que garante que window.QG.evento(...) exista mesmo que o jogo o chame
// antes de /telemetria.js carregar (as chamadas ficam numa fila e o script as entrega depois).
const STUB = '<script>window.QG=window.QG||{};QG.evento=QG.evento||function(n,d){(QG._fila=QG._fila||[]).push([n,d])};</script>';

const telemetria = {};
for (const slug of slugs) {
  const arquivo = join(pasta, slug, 'index.html');
  if (!existsSync(arquivo)) { console.warn(`[pos-build] ${slug}: sem index.html, pulei`); continue; }
  const { versao, eventos } = lerVersao(slug);
  telemetria[slug] = { versao, eventos };

  let html = readFileSync(arquivo, 'utf8');
  if (!html.includes('/contar-jogo.js')) {
    const tag = `<script src="/contar-jogo.js" data-jogo="${slug}" defer></script>`;
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${tag}\n</body>`) : `${html}\n${tag}\n`;
    writeFileSync(arquivo, html);
  }

  for (const pagina of paginasHtml(join(pasta, slug))) {
    let conteudo = readFileSync(pagina, 'utf8');
    if (conteudo.includes('/telemetria.js')) continue;
    const dados = `data-jogo="${slug}" data-versao="${versao}"${eventos.length ? ` data-eventos="${eventos.join(',')}"` : ''}`;
    const tag = `<script src="/telemetria.js?v=${VERSAO_TEL}" ${dados} defer></script>`;
    conteudo = /<\/body>/i.test(conteudo) ? conteudo.replace(/<\/body>/i, `${tag}\n</body>`) : `${conteudo}\n${tag}\n`;
    // Sem <head> não mexemos no começo da página (um texto antes do doctype muda o modo de renderização).
    if (/<head[^>]*>/i.test(conteudo)) conteudo = conteudo.replace(/<head[^>]*>/i, (m) => `${m}\n${STUB}`);
    writeFileSync(pagina, conteudo);
  }
}
writeFileSync(join(dist, 'jogos.json'), JSON.stringify(slugs));
writeFileSync(join(dist, 'telemetria-jogos.json'), JSON.stringify(telemetria));
console.log(`[pos-build] contador e telemetria incluídos em ${slugs.length} jogos: ${slugs.join(', ')}`);
console.log(`[pos-build] versões: ${slugs.map((s) => `${s}=${telemetria[s]?.versao}`).join(', ')}`);
