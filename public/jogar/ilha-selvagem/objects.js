import * as THREE from 'three';
import { mulberry32 } from './shared/noise.js';

// Modelos 3D dos recursos do mundo (árvores, pedras, plantas...), feitos de formas simples com cor por vértice.
const col = new THREE.Color();
function part(geo, color, o = {}) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.deleteAttribute('uv');
  const m = new THREE.Matrix4().compose(
    new THREE.Vector3(o.x || 0, o.y || 0, o.z || 0),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(o.rx || 0, o.ry || 0, o.rz || 0)),
    new THREE.Vector3(o.sx ?? 1, o.sy ?? 1, o.sz ?? 1));
  g.applyMatrix4(m);
  const n = g.attributes.position.count;
  const c = new Float32Array(n * 3), sw = new Float32Array(n);
  col.set(color);
  for (let i = 0; i < n; i++) { c[i * 3] = col.r; c[i * 3 + 1] = col.g; c[i * 3 + 2] = col.b; sw[i] = o.sw || 0; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  g.setAttribute('sw', new THREE.BufferAttribute(sw, 1));
  return g;
}
function merge(parts, H) {
  let total = 0; for (const p of parts) total += p.attributes.position.count;
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), cl = new Float32Array(total * 3), sw = new Float32Array(total);
  let o = 0;
  for (const p of parts) {
    const n = p.attributes.position.count;
    pos.set(p.attributes.position.array, o * 3); nor.set(p.attributes.normal.array, o * 3); cl.set(p.attributes.color.array, o * 3);
    for (let i = 0; i < n; i++) { const y = Math.max(0, p.attributes.position.array[i * 3 + 1]) / H; sw[o + i] = p.attributes.sw.array[i] * y * y; }
    o += n;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(cl, 3)); g.setAttribute('aSway', new THREE.BufferAttribute(sw, 1));
  return g;
}
const cyl = (rt, rb, h, s = 6) => new THREE.CylinderGeometry(rt, rb, h, s);
const ico = (r, d = 0) => new THREE.IcosahedronGeometry(r, d);
const cone = (r, h, s = 7) => new THREE.ConeGeometry(r, h, s);
const jit = (rnd, base, amt) => { col.set(base); col.offsetHSL((rnd() - 0.5) * amt, (rnd() - 0.5) * amt, (rnd() - 0.5) * amt); return col.getHex(); };

const BUILD = {
  carvalho(r) {
    const p = [part(cyl(0.2, 0.34, 2.4), 0x6b4a2b, { y: 1.2 })];
    const n = 3 + Math.floor(r() * 2);
    for (let i = 0; i < n; i++) p.push(part(ico(1.0 + r() * 0.5, 0), jit(r, 0x3f9a3a, 0.08), { x: (r() - 0.5) * 1.6, y: 2.9 + r() * 1.3, z: (r() - 0.5) * 1.6, sx: 1, sy: 0.85, sw: 1 }));
    return merge(p, 5);
  },
  pinheiro(r, snow = false) {
    const p = [part(cyl(0.16, 0.28, 1.6), 0x5a3d25, { y: 0.8 })];
    for (let i = 0; i < 4; i++) {
      const rad = 1.7 - i * 0.37;
      p.push(part(cone(rad, 1.7, 7), jit(r, snow ? 0xcfe3dc : 0x24663d, 0.06), { y: 1.9 + i * 1.05, ry: r() * 3, sw: 1 }));
      if (snow) p.push(part(cone(rad * 0.7, 0.9, 7), 0xffffff, { y: 2.25 + i * 1.05, sw: 1 }));
    }
    return merge(p, 6.2);
  },
  pinheiro_neve(r) { return BUILD.pinheiro(r, true); },
  palma(r) {
    const p = []; const lean = (r() - 0.5) * 0.5;
    for (let i = 0; i < 5; i++) p.push(part(cyl(0.16 - i * 0.012, 0.2 - i * 0.012, 1.0, 6), 0x9a7a4a, { x: lean * i * 0.5, y: 0.5 + i * 0.95, rz: -lean * 0.35 }));
    const top = { x: lean * 2.3, y: 5.0 };
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * 6.283 + r();
      p.push(part(cone(0.32, 2.6, 4), jit(r, 0x3fa14a, 0.06), { x: top.x + Math.cos(a) * 1.0, y: top.y - 0.15, z: Math.sin(a) * 1.0, rz: Math.cos(a) * 1.15, rx: Math.sin(a) * -1.15, sy: 1, sx: 0.5, sw: 1 }));
    }
    p.push(part(ico(0.25), 0x6b4a2b, { x: top.x, y: top.y - 0.2 }));
    return merge(p, 5.4);
  },
  selva(r) {
    const p = [part(cyl(0.3, 0.55, 6), 0x5b3f26, { y: 3 })];
    for (let i = 0; i < 6; i++) { const a = r() * 6.283, d = 0.4 + r() * 2.2; p.push(part(ico(1.4 + r() * 0.8, 0), jit(r, 0x1e7a32, 0.1), { x: Math.cos(a) * d, y: 6 + r() * 1.5, z: Math.sin(a) * d, sy: 0.7, sw: 1 })); }
    p.push(part(cone(0.7, 3, 5), 0x174f24, { x: 0.5, y: 4.4, rz: 0.3, sw: 1 }));
    return merge(p, 8);
  },
  pantano(r) {
    const p = [part(cyl(0.22, 0.4, 2.2, 5), 0x4a3d2b, { y: 1.1, rz: 0.12 }), part(cyl(0.15, 0.25, 1.6, 5), 0x4a3d2b, { x: 0.3, y: 2.7, rz: -0.5 })];
    for (let i = 0; i < 3; i++) p.push(part(ico(1.1 + r() * 0.4), jit(r, 0x546b35, 0.08), { x: (r() - 0.5) * 2, y: 3 + r(), z: (r() - 0.5) * 2, sy: 0.6, sw: 1 }));
    for (let i = 0; i < 6; i++) p.push(part(cone(0.07, 1.2, 4), 0x7d8a65, { x: (r() - 0.5) * 2.4, y: 2.3, z: (r() - 0.5) * 2.4, rx: Math.PI, sw: 1 }));
    return merge(p, 4.5);
  },
  seca(r) {
    const p = [part(cyl(0.12, 0.26, 3.2, 5), 0x7a6a58, { y: 1.6 })];
    for (let i = 0; i < 3; i++) p.push(part(cyl(0.05, 0.1, 1.4, 4), 0x7a6a58, { x: 0.5, y: 2 + i * 0.4, z: 0, rz: -1 + i * 0.1, ry: i * 2.1 }));
    return merge(p, 3.5);
  },
  rock(r, v) {
    const base = { cinza: 0x8b8a88, praia: 0xcbbd9c, areia: 0xc99a58, gelo: 0xc9dce8 }[v] || 0x8b8a88;
    const p = [];
    const n = 1 + Math.floor(r() * 2);
    for (let i = 0; i < n; i++) {
      const g = ico(0.8 + r() * 0.5, 0); const pos = g.attributes.position;
      for (let k = 0; k < pos.count; k++) pos.setXYZ(k, pos.getX(k) * (0.9 + r() * 0.3), pos.getY(k) * (0.7 + r() * 0.3), pos.getZ(k) * (0.9 + r() * 0.3));
      p.push(part(g, jit(r, base, 0.04), { x: i * 0.9 - 0.3, y: 0.45, z: (r() - 0.5), sy: 0.8 }));
    }
    return merge(p, 1.5);
  },
  capim(r, v) {
    const base = v === 'seco' ? 0xc9b25a : v === 'junco' ? 0x5e8a3a : 0x68b84a; const p = [];
    const tall = v === 'junco' ? 2 : 1;
    for (let i = 0; i < 7; i++) { const a = r() * 6.283, d = r() * 0.3; p.push(part(cone(0.07, (0.7 + r() * 0.5) * tall, 3), jit(r, base, 0.1), { x: Math.cos(a) * d, y: 0.4 * tall, z: Math.sin(a) * d, rz: (r() - 0.5) * 0.5, rx: (r() - 0.5) * 0.5, sw: 1 })); }
    if (v === 'junco') for (let i = 0; i < 2; i++) p.push(part(cyl(0.06, 0.06, 0.3, 5), 0x6b4a2b, { x: (r() - 0.5) * 0.4, y: 1.7, z: (r() - 0.5) * 0.4, sw: 1 }));
    return merge(p, 1.6 * tall);
  },
  flor(r) {
    const p = []; const cs = [0xe84a5f, 0xffd23f, 0xffffff, 0xb36bff, 0xff9ecd];
    for (let i = 0; i < 3; i++) { const x = (r() - 0.5) * 0.8, z = (r() - 0.5) * 0.8; p.push(part(cyl(0.02, 0.02, 0.45, 3), 0x3c8a3a, { x, y: 0.22, z, sw: 1 })); p.push(part(ico(0.1), cs[(r() * cs.length) | 0], { x, y: 0.48, z, sw: 1 })); }
    return merge(p, 0.6);
  },
  cacto(r) {
    const p = [part(cyl(0.26, 0.3, 2.2, 8), 0x3f8a4a, { y: 1.1 }), part(ico(0.26), 0x3f8a4a, { y: 2.2 })];
    p.push(part(cyl(0.14, 0.14, 0.7, 6), 0x3f8a4a, { x: 0.5, y: 1.3, rz: Math.PI / 2 }), part(cyl(0.14, 0.14, 0.8, 6), 0x3f8a4a, { x: 0.8, y: 1.7 }), part(ico(0.14), 0x3f8a4a, { x: 0.8, y: 2.1 }));
    if (r() > 0.4) p.push(part(cyl(0.13, 0.13, 0.6, 6), 0x3f8a4a, { x: -0.45, y: 1.1, rz: Math.PI / 2 }), part(cyl(0.13, 0.13, 0.7, 6), 0x3f8a4a, { x: -0.72, y: 1.4 }));
    return merge(p, 2.4);
  },
  coral(r) {
    const p = []; const cs = [0xff6b9a, 0xff9a3c, 0xb06bff, 0xff4f4f, 0xffd23f];
    const c = cs[(r() * cs.length) | 0];
    for (let i = 0; i < 6; i++) { const a = r() * 6.283; p.push(part(cone(0.15, 0.9 + r() * 0.8, 5), jit(r, c, 0.08), { x: Math.cos(a) * 0.4, y: 0.5, z: Math.sin(a) * 0.4, rz: Math.cos(a) * 0.5, rx: -Math.sin(a) * 0.5 })); }
    p.push(part(ico(0.4), jit(r, c, 0.05), { y: 0.25, sy: 0.7 }));
    return merge(p, 1.5);
  },
  alga(r) {
    const p = [];
    for (let k = 0; k < 3; k++) { const x = (r() - 0.5), z = (r() - 0.5); for (let i = 0; i < 5; i++) p.push(part(cyl(0.05, 0.08, 0.6, 4), jit(r, 0x2f9a4a, 0.08), { x: x + Math.sin(i * 0.7 + k) * 0.15, y: 0.3 + i * 0.55, z, sw: 1 })); }
    return merge(p, 3);
  },
};
const cache = new Map();
export function objectGeometry(o) {
  const key = o.t + '|' + o.v + '|' + o.vv;
  let g = cache.get(key);
  if (!g) {
    const r = mulberry32(o.vv * 1013 + o.v.length * 31 + o.t.length);
    const b = o.t === 'rock' ? BUILD.rock : o.t === 'grass' ? BUILD.capim : BUILD[o.v];
    g = (b === BUILD.rock || b === BUILD.capim) ? b(r, o.v) : b(r);
    cache.set(key, g);
  }
  return g;
}

// funde todos os objetos de um pedaço em UMA malha (poucas chamadas de desenho)
export function buildChunkMesh(list, taken, material) {
  const items = list.filter((o) => !taken.has(o.id));
  if (!items.length) return null;
  let total = 0; for (const o of items) total += objectGeometry(o).attributes.position.count;
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), cl = new Float32Array(total * 3), sw = new Float32Array(total);
  let k = 0;
  for (const o of items) {
    const g = objectGeometry(o); const P = g.attributes.position.array, Nn = g.attributes.normal.array, C = g.attributes.color.array, S = g.attributes.aSway.array;
    const c = Math.cos(o.ry), s = Math.sin(o.ry), sc = o.s;
    const n = g.attributes.position.count;
    for (let i = 0; i < n; i++, k++) {
      const x = P[i * 3] * sc, y = P[i * 3 + 1] * sc, z = P[i * 3 + 2] * sc;
      pos[k * 3] = x * c + z * s + o.x; pos[k * 3 + 1] = y + o.y - 0.08; pos[k * 3 + 2] = -x * s + z * c + o.z;
      nor[k * 3] = Nn[i * 3] * c + Nn[i * 3 + 2] * s; nor[k * 3 + 1] = Nn[i * 3 + 1]; nor[k * 3 + 2] = -Nn[i * 3] * s + Nn[i * 3 + 2] * c;
      cl[k * 3] = C[i * 3]; cl[k * 3 + 1] = C[i * 3 + 1]; cl[k * 3 + 2] = C[i * 3 + 2];
      sw[k] = S[i] * sc;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(cl, 3)); g.setAttribute('aSway', new THREE.BufferAttribute(sw, 1));
  g.computeBoundingSphere(); g.boundingSphere.radius += 6;
  const m = new THREE.Mesh(g, material);
  m.castShadow = true; m.receiveShadow = false;
  return m;
}

// malha única de um objeto (para animar a queda ao coletar)
export function objectMesh(o, material) {
  const m = new THREE.Mesh(objectGeometry(o), material);
  m.position.set(o.x, o.y - 0.08, o.z); m.rotation.y = o.ry; m.scale.setScalar(o.s); m.castShadow = true;
  return m;
}

export function makeObjectMaterial(uniforms) {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0, flatShading: true });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uniforms.uTime;
    sh.vertexShader = 'uniform float uTime;\nattribute float aSway;\n' + sh.vertexShader.replace('#include <begin_vertex>',
      `#include <begin_vertex>
       float ph = uTime * 1.7 + position.x * 0.35 + position.z * 0.27;
       transformed.x += sin(ph) * aSway * 0.28;
       transformed.z += cos(ph * 0.8) * aSway * 0.18;`);
  };
  return m;
}
