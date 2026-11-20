// Plantas, pedras e cristais do Vale, espalhados com semente (sempre nos mesmos lugares).
// Tudo que é do mesmo pedaço de chão vira UMA malha só (menos chamadas de desenho).
// Também devolve os obstáculos (troncos e pedras grandes) para a colisão.
import * as THREE from 'three';
import { COR } from '../desenho/paleta.js';
import { preparar, mesclar, tremer, matriz, misturarHex, brilhoHex } from '../desenho/geometria.js';
import { criarAleatorio, fbm } from '../logica/ruido.js';

const LADO_PEDACO = 64;

export function criarVegetacao({ def, grade, relevo, colisoes, livres }) {
  const rnd = criarAleatorio(def.semente + 100);
  const { origem, nivelAgua } = grade;
  const qtdPedacos = Math.round(grade.tamanho / LADO_PEDACO);
  const baldes = new Map(); // pedaço -> { geos: [], tufos: { p: [], c: [] } }
  const cristais = [];
  const recursos = []; // coisas que dá para quebrar (ver src/mundo/recursos.js)
  const limite = grade.tamanho / 2 - 22;
  const corT = new THREE.Color();

  const balde = (x, z) => {
    const i = Math.max(0, Math.min(qtdPedacos - 1, Math.floor((x - origem) / LADO_PEDACO)));
    const j = Math.max(0, Math.min(qtdPedacos - 1, Math.floor((z - origem) / LADO_PEDACO)));
    const k = j * qtdPedacos + i;
    if (!baldes.has(k)) baldes.set(k, { geos: [], tufos: { p: [], c: [] } });
    return baldes.get(k);
  };

  // Lugar bom para uma planta deste tipo?
  function pode(x, z, { livre = 10, inclinacaoMin = 0.86, queimado = 0.2 } = {}) {
    if (Math.abs(x) > limite || Math.abs(z) > limite) return false;
    const y = grade.alturaEm(x, z);
    if (y < nivelAgua + 0.45) return false;
    if (grade.normalEm(x, z)[1] < inclinacaoMin) return false;
    if (relevo.pesoTrilha(x, z) > 0.25) return false;
    if (relevo.pesoQueimado(x, z) > queimado) return false;
    for (const l of livres) if (Math.hypot(x - l.x, z - l.z) < Math.max(livre, l.r)) return false;
    return true;
  }
  const sortearPonto = () => [(rnd() * 2 - 1) * limite, (rnd() * 2 - 1) * limite];

  // ---- grama-pena: tufos de 3 "penas" roxas (escritos direto em listas, para ser rápido) ----
  const cBase = new THREE.Color(COR.penaBase), cPonta = new THREE.Color(COR.penaPonta), cRosa = new THREE.Color(COR.penaRosa);
  function tufo(x, z) {
    const y = grade.alturaEm(x, z) - 0.05;
    const b = balde(x, z).tufos;
    const escala = 0.7 + rnd() * 0.6;
    const ponta = rnd() < 0.18 ? cRosa : cPonta;
    for (let k = 0; k < 3; k++) {
      const ang = rnd() * Math.PI + (k * Math.PI) / 3;
      const dx = Math.cos(ang), dz = Math.sin(ang);
      const incl = (rnd() - 0.5) * 0.5 * escala;
      const lx = -dz * incl, lz = dx * incl;
      const alt = (0.42 + rnd() * 0.45) * escala, w = 0.06 * escala, wm = 0.12 * escala;
      const bl = [x - dx * w, y, z - dz * w], br = [x + dx * w, y, z + dz * w];
      const ml = [x - dx * wm + lx * 0.45, y + alt * 0.55, z - dz * wm + lz * 0.45], mr = [x + dx * wm + lx * 0.45, y + alt * 0.55, z + dz * wm + lz * 0.45];
      const tp = [x + lx, y + alt, z + lz];
      const cm = corT.copy(cBase).lerp(ponta, 0.55).clone();
      for (const [v, cc] of [[bl, cBase], [br, cBase], [mr, cm], [bl, cBase], [mr, cm], [ml, cm], [ml, cm], [mr, cm], [tp, ponta]]) {
        b.p.push(v[0], v[1], v[2]);
        b.c.push(cc.r, cc.g, cc.b);
      }
    }
  }
  const alvoTufos = Math.min(7000, Math.round((limite * 2) ** 2 * def.vegetacao.gramaPena.densidade));
  for (let t = 0, feitos = 0; t < alvoTufos * 2.5 && feitos < alvoTufos; t++) {
    const [x, z] = sortearPonto();
    const manchas = 0.3 + 0.7 * (fbm(x / 28, z / 28, def.semente + 40, 2) * 0.5 + 0.5);
    if (rnd() > manchas || !pode(x, z, { livre: 7, inclinacaoMin: 0.8, queimado: 0.1 })) continue;
    // tufos em grupinhos
    const n = 1 + Math.floor(rnd() * 3);
    for (let k = 0; k < n && feitos < alvoTufos; k++, feitos++) tufo(x + (rnd() - 0.5) * 1.6, z + (rnd() - 0.5) * 1.6);
  }

  // ---- arbusto-chama (laranja) ----
  for (let t = 0, feitos = 0; t < def.vegetacao.arbustoChama.quantidade * 4 && feitos < def.vegetacao.arbustoChama.quantidade; t++) {
    const [x, z] = sortearPonto();
    if (!pode(x, z, { livre: 11 })) continue;
    feitos++;
    const r = 0.5 + rnd() * 0.7;
    const y = grade.alturaEm(x, z);
    const geo = tremer(new THREE.IcosahedronGeometry(1, 1), 0.35, rnd);
    recursos.push({ tipo: 'arbusto', x, y, z, raio: r * 0.95, altura: r * 1.2, balde: balde(x, z), g0: balde(x, z).geos.length, ng: 1 });
    balde(x, z).geos.push(preparar(geo, (vx, vy) => misturarHex(COR.arbusto, COR.arbustoPonta, (vy + 1) / 2 + (rnd() - 0.5) * 0.2),
      matriz(x, y + r * 0.45, z, 0, rnd() * 6, 0, r, r * 0.75, r)));
  }

  // ---- árvore-taça (copa vinho em forma de taça, frutas-lanterna amarelas) ----
  for (let t = 0, feitos = 0; t < def.vegetacao.arvoreTaca.quantidade * 5 && feitos < def.vegetacao.arvoreTaca.quantidade; t++) {
    const [x, z] = sortearPonto();
    if (!pode(x, z, { livre: 22 })) continue;
    feitos++;
    const s = 0.75 + rnd() * 0.6;
    const alt = (3.2 + rnd() * 2.6) * s, raio = (2.1 + rnd() * 1.1) * s;
    const y = grade.alturaEm(x, z);
    const inclX = (rnd() - 0.5) * 0.18, inclZ = (rnd() - 0.5) * 0.18;
    const g = balde(x, z).geos;
    const rec = { tipo: 'arvore', x, y, z, raio: 0.45 * s + 0.3, altura: alt + raio * 0.6, balde: balde(x, z), g0: g.length };
    const tronco = tremer(new THREE.CylinderGeometry(0.2 * s, 0.38 * s, alt, 6, 3), 0.12 * s, rnd);
    g.push(preparar(tronco, (vx, vy) => brilhoHex(COR.tronco, 0.8 + (vy / alt + 0.5) * 0.35), matriz(x, y + alt / 2 - 0.1, z, inclX, 0, inclZ)));
    const topoX = x + Math.sin(inclZ) * -alt * 0.5, topoZ = z + Math.sin(inclX) * alt * 0.5;
    const giro = rnd() * 6;
    const taca = new THREE.CylinderGeometry(raio, raio * 0.22, raio * 0.6, 9, 1);
    g.push(preparar(taca, (vx, vy) => misturarHex(brilhoHex(COR.copa, 0.75), COR.copa, (vy / (raio * 0.6)) + 0.5), matriz(topoX, y + alt + raio * 0.2, topoZ, 0, giro, 0)));
    const cupula = tremer(new THREE.IcosahedronGeometry(raio * 1.02, 1), 0.25 * s, rnd);
    g.push(preparar(cupula, (vx, vy) => misturarHex(COR.copa, COR.copaClara, (vy / raio) * 0.9 + 0.3), matriz(topoX, y + alt + raio * 0.5, topoZ, 0, giro, 0, 1, 0.34, 1)));
    for (let f = 0, nf = Math.floor(rnd() * 4); f < nf; f++) {
      const a = rnd() * Math.PI * 2, d = raio * (0.4 + rnd() * 0.45);
      g.push(preparar(new THREE.IcosahedronGeometry(0.17 * s, 0), COR.fruta, matriz(topoX + Math.cos(a) * d, y + alt + raio * 0.05 - 0.2, topoZ + Math.sin(a) * d)));
    }
    rec.ng = g.length - rec.g0;
    rec.colisor = { tipo: 'cilindro', x, z, r: 0.42 * s, base: y - 2, topo: y + alt + raio * 0.4 };
    colisoes.adicionar(rec.colisor);
    recursos.push(rec);
  }

  // ---- pedras (algumas grandes, com cristais em volta) ----
  const { quantidade: qtdPedras, grandes } = def.vegetacao.pedras;
  for (let t = 0, feitos = 0; t < qtdPedras * 5 && feitos < qtdPedras; t++) {
    const [x, z] = sortearPonto();
    const grande = feitos < grandes;
    if (!pode(x, z, { livre: grande ? 16 : 10, inclinacaoMin: grande ? 0.6 : 0.75, queimado: 0.6 })) continue;
    feitos++;
    const r = grande ? 1.6 + rnd() * 2.2 : 0.25 + rnd() * 0.7;
    const y = grade.alturaEm(x, z);
    const geo = tremer(new THREE.IcosahedronGeometry(1, grande ? 1 : 0), grande ? 0.32 : 0.45, rnd);
    const tom = rnd();
    const rec = { tipo: grande || r > 1.1 ? 'pedraGrande' : 'pedra', x, y, z, raio: r * 1.05, altura: r * 0.95, balde: balde(x, z), g0: balde(x, z).geos.length, ng: 1 };
    recursos.push(rec);
    balde(x, z).geos.push(preparar(geo, (vx, vy) => misturarHex(brilhoHex(COR.pedra, 0.78), misturarHex(COR.pedra, COR.pedraClara, tom), (vy + 1) / 2 + 0.15),
      matriz(x, y + r * 0.3, z, rnd() * 0.4, rnd() * 6, rnd() * 0.4, r * (1 + rnd() * 0.3), r * (0.55 + rnd() * 0.35), r)));
    if (r > 0.75) { rec.colisor = { tipo: 'cilindro', x, z, r: r * 0.85, base: y - 2, topo: y + r * 0.9 }; colisoes.adicionar(rec.colisor); }
    if (grande && cristais.length < def.vegetacao.cristais.quantidade && rnd() < 0.6) {
      const a = rnd() * Math.PI * 2;
      cristais.push([x + Math.cos(a) * (r + 0.4), z + Math.sin(a) * (r + 0.4)]);
    }
  }
  // cristais soltos que faltaram
  for (let t = 0; t < 400 && cristais.length < def.vegetacao.cristais.quantidade; t++) {
    const [x, z] = sortearPonto();
    if (pode(x, z, { livre: 14, inclinacaoMin: 0.7 })) cristais.push([x, z]);
  }

  // ---- monta as malhas: uma por pedaço (plantas + pedras) e uma para os cristais (brilham) ----
  const grupo = new THREE.Group();
  grupo.name = 'vegetacao';
  const malhas = [];
  for (const [k, b] of baldes) {
    const lista = [...b.geos];
    if (b.tufos.p.length) {
      const g = new THREE.BufferGeometry();
      const n = b.tufos.p.length / 3;
      const normais = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) normais[i * 3 + 1] = 1; // luz por igual nas penas
      g.setAttribute('position', new THREE.Float32BufferAttribute(b.tufos.p, 3));
      g.setAttribute('normal', new THREE.BufferAttribute(normais, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
      g.setAttribute('color', new THREE.Float32BufferAttribute(b.tufos.c, 3));
      lista.push(g);
    }
    if (!lista.length) continue;
    const mesh = new THREE.Mesh(mesclar(lista));
    mesh.matrixAutoUpdate = false;
    // início (em vértices) de cada peça dentro da malha juntada
    const inicios = [];
    let soma = 0;
    for (const g of lista) { inicios.push(soma); soma += g.attributes.position.count; }
    b.mesh = mesh;
    b.inicios = inicios;
    b.contagens = lista.map((g) => g.attributes.position.count);
    const bs = mesh.geometry.boundingSphere;
    malhas.push({ mesh, x: bs.center.x, z: bs.center.z, raio: bs.radius, chave: k });
    grupo.add(mesh);
  }

  const geosCristal = [];
  const recCristais = [];
  for (const [x, z] of cristais) {
    const y = grade.alturaEm(x, z);
    const n = 3 + Math.floor(rnd() * 3);
    recCristais.push({ tipo: 'cristal', x, y, z, raio: 0.55, altura: 0.9, g0: geosCristal.length, ng: n });
    for (let k = 0; k < n; k++) {
      const s = 0.6 + rnd() * 0.7;
      geosCristal.push(preparar(new THREE.OctahedronGeometry(0.16, 0), (vx, vy) => misturarHex(0x1d8fb0, COR.cristal, vy / 0.16 * 0.5 + 0.6),
        matriz(x + (rnd() - 0.5) * 0.6, y + 0.25 * s, z + (rnd() - 0.5) * 0.6, (rnd() - 0.5) * 0.8, rnd() * 6, (rnd() - 0.5) * 0.8, s, s * 3, s)));
    }
  }
  const malhaCristais = geosCristal.length ? new THREE.Mesh(mesclar(geosCristal), new THREE.MeshBasicMaterial({ vertexColors: true })) : null;
  if (malhaCristais) { malhaCristais.matrixAutoUpdate = false; grupo.add(malhaCristais); }

  // Cada recurso guarda em que malha está e quais vértices são dele (para tremer, sumir e crescer de novo).
  for (const r of recursos) {
    const b = r.balde;
    r.mesh = b.mesh;
    r.inicio = b.inicios[r.g0];
    r.contagem = b.inicios[r.g0 + r.ng - 1] + b.contagens[r.g0 + r.ng - 1] - r.inicio;
    delete r.balde;
  }
  if (malhaCristais) {
    const inicios = [];
    let soma = 0;
    for (const g of geosCristal) { inicios.push(soma); soma += g.attributes.position.count; }
    for (const r of recCristais) {
      r.mesh = malhaCristais;
      r.inicio = inicios[r.g0];
      r.contagem = inicios[r.g0 + r.ng - 1] + geosCristal[r.g0 + r.ng - 1].attributes.position.count - r.inicio;
      recursos.push(r);
    }
  }
  recursos.forEach((r, i) => { r.id = i; });

  return { grupo, malhas, malhaCristais, recursos };
}
