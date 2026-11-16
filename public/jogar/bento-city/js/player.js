import * as THREE from 'three';
import { Actor } from './character.js';
import { angLerp, clamp } from './util.js';

const _v = new THREE.Vector3();

export class Player extends Actor {
  constructor(char) {
    super(char);
    this.held = null;     // Prop or Npc actor
    this.vehicle = null;
    this.mode = 'walk';
    this.spraying = false;
    this.lastAccel = 0;
    this.swimming = false;
    this.hasJetpack = false; this.maxFuel = 2.5; this.fuel = 2.5; this.jetting = false;
  }
  get actor() { return this; }

  holdPoint(out = _v) {
    const f = this.forward();
    if (this.vehicle) return this.vehicle.toWorld(this.vehicle.seat.x, this.vehicle.seat.y + 1.1, this.vehicle.seat.z + 0.6, out);
    return out.set(this.pos.x + f.x * 0.9, this.pos.y + 1.25, this.pos.z + f.z * 0.9);
  }

  grab(obj) {
    if (this.held) return;
    if (obj.actor) { // npc
      obj.actor.carriedBy = this; obj.actor.ragdoll = false; this.held = obj.actor;
    } else { obj.held = this; obj.vel.set(0, 0, 0); this.held = obj; }
  }

  release(throwIt, g) {
    const h = this.held; if (!h) return;
    this.held = null;
    const f = this.forward();
    const pitch = g ? g.camPitch : 0.3;
    const up = throwIt ? clamp(6 - pitch * 6, 2, 10) : 1;
    const sp = throwIt ? 15 : 2;
    if (h.carriedBy !== undefined && h.char) { // npc actor
      h.carriedBy = null;
      h.pos.copy(this.holdPoint());
      h.vel.set(this.vel.x, 0, this.vel.z);
      h.knock(f.x * sp, up, f.z * sp, throwIt ? 10 : 3);
    } else {
      h.held = null;
      h.vel.set(f.x * sp + this.vel.x, up, f.z * sp + this.vel.z);
      h.spin.set((Math.random() - 0.5) * 10, 0, (Math.random() - 0.5) * 10);
    }
  }

  updateHeld() {
    const h = this.held; if (!h) return;
    const p = this.holdPoint();
    if (h.char) { // npc being carried: horizontal in arms
      h.pos.set(p.x, p.y - 0.6, p.z);
      h.ry = this.ry + Math.PI / 2;
      h.char.spin.rotation.set(0, 0, Math.PI / 2 * 0.9);
      h.syncMesh('carried');
      h.char.root.position.y = p.y - 0.9;
    } else {
      h.pos.copy(p);
      if (h.r > 0.5) h.pos.y += h.r - 0.4;
      h.mesh.rotation.set(0, this.ry, 0);
    }
  }

  walk(dt, input, camYaw, world, sfx) {
    const ax = input.axis();
    const fx = Math.sin(camYaw), fz = Math.cos(camYaw), rx = -fz, rz = fx;
    let dx = fx * ax.y + rx * ax.x, dz = fz * ax.y + rz * ax.x;
    const mag = Math.hypot(dx, dz);
    const water = world.isWater(this.pos.x, this.pos.z) && this.pos.y < -0.2;
    this.swimming = water;
    const run = input.down('ShiftLeft') || input.down('ShiftRight') || mag > 0.95 && input.touch.moveId !== null;
    const max = water ? 3 : this.held ? (run ? 7 : 4.5) : run ? 9 : 5;
    const tvx = dx * max, tvz = dz * max;
    const rate = this.grounded || water ? 22 : 5;
    const ovx = this.vel.x, ovz = this.vel.z;
    this.vel.x += clamp(tvx - this.vel.x, -rate * dt, rate * dt);
    this.vel.z += clamp(tvz - this.vel.z, -rate * dt, rate * dt);
    this.lastAccel = ((this.vel.x - ovx) * fx + (this.vel.z - ovz) * fz) / Math.max(dt, 1e-3);
    let turn = 0;
    if (mag > 0.1) {
      const want = Math.atan2(dx, dz), old = this.ry;
      this.ry = angLerp(this.ry, want, Math.min(1, dt * 12));
      turn = (this.ry - old) / Math.max(dt, 1e-3) * 0.1;
    }
    this.turn = turn;
    if ((input.pressed('Space')) && (this.grounded || water)) {
      this.vel.y = water ? 6 : 9.5; this.grounded = false; sfx.jump();
    }
    const grav = world.gravity(this.pos.x);
    this.vel.y -= 25 * grav * dt;
    this.jetting = false;
    if (this.hasJetpack && !this.grounded && !water && input.down('Space') && this.fuel > 0 && !input.pressed('Space')) {
      this.vel.y = Math.min(this.vel.y + 40 * dt, 9); this.fuel -= dt; this.jetting = true;
    }
    if (this.grounded) this.fuel = Math.min(this.maxFuel, this.fuel + dt * 1.2);
    this.pos.addScaledVector(this.vel, dt);
    const g = world.groundAt(this.pos.x, this.pos.z, this.pos.y);
    const floor = water ? -1.1 : g;
    if (world.isWater(this.pos.x, this.pos.z) && this.pos.y < -0.9) { this.pos.y = Math.max(this.pos.y, -1.1); if (this.vel.y < 0) this.vel.y *= 0.5; }
    if (this.pos.y <= floor) {
      if (!this.grounded && this.vel.y < -18 * Math.sqrt(grav)) this.knock(this.vel.x * 0.5, 3, this.vel.z * 0.5);
      this.pos.y = floor; this.vel.y = 0; this.grounded = true;
    } else if (this.grounded && this.vel.y <= 0 && this.pos.y - floor < 0.4) {
      this.pos.y = floor; this.vel.y = 0; // stick to ground when walking down steps
    } else this.grounded = false;
    const hit = world.pushCircle(this.pos, this.radius, 1.8);
    if (hit) {
      const vn = this.vel.x * hit.nx + this.vel.z * hit.nz;
      if (vn < 0) { this.vel.x -= vn * hit.nx; this.vel.z -= vn * hit.nz; }
    }
    // keep inside the world
    if (this.pos.x < 2500) this.pos.x = clamp(this.pos.x, -890, 890); this.pos.z = clamp(this.pos.z, -890, 1400);
  }
}
