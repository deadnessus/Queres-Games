// A água do lago: um disco no nível da água (o que fica embaixo do chão não aparece).
import * as THREE from 'three';
import { COR } from '../desenho/paleta.js';

export function criarAgua(def) {
  const lagos = def.terreno.ops.filter((o) => o.tipo === 'lago');
  const grupo = new THREE.Group();
  grupo.name = 'agua';
  const mat = new THREE.MeshPhongMaterial({ color: COR.agua, transparent: true, opacity: 0.8, shininess: 70, specular: 0x9fd8d0, depthWrite: false });
  for (const l of lagos) {
    const disco = new THREE.Mesh(new THREE.CircleGeometry((l.raio + l.borda) * 1.25, 40), mat);
    disco.rotation.x = -Math.PI / 2;
    disco.position.set(l.x, def.nivelAgua + 0.02, l.z);
    disco.renderOrder = 1;
    grupo.add(disco);
  }
  return { grupo, material: mat };
}
