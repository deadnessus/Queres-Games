import * as THREE from 'three';

// ---------------- Dados das classes e elementos ----------------
export const CLASSES = {
  guerreiro: {
    nome: 'Guerreiro', ico: '⚔️', desc: 'Equilibrado, espada pesada',
    hp: 130, speed: 6.2, dmg: 1.0, def: 1.0, scale: 1.0,
    moves: { light: 'Corte de Espada', heavy: 'Golpe Giratório', special: 'Onda Elemental', ult: 'Fúria do Titã' },
    bf: { role: 'Assalto', weapon: 'rifle', ability: 'granada', abilityName: 'Granada', hp: 100, speed: 1.0 },
  },
  ninja: {
    nome: 'Ninja', ico: '🥷', desc: 'Muito rápido, golpes em sequência',
    hp: 100, speed: 8.4, dmg: 0.85, def: 0.85, scale: 0.94,
    moves: { light: 'Kunai Rápida', heavy: 'Chute Voador', special: 'Shuriken Tripla', ult: 'Mil Cortes Sombrios' },
    bf: { role: 'Batedor', weapon: 'sniper', ability: 'camuflagem', abilityName: 'Camuflagem', hp: 85, speed: 1.12 },
  },
  tanque: {
    nome: 'Tanque', ico: '🛡️', desc: 'Muita vida, lento e devastador',
    hp: 180, speed: 4.8, dmg: 1.25, def: 1.4, scale: 1.18,
    moves: { light: 'Soco de Ferro', heavy: 'Investida', special: 'Terremoto', ult: 'Fortaleza Colossal' },
    bf: { role: 'Suporte', weapon: 'lmg', ability: 'muralha', abilityName: 'Muralha de Energia', hp: 130, speed: 0.88 },
  },
  mago: {
    nome: 'Mago', ico: '🔮', desc: 'Poderes à distância, frágil',
    hp: 105, speed: 6.0, dmg: 1.1, def: 0.85, scale: 0.98,
    moves: { light: 'Golpe de Cajado', heavy: 'Explosão Arcana', special: 'Orbe Teleguiado', ult: 'Chuva de Meteoros' },
    bf: { role: 'Médico', weapon: 'smg', ability: 'cura', abilityName: 'Cura em Área', hp: 95, speed: 1.0 },
  },
};

export const ELEMENTS = {
  fogo: { nome: 'Fogo', ico: '🔥', color: 0xff5a1f, effect: 'burn', desc: 'Queima: dano contínuo', bf: 'Balas incendiárias (queimam)' },
  gelo: { nome: 'Gelo', ico: '❄️', color: 0x7fd8ff, effect: 'slow', desc: 'Congela: deixa o inimigo lento', bf: 'Balas de gelo (deixam lento)' },
  raio: { nome: 'Raio', ico: '⚡', color: 0xffe94a, effect: 'stun', desc: 'Atordoa: inimigo fica parado', bf: 'Cadência de tiro +15%' },
  terra: { nome: 'Terra', ico: '🪨', color: 0xb98a4b, effect: 'knock', desc: 'Impacto: arremessa longe', bf: 'Começa com colete blindado' },
};

export const COLORS = ['#c0392b', '#2e6fd8', '#27ae60', '#8e44ad', '#f39c12', '#1abc9c', '#222831', '#ecf0f1', '#d35400', '#6d4c41'];
export const SKINS = ['#f5d0b0', '#e0ac85', '#c68a5c', '#8d5a3b', '#5a3825', '#b5e3a1'];
export const HATS = [
  { id: 'nenhum', nome: 'Nenhum' }, { id: 'capacete', nome: 'Capacete' }, { id: 'bandana', nome: 'Bandana' },
  { id: 'chapeu', nome: 'Chapéu de Mago' }, { id: 'chifres', nome: 'Chifres' }, { id: 'coroa', nome: 'Coroa' },
];

export const DEFAULT_CHARS = [
  { name: 'Jogador 1', cls: 'guerreiro', el: 'fogo', color: '#c0392b', skin: '#e0ac85', hat: 'capacete' },
  { name: 'Jogador 2', cls: 'ninja', el: 'raio', color: '#2e6fd8', skin: '#c68a5c', hat: 'bandana' },
];

const BOT_NAMES = ['Brutus', 'Kira', 'Zé Trovão', 'Vulcano', 'Sombra', 'Gaia', 'Titã', 'Raven', 'Faísca', 'Bigorna', 'Nébula', 'Cobra',
  'Sargento Lobo', 'Cabo Rocha', 'Falcão', 'Tenente Ferro', 'Viper', 'Trator', 'Eco', 'Furacão'];
export function randomChar(name) {
  const keys = Object.keys(CLASSES);
  const els = Object.keys(ELEMENTS);
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  return {
    name: name || pick(BOT_NAMES), cls: pick(keys), el: pick(els), color: pick(COLORS), skin: pick(SKINS), hat: pick(HATS).id,
  };
}

// ---------------- Construção do modelo 3D ----------------
const geoCache = {};
function box(w, h, d) {
  const k = `b${w},${h},${d}`;
  return geoCache[k] || (geoCache[k] = new THREE.BoxGeometry(w, h, d));
}
function cyl(rt, rb, h, s = 10) {
  const k = `c${rt},${rb},${h},${s}`;
  return geoCache[k] || (geoCache[k] = new THREE.CylinderGeometry(rt, rb, h, s));
}
function sph(r, s = 12) {
  const k = `s${r},${s}`;
  return geoCache[k] || (geoCache[k] = new THREE.SphereGeometry(r, s, Math.max(6, s * 0.7)));
}
function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

/**
 * Cria um personagem humanoide low-poly.
 * opts: { cls, el, color, skin, hat, gun: 'rifle'|'sniper'|... (modo battlefield), team: cor do time opcional }
 */
export function buildCharacter(opts) {
  const cls = CLASSES[opts.cls] || CLASSES.guerreiro;
  const el = ELEMENTS[opts.el] || ELEMENTS.fogo;
  const root = new THREE.Group();
  const mats = [];
  const M = (color, extra = {}) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0.05, ...extra });
    mats.push(m);
    return m;
  };
  const cloth = M(opts.color);
  const dark = M(new THREE.Color(opts.color).multiplyScalar(0.45));
  const skin = M(opts.skin);
  const elMat = M(el.color, { emissive: el.color, emissiveIntensity: 0.6 });
  const metal = M(0xb8c0cc, { metalness: 0.7, roughness: 0.35 });
  const black = M(0x1b1b1f);
  const teamMat = opts.team ? M(opts.team, { emissive: opts.team, emissiveIntensity: 0.35 }) : null;

  const wide = opts.cls === 'tanque' ? 1.25 : opts.cls === 'ninja' ? 0.9 : 1;
  const body = new THREE.Group();
  root.add(body);

  const hips = new THREE.Group();
  hips.position.y = 0.95;
  body.add(hips);

  // Tronco
  const torso = new THREE.Group();
  hips.add(torso);
  torso.add(mesh(box(0.62 * wide, 0.72, 0.36 * wide), cloth, 0, 0.38, 0));
  torso.add(mesh(box(0.64 * wide, 0.12, 0.38 * wide), dark, 0, 0.04, 0)); // cinto
  torso.add(mesh(box(0.12, 0.1, 0.05), elMat, 0, 0.05, 0.2 * wide)); // fivela com cor do elemento
  if (teamMat) torso.add(mesh(box(0.66 * wide, 0.1, 0.4 * wide), teamMat, 0, 0.6, 0)); // faixa do time
  if (opts.cls === 'tanque') {
    torso.add(mesh(box(0.34, 0.2, 0.46), metal, -0.42 * wide, 0.7, 0));
    torso.add(mesh(box(0.34, 0.2, 0.46), metal, 0.42 * wide, 0.7, 0));
    torso.add(mesh(box(0.5, 0.4, 0.06), metal, 0, 0.42, 0.2 * wide));
  }
  if (opts.cls === 'mago') {
    const robe = mesh(cyl(0.3, 0.46, 0.75, 10), cloth, 0, -0.32, 0);
    torso.add(robe);
  }
  if (opts.cls === 'ninja') torso.add(mesh(box(0.66 * wide, 0.06, 0.4), elMat, 0, 0.55, 0));

  // Cabeça
  const head = new THREE.Group();
  head.position.y = 0.88;
  torso.add(head);
  head.add(mesh(box(0.36, 0.38, 0.36), skin, 0, 0.17, 0));
  head.add(mesh(box(0.07, 0.06, 0.02), black, -0.08, 0.2, 0.185));
  head.add(mesh(box(0.07, 0.06, 0.02), black, 0.08, 0.2, 0.185));
  if (opts.cls === 'ninja') head.add(mesh(box(0.38, 0.16, 0.38), dark, 0, 0.06, 0.005)); // máscara

  // Acessório
  switch (opts.hat) {
    case 'capacete':
      head.add(mesh(box(0.42, 0.18, 0.42), opts.gun ? M(0x4a5532) : metal, 0, 0.38, 0));
      head.add(mesh(box(0.44, 0.04, 0.48), opts.gun ? M(0x3d4628) : metal, 0, 0.3, 0.02));
      break;
    case 'bandana':
      head.add(mesh(box(0.39, 0.08, 0.39), elMat, 0, 0.3, 0));
      head.add(mesh(box(0.06, 0.06, 0.25), elMat, 0.08, 0.28, -0.3));
      break;
    case 'chapeu': {
      const brim = mesh(cyl(0.38, 0.38, 0.04, 14), dark, 0, 0.37, 0);
      const cone = mesh(new THREE.ConeGeometry(0.22, 0.55, 12), dark, 0, 0.65, 0);
      cone.rotation.z = 0.15;
      head.add(brim, cone);
      head.add(mesh(cyl(0.225, 0.225, 0.06, 12), elMat, 0, 0.41, 0));
      break;
    }
    case 'chifres': {
      const hornGeo = new THREE.ConeGeometry(0.06, 0.28, 8);
      const h1 = mesh(hornGeo, M(0xeeeadd), -0.16, 0.42, 0); h1.rotation.z = 0.5;
      const h2 = mesh(hornGeo, M(0xeeeadd), 0.16, 0.42, 0); h2.rotation.z = -0.5;
      head.add(h1, h2);
      break;
    }
    case 'coroa': {
      const gold = M(0xffcc33, { metalness: 0.8, roughness: 0.3 });
      head.add(mesh(cyl(0.2, 0.2, 0.1, 10), gold, 0, 0.41, 0));
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        head.add(mesh(new THREE.ConeGeometry(0.04, 0.12, 6), gold, Math.cos(a) * 0.18, 0.51, Math.sin(a) * 0.18));
      }
      break;
    }
    default: break;
  }

  // Braços
  function makeArm(side) {
    const pivot = new THREE.Group();
    pivot.position.set(side * (0.39 * wide), 0.66, 0);
    torso.add(pivot);
    pivot.add(mesh(box(0.17 * wide, 0.32, 0.17 * wide), cloth, 0, -0.14, 0));
    const fore = new THREE.Group();
    fore.position.y = -0.3;
    pivot.add(fore);
    fore.add(mesh(box(0.15 * wide, 0.3, 0.15 * wide), opts.cls === 'tanque' ? metal : skin, 0, -0.14, 0));
    const hand = new THREE.Group();
    hand.position.y = -0.32;
    fore.add(hand);
    hand.add(mesh(box(0.15 * wide, 0.13, 0.15 * wide), opts.cls === 'tanque' ? metal : skin, 0, 0, 0));
    return { pivot, fore, hand };
  }
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // Pernas
  function makeLeg(side) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.16 * wide, 0, 0);
    hips.add(pivot);
    pivot.add(mesh(box(0.21 * wide, 0.48, 0.22 * wide), dark, 0, -0.22, 0));
    const shin = new THREE.Group();
    shin.position.y = -0.46;
    pivot.add(shin);
    shin.add(mesh(box(0.19 * wide, 0.44, 0.2 * wide), dark, 0, -0.2, 0));
    shin.add(mesh(box(0.21 * wide, 0.1, 0.32 * wide), black, 0, -0.44, 0.05));
    return { pivot, shin };
  }
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  // Arma
  const weapon = new THREE.Group();
  if (opts.gun) {
    buildGunModel(weapon, opts.gun, M);
    weapon.position.set(0, -0.02, 0.05);
    weapon.rotation.x = Math.PI / 2;
    armR.hand.add(weapon);
  } else {
    switch (opts.cls) {
      case 'guerreiro': {
        const blade = mesh(box(0.08, 1.05, 0.03), metal, 0, 0.62, 0);
        const edge = mesh(box(0.02, 1.0, 0.035), elMat, 0, 0.62, 0);
        const guard = mesh(box(0.32, 0.06, 0.08), dark, 0, 0.08, 0);
        const grip = mesh(box(0.05, 0.2, 0.05), black, 0, -0.04, 0);
        weapon.add(blade, edge, guard, grip);
        weapon.rotation.x = Math.PI / 2;
        armR.hand.add(weapon);
        break;
      }
      case 'ninja': {
        const k1 = new THREE.Group();
        k1.add(mesh(box(0.04, 0.4, 0.02), metal, 0, 0.25, 0), mesh(box(0.03, 0.35, 0.025), elMat, 0, 0.24, 0));
        k1.rotation.x = Math.PI / 2;
        weapon.add(k1);
        armR.hand.add(weapon);
        const k2 = k1.clone();
        armL.hand.add(k2);
        break;
      }
      case 'tanque': {
        armR.hand.add(mesh(box(0.26, 0.24, 0.26), metal, 0, -0.02, 0));
        armL.hand.add(mesh(box(0.26, 0.24, 0.26), metal, 0, -0.02, 0));
        armR.hand.add(mesh(box(0.27, 0.05, 0.27), elMat, 0, -0.08, 0));
        armL.hand.add(mesh(box(0.27, 0.05, 0.27), elMat, 0, -0.08, 0));
        break;
      }
      case 'mago': {
        weapon.add(mesh(cyl(0.03, 0.035, 1.5, 6), M(0x6b4423), 0, 0.3, 0));
        const orb = mesh(sph(0.11), elMat, 0, 1.08, 0);
        weapon.add(orb);
        weapon.rotation.x = Math.PI / 2;
        armR.hand.add(weapon);
        break;
      }
      default: break;
    }
  }

  const s = cls.scale;
  root.scale.setScalar(s);
  const model = { root, body, hips, torso, head, armL, armR, legL, legR, weapon, mats, height: 1.95 * s, elColor: el.color };
  root.userData.model = model;
  return model;
}

export function buildGunModel(group, kind, M) {
  const mk = M || ((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, metalness: 0.3 }));
  const gm = mk(0x2a2d31);
  const wood = mk(0x5a3d22);
  const add = (g, mat, x, y, z) => { const m = new THREE.Mesh(g, mat); m.position.set(x, y, z); m.castShadow = true; group.add(m); return m; };
  if (kind === 'sniper') {
    add(box(0.07, 0.09, 0.9), gm, 0, 0, 0.25);
    add(box(0.07, 0.12, 0.35), wood, 0, -0.03, -0.25);
    add(cyl(0.035, 0.035, 0.28, 8), gm, 0, 0.09, 0.15).rotation.x = Math.PI / 2;
    add(cyl(0.015, 0.015, 0.35, 6), gm, 0, 0.0, 0.85).rotation.x = Math.PI / 2;
  } else if (kind === 'lmg') {
    add(box(0.12, 0.13, 0.75), gm, 0, 0, 0.2);
    add(box(0.14, 0.14, 0.18), mk(0x4b5320), 0, -0.12, 0.1);
    add(cyl(0.025, 0.025, 0.4, 6), gm, 0, 0.0, 0.75).rotation.x = Math.PI / 2;
    add(box(0.07, 0.12, 0.25), gm, 0, -0.02, -0.25);
  } else if (kind === 'smg') {
    add(box(0.07, 0.1, 0.42), gm, 0, 0, 0.12);
    add(box(0.05, 0.18, 0.06), gm, 0, -0.12, 0.15);
    add(cyl(0.02, 0.02, 0.15, 6), gm, 0, 0, 0.4).rotation.x = Math.PI / 2;
  } else if (kind === 'pistol') {
    add(box(0.05, 0.08, 0.22), gm, 0, 0, 0.06);
    add(box(0.045, 0.14, 0.06), gm, 0, -0.08, -0.01);
  } else { // rifle
    add(box(0.07, 0.1, 0.6), gm, 0, 0, 0.18);
    add(box(0.06, 0.16, 0.06), gm, 0, -0.12, 0.18);
    add(box(0.065, 0.11, 0.25), wood, 0, -0.02, -0.2);
    add(cyl(0.018, 0.018, 0.25, 6), gm, 0, 0.01, 0.58).rotation.x = Math.PI / 2;
  }
  return group;
}

// ---------------- Animação procedural ----------------
const lerp = (a, b, t) => a + (b - a) * t;
function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

/**
 * st: { phase, speed(0-1), action, at (0-1), air, block, hurt, dead, gun, aimPitch }
 */
export function poseCharacter(m, st, dt) {
  const k = Math.min(1, dt * 14);
  const target = {
    aLx: 0, aLz: 0.08, aRx: 0, aRz: -0.08, fL: 0, fR: 0,
    lLx: 0, lRx: 0, sL: 0, sR: 0, hipsY: 0.95, torsoX: 0, torsoY: 0, bodyY: 0, headX: 0,
  };
  const sp = st.speed || 0;
  const ph = st.phase || 0;

  // Base: idle / caminhada
  const sw = Math.sin(ph) * 0.9 * sp;
  target.lLx = sw; target.lRx = -sw;
  target.sL = Math.max(0, -Math.sin(ph)) * 1.0 * sp; target.sR = Math.max(0, Math.sin(ph)) * 1.0 * sp;
  target.aLx = -sw * 0.8; target.aRx = sw * 0.8;
  target.fL = -0.3 - 0.3 * sp; target.fR = -0.3 - 0.3 * sp;
  target.hipsY = 0.95 + Math.abs(Math.cos(ph)) * 0.06 * sp + Math.sin(performance.now() / 500) * 0.01;
  target.torsoX = 0.1 * sp;

  if (st.gun) {
    target.aRx = -1.45 + (st.aimPitch || 0); target.aRz = 0.0; target.fR = -0.15;
    target.aLx = -1.35 + (st.aimPitch || 0); target.aLz = 0.6; target.fL = -0.6;
    target.headX = -(st.aimPitch || 0) * 0.5;
  }

  if (st.air) { target.lLx = -0.6; target.lRx = 0.3; target.sL = 1.1; target.sR = 0.4; target.aLz = 0.6; target.aRz = -0.6; }

  const t = st.at || 0;
  switch (st.action) {
    case 'light': { // golpe rápido braço direito
      const p = t < 0.4 ? ease(t / 0.4) : 1 - ease((t - 0.4) / 0.6) * 0.6;
      target.aRx = lerp(-0.4, -1.7, p); target.aRz = lerp(-0.6, 0.2, p); target.fR = lerp(-1.2, 0, p);
      target.torsoY = lerp(0.5, -0.4, p);
      break;
    }
    case 'light2': {
      const p = t < 0.4 ? ease(t / 0.4) : 1 - ease((t - 0.4) / 0.6) * 0.6;
      target.aLx = lerp(-0.4, -1.7, p); target.aLz = lerp(0.6, -0.2, p); target.fL = lerp(-1.2, 0, p);
      target.aRx = -2.2 + p * 0.5; target.aRz = -0.5;
      target.torsoY = lerp(-0.5, 0.4, p);
      break;
    }
    case 'light3': { // golpe descendente
      const p = ease(Math.min(1, t / 0.5));
      target.aRx = lerp(-3.0, -0.6, p); target.aLx = lerp(-3.0, -0.6, p); target.fR = 0; target.fL = 0;
      target.torsoX = lerp(-0.3, 0.5, p);
      break;
    }
    case 'spin': {
      target.torsoY = 0; target.aRz = -1.5; target.aLz = 1.5; target.aRx = -0.2; target.aLx = -0.2; target.fR = 0; target.fL = 0;
      target.bodyY = ease(t) * Math.PI * 2;
      break;
    }
    case 'kick': {
      target.lRx = -1.6; target.sR = 0; target.lLx = 0.4; target.sL = 0.6; target.torsoX = -0.35; target.aLz = 0.9; target.aRz = -0.9;
      break;
    }
    case 'charge': {
      target.torsoX = 0.6; target.aRx = -1.4; target.aLx = -1.4; target.aLz = -0.3; target.aRz = 0.3; target.fL = -0.2; target.fR = -0.2;
      target.lLx = Math.sin(t * 40) * 0.9; target.lRx = -Math.sin(t * 40) * 0.9;
      break;
    }
    case 'cast': {
      const p = ease(Math.min(1, t / 0.35));
      target.aRx = lerp(-0.5, -1.6, p); target.aLx = lerp(-0.5, -1.6, p); target.fR = 0; target.fL = 0;
      target.aRz = 0.2; target.aLz = -0.2; target.torsoX = -0.1 * p;
      break;
    }
    case 'slam': {
      const up = t < 0.5;
      const p = up ? ease(t / 0.5) : ease((t - 0.5) / 0.5);
      if (up) { target.aRx = lerp(0, -3.0, p); target.aLx = lerp(0, -3.0, p); target.torsoX = -0.3 * p; target.hipsY = 0.95 + p * 0.25; }
      else { target.aRx = lerp(-3.0, -0.5, p); target.aLx = lerp(-3.0, -0.5, p); target.torsoX = lerp(-0.3, 0.7, p); target.hipsY = lerp(1.2, 0.7, p); target.lLx = -0.6; target.sL = 1.2; target.lRx = 0.5; }
      target.fR = 0; target.fL = 0;
      break;
    }
    case 'throw': {
      const p = ease(t);
      target.aRx = lerp(-2.6, -0.8, p); target.fR = lerp(-1.4, 0, p); target.torsoY = lerp(0.6, -0.4, p);
      break;
    }
    default: break;
  }

  if (st.block) {
    target.aRx = -1.5; target.aLx = -1.5; target.aRz = 0.75; target.aLz = -0.75; target.fR = -1.6; target.fL = -1.6; target.torsoX = 0.15;
  }
  if (st.hurt) { target.torsoX = -0.4; target.headX = -0.3; target.aRz = -0.8; target.aLz = 0.8; }

  m.armL.pivot.rotation.x = lerp(m.armL.pivot.rotation.x, target.aLx, k);
  m.armL.pivot.rotation.z = lerp(m.armL.pivot.rotation.z, target.aLz, k);
  m.armR.pivot.rotation.x = lerp(m.armR.pivot.rotation.x, target.aRx, k);
  m.armR.pivot.rotation.z = lerp(m.armR.pivot.rotation.z, target.aRz, k);
  m.armL.fore.rotation.x = lerp(m.armL.fore.rotation.x, target.fL, k);
  m.armR.fore.rotation.x = lerp(m.armR.fore.rotation.x, target.fR, k);
  m.legL.pivot.rotation.x = lerp(m.legL.pivot.rotation.x, target.lLx, k);
  m.legR.pivot.rotation.x = lerp(m.legR.pivot.rotation.x, target.lRx, k);
  m.legL.shin.rotation.x = lerp(m.legL.shin.rotation.x, target.sL, k);
  m.legR.shin.rotation.x = lerp(m.legR.shin.rotation.x, target.sR, k);
  m.hips.position.y = lerp(m.hips.position.y, target.hipsY, k);
  m.torso.rotation.x = lerp(m.torso.rotation.x, target.torsoX, k);
  m.torso.rotation.y = lerp(m.torso.rotation.y, target.torsoY, k);
  m.head.rotation.x = lerp(m.head.rotation.x, target.headX, k);
  if (st.action === 'spin') m.body.rotation.y = target.bodyY;
  else m.body.rotation.y = lerp(m.body.rotation.y % (Math.PI * 2), 0, k);

  // morto: deitar
  const deadT = st.dead ? 1 : 0;
  m.body.rotation.x = lerp(m.body.rotation.x, -Math.PI / 2 * deadT, Math.min(1, dt * 6));
  m.body.position.y = lerp(m.body.position.y, deadT * 0.25, Math.min(1, dt * 6));
}

export function flashModel(m, color, intensity) {
  for (const mat of m.mats) {
    if (!mat.userData.baseEm) {
      mat.userData.baseEm = mat.emissive.clone();
      mat.userData.baseEi = mat.emissiveIntensity;
    }
    if (intensity > 0) { mat.emissive.set(color); mat.emissiveIntensity = intensity; }
    else { mat.emissive.copy(mat.userData.baseEm); mat.emissiveIntensity = mat.userData.baseEi; }
  }
}

export function setModelOpacity(m, op) {
  for (const mat of m.mats) {
    mat.transparent = op < 1;
    mat.opacity = op;
    mat.depthWrite = op >= 1;
  }
}
