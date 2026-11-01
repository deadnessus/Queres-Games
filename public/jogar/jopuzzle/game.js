(() => {
'use strict';

const TIME_LIMIT = 45;                  // segundos por puzzle
const COLORS = ['#FF4DA6', '#38E1FF', '#FFD93D', '#8CFF6B', '#FF9F43', '#B58CFF'];
const MAX_CELL = 56;                    // tamanho máximo da célula no tabuleiro (px)
const DRAG_THRESHOLD = 6;               // px de movimento até começar a arrastar

// Os puzzles vêm de puzzles.js (gerado por tools/generate_puzzles.py).
// Cada puzzle é a solução desenhada em letras: uma letra por peça, '.' é vazio.
// "stars": segundos gastos para ganhar 3 e 2 estrelas (mais que isso = 1 estrela).
const PUZZLES = window.PUZZLES;       // { easy: [3 peças], hard: [4 peças], super: [6 peças] }

/* ---------- formas ---------- */
const norm = (cells) => {
  const mx = Math.min(...cells.map((c) => c[0]));
  const my = Math.min(...cells.map((c) => c[1]));
  return cells.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
};
const rotate = (cells) => norm(cells.map(([x, y]) => [-y, x]));
const mirror = (cells) => norm(cells.map(([x, y]) => [-x, y]));
const dims = (cells) => ({
  w: Math.max(...cells.map((c) => c[0])) + 1,
  h: Math.max(...cells.map((c) => c[1])) + 1,
});

/* ---------- estado ---------- */
const S = {
  mode: 'easy', levels: { easy: 0, hard: 0, super: 0 }, level: 0, puzzle: null, cols: 0, rows: 0,
  target: new Set(), pieces: [], selected: null, drag: null,
  cell: MAX_CELL, slotW: 70,
  status: 'ready', remaining: TIME_LIMIT, lastTick: 0, timerId: 0,
};
window.__jopuzzle = S; // facilita testes
S.debugSetCells = (i, cells) => { const p = S.pieces[i]; p.cells = cells; buildCells(p); placeInTray(p); };

const $ = (id) => document.getElementById(id);
const el = {
  app: $('app'), area: $('board-area'), board: $('board'), holes: $('holes'),
  boardPieces: $('board-pieces'), tray: $('tray'), dragLayer: $('drag-layer'),
  time: $('time'), bar: $('bar-fill'), stars: $('stars').querySelectorAll('svg'),
  tick3: $('tick-3'), tick2: $('tick-2'), level: $('level'),
  overlay: $('overlay'), endStars: $('end-stars').querySelectorAll('svg'), endTime: $('end-time'),
};

const key = (x, y) => x + ',' + y;
const vibrate = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) { /* sem vibração */ } };

/* ---------- carregar puzzle ---------- */
function loadLevel(index) {
  const list = PUZZLES[S.mode];
  S.level = (index + list.length) % list.length;
  S.levels[S.mode] = S.level;
  S.puzzle = list[S.level];
  const layout = S.puzzle.layout;
  S.rows = layout.length;
  S.cols = layout[0].length;
  S.target = new Set();
  const groups = {};
  layout.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      S.target.add(key(x, y));
      (groups[ch] = groups[ch] || []).push([x, y]);
    });
  });

  el.boardPieces.innerHTML = '';
  el.tray.innerHTML = '';
  el.dragLayer.innerHTML = '';
  if (S.drag) clearTimeout(S.drag.timer);
  S.drag = null;

  S.pieces = Object.keys(groups).sort().map((ch, i) => {
    let cells = norm(groups[ch]);
    for (let r = Math.floor(Math.random() * 4); r > 0; r--) cells = rotate(cells);
    if (Math.random() < 0.5) cells = mirror(cells);

    const slot = document.createElement('div');
    slot.className = 'slot';
    el.tray.appendChild(slot);

    const node = document.createElement('div');
    node.className = 'piece';
    node.style.setProperty('--col', COLORS[i % COLORS.length]);
    const p = { id: ch, color: COLORS[i % COLORS.length], cells, el: node, slot, state: 'tray', ax: 0, ay: 0 };
    slot.addEventListener('pointerdown', (e) => { if (p.state === 'tray') onDown(e, p); });
    node.addEventListener('pointerdown', (e) => { if (p.state === 'board') onDown(e, p); });
    return p;
  });

  el.holes.innerHTML = '';
  S.holeEls = {};
  S.target.forEach((k) => {
    const h = document.createElement('div');
    h.className = 'hole';
    el.holes.appendChild(h);
    S.holeEls[k] = h;
  });

  el.level.textContent = String(S.level + 1).padStart(2, '0');
  ['easy', 'hard', 'super'].forEach((m) => {
    $('mode-' + m).classList.toggle('on', S.mode === m);
    $('mode-' + m).setAttribute('aria-pressed', S.mode === m);
  });
  el.tray.dataset.n = S.pieces.length;
  S.selected = null;
  S.remaining = TIME_LIMIT;
  S.status = 'ready';
  layoutAll();
  select(S.pieces[0]);
  updateHud();
  showOverlay('start');
}

/* ---------- layout ---------- */
function computeSizes() {
  const areaW = el.app.clientWidth - 40 - 28;
  const areaH = el.area.clientHeight - 28 - 8;
  S.cell = Math.max(24, Math.min(MAX_CELL, Math.floor(areaW / S.cols), Math.floor(areaH / S.rows)));
  const s0 = S.pieces.length ? S.pieces[0].slot : null;
  S.slotW = s0 ? Math.min(s0.clientWidth, s0.clientHeight) : 70;
}

function buildCells(p) {
  p.el.innerHTML = '';
  p.cells.forEach(() => {
    const c = document.createElement('div');
    c.className = 'cell';
    p.el.appendChild(c);
  });
}

function sizePiece(p, c) {
  const { w, h } = dims(p.cells);
  p.el.style.width = w * c + 'px';
  p.el.style.height = h * c + 'px';
  if (p.el.children.length !== p.cells.length) buildCells(p);
  p.cells.forEach(([x, y], i) => {
    const s = p.el.children[i].style;
    s.left = x * c + 'px'; s.top = y * c + 'px';
    s.width = c + 'px'; s.height = c + 'px';
  });
  p.px = c;
}

function placeInTray(p) {
  p.state = 'tray';
  p.el.classList.remove('dragging');
  p.slot.appendChild(p.el);
  const { w, h } = dims(p.cells);
  const c = Math.max(12, Math.min(24, Math.floor((S.slotW * 0.86) / Math.max(w, h))));
  sizePiece(p, c);
  p.el.style.left = (p.slot.clientWidth - w * c) / 2 + 'px';
  p.el.style.top = (p.slot.clientHeight - h * c) / 2 + 'px';
  p.el.style.position = 'absolute';
}

function placeOnBoard(p, ax, ay) {
  p.state = 'board'; p.ax = ax; p.ay = ay;
  p.el.classList.remove('dragging');
  el.boardPieces.appendChild(p.el);
  sizePiece(p, S.cell);
  p.el.style.position = 'absolute';
  p.el.style.left = ax * S.cell + 'px';
  p.el.style.top = ay * S.cell + 'px';
}

function layoutAll() {
  computeSizes();
  el.board.style.width = S.cols * S.cell + 'px';
  el.board.style.height = S.rows * S.cell + 'px';
  S.target.forEach((k) => {
    const [x, y] = k.split(',').map(Number);
    const s = S.holeEls[k].style;
    s.left = x * S.cell + 'px'; s.top = y * S.cell + 'px';
    s.width = S.cell + 'px'; s.height = S.cell + 'px';
  });
  S.pieces.forEach((p) => {
    if (p.state === 'board') placeOnBoard(p, p.ax, p.ay);
    else if (p.state === 'tray') placeInTray(p);
  });
}

/* ---------- regras do tabuleiro ---------- */
function occupied(except) {
  const occ = new Set();
  S.pieces.forEach((q) => {
    if (q === except || q.state !== 'board') return;
    q.cells.forEach(([x, y]) => occ.add(key(q.ax + x, q.ay + y)));
  });
  return occ;
}

function fits(p, cells, ax, ay) {
  const occ = occupied(p);
  return cells.every(([x, y]) => {
    const k = key(ax + x, ay + y);
    return S.target.has(k) && !occ.has(k);
  });
}

// Encaixe "magnético": procura a posição válida mais próxima de (fx, fy).
function snapFor(p, fx, fy) {
  let best = null, bestD = 1.2;
  const bx = Math.round(fx), by = Math.round(fy);
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const ax = bx + dx, ay = by + dy;
      const d = Math.hypot(ax - fx, ay - fy);
      if (d < bestD && fits(p, p.cells, ax, ay)) { best = { ax, ay }; bestD = d; }
    }
  }
  return best;
}

function showGhost(p, snap) {
  Object.values(S.holeEls).forEach((h) => h.classList.remove('ghost'));
  if (!snap) return;
  p.cells.forEach(([x, y]) => {
    const h = S.holeEls[key(snap.ax + x, snap.ay + y)];
    if (h) { h.classList.add('ghost'); h.style.setProperty('--gc', p.color); }
  });
}

/* ---------- seleção ---------- */
function select(p) {
  S.selected = p || null;
  S.pieces.forEach((q) => {
    q.el.classList.toggle('sel', q === p);
    q.slot.classList.toggle('sel', q === p && q.state === 'tray');
  });
}

/* ---------- arrastar ---------- */
function onDown(e, p) {
  if (S.status !== 'playing' || S.drag) return;
  e.preventDefault();
  select(p);
  const d = { p, id: e.pointerId, sx: e.clientX, sy: e.clientY, active: false, held: false };
  d.timer = setTimeout(() => {
    if (S.drag === d && !d.active) { d.held = true; onHold(p); }
  }, HOLD_MS);
  S.drag = d;
}

function startDrag(d) {
  const p = d.p;
  d.active = true;
  p.state = 'drag';
  p.el.classList.add('dragging');
  el.dragLayer.appendChild(p.el);
  p.el.style.position = 'fixed';
  sizePiece(p, S.cell);
  p.slot.classList.remove('sel');
}

function moveDrag(x, y) {
  const d = S.drag, p = d.p;
  const { w, h } = dims(p.cells);
  const lift = S.cell * 1.3;                 // a peça fica acima do dedo
  const left = x - (w * S.cell) / 2;
  const top = y - lift - (h * S.cell) / 2;
  p.el.style.left = left + 'px';
  p.el.style.top = top + 'px';
  const br = el.board.getBoundingClientRect();
  d.snap = snapFor(p, (left - br.left) / S.cell, (top - br.top) / S.cell);
  showGhost(p, d.snap);
}

window.addEventListener('pointermove', (e) => {
  const d = S.drag;
  if (!d || e.pointerId !== d.id) return;
  if (!d.active) {
    if (Math.hypot(e.clientX - d.sx, e.clientY - d.sy) < DRAG_THRESHOLD) return;
    clearTimeout(d.timer);
    startDrag(d);
  }
  moveDrag(e.clientX, e.clientY);
});

function endDrag(e, cancelled) {
  const d = S.drag;
  if (!d || (e && e.pointerId !== d.id)) return;
  S.drag = null;
  clearTimeout(d.timer);
  showGhost(d.p, null);
  if (!d.active) { select(d.p); if (!cancelled && !d.held) onTap(d.p); return; }
  if (d.snap && !cancelled) {
    placeOnBoard(d.p, d.snap.ax, d.snap.ay);
    d.p.el.classList.remove('pop'); void d.p.el.offsetWidth; d.p.el.classList.add('pop');
    vibrate(15);
    select(d.p);
    checkWin();
  } else {
    placeInTray(d.p);
    select(d.p);
  }
}
window.addEventListener('pointerup', (e) => endDrag(e, false));
window.addEventListener('pointercancel', (e) => endDrag(e, true));
window.addEventListener('contextmenu', (e) => e.preventDefault());

/* ---------- Safari/iOS: sem zoom por toque duplo ou pinça ---------- */
let lastTouchEnd = { t: 0, target: null };
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd.t < 350 && e.target === lastTouchEnd.target) e.preventDefault();
  lastTouchEnd = { t: now, target: e.target };
}, { passive: false });
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
document.addEventListener('dblclick', (e) => e.preventDefault());
['gesturestart', 'gesturechange', 'gestureend'].forEach((t) => document.addEventListener(t, (e) => e.preventDefault()));

/* ---------- girar e espelhar ---------- */
// Um toque na peça gira. Segurar o dedo na peça (sem arrastar) espelha.
// Não usamos toque duplo: o Safari do iPhone o interpreta como zoom.
const HOLD_MS = 350;

// Aplica a transformação. Na bandeja sempre vale; no tabuleiro só se a peça
// ainda couber (gira de novo até achar uma posição que caiba). Devolve se mudou.
function transform(p, op, repeat) {
  let next = op(p.cells);
  if (p.state === 'tray') {
    p.cells = next;
    buildCells(p);
    placeInTray(p);
    return true;
  }
  for (let k = 0; k < repeat; k++, next = op(next)) {
    const o = dims(p.cells), n = dims(next);
    const bx = p.ax + Math.floor((o.w - n.w) / 2), by = p.ay + Math.floor((o.h - n.h) / 2);
    const tries = [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [1, -1], [-1, 1], [1, 1]];
    const hit = tries.find(([dx, dy]) => fits(p, next, bx + dx, by + dy));
    if (hit) {
      p.cells = next;
      buildCells(p);
      placeOnBoard(p, bx + hit[0], by + hit[1]);
      return true;
    }
  }
  return false;
}

function shake(p) {
  p.el.classList.remove('shake'); void p.el.offsetWidth; p.el.classList.add('shake');
}

function onTap(p) {
  if (S.status !== 'playing') return;
  if (transform(p, rotate, 3)) {
    vibrate(6);
    p.el.classList.remove('wiggle'); void p.el.offsetWidth; p.el.classList.add('wiggle');
  } else shake(p);
}

function onHold(p) {
  if (S.status !== 'playing') return;
  if (transform(p, mirror, 1)) {
    vibrate([10, 30, 10]);
    p.el.classList.remove('flip'); void p.el.offsetWidth; p.el.classList.add('flip');
  } else shake(p);
}

/* ---------- tempo, estrelas e fim de jogo ---------- */
function starsFor(elapsed) {
  const [s3, s2] = S.puzzle.stars;
  return elapsed <= s3 ? 3 : elapsed <= s2 ? 2 : 1;
}

function updateHud() {
  const elapsed = TIME_LIMIT - S.remaining;
  el.time.textContent = String(Math.max(0, Math.ceil(S.remaining)));
  el.time.classList.toggle('low', S.remaining <= 10);
  el.bar.style.width = Math.max(0, (S.remaining / TIME_LIMIT) * 100) + '%';
  const [s3, s2] = S.puzzle.stars;
  el.tick3.style.left = ((TIME_LIMIT - s3) / TIME_LIMIT) * 100 + '%';
  el.tick2.style.left = ((TIME_LIMIT - s2) / TIME_LIMIT) * 100 + '%';
  const n = starsFor(elapsed);
  el.stars.forEach((s, i) => s.classList.toggle('on', i < n));
}

function tick() {
  if (S.status !== 'playing') return;
  const now = performance.now();
  S.remaining -= (now - S.lastTick) / 1000;
  S.lastTick = now;
  if (S.remaining <= 0) { S.remaining = 0; updateHud(); lose(); return; }
  updateHud();
}

function startClock() {
  S.lastTick = performance.now();
  clearInterval(S.timerId);
  S.timerId = setInterval(tick, 100);
}

function stopClock() { clearInterval(S.timerId); }

function checkWin() {
  if (!S.pieces.every((p) => p.state === 'board')) return;
  S.status = 'won';
  stopClock();
  const elapsed = Math.round(TIME_LIMIT - S.remaining);
  const n = starsFor(TIME_LIMIT - S.remaining);
  S.pieces.forEach((p) => p.el.classList.add('win'));
  vibrate([30, 40, 60]);
  setTimeout(() => {
    el.endStars.forEach((s, i) => s.classList.toggle('on', i < n));
    el.endTime.textContent = String(elapsed);
    showOverlay('win');
  }, 700);
}

function lose() {
  S.status = 'lost';
  stopClock();
  if (S.drag) { const d = S.drag; S.drag = null; showGhost(d.p, null); if (d.active) placeInTray(d.p); }
  el.endStars.forEach((s) => s.classList.remove('on'));
  el.endTime.textContent = String(TIME_LIMIT);
  vibrate([60, 40, 60]);
  showOverlay('lose');
}

/* ---------- sobreposições ---------- */
function showOverlay(kind) {
  el.overlay.dataset.kind = kind;
  el.overlay.hidden = false;
}

function play() {
  el.overlay.hidden = true;
  if (S.status === 'ready' || S.status === 'paused') {
    S.status = 'playing';
    startClock();
  }
}

function pause() {
  if (S.status !== 'playing') return;
  if (S.drag) endDrag(null, true);
  S.status = 'paused';
  stopClock();
  showOverlay('pause');
}

function setMode(mode) {
  if (mode === S.mode) return;
  stopClock();
  if (S.drag) clearTimeout(S.drag.timer);
  S.drag = null;
  S.mode = mode;
  loadLevel(S.levels[mode]);
}
$('mode-easy').addEventListener('click', () => setMode('easy'));
$('mode-hard').addEventListener('click', () => setMode('hard'));
$('mode-super').addEventListener('click', () => setMode('super'));

// Desistir: abandona o puzzle atual e começa o próximo já valendo.
function giveUp() {
  if (S.status !== 'playing' && S.status !== 'paused') return;
  stopClock();
  if (S.drag) clearTimeout(S.drag.timer);
  S.drag = null;
  el.overlay.hidden = true;
  loadLevel(S.level + 1);
  play();
}
$('btn-skip').addEventListener('click', giveUp);
$('btn-skip2').addEventListener('click', giveUp);

$('btn-play').addEventListener('click', play);
$('btn-pause').addEventListener('click', pause);
$('btn-next').addEventListener('click', () => {
  el.overlay.hidden = true;
  loadLevel(S.level + 1);
  play();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('resize', () => { if (S.puzzle) layoutAll(); });

// #12 abre a fase 12 do modo fácil; #d12 do difícil; #s12 do super difícil (útil para testar)
const m = /^#([ds]?)(\d+)$/.exec(location.hash);
if (m && m[1]) S.mode = m[1] === 'd' ? 'hard' : 'super';
loadLevel(m && +m[2] > 0 ? +m[2] - 1 : 0);
})();
