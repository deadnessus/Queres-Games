---
name: publicar-no-queres-games
description: Publica um jogo novo ou a atualização de um jogo no site queres.games (repositório deadnessus/queres-games, Cloudflare Pages), com capa, card, manuais e post no blog. Use quando pedirem para "subir", "publicar", "colocar no queres.games", "atualizar o jogo no site" ou "atualizar o blog".
---

# Publicar no queres.games

Leia antes o `CLAUDE.md` da raiz do repositório `queres-games` (mapa do site, tabela de jogos e regras).

## 0. Preparar os repositórios

- A sessão precisa do repositório `deadnessus/queres-games` e do repositório do jogo. Se faltar algum, adicione com `add_repo` (precisa de `push` no `queres-games`).
- Clone raso (`--depth 1`) só busca uma branch. Para o Git (e o hook de "unpushed commits") enxergar branches remotas novas, rode no clone:
  `git config --unset-all remote.origin.fetch; git config --add remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'; git fetch origin`
- **Sempre** atualize a `main` antes de começar (`git checkout main && git pull origin main`): outras sessões também publicam aqui.
- No repositório do jogo, traga a branch certa (ver tabela no CLAUDE.md; a Ilha Misteriosa usa `master`) e leia o que mudou: `git log`, mensagens completas (`git log --format='%h %s%n%b'`), `git diff --stat <último publicado> HEAD` e o diff do README.

## 1. Copiar os arquivos do jogo

- Copie **só o que o jogo usa** para `public/jogar/<slug>/`: `index.html`, CSS, JS, assets, `manifest.json`, ícones. Para a Ilha Misteriosa: `index.html style.css manifest.json icon.svg src/`.
- **Não copie**: `README.md`, `tools/`, `__pycache__/`, `.git`, pastas de teste, arquivos soltos fora do lugar (ex.: houve um `undefined/disc.png` por engano), nem `manual/` (PDFs vão em `public/manuais/`, passo 3).
- Ao atualizar, apague a pasta de código antiga antes de copiar (ex.: `rm -rf public/jogar/<slug>/src`) para não sobrar arquivo removido no original.
- Confira caminhos: precisam ser **relativos** (`src/x.js`, `./assets/...`), porque o jogo roda em `/jogar/<slug>/`.
- Confira `<meta charset="utf-8">` no começo do `index.html`; sem ele os acentos quebram ("BrasileirÃ£o"). O Brasileirão FIFA precisa dessa linha acrescentada.
- Se o script novo do jogo (ex.: `src/sites.js`) não estiver referenciado no `index.html` copiado, algo está errado.

## 2. Testar o jogo localmente

Chromium e Playwright já vêm instalados (`require('playwright')`). Sirva a pasta e abra o jogo:

```
cd public/jogar/<slug> && (nohup python3 -m http.server 8140 >/dev/null 2>&1 & echo $! > /tmp/srv.pid)
# script Playwright: abrir a página, ouvir 'pageerror' e console 'error', clicar no início do jogo, tirar screenshot
kill $(cat /tmp/srv.pid)
```

Não use `pkill -f "http.server ..."` / `pgrep -f`: o padrão casa com o próprio comando e mata o shell. Guarde o PID e use `kill`.

Relate com honestidade o que foi testado (abriu sem erros) e o que não foi (mecânicas específicas, celular).

## 3. Card, capa e manuais

- **Card** em `src/content/jogos/<slug>.md`:

```
---
titulo: Nome do Jogo
descricao: "Texto curto. Use aspas se tiver dois-pontos: assim."
status: jogavel            # ou em-desenvolvimento
autores: [jojo, bento]     # pergunte se não souber
ordem: 6
capa: /capas/<slug>.webp
cores: ['#3b2f8f', '#3ee6d0']   # degradê usado se não houver capa
url: /jogar/<slug>/
links:                     # opcional, aparece ao lado do botão Jogar
  - rotulo: Manual (PDF)
    url: /manuais/<slug>/Manual.pdf
---
```

- **Capa**: screenshot do jogo rodando (Playwright, de preferência `deviceScaleFactor: 2`), recortada e salva em 800×450 webp: `convert shot.png -crop LxA+X+Y +repage -resize 800x450! -quality 85 public/capas/<slug>.webp`. Olhe a imagem antes de usar. Jogo de celular em retrato: centralize o print sobre um degradê 800×450.
- **Manuais**: PDFs em `public/manuais/<slug>/` e link no campo `links`. Se o jogo atualizou o manual, substitua os PDFs.

## 4. Post no blog (diário)

Toda publicação visível ganha um post em `src/content/blog/<slug-do-post>.md`:

```
---
titulo: "Nome do Jogo: o que mudou"
resumo: "Uma frase. Sempre entre aspas."
data: 2026-11-04T09:09:00-03:00
jogo: <slug-do-jogo>
---
```

- **Sempre entre aspas** `titulo` e `resumo`: dois-pontos sem aspas quebram o YAML e o build.
- `data` em horário de Brasília com `-03:00` (o site mostra as datas nesse fuso). Use o horário do commit do jogo convertido para Brasília; commits do Claude costumam estar em UTC.
- Voz: primeira pessoa do plural ("nós"/"a gente"), simples, para crianças e famílias.
- Seções: `## O que mudou`, `## Bug` (se houver), `## Dá para fazer agora?` (o que o jogador pode testar já; lembrar de recarregar sem cache se for atualização), `## O que vem a seguir` (só planos reais: README/roadmap; não prometa nada).
- Use só fatos de commits, README e telas do jogo. Se um post antigo ficou desatualizado, não reescreva: acrescente `## Atualização de <data>` com link para o post novo.
- Não conte bastidores (build que falhou, configuração do Cloudflare).

## 5. Build, commit, PR e merge

```
npm install        # se node_modules não existir
npm run build      # tem que terminar com "Complete!"; erro de YAML aponta o arquivo e a linha
git checkout -b claude/<assunto>
git add -A && git commit   # mensagem em português, dizendo o commit de origem do jogo
git push -u origin claude/<assunto>
```

Depois, com as ferramentas do GitHub MCP: `create_pull_request` (base `main`) e `merge_pull_request` (método `merge`). Se o usuário pediu para "subir"/"publicar", o merge está autorizado; em mudanças de layout ou estrutura do site, mostre antes e pergunte.

Para mudanças de layout, rode `dist/` num servidor local e tire screenshots em 1280px e 390px; confira que não há rolagem lateral (`document.documentElement.scrollWidth > innerWidth`).

## 6. Depois de publicar

- Diga ao usuário: PR e merge feitos, o que entrou, o que foi testado e o que não foi, e que o Cloudflare publica em alguns minutos (se aparecer a versão antiga, recarregar sem cache ou aba anônima).
- Se publicou um jogo novo ou mudou a origem de um jogo, atualize a tabela de jogos no `CLAUDE.md`.
