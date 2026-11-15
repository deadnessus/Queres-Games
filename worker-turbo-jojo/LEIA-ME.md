# Servidor online do Turbo Jojo

Um Worker do Cloudflare com Durable Objects (uma "corrida" por código de 4 letras). É um **deploy separado do site** (o site é o projeto Pages `queres-games`). Funciona do mesmo jeito que o do Bento City (`worker-bento-city/`), mas é outro projeto.

## O que ele faz

- Só entra quem está **logado** na conta do site (cookie `qg_sessao`). O servidor lê, no mesmo banco D1 do site, as tabelas `sessoes` e `contas` (só leitura) para saber o apelido.
- O nome do corredor é **sempre o apelido da conta**. Nada digitado pelo navegador vira nome.
- **Não existe chat.** O servidor só repassa mensagens fixas do jogo (posição dos carros, largada, chegada) e **reconstrói cada campo como número**, então nenhum texto livre passa por ele. Mensagens com mais de 2 KB são descartadas, e cada jogador tem limite de cerca de 60 mensagens por segundo.
- **Fases da corrida:**
  1. **Sala de espera:** quem tem o código (4 letras, sem 0/O/1/I) entra. Quem **criou** a corrida escolhe a pista (sorteio, floresta, cidade ou montanha) e dá a largada. Com **6 corredores** a largada é automática. Para largar são precisos pelo menos 2.
  2. **Preparo:** o servidor sorteia a semente da pista e a ordem de largada e manda todos montarem a mesma pista. Quando todos avisam que estão prontos (ou depois de 12 s), as luzes acendem.
  3. **Corrida:** cada celular dirige o próprio carro e manda a posição umas 20 vezes por segundo. Vagas sem gente viram **rivais do computador**, dirigidos pelo celular de quem criou a corrida (se ele sair, o próximo da fila assume). Quem cruza a linha avisa; o servidor decide o lugar pela ordem de chegada.
  4. **Fim:** quando todos os humanos chegaram (ou saíram), ou depois de 6 minutos.
- **Depois da largada ninguém mais entra** ("Essa corrida já começou").
- A mesma conta em outra aba derruba a conexão antiga.
- A sala some **10 minutos depois** que o último jogador sai. O servidor não guarda IP, nome real nem histórico.

## Rotas (todas sob `/online/turbo-jojo`)

| Rota | O que faz |
|---|---|
| `GET /saude` | `{ "ok": true, "banco": true }`. Serve para conferir se o Worker está no ar e enxerga o banco |
| `POST /nova` | devolve `{ "codigo": "ABCD" }` (precisa de login) |
| `GET /sala/<CODIGO>?modo=criar` ou `?modo=entrar` | abre o WebSocket da sala (precisa de login) |

## O que o dono do site precisa fazer no Cloudflare (uma vez)

É o mesmo passo a passo do Bento City, só mudam o **nome do projeto** e o **diretório raiz**. Use o **navegador de um computador**.

1. **Entre em** https://dash.cloudflare.com e escolha a conta.
2. **Abra Workers & Pages**: menu lateral, **Compute (Workers)**, **Workers & Pages**.
3. **Crie o Worker ligado ao GitHub**: botão **Create application** e escolha **Import a repository**.
4. **Escolha o repositório** `deadnessus/Queres-Games`.
5. **Preencha:**
   - **Project name**: `turbo-jojo-online`. Precisa ser **exatamente** o `name` do arquivo `worker-turbo-jojo/wrangler.jsonc`.
   - **Production branch**: `main`.
   - Em **Build configuration** (ou **Advanced**):
     - **Root directory** (diretório raiz): `worker-turbo-jojo`
     - **Build command**: deixe vazio
     - **Deploy command**: `npx wrangler deploy`
6. Clique em **Save and Deploy**. O Cloudflare lê o `wrangler.jsonc` e configura sozinho o Durable Object `Sala`, a ligação com o banco `queres-games` (nome `DB`) e a rota `queres.games/online/turbo-jojo/*`.
7. **Confira o deploy.** Deve terminar em verde ("Success").
8. **Teste no navegador:** abra `https://queres.games/online/turbo-jojo/saude`. O esperado é `{"ok":true,"banco":true}`.

### Se algo não bater

| O que aparece | O que significa | O que fazer |
|---|---|---|
| A página 404 do site (e não um JSON) | A rota não está ativa | No Worker `turbo-jojo-online`: **Settings**, **Domains & Routes**, **Add**, **Route**, colocar `queres.games/online/turbo-jojo/*` e a zona `queres.games` |
| `{"ok":true,"banco":false}` | O Worker não enxerga o banco | No Worker: **Settings**, **Bindings**, **Add**, **D1 database**, nome `DB`, banco `queres-games` |
| Erro no deploy falando do nome | O nome do projeto é diferente do `name` do `wrangler.jsonc` | Renomeie o projeto para `turbo-jojo-online` |

## Depois do deploy

Quando o `/saude` responder certo, avise quem está ajudando: aí o jogo com a corrida online é publicado no site (`public/jogar/turbo-jojo/`). Antes disso o site continua com o Turbo Jojo só offline.

## Testar localmente (sem Cloudflare)

```
cd worker-turbo-jojo
npx wrangler@4 dev --local --persist-to .wrangler/state --port 8787
```

O banco local precisa das tabelas `contas` e `sessoes` com contas de teste (o site local, `npx wrangler@4 pages dev dist --d1 DB=queres-games --persist-to .wrangler/state`, cria as tabelas e as contas). O jogo aceita `?online=ws://localhost:8787/online/turbo-jojo` na URL para falar com esse servidor local (só endereços `localhost`).

## Limites conhecidos

- O servidor **confia nas posições e nos avisos de chegada** que o jogo manda. Não há anti-trapaça: é uma corrida entre amigos. Os prêmios em R$ ficam no navegador de cada um (como no modo normal).
- Online, os carros **não batem entre si** (cada um vê os outros como "fantasmas"), e as caixas de item valem só para quem as pega.
- O código de 4 letras tem cerca de 1 milhão de combinações, e só dá para entrar antes da largada.
