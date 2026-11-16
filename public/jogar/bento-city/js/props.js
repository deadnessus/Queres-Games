import * as THREE from 'three';
import { canvasTexture } from './util.js';

let pizzaTex;
const mats = {};
const M = (k, c, o = {}) => mats[k] || (mats[k] = new THREE.MeshStandardMaterial({ color: c, roughness: 0.7, ...o }));

export const PTYPES = {
  box: { name: 'Caixa', r: 0.45, bounce: 0.25, fric: 4 },
  crate: { name: 'Caixote', r: 0.55, bounce: 0.2, fric: 4 },
  pizza: { name: 'Pizza', r: 0.35, bounce: 0.2, fric: 5 },
  bag: { name: 'Saco de lixo', r: 0.42, bounce: 0.1, fric: 6 },
  ball: { name: 'Bola', r: 0.55, bounce: 0.78, fric: 0.8, roll: true },
  cone: { name: 'Cone', r: 0.35, bounce: 0.3, fric: 5 },
  barrel: { name: 'Barril', r: 0.5, bounce: 0.25, fric: 3, roll: true },
  melon: { name: 'Melancia', r: 0.38, bounce: 0.3, fric: 2, roll: true },
  fish: { name: 'Peixe', r: 0.35, bounce: 0.4, fric: 3 },
  crystal: { name: 'Cristal lunar', r: 0.4, bounce: 0.3, fric: 4 },
  supply: { name: 'Caixa de suprimentos', r: 0.45, bounce: 0.25, fric: 4 },
  fuel: { name: 'Barril de combustível', r: 0.5, bounce: 0.25, fric: 3, roll: true },
};

export function makePropMesh(type) {
  let m;
  switch (type) {
    case 'box': m = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), M('box', 0xc8a26b)); {
      const tape = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.1, 0.82), M('tape', 0x8d6e3f)); m.add(tape); } break;
    case 'crate': m = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), M('crate', 0x9c6b3c)); {
      const e = new THREE.Mesh(new THREE.BoxGeometry(1.04, 0.15, 1.04), M('crate2', 0x6d4c2e)); m.add(e); } break;
    case 'pizza': {
      if (!pizzaTex) pizzaTex = canvasTexture(128, 128, (g) => {
        g.fillStyle = '#fff'; g.fillRect(0, 0, 128, 128); g.fillStyle = '#d32f2f';
        g.beginPath(); g.arc(64, 64, 44, 0, Math.PI * 2); g.fill();
        g.fillStyle = '#fff'; g.font = 'bold 30px Arial'; g.textAlign = 'center'; g.fillText('PIZZA', 64, 75);
      }, THREE);
      const top = new THREE.MeshStandardMaterial({ map: pizzaTex });
      const side = M('pizzaS', 0xffffff);
      m = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.16, 0.75), [side, side, top, side, side, side]);
    } break;
    case 'bag': m = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8), M('bag', 0x212121, { roughness: 0.3 }));
      m.scale.set(1, 1.15, 1); { const knot = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), M('bag')); knot.position.y = 0.45; m.add(knot); } break;
    case 'ball': {
      const tex = canvasTexture(128, 64, (g) => { const c = ['#e53935', '#fff', '#1e88e5', '#fff', '#fdd835', '#fff']; c.forEach((k, i) => { g.fillStyle = k; g.fillRect(i * 128 / 6, 0, 128 / 6 + 1, 64); }); }, THREE);
      m = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4 }));
    } break;
    case 'cone': { m = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.75, 12), M('cone', 0xff6d00));
      const base = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.06, 0.6), M('cone')); base.position.y = -0.36; m.add(base); } break;
    case 'barrel': m = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1, 14), M('barrel', 0x1565c0, { metalness: 0.4 })); break;
    case 'fish': { m = new THREE.Mesh(new THREE.SphereGeometry(0.32, 12, 8), M('fish', 0xffffff, { roughness: 0.3, metalness: 0.2 })); m.scale.set(0.5, 0.7, 1.3);
      const tail = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.3, 4), m.material); tail.rotation.x = -Math.PI / 2; tail.position.z = -0.4; tail.scale.set(0.4, 1, 1); m.add(tail);
      m.material = m.material.clone(); tail.material = m.material; } break;
    case 'crystal': m = new THREE.Mesh(new THREE.OctahedronGeometry(0.42), M('crystal', 0xb388ff, { emissive: 0x7c4dff, emissiveIntensity: 0.9, flatShading: true })); m.scale.y = 1.4; break;
    case 'supply': m = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8), M('supply', 0xeceff1, { metalness: 0.4 })); {
      const s = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.18, 0.82), M('supply2', 0x1565c0)); m.add(s); } break;
    case 'fuel': m = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 1, 14), M('fuel', 0xff6d00, { metalness: 0.3 })); {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.15, 14), M('fuel2', 0x212121)); m.add(s); } break;
    case 'melon': m = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 10), M('melon', 0x2e7d32)); m.scale.set(1.2, 1, 1); break;
  }
  m.castShadow = true;
  m.traverse((o) => { o.castShadow = true; });
  return m;
}

export class Prop {
  constructor(type, mesh) {
    this.type = type; this.def = PTYPES[type]; this.r = this.def.r;
    this.mesh = mesh; this.pos = mesh.position; this.vel = new THREE.Vector3();
    this.held = null; this.spin = new THREE.Vector3(); this.grounded = false; this.tag = null; this.alive = true;
  }
}

const _p = { x: 0, y: 0, z: 0 };
const _ax = new THREE.Vector3(), _q = new THREE.Quaternion();

export class Props {
  constructor(scene, world) { this.scene = scene; this.world = world; this.list = []; }

  spawn(type, x, y, z, tag = null) {
    const mesh = makePropMesh(type);
    mesh.position.set(x, y, z);
    mesh.rotation.y = Math.random() * Math.PI;
    this.scene.add(mesh);
    const p = new Prop(type, mesh); p.tag = tag;
    this.list.push(p);
    return p;
  }

  remove(p) {
    p.alive = false;
    if (p.held) p.held.held = null;
    this.scene.remove(p.mesh);
    const i = this.list.indexOf(p); if (i >= 0) this.list.splice(i, 1);
  }

  update(dt, actors, vehicles) {
    const W = this.world, L = this.list;
    for (const p of L) {
      if (p.held) continue;
      const v = p.vel, d = p.def;
      v.y -= 22 * W.gravity(p.pos.x) * dt;
      p.pos.addScaledVector(v, dt);
      const water = W.isWater(p.pos.x, p.pos.z);
      const floor = (water ? -0.45 : W.groundAt(p.pos.x, p.pos.z, p.pos.y - p.r + 0.2)) + p.r;
      p.grounded = false;
      if (p.pos.y <= floor) {
        p.pos.y = floor;
        if (water) { v.y = Math.max(v.y, 0) * 0.5; v.multiplyScalar(Math.exp(-1.5 * dt)); }
        else if (v.y < -2.5) v.y *= -d.bounce; else v.y = 0;
        const f = Math.exp(-d.fric * dt); v.x *= f; v.z *= f;
        p.grounded = true;
        p.spin.multiplyScalar(Math.exp(-6 * dt));
      }
      _p.x = p.pos.x; _p.y = p.pos.y - p.r; _p.z = p.pos.z;
      const hit = W.pushCircle(_p, p.r, p.r * 2, 0.3);
      if (hit) {
        p.pos.x = _p.x; p.pos.z = _p.z;
        const vn = v.x * hit.nx + v.z * hit.nz;
        if (vn < 0) { const k = 1 + Math.max(d.bounce, 0.3); v.x -= k * vn * hit.nx; v.z -= k * vn * hit.nz; }
      }
      // rotation
      const hs = Math.hypot(v.x, v.z);
      if (d.roll && p.grounded && hs > 0.05) {
        _ax.set(v.z, 0, -v.x).normalize(); _q.setFromAxisAngle(_ax, (hs * dt) / p.r); p.mesh.quaternion.premultiply(_q);
      } else if (!p.grounded) {
        p.mesh.rotation.x += p.spin.x * dt; p.mesh.rotation.z += p.spin.z * dt;
      } else {
        // settle upright-ish for boxes
        if (!d.roll) { p.mesh.rotation.x *= 1 - Math.min(1, dt * 6); p.mesh.rotation.z *= 1 - Math.min(1, dt * 6); }
      }
      if (p.pos.y < -20) { p.pos.set(p.pos.x, 5, Math.min(p.pos.z, 400)); v.set(0, 0, 0); }
    }
    // prop vs prop
    for (let i = 0; i < L.length; i++) {
      const a = L[i];
      for (let j = i + 1; j < L.length; j++) {
        const b = L[j];
        if (a.held && b.held) continue;
        const dx = b.pos.x - a.pos.x, dy = b.pos.y - a.pos.y, dz = b.pos.z - a.pos.z;
        const rr = a.r + b.r, d2 = dx * dx + dy * dy + dz * dz;
        if (d2 >= rr * rr || d2 < 1e-6) continue;
        const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, nz = dz / d, pen = rr - d;
        const wa = a.held ? 0 : b.held ? 1 : 0.5, wb = 1 - wa;
        if (!a.held) a.pos.set(a.pos.x - nx * pen * wb, a.pos.y - ny * pen * wb, a.pos.z - nz * pen * wb);
        if (!b.held) b.pos.set(b.pos.x + nx * pen * wa, b.pos.y + ny * pen * wa, b.pos.z + nz * pen * wa);
        const rv = (b.vel.x - a.vel.x) * nx + (b.vel.y - a.vel.y) * ny + (b.vel.z - a.vel.z) * nz;
        if (rv < 0) {
          const imp = -1.3 * rv;
          if (!a.held) { a.vel.x -= nx * imp * wb; a.vel.y -= ny * imp * wb; a.vel.z -= nz * imp * wb; }
          if (!b.held) { b.vel.x += nx * imp * wa; b.vel.y += ny * imp * wa; b.vel.z += nz * imp * wa; }
        }
      }
      // actors push props
      if (a.held) continue;
      for (const ac of actors) {
        if (!ac || ac.ragdoll === undefined) continue;
        const dx = a.pos.x - ac.pos.x, dz = a.pos.z - ac.pos.z, rr = a.r + 0.45;
        if (a.pos.y - a.r > ac.pos.y + 1.6 || a.pos.y + a.r < ac.pos.y) continue;
        const d2 = dx * dx + dz * dz;
        if (d2 >= rr * rr || d2 < 1e-6) continue;
        const d = Math.sqrt(d2), nx = dx / d, nz = dz / d;
        a.pos.x += nx * (rr - d); a.pos.z += nz * (rr - d);
        const push = Math.max(1.5, Math.hypot(ac.vel.x, ac.vel.z) * 1.1);
        const vn = a.vel.x * nx + a.vel.z * nz;
        if (vn < push) { a.vel.x += nx * (push - vn); a.vel.z += nz * (push - vn); }
      }
      // vehicles smash props
      for (const veh of vehicles) {
        const lp = veh.toLocal(a.pos.x, a.pos.z);
        const hw = veh.def.wid / 2 + a.r, hl = veh.def.len / 2 + a.r;
        if (Math.abs(lp.x) > hw || Math.abs(lp.z) > hl) continue;
        if (a.pos.y - a.r > veh.y + veh.def.h + 0.3) continue;
        const sp = Math.hypot(veh.vel.x, veh.vel.z);
        // push out along the smaller penetration axis
        const px = hw - Math.abs(lp.x), pz = hl - Math.abs(lp.z);
        const f = veh.forwardVec(), rx = f.z, rz = -f.x; // left vector
        if (px < pz) { const s = Math.sign(lp.x) * px; a.pos.x += rx * s; a.pos.z += rz * s; }
        else { const s = Math.sign(lp.z) * pz; a.pos.x += f.x * s; a.pos.z += f.z * s; }
        if (sp > 1) {
          a.vel.x = veh.vel.x * 1.25 + (Math.random() - 0.5) * 2; a.vel.z = veh.vel.z * 1.25 + (Math.random() - 0.5) * 2;
          a.vel.y = 2 + sp * 0.25;
          a.spin.set((Math.random() - 0.5) * 12, 0, (Math.random() - 0.5) * 12);
        }
      }
    }
  }

  nearest(x, y, z, fx, fz, maxD = 2.3) {
    let best = null, bd = maxD;
    for (const p of this.list) {
      if (p.held) continue;
      const dx = p.pos.x - x, dz = p.pos.z - z, dy = p.pos.y - (y + 0.8);
      const d = Math.hypot(dx, dz, dy * 0.6);
      if (d > bd) continue;
      if (d > 0.8 && (dx * fx + dz * fz) / d < 0.1) continue;
      bd = d; best = p;
    }
    return best;
  }
}
