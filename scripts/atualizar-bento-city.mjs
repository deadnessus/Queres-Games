// Copia o jogo Bento City para public/jogar/bento-city/, só com o modo OFFLINE e sem sites externos.
//
// Uso:  node scripts/atualizar-bento-city.mjs <pasta-do-repositorio-bento-2>
//   (repositório deadnessus/Bento-2, branch claude/sandwich-box-open-world-game-b0ymc2)
//
// O que faz:
//  - copia public/index.html, public/style.css e public/js/ do jogo (nada de server.js, scripts de servidor ou package.json);
//  - troca o Three.js do CDN (jsdelivr) por ./vendor/three/build/three.module.js (a pasta vendor/ é preservada;
//    se o jogo mudar de versão do Three.js, atualize os arquivos em vendor/three/);
//  - troca o aviso da tecla T ("O chat funciona no modo online") em js/main.js por "Neste site o jogo é só offline";
//  - ESCONDE o modo online e o chat: o online precisa de um servidor (ou das salas do claude.ai) que não existem aqui, e o
//    chat entre jogadores não é permitido neste site infantil. Sem conexão online o chat do jogo não abre.
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

// A tecla T avisa "O chat funciona no modo online"; aqui não há online nem chat, então o aviso muda.
const arqMain = join(destino, 'js/main.js');
const aviso = 'O chat funciona no modo online 🌐';
let main = readFileSync(arqMain, 'utf8');
if (!main.includes(aviso)) console.warn('[aviso] texto do aviso do chat não encontrado em main.js; confira se o jogo mudou');
writeFileSync(arqMain, main.replace(aviso, 'Neste site o jogo é só offline'));

let html = readFileSync(join(origem, 'public/index.html'), 'utf8');
const cdn = /https:\/\/cdn\.jsdelivr\.net\/npm\/three@[\d.]+\/build\/three\.module\.js/;
if (!cdn.test(html)) throw new Error('importmap do Three.js (jsdelivr) não encontrado; o jogo mudou?');
html = html.replace(cdn, './vendor/three/build/three.module.js');
const esconder = `<style>
/* queres.games: modo online e chat desligados (sem servidor; sem chat entre jogadores) */
#btn-online, #online-panel, #online-pill, #code-pill, #chat, #tmenu [data-key="KeyT"] { display: none !important; }
</style>
`;
if (!html.includes('</head>')) throw new Error('index.html sem </head>');
html = html.replace('</head>', esconder + '</head>');
const externos = html.match(/https?:\/\/(?!www\.w3\.org)[^"'\s)]+/g);
if (externos) console.warn('[aviso] ainda há endereços externos no index.html:', externos);
writeFileSync(join(destino, 'index.html'), html);
console.log('[bento-city] jogo copiado para', destino);
