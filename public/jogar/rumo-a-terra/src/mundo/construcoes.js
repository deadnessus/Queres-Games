// Construções do jogador: blocos (madeira, pedra, cristal) numa grade de 1 metro e fogueiras.
// Os blocos encaixam lado a lado e em cima uns dos outros, dá para subir neles e fazer ponte no lago.
// Cada tipo de bloco é UMA malha "instanciada" (um só desenho para centenas de blocos).
import * as THREE from 'three';
import { texturaBloco } from '../desenho/texturas.js';
import { preparar, mesclar, matriz } from '../desenho/geometria.js';
import { TIPOS_BLOCO } from '../logica/save.js';

const MAX_BLOCOS_TIPO = 1000;
const ALCANCE_COLOCAR = 5;
const RAIO_JOGADOR = 0.4, ALTURA_JOGADOR = 1.75;

export function criarConstrucoes({ cena, grade, colisoes, chamas, luz, som }) {
  const limite = grade.tamanho / 2 - 14;
  const geoBloco = new THREE.BoxGeometry(1, 1, 1);
  const malhas = {};
  for (const tipo of TIPOS_BLOCO) {
    const mapa = texturaBloco(tipo);
    const mat = tipo === 'cristal' ? new THREE.MeshBasicMaterial({ map: mapa }) : new THREE.MeshLambertMaterial({ map: mapa });
    const m = new THREE.InstancedMesh(geoBloco, mat, MAX_BLOCOS_TIPO);
    m.count = 0;
    m.frustumCulled = false;
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    cena.add(m);
    malhas[tipo] = { mesh: m, blocos: [] };
  }
  const blocos = []; // { tipo, i, j, base, colisor }
  const fogueiras = []; // { x, y, z, grupo, colisor, relogio }
  const m4 = new THREE.Matrix4();

  // ---- blocos ----
  function reescreverTipo(tipo) {
    const { mesh, blocos: lista } = malhas[tipo];
    lista.forEach((b, k) => { m4.makeTranslation(b.i + 0.5, b.base + 0.5, b.j + 0.5); mesh.setMatrixAt(k, m4); });
    mesh.count = lista.length;
    mesh.instanceMatrix.needsUpdate = true;
  }

  function adicionarBloco(tipo, i, j, base) {
    if (malhas[tipo].blocos.length >= MAX_BLOCOS_TIPO) return null;
    const b = { tipo, i, j, base };
    b.colisor = { tipo: 'caixa', x: i + 0.5, z: j + 0.5, meioX: 0.5, meioZ: 0.5, giro: 0, base, topo: base + 1, pisavel: true };
    colisoes.adicionar(b.colisor);
    blocos.push(b);
    malhas[tipo].blocos.push(b);
    reescreverTipo(tipo);
    return b;
  }

  function removerBloco(b) {
    colisoes.remover(b.colisor);
    blocos.splice(blocos.indexOf(b), 1);
    const l = malhas[b.tipo].blocos;
    l.splice(l.indexOf(b), 1);
    reescreverTipo(b.tipo);
  }

  // Raio contra as caixas dos blocos (teste das "lajes"). Devolve { bloco, t, normal } do mais perto.
  function raioBlocos(origem, dir, alcance) {
    let melhor = null;
    for (const b of blocos) {
      const cx = b.i + 0.5, cz = b.j + 0.5;
      if (Math.abs(cx - origem.x) > alcance + 1 || Math.abs(cz - origem.z) > alcance + 1) continue;
      const min = [b.i, b.base, b.j], max = [b.i + 1, b.base + 1, b.j + 1];
      const o = [origem.x, origem.y, origem.z], d = [dir.x, dir.y, dir.z];
      let tEntra = -Infinity, tSai = Infinity, eixo = -1, sinal = 0;
      let ok = true;
      for (let k = 0; k < 3; k++) {
        if (Math.abs(d[k]) < 1e-9) { if (o[k] < min[k] || o[k] > max[k]) { ok = false; break; } continue; }
        let t1 = (min[k] - o[k]) / d[k], t2 = (max[k] - o[k]) / d[k];
        let s = -1;
        if (t1 > t2) { [t1, t2] = [t2, t1]; s = 1; }
        if (t1 > tEntra) { tEntra = t1; eixo = k; sinal = d[k] > 0 ? -1 : 1; }
        tSai = Math.min(tSai, t2);
        if (tEntra > tSai) { ok = false; break; }
        void s;
      }
      if (!ok || tEntra < 0 || tEntra > alcance) continue;
      if (!melhor || tEntra < melhor.t) {
        const normal = { x: 0, y: 0, z: 0 };
        normal[['x', 'y', 'z'][eixo]] = sinal;
        melhor = { bloco: b, t: tEntra, normal };
      }
    }
    return melhor;
  }

  function distanciaAteChao(origem, dir, alcance) {
    for (let d = 0.2; d <= alcance; d += 0.05) {
      if (origem.y + dir.y * d <= grade.alturaEm(origem.x + dir.x * d, origem.z + dir.z * d)) return d;
    }
    return null;
  }

  function celulaLivre(i, j, base) {
    return !blocos.some((b) => b.i === i && b.j === j && Math.abs(b.base - base) < 0.99);
  }

  // Onde um bloco iria (mirando). { i, j, base, valido }
  function alvoBloco(origem, dir, posJogador) {
    const hb = raioBlocos(origem, dir, ALCANCE_COLOCAR);
    const dc = distanciaAteChao(origem, dir, ALCANCE_COLOCAR);
    let alvo = null;
    if (hb && (dc === null || hb.t <= dc + 0.01)) {
      const { bloco: b, normal: n } = hb;
      if (n.y === 1) alvo = { i: b.i, j: b.j, base: b.base + 1 };
      else if (n.y === -1) alvo = { i: b.i, j: b.j, base: b.base - 1 };
      else alvo = { i: b.i + n.x, j: b.j + n.z, base: b.base };
    } else if (dc !== null) {
      const x = origem.x + dir.x * dc, z = origem.z + dir.z * dc;
      const i = Math.floor(x), j = Math.floor(z);
      alvo = { i, j, base: Math.round((grade.alturaEm(i + 0.5, j + 0.5) - 0.08) * 100) / 100 };
    }
    if (!alvo) return null;
    alvo.valido = validarBloco(alvo, posJogador);
    return alvo;
  }

  function validarBloco({ i, j, base }, p) {
    if (Math.abs(i + 0.5) > limite || Math.abs(j + 0.5) > limite) return false;
    if (!celulaLivre(i, j, base)) return false;
    const chao = grade.alturaEm(i + 0.5, j + 0.5);
    if (base < chao - 1.2 || base > chao + 40) return false;
    // não em cima do jogador
    const px = Math.max(i, Math.min(i + 1, p.x)), pz = Math.max(j, Math.min(j + 1, p.z));
    if (Math.hypot(p.x - px, p.z - pz) < RAIO_JOGADOR && p.y < base + 1 && p.y + ALTURA_JOGADOR > base) return false;
    // não dentro da nave, de árvores ou pedras
    for (const [dx, dz] of [[0.5, 0.5], [0.15, 0.15], [0.85, 0.15], [0.15, 0.85], [0.85, 0.85]]) {
      for (const dy of [0.2, 0.8]) if (dentroDeObstaculo(i + dx, base + dy, j + dz)) return false;
    }
    return true;
  }

  // Obstáculo que não seja bloco (os blocos já foram conferidos pela grade).
  function dentroDeObstaculo(x, y, z) {
    for (const c of colisoes.perto(x, z, 1)) {
      if (c.pisavel || y < c.base || y > c.topo) continue;
      if (c.tipo === 'cilindro') { if (Math.hypot(x - c.x, z - c.z) < c.r) return true; }
      else {
        const dx = x - c.x, dz = z - c.z;
        if (Math.abs(dx * c.cos - dz * c.sin) < c.meioX && Math.abs(dx * c.sin + dz * c.cos) < c.meioZ) return true;
      }
    }
    return false;
  }

  // ---- fogueiras ----
  const geoFogueira = mesclar([
    ...Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI * 2;
      return preparar(new THREE.IcosahedronGeometry(0.13, 0), k % 2 ? 0x6d6880 : 0x8f89a3, matriz(Math.cos(a) * 0.42, 0.06, Math.sin(a) * 0.42, a, a * 2, 0, 1, 0.7, 1));
    }),
    ...[0, 1, 2, 3].map((k) => preparar(new THREE.CylinderGeometry(0.05, 0.06, 0.75, 5), (x, y) => (y > 0.25 ? 0x2a1d16 : 0x6b4a32),
      matriz(Math.cos(k * 1.57) * 0.12, 0.26, Math.sin(k * 1.57) * 0.12, Math.sin(k * 1.57) * 0.5, 0, -Math.cos(k * 1.57) * 0.5))),
    preparar(new THREE.CircleGeometry(0.36, 10), 0x1d1512, matriz(0, 0.02, 0, -Math.PI / 2, 0, 0)),
  ]);
  const matFogueira = new THREE.MeshLambertMaterial({ vertexColors: true });

  function adicionarFogueira(x, z) {
    const y = grade.alturaEm(x, z);
    const grupo = new THREE.Mesh(geoFogueira, matFogueira);
    grupo.position.set(x, y, z);
    cena.add(grupo);
    const f = { x, y, z, grupo, relogio: 0 };
    f.colisor = { tipo: 'cilindro', x, z, r: 0.5, base: y - 1, topo: y + 0.45 };
    colisoes.adicionar(f.colisor);
    fogueiras.push(f);
    return f;
  }
  function removerFogueira(f) {
    cena.remove(f.grupo);
    colisoes.remover(f.colisor);
    fogueiras.splice(fogueiras.indexOf(f), 1);
  }

  function alvoFogueira(origem, dir, p) {
    let d = distanciaAteChao(origem, dir, 4);
    let x, z;
    if (d !== null) { x = origem.x + dir.x * d; z = origem.z + dir.z * d; }
    else { const m = Math.hypot(dir.x, dir.z) || 1; x = p.x + (dir.x / m) * 1.8; z = p.z + (dir.z / m) * 1.8; }
    const y = grade.alturaEm(x, z);
    let valido = Math.abs(x) < limite && Math.abs(z) < limite && y > grade.nivelAgua + 0.15 && grade.normalEm(x, z)[1] > 0.8;
    valido = valido && Math.hypot(x - p.x, z - p.z) > 0.95 && celulaLivre(Math.floor(x), Math.floor(z), y - 0.08);
    for (const [dx, dz] of [[0, 0], [0.5, 0], [-0.5, 0], [0, 0.5], [0, -0.5]]) if (valido && dentroDeObstaculo(x + dx, y + 0.2, z + dz)) valido = false;
    if (valido && fogueiras.some((f) => Math.hypot(f.x - x, f.z - z) < 1.3)) valido = false;
    return { x, y, z, valido };
  }

  // ---- fantasma (prévia de onde vai ficar) ----
  const matFantasma = new THREE.MeshBasicMaterial({ color: 0x5ff0a0, transparent: true, opacity: 0.35, depthWrite: false });
  const fantasmaBloco = new THREE.Mesh(new THREE.BoxGeometry(1.02, 1.02, 1.02), matFantasma);
  fantasmaBloco.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.02, 1.02, 1.02)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })));
  const fantasmaFogueira = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.5, 12, 1, true), matFantasma);
  fantasmaBloco.visible = fantasmaFogueira.visible = false;
  fantasmaBloco.renderOrder = fantasmaFogueira.renderOrder = 5;
  cena.add(fantasmaBloco, fantasmaFogueira);

  function mostrarFantasma(tipo, alvo) {
    fantasmaBloco.visible = !!alvo && tipo === 'bloco';
    fantasmaFogueira.visible = !!alvo && tipo === 'fogueira';
    if (!alvo) return;
    matFantasma.color.setHex(alvo.valido ? 0x5ff0a0 : 0xff5a4a);
    if (tipo === 'bloco') fantasmaBloco.position.set(alvo.i + 0.5, alvo.base + 0.5, alvo.j + 0.5);
    else fantasmaFogueira.position.set(alvo.x, alvo.y + 0.25, alvo.z);
  }

  // ---- mirar no que já foi construído (para desmontar) ----
  function mirar(origem, dir, alcance) {
    const hb = raioBlocos(origem, dir, alcance);
    let melhor = hb ? { tipo: 'bloco', obj: hb.bloco, distancia: hb.t, ponto: { x: origem.x + dir.x * hb.t, y: origem.y + dir.y * hb.t, z: origem.z + dir.z * hb.t } } : null;
    for (const f of fogueiras) {
      for (let d = 0.2; d <= alcance; d += 0.1) {
        const x = origem.x + dir.x * d, y = origem.y + dir.y * d, z = origem.z + dir.z * d;
        if (y > f.y - 0.1 && y < f.y + 0.6 && Math.hypot(x - f.x, z - f.z) < 0.55) {
          if (!melhor || d < melhor.distancia) melhor = { tipo: 'fogueira', obj: f, distancia: d, ponto: { x, y, z } };
          break;
        }
      }
    }
    return melhor;
  }

  // ---- fogo e luz ----
  let relogioLuz = 0;
  let fogueiraDaLuz = null;
  function atualizar(dt, posJogador) {
    for (const f of fogueiras) {
      if (Math.hypot(f.x - posJogador.x, f.z - posJogador.z) > 70) continue;
      f.relogio += dt;
      while (f.relogio > 0.07) {
        f.relogio -= 0.07;
        const quente = Math.random();
        chamas.soltar({
          x: f.x + (Math.random() - 0.5) * 0.3, y: f.y + 0.2, z: f.z + (Math.random() - 0.5) * 0.3,
          vx: (Math.random() - 0.5) * 0.3, vy: 1.1 + Math.random() * 0.8, vz: (Math.random() - 0.5) * 0.3,
          vida: 0.55 + Math.random() * 0.35, tamanho: 0.5 + Math.random() * 0.3, cresce: -0.5,
          cor: quente > 0.6 ? 0xffd27a : quente > 0.2 ? 0xff8a2a : 0xff4a1a, alfa: 0.9,
        });
      }
    }
    // a luz fica na fogueira mais perto do jogador
    relogioLuz -= dt;
    if (relogioLuz <= 0) {
      relogioLuz = 0.5;
      fogueiraDaLuz = null;
      let melhor = 30;
      for (const f of fogueiras) { const d = Math.hypot(f.x - posJogador.x, f.z - posJogador.z); if (d < melhor) { melhor = d; fogueiraDaLuz = f; } }
    }
    if (fogueiraDaLuz) {
      luz.position.set(fogueiraDaLuz.x, fogueiraDaLuz.y + 0.9, fogueiraDaLuz.z);
      luz.intensity = 22 + Math.sin(performance.now() / 70) * 3 + Math.random() * 3;
    } else luz.intensity = 0;
  }

  return {
    alvoColocacao(tipoColocacao, origem, dir, posJogador) {
      return tipoColocacao === 'fogueira' ? alvoFogueira(origem, dir, posJogador) : alvoBloco(origem, dir, posJogador);
    },
    colocar(tipoColocacao, bloco, alvo) {
      if (!alvo || !alvo.valido) return false;
      if (tipoColocacao === 'fogueira') adicionarFogueira(alvo.x, alvo.z);
      else if (!adicionarBloco(bloco, alvo.i, alvo.j, alvo.base)) return false;
      if (som) som.colocar();
      return true;
    },
    // Desmonta o que está na mira. Devolve o id do item que volta para a mochila.
    desmontar(alvo) {
      if (alvo.tipo === 'bloco') { removerBloco(alvo.obj); return 'bloco_' + alvo.obj.tipo; }
      removerFogueira(alvo.obj);
      return 'fogueira';
    },
    mirar, mostrarFantasma, atualizar,
    serializar() {
      return {
        blocos: blocos.map((b) => [b.tipo, b.i, b.j, Math.round(b.base * 100)]),
        fogueiras: fogueiras.map((f) => [Math.round(f.x * 100), Math.round(f.z * 100)]),
      };
    },
    carregar(save) {
      for (const [tipo, i, j, base] of save.blocos || []) adicionarBloco(tipo, i, j, base / 100);
      for (const [x, z] of save.fogueiras || []) adicionarFogueira(x / 100, z / 100);
    },
    get total() { return blocos.length + fogueiras.length; },
  };
}
