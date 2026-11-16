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
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
writeFileSync(join(destino, 'index.html'), html);
console.log('[bento-city] jogo copiado para', destino);
