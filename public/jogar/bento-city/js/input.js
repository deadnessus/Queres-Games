// Keyboard / mouse / touch input with virtual buttons for mobile
export class Input {
  constructor(canvas) {
    this.canvas = canvas;
    this.keys = new Set();
    this.pressedSet = new Set();
    this.mouse = { dx: 0, dy: 0, left: false, right: false, wheel: 0 };
    this.locked = false;
    this.enabled = true; // false while typing in UI
    this.touch = { active: false, mx: 0, my: 0, lookId: null, moveId: null, lx: 0, ly: 0, ox: 0, oy: 0 };
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    addEventListener('keydown', (e) => {
      if (!this.enabled) return;
      if (['Space', 'ArrowUp', 'ArrowDown', 'Tab'].includes(e.code)) e.preventDefault();
      if (!this.keys.has(e.code)) this.pressedSet.add(e.code);
      this.keys.add(e.code);
    });
    addEventListener('keyup', (e) => this.keys.delete(e.code));
    addEventListener('blur', () => this.keys.clear());
    canvas.addEventListener('mousedown', (e) => {
      if (!this.enabled) return;
      if (!this.locked && !this.isTouch) { canvas.requestPointerLock?.(); }
      if (e.button === 0) { this.mouse.left = true; this.pressedSet.add('Mouse0'); }
      if (e.button === 2) { this.mouse.right = true; this.pressedSet.add('Mouse2'); }
    });
    addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.left = false;
      if (e.button === 2) this.mouse.right = false;
    });
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    addEventListener('mousemove', (e) => {
      if (this.locked) { this.mouse.dx += e.movementX; this.mouse.dy += e.movementY; }
    });
    canvas.addEventListener('wheel', (e) => { this.mouse.wheel += Math.sign(e.deltaY); }, { passive: true });
    document.addEventListener('pointerlockchange', () => { this.locked = document.pointerLockElement === canvas; });

    if (this.isTouch) this.setupTouch();
  }

  setupTouch() {
    const t = this.touch;
    const el = this.canvas;
    const stick = document.getElementById('stick');
    const knob = document.getElementById('knob');
    el.addEventListener('touchstart', (e) => {
      for (const p of e.changedTouches) {
        if (p.clientX < innerWidth * 0.45 && t.moveId === null) {
          t.moveId = p.identifier; t.ox = p.clientX; t.oy = p.clientY; t.mx = 0; t.my = 0;
          stick.style.display = 'block';
          stick.style.left = (p.clientX - 60) + 'px'; stick.style.top = (p.clientY - 60) + 'px';
          knob.style.transform = 'translate(0px,0px)';
        } else if (t.lookId === null) {
          t.lookId = p.identifier; t.lx = p.clientX; t.ly = p.clientY;
        }
      }
      e.preventDefault();
    }, { passive: false });
    el.addEventListener('touchmove', (e) => {
      for (const p of e.changedTouches) {
        if (p.identifier === t.moveId) {
          let dx = p.clientX - t.ox, dy = p.clientY - t.oy;
          const l = Math.hypot(dx, dy), m = 55;
          if (l > m) { dx *= m / l; dy *= m / l; }
          t.mx = dx / m; t.my = dy / m;
          knob.style.transform = `translate(${dx}px,${dy}px)`;
        } else if (p.identifier === t.lookId) {
          this.mouse.dx += (p.clientX - t.lx) * 2.2; this.mouse.dy += (p.clientY - t.ly) * 2.2;
          t.lx = p.clientX; t.ly = p.clientY;
        }
      }
      e.preventDefault();
    }, { passive: false });
    const end = (e) => {
      for (const p of e.changedTouches) {
        if (p.identifier === t.moveId) { t.moveId = null; t.mx = 0; t.my = 0; stick.style.display = 'none'; }
        if (p.identifier === t.lookId) t.lookId = null;
      }
    };
    el.addEventListener('touchend', end); el.addEventListener('touchcancel', end);

    document.querySelectorAll('[data-key]').forEach((b) => {
      const code = b.dataset.key;
      b.addEventListener('touchstart', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (!this.keys.has(code)) this.pressedSet.add(code);
        this.keys.add(code);
        if (code === 'Mouse0') this.mouse.left = true;
      }, { passive: false });
      const up = (e) => { e.preventDefault(); this.keys.delete(code); if (code === 'Mouse0') this.mouse.left = false; };
      b.addEventListener('touchend', up); b.addEventListener('touchcancel', up);
    });
  }

  down(code) { return this.enabled && this.keys.has(code); }
  pressed(code) { return this.enabled && this.pressedSet.has(code); }
  axis() {
    let x = 0, y = 0;
    if (this.down('KeyW') || this.down('ArrowUp')) y += 1;
    if (this.down('KeyS') || this.down('ArrowDown')) y -= 1;
    if (this.down('KeyA') || this.down('ArrowLeft')) x -= 1;
    if (this.down('KeyD') || this.down('ArrowRight')) x += 1;
    if (this.touch.moveId !== null) { x += this.touch.mx; y -= this.touch.my; }
    const l = Math.hypot(x, y);
    if (l > 1) { x /= l; y /= l; }
    return { x, y };
  }
  endFrame() {
    this.pressedSet.clear();
    this.mouse.dx = 0; this.mouse.dy = 0; this.mouse.wheel = 0;
  }
}
