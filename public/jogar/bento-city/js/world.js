import * as THREE from 'three';
import { mulberry32, ColliderGrid, canvasTexture, clamp, lerp } from './util.js';

export const N = 10, BLOCK = 60, CELL = 74;
export const EDGE = (N * CELL) / 2; // 370 (outer road centre line)
export const bc = (i) => (i - (N - 1) / 2) * CELL; // block centre
export const roadLine = (k) => (k - N / 2) * CELL; // road centre line, k = 0..N
export const BEACH_Z = EDGE + 7;
export const WATER_Z = EDGE + 75;
export const STEP = 0.5;
export const MX = 3300, MZ = 0; // the Moon base lives far away from the city
export const isSpace = (x) => x > 2500;
export const AX = -560; // airport runway centre line

const SPECIAL = {
  '4,4': 'park', '5,5': 'plaza', '3,6': 'pizzeria', '6,3': 'taxi', '2,3': 'fire',
  '8,8': 'garbage', '7,6': 'moving', '5,6': 'shop', '6,6': 'dealer', '1,5': 'home', '8,2': 'stunt', '1,1': 'rocket', '7,3': 'hospital', '3,3': 'police',
};
const SIGNS = {
  pizzeria: ['PIZZARIA', '#c62828', '#fff'], taxi: ['TÁXI', '#fbc02d', '#222'], fire: ['BOMBEIROS', '#b71c1c', '#fff'],
  garbage: ['COLETA DE LIXO', '#2e7d32', '#fff'], moving: ['MUDANÇAS', '#1565c0', '#fff'], shop: ['LOJA DE ROUPAS', '#8e24aa', '#fff'],
  dealer: ['CONCESSIONÁRIA', '#263238', '#ffeb3b'], home: ['MINHA CASA', '#6d4c41', '#fff'],
  hospital: ['✚ HOSPITAL', '#e53935', '#fff'], police: ['POLÍCIA', '#0d47a1', '#fff'],
};

function boxUV(geo, w, h, d, s) {
  const uv = geo.attributes.uv;
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++)
    for (let v = 0; v < 4; v++) {
      const i = f * 4 + v;
      uv.setXY(i, uv.getX(i) * dims[f][0] / s, uv.getY(i) * dims[f][1] / s);
    }
  uv.needsUpdate = true;
  return geo;
}

// Split a (translated) BoxGeometry into wall faces and roof faces, non-indexed
function splitBox(geo) {
  const ng = geo.toNonIndexed();
  const mk = (faces) => {
    const g = new THREE.BufferGeometry();
    for (const name of ['position', 'normal', 'uv']) {
      const a = ng.attributes[name], n = a.itemSize, arr = new Float32Array(faces.length * 6 * n);
      faces.forEach((f, i) => arr.set(a.array.subarray(f * 6 * n, (f + 1) * 6 * n), i * 6 * n));
      g.setAttribute(name, new THREE.BufferAttribute(arr, n));
    }
    return g;
  };
  return { walls: mk([0, 1, 4, 5]), roof: mk([2, 3]) };
}
function mergeGeos(list) {
  const out = new THREE.BufferGeometry();
  for (const name of ['position', 'normal', 'uv']) {
    const n = list[0].attributes[name].itemSize;
    let len = 0; for (const g of list) len += g.attributes[name].array.length;
    const arr = new Float32Array(len); let o = 0;
    for (const g of list) { arr.set(g.attributes[name].array, o); o += g.attributes[name].array.length; }
    out.setAttribute(name, new THREE.BufferAttribute(arr, n));
  }
  out.computeBoundingSphere();
  return out;
}

function makeWedge(L, H, W) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0); shape.lineTo(L, 0); shape.lineTo(L, H); shape.lineTo(0, 0);
  const g = new THREE.ExtrudeGeometry(shape, { depth: W, bevelEnabled: false });
  g.translate(-L / 2, 0, -W / 2);
  return g;
}

export function makeRocket() {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.3, roughness: 0.4 });
  const red = new THREE.MeshStandardMaterial({ color: 0xe53935, roughness: 0.4 });
  const add = (geo, m, y, x = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; g.add(o); return o; };
  add(new THREE.CylinderGeometry(2.2, 2.4, 16, 24), white, 9);
  add(new THREE.ConeGeometry(2.2, 6, 24), red, 20);
  add(new THREE.CylinderGeometry(2.25, 2.25, 1, 24), red, 13);
  const win = add(new THREE.CylinderGeometry(0.8, 0.8, 0.3, 20), new THREE.MeshStandardMaterial({ color: 0x4fc3f7, emissive: 0x0288d1, emissiveIntensity: 0.4 }), 15, 0, 2.15);
  win.rotation.x = Math.PI / 2;
  for (let i = 0; i < 4; i++) { const f = add(new THREE.BoxGeometry(0.3, 4, 2.4), red, 2.5); const a = i * Math.PI / 2; f.position.x = Math.sin(a) * 2.7; f.position.z = Math.cos(a) * 2.7; f.rotation.y = a; }
  add(new THREE.CylinderGeometry(1.6, 2.2, 1.4, 20), new THREE.MeshStandardMaterial({ color: 0x424242, metalness: 0.6 }), 0.7);
  const flame = add(new THREE.ConeGeometry(2, 9, 16), new THREE.MeshBasicMaterial({ color: 0xffab40, transparent: true, opacity: 0.85 }), -4.5);
  flame.rotation.x = Math.PI; flame.visible = false; flame.castShadow = false;
  g.userData.flame = flame;
  return g;
}

export class World {
  constructor(scene, seed = 1337) {
    this.scene = scene;
    this.rng = mulberry32(seed);
    this.grid = new ColliderGrid(16);
    this.buildings = [];
    this.houses = [];
    this.locations = {};
    this.parking = [];
    this.gifts = [];
    this.time = 9; // hours
    this.daySpeed = 24 / (14 * 60); // a day lasts 14 real minutes
    this._q = [];
    this._hit = { nx: 0, nz: 0 };
    this.batches = new Map();
    this.makeMaterials();
    this.build();
    this.setupLights();
  }

  makeMaterials() {
    const T = THREE;
    const r = mulberry32(99);
    this.winTex = canvasTexture(128, 128, (g) => {
      g.fillStyle = '#ffffff'; g.fillRect(0, 0, 128, 128);
      g.fillStyle = '#e8e8e8'; g.fillRect(0, 118, 128, 10);
      g.fillStyle = '#5f7f9f';
      g.fillRect(14, 30, 40, 60); g.fillRect(74, 30, 40, 60);
      g.fillStyle = 'rgba(255,255,255,0.35)';
      g.fillRect(16, 32, 12, 56); g.fillRect(76, 32, 12, 56);
    }, T);
    this.winTex.wrapS = this.winTex.wrapT = T.RepeatWrapping;
    this.emTex = canvasTexture(512, 512, (g) => {
      g.fillStyle = '#000'; g.fillRect(0, 0, 512, 512);
      for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) for (let k = 0; k < 2; k++) {
        if (r() < 0.45) continue;
        g.fillStyle = r() < 0.8 ? '#ffd27a' : '#bfe3ff';
        g.fillRect(x * 128 + 14 + k * 60, y * 128 + 30, 40, 60);
      }
    }, T);
    this.emTex.wrapS = this.emTex.wrapT = T.RepeatWrapping;
    this.emTex.repeat.set(0.25, 0.25);
    const colors = [0xd9cbb4, 0xb0bec5, 0xef9a9a, 0x90caf9, 0xfff59d, 0xa5d6a7, 0xffcc80, 0xce93d8, 0xe0e0e0, 0x80cbc4];
    this.wallMats = colors.map((c) => new T.MeshStandardMaterial({
      map: this.winTex, color: c, roughness: 0.85, emissive: 0xffffff, emissiveMap: this.emTex, emissiveIntensity: 0,
    }));
    this.roofMat = new T.MeshStandardMaterial({ color: 0x6b6f75, roughness: 0.9 });
    this.houseRoofMats = [0xb5533c, 0x5d4037, 0x37474f, 0x2e7d32, 0x8d6e63].map((c) => new T.MeshStandardMaterial({ color: c, roughness: 0.8 }));
    this.sidewalkTex = canvasTexture(128, 128, (g) => {
      g.fillStyle = '#bdbdbd'; g.fillRect(0, 0, 128, 128);
      g.strokeStyle = '#9e9e9e'; g.lineWidth = 3;
      for (let i = 0; i <= 128; i += 64) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(128, i); g.stroke(); }
    }, T);
    this.sidewalkTex.wrapS = this.sidewalkTex.wrapT = T.RepeatWrapping;
    this.sidewalkMat = new T.MeshStandardMaterial({ map: this.sidewalkTex, roughness: 0.95 });
    this.grassMat = new T.MeshStandardMaterial({ color: 0x6abf4b, roughness: 1 });
    this.plazaMat = new T.MeshStandardMaterial({ color: 0xd7ccc8, roughness: 0.9 });
    this.darkMat = new T.MeshStandardMaterial({ color: 0x3e2723 });
    this.whiteMat = new T.MeshStandardMaterial({ color: 0xffffff });
    this.concreteMat = new T.MeshStandardMaterial({ color: 0x9e9e9e, roughness: 0.9 });
    this.waterMat = new T.MeshStandardMaterial({ color: 0x29b6f6, transparent: true, opacity: 0.8, roughness: 0.2, metalness: 0.1 });
    this.bulbMat = new T.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffe08a, emissiveIntensity: 0 });
  }

  addCollider(x0, x1, z0, z1, h, y0 = 0, extra = {}) {
    return this.grid.add({ x0, x1, z0, z1, h, y0, ...extra });
  }

  batch(mat, geo) {
    let a = this.batches.get(mat); if (!a) { a = []; this.batches.set(mat, a); }
    a.push(geo.index ? geo.toNonIndexed() : geo);
  }
  flushBatches() {
    for (const [mat, list] of this.batches) {
      const m = new THREE.Mesh(mergeGeos(list), mat);
      m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false;
      this.scene.add(m);
    }
    this.batches.clear();
  }

  addBuilding(w, h, d, x, z, mat, opts = {}) {
    const geo = boxUV(new THREE.BoxGeometry(w, h, d), w, h, d, 4);
    const roof = opts.roof || this.roofMat;
    const y0 = opts.y0 ?? 0.15;
    geo.translate(x, y0 + h / 2, z);
    const parts = splitBox(geo);
    this.batch(mat, parts.walls); this.batch(roof, parts.roof);
    const c = this.addCollider(x - w / 2, x + w / 2, z - d / 2, z + d / 2, y0 + h, 0);
    if (!opts.noFire) this.buildings.push(c);
    return c;
  }

  addBox(w, h, d, x, y0, z, mat, collide = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.position.set(x, y0 + h / 2, z);
    m.castShadow = true; m.receiveShadow = true;
    this.scene.add(m);
    if (collide) this.addCollider(x - w / 2, x + w / 2, z - d / 2, z + d / 2, y0 + h, y0);
    return m;
  }

  makeSign(text, bg, fg, w = 10, h = 2.2) {
    const tex = canvasTexture(512, 112, (g) => {
      g.fillStyle = bg; g.fillRect(0, 0, 512, 112);
      g.strokeStyle = fg; g.lineWidth = 6; g.strokeRect(6, 6, 500, 100);
      g.fillStyle = fg; g.font = 'bold 64px Arial Black, Arial, sans-serif';
      g.textAlign = 'center'; g.textBaseline = 'middle';
      let size = 64; while (g.measureText(text).width > 470 && size > 20) { size -= 4; g.font = `bold ${size}px Arial Black, Arial, sans-serif`; }
      g.fillText(text, 256, 58);
    }, THREE);
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex }));
    return m;
  }

  build() {
    const T = THREE, S = this.scene, r = this.rng;
    // --- Ground: road tile texture ---
    const roadTex = canvasTexture(512, 512, (g) => {
      g.fillStyle = '#3b3e44'; g.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`; g.fillRect(Math.random() * 512, Math.random() * 512, 2, 2); }
      const px = 512 / CELL, road = 7 * px;
      g.fillStyle = '#f2c94c';
      for (let p = road + 8; p < 512 - road - 8; p += 26) {
        g.fillRect(p, 0, 14, 2); g.fillRect(p, 510, 14, 2); g.fillRect(0, p, 2, 14); g.fillRect(510, p, 2, 14);
      }
      g.fillStyle = '#e8e8e8';
      for (const [a0, a1] of [[0, road], [512 - road, 512]])
        for (let p = a0 + 2; p < a1 - 2; p += 8) {
          g.fillRect(road + 3, p, 12, 4); g.fillRect(512 - road - 15, p, 12, 4);
          g.fillRect(p, road + 3, 4, 12); g.fillRect(p, 512 - road - 15, 4, 12);
        }
    }, T);
    roadTex.wrapS = roadTex.wrapT = T.RepeatWrapping;
    const size = 760;
    roadTex.repeat.set(size / CELL, size / CELL);
    roadTex.offset.set(-10 / CELL, -10 / CELL);
    const ground = new T.Mesh(new T.PlaneGeometry(size, size), new T.MeshStandardMaterial({ map: roadTex, roughness: 0.95 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; S.add(ground);

    const grassMat = new T.MeshStandardMaterial({ color: 0x5aa83f, roughness: 1 });
    for (const [x0, x1, z0, z1] of [[-1500, 1500, -1500, -380], [-1500, -380, -380, 380], [380, 1500, -380, 380]]) {
      const gr = new T.Mesh(new T.PlaneGeometry(x1 - x0, z1 - z0), grassMat);
      gr.rotation.x = -Math.PI / 2; gr.position.set((x0 + x1) / 2, -0.01, (z0 + z1) / 2); gr.receiveShadow = true; S.add(gr);
    }
    const sand = new T.Mesh(new T.PlaneGeometry(3000, WATER_Z - 380 + 2), new T.MeshStandardMaterial({ color: 0xf0dc9c, roughness: 1 }));
    sand.rotation.x = -Math.PI / 2; sand.position.set(0, -0.01, (380 + WATER_Z) / 2 - 1); sand.receiveShadow = true; S.add(sand);
    const floor = new T.Mesh(new T.PlaneGeometry(3000, 1500), new T.MeshStandardMaterial({ color: 0xc9b77a }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, -1.6, WATER_Z + 750); S.add(floor);
    const water = new T.Mesh(new T.PlaneGeometry(3000, 1520), this.waterMat);
    water.rotation.x = -Math.PI / 2; water.position.set(0, -0.3, WATER_Z + 750); S.add(water);
    this.water = water;

    // Beach props: umbrellas & pier
    for (let i = 0; i < 18; i++) {
      const x = -340 + i * 40 + r() * 10, z = BEACH_Z + 20 + r() * 35;
      const pole = new T.Mesh(new T.CylinderGeometry(0.08, 0.08, 3), this.whiteMat); pole.position.set(x, 1.5, z); S.add(pole);
      const top = new T.Mesh(new T.ConeGeometry(2.2, 0.8, 8), new T.MeshStandardMaterial({ color: [0xe53935, 0x1e88e5, 0xfdd835, 0x43a047][i % 4] }));
      top.position.set(x, 3.1, z); top.castShadow = true; S.add(top);
    }
    const pier = this.addBox(8, 0.4, 70, 120, 0.2, WATER_Z + 30, new T.MeshStandardMaterial({ color: 0x8d6e63 }), false);
    this.addCollider(116, 124, WATER_Z - 5, WATER_Z + 65, 0.6, 0, { pier: true });
    for (let k = 0; k < 8; k++) for (const sx of [-3.6, 3.6]) {
      const p = new T.Mesh(new T.CylinderGeometry(0.2, 0.2, 2.6), this.darkMat); p.position.set(120 + sx, -0.8, WATER_Z - 2 + k * 9.5); S.add(p);
    }

    const trees = [], lamps = [];
    this.trees = trees;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const x = bc(i), z = bc(j);
      const type = SPECIAL[`${i},${j}`];
      const d = Math.max(Math.abs(i - 4.5), Math.abs(j - 4.5));
      // sidewalk slab
      this.batch(this.sidewalkMat, boxUV(new T.BoxGeometry(BLOCK, 0.3, BLOCK), BLOCK, 0.3, BLOCK, 4).translate(x, 0, z));
      // lamps on corners
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) lamps.push([x + sx * 28.6, z + sz * 28.6], [x + sx * 14, z + sz * 28.6], [x + sx * 28.6, z + sz * 14]);

      if (type) { this.buildSpecial(type, i, j, x, z, trees); continue; }
      if (d >= 3.5 || (d >= 3 && r() < 0.5)) this.buildSuburb(i, j, x, z, trees);
      else this.buildTowers(x, z, d, trees);
    }

    // Parking spots along curbs
    for (let k = 1; k < N; k++) for (let m = 0; m < N; m++) {
      if (r() < 0.75) continue;
      const line = roadLine(k), along = bc(m) + (r() - 0.5) * 30;
      const side = r() < 0.5 ? 1 : -1;
      if (r() < 0.5) this.parking.push({ x: line + side * 5.4, z: along, ry: side > 0 ? Math.PI : 0 });
      else this.parking.push({ x: along, z: line + side * 5.4, ry: side > 0 ? Math.PI / 2 : -Math.PI / 2 });
    }

    // Gifts hidden around
    for (let g = 0; g < 40; g++) {
      const p = g % 3 === 0 ? this.randomSidewalk() : { x: (r() - 0.5) * 2 * (EDGE - 10), z: (r() - 0.5) * 2 * (EDGE - 10) };
      if (this.groundAt(p.x, p.z, 100) > 1) { g--; continue; }
      this.gifts.push(p);
    }

    this.buildAirport();
    this.buildBeachMarket();
    this.buildMoon(trees);
    this.flushBatches();
    // Instanced trees
    const trunkG = new T.CylinderGeometry(0.25, 0.35, 2.6, 6); trunkG.translate(0, 1.3, 0);
    const crownG = new T.IcosahedronGeometry(2.1, 1); crownG.translate(0, 4.1, 0);
    const trunks = new T.InstancedMesh(trunkG, new T.MeshStandardMaterial({ color: 0x795548 }), trees.length);
    const crowns = new T.InstancedMesh(crownG, new T.MeshStandardMaterial({ color: 0xffffff, flatShading: true }), trees.length);
    const mtx = new T.Matrix4(), col = new T.Color();
    trees.forEach(([tx, tz, s], idx) => {
      mtx.makeScale(s, s, s); mtx.setPosition(tx, 0.15, tz);
      trunks.setMatrixAt(idx, mtx); crowns.setMatrixAt(idx, mtx);
      crowns.setColorAt(idx, col.setHSL(0.25 + r() * 0.1, 0.55, 0.32 + r() * 0.12));
      this.addCollider(tx - 0.4, tx + 0.4, tz - 0.4, tz + 0.4, 6);
    });
    trunks.castShadow = crowns.castShadow = true;
    S.add(trunks, crowns);
    // Instanced lamps
    const poleG = new T.CylinderGeometry(0.1, 0.14, 6, 6); poleG.translate(0, 3, 0);
    const bulbG = new T.SphereGeometry(0.35, 8, 6); bulbG.translate(0, 6.1, 0);
    const poles = new T.InstancedMesh(poleG, new T.MeshStandardMaterial({ color: 0x37474f }), lamps.length);
    const bulbs = new T.InstancedMesh(bulbG, this.bulbMat, lamps.length);
    lamps.forEach(([lx, lz], idx) => {
      mtx.makeTranslation(lx, 0.15, lz); poles.setMatrixAt(idx, mtx); bulbs.setMatrixAt(idx, mtx);
      this.addCollider(lx - 0.15, lx + 0.15, lz - 0.15, lz + 0.15, 6);
    });
    S.add(poles, bulbs);

    // Invisible city boundary (except beach side)
    const B = 900;
    this.addCollider(-B - 10, -B, -B, B + 600, 50); this.addCollider(B, B + 10, -B, B + 600, 50);
    this.addCollider(-B, B, -B - 10, -B, 50);
  }

  lot(x, z) { return [[x - 13, z - 13], [x + 13, z - 13], [x - 13, z + 13], [x + 13, z + 13]]; }

  buildTowers(x, z, d, trees) {
    const r = this.rng;
    const maxH = d < 1.5 ? 75 : d < 2.5 ? 40 : 22;
    const minH = d < 1.5 ? 25 : d < 2.5 ? 12 : 8;
    if (r() < 0.25) {
      // one big tower
      const w = 34 + r() * 14, dd = 34 + r() * 14, h = minH + r() * (maxH - minH) * 1.1;
      this.addBuilding(w, h, dd, x, z, this.wallMats[Math.floor(r() * this.wallMats.length)]);
      if (h > 30) this.addBuilding(w * 0.6, h * 0.25, dd * 0.6, x, z, this.wallMats[Math.floor(r() * 10)], { y0: h + 0.15, noFire: true });
    } else {
      for (const [lx, lz] of this.lot(x, z)) {
        if (r() < 0.12) { trees.push([lx, lz, 1 + r() * 0.4]); continue; }
        const w = 16 + r() * 7, dd = 16 + r() * 7, h = minH + r() * (maxH - minH);
        this.addBuilding(w, h, dd, lx, lz, this.wallMats[Math.floor(r() * this.wallMats.length)]);
      }
    }
    for (let k = -1; k <= 1; k += 2) { trees.push([x + k * 20, z + 27, 0.7]); trees.push([x + k * 20, z - 27, 0.7]); }
  }

  buildSuburb(i, j, x, z, trees) {
    const r = this.rng, T = THREE;
    this.batch(this.grassMat, new T.BoxGeometry(52, 0.32, 52).translate(x, 0, z));
    for (const [lx, lz] of this.lot(x, z)) {
      const face = Math.sign(lz - z); // door faces the street to the north/south
      const w = 10 + r() * 4, d = 8 + r() * 3, h = 4.5 + r() * 2.5;
      const hz = lz - face * 2;
      const mat = this.wallMats[Math.floor(r() * this.wallMats.length)];
      this.addBuilding(w, h, d, lx, hz, mat, { roof: mat });
      const rh = 3 + r();
      const roof = new T.ConeGeometry(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4).scale(w * 1.1, rh, d * 1.1).translate(lx, 0.15 + h + rh / 2, hz);
      this.batch(this.houseRoofMats[Math.floor(r() * 5)], roof);
      const doorZ = hz + face * (d / 2 + 0.05);
      this.batch(this.darkMat, new T.BoxGeometry(1.4, 2.4, 0.1).translate(lx, 1.35, doorZ));
      this.houses.push({ x: lx, z: doorZ + face * 3, door: { x: lx, z: doorZ }, face });
      if (r() < 0.7) trees.push([lx + (r() < 0.5 ? -1 : 1) * (w / 2 + 2.5), lz + face * 5, 0.8 + r() * 0.5]);
    }
  }

  buildSpecial(type, i, j, x, z, trees) {
    const T = THREE, r = this.rng, S = this.scene;
    const loc = { x, z, zone: { x, z: z + 25 }, spawn: { x: x + 10, z: z + 37 + 3.5, ry: Math.PI / 2 } };
    this.locations[type] = loc;
    if (type === 'park') {
      const g = new T.Mesh(new T.BoxGeometry(52, 0.32, 52), this.grassMat); g.position.set(x, 0, z); S.add(g);
      const pond = new T.Mesh(new T.CylinderGeometry(9, 9, 0.34, 24), this.waterMat); pond.position.set(x + 6, 0, z - 6); S.add(pond);
      for (let k = 0; k < 22; k++) {
        const a = r() * Math.PI * 2, rr = 13 + r() * 10;
        trees.push([x + Math.cos(a) * rr, z + Math.sin(a) * rr, 0.8 + r() * 0.6]);
      }
      for (let k = 0; k < 4; k++) this.addBox(3, 0.5, 0.8, x - 12 + k * 6, 0.15, z + 14, new T.MeshStandardMaterial({ color: 0x8d6e63 }));
      return;
    }
    if (type === 'plaza') {
      const g = new T.Mesh(new T.BoxGeometry(52, 0.32, 52), this.plazaMat); g.position.set(x, 0, z); S.add(g);
      const base = new T.Mesh(new T.CylinderGeometry(6, 6.5, 0.9, 24), this.concreteMat); base.position.set(x, 0.45, z); S.add(base);
      const w = new T.Mesh(new T.CylinderGeometry(5.5, 5.5, 0.2, 24), this.waterMat); w.position.set(x, 0.9, z); S.add(w);
      const col = new T.Mesh(new T.CylinderGeometry(0.5, 0.8, 3.5, 12), this.concreteMat); col.position.set(x, 2, z); col.castShadow = true; S.add(col);
      this.addCollider(x - 5.6, x + 5.6, z - 5.6, z + 5.6, 0.9);
      this.addCollider(x - 0.7, x + 0.7, z - 0.7, z + 0.7, 3.8);
      this.fountain = { x, z };
      for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2; trees.push([x + Math.cos(a) * 18, z + Math.sin(a) * 18, 0.9]); }
      this.locations.spawn = { x, z: z + 12 };
      return;
    }
    if (type === 'stunt') {
      const g = new T.Mesh(new T.BoxGeometry(52, 0.32, 52), this.concreteMat); g.position.set(x, 0, z); S.add(g);
      const rm = new T.MeshStandardMaterial({ color: 0xff7043, roughness: 0.6 });
      const addRamp = (cx, cz, L, H, W, dirName) => {
        const m = new T.Mesh(makeWedge(L, H, W), rm);
        m.rotation.y = { px: 0, nx: Math.PI, pz: -Math.PI / 2, nz: Math.PI / 2 }[dirName];
        m.position.set(cx, 0.15, cz); m.castShadow = true; m.receiveShadow = true; S.add(m);
        const ax = dirName[1] === 'x';
        const hx = ax ? L / 2 : W / 2, hz = ax ? W / 2 : L / 2;
        this.grid.add({ x0: cx - hx, x1: cx + hx, z0: cz - hz, z1: cz + hz, h: H + 0.15, y0: 0, ramp: true, axis: ax ? 'x' : 'z', dir: dirName[0] === 'p' ? 1 : -1, hMax: H });
      };
      addRamp(x - 13, z - 8, 14, 4, 9, 'px');
      this.addBox(8, 4, 9, x, 0.15, z - 8, new T.MeshStandardMaterial({ color: 0x546e7a }));
      addRamp(x + 13, z - 8, 14, 4, 9, 'nx');
      addRamp(x - 15, z + 15, 10, 2.2, 7, 'nz');
      addRamp(x + 15, z + 15, 10, 2.2, 7, 'pz');
      const sign = this.makeSign('PISTA DE MANOBRAS', '#ff7043', '#fff', 14, 2.6); sign.position.set(x, 6, z - 14); S.add(sign);
      this.addBox(0.4, 5, 0.4, x - 6, 0.15, z - 14, this.concreteMat); this.addBox(0.4, 5, 0.4, x + 6, 0.15, z - 14, this.concreteMat);
      this.locations.stunt = loc;
      return;
    }
    if (type === 'rocket') {
      const g = new T.Mesh(new T.BoxGeometry(52, 0.32, 52), this.concreteMat); g.position.set(x, 0, z); S.add(g);
      const pad = new T.Mesh(new T.CylinderGeometry(10, 11, 0.8, 32), new T.MeshStandardMaterial({ color: 0x546e7a })); pad.position.set(x, 0.4, z - 6); pad.receiveShadow = true; S.add(pad);
      this.addCollider(x - 7.5, x + 7.5, z - 13.5, z + 1.5, 0.8);
      const tower = this.addBox(3, 30, 3, x - 9, 0.8, z - 6, new T.MeshStandardMaterial({ color: 0xd32f2f, metalness: 0.4 }));
      for (let k = 0; k < 5; k++) this.addBox(5, 0.4, 0.6, x - 6.5, 6 + k * 5, z - 6, new T.MeshStandardMaterial({ color: 0x9e9e9e }), false);
      this.earthRocket = makeRocket(); this.earthRocket.position.set(x, 0.8, z - 6); S.add(this.earthRocket);
      this.addCollider(x - 2.6, x + 2.6, z - 8.6, z - 3.4, 30);
      const sign = this.makeSign('CENTRO ESPACIAL', '#0d47a1', '#fff', 12, 2.4); sign.position.set(x + 12, 5, z + 6); S.add(sign);
      this.addBox(0.4, 4, 0.4, x + 7, 0.15, z + 6, this.concreteMat); this.addBox(0.4, 4, 0.4, x + 17, 0.15, z + 6, this.concreteMat);
      const tank = new T.Mesh(new T.CylinderGeometry(2, 2, 3, 20), new T.MeshStandardMaterial({ color: 0xffffff, metalness: 0.4 })); tank.position.set(x + 10, 1.65, z - 4); S.add(tank);
      this.addCollider(x + 8.4, x + 11.6, z - 5.6, z - 2.4, 3.1);
      this.locations.fuel = { x: x + 10, z: z - 0.5 };
      return;
    }
    // Workplaces, shop, dealer, home: one building at the back, zone at the front
    const [label, bg, fg] = SIGNS[type];
    const pal = { pizzeria: 0xffe0b2, taxi: 0xfff176, fire: 0xef5350, garbage: 0xa5d6a7, moving: 0x90caf9, shop: 0xe1bee7, dealer: 0xeceff1, home: 0xffccbc, hospital: 0xfafafa, police: 0x90caf9 };
    const mat = new T.MeshStandardMaterial({ map: this.winTex, color: pal[type], roughness: 0.8, emissive: 0xffffff, emissiveMap: this.emTex, emissiveIntensity: 0 });
    this.wallMats.push(mat);
    const h = type === 'home' ? 7 : type === 'hospital' ? 14 : 10;
    this.addBuilding(40, h, 26, x, z - 10, mat, { noFire: true });
    const sign = this.makeSign(label, bg, fg); sign.position.set(x, h - 1.5, z + 3.06); S.add(sign);
    // awning
    const aw = new T.Mesh(new T.BoxGeometry(14, 0.3, 3), new T.MeshStandardMaterial({ color: new T.Color(bg) }));
    aw.position.set(x, 4, z + 4.5); aw.castShadow = true; S.add(aw);
    const door = new T.Mesh(new T.BoxGeometry(3, 3.4, 0.2), this.darkMat); door.position.set(x, 1.85, z + 3.05); S.add(door);
    if (type === 'dealer') {
      for (let k = 0; k < 3; k++) { const p = new T.Mesh(new T.CylinderGeometry(3, 3, 0.3, 24), this.whiteMat); p.position.set(x - 14 + k * 14, 0.3, z + 12); S.add(p); }
    }
    if (type === 'hospital') {
      const hp = new T.Mesh(new T.CylinderGeometry(7, 7, 0.1, 32), new T.MeshStandardMaterial({ color: 0x37474f })); hp.position.set(x, h + 0.2, z - 10); S.add(hp);
      const H = this.makeSign('H', '#37474f', '#ffeb3b', 6, 6); H.rotation.x = -Math.PI / 2; H.position.set(x, h + 0.27, z - 10); S.add(H);
      this.locations.helipad = { x, z: z - 10, y: h + 0.15 };
    }
    if (type === 'garbage') {
      for (let k = 0; k < 3; k++) this.addBox(3, 1.6, 2, x - 15 + k * 4, 0.15, z + 9, new T.MeshStandardMaterial({ color: 0x2e7d32 }));
    }
    for (const sx of [-17, 17]) trees.push([x + sx, z + 18, 0.9]);
  }

  buildAirport() {
    const T = THREE, S = this.scene;
    const runTex = canvasTexture(64, 512, (g) => {
      g.fillStyle = '#2f3237'; g.fillRect(0, 0, 64, 512);
      g.fillStyle = '#fff'; for (let y = 10; y < 512; y += 64) g.fillRect(30, y, 4, 32);
      g.fillRect(2, 0, 2, 512); g.fillRect(60, 0, 2, 512);
    }, T);
    runTex.wrapT = T.RepeatWrapping; runTex.repeat.set(1, 6);
    const run = new T.Mesh(new T.PlaneGeometry(30, 420), new T.MeshStandardMaterial({ map: runTex, roughness: 0.9 }));
    run.rotation.x = -Math.PI / 2; run.position.set(AX, 0.02, 0); run.receiveShadow = true; S.add(run);
    for (const zz of [-200, 200]) for (let k = 0; k < 6; k++) { const st = new T.Mesh(new T.PlaneGeometry(2, 10), this.whiteMat); st.rotation.x = -Math.PI / 2; st.position.set(AX - 11 + k * 4.4, 0.03, zz - Math.sign(zz) * 2); S.add(st); }
    const apron = new T.Mesh(new T.PlaneGeometry(80, 190), new T.MeshStandardMaterial({ color: 0x8a8f96, roughness: 0.95 }));
    apron.rotation.x = -Math.PI / 2; apron.position.set(-505, 0.015, 0); apron.receiveShadow = true; S.add(apron);
    const road = new T.Mesh(new T.PlaneGeometry(95, 14), new T.MeshStandardMaterial({ color: 0x3b3e44 }));
    road.rotation.x = -Math.PI / 2; road.position.set(-418, 0.015, 30); S.add(road);
    for (const lz of [-200, -100, 0, 100, 200]) for (const lx of [AX - 16, AX + 16]) {
      const l = new T.Mesh(new T.SphereGeometry(0.3, 8, 6), new T.MeshStandardMaterial({ color: 0x00e676, emissive: 0x00e676, emissiveIntensity: 1 })); l.position.set(lx, 0.3, lz); S.add(l);
    }
    const termMat = new T.MeshStandardMaterial({ map: this.winTex, color: 0xcfd8dc, emissive: 0xffffff, emissiveMap: this.emTex, emissiveIntensity: 0 });
    this.wallMats.push(termMat);
    this.addBuilding(30, 12, 80, -450, 0, termMat, { noFire: true, y0: 0 });
    const sign = this.makeSign('AEROPORTO', '#00695c', '#fff', 16, 3); sign.rotation.y = -Math.PI / 2; sign.position.set(-465.1, 9, 0); S.add(sign);
    const tower = new T.Mesh(new T.CylinderGeometry(2.5, 3.2, 28, 16), new T.MeshStandardMaterial({ color: 0xeceff1 })); tower.position.set(-455, 14, -65); tower.castShadow = true; S.add(tower);
    const cab = new T.Mesh(new T.CylinderGeometry(5, 4, 4, 16), new T.MeshStandardMaterial({ color: 0x4dd0e1, transparent: true, opacity: 0.7, metalness: 0.4 })); cab.position.set(-455, 30, -65); S.add(cab);
    const capm = new T.Mesh(new T.CylinderGeometry(5.5, 5.5, 0.6, 16), new T.MeshStandardMaterial({ color: 0x455a64 })); capm.position.set(-455, 32.3, -65); S.add(capm);
    this.addCollider(-458, -452, -68, -62, 32.6);
    const hangMat = new T.MeshStandardMaterial({ color: 0x78909c, metalness: 0.5, roughness: 0.4, side: T.DoubleSide });
    for (const hz of [-125, 125]) {
      const hg = new T.Mesh(new T.CylinderGeometry(14, 14, 36, 24, 1, true, -Math.PI / 2, Math.PI), hangMat);
      hg.rotation.z = Math.PI / 2; hg.rotation.y = Math.PI / 2; hg.position.set(-500, 0, hz); hg.castShadow = true; S.add(hg);
      this.addCollider(-518, -482, hz - 14, hz - 12, 14); this.addCollider(-518, -482, hz + 12, hz + 14, 14);
      this.addCollider(-482, -480, hz - 14, hz + 14, 14);
    }
    const hp = new T.Mesh(new T.CylinderGeometry(7, 7, 0.1, 32), new T.MeshStandardMaterial({ color: 0x37474f })); hp.position.set(-490, 0.07, 70); S.add(hp);
    const H = this.makeSign('H', '#37474f', '#ffeb3b', 6, 6); H.rotation.x = -Math.PI / 2; H.position.set(-490, 0.14, 70); S.add(H);
    this.locations.airport = { x: -450, z: 20, zone: { x: -470, z: 20 }, spawn: { x: AX, z: -185, ry: 0 } };
    this.locations.hangar = { x: -450, z: -20, zone: { x: -470, z: -20 }, spawn: { x: AX, z: -185, ry: 0 } };
    this.locations.heliBase = { x: -490, z: 70, zone: { x: -476, z: 70 }, spawn: { x: -490, z: 70, ry: -Math.PI / 2 } };
    this.runway = { x0: AX - 15, x1: AX + 15, z0: -210, z1: 210 };
    this.planeSpots = [-75, -45, -15, 15, 45].map((z) => ({ x: -522, z, ry: -Math.PI / 2 }));
  }

  buildBeachMarket() {
    const T = THREE, S = this.scene, x = 92, z = BEACH_Z + 22;
    this.addBox(8, 1.1, 3, x, 0, z, new T.MeshStandardMaterial({ color: 0x8d6e63 }));
    const roof = new T.Mesh(new T.ConeGeometry(6.5, 2.5, 4), new T.MeshStandardMaterial({ color: 0x0288d1 })); roof.rotation.y = Math.PI / 4; roof.position.set(x, 4.6, z); roof.castShadow = true; S.add(roof);
    for (const sx of [-3.5, 3.5]) this.addBox(0.2, 3.4, 0.2, x + sx, 0, z + 1.4, this.darkMat, false);
    const sign = this.makeSign('PEIXARIA', '#0288d1', '#fff', 6, 1.4); sign.position.set(x, 3.2, z + 1.6); S.add(sign);
    this.locations.fishing = { x: 120, z: WATER_Z - 6, zone: { x: 112, z: WATER_Z - 10 }, spot: { x: 120, z: WATER_Z + 60 }, market: { x, z: z + 4 } };
  }

  buildMoon() {
    const T = THREE, S = this.scene, r = mulberry32(2025);
    const moonTex = canvasTexture(256, 256, (g) => {
      g.fillStyle = '#9e9e9e'; g.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 1800; i++) { const v = 120 + Math.random() * 60; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(Math.random() * 256, Math.random() * 256, 2, 2); }
      for (let i = 0; i < 14; i++) { const x = Math.random() * 256, y = Math.random() * 256, rr = 4 + Math.random() * 14;
        g.fillStyle = 'rgba(70,70,70,0.35)'; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
        g.strokeStyle = 'rgba(230,230,230,0.4)'; g.lineWidth = 2; g.beginPath(); g.arc(x - 1, y - 1, rr, 0, 7); g.stroke(); }
    }, T);
    moonTex.wrapS = moonTex.wrapT = T.RepeatWrapping; moonTex.repeat.set(40, 40);
    const ground = new T.Mesh(new T.PlaneGeometry(800, 800), new T.MeshStandardMaterial({ map: moonTex, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.position.set(MX, 0, MZ); ground.receiveShadow = true; S.add(ground);
    const rockMat = new T.MeshStandardMaterial({ color: 0x8d8d8d, flatShading: true });
    const craterMat = new T.MeshStandardMaterial({ color: 0x7a7a7a, roughness: 1 });
    for (let i = 0; i < 40; i++) {
      const x = MX + (r() - 0.5) * 560, z = MZ + (r() - 0.5) * 560;
      if (Math.hypot(x - MX, z - MZ) < 70) continue;
      const rad = 4 + r() * 12;
      const c = new T.Mesh(new T.TorusGeometry(rad, rad * 0.18, 6, 24), craterMat); c.rotation.x = -Math.PI / 2; c.scale.z = 0.4; c.position.set(x, 0, z); c.receiveShadow = true; S.add(c);
    }
    for (let i = 0; i < 60; i++) {
      const x = MX + (r() - 0.5) * 560, z = MZ + (r() - 0.5) * 560;
      if (Math.hypot(x - MX, z - MZ) < 60) continue;
      const s = 0.6 + r() * 2.4;
      const m = new T.Mesh(new T.DodecahedronGeometry(s), rockMat); m.position.set(x, s * 0.5, z); m.rotation.set(r(), r(), r()); m.castShadow = true; S.add(m);
      if (s > 1.4) this.addCollider(x - s * 0.7, x + s * 0.7, z - s * 0.7, z + s * 0.7, s * 1.2);
    }
    // landing pad + rocket
    const pad = new T.Mesh(new T.CylinderGeometry(12, 12, 0.3, 32), new T.MeshStandardMaterial({ color: 0x455a64 })); pad.position.set(MX, 0.15, MZ); pad.receiveShadow = true; S.add(pad);
    const ring = new T.Mesh(new T.RingGeometry(8, 9, 32), new T.MeshBasicMaterial({ color: 0xffeb3b, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.set(MX, 0.32, MZ); S.add(ring);
    this.moonRocket = makeRocket(); this.moonRocket.position.set(MX, 0.3, MZ - 2); S.add(this.moonRocket);
    this.addCollider(MX - 2.6, MX + 2.6, MZ - 4.6, MZ + 0.6, 30);
    this.locations.moonPad = { x: MX + 6, z: MZ + 10 };
    this.locations.moonReturn = { x: MX, z: MZ, zone: { x: MX - 10, z: MZ + 10 } };
    // domes
    const domeMat = new T.MeshStandardMaterial({ color: 0xeceff1, metalness: 0.3, roughness: 0.4 });
    const glassMat = new T.MeshStandardMaterial({ color: 0x80deea, transparent: true, opacity: 0.55, metalness: 0.4, roughness: 0.1 });
    const dome = (x, z, rad, glass) => {
      const d = new T.Mesh(new T.SphereGeometry(rad, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), glass ? glassMat : domeMat);
      d.position.set(x, 0, z); d.castShadow = true; S.add(d);
      const base = new T.Mesh(new T.CylinderGeometry(rad + 0.3, rad + 0.3, 0.6, 24), new T.MeshStandardMaterial({ color: 0x607d8b })); base.position.set(x, 0.3, z); S.add(base);
      const door = new T.Mesh(new T.BoxGeometry(2.2, 2.6, 1.2), new T.MeshStandardMaterial({ color: 0x37474f })); door.position.set(x, 1.3, z + rad - 0.3); S.add(door);
      const light = new T.Mesh(new T.SphereGeometry(0.2, 8, 6), new T.MeshStandardMaterial({ color: 0x00e676, emissive: 0x00e676, emissiveIntensity: 1.5 })); light.position.set(x, 2.9, z + rad + 0.3); S.add(light);
      const h = rad * 0.72; this.addCollider(x - h, x + h, z - h, z + h, rad * 0.9);
      return { x, z: z + rad + 3, door: { x, z: z + rad + 0.5 } };
    };
    const station = (key, x, z, label, bg, rad = 11) => {
      const d = dome(x, z, rad, false);
      const sign = this.makeSign(label, bg, '#fff', 11, 2.2); sign.position.set(x, rad * 0.75 + 1.5, z + rad * 0.55); S.add(sign);
      this.locations[key] = { x, z, zone: { x, z: z + rad + 4 }, spawn: { x: x + rad + 6, z: z + rad + 6, ry: 0 } };
      return d;
    };
    station('spaceshop', MX - 45, MZ - 40, 'LOJA ESPACIAL', '#6a1b9a');
    station('mining', MX + 50, MZ - 45, 'MINERAÇÃO LUNAR', '#e65100');
    station('spacedelivery', MX - 50, MZ + 40, 'CORREIO ESPACIAL', '#1565c0');
    station('repair', MX + 50, MZ + 40, 'CONTROLE DE ANTENAS', '#2e7d32');
    this.locations.refinery = { x: MX + 50, z: MZ - 45 + 11 + 4 };
    this.moonHouses = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + 0.2, rr = 140 + (i % 3) * 35;
      this.moonHouses.push(dome(MX + Math.cos(a) * rr, MZ + Math.sin(a) * rr, 6 + r() * 3, i % 2 === 0));
    }
    this.crystalField = { x: MX + 120, z: MZ - 150 };
    for (let i = 0; i < 12; i++) {
      const c = new T.Mesh(new T.OctahedronGeometry(1 + r() * 1.5), new T.MeshStandardMaterial({ color: 0xb388ff, emissive: 0x7c4dff, emissiveIntensity: 0.5, flatShading: true }));
      c.position.set(this.crystalField.x + (r() - 0.5) * 70, 1, this.crystalField.z + (r() - 0.5) * 70); c.scale.y = 1.8; S.add(c);
    }
    this.antennas = [];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 + 0.5, rr = 90 + (i % 2) * 120;
      const x = MX + Math.cos(a) * rr, z = MZ + Math.sin(a) * rr;
      const pole = new T.Mesh(new T.CylinderGeometry(0.2, 0.3, 9, 8), new T.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.6 })); pole.position.set(x, 4.5, z); pole.castShadow = true; S.add(pole);
      const dish = new T.Mesh(new T.SphereGeometry(2, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3), new T.MeshStandardMaterial({ color: 0xeceff1, side: T.DoubleSide, metalness: 0.4 }));
      dish.position.set(x, 9, z); dish.rotation.x = 2.4; S.add(dish);
      const lamp = new T.Mesh(new T.SphereGeometry(0.35, 10, 8), new T.MeshStandardMaterial({ color: 0xff1744, emissive: 0xff1744, emissiveIntensity: 1.5 })); lamp.position.set(x, 9.6, z); S.add(lamp);
      this.addCollider(x - 0.4, x + 0.4, z - 0.4, z + 0.4, 9);
      this.antennas.push({ x, z, lamp });
    }
    // Moon boundary
    const B = 320;
    this.addCollider(MX - B - 5, MX - B, MZ - B, MZ + B, 60); this.addCollider(MX + B, MX + B + 5, MZ - B, MZ + B, 60);
    this.addCollider(MX - B, MX + B, MZ - B - 5, MZ - B, 60); this.addCollider(MX - B, MX + B, MZ + B, MZ + B + 5, 60);
    // Earth in the sky + stars
    const earthTex = canvasTexture(256, 128, (g) => {
      g.fillStyle = '#1e5fbf'; g.fillRect(0, 0, 256, 128);
      g.fillStyle = '#3fa34d'; for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(Math.random() * 256, 20 + Math.random() * 88, 10 + Math.random() * 26, 6 + Math.random() * 16, Math.random() * 3, 0, 7); g.fill(); }
      g.fillStyle = 'rgba(255,255,255,0.75)'; for (let i = 0; i < 14; i++) { g.beginPath(); g.ellipse(Math.random() * 256, Math.random() * 128, 8 + Math.random() * 20, 2 + Math.random() * 4, 0, 0, 7); g.fill(); }
    }, T);
    this.earthSky = new T.Mesh(new T.SphereGeometry(110, 32, 20), new T.MeshBasicMaterial({ map: earthTex, fog: false }));
    this.earthSky.position.set(MX - 500, 420, MZ - 850); S.add(this.earthSky);
    const sp = new Float32Array(2400 * 3);
    for (let i = 0; i < 2400; i++) {
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, rr = 1100, q = Math.sqrt(1 - u * u);
      sp[i * 3] = MX + Math.cos(a) * q * rr; sp[i * 3 + 1] = Math.abs(u) * rr * 0.9 + 20; sp[i * 3 + 2] = MZ + Math.sin(a) * q * rr;
    }
    const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.BufferAttribute(sp, 3));
    const st = new T.Points(sg, new T.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false, fog: false }));
    st.frustumCulled = false; S.add(st);
    this.skyStars = st;
  }

  gravity(x) { return isSpace(x) ? 0.33 : 1; }

  randomSidewalk(rnd = Math.random) {
    const i = Math.floor(rnd() * N), j = Math.floor(rnd() * N);
    const side = Math.floor(rnd() * 4), t = (rnd() - 0.5) * 48;
    const x = bc(i), z = bc(j), o = 27.8;
    return [{ x: x + t, z: z - o }, { x: x + t, z: z + o }, { x: x - o, z: z + t }, { x: x + o, z: z + t }][side];
  }

  inBlock(x, z) {
    const i = Math.round(x / CELL + (N - 1) / 2), j = Math.round(z / CELL + (N - 1) / 2);
    return i >= 0 && i < N && j >= 0 && j < N && Math.abs(x - bc(i)) <= 30 && Math.abs(z - bc(j)) <= 30;
  }

  groundAt(x, z, y, step = STEP) {
    let g = 0;
    if (z > WATER_Z) g = -1.6;
    else if (this.inBlock(x, z)) g = 0.15;
    const q = this.grid.query(x, z, x, z, this._q);
    for (const c of q) {
      if (x < c.x0 || x > c.x1 || z < c.z0 || z > c.z1) continue;
      let h;
      if (c.ramp) {
        let t = c.axis === 'x' ? (x - c.x0) / (c.x1 - c.x0) : (z - c.z0) / (c.z1 - c.z0);
        if (c.dir < 0) t = 1 - t;
        h = 0.15 + t * c.hMax;
      } else h = c.h;
      if (h <= y + step && h > g) g = h;
    }
    return g;
  }

  isWater(x, z) { return z > WATER_Z && !(x > 116 && x < 124 && z < WATER_Z + 65); }

  // Push a vertical cylinder (p.x,p.z, radius r) out of solid boxes. Returns hit normal or null.
  pushCircle(p, r, height = 1.8, step = STEP) {
    const q = this.grid.query(p.x - r, p.z - r, p.x + r, p.z + r, this._q);
    let hx = 0, hz = 0, hit = false;
    for (const c of q) {
      if (c.ramp || c.h <= p.y + step || c.y0 >= p.y + height) continue;
      const cx = clamp(p.x, c.x0, c.x1), cz = clamp(p.z, c.z0, c.z1);
      let dx = p.x - cx, dz = p.z - cz;
      const d2 = dx * dx + dz * dz;
      if (d2 >= r * r) continue;
      let nx, nz, push;
      if (d2 > 1e-8) { const d = Math.sqrt(d2); nx = dx / d; nz = dz / d; push = r - d; }
      else {
        const l = p.x - c.x0, rr = c.x1 - p.x, f = p.z - c.z0, b = c.z1 - p.z;
        const m = Math.min(l, rr, f, b);
        if (m === l) { nx = -1; nz = 0; } else if (m === rr) { nx = 1; nz = 0; } else if (m === f) { nx = 0; nz = -1; } else { nx = 0; nz = 1; }
        push = m + r;
      }
      p.x += nx * push; p.z += nz * push; hx += nx; hz += nz; hit = true;
    }
    if (!hit) return null;
    const l = Math.hypot(hx, hz) || 1;
    this._hit.nx = hx / l; this._hit.nz = hz / l;
    return this._hit;
  }

  pointBlocked(x, y, z) {
    const q = this.grid.query(x, z, x, z, this._q);
    for (const c of q) if (!c.ramp && x > c.x0 && x < c.x1 && z > c.z0 && z < c.z1 && y < c.h && y > c.y0) return true;
    return false;
  }

  // returns fraction (0..1) along from->to that is free of buildings
  segmentFree(from, to) {
    const dx = to.x - from.x, dy = to.y - from.y, dz = to.z - from.z;
    const len = Math.hypot(dx, dy, dz), steps = Math.ceil(len / 0.5);
    for (let s = 1; s <= steps; s++) {
      const t = s / steps;
      if (this.pointBlocked(from.x + dx * t, from.y + dy * t, from.z + dz * t)) return Math.max(0, (s - 1.5) / steps);
    }
    return 1;
  }

  setupLights() {
    const T = THREE;
    this.hemi = new T.HemisphereLight(0xbfe6ff, 0x5a7d3a, 0.9);
    this.scene.add(this.hemi);
    this.sun = new T.DirectionalLight(0xffffff, 2.2);
    this.sun.castShadow = true;
    const mobile = matchMedia('(pointer: coarse)').matches;
    this.sun.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
    const sc = this.sun.shadow.camera; sc.left = -70; sc.right = 70; sc.top = 70; sc.bottom = -70; sc.near = 1; sc.far = 400;
    this.sun.shadow.bias = -0.0005; this.sun.shadow.normalBias = 0.05;
    this.scene.add(this.sun, this.sun.target);
    this.scene.fog = new T.Fog(0xaee3ff, 110, 520);
    this.scene.background = new T.Color(0xaee3ff);
    this.skyDay = new T.Color(0x9fd8ff); this.skyNight = new T.Color(0x0b1026); this.skyDusk = new T.Color(0xff9e6b);
  }

  // 0 = full night, 1 = full day
  daylight() {
    const t = this.time;
    if (t >= 7 && t <= 18) return 1;
    if (t <= 5 || t >= 20) return 0;
    return t < 12 ? (t - 5) / 2 : (20 - t) / 2;
  }
  isNight() { return this.daylight() < 0.4; }

  update(dt, focus) {
    this.time = (this.time + dt * this.daySpeed) % 24;
    const dl = this.daylight();
    const ang = ((this.time - 6) / 12) * Math.PI; // 0 at 6am, PI at 6pm
    const sx = Math.cos(ang), sy = Math.max(0.15, Math.sin(ang));
    this.sun.position.set(focus.x + sx * 120, sy * 160 + 20, focus.z + 60);
    this.sun.target.position.set(focus.x, 0, focus.z);
    this.sun.intensity = 0.15 + dl * 2.1;
    this.sun.color.setHSL(0.1, 0.6, lerp(0.75, 0.97, dl));
    this.hemi.intensity = 0.25 + dl * 0.75;
    const sky = this.scene.background;
    const dusk = (this.time > 5 && this.time < 8) || (this.time > 17 && this.time < 20) ? 1 - Math.abs(dl - 0.5) * 2 : 0;
    sky.copy(this.skyNight).lerp(this.skyDay, dl).lerp(this.skyDusk, dusk * 0.5);
    this.scene.fog.color.copy(sky);
    const night = 1 - dl;
    for (const m of this.wallMats) m.emissiveIntensity = night * 0.9;
    this.bulbMat.emissiveIntensity = night * 2.5;
    this.water.position.y = -0.3 + Math.sin(performance.now() * 0.001) * 0.05;
    this.skyStars.visible = isSpace(focus.x);
    if (isSpace(focus.x)) {
      sky.set(0x02030a); this.scene.fog.color.copy(sky);
      this.scene.fog.near = 250; this.scene.fog.far = 900;
      this.sun.position.set(focus.x + 120, 140, focus.z + 80);
      this.sun.intensity = 2.6; this.sun.color.set(0xffffff); this.hemi.intensity = 0.35;
      this.earthSky.rotation.y += dt * 0.02;
    } else { this.scene.fog.near = 110; this.scene.fog.far = 520; }
  }

  makeMoonMapCanvas() {
    const c = document.createElement('canvas'); c.width = 640; c.height = 640;
    const g = c.getContext('2d'), X = (x) => x - MX + 320, Z = (z) => z - MZ + 320;
    g.fillStyle = '#8f8f8f'; g.fillRect(0, 0, 640, 640);
    g.fillStyle = '#6d6d6d'; for (let i = 0; i < 80; i++) { g.beginPath(); g.arc(Math.random() * 640, Math.random() * 640, 2 + Math.random() * 8, 0, 7); g.fill(); }
    g.fillStyle = '#455a64'; g.beginPath(); g.arc(X(MX), Z(MZ), 12, 0, 7); g.fill();
    g.fillStyle = '#eceff1'; for (const h of this.moonHouses) { g.beginPath(); g.arc(X(h.x), Z(h.z - 9), 8, 0, 7); g.fill(); }
    g.fillStyle = '#b388ff'; g.beginPath(); g.arc(X(this.crystalField.x), Z(this.crystalField.z), 35, 0, 7); g.globalAlpha = 0.4; g.fill(); g.globalAlpha = 1;
    return c;
  }

  // Overview map canvas, 1px = 1m, centered at 0,0 covering [-400,400]x[-400,500]
  makeMapCanvas() {
    const c = document.createElement('canvas'); c.width = 1050; c.height = 900;
    const g = c.getContext('2d');
    g.fillStyle = '#5aa83f'; g.fillRect(0, 0, 1050, 900);
    const X = (x) => x + 650, Z = (z) => z + 400;
    g.fillStyle = '#f0dc9c'; g.fillRect(0, Z(BEACH_Z), 1050, WATER_Z - BEACH_Z);
    g.fillStyle = '#29b6f6'; g.fillRect(0, Z(WATER_Z), 1050, 900);
    g.fillStyle = '#8a8f96'; g.fillRect(X(-545), Z(-95), 80, 190);
    g.fillStyle = '#2f3237'; g.fillRect(X(AX - 15), Z(-210), 30, 420); g.fillRect(X(-465), Z(23), 95, 14);
    g.fillStyle = '#fff'; for (let zz = -200; zz < 200; zz += 20) g.fillRect(X(AX - 1), Z(zz), 2, 10);
    g.fillStyle = '#44474d'; g.fillRect(X(-EDGE - 7), Z(-EDGE - 7), 2 * EDGE + 14, 2 * EDGE + 14);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const t = SPECIAL[`${i},${j}`];
      g.fillStyle = t === 'park' ? '#6abf4b' : t ? '#d7ccc8' : '#bdbdbd';
      g.fillRect(X(bc(i) - 30), Z(bc(j) - 30), 60, 60);
    }
    g.fillStyle = '#8a8f99';
    for (const b of this.buildings) g.fillRect(X(b.x0), Z(b.z0), b.x1 - b.x0, b.z1 - b.z0);
    return c;
  }
}
