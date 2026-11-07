import * as THREE from 'three';
import { createWorld, WATER, CHUNK, BIOMES, RADIUS } from './shared/world.js';
import { SPECIES, SPECIES_IDS } from './shared/species.js';
import { PIECES, PIECE_IDS, MATS, BuildIndex, snapPiece, pieceCost, WALL_H } from './shared/pieces.js';
import { smooth, clamp } from './shared/noise.js';
import { Terrain } from './terrain.js';
import { makeObjectMaterial, objectMesh } from './objects.js';
import { makeHumanoid, makeAnimal, animateAnimal, nameTag } from './models.js';
import { makePieceMesh, ghostMat, updateFires, pieceHeight } from './build.js';
import { Particles, Sfx } from './fx.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const $ = (id) => document.getElementById(id);
const isTouch = matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window && !matchMedia('(pointer: fine)').matches);
if (isTouch) document.body.classList.add('touch');
const sfx = new Sfx();

// ======================= REDE / ENTRADA =======================
let ws = null, myId = null, isHost = false, myName = '';
const joinQueue = [];
// Modo solo: o "servidor" roda dentro da própria página (usado na versão publicada como artefato)
const SOLO = !!window.ILHA_SOLO;
const SOLO_KEY = 'ilha_solo_v1';
async function connectSolo(name) {
  const { createGame } = await import('./shared/gamecore.js');
  let saved = {}; try { saved = JSON.parse(localStorage.getItem(SOLO_KEY) || '{}') || {}; } catch {}
  let game0; try { game0 = createGame({ saved }); } catch { saved = {}; game0 = createGame({}); }
  const gm = game0;
  const conn = { send(o) { const c = JSON.parse(JSON.stringify(o)); setTimeout(() => onMsg(c), 0); } };
  ws = { readyState: 1, send(str) { try { gm.onMessage(conn, JSON.parse(str)); } catch (e) { console.error(e); } }, close() {} };
  const persist = () => { try { if (gm.dirty) { localStorage.setItem(SOLO_KEY, JSON.stringify(gm.snapshot())); gm.dirty = false; } } catch {} };
  setInterval(persist, 10000); addEventListener('pagehide', () => { gm.dirty = true; persist(); });
  ws.send(JSON.stringify({ t: 'join', name }));
}
function connect(name) {
  $('lobbyMsg').className = 'msg'; $('lobbyMsg').textContent = 'Conectando…'; $('joinBtn').disabled = true;
  if (SOLO) { connectSolo(name).catch((e) => lobbyErr('Erro ao iniciar: ' + e.message)); return; }
  ws = new WebSocket((location.protocol === 'https:' ? 'wss://' : 'ws://') + location.host);
  ws.onopen = () => ws.send(JSON.stringify({ t: 'join', name }));
  ws.onmessage = (e) => onMsg(JSON.parse(e.data));
  ws.onclose = () => { if (game) { toast('Conexão perdida. Recarregue a página.'); } else { lobbyErr('Não foi possível conectar ao servidor.'); } };
}
const lobbyErr = (t) => { $('lobbyMsg').className = 'msg err'; $('lobbyMsg').textContent = t; $('joinBtn').disabled = false; };
const send = (o) => { if (ws && ws.readyState === 1) ws.send(JSON.stringify(o)); };
$('joinBtn').onclick = () => { sfx.init(); if (isTouch) { try { (document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || (() => {})).call(document.documentElement); screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {}); } catch {} } myName = $('nameInput').value.trim() || 'Viajante'; try { localStorage.setItem('ilha_nome', myName); } catch {} connect(myName); };
$('nameInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('joinBtn').click(); });
try { $('nameInput').value = localStorage.getItem('ilha_nome') || ''; } catch {}
if (SOLO) { document.querySelector('#lobby .hint').innerHTML = 'Modo <b>solo</b>: o mundo roda neste navegador e é salvo aqui. Para jogar online com amigos, use a versão com servidor.'; $('joinBtn').textContent = 'Jogar'; }

function showRequest() {
  if (!joinQueue.length) { $('hostModal').classList.add('hidden'); return; }
  const r = joinQueue[0];
  $('reqName').textContent = r.name; $('reqMore').textContent = joinQueue.length > 1 ? `(+${joinQueue.length - 1} esperando)` : '';
  $('hostModal').classList.remove('hidden');
  if (document.pointerLockElement) document.exitPointerLock();
  sfx.pick();
}
function decide(ok) { const r = joinQueue.shift(); if (r) send({ t: 'decide', id: r.id, ok }); showRequest(); }
$('allowBtn').onclick = () => decide(true); $('denyBtn').onclick = () => decide(false);

// ======================= CENA =======================
const canvas = $('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(isTouch ? Math.min(devicePixelRatio, 1.25) : Math.min(devicePixelRatio, 1.5));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 900);
scene.add(camera);
let composer = null, bloom = null;
function resize() { renderer.setSize(innerWidth, innerHeight, false); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); if (composer) { composer.setPixelRatio(renderer.getPixelRatio()); composer.setSize(innerWidth, innerHeight); } }
addEventListener('resize', resize); resize();
// brilho (bloom) só em computador: dá glow ao sol, às fogueiras e aos reflexos da água
if (!isTouch) {
  try {
    const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: 4 });
    composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.32, 0.55, 0.92);
    composer.addPass(bloom); composer.addPass(new OutputPass());
    resize();
  } catch (e) { composer = null; }
}

const hemi = new THREE.HemisphereLight(0xcfe8ff, 0x4a5a3a, 0.7); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff2d6, 1.6); sun.castShadow = true;
sun.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048); const sc = sun.shadow.camera; sc.left = -60; sc.right = 60; sc.top = 60; sc.bottom = -60; sc.near = 1; sc.far = 260; sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.05;
scene.add(sun); scene.add(sun.target);
const moon = new THREE.DirectionalLight(0x8aa2e8, 0.0); scene.add(moon);
scene.fog = new THREE.FogExp2(0x86cdf5, 0.0065);
const FOGK = isTouch ? 1.35 : 1;
const uniforms = { uTime: { value: 0 }, uDay: { value: 1 } };

// céu: sol, lua, estrelas, nuvens
const skyGroup = new THREE.Group(); scene.add(skyGroup);
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(22, 16, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xfff1b0).multiplyScalar(3.2), fog: false, toneMapped: false })); skyGroup.add(sunMesh);
const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 12), new THREE.MeshBasicMaterial({ color: 0xdfe8ff, fog: false })); skyGroup.add(moonMesh);
const starGeo = new THREE.BufferGeometry(); { const a = new Float32Array(900 * 3); for (let i = 0; i < 900; i++) { const u = Math.random() * 2 - 1, t = Math.random() * 6.283, r = Math.sqrt(1 - u * u); a[i * 3] = r * Math.cos(t) * 700; a[i * 3 + 1] = Math.abs(u) * 700; a[i * 3 + 2] = r * Math.sin(t) * 700; } starGeo.setAttribute('position', new THREE.BufferAttribute(a, 3)); }
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 2.2, sizeAttenuation: false, fog: false, transparent: true, opacity: 0, depthWrite: false })); skyGroup.add(stars);
const clouds = new THREE.Group(); scene.add(clouds);
const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.92, fog: false });
for (let i = 0; i < 22; i++) {
  const c = new THREE.Group(); const n = 4 + (Math.random() * 4 | 0);
  for (let k = 0; k < n; k++) { const s = new THREE.Mesh(new THREE.SphereGeometry(14 + Math.random() * 12, 8, 6), cloudMat); s.position.set((k - n / 2) * 18 + Math.random() * 6, Math.random() * 6, Math.random() * 14); s.scale.y = 0.45; c.add(s); }
  c.position.set((Math.random() - 0.5) * 1400, 130 + Math.random() * 50, (Math.random() - 0.5) * 1400); c.userData.sp = 2 + Math.random() * 3; clouds.add(c);
}
const skyU = { uTop: { value: new THREE.Color() }, uHor: { value: new THREE.Color() }, uSunDir: { value: new THREE.Vector3(0, 1, 0) }, uSunCol: { value: new THREE.Color(1, 0.8, 0.5) }, uGlow: { value: 1 } };
const skyDome = new THREE.Mesh(new THREE.SphereGeometry(760, 32, 20), new THREE.ShaderMaterial({
  uniforms: skyU, side: THREE.BackSide, depthWrite: false, fog: false,
  vertexShader: 'varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `varying vec3 vDir; uniform vec3 uTop, uHor, uSunDir, uSunCol; uniform float uGlow;
    void main(){
      vec3 d = normalize(vDir); float h = d.y;
      vec3 col = mix(uHor, uTop, pow(clamp(h, 0.0, 1.0), 0.5));
      if (h < 0.0) col = mix(uHor, uHor * 0.6, clamp(-h * 4.0, 0.0, 1.0));
      float sd = max(dot(d, uSunDir), 0.0);
      col += uSunCol * (pow(sd, 90.0) * 0.9 + pow(sd, 8.0) * 0.28 * uGlow + pow(sd, 2.0) * 0.07 * uGlow);
      gl_FragColor = vec4(col, 1.0);
    }`,
}));
skyDome.renderOrder = -10; skyDome.frustumCulled = false; skyGroup.add(skyDome);
const FORCE_HOUR = new URLSearchParams(location.search).has('hora') ? +new URLSearchParams(location.search).get('hora') : null; // ?hora=0.25 (teste visual)
const SKY = { nightTop: new THREE.Color(0x01030c), nightHor: new THREE.Color(0x0a1330), dayTop: new THREE.Color(0x2a78d4), dayHor: new THREE.Color(0xbfe6f8), dusk: new THREE.Color(0xff8348), duskTop: new THREE.Color(0x4a4f9a), under: new THREE.Color(0x1a5f8e) };
const sunDir = new THREE.Vector3(); const tmpC = new THREE.Color();
let dayFactor = 1, phase = 0.3;

// água
const waterGeo = new THREE.PlaneGeometry(1100, 1100, 150, 150); waterGeo.rotateX(-Math.PI / 2);
const waterMat = new THREE.MeshStandardMaterial({ color: 0x35a9c9, transparent: true, opacity: 0.76, roughness: 0.12, metalness: 0.15, side: THREE.DoubleSide });
waterMat.onBeforeCompile = (sh) => {
  sh.uniforms.uTime = uniforms.uTime; sh.uniforms.uDay = uniforms.uDay;
  sh.vertexShader = 'uniform float uTime;\nvarying float vWave; varying vec3 vWp;\n' + sh.vertexShader
    .replace('#include <beginnormal_vertex>', `
      vec3 wp0 = (modelMatrix * vec4(position, 1.0)).xyz; float t = uTime;
      float gx = cos(wp0.x*0.15+t*1.1)*0.075 + cos((wp0.x+wp0.z)*0.45+t*1.9)*0.11 + cos(wp0.x*1.3 + t*2.7)*0.03;
      float gz = cos(wp0.z*0.19+t*0.9)*0.095 + cos((wp0.x+wp0.z)*0.45+t*1.9)*0.11 + cos(wp0.z*1.1 - t*2.3)*0.03;
      vec3 objectNormal = normalize(vec3(-gx*2.2, 1.0, -gz*2.2));
      #ifdef USE_TANGENT
      vec3 objectTangent = vec3(tangent.xyz);
      #endif`)
    .replace('#include <begin_vertex>', `
      vec3 transformed = vec3(position);
      float wv = sin(wp0.x*0.15+t*1.1)*0.5 + sin(wp0.z*0.19+t*0.9)*0.5 + sin((wp0.x+wp0.z)*0.45+t*1.9)*0.25;
      transformed.y += wv * 0.2; vWave = wv; vWp = wp0;`);
  sh.fragmentShader = 'varying float vWave; varying vec3 vWp; uniform float uTime; uniform float uDay;\n' + sh.fragmentShader
    .replace('#include <color_fragment>', `#include <color_fragment>
      diffuseColor.rgb += vec3(0.06,0.1,0.12) * smoothstep(0.6, 1.3, vWave);
      diffuseColor.rgb *= 0.55 + 0.45 * uDay;`)
    .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
      float sp = pow(max(sin(vWp.x*4.7+uTime*1.9+sin(vWp.z*1.3+uTime*0.4)*2.5)*sin(vWp.z*4.3-uTime*1.5+sin(vWp.x*1.1)*2.5)*sin((vWp.x+vWp.z)*2.6+uTime), 0.0), 14.0);
      totalEmissiveRadiance += vec3(1.0, 0.95, 0.85) * sp * 0.5 * uDay;`);
};
const water = new THREE.Mesh(waterGeo, waterMat); water.position.y = WATER; water.renderOrder = 2; scene.add(water);

const particles = new Particles(scene);

// ======================= ESTADO DO JOGO =======================
let game = null, world = null, terrain = null, objMat = null;
const me = { x: 0, y: 5, z: 0, vy: 0, vx: 0, vz: 0, ry: 0, yaw: 0, pitch: 0.35, hp: 100, hunger: 80, inv: { madeira: 0, pedra: 0, palha: 0, carne: 0, assada: 0 }, weapon: 'punho', swim: false, ground: false, dead: false, sprint: false, swingT: 0, under: false };
let camDist = 4.2;
const players = new Map(), animals = new Map(), pieces = new Map(), index = new BuildIndex();
const pieceGroup = new THREE.Group(); scene.add(pieceGroup);
const keys = {}; let locked = false, chatOpen = false;
let clockOffset = 0, epoch = 0, dayMs = 600000;
const falling = []; // árvores caindo etc.
let model = null; // modelo do jogador local

function onMsg(m) {
  switch (m.t) {
    case 'wait': $('lobbyMsg').className = 'msg'; $('lobbyMsg').textContent = `⏳ Pedido enviado. Esperando ${m.host || 'o dono'} permitir sua entrada…`; break;
    case 'denied': lobbyErr('🚫 ' + m.reason); try { ws.close(); } catch {} break;
    case 'welcome': startGame(m); break;
    case 'joinRequest': joinQueue.push({ id: m.id, name: m.name }); showRequest(); break;
    case 'host': isHost = true; toast('Você agora é o dono do mundo.'); break;
    case 'playerJoin': addRemote(m.p); updatePlayerList(); break;
    case 'playerLeave': removeRemote(m.id); updatePlayerList(); break;
    case 'pl': for (const [id, x, y, z, ry, st] of m.l) { const r = players.get(id); if (r) { r.tx = x; r.ty = y; r.tz = z; r.try = ry; r.st = st; } else if (id === myId) { /* eu */ } } break;
    case 'an': syncAnimals(m.l); break;
    case 'pieceAdd': addPiece(m.p, true); if (Math.hypot(m.p.x - me.x, m.p.z - me.z) < 30) sfx.place(); break;
    case 'pieceRemove': removePiece(m.id); break;
    case 'door': { const p = pieces.get(m.id); if (p) { p.data.open = m.open; index.remove(p.data.id); index.add(p.data); sfx.door(); } break; }
    case 'inv': me.inv = m.inv; if (m.weapon) { me.weapon = m.weapon; model.setWeapon(me.weapon); } updateInv(); break;
    case 'hp': me.hp = m.hp; me.hunger = m.hunger; updateBars(); if (m.hit) { hurtFx(); } break;
    case 'toast': toast(m.text); break;
    case 'taken': { terrain.setTaken(m.id, true); const o = world.findObject(m.id); if (o) fellObject(o, m.dx, m.dz); break; }
    case 'restored': terrain.setTaken(m.id, false); break;
    case 'objHit': { const c = m.k === 'tree' ? [0x8a5a2b, 0x4aa04a] : m.k === 'rock' ? [0x999999, 0x777777] : [0x78c850]; particles.burst(m.x, m.y, m.z, c, 8, 3, 0.1, 0.6); if (Math.hypot(m.x - me.x, m.z - me.z) < 40) sfx.chop(); break; }
    case 'swing': { const r = players.get(m.id); if (r) r.model.swingNow(); break; }
    case 'weapon': { const r = players.get(m.id); if (r) r.model.setWeapon(m.weapon); break; }
    case 'animalHit': { const a = animals.get(m.id); if (a) a.obj.flash = 1; particles.burst(m.x, m.y, m.z, [0xc22, 0x900], 9, 3, 0.1, 0.5); sfx.hit(); break; }
    case 'animalDie': particles.burst(m.x, m.y + 0.5, m.z, [0xddd, 0xbbb, 0xc33], 20, 4, 0.14, 0.9); break;
    case 'dead': me.dead = true; model.st.dead = true; $('dead').classList.remove('hidden'); $('deadBy').textContent = 'por ' + m.by; break;
    case 'respawn': me.x = m.pos.x; me.y = m.pos.y; me.z = m.pos.z; me.vy = 0; me.hp = m.hp; me.hunger = m.hunger; if (!m.tp) { me.dead = false; model.st.dead = false; $('dead').classList.add('hidden'); } updateBars(); break;
    case 'chat': chatLine(m); break;
  }
}

// ======================= INÍCIO =======================
function startGame(m) {
  myId = m.id; myName = m.name; isHost = m.host; clockOffset = m.now - Date.now(); epoch = m.epoch; dayMs = m.dayMs;
  world = createWorld(m.seed);
  objMat = makeObjectMaterial(uniforms);
  terrain = new Terrain(scene, world, objMat, isTouch ? 5 : 7, isTouch ? 3 : 4);
  me.x = m.pos.x; me.y = m.pos.y; me.z = m.pos.z; me.hp = m.hp; me.hunger = m.hunger; me.inv = m.inv; me.weapon = m.weapon;
  model = makeHumanoid(0x3b82f6); model.setWeapon(me.weapon); scene.add(model.group);
  const tag = nameTag(myName, '#9fe8ff'); tag.position.y = 2.3; model.group.add(tag); model.tag = tag; tag.visible = false;
  for (const [id, t] of m.taken) terrain.taken.add(id);
  for (const p of m.pieces) addPiece(p, false);
  for (const p of m.players) addRemote(p);
  me.yaw = Math.atan2(me.x, me.z); // olha para o centro da ilha
  me.ry = Math.atan2(-Math.sin(me.yaw), -Math.cos(me.yaw));
  terrain.update(me.x, me.z, 200);
  game = true;
  $('lobby').classList.add('hidden'); $('hud').classList.remove('hidden');
  if (isTouch) { locked = true; $('touch').classList.remove('hidden'); } else $('click').classList.remove('hidden');
  updateInv(); updateBars(); updatePlayerList(); buildPalette(); renderMapProgressive();
  if (isHost) chatLine({ sys: true, text: 'Você é o dono do mundo. Quem quiser entrar precisa da sua permissão.' });
  setTimeout(() => toggleHelp(true), 400);
  requestAnimationFrame(loop);
}

// ======================= JOGADORES REMOTOS =======================
const COLORS = [0xe0533d, 0x3dbb6b, 0xd9a521, 0x9b59d6, 0x2fb5c4, 0xe86aa0, 0x888888];
function addRemote(p) {
  if (p.id === myId || players.has(p.id)) return;
  const mdl = makeHumanoid(COLORS[p.id % COLORS.length]); mdl.setWeapon(p.weapon);
  const tag = nameTag(p.name); tag.position.y = 2.3; mdl.group.add(tag);
  mdl.group.position.set(p.x, p.y, p.z); scene.add(mdl.group);
  players.set(p.id, { id: p.id, name: p.name, model: mdl, x: p.x, y: p.y, z: p.z, ry: p.ry, tx: p.x, ty: p.y, tz: p.z, try: p.ry, st: p.st, lastX: p.x, lastZ: p.z });
}
function removeRemote(id) { const r = players.get(id); if (r) { scene.remove(r.model.group); players.delete(id); } }
function updateRemotes(dt) {
  for (const r of players.values()) {
    const k = Math.min(1, dt * 12);
    r.x += (r.tx - r.x) * k; r.y += (r.ty - r.y) * k; r.z += (r.tz - r.z) * k;
    let d = r.try - r.ry; d = Math.atan2(Math.sin(d), Math.cos(d)); r.ry += d * Math.min(1, dt * 10);
    const sp = Math.hypot(r.x - r.lastX, r.z - r.lastZ) / Math.max(dt, 0.001); r.lastX = r.x; r.lastZ = r.z;
    r.sp = (r.sp || 0) * 0.8 + sp * 0.2;
    r.model.st.dead = !!(r.st & 8);
    r.model.group.position.set(r.x, r.y, r.z); r.model.group.rotation.y = r.ry;
    r.model.update(dt, r.sp, !!(r.st & 1));
  }
}
function updatePlayerList() {
  const names = [myName + ' (você)', ...[...players.values()].map((p) => p.name)];
  $('players').innerHTML = '👥 ' + (names.length) + ' online<br>' + names.join('<br>');
}

// ======================= ANIMAIS =======================
function syncAnimals(list) {
  const seen = new Set();
  for (const [id, si, x, y, z, hd, state, hp] of list) {
    seen.add(id);
    let a = animals.get(id);
    const sid = SPECIES_IDS[si];
    if (!a) {
      const obj = makeAnimal(sid); obj.group.position.set(x, y, z); scene.add(obj.group);
      a = { id, sid, obj, x, y, z, hd, tx: x, ty: y, tz: z, thd: hd, state, hp, sp: 0, tag: null, growlT: 0 }; animals.set(id, a);
    }
    a.tx = x; a.ty = y; a.tz = z; a.thd = hd; a.state = state; a.hp = hp;
  }
  for (const [id, a] of animals) if (!seen.has(id)) { scene.remove(a.obj.group); animals.delete(id); }
}
let dangerTimer = 0;
function updateAnimals(dt, t) {
  let danger = false;
  for (const a of animals.values()) {
    const k = Math.min(1, dt * 9);
    const ox = a.x, oz = a.z;
    a.x += (a.tx - a.x) * k; a.y += (a.ty - a.y) * k; a.z += (a.tz - a.z) * k;
    let d = a.thd - a.hd; d = Math.atan2(Math.sin(d), Math.cos(d)); a.hd += d * Math.min(1, dt * 8);
    const sp = Math.hypot(a.x - ox, a.z - oz) / Math.max(dt, 0.001); a.sp = a.sp * 0.8 + sp * 0.2;
    const g = a.obj.group; g.position.set(a.x, a.y, a.z); g.rotation.y = -a.hd;
    animateAnimal(a.obj, dt, a.sp, a.state, t);
    const dist = Math.hypot(a.x - me.x, a.z - me.z);
    const spc = SPECIES[a.sid];
    if (dist < 22) {
      if (!a.tag) { a.tag = nameTag(spc.nome, spc.kind === 'agressivo' ? '#ff7a7a' : spc.kind === 'neutro' ? '#ffd86b' : '#ffffff'); a.tag.position.y = (a.obj.c && a.obj.c.legs ? a.obj.c.legs.len + a.obj.c.bh : 0.8) * (a.obj.c && a.obj.c.scale || 1) + 0.9; if (a.sid === 'tubarao') a.tag.position.y = 1.6; a.tag.scale.set(2.0, 0.5, 1); g.add(a.tag); a.tag.rotation.y = 0; }
      a.tag.visible = true;
    } else if (a.tag) a.tag.visible = false;
    if (spc.kind === 'agressivo' && (a.state === 2 || a.state === 3) && dist < 24 && !me.dead) { danger = true; if (t - a.growlT > 8) { a.growlT = t; sfx.growl(spc.hp > 80 ? 2 : 1); } }
  }
  $('danger').classList.toggle('hidden', !danger);
}

// ======================= CONSTRUÇÃO =======================
const RISE = (k) => PIECES[k].rise || 0;
const SKIRT_KINDS = new Set(['piso', 'pisoR', 'parede', 'janela', 'porta', 'arco', 'pilar', 'coluna', 'cerca']);
function groundRange(k, x, z, ry) {
  const pts = [[0, 0]];
  if (['piso', 'pisoR', 'rampa'].includes(k)) pts.push([1.8, 1.8], [-1.8, 1.8], [1.8, -1.8], [-1.8, -1.8]);
  else if (['parede', 'janela', 'porta', 'arco', 'cerca'].includes(k)) pts.push([1.9, 0], [-1.9, 0]);
  let lo = 1e9, hi = -1e9; const c = Math.cos(ry), s = Math.sin(ry);
  for (const [lx, lz] of pts) { const h = world.heightAt(x + lx * c + lz * s, z - lx * s + lz * c); lo = Math.min(lo, h); hi = Math.max(hi, h); }
  return [lo, hi];
}
function skirtFor(p) {
  if (!SKIRT_KINDS.has(p.k)) return 0;
  const [lo, hi] = groundRange(p.k, p.x, p.z, p.ry);
  const d = p.y - lo; if (d < 0.1 || p.y - hi > 1.2) return 0;
  return Math.min(d + 0.3, 16);
}
const growing = [];
function addPiece(p, animate) {
  if (pieces.has(p.id)) return;
  const grp = makePieceMesh(p.k, p.m, { skirt: skirtFor(p), open: p.open });
  grp.position.set(p.x, p.y, p.z); grp.rotation.y = p.ry; grp.userData.pid = p.id;
  pieceGroup.add(grp);
  pieces.set(p.id, { data: p, group: grp }); index.add(p);
  if (animate) { grp.scale.setScalar(0.05); growing.push({ grp, t: 0 }); particles.burst(p.x, p.y + 0.2, p.z, [0xd8c8a0, 0xb0a080], 14, 2.2, 0.16, 0.7, 4); }
}
function removePiece(id) {
  const p = pieces.get(id); if (!p) return;
  particles.burst(p.data.x, p.data.y + 1, p.data.z, [0xb08a58, 0x888], 16, 3.5, 0.14, 0.8);
  pieceGroup.remove(p.group); pieces.delete(id); index.remove(id);
}
function updatePieces(dt, t) {
  for (let i = growing.length - 1; i >= 0; i--) {
    const g = growing[i]; g.t += dt / 0.4; const x = Math.min(1, g.t);
    const s = 1 + 2.7 * Math.pow(x - 1, 3) + 1.7 * Math.pow(x - 1, 2); // easeOutBack
    g.grp.scale.setScalar(Math.max(0.05, s)); if (x >= 1) { g.grp.scale.setScalar(1); growing.splice(i, 1); }
  }
  for (const p of pieces.values()) {
    const h = p.group.userData.hinge;
    if (h) { const target = p.data.open ? -1.75 : 0; h.rotation.y += (target - h.rotation.y) * Math.min(1, dt * 9); }
  }
  updateFires(t);
}
// luzes dinâmicas para as fogueiras/tochas mais próximas
const lights = []; for (let i = 0; i < 4; i++) { const l = new THREE.PointLight(0xff9a4a, 0, 14, 2); l.visible = false; scene.add(l); lights.push(l); }
let lightT = 0;
function updateLights(dt, t) {
  lightT -= dt;
  if (lightT <= 0) {
    lightT = 0.4;
    const list = [];
    for (const p of pieces.values()) if (p.group.userData.light) { const d = Math.hypot(p.data.x - me.x, p.data.z - me.z); if (d < 60) list.push([d, p]); }
    list.sort((a, b) => a[0] - b[0]);
    lights.forEach((l, i) => { const e = list[i]; if (e) { const u = e[1].group.userData.light; l.userData.tgt = e[1]; l.color.set(u.color); l.distance = u.dist; l.position.set(e[1].data.x, e[1].data.y + u.y, e[1].data.z); l.visible = true; l.userData.base = u.intensity; } else { l.visible = false; l.userData.tgt = null; } });
  }
  for (const l of lights) if (l.visible) l.intensity = l.userData.base * (0.8 + 0.2 * Math.sin(t * 15 + l.position.x)) * (0.35 + 0.65 * (1 - dayFactor));
}

let buildMode = false, selIdx = 0, matIdx = 0, rotIdx = 0, level = 0, ghost = null, ghostKey = '', ghostInfo = null, hoverPiece = null;
const raycaster = new THREE.Raycaster(); raycaster.far = 60;
function curKind() { return PIECE_IDS[selIdx]; }
function buildPalette() {
  $('palette').innerHTML = PIECE_IDS.map((k, i) => `<div data-i="${i}"><b>${i < 10 ? (i + 1) % 10 : '·'}</b> ${PIECES[k].nome}<small id="pc${i}"></small></div>`).join('');
  refreshPalette();
}
const RES_ICON = { madeira: '🪵', pedra: '🪨', palha: '🌾', carne: '🥩', assada: '🍖' };
function costText(k, m) { return Object.entries(pieceCost(k, m)).map(([r, n]) => `${n}${RES_ICON[r]}`).join(' '); }
$('palette').addEventListener('click', (e) => { const d = e.target.closest('[data-i]'); if (d) { selIdx = +d.dataset.i; refreshPalette(); } });
function refreshPalette() {
  PIECE_IDS.forEach((k, i) => { const el = $('pc' + i); if (el) { el.textContent = costText(k, MATS[matIdx]); el.parentElement.classList.toggle('sel', i === selIdx); } });
  const sel = $('palette').children[selIdx]; if (sel) sel.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
function setBuildMode(on) {
  buildMode = on; $('palette').style.display = on ? 'flex' : 'none';
  if (isTouch) { $('tbtns').classList.toggle('hidden', on); $('tbuild').classList.toggle('hidden', !on); $('ttop').classList.toggle('hidden', on); } $('buildInfo').classList.toggle('hidden', !on);
  if (!on && ghost) { scene.remove(ghost); ghost = null; ghostKey = ''; }
  updateTip();
}
function ensureGhost(k, skirt, open) {
  const key = k + '|' + MATS[matIdx] + '|' + Math.round(skirt * 2);
  if (key === ghostKey && ghost) return;
  if (ghost) scene.remove(ghost);
  ghost = makePieceMesh(k, MATS[matIdx], { skirt, open: false }); ghostKey = key;
  ghost.traverse((o) => { if (o.isMesh) { o.material = ghostMat; o.castShadow = false; o.receiveShadow = false; } if (o.isSprite) o.visible = false; });
  scene.add(ghost);
}
function terrainRay(origin, dir, maxD) {
  let prev = 0;
  for (let d = 0.5; d < maxD; d += 0.5) {
    const x = origin.x + dir.x * d, y = origin.y + dir.y * d, z = origin.z + dir.z * d;
    if (y < world.heightAt(x, z)) {
      let lo = prev, hi = d;
      for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; if (origin.y + dir.y * mid < world.heightAt(origin.x + dir.x * mid, origin.z + dir.z * mid)) hi = mid; else lo = mid; }
      return hi;
    }
    prev = d;
  }
  return null;
}
function computeGhost() {
  const k = curKind();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const o = raycaster.ray.origin, dir = raycaster.ray.direction;
  let hitP = null, hitPiece = null, dist = Infinity, norm = null;
  const hits = raycaster.intersectObjects(pieceGroup.children, true);
  for (const h of hits) { let g = h.object; while (g && g.userData.pid === undefined) g = g.parent; if (g) { hitPiece = pieces.get(g.userData.pid); hitP = h.point; dist = h.distance; norm = h.face ? h.face.normal.clone().transformDirection(h.object.matrixWorld) : null; break; } }
  const td = terrainRay(o, dir, 45);
  let baseY = null, fromTerrain = false;
  if (td !== null && td < dist) { hitP = new THREE.Vector3(o.x + dir.x * td, o.y + dir.y * td, o.z + dir.z * td); hitPiece = null; fromTerrain = true; }
  hoverPiece = hitPiece;
  if (!hitP) { ghostInfo = null; if (ghost) ghost.visible = false; return; }
  let px = hitP.x, pz = hitP.z;
  if (hitPiece && norm && Math.abs(norm.y) < 0.5 && ['cell', 'free'].includes(PIECES[k].snap)) { px += norm.x * 1.2; pz += norm.z * 1.2; }
  const sn = snapPiece(k, px, pz, rotIdx);
  let y;
  if (hitPiece) y = hitPiece.data.y - (RISE(hitPiece.data.k)) + (['rampa'].includes(hitPiece.data.k) ? 0 : 0);
  else { const [, hi] = groundRange(k, sn.x, sn.z, sn.ry); y = Math.max(Math.round(hi * 2) / 2, 0.4); }
  y += level * WALL_H + RISE(k);
  const piece = { id: -1, k, x: sn.x, y, z: sn.z, ry: sn.ry, m: MATS[matIdx], open: false };
  const [lo, hi] = groundRange(k, sn.x, sn.z, sn.ry);
  const far = Math.hypot(sn.x - me.x, sn.z - me.z) > 13;
  const cost = pieceCost(k, piece.m); const afford = Object.entries(cost).every(([r, n]) => (me.inv[r] || 0) >= n);
  const dup = index.has(piece), deepW = lo < -4, floating = y - RISE(k) - hi > 14;
  const ok = !far && afford && !dup && !deepW && !floating;
  ghostInfo = { piece, ok, why: far ? 'longe demais' : !afford ? 'faltam recursos' : dup ? 'já existe aqui' : deepW ? 'água funda' : '' };
  ensureGhost(k, skirtFor(piece));
  ghost.visible = true; ghost.position.set(piece.x, piece.y, piece.z); ghost.rotation.y = piece.ry;
  ghostMat.color.set(ok ? 0x44ff88 : 0xff4444);
  $('buildInfo').innerHTML = `<b>${PIECES[k].nome}</b> · ${MATS[matIdx]} · ${costText(k, MATS[matIdx])} · andar ${level >= 0 ? '+' : ''}${level}${ok ? '' : ` · <span style="color:#ff8a8a">${ghostInfo.why}</span>`}<br><small>R girar · T material · [ ] andar · clique esquerdo constrói · direito remove${hoverPiece ? ' · apontando: ' + PIECES[hoverPiece.data.k].nome : ''}</small>`;
}
function tryPlace() {
  if (!ghostInfo) return;
  if (!ghostInfo.ok) { toast(ghostInfo.why ? ghostInfo.why[0].toUpperCase() + ghostInfo.why.slice(1) : 'Não dá'); return; }
  const p = ghostInfo.piece; send({ t: 'place', k: p.k, x: p.x, y: p.y, z: p.z, ry: p.ry, m: p.m });
  me.swingT = 0.25; model.swingNow();
}
function tryRemove() { if (hoverPiece) send({ t: 'remove', id: hoverPiece.data.id }); }

// ======================= COLETAR: queda de árvores =======================
function fellObject(o, dx, dz) {
  const m = objectMesh(o, objMat); scene.add(m);
  const len = Math.hypot(dx, dz) || 1;
  falling.push({ m, o, t: 0, dx: dx / len, dz: dz / len });
  const col = o.t === 'tree' ? [0x4aa04a, 0x8a5a2b, 0x3a8a3a] : o.t === 'rock' ? [0x999999, 0x777777] : [0x78c850, 0xa0d070];
  particles.burst(o.x, o.y + 1, o.z, col, o.t === 'grass' ? 8 : 24, 4, 0.18, 1.0);
  if (Math.hypot(o.x - me.x, o.z - me.z) < 40) sfx.chop();
}
function updateFalling(dt) {
  for (let i = falling.length - 1; i >= 0; i--) {
    const f = falling[i]; f.t += dt;
    const k = Math.min(1, f.t / 0.9);
    if (f.o.t === 'tree') { const a = k * k * 1.45; f.m.rotation.set(f.dz * a, f.o.ry, -f.dx * a, 'YXZ'); f.m.position.y = f.o.y - 0.08 - (k > 0.9 ? (k - 0.9) * 6 : 0); }
    else f.m.scale.setScalar(f.o.s * (1 - k * k));
    if (f.t > 1.1) { scene.remove(f.m); falling.splice(i, 1); }
  }
}

// ======================= FÍSICA DO JOGADOR =======================
const colOut = {};
function solidObjects(x, z, r) {
  const cx = Math.floor(x / CHUNK), cz = Math.floor(z / CHUNK);
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) for (const o of world.chunkObjects(cx + i, cz + j)) {
    if (terrain.taken.has(o.id)) continue;
    let rad = 0;
    if (o.t === 'tree') rad = o.v === 'selva' ? 0.5 * o.s : 0.32 * o.s; else if (o.t === 'rock') rad = 0.75 * o.s; else if (o.v === 'cacto') rad = 0.35; else continue;
    const dx = x - o.x, dz = z - o.z, d = Math.hypot(dx, dz), m = rad + r;
    if (d < m && d > 1e-5) { x = o.x + dx / d * m; z = o.z + dz / d * m; }
  }
  return [x, z];
}
let lastSwim = false;
function updateMe(dt) {
  if (me.dead || chatOpen || !locked) { if (!me.dead) { me.vx *= 0.8; me.vz *= 0.8; } }
  const canInput = !me.dead && !chatOpen;
  const f = canInput && locked ? (keys.KeyW ? 1 : 0) - (keys.KeyS ? 1 : 0) : 0, r = canInput && locked ? (keys.KeyD ? 1 : 0) - (keys.KeyA ? 1 : 0) : 0;
  const fx = -Math.sin(me.yaw), fz = -Math.cos(me.yaw), rx = Math.cos(me.yaw), rz = -Math.sin(me.yaw);
  let dx = fx * f + rx * r, dz = fz * f + rz * r;
  if (canInput && joy.on) { dx += fx * joy.y + rx * joy.x; dz += fz * joy.y + rz * joy.x; }
  let dl = Math.hypot(dx, dz); if (dl > 1) { dx /= dl; dz /= dl; dl = 1; }
  const analog = canInput && joy.on ? Math.min(1, Math.hypot(joy.x, joy.y)) : 1;
  const hGround = world.heightAt(me.x, me.z);
  const bs = index.surfaceAt(me.x, me.z, me.y, 0.65);
  const support = Math.max(hGround, bs);
  const depth = WATER - support;
  const swimming = depth > 1.15 && bs === -Infinity;
  me.sprint = (!!keys.ShiftLeft || (joy.on && analog > 0.92)) && me.hunger > 0 && dl > 0;
  let speed = swimming ? (me.sprint ? 4.8 : 3.0) : (me.sprint ? 7.6 : 4.8);
  if (!swimming && depth > 0.3) speed *= 0.75;
  if (me.swingT > 0) speed *= 0.8;
  const k = Math.min(1, dt * (me.ground || swimming ? 12 : 3));
  me.vx += (dx * speed - me.vx) * k; me.vz += (dz * speed - me.vz) * k;
  let nx = me.x + me.vx * dt, nz = me.z + me.vz * dt;
  // limites do mundo
  const rr = Math.hypot(nx, nz); if (rr > 2400) { nx *= 2400 / rr; nz *= 2400 / rr; }
  // colisões
  index.resolve(nx, nz, me.y, 0.35, 1.8, colOut); nx = colOut.x; nz = colOut.z;
  [nx, nz] = solidObjects(nx, nz, 0.35);
  me.x = nx; me.z = nz;
  const g2 = world.heightAt(me.x, me.z), bs2 = index.surfaceAt(me.x, me.z, me.y, 0.65), sup2 = Math.max(g2, bs2);
  const jump = canInput && locked && (keys.Space || touchHold.jump);
  if (swimming) {
    const floatY = WATER - 1.15;
    let vyT;
    if (jump) vyT = 2.8; else if (canInput && locked && (keys.KeyC || keys.ControlLeft || touchHold.dive)) vyT = -2.8; else vyT = clamp((floatY - me.y) * 3, -1.6, 1.6);
    me.vy += (vyT - me.vy) * Math.min(1, dt * 8);
    me.y += me.vy * dt; me.y = clamp(me.y, g2 + 0.15, WATER - 0.45);
    me.ground = false;
    if (!lastSwim) { sfx.splash(); particles.burst(me.x, WATER, me.z, [0xbfe8ff, 0xffffff], 18, 3, 0.12, 0.7); }
  } else {
    me.vy -= 22 * dt;
    me.y += me.vy * dt;
    if (me.y <= sup2) { me.y = sup2; me.vy = 0; me.ground = true; } else me.ground = me.y - sup2 < 0.06 && me.vy <= 0;
    if (jump && me.ground) { me.vy = 7.4; me.ground = false; }
    if (lastSwim) { sfx.splash(); }
  }
  lastSwim = swimming; me.swim = swimming;
  // direção do corpo
  const sp = Math.hypot(me.vx, me.vz);
  if (camDist < 0.8 || me.swingT > 0) { me.ry = Math.atan2(fx, fz); }
  else if (sp > 0.4) { const want = Math.atan2(me.vx, me.vz); let d = want - me.ry; d = Math.atan2(Math.sin(d), Math.cos(d)); me.ry += d * Math.min(1, dt * 14); }
  me.speed = sp;
  if (me.swingT > 0) me.swingT -= dt;
  if (me.y < -60) { me.y = 5; }
}

// ======================= ENTRADA (teclado / mouse) =======================
let swingHeld = false, swingCd = 0;
const joy = { on: false, x: 0, y: 0 }, touchHold = { jump: false, dive: false };
function doSwing() {
  if (me.swingT > 0.1 || me.dead) return;
  me.swingT = 0.4; model.swingNow();
  send({ t: 'swing', dx: -Math.sin(me.yaw), dz: -Math.cos(me.yaw) });
  sfx.pick();
}
function nearestPiece(kind, r) {
  let best = null, bd = r;
  for (const p of pieces.values()) { if (p.data.k !== kind) continue; const d = Math.hypot(p.data.x - me.x, p.data.z - me.z); if (d < bd && Math.abs(p.data.y - me.y) < 4) { bd = d; best = p; } }
  return best;
}
function interact() {
  const door = nearestPiece('porta', 3.6); if (door) { send({ t: 'door', id: door.data.id }); return; }
  const bed = nearestPiece('cama', 3.2); if (bed) { send({ t: 'sleep', id: bed.data.id }); return; }
  if (nearestPiece('fogueira', 3.8)) { send({ t: 'cook' }); return; }
  toast('Nada para interagir aqui.');
}
addEventListener('keydown', (e) => {
  if (!game) return;
  if (chatOpen) { if (e.key === 'Escape') closeChat(); return; }
  if (e.code === 'Enter') { openChat(); e.preventDefault(); return; }
  keys[e.code] = true;
  if (e.code === 'KeyH') toggleHelp();
  if (e.code === 'KeyM') { $('mapOverlay').classList.toggle('hidden'); }
  if (e.code === 'KeyV') { camDist = camDist < 0.8 ? 4.2 : 0; model.group.visible = camDist > 0.8; }
  if (e.code === 'KeyB') setBuildMode(!buildMode);
  if (e.code === 'KeyE') interact();
  if (e.code === 'KeyF') send({ t: 'eat' });
  if (e.code === 'KeyQ') send({ t: 'craft' });
  if (e.code === 'KeyX' && buildMode) tryRemove();
  if (buildMode) {
    if (e.code === 'KeyR') { rotIdx = (rotIdx + 1) % 4; }
    if (e.code === 'KeyT') { matIdx = (matIdx + 1) % MATS.length; refreshPalette(); }
    if (e.code === 'BracketRight' || e.code === 'PageUp') level = Math.min(level + 1, 6);
    if (e.code === 'BracketLeft' || e.code === 'PageDown') level = Math.max(level - 1, -2);
    const dgt = e.code.startsWith('Digit') ? +e.code.slice(5) : -1;
    if (dgt >= 0) { selIdx = clamp((dgt === 0 ? 9 : dgt - 1) + (e.shiftKey ? 10 : 0), 0, PIECE_IDS.length - 1); refreshPalette(); }
  }
  if (e.code === 'Space' || e.code === 'ControlLeft') e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });
addEventListener('wheel', (e) => { if (!game || !buildMode) return; selIdx = (selIdx + (e.deltaY > 0 ? 1 : -1) + PIECE_IDS.length) % PIECE_IDS.length; refreshPalette(); });
addEventListener('mousemove', (e) => { if (!locked || isTouch) return; if (lockFail && !(e.buttons & 2)) return; me.yaw -= e.movementX * 0.0024; me.pitch = clamp(me.pitch + e.movementY * 0.0024, -1.0, 1.35); });
canvas.addEventListener('mousedown', (e) => {
  if (!game || isTouch) return;
  if (!locked) { if (!$('hostModal').classList.contains('hidden')) return; try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => document.dispatchEvent(new Event('pointerlockerror'))); } catch { document.dispatchEvent(new Event('pointerlockerror')); } sfx.init(); return; }
  if (e.button === 0) { if (buildMode) tryPlace(); else { swingHeld = true; doSwing(); } }
  if (e.button === 2 && buildMode) tryRemove();
});
addEventListener('mouseup', (e) => { if (e.button === 0) swingHeld = false; });
addEventListener('contextmenu', (e) => e.preventDefault());
let lockFail = false;
document.addEventListener('pointerlockerror', () => { if (isTouch) return; lockFail = true; locked = true; $('click').classList.add('hidden'); toast('Segure o botão direito e arraste para olhar'); });
document.addEventListener('pointerlockchange', () => { if (lockFail) return; locked = document.pointerLockElement === canvas; $('click').classList.toggle('hidden', locked || !game); if (!locked) for (const k in keys) keys[k] = false; });
function openChat() { chatOpen = true; $('chatInput').classList.remove('hidden'); $('chatInput').focus(); if (document.pointerLockElement) document.exitPointerLock(); }
function closeChat() { chatOpen = false; $('chatInput').classList.add('hidden'); $('chatInput').value = ''; $('chatInput').blur(); }
$('chatInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const v = $('chatInput').value.trim(); if (v) send({ t: 'chat', text: v }); closeChat(); } e.stopPropagation(); if (e.key === 'Escape') closeChat(); });
function chatLine(m) {
  const d = document.createElement('div'); if (m.sys) d.className = 'sys'; d.textContent = m.sys ? m.text : `${m.name}: ${m.text}`;
  $('chatLog').appendChild(d); while ($('chatLog').children.length > 7) $('chatLog').firstChild.remove();
  setTimeout(() => { d.style.opacity = 0; setTimeout(() => d.remove(), 1000); }, 12000);
}

function toggleHelp(force) {
  const el = isTouch ? $('helpTouch') : $('help');
  el.classList.toggle('hidden', force === undefined ? !el.classList.contains('hidden') : !force);
}
$('help').addEventListener('click', () => toggleHelp(false)); $('helpTouch').addEventListener('click', () => toggleHelp(false));
// ======================= HUD =======================
let toastT = 0;
function toast(t) { $('toast').textContent = t; $('toast').classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => $('toast').classList.remove('show'), 1800); }
function updateBars() { $('hpFill').style.width = me.hp + '%'; $('hpTxt').textContent = '❤ ' + Math.round(me.hp); $('foodFill').style.width = me.hunger + '%'; $('foodTxt').textContent = '🍖 ' + Math.round(me.hunger); }
function updateInv() {
  $('inv').innerHTML = Object.entries(me.inv).map(([k, v]) => `<div class="${v ? '' : 'zero'}">${RES_ICON[k]} ${k} ${v}</div>`).join('') + `<div>🗡 ${me.weapon === 'lanca' ? 'lança' : 'punhos'}</div>`;
  if (buildMode) refreshPalette();
}
function hurtFx() { $('vignette').style.opacity = 1; setTimeout(() => ($('vignette').style.opacity = 0), 250); sfx.hurt(); }
function updateTip() {
  if (isTouch) return; $('tip').textContent = buildMode ? 'CONSTRUIR · B sai · 1-9/roda escolhe peça · H ajuda' : 'Clique: atacar/coletar · B construir · E interagir · F comer · Q lança · M mapa · H ajuda'; }
updateTip(); $('palette').style.display = 'none';

// ======================= MAPA =======================
const MAP_N = 512, MAP_SPAN = 3600; const mapCv = document.createElement('canvas'); mapCv.width = mapCv.height = MAP_N; const mapCx = mapCv.getContext('2d'); let mapRow = 0;
function renderMapProgressive() {
  if (mapRow >= MAP_N) return;
  const img = mapCx.createImageData(MAP_N, 16);
  for (let j = 0; j < 16; j++) for (let i = 0; i < MAP_N; i++) {
    const s = world.sample((i / MAP_N - 0.5) * MAP_SPAN, ((mapRow + j) / MAP_N - 0.5) * MAP_SPAN); const c = BIOMES[s.b].m; const sh = s.h > 0 ? 0.85 + Math.min(0.3, s.h / 80) : 1;
    const o = (j * MAP_N + i) * 4; img.data[o] = Math.min(255, ((c >> 16) & 255) * sh); img.data[o + 1] = Math.min(255, ((c >> 8) & 255) * sh); img.data[o + 2] = Math.min(255, (c & 255) * sh); img.data[o + 3] = 255;
  }
  mapCx.putImageData(img, 0, mapRow); mapRow += 16; requestAnimationFrame(renderMapProgressive);
}
const mm = $('minimap').getContext('2d'); mm.imageSmoothingEnabled = false;
function toMap(x) { return (x / MAP_SPAN + 0.5) * MAP_N; }
function drawMinimap() {
  const s = 150, view = 520; const px = toMap(me.x), pz = toMap(me.z), half = view / MAP_SPAN * MAP_N / 2;
  mm.save(); mm.clearRect(0, 0, s, s); mm.beginPath(); mm.arc(s / 2, s / 2, s / 2, 0, 7); mm.clip();
  mm.fillStyle = '#0b2a6b'; mm.fillRect(0, 0, s, s);
  mm.drawImage(mapCv, px - half, pz - half, half * 2, half * 2, 0, 0, s, s);
  for (const p of players.values()) { const dx = (p.x - me.x) / view * s, dz = (p.z - me.z) / view * s; mm.fillStyle = '#5cff9d'; mm.fillRect(s / 2 + dx - 2, s / 2 + dz - 2, 5, 5); }
  mm.translate(s / 2, s / 2); mm.rotate(-me.ry + Math.PI); mm.fillStyle = '#fff'; mm.strokeStyle = '#000'; mm.beginPath(); mm.moveTo(0, -7); mm.lineTo(5, 6); mm.lineTo(0, 3); mm.lineTo(-5, 6); mm.closePath(); mm.fill(); mm.stroke();
  mm.restore();
}
function drawBigMap() {
  const c = $('bigmap').getContext('2d'), s = 640; c.imageSmoothingEnabled = false; c.drawImage(mapCv, 0, 0, s, s);
  const m = s / MAP_SPAN;
  c.fillStyle = '#fff'; c.font = 'bold 14px sans-serif';
  for (const p of players.values()) { c.fillStyle = '#5cff9d'; c.fillRect((p.x + MAP_SPAN / 2) * m - 3, (p.z + MAP_SPAN / 2) * m - 3, 7, 7); c.fillText(p.name, (p.x + MAP_SPAN / 2) * m + 6, (p.z + MAP_SPAN / 2) * m); }
  c.fillStyle = '#ff3b3b'; c.beginPath(); c.arc((me.x + MAP_SPAN / 2) * m, (me.z + MAP_SPAN / 2) * m, 5, 0, 7); c.fill(); c.fillStyle = '#fff'; c.fillText('Você', (me.x + MAP_SPAN / 2) * m + 8, (me.z + MAP_SPAN / 2) * m);
  let x = 8, y = 626; c.font = '12px sans-serif';
  for (const k of ['mar_profundo', 'mar', 'recife', 'praia', 'deserto', 'planicie', 'floresta', 'selva', 'pantano', 'taiga', 'neve', 'montanha']) { c.fillStyle = '#' + BIOMES[k].m.toString(16).padStart(6, '0'); c.fillRect(x, y - 10, 10, 10); c.fillStyle = '#fff'; c.fillText(BIOMES[k].nome, x + 13, y); x += 24 + BIOMES[k].nome.length * 6; if (x > 540) { x = 8; y -= 14; } }
}

// ======================= CÉU / LUZ =======================
function updateSky(t) {
  phase = FORCE_HOUR !== null ? FORCE_HOUR : (((Date.now() + clockOffset - epoch) / dayMs) % 1 + 1) % 1;
  const ang = phase * Math.PI * 2;
  sunDir.set(Math.cos(ang) * 0.9, Math.sin(ang), 0.35).normalize();
  const e = sunDir.y; dayFactor = smooth(-0.12, 0.28, e);
  const duskK = Math.max(0, 1 - Math.abs(e) / 0.28) * 0.75;
  const dk = duskK * (e > -0.2 ? 1 : 0);
  skyU.uTop.value.copy(SKY.nightTop).lerp(SKY.dayTop, dayFactor).lerp(SKY.duskTop, dk * 0.55);
  skyU.uHor.value.copy(SKY.nightHor).lerp(SKY.dayHor, dayFactor).lerp(SKY.dusk, dk * 0.75);
  skyU.uSunDir.value.copy(sunDir); skyU.uSunCol.value.set(1.0, 0.82, 0.55).lerp(new THREE.Color(1.0, 0.45, 0.2), dk).multiplyScalar(dayFactor > 0.02 || e > -0.15 ? 1 : 0);
  skyU.uGlow.value = e > -0.1 ? 1 : 0;
  tmpC.copy(skyU.uHor.value);
  if (me.under) { tmpC.copy(SKY.under).multiplyScalar(0.25 + 0.75 * dayFactor); scene.background = tmpC.clone(); } else scene.background = null;
  skyDome.visible = !me.under;
  scene.fog.color.copy(tmpC);
  scene.fog.density = me.under ? 0.05 : (0.0062 + (1 - dayFactor) * 0.0015) * FOGK;
  sun.intensity = 2.0 * dayFactor * (me.under ? 0.5 : 1); sun.color.set(0xfff3dc).lerp(new THREE.Color(0xff9a50), duskK);
  moon.intensity = 0.9 * (1 - dayFactor); moon.position.copy(sunDir).multiplyScalar(-1);
  hemi.intensity = 0.46 + 0.34 * dayFactor; hemi.color.copy(skyU.uTop.value).lerp(new THREE.Color(0xffffff), 0.45); hemi.groundColor.set(0x5a6a3a).lerp(new THREE.Color(0x1c2438), 1 - dayFactor);
  uniforms.uDay.value = dayFactor;
  sun.position.set(me.x + sunDir.x * 90, me.y + sunDir.y * 90, me.z + sunDir.z * 90); sun.target.position.set(me.x, me.y, me.z);
  skyGroup.position.copy(camera.position);
  sunMesh.position.copy(sunDir).multiplyScalar(520); moonMesh.position.copy(sunDir).multiplyScalar(-520);
  sunMesh.visible = e > -0.1; moonMesh.visible = e < 0.1; stars.material.opacity = clamp(1 - dayFactor * 1.4, 0, 1);
  stars.rotation.y = phase * 6.28;
  cloudMat.color.copy(tmpC).lerp(new THREE.Color(0xffffff), 0.6 * dayFactor + 0.1).multiplyScalar(0.35 + 0.65 * dayFactor);
  clouds.visible = !me.under;
  sfx.setWind(Math.min(1, me.speed / 8)); sfx.setUnderwater(me.under);
}
function updateClouds(dt) { for (const c of clouds.children) { c.position.x += c.userData.sp * dt; if (c.position.x - me.x > 700) c.position.x -= 1400; if (c.position.x - me.x < -700) c.position.x += 1400; if (c.position.z - me.z > 700) c.position.z -= 1400; if (c.position.z - me.z < -700) c.position.z += 1400; } }

// ======================= CONTROLES DE TOQUE =======================
function nextMat() { matIdx = (matIdx + 1) % MATS.length; refreshPalette(); }
const ACTIONS = {
  use: interact, eat: () => send({ t: 'eat' }), craft: () => send({ t: 'craft' }), build: () => setBuildMode(!buildMode),
  view: () => { camDist = camDist < 0.8 ? 4.2 : 0; model.group.visible = camDist > 0.8; }, map: () => $('mapOverlay').classList.toggle('hidden'),
  chat: () => openChat(), help: () => toggleHelp(), place: tryPlace, remove: tryRemove, rot: () => { rotIdx = (rotIdx + 1) % 4; },
  mat: nextMat, up: () => { level = Math.min(level + 1, 6); }, down: () => { level = Math.max(level - 1, -2); },
};
if (isTouch) {
  const preventAll = (e) => { if (e.cancelable) e.preventDefault(); };
  document.addEventListener('touchmove', preventAll, { passive: false }); document.addEventListener('gesturestart', preventAll);
  document.addEventListener('contextmenu', preventAll);
  $('mapOverlay').addEventListener('click', () => $('mapOverlay').classList.add('hidden'));
  // botões
  for (const b of document.querySelectorAll('#touch button')) {
    const k = b.dataset.k;
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation(); try { b.setPointerCapture(e.pointerId); } catch {} b.classList.add('on');
      sfx.init();
      if (k === 'attack') { if (buildMode) tryPlace(); else { swingHeld = true; doSwing(); } }
      else if (k === 'jump') touchHold.jump = true; else if (k === 'dive') touchHold.dive = true;
      else if (ACTIONS[k]) ACTIONS[k]();
    });
    const up = (e) => { b.classList.remove('on'); if (k === 'attack') swingHeld = false; if (k === 'jump') touchHold.jump = false; if (k === 'dive') touchHold.dive = false; };
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
  }
  // joystick
  const J = $('joy'), K = $('joyKnob'); let jid = null;
  const jmove = (e) => { const r = J.getBoundingClientRect(), R = r.width / 2; let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R); const d = Math.hypot(dx, dy), m = Math.min(1, d / R); if (d > 0) { dx /= d; dy /= d; } joy.x = dx * m; joy.y = -dy * m; K.style.transform = `translate(${dx * m * R * 0.7}px, ${dy * m * R * 0.7}px)`; };
  J.addEventListener('pointerdown', (e) => { e.preventDefault(); jid = e.pointerId; try { J.setPointerCapture(jid); } catch {} joy.on = true; jmove(e); sfx.init(); });
  J.addEventListener('pointermove', (e) => { if (e.pointerId === jid) jmove(e); });
  const jend = (e) => { if (e.pointerId !== jid) return; jid = null; joy.on = false; joy.x = joy.y = 0; K.style.transform = ''; };
  J.addEventListener('pointerup', jend); J.addEventListener('pointercancel', jend);
  // olhar: arrastar a tela
  let lid = null, lx = 0, ly = 0;
  canvas.addEventListener('pointerdown', (e) => { if (lid !== null || !game) return; lid = e.pointerId; lx = e.clientX; ly = e.clientY; try { canvas.setPointerCapture(lid); } catch {} });
  canvas.addEventListener('pointermove', (e) => { if (e.pointerId !== lid) return; me.yaw -= (e.clientX - lx) * 0.0055; me.pitch = clamp(me.pitch + (e.clientY - ly) * 0.0055, -1.0, 1.35); lx = e.clientX; ly = e.clientY; });
  const lend = (e) => { if (e.pointerId === lid) lid = null; };
  canvas.addEventListener('pointerup', lend); canvas.addEventListener('pointercancel', lend);
  // chat: ao enviar, mantém o controle de toque
}
window.__touch = { joy, touchHold, ACTIONS };

// ======================= LAÇO PRINCIPAL =======================
let last = performance.now(), tAcc = 0, sendT = 0, hudT = 0, fpsAcc = 0, fpsN = 0, fpsChecked = false, curBiome = '';
function loop(now) {
  requestAnimationFrame(loop);
  const dt = Math.min(0.06, (now - last) / 1000); last = now; tAcc += dt; uniforms.uTime.value = tAcc;
  updateMe(dt);
  if (swingHeld && locked && !buildMode) doSwing();
  // câmera
  const head = new THREE.Vector3(me.x, me.y + (me.swim ? 1.0 : 1.55), me.z);
  const cp = Math.cos(me.pitch), back = new THREE.Vector3(Math.sin(me.yaw) * cp, Math.sin(me.pitch), Math.cos(me.yaw) * cp);
  if (camDist < 0.8) { camera.position.copy(head).addScaledVector(back, 0.05); camera.lookAt(head.clone().sub(back)); }
  else {
    const target = head.clone(); target.y += 0.2; let d = camDist;
    const pos = target.clone().addScaledVector(back, d);
    const gh = world.heightAt(pos.x, pos.z); if (pos.y < gh + 0.4) pos.y = gh + 0.4;
    camera.position.copy(pos); camera.lookAt(target);
  }
  me.under = camera.position.y < WATER; $('underwater').style.opacity = me.under ? 1 : 0;
  // modelo local
  model.group.position.set(me.x, me.y, me.z); model.group.rotation.y = me.ry;
  model.update(dt, me.speed || 0, me.swim);
  model.group.visible = camDist > 0.8;
  updateRemotes(dt); updateAnimals(dt, tAcc); updatePieces(dt, tAcc); updateLights(dt, tAcc); updateFalling(dt); particles.update(dt);
  terrain.update(me.x, me.z, 4);
  water.position.set(Math.round(me.x / 8) * 8, WATER, Math.round(me.z / 8) * 8);
  updateSky(tAcc); updateClouds(dt);
  if (buildMode) computeGhost();
  // rede
  sendT -= dt;
  if (sendT <= 0) { sendT = 0.066; send({ t: 'move', x: +me.x.toFixed(2), y: +me.y.toFixed(2), z: +me.z.toFixed(2), ry: +me.ry.toFixed(2), st: (me.swim ? 1 : 0) | (me.sprint ? 2 : 0) }); }
  // HUD lento
  hudT -= dt;
  if (hudT <= 0) {
    hudT = 0.3; const b = world.sample(me.x, me.z).b; if (b !== curBiome) { curBiome = b; $('biome').textContent = BIOMES[b].nome; }
    $('coords').textContent = `${Math.round(me.x)}, ${Math.round(me.z)}${me.swim ? ' · nadando' : ''}`;
    drawMinimap(); if (!$('mapOverlay').classList.contains('hidden')) drawBigMap();
  }
  // desempenho: desliga sombras se estiver muito lento
  if (!fpsChecked) { fpsAcc += dt; fpsN++; if (fpsAcc > 4) { fpsChecked = true; const fps = fpsN / fpsAcc; window.__fps = fps; if (fps < 22) { composer = null; renderer.shadowMap.enabled = false; sun.castShadow = false; scene.traverse((o) => { if (o.material) o.material.needsUpdate = true; }); } } }
  if (composer) composer.render(dt); else renderer.render(scene, camera);
}
window.__game = { send, forceLock() { locked = true; }, keys, setBuild: setBuildMode, sel(i) { selIdx = i; refreshPalette(); }, me, players, animals, pieces, get world() { return world; }, scene, camera, renderer };
