#!/usr/bin/env node
// Copia o modelo (skills + verificador + CLAUDE.md) para a pasta de um repositório de jogo. Quem roda: uma sessão do
// Claude no repositório queres-games, para cada repositório de jogo.
//
// Uso:  node modelo-jogos/distribuir.mjs <pasta-do-repo-do-jogo> <nome-do-jogo|-> [--novo] [--nota "texto"]
//   --novo   o repositório é novo/vazio: também copia o jogo-modelo (index.html, style.css, src/, qg-eventos.json)
//   nome-do-jogo: o endereço do jogo no site (ex.: invasao-estelar). Use "-" se ainda não tem.
// Seguro para rodar de novo: atualiza as skills; não sobrescreve CLAUDE.md que já existe (só acrescenta o que faltar).
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n) => { const i = args.indexOf(n); if (i < 0) return null; return args.splice(i, n === '--nota' ? 2 : 1)[n === '--nota' ? 1 : 0] ?? true; };
const novo = !!flag('--novo');
const nota = flag('--nota') || '';
const [destino, slug] = args.map((a) => a);
if (!destino || !slug) { console.error('Uso: node modelo-jogos/distribuir.mjs <pasta-do-repo> <nome-do-jogo|-> [--novo] [--nota "texto"]'); process.exit(1); }
const raiz = resolve(destino);
const versao = readFileSync(join(aqui, 'VERSAO'), 'utf8').trim();

// 1) skills (sempre atualiza)
mkdirSync(join(raiz, '.claude/skills'), { recursive: true });
for (const s of readdirSync(join(aqui, 'skills'))) cpSync(join(aqui, 'skills', s), join(raiz, '.claude/skills', s), { recursive: true });
writeFileSync(join(raiz, '.claude/skills/VERSAO-MODELO'), versao + '\n');

// 2) CLAUDE.md
const modelo = readFileSync(join(aqui, 'CLAUDE.md'), 'utf8')
  .replace('{{SLUG}}', slug === '-' ? '<nome-do-jogo>' : slug)
  .replace(' {{NOTA}}', nota ? ' ' + nota : '');
const arq = join(raiz, 'CLAUDE.md');
const MARCA = '## Skills deste repositório';
if (!existsSync(arq)) {
  writeFileSync(arq, modelo);
  console.log('CLAUDE.md criado');
} else {
  const atual = readFileSync(arq, 'utf8');
  if (atual.includes(MARCA)) console.log('CLAUDE.md já tem a seção de skills: mantido');
  else {
    // o repositório já tem um CLAUDE.md (com a seção de medição, se veio do PR anterior): acrescenta só as skills e a regra dos botões
    const extra = `\n\n## Skills deste repositório e boas práticas (queres.games)\n` + modelo.slice(modelo.indexOf(MARCA) + MARCA.length).split('## Medição (resumo)')[0].replace(/^[^\n]*\n/, '\n') +
      `- **Botões com \`id\` ou \`data-...\` claros e estáveis**, sem dado pessoal: o site conta quantas vezes cada botão é usado, pelo nome técnico (nunca pelo texto).\n`;
    writeFileSync(arq, atual.replace(/\s*$/, '\n') + extra.replace(/\n\n(- \*\*Botões)/, '\n$1'));
    console.log('CLAUDE.md: seção de skills acrescentada');
  }
}

// 3) jogo-modelo (só em repositório novo e vazio)
if (novo) {
  if (existsSync(join(raiz, 'index.html'))) { console.error('ERRO: --novo, mas já existe index.html aqui. Não sobrescrevi o jogo.'); process.exit(1); }
  cpSync(join(aqui, 'jogo-modelo'), raiz, { recursive: true });
  console.log('jogo-modelo copiado');
}
console.log(`ok: ${raiz} (versão do modelo ${versao})`);
