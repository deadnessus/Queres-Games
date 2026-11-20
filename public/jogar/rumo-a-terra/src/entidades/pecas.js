// Peças das missões no chão (bateria, bocal, fusíveis, placas, pedras-chave, musgo-de-ar...).
// Só aparecem durante o passo da missão que precisa delas, girando, com um facho de luz para achar de longe.
// Chegando perto, o botão de ação vira "Pegar". O mundo dá a volta: cada peça é desenhada na cópia mais perto da câmera.
import * as THREE from 'three';
import { preparar, mesclar, matriz, misturarHex } from '../desenho/geometria.js';
import { texturaParticula } from '../desenho/texturas.js';
import { embrulhar, maisPerto } from '../logica/toro.js';

const CORES = {
  bateria: 0xffe14d, bocal: 0xff9a40, fusivel: 0xffe14d, antena: 0x9fe0ff, nucleo: 0x6dff9a, placa: 0xffa040,
  rastreador: 0xb0c8ff, chave: 0x5ff0ff, cristal_salto: 0xff8af0, musgo: 0x8aff7a, rifle: 0xff6ad5,
};

// Modelinhos (uns 50 cm) feitos com formas simples.
function modelo(item) {
  const p = [];
  if (item === 'bateria') {
    p.push(preparar(new THREE.BoxGeometry(0.55, 0.36, 0.32), 0x3a3d45, matriz(0, 0, 0)));
    p.push(preparar(new THREE.BoxGeometry(0.56, 0.08, 0.33), 0xffd23a, matriz(0, 0.06, 0)));
    for (const x of [-0.15, 0.15]) p.push(preparar(new THREE.CylinderGeometry(0.04, 0.04, 0.1, 6), x < 0 ? 0xd03030 : 0x202020, matriz(x, 0.22, 0)));
  } else if (item === 'bocal') {
    p.push(preparar(new THREE.CylinderGeometry(0.16, 0.38, 0.55, 10, 1, true), (x, y) => misturarHex(0x3a3f4b, 0x8a909c, y + 0.5), matriz(0, 0, 0)));
    p.push(preparar(new THREE.TorusGeometry(0.17, 0.04, 5, 10), 0x5a606c, matriz(0, 0.27, 0, Math.PI / 2, 0, 0)));
  } else if (item === 'fusivel') {
    p.push(preparar(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 8), 0xbfe6ff, matriz(0, 0, 0, 0, 0, Math.PI / 2)));
    for (const x of [-0.17, 0.17]) p.push(preparar(new THREE.CylinderGeometry(0.08, 0.08, 0.06, 8), 0xc0c4cc, matriz(x, 0, 0, 0, 0, Math.PI / 2)));
    p.push(preparar(new THREE.BoxGeometry(0.22, 0.02, 0.02), 0xffe14d, matriz(0, 0, 0)));
  } else if (item === 'antena') {
    p.push(preparar(new THREE.CylinderGeometry(0.34, 0.06, 0.16, 10, 1, true), 0xdfe2e8, matriz(0, 0.1, 0, 0.6, 0, 0)));
    p.push(preparar(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 4), 0x8a9098, matriz(0, -0.12, 0)));
  } else if (item === 'nucleo') {
    p.push(preparar(new THREE.IcosahedronGeometry(0.2, 1), 0x6dff9a, matriz(0, 0, 0)));
    for (let k = 0; k < 4; k++) p.push(preparar(new THREE.BoxGeometry(0.04, 0.5, 0.04), 0x5a606c, matriz(Math.cos(k * 1.57) * 0.24, 0, Math.sin(k * 1.57) * 0.24)));
    for (const y of [-0.25, 0.25]) p.push(preparar(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 8), 0x3a3d45, matriz(0, y, 0)));
  } else if (item === 'placa') {
    p.push(preparar(new THREE.BoxGeometry(0.62, 0.06, 0.46), (x, y, z) => (Math.abs(x) < 0.02 || Math.abs(z) < 0.02 ? 0x5a2a10 : 0xffa040), matriz(0, 0, 0, 0.5, 0, 0)));
  } else if (item === 'rastreador') {
    p.push(preparar(new THREE.CylinderGeometry(0.14, 0.16, 0.42, 10), 0xdfe2e8, matriz(0, 0, 0, Math.PI / 2, 0, 0)));
    p.push(preparar(new THREE.CircleGeometry(0.12, 10), 0x2a50c0, matriz(0, 0, 0.215)));
    p.push(preparar(new THREE.BoxGeometry(0.06, 0.2, 0.06), 0x8a9098, matriz(0, -0.18, 0)));
  } else if (item === 'chave') {
    p.push(preparar(new THREE.OctahedronGeometry(0.22, 0), (x, y) => misturarHex(0x4a525a, 0x8a949c, y + 0.5), matriz(0, 0, 0, 0, 0, 0, 1, 1.4, 0.6)));
    p.push(preparar(new THREE.BoxGeometry(0.2, 0.04, 0.02), 0x5ff0ff, matriz(0, 0.05, 0.14)));
    p.push(preparar(new THREE.BoxGeometry(0.04, 0.16, 0.02), 0x5ff0ff, matriz(0, 0.0, 0.14)));
  } else if (item === 'cristal_salto') {
    p.push(preparar(new THREE.OctahedronGeometry(0.22, 0), (x, y) => misturarHex(0x5ff0ff, 0xff8af0, y + 0.5), matriz(0, 0, 0, 0, 0, 0, 1, 1.9, 1)));
  } else if (item === 'rifle') {
    // o Rifle de raio deitado no chão (grande)
    p.push(preparar(new THREE.BoxGeometry(0.16, 0.18, 0.75), (x, y) => (y > 0.04 ? 0x4a5060 : 0x2e323c), matriz(0, 0, 0)));
    p.push(preparar(new THREE.CylinderGeometry(0.055, 0.065, 0.75, 10), 0x2a2d35, matriz(0, 0.02, -0.72, Math.PI / 2, 0, 0)));
    p.push(preparar(new THREE.BoxGeometry(0.12, 0.16, 0.36), 0x7a4a8a, matriz(0, -0.03, 0.52)));
    p.push(preparar(new THREE.BoxGeometry(0.17, 0.05, 0.24), 0xff9a40, matriz(0, -0.07, -0.2)));
    for (const z of [-0.5, -0.7, -0.9]) p.push(preparar(new THREE.TorusGeometry(0.08, 0.022, 6, 12), 0xff8ae8, matriz(0, 0.02, z)));
    const g = mesclar(p);
    g.rotateZ(Math.PI / 2);
    g.scale(0.8, 0.8, 0.8);
    return g;
  } else if (item === 'musgo') {
    for (let k = 0; k < 6; k++) p.push(preparar(new THREE.IcosahedronGeometry(0.1 + (k % 3) * 0.03, 0), k % 2 ? 0x5fd060 : 0x8aff7a, matriz(Math.cos(k) * 0.14, (k % 3) * 0.05 - 0.15, Math.sin(k) * 0.14)));
  } else {
    p.push(preparar(new THREE.BoxGeometry(0.4, 0.4, 0.4), 0xdddddd, matriz(0, 0, 0)));
  }
  return mesclar(p);
}

export function criarPecas({ cena, grade }) {
  const T = grade.tamanho;
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x333333 });
  const geos = new Map();
  const geoFacho = new THREE.CylinderGeometry(0.14, 0.14, 26, 6, 1, true).translate(0, 13, 0);
  const matsFacho = new Map(), matsBrilho = new Map();
  const texBrilho = texturaParticula();
  const lista = [];
  let relogio = 0;

  // defs: [{ id, item, x, z, y (opcional) }]
  function mostrar(defs) {
    for (const d of defs) {
      if (lista.some((p) => p.id === d.id)) continue;
      const cor = CORES[d.item] || 0xffffff;
      if (!geos.has(d.item)) geos.set(d.item, modelo(d.item));
      if (!matsFacho.has(cor)) {
        matsFacho.set(cor, new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
        matsBrilho.set(cor, new THREE.SpriteMaterial({ map: texBrilho, color: cor, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
      }
      const grupo = new THREE.Group();
      const corpo = new THREE.Mesh(geos.get(d.item), mat);
      corpo.position.y = 0.55;
      const facho = new THREE.Mesh(geoFacho, matsFacho.get(cor));
      const brilho = new THREE.Sprite(matsBrilho.get(cor));
      brilho.position.y = 0.55;
      brilho.scale.setScalar(1.5);
      grupo.add(corpo, facho, brilho);
      const y = d.y ?? grade.alturaEm(d.x, d.z);
      grupo.position.set(d.x, y, d.z);
      cena.add(grupo);
      lista.push({ id: d.id, item: d.item, x: d.x, z: d.z, y, grupo, corpo, fase: lista.length, extra: !!d.extra });
    }
  }

  function remover(p) {
    const i = lista.indexOf(p);
    if (i < 0) return;
    lista.splice(i, 1);
    cena.remove(p.grupo);
  }
  function limpar() { while (lista.length) remover(lista[0]); }

  // A peça mais perto (até "alcance" metros), ou null.
  function perto(pos, alcance = 2.6) {
    let melhor = null, dm = alcance;
    for (const p of lista) {
      const d = Math.hypot(embrulhar(p.x - pos.x, T), embrulhar(p.z - pos.z, T));
      if (d < dm && Math.abs(p.y - pos.y) < 3) { dm = d; melhor = p; }
    }
    return melhor;
  }

  // A peça de missão mais perto de qualquer distância (para a estrela da bússola). Não conta as "extras" (o rifle).
  function maisProxima(pos) {
    let melhor = null, dm = Infinity;
    for (const p of lista) {
      if (p.extra) continue;
      const d = Math.hypot(embrulhar(p.x - pos.x, T), embrulhar(p.z - pos.z, T));
      if (d < dm) { dm = d; melhor = p; }
    }
    return melhor;
  }

  function atualizar(dt) {
    relogio += dt;
    for (const p of lista) {
      p.corpo.rotation.y = relogio * 1.6 + p.fase;
      p.corpo.position.y = 0.6 + Math.sin(relogio * 2.2 + p.fase) * 0.12;
    }
  }

  function acompanhar(cam) {
    for (const p of lista) {
      const x = maisPerto(p.x, cam.x, T), z = maisPerto(p.z, cam.z, T);
      p.grupo.position.x = x; p.grupo.position.z = z;
      p.grupo.visible = Math.hypot(x - cam.x, z - cam.z) < 220;
    }
  }

  return { lista, mostrar, remover, limpar, perto, maisProxima, atualizar, acompanhar };
}
