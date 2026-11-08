# queres.games — guia para o Claude Code

Site com os jogos dos irmãos **Joaquim (Jojô)** e **Bento**, em https://queres.games.
Este arquivo é lido por qualquer sessão do Claude Code que tenha este repositório. Para publicar um jogo ou uma atualização, use a skill **`publicar-no-queres-games`** (em `.claude/skills/`), que tem o passo a passo. Para pôr **login, ranking ou dados por jogador** num jogo, use a skill **`login-queres-games`**.

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
| Contas (login compartilhado entre os jogos) | `functions/api/conta/*.js` (`me`, `sugestoes`, `apelidos`, `criar`, `entrar`, `sair`, `codigo`) e a biblioteca `functions/_lib/conta.js` + `apelidos.js`. Cliente pronto para qualquer jogo: `public/conta.js` (`QGConta`). Guia: skill `login-queres-games` e a seção **Contas** abaixo |
| Desafio do dia do JoPuzzle | `functions/api/jopuzzle/*.js` (`desafio`, `iniciar`, `enviar`, `ranking`) + `functions/_lib/jopuzzle.js` + `functions/_lib/jopuzzle-desafios.js` (400 desafios **gerados**: `python3 tools/generate_daily.py <saida.js>` e `tools/verify_daily.py`, no repositório `Jojo-Game-2`). Tabelas D1 `jp_tentativas` (uma por conta por dia) |
| Contador por jogo (automático) | `npm run build` roda `scripts/pos-build.mjs` depois do Astro: acrescenta `/contar-jogo.js` (`public/contar-jogo.js`) em `dist/jogar/<slug>/index.html` e grava `dist/jogos.json` com os jogos válidos. **Não edite os arquivos dos jogos em `public/jogar/` para isso**; jogo novo em `public/jogar/<slug>/` já entra sozinho. O card mostra "Jogado N vezes" |
| Ilha Selvagem (jogo 3D, com Three.js guardado no site, sem sites externos) | `public/jogar/ilha-selvagem/` é **gerado**: não edite à mão. Para atualizar: `node scripts/atualizar-ilha-selvagem.mjs <pasta ilha/ do jojo-game-2>` (roda o `tools/build-solo.mjs` do jogo, troca o unpkg por `vendor/three/` e copia só os arquivos do Three.js usados). O guia rápido (PDF) vem de `fontes/manuais/ilha-selvagem/guia-rapido.html` |
| Ginga (jogo de drible para celular, fontes guardadas no site) | `public/jogar/ginga/` vem de `node scripts/atualizar-ginga.mjs <pasta do Dribble-Game>`: copia `index.html`, `style.css`, `manifest.webmanifest`, `icones/` e `src/` (sem `docs/`, `tests/`, README) e troca o Google Fonts por `fonts/fonts.css`. A pasta `fonts/` (Barlow Condensed e Saira Extra Condensed, licença OFL) é preservada. Se o jogo usar outra fonte, acrescente os `.woff2` em `fonts/` |
| Servidor online do Ascendia Penaltys (Cloudflare Worker, rota `queres.games/online/*`) | `worker/` (não é publicado pelo Pages; é um deploy separado com `wrangler`). **Hoje a página do jogo não usa esse servidor**: desde 2026-11-08 ela é a cópia do jogo original, que conecta por PeerJS (biblioteca guardada em `vendor/`) ou pelo modo sem servidor (troca de dois códigos). A versão antiga da página, que falava com o Worker, está no histórico do Git (commit anterior a esta atualização) |

## Jogos publicados

| Slug | Jogo | Autores | Repositório de origem | Branch |
|---|---|---|---|---|
| `heroi-dos-quatro-mundos` | Herói dos Quatro Mundos | Jojô | `deadnessus/Jojo-Game-1` | `main` |
| `jopuzzle` | Jopuzzle | Jojô | `deadnessus/Jojo-Game-2` (as últimas atualizações foram feitas direto aqui). O desafio do dia (`diario.js`) vem da branch `claude/jopuzzle-desafio-diario` e depende das funções de conta e do JoPuzzle em `functions/` | `claude/jopuzzle-desafio-diario` |
| `brasileirao-fifa` | Brasileirão FIFA | Jojô e Bento | `deadnessus/Jojo-game-FIFA-Brasileir-o` | `main` |
| `collatz-rocket` | Collatz Rocket | Jojô e Bento | não registrado (build Vite colocado direto aqui) | — |
| `ilha-misteriosa` | A Ilha Misteriosa | Jojô e Bento | `deadnessus/queres-games---mystery-island` | `master` |
| `ascendia-penaltys` | Ascendia Penaltys | Bento | `deadnessus/ascendia-penalty` | `main` (cópia do original com 3 diferenças: pasta `js/` renomeada para `app/` e `css/style.css` para `css/jogo-v2.css` (para furar cache de navegador), etiqueta "versão 2" no fim do `index.html`, e um bloco de CSS para telas baixas no fim do CSS. Ao recopiar, repita isso) |
| `turbo-jojo` | Turbo Jojo | Jojô | `deadnessus/Jojo-1` | `claude/fervent-goldberg-xz80zn` |
| `ginga` | Ginga (Dribble Game) | Jojô e Bento | `deadnessus/Dribble-Game` | `claude/football-mobile-game-td9nex` |
| `ilha-selvagem` | Ilha Selvagem (só a versão **solo**) | Jojô | `deadnessus/jojo-game-2`, pasta `ilha/` | `claude/3d-building-game-animals-b49gqr` |

Ao publicar um jogo novo ou mudar a origem de um jogo, **atualize esta tabela**.

## Regras do projeto

- **Créditos**: nos cards, "Por Jojô", "Por Bento" ou "Por Jojô e Bento" (`autores: [jojo]`, `[bento]`, `[jojo, bento]`). Na seção "Quem faz", o nome mostrado é "Joaquim". Se não souber o autor de um jogo, **pergunte**; não chute.
- **Fluxo de publicação**: branch `claude/<assunto>` → build passando → PR → merge na `main`. Nunca deixe a `main` com build quebrado.
- **Blog é um diário**: toda mudança visível no site ganha um post (ver a skill). Não publique bastidores (erros de build, configuração do Cloudflare).
- **Público infantil**: não coletar dados pessoais; nada de chat entre jogadores; medições só anônimas. Existe uma conta **só com apelido gerado e código de 3 caracteres** (seção **Contas**): sem nome, e-mail, senha nem IP. Qualquer recurso novo de conta deve manter isso e respeitar a LGPD para crianças.
- **Não invente** descrições, recursos ou planos dos jogos: use README, mensagens de commit e o que o jogo mostra na tela.

## Contas (login compartilhado entre os jogos)

Uma conta é um **apelido** ("Lobo Azul", sempre bicho + qualidade, 30 x 10 = 300; depois vêm variantes com número) e um **código de 3 caracteres** (letras e números, sem 0/O/1/I/L). Foi decisão do dono (pai) do site: código curto, porque não há nada de valor na conta. Não guardamos nome, e-mail nem IP.

- **Sessão**: cookie `qg_sessao` (HttpOnly, SameSite=Lax, 1 ano, renovado com o uso), válido em todo o site; no banco fica só o hash. Por estar no mesmo endereço, **todos os jogos em `/jogar/<slug>/` compartilham o login**.
- **Para um jogo usar a conta**: inclua `<script src="/conta.js?v=1"></script>` e use `QGConta.me()`, `QGConta.entrar()`, `QGConta.perfil()` (janela pronta de criar conta / entrar). Dados do jogo ficam em tabelas próprias com prefixo do jogo (ex.: `jp_tentativas`) ligadas a `contas.id`. **Passo a passo na skill `login-queres-games`** (com um modelo de função em `exemplo-pontuacao.js`). O Jopuzzle tem as telas dentro do próprio jogo (`diario.js`) e usa as mesmas rotas.
- **Segurança**: 5 códigos errados bloqueiam o apelido por 30 min (só vale para entrar em outro aparelho; quem já está logado não é afetado). `POST` só aceita JSON vindo do próprio site. No máximo 120 contas novas por hora. Apelidos só da lista gerada: nunca texto livre.
- **Tabelas D1** (criadas sozinhas, como nos contadores): `contas`, `sessoes`, `jp_tentativas`.
- **Sem o banco** as rotas respondem 503 e o JoPuzzle esconde o botão do desafio.
- **Desafio do dia do JoPuzzle**: 6 peças diferentes, 600 s, **uma tentativa por conta por dia** (o relógio é do servidor e não para; o dia troca à meia-noite de Brasília). O servidor confere a solução; o tempo mais rápido vence. A lista dos 400 desafios está neste repositório público: quem procurar vê os desafios dos próximos dias (a solução não está lá, só as peças). Para esconder, seria preciso um segredo no Cloudflare.
- **Teste local** (precisa de Node 22.23.4+ para o Astro): `npm run build` e `npx wrangler@4 pages dev dist --d1 DB=teste-local`.

## Pendências conhecidas

- O `index.html` original do Brasileirão FIFA não tem `<meta charset="utf-8">`; a cópia do site foi corrigida (primeira linha). Ao recopiar, mantenha a correção.
- Repositório de origem do Collatz Rocket não está registrado.
- Frases dos devs em `src/data/devs.ts` ainda vazias.
- Ilha Selvagem: só a versão solo está no site (mundo salvo no `localStorage` do navegador). A versão online (servidor Node + WebSocket, da pasta `ilha/`) não está publicada. O guia rápido em PDF foi escrito a partir do `ilha/MANUAL.md` do jogo e adaptado ao solo; se o jogo mudar muito, regenere (`fontes/manuais/ilha-selvagem/`, PDF via Playwright `page.pdf`).
- Ilustração do Jojô em `public/devs/jojo.webp`: publicada com autorização do pai (ele confirmou no chat). Não trocar nem publicar outras fotos ou ilustrações de crianças sem nova autorização.
- Contadores (visitas e por jogo): banco D1 `queres-games` (binding `DB`, ID no `wrangler.jsonc`). Sem o banco, `/api/visitas` responde 503 e o rodapé esconde o contador. Teste local: `npx wrangler@4 pages dev dist --d1 DB=teste-local`.
