---
name: login-queres-games
description: Coloca login (conta com apelido + código de 3 caracteres), ranking, placar ou dados por jogador num jogo do site queres.games, usando a conta compartilhada do site. Use quando pedirem "login", "conta", "apelido", "ranking", "placar", "desafio diário" ou "salvar progresso na nuvem" em um jogo do queres.games.
---

# Login e ranking nos jogos do queres.games

Todos os jogos do site usam **a mesma conta**. Quem criou o apelido no Jopuzzle já está logado em qualquer outro jogo, porque o cookie vale no site todo. **Não crie outro sistema de login.** Leia antes a seção **Contas** do `CLAUDE.md`.

## 0. Regras que não mudam (público infantil)

- A conta é só um **apelido gerado** ("Lobo Azul": bicho + qualidade, lista fixa) e um **código de 3 caracteres**. **Nunca** peça nome, e-mail, telefone, idade, foto ou senha. **Nunca** guarde IP.
- **Nada de texto livre** que apareça para outras pessoas (nada de apelido digitado, mensagem, chat, comentário). O ranking mostra só o apelido gerado e números.
- O código de 3 caracteres foi escolha do dono do site (a conta não guarda nada de valor). **Não** o enfraqueça e não crie outro jeito de entrar sem ele.
- Mudar essas regras é decisão do dono do site: pergunte, não decida.
- O jogo **tem que continuar funcionando sem servidor e sem login** (abrindo o `index.html` direto, ou se o banco cair). Login é um extra.

## 1. O que já existe

Servidor (`functions/api/conta/`, banco D1 `DB`, tabelas `contas` e `sessoes`):

| Rota | Faz |
|---|---|
| `GET /api/conta/me` | `{ logado: false }` ou `{ logado: true, apelido }` |
| `GET /api/conta/sugestoes` | 20 apelidos livres, sorteados |
| `GET /api/conta/apelidos` | apelidos que já têm conta (tela "Entrar") |
| `POST /api/conta/criar` `{apelido}` | `201 { apelido, codigo }` e já loga. `409` apelido tomado, `429` muitas contas novas |
| `POST /api/conta/entrar` `{apelido, codigo}` | loga. `401` errado (`restantes`), `429` bloqueado 30 min depois de 5 erros |
| `POST /api/conta/sair` | apaga a sessão deste aparelho |
| `GET /api/conta/codigo` | `{ apelido, codigo }` de quem está logado |

Biblioteca para as suas funções: `functions/_lib/conta.js` (`contaAtual`, `json`, `lerJson`, `origemInvalida`, `prepararBanco`, `semBanco`).

Cliente pronto para qualquer jogo: **`/conta.js`** (`public/conta.js`), com janela de criar conta / entrar / perfil.

## 2. Usar a conta no jogo (cliente)

No `index.html` do jogo (caminho absoluto, o jogo roda em `/jogar/<slug>/`):

```html
<script src="/conta.js?v=1"></script>
```

```js
const eu = await QGConta.me();       // { logado, apelido } | null  (null = sem servidor de contas)
if (eu === null) { /* esconda os botões de conta; o jogo segue normal */ }
else if (!eu.logado) botaoEntrar.onclick = async () => { const r = await QGConta.entrar(); /* { apelido } ou null */ };
else botaoPerfil.onclick = () => QGConta.perfil();   // mostra apelido, código e "Sair da conta"
QGConta.aoMudar((eu) => atualizarTela(eu));          // depois de entrar ou sair
```

- As cores da janela vêm de variáveis CSS (`--qgc-fundo`, `--qgc-texto`, `--qgc-acento`, `--qgc-destaque`, `--qgc-rosa`, `--qgc-fonte`). Defina no `:root` do jogo para combinar com ele.
- Troque o `?v=` do `<script>` sempre que mudar o `conta.js` (cache do Safari).
- Jogo com tela cheia própria (como o Jopuzzle): veja `public/jogar/jopuzzle/diario.js`, que usa as mesmas rotas com telas dentro do próprio jogo.
- Cuidados em celular: campos de texto precisam de `user-select: text` (o Safari não deixa digitar dentro de `user-select: none`); se o jogo bloqueia `touchmove` no documento, a janela precisa de uma exceção para rolar; fonte dos campos ≥ 16 px (senão o iPhone dá zoom).

## 3. Guardar dados do jogo (servidor)

Crie `functions/api/<slug>/<rota>.js`. Modelo pronto: `exemplo-pontuacao.js` nesta pasta (melhor pontuação por conta e ranking). Regras:

- **Tabelas** com o prefixo do jogo (`jp_`, `ilha_`, ...) e uma coluna `conta_id` (= `contas.id`). Crie com `CREATE TABLE IF NOT EXISTS`, uma vez por instância (como em `functions/_lib/jopuzzle.js`). **Nunca altere as tabelas `contas` e `sessoes`** de outros jogos sem avisar o dono: o banco é um só, de produção.
- **Quem é a pessoa**: sempre `contaAtual(request, env)` (cookie). Nunca confie em apelido ou id vindo do corpo do pedido. Sem login: `401`.
- **POST**: confira `origemInvalida(request)` e leia o corpo com `lerJson`.
- **Pontuação e tempo são do servidor**: confira a jogada no servidor e use o relógio dele (veja `enviar.js` do Jopuzzle). O que o navegador diz pode ser inventado.
- **Dia**: para "desafio do dia" use o horário de Brasília (`diaDeHoje()` em `functions/_lib/jopuzzle.js`).
- **Só parâmetros** (`.bind(...)`), nunca monte SQL com texto do pedido.
- Pages Functions no plano gratuito tem **pouco tempo de CPU** por pedido: nada de laços pesados nem hash lento (por isso o código é curto e o servidor só confere a jogada).
- Se `env.DB` não existir, responda `503` (`semBanco()`): o jogo esconde o recurso.

## 4. Testar

```
# o Astro exige Node 22.23.4+; se faltar: npm install node@22.23.4 numa pasta à parte e ponha node_modules/.bin no PATH
npm install && npm run build
npx wrangler@4 pages dev dist --d1 DB=teste-local --port 8788 --ip 127.0.0.1
```

- Rode um script de API (Node `fetch` com o cookie `qg_sessao`) cobrindo: sem login `401`; pedido com `Origin` de outro site `403`; jogada inválida `400`; jogada válida; repetida; ranking ordenado.
- Rode o jogo no Playwright (celular 390×844 e 360×640): criar conta, jogar, recarregar (continua logado), sair, entrar com o código.
- Para simular o tempo passando, altere o SQLite local em `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite` (não o banco real).
- Relate com honestidade: o que rodou só no simulador local e o que **não** foi testado no Cloudflare de verdade nem em celular real.

## 5. Antes de publicar

- [ ] O jogo funciona sem servidor e sem login.
- [ ] Nada de texto livre, e-mail, nome, IP nem chat. Ranking só com apelido gerado.
- [ ] O servidor confere a jogada e mede o tempo.
- [ ] Tabelas novas com prefixo do jogo; nenhuma mudança em `contas`/`sessoes`.
- [ ] `npm run build` termina com "Complete!".
- [ ] `CLAUDE.md` atualizado: linha na tabela "Onde fica cada coisa" (funções do jogo) e tabelas D1 novas na seção **Contas**.
- [ ] Post no blog (diário), sem contar bastidores.

Depois use a skill **`publicar-no-queres-games`** (branch, PR, merge). Como é coleta de dados nova num site infantil, **pergunte ao dono antes de juntar na `main`**.
