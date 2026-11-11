import * as THREE from 'three';
import { CLASSES, ELEMENTS, buildCharacter, poseCharacter, flashModel, randomChar } from './character.js';
import { Effects, noiseTexture } from './effects.js';
import { input } from './input.js';
import { sfx } from './audio.js';

// ---------------- Ataques por classe ----------------
// type: melee | aoe | proj | dash | multi | meteor
const ATK = {
  guerreiro: {
    light: [
      { anim: 'light', dur: 0.36, hit: 0.14, type: 'melee', range: 2.4, arc: 1.5, dmg: 8, knock: 2, lunge: 3 },
      { anim: 'light2', dur: 0.36, hit: 0.14, type: 'melee', range: 2.4, arc: 1.5, dmg: 9, knock: 2, lunge: 3 },
      { anim: 'light3', dur: 0.52, hit: 0.24, type: 'melee', range: 2.6, arc: 1.3, dmg: 15, knock: 8, lunge: 5, heavy: true },
    ],
    heavy: { anim: 'spin', dur: 0.7, hit: 0.35, type: 'aoe', radius: 3.0, dmg: 18, knock: 9, heavy: true },
    special: { anim: 'cast', dur: 0.55, hit: 0.25, type: 'proj', cost: 30, speed: 17, dmg: 20, knock: 7, size: 0.7, wave: true, el: true },
    ult: { anim: 'slam', dur: 1.1, hit: 0.75, type: 'aoe', radius: 7, dmg: 45, knock: 15, cost: 100, el: true, heavy: true },
  },
  ninja: {
    light: [
      { anim: 'light', dur: 0.24, hit: 0.09, type: 'melee', range: 2.1, arc: 1.4, dmg: 6, knock: 1.5, lunge: 4 },
      { anim: 'light2', dur: 0.24, hit: 0.09, type: 'melee', range: 2.1, arc: 1.4, dmg: 6, knock: 1.5, lunge: 4 },
      { anim: 'kick', dur: 0.4, hit: 0.14, type: 'melee', range: 2.3, arc: 1.4, dmg: 11, knock: 7, lunge: 6, heavy: true },
    ],
    heavy: { anim: 'kick', dur: 0.55, hit: 0.08, type: 'dash', dashSpeed: 22, dashDur: 0.3, dmg: 15, knock: 9, heavy: true },
    special: { anim: 'throw', dur: 0.4, hit: 0.15, type: 'proj', cost: 30, speed: 26, dmg: 9, knock: 3, size: 0.28, count: 3, spread: 0.28, shuriken: true, el: true },
    ult: { anim: 'light3', dur: 1.5, hit: 0.1, type: 'multi', cost: 100, hits: 8, dmg: 6, finalDmg: 16, knock: 12, el: true },
  },
  tanque: {
    light: [
      { anim: 'light', dur: 0.5, hit: 0.22, type: 'melee', range: 2.4, arc: 1.4, dmg: 11, knock: 3, lunge: 2 },
      { anim: 'light2', dur: 0.5, hit: 0.22, type: 'melee', range: 2.4, arc: 1.4, dmg: 11, knock: 3, lunge: 2 },
      { anim: 'slam', dur: 0.7, hit: 0.45, type: 'melee', range: 2.7, arc: 1.6, dmg: 19, knock: 11, lunge: 2, heavy: true },
    ],
    heavy: { anim: 'charge', dur: 0.8, hit: 0.1, type: 'dash', dashSpeed: 15, dashDur: 0.6, dmg: 20, knock: 13, heavy: true },
    special: { anim: 'slam', dur: 0.85, hit: 0.55, type: 'aoe', cost: 30, radius: 5.2, dmg: 22, knock: 10, el: true, heavy: true },
    ult: { anim: 'slam', dur: 1.2, hit: 0.8, type: 'aoe', cost: 100, radius: 7.5, dmg: 40, knock: 16, el: true, heavy: true, fortress: true },
  },
  mago: {
    light: [
      { anim: 'light', dur: 0.4, hit: 0.16, type: 'melee', range: 2.7, arc: 1.3, dmg: 7, knock: 2, lunge: 2 },
      { anim: 'light2', dur: 0.4, hit: 0.16, type: 'melee', range: 2.7, arc: 1.3, dmg: 7, knock: 2, lunge: 2 },
      { anim: 'light3', dur: 0.55, hit: 0.26, type: 'melee', range: 2.9, arc: 1.3, dmg: 12, knock: 7, lunge: 2, heavy: true },
    ],
    heavy: { anim: 'cast', dur: 0.65, hit: 0.3, type: 'aoe', radius: 3.0, offset: 1.6, dmg: 16, knock: 10, heavy: true },
    special: { anim: 'cast', dur: 0.5, hit: 0.22, type: 'proj', cost: 30, speed: 11, dmg: 22, knock: 6, size: 0.45, homing: true, el: true },
    ult: { anim: 'cast', dur: 1.0, hit: 0.35, type: 'meteor', cost: 100, count: 12, dmg: 13, radius: 2.4, knock: 6, el: true },
  },
};

const ARENA_R = 15.5;
const GRAV = -28;

// ---------------- Mapas de controle ----------------
const P1_KEYS = {
  up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], jump: ['Space'], dash: ['ShiftLeft'],
  light: ['KeyF', 'KeyJ'], heavy: ['KeyG', 'KeyK'], special: ['KeyH', 'KeyL'], ult: ['KeyR', 'KeyI'], block: ['KeyE', 'KeyO'],
};
const P2_KEYS = {
  up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], jump: ['Enter', 'NumpadEnter'], dash: ['ShiftRight'],
  light: ['Numpad1', 'KeyB'], heavy: ['Numpad2', 'KeyN'], special: ['Numpad3', 'KeyM'], ult: ['Numpad0', 'Comma'], block: ['NumpadDecimal', 'Period'],
};

function readHuman(keys, padIdx) {
  let mx = (input.any(keys.right) ? 1 : 0) - (input.any(keys.left) ? 1 : 0);
  let mz = (input.any(keys.down) ? 1 : 0) - (input.any(keys.up) ? 1 : 0);
  const it = {
    mx, mz,
    jump: input.anyPressed(keys.jump), dash: input.anyPressed(keys.dash),
    light: input.anyPressed(keys.light), heavy: input.anyPressed(keys.heavy),
    special: input.anyPressed(keys.special), ult: input.anyPressed(keys.ult), block: input.any(keys.block),
  };
  const p = padIdx != null ? input.pad(padIdx) : null;
  if (p) {
    if (p.lx || p.ly) { it.mx = p.lx; it.mz = p.ly; }
    it.jump ||= p.pressed(0); it.special ||= p.pressed(1); it.light ||= p.pressed(2); it.heavy ||= p.pressed(3);
    it.ult ||= p.pressed(5); it.block ||= p.btn(4) || p.btn(6); it.dash ||= p.pressed(7);
  }
  const len = Math.hypot(it.mx, it.mz);
  if (len > 1) { it.mx /= len; it.mz /= len; }
  return it;
}

// ---------------- Lutador ----------------
class Fighter {
  constructor(game, cfg, team, isBot, keys, padIdx) {
    this.game = game;
    this.cfg = cfg;
    this.cls = CLASSES[cfg.cls];
    this.el = ELEMENTS[cfg.el];
    this.atk = ATK[cfg.cls];
    this.team = team;
    this.isBot = isBot;
    this.keys = keys;
    this.padIdx = padIdx;
    this.model = buildCharacter(cfg);
    game.scene.add(this.model.root);
    this.pos = this.model.root.position;
    this.vel = new THREE.Vector3();
    this.maxHp = this.cls.hp;
    this.reset(new THREE.Vector3(), 0);
    this.ai = { t: 0, strafe: Math.random() < 0.5 ? 1 : -1, blockT: 0, intent: null, backT: 0 };
  }

  reset(p, facing) {
    this.pos.copy(p);
    this.vel.set(0, 0, 0);
    this.facing = facing;
    this.hp = this.maxHp;
    this.energy = 0;
    this.state = 'idle';
    this.stateT = 0;
    this.cur = null;
    this.hitSet = new Set();
    this.combo = 0;
    this.comboT = 0;
    this.dashCd = 0;
    this.invuln = 0;
    this.status = { burn: 0, slow: 0, stun: 0, fortress: 0 };
    this.burnTick = 0;
    this.flashT = 0;
    this.onGround = true;
    this.phase = 0;
    this.blocking = false;
    this.dead = false;
    this.multi = null;
  }

  get alive() { return !this.dead; }
  get center() { return this.pos.clone().setY(this.pos.y + 1.1 * this.cls.scale); }

  forward() { return new THREE.Vector3(Math.sin(this.facing), 0, Math.cos(this.facing)); }

  nearestEnemy(maxD = Infinity) {
    let best = null; let bd = maxD;
    for (const f of this.game.fighters) {
      if (f.team === this.team || f.dead) continue;
      const d = f.pos.distanceTo(this.pos);
      if (d < bd) { bd = d; best = f; }
    }
    return best;
  }

  faceTarget(maxD = 7) {
    const t = this.nearestEnemy(maxD);
    if (t) this.facing = Math.atan2(t.pos.x - this.pos.x, t.pos.z - this.pos.z);
  }

  startAttack(def, kind) {
    if (def.cost && this.energy < def.cost) return false;
    if (def.cost) this.energy -= def.cost;
    this.faceTarget(kind === 'special' || kind === 'ult' ? 30 : 7);
    this.state = 'attack';
    this.stateT = 0;
    this.cur = def;
    this.curKind = kind;
    this.hitSet.clear();
    this.didHit = false;
    if (kind === 'ult') {
      sfx.ultimate();
      this.game.banner(`${this.cls.moves.ult.toUpperCase()}!`, this.cfg.name, 1.0);
      this.game.fx.ring(this.pos, this.el.color, 3, 0.6);
      this.game.hitstop = 0.12;
    } else if (kind === 'special') sfx.special();
    else sfx.swing();
    if (def.lunge) { const f = this.forward(); this.vel.x += f.x * def.lunge; this.vel.z += f.z * def.lunge; }
    return true;
  }

  update(dt) {
    const g = this.game;
    this.stateT += dt;
    this.dashCd -= dt;
    this.invuln -= dt;
    this.comboT -= dt;
    if (this.comboT <= 0) this.combo = 0;
    for (const k in this.status) this.status[k] = Math.max(0, this.status[k] - dt);
    if (this.flashT > 0) { this.flashT -= dt; if (this.flashT <= 0) flashModel(this.model, 0, 0); }

    // queimadura
    if (this.status.burn > 0 && !this.dead) {
      this.burnTick -= dt;
      if (this.burnTick <= 0) {
        this.burnTick = 0.5;
        this.damage(2.5, null, true);
        g.fx.burst(this.center, 0xff6a1a, 4, 2, 0.12, 0.5, 3);
      }
    }
    if (this.status.slow > 0 && Math.random() < dt * 8) g.fx.burst(this.center, 0x9fe8ff, 1, 1, 0.1, 0.6, -2);
    if (this.status.stun > 0 && Math.random() < dt * 10) g.fx.burst(this.center.add(new THREE.Vector3(0, 0.9, 0)), 0xffee55, 1, 2, 0.08, 0.3, 0);
    if (this.status.fortress > 0 && Math.random() < dt * 12) g.fx.burst(this.center, 0xffd27a, 1, 1.5, 0.1, 0.5, 2);

    let it = { mx: 0, mz: 0 };
    if (!this.dead && g.fightActive) it = this.isBot ? this.think(dt) : readHuman(this.keys, this.padIdx);

    const canAct = !this.dead && g.fightActive && this.state !== 'hurt' && this.status.stun <= 0 && this.state !== 'attack';
    this.blocking = false;

    if (canAct) {
      if (it.block && this.onGround) { this.blocking = true; }
      if (it.dash && this.dashCd <= 0) {
        let dx = it.mx; let dz = it.mz;
        if (!dx && !dz) { const f = this.forward(); dx = -f.x; dz = -f.z; }
        const l = Math.hypot(dx, dz) || 1;
        this.vel.x = (dx / l) * 18; this.vel.z = (dz / l) * 18;
        this.dashCd = 0.7; this.invuln = 0.25;
        g.fx.burst(this.pos.clone().setY(0.3), 0xdddddd, 6, 3, 0.15, 0.4, 0, false);
      } else if (it.ult && this.energy >= 100) this.startAttack(this.atk.ult, 'ult');
      else if (it.special && this.energy >= this.atk.special.cost) this.startAttack(this.atk.special, 'special');
      else if (it.heavy) this.startAttack(this.atk.heavy, 'heavy');
      else if (it.light) {
        const def = this.atk.light[this.combo % 3];
        if (this.startAttack(def, 'light')) { this.combo = (this.combo + 1) % 3; this.comboT = def.dur + 0.45; }
      } else if (it.jump && this.onGround) { this.vel.y = 11; this.onGround = false; sfx.jump(); }
    }

    // movimento
    let speed = this.cls.speed * (this.status.slow > 0 ? 0.5 : 1);
    if (this.blocking) speed *= 0.3;
    const moving = canAct && (it.mx || it.mz);
    const accel = this.onGround ? 14 : 5;
    let tx = 0; let tz = 0;
    if (moving) {
      tx = it.mx * speed; tz = it.mz * speed;
      if (!this.blocking) this.facing = Math.atan2(it.mx, it.mz);
      else this.faceTarget(10);
    }
    if (this.state === 'attack' || this.state === 'hurt' || this.dead || this.status.stun > 0) { tx = 0; tz = 0; }
    const dashing = this.dashCd > 0.45;
    if (!dashing) {
      this.vel.x += (tx - this.vel.x) * Math.min(1, accel * dt);
      this.vel.z += (tz - this.vel.z) * Math.min(1, accel * dt);
    }

    // ataque em andamento
    if (this.state === 'attack') this.updateAttack(dt);
    if (this.state === 'hurt' && this.stateT > this.hurtDur) this.state = 'idle';

    // física
    this.vel.y += GRAV * dt;
    this.pos.addScaledVector(this.vel, dt);
    if (this.pos.y <= 0) { this.pos.y = 0; this.vel.y = 0; this.onGround = true; } else this.onGround = false;
    const r = Math.hypot(this.pos.x, this.pos.z);
    if (r > ARENA_R) { this.pos.x *= ARENA_R / r; this.pos.z *= ARENA_R / r; }

    // animação
    const hs = Math.hypot(this.vel.x, this.vel.z);
    this.phase += dt * hs * 1.6;
    this.model.root.rotation.y = this.facing;
    poseCharacter(this.model, {
      phase: this.phase, speed: Math.min(1, hs / this.cls.speed), air: !this.onGround,
      action: this.state === 'attack' ? this.cur.anim : null,
      at: this.state === 'attack' ? Math.min(1, this.stateT / this.cur.dur) : 0,
      block: this.blocking, hurt: this.state === 'hurt', dead: this.dead,
    }, dt);
  }

  updateAttack(dt) {
    const d = this.cur;
    const g = this.game;
    const t = this.stateT;
    const f = this.forward();
    const hitNow = t >= d.hit && !this.didHit;

    switch (d.type) {
      case 'melee':
        if (hitNow) {
          this.didHit = true;
          for (const e of g.enemiesOf(this)) {
            const to = e.pos.clone().sub(this.pos); to.y = 0;
            const dist = to.length();
            if (dist > d.range * this.cls.scale) continue;
            if (Math.abs(e.pos.y - this.pos.y) > 2) continue;
            to.normalize();
            if (f.dot(to) < Math.cos(d.arc / 2) && dist > 0.8) continue;
            g.hit(this, e, d, d.el);
          }
          const tip = this.center.addScaledVector(f, 1.2);
          g.fx.burst(tip, 0xffffff, 3, 3, 0.07, 0.15, 0);
        }
        break;
      case 'aoe':
        if (hitNow) {
          this.didHit = true;
          const c = this.pos.clone().addScaledVector(f, d.offset || 0);
          for (const e of g.enemiesOf(this)) {
            if (e.pos.distanceTo(c) <= d.radius) g.hit(this, e, d, d.el, c);
          }
          const col = d.el ? this.el.color : 0xffffff;
          g.fx.ring(c, col, d.radius, 0.5);
          g.fx.ring(c, 0xffffff, d.radius * 0.7, 0.35);
          g.fx.burst(c.clone().setY(0.3), col, d.radius * 5, d.radius * 2.2, 0.18, 0.7, -10);
          g.fx.burst(c.clone().setY(0.2), 0x7a6650, 10, d.radius * 1.5, 0.2, 0.8, -14, false);
          g.shake(d.radius * 0.08);
          if (d.heavy) sfx.hit(true);
          if (d.fortress) { this.status.fortress = 7; g.fx.flash(this.center, 0xffd27a, 2.5, 0.5); }
        }
        break;
      case 'proj':
        if (hitNow) {
          this.didHit = true;
          const n = d.count || 1;
          for (let i = 0; i < n; i++) {
            const a = this.facing + (n > 1 ? (i - (n - 1) / 2) * d.spread : 0);
            g.spawnProjectile(this, d, a);
          }
        }
        break;
      case 'dash':
        if (t >= d.hit && t < d.hit + d.dashDur) {
          this.vel.x = f.x * d.dashSpeed; this.vel.z = f.z * d.dashSpeed;
          if (Math.random() < 0.6) g.fx.burst(this.pos.clone().setY(0.4), 0xcccccc, 1, 1, 0.15, 0.3, 0, false);
          for (const e of g.enemiesOf(this)) {
            if (this.hitSet.has(e)) continue;
            if (e.pos.distanceTo(this.pos) < 1.5 * this.cls.scale) { this.hitSet.add(e); g.hit(this, e, d, false); }
          }
        } else if (t >= d.hit + d.dashDur) { this.vel.x *= 0.8; this.vel.z *= 0.8; }
        break;
      case 'multi': { // teleporta e corta várias vezes
        if (hitNow) {
          this.didHit = true;
          const tgt = this.nearestEnemy(25);
          this.multi = tgt ? { tgt, n: 0, next: 0 } : null;
          if (!tgt) break;
        }
        if (this.multi && this.multi.tgt && !this.multi.tgt.dead) {
          const m = this.multi;
          if (t >= d.hit + m.next && m.n < d.hits) {
            const a = (m.n / d.hits) * Math.PI * 2 + Math.random();
            const tp = m.tgt.pos;
            g.fx.burst(this.center, 0x222233, 8, 3, 0.2, 0.4, 0, false);
            this.pos.set(tp.x + Math.sin(a) * 1.4, tp.y, tp.z + Math.cos(a) * 1.4);
            this.facing = Math.atan2(tp.x - this.pos.x, tp.z - this.pos.z);
            const last = m.n === d.hits - 1;
            g.hit(this, m.tgt, { dmg: last ? d.finalDmg : d.dmg, knock: last ? d.knock : 0.5, heavy: last }, last && d.el);
            g.fx.burst(m.tgt.center, this.el.color, 6, 5, 0.1, 0.3, 0);
            sfx.swing();
            m.n++; m.next += 0.13;
          }
        }
        break;
      }
      case 'meteor':
        if (hitNow) {
          this.didHit = true;
          const enemies = g.enemiesOf(this);
          for (let i = 0; i < d.count; i++) {
            const tgt = enemies.length ? enemies[i % enemies.length] : null;
            const base = tgt ? tgt.pos : this.pos.clone().addScaledVector(f, 6);
            const p = new THREE.Vector3(base.x + (Math.random() - 0.5) * 6, 0, base.z + (Math.random() - 0.5) * 6);
            g.meteors.push({ owner: this, def: d, target: p, delay: i * 0.16 + Math.random() * 0.1, mesh: null });
          }
        }
        break;
      default: break;
    }

    if (t >= d.dur) { this.state = 'idle'; this.cur = null; this.multi = null; }
  }

  damage(amount, from, silent) {
    if (this.dead) return 0;
    if (this.status.fortress > 0) amount *= 0.4;
    this.hp -= amount;
    if (!silent) this.flashT = 0.12;
    if (this.hp <= 0) {
      this.hp = 0;
      this.dead = true;
      this.state = 'dead';
      sfx.ko();
      this.game.onKO(this, from);
    }
    return amount;
  }

  // ---------- IA ----------
  think(dt) {
    const g = this.game;
    const ai = this.ai;
    const diff = g.difficulty;
    const tgt = this.nearestEnemy();
    if (!tgt) return { mx: 0, mz: 0 };
    const to = tgt.pos.clone().sub(this.pos); to.y = 0;
    const dist = to.length();
    to.normalize();
    const side = new THREE.Vector3(-to.z, 0, to.x);
    const it = { mx: 0, mz: 0 };
    const ranged = this.cfg.cls === 'mago';
    const want = ranged && this.energy >= 30 ? 6 : 1.7;

    ai.blockT -= dt; ai.backT -= dt;
    if (ai.blockT > 0) { it.block = true; return it; }

    // movimentação contínua
    let mv = new THREE.Vector3();
    if (ai.backT > 0) mv.addScaledVector(to, -1);
    else if (dist > want + 0.4) mv.add(to);
    else if (dist < want - 1.5) mv.addScaledVector(to, -0.7);
    mv.addScaledVector(side, ai.strafe * (dist < 5 ? 0.55 : 0.2));
    if (mv.lengthSq() > 0) mv.normalize();
    it.mx = mv.x; it.mz = mv.z;

    // decisões
    ai.t -= dt;
    if (ai.t <= 0) {
      ai.t = [0.55, 0.32, 0.17][diff] + Math.random() * 0.15;
      if (Math.random() < 0.15) ai.strafe *= -1;
      const r = Math.random();
      const enemyAttacking = tgt.state === 'attack' && dist < 4.5;
      if (enemyAttacking && r < [0.1, 0.35, 0.6][diff]) { ai.blockT = 0.45; return { mx: 0, mz: 0, block: true }; }
      if (enemyAttacking && r < [0.15, 0.45, 0.7][diff]) { it.dash = true; it.mx = side.x * ai.strafe; it.mz = side.z * ai.strafe; return it; }
      if (this.energy >= 100 && dist < (this.cfg.cls === 'ninja' || this.cfg.cls === 'mago' ? 20 : 6)) { it.ult = true; return it; }
      if (this.energy >= 30 && Math.random() < 0.35) {
        const sp = this.cfg.cls;
        if ((sp === 'tanque' && dist < 4.5) || (sp !== 'tanque' && dist > 3 && dist < 18)) { it.special = true; return it; }
      }
      if (dist < 2.6 * this.cls.scale) {
        if (r < 0.62) it.light = true;
        else if (r < 0.85) it.heavy = true;
        else ai.backT = 0.4;
      } else if (dist < 7 && (this.cfg.cls === 'ninja' || this.cfg.cls === 'tanque') && r < 0.2) {
        it.heavy = true;
      } else if (r < 0.04 && this.onGround) it.jump = true;
    }
    return it;
  }
}

// ---------------- Jogo de Luta ----------------
export class FightGame {
  constructor(renderer, opts) {
    this.renderer = renderer;
    this.opts = opts;
    this.difficulty = opts.difficulty;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 500);
    this.fx = new Effects(this.scene);
    this.fighters = [];
    this.projectiles = [];
    this.meteors = [];
    this.hitstop = 0;
    this.shakeAmt = 0;
    this.round = 1;
    this.wins = [0, 0];
    this.fightActive = false;
    this.camTarget = new THREE.Vector3();
    this.buildArena();
    this.createFighters();
    this.buildHud();
    this.startRound();
  }

  buildArena() {
    const s = this.scene;
    s.background = new THREE.Color(0x1a0f14);
    s.fog = new THREE.Fog(0x2a1414, 40, 140);

    // céu em gradiente
    const skyGeo = new THREE.SphereGeometry(200, 24, 16);
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { top: { value: new THREE.Color(0x120a24) }, mid: { value: new THREE.Color(0x7a2a18) }, bot: { value: new THREE.Color(0x200808) } },
      vertexShader: 'varying vec3 vp; void main(){ vp = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 bot; varying vec3 vp; void main(){ float h = vp.y; vec3 c = h > 0.0 ? mix(mid, top, pow(h, 0.6)) : mix(mid, bot, pow(-h, 0.5)); gl_FragColor = vec4(c, 1.0); }',
    });
    s.add(new THREE.Mesh(skyGeo, skyMat));

    s.add(new THREE.HemisphereLight(0xffc8a0, 0x301010, 0.7));
    const sun = new THREE.DirectionalLight(0xffd6a8, 1.6);
    sun.position.set(12, 25, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = sun.shadow.camera;
    sc.left = -20; sc.right = 20; sc.top = 20; sc.bottom = -20; sc.near = 1; sc.far = 70;
    sun.shadow.bias = -0.0005;
    s.add(sun);

    // plataforma
    const stone = noiseTexture(['#6b625a', '#57504a', '#7d746a', '#4a443e'], 512, 2500, 4);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_R + 1.5, ARENA_R - 1, 3, 48),
      new THREE.MeshStandardMaterial({ map: stone, roughness: 0.9 }));
    plat.position.y = -1.5;
    plat.receiveShadow = true;
    s.add(plat);
    // anéis decorativos
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffa040, emissive: 0xff6a00, emissiveIntensity: 0.8 });
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(ARENA_R + 0.9, 0.12, 6, 64), ringMat);
    r1.rotation.x = Math.PI / 2; r1.position.y = 0.02; s.add(r1);
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(4, 0.08, 6, 48), ringMat);
    r2.rotation.x = Math.PI / 2; r2.position.y = 0.02; s.add(r2);

    // lava abaixo
    const lava = new THREE.Mesh(new THREE.CircleGeometry(160, 48),
      new THREE.MeshStandardMaterial({ color: 0xff4400, emissive: 0xff3300, emissiveIntensity: 1.1, map: noiseTexture(['#ff5a00', '#ffb000', '#b02000', '#ff7a00'], 256, 900, 12) }));
    lava.rotation.x = -Math.PI / 2; lava.position.y = -9;
    s.add(lava);
    this.lava = lava;

    // pilares com tochas
    const pillarMat = new THREE.MeshStandardMaterial({ map: stone, roughness: 0.85 });
    this.torches = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const x = Math.cos(a) * (ARENA_R + 3.2); const z = Math.sin(a) * (ARENA_R + 3.2);
      const h = 5 + (i % 2) * 2;
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, h, 8), pillarMat);
      p.position.set(x, h / 2 - 3, z); p.castShadow = true; p.receiveShadow = true;
      s.add(p);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.3, 0.5, 8), new THREE.MeshStandardMaterial({ color: 0x333333 }));
      cap.position.set(x, h - 2.7, z); s.add(cap);
      const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 8), new THREE.MeshBasicMaterial({ color: 0xffaa33 }));
      flame.position.set(x, h - 2.1, z); s.add(flame);
      this.torches.push(flame);
      if (i % 2 === 0) {
        const l = new THREE.PointLight(0xff8a3a, 30, 22, 1.8);
        l.position.set(x, h - 1.8, z); s.add(l);
        flame.userData.light = l;
      }
    }
    // rochas flutuantes
    this.rocks = [];
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x3a3230, roughness: 1, flatShading: true });
    for (let i = 0; i < 14; i++) {
      const r = new THREE.Mesh(new THREE.DodecahedronGeometry(1 + Math.random() * 2.5, 0), rockMat);
      const a = Math.random() * Math.PI * 2; const d = 30 + Math.random() * 50;
      r.position.set(Math.cos(a) * d, -4 + Math.random() * 18, Math.sin(a) * d);
      r.userData.base = r.position.y; r.userData.ph = Math.random() * 6;
      s.add(r); this.rocks.push(r);
    }
  }

  createFighters() {
    const o = this.opts;
    const [c1, c2] = o.chars;
    const mk = (cfg, team, bot, keys, pad) => { const f = new Fighter(this, cfg, team, bot, keys, pad); this.fighters.push(f); return f; };
    const twoP = o.mode === '2v2p2';
    const merged = twoP ? P1_KEYS : P1_KEYS;
    this.p1 = mk(c1, 0, false, merged, twoP ? 1 : 0);
    if (o.mode === '2v2') mk({ ...randomChar(), name: 'Aliado ' + randomChar().name }, 0, true);
    if (twoP) mk(c2, 0, false, P2_KEYS, 0);
    const enemies = o.mode === '1v1' ? 1 : 2;
    for (let i = 0; i < enemies; i++) mk(randomChar(), 1, true);
  }

  enemiesOf(f) { return this.fighters.filter((e) => e.team !== f.team && !e.dead); }

  startRound() {
    const t0 = this.fighters.filter((f) => f.team === 0);
    const t1 = this.fighters.filter((f) => f.team === 1);
    t0.forEach((f, i) => f.reset(new THREE.Vector3((i - (t0.length - 1) / 2) * 4, 0, 7), Math.PI));
    t1.forEach((f, i) => f.reset(new THREE.Vector3((i - (t1.length - 1) / 2) * 4, 0, -7), 0));
    for (const p of this.projectiles) this.scene.remove(p.mesh);
    this.projectiles = [];
    for (const m of this.meteors) if (m.mesh) this.scene.remove(m.mesh);
    this.meteors = [];
    this.timer = 99;
    this.fightActive = false;
    this.roundOver = false;
    this.introT = 2.2;
    this.banner(`ROUND ${this.round}`, '', 1.2);
    setTimeout(() => { if (!this.disposed) this.banner('LUTEM!', '', 0.8); }, 1200);
    this.updateHud(true);
  }

  // ---------- combate ----------
  hit(att, tgt, def, elemental, srcPos) {
    if (tgt.dead || tgt.invuln > 0) return;
    const from = srcPos || att.pos;
    const dir = tgt.pos.clone().sub(from); dir.y = 0;
    if (dir.lengthSq() < 0.0001) dir.copy(att.forward());
    dir.normalize();
    const botMul = att.isBot && !tgt.isBot ? [0.6, 0.85, 1.05][this.difficulty] : 1;
    let dmg = def.dmg * att.cls.dmg / tgt.cls.def * botMul;
    let knock = def.knock;

    // defesa
    const tf = tgt.forward();
    if (tgt.blocking && tf.dot(dir) < -0.2) {
      dmg *= 0.15; knock *= 0.25;
      tgt.energy = Math.min(100, tgt.energy + 4);
      sfx.block();
      this.fx.burst(tgt.center.addScaledVector(tf, 0.5), 0x9ad4ff, 8, 4, 0.1, 0.3, 0);
      this.fx.number('DEFENDEU', tgt.center.add(new THREE.Vector3(0, 0.8, 0)), 'block');
      tgt.damage(dmg, att);
      tgt.vel.addScaledVector(dir, knock);
      return;
    }

    // efeito do elemento
    let effTxt = '';
    if (elemental) {
      const e = att.el.effect;
      if (e === 'burn') { tgt.status.burn = 3.5; effTxt = '🔥'; }
      else if (e === 'slow') { tgt.status.slow = 3; effTxt = '❄️'; }
      else if (e === 'stun') { tgt.status.stun = 0.9; effTxt = '⚡'; }
      else if (e === 'knock') { knock *= 1.7; dmg += 4; effTxt = '🪨'; }
    }

    const dealt = tgt.damage(dmg, att);
    att.energy = Math.min(100, att.energy + dealt * 0.9);
    tgt.energy = Math.min(100, tgt.energy + dealt * 0.45);
    tgt.state = tgt.dead ? 'dead' : 'hurt';
    tgt.stateT = 0;
    tgt.hurtDur = def.heavy ? 0.45 : 0.28;
    tgt.cur = null;
    tgt.vel.x += dir.x * knock; tgt.vel.z += dir.z * knock;
    if (knock > 7) { tgt.vel.y = Math.min(9, knock * 0.6); tgt.onGround = false; }
    flashModel(tgt.model, 0xffffff, 0.9);
    tgt.flashT = 0.1;
    const hc = elemental ? att.el.color : 0xfff1c0;
    this.fx.burst(tgt.center, hc, def.heavy ? 16 : 9, def.heavy ? 7 : 4.5, 0.12, 0.4, -6);
    this.fx.number(Math.round(dealt) + effTxt, tgt.center.add(new THREE.Vector3(0, 0.9, 0)), def.heavy ? 'crit' : '');
    sfx.hit(def.heavy);
    if (def.heavy) { this.hitstop = Math.max(this.hitstop, 0.07); this.shake(0.25); }
  }

  spawnProjectile(owner, def, angle) {
    const col = owner.el.color;
    let mesh;
    if (def.wave) {
      mesh = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.12, 6, 20, Math.PI), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending }));
      mesh.rotation.order = 'YXZ';
    } else if (def.shuriken) {
      mesh = new THREE.Mesh(new THREE.OctahedronGeometry(def.size, 0), new THREE.MeshBasicMaterial({ color: col }));
      mesh.scale.y = 0.25;
    } else {
      mesh = new THREE.Mesh(new THREE.SphereGeometry(def.size, 14, 10), new THREE.MeshBasicMaterial({ color: col }));
      const glow = new THREE.Mesh(new THREE.SphereGeometry(def.size * 1.7, 12, 8), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
      mesh.add(glow);
    }
    const p = owner.center;
    p.addScaledVector(new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)), 0.9);
    mesh.position.copy(p);
    this.scene.add(mesh);
    this.projectiles.push({ owner, def, mesh, vel: new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle)).multiplyScalar(def.speed), life: 2.2, angle });
  }

  updateProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      if (p.def.homing) {
        const t = p.owner.nearestEnemy();
        if (t) {
          const want = t.center.sub(p.mesh.position).normalize().multiplyScalar(p.def.speed);
          p.vel.lerp(want, Math.min(1, dt * 2.5));
        }
      }
      p.mesh.position.addScaledVector(p.vel, dt);
      if (p.def.wave) { p.mesh.rotation.y = Math.atan2(p.vel.x, p.vel.z) + Math.PI / 2; p.mesh.rotation.x = Math.PI / 2; p.mesh.rotation.z = 0; p.mesh.scale.setScalar(1 + (2.2 - p.life) * 0.4); }
      if (p.def.shuriken) p.mesh.rotation.y += dt * 25;
      if (Math.random() < 0.7) this.fx.burst(p.mesh.position, p.owner.el.color, 1, 0.8, 0.1, 0.3, 0);
      let hit = false;
      const rad = p.def.wave ? 1.3 * p.mesh.scale.x : p.def.size + 0.6;
      for (const e of this.enemiesOf(p.owner)) {
        if (e.invuln > 0) continue;
        if (e.center.distanceTo(p.mesh.position) < rad) {
          this.hit(p.owner, e, p.def, p.def.el, p.mesh.position.clone().addScaledVector(p.vel, -0.1));
          hit = true;
          if (!p.def.wave) break;
          p.hitSet ||= new Set();
        }
      }
      if (p.def.wave && hit) { p.life = Math.min(p.life, 0.05); }
      const r = Math.hypot(p.mesh.position.x, p.mesh.position.z);
      if (hit || p.life <= 0 || r > ARENA_R + 6) {
        this.fx.burst(p.mesh.position, p.owner.el.color, 10, 4, 0.12, 0.4, -4);
        this.scene.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }
    // meteoros
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.delay -= dt;
      if (m.delay > 0) continue;
      if (!m.mesh) {
        m.mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.6, 0), new THREE.MeshBasicMaterial({ color: m.owner.el.color }));
        m.mesh.position.set(m.target.x + 6, 22, m.target.z - 4);
        this.scene.add(m.mesh);
        this.fx.ring(m.target, m.owner.el.color, m.def.radius, 0.6);
      }
      const dir = m.target.clone().sub(m.mesh.position);
      const step = 34 * dt;
      if (dir.length() <= step) {
        for (const e of this.enemiesOf(m.owner)) if (e.pos.distanceTo(m.target) < m.def.radius) this.hit(m.owner, e, m.def, m.def.el, m.target);
        this.fx.explosion(m.target, m.def.radius * 0.8);
        sfx.explosion(10);
        this.shake(0.2);
        this.scene.remove(m.mesh);
        this.meteors.splice(i, 1);
      } else {
        m.mesh.position.addScaledVector(dir.normalize(), step);
        m.mesh.rotation.x += dt * 8;
        this.fx.burst(m.mesh.position, 0xff8a2a, 2, 1.5, 0.25, 0.4, 0);
      }
    }
  }

  onKO(f) {
    this.fx.burst(f.center, 0xffffff, 30, 8, 0.15, 0.8, -6);
    this.hitstop = 0.25;
    this.shake(0.4);
  }

  shake(a) { this.shakeAmt = Math.max(this.shakeAmt, a); }

  banner(text, sub = '', dur = 1.2) {
    const el = this.hud.banner;
    el.innerHTML = text + (sub ? `<small>${sub}</small>` : '');
    el.classList.add('show');
    clearTimeout(this.bannerTO);
    this.bannerTO = setTimeout(() => el.classList.remove('show'), dur * 1000);
  }

  // ---------- HUD ----------
  buildHud() {
    const root = document.getElementById('fightHud');
    root.classList.remove('hidden');
    const left = document.getElementById('fhLeft');
    const right = document.getElementById('fhRight');
    left.innerHTML = ''; right.innerHTML = '';
    this.hud = { banner: document.getElementById('fhBanner'), round: document.getElementById('fhRound'), score: document.getElementById('fhScore'), timer: document.getElementById('fhTimer') };
    for (const f of this.fighters) {
      const el = document.createElement('div');
      el.className = 'fbar' + (this.fighters.length > 2 ? ' small' : '');
      const tag = f.isBot ? (f.team === 0 ? 'BOT ALIADO' : 'BOT') : (f === this.p1 ? 'J1' : 'J2');
      el.innerHTML = `<div class="nm">${f.cls.ico} ${escapeHtml(f.cfg.name)} <small>${f.cls.nome} · ${f.el.ico} ${tag}</small></div>
        <div class="hp"><em class="lag"></em><em class="cur"></em></div><div class="en"><em></em></div>`;
      (f.team === 0 ? left : right).appendChild(el);
      f.hudEl = el;
      f.hudHp = el.querySelector('.cur'); f.hudLag = el.querySelector('.lag'); f.hudEn = el.querySelector('.en em'); f.hudEnBox = el.querySelector('.en');
    }
    const p = this.p1;
    const m = p.cls.moves;
    document.getElementById('fhMoves').innerHTML =
      `<b>${escapeHtml(p.cfg.name)}</b> · F/J ${m.light} · G/K ${m.heavy} · H/L ${m.special} (30) · R/I <b>${m.ult}</b> (100) · E/O defender · Shift esquiva`;
  }

  updateHud(force) {
    for (const f of this.fighters) {
      const r = Math.max(0, f.hp / f.maxHp);
      f.hudHp.style.transform = `scaleX(${r})`;
      f.hudLag.style.transform = `scaleX(${r})`;
      f.hudEn.style.width = f.energy + '%';
      f.hudEnBox.classList.toggle('full', f.energy >= 100);
      f.hudEl.classList.toggle('dead', f.dead);
    }
    this.hud.round.textContent = `ROUND ${this.round}`;
    this.hud.score.textContent = `${this.wins[0]} - ${this.wins[1]}`;
    this.hud.timer.textContent = Math.ceil(Math.max(0, this.timer));
  }

  // ---------- loop ----------
  update(dt) {
    if (this.hitstop > 0) { this.hitstop -= dt; dt *= 0.05; }
    const t = performance.now() / 1000;

    if (!this.fightActive && !this.roundOver) {
      this.introT -= dt;
      if (this.introT <= 0) this.fightActive = true;
    }
    if (this.fightActive) {
      this.timer -= dt;
      if (this.timer <= 0) this.endRound(null);
    }

    for (const f of this.fighters) f.update(dt);
    // separação entre lutadores
    for (let i = 0; i < this.fighters.length; i++) {
      for (let j = i + 1; j < this.fighters.length; j++) {
        const a = this.fighters[i]; const b = this.fighters[j];
        if (a.dead || b.dead) continue;
        const dx = b.pos.x - a.pos.x; const dz = b.pos.z - a.pos.z;
        const d = Math.hypot(dx, dz); const min = 0.55 * (a.cls.scale + b.cls.scale);
        if (d < min && d > 0.0001 && Math.abs(a.pos.y - b.pos.y) < 1.5) {
          const push = (min - d) / 2;
          a.pos.x -= (dx / d) * push; a.pos.z -= (dz / d) * push;
          b.pos.x += (dx / d) * push; b.pos.z += (dz / d) * push;
        }
      }
    }
    this.updateProjectiles(dt);

    if (this.fightActive) {
      const alive0 = this.fighters.some((f) => f.team === 0 && !f.dead);
      const alive1 = this.fighters.some((f) => f.team === 1 && !f.dead);
      if (!alive0 || !alive1) this.endRound(alive0 ? 0 : 1);
    }

    // cenário animado
    for (const fl of this.torches) {
      fl.scale.set(1, 0.8 + Math.sin(t * 15 + fl.position.x) * 0.25, 1);
      if (fl.userData.light) fl.userData.light.intensity = 26 + Math.sin(t * 20 + fl.position.z) * 6;
    }
    for (const r of this.rocks) { r.position.y = r.userData.base + Math.sin(t * 0.6 + r.userData.ph) * 0.8; r.rotation.y += dt * 0.1; }
    this.lava.material.map.offset.set(t * 0.01, t * 0.007);

    this.updateCamera(dt);
    this.fx.update(dt, this.camera);
    this.updateHud();
  }

  endRound(winner) {
    if (this.roundOver) return;
    this.fightActive = false;
    this.roundOver = true;
    if (winner == null) { // tempo esgotado: vence quem tem mais vida
      const sum = (tm) => this.fighters.filter((f) => f.team === tm).reduce((s, f) => s + f.hp / f.maxHp, 0);
      winner = sum(0) >= sum(1) ? 0 : 1;
      this.banner('TEMPO!', '', 1.4);
    } else this.banner('K.O.!', '', 1.4);
    this.wins[winner]++;
    setTimeout(() => {
      if (this.disposed) return;
      if (this.wins[winner] >= 2) {
        const youWin = winner === 0;
        this.banner(youWin ? 'VITÓRIA!' : 'DERROTA', youWin ? 'Você venceu a luta!' : 'Os bots venceram desta vez', 2.5);
        setTimeout(() => { if (!this.disposed) this.opts.onEnd(youWin ? 'Vitória!' : 'Derrota', `Placar final: ${this.wins[0]} x ${this.wins[1]}`); }, 2200);
      } else {
        this.round++;
        this.startRound();
      }
    }, 2000);
  }

  updateCamera(dt) {
    const alive = this.fighters.filter((f) => !f.dead);
    const list = alive.length ? alive : this.fighters;
    const c = new THREE.Vector3();
    for (const f of list) c.add(f.pos);
    c.divideScalar(list.length);
    let spread = 0;
    for (const f of list) spread = Math.max(spread, f.pos.distanceTo(c));
    this.camTarget.lerp(c, Math.min(1, dt * 4));
    const dist = 9 + spread * 1.05;
    const want = new THREE.Vector3(this.camTarget.x * 0.85, 5.5 + spread * 0.45, this.camTarget.z + dist);
    this.camera.position.lerp(want, Math.min(1, dt * 3));
    if (this.shakeAmt > 0) {
      this.camera.position.x += (Math.random() - 0.5) * this.shakeAmt;
      this.camera.position.y += (Math.random() - 0.5) * this.shakeAmt;
      this.shakeAmt = Math.max(0, this.shakeAmt - dt * 1.5);
    }
    this.camera.lookAt(this.camTarget.x, 1.2, this.camTarget.z);
  }

  render() {
    this.renderer.setScissorTest(false);
    this.renderer.setViewport(0, 0, innerWidth, innerHeight);
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.disposed = true;
    clearTimeout(this.bannerTO);
    this.hud.banner.classList.remove('show');
    this.fx.clear();
    document.getElementById('fightHud').classList.add('hidden');
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) { (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => { if (m.map) m.map.dispose(); m.dispose(); }); }
    });
  }
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
