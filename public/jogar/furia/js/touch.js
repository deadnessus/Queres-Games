// Controles de toque: joystick virtual, botões e arrastar para mirar.
// Com 2 jogadores, a tela é dividida ao meio: cada metade tem o seu joystick e os seus botões.
import { input } from './input.js';

// Posição dos botões: x/y = distância do centro do botão até a borda direita/inferior da área do jogador.
const LAYOUT = {
  fight: [
    { id: 'light', label: 'Leve', x: 140, y: 130, size: 70 },
    { id: 'heavy', label: 'Pesado', x: 60, y: 95, size: 62 },
    { id: 'special', label: 'Especial', x: 220, y: 95, size: 62, color: '#2f7ad6' },
    { id: 'jump', label: 'Pular', x: 140, y: 45, size: 54 },
    { id: 'block', label: 'Defesa', x: 55, y: 185, size: 56 },
    { id: 'dash', label: 'Esquiva', x: 225, y: 185, size: 56 },
    { id: 'ult', label: 'ULT', x: 140, y: 220, size: 60, color: '#d35400' },
  ],
  bf: [
    { id: 'fire', label: 'ATIRAR', x: 115, y: 110, size: 84, color: '#c0392b' },
    { id: 'aim', label: 'Mira', x: 215, y: 70, size: 54 },
    { id: 'reload', label: 'Recarregar', x: 215, y: 150, size: 54 },
    { id: 'jump', label: 'Pular', x: 40, y: 50, size: 52 },
    { id: 'air', label: 'Ataque aéreo', x: 40, y: 140, size: 50, color: '#a35a00' },
    { id: 'ability', label: 'Habilid.', x: 40, y: 230, size: 52, color: '#7d3cc0' },
    { id: 'use', label: 'Veículo', x: 122, y: 225, size: 52, color: '#56602f' },
    { id: 'swap', label: 'Trocar arma', x: 205, y: 232, size: 52 },
    { id: 'score', label: 'Placar', x: 290, y: 40, size: 44, single: true },
  ],
};

// O que cada botão aciona, por modo e por jogador (as mesmas teclas do teclado).
const ACTIONS = {
  fight: [
    { light: { code: 'KeyJ' }, heavy: { code: 'KeyK' }, special: { code: 'KeyL' }, ult: { code: 'KeyI' }, block: { code: 'KeyO' },
      jump: { code: 'Space' }, dash: { code: 'ShiftLeft' }, move: ['KeyW', 'KeyS', 'KeyA', 'KeyD'] },
    { light: { code: 'Numpad1' }, heavy: { code: 'Numpad2' }, special: { code: 'Numpad3' }, ult: { code: 'Numpad0' }, block: { code: 'NumpadDecimal' },
      jump: { code: 'Enter' }, dash: { code: 'ShiftRight' }, move: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] },
  ],
  bf: [
    { fire: { mouse: 0, look: true }, aim: { mouse: 2, toggle: true }, reload: { code: 'KeyR' }, jump: { code: 'Space' }, air: { code: 'KeyG' },
      ability: { code: 'KeyQ' }, use: { code: 'KeyE' }, swap: { swap: ['Digit1', 'Digit2'] }, score: { code: 'Tab' },
      move: ['KeyW', 'KeyS', 'KeyA', 'KeyD'], run: 'ShiftLeft' },
    { fire: { code: 'KeyO', look: true }, aim: { code: 'KeyN', toggle: true }, reload: { code: 'KeyP' }, jump: { code: 'Enter' }, air: { code: 'KeyH' },
      ability: { code: 'KeyY' }, use: { code: 'KeyU' }, swap: { swap: ['Digit9', 'Digit0'] },
      move: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'], run: 'ShiftRight' },
  ],
};

export const touch = {
  enabled: false,
  mode: null,
  players: 1,
  root: null,
  roles: new Map(), // identifier do dedo -> papel
  zones: [],

  init() {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;
    this.enabled = true;
    document.body.classList.add('touch');
    const root = document.createElement('div');
    root.id = 'touchUI';
    root.className = 'touch-ui hidden';
    document.body.appendChild(root);
    this.root = root;
    const opts = { passive: false };
    root.addEventListener('touchstart', (e) => this.onStart(e), opts);
    root.addEventListener('touchmove', (e) => this.onMove(e), opts);
    root.addEventListener('touchend', (e) => this.onEnd(e), opts);
    root.addEventListener('touchcancel', (e) => this.onEnd(e), opts);
    window.addEventListener('resize', () => { if (this.mode) { this.releaseAll(); this.layout(); } });
  },

  setMode(mode, players = 1) {
    if (!this.enabled) return;
    this.releaseAll();
    this.mode = mode;
    this.players = mode ? players : 1;
    this.root.classList.toggle('hidden', !mode);
    document.body.classList.toggle('ingame', !!mode);
    this.root.classList.toggle('two', this.players === 2);
    if (mode) this.layout();
  },

  layout() {
    const mode = this.mode;
    const two = this.players === 2;
    const W = innerWidth;
    const scale = two ? Math.min(1, (W / 2) / 560) * 0.95 : Math.min(1, W / 700);
    let html = '';
    this.zones = [];
    for (let p = 0; p < this.players; p++) {
      const right = two && p === 0 ? W / 2 : 0;
      const left = two && p === 1 ? W / 2 : 0;
      const width = two ? W / 2 : W;
      this.zones.push({ left, width, aimOn: false, swapIdx: 0 });
      html += `<div class="tzone p${p}" style="left:${left}px;width:${width}px">
        <div class="thint">${two ? `J${p + 1}: arraste aqui para andar` : 'Arraste aqui para andar'}</div>
        ${two ? `<div class="ttag">Jogador ${p + 1}</div>` : ''}
      </div>
      <div class="joy-base" data-joy="${p}"><div class="joy-knob"></div></div>`;
      for (const b of LAYOUT[mode]) {
        if (b.single && two) continue;
        const sz = b.size * scale;
        html += `<div class="tbtn" data-b="${b.id}" data-p="${p}" style="right:${right + (b.x - b.size / 2) * scale}px;bottom:${(b.y - b.size / 2) * scale}px;width:${sz}px;height:${sz}px;font-size:${Math.max(9, 11 * scale)}px;${b.color ? `background:${b.color}aa;` : ''}">${b.label}</div>`;
      }
    }
    html += '<button class="tpause" data-pause="1">II</button>';
    this.root.innerHTML = html;
    this.joys = [...this.root.querySelectorAll('[data-joy]')].map((el) => ({ base: el, knob: el.firstElementChild }));
  },

  playerAt(x) { return this.players === 2 && x >= innerWidth / 2 ? 1 : 0; },

  press(p, act, el) {
    el?.classList.add('on');
    const z = this.zones[p];
    if (act.toggle) {
      z.aimOn = !z.aimOn;
      if (act.mouse != null) input.virtualMouse(act.mouse, z.aimOn);
      else (z.aimOn ? input.virtualDown(act.code) : input.virtualUp(act.code));
      el?.classList.toggle('active', z.aimOn);
    } else if (act.swap) {
      z.swapIdx = 1 - z.swapIdx;
      input.virtualDown(act.swap[z.swapIdx]);
    } else if (act.mouse != null) input.virtualMouse(act.mouse, true);
    else input.virtualDown(act.code);
  },

  release(p, act, el) {
    el?.classList.remove('on');
    if (act.toggle) return;
    if (act.swap) { act.swap.forEach((c) => input.virtualUp(c)); return; }
    // solta um pouco depois para que toques rápidos sejam percebidos pelo jogo
    if (act.mouse != null) setTimeout(() => input.virtualMouse(act.mouse, false), 40);
    else setTimeout(() => input.virtualUp(act.code), 40);
  },

  onStart(e) {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const el = document.elementFromPoint(t.clientX, t.clientY);
      if (el && el.closest('[data-pause]')) {
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape' }));
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape', key: 'Escape' }));
        continue;
      }
      const btn = el && el.closest('[data-b]');
      if (btn) {
        const p = +btn.dataset.p;
        const act = ACTIONS[this.mode][p][btn.dataset.b];
        if (!act) continue;
        this.press(p, act, btn);
        this.roles.set(t.identifier, { type: 'btn', p, act, el: btn, x: t.clientX, y: t.clientY });
        continue;
      }
      const p = this.playerAt(t.clientX);
      const z = this.zones[p];
      const rel = (t.clientX - z.left) / z.width;
      if (rel < 0.45 && !this.hasRole('joy', p)) {
        this.roles.set(t.identifier, { type: 'joy', p, cx: t.clientX, cy: t.clientY });
        const j = this.joys[p];
        j.base.style.left = t.clientX + 'px';
        j.base.style.top = t.clientY + 'px';
        j.base.classList.add('on');
        this.setJoy(p, 0, 0);
      } else if (this.mode === 'bf') {
        this.roles.set(t.identifier, { type: 'look', p, x: t.clientX, y: t.clientY });
      }
    }
  },

  onMove(e) {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const r = this.roles.get(t.identifier);
      if (!r) continue;
      if (r.type === 'joy') {
        let dx = (t.clientX - r.cx) / 55; let dy = (t.clientY - r.cy) / 55;
        const l = Math.hypot(dx, dy);
        if (l > 1) { dx /= l; dy /= l; }
        this.setJoy(r.p, dx, dy);
      } else if (r.type === 'look' || (r.type === 'btn' && r.act.look)) {
        const dx = (t.clientX - r.x) * 1.6; const dy = (t.clientY - r.y) * 1.6;
        if (r.p === 0) input.addLook(dx, dy); else input.addLook2(dx, dy);
        r.x = t.clientX; r.y = t.clientY;
      }
    }
  },

  onEnd(e) {
    e.preventDefault();
    for (const t of e.changedTouches) {
      const r = this.roles.get(t.identifier);
      if (!r) continue;
      if (r.type === 'joy') { this.setJoy(r.p, 0, 0); this.joys[r.p].base.classList.remove('on'); }
      else if (r.type === 'btn') this.release(r.p, r.act, r.el);
      this.roles.delete(t.identifier);
    }
  },

  hasRole(type, p) { for (const r of this.roles.values()) if (r.type === type && r.p === p) return true; return false; },

  setJoy(p, x, y) {
    const j = this.joys && this.joys[p];
    if (j) j.knob.style.transform = `translate(${x * 45}px, ${y * 45}px)`;
    const a = ACTIONS[this.mode][p];
    const [up, down, left, right] = a.move;
    const set = (code, on) => (on ? input.virtualDown(code) : input.virtualUp(code));
    const th = 0.35;
    set(up, y < -th); set(down, y > th); set(left, x < -th); set(right, x > th);
    // empurrar o joystick até a borda para frente = correr (Battlefield)
    if (a.run) set(a.run, y < -0.85);
  },

  releaseAll() {
    if (!this.mode) return;
    for (const r of this.roles.values()) if (r.type === 'btn') this.release(r.p, r.act, r.el);
    this.roles.clear();
    for (let p = 0; p < this.players; p++) {
      this.setJoy(p, 0, 0);
      this.joys?.[p]?.base.classList.remove('on');
      const z = this.zones[p];
      if (z && z.aimOn) {
        const act = ACTIONS[this.mode][p].aim;
        if (act.mouse != null) input.virtualMouse(act.mouse, false); else input.virtualUp(act.code);
        z.aimOn = false;
      }
    }
  },
};
