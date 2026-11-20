// Alvos de treino (só na Etapa 0): bolhas de cristal que flutuam perto da nave e estouram com um tiro.
// Voltam depois de alguns segundos. Servem para testar a mira no toque e a ajuda na mira.
import * as THREE from 'three';
import { COR } from '../desenho/paleta.js';

export function criarAlvos({ def, grade, cena, particulas, som }) {
  const geoCasca = new THREE.IcosahedronGeometry(0.55, 1);
  const matCasca = new THREE.MeshLambertMaterial({ color: COR.alvo, emissive: 0x0a5a70, flatShading: true, transparent: true, opacity: 0.88 });
  const geoNucleo = new THREE.IcosahedronGeometry(0.22, 0);
  const matNucleo = new THREE.MeshBasicMaterial({ color: 0xe8ffff });
  const geoAnel = new THREE.TorusGeometry(0.85, 0.035, 5, 28);
  const matAnel = new THREE.MeshBasicMaterial({ color: 0x9ff4ff, transparent: true, opacity: 0.7 });

  let estourados = 0;
  const lista = def.alvos.map((a, i) => {
    const grupo = new THREE.Group();
    const casca = new THREE.Mesh(geoCasca, matCasca);
    const nucleo = new THREE.Mesh(geoNucleo, matNucleo);
    const anel = new THREE.Mesh(geoAnel, matAnel);
    grupo.add(casca, nucleo, anel);
    const base = new THREE.Vector3(a.x, grade.alturaEm(a.x, a.z) + a.alturaExtra, a.z);
    grupo.position.copy(base);
    cena.add(grupo);
    const bolha = { grupo, casca, anel, base, fase: i * 1.7, ativo: true, volta: 0, raio: 0.8, pos: grupo.position };
    bolha.acertar = () => acertar(bolha);
    return bolha;
  });

  function acertar(alvo) {
    if (!alvo.ativo) return;
    alvo.ativo = false;
    alvo.volta = 4;
    alvo.grupo.visible = false;
    estourados++;
    if (som) som.estouro();
    for (let k = 0; k < 26; k++) {
      const a = Math.random() * Math.PI * 2, b = Math.random() * Math.PI - Math.PI / 2, v = 3 + Math.random() * 4;
      particulas.soltar({
        x: alvo.pos.x, y: alvo.pos.y, z: alvo.pos.z,
        vx: Math.cos(a) * Math.cos(b) * v, vy: Math.sin(b) * v + 2, vz: Math.sin(a) * Math.cos(b) * v,
        vida: 0.7 + Math.random() * 0.5, tamanho: 0.35, cresce: -0.2, cor: k % 3 ? 0x7ff4ff : 0xffffff, alfa: 1, gravidade: 9,
      });
    }
  }

  let t = 0;
  function atualizar(dt) {
    t += dt;
    for (const a of lista) {
      if (!a.ativo) {
        a.volta -= dt;
        if (a.volta <= 0) { a.ativo = true; a.grupo.visible = true; a.grupo.scale.setScalar(0.05); }
        continue;
      }
      const s = a.grupo.scale.x;
      if (s < 1) a.grupo.scale.setScalar(Math.min(1, s + dt * 2.5));
      a.pos.set(a.base.x, a.base.y + Math.sin(t * 1.3 + a.fase) * 0.25, a.base.z);
      a.casca.rotation.y += dt * 0.6;
      a.casca.rotation.x += dt * 0.25;
      a.anel.rotation.x = Math.PI / 2 + Math.sin(t * 0.9 + a.fase) * 0.4;
      a.anel.rotation.y += dt * 1.1;
    }
  }

  return { lista, acertar, atualizar, get estourados() { return estourados; } };
}
