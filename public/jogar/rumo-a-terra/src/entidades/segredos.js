// Segredos de Lúmen (pedido do dono, 20/11/2026: "mais segredos, tipo um vulcão"). Não são obrigatórios.
// Dados em src/dados/locais.js (SEGREDOS). Ficam escondidos: sem facho de luz e sem estrela na bússola;
// só aparecem (brilhando de leve) quando você chega perto. Tipos:
//  gravador   — um gravador do Tavares no chão: "Ouvir o gravador"
//  tesouro    — um tesouro que dá um item especial: "Pegar"
//  telescopio — o telescópio do Observatório: abre o minijogo das estrelas do Cruzeiro do Sul
//  monolitos  — tocar nos três monólitos (cada um acende uma coluna de luz); com os três, o segredo se abre
// O mundo dá a volta: cada coisa é desenhada na cópia mais perto da câmera.
import * as THREE from 'three';
import { SEGREDOS, LOCAIS } from '../dados/locais.js';
import { preparar, mesclar, matriz, misturarHex } from '../desenho/geometria.js';
import { texturaParticula } from '../desenho/texturas.js';
import { embrulhar, maisPerto } from '../logica/toro.js';

const VISTO_DE = 26; // metros: mais longe que isso, o segredo nem aparece

function modelo(tipo) {
  if (tipo === 'gravador') {
    return mesclar([
      preparar(new THREE.BoxGeometry(0.34, 0.12, 0.22), 0x2a2d35, matriz(0, 0, 0)),
      preparar(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 10), 0x8a9098, matriz(-0.08, 0.07, 0)),
      preparar(new THREE.CylinderGeometry(0.05, 0.05, 0.02, 10), 0x8a9098, matriz(0.08, 0.07, 0)),
      preparar(new THREE.BoxGeometry(0.04, 0.04, 0.04), 0xff3030, matriz(0.14, 0.07, 0.08)),
      preparar(new THREE.BoxGeometry(0.35, 0.04, 0.23), 0xff9a40, matriz(0, -0.03, 0)),
    ]);
  }
  if (tipo === 'tesouro') {
    return mesclar([
      preparar(new THREE.OctahedronGeometry(0.28, 0), (x, y) => misturarHex(0xff3a10, 0xffe060, y + 0.5), matriz(0, 0, 0, 0, 0, 0, 1, 1.3, 1)),
      preparar(new THREE.OctahedronGeometry(0.16, 0), 0xfff0a0, matriz(0, 0, 0)),
    ]);
  }
  if (tipo === 'telescopio') {
    return mesclar([
      preparar(new THREE.CylinderGeometry(0.1, 0.14, 0.9, 10), 0xdfe2e8, matriz(0, 0.6, 0, -0.7, 0, 0)),
      preparar(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5), 0x5a606c, matriz(0.18, 0.1, 0, 0, 0, 0.2)),
      preparar(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5), 0x5a606c, matriz(-0.18, 0.1, 0, 0, 0, -0.2)),
      preparar(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 5), 0x5a606c, matriz(0, 0.1, 0.18, -0.2, 0, 0)),
    ]);
  }
  return mesclar([preparar(new THREE.IcosahedronGeometry(0.25, 0), 0x9ff8ff, matriz(0, 0, 0))]);
}

export function criarSegredos({ cena, grade }) {
  const T = grade.tamanho;
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x222222 });
  const matBrilho = new THREE.SpriteMaterial({ map: texturaParticula(), color: 0xfff2b0, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false });
  const matColuna = new THREE.MeshBasicMaterial({ color: 0x5ff0ff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const geoColuna = new THREE.CylinderGeometry(0.5, 0.5, 40, 8, 1, true).translate(0, 20, 0);
  const achados = new Set(); // ids de segredos achados (e "toques" dos monólitos: "monolito1"...)
  const pontos = []; // coisas para tocar no mundo
  let relogio = 0;

  // Monta os pontos (um por segredo; os monólitos têm três).
  for (const s of SEGREDOS) {
    const lugares = s.tipo === 'monolitos'
      ? s.toques.map((id) => ({ id, x: LOCAIS[id].x + 2.4, z: LOCAIS[id].z + 2.4, toque: true, monolito: LOCAIS[id] }))
      : [{ id: s.id, x: s.x, z: s.z }];
    for (const l of lugares) {
      const y = grade.alturaEm(l.x, l.z);
      const grupo = new THREE.Group();
      let corpo = null;
      if (!l.toque) {
        corpo = new THREE.Mesh(modelo(s.tipo), mat);
        corpo.position.y = s.tipo === 'telescopio' ? 0 : 0.35;
        grupo.add(corpo);
      }
      const brilho = new THREE.Sprite(matBrilho);
      brilho.position.y = l.toque ? 1.2 : 0.5;
      brilho.scale.setScalar(l.toque ? 1.6 : 1.1);
      grupo.add(brilho);
      grupo.position.set(l.x, y, l.z);
      grupo.visible = false;
      cena.add(grupo);
      // coluna de luz que aparece em cima do monólito quando ele é tocado
      let coluna = null;
      if (l.monolito) {
        coluna = new THREE.Mesh(geoColuna, matColuna);
        coluna.position.set(l.monolito.x, grade.alturaEm(l.monolito.x, l.monolito.z), l.monolito.z);
        coluna.visible = false;
        cena.add(coluna);
      }
      pontos.push({ ...l, y, segredo: s, grupo, corpo, brilho, coluna, fase: pontos.length });
    }
  }

  const feito = (p) => achados.has(p.id) || achados.has(p.segredo.id);

  // O ponto de segredo mais perto (até "alcance" metros) que ainda não foi achado, ou null.
  function perto(pos, alcance = 2.8) {
    let melhor = null, dm = alcance;
    for (const p of pontos) {
      if (feito(p)) continue;
      const d = Math.hypot(embrulhar(p.x - pos.x, T), embrulhar(p.z - pos.z, T));
      if (d < dm && Math.abs(p.y - pos.y) < 3.5) { dm = d; melhor = p; }
    }
    return melhor;
  }

  // Marca um ponto como achado. Devolve o segredo inteiro quando ele se completa (ou null).
  function marcar(p) {
    achados.add(p.id);
    if (p.segredo.tipo !== 'monolitos') return p.segredo;
    if (p.segredo.toques.every((id) => achados.has(id))) { achados.add(p.segredo.id); return p.segredo; }
    return null;
  }

  function atualizar(dt) {
    relogio += dt;
    for (const p of pontos) {
      if (p.corpo) { p.corpo.rotation.y = relogio * 0.8 + p.fase; if (p.segredo.tipo === 'tesouro') p.corpo.position.y = 0.45 + Math.sin(relogio * 2 + p.fase) * 0.1; }
      p.brilho.material.opacity = 0.45 + Math.sin(relogio * 3 + p.fase) * 0.25;
    }
  }

  function acompanhar(cam) {
    for (const p of pontos) {
      const x = maisPerto(p.x, cam.x, T), z = maisPerto(p.z, cam.z, T);
      p.grupo.position.x = x; p.grupo.position.z = z;
      p.grupo.visible = !feito(p) && Math.hypot(x - cam.x, z - cam.z) < VISTO_DE;
      if (p.coluna) {
        p.coluna.visible = achados.has(p.id);
        if (p.coluna.visible) { p.coluna.position.x = maisPerto(p.monolito.x, cam.x, T); p.coluna.position.z = maisPerto(p.monolito.z, cam.z, T); }
      }
    }
  }

  const contam = SEGREDOS.map((s) => s.id);
  return {
    pontos, perto, marcar, atualizar, acompanhar,
    get total() { return contam.length; },
    get quantos() { return contam.filter((id) => achados.has(id)).length; },
    achou: (id) => achados.has(id),
    lista: () => [...achados],
    carregar(ids) { achados.clear(); for (const id of ids || []) achados.add(id); },
    limpar() { achados.clear(); },
  };
}
