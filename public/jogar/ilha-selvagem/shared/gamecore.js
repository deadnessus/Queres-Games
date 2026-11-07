// Lógica do jogo (sem rede e sem arquivos): usada pelo servidor Node (server.js) e pela versão solo no navegador.
// Cada cliente é uma "conn" com conn.send(objeto). O jogo chama conn.send; quem usa decide como transportar.
import { createWorld, WATER, CHUNK } from './world.js';
import { SPECIES, SPECIES_IDS } from './species.js';
import { PIECES, BuildIndex, snapPiece, pieceCost, MATS } from './pieces.js';

export function createGame({ seed: seedIn, saved = {}, dev = false, maxPlayers = 16 } = {}) {
const MAX_PLAYERS = maxPlayers;
const DAY_MS = 10 * 60 * 1000; // um dia = 10 minutos
const RESPAWN_MS = 150 * 1000;
const DEV = dev; // só para testes: permite teleporte e itens grátis
const timers = [];
const seed = Number(saved.seed) || Number(seedIn) || Math.floor(Math.random() * 1e9);
const world = createWorld(seed);
const index = new BuildIndex();
let nextPieceId = 1;
for (const p of saved.pieces || []) { index.add(p); nextPieceId = Math.max(nextPieceId, p.id + 1); }
const store = saved.players || {}; // por nome: { inv, weapon, bed }
const epoch = Date.now() - (saved.phase ?? 0.3) * DAY_MS;
let dirty = false;

// ---------------- jogadores e aprovação de entrada ----------------
let nextId = 1;
const players = new Map();  // aprovados
const pending = new Map();  // esperando aprovação
let hostId = null;
const send = (conn, o) => conn.send(o);
const broadcast = (o, except) => { for (const p of players.values()) if (p.id !== except) p.conn.send(o); };
const sendTo = (pl, o) => pl.conn.send(o);

const START_INV = () => ({ madeira: 0, pedra: 0, palha: 0, carne: 0, assada: 0 });
const cleanName = (n) => String(n || '').replace(/[^\p{L}\p{N} _-]/gu, '').trim().slice(0, 16);

function askHost(pend) {
  const host = players.get(hostId);
  if (host) sendTo(host, { t: 'joinRequest', id: pend.id, name: pend.name });
}
function approve(pend) {
  clearTimeout(pend.timer); pending.delete(pend.id);
  let name = pend.name, n = 2;
  while ([...players.values()].some((p) => p.name.toLowerCase() === name.toLowerCase())) name = pend.name + n++;
  const sp = world.findSpawn();
  const st = store[name] || (store[name] = { inv: START_INV(), weapon: 'punho', bed: null });
  const pl = { id: pend.id, conn: pend.conn, name, x: sp.x, y: sp.y, z: sp.z, ry: 0, st: 0, hp: 100, hunger: 80, dead: false, inv: st.inv, weapon: st.weapon, joined: Date.now(), safe: Date.now() + 25000, swingCd: 0, lastEat: 0, lastMsg: 0 };
  if (st.bed && index.byId.has(st.bed.id)) { pl.x = st.bed.x + 1.4; pl.z = st.bed.z; pl.y = Math.max(st.bed.y, world.heightAt(pl.x, pl.z)) + 0.1; }
  players.set(pl.id, pl);
  pend.conn.player = pl;
  if (hostId === null) hostId = pl.id;
  sendTo(pl, {
    t: 'welcome', id: pl.id, name, seed, host: hostId === pl.id, now: Date.now(), epoch, dayMs: DAY_MS,
    pos: { x: pl.x, y: pl.y, z: pl.z }, hp: pl.hp, hunger: pl.hunger, inv: pl.inv, weapon: pl.weapon,
    pieces: [...index.byId.values()], taken: [...taken.entries()].map(([id, t]) => [id, t - Date.now()]),
    players: [...players.values()].filter((p) => p.id !== pl.id).map(pubPlayer),
  });
  broadcast({ t: 'playerJoin', p: pubPlayer(pl) }, pl.id);
  broadcast({ t: 'chat', sys: true, text: `${name} entrou no mundo.` });
}
const pubPlayer = (p) => ({ id: p.id, name: p.name, x: p.x, y: p.y, z: p.z, ry: p.ry, st: p.st, weapon: p.weapon });

function removePlayer(conn) {
  const pend = [...pending.values()].find((x) => x.conn === conn);
  if (pend) { clearTimeout(pend.timer); pending.delete(pend.id); }
  const pl = conn.player; if (!pl || !players.has(pl.id)) return;
  players.delete(pl.id);
  broadcast({ t: 'playerLeave', id: pl.id });
  broadcast({ t: 'chat', sys: true, text: `${pl.name} saiu.` });
  dirty = true;
  if (hostId === pl.id) {
    const next = [...players.values()].sort((a, b) => a.joined - b.joined)[0];
    hostId = next ? next.id : null;
    if (next) { sendTo(next, { t: 'host' }); broadcast({ t: 'chat', sys: true, text: `${next.name} agora é o dono do mundo.` }); }
    else if (pending.size) { const first = [...pending.values()][0]; approve(first); return; }
  }
  if (hostId !== null) for (const pend of pending.values()) askHost(pend);
}

// ---------------- recursos (árvores, pedras...) ----------------
const taken = new Map();   // id -> quando volta
const objHits = new Map(); // id -> golpes
timers.push(setInterval(() => {
  const now = Date.now();
  for (const [id, t] of taken) if (t <= now) { taken.delete(id); broadcast({ t: 'restored', id }); }
  for (const [id, h] of objHits) if (h.t < now - 30000) objHits.delete(id);
}, 4000));

function nearbyObjects(x, z, r) {
  const out = [];
  const cx = Math.floor(x / CHUNK), cz = Math.floor(z / CHUNK);
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const o of world.chunkObjects(cx + i, cz + j)) {
    if (!o.res || taken.has(o.id)) continue;
    if (Math.hypot(o.x - x, o.z - z) <= r) out.push(o);
  }
  return out;
}

// ---------------- animais ----------------
const animals = new Map();
let nextAnimal = 1;
const rnd = Math.random;
function dayPhase() { return ((Date.now() - epoch) / DAY_MS) % 1; }
const isNight = () => { const p = dayPhase(); return p > 0.55 && p < 0.95; };

function canStand(sp, h) {
  if (sp.medium === 'terra') return h > -0.5;
  if (sp.medium === 'anfibio') return h > -3.2;
  return WATER - h >= sp.minDepth;
}
function animalY(sp, h) {
  if (sp.medium === 'terra') return Math.max(h, -0.4);
  if (sp.medium === 'anfibio') return Math.max(h, WATER - 0.55);
  return Math.min(WATER - 0.5, Math.max(h + 0.8, WATER - 2.4));
}
function spawnAnimal(sid, x, z) {
  const sp = SPECIES[sid];
  const h = world.heightAt(x, z);
  if (!canStand(sp, h)) return null;
  const a = { id: nextAnimal++, sid, sp, x, z, y: animalY(sp, h), hd: rnd() * 6.28, state: 0, hp: sp.hp, tmr: rnd() * 3, cd: 0, target: null, angry: null, angryT: 0, wd: rnd() * 6.28, moving: false, atkT: 0 };
  animals.set(a.id, a);
  return a;
}
function pickSpecies(b, night) {
  let tot = 0; const opts = [];
  for (const id of SPECIES_IDS) { let w = SPECIES[id].biomes[b] || 0; if (w && night && SPECIES[id].kind === 'agressivo') w *= 1.8; if (w) { opts.push([id, w]); tot += w; } }
  if (!tot) return null;
  let r = rnd() * tot;
  for (const [id, w] of opts) { r -= w; if (r <= 0) return id; }
  return opts[0][0];
}
function spawnTick() {
  if (animals.size > 350) return;
  const night = isNight();
  for (const pl of players.values()) {
    if (pl.dead) continue;
    let near = 0;
    for (const a of animals.values()) if (Math.abs(a.x - pl.x) < 120 && Math.abs(a.z - pl.z) < 120) near++;
    if (near >= 26) continue;
    for (let k = 0; k < 3; k++) {
      const ang = rnd() * 6.283, d = 45 + rnd() * 70;
      const x = pl.x + Math.cos(ang) * d, z = pl.z + Math.sin(ang) * d;
      const s = world.sample(x, z);
      const sid = pickSpecies(s.b, night); if (!sid) continue;
      const sp = SPECIES[sid];
      const n = sp.pack ? sp.pack[0] + Math.floor(rnd() * (sp.pack[1] - sp.pack[0] + 1)) : (sp.medium === 'agua' && sid === 'peixe' ? 3 : 1);
      for (let i = 0; i < n; i++) spawnAnimal(sid, x + (rnd() - 0.5) * 6, z + (rnd() - 0.5) * 6);
    }
  }
  for (const a of animals.values()) {
    let close = false;
    for (const pl of players.values()) if (Math.abs(a.x - pl.x) < 190 && Math.abs(a.z - pl.z) < 190) { close = true; break; }
    if (!close) animals.delete(a.id);
  }
}
const tmp = {};
function moveAnimal(a, dx, dz) {
  const sp = a.sp;
  let nx = a.x + dx, nz = a.z + dz;
  const s = world.sample(nx, nz);
  if (!canStand(sp, s.h) || (sp.medium === 'terra' && Math.abs(s.h - a.y) > 2.2 && s.h > a.y)) return false;
  index.resolve(nx, nz, s.h, sp.r * 0.8, 1.0, tmp);
  nx = tmp.x; nz = tmp.z;
  const s2 = nx === a.x + dx && nz === a.z + dz ? s : world.sample(nx, nz);
  if (!canStand(sp, s2.h)) return false;
  a.x = nx; a.z = nz; a.y += (animalY(sp, s2.h) - a.y) * 0.4;
  return !tmp.hit;
}
function reachable(a, pl) {
  const h = world.heightAt(pl.x, pl.z);
  const inWater = h < -1.1 && pl.y < WATER + 0.4;
  if (a.sp.medium === 'terra') return !inWater;
  if (a.sp.medium === 'agua') return inWater || Math.abs(pl.y - a.y) < 2.5;
  return true;
}
function turnTo(a, want, dt, rate = 6) {
  let d = want - a.hd; d = Math.atan2(Math.sin(d), Math.cos(d));
  a.hd += Math.max(-rate * dt, Math.min(rate * dt, d));
}
function animalTick(a, dt) {
  const sp = a.sp;
  a.cd -= dt; a.tmr -= dt; a.atkT -= dt;
  if (a.angryT > 0) a.angryT -= dt; else a.angry = null;
  // escolher alvo / ameaça
  let tgt = null, td = Infinity;
  for (const pl of players.values()) {
    if (pl.dead) continue;
    const d = Math.hypot(pl.x - a.x, pl.z - a.z);
    if (d < td) { td = d; tgt = pl; }
  }
  let mode = 'wander';
  const sightMul = isNight() && sp.kind === 'agressivo' ? 1.25 : 1;
  if (sp.kind === 'agressivo' && tgt && td < sp.sight * sightMul && reachable(a, tgt)) mode = 'chase';
  else if (sp.kind === 'agressivo' && a.target && players.get(a.target) && !players.get(a.target).dead && td < sp.sight * 1.8) { tgt = players.get(a.target); td = Math.hypot(tgt.x - a.x, tgt.z - a.z); if (reachable(a, tgt)) mode = 'chase'; }
  if (sp.kind === 'neutro' && a.angry) { const t = players.get(a.angry); if (t && !t.dead) { tgt = t; td = Math.hypot(t.x - a.x, t.z - a.z); if (td < 40 && reachable(a, t)) mode = 'chase'; } }
  if (sp.kind === 'passivo' && tgt && (td < sp.sight * 0.6 || (a.angry && td < sp.sight * 1.5))) mode = 'flee';
  if (mode === 'chase') {
    if (a.target !== tgt.id) { a.target = tgt.id; if (sp.pack) for (const o of animals.values()) if (o.sid === a.sid && o !== a && Math.hypot(o.x - a.x, o.z - a.z) < 30) o.target = tgt.id; }
    const want = Math.atan2(tgt.z - a.z, tgt.x - a.x);
    turnTo(a, want, dt, 9);
    if (td > sp.atkRange * 0.8) {
      const sp2 = sp.run * dt;
      if (!moveAnimal(a, Math.cos(a.hd) * sp2, Math.sin(a.hd) * sp2)) moveAnimal(a, Math.cos(a.hd + 0.9) * sp2, Math.sin(a.hd + 0.9) * sp2);
      a.state = 2;
    }
    if (td <= sp.atkRange && Math.abs(tgt.y - a.y) < 3 && a.cd <= 0) {
      a.cd = sp.cd; a.atkT = 0.45; a.state = 3;
      hurtPlayer(tgt, sp.dmg * (0.8 + rnd() * 0.4), sp.nome);
    }
    if (a.atkT > 0) a.state = 3;
  } else if (mode === 'flee') {
    const want = Math.atan2(a.z - tgt.z, a.x - tgt.x);
    turnTo(a, want, dt, 8);
    const sp2 = sp.run * dt;
    if (!moveAnimal(a, Math.cos(a.hd) * sp2, Math.sin(a.hd) * sp2)) a.hd += 1.2;
    a.state = 4;
  } else {
    a.target = null;
    if (a.tmr <= 0) { a.moving = rnd() < 0.55; a.wd = a.hd + (rnd() - 0.5) * 2.4; a.tmr = 2 + rnd() * 5; }
    if (a.moving) {
      turnTo(a, a.wd, dt, 2.5);
      const sp2 = sp.walk * dt;
      if (!moveAnimal(a, Math.cos(a.hd) * sp2, Math.sin(a.hd) * sp2)) { a.wd = a.hd + 1.5 + rnd(); a.tmr = Math.min(a.tmr, 0.6); }
      a.state = 1;
    } else a.state = 0;
  }
}

// ---------------- vida / fome / combate ----------------
function hurtPlayer(pl, dmg, by) {
  if (pl.dead || (Date.now() < pl.safe && by !== 'a fome')) return; // proteção ao nascer
  pl.hp = Math.max(0, pl.hp - dmg);
  sendTo(pl, { t: 'hp', hp: Math.round(pl.hp), hunger: Math.round(pl.hunger), hit: true, by });
  if (pl.hp <= 0) {
    pl.dead = true; pl.st |= 8;
    sendTo(pl, { t: 'dead', by });
    broadcast({ t: 'chat', sys: true, text: `${pl.name} foi derrotado por ${by}.` });
    setTimeout(() => {
      if (!players.has(pl.id)) return;
      const st = store[pl.name]; let sp = world.findSpawn(); let pos = { x: sp.x, y: sp.y, z: sp.z };
      const bed = st && st.bed && index.byId.get(st.bed.id);
      if (bed) pos = { x: bed.x + 1.4, y: bed.y + 0.1, z: bed.z };
      pl.dead = false; pl.safe = Date.now() + 20000; pl.hp = 100; pl.hunger = 60; pl.st &= ~8; pl.x = pos.x; pl.y = pos.y; pl.z = pos.z;
      sendTo(pl, { t: 'respawn', pos, hp: 100, hunger: 60 });
    }, 4500);
  }
}
timers.push(setInterval(() => {
  for (const pl of players.values()) {
    if (pl.dead) continue;
    pl.hunger = Math.max(0, pl.hunger - 1);
    if (pl.hunger <= 0) hurtPlayer(pl, 3, 'a fome');
    else if (pl.hp < 100 && pl.hunger > 40) pl.hp = Math.min(100, pl.hp + 2);
    if (!pl.dead) sendTo(pl, { t: 'hp', hp: Math.round(pl.hp), hunger: Math.round(pl.hunger) });
  }
}, 5000));

function swing(pl, dx, dz) {
  const now = Date.now();
  if (pl.dead || now < pl.swingCd) return;
  pl.swingCd = now + 420;
  const len = Math.hypot(dx, dz) || 1; dx /= len; dz /= len;
  const spear = pl.weapon === 'lanca';
  const reach = spear ? 3.8 : 2.8, dmg = spear ? 24 : 9;
  broadcast({ t: 'swing', id: pl.id, dx, dz }, pl.id);
  let best = null, bd = Infinity;
  for (const a of animals.values()) {
    const vx = a.x - pl.x, vz = a.z - pl.z, d = Math.hypot(vx, vz);
    if (d > reach + a.sp.r || Math.abs(a.y - pl.y) > 3.2) continue;
    if ((vx * dx + vz * dz) / (d || 1) < 0.45 && d > a.sp.r + 0.6) continue;
    if (d < bd) { bd = d; best = a; }
  }
  if (best) {
    const a = best; a.hp -= dmg * (0.85 + rnd() * 0.3);
    a.angry = pl.id; a.angryT = 20;
    if (a.sp.kind !== 'passivo') a.target = pl.id;
    broadcast({ t: 'animalHit', id: a.id, x: a.x, y: a.y + 0.6, z: a.z });
    if (a.hp <= 0) {
      animals.delete(a.id);
      if (a.sp.meat) { pl.inv.carne += a.sp.meat; sendTo(pl, { t: 'inv', inv: pl.inv }); sendTo(pl, { t: 'toast', text: `+${a.sp.meat} carne (${a.sp.nome})` }); }
      broadcast({ t: 'animalDie', id: a.id, x: a.x, y: a.y, z: a.z });
      dirty = true;
    }
    return;
  }
  // sem animal: tenta coletar um recurso na frente
  let obj = null, od = Infinity;
  for (const o of nearbyObjects(pl.x, pl.z, reach + 1.2)) {
    const vx = o.x - pl.x, vz = o.z - pl.z, d = Math.hypot(vx, vz);
    if ((vx * dx + vz * dz) / (d || 1) < 0.5 && d > 1.2) continue;
    if (Math.abs(o.y - pl.y) > 3.5) continue;
    if (d < od) { od = d; obj = o; }
  }
  if (!obj) return;
  const [rec, mn, mx, need] = obj.res;
  const h = objHits.get(obj.id) || { n: 0, t: 0 };
  h.n++; h.t = now; objHits.set(obj.id, h);
  broadcast({ t: 'objHit', id: obj.id, x: obj.x, y: obj.y + 1, z: obj.z, k: obj.t, v: obj.v });
  if (h.n >= need) {
    objHits.delete(obj.id);
    const amt = mn + Math.floor(rnd() * (mx - mn + 1));
    pl.inv[rec] += amt;
    taken.set(obj.id, now + RESPAWN_MS);
    sendTo(pl, { t: 'inv', inv: pl.inv });
    sendTo(pl, { t: 'toast', text: `+${amt} ${rec}` });
    broadcast({ t: 'taken', id: obj.id, dx, dz });
    dirty = true;
  }
}

// ---------------- mensagens dos clientes ----------------
const near = (pl, x, z, d) => Math.hypot(pl.x - x, pl.z - z) <= d;
function onMessage(conn, m) {
  if (m.t === 'join') {
    if (conn.joined) return; conn.joined = true;
    const name = cleanName(m.name) || 'Viajante';
    if (players.size >= MAX_PLAYERS) { send(conn, { t: 'denied', reason: 'O mundo está cheio.' }); return; }
    const pend = { id: nextId++, conn, name, timer: null };
    pending.set(pend.id, pend);
    if (hostId === null || players.size === 0) { hostId = null; approve(pend); return; }
    send(conn, { t: 'wait', host: players.get(hostId)?.name });
    pend.timer = setTimeout(() => { pending.delete(pend.id); send(conn, { t: 'denied', reason: 'O dono não respondeu a tempo.' }); }, 60000);
    askHost(pend);
    return;
  }
  const pl = conn.player; if (!pl || !players.has(pl.id)) return;
  switch (m.t) {
    case 'decide': {
      if (pl.id !== hostId) return;
      const pend = pending.get(m.id); if (!pend) return;
      if (m.ok) approve(pend);
      else { clearTimeout(pend.timer); pending.delete(m.id); send(pend.conn, { t: 'denied', reason: `${pl.name} não permitiu a sua entrada.` }); }
      break;
    }
    case 'move': {
      if (pl.dead) break;
      const x = +m.x, y = +m.y, z = +m.z;
      if (![x, y, z].every(Number.isFinite)) break;
      if (!DEV && Math.hypot(x - pl.x, z - pl.z) > 40) { sendTo(pl, { t: 'respawn', pos: { x: pl.x, y: pl.y, z: pl.z }, hp: pl.hp, hunger: pl.hunger, tp: true }); break; }
      pl.x = x; pl.y = y; pl.z = z; pl.ry = +m.ry || 0; pl.st = (m.st | 0) & 7;
      break;
    }
    case 'dev': if (DEV) { if (m.give) for (const k in m.give) pl.inv[k] = (pl.inv[k] || 0) + m.give[k]; if (m.spawn && SPECIES[m.spawn]) spawnAnimal(m.spawn, pl.x + (+m.dx || 0), pl.z + (+m.dz || 0)); if (m.passive) for (const a of animals.values()) a.sp = { ...a.sp, sight: 0 }; sendTo(pl, { t: 'inv', inv: pl.inv }); } break;
    case 'swing': swing(pl, +m.dx || 0, +m.dz || 0); break;
    case 'place': {
      const d = PIECES[m.k]; if (!d || pl.dead) break;
      const mat = MATS.includes(m.m) ? m.m : 'madeira';
      const x = +m.x, y = +m.y, z = +m.z, ry = +m.ry;
      if (![x, y, z, ry].every(Number.isFinite) || !near(pl, x, z, 16) || Math.abs(y - pl.y) > 14) break;
      const sn = snapPiece(m.k, x, z, 0);
      if (Math.abs(sn.x - x) > 2.01 && d.snap !== 'free') break;
      const p = { id: nextPieceId, k: m.k, x, y, z, ry, m: mat, o: pl.name, open: false };
      if (index.has(p) || index.byId.size > 6000) break;
      const cost = pieceCost(m.k, mat);
      if (Object.entries(cost).some(([r, n]) => (pl.inv[r] || 0) < n)) { sendTo(pl, { t: 'toast', text: 'Faltam recursos.' }); break; }
      for (const [r, n] of Object.entries(cost)) pl.inv[r] -= n;
      nextPieceId++; index.add(p); dirty = true;
      sendTo(pl, { t: 'inv', inv: pl.inv });
      broadcast({ t: 'pieceAdd', p });
      break;
    }
    case 'remove': {
      const p = index.byId.get(m.id); if (!p || !near(pl, p.x, p.z, 18)) break;
      if (p.o !== pl.name && pl.id !== hostId) { sendTo(pl, { t: 'toast', text: 'Só o dono da peça ou do mundo pode remover.' }); break; }
      index.remove(p.id); dirty = true;
      const cost = pieceCost(p.k, p.m);
      for (const [r, n] of Object.entries(cost)) pl.inv[r] += Math.floor(n / 2);
      sendTo(pl, { t: 'inv', inv: pl.inv });
      broadcast({ t: 'pieceRemove', id: p.id });
      break;
    }
    case 'door': {
      const p = index.byId.get(m.id); if (!p || p.k !== 'porta' || !near(pl, p.x, p.z, 6)) break;
      index.remove(p.id); p.open = !p.open; index.add(p); dirty = true;
      broadcast({ t: 'door', id: p.id, open: p.open });
      break;
    }
    case 'cook': {
      let ok = false;
      for (const p of index.near(pl.x, pl.z, 5)) if (p.k === 'fogueira' && near(pl, p.x, p.z, 4)) ok = true;
      if (!ok) { sendTo(pl, { t: 'toast', text: 'Chegue perto de uma fogueira para assar.' }); break; }
      if (pl.inv.carne < 1) { sendTo(pl, { t: 'toast', text: 'Você não tem carne crua.' }); break; }
      pl.inv.carne--; pl.inv.assada++; dirty = true;
      sendTo(pl, { t: 'inv', inv: pl.inv }); sendTo(pl, { t: 'toast', text: 'Carne assada!' });
      break;
    }
    case 'eat': {
      if (pl.dead) break;
      if (pl.inv.assada > 0) { pl.inv.assada--; pl.hunger = Math.min(100, pl.hunger + 40); pl.hp = Math.min(100, pl.hp + 12); }
      else if (pl.inv.carne > 0) { pl.inv.carne--; pl.hunger = Math.min(100, pl.hunger + 16); if (rnd() < 0.3) hurtPlayer(pl, 8, 'carne crua'); }
      else { sendTo(pl, { t: 'toast', text: 'Sem comida.' }); break; }
      dirty = true;
      sendTo(pl, { t: 'inv', inv: pl.inv }); sendTo(pl, { t: 'hp', hp: Math.round(pl.hp), hunger: Math.round(pl.hunger) });
      break;
    }
    case 'sleep': {
      const p = index.byId.get(m.id); if (!p || p.k !== 'cama' || !near(pl, p.x, p.z, 5)) break;
      store[pl.name].bed = { id: p.id, x: p.x, y: p.y, z: p.z }; dirty = true;
      sendTo(pl, { t: 'toast', text: 'Cama definida como ponto de renascimento.' });
      break;
    }
    case 'craft': {
      if (pl.weapon === 'lanca') { sendTo(pl, { t: 'toast', text: 'Você já tem uma lança.' }); break; }
      if (pl.inv.madeira < 3 || pl.inv.pedra < 2) { sendTo(pl, { t: 'toast', text: 'Lança: 3 madeira + 2 pedra.' }); break; }
      pl.inv.madeira -= 3; pl.inv.pedra -= 2; pl.weapon = 'lanca'; store[pl.name].weapon = 'lanca'; dirty = true;
      sendTo(pl, { t: 'inv', inv: pl.inv, weapon: pl.weapon }); sendTo(pl, { t: 'toast', text: 'Você fez uma lança!' });
      broadcast({ t: 'weapon', id: pl.id, weapon: 'lanca' }, pl.id);
      break;
    }
    case 'chat': {
      const now = Date.now(); if (now - pl.lastMsg < 600) break; pl.lastMsg = now;
      const text = String(m.text || '').slice(0, 140).trim(); if (!text) break;
      broadcast({ t: 'chat', name: pl.name, text });
      break;
    }
  }
}
// ---------------- laço principal ----------------
let tick = 0, last = Date.now();
timers.push(setInterval(() => {
  const now = Date.now(); const dt = Math.min(0.1, (now - last) / 1000); last = now; tick++;
  if (!players.size) return;
  for (const a of animals.values()) animalTick(a, dt);
  if (tick % 20 === 0) spawnTick();
  // jogadores (15 Hz)
  if (tick % 3 === 0) {
    const list = [...players.values()].map((p) => [p.id, +p.x.toFixed(2), +p.y.toFixed(2), +p.z.toFixed(2), +p.ry.toFixed(2), p.st]);
    const msg = { t: 'pl', l: list };
    for (const p of players.values()) p.conn.send(msg);
  }
  // animais (10 Hz, só os próximos de cada jogador)
  if (tick % 2 === 0) {
    for (const pl of players.values()) {
      const l = [];
      for (const a of animals.values()) {
        if (Math.abs(a.x - pl.x) > 150 || Math.abs(a.z - pl.z) > 150) continue;
        l.push([a.id, SPECIES_IDS.indexOf(a.sid), +a.x.toFixed(2), +a.y.toFixed(2), +a.z.toFixed(2), +a.hd.toFixed(2), a.state, Math.round((a.hp / a.sp.hp) * 100)]);
      }
      sendTo(pl, { t: 'an', l });
    }
  }
}, 50));

function snapshot() { return { seed, phase: ((Date.now() - epoch) / DAY_MS) % 1, pieces: [...index.byId.values()], players: store }; }
return { world, seed, onMessage, removePlayer, snapshot, DAY_MS, epoch, get dirty() { return dirty; }, set dirty(v) { dirty = v; }, stop() { timers.forEach(clearInterval); } };
}
