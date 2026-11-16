// Roda depois do `astro build`:
// 1) acrescenta o contador (/contar-jogo.js) na página de cada jogo em dist/jogar/<slug>/index.html;
// 2) acrescenta a telemetria anônima (/telemetria.js) em TODAS as páginas .html de cada jogo, com a versão do jogo
//    (lida de public/jogar/<slug>/versao.json; sem o arquivo, "sem-versao") e os nomes de eventos permitidos;
// 3) grava dist/jogos.json (lista de jogos, usada por /api/jogos/<slug>) e dist/telemetria-jogos.json
//    ({ slug: { versao, eventos, botoes } }, usado por /api/telemetria para recusar jogos, versões e eventos inventados e por
//    /api/painel/resumo para dizer quais botões nunca foram usados). "botoes" = nomes dos botões/links/menus escritos no HTML do jogo.
// Não altera os arquivos em public/jogar: a cópia original dos jogos fica intacta.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const pasta = join(dist, 'jogar');
const slugs = readdirSync(pasta, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();

const VERSAO_TEL = 2; // troque ao mudar public/telemetria.js (fura o cache do navegador)
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

// Lista de botões do HTML de um jogo, com as MESMAS regras de nome do public/telemetria.js (nomeDoElemento/limparNome):
// o nome é o id ou o primeiro data-... do elemento; botão sem nenhum dos dois não entra na lista (ele aparece como "sem-nome"/"pai>tag").
// Botões criados depois por JavaScript não estão no HTML: só aparecem nos números quando alguém os usa.
const limparNome = (t) => String(t ?? '').replace(/\d{3,}/g, '#').replace(/[^A-Za-z0-9_.:#>-]/g, '').slice(0, 32);
const TIPOS_DE_TEXTO = /^(text|search|email|password|tel|url|number|date|datetime-local|month|week|time)$/i;
function botoesDoHtml(html) {
  const nomes = new Set();
  const semScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
  for (const m of semScripts.matchAll(/<([a-zA-Z][a-zA-Z0-9-]*)\b((?:[^>"']|"[^"]*"|'[^']*')*)>/g)) {
    const tag = m[1].toLowerCase();
    const attrs = [];
    for (const a of m[2].matchAll(/([^\s"'<>\/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) attrs.push([a[1].toLowerCase(), a[2] ?? a[3] ?? a[4] ?? '']);
    const attr = (n) => (attrs.find(([k]) => k === n) || [])[1];
    const tem = (n) => attrs.some(([k]) => k === n);
    const interativo = tag === 'button' || tag === 'summary' || tag === 'select' || (tag === 'a' && tem('href')) || attr('role') === 'button' ||
      (tag === 'input' && !(!attr('type') || TIPOS_DE_TEXTO.test(attr('type'))) && attr('type').toLowerCase() !== 'hidden');
    if (!interativo || tem('disabled')) continue;
    let nome = attr('id');
    if (!nome) { const d = attrs.find(([k, v]) => k.startsWith('data-') && v && k !== 'data-jogo'); if (d) nome = `${d[0].slice(5)}:${d[1]}`; }
    if (nome) nomes.add(limparNome(nome));
  }
  return [...nomes].filter(Boolean).slice(0, 150);
}

const telemetria = {};
for (const slug of slugs) {
  const arquivo = join(pasta, slug, 'index.html');
  if (!existsSync(arquivo)) { console.warn(`[pos-build] ${slug}: sem index.html, pulei`); continue; }
  const { versao, eventos } = lerVersao(slug);
  telemetria[slug] = { versao, eventos, botoes: [] };

  let html = readFileSync(arquivo, 'utf8');
  if (!html.includes('/contar-jogo.js')) {
    const tag = `<script src="/contar-jogo.js" data-jogo="${slug}" defer></script>`;
    html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, `${tag}\n</body>`) : `${html}\n${tag}\n`;
    writeFileSync(arquivo, html);
  }

  const botoes = new Set();
  for (const pagina of paginasHtml(join(pasta, slug))) {
    let conteudo = readFileSync(pagina, 'utf8');
    botoesDoHtml(conteudo).forEach((b) => botoes.add(b)); // lido do HTML do jogo (a telemetria injetada não tem botões)
    if (conteudo.includes('/telemetria.js')) continue;
    const dados = `data-jogo="${slug}" data-versao="${versao}"${eventos.length ? ` data-eventos="${eventos.join(',')}"` : ''}`;
    const tag = `<script src="/telemetria.js?v=${VERSAO_TEL}" ${dados} defer></script>`;
    conteudo = /<\/body>/i.test(conteudo) ? conteudo.replace(/<\/body>/i, `${tag}\n</body>`) : `${conteudo}\n${tag}\n`;
    // Sem <head> não mexemos no começo da página (um texto antes do doctype muda o modo de renderização).
    if (/<head[^>]*>/i.test(conteudo)) conteudo = conteudo.replace(/<head[^>]*>/i, (m) => `${m}\n${STUB}`);
    writeFileSync(pagina, conteudo);
  }
  telemetria[slug].botoes = [...botoes].slice(0, 150);
}
writeFileSync(join(dist, 'jogos.json'), JSON.stringify(slugs));
writeFileSync(join(dist, 'telemetria-jogos.json'), JSON.stringify(telemetria));
console.log(`[pos-build] contador e telemetria incluídos em ${slugs.length} jogos: ${slugs.join(', ')}`);
console.log(`[pos-build] versões: ${slugs.map((s) => `${s}=${telemetria[s]?.versao}`).join(', ')}`);
