import * as THREE from 'three';
import { clamp, angLerp, canvasTexture } from './util.js';
import { ITEMS } from './outfits.js';

const geoCache = {};
const G = (k, f) => geoCache[k] || (geoCache[k] = f());

export const HATS = {
  none: { name: 'Nenhum', price: 0 },
  cap: { name: 'Boné', price: 50 },
  tophat: { name: 'Cartola', price: 150 },
  chef: { name: 'Chapéu de Chef', price: 120 },
  helmet: { name: 'Capacete de Obra', price: 100 },
  crown: { name: 'Coroa', price: 800 },
  cone: { name: 'Cone de Trânsito', price: 30 },
  cowboy: { name: 'Chapéu de Cowboy', price: 250 },
  beanie: { name: 'Gorro', price: 60 },
  party: { name: 'Chapéu de Festa', price: 40 },
  viking: { name: 'Capacete Viking', price: 220 },
  wizardhat: { name: 'Chapéu de Mago', price: 180 },
  sombrero: { name: 'Chapelão de Palha', price: 90 },
  spacehelmet: { name: 'Capacete Espacial', price: 15, cur: '⭐' },
  saturn: { name: 'Chapéu Saturno', price: 25, cur: '⭐' },
  ufohat: { name: 'Chapéu Disco Voador', price: 35, cur: '⭐' },
  starcrown: { name: 'Coroa Estelar', price: 90, cur: '⭐' },
};

export function makeHat(type, color = 0xe53935) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
  const add = (geo, m, y = 0, x = 0, z = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; g.add(o); return o; };
  switch (type) {
    case 'cap': add(new THREE.SphereGeometry(0.36, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat, -0.05); add(new THREE.BoxGeometry(0.4, 0.04, 0.3), mat, -0.04, 0, 0.36); break;
    case 'tophat': { const k = new THREE.MeshStandardMaterial({ color: 0x212121 }); add(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 20), k, 0); add(new THREE.CylinderGeometry(0.26, 0.26, 0.5, 20), k, 0.26); add(new THREE.CylinderGeometry(0.265, 0.265, 0.08, 20), mat, 0.08); break; }
    case 'chef': { const w = new THREE.MeshStandardMaterial({ color: 0xffffff }); add(new THREE.CylinderGeometry(0.3, 0.28, 0.3, 16), w, 0.1); add(new THREE.SphereGeometry(0.36, 16, 10), w, 0.36).scale.set(1, 0.7, 1); break; }
    case 'helmet': { const y = new THREE.MeshStandardMaterial({ color: 0xfdd835 }); add(new THREE.SphereGeometry(0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), y, -0.08); add(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 20), y, -0.07); break; }
    case 'crown': { const gd = new THREE.MeshStandardMaterial({ color: 0xffd54f, metalness: 0.8, roughness: 0.25 }); add(new THREE.CylinderGeometry(0.3, 0.28, 0.2, 10, 1, true), gd, 0.06); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; add(new THREE.ConeGeometry(0.06, 0.16, 4), gd, 0.24, Math.cos(a) * 0.28, Math.sin(a) * 0.28); } break; }
    case 'cone': { const o = new THREE.MeshStandardMaterial({ color: 0xff6d00 }); add(new THREE.ConeGeometry(0.3, 0.75, 16), o, 0.3); add(new THREE.CylinderGeometry(0.2, 0.235, 0.1, 16), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0.25); add(new THREE.BoxGeometry(0.62, 0.05, 0.62), o, -0.04); break; }
    case 'cowboy': { const b = new THREE.MeshStandardMaterial({ color: 0x8d6e63 }); add(new THREE.CylinderGeometry(0.6, 0.6, 0.04, 20), b, 0); add(new THREE.CylinderGeometry(0.24, 0.3, 0.32, 16), b, 0.17); break; }
    case 'beanie': add(new THREE.SphereGeometry(0.37, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat, -0.06); add(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshStandardMaterial({ color: 0xffffff }), 0.32); break;
    case 'viking': { const m2 = new THREE.MeshStandardMaterial({ color: 0x9e9e9e, metalness: 0.7, roughness: 0.3 }); add(new THREE.SphereGeometry(0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), m2, -0.08);
      const hm = new THREE.MeshStandardMaterial({ color: 0xfff8e1 }); for (const sx of [-1, 1]) { const h = add(new THREE.ConeGeometry(0.08, 0.38, 10), hm, 0.1, sx * 0.4, 0); h.rotation.z = -sx * 1.0; } break; }
    case 'wizardhat': add(new THREE.CylinderGeometry(0.55, 0.55, 0.03, 20), mat, 0); { const c = add(new THREE.ConeGeometry(0.3, 0.8, 16), mat, 0.4); c.rotation.x = -0.25; } add(new THREE.OctahedronGeometry(0.07), new THREE.MeshStandardMaterial({ color: 0xffd54f, emissive: 0xffd54f, emissiveIntensity: 0.6 }), 0.35, 0, 0.27); break;
    case 'sombrero': { const st = new THREE.MeshStandardMaterial({ color: 0xe6c36a }); add(new THREE.CylinderGeometry(0.75, 0.75, 0.03, 24), st, 0); add(new THREE.CylinderGeometry(0.25, 0.3, 0.3, 16), st, 0.15); add(new THREE.CylinderGeometry(0.305, 0.305, 0.07, 16), mat, 0.05); break; }
    case 'spacehelmet': { const gl = new THREE.MeshStandardMaterial({ color: 0xb3e5fc, transparent: true, opacity: 0.3, roughness: 0.05, metalness: 0.3, depthWrite: false });
      const sph = add(new THREE.SphereGeometry(0.52, 20, 14), gl, -0.28); sph.castShadow = false; add(new THREE.TorusGeometry(0.42, 0.06, 8, 24), new THREE.MeshStandardMaterial({ color: 0xeceff1, metalness: 0.5 }), -0.72).rotation.x = Math.PI / 2; break; }
    case 'saturn': add(new THREE.SphereGeometry(0.22, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffb74d }), 0.18); add(new THREE.TorusGeometry(0.34, 0.03, 6, 28), new THREE.MeshStandardMaterial({ color: 0xffe0b2 }), 0.18).rotation.x = 1.2; break;
    case 'ufohat': add(new THREE.CylinderGeometry(0.15, 0.45, 0.12, 20), new THREE.MeshStandardMaterial({ color: 0x90a4ae, metalness: 0.7, roughness: 0.3 }), 0.05); add(new THREE.SphereGeometry(0.17, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x18ffff, transparent: true, opacity: 0.7, emissive: 0x18ffff, emissiveIntensity: 0.4 }), 0.1); break;
    case 'starcrown': { const gd = new THREE.MeshStandardMaterial({ color: 0xb388ff, emissive: 0x7c4dff, emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.2 }); add(new THREE.TorusGeometry(0.28, 0.04, 6, 20), gd, 0.04).rotation.x = Math.PI / 2; for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; add(new THREE.OctahedronGeometry(0.08), gd, 0.18, Math.cos(a) * 0.28, Math.sin(a) * 0.28); } break; }
    case 'party': add(new THREE.ConeGeometry(0.2, 0.55, 14), mat, 0.25); add(new THREE.SphereGeometry(0.06, 8, 6), new THREE.MeshStandardMaterial({ color: 0xfff176 }), 0.54); break;
  }
  return g;
}

export const SKINS = [0xffdbac, 0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0x7fd36b, 0x7ec8e3, 0xd9a3e6];

export class Character {
  constructor(look = {}) {
    this.root = new THREE.Group();
    this.spin = new THREE.Group(); this.spin.position.y = 0.85;
    this.model = new THREE.Group(); this.model.position.y = -0.85;
    this.root.add(this.spin); this.spin.add(this.model);
    this.root.rotation.order = 'YXZ';
    this.spin.rotation.order = 'YXZ';

    this.matShirt = new THREE.MeshStandardMaterial({ color: 0x1e88e5, roughness: 0.7 });
    this.matPants = new THREE.MeshStandardMaterial({ color: 0x37474f, roughness: 0.8 });
    this.matSkin = new THREE.MeshStandardMaterial({ color: 0xffdbac, roughness: 0.6 });
    const black = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const white = new THREE.MeshBasicMaterial({ color: 0xffffff });

    this.pivot = new THREE.Group(); this.pivot.position.y = 0.5; this.model.add(this.pivot);
    const body = new THREE.Mesh(G('body', () => new THREE.CapsuleGeometry(0.42, 0.42, 6, 14)), this.matShirt);
    body.position.y = 0.42; body.castShadow = true; this.pivot.add(body);
    const belly = new THREE.Mesh(G('belly', () => new THREE.CylinderGeometry(0.43, 0.43, 0.2, 14)), this.matPants);
    belly.position.y = 0.05; this.pivot.add(belly);
    this.headG = new THREE.Group(); this.headG.position.y = 1.2; this.pivot.add(this.headG);
    const head = new THREE.Mesh(G('head', () => new THREE.SphereGeometry(0.36, 18, 14)), this.matSkin);
    head.castShadow = true; this.headG.add(head);
    for (const s of [-1, 1]) {
      const e = new THREE.Mesh(G('eye', () => new THREE.SphereGeometry(0.075, 10, 8)), white);
      e.position.set(s * 0.13, 0.06, 0.3); this.headG.add(e);
      const p = new THREE.Mesh(G('pupil', () => new THREE.SphereGeometry(0.04, 8, 6)), black);
      p.position.set(s * 0.13, 0.06, 0.37); this.headG.add(p);
    }
    const mouth = new THREE.Mesh(G('mouth', () => new THREE.TorusGeometry(0.08, 0.018, 6, 12, Math.PI)), black);
    mouth.position.set(0, -0.1, 0.33); mouth.rotation.z = Math.PI; this.headG.add(mouth);
    this.hatSlot = new THREE.Group(); this.hatSlot.position.y = 0.28; this.headG.add(this.hatSlot);
    this.headWear = new THREE.Group(); this.headG.add(this.headWear);
    this.bodyWear = new THREE.Group(); this.pivot.add(this.bodyWear);

    this.arms = [];
    for (const s of [-1, 1]) {
      const sh = new THREE.Group(); sh.position.set(s * 0.45, 0.72, 0); this.pivot.add(sh);
      const arm = new THREE.Mesh(G('arm', () => new THREE.CapsuleGeometry(0.11, 0.32, 4, 8)), this.matShirt);
      arm.position.y = -0.22; arm.castShadow = true; sh.add(arm);
      const hand = new THREE.Mesh(G('hand', () => new THREE.SphereGeometry(0.13, 10, 8)), this.matSkin);
      hand.position.y = -0.48; sh.add(hand);
      sh.rotation.z = s * 0.25;
      this.arms.push(sh);
    }
    this.legs = [];
    for (const s of [-1, 1]) {
      const hip = new THREE.Group(); hip.position.set(s * 0.2, 0.5, 0); this.model.add(hip);
      const leg = new THREE.Mesh(G('leg', () => new THREE.CapsuleGeometry(0.13, 0.2, 4, 8)), this.matPants);
      leg.position.y = -0.2; leg.castShadow = true; hip.add(leg);
      const foot = new THREE.Mesh(G('foot', () => new THREE.BoxGeometry(0.22, 0.12, 0.34)), black);
      foot.position.set(0, -0.42, 0.06); hip.add(foot);
      this.legs.push(hip);
    }
    this.phase = Math.random() * 10;
    this.lean = 0; this.leanV = 0; this.side = 0; this.sideV = 0;
    this.headBob = 0; this.headV = 0; this.t = Math.random() * 10;
    this.setLook(look);
  }

  setLook(look) {
    this.look = { ...this.look, ...look };
    const L = this.look;
    const suit = L.suit && ITEMS[L.suit];
    const shirt = suit?.shirt ?? L.shirt, pants = suit?.pants ?? L.pants, skin = suit?.skin ?? L.skin;
    if (shirt !== undefined) this.matShirt.color.set(shirt);
    if (pants !== undefined) this.matPants.color.set(pants);
    if (skin !== undefined) this.matSkin.color.set(skin);
    const metal = suit?.metal ? 0.6 : 0;
    this.matShirt.metalness = metal; this.matPants.metalness = metal; this.matShirt.roughness = metal ? 0.35 : 0.7;
    this.hatSlot.clear(); this.headWear.clear(); this.bodyWear.clear();
    this.jetFlames = null;
    if (L.hat && L.hat !== 'none') this.hatSlot.add(makeHat(L.hat, L.hatColor ?? 0xe53935));
    for (const slot of ['suit', 'face', 'neck', 'back']) {
      const it = L[slot] && ITEMS[L[slot]];
      if (!it) continue;
      const r = it.build(L.hatColor ?? 0xe53935);
      if (r.head) this.headWear.add(r.head);
      if (r.body) { this.bodyWear.add(r.body); if (r.body.userData.flames) this.jetFlames = r.body.userData.flames; }
    }
  }

  setName(name, color = '#fff') {
    if (this.nameSprite) { this.root.remove(this.nameSprite); this.nameSprite.material.map.dispose(); }
    const tex = canvasTexture(256, 64, (g) => {
      g.font = 'bold 34px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillStyle = 'rgba(0,0,0,0.45)'; const w = Math.min(250, g.measureText(name).width + 24);
      g.beginPath(); g.roundRect(128 - w / 2, 8, w, 48, 20); g.fill();
      g.fillStyle = color; g.fillText(name, 128, 33);
    }, THREE);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
    s.scale.set(2.4, 0.6, 1); s.position.y = 2.55; s.renderOrder = 10;
    this.nameSprite = s; this.root.add(s);
  }

  // state: {speed, accel, grounded, mode: 'walk'|'hold'|'drive'|'ride'|'ragdoll'|'swim'|'carried'|'spray'|'sit'}
  animate(dt, s) {
    this.t += dt;
    if (this.jetFlames) for (const f of this.jetFlames) { f.visible = !!s.jet; if (s.jet) f.scale.y = 0.8 + Math.random() * 0.5; }
    const sp = s.speed || 0;
    const k = clamp(sp / 5, 0, 1.6);
    const A = this.arms, Lg = this.legs;
    // springy lean (wobbly feel)
    const targetLean = s.mode === 'swim' ? 1.25 : clamp(sp * 0.045 + (s.accel || 0) * 0.03, -0.4, 0.5);
    this.leanV += ((targetLean - this.lean) * 90 - this.leanV * 9) * dt;
    this.lean += this.leanV * dt;
    this.sideV += (((s.turn || 0) * -0.25 - this.side) * 70 - this.sideV * 7) * dt;
    this.side += this.sideV * dt;
    this.headV += ((0 - this.headBob) * 120 - this.headV * 6) * dt;
    this.headBob += this.headV * dt;
    this.pivot.rotation.x = this.lean;
    this.pivot.rotation.z = this.side;
    this.headG.rotation.x = this.headBob * 0.6;
    this.headG.position.y = 1.2 + this.headBob * 0.05;
    this.pivot.position.y = 0.5;
    this.model.position.y = -0.85;

    if (s.mode === 'ragdoll' || s.mode === 'carried') {
      const w = this.t * (s.mode === 'carried' ? 9 : 14);
      A[0].rotation.set(Math.sin(w) * 1.2 - 1.5, 0, -1.2 + Math.cos(w * 1.3) * 0.5);
      A[1].rotation.set(Math.cos(w) * 1.2 - 1.5, 0, 1.2 + Math.sin(w * 1.1) * 0.5);
      Lg[0].rotation.set(Math.sin(w * 0.9) * 0.9 - 0.3, 0, -0.4);
      Lg[1].rotation.set(Math.cos(w * 0.8) * 0.9 - 0.3, 0, 0.4);
      this.pivot.rotation.x = 0; this.pivot.rotation.z = 0;
      return;
    }
    if (s.mode === 'drive' || s.mode === 'ride') {
      Lg[0].rotation.set(-1.45, 0, -0.1); Lg[1].rotation.set(-1.45, 0, 0.1);
      const st = (s.steer || 0) * 0.3;
      A[0].rotation.set(-1.15 - st, 0, 0.15); A[1].rotation.set(-1.15 + st, 0, -0.15);
      this.pivot.rotation.x = this.lean * 0.3;
      this.model.position.y = s.mode === 'ride' ? -0.85 : -1.05;
      return;
    }
    if (s.mode === 'swim') {
      const w = this.t * 6;
      A[0].rotation.set(Math.sin(w) * 2, 0, -0.3); A[1].rotation.set(Math.sin(w + Math.PI) * 2, 0, 0.3);
      Lg[0].rotation.set(Math.sin(w * 1.5) * 0.5 + 0.4, 0, 0); Lg[1].rotation.set(-Math.sin(w * 1.5) * 0.5 + 0.4, 0, 0);
      this.model.position.y = -0.85 - 0.6;
      return;
    }
    if (s.mode === 'sit') {
      Lg[0].rotation.set(-1.5, 0, 0); Lg[1].rotation.set(-1.5, 0, 0);
      A[0].rotation.set(-0.3, 0, 0.2); A[1].rotation.set(-0.3, 0, -0.2);
      this.model.position.y = -1.25;
      return;
    }
    if (!s.grounded) {
      const w = this.t * 16;
      A[0].rotation.set(-2.6 + Math.sin(w) * 0.4, 0, 0.6); A[1].rotation.set(-2.6 + Math.cos(w) * 0.4, 0, -0.6);
      Lg[0].rotation.set(-0.6, 0, -0.15); Lg[1].rotation.set(0.3, 0, 0.15);
      return;
    }
    this.phase += dt * (4 + sp * 1.6) * (sp > 0.3 ? 1 : 0);
    const sw = Math.sin(this.phase) * Math.min(k, 1.2);
    Lg[0].rotation.set(sw * 0.9, 0, 0); Lg[1].rotation.set(-sw * 0.9, 0, 0);
    this.pivot.position.y = 0.5 + Math.abs(Math.cos(this.phase)) * 0.07 * Math.min(k, 1);
    if (sp > 0.3) this.headV += Math.cos(this.phase * 2) * dt * 8 * k;
    if (s.mode === 'hold') {
      A[0].rotation.set(-1.45, 0, 0.35); A[1].rotation.set(-1.45, 0, -0.35);
    } else if (s.mode === 'spray') {
      A[0].rotation.set(-1.4 - (s.aimPitch || 0), 0, 0.15); A[1].rotation.set(-1.4 - (s.aimPitch || 0), 0, -0.15);
    } else {
      const idle = Math.sin(this.t * 2) * 0.05;
      A[0].rotation.set(-sw * 0.9, 0, -0.2 - idle - k * 0.15); A[1].rotation.set(sw * 0.9, 0, 0.2 + idle + k * 0.15);
    }
  }

  dispose(scene) { scene.remove(this.root); }
}

// A physical humanoid (player / NPC / passenger) that can be knocked over into a ragdoll
export class Actor {
  constructor(char) {
    this.char = char;
    this.pos = new THREE.Vector3();
    this.vel = new THREE.Vector3();
    this.ry = 0;
    this.grounded = true;
    this.ragdoll = false;
    this.ragT = 0;
    this.ang = new THREE.Vector3();
    this.radius = 0.45;
    this.carriedBy = null;
  }
  forward(out = new THREE.Vector3()) { return out.set(Math.sin(this.ry), 0, Math.cos(this.ry)); }

  knock(ix, iy, iz, spin = 6) {
    if (this.carriedBy) return;
    this.ragdoll = true; this.ragT = 0; this.grounded = false;
    this.vel.x += ix; this.vel.y = Math.max(this.vel.y, 0) + iy; this.vel.z += iz;
    this.ang.set((Math.random() - 0.5) * spin * 2, (Math.random() - 0.5) * spin, (Math.random() - 0.5) * spin * 2);
    this.onKnock?.();
  }

  updateRagdoll(dt, world) {
    this.ragT += dt;
    const v = this.vel;
    v.y -= 25 * world.gravity(this.pos.x) * dt;
    this.pos.addScaledVector(v, dt);
    const g = world.groundAt(this.pos.x, this.pos.z, this.pos.y + 0.3);
    const water = world.isWater(this.pos.x, this.pos.z);
    const floor = water ? -0.9 : g;
    const sp = this.char.spin.rotation;
    if (this.pos.y <= floor) {
      this.pos.y = floor;
      if (v.y < -4) { v.y *= -0.35; this.ang.multiplyScalar(0.7); } else v.y = 0;
      const f = Math.exp(-(water ? 3 : 4) * dt);
      v.x *= f; v.z *= f;
      this.grounded = true;
      this.ang.multiplyScalar(Math.exp(-5 * dt));
      // settle lying on the back
      sp.x += (-Math.PI / 2 - sp.x) * Math.min(1, dt * 4);
      sp.z += (0 - sp.z) * Math.min(1, dt * 4);
    } else this.grounded = false;
    sp.x += this.ang.x * dt; sp.y += this.ang.y * dt; sp.z += this.ang.z * dt;
    const hit = world.pushCircle(this.pos, 0.4, 1.0);
    if (hit) {
      const vn = v.x * hit.nx + v.z * hit.nz;
      if (vn < 0) { v.x -= 1.5 * vn * hit.nx; v.z -= 1.5 * vn * hit.nz; }
    }
    if (this.ragT > 2.2 && this.grounded && Math.hypot(v.x, v.z) < 1.2 && !this.noGetUp) this.getUp();
  }

  getUp() {
    this.ragdoll = false;
    this.ry += this.char.spin.rotation.y;
    this.char.spin.rotation.set(0, 0, 0);
    this.vel.set(0, 4, 0);
    this.grounded = false;
    this.onGetUp?.();
  }

  syncMesh(mode) {
    const r = this.char.root;
    r.position.copy(this.pos);
    if (this.ragdoll || mode === 'carried') {
      // lower the body when lying so it rests on the ground
      const tilt = Math.abs(Math.sin(this.char.spin.rotation.x)) + Math.abs(Math.sin(this.char.spin.rotation.z));
      r.position.y -= Math.min(1, tilt) * 0.45;
    }
    r.rotation.y = this.ry;
  }
}
