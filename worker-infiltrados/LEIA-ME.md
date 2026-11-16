# Servidor online do Infiltrados na Órbita

> **Hoje este servidor roda dentro do Worker do Fúria** (`worker-furia/src/infiltrados.js`), que já está publicado e se atualiza sozinho a cada merge na `main`. Assim não foi preciso criar outro projeto na Cloudflare. Esta pasta guarda a mesma lógica como Worker separado: se um dia o dono quiser um projeto próprio (`infiltrados-online`), siga o passo a passo abaixo e depois tire do Fúria a rota `/online/infiltrados/*` e o `import` de `infiltrados.js`.

Um Worker do Cloudflare com Durable Objects (uma "sala" por código de 4 letras). É um **deploy separado do site** (o site é o projeto Pages `queres-games`). Segue o mesmo modelo do Fúria, do Bento City e do Turbo Jojo, mas é outro projeto.

## O que ele faz

- Só entra quem está **logado** na conta do site (cookie `qg_sessao`). O servidor lê, no mesmo banco D1 do site, as tabelas `sessoes` e `contas` (só leitura) para saber o apelido.
- O nome de cada jogador é **sempre o apelido da conta**.
- **Não existe chat.** Tudo o que os jogadores mandam só pode ter **números**:
  - `p`: o próprio tripulante (posição, cor, roupas da loja, voto e últimas ações);
  - `g`: o estado da partida, que só o celular do anfitrião monta.

  Qualquer texto faz a mensagem ser descartada. Também são descartadas mensagens grandes demais (mais de 16 KB, ou mais de 120 números em `p` e 2500 em `g`). Cada conexão tem um limite de cerca de 40 mensagens por segundo. As falas dos robôs na reunião são códigos que o jogo transforma em frases prontas.
- O servidor **só repassa**. Ele guarda na memória a última mensagem de cada jogador, para que quem chegar depois veja a sala na hora.
- **Quem pode entrar:**
  - Até 20 conexões por sala. O jogo deixa até 16 jogarem; as outras assistem.
  - Dá para entrar com a partida em andamento. Quem chega assiste e joga na próxima rodada.
- **Quem é o anfitrião:** o anfitrião (quem roda os robôs e as regras) é escolhido pelos próprios celulares. Se ele sair, outro assume e a partida continua.
- A mesma conta em outra aba derruba a conexão antiga.
- **O que fica guardado:** a sala some **10 minutos depois** que o último jogador sai. O servidor não guarda IP, nome real nem histórico; só o apelido de quem passou pela sala, enquanto ela existir.

## Rotas (todas sob `/online/infiltrados`)

| Rota | O que faz |
|---|---|
| `GET /saude` | `{ "ok": true, "banco": true }`. Serve para conferir se o Worker está no ar e enxerga o banco |
| `POST /nova` | devolve `{ "codigo": "ABCD" }` (precisa de login) |
| `GET /sala/<CODIGO>?modo=criar` ou `?modo=entrar` | abre o WebSocket da sala (precisa de login) |

Mensagens do servidor para o jogo: `welcome` (seu número na sala, código, jogadores e nomes de quem já saiu), `join`, `leave`, `p`, `g` e `error`.

## O que o dono do site precisa fazer no Cloudflare (uma vez)

É o mesmo passo a passo do Fúria; só mudam o **nome do projeto** e o **diretório raiz**.

1. **Entre em** https://dash.cloudflare.com e escolha a conta.
2. **Abra Workers & Pages** (menu lateral, **Compute (Workers)**, **Workers & Pages**).
3. **Create application**, depois **Import a repository**, e escolha `deadnessus/Queres-Games`.
4. **Preencha:**
   - **Project name**: `infiltrados-online` (precisa ser **exatamente** o `name` do arquivo `worker-infiltrados/wrangler.jsonc`).
   - **Build command**: deixe vazio.
   - **Deploy command**: `npx wrangler deploy`.
   - Em **Advanced settings**, no campo **Path** (diretório raiz): `worker-infiltrados`.
   - **API token**: pode usar o mesmo que já aparece (o dos outros servidores).
5. Toque em **Deploy**. O Cloudflare lê o `wrangler.jsonc` e configura sozinho:
   - o Durable Object `Sala`;
   - a ligação com o banco `queres-games` (nome `DB`);
   - a rota `queres.games/online/infiltrados/*`.
6. **Confira o deploy**: deve terminar em verde ("Success").
7. **Teste no navegador:** `https://queres.games/online/infiltrados/saude` deve mostrar `{"ok":true,"banco":true}`.

### Se algo não bater

| O que aparece | O que significa | O que fazer |
|---|---|---|
| A página 404 do site (e não um JSON) | A rota não está ativa | No Worker `infiltrados-online`: **Settings**, **Domains & Routes**, **Add**, **Route**, colocar `queres.games/online/infiltrados/*` e a zona `queres.games` |
| `{"ok":true,"banco":false}` | O Worker não enxerga o banco | No Worker: **Settings**, **Bindings**, **Add**, **D1 database**, nome `DB`, banco `queres-games` |
| Erro no deploy falando do nome | O nome do projeto é diferente do `name` do `wrangler.jsonc` | Renomeie o projeto para `infiltrados-online` |
| Erro dizendo que não achou o `wrangler.jsonc` | O diretório raiz ficou `/` | Em **Settings**, **Build**, troque o diretório raiz (Path) para `worker-infiltrados` |

## Testar localmente (sem Cloudflare)

```
cd worker-infiltrados
npx wrangler@4 dev --local --persist-to .wrangler/state --port 8787
```

**Banco local:** precisa das tabelas `contas` e `sessoes` com contas de teste. O site local, rodando com o mesmo `--persist-to`, cria as tabelas.

**Jogo apontando para o servidor local:** o jogo aceita `?online=ws://localhost:8787/online/infiltrados` na URL para falar com esse servidor (só endereços `localhost`).

## Limites conhecidos

- O celular do **anfitrião** roda os robôs e as regras. Se ele sair, outro jogador assume em poucos segundos. Os robôs podem dar uma "travadinha" na troca.
- O servidor **confia** no que os celulares mandam (posição, votos, estado da partida). Não há anti-trapaça: é para jogar entre amigos. Não há ranking nem prêmio guardado no servidor (os créditos da loja ficam só no aparelho de cada um).
- O código de 4 letras tem cerca de 1 milhão de combinações.
