// Malha do terreno: a grade do relevo cortada em pedaços de 64 x 64 m (cada pedaço é uma malha só).
// A cor de cada ponto vem do tipo de chão (grama roxa, terra da trilha, areia, rocha, chão queimado)
// e de uma "sombra de canto" calculada aqui (luz pintada nos vértices, como no estilo do Quake 2).
import * as THREE from 'three';
import { COR } from '../desenho/paleta.js';
import { fbm, hash2 } from '../logica/ruido.js';
import { degrau } from '../logica/relevo.js';

const CELULAS = 32; // células por pedaço

export function criarTerreno(grade, relevo) {
  const { n, passo, origem, alturas, nivelAgua } = grade;
  const semente = relevo.semente;
  const h = (i, j) => alturas[Math.max(0, Math.min(n - 1, j)) * n + Math.max(0, Math.min(n - 1, i))];
  const c = (hex) => new THREE.Color(hex);
  const cores = {
    grama1: c(COR.grama1), grama2: c(COR.grama2), gramaEscura: c(COR.gramaEscura), terra: c(COR.terra), terraClara: c(COR.terraClara),
    areia: c(COR.areia), fundo: c(COR.fundoLago), rocha: c(COR.rocha), rochaClara: c(COR.rochaClara), paredao: c(COR.rochaParedao), queimado: c(COR.queimado),
    basalto: c(0x2e2a30), basaltoClaro: c(0x524648), brasa: c(0x7a2e18),
  };
  const tmp = new THREE.Color();

  function corDoPonto(i, j, alvo) {
    const x = origem + i * passo, z = origem + j * passo, y = h(i, j);
    const [, ny] = grade.normalSuave(i, j);
    const inclinacao = 1 - ny;
    // grama: duas cores misturadas por manchas grandes, mais um pouco de variação por ponto
    const mancha = fbm(x / 16, z / 16, semente + 21, 2) * 0.5 + 0.5;
    alvo.copy(cores.grama1).lerp(cores.grama2, mancha);
    alvo.lerp(cores.gramaEscura, Math.max(0, fbm(x / 6, z / 6, semente + 22, 1)) * 0.5);
    // margem do lago (areia) e fundo
    if (y < nivelAgua + 0.9) alvo.lerp(cores.areia, degrau(nivelAgua + 0.9, nivelAgua + 0.1, y));
    if (y < nivelAgua - 0.2) alvo.lerp(cores.fundo, degrau(nivelAgua - 0.2, nivelAgua - 2.5, y));
    // trilha de terra
    const pt = relevo.pesoTrilha(x, z);
    if (pt > 0) alvo.lerp(tmp.copy(cores.terra).lerp(cores.terraClara, hash2(i, j, semente) * 0.6), pt * 0.9);
    // rampas íngremes e paredões viram rocha
    alvo.lerp(tmp.copy(cores.rocha).lerp(cores.rochaClara, hash2(j, i, semente + 3)), degrau(0.22, 0.42, inclinacao));
    if (y > 16) alvo.lerp(cores.paredao, degrau(16, 26, y) * 0.8);
    // o Vulcão: rocha escura (basalto), avermelhada perto da cratera
    const pv = relevo.pesoVulcao(x, z);
    if (pv.p > 0) {
      alvo.lerp(tmp.copy(cores.basalto).lerp(cores.basaltoClaro, hash2(i, j, semente + 5) * 0.7), pv.p * 0.92);
      if (pv.quente > 0) alvo.lerp(cores.brasa, pv.quente * 0.7);
    }
    // rastro queimado da queda
    const pq = relevo.pesoQueimado(x, z);
    if (pq > 0) alvo.lerp(cores.queimado, pq * 0.85);
    // sombra de canto: buracos e vales um pouco mais escuros, topos um pouco mais claros
    const media = (h(i - 3, j) + h(i + 3, j) + h(i, j - 3) + h(i, j + 3)) / 4;
    const ao = Math.max(0.72, Math.min(1.08, 1 - (media - y) * 0.09));
    const varia = 0.94 + hash2(i + 7, j + 3, semente) * 0.1;
    alvo.multiplyScalar(ao * varia);
    return alvo;
  }

  const grupo = new THREE.Group();
  grupo.name = 'terreno';
  const pedacos = [];
  const qtd = (n - 1) / CELULAS;
  const cor = new THREE.Color();

  for (let pz = 0; pz < qtd; pz++) {
    for (let px = 0; px < qtd; px++) {
      const lado = CELULAS + 1;
      const posicoes = new Float32Array(lado * lado * 3);
      const normais = new Float32Array(lado * lado * 3);
      const coresArr = new Float32Array(lado * lado * 3);
      const uvs = new Float32Array(lado * lado * 2);
      let k = 0;
      for (let jj = 0; jj < lado; jj++) {
        for (let ii = 0; ii < lado; ii++) {
          const i = px * CELULAS + ii, j = pz * CELULAS + jj;
          const x = origem + i * passo, z = origem + j * passo;
          posicoes.set([x, h(i, j), z], k * 3);
          normais.set(grade.normalSuave(i, j), k * 3);
          corDoPonto(i, j, cor);
          coresArr.set([cor.r, cor.g, cor.b], k * 3);
          uvs.set([x / 5, z / 5], k * 2);
          k++;
        }
      }
      const indices = [];
      for (let jj = 0; jj < CELULAS; jj++) {
        for (let ii = 0; ii < CELULAS; ii++) {
          const a = jj * lado + ii, b = a + 1, cc = a + lado, d = cc + 1;
          indices.push(a, cc, b, b, cc, d); // mesma divisão de alturaEm()
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(posicoes, 3));
      geo.setAttribute('normal', new THREE.BufferAttribute(normais, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(coresArr, 3));
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      geo.computeBoundingSphere();
      const mesh = new THREE.Mesh(geo);
      mesh.matrixAutoUpdate = false;
      grupo.add(mesh);
      const centro = geo.boundingSphere.center;
      pedacos.push({ mesh, x: centro.x, z: centro.z, raio: geo.boundingSphere.radius });
    }
  }

  // Cor de um ponto da grade (para o mapa): número hexadecimal sRGB.
  const corMapa = new THREE.Color();
  function corDoMapa(i, j) { corDoPonto(i, j, corMapa); return corMapa.getHex(); }

  return { grupo, pedacos, corDoMapa };
}
