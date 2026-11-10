// Teclado, mouse (pointer lock) e gamepad.
const keys = new Set();
const pressedThisFrame = new Set();
const mouse = { dx: 0, dy: 0, buttons: new Set(), pressed: new Set(), locked: false };
const look2 = { dx: 0, dy: 0 };

const BLOCK_DEFAULT = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab']);

window.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT')) return;
  if (BLOCK_DEFAULT.has(e.code)) e.preventDefault();
  if (!keys.has(e.code)) pressedThisFrame.add(e.code);
  keys.add(e.code);
});
window.addEventListener('keyup', (e) => keys.delete(e.code));
window.addEventListener('blur', () => { keys.clear(); mouse.buttons.clear(); });

window.addEventListener('mousemove', (e) => {
  if (mouse.locked) { mouse.dx += e.movementX; mouse.dy += e.movementY; }
});
window.addEventListener('mousedown', (e) => {
  if (!mouse.buttons.has(e.button)) mouse.pressed.add(e.button);
  mouse.buttons.add(e.button);
});
window.addEventListener('mouseup', (e) => mouse.buttons.delete(e.button));
window.addEventListener('contextmenu', (e) => { if (mouse.locked) e.preventDefault(); });
document.addEventListener('pointerlockchange', () => {
  mouse.locked = !!document.pointerLockElement;
});

export const input = {
  down: (code) => keys.has(code),
  pressed: (code) => pressedThisFrame.has(code),
  any: (codes) => codes.some((c) => keys.has(c)),
  anyPressed: (codes) => codes.some((c) => pressedThisFrame.has(c)),
  mouse,
  lock(el) { if (el.requestPointerLock) el.requestPointerLock(); },
  unlock() { if (document.pointerLockElement) document.exitPointerLock(); },
  consumeMouse() { const d = { dx: mouse.dx, dy: mouse.dy }; mouse.dx = 0; mouse.dy = 0; return d; },
  endFrame() { pressedThisFrame.clear(); mouse.pressed.clear(); padsPrev = padsNow; },
  pad(i) { return readPad(i); },
  // Entradas virtuais (controles de toque)
  virtualDown(code) { if (!keys.has(code)) pressedThisFrame.add(code); keys.add(code); },
  virtualUp(code) { keys.delete(code); },
  virtualMouse(btn, down) {
    if (down) { if (!mouse.buttons.has(btn)) mouse.pressed.add(btn); mouse.buttons.add(btn); } else mouse.buttons.delete(btn);
  },
  addLook(dx, dy) { mouse.dx += dx; mouse.dy += dy; },
  // mira por toque do Jogador 2 (tela dividida)
  addLook2(dx, dy) { look2.dx += dx; look2.dy += dy; },
  consumeLook2() { const d = { dx: look2.dx, dy: look2.dy }; look2.dx = 0; look2.dy = 0; return d; },
};

// ---------- Gamepad ----------
let padsNow = [];
let padsPrev = [];
export function pollPads() {
  const list = navigator.getGamepads ? navigator.getGamepads() : [];
  padsNow = [];
  for (const p of list) if (p && p.connected) padsNow.push({ axes: [...p.axes], buttons: p.buttons.map((b) => b.value > 0.4) });
}
function dz(v) { return Math.abs(v) < 0.18 ? 0 : v; }
function readPad(i) {
  const p = padsNow[i];
  if (!p) return null;
  const prev = padsPrev[i];
  return {
    lx: dz(p.axes[0] || 0), ly: dz(p.axes[1] || 0), rx: dz(p.axes[2] || 0), ry: dz(p.axes[3] || 0),
    btn: (n) => !!p.buttons[n],
    pressed: (n) => !!p.buttons[n] && !(prev && prev.buttons[n]),
  };
}
