# queres.games: medição de uso, boas práticas e melhorias

Este repositório é de um jogo dos irmãos Jojô e Bento, publicado em https://queres.games/jogar/{{SLUG}}/ por outro repositório (`deadnessus/queres-games`). {{NOTA}}

## Skills deste repositório (em `.claude/skills/`)
Use-as: elas têm o passo a passo e um verificador automático.
- **`preparar-jogo-para-queres-games`**: antes de pedir para publicar, ao começar um jogo ou ao conferir. Rode o verificador e siga o checklist.
- **`telemetria-queres-games`**: botões com nomes claros e `QG.evento`.
- **`privacidade-infantil`**: o que nunca coletar (LGPD, crianças), conta de apelido, online sem chat.
- **`melhorias-por-issues`**: como transformar os números do painel em issues.

## Regras que nunca mudam
- É um site para **crianças**: sem dado pessoal, sem chat, sem texto livre enviado a servidor, sem rastreadores.
- **Tudo dentro do jogo**: nada de CDN, Google Fonts ou outro site. Caminhos relativos.
- **A telemetria é automática pelo site.** Não crie analytics próprio nem importe script de medição.
- Login e ranking só pela conta do site (`/conta.js`); nada de telas de login próprias.
- Português do Brasil, linguagem simples (o dono não é programador).

## Medição (resumo)
O site mede, de forma anônima, sessões, tempo de uso, erros de JavaScript, celular ou computador, tamanho de tela, retorno em outro dia, **quantas vezes cada botão é usado** (pelo `id` ou `data-...`, nunca pelo texto) e a versão (commit) do jogo. Por isso dê **`id` ou `data-...` claros e estáveis** aos botões, sem dado pessoal.

Avisar um acontecimento do jogo (opcional): `window.QG?.evento?.('fase_concluida', { fase: 3 });`. O nome precisa estar em `qg-eventos.json` na **raiz** deste repositório (`{ "eventos": ["fase_concluida"] }`; até 12 nomes, minúsculas/números/`_`). Dados: até 2 pares, número inteiro ou palavra curta, **nunca** nome de pessoa, texto digitado, pontuação exata ou código de sala. Só aplique eventos a pedido do dono.

## Sugestões de melhoria ficam nas issues deste repositório
Quando alguém (uma pessoa ou uma rotina automática) achar um problema ou uma ideia a partir dos números do site, a sugestão vira uma **issue** aqui, em português simples, com: o que foi observado, em qual versão (commit), e uma ideia do que mudar. Não faça a mudança sem que alguém aprove a issue.
