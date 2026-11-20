// Ajudantes para montar modelos com formas simples e juntar muitas peças numa malha só
// (menos "chamadas de desenho" = mais leve no iPhone).
import * as THREE from 'three';

const _cor = new THREE.Color();
const _v = new THREE.Vector3();

// Deixa a geometria pronta para juntar: sem índice, com position, normal, uv e color.
// "cor" pode ser um número (cor única) ou uma função (x, y, z) => número, chamada com a posição ANTES de "matriz".
export function preparar(geo, cor, matriz = null) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  const pos = g.attributes.position;
  const n = pos.count;
  const cores = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    _cor.setHex(typeof cor === 'function' ? cor(pos.getX(i), pos.getY(i), pos.getZ(i)) : cor);
    cores[i * 3] = _cor.r; cores[i * 3 + 1] = _cor.g; cores[i * 3 + 2] = _cor.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(cores, 3));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  if (matriz) g.applyMatrix4(matriz);
  g.computeVertexNormals();
  for (const nome of Object.keys(g.attributes)) if (!['position', 'normal', 'uv', 'color'].includes(nome)) g.deleteAttribute(nome);
  return g;
}

// Junta várias geometrias preparadas numa só.
export function mesclar(lista) {
  const nomes = ['position', 'normal', 'uv', 'color'];
  const tam = { position: 3, normal: 3, uv: 2, color: 3 };
  let total = 0;
  for (const g of lista) total += g.attributes.position.count;
  const saida = new THREE.BufferGeometry();
  for (const nome of nomes) {
    const arr = new Float32Array(total * tam[nome]);
    let off = 0;
    for (const g of lista) { arr.set(g.attributes[nome].array, off); off += g.attributes[nome].array.length; }
    saida.setAttribute(nome, new THREE.BufferAttribute(arr, tam[nome]));
  }
  saida.computeBoundingSphere();
  saida.computeBoundingBox();
  return saida;
}

// Mexe um pouco cada vértice (pedras e troncos menos "perfeitos"), mantendo as faces grudadas.
export function tremer(geo, amp, aleatorio) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  const pos = g.attributes.position;
  const deslocamentos = new Map();
  for (let i = 0; i < pos.count; i++) {
    const chave = `${pos.getX(i).toFixed(3)},${pos.getY(i).toFixed(3)},${pos.getZ(i).toFixed(3)}`;
    let d = deslocamentos.get(chave);
    if (!d) { d = [(aleatorio() - 0.5) * amp, (aleatorio() - 0.5) * amp, (aleatorio() - 0.5) * amp]; deslocamentos.set(chave, d); }
    pos.setXYZ(i, pos.getX(i) + d[0], pos.getY(i) + d[1], pos.getZ(i) + d[2]);
  }
  g.computeVertexNormals();
  return g;
}

// Matriz de posição + giro (em radianos) + escala.
export function matriz(x, y, z, rx = 0, ry = 0, rz = 0, sx = 1, sy = sx, sz = sx) {
  const m = new THREE.Matrix4();
  m.compose(_v.set(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz, 'YXZ')), new THREE.Vector3(sx, sy, sz));
  return m;
}

// Mistura duas cores hexadecimais (t de 0 a 1).
export function misturarHex(a, b, t) {
  const ca = new THREE.Color(a), cb = new THREE.Color(b);
  return ca.lerp(cb, Math.max(0, Math.min(1, t))).getHex();
}

// Clareia (f > 1) ou escurece (f < 1) uma cor hexadecimal.
export function brilhoHex(hex, f) {
  const c = new THREE.Color(hex);
  c.r = Math.min(1, c.r * f); c.g = Math.min(1, c.g * f); c.b = Math.min(1, c.b * f);
  return c.getHex();
}
