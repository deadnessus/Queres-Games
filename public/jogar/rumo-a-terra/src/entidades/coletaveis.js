// Os itens que saem de uma árvore ou pedra quebrada: pulam do chão e voam até o jogador (como um ímã).
// Quando chegam, vão para a mochila.
import * as THREE from 'three';

const CORES = { madeira: 0x8a5a3c, fibra: 0xf2a03c, pedra: 0x8f89a3, cristal: 0x6ff3ff };

export function criarColetaveis({ cena, aoPegar }) {
  const geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const mats = {};
  const pool = [];
  for (let k = 0; k < 40; k++) {
    const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: 0xffffff }));
    mesh.visible = false;
    cena.add(mesh);
    pool.push({ mesh, ativo: false, pos: mesh.position, vel: new THREE.Vector3(), t: 0, id: null, n: 0 });
  }
  const material = (id) => {
    if (!mats[id]) mats[id] = id === 'cristal' ? new THREE.MeshBasicMaterial({ color: CORES[id] }) : new THREE.MeshLambertMaterial({ color: CORES[id] || 0xffffff });
    return mats[id];
  };

  // Solta itens a partir de um ponto. itens = [[id, n]]. Cada item vira até 4 cubinhos; o primeiro carrega a quantidade.
  function soltar(itens, ponto) {
    for (const [id, n] of itens) {
      const cubos = Math.min(n, 4);
      for (let k = 0; k < cubos; k++) {
        const c = pool.find((p) => !p.ativo);
        if (!c) { aoPegar(id, k === 0 ? n : 0); continue; }
        c.ativo = true;
        c.id = id;
        c.n = k === 0 ? n : 0;
        c.t = 0;
        c.mesh.material = material(id);
        c.mesh.visible = true;
        c.pos.set(ponto.x + (Math.random() - 0.5) * 0.4, ponto.y + 0.3, ponto.z + (Math.random() - 0.5) * 0.4);
        c.vel.set((Math.random() - 0.5) * 3, 2.5 + Math.random() * 1.5, (Math.random() - 0.5) * 3);
      }
    }
  }

  const tmp = new THREE.Vector3();
  function atualizar(dt, alvo) {
    for (const c of pool) {
      if (!c.ativo) continue;
      c.t += dt;
      if (c.t < 0.35) {
        c.vel.y -= 9 * dt; // pulinho
      } else {
        tmp.copy(alvo).sub(c.pos);
        const d = tmp.length();
        if (d < 0.6 || c.t > 2.2) {
          c.ativo = false;
          c.mesh.visible = false;
          if (c.n > 0) aoPegar(c.id, c.n);
          continue;
        }
        c.vel.lerp(tmp.multiplyScalar(Math.min(16, 4 + c.t * 14) / d), Math.min(1, dt * 8));
      }
      c.pos.addScaledVector(c.vel, dt);
      c.mesh.rotation.x += dt * 5;
      c.mesh.rotation.y += dt * 4;
    }
  }

  return { soltar, atualizar };
}
