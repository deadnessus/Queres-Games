# Servidor online do Fúria

Um Worker do Cloudflare com Durable Objects (uma "sala" por código de 4 letras). É um **deploy separado do site** (o site é o projeto Pages `queres-games`). Segue o mesmo modelo do Bento City e do Turbo Jojo, mas é outro projeto.

## Também atende o Infiltrados na Órbita

Este Worker também serve `queres.games/online/infiltrados/*`, com o código em `src/infiltrados.js`. As salas do Infiltrados são outro Durable Object (`SalaInfiltrados`, ligação `SALAS_INF`, migração `v2`) e não se misturam com as do Fúria. O `index.js` só repassa esse caminho. Detalhes do Infiltrados: `worker-infiltrados/LEIA-ME.md`.

## Também atende o Origines (jogar com um amigo)

Este Worker também serve `queres.games/online/origines/*`, com o código em `src/origines.js` (Durable Object `SalaOrigines`, ligação `SALAS_ORI`, migração `v3`; as salas não se misturam com as do Fúria nem com as do Infiltrados). Rotas: `GET /online/origines/saude`, `POST /online/origines/nova` (código, precisa de login) e o WebSocket `GET /online/origines/sala/<CODIGO>?modo=criar|entrar`.
- O anfitrião cria a sala no jogo dele; **um** amigo entra.
- O servidor só repassa: os turnos (anfitrião → amigo), as ordens (amigo → anfitrião), a pausa e o jogo salvo quando o amigo entra.
- Turnos, ordens e pausa: só números. O jogo salvo passa pela mesma conferência do save na nuvem.
- Se o anfitrião cai, o amigo espera 30 s (alarme do Durable Object); se o anfitrião sai, a sala acaba.

Teste local: `npx wrangler@4 dev --local --persist-to <pasta> --port 8787` aqui e o site com `npx wrangler@4 pages dev dist --persist-to <mesma pasta>`. Os dois usam o mesmo banco local, com contas de teste. Depois abra o jogo com `?online=ws://localhost:8787/online/origines`.

## Também atende o Origines (partida online, M6)

Em `queres.games/online/origines/partida/*`, com o código em `src/origines-partida.js` (Durable Object `SalaPartidaOrigines`, ligação `SALAS_PARTIDA`, migração `v5`). O `index.js` manda esse caminho para lá **antes** da rota do jogo com um amigo. Rotas: `GET /online/origines/partida/saude`, `POST /online/origines/partida/nova` (código, precisa de login) e o WebSocket `GET /online/origines/partida/sala/<CODIGO>?modo=criar|entrar&v=<versão do jogo>`.
- Sala de espera, até 4: quem criou escolhe o modo (1 contra 1, 2 contra 2, todos contra todos com 3 ou 4) e a dificuldade do computador, troca vagas e começa (com 2 pessoas ou mais). Só entra antes de começar; versão do jogo diferente é recusada.
- Partida: o servidor repassa os turnos do anfitrião para todos e as ordens de cada um para o anfitrião, com a **vaga carimbada aqui**; os sinais prontos vão só para os aliados.
- Só números passam (o jogo salvo, com a mesma conferência do save na nuvem). Nome = apelido; sem chat.
- Quem cai tem 30 s para voltar (alarme do Durable Object); quem sai ou não volta vira computador; se for o anfitrião, quem entrou primeiro passa a dar o ritmo. Na sala de espera, sem quem criou, a sala fecha. Sem ninguém, a sala some.

Teste local: como o do jogo com um amigo (o jogo usa o mesmo `?online=ws://localhost:8787/online/origines` para as duas salas).

## Também atende a Invasão Estelar (duelo e esquadrão)

Este Worker também serve `queres.games/online/invasao-estelar/*`, com o código em `src/invasao-estelar.js` (Durable Object `SalaInvasao`, ligação `SALAS_IE`, migração `v4`; as salas não se misturam com as dos outros jogos). O código vem de `servidor/worker/invasao-estelar.js` do repositório `deadnessus/Megamania` (copie de lá ao atualizar). Rotas: `GET /online/invasao-estelar/saude`, `POST /online/invasao-estelar/nova` (código, precisa de login) e o WebSocket `GET /online/invasao-estelar/sala/<CODIGO>?modo=criar&jogo=duelo|esquadrao` ou `?modo=entrar`.
- **Duelo** (2 pilotos, melhor de 3 rodadas): cada celular manda a própria nave; o servidor conta as rodadas e decide quem derrubou cada alienígena do meio (vale quem avisou primeiro). Quem sai no meio perde.
- **Esquadrão** (2 a 4): o celular de quem criou roda as ondas e manda a "foto" do jogo; os outros mandam a própria nave. Se quem criou sair, a partida acaba para todos.
- Sala de espera: só entra antes de começar; no fim, quem criou pode começar de novo com quem ficou.
- Só números passam (qualquer texto derruba a mensagem); o nome é o apelido da conta; sem chat. A sala some 10 min depois que todos saem.
- Teste local como o do Origines, abrindo o jogo com `?online=ws://localhost:8787/online/invasao-estelar`.

## O que ele faz

- Só entra quem está **logado** na conta do site (cookie `qg_sessao`). O servidor lê, no mesmo banco D1 do site, as tabelas `sessoes` e `contas` (só leitura) para saber o apelido.
- O nome de cada jogador é **sempre o apelido da conta**. O visual do personagem só aceita valores das listas do jogo (classe, elemento, cores `#rrggbb`, acessório).
- **Não existe chat.** Os controles (de quem entrou) e as "fotos" do jogo (de quem criou) só podem ter **números**: qualquer texto faz a mensagem ser descartada. Mensagens grandes demais também são descartadas, e cada jogador tem limite de cerca de 60 mensagens por segundo.
- **Fases:**
  1. **Sala de espera:** quem tem o código (4 letras, sem 0/O/1/I) entra, até 8 pessoas. Quem **criou** escolhe o modo (Luta 1x1 até 2 jogadores, Luta 2x2 até 4, Battlefield até 8), os times (uns contra os outros, ou todos juntos contra os bots) e a dificuldade dos bots, e dá o começo. Com a sala cheia para o modo, começa sozinha. Precisa de pelo menos 2.
  2. **Preparo:** o servidor sorteia a semente e manda todos montarem a mesma arena/mapa e os mesmos bots. Quando todos avisam que estão prontos (ou depois de 15 s), a partida começa.
  3. **Jogo:** o celular de quem criou roda o jogo de verdade e manda a foto; os outros mandam os controles, que vão **só** para o celular de quem criou.
  4. **Fim:** quando quem criou avisa que acabou, quando quem criou sai (aí acaba para todos), ou depois de 45 minutos.
- **Depois do começo ninguém mais entra.** Se quem criou sair ainda na sala de espera, o próximo da fila vira o dono.
- A mesma conta em outra aba derruba a conexão antiga.
- A sala some **10 minutos depois** que o último jogador sai. O servidor não guarda IP, nome real nem histórico.

## Rotas (todas sob `/online/furia`)

| Rota | O que faz |
|---|---|
| `GET /saude` | `{ "ok": true, "banco": true }`. Serve para conferir se o Worker está no ar e enxerga o banco |
| `POST /nova` | devolve `{ "codigo": "ABCD" }` (precisa de login) |
| `GET /sala/<CODIGO>?modo=criar` ou `?modo=entrar` | abre o WebSocket da sala (precisa de login) |

## O que o dono do site precisa fazer no Cloudflare (uma vez)

É o mesmo passo a passo do Turbo Jojo, só mudam o **nome do projeto** e o **diretório raiz**.

1. **Entre em** https://dash.cloudflare.com e escolha a conta.
2. **Abra Workers & Pages** (menu lateral, **Compute (Workers)**, **Workers & Pages**).
3. **Create application**, depois **Import a repository**, e escolha `deadnessus/Queres-Games`.
4. **Preencha:**
   - **Project name**: `furia-online` (precisa ser **exatamente** o `name` do arquivo `worker-furia/wrangler.jsonc`).
   - **Build command**: deixe vazio.
   - **Deploy command**: `npx wrangler deploy`.
   - Em **Advanced settings**, no campo **Path** (diretório raiz): `worker-furia`.
   - **API token**: pode usar o mesmo que já aparece (o dos outros servidores).
5. Toque em **Deploy**. O Cloudflare lê o `wrangler.jsonc` e configura sozinho o Durable Object `Sala`, a ligação com o banco `queres-games` (nome `DB`) e a rota `queres.games/online/furia/*`.
6. **Confira o deploy**: deve terminar em verde ("Success").
7. **Teste no navegador:** `https://queres.games/online/furia/saude` deve mostrar `{"ok":true,"banco":true}`.

### Se algo não bater

| O que aparece | O que significa | O que fazer |
|---|---|---|
| A página 404 do site (e não um JSON) | A rota não está ativa | No Worker `furia-online`: **Settings**, **Domains & Routes**, **Add**, **Route**, colocar `queres.games/online/furia/*` e a zona `queres.games` |
| `{"ok":true,"banco":false}` | O Worker não enxerga o banco | No Worker: **Settings**, **Bindings**, **Add**, **D1 database**, nome `DB`, banco `queres-games` |
| Erro no deploy falando do nome | O nome do projeto é diferente do `name` do `wrangler.jsonc` | Renomeie o projeto para `furia-online` |
| Erro dizendo que não achou o `wrangler.jsonc` | O diretório raiz ficou `/` | Em **Settings**, **Build**, troque o diretório raiz (Path) para `worker-furia` |

## Depois do deploy

Quando o `/saude` responder certo, avise quem está ajudando: aí o jogo com o online é publicado no site (`public/jogar/furia/`). Antes disso o site continua com o Fúria só offline.

## Testar localmente (sem Cloudflare)

```
cd worker-furia
npx wrangler@4 dev --local --persist-to .wrangler/state --port 8787
```

O banco local precisa das tabelas `contas` e `sessoes` com contas de teste (o site local, `npx wrangler@4 pages dev dist --d1 DB=queres-games --persist-to .wrangler/state`, cria as tabelas e as contas). O jogo aceita `?online=ws://localhost:8787/online/furia` na URL para falar com esse servidor local (só endereços `localhost`). Se rodar o site e o servidor juntos, use `--inspector-port` diferente em um deles.

## Limites conhecidos

- O celular de **quem criou** roda a partida: se ele fechar o jogo, trocar de aplicativo por muito tempo ou a internet dele cair, a partida para ou acaba para todos.
- O servidor **confia** no que o celular de quem criou manda (dano, placar) e, no Battlefield, na posição que cada um manda do próprio soldado (com um limite de tamanho de passo). Não há anti-trapaça: é para jogar entre amigos. Não há ranking nem prêmio guardado.
- O código de 4 letras tem cerca de 1 milhão de combinações, e só dá para entrar antes de começar.
