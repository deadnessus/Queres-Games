import * as THREE from 'three';
import { Character, Actor, SKINS, HATS } from './character.js';
import { bc, N } from './world.js';
import { angLerp } from './util.js';

const SHIRTS = [0xe53935, 0x1e88e5, 0x43a047, 0xfdd835, 0xfb8c00, 0x8e24aa, 0xffffff, 0x00acc1, 0xf06292, 0x795548, 0x9ccc65];
const PANTS = [0x37474f, 0x1a237e, 0x4e342e, 0x212121, 0x546e7a, 0x2e7d32];
const HATLIST = Object.keys(HATS).filter((k) => !HATS[k].cur);

export function randomLook(r = Math.random) {
  return {
    shirt: SHIRTS[Math.floor(r() * SHIRTS.length)], pants: PANTS[Math.floor(r() * PANTS.length)],
    skin: SKINS[Math.floor(r() * SKINS.length)], hat: r() < 0.45 ? HATLIST[Math.floor(r() * HATLIST.length)] : 'none',
    hatColor: SHIRTS[Math.floor(r() * SHIRTS.length)],
  };
}

const FAR = matchMedia('(pointer: coarse)').matches ? 110 : 170;
const O = 27.8, SIDE = O * 2, PER = SIDE * 4;
function pathPos(cx, cz, s) {
  s = ((s % PER) + PER) % PER;
  const side = Math.floor(s / SIDE), t = (s % SIDE) - O;
  switch (side) {
    case 0: return [cx + t, cz - O];
    case 1: return [cx + O, cz + t];
    case 2: return [cx - t, cz + O];
    default: return [cx - O, cz - t];
  }
}

export class Npc {
  constructor(scene, look) {
    this.char = new Character(look);
    this.actor = new Actor(this.char);
    this.actor.npc = this;
    scene.add(this.char.root);
    this.mode = 'walk';
    this.speed = 0;
  }
}

export class Pedestrians {
  constructor(scene, world, count = 40) {
    this.scene = scene; this.world = world; this.list = [];
    for (let k = 0; k < count; k++) {
      const n = new Npc(scene, randomLook());
      n.cx = bc(Math.floor(Math.random() * N)); n.cz = bc(Math.floor(Math.random() * N));
      n.s = Math.random() * PER; n.dir = Math.random() < 0.5 ? 1 : -1; n.walkSpeed = 1.3 + Math.random() * 0.8;
      n.idle = 0;
      const [x, z] = pathPos(n.cx, n.cz, n.s);
      n.actor.pos.set(x, 0.15, z);
      this.list.push(n);
    }
  }

  // A standing NPC (taxi passenger etc.)
  spawnStatic(x, z, look, y) {
    const n = new Npc(this.scene, look || randomLook());
    n.static = true; n.actor.pos.set(x, y ?? this.world.groundAt(x, z, 2), z);
    n.wave = true;
    this.list.push(n);
    return n;
  }
  remove(n) {
    this.scene.remove(n.char.root);
    const i = this.list.indexOf(n); if (i >= 0) this.list.splice(i, 1);
    if (n.actor.carriedBy) n.actor.carriedBy.held = null;
  }

  update(dt, cam, player) {
    const W = this.world;
    for (const n of this.list) {
      const a = n.actor;
      const far = Math.hypot(a.pos.x - cam.x, a.pos.z - cam.z) > FAR;
      n.char.root.visible = !far;
      if (a.carriedBy) { n.char.animate(dt, { mode: 'carried' }); continue; }
      if (a.ragdoll) {
        a.updateRagdoll(dt, W);
        a.syncMesh();
        n.char.animate(dt, { mode: 'ragdoll' });
        continue;
      }
      let speed = 0;
      if (n.static) {
        // face the player & wave
        if (player) a.ry = angLerp(a.ry, Math.atan2(player.pos.x - a.pos.x, player.pos.z - a.pos.z), dt * 3);
      } else if (n.idle > 0) n.idle -= dt;
      else {
        n.s += n.dir * n.walkSpeed * dt;
        const [tx, tz] = pathPos(n.cx, n.cz, n.s + n.dir * 1.5);
        const dx = tx - a.pos.x, dz = tz - a.pos.z, d = Math.hypot(dx, dz);
        if (d > 0.05) {
          const sp = d > 4 ? n.walkSpeed * 1.4 : n.walkSpeed;
          a.vel.x = dx / d * sp; a.vel.z = dz / d * sp;
          if (d > 6) n.s -= n.dir * n.walkSpeed * dt; // still returning to the path
          a.ry = angLerp(a.ry, Math.atan2(dx, dz), dt * 6);
          speed = sp;
        }
        if (Math.random() < dt * 0.02) n.idle = 2 + Math.random() * 4;
      }
      if (speed === 0) { a.vel.x *= 0.8; a.vel.z *= 0.8; }
      a.vel.y -= 25 * dt;
      a.pos.addScaledVector(a.vel, dt);
      const g = W.groundAt(a.pos.x, a.pos.z, a.pos.y);
      if (a.pos.y <= g) { a.pos.y = g; a.vel.y = 0; a.grounded = true; }
      if (!far) W.pushCircle(a.pos, 0.4, 1.8);
      a.syncMesh();
      if (!far) {
        n.char.animate(dt, { speed, grounded: true, mode: 'walk' });
        if (n.wave) { n.char.arms[1].rotation.set(-2.8, 0, -0.3 + Math.sin(performance.now() * 0.01) * 0.4); }
      }
    }
  }
}
