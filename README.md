# queres.games

Site com todos os jogos dos irmãos Jojô e Bento. Feito com [Astro](https://astro.build) (site estático) e hospedado no Cloudflare.

## Rodar no computador

```
npm install
npm run dev      # abre em http://localhost:4321
npm run build    # gera a pasta dist/
```

## Como adicionar um jogo

1. Copie os arquivos do jogo para `public/jogar/<nome-do-jogo>/` (o `index.html` fica nessa pasta). O jogo abre em `queres.games/jogar/<nome-do-jogo>/`.
2. Crie `src/content/jogos/<nome-do-jogo>.md` com os dados do card:

```
---
titulo: Nome do Jogo
descricao: Uma ou duas frases sobre o jogo.
status: jogavel            # ou: em-desenvolvimento
autores: [jojo]            # jojo, bento ou os dois: [jojo, bento]
ordem: 4                   # posição na lista
capa: /capas/nome-do-jogo.webp   # imagem em public/capas/ (opcional)
cores: ['#3b2f8f', '#ff8a5b']    # degradê usado se não houver capa
url: /jogar/nome-do-jogo/
---
```

Para colocar links ao lado do botão Jogar (por exemplo, um manual em PDF), guarde o arquivo em `public/manuais/<nome-do-jogo>/` e acrescente ao arquivo do jogo:

```
links:
  - rotulo: Manual (PDF)
    url: /manuais/nome-do-jogo/Manual.pdf
```

Para destacar o jogo na home, adicione `destaque: true` (só um jogo por vez).

## Como escrever um post no blog

Crie `src/content/blog/<titulo-do-post>.md`:

```
---
titulo: Título do post
resumo: Uma frase que aparece na lista de posts.
data: 2026-11-15
jogo: jopuzzle     # opcional: nome do arquivo do jogo em src/content/jogos
---
Texto do post em Markdown.
```

O nome do arquivo vira o endereço: `queres.games/blog/titulo-do-post/`.

## Textos dos devs

Edite `src/data/devs.ts`.

## Publicar no Cloudflare

O site roda no Cloudflare Pages, ligado a este repositório. Cada push na branch `main` publica o site sozinho.

Configuração do projeto (em Workers & Pages, projeto `queres-games`, Settings, Build):

- Framework preset: **Astro**
- Build command: `npm run build`
- Build output directory: `dist`
- Versão do Node: vem do arquivo `.node-version` (o Astro exige 22.23.4 ou mais novo)

O arquivo `wrangler.jsonc` guarda o nome do projeto e a pasta de saída.
