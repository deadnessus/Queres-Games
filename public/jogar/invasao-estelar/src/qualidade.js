// Qualidade automática: se o celular não aguentar uns 50 quadros por segundo, o jogo tira enfeites aos poucos.
// O nível alcançado fica guardado no aparelho; ao abrir o jogo de novo, ele tenta um nível melhor.
// Sem tela nem canvas: testado com `node --test`.

// Do mais bonito (0) ao mais leve (3).
//   densidade: quantos pixels de tela por pixel do desenho, no máximo (menos pixels = muito mais leve)
//   particulas: quanto das faíscas e do rastro do motor aparece
//   brilhoPainel: brilho nos números do painel
//   halos: brilho em volta dos tiros
//   cenario: 'completo' (com naves e combates ao fundo), 'simples' (céu, névoa e estrelas) ou 'minimo' (céu e estrelas)
export const NIVEIS = [
  { densidade: 2, particulas: 1, brilhoPainel: true, halos: true, cenario: 'completo' },
  { densidade: 1.5, particulas: 0.6, brilhoPainel: false, halos: true, cenario: 'completo' },
  { densidade: 1.25, particulas: 0.4, brilhoPainel: false, halos: false, cenario: 'simples' },
  { densidade: 1, particulas: 0.25, brilhoPainel: false, halos: false, cenario: 'minimo' },
];

export const QPS_MINIMO = 50; // quadros por segundo
const JANELA = 2; // segundos em cada medição
const JANELAS_RUINS = 2; // medições ruins seguidas para baixar um nível
const AQUECIMENTO = 2; // segundos ignorados no começo e depois de cada troca
// Celular que trava os quadros num ritmo fixo (por exemplo, 30 por segundo na economia de bateria) mostra
// todos os quadros com o mesmo tempo. Isso não é sobrecarga: tirar enfeites não adiantaria.
const VARIACAO_DE_TRAVA = 0.004; // segundos

export function novoMedidor(nivel = 0) {
  return {
    nivel: Math.max(0, Math.min(NIVEIS.length - 1, nivel)),
    tempo: 0,
    quadros: 0,
    menor: Infinity,
    maior: 0,
    ruins: 0,
    aquecimento: AQUECIMENTO,
  };
}

// Conta um quadro que levou `dt` segundos. Devolve true quando o nível baixou.
export function contarQuadro(m, dt) {
  if (!(dt > 0) || dt > 0.25) return false; // pausa, aba escondida ou travada longa: não conta
  if (m.aquecimento > 0) {
    m.aquecimento -= dt;
    return false;
  }
  m.tempo += dt;
  m.quadros++;
  m.menor = Math.min(m.menor, dt);
  m.maior = Math.max(m.maior, dt);
  if (m.tempo < JANELA) return false;
  const qps = m.quadros / m.tempo;
  const travado = m.maior - m.menor < VARIACAO_DE_TRAVA;
  m.tempo = 0;
  m.quadros = 0;
  m.menor = Infinity;
  m.maior = 0;
  m.ruins = qps < QPS_MINIMO && !travado ? m.ruins + 1 : 0;
  if (m.ruins >= JANELAS_RUINS && m.nivel < NIVEIS.length - 1) {
    m.nivel++;
    m.ruins = 0;
    m.aquecimento = AQUECIMENTO;
    return true;
  }
  return false;
}

// Nível para começar, a partir do que ficou guardado no aparelho: um nível melhor que o guardado,
// para o jogo voltar a ficar bonito se o celular só estava ocupado naquele dia.
export function nivelInicial(guardado) {
  const n = Number(guardado);
  if (!Number.isInteger(n) || n <= 0) return 0;
  return Math.min(NIVEIS.length - 1, n) - 1;
}
