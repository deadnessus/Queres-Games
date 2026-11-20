// Relevo de uma região: transforma os dados da região (src/dados/regioes/*.js) em alturas do chão.
// Sem Three.js e sem DOM: dá para testar no Node.
//
// criarRelevo(def) devolve funções que calculam a altura "ideal" em qualquer ponto.
// gerarGrade(relevo, def) amostra essas alturas numa grade e devolve consultas rápidas (alturaEm, normalEm)
// que batem EXATAMENTE com a malha desenhada (mesmos triângulos), para o jogador nunca afundar nem flutuar.
import { fbm, ruido2 } from './ruido.js';
import { embrulhar } from './toro.js';

const limitar = (v, a, b) => (v < a ? a : v > b ? b : v);
const misturar = (a, b, t) => a + (b - a) * t;
export function degrau(a, b, v) {
  const t = limitar((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

// Distância de (x, z) até o segmento (ax, az)-(bx, bz) e a posição ao longo dele (0 a 1).
function distSegmento(x, z, ax, az, bx, bz) {
  const vx = bx - ax, vz = bz - az;
  const comp = vx * vx + vz * vz || 1;
  const t = limitar(((x - ax) * vx + (z - az) * vz) / comp, 0, 1);
  const px = ax + vx * t - x, pz = az + vz * t - z;
  return { d: Math.sqrt(px * px + pz * pz), t };
}

function distLinha(x, z, pontos) {
  let melhor = Infinity;
  for (let i = 0; i < pontos.length - 1; i++) {
    const [ax, az] = pontos[i], [bx, bz] = pontos[i + 1];
    const { d } = distSegmento(x, z, ax, az, bx, bz);
    if (d < melhor) melhor = d;
  }
  return melhor;
}

export function criarRelevo(def) {
  const { semente, tamanho, nivelAgua = 0 } = def;
  const t = def.terreno;
  const base = t.base;
  const meio = tamanho / 2;
  const trilhas = t.ops.filter((o) => o.tipo === 'trilha');
  const sulcos = t.ops.filter((o) => o.tipo === 'sulco');
  const outras = t.ops.filter((o) => o.tipo !== 'trilha');

  // 0 a 1: quanto o ponto está em cima de uma trilha (para alisar o chão e pintar de terra).
  function pesoTrilha(x, z) {
    let p = 0;
    for (const o of trilhas) {
      const d = distLinha(x, z, o.pontos);
      p = Math.max(p, 1 - degrau(o.largura / 2, o.largura / 2 + o.borda, d));
    }
    return p;
  }

  // 0 a 1: chão queimado pelo rastro da queda da nave.
  function pesoQueimado(x, z) {
    let p = 0;
    for (const o of sulcos) {
      const { d, t: ao } = distSegmento(x, z, o.de[0], o.de[1], o.ate[0], o.ate[1]);
      const largura = o.largura * (0.6 + 0.4 * ao);
      p = Math.max(p, (1 - degrau(largura * 0.3, largura * 1.1, d)) * (0.5 + 0.5 * ao));
    }
    return p;
  }

  // Períodos do ruído: o relevo se repete a cada "tamanho" metros (o mundo dá a volta sem emenda).
  const perGrande = Math.round(tamanho / base.escala), perDetalhe = Math.round(tamanho / base.escalaDetalhe);
  const escGrande = tamanho / perGrande, escDetalhe = tamanho / perDetalhe;

  function altura(x, z) {
    const grande = base.altura + fbm(x / escGrande, z / escGrande, semente, 4, 0.5, 2, perGrande) * base.amplitude;
    const detalhe = fbm(x / escDetalhe, z / escDetalhe, semente + 7, 2, 0.5, 2, perDetalhe) * base.detalhe;
    let h = grande + detalhe * (1 - 0.85 * pesoTrilha(x, z));

    for (const o of outras) {
      if (o.tipo === 'achatar') {
        const d = Math.hypot(x - o.x, z - o.z);
        h = misturar(h, o.altura, 1 - degrau(o.raio, o.raio + o.borda, d));
      } else if (o.tipo === 'colina') {
        const d = Math.hypot(x - o.x, z - o.z);
        if (d < o.raio) h += o.altura * 0.5 * (1 + Math.cos(Math.PI * d / o.raio));
      } else if (o.tipo === 'lago') {
        const d = Math.hypot(x - o.x, z - o.z);
        const raio = o.raio * (1 + 0.16 * ruido2(x / 22, z / 22, semente + 33));
        if (d < raio + o.borda) {
          const fundo = nivelAgua - o.prof * (1 - (d / raio) * (d / raio));
          h = misturar(h, Math.min(h, fundo), 1 - degrau(raio * 0.75, raio + o.borda, d));
        }
      } else if (o.tipo === 'cratera') {
        // fundo chato no meio, paredes e uma borda levantada em volta (como a cratera de um meteoro)
        const d = Math.hypot(x - o.x, z - o.z);
        if (d < o.raio + o.borda * 3) {
          h -= o.prof * (1 - degrau(o.raio * 0.5, o.raio, d));
          h += o.aba * Math.exp(-(((d - o.raio) / o.borda) ** 2));
        }
      } else if (o.tipo === 'sulco') {
        const { d, t: ao } = distSegmento(x, z, o.de[0], o.de[1], o.ate[0], o.ate[1]);
        h -= o.prof * (1 - degrau(0, o.largura / 2, d)) * (0.3 + 0.7 * ao);
      }
    }

    // Paredões nas bordas (só se a região tiver; o Vale dá a volta e não tem).
    const dBorda = meio - Math.max(Math.abs(x), Math.abs(z));
    if (t.bordaParedao && dBorda < t.bordaParedao) {
      const k = 1 - Math.max(0, dBorda) / t.bordaParedao;
      h += k * k * t.alturaParedao * (0.75 + 0.5 * (ruido2(x / 18, z / 18, semente + 55) * 0.5 + 0.5));
    }
    return h;
  }

  return { altura, pesoTrilha, pesoQueimado, nivelAgua, tamanho, semente };
}

// Amostra o relevo numa grade quadrada (n x n pontos, de "passo" em "passo" metros, centrada em 0).
export function gerarGrade(relevo, passo) {
  const tamanho = relevo.tamanho;
  const n = Math.round(tamanho / passo) + 1;
  const origem = -tamanho / 2;
  const alturas = new Float32Array(n * n);
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) alturas[j * n + i] = relevo.altura(origem + i * passo, origem + j * passo);
  }
  // Índices que dão a volta: o ponto n-1 é igual ao ponto 0 (relevo periódico).
  const per = n - 1;
  const h = (i, j) => alturas[(((j % per) + per) % per) * n + (((i % per) + per) % per)];

  // Localiza a célula e a posição dentro dela. Cada célula tem 2 triângulos: (a, b, c) e (b, c, d),
  // com a=(i,j), b=(i+1,j), c=(i,j+1), d=(i+1,j+1). É a mesma divisão da malha do terreno.
  function celula(x, z) {
    x = embrulhar(x, tamanho); z = embrulhar(z, tamanho);
    const gx = limitar((x - origem) / passo, 0, n - 1);
    const gz = limitar((z - origem) / passo, 0, n - 1);
    const i = Math.min(Math.floor(gx), n - 2), j = Math.min(Math.floor(gz), n - 2);
    return { i, j, fx: gx - i, fz: gz - j };
  }

  function alturaEm(x, z) {
    const { i, j, fx, fz } = celula(x, z);
    const ha = h(i, j), hb = h(i + 1, j), hc = h(i, j + 1), hd = h(i + 1, j + 1);
    if (fx + fz <= 1) return ha + (hb - ha) * fx + (hc - ha) * fz;
    return hd + (hc - hd) * (1 - fx) + (hb - hd) * (1 - fz);
  }

  // Normal do triângulo onde o ponto está (para saber se a rampa é íngreme). Devolve [nx, ny, nz].
  function normalEm(x, z) {
    const { i, j, fx, fz } = celula(x, z);
    const ha = h(i, j), hb = h(i + 1, j), hc = h(i, j + 1), hd = h(i + 1, j + 1);
    let gx, gz;
    if (fx + fz <= 1) { gx = (hb - ha) / passo; gz = (hc - ha) / passo; }
    else { gx = (hd - hc) / passo; gz = (hd - hb) / passo; }
    const comp = Math.sqrt(gx * gx + 1 + gz * gz);
    return [-gx / comp, 1 / comp, -gz / comp];
  }

  // Normal suave num ponto da grade (para a luz da malha).
  function normalSuave(i, j) {
    const gx = (h(i + 1, j) - h(i - 1, j)) / (2 * passo);
    const gz = (h(i, j + 1) - h(i, j - 1)) / (2 * passo);
    const comp = Math.sqrt(gx * gx + 1 + gz * gz);
    return [-gx / comp, 1 / comp, -gz / comp];
  }

  return { n, passo, origem, tamanho, alturas, alturaEm, normalEm, normalSuave, nivelAgua: relevo.nivelAgua };
}
