---
name: login-queres-games
description: Coloca login (conta com apelido + código de 3 caracteres), ranking, placar ou dados por jogador num jogo do site queres.games, com a MESMA experiência de login em todos os jogos (confirmar apelido ao criar conta, três rodas animal/qualidade/número ao entrar). Use quando pedirem "login", "conta", "apelido", "ranking", "placar", "desafio diário" ou "salvar progresso na nuvem" em um jogo do queres.games.
---

# Login nos jogos do queres.games (mesma experiência em todos)

Todos os jogos usam **a mesma conta** (o cookie vale no site todo) e **o mesmo fluxo de login**, que fica num arquivo só: **`public/conta.js`** (servido em `/conta.js`). **Não crie outro sistema nem outra tela de login.** Para mudar a experiência, mude só esse arquivo (seção 7). Leia também a seção **Contas** do `CLAUDE.md`.

## 1. Regras que não mudam (público infantil)

- A conta é só um **apelido gerado** ("Lobo Azul": bicho + qualidade, lista fixa; se os 300 acabarem, "Lobo Azul 7") e um **código de 3 caracteres**. **Nunca** peça nome, e-mail, telefone, idade, foto ou senha. **Nunca** guarde IP.
- **Nada de texto livre** que outras pessoas vejam (nem apelido digitado, mensagem, chat ou comentário). O ranking mostra só o apelido gerado e números.
- O código de 3 caracteres foi escolha do dono do site (a conta não guarda nada de valor). Não o enfraqueça nem crie outro jeito de entrar.
- Mudar essas regras é decisão do dono: pergunte, não decida.
- O jogo **tem que funcionar sem servidor e sem login** (por exemplo, o repositório do jogo aberto direto no navegador). Login é um extra: sem servidor `QGConta` não existe ou `QGConta.me()` devolve `null`, e o jogo esconde os botões de conta.

## 2. A experiência de login (igual em todos os jogos)

**Criar conta**
1. **"Escolha seu apelido"**: 20 apelidos livres, sorteados. Botão "Outros apelidos" sorteia outros 20.
2. **"Confirmar apelido"**: tocar num apelido **não cria a conta**. Mostra o apelido em destaque e o aviso "Você vai aparecer assim no ranking de todos os jogos do queres.games. Depois não dá para trocar." Botões: **Confirmar** e **Escolher outro**.
3. **"Conta criada!"**: só depois de confirmar. Marca de certo, "Bem-vindo, *apelido*!", o **código** grande e o aviso "Anote este código…". O botão é **"Anotei meu código"** (não "OK"): a pessoa precisa ver o código antes de seguir.

**Já tenho conta**
1. **Três rodas, no estilo "picker view" do iOS**: **Animal**, **Qualidade** e **Número**. A roda do número tem **"vazio" como padrão**.
2. As rodas mostram só o que existe: os animais, as qualidades e os números que aparecem em contas existentes (vêm de `/api/conta/apelidos`; não copie listas para o jogo).
3. Embaixo das rodas: o apelido montado em letras grandes e a situação, **"Conta encontrada"** ou **"Essa conta não existe. Mexa nas rodas."** O botão Entrar só liga quando a conta existe.
4. Depois o campo do **código** (3 letras ou números; aceita minúsculas) e o botão **Entrar**.
5. Neste aparelho, as rodas já começam no **último apelido** usado (guardado em `localStorage`, chave `qg_ultimo_apelido`, só o apelido).
6. Erros: "Apelido ou código incorreto. Mais N tentativas." e, depois de 5 erros, "Muitas tentativas. Espere N min e tente de novo." (bloqueio de 30 min no servidor).

**Perfil**: apelido, código e **Sair da conta**.

Os textos acima são os do `conta.js`. Não reescreva por jogo: a ideia é a criança ver a mesma tela em qualquer jogo.

## 3. Usar no jogo (cliente)

```html
<script src="/conta.js?v=2"></script>
```

O caminho é **absoluto** (`/conta.js`): o jogo roda em `/jogar/<slug>/` e o arquivo é o do site. Assim todos os jogos usam sempre a mesma versão.

```js
const eu = window.QGConta ? await QGConta.me() : null;   // { logado, apelido } | null (null = sem servidor: esconda os botões)
if (eu && !eu.logado) botao.onclick = async () => { const r = await QGConta.entrar(); /* { apelido } ou null */ };
if (eu && eu.logado) botao.onclick = () => QGConta.perfil();
QGConta.aoMudar((eu) => atualizarTela(eu));   // depois de criar conta, entrar ou sair

// O mesmo fluxo dentro de uma tela do próprio jogo (o Jopuzzle faz assim, em diario.js):
QGConta.montar(elemento, { aoConcluir: ({ apelido }) => {}, aoFechar: () => {}, aba: 'criar' /* ou 'entrar' */, rotuloFechar: 'Voltar ao jogo' });
```

- Cores: variáveis CSS no `:root` do jogo (`--qgc-acento`, `--qgc-destaque`, `--qgc-rosa`, `--qgc-fundo`, `--qgc-texto`, `--qgc-fonte`).
- O `conta.js` já cuida de: campos digitáveis no Safari (`user-select: text`), fonte ≥ 16 px nos campos (sem zoom do iPhone), rodas que rolam mesmo se o jogo bloqueia `touchmove` na página, e janela com rolagem em telas baixas.
- Jogos que o próprio repositório de origem abre sem o site (GitHub Pages, arquivo local) não têm `/conta.js`: confira `window.QGConta` antes de usar.

## 4. Servidor (já existe)

Rotas em `functions/api/conta/` (banco D1 `DB`): `GET me`, `GET sugestoes`, `GET apelidos`, `POST criar`, `POST entrar`, `POST sair`, `GET codigo`. Biblioteca: `functions/_lib/conta.js` (`contaAtual`, `json`, `lerJson`, `origemInvalida`, `prepararBanco`, `semBanco`). Não é preciso criar nada para o login funcionar num jogo novo.

Para **guardar dados do jogo** (ranking, progresso), crie `functions/api/<slug>/<rota>.js`. Modelo pronto nesta pasta: `exemplo-pontuacao.js` (melhor pontuação por conta + ranking). O desafio do dia do Jopuzzle (`functions/api/jopuzzle/` e `functions/_lib/jopuzzle.js`) é um exemplo completo, com tentativa única por dia e conferência da solução. Regras:

- Tabelas com o prefixo do jogo (`jp_`, `ilha_`, ...) e `conta_id` (= `contas.id`). Criar com `CREATE TABLE IF NOT EXISTS`, uma vez por instância. **Nunca altere `contas` nem `sessoes`**: o banco é um só, de produção.
- Quem é a pessoa: sempre `contaAtual(request, env)`. Nunca confie em apelido ou id vindo do pedido. Sem login: `401`.
- `POST`: confira `origemInvalida(request)` e leia o corpo com `lerJson`.
- **Pontuação e tempo são do servidor**: confira a jogada lá e use o relógio dele. O navegador pode mentir.
- Só `.bind(...)` nos parâmetros. Dia = horário de Brasília (`diaDeHoje()` em `functions/_lib/jopuzzle.js`).
- Plano gratuito tem pouco tempo de CPU por pedido: sem laços pesados nem hash lento.
- Sem `env.DB`, responda `503` (`semBanco()`) e o jogo esconde o recurso.

## 5. Testar

```
# o Astro exige Node 22.23.4+; se faltar: npm install node@22.23.4 numa pasta à parte e ponha node_modules/.bin no PATH
npm install && npm run build
npx wrangler@4 pages dev dist --d1 DB=teste-local --port 8788 --ip 127.0.0.1
```

Rode no Playwright (celular 390×844 e 360×640) e confira:
- criar conta: tocar num apelido **não cria** (confira `/api/conta/apelidos`); "Escolher outro" não cria; só "Confirmar" cria; aparece "Conta criada!" com o código; "Anotei meu código" segue;
- entrar: três rodas, "vazio" como padrão no número, combinação inexistente desliga o Entrar, tocar num item, seta do teclado e rolar com o mouse movem a roda e ela encaixa num item, código errado mostra o erro, código certo (também em minúsculas) entra;
- recarregar continua logado; sair volta a anônimo;
- jogo sem servidor continua funcionando.

Para simular o tempo passando, altere o SQLite **local** em `.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite`, nunca o banco real.

Relate com honestidade o que rodou só no simulador local e o que **não** foi testado no Cloudflare de verdade nem num celular real (o toque nas rodas num iPhone é o mais importante).

## 6. Antes de publicar

- [ ] O jogo funciona sem servidor e sem login.
- [ ] O fluxo é o de `/conta.js`, sem textos ou telas próprias de login.
- [ ] Nada de texto livre, e-mail, nome, IP nem chat. Ranking só com apelido gerado.
- [ ] O servidor confere a jogada e mede o tempo.
- [ ] Tabelas novas com prefixo do jogo; nenhuma mudança em `contas`/`sessoes`.
- [ ] `npm run build` termina com "Complete!".
- [ ] `CLAUDE.md` atualizado (funções do jogo e tabelas D1 novas) e post no blog.

Depois, a skill **`publicar-no-queres-games`** (branch, PR, merge). Como é coleta de dados em site infantil, **pergunte ao dono antes de juntar na `main`**.

## 7. Mudar a experiência do login

1. Edite **só** `public/conta.js` e atualize os textos da seção 2.
2. Troque o `?v=` do `<script src="/conta.js?v=N">` em **todos** os jogos que o usam (e no `CLAUDE.md`), por causa do cache do Safari.
3. Rode os testes da seção 5.
