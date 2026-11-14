// Original clothing catalog: accessories, costumes and space suits.
import * as THREE from 'three';
import { canvasTexture } from './util.js';

const mats = {};
const M = (c, o = {}) => {
  const k = c + JSON.stringify(o);
  return mats[k] || (mats[k] = new THREE.MeshStandardMaterial({ color: c, roughness: 0.6, ...o }));
};
function mesh(parent, geo, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.set(rx, ry, rz); m.castShadow = true; parent.add(m); return m;
}
let starTex;
function stars() {
  if (!starTex) starTex = canvasTexture(128, 128, (g) => {
    g.fillStyle = '#2a0f5c'; g.fillRect(0, 0, 128, 128);
    for (let i = 0; i < 60; i++) { g.fillStyle = Math.random() < 0.3 ? '#ffd54f' : '#fff'; const s = Math.random() * 2.5 + 0.5; g.fillRect(Math.random() * 128, Math.random() * 128, s, s); }
  }, THREE);
  return starTex;
}
const band = (p, y, color, r = 0.435, emissive = 0) => mesh(p, new THREE.TorusGeometry(r, 0.035, 6, 24), M(color, emissive ? { emissive: color, emissiveIntensity: emissive } : {}), 0, y, 0, Math.PI / 2);
const antennas = (h, color = 0x76ff03) => { for (const s of [-1, 1]) { mesh(h, new THREE.CylinderGeometry(0.015, 0.015, 0.35), M(0x333333), s * 0.14, 0.42, 0, 0, 0, -s * 0.3); mesh(h, new THREE.SphereGeometry(0.06, 10, 8), M(color, { emissive: color, emissiveIntensity: 0.6 }), s * 0.24, 0.58, 0); } };
const cape = (b, mat) => { mesh(b, new THREE.BoxGeometry(0.8, 1.05, 0.03), mat, 0, 0.32, -0.47, 0.18); mesh(b, new THREE.TorusGeometry(0.33, 0.04, 6, 16, Math.PI), mat, 0, 0.88, -0.05, Math.PI / 2, 0, 0); };

// Each item: slot (face|neck|back|suit), name, price, cur ('$' or '⭐'), build(color) -> {head?, body?}
// Suits can also override colors: shirt, pants, skin, metal.
export const ITEMS = {
  // ---------- Earth: face ----------
  sunglasses: { slot: 'face', name: 'Óculos Escuros', price: 60, cur: '$', build() { const h = new THREE.Group(); const k = M(0x111111, { metalness: 0.5, roughness: 0.2 });
    for (const s of [-1, 1]) { mesh(h, new THREE.BoxGeometry(0.17, 0.1, 0.04), k, s * 0.13, 0.06, 0.335); mesh(h, new THREE.BoxGeometry(0.02, 0.03, 0.3), k, s * 0.31, 0.07, 0.18); }
    mesh(h, new THREE.BoxGeometry(0.1, 0.03, 0.03), k, 0, 0.08, 0.35); return { head: h }; } },
  roundglasses: { slot: 'face', name: 'Óculos Redondos', price: 45, cur: '$', build() { const h = new THREE.Group(); const k = M(0xc9a227, { metalness: 0.8, roughness: 0.3 });
    for (const s of [-1, 1]) mesh(h, new THREE.TorusGeometry(0.075, 0.014, 6, 16), k, s * 0.13, 0.06, 0.35); mesh(h, new THREE.BoxGeometry(0.08, 0.015, 0.015), k, 0, 0.07, 0.36); return { head: h }; } },
  mustache: { slot: 'face', name: 'Bigodão', price: 30, cur: '$', build(c) { const h = new THREE.Group();
    for (const s of [-1, 1]) mesh(h, new THREE.SphereGeometry(0.06, 10, 8), M(0x4e342e), s * 0.065, -0.04, 0.34, 0, 0, -s * 0.35).scale.set(1.8, 0.7, 0.8); return { head: h }; } },
  beard: { slot: 'face', name: 'Barba Cheia', price: 50, cur: '$', build() { const h = new THREE.Group(); mesh(h, new THREE.SphereGeometry(0.3, 14, 10), M(0x5d4037), 0, -0.2, 0.09).scale.set(1, 0.75, 0.8); return { head: h }; } },
  clownnose: { slot: 'face', name: 'Nariz de Palhaço', price: 15, cur: '$', build() { const h = new THREE.Group(); mesh(h, new THREE.SphereGeometry(0.075, 12, 10), M(0xe53935, { roughness: 0.2 }), 0, -0.01, 0.37); return { head: h }; } },
  heromask: { slot: 'face', name: 'Máscara de Herói', price: 80, cur: '$', build(c) { const h = new THREE.Group(); mesh(h, new THREE.CylinderGeometry(0.372, 0.372, 0.13, 24, 1, true, -1.3, 2.6), M(c, { side: THREE.DoubleSide }), 0, 0.06, 0); return { head: h }; } },
  // ---------- Earth: neck ----------
  tie: { slot: 'neck', name: 'Gravata', price: 40, cur: '$', build(c) { const b = new THREE.Group(); mesh(b, new THREE.BoxGeometry(0.11, 0.08, 0.06), M(c), 0, 0.84, 0.37); mesh(b, new THREE.BoxGeometry(0.11, 0.42, 0.03), M(c), 0, 0.55, 0.435, -0.08); return { body: b }; } },
  bowtie: { slot: 'neck', name: 'Gravata Borboleta', price: 35, cur: '$', build(c) { const b = new THREE.Group(); for (const s of [-1, 1]) mesh(b, new THREE.ConeGeometry(0.06, 0.13, 8), M(c), s * 0.07, 0.86, 0.36, 0, 0, s * Math.PI / 2); mesh(b, new THREE.SphereGeometry(0.035, 8, 6), M(c), 0, 0.86, 0.37); return { body: b }; } },
  lei: { slot: 'neck', name: 'Colar Havaiano', price: 25, cur: '$', build() { const b = new THREE.Group(); const cols = [0xff4081, 0xffeb3b, 0xff9800, 0xe040fb];
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; mesh(b, new THREE.SphereGeometry(0.06, 8, 6), M(cols[i % 4]), Math.cos(a) * 0.36, 0.86 - Math.max(0, Math.sin(a)) * 0.12, Math.sin(a) * 0.36); } return { body: b }; } },
  scarf: { slot: 'neck', name: 'Cachecol', price: 30, cur: '$', build(c) { const b = new THREE.Group(); mesh(b, new THREE.TorusGeometry(0.31, 0.07, 8, 20), M(c), 0, 0.93, 0, Math.PI / 2); mesh(b, new THREE.BoxGeometry(0.12, 0.35, 0.05), M(c), 0.15, 0.72, 0.4, -0.1, 0, 0.1); return { body: b }; } },
  medal: { slot: 'neck', name: 'Medalha de Ouro', price: 300, cur: '$', build() { const b = new THREE.Group(); mesh(b, new THREE.TorusGeometry(0.3, 0.02, 6, 20, Math.PI), M(0x1e88e5), 0, 0.92, 0.05, Math.PI / 2 + 0.6); mesh(b, new THREE.CylinderGeometry(0.09, 0.09, 0.03, 16), M(0xffd54f, { metalness: 0.9, roughness: 0.2 }), 0, 0.68, 0.43, Math.PI / 2); return { body: b }; } },
  // ---------- Earth: back ----------
  backpack: { slot: 'back', name: 'Mochila', price: 70, cur: '$', build(c) { const b = new THREE.Group(); mesh(b, new THREE.BoxGeometry(0.55, 0.6, 0.25), M(c), 0, 0.5, -0.52); mesh(b, new THREE.BoxGeometry(0.4, 0.2, 0.08), M(0x333333), 0, 0.35, -0.67); return { body: b }; } },
  cape: { slot: 'back', name: 'Capa de Herói', price: 150, cur: '$', build(c) { const b = new THREE.Group(); cape(b, M(c, { side: THREE.DoubleSide })); return { body: b }; } },
  pizzabag: { slot: 'back', name: 'Bag de Entrega', price: 90, cur: '$', build() { const b = new THREE.Group(); mesh(b, new THREE.BoxGeometry(0.65, 0.62, 0.38), M(0xd32f2f), 0, 0.55, -0.6); mesh(b, new THREE.BoxGeometry(0.66, 0.12, 0.39), M(0xffffff), 0, 0.6, -0.6); return { body: b }; } },
  wings: { slot: 'back', name: 'Asinhas', price: 200, cur: '$', build() { const b = new THREE.Group(); for (const s of [-1, 1]) mesh(b, new THREE.SphereGeometry(0.4, 12, 8), M(0xffffff), s * 0.28, 0.7, -0.48, 0, 0, s * 0.6).scale.set(0.2, 1, 0.55); return { body: b }; } },
  // ---------- Earth: costumes ----------
  chef: { slot: 'suit', name: 'Roupa de Chef', price: 120, cur: '$', shirt: 0xffffff, pants: 0x212121, build() { const b = new THREE.Group(); mesh(b, new THREE.BoxGeometry(0.6, 0.65, 0.04), M(0xfafafa), 0, 0.25, 0.43); for (let i = 0; i < 3; i++) mesh(b, new THREE.SphereGeometry(0.03, 6, 6), M(0x212121), 0.12, 0.85 - i * 0.12, 0.39); return { body: b }; } },
  firefighter: { slot: 'suit', name: 'Uniforme de Bombeiro', price: 150, cur: '$', shirt: 0xc62828, pants: 0x37474f, build() { const b = new THREE.Group(); band(b, 0.3, 0xfff176, 0.435, 0.4); band(b, 0.58, 0xfff176, 0.435, 0.4); return { body: b }; } },
  pirate: { slot: 'suit', name: 'Fantasia de Pirata', price: 220, cur: '$', shirt: 0xfafafa, pants: 0x4e342e, build() { const b = new THREE.Group(), h = new THREE.Group();
    mesh(b, new THREE.CylinderGeometry(0.44, 0.44, 0.75, 20, 1, true, 0.6, Math.PI * 2 - 1.2), M(0x212121, { side: THREE.DoubleSide }), 0, 0.45, 0);
    band(b, 0.12, 0xc62828, 0.44);
    mesh(h, new THREE.CylinderGeometry(0.08, 0.08, 0.02, 12), M(0x111111), 0.13, 0.06, 0.34, Math.PI / 2);
    mesh(h, new THREE.TorusGeometry(0.365, 0.012, 4, 24), M(0x111111), 0, 0.12, 0, 0.35, 0, 0); return { body: b, head: h }; } },
  wizard: { slot: 'suit', name: 'Fantasia de Mago', price: 260, cur: '$', shirt: 0x5e35b1, pants: 0x5e35b1, build() { const b = new THREE.Group(), h = new THREE.Group();
    mesh(b, new THREE.ConeGeometry(0.62, 1.1, 20, 1, true), M(0x4527a0, { side: THREE.DoubleSide }), 0, 0.15, 0);
    for (let i = 0; i < 6; i++) mesh(b, new THREE.OctahedronGeometry(0.05), M(0xffd54f, { emissive: 0xffd54f, emissiveIntensity: 0.5 }), Math.cos(i) * 0.45, -0.1 + i * 0.1, Math.sin(i) * 0.45);
    mesh(h, new THREE.ConeGeometry(0.2, 0.55, 12), M(0xeeeeee), 0, -0.4, 0.22, Math.PI - 0.3); return { body: b, head: h }; } },
  dino: { slot: 'suit', name: 'Fantasia de Dinossauro', price: 350, cur: '$', shirt: 0x43a047, pants: 0x388e3c, build() { const b = new THREE.Group(), h = new THREE.Group(); const g = M(0x2e7d32);
    mesh(b, new THREE.ConeGeometry(0.25, 1.1, 12), M(0x43a047), 0, 0.0, -0.75, -Math.PI / 2 - 0.35);
    for (let i = 0; i < 5; i++) mesh(b, new THREE.ConeGeometry(0.08, 0.2, 4), g, 0, 0.95 - i * 0.22, -0.42 - (i > 3 ? 0.05 : 0), -0.5);
    mesh(b, new THREE.SphereGeometry(0.3, 12, 10), M(0xc5e1a5), 0, 0.35, 0.22).scale.set(1, 1.3, 0.7);
    for (let i = 0; i < 3; i++) mesh(h, new THREE.ConeGeometry(0.07, 0.18, 4), g, 0, 0.33 - i * 0.08, -0.12 - i * 0.12, -0.6 - i * 0.4);
    return { body: b, head: h }; } },
  bee: { slot: 'suit', name: 'Fantasia de Abelha', price: 180, cur: '$', shirt: 0xfdd835, pants: 0x212121, build() { const b = new THREE.Group(), h = new THREE.Group();
    band(b, 0.25, 0x212121, 0.44); band(b, 0.55, 0x212121, 0.44);
    for (const s of [-1, 1]) mesh(b, new THREE.SphereGeometry(0.3, 10, 8), M(0xe3f2fd, { transparent: true, opacity: 0.6 }), s * 0.25, 0.75, -0.45, 0, 0, s * 0.7).scale.set(0.15, 1, 0.6);
    antennas(h, 0x212121); return { body: b, head: h }; } },
  robot: { slot: 'suit', name: 'Fantasia de Robô', price: 400, cur: '$', shirt: 0x90a4ae, pants: 0x607d8b, skin: 0xb0bec5, metal: true, build() { const b = new THREE.Group(), h = new THREE.Group();
    mesh(b, new THREE.BoxGeometry(0.45, 0.4, 0.06), M(0x37474f), 0, 0.5, 0.42);
    [0xff1744, 0x00e676, 0x2979ff].forEach((c, i) => mesh(b, new THREE.SphereGeometry(0.045, 8, 6), M(c, { emissive: c, emissiveIntensity: 0.8 }), -0.12 + i * 0.12, 0.55, 0.46));
    mesh(h, new THREE.CylinderGeometry(0.015, 0.015, 0.3), M(0x546e7a), 0, 0.48, 0); mesh(h, new THREE.SphereGeometry(0.06, 8, 6), M(0xff1744, { emissive: 0xff1744, emissiveIntensity: 1 }), 0, 0.65, 0);
    return { body: b, head: h }; } },
  knight: { slot: 'suit', name: 'Armadura de Cavaleiro', price: 600, cur: '$', shirt: 0x9e9e9e, pants: 0x757575, metal: true, build() { const b = new THREE.Group();
    mesh(b, new THREE.SphereGeometry(0.4, 14, 10), M(0xcfd8dc, { metalness: 0.8, roughness: 0.25 }), 0, 0.5, 0.1).scale.set(1.05, 1.1, 0.9);
    for (const s of [-1, 1]) mesh(b, new THREE.SphereGeometry(0.2, 10, 8), M(0xb0bec5, { metalness: 0.8, roughness: 0.3 }), s * 0.45, 0.82, 0);
    mesh(b, new THREE.BoxGeometry(0.08, 0.3, 0.02), M(0xc62828), 0, 0.55, 0.47); mesh(b, new THREE.BoxGeometry(0.22, 0.07, 0.02), M(0xc62828), 0, 0.6, 0.47); return { body: b }; } },
  farmer: { slot: 'suit', name: 'Macacão de Fazendeiro', price: 100, cur: '$', shirt: 0xd32f2f, pants: 0x1565c0, build() { const b = new THREE.Group(); const j = M(0x1565c0);
    mesh(b, new THREE.BoxGeometry(0.5, 0.45, 0.05), j, 0, 0.35, 0.42); for (const s of [-1, 1]) mesh(b, new THREE.BoxGeometry(0.07, 0.6, 0.04), j, s * 0.18, 0.7, 0.36, -0.35);
    mesh(b, new THREE.BoxGeometry(0.2, 0.15, 0.06), M(0x0d47a1), 0, 0.42, 0.45); return { body: b }; } },

  // ---------- Space (⭐): face/back/costumes ----------
  visor: { slot: 'face', name: 'Visor Neon', price: 8, cur: '⭐', build() { const h = new THREE.Group(); mesh(h, new THREE.CylinderGeometry(0.385, 0.385, 0.14, 24, 1, true, -1.2, 2.4), M(0x18ffff, { emissive: 0x18ffff, emissiveIntensity: 0.9, transparent: true, opacity: 0.75, side: THREE.DoubleSide }), 0, 0.06, 0); return { head: h }; } },
  jetpack: { slot: 'back', name: 'Jetpack (voa!)', price: 40, cur: '⭐', build() { const b = new THREE.Group(); const k = M(0xb0bec5, { metalness: 0.7, roughness: 0.3 });
    for (const s of [-1, 1]) { mesh(b, new THREE.CylinderGeometry(0.12, 0.12, 0.55, 12), k, s * 0.16, 0.55, -0.55); mesh(b, new THREE.ConeGeometry(0.1, 0.15, 10), M(0x455a64), s * 0.16, 0.22, -0.55, Math.PI); }
    mesh(b, new THREE.BoxGeometry(0.2, 0.3, 0.1), M(0xff6d00), 0, 0.6, -0.5);
    const flames = []; for (const s of [-1, 1]) { const f = mesh(b, new THREE.ConeGeometry(0.09, 0.45, 10), M(0xffab00, { emissive: 0xff6d00, emissiveIntensity: 2, transparent: true, opacity: 0.85 }), s * 0.16, -0.05, -0.55, Math.PI); f.castShadow = false; f.visible = false; flames.push(f); }
    b.userData.flames = flames; return { body: b }; } },
  oxygen: { slot: 'back', name: 'Tanque de Oxigênio', price: 10, cur: '⭐', build() { const b = new THREE.Group(); mesh(b, new THREE.CylinderGeometry(0.17, 0.17, 0.7, 14), M(0xeceff1, { metalness: 0.4 }), 0, 0.5, -0.56); mesh(b, new THREE.CylinderGeometry(0.06, 0.06, 0.12), M(0x455a64), 0, 0.9, -0.56); return { body: b }; } },
  galaxycape: { slot: 'back', name: 'Capa Galáctica', price: 30, cur: '⭐', build() { const b = new THREE.Group(); cape(b, new THREE.MeshStandardMaterial({ map: stars(), emissive: 0xffffff, emissiveMap: stars(), emissiveIntensity: 0.4, side: THREE.DoubleSide })); return { body: b }; } },
  astronaut: { slot: 'suit', name: 'Traje de Astronauta', price: 25, cur: '⭐', shirt: 0xf5f5f5, pants: 0xeeeeee, build() { const b = new THREE.Group();
    mesh(b, new THREE.BoxGeometry(0.42, 0.3, 0.07), M(0x90a4ae), 0, 0.55, 0.42);
    [0x00e676, 0xff1744, 0xffea00].forEach((c, i) => mesh(b, new THREE.BoxGeometry(0.07, 0.05, 0.02), M(c, { emissive: c, emissiveIntensity: 1 }), -0.12 + i * 0.12, 0.6, 0.465));
    band(b, 0.18, 0xff6d00, 0.435); mesh(b, new THREE.BoxGeometry(0.5, 0.55, 0.2), M(0xe0e0e0), 0, 0.5, -0.48); return { body: b }; } },
  alien: { slot: 'suit', name: 'Fantasia de Alien', price: 35, cur: '⭐', shirt: 0x7b1fa2, pants: 0x4a148c, skin: 0x76ff03, build() { const b = new THREE.Group(), h = new THREE.Group();
    band(b, 0.1, 0x18ffff, 0.44, 1); mesh(b, new THREE.TorusGeometry(0.12, 0.03, 6, 16), M(0x18ffff, { emissive: 0x18ffff, emissiveIntensity: 1 }), 0, 0.55, 0.43);
    antennas(h); return { body: b, head: h }; } },
  captain: { slot: 'suit', name: 'Uniforme de Capitão Estelar', price: 60, cur: '⭐', shirt: 0x1a237e, pants: 0x0d47a1, build() { const b = new THREE.Group(); const gold = M(0xffd54f, { metalness: 0.9, roughness: 0.25 });
    for (const s of [-1, 1]) mesh(b, new THREE.BoxGeometry(0.28, 0.06, 0.32), gold, s * 0.38, 0.95, 0, 0, 0, s * -0.35);
    mesh(b, new THREE.OctahedronGeometry(0.08), gold, 0.18, 0.72, 0.4); band(b, 0.12, 0xffd54f, 0.44); return { body: b }; } },
  miner: { slot: 'suit', name: 'Traje de Minerador Lunar', price: 20, cur: '⭐', shirt: 0xff6f00, pants: 0x5d4037, build() { const b = new THREE.Group(), h = new THREE.Group();
    band(b, 0.12, 0x3e2723, 0.445); band(b, 0.55, 0xeeeeee, 0.435, 0.5);
    for (let i = 0; i < 3; i++) mesh(b, new THREE.BoxGeometry(0.08, 0.14, 0.06), M(0x795548), -0.25 + i * 0.25, 0.08, 0.44);
    mesh(h, new THREE.CylinderGeometry(0.07, 0.07, 0.06, 12), M(0xfff59d, { emissive: 0xfff59d, emissiveIntensity: 2 }), 0, 0.25, 0.3, Math.PI / 2 - 0.6); return { body: b, head: h }; } },
  cosmic: { slot: 'suit', name: 'Traje Cósmico', price: 80, cur: '⭐', shirt: 0x311b92, pants: 0x1a0063, build() { const b = new THREE.Group();
    for (let i = 0; i < 3; i++) band(b, 0.15 + i * 0.3, [0xff4081, 0x18ffff, 0xffea00][i], 0.44, 1.2);
    mesh(b, new THREE.OctahedronGeometry(0.1), M(0xffffff, { emissive: 0xffffff, emissiveIntensity: 1.5 }), 0, 0.65, 0.44); return { body: b }; } },
};
export const SLOT_NAMES = { hat: 'Chapéus', face: 'Rosto', neck: 'Pescoço', back: 'Costas', suit: 'Fantasias' };
