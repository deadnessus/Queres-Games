// Colisões feitas à mão (sem biblioteca): o chão vem da grade do relevo; os obstáculos são cilindros
// (troncos, pedras) e caixas giradas (a nave, os blocos), guardados numa grade espacial para achar rápido os de perto.
// O mundo dá a volta (toro): a grade também dá a volta e as distâncias usam o caminho mais curto.
import { embrulhar } from '../logica/toro.js';

const CELULA = 8;

export function criarColisoes(tamanho) {
  const n = Math.max(1, Math.round(tamanho / CELULA)); // células por lado (dá a volta)
  const meio = tamanho / 2;
  const grade = new Map();
  const todos = [];

  const idx = (v) => ((Math.floor((v + meio) / CELULA) % n) + n) % n;
  const chave = (i, j) => i * 10007 + j;
  const d = (a, b) => embrulhar(a - b, tamanho); // a - b pelo caminho mais curto

  function adicionar(c) {
    c.ativo = true;
    if (c.registrado) return; // já está na grade (foi só desligado antes)
    c.registrado = true;
    if (c.tipo === 'caixa') {
      c.cos = Math.cos(c.giro); c.sin = Math.sin(c.giro);
      c.alcance = Math.hypot(c.meioX, c.meioZ);
    } else c.alcance = c.r;
    todos.push(c);
    const a = c.alcance;
    const celulas = new Set();
    for (let x = c.x - a; x <= c.x + a + CELULA; x += CELULA) {
      for (let z = c.z - a; z <= c.z + a + CELULA; z += CELULA) {
        const k = chave(idx(Math.min(x, c.x + a)), idx(Math.min(z, c.z + a)));
        if (celulas.has(k)) continue;
        celulas.add(k);
        if (!grade.has(k)) grade.set(k, []);
        grade.get(k).push(c);
      }
    }
  }

  // Desliga um obstáculo (árvore cortada, bloco quebrado). Para ligar de novo, chame adicionar(c).
  function remover(c) { if (c) c.ativo = false; }

  function perto(x, z, raio) {
    const vistos = new Set();
    const passos = Math.ceil(raio / CELULA);
    const i0 = idx(x), j0 = idx(z);
    for (let di = -passos; di <= passos; di++) {
      for (let dj = -passos; dj <= passos; dj++) {
        const l = grade.get(chave((i0 + di + n) % n, (j0 + dj + n) % n));
        if (l) for (const c of l) if (c.ativo) vistos.add(c);
      }
    }
    return vistos;
  }

  // Posição do ponto no "espaço da caixa" (já levando em conta o mundo que dá a volta).
  function local(c, x, z) {
    const dx = d(x, c.x), dz = d(z, c.z);
    return [dx * c.cos - dz * c.sin, dx * c.sin + dz * c.cos];
  }

  // Empurra um círculo (raio r, de "pes" até "cabeca" de altura) para fora dos obstáculos. Mexe em pos.x/pos.z.
  function empurrar(pos, r, pes, cabeca) {
    let bateu = false;
    for (const c of perto(pos.x, pos.z, r + 4)) {
      if (cabeca < c.base || pes > c.topo) continue;
      if (c.tipo === 'cilindro') {
        const dx = d(pos.x, c.x), dz = d(pos.z, c.z);
        const dist = Math.hypot(dx, dz), min = c.r + r;
        if (dist < min) {
          if (dist > 1e-5) { const k = (min - dist) / dist; pos.x += dx * k; pos.z += dz * k; } else pos.x += min;
          bateu = true;
        }
      } else {
        const [lx, lz] = local(c, pos.x, pos.z);
        const px = Math.max(-c.meioX, Math.min(c.meioX, lx)), pz = Math.max(-c.meioZ, Math.min(c.meioZ, lz));
        const ox = lx - px, oz = lz - pz;
        const dist = Math.hypot(ox, oz);
        let nx, nz;
        if (dist > 1e-5) {
          if (dist >= r) continue;
          nx = (ox / dist) * (r - dist); nz = (oz / dist) * (r - dist);
        } else {
          // dentro da caixa: sai pelo lado mais perto
          const sx = c.meioX - Math.abs(lx), sz = c.meioZ - Math.abs(lz);
          if (sx < sz) { nx = Math.sign(lx || 1) * (sx + r); nz = 0; } else { nx = 0; nz = Math.sign(lz || 1) * (sz + r); }
        }
        pos.x += nx * c.cos + nz * c.sin;
        pos.z += -nx * c.sin + nz * c.cos;
        bateu = true;
      }
    }
    return bateu;
  }

  // O ponto (x, y, z) está dentro de algum obstáculo? (para os tiros)
  function pontoDentro(x, y, z) {
    for (const c of perto(x, z, 1)) {
      if (y < c.base || y > c.topo) continue;
      if (c.tipo === 'cilindro') {
        if (Math.hypot(d(x, c.x), d(z, c.z)) < c.r) return true;
      } else {
        const [lx, lz] = local(c, x, z);
        if (Math.abs(lx) < c.meioX && Math.abs(lz) < c.meioZ) return true;
      }
    }
    return false;
  }

  // Topo mais alto de algo "pisável" (blocos) embaixo do ponto, que não esteja acima de yMax. -Infinity se nada.
  function topoSob(x, z, yMax, margem = 0.22) {
    let melhor = -Infinity;
    for (const c of perto(x, z, 1)) {
      if (!c.pisavel || c.topo > yMax || c.topo <= melhor) continue;
      const [lx, lz] = local(c, x, z);
      if (Math.abs(lx) <= c.meioX + margem && Math.abs(lz) <= c.meioZ + margem) melhor = c.topo;
    }
    return melhor;
  }

  return { adicionar, remover, empurrar, pontoDentro, perto, topoSob, local, get total() { return todos.length; } };
}
