# Servidor online do Bento City

Um Worker do Cloudflare com Durable Objects (uma "sala" por código de 4 letras). É um **deploy separado do site** (o site é o projeto Pages `queres-games`).

## O que ele faz

- Só entra quem está **logado** na conta do site (cookie `qg_sessao`). O servidor lê, no mesmo banco D1 do site, as tabelas `sessoes` e `contas` (só leitura) para saber o apelido.
- O nome do jogador na cidade é **sempre o apelido da conta**. O nome que o navegador mandar é ignorado.
- **Não existe chat.** Só são repassadas as mensagens fixas do jogo: posição (`s`), veículo (`v`), veículo removido (`vdel`), buzina (`honk`) e visual (`look`). Qualquer outro tipo é descartado. Mensagens com mais de 4 KB são descartadas, e cada jogador tem limite de cerca de 60 mensagens por segundo.
- Entra quem tem o código (4 letras, sem 0/O/1/I). Até 16 jogadores por sala. A mesma conta em outra aba derruba a conexão antiga.
- A sala some **10 minutos depois** que o último jogador sai. O servidor não guarda IP, nome real nem histórico.

## Rotas (todas sob `/online/bento-city`)

| Rota | O que faz |
|---|---|
| `GET /saude` | `{ "ok": true, "banco": true }`. Serve para conferir se o Worker está no ar e enxerga o banco |
| `POST /nova` | devolve `{ "codigo": "ABCD" }` (precisa de login) |
| `GET /sala/<CODIGO>?modo=criar` ou `?modo=entrar` | abre o WebSocket da sala (precisa de login) |

## O que o dono do site precisa fazer no Cloudflare (uma vez)

Use o **navegador de um computador** (a tela do Cloudflare no celular esconde opções).

1. **Entre em** https://dash.cloudflare.com e escolha a conta.
2. **Abra Workers & Pages**: menu lateral, **Compute (Workers)**, **Workers & Pages**.
3. **Crie o Worker ligado ao GitHub**: botão **Create application** e escolha **Import a repository** (importar um repositório). Se o Cloudflare pedir, autorize o acesso ao GitHub; é o mesmo acesso que o site já usa.
4. **Escolha o repositório** `deadnessus/Queres-Games`.
5. **Preencha:**
   - **Project name** (nome do projeto): `bento-city-online`. O nome precisa ser **exatamente** o `name` do arquivo `worker-bento-city/wrangler.jsonc`.
   - **Production branch**: `main`.
   - Abra **Build configuration** (configuração de build) ou **Advanced** e preencha:
     - **Root directory** (diretório raiz): `worker-bento-city`
     - **Build command**: deixe vazio
     - **Deploy command**: `npx wrangler deploy`
6. Clique em **Save and Deploy**. O Cloudflare lê o `wrangler.jsonc` e configura sozinho: o Durable Object `Sala`, a ligação com o banco `queres-games` (nome `DB`) e a rota `queres.games/online/bento-city/*`.
7. **Confira o resultado do deploy.** Deve terminar em verde ("Success"). Se falhar, copie as últimas linhas do log e mande para quem está ajudando.
8. **Teste no navegador** abrindo `https://queres.games/online/bento-city/saude`. O esperado é: `{"ok":true,"banco":true}`.

### Se algo não bater

| O que aparece | O que significa | O que fazer |
|---|---|---|
| A página 404 do site (e não um JSON) | A rota não está ativa | No Worker `bento-city-online`: **Settings**, **Domains & Routes**, **Add**, **Route**, colocar `queres.games/online/bento-city/*` e a zona `queres.games` |
| `{"ok":true,"banco":false}` | O Worker não enxerga o banco | No Worker: **Settings**, **Bindings**, **Add**, **D1 database**, nome `DB`, banco `queres-games` |
| Erro no deploy falando de Durable Objects ou plano | O plano pode não incluir Durable Objects | Confira o plano da conta no Cloudflare (Durable Objects com SQLite têm uma parte grátis; confirme o limite atual) |
| Erro no deploy falando do nome | O nome do projeto é diferente do `name` do `wrangler.jsonc` | Renomeie o projeto para `bento-city-online` |

## Depois do deploy

Quando o `/saude` responder certo, avise quem está ajudando: aí o jogo com o online é publicado no site (a cópia em `public/jogar/bento-city/` e o `Bento-2`). Antes disso o site continua com o Bento City só offline.

## Testar localmente (sem Cloudflare)

```
cd worker-bento-city
npx wrangler@4 d1 execute queres-games --local --persist-to .wrangler/state --file <arquivo com as tabelas contas e sessoes e algumas contas de teste>
npx wrangler@4 dev --local --persist-to .wrangler/state --port 8787
```

O jogo aceita `?online=ws://localhost:8787/online/bento-city` na URL para falar com esse servidor local (só endereços `localhost`).

## Limites conhecidos

- O servidor **confia nas mensagens de posição e veículos** que o jogo manda (o jogo é um sandbox, sem placar). Não há anti-trapaça.
- O código de 4 letras tem cerca de 1 milhão de combinações. Quem sabe o código entra, e quem tenta códigos ao acaso só acha uma sala se acertar. Não há aprovação do dono da sala.
