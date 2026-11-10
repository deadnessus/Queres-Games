import * as THREE from 'three';

// Sistema simples de partículas, anéis de impacto e números de dano.
const partGeo = new THREE.BoxGeometry(1, 1, 1);
const ringGeo = new THREE.RingGeometry(0.85, 1, 40);
const sphereGeo = new THREE.SphereGeometry(1, 16, 12);

export class Effects {
  constructor(scene) {
    this.scene = scene;
    this.parts = [];
    this.rings = [];
    this.flashes = [];
    this.lines = [];
    this.nums = [];
    this.matCache = new Map();
  }

  mat(color, additive = false) {
    const key = color + (additive ? 'a' : '');
    let m = this.matCache.get(key);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color, transparent: true, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false });
      this.matCache.set(key, m);
    }
    return m;
  }

  burst(pos, color, count = 12, speed = 5, size = 0.12, life = 0.6, gravity = -9, additive = true) {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(partGeo, this.mat(color, additive).clone());
      m.position.copy(pos);
      const s = size * (0.6 + Math.random() * 0.8);
      m.scale.setScalar(s);
      const v = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 1.4 - 0.2, Math.random() * 2 - 1).normalize().multiplyScalar(speed * (0.4 + Math.random() * 0.8));
      this.scene.add(m);
      this.parts.push({ m, v, life, max: life, gravity, s, spin: Math.random() * 10 });
    }
  }

  smoke(pos, count = 6, color = 0x555555, life = 2, rise = 1.5, size = 1) {
    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(sphereGeo, this.mat(color).clone());
      m.position.copy(pos).add(new THREE.Vector3((Math.random() - 0.5) * size, Math.random() * 0.5, (Math.random() - 0.5) * size));
      const s = (0.4 + Math.random() * 0.5) * size;
      m.scale.setScalar(s);
      m.material.opacity = 0.5;
      this.scene.add(m);
      this.parts.push({ m, v: new THREE.Vector3((Math.random() - 0.5) * 0.6, rise * (0.6 + Math.random() * 0.6), (Math.random() - 0.5) * 0.6),
        life, max: life, gravity: 0, s, grow: 1.2, smoke: true });
    }
  }

  ring(pos, color, radius = 4, life = 0.45, y = 0.05) {
    const m = new THREE.Mesh(ringGeo, this.mat(color, true).clone());
    m.rotation.x = -Math.PI / 2;
    m.position.set(pos.x, y, pos.z);
    m.material.side = THREE.DoubleSide;
    this.scene.add(m);
    this.rings.push({ m, life, max: life, radius });
  }

  flash(pos, color, radius = 1.5, life = 0.25) {
    const m = new THREE.Mesh(sphereGeo, this.mat(color, true).clone());
    m.position.copy(pos);
    this.scene.add(m);
    this.flashes.push({ m, life, max: life, radius });
  }

  tracer(from, to, color = 0xffd27a, life = 0.07) {
    const g = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()]);
    const l = new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }));
    this.scene.add(l);
    this.lines.push({ m: l, life, max: life });
  }

  explosion(pos, radius = 5) {
    this.flash(pos.clone().setY(pos.y + 0.5), 0xffaa33, radius * 0.8, 0.35);
    this.burst(pos, 0xff7a1a, 26, radius * 3, 0.3, 0.8, -6);
    this.burst(pos, 0xffe066, 14, radius * 2.2, 0.2, 0.5, -6);
    this.burst(pos, 0x3a2e22, 16, radius * 2, 0.25, 1.2, -12, false);
    this.smoke(pos, 8, 0x333333, 2.6, 2.2, radius * 0.6);
    this.ring(pos, 0xffaa55, radius * 1.2, 0.5, pos.y + 0.1);
  }

  number(text, worldPos, cls = '') {
    const el = document.createElement('div');
    el.className = 'dmgnum ' + cls;
    el.textContent = text;
    document.body.appendChild(el);
    this.nums.push({ el, pos: worldPos.clone(), life: 0.9, max: 0.9, vx: (Math.random() - 0.5) * 0.8 });
  }

  update(dt, camera, viewport) {
    for (let i = this.parts.length - 1; i >= 0; i--) {
      const p = this.parts[i];
      p.life -= dt;
      if (p.life <= 0) { this.scene.remove(p.m); p.m.material.dispose(); this.parts.splice(i, 1); continue; }
      p.v.y += p.gravity * dt;
      p.m.position.addScaledVector(p.v, dt);
      if (!p.smoke && p.m.position.y < 0.02) { p.m.position.y = 0.02; p.v.multiplyScalar(0.5); p.v.y *= -0.3; }
      const f = p.life / p.max;
      if (p.smoke) { p.m.scale.setScalar(p.s * (1 + (1 - f) * p.grow * 2)); p.m.material.opacity = 0.45 * f; }
      else { p.m.scale.setScalar(p.s * (0.3 + f * 0.7)); p.m.material.opacity = Math.min(1, f * 1.5); p.m.rotation.x += p.spin * dt; p.m.rotation.y += p.spin * dt; }
    }
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.life -= dt;
      if (r.life <= 0) { this.scene.remove(r.m); r.m.material.dispose(); this.rings.splice(i, 1); continue; }
      const f = 1 - r.life / r.max;
      r.m.scale.setScalar(0.2 + f * r.radius);
      r.m.material.opacity = 1 - f;
    }
    for (let i = this.flashes.length - 1; i >= 0; i--) {
      const r = this.flashes[i];
      r.life -= dt;
      if (r.life <= 0) { this.scene.remove(r.m); r.m.material.dispose(); this.flashes.splice(i, 1); continue; }
      const f = 1 - r.life / r.max;
      r.m.scale.setScalar(r.radius * (0.4 + f * 0.8));
      r.m.material.opacity = 1 - f;
    }
    for (let i = this.lines.length - 1; i >= 0; i--) {
      const r = this.lines[i];
      r.life -= dt;
      if (r.life <= 0) { this.scene.remove(r.m); r.m.geometry.dispose(); r.m.material.dispose(); this.lines.splice(i, 1); continue; }
      r.m.material.opacity = r.life / r.max;
    }
    if (camera) {
      const w = viewport ? viewport.w : innerWidth;
      const h = viewport ? viewport.h : innerHeight;
      const ox = viewport ? viewport.x : 0;
      for (let i = this.nums.length - 1; i >= 0; i--) {
        const n = this.nums[i];
        n.life -= dt;
        if (n.life <= 0) { n.el.remove(); this.nums.splice(i, 1); continue; }
        n.pos.y += dt * 1.6;
        n.pos.x += n.vx * dt;
        const v = n.pos.clone().project(camera);
        if (v.z > 1) { n.el.style.display = 'none'; continue; }
        n.el.style.display = '';
        n.el.style.left = (ox + (v.x * 0.5 + 0.5) * w) + 'px';
        n.el.style.top = ((-v.y * 0.5 + 0.5) * h) + 'px';
        n.el.style.opacity = Math.min(1, n.life / n.max * 2);
      }
    }
  }

  clear() {
    for (const arr of [this.parts, this.rings, this.flashes, this.lines]) {
      for (const p of arr) { this.scene.remove(p.m); p.m.material.dispose(); if (p.m.geometry && p.m.geometry !== partGeo && p.m.geometry !== ringGeo && p.m.geometry !== sphereGeo) p.m.geometry.dispose(); }
      arr.length = 0;
    }
    for (const n of this.nums) n.el.remove();
    this.nums.length = 0;
  }
}

// Textura procedural (canvas) reaproveitável
export function noiseTexture(colors, size = 256, blobs = 900, repeat = 1) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  g.fillStyle = colors[0];
  g.fillRect(0, 0, size, size);
  for (let i = 0; i < blobs; i++) {
    g.fillStyle = colors[1 + Math.floor(Math.random() * (colors.length - 1))];
    g.globalAlpha = 0.15 + Math.random() * 0.35;
    const r = 2 + Math.random() * size * 0.04;
    g.beginPath();
    g.arc(Math.random() * size, Math.random() * size, r, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
