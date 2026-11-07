import * as THREE from 'three';

const matCache = new Map();
export function mat(color, o = {}) {
  const key = color + '|' + (o.emissive || 0) + (o.flat === false ? 'S' : 'F');
  let m = matCache.get(key);
  if (!m) { m = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, flatShading: o.flat !== false, emissive: o.emissive || 0x000000 }); matCache.set(key, m); }
  return m;
}
const mesh = (geo, color, x = 0, y = 0, z = 0, o = {}) => { const m = new THREE.Mesh(geo, mat(color, o)); m.position.set(x, y, z); m.castShadow = true; return m; };
const sph = (r, ws = 8, hs = 6) => new THREE.SphereGeometry(r, ws, hs);
const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 3, 8);
const cyl = (a, b, h, s = 8) => new THREE.CylinderGeometry(a, b, h, s);
const cone = (r, h, s = 6) => new THREE.ConeGeometry(r, h, s);
const box = (x, y, z) => new THREE.BoxGeometry(x, y, z);
const pivot = (parent, x, y, z) => { const g = new THREE.Group(); g.position.set(x, y, z); parent.add(g); return g; };

// ---------------- jogador (olha para +z) ----------------
export function makeHumanoid(shirt = 0x3b82f6) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const skin = 0xf0c8a0;
  const hips = pivot(body, 0, 0.9, 0);
  const legL = pivot(hips, -0.12, 0, 0), legR = pivot(hips, 0.12, 0, 0);
  for (const l of [legL, legR]) { l.add(mesh(cap(0.1, 0.5), 0x374151, 0, -0.33, 0)); l.add(mesh(box(0.18, 0.1, 0.28), 0x1f2937, 0, -0.66, 0.05)); }
  const torso = mesh(cap(0.22, 0.34), shirt, 0, 0.32, 0); body.add(torso); torso.position.y = 1.2; torso.scale.set(1, 1, 0.75);
  const head = pivot(body, 0, 1.6, 0);
  head.add(mesh(sph(0.2, 12, 10), skin, 0, 0.1, 0));
  head.add(mesh(sph(0.21, 12, 6, 0, 6.283, 0, 1.45), 0x3b2a1a, 0, 0.12, -0.01));
  head.add(mesh(sph(0.03, 6, 4), 0x111111, -0.07, 0.12, 0.18)); head.add(mesh(sph(0.03, 6, 4), 0x111111, 0.07, 0.12, 0.18));
  const armL = pivot(body, -0.3, 1.38, 0), armR = pivot(body, 0.3, 1.38, 0);
  for (const a of [armL, armR]) { a.add(mesh(cap(0.075, 0.42), shirt, 0, -0.27, 0)); a.add(mesh(sph(0.08), skin, 0, -0.56, 0)); }
  const spear = new THREE.Group(); spear.visible = false;
  spear.add(mesh(cyl(0.02, 0.02, 1.9, 5), 0x8a6a3c, 0, 0.1, 0)); spear.add(mesh(cone(0.06, 0.3, 5), 0xcfd6dc, 0, 1.15, 0));
  spear.position.set(0, -0.55, 0.05); spear.rotation.x = Math.PI / 2; armR.add(spear);
  const st = { phase: 0, swing: 0, swim: false, dead: false, speed: 0, t: 0 };
  return {
    group: g, st, body,
    setWeapon(w) { spear.visible = w === 'lanca'; },
    tint(c) { torso.material = mat(c); armL.children[0].material = mat(c); armR.children[0].material = mat(c); },
    update(dt, speed, swim) {
      st.t += dt; st.speed = speed; st.swim = swim;
      st.phase += dt * (swim ? 5 : 2.2 + speed * 0.9);
      const amp = swim ? 0.5 : Math.min(1, speed / 3.5) * 0.85;
      const s = Math.sin(st.phase);
      if (st.swing > 0) st.swing = Math.max(0, st.swing - dt);
      const sw = st.swing > 0 ? Math.sin((1 - st.swing / 0.4) * Math.PI) : 0;
      if (st.dead) { body.rotation.x = -1.5; body.position.y = 0.2; return; }
      if (swim) {
        body.rotation.x = 1.15; body.position.set(0, -0.5, 0.25);
        legL.rotation.x = s * 0.5; legR.rotation.x = -s * 0.5;
        armL.rotation.x = Math.PI + Math.sin(st.phase) * 1.3; armR.rotation.x = Math.PI + Math.sin(st.phase + Math.PI) * 1.3 - sw * 0.5;
      } else {
        body.rotation.x = 0; body.position.set(0, Math.abs(s) * 0.04 * (amp > 0.1 ? 1 : 0) + Math.sin(st.t * 2) * 0.005, 0);
        legL.rotation.x = s * amp; legR.rotation.x = -s * amp;
        armL.rotation.x = -s * amp * 0.8; armR.rotation.x = s * amp * 0.8 - sw * 2.6;
      }
      torso.rotation.y = st.swing > 0 ? (sw - 0.5) * 0.7 : s * amp * 0.1;
      head.rotation.y = 0;
    },
    swingNow() { st.swing = 0.4; },
  };
}

// ---------------- animais (olham para +x) ----------------
const SPOT = 0x2b1b10;
function quad(c) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const by = c.legs.len + c.bh / 2 - 0.05;
  const torso = mesh(sph(1, 10, 8), c.col, 0, by, 0); torso.scale.set(c.bl / 2, c.bh / 2, c.bw / 2); body.add(torso);
  if (c.belly) { const b = mesh(sph(1, 8, 6), c.belly, 0, by - c.bh * 0.12, 0); b.scale.set(c.bl / 2 * 0.9, c.bh / 2 * 0.8, c.bw / 2 * 0.92); body.add(b); }
  const head = pivot(body, c.bl / 2 * 0.85, by + c.bh * 0.25 + (c.head.dy || 0), 0);
  head.add(mesh(sph(c.head.r, 9, 7), c.head.col || c.col, c.head.r * 0.5, 0, 0));
  if (c.snout) { const s = mesh(sph(c.snout.r, 8, 6), c.snout.col || c.col, c.head.r * 0.5 + c.snout.l * 0.5, -c.head.r * 0.25, 0); s.scale.set(c.snout.l / c.snout.r / 1.2, 0.8, 0.9); head.add(s); head.add(mesh(sph(c.snout.r * 0.35, 6, 4), 0x111111, c.head.r * 0.5 + c.snout.l * 1.1, -c.head.r * 0.2, 0)); }
  for (const z of [-1, 1]) head.add(mesh(sph(c.head.r * 0.18, 5, 4), 0x111111, c.head.r * 0.95, c.head.r * 0.25, z * c.head.r * 0.5));
  if (c.ears) for (const z of [-1, 1]) {
    const e = mesh(c.ears.long ? cone(c.ears.r, c.ears.l, 5) : sph(c.ears.r, 6, 4), c.ears.col || c.col, c.head.r * 0.2, c.head.r * 0.9 + (c.ears.long ? c.ears.l / 2 : 0), z * c.head.r * 0.55);
    if (c.ears.long) e.rotation.x = -z * 0.25; head.add(e);
  }
  if (c.antlers) for (const z of [-1, 1]) { const a = mesh(cyl(0.02, 0.035, 0.5, 4), 0xd9c9a3, 0, c.head.r * 1.4, z * c.head.r * 0.45); a.rotation.x = -z * 0.4; head.add(a); const b = mesh(cyl(0.015, 0.025, 0.28, 4), 0xd9c9a3, 0.1, c.head.r * 1.65, z * c.head.r * 0.7); b.rotation.x = -z * 0.9; head.add(b); }
  if (c.tusks) for (const z of [-1, 1]) { const t = mesh(cone(0.03, 0.2, 4), 0xf5f0d8, c.head.r * 1.2, -c.head.r * 0.25, z * c.head.r * 0.3); t.rotation.z = 0.5; head.add(t); }
  if (c.mane) { const m = mesh(sph(c.bh * 0.5, 8, 6), c.mane, c.bl * 0.3, by + c.bh * 0.2, 0); m.scale.set(0.8, 0.9, 1); body.add(m); }
  const legs = [];
  const lx = [c.legs.fx, c.legs.fx, -c.legs.bx, -c.legs.bx], lz = [-1, 1, -1, 1];
  for (let i = 0; i < 4; i++) {
    const l = pivot(body, lx[i] * c.bl / 2, c.legs.len, lz[i] * c.bw / 2 * 0.7);
    l.add(mesh(cyl(c.legs.r, c.legs.r * 0.8, c.legs.len, 6), c.legs.col || c.col, 0, -c.legs.len / 2, 0));
    if (c.legs.paw !== false) l.add(mesh(sph(c.legs.r * 1.1, 6, 4), c.legs.paw || c.legs.col || c.col, 0.02, -c.legs.len, 0));
    legs.push(l);
  }
  let tail = null;
  if (c.tail) {
    tail = pivot(body, -c.bl / 2 * 0.9, by + c.bh * 0.15 + (c.tail.dy || 0), 0);
    if (c.tail.ball) tail.add(mesh(sph(c.tail.r, 6, 5), c.tail.col || 0xffffff, -c.tail.r * 0.5, 0, 0));
    else { const t = mesh(cone(c.tail.r, c.tail.l, 5), c.tail.col || c.col, -c.tail.l / 2, 0, 0); t.rotation.z = Math.PI / 2 + (c.tail.up || 0); tail.add(t); }
  }
  if (c.spots) for (let i = 0; i < c.spots; i++) { const a = (i * 2.4) % 6.283, x = Math.cos(i * 1.7) * c.bl * 0.35; const s = mesh(sph(c.bh * 0.12, 5, 4), SPOT, x, by + Math.sin(a) * c.bh * 0.42, Math.cos(a) * c.bw * 0.42); body.add(s); }
  if (c.spikes) for (let i = 0; i < 7; i++) body.add(mesh(cone(0.06, 0.14, 4), c.spikes, -c.bl * 0.4 + i * c.bl * 0.13, by + c.bh * 0.5, 0));
  g.scale.setScalar(c.scale || 1);
  return { group: g, body, head, legs, tail, by, c, hop: !!c.hop };
}

function fish(c) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const b = mesh(sph(1, 10, 8), c.col, 0, 0, 0); b.scale.set(c.l / 2, c.h / 2, c.w / 2); body.add(b);
  if (c.belly) { const bl = mesh(sph(1, 10, 6), c.belly, 0, -c.h * 0.12, 0); bl.scale.set(c.l / 2 * 0.95, c.h / 2 * 0.75, c.w / 2 * 0.92); body.add(bl); }
  const tail = pivot(body, -c.l / 2 * 0.85, 0, 0);
  const tf = mesh(cone(c.h * 0.55, c.l * 0.35, 4), c.fin || c.col, -c.l * 0.15, 0, 0); tf.rotation.z = Math.PI / 2; tf.scale.set(1, 1, c.shark ? 0.25 : 0.2); tail.add(tf);
  const dorsal = mesh(cone(c.h * 0.3, c.h * (c.shark ? 0.9 : 0.5), 4), c.fin || c.col, -c.l * 0.05, c.h * 0.5, 0); dorsal.scale.z = 0.25; dorsal.rotation.z = -0.35; body.add(dorsal);
  for (const z of [-1, 1]) { const f = mesh(cone(c.h * 0.2, c.h * 0.7, 4), c.fin || c.col, c.l * 0.12, -c.h * 0.4, z * c.w * 0.45); f.rotation.x = z * 1.0; f.rotation.z = 0.5; f.scale.z = 0.3; body.add(f); }
  for (const z of [-1, 1]) body.add(mesh(sph(c.h * 0.07, 5, 4), 0x111111, c.l * 0.38, c.h * 0.1, z * c.w * 0.38));
  if (c.shark) { const m = mesh(box(c.l * 0.12, 0.05, c.w * 0.6), 0x3a1a1a, c.l * 0.4, -c.h * 0.22, 0); body.add(m); for (let i = 0; i < 5; i++) body.add(mesh(cone(0.04, 0.12, 3), 0xffffff, c.l * 0.44, -c.h * 0.2, (i - 2) * c.w * 0.11)); }
  return { group: g, body, tail, fish: true, c };
}
function snake(c) {
  const g = new THREE.Group(); const segs = [];
  const n = 16;
  for (let i = 0; i < n; i++) {
    const r = c.r * (i === 0 ? 1.25 : 1 - (i / n) * 0.75);
    const s = mesh(sph(r, 7, 5), i % 2 ? c.col : c.col2, 0, c.r, 0); g.add(s); segs.push(s);
    if (i === 0) for (const z of [-1, 1]) s.add(mesh(sph(r * 0.2, 4, 3), 0xffee00, r * 0.8, r * 0.4, z * r * 0.5));
  }
  return { group: g, segs, snake: true, c, n };
}
function scorpion(c) {
  const g = new THREE.Group(); const body = new THREE.Group(); g.add(body);
  const b = mesh(sph(0.2, 7, 5), c.col, 0, 0.18, 0); b.scale.set(1.3, 0.55, 0.9); body.add(b);
  const legs = [];
  for (let i = 0; i < 8; i++) { const s = i % 2 ? 1 : -1, x = -0.12 + Math.floor(i / 2) * 0.1; const l = pivot(body, x, 0.17, s * 0.15); const m = mesh(cyl(0.012, 0.012, 0.3, 3), c.col, 0, -0.05, s * 0.1); m.rotation.x = s * 0.8; l.add(m); legs.push(l); }
  for (const z of [-1, 1]) { const cl = mesh(sph(0.07, 5, 4), c.col2, 0.3, 0.2, z * 0.14); cl.scale.set(1.3, 0.7, 1); body.add(cl); }
  const tail = pivot(body, -0.22, 0.2, 0);
  for (let i = 0; i < 4; i++) tail.add(mesh(sph(0.055 - i * 0.006, 5, 4), c.col2, -0.04 - i * 0.07, 0.07 * i * i * 0.5 + i * 0.04, 0));
  tail.add(mesh(cone(0.025, 0.1, 4), 0xcc2222, -0.3, 0.3, 0));
  return { group: g, body, legs, tail, scorp: true, c };
}

const BUILDERS = {
  coelho: () => quad({ bl: 0.5, bh: 0.32, bw: 0.3, col: 0xb9a48a, belly: 0xf1e8d8, head: { r: 0.13, dy: -0.02 }, snout: { l: 0.06, r: 0.05, col: 0xf1e8d8 }, ears: { long: true, l: 0.28, r: 0.05, col: 0xb9a48a }, legs: { len: 0.14, r: 0.04, fx: 0.55, bx: 0.7 }, tail: { r: 0.06, ball: true }, hop: true }),
  cervo: () => quad({ bl: 1.3, bh: 0.6, bw: 0.45, col: 0xa8703a, belly: 0xe8d4b0, head: { r: 0.2, dy: 0.25 }, snout: { l: 0.22, r: 0.1, col: 0x7a4e28 }, ears: { r: 0.07, l: 0.18, long: true, col: 0xa8703a }, antlers: true, legs: { len: 0.85, r: 0.05, fx: 0.7, bx: 0.7, col: 0x7a4e28 }, tail: { r: 0.07, l: 0.16, col: 0xf1e8d8 }, scale: 1 }),
  capivara: () => quad({ bl: 1.0, bh: 0.55, bw: 0.5, col: 0x8a6a45, head: { r: 0.2, dy: 0.0 }, snout: { l: 0.2, r: 0.12 }, ears: { r: 0.05 }, legs: { len: 0.2, r: 0.07, fx: 0.55, bx: 0.6 } }),
  tartaruga: () => { const q = quad({ bl: 0.6, bh: 0.2, bw: 0.5, col: 0x5d8a3a, head: { r: 0.09, dy: 0.0 }, snout: null, legs: { len: 0.07, r: 0.06, fx: 0.55, bx: 0.55, paw: false }, tail: null }); const sh = mesh(sph(0.34, 10, 6, 0, 6.283, 0, Math.PI / 2), 0x6b5a2a, 0, 0.1, 0); sh.scale.set(1.1, 0.8, 1); q.body.add(sh); q.group.scale.setScalar(1.3); return q; },
  javali: () => quad({ bl: 1.1, bh: 0.6, bw: 0.55, col: 0x4a3a30, head: { r: 0.22, dy: -0.05 }, snout: { l: 0.2, r: 0.11, col: 0x6a4a3a }, ears: { r: 0.07, long: true, l: 0.12, col: 0x4a3a30 }, tusks: true, legs: { len: 0.4, r: 0.06, fx: 0.6, bx: 0.6, col: 0x2e231c }, tail: { r: 0.03, l: 0.2, col: 0x2e231c }, mane: 0x2e231c }),
  urso: () => quad({ bl: 1.5, bh: 0.9, bw: 0.8, col: 0x5a3b24, head: { r: 0.3, dy: -0.15 }, snout: { l: 0.28, r: 0.14, col: 0xa08060 }, ears: { r: 0.1, col: 0x5a3b24 }, legs: { len: 0.55, r: 0.15, fx: 0.62, bx: 0.62 }, tail: { r: 0.08, l: 0.12, ball: true, col: 0x5a3b24 }, scale: 1.15 }),
  lobo: () => quad({ bl: 1.0, bh: 0.45, bw: 0.32, col: 0x7d8186, belly: 0xc9ccd0, head: { r: 0.17, dy: 0.05 }, snout: { l: 0.2, r: 0.08, col: 0x6a6e73 }, ears: { long: true, l: 0.14, r: 0.06, col: 0x5a5e63 }, legs: { len: 0.5, r: 0.045, fx: 0.65, bx: 0.6, col: 0x6a6e73 }, tail: { r: 0.07, l: 0.42, col: 0x7d8186, up: 0.5 }, mane: 0x969a9f }),
  onca: () => quad({ bl: 1.25, bh: 0.5, bw: 0.38, col: 0xe0a030, belly: 0xf6e3b4, head: { r: 0.2 }, snout: { l: 0.15, r: 0.1, col: 0xf6e3b4 }, ears: { r: 0.06, col: 0xe0a030 }, legs: { len: 0.4, r: 0.07, fx: 0.62, bx: 0.62, col: 0xd49428 }, tail: { r: 0.05, l: 0.75, col: 0xe0a030, up: 0.4 }, spots: 14 }),
  jacare: () => { const q = quad({ bl: 1.9, bh: 0.35, bw: 0.55, col: 0x4a6b3a, belly: 0xb8c98a, head: { r: 0.17, dy: -0.04 }, snout: { l: 0.5, r: 0.1, col: 0x4a6b3a }, legs: { len: 0.14, r: 0.07, fx: 0.62, bx: 0.62, col: 0x3a5a2c }, tail: { r: 0.14, l: 1.1, col: 0x4a6b3a }, spikes: 0x2f4a24 }); return q; },
  cobra: () => snake({ r: 0.07, col: 0x6b8a2a, col2: 0x2f4a12 }),
  escorpiao: () => scorpion({ col: 0x3a2a1a, col2: 0x7a4a1a }),
  peixe: () => fish({ l: 0.5, h: 0.2, w: 0.1, col: 0xff8a3c, belly: 0xfff2d0, fin: 0xff5a1c }),
  tubarao: () => fish({ l: 3.2, h: 0.8, w: 0.75, col: 0x6b7e8c, belly: 0xe8eef2, fin: 0x55666f, shark: true }),
};
export function makeAnimal(sid) { const a = BUILDERS[sid](); a.sid = sid; a.phase = Math.random() * 6; a.flash = 0; return a; }

// anima um animal: speed (m/s), state do servidor (3=atacando)
export function animateAnimal(a, dt, speed, state, t) {
  a.phase += dt * (2 + speed * 2.2);
  const s = Math.sin(a.phase), amp = Math.min(1, speed / 3);
  if (a.flash > 0) { a.flash = Math.max(0, a.flash - dt * 4); a.group.scale.setScalar((a.c.scale || 1) * (1 + a.flash * 0.18)); }
  if (a.fish) {
    a.tail.rotation.y = Math.sin(a.phase * (a.c.shark ? 1.3 : 2.5)) * (0.35 + amp * 0.35);
    a.body.rotation.y = Math.sin(a.phase * 1.3 - 1) * 0.06; a.body.position.y = Math.sin(t * 1.2 + a.phase) * 0.05;
    if (state === 3) a.body.rotation.z = 0.35;
    else a.body.rotation.z = 0;
    return;
  }
  if (a.snake) {
    const k = 0.12 + amp * 0.35;
    for (let i = 0; i < a.n; i++) { const s2 = a.segs[i]; s2.position.x = -i * a.c.r * 1.35; s2.position.z = Math.sin(a.phase * 1.6 - i * 0.55) * a.c.r * 2.2 * k * 3; s2.position.y = a.c.r + (i < 4 && state === 3 ? (4 - i) * a.c.r * 0.7 : 0); }
    return;
  }
  if (a.scorp) {
    a.legs.forEach((l, i) => { l.rotation.z = Math.sin(a.phase * 1.5 + i * 1.7) * 0.5 * amp; });
    a.tail.rotation.z = state === 3 ? 0.9 + Math.sin(t * 25) * 0.2 : Math.sin(t * 3) * 0.1;
    return;
  }
  const bodyLunge = state === 3 ? Math.sin(Math.min(1, (t * 10) % 1) * Math.PI) * 0.25 : 0;
  a.body.position.x = bodyLunge;
  if (a.hop) {
    const hp = Math.abs(Math.sin(a.phase * 1.3)) * (amp > 0.1 ? 1 : 0);
    a.body.position.y = hp * 0.25; a.body.rotation.z = (Math.sin(a.phase * 1.3) * 0.3) * (amp > 0.1 ? 1 : 0);
    a.legs.forEach((l, i) => { l.rotation.z = Math.sin(a.phase * 1.3 + (i > 1 ? 0.5 : 0)) * 0.9 * amp; });
  } else {
    const off = [0, Math.PI, Math.PI, 0];
    a.legs.forEach((l, i) => { l.rotation.z = Math.sin(a.phase + off[i]) * 0.8 * amp; });
    a.body.position.y = Math.abs(s) * 0.03 * amp; a.body.rotation.z = Math.sin(a.phase) * 0.03 * amp;
  }
  if (a.tail) a.tail.rotation.y = Math.sin(a.phase * 0.8 + 1) * (a.c.tail && a.c.tail.l > 0.6 ? 0.5 : 0.25) * (0.5 + amp);
  a.head.rotation.z = state === 3 ? -0.5 : Math.sin(t * 0.9 + a.phase) * 0.06 - (amp < 0.05 ? 0.12 : 0);
  if (a.c.legs.len < 0.2 && a.c.tail && a.c.tail.l > 1) a.body.rotation.y = Math.sin(a.phase) * 0.12 * amp;
}

// etiqueta com o nome
export function nameTag(text, color = '#fff') {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 30px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,.7)'; x.strokeText(text, 128, 34); x.fillStyle = color; x.fillText(text, 128, 34);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false, transparent: true })); s.scale.set(1.6, 0.4, 1); s.renderOrder = 10;
  return s;
}
