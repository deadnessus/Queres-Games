// Colisões feitas à mão (sem biblioteca): o chão vem da grade do relevo; os obstáculos são cilindros
// (troncos, pedras) e caixas giradas (a nave), guardados numa grade espacial para achar rápido os de perto.
const CELULA = 8;

export function criarColisoes(tamanho) {
  const n = Math.ceil(tamanho / CELULA) + 1;
  const meio = tamanho / 2;
  const grade = new Map();
  const todos = [];

  const chave = (i, j) => i * 10007 + j;
  const idx = (v) => Math.max(0, Math.min(n - 1, Math.floor((v + meio) / CELULA)));

  function adicionar(c) {
    if (c.tipo === 'caixa') {
      c.cos = Math.cos(c.giro); c.sin = Math.sin(c.giro);
      c.alcance = Math.hypot(c.meioX, c.meioZ);
    } else c.alcance = c.r;
    todos.push(c);
    const a = c.alcance;
    for (let i = idx(c.x - a); i <= idx(c.x + a); i++) {
      for (let j = idx(c.z - a); j <= idx(c.z + a); j++) {
        const k = chave(i, j);
        if (!grade.has(k)) grade.set(k, []);
        grade.get(k).push(c);
      }
    }
  }

  function perto(x, z, raio) {
    const vistos = new Set();
    for (let i = idx(x - raio); i <= idx(x + raio); i++) {
      for (let j = idx(z - raio); j <= idx(z + raio); j++) {
        const l = grade.get(chave(i, j));
        if (l) for (const c of l) vistos.add(c);
      }
    }
    return vistos;
  }

  // Empurra um círculo (raio r, de "pes" até "cabeca" de altura) para fora dos obstáculos. Mexe em pos.x/pos.z.
  function empurrar(pos, r, pes, cabeca) {
    let bateu = false;
    for (const c of perto(pos.x, pos.z, r + 4)) {
      if (cabeca < c.base || pes > c.topo) continue;
      if (c.tipo === 'cilindro') {
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const d = Math.hypot(dx, dz), min = c.r + r;
        if (d < min) {
          const k = d > 1e-5 ? (min - d) / d : 0;
          pos.x += d > 1e-5 ? dx * k : min;
          pos.z += dz * k;
          bateu = true;
        }
      } else {
        // caixa girada: leva o ponto para o "espaço da caixa"
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const lx = dx * c.cos - dz * c.sin, lz = dx * c.sin + dz * c.cos;
        const px = Math.max(-c.meioX, Math.min(c.meioX, lx)), pz = Math.max(-c.meioZ, Math.min(c.meioZ, lz));
        let ox = lx - px, oz = lz - pz;
        let d = Math.hypot(ox, oz);
        let nx, nz;
        if (d > 1e-5) {
          if (d >= r) continue;
          nx = ox / d * (r - d); nz = oz / d * (r - d);
        } else {
          // dentro da caixa: sai pelo lado mais perto
          const sx = c.meioX - Math.abs(lx), sz = c.meioZ - Math.abs(lz);
          if (sx < sz) { nx = Math.sign(lx || 1) * (sx + r); nz = 0; } else { nx = 0; nz = Math.sign(lz || 1) * (sz + r); }
        }
        // volta para o mundo
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
        if (Math.hypot(x - c.x, z - c.z) < c.r) return true;
      } else {
        const dx = x - c.x, dz = z - c.z;
        const lx = dx * c.cos - dz * c.sin, lz = dx * c.sin + dz * c.cos;
        if (Math.abs(lx) < c.meioX && Math.abs(lz) < c.meioZ) return true;
      }
    }
    return false;
  }

  return { adicionar, empurrar, pontoDentro, perto, get total() { return todos.length; } };
}
