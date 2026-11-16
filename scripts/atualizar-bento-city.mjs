// Copia o jogo Bento City para public/jogar/bento-city/, sem sites externos.
//
// Uso:  node scripts/atualizar-bento-city.mjs <pasta-do-repositorio-bento-2>
//   (repositório deadnessus/Bento-2, branch claude/sandwich-box-open-world-game-b0ymc2 ou a que o substituir)
//
// O que faz:
//  - copia public/index.html, public/style.css e public/js/ do jogo (nada de server.js, package.json nem scripts de servidor);
//  - troca o Three.js do CDN (jsdelivr) por ./vendor/three/build/three.module.js (a pasta vendor/ é preservada;
//    se o jogo mudar de versão do Three.js, atualize os arquivos em vendor/three/).
// O modo online do jogo (sem chat, conta do site, salas por código) funciona com o Worker de worker-bento-city/
// (rota queres.games/online/bento-city/*), que é um deploy separado: ver worker-bento-city/LEIA-ME.md.
import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gravarVersao } from './gravar-versao.mjs';

const origem = resolve(process.argv[2] || '');
if (!process.argv[2] || !existsSync(join(origem, 'public/index.html')) || !existsSync(join(origem, 'public/js/main.js'))) {
  console.error('Uso: node scripts/atualizar-bento-city.mjs <pasta do repositório Bento-2>');
  process.exit(1);
}
const destino = join(dirname(fileURLToPath(import.meta.url)), '../public/jogar/bento-city');

rmSync(join(destino, 'js'), { recursive: true, force: true });
cpSync(join(origem, 'public/js'), join(destino, 'js'), { recursive: true });
cpSync(join(origem, 'public/style.css'), join(destino, 'style.css'));


let html = readFileSync(join(origem, 'public/index.html'), 'utf8');
const cdn = /https:\/\/cdn\.jsdelivr\.net\/npm\/three@[\d.]+\/build\/three\.module\.js/;
if (!cdn.test(html)) throw new Error('importmap do Three.js (jsdelivr) não encontrado; o jogo mudou?');
html = html.replace(cdn, './vendor/three/build/three.module.js');
const externos = html.match(/https?:\/\/(?!www\.w3\.org)[^"'\s)]+/g);
if (externos) console.warn('[aviso] ainda há endereços externos no index.html:', externos);
// Versão no endereço de cada arquivo (main.js?v=<commit>): o navegador é obrigado a baixar o JS/CSS novo
// depois de uma atualização, mesmo com o cache de 4 h do Cloudflare. Os imports entre módulos ('./world.js')
// passam pelo importmap, que aponta cada arquivo de js/ para a mesma versão.
let versao = String(Date.now());
try { versao = execFileSync('git', ['-C', origem, 'rev-parse', '--short=7', 'HEAD'], { encoding: 'utf8' }).trim(); } catch (e) { console.warn('[aviso] sem git no jogo; usei a data como versão'); }
const arquivosJs = readdirSync(join(destino, 'js')).filter((f) => f.endsWith('.js')).sort();
html = html.replace(/<script type="importmap">\s*([\s\S]*?)\s*<\/script>/, (m, json) => {
  const mapa = JSON.parse(json);
  for (const f of arquivosJs) mapa.imports['./js/' + f] = './js/' + f + '?v=' + versao;
  return '<script type="importmap">\n' + JSON.stringify(mapa, null, 1) + '\n</script>';
});
if (!html.includes('?v=' + versao)) throw new Error('importmap não encontrado no index.html; o jogo mudou?');
html = html.replace(/src="js\/main\.js"/, `src="js/main.js?v=${versao}"`).replace(/href="style\.css"/, `href="style.css?v=${versao}"`);
writeFileSync(join(destino, 'index.html'), html);
console.log('[bento-city] versão nos endereços dos arquivos:', versao, `(${arquivosJs.length} arquivos JS)`);
console.log('[bento-city] jogo copiado para', destino);

// Grava de qual commit veio esta cópia. Ver scripts/gravar-versao.mjs.
try { gravarVersao('bento-city', origem, { origem: 'deadnessus/Bento-2' }); } catch (e) { console.warn('[aviso] não gravei versao.json:', e.message); }
