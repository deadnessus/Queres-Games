---
titulo: "Bug: acentos quebrados no Brasileirão FIFA"
resumo: Ao colocar o jogo no site, "Brasileirão" apareceu como "BrasileirÃ£o". Já foi corrigido.
data: 2026-11-01T16:30:00-03:00
jogo: brasileirao-fifa
---
Quando colocamos o Brasileirão FIFA no site, os acentos apareceram quebrados: "BrasileirÃ£o", "classificaÃ§Ã£o", "vocÃª".

## Por que aconteceu

A página do jogo não dizia ao navegador qual alfabeto usar (a codificação UTF-8). Sem essa informação, o navegador chuta, e erra nos acentos.

## O que fizemos

Acrescentamos essa informação na cópia do jogo que está no site. Agora está tudo certo.

## O que vem a seguir

Falta fazer o mesmo no repositório original do jogo, para o erro não voltar na próxima cópia.

## Dá para fazer agora?

Nada de especial: se você abriu o jogo antes e viu os acentos errados, recarregue a página.
