import * as THREE from 'three';
import { CLASSES, ELEMENTS, COLORS, SKINS, HATS, DEFAULT_CHARS, buildCharacter, poseCharacter, randomChar } from './character.js';
import { FightGame, escapeHtml } from './fight.js';
import { BattlefieldGame } from './battlefield.js';
import { input, pollPads } from './input.js';
import { initAudio } from './audio.js';
import { touch } from './touch.js';

touch.init();

// ---------------- Renderizador principal ----------------
const canvas = document.getElementById('game');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, touch.enabled ? 1 : 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

// ---------------- Personagens salvos ----------------
let chars;
try { chars = JSON.parse(localStorage.getItem('furia_chars')); } catch (e) { chars = null; }
if (!Array.isArray(chars) || chars.length !== 2 || !chars.every((c) => c && CLASSES[c.cls] && ELEMENTS[c.el])) chars = DEFAULT_CHARS.map((c) => ({ ...c }));
function saveChars() { try { localStorage.setItem('furia_chars', JSON.stringify(chars)); } catch (e) { /* armazenamento indisponível */ } }

// ---------------- Telas ----------------
const screens = ['menu', 'creator', 'controls'];
function show(id) {
  for (const s of screens) document.getElementById(s).classList.toggle('active', s === id);
  if (id === 'menu') { refreshMenuChars(); rebuildBackdrop(); }
  if (id === 'creator') openCreator();
}
document.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
  initAudio();
  if (b.dataset.edit != null) editIdx = +b.dataset.edit;
  show(b.dataset.go);
}));
document.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => { initAudio(); startMode(b.dataset.mode); }));

function refreshMenuChars() {
  document.getElementById('menuChars').innerHTML = chars.map((c, i) =>
    `<div class="mc">J${i + 1}: <b>${escapeHtml(c.name)}</b> — ${CLASSES[c.cls].ico} ${CLASSES[c.cls].nome} · ${ELEMENTS[c.el].ico} ${ELEMENTS[c.el].nome}</div>`).join('');
}

// ---------------- Cenário de fundo do menu ----------------
const backdrop = { scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100), models: [] };
{
  const s = backdrop.scene;
  s.background = new THREE.Color(0x120c0a);
  s.fog = new THREE.Fog(0x120c0a, 8, 30);
  s.add(new THREE.HemisphereLight(0xffd0a0, 0x200a05, 0.8));
  const key = new THREE.DirectionalLight(0xffb070, 2.2);
  key.position.set(4, 8, 6); key.castShadow = true; s.add(key);
  const rim = new THREE.PointLight(0x3d8bff, 30, 20); rim.position.set(-4, 3, -3); s.add(rim);
  const floor = new THREE.Mesh(new THREE.CylinderGeometry(4, 4.4, 0.4, 40), new THREE.MeshStandardMaterial({ color: 0x2a2320, roughness: 0.9 }));
  floor.position.y = -0.2; floor.receiveShadow = true; s.add(floor);
  backdrop.camera.position.set(0, 2.4, 7.5);
}
function rebuildBackdrop() {
  for (const m of backdrop.models) backdrop.scene.remove(m.root);
  backdrop.models = chars.map((c, i) => {
    const m = buildCharacter(c);
    m.root.position.set(i === 0 ? -1.3 : 1.3, 0, 0);
    m.root.rotation.y = i === 0 ? 0.35 : -0.35;
    backdrop.scene.add(m.root);
    return m;
  });
}

// ---------------- Criador de personagem ----------------
let editIdx = 0;
const preview = { canvas: document.getElementById('preview'), renderer: null, scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(35, 1, 0.1, 50), model: null, t: 0 };
{
  const s = preview.scene;
  s.add(new THREE.HemisphereLight(0xffe0c0, 0x302018, 1.0));
  const l = new THREE.DirectionalLight(0xffffff, 2); l.position.set(3, 5, 4); s.add(l);
  const r = new THREE.PointLight(0xff7a1a, 15, 10); r.position.set(-2, 2, -2); s.add(r);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(1, 1.1, 0.15, 32), new THREE.MeshStandardMaterial({ color: 0x3a2a1c }));
  base.position.y = -0.075; s.add(base);
  preview.camera.position.set(0, 1.4, 6);
  preview.camera.lookAt(0, 1.05, 0);
}

function openCreator() {
  if (!preview.renderer) {
    preview.renderer = new THREE.WebGLRenderer({ canvas: preview.canvas, antialias: true, alpha: true });
    preview.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    preview.renderer.outputColorSpace = THREE.SRGBColorSpace;
    preview.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }
  renderCreatorUI();
}

function renderCreatorUI() {
  const c = chars[editIdx];
  document.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', +t.dataset.player === editIdx));
  document.getElementById('cNext').textContent = editIdx === 0 ? '👥 Salvar e montar o Jogador 2 →' : '← Salvar e voltar ao Jogador 1';
  document.getElementById('cTitle').textContent = `Montar Personagem — Jogador ${editIdx + 1}`;
  const nameIn = document.getElementById('cName');
  nameIn.value = c.name;
  document.getElementById('cClasses').innerHTML = Object.entries(CLASSES).map(([k, v]) =>
    `<div class="card ${c.cls === k ? 'sel' : ''}" data-cls="${k}"><div class="ico">${v.ico}</div><b>${v.nome}</b><small>${v.desc}</small></div>`).join('');
  document.getElementById('cElements').innerHTML = Object.entries(ELEMENTS).map(([k, v]) =>
    `<div class="chip ${c.el === k ? 'sel' : ''}" data-el="${k}">${v.ico} ${v.nome}</div>`).join('');
  document.getElementById('cColors').innerHTML = COLORS.map((col) => `<div class="sw ${c.color === col ? 'sel' : ''}" data-color="${col}" style="background:${col}"></div>`).join('');
  document.getElementById('cSkins').innerHTML = SKINS.map((col) => `<div class="sw ${c.skin === col ? 'sel' : ''}" data-skin="${col}" style="background:${col}"></div>`).join('');
  document.getElementById('cHats').innerHTML = HATS.map((h) => `<div class="chip ${c.hat === h.id ? 'sel' : ''}" data-hat="${h.id}">${h.nome}</div>`).join('');

  const cls = CLASSES[c.cls]; const el = ELEMENTS[c.el];
  const stat = (lbl, v, max) => `<div class="stat">${lbl}<i><em style="width:${Math.min(100, v / max * 100)}%"></em></i></div>`;
  document.getElementById('cInfo').innerHTML = `
    <h3>${cls.ico} ${cls.nome} de ${el.ico} ${el.nome}</h3>
    ${stat('Vida', cls.hp, 180)}${stat('Velocidade', cls.speed, 8.5)}${stat('Força', cls.dmg, 1.3)}${stat('Defesa', cls.def, 1.4)}
    <b>Ataques no modo Luta:</b>
    <ul><li>Leve: ${cls.moves.light} (combo de 3)</li><li>Pesado: ${cls.moves.heavy}</li>
    <li>Especial: ${cls.moves.special} — ${el.desc}</li><li>Ultimate: <b>${cls.moves.ult}</b></li></ul>
    <b>No Battlefield:</b> classe <b>${cls.bf.role}</b> · arma: ${({ rifle: 'Fuzil de Assalto', sniper: 'Rifle de Precisão', lmg: 'Metralhadora Pesada', smg: 'Submetralhadora' })[cls.bf.weapon]} + Pistola ·
    habilidade: <b>${cls.bf.abilityName}</b> · bônus do elemento: ${el.bf}`;
  rebuildPreview();
}

function rebuildPreview() {
  if (preview.model) preview.scene.remove(preview.model.root);
  preview.model = buildCharacter(chars[editIdx]);
  preview.scene.add(preview.model.root);
}

document.getElementById('creator').addEventListener('click', (e) => {
  const t = e.target.closest('[data-cls],[data-el],[data-color],[data-skin],[data-hat],[data-player]');
  if (!t) return;
  const c = chars[editIdx];
  if (t.dataset.player != null) { editIdx = +t.dataset.player; }
  else if (t.dataset.cls) { c.cls = t.dataset.cls; preview.action = 'light'; }
  else if (t.dataset.el) { c.el = t.dataset.el; preview.action = 'cast'; }
  else if (t.dataset.color) c.color = t.dataset.color;
  else if (t.dataset.skin) c.skin = t.dataset.skin;
  else if (t.dataset.hat) c.hat = t.dataset.hat;
  preview.actT = 0;
  renderCreatorUI();
});
document.getElementById('cName').addEventListener('input', (e) => { chars[editIdx].name = e.target.value.trim() || `Jogador ${editIdx + 1}`; });
document.getElementById('cRandom').addEventListener('click', () => {
  chars[editIdx] = randomChar(chars[editIdx].name);
  chars[editIdx].name = document.getElementById('cName').value.trim() || `Jogador ${editIdx + 1}`;
  preview.action = 'spin'; preview.actT = 0;
  renderCreatorUI();
});
document.getElementById('cSave').addEventListener('click', () => { saveChars(); show('menu'); });
document.getElementById('cNext').addEventListener('click', () => { saveChars(); editIdx = 1 - editIdx; renderCreatorUI(); document.querySelector('.creator-left').scrollTop = 0; document.getElementById('creator').scrollTop = 0; });

function renderPreview(dt) {
  const pr = preview;
  const w = pr.canvas.clientWidth; const h = pr.canvas.clientHeight;
  if (!w || !h) return;
  if (pr.canvas.width !== Math.floor(w * pr.renderer.getPixelRatio())) { pr.renderer.setSize(w, h, false); pr.camera.aspect = w / h; pr.camera.updateProjectionMatrix(); }
  pr.t += dt;
  if (pr.model) {
    pr.model.root.rotation.y = Math.sin(pr.t * 0.6) * 0.8;
    let action = null; let at = 0;
    if (pr.action) { pr.actT += dt; at = pr.actT / 0.7; action = pr.action; if (at >= 1) pr.action = null; }
    poseCharacter(pr.model, { phase: 0, speed: 0, action, at }, dt);
  }
  pr.renderer.render(pr.scene, pr.camera);
}

// ---------------- Jogo ----------------
let game = null;
let lastMode = null;
let paused = false;
let ended = false;
const pauseEl = document.getElementById('pause');
const clickEl = document.getElementById('clickToPlay');

function startMode(mode) {
  if (game) { game.dispose(); game = null; }
  for (const s of screens) document.getElementById(s).classList.remove('active');
  pauseEl.classList.remove('active');
  lastMode = mode;
  paused = false; ended = false;
  const difficulty = +document.getElementById('difficulty').value;
  const onEnd = (title, text) => endGame(title, text);
  const c = chars.map((x) => ({ ...x }));
  if (mode.startsWith('fight')) {
    const m = mode === 'fight1v1' ? '1v1' : mode === 'fight2v2' ? '2v2' : '2v2p2';
    game = new FightGame(renderer, { mode: m, chars: c, difficulty, onEnd });
    touch.setMode('fight', m === '2v2p2' ? 2 : 1);
  } else {
    game = new BattlefieldGame(renderer, { twoPlayers: mode === 'bf2p', chars: c, difficulty, onEnd });
    touch.setMode('bf', mode === 'bf2p' ? 2 : 1);
    if (!touch.enabled) input.lock(canvas);
  }
  game.isBF = !mode.startsWith('fight');
  game.resize();
}

function pause() {
  if (!game || paused || ended) return;
  paused = true;
  document.getElementById('pauseTitle').textContent = 'Pausado';
  document.getElementById('pauseText').textContent = game.isBF && !touch.enabled ? 'Clique em Continuar para voltar a mirar com o mouse.' : '';
  touch.releaseAll();
  document.getElementById('btnResume').style.display = '';
  pauseEl.classList.add('active');
  clickEl.classList.add('hidden');
}
function resume() {
  if (!game || ended) return;
  paused = false;
  pauseEl.classList.remove('active');
  if (game.isBF && !touch.enabled) input.lock(canvas);
}
function endGame(title, text) {
  ended = true;
  input.unlock();
  touch.setMode(null);
  document.getElementById('pauseTitle').textContent = title;
  document.getElementById('pauseText').textContent = text;
  document.getElementById('btnResume').style.display = 'none';
  pauseEl.classList.add('active');
}
function quit() {
  if (game) { game.dispose(); game = null; }
  input.unlock();
  touch.setMode(null);
  pauseEl.classList.remove('active');
  clickEl.classList.add('hidden');
  paused = false; ended = false;
  show('menu');
}
document.getElementById('btnResume').addEventListener('click', resume);
document.getElementById('btnRestart').addEventListener('click', () => startMode(lastMode));
document.getElementById('btnQuit').addEventListener('click', quit);
clickEl.addEventListener('click', () => { input.lock(canvas); });
canvas.addEventListener('click', () => { if (game && game.isBF && !touch.enabled && !paused && !ended && !input.mouse.locked) input.lock(canvas); });

window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && game && !ended) { if (paused) resume(); else pause(); }
  if (e.code === 'KeyP' && game && !game.isBF && !ended) { if (paused) resume(); else pause(); }
});
let hadLock = false;
document.addEventListener('pointerlockchange', () => {
  const locked = !!document.pointerLockElement;
  if (hadLock && !locked && game && game.isBF && !ended) pause();
  hadLock = locked;
});
document.addEventListener('pointerlockerror', () => { if (game && game.isBF && !paused) clickEl.classList.remove('hidden'); });

window.addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  backdrop.camera.aspect = innerWidth / innerHeight;
  backdrop.camera.updateProjectionMatrix();
  if (game) game.resize();
});

// ---------------- Loop principal ----------------
let last = performance.now();
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  pollPads();
  if (game) {
    if (game.isBF) clickEl.classList.toggle('hidden', touch.enabled || paused || ended || input.mouse.locked);
    if (!paused) game.update(dt);
    game.render();
  } else {
    const t = now / 1000;
    backdrop.camera.position.set(Math.sin(t * 0.15) * 7.5, 2.4, Math.cos(t * 0.15) * 7.5);
    backdrop.camera.lookAt(0, 1.2, 0);
    backdrop.models.forEach((m, i) => poseCharacter(m, { phase: t * 2 + i, speed: 0, action: (Math.floor(t / 2.5) + i) % 4 === 0 ? ['light', 'spin', 'cast', 'kick'][(Math.floor(t / 10) + i) % 4] : null, at: (t % 2.5) / 0.8 }, dt));
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, innerWidth, innerHeight);
    renderer.render(backdrop.scene, backdrop.camera);
    if (document.getElementById('creator').classList.contains('active') && preview.renderer) renderPreview(dt);
  }
  input.endFrame();
}
show('menu');
requestAnimationFrame(frame);
