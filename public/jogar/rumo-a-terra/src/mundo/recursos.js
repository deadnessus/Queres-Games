// Coisas do mundo que dá para quebrar: árvores (madeira), arbustos (fibra), pedras e cristais.
// Elas fazem parte das malhas juntadas da vegetação; aqui mexemos só nos vértices de cada uma
// (tremer a cada golpe, encolher e sumir ao quebrar, crescer de novo depois de um tempo).
import { COLETA } from '../dados/itens.js';

const ALCANCE = 3.4; // metros a partir do olho

export function criarRecursos({ lista, colisoes, lascas, som }) {
  for (const r of lista) {
    const attr = r.mesh.geometry.attributes.position;
    r.attr = attr;
    r.orig = attr.array.slice(r.inicio * 3, (r.inicio + r.contagem) * 3);
    r.regra = COLETA[r.tipo];
    r.vida = r.regra.vida;
    r.estado = 'inteiro'; // inteiro | sumindo | sumiu | crescendo
    r.tremor = 0;
    r.t = 0;
    r.mexido = false;
  }

  // Escreve os vértices do recurso: escala "s" a partir da base e um deslocamento de tremor.
  function escrever(r, s, dx, dz) {
    const a = r.attr.array, o = r.orig, base = r.inicio * 3;
    for (let i = 0; i < o.length; i += 3) {
      const alturaRel = Math.max(0, (o[i + 1] - r.y) / (r.altura || 1));
      a[base + i] = r.x + (o[i] - r.x) * s + dx * alturaRel;
      a[base + i + 1] = r.y + (o[i + 1] - r.y) * s;
      a[base + i + 2] = r.z + (o[i + 2] - r.z) * s + dz * alturaRel;
    }
    r.attr.addUpdateRange(base, o.length);
    r.attr.needsUpdate = true;
    r.mexido = s !== 1 || dx !== 0 || dz !== 0;
  }

  // O que o jogador está mirando (até ALCANCE metros). Testa pontos ao longo da mira.
  function mirar(origem, dir) {
    const perto = [];
    for (const r of lista) {
      if (r.estado !== 'inteiro') continue;
      if (Math.abs(r.x - origem.x) < ALCANCE + 3 && Math.abs(r.z - origem.z) < ALCANCE + 3) perto.push(r);
    }
    if (!perto.length) return null;
    for (let d = 0.2; d <= ALCANCE; d += 0.08) {
      const x = origem.x + dir.x * d, y = origem.y + dir.y * d, z = origem.z + dir.z * d;
      for (const r of perto) {
        if (y < r.y - 0.3 || y > r.y + r.altura) continue;
        if ((x - r.x) ** 2 + (z - r.z) ** 2 <= r.raio * r.raio) return { recurso: r, distancia: d, ponto: { x, y, z } };
      }
    }
    return null;
  }

  // Um golpe. "ferramentas" = função (id) => tem? Devolve { quebrou, falta, itens: [[id, n]] }.
  function bater(r, temFerramenta, ponto) {
    const regra = r.regra;
    if (regra.exige && !temFerramenta(regra.exige)) return { falta: regra.exige };
    const forca = regra.ferramenta && temFerramenta(regra.ferramenta) ? regra.forca : regra.exige ? regra.forca : 1;
    r.vida -= forca;
    r.tremor = 1;
    if (som) som.golpe(regra.som);
    for (let k = 0; k < 6; k++) {
      lascas.soltar({
        x: ponto.x, y: ponto.y, z: ponto.z,
        vx: (Math.random() - 0.5) * 3, vy: 1 + Math.random() * 2.5, vz: (Math.random() - 0.5) * 3,
        vida: 0.6 + Math.random() * 0.4, tamanho: 0.16, cresce: -0.1, cor: regra.lasca, alfa: 1, gravidade: 10,
      });
    }
    if (r.vida > 0) return { quebrou: false };
    // quebrou!
    r.estado = 'sumindo';
    r.t = 0;
    if (r.colisor) colisoes.remover(r.colisor);
    if (som) som.quebrar(regra.som);
    for (let k = 0; k < 16; k++) {
      lascas.soltar({
        x: r.x + (Math.random() - 0.5) * r.raio, y: r.y + Math.random() * Math.min(r.altura, 2.5), z: r.z + (Math.random() - 0.5) * r.raio,
        vx: (Math.random() - 0.5) * 4, vy: 1.5 + Math.random() * 3, vz: (Math.random() - 0.5) * 4,
        vida: 0.8 + Math.random() * 0.5, tamanho: 0.22, cresce: -0.15, cor: regra.lasca, alfa: 1, gravidade: 10,
      });
    }
    const itens = regra.da.map(([id, min, max]) => [id, min + Math.floor(Math.random() * (max - min + 1))]);
    return { quebrou: true, itens };
  }

  // Anima tremores, o sumiço e o crescer de novo (só quando o jogador está longe, para ninguém ficar preso).
  function atualizar(dt, posJogador) {
    for (const r of lista) {
      if (r.estado === 'inteiro') {
        if (r.tremor > 0) {
          r.tremor = Math.max(0, r.tremor - dt * 5);
          const amp = 0.09 * r.tremor;
          const fase = performance.now() / 22;
          escrever(r, 1, Math.sin(fase) * amp, Math.cos(fase * 1.3) * amp);
        } else if (r.mexido) escrever(r, 1, 0, 0);
      } else if (r.estado === 'sumindo') {
        r.t += dt;
        const s = Math.max(0, 1 - r.t / 0.3);
        escrever(r, s, 0, 0);
        if (s === 0) { r.estado = 'sumiu'; r.t = 0; }
      } else if (r.estado === 'sumiu') {
        r.t += dt;
        const longe = Math.hypot(posJogador.x - r.x, posJogador.z - r.z) > 14;
        if (r.regra.volta && r.t > r.regra.volta && longe) { r.estado = 'crescendo'; r.t = 0; }
      } else if (r.estado === 'crescendo') {
        r.t += dt;
        const s = Math.min(1, r.t / 1.5);
        escrever(r, s * s * (3 - 2 * s), 0, 0);
        if (s === 1) {
          r.estado = 'inteiro';
          r.vida = r.regra.vida;
          if (r.colisor) colisoes.adicionar(r.colisor);
        }
      }
    }
  }

  return { lista, mirar, bater, atualizar, ALCANCE };
}
