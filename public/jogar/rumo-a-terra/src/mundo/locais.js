// Os lugares das missões no Vale (dados em src/dados/locais.js), feitos com formas simples:
// ninho dos Rastejadores, ninho dos Zumbidores, Base da Expedição Cruzeiro, Cratera do Núcleo, Observatório,
// Ruínas dos Antigos (com a porta que abre com as pedras-chave) e os três monólitos.
// Também os montes de sucata (destroços da Andorinha), que dá para desmontar como as pedras (src/mundo/recursos.js).
// Cada lugar vira uma ou duas malhas juntadas; o main.js desenha cada uma na cópia mais perto da câmera (o mundo dá a volta).
import * as THREE from 'three';
import { LOCAIS, SUCATA } from '../dados/locais.js';
import { preparar, mesclar, matriz, tremer, misturarHex, brilhoHex } from '../desenho/geometria.js';
import { criarAleatorio } from '../logica/ruido.js';
import { COR } from '../desenho/paleta.js';

export function criarLocais({ def, grade, colisoes }) {
  const rnd = criarAleatorio(def.semente + 900);
  const grupo = new THREE.Group();
  const malhas = []; // sólidas (usam o material "props" do visual escolhido)
  const malhasBrilho = []; // partes que brilham sozinhas (runas, cristais, luzes)
  const matBrilho = new THREE.MeshBasicMaterial({ vertexColors: true });
  const chao = (x, z) => grade.alturaEm(x, z);
  const cilindro = (x, z, r, alt, y = chao(x, z)) => colisoes.adicionar({ tipo: 'cilindro', x, z, r, base: y - 2, topo: y + alt });
  const caixa = (x, z, meioX, meioZ, giro, alt, y = chao(x, z)) => {
    const c = { tipo: 'caixa', x, z, meioX, meioZ, giro, base: y - 2, topo: y + alt };
    colisoes.adicionar(c);
    return c;
  };

  function malha(geos, material, lista) {
    if (!geos.length) return null;
    const mesh = new THREE.Mesh(mesclar(geos), material);
    mesh.matrixAutoUpdate = false;
    grupo.add(mesh);
    const bs = mesh.geometry.boundingSphere;
    const p = { mesh, x: bs.center.x, z: bs.center.z, raio: bs.radius };
    lista.push(p);
    return p;
  }

  const pedra = (x, z, s, cor1 = COR.pedra, cor2 = COR.pedraClara, alto = 1) => {
    const y = chao(x, z);
    return preparar(tremer(new THREE.IcosahedronGeometry(1, 1), 0.3, rnd), (vx, vy) => misturarHex(cor1, cor2, (vy + 1) / 2),
      matriz(x, y + s * 0.35 * alto, z, rnd(), rnd() * 6, rnd() * 0.3, s, s * 0.75 * alto, s));
  };

  // ---------- cada tipo de construção ----------
  const CONSTRUIR = {
    // Colina da Bateria: anel de pedras com cristais e um ninho de gravetos no meio (onde a bateria aparece).
    ninhoRastejador(L, g, b) {
      for (let k = 0; k < 9; k++) {
        const a = (k / 9) * Math.PI * 2 + 0.2, r = 7.5 + rnd();
        const x = L.x + Math.cos(a) * r, z = L.z + Math.sin(a) * r, s = 1.0 + rnd() * 0.5;
        g.push(pedra(x, z, s, 0x4a3f5c, 0x7d6f94, 1.4));
        cilindro(x, z, s * 0.85, s * 1.2);
        if (k % 2 === 0) {
          const y = chao(x, z);
          b.push(preparar(new THREE.OctahedronGeometry(0.22, 0), (vx, vy) => misturarHex(0x1d8fb0, COR.cristal, vy / 0.22 * 0.5 + 0.6), matriz(x + 0.4, y + s * 1.1, z, 0.2, a, 0.3, 1, 3, 1)));
        }
      }
      const y = chao(L.x, L.z);
      g.push(preparar(new THREE.CylinderGeometry(2.4, 2.8, 0.35, 10), 0x3a2618, matriz(L.x, y + 0.1, L.z)));
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2;
        g.push(preparar(new THREE.BoxGeometry(2.4, 0.14, 0.14), k % 2 ? 0x5a3c28 : 0x7a5638, matriz(L.x + Math.cos(a) * 2.1, y + 0.35 + (k % 3) * 0.08, L.z + Math.sin(a) * 2.1, 0.25, -a + Math.PI / 2, 0.15)));
      }
    },

    // Ninho dos Zumbidores: três torres de colmeia (laranja e marrom, com buracos) e coisas brilhantes que eles juntam.
    ninhoZumbidor(L, g, b) {
      for (const [ox, oz, alt] of [[-6, -3, 9], [6, -4, 7.5], [0, 7, 8.5]]) {
        const x = L.x + ox, z = L.z + oz, y = chao(x, z);
        const partes = 5;
        for (let k = 0; k < partes; k++) {
          const t = k / partes, r = 2.3 * (1 - t * 0.65), h = alt / partes;
          g.push(preparar(tremer(new THREE.CylinderGeometry(r * 0.85, r, h * 1.05, 9, 1), 0.15, rnd), (vx, vy) => misturarHex(0x7a4a22, 0xd8963c, (k % 2 ? 0.3 : 0.75) + vy * 0.1),
            matriz(x, y + h * (k + 0.5) - 0.2, z, 0, rnd() * 6, 0)));
          for (let f = 0; f < 3; f++) {
            const a = rnd() * Math.PI * 2;
            g.push(preparar(new THREE.CircleGeometry(0.32, 6), 0x1a0e06, matriz(x + Math.cos(a) * r * 0.93, y + h * (k + 0.5), z + Math.sin(a) * r * 0.93, 0, Math.PI / 2 - a, 0)));
          }
        }
        cilindro(x, z, 2.3, alt);
      }
      for (let k = 0; k < 14; k++) {
        const a = rnd() * Math.PI * 2, r = 1 + rnd() * 4, x = L.x + Math.cos(a) * r, z = L.z + Math.sin(a) * r, y = chao(x, z);
        if (k % 2) b.push(preparar(new THREE.OctahedronGeometry(0.12 + rnd() * 0.1, 0), k % 4 === 1 ? 0xffe14d : COR.cristal, matriz(x, y + 0.12, z, rnd(), rnd(), rnd())));
        else g.push(preparar(new THREE.CylinderGeometry(0.9, 0.9, 0.06, 6), 0xe8b84a, matriz(x, y + 0.03, z, 0, rnd(), 0)));
      }
    },

    // Base da Expedição Cruzeiro (abandonada há 60 anos): dois módulos, a torre de rádio, caixas e uma cerca.
    base(L, g, b) {
      const modulo = (ox, oz, w, h, d, giro, caido = 0) => {
        const x = L.x + ox, z = L.z + oz, y = chao(x, z);
        const m = (lx, ly, lz) => matriz(x + lx * Math.cos(giro) + lz * Math.sin(giro), y + ly, z - lx * Math.sin(giro) + lz * Math.cos(giro), 0, giro, caido);
        g.push(preparar(new THREE.BoxGeometry(w, h, d), (vx, vy) => misturarHex(0x8a7a6a, 0xd8dde6, Math.min(1, (vy + h / 2) / h + 0.3)), m(0, h / 2, 0)));
        g.push(preparar(new THREE.BoxGeometry(w + 0.08, 0.35, d + 0.08), COR.nariz, m(0, h * 0.72, 0)));
        g.push(preparar(new THREE.BoxGeometry(w + 0.2, 0.18, d + 0.2), 0x6a6e78, m(0, h + 0.05, 0)));
        g.push(preparar(new THREE.BoxGeometry(1.0, 1.9, d + 0.1), 0x2a2f3a, m(-w * 0.3, 0.95, 0)));
        g.push(preparar(new THREE.BoxGeometry(w * 0.3, 0.6, d + 0.1), COR.vidro, m(w * 0.18, h * 0.45, 0)));
        caixa(x, z, w / 2 + 0.1, d / 2 + 0.1, giro, h + 0.2);
      };
      modulo(-6, -3, 7, 3, 4, 0.2);
      modulo(6, -6, 5, 2.6, 4, -0.4, 0.06);
      // torre de rádio (treliça) com a luz vermelha apagada lá em cima
      const tx = L.x + 4, tz = L.z + 4, ty = chao(tx, tz), ALT = 12;
      for (const [sx, sz] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
        g.push(preparar(new THREE.BoxGeometry(0.16, ALT, 0.16), 0x9aa0aa, matriz(tx + sx * 0.6, ty + ALT / 2, tz + sz * 0.6, sz * 0.05, 0, -sx * 0.05)));
      }
      for (let k = 1; k < 6; k++) {
        const h = k * 2, w = 1.25 - k * 0.08;
        g.push(preparar(new THREE.BoxGeometry(w * 2, 0.08, 0.08), 0x8a9098, matriz(tx, ty + h, tz - w * 0.95)));
        g.push(preparar(new THREE.BoxGeometry(w * 2, 0.08, 0.08), 0x8a9098, matriz(tx, ty + h, tz + w * 0.95)));
        g.push(preparar(new THREE.BoxGeometry(0.08, 0.08, w * 2), 0x8a9098, matriz(tx - w * 0.95, ty + h, tz)));
        g.push(preparar(new THREE.BoxGeometry(0.08, 0.08, w * 2), 0x8a9098, matriz(tx + w * 0.95, ty + h, tz)));
      }
      g.push(preparar(new THREE.BoxGeometry(1.6, 0.15, 1.6), 0x6a6e78, matriz(tx, ty + ALT, tz)));
      b.push(preparar(new THREE.OctahedronGeometry(0.22, 0), 0x802020, matriz(tx, ty + ALT + 0.4, tz)));
      cilindro(tx, tz, 1.1, ALT);
      // caixas da expedição
      for (const [ox, oz, s] of [[-1, 7, 1], [0.3, 8.1, 0.8], [-9, 5, 1.1], [9, 3, 0.9]]) {
        const x = L.x + ox, z = L.z + oz, y = chao(x, z);
        g.push(preparar(new THREE.BoxGeometry(s, s * 0.8, s), (vx, vy) => (Math.abs(vy) < s * 0.08 ? COR.nariz : 0x7a5a3a), matriz(x, y + s * 0.4, z, 0, rnd() * 2, 0)));
        cilindro(x, z, s * 0.6, s * 0.8);
      }
      // cerca velha
      for (let k = 0; k < 26; k++) {
        if (k % 7 === 3) continue;
        const a = (k / 26) * Math.PI * 2, x = L.x + Math.cos(a) * 14, z = L.z + Math.sin(a) * 14, y = chao(x, z);
        g.push(preparar(new THREE.BoxGeometry(0.12, 1.4, 0.12), 0x6a5a4a, matriz(x, y + 0.6, z, (rnd() - 0.5) * 0.3, 0, (rnd() - 0.5) * 0.3)));
      }
    },

    // Cratera do Núcleo: o caixote do reator aberto no fundo, pedras de vidro de meteoro brilhando e pedras na borda.
    cratera(L, g, b) {
      const y = chao(L.x, L.z);
      g.push(preparar(new THREE.CylinderGeometry(1.4, 1.6, 0.9, 8, 1, true), 0x3a3d45, matriz(L.x, y + 0.4, L.z, 0.15, 0, 0.1)));
      g.push(preparar(new THREE.CylinderGeometry(1.6, 1.6, 0.2, 8), 0x2a2c32, matriz(L.x, y + 0.05, L.z)));
      b.push(preparar(new THREE.CylinderGeometry(1.15, 1.15, 0.12, 8), 0x2aff7a, matriz(L.x, y + 0.55, L.z)));
      for (let k = 0; k < 9; k++) {
        const a = rnd() * Math.PI * 2, r = 3 + rnd() * 7, x = L.x + Math.cos(a) * r, z = L.z + Math.sin(a) * r, yy = chao(x, z);
        b.push(preparar(tremer(new THREE.IcosahedronGeometry(0.35 + rnd() * 0.3, 0), 0.15, rnd), k % 2 ? 0x9a5aff : 0x4affb0, matriz(x, yy + 0.15, z, rnd(), rnd(), rnd())));
      }
      for (let k = 0; k < 6; k++) {
        const a = rnd() * Math.PI * 2, x = L.x + Math.cos(a) * (4 + rnd() * 5), z = L.z + Math.sin(a) * (4 + rnd() * 5);
        g.push(preparar(new THREE.BoxGeometry(0.4 + rnd(), 0.06, 2 + rnd() * 3), COR.queimado, matriz(x, chao(x, z) + 0.03, z, 0, Math.atan2(x - L.x, z - L.z), 0)));
      }
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2 + rnd() * 0.3, x = L.x + Math.cos(a) * 25, z = L.z + Math.sin(a) * 25, s = 1 + rnd() * 0.8;
        g.push(pedra(x, z, s));
        cilindro(x, z, s * 0.8, s);
      }
    },

    // Observatório da expedição, no alto do morro grande: base redonda, cúpula com fenda, painel solar e antena.
    observatorio(L, g, b) {
      const y = chao(L.x, L.z);
      g.push(preparar(new THREE.CylinderGeometry(3, 3.1, 2.6, 14), (vx, vy) => misturarHex(0x9a9aa2, 0xdfe2e8, (vy + 1.3) / 2.6), matriz(L.x, y + 1.2, L.z)));
      g.push(preparar(new THREE.SphereGeometry(3.15, 14, 7, 0, Math.PI * 2, 0, Math.PI / 2), 0xe8ebf0, matriz(L.x, y + 2.5, L.z)));
      g.push(preparar(new THREE.BoxGeometry(0.9, 0.2, 3.3), 0x22252c, matriz(L.x, y + 4.4, L.z - 0.6, -0.55, 0, 0)));
      g.push(preparar(new THREE.BoxGeometry(1.1, 1.9, 0.12), 0x2a2f3a, matriz(L.x, y + 0.95, L.z + 3.05)));
      g.push(preparar(new THREE.BoxGeometry(0.12, 2.4, 0.12), 0x8a9098, matriz(L.x - 4, y + 1.2, L.z - 1)));
      g.push(preparar(new THREE.BoxGeometry(2, 0.08, 1.3), (vx, vy, vz) => (Math.floor((vx + 1) * 3) % 2 ? 0x1c3a7a : 0x26509a), matriz(L.x - 4, y + 2.4, L.z - 1, -0.6, 0.3, 0)));
      g.push(preparar(new THREE.CylinderGeometry(0.05, 0.05, 3.5, 4), 0x8a9098, matriz(L.x + 2.2, y + 5.2, L.z - 1.5)));
      b.push(preparar(new THREE.OctahedronGeometry(0.15, 0), 0xff4040, matriz(L.x + 2.2, y + 7, L.z - 1.5)));
      cilindro(L.x, L.z, 3.2, 6, y);
    },

    // Ruínas dos Antigos: um pátio de muros com a porta grande (abre com as 3 pedras-chave) e o altar do Cristal de Salto.
    ruinas(L, g, b, extra) {
      const y = chao(L.x, L.z);
      const pedraVelha = (vx, vy) => brilhoHex(misturarHex(0x56656e, 0x93a8ac, (vy + 2) / 4), 0.9 + rnd() * 0.15);
      const muro = (cx, cz, comp, eixoX) => {
        const partes = Math.max(1, Math.round(comp / 2.2));
        for (let k = 0; k < partes; k++) {
          const t = (k + 0.5) / partes - 0.5, alt = 3.4 + rnd() * 1.2;
          const x = L.x + cx + (eixoX ? t * comp : 0), z = L.z + cz + (eixoX ? 0 : t * comp);
          g.push(preparar(tremer(new THREE.BoxGeometry(eixoX ? comp / partes + 0.05 : 1, alt, eixoX ? 1 : comp / partes + 0.05), 0.08, rnd), pedraVelha, matriz(x, y + alt / 2 - 0.2, z)));
        }
        caixa(L.x + cx, L.z + cz, eixoX ? comp / 2 : 0.55, eixoX ? 0.55 : comp / 2, 0, 4.5, y);
      };
      muro(0, 10, 21, true);
      muro(10, 0, 21, false);
      muro(-10, 0, 21, false);
      muro(-6.25, -10, 8.5, true);
      muro(6.25, -10, 8.5, true);
      // pilares e viga da porta, com runas que brilham
      for (const s of [-1, 1]) {
        g.push(preparar(new THREE.BoxGeometry(1.3, 6, 1.5), pedraVelha, matriz(L.x + s * 2.65, y + 2.8, L.z - 10)));
        for (let k = 0; k < 4; k++) b.push(preparar(new THREE.BoxGeometry(0.5, 0.1, 0.05), COR.cristal, matriz(L.x + s * 2.65, y + 1.2 + k * 1.1, L.z - 10.78)));
      }
      g.push(preparar(new THREE.BoxGeometry(6.6, 1.1, 1.6), pedraVelha, matriz(L.x, y + 6.3, L.z - 10)));
      b.push(preparar(new THREE.BoxGeometry(3.4, 0.12, 0.05), COR.cristal, matriz(L.x, y + 6.3, L.z - 10.82)));
      // a porta (malha separada: some quando abre)
      const geoPorta = [
        preparar(new THREE.BoxGeometry(4, 5.8, 0.5), (vx, vy) => misturarHex(0x3e4a52, 0x6a7a82, (vy + 2.9) / 5.8), matriz(L.x, y + 2.7, L.z - 10)),
        ...[-1, 0, 1].map((k) => preparar(new THREE.OctahedronGeometry(0.3, 0), 0x1a2228, matriz(L.x + k * 1.1, y + 3.4, L.z - 10.3, 0, 0, 0, 1, 1, 0.4))),
        preparar(new THREE.BoxGeometry(0.08, 5, 0.06), 0x9ff4ff, matriz(L.x, y + 2.7, L.z - 10.27)),
      ];
      extra.porta = { geos: geoPorta, colisor: { tipo: 'caixa', x: L.x, z: L.z - 10, meioX: 2.1, meioZ: 0.5, giro: 0, base: y - 2, topo: y + 6 }, x: L.x, z: L.z - 11.6 };
      // altar no meio do pátio
      g.push(preparar(new THREE.BoxGeometry(2.4, 0.9, 2.4), pedraVelha, matriz(L.x, y + 0.4, L.z)));
      g.push(preparar(new THREE.BoxGeometry(1.6, 0.25, 1.6), 0x7a8c92, matriz(L.x, y + 0.95, L.z)));
      b.push(preparar(new THREE.BoxGeometry(2.45, 0.08, 0.05), COR.cristal, matriz(L.x, y + 0.6, L.z + 1.22)));
      cilindro(L.x, L.z, 1.3, 1.1, y);
      // pilares quebrados (dentro e fora)
      for (const [ox, oz] of [[-6, -6], [6, -6], [-6, 6], [6, 6], [-14, -4], [13, 8], [-4, 15], [9, -15], [-15, 12]]) {
        const x = L.x + ox, z = L.z + oz, yy = chao(x, z), alt = 1.5 + rnd() * 3;
        g.push(preparar(tremer(new THREE.CylinderGeometry(0.6, 0.7, alt, 7), 0.08, rnd), pedraVelha, matriz(x, yy + alt / 2 - 0.1, z, (rnd() - 0.5) * 0.1, rnd(), 0)));
        cilindro(x, z, 0.7, alt, yy);
      }
    },

    // Monólito dos Antigos: uma pedra escura e alta com runas azuis. A pedra-chave fica no chão ao lado.
    monolito(L, g, b) {
      const y = chao(L.x, L.z);
      g.push(preparar(new THREE.BoxGeometry(3.2, 0.25, 3.2), 0x6a6e78, matriz(L.x, y + 0.05, L.z)));
      g.push(preparar(tremer(new THREE.BoxGeometry(1.4, 7, 0.7, 1, 4, 1), 0.06, rnd), (vx, vy) => misturarHex(0x1e2230, 0x40485a, (vy + 3.5) / 7), matriz(L.x, y + 3.6, L.z, 0, 0.4, 0)));
      for (let k = 0; k < 6; k++) {
        const h = y + 1.2 + k * 0.95;
        for (const lado of [-1, 1]) b.push(preparar(new THREE.BoxGeometry(0.25 + (k % 3) * 0.2, 0.1, 0.04), COR.cristal, matriz(L.x + lado * 0.36 * Math.sin(0.4), h, L.z + lado * 0.36 * Math.cos(0.4), 0, 0.4, 0)));
      }
      caixa(L.x, L.z, 0.75, 0.4, 0.4, 7, y);
    },
  };

  let porta = null;
  for (const [id, L] of Object.entries(LOCAIS)) {
    if (!L.construcao) continue;
    const g = [], b = [], extra = {};
    CONSTRUIR[L.construcao](L, g, b, extra);
    malha(g, null, malhas);
    malha(b, matBrilho, malhasBrilho);
    if (extra.porta) {
      porta = malha(extra.porta.geos, null, malhas);
      porta.colisor = extra.porta.colisor;
      porta.frente = { x: extra.porta.x, z: extra.porta.z };
      colisoes.adicionar(porta.colisor);
      porta.local = id;
    }
  }

  // ---------- montes de sucata (recursos: dá para desmontar com a mão ou, mais rápido, com a picareta) ----------
  const geosSucata = [], recursos = [];
  for (const [x, z] of SUCATA) {
    const y = chao(x, z), g0 = geosSucata.length;
    for (let k = 0; k < 4; k++) {
      const w = 0.5 + rnd() * 0.8;
      geosSucata.push(preparar(new THREE.BoxGeometry(w, 0.08 + rnd() * 0.12, w * (0.6 + rnd() * 0.6)), [COR.casco, COR.fuligem, 0x8a9098, COR.nariz][k],
        matriz(x + (rnd() - 0.5) * 0.9, y + 0.15 + k * 0.14, z + (rnd() - 0.5) * 0.9, (rnd() - 0.5) * 0.9, rnd() * 6, (rnd() - 0.5) * 0.9)));
    }
    geosSucata.push(preparar(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 6), COR.motor, matriz(x + 0.2, y + 0.35, z - 0.1, 0.3, rnd() * 3, Math.PI / 2 - 0.3)));
    recursos.push({ tipo: 'sucata', x, y, z, raio: 1.0, altura: 1.0, g0, ng: geosSucata.length - g0, colisor: { tipo: 'cilindro', x, z, r: 0.6, base: y - 2, topo: y + 0.8 } });
  }
  const pSucata = malha(geosSucata, null, malhas);
  const inicios = [];
  let soma = 0;
  for (const geo of geosSucata) { inicios.push(soma); soma += geo.attributes.position.count; }
  for (const r of recursos) {
    r.mesh = pSucata.mesh;
    r.inicio = inicios[r.g0];
    r.contagem = inicios[r.g0 + r.ng - 1] + geosSucata[r.g0 + r.ng - 1].attributes.position.count - r.inicio;
    colisoes.adicionar(r.colisor);
  }

  // Lugares onde as plantas não devem nascer (para não ficarem dentro das construções).
  const livres = [
    ...Object.values(LOCAIS).filter((l) => l.construcao).map((l) => ({ x: l.x, z: l.z, r: (l.raio || 8) + 4 })),
    ...SUCATA.map(([x, z]) => ({ x, z, r: 2.5 })),
  ];

  return {
    grupo, malhas, malhasBrilho, recursos, livres,
    // A porta das Ruínas: fechada (com colisão) ou aberta (some).
    abrirPorta(aberta) {
      if (!porta) return;
      porta.escondido = aberta;
      porta.mesh.visible = !aberta;
      if (aberta) colisoes.remover(porta.colisor); else colisoes.adicionar(porta.colisor);
    },
    get portaFrente() { return porta ? porta.frente : null; },
  };
}
