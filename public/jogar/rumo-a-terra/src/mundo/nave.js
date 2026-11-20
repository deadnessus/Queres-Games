// A Andorinha caída (modelo provisório da Etapa 0): casco hexagonal branco com faixa azul-marinho,
// nariz laranja, uma asa quebrada, o motor sem o bocal (é uma das peças a achar), destroços e fumaça.
import * as THREE from 'three';
import { COR } from '../desenho/paleta.js';
import { preparar, mesclar, matriz, misturarHex, brilhoHex } from '../desenho/geometria.js';
import { texturaLetreiro } from '../desenho/texturas.js';
import { criarAleatorio } from '../logica/ruido.js';

const GRAU = Math.PI / 180;

// Prepara uma peça já posicionada no espaço da nave e pinta pela posição final.
function peca(geo, m, cor) {
  geo.applyMatrix4(m);
  return preparar(geo, cor);
}

export function criarNave({ def, grade, colisoes, particulas }) {
  const n = def.nave;
  const rnd = criarAleatorio(def.semente + 300);
  const giro = Math.PI - n.giro * GRAU; // nariz (+z local) apontando para o rumo n.giro
  const yChao = grade.alturaEm(n.x, n.z);

  // Cor do casco: faixa azul em cima, fuligem embaixo.
  const corCasco = (x, y) => {
    const base = misturarHex(COR.fuligem, COR.casco, Math.min(1, Math.max(0, (y - 0.25) / 0.9)));
    return brilhoHex(base, 0.92 + rnd() * 0.1);
  };

  const pecas = [];
  // fuselagem: prisma de 6 lados deitado (frente mais fina)
  pecas.push(peca(new THREE.CylinderGeometry(1.45, 1.6, 10, 6, 2), matriz(0, 1.6, 0, Math.PI / 2, 0, 0), corCasco));
  // faixas azul-marinho (como as costas da andorinha): uma no alto e uma de cada lado
  pecas.push(peca(new THREE.BoxGeometry(0.75, 0.12, 9.6), matriz(0, 3.12, 0.2), COR.faixa));
  for (const lado of [-1, 1]) pecas.push(peca(new THREE.BoxGeometry(0.06, 0.3, 9.2), matriz(lado * 1.37, 2.12, 0.2), COR.faixa));
  // nariz
  pecas.push(peca(new THREE.ConeGeometry(1.45, 3.4, 6, 1), matriz(0, 1.6, 6.7, Math.PI / 2, 0, 0),
    (x, y, z) => misturarHex(COR.nariz, brilhoHex(COR.nariz, 0.6), Math.max(0, (z - 7.4) / 1.2))));
  // vidro da cabine
  pecas.push(peca(new THREE.BoxGeometry(1.5, 0.5, 2.3), matriz(0, 2.75, 3.7, -0.24, 0, 0), COR.vidro));
  // motor e o buraco onde ficava o bocal
  pecas.push(peca(new THREE.CylinderGeometry(1.25, 1.45, 2.2, 8, 1), matriz(0, 1.6, -6.1, Math.PI / 2, 0, 0), (x, y) => (y < 0.9 ? COR.fuligem : COR.motor)));
  pecas.push(peca(new THREE.CircleGeometry(1.0, 8), matriz(0, 1.6, -7.22, 0, Math.PI, 0), COR.buraco));
  // asa esquerda inteira (ponta laranja) e o toco da direita
  pecas.push(peca(new THREE.BoxGeometry(5.2, 0.22, 3.0), matriz(-3.95, 1.05, -1.3, 0, 0, 0.07), (x) => (x < -6.0 ? COR.nariz : corCasco(0, 1.5))));
  pecas.push(peca(new THREE.BoxGeometry(2.0, 0.22, 2.8), matriz(2.35, 1.05, -1.3, 0, 0.1, -0.05), (x, y) => corCasco(0, y + 0.6)));
  // leme (cauda)
  pecas.push(peca(new THREE.BoxGeometry(0.22, 2.3, 2.2), matriz(0, 3.35, -5.3, 0.35, 0, 0), COR.faixa));
  // porta (escotilha) no lado direito e painéis arrancados
  pecas.push(peca(new THREE.BoxGeometry(0.06, 1.45, 1.1), matriz(1.36, 1.55, 1.2), COR.faixa));
  pecas.push(peca(new THREE.BoxGeometry(0.08, 0.12, 0.35), matriz(1.42, 1.5, 0.75), COR.nariz));
  pecas.push(peca(new THREE.BoxGeometry(0.06, 0.7, 1.4), matriz(1.36, 1.5, -3.6), COR.buraco));
  pecas.push(peca(new THREE.BoxGeometry(0.06, 0.6, 0.9), matriz(-1.36, 1.7, 2.0), COR.buraco));
  // antena entortada
  pecas.push(peca(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 4), matriz(0.3, 3.4, 1.0, 0.5, 0, 0.4), COR.motor));

  const grupo = new THREE.Group();
  grupo.name = 'nave';
  const casco = new THREE.Mesh(mesclar(pecas));
  grupo.add(casco);

  // nome no casco
  const letreiro = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.68), new THREE.MeshLambertMaterial({ map: texturaLetreiro('ANDORINHA'), transparent: true, depthWrite: false }));
  letreiro.position.set(1.385, 1.62, -1.4);
  letreiro.rotation.y = Math.PI / 2;
  grupo.add(letreiro);

  grupo.position.set(n.x, yChao - n.afundar, n.z);
  grupo.rotation.set(0, giro, n.inclinacao * GRAU, 'YXZ');
  grupo.updateMatrixWorld(true);

  const paraMundo = (x, y, z) => new THREE.Vector3(x, y, z).applyMatrix4(grupo.matrixWorld);

  // colisão: corpo + asa (caixas giradas junto com a nave)
  colisoes.adicionar({ tipo: 'caixa', x: n.x, z: n.z, meioX: 1.65, meioZ: 8.2, giro, base: yChao - 2, topo: yChao + 4.5 });
  const asa = paraMundo(-3.95, 1.05, -1.3);
  colisoes.adicionar({ tipo: 'caixa', x: asa.x, z: asa.z, meioX: 2.6, meioZ: 1.5, giro, base: yChao - 2, topo: yChao + 1.6 });

  // destroços espalhados pelo rastro da queda (e o pedaço da asa direita)
  const geosDestrocos = [];
  const sulco = def.terreno.ops.find((o) => o.tipo === 'sulco');
  const colocar = (x, z, geo, cor, ry, inclina) => {
    const y = grade.alturaEm(x, z);
    geosDestrocos.push(preparar(geo, cor, matriz(x, y + 0.08, z, inclina, ry, inclina * 0.7)));
  };
  if (sulco) {
    for (let i = 0; i < 9; i++) {
      const t = 0.1 + rnd() * 0.8;
      const x = sulco.de[0] + (sulco.ate[0] - sulco.de[0]) * t + (rnd() - 0.5) * 7;
      const z = sulco.de[1] + (sulco.ate[1] - sulco.de[1]) * t + (rnd() - 0.5) * 7;
      const w = 0.5 + rnd() * 1.3;
      colocar(x, z, new THREE.BoxGeometry(w, 0.08 + rnd() * 0.15, w * (0.5 + rnd())), rnd() < 0.5 ? COR.casco : COR.fuligem, rnd() * 6, (rnd() - 0.5) * 0.5);
    }
    // pedaço da asa direita, fincado no chão
    const x = sulco.de[0] + 6, z = sulco.de[1] - 4;
    colocar(x, z, new THREE.BoxGeometry(3.1, 0.22, 2.8), (vx) => (vx > 1.0 ? COR.nariz : COR.casco), 1.2, 0.5);
    colisoes.adicionar({ tipo: 'cilindro', x, z, r: 1.4, base: grade.alturaEm(x, z) - 2, topo: grade.alturaEm(x, z) + 1.4 });
  }
  const destrocos = geosDestrocos.length ? new THREE.Mesh(mesclar(geosDestrocos)) : null;

  // fumaça saindo do motor
  const saidaFumaca = paraMundo(0, 2.2, -6.6);
  let relogio = 0;
  function atualizar(dt) {
    relogio += dt;
    while (relogio > 0.22) {
      relogio -= 0.22;
      particulas.soltar({
        x: saidaFumaca.x + (Math.random() - 0.5) * 0.8, y: saidaFumaca.y, z: saidaFumaca.z + (Math.random() - 0.5) * 0.8,
        vx: 0.35 + Math.random() * 0.2, vy: 1.1 + Math.random() * 0.4, vz: (Math.random() - 0.5) * 0.3,
        vida: 4.5, tamanho: 1.0, cresce: 0.75, cor: 0x3b3634, alfa: 0.3,
      });
    }
  }

  // Ponto de "Examinar" (a porta da nave).
  const porta = paraMundo(2.6, 1.2, 1.2);

  return { grupo, casco, letreiro, destrocos, atualizar, porta, centro: new THREE.Vector3(n.x, yChao, n.z) };
}
