import * as THREE from 'three';
import { World, EDGE, WATER_Z, BEACH_Z, MX, MZ, isSpace, AX } from './world.js';
import { ITEMS, SLOT_NAMES, registerUniforms, uniformId } from './outfits.js';
import { LEVELS, STAT_JOB, PERKS, levelOf, progressInfo } from './levels.js';
import { Character, HATS, SKINS, makeHat } from './character.js';
import { Player } from './player.js';
import { Props, PTYPES, makePropMesh } from './props.js';
import { Vehicle, VTYPES, CAR_COLORS, collideVehicles, TrafficAI } from './vehicles.js';
import { Pedestrians } from './npc.js';
import { JobManager, JOBS } from './jobs.js';
import { Input } from './input.js';
import { Sfx } from './audio.js';
import { Net } from './net.js';
import { clamp, angLerp, mulberry32, dist2, wrapAngle, canvasTexture } from './util.js';

// Aviso anônimo para a medição do queres.games (nunca dá erro; sem o site, não faz nada). Ver CLAUDE.md.
const evento = (nome, dados) => { try { if (window.QG && window.QG.evento) window.QG.evento(nome, dados); } catch (e) { /* medição nunca atrapalha o jogo */ } };

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const mobile = matchMedia('(pointer: coarse)').matches;
registerUniforms(JOBS);

// ---------------- Save data ----------------
const SAVE_KEY = 'bentocity_save_v1';
const defaultSave = () => ({
  name: '', money: 150, look: { shirt: 0x1e88e5, pants: 0x37474f, skin: 0xffdbac, hat: 'none', hatColor: 0xe53935 },
  hats: ['none'], vehicles: [], stats: {}, jobXP: null, gifts: [], items: [], stars: 0, fav: null, favSpace: null, spaceUnlocked: false,
});
let save = defaultSave();
try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s) save = { ...save, ...s, look: { ...save.look, ...s.look } }; } catch (e) { /* no storage */ }
// Career XP: earlier work (from stats) counts the first time
if (save.created === undefined) save.created = !!save.name;
if (!save.jobXP) { save.jobXP = {}; for (const [k, j] of Object.entries(STAT_JOB)) if (save.stats[k]) save.jobXP[j] = save.stats[k]; }
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* ignore */ } }

// ---------------- Three setup ----------------
const canvas = $('#game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.25 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 1400);
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });

const world = new World(scene, 1337);
const input = new Input(canvas);
const sfx = new Sfx();
const net = new Net();
const props = new Props(scene, world);
const peds = new Pedestrians(scene, world, mobile ? 26 : 45);
const vehicles = [];
const netVehicles = new Map();
const remotes = new Map();

const playerChar = new Character(save.look);
scene.add(playerChar.root);
const player = new Player(playerChar);
const home = world.locations.home.zone;
player.pos.set(home.x, 0.2, home.z + 3.5);
player.ry = 0;

const G = {
  scene, world, props, peds, player, vehicles, sfx, input, camPitch: 0.3,
  jobVehicle: null,
  toast, pay,
  stats: (k) => {
    save.stats[k] = (save.stats[k] || 0) + 1;
    const job = STAT_JOB[k];
    if (job) {
      const before = levelOf(save.jobXP[job] || 0);
      save.jobXP[job] = (save.jobXP[job] || 0) + 1;
      const after = levelOf(save.jobXP[job]);
      if (after > before) promote(job, after);
    }
    persist();
  },
  jobLevel: (k) => levelOf(save.jobXP[k] || 0),
  celebrate: () => { confetti(); sfx.fanfare(); },
  onJobEnd: () => refreshJobGear(),
  spawnJobVehicle,
  spawnVehicle: (...a) => spawnVehicle(...a), removeVehicle: (v) => removeVehicle(v),
  payStars: (n, reason) => { servicoConcluido(); save.stars += n; persist(); toast(`+${n} ⭐  ${reason || ''}`, 'money'); sfx.coin(); },
  onJobStart: () => { refreshJobGear(); setTimeout(() => callFavorite(true), 300); },
  finishSpaceMission: () => {
    save.spaceUnlocked = true; persist(); jobs.quit(true);
    toast('Foguete abastecido! 🚀 Vá até o ponto da Missão Espacial para decolar.'); sfx.success();
  },
};
const jobs = new JobManager(G);
G.jobs = jobs;

// ---------------- Vehicles ----------------
let netCounter = 0;
const newNetId = () => (net.connected ? net.id : 'L') + '-' + (++netCounter);

function spawnVehicle(type, x, z, ry, opts = {}) {
  const v = new Vehicle(type, scene, { x, z, ry, y: world.groundAt(x, z, 2), ...opts });
  v.onCrash = (p) => {
    if (dist2(v.pos.x, v.pos.z, player.pos.x, player.pos.z) < 40) sfx.crash(p);
    if (v.def.air && v.driver === 'local' && p >= 30) { shake = 1; const vx = v.vel.x, vz = v.vel.z; exitVehicle(); player.knock(vx * 0.3, 8, vz * 0.3, 12); toast('💥 Você caiu! Cuidado na pilotagem.'); }
  };
  v.onHorn = () => { if (dist2(v.pos.x, v.pos.z, player.pos.x, player.pos.z) < 50) sfx.horn(); };
  v.onLand = (p) => { if (v.driver === 'local') { sfx.crash(p * 0.5); shake = Math.min(1, p * 0.04); } };
  vehicles.push(v);
  if (v.netId) netVehicles.set(v.netId, v);
  return v;
}
function removeVehicle(v) {
  if (player.vehicle === v) exitVehicle();
  v.dispose();
  const i = vehicles.indexOf(v); if (i >= 0) vehicles.splice(i, 1);
  if (v.netId) { netVehicles.delete(v.netId); if (net.connected && v.owner === net.id) net.send({ t: 'vdel', n: v.netId }); }
}
function freeSpot(x, z, ry) {
  for (let k = 0; k < 8; k++) {
    const ox = x + Math.sin(ry) * k * 7, oz = z + Math.cos(ry) * k * 7;
    if (!vehicles.some((o) => dist2(o.pos.x, o.pos.z, ox, oz) < 5.5)) return { x: ox, z: oz };
  }
  return { x, z };
}
function spawnJobVehicle(type, spawn) {
  if (G.jobVehicle && vehicles.includes(G.jobVehicle)) removeVehicle(G.jobVehicle);
  const s = freeSpot(spawn.x, spawn.z, spawn.ry);
  const v = spawnVehicle(type, s.x, s.z, spawn.ry, { netId: newNetId(), owner: net.id || 'me', tag: 'job' });
  G.jobVehicle = v;
  return v;
}

// Parked cars (deterministic so every online player sees the same ones)
{
  const r = mulberry32(777), types = ['sedan', 'hatch', 'pickup', 'sedan', 'sport', 'hatch', 'police', 'scooter'];
  world.parking.forEach((p, i) => {
    const t = types[Math.floor(r() * types.length)];
    spawnVehicle(t, p.x, p.z, p.ry, { netId: 'p' + i, color: CAR_COLORS[Math.floor(r() * CAR_COLORS.length)] });
  });
  const st = world.locations.stunt;
  spawnVehicle('monster', st.x - 18, st.z + 2, Math.PI / 2, { netId: 'pm1', color: 0x7cb342 });
  spawnVehicle('sport', st.x + 18, st.z + 2, -Math.PI / 2, { netId: 'pm2', color: 0xff1744 });
  spawnVehicle('jetski', 105, WATER_Z + 10, Math.PI, { netId: 'pj1' });
  spawnVehicle('jetski', 135, WATER_Z + 10, Math.PI, { netId: 'pj2', color: 0x00e5ff });
  const h = world.locations.home;
  spawnVehicle('hatch', h.x - 12, h.z + 18, Math.PI / 2, { netId: 'ph1', color: 0xff8a65 });
}
// Aircraft parked at the airport (free to fly, like parked cars)
{
  const kinds = ['cessna', 'biplane', 'jet', 'cessna', 'biplane'];
  world.planeSpots.forEach((sp, i) => spawnVehicle(kinds[i], sp.x, sp.z, sp.ry, { netId: 'pa' + i, color: [0xffffff, 0xe53935, 0x90a4ae, 0x43a047, 0x1e88e5][i] }));
  const hb = world.locations.heliBase;
  spawnVehicle('heli', hb.x - 18, hb.z + 12, -Math.PI / 2, { netId: 'pah' });
  spawnVehicle('seaplane', 140, WATER_Z + 25, Math.PI / 2, { netId: 'pas' });
  const hp = world.locations.helipad;
  const hv = spawnVehicle('heli', hp.x, hp.z, Math.PI, { netId: 'pah2', color: 0xffffff }); hv.y = hp.y;
}
// Ambient planes circling the sky
const skyPlanes = [['cessna', 260, 130, 0.09], ['jet', 520, 210, 0.07], ['biplane', 180, 95, -0.12], ['cargo', 420, 170, -0.05]].map(([t, r, h, w], i) => {
  const v = new Vehicle(t, scene, { color: [0xffffff, 0xb0bec5, 0xffb300, 0xeceff1][i] });
  return { v, r, h, w, a: i * 1.7 };
});
function updateSkyPlanes(dt) {
  for (const s of skyPlanes) {
    s.a += s.w * dt;
    const v = s.v;
    v.pos.set(Math.cos(s.a) * s.r, 0, Math.sin(s.a) * s.r); v.y = s.h + Math.sin(s.a * 3) * 6;
    v.ry = Math.atan2(-Math.sin(s.a) * Math.sign(s.w), Math.cos(s.a) * Math.sign(s.w));
    v.roll = 0.35 * Math.sign(s.w); v.pitch = 0; v.prop = (v.prop || 0) + dt * 50; v.throttle = 0.8;
    v.syncMesh();
  }
}
// Traffic
{
  const types = ['sedan', 'hatch', 'taxi', 'pickup', 'sedan', 'bus', 'hatch', 'van', 'police', 'sport'];
  const n = mobile ? 14 : 24;
  for (let i = 0; i < n; i++) {
    const v = spawnVehicle(types[i % types.length], 0, 0, 0);
    TrafficAI.spawn(v);
    v.y = 0.05;
  }
}
// Owned vehicles get spawned on demand from the garage menu

// Fun physics props around the city
{
  const r = mulberry32(4242);
  const pl = world.locations.spawn;
  for (let i = 0; i < 6; i++) props.spawn('ball', pl.x - 15 + i * 6, 2, pl.z + 6);
  for (let i = 0; i < 60; i++) {
    const p = world.randomSidewalk(r);
    const t = ['box', 'cone', 'barrel', 'crate', 'melon', 'cone', 'box'][Math.floor(r() * 7)];
    props.spawn(t, p.x, 1.5, p.z);
  }
  for (let i = 0; i < 10; i++) props.spawn('ball', -200 + i * 40, 1, BEACH_Z + 30);
  const st = world.locations.stunt;
  for (let k = 0; k < 10; k++) props.spawn('cone', st.x - 10 + k * 2.2, 1, st.z + 6);
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3 - a; b++) props.spawn('crate', st.x + 6 + b * 1.05 + a * 0.5, 0.7 + a * 1.02, st.z + 20);
}

// Moon residents
for (let i = 0; i < 8; i++) {
  const h = world.moonHouses[i];
  const n = peds.spawnStatic(h.x + 2, h.z + 1, { shirt: 0xf5f5f5, pants: 0xeeeeee, skin: [0xffdbac, 0x76ff03, 0xc68642][i % 3], hat: 'spacehelmet', suit: i % 3 === 1 ? 'alien' : 'astronaut' });
  n.wave = i % 2 === 0;
}

// ---------------- Gifts (collectibles) ----------------
const giftMeshes = [];
{
  const box = new THREE.BoxGeometry(0.8, 0.8, 0.8), rib = new THREE.BoxGeometry(0.84, 0.84, 0.18);
  const ribX = new THREE.BoxGeometry(0.18, 0.84, 0.84);
  world.gifts.forEach((p, i) => {
    if (save.gifts.includes(i)) return;
    const g = new THREE.Group();
    const col = new THREE.Color().setHSL(i * 0.137 % 1, 0.8, 0.55);
    g.add(new THREE.Mesh(box, new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.3 })));
    const rm = new THREE.MeshStandardMaterial({ color: 0xfff176 });
    g.add(new THREE.Mesh(rib, rm), new THREE.Mesh(ribX, rm));
    g.position.set(p.x, world.groundAt(p.x, p.z, 50) + 1, p.z);
    g.userData.i = i;
    scene.add(g); giftMeshes.push(g);
  });
}

// ---------------- Stations (job places, shop, dealer, home) ----------------
const stations = [];
function labelSprite(text, bg = '#ff7043') {
  const tex = canvasTexture(512, 128, (g) => {
    g.font = 'bold 54px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
    const w = Math.min(500, g.measureText(text).width + 50);
    g.fillStyle = bg; g.beginPath(); g.roundRect(256 - w / 2, 14, w, 100, 40); g.fill();
    g.fillStyle = '#fff'; g.fillText(text, 256, 66);
  }, THREE);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  s.scale.set(5.6, 1.4, 1);
  return s;
}
for (const [key, j] of Object.entries(JOBS)) if (!j.hidden) stations.push({ kind: 'job', job: key, loc: world.locations[j.place], label: `${j.icon} ${j.name}`, color: j.space ? '#3949ab' : '#ff7043' });
stations.push({ kind: 'shop', loc: world.locations.shop, label: '👕 Loja de Roupas', color: '#8e24aa' });
stations.push({ kind: 'spaceshop', loc: world.locations.spaceshop, label: '🪐 Loja Espacial', color: '#6a1b9a' });
stations.push({ kind: 'rocket', loc: world.locations.rocket, label: '🚀 Missão Espacial', color: '#0d47a1' });
stations.push({ kind: 'return', loc: world.locations.moonReturn, label: '🌍 Voltar para a Terra', color: '#0d47a1' });
stations.push({ kind: 'dealer', loc: world.locations.dealer, label: '🚗 Concessionária', color: '#263238' });
stations.push({ kind: 'hangar', loc: world.locations.hangar, label: '✈️ Hangar (comprar aviões)', color: '#00695c' });
stations.push({ kind: 'home', loc: world.locations.home, label: '🏠 Minha Casa', color: '#6d4c41' });
for (const s of stations) {
  const z = s.loc.zone;
  const ring = new THREE.Mesh(new THREE.RingGeometry(2.4, 3, 40), new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.9, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.set(z.x, 0.2, z.z); scene.add(ring);
  const disk = new THREE.Mesh(new THREE.CircleGeometry(2.4, 40), new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.25 }));
  disk.rotation.x = -Math.PI / 2; disk.position.set(z.x, 0.19, z.z); scene.add(disk);
  const lab = labelSprite(s.label, s.color); lab.position.set(z.x, 5, z.z); scene.add(lab);
  s.sprite = lab;
}

// ---------------- Water hose particles ----------------
const MAXP = 300;
const waterGeo = new THREE.BufferGeometry();
const wpos = new Float32Array(MAXP * 3);
waterGeo.setAttribute('position', new THREE.BufferAttribute(wpos, 3));
const water = new THREE.Points(waterGeo, new THREE.PointsMaterial({ color: 0x80d8ff, size: 0.35, transparent: true, opacity: 0.85 }));
water.frustumCulled = false; scene.add(water);
const wp = Array.from({ length: MAXP }, () => ({ x: 0, y: -100, z: 0, vx: 0, vy: 0, vz: 0, life: 0 }));
let wpi = 0;

// ---------------- Headlight for driven vehicle ----------------
const headlight = new THREE.SpotLight(0xfff2cc, 0, 60, 0.6, 0.5, 1.2);
scene.add(headlight, headlight.target);

// ---------------- Camera ----------------
let camYaw = 0, camPitch = 0.3, camDist = 7, shake = 0, lastMouse = 0;
const camTarget = new THREE.Vector3();
const _v1 = new THREE.Vector3(), _v2 = new THREE.Vector3();

function updateCamera(dt) {
  const md = input.mouse;
  const sens = 0.0026;
  if (md.dx || md.dy) lastMouse = performance.now();
  camYaw -= md.dx * sens; camPitch = clamp(camPitch + md.dy * sens, -0.5, 1.25);
  camDist = clamp(camDist + md.wheel * 1.2, 3, 22);
  G.camPitch = camPitch;
  if (shopView && !player.vehicle) {
    const f = player.forward(), fx = f.x, fz = f.z;
    camera.position.lerp(_v1.set(player.pos.x + fx * 3.6, player.pos.y + 1.5, player.pos.z + fz * 3.6), Math.min(1, dt * 6));
    camera.lookAt(player.pos.x + fz * 1.1, player.pos.y + 1.0, player.pos.z - fx * 1.1);
    return;
  }
  const v = player.vehicle;
  let tx, ty, tz, dist = camDist;
  if (v) {
    tx = v.pos.x; ty = v.y + v.def.h * 0.8 + 1; tz = v.pos.z;
    dist = camDist + v.def.len * 0.6;
    if (performance.now() - lastMouse > 1200 && Math.abs(v.speed()) > 2) {
      const want = v.speed() < -1 ? v.ry + Math.PI : v.ry;
      camYaw = angLerp(camYaw, want, Math.min(1, dt * 2.2));
      camPitch += (0.22 - camPitch) * Math.min(1, dt * 1.5);
    }
  } else {
    tx = player.pos.x; ty = player.pos.y + 1.7; tz = player.pos.z;
    if (player.ragdoll) ty -= 0.6;
  }
  camTarget.x += (tx - camTarget.x) * Math.min(1, dt * 14);
  camTarget.y += (ty - camTarget.y) * Math.min(1, dt * 10);
  camTarget.z += (tz - camTarget.z) * Math.min(1, dt * 14);
  if (camTarget.distanceTo(_v1.set(tx, ty, tz)) > 30) camTarget.set(tx, ty, tz);
  const cp = Math.cos(camPitch), sp = Math.sin(camPitch);
  const dx = Math.sin(camYaw) * cp, dy = -sp, dz = Math.cos(camYaw) * cp;
  _v2.set(camTarget.x - dx * dist, camTarget.y - dy * dist, camTarget.z - dz * dist);
  const free = world.segmentFree(camTarget, _v2);
  camera.position.lerpVectors(camTarget, _v2, Math.max(free, 0.12));
  const minY = world.isWater(camera.position.x, camera.position.z) ? -0.1 : world.groundAt(camera.position.x, camera.position.z, camera.position.y) + 0.3;
  if (camera.position.y < minY) camera.position.y = minY;
  if (shake > 0) { camera.position.x += (Math.random() - 0.5) * shake; camera.position.y += (Math.random() - 0.5) * shake; shake = Math.max(0, shake - dt * 2); }
  camera.lookAt(camTarget);
  const spd = v ? Math.abs(v.speed()) : 0;
  const fov = 62 + Math.min(16, spd * 0.3);
  if (Math.abs(camera.fov - fov) > 0.1) { camera.fov += (fov - camera.fov) * Math.min(1, dt * 3); camera.updateProjectionMatrix(); }
}

// ---------------- Enter / exit vehicles ----------------
function nearestVehicle(maxExtra = 1.6) {
  let best = null, bd = 1e9;
  for (const v of vehicles) {
    const lp = v.toLocal(player.pos.x, player.pos.z);
    const ex = Math.max(0, Math.abs(lp.x) - v.def.wid / 2), ez = Math.max(0, Math.abs(lp.z) - v.def.len / 2);
    const d = Math.hypot(ex, ez);
    if (d < maxExtra && d < bd && Math.abs(player.pos.y - v.y) < 3) { bd = d; best = v; }
  }
  return best;
}
function enterVehicle(v) {
  if (v.remote) { toast('Esse veículo está ocupado!'); return; }
  if (v.ai) { // hijack: the driver hops out and falls over
    const p = v.toWorld(v.def.wid / 2 + 1, 0, 0);
    const n = peds.spawnStatic(p.x, p.z); n.static = false; n.wave = false;
    n.cx = Math.round(p.x / 74 + 4.5) * 74 - 333; n.cz = Math.round(p.z / 74 + 4.5) * 74 - 333; n.s = 0; n.dir = 1; n.walkSpeed = 1.5; n.idle = 0;
    n.actor.knock(Math.sin(v.ry + Math.PI / 2) * 4, 4, Math.cos(v.ry + Math.PI / 2) * 4);
    v.ai = null; toast('Você pegou o carro emprestado... 😅');
  }
  if (!v.netId) v.netId = newNetId(), v.owner = net.id || 'me', netVehicles.set(v.netId, v);
  player.vehicle = v; v.driver = 'local'; player.vel.set(0, 0, 0);
  sfx.door();
}
function exitVehicle() {
  const v = player.vehicle; if (!v) return;
  player.vehicle = null; v.driver = null;
  for (const side of [1, -1]) {
    const p = v.toWorld(side * (v.def.wid / 2 + 0.9), 0, 0);
    if (!world.pointBlocked(p.x, v.y + 1, p.z) || side === -1) { player.pos.set(p.x, v.y + 0.3, p.z); break; }
  }
  if (world.isWater(player.pos.x, player.pos.z)) player.pos.y = -0.9;
  player.ry = v.ry; player.vel.set(v.vel.x * 0.5, 2, v.vel.z * 0.5);
  player.char.spin.rotation.set(0, 0, 0);
  sfx.door(); sfx.setEngine(false, 0, 1);
  headlight.intensity = 0;
  if (Math.hypot(v.vel.x, v.vel.z) > 10) player.knock(v.vel.x * 0.6, 4, v.vel.z * 0.6);
}

// ---------------- Money / toasts ----------------
function toast(msg, cls = '') {
  const d = document.createElement('div'); d.className = 'toast ' + cls; d.textContent = msg;
  $('#toasts').appendChild(d);
  setTimeout(() => d.remove(), 3800);
  while ($('#toasts').children.length > (mobile ? 2 : 4)) $('#toasts').firstChild.remove();
}
// Serviço concluído = pagamento de um emprego em andamento (pay e payStars passam por aqui).
function servicoConcluido() {
  const emprego = jobs.current && jobs.current.key;
  if (emprego) evento('servico_concluido', { emprego });
}
// raw = dinheiro que não vem de um serviço (ex.: presentes): sem bônus de nível e sem evento
function pay(amount, reason, raw) {
  const job = jobs.current;
  if (!raw) {
    servicoConcluido();
    if (job && !job.def.hidden) {
      const lvl = levelOf(save.jobXP[job.key] || 0);
      if (lvl > 0) { amount = Math.round(amount * LEVELS[lvl].mult); reason = `${reason || ''} (bônus ${LEVELS[lvl].name})`; }
    }
  }
  save.money += amount; persist();
  toast(`+$${amount}  ${reason || ''}`, 'money');
  sfx.coin();
}

// ---------------- Panels / menus ----------------
let panelOpen = false;
function openPanel(html, onMount, side = false) {
  const keep = $('#panel').classList.contains('hidden') ? 0 : $('.panel-card').scrollTop;
  $('#panel-body').innerHTML = html; $('#panel').classList.remove('hidden');
  $('#panel').classList.toggle('side', side); shopView = side;
  $('.panel-card').scrollTop = keep;
  panelOpen = true; input.enabled = false; document.exitPointerLock?.();
  onMount?.($('#panel-body'));
}
function closePanel() { shopView = false; $('#panel').classList.add('hidden'); $('#bigmap').classList.add('hidden'); panelOpen = false; input.enabled = true; input.keys.clear(); }
$('#panel-close').onclick = closePanel;
$('#map-close').onclick = closePanel;
$('#panel').addEventListener('pointerdown', (e) => { if (e.target.id === 'panel') closePanel(); });

const hex = (c) => '#' + c.toString(16).padStart(6, '0');
function swatchRow(field, colors) {
  return `<div class="swatches">${colors.map((c) => `<div class="sw ${save.look[field] === c ? 'on' : ''}" data-f="${field}" data-c="${c}" style="background:${hex(c)}"></div>`).join('')}</div>`;
}
const CLOTH = [0xe53935, 0xd81b60, 0x8e24aa, 0x3949ab, 0x1e88e5, 0x00acc1, 0x43a047, 0x7cb342, 0xfdd835, 0xfb8c00, 0x6d4c41, 0x212121, 0x9e9e9e, 0xffffff];
let shopView = false;
function itemCard(id, def, slot) {
  const cur = def.cur || '$', owned = slot === 'hat' ? save.hats.includes(id) : (save.items.includes(id) || id === 'none');
  const on = (save.look[slot] || 'none') === id;
  const wallet = cur === '⭐' ? save.stars : save.money;
  const price = cur === '⭐' ? `${def.price} ⭐` : `$${def.price}`;
  const btn = on ? (id === 'none' ? 'Usando' : 'Tirar') : owned ? 'Usar' : 'Comprar';
  return `<div class="item ${on ? 'on' : ''}"><div class="t">${def.name}</div><div class="p">${owned ? 'Comprado' : price}</div>
    <button class="btn ${owned ? 'blue' : 'green'}" data-buy="${id}" data-slot="${slot}" ${!owned && wallet < def.price ? 'disabled' : ''}>${btn}</button></div>`;
}
function openShop(cur = '$', tab) {
  const space = cur === '⭐';
  tab = tab || (space ? 'suit' : 'colors');
  const tabs = space ? ['suit', 'hat', 'face', 'back', 'vehicles', 'uniforms'] : ['colors', 'uniforms', 'suit', 'hat', 'face', 'neck', 'back'];
  const tabName = (t) => t === 'colors' ? 'Cores' : t === 'vehicles' ? 'Veículos' : t === 'uniforms' ? '🏅 Uniformes' : SLOT_NAMES[t];
  let body = '';
  if (tab === 'colors') {
    body = `<b>Camisa</b>${swatchRow('shirt', CLOTH)}<b>Calça</b>${swatchRow('pants', CLOTH)}<b>Pele</b>${swatchRow('skin', SKINS)}<b>Cor dos acessórios</b>${swatchRow('hatColor', CLOTH)}
      <p class="small muted">Fantasias trocam as cores da camisa e da calça enquanto estiverem vestidas.</p>`;
  } else if (tab === 'uniforms') {
    const cards = Object.entries(ITEMS).filter(([, it]) => it.cur === 'job' && !!JOBS[it.job].space === space).map(([id, it]) => {
      const owned = save.items.includes(id), on = save.look.suit === id;
      return `<div class="item ${on ? 'on' : ''}"><div class="t">${it.name}</div>
        <div class="p">${owned ? 'Desbloqueado' : `🔒 vire ${LEVELS[it.lvl].name}`}</div>
        <button class="btn ${owned ? 'blue' : ''}" data-uni="${id}" ${owned ? '' : 'disabled'}>${on ? 'Tirar' : owned ? 'Vestir' : 'Bloqueado'}</button></div>`;
    }).join('');
    body = `<p class="small muted">Uniformes exclusivos: ganhe sendo promovido nos empregos (Profissional, Chefe e Lenda).</p><div class="grid">${cards}</div>`;
  } else if (tab === 'vehicles') {
    body = `<div class="grid">${Object.entries(VTYPES).filter(([, d]) => d.stars).map(([k, d]) => {
      const owned = save.vehicles.includes(k);
      return `<div class="item ${owned ? 'on' : ''}"><div class="t">${d.name}</div><div class="p">${owned ? 'Na garagem' : d.stars + ' ⭐'}</div>
        <button class="btn ${owned ? 'blue' : 'green'}" data-veh="${k}" ${!owned && save.stars < d.stars ? 'disabled' : ''}>${owned ? (save.favSpace === k ? 'Favorito ✓' : 'Tornar favorito') : 'Comprar'}</button></div>`;
    }).join('')}</div><p class="small muted">O veículo favorito aparece quando você começa um emprego na Lua ou aperta 🚗 (tecla V).</p>`;
  } else {
    const list = [];
    if (tab === 'hat') { if (!space) list.push(['none', HATS.none]); for (const [k, h] of Object.entries(HATS)) if (k !== 'none' && (h.cur || '$') === cur) list.push([k, h]); }
    else for (const [k, it] of Object.entries(ITEMS)) if (it.slot === tab && it.cur === cur) list.push([k, it]);
    body = `<div class="grid">${list.map(([k, d]) => itemCard(k, d, tab)).join('')}</div>`;
  }
  openPanel(`<h2>${space ? '🪐 Loja Espacial' : '👕 Loja de Roupas'}</h2>
    <p class="small muted">${space ? `Estrelas: <b>${save.stars} ⭐</b> · ganhe nos empregos da Lua` : `Dinheiro: <b>$${save.money}</b> · cores são grátis`}</p>
    <div class="tabs">${tabs.map((t) => `<button class="tab ${t === tab ? 'on' : ''}" data-tab="${t}">${tabName(t)}</button>`).join('')}</div>${body}`, (el) => {
    el.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => openShop(cur, b.dataset.tab));
    el.querySelectorAll('.sw').forEach((sw) => sw.onclick = () => { save.look[sw.dataset.f] = +sw.dataset.c; applyLook(); openShop(cur, tab); });
    el.querySelectorAll('[data-buy]').forEach((b) => b.onclick = () => {
      const id = b.dataset.buy, slot = b.dataset.slot;
      const def = slot === 'hat' ? HATS[id] : ITEMS[id];
      const list = slot === 'hat' ? save.hats : save.items;
      if (id !== 'none' && !list.includes(id)) {
        if ((def.cur || '$') === '⭐') { if (save.stars < def.price) return; save.stars -= def.price; }
        else { if (save.money < def.price) return; save.money -= def.price; }
        list.push(id); sfx.coin(); toast(`Você comprou: ${def.name}!`);
      } else if (save.look[slot] === id && id !== 'none') { save.look[slot] = slot === 'hat' ? 'none' : null; applyLook(); openShop(cur, tab); return; }
      save.look[slot] = id; applyLook(); openShop(cur, tab);
    });
    el.querySelectorAll('[data-uni]').forEach((b) => b.onclick = () => {
      const id = b.dataset.uni; if (!save.items.includes(id)) return;
      save.look.suit = save.look.suit === id ? null : id; applyLook(); openShop(cur, tab);
    });
    el.querySelectorAll('[data-veh]').forEach((b) => b.onclick = () => {
      const k = b.dataset.veh;
      if (!save.vehicles.includes(k)) { if (save.stars < VTYPES[k].stars) return; save.stars -= VTYPES[k].stars; save.vehicles.push(k); sfx.success(); toast(`Você comprou: ${VTYPES[k].name}! 🎉`); }
      save.favSpace = k; persist(); openShop(cur, tab);
    });
  }, true);
}
function applyLook() { refreshJobGear(); }

function openDealer() {
  const list = Object.entries(VTYPES).filter(([, d]) => d.price && !d.air).map(([k, d]) => {
    const owned = save.vehicles.includes(k);
    return `<div class="item ${owned ? 'on' : ''}"><div class="t">${d.name}</div><div class="p">${owned ? 'Na garagem' : '$' + d.price}</div>
      <div class="small muted">Vel. máx ${Math.round(d.max * 3.6)} km/h</div><br>
      <button class="btn ${owned ? 'blue' : 'green'}" data-v="${k}" ${!owned && save.money < d.price ? 'disabled' : ''}>${owned ? 'Chamar' : 'Comprar'}</button>
      ${owned ? `<button class="btn" style="margin-top:6px" data-fav="${k}">${save.fav === k ? 'Favorito ✓' : '★ Favorito'}</button>` : ''}</div>`;
  }).join('');
  openPanel(`<h2>🚗 Concessionária</h2><p class="small muted">Dinheiro: <b>$${save.money}</b> · O veículo ★ favorito aparece sempre que você começa um emprego ou aperta 🚗 Chamar (tecla V).</p><div class="grid">${list}</div>`, (el) => {
    el.querySelectorAll('[data-v]').forEach((b) => b.onclick = () => {
      const k = b.dataset.v;
      if (!save.vehicles.includes(k)) { if (save.money < VTYPES[k].price) return; save.money -= VTYPES[k].price; save.vehicles.push(k); save.fav = k; persist(); sfx.success(); toast(`Você comprou: ${VTYPES[k].name}! É seu favorito agora ★`); }
      callVehicle(k); closePanel();
    });
    el.querySelectorAll('[data-fav]').forEach((b) => b.onclick = () => { save.fav = b.dataset.fav; persist(); toast(`${VTYPES[save.fav].name} é seu veículo favorito ★`); openDealer(); });
  });
}
let ownedVehicle = null, ownedPlane = null;
function openHangar() {
  const list = Object.entries(VTYPES).filter(([, d]) => d.price && d.air).map(([k, d]) => {
    const owned = save.vehicles.includes(k);
    return `<div class="item ${owned ? 'on' : ''}"><div class="t">${d.name}</div><div class="p">${owned ? 'No hangar' : '$' + d.price}</div>
      <div class="small muted">${d.style === 'heli' ? 'Decola na vertical' : 'Vel. máx ' + Math.round(d.max * 3.6) + ' km/h'}${d.floats ? ' · pousa na água' : ''}</div><br>
      <button class="btn ${owned ? 'blue' : 'green'}" data-v="${k}" ${!owned && save.money < d.price ? 'disabled' : ''}>${owned ? 'Levar para a pista' : 'Comprar'}</button></div>`;
  }).join('');
  openPanel(`<h2>✈️ Hangar</h2><p class="small muted">Dinheiro: <b>$${save.money}</b> · Também há aviões estacionados no pátio que você pode pilotar de graça.<br>
    <b>Pilotar:</b> W/S acelerador · A/D curva · Espaço sobe · Q desce · E sair. O avião precisa de velocidade para decolar!</p><div class="grid">${list}</div>`, (el) => {
    el.querySelectorAll('[data-v]').forEach((b) => b.onclick = () => {
      const k = b.dataset.v;
      if (!save.vehicles.includes(k)) { if (save.money < VTYPES[k].price) return; save.money -= VTYPES[k].price; save.vehicles.push(k); persist(); sfx.success(); toast(`Você comprou: ${VTYPES[k].name}! ✈️`); }
      callVehicle(k); closePanel();
    });
  });
}
function callVehicle(k) {
  if (VTYPES[k].air) {
    if (ownedPlane && vehicles.includes(ownedPlane)) removeVehicle(ownedPlane);
    let sp = VTYPES[k].style === 'heli' ? { x: world.locations.heliBase.x, z: world.locations.heliBase.z, ry: -Math.PI / 2 } : world.locations.airport.spawn;
    if (VTYPES[k].floats) sp = { x: 140, z: WATER_Z + 40, ry: Math.PI / 2 };
    const f = freeSpot(sp.x, sp.z, sp.ry);
    ownedPlane = spawnVehicle(k, f.x, f.z, sp.ry, { netId: newNetId(), owner: net.id || 'me', color: save.look.shirt });
    waypoint = { x: f.x, z: f.z };
    toast(`${VTYPES[k].name} está esperando ${VTYPES[k].floats ? 'na praia' : 'no aeroporto'}! Siga a seta ✈️`);
    return;
  }
  if (ownedVehicle && vehicles.includes(ownedVehicle)) removeVehicle(ownedVehicle);
  const f = player.forward();
  let x = player.pos.x + f.x * 5 - f.z * 3, z = player.pos.z + f.z * 5 + f.x * 3;
  if (!!VTYPES[k].space !== isSpace(player.pos.x)) { toast(VTYPES[k].space ? 'Esse veículo só funciona na Lua 🌙' : 'Esse veículo fica na Terra 🌍'); return; }
  if (k === 'jetski' && !world.isWater(x, z)) { x = 120 + (Math.random() - 0.5) * 20; z = WATER_Z + 12; toast('Seu Jet Ski está esperando na praia 🌊'); }
  for (let i = 0; i < 10 && world.pointBlocked(x, 1, z); i++) { x += f.x * 3; z += f.z * 3; }
  ownedVehicle = spawnVehicle(k, x, z, player.ry, { netId: newNetId(), owner: net.id || 'me', color: save.look.shirt });
  toast(`${VTYPES[k].name} chegou!`);
}
function callFavorite(silent) {
  const space = isSpace(player.pos.x);
  let fav = space ? save.favSpace : save.fav;
  const ok = (k) => save.vehicles.includes(k) && !VTYPES[k].air && !!VTYPES[k].space === space;
  if (!fav || !ok(fav)) fav = save.vehicles.find(ok);
  if (!fav) { if (!silent) toast(space ? 'Compre um veículo na Loja Espacial 🪐' : 'Compre um veículo na Concessionária 🚗'); return; }
  if (space) save.favSpace = fav; else save.fav = fav;
  if (player.vehicle && player.vehicle === ownedVehicle) return;
  callVehicle(fav);
}
function openGarage() {
  if (!save.vehicles.length) { openPanel(`<h2>🚗 Garagem</h2><p>Você ainda não tem veículos. Trabalhe, junte dinheiro e compre na <b>Concessionária</b>!</p>`); return; }
  openPanel(`<h2>🚗 Garagem</h2><div class="grid">${save.vehicles.map((k) => `<div class="item"><div class="t">${VTYPES[k].name}</div><br><button class="btn blue" data-v="${k}">${(save.fav === k || save.favSpace === k) ? 'Chamar ★' : 'Chamar e favoritar'}</button></div>`).join('')}</div>`, (el) => {
    el.querySelectorAll('[data-v]').forEach((b) => b.onclick = () => { const k = b.dataset.v; if (VTYPES[k].space) save.favSpace = k; else save.fav = k; persist(); callVehicle(k); closePanel(); });
  });
}
function openJob(key) {
  const j = JOBS[key], cur = jobs.current?.key === key;
  openPanel(`<h2>${j.icon} ${j.name}</h2><p>${j.desc}</p>${careerHtml(key)}${cur ? '<p><b>Você já está trabalhando aqui.</b></p>' : ''}
    <div class="row"><button class="btn ${cur ? '' : 'primary'}" id="jb">${cur ? 'Sair do emprego' : 'Começar a trabalhar'}</button></div>`, (el) => {
    el.querySelector('#jb').onclick = () => { if (cur) jobs.quit(); else jobs.start(key); closePanel(); };
  });
}
let waypoint = null;
function openJobsList() {
  const s = save.stats;
  openPanel(`<h2>💼 Empregos</h2><p class="small muted">Vá até o local marcado para começar. Estatísticas: 🍕${s.pizzas || 0} 🚕${s.corridas || 0} 🗑️${s.lixo || 0} 📦${s.mudancas || 0} 🚒${s.incendios || 0} 💎${s.cristais || 0} 🛰️${s.entregasEspaciais || 0} 📡${s.antenas || 0} ✈️${s.voos || 0} 🚁${s.resgates || 0} 🚑${s.pacientes || 0} 🚓${s.prisoes || 0} 🎣${s.peixes || 0}${save.spaceUnlocked ? '' : '<br>🚀 Complete a Missão Espacial no Centro Espacial para desbloquear empregos na Lua!'}</p>
    <div class="joblist">${Object.entries(JOBS).filter(([, j]) => !j.hidden).map(([k, j]) => {
      const locked = j.space && !save.spaceUnlocked, other = !!j.space !== isSpace(player.pos.x);
      const btn = locked ? '<button class="btn" disabled>🔒 Lua</button>' : `<button class="btn blue" data-go="${k}" ${other ? 'disabled' : ''}>${other ? (j.space ? '🌙 Na Lua' : '🌍 Na Terra') : 'Marcar'}</button>`;
      return `<div class="item ${locked ? 'locked' : ''}" style="margin:8px 0"><div class="ico">${j.icon}</div><div style="flex:1;min-width:0"><div class="t">${j.name}</div>${careerHtml(k, true)}</div>${btn}</div>`;
    }).join('')}</div>
    ${jobs.current ? '<button class="btn" id="quitjob">Sair do emprego atual</button>' : ''}`, (el) => {
    el.querySelectorAll('[data-go]').forEach((b) => b.onclick = () => { const z = world.locations[JOBS[b.dataset.go].place].zone; waypoint = { x: z.x, z: z.z }; toast('Local marcado no mapa! Siga a seta.'); closePanel(); });
    el.querySelector('#quitjob')?.addEventListener('click', () => { jobs.quit(); closePanel(); });
  });
}
function openHome() {
  openPanel(`<h2>🏠 Minha Casa</h2><p>Descanse, salve o jogo e veja seu progresso.</p>
    <p>💰 Dinheiro: <b>$${save.money}</b><br>🎁 Presentes encontrados: <b>${save.gifts.length}/${world.gifts.length}</b><br>🚗 Veículos: <b>${save.vehicles.length}</b> · 👕 Roupas: <b>${save.hats.length - 1 + save.items.length}</b> · ⭐ Estrelas: <b>${save.stars}</b></p>
    <div class="row"><button class="btn blue" id="garage">🚗 Garagem</button></div>
    <div class="row"><button class="btn primary" id="sleep">😴 Dormir até de manhã</button><button class="btn" id="savebtn">💾 Salvar</button></div>`, (el) => {
    el.querySelector('#sleep').onclick = () => { world.time = 7; persist(); toast('Bom dia! ☀️ Jogo salvo.'); closePanel(); };
    el.querySelector('#savebtn').onclick = () => { persist(); toast('Jogo salvo! 💾'); closePanel(); };
    el.querySelector('#garage').onclick = () => openGarage();
  });
}
function openPause() {
  const others = [...remotes.values()].map((r) => esc(r.name)).join(', ');
  openPanel(`<h2>⏸️ Pausa</h2>
    ${net.connected ? `<p>🌐 Online · código <b style="letter-spacing:3px">${esc(net.room)}</b> · Jogadores: <b>${remotes.size + 1}</b>${others ? '<br><span class="small">' + others + '</span>' : ''}</p><button class="btn blue" id="invite">🔑 Convidar amigos</button>` : '<p>🏠 Modo offline</p>'}
    <p class="small"><b>Controles:</b><br>WASD/setas: mover · Shift: correr · Espaço: pular / freio de mão<br>Mouse: câmera (clique para travar) · Roda: zoom<br>
    E: entrar/sair de veículos e interagir · F ou clique: pegar/soltar · G ou botão direito: arremessar<br>Q: cair (ragdoll) · H: buzina · R: voltar para casa<br>J: empregos · M: mapa · V: chamar veículo favorito · Espaço no ar: jetpack</p>
    <div class="row"><button class="btn primary" id="resume">Continuar</button><button class="btn" id="garage2">Garagem</button><button class="btn" id="tohome">Voltar p/ casa</button><button class="btn" id="tomenu">Menu principal</button></div>`, (el) => {
    el.querySelector('#resume').onclick = closePanel;
    el.querySelector('#invite')?.addEventListener('click', openInvite);
    el.querySelector('#tohome').onclick = () => { respawn(); closePanel(); };
    el.querySelector('#garage2').onclick = () => openGarage();
    el.querySelector('#tomenu').onclick = () => { persist(); location.reload(); };
  });
}
function respawn() {
  if (player.vehicle) exitVehicle();
  if (player.held) player.release(false, G);
  player.ragdoll = false; player.char.spin.rotation.set(0, 0, 0);
  if (isSpace(player.pos.x)) { const m = world.locations.moonPad; player.pos.set(m.x, 1, m.z); } else player.pos.set(home.x, 1, home.z + 3.5);
  player.vel.set(0, 0, 0);
}

// ---------------- Careers: gear, promotions, confetti ----------------
function careerHtml(key, compact) {
  const xp = save.jobXP[key] || 0, pi = progressInfo(key, xp), perk = PERKS[key];
  const has = perk && pi.level >= perk.lvl;
  if (compact) return `<div class="career"><div class="small"><b>${pi.text}</b></div><div class="bar"><div style="width:${Math.round(pi.frac * 100)}%"></div></div>${perk ? `<div class="small">${has ? '✅' : '🔒'} ${perk.name}${has ? '' : ` (${LEVELS[perk.lvl].name})`}</div>` : ''}</div>`;
  return `<div class="career"><div><b>${pi.text}</b></div><div class="bar"><div style="width:${Math.round(pi.frac * 100)}%"></div></div>
    <div class="small">Ganho: <b>x${LEVELS[pi.level].mult}</b> · ${LEVELS.map((l, i) => `<span class="${i <= pi.level ? 'lv-on' : 'lv-off'}">${l.icon} ${l.name}</span>`).join(' → ')}</div>
    ${perk ? `<div class="small">${has ? '✅' : '🔒'} <b>${perk.name}</b> ${has ? '' : `(vira ${LEVELS[perk.lvl].name})`}: ${perk.desc}</div>` : ''}</div>`;
}
// Job tools that change the character (delivery jetpacks)
function refreshJobGear() {
  const job = jobs.current;
  const jet = job && (job.key === 'pizza' || job.key === 'spacedelivery') && job.perk();
  player.char.setLook({ ...save.look, back: jet ? 'jetpack' : (save.look.back ?? null), suit: save.look.suit ?? null, face: save.look.face ?? null, neck: save.look.neck ?? null });
  player.hasJetpack = jet || save.look.back === 'jetpack';
  player.maxFuel = jet ? 5 : 2.5;
  persist();
  if (net.connected) net.send({ t: 'look', look: player.char.look });
}
let promoTimer = null;
function promote(job, lvl) {
  const id = uniformId(job, lvl);
  if (ITEMS[id] && !save.items.includes(id)) save.items.push(id);
  persist();
  const L = LEVELS[lvl], perk = PERKS[job];
  confetti(); sfx.fanfare();
  const el = $('#promo');
  el.innerHTML = `<div class="promo-t">🎉 PROMOÇÃO!</div><div class="promo-l">${JOBS[job].icon} ${esc(JOBS[job].name)} · ${L.icon} ${L.name}</div>
    <div class="small">Ganhos x${L.mult} · Novo uniforme exclusivo${perk && perk.lvl === lvl ? ` · Nova ferramenta: <b>${perk.name}</b>` : ''}</div>
    <div class="row"><button class="btn primary" id="wear">👕 Vestir uniforme</button><button class="btn" id="promo-close">Depois</button></div>`;
  el.classList.remove('hidden');
  el.querySelector('#wear').onclick = () => { save.look.suit = id; applyLook(); el.classList.add('hidden'); toast('Uniforme novo vestido! 😎'); };
  el.querySelector('#promo-close').onclick = () => el.classList.add('hidden');
  clearTimeout(promoTimer); promoTimer = setTimeout(() => el.classList.add('hidden'), 12000);
  if (jobs.current?.key === job) refreshJobGear();
}
function confetti() {
  let c = $('#confetti');
  if (!c) { c = document.createElement('canvas'); c.id = 'confetti'; document.body.appendChild(c); }
  c.width = innerWidth; c.height = innerHeight;
  const g = c.getContext('2d'), cols = ['#ff7043', '#ffd54f', '#66bb6a', '#42a5f5', '#ab47bc', '#ec407a', '#ffffff'];
  const parts = Array.from({ length: 220 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.6, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 4, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, w: 6 + Math.random() * 6, h: 4 + Math.random() * 6, col: cols[Math.floor(Math.random() * cols.length)] }));
  const t0 = performance.now();
  const step = (now) => {
    const t = (now - t0) / 1000;
    g.clearRect(0, 0, c.width, c.height);
    for (const p of parts) {
      p.x += p.vx + Math.sin(t * 3 + p.r) * 0.8; p.y += p.vy; p.r += p.vr;
      g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.globalAlpha = Math.max(0, 1 - Math.max(0, t - 3)); g.fillStyle = p.col; g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); g.restore();
    }
    if (t < 4) requestAnimationFrame(step); else g.clearRect(0, 0, c.width, c.height);
  };
  requestAnimationFrame(step);
}

// ---------------- Rocket / space travel ----------------
function openRocket() {
  if (!save.spaceUnlocked) {
    const cur = jobs.current?.key === 'spacemission';
    openPanel(`<h2>🚀 Missão Espacial</h2><p>O foguete está sem combustível! Leve <b>3 barris de combustível</b> até o tanque branco ao lado da plataforma. Depois disso, você pode viajar para a <b>Lua</b> quando quiser.</p>
      <p class="small muted">Na Lua há novos empregos que pagam em ⭐ Estrelas, uma Loja Espacial com trajes, jetpack e veículos lunares, e gravidade baixa!</p>
      <div class="row"><button class="btn primary" id="go">${cur ? 'Missão em andamento' : 'Começar missão'}</button></div>`, (el) => {
      el.querySelector('#go').onclick = () => { if (!cur) jobs.start('spacemission'); closePanel(); };
    });
    return;
  }
  openPanel(`<h2>🚀 Centro Espacial</h2><p>Foguete abastecido e pronto. Viajar para a Lua?</p><div class="row"><button class="btn primary" id="go">🌙 Decolar para a Lua</button></div>`, (el) => {
    el.querySelector('#go').onclick = () => startTravel('moon');
  });
}
let travel = null;
function startTravel(to) {
  evento('viagem_espaco', { destino: to });
  closePanel();
  if (player.vehicle) exitVehicle();
  if (player.held) player.release(false, G);
  if (jobs.current) jobs.quit(true);
  if (ownedVehicle && vehicles.includes(ownedVehicle)) { removeVehicle(ownedVehicle); ownedVehicle = null; }
  const rocket = to === 'moon' ? world.earthRocket : world.moonRocket;
  travel = { to, t: 0, rocket, baseY: rocket.position.y, done: false };
  player.char.root.visible = false; player.ragdoll = false; player.char.spin.rotation.set(0, 0, 0);
  rocket.userData.flame.visible = true;
  sfx.noise(4, 0.5, 300);
}
function updateTravel(dt) {
  const T = travel; T.t += dt;
  const r = T.rocket;
  if (!T.done) {
    r.position.y = T.baseY + Math.max(0, T.t - 1) ** 2 * 7;
    r.userData.flame.scale.set(1, 0.8 + Math.random() * 0.4, 1);
    camera.position.set(r.position.x + 30, T.baseY + 8 + Math.max(0, r.position.y - T.baseY) * 0.6, r.position.z + 40);
    camera.lookAt(r.position.x, r.position.y + 10, r.position.z);
    shake = 0.25;
    $('#fade').style.opacity = clamp((T.t - 3.2) / 1, 0, 1);
    if (T.t > 4.3) {
      T.done = true; r.position.y = T.baseY; r.userData.flame.visible = false;
      const dest = T.to === 'moon' ? world.locations.moonPad : { x: world.locations.rocket.zone.x, z: world.locations.rocket.zone.z + 2 };
      player.pos.set(dest.x, 0.5, dest.z); player.vel.set(0, 0, 0); camTarget.copy(player.pos);
      camYaw = 0; player.ry = 0;
      if (T.to === 'moon' && !save.stats.moon) { save.stats.moon = 1; save.stars += 10; persist(); setTimeout(() => toast('🌙 Missão espacial concluída! Bem-vindo(a) à Lua! +10 ⭐', 'money'), 800); }
      else toast(T.to === 'moon' ? '🌙 Você chegou na Lua! Gravidade baixa, pule alto!' : '🌍 De volta à Bento City!');
    }
  } else {
    $('#fade').style.opacity = clamp(1 - (T.t - 4.6) / 1, 0, 1);
    updateCamera(dt);
    if (T.t > 5.6) { travel = null; player.char.root.visible = true; $('#fade').style.opacity = 0; }
  }
}

// Big map
const mapBase = world.makeMapCanvas();
const moonBase = world.makeMoonMapCanvas();
const MAPS = { earth: { c: mapBase, ox: 650, oz: 400 }, moon: { c: moonBase, ox: -MX + 320, oz: -MZ + 320 } };
const MOON_ICONS = { spaceshop: '🪐', mining: '💎', spacedelivery: '🛰️', repair: '📡', moonReturn: '🚀' };
const curMap = () => isSpace(player.pos.x) ? MAPS.moon : MAPS.earth;
const bigCanvas = $('#bigmap-canvas'), bigCtx = bigCanvas.getContext('2d');
const MAP_ICONS = { airport: '✈️', heliBase: '🚁', hospital: '🏥', police: '🚓', fishing: '🎣', rocket: '🚀', pizzeria: '🍕', taxi: '🚕', garbage: '🗑️', moving: '📦', fire: '🚒', shop: '👕', dealer: '🚗', home: '🏠', stunt: '🛹', park: '🌳', plaza: '⛲' };
function drawBigMap() {
  const g = bigCtx, M = curMap(), W = M.c.width, H = M.c.height;
  bigCanvas.width = W; bigCanvas.height = H;
  g.drawImage(M.c, 0, 0);
  g.font = '26px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  const icons = M === MAPS.moon ? MOON_ICONS : MAP_ICONS;
  for (const [k, ic] of Object.entries(icons)) { const l = world.locations[k]; if (l) g.fillText(ic, l.x + M.ox, l.z + M.oz); }
  const tgt = jobs.current?.target;
  if (tgt) { g.fillStyle = '#ffeb3b'; g.beginPath(); g.arc(tgt.x + M.ox, tgt.z + M.oz, 9, 0, 7); g.fill(); g.strokeStyle = '#000'; g.lineWidth = 2; g.stroke(); }
  if (waypoint) { g.fillText('📍', waypoint.x + M.ox, waypoint.z + M.oz - 10); }
  for (const r of remotes.values()) { g.fillStyle = '#00e5ff'; g.beginPath(); g.arc(r.pos.x + M.ox, r.pos.z + M.oz, 7, 0, 7); g.fill(); g.fillStyle = '#fff'; g.font = 'bold 16px Arial'; g.fillText(r.name, r.pos.x + M.ox, r.pos.z + M.oz - 16); g.font = '26px serif'; }
  drawArrow(g, player.pos.x + M.ox, player.pos.z + M.oz, Math.PI / 2 - player.ry, 14, '#ff1744');
  $('#bigmap h2').textContent = M === MAPS.moon ? 'Mapa da Lua' : 'Mapa da Cidade';
}
function drawArrow(g, x, y, ang, s, col) {
  g.save(); g.translate(x, y); g.rotate(ang);
  g.fillStyle = col; g.strokeStyle = '#fff'; g.lineWidth = 2;
  g.beginPath(); g.moveTo(s, 0); g.lineTo(-s * 0.7, s * 0.65); g.lineTo(-s * 0.35, 0); g.lineTo(-s * 0.7, -s * 0.65); g.closePath(); g.fill(); g.stroke();
  g.restore();
}
function openMap() { drawBigMap(); $('#bigmap').classList.remove('hidden'); panelOpen = true; input.enabled = false; document.exitPointerLock?.(); }
bigCanvas.addEventListener('click', (e) => {
  const r = bigCanvas.getBoundingClientRect();
  const M = curMap(), W = M.c.width, H = M.c.height;
  const sc = Math.min(r.width / W, r.height / H), ox = (r.width - W * sc) / 2, oy = (r.height - H * sc) / 2;
  const x = (e.clientX - r.left - ox) / sc - M.ox, z = (e.clientY - r.top - oy) / sc - M.oz;
  waypoint = { x, z }; drawBigMap(); toast('Destino marcado! 📍');
});

// Minimap
const mini = $('#minimap'), miniCtx = mini.getContext('2d');
function drawMinimap() {
  const g = miniCtx, W = mini.width, s = 0.7, M = curMap();
  g.save();
  g.fillStyle = M === MAPS.moon ? '#555' : '#5aa83f'; g.fillRect(0, 0, W, W);
  g.translate(W / 2, W / 2); g.rotate(camYaw - Math.PI); g.scale(s, s);
  g.translate(-(player.pos.x + M.ox), -(player.pos.z + M.oz));
  g.drawImage(M.c, 0, 0);
  g.font = '22px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (const [k, ic] of Object.entries(M === MAPS.moon ? MOON_ICONS : MAP_ICONS)) {
    const l = world.locations[k]; if (!l) continue;
    g.save(); g.translate(l.x + M.ox, l.z + M.oz); g.rotate(-(camYaw - Math.PI)); g.fillText(ic, 0, 0); g.restore();
  }
  const tgt = jobs.current?.target || waypoint;
  if (tgt) { g.fillStyle = '#ffeb3b'; g.strokeStyle = '#000'; g.lineWidth = 3; g.beginPath(); g.arc(tgt.x + M.ox, tgt.z + M.oz, 9, 0, 7); g.fill(); g.stroke(); }
  for (const r of remotes.values()) { g.fillStyle = '#00e5ff'; g.beginPath(); g.arc(r.pos.x + M.ox, r.pos.z + M.oz, 7, 0, 7); g.fill(); }
  g.restore();
  drawArrow(g, W / 2, W / 2, camYaw - player.ry - Math.PI / 2, 10, '#ff1744');
}

// ---------------- Sem chat online ----------------
// Os jogadores só se veem (posição, veículos, buzina, visual); não existe texto entre eles.
addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && (panelOpen)) { closePanel(); e.preventDefault(); }
});

// ---------------- Online: remote players ----------------
function addRemote(p) {
  if (remotes.has(p.id) || p.id === net.id) return;
  const ch = new Character(p.look || {});
  ch.setName(p.name || '???', '#80deea');
  scene.add(ch.root);
  remotes.set(p.id, { id: p.id, name: p.name || '???', char: ch, pos: new THREE.Vector3(p.x || 0, p.y || 0, p.z || 0), tgt: new THREE.Vector3(p.x || 0, p.y || 0, p.z || 0), ry: 0, tRy: 0, mode: 'walk', sp: 0, veh: null, held: '', heldMesh: null, rr: [0, 0, 0], vel: new THREE.Vector3(), ragdoll: false, last: performance.now() });
}
function removeRemote(id) {
  const r = remotes.get(id); if (!r) return;
  scene.remove(r.char.root); remotes.delete(id);
  for (const v of [...vehicles]) if (v.owner === id && v.tag !== 'parked') removeVehicle(v);
  for (const v of vehicles) if (v.remote && v.remote.by === id) { v.remote = null; v.driver = null; }
}
net.on('welcome', (m) => { for (const p of m.players) addRemote(p); toast(m.players.length ? `Você entrou na partida ${m.room}. Jogadores: ${m.players.length + 1}` : `Partida ${m.room} criada! Passe o código para seus amigos.`); });
net.on('join', (m) => { addRemote(m); toast(`${m.name} entrou na cidade 👋`); sfx.chat(); });
net.on('leave', (m) => { const r = remotes.get(m.id); if (r) toast(`${r.name} saiu.`); removeRemote(m.id); });
net.on('look', (m) => { const r = remotes.get(m.id); if (r) r.char.setLook(m.look); });
net.on('s', (m) => {
  const r = remotes.get(m.id); if (!r) return;
  r.tgt.set(m.x, m.y, m.z); r.tRy = m.ry; r.mode = m.m; r.sp = m.sp; r.veh = m.v; r.rr = m.rr || [0, 0, 0]; r.last = performance.now();
  if (m.h !== r.held) {
    if (r.heldMesh) { r.char.root.remove(r.heldMesh); r.heldMesh = null; }
    r.held = m.h;
    if (m.h && PTYPES[m.h]) { r.heldMesh = makePropMesh(m.h); r.heldMesh.position.set(0, 1.25, 0.9); r.char.root.add(r.heldMesh); }
  }
  if (r.pos.distanceTo(r.tgt) > 40) r.pos.copy(r.tgt);
});
net.on('v', (m) => {
  let v = netVehicles.get(m.n);
  if (!v) {
    if (!VTYPES[m.ty]) return;
    v = spawnVehicle(m.ty, m.x, m.z, m.ry, { netId: m.n, color: m.c, owner: m.id });
  }
  if (v.driver === 'local') return; // conflict: we keep control
  if (v.ai) v.ai = null;
  v.remote = { x: m.x, y: m.y, z: m.z, ry: m.ry, pitch: m.p, roll: m.r, steer: m.s, by: m.id, t: performance.now() };
  v.driver = m.id;
});
net.on('vdel', (m) => { const v = netVehicles.get(m.n); if (v && v.driver !== 'local') removeVehicle(v); });
net.on('honk', (m) => { const r = remotes.get(m.id); if (r && r.pos.distanceTo(player.pos) < 60) sfx.horn(); });
net.on('close', () => { if (started && mode === 'online') { toast('Conexão perdida com o servidor. Continuando offline.'); $('#online-pill').classList.add('hidden'); $('#code-pill').classList.add('hidden'); for (const id of [...remotes.keys()]) removeRemote(id); } });

function updateRemotes(dt) {
  const now = performance.now();
  for (const r of remotes.values()) {
    const k = Math.min(1, dt * 10);
    const ox = r.pos.x, oz = r.pos.z;
    r.pos.lerp(r.tgt, k);
    r.vel.set((r.pos.x - ox) / Math.max(dt, 1e-3), 0, (r.pos.z - oz) / Math.max(dt, 1e-3));
    r.ry = angLerp(r.ry, r.tRy, k);
    const veh = r.veh ? netVehicles.get(r.veh) : null;
    const root = r.char.root;
    if (veh && (r.mode === 'drive' || r.mode === 'ride')) {
      veh.seatWorld(root.position); root.rotation.set(veh.pitch, veh.ry, veh.roll);
      r.char.spin.rotation.set(0, 0, 0);
      r.char.animate(dt, { mode: r.mode, steer: veh.steer });
    } else {
      root.position.copy(r.pos); root.rotation.set(0, r.ry, 0);
      if (r.mode === 'ragdoll') { r.char.spin.rotation.set(r.rr[0], r.rr[1], r.rr[2]); root.position.y -= 0.4; }
      else r.char.spin.rotation.set(0, 0, 0);
      r.char.animate(dt, { mode: r.mode, speed: r.sp, grounded: r.mode !== 'air', accel: 0 });
    }
    if (now - r.last > 15000) removeRemote(r.id);
  }
  for (const v of vehicles) if (v.remote && now - v.remote.t > 1500) { v.remote = null; v.driver = null; v.vel.set(0, 0, 0); }
}

let sendT = 0;
function netSend(dt) {
  if (!net.connected) return;
  sendT += dt; if (sendT < 1 / 12) return; sendT = 0;
  const v = player.vehicle;
  const m = player.ragdoll ? 'ragdoll' : v ? (v.def.style === 'bike' || v.def.style === 'boat' ? 'ride' : 'drive') : player.swimming ? 'swim' : !player.grounded ? 'air' : player.held ? 'hold' : player.spraying ? 'spray' : 'walk';
  const r = player.char.spin.rotation;
  const f2 = (n) => Math.round(n * 100) / 100;
  net.send({ t: 's', x: f2(player.pos.x), y: f2(player.pos.y), z: f2(player.pos.z), ry: f2(player.ry), m, sp: f2(Math.hypot(player.vel.x, player.vel.z)), v: v ? v.netId : null, h: player.held && player.held.type ? player.held.type : '', rr: player.ragdoll ? [f2(r.x), f2(r.y), f2(r.z)] : undefined });
  if (v) net.send({ t: 'v', n: v.netId, ty: v.type, c: v.color, x: f2(v.pos.x), y: f2(v.y), z: f2(v.pos.z), ry: f2(v.ry), p: f2(v.pitch), r: f2(v.roll), s: f2(v.steer) });
}

// ---------------- Player <-> world interactions ----------------
player.onKnock = () => { if (player.held) player.release(false, G); sfx.bonk(); };

function nearestGrabbableNpc() {
  const f = player.forward();
  let best = null, bd = 2.2;
  for (const n of peds.list) {
    const a = n.actor; if (a.carriedBy) continue;
    const dx = a.pos.x - player.pos.x, dz = a.pos.z - player.pos.z, d = Math.hypot(dx, dz);
    if (d < bd && (d < 0.8 || (dx * f.x + dz * f.z) / d > 0.2) && Math.abs(a.pos.y - player.pos.y) < 1.5) { bd = d; best = n; }
  }
  return best;
}
function stationHere() {
  for (const s of stations) if (dist2(s.loc.zone.x, s.loc.zone.z, player.pos.x, player.pos.z) < 3.2) return s;
  return null;
}
function useStation(s) {
  if (s.kind === 'job') openJob(s.job);
  else if (s.kind === 'shop') openShop('$');
  else if (s.kind === 'spaceshop') openShop('⭐');
  else if (s.kind === 'rocket') openRocket();
  else if (s.kind === 'return') openPanel(`<h2>🌍 Voltar para a Terra</h2><p>O foguete está pronto para levar você de volta à Bento City.</p><div class="row"><button class="btn primary" id="go">🚀 Decolar</button></div>`, (el) => { el.querySelector('#go').onclick = () => startTravel('earth'); });
  else if (s.kind === 'dealer') openDealer();
  else if (s.kind === 'hangar') openHangar();
  else if (s.kind === 'home') openHome();
}

function handlePlayer(dt) {
  let prompt = '';
  const v = player.vehicle;
  const job = jobs.current;
  const sprayJob = job && job.key === 'fire' && job.canSpray && job.canSpray();
  player.spraying = false;
  if (input.pressed('KeyJ')) openJobsList();
  if (input.pressed('KeyM')) openMap();
  if (input.pressed('KeyV')) callFavorite(false);
  if (input.pressed('Escape') && !panelOpen) openPause();
  if (panelOpen) return;
  if (v) {
    const ax = input.axis();
    const ctl = { throttle: ax.y, steer: ax.x, handbrake: input.down('Space'), up: input.down('Space'), down: input.down('KeyQ') || input.down('ControlLeft') || input.down('KeyC') };
    v.ctl = ctl;
    v.seatWorld(player.pos);
    player.ry = v.ry;
    if (input.pressed('KeyE')) { exitVehicle(); }
    if (input.pressed('KeyH')) { sfx.horn(); net.send({ t: 'honk' }); for (const n of peds.list) if (n.actor.pos.distanceTo(player.pos) < 14 && n.actor.grounded) n.actor.vel.y = 6; }
    if (sprayJob && v === job.vehicle && (input.mouse.left || input.down('Mouse0'))) { player.spraying = true; emitWater(dt, true); }
    prompt = 'E: sair' + (sprayJob && v === job.vehicle ? ' · Clique: canhão de água' : '');
    if (v.def.air) prompt = v.def.style === 'heli' ? 'W/S frente/trás · A/D girar · Espaço subir · Q descer · E sair' : (v.grounded && (v.spd || 0) < v.def.stall ? 'W acelerar · com velocidade, Espaço decola · E sair' : 'W/S acelerador · A/D curva · Espaço subir · Q descer');
    sfx.setEngine(true, v.speed(), v.def.max);
  } else if (player.ragdoll) {
    player.updateRagdoll(dt, world);
    prompt = '';
  } else {
    player.walk(dt, input, camYaw, world, sfx);
    // collide with vehicles (push out)
    for (const o of vehicles) {
      const lp = o.toLocal(player.pos.x, player.pos.z);
      const hw = o.def.wid / 2 + 0.4, hl = o.def.len / 2 + 0.4;
      if (Math.abs(lp.x) < hw && Math.abs(lp.z) < hl && player.pos.y < o.y + o.def.h && player.pos.y > o.y - 1) {
        // allow standing on top of big vehicles
        if (player.pos.y > o.y + o.def.h - 0.6) continue;
        const px = hw - Math.abs(lp.x), pz = hl - Math.abs(lp.z);
        const f = o.forwardVec(), lx = f.z, lz = -f.x;
        if (px < pz) { const s = Math.sign(lp.x) * px; player.pos.x += lx * s; player.pos.z += lz * s; }
        else { const s = Math.sign(lp.z) * pz; player.pos.x += f.x * s; player.pos.z += f.z * s; }
      }
    }
    const st = stationHere();
    const nv = nearestVehicle();
    if (st) {
      prompt = `E: ${st.label}`;
      if (input.pressed('KeyE')) useStation(st);
    } else if (nv) {
      prompt = `E: entrar (${nv.def.name})`;
      if (input.pressed('KeyE')) enterVehicle(nv);
    }
    if (input.pressed('KeyQ')) { const f = player.forward(); player.knock(f.x * 3, 4, f.z * 3); }
    if (input.pressed('KeyR')) respawn();
    const grabKey = input.pressed('KeyF') || (!sprayJob && input.pressed('Mouse0'));
    if (player.held) {
      prompt += (prompt ? ' · ' : '') + 'F: soltar · G: arremessar';
      if (grabKey) { player.release(false, G); sfx.grab(); }
      else if (input.pressed('KeyG') || input.pressed('Mouse2')) { player.release(true, G); sfx.throw(); }
    } else {
      const p = props.nearest(player.pos.x, player.pos.y, player.pos.z, Math.sin(player.ry), Math.cos(player.ry));
      const n = p ? null : nearestGrabbableNpc();
      if (p || n) {
        prompt += (prompt ? ' · ' : '') + `F: pegar ${p ? PTYPES[p.type].name.toLowerCase() : 'pessoa'}`;
        if (grabKey) { player.grab(p || n); sfx.grab(); }
      }
      if (sprayJob && (input.mouse.left || input.down('Mouse0'))) { player.spraying = true; emitWater(dt, false); }
    }
  }
  if (input.pressed('KeyH') && !v) sfx.horn();
  $('#prompt').textContent = prompt;
}

function emitWater(dt, fromTruck) {
  const cp = Math.cos(camPitch - 0.25), sp = Math.sin(camPitch - 0.25);
  const dx = Math.sin(camYaw) * cp, dy = -sp, dz = Math.cos(camYaw) * cp;
  let o;
  if (fromTruck) o = player.vehicle.toWorld(0, player.vehicle.def.h + 0.8, player.vehicle.def.len * 0.3, _v1);
  else { player.ry = angLerp(player.ry, camYaw, Math.min(1, dt * 15)); o = player.holdPoint(_v1); }
  const big = jobs.current?.key === 'fire' && jobs.current.perk();
  water.material.size = big ? 0.8 : 0.35;
  for (let k = 0; k < (big ? 12 : 6); k++) {
    const p = wp[wpi]; wpi = (wpi + 1) % MAXP;
    const s = (big ? 34 : 24) + Math.random() * 4;
    p.x = o.x; p.y = o.y; p.z = o.z;
    p.vx = dx * s + (Math.random() - 0.5) * 1.5; p.vy = dy * s + 2 + (Math.random() - 0.5) * 1.5; p.vz = dz * s + (Math.random() - 0.5) * 1.5;
    p.life = 1.6;
  }
}
function updateWater(dt) {
  const job = jobs.current;
  for (let i = 0; i < MAXP; i++) {
    const p = wp[i];
    if (p.life > 0) {
      p.life -= dt; p.vy -= 14 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      if (job && job.waterHit && job.waterHit(p.x, p.y, p.z)) p.life = 0;
      if (p.y < 0 || world.pointBlocked(p.x, p.y, p.z)) p.life = 0;
      if (i % 4 === 0) for (const n of peds.list) { const a = n.actor; if (Math.abs(a.pos.x - p.x) < 0.6 && Math.abs(a.pos.z - p.z) < 0.6 && p.y - a.pos.y < 1.8 && p.y > a.pos.y) { a.vel.x += p.vx * 0.05; a.vel.z += p.vz * 0.05; if (Math.random() < 0.02) a.knock(p.vx * 0.2, 2, p.vz * 0.2); } }
      if (p.life <= 0) p.y = -100;
    }
    wpos[i * 3] = p.x; wpos[i * 3 + 1] = p.y; wpos[i * 3 + 2] = p.z;
  }
  waterGeo.attributes.position.needsUpdate = true;
}

function vehicleHits() {
  const actors = [];
  if (!player.vehicle) actors.push(player);
  for (const n of peds.list) if (!n.actor.carriedBy && n.char.root.visible) actors.push(n.actor);
  for (const v of vehicles) {
    const sp = Math.hypot(v.vel.x, v.vel.z);
    if (sp < 3) continue;
    for (const a of actors) {
      if (Math.abs(a.pos.x - v.pos.x) > 8 || Math.abs(a.pos.z - v.pos.z) > 8) continue;
      const lp = v.toLocal(a.pos.x, a.pos.z);
      if (Math.abs(lp.x) < v.def.wid / 2 + 0.45 && Math.abs(lp.z) < v.def.len / 2 + 0.45 && a.pos.y < v.y + v.def.h && a.pos.y > v.y - 1) {
        if (a.ragdoll && a.ragT < 0.4) continue;
        a.knock(v.vel.x * 1.1, 5 + sp * 0.3, v.vel.z * 1.1, 10);
        if (a === player || v.driver === 'local') { sfx.bonk(); shake = 0.4; }
        v.vel.multiplyScalar(0.92);
      }
    }
  }
}

function updateGifts(dt, t) {
  for (let i = giftMeshes.length - 1; i >= 0; i--) {
    const g = giftMeshes[i];
    g.rotation.y += dt * 1.5; g.position.y += Math.sin(t * 2 + i) * 0.004;
    if (Math.abs(g.position.x - player.pos.x) < 1.8 && Math.abs(g.position.z - player.pos.z) < 1.8 && Math.abs(g.position.y - 1 - player.pos.y) < 2.5) {
      scene.remove(g); giftMeshes.splice(i, 1); save.gifts.push(g.userData.i);
      pay(25, `Presente encontrado! 🎁 (${save.gifts.length}/${world.gifts.length})`, true);
    }
  }
}

// ---------------- HUD ----------------
let shownMoney = save.money;
function updateHud(dt) {
  shownMoney += (save.money - shownMoney) * Math.min(1, dt * 6);
  if (Math.abs(save.money - shownMoney) < 1) shownMoney = save.money;
  $('#money').textContent = '$ ' + Math.round(shownMoney);
  $('#stars').textContent = '⭐ ' + save.stars;
  const h = Math.floor(world.time), m = Math.floor((world.time % 1) * 60);
  $('#clock').textContent = `${world.isNight() ? '🌙' : '☀️'} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const job = jobs.current;
  if (job) {
    $('#jobpanel').classList.remove('hidden');
    $('#job-title').textContent = `${job.def.icon} ${job.def.name}`;
    $('#job-obj').textContent = job.objective;
    if (!job.def.hidden) {
      const pi = progressInfo(job.key, save.jobXP[job.key] || 0);
      $('#job-level').textContent = pi.text; $('#job-bar').style.width = Math.round(pi.frac * 100) + '%';
      $('#job-career').classList.remove('hidden');
    } else $('#job-career').classList.add('hidden');
    const tm = $('#job-timer');
    if (job.timer != null) { const s = Math.max(0, Math.ceil(job.timer)); tm.textContent = `⏱ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; tm.classList.toggle('late', s <= 10); }
    else tm.textContent = '';
  } else $('#jobpanel').classList.add('hidden');
  const tgt = job?.target || waypoint;
  if (tgt) {
    const dx = tgt.x - player.pos.x, dz = tgt.z - player.pos.z, d = Math.hypot(dx, dz);
    if (!job?.target && waypoint && d < 8) { waypoint = null; toast('Você chegou! 📍'); }
    $('#compass').classList.remove('hidden');
    const rel = wrapAngle(Math.atan2(dx, dz) - camYaw);
    $('#arrow').style.transform = `rotate(${-rel}rad)`;
    $('#compass-dist').textContent = d > 1000 ? (d / 1000).toFixed(1) + ' km' : Math.round(d) + ' m';
  } else $('#compass').classList.add('hidden');
  const v = player.vehicle;
  $('#speedo').classList.toggle('hidden', !v);
  if (v) {
    $('#speed').textContent = Math.round((v.def.air && v.def.style !== 'heli' ? v.spd || 0 : Math.abs(v.speed())) * 3.6);
    const alt = $('#alt');
    alt.classList.toggle('hidden', !v.def.air);
    if (v.def.air) alt.textContent = `⬆ ${Math.max(0, Math.round(v.y))} m` + (v.def.style !== 'heli' ? ` · motor ${Math.round((v.throttle || 0) * 100)}%` + ((v.spd || 0) < v.def.stall && !v.grounded ? ' · ⚠ ESTOL' : '') : '');
  }
  $('#online-count').textContent = remotes.size + 1;
}

// ---------------- Main loop ----------------
let started = false, mode = 'offline', last = performance.now(), elapsed = 0, hudT = 0;
const _seat = new THREE.Vector3();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now; elapsed += dt;
  if (started && travel) {
    updateTravel(dt);
    for (const v of vehicles) if (v.ai) v.update(dt, v.ai.control(dt, vehicles), world);
    peds.update(dt, camera.position, null);
    updateRemotes(dt);
  } else if (started) {
    handlePlayer(dt);
    // vehicles
    const obstacles = [...vehicles];
    if (!player.vehicle) obstacles.push(player);
    for (const r of remotes.values()) if (!r.veh) obstacles.push(r);
    for (const v of vehicles) {
      let ctl = null;
      if (v.driver === 'local') ctl = panelOpen ? { throttle: 0, steer: 0, handbrake: true } : v.ctl;
      else if (v.ai) {
        // skip expensive AI for far away cars at a lower rate
        ctl = v.ai.control(dt, obstacles);
      }
      v.update(dt, ctl, world);
      v.mesh.visible = v.driver === 'local' || Math.abs(v.pos.x - camera.position.x) + Math.abs(v.pos.z - camera.position.z) < 380;
    }
    collideVehicles(vehicles);
    vehicleHits();
    if (player.vehicle) {
      const v = player.vehicle;
      v.seatWorld(_seat); player.pos.copy(_seat);
      player.char.root.position.copy(_seat);
      player.char.root.rotation.set(v.pitch, v.ry, v.roll);
      player.char.spin.rotation.set(0, 0, 0);
      player.char.animate(dt, { mode: v.def.style === 'bike' || v.def.style === 'boat' ? 'ride' : 'drive', steer: v.steer });
      const night = world.daylight() < 0.5;
      headlight.intensity = night ? 60 : 0;
      if (night) { v.toWorld(0, 1, v.def.len / 2, headlight.position); v.toWorld(0, -1, v.def.len / 2 + 15, headlight.target.position); }
    } else {
      player.syncMesh();
      player.char.root.rotation.x = 0; player.char.root.rotation.z = 0;
      const sp = Math.hypot(player.vel.x, player.vel.z);
      const mode2 = player.ragdoll ? 'ragdoll' : player.swimming ? 'swim' : player.held ? 'hold' : player.spraying ? 'spray' : 'walk';
      player.char.animate(dt, { speed: sp, grounded: player.grounded || player.swimming, accel: player.lastAccel * 0.05, turn: player.turn, mode: mode2, aimPitch: -camPitch * 0.6, jet: player.jetting });
    }
    player.updateHeld();
    const actorsForProps = [player.vehicle ? null : player, ...peds.list.slice(0, 60).map((n) => n.actor)];
    props.update(dt, actorsForProps, vehicles);
    peds.update(dt, camera.position, player);
    jobs.update(dt, elapsed);
    updateWater(dt);
    updateSkyPlanes(dt);
    updateGifts(dt, elapsed);
    updateRemotes(dt);
    netSend(dt);
    hudT += dt;
    if (hudT > 0.05) { updateHud(hudT); drawMinimap(); hudT = 0; }
    updateCamera(dt);
  } else {
    if (menuChar) {
      // menu: the saved character, shown beside the menu card
      const f = player.forward(), a = Math.sin(elapsed * 0.4) * 0.25;
      const cx = Math.sin(player.ry + a), cz = Math.cos(player.ry + a);
      camera.position.set(player.pos.x + cx * 4.4, player.pos.y + 1.6, player.pos.z + cz * 4.4);
      const portrait = innerWidth < innerHeight;
      const side = portrait ? 0 : innerWidth / innerHeight > 1.7 ? 1.7 : 1.3;
      camera.lookAt(player.pos.x + f.z * side, player.pos.y + (portrait ? 0.1 : 1.0), player.pos.z - f.x * side);
      player.syncMesh();
      player.char.animate(dt, { speed: 0, grounded: true, mode: 'walk' });
    } else {
      // menu: slow orbit around the plaza
      const s = world.locations.spawn;
      camera.position.set(s.x + Math.sin(elapsed * 0.1) * 120, 70, s.z + Math.cos(elapsed * 0.1) * 120);
      camera.lookAt(s.x, 10, s.z);
    }
    for (const v of vehicles) if (v.ai) v.update(dt, v.ai.control(dt, vehicles), world);
    collideVehicles(vehicles);
    updateSkyPlanes(dt);
    peds.update(dt, camera.position, null);
  }
  world.update(dt, started ? (travel && !travel.done ? travel.rocket.position : player.pos) : world.locations.spawn);
  input.endFrame();
  renderer.render(scene, camera);
}

// ---------------- Main menu: create / keep / reset the character ----------------
let menuChar = true;
let lookBeforeEdit = null;
$('#name-input').value = save.name || '';
$('#loading').textContent = 'Cidade pronta! 🏙️';
function creatorSwatches() {
  for (const [f, colors] of [['shirt', CLOTH], ['pants', CLOTH], ['skin', SKINS]]) {
    const el = $('#sw-' + f);
    el.innerHTML = colors.map((c) => `<div class="sw ${save.look[f] === c ? 'on' : ''}" data-f="${f}" data-c="${c}" style="background:${hex(c)}"></div>`).join('');
    el.querySelectorAll('.sw').forEach((sw) => sw.onclick = () => { save.look[f] = +sw.dataset.c; player.char.setLook(save.look); creatorSwatches(); });
  }
}
function showCreator(editing) {
  lookBeforeEdit = editing ? { ...save.look } : null;
  $('#profile').classList.add('hidden'); $('#creator').classList.remove('hidden');
  $('#creator-title').textContent = editing ? 'Mudar visual' : 'Crie seu personagem';
  $('#btn-char-ok').textContent = editing ? '💾 Salvar' : '✅ Criar personagem';
  $('#btn-char-back').classList.toggle('hidden', !editing);
  $('#name-input').value = save.name || '';
  creatorSwatches();
}
function showProfile() {
  $('#creator').classList.add('hidden'); $('#profile').classList.remove('hidden'); $('#reset-confirm').classList.add('hidden');
  $('#profile-name').textContent = save.name || 'Jogador';
  const lv = Object.values(save.jobXP || {}).reduce((m, x) => Math.max(m, levelOf(x)), 0);
  $('#profile-stats').textContent = `💰 $${save.money} · ⭐ ${save.stars} · ${LEVELS[lv].icon} melhor cargo: ${LEVELS[lv].name} · 🎁 ${save.gifts.length}/${world.gifts.length}`;
}
$('#menu').classList.add('side');
if (save.created) showProfile(); else showCreator(false);
$('#btn-char-ok').onclick = () => {
  save.name = ($('#name-input').value || '').trim().slice(0, 16) || 'Jogador' + Math.floor(Math.random() * 900 + 100);
  save.created = true; persist();
  if (!lookBeforeEdit) toast(`Personagem criado: ${save.name}! 🎉`);
  showProfile();
};
$('#btn-char-back').onclick = () => { if (lookBeforeEdit) { save.look = lookBeforeEdit; player.char.setLook(save.look); } showProfile(); };
$('#btn-edit-char').onclick = () => showCreator(true);
$('#btn-reset-char').onclick = () => $('#reset-confirm').classList.toggle('hidden');
$('#btn-reset-no').onclick = () => $('#reset-confirm').classList.add('hidden');
$('#btn-reset-yes').onclick = () => {
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* sem armazenamento */ }
  location.reload();
};

function startGame(m, nomeOnline) {
  // Online: o nome é o apelido da conta e não substitui o nome salvo do jogo offline.
  const nome = nomeOnline || ($('#name-input').value || '').trim().slice(0, 16) || 'Jogador' + Math.floor(Math.random() * 900 + 100);
  if (!nomeOnline) { save.name = nome; persist(); }
  mode = m; started = true; menuChar = false; $('#menu').classList.remove('side');
  evento('jogo_iniciado', { modo: m });
  sfx.init();
  $('#menu').classList.add('hidden'); $('#hud').classList.remove('hidden');
  if (input.isTouch) $('#touch').style.display = 'block';
  camTarget.copy(player.pos);
  player.hasJetpack = save.look.back === 'jetpack';
  toast(`Bem-vindo(a) a Bento City, ${nome}! 🏙️`);
  setTimeout(() => toast('Aperte J para ver os empregos · M para o mapa'), 1500);
  if (!save.stats.tutorial) { setTimeout(() => toast('Dica: há 40 presentes 🎁 escondidos pela cidade!'), 4500); save.stats.tutorial = 1; }
}

// ---------------- Online (queres.games) ----------------
// Usa a conta do site (o nome na cidade é o apelido) e as salas do Cloudflare. Quem tem o código entra na mesma cidade.
// Em testes locais dá para apontar para outro servidor: ?online=ws://localhost:8787/online/bento-city
function onlineBase() {
  const q = new URLSearchParams(location.search).get('online');
  if (q && /^wss?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(q)) return q.replace(/\/$/, '');
  return `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/online/bento-city`;
}
const httpDe = (u) => u.replace(/^ws/, 'http');
// Conta do site dentro do painel online: quem não entrou vê ali mesmo as telas de criar conta / entrar
// (o fluxo oficial do queres.games, QGConta.montar). Quem já entrou vê "Você está como ___".
let apelidoAtual = null;
async function atualizarConta() {
  const area = $('#conta-area'), acoes = $('#online-acoes');
  acoes.classList.add('hidden');
  if (!window.QGConta) { area.innerHTML = '<p class="small muted">O modo online só funciona no site queres.games.</p>'; return null; }
  area.innerHTML = '<p class="small muted">Verificando sua conta...</p>';
  let eu = null;
  try { eu = await window.QGConta.me(); } catch (e) { eu = null; }
  if (!eu) { area.innerHTML = '<p class="small muted">Não consegui falar com o servidor de contas. Confira a internet e tente de novo.</p>'; return null; }
  if (eu.logado) {
    apelidoAtual = eu.apelido;
    area.innerHTML = `<div class="conta-logada"><span>Você está como <b>${esc(eu.apelido)}</b></span><button type="button" id="btn-conta">minha conta</button></div>`;
    $('#btn-conta').onclick = async () => { await window.QGConta.perfil(); atualizarConta(); };
    acoes.classList.remove('hidden');
    return eu.apelido;
  }
  apelidoAtual = null;
  area.innerHTML = '<p class="small"><b>Para jogar online, entre na sua conta do queres.games.</b><br><span class="muted">Seu nome na cidade vai ser o apelido da conta.</span></p><div class="conta-box"></div>';
  window.QGConta.montar(area.querySelector('.conta-box'), {
    aba: 'criar',
    rotuloFechar: 'Voltar',
    aoConcluir: () => atualizarConta(),
    aoFechar: () => { $('#online-panel').classList.add('hidden'); },
  });
  return null;
}
if (window.QGConta && window.QGConta.aoMudar) {
  // Enquanto as telas de conta estão no painel, quem avisa é o aoConcluir (senão a tela "Conta criada!" com o código sumiria).
  window.QGConta.aoMudar(() => {
    if ($('#online-panel').classList.contains('hidden') || $('#conta-area .conta-box')) return;
    atualizarConta();
  });
}
async function connectOnline(opts) {
  const status = (t) => { $('#net-status').textContent = t; };
  if (!window.QGConta) { status('O modo online só funciona no site queres.games.'); return; }
  const apelido = apelidoAtual || (await atualizarConta());
  if (!apelido) { status('Entre na sua conta (acima) para jogar online.'); return; }
  const base = onlineBase();
  try {
    let codigo = opts.room;
    if (opts.mode === 'create') {
      status('Criando partida...');
      const r = await fetch(httpDe(base) + '/nova', { method: 'POST', credentials: 'include' });
      if (r.status === 401) throw new Error('Sua conta saiu. Entre de novo para jogar online.');
      if (!r.ok) throw new Error('Não consegui criar a partida agora. Tente de novo.');
      codigo = (await r.json()).codigo;
    } else status(`Entrando na partida ${codigo}...`);
    await net.connect(`${base}/sala/${codigo}?modo=${opts.mode === 'create' ? 'criar' : 'entrar'}`, { mode: opts.mode, room: codigo }, apelido, save.look);
    $('#online-pill').classList.remove('hidden');
    $('#code-pill').classList.remove('hidden'); $('#code-text').textContent = net.room;
    startGame('online', apelido);
    if (opts.mode === 'create') setTimeout(openInvite, 600);
  } catch (e) {
    status('❌ ' + e.message);
  }
}
function openInvite() {
  const link = location.origin + location.pathname;
  openPanel(`<h2>🔑 Convide seus amigos</h2>
    <p>Código da partida:</p><div class="bigcode">${esc(net.room)}</div>
    <p><b>Como seu amigo entra:</b></p>
    <ol class="small">
      <li>Abre <span class="addr">${esc(link)}</span> no navegador.</li>
      <li>Entra na conta dele do queres.games.</li>
      <li>Clica em <b>🌐 Jogar Online</b>, digita o código <b>${esc(net.room)}</b> e toca em <b>Entrar</b>.</li>
    </ol>
    <p class="small muted">Não existe chat: vocês se veem na cidade, com os apelidos das contas.</p>
    <div class="row"><button class="btn primary" id="copycode">📋 Copiar convite</button><button class="btn" id="closeinv">Jogar</button></div>`, (el) => {
    el.querySelector('#closeinv').onclick = closePanel;
    el.querySelector('#copycode').onclick = async () => {
      const txt = `Vem jogar Bento City comigo! Abra ${link}, entre na sua conta, toque em Jogar Online e use o código ${net.room}`;
      try { await navigator.clipboard.writeText(txt); toast('Convite copiado! 📋'); } catch (e) { toast('Código: ' + net.room); }
    };
  });
}
$('#code-pill').onclick = (e) => { e.stopPropagation(); openInvite(); };

$('#btn-offline').onclick = () => startGame('offline');
$('#btn-online').onclick = () => {
  const painel = $('#online-panel');
  painel.classList.toggle('hidden');
  $('#net-status').textContent = '';
  if (!painel.classList.contains('hidden')) atualizarConta();
};
$('#btn-create').onclick = () => connectOnline({ mode: 'create' });
$('#btn-join').onclick = () => {
  const code = $('#code-input').value.trim().toUpperCase();
  if (code.length !== 4) { $('#net-status').textContent = 'Digite o código de 4 letras que seu amigo recebeu.'; $('#code-input').focus(); return; }
  connectOnline({ mode: 'join', room: code });
};
$('#code-input').addEventListener('input', (e) => { e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
$('#code-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#btn-join').click(); });
// Block keyboard shortcuts from reaching the game while typing in the menu
for (const el of document.querySelectorAll('#menu input')) el.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') $('#btn-offline').focus(); });

requestAnimationFrame(frame);
window.__game = { G, world, player, vehicles, props, peds, jobs, startGame, net, renderer, scene, camera };
$('#callcar').addEventListener('click', (e) => { e.stopPropagation(); callFavorite(false); });
