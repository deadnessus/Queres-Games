# Modelo para os repositórios de jogos

Esta pasta é a **versão oficial** das skills, do verificador e do jogo-modelo que ficam nos repositórios dos jogos (Jojo-1…5, Bento-1…5 e os demais). Fica aqui, e não só nos jogos, para não virar 16 cópias diferentes. **Não é publicada no site** (só `public/` e `src/` vão ao ar).

## O que tem
| O quê | Para quê |
|---|---|
| `skills/preparar-jogo-para-queres-games/` | checklist antes de publicar + `verificar-jogo.mjs` (verificador automático) |
| `skills/telemetria-queres-games/` | nomes de botões e `QG.evento` / `qg-eventos.json` |
| `skills/privacidade-infantil/` | LGPD, conta de apelido, sem chat, tudo dentro do jogo |
| `skills/melhorias-por-issues/` | como ler os números do painel e escrever issues |
| `CLAUDE.md` | texto padrão do `CLAUDE.md` dos jogos (`{{SLUG}}` e `{{NOTA}}` são preenchidos) |
| `jogo-modelo/` | jogo mínimo e funcional (toque nos círculos) para repositórios novos |
| `VERSAO` | número do modelo; vai para `.claude/skills/VERSAO-MODELO` em cada repositório |
| `distribuir.mjs` | copia tudo para a pasta de um repositório de jogo |

## Como distribuir ou atualizar
1. Mude os arquivos aqui e **aumente o `VERSAO`** (`AAAA-MM-DD.n`).
2. Para cada repositório de jogo (clone em outra pasta, numa branch nova):
   `node modelo-jogos/distribuir.mjs <pasta-do-repo> <nome-do-jogo-no-site|-> [--novo] [--nota "texto"]`
   - `--novo`: repositório vazio, também copia o `jogo-modelo`.
   - Não sobrescreve um `CLAUDE.md` que já existe: só acrescenta a seção de skills.
3. Commit, push e PR no repositório do jogo. Quem tem `.claude/skills/VERSAO-MODELO` menor que o daqui está desatualizado.

## Verificador
`node modelo-jogos/skills/preparar-jogo-para-queres-games/verificar-jogo.mjs <pasta>` funciona também nas cópias do site (`public/jogar/<slug>`): ali ele lê a lista de eventos do `versao.json`. Mexeu nas regras de nome de botão em `public/telemetria.js`? O verificador não depende delas (só aponta botão sem `id`/`data-`).
