// Game modes: Infiltrados na Cidade, Esconde-esconde and Pega-pega.
// They happen in the middle of the city (no jobs, no pedestrians, no missions); the rocket goes
// straight to the Moon. Robots fill the empty places.
//
// Online: the device that CREATED the room runs the game (robots, rules, timers) and sends the
// state to everyone as numbers only ('m'); the others send their own actions ('ma': knock out,
// report, alarm, vote, task done). Positions of the people still travel in the normal 's' messages.
import * as THREE from 'three';
import { Npc } from './npc.js';
import { roadLine, bc, isSpace } from './world.js';
import { clamp, angLerp } from './util.js';

export const MODES = {
  cidade: { name: 'Cidade livre', icon: '🏙️', desc: 'O jogo normal: empregos, carros, pessoas e missões.' },
  infiltrados: { name: 'Infiltrados na Cidade', icon: '🕵️', desc: 'Um é o infiltrado! Tripulantes fazem as tarefas amarelas; o infiltrado nocauteia escondido. Achou alguém nocauteado? Reporte e votem.', cars: true },
  esconde: { name: 'Esconde-esconde', icon: '🙈', desc: 'Um conta e procura, o resto se esconde no centro da cidade. Quem chegar no pique (chafariz) está salvo!', cars: false },
  pega: { name: 'Pega-pega', icon: '🏃', desc: 'Quem está com o "pega" corre atrás dos outros. Encostou, passou! No fim, perde quem ficou mais tempo pegador.', cars: false },
};
const MODE_KEYS = ['cidade', 'infiltrados', 'esconde', 'pega'];

const BOT_COLORS = [['Vermelho', 0xe53935], ['Azul', 0x1e88e5], ['Verde', 0x43a047], ['Amarelo', 0xfdd835], ['Roxo', 0x8e24aa], ['Laranja', 0xfb8c00], ['Rosa', 0xf06292], ['Ciano', 0x00acc1]];
const K0 = 3, K1 = 7;                                  // roads that limit the play area
const EDGE = roadLine(K1);                             // 148 m from the centre
const BASE_R = 8.5;                                    // the fountain (pique) is about 11 m wide
const TEAM = 6;                                        // robots fill up to this many players
const d2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const roadIdx = (v) => clamp(Math.round(v / 74 + 5), K0, K1);
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const r1 = (v) => Math.round(v * 10);
// player flags in the state message
const F = { alive: 1, it: 2, found: 4, saved: 8, body: 16, ejected: 32, reported: 64, imp: 128, seeker: 256 };
// actions sent by people who did not create the room
const A = { knock: 1, report: 2, alarm: 3, vote: 4, task: 5 };
const PH = { play: 1, count: 1, search: 2, meeting: 3 };

export class ModeManager {
  constructor(ctx) {
    this.ctx = ctx; this.active = null; this.players = []; this.target = null; this.markers = [];
    this.round = 0; this.follower = null;
  }
  get W() { return this.ctx.world; }
  get human() { return this.players.find((p) => p.local); }
  get online() { return !!(this.ctx.net && this.ctx.net.connected); }
  get myId() { return this.online ? this.ctx.net.id : 'eu'; }
  isHost() { return !this.online || !!this.ctx.isHost(); }

  // ---------- life cycle (solo and host) ----------
  start(key) {
    this.cleanup();
    this.active = key; this.t = 0; this.over = false; this.meeting = false; this.frozen = false; this.sim = true;
    this.round++; this.seqMeeting = 0; this.seqResult = 0; this.lastEject = -1; this.lastEjectImp = 0; this.overCode = 0;
    const C = this.ctx, f = this.W.fountain;
    this.hideSpots = this.makeSpots();
    // people: me first, then the friends in the room
    this.players = [{ id: this.myId, name: C.myName(), local: true, person: true, actor: C.player, alive: true, color: -1, mem: {} }];
    if (this.online) for (const r of C.remotes()) {
      this.players.push({ id: r.id, name: r.name, local: false, person: true, remote: r, actor: { pos: r.pos, vel: r.vel, get ry() { return r.ry; } }, alive: true, color: -1, mem: {} });
    }
    const used = new Set([C.save.look.shirt]);
    const colors = BOT_COLORS.map((c, i) => [...c, i]).filter(([, c]) => !used.has(c)).slice(0, Math.max(0, TEAM - this.players.length));
    colors.forEach(([nome, cor, ci], i) => {
      const n = new Npc(C.scene, { shirt: cor, pants: 0x37474f, skin: 0xb0bec5, hat: 'none' });
      n.char.setName('🤖 ' + nome, '#' + cor.toString(16).padStart(6, '0'));
      const a = n.actor, ang = (i / Math.max(1, colors.length)) * Math.PI * 2;
      a.pos.set(f.x + Math.cos(ang) * 8, 0.3, f.z + Math.sin(ang) * 8);
      this.players.push({ id: 'b' + ci, name: '🤖 ' + nome, local: false, person: false, bot: true, npc: n, actor: a, char: n.char, alive: true, color: ci, path: null, mem: {} });
    });
    C.player.pos.set(f.x, 0.4, f.z + 9); C.player.vel.set(0, 0, 0); C.player.ry = Math.PI;
    if (key === 'pega') this.startPega();
    if (key === 'esconde') this.startEsconde();
    if (key === 'infiltrados') this.startInfiltrados();
    this.sendT = 0;
  }
  cleanup() {
    for (const p of this.players) if (p.bot) this.ctx.scene.remove(p.char.root);
    for (const m of this.markers) m.removeFromParent();
    this.players = []; this.markers = []; this.target = null; this.itMark = null; this.taskMeshes = null; this.baseRing = null;
    const h = this.ctx.player; h.noGetUp = false; this.setGhost(false);
    this.frozen = false; this.ctx.darken?.(0);
    this.banner(null);
  }
  restart() { this.ctx.closePanel(); this.start(this.active); }
  stop(msg) {
    this.cleanup(); this.active = null; this.follower = null;
    document.querySelector('#jobpanel').classList.add('hidden');
    if (msg) this.ctx.toast(msg);
  }

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
  you(p) { return p && p.local; }
  // Path along the roads (they never have buildings), then straight to the target
  pathTo(s, t) {
    if (isSpace(t.x) || isSpace(s.x)) return [{ x: t.x, z: t.z }];
    if (this.W.segmentFree({ x: s.x, y: 1, z: s.z }, { x: t.x, y: 1, z: t.z }) >= 0.999) return [{ x: t.x, z: t.z }];
    const kS = roadIdx(s.x), mS = roadIdx(s.z), kT = roadIdx(t.x), mT = roadIdx(t.z);
    const rx = (k) => roadLine(k), pts = [];
    const dx = Math.abs(s.x - rx(kS)), dz = Math.abs(s.z - rx(mS));
    if (dx > 4 && dz > 4) pts.push(dx < dz ? { x: rx(kS), z: s.z } : { x: s.x, z: rx(mS) });
    pts.push({ x: rx(kS), z: rx(mS) }, { x: rx(kT), z: rx(mS) }, { x: rx(kT), z: rx(mT) });
    pts.push(Math.abs(t.x - rx(kT)) < Math.abs(t.z - rx(mT)) ? { x: rx(kT), z: t.z } : { x: t.x, z: rx(mT) });
    pts.push({ x: t.x, z: t.z });
    const out = [];
    for (const p of pts) if (!out.length || d2(out[out.length - 1], p) > 1) out.push(p);
    return out;
  }
  // Move a robot towards a point. Returns the distance left.
  stepBot(p, dt, target, speed) {
    const a = p.actor, W = this.W;
    if (a.ragdoll) { a.updateRagdoll(dt, W); a.syncMesh(); p.char.animate(dt, { mode: 'ragdoll' }); return 99; }
    let moveSpeed = 0, left = 0;
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
  // a robot follows someone to the Moon (or back) after a while
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
  keepHumanInside() {
    const h = this.ctx.player;
    if (isSpace(h.pos.x) || h.vehicle) return;
    if (Math.abs(h.pos.x) > EDGE + 6 || Math.abs(h.pos.z) > EDGE + 6) {
      h.pos.x = clamp(h.pos.x, -EDGE - 6, EDGE + 6); h.pos.z = clamp(h.pos.z, -EDGE - 6, EDGE + 6);
      if (!this._warnT || this.t - this._warnT > 4) { this._warnT = this.t; this.ctx.toast('🚧 Fique no centro da cidade: é a área do jogo!'); }
    }
  }
  finish(title, lines) {
    this.over = true; this.target = null; this.banner(null);
    const C = this.ctx;
    C.sfx.fanfare();
    const host = this.sim;
    C.openPanel(`<h2>${title}</h2>${lines.map((l) => `<p>${l}</p>`).join('')}
      <div class="row">${host ? '<button class="btn primary" id="mode-again">🔁 Jogar de novo</button>' : '<button class="btn" disabled>Esperando quem criou a partida…</button>'}
      <button class="btn" id="mode-menu">🎮 Trocar de modo</button></div>`, (el) => {
      el.querySelector('#mode-again')?.addEventListener('click', () => this.restart());
      el.querySelector('#mode-menu').onclick = () => location.reload();
    });
  }
  // places the local player around the fountain (meetings, round start)
  placeAround(i, n, r = 7.5) {
    const f = this.W.fountain, a = (i / Math.max(1, n)) * Math.PI * 2, P = this.ctx.player;
    if (P.vehicle) this.ctx.exitVehicle();
    P.pos.set(f.x + Math.cos(a) * r, 0.5, f.z + Math.sin(a) * r); P.vel.set(0, 0, 0); P.ry = Math.atan2(-Math.cos(a), -Math.sin(a));
  }

  // ---------- main update ----------
  update(dt) {
    if (!this.active) return;
    if (this.follower) { this.updateFollower(dt); return; }
    if (this.over) { this.sendState(dt); return; }
    if (this.meeting) {
      this.meetT += dt;
      if (this.meetT > 25 || this.allVoted()) this.resolveMeeting();
      this.sendState(dt);
      return;
    }
    if (this.ctx.panelOpen()) { this.sendState(dt); return; }
    this.t += dt;
    this.keepHumanInside();
    if (this.active === 'pega') this.updatePega(dt);
    else if (this.active === 'esconde') this.updateEsconde(dt);
    else if (this.active === 'infiltrados') this.updateInfiltrados(dt);
    this.sendState(dt);
  }
  // Extra actions for the local player (keys E/F). Returns a prompt when an action is available.
  interact() {
    if (!this.active || this.over || this.meeting) return null;
    if (this.active === 'infiltrados') return this.follower ? this.interactFollower() : this.interactInfiltrados();
    return null;
  }
  actors() { return this.players.filter((p) => p.bot).map((p) => p.actor); }
  // a friend left the room
  onLeave(id) {
    if (!this.active) return;
    if (this.follower) { if (this.follower.ids[0] === id) this.stop('Quem criou a partida saiu. A brincadeira acabou: agora a cidade está livre.'); return; }
    const p = this.players.find((q) => q.id === id);
    if (!p || this.over) return;
    p.left = true; p.alive = false;
    this.ctx.toast(`${p.name} saiu da partida.`);
    if (this.active === 'pega' && this.it === p) this.setIt(pick(this.players.filter((q) => !q.left)), null);
    if (this.active === 'esconde' && this.seeker === p) this.finish('🏁 Quem procurava saiu da partida.', []);
    if (this.active === 'infiltrados') this.checkWin();
  }

  // ================= PEGA-PEGA =================
  startPega() {
    this.time = 120; this.itTime = {};
    for (const p of this.players) this.itTime[p.id] = 0;
    this.setIt(pick(this.players), null);
    this.banner(`<b>🏃 Pega-pega!</b><br>${this.it.local ? 'Você começa com o pega! Encoste em alguém.' : `${this.ctx.esc(this.it.name)} está com o pega. Corra!`}`, 3500);
  }
  setIt(p, from) {
    this.it = p; this.noBack = from ? { id: from.id, t: 3 } : null;
    this.attachItMark(p.local ? this.ctx.player.char : p.bot ? p.char : this.ctx.remoteChar(p.id));
    if (from) { this.ctx.sfx.bonk(); this.ctx.toast(p.local ? '😱 Você está com o pega!' : `${p.name} está com o pega!`); }
  }
  attachItMark(char) {
    if (!this.itMark) {
      this.itMark = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.7, 4), new THREE.MeshBasicMaterial({ color: 0xff1744 }));
      this.itMark.rotation.x = Math.PI; this.itMark.position.y = 3.1; this.markers.push(this.itMark);
    }
    if (char) char.root.add(this.itMark); else this.itMark.removeFromParent();
  }
  updatePega(dt) {
    this.time -= dt;
    this.itTime[this.it.id] = (this.itTime[this.it.id] || 0) + dt;
    if (this.noBack) { this.noBack.t -= dt; if (this.noBack.t <= 0) this.noBack = null; }
    const h = this.human, it = this.it, live = this.players.filter((q) => !q.left);
    for (const p of live) {
      if (!p.bot) continue;
      let target = null, speed = 0;
      if (p === it) {
        const prey = live.filter((q) => q !== p && !(this.noBack && this.noBack.id === q.id))
          .sort((a, b) => d2(a.actor.pos, p.actor.pos) - d2(b.actor.pos, p.actor.pos))[0];
        if (prey) { target = prey.actor.pos; speed = 7.2; if (prey.person) this.followPlanet(p, prey.actor.pos, dt); }
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
    for (const p of live) {
      if (p === it || (this.noBack && this.noBack.id === p.id)) continue;
      if (d2(p.actor.pos, it.actor.pos) < 1.5 && Math.abs(p.actor.pos.y - it.actor.pos.y) < 2) { this.setIt(p, it); break; }
    }
    this.target = it.local ? null : { x: it.actor.pos.x, z: it.actor.pos.z };
    this.hud('🏃 Pega-pega', it.local ? 'Você está com o pega! Encoste em alguém para passar.' : `${it.name} está com o pega (seta vermelha). Fuja! Você foi pegador por ${Math.round(this.itTime[h.id] || 0)}s.`, this.time);
    if (this.time <= 0) this.finishPega(this.players, this.itTime, this.human.id);
  }
  finishPega(players, itTime, meId) {
    const rank = [...players].sort((a, b) => (itTime[a.id] || 0) - (itTime[b.id] || 0));
    const loser = rank[rank.length - 1];
    this.overCode = 1;
    this.finish(loser.id === meId ? '😅 Você foi o pegador que mais demorou!' : (rank[0].id === meId ? '🏆 Você foi o melhor fujão!' : '🏁 Fim do pega-pega!'),
      rank.map((p, i) => `${i + 1}º ${this.ctx.esc(p.name)} — pegador por ${Math.round(itTime[p.id] || 0)}s${p === loser ? ' 🐢' : ''}`));
  }

  // ================= ESCONDE-ESCONDE =================
  startEsconde() {
    const W = this.W;
    this.base = { x: W.fountain.x, z: W.fountain.z };
    this.seeker = pick(this.players); this.phase = 'contando'; this.count = 15; this.time = 150;
    this.found = new Set(); this.saved = new Set();
    const spots = [...this.hideSpots].sort((a, b) => d2(b, this.base) - d2(a, this.base)).slice(0, 40).sort(() => Math.random() - 0.5);
    for (const p of this.players) { if (p.bot && p !== this.seeker) p.hide = spots.pop(); }
    if (this.seeker.local) this.ctx.player.pos.set(this.base.x, 0.4, this.base.z + 7.5);
    else if (this.seeker.bot) this.seeker.actor.pos.set(this.base.x, 0.4, this.base.z + 7.5);
    if (this.seeker.local) { this.frozen = true; this.banner('<b>🙈 Você conta!</b><br>Feche os olhos… todos estão se escondendo.'); }
    else this.banner(`<b>🙈 ${this.ctx.esc(this.seeker.name)} vai contar até 15!</b><br>Corra e se esconda. Volte ao pique (chafariz) para se salvar.`, 4500);
    this.makeBaseRing();
  }
  makeBaseRing() {
    if (this.baseRing) return;
    const f = this.W.fountain;
    const ring = new THREE.Mesh(new THREE.RingGeometry(7.6, 8.4, 48), new THREE.MeshBasicMaterial({ color: 0x00e676, side: THREE.DoubleSide, transparent: true, opacity: 0.8 }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(f.x, 0.25, f.z); this.ctx.scene.add(ring); this.markers.push(ring); this.baseRing = ring;
  }
  updateEsconde(dt) {
    const h = this.human, sk = this.seeker;
    const hiders = this.players.filter((p) => p !== sk && !p.left);
    const done = (p) => this.found.has(p.id) || this.saved.has(p.id);
    if (this.phase === 'contando') {
      this.count -= dt;
      if (sk.local) { this.banner(`<b>🙈 Contando… ${Math.ceil(this.count)}</b><br>Todos estão se escondendo!`); this.ctx.darken?.(0.85); }
      for (const p of hiders) if (p.bot) this.stepBot(p, dt, p.hide, 6.5);
      if (sk.bot) this.stepBot(sk, dt, null, 0);
      this.hud('🙈 Esconde-esconde', sk.local ? 'Contando…' : 'Esconda-se antes que termine a contagem!', this.count);
      if (this.count <= 0) {
        this.phase = 'procurando'; this.frozen = false; this.ctx.darken?.(0);
        this.banner(sk.local ? '<b>Lá vou eu!</b> Encoste em quem estiver escondido para achar.' : `<b>${this.ctx.esc(sk.name)}: "Lá vou eu!"</b>`, 2500);
        this.ctx.sfx.horn();
      }
      return;
    }
    this.time -= dt;
    for (const p of hiders) {
      if (!p.bot) continue;
      if (done(p)) { this.stepBot(p, dt, this.saved.has(p.id) ? this.base : null, 2); continue; }
      const close = isSpace(p.actor.pos.x) === isSpace(sk.actor.pos.x) && d2(p.actor.pos, sk.actor.pos) < 9;
      if (close && p.run === undefined) p.run = Math.random() < 0.55;
      if (!close && p.run === false) p.run = undefined;
      this.stepBot(p, dt, p.run ? this.base : p.hide, p.run ? 6.4 : 3);
    }
    if (sk.bot) {
      let target = null, speed = 4.2;
      const visible = hiders.filter((p) => !done(p) && !(p.local && this.ctx.player.vehicle) && this.sees(sk.actor, p.actor, p.person ? 15 : 12));
      if (visible.length) { target = visible[0].actor.pos; speed = 7; }
      else {
        const awayOnMoon = hiders.find((p) => p.person && !done(p) && isSpace(p.actor.pos.x));
        if (awayOnMoon && this.followPlanet(sk, awayOnMoon.actor.pos, dt)) speed = 0;
        if (!sk.goal2 || d2(sk.actor.pos, sk.goal2) < 3) {
          sk.visited = sk.visited || new Set();
          const next = this.hideSpots.filter((s) => !sk.visited.has(s)).sort((a, b) => d2(a, sk.actor.pos) - d2(b, sk.actor.pos))[Math.floor(Math.random() * 3)];
          sk.goal2 = next || this.wanderPoint(); if (next) sk.visited.add(next);
        }
        if (speed) target = sk.goal2;
      }
      this.stepBot(sk, dt, target, speed);
    }
    for (const p of hiders) {
      if (done(p)) continue;
      if (isSpace(p.actor.pos.x) || d2(p.actor.pos, this.base) > 25) p.leftBase = true;
      if (p.leftBase && d2(p.actor.pos, this.base) < BASE_R && !isSpace(p.actor.pos.x)) { this.saved.add(p.id); this.ctx.toast(p.local ? '🟢 Pique! Você está salvo!' : `🟢 ${p.name} chegou no pique!`); continue; }
      if (d2(p.actor.pos, sk.actor.pos) < 1.8 && Math.abs(p.actor.pos.y - sk.actor.pos.y) < 2) {
        this.found.add(p.id); this.ctx.sfx.bonk();
        this.ctx.toast(sk.local ? `🙌 Achei ${p.name}!` : (p.local ? '😱 Você foi achado!' : `${sk.name} achou ${p.name}!`));
      }
    }
    const left = hiders.filter((p) => !done(p)).length;
    this.target = null;
    this.hud('🙈 Esconde-esconde', sk.local ? `Procure! Faltam ${left} (achados ${this.found.size}, salvos ${this.saved.size}).`
      : (done(h) ? (this.saved.has(h.id) ? 'Você está salvo! Assista ao resto.' : 'Você foi achado. Assista ao resto.') : `Fique escondido ou corra para o pique (chafariz). ${sk.name} está procurando…`), this.time);
    if (left === 0 || this.time <= 0) {
      this.overCode = 1;
      this.finishEsconde(hiders, sk, (p) => this.found.has(p.id), (p) => this.saved.has(p.id), h.id);
    }
  }
  finishEsconde(hiders, sk, isFound, isSaved, meId) {
    const lines = hiders.map((p) => `${this.ctx.esc(p.name)}: ${isFound(p) ? '🔎 achado' : isSaved(p) ? '🟢 salvo no pique' : '🫥 ninguém achou!'}`);
    const me = hiders.find((p) => p.id === meId);
    const title = sk.id === meId ? `🔎 Você achou ${hiders.filter(isFound).length} de ${hiders.length}!` : (me && isFound(me) ? '😅 Você foi achado!' : '🏆 Ninguém te achou!');
    this.finish(title, lines);
  }

  // ================= INFILTRADOS NA CIDADE =================
  startInfiltrados() {
    this.cooldown = 20; this.alarmUsed = false; this.bodies = []; this.votes = {};
    this.imp = pick(this.players);
    for (const p of this.players) { p.role = p === this.imp ? 'infiltrado' : 'tripulante'; }
    const spots = [...this.hideSpots].sort(() => Math.random() - 0.5).slice(0, 8);
    this.tasks = spots.map((s) => ({ x: s.x, z: s.z, done: false, prog: 0 }));
    this.makeTaskMeshes();
    this.banner(this.imp.local ? '<b>😈 Você é o INFILTRADO!</b><br>Nocauteie tripulantes (F) quando ninguém estiver vendo. Não deixe te descobrirem!'
      : '<b>🧑‍🚀 Você é TRIPULANTE</b><br>Faça as tarefas amarelas. Achou alguém nocauteado? Reporte (E).', 5000);
  }
  makeTaskMeshes() {
    const C = this.ctx;
    this.taskMeshes = this.tasks.map((t) => {
      const g = new THREE.Group();
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 2.2, 10), new THREE.MeshStandardMaterial({ color: 0xffd600, emissive: 0xffab00, emissiveIntensity: 0.7 }));
      pole.position.y = 1.1; g.add(pole);
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.6, 2.1, 30), new THREE.MeshBasicMaterial({ color: 0xffd600, side: THREE.DoubleSide }));
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.2; g.add(ring);
      g.position.set(t.x, C.world.groundAt(t.x, t.z, 3), t.z); C.scene.add(g); this.markers.push(g);
      return { g, pole };
    });
  }
  aliveCrew() { return this.players.filter((p) => p.alive && !p.left && p.role === 'tripulante'); }
  knockOut(victim, by) {
    victim.alive = false;
    const a = victim.actor;
    if (!victim.remote) { a.noGetUp = true; a.knock(rand(-2, 2), 4, rand(-2, 2), 6); }
    this.bodies.push({ p: victim, x: a.pos.x, z: a.pos.z, reported: false });
    for (const w of this.players) if (w.bot && w.alive && w !== by && this.sees(w.actor, by.actor, 16)) w.mem.witness = by.id;
    if (victim.local) this.becomeGhost();
    this.cooldown = 22;
    this.ctx.sfx.bonk();
  }
  becomeGhost() {
    this.ctx.toast('💫 Você foi nocauteado! Agora você é um fantasma: ainda pode fazer tarefas.');
    setTimeout(() => { this.ctx.player.noGetUp = false; this.setGhost(true); }, 2500);
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
      const victim = this.players.find((p) => !p.local && p.alive && !p.left && d2(p.actor.pos, h.actor.pos) < 2.4);
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
    const h = this.human;
    this.cooldown = Math.max(0, this.cooldown - dt);
    const openTasks = this.tasks.filter((t) => !t.done);
    for (const p of this.players) {
      if (!p.bot) continue;
      if (!p.alive) { this.stepBot(p, dt, null, 0); continue; }
      let target = null, speed = 3.6;
      if (p.role === 'infiltrado') {
        const prey = this.players.filter((q) => q.alive && !q.left && q !== p && q.role === 'tripulante' && isSpace(q.actor.pos.x) === isSpace(p.actor.pos.x))
          .sort((a, b) => d2(a.actor.pos, p.actor.pos) - d2(b.actor.pos, p.actor.pos))[0];
        if (prey && this.cooldown <= 0) {
          const others = this.players.filter((q) => q.alive && !q.left && q !== p && q !== prey && d2(q.actor.pos, prey.actor.pos) < 18 && this.sees(q.actor, prey.actor, 18));
          if (!others.length) { target = prey.actor.pos; speed = 4.6; if (d2(prey.actor.pos, p.actor.pos) < 1.8) this.knockOut(prey, p); }
        }
        if (!target) { if (!p.fake || d2(p.actor.pos, p.fake) < 2.5) p.fake = pick(this.tasks); target = p.fake; }
      } else {
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
    if (h.role === 'tripulante') this.localTasks(dt, openTasks, (t) => this.finishTask(t));
    this.spinTasks(dt);
    const done = this.tasks.filter((t) => t.done).length;
    this.infilHud(h.role === 'infiltrado', h.alive, done, this.players.filter((p) => p.alive && !p.left).length, this.cooldown);
    this.checkWin();
  }
  localTasks(dt, openTasks, onDone) {
    if (this.ctx.player.vehicle) { this.taskNear = null; return; }
    const P = this.ctx.player.pos;
    const t = openTasks.find((tk) => d2(tk, P) < 2.2);
    if (t) { t.prog += dt; this.taskNear = t; if (t.prog >= 3) onDone(t); } else this.taskNear = null;
    const myTask = [...openTasks].sort((a, b) => d2(a, P) - d2(b, P))[0];
    this.target = myTask ? { x: myTask.x, z: myTask.z } : null;
  }
  spinTasks(dt) {
    if (!this.taskMeshes) return;
    this.tasks.forEach((t, i) => { const m = this.taskMeshes[i]; m.g.visible = !t.done; if (!t.done) m.pole.rotation.y += dt * 2; });
  }
  infilHud(isImp, alive, done, vivos, cooldown) {
    const roleTxt = isImp ? `😈 Você é o INFILTRADO · nocautear: ${cooldown > 0 ? Math.ceil(cooldown) + 's' : 'pronto (F)'}` : (alive ? '🧑‍🚀 Tripulante' : '👻 Fantasma (faça tarefas)');
    const near = this.taskNear ? ` · Fazendo tarefa… ${Math.min(100, Math.round(this.taskNear.prog / 3 * 100))}%` : '';
    if (isImp) this.target = null;
    this.hud('🕵️ Infiltrados na Cidade', `${roleTxt} · Tarefas ${done}/${this.tasks.length} · Vivos ${vivos}${near}`, null);
  }
  finishTask(t) {
    if (t.done) return;
    t.done = true; this.ctx.sfx.coin();
  }
  checkWin() {
    if (this.over || this.meeting) return;
    const crew = this.aliveCrew().length, impAlive = this.imp.alive && !this.imp.left;
    const done = this.tasks.every((t) => t.done);
    if (!impAlive) this.overCode = 2; else if (done) this.overCode = 1; else if (crew <= 1) this.overCode = 3;
    if (this.overCode) this.finishInfil(this.overCode, this.imp, this.human);
  }
  finishInfil(code, imp, me) {
    const meImp = imp.id === me.id;
    const reveal = `O infiltrado era <b>${this.ctx.esc(imp.name)}</b>.`;
    if (code === 2) this.finish(meImp ? '😵 Descobriram você!' : '🎉 A tripulação venceu!', ['O infiltrado foi mandado para a Lua!', reveal]);
    else if (code === 1) this.finish(meImp ? '😵 A tripulação terminou as tarefas!' : '🎉 A tripulação venceu!', ['Todas as tarefas foram feitas.', reveal]);
    else this.finish(meImp ? '😈 Você venceu como infiltrado!' : '😈 O infiltrado venceu!', ['Sobraram poucos tripulantes.', reveal]);
  }
  startMeeting(reporter, body) {
    if (this.meeting || this.over) return;
    this.meeting = true; this.meetT = 0; this.target = null; this.votes = {};
    this.seqMeeting++; this.meetReporter = reporter; this.meetVictim = body ? body.p : null;
    const C = this.ctx, f = this.W.fountain;
    for (const b of this.bodies) { b.reported = true; if (b.p.bot) b.p.char.root.visible = false; }
    const alive = this.players.filter((p) => p.alive && !p.left);
    alive.forEach((p, i) => {
      if (p.local) this.placeAround(i, alive.length);
      else if (p.bot) { const a = (i / alive.length) * Math.PI * 2; p.actor.pos.set(f.x + Math.cos(a) * 7.5, 0.5, f.z + Math.sin(a) * 7.5); p.actor.vel.set(0, 0, 0); p.actor.ry = Math.atan2(-Math.cos(a), -Math.sin(a)); p.path = null; p.actor.syncMesh(); }
    });
    // robots decide now
    for (const p of alive) {
      if (!p.bot) continue;
      let v = null;
      if (p.role === 'infiltrado') v = pick(alive.filter((q) => q !== p)).id;
      else if (p.mem.witness && alive.some((q) => q.id === p.mem.witness)) v = p.mem.witness;
      else if (body && Math.random() < 0.55) {
        const near = alive.filter((q) => q !== p).sort((a, b) => d2(a.actor.pos, body) - d2(b.actor.pos, body));
        v = near[0] && near[0].id;
      }
      this.votes[p.id] = v || 'pular';
    }
    C.sfx.horn();
    this.openVotePanel(reporter.name, body ? body.p.name : null, alive, this.human.alive, (v) => { this.votes[this.human.id] = v || 'pular'; });
  }
  openVotePanel(reporterName, victimName, alive, canVote, onVote) {
    const C = this.ctx, e = C.esc;
    const what = victimName ? `${e(reporterName)} achou <b>${e(victimName)}</b> nocauteado!` : `${e(reporterName)} tocou o alarme!`;
    C.openPanel(`<h2>🗳️ Reunião: quem é o infiltrado?</h2><p>${what}</p>
      ${canVote ? '<p class="small muted">Toque em quem você acha que é o infiltrado. Todos votam.</p>' : '<p class="small muted">Você é um fantasma e não vota. Espere o resultado.</p>'}
      <div class="grid">${alive.map((p) => `<button class="btn ${canVote ? 'blue' : ''}" data-vote="${e(p.id)}" ${canVote && !p.local ? '' : 'disabled'}>${e(p.name)}${p.local ? ' (você)' : ''}</button>`).join('')}</div>
      <div class="row"><button class="btn" id="vote-skip" ${canVote ? '' : 'disabled'}>Pular voto</button></div><p class="small muted" id="vote-status"></p>`, (el) => {
      const voted = (v) => { onVote(v); el.querySelectorAll('button[data-vote], #vote-skip').forEach((b) => { b.disabled = true; }); el.querySelector('#vote-status').textContent = 'Voto enviado! Esperando os outros…'; };
      el.querySelectorAll('[data-vote]').forEach((b) => b.onclick = () => voted(b.dataset.vote));
      el.querySelector('#vote-skip').onclick = () => voted(null);
    });
    document.getElementById('panel-close').classList.add('hidden');
  }
  allVoted() { return this.players.filter((p) => p.alive && !p.left).every((p) => this.votes[p.id]); }
  resolveMeeting() {
    const C = this.ctx, e = C.esc;
    const tally = {}; let skips = 0;
    for (const p of this.players) {
      if (!p.alive || p.left) continue;
      const v = this.votes[p.id];
      if (v && v !== 'pular' && this.players.some((q) => q.id === v && q.alive)) tally[v] = (tally[v] || 0) + 1; else skips++;
    }
    const best = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    let msg; this.lastEject = -1; this.lastEjectImp = 0;
    if (best.length && best[0][1] > skips && (!best[1] || best[1][1] < best[0][1])) {
      const out = this.players.find((p) => p.id === best[0][0]);
      out.alive = false; out.ejected = true;
      this.lastEject = this.players.indexOf(out); this.lastEjectImp = out.role === 'infiltrado' ? 1 : 0;
      const m = C.world.locations.moonPad;
      if (!out.remote) out.actor.pos.set(m.x + rand(-4, 4), 1, m.z + rand(2, 6));
      if (out.local) { C.player.vel.set(0, 0, 0); this.setGhost(true); }
      msg = `🚀 ${e(out.name)} foi mandado para a Lua! ${out.role === 'infiltrado' ? 'Era o infiltrado!' : 'Não era o infiltrado…'}`;
    } else msg = 'Ninguém foi mandado para a Lua (empate ou pularam).';
    for (const p of this.players) if (p.mem && p.mem.witness && !this.players.find((q) => q.id === p.mem.witness)?.alive) p.mem.witness = null;
    this.meeting = false; this.seqResult++;
    document.getElementById('panel-close').classList.remove('hidden');
    C.closePanel();
    C.toast(msg); this.banner(`<b>${msg}</b>`, 4000);
    this.cooldown = Math.max(this.cooldown, 15);
    this.checkWin();
  }

  // ================= ONLINE: the host sends the state =================
  sendState(dt) {
    if (!this.online || !this.sim) return;
    this.sendT = (this.sendT || 0) + dt;
    if (this.sendT < 0.2) return;
    this.sendT = 0;
    const P = this.players, idx = (p) => (p ? P.indexOf(p) : -1);
    const mode = MODE_KEYS.indexOf(this.active);
    let phase = PH.play, timer = 0;
    if (this.active === 'pega') timer = this.time;
    if (this.active === 'esconde') { phase = this.phase === 'contando' ? PH.count : PH.search; timer = this.phase === 'contando' ? this.count : this.time; }
    if (this.active === 'infiltrados' && this.meeting) phase = PH.meeting;
    const tasks = this.tasks && this.active === 'infiltrados' ? this.tasks : [];
    const d = [mode, this.round, phase, r1(Math.max(0, timer)), r1(this.cooldown || 0), this.seqMeeting, idx(this.meetReporter), idx(this.meetVictim),
      this.seqResult, this.lastEject, this.lastEjectImp, this.overCode, idx(this.imp), idx(this.seeker), idx(this.it), this.noBack ? P.findIndex((q) => q.id === this.noBack.id) : -1, tasks.length];
    for (const t of tasks) d.push(r1(t.x), r1(t.z), t.done ? 1 : 0);
    for (const p of P) {
      const a = p.actor;
      let fl = 0;
      if (p.alive && !p.left) fl |= F.alive;
      if (this.it === p) fl |= F.it;
      if (this.found && this.found.has(p.id)) fl |= F.found;
      if (this.saved && this.saved.has(p.id)) fl |= F.saved;
      const body = this.bodies && this.bodies.find((b) => b.p === p);
      if (body) fl |= F.body | (body.reported ? F.reported : 0);
      if (p.ejected) fl |= F.ejected;
      if (this.imp === p) fl |= F.imp;
      if (this.seeker === p) fl |= F.seeker;
      d.push(r1(a.pos.x), r1(a.pos.y), r1(a.pos.z), Math.round((a.ry || 0) * 100), fl, p.color, this.itTime ? r1(this.itTime[p.id] || 0) : 0);
    }
    this.ctx.net.send({ t: 'm', d, ids: P.map((p) => p.id) });
  }
  // the host receives an action from a friend
  onAction(m) {
    if (!this.active || this.follower || !this.sim || this.over) return;
    const who = this.players.find((p) => p.id === m.id);
    if (!who || who.left) return;
    const target = this.players[m.p];
    if (this.active !== 'infiltrados') return;
    if (m.a === A.knock && who.role === 'infiltrado' && who.alive && target && target !== who && target.alive && this.cooldown <= 0 && d2(who.actor.pos, target.actor.pos) < 3.5) this.knockOut(target, who);
    else if (m.a === A.report && who.alive && !this.meeting) {
      const body = this.bodies.find((b) => b.p === target && !b.reported && d2(b, who.actor.pos) < 6);
      if (body) this.startMeeting(who, body);
    } else if (m.a === A.alarm && who.alive && !this.alarmUsed && !this.meeting && d2(who.actor.pos, this.W.fountain) < BASE_R + 3) { this.alarmUsed = true; this.startMeeting(who, null); }
    else if (m.a === A.vote && this.meeting && who.alive && !this.votes[who.id]) this.votes[who.id] = target ? target.id : 'pular';
    else if (m.a === A.task && who.role === 'tripulante' && this.tasks[m.p] && d2(this.tasks[m.p], who.actor.pos) < 5) this.finishTask(this.tasks[m.p]);
  }

  // ================= ONLINE: friends follow the host =================
  onState(m) {
    if (!Array.isArray(m.d) || !Array.isArray(m.ids)) return;
    if (this.sim && this.active) return; // I am running a game myself
    const d = m.d, key = MODE_KEYS[d[0]];
    if (!key || key === 'cidade') return;
    const H = 17, nT = d[16] || 0;
    const tasks = [];
    for (let i = 0; i < nT; i++) tasks.push({ x: d[H + i * 3] / 10, z: d[H + i * 3 + 1] / 10, done: !!d[H + i * 3 + 2], prog: 0 });
    const base = H + nT * 3, players = [];
    m.ids.forEach((id, i) => {
      const o = base + i * 7;
      players.push({ id, x: d[o] / 10, y: d[o + 1] / 10, z: d[o + 2] / 10, ry: d[o + 3] / 100, fl: d[o + 4], color: d[o + 5], itTime: d[o + 6] / 10 });
    });
    const st = { key, round: d[1], phase: d[2], timer: d[3] / 10, cooldown: d[4] / 10, seqMeeting: d[5], reporter: d[6], victim: d[7], seqResult: d[8],
      eject: d[9], ejectImp: d[10], over: d[11], imp: d[12], seeker: d[13], it: d[14], noBack: d[15], tasks, players, ids: m.ids };
    if (!this.follower || this.follower.round !== st.round || this.active !== key) this.startFollower(st);
    this.applyState(st);
  }
  startFollower(st) {
    this.cleanup();
    const C = this.ctx;
    C.prepareWorld(st.key);
    this.active = st.key; this.sim = false; this.over = false; this.meeting = false;
    this.follower = { round: st.round, ids: st.ids, bots: new Map(), seqMeeting: st.seqMeeting, seqResult: st.seqResult, ghost: false, ejected: false, phase: 0, sentTasks: new Set() };
    this.players = [];
    this.tasks = st.tasks.map((t) => ({ ...t })); if (st.key === 'infiltrados') this.makeTaskMeshes();
    if (st.key === 'esconde') this.makeBaseRing();
    const meI = st.ids.indexOf(this.myId);
    if (meI < 0) { this.follower.watching = true; C.toast('Tem uma brincadeira acontecendo: você entra na próxima rodada.'); return; }
    this.placeAround(meI, st.ids.length, 9);
    const me = st.players[meI];
    const name = st.key === 'pega' ? '🏃 Pega-pega' : st.key === 'esconde' ? '🙈 Esconde-esconde' : '🕵️ Infiltrados na Cidade';
    if (st.key === 'infiltrados') this.banner(me.fl & F.imp ? '<b>😈 Você é o INFILTRADO!</b><br>Nocauteie tripulantes (F) quando ninguém estiver vendo.' : '<b>🧑‍🚀 Você é TRIPULANTE</b><br>Faça as tarefas amarelas. Achou alguém nocauteado? Reporte (E).', 5000);
    else this.banner(`<b>${name}!</b> Quem criou a partida começou uma rodada.`, 3000);
    if (st.key === 'esconde' && (me.fl & F.seeker)) C.player.pos.set(this.W.fountain.x, 0.4, this.W.fountain.z + 7.5);
  }
  nameOf(st, i) {
    const p = st.players[i]; if (!p) return '?';
    if (p.id === this.myId) return this.ctx.myName();
    if (p.id[0] === 'b') return '🤖 ' + (BOT_COLORS[p.color] || ['Robô'])[0];
    return this.ctx.remoteName(p.id) || 'Amigo';
  }
  charOf(st, i) {
    const p = st.players[i]; if (!p) return null;
    if (p.id === this.myId) return this.ctx.player.char;
    if (p.id[0] === 'b') return this.follower.bots.get(p.id)?.char || null;
    return this.ctx.remoteChar(p.id);
  }
  applyState(st) {
    const C = this.ctx, Fw = this.follower, e = C.esc;
    Fw.st = st;
    // robots
    st.players.forEach((p) => {
      if (p.id[0] !== 'b') return;
      let b = Fw.bots.get(p.id);
      if (!b) {
        const [nome, cor] = BOT_COLORS[p.color] || ['Robô', 0x9e9e9e];
        const n = new Npc(C.scene, { shirt: cor, pants: 0x37474f, skin: 0xb0bec5, hat: 'none' });
        n.char.setName('🤖 ' + nome, '#' + cor.toString(16).padStart(6, '0'));
        n.actor.pos.set(p.x, p.y, p.z);
        b = { npc: n, char: n.char, actor: n.actor, tgt: { x: p.x, y: p.y, z: p.z }, ry: p.ry };
        Fw.bots.set(p.id, b); this.players.push({ id: p.id, bot: true, char: n.char, actor: n.actor });
      }
      b.tgt = { x: p.x, y: p.y, z: p.z }; b.ry = p.ry; b.down = (p.fl & F.body) && !(p.fl & F.ejected); b.hidden = (p.fl & F.reported) && !(p.fl & F.ejected);
    });
    if (Fw.watching) return;
    const meI = st.ids.indexOf(this.myId), me = st.players[meI];
    // markers
    if (st.key === 'pega') this.attachItMark(this.charOf(st, st.it));
    this.tasks.forEach((t, i) => { if (st.tasks[i]) t.done = st.tasks[i].done; });
    // my own fate
    if (st.key === 'infiltrados' && !(me.fl & F.alive) && !Fw.ghost) {
      Fw.ghost = true;
      if (me.fl & F.ejected) { const m = this.W.locations.moonPad; C.player.pos.set(m.x, 1, m.z + 4); C.player.vel.set(0, 0, 0); this.setGhost(true); }
      else { C.player.noGetUp = true; C.player.knock(rand(-2, 2), 4, rand(-2, 2), 6); this.becomeGhost(); }
    }
    if (st.key === 'esconde') {
      const counting = st.phase === PH.count && !!(me.fl & F.seeker);
      if (counting !== this.frozen) { this.frozen = counting; C.darken?.(counting ? 0.85 : 0); if (!counting) this.banner(null); }
      if (counting) this.banner(`<b>🙈 Contando… ${Math.ceil(st.timer)}</b><br>Todos estão se escondendo!`);
      if ((me.fl & F.found) && !Fw.wasFound) { Fw.wasFound = true; C.toast('😱 Você foi achado!'); C.sfx.bonk(); }
      if ((me.fl & F.saved) && !Fw.wasSaved) { Fw.wasSaved = true; C.toast('🟢 Pique! Você está salvo!'); }
    }
    if (st.key === 'pega' && Fw.lastIt !== undefined && Fw.lastIt !== st.it) { C.sfx.bonk(); C.toast(st.it === meI ? '😱 Você está com o pega!' : `${this.nameOf(st, st.it)} está com o pega!`); }
    Fw.lastIt = st.it;
    // meetings
    if (st.phase === PH.meeting && Fw.seqMeeting !== st.seqMeeting) {
      Fw.seqMeeting = st.seqMeeting; this.meeting = true;
      const alive = st.players.map((p, i) => ({ p, i })).filter(({ p }) => p.fl & F.alive);
      const mySlot = alive.findIndex(({ i }) => i === meI);
      if (mySlot >= 0) this.placeAround(mySlot, alive.length);
      C.sfx.horn();
      this.openVotePanel(this.nameOf(st, st.reporter), st.victim >= 0 ? this.nameOf(st, st.victim) : null,
        alive.map(({ p, i }) => ({ id: String(i), name: this.nameOf(st, i), local: i === meI })), !!(me.fl & F.alive),
        (v) => C.net.send({ t: 'ma', a: A.vote, p: v == null ? -1 : Number(v) }));
    }
    if (st.phase !== PH.meeting && this.meeting) { this.meeting = false; document.getElementById('panel-close').classList.remove('hidden'); C.closePanel(); }
    if (Fw.seqResult !== st.seqResult) {
      Fw.seqResult = st.seqResult;
      const msg = st.eject >= 0 ? `🚀 ${e(this.nameOf(st, st.eject))} foi mandado para a Lua! ${st.ejectImp ? 'Era o infiltrado!' : 'Não era o infiltrado…'}` : 'Ninguém foi mandado para a Lua (empate ou pularam).';
      C.toast(msg); this.banner(`<b>${msg}</b>`, 4000);
    }
    // end of the round
    if (st.over && !this.over) {
      const named = st.players.map((p, i) => ({ id: p.id, name: this.nameOf(st, i), p }));
      if (st.key === 'pega') { const itTime = {}; named.forEach((n) => { itTime[n.id] = n.p.itTime; }); this.finishPega(named, itTime, this.myId); }
      if (st.key === 'esconde') { const sk = named[st.seeker]; this.finishEsconde(named.filter((n) => n !== sk), sk, (n) => !!(n.p.fl & F.found), (n) => !!(n.p.fl & F.saved), this.myId); }
      if (st.key === 'infiltrados') this.finishInfil(st.over, named[st.imp], named[meI]);
    }
  }
  updateFollower(dt) {
    const Fw = this.follower, st = Fw.st;
    for (const b of Fw.bots.values()) {
      const a = b.actor, k = Math.min(1, dt * 8), ox = a.pos.x, oz = a.pos.z;
      a.pos.x += (b.tgt.x - a.pos.x) * k; a.pos.y += (b.tgt.y - a.pos.y) * k; a.pos.z += (b.tgt.z - a.pos.z) * k;
      if (Math.hypot(b.tgt.x - a.pos.x, b.tgt.z - a.pos.z) > 25) a.pos.set(b.tgt.x, b.tgt.y, b.tgt.z);
      a.ry = angLerp(a.ry, b.ry, k);
      b.char.root.visible = !b.hidden;
      a.syncMesh();
      if (b.down) { b.char.spin.rotation.x = -Math.PI / 2; b.char.root.position.y -= 0.45; b.char.animate(dt, { mode: 'ragdoll' }); }
      else { b.char.spin.rotation.set(0, 0, 0); b.char.animate(dt, { speed: Math.hypot(a.pos.x - ox, a.pos.z - oz) / Math.max(dt, 1e-3), grounded: true, mode: 'walk' }); }
    }
    if (!st || Fw.watching) { this.hud('🎮 ' + MODES[this.active].name, 'Tem uma rodada acontecendo: você entra na próxima.', null); return; }
    if (this.over) return;
    this.t = (this.t || 0) + dt;
    this.keepHumanInside();
    const meI = st.ids.indexOf(this.myId), me = st.players[meI];
    if (st.key === 'pega') {
      const itP = st.players[st.it];
      this.target = st.it === meI || !itP ? null : { x: itP.x, z: itP.z };
      this.hud('🏃 Pega-pega', st.it === meI ? 'Você está com o pega! Encoste em alguém para passar.' : `${this.nameOf(st, st.it)} está com o pega (seta vermelha). Fuja! Você foi pegador por ${Math.round(me.itTime)}s.`, st.timer);
    } else if (st.key === 'esconde') {
      this.target = null;
      const amSeeker = !!(me.fl & F.seeker);
      const left = st.players.filter((p, i) => i !== st.seeker && !(p.fl & (F.found | F.saved))).length;
      const txt = amSeeker ? (st.phase === PH.count ? 'Contando…' : `Procure! Faltam ${left}. Encoste em quem estiver escondido.`)
        : (me.fl & F.found ? 'Você foi achado. Assista ao resto.' : me.fl & F.saved ? 'Você está salvo! Assista ao resto.' : `Fique escondido ou corra para o pique (chafariz). ${this.nameOf(st, st.seeker)} está procurando…`);
      this.hud('🙈 Esconde-esconde', txt, st.timer);
    } else if (st.key === 'infiltrados') {
      const isImp = !!(me.fl & F.imp), open = this.tasks.filter((t) => !t.done && !Fw.sentTasks.has(this.tasks.indexOf(t)));
      if (!isImp) this.localTasks(dt, open, (t) => { const i = this.tasks.indexOf(t); Fw.sentTasks.add(i); this.ctx.net.send({ t: 'ma', a: A.task, p: i }); });
      this.spinTasks(dt);
      this.infilHud(isImp, !!(me.fl & F.alive), this.tasks.filter((t) => t.done).length, st.players.filter((p) => p.fl & F.alive).length, st.cooldown);
    }
  }
  interactFollower() {
    const C = this.ctx, st = this.follower.st, inp = C.input;
    if (!st || this.follower.watching || C.player.vehicle) return null;
    const meI = st.ids.indexOf(this.myId), me = st.players[meI];
    if (!(me.fl & F.alive)) return null;
    const P = C.player.pos;
    const send = (a, p) => C.net.send({ t: 'ma', a, p });
    if (me.fl & F.imp) {
      const vi = st.players.findIndex((p, i) => i !== meI && (p.fl & F.alive) && Math.hypot(p.x - P.x, p.z - P.z) < 2.4);
      if (vi >= 0) {
        if (st.cooldown > 0) return `Nocautear em ${Math.ceil(st.cooldown)}s`;
        if (inp.pressed('KeyF')) send(A.knock, vi);
        return `F: nocautear ${this.nameOf(st, vi)}`;
      }
    }
    const bi = st.players.findIndex((p) => (p.fl & F.body) && !(p.fl & F.reported) && !(p.fl & F.ejected) && Math.hypot(p.x - P.x, p.z - P.z) < 3.5);
    if (bi >= 0) { if (inp.pressed('KeyE')) send(A.report, bi); return `E: reportar ${this.nameOf(st, bi)}`; }
    if (d2(P, this.W.fountain) < BASE_R + 0.5) { if (inp.pressed('KeyE')) send(A.alarm, -1); return 'E: tocar o alarme (reunião de emergência)'; }
    return null;
  }
}
