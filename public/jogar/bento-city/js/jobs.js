import * as THREE from 'three';
import { canvasTexture, dist2, clamp } from './util.js';
import { TrafficAI } from './vehicles.js';
import { BEACH_Z } from './world.js';

export const JOBS = {
  pizza: { name: 'Entregador de Pizza', place: 'pizzeria', icon: '🍕', desc: 'Pegue a pizza e entregue na casa marcada antes do tempo acabar. Use a motoca!' },
  taxi: { name: 'Taxista', place: 'taxi', icon: '🚕', desc: 'Busque passageiros com o táxi e leve-os até o destino.' },
  garbage: { name: 'Lixeiro', place: 'garbage', icon: '🗑️', desc: 'Recolha os sacos de lixo e jogue na traseira do caminhão.' },
  moving: { name: 'Mudanças', place: 'moving', icon: '📦', desc: 'Carregue as caixas no caminhão, leve até a nova casa e descarregue.' },
  fire: { name: 'Bombeiro', place: 'fire', icon: '🚒', desc: 'Apague os incêndios com a mangueira (segure o botão de ação perto do caminhão).' },
  pilot: { name: 'Piloto de Avião', place: 'airport', icon: '✈️', desc: 'Leve o avião de carga pelos anéis no céu e pouse na pista do aeroporto. W/S acelerador, A/D curva, Espaço sobe, Q desce.' },
  helirescue: { name: 'Resgate Aéreo', place: 'heliBase', icon: '🚁', desc: 'Voe de helicóptero, resgate pessoas presas em telhados e na praia e leve ao heliponto do hospital.' },
  paramedic: { name: 'Paramédico', place: 'hospital', icon: '🚑', desc: 'Encontre pessoas machucadas, carregue até a ambulância e leve ao hospital rápido.' },
  police: { name: 'Policial', place: 'police', icon: '🚓', desc: 'Persiga o carro fugitivo com a viatura e fique colado nele até encurralar.' },
  fisher: { name: 'Pescador', place: 'fishing', icon: '🎣', desc: 'Pesque na ponta do píer: quando o peixe morder aperte F (ou ✋) rápido! Venda na peixaria.' },
  mining: { name: 'Minerador Lunar', place: 'mining', icon: '💎', space: true, desc: 'Pegue cristais no campo de cristais e jogue na refinaria. Paga em ⭐ Estrelas.' },
  spacedelivery: { name: 'Correio Espacial', place: 'spacedelivery', icon: '🛰️', space: true, desc: 'Entregue caixas de suprimentos nos domos dos moradores da Lua. Paga em ⭐.' },
  repair: { name: 'Técnico de Antenas', place: 'repair', icon: '📡', space: true, desc: 'Visite as antenas com defeito e conserte (fique perto alguns segundos). Paga em ⭐.' },
  spacemission: { name: 'Missão Espacial', place: 'rocket', icon: '🚀', hidden: true, desc: 'Abasteça o foguete com 3 barris de combustível para viajar até a Lua.' },
};

// ---------- Marker (beam + ring) ----------
export class Marker {
  constructor(scene, color = 0xffeb3b) {
    this.g = new THREE.Group();
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, depthWrite: false, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 60, 16, 1, true), m);
    beam.position.y = 30; this.g.add(beam);
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 3, 32), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.25; this.g.add(ring);
    this.ring = ring;
    this.g.visible = false; scene.add(this.g);
  }
  set(x, z, y = 0) { this.g.position.set(x, y, z); this.g.visible = true; }
  hide() { this.g.visible = false; }
  update(t) { this.ring.scale.setScalar(1 + Math.sin(t * 4) * 0.08); }
}

// ---------- Fire effect ----------
let fireTex, smokeTex;
function fireTextures() {
  if (fireTex) return;
  fireTex = canvasTexture(64, 64, (g) => {
    const gr = g.createRadialGradient(32, 40, 2, 32, 36, 30);
    gr.addColorStop(0, 'rgba(255,255,200,1)'); gr.addColorStop(0.3, 'rgba(255,180,40,0.9)'); gr.addColorStop(0.7, 'rgba(255,60,0,0.5)'); gr.addColorStop(1, 'rgba(255,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }, THREE);
  smokeTex = canvasTexture(64, 64, (g) => {
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 30);
    gr.addColorStop(0, 'rgba(90,90,90,0.7)'); gr.addColorStop(1, 'rgba(90,90,90,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }, THREE);
}
export class Fire {
  constructor(scene, x, y, z) {
    fireTextures();
    this.scene = scene; this.x = x; this.y = y; this.z = z; this.hp = 100;
    this.g = new THREE.Group(); this.g.position.set(x, y, z);
    this.flames = []; this.smoke = [];
    for (let i = 0; i < 7; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: fireTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
      s.userData = { ph: Math.random() * 10, ox: (Math.random() - 0.5) * 2, oz: (Math.random() - 0.5) * 2 };
      this.g.add(s); this.flames.push(s);
    }
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, depthWrite: false, transparent: true }));
      s.userData = { t: Math.random() * 3 }; this.g.add(s); this.smoke.push(s);
    }
    scene.add(this.g);
  }
  update(dt, t) {
    const k = this.hp / 100;
    for (const s of this.flames) {
      const u = s.userData, f = (t * 3 + u.ph) % 1;
      s.position.set(u.ox * k, f * 3 * k, u.oz * k);
      const sc = (2.6 - f * 1.8) * (0.4 + k * 0.8);
      s.scale.set(sc, sc * 1.3, 1); s.material.opacity = 1 - f;
    }
    for (const s of this.smoke) {
      const u = s.userData; u.t += dt; if (u.t > 3) u.t = 0;
      s.position.set(Math.sin(u.t * 2) * 0.5, 2 + u.t * 3, 0);
      const sc = 1.5 + u.t * 1.5; s.scale.set(sc, sc, 1); s.material.opacity = (1 - u.t / 3) * 0.6 * (0.3 + k);
    }
  }
  dispose() { this.scene.remove(this.g); }
}

// ---------- Job base ----------
class Job {
  constructor(g, key) { this.g = g; this.key = key; this.def = JOBS[key]; this.target = null; this.objective = ''; this.timer = null; this.marker = new Marker(g.scene, 0xffeb3b); this.extraMarkers = []; }
  loc() { return this.g.world.locations[this.def.place]; }
  near(obj, p, r) { return dist2(obj.x, obj.z, p.x, p.z) < r; }
  setTarget(p) { this.target = p; if (p) this.marker.set(p.x, p.z, p.y || 0); else this.marker.hide(); }
  farHouse(from, min = 90, max = 320) {
    const H = this.g.world.houses;
    for (let i = 0; i < 200; i++) { const h = H[Math.floor(Math.random() * H.length)]; const d = dist2(h.x, h.z, from.x, from.z); if (d > min && d < max) return h; }
    return H[Math.floor(Math.random() * H.length)];
  }
  update(dt, t) { this.marker.update(t); }
  end() { this.marker.g.removeFromParent(); }
}

class PizzaJob extends Job {
  start() {
    this.vehicle = this.g.spawnJobVehicle('scooter', this.loc().spawn);
    this.state = 'pickup'; this.pizza = null;
    this.giveP();
  }
  giveP() {
    const z = this.loc().zone, p = this.g.player;
    this.pizza = this.g.props.spawn('pizza', z.x, 1.5, z.z, 'job');
    if (!p.held && !p.vehicle && !p.actor.ragdoll && this.near(p.pos, z, 6)) p.grab(this.pizza);
    this.house = this.farHouse(z);
    const d = dist2(z.x, z.z, this.house.x, this.house.z);
    this.timer = Math.round(clamp(d / 7 + 25, 40, 110));
    this.state = 'deliver';
    this.g.toast('Nova entrega! Leve a pizza até a casa marcada 🍕');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player;
    if (this.state === 'pickup') {
      const z = this.loc().zone; this.setTarget(z);
      this.objective = 'Volte à pizzaria para pegar a próxima pizza';
      this.timer = null;
      if (this.near(p.pos, z, 5)) this.giveP();
      return;
    }
    this.timer -= dt;
    this.setTarget(this.house);
    if (!this.pizza || !this.pizza.alive) { this.g.toast('A pizza sumiu! Volte à pizzaria.'); this.state = 'pickup'; return; }
    const holding = p.held === this.pizza;
    this.objective = holding ? 'Entregue a pizza na casa marcada (solte perto da porta)' : 'Pegue a pizza (F ou ✋) e leve até a casa';
    if (this.pizza.pos.y < -0.2 && this.g.world.isWater(this.pizza.pos.x, this.pizza.pos.z)) { this.g.toast('A pizza caiu no mar! 🌊'); this.g.props.remove(this.pizza); this.state = 'pickup'; return; }
    if (this.near(this.pizza.pos, this.house, 3.8)) {
      const pay = this.timer > 0 ? Math.round(40 + this.timer * 1.3) : 15;
      this.g.props.remove(this.pizza); this.pizza = null;
      this.g.pay(pay, this.timer > 0 ? 'Entrega no prazo! 🍕' : 'Entrega atrasada... pizza fria 🥶');
      this.g.stats('pizzas');
      this.state = 'pickup';
    }
  }
  end() { super.end(); if (this.pizza?.alive) this.g.props.remove(this.pizza); }
}

class TaxiJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('taxi', this.loc().spawn); this.newPassenger(); }
  newPassenger() {
    const p = this.g.player;
    let pt;
    for (let i = 0; i < 100; i++) { pt = this.g.world.randomSidewalk(); const d = dist2(pt.x, pt.z, p.pos.x, p.pos.z); if (d > 50 && d < 220) break; }
    this.npc = this.g.peds.spawnStatic(pt.x, pt.z);
    this.state = 'find'; this.timer = null;
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle;
    if (this.state === 'find') {
      if (!this.npc || !this.g.peds.list.includes(this.npc)) { this.newPassenger(); return; }
      const a = this.npc.actor;
      this.setTarget({ x: a.pos.x, z: a.pos.z });
      this.objective = p.vehicle === v ? 'Busque o passageiro marcado e pare perto dele' : 'Entre no táxi (tecla E) e busque o passageiro';
      if (a.ragdoll || a.carriedBy) return;
      if (p.vehicle === v && dist2(v.pos.x, v.pos.z, a.pos.x, a.pos.z) < 9 && Math.abs(v.speed()) < 3) {
        this.g.peds.remove(this.npc); this.npc = null; this.g.sfx.door();
        let pt;
        for (let i = 0; i < 100; i++) { pt = this.g.world.randomSidewalk(); const d = dist2(pt.x, pt.z, v.pos.x, v.pos.z); if (d > 140 && d < 450) break; }
        this.dest = pt; this.startD = dist2(pt.x, pt.z, v.pos.x, v.pos.z);
        this.timer = Math.round(this.startD / 9 + 20);
        this.state = 'ride';
        this.g.toast('Passageiro: "Me leva até lá, por favor!" 🚕');
      }
    } else {
      this.timer -= dt;
      this.setTarget(this.dest);
      this.objective = p.vehicle === v ? 'Leve o passageiro até o destino' : 'Volte para o táxi! O passageiro está esperando';
      if (p.vehicle === v && dist2(v.pos.x, v.pos.z, this.dest.x, this.dest.z) < 10 && Math.abs(v.speed()) < 3) {
        const pay = Math.round(25 + this.startD * 0.18 + Math.max(0, this.timer) * 1.0);
        this.g.pay(pay, this.timer > 0 ? 'Corrida concluída! Gorjeta incluída 🚕' : 'Corrida concluída (atrasada)');
        this.g.sfx.door(); this.g.stats('corridas');
        const n = this.g.peds.spawnStatic(v.toWorld(v.def.wid / 2 + 1.2, 0, 0).x, v.toWorld(v.def.wid / 2 + 1.2, 0, 0).z);
        n.wave = false; setTimeout(() => this.g.peds.remove(n), 3000);
        this.newPassenger();
      }
    }
  }
  end() { super.end(); if (this.npc) this.g.peds.remove(this.npc); }
}

class CarryJob extends Job {
  // shared helpers for garbage & moving
  spawnAround(type, cx, cz, n, spread = 6) {
    const items = [];
    for (let i = 0; i < n; i++) {
      let x, z, tries = 0;
      do { x = cx + (Math.random() - 0.5) * spread * 2; z = cz + (Math.random() - 0.5) * spread * 2; tries++; }
      while (this.g.world.groundAt(x, z, 10) > 1 && tries < 30);
      items.push(this.g.props.spawn(type, x, 2 + i * 0.3, z, 'job'));
    }
    return items;
  }
  nearestItem(items, p) {
    let b = null, bd = 1e9;
    for (const it of items) { if (!it.alive) continue; const d = dist2(it.pos.x, it.pos.z, p.x, p.z); if (d < bd) { bd = d; b = it; } }
    return b;
  }
  intoTruck(items, v) {
    const r = v.rearPoint(); let n = 0;
    for (const it of items) {
      if (!it.alive) continue;
      if (dist2(it.pos.x, it.pos.z, r.x, r.z) < 3.4 && it.pos.y < v.y + v.def.h + 2) {
        this.g.props.remove(it); n++; this.g.sfx.grab();
      }
    }
    return n;
  }
  end() { super.end(); for (const it of this.items || []) if (it.alive) this.g.props.remove(it); this.truckMarker?.removeFromParent(); }
  showRear(v) {
    if (!this.truckMarker) {
      this.truckMarker = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.2, 32), new THREE.MeshBasicMaterial({ color: 0x00e676, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
      this.truckMarker.rotation.x = -Math.PI / 2; this.g.scene.add(this.truckMarker);
    }
    const r = v.rearPoint(); this.truckMarker.position.set(r.x, v.y + 0.25, r.z); this.truckMarker.visible = true;
  }
}

class GarbageJob extends CarryJob {
  start() { this.vehicle = this.g.spawnJobVehicle('garbage', this.loc().spawn); this.round(); }
  round() {
    const W = this.g.world, z = this.loc().zone;
    let c;
    for (let i = 0; i < 100; i++) { c = W.randomSidewalk(); const d = dist2(c.x, c.z, z.x, z.z); if (d > 60 && d < 220) break; }
    this.items = [];
    for (let k = 0; k < 3; k++) {
      let p; for (let i = 0; i < 60; i++) { p = W.randomSidewalk(); if (dist2(p.x, p.z, c.x, c.z) < 90) break; }
      this.items.push(...this.spawnAround('bag', p.x, p.z, 2, 1.5));
    }
    this.total = this.items.length; this.done = 0; this.state = 'collect';
    this.g.toast('Sacos de lixo espalhados pela rua! Recolha todos 🗑️');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle;
    if (this.state === 'collect') {
      this.done += this.intoTruck(this.items, v);
      this.showRear(v);
      const holding = this.items.includes(p.held);
      const it = holding ? null : this.nearestItem(this.items, p.pos);
      this.setTarget(holding ? v.rearPoint() : it ? { x: it.pos.x, z: it.pos.z } : null);
      this.objective = `Jogue os sacos na traseira do caminhão (${this.done}/${this.total})`;
      if (this.done >= this.total) { this.state = 'return'; this.g.toast('Caminhão cheio! Volte para a central de lixo.'); }
    } else {
      if (this.truckMarker) this.truckMarker.visible = false;
      const z = this.loc().zone; this.setTarget(z);
      this.objective = 'Leve o caminhão de lixo de volta à central';
      if (dist2(v.pos.x, v.pos.z, z.x, z.z) < 16) { this.g.pay(170, 'Lixo recolhido! Cidade limpinha ✨'); this.g.stats('lixo'); this.round(); }
    }
  }
}

class MovingJob extends CarryJob {
  start() { this.vehicle = this.g.spawnJobVehicle('van', this.loc().spawn); this.round(); }
  round() {
    this.from = this.farHouse(this.loc().zone, 60, 250);
    this.to = this.farHouse(this.from, 120, 400);
    this.items = this.spawnAround(Math.random() < 0.5 ? 'box' : 'crate', this.from.x, this.from.z, 4, 2.5);
    this.items.push(...this.spawnAround('box', this.from.x, this.from.z, 1, 2));
    this.total = this.items.length; this.done = 0; this.state = 'load';
    this.g.toast('Uma família vai se mudar! Carregue as caixas 📦');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle;
    if (this.state === 'load') {
      this.done += this.intoTruck(this.items, v);
      this.showRear(v);
      const holding = this.items.includes(p.held);
      const it = holding ? null : this.nearestItem(this.items, p.pos);
      this.setTarget(holding ? v.rearPoint() : it ? { x: it.pos.x, z: it.pos.z } : null);
      this.objective = `Coloque as caixas na traseira do caminhão (${this.done}/${this.total})`;
      if (this.done >= this.total) { this.state = 'drive'; this.g.toast('Tudo carregado! Dirija até a casa nova.'); }
    } else if (this.state === 'drive') {
      if (this.truckMarker) this.truckMarker.visible = false;
      this.setTarget(this.to);
      this.objective = 'Leve o caminhão até a casa nova';
      if (dist2(v.pos.x, v.pos.z, this.to.x, this.to.z) < 16) {
        const r = v.rearPoint();
        this.items = this.spawnAround('box', r.x, r.z, this.total, 1.5);
        this.done = 0; this.state = 'unload';
        this.g.toast('Descarregue as caixas na porta da casa nova!');
      }
    } else {
      for (const it of this.items) if (it.alive && dist2(it.pos.x, it.pos.z, this.to.door.x, this.to.door.z) < 4) { this.g.props.remove(it); this.done++; this.g.sfx.grab(); }
      const holding = this.items.includes(p.held);
      const it = holding ? null : this.nearestItem(this.items, p.pos);
      this.setTarget(holding ? this.to : it ? { x: it.pos.x, z: it.pos.z } : this.to);
      this.objective = `Leve as caixas até a porta (${this.done}/${this.total})`;
      if (this.done >= this.total) { this.g.pay(220, 'Mudança concluída! 📦'); this.g.stats('mudancas'); this.round(); }
    }
  }
}

class FireJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('fire', this.loc().spawn); this.fires = []; this.wait = 0; this.call(); }
  call() {
    const W = this.g.world, z = this.loc().zone;
    let b;
    for (let i = 0; i < 300; i++) { b = W.buildings[Math.floor(Math.random() * W.buildings.length)]; const d = dist2((b.x0 + b.x1) / 2, (b.z0 + b.z1) / 2, z.x, z.z); if (d > 80 && d < 320) break; }
    this.building = b;
    const n = 3 + Math.floor(Math.random() * 2);
    for (let k = 0; k < n; k++) {
      const side = Math.floor(Math.random() * 4), t = 0.15 + Math.random() * 0.7;
      let x, zz;
      if (side === 0) { x = b.x0 + (b.x1 - b.x0) * t; zz = b.z1 + 0.6; }
      else if (side === 1) { x = b.x0 + (b.x1 - b.x0) * t; zz = b.z0 - 0.6; }
      else if (side === 2) { x = b.x1 + 0.6; zz = b.z0 + (b.z1 - b.z0) * t; }
      else { x = b.x0 - 0.6; zz = b.z0 + (b.z1 - b.z0) * t; }
      const y = 0.3 + Math.random() * Math.min(6, Math.max(0, b.h - 2));
      this.fires.push(new Fire(this.g.scene, x, y, zz));
    }
    this.total = this.fires.length;
    this.g.toast('🚨 Incêndio na cidade! Vá até lá com o caminhão!');
    this.g.sfx.fail();
  }
  canSpray() {
    const p = this.g.player, v = this.vehicle;
    return p.vehicle === v || dist2(p.pos.x, p.pos.z, v.pos.x, v.pos.z) < 40;
  }
  waterHit(x, y, z) {
    for (const f of this.fires) {
      if (Math.abs(f.x - x) < 2.3 && Math.abs(f.z - z) < 2.3 && y > f.y - 1 && y < f.y + 3.5) { f.hp -= 1.1; return true; }
    }
    return false;
  }
  update(dt, t) {
    super.update(dt, t);
    for (const f of this.fires) f.update(dt, t);
    for (let i = this.fires.length - 1; i >= 0; i--) if (this.fires[i].hp <= 0) { this.fires[i].dispose(); this.fires.splice(i, 1); this.g.sfx.splash(); }
    if (this.fires.length === 0) {
      this.setTarget(null);
      this.objective = 'Aguardando o próximo chamado...';
      if (this.wait === 0) { this.g.pay(240, 'Incêndio apagado! Herói da cidade 🚒'); this.g.stats('incendios'); }
      this.wait += dt; if (this.wait > 6) { this.wait = 0; this.call(); }
      return;
    }
    let near = this.fires[0], bd = 1e9; const p = this.g.player;
    for (const f of this.fires) { const d = dist2(f.x, f.z, p.pos.x, p.pos.z); if (d < bd) { bd = d; near = f; } }
    this.setTarget({ x: near.x, z: near.z });
    this.objective = `Apague o fogo! Segure o clique (ou 💧) para usar a mangueira (${this.total - this.fires.length}/${this.total})`;
    if (!this.canSpray()) this.objective = 'Leve o caminhão de bombeiros até o incêndio (a mangueira fica nele)';
  }
  end() { super.end(); for (const f of this.fires) f.dispose(); this.fires = []; }
}

class MiningJob extends CarryJob {
  start() { this.vehicle = this.g.spawnJobVehicle('rover', this.loc().spawn); this.round(); }
  round() {
    const f = this.g.world.crystalField;
    this.items = this.spawnAround('crystal', f.x, f.z, 6, 25);
    this.total = this.items.length; this.done = 0;
    this.g.toast('Cristais detectados no campo! 💎');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, ref = this.g.world.locations.refinery;
    for (const it of this.items) if (it.alive && dist2(it.pos.x, it.pos.z, ref.x, ref.z) < 4.5) { this.g.props.remove(it); this.done++; this.g.sfx.coin(); }
    // crystals loaded into the rover also count, they get driven to the refinery
    this.done += this.intoTruck(this.items, this.vehicle);
    this.showRear(this.vehicle);
    const holding = this.items.includes(p.held);
    const it = holding ? null : this.nearestItem(this.items, p.pos);
    this.setTarget(holding || !it ? ref : { x: it.pos.x, z: it.pos.z });
    this.objective = `Leve os cristais até a refinaria ou jogue na traseira do rover (${this.done}/${this.total})`;
    if (this.done >= this.total) { this.g.payStars(12, 'Carga de cristais refinada! 💎'); this.g.stats('cristais'); this.round(); }
  }
}

class SpaceDeliveryJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('rover', this.loc().spawn); this.state = 'pickup'; this.box = null; }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, z = this.loc().zone;
    if (this.state === 'pickup') {
      this.setTarget(z); this.timer = null;
      this.objective = 'Pegue a caixa de suprimentos no Correio Espacial';
      if (this.near(p.pos, z, 5)) {
        this.box = this.g.props.spawn('supply', z.x, 1.5, z.z, 'job');
        if (!p.held && !p.vehicle) p.grab(this.box);
        const H = this.g.world.moonHouses; this.house = H[Math.floor(Math.random() * H.length)];
        this.timer = Math.round(dist2(z.x, z.z, this.house.x, this.house.z) / 6 + 25);
        this.state = 'deliver'; this.g.toast('Entrega para um domo da Lua! 🛰️');
      }
      return;
    }
    this.timer -= dt; this.setTarget(this.house);
    if (!this.box?.alive) { this.state = 'pickup'; return; }
    this.objective = p.held === this.box ? 'Leve a caixa até a porta do domo marcado' : 'Pegue a caixa (F ou ✋) e leve até o domo';
    if (this.near(this.box.pos, this.house, 4)) {
      this.g.props.remove(this.box); this.box = null;
      this.g.payStars(this.timer > 0 ? 6 : 3, this.timer > 0 ? 'Entrega espacial no prazo! 🛰️' : 'Entrega atrasada...');
      this.g.stats('entregasEspaciais'); this.state = 'pickup';
    }
  }
  end() { super.end(); if (this.box?.alive) this.g.props.remove(this.box); }
}

class RepairJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('rover', this.loc().spawn); this.round(); }
  round() {
    const A = [...this.g.world.antennas].sort(() => Math.random() - 0.5);
    this.list = A.slice(0, 3); this.i = 0; this.prog = 0;
    for (const a of this.list) a.lamp.material.color.set(0xff1744);
    this.g.toast('3 antenas com defeito! 📡');
  }
  update(dt, t) {
    super.update(dt, t);
    const a = this.list[this.i], p = this.g.player;
    this.setTarget(a);
    a.lamp.visible = Math.floor(t * 4) % 2 === 0;
    const close = !p.vehicle && dist2(p.pos.x, p.pos.z, a.x, a.z) < 4.5;
    if (close) this.prog += dt; else this.prog = Math.max(0, this.prog - dt);
    this.objective = close ? `Consertando... ${Math.min(100, Math.round(this.prog / 3 * 100))}%` : `Vá até a antena e fique perto dela a pé (${this.i}/3)`;
    if (this.prog >= 3) {
      a.lamp.visible = true; this.g.sfx.success(); this.i++; this.prog = 0;
      if (this.i >= 3) { this.g.payStars(10, 'Antenas consertadas! 📡'); this.g.stats('antenas'); this.round(); }
    }
  }
  end() { super.end(); for (const a of this.g.world.antennas) a.lamp.visible = true; }
}

class SpaceMissionJob extends CarryJob {
  start() {
    const f = this.g.world.locations.fuel, r = this.g.world.locations.rocket;
    this.items = [];
    [[-14, 16], [16, 18], [-4, 26]].forEach(([dx, dz]) => this.items.push(this.g.props.spawn('fuel', r.x + dx, 1.5, r.z + dz, 'job')));
    this.total = 3; this.done = 0; this.fuel = f;
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, f = this.fuel;
    for (const it of this.items) if (it.alive && dist2(it.pos.x, it.pos.z, f.x, f.z) < 3.5) { this.g.props.remove(it); this.done++; this.g.sfx.coin(); }
    const holding = this.items.includes(p.held);
    const it = holding ? null : this.nearestItem(this.items, p.pos);
    this.setTarget(holding || !it ? f : { x: it.pos.x, z: it.pos.z });
    this.objective = `Leve os barris de combustível até o tanque do foguete (${this.done}/3)`;
    if (this.done >= 3) this.g.finishSpaceMission();
  }
}

// ---------- New earth jobs ----------
const _rv = new THREE.Vector3();
class PilotJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('cargo', this.loc().spawn); this.rings = []; this.round(); }
  round() {
    this.clearRings();
    const n = 4, start = Math.random() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const a = start + i * (Math.PI * 2 / n) * (0.8 + Math.random() * 0.3), r = 250 + Math.random() * 250;
      const x = Math.cos(a) * r, z = Math.sin(a) * r * 0.9, y = 60 + Math.random() * 90;
      const m = new THREE.Mesh(new THREE.TorusGeometry(14, 1.1, 8, 32), new THREE.MeshBasicMaterial({ color: 0xffeb3b, transparent: true, opacity: 0.85 }));
      m.position.set(x, y, z); this.g.scene.add(m); this.rings.push(m);
    }
    for (let i = 0; i < n; i++) { const a = this.rings[i], b = this.rings[i + 1] || a; if (b !== a) a.lookAt(b.position); }
    this.i = 0; this.state = 'rings';
    this.g.toast('Plano de voo: passe pelos anéis amarelos ✈️');
  }
  clearRings() { for (const r of this.rings || []) r.removeFromParent(); this.rings = []; }
  update(dt, t) {
    super.update(dt, t);
    const v = this.vehicle, p = this.g.player, rw = this.g.world.runway;
    if (this.state === 'rings') {
      const r = this.rings[this.i];
      r.material.color.set(0x00e676);
      this.setTarget({ x: r.position.x, z: r.position.z });
      this.objective = p.vehicle === v ? `Passe pelo anel verde (${this.i}/${this.rings.length}) · altura ${Math.round(r.position.y)} m` : 'Entre no avião de carga (E) na pista do aeroporto';
      if (p.vehicle === v && v.pos.distanceTo(_rv.set(r.position.x, v.pos.y, r.position.z)) < 16 && Math.abs(v.y - r.position.y) < 15) {
        r.material.opacity = 0.2; r.material.color.set(0xffffff); this.i++; this.g.sfx.coin();
        if (this.i >= this.rings.length) { this.state = 'land'; this.g.toast('Agora pouse na pista do aeroporto! 🛬'); }
      }
    } else {
      this.setTarget({ x: (rw.x0 + rw.x1) / 2, z: 0 });
      this.objective = 'Pouse na pista do aeroporto e pare o avião';
      if (p.vehicle === v && v.grounded && v.spd < 4 && v.pos.x > rw.x0 && v.pos.x < rw.x1 && v.pos.z > rw.z0 && v.pos.z < rw.z1) {
        this.g.pay(380, 'Voo concluído! Pouso perfeito 🛬'); this.g.stats('voos'); this.round();
      }
    }
  }
  end() { super.end(); this.clearRings(); }
}

class HeliRescueJob extends Job {
  start() {
    this.vehicle = this.g.spawnJobVehicle('rescueheli', this.loc().spawn); this.next();
  }
  next() {
    const W = this.g.world;
    let x, z, y;
    if (Math.random() < 0.4) { x = -300 + Math.random() * 600; z = BEACH_Z + 20 + Math.random() * 30; y = 0; }
    else {
      const tall = W.buildings.filter((b) => b.h > 12 && b.h < 70 && b.x1 - b.x0 > 12);
      const b = tall[Math.floor(Math.random() * tall.length)];
      x = (b.x0 + b.x1) / 2; z = (b.z0 + b.z1) / 2; y = b.h;
    }
    this.npc = this.g.peds.spawnStatic(x, z, null, y);
    this.spot = { x, z, y }; this.state = 'find'; this.timer = 120;
    this.g.toast(y > 1 ? '🚨 Pessoa presa num telhado!' : '🚨 Banhista precisa de resgate na praia!');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle, H = this.g.world.locations.helipad;
    if (p.vehicle === v) this.timer -= dt;
    if (this.state === 'find') {
      this.setTarget(this.spot);
      this.objective = p.vehicle === v ? `Pouse perto da pessoa (altura ${Math.round(this.spot.y)} m)` : 'Entre no helicóptero de resgate (E)';
      if (p.vehicle === v && dist2(v.pos.x, v.pos.z, this.spot.x, this.spot.z) < 12 && Math.abs(v.y - this.spot.y) < 3.5 && Math.hypot(v.vel.x, v.vel.z) < 5) {
        this.g.peds.remove(this.npc); this.npc = null; this.state = 'deliver'; this.g.sfx.door();
        this.g.toast('Pessoa a bordo! Leve ao heliponto do hospital 🏥');
      }
    } else {
      this.setTarget(H);
      this.objective = 'Pouse no heliponto (H) do telhado do hospital';
      if (p.vehicle === v && dist2(v.pos.x, v.pos.z, H.x, H.z) < 9 && Math.abs(v.y - H.y) < 2.5 && v.grounded) {
        this.g.pay(Math.round(220 + Math.max(0, this.timer) * 1.5), 'Resgate concluído! 🚁'); this.g.stats('resgates'); this.next();
      }
    }
  }
  end() { super.end(); if (this.npc) this.g.peds.remove(this.npc); }
}

class ParamedicJob extends CarryJob {
  start() { this.vehicle = this.g.spawnJobVehicle('ambulance', this.loc().spawn); this.next(); }
  next() {
    const p = this.g.player;
    let pt;
    for (let i = 0; i < 100; i++) { pt = this.g.world.randomSidewalk(); const d = dist2(pt.x, pt.z, p.pos.x, p.pos.z); if (d > 70 && d < 260) break; }
    this.npc = this.g.peds.spawnStatic(pt.x, pt.z); this.npc.wave = false;
    this.npc.actor.noGetUp = true; this.npc.actor.knock(0, 2, 0, 2);
    this.state = 'find'; this.timer = 90;
    this.g.toast('🚑 Emergência! Alguém se machucou.');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle, z = this.loc().zone;
    this.timer -= dt;
    if (this.state === 'find') {
      const a = this.npc.actor;
      this.showRear(v);
      const holding = p.held === a;
      this.setTarget(holding ? v.rearPoint() : { x: a.pos.x, z: a.pos.z });
      this.objective = holding ? 'Coloque o paciente na traseira da ambulância' : 'Vá até o paciente e pegue (F ou ✋)';
      const r = v.rearPoint();
      if (dist2(a.pos.x, a.pos.z, r.x, r.z) < 3.4) {
        if (p.held === a) p.held = null;
        this.g.peds.remove(this.npc); this.npc = null; this.state = 'drive'; this.g.sfx.door();
        if (this.truckMarker) this.truckMarker.visible = false;
        this.g.toast('Paciente na ambulância! Corra para o hospital 🏥');
      }
    } else {
      this.setTarget(z);
      this.objective = 'Leve a ambulância até o hospital';
      if (dist2(v.pos.x, v.pos.z, z.x, z.z) < 16) {
        this.g.pay(Math.round(150 + Math.max(0, this.timer) * 1.5), this.timer > 0 ? 'Paciente salvo a tempo! 🚑' : 'Paciente entregue.'); this.g.stats('pacientes'); this.next();
      }
    }
  }
  end() { super.end(); if (this.npc) this.g.peds.remove(this.npc); }
}

class PoliceJob extends Job {
  start() { this.vehicle = this.g.spawnJobVehicle('police', this.loc().spawn); this.next(); }
  next() {
    const v = this.g.spawnVehicle('sport', 0, 0, 0, { color: 0x212121 });
    const p = this.g.player;
    for (let i = 0; i < 30; i++) { TrafficAI.spawn(v); const d = dist2(v.pos.x, v.pos.z, p.pos.x, p.pos.z); if (d > 90 && d < 250) break; }
    v.ai.cruise = 17; v.y = 0.05; v.suspect = true;
    this.suspect = v; this.prog = 0; this.timer = 150; this.state = 'chase';
    this.g.toast('🚨 Carro fugitivo avistado! Persiga!');
  }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, v = this.vehicle, s = this.suspect;
    if (!s || !this.g.vehicles.includes(s)) { this.next(); return; }
    if (this.state === 'caught') { this.wait -= dt; this.setTarget(null); this.objective = 'Fugitivo preso! Aguarde o próximo chamado...'; if (this.wait <= 0) { this.g.removeVehicle(s); this.next(); } return; }
    this.timer -= dt;
    this.setTarget({ x: s.pos.x, z: s.pos.z });
    const close = p.vehicle === v && dist2(v.pos.x, v.pos.z, s.pos.x, s.pos.z) < 13;
    this.prog = close ? this.prog + dt : Math.max(0, this.prog - dt * 0.5);
    if (s.ai && close) s.ai.cruise = 21;
    this.objective = p.vehicle === v ? `Fique colado no fugitivo! Cerco: ${Math.min(100, Math.round(this.prog / 4 * 100))}%` : 'Entre na viatura (E) e persiga o fugitivo';
    if (this.prog >= 4) {
      s.ai = null; s.driver = null; s.vel.set(0, 0, 0); this.state = 'caught'; this.wait = 5;
      this.g.pay(Math.round(200 + Math.max(0, this.timer)), 'Fugitivo preso! 🚓'); this.g.stats('prisoes');
    } else if (this.timer <= 0) {
      this.g.toast('O fugitivo escapou... 😤'); this.g.removeVehicle(s); this.next();
    }
  }
  end() { super.end(); if (this.suspect && this.g.vehicles.includes(this.suspect)) this.g.removeVehicle(this.suspect); }
}

const FISH = [
  { name: 'Sardinha', color: 0x90a4ae, pay: 20, w: 50 }, { name: 'Tilápia', color: 0x8d6e63, pay: 30, w: 30 },
  { name: 'Peixe-Palhaço', color: 0xff7043, pay: 45, w: 12 }, { name: 'Atum', color: 0x1565c0, pay: 70, w: 6 }, { name: 'Peixe Dourado', color: 0xffd54f, pay: 150, w: 2 },
];
class FisherJob extends Job {
  start() {
    this.state = 'go'; this.fish = null;
    this.bob = new THREE.Mesh(new THREE.SphereGeometry(0.25, 10, 8), new THREE.MeshStandardMaterial({ color: 0xff1744 }));
    this.bob.visible = false; this.g.scene.add(this.bob);
  }
  F() { return this.g.world.locations.fishing; }
  update(dt, t) {
    super.update(dt, t);
    const p = this.g.player, F = this.F(), inp = this.g.input;
    const atSpot = !p.vehicle && dist2(p.pos.x, p.pos.z, F.spot.x, F.spot.z) < 5;
    if (this.state === 'sell') {
      if (!this.fish?.alive) { this.state = 'go'; return; }
      this.setTarget(F.market);
      this.objective = `Leve o ${this.fishDef.name} até a peixaria`;
      if (dist2(this.fish.pos.x, this.fish.pos.z, F.market.x, F.market.z) < 4) {
        this.g.props.remove(this.fish); this.fish = null;
        this.g.pay(this.fishDef.pay, `${this.fishDef.name} vendido! 🐟`); this.g.stats('peixes'); this.state = 'go';
      }
      return;
    }
    this.setTarget(F.spot);
    if (!atSpot) { this.state = 'go'; this.bob.visible = false; this.objective = 'Vá até a ponta do píer para pescar'; return; }
    if (this.state === 'go') { this.state = 'wait'; this.wait = 2 + Math.random() * 4; this.g.sfx.splash(); }
    this.bob.visible = true;
    const bx = F.spot.x, bz = F.spot.z + 6;
    p.ry = 0;
    if (this.state === 'wait') {
      this.wait -= dt; this.bob.position.set(bx, -0.25 + Math.sin(t * 3) * 0.05, bz);
      this.objective = 'Esperando o peixe morder... 🎣';
      if (this.wait <= 0) { this.state = 'bite'; this.window = 1.3; this.g.toast('🐟 Mordeu! Aperte F (ou ✋) agora!'); this.g.sfx.tone(880, 0.15, 'square', 0.2); }
    } else if (this.state === 'bite') {
      this.window -= dt; this.bob.position.set(bx, -0.6 + Math.sin(t * 30) * 0.15, bz);
      this.objective = 'APERTE F AGORA!';
      if (inp.pressed('KeyF') || inp.pressed('Mouse0')) {
        let roll = Math.random() * 100; this.fishDef = FISH[0];
        for (const f of FISH) { if (roll < f.w) { this.fishDef = f; break; } roll -= f.w; }
        this.fish = this.g.props.spawn('fish', p.pos.x, p.pos.y + 1.3, p.pos.z, 'job');
        this.fish.mesh.material.color.set(this.fishDef.color);
        if (this.fishDef.pay >= 150) this.fish.mesh.material.emissive = new THREE.Color(0x6d4c00);
        if (p.held) p.release(false, null);
        p.grab(this.fish); this.bob.visible = false; this.state = 'sell';
        this.g.toast(`Você pescou: ${this.fishDef.name}! 🎉`); this.g.sfx.success();
      } else if (this.window <= 0) { this.g.toast('O peixe escapou! 😅'); this.state = 'wait'; this.wait = 2 + Math.random() * 3; }
    }
  }
  end() { super.end(); this.bob.removeFromParent(); if (this.fish?.alive) this.g.props.remove(this.fish); }
}

const CLASSES = { pilot: PilotJob, helirescue: HeliRescueJob, paramedic: ParamedicJob, police: PoliceJob, fisher: FisherJob, pizza: PizzaJob, taxi: TaxiJob, garbage: GarbageJob, moving: MovingJob, fire: FireJob, mining: MiningJob, spacedelivery: SpaceDeliveryJob, repair: RepairJob, spacemission: SpaceMissionJob };

export class JobManager {
  constructor(g) { this.g = g; this.current = null; }
  start(key) {
    this.quit(true);
    this.current = new CLASSES[key](this.g, key);
    this.current.start();
    this.g.toast(JOBS[key].hidden ? `${JOBS[key].icon} ${JOBS[key].name} começou!` : `Você começou a trabalhar como ${JOBS[key].name}! ${JOBS[key].icon}`);
    this.g.sfx.success();
    if (!JOBS[key].hidden) this.g.onJobStart?.(key);
  }
  quit(silent) {
    if (!this.current) return;
    this.current.end();
    this.current = null;
    if (!silent) this.g.toast('Você saiu do emprego.');
  }
  update(dt, t) { this.current?.update(dt, t); }
}
