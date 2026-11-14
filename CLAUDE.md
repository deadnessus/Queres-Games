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
| Contas (login compartilhado entre os jogos) | `functions/api/conta/*.js` (`me`, `sugestoes`, `apelidos`, `criar`, `entrar`, `sair`, `codigo`) e a biblioteca `functions/_lib/conta.js` + `apelidos.js`. Cliente pronto para qualquer jogo, com a experiência de login única: `public/conta.js` (`QGConta`). Guia: skill `login-queres-games` e a seção **Contas** abaixo |
| Desafio do dia do JoPuzzle | `functions/api/jopuzzle/*.js` (`desafio`, `iniciar`, `enviar`, `ranking`, `ranking-mensal`) + `functions/_lib/jopuzzle.js` + `functions/_lib/jopuzzle-desafios.js` (400 desafios **gerados**: `python3 tools/generate_daily.py <saida.js>` e `tools/verify_daily.py`, no repositório `Jojo-Game-2`). Tabelas D1 `jp_tentativas` (uma por conta por dia) |
| Invasão Estelar (ranking geral e do mês) | `functions/api/invasao-estelar/*.js` (`iniciar`, `enviar`, `ranking`) + `functions/_lib/invasao-estelar.js`. Tabela D1 `ie_partidas` (uma linha por partida). O jogo só começa depois de entrar na conta: `iniciar` abre a partida e o relógio é do servidor, e `enviar` confere a pontuação (possível para o número de naves e a onda, tempo dentro do tempo medido aqui). O ranking mostra só apelido, onda e pontos |
| Telemetria anônima (automática, todos os jogos) | `public/telemetria.js` (cliente), `functions/api/telemetria.js` (recebe) + `functions/_lib/telemetria.js`, `functions/api/painel/resumo.js` (resumo protegido), `src/pages/painel.astro` (`/painel`), `scripts/gravar-versao.mjs` (versão do jogo). Tabelas D1 `tel_diario`, `tel_erros`, `tel_eventos`. Seção **Telemetria** abaixo |
| Contador por jogo (automático) | `npm run build` roda `scripts/pos-build.mjs` depois do Astro: acrescenta `/contar-jogo.js` (`public/contar-jogo.js`) em `dist/jogar/<slug>/index.html`, acrescenta a telemetria (`/telemetria.js`) em todas as páginas `.html` do jogo e grava `dist/jogos.json` com os jogos válidos (e `dist/telemetria-jogos.json` com versão e eventos de cada um). **Não edite os arquivos dos jogos em `public/jogar/` para isso**; jogo novo em `public/jogar/<slug>/` já entra sozinho. O card mostra "Jogado N vezes" |
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
| `furia` | Fúria: Arena & Guerra | Bento | `deadnessus/Bento-1` (copiar `index.html`, `style.css`, `js/` e `lib/`; o Three.js já vem guardado em `lib/`, sem sites externos; não copiar `jogar.html`, `tools/` nem README) | `claude/kind-davinci-3p5s5s` |
| `invasao-estelar` | Invasão Estelar | Jojô e Bento | `deadnessus/Jojo-5`, pasta `invasao-estelar/` (copiar `index.html`, `style.css`, `manifest.webmanifest`, `icone.svg` e `src/`; não copiar `tests/`, `servidor/`, `package.json` nem README; as funções vêm de `servidor/functions/_lib/invasao-estelar.js` e `servidor/functions/api/invasao-estelar/`, **sem** o `servidor/functions/_lib/conta.js`, que é só cópia de teste) | `claude/adoring-babbage-ju4bte` |

Ao publicar um jogo novo ou mudar a origem de um jogo, **atualize esta tabela**.

## Regras do projeto

- **Créditos**: nos cards, "Por Jojô", "Por Bento" ou "Por Jojô e Bento" (`autores: [jojo]`, `[bento]`, `[jojo, bento]`). Na seção "Quem faz", o nome mostrado é "Joaquim". Se não souber o autor de um jogo, **pergunte**; não chute.
- **Fluxo de publicação**: branch `claude/<assunto>` → build passando → PR → merge na `main`. Nunca deixe a `main` com build quebrado.
- **Blog é um diário**: toda mudança visível no site ganha um post (ver a skill). Não publique bastidores (erros de build, configuração do Cloudflare).
- **Público infantil**: não coletar dados pessoais; nada de chat entre jogadores; medições só anônimas (a telemetria da seção **Telemetria** é a única medição de uso; não crie outra). Existe uma conta **só com apelido gerado e código de 3 caracteres** (seção **Contas**): sem nome, e-mail, senha nem IP. Qualquer recurso novo de conta deve manter isso e respeitar a LGPD para crianças.
- **Não invente** descrições, recursos ou planos dos jogos: use README, mensagens de commit e o que o jogo mostra na tela.

## Contas (login compartilhado entre os jogos)

Uma conta é um **apelido** ("Lobo Azul", sempre bicho + qualidade, 30 x 10 = 300; depois vêm variantes com número) e um **código de 3 caracteres** (letras e números, sem 0/O/1/I/L). Foi decisão do dono (pai) do site: código curto, porque não há nada de valor na conta. Não guardamos nome, e-mail nem IP.

- **Sessão**: cookie `qg_sessao` (HttpOnly, SameSite=Lax, 1 ano, renovado com o uso), válido em todo o site; no banco fica só o hash. Por estar no mesmo endereço, **todos os jogos em `/jogar/<slug>/` compartilham o login**.
- **Experiência de login igual em todos os jogos**: criar conta pede **confirmar o apelido** e mostra "Conta criada!" com o código; entrar usa **três rodas** (animal, qualidade, número com "vazio" como padrão) e um campo de código. Tudo isso está em **um arquivo só, `public/conta.js`**; não faça telas de login próprias.
- **Para um jogo usar a conta**: inclua `<script src="/conta.js?v=2"></script>` (caminho absoluto) e use `QGConta.me()`, `QGConta.entrar()`, `QGConta.montar(elemento, ...)`, `QGConta.perfil()`. Mudou o `conta.js`? Troque o `?v=` em todos os jogos. Dados do jogo ficam em tabelas próprias com prefixo do jogo (ex.: `jp_tentativas`) ligadas a `contas.id`. **Passo a passo na skill `login-queres-games`** (com um modelo de função em `exemplo-pontuacao.js`). O Jopuzzle usa o mesmo fluxo dentro da tela dele (`diario.js` chama `QGConta.montar`).
- **Segurança**: 5 códigos errados bloqueiam o apelido por 30 min (só vale para entrar em outro aparelho; quem já está logado não é afetado). `POST` só aceita JSON vindo do próprio site. No máximo 120 contas novas por hora. Apelidos só da lista gerada: nunca texto livre.
- **Tabelas D1** (criadas sozinhas, como nos contadores): `contas`, `sessoes`, `jp_tentativas`, `ie_partidas`.
- **Sem o banco** as rotas respondem 503 e o JoPuzzle esconde o botão do desafio.
- **Desafio do dia do JoPuzzle**: 5 peças diferentes, 600 s, **uma tentativa por conta por dia** (o relógio é do servidor e não para; o dia troca à meia-noite de Brasília). O servidor confere a solução; o tempo mais rápido vence. A lista dos 400 desafios está neste repositório público: quem procurar vê os desafios dos próximos dias (a solução não está lá, só as peças). Para esconder, seria preciso um segredo no Cloudflare.
- **Ranking do mês do JoPuzzle** (`/api/jopuzzle/ranking-mensal[?mes=AAAA-MM]`): soma, no mês (horário de Brasília), os pontos que cada pessoa fez nos desafios do dia. A posição de cada dia vale 1º 10, 2º 8, 3º 6, 4º 5, 5º 4, 6º 3, 7º 2 e os demais 1 ponto (tabela em `PONTOS_POR_POSICAO`, em `functions/_lib/jopuzzle.js`). Empate: mais vitórias, mais dias, menor tempo total. Só conta desafio concluído. Não cria tabela nova: calcula tudo em cima de `jp_tentativas`. No jogo, aba "Do mês" do Ranking, com navegação entre meses (até 12 para trás).
- **Ranking da Invasão Estelar** (`/api/invasao-estelar/ranking?escopo=geral|mes[&mes=AAAA-MM]`): a melhor partida de cada pessoa, no geral e no mês (horário de Brasília), sem somar. Desempate: quem chegou primeiro àquela pontuação. A partida começa em `POST /api/invasao-estelar/iniciar` (precisa de login; uma aberta por vez) e termina em `POST /api/invasao-estelar/enviar`, que recusa pontuação impossível. A conferência limita trapaça, mas **não impede** quem conhece as regras de mandar números plausíveis.
- **Teste local** (precisa de Node 22.23.4+ para o Astro): `npm run build` e `npx wrangler@4 pages dev dist --d1 DB=teste-local`.

## Telemetria

Medição **automática e anônima** de como os jogos são usados, para melhorá-los (decidido com o pai dos meninos). Vale para **todos** os jogos de `public/jogar/<slug>/`, sem mexer nos arquivos dos jogos: o `scripts/pos-build.mjs` coloca `/telemetria.js` em cada `.html` do jogo (e um pedacinho no `<head>` que guarda chamadas de `QG.evento` feitas antes do script carregar). Jogo novo entra sozinho.

**O que é medido**: sessões; tempo ativo (aba visível **e** toque/clique/tecla/rolagem nos últimos 30 s; controle de videogame não conta); erros de JavaScript (mensagem de até 120 letras, nome do arquivo e linha; endereços, e-mails e números longos são trocados por `<url>`, `<email>`, `<n>`); celular (toque) ou computador; faixa da largura da tela; aparelho que volta em outro dia (1 dia, 2 a 7, 8 ou mais); versão do jogo; e os eventos opcionais de `QG.evento`.

**O que NÃO é guardado**: IP, nome, e-mail, texto livre, identificador de aparelho ou de conta, cookie. A "memória" do aparelho (já veio? quando foi a última vez?) fica **só no navegador** (`localStorage` `qg_t_<slug>` com duas datas; `sessionStorage` para a sessão) e **nunca é enviada**: o servidor recebe só "1 aparelho voltou depois de 2 a 7 dias". Não é ligada à conta de apelido (o envio vai sem cookies). Quem tem Do Not Track / Global Privacy Control ligado não é medido. Aba privada ou armazenamento bloqueado: o aparelho não entra na conta de aparelhos/retorno. Não crie identificador por aparelho nem junte isso com `contas` sem decisão do pai e revisão de LGPD (crianças).

**Como funciona o envio**: no máximo 2 a 3 lotes por sessão (começo da sessão, 2 s depois de abrir; ao esconder a aba ou `pagehide`; a cada 5 min de tempo ativo; erros 3 s depois; eventos 20 s depois). `fetch` com `keepalive` e `credentials: 'omit'` (cai para `sendBeacon`). O script é todo em `try/catch`, não lança erro e não altera nada do jogo; tem teto de 3 erros e 40 eventos por carregamento de página.

**Banco** (D1 grátis: 100 mil linhas gravadas/dia; as Functions do Pages dividem 100 mil requisições/dia com o resto do site; `CREATE` automático como nas outras tabelas):
- `tel_diario` (jogo, dia em Brasília, versão): **uma linha por combinação**, só contadores, somados com `INSERT … ON CONFLICT DO UPDATE`. Tabelas `WITHOUT ROWID`, para cada gravação contar 1 linha (sem linha de índice).
- `tel_erros`: erros agrupados por jogo/dia/versão e "impressão" (mensagem+arquivo+linha), com `vezes`. **Teto: 30 tipos distintos por jogo e dia**; o que passar só entra no contador de erros.
- `tel_eventos`: eventos de `QG.evento`. **Teto: 100 combinações (nome+valor) por jogo e dia**; o resto vira o valor `outros`.
- No máximo **6 versões por jogo e dia** (as demais viram `outra`).
- **Freio diário**: depois de 15.000 lotes no dia (todos os jogos), os lotes novos são descartados (204) para não gastar as gravações de contas e rankings. Dá para baixar o teto com a variável (texto, não secreta) `TELEMETRIA_LIMITE_LOTES`.
- Não há poda automática (as linhas são poucas); se um dia crescer, apague `tel_*` com `dia` antigo.

**Versão do jogo**: `public/jogar/<slug>/versao.json`, gravado por `node scripts/gravar-versao.mjs <slug> <pasta-do-jogo-dentro-do-repo> --origem dono/repo` (a skill `publicar-no-queres-games` manda rodar em **toda** publicação; os scripts da Ilha Selvagem e do Ginga já chamam sozinhos). Guarda commit, data do commit, branch, origem e a lista de eventos. A versão nos números é o **commit curto (7)**. Sem o arquivo: `sem-versao` (os jogos antigos). O `versao.json` fica público junto do jogo; não ponha nada secreto nele.

**Eventos opcionais**: `window.QG.evento('fase_concluida', { fase: 3 })`. Só vale o nome que estiver em `eventos` no `versao.json`, que vem do arquivo `qg-eventos.json` na raiz do repositório do jogo (`{ "eventos": ["fase_concluida"] }`; até 12 nomes, minúsculas/números/`_`, 2 a 32 letras). Dados: até 2 pares; número (inteiro, ±999999) ou palavra curta (até 16 letras/números); nunca texto livre nem nome de gente. Cada nome+valor distinto vira uma linha: **não** use pontuação, tempo nem contagem alta como valor (use faixas: `nivel=3`). Conta `vezes` e `sessoes` (a 1ª vez em cada carregamento de página). **Nenhum jogo usa ainda.** Documentação para os repositórios dos jogos: `docs/CLAUDE-para-repositorios-de-jogos.md`.

**Resumo protegido para agentes**: `GET /api/painel/resumo[?dias=14][&jogo=<slug>]` (até 90 dias), com `Authorization: Bearer <chave>`. Devolve só números somados por jogo, dia e versão (nunca dados individuais): total do período, `por_versao`, `por_dia`, erros mais frequentes e eventos, mais `notas` explicando cada campo. Sem o segredo `PAINEL_CHAVE` (mínimo 16 letras; recomendado 40) ou sem o banco: **503**; chave errada: **401**. A chave é um **segredo do Cloudflare Pages** que só o dono vê; **nunca** peça nem leia o valor. Agentes agendados devem receber a chave por `request_credential` (host `queres.games`, cabeçalho `Authorization`, prefixo `Bearer`), que injeta a chave na requisição sem a mostrar à sessão.

**Painel `/painel`**: página estática (`noindex`) que pede a mesma chave, guarda só em `sessionStorage` (some ao fechar a aba) e mostra os números por jogo, versão e dia. Escolha: a mesma chave do resumo, porque é um segredo só para o dono guardar; a página não contém dado nenhum sem a chave. Textos de erro são mostrados com `textContent` (nunca como HTML).

**Limites conhecidos** (diga isso ao interpretar números): quem conhece a rota pode mandar lotes falsos (como nos outros contadores; não há IP para limitar); sessão perdida se o navegador for morto sem avisar; o tempo ativo não vê controle de videogame; "aparelho" que limpa os dados do navegador conta como novo; os números por jogo comparam versões só a partir do dia em que `versao.json` existe. Navegador sem `fetch keepalive` nem `sendBeacon` não envia nada.

**Teste local**: `npm run build` e `npx wrangler@4 pages dev dist --d1 DB=teste-local --binding PAINEL_CHAVE=<chave de teste com 16+ letras>`; abra um jogo, depois `curl -H "Authorization: Bearer <chave>" localhost:8788/api/painel/resumo`. O `wrangler` local liga um banco sozinho; para ver o 503 sem banco, só no Cloudflare.

## Pendências conhecidas

- O `index.html` original do Brasileirão FIFA não tem `<meta charset="utf-8">`; a cópia do site foi corrigida (primeira linha). Ao recopiar, mantenha a correção.
- Repositório de origem do Collatz Rocket não está registrado.
- Frases dos devs em `src/data/devs.ts` ainda vazias.
- Ilha Selvagem: só a versão solo está no site (mundo salvo no `localStorage` do navegador). A versão online (servidor Node + WebSocket, da pasta `ilha/`) não está publicada. O guia rápido em PDF foi escrito a partir do `ilha/MANUAL.md` do jogo e adaptado ao solo; se o jogo mudar muito, regenere (`fontes/manuais/ilha-selvagem/`, PDF via Playwright `page.pdf`).
- Ilustração do Jojô em `public/devs/jojo.webp`: publicada com autorização do pai (ele confirmou no chat). Não trocar nem publicar outras fotos ou ilustrações de crianças sem nova autorização.
- Contadores (visitas e por jogo): banco D1 `queres-games` (binding `DB`, ID no `wrangler.jsonc`). Sem o banco, `/api/visitas` responde 503 e o rodapé esconde o contador. Teste local: `npx wrangler@4 pages dev dist --d1 DB=teste-local`.
