// Game modes played against robots: Infiltrados na Cidade, Esconde-esconde and Pega-pega.
// They happen in the middle of the city (no jobs, no pedestrians, no missions); the rocket goes
// straight to the Moon.
import * as THREE from 'three';
import { Npc } from './npc.js';
import { roadLine, bc, isSpace } from './world.js';
import { clamp, angLerp } from './util.js';

export const MODES = {
  cidade: { name: 'Cidade livre', icon: '🏙️', desc: 'O jogo normal: empregos, carros, pessoas e missões.' },
  infiltrados: { name: 'Infiltrados na Cidade', icon: '🕵️', desc: 'Você e 5 robôs. Um é o infiltrado! Tripulantes fazem as tarefas amarelas; o infiltrado nocauteia escondido. Achou alguém nocauteado? Reporte e votem.', cars: true },
  esconde: { name: 'Esconde-esconde', icon: '🙈', desc: 'Um conta e procura, o resto se esconde no centro da cidade. Quem chegar no pique (chafariz) está salvo!', cars: false },
  pega: { name: 'Pega-pega', icon: '🏃', desc: 'Quem está com o "pega" corre atrás dos outros. Encostou, passou! No fim, perde quem ficou mais tempo pegador.', cars: false },
};

const BOT_COLORS = [['Vermelho', 0xe53935], ['Azul', 0x1e88e5], ['Verde', 0x43a047], ['Amarelo', 0xfdd835], ['Roxo', 0x8e24aa], ['Laranja', 0xfb8c00], ['Rosa', 0xf06292], ['Ciano', 0x00acc1]];
const K0 = 3, K1 = 7;                                  // roads that limit the play area
const EDGE = roadLine(K1);                             // 148 m from the centre
const BASE_R = 8.5;                                    // the fountain (pique) is about 11 m wide
const d2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const roadIdx = (v) => clamp(Math.round(v / 74 + 5), K0, K1);
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export class ModeManager {
  constructor(ctx) {
    this.ctx = ctx; this.active = null; this.players = []; this.target = null; this.markers = [];
  }
  get W() { return this.ctx.world; }
  get human() { return this.players.find((p) => p.human); }

  // ---------- life cycle ----------
  start(key) {
    this.cleanup();
    this.active = key; this.t = 0; this.over = false; this.meeting = false; this.frozen = false;
    const C = this.ctx, W = this.W, f = W.fountain;
    this.hideSpots = this.makeSpots();
    const used = new Set([C.save.look.shirt]);
    const colors = BOT_COLORS.filter(([, c]) => !used.has(c)).slice(0, 5);
    this.players = [{ id: 'eu', name: C.save.name || 'Você', human: true, actor: C.player, alive: true }];
    colors.forEach(([nome, cor], i) => {
      const n = new Npc(C.scene, { shirt: cor, pants: 0x37474f, skin: 0xb0bec5, hat: 'none' });
      n.char.setName('🤖 ' + nome, '#' + cor.toString(16).padStart(6, '0'));
      const a = n.actor, ang = (i / colors.length) * Math.PI * 2;
      a.pos.set(f.x + Math.cos(ang) * 8, 0.3, f.z + Math.sin(ang) * 8);
      this.players.push({ id: 'b' + i, name: '🤖 ' + nome, human: false, npc: n, actor: a, char: n.char, alive: true, path: null, mem: {} });
    });
    C.player.pos.set(f.x, 0.4, f.z + 9); C.player.vel.set(0, 0, 0); C.player.ry = Math.PI;
    if (key === 'pega') this.startPega();
    if (key === 'esconde') this.startEsconde();
    if (key === 'infiltrados') this.startInfiltrados();
  }
  cleanup() {
    for (const p of this.players) if (!p.human) this.ctx.scene.remove(p.char.root);
    for (const m of this.markers) m.removeFromParent();
    this.players = []; this.markers = []; this.target = null;
    const h = this.ctx.player; h.noGetUp = false; this.setGhost(false);
    this.banner(null);
  }
  restart() { this.ctx.closePanel(); this.start(this.active); }

  // ---------- shared helpers ----------
  makeSpots() {
    const W = this.W, out = [];
    for (let i = K0; i < K1; i++) for (let j = K0; j < K1; j++) {
      const x = bc(i), z = bc(j);
      for (const [ox, oz] of [[0, 0], [0, 15], [0, -15], [15, 0], [-15, 0], [24, 24], [-24, 24], [24, -24], [-24, -24], [8, 20], [-20, -8]]) {
        const p = { x: x + ox + rand(-1.5, 1.5), z: z + oz + rand(-1.5, 1.5) };
        if (W.pointBlocked(p.x, 1, p.z) || W.groundAt(p.x, p.z, 3) > 1) continue;
        const exits = [{ x: p.x, z: z + 28 }, { x: p.x, z: z - 28 }, { x: x + 28, z: p.z }, { x: x - 28, z: p.z }];
        if (exits.some((e) => W.segmentFree({ x: p.x, y: 1, z: p.z }, { x: e.x, y: 1, z: e.z }) >= 0.999)) out.push(p);
      }
    }
    return out;
  }
  sees(a, b, max = 16) {
    if (isSpace(a.pos.x) !== isSpace(b.pos.x) || d2(a.pos, b.pos) > max) return false;
    return this.W.segmentFree({ x: a.pos.x, y: a.pos.y + 1.5, z: a.pos.z }, { x: b.pos.x, y: b.pos.y + 1.5, z: b.pos.z }) >= 0.999;
  }
  banner(text, ms) {
    const el = document.getElementById('mode-banner');
    if (!el) return;
    clearTimeout(this._bt);
    if (!text) { el.classList.add('hidden'); return; }
    el.innerHTML = text; el.classList.remove('hidden');
    if (ms) this._bt = setTimeout(() => el.classList.add('hidden'), ms);
  }
  hud(title, obj, timer) {
    const $ = (s) => document.querySelector(s);
    $('#jobpanel').classList.remove('hidden'); $('#job-career').classList.add('hidden');
    $('#job-title').textContent = title; $('#job-obj').textContent = obj;
    const tm = $('#job-timer');
    if (timer == null) tm.textContent = '';
    else { const s = Math.max(0, Math.ceil(timer)); tm.textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; tm.classList.toggle('late', s <= 10); }
  }
  // Path along the roads (they never have buildings), then straight to the target
  pathTo(s, t) {
    if (isSpace(t.x) || isSpace(s.x)) return [{ x: t.x, z: t.z }];
    const kS = roadIdx(s.x), mS = roadIdx(s.z), kT = roadIdx(t.x), mT = roadIdx(t.z);
    const rx = (k) => roadLine(k), pts = [];
    const dx = Math.abs(s.x - rx(kS)), dz = Math.abs(s.z - rx(mS));
    if (dx > 4 && dz > 4) pts.push(dx < dz ? { x: rx(kS), z: s.z } : { x: s.x, z: rx(mS) });
    pts.push({ x: rx(kS), z: rx(mS) }, { x: rx(kT), z: rx(mS) }, { x: rx(kT), z: rx(mT) });
    pts.push(Math.abs(t.x - rx(kT)) < Math.abs(t.z - rx(mT)) ? { x: rx(kT), z: t.z } : { x: t.x, z: rx(mT) });
    pts.push({ x: t.x, z: t.z });
    const out = [];
    for (const p of pts) if (!out.length || d2(out[out.length - 1], p) > 1) out.push(p);
    // skip road detours when the straight line is clear
    if (this.W.segmentFree({ x: s.x, y: 1, z: s.z }, { x: t.x, y: 1, z: t.z }) >= 0.999) return [{ x: t.x, z: t.z }];
    return out;
  }
  // Move a robot towards a point. Returns the distance left.
  stepBot(p, dt, target, speed) {
    const a = p.actor, W = this.W;
    if (a.ragdoll) { a.updateRagdoll(dt, W); a.syncMesh(); p.char.animate(dt, { mode: 'ragdoll' }); return 99; }
    let moveSpeed = 0;
    let left = 0;
    if (target && speed > 0) {
      if (!p.path || !p.goal || d2(p.goal, target) > 6) { p.path = this.pathTo(a.pos, target); p.goal = { x: target.x, z: target.z }; }
      while (p.path.length > 1 && d2(a.pos, p.path[0]) < 2.2) p.path.shift();
      const wp = p.path[0];
      const dx = wp.x - a.pos.x, dz = wp.z - a.pos.z, d = Math.hypot(dx, dz);
      left = d2(a.pos, target);
      if (d > 0.4) {
        a.vel.x += (dx / d * speed - a.vel.x) * Math.min(1, dt * 8);
        a.vel.z += (dz / d * speed - a.vel.z) * Math.min(1, dt * 8);
        a.ry = angLerp(a.ry, Math.atan2(dx, dz), Math.min(1, dt * 8));
        moveSpeed = speed;
      }
      // unstick
      p.stuckT = (p.stuckT || 0) + dt;
      if (p.stuckT > 1.5) {
        if (p.lastPos && d2(p.lastPos, a.pos) < 0.5) { p.path = null; a.vel.x += rand(-4, 4); a.vel.z += rand(-4, 4); if (a.grounded) a.vel.y = 7; }
        p.lastPos = { x: a.pos.x, z: a.pos.z }; p.stuckT = 0;
      }
    }
    if (!moveSpeed) { a.vel.x *= 0.8; a.vel.z *= 0.8; }
    a.vel.y -= 25 * W.gravity(a.pos.x) * dt;
    a.pos.addScaledVector(a.vel, dt);
    const g = W.groundAt(a.pos.x, a.pos.z, a.pos.y);
    if (a.pos.y <= g) { a.pos.y = g; a.vel.y = 0; a.grounded = true; } else a.grounded = false;
    W.pushCircle(a.pos, 0.42, 1.8);
    a.syncMesh();
    p.char.animate(dt, { speed: Math.hypot(a.vel.x, a.vel.z), grounded: a.grounded, mode: 'walk' });
    return left;
  }
  // a robot follows the human to the Moon (or back) after a while
  followPlanet(p, target, dt) {
    if (isSpace(p.actor.pos.x) === isSpace(target.x)) { p.planetT = 0; return false; }
    p.planetT = (p.planetT || 0) + dt;
    if (p.planetT > 12) {
      const W = this.W, dest = isSpace(target.x) ? W.locations.moonPad : (this.ctx.returnPoint || W.locations.rocket.zone);
      p.actor.pos.set(dest.x + rand(-3, 3), 1, dest.z + 4); p.actor.vel.set(0, 0, 0); p.path = null; p.planetT = 0;
      this.ctx.toast(`🚀 ${p.name} pegou o foguete e foi ${isSpace(target.x) ? 'para a Lua' : 'para a Terra'}!`);
    }
    return true;
  }
  wanderPoint() { return pick(this.hideSpots) || { x: rand(-EDGE, EDGE), z: rand(-EDGE, EDGE) }; }
  keepHumanInside(dt) {
    const h = this.ctx.player;
    if (isSpace(h.pos.x) || h.vehicle) return;
    if (Math.abs(h.pos.x) > EDGE + 6 || Math.abs(h.pos.z) > EDGE + 6) {
      h.pos.x = clamp(h.pos.x, -EDGE - 6, EDGE + 6); h.pos.z = clamp(h.pos.z, -EDGE - 6, EDGE + 6);
      if (!this._warnT || this.t - this._warnT > 4) { this._warnT = this.t; this.ctx.toast('🚧 Fique no centro da cidade: é a área do jogo!'); }
    }
  }
  finish(title, lines) {
    if (this.over) return;
    this.over = true; this.target = null; this.banner(null);
    const C = this.ctx, e = C.esc;
    C.sfx.fanfare();
    C.openPanel(`<h2>${title}</h2>${lines.map((l) => `<p>${l}</p>`).join('')}
      <div class="row"><button class="btn primary" id="mode-again">🔁 Jogar de novo</button><button class="btn" id="mode-menu">🎮 Trocar de modo</button></div>`, (el) => {
      el.querySelector('#mode-again').onclick = () => this.restart();
      el.querySelector('#mode-menu').onclick = () => location.reload();
    });
    void e;
  }

  // ---------- main update ----------
  update(dt) {
    if (!this.active || this.over) return;
    if (this.meeting) { if (!this.ctx.panelOpen()) this.endMeeting(null); return; }
    if (this.ctx.panelOpen()) return;
    this.t += dt;
    this.keepHumanInside(dt);
    if (this.active === 'pega') this.updatePega(dt);
    else if (this.active === 'esconde') this.updateEsconde(dt);
    else if (this.active === 'infiltrados') this.updateInfiltrados(dt);
  }
  // Extra actions for the human (keys E/F). Returns a prompt when an action is available.
  interact() {
    if (!this.active || this.over || this.meeting) return null;
    if (this.active === 'infiltrados') return this.interactInfiltrados();
    return null;
  }
  actors() { return this.players.filter((p) => !p.human).map((p) => p.actor); }

  // ================= PEGA-PEGA =================
  startPega() {
    this.time = 120; this.itTime = {};
    for (const p of this.players) this.itTime[p.id] = 0;
    this.setIt(pick(this.players), null);
    this.banner(`<b>🏃 Pega-pega!</b><br>${this.it.human ? 'Você começa com o pega! Encoste em alguém.' : `${this.it.name} está com o pega. Corra!`}`, 3500);
  }
  setIt(p, from) {
    if (this.itMark) this.itMark.removeFromParent();
    this.it = p; this.noBack = from ? { id: from.id, t: 3 } : null;
    const m = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 4), new THREE.MeshBasicMaterial({ color: 0xff1744 }));
    m.rotation.x = Math.PI; m.position.y = 3.1;
    (p.human ? this.ctx.player.char.root : p.char.root).add(m); this.itMark = m; this.markers.push(m);
    if (from) { this.ctx.sfx.bonk(); this.ctx.toast(p.human ? '😱 Você está com o pega!' : `${p.name} está com o pega!`); }
  }
  updatePega(dt) {
    this.time -= dt;
    this.itTime[this.it.id] += dt;
    if (this.noBack) { this.noBack.t -= dt; if (this.noBack.t <= 0) this.noBack = null; }
    const h = this.human, it = this.it;
    for (const p of this.players) {
      if (p.human) continue;
      let target = null, speed = 0;
      if (p === it) {
        const prey = this.players.filter((q) => q !== p && !(this.noBack && this.noBack.id === q.id))
          .sort((a, b) => d2(a.actor.pos, p.actor.pos) - d2(b.actor.pos, p.actor.pos))[0];
        if (prey) { target = prey.actor.pos; speed = 7.2; if (prey.human) this.followPlanet(p, prey.actor.pos, dt); }
      } else {
        const dIt = d2(p.actor.pos, it.actor.pos);
        if (dIt < 22 && isSpace(p.actor.pos.x) === isSpace(it.actor.pos.x)) {
          if (!p.fleeTo || d2(p.fleeTo, it.actor.pos) < 30 || d2(p.actor.pos, p.fleeTo) < 3) {
            p.fleeTo = this.hideSpots.filter((s) => d2(s, it.actor.pos) > 45).sort(() => Math.random() - 0.5)[0] || this.wanderPoint();
          }
          target = p.fleeTo; speed = 6.6;
        } else {
          if (!p.wander || d2(p.actor.pos, p.wander) < 3) p.wander = this.wanderPoint();
          target = p.wander; speed = 3;
        }
      }
      this.stepBot(p, dt, target, speed);
    }
    // tagging (it touches anyone)
    for (const p of this.players) {
      if (p === it || (this.noBack && this.noBack.id === p.id)) continue;
      if (d2(p.actor.pos, it.actor.pos) < 1.5 && Math.abs(p.actor.pos.y - it.actor.pos.y) < 2) { this.setIt(p, it); break; }
    }
    this.target = it.human ? null : { x: it.actor.pos.x, z: it.actor.pos.z };
    const mine = Math.round(this.itTime[h.id]);
    this.hud('🏃 Pega-pega', it.human ? 'Você está com o pega! Encoste em alguém para passar.' : `${it.name} está com o pega (seta vermelha). Fuja! Você foi pegador por ${mine}s.`, this.time);
    if (this.time <= 0) {
      const rank = [...this.players].sort((a, b) => this.itTime[a.id] - this.itTime[b.id]);
      const loser = rank[rank.length - 1];
      this.finish(loser.human ? '😅 Você foi o pegador que mais demorou!' : (rank[0].human ? '🏆 Você foi o melhor fujão!' : '🏁 Fim do pega-pega!'),
        rank.map((p, i) => `${i + 1}º ${this.ctx.esc(p.name)} — pegador por ${Math.round(this.itTime[p.id])}s${p === loser ? ' 🐢' : ''}`));
    }
  }

  // ================= ESCONDE-ESCONDE =================
  startEsconde() {
    const W = this.W;
    this.base = { x: W.fountain.x, z: W.fountain.z };
    this.seeker = pick(this.players); this.phase = 'contando'; this.count = 15; this.time = 150;
    this.found = new Set(); this.saved = new Set();
    const spots = [...this.hideSpots].sort((a, b) => d2(b, this.base) - d2(a, this.base)).slice(0, 40).sort(() => Math.random() - 0.5);
    for (const p of this.players) { if (!p.human && p !== this.seeker) p.hide = spots.pop(); }
    this.seeker.actor.pos.set(this.base.x, 0.4, this.base.z + 3);
    if (this.seeker.human) { this.frozen = true; this.banner('<b>🙈 Você conta!</b><br>Feche os olhos… os robôs estão se escondendo.'); }
    else this.banner(`<b>🙈 ${this.ctx.esc(this.seeker.name)} vai contar até 15!</b><br>Corra e se esconda. Volte ao pique (chafariz) para se salvar.`, 4500);
    // base marker
    const ring = new THREE.Mesh(new THREE.RingGeometry(7.6, 8.4, 48), new THREE.MeshBasicMaterial({ color: 0x00e676, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(this.base.x, 0.25, this.base.z); this.ctx.scene.add(ring); this.markers.push(ring);
  }
  updateEsconde(dt) {
    const h = this.human, sk = this.seeker;
    const hiders = this.players.filter((p) => p !== sk);
    const done = (p) => this.found.has(p.id) || this.saved.has(p.id);
    if (this.phase === 'contando') {
      this.count -= dt;
      if (sk.human) { this.banner(`<b>🙈 Contando… ${Math.ceil(this.count)}</b><br>Os robôs estão se escondendo!`); this.ctx.darken?.(0.85); }
      for (const p of hiders) if (!p.human) this.stepBot(p, dt, p.hide, 6.5);
      if (!sk.human) this.stepBot(sk, dt, null, 0);
      this.hud('🙈 Esconde-esconde', sk.human ? 'Contando…' : 'Esconda-se antes que ele termine de contar!', this.count);
      if (this.count <= 0) {
        this.phase = 'procurando'; this.frozen = false; this.ctx.darken?.(0);
        this.banner(sk.human ? '<b>Lá vou eu!</b> Encoste nos robôs para achar.' : `<b>${this.ctx.esc(sk.name)}: "Lá vou eu!"</b>`, 2500);
        this.ctx.sfx.horn();
      }
      return;
    }
    this.time -= dt;
    // hiders
    for (const p of hiders) {
      if (p.human || done(p)) { if (!p.human) this.stepBot(p, dt, done(p) && this.saved.has(p.id) ? this.base : null, 2); continue; }
      const close = isSpace(p.actor.pos.x) === isSpace(sk.actor.pos.x) && d2(p.actor.pos, sk.actor.pos) < 9;
      if (close && p.run === undefined) p.run = Math.random() < 0.55;
      if (!close && p.run === false) p.run = undefined;
      this.stepBot(p, dt, p.run ? this.base : p.hide, p.run ? 6.4 : 3);
    }
    // seeker robot
    if (!sk.human) {
      let target = null, speed = 4.2;
      const visible = hiders.filter((p) => !done(p) && (p.human ? !h.vehicle : true) && this.sees(sk.actor, p.actor, p.human ? 15 : 12));
      if (visible.length) { target = visible[0].actor.pos; speed = 7; }
      else {
        if (h && !done(h) && isSpace(h.actor.pos.x) && this.followPlanet(sk, h.actor.pos, dt)) { target = null; speed = 0; }
        if (!sk.goal2 || d2(sk.actor.pos, sk.goal2) < 3) {
          sk.visited = sk.visited || new Set();
          const next = this.hideSpots.filter((s) => !sk.visited.has(s)).sort((a, b) => d2(a, sk.actor.pos) - d2(b, sk.actor.pos))[Math.floor(Math.random() * 3)];
          sk.goal2 = next || this.wanderPoint(); if (next) sk.visited.add(next);
        }
        if (speed) target = sk.goal2;
      }
      this.stepBot(sk, dt, target, speed);
    }
    // catching and saving
    for (const p of hiders) {
      if (done(p)) continue;
      if (isSpace(p.actor.pos.x) || d2(p.actor.pos, this.base) > 25) p.leftBase = true;
      if (p.leftBase && d2(p.actor.pos, this.base) < BASE_R && !isSpace(p.actor.pos.x)) { this.saved.add(p.id); this.ctx.toast(p.human ? '🟢 Pique! Você está salvo!' : `🟢 ${p.name} chegou no pique!`); continue; }
      if (d2(p.actor.pos, sk.actor.pos) < 1.8 && Math.abs(p.actor.pos.y - sk.actor.pos.y) < 2) {
        this.found.add(p.id); this.ctx.sfx.bonk();
        this.ctx.toast(sk.human ? `🙌 Achei ${p.name}!` : (p.human ? '😱 Você foi achado!' : `${sk.name} achou ${p.name}!`));
      }
    }
    const left = hiders.filter((p) => !done(p)).length;
    this.target = null;
    this.hud('🙈 Esconde-esconde', sk.human ? `Procure! Faltam ${left} robôs (achados ${this.found.size}, salvos ${this.saved.size}).`
      : (done(h) ? (this.saved.has(h.id) ? 'Você está salvo! Assista ao resto.' : 'Você foi achado. Assista ao resto.') : `Fique escondido ou corra para o pique (chafariz). ${sk.name} está procurando…`), this.time);
    if (left === 0 || this.time <= 0) {
      const lines = hiders.map((p) => `${this.ctx.esc(p.name)}: ${this.found.has(p.id) ? '🔎 achado' : this.saved.has(p.id) ? '🟢 salvo no pique' : '🫥 ninguém achou!'}`);
      const title = sk.human ? `🔎 Você achou ${this.found.size} de ${hiders.length}!` : (this.found.has(h.id) ? '😅 Você foi achado!' : '🏆 Ninguém te achou!');
      this.finish(title, lines);
    }
  }

  // ================= INFILTRADOS NA CIDADE =================
  startInfiltrados() {
    const C = this.ctx;
    this.cooldown = 20; this.alarmUsed = false; this.bodies = [];
    this.imp = pick(this.players);
    for (const p of this.players) { p.role = p === this.imp ? 'infiltrado' : 'tripulante'; p.voteSusp = 0; }
    // tasks: yellow markers spread over the area
    const spots = [...this.hideSpots].sort(() => Math.random() - 0.5).slice(0, 8);
    this.tasks = spots.map((s) => {
      const g = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.2, 10), new THREE.MeshStandardMaterial({ color: 0xffd600, emissive: 0xffab00, emissiveIntensity: 0.7 }));
      pole.position.y = 1.1; g.add(pole);
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.1, 30), new THREE.MeshBasicMaterial({ color: 0xffd600, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.2; g.add(ring);
      g.position.set(s.x, C.world.groundAt(s.x, s.z, 3), s.z); C.scene.add(g); this.markers.push(g);
      return { x: s.x, z: s.z, done: false, prog: 0, mesh: g, pole };
    });
    this.banner(this.imp.human ? '<b>😈 Você é o INFILTRADO!</b><br>Nocauteie tripulantes (F) quando ninguém estiver vendo. Não deixe te descobrirem!'
      : '<b>🧑‍🚀 Você é TRIPULANTE</b><br>Faça as tarefas amarelas. Achou alguém nocauteado? Reporte (E).', 5000);
  }
  aliveCrew() { return this.players.filter((p) => p.alive && p.role === 'tripulante'); }
  knockOut(victim, by) {
    victim.alive = false;
    const a = victim.actor;
    a.noGetUp = true; a.knock(rand(-2, 2), 4, rand(-2, 2), 6);
    this.bodies.push({ p: victim, x: a.pos.x, z: a.pos.z, reported: false });
    // robots that saw it remember who did it
    for (const w of this.players) if (!w.human && w.alive && w !== by && this.sees(w.actor, by.actor, 16)) w.mem.witness = by.id;
    if (victim.human) { this.ctx.toast('💫 Você foi nocauteado! Agora você é um fantasma: ainda pode fazer tarefas.'); setTimeout(() => { a.noGetUp = false; this.setGhost(true); }, 2500); }
    this.cooldown = 22;
    this.ctx.sfx.bonk();
  }
  setGhost(on) {
    const root = this.ctx.player.char.root;
    root.traverse((o) => {
      if (!o.isMesh) return;
      if (on) { if (!o.userData.matOrig) { o.userData.matOrig = o.material; o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.35; } }
      else if (o.userData.matOrig) { o.material = o.userData.matOrig; delete o.userData.matOrig; }
    });
  }
  interactInfiltrados() {
    const C = this.ctx, h = this.human, inp = C.input;
    if (C.player.vehicle) return null;
    if (h.alive && h.role === 'infiltrado') {
      const victim = this.players.find((p) => !p.human && p.alive && d2(p.actor.pos, h.actor.pos) < 2.4);
      if (victim) {
        if (this.cooldown > 0) return `Nocautear em ${Math.ceil(this.cooldown)}s`;
        if (inp.pressed('KeyF')) this.knockOut(victim, h);
        return `F: nocautear ${victim.name}`;
      }
    }
    if (h.alive) {
      const body = this.bodies.find((b) => !b.reported && d2(b, h.actor.pos) < 3.5);
      if (body) { if (inp.pressed('KeyE')) this.startMeeting(h, body); return `E: reportar ${body.p.name}`; }
      if (!this.alarmUsed && d2(h.actor.pos, this.W.fountain) < BASE_R + 0.5) { if (inp.pressed('KeyE')) { this.alarmUsed = true; this.startMeeting(h, null); } return 'E: tocar o alarme (reunião de emergência)'; }
    }
    return null;
  }
  updateInfiltrados(dt) {
    const h = this.human, imp = this.imp;
    this.cooldown = Math.max(0, this.cooldown - dt);
    const openTasks = this.tasks.filter((t) => !t.done);
    for (const p of this.players) {
      if (p.human) continue;
      if (!p.alive) { this.stepBot(p, dt, null, 0); continue; }
      let target = null, speed = 3.6;
      if (p.role === 'infiltrado') {
        // look for someone alone
        const prey = this.players.filter((q) => q.alive && q !== p && q.role === 'tripulante' && !isSpace(q.actor.pos.x) === !isSpace(p.actor.pos.x))
          .sort((a, b) => d2(a.actor.pos, p.actor.pos) - d2(b.actor.pos, p.actor.pos))[0];
        if (prey && this.cooldown <= 0) {
          const others = this.players.filter((q) => q.alive && q !== p && q !== prey && d2(q.actor.pos, prey.actor.pos) < 18 && this.sees(q.actor, prey.actor, 18));
          if (!others.length) { target = prey.actor.pos; speed = 4.6; if (d2(prey.actor.pos, p.actor.pos) < 1.8) this.knockOut(prey, p); }
        }
        if (!target) { if (!p.fake || d2(p.actor.pos, p.fake) < 2.5) p.fake = pick(this.tasks); target = p.fake; }
      } else {
        // report a body it can see
        const body = this.bodies.find((b) => !b.reported && d2(b, p.actor.pos) < 14 && this.W.segmentFree({ x: p.actor.pos.x, y: 1.5, z: p.actor.pos.z }, { x: b.x, y: 1.2, z: b.z }) >= 0.999);
        if (body) { this.startMeeting(p, body); return; }
        if (p.mem.witness && !this.alarmUsed && Math.random() < dt * 0.5) { this.alarmUsed = true; this.startMeeting(p, null); return; }
        if (!p.task || p.task.done) p.task = openTasks.filter((t) => !this.players.some((q) => q !== p && q.task === t)).sort((a, b) => d2(a, p.actor.pos) - d2(b, p.actor.pos))[0] || pick(openTasks);
        if (p.task) {
          target = p.task;
          if (d2(p.actor.pos, p.task) < 2.2) { target = null; p.task.prog += dt; if (p.task.prog >= 4) this.finishTask(p.task); }
        }
      }
      this.stepBot(p, dt, target, speed);
    }
    // the human does tasks by standing on them (ghosts too)
    if (h.role === 'tripulante' && !this.ctx.player.vehicle) {
      const t = openTasks.find((tk) => d2(tk, h.actor.pos) < 2.2);
      if (t) { t.prog += dt; this.taskNear = t; if (t.prog >= 3) this.finishTask(t); } else this.taskNear = null;
    }
    for (const t of this.tasks) if (!t.done) t.pole.rotation.y += dt * 2;
    // goal for the compass
    const myTask = h.role === 'tripulante' ? openTasks.sort((a, b) => d2(a, h.actor.pos) - d2(b, h.actor.pos))[0] : null;
    this.target = myTask ? { x: myTask.x, z: myTask.z } : null;
    const done = this.tasks.filter((t) => t.done).length;
    const roleTxt = h.role === 'infiltrado' ? `😈 Você é o INFILTRADO · nocautear: ${this.cooldown > 0 ? Math.ceil(this.cooldown) + 's' : 'pronto (F)'}` : (h.alive ? '🧑‍🚀 Tripulante' : '👻 Fantasma (faça tarefas)');
    const near = this.taskNear ? ` · Fazendo tarefa… ${Math.min(100, Math.round(this.taskNear.prog / 3 * 100))}%` : '';
    this.hud('🕵️ Infiltrados na Cidade', `${roleTxt} · Tarefas ${done}/${this.tasks.length} · Vivos ${this.players.filter((p) => p.alive).length}${near}`, null);
    this.checkWin();
  }
  finishTask(t) {
    if (t.done) return;
    t.done = true; t.mesh.visible = false; this.ctx.sfx.coin();
  }
  checkWin() {
    if (this.over) return;
    const crew = this.aliveCrew().length, impAlive = this.imp.alive;
    const done = this.tasks.every((t) => t.done);
    const reveal = `O infiltrado era <b>${this.ctx.esc(this.imp.name)}</b>.`;
    const humanImp = this.imp.human;
    if (!impAlive) this.finish(humanImp ? '😵 Descobriram você!' : '🎉 A tripulação venceu!', ['O infiltrado foi mandado para a Lua!', reveal]);
    else if (done) this.finish(humanImp ? '😵 A tripulação terminou as tarefas!' : '🎉 A tripulação venceu!', ['Todas as tarefas foram feitas.', reveal]);
    else if (crew <= 1) this.finish(humanImp ? '😈 Você venceu como infiltrado!' : '😈 O infiltrado venceu!', ['Sobraram poucos tripulantes.', reveal]);
  }
  startMeeting(reporter, body) {
    if (this.meeting || this.over) return;
    this.meeting = true; this.target = null;
    const C = this.ctx, W = this.W, f = W.fountain;
    if (C.player.vehicle) C.exitVehicle();
    for (const b of this.bodies) { b.reported = true; if (!b.p.human) b.p.char.root.visible = false; }
    const alive = this.players.filter((p) => p.alive);
    alive.forEach((p, i) => { const a = (i / alive.length) * Math.PI * 2; p.actor.pos.set(f.x + Math.cos(a) * 7.5, 0.5, f.z + Math.sin(a) * 7.5); p.actor.vel.set(0, 0, 0); p.actor.ry = Math.atan2(-Math.cos(a), -Math.sin(a)); p.path = null; if (!p.human) p.actor.syncMesh(); });
    // robots decide their vote now
    this.botVotes = {};
    for (const p of alive) {
      if (p.human) continue;
      let v = null;
      if (p.role === 'infiltrado') v = pick(alive.filter((q) => q !== p)).id;
      else if (p.mem.witness && alive.some((q) => q.id === p.mem.witness)) v = p.mem.witness;
      else if (body && Math.random() < 0.55) {
        const near = alive.filter((q) => q !== p).sort((a, b) => d2(a.actor.pos, body) - d2(b.actor.pos, body));
        v = (p.mem.lastNear && alive.some((q) => q.id === p.mem.lastNear)) ? p.mem.lastNear : (near[0] && near[0].id);
      }
      this.botVotes[p.id] = v; // null = skip
    }
    const e = C.esc;
    const what = body ? `${e(reporter.name)} achou <b>${e(body.p.name)}</b> nocauteado!` : `${e(reporter.name)} tocou o alarme!`;
    const humanCanVote = this.human.alive;
    C.sfx.horn();
    C.openPanel(`<h2>🗳️ Reunião: quem é o infiltrado?</h2><p>${what}</p>
      ${humanCanVote ? '<p class="small muted">Toque em quem você acha que é o infiltrado. Os robôs também votam.</p>' : '<p class="small muted">Você é um fantasma e não vota. Veja o resultado.</p>'}
      <div class="grid">${alive.map((p) => `<button class="btn ${humanCanVote ? 'blue' : ''}" data-vote="${p.id}" ${humanCanVote && !p.human ? '' : 'disabled'}>${e(p.name)}${p.human ? ' (você)' : ''}</button>`).join('')}</div>
      <div class="row"><button class="btn" id="vote-skip">${humanCanVote ? 'Pular voto' : 'Ver resultado'}</button></div>`, (el) => {
      el.querySelectorAll('[data-vote]').forEach((b) => b.onclick = () => this.endMeeting(b.dataset.vote));
      el.querySelector('#vote-skip').onclick = () => this.endMeeting(null);
    });
  }
  endMeeting(humanVote) {
    if (!this.meeting) return;
    const C = this.ctx, e = C.esc;
    const tally = {}; let skips = 0;
    const add = (v) => { if (v) tally[v] = (tally[v] || 0) + 1; else skips++; };
    if (this.human.alive) add(humanVote);
    for (const v of Object.values(this.botVotes)) add(v);
    const best = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    let msg;
    if (best.length && best[0][1] > skips && (!best[1] || best[1][1] < best[0][1])) {
      const out = this.players.find((p) => p.id === best[0][0]);
      out.alive = false; out.ejected = true;
      const m = C.world.locations.moonPad;
      out.actor.pos.set(m.x + rand(-4, 4), 1, m.z + rand(2, 6));
      if (out.human) this.setGhost(true);
      msg = `🚀 ${e(out.name)} foi mandado para a Lua! ${out.role === 'infiltrado' ? 'Era o infiltrado!' : 'Não era o infiltrado…'}`;
    } else msg = 'Ninguém foi mandado para a Lua (empate ou pularam).';
    for (const p of this.players) if (p.mem) p.mem.witness = p.mem.witness && this.players.find((q) => q.id === p.mem.witness)?.alive ? p.mem.witness : null;
    this.meeting = false;
    C.closePanel();
    C.toast(msg); this.banner(`<b>${msg}</b>`, 4000);
    this.cooldown = Math.max(this.cooldown, 15);
    this.checkWin();
  }
}
