import * as THREE from 'three';
import { clamp, wrapAngle, angLerp, canvasTexture } from './util.js';
import { roadLine, N, EDGE } from './world.js';

export const VTYPES = {
  sedan: { name: 'Sedã', len: 4.4, wid: 2.0, h: 1.55, max: 32, acc: 13, price: 600, style: 'car' },
  hatch: { name: 'Compacto', len: 3.6, wid: 1.9, h: 1.6, max: 28, acc: 12, price: 400, style: 'car' },
  sport: { name: 'Esportivo', len: 4.4, wid: 2.0, h: 1.15, max: 52, acc: 24, price: 3000, style: 'sport' },
  taxi: { name: 'Táxi', len: 4.4, wid: 2.0, h: 1.55, max: 32, acc: 13, style: 'car', color: 0xfdd835, taxi: true },
  police: { name: 'Viatura', len: 4.6, wid: 2.0, h: 1.55, max: 44, acc: 18, price: 2500, style: 'car', color: 0xfafafa, police: true },
  pickup: { name: 'Picape', len: 5.0, wid: 2.1, h: 1.85, max: 32, acc: 12, price: 1200, style: 'pickup' },
  van: { name: 'Caminhão de Mudança', len: 6.6, wid: 2.5, h: 3.1, max: 25, acc: 8, style: 'truck', color: 0xffffff, cargo: 0x1565c0 },
  garbage: { name: 'Caminhão de Lixo', len: 7.0, wid: 2.6, h: 3.2, max: 23, acc: 7, style: 'truck', color: 0x2e7d32, cargo: 0x43a047 },
  fire: { name: 'Caminhão de Bombeiros', len: 7.6, wid: 2.6, h: 3.0, max: 30, acc: 9, style: 'truck', color: 0xc62828, cargo: 0xd32f2f, ladder: true },
  bus: { name: 'Ônibus', len: 10.5, wid: 2.7, h: 3.2, max: 22, acc: 6, style: 'bus', color: 0x1e88e5 },
  scooter: { name: 'Motoca', len: 1.9, wid: 0.8, h: 1.1, max: 27, acc: 15, price: 300, style: 'bike', color: 0xe53935 },
  monster: { name: 'Monster Truck', len: 5.0, wid: 3.1, h: 2.6, max: 36, acc: 17, price: 6000, style: 'monster', wheelR: 1.0 },
  rover: { name: 'Rover Lunar', len: 3.9, wid: 2.4, h: 1.7, max: 24, acc: 13, stars: 30, style: 'rover', color: 0xeceff1, wheelR: 0.6, space: true },
  ufo: { name: 'Disco Voador', len: 4.2, wid: 4.2, h: 1.4, max: 42, acc: 22, stars: 120, style: 'ufo', color: 0x90a4ae, space: true },
  ambulance: { name: 'Ambulância', len: 6.0, wid: 2.4, h: 2.9, max: 36, acc: 12, style: 'truck', color: 0xffffff, cargo: 0xffffff, siren: true, cross: true },
  cessna: { name: 'Monomotor', len: 8, wid: 10.5, h: 2.6, max: 62, acc: 15, price: 4000, style: 'plane', color: 0xffffff, stall: 17, turn: 0.9, air: true },
  biplane: { name: 'Biplano Acrobático', len: 7, wid: 8.5, h: 2.9, max: 56, acc: 17, price: 5500, style: 'biplane', color: 0xe53935, stall: 14, turn: 1.5, air: true },
  seaplane: { name: 'Hidroavião', len: 9, wid: 12, h: 3.2, max: 55, acc: 13, price: 7000, style: 'plane', color: 0xfdd835, stall: 17, turn: 0.9, floats: true, air: true },
  jet: { name: 'Jato', len: 13, wid: 10, h: 3.2, max: 130, acc: 32, price: 18000, style: 'jet', color: 0x90a4ae, stall: 36, turn: 0.75, air: true },
  cargo: { name: 'Avião de Carga', len: 18, wid: 24, h: 5, max: 72, acc: 11, style: 'cargo', color: 0xeceff1, stall: 22, turn: 0.5, air: true },
  heli: { name: 'Helicóptero', len: 9, wid: 3, h: 3.2, max: 42, acc: 14, price: 9000, style: 'heli', color: 0x1e88e5, air: true },
  rescueheli: { name: 'Helicóptero de Resgate', len: 9, wid: 3, h: 3.2, max: 42, acc: 14, style: 'heli', color: 0xff6f00, air: true },
  jetski: { name: 'Jet Ski', len: 2.8, wid: 1.1, h: 1.0, max: 30, acc: 14, price: 1500, style: 'boat', color: 0xff4081 },
};
export const CAR_COLORS = [0xe53935, 0x1e88e5, 0x43a047, 0xfdd835, 0xfb8c00, 0x8e24aa, 0x212121, 0xeceff1, 0x00acc1, 0x6d4c41, 0xf06292];

const wheelGeo = {};
const tireMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1b, roughness: 0.9 });
const rimMat = new THREE.MeshStandardMaterial({ color: 0xb0bec5, metalness: 0.6, roughness: 0.3 });
const glassMat = new THREE.MeshStandardMaterial({ color: 0x223344, transparent: true, opacity: 0.45, roughness: 0.1, metalness: 0.3 });
const blackMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const greyMat = new THREE.MeshStandardMaterial({ color: 0x9e9e9e, metalness: 0.4 });
const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff6d0, emissiveIntensity: 0.3 });
const tailMat = new THREE.MeshStandardMaterial({ color: 0xb71c1c, emissive: 0xff1744, emissiveIntensity: 0.4 });

function makeWheel(r, w) {
  const k = r + '_' + w;
  if (!wheelGeo[k]) {
    const t = new THREE.CylinderGeometry(r, r, w, 16); t.rotateZ(Math.PI / 2);
    const rim = new THREE.CylinderGeometry(r * 0.55, r * 0.55, w + 0.02, 8); rim.rotateZ(Math.PI / 2);
    wheelGeo[k] = [t, rim];
  }
  const steer = new THREE.Group();
  const spin = new THREE.Group();
  const tire = new THREE.Mesh(wheelGeo[k][0], tireMat); tire.castShadow = true;
  spin.add(tire, new THREE.Mesh(wheelGeo[k][1], rimMat));
  steer.add(spin);
  return { steer, spin };
}

function box(w, h, d, mat, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m;
}

function buildMesh(def, color) {
  const g = new THREE.Group();
  const body = new THREE.Group(); g.add(body);
  const paint = new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.3 });
  const { len: L, wid: W, h: H } = def;
  const wheels = [];
  const wr = def.wheelR || (def.style === 'truck' || def.style === 'bus' ? 0.55 : def.style === 'bike' ? 0.33 : 0.4);
  const addWheels = (fz, rz, xo, front = true) => {
    for (const [z, f] of [[fz, true], [rz, false]]) for (const s of xo === 0 ? [0] : [-1, 1]) {
      const wh = makeWheel(wr, def.style === 'monster' ? 0.8 : def.style === 'bike' ? 0.15 : 0.32);
      wh.steer.position.set(s * xo, wr, z); g.add(wh.steer); wheels.push({ ...wh, front: f && front });
    }
  };
  let seat = { x: W * 0.22, y: 0.45, z: 0 };
  switch (def.style) {
    case 'car': case 'sport': {
      const low = def.style === 'sport';
      const ch = low ? 0.5 : 0.65, base = wr * 0.9;
      body.add(box(W, ch, L, paint, 0, base + ch / 2, 0));
      const cl = L * (low ? 0.42 : 0.5), chh = H - base - ch;
      body.add(box(W * 0.86, chh * 0.92, cl, glassMat, 0, base + ch + chh * 0.46, -L * 0.04));
      body.add(box(W * 0.88, 0.08, cl * 0.9, paint, 0, base + ch + chh * 0.94, -L * 0.04));
      for (const s of [-1, 1]) {
        body.add(box(0.45, 0.18, 0.08, headMat, s * W * 0.32, base + ch * 0.65, L / 2));
        body.add(box(0.45, 0.16, 0.08, tailMat, s * W * 0.32, base + ch * 0.7, -L / 2));
      }
      if (low) { body.add(box(W * 0.9, 0.08, 0.4, paint, 0, base + ch + 0.45, -L / 2 + 0.25)); for (const s of [-1, 1]) body.add(box(0.08, 0.4, 0.2, blackMat, s * 0.7, base + ch + 0.2, -L / 2 + 0.25)); }
      if (def.taxi) {
        const tex = canvasTexture(128, 32, (c) => { c.fillStyle = '#222'; c.fillRect(0, 0, 128, 32); c.fillStyle = '#fdd835'; c.font = 'bold 26px Arial'; c.textAlign = 'center'; c.fillText('TÁXI', 64, 26); }, THREE);
        const sm = new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.5 });
        body.add(box(0.9, 0.3, 0.35, sm, 0, base + ch + chh + 0.15, -L * 0.04));
      }
      if (def.police) {
        body.add(box(W * 1.01, 0.25, L * 0.5, new THREE.MeshStandardMaterial({ color: 0x1a237e }), 0, base + ch * 0.55, 0));
        const red = new THREE.MeshStandardMaterial({ color: 0xff1744, emissive: 0xff1744, emissiveIntensity: 1 });
        const blue = new THREE.MeshStandardMaterial({ color: 0x2979ff, emissive: 0x2979ff, emissiveIntensity: 1 });
        body.add(box(0.5, 0.18, 0.3, red, 0.3, base + ch + chh + 0.09, -L * 0.04));
        body.add(box(0.5, 0.18, 0.3, blue, -0.3, base + ch + chh + 0.09, -L * 0.04));
        g.userData.siren = [red, blue];
      }
      addWheels(L * 0.32, -L * 0.32, W / 2 - 0.12);
      seat = { x: W * 0.22, y: base + 0.15, z: -L * 0.06 };
      break;
    }
    case 'pickup': {
      const base = wr * 0.9;
      body.add(box(W, 0.7, L, paint, 0, base + 0.35, 0));
      body.add(box(W * 0.9, 0.9, L * 0.36, glassMat, 0, base + 1.15, L * 0.08));
      body.add(box(W * 0.92, 0.08, L * 0.34, paint, 0, base + 1.62, L * 0.08));
      for (const s of [-1, 1]) body.add(box(0.1, 0.5, L * 0.38, paint, s * (W / 2 - 0.05), base + 0.95, -L * 0.3));
      body.add(box(W, 0.5, 0.1, paint, 0, base + 0.95, -L / 2 + 0.05));
      for (const s of [-1, 1]) { body.add(box(0.45, 0.18, 0.08, headMat, s * W * 0.32, base + 0.5, L / 2)); body.add(box(0.3, 0.3, 0.08, tailMat, s * W * 0.38, base + 0.8, -L / 2)); }
      addWheels(L * 0.33, -L * 0.3, W / 2 - 0.1);
      seat = { x: W * 0.22, y: base + 0.25, z: L * 0.06 };
      break;
    }
    case 'truck': case 'bus': {
      const base = wr * 1.1;
      if (def.style === 'bus') {
        body.add(box(W, H - base, L, paint, 0, base + (H - base) / 2, 0));
        body.add(box(W + 0.02, 0.9, L * 0.85, glassMat, 0, base + (H - base) * 0.62, -L * 0.03));
        body.add(box(W * 0.9, 1.1, 0.05, glassMat, 0, base + (H - base) * 0.6, L / 2 + 0.01));
        addWheels(L * 0.33, -L * 0.3, W / 2 - 0.15);
        seat = { x: W * 0.25, y: base + 0.3, z: L * 0.4 };
      } else {
        const cab = 2.3;
        body.add(box(W, 1.0, L, blackMat, 0, base + 0.2, 0));
        body.add(box(W, 1.3, cab, paint, 0, base + 1.1, L / 2 - cab / 2));
        body.add(box(W * 0.94, 0.8, cab * 0.6, glassMat, 0, base + 2.05, L / 2 - cab * 0.4));
        body.add(box(W, 0.12, cab * 0.95, paint, 0, base + 2.5, L / 2 - cab / 2));
        const cargo = new THREE.MeshStandardMaterial({ color: def.cargo, roughness: 0.6 });
        const cl = L - cab - 0.2;
        body.add(box(W, H - base - 0.3, cl, cargo, 0, base + 0.5 + (H - base - 0.3) / 2, -L / 2 + cl / 2));
        if (def.cross) {
          const red = new THREE.MeshStandardMaterial({ color: 0xe53935 });
          for (const sx of [-1, 1]) { body.add(box(0.02, 0.9, 0.3, red, sx * (W / 2 + 0.01), base + 1.6, -L * 0.15)); body.add(box(0.02, 0.3, 0.9, red, sx * (W / 2 + 0.01), base + 1.6, -L * 0.15)); }
          body.add(box(W + 0.02, 0.2, cl, red, 0, base + 0.8, -L / 2 + cl / 2));
        }
        if (def.siren) {
          const red = new THREE.MeshStandardMaterial({ color: 0xff1744, emissive: 0xff1744, emissiveIntensity: 1 });
          const blue = new THREE.MeshStandardMaterial({ color: 0x2979ff, emissive: 0x2979ff, emissiveIntensity: 1 });
          body.add(box(0.4, 0.2, 0.3, red, 0.6, base + 2.66, L / 2 - 1)); body.add(box(0.4, 0.2, 0.3, blue, -0.6, base + 2.66, L / 2 - 1));
          g.userData.siren = [red, blue];
        }
        if (def.ladder) {
          body.add(box(0.6, 0.12, L * 0.8, greyMat, 0, H + 0.45, -0.3));
          for (let k = 0; k < 8; k++) body.add(box(0.6, 0.06, 0.06, greyMat, 0, H + 0.53, -L * 0.38 + k * 0.6));
          const red = new THREE.MeshStandardMaterial({ color: 0xff1744, emissive: 0xff1744, emissiveIntensity: 1 });
          const red2 = red.clone();
          body.add(box(0.4, 0.2, 0.3, red, 0.6, base + 2.66, L / 2 - 1));
          body.add(box(0.4, 0.2, 0.3, red2, -0.6, base + 2.66, L / 2 - 1));
          g.userData.siren = [red, red2];
        }
        for (const s of [-1, 1]) { body.add(box(0.4, 0.25, 0.08, headMat, s * W * 0.34, base + 0.8, L / 2)); body.add(box(0.3, 0.3, 0.08, tailMat, s * W * 0.4, base + 0.8, -L / 2)); }
        addWheels(L * 0.34, -L * 0.3, W / 2 - 0.15);
        seat = { x: W * 0.22, y: base + 0.6, z: L / 2 - cab / 2 };
      }
      break;
    }
    case 'bike': {
      body.add(box(0.35, 0.35, 1.3, paint, 0, 0.55, 0));
      body.add(box(0.4, 0.15, 0.6, blackMat, 0, 0.8, -0.2));
      body.add(box(0.12, 0.7, 0.12, greyMat, 0, 0.95, 0.6));
      body.add(box(0.75, 0.06, 0.06, blackMat, 0, 1.3, 0.6));
      body.add(box(0.6, 0.5, 0.5, new THREE.MeshStandardMaterial({ color: 0xffffff }), 0, 1.05, -0.65));
      body.add(box(0.2, 0.15, 0.06, headMat, 0, 0.95, 0.68));
      addWheels(0.7, -0.65, 0);
      seat = { x: 0, y: 0.6, z: -0.2 };
      break;
    }
    case 'monster': {
      const base = 1.6;
      body.add(box(W * 0.7, 0.8, L * 0.9, paint, 0, base + 0.4, 0));
      body.add(box(W * 0.6, 0.8, L * 0.4, glassMat, 0, base + 1.2, -0.2));
      body.add(box(W * 0.62, 0.08, L * 0.38, paint, 0, base + 1.6, -0.2));
      body.add(box(W * 0.2, 0.3, L * 0.8, blackMat, 0, base - 0.3, 0));
      for (const s of [-1, 1]) body.add(box(0.4, 0.2, 0.08, headMat, s * 0.6, base + 0.5, L * 0.45));
      addWheels(L * 0.34, -L * 0.34, W / 2 - 0.4);
      seat = { x: 0.35, y: base + 0.05, z: -0.1 };
      break;
    }
    case 'rover': {
      const base = wr * 1.2;
      body.add(box(W * 0.9, 0.35, L * 0.9, paint, 0, base, 0));
      body.add(box(W * 0.95, 0.06, L * 0.5, new THREE.MeshStandardMaterial({ color: 0x1a237e, metalness: 0.5, roughness: 0.2 }), 0, base + 1.3, -L * 0.15));
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) body.add(box(0.08, 1.1, 0.08, greyMat, sx * W * 0.4, base + 0.75, -L * 0.15 + sz * L * 0.22));
      body.add(box(0.7, 0.4, 0.6, blackMat, 0.45, base + 0.35, -0.2));
      body.add(box(0.05, 1.2, 0.05, greyMat, -W * 0.35, base + 0.9, L * 0.35));
      const dish = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 6, 0, Math.PI * 2, 0, Math.PI / 3), new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
      dish.position.set(-W * 0.35, base + 1.6, L * 0.35); dish.rotation.x = 2.5; body.add(dish);
      for (const sx of [-1, 1]) body.add(box(0.35, 0.18, 0.08, headMat, sx * W * 0.3, base + 0.1, L * 0.45));
      addWheels(L * 0.36, -L * 0.36, W / 2 - 0.1);
      seat = { x: 0.45, y: base + 0.2, z: -0.2 };
      break;
    }
    case 'ufo': {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(1.1, W / 2, 0.55, 28), paint); disc.position.y = 0.5; disc.castShadow = true; body.add(disc);
      const under = new THREE.Mesh(new THREE.CylinderGeometry(W / 2, 1.0, 0.35, 28), paint); under.position.y = 0.05; body.add(under);
      const dome = new THREE.Mesh(new THREE.SphereGeometry(1.1, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), glassMat); dome.position.y = 0.75; body.add(dome);
      const lm = new THREE.MeshStandardMaterial({ color: 0x18ffff, emissive: 0x18ffff, emissiveIntensity: 1.5 });
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; body.add(box(0.2, 0.12, 0.2, lm, Math.cos(a) * (W / 2 - 0.15), 0.25, Math.sin(a) * (W / 2 - 0.15))); }
      seat = { x: 0, y: 0.7, z: -0.1 };
      break;
    }
    case 'plane': case 'jet': case 'biplane': case 'cargo': {
      const big = def.style === 'cargo', jet = def.style === 'jet';
      const fr = big ? 1.7 : jet ? 0.95 : 0.75;
      const gy = def.floats ? 1.2 : big ? 1.5 : 0.9;
      const fy = gy + fr;
      const fus = new THREE.CylinderGeometry(fr, fr * 0.35, L * 0.78, 16); fus.rotateX(Math.PI / 2);
      const fm = new THREE.Mesh(fus, paint); fm.position.set(0, fy, -L * 0.06); fm.castShadow = true; body.add(fm);
      const nose = new THREE.Mesh(jet ? new THREE.ConeGeometry(fr, L * 0.2, 16).rotateX(Math.PI / 2) : new THREE.SphereGeometry(fr, 16, 12), paint);
      nose.position.set(0, fy, L * 0.33 + (jet ? L * 0.1 : 0)); nose.castShadow = true; body.add(nose);
      const cock = new THREE.Mesh(new THREE.SphereGeometry(fr * 0.8, 14, 10), glassMat); cock.scale.set(0.9, 0.7, 1.6); cock.position.set(0, fy + fr * 0.55, L * 0.2); body.add(cock);
      const accent = new THREE.MeshStandardMaterial({ color: def.style === 'biplane' ? 0xffffff : 0x1e88e5, roughness: 0.4 });
      const wy = def.style === 'biplane' ? gy + 0.1 : jet || big ? fy - fr * 0.3 : fy + fr * 0.9;
      if (jet) {
        for (const sx of [-1, 1]) { const w = box(W / 2, 0.16, 3.2, paint, sx * W / 4, wy, -0.5); w.rotation.y = -sx * 0.45; body.add(w); }
        const glow = new THREE.Mesh(new THREE.CylinderGeometry(fr * 0.5, fr * 0.6, 0.6, 12).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xff6d00, emissive: 0xff3d00, emissiveIntensity: 2 }));
        glow.position.set(0, fy, -L * 0.45); body.add(glow); g.userData.glow = glow;
      } else {
        body.add(box(W, 0.18, big ? 4 : 1.8, paint, 0, wy, L * 0.05));
        body.add(box(W * 0.98, 0.04, 0.4, accent, 0, wy + 0.1, L * 0.05 - (big ? 1.2 : 0.4)));
      }
      if (def.style === 'biplane') {
        body.add(box(W * 0.95, 0.16, 1.7, paint, 0, wy + 1.7, L * 0.08));
        for (const sx of [-1, 1]) for (const sz of [-0.5, 0.5]) body.add(box(0.07, 1.7, 0.07, blackMat, sx * W * 0.32, wy + 0.85, L * 0.08 + sz));
      }
      body.add(box(0.15, fr * 2.4, L * 0.13, paint, 0, fy + fr * 1.2, -L * 0.4));
      body.add(box(W * 0.36, 0.12, L * 0.1, paint, 0, fy + 0.2, -L * 0.42));
      body.add(box(0.17, fr * 0.8, L * 0.08, accent, 0, fy + fr * 1.9, -L * 0.42));
      const props = [];
      const mkProp = (x, y, z, r) => {
        const pg = new THREE.Group(); pg.position.set(x, y, z);
        pg.add(box(0.14, r * 2, 0.06, blackMat, 0, 0, 0)); pg.add(box(r * 2, 0.14, 0.06, blackMat, 0, 0, 0));
        pg.add(new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 6), greyMat));
        body.add(pg); props.push(pg);
      };
      if (big) for (const x of [-7, -3.5, 3.5, 7]) { body.add(box(0.9, 0.9, 2.2, greyMat, x, wy - 0.5, L * 0.08)); mkProp(x, wy - 0.5, L * 0.08 + 1.2, 1.1); }
      else if (!jet) mkProp(0, fy, L * 0.33 + fr + 0.05, fr * 1.5);
      g.userData.props = props;
      if (def.floats) { for (const sx of [-1, 1]) { body.add(box(0.6, 0.5, L * 0.75, new THREE.MeshStandardMaterial({ color: 0xeceff1 }), sx * 1.4, 0.35, 0)); body.add(box(0.08, 0.8, 0.08, blackMat, sx * 1.2, 0.95, 0.5)); } }
      else {
        const gw = (x, z) => { const w = makeWheel(big ? 0.55 : 0.35, 0.25); w.steer.position.set(x, big ? 0.55 : 0.35, z); g.add(w.steer); body.add(box(0.08, gy, 0.08, blackMat, x, gy / 2 + 0.2, z)); };
        gw(0, L * 0.32); gw(-fr * 1.4, -L * 0.02); gw(fr * 1.4, -L * 0.02);
      }
      seat = { x: 0, y: fy - fr * 0.4, z: L * 0.18 };
      break;
    }
    case 'heli': {
      const bd = new THREE.Mesh(new THREE.SphereGeometry(1.25, 18, 14), paint); bd.scale.set(1, 1, 1.6); bd.position.set(0, 1.7, 0.6); bd.castShadow = true; body.add(bd);
      const gl = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 12), glassMat); gl.scale.set(1, 0.9, 1.3); gl.position.set(0, 1.95, 1.5); body.add(gl);
      const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.35, L * 0.55, 10).rotateX(Math.PI / 2), paint); boom.position.set(0, 2.0, -L * 0.3); body.add(boom);
      body.add(box(0.12, 1.3, 0.8, paint, 0, 2.5, -L * 0.55));
      for (const sx of [-1, 1]) { body.add(box(0.12, 0.1, 3.6, blackMat, sx * 0.9, 0.15, 0.5)); body.add(box(0.08, 0.5, 0.08, blackMat, sx * 0.9, 0.45, 1.3)); body.add(box(0.08, 0.5, 0.08, blackMat, sx * 0.9, 0.45, -0.3)); }
      body.add(box(0.2, 0.5, 0.2, greyMat, 0, 3.05, 0.5));
      const rotor = new THREE.Group(); rotor.position.set(0, 3.35, 0.5);
      rotor.add(box(L * 1.0, 0.06, 0.32, blackMat, 0, 0, 0)); rotor.add(box(0.32, 0.06, L * 1.0, blackMat, 0, 0, 0));
      body.add(rotor);
      const tr = new THREE.Group(); tr.position.set(0.15, 2.4, -L * 0.57); tr.add(box(0.05, 1.3, 0.15, blackMat, 0, 0, 0)); tr.add(box(0.05, 0.15, 1.3, blackMat, 0, 0, 0)); body.add(tr);
      g.userData.rotors = [rotor]; g.userData.tailRotor = tr;
      seat = { x: 0.35, y: 1.15, z: 1.1 };
      break;
    }
    case 'boat': {
      const hull = box(W, 0.55, L * 0.8, paint, 0, 0.3, -L * 0.1);
      body.add(hull);
      const nose = new THREE.Mesh(new THREE.ConeGeometry(W / 2, L * 0.35, 4), paint);
      nose.rotation.x = Math.PI / 2; nose.rotation.y = Math.PI / 4; nose.scale.set(1, 1, 0.55); nose.position.set(0, 0.3, L * 0.45); body.add(nose);
      body.add(box(0.5, 0.25, 0.9, blackMat, 0, 0.7, -0.4));
      body.add(box(0.7, 0.06, 0.06, blackMat, 0, 1.0, 0.35));
      seat = { x: 0, y: 0.55, z: -0.4 };
      break;
    }
  }
  return { group: g, body, wheels, seat, wr };
}

const _f = new THREE.Vector3();
const _p = { x: 0, y: 0, z: 0 };
let nextLocalId = 0;

export class Vehicle {
  constructor(type, scene, opts = {}) {
    this.type = type;
    this.def = VTYPES[type];
    this.color = opts.color ?? this.def.color ?? CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
    const m = buildMesh(this.def, this.color);
    this.mesh = m.group; this.body = m.body; this.wheels = m.wheels; this.seat = m.seat; this.wr = m.wr;
    this.pos = this.mesh.position;
    this.pos.set(opts.x || 0, opts.y || 0.2, opts.z || 0);
    this.y = this.pos.y; this.vy = 0;
    this.ry = opts.ry || 0;
    this.vel = new THREE.Vector3();
    this.steer = 0; this.wheelSpin = 0;
    this.pitch = 0; this.roll = 0; this.grounded = true;
    this.driver = null; // 'local' | remote player id | 'ai'
    this.ai = null;
    this.netId = opts.netId || null;
    this.localId = ++nextLocalId;
    this.owner = opts.owner || null;
    this.tag = opts.tag || null;
    this.horn = 0;
    this.remote = null; // {target pose} when driven by remote player
    this.mesh.rotation.order = 'YXZ';
    scene.add(this.mesh);
    this.scene = scene;
    this.cargo = 0;
    this.syncMesh();
  }
  forwardVec() { return _f.set(Math.sin(this.ry), 0, Math.cos(this.ry)); }
  speed() { const f = this.forwardVec(); return this.vel.x * f.x + this.vel.z * f.z; }
  toLocal(x, z) {
    const s = Math.sin(this.ry), c = Math.cos(this.ry), dx = x - this.pos.x, dz = z - this.pos.z;
    return { x: dx * c - dz * s, z: dx * s + dz * c };
  }
  toWorld(lx, ly, lz, out = new THREE.Vector3()) {
    const s = Math.sin(this.ry), c = Math.cos(this.ry);
    return out.set(this.pos.x + lx * c + lz * s, this.y + ly, this.pos.z - lx * s + lz * c);
  }
  rearPoint() { return this.toWorld(0, 0, -this.def.len / 2 - 1.2); }

  update(dt, ctl, world) {
    const d = this.def;
    if (this.remote) { this.updateRemote(dt); return; }
    if (d.style === 'heli') { this.updateHeli(dt, ctl, world); return; }
    if (d.air) { this.updatePlane(dt, ctl, world); return; }
    const f = this.forwardVec();
    const fx = f.x, fz = f.z, lx = fz, lz = -fx; // left vector
    let vf = this.vel.x * fx + this.vel.z * fz;
    let vl = this.vel.x * lx + this.vel.z * lz;
    const water = world.isWater(this.pos.x, this.pos.z);
    const boat = d.style === 'boat';
    const boost = this.boost || 1;
    let maxS = d.max * boost;
    if (boat && !water) maxS = 4;
    if (!boat && water && d.style !== 'ufo') maxS = 3;
    const thr = ctl ? ctl.throttle : 0, st = ctl ? ctl.steer : 0, hb = ctl && ctl.handbrake;
    if (this.grounded || boat) {
      if (thr > 0) vf += (vf < -0.5 ? 30 : d.acc * boost) * thr * dt;
      else if (thr < 0) vf += (vf > 0.5 ? -30 : -d.acc * 0.6) * -thr * dt;
      else vf *= Math.exp(-0.7 * dt);
      if (hb) vf *= Math.exp(-1.2 * dt);
      vf = clamp(vf, -maxS * 0.4, maxS);
      if (Math.abs(vf) > maxS) vf *= Math.exp(-3 * dt);
      const grip = d.style === 'ufo' ? 2.5 : boat ? 1.5 : hb ? 1.2 : d.style === 'bike' ? 10 : 7;
      vl *= Math.exp(-grip * dt);
    }
    // steering
    const maxSteer = 0.6 / (1 + Math.abs(vf) * 0.03);
    this.steer += (st * maxSteer - this.steer) * Math.min(1, dt * 8);
    if (this.grounded || boat) {
      const wb = d.len * 0.6;
      this.ry -= (vf * Math.tan(this.steer) / wb) * dt * (hb ? 1.4 : 1);
    }
    const nf = this.forwardVec();
    const nlx = nf.z, nlz = -nf.x;
    this.vel.x = nf.x * vf + nlx * vl;
    this.vel.z = nf.z * vf + nlz * vl;
    this.pos.x += this.vel.x * dt;
    this.pos.z += this.vel.z * dt;

    // vertical
    const oldY = this.y;
    let ground;
    const ufo = d.style === 'ufo';
    if (ufo) ground = (water ? -0.3 : world.groundAt(this.pos.x, this.pos.z, this.y, 2.5)) + 1.3 + Math.sin(performance.now() * 0.003) * 0.15;
    else if (boat && water) ground = -0.35 + Math.sin(performance.now() * 0.003 + this.pos.x) * 0.05;
    else if (water) ground = -1.2;
    else ground = world.groundAt(this.pos.x, this.pos.z, this.y, 0.7);
    this.vy -= 24 * world.gravity(this.pos.x) * dt;
    this.y += this.vy * dt;
    if (this.y <= ground) {
      if (!this.grounded && this.vy < -8) { this.onLand?.(-this.vy); this.pitch *= 0.3; }
      this.y = ground;
      this.vy = this.grounded ? clamp((ground - oldY) / Math.max(dt, 1e-3), 0, 25) : 0;
      this.grounded = true;
    } else if (this.y > ground + 0.08) {
      this.grounded = false;
    }
    // collisions with buildings: circles along the car
    const r = d.wid / 2, n = Math.max(1, Math.round(d.len / d.wid));
    let hitAny = null;
    for (let k = 0; k < n; k++) {
      const off = n === 1 ? 0 : -d.len / 2 + r + (k * (d.len - 2 * r)) / (n - 1);
      _p.x = this.pos.x + nf.x * off; _p.z = this.pos.z + nf.z * off; _p.y = this.y;
      const ox = _p.x, oz = _p.z;
      const hit = world.pushCircle(_p, r, d.h, 0.7);
      if (hit) { this.pos.x += _p.x - ox; this.pos.z += _p.z - oz; hitAny = { nx: hit.nx, nz: hit.nz }; }
    }
    if (hitAny) {
      const vn = this.vel.x * hitAny.nx + this.vel.z * hitAny.nz;
      if (vn < 0) {
        this.vel.x -= 1.3 * vn * hitAny.nx; this.vel.z -= 1.3 * vn * hitAny.nz;
        this.vel.multiplyScalar(0.7);
        if (vn < -6) this.onCrash?.(-vn);
      }
    }
    // visuals: pitch from terrain / air
    if (this.grounded) {
      const gf = water ? ground : world.groundAt(this.pos.x + nf.x * d.len * 0.4, this.pos.z + nf.z * d.len * 0.4, this.y, 0.9);
      const gb = water ? ground : world.groundAt(this.pos.x - nf.x * d.len * 0.4, this.pos.z - nf.z * d.len * 0.4, this.y, 0.9);
      const tp = -Math.atan2(gf - gb, d.len * 0.8);
      this.pitch += (tp - this.pitch) * Math.min(1, dt * 10);
    } else this.pitch += (0.25 - this.pitch) * dt * 0.8;
    const targetRoll = clamp(-vl * 0.03 + (d.style === 'bike' || boat ? -this.steer * vf * 0.04 : 0), -0.5, 0.5);
    this.roll += (targetRoll - this.roll) * Math.min(1, dt * 6);
    this.wheelSpin += (vf * dt) / this.wr;
    if (this.horn > 0) this.horn -= dt;
    this.syncMesh();
  }

  airCollide(world, r) {
    _p.x = this.pos.x; _p.z = this.pos.z; _p.y = this.y;
    const ox = _p.x, oz = _p.z;
    const hit = world.pushCircle(_p, r, this.def.h, 0.8);
    if (hit) { this.pos.x += _p.x - ox; this.pos.z += _p.z - oz; }
    return hit;
  }
  crash(power) {
    this.spd = (this.spd || 0) * 0.1; this.vel.multiplyScalar(0.1); this.pitchA = 0; this.roll = 0; this.throttle = 0; this.vy = 0;
    this.onCrash?.(power);
  }
  updatePlane(dt, ctl, world) {
    const d = this.def;
    if (this.throttle === undefined) { this.throttle = 0; this.spd = 0; this.pitchA = 0; }
    if (ctl) this.throttle = clamp(this.throttle + ctl.throttle * dt * 0.7, 0, 1);
    else this.throttle = Math.max(0, this.throttle - dt * 0.3);
    const water = world.isWater(this.pos.x, this.pos.z);
    const groundAt = () => world.isWater(this.pos.x, this.pos.z) ? (d.floats ? -0.35 : -1.6) : world.groundAt(this.pos.x, this.pos.z, this.y, 1.0);
    let ground = groundAt();
    const onGround = this.y <= ground + 0.08;
    const brake = onGround && ctl && ctl.throttle < 0 && this.throttle <= 0.01 ? 10 : 0;
    const boost = this.boost || 1, acc = d.acc * boost, vmax = d.max * boost;
    this.spd += (acc * this.throttle - acc * (this.spd / vmax) ** 2 - 9.8 * Math.sin(this.pitchA) * 0.7 - (onGround ? 1.2 + brake : 0)) * dt;
    if (onGround && water && !d.floats) this.spd *= Math.exp(-3 * dt);
    this.spd = Math.max(0, this.spd);
    const up = ctl ? (ctl.up ? 1 : 0) - (ctl.down ? 1 : 0) : 0, st = ctl ? ctl.steer : 0;
    const lift = this.spd / d.stall;
    if (onGround) {
      this.roll += (0 - this.roll) * Math.min(1, dt * 5);
      this.ry -= st * dt * 1.1 * clamp(this.spd / 4, 0, 1);
      if (up > 0 && lift > 1) this.pitchA += dt * 0.6; else this.pitchA += (0 - this.pitchA) * Math.min(1, dt * 3);
      this.pitchA = clamp(this.pitchA, 0, 0.35);
    } else {
      this.roll += (st * 0.85 - this.roll) * Math.min(1, dt * 2.5);
      this.ry -= this.roll * dt * d.turn * clamp(lift, 0.3, 1.4);
      this.pitchA += up * dt * 0.9 * clamp(lift, 0.2, 1.2);
      if (!up) this.pitchA *= 1 - Math.min(1, dt * 0.8);
      if (lift < 1) this.pitchA += (-0.55 - this.pitchA) * dt * (1 - lift) * 1.5;
      this.pitchA = clamp(this.pitchA, -0.9, 0.9);
    }
    if (this.y > 450) this.pitchA = Math.min(this.pitchA, 0);
    const cp = Math.cos(this.pitchA);
    let vy = this.spd * Math.sin(this.pitchA);
    if (!onGround && lift < 1) vy -= (1 - lift) * 14;
    if (onGround && lift < 1) vy = Math.min(vy, 0);
    this.vel.x = Math.sin(this.ry) * cp * this.spd; this.vel.z = Math.cos(this.ry) * cp * this.spd;
    this.pos.x += this.vel.x * dt; this.pos.z += this.vel.z * dt; this.y += vy * dt;
    this.pos.x = clamp(this.pos.x, -1400, 1400); this.pos.z = clamp(this.pos.z, -1400, 1600);
    ground = groundAt();
    if (this.y <= ground) {
      if (!onGround && (-vy > 10 || Math.abs(this.roll) > 0.7)) this.crash(40);
      this.y = ground; if (this.pitchA < 0) this.pitchA = 0;
      this.grounded = true;
    } else this.grounded = this.y <= ground + 0.08;
    this.vy = vy;
    if (this.airCollide(world, Math.min(2.5, d.len * 0.25)) && this.spd > 12) this.crash(40);
    this.pitch = -this.pitchA;
    this.prop = (this.prop || 0) + this.throttle * dt * 70 + (this.driver ? dt * 8 : 0);
    if (this.horn > 0) this.horn -= dt;
    this.syncMesh();
  }
  updateHeli(dt, ctl, world) {
    const d = this.def;
    if (this.rotorSpd === undefined) { this.rotorSpd = 0; this.vy = 0; }
    this.rotorSpd += ((ctl ? 1 : 0) - this.rotorSpd) * Math.min(1, dt * 0.6);
    const water = world.isWater(this.pos.x, this.pos.z);
    const groundAt = () => water ? -1.4 : world.groundAt(this.pos.x, this.pos.z, this.y, 1.0);
    let ground = groundAt();
    const up = ctl ? (ctl.up ? 1 : 0) - (ctl.down ? 1 : 0) : -1;
    const fly = this.rotorSpd > 0.75;
    const tvy = fly ? up * 9 : -8;
    this.vy += (tvy - this.vy) * Math.min(1, dt * 2.5);
    const f = this.forwardVec(), lx = f.z, lz = -f.x;
    let vf = this.vel.x * f.x + this.vel.z * f.z, vl = this.vel.x * lx + this.vel.z * lz;
    const thr = ctl && fly && !this.grounded ? ctl.throttle : 0;
    vf += thr * d.acc * dt; vf *= Math.exp(-(this.grounded ? 4 : 0.5) * dt); vl *= Math.exp(-2 * dt);
    vf = clamp(vf, -d.max * 0.4, d.max);
    if (ctl && fly) this.ry -= ctl.steer * dt * 1.6;
    const nf = this.forwardVec();
    this.vel.x = nf.x * vf + nf.z * vl; this.vel.z = nf.z * vf - nf.x * vl;
    this.pos.x += this.vel.x * dt; this.pos.z += this.vel.z * dt; this.y += this.vy * dt;
    this.pos.x = clamp(this.pos.x, -1400, 1400); this.pos.z = clamp(this.pos.z, -1400, 1600);
    if (this.y > 420) { this.y = 420; this.vy = Math.min(0, this.vy); }
    ground = groundAt();
    if (this.y <= ground) { if (this.vy < -14) this.crash(40); this.y = ground; this.vy = Math.max(0, this.vy); this.grounded = true; }
    else this.grounded = this.y <= ground + 0.08;
    const hit = this.airCollide(world, 2.6);
    if (hit) { const vn = this.vel.x * hit.nx + this.vel.z * hit.nz; if (vn < -12) this.crash(30); if (vn < 0) { this.vel.x -= 1.4 * vn * hit.nx; this.vel.z -= 1.4 * vn * hit.nz; } }
    this.pitch += ((this.grounded ? 0 : thr * 0.22) - this.pitch) * Math.min(1, dt * 3);
    this.roll += ((this.grounded || !ctl ? 0 : ctl.steer * 0.2) - this.roll) * Math.min(1, dt * 3);
    this.prop = (this.prop || 0) + this.rotorSpd * dt * 28;
    if (this.horn > 0) this.horn -= dt;
    this.syncMesh();
  }

  updateRemote(dt) {
    const R = this.remote, k = Math.min(1, dt * 10);
    const ox = this.pos.x, oz = this.pos.z;
    this.pos.x += (R.x - this.pos.x) * k; this.pos.z += (R.z - this.pos.z) * k; this.y += (R.y - this.y) * k;
    this.ry = angLerp(this.ry, R.ry, k);
    this.pitch += (R.pitch - this.pitch) * k; this.roll += (R.roll - this.roll) * k; this.steer = R.steer;
    if (dt > 0) { this.vel.x = (this.pos.x - ox) / dt; this.vel.z = (this.pos.z - oz) / dt; }
    this.wheelSpin += this.speed() * dt / this.wr;
    if (this.def.air) { this.prop = (this.prop || 0) + dt * 40; this.throttle = 0.7; }
    this.syncMesh();
  }

  syncMesh() {
    this.mesh.position.set(this.pos.x, this.y, this.pos.z);
    this.mesh.rotation.set(this.pitch, this.ry, this.roll);
    for (const w of this.wheels) {
      w.spin.rotation.x = this.wheelSpin;
      if (w.front) w.steer.rotation.y = this.steer;
    }
    const ud = this.mesh.userData;
    if (ud.props) for (const p of ud.props) p.rotation.z = this.prop || 0;
    if (ud.rotors) { for (const r of ud.rotors) r.rotation.y = this.prop || 0; ud.tailRotor.rotation.x = (this.prop || 0) * 1.7; }
    if (ud.glow) ud.glow.material.emissiveIntensity = 0.3 + (this.throttle || 0) * 2.5;
    const s = this.mesh.userData.siren;
    if (s && (this.driver || this.sirenOn)) {
      const on = Math.floor(performance.now() / 180) % 2;
      s[0].emissiveIntensity = on ? 2 : 0.1; s[1].emissiveIntensity = on ? 0.1 : 2;
    }
  }

  seatWorld(out) { return this.toWorld(this.seat.x, this.seat.y, this.seat.z, out); }

  dispose() { this.scene.remove(this.mesh); }
}

// --- simple vehicle vs vehicle collision (circles along length) ---
export function collideVehicles(list) {
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    for (let j = i + 1; j < list.length; j++) {
      const b = list[j];
      const dx = b.pos.x - a.pos.x, dz = b.pos.z - a.pos.z;
      const reach = (a.def.len + b.def.len) / 2;
      if (dx * dx + dz * dz > reach * reach) continue;
      if (Math.abs(a.y - b.y) > 2.5) continue;
      const fa = { x: Math.sin(a.ry), z: Math.cos(a.ry) }, fb = { x: Math.sin(b.ry), z: Math.cos(b.ry) };
      const na = Math.max(1, Math.round(a.def.len / a.def.wid)), nb = Math.max(1, Math.round(b.def.len / b.def.wid));
      const ra = a.def.wid / 2, rb = b.def.wid / 2;
      for (let p = 0; p < na; p++) {
        const oa = na === 1 ? 0 : -a.def.len / 2 + ra + (p * (a.def.len - 2 * ra)) / (na - 1);
        const ax = a.pos.x + fa.x * oa, az = a.pos.z + fa.z * oa;
        for (let q = 0; q < nb; q++) {
          const ob = nb === 1 ? 0 : -b.def.len / 2 + rb + (q * (b.def.len - 2 * rb)) / (nb - 1);
          const bx = b.pos.x + fb.x * ob, bz = b.pos.z + fb.z * ob;
          const ddx = bx - ax, ddz = bz - az, d2 = ddx * ddx + ddz * ddz, rr = ra + rb;
          if (d2 >= rr * rr || d2 < 1e-6) continue;
          const d = Math.sqrt(d2), nx = ddx / d, nz = ddz / d, pen = rr - d;
          const ma = a.def.len * a.def.wid, mb = b.def.len * b.def.wid;
          const wa = a.remote ? 0 : b.remote ? 1 : mb / (ma + mb), wb = 1 - wa;
          a.pos.x -= nx * pen * wa; a.pos.z -= nz * pen * wa;
          b.pos.x += nx * pen * wb; b.pos.z += nz * pen * wb;
          const rv = (b.vel.x - a.vel.x) * nx + (b.vel.z - a.vel.z) * nz;
          if (rv < 0) {
            const imp = -1.4 * rv;
            a.vel.x -= nx * imp * wa; a.vel.z -= nz * imp * wa;
            b.vel.x += nx * imp * wb; b.vel.z += nz * imp * wb;
            if (rv < -6) { a.onCrash?.(-rv); b.onCrash?.(-rv); }
          }
        }
      }
    }
  }
}

// --- traffic AI following the road grid ---
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
export class TrafficAI {
  constructor(v, k, m, dir) {
    this.v = v; this.k = k; this.m = m; this.dir = dir; // currently heading toward node (k, m)
    this.nextDir = this.chooseDir(); this.blocked = 0; this.cruise = 10 + Math.random() * 5;
  }
  static spawn(vehicle, rnd = Math.random) {
    const dir = Math.floor(rnd() * 4);
    const k = 1 + Math.floor(rnd() * (N - 1)), m = 1 + Math.floor(rnd() * (N - 1));
    const [dx, dz] = DIRS[dir];
    const nx = roadLine(k), nz = roadLine(m);
    const rx = -dz, rz = dx; // right of travel
    vehicle.pos.x = nx - dx * 37 + rx * 3.5; vehicle.pos.z = nz - dz * 37 + rz * 3.5;
    vehicle.ry = Math.atan2(dx, dz);
    vehicle.ai = new TrafficAI(vehicle, k, m, dir);
    vehicle.driver = 'ai';
    return vehicle.ai;
  }
  chooseDir() {
    const opts = [];
    for (let d = 0; d < 4; d++) {
      const [dx, dz] = DIRS[d], [cx, cz] = DIRS[this.dir];
      if (dx === -cx && dz === -cz) continue;
      const nk = this.k + dx, nm = this.m + dz;
      if (nk < 0 || nk > N || nm < 0 || nm > N) continue;
      opts.push(d, d === this.dir ? d : -1); // weight straight a bit more
    }
    const valid = opts.filter((o) => o >= 0);
    return valid.length ? valid[Math.floor(Math.random() * valid.length)] : (this.dir ^ 1);
  }
  target() {
    const [dx, dz] = DIRS[this.dir], [ex, ez] = DIRS[this.nextDir];
    let ox = -dz * 3.5, oz = dx * 3.5;
    if (this.nextDir !== this.dir) { ox += -ez * 3.5; oz += ex * 3.5; }
    return { x: roadLine(this.k) + ox, z: roadLine(this.m) + oz };
  }
  control(dt, obstacles) {
    const v = this.v, t = this.target();
    const dx = t.x - v.pos.x, dz = t.z - v.pos.z, dist = Math.hypot(dx, dz);
    if (dist < 4.5) {
      this.dir = this.nextDir;
      const [ddx, ddz] = DIRS[this.dir];
      this.k += ddx; this.m += ddz;
      this.nextDir = this.chooseDir();
      return this.control(dt, obstacles);
    }
    const want = Math.atan2(dx, dz);
    const diff = wrapAngle(want - v.ry);
    const steer = clamp(-diff * 2.2, -1, 1);
    const turning = this.nextDir !== this.dir && dist < 22;
    let target = turning ? 6 : this.cruise;
    // obstacle check
    const f = v.forwardVec(); const fx = f.x, fz = f.z;
    let block = 99;
    for (const o of obstacles) {
      if (o === v) continue;
      const ox = o.pos.x - v.pos.x, oz = o.pos.z - v.pos.z;
      const ahead = ox * fx + oz * fz;
      if (ahead < 0 || ahead > 16) continue;
      const side = Math.abs(ox * fz - oz * fx);
      if (side < 2.2) block = Math.min(block, ahead);
    }
    if (block < 16) target = Math.min(target, Math.max(0, (block - 6) * 1.2));
    const sp = v.speed();
    let thr = clamp((target - sp) * 0.5, -1, 1);
    if (target < 0.5 && sp < 0.5) thr = 0;
    if (block < 7) { this.blocked += dt; if (this.blocked > 3 && v.horn <= 0) { v.horn = 4; v.onHorn?.(); } } else this.blocked = 0;
    return { throttle: thr, steer, handbrake: false };
  }
}
