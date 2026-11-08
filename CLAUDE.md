# queres.games — guia para o Claude Code

Site com os jogos dos irmãos **Joaquim (Jojô)** e **Bento**, em https://queres.games.
Este arquivo é lido por qualquer sessão do Claude Code que tenha este repositório. Para publicar um jogo ou uma atualização, use a skill **`publicar-no-queres-games`** (em `.claude/skills/`), que tem o passo a passo.

## Como o site funciona

- **Astro 7**, site estático. `npm install`, `npm run dev`, `npm run build` (gera `dist/`).
- **Cloudflare Pages** ligado à branch `main` deste repositório: **cada merge na `main` publica o site sozinho**. Build: `npm run build`, saída `dist`, Node do `.node-version` (o Astro exige 22.23.4+).
- Visual "Arcade": fundo azul-escuro, fonte Press Start 2P nos títulos, Nunito no texto, amarelo/rosa/ciano. Estilos em `src/styles/global.css`.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Arquivos de cada jogo (cópia estática) | `public/jogar/<slug>/` → abre em `queres.games/jogar/<slug>/` |
| Card de cada jogo (título, autores, status, capa, links) | `src/content/jogos/<slug>.md` (schema em `src/content.config.ts`) |
| Capas dos cards (800×450, webp) | `public/capas/<slug>.webp` |
| Manuais/PDFs | `public/manuais/<slug>/`, linkados no campo `links` do card |
| Posts do blog (diário) | `src/content/blog/<slug-do-post>.md` |
| Devs (nome, cor, frase) | `src/data/devs.ts` (frases vazias = não aparecem) |
| Páginas | `src/pages/` (home, `/jogos/`, `/blog/`, `/sobre/`, 404) |
| Funções no servidor (Cloudflare Pages Functions) | `functions/api/visitas.js` (contador de visitas do rodapé), `functions/api/jogos.js` e `functions/api/jogos/[slug].js` (quantas vezes cada jogo foi aberto). Banco D1, binding `DB` |
| Contador por jogo (automático) | `npm run build` roda `scripts/pos-build.mjs` depois do Astro: acrescenta `/contar-jogo.js` (`public/contar-jogo.js`) em `dist/jogar/<slug>/index.html` e grava `dist/jogos.json` com os jogos válidos. **Não edite os arquivos dos jogos em `public/jogar/` para isso**; jogo novo em `public/jogar/<slug>/` já entra sozinho. O card mostra "Jogado N vezes" |
| Ilha Selvagem (jogo 3D, com Three.js guardado no site, sem sites externos) | `public/jogar/ilha-selvagem/` é **gerado**: não edite à mão. Para atualizar: `node scripts/atualizar-ilha-selvagem.mjs <pasta ilha/ do jojo-game-2>` (roda o `tools/build-solo.mjs` do jogo, troca o unpkg por `vendor/three/` e copia só os arquivos do Three.js usados). O guia rápido (PDF) vem de `fontes/manuais/ilha-selvagem/guia-rapido.html` |
| Servidor online do Ascendia Penaltys (Cloudflare Worker, rota `queres.games/online/*`) | `worker/` (não é publicado pelo Pages; é um deploy separado com `wrangler`). **Hoje a página do jogo não usa esse servidor**: desde 2026-11-08 ela é a cópia do jogo original, que conecta por PeerJS (biblioteca guardada em `vendor/`) ou pelo modo sem servidor (troca de dois códigos). A versão antiga da página, que falava com o Worker, está no histórico do Git (commit anterior a esta atualização) |

## Jogos publicados

| Slug | Jogo | Autores | Repositório de origem | Branch |
|---|---|---|---|---|
| `heroi-dos-quatro-mundos` | Herói dos Quatro Mundos | Jojô | `deadnessus/Jojo-Game-1` | `main` |
| `jopuzzle` | Jopuzzle | Jojô | `deadnessus/Jojo-Game-2` (as últimas atualizações foram feitas direto aqui) | `main` |
| `brasileirao-fifa` | Brasileirão FIFA | Jojô e Bento | `deadnessus/Jojo-game-FIFA-Brasileir-o` | `main` |
| `collatz-rocket` | Collatz Rocket | Jojô e Bento | não registrado (build Vite colocado direto aqui) | — |
| `ilha-misteriosa` | A Ilha Misteriosa | Jojô e Bento | `deadnessus/queres-games---mystery-island` | `master` |
| `ascendia-penaltys` | Ascendia Penaltys | Bento | `deadnessus/ascendia-penalty` | `main` (cópia igual ao original, mais um bloco de CSS para telas baixas no fim de `css/style.css`) |
| `turbo-jojo` | Turbo Jojo | Jojô | `deadnessus/Jojo-1` | `claude/fervent-goldberg-xz80zn` |
| `ilha-selvagem` | Ilha Selvagem (só a versão **solo**) | Jojô | `deadnessus/jojo-game-2`, pasta `ilha/` | `claude/3d-building-game-animals-b49gqr` |

Ao publicar um jogo novo ou mudar a origem de um jogo, **atualize esta tabela**.

## Regras do projeto

- **Créditos**: nos cards, "Por Jojô", "Por Bento" ou "Por Jojô e Bento" (`autores: [jojo]`, `[bento]`, `[jojo, bento]`). Na seção "Quem faz", o nome mostrado é "Joaquim". Se não souber o autor de um jogo, **pergunte**; não chute.
- **Fluxo de publicação**: branch `claude/<assunto>` → build passando → PR → merge na `main`. Nunca deixe a `main` com build quebrado.
- **Blog é um diário**: toda mudança visível no site ganha um post (ver a skill). Não publique bastidores (erros de build, configuração do Cloudflare).
- **Público infantil**: não coletar dados pessoais; nada de chat entre jogadores; medições só anônimas. Login/contas ainda não existem (ideia em discussão: código de save, depois contas com apelido e senha, respeitando a LGPD para crianças).
- **Não invente** descrições, recursos ou planos dos jogos: use README, mensagens de commit e o que o jogo mostra na tela.

## Pendências conhecidas

- O `index.html` original do Brasileirão FIFA não tem `<meta charset="utf-8">`; a cópia do site foi corrigida (primeira linha). Ao recopiar, mantenha a correção.
- Repositório de origem do Collatz Rocket não está registrado.
- Frases dos devs em `src/data/devs.ts` ainda vazias.
- Ilha Selvagem: só a versão solo está no site (mundo salvo no `localStorage` do navegador). A versão online (servidor Node + WebSocket, da pasta `ilha/`) não está publicada. O guia rápido em PDF foi escrito a partir do `ilha/MANUAL.md` do jogo e adaptado ao solo; se o jogo mudar muito, regenere (`fontes/manuais/ilha-selvagem/`, PDF via Playwright `page.pdf`).
- Ilustração do Jojô em `public/devs/jojo.webp`: publicada com autorização do pai (ele confirmou no chat). Não trocar nem publicar outras fotos ou ilustrações de crianças sem nova autorização.
- Contadores (visitas e por jogo): banco D1 `queres-games` (binding `DB`, ID no `wrangler.jsonc`). Sem o banco, `/api/visitas` responde 503 e o rodapé esconde o contador. Teste local: `npx wrangler@4 pages dev dist --d1 DB=teste-local`.
