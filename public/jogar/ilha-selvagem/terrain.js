import * as THREE from 'three';
import { CHUNK, BIOMES, WATER } from './shared/world.js';
import { buildChunkMesh } from './objects.js';

const SEG = 24;            // quadrados por lado (2 m cada)
const STEP = CHUNK / SEG;
const bcol = {}; for (const k in BIOMES) bcol[k] = new THREE.Color(BIOMES[k].c);
const FOAM = new THREE.Color(0xeafcff), SNOW = new THREE.Color(0xf4f8fb), ROCK = new THREE.Color(0x7d7b78), DEEP = new THREE.Color(0x14324a), TMP = new THREE.Color();

export class Terrain {
  constructor(scene, world, objMat, TR = 7, OR = 4) {
    this.TR = TR; this.OR = OR; // pedaços de terreno / de árvores visíveis ao redor
    this.scene = scene; this.world = world; this.objMat = objMat;
    this.chunks = new Map(); this.taken = new Set();
    this.mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0 });
    this.queue = [];
  }
  buildTerrain(cx, cz) {
    const W = this.world, n = SEG + 3;
    const H = new Float32Array(n * n), B = new Array(n * n);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
      const s = W.sample(cx * CHUNK + (i - 1) * STEP, cz * CHUNK + (j - 1) * STEP);
      H[j * n + i] = s.h; B[j * n + i] = s.b;
    }
    const V = SEG + 1, pos = new Float32Array(V * V * 3), nor = new Float32Array(V * V * 3), col = new Float32Array(V * V * 3);
    for (let j = 0; j < V; j++) for (let i = 0; i < V; i++) {
      const a = (j + 1) * n + (i + 1), k = j * V + i, h = H[a];
      pos[k * 3] = (i) * STEP; pos[k * 3 + 1] = h; pos[k * 3 + 2] = j * STEP;
      const dx = H[a + 1] - H[a - 1], dz = H[a + n] - H[a - n];
      const nx = -dx, ny = 2 * STEP, nz = -dz, l = Math.hypot(nx, ny, nz);
      nor[k * 3] = nx / l; nor[k * 3 + 1] = ny / l; nor[k * 3 + 2] = nz / l;
      const b = B[a]; TMP.copy(bcol[b]);
      const wx = cx * CHUNK + i * STEP, wz = cz * CHUNK + j * STEP;
      const slope = 1 - ny / l;
      const noise = (Math.sin(wx * 0.7) * Math.cos(wz * 0.9) + Math.sin(wx * 0.23 + wz * 0.31)) * 0.035;
      if (h < WATER) { TMP.lerp(DEEP, Math.min(1, -h / 22) * (b === 'mar_profundo' ? 0.9 : 0.75)); }
      else {
        if (slope > 0.32 && h > 3) TMP.lerp(ROCK, Math.min(1, (slope - 0.32) * 3.4));
        if (h > 34 || (h > 22 && BIOMES[b] && (b === 'pico' || b === 'neve'))) TMP.lerp(SNOW, Math.min(1, (h - 30) / 8 + 0.4) * (1 - Math.min(1, slope * 1.5)));
      }
      // manchas de cor em grande escala (grama mais clara/escura) para o chão não ficar chapado
      const patch = Math.sin(wx * 0.018 + Math.sin(wz * 0.013) * 2) * Math.cos(wz * 0.021 - Math.sin(wx * 0.011) * 2);
      if (h >= WATER && BIOMES[b] && !BIOMES[b].agua) TMP.offsetHSL(patch * 0.012, patch * 0.05, patch * 0.045);
      // espuma na beira do mar e areia molhada
      if (h < WATER && h > -0.9) TMP.lerp(FOAM, (1 - (-h) / 0.9) * 0.55);
      else if (h >= WATER && h < 0.55 && (b === 'praia')) TMP.multiplyScalar(0.86 + (h / 0.55) * 0.14);
      TMP.offsetHSL(0, 0, noise);
      col[k * 3] = TMP.r; col[k * 3 + 1] = TMP.g; col[k * 3 + 2] = TMP.b;
    }
    const idx = new Uint16Array(SEG * SEG * 6); let q = 0;
    for (let j = 0; j < SEG; j++) for (let i = 0; i < SEG; i++) {
      const a = j * V + i, b = a + 1, c = a + V, d = c + 1;
      idx[q++] = a; idx[q++] = c; idx[q++] = b; idx[q++] = b; idx[q++] = c; idx[q++] = d;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(new THREE.BufferAttribute(idx, 1)); g.computeBoundingSphere(); g.boundingSphere.radius += 40; g.boundingSphere.center.y = 0;
    const m = new THREE.Mesh(g, this.mat); m.position.set(cx * CHUNK, 0, cz * CHUNK); m.receiveShadow = true;
    return m;
  }
  rebuildObjects(c) {
    if (c.objMesh) { this.scene.remove(c.objMesh); c.objMesh.geometry.dispose(); c.objMesh = null; }
    const list = this.world.chunkObjects(c.cx, c.cz);
    const m = buildChunkMesh(list, this.taken, this.objMat);
    if (m) { c.objMesh = m; this.scene.add(m); }
  }
  setTaken(id, isTaken) {
    if (isTaken) this.taken.add(id); else this.taken.delete(id);
    const [cx, cz] = id.split(',').map(Number);
    const c = this.chunks.get(cx + ',' + cz);
    if (c && c.hasObjects) { c.dirty = true; }
  }
  update(px, pz, budgetMs = 5) {
    const pcx = Math.floor(px / CHUNK), pcz = Math.floor(pz / CHUNK);
    const t0 = performance.now();
    // descarregar longe
    for (const [k, c] of this.chunks) {
      const d = Math.max(Math.abs(c.cx - pcx), Math.abs(c.cz - pcz));
      if (d > this.TR + 2) { this.scene.remove(c.mesh); c.mesh.geometry.dispose(); if (c.objMesh) { this.scene.remove(c.objMesh); c.objMesh.geometry.dispose(); } this.chunks.delete(k); }
      else if (c.hasObjects && d > this.OR + 1) { if (c.objMesh) { this.scene.remove(c.objMesh); c.objMesh.geometry.dispose(); c.objMesh = null; } c.hasObjects = false; }
    }
    // carregar perto -> longe
    const need = [];
    for (let i = -this.TR; i <= this.TR; i++) for (let j = -this.TR; j <= this.TR; j++) {
      const d = Math.hypot(i, j); if (d > this.TR + 0.4) continue;
      need.push([d, pcx + i, pcz + j]);
    }
    need.sort((a, b) => a[0] - b[0]);
    for (const [d, cx, cz] of need) {
      if (performance.now() - t0 > budgetMs) break;
      const key = cx + ',' + cz; let c = this.chunks.get(key);
      if (!c) { const mesh = this.buildTerrain(cx, cz); this.scene.add(mesh); c = { cx, cz, mesh, objMesh: null, hasObjects: false, dirty: false }; this.chunks.set(key, c); }
      if (!c.hasObjects && d <= this.OR) { c.hasObjects = true; this.rebuildObjects(c); }
      else if (c.dirty) { c.dirty = false; this.rebuildObjects(c); }
    }
  }
}
