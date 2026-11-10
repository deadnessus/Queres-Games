import * as THREE from 'three';
import { mergeGeometries } from '../lib/BufferGeometryUtils.js';
import { CLASSES, ELEMENTS, buildCharacter, buildGunModel, poseCharacter, flashModel, setModelOpacity, randomChar } from './character.js';
import { Effects, noiseTexture } from './effects.js';
import { input } from './input.js';
import { sfx } from './audio.js';
import { escapeHtml } from './fight.js';

const HALF = 104;
const TEAM_COL = [0x3d8bff, 0xff4545];
const TEAM_CSS = ['b', 'r'];
const TEAM_NAME = ['Azul', 'Vermelho'];
const START_TICKETS = 120;
const GRAV = -24;

const WEAPONS = {
  rifle: { name: 'Fuzil de Assalto', dmg: 24, rate: 0.1, mag: 30, reserve: 180, spread: 0.022, aimSpread: 0.006, auto: true, reload: 1.8, zoom: 1.5, sound: 'rifle', recoil: 0.012 },
  sniper: { name: 'Rifle de Precisão', dmg: 95, rate: 1.15, mag: 5, reserve: 35, spread: 0.06, aimSpread: 0.0004, auto: false, reload: 2.6, zoom: 4.5, scope: true, sound: 'sniper', recoil: 0.05 },
  lmg: { name: 'Metralhadora Pesada', dmg: 19, rate: 0.075, mag: 100, reserve: 300, spread: 0.032, aimSpread: 0.012, auto: true, reload: 3.6, zoom: 1.35, sound: 'lmg', recoil: 0.01 },
  smg: { name: 'Submetralhadora', dmg: 16, rate: 0.064, mag: 40, reserve: 240, spread: 0.026, aimSpread: 0.01, auto: true, reload: 1.6, zoom: 1.3, sound: 'smg', recoil: 0.008 },
  pistol: { name: 'Pistola', dmg: 30, rate: 0.2, mag: 12, reserve: 72, spread: 0.018, aimSpread: 0.006, auto: false, reload: 1.3, zoom: 1.2, sound: 'pistol', recoil: 0.02 },
};

const ABILITY_CD = { granada: 7, camuflagem: 22, muralha: 20, cura: 14 };

const ITEM_TYPES = {
  vida: { nome: 'Kit Médico', color: 0xffffff, accent: 0xe02020, ico: '✚' },
  municao: { nome: 'Munição', color: 0x4b5a2a, accent: 0xd8b84a, ico: '▮' },
  colete: { nome: 'Colete Blindado', color: 0x2b4f7a, accent: 0x9fc6ff, ico: '⛨' },
  habilidade: { nome: 'Recarga de Habilidade', color: 0x5a2b7a, accent: 0xd99cff, ico: '★' },
  radio: { nome: 'Rádio: Ataque Aéreo', color: 0x333333, accent: 0xff9a2a, ico: '✈' },
  adrenalina: { nome: 'Adrenalina', color: 0x7a2b2b, accent: 0xffe14a, ico: '⚡' },
};

// Rótulo do comando: nome da tecla no teclado ou do botão na tela de toque.
const isTouch = () => document.body.classList.contains('touch');
function keyName(p, kb1, kb2, touchLabel) { return isTouch() ? touchLabel : (p.pIndex === 0 ? kb1 : kb2); }

const P_CTRL = [
  { mouse: true, up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD', jump: 'Space', run: 'ShiftLeft', reload: 'KeyR', use: 'KeyE', ability: 'KeyQ', air: 'KeyG', w1: 'Digit1', w2: 'Digit2' },
  { mouse: false, up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', jump: 'Enter', run: 'ShiftRight', reload: 'KeyP', use: 'KeyU', ability: 'KeyY', air: 'KeyH', w1: 'Digit9', w2: 'Digit0', fire: 'KeyO', aim: 'KeyN', turnL: 'KeyJ', turnR: 'KeyL', lookU: 'KeyI', lookD: 'KeyK' },
];

// ---------- utilidades de colisão / raio ----------
const AX = ['x', 'y', 'z'];
function rayAABB(o, d, min, max, maxT) {
  let tmin = 0; let tmax = maxT;
  for (let i = 0; i < 3; i++) {
    const a = AX[i];
    if (Math.abs(d[a]) < 1e-9) { if (o[a] < min[a] || o[a] > max[a]) return -1; continue; }
    let t1 = (min[a] - o[a]) / d[a]; let t2 = (max[a] - o[a]) / d[a];
    if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
    if (t1 > tmin) tmin = t1;
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return -1;
  }
  return tmin;
}
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _min = new THREE.Vector3();
const _max = new THREE.Vector3();
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fwd = (yaw, out = new THREE.Vector3()) => out.set(-Math.sin(yaw), 0, -Math.cos(yaw));
function dirFrom(yaw, pitch, out = new THREE.Vector3()) {
  const c = Math.cos(pitch);
  return out.set(-Math.sin(yaw) * c, Math.sin(pitch), -Math.cos(yaw) * c);
}

export class BattlefieldGame {
  constructor(renderer, opts) {
    this.renderer = renderer;
    this.opts = opts;
    this.twoP = opts.twoPlayers;
    this.diff = opts.difficulty;
    this.scene = new THREE.Scene();
    this.fx = new Effects(this.scene);
    this.colliders = [];
    this.soldiers = [];
    this.vehicles = [];
    this.items = [];
    this.flags = [];
    this.projectiles = [];
    this.walls = [];
    this.strikes = [];
    this.fires = [];
    this.time = 0;
    this.tickets = [START_TICKETS, START_TICKETS];
    this.drainT = 0;
    this.artilleryT = 10;
    this.over = false;
    this.staticBuckets = new Map();
    this.mats = {};
    this.buildWorld();
    this.spawnVehicles();
    this.spawnItems();
    this.createSoldiers();
    this.buildHud();
    this.banner('CONQUISTA', 'Capture as bandeiras A, B e C — destrua os tickets inimigos', 3.5);
  }

  // ======================================================================
  // MUNDO
  // ======================================================================
  mat(key, color, extra = {}) {
    if (!this.mats[key]) this.mats[key] = new THREE.MeshStandardMaterial({ color, roughness: 0.9, ...extra });
    return this.mats[key];
  }

  // caixa estática (y = base). Mescla geometria por material para desempenho.
  sbox(x, y, z, w, h, d, matKey, solid = true, rotY = 0) {
    const g = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Matrix4().makeRotationY(rotY).setPosition(x, y + h / 2, z);
    g.applyMatrix4(m);
    this.addStatic(g, matKey);
    if (solid) {
      const swap = Math.abs(Math.sin(rotY)) > 0.7;
      const hw = (swap ? d : w) / 2; const hd = (swap ? w : d) / 2;
      this.colliders.push({ min: new THREE.Vector3(x - hw, y, z - hd), max: new THREE.Vector3(x + hw, y + h, z + hd) });
    }
  }
  sgeo(geo, x, y, z, matKey, rx = 0, ry = 0, rz = 0, s = 1) {
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(s, s, s));
    const g = geo.clone().applyMatrix4(m);
    this.addStatic(g, matKey);
  }
  collider(x, y, z, w, h, d) {
    this.colliders.push({ min: new THREE.Vector3(x - w / 2, y, z - d / 2), max: new THREE.Vector3(x + w / 2, y + h, z + d / 2) });
  }
  addStatic(g, matKey) {
    const ng = g.index ? g.toNonIndexed() : g;
    for (const k of Object.keys(ng.attributes)) if (!['position', 'normal', 'uv'].includes(k)) ng.deleteAttribute(k);
    if (!this.staticBuckets.has(matKey)) this.staticBuckets.set(matKey, []);
    this.staticBuckets.get(matKey).push(ng);
  }
  flushStatic() {
    for (const [key, list] of this.staticBuckets) {
      const merged = mergeGeometries(list, false);
      const mesh = new THREE.Mesh(merged, this.mats[key]);
      mesh.castShadow = true; mesh.receiveShadow = true;
      this.scene.add(mesh);
      list.forEach((g) => g.dispose());
    }
    this.staticBuckets.clear();
  }

  buildWorld() {
    const s = this.scene;
    s.background = new THREE.Color(0x8a7d6c);
    s.fog = new THREE.Fog(0x8a7d6c, 35, 230);

    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { top: { value: new THREE.Color(0x4a4e57) }, mid: { value: new THREE.Color(0xb88a5a) }, bot: { value: new THREE.Color(0x6b5a48) } },
      vertexShader: 'varying vec3 vp; void main(){ vp = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 bot; varying vec3 vp; void main(){ float h = vp.y; vec3 c = h > 0.0 ? mix(mid, top, pow(h, 0.5)) : bot; gl_FragColor = vec4(c, 1.0); }',
    });
    s.add(new THREE.Mesh(new THREE.SphereGeometry(400, 24, 16), skyMat));

    s.add(new THREE.HemisphereLight(0xd8c8b0, 0x40362a, 0.85));
    const sun = new THREE.DirectionalLight(0xffc890, 1.7);
    sun.position.set(60, 70, 30);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -110; sc.right = 110; sc.top = 110; sc.bottom = -110; sc.near = 10; sc.far = 260;
    sun.shadow.bias = -0.0008;
    s.add(sun);

    // chão
    const mud = noiseTexture(['#5c5440', '#4a4334', '#6b6248', '#3e3a2c', '#56603a'], 512, 4000, 24);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.MeshStandardMaterial({ map: mud, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    s.add(ground);
    // estrada de terra
    const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 200), new THREE.MeshStandardMaterial({ map: noiseTexture(['#6e5c44', '#5e4e3a', '#7d6a50'], 256, 1500, 1), roughness: 1 }));
    road.material.map.repeat.set(1, 12);
    road.rotation.x = -Math.PI / 2; road.position.y = 0.02; road.receiveShadow = true;
    s.add(road);

    // materiais
    this.mat('concrete', 0x8b857a);
    this.mat('brick', 0x8a5a44);
    this.mat('darkconc', 0x5d5a55);
    this.mat('sand', 0x9b8a62);
    this.mat('wood', 0x6b4f33);
    this.mat('metal', 0x4b4f45, { metalness: 0.4, roughness: 0.6 });
    this.mat('rust', 0x5a3d2b, { roughness: 1 });
    this.mat('burnt', 0x2b2622, { roughness: 1 });
    this.mat('olive', 0x4d5530, { roughness: 0.8 });
    this.mat('contRed', 0x8a3326); this.mat('contBlue', 0x2f4f6e); this.mat('contGreen', 0x3f5f3a);
    this.mat('tent', 0x5e6440);
    this.mat('crater', 0x2a241c, { roughness: 1 });
    this.mat('hill', 0x5a5442, { roughness: 1, flatShading: true });

    // ---- Vila central em ruínas (bandeira B) ----
    const town = [[-20, -14, 0], [-20, 10, 1], [18, -16, 1], [20, 12, 0], [-4, -30, 0], [4, 30, 1], [-36, 0, 1], [36, -2, 0]];
    for (const [x, z, r] of town) this.building(x, z, rand(9, 13), rand(8, 11), rand(4.5, 7), r, true);
    // praça
    this.sbox(0, 0, 0, 3, 0.6, 3, 'concrete');
    this.sbox(0, 0.6, 0, 1, 2.2, 1, 'darkconc'); // pedestal quebrado
    for (let i = 0; i < 18; i++) this.rubble(rand(-30, 30), rand(-30, 30));

    // ---- Fazenda (bandeira A) ----
    this.building(-62, 22, 14, 10, 6, 0, true, 'wood');
    this.building(-48, 36, 8, 7, 4.5, 1, true, 'brick');
    for (let i = 0; i < 5; i++) this.sandbags(-55 + i * 6, 2 + (i % 2) * 2, 4, 0);
    this.sandbags(-72, 8, 5, Math.PI / 2);
    for (let i = 0; i < 6; i++) this.sbox(-66 + i * 1.6, 0, 40, 1.2, 1.2, 1.2, 'sand'); // fardos de feno
    for (let i = 0; i < 8; i++) this.fence(-80 + i * 4, 45);

    // ---- Posto militar (bandeira C) ----
    this.bunker(58, -18);
    this.container(70, -8, 0, 'contRed'); this.container(70, -8, 0, 'contBlue', 2.6);
    this.container(44, -32, Math.PI / 2, 'contGreen'); this.container(48, -4, Math.PI / 2, 'contBlue');
    this.tower(46, -16);
    for (let i = 0; i < 4; i++) this.sandbags(52 + i * 5, -2, 4, 0);
    this.sandbags(64, -30, 5, Math.PI / 2);

    // ---- Bases ----
    for (const t of [0, 1]) {
      const z = t === 0 ? 90 : -90;
      const sg = t === 0 ? -1 : 1;
      this.sandbags(-10, z + sg * 6, 6, 0); this.sandbags(10, z + sg * 6, 6, 0);
      this.sandbags(-16, z, 6, Math.PI / 2); this.sandbags(16, z, 6, Math.PI / 2);
      this.tent(-24, z + sg * 2); this.tent(24, z - sg * 2);
      for (let i = 0; i < 4; i++) this.sbox(-28 + i * 1.3, 0, z - sg * 8, 1.1, 1.1, 1.1, 'wood');
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 9, 6), this.mat('metal', 0));
      pole.position.set(0, 4.5, z + sg * 10); s.add(pole);
      const cloth = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshStandardMaterial({ color: TEAM_COL[t], side: THREE.DoubleSide }));
      cloth.position.set(1.3, 8, z + sg * 10); s.add(cloth);
    }

    // ---- Destroços espalhados ----
    const wrecks = [[-30, 40], [32, 46], [-14, -52], [28, -50], [-70, -30], [74, 28], [0, 58], [-2, -60], [60, 50], [-58, -60]];
    wrecks.forEach(([x, z], i) => this.wreck(x, z, rand(0, Math.PI), i % 3 === 0 ? 'car' : 'tank'));
    const keepOut = [[0, 0], [-56, 12], [56, -12], [-46, -8], [46, 8], [0, 6], [6, -4], [0, -14], [-12, 2], [-56, 18], [-60, 6], [-48, 24],
      [-66, 30], [56, -18], [60, -6], [50, -26], [66, -20], [-30, 46], [24, 40], [-30, -46], [30, -46], [20, 30], [-22, -30], [0, 40], [0, -40]];
    for (let i = 0; i < 40; i++) {
      const x = rand(-95, 95); const z = rand(-70, 70);
      if (Math.abs(x) < 6 || keepOut.some(([kx, kz]) => Math.hypot(kx - x, kz - z) < 7)) continue;
      const r = Math.random();
      if (r < 0.3) this.hedgehog(x, z);
      else if (r < 0.55) this.sandbags(x, z, rand(3, 6), Math.random() < 0.5 ? 0 : Math.PI / 2);
      else if (r < 0.75) this.tree(x, z);
      else this.sbox(x, 0, z, 1.4, 1.4, 1.4, 'wood');
    }
    // trincheiras (linhas de sacos de areia) na terra de ninguém
    for (let i = -4; i <= 4; i++) { this.sandbags(i * 12, 46, 6, 0); this.sandbags(i * 12 + 6, -46, 6, 0); }
    // crateras
    for (let i = 0; i < 40; i++) this.crater(rand(-95, 95), rand(-80, 80), rand(1.5, 4));

    // colinas nas bordas
    const hillGeo = new THREE.ConeGeometry(1, 1, 7);
    for (let i = 0; i < 46; i++) {
      const a = (i / 46) * Math.PI * 2;
      const d = rand(130, 175);
      const hgt = rand(14, 40); const w = rand(25, 45);
      const m = new THREE.Mesh(hillGeo, this.mats.hill);
      m.scale.set(w, hgt, w); m.position.set(Math.cos(a) * d, hgt / 2 - 2, Math.sin(a) * d);
      m.receiveShadow = true;
      s.add(m);
    }

    this.flushStatic();

    // fogos
    const firePos = [[-30, 40], [28, -50], [74, 28], [-58, -60], [-20, -14], [36, -2]];
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.9 });
    const flameGeo = new THREE.ConeGeometry(0.7, 2, 7);
    firePos.forEach(([x, z], i) => {
      const grp = new THREE.Group();
      for (let k = 0; k < 4; k++) {
        const f = new THREE.Mesh(flameGeo, flameMat);
        f.position.set(rand(-0.8, 0.8), 1 + rand(0, 0.6), rand(-0.8, 0.8));
        f.scale.setScalar(rand(0.6, 1.2));
        grp.add(f);
      }
      grp.position.set(x, 0.6, z);
      s.add(grp);
      const fire = { grp, pos: new THREE.Vector3(x, 1.5, z), smokeT: rand(0, 1) };
      if (i < 3) { const l = new THREE.PointLight(0xff7a2a, 40, 25, 1.6); l.position.set(x, 3, z); s.add(l); fire.light = l; }
      this.fires.push(fire);
    });

    // bandeiras
    const flagDefs = [['A', -56, 12], ['B', 0, 0], ['C', 56, -12]];
    for (const [name, x, z] of flagDefs) {
      const grp = new THREE.Group();
      grp.position.set(x, 0, z);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 8, 6), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.6 }));
      pole.position.y = 4; grp.add(pole);
      const cloth = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshStandardMaterial({ color: 0xdddddd, side: THREE.DoubleSide, emissive: 0x222222 }));
      cloth.position.set(1.2, 7, 0); grp.add(cloth);
      const ring = new THREE.Mesh(new THREE.RingGeometry(9.6, 10, 48), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; grp.add(ring);
      s.add(grp);
      this.flags.push({ name, pos: new THREE.Vector3(x, 0, z), owner: -1, progress: 0, cloth, ring, grp, radius: 10 });
    }
    this.bases = [new THREE.Vector3(0, 0, 86), new THREE.Vector3(0, 0, -86)];

    // luzes reutilizáveis para explosões (evita recompilar shaders)
    this.boomLights = [0, 1, 2].map(() => { const l = new THREE.PointLight(0xffa040, 0, 30, 1.5); s.add(l); return { l, t: 0 }; });
  }

  building(cx, cz, w, d, h, rot, damaged, matKey = 'concrete') {
    if (rot) { const t = w; w = d; d = t; }
    const th = 0.45;
    this.sbox(cx, 0, cz, w, 0.12, d, 'darkconc', false);
    const wall = (x0, x1, z, alongX, door) => {
      const len = Math.abs(x1 - x0);
      const n = Math.max(2, Math.round(len / 2.6));
      const seg = len / n;
      const doorIdx = door ? Math.floor(n / 2) : -1;
      for (let i = 0; i < n; i++) {
        const c = Math.min(x0, x1) + seg * (i + 0.5);
        const edge = i === 0 || i === n - 1;
        const place = (yb, hh) => {
          if (hh <= 0.05) return;
          if (alongX) this.sbox(c, yb, z, seg + 0.01, hh, th, matKey);
          else this.sbox(z, yb, c, th, hh, seg + 0.01, matKey);
        };
        let hh = h;
        if (damaged && !edge) {
          if (Math.random() < 0.18) { if (Math.random() < 0.5) this.rubble(alongX ? c : z + rand(-1, 1), alongX ? z + rand(-1, 1) : c); continue; }
          hh = h * rand(0.4, 1);
        }
        if (i === doorIdx) { if (hh > 2.9) place(2.8, hh - 2.8); continue; }
        if (!edge && i % 2 === 1 && hh > 2.6) { place(0, 1.1); place(2.2, hh - 2.2); continue; }
        place(0, hh);
      }
    };
    wall(cx - w / 2, cx + w / 2, cz + d / 2, true, true);
    wall(cx - w / 2, cx + w / 2, cz - d / 2, true, Math.random() < 0.5);
    wall(cz - d / 2 + th, cz + d / 2 - th, cx - w / 2, false, Math.random() < 0.4);
    wall(cz - d / 2 + th, cz + d / 2 - th, cx + w / 2, false, Math.random() < 0.4);
    // laje parcial (telhado destruído)
    if (Math.random() < 0.5) this.sbox(cx - w / 4, h - 0.3, cz, w / 2, 0.3, d, 'darkconc', false);
  }
  rubble(x, z) {
    for (let i = 0; i < 4; i++) {
      const sz = rand(0.3, 0.9);
      this.sbox(x + rand(-1, 1), 0, z + rand(-1, 1), sz, sz * 0.6, sz, Math.random() < 0.5 ? 'concrete' : 'brick', false, rand(0, 3));
    }
  }
  sandbags(x, z, len, rot) {
    const n = Math.round(len / 0.9);
    for (let row = 0; row < 3; row++) {
      for (let i = 0; i < n - (row % 2); i++) {
        const o = -len / 2 + 0.45 + i * 0.9 + (row % 2) * 0.45;
        const px = rot ? x : x + o; const pz = rot ? z + o : z;
        this.sbox(px, row * 0.38, pz, rot ? 0.6 : 0.85, 0.38, rot ? 0.85 : 0.6, 'sand', false, 0);
      }
    }
    this.collider(x, 0, z, rot ? 0.7 : len, 1.15, rot ? len : 0.7);
  }
  fence(x, z) {
    this.sbox(x, 0, z, 0.15, 1.4, 0.15, 'wood', false);
    for (const y of [0.5, 1.0]) this.sbox(x + 2, y, z, 4, 0.03, 0.03, 'metal', false);
  }
  hedgehog(x, z) {
    for (let i = 0; i < 3; i++) {
      const g = new THREE.BoxGeometry(0.18, 2.2, 0.18);
      this.sgeo(g, x, 0.8, z, 'rust', i === 0 ? 0.8 : 0, i * 2.1, i === 0 ? 0 : 0.8);
    }
    this.collider(x, 0, z, 1.2, 1.4, 1.2);
  }
  tree(x, z) {
    const g = new THREE.CylinderGeometry(0.18, 0.32, rand(4, 7), 6);
    this.sgeo(g, x, 2.5, z, 'burnt', rand(-0.1, 0.1), 0, rand(-0.1, 0.1));
    const br = new THREE.CylinderGeometry(0.06, 0.1, 2, 5);
    this.sgeo(br, x + 0.5, 3.5, z, 'burnt', 0, 0, -0.9);
    this.collider(x, 0, z, 0.6, 6, 0.6);
  }
  crater(x, z, r) {
    const g = new THREE.CircleGeometry(r, 14);
    this.sgeo(g, x, 0.03, z, 'crater', -Math.PI / 2);
    const t = new THREE.TorusGeometry(r, r * 0.18, 4, 14);
    this.sgeo(t, x, 0, z, 'hill', Math.PI / 2, 0, 0, 1);
  }
  container(x, z, rot, matKey, y = 0) {
    this.sbox(x, y, z, 2.5, 2.6, 6, matKey, true, rot);
  }
  bunker(x, z) {
    this.sbox(x, 0, z - 4, 10, 2.8, 0.8, 'darkconc');
    this.sbox(x, 0, z + 4, 10, 1.2, 0.8, 'darkconc');
    this.sbox(x, 2.2, z + 4, 10, 0.6, 0.8, 'darkconc');
    this.sbox(x - 5, 0, z, 0.8, 2.8, 8.8, 'darkconc');
    this.sbox(x + 5, 0, z + 2.2, 0.8, 2.8, 4.4, 'darkconc');
    this.sbox(x, 2.8, z, 10.8, 0.5, 8.8, 'concrete', false);
    this.colliders.push({ min: new THREE.Vector3(x - 5.4, 2.8, z - 4.4), max: new THREE.Vector3(x + 5.4, 3.3, z + 4.4) });
  }
  tower(x, z) {
    for (const [dx, dz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) this.sbox(x + dx, 0, z + dz, 0.25, 6, 0.25, 'wood');
    this.sbox(x, 6, z, 3.4, 0.25, 3.4, 'wood');
    this.sbox(x, 6.25, z + 1.6, 3.4, 1, 0.15, 'wood');
    this.sbox(x, 7.8, z, 3.6, 0.15, 3.6, 'metal', false);
    // escada até a torre
    for (let i = 0; i < 15; i++) this.sbox(x - 2.3, 0, z + 7.2 - i * 0.45, 1, (i + 1) * 0.4, 0.46, 'wood');
  }
  tent(x, z) {
    const g = new THREE.CylinderGeometry(0.01, 3, 2.6, 4, 1);
    this.sgeo(g, x, 1.3, z, 'tent', 0, Math.PI / 4);
    this.collider(x, 0, z, 3.8, 2.4, 3.8);
  }
  wreck(x, z, rot, kind) {
    const c = Math.cos(rot); const sn = Math.sin(rot);
    const at = (lx, lz) => [x + lx * c + lz * sn, z - lx * sn + lz * c];
    if (kind === 'tank') {
      this.sgeo(new THREE.BoxGeometry(3.2, 1.2, 5.4), x, 0.9, z, 'burnt', 0, rot, 0.08);
      for (const sd of [-1.7, 1.7]) { const [px, pz] = at(sd, 0); this.sgeo(new THREE.BoxGeometry(0.7, 1, 5.6), px, 0.5, pz, 'rust', 0, rot); }
      const [tx, tz] = at(0.4, -0.3);
      this.sgeo(new THREE.BoxGeometry(2, 0.8, 2.2), tx, 1.9, tz, 'burnt', 0.2, rot + 0.6, 0.15);
      const [bx, bz] = at(1.4, -2.2);
      this.sgeo(new THREE.CylinderGeometry(0.12, 0.14, 3, 8), bx, 1.6, bz, 'burnt', Math.PI / 2 - 0.3, rot + 0.6, 0);
      this.collider(x, 0, z, 4.6, 2.2, 4.6);
    } else {
      this.sgeo(new THREE.BoxGeometry(1.9, 0.9, 4.2), x, 0.65, z, 'rust', 0, rot, 0);
      this.sgeo(new THREE.BoxGeometry(1.7, 0.6, 2), x, 1.4, z, 'burnt', 0, rot, 0);
      this.collider(x, 0, z, 3.4, 1.6, 3.4);
    }
  }

  // ======================================================================
  // VEÍCULOS
  // ======================================================================
  spawnVehicles() {
    const defs = [
      ['jeep', -8, 76, 0], ['jeep', 8, 76, 0], ['tank', 0, 68, 0],
      ['jeep', -8, -76, Math.PI], ['jeep', 8, -76, Math.PI], ['tank', 0, -68, Math.PI],
      ['jeep', -46, -8, Math.PI / 2], ['jeep', 46, 8, -Math.PI / 2],
    ];
    for (const [type, x, z, yaw] of defs) this.vehicles.push(this.makeVehicle(type, new THREE.Vector3(x, 0, z), yaw));
  }

  makeVehicle(type, pos, yaw) {
    const grp = new THREE.Group();
    const olive = new THREE.MeshStandardMaterial({ color: type === 'tank' ? 0x56603a : 0x5d6b3a, roughness: 0.7, metalness: 0.2 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1e1e1e, roughness: 0.9 });
    const glass = new THREE.MeshStandardMaterial({ color: 0x8fb3c8, transparent: true, opacity: 0.4 });
    const add = (geo, mat, x, y, z, parent = grp) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; parent.add(m); return m; };
    const v = { type, grp, pos: grp.position, yaw, speed: 0, driver: null, alive: true, respawnT: 0, spawn: { pos: pos.clone(), yaw }, wheels: [], cannonCd: 0, mats: [olive] };
    if (type === 'jeep') {
      add(new THREE.BoxGeometry(2, 0.7, 4), olive, 0, 0.85, 0);
      add(new THREE.BoxGeometry(1.9, 0.5, 1.4), olive, 0, 1.3, -1.2);
      add(new THREE.BoxGeometry(1.8, 0.7, 0.06), glass, 0, 1.75, -0.4);
      add(new THREE.BoxGeometry(0.4, 0.5, 0.4), dark, -0.45, 1.4, 0.3);
      add(new THREE.BoxGeometry(0.4, 0.5, 0.4), dark, 0.45, 1.4, 0.3);
      add(new THREE.CylinderGeometry(0.4, 0.4, 0.25, 12), dark, 0, 1.0, 2.1).rotation.x = Math.PI / 2;
      for (const [x, z] of [[-1, -1.3], [1, -1.3], [-1, 1.3], [1, 1.3]]) {
        const w = add(new THREE.CylinderGeometry(0.45, 0.45, 0.35, 12), dark, x, 0.45, z);
        w.rotation.z = Math.PI / 2;
        v.wheels.push(w);
      }
      v.maxHp = 320; v.radius = 1.7; v.maxSpeed = 26; v.accel = 16; v.turn = 1.9; v.name = 'Jipe'; v.half = new THREE.Vector3(1.4, 1.8, 1.4);
    } else {
      add(new THREE.BoxGeometry(3.2, 1.1, 5.6), olive, 0, 1.0, 0);
      add(new THREE.BoxGeometry(2.8, 0.4, 1.0), olive, 0, 1.1, -3.0).rotation.x = 0.5;
      for (const sd of [-1.75, 1.75]) {
        add(new THREE.BoxGeometry(0.8, 1.0, 5.8), dark, sd, 0.5, 0);
        for (let i = 0; i < 5; i++) { const w = add(new THREE.CylinderGeometry(0.4, 0.4, 0.82, 10), dark, sd, 0.45, -2.2 + i * 1.1); w.rotation.z = Math.PI / 2; v.wheels.push(w); }
      }
      const turret = new THREE.Group();
      turret.position.set(0, 1.55, 0.3);
      grp.add(turret);
      add(new THREE.BoxGeometry(2.1, 0.85, 2.4), olive, 0, 0.42, 0, turret);
      add(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 10), olive, 0.5, 0.95, 0.4, turret);
      const barrel = add(new THREE.CylinderGeometry(0.13, 0.16, 3.6, 10), olive, 0, 0.45, -2.8, turret);
      barrel.rotation.x = Math.PI / 2;
      v.turret = turret; v.turretYaw = 0;
      v.maxHp = 1400; v.radius = 2.8; v.maxSpeed = 10; v.accel = 6; v.turn = 0.9; v.name = 'Tanque'; v.half = new THREE.Vector3(2.4, 2.4, 2.4);
    }
    v.hp = v.maxHp;
    grp.position.copy(pos);
    grp.rotation.y = yaw;
    this.scene.add(grp);
    return v;
  }

  updateVehicle(v, dt) {
    if (!v.alive) {
      v.respawnT -= dt;
      if (v.respawnT <= 0) {
        v.alive = true; v.hp = v.maxHp; v.speed = 0;
        v.pos.copy(v.spawn.pos); v.yaw = v.spawn.yaw;
        v.grp.visible = true;
        v.mats.forEach((m) => m.color.offsetHSL(0, 0, 0));
      }
      return;
    }
    const d = v.driver;
    const it = d ? d.intent : null;
    let throttle = 0; let steer = 0;
    if (it) { throttle = -it.mz; steer = -it.mx; }
    v.speed += throttle * v.accel * dt;
    if (!throttle) v.speed *= Math.pow(0.35, dt);
    if (it && it.jump && v.type === 'jeep') v.speed *= Math.pow(0.02, dt); // freio de mão
    v.speed = THREE.MathUtils.clamp(v.speed, -v.maxSpeed * 0.4, v.maxSpeed * (d && d.adren > 0 ? 1.2 : 1));
    const turnFactor = v.type === 'tank' ? 1 : Math.min(1, Math.abs(v.speed) / 5);
    v.yaw += steer * v.turn * dt * turnFactor * (v.speed < -0.1 ? -1 : 1);
    const f = fwd(v.yaw, _v1);
    v.pos.addScaledVector(f, v.speed * dt);
    // colisões
    const hitWall = this.pushOut(v.pos, v.radius * 0.8, 2, true);
    if (hitWall && Math.abs(v.speed) > 4) { v.speed *= -0.3; this.damageVehicle(v, Math.abs(v.speed) * (v.type === 'tank' ? 0 : 3), null); }
    v.pos.x = THREE.MathUtils.clamp(v.pos.x, -HALF, HALF);
    v.pos.z = THREE.MathUtils.clamp(v.pos.z, -HALF, HALF);
    for (const o of this.vehicles) {
      if (o === v || !o.alive) continue;
      const dx = o.pos.x - v.pos.x; const dz = o.pos.z - v.pos.z; const dd = Math.hypot(dx, dz); const min = (o.radius + v.radius) * 0.8;
      if (dd < min && dd > 0.01) { v.pos.x -= dx / dd * (min - dd); v.pos.z -= dz / dd * (min - dd); v.speed *= 0.5; }
    }
    v.grp.rotation.y = v.yaw;
    for (const w of v.wheels) w.rotation.x += v.speed * dt * 2;
    if (v.turret && d) {
      let target = d.yaw - v.yaw;
      target = Math.atan2(Math.sin(target), Math.cos(target));
      v.turretYaw += THREE.MathUtils.clamp(Math.atan2(Math.sin(target - v.turretYaw), Math.cos(target - v.turretYaw)), -1.5 * dt, 1.5 * dt);
      v.turret.rotation.y = v.turretYaw;
    }
    v.cannonCd -= dt;
    if (d && v.type === 'tank' && it.fire && v.cannonCd <= 0) this.fireCannon(v, d);
    if (d && Math.abs(v.speed) > 1 && Math.random() < dt * 6) sfx.engine(this.distToPlayer(v.pos));
    if (Math.abs(v.speed) > 6 && Math.random() < 0.3) this.fx.smoke(v.pos.clone().addScaledVector(f, -v.radius), 1, 0x6b5a44, 0.8, 0.4, 0.5);

    // atropelar
    if (Math.abs(v.speed) > 5) {
      for (const s of this.soldiers) {
        if (!s.alive || s.vehicle || s === d) continue;
        const dist = Math.hypot(s.pos.x - v.pos.x, s.pos.z - v.pos.z);
        if (dist < v.radius + 0.4) {
          if (d && s.team !== d.team) this.damageSoldier(s, 250, d, { weapon: v.name });
          else { const push = _v2.set(s.pos.x - v.pos.x, 0, s.pos.z - v.pos.z).normalize(); s.vel.addScaledVector(push, 8); }
        }
      }
    }
    if (d) { d.pos.copy(v.pos); d.pos.y = 1; }
    // fumaça quando danificado
    if (v.hp < v.maxHp * 0.35 && Math.random() < dt * 8) this.fx.smoke(v.pos.clone().setY(2), 1, 0x222222, 1.6, 2, 0.8);
  }

  fireCannon(v, d) {
    v.cannonCd = 2.4;
    const dir = dirFrom(v.yaw + v.turretYaw, THREE.MathUtils.clamp(d.pitch, -0.15, 0.35) + 0.03);
    const start = v.pos.clone().add(new THREE.Vector3(0, 2.0, 0)).addScaledVector(dir, 4.8);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd27a }));
    mesh.position.copy(start);
    this.scene.add(mesh);
    this.projectiles.push({ kind: 'shell', mesh, vel: dir.multiplyScalar(90), owner: d, life: 4 });
    this.fx.flash(start, 0xffc060, 1.6, 0.15);
    this.fx.smoke(start, 4, 0x777777, 1.2, 1, 1);
    sfx.shoot('cannon', this.distToPlayer(start));
    if (d.isPlayer) this.shakeP(d, 0.4);
    v.speed -= 1.5;
  }

  damageVehicle(v, dmg, attacker) {
    if (!v.alive || dmg <= 0) return;
    v.hp -= dmg;
    v.lastAttacker = attacker || v.lastAttacker;
    if (v.hp <= 0) {
      v.alive = false;
      v.respawnT = 30;
      v.grp.visible = false;
      const p = v.pos.clone().setY(1);
      const drv = v.driver;
      if (drv) this.exitVehicle(drv);
      this.explode(p, 7, 110, v.lastAttacker, v.name);
      if (drv && drv.alive) this.damageSoldier(drv, 70, v.lastAttacker, { weapon: 'Explosão' });
      this.fx.smoke(p, 14, 0x1a1a1a, 4, 2.5, 3);
    }
  }

  enterVehicle(s, v) {
    v.driver = s;
    s.vehicle = v;
    s.model.root.visible = false;
    s.lookOff = 0;
    if (v.type === 'tank') s.yaw = v.yaw + v.turretYaw;
    this.toast(s, isTouch() ? `${v.name} — joystick para dirigir${v.type === 'tank' ? ', ATIRAR = canhão' : ', Pular = freio'}`
      : `${v.name} — [W/S] acelerar, [A/D] virar${v.type === 'tank' ? ', [atirar] canhão' : ', [pular] freio'}`);
  }
  exitVehicle(s) {
    const v = s.vehicle;
    if (!v) return;
    v.driver = null;
    s.vehicle = null;
    s.model.root.visible = true;
    const side = new THREE.Vector3(Math.cos(v.yaw), 0, -Math.sin(v.yaw));
    s.pos.copy(v.pos).addScaledVector(side, v.radius + 1);
    s.pos.y = 0.5;
    this.pushOut(s.pos, 0.4, 2);
    s.vel.set(0, 0, 0);
  }

  // ======================================================================
  // ITENS
  // ======================================================================
  spawnItems() {
    const spots = [
      ['vida', 0, 6], ['municao', 6, -4], ['radio', 0, -14], ['adrenalina', -12, 2],
      ['vida', -56, 18], ['municao', -60, 6], ['colete', -48, 24], ['habilidade', -66, 30],
      ['vida', 56, -18], ['municao', 60, -6], ['colete', 50, -26], ['radio', 66, -20],
      ['vida', -30, 46], ['colete', 24, 40], ['municao', 0, 80], ['vida', 6, 82],
      ['vida', -30, -46], ['municao', 30, -46], ['municao', 0, -80], ['vida', -6, -82],
      ['habilidade', 20, 30], ['adrenalina', -22, -30], ['colete', 0, 40], ['habilidade', 0, -40],
    ];
    for (const [type, x, z] of spots) {
      const t = ITEM_TYPES[type];
      const grp = new THREE.Group();
      const boxM = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.6), new THREE.MeshStandardMaterial({ color: t.color, roughness: 0.6 }));
      boxM.castShadow = true;
      grp.add(boxM);
      const sym = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.62), new THREE.MeshStandardMaterial({ color: t.accent, emissive: t.accent, emissiveIntensity: 0.5 }));
      grp.add(sym);
      if (type === 'vida') { const s2 = sym.clone(); s2.scale.set(0.3, 3.2, 1); grp.add(s2); }
      const glow = new THREE.Mesh(new THREE.RingGeometry(0.7, 0.95, 24), new THREE.MeshBasicMaterial({ color: t.accent, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
      glow.rotation.x = -Math.PI / 2; glow.position.y = -0.8;
      grp.add(glow);
      grp.position.set(x, 1, z);
      this.scene.add(grp);
      this.items.push({ type, grp, pos: new THREE.Vector3(x, 0, z), active: true, respawnT: 0 });
    }
  }

  updateItems(dt) {
    for (const it of this.items) {
      if (!it.active) {
        it.respawnT -= dt;
        if (it.respawnT <= 0) { it.active = true; it.grp.visible = true; }
        continue;
      }
      it.grp.rotation.y += dt * 1.5;
      it.grp.position.y = 1 + Math.sin(this.time * 2 + it.pos.x) * 0.15;
      for (const s of this.soldiers) {
        if (!s.alive || s.vehicle) continue;
        if (Math.hypot(s.pos.x - it.pos.x, s.pos.z - it.pos.z) > 1.6) continue;
        if (this.applyItem(s, it.type)) {
          it.active = false; it.grp.visible = false; it.respawnT = 25;
          break;
        }
      }
    }
  }

  applyItem(s, type) {
    switch (type) {
      case 'vida': if (s.hp >= s.maxHp) return false; s.hp = Math.min(s.maxHp, s.hp + 60); break;
      case 'municao': {
        const g = s.guns[0];
        if (g.reserve >= g.def.reserve && s.guns[1].reserve >= s.guns[1].def.reserve) return false;
        for (const gg of s.guns) gg.reserve = gg.def.reserve;
        break;
      }
      case 'colete': if (s.armor >= 100) return false; s.armor = Math.min(100, s.armor + 60); break;
      case 'habilidade': if (s.abilityCd <= 0) return false; s.abilityCd = 0; break;
      case 'radio': if (!s.isPlayer || s.radio) return false; s.radio = true; break;
      case 'adrenalina': s.adren = 12; break;
      default: return false;
    }
    if (s.isPlayer) {
      sfx.pickup();
      const msg = type === 'radio' ? `Rádio obtido! Use [${keyName(s, 'G', 'H', 'Ataque aéreo')}] para pedir ATAQUE AÉREO` : `+ ${ITEM_TYPES[type].nome}`;
      this.toast(s, msg);
    }
    return true;
  }

  // ======================================================================
  // SOLDADOS
  // ======================================================================
  createSoldiers() {
    const per = 8;
    const [c1, c2] = this.opts.chars;
    this.players = [];
    const p1 = this.makeSoldier(c1, 0, true, 0);
    this.players.push(p1);
    if (this.twoP) this.players.push(this.makeSoldier(c2, 0, true, 1));
    while (this.soldiers.filter((s) => s.team === 0).length < per) this.makeSoldier(randomChar(), 0, false);
    for (let i = 0; i < per; i++) this.makeSoldier(randomChar(), 1, false);
    for (const s of this.soldiers) this.respawn(s, true);
  }

  makeSoldier(cfg, team, isPlayer, pIndex = -1) {
    const cls = CLASSES[cfg.cls];
    const bf = cls.bf;
    const model = buildCharacter({ ...cfg, gun: bf.weapon, team: TEAM_COL[team], hat: isPlayer ? cfg.hat : (Math.random() < 0.7 ? 'capacete' : cfg.hat) });
    this.scene.add(model.root);
    const s = {
      cfg, cls, el: ELEMENTS[cfg.el], team, isPlayer, pIndex, model, name: cfg.name,
      pos: model.root.position, vel: new THREE.Vector3(), yaw: 0, pitch: 0, onGround: true,
      maxHp: bf.hp, hp: bf.hp, armor: 0, alive: false, respawnT: 0,
      guns: [{ def: WEAPONS[bf.weapon], mag: 0, reserve: 0 }, { def: WEAPONS.pistol, mag: 0, reserve: 0 }],
      wi: 0, reloadT: 0, fireCd: 0, abilityCd: 0, camo: 0, adren: 0, burn: 0, slow: 0, burnTick: 0,
      vehicle: null, kills: 0, deaths: 0, spawnProt: 0, lastShot: -10, phase: 0, flashT: 0, scale: cls.scale,
      intent: { mx: 0, mz: 0 }, recoil: 0, lookOff: 0,
      ai: { thinkT: Math.random(), target: null, react: 0, goal: null, strafe: 1, stuckT: 0, lastPos: new THREE.Vector3(), detour: 0, detourDir: 0, burst: 0, grenadeT: rand(4, 10) },
    };
    if (isPlayer) model.root.traverse((o) => o.layers.set(3 + pIndex));
    this.soldiers.push(s);
    return s;
  }

  respawn(s, initial) {
    const options = [this.bases[s.team]];
    for (const f of this.flags) if (f.owner === s.team) options.push(f.pos, f.pos);
    const base = initial ? this.bases[s.team] : pick(options);
    for (let tries = 0; tries < 15; tries++) {
      s.pos.set(base.x + rand(-8, 8), 0, base.z + rand(-6, 6));
      if (!this.insideCollider(s.pos, 0.6)) break;
    }
    s.vel.set(0, 0, 0);
    s.yaw = s.team === 0 ? 0 : Math.PI;
    s.pitch = 0;
    s.hp = s.maxHp;
    s.armor = s.el === ELEMENTS.terra ? 50 : 0;
    for (const g of s.guns) { g.mag = g.def.mag; g.reserve = g.def.reserve; }
    s.wi = 0; s.reloadT = 0; s.fireCd = 0; s.burn = 0; s.slow = 0; s.adren = 0; s.camo = 0;
    s.alive = true;
    s.spawnProt = 2.5;
    s.model.root.visible = true;
    setModelOpacity(s.model, 1);
    s.ai.target = null; s.ai.goal = null;
    if (s.isPlayer && !initial) this.toast(s, 'Você voltou ao combate!');
  }

  insideCollider(p, r) {
    for (const c of this.colliders) {
      if (p.x > c.min.x - r && p.x < c.max.x + r && p.z > c.min.z - r && p.z < c.max.z + r && p.y < c.max.y && p.y + 1.8 > c.min.y) return true;
    }
    return false;
  }

  // Empurra um círculo para fora das caixas. Retorna true se colidiu. Também calcula o chão.
  pushOut(p, r, height, ignoreTops = false) {
    let hit = false;
    let ground = 0;
    for (const c of this.colliders) {
      if (p.x <= c.min.x - r || p.x >= c.max.x + r || p.z <= c.min.z - r || p.z >= c.max.z + r) continue;
      if (p.y + height <= c.min.y) continue;
      if (!ignoreTops && p.y >= c.max.y - 0.45) { ground = Math.max(ground, c.max.y); continue; }
      if (ignoreTops && c.max.y < 0.6) continue;
      const px1 = (c.max.x + r) - p.x; const px2 = p.x - (c.min.x - r);
      const pz1 = (c.max.z + r) - p.z; const pz2 = p.z - (c.min.z - r);
      const m = Math.min(px1, px2, pz1, pz2);
      if (m === px1) p.x += px1; else if (m === px2) p.x -= px2; else if (m === pz1) p.z += pz1; else p.z -= pz2;
      hit = true;
    }
    this._ground = ground;
    return hit;
  }

  moveSoldier(s, wish, run, jump, dt) {
    let speed = 5.4 * s.cls.bf.speed * (run ? 1.55 : 1);
    if (s.slow > 0) speed *= 0.55;
    if (s.adren > 0) speed *= 1.35;
    if (s.aiming) speed *= 0.55;
    const accel = s.onGround ? 12 : 3;
    s.vel.x += (wish.x * speed - s.vel.x) * Math.min(1, accel * dt);
    s.vel.z += (wish.z * speed - s.vel.z) * Math.min(1, accel * dt);
    if (jump && s.onGround) { s.vel.y = 8.2; s.onGround = false; }
    s.vel.y += GRAV * dt;
    s.pos.addScaledVector(s.vel, dt);
    this.pushOut(s.pos, 0.4 * s.scale, 1.9 * s.scale);
    const ground = this._ground;
    for (const v of this.vehicles) {
      if (!v.alive || v === s.vehicle) continue;
      const dx = s.pos.x - v.pos.x; const dz = s.pos.z - v.pos.z; const d = Math.hypot(dx, dz); const min = v.radius * 0.85 + 0.3;
      if (d < min && d > 0.01) { s.pos.x += dx / d * (min - d); s.pos.z += dz / d * (min - d); }
    }
    if (s.pos.y <= ground) { s.pos.y = ground; if (s.vel.y < 0) s.vel.y = 0; s.onGround = true; }
    else s.onGround = s.pos.y - ground < 0.05;
    s.pos.x = THREE.MathUtils.clamp(s.pos.x, -HALF, HALF);
    s.pos.z = THREE.MathUtils.clamp(s.pos.z, -HALF, HALF);
  }

  eye(s, out = new THREE.Vector3()) { return out.set(s.pos.x, s.pos.y + 1.9 * s.scale, s.pos.z); }

  // ---------- disparo ----------
  traceShot(o, d, range, shooter, staticOnly = false) {
    let best = range; let res = { t: range, soldier: null, head: false, vehicle: null };
    if (d.y < -1e-6) { const t = -o.y / d.y; if (t < best) { best = t; res = { t, soldier: null, vehicle: null }; } }
    for (const c of this.colliders) {
      const t = rayAABB(o, d, c.min, c.max, best);
      if (t >= 0 && t < best) { best = t; res = { t, soldier: null, vehicle: null, wall: c }; }
    }
    if (!staticOnly) {
      for (const s of this.soldiers) {
        if (!s.alive || s === shooter || s.vehicle) continue;
        const sc = s.scale;
        _min.set(s.pos.x - 0.38 * sc, s.pos.y, s.pos.z - 0.38 * sc); _max.set(s.pos.x + 0.38 * sc, s.pos.y + 1.78 * sc, s.pos.z + 0.38 * sc);
        let t = rayAABB(o, d, _min, _max, best);
        if (t >= 0 && t < best) { best = t; res = { t, soldier: s, head: false }; }
        _min.set(s.pos.x - 0.22 * sc, s.pos.y + 1.78 * sc, s.pos.z - 0.22 * sc); _max.set(s.pos.x + 0.22 * sc, s.pos.y + 2.25 * sc, s.pos.z + 0.22 * sc);
        t = rayAABB(o, d, _min, _max, best);
        if (t >= 0 && t < best) { best = t; res = { t, soldier: s, head: true }; }
      }
      for (const v of this.vehicles) {
        if (!v.alive || (shooter && shooter.vehicle === v)) continue;
        _min.set(v.pos.x - v.half.x, 0, v.pos.z - v.half.z); _max.set(v.pos.x + v.half.x, v.half.y, v.pos.z + v.half.z);
        const t = rayAABB(o, d, _min, _max, best);
        if (t >= 0 && t < best) { best = t; res = { t, vehicle: v }; }
      }
    }
    res.point = o.clone().addScaledVector(d, res.t);
    return res;
  }

  canSee(a, bPos) {
    const o = this.eye(a);
    const d = bPos.clone().sub(o);
    const dist = d.length();
    d.divideScalar(dist);
    const r = this.traceShot(o, d, dist, a, true);
    return r.t >= dist - 0.3;
  }

  tryFire(s, aimErr = 0) {
    const g = s.guns[s.wi];
    if (s.reloadT > 0 || s.fireCd > 0) return false;
    if (g.mag <= 0) {
      if (s.isPlayer) sfx.empty();
      this.startReload(s);
      s.fireCd = 0.25;
      return false;
    }
    const def = g.def;
    g.mag--;
    s.fireCd = def.rate * (s.el.effect === 'stun' ? 0.85 : 1);
    s.lastShot = this.time;
    const moving = Math.hypot(s.vel.x, s.vel.z) > 1;
    let spread = (s.aiming ? def.aimSpread : def.spread) * (moving ? 1.6 : 1) * (s.onGround ? 1 : 2) + aimErr;
    const o = this.eye(s);
    const dir = dirFrom(s.yaw, s.pitch);
    dir.x += (Math.random() - 0.5) * 2 * spread; dir.y += (Math.random() - 0.5) * 2 * spread; dir.z += (Math.random() - 0.5) * 2 * spread;
    dir.normalize();
    const res = this.traceShot(o, dir, 260, s);

    // origem visual do traçante
    let muzzle;
    if (s.isPlayer && s.view) { muzzle = new THREE.Vector3(); s.view.muzzle.getWorldPosition(muzzle); s.view.flashT = 0.05; s.recoil = Math.min(0.3, s.recoil + def.recoil * 4); s.pitch += def.recoil * (s.aiming ? 0.5 : 1); s.yaw += (Math.random() - 0.5) * def.recoil * 0.6; }
    else muzzle = o.clone().addScaledVector(fwd(s.yaw), 0.7).add(new THREE.Vector3(0, -0.35, 0));
    this.fx.tracer(muzzle, res.point, s.el.color, def.scope ? 0.15 : 0.06);
    sfx.shoot(def.sound, this.distToPlayer(s.pos, s));

    if (res.soldier) {
      const t = res.soldier;
      if (t.team !== s.team) {
        let dmg = def.dmg * (res.head ? 2 : 1) * (s.adren > 0 ? 1.25 : 1);
        if (!def.scope && res.t > 45) dmg *= 0.75;
        if (!s.isPlayer && t.isPlayer) dmg *= [0.4, 0.62, 0.9][this.diff];
        this.damageSoldier(t, dmg, s, { weapon: def.name, head: res.head, dir });
        if (s.el.effect === 'burn' && Math.random() < 0.35) t.burn = 2.5;
        if (s.el.effect === 'slow' && Math.random() < 0.5) t.slow = 1.5;
        this.fx.burst(res.point, 0xaa1111, 5, 3, 0.07, 0.35, -8, false);
        if (s.isPlayer) this.hitMarker(s, res.head);
      }
    } else if (res.vehicle) {
      const v = res.vehicle;
      if (!v.driver || v.driver.team !== s.team) this.damageVehicle(v, def.dmg * (v.type === 'tank' ? 0.12 : 0.6), s);
      this.fx.burst(res.point, 0xffe0a0, 4, 4, 0.05, 0.2, 0);
      if (s.isPlayer && v.driver && v.driver.team !== s.team) this.hitMarker(s, false);
    } else if (res.t < 250) {
      this.fx.burst(res.point, 0x8a7a60, 4, 2.5, 0.08, 0.4, -9, false);
    }
    if (g.mag === 0) this.startReload(s);
    return true;
  }

  startReload(s) {
    const g = s.guns[s.wi];
    if (s.reloadT > 0 || g.reserve <= 0 || g.mag >= g.def.mag) return;
    s.reloadT = g.def.reload;
    if (s.isPlayer) sfx.reload();
  }

  damageSoldier(t, dmg, attacker, info = {}) {
    if (!t.alive || t.spawnProt > 0) return;
    if (attacker && attacker !== t && attacker.team === t.team) return;
    if (t.armor > 0) { const a = Math.min(t.armor, dmg * 0.5); t.armor -= a; dmg -= a; }
    t.hp -= dmg;
    t.flashT = 0.1;
    flashModel(t.model, 0xff2222, 0.8);
    if (t.isPlayer) { t.hurtT = 0.5; if (attacker) t.hurtFrom = attacker.pos.clone(); }
    if (!t.isPlayer && attacker && !t.ai.target) { t.ai.target = attacker; t.ai.react = 0.2; }
    if (t.hp <= 0) this.kill(t, attacker, info);
  }

  kill(t, attacker, info) {
    t.hp = 0;
    t.alive = false;
    t.deaths++;
    t.respawnT = t.isPlayer ? 6 : 5;
    t.killer = attacker;
    if (t.vehicle) this.exitVehicle(t);
    t.burn = 0;
    this.tickets[t.team] = Math.max(0, this.tickets[t.team] - 1);
    if (attacker && attacker !== t) attacker.kills++;
    const an = attacker ? `<span class="${TEAM_CSS[attacker.team]}">${escapeHtml(attacker.name)}</span>` : '';
    const tn = `<span class="${TEAM_CSS[t.team]}">${escapeHtml(t.name)}</span>`;
    this.feed(attacker && attacker !== t ? `${an} [${info.weapon || '?'}${info.head ? ' ☠' : ''}] ${tn}` : `${tn} morreu`);
    if (attacker && attacker.isPlayer && attacker !== t) this.toast(attacker, `${info.head ? 'HEADSHOT! ' : ''}Abateu ${t.name}`);
  }

  explode(pos, radius, dmg, attacker, weapon = 'Explosão') {
    this.fx.explosion(pos, radius * 0.7);
    sfx.explosion(this.distToPlayer(pos));
    const bl = this.boomLights.reduce((a, b) => (a.t < b.t ? a : b));
    bl.l.position.copy(pos).setY(pos.y + 2); bl.t = 0.3; bl.l.intensity = 120;
    for (const s of this.soldiers) {
      if (!s.alive) continue;
      const d = s.pos.distanceTo(pos);
      if (s.isPlayer && d < radius * 4) this.shakeP(s, Math.max(0, 0.6 - d / (radius * 6)));
      if (d > radius || s.vehicle) continue;
      if (attacker && s.team === attacker.team && s !== attacker) continue;
      const f = 1 - d / radius;
      this.damageSoldier(s, dmg * (0.3 + 0.7 * f), attacker, { weapon });
      if (s.alive) { const p = _v2.copy(s.pos).sub(pos).setY(0).normalize(); s.vel.addScaledVector(p, 9 * f); s.vel.y += 5 * f; }
    }
    for (const v of this.vehicles) {
      if (!v.alive) continue;
      const d = v.pos.distanceTo(pos);
      if (d < radius + v.radius) this.damageVehicle(v, dmg * (v.type === 'tank' ? 2.5 : 2) * (1 - d / (radius + v.radius) * 0.6), attacker);
    }
  }

  // ---------- habilidades ----------
  useAbility(s) {
    if (s.abilityCd > 0 || !s.alive || s.vehicle) return false;
    const ab = s.cls.bf.ability;
    s.abilityCd = ABILITY_CD[ab];
    if (ab === 'granada') {
      const dir = dirFrom(s.yaw, s.pitch + 0.25);
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 6), new THREE.MeshStandardMaterial({ color: 0x3b4a2a }));
      const p = this.eye(s).addScaledVector(dir, 0.6);
      mesh.position.copy(p);
      mesh.castShadow = true;
      this.scene.add(mesh);
      this.projectiles.push({ kind: 'grenade', mesh, vel: dir.multiplyScalar(19).add(s.vel.clone().multiplyScalar(0.5)), owner: s, life: 2.4 });
      if (s.isPlayer) this.toast(s, 'Granada!');
    } else if (ab === 'camuflagem') {
      s.camo = 7;
      setModelOpacity(s.model, 0.18);
      if (s.isPlayer) this.toast(s, 'Camuflagem ativa — os inimigos não te veem de longe');
    } else if (ab === 'muralha') {
      const f = fwd(s.yaw);
      const c = s.pos.clone().addScaledVector(f, 3);
      const alongX = Math.abs(f.z) > Math.abs(f.x);
      const w = alongX ? 6 : 0.5; const d = alongX ? 0.5 : 6;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, 2.6, d), new THREE.MeshStandardMaterial({ color: 0x5fd4ff, emissive: 0x2a8acc, emissiveIntensity: 0.8, transparent: true, opacity: 0.45 }));
      mesh.position.set(c.x, s.pos.y + 1.3, c.z);
      this.scene.add(mesh);
      const col = { min: new THREE.Vector3(c.x - w / 2, s.pos.y, c.z - d / 2), max: new THREE.Vector3(c.x + w / 2, s.pos.y + 2.6, c.z + d / 2) };
      this.colliders.push(col);
      this.walls.push({ mesh, col, life: 15 });
      this.fx.burst(mesh.position, 0x5fd4ff, 16, 4, 0.12, 0.6, 0);
      if (s.isPlayer) this.toast(s, 'Muralha de energia erguida!');
    } else if (ab === 'cura') {
      for (const o of this.soldiers) {
        if (!o.alive || o.team !== s.team || o.pos.distanceTo(s.pos) > 9) continue;
        o.hp = Math.min(o.maxHp, o.hp + 50);
        o.burn = 0;
        this.fx.burst(this.eye(o), 0x6dff8b, 10, 2.5, 0.1, 0.7, 2);
      }
      this.fx.ring(s.pos, 0x6dff8b, 9, 0.7, s.pos.y + 0.1);
      sfx.heal();
      if (s.isPlayer) this.toast(s, 'Cura em área!');
    }
    return true;
  }

  callAirstrike(s) {
    if (!s.radio) return;
    const o = this.eye(s);
    const res = this.traceShot(o, dirFrom(s.yaw, s.pitch), 220, s);
    const target = res.point.clone().setY(0);
    s.radio = false;
    this.toast(s, 'Ataque aéreo a caminho!');
    // marcador de fumaça vermelha
    this.fx.smoke(target.clone().setY(0.5), 8, 0xcc3322, 3, 2, 1.5);
    const dir = fwd(s.yaw);
    const plane = this.makePlane();
    plane.position.copy(target).addScaledVector(dir, -160).setY(45);
    plane.rotation.y = s.yaw;
    this.scene.add(plane);
    this.strikes.push({ owner: s, target, dir: dir.clone(), plane, t: 0, drops: 0 });
    sfx.whistle();
  }

  makePlane() {
    const g = new THREE.Group();
    const m = new THREE.MeshStandardMaterial({ color: 0x55604a, metalness: 0.3 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.5, 9, 10), m); body.rotation.x = Math.PI / 2; g.add(body);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(12, 0.2, 2), m); g.add(wing);
    const tail = new THREE.Mesh(new THREE.BoxGeometry(4, 0.15, 1.2), m); tail.position.z = 4; g.add(tail);
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.6, 1.2), m); fin.position.set(0, 0.8, 4); g.add(fin);
    return g;
  }

  updateStrikes(dt) {
    for (let i = this.strikes.length - 1; i >= 0; i--) {
      const st = this.strikes[i];
      st.t += dt;
      st.plane.position.addScaledVector(st.dir, 80 * dt);
      const along = st.plane.position.clone().sub(st.target).dot(st.dir);
      if (along > -14 && st.drops < 7 && st.t >= (st.next || 0)) {
        st.next = st.t + 0.14;
        const p = st.target.clone().addScaledVector(st.dir, -12 + st.drops * 4).add(new THREE.Vector3(rand(-2, 2), 0, rand(-2, 2)));
        setTimeout(() => { if (!this.disposed) this.explode(p.setY(0.5), 7, 140, st.owner, 'Ataque Aéreo'); }, 600);
        st.drops++;
      }
      if (st.t > 5) { this.scene.remove(st.plane); this.strikes.splice(i, 1); }
    }
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      const prev = p.mesh.position.clone();
      p.vel.y += (p.kind === 'shell' ? -4 : GRAV * 0.8) * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      const pos = p.mesh.position;
      let boom = p.life <= 0;
      if (p.kind === 'grenade') {
        if (pos.y < 0.14) { pos.y = 0.14; p.vel.y *= -0.4; p.vel.x *= 0.7; p.vel.z *= 0.7; }
        for (const c of this.colliders) {
          if (pos.x > c.min.x && pos.x < c.max.x && pos.z > c.min.z && pos.z < c.max.z && pos.y > c.min.y && pos.y < c.max.y) {
            if (prev.y >= c.max.y) { pos.y = c.max.y + 0.01; p.vel.y *= -0.4; p.vel.x *= 0.7; p.vel.z *= 0.7; }
            else if (prev.x <= c.min.x || prev.x >= c.max.x) { pos.x = prev.x; p.vel.x *= -0.5; }
            else { pos.z = prev.z; p.vel.z *= -0.5; }
          }
        }
        if (Math.random() < 0.3) this.fx.burst(pos, 0xffaa55, 1, 0.3, 0.04, 0.2, 0);
      } else {
        // projétil de canhão: colide com qualquer coisa
        const dir = p.vel.clone(); const len = dir.length() * dt; dir.normalize();
        const r = this.traceShot(prev, dir, len, p.owner);
        if (r.t < len) { pos.copy(r.point); boom = true; }
        this.fx.smoke(pos, 1, 0x999999, 0.5, 0.2, 0.3);
      }
      if (boom) {
        this.explode(pos.clone(), p.kind === 'shell' ? 6.5 : 6, p.kind === 'shell' ? 130 : 110, p.owner, p.kind === 'shell' ? 'Canhão' : 'Granada');
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        this.projectiles.splice(i, 1);
      }
    }
    for (let i = this.walls.length - 1; i >= 0; i--) {
      const w = this.walls[i];
      w.life -= dt;
      w.mesh.material.opacity = 0.35 + Math.sin(this.time * 6) * 0.08;
      if (w.life <= 0) {
        this.scene.remove(w.mesh);
        this.colliders.splice(this.colliders.indexOf(w.col), 1);
        this.walls.splice(i, 1);
      }
    }
  }

  // ======================================================================
  // CONTROLE DOS JOGADORES
  // ======================================================================
  readPlayer(s, dt) {
    const c = P_CTRL[s.pIndex];
    const D = input.down; const P = input.pressed;
    const it = {
      mx: (D(c.right) ? 1 : 0) - (D(c.left) ? 1 : 0),
      mz: (D(c.down) ? 1 : 0) - (D(c.up) ? 1 : 0),
      jump: D(c.jump), jumpP: P(c.jump), run: D(c.run),
      reload: P(c.reload), use: P(c.use), ability: P(c.ability), air: P(c.air),
      w1: P(c.w1), w2: P(c.w2), lx: 0, ly: 0,
    };
    const zoom = s.aiming ? s.guns[s.wi].def.zoom : 1;
    if (c.mouse) {
      const m = input.consumeMouse();
      it.lx = m.dx * 0.0022 / zoom; it.ly = m.dy * 0.0022 / zoom;
      it.fire = input.mouse.buttons.has(0); it.fireP = input.mouse.pressed.has(0); it.aim = input.mouse.buttons.has(2);
    } else {
      it.lx = ((D(c.turnR) ? 1 : 0) - (D(c.turnL) ? 1 : 0)) * 2.6 * dt / zoom;
      it.ly = ((D(c.lookD) ? 1 : 0) - (D(c.lookU) ? 1 : 0)) * 1.7 * dt / zoom;
      it.fire = D(c.fire); it.fireP = P(c.fire); it.aim = D(c.aim);
      const t2 = input.consumeLook2();
      it.lx += t2.dx * 0.0022 / zoom; it.ly += t2.dy * 0.0022 / zoom;
    }
    const padIdx = this.twoP ? (s.pIndex === 1 ? 0 : 1) : 0;
    const pad = input.pad(padIdx);
    if (pad) {
      if (pad.lx || pad.ly) { it.mx = pad.lx; it.mz = pad.ly; }
      it.lx += pad.rx * 2.8 * dt / zoom; it.ly += pad.ry * 2.0 * dt / zoom;
      it.fire ||= pad.btn(7); it.fireP ||= pad.pressed(7); it.aim ||= pad.btn(6);
      it.reload ||= pad.pressed(2); it.jump ||= pad.btn(0); it.jumpP ||= pad.pressed(0); it.use ||= pad.pressed(1);
      it.ability ||= pad.pressed(5); it.air ||= pad.pressed(4); it.run ||= pad.btn(10);
      if (pad.pressed(3)) { it.w1 = s.wi === 1; it.w2 = s.wi === 0; }
    }
    const l = Math.hypot(it.mx, it.mz);
    if (l > 1) { it.mx /= l; it.mz /= l; }
    return it;
  }

  updatePlayer(s, dt) {
    const it = this.readPlayer(s, dt);
    s.intent = it;
    if (!s.alive) return;

    if (s.vehicle) {
      const v = s.vehicle;
      if (v.type === 'tank') { s.yaw -= it.lx; s.pitch = THREE.MathUtils.clamp(s.pitch - it.ly, -0.3, 0.5); }
      else { s.lookOff = THREE.MathUtils.clamp(s.lookOff - it.lx, -2.5, 2.5); s.pitch = THREE.MathUtils.clamp(s.pitch - it.ly, -0.4, 0.4); if (!it.lx) s.lookOff *= Math.pow(0.2, dt); }
      it.fire = v.type === 'tank' ? it.fire : false;
      if (it.use) this.exitVehicle(s);
      return;
    }

    s.yaw -= it.lx;
    s.pitch = THREE.MathUtils.clamp(s.pitch - it.ly, -1.45, 1.45);
    s.aiming = !!it.aim && s.reloadT <= 0;
    const f = fwd(s.yaw);
    const r = _v2.set(-f.z, 0, f.x);
    const wish = new THREE.Vector3().addScaledVector(f, -it.mz).addScaledVector(r, it.mx);
    if (wish.lengthSq() > 1) wish.normalize();
    this.moveSoldier(s, wish, it.run && it.mz < 0 && !s.aiming, it.jumpP, dt);

    if (it.w1 && s.wi !== 0) { s.wi = 0; s.reloadT = 0; s.fireCd = 0.35; this.rebuildViewGun(s); }
    if (it.w2 && s.wi !== 1) { s.wi = 1; s.reloadT = 0; s.fireCd = 0.3; this.rebuildViewGun(s); }
    if (it.reload) this.startReload(s);
    const def = s.guns[s.wi].def;
    if (it.fire && (def.auto ? true : it.fireP)) this.tryFire(s);
    if (it.ability) { if (!this.useAbility(s)) this.toast(s, `Habilidade recarregando (${Math.ceil(s.abilityCd)}s)`); }
    if (it.air) { if (s.radio) this.callAirstrike(s); else this.toast(s, 'Você precisa de um Rádio (item ✈) para pedir ataque aéreo'); }

    // veículo próximo
    s.nearVehicle = null;
    for (const v of this.vehicles) {
      if (!v.alive || v.driver) continue;
      if (v.pos.distanceTo(s.pos) < v.radius + 2) { s.nearVehicle = v; break; }
    }
    if (it.use && s.nearVehicle) this.enterVehicle(s, s.nearVehicle);
  }

  // ======================================================================
  // IA DOS BOTS
  // ======================================================================
  updateBot(s, dt) {
    const ai = s.ai;
    ai.thinkT -= dt;
    if (ai.thinkT <= 0) {
      ai.thinkT = 0.3 + Math.random() * 0.2;
      // alvo
      const range = 75;
      let best = null; let bd = range;
      for (const o of this.soldiers) {
        if (!o.alive || o.team === s.team) continue;
        const d = o.pos.distanceTo(s.pos);
        if (d > bd) continue;
        if (o.camo > 0 && d > 7) continue;
        const aimPos = o.vehicle ? o.vehicle.pos.clone().setY(1.2) : this.eye(o).setY(o.pos.y + 1.3 * o.scale);
        if (!this.canSee(s, aimPos)) continue;
        best = o; bd = d;
      }
      if (best !== ai.target) { ai.target = best; ai.react = [0.9, 0.55, 0.3][this.diff] + Math.random() * 0.3; }
      if (ai.target && (!ai.target.alive)) ai.target = null;
      // objetivo: bandeira
      if (!ai.goal || s.pos.distanceTo(ai.goal) < 4 || Math.random() < 0.02) {
        const notOwned = this.flags.filter((f) => f.owner !== s.team);
        let fl;
        if (notOwned.length && Math.random() < 0.85) fl = notOwned.reduce((a, b) => (a.pos.distanceTo(s.pos) < b.pos.distanceTo(s.pos) ? a : b));
        else fl = pick(this.flags);
        ai.goal = fl.pos.clone().add(new THREE.Vector3(rand(-6, 6), 0, rand(-6, 6)));
      }
      if (Math.random() < 0.2) ai.strafe *= -1;
      // habilidades
      ai.grenadeT -= 0.4;
      if (s.cls.bf.ability === 'cura' && s.hp < s.maxHp * 0.5) this.useAbility(s);
      if (s.cls.bf.ability === 'muralha' && ai.target && Math.random() < 0.08) this.useAbility(s);
      if (s.cls.bf.ability === 'camuflagem' && !ai.target && Math.random() < 0.03) this.useAbility(s);
    }

    const tgt = ai.target && ai.target.alive ? ai.target : null;
    let wish = new THREE.Vector3();
    let run = false;
    if (tgt) {
      const tp = tgt.vehicle ? tgt.vehicle.pos.clone().setY(1.2) : tgt.pos.clone().setY(tgt.pos.y + 1.3 * tgt.scale);
      const o = this.eye(s);
      const d = tp.clone().sub(o);
      const dist = d.length();
      const wantYaw = Math.atan2(-d.x, -d.z);
      const wantPitch = Math.asin(THREE.MathUtils.clamp(d.y / dist, -1, 1));
      const turn = [3, 5, 8][this.diff] * dt;
      s.yaw += THREE.MathUtils.clamp(Math.atan2(Math.sin(wantYaw - s.yaw), Math.cos(wantYaw - s.yaw)), -turn, turn);
      s.pitch += (wantPitch - s.pitch) * Math.min(1, dt * 6);
      ai.react -= dt;
      const facing = Math.abs(Math.atan2(Math.sin(wantYaw - s.yaw), Math.cos(wantYaw - s.yaw))) < 0.15;
      if (ai.react <= 0 && facing) {
        ai.burst -= dt;
        if (ai.burst > -0.35) this.tryFire(s, [0.05, 0.032, 0.02][this.diff] * Math.min(2, 0.5 + dist / 40));
        else if (ai.burst < -0.35 - rand(0.2, 0.8)) ai.burst = rand(0.3, 0.9);
      }
      if (s.cls.bf.ability === 'granada' && ai.grenadeT <= 0 && dist > 10 && dist < 30 && s.abilityCd <= 0 && Math.random() < 0.02) {
        const keep = s.pitch; s.pitch = Math.min(0.6, keep + dist * 0.008); this.useAbility(s); s.pitch = keep; ai.grenadeT = rand(6, 12);
      }
      // movimento: strafe e aproxima um pouco
      const f = fwd(s.yaw);
      const side = new THREE.Vector3(-f.z, 0, f.x);
      wish.addScaledVector(side, ai.strafe * 0.8);
      if (dist > 35) wish.addScaledVector(f, 0.8);
      else if (dist < 8) wish.addScaledVector(f, -0.5);
    } else {
      s.pitch *= 0.9;
      if (ai.goal) {
        const d = ai.goal.clone().sub(s.pos); d.y = 0;
        if (d.length() > 2) {
          d.normalize();
          wish.copy(d);
          s.yaw += THREE.MathUtils.clamp(Math.atan2(Math.sin(Math.atan2(-d.x, -d.z) - s.yaw), Math.cos(Math.atan2(-d.x, -d.z) - s.yaw)), -4 * dt, 4 * dt);
          run = true;
        }
      }
    }
    // desvio de obstáculos
    if (wish.lengthSq() > 0.01) {
      wish.normalize();
      if (ai.detour > 0) { ai.detour -= dt; wish.applyAxisAngle(_v1.set(0, 1, 0), ai.detourDir); }
      else {
        const probe = s.pos.clone().addScaledVector(wish, 1.6);
        probe.y = s.pos.y + 0.5;
        if (this.insideCollider(probe, 0.3)) {
          const left = wish.clone().applyAxisAngle(_v1.set(0, 1, 0), 1.1);
          const pl = s.pos.clone().addScaledVector(left, 1.6).setY(s.pos.y + 0.5);
          ai.detourDir = this.insideCollider(pl, 0.3) ? -1.1 : 1.1;
          ai.detour = 0.6;
          wish.applyAxisAngle(_v1.set(0, 1, 0), ai.detourDir);
        }
      }
    }
    ai.stuckT += dt;
    if (ai.stuckT > 1.5) {
      if (ai.lastPos.distanceTo(s.pos) < 1 && wish.lengthSq() > 0.01) { ai.detour = 1.2; ai.detourDir = rand(1.2, 2.4) * (Math.random() < 0.5 ? 1 : -1); ai.jump = true; }
      ai.stuckT = 0; ai.lastPos.copy(s.pos);
    }
    const jump = ai.jump; ai.jump = false;
    s.aiming = false;
    this.moveSoldier(s, wish, run && !tgt, jump, dt);
    if (s.guns[0].mag === 0 && s.guns[0].reserve <= 0) s.guns[0].reserve = 60; // bots nunca ficam sem munição
  }

  updateSoldierCommon(s, dt) {
    if (!s.alive) {
      s.respawnT -= dt;
      poseCharacter(s.model, { dead: true }, dt);
      if (s.respawnT < 2.5 && !s.isPlayer) s.model.root.visible = false;
      if (s.respawnT <= 0) this.respawn(s);
      return;
    }
    s.fireCd -= dt; s.abilityCd = Math.max(0, s.abilityCd - dt); s.spawnProt -= dt; s.adren = Math.max(0, s.adren - dt);
    s.slow = Math.max(0, s.slow - dt);
    s.recoil *= Math.pow(0.002, dt);
    if (s.camo > 0) { s.camo -= dt; if (s.camo <= 0) setModelOpacity(s.model, 1); }
    if (s.flashT > 0) { s.flashT -= dt; if (s.flashT <= 0) flashModel(s.model, 0, 0); }
    if (s.reloadT > 0) {
      s.reloadT -= dt;
      if (s.reloadT <= 0) { const g = s.guns[s.wi]; const need = g.def.mag - g.mag; const take = Math.min(need, g.reserve); g.mag += take; g.reserve -= take; }
    }
    if (s.burn > 0) {
      s.burn -= dt; s.burnTick -= dt;
      if (s.burnTick <= 0) { s.burnTick = 0.5; this.damageSoldier(s, 3, null, { weapon: 'Fogo' }); this.fx.burst(this.eye(s).setY(s.pos.y + 1), 0xff6a1a, 3, 1.5, 0.1, 0.4, 3); }
    }
    if (s.vehicle) return;
    const hs = Math.hypot(s.vel.x, s.vel.z);
    s.phase += dt * hs * 1.7;
    s.model.root.rotation.y = s.yaw + Math.PI;
    poseCharacter(s.model, { phase: s.phase, speed: Math.min(1, hs / 6), air: !s.onGround, gun: true, aimPitch: s.pitch * 0.8 }, dt);
  }

  // ======================================================================
  // BANDEIRAS E TICKETS
  // ======================================================================
  updateFlags(dt) {
    for (const f of this.flags) {
      const cnt = [0, 0];
      for (const s of this.soldiers) if (s.alive && Math.hypot(s.pos.x - f.pos.x, s.pos.z - f.pos.z) < f.radius) cnt[s.team]++;
      const diff = cnt[0] - cnt[1];
      if (diff !== 0) {
        const dir = diff > 0 ? 1 : -1;
        const before = f.owner;
        const rate = 0.12 * Math.min(3, Math.abs(diff));
        // se a bandeira é do outro time, primeiro neutraliza
        f.progress = THREE.MathUtils.clamp(f.progress + dir * rate * dt, -1, 1);
        if (f.owner === 0 && f.progress <= 0) f.owner = -1;
        if (f.owner === 1 && f.progress >= 0) f.owner = -1;
        if (f.progress >= 1) f.owner = 0;
        if (f.progress <= -1) f.owner = 1;
        if (before !== f.owner) {
          if (f.owner >= 0) {
            this.feed(`Bandeira <b>${f.name}</b> capturada pelo time <span class="${TEAM_CSS[f.owner]}">${TEAM_NAME[f.owner]}</span>`);
            for (const p of this.players) this.toast(p, f.owner === p.team ? `Bandeira ${f.name} capturada!` : `Perdemos a bandeira ${f.name}!`);
            sfx.capture();
          } else this.feed(`Bandeira <b>${f.name}</b> neutralizada`);
        }
      }
      const col = f.owner === 0 ? TEAM_COL[0] : f.owner === 1 ? TEAM_COL[1] : 0xdddddd;
      f.cloth.material.color.setHex(col);
      f.ring.material.color.setHex(col);
      const h = 2 + Math.abs(f.progress) * 5;
      f.cloth.position.y = h;
      f.cloth.rotation.y = Math.sin(this.time * 2 + f.pos.x) * 0.3;
    }
    // drenagem de tickets
    this.drainT += dt;
    if (this.drainT > 3) {
      this.drainT = 0;
      const own = [this.flags.filter((f) => f.owner === 0).length, this.flags.filter((f) => f.owner === 1).length];
      if (own[0] > own[1]) this.tickets[1] = Math.max(0, this.tickets[1] - (own[0] - own[1]));
      if (own[1] > own[0]) this.tickets[0] = Math.max(0, this.tickets[0] - (own[1] - own[0]));
    }
    if (!this.over && (this.tickets[0] <= 0 || this.tickets[1] <= 0)) {
      this.over = true;
      const win = this.tickets[0] > 0;
      this.banner(win ? 'VITÓRIA!' : 'DERROTA', win ? 'O time Azul dominou o campo de batalha' : 'O time Vermelho venceu a batalha', 4);
      const p = this.players.map((pl) => `${pl.name}: ${pl.kills} abates / ${pl.deaths} mortes`).join(' · ');
      setTimeout(() => { if (!this.disposed) this.opts.onEnd(win ? 'Vitória!' : 'Derrota', p); }, 3500);
    }
  }

  updateArtillery(dt) {
    this.artilleryT -= dt;
    if (this.artilleryT <= 0) {
      this.artilleryT = rand(7, 14);
      // explosões distantes (só visual)
      const a = rand(0, Math.PI * 2);
      const far = new THREE.Vector3(Math.cos(a) * rand(130, 170), rand(2, 10), Math.sin(a) * rand(130, 170));
      this.fx.flash(far, 0xffa040, 10, 0.5);
      this.fx.smoke(far, 6, 0x333333, 5, 3, 8);
      sfx.explosion(80);
      // bombardeio na terra de ninguém
      if (Math.random() < 0.55) {
        const p = new THREE.Vector3(rand(-80, 80), 0.3, rand(-55, 55));
        sfx.whistle();
        this.fx.ring(p, 0xff3322, 5, 1.2, 0.1);
        setTimeout(() => { if (!this.disposed) this.explode(p, 5, 55, null, 'Artilharia'); }, 1200);
      }
    }
    for (const f of this.fires) {
      f.grp.children.forEach((c, i) => { c.scale.y = 0.8 + Math.sin(this.time * 12 + i * 2) * 0.35; });
      if (f.light) f.light.intensity = 35 + Math.sin(this.time * 17 + f.pos.x) * 10;
      f.smokeT -= dt;
      if (f.smokeT <= 0) { f.smokeT = 0.35; this.fx.smoke(f.pos.clone().setY(2.5), 1, 0x2a2622, 5, 2.4, 1.2); }
    }
    for (const b of this.boomLights) { if (b.t > 0) { b.t -= dt; b.l.intensity = Math.max(0, b.t / 0.3) * 120; } }
  }

  // ======================================================================
  // CÂMERAS / VIEWMODEL
  // ======================================================================
  setupViews() {
    for (const p of this.players) {
      const cam = new THREE.PerspectiveCamera(75, 1, 0.05, 600);
      cam.rotation.order = 'YXZ';
      cam.layers.enable(1 + p.pIndex);
      cam.layers.enable(p.pIndex === 0 ? 4 : 3);
      this.scene.add(cam);
      const holder = new THREE.Group();
      cam.add(holder);
      const view = { cam, holder, gun: null, muzzle: new THREE.Object3D(), flashT: 0, baseFov: 75, shake: 0, bob: 0 };
      const flash = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffd27a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      flash.layers.set(1 + p.pIndex);
      view.flash = flash;
      p.view = view;
      this.rebuildViewGun(p);
    }
  }

  rebuildViewGun(p) {
    const v = p.view;
    if (!v) return;
    if (v.gun) v.holder.remove(v.gun);
    const g = new THREE.Group();
    const kind = p.wi === 0 ? p.cls.bf.weapon : 'pistol';
    buildGunModel(g, kind);
    // braços / mãos
    const skinMat = new THREE.MeshStandardMaterial({ color: p.cfg.skin });
    const sleeve = new THREE.MeshStandardMaterial({ color: p.cfg.color });
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.12), skinMat); hand.position.set(0, -0.08, -0.02); g.add(hand);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.5), sleeve); arm.position.set(0.02, -0.1, -0.3); g.add(arm);
    if (kind !== 'pistol') { const h2 = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.12), skinMat); h2.position.set(0, -0.06, 0.32); g.add(h2); }
    g.rotation.y = Math.PI; // cano para frente (-z)
    const tipZ = { rifle: 0.72, sniper: 1.05, lmg: 0.95, smg: 0.5, pistol: 0.2 }[kind];
    v.muzzle.position.set(0, 0.01, tipZ);
    g.add(v.muzzle);
    v.flash.position.copy(v.muzzle.position);
    g.add(v.flash);
    g.traverse((o) => { o.layers.set(1 + p.pIndex); o.castShadow = false; });
    v.holder.add(g);
    v.gun = g;
  }

  updateView(p, dt) {
    const v = p.view;
    const cam = v.cam;
    if (!p.alive) {
      // câmera de morte
      const e = this.eye(p);
      cam.position.lerp(_v1.set(p.pos.x, p.pos.y + 4, p.pos.z + 3), Math.min(1, dt * 2));
      if (p.killer && p.killer.alive) cam.lookAt(p.killer.pos.x, p.killer.pos.y + 1.5, p.killer.pos.z);
      else cam.lookAt(e);
      v.holder.visible = false;
      cam.fov = v.baseFov; cam.updateProjectionMatrix();
      return;
    }
    if (p.vehicle) {
      const veh = p.vehicle;
      const yaw = veh.type === 'tank' ? p.yaw : veh.yaw + p.lookOff;
      const back = fwd(yaw, _v1).multiplyScalar(veh.type === 'tank' ? -10 : -7.5);
      const want = veh.pos.clone().add(back).setY((veh.type === 'tank' ? 5 : 3.6) - p.pitch * 4);
      cam.position.lerp(want, Math.min(1, dt * 8));
      const look = veh.pos.clone().setY(1.8).addScaledVector(fwd(yaw), 6).add(new THREE.Vector3(0, p.pitch * 8, 0));
      cam.lookAt(look);
      v.holder.visible = false;
      cam.fov = v.baseFov; cam.updateProjectionMatrix();
      return;
    }
    v.holder.visible = true;
    this.eye(p, cam.position);
    cam.rotation.set(p.pitch + p.recoil * 0.3, p.yaw, 0);
    if (v.shake > 0) {
      cam.position.x += (Math.random() - 0.5) * v.shake; cam.position.y += (Math.random() - 0.5) * v.shake;
      v.shake = Math.max(0, v.shake - dt * 1.2);
    }
    const def = p.guns[p.wi].def;
    const targetFov = p.aiming ? v.baseFov / def.zoom : v.baseFov;
    cam.fov += (targetFov - cam.fov) * Math.min(1, dt * 14);
    cam.updateProjectionMatrix();
    // viewmodel: bob, recuo e mira
    const hs = Math.hypot(p.vel.x, p.vel.z);
    v.bob += dt * hs * 1.4;
    const bobA = p.onGround ? Math.min(1, hs / 6) : 0;
    const ads = p.aiming;
    const base = ads ? new THREE.Vector3(0, -0.13, -0.32) : new THREE.Vector3(0.22, -0.24, -0.42);
    const reloadDip = p.reloadT > 0 ? Math.sin(Math.min(1, 1 - p.reloadT / def.reload) * Math.PI) : 0;
    const tgt = base.add(new THREE.Vector3(Math.sin(v.bob) * 0.02 * bobA, -Math.abs(Math.cos(v.bob)) * 0.02 * bobA - reloadDip * 0.25, p.recoil * 0.25));
    v.holder.position.lerp(tgt, Math.min(1, dt * 16));
    v.holder.rotation.x = p.recoil * 1.2 - reloadDip * 0.6;
    v.holder.visible = !(ads && def.scope && cam.fov < v.baseFov / 2);
    v.flashT -= dt;
    v.flash.visible = v.flashT > 0;
    if (v.flash.visible) v.flash.scale.setScalar(1 + Math.random() * 1.5);
  }

  shakeP(p, a) { if (p.view) p.view.shake = Math.max(p.view.shake, a); }

  distToPlayer(pos, except) {
    let d = Infinity;
    for (const p of this.players) { if (p === except) return 0; d = Math.min(d, p.pos.distanceTo(pos)); }
    return d;
  }

  // ======================================================================
  // HUD
  // ======================================================================
  buildHud() {
    document.getElementById('bfHud').classList.remove('hidden');
    const views = document.getElementById('bfViews');
    views.innerHTML = '';
    views.classList.toggle('split', this.twoP);
    this.setupViews();
    for (const p of this.players) {
      const el = document.createElement('div');
      el.className = 'bf-view';
      el.innerHTML = `
        <div class="dmg-vig"></div>
        <div class="scope"></div>
        <div class="cross"></div>
        <div class="toast"></div>
        <div class="prompt"></div>
        <canvas class="minimap" width="150" height="150"></canvas>
        <div class="bf-stats"><div class="who">${p.cls.ico} ${escapeHtml(p.name)} <small>${p.cls.bf.role} · ${p.el.ico} ${p.el.nome}</small></div>
          <div class="bar"><em class="hp"></em></div><div class="bar armor"><em class="ar"></em></div><div class="kd"></div></div>
        <div class="bf-ammo"><div class="big"><span class="mag"></span> <small class="res"></small></div><div class="wn"></div><div class="ab"></div></div>
        <div class="vehicle-hud"></div>
        <div class="death"><div class="dt"></div><small class="ds"></small></div>`;
      views.appendChild(el);
      const q = (c) => el.querySelector(c);
      p.hud = { el, vig: q('.dmg-vig'), scope: q('.scope'), cross: q('.cross'), toast: q('.toast'), prompt: q('.prompt'), mini: q('.minimap'),
        hp: q('.hp'), ar: q('.ar'), kd: q('.kd'), mag: q('.mag'), res: q('.res'), wn: q('.wn'), ab: q('.ab'), veh: q('.vehicle-hud'),
        death: q('.death'), dt: q('.dt'), ds: q('.ds') };
      p.hud.ctx = p.hud.mini.getContext('2d');
    }
    const fl = document.getElementById('bfFlags');
    fl.innerHTML = '';
    for (const f of this.flags) { const d = document.createElement('div'); d.className = 'flag'; d.innerHTML = `${f.name}<i></i>`; fl.appendChild(d); f.hud = d; }
    this.hudTk = [document.getElementById('tkBlue'), document.getElementById('tkRed')];
    this.feedEl = document.getElementById('killfeed');
    this.feedEl.innerHTML = '';
    this.sbEl = document.getElementById('scoreboard');
    this.bannerEl = document.getElementById('bfBanner');
  }

  updateHud(dt) {
    this.hudTk[0].textContent = this.tickets[0];
    this.hudTk[1].textContent = this.tickets[1];
    for (const f of this.flags) {
      f.hud.className = 'flag' + (f.owner === 0 ? ' blue' : f.owner === 1 ? ' red' : '');
      f.hud.querySelector('i').style.width = Math.abs(f.progress) * 100 + '%';
    }
    for (const p of this.players) {
      const h = p.hud;
      const g = p.guns[p.wi];
      h.hp.style.width = (p.hp / p.maxHp * 100) + '%';
      h.ar.style.width = p.armor + '%';
      h.kd.textContent = `Abates ${p.kills} · Mortes ${p.deaths}${p.adren > 0 ? ' · ⚡ ADRENALINA ' + Math.ceil(p.adren) : ''}${p.radio ? ' · ✈ Rádio' : ''}`;
      h.kd.style.fontSize = '11px'; h.kd.style.color = '#c9d1db';
      h.mag.textContent = p.reloadT > 0 ? '...' : g.mag;
      h.res.textContent = '/ ' + g.reserve;
      h.wn.textContent = (p.reloadT > 0 ? 'RECARREGANDO · ' : '') + g.def.name;
      const ab = p.cls.bf.abilityName;
      h.ab.textContent = p.abilityCd > 0 ? `${ab}: ${Math.ceil(p.abilityCd)}s` : `${ab}: PRONTA [${keyName(p, 'Q', 'Y', 'Habilid.')}]`;
      h.ab.classList.toggle('ready', p.abilityCd <= 0);
      p.hurtT = Math.max(0, (p.hurtT || 0) - dt);
      h.vig.style.opacity = Math.max(p.hurtT, p.alive ? (1 - p.hp / p.maxHp) * 0.6 : 0.8);
      const scoped = p.alive && !p.vehicle && p.aiming && g.def.scope && p.view.cam.fov < p.view.baseFov / 2;
      h.scope.classList.toggle('on', scoped);
      h.cross.classList.toggle('hidden-c', scoped || !!p.vehicle || !p.alive || (p.aiming && !g.def.scope));
      if (p.hitT > 0) { p.hitT -= dt; if (p.hitT <= 0) h.cross.classList.remove('hit'); }
      if (p.toastT > 0) { p.toastT -= dt; if (p.toastT <= 0) h.toast.classList.remove('on'); }
      // prompt
      if (p.alive && !p.vehicle && p.nearVehicle) { h.prompt.innerHTML = `<b>[${keyName(p, 'E', 'U', 'Veículo')}]</b> Entrar no ${p.nearVehicle.name}`; h.prompt.classList.add('on'); }
      else h.prompt.classList.remove('on');
      // veículo
      if (p.vehicle) {
        const v = p.vehicle;
        h.veh.classList.add('on');
        h.veh.innerHTML = `<b>${v.name}</b> · Blindagem ${Math.max(0, Math.round(v.hp / v.maxHp * 100))}% · ${Math.round(Math.abs(v.speed) * 3.6)} km/h${v.type === 'tank' ? (v.cannonCd > 0 ? ' · Canhão recarregando' : ' · CANHÃO PRONTO') : ''} · [${keyName(p, 'E', 'U', 'Veículo')}] sair`;
      } else h.veh.classList.remove('on');
      // morte
      if (!p.alive) {
        h.death.classList.add('on');
        h.dt.textContent = p.killer && p.killer !== p ? `Abatido por ${p.killer.name}` : 'Você foi abatido';
        h.ds.textContent = `Renascendo em ${Math.max(0, Math.ceil(p.respawnT))}...`;
      } else h.death.classList.remove('on');
      this.drawMinimap(p);
    }
    // placar
    const showSb = input.down('Tab');
    this.sbEl.classList.toggle('hidden', !showSb);
    if (showSb) {
      const table = (team) => {
        const rows = this.soldiers.filter((s) => s.team === team).sort((a, b) => b.kills - a.kills)
          .map((s) => `<tr class="${s.isPlayer ? 'me' : ''}"><td>${s.cls.ico} ${escapeHtml(s.name)}</td><td>${s.kills}</td><td>${s.deaths}</td></tr>`).join('');
        return `<table><tr><th style="color:${team ? '#ff7f7f' : '#7fb2ff'}">Time ${TEAM_NAME[team]} (${this.tickets[team]})</th><th>A</th><th>M</th></tr>${rows}</table>`;
      };
      this.sbEl.innerHTML = table(0) + table(1);
    }
  }

  drawMinimap(p) {
    const ctx = p.hud.ctx;
    const W = 150; const c = W / 2; const k = c / 70;
    ctx.clearRect(0, 0, W, W);
    ctx.save();
    ctx.beginPath(); ctx.arc(c, c, c, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = 'rgba(40,40,30,0.5)'; ctx.fillRect(0, 0, W, W);
    const yaw = p.vehicle && p.vehicle.type === 'jeep' ? p.vehicle.yaw + p.lookOff : p.yaw;
    const cy = Math.cos(yaw); const sy = Math.sin(yaw);
    const tr = (x, z) => { const dx = x - p.pos.x; const dz = z - p.pos.z; return [c + (dx * cy - dz * sy) * k, c + (dx * sy + dz * cy) * k]; };
    // colisores (contorno do mapa)
    ctx.fillStyle = 'rgba(200,190,170,0.35)';
    for (const col of this.colliders) {
      const mx = (col.min.x + col.max.x) / 2; const mz = (col.min.z + col.max.z) / 2;
      if (Math.abs(mx - p.pos.x) > 80 || Math.abs(mz - p.pos.z) > 80) continue;
      const [x, y] = tr(mx, mz);
      ctx.fillRect(x - 1, y - 1, 2, 2);
    }
    for (const f of this.flags) {
      const [x, y] = tr(f.pos.x, f.pos.z);
      ctx.fillStyle = f.owner === 0 ? '#3d8bff' : f.owner === 1 ? '#ff4545' : '#ddd';
      ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.globalAlpha = 0.5; ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = '#fff'; ctx.fillText(f.name, x, y);
    }
    for (const v of this.vehicles) {
      if (!v.alive) continue;
      const [x, y] = tr(v.pos.x, v.pos.z);
      ctx.fillStyle = v.driver ? (v.driver.team === 0 ? '#7fb2ff' : '#ff7f7f') : '#c9c27a';
      ctx.fillRect(x - 3, y - 3, 6, 6);
    }
    for (const s of this.soldiers) {
      if (!s.alive || s === p) continue;
      const spotted = s.team === p.team || (this.time - s.lastShot < 1.5 && s.camo <= 0) || s.pos.distanceTo(p.pos) < 14;
      if (!spotted) continue;
      const [x, y] = tr(s.pos.x, s.pos.z);
      ctx.fillStyle = s.team === p.team ? (s.isPlayer ? '#ffd23f' : '#3d8bff') : '#ff4545';
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.moveTo(c, c - 6); ctx.lineTo(c - 4, c + 4); ctx.lineTo(c + 4, c + 4); ctx.closePath(); ctx.fill();
  }

  hitMarker(p, head) {
    p.hud.cross.classList.add('hit');
    p.hitT = head ? 0.25 : 0.12;
    sfx.hitmarker();
  }

  toast(p, msg) {
    if (!p.hud) return;
    p.hud.toast.textContent = msg;
    p.hud.toast.classList.add('on');
    p.toastT = 2.2;
  }

  feed(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    this.feedEl.prepend(d);
    while (this.feedEl.children.length > 6) this.feedEl.lastChild.remove();
    setTimeout(() => d.remove(), 5000);
  }

  banner(text, sub, dur) {
    const el = this.bannerEl || document.getElementById('bfBanner');
    el.innerHTML = text + (sub ? `<small>${sub}</small>` : '');
    el.classList.add('show');
    clearTimeout(this.bannerTO);
    this.bannerTO = setTimeout(() => el.classList.remove('show'), dur * 1000);
  }

  // ======================================================================
  // LOOP
  // ======================================================================
  update(dt) {
    dt = Math.min(dt, 0.05);
    this.time += dt;
    for (const s of this.soldiers) {
      if (s.alive && !this.over) { if (s.isPlayer) this.updatePlayer(s, dt); else this.updateBot(s, dt); }
      else if (s.isPlayer) s.intent = { mx: 0, mz: 0 };
      this.updateSoldierCommon(s, dt);
    }
    for (const v of this.vehicles) this.updateVehicle(v, dt);
    this.updateProjectiles(dt);
    this.updateStrikes(dt);
    this.updateItems(dt);
    this.updateFlags(dt);
    this.updateArtillery(dt);
    for (const p of this.players) this.updateView(p, dt);
    const vp = this.twoP ? { x: 0, w: innerWidth / 2, h: innerHeight } : null;
    this.fx.update(dt, this.players[0].view.cam, vp);
    this.updateHud(dt);
  }

  render() {
    const r = this.renderer;
    const W = innerWidth; const H = innerHeight;
    if (!this.twoP) {
      const cam = this.players[0].view.cam;
      cam.aspect = W / H; cam.updateProjectionMatrix();
      r.setScissorTest(false);
      r.setViewport(0, 0, W, H);
      r.render(this.scene, cam);
      return;
    }
    r.setScissorTest(true);
    this.players.forEach((p, i) => {
      const cam = p.view.cam;
      cam.aspect = (W / 2) / H; cam.updateProjectionMatrix();
      r.setViewport(i * W / 2, 0, W / 2, H);
      r.setScissor(i * W / 2, 0, W / 2, H);
      r.render(this.scene, cam);
    });
    r.setScissorTest(false);
  }

  resize() {}

  dispose() {
    this.disposed = true;
    clearTimeout(this.bannerTO);
    this.bannerEl.classList.remove('show');
    this.fx.clear();
    document.getElementById('bfHud').classList.add('hidden');
    document.getElementById('bfViews').innerHTML = '';
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); });
    });
  }
}
