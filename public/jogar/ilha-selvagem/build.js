import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { WALL_H } from './shared/pieces.js';

// ---------- texturas desenhadas por código ----------
function canvasTex(draw, size = 128) {
  const c = document.createElement('canvas'); c.width = c.height = size; const x = c.getContext('2d'); draw(x, size);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
}
const rnd = (a, b) => a + Math.random() * (b - a);
const TEX = {
  madeira: () => canvasTex((x, s) => {
    x.fillStyle = '#9a6b3a'; x.fillRect(0, 0, s, s);
    for (let i = 0; i < 4; i++) { const y = i * s / 4; x.fillStyle = `hsl(28,45%,${rnd(36, 46)}%)`; x.fillRect(0, y + 1, s, s / 4 - 2); x.strokeStyle = 'rgba(60,30,10,.35)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(0, y + rnd(3, s / 4 - 3)); x.bezierCurveTo(s / 3, y + rnd(2, s / 4), s * 2 / 3, y + rnd(2, s / 4), s, y + rnd(3, s / 4 - 3)); x.stroke(); } }
    x.fillStyle = 'rgba(40,20,5,.6)'; for (let i = 0; i < 4; i++) x.fillRect(0, i * s / 4, s, 2);
  }),
  pedra: () => canvasTex((x, s) => {
    x.fillStyle = '#8d8d8d'; x.fillRect(0, 0, s, s);
    const rows = 4;
    for (let r = 0; r < rows; r++) { const h = s / rows, off = (r % 2) * s / 4; for (let c = -1; c < 3; c++) { x.fillStyle = `hsl(0,0%,${rnd(48, 62)}%)`; x.beginPath(); x.roundRect(c * s / 2 + off + 2, r * h + 2, s / 2 - 4, h - 4, 6); x.fill(); } }
  }),
  palha: () => canvasTex((x, s) => {
    x.fillStyle = '#d6b45a'; x.fillRect(0, 0, s, s);
    for (let i = 0; i < 160; i++) { x.strokeStyle = `hsl(${rnd(38, 48)},60%,${rnd(40, 66)}%)`; x.lineWidth = rnd(1, 2.5); const px = rnd(0, s), py = rnd(0, s); x.beginPath(); x.moveTo(px, py); x.lineTo(px + rnd(-6, 6), py + rnd(14, 32)); x.stroke(); }
  }),
};
TEX.telha = () => canvasTex((x, s) => {
  x.fillStyle = '#b5532f'; x.fillRect(0, 0, s, s);
  for (let r = 0; r < 4; r++) for (let c = -1; c < 4; c++) { x.fillStyle = `hsl(${rnd(10, 18)},55%,${rnd(36, 48)}%)`; x.beginPath(); x.arc(c * s / 3 + (r % 2) * s / 6 + s / 6, r * s / 4, s / 6, 0, Math.PI); x.fill(); x.fillRect(c * s / 3 + (r % 2) * s / 6, r * s / 4 - 2, s / 3, 3); }
});
const MATERIALS = {};
export function pieceMat(m) {
  if (!MATERIALS[m]) {
    const t = TEX[m]();
    MATERIALS[m] = new THREE.MeshStandardMaterial({ map: t, roughness: m === 'pedra' ? 0.95 : 0.85, metalness: 0 });
  }
  return MATERIALS[m];
}
const solid = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.8, ...o });
const M = { cloth: solid(0xc23b3b), cloth2: solid(0xf0e6d2), glass: solid(0x9fd8ff, { transparent: true, opacity: 0.35, roughness: 0.1 }), iron: solid(0x3a3a3a, { metalness: 0.4 }), stone: solid(0x777777), ember: solid(0x2a1a10), flame: new THREE.MeshBasicMaterial({ color: 0xffa530, transparent: true, opacity: 0.9 }), flame2: new THREE.MeshBasicMaterial({ color: 0xffe27a, transparent: true, opacity: 0.95 }) };
export const ghostMat = new THREE.MeshBasicMaterial({ color: 0x44ff88, transparent: true, opacity: 0.45, depthWrite: false });

// UV por posição no mundo: a textura mantém o mesmo tamanho em qualquer peça
function worldUV(g, k = 0.5) {
  const p = g.attributes.position, n = g.attributes.normal, uv = new Float32Array(p.count * 2);
  for (let i = 0; i < p.count; i++) {
    const ax = Math.abs(n.getX(i)), ay = Math.abs(n.getY(i)), az = Math.abs(n.getZ(i));
    let u, v;
    if (ay >= ax && ay >= az) { u = p.getX(i); v = p.getZ(i); } else if (ax >= az) { u = p.getZ(i); v = p.getY(i); } else { u = p.getX(i); v = p.getY(i); }
    uv[i * 2] = u * k; uv[i * 2 + 1] = v * k;
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); return g;
}
const RB = (w, h, d, r = 0.05) => new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2 - 0.001, h / 2 - 0.001, d / 2 - 0.001));
function put(group, geo, material, x = 0, y = 0, z = 0, o = {}) {
  worldUV(geo); const m = new THREE.Mesh(geo, material); m.position.set(x, y, z); if (o.rx) m.rotation.x = o.rx; if (o.ry) m.rotation.y = o.ry; if (o.rz) m.rotation.z = o.rz;
  m.castShadow = o.noShadow ? false : true; m.receiveShadow = true; group.add(m); return m;
}
function wallShape(holes) {
  const s = new THREE.Shape(); s.moveTo(-2, 0); s.lineTo(2, 0); s.lineTo(2, WALL_H); s.lineTo(-2, WALL_H); s.lineTo(-2, 0);
  for (const h of holes) s.holes.push(h);
  return s;
}
function holeRect(x0, y0, x1, y1) { const p = new THREE.Path(); p.moveTo(x0, y0); p.lineTo(x0, y1); p.lineTo(x1, y1); p.lineTo(x1, y0); p.lineTo(x0, y0); return p; }
function holeArch(r, cy) { const p = new THREE.Path(); p.moveTo(-r, 0); p.lineTo(-r, cy); p.absarc(0, cy, r, Math.PI, 0, true); p.lineTo(r, 0); p.lineTo(-r, 0); return p; }
function extruded(shape, depth = 0.3, curve = 16) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: curve }); g.translate(0, 0, -depth / 2); return g;
}
const fireSprites = [];
let flameTex = null;
function flame(group, y, size) {
  if (!flameTex) flameTex = canvasTex((x, s) => { const g = x.createRadialGradient(s / 2, s / 2, 2, s / 2, s / 2, s / 2); g.addColorStop(0, 'rgba(255,240,170,1)'); g.addColorStop(0.35, 'rgba(255,150,40,.8)'); g.addColorStop(1, 'rgba(255,80,0,0)'); x.fillStyle = g; x.fillRect(0, 0, s, s); }, 64);
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: flameTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  sp.position.set(0, y, 0); sp.scale.setScalar(size); group.add(sp);
  const c1 = new THREE.Mesh(new THREE.ConeGeometry(size * 0.2, size * 0.6, 6), M.flame); c1.position.set(0, y, 0); group.add(c1);
  const c2 = new THREE.Mesh(new THREE.ConeGeometry(size * 0.11, size * 0.4, 6), M.flame2); c2.position.set(0, y - 0.02, 0); group.add(c2);
  const f = { sp, c1, c2, base: size, y, group, ph: Math.random() * 10 };
  group.userData.fire = f; fireSprites.push(f); return f;
}
export function updateFires(t) {
  for (let i = fireSprites.length - 1; i >= 0; i--) {
    const f = fireSprites[i];
    if (!f.group.parent) { fireSprites.splice(i, 1); continue; }
    const k = 1 + Math.sin(t * 13 + f.ph) * 0.12 + Math.sin(t * 7.3 + f.ph * 2) * 0.1;
    f.sp.scale.setScalar(f.base * 2.2 * k); f.c1.scale.set(1, k * 1.2, 1); f.c2.scale.set(1, 1.3 - k * 0.3, 1); f.c1.rotation.y = t * 3; f.sp.material.opacity = 0.75 + Math.sin(t * 17 + f.ph) * 0.2;
  }
}

// cria a malha de uma peça. local: x = largura, z = profundidade, y = para cima (base em y=0; pisos têm a face de cima em y=0)
export function makePieceMesh(k, matName, o = {}) {
  const g = new THREE.Group(); const mt = pieceMat(matName); const sk = o.skirt || 0;
  const skirt = (w, d, y = 0) => { if (sk > 0.05) put(g, RB(w, sk, d, 0.02), mt, 0, y - sk / 2 + 0.05, 0, { noShadow: true }); };
  switch (k) {
    case 'piso': put(g, RB(4, 0.3, 4, 0.06), mt, 0, -0.15, 0); skirt(3.9, 3.9, -0.3); break;
    case 'pisoR': { const c = new THREE.CylinderGeometry(2, 2, 0.3, 32); put(g, c, mt, 0, -0.15, 0); if (sk > 0.05) put(g, new THREE.CylinderGeometry(1.9, 1.9, sk, 24), mt, 0, -0.25 - sk / 2, 0, { noShadow: true }); break; }
    case 'parede': put(g, extruded(wallShape([])), mt, 0, 0, 0); skirt(4, 0.3); break;
    case 'janela': {
      put(g, extruded(wallShape([holeRect(-0.7, 1.0, 0.7, 2.2)])), mt, 0, 0, 0); skirt(4, 0.3);
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.2), M.glass); gl.position.set(0, 1.6, 0); g.add(gl);
      put(g, RB(1.5, 0.08, 0.4, 0.02), mt, 0, 0.98, 0); break;
    }
    case 'porta': {
      put(g, extruded(wallShape([holeRect(-0.8, 0, 0.8, 2.3)])), mt, 0, 0, 0); skirt(4, 0.3);
      const hinge = new THREE.Group(); hinge.position.set(-0.8, 0, 0); g.add(hinge);
      const leaf = put(hinge, RB(1.6, 2.28, 0.12, 0.03), pieceMat(matName === 'pedra' ? 'madeira' : matName), 0.8, 1.14, 0);
      put(hinge, new THREE.SphereGeometry(0.06, 8, 6), M.iron, 1.4, 1.1, 0.09, { noShadow: true });
      g.userData.hinge = hinge; hinge.rotation.y = o.open ? -1.75 : 0; g.userData.openAmt = o.open ? 1 : 0; leaf.name = 'leaf'; break;
    }
    case 'arco': put(g, extruded(wallShape([holeArch(1.1, 1.65)])), mt, 0, 0, 0); skirt(4, 0.3); break;
    case 'pilar': put(g, RB(0.5, WALL_H, 0.5, 0.08), mt, 0, WALL_H / 2, 0); if (sk > 0.05) put(g, RB(0.5, sk, 0.5, 0.02), mt, 0, -sk / 2, 0, { noShadow: true }); break;
    case 'coluna': {
      put(g, new THREE.CylinderGeometry(0.36, 0.42, WALL_H - 0.5, 18), mt, 0, WALL_H / 2, 0);
      put(g, new THREE.CylinderGeometry(0.52, 0.52, 0.25, 18), mt, 0, 0.12, 0); put(g, new THREE.CylinderGeometry(0.52, 0.52, 0.25, 18), mt, 0, WALL_H - 0.12, 0);
      if (sk > 0.05) put(g, new THREE.CylinderGeometry(0.45, 0.45, sk, 12), mt, 0, -sk / 2, 0, { noShadow: true }); break;
    }
    case 'rampa': {
      const n = 8; for (let i = 0; i < n; i++) { const h = (i + 1) * WALL_H / n; put(g, RB(4, h, 4 / n + 0.01, 0.01), mt, 0, h / 2, -2 + (i + 0.5) * 4 / n); }
      put(g, RB(0.2, 0.3, 4.1, 0.02), mt, -2, WALL_H * 0.4, 0, { noShadow: true }); break;
    }
    case 'telhado': {
      const s = new THREE.Shape(); s.moveTo(-2.4, 0); s.lineTo(2.4, 0); s.lineTo(0, 2.0); s.lineTo(-2.4, 0);
      const geo = new THREE.ExtrudeGeometry(s, { depth: 4.2, bevelEnabled: false }); geo.translate(0, 0, -2.1);
      const roofMat = matName === 'madeira' ? pieceMat('telha') : matName === 'pedra' ? solid(0x7a838b, { map: pieceMat('pedra').map }) : mt;
      put(g, geo, roofMat, 0, -0.05, 0); break;
    }
    case 'cupula': {
      const geo = new THREE.SphereGeometry(2.5, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2); put(g, geo, mt, 0, -0.05, 0);
      put(g, new THREE.SphereGeometry(0.2, 10, 8), solid(0xe0b040, { metalness: 0.5, roughness: 0.4 }), 0, 2.5, 0); break;
    }
    case 'cerca': {
      put(g, RB(4, 0.12, 0.12, 0.03), mt, 0, 0.85, 0); put(g, RB(4, 0.12, 0.12, 0.03), mt, 0, 0.4, 0);
      for (const x of [-1.9, 0, 1.9]) put(g, RB(0.16, 1.15, 0.16, 0.04), mt, x, 0.57, 0);
      if (sk > 0.05) put(g, RB(0.16, sk, 0.16, 0.02), mt, 0, -sk / 2, 0, { noShadow: true }); break;
    }
    case 'mesa': {
      put(g, RB(1.7, 0.1, 1.0, 0.04), mt, 0, 0.85, 0);
      for (const [x, z] of [[-0.75, -0.4], [0.75, -0.4], [-0.75, 0.4], [0.75, 0.4]]) put(g, RB(0.1, 0.8, 0.1, 0.03), mt, x, 0.4, z);
      break;
    }
    case 'banco': {
      put(g, RB(1.6, 0.1, 0.45, 0.04), mt, 0, 0.5, 0); for (const x of [-0.65, 0.65]) put(g, RB(0.1, 0.5, 0.4, 0.03), mt, x, 0.25, 0); break;
    }
    case 'cama': {
      put(g, RB(1.1, 0.25, 2.1, 0.05), mt, 0, 0.2, 0); put(g, RB(1.0, 0.18, 1.95, 0.08), M.cloth2, 0, 0.42, 0);
      put(g, RB(0.9, 0.1, 1.4, 0.04), M.cloth, 0, 0.53, 0.28); put(g, RB(0.7, 0.14, 0.4, 0.06), M.cloth2, 0, 0.54, -0.7);
      put(g, RB(1.1, 0.6, 0.1, 0.04), mt, 0, 0.45, -1.05); break;
    }
    case 'bau': {
      put(g, RB(1.0, 0.45, 0.65, 0.04), mt, 0, 0.25, 0);
      const lid = new THREE.CylinderGeometry(0.33, 0.33, 1.0, 16, 1, false, 0, Math.PI); lid.rotateZ(Math.PI / 2); lid.rotateY(Math.PI / 2); put(g, lid, mt, 0, 0.47, 0);
      put(g, RB(1.02, 0.08, 0.08, 0.02), M.iron, 0, 0.35, 0.33); put(g, new THREE.BoxGeometry(0.1, 0.14, 0.04), M.iron, 0, 0.45, 0.34); break;
    }
    case 'fogueira': {
      for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283; put(g, new THREE.DodecahedronGeometry(0.17, 0), M.stone, Math.cos(a) * 0.55, 0.1, Math.sin(a) * 0.55); }
      for (let i = 0; i < 3; i++) put(g, new THREE.CylinderGeometry(0.07, 0.07, 0.9, 6), solid(0x5a3a1c), 0, 0.15, 0, { rz: Math.PI / 2, ry: i * 1.05 });
      flame(g, 0.5, 0.8); g.userData.light = { color: 0xff8a3a, y: 0.9, intensity: 14, dist: 15 }; break;
    }
    case 'tocha': {
      put(g, new THREE.CylinderGeometry(0.04, 0.06, 1.6, 6), solid(0x5a3a1c), 0, 0.8, 0); put(g, new THREE.CylinderGeometry(0.09, 0.05, 0.2, 8), M.iron, 0, 1.55, 0);
      flame(g, 1.85, 0.5); g.userData.light = { color: 0xffa04a, y: 1.9, intensity: 9, dist: 12 }; break;
    }
  }
  return g;
}
export const pieceHeight = (k) => ({ parede: WALL_H, porta: WALL_H, janela: WALL_H, arco: WALL_H, pilar: WALL_H, coluna: WALL_H, rampa: WALL_H, telhado: 2.0, cupula: 2.6, cerca: 1.15, mesa: 0.9, banco: 0.5, cama: 0.6, bau: 0.8, fogueira: 0.4, tocha: 1.7 }[k] || 0.3);
