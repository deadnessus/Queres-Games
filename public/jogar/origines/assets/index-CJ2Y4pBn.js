var Dl = Object.defineProperty;
var Fl = (e, t, a) => t in e ? Dl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var g = (e, t, a) => Fl(e, typeof t != "symbol" ? t + "" : t, a);
import { C as Qt, M as ws, a as Ll, R as _l, P as Qi, V as Et, B as He, b as oa, c as rn, S as Kr, d as Ri, D as jl, I as Xr, e as Po, f as Ga, g as ge, h as wa, F as Xa, E as Yr, Q as bs, i as le, j as Hl, k as Ul, G as as, l as Lt, T as Jr, m as ue, n as Zr, o as Va, p as Qr, q as ln, r as t0, s as Wl, t as Gl, u as Vl, v as Kl, w as Xl, U as Yl, L as Jl, x as Zl, H as Ql, y as tc, z as ec, W as ac, A as sc, J as ic } from "./three-tIftsQV1.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    s(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const n of o.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && s(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function s(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const o = a(i);
    fetch(i.href, o);
  }
})();
function oc(e = document, t = window) {
  const a = (n) => {
    n.cancelable && n.preventDefault();
  };
  for (const n of ["gesturestart", "gesturechange", "gestureend"]) e.addEventListener(n, a, { passive: !1 });
  e.addEventListener("touchmove", (n) => {
    n.touches.length > 1 && a(n);
  }, { passive: !1 }), t.addEventListener("wheel", (n) => {
    n.ctrlKey && a(n);
  }, { passive: !1 });
  const s = t.visualViewport, i = e.querySelector('meta[name="viewport"]');
  if (!s || !i) return;
  let o = !1;
  s.addEventListener("resize", () => {
    if (s.scale <= 1.01 || o) return;
    const n = e.activeElement;
    if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return;
    o = !0;
    const r = i.getAttribute("content") ?? "";
    i.setAttribute("content", r + ", minimum-scale=1"), setTimeout(() => {
      i.setAttribute("content", r), o = !1;
    }, 300);
  });
}
const Q = 256;
function ra(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const qe = (e, t) => Math.trunc(e / t), Bi = 10, cn = 4, nc = [30, 60, 90, 115, 135, 150], ja = ["food", "wood", "stone", "metal", "coins"], Z = [
  { key: "villager", cls: "villager", hp: 25, atk: 3, armor: 0, range: 0.6, cd: 15, speed: 0.95, radius: 0.28, sight: 8, pop: 1, cost: { food: 50 }, time: 20, era: 0, hunt: 2.6 },
  { key: "warrior", cls: "infantry", hp: 40, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 40, wood: 20 }, time: 18, era: 0, next: "axeman" },
  { key: "hunter", cls: "ranged", hp: 30, atk: 4, armor: 0, range: 5, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 30 }, time: 20, era: 0, next: "archer", proj: "spear", muro: 25 },
  { key: "dog", cls: "scout", hp: 30, atk: 2, armor: 0, range: 0.6, cd: 10, speed: 1.9, radius: 0.25, sight: 12, pop: 1, cost: { food: 40 }, time: 15, era: 0, muro: 25 },
  { key: "axeman", cls: "infantry", hp: 55, atk: 7, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, wood: 25 }, time: 18, era: 1, next: "swordsman", muro: 200 },
  { key: "archer", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 40 }, time: 22, era: 1, next: "slinger", proj: "arrow", muro: 25 },
  { key: "spearman", cls: "spear", hp: 50, atk: 5, armor: 1, range: 0.9, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 35, wood: 25 }, time: 18, era: 1, next: "hoplite", bonus: [{ vs: "animal", dmg: 6 }, { vs: "cavalry", dmg: 8 }], muro: 50 },
  { key: "deer", cls: "animal", hp: 12, atk: 0, armor: 0, range: 0, cd: 10, speed: 0.9, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 150, mode: "flee", run: 1.8 } },
  { key: "boar", cls: "animal", hp: 40, atk: 3, armor: 0, range: 0.7, cd: 15, speed: 0.8, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 250, mode: "fight", run: 1.6 } },
  { key: "wolf", cls: "animal", hp: 20, atk: 3, armor: 0, range: 0.7, cd: 12, speed: 1.1, radius: 0.3, sight: 5, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 0, mode: "predator", run: 2 } },
  { key: "aurochs", cls: "animal", hp: 60, atk: 5, armor: 1, range: 0.8, cd: 15, speed: 0.7, radius: 0.45, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 400, mode: "fight", run: 1.4 } },
  { key: "barbarian", cls: "infantry", hp: 45, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 0, cost: {}, time: 0, era: 0 },
  // Era III (M2)
  { key: "swordsman", cls: "infantry", hp: 60, atk: 8, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, metal: 20 }, time: 20, era: 2, next: "hoplite", bonus: [{ vs: "spear", dmg: 3 }] },
  { key: "slinger", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 18, speed: 1.05, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, stone: 25 }, time: 20, era: 2, next: "velite", proj: "stone", bonus: [{ vs: "infantry", dmg: 2 }], muro: 50 },
  { key: "horseman", cls: "cavalry", hp: 90, atk: 8, armor: 1, range: 0.8, cd: 15, speed: 1.75, radius: 0.45, sight: 9, pop: 2, cost: { food: 60, metal: 35 }, time: 26, era: 2, next: "eques", bonus: [{ vs: "ranged", dmg: 4 }, { vs: "siege", dmg: 10 }], muro: 50 },
  { key: "ram", cls: "siege", hp: 160, atk: 35, armor: 4, range: 1.15, cd: 30, speed: 0.5, radius: 0.6, sight: 5, pop: 3, cost: { wood: 150, metal: 30 }, time: 35, era: 2, siege: !0, muro: 200 },
  // Era IV · Reino (M3). O espadachim e o lanceiro viram hoplitas (a falange: lança e escudo redondo, vence a cavalaria);
  // o cavaleiro vira eques. O fundeiro continua (vira vélite na República)
  { key: "hoplite", cls: "infantry", hp: 70, atk: 9, armor: 2, range: 0.9, cd: 15, speed: 0.9, radius: 0.3, sight: 7, pop: 1, cost: { food: 50, metal: 25 }, time: 22, era: 3, next: "hastatus", bonus: [{ vs: "cavalry", dmg: 6 }, { vs: "animal", dmg: 4 }] },
  { key: "eques", cls: "cavalry", hp: 100, atk: 9, armor: 2, range: 0.8, cd: 15, speed: 1.8, radius: 0.45, sight: 9, pop: 2, cost: { food: 60, metal: 30, coins: 10 }, time: 26, era: 3, bonus: [{ vs: "ranged", dmg: 4 }, { vs: "siege", dmg: 10 }], muro: 50 },
  // Era V · República (M3): a legião manipular (hastatus, triarius, vélite) e a artilharia (scorpio e ballista)
  { key: "hastatus", cls: "infantry", hp: 75, atk: 10, armor: 2, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 50, metal: 25, coins: 10 }, time: 22, era: 4, bonus: [{ vs: "spear", dmg: 3 }] },
  { key: "triarius", cls: "spear", hp: 75, atk: 7, armor: 3, range: 0.9, cd: 15, speed: 0.9, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, metal: 25, coins: 10 }, time: 22, era: 4, bonus: [{ vs: "cavalry", dmg: 9 }, { vs: "animal", dmg: 6 }], muro: 50 },
  { key: "velite", cls: "ranged", hp: 38, atk: 6, armor: 0, range: 5.5, cd: 18, speed: 1.1, radius: 0.28, sight: 8, pop: 1, cost: { food: 35, wood: 25, coins: 5 }, time: 20, era: 4, proj: "spear", bonus: [{ vs: "infantry", dmg: 3 }], muro: 25 },
  { key: "scorpio", cls: "siege", hp: 90, atk: 14, armor: 2, range: 9, cd: 35, speed: 0.55, radius: 0.5, sight: 10, pop: 3, cost: { wood: 120, metal: 40, coins: 30 }, time: 35, era: 4, proj: "bolt", bonus: [{ vs: "infantry", dmg: 4 }], muro: 25 },
  { key: "ballista", cls: "siege", hp: 110, atk: 45, armor: 2, range: 8, cd: 50, speed: 0.5, radius: 0.55, sight: 9, pop: 3, cost: { wood: 160, stone: 60, coins: 40 }, time: 40, era: 4, proj: "boulder", siege: !0, muro: 200 },
  // bárbaros das eras romanas (M3): a partir do Reino, as incursões trazem guerreiros gauleses, mais fortes
  { key: "gaul", cls: "infantry", hp: 65, atk: 8, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 0, cost: {}, time: 0, era: 3 }
], Mt = Object.fromEntries(Z.map((e, t) => [e.key, t])), Tt = 60, ut = 100, ct = [
  { key: "center", hp: 1200, size: 4, sight: 14, cost: {}, time: 0, era: 0, pop: [8, 10, 10, 10, 10, 10], drop: !0, trains: [["villager"], ["villager"], ["villager"]] },
  { key: "house", hp: 150, size: 2, sight: 5, cost: { wood: 30 }, time: 20, era: 0, pop: [4, 5, 6, 6, 6, 10], buildable: !0 },
  { key: "depot", hp: 200, size: 2, sight: 6, cost: { wood: 60 }, time: 25, era: 0, drop: !0, buildable: !0 },
  { key: "military", hp: 300, size: 3, sight: 7, cost: { wood: 100 }, time: 40, era: 0, trains: [["warrior", "hunter", "dog"], ["axeman", "spearman", "archer", "dog"], ["swordsman", "spearman", "slinger", "dog"], ["hoplite", "slinger", "dog"], ["hastatus", "triarius", "velite", "dog"]], buildable: !0 },
  { key: "farm", hp: 80, size: 3, sight: 3, cost: { wood: 60 }, time: 15, era: 1, walk: !0, buildable: !0 },
  { key: "pen", hp: 150, size: 3, sight: 5, cost: { wood: 80 }, time: 30, era: 1, buildable: !0 },
  { key: "sanctuary", hp: 250, size: 2, sight: 7, cost: { wood: 40, stone: 60 }, time: 40, era: 1, buildable: !0, cura: { r: 6, cd: 20 } },
  { key: "camp", hp: 400, size: 4, sight: 8, cost: {}, time: 0, era: 0 },
  // Era III (M2)
  { key: "forge", hp: 350, size: 2, sight: 6, cost: { wood: 100, stone: 60 }, time: 40, era: 2, buildable: !0, research: ["bronze", "iron"] },
  { key: "market", hp: 350, size: 3, sight: 7, cost: { wood: 150, stone: 40 }, time: 45, era: 2, buildable: !0, market: !0, research: ["wheel"] },
  { key: "stable", hp: 350, size: 3, sight: 7, cost: { wood: 150 }, time: 45, era: 2, buildable: !0, trains: [[], [], ["horseman"], ["eques"]] },
  { key: "workshop", hp: 350, size: 3, sight: 6, cost: { wood: 175 }, time: 45, era: 2, buildable: !0, trains: [[], [], ["ram"], ["ram"], ["ram", "scorpio", "ballista"]] },
  { key: "wall", hp: 450, size: 1, sight: 2, cost: { stone: 8 }, time: 6, era: 2, buildable: !0, wall: !0, next: "tufa" },
  // muralha de pedra (D35: 300 → 450 de vida)
  { key: "tower", hp: 450, size: 2, sight: 9, cost: { wood: 60, stone: 120 }, time: 50, era: 2, buildable: !0, tower: { atk: 6, range: 7, cd: 20 } },
  // muros (D35): paliçada de madeira no Neolítico; a partir da Idade dos Metais, a muralha de pedra (acima)
  { key: "palisade", hp: 200, size: 1, sight: 2, cost: { wood: 4 }, time: 4, era: 1, buildable: !0, wall: !0, next: "wall" },
  // Era IV · Reino (M3)
  { key: "tufa", hp: 600, size: 1, sight: 2, cost: { stone: 10 }, time: 7, era: 3, buildable: !0, wall: !0 },
  // muralha de tufo (a Muralha Serviana)
  { key: "temple", hp: 500, size: 3, sight: 8, cost: { wood: 100, stone: 150 }, time: 60, era: 3, buildable: !0, cura: { r: 8, cd: 10 } },
  { key: "mint", hp: 400, size: 2, sight: 6, cost: { stone: 120, metal: 80 }, time: 50, era: 3, buildable: !0, moedas: 40 },
  // casa da moeda: 1 moeda a cada 4 s
  // Era V · República (M3)
  { key: "aqueduct", hp: 600, size: 3, sight: 6, cost: { stone: 250, coins: 50 }, time: 70, era: 4, buildable: !0, pop: [0, 0, 0, 0, 20, 20] },
  { key: "basilica", hp: 600, size: 3, sight: 7, cost: { wood: 150, stone: 200, coins: 100 }, time: 70, era: 4, buildable: !0, market: !0, troca: { get: 75, fair: 90 } },
  { key: "road", hp: 100, size: 1, sight: 1, cost: { stone: 2 }, time: 2, era: 4, buildable: !0, walk: !0, estrada: !0 }
], Ot = Object.fromEntries(ct.map((e, t) => [e.key, t])), qs = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], Oe = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 },
  // Fundação de Roma (Era IV, M3)
  { cost: { food: 2e3, stone: 900, metal: 600, coins: 600 }, time: 180 }
  // República (Era V, M3)
], Aa = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], Me = 200, Ni = Object.fromEntries(Aa.map((e, t) => [e.key, t])), Ha = { give: 100, get: 60, fair: 85 }, rc = 300, Ya = ["food", "wood", "stone", "metal", "coins"], Ia = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28, silver: 0.25 }, lc = 10, dn = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], ze = 6, It = -1, ke = 60 * Bi, cc = ke * 12, dc = 2, hc = 3, Eo = [
  { key: "equirria", ef: "treino" },
  // março: as corridas de cavalo para Marte, o deus da guerra
  { key: "parilia", ef: "curral" },
  // abril: Pales, a deusa dos pastores (e o aniversário de Roma, 21 de abril)
  { key: "ambarvalia", ef: "campos" },
  // maio: a bênção dos campos
  { key: "vestalia", ef: "obra" },
  // junho: Vesta, a deusa do lar
  { key: "apollinares", ef: "cura" },
  // julho: os jogos de Apolo, o deus médico
  { key: "consualia", ef: "campos" },
  // agosto: Conso, o deus dos celeiros
  { key: "romani", ef: "mercado" },
  // setembro: os Jogos Romanos
  { key: "armilustrium", ef: "treino" },
  // outubro: as armas purificadas e guardadas
  { key: "plebeii", ef: "mercado" },
  // novembro: os Jogos Plebeus
  { key: "saturnalia", ef: "inverno" },
  // dezembro: Saturno, o deus da fartura
  { key: "compitalia", ef: "inverno" },
  // janeiro: os deuses das encruzilhadas
  { key: "terminalia", ef: "obra" }
  // fevereiro: Término, o deus dos marcos e das divisas
], Yt = 3, e0 = (e) => e === "beta" ? "beta" : "normal", Sn = [12, 16, 19, 23, 26, 30], uc = 4, fc = 4, pc = 10, mc = 8, gc = 4, Cn = [100, 160, 180, 200, 220, 240], bc = [15], vc = 130;
function xa(e, t, a) {
  let s = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(a | 0, 1442695041) | 0;
  return s = Math.imul(s ^ s >>> 13, 1274126177), ((s ^ s >>> 16) >>> 0) / 4294967296;
}
const wn = (e) => e * e * (3 - 2 * e);
function yc(e, t, a) {
  const s = Math.floor(e), i = Math.floor(t), o = e - s, n = t - i, r = wn(o), l = wn(n), c = xa(s, i, a), d = xa(s + 1, i, a), h = xa(s, i + 1, a), f = xa(s + 1, i + 1, a);
  return c + (d - c) * r + (h - c) * l + (c - d - h + f) * r * l;
}
function Da(e, t, a, s = 4) {
  let i = 0, o = 0.5, n = 1, r = 0;
  for (let l = 0; l < s; l++)
    i += o * yc(e * n, t * n, a + l * 31), r += o, o *= 0.5, n *= 2.03;
  return i / r;
}
const ps = (e, t, a) => e < t ? t : e > a ? a : e, De = (e, t, a) => {
  const s = ps((a - e) / (t - e), 0, 1);
  return s * s * (3 - 2 * s);
}, qa = (e, t, a) => e + (t - e) * a;
class a0 {
  constructor(t) {
    g(this, "a");
    g(this, "b");
    g(this, "c");
    g(this, "d");
    this.a = 2654435769, this.b = 608135816, this.c = 3084996962, this.d = t >>> 0;
    for (let a = 0; a < 16; a++) this.next();
  }
  next() {
    let t = this.a | 0, a = this.b | 0, s = this.c | 0, i = this.d | 0;
    const o = (t + a | 0) + i | 0;
    return i = i + 1 | 0, t = a ^ a >>> 9, a = s + (s << 3) | 0, s = s << 21 | s >>> 11, s = s + o | 0, this.a = t, this.b = a, this.c = s, this.d = i, o >>> 0;
  }
  /** inteiro em [0, n) */
  int(t) {
    return this.next() % t;
  }
  /** número em [0, 1) (divisão exata em IEEE 754: determinístico) */
  float() {
    return this.next() / 4294967296;
  }
  save() {
    return [this.a, this.b, this.c, this.d];
  }
  load(t) {
    [this.a, this.b, this.c, this.d] = t;
  }
}
const ga = 0, Di = 1, Ka = 2, Ma = 3, va = 4, Ze = 5, Ns = (e) => e === Ma || e === va || e === Ze, hn = 3, s0 = 1, Io = 2, i0 = 3, fe = 1, Ge = 2, Ce = 3, be = 4, Xe = 1.4142135623730951, Fi = 1.7320508075688772, xc = 0.585, to = 8.5, Mc = 1 / (0.66 * 0.66) - 1, Pn = 2, oi = (e, t) => Math.sqrt(e * e + t * t), o0 = { 2: [0, 1], 3: [0.5, Fi / 2], 4: [Xe / 2, Xe / 2] }, kc = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Fi / 2], [-1, 0], [0.5, -Fi / 2]],
  4: [[Xe / 2, Xe / 2], [-Xe / 2, Xe / 2], [-Xe / 2, -Xe / 2], [Xe / 2, -Xe / 2]]
};
function ho(e, t, a) {
  const [s, i] = o0[a];
  for (let o = 0; o < 24; o++) {
    if (t < 0) {
      t = -t;
      continue;
    }
    if (s * t - i * e > 1e-9) {
      const r = e * s + t * i;
      e = 2 * r * s - e, t = 2 * r * i - t;
      continue;
    }
    break;
  }
  return [e, t];
}
function n0(e, t, a = hn) {
  const s = ps(t, 2, 4), i = s === 2 ? 192 : 256, o = i / 2, n = a >= 2, r = a >= 3, l = 2, c = i / l + 1, d = new Float32Array(c * c), h = i * (s === 2 ? 0.32 : 0.36), f = 13, u = i * 0.075, [m, v] = o0[s], y = [m * h, v * h], M = [i * 0.21, i * 0.4], k = (R, L) => {
    const [G, F] = ho(R, L, s), W = Math.sqrt(G * G + F * F);
    let Y = (Da(G * 0.02 + 7.3, F * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (Da(G * 0.08, F * 0.08, e + 9, 2) - 0.5) * 1.2;
    const dt = Math.max(Math.abs(R), Math.abs(L)) / o;
    Y += De(0.8, 0.98, dt) * 20 * (0.6 + 0.4 * Da(G * 0.04, F * 0.04, e + 3, 2));
    const ft = F, St = 2.5 + (Da(G * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (W > u * 0.8) {
      let ne = 0;
      for (const pe of M) ne = Math.max(ne, 1 - De(3, 6, Math.abs(W - pe)));
      const ve = qa(-2.2, -0.35, ne);
      if (n) {
        let pe = 0;
        for (const Ea of M) pe = Math.max(pe, 1 - De(5, 11, Math.abs(W - Ea)));
        Y = qa(Y, Math.min(Y, 1), De(St + 9 + 12 * pe, St + 3, ft) * (0.75 + 0.25 * pe)), Y = qa(ve, Y, De(St, St + 6.5 + 4 * pe, ft));
      } else
        Y = qa(Y, Math.min(Y, 1), De(St + 9, St + 3, ft) * 0.75), Y = qa(ve, Y, De(St, St + 6.5, ft));
    }
    Y = qa(-2.6, Y, De(u, u + 10, W));
    const _t = oi(G - y[0], F - y[1]);
    return Y = qa(2.2, Y, De(f, f + 8, _t)), Y;
  };
  for (let R = 0; R < c; R++) for (let L = 0; L < c; L++) d[R * c + L] = k(L * l - o, R * l - o);
  const x = (R, L) => {
    const G = ps(R / l, 0, c - 1.001), F = ps(L / l, 0, c - 1.001), W = Math.floor(G), Y = Math.floor(F), dt = G - W, ft = F - Y, vt = d[Y * c + W], St = d[Y * c + W + 1], _t = d[(Y + 1) * c + W], ne = d[(Y + 1) * c + W + 1];
    return vt + (St - vt) * dt + (_t - vt) * ft + (vt - St - _t + ne) * dt * ft;
  }, z = (R, L, G) => G >= 0.5 && R * R + L * L > Mc * l * l, A = (R, L) => {
    const G = (R + 0.5) / l, F = (L + 0.5) / l, W = Math.floor(G), Y = Math.floor(F), dt = G - W + F - Y, ft = d[Y * c + W], vt = d[Y * c + W + 1], St = d[(Y + 1) * c + W], _t = d[(Y + 1) * c + W + 1];
    return dt <= 1 && z(vt - ft, St - ft, (ft + vt + St) / 3) || dt >= 1 && z(_t - St, _t - vt, (vt + St + _t) / 3);
  }, T = (R, L) => {
    const G = R >> 1, F = L >> 1, W = R & 1, Y = L & 1, dt = d[F * c + G], ft = d[F * c + G + 1], vt = d[(F + 1) * c + G], St = d[(F + 1) * c + G + 1], _t = z(ft - dt, vt - dt, (dt + ft + vt) / 3), ne = z(St - vt, St - ft, (ft + vt + St) / 3), ve = z(ft - dt, St - ft, (dt + ft + St) / 3), pe = z(St - vt, vt - dt, (dt + vt + St) / 3);
    return W === Y ? _t && W === 0 || ne && W === 1 || ve || pe : _t || ne || (W === 1 ? ve : pe);
  }, C = new Uint8Array(i * i), I = new Uint8Array(i * i), S = new Uint16Array(i * i), O = [];
  for (let R = 0; R < i; R++) for (let L = 0; L < i; L++) {
    const G = x(L + 0.5, R + 0.5), F = R * i + L, W = Math.abs(x(L + 1, R + 0.5) - x(L, R + 0.5)) + Math.abs(x(L + 0.5, R + 1) - x(L + 0.5, R));
    G < -0.9 ? C[F] = Ma : G < -0.05 ? C[F] = Ka : G < 0.55 ? C[F] = Di : W > 2.2 ? C[F] = va : C[F] = ga;
  }
  const B = kc[s].map(([R, L]) => ({ x: Math.round(o + R * h), z: Math.round(o + L * h), ux: R, uz: L })), H = (R, L, G) => B.some((F) => oi(R - F.x, L - F.z) < G);
  for (let R = 1; R < i - 1; R++) for (let L = 1; L < i - 1; L++) {
    const G = R * i + L;
    if (C[G] !== ga) continue;
    const [F, W] = ho(L + 0.5 - o, R + 0.5 - o, s), Y = oi(F, W);
    let dt = Da(F * 0.045 + 13, W * 0.045 - 7, e + 5, 3);
    const ft = oi(F - m * (h + 18), W - v * (h + 18));
    dt += De(16, 6, ft) * 0.35, dt += De(14, 8, W) * -0.25, Y < u + 10 && (dt -= 0.3);
    const vt = x(L + 0.5, R + 0.5);
    dt > xc && !H(L, R, 15) && xa(Math.round(F * 4), Math.round(W * 4), e + 77) > 0.12 ? (I[G] = vt > 9 ? i0 : xa(Math.round(F * 3), Math.round(W * 3), e + 78) < 0.14 ? Io : s0, S[G] = 100) : xa(Math.round(F * 2), Math.round(W * 2), e + 79) < 0.012 && !H(L, R, 11) && vt < 8 && (I[G] = Io, S[G] = 100);
  }
  if (n) for (let R = 0; R < i; R++) for (let L = 0; L < i; L++) {
    const G = R * i + L;
    C[G] === ga && x(L + 0.5, R + 0.5) > to && (C[G] = Ze);
  }
  if (s === 2 || s === 4) {
    const R = (G, F) => {
      let W = Math.abs(2 * G - (i - 1)), Y = Math.abs(2 * F - (i - 1));
      if (s === 4 && Y > W) {
        const dt = W;
        W = Y, Y = dt;
      }
      return (Y + i - 1) / 2 * i + (W + i - 1) / 2;
    };
    for (let G = 0; G < i; G++) for (let F = 0; F < i; F++) {
      const W = G * i + F, Y = R(F, G);
      Y !== W && (C[W] = C[Y], I[W] = I[Y], S[W] = S[Y]);
    }
    const L = (c - 1) / 2;
    for (let G = 0; G < c; G++) for (let F = 0; F < c; F++) {
      let W = Math.abs(F - L), Y = Math.abs(G - L);
      if (s === 4 && Y > W) {
        const dt = W;
        W = Y, Y = dt;
      }
      d[G * c + F] = d[(Y + L) * c + W + L];
    }
  }
  if (n) for (let R = 0; R < i; R++) for (let L = 0; L < i; L++) {
    const G = R * i + L;
    (C[G] === ga || C[G] === Ze) && T(L, R) && (C[G] = A(L, R) ? va : Ze, I[G] = 0, S[G] = 0);
  }
  const $ = (R, L, G) => {
    if (s === 2) return R === 0 ? [L, G] : [i - 1 - L, i - 1 - G];
    if (s === 4) {
      let ft = L, vt = G;
      for (let St = 0; St < R; St++) {
        const _t = ft;
        ft = i - 1 - vt, vt = _t;
      }
      return [ft, vt];
    }
    let F = L + 0.5 - o, W = G + 0.5 - o;
    const Y = -0.5, dt = Fi / 2;
    for (let ft = 0; ft < R; ft++) {
      const vt = F * Y - W * dt;
      W = F * dt + W * Y, F = vt;
    }
    return [Math.floor(F + o), Math.floor(W + o)];
  }, P = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], w = [[0, 0], [2, 0], [0, 2], [2, 2], [4, 1]], D = new a0(e ^ 24301), j = (R, L, G, F) => {
    if (L < 1 || G < 1 || L >= i - 1 || G >= i - 1) return;
    const W = G * i + L;
    C[W] === Ma || C[W] === Ka || O.some((Y) => Y.x === L && Y.z === G) || (I[W] = 0, S[W] = 0, !n && C[W] === va && (C[W] = ga), O.push({ kind: R, x: L, z: G, amount: F }));
  }, E = B[0];
  -E.uz, E.ux;
  const N = (R, L, G, F, W, Y, dt, ft = P) => {
    const vt = [];
    for (let St = 0; St < dt; St++) {
      const [_t, ne] = ft[St % ft.length];
      vt.push([Math.round(R + G * (W + _t) + -F * (Y + ne) - 0.5), Math.round(L + F * (W + _t) + G * (Y + ne) - 0.5)]);
    }
    return vt;
  }, K = [
    { kind: fe, amount: 125, tiles: N(E.x, E.z, E.ux, E.uz, -5, 6, 6) },
    { kind: Ge, amount: 350, tiles: N(E.x, E.z, E.ux, E.uz, -9, -8, 5) },
    { kind: Ce, amount: 400, tiles: N(E.x, E.z, E.ux, E.uz, -15, 14, 5) },
    { kind: Ce, amount: 800, tiles: N(o, o, E.ux, E.uz, u + 12, 0, 6) },
    { kind: Ge, amount: 500, tiles: N(o, o, E.ux, E.uz, u + 22, 6, 4) },
    // mapa 3 (M3): veios de prata, um pequeno perto de cada início e um grande no centro (aparecem no Reino e viram moedas)
    ...r ? [
      // as pedras do veio ficam a 2 tiles uma da outra: girando o mapa (3 jogadores), duas não caem no mesmo tile e todos
      // ficam com a mesma prata
      { kind: be, amount: 300, tiles: N(E.x, E.z, E.ux, E.uz, -16, -14, 4, w) },
      { kind: be, amount: 600, tiles: N(o, o, E.ux, E.uz, u + 12, -10, 5, w) }
    ] : []
  ];
  for (let R = 0; R < s; R++) for (const L of K) for (const [G, F] of L.tiles) {
    const [W, Y] = $(R, G, F);
    j(L.kind, W, Y, L.amount);
  }
  for (const R of B) for (let L = -8; L <= 7; L++) for (let G = -8; G <= 7; G++) {
    if ((G + 0.5) ** 2 + (L + 0.5) ** 2 >= 50) continue;
    const F = (R.z + L) * i + R.x + G;
    I[F] = 0, S[F] = 0;
  }
  D.next();
  const it = (R, L) => R > 1 && L > 1 && R < i - 2 && L < i - 2 && (C[L * i + R] === ga || C[L * i + R] === Di) && !I[L * i + R] && !O.some((G) => G.x === R && G.z === L), q = (R, L, G = 8) => {
    for (let F = 0; F < G; F++) for (let W = -F; W <= F; W++) for (let Y = -F; Y <= F; Y++)
      if (Math.max(Math.abs(Y), Math.abs(W)) === F && it(R + Y, L + W))
        return [R + Y, L + W];
    return [R, L];
  }, U = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: u + 30, v: 12, n: 3, r: 6 }
  ], at = [], et = [], J = (R) => N(R.base === "s" ? E.x : o, R.base === "s" ? E.z : o, E.ux, E.uz, R.u, R.v, 1)[0], [X, V] = N(o, o, E.ux, E.uz, u + 36, 0, 1)[0], Vt = n ? U.map((R) => {
    const [L, G] = J(R), F = Array.from({ length: R.n }, (W, Y) => {
      const [dt, ft] = P[Y % P.length];
      return q(L + dt, G + ft, 24);
    });
    return { casa: it(L, G) ? [L, G] : F[0], spots: F };
  }) : null, te = n ? q(X, V) : null, Rt = (R, [L, G]) => {
    const [F, W] = $(R, L, G);
    return it(F, W) ? [F, W] : q(F, W, 24);
  };
  for (let R = 0; R < s; R++) {
    U.forEach((F, W) => {
      if (Vt) {
        const [_t, ne] = $(R, Vt[W].casa[0], Vt[W].casa[1]);
        at.push({ kind: F.kind, x: _t + 0.5, z: ne + 0.5, r: F.r, spots: Vt[W].spots.map((ve) => Rt(R, ve)) });
        return;
      }
      const [Y, dt] = J(F), [ft, vt] = $(R, Y, dt), St = [];
      for (let _t = 0; _t < F.n; _t++) {
        const [ne, ve] = P[_t % P.length], [pe, Ea] = $(R, Y + ne, dt + ve);
        St.push(q(pe, Ea));
      }
      at.push({ kind: F.kind, x: ft + 0.5, z: vt + 0.5, r: F.r, spots: St });
    });
    const [L, G] = te ? Rt(R, te) : q(...$(R, X, V));
    for (let F = -4; F <= 4; F++) for (let W = -4; W <= 4; W++) {
      const Y = (G + F) * i + L + W;
      Y >= 0 && Y < i * i && (I[Y] = 0, S[Y] = 0);
    }
    et.push({ x: L, z: G, player: R });
  }
  const bt = oe();
  return { size: i, seed: e, players: s, versao: a, trilhas: bt, hn: c, hstep: l, heights: d, terrain: C, tree: I, wood: S, res: O, starts: B, herds: at, camps: et };
  function oe() {
    const R = i * i, L = 1073741823, G = [1, -1, 0, 0, 1, 1, -1, -1], F = [0, 0, 1, -1, 1, -1, 1, -1], W = new Uint8Array(R);
    for (const tt of O) W[tt.z * i + tt.x] = 1;
    const Y = new Int32Array(R), dt = new Int32Array(R), ft = new Int32Array(R), vt = new Float64Array(8 * R + 8), St = (tt) => {
      for (let rt = 0; rt < i; rt++) for (let ot = 0; ot < i; ot++) {
        const yt = rt * i + ot, Ct = C[yt];
        if (ot < 2 || rt < 2 || ot >= i - 2 || rt >= i - 2 || Ct === Ma || W[yt]) {
          Y[yt] = -1;
          continue;
        }
        if (Ct === va || Ct === Ze) {
          Y[yt] = tt;
          continue;
        }
        let wt = 10 + Math.floor(Da(ot * 0.13, rt * 0.13, e + 91, 2) * 24);
        I[yt] && (wt += 60);
        const Pt = x(ot + 0.5, rt + 0.5);
        Pt > 4 && (wt += Math.floor((Pt - 4) * 30)), !n && A(ot, rt) && (wt += 300), Y[yt] = wt;
      }
    }, _t = (tt, rt) => {
      dt.fill(L), ft.fill(-1);
      let ot = 0;
      const yt = (Ct) => {
        let wt = ot++;
        for (; wt > 0; ) {
          const Pt = wt - 1 >> 1;
          if (vt[Pt] <= Ct) break;
          vt[wt] = vt[Pt], wt = Pt;
        }
        vt[wt] = Ct;
      };
      for (dt[tt] = 0, yt(tt); ot; ) {
        const Ct = vt[0], wt = vt[--ot];
        if (ot) {
          let Kt = 0;
          for (; ; ) {
            const Ve = 2 * Kt + 1;
            if (Ve >= ot) break;
            const os = Ve + 1, aa = os < ot && vt[os] < vt[Ve] ? os : Ve;
            if (vt[aa] >= wt) break;
            vt[Kt] = vt[aa], Kt = aa;
          }
          vt[Kt] = wt;
        }
        const Pt = Ct % 65536, re = (Ct - Pt) / 65536;
        if (re > dt[Pt]) continue;
        if (rt && rt[Pt]) return Pt;
        const we = Pt % i, Ft = (Pt - we) / i;
        for (let Kt = 0; Kt < 8; Kt++) {
          const Ve = we + G[Kt], os = Ft + F[Kt], aa = os * i + Ve, lo = Y[aa];
          if (lo < 0 || Kt >= 4 && (Y[Ft * i + Ve] < 0 || Y[os * i + we] < 0)) continue;
          const co = re + (Kt >= 4 ? Math.floor(lo * 14 / 10) : lo);
          co < dt[aa] && (dt[aa] = co, ft[aa] = Pt, yt(co * 65536 + aa));
        }
      }
      return -1;
    }, ne = (tt) => {
      let rt = -1, ot = L;
      for (const yt of tt) yt >= 0 && yt < R && dt[yt] < ot && (ot = dt[yt], rt = yt);
      return rt;
    }, ve = (tt, rt) => G.map((ot, yt) => (rt + F[yt]) * i + tt + ot), pe = (tt, rt, ot) => {
      for (let yt = 0; yt <= 8; yt++) for (let Ct = -yt; Ct <= yt; Ct++) for (let wt = -yt; wt <= yt; wt++) {
        if (Math.max(Math.abs(wt), Math.abs(Ct)) !== yt) continue;
        const Pt = tt + wt, re = rt + Ct;
        if (Pt >= 0 && re >= 0 && Pt < i && re < i && ot(re * i + Pt)) return re * i + Pt;
      }
      return -1;
    }, Ea = (tt, rt) => {
      let ot = 0, yt = 1 / 0;
      return B.forEach((Ct, wt) => {
        const Pt = (Ct.x - tt) * (Ct.x - tt) + (Ct.z - rt) * (Ct.z - rt);
        Pt < yt && (yt = Pt, ot = wt);
      }), ot;
    };
    St(-1), _t(E.z * i + E.x);
    const As = [];
    for (const [tt, rt] of [[1, 0], [2 * m * m - 1, 2 * m * v]]) for (const ot of M)
      As.push(pe(Math.floor(o + tt * ot), Math.floor(o + rt * ot), (yt) => C[yt] === Ka && dt[yt] < L));
    for (const tt of O) Ea(tt.x, tt.z) === 0 && As.push(ne(ve(tt.x, tt.z)));
    As.push(pe(et[0].x, et[0].z, (tt) => dt[tt] < L));
    for (let tt = 0; tt < U.length; tt++) As.push(ne(at[tt].spots.flatMap(([rt, ot]) => ve(rt, ot))));
    const Rl = As.filter((tt) => tt >= 0 && dt[tt] < L).sort((tt, rt) => dt[tt] - dt[rt] || tt - rt), ii = new Uint8Array(R);
    ii[E.z * i + E.x] = 1;
    const Tn = [];
    for (const tt of Rl) {
      if (ii[tt]) continue;
      const rt = _t(tt, ii);
      if (!(rt < 0))
        for (let ot = rt; ot >= 0; ot = ft[ot])
          ii[ot] = 1, Tn.push(ot);
    }
    const oo = new Uint8Array(R);
    for (const tt of Tn) {
      const rt = tt % i, ot = (tt - rt) / i;
      for (let yt = 0; yt < s; yt++) {
        const [Ct, wt] = $(yt, rt, ot);
        Ct >= 0 && wt >= 0 && Ct < i && wt < i && (oo[wt * i + Ct] = 1);
      }
    }
    const Ts = new Uint8Array(R).fill(255), is = new Int32Array(R);
    let $n = 0, no = 0;
    for (let tt = 0; tt < R; tt++) oo[tt] && (Ts[tt] = 0, is[no++] = tt);
    for (; $n < no; ) {
      const tt = is[$n++], rt = Ts[tt];
      if (rt >= Pn) continue;
      const ot = tt % i, yt = (tt - ot) / i;
      for (let Ct = 0; Ct < 8; Ct++) {
        const wt = ot + G[Ct], Pt = yt + F[Ct];
        if (wt < 0 || Pt < 0 || wt >= i || Pt >= i) continue;
        const re = Pt * i + wt;
        Ts[re] > rt + 1 && (Ts[re] = rt + 1, is[no++] = re);
      }
    }
    for (let tt = 0; tt < R; tt++) {
      const rt = Ts[tt];
      if (!I[tt] || rt > Pn) continue;
      const ot = tt % i, yt = (tt - ot) / i, [Ct, wt] = ho(ot + 0.5 - o, yt + 0.5 - o, s);
      (rt <= 1 || xa(Math.round(Ct * 2), Math.round(wt * 2), e + 93) < 0.45) && (I[tt] = 0, S[tt] = 0);
    }
    const ro = (tt) => !Ns(C[tt]) && !I[tt] && !W[tt], $s = new Uint8Array(R), Bl = (tt) => {
      $s.fill(0);
      let rt = 0, ot = 0;
      for ($s[tt] = 1, is[ot++] = tt; rt < ot; ) {
        const yt = is[rt++], Ct = yt % i, wt = (yt - Ct) / i;
        for (let Pt = 0; Pt < 8; Pt++) {
          const re = Ct + G[Pt], we = wt + F[Pt];
          if (re < 1 || we < 1 || re >= i - 1 || we >= i - 1) continue;
          const Ft = we * i + re;
          $s[Ft] || !ro(Ft) || Pt >= 4 && (!ro(wt * i + re) || !ro(we * i + Ct)) || ($s[Ft] = 1, is[ot++] = Ft);
        }
      }
    }, Nl = (tt) => {
      for (let rt = tt; rt >= 0; rt = ft[rt]) {
        (C[rt] === va || C[rt] === Ze) && (C[rt] = ga);
        for (const ot of [rt, rt - 1, rt + 1, rt - i, rt + i]) ot >= 0 && ot < R && I[ot] && (I[ot] = 0, S[ot] = 0);
      }
    };
    for (let tt = 0; tt < 3; tt++) {
      let rt = !1;
      for (let ot = 0; ot < s; ot++) {
        const yt = B[ot], Ct = yt.z * i + yt.x, wt = B[(ot + 1) % s];
        Bl(Ct);
        const Pt = [[wt.z * i + wt.x], [et[ot].z * i + et[ot].x]], re = (Ft) => Ft >= 0 && Ft < R && C[Ft] !== Ma && !W[Ft];
        for (const Ft of O) Ea(Ft.x, Ft.z) === ot && Pt.push(ve(Ft.x, Ft.z).filter(re));
        for (const Ft of at) Ea(Ft.x, Ft.z) === ot && Pt.push(Ft.spots.flatMap(([Kt, Ve]) => [Ve * i + Kt, ...ve(Kt, Ve)]).filter(re));
        const we = Pt.filter((Ft) => !Ft.some((Kt) => $s[Kt]));
        if (we.length) {
          rt = !0, St(tt ? 500 : -1), _t(Ct), globalThis.__trilhaLog?.push(`volta ${tt} jogador ${ot}: ${we.map((Ft) => Ft.slice(0, 1).map((Kt) => `${Kt % i},${(Kt - Kt % i) / i}`).join("")).join(" | ")}`);
          for (const Ft of we) {
            const Kt = ne(Ft);
            Kt >= 0 && Nl(Kt);
          }
        }
      }
      if (!rt) break;
    }
    return oo;
  }
}
function zt(e, t, a) {
  const s = ps(t / e.hstep, 0, e.hn - 1.001), i = ps(a / e.hstep, 0, e.hn - 1.001), o = Math.floor(s), n = Math.floor(i), r = s - o, l = i - n, c = e.hn, d = e.heights, h = d[n * c + o], f = d[n * c + o + 1], u = d[(n + 1) * c + o], m = d[(n + 1) * c + o + 1];
  return r + l <= 1 ? h + (f - h) * r + (u - h) * l : m + (u - m) * (1 - r) + (f - m) * (1 - l);
}
const zc = ["food", "wood", "stone", "metal", "coins"], vs = (e) => e.season === 3, ie = (e, t, a, s, i) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: a, x: s, z: i });
};
function Ac(e) {
  Zc(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const a = e.kind[t];
    a >= ut ? Xc(e, t) : a < Tt && (e.owner[t] === It ? Vc(e, t) : Tc(e, t));
  }
  Wc(e), ed(e), td(e), e.tick % 50 === 25 && sd(e);
}
const eo = (e, t) => e.tick < e.firme[t], r0 = (e, t) => t === ze || !!e.players[t]?.ai;
function Tc(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, (e.tick + t) % 20 === 0 && e.festaDe(e.owner[t]) === "cura" && e.hp[t] < Z[e.kind[t]].hp && e.hp[t]++, e.kind[t] === Mt.villager && (e.tick + t) % 5 === 0 && Cc(e, t), e.foodMode[t] && Lc(e, t), e.task[t]) {
    case Gt:
      Rc(e, t);
      break;
    case Ae:
      _c(e, t);
      break;
    case Wt:
      m0(e, t);
      break;
    case ss:
      Ec(e, t);
      break;
    case Ja:
      break;
    // correndo (a vigia cuida)
    default:
      Pc(e, t);
  }
}
const qo = 16, $c = 4;
function Sc(e, t) {
  const a = e.owner[t];
  let s = 0, i = 0, o = 0;
  return e.near(e.x[t], e.z[t], Z[e.kind[t]].sight, (n) => {
    const r = e.owner[n];
    if (!e.isUnit(n) || r === It || e.kind[n] === Mt.villager || Z[e.kind[n]].siege || !e.hostile(a, r) || !Z[e.kind[n]].proj && e.muroNaLinha(e.x[n], e.z[n], e.x[t], e.z[t], r)) return;
    const l = e.x[t] - e.x[n], c = e.z[t] - e.z[n], d = ra(l * l + c * c) || 1;
    s += qe(l * Q, d), i += qe(c * Q, d), o++;
  }), o ? [s, i] : null;
}
function Cc(e, t) {
  const a = e.task[t] === Ja;
  if (eo(e, t)) {
    a && En(e, t);
    return;
  }
  const s = Sc(e, t);
  if (!s) {
    a && ++e.fails[t] >= $c && En(e, t);
    return;
  }
  if (!a) {
    const i = e.task[t] === Ht;
    if (e.fugaDe[t] = e.task[t] + 1 + (i ? qo : 0), i) {
      const n = e.state[t] === se;
      e.amx[t] = n ? e.slotX[t] : e.x[t], e.amz[t] = n ? e.slotZ[t] : e.z[t];
    }
    e.task[t] = Ja, e.alvo2[t] = -1;
    const o = e.owner[t];
    e.players[o] && e.tick - (e.avisoFuga[o] ?? -1e9) > 300 && (e.avisoFuga[o] = e.tick, ie(e, o, "fuga", e.x[t], e.z[t]));
  }
  e.fails[t] = 0, (!a || e.state[t] === jt || (e.tick + t) % 20 === 0) && wc(e, t, s);
}
function wc(e, t, [a, s]) {
  const i = ra(a * a + s * s), o = ao(e, t);
  if (o >= 0 && e.reach(t, o, !1) > 2 * Q && (i === 0 || (e.x[o] - e.x[t]) * a + (e.z[o] - e.z[t]) * s > 0)) {
    e.goNear(t, o, !1);
    return;
  }
  if (i === 0) return;
  const n = e.size * Q - 1;
  e.goPoint(t, Math.min(n, Math.max(0, e.x[t] + qe(a * 7 * Q, i))), Math.min(n, Math.max(0, e.z[t] + qe(s * 7 * Q, i))));
}
function En(e, t) {
  const a = e.fugaDe[t], s = (a & qo - 1) - 1;
  if (e.fugaDe[t] = 0, e.fails[t] = 0, e.task[t] === Ja && (e.task[t] = s >= 0 && s !== Ja ? s : Ht, e.state[t] = jt, e.path[t] = null, e.field[t] = null, e.task[t] === Ht && a & qo)) {
    const i = e.amx[t] - e.x[t], o = e.amz[t] - e.z[t];
    i * i + o * o > Q * Q && e.goPoint(t, e.amx[t], e.amz[t]);
  }
}
const ms = 0, l0 = 1, c0 = 2, d0 = 3;
function h0(e, t, a) {
  return Z[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === a;
}
function Oo(e, t, a) {
  return e.isBuilding(a) ? Z[e.kind[t]].siege ? ms : c0 : e.owner[a] === It ? h0(e, a, e.owner[t]) ? ms : d0 : e.kind[a] === Mt.villager ? l0 : ms;
}
function un(e, t, a, s = !1, i = d0) {
  const o = e.owner[t], n = Z[e.kind[t]].siege;
  let r = -1, l = 99, c = 1 / 0;
  const d = (f, u) => {
    if (u >= i || u > l) return;
    const m = e.x[f] - e.x[t], v = e.z[f] - e.z[t], y = m * m + v * v;
    (u < l || y < c) && (l = u, c = y, r = f);
  };
  n || e.near(e.x[t], e.z[t], a, (f) => {
    if (f === t || !e.isUnit(f) || e.ignoreT[t] === f && e.tick < e.ignoreUntil[t]) return;
    const u = e.owner[f];
    (u === It ? !h0(e, f, o) : !e.hostile(o, u)) || d(f, u !== It && e.kind[f] === Mt.villager ? l0 : ms);
  });
  const h = n ? ms : c0;
  if ((s || n) && h < i && l > h) {
    const f = (a * Q) ** 2;
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.hostile(o, e.owner[u]) && !e.bdef(u).wall && !e.bdef(u).estrada && !(e.ignoreT[t] === u && e.tick < e.ignoreUntil[t])) {
      const m = e.x[u] - e.x[t], v = e.z[u] - e.z[t];
      m * m + v * v < f && d(u, h);
    }
  }
  return r;
}
function u0(e, t, a) {
  const s = e.state[t] === se;
  s && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = Wt, e.tgt[t] = a, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = s ? 10 : 8;
}
function Pc(e, t) {
  if (e.kind[t] === Mt.villager || (e.tick + t) % 5 || eo(e, t)) return;
  const a = un(e, t, Z[e.kind[t]].sight, e.state[t] !== se);
  a >= 0 && u0(e, t, a);
}
function Ec(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const a = un(e, t, Z[e.kind[t]].sight, !0);
    if (a >= 0) {
      e.task[t] = Wt, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === jt) {
    const a = e.amx[t] - e.x[t], s = e.amz[t] - e.z[t];
    if (a * a + s * s > (3 * Q) ** 2 && e.fails[t]++ < 6) {
      if (e.goPoint(t, e.amx[t], e.amz[t]), e.lastPartial && !e.overBudget && r0(e, e.owner[t]) && !Z[e.kind[t]].proj) {
        const i = e.amx[t] >> 8, o = e.amz[t] >> 8, n = e.muroNoCaminho(t, i, o, i, o);
        n >= 0 && (e.task[t] = Wt, e.tgt[t] = n, e.phase[t] = 9, e.fails[t] = 0, e.goNear(t, n, !1));
      }
    } else e.task[t] = Ht;
  }
}
function Ic(e, t, a) {
  if (e.isBuilding(a)) {
    const [o, n, r] = e.footprint(a);
    return e.muroNoCaminho(t, o - 1, n - 1, o + r, n + r);
  }
  const s = e.x[a] >> 8, i = e.z[a] >> 8;
  return e.muroNoCaminho(t, s - 1, i - 1, s + 1, i + 1);
}
function qc(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function Ro(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.tgtTile[t] ? qc(e, a) : e.alive[a] ? e.kind[a] === Tt ? e.work[a] > 0 : e.isBuilding(a) && e.done[a] === 1 && e.bdef(a).key === "farm" && e.owner[a] === e.owner[t] : !1;
}
function Bo(e, t, a = -1) {
  let s = e.tgt[t];
  const i = e.size;
  if (s < -1 && (s = -1 - s), !e.tgtTile[t] && a < 0 && s >= 0 && (a = s), e.tgtTile[t] && s >= 0 && s < i * i) {
    const o = e.carryRes[t], n = e.map.tree[s] > 0 || o === Ds, r = e.resKind[s] || (o === Za ? fe : o === _i ? Ge : o === ji ? Ce : o === ys ? be : 0), l = s % i, c = (s - l) / i;
    for (const [d, h] of xs) {
      if (d * d + h * h > 100) break;
      const f = l + d, u = c + h;
      if (f < 0 || u < 0 || f >= i || u >= i) continue;
      const m = u * i + f;
      if (!(m === a || !e.open(m)) && (n ? e.map.tree[m] && e.resAmt[m] > 0 : r && e.resKind[m] === r && e.resAmt[m] > 0))
        return e.tgt[t] = m, e.tgtTile[t] = 1, e.phase[t] = We, e.fails[t] = 0, e.goNear(t, m, !0), !0;
    }
  } else if (s >= 0 && e.kind[s] === Tt || e.carryRes[t] === Za) {
    let o = -1, n = (10 * Q) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== a && e.alive[r] && e.kind[r] === Tt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], c = e.z[r] - e.z[t], d = l * l + c * c;
      d < n && (n = d, o = r);
    }
    if (o >= 0)
      return e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = We, e.goNear(t, o, !1), !0;
  }
  return !1;
}
function ao(e, t) {
  const a = e.owner[t];
  let s = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === a && e.done[o] && e.bdef(o).drop) {
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, s = o);
  }
  return s;
}
function Si(e, t) {
  const a = ao(e, t);
  if (e.dropB[t] = a, a < 0) {
    e.task[t] = Ht;
    return;
  }
  e.phase[t] = ti, e.fails[t] = 0, e.goNear(t, a, !1);
}
function Oc(e, t, a) {
  const s = e.tgt[t];
  let i;
  a ? i = Ia.farm : e.tgtTile[t] ? e.map.tree[s] ? i = Ia.wood : i = e.resKind[s] === fe ? Ia.berry : e.resKind[s] === Ge ? Ia.stone : e.resKind[s] === be ? Ia.silver : Ia.metal : i = Ia.carcass;
  let o = Math.round(i * 1e3);
  return a && e.festaDe(e.owner[t]) === "campos" && (o = Math.floor(o * 5 / 4)), e.beta && (o = Math.floor(o * Cn[Math.min(e.players[e.owner[t]]?.era ?? 0, Cn.length - 1)] / 100)), e.players[e.owner[t]]?.hunger && (o = Math.floor(o * 7 / 10)), e.players[e.owner[t]]?.ai && (o = Math.floor(o * [80, 100, 115][e.difficulty] / 100)), o;
}
function Rc(e, t) {
  if (e.phase[t] === ti) {
    Nc(e, t);
    return;
  }
  if (!Ro(e, t)) {
    e.carry[t] > 0 ? Si(e, t) : Bo(e, t) || (e.task[t] = Ht);
    return;
  }
  const a = e.tgt[t], s = e.tgtTile[t] === 1, i = !s && e.kind[a] >= ut, o = e.reach(t, a, s);
  if (e.phase[t] === We) {
    if (o <= (i ? 60 : s ? 330 : 220))
      e.phase[t] = x0, e.state[t] = jt, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === jt && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, a, s) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - a, Bo(e, t, a) || (e.task[t] = Ht);
      }
    }
    return;
  }
  if (o > (i ? 140 : s ? 420 : 300)) {
    e.phase[t] = We, e.goNear(t, a, s);
    return;
  }
  if (i && vs(e)) return;
  if (s && e.resKind[a] === fe && vs(e)) {
    e.carry[t] > 0 ? Si(e, t) : e.task[t] = Ht;
    return;
  }
  const n = s ? e.map.tree[a] ? Ds : e.resKind[a] === fe ? Za : e.resKind[a] === Ge ? _i : e.resKind[a] === be ? ys : ji : Za;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += Oc(e, t, i);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = i ? 1e9 : s ? e.resAmt[a] : e.work[a], c = e.carryCap(t);
  r = Math.min(r, l, c - e.carry[t]), r > 0 && (e.carry[t] += r, i || (s ? e.resAmt[a] -= r : e.work[a] -= r, (s ? e.resAmt[a] : e.work[a]) <= 0 && Bc(e, a, s))), (e.carry[t] >= c || !Ro(e, t) && e.carry[t] > 0) && Si(e, t);
}
function Bc(e, t, a) {
  if (!a) {
    e.remove(t);
    return;
  }
  const s = Ns(e.map.terrain[t]) ? 1 : 0;
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, s), e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, s), e.events.push({ t: "res", k: t });
}
function Li(e, t, a, s) {
  var o;
  const i = (o = e.obtido)[t] ?? (o[t] = [0, 0, 0, 0, 0]);
  i[a] = (i[a] ?? 0) + s;
}
function Nc(e, t) {
  let a = e.dropB[t];
  if (a < 0 || !e.isBuilding(a) || !e.done[a] || e.owner[a] !== e.owner[t]) {
    if (a = ao(e, t), e.dropB[t] = a, a < 0) {
      e.task[t] = Ht;
      return;
    }
    e.goNear(t, a, !1);
  }
  if (e.reach(t, a, !1) <= 200) {
    const s = e.players[e.owner[t]];
    if (s && (s.res[zc[e.carryRes[t]]] += e.carry[t], Li(e, s.id, e.carryRes[t], e.carry[t])), e.carry[t] = 0, e.state[t] = jt, e.path[t] = null, e.foodMode[t] && !p0(e, t)) {
      const i = Do(e, t);
      if (i) {
        Fo(e, t, i);
        return;
      }
    }
    Ro(e, t) ? (e.phase[t] = We, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : Bo(e, t) || (e.task[t] = Ht);
    return;
  }
  e.state[t] === jt && (++e.fails[t] > 5 ? e.task[t] = Ht : e.goNear(t, a, !1));
}
const Dc = 30, In = 0, Fc = 1, No = 2, f0 = 3;
function p0(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.task[t] === Wt ? e.isAnimal(a) && (Z[e.kind[a]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[a] === fe && e.resAmt[a] > 0 && !vs(e) : e.alive[a] ? e.kind[a] === Tt ? e.work[a] > 0 : e.isBuilding(a) && e.bdef(a).key === "farm" && !vs(e) : !1;
}
function Do(e, t) {
  const a = e.owner[t], s = vs(e), i = e.size, o = ao(e, t), n = o >= 0 ? e.x[o] : e.x[t], r = o >= 0 ? e.z[o] : e.z[t], l = (Dc * Q) ** 2, c = (y, M) => {
    const k = y - n, x = M - r;
    return k * k + x * x <= l;
  }, d = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (let y = 0; y < e.top; y++) if (y !== t && e.isUnit(y) && e.owner[y] === a && e.kind[y] === Mt.villager && e.tgt[y] >= 0 && (e.task[y] === Gt || e.task[y] === Wt)) {
    const M = e.task[y] === Gt && e.tgtTile[y] ? h : d;
    M.set(e.tgt[y], (M.get(e.tgt[y]) ?? 0) + 1);
  }
  let f = -1, u = 1 / 0, m = In;
  const v = (y, M, k, x) => {
    const z = M - e.x[t], A = k - e.z[t], T = z * z + A * A;
    T < u && (u = T, f = y, m = x);
  };
  for (let y = 0; y < e.top; y++) e.alive[y] && e.kind[y] === Tt && e.work[y] > 0 && (d.get(y) ?? 0) < 4 && c(e.x[y], e.z[y]) && v(y, e.x[y], e.z[y], In);
  if (f >= 0) return { t: f, how: m };
  if (!s) {
    for (let y = 0; y < e.top; y++) e.isBuilding(y) && e.owner[y] === a && e.done[y] && e.bdef(y).key === "farm" && !d.has(y) && v(y, e.x[y], e.z[y], Fc);
    if (f >= 0) return { t: f, how: m };
    for (const y of e.map.res) {
      const M = y.z * i + y.x;
      if (e.resKind[M] !== fe || e.resAmt[M] <= 0 || (h.get(M) ?? 0) >= 2 || !e.open(M)) continue;
      const k = y.x * Q + 128, x = y.z * Q + 128;
      c(k, x) && v(M, k, x, No);
    }
    if (f >= 0) return { t: f, how: m };
  }
  for (let y = 0; y < e.top; y++) e.isAnimal(y) && Z[e.kind[y]].animal.mode === "flee" && (d.get(y) ?? 0) < 2 && c(e.x[y], e.z[y]) && v(y, e.x[y], e.z[y], f0);
  return f >= 0 ? { t: f, how: m } : null;
}
function Fo(e, t, a) {
  if (e.fails[t] = 0, e.phase[t] = We, e.tgt[t] = a.t, a.how === f0) {
    e.task[t] = Wt, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, a.t, !1);
    return;
  }
  e.task[t] = Gt, e.tgtTile[t] = a.how === No ? 1 : 0, e.goNear(t, a.t, a.how === No);
}
function Lc(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const a = e.task[t];
  if (a === Ht) {
    if (e.state[t] === jt) {
      const i = Do(e, t);
      i && Fo(e, t, i);
    }
    return;
  }
  if (a !== Gt || e.phase[t] === ti || p0(e, t)) return;
  const s = Do(e, t);
  s && (e.carry[t] > 0 && e.carryRes[t] !== Za ? Si(e, t) : Fo(e, t, s));
}
function _c(e, t) {
  const a = e.tgt[t];
  if (!e.isBuilding(a) || e.owner[a] !== e.owner[t]) {
    e.task[t] = Ht;
    return;
  }
  if (e.done[a]) {
    if (e.bdef(a).key === "farm" && !Hc(e, a, t))
      e.task[t] = Gt, e.phase[t] = We, e.goNear(t, a, !1);
    else if (e.bdef(a).wall || e.bdef(a).estrada) {
      const r = jc(e, t, a);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = Ht;
    } else e.task[t] = Ht;
    return;
  }
  if (e.reach(t, a, !1) > 230) {
    e.state[t] === jt && (++e.fails[t] > 5 ? e.task[t] = Ht : e.goNear(t, a, !1));
    return;
  }
  if (e.state[t] = jt, e.path[t] = null, e.fails[t] = 0, e.aPagar[a]) {
    const r = e.owner[a], l = e.players[r], c = e.bdef(a).cost;
    if (!l || !e.canAfford(r, c)) {
      const d = Object.keys(c).find((h) => (l?.res[h] ?? 0) < (c[h] ?? 0) * 100) ?? "wood";
      l && e.tick - (e.avisoMuro[r] ?? -1e9) > 300 && (e.avisoMuro[r] = e.tick, ie(e, r, (e.bdef(a).estrada ? "estradaFalta." : "muroFalta.") + d, e.x[a], e.z[a]));
      return;
    }
    e.pay(r, c), e.aPagar[a] = 0;
  }
  const s = (e.tick & 16383) + 1, i = e.tmr[a] !== s;
  e.tmr[a] = s, e.work[a] += e.festaDe(e.owner[a]) === "obra" ? i ? 15 : 9 : i ? 10 : 6;
  const o = e.bdef(a), n = o.time * 100;
  e.hp[a] = Math.max(e.hp[a], Math.floor(o.hp * Math.min(1, e.work[a] / n))), e.work[a] >= n && (e.done[a] = 1, e.hp[a] = o.hp, e.work[a] = 0, e.events.push({ t: "built", e: a }), o.wall ? e.muroPronto(a) : o.estrada ? e.estrada[(e.z[a] >> 8) * e.size + (e.x[a] >> 8)] = 1 : ie(e, e.owner[a], "built." + o.key, e.x[a], e.z[a]));
}
function jc(e, t, a) {
  let s = -1, i = (30 * Q) ** 2;
  const o = !!e.bdef(a).estrada;
  for (let n = 0; n < e.top; n++) if (e.isBuilding(n) && !e.done[n] && e.owner[n] === e.owner[t] && (o ? e.bdef(n).estrada : e.bdef(n).wall)) {
    const r = e.x[n] - e.x[a], l = e.z[n] - e.z[a], c = r * r + l * l;
    c < i && (i = c, s = n);
  }
  return s;
}
function Hc(e, t, a) {
  for (let s = 0; s < e.top; s++) if (s !== a && e.isUnit(s) && e.task[s] === Gt && e.tgt[s] === t && !e.tgtTile[s]) return !0;
  return !1;
}
function m0(e, t) {
  let a = e.tgt[t];
  if (a < 0 || !e.alive[a] || a === t || e.kind[a] === Tt || e.isUnit(a) && e.owner[a] === e.owner[t]) {
    qn(e, t);
    return;
  }
  const s = Z[e.kind[t]], i = e.kind[t] === Mt.villager;
  if (!i && e.owner[t] !== It && (e.tick + t) % 5 === 0 && !eo(e, t) && !(e.isBuilding(a) && e.bdef(a).wall)) {
    const c = Oo(e, t, a);
    if (c > ms) {
      const d = un(e, t, s.sight, !1, c);
      d >= 0 && (e.tgt[t] = a = d, e.fails[t] = 0);
    }
  }
  i && (e.amx[t] = e.x[a], e.amz[t] = e.z[a]);
  const o = s.hunt && e.owner[a] === It, n = Math.round((o ? s.hunt : s.range) * Q), r = e.reach(t, a, !1), l = !s.proj && !o && e.isUnit(a) && e.muroNoMeio(e.x[t], e.z[t], e.x[a], e.z[a]);
  if (r <= n + 40 && !l) {
    e.fails[t] = 0, e.state[t] === se && (e.state[t] = jt, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (Uc(e, t, a), e.cd[t] = s.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== It) {
    const c = e.x[t] - e.rallyX[t], d = e.z[t] - e.rallyZ[t];
    if (c * c + d * d > (12 * Q) ** 2) {
      e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 100, e.task[t] = Ht, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === jt && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 300, qn(e, t);
      return;
    }
    if (e.owner[t] === It) {
      const c = e.map.herds[e.herd[t]];
      if (c) {
        const d = c.x * Q - e.x[t], h = c.z * Q - e.z[t];
        if (d * d + h * h > (16 * Q) ** 2) {
          e.task[t] = Ht, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, c.x * Q, c.z * Q);
          return;
        }
      }
    }
    if ((s.proj || o) && r <= n + Q * 2 && e.state[t] === jt) {
      e.goPoint(t, e.x[a], e.z[a]), e.fails[t]++;
      return;
    }
    if (!e.goNear(t, a, !1) || e.lastPartial) {
      if (!i && e.owner[t] !== It && !e.overBudget) {
        if (s.proj) {
          !e.path[t] && !e.field[t] && e.goPoint(t, e.x[a], e.z[a]), e.fails[t]++;
          return;
        }
        if (r0(e, e.owner[t])) {
          const c = Ic(e, t, a);
          if (c >= 0 && c !== a) {
            e.alvo2[t] = a, e.tgt[t] = c, e.fails[t] = 0, e.goNear(t, c, !1);
            return;
          }
        }
      }
      e.fails[t] += 3;
    } else e.fails[t]++;
  }
}
function qn(e, t) {
  const a = e.alvo2[t];
  if (a >= 0 && (e.alvo2[t] = -1, e.alive[a] && e.kind[a] !== Tt && a !== t && (e.owner[a] === It || e.hostile(e.owner[t], e.owner[a])))) {
    e.tgt[t] = a, e.fails[t] = 0;
    return;
  }
  if (e.kind[t] === Mt.villager) {
    let i = -1, o = (3 * Q) ** 2;
    for (let n = 0; n < e.top; n++) if (e.alive[n] && e.kind[n] === Tt) {
      const r = e.x[n] - e.amx[t], l = e.z[n] - e.amz[t], c = r * r + l * l;
      c < o && (o = c, i = n);
    }
    if (i >= 0) {
      e.task[t] = Gt, e.tgt[t] = i, e.tgtTile[t] = 0, e.phase[t] = We, e.goNear(t, i, !1);
      return;
    }
  }
  const s = e.phase[t];
  if (s === 9 && e.owner[t] !== It) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = ss, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = Ht, e.tgt[t] = -1, e.phase[t] = 0, s === 10 && e.owner[t] !== It ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = jt, e.path[t] = null, e.field[t] = null);
}
function Uc(e, t, a) {
  const s = Z[e.kind[t]];
  if (s.siege && !e.isBuilding(a)) return;
  let i = e.atkOf(t);
  if (e.isUnit(a)) {
    const n = Z[e.kind[a]];
    i -= e.armorOf(a);
    for (const r of s.bonus ?? []) n.cls === r.vs && (i += r.dmg);
  }
  e.beta && e.soldier(t) && (i = Math.floor((i * vc + 50) / 100)), e.isBuilding(a) && e.bdef(a).wall && (i = Math.floor((i * (s.muro ?? 100) + 50) / 100)), i = Math.max(1, i);
  const o = s.proj ?? (s.hunt && e.owner[a] === It ? "spear" : void 0);
  if (o) {
    const n = e.x[a] - e.x[t], r = e.z[a] - e.z[t], l = ra(n * n + r * r), c = Math.max(3, Math.round(l / Q));
    e.projectiles.push({ target: a, dmg: i, at: e.tick + c, by: t, k: e.kind[a], o: e.owner[a] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[a], z1: e.z[a], ticks: c, kind: o, tk: e.kind[a], gap: e.reach(t, a, !1), te: a });
  } else g0(e, a, i, t);
}
function Wc(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const a of e.projectiles) {
    if (a.at > e.tick) {
      t.push(a);
      continue;
    }
    e.alive[a.target] && e.kind[a.target] === a.k && e.owner[a.target] === a.o && g0(e, a.target, a.dmg, a.by);
  }
  e.projectiles = t;
}
function g0(e, t, a, s) {
  e.hp[t] -= a;
  const i = e.owner[t];
  if (i === It)
    e.alive[s] && (e.aggro[t] = s + 1);
  else if (e.isUnit(t) && e.alive[s] && !eo(e, t)) {
    const n = e.task[t];
    e.kind[t] === Mt.villager ? e.owner[s] === It && n !== Wt && (e.task[t] = Wt, e.tgt[t] = s, e.phase[t] = 0) : Z[e.kind[t]].siege || (n === Ht ? u0(e, t, s) : n === ss ? (e.task[t] = Wt, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0) : n === Wt && e.isUnit(s) && e.tgt[t] !== s && Oo(e, t, e.tgt[t]) > Oo(e, t, s) && (e.isBuilding(e.tgt[t]) && e.bdef(e.tgt[t]).wall && e.alvo2[t] < 0 && (e.alvo2[t] = e.tgt[t]), e.tgt[t] = s, e.fails[t] = 0));
  }
  const o = e.players[i];
  if (o && e.tick - o.lastAlert > 300 && e.owner[s] !== i && (o.lastAlert = e.tick, ie(e, i, "underAttack", e.x[t], e.z[t])), o && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + a;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && ie(e, i, "centerDanger." + e.owner[s], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && Gc(e, t, s);
}
function Gc(e, t, a) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const s = Z[e.kind[t]].animal;
    s && s.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], s.food);
  } else if (e.isBuilding(t)) {
    const s = e.bdef(t).key, i = e.owner[a];
    if (s === "camp" && i >= 0 && i < e.players.length && (e.players[i].res.food += 2e4, e.players[i].res.wood += 15e3, ie(e, i, "campLoot", e.x[t], e.z[t])), s === "center") {
      const o = e.players[e.owner[t]];
      ie(e, e.owner[t], "centerLost." + e.owner[a]), e.remove(t), o && b0(e, o);
      return;
    }
  }
  e.remove(t);
}
function Vc(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const a = Z[e.kind[t]], s = a.animal, i = e.map.herds[e.herd[t]];
  if (e.task[t] === Wt) {
    m0(e, t);
    return;
  }
  if (s.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === jt) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let o = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (o = e.aggro[t] - 1), o >= 0) {
        let n = e.x[t] - e.x[o], r = e.z[t] - e.z[o];
        const l = ra(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * Q / l), r = Math.trunc(r * 4 * Q / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
        return;
      }
    }
  } else if (s.mode === "fight") {
    if (e.aggro[t] > 0) {
      const o = e.aggro[t] - 1;
      if (e.aggro[t] = 0, e.alive[o] && e.isUnit(o)) {
        e.task[t] = Wt, e.tgt[t] = o, e.fast[t] = 1;
        return;
      }
    }
  } else if ((e.tick + t) % 10 === 0) {
    const o = Kc(e, t, a.sight + (e.season === 3 ? 3 : 0));
    if (o >= 0) {
      e.task[t] = Wt, e.tgt[t] = o, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === jt && i) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const o = Math.max(1, i.r) * Q, n = e.rng.int(2 * o + 1) - o, r = e.rng.int(2 * o + 1) - o;
    e.goPoint(t, Math.round(i.x * Q) + n, Math.round(i.z * Q) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function Kc(e, t, a) {
  let s = -1, i = 1 / 0;
  return e.near(e.x[t], e.z[t], a, (o) => {
    if (!e.isUnit(o) || e.owner[o] === It) return;
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, s = o);
  }), s;
}
function Xc(e, t) {
  if (!e.done[t]) return;
  const a = e.owner[t], s = e.players[a];
  if (!s) return;
  const i = e.bdef(t), o = i.key;
  if (e.queue[t].length && Jc(e, t, s), i.tower && Yc(e, t, i.tower), o === "pen" && !vs(e) && e.tick % 10 === 0) {
    const r = e.festaDe(a) === "curral" ? 40 : 20;
    s.res.food += r, Li(e, s.id, 0, r);
  }
  const n = i.cura;
  n && e.tick % n.cd === 0 && e.near(e.x[t], e.z[t], n.r, (r) => {
    e.isUnit(r) && e.owner[r] === a && e.hp[r] < Z[e.kind[r]].hp && e.hp[r]++;
  }), i.moedas && e.tick % i.moedas === 0 && (s.res.coins += 100, Li(e, s.id, ys, 100));
}
function Yc(e, t, a) {
  if (e.cd[t] > 0) {
    e.cd[t]--;
    return;
  }
  if ((e.tick + t) % 3) return;
  const s = e.owner[t];
  let i = -1, o = 1 / 0;
  if (e.near(e.x[t], e.z[t], a.range + 1, (d) => {
    if (!e.isUnit(d) || !e.hostile(s, e.owner[d])) return;
    const h = e.reach(t, d, !1);
    h <= a.range * Q && h < o && (o = h, i = d);
  }), i < 0) return;
  const n = Math.max(1, a.atk - e.armorOf(i)), r = e.x[i] - e.x[t], l = e.z[i] - e.z[t], c = Math.max(3, Math.round(ra(r * r + l * l) / Q));
  e.projectiles.push({ target: i, dmg: n, at: e.tick + c, by: t, k: e.kind[i], o: e.owner[i] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[i], z1: e.z[i], ticks: c, kind: "arrow", tk: e.kind[i], gap: e.reach(t, i, !1), te: i, h: 3.2 }), e.cd[t] = a.cd;
}
function Jc(e, t, a) {
  if (a.hunger) return;
  const s = e.queue[t][0];
  if (s >= Me) {
    const x = Aa[s - Me];
    if (++e.work[t] < x.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), a.tech |= 1 << s - Me, ie(e, a.id, "tech." + x.key, e.x[t], e.z[t]);
    return;
  }
  const i = Z[s];
  if (e.work[t] === 0 && e.pop(a.id) + i.pop > e.popCap(a.id)) {
    e.tick % 300 === 0 && ie(e, a.id, e.popCap(a.id) >= e.limiteEra(a.era) ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.festaDe(a.id) === "treino" && e.bdef(t).key !== "center" && e.tick % 2 === 0 && e.work[t]++, e.work[t] < i.time * 10) return;
  e.work[t] = 0;
  const o = e.queue[t].shift(), [n, r, l] = e.footprint(t), c = e.size / 2, d = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : c, h = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : c, f = n + l / 2, u = r + l / 2, m = d - f, v = h - u, y = Math.sqrt(m * m + v * v) || 1, M = e.nearestFree(Math.round(f + m / y * (l / 2 + 1)), Math.round(u + v / y * (l / 2 + 1)), a.id);
  if (M < 0) return;
  const k = e.spawnUnit(a.id, Z[o].key, M % e.size + 0.5, Math.floor(M / e.size) + 0.5);
  e.events.push({ t: "trained", e: k }), e.rallyX[t] >= 0 && e.goPoint(k, e.rallyX[t], e.rallyZ[t]);
}
function Zc(e) {
  if (e.tick === 0 || e.tick % ke !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const a of e.players) !a.defeated && a.era >= 2 && Qc(e, a.id) && ie(e, a.id, "fair");
  for (const a of e.players) e.festaDe(a.id) && ie(e, a.id, "festa." + t);
  if (t === 8) for (const a of e.players) ie(e, a.id, "winterSoon");
  if (t >= 9) {
    for (const a of e.players) {
      if (a.defeated) continue;
      let s = e.pop(a.id) * (a.era <= 1 ? 1 : a.era <= 3 ? 2 : 3) * 100;
      e.festaDe(a.id) === "inverno" && (s = Math.floor(s / 2)), e.comido[a.id] = (e.comido[a.id] ?? 0) + Math.min(s, a.res.food), a.res.food >= s ? (a.res.food -= s, a.hunger && (a.hunger = !1)) : (a.res.food = 0, a.hunger || ie(e, a.id, "hunger"), a.hunger = !0);
    }
    if (t === 9) for (const a of e.players) ie(e, a.id, "winter");
  }
  if (t === 0) for (const a of e.players)
    a.hunger = !1, ie(e, a.id, "spring");
}
function Qc(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.done[a] && e.bdef(a).market) return !0;
  return !1;
}
function td(e) {
  for (const t of e.players) {
    if (t.defeated || t.era < Yt || t.fundada < 0 || (e.tick - t.fundada) % (dc * cc) !== 0) continue;
    const s = e.pop(t.id), i = s * (e.beta ? mc : hc);
    t.res.coins += i * 100, Li(e, t.id, ys, i * 100), ie(e, t.id, `censo.${s}.${i}`);
  }
}
function ed(e) {
  for (const t of e.players) {
    if (!t.aging) continue;
    if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
      t.aging = 0;
      continue;
    }
    if (--t.aging > 0) continue;
    t.era++;
    const a = (s) => {
      const i = Z[s].next;
      return i && Z[Mt[i]].era <= t.era ? Mt[i] : s;
    };
    for (let s = 0; s < e.top; s++) if (e.isUnit(s) && e.owner[s] === t.id) {
      const i = a(e.kind[s]);
      if (i === e.kind[s]) continue;
      e.hp[s] = Math.round(e.hp[s] * Z[i].hp / Z[e.kind[s]].hp), e.kind[s] = i;
    }
    for (let s = 0; s < e.top; s++) e.isBuilding(s) && e.owner[s] === t.id && (e.queue[s] = e.queue[s].map((i) => i < Me ? a(i) : i));
    e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && ie(e, t.id, "metalSeen"), t.era === Yt && (t.fundada = e.tick, ie(e, t.id, "fundacao"), ie(e, t.id, "prataSeen"));
  }
}
function b0(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const a of e.players) ie(e, a.id, "defeated." + t.id);
    for (let a = 0; a < e.top; a++) e.alive[a] && e.owner[a] === t.id && e.remove(a);
    v0(e);
  }
}
function ad(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.bdef(a).key === "center") return !0;
  return !1;
}
function sd(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !ad(e, t.id) && b0(e, t);
    v0(e);
  }
}
function v0(e) {
  if (e.outcome !== "playing") return;
  if (e.times) {
    id(e, e.times);
    return;
  }
  const t = e.players.filter((a) => !a.ai);
  t.length && t.every((a) => a.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((a) => a.ai).every((a) => a.defeated) && e.players.some((a) => a.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
function id(e, t) {
  const a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  if (e.players.forEach((n, r) => {
    n.defeated || a.add(t[r]), n.ai || s.add(t[r]);
  }), !(a.size <= 1 || ![...a].some((n) => s.has(n)))) return;
  e.vencedor = a.size === 1 ? [...a][0] : -1;
  const o = e.players.findIndex((n) => !n.ai);
  e.outcome = o >= 0 && e.vencedor === t[o] ? "victory" : "defeat", e.events.push({ t: "end", result: e.outcome, vencedor: e.vencedor });
}
const od = [13, 24, 30, 34, 38], nd = [3, 9, 14, 18, 22], rd = [9, 12, 14, 17, 19, 21], ld = [2, 3, 4, 5, 6, 8], cd = [42, 36, 30], dd = [84, 74, 64], hd = [124, 110, 96], ud = [24, 16, 11], fd = [10, 7, 5], pd = [6, 12, 99];
function md(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const a = e.ai[t.id];
    e.tick < a.next || (a.next = e.tick + 10, gd(e, t.id, a));
  }
  xd(e);
}
function gd(e, t, a) {
  const s = e.players[t], i = Math.min(s.era, cn), o = a.vez = (a.vez ?? 0) + 1, n = [], r = [], l = [];
  for (let q = 0; q < e.top; q++)
    !e.alive[q] || e.owner[q] !== t || (e.isBuilding(q) ? l.push(q) : e.isUnit(q) && (e.kind[q] === Mt.villager ? n : r).push(q));
  const c = l.find((q) => e.bdef(q).key === "center" && e.done[q]);
  if (c === void 0) return;
  const d = (q) => e.done[q] === 1 || !e.beta || n.some((U) => e.task[U] === Ae && e.tgt[U] === q), h = (q, U = !1) => l.filter((at) => e.bdef(at).key === q && (!U || e.done[at]) && d(at)), f = n.length + r.length, u = e.popCap(t), m = l.filter((q) => !e.done[q] && d(q)), v = e.tick / ke, y = e.beta ? rd : od, M = e.beta ? ld : nd, k = e.beta ? 0 : cd[e.difficulty], x = e.beta ? 0 : dd[e.difficulty], z = e.beta ? 0 : hd[e.difficulty], A = /* @__PURE__ */ new Set();
  for (const q of n) e.task[q] === Ja && A.add(q);
  const T = (q, U, at) => {
    let et = On(e, t, q, c, n.filter((J) => !A.has(J)), U, at);
    return et < 0 && e.beta && (et = On(e, t, q, c, n.filter((J) => !A.has(J)), at, at + 9)), et >= 0 && A.add(et), et >= 0;
  }, C = e.eraBuildingTypes(t) >= 2, I = ["food", "wood", "stone", "metal", "coins"], S = [600, 400, 250, 400, 800], O = s.era >= 2 ? Oe[s.era]?.cost ?? {} : {}, B = (q) => Math.max(S[q], (O[I[q]] ?? 0) + (q === 0 ? 300 : 100)) * 100, H = (q) => Math.max(0, (O[I[q]] ?? 0) * 100 - s.res[I[q]]), $ = (q = -1) => {
    let U = -1, at = 0;
    for (let et = 0; et < 5; et++) et !== q && H(et) > at && (et < 4 || s.era >= Yt) && (at = H(et), U = et);
    return U;
  }, P = !s.aging && (s.era === 0 && n.length >= y[0] || s.era === 1 && n.length >= y[1] - 2 && v >= k - 6 && C || s.era === 2 && n.length >= y[2] - 2 && v >= x - 6 && C || s.era === 3 && n.length >= y[3] - 2 && v >= z - 6 && C);
  if (n.length < y[i] && !e.queue[c].length && f < u && !s.aging && e.issue({ type: "train", player: t, building: c, key: "villager" }), u - f <= 3 && u < e.limiteEra(s.era) && !m.some((q) => e.bdef(q).key === "house" || e.bdef(q).key === "aqueduct") && e.tick >= a.houseCd) {
    const q = s.era >= 4 && h("aqueduct").length < 3 && e.canAfford(t, ct[Ot.aqueduct].cost);
    T(q ? "aqueduct" : "house", 5, q ? 16 : 14) && (a.houseCd = e.tick + 150);
  }
  if (e.beta && o % 30 === 0) for (const q of l) {
    if (e.done[q] || n.some((et) => e.task[et] === Ae && e.tgt[et] === q)) continue;
    let U = -1, at = 1 / 0;
    for (const et of n) if (!A.has(et) && e.task[et] !== Ae) {
      const J = e.x[et] - e.x[q] >> 8, X = e.z[et] - e.z[q] >> 8, V = J * J + X * X;
      V < at && (at = V, U = et);
    }
    U >= 0 && (e.issue({ type: "work", player: t, ids: [U], target: q }), A.add(U));
  }
  if (n.length >= 6 && !h("depot").length) {
    const q = yd(e, t, c, n.filter((U) => !A.has(U)));
    q >= 0 && A.add(q);
  }
  if (s.era >= 2 && h("depot").length < 2) {
    const q = Lo(e, t, c, n.filter((U) => !A.has(U)), (U) => e.resKind[U] === Ce);
    q >= 0 && A.add(q);
  } else if (s.era >= Yt && h("depot").length < 3) {
    const q = Lo(e, t, c, n.filter((U) => !A.has(U)), (U) => e.resKind[U] === be);
    q >= 0 && A.add(q);
  }
  const w = h("military");
  n.length >= (e.beta ? 7 : 9) && !w.length && T("military", 7, 16);
  const D = w.filter((q) => e.done[q]), j = M[i] + (s.era && !e.beta ? Math.floor(v / 8) : 0), E = {};
  s.era >= 2 && (E.stone = (h("forge").length ? 0 : 60) + (h("market").length ? 0 : 40) + (h("tower").length ? 0 : 120), E.metal = (!e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0) + (h("stable", !0).length ? 35 : 0)), s.era >= Yt && (E.stone = (E.stone ?? 0) + (h("temple").length ? 0 : 150) + (h("mint").length ? 0 : 120), E.metal = (E.metal ?? 0) + (h("mint").length ? 0 : 80)), s.era >= 4 && (E.stone = (E.stone ?? 0) + (h("basilica").length ? 0 : 200), E.coins = h("basilica").length ? 0 : 100);
  const N = (q, U) => ja.every((at) => s.res[at] >= ((q[at] ?? 0) + (U[at] ?? 0)) * 100), K = P && (s.era < 2 || r.length >= M[i]);
  if (D.length && !K && r.length < j && !e.queue[D[0]].length && f < u) {
    const q = qs(ct[Ot.military], s.era).filter((U) => U !== "dog" && N(Z[Mt[U]].cost, E));
    q.length && e.issue({ type: "train", player: t, building: D[0], key: q[e.rng.int(q.length)] });
  }
  if (s.era >= 2 && !K) {
    const q = h("stable", !0)[0], U = h("workshop", !0)[0], at = qs(ct[Ot.stable], s.era)[0];
    if (q !== void 0 && at && r.length < j && !e.queue[q].length && f + 2 <= u && N(Z[Mt[at]].cost, { stone: E.stone, metal: !e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0, coins: E.coins }) && e.issue({ type: "train", player: t, building: q, key: at }), U !== void 0 && !e.queue[U].length && f + 3 <= u) {
      const V = (Rt) => r.filter((bt) => e.kind[bt] === Mt[Rt]).length, te = [["ram", 2], ["scorpio", 2], ["ballista", 1]].find(([Rt, bt]) => qs(ct[Ot.workshop], s.era).includes(Rt) && V(Rt) < bt && N(Z[Mt[Rt]].cost, E));
      te && e.issue({ type: "train", player: t, building: U, key: te[0] });
    }
    const et = h("forge", !0)[0], J = h("market", !0)[0];
    et !== void 0 && !e.queue[et].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && s.res.metal > 3e4 && e.issue({ type: "research", player: t, building: et, key: "iron" }) : e.issue({ type: "research", player: t, building: et, key: "bronze" })), J !== void 0 && !e.queue[J].length && !e.hasTech(t, "wheel") && s.res.metal > 15e3 && e.issue({ type: "research", player: t, building: J, key: "wheel" });
    const X = h("basilica", !0)[0] ?? J;
    if (X !== void 0 && o % 3 === 1) {
      let V = s.res.wood > (e.feiraDe(t) ? 5e4 : 9e4) ? "wood" : null, Vt = 0;
      if (!V) for (let bt = 0; bt < 5; bt++) {
        const oe = s.res[I[bt]] - B(bt) - 1e4;
        oe > Vt && (bt < 4 || s.era >= Yt) && (Vt = oe, V = I[bt]);
      }
      const te = V ? $(I.indexOf(V)) : -1, Rt = te >= 0 ? I[te] : V !== "wood" ? null : s.res.stone < 2e4 ? "stone" : s.res.metal < 25e3 ? "metal" : s.era >= Yt && s.res.coins < 6e4 ? "coins" : s.res.food < 3e4 ? "food" : null;
      V && Rt && Rt !== V && e.issue({ type: "trade", player: t, building: X, give: V, get: Rt });
    }
  }
  if (s.era === 0 && !s.aging && n.length >= (e.beta ? 8 : 10) && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Oe[0].cost) && e.issue({ type: "ageup", player: t, building: c }), s.era === 1 && !s.aging && n.length >= (e.beta ? 11 : 18) && v >= k && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Oe[1].cost) && e.issue({ type: "ageup", player: t, building: c }), s.era === 2 && !s.aging && n.length >= (e.beta ? 13 : 26) && v >= x && C && e.canAfford(t, Oe[2].cost) && e.issue({ type: "ageup", player: t, building: c }), s.era === 3 && !s.aging && n.length >= (e.beta ? 15 : 30) && v >= z && C && e.canAfford(t, Oe[3].cost) && e.issue({ type: "ageup", player: t, building: c }), s.era >= 1 && !m.length) {
    const U = h("farm").length < Math.min(s.era >= 2 ? 14 : 10, Math.floor(n.length * 2 / 5));
    U && T("farm", 6, 15) || U && !e.beta || (h("pen").length ? !h("sanctuary").length && v > 30 ? T("sanctuary", 6, 14) : s.era >= Yt && !h("temple").length ? T("temple", 6, 15) : s.era >= Yt && !h("mint").length ? T("mint", 6, 14) : s.era >= 4 && !h("aqueduct").length ? T("aqueduct", 7, 16) : s.era >= 4 && !h("basilica").length ? T("basilica", 7, 16) : s.era >= 2 && (h("stable").length ? h("forge").length ? !h("market").length && (v > 50 || s.res.wood > 6e4) ? T("market", 7, 16) : h("tower").length ? !h("workshop").length && v > 58 && T("workshop", 7, 16) : T("tower", 5, 10) : T("forge", 6, 14) : T("stable", 7, 16)) : T("pen", 7, 16));
  }
  const it = n.filter((q) => e.task[q] === Ht && e.state[q] === jt && !A.has(q));
  if (it.length) {
    const q = [0, 0, 0, 0, 0];
    for (const at of n) if (e.task[at] === Gt) {
      const et = e.tgt[at], J = e.tgtTile[at] ? e.map.tree[et] ? Ds : e.resKind[et] === Ge ? _i : e.resKind[et] === Ce ? ji : e.resKind[et] === be ? ys : Za : Za;
      q[J === ys ? 4 : J === ji ? 3 : J === _i ? 2 : J === Ds ? 1 : 0]++;
    }
    const U = s.era === 0 ? P ? [0.8, 0.15, 0.05, 0, 0] : [0.62, 0.3, 0.08, 0, 0] : s.era === 1 ? P ? [0.55, 0.25, 0.2, 0, 0] : [0.5, 0.35, 0.15, 0, 0] : s.era === 2 ? [0.42, 0.25, 0.13, 0.2, 0] : s.era === 3 ? [0.4, 0.2, 0.15, 0.13, 0.12] : [0.4, 0.15, 0.18, 0.12, 0.15];
    if (e.beta && s.era < Oe.length) {
      const at = Oe[s.era].cost, et = ["food", "wood", "stone", "metal", "coins"].map((X) => Math.max(0, (at[X] ?? 0) * 100 - s.res[X]));
      s.era < Yt && (et[4] = 0);
      const J = et[0] + et[1] + et[2] + et[3] + et[4];
      if (J > 0) for (let X = 0; X < 5; X++) U[X] = (U[X] + et[X] / J) / 2;
    }
    s.res.wood > B(1) && (U[0] += U[1] - 0.1, U[1] = 0.1), s.res.stone > B(2) && (U[0] += U[2], U[2] = 0), s.res.metal > B(3) && (U[0] += U[3], U[3] = 0), s.res.coins > B(4) && (U[0] += U[4], U[4] = 0);
    for (const at of it) {
      const et = q[0] + q[1] + q[2] + q[3] + q[4] + 1, J = (X) => U[X] - q[X] / et;
      for (const X of [0, 1, 2, 3, 4].sort((V, Vt) => J(Vt) - J(V) || V - Vt)) if (uo(e, t, at, X, c)) {
        q[X]++;
        break;
      }
    }
  }
  if (s.res.wood > B(1) && (e.tick + t * 7) % 200 === 0) {
    const q = n.find((U) => e.task[U] === Gt && e.tgtTile[U] && e.map.tree[e.tgt[U]] > 0 && !A.has(U));
    q !== void 0 && e.carry[q] === 0 && uo(e, t, q, 0, c);
  }
  if (s.era >= 2 && (e.tick + t * 7) % 200 === 100) {
    const q = (et) => {
      const J = e.tgt[et];
      return e.tgtTile[et] ? e.map.tree[J] ? 1 : e.resKind[J] === Ge ? 2 : e.resKind[J] === Ce ? 3 : e.resKind[J] === be ? 4 : -1 : -1;
    }, U = $(), at = U < 0 ? void 0 : n.find((et) => {
      const J = q(et);
      return e.task[et] === Gt && !A.has(et) && e.carry[et] === 0 && J > 0 && J !== U && s.res[I[J]] > B(J);
    });
    at !== void 0 && uo(e, t, at, U, c);
  }
  if (o % 3 === 0) {
    const q = bd(e, t, c, 18);
    if (q >= 0) {
      const U = r.filter((at) => e.task[at] !== ss || !0);
      U.length && e.issue({ type: "attack", player: t, ids: U, target: q });
    }
  }
  if (a.attackAt || (a.attackAt = ud[e.difficulty] * ke), e.tick >= a.attackAt && r.length >= 5) {
    const q = vd(e, t, c);
    q >= 0 && e.issue({ type: "amove", player: t, ids: r.slice(0, pd[e.difficulty]), x: e.x[q], z: e.z[q] }), a.attackAt = e.tick + fd[e.difficulty] * ke;
  }
}
function bd(e, t, a, s) {
  let i = -1, o = (s * Q) ** 2;
  return e.near(e.x[a], e.z[a], s, (n) => {
    if (!e.isUnit(n)) return;
    const r = e.owner[n];
    if (r < 0 || !e.hostile(t, r)) return;
    const l = e.x[n] - e.x[a], c = e.z[n] - e.z[a], d = l * l + c * c;
    d < o && (o = d, i = n);
  }), i;
}
function vd(e, t, a) {
  let s = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.hostile(t, e.owner[o]) && e.owner[o] >= 0 && e.owner[o] < e.players.length) {
    const n = !e.players[e.owner[o]].ai, r = e.x[o] - e.x[a], l = e.z[o] - e.z[a], c = (r * r + l * l) * (n && e.difficulty === 2 ? 0.6 : 1) * (1 + 0.02 * ((e.owner[o] - t + e.players.length) % e.players.length));
    c < i && (i = c, s = o);
  }
  return s;
}
function On(e, t, a, s, i, o, n) {
  const r = ct[Ot[a]];
  if (!e.canAfford(t, r.cost) || !i.length) return -1;
  const l = e.x[s] >> 8, c = e.z[s] >> 8;
  for (const [d, h] of xs) {
    const f = d * d + h * h;
    if (f < o * o) continue;
    if (f > n * n) break;
    const u = l + d - (r.size >> 1), m = c + h - (r.size >> 1);
    if (!e.canPlace(t, a, u, m) || !y0(e, u, m, r.size)) continue;
    const v = i.find((y) => e.task[y] !== Ae && (e.carryRes[y] === Ds || e.task[y] === Ht)) ?? i.find((y) => e.task[y] !== Ae) ?? i[0];
    return e.issue({ type: "build", player: t, ids: [v], key: a, tx: u, tz: m }), v;
  }
  return -1;
}
function y0(e, t, a, s) {
  for (let i = a - 1; i <= a + s; i++) for (let o = t - 1; o <= t + s; o++) {
    const n = i * e.size + o;
    if (e.bAt[n]) return !1;
  }
  return !0;
}
function yd(e, t, a, s) {
  return Lo(e, t, a, s, (i) => e.map.tree[i] > 0);
}
function Lo(e, t, a, s, i) {
  const o = ct[Ot.depot];
  if (!e.canAfford(t, o.cost) || !s.length) return -1;
  const n = e.x[a] >> 8, r = e.z[a] >> 8, l = e.size;
  let c = xs;
  if (!xs.some(([d, h]) => {
    const f = n + d, u = r + h;
    return f >= 0 && u >= 0 && f < l && u < l && i(u * l + f);
  })) {
    let d = -1, h = 1 / 0;
    for (let f = 0; f < l * l; f += 2) if (i(f)) {
      const u = f % l, m = (f - u) / l, v = (u - n) ** 2 + (m - r) ** 2;
      v < h && (h = v, d = f);
    }
    if (d < 0) return -1;
    c = [[d % l - n, Math.floor(d / l) - r]];
  }
  for (const [d, h] of c) {
    const f = n + d, u = r + h;
    if (!(d * d + h * h < 36) && !(f < 2 || u < 2 || f >= l - 3 || u >= l - 3) && i(u * l + f))
      for (const [m, v] of [[2, 0], [-3, 0], [0, 2], [0, -3], [2, 2], [-3, -3], [2, -3], [-3, 2]]) {
        const y = f + m, M = u + v;
        if (e.canPlace(t, "depot", y, M) && y0(e, y, M, 2)) {
          const k = s.find((x) => e.task[x] !== Ae) ?? s[0];
          return e.issue({ type: "build", player: t, ids: [k], key: "depot", tx: y, tz: M }), k;
        }
      }
  }
  return -1;
}
function uo(e, t, a, s, i) {
  const o = e.size, n = e.x[i] >> 8, r = e.z[i] >> 8;
  if (s === 0) {
    for (let k = 0; k < e.top; k++) if (e.isBuilding(k) && e.owner[k] === t && e.done[k] && e.bdef(k).key === "farm") {
      let x = !1;
      for (let z = 0; z < e.top; z++) if (e.isUnit(z) && e.task[z] === Gt && e.tgt[z] === k && !e.tgtTile[z]) {
        x = !0;
        break;
      }
      if (!x)
        return e.issue({ type: "work", player: t, ids: [a], target: k }), !0;
    }
    let u = 0;
    for (let k = 0; k < e.top; k++) e.isUnit(k) && e.owner[k] === t && e.task[k] === Gt && e.tgtTile[k] && e.resKind[e.tgt[k]] === fe && u++;
    if (e.season !== 3 && u < 5) for (const [k, x] of xs) {
      if (k * k + x * x > 196) break;
      const z = n + k, T = (r + x) * o + z;
      if (T >= 0 && T < o * o && e.resKind[T] === fe && e.resAmt[T] > 0)
        return e.issue({ type: "gather", player: t, ids: [a], k: T }), !0;
    }
    let m = -1, v = (25 * Q) ** 2;
    for (let k = 0; k < e.top; k++) if (e.alive[k] && e.kind[k] === Tt && e.work[k] > 0) {
      let x = 0;
      for (let C = 0; C < e.top; C++) e.isUnit(C) && e.task[C] === Gt && e.tgt[C] === k && !e.tgtTile[C] && x++;
      const z = e.x[k] - e.x[i], A = e.z[k] - e.z[i], T = z * z + A * A;
      x < 4 && T < v && (v = T, m = k);
    }
    if (m >= 0)
      return e.issue({ type: "work", player: t, ids: [a], target: m }), !0;
    let y = -1, M = (28 * Q) ** 2;
    for (let k = 0; k < e.top; k++) if (e.isAnimal(k) && Z[e.kind[k]].animal.food > 0 && Z[e.kind[k]].key !== "aurochs") {
      const x = e.x[k] - e.x[i], z = e.z[k] - e.z[i], A = x * x + z * z;
      A < M && (M = A, y = k);
    }
    return y >= 0 ? (e.issue({ type: "attack", player: t, ids: [a], target: y }), !0) : !1;
  }
  if (s === 3 && e.players[t].era < 2 || s === 4 && e.players[t].era < Yt) return !1;
  const l = (u) => s === 1 ? e.map.tree[u] > 0 : s === 2 ? e.resKind[u] === Ge : s === 4 ? e.resKind[u] === be : e.resKind[u] === Ce;
  let c = n, d = r;
  if (s === 1) {
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.owner[u] === t && e.bdef(u).key === "depot") {
      c = e.x[u] >> 8, d = e.z[u] >> 8;
      break;
    }
  }
  for (const [u, m] of xs) {
    const v = c + u, y = d + m;
    if (v < 0 || y < 0 || v >= o || y >= o) continue;
    const M = y * o + v;
    if (l(M) && e.open(M))
      return e.issue({ type: "gather", player: t, ids: [a], k: M }), !0;
  }
  let h = -1, f = 1 / 0;
  for (let u = 0; u < o * o; u += 3) if (l(u) && e.open(u)) {
    const m = u % o, v = (u - m) / o, y = (m - c) ** 2 + (v - d) ** 2;
    y < f && (f = y, h = u);
  }
  return h >= 0 ? (e.issue({ type: "gather", player: t, ids: [a], k: h }), !0) : !1;
}
function xd(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    const i = /* @__PURE__ */ new Set();
    for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === ze) {
      const n = Rn(e, o);
      n >= 0 && !i.has(e.owner[n]) && (i.add(e.owner[n]), e.events.push({ t: "msg", player: e.owner[n], key: "raidSoon", x: e.x[o], z: e.z[o] }));
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / ke, a = Math.max(...e.players.map((i) => i.era)), s = /* @__PURE__ */ new Set();
  for (let i = 0; i < e.top; i++) {
    if (!e.isBuilding(i) || e.owner[i] !== ze) continue;
    const o = Rn(e, i);
    if (o < 0 || s.has(e.owner[o])) continue;
    s.add(e.owner[o]);
    const n = e.players[e.owner[o]].era >= Yt, r = n ? "gaul" : "barbarian", l = n ? Math.min(7, 3 + Math.floor(t / 20)) : a >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15)), c = [];
    for (let d = 0; d < l; d++) {
      const h = e.nearestFree((e.x[i] >> 8) + d % 3 - 1, (e.z[i] >> 8) + 3 + Math.floor(d / 3), ze);
      h < 0 || c.push(e.spawnUnit(ze, r, h % e.size + 0.5, Math.floor(h / e.size) + 0.5));
    }
    for (const d of c)
      e.task[d] = ss, e.amx[d] = e.x[o], e.amz[d] = e.z[o], e.rallyX[d] = e.x[o], e.rallyZ[d] = e.z[o];
    e.orderMove(c, e.x[o], e.z[o]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * ke;
}
function Rn(e, t) {
  let a = -1, s = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.bdef(i).key === "center" && e.owner[i] >= 0 && e.owner[i] < e.players.length && !e.players[e.owner[i]].defeated) {
    const o = e.x[i] - e.x[t], n = e.z[i] - e.z[t], r = o * o + n * n;
    r < s && (s = r, a = i);
  }
  return a;
}
const ht = 4096, jt = 0, se = 1, Ht = 0, Gt = 1, Ae = 2, Wt = 3, ss = 4, Ja = 5, Md = 30, Ue = 60, We = 0, x0 = 1, ti = 2, Za = 0, Ds = 1, _i = 2, ji = 3, ys = 4, ni = [1, -1, 0, 0, 1, 1, -1, -1], ri = [0, 0, 1, -1, 1, -1, 1, -1], Bn = [10, 10, 10, 10, 14, 14, 14, 14], M0 = 4294967295;
class kd {
  constructor(t, a) {
    g(this, "dist");
    this.goal = t, this.dist = new Uint32Array(a).fill(M0);
  }
}
const gs = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && gs.push([t, e]);
gs.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const xs = gs, Nn = /* @__PURE__ */ new Map();
function zd(e) {
  let t = Nn.get(e);
  if (t) return t;
  const a = [];
  for (let s = -e; s <= e; s++) for (let i = -e; i <= e; i++) i * i + s * s <= e * e + e && a.push(i, s);
  return t = new Int16Array(a), Nn.set(e, t), t;
}
class fn {
  constructor(t, a, s = {}) {
    g(this, "map");
    g(this, "size");
    g(this, "rng");
    g(this, "tick", 0);
    g(this, "difficulty", 1);
    g(this, "players", []);
    // entidades (estrutura de arrays)
    g(this, "alive", new Uint8Array(ht));
    g(this, "kind", new Uint8Array(ht));
    g(this, "owner", new Int8Array(ht));
    g(this, "x", new Int32Array(ht));
    g(this, "z", new Int32Array(ht));
    g(this, "px", new Int32Array(ht));
    g(this, "pz", new Int32Array(ht));
    g(this, "hp", new Int16Array(ht));
    g(this, "state", new Uint8Array(ht));
    g(this, "stuck", new Uint8Array(ht));
    g(this, "best", new Int32Array(ht));
    g(this, "slotX", new Int32Array(ht));
    g(this, "slotZ", new Int32Array(ht));
    g(this, "task", new Uint8Array(ht));
    g(this, "tgt", new Int32Array(ht));
    g(this, "tgtTile", new Uint8Array(ht));
    g(this, "phase", new Uint8Array(ht));
    g(this, "carry", new Int16Array(ht));
    g(this, "carryRes", new Uint8Array(ht));
    g(this, "cd", new Uint16Array(ht));
    g(this, "work", new Int32Array(ht));
    g(this, "done", new Uint8Array(ht));
    g(this, "sub", new Uint8Array(ht));
    g(this, "aggro", new Int32Array(ht));
    g(this, "tmr", new Int16Array(ht));
    g(this, "herd", new Int16Array(ht));
    g(this, "fast", new Uint8Array(ht));
    g(this, "amx", new Int32Array(ht));
    g(this, "amz", new Int32Array(ht));
    g(this, "fails", new Uint8Array(ht));
    g(this, "frac", new Int32Array(ht));
    g(this, "rallyX", new Int32Array(ht));
    g(this, "rallyZ", new Int32Array(ht));
    g(this, "dropB", new Int32Array(ht));
    g(this, "ignoreT", new Int32Array(ht).fill(-1));
    g(this, "ignoreUntil", new Int32Array(ht));
    // alvo inalcançável a ignorar por um tempo
    g(this, "foodMode", new Uint8Array(ht));
    // coletor no modo Buscar comida (procura comida sozinho)
    /** muros (D35): o alvo a retomar depois de derrubar o bloco que fechava o caminho (-1: nenhum) */
    g(this, "alvo2", new Int32Array(ht).fill(-1));
    /** fuga (D35): a tarefa de antes da fuga + 1 (+ 16 sem tarefa: volta ao lugar ou segue para onde ia) */
    g(this, "fugaDe", new Uint8Array(ht));
    /** ordem firme (D36): até que tick a unidade segue a ordem de quem joga sem reagir ao que vê */
    g(this, "firme", new Int32Array(ht));
    /** muro marcado (D37): 1 = bloco desenhado que ainda não foi pago (é pago quando alguém começa a construí-lo) */
    g(this, "aPagar", new Uint8Array(ht));
    /** quando cada tribo foi avisada de que falta material para o muro (só para o aviso na tela; não entra no jogo salvo) */
    g(this, "avisoMuro", []);
    /** taxa dos materiais (D38): quanto cada tribo já obteve de comida, madeira, pedra e metal, e quanto já comeu (centésimos).
     *  Só para a interface: não entra no jogo salvo nem na conferência entre aparelhos */
    g(this, "obtido", []);
    g(this, "comido", []);
    /** fuga (D35): quando cada tribo foi avisada da última fuga (só para o aviso na tela; não entra no jogo salvo) */
    g(this, "avisoFuga", []);
    g(this, "queue", Array.from({ length: ht }, () => []));
    g(this, "field", new Array(ht).fill(null));
    g(this, "path", new Array(ht).fill(null));
    g(this, "pathI", new Uint16Array(ht));
    g(this, "top", 0);
    // mapa vivo
    g(this, "blocked");
    g(this, "bAt");
    // bAt = id da construção + 1 em cada tile. blocked: o fixo (sem os muros)
    /** muros (D35): dono + 1 do muro pronto em cada tile (0 = nenhum). O muro barra quem não é amigo do dono */
    g(this, "muroDono");
    /** estradas (M3, D39): 1 onde há estrada pronta. Quem anda em cima (qualquer um) vai 50% mais depressa */
    g(this, "estrada");
    /** o mapa de bloqueio de cada um: o fixo e os muros prontos de quem não é amigo (jogadores, bárbaros e bichos) */
    g(this, "bloq", []);
    g(this, "resKind");
    g(this, "resAmt");
    // recursos por tile (centésimos)
    g(this, "vis", []);
    g(this, "explored", []);
    g(this, "projectiles", []);
    // k, o: tipo e dono do alvo na hora do disparo
    g(this, "events", []);
    g(this, "ai", []);
    g(this, "barbNext", 0);
    g(this, "barbWarned", !1);
    g(this, "outcome", "playing");
    /** partida online (M6): o time de cada tribo; null = cada tribo é um time (o jogo solo e o jogo com um amigo) */
    g(this, "times", null);
    /** partida online (M6), depois do fim: o time que venceu (-1: nenhum time com gente) */
    g(this, "vencedor", -1);
    /** regras do jogo (D34): normal ou beta. Escolhidas no começo e guardadas no jogo salvo */
    g(this, "regras");
    g(this, "pending", []);
    g(this, "seq", 0);
    /** jogo com amigo (anfitrião): recebe as ordens de fora aplicadas em cada passo, na ordem em que foram aplicadas */
    g(this, "onApplied", null);
    g(this, "hashHead");
    g(this, "hashNext", new Int32Array(ht));
    g(this, "hs");
    g(this, "pushX", new Int32Array(ht));
    g(this, "pushZ", new Int32Array(ht));
    // A*
    g(this, "aStamp");
    g(this, "aG");
    g(this, "aFrom");
    g(this, "aClosed");
    g(this, "aId", 0);
    g(this, "aHeap");
    g(this, "lastPartial", !1);
    // o último caminho não chegou ao destino
    g(this, "flowCache", /* @__PURE__ */ new Map());
    g(this, "nodesTick", 0);
    g(this, "overBudget", !1);
    this.map = n0(t, a, s.mapa ?? hn), this.size = this.map.size, this.rng = new a0(t), this.difficulty = s.difficulty ?? 1;
    const i = this.size * this.size;
    this.blocked = new Uint8Array(i), this.bAt = new Int16Array(i), this.resKind = new Uint8Array(i), this.resAmt = new Int32Array(i), this.muroDono = new Int8Array(i), this.estrada = new Uint8Array(i);
    for (let r = 0; r < i; r++) {
      const l = this.map.terrain[r];
      (Ns(l) || this.map.tree[r]) && (this.blocked[r] = 1), this.map.tree[r] && (this.resAmt[r] = this.map.wood[r] * 100);
    }
    for (const r of this.map.res) {
      const l = r.z * this.size + r.x;
      this.resKind[l] = r.kind, this.resAmt[l] = r.amount * 100, this.blocked[l] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(i), this.aG = new Int32Array(i), this.aFrom = new Int32Array(i), this.aClosed = new Int32Array(i), this.aHeap = new Float64Array(i * 2), this.regras = e0(s.regras);
    const o = s.humans ?? 1, n = s.humanos;
    s.times && s.times.length === a && (this.times = s.times.slice()), this.map.starts.forEach((r, l) => {
      this.players.push({ id: l, color: dn[l], start: { x: r.x, z: r.z }, ai: n ? !n.includes(l) : l >= o, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0, fundada: -1 }), this.vis.push(new Uint8Array(i)), this.explored.push(new Uint8Array(i)), this.spawnBuilding(l, "center", r.x - 2, r.z - 2, !0);
      for (let c = 0; c < (this.beta ? gc : 4); c++) this.spawnUnit(l, "villager", r.x - r.ux * 4 + (c - 1.5) * 1.1, r.z - r.uz * 4 + c % 2 * 0.8);
      this.beta || this.spawnUnit(l, "dog", r.x - r.ux * 3 - r.uz * 3, r.z - r.uz * 3 + r.ux * 3), this.ai.push({ next: 20 + l * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((r, l) => {
      for (const [c, d] of r.spots) {
        const h = this.spawnUnit(It, r.kind, c + 0.5, d + 0.5);
        this.herd[h] = l, this.tmr[h] = h * 7 % 60;
      }
    });
    for (const r of this.map.camps) this.spawnBuilding(ze, "camp", r.x - 2, r.z - 2, !0);
    if (this.barbNext = 12 * ke, s.testUnits) {
      const r = this.map.starts[0];
      let l = 0;
      for (let c = 0; c < 40 && l < s.testUnits; c++) for (let d = 0; d < 20 && l < s.testUnits; d++) {
        const h = r.x - r.ux * 9 + (d - 10) * 0.9, f = r.z - r.uz * 9 - c * 0.9 * (r.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(h * Q), Math.round(f * Q)) || (this.spawnUnit(0, "warrior", h, f), l++);
      }
    }
    this.refazBloqueios(), this.updateFog();
  }
  get beta() {
    return this.regras === "beta";
  }
  // teto de busca de caminho por tick
  /** o tile tem algum vizinho livre (dá para chegar perto)? */
  open(t) {
    const a = this.size, s = t % a, i = (t - s) / a;
    for (let o = 0; o < 8; o++) {
      const n = s + ni[o], r = i + ri[o];
      if (n >= 0 && r >= 0 && n < a && r < a && !this.blocked[r * a + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return Z[this.kind[t]];
  }
  bdef(t) {
    return ct[this.kind[t] - ut];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < Tt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= ut;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === It;
  }
  hostile(t, a) {
    if (t === a || t === It || a === It) return !1;
    const s = this.times;
    return !(s && t >= 0 && a >= 0 && t < s.length && a < s.length && s[t] === s[a]);
  }
  /** o time da tribo (no jogo solo, cada tribo é um time) */
  time(t) {
    return this.times?.[t] ?? t;
  }
  /** tribos diferentes do mesmo time (partida online, M6) */
  aliado(t, a) {
    return t !== a && t >= 0 && a >= 0 && t < this.players.length && a < this.players.length && this.time(t) === this.time(a);
  }
  /** o fim da partida para esta tribo: no M6, vence quem é do time vencedor; no solo, o que o evento diz */
  resultadoDe(t, a) {
    return a.vencedor === void 0 ? a.result : a.vencedor >= 0 && a.vencedor === this.time(t) ? "victory" : "defeat";
  }
  // ── pesquisas e números de cada unidade ──
  hasTech(t, a) {
    const s = this.players[t];
    return !!s && (s.tech & 1 << Ni[a]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, a) {
    for (let s = 0; s < this.top; s++) if (this.isBuilding(s) && this.owner[s] === t && this.queue[s].includes(Me + a)) return !0;
    return !1;
  }
  /** tropa de uma tribo (não coletor, bicho nem bárbaro) */
  soldier(t) {
    const a = Z[this.kind[t]].cls;
    return a !== "villager" && a !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const a = Z[this.kind[t]];
    if (!this.soldier(t)) return a.atk;
    const s = this.owner[t];
    return a.atk + (this.hasTech(s, "bronze") ? 1 : 0) + (this.hasTech(s, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return Z[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return ((this.beta ? bc[0] : lc) + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  // regras beta: leva mais por viagem
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * ke && this.tick % (3 * ke) < rc;
  }
  /** o festival romano deste mês para a tribo (D39): do Reino em diante, um por mês; antes disso, nenhum */
  festaDe(t) {
    const a = this.players[t];
    return a && a.era >= Yt && !a.defeated ? Eo[this.month].ef : null;
  }
  /** a feira vale para a tribo: o dia de feira, ou o mês dos jogos (festival do mercado) */
  feiraDe(t) {
    return this.fair || this.festaDe(t) === "mercado";
  }
  // ── entidades ──
  alloc() {
    for (let t = 0; t < ht; t++) if (!this.alive[t])
      return t >= this.top && (this.top = t + 1), t;
    throw new Error("entidades esgotadas");
  }
  reset(t) {
    this.state[t] = jt, this.task[t] = Ht, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0, this.alvo2[t] = -1, this.fugaDe[t] = 0, this.firme[t] = 0, this.aPagar[t] = 0;
  }
  spawnUnit(t, a, s, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = Mt[a], this.owner[o] = t, this.x[o] = this.px[o] = Math.round(s * Q), this.z[o] = this.pz[o] = Math.round(i * Q), this.hp[o] = Z[Mt[a]].hp, o;
  }
  spawnCarcass(t, a, s, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = Tt, this.owner[o] = It, this.sub[o] = t, this.x[o] = this.px[o] = a, this.z[o] = this.pz[o] = s, this.work[o] = i * 100, this.hp[o] = 1, o;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, a, s, i, o) {
    const n = this.alloc();
    this.reset(n);
    const r = ct[Ot[a]];
    this.alive[n] = 1, this.kind[n] = ut + Ot[a], this.owner[n] = t, this.x[n] = this.px[n] = s * Q + r.size * 128, this.z[n] = this.pz[n] = i * Q + r.size * 128, this.done[n] = o ? 1 : 0, this.hp[n] = o ? r.hp : Math.max(1, r.hp / 10 | 0);
    for (let l = 0; l < r.size; l++) for (let c = 0; c < r.size; c++) {
      const d = (i + l) * this.size + s + c;
      this.bAt[d] = n + 1, !r.walk && !r.wall && this.setBlocked(d, 1);
    }
    return o && r.wall && this.muroPronto(n), o && r.estrada && (this.estrada[i * this.size + s] = 1), this.events.push({ t: "placed", e: n }), n;
  }
  footprint(t) {
    const a = this.bdef(t).size;
    return [(this.x[t] >> 8) - (a >> 1), (this.z[t] >> 8) - (a >> 1), a];
  }
  remove(t) {
    if (this.kind[t] >= ut) {
      const [a, s, i] = this.footprint(t), o = this.bdef(t).walk, n = this.bdef(t).wall;
      n && this.done[t] && this.muroFora(t), this.bdef(t).estrada && (this.estrada[s * this.size + a] = 0);
      for (let r = 0; r < i; r++) for (let l = 0; l < i; l++) {
        const c = (s + r) * this.size + a + l;
        this.bAt[c] = 0, !o && !n && this.setBlocked(c, 0);
      }
      this.events.push({ t: "gone", e: t });
    }
    this.alive[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [];
  }
  /** bloqueado para quem é do dono o (sem o: só o fixo) */
  blockedAt(t, a, s) {
    const i = t >> 8, o = a >> 8;
    return i < 0 || o < 0 || i >= this.size || o >= this.size ? !0 : (s === void 0 ? this.blocked : this.bloqueioDe(s))[o * this.size + i] === 1;
  }
  // ── muros (D35): o muro pronto barra os inimigos (outras tribos, bárbaros e bichos); a própria tribo e os aliados passam ──
  /** quem é do dono o passa pelo muro de `dono`? */
  passaMuro(t, a) {
    return t === a || this.aliado(t, a);
  }
  iBloq(t) {
    const a = this.players.length;
    return t >= 0 && t < a ? t : t === ze ? a : a + 1;
  }
  /** o mapa de bloqueio de quem é do dono o */
  bloqueioDe(t) {
    return this.bloq[this.iBloq(t)] ?? this.blocked;
  }
  /** refaz o mapa de cada um a partir do fixo e dos muros prontos (no começo e ao abrir um jogo salvo) */
  refazBloqueios() {
    const t = this.size * this.size;
    this.muroDono.fill(0);
    for (let a = 0; a < this.top; a++) this.isBuilding(a) && this.done[a] && this.bdef(a).wall && (this.muroDono[(this.z[a] >> 8) * this.size + (this.x[a] >> 8)] = this.owner[a] + 1);
    this.bloq = Array.from({ length: this.players.length + 2 }, () => this.blocked.slice());
    for (let a = 0; a < t; a++) this.muroDono[a] && this.refazTile(a);
    this.flowCache.clear(), this.estrada.fill(0);
    for (let a = 0; a < this.top; a++) this.isBuilding(a) && this.done[a] && this.bdef(a).estrada && (this.estrada[(this.z[a] >> 8) * this.size + (this.x[a] >> 8)] = 1);
  }
  /** o tile k em cada mapa: o fixo, ou um muro pronto de quem não é amigo */
  refazTile(t) {
    const a = this.muroDono[t] - 1, s = this.players.length;
    for (let i = 0; i < this.bloq.length; i++) this.bloq[i][t] = this.blocked[t] || a >= 0 && !this.passaMuro(i < s ? i : i === s ? ze : It, a) ? 1 : 0;
  }
  /** o obstáculo fixo mudou num tile (árvore cortada, construção posta ou tirada) */
  setBlocked(t, a) {
    this.blocked[t] = a, this.bloq.length && this.refazTile(t);
  }
  /** o muro ficou pronto: passa a barrar quem não é amigo; quem não é amigo e está em cima sai para o lado */
  muroPronto(t) {
    const a = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), s = this.owner[t];
    if (this.muroDono[a] = s + 1, !!this.bloq.length) {
      this.refazTile(a), this.flowCache.clear();
      for (let i = 0; i < this.top; i++) if (this.isUnit(i) && (this.z[i] >> 8) * this.size + (this.x[i] >> 8) === a && !this.passaMuro(this.owner[i], s)) {
        const o = this.nearestFree(this.x[i] >> 8, this.z[i] >> 8, this.owner[i]);
        if (o < 0) continue;
        this.x[i] = this.px[i] = o % this.size * Q + 128, this.z[i] = this.pz[i] = Math.floor(o / this.size) * Q + 128, this.path[i] = null, this.field[i] = null;
      }
    }
  }
  /** o muro caiu: o caminho abre para todos */
  muroFora(t) {
    const a = (this.z[t] >> 8) * this.size + (this.x[t] >> 8);
    this.muroDono[a] && (this.muroDono[a] = 0, this.bloq.length && (this.refazTile(a), this.flowCache.clear()));
  }
  /** o muro que o jogador constrói nesta era (D35): paliçada no Neolítico, muralha de pedra nos Metais, muralha de tufo a
   *  partir do Reino (M3) */
  muroDaEra(t) {
    return t >= Yt ? "tufa" : t >= 2 ? "wall" : t >= 1 ? "palisade" : null;
  }
  /** o muro de quem não é amigo que fecha o caminho de e até o retângulo (num caminho que ignora esses muros): o bloco a
   *  derrubar, ou -1 (não há caminho nem assim, ou o caminho não passa por muro) */
  muroNoCaminho(t, a, s, i, o) {
    const n = this.owner[t], r = this.size, l = (this.z[t] >> 8) * r + (this.x[t] >> 8), c = this.findPath(l, a, s, i, o, 12e3, this.blocked, !1);
    if (!c || this.lastPartial) return -1;
    const d = (f) => {
      const u = this.muroDono[f] - 1;
      return u >= 0 && !this.passaMuro(n, u) && this.bAt[f] ? this.bAt[f] - 1 : -1;
    };
    let h = l;
    for (const f of c) {
      let u = d(f);
      const m = h % r, v = (h - m) / r, y = f % r, M = (f - y) / r;
      if (u < 0 && m !== y && v !== M && (u = d(v * r + y), u < 0 && (u = d(M * r + m))), u >= 0) return u;
      h = f;
    }
    return -1;
  }
  canPlace(t, a, s, i) {
    const o = ct[Ot[a]], n = this.size;
    if (s < 1 || i < 1 || s + o.size >= n - 1 || i + o.size >= n - 1) return !1;
    for (let r = 0; r < o.size; r++) for (let l = 0; l < o.size; l++) {
      const c = (i + r) * n + s + l, d = this.map.terrain[c];
      if (this.blocked[c] || this.bAt[c] || Ns(d) || d === Ka || !this.explored[t][c]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, c = this.z[r] >> 8;
      if (l >= s && l < s + o.size && c >= i && c < i + o.size && this.state[r] === jt && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  /** quanto o mercado b dá por 100 (a basílica paga melhor; na feira, ou no mês dos jogos, mais ainda) */
  troca(t, a) {
    const s = this.bdef(t).troca, i = this.feiraDe(a);
    return s ? i ? s.fair : s.get : i ? Ha.fair : Ha.get;
  }
  canAfford(t, a) {
    const s = this.players[t].res;
    return ja.every((i) => s[i] >= (a[i] ?? 0) * 100);
  }
  pay(t, a) {
    const s = this.players[t].res;
    for (const i of ja) s[i] -= (a[i] ?? 0) * 100;
  }
  refund(t, a) {
    const s = this.players[t].res;
    for (const i of ja) s[i] += (a[i] ?? 0) * 100;
  }
  pop(t) {
    let a = 0;
    for (let s = 0; s < this.top; s++) this.isUnit(s) && this.owner[s] === t && (a += this.udef(s).pop);
    return a;
  }
  popCap(t) {
    const a = this.players[t].era;
    let s = 0;
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).pop && (s += this.vagas(this.bdef(i).key, a));
    return Math.min(this.limiteEra(a), s);
  }
  /** a população máxima da era (regras beta: 12 na primeira, 30 na última) */
  limiteEra(t) {
    return this.beta ? Sn[Math.min(t, Sn.length - 1)] : nc[t];
  }
  /** quantas vagas a construção dá nesta era (o Centro e a casa; regras beta: 4 cada) */
  vagas(t, a) {
    const s = ct[Ot[t]];
    return s?.pop ? this.beta ? s.pop[Math.min(a, s.pop.length - 1)] ? t === "center" ? uc : t === "aqueduct" ? pc : fc : 0 : s.pop[Math.min(a, s.pop.length - 1)] : 0;
  }
  /** tipos de construção da era atual já prontos (requisito para avançar) */
  eraBuildingTypes(t) {
    const a = this.players[t].era, s = /* @__PURE__ */ new Set();
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).buildable && !this.bdef(i).wall && !this.bdef(i).estrada && this.bdef(i).era === a && s.add(this.bdef(i).key);
    return s.size;
  }
  // muros (D35) e estradas (M3) não contam
  // ── geometria ──
  /** distância (sub-tiles) da unidade até a borda do alvo (construção, tile ou unidade) */
  reach(t, a, s) {
    let i, o, n, r;
    if (s) {
      const d = a % this.size, h = (a - d) / this.size;
      i = d * Q, o = h * Q, n = i + Q, r = o + Q;
    } else if (this.kind[a] >= ut) {
      const [d, h, f] = this.footprint(a);
      i = d * Q, o = h * Q, n = i + f * Q, r = o + f * Q;
    } else {
      const d = this.x[a] - this.x[t], h = this.z[a] - this.z[t];
      return Math.max(0, ra(d * d + h * h) - (this.kind[a] < Tt ? Math.round(Z[this.kind[a]].radius * Q) : 64));
    }
    const l = Math.max(i - this.x[t], 0, this.x[t] - n), c = Math.max(o - this.z[t], 0, this.z[t] - r);
    return ra(l * l + c * c);
  }
  // ── caminho ──
  /** o tile livre mais perto (para quem é do dono o; sem o, só o fixo) */
  /** há muro de quem não é amigo de o na linha reta entre os dois pontos? (quem está do outro lado do muro não alcança) */
  /** há bloco de muro pronto (de qualquer dono) entre os dois pontos (contando o tile de cada ponta: quem está dentro dos
   *  troncos também não acerta)? O golpe de perto não passa pelos troncos nem pelas pedras (D35): quem luta de perto
   *  precisa estar do mesmo lado */
  muroNoMeio(t, a, s, i) {
    const o = this.size;
    let n = t >> 8, r = a >> 8;
    const l = s >> 8, c = i >> 8, d = (y) => this.muroDono[y] > 0, h = Math.abs(l - n), f = Math.abs(c - r), u = n < l ? 1 : -1, m = r < c ? 1 : -1;
    let v = h - f;
    for (let y = 0; y < 64; y++) {
      if (n < 0 || r < 0 || n >= o || r >= o) return !1;
      if (d(r * o + n)) return !0;
      if (n === l && r === c) return !1;
      const M = 2 * v;
      if (M > -f && M < h && (d(r * o + n + u) || d((r + m) * o + n))) return !0;
      M > -f && (v -= f, n += u), M < h && (v += h, r += m);
    }
    return !1;
  }
  muroNaLinha(t, a, s, i, o) {
    const n = this.size;
    let r = t >> 8, l = a >> 8;
    const c = s >> 8, d = i >> 8, h = (M) => {
      const k = this.muroDono[M] - 1;
      return k >= 0 && !this.passaMuro(o, k);
    }, f = Math.abs(c - r), u = Math.abs(d - l), m = r < c ? 1 : -1, v = l < d ? 1 : -1;
    let y = f - u;
    for (let M = 0; M < 64; M++) {
      if (r < 0 || l < 0 || r >= n || l >= n) return !1;
      if (h(l * n + r)) return !0;
      if (r === c && l === d) return !1;
      const k = 2 * y;
      if (k > -u && k < f && (h(l * n + r + m) || h((l + v) * n + r))) return !0;
      k > -u && (y -= u, r += m), k < f && (y += f, l += v);
    }
    return !1;
  }
  /** tem bloco de muro (de qualquer dono, pronto, em obra ou só marcado) no tile k? A tribo passa por ele, mas ninguém para
   *  em cima: sumiria dentro dos troncos (D35) */
  ehMuro(t) {
    const a = this.bAt[t] - 1;
    return a >= 0 && ct[this.kind[a] - ut].wall === !0;
  }
  /** quem ficou parado em cima de um bloco de muro (o muro ficou pronto embaixo dele, ou foi empurrado) anda até o espaço
   *  livre mais perto, logo ao lado; a tarefa dele continua de lá (D35) */
  saiDoMuro() {
    const t = this.size;
    for (let a = 0; a < this.top; a++) {
      if (!this.alive[a] || this.kind[a] >= Tt || this.state[a] === se) continue;
      const s = this.x[a] >> 8, i = this.z[a] >> 8;
      if (s < 0 || i < 0 || s >= t || i >= t || !this.ehMuro(i * t + s)) continue;
      const o = this.bloqueioDe(this.owner[a]);
      let n = -1, r = 1 / 0;
      for (let l = 1; l <= 3 && n < 0; l++) for (let c = -l; c <= l; c++) for (let d = -l; d <= l; d++) {
        if (Math.max(Math.abs(d), Math.abs(c)) !== l) continue;
        const h = s + d, f = i + c;
        if (h < 0 || f < 0 || h >= t || f >= t) continue;
        const u = f * t + h;
        if (o[u] || this.bAt[u]) continue;
        const m = h * Q + 128 - this.x[a], v = f * Q + 128 - this.z[a], y = m * m + v * v;
        y < r && (r = y, n = u);
      }
      n >= 0 && this.goPoint(a, n % t * Q + 128, Math.floor(n / t) * Q + 128);
    }
  }
  nearestFree(t, a, s) {
    const i = s === void 0 ? this.blocked : this.bloqueioDe(s);
    for (const [o, n] of gs) {
      const r = t + o, l = a + n;
      if (r >= 0 && l >= 0 && r < this.size && l < this.size && !i[l * this.size + r] && !this.ehMuro(l * this.size + r)) return l * this.size + r;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, a, s, i, o, n = 16e3, r = this.blocked, l = !0) {
    const c = this.size, d = ++this.aId, h = this.aG, f = this.aFrom, u = this.aStamp, m = this.aClosed, v = this.aHeap;
    this.lastPartial = !1;
    const y = (P, w) => {
      const D = Math.max(a - P, 0, P - i), j = Math.max(s - w, 0, w - o);
      return 15 * Math.max(D, j) + 6 * Math.min(D, j);
    }, M = t % c, k = (t - M) / c;
    if (M >= a && M <= i && k >= s && k <= o) return [];
    let x = 0;
    const z = (P) => {
      let w = x++;
      for (v[w] = P; w > 0; ) {
        const D = w - 1 >> 1;
        if (v[D] <= v[w]) break;
        const j = v[D];
        v[D] = v[w], v[w] = j, w = D;
      }
    }, A = () => {
      const P = v[0];
      v[0] = v[--x];
      let w = 0;
      for (; ; ) {
        const D = w * 2 + 1, j = D + 1;
        let E = w;
        if (D < x && v[D] < v[E] && (E = D), j < x && v[j] < v[E] && (E = j), E === w) break;
        const N = v[E];
        v[E] = v[w], v[w] = N, w = E;
      }
      return P;
    };
    u[t] = d, h[t] = 0, f[t] = -1, z(y(M, k) * 65536 + t);
    let T = t, C = y(M, k), I = -1, S = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; x > 0 && S < n; ) {
      const P = A(), w = P % 65536;
      if (m[w] === d) continue;
      m[w] = d, S++;
      const D = w % c, j = (w - D) / c, E = y(D, j), N = this.ehMuro(w);
      if (E === 0 && !N) {
        I = w;
        break;
      }
      E < C && !N && (C = E, T = w);
      for (let K = 0; K < 8; K++) {
        const it = D + ni[K], q = j + ri[K];
        if (it < 0 || q < 0 || it >= c || q >= c) continue;
        const U = q * c + it;
        if (r[U] || m[U] === d || K >= 4 && (r[j * c + it] || r[q * c + D])) continue;
        const at = h[w] + Bn[K];
        (u[U] !== d || at < h[U]) && (u[U] = d, h[U] = at, f[U] = w, z((at + y(it, q)) * 65536 + U));
      }
    }
    this.lastPartial = I < 0, this.nodesTick += S;
    const O = I >= 0 ? I : T;
    if (O === t) return I >= 0 ? [] : null;
    const B = [];
    for (let P = O; P !== t && P >= 0; P = f[P]) B.push(P);
    if (B.reverse(), !l) return B;
    const H = [];
    let $ = t;
    for (let P = 0; P < B.length; ) {
      let w = Math.min(B.length - 1, P + 12);
      for (; w > P && !this.clear($, B[w], r); ) w--;
      H.push(B[w]), $ = B[w], P = w + 1;
    }
    return H;
  }
  clear(t, a, s) {
    const i = this.size;
    let o = t % i, n = (t - o) / i;
    const r = a % i, l = (a - r) / i, c = Math.abs(r - o), d = Math.abs(l - n), h = o < r ? 1 : -1, f = n < l ? 1 : -1;
    let u = c - d;
    for (let m = 0; m < 64; m++) {
      if (s[n * i + o]) return !1;
      if (o === r && n === l) return !0;
      const v = 2 * u;
      if (v > -d && v < c && (s[n * i + o + h] || s[(n + f) * i + o]))
        return !1;
      v > -d && (u -= d, o += h), v < c && (u += c, n += f);
    }
    return !1;
  }
  /** manda uma unidade até perto de um retângulo de tiles (alvo) ou de um ponto */
  goTo(t, a, s, i, o, n, r, l = 16e3) {
    const c = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), d = this.size, h = this.bloqueioDe(this.owner[t]);
    let f = !1;
    for (let M = Math.max(0, s); M <= Math.min(d - 1, o) && !f; M++) for (let k = Math.max(0, a); k <= Math.min(d - 1, i); k++) if (!h[M * d + k]) {
      f = !0;
      break;
    }
    if (!f)
      return this.lastPartial = !0, this.state[t] = jt, !1;
    const u = this.findPath(c, a, s, i, o, l, h);
    if (this.field[t] = null, !u)
      return this.state[t] = jt, !1;
    this.path[t] = u, this.pathI[t] = 0;
    const m = u.length ? u[u.length - 1] : c, v = m % this.size, y = (m - v) / this.size;
    return this.slotX[t] = n ?? v * Q + 128, this.slotZ[t] = r ?? y * Q + 128, this.state[t] = se, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  /** campo de fluxo completo até um tile, guardado e reaproveitado por 1 minuto (destinos longe) */
  flowTo(t, a) {
    const s = t * 8 + this.iBloq(a), i = this.flowCache.get(s);
    if (i && this.tick - i.t < 600) return i.f;
    const o = this.buildFlow(t, [], a);
    if (this.flowCache.set(s, { f: o, t: this.tick }), this.flowCache.size > 12) {
      let n = -1, r = 1 / 0;
      for (const [l, c] of this.flowCache) c.t < r && (r = c.t, n = l);
      this.flowCache.delete(n);
    }
    return o;
  }
  /** vai longe seguindo o campo de fluxo (sem A*) */
  goFar(t, a, s) {
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)), this.owner[t]);
    if (i < 0) return !1;
    const o = this.flowTo(i, this.owner[t]);
    if (o.dist[(this.z[t] >> 8) * this.size + (this.x[t] >> 8)] === M0) {
      const n = i % this.size, r = (i - n) / this.size;
      return this.goTo(t, n, r, n, r, void 0, void 0, 4e3);
    }
    return this.field[t] = o, this.path[t] = null, this.lastPartial = !1, this.slotX[t] = i % this.size * Q + 128, this.slotZ[t] = Math.floor(i / this.size) * Q + 128, this.state[t] = se, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  far(t, a, s) {
    const i = a - this.x[t], o = s - this.z[t];
    return i * i + o * o > (22 * Q) ** 2;
  }
  goNear(t, a, s) {
    if (!s && this.far(t, this.x[a], this.z[a])) return this.goFar(t, this.x[a], this.z[a]);
    if (s) {
      const n = a % this.size, r = (a - n) / this.size;
      return this.goTo(t, n - 1, r - 1, n + 1, r + 1, void 0, void 0, 6e3);
    }
    if (this.kind[a] >= ut) {
      const [n, r, l] = this.footprint(a);
      if (this.bdef(a).walk) {
        const c = l >> 1;
        return this.goTo(t, n + c, r + c, n + c, r + c, this.x[a], this.z[a], 8e3);
      }
      return this.goTo(t, n - 1, r - 1, n + l, r + l, void 0, void 0, 8e3);
    }
    const i = this.x[a] >> 8, o = this.z[a] >> 8;
    return this.goTo(t, i - 1, o - 1, i + 1, o + 1, this.x[a], this.z[a], 3e3);
  }
  goPoint(t, a, s) {
    if (this.far(t, a, s)) {
      this.goFar(t, a, s);
      return;
    }
    const i = this.owner[t], o = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)), i);
    if (o < 0) return;
    const n = o % this.size, r = (o - n) / this.size, l = !this.bloqueioDe(i)[(s >> 8) * this.size + (a >> 8)];
    this.goTo(t, n, r, n, r, l ? a : n * Q + 128, l ? s : r * Q + 128);
  }
  // ── comandos ──
  /** ordem para o próximo passo. ext: veio de fora da simulação (quem joga, ou o amigo pela rede); as da IA não */
  issue(t, a = !1) {
    this.pending.push({ ...t, ..."ids" in t ? { ids: t.ids.slice() } : {}, at: this.tick + 1, seq: this.seq++, ext: a ? 1 : 0 });
  }
  /** jogo com amigo (convidado): a ordem de fora que o anfitrião aplicou no passo `at` (chegam na ordem em que ele aplicou) */
  schedule(t, a) {
    this.pending.push({ ...t, ..."ids" in t ? { ids: t.ids.slice() } : {}, at: a, seq: this.seq++, ext: 1 });
  }
  /** as ordens de fora que ainda não foram aplicadas (quando o anfitrião recarrega o jogo para o amigo entrar) */
  takePendingExt() {
    const t = this.pending.filter((a) => a.ext);
    return this.pending = this.pending.filter((a) => !a.ext), t.map(({ at: a, seq: s, ext: i, ...o }) => o);
  }
  own(t) {
    return t.ids.filter((a) => this.isUnit(a) && this.owner[a] === t.player);
  }
  apply(t) {
    const a = this.players[t.player];
    if (!(!a || a.defeated)) {
      if ("ids" in t) {
        const s = t.ext === 1;
        for (const i of t.ids) this.isUnit(i) && this.owner[i] === t.player && (this.alvo2[i] = -1, s && (this.firme[i] = this.tick + Md));
      }
      switch (t.type) {
        case "move":
        case "amove": {
          const s = this.own(t);
          for (const i of s)
            this.task[i] = t.type === "amove" ? ss : Ht, this.amx[i] = t.x, this.amz[i] = t.z, this.rallyX[i] = t.type === "amove" ? t.x : -1, this.rallyZ[i] = t.type === "amove" ? t.z : -1, this.tgt[i] = -1, this.aggro[i] = 0, this.fails[i] = 0;
          this.orderMove(s, t.x, t.z);
          break;
        }
        case "stop":
          for (const s of this.own(t))
            this.task[s] = Ht, this.state[s] = jt, this.path[s] = null, this.field[s] = null, this.foodMode[s] = 0;
          break;
        case "food":
          for (const s of this.own(t)) this.kind[s] === Mt.villager && (this.foodMode[s] = t.on ? 2 : 0);
          break;
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === Ce && a.era < 2 || this.resKind[t.k] === be && a.era < Yt) return;
          const s = this.resKind[t.k] === fe;
          for (const i of this.own(t)) this.kind[i] === Mt.villager && (this.task[i] = Gt, this.tgt[i] = t.k, this.tgtTile[i] = 1, this.phase[i] = We, this.fails[i] = 0, s || (this.foodMode[i] = 0), this.goNear(i, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const s = t.target;
          if (!this.alive[s]) return;
          for (const i of this.own(t)) {
            const o = this.kind[i] === Mt.villager;
            if (this.kind[s] >= ut && this.owner[s] === t.player) {
              if (!o) continue;
              this.done[s] ? this.bdef(s).key === "farm" ? (this.task[i] = Gt, this.tgt[i] = s, this.tgtTile[i] = 0, this.phase[i] = We, this.goNear(i, s, !1)) : this.bdef(s).drop && this.carry[i] > 0 && (this.task[i] = Gt, this.phase[i] = ti, this.tgt[i] = -1, this.goNear(i, s, !1)) : (this.task[i] = Ae, this.tgt[i] = s, this.tgtTile[i] = 0, this.goNear(i, s, !1));
              continue;
            }
            if (this.kind[s] === Tt) {
              o && (this.task[i] = Gt, this.tgt[i] = s, this.tgtTile[i] = 0, this.phase[i] = We, this.goNear(i, s, !1));
              continue;
            }
            Z[this.kind[i]].siege && this.kind[s] < ut || (this.owner[s] === It || this.hostile(t.player, this.owner[s])) && (this.task[i] = Wt, this.tgt[i] = s, this.tgtTile[i] = 0, this.goNear(i, s, !1));
          }
          break;
        }
        case "build": {
          const s = this.own(t).filter((n) => this.kind[n] === Mt.villager), i = ct[Ot[t.key]];
          if (!s.length || !i?.buildable || i.era > a.era || !this.canAfford(t.player, i.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, i.cost);
          const o = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of s)
            this.task[n] = Ae, this.tgt[n] = o, this.tgtTile[n] = 0, this.goNear(n, o, !1);
          break;
        }
        case "train": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !qs(this.bdef(s), a.era).includes(t.key) || this.queue[s].length >= 5) return;
          const o = Z[Mt[t.key]];
          if (!this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[s].push(Mt[t.key]);
          break;
        }
        case "cancel": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.queue[s].length) return;
          const i = this.queue[s].pop();
          this.refund(t.player, i >= Me ? Aa[i - Me].cost : Z[i].cost), this.queue[s].length || (this.work[s] = 0);
          break;
        }
        case "ageup": {
          const s = t.building, i = Oe[a.era];
          if (!i || a.era >= cn || a.aging || !this.isBuilding(s) || this.owner[s] !== t.player || this.bdef(s).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), a.aging = i.time * 10, a.agingB = s;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const s = t.building, i = Ni[t.key], o = Aa[i];
          if (!o || !this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !(this.bdef(s).research ?? []).includes(t.key) || a.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, i) || o.needs && !this.hasTech(t.player, o.needs) || this.queue[s].length >= 5 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[s].push(Me + i);
          break;
        }
        case "trade": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !this.bdef(s).market || t.give === t.get || !Ya.includes(t.give) || !Ya.includes(t.get) || (t.give === "coins" || t.get === "coins") && a.era < Yt || a.res[t.give] < Ha.give * 100) return;
          a.res[t.give] -= Ha.give * 100, a.res[t.get] += this.troca(s, t.player) * 100;
          break;
        }
        case "ia":
          a.ai = !0;
          break;
        // M6: o computador assume (a IA continua de onde a tribo estava)
        case "road": {
          const s = ct[Ot.road], i = this.own(t).filter((n) => this.kind[n] === Mt.villager);
          if (s.era > a.era || !i.length || !this.canAfford(t.player, s.cost)) return;
          const o = [];
          for (const n of t.tiles.slice(0, Ue)) {
            const r = n % this.size, l = (n - r) / this.size;
            if (n < 0 || n >= this.size * this.size || !this.canPlace(t.player, "road", r, l)) continue;
            const c = this.spawnBuilding(t.player, "road", r, l, !1);
            this.aPagar[c] = 1, o.push(c);
          }
          if (!o.length) return;
          for (const n of i)
            this.task[n] = Ae, this.tgt[n] = o[0], this.tgtTile[n] = 0, this.goNear(n, o[0], !1);
          break;
        }
        case "wall": {
          const s = this.muroDaEra(a.era), i = this.own(t).filter((r) => this.kind[r] === Mt.villager);
          if (!s || !i.length) return;
          const o = ct[Ot[s]], n = [];
          if (!this.canAfford(t.player, o.cost)) return;
          for (const r of t.tiles.slice(0, Ue)) {
            const l = r % this.size, c = (r - l) / this.size;
            if (r < 0 || r >= this.size * this.size || !this.canPlace(t.player, s, l, c)) continue;
            const d = this.spawnBuilding(t.player, s, l, c, !1);
            this.aPagar[d] = 1, n.push(d);
          }
          if (!n.length) return;
          for (const r of i)
            this.task[r] = Ae, this.tgt[r] = n[0], this.tgtTile[r] = 0, this.goNear(r, n[0], !1);
          break;
        }
      }
    }
  }
  orderMove(t, a, s) {
    if (!t.length) return;
    const i = this.owner[t[0]], o = this.bloqueioDe(i), n = this.size, r = this.nearestFree(Math.min(n - 1, Math.max(0, a >> 8)), Math.min(n - 1, Math.max(0, s >> 8)), i);
    if (r < 0) return;
    if (t.length === 1) {
      this.goPoint(t[0], a, s);
      return;
    }
    const l = o[(s >> 8) * n + (a >> 8)], c = l ? r % n * Q + 128 : a, d = l ? Math.floor(r / n) * Q + 128 : s;
    t.sort((u, m) => {
      const v = (this.x[u] - c) ** 2 + (this.z[u] - d) ** 2, y = (this.x[m] - c) ** 2 + (this.z[m] - d) ** 2;
      return v - y || u - m;
    });
    const h = this.buildFlow(r, t, i);
    let f = 0;
    for (const u of t) {
      let m = c, v = d;
      for (; f < gs.length; ) {
        const [y, M] = gs[f++], k = c + y * 218, x = d + M * 218;
        if (!this.blockedAt(k, x, i) && !this.ehMuro((x >> 8) * n + (k >> 8))) {
          m = k, v = x;
          break;
        }
      }
      this.slotX[u] = m, this.slotZ[u] = v, this.state[u] = se, this.field[u] = h, this.path[u] = null, this.stuck[u] = 0, this.best[u] = 2147483647;
    }
  }
  buildFlow(t, a, s) {
    const i = this.size, o = i * i, n = new kd(t, o), r = n.dist, l = this.bloqueioDe(s), c = /* @__PURE__ */ new Set();
    for (const v of a) c.add((this.z[v] >> 8) * i + (this.x[v] >> 8));
    const d = this.aHeap;
    let h = 0;
    const f = (v) => {
      let y = h++;
      for (d[y] = v; y > 0; ) {
        const M = y - 1 >> 1;
        if (d[M] <= d[y]) break;
        const k = d[M];
        d[M] = d[y], d[y] = k, y = M;
      }
    }, u = () => {
      const v = d[0];
      d[0] = d[--h];
      let y = 0;
      for (; ; ) {
        const M = y * 2 + 1, k = M + 1;
        let x = y;
        if (M < h && d[M] < d[x] && (x = M), k < h && d[k] < d[x] && (x = k), x === y) break;
        const z = d[x];
        d[x] = d[y], d[y] = z, y = x;
      }
      return v;
    };
    r[t] = 0, f(t);
    let m = a.length ? c.size : -1;
    for (; h > 0; ) {
      const v = u(), y = v % 65536, M = (v - y) / 65536;
      if (M > r[y]) continue;
      if (m > 0 && c.has(y) && (c.delete(y), --m <= 0 && M > 400))
        break;
      const k = y % i, x = (y - k) / i;
      for (let z = 0; z < 8; z++) {
        const A = k + ni[z], T = x + ri[z];
        if (A < 0 || T < 0 || A >= i || T >= i) continue;
        const C = T * i + A;
        if (l[C] || z >= 4 && (l[x * i + A] || l[T * i + k])) continue;
        const I = M + Bn[z];
        I < r[C] && (r[C] = I, f(I * 65536 + C));
      }
    }
    return n;
  }
  // ── passo ──
  step() {
    if (this.outcome !== "playing" && this.players.every((t) => !t.ai || t.defeated), this.px.set(this.x), this.pz.set(this.z), this.nodesTick = 0, this.overBudget = !1, this.pending.length) {
      const t = this.pending.filter((a) => a.at <= this.tick).sort((a, s) => s.ext - a.ext || a.seq - s.seq);
      this.pending = this.pending.filter((a) => a.at > this.tick);
      for (const a of t) this.apply(a);
      if (this.onApplied) {
        const a = t.filter((s) => s.ext);
        a.length && this.onApplied(this.tick, a);
      }
    }
    this.buildHash(), md(this), Ac(this), this.saiDoMuro(), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const a = Z[this.kind[t]];
    return Math.round((this.fast[t] && a.animal ? a.animal.run : a.speed) * Q / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let a = 0; a < this.top; a++) {
      if (!this.alive[a] || this.state[a] !== se || this.kind[a] >= Tt) continue;
      const s = this.x[a], i = this.z[a], o = this.owner[a], n = this.bloqueioDe(o);
      let r = this.speedOf(a);
      this.estrada[(i >> 8) * t + (s >> 8)] && (r += r >> 1);
      let l = this.slotX[a], c = this.slotZ[a];
      const d = this.path[a];
      if (d && this.pathI[a] < d.length) {
        const T = d[this.pathI[a]], C = T % t * Q + 128, I = Math.floor(T / t) * Q + 128;
        Math.abs(C - s) + Math.abs(I - i) < 110 && this.pathI[a] < d.length - 1 && this.pathI[a]++, (this.pathI[a] < d.length - 1 || Math.abs(C - s) + Math.abs(I - i) >= 110) && (l = C, c = I), this.pathI[a] === d.length - 1 && Math.abs(C - s) + Math.abs(I - i) < 110 && (this.path[a] = null, l = this.slotX[a], c = this.slotZ[a]);
      }
      const h = this.slotX[a] - s, f = this.slotZ[a] - i, u = h * h + f * f;
      if (!this.path[a] && u <= r * r) {
        this.x[a] = this.slotX[a], this.z[a] = this.slotZ[a], this.state[a] = jt, this.field[a] = null;
        continue;
      }
      const m = this.field[a];
      if (m && !this.path[a] && u > 640 * 640) {
        const T = s >> 8, C = i >> 8, I = C * t + T;
        let S = m.dist[I], O = -1, B = -1;
        for (let H = 0; H < 8; H++) {
          const $ = T + ni[H], P = C + ri[H];
          if ($ < 0 || P < 0 || $ >= t || P >= t) continue;
          const w = P * t + $;
          n[w] || H >= 4 && (n[C * t + $] || n[P * t + T]) || m.dist[w] < S && (S = m.dist[w], O = $, B = P);
        }
        O >= 0 && (l = O * Q + 128, c = B * Q + 128);
      }
      const v = l - s, y = c - i, M = ra(v * v + y * y);
      if (M === 0) {
        this.state[a] = jt;
        continue;
      }
      const k = Math.min(r, M);
      let x = s + qe(v * k, M), z = i + qe(y * k, M);
      this.blockedAt(x, z, o) && (this.blockedAt(x, i, o) ? this.blockedAt(s, z, o) ? (x = s, z = i) : x = s : z = i), this.x[a] = x, this.z[a] = z;
      const A = Math.abs(h) + Math.abs(f);
      A + 24 < this.best[a] ? (this.best[a] = A, this.stuck[a] = 0) : this.stuck[a] = Math.min(255, this.stuck[a] + 1), (this.stuck[a] > 30 || this.stuck[a] > 10 && A < 3 * Q && !this.path[a]) && (this.state[a] = jt, this.field[a] = null, this.path[a] = null);
    }
  }
  buildHash() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    a.fill(-1);
    for (let i = 0; i < this.top; i++) {
      if (!this.alive[i] || this.kind[i] >= Tt) continue;
      const o = Math.min(t - 1, Math.max(0, this.z[i] >> 9)) * t + Math.min(t - 1, Math.max(0, this.x[i] >> 9));
      s[i] = a[o], a[o] = i;
    }
  }
  /** chama fn para cada unidade a até r tiles de (x, z) (usa a grade do tick) */
  near(t, a, s, i) {
    const o = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(s / 2)), r = Math.min(o - 1, (t >> 9) + Math.ceil(s / 2)), l = Math.max(0, (a >> 9) - Math.ceil(s / 2)), c = Math.min(o - 1, (a >> 9) + Math.ceil(s / 2)), d = s * Q * (s * Q);
    for (let h = l; h <= c; h++) for (let f = n; f <= r; f++) for (let u = this.hashHead[h * o + f]; u !== -1; u = this.hashNext[u]) {
      const m = this.x[u] - t, v = this.z[u] - a;
      m * m + v * v <= d && this.alive[u] && i(u);
    }
  }
  separate() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    this.buildHash();
    for (let i = 0; i < this.top; i++)
      this.pushX[i] = 0, this.pushZ[i] = 0;
    for (let i = 0; i < this.top; i++) {
      if (!this.isUnit(i)) continue;
      const o = Math.round(Z[this.kind[i]].radius * Q), n = this.x[i] >> 9, r = this.z[i] >> 9;
      for (let l = -1; l <= 1; l++) for (let c = -1; c <= 1; c++) {
        const d = n + c, h = r + l;
        if (!(d < 0 || h < 0 || d >= t || h >= t))
          for (let f = a[h * t + d]; f !== -1; f = s[f]) {
            if (f <= i || !this.isUnit(f)) continue;
            const u = Math.round(Z[this.kind[f]].radius * Q), m = o + u;
            let v = this.x[f] - this.x[i], y = this.z[f] - this.z[i];
            if (v >= m || v <= -m || y >= m || y <= -m) continue;
            let M = v * v + y * y;
            if (M >= m * m) continue;
            M === 0 && (v = 1 + i % 3, y = 1 + f % 3, M = v * v + y * y);
            const k = ra(M) || 1, x = m - k >> 1, z = qe(v * x, k), A = qe(y * x, k), T = this.state[i] === se ? 1 : 2, C = this.state[f] === se ? 1 : 2;
            this.pushX[i] -= qe(z * T, 2), this.pushZ[i] -= qe(A * T, 2), this.pushX[f] += qe(z * C, 2), this.pushZ[f] += qe(A * C, 2);
          }
      }
    }
    for (let i = 0; i < this.top; i++) {
      if (!this.pushX[i] && !this.pushZ[i]) continue;
      const o = this.x[i] + this.pushX[i], n = this.z[i] + this.pushZ[i], r = this.owner[i];
      this.blockedAt(o, n, r) ? this.blockedAt(o, this.z[i], r) ? this.blockedAt(this.x[i], n, r) || (this.z[i] = n) : this.x[i] = o : (this.x[i] = o, this.z[i] = n);
    }
  }
  updateFog() {
    const t = this.size;
    for (let i = 0; i < this.players.length; i++) {
      const o = this.vis[i], n = this.explored[i];
      o.fill(0);
      for (let r = 0; r < this.top; r++) {
        if (!this.alive[r] || this.owner[r] !== i || this.kind[r] === Tt) continue;
        const l = this.kind[r] >= ut ? this.bdef(r).sight : Z[this.kind[r]].sight, c = zd(l), d = this.x[r] >> 8, h = this.z[r] >> 8;
        for (let f = 0; f < c.length; f += 2) {
          const u = d + c[f], m = h + c[f + 1];
          if (u < 0 || m < 0 || u >= t || m >= t) continue;
          const v = m * t + u;
          o[v] = 1, n[v] = 1;
        }
      }
    }
    const a = this.times;
    if (!a) return;
    const s = t * t;
    for (let i = 0; i < a.length; i++) for (let o = i + 1; o < a.length; o++) if (a[i] === a[o]) {
      const n = this.vis[i], r = this.vis[o], l = this.explored[i], c = this.explored[o];
      for (let d = 0; d < s; d++)
        n[d] !== r[d] && (n[d] = r[d] = 1), l[d] !== c[d] && (l[d] = c[d] = 1);
    }
  }
  /** calendário: mês 0 = março */
  get month() {
    return Math.floor(this.tick / ke) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (ke * 12)) + 1;
  }
  drain() {
    const t = this.events;
    return this.events = [], t;
  }
  hash() {
    let t = 2166136261;
    const a = (s) => {
      for (let i = 0; i < 32; i += 8)
        t ^= s >>> i & 255, t = Math.imul(t, 16777619);
    };
    a(this.tick);
    for (let s = 0; s < this.top; s++) this.alive[s] && (a(s), a(this.kind[s]), a(this.owner[s]), a(this.x[s]), a(this.z[s]), a(this.hp[s]), a(this.task[s]), a(this.carry[s]));
    for (const s of this.players) for (const i of ja) a(s.res[i]);
    return t >>> 0;
  }
}
function Xt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const Dn = /* @__PURE__ */ new Set();
function ka(e, t) {
  const a = e + JSON.stringify(t);
  Dn.has(a) || (Dn.add(a), Xt(e, t));
}
function fo(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function Ad(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const Td = ["facil", "normal", "dificil"], $d = [5, 15, 30, 60, 90], Re = (e) => new Qt(e), Ut = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: Re("#f4f7fa") },
  uGrassA: { value: Re("#6fa84a") },
  uGrassB: { value: Re("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: Re("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: Re("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: Re("#5cb8b2") },
  uDeep: { value: Re("#1f6079") }
}, k0 = `
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif
#ifdef ROAD
attribute vec4 aCell;
#endif`, Sd = `
uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uTime;
uniform float uSnow; uniform vec3 uSnowColor; uniform vec3 uGrassA; uniform vec3 uGrassB; uniform vec3 uLeafColor; uniform vec3 uCropColor;
uniform vec3 uShallow; uniform vec3 uDeep;
varying vec3 vFowW;
#ifdef TERRAIN
varying vec2 vGrass;
#endif
#ifdef WATER
varying float vDepth;
#endif
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, z0 = `
#ifdef CANOPY
  transformed *= mix(0.1, 1.0, uLeaf);
#endif
#ifdef CROP
  transformed.y *= max(uCrop, 0.02);
#endif
#ifdef FLOWER
  transformed *= uFlower;
#endif
#ifdef FRUIT
  transformed *= uFruit;
#endif
#ifdef WIND
  { vec3 ip = vec3(0.0);
  #ifdef USE_INSTANCING
    ip = instanceMatrix[3].xyz;
  #endif
    float ph = ip.x * 0.37 + ip.z * 0.23;
    float k = WIND_AMP * (WIND_BYH ? max(position.y, 0.0) : 1.0);
    transformed.x += sin(uTime * 1.7 + ph) * k; transformed.z += cos(uTime * 1.3 + ph * 1.3) * k * 0.6; }
#endif
#ifdef WATER
  transformed.y += sin(position.x * 0.55 + uTime * 1.2) * 0.06 + cos(position.z * 0.45 + uTime * 0.9) * 0.06;
  vDepth = aDepth;
#endif
#if defined( ROAD ) && defined( USE_INSTANCING )
  // estrada (M3): cada vértice vai para a altura do chão onde está; aCell traz as alturas dos 4 cantos do quadrado do
  // terreno (a mesma conta de heightAt, com a mesma diagonal); a escala em y da instância (obra subindo) não vale para o chão
  { vec4 wp = instanceMatrix * vec4(transformed, 1.0);
    vec2 c0 = floor(instanceMatrix[3].xz / HSTEP) * HSTEP, f = clamp((wp.xz - c0) / HSTEP, 0.0, 1.0);
    float h = f.x + f.y <= 1.0 ? aCell.x + (aCell.y - aCell.x) * f.x + (aCell.z - aCell.x) * f.y
                               : aCell.w + (aCell.z - aCell.w) * (1.0 - f.x) + (aCell.y - aCell.w) * (1.0 - f.y);
    transformed.y += h / max(length(instanceMatrix[1].xyz), 0.001); }
#endif`, Cd = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, wd = `
#ifdef TERRAIN
  diffuseColor.rgb *= mix(vec3(1.0), mix(uGrassA, uGrassB, vGrass.y), vGrass.x);
#endif
#ifdef LEAF
  diffuseColor.rgb *= uLeafColor;
#endif
#ifdef GRASSTUFT
  diffuseColor.rgb *= mix(uGrassA, uGrassB, 0.45) * 1.08;
#endif
#ifdef CROPCOL
  diffuseColor.rgb *= uCropColor;
#endif
#ifdef WATER
  { float d = clamp(vDepth, 0.0, 3.0);
    diffuseColor.rgb = mix(uShallow, uDeep, smoothstep(0.1, 2.4, d));
    diffuseColor.a = mix(0.55, 0.92, smoothstep(0.0, 1.4, d));
    float foam = 1.0 - smoothstep(0.0, 0.32, d + (vn(vFowW.xz * 1.4 + uTime * 0.35) - 0.5) * 0.22);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.95, 0.94), foam * 0.85);
    diffuseColor.a = max(diffuseColor.a, foam * 0.9); }
#endif`, Pd = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, Ed = `
  { float cl = smoothstep(0.56, 0.86, vn(vFowW.xz * 0.017 + vec2(uTime * 0.011, uTime * 0.005)));
    gl_FragColor.rgb *= 1.0 - cl * 0.13;
    float f = texture2D(uFow, vFowW.xz / uWorld).r;
    float n = vn(vFowW.xz * 0.09 + uTime * 0.05);
    float vis = smoothstep(0.62, 0.93, f);
    float ex = smoothstep(0.07, 0.42, f + (n - 0.5) * 0.14);
    vec3 c = gl_FragColor.rgb;
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    vec3 exc = mix(vec3(l), c, 0.55) * 0.58 + vec3(0.010, 0.014, 0.022);
    vec3 un = c * 0.07 + vec3(0.016, 0.020, 0.030) * (0.8 + n * 0.5);
    gl_FragColor.rgb = mix(c, mix(mix(un, exc, ex), c, vis), uFowOn); }`;
function ei(e, t = {}) {
  const a = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", HSTEP: "2.0", ...t };
  return e.defines = Object.assign(e.defines || {}, a), e.onBeforeCompile = (s) => {
    for (const i in Ut) s.uniforms[i] = Ut[i];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + k0).replace("#include <begin_vertex>", `#include <begin_vertex>
` + z0).replace("#include <project_vertex>", `#include <project_vertex>
` + Cd), s.fragmentShader = s.fragmentShader.replace("#include <common>", `#include <common>
` + Sd).replace("#include <color_fragment>", `#include <color_fragment>
` + wd).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + Pd).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + Ed);
  }, e.customProgramCacheKey = () => JSON.stringify(a), e;
}
function A0(e) {
  const t = new Ll({ depthPacking: _l });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (a) => {
    for (const s in Ut) a.uniforms[s] = Ut[s];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + k0).replace("#include <begin_vertex>", `#include <begin_vertex>
` + z0);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const Zt = (e = {}, t = {}) => ei(new ws({ flatShading: !0, ...e }), t);
function Id(e) {
  const t = e.hn - 1;
  e.hstep;
  const a = e.size, s = new Qi(a, a, t, t).rotateX(-Math.PI / 2).translate(a / 2, 0, a / 2), i = s.attributes.position;
  for (let M = 0; M < i.count; M++) i.setY(M, e.heights[M]);
  const o = s.toNonIndexed(), n = o.attributes.position, r = n.count, l = new Float32Array(r * 3), c = new Float32Array(r * 2), d = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, h = (M) => new Qt().setRGB(M[0], M[1], M[2], Kr), f = Object.fromEntries(Object.entries(d).map(([M, k]) => [M, h(k)])), u = new Et(), m = new Et(), v = new Et();
  for (let M = 0; M < r; M += 3) {
    u.fromBufferAttribute(n, M), m.fromBufferAttribute(n, M + 1), v.fromBufferAttribute(n, M + 2);
    const k = (u.x + m.x + v.x) / 3, x = (u.y + m.y + v.y) / 3, z = (u.z + m.z + v.z) / 3, A = Math.min(a - 1, Math.max(0, Math.floor(k))), T = Math.min(a - 1, Math.max(0, Math.floor(z))), C = e.terrain[T * a + A], I = Math.abs(new Et().subVectors(v, m).cross(new Et().subVectors(u, m)).normalize().y), S = 0.93 + (M * 2654435761 >>> 0) / 4294967296 * 0.14, O = Da(k * 0.045, z * 0.045, 5, 2);
    let B = null, H = 0;
    if (x < -0.45) B = f.bed;
    else if (C === Di || C === Ka || C === Ma || x < 0.5) B = f.sand;
    else if (C === va || I < 0.66) B = x > 6 ? f.rock2 : f.rock;
    else if (C === Ze && x > to - 0.3) B = f.rock2;
    else {
      H = 1;
      const $ = 0.86 + O * 0.3 - Math.min(1, Math.max(0, (x - 4) / 12)) * 0.08;
      B = new Qt($, $, $);
    }
    for (let $ = 0; $ < 3; $++) {
      const P = (M + $) * 3;
      l[P] = B.r * S, l[P + 1] = B.g * S, l[P + 2] = B.b * S, c[(M + $) * 2] = H, c[(M + $) * 2 + 1] = O;
    }
  }
  o.setAttribute("color", new He(l, 3)), o.setAttribute("aGrass", new He(c, 2)), o.computeVertexNormals();
  const y = new oa(o, Zt({ vertexColors: !0 }, { TERRAIN: "" }));
  return y.receiveShadow = !0, y.castShadow = !0, y;
}
function qd(e) {
  const t = e.size, a = Math.round(t / 1.6), s = new Qi(t, t, a, a).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), i = s.attributes.position, o = new Float32Array(i.count);
  for (let r = 0; r < i.count; r++) o[r] = -zt(e, i.getX(r), i.getZ(r));
  s.setAttribute("aDepth", new He(o, 1));
  const n = new oa(s, ei(new rn({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const me = Math.PI * 2, Fn = new Yr(), Ln = new bs(), _n = new Et(), jn = new Et(), ma = new Et(), Pe = new Qt();
function p(e = 0, t = 0, a = 0, s = 0, i = 1, o = 1, n = 1, r = 0, l = 0) {
  return Fn.set(r, s, l, "YXZ"), Ln.setFromEuler(Fn), _n.set(e, t, a), jn.set(i, o, n), new le().compose(_n, Ln, jn);
}
function Od() {
  const e = [
    -0.5,
    0,
    0.5,
    0.5,
    0,
    0.5,
    0,
    1,
    0.5,
    0.5,
    0,
    -0.5,
    -0.5,
    0,
    -0.5,
    0,
    1,
    -0.5,
    -0.5,
    0,
    0.5,
    0,
    1,
    0.5,
    0,
    1,
    -0.5,
    -0.5,
    0,
    0.5,
    0,
    1,
    -0.5,
    -0.5,
    0,
    -0.5,
    0.5,
    0,
    0.5,
    0.5,
    0,
    -0.5,
    0,
    1,
    -0.5,
    0.5,
    0,
    0.5,
    0,
    1,
    -0.5,
    0,
    1,
    0.5
  ], t = new wa();
  return t.setAttribute("position", new Xa(e, 3)), t;
}
const li = {
  box: new ge(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new Ga(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new Ga(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cyl12: new Ga(0.5, 0.5, 1, 12).translate(0, 0.5, 0),
  cone4: new Po(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new Po(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new Xr(0.5, 0),
  dode: new jl(0.5, 0),
  prism: Od(),
  hemi: new Ri(0.5, 8, 3, 0, Math.PI * 2, 0, Math.PI / 2)
  // meia esfera (cúpula), base em y = 0
}, _a = {};
for (const e in li) _a[e] = li[e].index ? li[e].toNonIndexed() : li[e];
const Hn = /* @__PURE__ */ new Map();
function Rd(e, t, a, s) {
  const i = [e, t, a, s].join("/");
  let o = Hn.get(i);
  if (!o) {
    const n = new Hl(), r = e / 2;
    n.moveTo(-r, 0), n.lineTo(-a, 0), n.lineTo(-a, s), n.absarc(0, s, a, Math.PI, 0, !0), n.lineTo(a, 0), n.lineTo(r, 0), n.lineTo(r, t), n.lineTo(-r, t), n.lineTo(-r, 0);
    const l = new Ul(n, { depth: 1, bevelEnabled: !1, curveSegments: 6 }).translate(0, 0, -0.5);
    o = l.index ? l.toNonIndexed() : l, Hn.set(i, o);
  }
  return o;
}
class Pa {
  constructor(t = Math.random) {
    g(this, "pos", []);
    g(this, "col", []);
    this.rand = t;
  }
  add(t, a, s, i = 0.06) {
    const o = _a[t], n = o.attributes.position;
    Pe.set(a);
    const r = 1 + (this.rand() - 0.5) * i;
    for (let l = 0; l < n.count; l++)
      ma.fromBufferAttribute(n, l).applyMatrix4(s), this.pos.push(ma.x, ma.y, ma.z), this.col.push(Pe.r * r, Pe.g * r, Pe.b * r);
    return this;
  }
  /** uma geometria qualquer (sem índice), como as peças de PRIM */
  addGeo(t, a, s, i = 0.06) {
    const o = t.attributes.position;
    Pe.set(a);
    const n = 1 + (this.rand() - 0.5) * i;
    for (let r = 0; r < o.count; r++)
      ma.fromBufferAttribute(o, r).applyMatrix4(s), this.pos.push(ma.x, ma.y, ma.z), this.col.push(Pe.r * n, Pe.g * n, Pe.b * n);
    return this;
  }
  /** polígono plano (convexo), em leque; vira para cima (+y) qualquer que seja a ordem dos pontos */
  poly(t, a, s = 0.06) {
    if (a.length < 3) return this;
    Pe.set(t);
    const i = 1 + (this.rand() - 0.5) * s, [o, n, r] = a, c = (n[2] - o[2]) * (r[0] - o[0]) - (n[0] - o[0]) * (r[2] - o[2]) >= 0 ? a : a.slice().reverse();
    for (let d = 1; d + 1 < c.length; d++) for (const h of [c[0], c[d], c[d + 1]])
      this.pos.push(h[0], h[1], h[2]), this.col.push(Pe.r * i, Pe.g * i, Pe.b * i);
    return this;
  }
  build() {
    const t = new wa();
    return t.setAttribute("position", new Xa(this.pos, 3)), t.setAttribute("color", new Xa(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const lt = (e) => {
  const t = new Pa();
  return e(t), t.build();
};
function Sa(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const ci = new le().makeScale(0, 0, 0);
function Bd(e) {
  const t = new as(), a = Sa(e.seed * 7 + 1), s = e.size, i = {
    oakT: lt(($) => {
      $.add("cyl5", "#6b4a32", p(0, 0, 0, 0, 0.36, 1.8, 0.36)), $.add("cyl5", "#634430", p(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: lt(($) => {
      $.add("ico", "#ffffff", p(0, 0, 0, 0, 2.4, 2, 2.4)), $.add("ico", "#e6e6e6", p(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), $.add("ico", "#f3f3f3", p(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: lt(($) => {
      $.add("cyl5", "#6e4d36", p(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), $.add("cyl5", "#6e4d36", p(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: lt(($) => {
      $.add("ico", "#ffffff", p(0, 0, 0, 0, 3.7, 1.15, 3.5)), $.add("ico", "#e8e8e8", p(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: lt(($) => $.add("cyl5", "#5d4330", p(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: lt(($) => {
      $.add("cone7", "#ffffff", p(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), $.add("cone7", "#ececec", p(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), $.add("cone7", "#f6f6f6", p(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, o = Zt({ vertexColors: !0 }), n = [
    { kind: s0, t: i.oakT, c: i.oakC, mat: Zt({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: Io, t: i.pineT, c: i.pineC, mat: Zt({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: i0, t: i.firT, c: i.firC, mat: Zt({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), d = 3, h = ($, P) => Math.min(d - 1, Math.floor($ / s * d)) * d + Math.min(d - 1, Math.floor(P / s * d));
  for (const $ of n) {
    const P = [];
    for (let D = 0; D < s * s; D++) e.tree[D] === $.kind && P.push(D);
    for (let D = P.length - 1; D > 0; D--) {
      const j = Math.floor(a() * (D + 1)), E = P[D];
      P[D] = P[j], P[j] = E;
    }
    const w = Array.from({ length: d * d }, () => []);
    for (const D of P) {
      const j = D % s + 0.5 + (a() - 0.5) * 0.4, E = Math.floor(D / s) + 0.5 + (a() - 0.5) * 0.4, N = zt(e, j, E), K = $.s * (0.85 + a() * 0.45), it = a() * me;
      w[h(j, E)].push({ mt: p(j, N - 0.1, E, it, K, K, K), mc: p(j, N - 0.1 + $.cy * K, E, it, K, K, K), c: new Qt(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.8 + a() * 0.25), k: D });
    }
    for (const D of w) {
      if (!D.length) continue;
      const j = new Lt($.t, o, D.length), E = new Lt($.c, $.mat, D.length);
      D.forEach((N, K) => {
        j.setMatrixAt(K, N.mt), E.setMatrixAt(K, N.mc), E.setColorAt(K, N.c), l.set(N.k, { t: j, c: E, i: K });
      });
      for (const N of [j, E])
        N.castShadow = !0, N.receiveShadow = !0, N.computeBoundingSphere(), t.add(N);
      $.depth && (E.customDepthMaterial = A0($.depth)), r.push({ t: j, c: E, n: D.length });
    }
  }
  const f = [], u = ($, P, w, D, j = !0) => {
    const E = new Lt(_a.dode, Zt(), Math.max(1, $.length * D));
    let N = 0;
    for (const K of $) for (let it = 0; it < D; it++) {
      const q = K.x + 0.5 + (a() - 0.5) * 0.7, U = K.z + 0.5 + (a() - 0.5) * 0.7, at = w * (0.6 + a() * 0.6);
      if (E.setMatrixAt(N, p(q, zt(e, q, U) + at * 0.15, U, a() * me, at, at * (0.55 + a() * 0.4), at, a() * 0.5, a() * 0.5)), j) {
        const et = K.z * s + K.x, J = c.get(et) ?? [];
        J.push({ m: E, i: N }), c.set(et, J);
      }
      E.setColorAt(N++, new Qt(P).multiplyScalar(0.85 + a() * 0.3));
    }
    return E.count = N, E.castShadow = E.receiveShadow = !0, E.computeBoundingSphere(), t.add(E), E;
  };
  u(e.res.filter(($) => $.kind === Ge), "#c4bdae", 0.75, 2);
  const m = e.res.filter(($) => $.kind === Ce);
  f.push(u(m, "#7a6a58", 0.7, 2), u(m, "#4fa58a", 0.32, 2));
  const v = [], y = e.res.filter(($) => $.kind === be);
  if (y.length) {
    const $ = new Lt(_a.dode, Zt(), y.length * 2), P = new Lt(_a.dode, ei(new rn({ color: "#ffffff", specular: "#ffffff", shininess: 90, emissive: "#3c3f44", flatShading: !0 })), y.length * 2 * 3);
    let w = 0, D = 0;
    for (const j of y) {
      const E = j.z * s + j.x, N = c.get(E) ?? [];
      for (let K = 0; K < 2; K++) {
        const it = j.x + 0.5 + (a() - 0.5) * 0.6, q = j.z + 0.5 + (a() - 0.5) * 0.6, U = 0.7 * (0.65 + a() * 0.5), at = U * (0.6 + a() * 0.3), et = zt(e, it, q);
        $.setMatrixAt(w, p(it, et + at * 0.18, q, a() * me, U, at, U, a() * 0.4, a() * 0.4)), $.setColorAt(w, new Qt("#8e9198").multiplyScalar(0.88 + a() * 0.24)), N.push({ m: $, i: w }), w++;
        for (let J = 0; J < 3; J++) {
          const X = a() * me, V = 0.25 + a() * 0.45, Vt = U * 0.42, te = it + Math.cos(X) * Vt * (1 - V * 0.6), Rt = q + Math.sin(X) * Vt * (1 - V * 0.6), bt = et + at * 0.18 + at * 0.5 * V;
          P.setMatrixAt(D, p(te, bt, Rt, -X, U * 0.13, U * 0.08, U * (0.42 + a() * 0.25), (a() - 0.5) * 0.6, (a() - 0.5) * 0.5)), P.setColorAt(D, new Qt("#f4f6fa").multiplyScalar(0.92 + a() * 0.1)), N.push({ m: P, i: D }), D++;
        }
      }
      c.set(E, N);
    }
    for (const j of [$, P])
      j.count = j === $ ? w : D, j.castShadow = j.receiveShadow = !0, j.computeBoundingSphere(), t.add(j), v.push(j);
  }
  const M = e.res.filter(($) => $.kind === fe), k = new Lt(_a.ico, Zt({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, M.length)), x = new Lt(_a.ico, Zt({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, M.length * 6)), z = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map();
  M.forEach(($, P) => {
    const w = $.x + 0.5, D = $.z + 0.5, j = zt(e, w, D);
    k.setMatrixAt(P, p(w, j + 0.35, D, a() * me, 1.05, 0.85, 1.05));
    const E = [];
    for (let N = 0; N < 6; N++) {
      const K = a() * me, it = p(w + Math.cos(K) * 0.45, j + 0.35 + a() * 0.35, D + Math.sin(K) * 0.45, 0, 0.11, 0.11, 0.11);
      x.setMatrixAt(P * 6 + N, it), E.push(it);
    }
    z.set($.z * s + $.x, E), A.set($.z * s + $.x, P * 6);
  });
  for (const $ of [k, x])
    $.castShadow = !0, $.computeBoundingSphere(), t.add($);
  const T = lt(($) => {
    for (let P = 0; P < 3; P++) $.add("cone4", "#ffffff", p((P - 1) * 0.12, 0, P % 2 * 0.1, P * 2, 0.14, 0.5 + P * 0.08, 0.14, (P - 1) * 0.3, (P - 1) * 0.25), 0.15);
  }), C = [];
  for (let $ = 0; $ < 3e4 && C.length < 3200; $++) {
    const P = a() * s, w = a() * s, D = Math.floor(w) * s + Math.floor(P), j = e.terrain[D];
    if (j !== ga && j !== Ze || e.tree[D]) continue;
    const E = zt(e, P, w);
    E < 0.7 || E > 14 || j === Ze && E > to - 0.3 || C.push(p(P, E - 0.02, w, a() * me, 0.6 + a() * 0.6, 0.5 + a() * 0.6, 0.6 + a() * 0.6));
  }
  const I = new Lt(T, Zt({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, C.length));
  C.forEach(($, P) => {
    I.setMatrixAt(P, $), I.setColorAt(P, new Qt(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.85 + a() * 0.3));
  }), I.receiveShadow = !0, I.computeBoundingSphere(), t.add(I);
  const S = ($, P) => {
    for (const w of r) w.t.count = w.c.count = Math.floor(w.n * $);
    I.count = Math.floor(C.length * P);
  }, O = ($) => {
    const P = l.get($);
    P && (P.t.setMatrixAt(P.i, ci), P.c.setMatrixAt(P.i, ci), P.t.instanceMatrix.needsUpdate = P.c.instanceMatrix.needsUpdate = !0, l.delete($));
  }, B = ($) => {
    H($, !1);
    const P = c.get($);
    if (P) {
      for (const { m: w, i: D } of P)
        w.setMatrixAt(D, ci), w.instanceMatrix.needsUpdate = !0;
      c.delete($);
    }
  }, H = ($, P) => {
    const w = z.get($), D = A.get($);
    !w || D === void 0 || (w.forEach((j, E) => x.setMatrixAt(D + E, P ? j : ci)), x.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: f, silver: v, tufts: I, setDensity: S, removeTree: O, removeRes: B, setBerries: H };
}
function Nd(e, t = !1) {
  const a = e[0].index !== null, s = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), o = {}, n = {}, r = e[0].morphTargetsRelative, l = new wa();
  let c = 0;
  for (let d = 0; d < e.length; ++d) {
    const h = e[d];
    let f = 0;
    if (a !== (h.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const u in h.attributes) {
      if (!s.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + '. All geometries must have compatible attributes; make sure "' + u + '" attribute exists among all geometries, or in none of them.'), null;
      o[u] === void 0 && (o[u] = []), o[u].push(h.attributes[u]), f++;
    }
    if (f !== s.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + ". Make sure all geometries have the same number of attributes."), null;
    if (r !== h.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const u in h.morphAttributes) {
      if (!i.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + ".  .morphAttributes must be consistent throughout all geometries."), null;
      n[u] === void 0 && (n[u] = []), n[u].push(h.morphAttributes[u]);
    }
    if (t) {
      let u;
      if (a)
        u = h.index.count;
      else if (h.attributes.position !== void 0)
        u = h.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + d + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(c, u, d), c += u;
    }
  }
  if (a) {
    let d = 0;
    const h = [];
    for (let f = 0; f < e.length; ++f) {
      const u = e[f].index;
      for (let m = 0; m < u.count; ++m)
        h.push(u.getX(m) + d);
      d += e[f].attributes.position.count;
    }
    l.setIndex(h);
  }
  for (const d in o) {
    const h = Un(o[d]);
    if (!h)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + d + " attribute."), null;
    l.setAttribute(d, h);
  }
  for (const d in n) {
    const h = n[d][0].length;
    if (h === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[d] = [];
    for (let f = 0; f < h; ++f) {
      const u = [];
      for (let v = 0; v < n[d].length; ++v)
        u.push(n[d][v][f]);
      const m = Un(u);
      if (!m)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + d + " morphAttribute."), null;
      l.morphAttributes[d].push(m);
    }
  }
  return l;
}
function Un(e) {
  let t, a, s, i = -1, o = 0;
  for (let c = 0; c < e.length; ++c) {
    const d = e[c];
    if (t === void 0 && (t = d.array.constructor), t !== d.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (a === void 0 && (a = d.itemSize), a !== d.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (s === void 0 && (s = d.normalized), s !== d.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (i === -1 && (i = d.gpuType), i !== d.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    o += d.count * a;
  }
  const n = new t(o), r = new He(n, a, s);
  let l = 0;
  for (let c = 0; c < e.length; ++c) {
    const d = e[c];
    if (d.isInterleavedBufferAttribute) {
      const h = l / a;
      for (let f = 0, u = d.count; f < u; f++)
        for (let m = 0; m < a; m++) {
          const v = d.getComponent(f, m);
          r.setComponent(f + h, m, v);
        }
    } else
      n.set(d.array, l);
    l += d.count * a;
  }
  return i !== void 0 && (r.gpuType = i), r;
}
const _e = {
  emit: (e, t, a, s) => {
  }
}, Ee = new le().makeScale(0, 0, 0), Wn = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], Gn = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], Dd = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], Vn = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], Fd = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85", "#c3cfdc"], po = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], xe = "#b5813e", sa = "#6e4f37", Fe = "#8a6545", Ld = ["#ddd0b4", "#cdbb98", "#c4ab8a", "#e3d9c3"];
function pn(e) {
  const t = [], a = [], s = new Qt();
  for (const [o, n] of e) {
    const r = o.index ? o.toNonIndexed() : o, l = r.attributes.position.array;
    s.set(n);
    for (let c = 0; c < l.length; c += 3)
      t.push(l[c], l[c + 1], l[c + 2]), a.push(s.r, s.g, s.b);
  }
  const i = new wa();
  return i.setAttribute("position", new Xa(t, 3)), i.setAttribute("color", new Xa(a, 3)), i.computeVertexNormals(), i;
}
const mo = {
  leg: new ge(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new Ga(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new ge(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new ge(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new Xr(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: Nd([new Ri(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new Ri(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new Ga(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: lt((e) => {
    e.add("cyl5", "#7a5a3c", p(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", p(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: lt((e) => {
    e.add("cyl5", "#6b4a2f", p(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", p(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: lt((e) => {
    e.add("cyl5", "#7a5a3c", p(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", p(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", p(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: lt((e) => {
    e.add("cyl5", "#7a5a3c", p(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", p(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", p(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: lt((e) => {
    e.add("cyl5", "#7a5a3c", p(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", p(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: lt((e) => {
    e.add("cyl5", "#8a6a48", p(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", p(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", p(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: pn([[new Jr(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new ge(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: lt((e) => {
    e.add("cyl5", "#4a3326", p(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", xe, p(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", p(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", p(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: lt((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", p(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", p(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", p(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new ge(0.26, 0.26, 0.15)
}, Kn = {
  body: new ge(1, 1, 1),
  neck: new ge(1, 1, 1).translate(0, 0.5, 0),
  collar: new ge(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: lt((e) => {
    e.add("box", "#ffffff", p(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", p(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: lt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", p(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new ge(1, 1, 1).translate(0, -0.5, 0),
  tail: new ge(1, 1, 1).translate(0, -0.5, 0),
  antlers: lt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", p(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", p(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", p(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: lt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", p(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", p(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: lt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", p(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, go = {
  body: lt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", p(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", p(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", p(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", p(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", p(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", p(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", p(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", p(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", p(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new Ga(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: lt((e) => {
    e.add("cyl8", "#5e4431", p(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", p(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", p(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", p(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new ge(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, T0 = lt((e) => {
  e.add("cyl5", "#7a5a3c", p(0, -0.7, 0, 0, 0.05, 0.6, 0.05), 0), e.add("cone4", "#6f7276", p(0, -0.14, 0, 0, 0.085, 0.14, 0.085), 0), e.add("box", "#5d5f62", p(0, -0.17, 0, 0, 0.06, 0.04, 0.06), 0);
  for (let t = 0; t < 3; t++) {
    const a = t * Math.PI * 2 / 3;
    e.add("box", "#b08a5c", p(Math.sin(a) * 0.04, -0.7, Math.cos(a) * 0.04, a, 0.012, 0.17, 0.07), 0);
  }
}).rotateX(Math.PI / 2), $0 = lt((e) => {
  e.add("dode", "#8f8a80", p(0, 0, -0.2, 0, 0.42, 0.38, 0.4), 0), e.add("dode", "#7f7a71", p(0.06, 0.07, -0.24, 0.6, 0.26, 0.24, 0.26), 0);
}), di = "#b9bdc3", _d = "#7a5a3c", Xn = "#5e4b38", bo = "#9c6c32", hi = "#c99350", Yn = (e, t) => pn([[new ge(e, e, 1).translate(0, 0, 0.5), t]]), Jn = (e) => lt((t) => {
  t.add("cyl12", "#6b4a2f", p(-0.035, 0, 0, 0, e * 2, 0.07, e * 2, 0, -Math.PI / 2), 0), t.add("cyl12", "#856043", p(-0.04, 0, 0, 0, e * 1.5, 0.08, e * 1.5, 0, -Math.PI / 2), 0), t.add("cyl8", "#4a3526", p(-0.06, 0, 0, 0, 0.09, 0.12, 0.09, 0, -Math.PI / 2), 0);
}), Zn = {
  // armas (a mão na origem, o cabo para +y, a ponta ou o fio para +y/+z, como as ferramentas)
  // lança longa (hasta): a mão a uns 40% do comprimento (de perto a estocada não deixa um cabo enorme para trás); em pé, ela
  // sobe na mão até o conto encostar no chão (HASTA_UP)
  hasta: lt((e) => {
    e.add("cyl5", _d, p(0, -0.95, 0, 0, 0.042, 2.3, 0.042), 0), e.add("cone4", "#b8b4aa", p(0, 1.33, 0, 0, 0.085, 0.29, 0.085), 0), e.add("cone4", xe, p(0, -0.95, 0, 0, 0.05, 0.1, 0.05, Math.PI), 0);
  }),
  javelin: lt((e) => {
    e.add("cyl5", "#8a6a48", p(0, -0.45, 0, 0, 0.03, 1.42, 0.03), 0), e.add("cyl5", "#8d9096", p(0, 0.9, 0, 0, 0.018, 0.16, 0.018), 0), e.add("cone4", "#a9adb3", p(0, 1.04, 0, 0, 0.05, 0.16, 0.05), 0);
  }),
  gladius: lt((e) => {
    e.add("ico", "#8a6a44", p(0, -0.11, 0, 0, 0.065, 0.055, 0.065), 0), e.add("cyl5", "#d6cbb2", p(0, -0.1, 0, 0, 0.042, 0.17, 0.042), 0), e.add("box", "#8a6a44", p(0, 0.07, 0, 0, 0.05, 0.04, 0.13), 0), e.add("box", di, p(0, 0.11, 0, 0, 0.022, 0.31, 0.072), 0), e.add("cone4", di, p(0, 0.42, 0, Math.PI / 4, 0.06, 0.1, 0.06), 0);
  }),
  longsword: lt((e) => {
    e.add("ico", "#6b4a2f", p(0, -0.14, 0, 0, 0.06, 0.05, 0.06), 0), e.add("cyl5", "#4a3326", p(0, -0.13, 0, 0, 0.042, 0.2, 0.042), 0), e.add("box", "#6f7276", p(0, 0.07, 0, 0, 0.045, 0.035, 0.12), 0), e.add("box", di, p(0, 0.1, 0, 0, 0.02, 0.6, 0.058), 0), e.add("cone4", di, p(0, 0.7, 0, Math.PI / 4, 0.045, 0.05, 0.045), 0);
  }),
  // escudos (o centro na origem, a frente para +z)
  aspis: lt((e) => {
    e.add("cyl12", bo, p(0, 0, -0.03, 0, 0.72, 0.05, 0.72, Math.PI / 2), 0), e.add("cyl12", hi, p(0, 0, -0.01, 0, 0.62, 0.06, 0.62, Math.PI / 2), 0);
  }),
  emblem: lt((e) => {
    e.add("cyl8", "#ffffff", p(0, 0, 0.045, 0, 0.26, 0.016, 0.26, Math.PI / 2), 0);
  }),
  // na cor do time
  parma: lt((e) => {
    e.add("cyl12", bo, p(0, 0, -0.025, 0, 0.42, 0.035, 0.42, Math.PI / 2), 0), e.add("cyl12", "#8a6a44", p(0, 0, -0.02, 0, 0.36, 0.04, 0.36, Math.PI / 2), 0), e.add("hemi", hi, p(0, 0, 0.015, 0, 0.11, 0.08, 0.11, Math.PI / 2), 0);
  }),
  // escudo comprido e curvo (scutum): quatro tábuas num arco, na cor do time; o umbo de ferro e a faixa do meio à parte
  scutum: lt((e) => {
    for (let a = 0; a < 4; a++) {
      const s = (a - 1.5) * 0.28;
      e.add("box", "#ffffff", p(Math.sin(s) * 0.45, -0.39, Math.cos(s) * 0.45 - 0.45, s, 0.127, 0.78, 0.03), 0);
    }
  }),
  scutumTrim: lt((e) => {
    e.add("box", xe, p(0, -0.36, 0.014, 0, 0.034, 0.72, 0.02), 0), e.add("hemi", "#9ea3a8", p(0, 0, 0.012, 0, 0.15, 0.08, 0.15, Math.PI / 2), 0);
  }),
  // escudo oval dos gauleses (pintado: a cor vem da instância; a faixa e o umbo escuros continuam escuros)
  oval: lt((e) => {
    e.add("cyl12", "#ffffff", p(0, 0, -0.02, 0, 0.42, 0.035, 0.76, Math.PI / 2), 0), e.add("box", "#4a3a2a", p(0, -0.34, 0.012, 0, 0.034, 0.68, 0.02), 0), e.add("cyl8", "#4c4c4c", p(0, 0, 0.012, 0, 0.13, 0.05, 0.13, Math.PI / 2), 0);
  }),
  // cabeça (a origem no centro da cabeça; o rosto para +z; o alto do capacete fica a 0,17)
  crest: lt((e) => {
    for (const t of [0.45, 0.12, -0.21, -0.54, -0.87, -1.2]) e.add("box", "#ffffff", p(0, 0.03 + Math.cos(t) * 0.125, -0.012 + Math.sin(t) * 0.125, 0, 0.034, 0.085 - Math.max(0, -t - 0.6) * 0.06, 0.085, t), 0);
  }),
  // crista de crina: um arco por cima do capacete, da testa à nuca (cor da instância)
  plumes: lt((e) => {
    e.add("cyl5", xe, p(0, 0.15, -5e-3, 0, 0.05, 0.06, 0.05), 0), [-1, 0, 1].forEach((t) => e.add("box", t ? "#7d3a92" : "#26212a", p(t * 0.03, 0.19, -5e-3, 0, 0.028, 0.25, 0.014, 0, -t * 0.16), 0)), e.add("box", xe, p(0, -0.04, -0.12, 0, 0.24, 0.05, 0.06, 0.4), 0);
  }),
  // botão do capacete, três penas em pé e a aba da nuca
  knob: lt((e) => {
    e.add("cyl5", xe, p(0, 0.15, -5e-3, 0, 0.05, 0.06, 0.05), 0), e.add("box", xe, p(0, -0.04, -0.12, 0, 0.24, 0.05, 0.06, 0.4), 0);
  }),
  wolfhood: lt((e) => {
    const t = "#77706a", a = "#5f5952";
    e.add("box", t, p(0, 0.075, 0.07, 0, 0.1, 0.075, 0.18), 0), e.add("box", a, p(0, 0.07, 0.165, 0, 0.07, 0.055, 0.045), 0), e.add("box", "#1e1c1b", p(0, 0.1, 0.19, 0, 0.035, 0.025, 0.02), 0);
    for (const s of [-1, 1]) e.add("cone4", t, p(s * 0.065, 0.14, -0.01, Math.PI / 4, 0.06, 0.1, 0.04, 0, -s * 0.2), 0);
    e.add("box", a, p(0, -0.3, -0.158, 0, 0.22, 0.36, 0.03, 0.1), 0);
  }),
  mustache: lt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#ffffff", p(t * 0.03, -0.052, 0.103, t * 0.37, 0.055, 0.022, 0.022, 0, t * 0.3), 0), e.add("box", "#ffffff", p(t * 0.057, -0.105, 0.091, t * 0.37, 0.018, 0.06, 0.018), 0);
  }),
  // cor do cabelo
  // corpo (a origem no quadril; o tronco vai de 0 a 0,42; a frente para +z)
  pectoral: lt((e) => {
    e.add("box", hi, p(0, 0.15, 0.1, 0, 0.2, 0.2, 0.03), 0), e.add("box", bo, p(0, 0.24, 0.108, 0, 0.13, 0.03, 0.03), 0);
    for (const t of [-1, 1]) e.add("box", "#5a3d27", p(t * 0.08, 0.34, 0, 0, 0.04, 0.03, 0.24), 0);
  }),
  mail: lt((e) => {
    e.add("box", "#7c8187", p(0, 0.31, 0, 0, 0.38, 0.12, 0.25), 0), e.add("box", "#6f747a", p(0, 0, 0, 0, 0.36, 0.07, 0.24), 0);
  }),
  // ombreiras e barra da cota de malha
  torque: pn([[new Jr(0.1, 0.018, 4, 12).rotateX(Math.PI / 2).translate(0, 0.43, 0.012), "#dcab3c"]]),
  greave: lt((e) => {
    e.add("box", hi, p(0, -0.42, 0.045, 0, 0.14, 0.22, 0.05), 0);
  }),
  // na perna (a origem no quadril)
  // escorpião (virado para +z): carrinho de duas rodas com pés na frente, poste, a calha e a armação das molas de corda
  sBody: lt((e) => {
    for (const t of [-1, 1])
      e.add("box", sa, p(t * 0.2, 0.17, -0.05, 0, 0.07, 0.07, 0.95), 0), e.add("box", sa, p(t * 0.2, 0, 0.36, 0, 0.06, 0.2, 0.06), 0);
    e.add("cyl5", "#4a3526", p(0.34, 0.2, -0.32, 0, 0.05, 0.68, 0.05, 0, Math.PI / 2), 0);
    for (const t of [-0.45, 0.36]) e.add("box", sa, p(0, 0.18, t, 0, 0.46, 0.06, 0.06), 0);
    e.add("box", Fe, p(0, 0.2, 0.02, 0, 0.1, 0.5, 0.1), 0), e.add("cyl8", Fe, p(0, 0.68, 0.02, 0, 0.22, 0.05, 0.22), 0), e.add("box", sa, p(0, 0.73, -0.06, 0, 0.12, 0.1, 1.04), 0), e.add("box", "#a07c55", p(0, 0.83, -0.12, 0, 0.05, 0.015, 0.86), 0);
    for (const t of [0.72, 1]) e.add("box", Fe, p(0, t, 0.22, 0, 0.56, 0.06, 0.1), 0);
    for (const t of [-0.27, -0.06, 0.06, 0.27]) e.add("box", Fe, p(t, 0.72, 0.22, 0, 0.05, 0.34, 0.1), 0);
    for (const t of [-1, 1]) {
      e.add("cyl8", Xn, p(t * 0.165, 0.72, 0.22, 0, 0.085, 0.34, 0.085), 0);
      for (const a of [0.705, 1.045]) e.add("cyl8", xe, p(t * 0.165, a, 0.22, 0, 0.13, 0.03, 0.13), 0);
    }
    e.add("cyl8", "#5e4431", p(0.13, 0.88, -0.5, 0, 0.09, 0.26, 0.09, 0, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", Fe, p(t * 0.15, 0.8, -0.5, 0, 0.03, 0.16, 0.03), 0);
  }),
  sPlate: lt((e) => {
    e.add("box", "#ffffff", p(0, 0.36, 0.3, 0, 0.5, 0.3, 0.025), 0);
  }),
  // escudo da frente, na cor do time
  sArm: lt((e) => {
    e.add("box", sa, p(0.15, -0.02, 0, 0, 0.3, 0.045, 0.04), 0), e.add("box", xe, p(0.29, -0.025, 0, 0, 0.03, 0.05, 0.05), 0);
  }),
  sString: Yn(0.012, "#e2dccb"),
  sBolt: T0,
  sWheel: Jn(0.2),
  // balista (virada para +z): armação grande de quatro rodas, a calha inclinada, a armação das molas na frente e a manivela atrás
  bBody: lt((e) => {
    for (const t of [-1, 1]) e.add("box", sa, p(t * 0.4, 0.26, -0.02, 0, 0.1, 0.1, 1.6), 0);
    for (const t of [-0.74, 0, 0.7]) e.add("box", sa, p(0, 0.27, t, 0, 0.9, 0.08, 0.1), 0);
    for (const t of [-1, 1]) for (const a of [-0.55, 0.55]) e.add("cyl5", "#4a3526", p(t * 0.52, 0.26, a, 0, 0.06, 0.2, 0.06, 0, t * Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", Fe, p(t * 0.12, 0.33, 0.05, 0, 0.1, 0.55, 0.1), 0);
    e.add("box", Fe, p(0, 0.33, -0.5, 0, 0.1, 0.5, 0.1, -0.3), 0), e.add("box", sa, p(0, 0.84, 0.04, 0, 0.22, 0.12, 1.72, -0.06), 0), e.add("box", "#a07c55", p(0, 0.955, 0.02, 0, 0.12, 0.02, 1.5, -0.06), 0);
    for (const t of [0.8, 1.32]) e.add("box", Fe, p(0, t, 0.62, 0, 1.12, 0.1, 0.16), 0);
    for (const t of [-0.54, -0.13, 0.13, 0.54]) e.add("box", Fe, p(t, 0.8, 0.62, 0, 0.1, 0.62, 0.16), 0);
    for (const t of [-1, 1]) {
      e.add("cyl8", Xn, p(t * 0.335, 0.8, 0.62, 0, 0.17, 0.62, 0.17), 0);
      for (const a of [0.78, 1.4]) e.add("cyl8", xe, p(t * 0.335, a, 0.62, 0, 0.25, 0.05, 0.25), 0);
    }
    e.add("cyl8", "#5e4431", p(0.26, 0.99, -0.72, 0, 0.13, 0.52, 0.13, 0, Math.PI / 2), 0);
    for (const t of [-1, 1])
      e.add("box", Fe, p(t * 0.3, 0.84, -0.72, 0, 0.035, 0.3, 0.035), 0), e.add("box", Fe, p(t * 0.3, 0.99, -0.87, 0, 0.035, 0.3, 0.035, Math.PI / 2), 0);
  }),
  bPlate: lt((e) => {
    for (const t of [-1, 1]) e.add("box", "#ffffff", p(t * 0.462, 0.2, -0.02, 0, 0.025, 0.16, 1), 0);
    e.add("box", "#ffffff", p(0, 0.46, 0.715, 0, 0.88, 0.26, 0.025), 0);
  }),
  // tábuas na cor do time
  bArm: lt((e) => {
    e.add("box", sa, p(0.25, -0.045, 0, 0, 0.5, 0.09, 0.08), 0), e.add("box", xe, p(0.48, -0.05, 0, 0, 0.05, 0.1, 0.09), 0);
  }),
  bString: Yn(0.022, "#e2dccb"),
  bStone: $0,
  bWheel: Jn(0.26),
  // trouxa de prata nas costas (M3): saco claro amarrado, com pedras de prata por cima (material que brilha)
  prataCarga: lt((e) => {
    e.add("box", "#e9edf2", p(0, -0.13, 0, 0, 0.26, 0.24, 0.15), 0), e.add("box", "#b9c0c9", p(0, 0.07, 0, 0, 0.27, 0.03, 0.16), 0);
    for (const [t, a, s] of [[-0.07, 0.01, 0.1], [0.05, -0.02, 0.12], [0, 0.03, 0.08]]) e.add("ico", "#ffffff", p(t, 0.11, a, t * 9, s, s * 0.8, s), 0);
  })
}, jd = /* @__PURE__ */ new Set(["emblem", "scutum", "oval", "crest", "mustache", "sPlate", "bPlate"]), Hd = { sBody: 48, sPlate: 48, sArm: 96, sString: 96, sBolt: 48, sWheel: 96, bBody: 48, bPlate: 48, bArm: 96, bString: 96, bStone: 48, bWheel: 192, greave: 512 }, Ud = { hasta: "spear", javelin: "spear", gladius: "sword", longsword: "sword" }, vo = (e) => e && Ud[e] || e, Wd = { spear: 1.4, hasta: 1.6, javelin: 1.2 }, Gd = { aspis: [-0.05, -0.26, 0.2], parma: [0.04, -0.24, 0.14], scutum: [0.02, -0.27, 0.19], oval: [0.03, -0.24, 0.16] }, Os = /* @__PURE__ */ new Set(["horseman", "eques"]), Vd = {
  // a espada longa: o braço fica alto e o pulso deita a lâmina, que cai em cima da borda do escudo, do lado do ombro (longe
  // da cabeça)
  longsword: { up: -2.75, end: -2.3, wrist: 1.9, spin: 0.1, rz: 0, L: 0.75 },
  gladius: { up: -2.65, end: -1.35, wrist: 0.9, spin: 0.2, rz: -0.15, L: 0.48 }
}, Qe = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, S0 = Qe.horse.leg + Qe.horse.body[1], Fa = (e) => e * e * (3 - 2 * e);
function ns(e, t, a) {
  if (e < 0.12) return a - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return a + (t - a) * Fa((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const s = (e - 0.8) / 0.2;
  return t + (a - t) * s * s;
}
const rs = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, _o = 2.6;
function C0(e) {
  const t = Z[e]?.key ?? "";
  if (Os.has(t)) return Qe.horse.leg + Qe.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  if (t === "scorpio") return 0.75;
  if (t === "ballista") return 0.85;
  const a = Qe[t];
  return a ? a.leg + a.body[1] * 0.5 : 0.72;
}
function Kd(e) {
  const t = Z[e]?.key ?? "";
  if (Os.has(t)) return S0 + 0.1;
  if (t === "ram") return 1.15;
  if (t === "scorpio") return 1.08;
  if (t === "ballista") return 1.45;
  const a = Qe[t];
  return a ? a.leg + a.body[1] + 0.06 : 1.15;
}
const Oa = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, he = (e, t) => e[Math.floor(t * e.length) % e.length];
class Xd {
  constructor(t = 720, a = 160) {
    g(this, "group", new as());
    g(this, "hm", {});
    g(this, "am", {});
    g(this, "rm", {});
    g(this, "slotR");
    g(this, "maxR", 48);
    g(this, "ring");
    g(this, "barBg");
    g(this, "barFg");
    g(this, "slotH");
    g(this, "slotA");
    g(this, "lookKey", []);
    g(this, "heading", new Float32Array(4096));
    g(this, "phase", new Float32Array(4096));
    g(this, "lastP", new Float32Array(4096));
    g(this, "lastCd", new Int16Array(4096));
    g(this, "lastCarry", new Int16Array(4096));
    // para o som: golpe, ataque e entrega
    /** muros (D35): a peça do muro na frente de quem ataca (troncos ou pedras): a que distância (do centro de quem ataca) e até
     *  que altura ela vai. O golpe, a estocada e a mordida param ali: os troncos ficam no meio do terreno do bloco, não na
     *  borda. Guardado por unidade (quem ataca fica parado: a conta é feita uma vez) */
    g(this, "muroFrente", /* @__PURE__ */ new Map());
    g(this, "m", { b: new le(), hip: new le(), tor: new le(), l: new le(), t: new le(), al: new le(), ar: new le(), hd: new le(), lgL: new le(), lgR: new le() });
    /** peças do M3 (XGEO): cada uma desenha só quem a usa; xn = quantas neste quadro */
    g(this, "xm", {});
    g(this, "xn", {});
    /** M3: onde cada pessoa estava no último quadro (corpo, cabeça e escudo): a espada do M3 e a mordida dos bichos param nela
     *  em vez de atravessar. vq: o quadro; vb: pé (x, y, z), giro, escala; vh: cabeça (x, y, z), raio, altura da crista;
     *  ve: escudo (tipo, centro, eixos do lado, de cima e da frente, meia largura, quanto sobe e quanto desce do centro) */
    g(this, "quadro", 0);
    g(this, "vq", new Int32Array(4096).fill(-9));
    g(this, "vb", new Float32Array(4096 * 5));
    g(this, "vh", new Float32Array(4096 * 5));
    g(this, "ve", new Float32Array(4096 * 16));
    /** o golpe das espadas do M3 contra uma pessoa: o ângulo do braço em que a lâmina encosta nela (guardado por unidade) */
    g(this, "lamina", /* @__PURE__ */ new Map());
    /** M3: meio passo para trás de quem golpeia com a espada longa (ou o gládio) uma pessoa muito perto, só no desenho (vai e
     *  volta aos poucos): colado, a lâmina comprida batia logo na borda do escudo dele, quase sem descer */
    g(this, "recuo", new Float32Array(4096));
    g(this, "e", new Yr());
    g(this, "q", new bs());
    g(this, "p", new Et());
    g(this, "s", new Et());
    g(this, "v", new Et());
    g(this, "c", new Qt());
    /** as cores das peças pintadas, já lidas (ler o texto da cor a cada quadro, para centenas de soldados, pesa no celular) */
    g(this, "cores", /* @__PURE__ */ new Map());
    g(this, "_s0", new le());
    g(this, "_s1", new le());
    g(this, "_s2", new le());
    g(this, "_sp", new Et());
    g(this, "_za", new Et(0, 0, 1));
    g(this, "_d", new Et());
    g(this, "_cq", new bs());
    g(this, "_cp", new Et());
    g(this, "_cs", new Et());
    this.maxH = t, this.maxA = a;
    const s = Zt({}, { NO_SNOW: "" }), i = Zt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const l in mo) {
      const c = l === "leg" || l === "arm" ? t * 2 : t, d = !!mo[l].attributes.color, h = new Lt(mo[l], d ? i : s, c);
      h.instanceMatrix.setUsage(ue), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < c; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.hm[l] = h;
    }
    for (const l in Kn) {
      const c = l === "leg" ? a * 4 : a, d = ["head", "ears", "antlers", "horns", "tusks"].includes(l), h = new Lt(Kn[l], d ? i : s, c);
      h.instanceMatrix.setUsage(ue), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < c; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.am[l] = h;
    }
    for (const l in go) {
      const c = l === "wheel" ? this.maxR * 4 : this.maxR, d = !!go[l].attributes.color, h = new Lt(go[l], d ? i : s, c);
      h.instanceMatrix.setUsage(ue), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < c; f++) h.setColorAt(f, this.c.set(l === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(h), this.rm[l] = h;
    }
    const o = ei(new rn({ vertexColors: !0, specular: "#ffffff", shininess: 70, emissive: "#3a3e45", flatShading: !0 }), { NO_SNOW: "" });
    for (const l in Zn) {
      const c = Hd[l] ?? t, d = new Lt(Zn[l], l === "prataCarga" ? o : i, c);
      if (d.instanceMatrix.setUsage(ue), d.frustumCulled = !1, d.castShadow = !0, d.count = 0, jd.has(l)) for (let h = 0; h < c; h++) d.setColorAt(h, this.c.set("#ffffff"));
      this.group.add(d), this.xm[l] = d, this.xn[l] = 0;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const n = new Zr(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new Lt(n, new Va({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const r = new Qi(1, 0.11);
    this.barBg = new Lt(r, new Va({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new Lt(r.clone().translate(0.5, 0, 0), new Va({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const l of [this.ring, this.barBg, this.barFg])
      l.instanceMatrix.setUsage(ue), l.frustumCulled = !1, l.count = 0, this.group.add(l);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let l = 0; l < t; l++) this.ring.setColorAt(l, this.c.set("#9dffc4"));
    for (let l = 0; l < 400; l++) this.barFg.setColorAt(l, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(a).fill(-1);
  }
  /** d: distância até a face da peça; top: até onde ela vai (as pontas dos troncos são finas e escapam dos raios: vale a
   *  altura do modelo, menor na obra); esp: a grossura (a paliçada é uma fileira de troncos; a muralha ocupa o bloco) */
  frenteMuro(t, a, s, i, o, n) {
    const r = `${s}|${Math.round(i * 50)}|${Math.round(o * 50)}|${Math.round(n * 50)}|${t.done[s]}|${t.work[s] >> 5}`, l = this.muroFrente.get(a);
    if (l && l.k === r) return l;
    const c = Math.sin(n), d = Math.cos(n), h = ct[t.kind[s] - ut], f = h.key === "palisade", u = h.key === "tufa";
    let m = 1 / 0;
    for (const M of [0.1, 0.3, 0.55, 0.8]) {
      const k = br(t, s, i, o, c, d, M * (t.done[s] ? 1 : 0.3));
      k !== null && k < m && (m = k);
    }
    const v = t.done[s] ? 1 : Math.max(0.12, Math.min(1, t.work[s] / (h.time * 100))), y = { k: r, d: m, top: Sh(h.key) * v, esp: f ? 0.26 : u ? 0.74 : 1 };
    return this.muroFrente.set(a, y), this.muroFrente.size > 512 && this.muroFrente.clear(), y;
  }
  /** o muro (de qualquer dono) até 2 m na frente de quem atira: a lança na mão sobe por cima dele (D35) */
  muroNaFrente(t, a, s, i, o) {
    const n = Math.sin(o), r = Math.cos(o), l = t.size;
    for (let c = 0.2; c <= 2; c += 0.2) {
      const d = Math.floor(s + n * c), h = Math.floor(i + r * c);
      if (d < 0 || h < 0 || d >= l || h >= l) return null;
      const f = t.bAt[h * l + d] - 1;
      if (f >= 0 && t.isBuilding(f) && t.bdef(f).wall) {
        const u = this.frenteMuro(t, a, f, s, i, o);
        return u.d < 3 ? u : null;
      }
    }
    return null;
  }
  trs(t, a, s, i, o = 0, n = 0, r = 0, l = 1, c = l, d = l) {
    return this.e.set(o, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(a, s, i), this.s.set(l, c, d), t.compose(this.p, this.q, this.s);
  }
  /** uma peça do M3 neste quadro (col: a cor, nas pintadas por instância) */
  put(t, a, s) {
    const i = this.xm[t], o = this.xn[t];
    !i || o >= i.instanceMatrix.count || (i.setMatrixAt(o, a), s !== void 0 && i.instanceColor && i.setColorAt(o, this.cor(s)), this.xn[t] = o + 1);
  }
  cor(t) {
    let a = this.cores.get(t);
    return a || (a = new Qt(t), this.cores.set(t, a)), a;
  }
  /** a ferramenta na mão: as de sempre têm uma vaga por pessoa; as armas do M3 são peças à parte */
  tool(t, a, s) {
    po.includes(a) ? this.hm[a].setMatrixAt(t, s) : this.put(a, s);
  }
  look(t, a) {
    const s = Oa(a * 7 + 1), i = Oa(a * 13 + 5), o = t.owner[a], n = o >= 0 && o < t.players.length ? t.players[o].era : 0, r = o === ze ? "#4f6b4a" : t.players[o]?.color ?? "#888", l = Z[t.kind[a]].key, c = he(Wn, s), d = he(Gn, i), h = he(Dd, i), f = he(Vn, s), u = { skin: c, hair: d, tunic: h, skirt: r, legs: c, arms: c, weapon: null, shield: null, bigHair: !1, sc: 0.95 + s * 0.08, team: r };
    switch (l) {
      case "villager":
        return { ...u, tunic: n >= 3 ? he(Ld, i) : n ? f : h, arms: n ? c : h };
      case "warrior":
        return { ...u, tunic: r, skirt: h, weapon: "club", sc: 1.02 };
      case "axeman":
        return { ...u, tunic: r, skirt: f, weapon: "axe", sc: 1.04 };
      case "hunter":
        return { ...u, weapon: "spear" };
      case "archer":
        return { ...u, tunic: r, skirt: f, weapon: "bow" };
      case "spearman":
        return { ...u, tunic: r, skirt: f, weapon: "spear", shield: n >= 2 ? xe : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...u, tunic: r, skirt: f, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...u, tunic: f, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...u, tunic: r, skirt: f, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...u, tunic: he(["#4f6b4a", "#6b5a3a", "#3f5a6a"], s), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: he(["#3f6a4a", "#8a6a3a"], i), hair: he(["#c48a4a", "#8a5a2a", "#d9a35f"], s), bigHair: !0, sc: 1.05 };
      // ── M3 ──
      // hoplita (Reino): lança longa, escudo redondo grande de bronze com o emblema do time, capacete de bronze com crista
      // de crina na cor do time e caneleiras de bronze
      case "hoplite":
        return { ...u, tunic: r, skirt: f, weapon: "hasta", shield: xe, shieldKind: "aspis", helmet: !0, sc: 1.05, extras: [["crest", "head", r], ["greave", "legs"]] };
      // eques: cavaleiro romano com lança, escudinho redondo (parma) e capacete com crista preta
      case "eques":
        return { ...u, tunic: r, skirt: f, weapon: "spear", shield: "#8a6a44", shieldKind: "parma", helmet: !0, sc: 1, extras: [["crest", "head", "#2b2422"]] };
      // hastado (República): escudo comprido e curvo na cor do time, gládio, capacete Montefortino com três penas e o
      // peitoral quadrado de bronze
      case "hastatus":
        return { ...u, tunic: r, skirt: f, weapon: "gladius", shield: r, shieldKind: "scutum", helmet: !0, sc: 1.04, extras: [["plumes", "head"], ["pectoral", "torso"]] };
      // triário: o veterano de cota de malha, com o escudo comprido, a lança longa e o capacete com crista
      case "triarius":
        return { ...u, tunic: "#9a9ea4", skirt: r, weapon: "hasta", shield: r, shieldKind: "scutum", helmet: !0, sc: 1.06, extras: [["mail", "torso"], ["knob", "head"], ["crest", "head", "#2b2422"]] };
      // vélite: tropa leve com a pele de lobo na cabeça, escudinho redondo e dardos
      case "velite":
        return { ...u, tunic: r, skirt: f, weapon: "javelin", shield: "#8a6a44", shieldKind: "parma", cap: "#77706a", sc: 0.98, extras: [["wolfhood", "head"]] };
      // gaulês (bárbaro do Reino em diante): espada longa, escudo oval pintado, torque de ouro, cabelo grande e bigode
      case "gaul": {
        const m = he(["#c48a4a", "#d9a35f", "#a8733a", "#e0b870"], s);
        return { ...u, tunic: he(["#3f6a4a", "#6a3f3a", "#3f5a7a", "#7a6a3a"], i), skirt: "#5a4d3c", legs: he(["#7a5a3a", "#6a4a3a", "#7a6248"], s), weapon: "longsword", shield: he(["#4f7a5a", "#9a5a3a", "#5a6a8a", "#a08048"], i), shieldKind: "oval", hair: m, bigHair: !0, sc: 1.07, extras: [["torque", "torso"], ["mustache", "head", m]] };
      }
    }
    return u;
  }
  colorHuman(t, a) {
    const s = this.hm, i = this.c;
    s.leg.setColorAt(t * 2, i.set(a.legs)), s.leg.setColorAt(t * 2 + 1, i), s.skirt.setColorAt(t, i.set(a.skirt)), s.torso.setColorAt(t, i.set(a.tunic)), s.arm.setColorAt(t * 2, i.set(a.arms)), s.arm.setColorAt(t * 2 + 1, i), s.head.setColorAt(t, i.set(a.skin)), s.hair.setColorAt(t, i.set(a.cap ?? (a.helmet ? xe : a.hair))), s.shield.setColorAt(t, i.set(a.shield ?? "#888"));
    for (const o in s) s[o].instanceColor && (s[o].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, a) {
    const s = t.kind[a] === Tt ? t.sub[a] : t.kind[a];
    return Z[s]?.key ?? "deer";
  }
  update(t, a, s, i, o, n, r, l) {
    const c = t.size, d = t.vis[o], h = this.hm, f = this.am, u = this.rm;
    let m = 0, v = 0, y = 0, M = 0, k = 0;
    for (const x in this.xn) this.xn[x] = 0;
    this.quadro++;
    for (let x = 0; x < t.top; x++) {
      if (!t.alive[x]) continue;
      const z = t.kind[x];
      if (z >= ut) {
        const N = ct[z - ut], K = t.x[x] / 256, it = t.z[x] / 256;
        if (n && t.owner[x] !== o && !d[Math.floor(it) * c + Math.floor(K)]) continue;
        const q = zt(t.map, K, it), U = i.has(x);
        U && y < this.maxH && this.ring.setMatrixAt(y++, p(K, q + 0.08, it, 0, N.size * 0.95, 1, N.size * 0.95)), (U || t.hp[x] < N.hp) && M < 400 && this.bar(M++, K, q + (N.estrada ? 0.7 : 2.3), it, t.hp[x] / N.hp, N.size * 0.6, l);
        continue;
      }
      const A = (t.px[x] + (t.x[x] - t.px[x]) * a) / 256, T = (t.pz[x] + (t.z[x] - t.pz[x]) * a) / 256;
      if (n && t.owner[x] !== o) {
        const N = Math.floor(A), K = Math.floor(T);
        if (N < 0 || K < 0 || N >= c || K >= c || !d[K * c + N]) continue;
      }
      const C = t.x[x] - t.px[x], I = t.z[x] - t.pz[x], S = (C !== 0 || I !== 0) && t.state[x] === se, O = zt(t.map, A, T);
      let B = this.heading[x];
      if (S) B = Math.atan2(C, I);
      else if (z !== Tt && (t.task[x] === Gt || t.task[x] === Ae || t.task[x] === Wt) && t.tgt[x] >= 0) {
        const N = t.tgt[x];
        let K, it;
        t.task[x] === Gt && t.tgtTile[x] ? (K = N % c + 0.5, it = Math.floor(N / c) + 0.5) : (K = t.x[N] / 256, it = t.z[N] / 256), Math.abs(K - A) + Math.abs(it - T) > 0.05 && (B = Math.atan2(K - A, it - T));
      }
      const H = this.heading[x];
      this.heading[x] = H + Math.atan2(Math.sin(B - H), Math.cos(B - H)) * Math.min(1, s * 10);
      const $ = this.heading[x], P = Math.hypot(C, I) / 256 * 10, w = z === Tt ? "" : Z[z].key, D = z === Tt || t.owner[x] === It || w === "dog";
      if (w === "ram") {
        if (k >= this.maxR) continue;
        this.phase[x] += S ? s * P / 0.22 : 0, this.slotR[k] !== x * 8 + t.owner[x] + 1 && (this.slotR[k] = x * 8 + t.owner[x] + 1, u.cloth.setColorAt(k, this.c.set(t.players[t.owner[x]]?.color ?? "#888")), u.cloth.instanceColor && (u.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, x, k, A, O, T, $, a), k++;
      } else if (Os.has(w)) {
        if (v >= this.maxA || m >= this.maxH) continue;
        const N = Qe.horse, K = P > 1.1;
        this.phase[x] += S ? s * P * 2.6 / N.leg : 0;
        const it = x * 64 + z;
        if (this.slotA[v] !== it) {
          this.slotA[v] = it;
          const J = this.c.set(he(N.color, Oa(x)));
          for (const X of ["body", "neck", "head", "ears", "tail"]) f[X].setColorAt(v, J);
          for (let X = 0; X < 4; X++) f.leg.setColorAt(v * 4 + X, J);
          f.collar.setColorAt(v, this.c.set(t.players[t.owner[x]]?.color ?? "#888"));
          for (const X in f) f[X].instanceColor && (f[X].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(v, N, A, O, T, $, S, this.phase[x], r, !1, K, !1, 1, !1, 0, 0, !0, !0), v++;
        const q = t.owner[x], U = `${z}:${q}:${q >= 0 && q < t.players.length ? t.players[q].era : 0}`, at = this.look(t, x);
        (this.slotH[m] !== x || this.lookKey[m] !== U) && (this.slotH[m] = x, this.lookKey[m] = U, this.colorHuman(m, at));
        const et = S ? Math.abs(Math.cos(this.phase[x])) * (K ? 0.06 : 0.025) : 0;
        if (S && K) {
          const J = this.phase[x] / Math.PI % 2;
          J < this.lastP[x] && _e.emit("animal.hooves", A, T, 0.5), this.lastP[x] = J;
        }
        this.poseHuman(t, x, m, at, A, O, T, $, S, r, a, S0 + et - 0.44 * at.sc), m++;
      } else if (w === "scorpio" || w === "ballista") {
        if (m >= this.maxH) continue;
        this.phase[x] += S ? s * P / (w === "ballista" ? 0.26 : 0.2) : 0, this.poseMachine(t, x, m, w === "ballista", A, O, T, $, S, r, a), m++;
      } else if (D) {
        if (v >= this.maxA) continue;
        const N = this.speciesOf(t, x), K = Qe[N] ?? Qe.deer;
        this.phase[x] += S ? s * P * 2.6 / K.leg : 0;
        const it = x * 64 + z;
        if (this.slotA[v] !== it) {
          this.slotA[v] = it;
          const X = this.c.set(he(K.color, Oa(x)));
          z === Tt && X.multiplyScalar(0.8);
          for (const V of ["body", "neck", "head", "ears", "tail"]) f[V].setColorAt(v, X);
          for (let V = 0; V < 4; V++) f.leg.setColorAt(v * 4 + V, X);
          f.collar.setColorAt(v, this.c.set(t.players[t.owner[x]]?.color ?? "#888"));
          for (const V in f) f[V].instanceColor && (f[V].instanceColor.needsUpdate = !0);
        }
        const q = z !== Tt && t.task[x] === Wt && !S;
        let U = 0, at = 0, et = 0;
        const J = z === Tt ? 1 : 1 + (N === "aurochs" ? 0.1 : 0);
        if (q) {
          const X = 1 - Math.max(0, Math.min(1, (t.cd[x] - a) / Z[z].cd));
          U = X > 0.8 ? (X - 0.8) / 0.2 : X < 0.2 ? 1 - X / 0.2 : 0;
          const V = t.tgt[x];
          if (V >= 0 && t.alive[V]) {
            const Vt = Math.hypot(t.x[V] - t.x[x], t.z[V] - t.z[x]) / 256, te = K.body[2] * 0.5 + K.neck * 0.3 + K.head[2] * 0.85, Rt = t.kind[V] < Tt ? Z[t.kind[V]].radius : 0.5;
            t.kind[V] >= ut && ct[t.kind[V] - ut].wall ? at = Math.max(0, Math.min(0.5, this.frenteMuro(t, x, V, A, T, $).d - te)) : at = Math.max(0, Math.min(K.body[2] * 0.3, Vt - te - Rt * 0.95));
            const bt = this.escudoNaFrente(V, A, O + (K.leg + K.body[1] * 0.8) * J, T, $);
            bt !== null && (et = Math.min(0, bt - te * J) / J, at = Math.max(0, Math.min(at, (bt - te * J) / J)));
          }
        }
        q && t.cd[x] > this.lastCd[x] && _e.emit(N === "boar" ? "hit.boar" : N === "aurochs" ? "hit.aurochs" : "hit.bite", A, T), this.lastCd[x] = z === Tt ? 0 : t.cd[x], this.poseAnimal(v, K, A, O, T, $, S, this.phase[x], r, z === Tt, t.fast[x] === 1, N === "deer" && Oa(x * 3) < 0.5, J, q, U, at, t.owner[x] >= 0 && z !== Tt, !1, et), v++;
      } else {
        if (m >= this.maxH) continue;
        this.phase[x] += S ? s * P * 7.2 : 0;
        const N = t.owner[x], K = `${z}:${N}:${N >= 0 && N < t.players.length ? t.players[N].era : 0}`, it = this.look(t, x);
        (this.slotH[m] !== x || this.lookKey[m] !== K) && (this.slotH[m] = x, this.lookKey[m] = K, this.colorHuman(m, it)), this.poseHuman(t, x, m, it, A, O, T, $, S, r, a), m++;
      }
      const j = Os.has(w), E = w === "ram" || w === "ballista" ? 1.9 : j ? 1.6 : w === "scorpio" ? 1.5 : D ? 1.2 : 1;
      i.has(x) && y < this.maxH && this.ring.setMatrixAt(y++, p(A, O + 0.06, T, 0, E, 1, E)), z !== Tt && (i.has(x) || t.hp[x] < Z[z].hp) && M < 400 && this.bar(M++, A, O + (j ? 2.6 : w === "ram" ? 1.75 : w === "ballista" ? 1.95 : w === "scorpio" ? 1.6 : D ? 1.3 : 1.55), T, t.hp[x] / Z[z].hp, w === "ram" || j || w === "ballista" || w === "scorpio" ? 0.9 : 0.7, l);
    }
    for (const x in h)
      h[x].count = m, h[x].instanceMatrix.needsUpdate = !0;
    h.leg.count = h.arm.count = m * 2;
    for (const x in f)
      f[x].count = v, f[x].instanceMatrix.needsUpdate = !0;
    f.leg.count = v * 4;
    for (const x in u)
      u[x].count = k, u[x].instanceMatrix.needsUpdate = !0;
    u.wheel.count = k * 4;
    for (const x in this.xm) {
      const z = this.xm[x], A = this.xn[x];
      z.count = A, z.visible = A > 0, A && (z.instanceMatrix.clearUpdateRanges(), z.instanceMatrix.addUpdateRange(0, A * 16), z.instanceMatrix.needsUpdate = !0, z.instanceColor && (z.instanceColor.clearUpdateRanges(), z.instanceColor.addUpdateRange(0, A * 3), z.instanceColor.needsUpdate = !0));
    }
    this.ring.count = y, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = M, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
  }
  bar(t, a, s, i, o, n, r) {
    o = Math.max(0, Math.min(1, o)), this.p.set(a, s, i), this.s.set(n, 1, 1), this.barBg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.v.set(-n / 2, 0, 0).applyQuaternion(r), this.p.set(a + this.v.x, s + this.v.y, i + this.v.z), this.s.set(n * o, 1, 1), this.barFg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.barFg.setColorAt(t, this.c.set(o > 0.6 ? "#6fe08a" : o > 0.3 ? "#f2c14e" : "#e0533c"));
  }
  /** mão direita ou esquerda (ponto no braço) em coordenadas do mundo, com a orientação do tronco e um giro em X */
  gripTorso(t, a, s, i, o = 0) {
    return this.v.set(0, -0.35, s).applyMatrix4(a), t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t, 0, 0, 0, i, o));
  }
  /** M3: guarda o escudo de e (a matriz dele tem a escala da pessoa) */
  guardaEscudo(t, a, s) {
    const i = s.elements, o = t * 16, n = this.ve, r = Math.hypot(i[0], i[1], i[2]) || 1, [l, c, d] = a === "aspis" ? [0.36, 0.36, 0.36] : a === "parma" ? [0.21, 0.21, 0.21] : a === "oval" ? [0.21, 0.38, 0.38] : a === "scutum" ? [0.25, 0.39, 0.39] : [0.24, 0.24, 0.24];
    n[o] = { round: 1, aspis: 2, parma: 3, scutum: 4, oval: 5 }[a], n[o + 1] = i[12], n[o + 2] = i[13], n[o + 3] = i[14];
    for (let h = 0; h < 3; h++)
      n[o + 4 + h] = i[h] / r, n[o + 7 + h] = i[4 + h] / r, n[o + 10 + h] = i[8 + h] / r;
    n[o + 13] = l * r, n[o + 14] = c * r, n[o + 15] = d * r;
  }
  /** M3: guarda o corpo e a cabeça de e (depois de body: a cabeça está em m.hd) */
  guardaCorpo(t, a, s, i, o, n) {
    const r = this.vb, l = this.vh, c = this.m.hd.elements, d = t * 5;
    r[d] = s, r[d + 1] = i, r[d + 2] = o, r[d + 3] = n, r[d + 4] = a.sc, l[d] = c[12], l[d + 1] = c[13], l[d + 2] = c[14], l[d + 3] = 0.15 * a.sc * (a.bigHair ? 1.18 : 1), l[d + 4] = a.extras?.some(([h]) => h === "crest" || h === "plumes" || h === "knob") ? 0.22 * a.sc : 0, this.vq[t] = this.quadro;
  }
  /** M3: o ponto (px, py, pz) está dentro da pessoa t (corpo, pernas, cabeça com a crista ou escudo)? f = folga */
  dentro(t, a, s, i, o) {
    const n = this.vb, r = this.vh, l = this.ve, c = t * 5, d = n[c + 4], h = n[c + 3], f = a - n[c], u = i - n[c + 2], m = (s - n[c + 1]) / d, v = (f * Math.cos(h) - u * Math.sin(h)) / d, y = (f * Math.sin(h) + u * Math.cos(h)) / d, M = o / d;
    if (Math.abs(v) < 0.27 + M && m > 0.3 && m < 0.92 + M && Math.abs(y) < 0.14 + M || Math.abs(v) < 0.2 + M && m > -0.1 && m <= 0.3 && Math.abs(y) < 0.13 + M) return !0;
    const k = a - r[c], x = s - r[c + 1], z = i - r[c + 2], A = r[c + 3] + o;
    if (k * k + x * x + z * z < A * A || r[c + 4] > 0 && x > 0 && x < r[c + 4] + o && k * k + z * z < (0.06 + o) ** 2) return !0;
    const T = t * 16, C = l[T];
    if (C) {
      const I = a - l[T + 1], S = s - l[T + 2], O = i - l[T + 3], B = I * l[T + 10] + S * l[T + 11] + O * l[T + 12];
      if (Math.abs(B) < 0.05 + o) {
        const H = I * l[T + 4] + S * l[T + 5] + O * l[T + 6], $ = I * l[T + 7] + S * l[T + 8] + O * l[T + 9], P = l[T + 13] + o;
        if (C === 4) {
          if (Math.abs(H) < P && $ < l[T + 14] + o && $ > -l[T + 15] - o) return !0;
        } else {
          const w = $ > 0 ? l[T + 14] + o : l[T + 15] + o;
          if ((H / P) ** 2 + ($ / w) ** 2 < 1) return !0;
        }
      }
    }
    return !1;
  }
  /** M3: o golpe do gládio ou da espada longa contra uma pessoa: até onde ele vai no caminho de GOLPE (0 = erguido, 1 = o
   *  fim) antes de a lâmina encostar nela (no escudo, no ombro, na cabeça ou na crista); null = não encosta (ou a pessoa não foi
   *  desenhada agora). Faz as contas com as mesmas matrizes do desenho, no instante da pancada (guardado por unidade) */
  bladeStop(t, a, s, i, o, n, r, l) {
    if (this.vq[a] < this.quadro - 1) return null;
    const c = this.vb, d = a * 5, h = a * 16, f = this.ve, u = `${a}|${Math.round(i * 40)}|${Math.round(n * 40)}|${Math.round(r * 40)}|${Math.round(c[d] * 40)}|${Math.round(c[d + 2] * 40)}|${Math.round(c[d + 3] * 20)}|${Math.round(f[h + 1] * 25)}|${Math.round(f[h + 2] * 25)}|${Math.round(f[h + 3] * 25)}`, m = this.lamina.get(t);
    if (m && m.k === u) return m.a;
    const v = this._s0, y = this._s1, M = this._s2, k = this._sp;
    this.trs(v, i, o, n, 0, r, 0, s.sc), v.multiply(this.trs(this.m.t, 0, 0.46, 0, 0.2));
    let x = null;
    for (let z = 0; z <= 1.0001 && x === null; z += 0.025) {
      y.multiplyMatrices(v, this.trs(this.m.t, -0.215, 0.38, 0, l.up + (l.end - l.up) * z, 0, -l.rz)), M.multiplyMatrices(y, this.trs(this.m.t, 0, -0.35, 0, Math.PI - 0.75 + l.wrist * z, l.spin));
      for (let A = 0.12; A <= l.L + 1e-6; A += 0.04)
        if (k.set(0, A, 0).applyMatrix4(M), this.dentro(a, k.x, k.y, k.z, 0.025)) {
          x = Math.max(0, z - 0.025);
          break;
        }
    }
    return this.lamina.set(t, { k: u, a: x }), this.lamina.size > 512 && this.lamina.clear(), x;
  }
  /** M3: a distância (do centro do bicho, andando na direção h) até a frente do escudo da pessoa t, se o escudo estiver
   *  virado para ele e no caminho do focinho (na altura py); null = sem escudo no caminho */
  escudoNaFrente(t, a, s, i, o) {
    if (this.vq[t] < this.quadro - 1) return null;
    const n = this.ve, r = t * 16;
    if (!n[r]) return null;
    const l = Math.sin(o), c = Math.cos(o), d = l * n[r + 10] + c * n[r + 12];
    if (d > -0.3) return null;
    const h = ((n[r + 1] - a) * n[r + 10] + (n[r + 2] - s) * n[r + 11] + (n[r + 3] - i) * n[r + 12]) / d;
    if (h < 0) return null;
    const f = a + l * h - n[r + 1], u = s - n[r + 2], m = i + c * h - n[r + 3], v = f * n[r + 4] + u * n[r + 5] + m * n[r + 6], y = f * n[r + 7] + u * n[r + 8] + m * n[r + 9];
    return Math.abs(v) > n[r + 13] + 0.1 || y > n[r + 14] + 0.12 || y < -n[r + 15] - 0.12 ? null : h - 0.06;
  }
  /** o corpo de uma pessoa (pernas, saia, tronco, braços, cabeça e cabelo) na pose dada; deixa prontas as matrizes do tronco,
   *  dos braços, da cabeça e das pernas (para o escudo, a ferramenta e as peças do M3) */
  body(t, a, s, i, o, n, r, l, c, d, h, f, u, m = 0, v = 0) {
    const y = this.hm, M = this.m;
    this.trs(M.b, s, i, o, 0, n, 0, a.sc), M.hip.multiplyMatrices(M.b, this.trs(M.t, 0, 0.46, 0)), M.tor.multiplyMatrices(M.hip, this.trs(M.t, 0, 0, 0, u)), y.torso.setMatrixAt(t, M.tor), y.leg.setMatrixAt(t * 2, M.lgL.multiplyMatrices(M.hip, this.trs(M.t, 0.09, 0, 0, r, 0, m))), y.leg.setMatrixAt(t * 2 + 1, M.lgR.multiplyMatrices(M.hip, this.trs(M.t, -0.09, 0, 0, l, 0, v))), y.skirt.setMatrixAt(t, M.l.multiplyMatrices(M.hip, this.trs(M.t, 0, 0.03, 0, u * 0.35))), M.al.multiplyMatrices(M.tor, this.trs(M.t, 0.215, 0.38, 0, c, 0, -h)), y.arm.setMatrixAt(t * 2, M.al), M.ar.multiplyMatrices(M.tor, this.trs(M.t, -0.215, 0.38, 0, d, 0, -f)), y.arm.setMatrixAt(t * 2 + 1, M.ar), M.hd.multiplyMatrices(M.tor, this.trs(M.t, 0, 0.53, 0, -u * 0.6)), y.head.setMatrixAt(t, M.hd), y.hair.setMatrixAt(t, M.l.multiplyMatrices(M.hd, this.trs(M.t, 0, 0.03, -0.012, 0, 0, 0, a.bigHair ? 1.18 : 1)));
  }
  /** mount > 0: montado (altura extra do quadril, em cima do cavalo) */
  poseHuman(t, a, s, i, o, n, r, l, c, d, h, f = 0) {
    const u = this.hm, m = this.m, v = this.phase[a], y = Math.sin(v), M = d + a * 0.37, k = f > 0;
    let x = 0, z = 0, A = 0.05 + Math.sin(M * 1.3) * 0.03, T = -0.05 - Math.sin(M * 1.3) * 0.03, C = 0.07, I = -0.07, S = 0, O = 0, B = 0, H = 0, $ = 0, P = 0;
    const w = vo(i.weapon), D = w === "spear" && i.weapon ? i.weapon : "spear";
    let j = i.weapon, E = w === "spear" ? "torso" : i.weapon === "bow" ? "left" : "arm", N = w === "spear" ? 0.12 : i.weapon === "bow" ? 0 : i.weapon === "sling" ? Math.PI - 0.12 : i.weapon === "longsword" ? Math.PI - 1 : w === "sword" ? Math.PI - 0.3 : 0.79, K = !1, it = 0, q = !1, U = i.weapon === "hasta" ? -0.55 : 0;
    const at = () => {
      I = -0.42, C = 0.42, A = T + 0.06;
    }, et = t.task[a];
    if (k && (c || et !== Wt || t.state[a] === se))
      A = -0.75, C = 0.1, T = -0.25, S = c ? 0.14 : 0.03;
    else if (c)
      x = y * 0.65, z = -y * 0.65, A = -y * 0.5, T = y * 0.5, O = Math.abs(Math.cos(v)) * 0.035;
    else if (et === Gt && t.phase[a] === x0) {
      const J = t.tgt[a], X = t.tgtTile[a] === 1, V = X && t.map.tree[J] > 0, Vt = X && t.resKind[J] === 1, te = !X && t.kind[J] >= ut, Rt = (bt, oe) => {
        const R = M / bt % 1;
        R < this.lastP[a] && _e.emit(oe, o, r), this.lastP[a] = R;
      };
      if (V)
        T = ns(M / 1 % 1, -2.75, -1.35), at(), S = 0.1 + rs(M / 1 % 1) * 0.12, j = "axe", E = "arm", N = Math.PI - 0.6, Rt(1, "work.chop");
      else if (X && !Vt)
        T = ns(M / 1.15 % 1, -2.8, -0.55), at(), S = 0.22 + rs(M / 1.15 % 1) * 0.14, j = "pick", E = "arm", N = Math.PI - 0.6, Rt(1.15, t.resKind[J] >= 3 ? "work.pickMetal" : "work.pick");
      else if (te)
        T = ns(M / 1.4 % 1, -1.95, -0.35), at(), S = 0.32 + rs(M / 1.4 % 1) * 0.1, j = "pick", E = "arm", N = Math.PI - 0.7, Rt(1.4, "work.hoe");
      else if (Vt) {
        const bt = Math.sin(M * 4.5);
        T = -0.95 + bt * 0.45, A = -0.95 - bt * 0.45, I = -0.2, C = 0.2, S = 0.5, j = null, Rt(1.4, "work.rustle");
      } else
        T = -0.55 + Math.sin(M * 7) * 0.3, A = -0.4, S = 0.68, j = null, Rt(1.6, "work.rustle");
    } else if (et === Ae && t.state[a] !== se) {
      const J = M / 0.75 % 1;
      T = ns(J, -2.3, -0.7), I = -0.15, A = -0.75, S = 0.15 + rs(J) * 0.08, j = "mallet", E = "arm", N = Math.PI - 0.75, J < this.lastP[a] && _e.emit("work.mallet", o, r), this.lastP[a] = J;
    } else if (et === Wt && t.state[a] !== se) {
      const J = Z[t.kind[a]], X = 1 - Math.max(0, Math.min(1, (t.cd[a] - h) / J.cd)), V = t.tgt[a], Vt = !!J.hunt && V >= 0 && t.owner[V] === It;
      if (t.cd[a] > this.lastCd[a] && !J.proj && !(Vt && V >= 0 && t.alive[V] && t.reach(a, V, !1) / 256 >= _o)) {
        const bt = V >= 0 && t.kind[V] >= ut;
        _e.emit(bt ? "hit.wall" : w === "sword" ? "hit.sword" : i.weapon === "axe" ? "hit.axe" : w === "spear" ? "hit.spear" : "hit.club", o, r);
      }
      const te = V >= 0 && t.alive[V] ? t.reach(a, V, !1) / 256 : 9, Rt = V >= 0 && t.alive[V] && t.kind[V] >= ut && ct[t.kind[V] - ut].wall ? this.frenteMuro(t, a, V, o, r, l) : null;
      if (J.proj === "arrow" || i.weapon === "bow")
        j = "bow", E = "left", N = 0, A = -1.5, C = 0.2, I = -0.3, S = -0.04, T = X < 0.2 ? -0.95 - X / 0.2 * 0.5 : -1.45, q = X >= 0.25;
      else if (J.proj === "stone")
        if (j = "sling", E = "arm", A = -0.55, C = 0.18, S = -0.03, X < 0.2) {
          const bt = X / 0.2;
          T = -0.75 - bt * 2.05, N = Math.PI / 2 + 0.7 - bt * 0.85;
        } else if (X < 0.85)
          T = -2.8, I = -0.18, N = Math.PI / 2 - 0.1, $ = M * 15;
        else {
          const bt = (X - 0.85) / 0.15;
          T = -2.8 + Fa(bt) * 2.05, N = Math.PI / 2 - 0.1 + bt * 0.8, S = -0.03 + bt * 0.12;
        }
      else if ((J.proj === "spear" || Vt) && te >= _o) {
        if (j = X < 0.3 ? null : D, E = "torso", N = Math.PI / 2 - 0.25, it = 0.1, A = -1, S = -0.05, X < 0.3)
          T = -1.25 + X / 0.3 * 1.05, S = 0.12 - X / 0.3 * 0.17;
        else if (X < 0.75) T = -0.2 - Fa((X - 0.3) / 0.45) * 2.55;
        else if (X < 0.9) T = -2.75;
        else {
          const oe = (X - 0.9) / 0.1;
          T = -2.75 + oe * oe * 1.5, S = -0.05 + oe * 0.17;
        }
        const bt = this.muroNaFrente(t, a, o, r, l);
        if (bt) {
          const oe = (0.84 - 0.35 * Math.cos(T)) * i.sc + f, R = 0.35 * Math.sin(-T) * i.sc, L = Math.atan2(bt.top + 0.25 - oe, Math.max(0.12, bt.d - R));
          L > 0.25 && (N = Math.PI / 2 - Math.min(1.35, L));
        }
      } else if (w === "spear" || J.proj === "spear" || Vt) {
        if (j = D, E = "torso", it = 0.05, A = i.shieldKind === "aspis" ? -0.55 : i.shield ? -0.9 : -0.5, C = 0.15, D === "hasta")
          if (X < 0.15) T = -2.3;
          else if (X < 0.85) T = -2.3 - Fa((X - 0.15) / 0.7) * 0.6;
          else {
            const W = (X - 0.85) / 0.15;
            T = -2.9 + W * W * 0.6;
          }
        else if (X < 0.15) T = -1.25;
        else if (X < 0.85) T = -1.25 + Fa((X - 0.15) / 0.7) * 0.9;
        else {
          const W = (X - 0.85) / 0.15;
          T = -0.35 - W * W * 0.9;
        }
        S = 0.06 + (X > 0.85 ? (X - 0.85) / 0.15 : X < 0.15 ? 1 - X / 0.15 : 0) * 0.12;
        let bt = te, oe = 0.72, R = V >= 0 ? Math.hypot(t.x[V] - t.x[a], t.z[V] - t.z[a]) / 256 : te;
        if (V >= 0 && this.recuo[V] > 0 && t.tgt[V] === a && (R += this.recuo[V], bt += this.recuo[V]), Rt)
          bt = Rt.d, R = Rt.d, oe = Math.min(0.72, Rt.top * 0.6);
        else if (V >= 0 && t.alive[V] && t.kind[V] < Tt) {
          const W = Qe[Z[t.kind[V]].key];
          if (oe = C0(t.kind[V]), W) {
            const Y = Math.cos(Math.atan2(t.x[a] - t.x[V], t.z[a] - t.z[V]) - this.heading[V]);
            bt = R - Math.max(W.body[0] * 0.55, W.body[2] * 0.5 * Math.abs(Y));
          } else {
            const Y = Z[t.kind[V]].radius;
            bt = R - (Y > 0.35 ? Y * 0.85 : 0.2);
          }
        }
        const L = 0.35 * Math.sin(-T), G = (0.84 - 0.35 * Math.cos(T)) * i.sc + f, F = Math.atan2(G - oe, Math.max(0.4, R - L));
        N = Math.PI / 2 + F, U = Math.max(0, L + (Wd[D] ?? 1.4) * Math.cos(F) - bt + 0.03);
      } else {
        j || (j = "club");
        const bt = V >= 0 && t.alive[V] ? t.kind[V] >= ut ? ct[t.kind[V] - ut].estrada ? 0.15 : 1 : Kd(t.kind[V]) : 0.6, oe = (j === "gladius" || j === "longsword") && !Rt && V >= 0 && t.alive[V] && t.kind[V] < Tt && !Os.has(Z[t.kind[V]].key) && this.vq[V] >= this.quadro - 1;
        if (oe) {
          const F = Math.hypot(t.x[V] - t.x[a], t.z[V] - t.z[a]) / 256, W = Math.max(0, Math.min(0.35, (j === "longsword" ? 1.15 : 1) - F));
          this.recuo[a] += (W - this.recuo[a]) * 0.25, K = !0, o -= Math.sin(l) * this.recuo[a], r -= Math.cos(l) * this.recuo[a];
        }
        const R = bt + (vo(j) === "sword" ? 0.18 : 0), L = j === "longsword" ? 0.72 : 0.5;
        let G = -0.6;
        for (; G > -2.2 && (0.84 - 0.35 * Math.cos(G) - L * Math.cos(G - 0.75)) * i.sc + f < R; ) G -= 0.05;
        if (Rt) {
          const F = (ft) => (0.84 - 0.35 * Math.cos(ft) - L * Math.cos(ft - 0.75)) * i.sc + f, W = (ft) => (0.35 * Math.sin(-ft) + L * Math.sin(0.75 - ft)) * i.sc + 0.06;
          P = Math.max(0, Math.min(0.5, Rt.d - 0.74 * i.sc));
          const Y = Rt.d - P;
          let dt = -2.6;
          for (; dt < -0.6 && !(W(dt) >= Y - 0.02 && (F(dt) <= Rt.top + 0.04 || W(dt) >= Y + Rt.esp)); ) dt += 0.04;
          G = dt;
        }
        if (E = "arm", N = Math.PI - 0.75, T = ns(X, -2.6, Math.max(-2.25, G)), I = -0.15, A = -0.5, S = 0.08 + rs(X) * 0.12, P) {
          const F = P * rs(X);
          o += Math.sin(l) * F, r += Math.cos(l) * F;
        }
        if (vo(j) === "sword" && ($ = 0.22), oe) {
          const F = Vd[j], W = this.bladeStop(a, V, i, o, n + f, r, l, F) ?? 1;
          T = ns(X, F.up, F.up + (F.end - F.up) * W), N = Math.PI - 0.75 + F.wrist * Math.max(0, Math.min(W, (T - F.up) / (F.end - F.up))), $ = F.spin, I = F.rz;
        }
      }
    }
    if (!K && this.recuo[a] > 0 && (this.recuo[a] = this.recuo[a] < 4e-3 ? 0 : this.recuo[a] * 0.75, o -= Math.sin(l) * this.recuo[a], r -= Math.cos(l) * this.recuo[a]), k && (x = z = -0.38, B = 0.5, H = -0.5), this.lastCd[a] = t.cd[a], this.lastCarry[a] > 0 && t.carry[a] === 0 && t.task[a] === Gt && _e.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal", "drop.metal"][t.carryRes[a]] ?? "drop.food", o, r), this.lastCarry[a] = t.carry[a], this.body(s, i, o, n + O + f, r, l, x, z, A, T, C, I, S, B, H), i.shield) {
      const J = i.shieldKind ?? "round", X = Gd[J] ?? [0.04, -0.24, 0.13];
      this.v.set(X[0], X[1], X[2]).applyMatrix4(m.al), m.l.copy(m.tor).setPosition(this.v), k && J !== "round" && m.l.multiply(this.trs(m.t, 0.05, 0, -0.08, 0, 0.9)), this.guardaEscudo(a, J, m.l), J === "round" ? u.shield.setMatrixAt(s, m.l) : (u.shield.setMatrixAt(s, Ee), J === "aspis" ? (this.put("aspis", m.l), this.put("emblem", m.l, i.team ?? "#888")) : J === "scutum" ? (this.put("scutum", m.l, i.shield), this.put("scutumTrim", m.l)) : J === "oval" ? this.put("oval", m.l, i.shield) : this.put(J, m.l));
    } else
      u.shield.setMatrixAt(s, Ee), this.ve[a * 16] = 0;
    this.guardaCorpo(a, i, o, n + O + f, r, l);
    for (const J of po) u[J].setMatrixAt(s, Ee);
    if (j && (E === "arm" ? this.tool(s, j, m.l.multiplyMatrices(m.ar, this.trs(m.t, 0, -0.35, 0, N, $))) : (this.gripTorso(m.l, E === "left" ? m.al : m.ar, E === "left" ? 0.02 : 0, N, E === "torso" ? it : 0), U && m.l.multiply(this.trs(m.t, 0, -U, 0)), this.tool(s, j, m.l))), i.extras) for (const [J, X, V] of i.extras)
      X === "legs" ? (this.put(J, m.lgL), this.put(J, m.lgR)) : this.put(J, X === "head" ? m.hd : m.tor, V);
    q && u.arrow.setMatrixAt(s, this.gripTorso(m.l, m.al, 0.02, Math.PI / 2, -0.12)), t.carry[a] > 0 && t.carryRes[a] === 4 ? (u.carry.setMatrixAt(s, Ee), this.put("prataCarga", m.l.multiplyMatrices(m.tor, this.trs(m.t, 0, 0.2, -0.19)))) : t.carry[a] > 0 ? (u.carry.setMatrixAt(s, m.l.multiplyMatrices(m.tor, this.trs(m.t, 0, 0.2, -0.19))), u.carry.setColorAt(s, this.c.set(Fd[t.carryRes[a]] ?? "#888")), u.carry.instanceColor && (u.carry.instanceColor.needsUpdate = !0)) : u.carry.setMatrixAt(s, Ee);
  }
  poseAnimal(t, a, s, i, o, n, r, l, c, d, h, f, u, m = !1, v = 0, y = 0, M = !1, k = !1, x = 0) {
    const z = this.am, A = this.m, [T, C, I] = a.body, [S, O, B] = a.head, H = a.leg + C * 0.5, $ = r ? Math.sin(l) * (h ? 0.8 : 0.45) : 0, P = r ? Math.abs(Math.cos(l)) * (h ? 0.06 : 0.025) : 0;
    d ? this.trs(A.b, s, i + T * 0.5 - H * 0, o, 0, n, Math.PI / 2, u) : this.trs(A.b, s, i + P, o, 0, n, 0, u), d && A.b.multiply(this.trs(A.t, 0, -H + T * 0.1, 0)), x && A.b.multiply(this.trs(A.t, 0, 0, x)), v > 0 && A.b.multiply(this.trs(A.t, 0, 0, y * v, 0.1 * v)), z.body.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, H, 0, 0, 0, 0, T, C, I))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([N, K], it) => z.leg.setMatrixAt(t * 4 + it, A.l.multiplyMatrices(A.b, this.trs(A.t, N * T * 0.32, a.leg, K * I * 0.36, N * K > 0 ? $ : -$, 0, 0, a.legW, a.leg, a.legW))));
    const w = d ? 0.2 : k ? h ? 0.22 : r ? 0.08 : 0.12 + Math.sin(c * 1.3 + s) * 0.04 : m ? 0.05 + v * 0.55 : r ? h ? 0.15 : -0.3 : 0.9 + Math.sin(c * 1.7 + s) * 0.08;
    A.hd.multiplyMatrices(A.b, this.trs(A.t, 0, H + C * 0.3, I * 0.46, w));
    const D = a.neckTilt ?? 0.29, j = a.neckW ?? 0.72;
    z.neck.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, -0.04, 0, D, 0, 0, S * j, a.neck * 1.05 + 0.1, O * j))), k ? z.collar.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, H + C * 0.5 - 0.17, -I * 0.04, 0, 0, 0, T * 1.14, 0.22, I * 0.4))) : z.collar.setMatrixAt(t, M ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, a.neck * 0.45, a.neck * 0.13, 0.29, 0, 0, S * 0.9, 0.06, O * 0.9)) : Ee), A.hd.multiply(this.trs(A.t, 0, a.neck * Math.cos(D) / Math.cos(0.29), a.neck * Math.sin(D) * (0.3 / Math.sin(0.29)) + B * 0.3, -w * 0.6 + (a.headTilt ?? 0))), z.head.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, 0, 0, 0, 0, 0, S, O, B)));
    const E = Math.min(S / 0.15, 1.35);
    z.ears.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, O * 0.5, -B * 0.2, -(a.headTilt ?? 0) * 0.85, 0, 0, E, E, E))), z.antlers.setMatrixAt(t, f && a.antl ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, O * 0.45, -B * 0.12)) : Ee), z.horns.setMatrixAt(t, a.horns ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, O * 0.35, B * 0.02)) : Ee), z.tusks.setMatrixAt(t, a.tusks ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, -O * 0.25, B * 0.72, -0.6)) : Ee), z.tail.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, H + C * 0.32, -I * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(c * 3 + s) * 0.06), 0, 0, a.tail[0], a.tail[1], a.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, a, s, i, o, n, r, l) {
    const c = this.rm, d = this.m, h = this.phase[a];
    t.task[a] === Wt && t.cd[a] > this.lastCd[a] && _e.emit("ram.boom", i, n), this.lastCd[a] = t.cd[a];
    {
      const v = h / Math.PI % 2;
      v < this.lastP[a] && _e.emit("ram.creak", i, n, 0.7), this.lastP[a] = v;
    }
    this.trs(d.b, i, o, n, 0, r, 0), c.body.setMatrixAt(s, d.b), c.cloth.setMatrixAt(s, d.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([v, y], M) => c.wheel.setMatrixAt(s * 4 + M, d.l.multiplyMatrices(d.b, this.trs(d.t, v * 0.5, 0.22, y * 0.55, h))));
    let f = 0;
    if (t.task[a] === Wt && t.state[a] !== se) {
      const v = 1 - Math.max(0, Math.min(1, (t.cd[a] - l) / Z[t.kind[a]].cd));
      f = v < 0.15 ? 0.06 * (1 - v / 0.15) : v < 0.85 ? Fa((v - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((v - 0.85) / 0.15) ** 2);
    }
    let u = 0;
    const m = t.tgt[a];
    if (t.task[a] === Wt && m >= 0 && t.alive[m] && t.kind[m] >= ut) {
      const v = br(t, m, i, n, Math.sin(r), Math.cos(r), 0.62);
      v !== null && (u = Math.max(0, Math.min(0.9, v - 1.33)));
    }
    c.log.setMatrixAt(s, d.l.multiplyMatrices(d.b, this.trs(d.t, 0, 0.62, 0.05 + u - f)));
  }
  /** escorpião e balista (M3): as rodas giram andando; atacando, a manivela puxa os braços para trás devagar (o operador gira a
   *  manivela) e o virote ou a pedra aparece na calha; no disparo, os braços voltam de uma vez. Parada sem alvo: armada */
  poseMachine(t, a, s, i, o, n, r, l, c, d, h) {
    const f = this.m, u = i ? "b" : "s", m = t.players[t.owner[a]]?.color ?? "#888", v = t.task[a] === Wt && t.state[a] !== se, y = v ? 1 - Math.max(0, Math.min(1, (t.cd[a] - h) / Z[t.kind[a]].cd)) : 1, M = c ? 0.3 : y < 0.1 ? 0 : y < 0.85 ? Fa((y - 0.1) / 0.75) : 1, k = !c && y >= 0.3;
    this.lastCd[a] = t.cd[a], this.trs(f.b, o, n, r, 0, l, 0), this.put(u + "Body", f.b), this.put(u + "Plate", f.b, m);
    const x = i ? [[0.52, 0.26, 0.55], [-0.52, 0.26, 0.55], [0.52, 0.26, -0.55], [-0.52, 0.26, -0.55]] : [[0.34, 0.2, -0.32], [-0.34, 0.2, -0.32]];
    for (const [B, H, $] of x) this.put(u + "Wheel", f.l.multiplyMatrices(f.b, this.trs(f.t, B, H, $, this.phase[a])));
    const z = i ? { px: 0.335, py: 1.11, pz: 0.62, L: 0.5, back: 0.55 } : { px: 0.165, py: 0.87, pz: 0.22, L: 0.3, back: 0.36 }, A = -0.12 + M * 0.82, T = Math.cos(A), C = Math.sin(A);
    this.put(u + "Arm", f.l.multiplyMatrices(f.b, this.trs(f.t, z.px, z.py, z.pz, 0, A))), this.put(u + "Arm", f.l.multiplyMatrices(f.b, this.trs(f.t, -z.px, z.py, z.pz, 0, Math.PI - A)));
    const I = z.px + z.L * T, S = z.pz - z.L * C, O = S - 0.02 - z.back * M;
    for (const B of [-1, 1]) this.put(u + "String", this.cord(B * I, z.py, S, 0, z.py, O));
    k && this.put(i ? "bStone" : "sBolt", f.l.multiplyMatrices(f.b, this.trs(f.t, 0, i ? z.py + 0.06 : z.py, O + (i ? 0.42 : 0.72)))), this.crew(t, a, s, o, r, l, i ? -1.1 : -0.8, i ? -1.8 : -1.55, c, v && y < 0.85, d);
  }
  /** corda esticada de a até b (no espaço da máquina, m.b) */
  cord(t, a, s, i, o, n) {
    this._d.set(i - t, o - a, n - s);
    const r = this._d.length() || 1e-3;
    return this._d.divideScalar(r), this._cq.setFromUnitVectors(this._za, this._d), this._cp.set(t, a, s), this._cs.set(1, 1, r), this.m.l.multiplyMatrices(this.m.b, this.m.t.compose(this._cp, this._cq, this._cs));
  }
  /** o operador da máquina: em pé atrás dela (dz, no espaço da máquina), virado para a frente, com capacete e a túnica do time.
   *  Andando, empurra; na carga, gira a manivela (os braços em volta de ang); esperando, fica com a mão na manivela */
  crew(t, a, s, i, o, n, r, l, c, d, h) {
    const f = t.owner[a], u = t.players[f]?.color ?? "#888", m = Oa(a * 7 + 1), v = Oa(a * 13 + 5), y = he(Wn, m), M = { skin: y, hair: he(Gn, v), tunic: u, skirt: he(Vn, m), legs: y, arms: y, weapon: null, shield: null, bigHair: !1, sc: 1, helmet: !0, team: u }, k = "crew:" + f;
    (this.slotH[s] !== a + 8192 || this.lookKey[s] !== k) && (this.slotH[s] = a + 8192, this.lookKey[s] = k, this.colorHuman(s, M));
    const x = i + Math.sin(n) * r, z = o + Math.cos(n) * r, A = h * 6 + a;
    let T = 0, C = 0, I = l + 0.5, S = l, O = 0.08;
    if (c) {
      const H = Math.sin(A * 1.4);
      T = H * 0.55, C = -H * 0.55, I = S = -1.3, O = 0.22;
    } else if (d) {
      const H = Math.sin(A);
      S = l + H * 0.3, I = l - H * 0.3, O = 0.16;
    }
    this.body(s, M, x, zt(t.map, x, z), z, n, T, C, I, S, 0.1, -0.1, O);
    const B = this.hm;
    B.shield.setMatrixAt(s, Ee), B.carry.setMatrixAt(s, Ee);
    for (const H of po) B[H].setMatrixAt(s, Ee);
  }
}
const qt = "#6e4f37", ce = "#8a6545", yo = "#a0754c", Ra = "#c9a75e", ls = "#b8954f", ui = "#cdb48a", jo = "#9b968c", Qn = "#b98b62", Be = "#b5813e", Ps = "#8a857c", fi = "#a7a196";
function pi(e, t, a, s, i, o, n) {
  const r = n() * me;
  e.add("cone7", o, p(t, 0, a, r, s * 2, i, s * 2));
  for (let l = 0; l < 3; l++) {
    const c = l * me / 3 + r;
    e.add("cyl5", qt, p(t + Math.cos(c) * 0.08, i - 0.3, a + Math.sin(c) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(c) * 0.3, Math.cos(c) * 0.3));
  }
  e.add("box", "#3b2b1f", p(t + Math.sin(r) * s * 0.95, 0, a + Math.cos(r) * s * 0.95, r, 0.36, i * 0.4, 0.05, -Math.atan2(s, i)));
}
function tr(e, t, a, s, i, o, n, r, l, c = 0) {
  e.add("cyl8", r, p(t, 0, a, c, s * 2, o, i * 2)), e.add("cone7", l, p(t, o - 0.06, a, c, s * 2 + 0.44, n, i * 2 + 0.44));
  const d = o - 0.06 + n * 0.86, h = Math.sin(c), f = Math.cos(c), u = Math.cos(c), m = -Math.sin(c);
  for (const v of [-1, 1]) e.add("cyl5", qt, p(t + u * v * 0.05, d, a + m * v * 0.05, c, 0.045, 0.42, 0.045, 0, v * 0.62));
  e.add("box", "#3a2a1e", p(t + h * i * 0.94, 0, a + f * i * 0.94, c, 0.42, o * 0.8, 0.08));
}
function xo(e, t, a, s, i, o, n, r) {
  const l = Math.cos(n), c = -Math.sin(n), d = Math.sin(n), h = Math.cos(n);
  for (const [f, u] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", qt, p(t + l * f * s / 2 + d * u * i / 2, 0, a + c * f * s / 2 + h * u * i / 2, 0, 0.07, u > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", o, p(t, 1.24, a, n, s + 0.2, 0.05, i + 0.3, 0.18)), e.add("box", ce, p(t + d * i * 0.3, 0, a + h * i * 0.3, n, s * 0.9, 0.55, 0.32)), r.forEach((f, u) => e.add(u % 2 ? "ico" : "cyl8", f, p(t + d * i * 0.3 + l * (u - (r.length - 1) / 2) * 0.24, 0.55, a + h * i * 0.3 + c * (u - (r.length - 1) / 2) * 0.24, 0, 0.17, u % 2 ? 0.17 : 0.2, 0.17)));
}
function Yd(e, t, a, s, i) {
  const o = Math.sin(s), n = Math.cos(s), r = Math.cos(s), l = -Math.sin(s);
  e.add("box", i, p(t, 0.78, a, s, 0.34, 0.42, 1));
  for (const [c, d] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", i, p(t + r * c * 0.12 + o * d * 0.36, 0, a + l * c * 0.12 + n * d * 0.36, s, 0.09, 0.8, 0.09));
  e.add("box", i, p(t + o * 0.52, 1, a + n * 0.52, s, 0.16, 0.5, 0.2, 0.5)), e.add("box", i, p(t + o * 0.72, 1.34, a + n * 0.72, s, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", p(t + o * 0.5, 1.1, a + n * 0.5, s, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", p(t - o * 0.52, 0.55, a - n * 0.52, s, 0.07, 0.42, 0.07, -0.25));
}
function er(e, t, a, s, i, o, n = 0) {
  e.add("cyl8", "#6b4a2f", p(t, a + i * Math.cos(n), s, o, i * 2, 0.08, i * 2, 0, Math.PI / 2 + n));
}
function mi(e, t, a, s = 1) {
  for (let i = 0; i < 9; i++) {
    const o = i / 9 * me;
    e.add("dode", "#8a857c", p(t + Math.cos(o) * 0.5 * s, 0.05, a + Math.sin(o) * 0.5 * s, o, 0.24 * s, 0.18 * s, 0.24 * s));
  }
  e.add("cyl5", "#4a3526", p(t, 0.08, a, 0.3, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", p(t, 0.1, a, 1.9, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0));
}
function gi(e, t, a, s, i, o, n, r, l, c = 0, d = 0) {
  e.add("box", r, p(t, d, a, c, s, o, i)), e.add("prism", l, p(t, d + o - 0.04, a, c, s + 0.4, n, i + 0.36)), e.add("box", "#3a2a1e", p(t + Math.sin(c) * (i / 2 + 0.01), d, a + Math.cos(c) * (i / 2 + 0.01), c, Math.min(0.5, s * 0.3), o * 0.72, 0.06));
}
function ar(e, t, a, s) {
  for (let i = 0; i < a; i++) {
    const o = i / a * me;
    e.add("box", jo, p(Math.cos(o) * t, 0, Math.sin(o) * t, o, 0.3, s * (0.8 + i % 3 * 0.15), 0.22));
  }
}
function Jd(e, t) {
  const a = Math.round(t * 4);
  for (let s = 0; s <= a; s++) {
    const i = -t + s * 2 * t / a;
    for (const [o, n] of [[i, -t], [i, t], [-t, i], [t, i]]) e.add("cyl5", qt, p(o, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const s of [0.25, 0.48])
    e.add("box", ce, p(0, s, -t, 0, t * 2, 0.05, 0.05)), e.add("box", ce, p(0, s, t, 0, t * 2, 0.05, 0.05)), e.add("box", ce, p(-t, s, 0, 0, 0.05, 0.05, t * 2)), e.add("box", ce, p(t, s, 0, 0, 0.05, 0.05, t * 2));
}
function Mo(e, t, a, s) {
  e.add("ico", "#ece6d6", p(t, 0.32, a, s, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", p(t + Math.sin(s) * 0.32, 0.36, a + Math.cos(s) * 0.32, s, 0.13, 0.16, 0.2));
  for (const [i, o] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", p(t + i, 0, a + o, s, 0.05, 0.2, 0.05));
}
const Ms = "#b4532f", ha = "#94402a", Fs = "#ede6d7", Ls = "#ddd2bd", _s = "#d3ae79", Ta = "#b9673e", la = "#c9b98e", Zd = "#b9a87e", Qa = "#d6c9a2", Qd = "#6c624e", th = "#b3ac9d", eh = "#a59e8f", hs = "#e0dacb", Ci = "#d0c9b8", ca = "#f4f0e7", ah = "#b06a40", sh = "#d8c69a", sr = "#dfe3e8", ir = "#6f7276", Ho = "#4c9cc0", Te = "#33261c", ta = (e, t, a) => [e * Math.cos(a) + t * Math.sin(a), -e * Math.sin(a) + t * Math.cos(a)], ih = (e, t, a, s, i, o, n, r = 0.03) => e.poly(t, [[a, n, s], [i, n, s], [i, n, o], [a, n, o]], r);
function ea(e, t, a, s, i, o, n, r = 0, l = Ms) {
  e.add("prism", l, p(t, a, s, r, i, o, n), 0.03);
  const c = Math.max(3, Math.round(n / 0.2)), d = Math.hypot(i / 2, o), h = Math.atan2(o, i / 2);
  for (const f of [-1, 1]) for (let u = 0; u < c; u++) {
    const [m, v] = ta(f * i / 4, -n / 2 + (u + 0.5) * n / c, r);
    e.add("box", ha, p(t + m, a + o / 2, s + v, r, d * 0.97, 0.03, 0.05, 0, -f * h), 0.04);
  }
  e.add("box", ha, p(t, a + o - 0.035, s, r, 0.09, 0.07, n), 0.03);
}
function mn(e, t, a, s, i, o, n, r, l) {
  const [c, d] = ta(0, n / 2 + 0.013, r);
  e.add("prism", l, p(t + c, a + 0.035, s + d, r, i * 0.84, o * 0.82, 0.026), 0.02);
}
function or(e, t, a, s) {
  e.add("cone4", Ms, p(0, t, 0, Math.PI / 4, a, s, a), 0.03);
  const i = Math.hypot(a / 2, s), o = Math.atan2(a / 2, s);
  for (let n = 0; n < 4; n++) {
    const r = n * Math.PI / 2 + Math.PI / 4;
    e.add("box", ha, p(0, t + s, 0, r, 0.07, i, 0.07, Math.PI - o), 0.03);
  }
  e.add("cone4", Ta, p(0, t + s - 0.04, 0, Math.PI / 4, 0.14, 0.2, 0.14), 0.03);
}
function $a(e, t, a, s, i, o, n, r = n, l = !1) {
  if (e.add("box", r, p(t, a, s, 0, o * 2.7, 0.05, o * 2.7), 0.02), e.add("cyl8", n, p(t, a + 0.05, s, 0, o * 2, i - 0.12, o * 2), 0.02), e.add("box", r, p(t, a + i - 0.075, s, Math.PI / 4, o * 2.1, 0.04, o * 2.1), 0.02), e.add("box", r, p(t, a + i - 0.04, s, 0, o * 2.9, 0.04, o * 2.9), 0.02), l) for (const c of [-1, 1]) e.add("cyl8", r, p(t + c * o * 1.3, a + i - 0.095, s - o * 1.3, 0, 0.075, o * 2.6, 0.075, Math.PI / 2), 0.02);
}
function w0(e, t, a, s = 1, i = ah) {
  e.add("ico", i, p(t, 0.2 * s, a, 0, 0.19 * s, 0.34 * s, 0.19 * s), 0.08), e.add("cyl5", i, p(t, 0.34 * s, a, 0, 0.065 * s, 0.13 * s, 0.065 * s), 0.08), e.add("cyl8", i, p(t, 0.46 * s, a, 0, 0.09 * s, 0.025 * s, 0.09 * s), 0.08);
  for (const o of [-1, 1]) e.add("box", i, p(t + o * 0.055 * s, 0.33 * s, a, 0, 0.02 * s, 0.12 * s, 0.03 * s, 0, o * 0.3), 0.08);
}
function nr(e, t, a, s, i, o = 1) {
  e.add("ico", sh, p(t, a + 0.13 * o, s, i, 0.3 * o, 0.27 * o, 0.25 * o), 0.12), e.add("cyl5", "#a89670", p(t, a + 0.24 * o, s, i, 0.07 * o, 0.07 * o, 0.07 * o), 0.05);
}
const bi = 0.42;
function Uo(e, t, a, s, i, o = !1) {
  o ? (e.add("cyl8", s, p(t, 0, a, 0, 0.56, 0.34, 0.56), 0.03), e.add("cyl8", i, p(t, 0.34, a, 0, 0.64, 0.06, 0.64), 0.02)) : (e.add("box", s, p(t, 0, a, 0, 0.36, 0.34, 0.34), 0.03), e.add("box", i, p(t, 0.34, a, 0, 0.44, 0.06, 0.42), 0.02)), e.add("cyl8", "#3b2d24", p(t, 0.4, a, 0, 0.3, 0.02, 0.3), 0);
}
function rr(e, t, a, s) {
  e.add("box", s, p(t, 0, a, 0, 0.36, 0.32, 0.36), 0.02), $a(e, t, 0.32, a, 1.25, 0.08, s);
  const i = "#c9a24a";
  e.add("box", i, p(t, 1.57, a, 0, 0.12, 0.26, 0.09), 0.05), e.add("ico", i, p(t, 1.9, a, 0, 0.1, 0.11, 0.1), 0.05), e.add("box", i, p(t + 0.08, 1.7, a, 0, 0.04, 0.24, 0.04, 0, -0.5), 0.05);
}
function oh(e, t) {
  const a = t ? hs : th, s = t ? Ci : eh, i = t ? "#aaa393" : "#87806f";
  e.add("box", i, p(0, -0.45, 0, 0, 3.86, 0.5, 3.86), 0.02);
  const o = 6, n = 3.86 / o;
  for (let r = 0; r < o; r++) for (let l = 0; l < o; l++) ih(e, (r * 7 + l * 5) % 3 ? a : s, -1.93 + r * n + 0.02, -1.93 + l * n + 0.02, -1.93 + (r + 1) * n - 0.02, -1.93 + (l + 1) * n - 0.02, 0.06);
  if (t) {
    e.add("box", Ci, p(0, 0.05, -1, 0, 3.1, 0.22, 1.42), 0.02);
    for (let r = 0; r < 2; r++) e.add("box", hs, p(0, 0.05, -0.27 + r * 0, 0, 2.2, 0.15 - r * 0.07, 0.12 + (1 - r) * 0.12), 0.02);
    e.add("box", Fs, p(0, 0.27, -1.2, 0, 2.9, 1.35, 0.96)), e.add("box", Be, p(0, 0.27, -0.71, 0, 0.56, 0.9, 0.03), 0.02);
    for (const r of [-0.95, 0.95]) e.add("box", Te, p(r, 0.85, -0.71, 0, 0.22, 0.4, 0.03), 0);
    for (let r = 0; r < 6; r++) $a(e, -1.35 + r * 0.54, 0.27, -0.42, 1.35, 0.065, ca, ca, !0);
    e.add("box", Ls, p(0, 1.62, -0.92, 0, 3.12, 0.14, 1.6), 0.02), ea(e, 0, 1.76, -0.92, 3.2, 0.62, 1.62, 0), mn(e, 0, 1.76, -0.92, 3.2, 0.62, 1.62, 0, Fs), e.add("box", Ci, p(-0.55, 0.06, 0.85, 0, 1.3, 0.44, 0.6), 0.02), e.add("box", hs, p(-0.55, 0.5, 0.85, 0, 1.36, 0.06, 0.66), 0.02);
    for (const r of [-1, -0.55, -0.1]) e.add("cone4", Be, p(r, 0.28, 1.15, Math.PI / 4, 0.13, 0.24, 0.13, Math.PI / 2), 0.03);
    for (const r of [-1.15, 0.05]) e.add("box", hs, p(r, 0.56, 0.85, 0, 0.06, 0.2, 0.6), 0.02);
    Uo(e, 1.2, 1.3, ca, hs, !0), rr(e, -1.45, 1.5, ca);
  } else {
    e.add("box", _s, p(0, 0.05, -1.15, 0, 3, 1.2, 1)), e.add("box", Ta, p(0, 1.12, -1.15, 0, 3.04, 0.13, 1.04), 0.02), e.add("box", Te, p(0, 0.05, -0.64, 0, 0.42, 0.72, 0.03), 0);
    for (const r of [-1, 1]) e.add("box", Te, p(r, 0.55, -0.64, 0, 0.24, 0.3, 0.03), 0);
    for (let r = 0; r < 5; r++) $a(e, -1.3 + r * 0.65, 0.05, -0.32, 1.12, 0.075, "#eadfc6", _s);
    e.add("box", Ta, p(0, 1.17, -0.32, 0, 2.86, 0.1, 0.2), 0.02), ea(e, 0, 1.25, -0.95, 1.72, 0.5, 3.15, Math.PI / 2), Uo(e, 1.2, 1.3, la, Qa, !0), rr(e, -1.3, 1.25, Qa), e.add("cyl8", la, p(-0.15, 0.06, 0.95, 0, 0.44, 0.28, 0.44), 0.03), e.add("cyl8", "#2c3a40", p(-0.15, 0.3, 0.95, 0, 0.3, 0.05, 0.3), 0);
  }
}
function nh(e, t) {
  const a = t ? "#f0e9dc" : "#d9bb8c", s = t ? 1 : 0.9, i = 0.8, o = 0.15, n = 0.25, r = t ? "#b8553a" : "#c9925f", l = i + 0.1, c = s + 0.1, d = s - 0.14, h = Math.atan2(c - d, l - n);
  e.add("box", t ? "#c9c0ae" : "#b9a684", p(0, -0.3, 0, 0, i * 2 + 0.04, 0.33, i * 2 + 0.04), 0.02);
  for (const f of [-1, 1])
    e.add("box", a, p(0, 0, f * (i - o / 2), 0, i * 2, s - 0.012, o)), e.add("box", a, p(f * (i - o / 2), 0, 0, 0, o, s - 0.012, i * 2 - o * 2));
  if (t) for (const f of [-1, 1])
    e.add("box", "#a5432f", p(0, 0, f * (i + 3e-3), 0, i * 2 + 0.012, 0.16, 0.02), 0.02), e.add("box", "#a5432f", p(f * (i + 3e-3), 0, 0, 0, 0.02, 0.16, i * 2), 0.02);
  for (const f of [-1, 1])
    e.add("box", r, p(0, 0, f * (n + 0.02), 0, n * 2 + 0.08, d - 0.02, 0.04), 0.03), e.add("box", r, p(f * (n + 0.02), 0, 0, 0, 0.04, d - 0.02, n * 2), 0.03);
  e.add("box", "#d6cbb5", p(0, 0, 0, 0, n * 2, 0.03, n * 2), 0.02), e.add("box", "#b5a991", p(0, 0.03, 0, 0, 0.3, 0.04, 0.3), 0.02), e.add("box", Ho, p(0, 0.05, 0, 0, 0.23, 0.03, 0.23), 0.02);
  for (let f = 0; f < 4; f++) {
    const u = f * Math.PI / 2, m = (x, z, A) => {
      const [T, C] = ta(x, A, u);
      return [T, z, C];
    };
    e.poly(Ms, [m(-l, c, l), m(l, c, l), m(n, d, n), m(-n, d, n)], 0.04);
    for (const x of [-0.66, -0.44, -0.22, 0, 0.22, 0.44, 0.66]) {
      const z = Math.max(Math.abs(x) + 0.03, n), A = (z + l) / 2, T = d + (A - n) * Math.tan(h), [C, I] = ta(x, A, u);
      e.add("box", ha, p(C, T, I, u, 0.045, 0.03, (l - z) / Math.cos(h), -h), 0.04);
    }
    const [v, y] = ta(0, l, u), [M, k] = ta(0, n, u);
    e.add("box", ha, p(v, c - 0.07, y, u, l * 2, 0.07, 0.04), 0.02), e.add("box", ha, p(M, d - 0.06, k, u, n * 2, 0.06, 0.03), 0.02);
  }
  e.add("box", Te, p(0, 0, i + 5e-3, 0, 0.3, t ? 0.66 : 0.6, 0.03), 0);
  for (const f of [-1, 1]) for (const u of [-0.4, 0.35]) e.add("box", Te, p(f * (i + 5e-3), 0.52, u, 0, 0.03, 0.14, 0.12), 0);
  if (t) {
    for (const f of [-1, 1]) e.add("box", Ls, p(f * 0.2, 0, i + 0.02, 0, 0.07, 0.72, 0.05), 0.02);
    e.add("prism", Ta, p(0, 0.72, i + 0.03, 0, 0.52, 0.14, 0.06), 0.02), e.add("box", "#9a8f7c", p(-0.5, 0, i + 0.09, 0, 0.36, 0.15, 0.12), 0.03), e.add("cyl8", Ta, p(0.52, 0, i + 0.1, 0, 0.16, 0.13, 0.16), 0.03), e.add("cone7", "#4f7a3a", p(0.52, 0.12, i + 0.1, 0, 0.17, 0.42, 0.17), 0.05);
  } else w0(e, 0.55, i + 0.11, 1.15, "#a35f3b");
}
function rh(e, t) {
  const a = t ? "#ded3bf" : "#c8b590", s = t ? "#a9553b" : "#ae9870";
  e.add("box", s, p(0, -0.28, -0.38, 0, 1.86, 0.4, 0.96), 0.02), e.add("box", a, p(0, 0.1, -0.38, 0, 1.76, 0.9, 0.88));
  for (const i of [-0.86, -0.29, 0.29, 0.86]) e.add("box", s, p(i, 0.1, 0.07, 0, 0.12, 0.9, 0.06), 0.03);
  for (const i of [-0.575, 0.575]) e.add("box", Te, p(i, 0.6, 0.065, 0, 0.09, 0.26, 0.03), 0);
  for (const i of [-1, 1]) for (const o of [-0.62, -0.14]) e.add("box", Te, p(i * 0.885, 0.6, o, 0, 0.03, 0.26, 0.09), 0);
  e.add("box", Te, p(0, 0.1, 0.065, 0, 0.34, 0.56, 0.03), 0), e.add("box", s, p(0, 0.66, 0.075, 0, 0.46, 0.08, 0.05), 0.02), ea(e, 0, 1, -0.38, 1.12, 0.42, 1.96, Math.PI / 2);
  for (const [i, o, n] of [[0.42, 0.45, 1], [0.62, 0.38, 1.05], [0.78, 0.6, 0.95], [0.55, 0.72, 1]]) w0(e, i, o, n);
  for (const [i, o, n] of [[-0.75, 0.42, 0.3], [-0.45, 0.45, -0.2], [-0.62, 0.72, 0.9]]) nr(e, i, 0, o, n);
  nr(e, -0.6, 0.22, 0.5, 0.5, 0.9), e.add("box", ce, p(-0.05, 0, 0.62, 0.2, 0.3, 0.26, 0.3), 0.05);
}
function lh(e) {
  e.add("box", Ps, p(0, -0.3, -0.82, 0, 2.2, 0.52, 0.98), 0.02), e.add("box", _s, p(0, 0.2, -0.82, 0, 2.1, 0.85, 0.86));
  for (const t of [-0.55, 0.55]) e.add("box", Te, p(t, 0.2, -0.385, 0, 0.3, 0.6, 0.03), 0);
  for (const t of [-0.9, 0, 0.9]) e.add("box", Te, p(t, 0.62, -0.385, 0, 0.15, 0.15, 0.03), 0);
  ea(e, 0, 1.05, -0.82, 1.12, 0.46, 2.3, Math.PI / 2);
  for (const t of [0.2, 1]) e.add("box", qt, p(t, 0, 0.5, 0, 0.07, 0.9, 0.07));
  e.add("box", qt, p(0.6, 0.82, 0.5, 0, 0.9, 0.06, 0.06));
  for (let t = 0; t < 5; t++) {
    const a = 0.3 + t * 0.15;
    e.add("cyl5", "#8a6a48", p(a, 0, 0.66, 0, 0.035, 1.4, 0.035, -0.12), 0.05), e.add("cone4", Be, p(a, 1.39, 0.49, 0, 0.07, 0.18, 0.07, -0.12), 0.03);
  }
  for (const [t, a, s] of [[0.35, 0.78, 0.1], [0.85, 0.8, -0.15]]) e.add("cyl8", Be, p(t, 0.26, a, s, 0.5, 0.04, 0.5, Math.PI / 2 - 0.2), 0.03);
  e.add("cyl5", qt, p(-0.85, 0, 0.55, 0, 0.17, 1.1, 0.17));
  for (const t of [-1, 1]) e.add("box", qt, p(-0.3 + t * 0.16, 0, 0.75, 0, 0.05, 0.62, 0.05, 0, t * 0.12));
  e.add("cyl8", "#d6b85a", p(-0.3, 0.6, 0.72, 0, 0.56, 0.09, 0.56, Math.PI / 2), 0.04), e.add("cyl8", "#b5523b", p(-0.3, 0.6, 0.81, 0, 0.32, 0.012, 0.32, Math.PI / 2), 0.02), e.add("cyl8", "#efe6cf", p(-0.3, 0.6, 0.822, 0, 0.13, 0.012, 0.13, Math.PI / 2), 0.02);
}
const P0 = 0.3;
function ch(e) {
  const t = "#7d6549", a = "#8f6e4a", s = "#a7845c";
  for (let o = 0; o < 4; o++) {
    const n = o * Math.PI / 2, r = o === 0, l = (c, d) => ta(c, d, n);
    {
      const [c, d] = l(0, 1.36);
      e.add("box", t, p(c, -0.3, d, n, 1.36 * 2 + 0.28, 0.48, 0.3), 0.04);
    }
    for (const [c, d] of r ? [[-1.36, -0.34], [0.34, 1.36]] : [[-1.36, 1.36]]) {
      const [h, f] = l((c + d) / 2, 1.36);
      e.add("box", "#5e4632", p(h, 0.1, f, n, d - c, 0.42, 0.05), 0.03);
      const u = Math.max(1, Math.round((d - c) / 0.27));
      for (let m = 0; m <= u; m++) {
        const [v, y] = l(c + (d - c) * m / u, 1.4000000000000001);
        e.add("box", m % 2 ? a : s, p(v, 0.1, y, n, 0.1, 0.5, 0.1), 0.06), e.add("cone4", s, p(v, 0.6, y, n + Math.PI / 4, 0.14, 0.13, 0.14), 0.05);
      }
    }
  }
  for (const o of [-1, 1]) e.add("box", qt, p(o * 0.36, 0, 1.36 + 0.04, 0, 0.13, 0.98, 0.13));
  e.add("box", qt, p(0, 0.86, 1.36 + 0.04, 0, 0.86, 0.09, 0.11));
  for (const [o, n] of [[-0.72, -0.66], [0, -0.66], [0.72, -0.66], [-0.72, 0.32], [0.72, 0.32]])
    e.add("prism", "#b8946a", p(o, 0, n, 0, 0.56, 0.5, 0.72), 0.06), e.add("prism", "#6d5139", p(o, 0, n + 0.365, 0, 0.26, 0.27, 0.02), 0.02), e.add("cyl5", qt, p(o, 0, n + 0.37, 0, 0.03, 0.56, 0.03), 0.03);
  e.add("box", "#9a948a", p(0, 0, P0, 0, 0.26, 0.14, 0.26), 0.03);
}
function dh(e, t) {
  const a = t ? Ls : la, s = t ? ca : Qa, i = t ? Fs : "#e9dcc1", o = t ? ca : "#efe5cf", n = t ? ca : _s, r = t ? Ls : Ta, l = 0.6, c = 1.15, d = -1.3, h = 0.62, f = t ? 1.25 : 1.15, u = l + f;
  e.add("box", s, p(0, -0.3, (d + h) / 2, 0, c * 2 + 0.08, 0.38, h - d + 0.08), 0.02), e.add("box", a, p(0, 0, (d + h) / 2, 0, c * 2, l - 0.08, h - d)), e.add("box", s, p(0, l - 0.08, (d + h) / 2, 0, c * 2 + 0.06, 0.08, h - d + 0.06), 0.02);
  for (let S = 1; S <= 4; S++) e.add("box", s, p(0, -0.12, h + (5 - S) * 0.085 - 0.01, 0, (t ? 1.5 : 1.24) - S * 0.012, 0.12 + S * 0.15, (5 - S) * 0.17 + 0.02), 0.03);
  const m = t ? 0.92 : 0.98, v = d + 0.08, y = t ? -0.3 : -0.25;
  if (e.add("box", i, p(0, l, (v + y) / 2, 0, m * 2, f, y - v)), t) e.add("box", Be, p(0, l, y + 5e-3, 0, 0.42, 0.82, 0.03), 0.02);
  else for (const S of [-0.6, 0, 0.6])
    e.add("box", Te, p(S, l, y + 5e-3, 0, S ? 0.3 : 0.4, S ? 0.62 : 0.76, 0.03), 0), e.add("box", Ta, p(S, l + (S ? 0.62 : 0.76), y + 0.01, 0, (S ? 0.3 : 0.4) + 0.1, 0.07, 0.04), 0.02);
  const M = t ? [-1, -0.6, -0.2, 0.2, 0.6, 1] : [-0.95, -0.34, 0.34, 0.95], k = 0.48;
  for (const S of M) $a(e, S, l, k, f, t ? 0.068 : 0.085, o, n, t);
  for (const S of t ? [-1, 1] : [-0.95, -0.34, 0.34, 0.95]) $a(e, S, l, 0.02, f, t ? 0.068 : 0.085, o, n, t);
  if (t) for (const S of [-1, 1]) for (const O of [-1.05, -0.65]) $a(e, S * (m + 0.03), l, O, f, 0.06, o, n, !0);
  e.add("box", r, p(0, u, (d + h) / 2 - 0.02, 0, c * 2 - 0.04, 0.15, h - d - 0.04), 0.02), e.add("box", t ? "#cfc7b6" : _s, p(0, u + 0.04, h - 0.04, 0, c * 2 - 0.02, 0.07, 0.03), 0.02);
  const x = 2.4, z = t ? 0.62 : 0.46, A = h - d + (t ? 0.12 : 0.36), T = (d + h) / 2 + (t ? 0.04 : 0.16), C = u + 0.15;
  ea(e, 0, C, T, x, z, A, 0), mn(e, 0, C, T, x, z, A, 0, t ? Fs : Ta);
  const I = T + A / 2 + 0.03;
  if (t) {
    e.add("cone4", "#d9b04a", p(0, C + z - 0.02, I - 0.02, Math.PI / 4, 0.16, 0.24, 0.05), 0.03);
    for (const S of [-1, 1]) e.add("cone4", "#d9b04a", p(S * (x / 2 - 0.08), C, I - 0.02, Math.PI / 4, 0.1, 0.16, 0.04), 0.03);
  } else
    for (const [S, O] of [[I - 0.2, 1.15], [T - 0.15, 1], [T - A / 2 + 0.25, 1]]) {
      const B = C + z - 0.03, H = "#b5653c";
      e.add("box", ha, p(0, B, S, 0, 0.16 * O, 0.05, 0.14 * O), 0.03), e.add("cone7", H, p(0, B + 0.05, S, 0, 0.15 * O, 0.24 * O, 0.13 * O), 0.05), e.add("box", H, p(0, B + 0.2 * O, S, 0, 0.09 * O, 0.11 * O, 0.07 * O), 0.05), e.add("ico", "#c27a4c", p(0, B + 0.35 * O, S, 0, 0.075 * O, 0.085 * O, 0.075 * O), 0.05);
    }
  Uo(e, 0.95, 1.08, a, s);
}
function hh(e) {
  const t = "#aea595", a = "#9c9384";
  e.add("box", a, p(0, -0.25, -0.3, 0, 1.84, 0.31, 1.3), 0.02), e.add("box", t, p(0, 0.06, -0.75, 0, 1.7, 1.06, 0.2));
  for (const s of [-1, 1]) e.add("box", t, p(s * 0.79, 0.06, -0.3, 0, 0.12, 1.06, 1.1));
  for (let s = 0; s < 3; s++) e.add("box", a, p(0, 0.3 + s * 0.3, -0.64, 0, 1.6, 0.025, 0.02), 0);
  ea(e, 0, 1.12, -0.3, 1.24, 0.42, 1.84, Math.PI / 2), e.add("cyl8", "#8f5236", p(-0.42, 0.06, -0.38, 0, 0.7, 0.14, 0.7), 0.03), e.add("hemi", "#a5603f", p(-0.42, 0.2, -0.38, 0, 0.66, 0.6, 0.66), 0.04), e.add("box", "#2b1d16", p(-0.42, 0.22, -0.05, 0, 0.22, 0.18, 0.03), 0), e.add("cyl5", "#8f5236", p(-0.5, 0.45, -0.52, 0, 0.17, 1.35, 0.17), 0.03), e.add("box", a, p(0.18, 0.06, -0.2, 0.3, 0.24, 0.3, 0.22), 0.03), e.add("box", ir, p(0.18, 0.36, -0.2, 0.3, 0.32, 0.07, 0.14), 0.02), e.add("cyl5", qt, p(0.3, 0.43, -0.12, 0.3, 0.03, 0.22, 0.03, Math.PI / 2 - 0.1), 0.02), e.add("box", ir, p(0.29, 0.4, -0.12, 0.3, 0.06, 0.06, 0.1), 0.02), e.add("box", ce, p(0.38, 0.4, 0.5, 0, 0.74, 0.05, 0.36), 0.03);
  for (const [s, i] of [[-0.3, -0.13], [0.3, -0.13], [-0.3, 0.13], [0.3, 0.13]]) e.add("box", qt, p(0.38 + s, 0, 0.5 + i, 0, 0.05, 0.4, 0.05), 0.03);
  for (const [s, i, o] of [[-0.22, -0.06, 3], [-0.08, 0.07, 4], [0.05, -0.07, 2], [0.18, 0.05, 3], [0.28, -0.07, 2]]) for (let n = 0; n < o; n++) e.add("cyl8", n % 2 ? "#c5cbd2" : sr, p(0.38 + s + n % 2 * 8e-3, 0.45 + n * 0.03, 0.5 + i - n % 3 * 6e-3, n, 0.1, 0.03, 0.1), 0.02);
  e.add("ico", "#a0825a", p(0.62, 0.52, 0.56, 0, 0.12, 0.13, 0.11), 0.05), e.add("box", "#6b4a2f", p(-0.5, 0.06, 0.48, 0.15, 0.4, 0.26, 0.26), 0.04);
  for (let s = 0; s < 3; s++) e.add("box", sr, p(-0.58 + s * 0.08, 0.32, 0.48, 0.15, 0.06, 0.05, 0.18), 0.03);
  for (const [s, i] of [[0, -0.05], [0.1, 0.07], [-0.06, 0.1]]) e.add("dode", "#c9ccd2", p(-0.05 + s, 0.1, 0.15 + i, s * 9, 0.14, 0.1, 0.13), 0.08);
}
function uh(e) {
  const t = "#bdb29c", a = "#aa9f88", i = [-1.05, -0.25, 0.55];
  for (const o of i) e.addGeo(Rd(0.8, 1.85, 0.26, 1.02), o === -0.25 ? a : t, p(o, 0, 0, 0, 1, 1, 0.44), 0.04);
  for (const o of [-1.45, -0.65, 0.15, 0.95]) e.add("box", a, p(o, -0.4, 0, 0, 0.3, 0.45, 0.5), 0.03);
  for (const o of [-1.45, -0.65, 0.15]) e.add("box", a, p(o === -1.45 ? -1.41 : o, 1, 0, 0, o === -1.45 ? 0.1 : 0.36, 0.06, 0.48), 0.02);
  for (const o of [-1, 1]) e.add("box", a, p(-0.27, 1.56, o * 0.215, 0, 2.44, 0.05, 0.04), 0.02);
  e.add("box", a, p(-0.27, 1.85, 0, 0, 2.44, 0.1, 0.5), 0.02);
  for (const o of [-1, 1]) e.add("box", t, p(-0.27, 1.85 + 0.1, o * 0.2, 0, 2.44, 0.16, 0.1), 0.03);
  e.add("box", Ho, p(-0.28, 1.85 + 0.1, 0, 0, 2.42, 0.1, 0.3), 0.03), e.add("box", "#7fc3dc", p(-0.28, 1.85 + 0.2, 0, 0, 2.38, 5e-3, 0.12), 0.02), e.add("box", t, p(1.2, -0.3, 0, 0, 0.56, 1.85 + 0.62, 0.9)), e.add("box", a, p(1.2, 1.85 + 0.32, 0, 0, 0.64, 0.07, 0.98), 0.02), e.add("cone4", Ms, p(1.2, 1.85 + 0.39, 0, Math.PI / 4, 0.92, 0.38, 1.3), 0.03), e.add("box", Be, p(1.2, 0.86, 0.47, 0, 0.08, 0.06, 0.12), 0.02), e.add("box", "#a9dcec", p(1.2, 0.26, 0.55, 0, 0.05, 0.62, 0.05), 0.02), e.add("box", a, p(1.1, 0, 0.84, 0, 0.62, 0.28, 0.62), 0.03), e.add("box", Ho, p(1.1, 0.22, 0.84, 0, 0.5, 0.07, 0.5), 0.02);
}
function fh(e) {
  const t = Fs, a = Ls, s = 1.12, i = -1.15, o = 0.72, n = 0.6, r = 2, l = 1.3;
  e.add("box", Ci, p(0, -0.3, 0, 0, 2.86, 0.44, 2.86), 0.02), e.add("box", hs, p(0, 0.1, 0.04, 0, 2.6, 0.04, 2.6), 0.02), e.add("box", t, p(0, 0.14, (i + o) / 2, 0, n * 2, r - 0.14, o - i));
  for (const d of [-1, 1]) e.add("box", a, p(d * (n + 0.21), 0.14, (i + o) / 2, 0, 0.42, l - 0.14, o - i));
  for (const d of [-1, 1]) for (let h = 0; h < 5; h++) e.add("box", Te, p(d * (n + 5e-3), 1.5, i + 0.2 + h * 0.37, 0, 0.03, 0.28, 0.15), 0);
  e.add("box", Te, p(0, 0.14, o + 5e-3, 0, 0.36, 0.76, 0.03), 0);
  for (const d of [-1, 1]) e.add("box", Te, p(d * 0.82, 0.14, o + 5e-3, 0, 0.22, 0.52, 0.03), 0);
  for (const d of [-s, -0.56, 0, 0.56, s]) $a(e, d, 0.14, s, l - 0.14, 0.058, ca);
  for (const d of [-1, 1]) for (const h of [-1, -0.42, 0.16, 0.62]) $a(e, d * s, 0.14, h, l - 0.14, 0.058, ca);
  e.add("box", a, p(0, l, s, 0, s * 2 + 0.14, 0.1, 0.14), 0.02);
  for (const d of [-1, 1]) e.add("box", a, p(d * s, l, (i + s) / 2 - 0.05, 0, 0.14, 0.1, s - i + 0.1), 0.02);
  const c = (d, h, f, u, m, v) => {
    const y = Math.hypot(f - d, h - u), M = Math.atan2(h - u, Math.abs(f - d)), k = Math.sign(f - d);
    e.add("box", Ms, p((d + f) / 2, (h + u) / 2 - 0.02, (m + v) / 2, 0, y, 0.05, v - m, 0, -k * M), 0.03);
    for (let x = 0; x < Math.round((v - m) / 0.2); x++) e.add("box", ha, p((d + f) / 2, (h + u) / 2 + 0.03, m + (x + 0.5) * 0.2, 0, y, 0.03, 0.045, 0, -k * M), 0.04);
  };
  for (const d of [-1, 1]) c(d * n, 1.58, d * (s + 0.1), l + 0.08, i - 0.06, s + 0.08);
  {
    const d = s - o + 0.16, h = Math.atan2(0.14, d), f = (o + s) / 2 + 0.04;
    e.add("box", Ms, p(0, l + 0.09, f, 0, n * 2 + 0.02, 0.05, d, h), 0.03);
    for (let u = 0; u < 6; u++) e.add("box", ha, p(-n + (u + 0.5) * n / 3, l + 0.135, f, 0, 0.045, 0.03, d, h), 0.04);
  }
  ea(e, 0, r, (i + o) / 2, n * 2 + 0.24, 0.42, o - i + 0.14, 0), mn(e, 0, r, (i + o) / 2, n * 2 + 0.24, 0.42, o - i + 0.14, 0, a);
}
const E0 = 0.37, Ua = 1.62;
function ph(e) {
  const t = new Pa(Sa(311 + e)), a = E0, s = 0.016, i = 4, o = 0.36, n = -0.35, r = [la, Zd, Qa, la], l = e & 2 ? -0.5 : -a, c = e & 1 ? 0.5 : a, d = e & 8 ? -0.5 : -a, h = e & 4 ? 0.5 : a, f = (e & 3) !== 0, u = (e & 12) !== 0, m = (k, x, z) => {
    const T = x + (x > -0.499 ? 0.012 : 0), C = z - (z < 0.499 ? 0.012 : 0), I = C - T, S = (T + C) / 2;
    t.add("box", Qd, k === "x" ? p(S, n, 0, 0, I, Ua - n - 0.1, a * 2 - 0.012 * 2) : p(0, n, S, 0, a * 2 - 0.012 * 2, Ua - n - 0.1, I), 0);
  }, v = (k, x, z, A, T, C, I) => {
    const S = z - x, O = (x + z) / 2;
    S < 0.02 || t.add("box", C, k === "x" ? p(O, A, 0, 0, S, T - A, a * 2) : p(0, A, O, 0, a * 2, T - A, S), I);
  };
  (f || !u) && m("x", l, c), u && m("z", d, h);
  for (let k = 0; k < i; k++) {
    const x = k === 0 ? n : k * o + s / 2, z = (k + 1) * o - s / 2, A = k % 2 === 1, T = f && u ? A ? "z" : "x" : u ? "z" : "x", C = (I, S, O, B, H) => {
      const $ = A ? 0.25 : 0, P = [];
      for (let D = -1 + $; D <= 1; D += 0.5) D > S + 0.05 && D < O - 0.05 && P.push(D);
      const w = [S, ...P, O];
      for (let D = 0; D + 1 < w.length; D++) {
        const j = w[D] + (D > 0 || B || !A && Math.abs(w[D] + 0.5) < 1e-6 ? s / 2 : 0), E = w[D + 1] - (D + 2 < w.length || H || !A && Math.abs(w[D + 1] - 0.5) < 1e-6 ? s / 2 : 0), N = Math.abs(j + 0.5) < 0.01 || Math.abs(E - 0.5) < 0.01;
        v(I, j, E, x, z, N ? r[k] : r[(k + D + (I === "z" ? 1 : 0)) % 4], N ? 0 : 0.05);
      }
    };
    T === "x" ? (C("x", l, c, !1, !1), u && (h > a && C("z", a + s / 2, h, !0, !1), d < -a && C("z", d, -a - s / 2, !1, !0))) : (C("z", d, h, !1, !1), f && (c > a && C("x", a + s / 2, c, !0, !1), l < -a && C("x", l, -a - s / 2, !1, !0)));
  }
  const y = i * o, M = (k, x, z) => {
    const A = z - x + (x > -0.5 ? 0.03 : 0) + (z < 0.5 ? 0.03 : 0), T = (x + z) / 2 + (x > -0.5 ? -0.015 : 0) + (z < 0.5 ? 0.015 : 0);
    t.add("box", Qa, k === "x" ? p(T, y, 0, 0, A, Ua - y, a * 2 + 0.06) : p(0, y + (f ? 2e-3 : 0), T, 0, a * 2 + 0.06, Ua - y, A), 0);
  };
  return (f || !u) && M("x", l, c), u && M("z", d, h), t.build();
}
function mh(e) {
  const t = "tufa-previa/" + (e & 15);
  let a = ba.get(t);
  if (a) return a;
  const s = new Pa(Sa(5)), i = E0, o = e & 2 ? -0.5 : -i, n = e & 1 ? 0.5 : i, r = e & 8 ? -0.5 : -i, l = e & 4 ? 0.5 : i, c = (e & 3) !== 0, d = (e & 12) !== 0, h = Ua - 0.18;
  return (c || !d) && s.add("box", la, p((o + n) / 2, -0.1, 0, 0, n - o, h + 0.1, i * 2), 0), d && (l > i && s.add("box", la, p(0, -0.1, (i + l) / 2, 0, i * 2, h + 0.1, l - i), 0), r < -i && s.add("box", la, p(0, -0.1, (r - i) / 2, 0, i * 2, h + 0.1, -i - r), 0), c || s.add("box", la, p(0, -0.1, 0, 0, i * 2, h + 0.1, i * 2), 0)), (c || !d) && s.add("box", Qa, p((o + n) / 2, h, 0, 0, n - o, 0.18, i * 2 + 0.06), 0), d && s.add("box", Qa, p(0, h + 2e-3, (r + l) / 2, 0, i * 2 + 0.06, 0.18, l - r), 0), a = s.build(), ba.set(t, a), a;
}
function gh(e, t, a) {
  const s = new Pa(a), i = t;
  switch (e) {
    case "center":
      if (i >= 3) oh(s, i >= 4);
      else if (i === 0)
        mi(s, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((o, n) => pi(s, Math.cos(o) * 1.45, Math.sin(o) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [yo, "#8d6a46", "#b58a5d"][n % 3], a));
      else if (i === 1)
        gi(s, 0, -0.4, 2.2, 3.2, 1.3, 1.5, ui, Ra, Math.PI / 2), mi(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", p(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        tr(s, 0, -0.45, 1.5, 1.02, 1.3, 1.75, ui, Ra);
        for (const o of [-1, 1])
          s.add("cyl5", qt, p(o * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), s.add("cyl8", Be, p(o * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        s.add("box", ce, p(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), mi(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", p(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), s.add("cyl8", "#8a5a40", p(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      i >= 3 ? nh(s, i >= 4) : i === 0 ? (pi(s, 0, 0, 0.8, 1.5, yo, a), s.add("box", "#9a7148", p(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : i === 1 ? gi(s, 0, 0, 1.3, 1.6, 1, 0.95, ui, ls, a() < 0.5 ? 0 : Math.PI / 2) : (tr(s, 0, -0.08, 0.66, 0.5, 0.85, 1, Qn, ls), s.add("cyl8", "#a0654a", p(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (i >= 3) rh(s, i >= 4);
      else if (i === 0) {
        for (let o = 0; o < 6; o++) s.add("cyl5", "#5e4431", p(-0.3, 0.1 + o % 3 * 0.18, -0.35 + Math.floor(o / 3) * 0.18 + o % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        s.add("prism", yo, p(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), s.add("cyl8", "#b48a5c", p(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (i === 1) {
        for (const [o, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) s.add("cyl5", qt, p(o, 0, n, 0, 0.13, 0.6, 0.13));
        s.add("cyl8", ui, p(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), s.add("cone7", Ra, p(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [o, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) s.add("cyl5", qt, p(o, 0, n, 0, 0.12, 0.5, 0.12));
        s.add("box", ce, p(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), s.add("prism", Ra, p(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), s.add("cyl8", "#a0654a", p(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), s.add("cyl8", "#8a5a40", p(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let o = 0; o < 3; o++) s.add("box", Be, p(0.42, o * 0.07, 0.62 + o % 2 * 0.03, o % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (i >= 4) ch(s);
      else if (i === 3) lh(s);
      else if (i === 0) {
        ar(s, 1.15, 10, 0.32), pi(s, -0.55, -0.5, 0.5, 1.2, "#8d6a46", a);
        for (let o = 0; o < 4; o++) s.add("cyl5", "#8a6a48", p(0.6 + o * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        s.add("cyl5", qt, p(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (i === 1) {
        gi(s, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", ls, 0);
        for (let o = 0; o < 7; o++) s.add("cyl5", ce, p(-1.3 + o * 0.4, 0, 1.25, 0, 0.14, 0.9 + o % 2 * 0.15, 0.14));
        for (let o = 0; o < 3; o++) s.add("cyl5", "#8a6a48", p(1, 0, -0.6 + o * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        s.add("box", Ps, p(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), gi(s, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", ls, Math.PI / 2, 0.25), s.add("box", qt, p(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let o = 0; o < 4; o++) s.add("cyl5", "#8a6a48", p(0.6 + o * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        s.add("cyl5", qt, p(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), s.add("box", qt, p(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), s.add("cyl8", Be, p(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      s.add("box", "#7d5f3e", p(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let o = 0; o < 4; o++) s.add("box", "#6b4f33", p(0, 0.03, -1.12 + o * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [o, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) s.add("cyl5", ce, p(o, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      Jd(s, 1.35), Mo(s, -0.5, -0.3, 0.6), Mo(s, 0.45, 0.2, 2.5), Mo(s, -0.2, 0.65, 4.1), s.add("box", "#a0754c", p(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (i < 2)
        s.add("box", "#a8a397", p(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), ar(s, 0.85, 8, 0.45), s.add("dode", "#8a857c", p(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [o, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) s.add("cyl5", qt, p(o, 0, n, 0, 0.1, 1.15, 0.1));
        i >= 3 ? or(s, 1.1, 1.9, 0.75) : s.add("cone4", Ra, p(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), s.add("box", fi, p(0, 0, 0, 0, 0.6, 0.55, 0.45)), s.add("cyl8", Be, p(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), s.add("box", "#a8a397", p(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), s.add("box", "#a8a397", p(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      mi(s, 0, 0, 1);
      for (let o = 0; o < 4; o++) {
        const n = o / 4 * me + 0.4;
        pi(s, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][o % 3], a);
      }
      for (let o = 0; o < 9; o++) {
        const n = -0.9 + o * 0.22;
        s.add("cyl5", "#5a4030", p(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + o % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      s.add("box", Qn, p(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const o of [-1, 1]) s.add("cyl5", qt, p(o * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      i >= 3 ? ea(s, 0, 1, -0.3, 2, 0.6, 1.2, 0) : s.add("prism", ls, p(0, 1, -0.3, 0, 2, 0.6, 1.2)), s.add("ico", "#a5603f", p(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), s.add("cyl5", "#8f5236", p(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), s.add("box", "#2b1d16", p(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), s.add("box", Ps, p(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), s.add("box", "#5c5a57", p(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let o = 0; o < 3; o++) s.add("box", Be, p(-0.55 + o * 0.05, o * 0.06, -0.35, 0.1 * o, 0.3, 0.06, 0.1));
      break;
    case "market":
      xo(s, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), xo(s, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), xo(s, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [Be, "#d9a43a", "#bdb6a8"]), s.add("cyl8", "#a0654a", p(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), s.add("cyl8", "#c9a75e", p(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), s.add("ico", "#d6c49a", p(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      s.add("box", ce, p(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const o of [-1, 1]) s.add("box", ce, p(o * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let o = 0; o < 4; o++) s.add("cyl5", qt, p(-1.3 + o * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      i >= 3 ? ea(s, 0, 0.97, -0.76, 3, 0.62, 1.3, 0) : s.add("prism", Ra, p(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let o = 0; o < 5; o++) s.add("cyl5", qt, p(-1.35 + o * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const o of [0.28, 0.52]) s.add("box", ce, p(0, o, 1.35, 0, 2.75, 0.05, 0.05));
      Yd(s, 0.2, 0.55, -1.2, "#7a5236"), s.add("box", "#d6b85a", p(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), s.add("box", "#c9ab50", p(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [o, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) s.add("cyl5", qt, p(o, 0, n, 0, 0.12, 1.15, 0.12));
      i >= 3 ? ea(s, 0, 1.12, -0.7, 2.8, 0.6, 1.4, 0) : s.add("prism", ls, p(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), s.add("box", ce, p(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const o of [-1, 1])
        s.add("box", qt, p(o * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), s.add("box", qt, p(o * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      s.add("box", qt, p(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), s.add("cyl8", "#5e4431", p(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const o of [-1, 1]) for (const n of [-0.1, 1.2]) s.add("box", ce, p(o * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      s.add("cyl5", "#4a3a2c", p(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), er(s, -0.95, 0, 0.9, 0.3, 0.4, -0.12), er(s, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let o = 0; o < 3; o++) s.add("cyl5", "#5e4431", p(0.9, 0.1 + o % 2 * 0.16, -0.65 + o * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      s.add("box", Ps, p(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [o, n, r] of [[-0.25, -0.25, jo], [0.25, -0.25, fi], [-0.25, 0.25, fi], [0.25, 0.25, jo]]) s.add("box", r, p(o, 0.55, n, (o + n) * 0.4, 0.5, 0.36 + Math.abs(o - n) * 0.2, 0.5), 0.12);
      s.add("dode", Ps, p(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    // ── Reino e República (M3) ──
    case "temple":
      dh(s, i >= 4);
      break;
    case "mint":
      hh(s);
      break;
    case "aqueduct":
      uh(s);
      break;
    case "basilica":
      fh(s);
      break;
    case "road":
      O0(s);
      break;
    // só para as contas de raio (o desenho de verdade é o RoadLayer)
    case "tower":
      s.add("cyl8", "#b3ada2", p(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), s.add("cyl8", fi, p(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), s.add("cyl8", "#9d978b", p(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), s.add("box", "#2b211a", p(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), s.add("box", "#2b211a", p(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), s.add("box", ce, p(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let o = 0; o < 8; o++) {
        const n = o / 8 * me;
        s.add("cyl5", qt, p(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [o, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) s.add("box", qt, p(o, 2.62, n, r, 1.7, 0.08, 0.06));
      i >= 3 ? or(s, 3.2, 2.6, 1) : s.add("cone4", Ra, p(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return s.build();
}
function bh(e, t, a) {
  const s = [], i = [], o = new Qt(), n = (h, f) => zt(e, h, f), r = (h, f, u, m, v, y) => {
    const M = [[h, f], [h, m], [u, m], [u, f]].map(([k, x]) => [k, n(k, x) + v, x]);
    o.set(y);
    for (const k of [0, 1, 3, 1, 2, 3])
      s.push(...M[k]), i.push(o.r, o.g, o.b);
  };
  for (let h = 0; h < 6; h++) for (let f = 0; f < 6; f++) {
    const u = t - 1.5 + h * 0.5, m = a - 1.5 + f * 0.5;
    r(u, m, u + 0.5, m + 0.5, 0.05, (h + f) % 2 ? "#7d5f3e" : "#795b3a");
  }
  for (let h = 0; h < 4; h++) {
    const f = a - 1.12 + h * 0.75;
    for (let u = 0; u < 7; u++) {
      const m = t - 1.4 + u * 0.4;
      r(m, f - 0.14, m + 0.4, f + 0.14, 0.09, "#6b4f33");
    }
  }
  const l = new Pa();
  for (const [h, f] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", ce, p(t + h, n(t + h, a + f), a + f, 0, 0.08, 0.5, 0.08));
  const c = l.build();
  s.push(...c.attributes.position.array), i.push(...c.attributes.color.array);
  const d = new wa();
  return d.setAttribute("position", new Xa(s, 3)), d.setAttribute("color", new Xa(i, 3)), d.computeVertexNormals(), d.computeBoundingSphere(), d;
}
const vh = "#7a5a3c", yh = "#8d6a48", xh = "#b89068", lr = "#6a5640", cr = "#4f3a28";
function Mh(e, t) {
  const a = new Pa(t), s = e >> 4;
  e &= 15;
  const i = (r, l) => {
    const c = 1.02 + (t() - 0.5) * 0.24, d = 0.21 + t() * 0.03, h = t() * me;
    a.add("cyl5", t() < 0.5 ? vh : yh, p(r, -0.35, l, h, d, c + 0.35, d), 0.12), a.add("cone4", xh, p(r, c - 0.01, l, h, d * 1.02, 0.24, d * 1.02), 0.1);
  };
  a.add("box", lr, p(0, -0.3, 0, 0, 0.42, 0.4, 0.42), 0.12), i(0, 0);
  const o = [[1, 0, 1], [-1, 0, 2], [0, 1, 4], [0, -1, 8]];
  let n = 0;
  for (const [r, l, c] of o)
    if (e & c) {
      n++, i(r * 0.25, l * 0.25), (c === 1 || c === 4 || s & c) && i(r * 0.5, l * 0.5), a.add("box", lr, p(r * 0.25, -0.3, l * 0.25, 0, r ? 0.52 : 0.4, 0.39, l ? 0.52 : 0.4), 0.12);
      for (const d of [-1, 1]) a.add("box", cr, p(r * 0.25 + (l ? d * 0.12 : 0), 0.55 + d * 0.04, l * 0.25 + (r ? d * 0.12 : 0), 0, r ? 0.54 : 0.06, 0.07, l ? 0.54 : 0.06), 0.08);
    }
  if (!n) {
    for (const [r, l] of [[0.2, 0.17], [-0.19, 0.18], [0.18, -0.19], [-0.2, -0.17]]) i(r, l);
    a.add("cyl8", cr, p(0, 0.52, 0, 0, 0.7, 0.07, 0.7), 0.08);
  }
  return a.build();
}
function I0(e, t) {
  const a = e.size, s = e.x[t] >> 8, i = e.z[t] >> 8, o = e.owner[t];
  let n = 0;
  const r = (l, c, d) => {
    if (l < 0 || c < 0 || l >= a || c >= a) return;
    const h = e.bAt[c * a + l] - 1;
    h >= 0 && e.isBuilding(h) && e.owner[h] === o && ct[e.kind[h] - ut].wall && (n |= d, ct[e.kind[h] - ut].key !== "palisade" && (n |= d << 4));
  };
  return r(s + 1, i, 1), r(s - 1, i, 2), r(s, i + 1, 4), r(s, i - 1, 8), n;
}
const kh = "#45474b", dr = ["#707276", "#67696d", "#7b7c80", "#606266", "#76777b", "#6b6c70"], zh = "#aaa59a", Ah = "#9b958b", q0 = 0.07;
function O0(e) {
  e.add("box", kh, p(0, -0.12, 0, 0, 1, 0.12 + q0 - 0.012, 1), 0.02);
}
function Ss(e, t, a, s) {
  const i = [];
  for (let o = 0; o < e.length; o++) {
    const n = e[o], r = e[(o + 1) % e.length], l = t * n[0] + a * n[1] - s, c = t * r[0] + a * r[1] - s;
    if (l <= 0 && i.push(n), l < 0 && c > 0 || l > 0 && c < 0) {
      const d = l / (l - c);
      i.push([n[0] + (r[0] - n[0]) * d, n[1] + (r[1] - n[1]) * d]);
    }
  }
  return i;
}
const Th = (e) => {
  let t = 0;
  for (let a = 0; a < e.length; a++) {
    const s = e[a], i = e[(a + 1) % e.length];
    t += s[0] * i[1] - i[0] * s[1];
  }
  return Math.abs(t) / 2;
};
let vi = null;
function R0(e, t = !0) {
  const a = new Pa(Sa(77 + e));
  if (!vi) {
    const n = Sa(4243);
    vi = [];
    for (let r = 0; r < 6; r++) for (let l = 0; l < 6; l++) vi.push([(r + 0.5 + (n() - 0.5) * 0.7) / 3, (l + 0.5 + (n() - 0.5) * 0.7) / 3]);
  }
  t && O0(a);
  const s = e & 1, i = e >> 1, o = [];
  vi.forEach(([n, r], l) => {
    for (let c = -1; c <= 1; c++) for (let d = -1; d <= 1; d++) o.push([n + c * 2, r + d * 2, l]);
  });
  for (const [n, r, l] of o) {
    if (n < s - 0.6 || n > s + 1.6 || r < i - 0.6 || r > i + 1.6) continue;
    let c = [[n - 1, r - 1], [n + 1, r - 1], [n + 1, r + 1], [n - 1, r + 1]];
    for (const [d, h] of o) {
      const f = d - n, u = h - r, m = f * f + u * u;
      if (!(m < 1e-9 || m > 1.6) && (c = Ss(c, f, u, (f * (n + d) + u * (r + h)) / 2), !c.length))
        break;
    }
    c = c.map(([d, h]) => [n + (d - n) * 0.88, r + (h - r) * 0.88]), c = Ss(c, 1, 0, s + 1), c = Ss(c, -1, 0, -s), c = Ss(c, 0, 1, i + 1), c = Ss(c, 0, -1, -i), !(c.length < 3 || Th(c) < 2e-3) && a.poly(dr[l % dr.length], c.map(([d, h]) => [d - s - 0.5, q0, h - i - 0.5]), 0);
  }
  return a.build();
}
function hr(e) {
  const t = new Pa(Sa(e === "x" ? 5 : 6)), a = e === "z" ? 0.15 : 0.145, s = e === "z" ? 0.503 : 0.5015, i = e === "z" ? 1 : 0.988;
  return [[-0.5, -0.17], [-0.155, 0.155], [0.17, 0.5]].forEach(([o, n], r) => {
    const l = (n - o) * i, c = (o + n) / 2 * i, d = r % 2 ? Ah : zh;
    t.add("box", d, e === "z" ? p(c, -0.08, s - 0.07, 0, l, a + 0.08, 0.14) : p(s - 0.07, -0.08, c, 0, 0.14, a + 0.08, l), 0.04);
  }), t.build();
}
function B0(e, t, a, s) {
  const i = e.size;
  let o = 0;
  const n = (r, l, c) => {
    if (r < 0 || l < 0 || r >= i || l >= i) return;
    const d = l * i + r, h = e.bAt[d] - 1;
    (s?.has(d) || h >= 0 && e.isBuilding(h) && ct[e.kind[h] - ut].estrada) && (o |= c);
  };
  return n(t + 1, a, 1), n(t - 1, a, 2), n(t, a + 1, 4), n(t, a - 1, 8), o;
}
const Wo = (e, t = {}, a = {}) => Zt({ vertexColors: !0, ...t }, { ROAD: "", HSTEP: e.toFixed(2), SNOW_K: "0.35", ...a });
class Go {
  /** colored: a prévia (cores por instância e sem a base escura) */
  constructor(t, a, s = !1, i = 0) {
    g(this, "group", new as());
    g(this, "pav", []);
    g(this, "cz");
    g(this, "cx");
    g(this, "n", [0, 0, 0, 0]);
    g(this, "ncz", 0);
    g(this, "ncx", 0);
    g(this, "sig", 0);
    g(this, "lastSig", -1);
    g(this, "_m", new le());
    g(this, "_q", new bs());
    g(this, "_p", new Et());
    g(this, "_s", new Et());
    g(this, "_y", new Et(0, 1, 0));
    const o = (n, r) => {
      const l = n.clone(), c = new Wl(new Float32Array(r * 4), 4);
      c.setUsage(ue), l.setAttribute("aCell", c);
      const d = new Lt(l, t, r);
      if (d.instanceMatrix.setUsage(ue), d.frustumCulled = !1, d.receiveShadow = !0, d.castShadow = !1, d.count = 0, d.renderOrder = i, s) {
        const h = new Qt("#ffffff");
        for (let f = 0; f < r; f++) d.setColorAt(f, h);
      }
      return this.group.add(d), d;
    };
    for (let n = 0; n < 4; n++) this.pav.push(o(R0(n, !s), a));
    this.cz = o(hr("z"), a * 2), this.cx = o(hr("x"), a * 2);
  }
  begin() {
    this.n.fill(0), this.ncz = this.ncx = 0, this.sig = 0;
  }
  /** um bloco no tile (tx, tz): mask = vizinhos com estrada (roadMask); prog = obra (0 a 1); col = cor da prévia */
  add(t, a, s, i, o = 1, n) {
    const r = (a & 1) + 2 * (s & 1), l = a + 0.5, c = s + 0.5, d = t.heights, h = t.hn, f = Math.min(h - 2, Math.floor(l / t.hstep)), u = Math.min(h - 2, Math.floor(c / t.hstep)), m = d[u * h + f], v = d[u * h + f + 1], y = d[(u + 1) * h + f], M = d[(u + 1) * h + f + 1], k = (x, z, A) => z >= x.instanceMatrix.count ? !1 : (this._q.setFromAxisAngle(this._y, A), this._p.set(l, 0, c), this._s.set(1, Math.max(0.12, o), 1), x.setMatrixAt(z, this._m.compose(this._p, this._q, this._s)), x.geometry.attributes.aCell.setXYZW(z, m, v, y, M), n && x.setColorAt(z, n), !0);
    k(this.pav[r], this.n[r], 0) && this.n[r]++, !(i & 4) && k(this.cz, this.ncz, 0) && this.ncz++, !(i & 8) && k(this.cz, this.ncz, Math.PI) && this.ncz++, !(i & 1) && k(this.cx, this.ncx, 0) && this.ncx++, !(i & 2) && k(this.cx, this.ncx, Math.PI) && this.ncx++, this.sig = Math.imul(this.sig, 31) + a * 7 + s * 131 + i * 17 + Math.round(o * 50) + (n ? Math.round(n.r * 97 + n.g * 89 + n.b * 13) : 0) | 0;
  }
  /** só manda para a placa de vídeo o que mudou (a estrada quase nunca muda) */
  end() {
    const t = [...this.pav, this.cz, this.cx], a = [...this.n, this.ncz, this.ncx], s = this.sig !== this.lastSig || t.some((i, o) => i.count !== a[o]);
    this.lastSig = this.sig, t.forEach((i, o) => {
      if (i.count = a[o], i.visible = a[o] > 0, !s || !a[o]) return;
      const n = i.geometry.attributes.aCell;
      i.instanceMatrix.clearUpdateRanges(), i.instanceMatrix.addUpdateRange(0, a[o] * 16), i.instanceMatrix.needsUpdate = !0, n.clearUpdateRanges(), n.addUpdateRange(0, a[o] * 4), n.needsUpdate = !0, i.instanceColor && (i.instanceColor.clearUpdateRanges(), i.instanceColor.addUpdateRange(0, a[o] * 3), i.instanceColor.needsUpdate = !0);
    });
  }
}
const $h = { center: 4, house: 4, depot: 4, military: 4, forge: 3, stable: 3, workshop: 3, tower: 3, sanctuary: 3, tufa: 0, mint: 0, aqueduct: 0, basilica: 0, road: 0 }, js = (e, t) => e === "temple" ? t >= 4 ? 4 : 3 : Math.max(0, Math.min(t, $h[e] ?? 2)), gn = (e, t) => e === "farm" || e === "palisade" || e === "tufa" || e === "road" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2;
function N0(e, t) {
  const a = ct[e.kind[t] - ut], s = e.owner[t], i = s >= 0 && s < e.players.length ? e.players[s].era : 0;
  return Hi(a.key, i, a.key === "palisade" || a.key === "tufa" ? I0(e, t) : -1);
}
const ba = /* @__PURE__ */ new Map();
function Hi(e, t, a = -1) {
  if (e === "palisade" || e === "tufa") {
    const n = e === "tufa" ? Math.max(0, a) & 15 : Math.max(0, a), r = e + "/" + n;
    let l = ba.get(r);
    return l || (l = e === "palisade" ? Mh(n, Sa(97 + n * 13)) : ph(n), ba.set(r, l)), l;
  }
  if (e === "road") {
    let n = ba.get(e);
    return n || (n = R0(0), ba.set(e, n)), n;
  }
  const s = js(e, t), i = e + s;
  let o = ba.get(i);
  return o || (o = gh(e, s, Sa(e.length * 31 + s)), ba.set(i, o)), o;
}
const Sh = (e) => e === "tufa" ? Ua : e === "palisade" ? 1.3 : 1.2, ur = {
  center: { f: [1.2, bi + 0.02, 1.3, 0.24], s: [1.2, bi + 0.3, 1.3, 0.55] },
  temple: { f: [0.95, bi + 0.02, 1.08, 0.2], s: [0.95, bi + 0.3, 1.08, 0.45] },
  mint: { f: [-0.42, 0.22, -0.02, 0.12], s: [-0.5, 1.85, -0.52, 0.5] }
}, yi = new Qr(), fr = new Et(), pr = new Et(), mr = new Et(), gr = new Et();
function br(e, t, a, s, i, o, n) {
  const r = ct[e.kind[t] - ut], l = N0(e, t), c = l.attributes.position.array, d = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), h = e.x[t] / 256, f = e.z[t] / 256, u = gn(r.key, t), m = Math.cos(u), v = Math.sin(u), y = a - h, M = s - f, k = y * m - M * v, x = y * v + M * m, z = i * m - o * v, A = i * v + o * m, T = Math.hypot(z, A) || 1;
  let C = 1 / 0;
  for (const I of [0, 0.1, -0.1]) {
    yi.origin.set(k - A / T * I, n / d, x + z / T * I), yi.direction.set(z / T, 0, A / T);
    for (let S = 0; S + 8 < c.length; S += 9) {
      if (fr.set(c[S], c[S + 1], c[S + 2]), pr.set(c[S + 3], c[S + 4], c[S + 5]), mr.set(c[S + 6], c[S + 7], c[S + 8]), !yi.intersectTriangle(fr, pr, mr, !1, gr)) continue;
      const O = gr.distanceTo(yi.origin);
      O < C && (C = O);
    }
  }
  return C < 1 / 0 ? C : null;
}
const Ch = lt((e) => e.add("cyl5", qt, p(0, 0, 0, 0, 0.06, 2, 0.06), 0)), wh = new ge(0.42, 0.34, 0.03).translate(0.24, 1.75, 0), vr = { house: 0.04, depot: 0.025, mint: 0.035 }, yr = { temple: 0.8, aqueduct: 0.7, basilica: 0.7, center: 0.5 }, Ph = lt((e) => {
  e.add("cyl5", qt, p(0, 0, 0, 0, 0.05, 1.78, 0.05), 0), e.add("box", qt, p(0, 1.5, 0, 0, 0.52, 0.04, 0.04), 0), e.add("cone4", "#d9b04a", p(0, 1.78, 0, Math.PI / 4, 0.09, 0.16, 0.09), 0), e.add("cyl8", "#d9b04a", p(0, 1.64, -0.01, 0, 0.13, 0.02, 0.13, Math.PI / 2), 0);
}), Eh = lt((e) => {
  e.add("box", "#ffffff", p(0, 1.12, 0.035, 0, 0.44, 0.38, 0.02), 0), e.add("box", "#d9b04a", p(0, 1.07, 0.035, 0, 0.44, 0.05, 0.024), 0);
});
class Ih {
  constructor() {
    g(this, "group", new as());
    g(this, "meshes", /* @__PURE__ */ new Map());
    g(this, "poles");
    g(this, "flags");
    g(this, "crops");
    g(this, "fair");
    g(this, "vexPole");
    g(this, "vexCloth");
    g(this, "fairB");
    g(this, "mat", Zt({ vertexColors: !0 }));
    g(this, "farms", /* @__PURE__ */ new Map());
    /** as estradas (M3): criadas na primeira vez (precisam do passo do terreno) */
    g(this, "roads", null);
    g(this, "fires", []);
    g(this, "smokes", []);
    this.poles = new Lt(Ch, Zt({ vertexColors: !0 }), 256), this.flags = new Lt(wh, Zt({}, { NO_SNOW: "" }), 256);
    const t = lt((s) => {
      for (let i = 0; i < 3; i++) s.add("cone4", "#ffffff", p((i - 1) * 0.1, 0, i % 2 * 0.08, i, 0.1, 0.75, 0.1, (i - 1) * 0.15, 0), 0.1);
    });
    this.crops = new Lt(t, Zt({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = A0({ CROP: "" });
    const a = (s, i) => lt((o) => {
      const n = [[-s, -s], [s, -s], [s, s], [-s, s]], r = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"], l = i - 0.1;
      for (const [c, d] of n) o.add("cyl5", qt, p(c, 0, d, 0, 0.07, i, 0.07), 0);
      for (let c = 0; c < 4; c++) {
        const [d, h] = n[c], [f, u] = n[(c + 1) % 4], m = Math.hypot(f - d, u - h), v = Math.atan2(f - d, u - h);
        o.add("box", "#e8e2d4", p((d + f) / 2, l, (h + u) / 2, v, 0.015, 0.015, m), 0);
        for (let y = 1; y < 8; y++) {
          const M = y / 8, k = Math.sin(M * Math.PI) * 0.18;
          o.add("cone4", r[(y + c) % r.length], p(d + (f - d) * M, l - k - 0.2, h + (u - h) * M, v, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new Lt(a(1.38, 2.05), Zt({ vertexColors: !0 }), 16), this.fairB = new Lt(a(1.42, 2.75), Zt({ vertexColors: !0 }), 16), this.vexPole = new Lt(Ph, Zt({ vertexColors: !0 }), 32), this.vexCloth = new Lt(Eh, Zt({ vertexColors: !0 }, { NO_SNOW: "" }), 32);
    for (const s of [this.poles, this.flags, this.crops, this.fair, this.fairB, this.vexPole, this.vexCloth])
      s.instanceMatrix.setUsage(ue), s.frustumCulled = !1, s.castShadow = !0, s.receiveShadow = !0, s.count = 0, this.group.add(s);
    for (let s = 0; s < 256; s++) this.flags.setColorAt(s, new Qt("#ffffff"));
    for (let s = 0; s < 32; s++) this.vexCloth.setColorAt(s, new Qt("#ffffff"));
  }
  /** a malha (instanciada) de uma construção na era do dono; a paliçada e a muralha de tufo têm uma por desenho de vizinhos */
  mesh(t, a, s = -1) {
    const i = Math.max(0, s), o = t === "palisade" ? "palisade/" + i : t === "tufa" ? "tufa/" + (i & 15) : t + js(t, a);
    let n = this.meshes.get(o);
    return n || (n = new Lt(Hi(t, a, s), this.mat, t === "center" || t === "camp" ? 8 : t === "palisade" || t === "wall" || t === "tufa" ? 160 : 64), n.instanceMatrix.setUsage(ue), n.frustumCulled = !1, n.castShadow = !0, n.receiveShadow = !0, n.count = 0, this.meshes.set(o, n), this.group.add(n)), n;
  }
  /** atualiza tudo a partir do mundo (≈100 construções e as estradas: barato) */
  update(t, a, s, i = 0) {
    const o = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0, c = 0, d = 0;
    const h = t.size, f = t.explored[a];
    this.fires.length = 0, this.smokes.length = 0;
    const u = new Qt(), m = /* @__PURE__ */ new Set();
    this.roads || (this.roads = new Go(Wo(t.map.hstep), 1024), this.group.add(this.roads.group)), this.roads.begin();
    for (let v = 0; v < t.top; v++) {
      if (!t.alive[v] || t.kind[v] < ut) continue;
      const y = ct[t.kind[v] - ut], M = t.owner[v], k = t.x[v] / 256, x = t.z[v] / 256;
      if (s && M !== a && !f[Math.floor(x) * h + Math.floor(k)]) continue;
      const z = M >= 0 && M < t.players.length ? t.players[M].era : 0;
      if (y.key === "farm") {
        let H = this.farms.get(v);
        if (H && (H.x !== k || H.z !== x) && (this.group.remove(H.mesh), H.mesh.geometry.dispose(), H = void 0), !H) {
          const $ = new oa(bh(t.map, k, x), this.mat);
          $.receiveShadow = $.castShadow = !0, this.group.add($), H = { mesh: $, x: k, z: x }, this.farms.set(v, H);
        }
        if (H.mesh.visible = !0, m.add(v), t.done[v]) for (let $ = 0; $ < 4; $++) for (let P = 0; P < 9 && r < this.crops.instanceMatrix.count; P++) {
          const w = k - 1.25 + P * 0.31, D = x - 1.12 + $ * 0.75;
          this.crops.setMatrixAt(r++, p(w, zt(t.map, w, D) + 0.08, D, (P * 7 + $) % 6, 1, 0.85 + (P + $) % 3 * 0.12, 1));
        }
        continue;
      }
      const A = t.done[v] === 1, T = A ? 1 : Math.max(0.12, Math.min(1, t.work[v] / (y.time * 100)));
      if (y.estrada) {
        const H = t.x[v] >> 8, $ = t.z[v] >> 8;
        this.roads.add(t.map, H, $, B0(t, H, $), T);
        continue;
      }
      const C = this.mesh(y.key, z, y.key === "palisade" || y.key === "tufa" ? I0(t, v) : -1), I = o.get(C) ?? 0;
      if (I >= C.instanceMatrix.count) continue;
      const S = zt(t.map, k, x), O = js(y.key, z), B = gn(y.key, v);
      if (C.setMatrixAt(I, p(k, S - 0.02, x, B, 1, T, 1)), o.set(C, I + 1), y.key !== "farm" && !y.wall && A && n < 256) {
        const H = y.size / 2 - (vr[y.key] !== void 0 && (y.era >= 3 || O >= 3) ? vr[y.key] : 0.25), $ = k + H, P = x - H, w = yr[y.key] && (y.key !== "center" || O >= 3) ? yr[y.key] : 0, D = zt(t.map, $, P);
        this.poles.setMatrixAt(n, p($, D, P, 0, 1, 1 + w / 2, 1)), this.flags.setMatrixAt(n, p($, D + w, P, Math.sin(i * 1.1 + v) * 0.15)), this.flags.setColorAt(n, u.set(M === ze ? "#efe6cf" : t.players[M]?.color ?? "#888")), n++;
      }
      if (A && y.key === "military" && O >= 4 && d < 32) {
        const [H, $] = ta(0, P0, B);
        this.vexPole.setMatrixAt(d, p(k + H, S + 0.12, x + $, B)), this.vexCloth.setMatrixAt(d, p(k + H, S + 0.12, x + $, B + Math.sin(i * 1.3 + v) * 0.12)), this.vexCloth.setColorAt(d, u.set(t.players[M]?.color ?? "#888")), d++;
      }
      if (A && y.key === "forge") {
        const P = k + 0.45 * Math.cos(B) + 0.12 * Math.sin(B), w = x - 0.45 * Math.sin(B) + 0.12 * Math.cos(B), D = k + 0.55 * Math.cos(B) - 0.45 * Math.sin(B), j = x - 0.55 * Math.sin(B) - 0.45 * Math.cos(B);
        this.fires.push({ x: P, y: zt(t.map, P, w) + 0.1, z: w, s: 0.16 }), this.smokes.push({ x: D, y: zt(t.map, D, j) + 1.5, z: j, s: 0.6 });
      }
      if (A && y.market && t.feiraDe(M) && (y.troca ? c < 16 && this.fairB.setMatrixAt(c++, p(k, S - 0.02, x, B)) : l < 16 && this.fair.setMatrixAt(l++, p(k, S - 0.02, x, B))), A && (y.key === "center" && O < 3 || y.key === "camp")) {
        const H = z >= 1 && y.key === "center", $ = H ? k + 1.2 * Math.cos(B) + 1.3 * Math.sin(B) : k, P = H ? x - 1.2 * Math.sin(B) + 1.3 * Math.cos(B) : x;
        this.fires.push({ x: $, y: zt(t.map, $, P) + 0.15, z: P, s: z >= 1 && y.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: $, y: zt(t.map, $, P) + 0.3, z: P, s: 1 });
      } else if (A && ur[y.key]) {
        const H = ur[y.key], [$, P] = ta(H.f[0], H.f[2], B), [w, D] = ta(H.s[0], H.s[2], B);
        this.fires.push({ x: k + $, y: S - 0.02 + H.f[1], z: x + P, s: H.f[3] }), this.smokes.push({ x: k + w, y: S - 0.02 + H.s[1], z: x + D, s: H.s[3] });
      }
    }
    for (const v of this.meshes.values())
      v.count = o.get(v) ?? 0, v.instanceMatrix.needsUpdate = !0;
    this.roads.end();
    for (const [v, y] of this.farms) m.has(v) || (!t.alive[v] || t.kind[v] !== ut + Ot.farm ? (this.group.remove(y.mesh), y.mesh.geometry.dispose(), this.farms.delete(v)) : y.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.vexPole.count = this.vexCloth.count = d, this.vexPole.instanceMatrix.needsUpdate = this.vexCloth.instanceMatrix.needsUpdate = !0, this.vexCloth.instanceColor && (this.vexCloth.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0, this.fairB.count = c, this.fairB.instanceMatrix.needsUpdate = !0;
  }
}
class qh {
  constructor(t = 48) {
    g(this, "mesh");
    this.mesh = new Lt(new Po(0.32, 1, 6).translate(0, 0.5, 0), ei(new Va({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(ue), this.mesh.frustumCulled = !1;
    for (let a = 0; a < t; a++) this.mesh.setColorAt(a, new Qt(a % 2 ? "#ffd166" : "#ff7b2e"));
  }
  update(t, a) {
    let s = 0;
    const i = this.mesh.instanceMatrix.count;
    for (const o of t) {
      const n = 0.85 + Math.sin(a * 13 + o.x) * 0.12 + Math.sin(a * 29 + o.z) * 0.08;
      s < i && this.mesh.setMatrixAt(s++, p(o.x, o.y, o.z, a * 2 + o.x, o.s, o.s * 1.25 * n, o.s)), s < i && this.mesh.setMatrixAt(s++, p(o.x, o.y, o.z, -a * 3, o.s * 0.55, o.s * 0.85 * (2 - n), o.s * 0.55));
    }
    this.mesh.count = s, this.mesh.instanceMatrix.needsUpdate = !0;
  }
}
const Oh = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, Rh = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Bh {
  constructor(t, a = 500) {
    g(this, "n");
    g(this, "pos");
    g(this, "a");
    g(this, "sz");
    g(this, "colr");
    g(this, "age");
    g(this, "life");
    g(this, "vel");
    g(this, "grow");
    g(this, "next", 0);
    g(this, "acc", 0);
    g(this, "geo", new wa());
    g(this, "mat");
    g(this, "points");
    this.n = a, this.pos = new Float32Array(a * 3), this.a = new Float32Array(a), this.sz = new Float32Array(a).fill(1), this.colr = new Float32Array(a * 3), this.age = new Float32Array(a).fill(99), this.life = new Float32Array(a), this.vel = new Float32Array(a * 3), this.grow = new Float32Array(a), this.geo.setAttribute("position", new He(this.pos, 3).setUsage(ue)), this.geo.setAttribute("aA", new He(this.a, 1).setUsage(ue)), this.geo.setAttribute("aS", new He(this.sz, 1).setUsage(ue)), this.geo.setAttribute("aC", new He(this.colr, 3).setUsage(ue)), this.mat = new ln({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: Oh, fragmentShader: Rh }), this.points = new t0(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, a, s, i, o, n, r, l, c, d) {
    const h = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, a, s], h * 3), this.vel.set([i, o, n], h * 3), this.colr.set([d.r, d.g, d.b], h * 3), this.age[h] = 0, this.life[h] = r, this.sz[h] = l, this.grow[h] = c;
  }
  smoke(t, a) {
    this.acc += t;
    const s = new Qt(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const i of a) Math.random() < 0.5 && this.emit(i.x + (Math.random() - 0.5) * 0.2, i.y + 0.4, i.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, s);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, a, s, i) {
    const o = new Qt(0.62, 0.55, 0.45), n = i ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * me, c = (i ? 1.4 : 0.7) * (0.4 + Math.random());
      this.emit(t, a + 0.2, s, Math.cos(l) * c, 0.3 + Math.random() * 0.6, Math.sin(l) * c, 0.9 + Math.random() * 0.6, i ? 1.4 : 0.8, 1.2, o);
    }
  }
  update(t) {
    for (let a = 0; a < this.n; a++) {
      if (this.age[a] > this.life[a]) {
        this.a[a] = 0;
        continue;
      }
      this.age[a] += t;
      const s = this.age[a] / this.life[a], i = 1 - Math.min(0.9, t * 1.5);
      this.vel[a * 3] *= i, this.vel[a * 3 + 2] *= i, this.pos[a * 3] += this.vel[a * 3] * t, this.pos[a * 3 + 1] += this.vel[a * 3 + 1] * t, this.pos[a * 3 + 2] += this.vel[a * 3 + 2] * t, this.a[a] = Math.sin(Math.min(s, 1) * Math.PI) * 0.4, this.sz[a] = this.sz[a] + this.grow[a] * t / this.life[a] * 0.5;
    }
    for (const a of ["position", "aA", "aS", "aC"]) this.geo.attributes[a].needsUpdate = !0;
  }
}
const xi = {
  spear: { a: 1.7, y: 1.1, arc: 0.18, fica: 0.35, som: "spear.hit" },
  arrow: { a: 0.75, y: 0.88, arc: 0.1, fica: 0.35, som: "arrow.hit" },
  stone: { a: 0.3, y: 1.55, arc: 0.07, fica: 0.03, som: "stone.hit" },
  bolt: { a: 0.62, y: 0.92, arc: 0.04, fica: 0.35, som: "arrow.hit" },
  // o virote sai da calha do escorpião, quase reto
  boulder: { a: 0.9, y: 0.98, arc: 0.16, fica: 0.05, som: "stone.hit" }
  // a pedra grande sai da calha da balista, em arco alto
}, xr = ["spear", "arrow", "stone", "bolt", "boulder"];
class Nh {
  constructor() {
    g(this, "group", new as());
    g(this, "meshes", {});
    g(this, "list", []);
    /** chamado quando algo chega ao alvo (a cena levanta poeira onde a pedra grande bate) */
    g(this, "impacto", null);
    g(this, "ray", new Qr());
    g(this, "ta", new Et());
    g(this, "tb", new Et());
    g(this, "tc", new Et());
    g(this, "th", new Et());
    const t = {
      spear: lt((s) => {
        s.add("cyl5", "#7a5a3c", p(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), s.add("cone4", "#b9b4aa", p(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
      }).rotateX(Math.PI / 2),
      arrow: lt((s) => {
        s.add("cyl5", "#8a6a48", p(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), s.add("cone4", "#b9b4aa", p(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), s.add("box", "#e8e2d4", p(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), s.add("box", "#e8e2d4", p(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
      }).rotateX(Math.PI / 2),
      stone: lt((s) => s.add("dode", "#8f8a80", p(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)),
      // pedra da funda (a frente na origem)
      bolt: T0,
      boulder: $0
    }, a = Zt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const s of xr) {
      const i = new Lt(t[s], a, s === "boulder" ? 48 : 96);
      i.instanceMatrix.setUsage(ue), i.frustumCulled = !1, i.castShadow = !0, i.count = 0, this.meshes[s] = i, this.group.add(i);
    }
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, a, s, i, o, n, r, l, c, d, h) {
    const f = xi[r] ?? xi.arrow;
    if (r === "spear" && l < _o) return;
    let u, m, v;
    if (c >= ut) {
      const S = t.alive[d] ? this.hitBuilding(t, d, a, s) : null;
      S ? (u = S.x, m = S.z, v = S.y) : (u = i, m = o, v = zt(t.map, i, o) + 0.08);
    } else {
      const S = Math.hypot(i - a, o - s) || 1, O = S - (Z[c]?.radius ?? 0.3) * 0.8;
      u = a + (i - a) / S * O, m = s + (o - s) / S * O, v = zt(t.map, u, m) + C0(c);
    }
    const y = Math.hypot(u - a, m - s) || 1, M = (u - a) / y, k = (m - s) / y;
    let x = h !== void 0 ? 0.9 : f.a;
    if (h === void 0) for (let S = 0.1; S < Math.min(x + 0.4, y - 0.3); S += 0.1) {
      const O = t.bAt[Math.floor(s + k * S) * t.size + Math.floor(a + M * S)] - 1;
      if (O >= 0 && O !== d && t.isBuilding(O) && ct[t.kind[O] - ut].wall) {
        x = Math.max(0.1, Math.min(x, S - 0.45));
        break;
      }
    }
    if (y - x < 0.15) return;
    const z = a + M * x, A = s + k * x, T = h !== void 0 ? zt(t.map, a, s) + h : zt(t.map, z, A) + f.y;
    let C = (y - x) * f.arc;
    const I = y - x;
    for (let S = 0.15; S < I - 0.3; S += 0.15) {
      const O = S / I, B = z + M * S, H = A + k * S, $ = t.bAt[Math.floor(H) * t.size + Math.floor(B)] - 1;
      if ($ < 0 || $ === d || !t.isBuilding($) || !ct[t.kind[$] - ut].wall) continue;
      const P = zt(t.map, B, H) + (ct[t.kind[$] - ut].key === "tufa" ? Ua + 0.4 : 1.6) - (T + (v - T) * O), w = Math.sin(O * Math.PI);
      w > 0.05 && P > C * w && (C = P / w);
    }
    this.list.push({ x0: z, z0: A, y0: T, x1: u, z1: m, y1: v, arc: C, t: 0, dur: Math.max(0.15, n / 10), kind: r });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, a, s, i) {
    const o = ct[t.kind[a] - ut], n = N0(t, a), r = n.attributes.position.array, l = t.done[a] ? 1 : Math.max(0.12, Math.min(1, t.work[a] / (o.time * 100))), c = t.x[a] / 256, d = t.z[a] / 256, h = zt(t.map, c, d) - 0.02, f = gn(o.key, a), u = s - c, m = i - d, v = Math.cos(f), y = Math.sin(f), M = u * v - m * y, k = u * y + m * v, x = Math.hypot(M, k) || 1, z = -M / x, A = -k / x, T = -A, C = z;
    let I = 0, S = 0, O = 0, B = !1;
    for (const H of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let $ = 1 / 0;
      for (const P of [0.9, 0.6, 0.35]) {
        const w = M + T * H, D = k + C * H, j = -(w * z + D * A);
        this.ray.origin.set(w, P / l, D), this.ray.direction.set(z, 0, A);
        for (let E = 0; E + 8 < r.length; E += 9) {
          if (this.ta.set(r[E], r[E + 1], r[E + 2]), this.tb.set(r[E + 3], r[E + 4], r[E + 5]), this.tc.set(r[E + 6], r[E + 7], r[E + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const N = this.th.distanceTo(this.ray.origin);
          N > j + 0.1 || N >= $ || ($ = N, I = this.th.x + z * 0.05, S = this.th.y, O = this.th.z + A * 0.05);
        }
      }
      if ($ < 1 / 0) {
        B = !0;
        break;
      }
    }
    return B ? { x: c + I * v + O * y, y: h + S * l, z: d - I * y + O * v } : null;
  }
  update(t) {
    const a = { spear: 0, arrow: 0, stone: 0, bolt: 0, boulder: 0 }, s = [], i = new bs(), o = new bs(), n = new Et(), r = new Et(1, 1, 1), l = new Et(), c = new Et(0, 0, 1), d = new le();
    for (const h of this.list) {
      const f = xi[h.kind] ?? xi.arrow;
      if (h.t += t, !h.hit && h.t >= h.dur && (h.hit = !0, _e.emit(f.som, h.x1, h.z1), this.impacto?.(h.x1, h.y1, h.z1, h.kind)), h.t > h.dur + f.fica) continue;
      const u = this.meshes[h.kind] ?? this.meshes.arrow, m = a[h.kind] ?? 0;
      if (m >= u.instanceMatrix.count) continue;
      s.push(h);
      const v = Math.min(1, h.t / h.dur);
      n.set(h.x0 + (h.x1 - h.x0) * v, h.y0 + (h.y1 - h.y0) * v + Math.sin(v * Math.PI) * h.arc, h.z0 + (h.z1 - h.z0) * v), l.set(h.x1 - h.x0, h.y1 - h.y0 + Math.cos(v * Math.PI) * h.arc * Math.PI, h.z1 - h.z0).normalize(), i.setFromUnitVectors(c, l), h.kind === "boulder" && i.multiply(o.setFromAxisAngle(c, h.t * 7)), u.setMatrixAt(m, d.compose(n, i, r)), a[h.kind] = m + 1;
    }
    this.list = s;
    for (const h of xr)
      this.meshes[h].count = a[h], this.meshes[h].instanceMatrix.needsUpdate = !0;
  }
}
const Dh = (e, t, a) => e + (t - e) * a, Fh = (e, t, a) => {
  const s = Math.min(1, Math.max(0, (a - e) / (t - e)));
  return s * s * (3 - 2 * s);
};
class Lh {
  constructor(t, a, s, i) {
    g(this, "cam");
    g(this, "x");
    g(this, "z");
    g(this, "yaw");
    g(this, "dist");
    g(this, "tx");
    g(this, "tz");
    g(this, "tyaw");
    g(this, "tdist");
    g(this, "minD", 14);
    g(this, "maxD", 110);
    this.map = t, this.cam = new Gl(42, 1, 0.5, 900), this.x = this.tx = a, this.z = this.tz = s, this.yaw = this.tyaw = i, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return Dh(0.66, 1.12, Fh(this.minD, this.maxD, t));
  }
  update(t) {
    const a = 1 - Math.exp(-t * 9), s = this.map.size;
    this.tx = Math.min(s - 8, Math.max(8, this.tx)), this.tz = Math.min(s - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * a, this.z += (this.tz - this.z) * a, this.yaw += (this.tyaw - this.yaw) * a, this.dist += (this.tdist - this.dist) * a;
    const i = this.pitch(), o = Math.max(zt(this.map, this.x, this.z), 0), n = Math.cos(i) * this.dist;
    this.cam.position.set(this.x + Math.sin(this.yaw) * n, o + Math.sin(i) * this.dist, this.z + Math.cos(this.yaw) * n), this.cam.lookAt(this.x, o + 0.6, this.z), this.cam.updateMatrixWorld();
  }
  /** arrasta a câmera em pixels de tela */
  pan(t, a, s) {
    const i = this.pitch(), o = 0.77 * this.dist / s, n = Math.cos(this.yaw), r = -Math.sin(this.yaw), l = -Math.sin(this.yaw), c = -Math.cos(this.yaw);
    this.tx += (-t * n + a * l / Math.sin(i)) * o, this.tz += (-t * r + a * c / Math.sin(i)) * o;
  }
  setAspect(t, a) {
    this.cam.aspect = t / a, this.cam.fov = t / a < 1 ? 55 : 42, this.cam.updateProjectionMatrix();
  }
  /** posição no chão sob um ponto da tela (marcha ao longo do raio e refina) */
  ground(t, a, s, i) {
    const o = new Et(t / s * 2 - 1, -(a / i) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = o.sub(n).normalize();
    let l = 0, c = 0;
    const d = this.map.size;
    for (let h = 0; h < 400; h++) {
      l += 0.6 + l * 0.01;
      const f = n.x + r.x * l, u = n.y + r.y * l, m = n.z + r.z * l;
      if (f < -20 || m < -20 || f > d + 20 || m > d + 20 || l > 900) return null;
      if (u <= Math.max(zt(this.map, f, m), -0.1)) {
        let v = c, y = l;
        for (let M = 0; M < 12; M++) {
          const k = (v + y) / 2;
          n.y + r.y * k <= Math.max(zt(this.map, n.x + r.x * k, n.z + r.z * k), -0.1) ? y = k : v = k;
        }
        return new Et(n.x + r.x * y, n.y + r.y * y, n.z + r.z * y);
      }
      c = l;
    }
    return null;
  }
  toScreen(t, a, s, i, o, n) {
    n.set(t, a, s).project(this.cam);
    const r = n.z < 1;
    return n.set((n.x + 1) / 2 * i, (1 - n.y) / 2 * o, r ? 1 : 0), n;
  }
}
const Mr = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], kr = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], zr = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class _h {
  constructor(t) {
    g(this, "c", {});
    g(this, "n", {});
    g(this, "w", [0, 0, 0]);
    g(this, "tmp", new Qt());
    const a = Mr[t];
    for (const s of kr) this.c[s] = Re(a[s]);
    for (const s of zr) this.n[s] = a[s];
    this.w = [...a.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, a, s) {
    const i = Mr[a], o = 1 - Math.exp(-t * 0.3);
    for (const l of kr) this.c[l].lerp(this.tmp.set(i[l]), o);
    for (const l of zr) this.n[l] += (i[l] - this.n[l]) * o;
    for (let l = 0; l < 3; l++) this.w[l] += (i.w[l] - this.w[l]) * o;
    const n = this.c, r = this.n;
    Ut.uGrassA.value.copy(n.grassA), Ut.uGrassB.value.copy(n.grassB), Ut.uLeafColor.value.copy(n.leaf), Ut.uCropColor.value.copy(n.cropC), Ut.uLeaf.value = r.leafAmt, Ut.uCrop.value = r.crop, Ut.uFlower.value = r.flower, Ut.uSnow.value = r.snow, Ut.uFruit.value = Math.max(0, 1 - r.snow * 1.6), Ut.uShallow.value.copy(n.sh), Ut.uDeep.value.copy(n.dp), s.sun.color.copy(n.sun), s.sun.intensity = r.sunI, s.hemi.color.copy(n.hS), s.hemi.groundColor.copy(n.hG), s.hemi.intensity = r.hI, s.sky.uniforms.uTop.value.copy(n.top), s.sky.uniforms.uHor.value.copy(n.hor), s.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const jh = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, Hh = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Uh {
  constructor(t, a = 1) {
    g(this, "group", new as());
    g(this, "list");
    this.map = t, this.list = [
      this.make(Math.round(1500 * a), 0.55, "#ffffff", "#e8eef6", 2.2, 0.4, 30),
      // neve
      this.make(Math.round(220 * a), 0.85, "#d9772f", "#b8452a", 0.9, 1.4, 11),
      // folhas
      this.make(Math.round(110 * a), 0.62, "#f49ac0", "#e2709c", 0.6, 1.1, 6)
      // pétalas (bem rosadas, para não parecer neve)
    ];
  }
  make(t, a, s, i, o, n, r) {
    t = Math.max(1, t);
    const l = new Float32Array(t * 3), c = new Float32Array(t), d = new Float32Array(t), h = new Float32Array(t);
    for (let v = 0; v < t; v++)
      l[v * 3] = (Math.random() - 0.5) * 90, l[v * 3 + 1] = -999, l[v * 3 + 2] = (Math.random() - 0.5) * 90, c[v] = Math.random(), d[v] = Math.random() * 100, h[v] = 0.7 + Math.random() * 0.6;
    const f = new wa();
    f.setAttribute("position", new He(l, 3).setUsage(ue)), f.setAttribute("aK", new He(c, 1)), f.setAttribute("aS", new He(h, 1));
    const u = new ln({ transparent: !0, depthWrite: !1, uniforms: { uFow: Ut.uFow, uFowOn: Ut.uFowOn, uWorld: Ut.uWorld, uPR: { value: 1 }, uSize: { value: a }, uColA: { value: Re(s) }, uColB: { value: Re(i) }, uAmt: { value: 0 } }, vertexShader: jh, fragmentShader: Hh }), m = new t0(f, u);
    return m.frustumCulled = !1, m.renderOrder = 4, m.visible = !1, this.group.add(m), { p: m, pos: l, seed: d, n: t, use: t, fall: o, sway: n, m: u, hMax: r };
  }
  /** quantidade de partículas (qualidade gráfica) */
  setScale(t) {
    for (const a of this.list)
      a.use = Math.max(1, Math.round(a.n * t)), a.p.geometry.setDrawRange(0, a.use);
  }
  setPixelRatio(t) {
    for (const a of this.list) a.m.uniforms.uPR.value = t;
  }
  update(t, a, s, i, o) {
    this.list.forEach((n, r) => {
      if (n.m.uniforms.uAmt.value = s[r], s[r] < 0.01) {
        n.p.visible = !1;
        return;
      }
      n.p.visible = !0;
      for (let l = 0; l < n.use; l++) {
        const c = n.seed[l];
        let d = n.pos[l * 3], h = n.pos[l * 3 + 1], f = n.pos[l * 3 + 2];
        h -= n.fall * t * (0.7 + c % 1 * 0.6), d += (Math.sin(a + c) * n.sway + 0.4) * t, f += Math.cos(a * 0.8 + c) * n.sway * 0.5 * t;
        const u = d - i, m = f - o;
        u > 45 && (d -= 90), u < -45 && (d += 90), m > 45 && (f -= 90), m < -45 && (f += 90);
        const v = zt(this.map, d, f);
        (h < v || h > v + n.hMax + 4) && (h = v + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = d, n.pos[l * 3 + 1] = h, n.pos[l * 3 + 2] = f;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const us = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], Wh = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class D0 {
  constructor(t, a, s) {
    g(this, "renderer");
    g(this, "scene", new ec());
    g(this, "camera");
    g(this, "sun");
    g(this, "hemi");
    g(this, "sky");
    g(this, "skyMat");
    g(this, "nature");
    g(this, "units", new Xd());
    g(this, "buildings", new Ih());
    g(this, "flames", new qh());
    g(this, "particles");
    g(this, "projectiles", new Nh());
    g(this, "weather");
    g(this, "seasons");
    g(this, "fowTex");
    g(this, "fowData");
    g(this, "fogOn", !0);
    g(this, "ghost");
    g(this, "foot");
    g(this, "ghostKey", "");
    g(this, "pings", []);
    g(this, "pingI", 0);
    g(this, "rally");
    g(this, "rallyFlag");
    g(this, "shadowExt", 0);
    g(this, "lastFogTick", -1);
    g(this, "q", 0);
    g(this, "metalOn", !1);
    g(this, "silverOn", !1);
    // prévia do muro desenhado (D35): uma malha por desenho de bloco (a paliçada e a muralha de tufo mudam com os vizinhos);
    // a estrada (M3) tem as suas camadas (acompanham o chão)
    g(this, "wallGhosts", /* @__PURE__ */ new Map());
    g(this, "ghostMat", null);
    g(this, "ghostMatX", null);
    g(this, "roadGhost", null);
    g(this, "roadGhostX", null);
    this.world = a, this.me = s;
    const i = a.map, o = i.size;
    this.renderer = t, this.scene.fog = new Vl(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(o * o)), this.fowTex = new Kl(this.fowData, o, o, Xl, Yl), this.fowTex.magFilter = this.fowTex.minFilter = Jl, this.fowTex.needsUpdate = !0, Ut.uFow.value = this.fowTex, Ut.uWorld.value = o, this.skyMat = new ln({
      side: Zl,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: Re("#78ade0") }, uHor: { value: Re("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new oa(new Ri(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new Ql(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new tc(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(Id(i), qd(i)), this.nature = Bd(i), this.scene.add(this.nature.group);
    for (const c of this.nature.metal) c.visible = a.players[s].era >= 2;
    for (const c of this.nature.silver) c.visible = a.players[s].era >= Yt;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new Bh({ uFow: Ut.uFow, uFowOn: Ut.uFowOn, uWorld: Ut.uWorld }, 600), this.scene.add(this.particles.points), this.projectiles.impacto = (c, d, h, f) => {
      f === "boulder" && this.seen(c, h) && this.particles.puff(c, d - 0.2, h, !1);
    }, this.weather = new Uh(i), this.scene.add(this.weather.group), this.seasons = new _h(a.season), this.ghost = new oa(new wa(), new ws({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new oa(new Qi(1, 1).rotateX(-Math.PI / 2), new Va({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new Zr(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let c = 0; c < 4; c++) {
      const d = new oa(n, new Va({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      d.renderOrder = 6, d.visible = !1, this.scene.add(d), this.pings.push({ m: d, t: 0 });
    }
    this.rally = new as(), this.rally.add(new oa(new Ga(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new ws({ color: 7229239 }))), this.rallyFlag = new oa(new ge(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new Va({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = a.players[s].start, l = o / 2;
    this.camera = new Lh(i, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const a = new ac({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return a.outputColorSpace = Kr, a.toneMapping = sc, a.toneMappingExposure = 1.08, a.shadowMap.enabled = !0, a.shadowMap.type = ic, a;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const a of t.map.res) {
      const s = a.z * t.size + a.x;
      t.resKind[s] === 0 ? this.nature.removeRes(s) : t.resKind[s] === fe && t.resAmt[s] <= 0 && this.nature.setBerries(s, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const a = us[t], s = Math.min(window.devicePixelRatio || 1, a.pr);
    this.renderer.setPixelRatio(s), this.sun.castShadow = a.shadow > 0, a.shadow > 0 && this.sun.shadow.mapSize.x !== a.shadow && (this.sun.shadow.mapSize.set(a.shadow, a.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(a.trees, a.tufts), this.particles.mat.uniforms.uPR.value = s, this.weather.setPixelRatio(s), this.weather.setScale(a.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, a) {
    this.renderer.setSize(t, a, !1), this.camera.setAspect(t, a);
  }
  setFog(t) {
    this.fogOn = t, Ut.uFowOn.value = t ? 1 : 0;
  }
  seen(t, a) {
    if (!this.fogOn) return !0;
    const s = this.world.size, i = Math.floor(t), o = Math.floor(a);
    return i >= 0 && o >= 0 && i < s && o < s && this.world.vis[this.me][o * s + i] === 1;
  }
  /** acontecimentos da simulação que mudam a cena */
  consume(t) {
    const a = this.world, s = a.map;
    for (const i of t) switch (i.t) {
      case "tree":
        this.nature.removeTree(i.k);
        break;
      case "res": {
        const o = i.k;
        a.resKind[o] === 0 ? this.nature.removeRes(o) : a.resKind[o] === fe && this.nature.setBerries(o, a.resAmt[o] > 0);
        break;
      }
      case "death":
        if (i.kind < ut) {
          const o = i.x / 256, n = i.z / 256;
          this.seen(o, n) && this.particles.puff(o, zt(s, o, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const o = a.x[i.e] / 256, n = a.z[i.e] / 256;
        this.seen(o, n) && this.particles.puff(o, zt(s, o, n), n, !0);
        break;
      }
      case "proj": {
        const o = i.x0 / 256, n = i.z0 / 256, r = i.x1 / 256, l = i.z1 / 256;
        (this.seen(o, n) || this.seen(r, l)) && this.projectiles.add(a, o, n, r, l, i.ticks, i.kind, i.gap / 256, i.tk, i.te, i.h);
        break;
      }
      case "age":
        if (i.player === this.me && i.era >= 2) for (const o of this.nature.metal) o.visible = !0;
        if (i.player === this.me && i.era >= Yt) for (const o of this.nature.silver) o.visible = !0;
        break;
    }
  }
  /** prévia do muro (ou da estrada): um bloco por tile, na ordem do desenho. Verde onde dá para construir, vermelho onde não dá;
   *  os blocos depois de `drawn` (a linha reta até o cursor, ainda não posta) ficam mais claros. key: o que se desenha
   *  (sem ela, o muro da era: paliçada, muralha de pedra ou de tufo) */
  setWallGhost(t, a = [], s = t?.length ?? 0, i) {
    for (const m of this.wallGhosts.values()) m.count = 0;
    this.roadGhost?.begin(), this.roadGhostX?.begin();
    const o = this.world, n = o.size, r = o.players[this.me].era, l = new Qt(), c = new Set(t ?? []), d = i ?? o.muroDaEra(r) ?? "palisade", h = (m) => l.set(a[m] ? m < s ? "#c6ffd4" : "#f4fff6" : "#ff8f80");
    if (t?.length && d === "road") {
      this.roadGhost || (this.roadGhost = new Go(Wo(o.map.hstep, { transparent: !0, opacity: 0.66, depthWrite: !1 }, { NO_SNOW: "" }), Ue * 2, !0, 7), this.roadGhostX = new Go(Wo(o.map.hstep, { transparent: !0, opacity: 0.55, depthWrite: !1, depthTest: !1 }, { NO_SNOW: "" }), Ue * 2, !0, 8), this.scene.add(this.roadGhost.group, this.roadGhostX.group));
      for (let m = 0; m < t.length; m++) {
        const v = t[m], y = v % n, M = Math.floor(v / n);
        (a[m] ? this.roadGhost : this.roadGhostX).add(o.map, y, M, B0(o, y, M, c), 1, h(m));
      }
    }
    if (this.roadGhost?.end(), this.roadGhostX?.end(), !t?.length || d === "road") return;
    this.ghostMat ?? (this.ghostMat = new ws({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghostMatX ?? (this.ghostMatX = new ws({ vertexColors: !0, transparent: !0, opacity: 0.55, depthWrite: !1, depthTest: !1, flatShading: !0 }));
    const f = (m) => {
      const v = o.bAt[m] - 1;
      return v >= 0 && o.isBuilding(v) && o.owner[v] === this.me && o.bdef(v).wall;
    }, u = (m) => {
      const v = o.bAt[m] - 1;
      return f(m) && o.bdef(v).key !== "palisade";
    };
    for (let m = 0; m < t.length; m++) {
      const v = t[m], y = v % n, M = Math.floor(v / n), k = y + 0.5, x = M + 0.5;
      let z = -1;
      if (d === "palisade" || d === "tufa") {
        z = 0;
        const C = (I, S, O) => {
          if (I < 0 || S < 0 || I >= n || S >= n) return;
          const B = S * n + I;
          (c.has(B) || f(B)) && (z |= O), !c.has(B) && u(B) && (z |= O << 4);
        };
        C(y + 1, M, 1), C(y - 1, M, 2), C(y, M + 1, 4), C(y, M - 1, 8), d === "tufa" && (z &= 15);
      }
      const A = (d === "palisade" || d === "tufa" ? d + "/" + z : d + js(d, r)) + (a[m] ? "" : "/x");
      let T = this.wallGhosts.get(A);
      T || (T = new Lt(d === "tufa" ? mh(z) : Hi(d, r, z), a[m] ? this.ghostMat : this.ghostMatX, Ue * 2), T.renderOrder = a[m] ? 7 : 8, T.frustumCulled = !1, T.count = 0, this.wallGhosts.set(A, T), this.scene.add(T)), !(T.count >= Ue * 2) && (T.setMatrixAt(T.count, new le().makeTranslation(k, zt(o.map, k, x), x)), T.setColorAt(T.count, h(m)), T.count++);
    }
    for (const m of this.wallGhosts.values())
      m.instanceMatrix.needsUpdate = !0, m.instanceColor && (m.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, a = 0, s = 0, i = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const o = ct[Ot[t]], n = this.world.players[this.me].era, r = t + js(t, n);
    r !== this.ghostKey && (this.ghost.geometry = Hi(t, n), this.ghostKey = r);
    const l = a + o.size / 2, c = s + o.size / 2, d = zt(this.world.map, l, c);
    this.ghost.position.set(l, d, c), this.ghost.visible = !0, this.ghost.material.color.set(i ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, d + 0.12, c), this.foot.scale.set(o.size, 1, o.size), this.foot.visible = !0, this.foot.material.color.set(i ? "#6fe08a" : "#e0533c");
  }
  ping(t, a, s) {
    const i = this.pings[this.pingI++ % this.pings.length];
    i.t = 0.7, i.m.position.set(t, zt(this.world.map, t, a) + 0.08, a), i.m.material.color.set(Wh[s]), i.m.visible = !0;
  }
  render(t, a, s, i) {
    const o = this.world, n = this.camera;
    Ut.uTime.value = i, n.update(t), this.seasons.update(t, o.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
    const r = 2.25, l = this.seasons.elev;
    this.sun.position.set(n.x + Math.cos(r) * Math.cos(l) * 120, Math.sin(l) * 120, n.z + Math.sin(r) * Math.cos(l) * 120), this.sun.target.position.set(n.x, 0, n.z), this.sun.target.updateMatrixWorld();
    const c = Math.round(Math.min(90, Math.max(28, n.dist * 0.95)) / 4) * 4;
    if (c !== this.shadowExt) {
      this.shadowExt = c;
      const u = this.sun.shadow.camera;
      u.left = -c, u.right = c, u.top = c, u.bottom = -c, u.near = 1, u.far = 300, u.updateProjectionMatrix();
    }
    this.sky.position.copy(n.cam.position), this.updateFog();
    const d = o.players[this.me].era >= 2, h = o.players[this.me].era >= Yt;
    if (d !== this.metalOn) {
      this.metalOn = d;
      for (const u of this.nature.metal) u.visible = d;
    }
    if (h !== this.silverOn) {
      this.silverOn = h;
      for (const u of this.nature.silver) u.visible = h;
    }
    this.buildings.update(o, this.me, this.fogOn, i), this.units.update(o, a, t, s, this.me, this.fogOn, i, n.cam.quaternion), this.flames.update(this.buildings.fires, i), this.particles.smoke(t, this.buildings.smokes), this.particles.update(t), this.projectiles.update(t), this.weather.update(t, i, this.seasons.w, n.x, n.z);
    for (const u of this.pings) if (u.t > 0) {
      u.t -= t;
      const m = 1 - Math.max(0, u.t) / 0.7;
      u.m.scale.setScalar(1.4 - m * 0.8), u.m.material.opacity = Math.max(0, 1 - m), u.t <= 0 && (u.m.visible = !1);
    }
    let f = -1;
    if (s.size === 1) {
      const u = s.values().next().value;
      o.isBuilding(u) && o.owner[u] === this.me && o.rallyX[u] >= 0 && (f = u);
    }
    if (f >= 0) {
      const u = o.rallyX[f] / 256, m = o.rallyZ[f] / 256;
      this.rally.position.set(u, zt(o.map, u, m), m), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(i * 1.4) * 0.2, this.rallyFlag.material.color.set(o.players[this.me].color);
    } else this.rally.visible = !1;
    this.renderer.render(this.scene, n.cam);
  }
  updateFog(t = !1) {
    const a = this.world;
    if (!t && a.tick === this.lastFogTick) return;
    this.lastFogTick = a.tick;
    const s = a.vis[this.me], i = a.explored[this.me], o = this.fowData;
    for (let n = 0; n < o.length; n++) o[n] = s[n] ? 255 : i[n] ? 128 : 0;
    this.fowTex.needsUpdate = !0;
  }
  /** libera a memória da placa de vídeo ao sair da partida */
  dispose() {
    this.scene.traverse((t) => {
      const a = t;
      a.geometry && a.geometry.dispose();
      const s = a.material;
      Array.isArray(s) ? s.forEach((i) => i.dispose()) : s?.dispose();
    }), this.fowTex.dispose(), this.sun.shadow.map?.dispose(), this.renderer.renderLists.dispose();
  }
}
const F0 = {
  "res.food": "Food",
  "res.wood": "Wood",
  "res.stone": "Stone",
  "res.metal": "Metal",
  "res.coins": "Coins",
  "res.pop": "Population",
  "pop.tip": "Population: {n} of {cap} (this era allows up to {max})",
  "era.0": "Stone Age",
  "era.1": "Neolithic",
  "era.2": "Age of Metals",
  "era.3": "Kingdom",
  "era.4": "Republic",
  "era.5": "Empire",
  "era.1.to": "the Neolithic",
  "era.2.to": "the Age of Metals",
  "era.3.to": "the Kingdom",
  "era.4.to": "the Republic",
  "era.5.to": "the Empire",
  "era.1.in": "the Neolithic",
  "era.2.in": "the Age of Metals",
  "era.3.in": "the Kingdom",
  "era.4.in": "the Republic",
  "era.5.in": "the Empire",
  "season.0": "Spring",
  "season.1": "Summer",
  "season.2": "Autumn",
  "season.3": "Winter",
  "cal.year": "Year {y}",
  "tribe.0": "Red tribe",
  "tribe.1": "Blue tribe",
  "tribe.2": "Yellow tribe",
  "tribe.3": "Purple tribe",
  "tribe.6": "Barbarians",
  "tribe.wild": "Wild animal",
  "tribe.you": "Your tribe",
  "unit.villager": "Gatherer",
  "unit.warrior": "Club Warrior",
  "unit.hunter": "Hunter",
  "unit.dog": "Dog",
  "unit.axeman": "Axe Warrior",
  "unit.archer": "Archer",
  "unit.spearman": "Spearman",
  "unit.deer": "Deer",
  "unit.boar": "Wild Boar",
  "unit.wolf": "Wolf",
  "unit.aurochs": "Aurochs",
  "unit.barbarian": "Barbarian",
  "unit.carcass": "Hunted game",
  "unit.villager.d": "Gathers food, wood and stone, hunts and builds.",
  "unit.warrior.d": "Basic fighter with a club.",
  "unit.hunter.d": "Throws spears from afar.",
  "unit.dog.d": "Fast scout that sees far.",
  "unit.axeman.d": "Stronger fighter with a stone axe.",
  "unit.archer.d": "Shoots arrows from afar.",
  "unit.spearman.d": "Strong against animals and horsemen.",
  "unit.deer.d": "Runs away when hit. {food} food.",
  "unit.boar.d": "Fights back! {food} food.",
  "unit.wolf.d": "Dangerous. Hunts people who come close.",
  "unit.aurochs.d": "Huge and strong. {food} food.",
  "unit.barbarian.d": "Attacks every tribe.",
  "unit.carcass.d": "Gatherers can take {food} food from it.",
  "bld.center": "Village Center",
  "bld.house": "House",
  "bld.depot": "Storehouse",
  "bld.military": "Training Ground",
  "bld.farm": "Wheat Field",
  "bld.pen": "Sheep Pen",
  "bld.sanctuary": "Shrine",
  "bld.camp": "Barbarian Camp",
  "bld.center.d": "Trains gatherers and receives resources. Advance to the next era here.",
  "bld.house.d": "Room for {n} more people.",
  "bld.depot.d": "Gatherers drop resources here. Build it near trees or stone.",
  "bld.military.d": "Trains warriors.",
  "bld.farm.d": "One gatherer farms it. Gives food all year, except in winter.",
  "bld.pen.d": "The sheep give food by themselves (not in winter).",
  "bld.sanctuary.d": "Slowly heals your people nearby.",
  "bld.camp.d": "Destroy it to take its loot.",
  "do.idle": "Waiting for orders",
  "do.forage": "Looking for food",
  "do.move": "Walking",
  "do.wood": "Cutting wood",
  "do.berry": "Picking berries",
  "do.stone": "Mining stone",
  "do.metal": "Mining metal",
  "do.farm": "Farming",
  "do.meat": "Taking the meat",
  "do.hunt": "Hunting",
  "do.build": "Building",
  "do.fight": "Fighting",
  "do.return": "Carrying {n} {res} home",
  "do.amove": "Marching",
  "do.flee": "Running away!",
  "msg.fuga": "Your gatherers are running from enemies!",
  "info.hp": "Health",
  "info.building": "Under construction",
  "info.queue": "Training",
  "info.food": "Food",
  "info.farmer": "Farmer: {who}",
  "info.yes": "working",
  "info.no": "nobody — send a gatherer",
  "sel.none": "Nothing selected",
  "sel.many": "{n} selected",
  "sel.clear": "Clear selection",
  "cmd.build": "Build",
  "cmd.back": "Back",
  "cmd.stop": "Stop",
  "cmd.food": "Find food",
  "cmd.food.d": "The gatherer looks for food by itself and does not stand still: meat on the ground, free fields and berries. In winter fields and berries rest, so it goes hunting deer.",
  "cmd.food.off": "On: this gatherer looks for food by itself. Press again to turn it off.",
  "cmd.rally": "Gather point",
  "cmd.ageup": "Advance to {era}",
  "cmd.aging": "Advancing to {era}…",
  "cmd.cancelQueue": "Cancel the last one",
  "cmd.place": "Build here",
  "cmd.cancel": "Cancel",
  "why.cost": "Not enough {res}.",
  "why.pop": "Build more houses to train more people.",
  "why.popEra": "Population limit of this era reached.",
  "why.queue": "The line is full (5).",
  "why.age": "First build 2 different kinds of buildings of this era ({n}/2).",
  "why.ageBusy": "Already advancing.",
  "why.villager": "Select a gatherer to build.",
  "why.era": "Available in {era}.",
  "why.maxEra": "More eras are coming in the next updates.",
  "why.done": "Wait until it is built.",
  "place.mouse": "Click where to build · right-click to cancel · hold Shift to build more",
  "place.touch": "Tap where to build, then confirm",
  "place.bad": "Can't build there.",
  "rally.hint": "Tap where the new people should go",
  "rally.set": "Gather point set.",
  "btn.idle": "Idle",
  "btn.army": "Army",
  "btn.home": "Home",
  "btn.fog": "Fog",
  "btn.help": "Help",
  "btn.menu": "Menu",
  "q.high": "High",
  "q.medium": "Medium",
  "q.low": "Low",
  "q.auto": "Graphics set to {q} ({fps} fps)",
  "q.label": "Graphics",
  "hint.mouse": "Left-click to select · right-click on a tree, bush, animal or the ground to give an order · drag to select many · WASD to move the view · wheel to zoom · Q/E to rotate",
  "hint.touch": "Tap to select · then tap a tree, bush, animal or the ground to give an order · drag to move the view · hold and drag to select many · pinch to zoom",
  "msg.built": "{b} is ready.",
  "msg.hunger": "Hunger! There was not enough food for the winter: your people work slower.",
  "msg.spring": "Spring: fields and bushes give food again.",
  "msg.winter": "Winter: every person eats {n} food each month. Fields and berries rest.",
  "msg.winterSoon": "Winter starts next month. Store food!",
  "msg.underAttack": "We are under attack!",
  "msg.campLoot": "Barbarian camp destroyed: +200 food and +150 wood!",
  "msg.centerLost": "Our Village Center was destroyed!",
  "msg.centerDanger": "Our Village Center is falling! Defend it or the tribe loses.",
  "msg.popEra": "Population limit of this era reached.",
  "msg.popHouses": "Build more houses so your tribe can grow.",
  "msg.raidSoon": "Barbarians are coming!",
  "msg.defeated": "{p} was defeated.",
  "msg.youDefeated": "Your tribe was defeated.",
  "msg.ageMe": "Your tribe entered {era}!",
  "msg.ageOther": "{p} entered {era}.",
  "msg.go": "See",
  "menu.tagline": "From the Stone Age to the height of Rome",
  "menu.continue": "Continue",
  "menu.saved": "{era} · year {y} · {r} rivals",
  "menu.new": "New game",
  "menu.rivals": "Rival tribes",
  "menu.difficulty": "Difficulty",
  "diff.0": "Easy",
  "diff.1": "Normal",
  "diff.2": "Hard",
  "menu.start": "Start",
  "menu.back": "Back",
  "menu.credits": "Made by Bento, Jojô and Pai",
  "menu.local": "Your game is saved on this device.",
  "acct.checking": "Checking your account…",
  "acct.looking": "Looking for the saved game of this account…",
  "acct.yours": "Your account",
  "acct.savesHere": "Your game is saved in this account (and on this device).",
  "acct.switch": "See code or switch account",
  "acct.none": "No account",
  "acct.deviceOnly": "Your game is saved only on this device.",
  "acct.login": "Sign in or create an account",
  "acct.why": "With an account, you can continue on another device.",
  "acct.otherHint": "The game of the account {name} is saved in it. Sign in to continue it.",
  "save.inAccount": "Saved in the account {name}",
  "save.deviceOnly": "Saved only on this device",
  "save.adopt": "Game from this device, without an account: it moves to the account {name}",
  "new.inAccount": "The new game will be saved in the account {name}.",
  "new.deviceOnly": "The new game will be saved only on this device.",
  "new.replaces": "It takes the place of the saved game.",
  "acct.pauseAccount": "Saving in the account {name}.",
  "acct.pauseNone": "No account: saving only on this device.",
  "acct.pauseLogin": "Sign in to save in an account",
  "acct.pauseOther": "This game belongs to the account {name}. Sign in to it to save online; for now it is saved on this device.",
  "acct.pauseAdopt": "When you save, this game moves to the account {name}.",
  "pause.saving": "Saving…",
  "pause.savedBoth": "Saved in the account {name} and on this device.",
  "pause.savedLocalOnly": "Saved on this device. The account {name} did not answer; it will try again.",
  "pause.savedOther": "Saved on this device. This game belongs to the account {name}.",
  "pause.savedCloudOnly": "Saved in the account {name}. It did not fit on this device.",
  "pause.title": "Paused",
  "pause.resume": "Back to the game",
  "pause.save": "Save the game",
  "pause.saved": "Saved on this device.",
  "pause.saveFail": "Couldn't save on this device.",
  "pause.quit": "Save and leave",
  "pause.time": "{m} minutes played",
  "end.victory": "Victory!",
  "end.victory.d": "All rival tribes were defeated. Your people will be remembered.",
  "end.defeat": "Defeat",
  "end.defeat.d": "Your Village Center fell and your tribe was defeated. Try again!",
  "end.watch": "Keep watching",
  "end.menu": "Back to the menu",
  "help.title": "How to play",
  "help.close": "Back to the game",
  "help.goal": "Goal: grow your tribe, survive the winters and destroy the Village Center of each rival tribe. If your Village Center falls, you lose. Reach the Neolithic to farm the land.",
  "help.l1": "Select gatherers and send them to berries, trees, stone or animals: they bring everything home by themselves.",
  "help.l2": "Build houses to grow, a storehouse near the trees and a training ground for warriors.",
  "help.l5.touch": "Touch and hold an icon to see its name and what it does.",
  "help.l5.mouse": "Rest the mouse on an icon to see its name and what it does.",
  "help.l6": "Trees, stone, berries and animals run out and do not come back. Wheat fields never run out.",
  "help.l7": '"Find food": the gatherer looks for food by itself; in winter it goes hunting.',
  "help.l3": "In winter each person eats food. Keep some stored!",
  "help.l4": "When 2 kinds of buildings are ready, the Village Center can advance to the next era.",
  "amigo.convidar": "Invite a friend",
  "amigo.convidar.d": "A friend joins your game with a code. You choose their role: Logistics Chief or Combat Leader.",
  "papel.logistica": "Logistics Chief",
  "papel.combate": "Combat Leader",
  "papel.logistica.d": "Gatherers, buildings, training, research, advancing the era and the market.",
  "papel.combate.d": "All the troops: move, attack and train more troops.",
  "papel.pergunta": "What will your friend's role be?",
  "papel.regra": "You get the other role. Both of you can train troops.",
  "papel.voltar": "Back",
  "papel.dele": "Your friend: {papel}",
  "papel.seu": "You: {papel}",
  "papel.trocar": "Swap roles",
  "papel.seuPapel": "Your role: {papel}",
  "papel.agora": "Now you are the {papel}.",
  "papel.voceE": "You are the {papel}.",
  "papel.quem": "{name} ({papel}) commands this.",
  "papel.soTreinar": "You can train troops here. The rest is up to {name} ({papel}).",
  "amigo.entrouComo": "{name} joined as {papel}!",
  "amigo.saiuTudo": "{name} left. You command everything again.",
  "amigo.chipPapel": "With {name} · You: {papel}",
  "online.jogar": "Play online",
  "online.jogar.d": "Each person with their own tribe, up to 4, with a code.",
  "online.criar": "Create a match",
  "online.entrar": "Join with a code",
  "online.digite": "Type the match code:",
  "online.entrarBtn": "Join",
  "online.semConta": "To play online, log in to your account.",
  "online.criando": "Creating the match…",
  "online.entrando": "Joining…",
  "online.erroCriar": "Could not create the match. Try again.",
  "online.semRede": "No connection to the server. Try again.",
  "sala.titulo": "Waiting room",
  "sala.codigo": "Match code",
  "sala.instrucoes": 'Ask your friends to tap "Play online", then "Join with a code", and type this code.',
  "sala.modo": "Mode",
  "modo.1": "1 vs 1",
  "modo.2": "2 vs 2",
  "modo.3": "All vs all (3)",
  "modo.4": "All vs all (4)",
  "modo.1.d": "Two tribes, one against the other.",
  "modo.2.d": "Two teams of two tribes. Allies are side by side.",
  "modo.3.d": "Three tribes, each on its own.",
  "modo.4.d": "Four tribes, each on its own.",
  "sala.dif": "Computer in empty places",
  "sala.time": "Team {n}",
  "sala.computador": "Computer",
  "sala.voce": "you",
  "sala.trocar": "Tap two tribes to swap places.",
  "sala.comecar": "Start",
  "sala.precisa": "You need at least 2 people to start.",
  "sala.esperando": "Waiting for {name} to start…",
  "sala.sair": "Leave",
  "sala.fechou": "The person who created the match left.",
  "online.titulo": "Online match",
  "online.pausadoTodos": "The game is paused for everyone.",
  "online.naoPausa": "Only the host pauses an online match: the game goes on.",
  "online.pausado": "{name} paused the game.",
  "online.sair": "Leave the match",
  "online.sair.d": "The computer takes over your tribe.",
  "online.esperaAnf": "Waiting for {name} to come back…",
  "online.sincronizando": "Syncing…",
  "online.reconectando": "The internet blinked. Reconnecting…",
  "online.caiu": "{name}'s internet blinked.",
  "online.voltou": "{name} is back.",
  "online.saiu": "{name} left. The computer took over the tribe.",
  "online.anfitriao": "{name} now sets the pace of the match.",
  "online.anfitriaoVoce": "You now set the pace of the match.",
  "online.fim": "The match is over.",
  "online.voceE": "You are the {cor} tribe.",
  "online.aliado": "ally",
  "online.computadorDe": "{name} (computer)",
  "online.perdeu": "Your tribe lost",
  "online.perdeu.time": "Your team goes on: cheer for your ally!",
  "online.perdeu.d": "You can keep watching the match or leave.",
  "online.olhar": "Keep watching",
  "end.time.victory": "Your team won!",
  "end.time.defeat": "Your team lost",
  "end.time.victory.d": "Your team was the last one standing.",
  "end.time.defeat.d": "Not this time. How about another match?",
  "end.online.victory": "You won!",
  "end.online.defeat": "You lost",
  "end.online.victory.d": "Your tribe was the last one standing.",
  "end.online.defeat.d": "Not this time. How about another match?",
  "sinal.btn": "Signal",
  "sinal.ajuda": "Help here",
  "sinal.atacar": "Attack here",
  "sinal.cuidado": "Watch out",
  "sinal.toque": "Tap the map: {sinal}",
  "sinal.de": "{name}: {sinal}",
  "cor.0": "red",
  "cor.1": "blue",
  "cor.2": "yellow",
  "cor.3": "purple",
  "msg.defeatedDe": "{p}'s tribe was defeated.",
  "regras.label": "Rules",
  "regras.normal": "Normal",
  "regras.beta": "Beta",
  "regras.segure": "Hold a button to see what changes.",
  "regras.normal.t": "Normal rules",
  "regras.normal.l1": "The usual rules: 4 gatherers and a dog at the start.",
  "regras.normal.l2": "The Village Center gives 8 places and each house 4 to 6. Up to 30 people in the Stone Age, 60 in the Neolithic and 90 in the Metal Age.",
  "regras.normal.l3": "Gatherers carry 10 per trip.",
  "regras.beta.t": "Beta rules: what changes",
  "regras.beta.l1": "You start with 4 gatherers and no dog.",
  "regras.beta.l2": "The Village Center and each house give 4 places. People limit per era: 12, 16, 19, 23, 26 and 30 (normal: 30, 60, 90…).",
  "regras.beta.l3": "Gatherers carry 15 (normal: 10) and work faster each era: they bring 17% more in the Stone Age, 50% more in the Neolithic and 61% more in the Metal Age.",
  "regras.beta.l4": "Troops hit 30% harder.",
  "regras.beta.l5": "Eras go faster: about 10 minutes to the Neolithic and 12 more to the Metal Age.",
  "regras.salvo": "beta rules",
  "regras.naPartida": "Playing with the beta rules.",
  "amigo.criando": "Creating the invite…",
  "amigo.codigo": "Code for your friend",
  "amigo.instrucoes": `Ask your friend to open Origines, tap "Join a friend's game" and type this code.`,
  "amigo.esperando": "Waiting for your friend…",
  "amigo.jogando": "{name} is playing with you.",
  "amigo.encerrar": "End the invite",
  "amigo.semConta": "To play with a friend, sign in to your account.",
  "amigo.erroCriar": "Couldn't create the invite now. Try again.",
  "amigo.entrar": "Join a friend's game",
  "amigo.digite": "Type the code your friend got.",
  "amigo.codigoCampo": "Code",
  "amigo.entrarBtn": "Join",
  "amigo.entrando": "Joining…",
  "amigo.entrandoEm": "Joining {name}'s game…",
  "amigo.semRede": "No connection to the server. Try again.",
  "amigo.versao": "You have different versions of the game. Both of you reload the page and try again.",
  "amigo.chip": "With {name}",
  "amigo.entrou": "{name} joined your game!",
  "amigo.saiu": "{name} left the game.",
  "amigo.pausado": "The host paused the game.",
  "amigo.espera": "Waiting for the host to come back…",
  "amigo.sincronizando": "Syncing the game…",
  "amigo.caiu": "The connection dropped. Reconnecting…",
  "amigo.fim.t": "The game stopped",
  "amigo.fim": "The host left. The game stopped.",
  "amigo.erro.t": "Couldn't join",
  "amigo.titulo": "Playing with {name}",
  "amigo.noJogoDe": "You are in {name}'s game. Only the person who invited you saves the game.",
  "amigo.sair": "Leave your friend's game",
  "help.l8": `"Invite a friend" (in the menu): choose your friend's role, Logistics Chief (gatherers and buildings) or Combat Leader (troops). They join with a 4-letter code, and both of you can train troops.`,
  "help.l10": '"Play online" (on the start screen, with your account): each person plays their own tribe, up to 4, with a code. In 2 vs 2, allies do not attack each other, see together and can send ready-made signals on the map.',
  "help.l9": "Who beats whom? Tap the crossed swords at the top of the screen. When you pick a troop, the panel also shows who it beats and who it loses to.",
  "btn.vs": "Who beats whom",
  "vs.win": "Beats",
  "vs.lose": "Loses to",
  "vs.beats": "beats",
  "vs.cycle": "The circle of troops",
  "vs.intro": "Every troop beats some and loses to others. Send the right one against the enemy, and mix your troops!",
  "vs.animals": "Animals",
  "vs.buildings": "Buildings",
  "vs.anyone": "Any soldier (it cannot fight back)",
  "vs.enemy": "Enemy",
  "vs.from": "Arrives {era}",
  "vs.far": "Attacks from afar",
  "vs.scout": "Scout: runs fast and sees far; fights little",
  "vs.fast": "Very fast",
  "vs.foot": "Fights on foot",
  "vs.muros": "Walls",
  "vs.muroForte": "Breaks walls fast",
  "vs.muroFraco": "Breaks walls slowly",
  "vs.muroCima": "Shoots over walls (breaks them slowly)",
  "lang.label": "Language",
  loading: "Loading the world…",
  // Idade dos Metais (M2)
  "bld.forge": "Forge",
  "bld.forge.d": "Research Bronze and Iron: stronger soldiers.",
  "bld.market": "Market",
  "bld.market.d": "Trade 100 of a resource for {get} of another. On fair days (the start of each season) you get {fair}. Research the Wheel here.",
  "bld.stable": "Stable",
  "bld.stable.d": "Trains horsemen.",
  "bld.workshop": "Workshop",
  "bld.workshop.d": "Builds battering rams.",
  "bld.wall": "Stone Wall",
  "bld.wall.d": "Stronger than the palisade. Draw it with your finger: your gatherers build it block by block. It stops enemies; your tribe walks through. To get past an enemy wall, send your troops to knock down one block.",
  "bld.palisade": "Palisade",
  "bld.palisade.d": "A wall of sharpened logs. Draw it with your finger: your gatherers build it block by block. It stops enemies; your tribe walks through. To get past an enemy wall, send your troops to knock down one block.",
  "bld.tower": "Tower",
  "bld.tower.d": "Shoots arrows at enemies nearby.",
  "bld.center.e2": "Chief's Hall",
  "bld.military.e2": "Barracks",
  "unit.swordsman": "Swordsman",
  "unit.swordsman.d": "Strong fighter with a bronze sword. Beats spearmen.",
  "unit.slinger": "Slinger",
  "unit.slinger.d": "Throws stones with a sling. Good against fighters on foot.",
  "unit.horseman": "Horseman",
  "unit.horseman.d": "Fast. Beats ranged troops and rams. Weak against spearmen.",
  "unit.ram": "Battering Ram",
  "unit.ram.d": "Slow. Only attacks buildings, but hits very hard.",
  "tech.bronze": "Bronze",
  "tech.bronze.d": "+1 attack for soldiers.",
  "tech.iron": "Iron",
  "tech.iron.d": "+1 attack and +1 armor for soldiers.",
  "tech.wheel": "Wheel",
  "tech.wheel.d": "Gatherers carry 15 instead of 10.",
  "trade.give": "Give {res}",
  "trade.giveShort": "Give",
  "trade.get": "Get {n} {res}",
  "trade.fair": "Fair day!",
  "why.techDone": "Already researched.",
  "why.techQueued": "Already in the line.",
  "why.needs": "First research {tech}.",
  "why.trade": "You need 100 {res} to trade.",
  "msg.tech": "Research done: {tech}!",
  "msg.fair": "Fair day! Better trades at the Market for 30 seconds.",
  "msg.metalSeen": "Metal appeared on the map! Gatherers can mine it.",
  "place.muro.mouse": "Drag to draw the wall · click: straight line · right-click cancels",
  "place.muro.touch": "Drag your finger to draw the wall",
  "place.muro.mouse2": "Enter builds",
  "place.muro.dica": "Tap: straight line · Two fingers: move the map",
  "muro.blocos": "{n} blocks · {v} {res}, paid one at a time",
  "muro.vermelhos": "the red ones can’t be built",
  "cmd.undo": "Undo",
  "muro.falta": "you need {v} {res} for the first block",
  "do.waitRes": "Waiting for {res}",
  "msg.muroFalta": "Not enough {res} for the next wall block",
  "taxa.min": "/min",
  "taxa.tip": "{res}: {n} · {v} per minute (average of the last 2 minutes)",
  "taxa.tip.food": "Food: {n} · {v} per minute (what comes in minus what the tribe eats; average of the last 2 minutes)",
  // M3: Reino e República
  "bld.center.e3": "Forum",
  "bld.house.e3": "Atrium House",
  "bld.house.e4": "Domus",
  "bld.depot.e3": "Horreum",
  "bld.military.e4": "Castra",
  "bld.tufa": "Tufa Wall",
  "bld.tufa.d": "Big blocks of tufa, the stone of Rome: stronger than the dry-stone wall. Draw it with your finger: your gatherers build it block by block. It stops enemies; your tribe walks through. To get past an enemy wall, send your troops to knock down one block.",
  "bld.temple": "Temple",
  "bld.temple.e3": "Etruscan Temple",
  "bld.temple.d": "Heals your people nearby, faster and from farther away than the shrine.",
  "bld.mint": "Mint",
  "bld.mint.d": 'Makes 1 coin by itself every 4 seconds. The word "money" comes from Moneta, the temple where Rome made its coins.',
  "bld.aqueduct": "Aqueduct",
  "bld.aqueduct.d": "Brings water to the city: room for {n} more people.",
  "bld.basilica": "Basilica",
  "bld.basilica.d": "The hall of business and justice. Trade 100 of a resource for {get} of another ({fair} on fair days).",
  "bld.road": "Road",
  "bld.road.d": "A paved Roman road. Draw it with your finger: your gatherers pave it block by block. Everyone walks 50% faster on it.",
  "unit.hoplite": "Hoplite",
  "unit.hoplite.d": "Phalanx soldier with a long spear and a big round shield. Beats cavalry. Weak against slingers.",
  "unit.eques": "Eques",
  "unit.eques.d": "Roman horseman. Fast. Beats ranged troops and siege machines. Weak against spears.",
  "unit.hastatus": "Hastatus",
  "unit.hastatus.d": "Legionary with a big shield and a short sword (the gladius). Beats triarii. Weak against velites.",
  "unit.triarius": "Triarius",
  "unit.triarius.d": "Veteran with a long spear. Beats cavalry. Weak against hastati.",
  "unit.velite": "Velite",
  "unit.velite.d": "Light soldier who throws javelins and wears a wolf skin. Beats soldiers on foot. Weak against cavalry.",
  "unit.scorpio": "Scorpio",
  "unit.scorpio.d": "A machine that shoots big bolts at people from far away. Slow. Weak against cavalry.",
  "unit.ballista": "Ballista",
  "unit.ballista.d": "A machine that throws big stones at buildings from far away. It only attacks buildings.",
  "unit.gaul": "Gaulish Warrior",
  "unit.gaul.d": "Barbarian from the north with a long sword. Stronger than the other barbarians: comes to tribes that have founded Rome.",
  "cmd.fundar": "Found Rome",
  "cmd.fundar.d": "The great advance: the village becomes the city of Rome. Coins, silver, the census and festivals arrive.",
  "do.silver": "Mining silver",
  "msg.fundacao": "Rome is founded! Coins arrive, and every month there is a festival.",
  "msg.prataSeen": "Silver appeared on the map! Gatherers mine it and it turns into coins.",
  "msg.censo": "Census! {n} people counted: +{m} coins.",
  "msg.festa": "Festival: {nome}! {ef}",
  "cal.festa": "Festival this month",
  "festa.equirria": "Equirria",
  "festa.parilia": "Parilia",
  "festa.ambarvalia": "Ambarvalia",
  "festa.vestalia": "Vestalia",
  "festa.apollinares": "Games of Apollo",
  "festa.consualia": "Consualia",
  "festa.romani": "Roman Games",
  "festa.armilustrium": "Armilustrium",
  "festa.plebeii": "Plebeian Games",
  "festa.saturnalia": "Saturnalia",
  "festa.compitalia": "Compitalia",
  "festa.terminalia": "Terminalia",
  "festa.equirria.d": "horse races for Mars, god of war",
  "festa.parilia.d": "Pales, goddess of shepherds, and the birthday of Rome",
  "festa.ambarvalia.d": "the blessing of the fields",
  "festa.vestalia.d": "Vesta, goddess of the home",
  "festa.apollinares.d": "Apollo, the healer god",
  "festa.consualia.d": "Consus, god of the granaries",
  "festa.romani.d": "games for Jupiter",
  "festa.armilustrium.d": "the weapons are cleaned and put away",
  "festa.plebeii.d": "games of the people",
  "festa.saturnalia.d": "Saturn, god of plenty",
  "festa.compitalia.d": "the gods of the crossroads",
  "festa.terminalia.d": "Terminus, god of boundary stones",
  "festa.ef.treino": "Troops train 50% faster this month.",
  "festa.ef.campos": "Fields give 25% more this month.",
  "festa.ef.curral": "Sheep pens give double this month.",
  "festa.ef.obra": "Building goes 50% faster this month.",
  "festa.ef.cura": "Everyone heals slowly this month, anywhere.",
  "festa.ef.mercado": "Fair-day trades at the Market all month.",
  "festa.ef.inverno": "Your tribe eats half as much this month.",
  "place.estrada.mouse": "Drag to draw the road · click: straight line · right-click cancels",
  "place.estrada.touch": "Drag your finger to draw the road",
  "msg.estradaFalta": "Not enough {res} for the next road block",
  "help.l11": "After you found Rome (the Kingdom): coins come from silver, the Mint, the Market and the census (every 2 years). Each month there is a festival with a small bonus: look at the calendar at the top.",
  // dicas da primeira partida (docs/15)
  "dica.de": "Tip {n} of {total}",
  "dica.proxima": "Next",
  "dica.pular": "Skip tips",
  "dica.jogar": "Play!",
  "dica.rever": "See the tips again",
  "dica.tribo.t": "Your tribe",
  "dica.tribo": "You lead a Stone Age tribe. Make it grow and advance through the eras until you reach Rome. To win, destroy the Village Center of the rival tribes. If yours falls, you lose.",
  "dica.ordens.t": "Giving orders",
  "dica.ordens.touch": "Tap a gatherer to pick it. Then tap a berry bush or a tree: it gathers and carries everything home by itself. Drag your finger to move the view.",
  "dica.ordens.mouse": "Click a gatherer to pick it. Then right-click a berry bush or a tree: it gathers and carries everything home by itself. WASD moves the view.",
  "dica.gente.t": "More people",
  "dica.gente.touch": "Tap the Village Center and train gatherers: they cost food. To fit more people, pick a gatherer, tap Build and then House (it costs wood).",
  "dica.gente.mouse": "Click the Village Center and train gatherers: they cost food. To fit more people, pick a gatherer, click Build and then House (it costs wood).",
  "dica.inverno.t": "Winter",
  "dica.inverno": "At the end of each year comes winter: berries and fields rest, and every person eats. Keep food stored! The Find food button makes a gatherer look for food by itself.",
  "dica.defesa.t": "Protect the village",
  "dica.defesa": "Rival tribes and barbarians will attack. Train warriors at the Training Ground. The crossed swords at the top show who beats whom, and Help (the ? or the Menu) explains the rest.",
  // som
  "snd.label": "Sound",
  "snd.music": "Music",
  "snd.sfx": "Effects",
  "snd.amb": "Ambience",
  "snd.l0": "Off",
  "snd.l1": "Low",
  "snd.l2": "Medium",
  "snd.l3": "High",
  "snd.mute": "Mute",
  "snd.unmute": "Turn sound on"
}, Gh = {
  "res.food": "Comida",
  "res.wood": "Madeira",
  "res.stone": "Pedra",
  "res.metal": "Metal",
  "res.coins": "Moedas",
  "res.pop": "População",
  "pop.tip": "População: {n} de {cap} (esta era permite até {max})",
  "era.0": "Idade da Pedra",
  "era.1": "Neolítico",
  "era.2": "Idade dos Metais",
  "era.3": "Reino",
  "era.4": "República",
  "era.5": "Império",
  "era.1.to": "o Neolítico",
  "era.2.to": "a Idade dos Metais",
  "era.3.to": "o Reino",
  "era.4.to": "a República",
  "era.5.to": "o Império",
  "era.1.in": "no Neolítico",
  "era.2.in": "na Idade dos Metais",
  "era.3.in": "no Reino",
  "era.4.in": "na República",
  "era.5.in": "no Império",
  "season.0": "Primavera",
  "season.1": "Verão",
  "season.2": "Outono",
  "season.3": "Inverno",
  "cal.year": "Ano {y}",
  "tribe.0": "Tribo vermelha",
  "tribe.1": "Tribo azul",
  "tribe.2": "Tribo amarela",
  "tribe.3": "Tribo roxa",
  "tribe.6": "Bárbaros",
  "tribe.wild": "Animal selvagem",
  "tribe.you": "Sua tribo",
  "unit.villager": "Coletor",
  "unit.warrior": "Guerreiro de clava",
  "unit.hunter": "Caçador",
  "unit.dog": "Cão",
  "unit.axeman": "Guerreiro de machado",
  "unit.archer": "Arqueiro",
  "unit.spearman": "Lanceiro",
  "unit.deer": "Cervo",
  "unit.boar": "Javali",
  "unit.wolf": "Lobo",
  "unit.aurochs": "Auroque",
  "unit.barbarian": "Bárbaro",
  "unit.carcass": "Caça abatida",
  "unit.villager.d": "Coleta comida, madeira e pedra, caça e constrói.",
  "unit.warrior.d": "Lutador básico com clava.",
  "unit.hunter.d": "Arremessa lanças de longe.",
  "unit.dog.d": "Batedor rápido que enxerga longe.",
  "unit.axeman.d": "Lutador mais forte, com machado de pedra.",
  "unit.archer.d": "Atira flechas de longe.",
  "unit.spearman.d": "Forte contra animais e cavaleiros.",
  "unit.deer.d": "Foge quando é atingido. {food} de comida.",
  "unit.boar.d": "Revida! {food} de comida.",
  "unit.wolf.d": "Perigoso. Ataca quem chega perto.",
  "unit.aurochs.d": "Enorme e forte. {food} de comida.",
  "unit.barbarian.d": "Ataca todas as tribos.",
  "unit.carcass.d": "Os coletores podem tirar {food} de comida daqui.",
  "bld.center": "Centro da aldeia",
  "bld.house": "Casa",
  "bld.depot": "Depósito",
  "bld.military": "Campo de treino",
  "bld.farm": "Campo de trigo",
  "bld.pen": "Curral",
  "bld.sanctuary": "Santuário",
  "bld.camp": "Acampamento bárbaro",
  "bld.center.d": "Treina coletores e recebe recursos. Aqui se avança para a próxima era.",
  "bld.house.d": "Espaço para mais {n} pessoas.",
  "bld.depot.d": "Os coletores entregam recursos aqui. Construa perto de árvores ou pedras.",
  "bld.military.d": "Treina guerreiros.",
  "bld.farm.d": "Um coletor cultiva. Dá comida o ano todo, menos no inverno.",
  "bld.pen.d": "As ovelhas dão comida sozinhas (menos no inverno).",
  "bld.sanctuary.d": "Cura devagar o seu povo que estiver perto.",
  "bld.camp.d": "Destrua para pegar o que eles guardam.",
  "do.idle": "Esperando ordens",
  "do.forage": "Procurando comida",
  "do.move": "Andando",
  "do.wood": "Cortando madeira",
  "do.berry": "Colhendo frutos",
  "do.stone": "Tirando pedra",
  "do.metal": "Tirando metal",
  "do.farm": "Cultivando",
  "do.meat": "Pegando a carne",
  "do.hunt": "Caçando",
  "do.build": "Construindo",
  "do.fight": "Lutando",
  "do.return": "Levando {n} de {res} para casa",
  "do.amove": "Marchando",
  "do.flee": "Fugindo!",
  "msg.fuga": "Seus coletores estão fugindo de inimigos!",
  "info.hp": "Vida",
  "info.building": "Em construção",
  "info.queue": "Treinando",
  "info.food": "Comida",
  "info.farmer": "Lavrador: {who}",
  "info.yes": "trabalhando",
  "info.no": "ninguém — mande um coletor",
  "sel.none": "Nada selecionado",
  "sel.many": "{n} selecionados",
  "sel.clear": "Limpar seleção",
  "cmd.build": "Construir",
  "cmd.back": "Voltar",
  "cmd.stop": "Parar",
  "cmd.food": "Buscar comida",
  "cmd.food.d": "O coletor procura comida sozinho e não fica parado: carne no chão, campos livres e frutos. No inverno campos e frutos descansam, então ele vai caçar veados.",
  "cmd.food.off": "Ligado: este coletor procura comida sozinho. Aperte de novo para desligar.",
  "cmd.rally": "Ponto de encontro",
  "cmd.ageup": "Avançar para {era}",
  "cmd.aging": "Avançando para {era}…",
  "cmd.cancelQueue": "Cancelar o último",
  "cmd.place": "Construir aqui",
  "cmd.cancel": "Cancelar",
  "why.cost": "Falta {res}.",
  "why.pop": "Construa mais casas para treinar mais gente.",
  "why.popEra": "Limite de população desta era.",
  "why.queue": "A fila está cheia (5).",
  "why.age": "Antes, construa 2 tipos diferentes de construção desta era ({n}/2).",
  "why.ageBusy": "Já está avançando.",
  "why.villager": "Selecione um coletor para construir.",
  "why.era": "Disponível {era}.",
  "why.maxEra": "Mais eras chegam nas próximas atualizações.",
  "why.done": "Espere terminar a construção.",
  "place.mouse": "Clique onde construir · botão direito cancela · segure Shift para construir mais",
  "place.touch": "Toque onde construir e depois confirme",
  "place.bad": "Não dá para construir aí.",
  "rally.hint": "Toque para onde as pessoas novas devem ir",
  "rally.set": "Ponto de encontro marcado.",
  "btn.idle": "Ocioso",
  "btn.army": "Exército",
  "btn.home": "Aldeia",
  "btn.fog": "Névoa",
  "btn.help": "Ajuda",
  "btn.menu": "Menu",
  "q.high": "Alta",
  "q.medium": "Média",
  "q.low": "Baixa",
  "q.auto": "Gráficos ajustados para {q} ({fps} fps)",
  "q.label": "Gráficos",
  "hint.mouse": "Clique para selecionar · botão direito numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para selecionar vários · WASD move a vista · roda para zoom · Q/E para girar",
  "hint.touch": "Toque para selecionar · depois toque numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para mover a vista · segure e arraste para selecionar vários · pinça para zoom",
  "msg.built": "{b} ficou pronto.",
  "msg.hunger": "Fome! Faltou comida no inverno: seu povo trabalha mais devagar.",
  "msg.spring": "Primavera: os campos e os arbustos voltam a dar comida.",
  "msg.winter": "Inverno: cada pessoa come {n} de comida por mês. Campos e frutos descansam.",
  "msg.winterSoon": "O inverno começa no próximo mês. Guarde comida!",
  "msg.underAttack": "Estamos sendo atacados!",
  "msg.campLoot": "Acampamento bárbaro destruído: +200 de comida e +150 de madeira!",
  "msg.centerLost": "Nosso Centro da aldeia foi destruído!",
  "msg.centerDanger": "O Centro da aldeia está caindo! Defenda-o ou a tribo perde.",
  "msg.popEra": "Limite de população desta era.",
  "msg.popHouses": "Construa mais casas para a tribo crescer.",
  "msg.raidSoon": "Os bárbaros estão vindo!",
  "msg.defeated": "{p} foi derrotada.",
  "msg.youDefeated": "Sua tribo foi derrotada.",
  "msg.ageMe": "Sua tribo entrou {era}!",
  "msg.ageOther": "{p} entrou {era}.",
  "msg.go": "Ver",
  "menu.tagline": "Da Idade da Pedra ao auge de Roma",
  "menu.continue": "Continuar",
  "menu.saved": "{era} · ano {y} · {r} rivais",
  "menu.new": "Novo jogo",
  "menu.rivals": "Tribos rivais",
  "menu.difficulty": "Dificuldade",
  "diff.0": "Fácil",
  "diff.1": "Normal",
  "diff.2": "Difícil",
  "menu.start": "Começar",
  "menu.back": "Voltar",
  "menu.credits": "Feito por Bento, Jojô e Pai",
  "menu.local": "Seu jogo fica salvo neste aparelho.",
  "acct.checking": "Conferindo sua conta…",
  "acct.looking": "Procurando o jogo salvo desta conta…",
  "acct.yours": "Sua conta",
  "acct.savesHere": "Seu jogo fica salvo nesta conta (e neste aparelho).",
  "acct.switch": "Ver código ou trocar de conta",
  "acct.none": "Sem conta",
  "acct.deviceOnly": "Seu jogo fica salvo só neste aparelho.",
  "acct.login": "Entrar ou criar conta",
  "acct.why": "Com uma conta, você continua em outro aparelho.",
  "acct.otherHint": "O jogo da conta {name} está guardado nela. Entre na conta para continuar.",
  "save.inAccount": "Salvo na conta {name}",
  "save.deviceOnly": "Salvo só neste aparelho",
  "save.adopt": "Jogo deste aparelho, sem conta: vai passar para a conta {name}",
  "new.inAccount": "O jogo novo vai ficar salvo na conta {name}.",
  "new.deviceOnly": "O jogo novo vai ficar salvo só neste aparelho.",
  "new.replaces": "Ele fica no lugar do jogo salvo.",
  "acct.pauseAccount": "Salvando na conta {name}.",
  "acct.pauseNone": "Sem conta: salvando só neste aparelho.",
  "acct.pauseLogin": "Entrar para salvar numa conta",
  "acct.pauseOther": "Este jogo é da conta {name}. Entre nela para salvar na nuvem; por enquanto ele fica salvo neste aparelho.",
  "acct.pauseAdopt": "Ao salvar, este jogo passa para a conta {name}.",
  "pause.saving": "Salvando…",
  "pause.savedBoth": "Salvo na conta {name} e neste aparelho.",
  "pause.savedLocalOnly": "Salvo neste aparelho. A conta {name} não respondeu; tento de novo depois.",
  "pause.savedOther": "Salvo neste aparelho. Este jogo é da conta {name}.",
  "pause.savedCloudOnly": "Salvo na conta {name}. Neste aparelho não coube.",
  "pause.title": "Pausado",
  "pause.resume": "Voltar ao jogo",
  "pause.save": "Salvar o jogo",
  "pause.saved": "Salvo neste aparelho.",
  "pause.saveFail": "Não deu para salvar neste aparelho.",
  "pause.quit": "Salvar e sair",
  "pause.time": "{m} minutos de jogo",
  "end.victory": "Vitória!",
  "end.victory.d": "Todas as tribos rivais foram derrotadas. Seu povo será lembrado.",
  "end.defeat": "Derrota",
  "end.defeat.d": "O Centro da aldeia caiu e sua tribo foi derrotada. Tente de novo!",
  "end.watch": "Continuar olhando",
  "end.menu": "Voltar ao menu",
  "help.title": "Como jogar",
  "help.close": "Voltar ao jogo",
  "help.goal": "Objetivo: fazer sua tribo crescer, passar pelos invernos e destruir o Centro da aldeia de cada tribo rival. Se o seu Centro cair, você perde. Chegue ao Neolítico para plantar.",
  "help.l1": "Selecione coletores e mande-os para frutos, árvores, pedras ou animais: eles levam tudo para casa sozinhos.",
  "help.l2": "Construa casas para crescer, um depósito perto das árvores e um campo de treino para os guerreiros.",
  "help.l5.touch": "Toque e segure um ícone para ver o nome e para que ele serve.",
  "help.l5.mouse": "Pare o mouse em cima de um ícone para ver o nome e para que ele serve.",
  "help.l6": "Árvores, pedras, frutos e animais acabam e não voltam. Os campos de trigo não acabam.",
  "help.l7": '"Buscar comida": o coletor procura comida sozinho; no inverno, vai caçar.',
  "help.l3": "No inverno cada pessoa come. Deixe comida guardada!",
  "help.l4": "Com 2 tipos de construção prontos, o Centro da aldeia pode avançar para a próxima era.",
  "amigo.convidar": "Convidar um amigo",
  "amigo.convidar.d": "Um amigo entra no seu jogo com um código. Você escolhe o papel dele: Chefe de Logística ou Líder de Combate.",
  "papel.logistica": "Chefe de Logística",
  "papel.combate": "Líder de Combate",
  "papel.logistica.d": "Coletores, construções, treinar, pesquisas, avançar de era e mercado.",
  "papel.combate.d": "Todas as tropas: andar, atacar e treinar mais tropas.",
  "papel.pergunta": "Qual vai ser o papel do seu amigo?",
  "papel.regra": "Você fica com o outro papel. Os dois podem treinar tropas.",
  "papel.voltar": "Voltar",
  "papel.dele": "Seu amigo: {papel}",
  "papel.seu": "Você: {papel}",
  "papel.trocar": "Trocar os papéis",
  "papel.seuPapel": "Seu papel: {papel}",
  "papel.agora": "Agora você é o {papel}.",
  "papel.voceE": "Você é o {papel}.",
  "papel.quem": "Quem comanda é {name} ({papel}).",
  "papel.soTreinar": "Aqui você pode treinar tropas. O resto é com {name} ({papel}).",
  "amigo.entrouComo": "{name} entrou como {papel}!",
  "amigo.saiuTudo": "{name} saiu. Você comanda tudo de novo.",
  "amigo.chipPapel": "Com {name} · Você: {papel}",
  "online.jogar": "Jogar online",
  "online.jogar.d": "Cada pessoa com a sua tribo, até 4, com um código.",
  "online.criar": "Criar partida",
  "online.entrar": "Entrar com código",
  "online.digite": "Digite o código da partida:",
  "online.entrarBtn": "Entrar",
  "online.semConta": "Para jogar online, entre na sua conta.",
  "online.criando": "Criando a partida…",
  "online.entrando": "Entrando…",
  "online.erroCriar": "Não deu para criar a partida. Tente de novo.",
  "online.semRede": "Sem conexão com o servidor. Tente de novo.",
  "sala.titulo": "Sala de espera",
  "sala.codigo": "Código da partida",
  "sala.instrucoes": 'Peça aos amigos para tocar em "Jogar online", depois em "Entrar com código", e digitar este código.',
  "sala.modo": "Modo",
  "modo.1": "1 contra 1",
  "modo.2": "2 contra 2",
  "modo.3": "Todos (3)",
  "modo.4": "Todos (4)",
  "modo.1.d": "Duas tribos, uma contra a outra.",
  "modo.2.d": "Dois times de duas tribos. Aliados ficam lado a lado.",
  "modo.3.d": "Três tribos, cada uma por si.",
  "modo.4.d": "Quatro tribos, cada uma por si.",
  "sala.dif": "Computador nas vagas vazias",
  "sala.time": "Time {n}",
  "sala.computador": "Computador",
  "sala.voce": "você",
  "sala.trocar": "Toque em duas tribos para trocar as pessoas de lugar.",
  "sala.comecar": "Começar",
  "sala.precisa": "Para começar, precisa de pelo menos 2 pessoas.",
  "sala.esperando": "Esperando {name} começar…",
  "sala.sair": "Sair",
  "sala.fechou": "Quem criou a partida saiu.",
  "online.titulo": "Partida online",
  "online.pausadoTodos": "O jogo está pausado para todos.",
  "online.naoPausa": "Na partida online, só quem dá o ritmo pausa: o jogo continua.",
  "online.pausado": "{name} pausou o jogo.",
  "online.sair": "Sair da partida",
  "online.sair.d": "O computador assume a sua tribo.",
  "online.esperaAnf": "Esperando {name} voltar…",
  "online.sincronizando": "Sincronizando…",
  "online.reconectando": "A internet piscou. Reconectando…",
  "online.caiu": "A internet de {name} piscou.",
  "online.voltou": "{name} voltou.",
  "online.saiu": "{name} saiu. O computador assumiu a tribo.",
  "online.anfitriao": "Agora {name} dá o ritmo da partida.",
  "online.anfitriaoVoce": "Agora você dá o ritmo da partida.",
  "online.fim": "A partida acabou.",
  "online.voceE": "Você é a tribo {cor}.",
  "online.aliado": "aliado",
  "online.computadorDe": "{name} (computador)",
  "online.perdeu": "Sua tribo perdeu",
  "online.perdeu.time": "Seu time continua: torça pelo seu aliado!",
  "online.perdeu.d": "Você pode continuar olhando a partida ou sair.",
  "online.olhar": "Continuar olhando",
  "end.time.victory": "Seu time venceu!",
  "end.time.defeat": "Seu time perdeu",
  "end.time.victory.d": "O seu time foi o último de pé.",
  "end.time.defeat.d": "Desta vez não deu. Que tal outra partida?",
  "end.online.victory": "Você venceu!",
  "end.online.defeat": "Você perdeu",
  "end.online.victory.d": "A sua tribo foi a última de pé.",
  "end.online.defeat.d": "Desta vez não deu. Que tal outra partida?",
  "sinal.btn": "Sinal",
  "sinal.ajuda": "Ajuda aqui",
  "sinal.atacar": "Atacar aqui",
  "sinal.cuidado": "Cuidado",
  "sinal.toque": "Toque no mapa: {sinal}",
  "sinal.de": "{name}: {sinal}",
  "cor.0": "vermelha",
  "cor.1": "azul",
  "cor.2": "amarela",
  "cor.3": "roxa",
  "msg.defeatedDe": "A tribo de {p} foi derrotada.",
  "regras.label": "Regras",
  "regras.normal": "Normal",
  "regras.beta": "Beta",
  "regras.segure": "Segure um botão para ver o que muda.",
  "regras.normal.t": "Regras normais",
  "regras.normal.l1": "As regras de sempre: 4 coletores e um cão no começo.",
  "regras.normal.l2": "O Centro dá 8 vagas e cada casa 4 a 6. Até 30 pessoas na Idade da Pedra, 60 no Neolítico e 90 nos Metais.",
  "regras.normal.l3": "Os coletores carregam 10 por viagem.",
  "regras.beta.t": "Regras beta: o que muda",
  "regras.beta.l1": "Começa com 4 coletores, sem o cão.",
  "regras.beta.l2": "O Centro e cada casa dão 4 vagas. Limite de gente por era: 12, 16, 19, 23, 26 e 30 (normal: 30, 60, 90…).",
  "regras.beta.l3": "Os coletores carregam 15 (normal: 10) e trabalham mais depressa a cada era: rendem 17% a mais na Idade da Pedra, 50% no Neolítico e 61% nos Metais.",
  "regras.beta.l4": "As tropas batem 30% mais forte.",
  "regras.beta.l5": "As eras passam mais depressa: cerca de 10 min até o Neolítico e mais 12 até os Metais.",
  "regras.salvo": "regras beta",
  "regras.naPartida": "Jogando com as regras beta.",
  "amigo.criando": "Criando o convite…",
  "amigo.codigo": "Código para o seu amigo",
  "amigo.instrucoes": 'Peça ao seu amigo para abrir o Origines, tocar em "Entrar no jogo de um amigo" e digitar este código.',
  "amigo.esperando": "Esperando o amigo…",
  "amigo.jogando": "{name} está jogando com você.",
  "amigo.encerrar": "Encerrar o convite",
  "amigo.semConta": "Para jogar com um amigo, entre na sua conta.",
  "amigo.erroCriar": "Não deu para criar o convite agora. Tente de novo.",
  "amigo.entrar": "Entrar no jogo de um amigo",
  "amigo.digite": "Digite o código que o seu amigo recebeu.",
  "amigo.codigoCampo": "Código",
  "amigo.entrarBtn": "Entrar",
  "amigo.entrando": "Entrando…",
  "amigo.entrandoEm": "Entrando no jogo de {name}…",
  "amigo.semRede": "Sem conexão com o servidor. Tente de novo.",
  "amigo.versao": "Vocês estão com versões diferentes do jogo. Recarreguem a página e tentem de novo.",
  "amigo.chip": "Com {name}",
  "amigo.entrou": "{name} entrou no seu jogo!",
  "amigo.saiu": "{name} saiu do jogo.",
  "amigo.pausado": "O anfitrião pausou o jogo.",
  "amigo.espera": "Esperando o anfitrião voltar…",
  "amigo.sincronizando": "Sincronizando o jogo…",
  "amigo.caiu": "A internet piscou. Reconectando…",
  "amigo.fim.t": "O jogo parou",
  "amigo.fim": "O anfitrião saiu. O jogo parou.",
  "amigo.erro.t": "Não deu para entrar",
  "amigo.titulo": "Jogando com {name}",
  "amigo.noJogoDe": "Você está no jogo de {name}. Só quem convidou salva o jogo.",
  "amigo.sair": "Sair do jogo do amigo",
  "help.l8": '"Convidar um amigo" (no menu): escolha o papel do amigo, Chefe de Logística (coletores e construções) ou Líder de Combate (tropas). Ele entra com um código de 4 letras, e os dois podem treinar tropas.',
  "help.l10": '"Jogar online" (na tela inicial, com a conta): cada pessoa joga com a sua tribo, até 4, com um código. No 2 contra 2, aliados não se atacam, enxergam juntos e podem mandar sinais prontos no mapa.',
  "help.l9": "Quem vence quem? Toque nas espadas cruzadas no alto da tela. Ao escolher uma tropa, o painel também mostra quem ela vence e para quem perde.",
  "btn.vs": "Quem vence quem",
  "vs.win": "Vence",
  "vs.lose": "Perde para",
  "vs.beats": "vence",
  "vs.cycle": "A roda das tropas",
  "vs.intro": "Cada tropa vence algumas e perde para outras. Mande a certa contra o inimigo e misture as tropas!",
  "vs.animals": "Animais",
  "vs.buildings": "Construções",
  "vs.anyone": "Qualquer soldado (ele não se defende)",
  "vs.enemy": "Inimigo",
  "vs.from": "Chega {era}",
  "vs.far": "Ataca de longe",
  "vs.scout": "Batedor: corre e enxerga longe; luta pouco",
  "vs.fast": "Muito rápido",
  "vs.foot": "Luta a pé",
  "vs.muros": "Muros",
  "vs.muroForte": "Derruba muro depressa",
  "vs.muroFraco": "Derruba muro devagar",
  "vs.muroCima": "Atira por cima do muro (derruba devagar)",
  "lang.label": "Idioma",
  loading: "Carregando o mundo…",
  // Idade dos Metais (M2)
  "bld.forge": "Forja",
  "bld.forge.d": "Pesquise Bronze e Ferro: soldados mais fortes.",
  "bld.market": "Mercado",
  "bld.market.d": "Troque 100 de um recurso por {get} de outro. Nos dias de feira (no começo de cada estação), você recebe {fair}. Aqui se pesquisa a Roda.",
  "bld.stable": "Estábulo",
  "bld.stable.d": "Treina cavaleiros.",
  "bld.workshop": "Oficina",
  "bld.workshop.d": "Faz aríetes.",
  "bld.wall": "Muralha",
  "bld.wall.d": "Mais forte que a paliçada. Desenhe com o dedo: os coletores fazem bloco a bloco. Barra os inimigos; a sua tribo passa. Para passar pelo muro de outra tribo, mande as tropas derrubarem um bloco.",
  "bld.palisade": "Paliçada",
  "bld.palisade.d": "Muro de troncos apontados. Desenhe com o dedo: os coletores fazem bloco a bloco. Barra os inimigos; a sua tribo passa. Para passar pelo muro de outra tribo, mande as tropas derrubarem um bloco.",
  "bld.tower": "Torre",
  "bld.tower.d": "Atira flechas nos inimigos por perto.",
  "bld.center.e2": "Salão do chefe",
  "bld.military.e2": "Quartel",
  "unit.swordsman": "Espadachim",
  "unit.swordsman.d": "Lutador forte, com espada de bronze. Vence lanceiros.",
  "unit.slinger": "Fundeiro",
  "unit.slinger.d": "Atira pedras com a funda. Bom contra lutadores a pé.",
  "unit.horseman": "Cavaleiro",
  "unit.horseman.d": "Rápido. Vence quem atira de longe e os aríetes. Fraco contra lanceiros.",
  "unit.ram": "Aríete",
  "unit.ram.d": "Lento. Só ataca construções, mas bate muito forte.",
  "tech.bronze": "Bronze",
  "tech.bronze.d": "+1 de ataque para os soldados.",
  "tech.iron": "Ferro",
  "tech.iron.d": "+1 de ataque e +1 de armadura para os soldados.",
  "tech.wheel": "Roda",
  "tech.wheel.d": "Os coletores levam 15 em vez de 10.",
  "trade.give": "Dar {res}",
  "trade.giveShort": "Dar",
  "trade.get": "Receber {n} de {res}",
  "trade.fair": "Dia de feira!",
  "why.techDone": "Já pesquisado.",
  "why.techQueued": "Já está na fila.",
  "why.needs": "Primeiro pesquise {tech}.",
  "why.trade": "Precisa de 100 de {res} para trocar.",
  "msg.tech": "Pesquisa pronta: {tech}!",
  "msg.fair": "Dia de feira! Trocas melhores no Mercado por 30 segundos.",
  "msg.metalSeen": "O metal apareceu no mapa! Os coletores já podem minerar.",
  "place.muro.mouse": "Arraste para desenhar o muro · clique: linha reta · botão direito cancela",
  "place.muro.touch": "Arraste o dedo para desenhar o muro",
  "place.muro.mouse2": "Enter constrói",
  "place.muro.dica": "Toque: linha reta · Dois dedos: mover o mapa",
  "muro.blocos": "{n} blocos · {v} de {res}, pagos um a um",
  "muro.vermelhos": "os vermelhos não dá para construir",
  "cmd.undo": "Desfazer",
  "muro.falta": "falta {v} de {res} para o primeiro bloco",
  "do.waitRes": "Esperando {res}",
  "msg.muroFalta": "Falta {res} para o próximo bloco do muro",
  "taxa.min": "/min",
  "taxa.tip": "{res}: {n} · {v} por minuto (média dos últimos 2 minutos)",
  "taxa.tip.food": "Comida: {n} · {v} por minuto (o que entra menos o que a tribo come; média dos últimos 2 minutos)",
  // M3: Reino e República
  "bld.center.e3": "Fórum",
  "bld.house.e3": "Casa de átrio",
  "bld.house.e4": "Domus",
  "bld.depot.e3": "Horreum",
  "bld.military.e4": "Castra",
  "bld.tufa": "Muralha de tufo",
  "bld.tufa.d": "Blocos grandes de tufo, a pedra de Roma: mais forte que a muralha seca. Desenhe com o dedo: os coletores fazem bloco a bloco. Barra os inimigos; a sua tribo passa. Para passar pelo muro de outra tribo, mande as tropas derrubarem um bloco.",
  "bld.temple": "Templo",
  "bld.temple.e3": "Templo etrusco",
  "bld.temple.d": "Cura a sua gente por perto, mais depressa e de mais longe que o santuário.",
  "bld.mint": "Casa da moeda",
  "bld.mint.d": 'Faz 1 moeda sozinha a cada 4 segundos. A palavra "moeda" vem de Moneta, o templo onde Roma fazia o seu dinheiro.',
  "bld.aqueduct": "Aqueduto",
  "bld.aqueduct.d": "Traz água para a cidade: espaço para mais {n} pessoas.",
  "bld.basilica": "Basílica",
  "bld.basilica.d": "O salão dos negócios e da justiça. Troque 100 de um recurso por {get} de outro ({fair} nos dias de feira).",
  "bld.road": "Estrada",
  "bld.road.d": "Estrada romana de pedras. Desenhe com o dedo: os coletores calçam bloco a bloco. Todo mundo anda 50% mais depressa em cima dela.",
  "unit.hoplite": "Hoplita",
  "unit.hoplite.d": "Soldado da falange, com lança comprida e escudo redondo grande. Vence a cavalaria. Fraco contra fundeiros.",
  "unit.eques": "Eques",
  "unit.eques.d": "Cavaleiro romano. Rápido. Vence quem atira de longe e as máquinas de cerco. Fraco contra lanças.",
  "unit.hastatus": "Hastatus",
  "unit.hastatus.d": "Legionário com escudo grande e espada curta (o gládio). Vence os triários. Fraco contra os vélites.",
  "unit.triarius": "Triarius",
  "unit.triarius.d": "Veterano com lança comprida. Vence a cavalaria. Fraco contra os hastati.",
  "unit.velite": "Vélite",
  "unit.velite.d": "Soldado leve que atira dardos e usa pele de lobo na cabeça. Vence quem luta a pé. Fraco contra a cavalaria.",
  "unit.scorpio": "Scorpio",
  "unit.scorpio.d": "Máquina que atira virotes grandes nas pessoas, de longe. Lento. Fraco contra a cavalaria.",
  "unit.ballista": "Ballista",
  "unit.ballista.d": "Máquina que atira pedras grandes nas construções, de longe. Só ataca construções.",
  "unit.gaul": "Guerreiro gaulês",
  "unit.gaul.d": "Bárbaro do norte, com espada comprida. Mais forte que os outros bárbaros: vem contra as tribos que já fundaram Roma.",
  "cmd.fundar": "Fundar Roma",
  "cmd.fundar.d": "O grande avanço: a aldeia vira a cidade de Roma. Chegam as moedas, a prata, o censo e os festivais.",
  "do.silver": "Tirando prata",
  "msg.fundacao": "Roma foi fundada! Chegam as moedas, e todo mês tem festival.",
  "msg.prataSeen": "A prata apareceu no mapa! Os coletores tiram a prata e ela vira moedas.",
  "msg.censo": "Censo! Foram contadas {n} pessoas: +{m} moedas.",
  "msg.festa": "Festival: {nome}! {ef}",
  "cal.festa": "Festival deste mês",
  "festa.equirria": "Equírria",
  "festa.parilia": "Parília",
  "festa.ambarvalia": "Ambarválias",
  "festa.vestalia": "Vestália",
  "festa.apollinares": "Jogos de Apolo",
  "festa.consualia": "Consuália",
  "festa.romani": "Jogos Romanos",
  "festa.armilustrium": "Armilústrio",
  "festa.plebeii": "Jogos Plebeus",
  "festa.saturnalia": "Saturnália",
  "festa.compitalia": "Compitália",
  "festa.terminalia": "Terminália",
  "festa.equirria.d": "corridas de cavalo para Marte, o deus da guerra",
  "festa.parilia.d": "Pales, a deusa dos pastores, e o aniversário de Roma",
  "festa.ambarvalia.d": "a bênção dos campos",
  "festa.vestalia.d": "Vesta, a deusa do lar",
  "festa.apollinares.d": "Apolo, o deus que cura",
  "festa.consualia.d": "Conso, o deus dos celeiros",
  "festa.romani.d": "jogos para Júpiter",
  "festa.armilustrium.d": "as armas são limpas e guardadas",
  "festa.plebeii.d": "jogos do povo",
  "festa.saturnalia.d": "Saturno, o deus da fartura",
  "festa.compitalia.d": "os deuses das encruzilhadas",
  "festa.terminalia.d": "Término, o deus dos marcos das divisas",
  "festa.ef.treino": "As tropas treinam 50% mais depressa neste mês.",
  "festa.ef.campos": "Os campos rendem 25% mais neste mês.",
  "festa.ef.curral": "Os currais rendem o dobro neste mês.",
  "festa.ef.obra": "As obras andam 50% mais depressa neste mês.",
  "festa.ef.cura": "Todo mundo se cura devagar neste mês, em qualquer lugar.",
  "festa.ef.mercado": "O mercado troca como na feira o mês inteiro.",
  "festa.ef.inverno": "A sua tribo come a metade neste mês.",
  "place.estrada.mouse": "Arraste para desenhar a estrada · clique: linha reta · botão direito cancela",
  "place.estrada.touch": "Arraste o dedo para desenhar a estrada",
  "msg.estradaFalta": "Falta {res} para o próximo bloco da estrada",
  "help.l11": "Depois de fundar Roma (o Reino): as moedas vêm da prata, da casa da moeda, do mercado e do censo (a cada 2 anos). Todo mês tem um festival com um bônus pequeno: veja no calendário, no alto da tela.",
  // dicas da primeira partida (docs/15)
  "dica.de": "Dica {n} de {total}",
  "dica.proxima": "Próxima",
  "dica.pular": "Pular dicas",
  "dica.jogar": "Jogar!",
  "dica.rever": "Ver as dicas de novo",
  "dica.tribo.t": "Sua tribo",
  "dica.tribo": "Você comanda uma tribo da Idade da Pedra. Faça ela crescer e avance de era até chegar a Roma. Para vencer, derrube o Centro da aldeia das tribos rivais. Se o seu cair, você perde.",
  "dica.ordens.t": "Dar ordens",
  "dica.ordens.touch": "Toque num coletor para escolher. Depois toque num arbusto de frutos ou numa árvore: ele colhe e leva tudo para casa sozinho. Arraste o dedo para mover a vista.",
  "dica.ordens.mouse": "Clique num coletor para escolher. Depois clique com o botão direito num arbusto de frutos ou numa árvore: ele colhe e leva tudo para casa sozinho. WASD move a vista.",
  "dica.gente.t": "Mais gente",
  "dica.gente.touch": "Toque no Centro da aldeia e treine coletores: eles custam comida. Para caber mais gente, escolha um coletor, toque em Construir e depois em Casa (custa madeira).",
  "dica.gente.mouse": "Clique no Centro da aldeia e treine coletores: eles custam comida. Para caber mais gente, escolha um coletor, clique em Construir e depois em Casa (custa madeira).",
  "dica.inverno.t": "O inverno",
  "dica.inverno": "No fim de cada ano chega o inverno: os frutos e os campos descansam, e cada pessoa come. Deixe comida guardada! O botão Buscar comida faz o coletor achar comida sozinho.",
  "dica.defesa.t": "Proteja a aldeia",
  "dica.defesa": "Tribos rivais e bárbaros vão atacar. Treine guerreiros no campo de treino. As espadas cruzadas, no alto, mostram quem vence quem, e a Ajuda (no ? ou no Menu) explica o resto.",
  // som
  "snd.label": "Som",
  "snd.music": "Música",
  "snd.sfx": "Efeitos",
  "snd.amb": "Ambiente",
  "snd.l0": "Desligado",
  "snd.l1": "Baixo",
  "snd.l2": "Médio",
  "snd.l3": "Alto",
  "snd.mute": "Silenciar",
  "snd.unmute": "Ligar o som"
}, Vh = { en: F0, pt: Gh }, L0 = "origines_lang";
let ks = "en";
try {
  const e = localStorage.getItem(L0);
  (e === "pt" || e === "en") && (ks = e);
} catch {
}
const wi = [], Ye = () => ks;
function Ar(e) {
  ks = e;
  try {
    localStorage.setItem(L0, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", wi.forEach((t) => t());
}
const _0 = (e) => (wi.push(e), () => {
  const t = wi.indexOf(e);
  t >= 0 && wi.splice(t, 1);
});
function b(e, t = {}) {
  let a = Vh[ks][e] ?? F0[e] ?? e;
  for (const s in t) a = a.split(`{${s}}`).join(String(t[s]));
  return a;
}
const cs = (e) => Math.floor(e).toLocaleString(ks === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = ks === "pt" ? "pt-BR" : "en");
const Kh = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, Vo = {
  food: '<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 18c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 18c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/>',
  wood: '<ellipse cx="7" cy="12" rx="3" ry="5"/><path d="M7 7h11c1.7 0 3 2.2 3 5s-1.3 5-3 5H7"/><circle cx="7" cy="12" r="1.2"/>',
  stone: '<path d="M4 17l3-8 5-3 6 2 2 7-4 3H8z"/><path d="M7 9l4 3 7-4M11 12l1 8"/>',
  metal: '<path d="M3 16l3-7h12l3 7z"/><path d="M6 9l2 7M18 9l-2 7"/>',
  coins: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',
  pop: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',
  villager: '<circle cx="11" cy="5.5" r="2.8"/><path d="M6 21v-6a5 5 0 0 1 10 0v6"/><path d="M15 13h5.5l-1.2 5H16"/>',
  warrior: '<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/>',
  axeman: '<path d="M5 20L16.5 8.5"/><path d="M13.5 5.5c3-1.5 6 .5 6.5 4.5-2.5.5-4-.5-4-.5l-2-2s-1-1-.5-2z"/>',
  hunter: '<path d="M4 20L17 7"/><path d="M14.5 4.5H20v5.5z"/><path d="M7 14l3 3"/>',
  archer: '<path d="M6 3c7 2 12 7 14 15"/><path d="M6 3l14 15"/><path d="M12 9.5l5-1-1 5"/>',
  spearman: '<circle cx="9" cy="14" r="5"/><path d="M13 11L20.5 3.5"/><path d="M18 3.5h2.5V6"/>',
  dog: '<circle cx="6.5" cy="9.5" r="1.7"/><circle cx="10.5" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="18.5" cy="9.5" r="1.7"/><path d="M8 17c0-3 2-5.5 4.5-5.5S17 14 17 17c0 2.2-2 2.4-4.5 1.4C10 19.4 8 19.2 8 17z"/>',
  animal: '<path d="M7 4l2 4M17 4l-2 4"/><path d="M6 10c0-2 3-3 6-3s6 1 6 3l-1 6c-.4 2.5-2.5 4-5 4s-4.6-1.5-5-4z"/><circle cx="10" cy="13" r=".6"/><circle cx="14" cy="13" r=".6"/>',
  barbarian: '<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/><path d="M4 6l4 1-1 4"/>',
  carcass: '<path d="M7.5 15C4.5 15 3 13 3 11s3-6 8-6 8 3 8 6-3 5-6 5"/><path d="M13.5 16l4 4"/><circle cx="19" cy="21" r="1"/>',
  center: '<path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 3 3 3 0-3-1-5 0-7z"/>',
  house: '<path d="M3 20L12 4l9 16z"/><path d="M10 20v-5h4v5"/>',
  depot: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13.5h16M9 9V5h6v4"/>',
  military: '<path d="M5 5l14 14M19 5L5 19"/><path d="M4 8.5V4h4.5M20 8.5V4h-4.5"/>',
  farm: '<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/><path d="M3 21h18"/>',
  pen: '<ellipse cx="11" cy="12" rx="6.5" ry="4.5"/><circle cx="18.5" cy="10" r="2"/><path d="M7.5 16.5v3M14.5 16.5v3"/>',
  sanctuary: '<path d="M9 21V7l3-4 3 4v14"/><path d="M5 21h14"/>',
  camp: '<path d="M3 20L10 6l7 14z"/><path d="M14 9l7 11h-4"/>',
  ageup: '<path d="M12 3l5 7h-3.2v6h-3.6v-6H7z"/><path d="M5 20h14"/>',
  swordsman: '<path d="M5 19L17 7"/><path d="M17 7l2.5-3.5L16 6"/><path d="M6.5 14.5l3 3"/><path d="M4 20l1.5-1.5"/>',
  slinger: '<path d="M6 20c0-6 2-10 6-12"/><path d="M12 8c3-1 5-3 6-5"/><circle cx="18.5" cy="3.8" r="1.6"/><circle cx="7" cy="8" r="2.2"/>',
  horseman: '<path d="M4 20l2-6c1-3 4-4 7-4h3l3-4 1 3-2 3v8"/><path d="M8 14v6M16 14v6"/><circle cx="12" cy="5" r="2"/>',
  ram: '<path d="M3 13l5-6h8l5 6z"/><path d="M2 11h20"/><circle cx="7" cy="17" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',
  forge: '<path d="M4 15h11l3-3h2v3l-3 3H7z"/><path d="M8 18v3M14 18v3"/><path d="M10 11V4l3 2"/>',
  market: '<path d="M3 9l2-5h14l2 5"/><path d="M3 9c0 2 4 2 4 0 0 2 5 2 5 0 0 2 5 2 5 0 0 2 4 2 4 0"/><path d="M5 11v9h14v-9"/>',
  stable: '<path d="M3 11l9-6 9 6"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6"/>',
  workshop: '<path d="M4 19l7-7"/><path d="M10 7l3-3 5 5-3 3z"/><circle cx="17" cy="17" r="3"/><path d="M17 14v6M14 17h6"/>',
  wall: '<path d="M3 9h18v11H3z"/><path d="M3 14.5h18M8 9v5.5M15 9v5.5M11.5 14.5V20M5 9V6h3v3M10.5 9V6h3v3M16 9V6h3v3"/>',
  palisade: '<path d="M5 21V8l2-3 2 3v13M10 21V7l2-3 2 3v14M15 21V8l2-3 2 3v13"/><path d="M3 12.5h18M3 17h18"/>',
  // paliçada (D35): troncos apontados
  tower: '<path d="M7 21V9h10v12"/><path d="M5 9V4h3v2h3V4h2v2h3V4h3v5z"/><path d="M10.5 21v-4h3v4"/>',
  // M3: Reino e República
  hoplite: '<circle cx="9" cy="13.5" r="6"/><circle cx="9" cy="13.5" r="1.8"/><path d="M14 9L21 2"/><path d="M18.5 2H21v2.5"/>',
  // falange: escudo redondo e lança
  eques: '<path d="M4 20l2-6c1-3 4-4 7-4h3l3-4 1 3-2 3v8"/><path d="M8 14v6M16 14v6"/><path d="M9.5 7.5a3 3 0 0 1 6 0z"/><path d="M12.5 4.5V2.5"/>',
  // cavalo e capacete com crista
  hastatus: '<rect x="3.5" y="5" width="9" height="14" rx="2"/><path d="M8 9v6"/><path d="M14 18L20.5 6"/><path d="M15.5 12l3.5 1.6"/>',
  // escudo retangular e gládio
  triarius: '<rect x="3.5" y="7" width="8" height="13" rx="2"/><path d="M13 21L21 3"/><path d="M18.6 3.2H21v2.4"/>',
  // escudo retangular e lança comprida
  velite: '<circle cx="7.5" cy="15.5" r="4.5"/><path d="M11 13L20 4M13.5 15.5L21.5 7.5"/><path d="M17.5 4H20v2.5M19 7.5h2.5V10"/>',
  // escudo pequeno e dardos
  scorpio: '<path d="M4 6.5c3 3 13 3 16 0"/><path d="M4 6.5l8 3.5 8-3.5"/><path d="M12 3v9"/><path d="M12 12l-5 9M12 12l5 9M12 12v9"/>',
  // arco grande no tripé
  ballista: '<path d="M4 14.5h16"/><path d="M6 14.5l3-7h6l3 7"/><path d="M9 7.5L6.5 3M15 7.5l2.5-4.5"/><circle cx="7" cy="18.5" r="2.2"/><circle cx="17" cy="18.5" r="2.2"/>',
  gaul: '<ellipse cx="8" cy="13" rx="4" ry="6.5"/><path d="M14 20L21 3"/><path d="M13 14.5l3 1.5"/>',
  // escudo oval e espada comprida
  tufa: '<path d="M3 6h18v14H3z"/><path d="M3 13h18M9.5 6v7M15.5 6v7M6.5 13v7M12.5 13v7M18 13v7"/>',
  // blocos grandes de tufo
  temple: '<path d="M3 9l9-5 9 5z"/><path d="M5.5 9v8.5M10 9v8.5M14 9v8.5M18.5 9v8.5"/><path d="M3 20.5h18M4 17.5h16"/>',
  mint: '<ellipse cx="9" cy="16.5" rx="5.5" ry="2.2"/><path d="M3.5 16.5v-3M14.5 16.5v-3"/><ellipse cx="9" cy="13.5" rx="5.5" ry="2.2"/><path d="M15 9l5.5-5.5M17.5 3.5l3 3"/>',
  // pilha de moedas e martelo
  aqueduct: '<path d="M2 6.5h20M2 9.5h20"/><path d="M3 21v-7.5a2.5 2.5 0 0 1 5 0V21M9.5 21v-7.5a2.5 2.5 0 0 1 5 0V21M16 21v-7.5a2.5 2.5 0 0 1 5 0V21"/>',
  // arcos
  basilica: '<path d="M2 10l10-5.5L22 10"/><path d="M4 10h16v10H4z"/><path d="M8 10v10M12 10v10M16 10v10"/>',
  road: '<path d="M8 21L10.5 3M16 21L13.5 3"/><path d="M10 8h4M9.3 13h5.4M8.6 18h6.8"/>',
  // estrada de pedras
  festa: '<path d="M12 21c-5 0-8-4-8-9 0-3 1-5 2-6M12 21c5 0 8-4 8-9 0-3-1-5-2-6"/><path d="M6 6c1 1 1.5 2 1 3M4.5 10.5c1.3.3 2.3 1.2 2.5 2.5M5.6 15.5c1.2-.2 2.3.3 3 1.3M18 6c-1 1-1.5 2-1 3M19.5 10.5c-1.3.3-2.3 1.2-2.5 2.5M18.4 15.5c-1.2-.2-2.3.3-3 1.3"/>',
  // coroa de louros (festival)
  bronze: '<path d="M6 19L18 7"/><path d="M18 7l2-4-4 2"/><path d="M7.5 13.5l3 3"/><circle cx="6" cy="19" r="1.5"/>',
  iron: '<path d="M4 18h12l4-4H8z"/><path d="M8 14V9h8v5"/><path d="M12 9V5"/>',
  wheel: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v6M12 14v6M4 12h6M14 12h6"/>',
  trade: '<path d="M4 8h13l-3-3M20 16H7l3 3"/>',
  sound: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
  amigo: '<circle cx="9" cy="8" r="3"/><path d="M3.5 19.5c0-3.2 2.4-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><circle cx="16.5" cy="9" r="2.4"/><path d="M16 14.1c2.8-.2 4.9 1.9 4.9 5"/>',
  build: '<path d="M13.5 5.5l5 5-2.5 2.5-5-5z"/><path d="M11 8l-7 7 2.5 2.5 7-7"/><path d="M14 4l2-1 5 5-1 2"/>',
  rally: '<path d="M6 21V4"/><path d="M6 4h11l-2.2 4L17 12H6"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  vs: '<path d="M5 5l9 9M19 5l-9 9"/><path d="M11.5 16.5l5-5M7.5 11.5l5 5"/><path d="M15 15l4 4M9 15l-4 4"/>',
  // duas espadas cruzadas: quem vence quem
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',
  online: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z"/>',
  // partida online (M6)
  sinal: '<path d="M6 21V4"/><path d="M6 4h9l-2 3.5 2 3.5H6"/><path d="M18 6.5a4 4 0 0 1 0 5M20.5 4.5a7 7 0 0 1 0 9"/>',
  // sinal para os aliados
  ajuda: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M12 8v6M9 11h6"/>',
  cuidado: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17.5v.01"/>',
  idle: '<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',
  army: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  cancel: '<path d="M6 6l12 12M18 6L6 18"/>',
  "season.0": '<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',
  "season.1": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  "season.2": '<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
  "season.3": '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'
}, Xh = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, Yh = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function kt(e, t) {
  const a = Vo[e] ?? Vo.animal;
  return !t && e.startsWith("season.") && (t = Yh[Number(e.slice(7))]), Kh(a, t ?? Xh[e] ?? "currentColor");
}
function na(e) {
  return e in Vo ? kt(e, "currentColor") : kt(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const ya = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), ai = (e) => Z.find((t) => t.key === e), Jh = Z.filter((e) => e.pop > 0 && e.cls !== "villager").map((e) => e.key), Zh = (e) => Z.filter((t) => t.cls === e && (t.pop > 0 || t.key === "barbarian" || t.key === "gaul")).map((t) => t.key);
function j0(e) {
  const t = ai(e);
  if (!t) return [];
  const a = [];
  for (const s of t.bonus ?? [])
    if (s.vs === "animal") a.push({ k: "animais", dmg: s.dmg });
    else for (const i of Zh(s.vs)) a.push({ k: i, dmg: s.dmg });
  return t.siege && a.push({ k: "construcoes" }), a;
}
function H0(e) {
  const t = ai(e);
  if (!t) return [];
  const a = [];
  for (const s of Z) if (s.pop > 0)
    for (const i of s.bonus ?? []) i.vs === t.cls && a.push({ k: s.key, dmg: i.dmg });
  return t.siege && a.push({ k: "todos" }), a;
}
function Qh(e) {
  const t = ai(e)?.cls;
  return t === "ranged" ? "vs.far" : t === "scout" ? "vs.scout" : t === "cavalry" ? "vs.fast" : t === "infantry" ? "vs.foot" : null;
}
function U0(e) {
  const t = ai(e);
  if (!t || t.cls === "animal") return null;
  const a = t.muro ?? 100;
  return t.proj ? "vs.muroCima" : a >= 150 ? "vs.muroForte" : a <= 50 ? "vs.muroFraco" : null;
}
const ko = ["spearman", "horseman", "slinger", "swordsman"], Tr = [ko, ko, ko, ["hoplite", "eques", "slinger"], ["triarius", "eques", "velite", "hastatus"]], tu = (e) => Tr[Math.min(e, Tr.length - 1)], $r = (e) => b(e === "animais" ? "vs.animals" : e === "construcoes" ? "vs.buildings" : e === "todos" ? "vs.anyone" : `unit.${e}`), eu = (e) => e === "animais" ? kt("animal", "currentColor") : e === "construcoes" ? kt("house", "currentColor") : e === "todos" ? kt("army", "currentColor") : na(e), Ui = (e) => e.length ? e.map((t) => `<span class="vs-i" title="${ya($r(t.k))}">${eu(t.k)}<span>${ya($r(t.k))}</span></span>`).join("") : '<span class="vs-i vs-nada">—</span>';
function Sr(e) {
  const t = j0(e), a = H0(e), s = U0(e);
  return !t.length && !a.length && !s ? "" : `<div class="vs">${t.length ? `<div class="vs-l vs-win"><b>${b("vs.win")}</b>${Ui(t)}</div>` : ""}${a.length ? `<div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${Ui(a)}</div>` : ""}${s ? `<div class="vs-l vs-muro"><b>${b("vs.muros")}</b><span class="vs-mt">${ya(b(s))}</span></div>` : ""}</div>`;
}
function au(e) {
  const t = tu(e), a = [...t, t[0]].map((i, o) => (o ? `<span class="vs-seta">${b("vs.beats")} ›</span>` : "") + `<span class="vs-c">${na(i)}<b>${ya(b(`unit.${i}`))}</b></span>`).join(""), s = [...Jh, "barbarian", "gaul"].map((i) => {
    const o = ai(i), n = o.pop > 0 && o.era > e, r = Qh(i), l = U0(i), d = i === "barbarian" || i === "gaul" ? b("vs.enemy") : n ? b("vs.from", { era: b(`era.${o.era}.in`) }) : "";
    return `<li class="vs-row${n ? " futura" : ""}"><div class="vs-who">${na(i)}<b>${ya(b(`unit.${i}`))}</b>${d ? `<small>${ya(d)}</small>` : ""}${r ? `<em>${ya(b(r))}</em>` : ""}${l ? `<em class="vs-muro">${ya(b(l))}</em>` : ""}</div><div class="vs-l vs-win"><b>${b("vs.win")}</b>${Ui(j0(i))}</div><div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${Ui(H0(i))}</div></li>`;
  }).join("");
  return `<p class="vs-intro">${b("vs.intro")}</p><div class="vs-ciclo" aria-label="${b("vs.cycle")}">${a}</div><ul class="vs-tab">${s}</ul>`;
}
const W0 = "origines_dicas";
let G0 = !1;
function su() {
  if (G0) return !0;
  try {
    return localStorage.getItem(W0) === "1";
  } catch {
    return !0;
  }
}
function iu() {
  G0 = !0;
  try {
    localStorage.setItem(W0, "1");
  } catch {
  }
}
const Rs = [
  { ic: "center", k: "tribo" },
  { ic: "villager", k: "ordens", dev: !0 },
  { ic: "house", k: "gente", dev: !0 },
  { ic: "food", k: "inverno" },
  { ic: "vs", k: "defesa" }
], ou = (e, t) => {
  const a = Rs[e];
  return b(`dica.${a.k}${a.dev ? t ? ".touch" : ".mouse" : ""}`);
};
function nu(e, t) {
  const a = Rs[e], s = Rs.length, i = e === s - 1, o = b("dica.de", { n: e + 1, total: s });
  return `<div class="card panel dica-card" role="dialog" aria-modal="true" aria-labelledby="dica-titulo">
    <div class="dica-top"><span class="dica-ic">${kt(a.ic)}</span>
      <span class="dica-pontos" role="img" aria-label="${o}" title="${o}">${Rs.map((n, r) => `<i${r <= e ? ' class="on"' : ""}></i>`).join("")}</span></div>
    <h2 id="dica-titulo">${b(`dica.${a.k}.t`)}</h2>
    <p>${ou(e, t)}</p>
    <div class="dica-btns">${i ? "<span></span>" : `<button id="btn-dica-pular" class="link">${b("dica.pular")}</button>`}
      <button id="${i ? "btn-dica-jogar" : "btn-dica-proxima"}" class="primary">${b(i ? "dica.jogar" : "dica.proxima")}</button></div>
  </div>`;
}
const so = (e) => e === "logistica" ? "combate" : "logistica", ru = (e) => e === "logistica" ? 1 : e === "combate" ? 2 : 0, lu = (e) => e === 1 ? "logistica" : e === 2 ? "combate" : null, bn = (e) => {
  const t = Z.find((a) => a.key === e);
  return !!t && t.pop > 0 && t.cls !== "villager";
}, cu = (e) => {
  const t = Z[e];
  return !!t && t.pop > 0 && t.cls !== "villager";
}, Ko = (e) => {
  const t = ct[Ot[e]];
  if (!t) return !1;
  const a = (t.trains ?? []).flat();
  return a.length > 0 && a.every(bn) && !(t.research ?? []).length;
};
function Hs(e, t, a) {
  return t ? e.isBuilding(a) ? t === "logistica" : e.isUnit(a) ? cu(e.kind[a]) ? t === "combate" : t === "logistica" : !1 : !0;
}
const du = /* @__PURE__ */ new Set(["gather", "work", "food", "build", "wall", "road", "ageup", "rally", "research", "trade"]);
function V0(e, t, a) {
  if (!t) return a;
  switch (a.type) {
    case "ia":
      return null;
    // não é ordem de quem joga
    case "train":
      return t === "logistica" || bn(a.key) ? a : null;
    // treinar tropas: os dois
    case "cancel":
      return t === "logistica" || e.isBuilding(a.building) && Ko(e.bdef(a.building).key) ? a : null;
    default: {
      if (du.has(a.type) && t !== "logistica") return null;
      if (!("ids" in a)) return t === "logistica" ? a : null;
      const s = a.ids.filter((i) => Hs(e, t, i));
      return s.length ? { ...a, ids: s } : null;
    }
  }
}
const Ba = [0, 0.2, 0.5, 0.85], Cr = "origines_som", wr = { music: 1, sfx: 3, amb: 2, muted: !1 };
class hu {
  constructor() {
    g(this, "ctx", null);
    g(this, "opts", { ...wr });
    g(this, "master");
    g(this, "duckG");
    g(this, "buses", {});
    g(this, "scene", "menu");
    g(this, "paused", !1);
    g(this, "hidden", !1);
    g(this, "onReady", []);
    g(this, "onChange", []);
    g(this, "voices", []);
    g(this, "maxVoices", 16);
    /** uma vez, na carga da página */
    g(this, "installed", !1);
    try {
      const t = JSON.parse(localStorage.getItem(Cr) ?? "null");
      t && typeof t == "object" && (this.opts = { ...wr, ...t });
    } catch {
    }
  }
  install() {
    if (this.installed) return;
    this.installed = !0;
    const t = () => this.unlock();
    for (const a of ["pointerdown", "pointerup", "touchend", "click", "keydown"]) addEventListener(a, t, { capture: !0, passive: !0 });
    document.addEventListener("visibilitychange", () => this.setHidden(document.hidden)), addEventListener("pagehide", () => this.setHidden(!0)), addEventListener("pageshow", () => this.setHidden(document.hidden));
  }
  /** cria o som no primeiro toque (antes disso o navegador não deixa) */
  unlock() {
    if (!this.ctx) {
      const a = window.AudioContext ?? window.webkitAudioContext;
      if (!a) return;
      try {
        this.ctx = new a({ latencyHint: "interactive" });
      } catch {
        return;
      }
      const s = this.ctx, i = s.createDynamicsCompressor();
      i.threshold.value = -12, i.knee.value = 8, i.ratio.value = 10, i.attack.value = 4e-3, i.release.value = 0.25, i.connect(s.destination), this.master = s.createGain(), this.master.connect(i), this.duckG = s.createGain(), this.duckG.connect(this.master);
      for (const o of ["music", "amb", "sfx", "ui", "alert"]) {
        const n = s.createGain();
        n.gain.value = 0, n.connect(o === "music" ? this.duckG : this.master), this.buses[o] = n;
      }
      this.apply(!0);
      for (const o of this.onReady.splice(0)) o();
    }
    const t = this.ctx;
    if (t.state !== "running" && t.state !== "closed" && !this.hidden) {
      t.resume().catch(() => {
      });
      try {
        const a = t.createBufferSource();
        a.buffer = t.createBuffer(1, 1, t.sampleRate), a.connect(t.destination), a.start(0);
      } catch {
      }
    }
  }
  /** roda f assim que o som estiver tocando: na hora, se já está; senão, quando o resume() terminar (o iPhone liga o som aos poucos) */
  whenRunning(t) {
    const a = this.ctx;
    if (a) {
      if (this.running) {
        t();
        return;
      }
      this.hidden || a.state === "closed" || a.resume().then(() => {
        this.running && t();
      }).catch(() => {
      });
    }
  }
  /** roda f quando o som existir (agora, se já existe) */
  ready(t) {
    this.ctx ? t() : this.onReady.push(t);
  }
  changed(t) {
    this.onChange.push(t);
  }
  out(t) {
    return this.ctx ? this.buses[t] : null;
  }
  get now() {
    return this.ctx?.currentTime ?? 0;
  }
  get running() {
    return !!this.ctx && this.ctx.state === "running" && !this.hidden;
  }
  // ── volumes ──
  setScene(t) {
    this.scene = t, this.paused = !1, this.apply();
  }
  setPaused(t) {
    this.paused = t, this.apply();
  }
  setOpts(t) {
    this.opts = { ...this.opts, ...t };
    try {
      localStorage.setItem(Cr, JSON.stringify(this.opts));
    } catch {
    }
    this.apply();
    for (const a of this.onChange) a();
  }
  toggleMute() {
    this.setOpts({ muted: !this.opts.muted });
  }
  level(t) {
    const a = this.opts;
    if (a.muted) return 0;
    switch (t) {
      case "music":
        return this.scene === "menu" ? a.music ? Math.max(Ba[2], Ba[a.music]) : 0 : Ba[a.music];
      case "amb":
        return this.scene === "game" ? Ba[a.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return Ba[a.sfx];
      case "ui":
        return Ba[a.sfx] * 0.8;
      case "alert":
        return a.sfx ? Math.max(0.5, Ba[a.sfx]) : 0;
    }
  }
  apply(t = !1) {
    if (!this.ctx) return;
    const a = this.ctx.currentTime;
    for (const s of Object.keys(this.buses)) {
      const i = this.buses[s].gain;
      i.cancelScheduledValues(a), t ? i.setValueAtTime(this.level(s), a) : i.setTargetAtTime(this.level(s), a, s === "music" ? 0.8 : 0.15);
    }
  }
  /** a música abaixa um pouco quando toca um aviso e volta sozinha */
  duck(t = 0.55, a = 2.2) {
    if (!this.ctx) return;
    const s = this.duckG.gain, i = this.ctx.currentTime;
    s.cancelScheduledValues(i), s.setTargetAtTime(1 - t, i, 0.05), s.setTargetAtTime(1, i + a, 0.6);
  }
  setHidden(t) {
    this.hidden = t, this.ctx && (t ? this.ctx.suspend().catch(() => {
    }) : this.ctx.resume().catch(() => {
    }));
  }
  /** limite de sons ao mesmo tempo: só toca se houver vaga; ocupa a vaga por dur segundos */
  voice(t) {
    const a = this.now;
    return this.voices = this.voices.filter((s) => s > a), this.voices.length >= this.maxVoices ? !1 : (this.voices.push(a + t), !0);
  }
}
const st = new hu(), Wi = { 1: { vagas: 2, times: [0, 1] }, 2: { vagas: 4, times: [0, 0, 1, 1] }, 3: { vagas: 3, times: [0, 1, 2] }, 4: { vagas: 4, times: [0, 1, 2, 3] } }, Xo = ["ajuda", "atacar", "cuidado"], uu = (e) => e.map((t, a) => t ? a : -1).filter((t) => t >= 0), Pr = { ajuda: "ajuda", atacar: "vs", cuidado: "cuidado" }, fu = ["food", "wood", "stone", "metal", "coins"], pu = ["I", "II", "III", "IV", "V", "VI"], ee = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), Zi = class Zi {
  constructor(t, a, s, i, o) {
    g(this, "root");
    g(this, "box");
    g(this, "minimap");
    g(this, "$", {});
    g(this, "cardMode", "main");
    g(this, "cardFor", "");
    g(this, "sigTop", "");
    g(this, "sigSel", "");
    g(this, "sigCard", "");
    g(this, "sigMode", "");
    g(this, "idleN", -1);
    g(this, "toasts", []);
    g(this, "btns", []);
    g(this, "progs", []);
    g(this, "mode", "normal");
    g(this, "placeOk", !0);
    g(this, "slow", 0);
    g(this, "hintHidden", !1);
    g(this, "muroN", -1);
    g(this, "muroDesenho", 0);
    // muro desenhado (D35): blocos que dá para construir (-1 = não é muro) e blocos desenhados
    g(this, "give", "food");
    // mercado: o que vai ser dado na troca
    // dica dos ícones: no celular os botões só têm ícone; tocar mostra nome, custo e para que serve, segurar só consulta
    g(this, "tipEl");
    g(this, "tipTimer", 0);
    g(this, "holdTimer", 0);
    g(this, "hoverTimer", 0);
    g(this, "tipHeld", !1);
    g(this, "placeKey", "");
    g(this, "tipUp", (t) => {
      clearTimeout(this.holdTimer), !(t.pointerType === "mouse" || this.tipEl.hidden) && (clearTimeout(this.tipTimer), this.tipTimer = window.setTimeout(() => this.hideTip(), this.tipHeld ? 4e3 : 2500));
    });
    // quem segurou para ler ganha mais tempo
    g(this, "offLang");
    // ── dicas da primeira partida (docs/15) ──
    g(this, "dica", -1);
    g(this, "dicaFim", null);
    // ── jogo com um amigo ──
    g(this, "amigoNome", null);
    g(this, "amigoFaixa", null);
    // ── papéis no jogo com um amigo (D31): o meu papel (null = comando tudo) e quem tem o outro ──
    g(this, "papel", null);
    g(this, "papelQuem", "");
    // ── partida online (M6): as tribos no alto (com o apelido de cada pessoa e os aliados), sinais e marcas ──
    g(this, "tribos", null);
    g(this, "sigTribos", "");
    g(this, "sinalTipo", null);
    g(this, "marcas", []);
    /** onde um ponto do mapa fica na tela: [x, y, visível] (posto pelo main, com a câmera) */
    g(this, "projetor", null);
    // ── taxa dos materiais (D38): quanto entra por minuto de jogo, na média dos últimos 2 minutos ──
    g(this, "amostras", []);
    this.world = t, this.me = a, this.act = s, this.touch = i, this.selected = o, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = _0(() => this.build()), st.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = st.opts.muted;
      n.innerHTML = kt(r ? "mute" : "sound"), n.title = b(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (a) => a.target?.closest?.(Zi.TIP_SEL) ?? null;
    this.root.addEventListener("pointerdown", (a) => {
      if (a.pointerType === "mouse") return;
      clearTimeout(this.holdTimer), this.tipHeld = !1;
      const s = t(a);
      s && (s.classList.contains("cb") && this.showTip(s), this.holdTimer = window.setTimeout(() => {
        this.tipHeld = !0, this.showTip(s);
      }, 550));
    }), this.root.addEventListener("pointerover", (a) => {
      if (a.pointerType !== "mouse") return;
      const s = t(a);
      s?.classList.contains("cb") && (clearTimeout(this.hoverTimer), this.hoverTimer = window.setTimeout(() => this.showTip(s), 250));
    }), this.root.addEventListener("pointerout", (a) => {
      if (a.pointerType !== "mouse") return;
      const s = t(a);
      s && s.contains(a.relatedTarget) || (clearTimeout(this.hoverTimer), this.hideTip());
    }), this.root.addEventListener("click", (a) => {
      this.tipHeld && (this.tipHeld = !1, a.stopPropagation(), a.preventDefault());
    }, !0), this.root.addEventListener("contextmenu", (a) => {
      t(a) && a.preventDefault();
    }), addEventListener("pointerup", this.tipUp), addEventListener("pointercancel", this.tipUp);
  }
  showTip(t) {
    let a = "";
    if (t.classList.contains("cb")) {
      const l = this.btns[Number(t.dataset.i)];
      if (!l) return;
      a = this.tipHtml(l);
    } else {
      const l = t.getAttribute("title") ?? t.getAttribute("aria-label");
      if (!l) return;
      a = `<div class="tip-h"><b>${ee(l)}</b></div>`;
    }
    const s = this.tipEl;
    clearTimeout(this.tipTimer), s.innerHTML = a, s.hidden = !1;
    const i = t.getBoundingClientRect(), o = s.offsetWidth, n = s.offsetHeight;
    let r = i.top - n - 8;
    r < 8 && (r = i.bottom + 8), s.style.left = `${Math.round(Math.max(8, Math.min(innerWidth - o - 8, i.left + i.width / 2 - o / 2)))}px`, s.style.top = `${Math.round(r)}px`;
  }
  hideTip() {
    clearTimeout(this.tipTimer), clearTimeout(this.hoverTimer), this.tipEl.hidden = !0;
  }
  tipHtml(t) {
    return `<div class="tip-h"><span class="tip-ic">${na(t.ic)}</span><b>${ee(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${ee(t.tip.desc)}</p>` : "") + (t.vs ? Sr(t.vs) : "") + (t.why ? `<p class="tip-why">${ee(t.why)}</p>` : "");
  }
  costHtml(t) {
    const a = this.world.players[this.me].res;
    return `<span class="cost">${ja.filter((s) => t[s]).map((s) => `<span class="c${a[s] < t[s] * 100 ? " no" : ""}">${kt(s)}${t[s]}</span>`).join("")}</span>`;
  }
  /** o botão de construir dá a versão desta era (D35: a paliçada vira muralha de pedra nos Metais; antes disso, a muralha não aparece) */
  trocada(t, a) {
    const s = ct[Ot[t]];
    return s.next && ct[Ot[s.next]].era <= a ? !0 : ct.some((i) => i.next === t && i.era <= a && s.era > a);
  }
  bldDesc(t, a) {
    const s = ct[Ot[t]], i = s.troca ?? Ha;
    return b(`bld.${t}.d`, { n: this.world.vagas(t, Math.max(a, s.era)), get: i.get, fair: i.fair });
  }
  /** a chave do que está sendo desenhado com o dedo: a estrada (M3) ou o muro desta era (D35) */
  chaveDesenho(t) {
    return this.placeKey && ct[Ot[this.placeKey]]?.estrada ? this.placeKey : this.world.muroDaEra(t) ?? this.placeKey;
  }
  build() {
    const t = this.touch;
    this.root.innerHTML = `
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="amigo-chip panel" id="amigo-chip" hidden></div>
        <div class="tribos panel" id="tribos" hidden></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-som" title="${b(st.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(st.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${st.opts.muted}">${kt(st.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-quem-vence" title="${b("btn.vs")}" aria-label="${b("btn.vs")}">${kt("vs")}</button>
          <button id="btn-ajuda" title="${b("btn.help")}" aria-label="${b("btn.help")}">${kt("help")}</button>
          <button id="btn-menu" title="${b("btn.menu")}" aria-label="${b("btn.menu")}">${kt("menu")}<span class="btn-label">${b("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <p class="amigo-faixa panel" id="amigo-faixa" hidden></p>
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${kt("check")}<span>${b("cmd.place")}</span></button>
          <button id="btn-desfazer-muro" hidden>${kt("undo")}<span>${b("cmd.undo")}</span></button>
          <button id="btn-cancelar-modo">${kt("cancel")}<span>${b("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${b(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${b("btn.idle")}">${kt("idle")}<span class="btn-label">${b("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${b("btn.army")}">${kt("army")}<span class="btn-label">${b("btn.army")}</span></button>
            <button id="btn-aldeia" title="${b("btn.home")}">${kt("home")}<span class="btn-label">${b("btn.home")}</span></button>
            <button id="btn-sinal" title="${b("sinal.btn")}" hidden>${kt("sinal")}<span class="btn-label">${b("sinal.btn")}</span></button>
          </div>
          <div class="sinais panel" id="sinais" hidden>${Xo.map((s) => `<button data-sinal="${s}">${kt(Pr[s])}<span>${b(`sinal.${s}`)}</span></button>`).join("")}</div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="marcas" id="marcas" aria-live="polite"></div>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${b("help.title")}</h2><p class="goal">${b("help.goal")}</p>
        <button id="btn-dicas-rever" class="rever">${kt("help")}<span>${b("dica.rever")}</span></button>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", "help.l11", "help.l9", "help.l8", "help.l10", t ? "help.l5.touch" : "help.l5.mouse"].map((s) => `<li>${b(s)}</li>`).join("")}</ul>
        <p class="hint-copy">${b(t ? "hint.touch" : "hint.mouse")}</p>
        <div class="row-btns"><button id="btn-quem-vence-ajuda">${kt("vs")}<span>${b("btn.vs")}</span></button><button id="btn-fechar-ajuda" class="primary">${b("help.close")}</button></div></div></div>
      <div class="modal" id="vantagens" data-open="false"><div class="card panel vs-card">
        <h2>${kt("vs")}${b("btn.vs")}</h2><div id="vantagens-corpo"></div>
        <button id="btn-fechar-vantagens" class="primary">${b("help.close")}</button></div></div>
      <div class="modal dicas" id="dicas" data-open="false"></div>`;
    for (const s of ["era", "res", "cal", "amigo-chip", "tribos", "sinais", "marcas", "amigo-faixa", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "btn-desfazer-muro", "hint", "sel", "cmd", "mini", "ajuda", "vantagens", "vantagens-corpo", "dicas", "idle-n"]) this.$[s] = document.getElementById(s);
    this.$.mini.appendChild(this.minimap);
    const a = (s, i) => {
      document.getElementById(s).onclick = i;
    };
    a("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), a("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), a("btn-quem-vence", () => this.openVs()), a("btn-quem-vence-ajuda", () => {
      this.$.ajuda.dataset.open = "false", this.openVs();
    }), a("btn-fechar-vantagens", () => this.$.vantagens.dataset.open = "false"), a("btn-dicas-rever", () => {
      this.$.ajuda.dataset.open = "false", this.act.dicas?.();
    }), this.$.dicas.onclick = (s) => {
      const i = s.target?.closest?.("button");
      i?.id === "btn-dica-proxima" ? this.proximaDica() : (i?.id === "btn-dica-pular" || i?.id === "btn-dica-jogar") && this.fecharDicas();
    }, a("btn-menu", () => this.act.menu()), a("btn-som", () => st.toggleMute()), a("btn-ocioso", () => this.act.idle()), a("btn-exercito", () => this.act.army()), a("btn-aldeia", () => this.act.home()), a("btn-sinal", () => {
      const s = this.$.sinais;
      s.hidden = !s.hidden;
    }), this.$.sinais.querySelectorAll("[data-sinal]").forEach((s) => s.onclick = () => {
      this.$.sinais.hidden = !0, this.act.sinal?.(s.dataset.sinal);
    }), a("btn-confirmar-obra", () => this.act.placeConfirm()), a("btn-cancelar-modo", () => this.act.cancelMode()), a("btn-desfazer-muro", () => this.act.undoWall()), this.$.ajuda.onclick = (s) => {
      s.target === this.$.ajuda && (this.$.ajuda.dataset.open = "false");
    }, this.$.vantagens.onclick = (s) => {
      s.target === this.$.vantagens && (this.$.vantagens.dataset.open = "false");
    }, this.sigTop = this.sigSel = this.sigCard = this.sigMode = "", this.idleN = -1, this.toasts = [], this.setAmigo(this.amigoNome), this.setFaixa(this.amigoFaixa), this.setPapel(this.papel, this.papelQuem), this.setTribos(this.tribos), this.sigTribos = "", this.dica >= 0 && this.desenharDica(), this.update(0, !0);
  }
  /** abre as dicas na primeira; fim: chamado quando a pessoa termina ou pula */
  abrirDicas(t) {
    this.hideTip(), this.$.ajuda.dataset.open = "false", this.$.vantagens.dataset.open = "false", this.dica = 0, this.dicaFim = t, this.desenharDica();
  }
  get dicasAbertas() {
    return this.dica >= 0;
  }
  desenharDica() {
    const t = this.$.dicas;
    if (t) {
      if (this.dica < 0) {
        t.dataset.open = "false", t.innerHTML = "";
        return;
      }
      t.innerHTML = nu(this.dica, this.touch), t.dataset.open = "true", this.touch || t.querySelector("button.primary")?.focus({ preventScroll: !0 });
    }
  }
  proximaDica() {
    this.dica < 0 || (this.dica < Rs.length - 1 ? (this.dica++, this.desenharDica()) : this.fecharDicas());
  }
  fecharDicas() {
    if (this.dica < 0) return;
    this.dica = -1, this.desenharDica(), iu();
    const t = this.dicaFim;
    this.dicaFim = null, t?.();
  }
  /** no alto da tela: com quem está jogando (null: sozinho) */
  setAmigo(t) {
    this.amigoNome = t;
    const a = this.$["amigo-chip"];
    if (!a) return;
    const s = t && this.papel ? b("amigo.chipPapel", { name: t, papel: b(`papel.${this.papel}`) }) : t ? b("amigo.chip", { name: t }) : "";
    a.hidden = !t, a.innerHTML = t ? `${kt("amigo")}<span>${ee(s)}</span>` : "";
  }
  setPapel(t, a) {
    this.papel = t, this.papelQuem = a;
    const s = document.getElementById("btn-ocioso"), i = document.getElementById("btn-exercito");
    s && (s.hidden = t === "combate"), i && (i.hidden = t === "logistica"), this.setAmigo(this.amigoNome), this.sigSel = "", this.refresh();
  }
  /** nomes: o apelido em cada vaga ('' = computador); null = jogo sem partida online */
  setTribos(t) {
    this.tribos = t, this.sigTribos = "";
    const a = this.$.tribos;
    if (!a) return;
    a.hidden = !t, t || (a.innerHTML = "");
    const s = !!t && this.world.players.some((o, n) => this.world.aliado(this.me, n)), i = document.getElementById("btn-sinal");
    i && (i.hidden = !s), s || (this.$.sinais.hidden = !0);
  }
  desenharTribos() {
    const t = this.tribos, a = this.$.tribos;
    if (!t || !a) return;
    const s = this.world, i = s.players.map((o) => `${o.ai ? 1 : 0}${o.defeated ? 1 : 0}`).join("") + Ye();
    i !== this.sigTribos && (this.sigTribos = i, a.innerHTML = s.players.map((o, n) => {
      const r = n === this.me ? b("tribe.you") : t[n] ? o.ai ? b("online.computadorDe", { name: t[n] }) : t[n] : b("sala.computador"), l = s.aliado(this.me, n);
      return `<span class="trib${n === this.me ? " eu" : ""}${l ? " aliado" : ""}${o.defeated ? " fora" : ""}" style="--cor:${o.color}" title="${ee(r)}${l ? " · " + b("online.aliado") : ""}"><i></i>${ee(r)}${l ? kt("amigo") : ""}</span>`;
    }).join(""));
  }
  /** o modo sinal: qual sinal o próximo toque no mapa põe */
  setSinal(t) {
    this.sinalTipo = t;
  }
  /** a marca de um sinal no mapa (some depois de 6 s) */
  addMarca(t, a, s, i) {
    const o = document.createElement("div");
    o.className = `marca-sinal ${s}`, o.innerHTML = `${kt(Pr[s])}<span><b>${ee(i)}</b>${b(`sinal.${s}`)}</span>`, this.$.marcas.appendChild(o), this.marcas.push({ x: t, z: a, ate: performance.now() + 6e3, el: o }), this.marcas.length > 6 && this.marcas.shift().el.remove(), this.posicionarMarcas();
  }
  posicionarMarcas() {
    const t = performance.now();
    this.marcas = this.marcas.filter((a) => a.ate > t ? !0 : (a.el.remove(), !1));
    for (const a of this.marcas) {
      const s = this.projetor?.(a.x, a.z);
      s && (a.el.style.transform = `translate(${Math.round(s[0])}px, ${Math.round(s[1])}px)`, a.el.hidden = !s[2]);
    }
  }
  /** a faixa de aviso do jogo com amigo (pausado pelo anfitrião, esperando, sincronizando…); null some */
  setFaixa(t) {
    this.amigoFaixa = t;
    const a = this.$["amigo-faixa"];
    a && (a.hidden = !t, a.textContent = t ?? "");
  }
  openHelp() {
    this.$.ajuda.dataset.open = "true";
  }
  /** quem vence quem: a tabela com a era de agora (as tropas das próximas eras aparecem apagadas) */
  openVs() {
    this.hideTip(), this.$["vantagens-corpo"].innerHTML = au(this.world.players[this.me].era), this.$.vantagens.dataset.open = "true";
  }
  hideHint() {
    this.hintHidden || (this.hintHidden = !0, this.$.hint.style.opacity = "0");
  }
  /** wall: 1 = escolhendo o começo da muralha, 2 = escolhendo o fim */
  /** muro: blocos que dá para construir (-1 = não é muro) e blocos desenhados */
  setMode(t, a = !0, s = -1, i = "", o = 0) {
    this.mode = t, this.placeOk = a, this.muroN = s, this.muroDesenho = o, this.placeKey = i, t !== "normal" && this.hideTip();
  }
  /** nome da construção na era (o Centro vira Salão do chefe, o campo de treino vira Quartel) */
  bldName(t, a) {
    for (let s = a; s >= 0; s--) {
      const i = `bld.${t}.e${s}`, o = b(i);
      if (o !== i) return o;
    }
    return b(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, a, s, i = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const o = document.createElement("button");
    for (o.className = "toast panel", o.dataset.aviso = i || "info", o.innerHTML = `<span>${ee(t)}</span>${a !== void 0 ? `<span class="go">${b("msg.go")}</span>` : ""}`, o.onclick = () => {
      a !== void 0 && s !== void 0 && this.act.jump(a, s), o.remove(), this.toasts = this.toasts.filter((n) => n.el !== o);
    }, this.$.toasts.prepend(o), this.toasts.unshift({ el: o, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return this.tribos && t >= 0 && t < this.tribos.length && t !== this.me ? this.tribos[t] || b("sala.computador") : t === this.me ? b("tribe.you") : b(t === It ? "tribe.wild" : `tribe.${t === ze ? 6 : t}`);
  }
  onEvents(t) {
    for (const a of t) {
      if (a.t === "age") {
        this.toast(a.player === this.me ? b("msg.ageMe", { era: b(`era.${a.era}.in`) }) : b("msg.ageOther", { p: this.tribe(a.player), era: b(`era.${a.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (a.t !== "msg" || a.player !== this.me) continue;
      const [s, i] = a.key.split("."), o = a.x !== void 0 ? a.x / 256 : void 0, n = a.z !== void 0 ? a.z / 256 : void 0;
      if (s === "built") this.toast(b("msg.built", { b: b(`bld.${i}`) }), o, n, "built");
      else if (s === "defeated") {
        const r = Number(i), l = this.tribos?.[r];
        this.toast(r === this.me ? b("msg.youDefeated") : l ? b("msg.defeatedDe", { p: l }) : b("msg.defeated", { p: this.tribos ? b(`tribe.${r}`) : this.tribe(r) }), void 0, void 0, "defeated");
      } else if (s === "tech") this.toast(b("msg.tech", { tech: b(`tech.${i}`) }), o, n, "tech");
      else if (s === "muroFalta" || s === "estradaFalta") this.toast(b(`msg.${s}`, { res: b(`res.${i}`).toLowerCase() }), o, n, s);
      else if (s === "censo") {
        const [, r, l] = a.key.split(".");
        this.toast(b("msg.censo", { n: cs(Number(r)), m: cs(Number(l)) }), void 0, void 0, "censo");
      } else if (s === "festa") {
        const r = Eo[Number(i)];
        r && this.toast(b("msg.festa", { nome: b(`festa.${r.key}`), ef: b(`festa.ef.${r.ef}`) }), void 0, void 0, "festa");
      } else this.toast(b(`msg.${s}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), s === "underAttack" || s === "raidSoon" || s === "centerLost" || s === "centerDanger" || s === "campLoot" || s === "fuga" ? o : void 0, n, s);
    }
  }
  // ── atualização ──
  update(t, a = !1) {
    for (const s of this.toasts) (s.t -= t) <= 0 && s.el.remove();
    this.toasts = this.toasts.filter((s) => s.t > 0);
    for (const s of this.progs) s.el.style.width = `${Math.round(Math.max(0, Math.min(1, s.f())) * 100)}%`;
    this.marcas.length && this.posicionarMarcas(), this.slow -= t, !(!a && this.slow > 0) && (this.slow = 0.15, this.renderTop(), this.renderMode(), this.renderSel(), this.renderCard(), this.renderIdle(), this.desenharTribos());
  }
  /** por minuto: comida (o que entra menos o que a tribo come), madeira, pedra e metal; null nos primeiros 10 s */
  taxas() {
    const t = this.world, a = t.obtido[this.me] ?? [0, 0, 0, 0, 0], s = t.comido[this.me] ?? 0, i = this.amostras[this.amostras.length - 1];
    i && (t.tick < i.t || a.some((d, h) => d < (i.o[h] ?? 0))) && (this.amostras = []);
    const o = this.amostras[this.amostras.length - 1];
    if (!o || t.tick - o.t >= Bi)
      for (this.amostras.push({ t: t.tick, o: a.slice(), c: s }); this.amostras.length > 2 && t.tick - this.amostras[1].t >= 2 * ke; ) this.amostras.shift();
    const n = this.amostras[0], r = this.amostras[this.amostras.length - 1], l = r.t - n.t;
    if (l < 10 * Bi) return null;
    const c = l / ke;
    return [0, 1, 2, 3, 4].map((d) => Math.round(((r.o[d] ?? 0) - (n.o[d] ?? 0) - (d === 0 ? r.c - n.c : 0)) / 100 / c));
  }
  renderTop() {
    const t = this.world, a = t.players[this.me], s = a.era, i = s >= Yt ? ["food", "wood", "stone", "metal", "coins"] : s >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], o = t.pop(this.me), n = t.popCap(this.me), r = this.taxas(), l = t.festaDe(this.me) ? Eo[t.month] : null, c = i.map((u) => Math.floor(a.res[u] / 100)).join(",") + `|${r?.join(",")}|${o}|${n}|${s}|${a.aging > 0}|${t.season}|${t.year}|${l?.key}|${Ye()}`;
    if (c === this.sigTop) return;
    this.sigTop = c;
    const d = (u) => {
      if (!r) return "";
      const m = r[u];
      return `<small class="taxa${m < 0 ? " neg" : m === 0 ? " zero" : ""}">${m > 0 ? "+" : m < 0 ? "−" : ""}${cs(Math.abs(m))}${b("taxa.min")}</small>`;
    }, h = (u, m) => r ? b(m === 0 ? "taxa.tip.food" : "taxa.tip", { res: b(`res.${u}`), n: cs(a.res[u] / 100), v: `${r[m] > 0 ? "+" : r[m] < 0 ? "−" : ""}${cs(Math.abs(r[m]))}` }) : b(`res.${u}`);
    this.$.res.innerHTML = i.map((u, m) => `<div class="r" title="${ee(h(u, m))}">${kt(u)}<span class="q"><span>${cs(a.res[u] / 100)}</span>${d(m)}</span></div>`).join("") + `<div class="r${o >= n ? " full" : ""}" title="${b("pop.tip", { n: o, cap: n, max: this.world.limiteEra(s) })}">${kt("pop")}<span>${o}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${pu[s]}</span><span class="name">${b(`era.${s}`)}</span>${a.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = b(`era.${s}`);
    const f = l ? `<span class="festa">${kt("festa", "#e9c46a")}<span>${ee(b(`festa.${l.key}`))}</span></span>` : "";
    this.$.cal.innerHTML = `${kt(`season.${t.season}`)}<span class="name">${b(`season.${t.season}`)}</span><span class="yr">${b("cal.year", { y: t.year })}</span>${f}<span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${b(`season.${t.season}`)} · ${b("cal.year", { y: t.year })}` + (l ? ` · ${b("cal.festa")}: ${b(`festa.${l.key}`)} (${b(`festa.${l.key}.d`)}). ${b(`festa.ef.${l.ef}`)}` : ""), this.$.cal.dataset.festa = l ? l.key : "", this.$.cal.dataset.season = String(t.season), this.bindProgs();
  }
  renderMode() {
    const t = this.world.players[this.me].era, a = this.mode === "place" && this.muroN >= 0, s = a && this.world.canAfford(this.me, ct[Ot[this.chaveDesenho(t)]].cost), i = `${this.mode}|${this.placeOk}|${this.muroN}|${this.muroDesenho}|${s}|${this.placeKey}|${t}|${Ye()}`;
    if (i === this.sigMode) return;
    this.sigMode = i;
    const o = this.$.modebar;
    o.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, o.classList.toggle("muro", a), this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && (this.touch || a)), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk)), this.$["btn-desfazer-muro"].hidden = !a, this.$["btn-desfazer-muro"].setAttribute("aria-disabled", String(!this.muroDesenho));
    const n = this.touch ? "touch" : "mouse";
    let r = this.mode === "place" ? this.placeOk ? b(`place.${n}`) : b("place.bad") : this.mode === "rally" ? b("rally.hint") : this.mode === "sinal" && this.sinalTipo ? b("sinal.toque", { sinal: b(`sinal.${this.sinalTipo}`) }) : "", l = this.mode === "place" && this.placeKey ? this.bldName(this.placeKey, t) : "";
    if (a) {
      const c = this.chaveDesenho(t), [d, h] = Object.entries(ct[Ot[c]].cost)[0], f = !!ct[Ot[c]].estrada;
      l = this.bldName(c, t), this.world.canAfford(this.me, ct[Ot[c]].cost) ? r = this.muroDesenho ? b("muro.blocos", { n: this.muroN, v: this.muroN * h, res: b(`res.${d}`).toLowerCase() }) + (this.muroN < this.muroDesenho ? " · " + b("muro.vermelhos") : "") : b(`place.${f ? "estrada" : "muro"}.${n}`) : r = b("muro.falta", { v: h, res: b(`res.${d}`).toLowerCase() }), this.muroDesenho && !this.touch && (r += " · " + b("place.muro.mouse2"));
    }
    this.$["modebar-text"].innerHTML = (l ? `<b class="mb-name">${ee(l)}</b> · ` : "") + ee(r) + (a && this.touch ? `<small class="mb-dica">${ee(b("place.muro.dica"))}</small>` : "");
  }
  renderIdle() {
    const t = this.world;
    let a = 0;
    for (let s = 0; s < t.top; s++) t.isUnit(s) && t.owner[s] === this.me && t.kind[s] === Mt.villager && t.task[s] === 0 && t.state[s] !== se && a++;
    a !== this.idleN && (this.idleN = a, this.$["idle-n"].hidden = a === 0, this.$["idle-n"].textContent = String(a));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const a = this.world, s = a.task[t], i = a.tgt[t];
    return s === Gt ? a.phase[t] === ti ? b("do.return", { n: Math.floor(a.carry[t] / 100), res: b(`res.${fu[a.carryRes[t]]}`).toLowerCase() }) : i < 0 ? b("do.move") : a.tgtTile[t] ? b(a.map.tree[i] ? "do.wood" : a.resKind[i] === fe ? "do.berry" : a.resKind[i] === Ge ? "do.stone" : a.resKind[i] === be ? "do.silver" : "do.metal") : b(a.kind[i] === Tt ? "do.meat" : "do.farm") : s === Ae ? i >= 0 && a.aPagar[i] && a.isBuilding(i) && !a.canAfford(a.owner[i], a.bdef(i).cost) ? b("do.waitRes", { res: b(`res.${Object.keys(a.bdef(i).cost)[0]}`).toLowerCase() }) : b("do.build") : b(s === Wt ? i >= 0 && a.owner[i] === It ? "do.hunt" : "do.fight" : s === ss ? "do.amove" : s === Ja ? "do.flee" : a.state[t] === se ? "do.move" : a.foodMode[t] ? "do.forage" : "do.idle");
  }
  renderSel() {
    const t = this.world, a = [...this.selected].filter((n) => t.alive[n]);
    if (!a.length) {
      this.sigSel !== "none" && (this.sigSel = "none", this.$.sel.hidden = !0);
      return;
    }
    let s, i;
    if (a.length === 1) {
      const n = a[0], r = t.kind[n], l = t.owner[n], c = l === this.me;
      if (r >= ut) {
        const d = ct[r - ut], h = t.players[l]?.era ?? 0, f = t.done[n] === 1, u = t.queue[n], m = d.key === "farm" && f ? this.farmer(n) : null;
        if (s = `b${n}|${t.hp[n]}|${f}|${u.join(",")}|${m}|${Ye()}|${this.papel}`, s === this.sigSel) return;
        const v = c ? f ? "" : b("info.building") : this.tribe(l), y = this.bldDesc(d.key, h);
        i = this.head(na(d.key), this.bldName(d.key, h), v, c) + this.hp(t.hp[n], d.hp) + (!f && c ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${y}</div>` + (m !== null ? `<div class="sel-line">${b("info.farmer", { who: b(m ? "info.yes" : "info.no") })}</div>` : "") + (c ? this.quemComanda(n, d.key) : "") + (u.length ? `<div class="queue" aria-label="${b("info.queue")}">${u.map((M, k) => {
          const x = M >= Me ? Aa[M - Me].key : Z[M].key;
          return `<span class="qi" title="${b(M >= Me ? `tech.${x}` : `unit.${x}`)}">${na(x)}${k === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === Tt) {
        const d = Math.floor(t.work[n] / 100);
        if (s = `c${n}|${d}|${Ye()}`, s === this.sigSel) return;
        i = this.head(kt("carcass", "currentColor"), b("unit.carcass"), b(`unit.${Z[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${b("unit.carcass.d", { food: d })}</div>`;
      } else {
        const d = Z[r], h = c ? this.doing(n) : this.tribe(l), f = c ? this.quemComanda(n) : "";
        if (s = `u${n}|${t.hp[n]}|${h}|${Ye()}|${this.papel}`, s === this.sigSel) return;
        i = this.head(na(d.key), b(`unit.${d.key}`), h, c) + this.hp(t.hp[n], d.hp) + `<div class="sel-desc">${b(`unit.${d.key}.d`, { food: d.animal?.food ?? 0 })}</div>` + f + Sr(d.key);
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of a) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, c) => l[0] - c[0]);
      if (s = "m" + r.map(([l, c]) => `${l}:${c}`).join(",") + Ye(), s === this.sigSel) return;
      i = this.head(kt("pop", "currentColor"), b("sel.many", { n: a.length }), "", !0) + `<div class="sel-icons">${r.map(([l, c]) => `<button data-selecionar="${Z[l]?.key ?? l}" title="${b(`unit.${Z[l]?.key}`)}">${na(Z[l]?.key ?? "")}<span>${c}</span></button>`).join("")}</div>`;
    }
    this.sigSel = s, this.$.sel.hidden = !1, this.$.sel.innerHTML = i, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(Mt[n.dataset.selecionar]));
    const o = this.$.sel.querySelector("#btn-limpar-selecao");
    o && (o.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, a, s, i) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${ee(a)}</div>${s ? `<div class="sel-sub">${ee(s)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${b("sel.clear")}" aria-label="${b("sel.clear")}">${kt("close")}</button></div>`;
  }
  /** com papel (D31): no que é do outro papel, quem comanda; no campo de treino, o Líder de Combate só treina tropas */
  quemComanda(t, a = "") {
    const s = this.papel;
    if (!s || Hs(this.world, s, t)) return "";
    const i = b(`papel.${so(s)}`), o = ee(this.papelQuem || "?"), n = a && Ko(a) ? b("papel.soTreinar", { name: o, papel: i }) : b("papel.quem", { name: o, papel: i });
    return `<div class="sel-line papel-quem">${kt("amigo")}<span>${n}</span></div>`;
  }
  hp(t, a) {
    const s = Math.max(0, Math.min(1, t / a));
    return `<div class="hp" title="${b("info.hp")} ${Math.max(0, t)}/${a}"><i style="width:${Math.round(s * 100)}%" class="${s > 0.6 ? "ok" : s > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const a = this.world;
    for (let s = 0; s < a.top; s++) if (a.isUnit(s) && a.task[s] === Gt && a.tgt[s] === t && !a.tgtTile[s]) return !0;
    return !1;
  }
  // ── cartão de comandos ──
  missing(t) {
    const a = this.world.players[this.me].res;
    return ja.find((s) => a[s] < (t[s] ?? 0) * 100);
  }
  whyCost(t) {
    const a = this.missing(t);
    return a ? b("why.cost", { res: b(`res.${a}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, a = this.me, s = t.players[a], i = [...this.selected].filter((M) => t.alive[M]), o = i.filter((M) => t.isUnit(M) && t.owner[M] === a && Hs(t, this.papel, M)), n = o.filter((M) => t.kind[M] === Mt.villager), r = this.papel === "combate", l = [];
    if (o.length) {
      if (this.cardMode === "build" && n.length) {
        l.push({ id: "btn-voltar-comandos", ic: "back", label: b("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const M of ct) if (M.buildable && M.era <= s.era + 1 && !this.trocada(M.key, s.era)) {
          const k = M.era > s.era ? b("why.era", { era: b(`era.${M.era}.in`) }) : this.whyCost(M.cost), x = this.bldName(M.key, s.era);
          l.push({ data: ["construir", M.key], ic: M.key, label: x, tip: { name: x, desc: this.bldDesc(M.key, s.era) }, cost: M.cost, why: k, act: () => this.act.startPlace(M.key) });
        }
        return l;
      }
      if (n.length && l.push({ id: "btn-construir", ic: "build", label: b("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const M = n.every((k) => t.foodMode[k] > 0);
        l.push({ id: "btn-buscar-comida", ic: "food", label: b("cmd.food"), tip: { name: b("cmd.food"), desc: b(M ? "cmd.food.off" : "cmd.food.d") }, pressed: M, act: () => this.act.food(!M) });
      }
      return l.push({ id: "btn-parar", ic: "stop", label: b("cmd.stop"), act: () => this.act.stop() }), l;
    }
    if (i.length !== 1 || !t.isBuilding(i[0]) || t.owner[i[0]] !== a) return l;
    const c = i[0], d = t.bdef(c), h = t.done[c] === 1, f = s.era;
    if (!h) return l;
    const u = qs(d, f), m = t.pop(a), v = t.popCap(a);
    let y = 0;
    for (let M = 0; M < t.top; M++) if (t.isBuilding(M) && t.owner[M] === a)
      for (const k of t.queue[M]) k < Me && (y += Z[k].pop);
    for (const M of u) {
      if (r && !bn(M)) continue;
      const k = Z[Mt[M]], x = t.queue[c], z = x.length >= 5 ? b("why.queue") : this.whyCost(k.cost) ?? (m + y + k.pop > v ? b(v >= this.world.limiteEra(f) ? "why.popEra" : "why.pop") : void 0);
      l.push({ data: ["treinar", M], ic: M, label: b(`unit.${M}`), tip: { name: b(`unit.${M}`), desc: b(`unit.${M}.d`) }, vs: M, cost: k.cost, why: z, badge: x.filter((A) => A === Mt[M]).length, act: () => this.act.train(c, M) });
    }
    for (const M of r ? [] : d.research ?? []) {
      const k = Ni[M], x = Aa[k], z = t.queue[c];
      if (t.hasTech(a, M)) continue;
      const A = t.techQueued(a, k) ? b("why.techQueued") : x.needs && !t.hasTech(a, x.needs) ? b("why.needs", { tech: b(`tech.${x.needs}`) }) : z.length >= 5 ? b("why.queue") : this.whyCost(x.cost);
      l.push({ data: ["pesquisar", M], ic: M, label: `${b(`tech.${M}`)}: ${b(`tech.${M}.d`)}`, tip: { name: b(`tech.${M}`), desc: b(`tech.${M}.d`) }, cost: x.cost, why: A, act: () => this.act.research(c, M) });
    }
    if (d.market && !r) {
      const M = t.troca(c, a), k = t.feiraDe(a), x = Ya.filter((z) => z !== "coins" || f >= Yt);
      x.includes(this.give) || (this.give = x[0]);
      for (const z of x) l.push({ data: ["dar", z], ic: z, label: b("trade.give", { res: b(`res.${z}`).toLowerCase() }), short: b("trade.giveShort"), pressed: this.give === z, act: () => {
        this.give = z;
      } });
      for (const z of x) if (z !== this.give) {
        const A = s.res[this.give] < Ha.give * 100 ? b("why.trade", { res: b(`res.${this.give}`).toLowerCase() }) : void 0;
        l.push({ data: ["receber", z], ic: z, label: (k ? b("trade.fair") + " " : "") + b("trade.get", { n: M, res: b(`res.${z}`).toLowerCase() }), short: `+${M}`, cost: { [this.give]: Ha.give }, why: A, act: () => this.act.trade(c, this.give, z) });
      }
    }
    if (t.queue[c].length && (!r || Ko(d.key)) && l.push({ id: "btn-cancelar-fila", ic: "cancel", label: b("cmd.cancelQueue"), act: () => this.act.cancelQueue(c) }), d.key === "center" && !r)
      if (s.aging > 0) l.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.aging", { era: b(`era.${f + 1}.to`) }), why: b("why.ageBusy"), prog: () => 1 - s.aging / (Oe[f].time * 10), act: () => {
      } });
      else if (f < cn) {
        const M = t.eraBuildingTypes(a), k = Oe[f], x = f + 1 === Yt, z = x ? b("cmd.fundar") : b("cmd.ageup", { era: b(`era.${f + 1}.to`) });
        l.push({ id: "btn-avancar-era", ic: "ageup", label: z, tip: { name: z, desc: x ? `${b("cmd.fundar.d")} ${b("help.l4")}` : b("help.l4") }, cost: k.cost, why: M < 2 ? b("why.age", { n: M }) : this.whyCost(k.cost), act: () => this.act.ageUp(c) });
      } else l.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.ageup", { era: b(`era.${f + 1}.to`) }), why: b("why.maxEra"), act: () => {
      } });
    return u.length && !r && l.push({ id: "btn-ponto-reuniao", ic: "rally", label: b("cmd.rally"), tip: { name: b("cmd.rally"), desc: b("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(c) }), l;
  }
  refresh() {
    this.sigCard = "", this.slow = 0;
  }
  renderCard() {
    const t = [...this.selected].filter((n) => this.world.alive[n]), a = t.slice(0, 4).join(",");
    a !== this.cardFor && (this.cardFor = a, this.cardMode = "main");
    const s = this.buttons(), i = s.map((n) => `${n.id ?? n.data?.join("=")}|${n.label}|${n.why ?? ""}|${n.badge ?? ""}|${n.pressed ?? ""}`).join(";") + Ye();
    if (i === this.sigCard) {
      this.btns = s;
      return;
    }
    this.sigCard = i, this.btns = s;
    const o = this.$.cmd;
    o.hidden = s.length === 0, o.innerHTML = s.map((n, r) => {
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, c = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${ee(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${na(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${ee(n.label)}</span>${n.short ? `<span class="cb-s">${ee(n.short)}</span>` : ""}${c}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
    }).join(""), o.querySelectorAll("button[data-i]").forEach((n) => n.onclick = () => {
      const r = this.btns[Number(n.dataset.i)];
      if (r) {
        if (r.why) {
          this.tipEl.hidden && this.toast(r.why, void 0, void 0, "why");
          return;
        }
        r.act(), this.refresh();
      }
    }), this.bindProgs();
  }
  bindProgs() {
    const t = this.world, a = t.players[this.me];
    this.progs = [], this.root.querySelectorAll("[data-p]").forEach((s) => {
      const [i, o] = (s.dataset.p ?? "").split(":"), n = Number(o);
      let r = null;
      i === "aging" || i === "btn" ? r = () => a.aging > 0 ? 1 - a.aging / (Oe[Math.min(a.era, Oe.length - 1)].time * 10) : 0 : i === "season" ? r = () => t.tick % 1800 / 1800 : i === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : i === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= Me ? Aa[l - Me].time : Z[l].time) * 10);
      }), r && this.progs.push({ el: s, f: r });
    });
  }
};
// ── dica dos ícones ──
g(Zi, "TIP_SEL", ".cb, .qi, .sel-icons button, .sel .vs-i, .r, .era-chip, .cal, .tools button, .quick button");
let Yo = Zi;
class mu {
  constructor(t, a, s, i) {
    g(this, "ctx");
    g(this, "base");
    g(this, "img");
    g(this, "t", 1);
    /** partida online (M6): o sinal de um aliado, um círculo piscando por 6 s */
    g(this, "marcas", []);
    g(this, "metalOn", !1);
    g(this, "prataOn", !1);
    this.world = a, this.me = s, this.cam = i;
    const o = a.size;
    t.width = t.height = o, this.ctx = t.getContext("2d"), this.base = this.ctx.createImageData(o, o), this.img = this.ctx.createImageData(o, o);
    const n = a.map, r = this.base.data;
    for (let d = 0; d < o; d++) for (let h = 0; h < o; h++) {
      const f = d * o + h, u = n.terrain[f], m = n.heights[Math.round(d / n.hstep) * n.hn + Math.round(h / n.hstep)];
      let v = [104, 150, 72];
      if (u === Ma) v = [46, 104, 128];
      else if (u === Ka) v = [86, 150, 160];
      else if (u === Di) v = [205, 186, 140];
      else if (u === va || u === Ze && m > to - 0.3) v = [140, 135, 125];
      else {
        const y = Math.max(0, Math.min(1, (m - 1) / 12));
        v = [104 + y * 30, 150 - y * 10, 72 + y * 20];
      }
      n.tree[f] && (v = [52, 92, 50]), r.set([v[0], v[1], v[2], 255], f * 4);
    }
    for (const d of n.res) {
      const h = d.kind === fe ? [200, 60, 70] : d.kind === Ge ? [215, 210, 200] : d.kind === Ce ? [90, 190, 160] : [255, 255, 255];
      d.kind === Ce || d.kind === be || !a.resKind[d.z * o + d.x] || this.base.data.set([h[0], h[1], h[2], 255], (d.z * o + d.x) * 4);
    }
    let l = !1;
    const c = (d) => {
      const h = t.getBoundingClientRect();
      this.cam.tx = (d.clientX - h.left) / h.width * o, this.cam.tz = (d.clientY - h.top) / h.height * o;
    };
    t.addEventListener("pointerdown", (d) => {
      l = !0, t.setPointerCapture(d.pointerId), c(d), d.stopPropagation();
    }), t.addEventListener("pointermove", (d) => {
      l && c(d);
    }), t.addEventListener("pointerup", () => {
      l = !1;
    }), t.addEventListener("pointercancel", () => {
      l = !1;
    });
  }
  marcar(t, a, s) {
    this.marcas.push({ x: t, z: a, cor: s, ate: performance.now() + 6e3 }), this.marcas.length > 6 && this.marcas.shift(), this.t = 1;
  }
  /** árvore cortada ou pedra acabada: vira chão no minimapa */
  clearTile(t) {
    this.base.data.set([112, 148, 76, 255], t * 4), this.t = 1;
  }
  update(t, a, s, i) {
    if ((this.t += t) < 0.25) return;
    if (this.t = 0, !this.metalOn && this.world.players[this.me].era >= 2) {
      this.metalOn = !0;
      const u = this.world.size;
      for (const m of this.world.map.res) m.kind === Ce && this.world.resKind[m.z * u + m.x] === Ce && this.base.data.set([90, 190, 160, 255], (m.z * u + m.x) * 4);
    }
    if (!this.prataOn && this.world.players[this.me].era >= Yt) {
      this.prataOn = !0;
      const u = this.world.size;
      for (const m of this.world.map.res) m.kind === be && this.world.resKind[m.z * u + m.x] === be && this.base.data.set([196, 212, 240, 255], (m.z * u + m.x) * 4);
    }
    const o = this.world.size, n = this.base.data, r = this.img.data, l = this.world.vis[this.me], c = this.world.explored[this.me];
    for (let u = 0; u < o * o; u++) {
      const m = !a || l[u] ? 1 : c[u] ? 0.5 : 0.08, v = u * 4;
      r[v] = n[v] * m, r[v + 1] = n[v + 1] * m, r[v + 2] = n[v + 2] * m, r[v + 3] = 255;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const d = this.world;
    for (let u = 0; u < d.top; u++) {
      if (!d.alive[u]) continue;
      const m = d.x[u] / 256, v = d.z[u] / 256, y = d.owner[u] === this.me;
      if (a && !y && !l[Math.floor(v) * o + Math.floor(m)] || d.kind[u] === Tt) continue;
      const M = d.kind[u] >= ut, k = d.owner[u], x = M ? d.bdef(u).size === 1 ? 2 : 7 : k === It ? 2 : 3;
      this.ctx.fillStyle = k === It ? "#e8d9b0" : k === ze ? "#2f3b27" : d.players[k]?.color ?? "#fff", this.ctx.fillRect(m - x / 2, v - x / 2, x, x), M && x > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(m - x / 2, v - x / 2, x, x));
    }
    const h = performance.now();
    this.marcas = this.marcas.filter((u) => u.ate > h);
    for (const u of this.marcas) {
      const m = 5 + Math.floor(h / 250) % 2 * 2;
      this.ctx.strokeStyle = u.cor, this.ctx.lineWidth = 2.5, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, m, 0, Math.PI * 2), this.ctx.stroke(), this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, m + 2, 0, Math.PI * 2), this.ctx.stroke();
    }
    const f = [[0, 0], [s, 0], [s, i], [0, i]].map(([u, m]) => this.cam.ground(u, m, s, i));
    f.every((u) => u) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), f.forEach((u, m) => m ? this.ctx.lineTo(u.x, u.z) : this.ctx.moveTo(u.x, u.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class gu {
  constructor(t, a, s, i, o, n) {
    g(this, "selected", /* @__PURE__ */ new Set());
    /** papel no jogo com um amigo (D31): só seleciona em grupo e só manda no que é do papel; null = tudo */
    g(this, "papel", null);
    g(this, "pointers", /* @__PURE__ */ new Map());
    g(this, "gesture", "none");
    g(this, "longTimer", 0);
    g(this, "lastTap", { t: 0, x: 0, y: 0 });
    g(this, "keys", /* @__PURE__ */ new Set());
    g(this, "v", new Et());
    g(this, "v2", new Et());
    g(this, "right", new Et());
    g(this, "ac", new AbortController());
    this.canvas = t, this.world = a, this.me = s, this.cam = i, this.box = o, this.hooks = n;
    const r = { signal: this.ac.signal };
    t.addEventListener("pointerdown", (l) => this.down(l), r), t.addEventListener("pointermove", (l) => this.move(l), r), t.addEventListener("pointerup", (l) => this.up(l), r), t.addEventListener("pointercancel", (l) => this.cancel(l), r), t.addEventListener("contextmenu", (l) => l.preventDefault(), r), t.addEventListener("wheel", (l) => {
      l.preventDefault(), this.cam.tdist *= Math.exp(l.deltaY * 12e-4), this.hooks.onInteract();
    }, { passive: !1, signal: this.ac.signal }), addEventListener("keydown", (l) => this.key(l), r), addEventListener("keyup", (l) => this.keys.delete(l.key.toLowerCase()), r), addEventListener("blur", () => this.keys.clear(), r);
  }
  manda(t) {
    return Hs(this.world, this.papel, t);
  }
  dispose() {
    this.ac.abort(), clearTimeout(this.longTimer), this.hideBox();
  }
  get W() {
    return this.canvas.clientWidth;
  }
  get H() {
    return this.canvas.clientHeight;
  }
  key(t) {
    if (!(t.target?.tagName === "BUTTON" && (t.key === " " || t.key === "Enter"))) {
      if (t.key === "Escape") {
        this.hooks.mode() !== "normal" ? this.hooks.onCancel() : this.selected.size && (this.selected.clear(), this.hooks.onSelect());
        return;
      }
      if (t.key === "Enter" && this.hooks.mode() === "place" && this.hooks.drawing()) {
        this.hooks.onPlaceConfirm(!1);
        return;
      }
      this.keys.add(t.key.toLowerCase());
    }
  }
  down(t) {
    if (this.canvas.setPointerCapture(t.pointerId), this.hooks.onInteract(), this.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY, sx: t.clientX, sy: t.clientY, t: performance.now(), button: t.button, type: t.pointerType }), clearTimeout(this.longTimer), this.pointers.size === 2) {
      this.gesture === "draw" && this.endDraw(), this.gesture = "pinch", this.hideBox();
      return;
    }
    t.pointerType === "mouse" ? t.button === 1 || t.button === 0 && t.altKey ? this.gesture = "rotate" : this.gesture = "none" : (this.gesture = "none", this.hooks.mode() === "normal" && (this.longTimer = window.setTimeout(() => {
      this.gesture === "none" && this.pointers.size === 1 && (this.gesture = "box", this.drawBox());
    }, 380)));
  }
  move(t) {
    const a = this.pointers.get(t.pointerId);
    if (!a) {
      if (t.pointerType === "mouse" && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      }
      return;
    }
    const s = t.clientX - a.x, i = t.clientY - a.y, o = Math.hypot(t.clientX - a.sx, t.clientY - a.sy);
    if (this.gesture === "draw") {
      const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("move", n.x, n.z), a.x = t.clientX, a.y = t.clientY;
      return;
    }
    if (this.gesture === "none" && this.pointers.size === 1 && this.hooks.mode() === "place" && this.hooks.drawing() && (a.type !== "mouse" || a.button === 0) && o > (a.type === "mouse" ? 6 : 10)) {
      this.gesture = "draw", clearTimeout(this.longTimer);
      const n = this.cam.ground(a.sx, a.sy, this.W, this.H), r = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("start", n.x, n.z), r && this.hooks.onDraw("move", r.x, r.z), a.x = t.clientX, a.y = t.clientY;
      return;
    }
    if (this.gesture === "pinch" && this.pointers.size === 2) {
      const n = [...this.pointers.entries()].find(([h]) => h !== t.pointerId)[1], r = Math.hypot(a.x - n.x, a.y - n.y), l = Math.hypot(t.clientX - n.x, t.clientY - n.y);
      l > 10 && r > 10 && (this.cam.tdist *= r / l);
      const c = Math.atan2(a.y - n.y, a.x - n.x), d = Math.atan2(t.clientY - n.y, t.clientX - n.x);
      this.cam.tyaw += Math.atan2(Math.sin(d - c), Math.cos(d - c)), this.cam.pan(s * 0.5, i * 0.5, this.H);
    } else if (this.gesture === "rotate")
      this.cam.tyaw -= s * 6e-3;
    else if (a.type === "mouse")
      if (a.button === 0 && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      } else a.button === 0 && (this.gesture === "box" || o > 6) && (this.gesture = "box", this.drawBox(a, t));
    else
      this.gesture === "none" && this.hooks.mode() === "normal" && o > 10 && performance.now() - a.t >= 380 && Math.hypot(a.x - a.sx, a.y - a.sy) < 10 && (this.gesture = "box"), this.gesture === "box" ? this.drawBox(a, t) : (this.gesture === "pan" || o > 10) && (this.gesture = "pan", clearTimeout(this.longTimer), this.cam.pan(s, i, this.H));
    a.x = t.clientX, a.y = t.clientY;
  }
  up(t) {
    const a = this.pointers.get(t.pointerId);
    if (this.pointers.delete(t.pointerId), clearTimeout(this.longTimer), !a) return;
    if (this.gesture === "pinch") {
      this.pointers.size === 0 && (this.gesture = "none");
      return;
    }
    if (this.gesture === "draw") {
      this.endDraw(t.clientX, t.clientY);
      return;
    }
    if (this.gesture === "box") {
      this.selectBox(a.sx, a.sy, t.clientX, t.clientY, t.shiftKey), this.hideBox(), this.gesture = "none";
      return;
    }
    if (this.gesture === "pan" || this.gesture === "rotate") {
      this.gesture = "none";
      return;
    }
    this.gesture = "none";
    const s = t.clientX, i = t.clientY, o = this.hooks.mode(), n = performance.now(), r = n - this.lastTap.t < 320 && Math.hypot(s - this.lastTap.x, i - this.lastTap.y) < 30;
    if (this.lastTap = { t: n, x: s, y: i }, a.type === "mouse") {
      if (a.button === 2) {
        if (o === "place") {
          this.hooks.onCancel();
          return;
        }
        const f = this.cam.ground(s, i, this.W, this.H);
        if (!f) return;
        if (o === "rally" || o === "sinal" || this.singleOwnBuilding() >= 0) {
          this.hooks.onRally(f.x, f.z);
          return;
        }
        this.ownUnitsSelected() && this.hooks.onCommand(this.target(s, i, f));
      } else if (a.button === 0) {
        if (o === "place") {
          const f = this.cam.ground(s, i, this.W, this.H);
          if (this.hooks.drawing()) {
            f && this.hooks.onDraw("tap", f.x, f.z);
            return;
          }
          f && this.hooks.onPlaceAt(f.x, f.z), this.hooks.onPlaceConfirm(t.shiftKey);
          return;
        }
        if (o === "rally" || o === "sinal") {
          const f = this.cam.ground(s, i, this.W, this.H);
          f && this.hooks.onRally(f.x, f.z);
          return;
        }
        this.clickSelect(s, i, t.shiftKey, r);
      }
      return;
    }
    const l = this.cam.ground(s, i, this.W, this.H);
    if (o === "place") {
      l && (this.hooks.drawing() ? this.hooks.onDraw("tap", l.x, l.z) : this.hooks.onPlaceAt(l.x, l.z));
      return;
    }
    if (o === "rally" || o === "sinal") {
      l && this.hooks.onRally(l.x, l.z);
      return;
    }
    const c = this.target(s, i, l), d = this.world, h = this.ownUnitsSelected();
    if (c.kind === "unit" && d.owner[c.e] === this.me && d.kind[c.e] !== Tt && this.manda(c.e)) {
      this.clickSelect(s, i, !1, r);
      return;
    }
    if (c.kind === "building" && d.owner[c.e] === this.me) {
      const f = !d.done[c.e] || ct[d.kind[c.e] - ut].walk;
      h && f ? this.hooks.onCommand(c) : this.only(c.e);
      return;
    }
    if (h && l) {
      this.hooks.onCommand(c);
      return;
    }
    if (c.kind === "unit" || c.kind === "building") {
      this.only(c.e);
      return;
    }
    this.selected.size && (this.selected.clear(), this.hooks.onSelect());
  }
  cancel(t) {
    this.pointers.delete(t.pointerId), clearTimeout(this.longTimer), this.hideBox(), this.gesture === "draw" && this.endDraw(), this.gesture = "none";
  }
  /** fim de um traço do muro (o que foi desenhado fica) */
  endDraw(t, a) {
    this.gesture = "none";
    const s = t !== void 0 && a !== void 0 ? this.cam.ground(t, a, this.W, this.H) : null;
    this.hooks.onDraw("end", s?.x ?? -1, s?.z ?? -1);
  }
  only(t) {
    this.selected.clear(), this.selected.add(t), this.hooks.onSelect();
  }
  ownUnitsSelected() {
    for (const t of this.selected) if (this.world.isUnit(t) && this.world.owner[t] === this.me && this.manda(t)) return !0;
    return !1;
  }
  singleOwnBuilding() {
    if (this.selected.size !== 1) return -1;
    const t = this.selected.values().next().value;
    return this.world.isBuilding(t) && this.world.owner[t] === this.me ? t : -1;
  }
  seen(t, a, s = !1) {
    if (!this.hooks.fogOn()) return !0;
    const i = this.world.size, o = Math.floor(t), n = Math.floor(a);
    return o < 0 || n < 0 || o >= i || n >= i ? !1 : (s ? this.world.explored : this.world.vis)[this.me][n * i + o] === 1;
  }
  /** pessoa, animal ou caça mais perto do ponto da tela */
  pickUnit(t, a, s) {
    const i = this.world, o = this.lastTouch ? 34 : 24;
    let n = -1, r = o * o;
    for (let l = 0; l < i.top; l++) {
      if (!i.alive[l] || i.kind[l] >= ut) continue;
      const c = i.owner[l] === this.me;
      if (s && !c) continue;
      const d = i.x[l] / 256, h = i.z[l] / 256;
      if (!c && !this.seen(d, h) || (this.cam.toScreen(d, zt(i.map, d, h) + (i.kind[l] === Tt ? 0.2 : 0.6), h, this.W, this.H, this.v), !this.v.z)) continue;
      const f = (this.v.x - t) ** 2 + (this.v.y - a) ** 2;
      f < r && (r = f, n = l);
    }
    return [n, Math.sqrt(r)];
  }
  get lastTouch() {
    for (const t of this.pointers.values()) return t.type !== "mouse";
    return matchMedia("(pointer: coarse)").matches;
  }
  /** construção sob o ponto da tela (pelo tamanho dela na tela) */
  pickBuilding(t, a) {
    const s = this.world;
    let i = -1, o = 1;
    this.right.set(1, 0, 0).applyQuaternion(this.cam.cam.quaternion);
    for (let n = 0; n < s.top; n++) {
      if (!s.isBuilding(n)) continue;
      const r = s.x[n] / 256, l = s.z[n] / 256;
      if (s.owner[n] !== this.me && !this.seen(r, l, !0)) continue;
      const c = ct[s.kind[n] - ut].size, d = zt(s.map, r, l) + (c >= 3 ? 0.7 : 0.5);
      if (this.cam.toScreen(r, d, l, this.W, this.H, this.v), !this.v.z) continue;
      this.cam.toScreen(r + this.right.x * c * 0.55, d, l + this.right.z * c * 0.55, this.W, this.H, this.v2);
      const h = Math.max(18, Math.hypot(this.v2.x - this.v.x, this.v2.y - this.v.y)), f = Math.hypot(this.v.x - t, this.v.y - a) / h;
      f < o && (o = f, i = n);
    }
    return [i, o];
  }
  /** árvore, arbusto ou pedra perto do ponto (a copa de uma árvore cobre o chão atrás dela) */
  pickTile(t, a, s) {
    const i = this.world, o = i.size, n = Math.floor(s.x), r = Math.floor(s.z), l = this.lastTouch ? 36 : 28;
    let c = -1, d = l * l;
    for (let h = -3; h <= 2; h++) for (let f = -3; f <= 3; f++) {
      const u = n + f, m = r + h;
      if (u < 0 || m < 0 || u >= o || m >= o) continue;
      const v = m * o + u, y = i.map.tree[v] > 0;
      if (!(!(y || i.resKind[v]) || i.resAmt[v] <= 0 || !i.explored[this.me][v]) && !(i.resKind[v] === 3 && i.players[this.me].era < 2))
        for (const M of y ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(u + 0.5, zt(i.map, u + 0.5, m + 0.5) + M, m + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const k = (this.v.x - t) ** 2 + (this.v.y - a) ** 2;
          k < d && (d = k, c = v);
        }
    }
    return c;
  }
  /** o que está sob o ponto da tela */
  target(t, a, s = this.cam.ground(t, a, this.W, this.H)) {
    const i = this.world, o = s?.x ?? 0, n = s?.z ?? 0, [r, l] = this.pickUnit(t, a, !1), [c, d] = this.pickBuilding(t, a);
    if (r >= 0 && (c < 0 || l < 14 || d > 0.75)) return { kind: "unit", e: r, k: -1, x: i.x[r] / 256, z: i.z[r] / 256 };
    if (c >= 0) return { kind: "building", e: c, k: -1, x: i.x[c] / 256, z: i.z[c] / 256 };
    if (s) {
      const h = this.pickTile(t, a, s);
      if (h >= 0) return { kind: "tile", e: -1, k: h, x: h % i.size + 0.5, z: Math.floor(h / i.size) + 0.5 };
    }
    return { kind: "ground", e: -1, k: -1, x: o, z: n };
  }
  clickSelect(t, a, s, i) {
    const o = this.world, n = this.target(t, a, null), r = n.kind === "unit" ? n.e : -1;
    if (s && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && o.owner[r] === this.me && o.kind[r] !== Tt && this.manda(r)) {
      if (s || this.selected.clear(), i) {
        const l = o.kind[r];
        for (let c = 0; c < o.top; c++) if (o.isUnit(c) && o.owner[c] === this.me && o.kind[c] === l && this.manda(c)) {
          const d = o.x[c] / 256, h = o.z[c] / 256;
          this.cam.toScreen(d, zt(o.map, d, h), h, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(c);
        }
      } else s && this.selected.has(r) ? this.selected.delete(r) : this.selected.add(r);
      this.hooks.onSelect();
      return;
    }
    if (n.kind === "unit" || n.kind === "building") {
      this.only(n.e);
      return;
    }
    !s && this.selected.size && (this.selected.clear(), this.hooks.onSelect());
  }
  selectBox(t, a, s, i, o) {
    const n = this.world, r = Math.min(t, s), l = Math.max(t, s), c = Math.min(a, i), d = Math.max(a, i);
    (!o || !this.ownUnitsSelected()) && this.selected.clear();
    for (let h = 0; h < n.top; h++) {
      if (!n.isUnit(h) || n.owner[h] !== this.me || !this.manda(h)) continue;
      const f = n.x[h] / 256, u = n.z[h] / 256;
      this.cam.toScreen(f, zt(n.map, f, u) + 0.5, u, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= c && this.v.y <= d && this.selected.add(h);
    }
    this.hooks.onSelect();
  }
  drawBox(t, a) {
    const s = this.box;
    if (s.style.display = "block", !t || !a) {
      const i = [...this.pointers.values()][0];
      if (!i) return;
      s.style.left = i.sx + "px", s.style.top = i.sy + "px", s.style.width = s.style.height = "2px";
      return;
    }
    s.style.left = Math.min(t.sx, a.clientX) + "px", s.style.top = Math.min(t.sy, a.clientY) + "px", s.style.width = Math.abs(a.clientX - t.sx) + "px", s.style.height = Math.abs(a.clientY - t.sy) + "px";
  }
  hideBox() {
    this.box.style.display = "none";
  }
  /** teclado: WASD/setas movem, Q/E giram, +/- zoom */
  update(t) {
    const a = this.keys;
    let s = 0, i = 0;
    const o = 900 * t;
    (a.has("a") || a.has("arrowleft")) && (s += o), (a.has("d") || a.has("arrowright")) && (s -= o), (a.has("w") || a.has("arrowup")) && (i += o), (a.has("s") || a.has("arrowdown")) && (i -= o), (s || i) && (this.cam.pan(s, i, this.H), this.hooks.onInteract()), a.has("q") && (this.cam.tyaw += t * 1.6), a.has("e") && (this.cam.tyaw -= t * 1.6), (a.has("+") || a.has("=")) && (this.cam.tdist *= 1 - t * 1.2), a.has("-") && (this.cam.tdist *= 1 + t * 1.2);
  }
}
const Us = (() => {
  const e = "5592eea";
  return /^[0-9a-f]{7}$/.test(e) ? parseInt(e, 16) : 0;
})(), K0 = new URLSearchParams(location.search), X0 = K0.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`, Y0 = X0.replace(/^ws/, "http"), bu = !location.pathname.startsWith("/jogar/") && !K0.get("online"), Je = /^[A-HJ-NP-Z2-9]{4}$/, Er = (e) => e.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 4);
let vu = null;
function yu() {
  return bu ? Promise.resolve(!1) : vu ?? (vu = fetch(Y0 + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class Ws {
  // já entrou na sala alguma vez
  constructor(t, a) {
    g(this, "codigo", "");
    g(this, "parceiro", "");
    g(this, "ws", null);
    g(this, "fechado", !1);
    g(this, "caiuEm", 0);
    g(this, "conectou", !1);
    this.papel = t, this.on = a;
  }
  /** o anfitrião abre a sala: pede um código ao servidor e entra nela */
  static async convidar(t) {
    const a = await fetch(Y0 + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!Je.test(s)) throw new Error("rede");
    const i = new Ws("anfitriao", t);
    return i.codigo = s, i.abrir(), i;
  }
  /** o amigo entra com o código */
  static entrar(t, a) {
    const s = new Ws("convidado", a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${X0}/sala/${this.codigo}?modo=${this.papel === "anfitriao" ? "criar" : "entrar"}`);
    } catch {
      this.caiu();
      return;
    }
    this.ws = t, t.onmessage = (a) => {
      this.ws === t && typeof a.data == "string" && this.receber(a.data);
    }, t.onclose = () => {
      this.ws === t && (this.ws = null, this.fechado || this.caiu());
    };
  }
  /** a internet caiu e está tentando voltar */
  get reconectando() {
    return this.caiuEm > 0;
  }
  /** a internet piscou: tenta de novo a cada 2 s, por até 30 s */
  caiu() {
    if (!this.fechado) {
      if (this.caiuEm || (this.caiuEm = Date.now(), this.on({ t: "caiu" })), Date.now() - this.caiuEm > 3e4) {
        this.fechar(), this.on(this.papel === "convidado" && this.conectou ? { t: "fim" } : { t: "erro", msg: "rede" });
        return;
      }
      setTimeout(() => {
        this.fechado || this.abrir();
      }, 2e3);
    }
  }
  receber(t) {
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    const s = typeof a.nome == "string" ? a.nome : "";
    switch (a.t) {
      case "ok": {
        const i = this.caiuEm > 0;
        this.caiuEm = 0, this.conectou = !0, this.papel === "convidado" ? (this.parceiro = s, this.on(i ? { t: "reconectou", sozinho: !1 } : { t: "oi", nome: s })) : this.on(i ? { t: "reconectou", sozinho: a.amigo === "" } : { t: "codigo", codigo: this.codigo });
        break;
      }
      case "entrou":
        this.parceiro = s, this.on({ t: "entrou", nome: s });
        break;
      case "saiu":
        this.on({ t: "saiu", nome: s });
        break;
      case "c":
        this.on({ t: "ordem", d: a.d });
        break;
      case "r":
        this.on({ t: "pede" });
        break;
      case "s":
        this.on({ t: "jogo", v: Number(a.v), d: a.d });
        break;
      case "t":
        this.on({ t: "turno", d: a.d });
        break;
      case "p":
        this.on({ t: "pausa", on: Array.isArray(a.d) && a.d[0] === 1, papel: Array.isArray(a.d) && typeof a.d[1] == "number" ? a.d[1] : 0 });
        break;
      case "espera":
        this.on({ t: "espera" });
        break;
      case "voltou":
        this.on({ t: "voltou" });
        break;
      case "fim":
        this.fechar(), this.on({ t: "fim" });
        break;
      case "erro":
        if (this.caiuEm) break;
        this.fechar(), this.on({ t: "erro", msg: typeof a.msg == "string" ? a.msg : "" });
        break;
    }
  }
  enviar(t) {
    this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(t);
  }
  /** anfitrião: o turno (protocolo.ts) */
  turno(t) {
    this.enviar(JSON.stringify({ t: "t", d: t }));
  }
  /** anfitrião: o jogo salvo (já em JSON), para o amigo começar dele */
  jogo(t) {
    this.enviar(`{"t":"s","v":${Us},"d":${t}}`);
  }
  /** anfitrião: pausou ou voltou ao jogo; junto vai o papel do amigo (D31: 0 sem papel, 1 Logística, 2 Combate) */
  pausa(t, a = 0) {
    this.enviar(JSON.stringify({ t: "p", d: [t ? 1 : 0, a] }));
  }
  /** convidado: uma ordem (em números) */
  ordem(t) {
    this.enviar(JSON.stringify({ t: "c", d: t }));
  }
  /** convidado: pede o jogo de novo (deu diferente, ou ficou muito para trás) */
  pedir() {
    this.enviar('{"t":"r"}');
  }
  /** sair de vez: o anfitrião encerra a sala (o jogo para para o amigo); o amigo só sai */
  sair() {
    this.fechado || (this.enviar(this.papel === "anfitriao" ? '{"t":"fim"}' : '{"t":"sai"}'), this.fechar());
  }
  fechar() {
    this.fechado = !0;
    const t = this.ws;
    this.ws = null, t && setTimeout(() => {
      try {
        t.close();
      } catch {
      }
    }, 150);
  }
}
const Ir = "origines_opts", ae = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class xu {
  // partida online
  constructor(t) {
    g(this, "root");
    g(this, "screen", null);
    g(this, "rivals", 3);
    g(this, "diff", 1);
    g(this, "regras", "normal");
    g(this, "dicaRegras", null);
    // a explicação aberta (segurou o botão)
    g(this, "amigoOn", !1);
    g(this, "convite", null);
    g(this, "codigo", "");
    g(this, "amigoMsg", "");
    g(this, "amigoBusy", !1);
    g(this, "escolhendoPapel", !1);
    // "Convidar um amigo" tocado: falta escolher o papel do amigo
    g(this, "onlineOn", !1);
    g(this, "codigoPartida", "");
    g(this, "partidaMsg", "");
    g(this, "partidaBusy", !1);
    g(this, "vagaEscolhida", -1);
    this.act = t, this.root = document.getElementById("menus");
    try {
      const a = JSON.parse(localStorage.getItem(Ir) ?? "{}");
      a.rivals >= 1 && a.rivals <= 3 && (this.rivals = a.rivals), a.diff >= 0 && a.diff <= 2 && (this.diff = a.diff), a.regras === "beta" && (this.regras = "beta");
    } catch {
    }
    _0(() => this.render());
  }
  get open() {
    return this.screen !== null;
  }
  get kind() {
    return this.screen?.k ?? null;
  }
  /** a tela inicial; se ela já está aberta (a conta mudou, por exemplo), continua no mesmo passo */
  showStart(t) {
    const a = this.screen?.k === "start" ? this.screen.step : "main";
    this.screen = { k: "start", info: t, step: a }, this.render();
  }
  /** a nuvem respondeu depois: atualiza a tela inicial sem tirar a pessoa do passo em que está */
  updateStart(t) {
    this.screen?.k === "start" && (this.screen.info = t, this.render());
  }
  /** owner: a conta dona do jogo ('' sem conta); acc: a conta em que a pessoa está agora */
  showPause(t, a, s, i, o = !1) {
    this.screen = { k: "pause", minutes: t, quality: a, saved: "", owner: s, acc: i, beta: o }, this.render();
  }
  /** a conta mudou (entrou, saiu ou o jogo passou para a conta): redesenha a pausa */
  updatePause(t, a, s) {
    this.screen?.k === "pause" && (this.screen.owner = t, this.screen.acc = a, s && (this.screen.saved = s), this.render());
  }
  showEnd(t, a, s, i) {
    this.screen = { k: "end", result: t, minutes: a, era: s, online: i }, this.render();
  }
  hide() {
    this.screen = null, this.render();
  }
  // ── jogo com um amigo ──
  /** o servidor do jogo com amigo respondeu: os botões de amigo aparecem */
  setAmigoDisponivel(t) {
    t !== this.amigoOn && (this.amigoOn = t, (this.screen?.k === "start" || this.screen?.k === "pause") && this.render());
  }
  get amigoDisponivel() {
    return this.amigoOn;
  }
  /** o convite do anfitrião mudou (na pausa) */
  setConvite(t) {
    this.convite = t, this.screen?.k === "pause" && this.render();
  }
  /** a tela "Entrar no jogo de um amigo": a mensagem de baixo (entrando, erro…) e se está esperando a resposta */
  setAmigoMsg(t, a = !1) {
    this.amigoMsg = t, this.amigoBusy = a;
    const s = this.root.querySelector("#amigo-msg");
    s && (s.textContent = t);
    const i = this.root.querySelector("#btn-entrar-codigo");
    i && (i.disabled = a || !Je.test(this.codigo));
  }
  /** abre a tela inicial já no passo "Entrar no jogo de um amigo" (depois de um erro, por exemplo) */
  showStartAmigo(t) {
    this.screen = { k: "start", info: t, step: "amigo" }, this.render();
  }
  /** o menu de quem está no jogo de um amigo */
  showGuest(t, a, s = null) {
    this.screen = { k: "guest", nome: t, quality: a, papel: s }, this.render();
  }
  showInfo(t, a) {
    this.screen = { k: "info", titulo: t, texto: a }, this.render();
  }
  // ── partida online (M6) ──
  /** o servidor da partida online respondeu: "Jogar online" aparece */
  setOnlineDisponivel(t) {
    t !== this.onlineOn && (this.onlineOn = t, this.screen?.k === "start" && this.render());
  }
  /** a mensagem de baixo nas telas da partida online (criando, entrando, erro…) e se está esperando a resposta */
  setPartidaMsg(t, a = !1) {
    this.partidaMsg = t, this.partidaBusy = a;
    const s = this.root.querySelector("#partida-msg");
    s && (s.textContent = t);
    const i = this.root.querySelector("#btn-entrar-partida");
    i && (i.disabled = a || !Je.test(this.codigoPartida));
    const o = this.root.querySelector("#btn-criar-partida");
    o && (o.disabled = a);
  }
  /** a tela inicial no passo "Jogar online" (depois de um erro, ou ao sair de uma partida) */
  showStartOnline(t) {
    this.screen = { k: "start", info: t, step: "online" }, this.render();
  }
  showLobby(t) {
    this.screen?.k !== "lobby" && (this.vagaEscolhida = -1), this.screen = { k: "lobby", sala: t }, this.partidaBusy = !1, this.render();
  }
  showOnline(t, a) {
    this.screen = { k: "online", quality: t, anfitriao: a }, this.render();
  }
  showOlhar(t) {
    this.screen = { k: "olhar", timeVivo: t }, this.render();
  }
  /** regras (D34): um toque escolhe; segurar mostra o que a regra tem e o que muda (fica aberto até o próximo toque) */
  segurarRegras(t) {
    const a = this.root.querySelector("#regras-tip");
    if (!a) return;
    const s = (n) => {
      this.dicaRegras = n, a.innerHTML = this.textoRegras(n), a.hidden = !1;
    };
    let i = 0, o = !1;
    this.root.querySelectorAll("[data-regras]").forEach((n) => {
      const r = n.dataset.regras;
      n.onpointerdown = () => {
        o = !1, clearTimeout(i), i = window.setTimeout(() => {
          o = !0, s(r);
        }, 450);
      };
      const l = () => clearTimeout(i);
      n.onpointerup = l, n.onpointercancel = l, n.onpointerleave = l, n.oncontextmenu = (c) => c.preventDefault(), n.onclick = () => {
        if (o) {
          o = !1;
          return;
        }
        this.regras = r, this.dicaRegras = null, t(), this.render();
      };
    });
  }
  textoRegras(t) {
    const a = t === "beta" ? [1, 2, 3, 4, 5] : [1, 2, 3];
    return `<p class="acct-k">${b(`regras.${t}.t`)}</p><ul>${a.map((s) => `<li>${b(`regras.${t}.l${s}`)}</li>`).join("")}</ul>`;
  }
  /** a sala de espera: as vagas com a cor de cada tribo; no 2 contra 2, em dois times */
  vagas(t, a) {
    const s = Wi[t.modo] ?? Wi[1], i = (n) => {
      const r = t.vagas[n] ?? "", l = n === t.eu;
      return `<button data-vaga="${n}" class="vaga${r ? "" : " cpu"}" style="--cor:${dn[n]}" aria-pressed="${this.vagaEscolhida === n}"${a ? "" : ' tabindex="-1"'}><i class="cor" aria-hidden="true"></i><span>${r ? ae(r) : b("sala.computador")}</span>${l ? `<small>${b("sala.voce")}</small>` : ""}</button>`;
    }, o = Array.from({ length: s.vagas }, (n, r) => r);
    return t.modo !== 2 ? `<div class="vagas">${o.map(i).join("")}</div>` : `<div class="vagas times">${[0, 1].map((n) => `<div class="time"><p class="acct-k">${b("sala.time", { n: n + 1 })}</p>${o.filter((r) => s.times[r] === n).map(i).join("")}</div>`).join("")}</div>`;
  }
  /** na pausa do anfitrião: convidar um amigo, o código e quem está jogando junto */
  pauseFriend(t) {
    if (!this.amigoOn || t === "off" || t === "loading") return "";
    const a = this.convite, s = (o) => `<b>${ae(o)}</b>`;
    if (!t.logado) return `<p class="muted small">${b("amigo.semConta")}</p>`;
    if ((!a || a.estado === "erro") && this.escolhendoPapel) {
      const o = (n, r) => `<button id="btn-papel-${n}" class="big papel">${kt(r)}<span>${b(`papel.${n}`)}<small>${b(`papel.${n}.d`)}</small></span></button>`;
      return `<div class="acct on papeis"><p class="acct-l">${b("papel.pergunta")}</p><p class="acct-s">${b("papel.regra")}</p>${o("logistica", "villager")}${o("combate", "army")}<button id="btn-papel-voltar" class="link">${b("papel.voltar")}</button></div>`;
    }
    if (!a || a.estado === "erro") return `${a ? `<p class="saved fail">${b("amigo.erroCriar")}</p>` : ""}<button id="btn-convidar-amigo" class="big">${kt("amigo")}<span>${b("amigo.convidar")}</span></button><p class="muted small">${b("amigo.convidar.d")}</p>`;
    if (a.estado === "criando") return `<p class="muted">${b("amigo.criando")}</p>`;
    const i = a.papel ? `<p class="acct-s papeis-l">${b("papel.dele", { papel: s(b(`papel.${a.papel}`)) })} · ${b("papel.seu", { papel: s(b(`papel.${so(a.papel)}`)) })}</p>` : "";
    return `<div class="acct on convite"><p class="acct-k">${b("amigo.codigo")}</p><p class="codigo" aria-label="${ae((a.codigo ?? "").split("").join(" "))}">${ae(a.codigo ?? "")}</p>
      ${a.estado === "junto" ? `<p class="acct-l">${b("amigo.jogando", { name: s(a.nome ?? "") })}</p>` : `<p class="acct-s">${b("amigo.instrucoes")}</p><p class="acct-l">${b("amigo.esperando")}</p>`}
      ${i}${a.papel ? `<button id="btn-trocar-papeis" class="acct-btn">${b("papel.trocar")}</button>` : ""}
      <button id="btn-encerrar-convite" class="acct-btn">${b("amigo.encerrar")}</button></div>`;
  }
  soundRows() {
    return ["music", "sfx", "amb"].map((t) => `<div class="opt"><div class="opt-l">${b(`snd.${t}`)}</div><div class="seg">${[0, 1, 2, 3].map((a) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[t]}="${a}" aria-pressed="${st.opts[t] === a}">${b(`snd.l${a}`)}</button>`).join("")}</div></div>`).join("");
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${b("lang.label")}"><button id="btn-idioma-en" aria-pressed="${Ye() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${Ye() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, a) {
    if (a === "off" || a === "loading") return "";
    const s = a.logado ? a.apelido ?? "" : "", i = (n) => `<b>${ae(n)}</b>`, o = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${b("acct.pauseLogin")}</button>`;
    return t && t === s ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAccount", { name: i(s) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${b("acct.pauseOther", { name: i(t) })}</p>${s ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${b("acct.switch")}</button>` : o}</div>` : s ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAdopt", { name: i(s) })}</p></div>` : `<div class="acct small"><p class="acct-l">${b("acct.pauseNone")}</p>${o}</div>`;
  }
  render() {
    const t = this.screen, a = this.root;
    if (a.dataset.open = String(!!t), a.dataset.screen = t?.k ?? "", !t) {
      a.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: r, save: l, other: c } = t.info, d = typeof r == "object" && r.logado ? r.apelido ?? "" : "", h = (z) => `<b>${ae(z)}</b>`, f = l ? l.adopt ? b("save.adopt", { name: h(d) }) : d ? b("save.inAccount", { name: h(d) }) : b("save.deviceOnly") : "", u = r === "off" ? "" : r === "loading" ? `<div class="acct"><p class="acct-l">${b("acct.checking")}</p></div>` : r.logado ? `<div class="acct on"><p class="acct-k">${b("acct.yours")}</p><p class="acct-name">${ae(d)}</p><p class="acct-l">${b(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${b("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${b("acct.none")}</p><p class="acct-l">${b("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>
            ${c ? `<p class="acct-s">${b("acct.otherHint", { name: h(c) })}</p>` : `<p class="acct-s">${b("acct.why")}</p>`}</div>`, m = r !== "loading" && !t.info.pending, v = `${u}
        ${m && l ? `<button id="btn-continuar" class="big primary">${b("menu.continue")}<small>${b("menu.saved", { era: b(`era.${l.meta.era}`), y: l.meta.year, r: l.meta.rivals })}${l.meta.regras === "beta" ? ` · ${b("regras.salvo")}` : ""}</small><small class="where">${f}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${m && l ? "" : " primary"}">${b("menu.new")}</button>
        ${this.amigoOn && r !== "off" ? `<button id="btn-entrar-amigo" class="big">${kt("amigo")}<span>${b("amigo.entrar")}</span></button>` : ""}
        ${this.onlineOn && r !== "off" ? `<button id="btn-jogar-online" class="big">${kt("online")}<span>${b("online.jogar")}</span></button>` : ""}`, y = `<p class="acct-k">${b("online.jogar")}</p>
        ${d ? `<p class="acct-s">${b("online.jogar.d")}</p>
          <button id="btn-criar-partida" class="big primary"${this.partidaBusy ? " disabled" : ""}>${kt("online")}<span>${b("online.criar")}</span></button>
          <p class="acct-l">${b("online.digite")}</p>
          <input id="codigo-partida" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${b("online.digite")}" value="${ae(this.codigoPartida)}">
          <button id="btn-entrar-partida" class="big"${this.partidaBusy || !Je.test(this.codigoPartida) ? " disabled" : ""}>${b("online.entrarBtn")}</button>
          <p class="acct-s" id="partida-msg" aria-live="polite">${ae(this.partidaMsg)}</p>` : `<p class="acct-l">${b("online.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`, M = `<p class="acct-k">${b("amigo.entrar")}</p>
        ${d ? `<p class="acct-l">${b("amigo.digite")}</p>
          <input id="codigo-amigo" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${b("amigo.codigoCampo")}" value="${ae(this.codigo)}">
          <button id="btn-entrar-codigo" class="big primary"${this.amigoBusy || !Je.test(this.codigo) ? " disabled" : ""}>${b("amigo.entrarBtn")}</button>
          <p class="acct-s" id="amigo-msg" aria-live="polite">${ae(this.amigoMsg)}</p>` : `<p class="acct-l">${b("amigo.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`, x = `${r === "off" ? "" : `<p class="muted small">${d ? b("new.inAccount", { name: h(d) }) : b("new.deviceOnly")}${l && !l.adopt ? " " + b("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${b("menu.rivals")}</div><div class="seg">${[1, 2, 3].map((z) => `<button data-rivais="${z}" aria-pressed="${this.rivals === z}">${z}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map((z) => `<button data-dificuldade="${z}" aria-pressed="${this.diff === z}">${b(`diff.${z}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("regras.label")}</div><div class="seg">${["normal", "beta"].map((z) => `<button data-regras="${z}" aria-pressed="${this.regras === z}" title="${b("regras.segure")}">${b(`regras.${z}`)}</button>`).join("")}</div></div>
        <p class="muted small regras-dica">${b("regras.segure")}</p>
        <div class="regras-tip" id="regras-tip" aria-live="polite"${this.dicaRegras ? "" : " hidden"}>${this.dicaRegras ? this.textoRegras(this.dicaRegras) : ""}</div>
        <button id="btn-comecar" class="big primary">${b("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`;
      a.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${b("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? v : t.step === "amigo" ? M : t.step === "online" ? y : x}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${b(st.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(st.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${st.opts.muted}">${kt(st.opts.muted ? "mute" : "sound")}</button><span class="credits">${b("menu.credits")}</span></div>
        ${r === "off" ? `<p class="local">${b("menu.local")}</p>` : ""}</div>`;
    } else if (t.k === "pause")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("pause.title")}</h2><p class="muted">${b("pause.time", { m: t.minutes })}${t.beta ? ` · ${b("regras.naPartida")}` : ""}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <button id="btn-salvar" class="big">${b("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${b({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${ae(t.owner)}</b>` })}</p>` : ""}
        ${this.pauseFriend(t.acc)}
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${us.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair">${b("pause.quit")}</button></div>
      </div></div>`;
    else if (t.k === "guest")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("amigo.titulo", { name: ae(t.nome) })}</h2><p class="muted">${b("amigo.noJogoDe", { name: `<b>${ae(t.nome)}</b>` })}</p>
        ${t.papel ? `<p class="papel-guest">${b("papel.seuPapel", { papel: `<b>${b(`papel.${t.papel}`)}</b>` })}<br><small>${b(`papel.${t.papel}.d`)}</small></p>` : ""}
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${us.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair-amigo">${b("amigo.sair")}</button></div>
      </div></div>`;
    else if (t.k === "lobby") {
      const r = t.sala, l = r.eu === r.criador, c = r.vagas.filter(Boolean).length, d = r.vagas[r.criador] ?? "", h = [1, 2, 3, 4].map((u) => `<button data-modo="${u}" aria-pressed="${r.modo === u}">${b(`modo.${u}`)}</button>`).join(""), f = [0, 1, 2].map((u) => `<button data-dif-partida="${u}" aria-pressed="${r.dif === u}">${b(`diff.${u}`)}</button>`).join("");
      a.innerHTML = `<div class="screen lobby"><div class="card panel">
        <h2>${b("sala.titulo")}</h2>
        <div class="acct on convite"><p class="acct-k">${b("sala.codigo")}</p><p class="codigo" aria-label="${ae(r.codigo.split("").join(" "))}">${ae(r.codigo)}</p><p class="acct-s">${b("sala.instrucoes")}</p></div>
        ${l ? `<div class="opt"><div class="opt-l">${b("sala.modo")}</div><div class="seg modos">${h}</div></div>
          <div class="opt"><div class="opt-l">${b("sala.dif")}</div><div class="seg">${f}</div></div>` : `<p class="acct-l">${b(`modo.${r.modo}`)} · ${b("sala.dif")}: ${b(`diff.${r.dif}`)}</p>`}
        <p class="muted small">${b(`modo.${r.modo}.d`)}</p>
        ${this.vagas(r, l)}
        ${l ? `<p class="muted small">${b("sala.trocar")}</p><button id="btn-comecar-partida" class="big primary"${c < 2 ? " disabled" : ""}>${b("sala.comecar")}</button>${c < 2 ? `<p class="muted small">${b("sala.precisa")}</p>` : ""}` : `<p class="acct-l">${b("sala.esperando", { name: `<b>${ae(d)}</b>` })}</p>`}
        <p class="acct-s" id="partida-msg" aria-live="polite">${ae(this.partidaMsg)}</p>
        <button id="btn-sair-sala" class="link">${b("sala.sair")}</button>
      </div></div>`;
    } else if (t.k === "online")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("online.titulo")}</h2><p class="muted">${b(t.anfitriao ? "online.pausadoTodos" : "online.naoPausa")}</p>
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${us.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair-partida">${b("online.sair")}</button></div>
        <p class="muted small">${b("online.sair.d")}</p>
      </div></div>`;
    else if (t.k === "olhar")
      a.innerHTML = `<div class="screen end defeat"><div class="card panel">
        <h2>${b("online.perdeu")}</h2><p>${b(t.timeVivo ? "online.perdeu.time" : "online.perdeu.d")}</p>
        <button id="btn-olhar-partida" class="big primary">${b("online.olhar")}</button>
        <button id="btn-sair-partida" class="big">${b("online.sair")}</button>
      </div></div>`;
    else if (t.k === "info")
      a.innerHTML = `<div class="screen end"><div class="card panel">
        <h2>${ae(t.titulo)}</h2><p>${ae(t.texto)}</p>
        <button id="btn-fim-menu" class="big primary">${b("end.menu")}</button>
      </div></div>`;
    else {
      const r = t.online === "time" ? `end.time.${t.result}` : t.online ? `end.online.${t.result}` : `end.${t.result}`;
      a.innerHTML = `<div class="screen end ${t.result}"><div class="card panel">
        <h2>${b(r)}</h2><p>${b(`${r}.d`)}</p><p class="muted">${b(`era.${t.era}`)} · ${b("pause.time", { m: t.minutes })}</p>
        <button id="btn-fim-menu" class="big primary">${b("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${b("end.watch")}</button>
      </div></div>`;
    }
    const s = (r, l) => a.querySelectorAll(r).forEach((c) => c.onclick = () => l(c)), i = () => {
      try {
        localStorage.setItem(Ir, JSON.stringify({ rivals: this.rivals, diff: this.diff, regras: this.regras }));
      } catch {
      }
    };
    s("#btn-idioma-en", () => Ar("en")), s("#btn-idioma-pt", () => Ar("pt")), s("#btn-continuar", () => this.act.cont()), s("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), s("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.dicaRegras = null, this.render());
    }), s("[data-rivais]", (r) => {
      this.rivals = Number(r.dataset.rivais), i(), this.render();
    }), s("[data-dificuldade]", (r) => {
      this.diff = Number(r.dataset.dificuldade), i(), this.render();
    }), s("#btn-comecar", () => {
      this.dicaRegras = null, this.act.start(this.rivals, this.diff, this.regras);
    }), this.segurarRegras(i), s("#btn-voltar-jogo", () => this.act.resume()), s("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const r = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = r, this.render());
    }), s("#btn-entrar-conta", () => this.act.login()), s("#btn-entrar-conta-pausa", () => this.act.loginPause()), s("#btn-perfil-conta-pausa", () => this.act.profile()), s("#btn-perfil-conta", () => this.act.profile()), s("[data-qualidade]", (r) => {
      const l = us.findIndex((c) => c.key === r.dataset.qualidade);
      l >= 0 && (this.screen?.k === "pause" || this.screen?.k === "guest" || this.screen?.k === "online") && (this.screen.quality = l, this.act.quality(l), this.render());
    }), s("#btn-entrar-amigo", () => {
      this.screen?.k === "start" && (this.screen.step = "amigo", this.amigoMsg = "", this.amigoBusy = !1, this.render());
    }), s("#btn-entrar-codigo", () => {
      Je.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }), s("#btn-convidar-amigo", () => {
      this.escolhendoPapel = !0, this.render();
    }), s("#btn-papel-logistica", () => {
      this.escolhendoPapel = !1, this.act.convidar("logistica");
    }), s("#btn-papel-combate", () => {
      this.escolhendoPapel = !1, this.act.convidar("combate");
    }), s("#btn-papel-voltar", () => {
      this.escolhendoPapel = !1, this.render();
    }), s("#btn-trocar-papeis", () => this.act.trocarPapeis()), s("#btn-encerrar-convite", () => this.act.encerrarConvite()), s("#btn-sair-amigo", () => this.act.sairAmigo()), s("#btn-jogar-online", () => {
      this.screen?.k === "start" && (this.screen.step = "online", this.partidaMsg = "", this.partidaBusy = !1, this.render());
    }), s("#btn-criar-partida", () => {
      this.partidaBusy || this.act.criarPartida();
    }), s("#btn-entrar-partida", () => {
      Je.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    }), s("[data-modo]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(Number(r.dataset.modo), this.screen.sala.dif);
    }), s("[data-dif-partida]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(this.screen.sala.modo, Number(r.dataset.difPartida));
    }), s("[data-vaga]", (r) => {
      if (this.screen?.k !== "lobby" || this.screen.sala.eu !== this.screen.sala.criador) return;
      const l = Number(r.dataset.vaga), c = this.vagaEscolhida;
      if (c < 0) {
        this.vagaEscolhida = l, this.render();
        return;
      }
      if (this.vagaEscolhida = -1, c === l) {
        this.render();
        return;
      }
      this.act.trocarVagas(c, l);
    }), s("#btn-comecar-partida", () => this.act.comecarPartida()), s("#btn-sair-sala", () => this.act.sairPartida()), s("#btn-sair-partida", () => this.act.sairPartida()), s("#btn-olhar-partida", () => this.act.olharPartida());
    const o = a.querySelector("#codigo-partida");
    o && (o.oninput = () => {
      const r = Er(o.value);
      o.value !== r && (o.value = r), this.codigoPartida = r, this.setPartidaMsg(this.partidaBusy ? this.partidaMsg : "", this.partidaBusy);
    }, o.onkeydown = (r) => {
      r.key === "Enter" && Je.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    });
    const n = a.querySelector("#codigo-amigo");
    n && (n.oninput = () => {
      const r = Er(n.value);
      n.value !== r && (n.value = r), this.codigo = r, this.setAmigoMsg(this.amigoBusy ? this.amigoMsg : "", this.amigoBusy);
    }, n.onkeydown = (r) => {
      r.key === "Enter" && Je.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }, this.amigoBusy || setTimeout(() => n.focus({ preventScroll: !0 }), 50)), s("#btn-ajuda-pausa", () => this.act.help()), s("#btn-som-inicio", () => {
      st.toggleMute(), this.render();
    }), s("[data-musica]", (r) => {
      st.setOpts({ music: Number(r.dataset.musica), muted: !1 }), this.render();
    }), s("[data-efeitos]", (r) => {
      st.setOpts({ sfx: Number(r.dataset.efeitos), muted: !1 }), this.render();
    }), s("[data-ambiente]", (r) => {
      st.setOpts({ amb: Number(r.dataset.ambiente), muted: !1 }), this.render();
    }), s("#btn-sair", () => this.act.quit()), s("#btn-fim-menu", () => this.act.toMenu()), s("#btn-continuar-olhando", () => this.act.watch()), a.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function Mu(e, t, a, s) {
  const i = a.filter((d) => e.isUnit(d) && e.owner[d] === t), o = i.filter((d) => e.kind[d] === Mt.villager), n = i.filter((d) => e.kind[d] !== Mt.villager), r = Math.round(s.x * 256), l = Math.round(s.z * 256), c = (d) => d.length ? [{ type: "move", player: t, ids: d, x: r, z: l }] : [];
  if (s.kind === "tile" && o.length) return { cmds: [{ type: "gather", player: t, ids: o, k: s.k }, ...c(n)], ping: "work" };
  if (s.kind === "building" && e.alive[s.e]) {
    const d = s.e;
    return e.owner[d] === t ? { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: d }] : [], ...c(n)], ping: o.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: i, target: d }], ping: "attack" };
  }
  if (s.kind === "unit" && e.alive[s.e]) {
    const d = s.e;
    if (e.kind[d] === Tt) return { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: d }] : [], ...c(n)], ping: o.length ? "work" : "move" };
    if (e.owner[d] !== t && (e.owner[d] === It || e.hostile(t, e.owner[d]))) return { cmds: [{ type: "attack", player: t, ids: i, target: d }], ping: "attack" };
  }
  return { cmds: c(i), ping: "move" };
}
const ku = (e, t) => {
  for (const a of t) if (e.isUnit(a) && e.kind[a] === Mt.villager) return !0;
  return !1;
}, J0 = 2, Z0 = [
  "alive",
  "kind",
  "owner",
  "x",
  "z",
  "hp",
  "state",
  "slotX",
  "slotZ",
  "task",
  "tgt",
  "tgtTile",
  "phase",
  "carry",
  "carryRes",
  "cd",
  "work",
  "done",
  "sub",
  "aggro",
  "tmr",
  "herd",
  "fast",
  "amx",
  "amz",
  "fails",
  "frac",
  "rallyX",
  "rallyZ",
  "dropB",
  "ignoreT",
  "ignoreUntil",
  "stuck",
  "best",
  "foodMode",
  "alvo2",
  "fugaDe",
  "firme",
  "aPagar"
], qr = /* @__PURE__ */ new WeakMap();
function zu(e) {
  let t = qr.get(e);
  if (t) return t;
  const a = n0(e.map.seed, e.players.length, e.map.versao), s = a.size * a.size, i = new Uint8Array(s), o = new Int32Array(s);
  for (let n = 0; n < s; n++) a.tree[n] && (o[n] = a.wood[n] * 100);
  for (const n of a.res) {
    const r = n.z * a.size + n.x;
    i[r] = n.kind, o[r] = n.amount * 100;
  }
  return t = { tree: a.tree, kind: i, amt: o }, qr.set(e, t), t;
}
function Au(e) {
  const t = [];
  let a = 0, s = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i] ? 1 : 0;
    o === a ? s++ : (t.push(s), a = o, s = 1);
  }
  return t.push(s), t;
}
function Or(e, t) {
  let a = 0, s = 0;
  for (const i of e)
    s && t.fill(1, a, a + i), a += i, s ^= 1;
}
function vn(e) {
  const t = zu(e), a = e.size, s = e.top, i = {};
  for (const d of Z0) i[d] = Array.from(e[d].subarray(0, s));
  const o = [];
  for (let d = 0; d < s; d++) e.alive[d] && e.queue[d].length && o.push([d, e.queue[d].slice()]);
  const n = [], r = [], l = [];
  for (let d = 0; d < a * a; d++)
    t.tree[d] && !e.map.tree[d] && n.push(d), e.resAmt[d] !== t.amt[d] && r.push(d, e.resAmt[d]), e.resKind[d] !== t.kind[d] && l.push(d, e.resKind[d]);
  const c = e.players.find((d) => !d.ai) ?? e.players[0];
  return {
    v: J0,
    mapa: e.map.versao,
    seed: e.map.seed,
    players: e.players.length,
    humans: e.players.filter((d) => !d.ai).length,
    difficulty: e.difficulty,
    tick: e.tick,
    rng: e.rng.save(),
    top: s,
    ent: i,
    queue: o,
    P: e.players.map((d) => ({ res: { ...d.res }, era: d.era, aging: d.aging, agingB: d.agingB, hunger: d.hunger, defeated: d.defeated, lastAlert: d.lastAlert, ai: d.ai, tech: d.tech, fundada: d.fundada })),
    ai: e.ai.map((d) => ({ ...d })),
    barbNext: e.barbNext,
    barbWarned: e.barbWarned,
    outcome: e.outcome,
    ...e.times ? { times: e.times.slice(), vencedor: e.vencedor } : {},
    ...e.beta ? { regras: "beta" } : {},
    cut: n,
    amt: r,
    kindDiff: l,
    explored: e.explored.map(Au),
    projectiles: e.projectiles.map((d) => ({ ...d })),
    meta: { era: c.era, year: e.year, rivals: e.players.filter((d) => d.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600), ...e.beta ? { regras: "beta" } : {} }
  };
}
function zs(e) {
  if (!e || e.v !== 1 && e.v !== J0) throw new Error("save version");
  const t = e.v === 1 ? 1 : e.mapa;
  if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > hn) throw new Error("save version");
  const a = Array.isArray(e.times) && e.times.length === e.players && e.times.every((n) => Number.isInteger(n) && n >= 0 && n < 8) ? e.times : void 0, s = new fn(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty, mapa: t, times: a, regras: e0(e.regras) }), i = s.size, o = i * i;
  for (const n of Z0) {
    const r = s[n];
    r.fill(n === "ignoreT" || n === "dropB" || n === "tgt" || n === "alvo2" ? -1 : 0), e.ent[n] && r.set(e.ent[n]);
  }
  s.top = e.top;
  for (let n = 0; n < ht; n++)
    s.queue[n] = [], s.field[n] = null, s.path[n] = null;
  for (const [n, r] of e.queue) s.queue[n] = r.slice();
  if (s.px.set(s.x), s.pz.set(s.z), !e.ent.foodMode)
    for (let n = 0; n < e.top; n++) s.alive[n] && s.kind[n] === ut + Ot.center && (s.hp[n] = Math.min(ct[Ot.center].hp, s.hp[n] * 2));
  for (const n of e.cut)
    s.map.tree[n] = 0, s.map.wood[n] = 0;
  for (let n = 0; n < e.amt.length; n += 2) s.resAmt[e.amt[n]] = e.amt[n + 1];
  for (let n = 0; n < e.kindDiff.length; n += 2) s.resKind[e.kindDiff[n]] = e.kindDiff[n + 1];
  for (let n = 0; n < o; n++) s.resKind[n] === fe && s.resAmt[n] <= 0 && (s.resKind[n] = 0, s.resAmt[n] = 0);
  for (let n = 0; n < o; n++) !s.map.tree[n] && !s.resKind[n] && (s.resAmt[n] = 0);
  s.bAt.fill(0);
  for (let n = 0; n < o; n++) s.blocked[n] = Ns(s.map.terrain[n]) || s.map.tree[n] || s.resKind[n] ? 1 : 0;
  for (let n = 0; n < s.top; n++) if (s.alive[n] && s.kind[n] >= ut) {
    const [r, l, c] = s.footprint(n), d = ct[s.kind[n] - ut];
    for (let h = 0; h < c; h++) for (let f = 0; f < c; f++) {
      const u = (l + h) * i + r + f;
      s.bAt[u] = n + 1, !d.walk && !d.wall && (s.blocked[u] = 1);
    }
  }
  s.refazBloqueios(), e.explored.forEach((n, r) => {
    s.explored[r].fill(0), Or(n, s.explored[r]);
  }), e.P.forEach((n, r) => {
    const l = s.players[r];
    Object.assign(l.res, n.res), l.era = n.era, l.aging = n.aging, l.agingB = n.agingB, l.hunger = n.hunger, l.defeated = n.defeated, l.lastAlert = n.lastAlert, l.ai = n.ai, l.tech = n.tech ?? 0, l.fundada = Number.isInteger(n.fundada) ? n.fundada : -1;
  }), s.ai = e.ai.map((n) => ({ ...n })), s.barbNext = e.barbNext, s.barbWarned = e.barbWarned, s.outcome = e.outcome, a && Number.isInteger(e.vencedor) && (s.vencedor = e.vencedor), s.tick = e.tick, s.rng.load(e.rng), s.projectiles = e.projectiles.map((n) => ({ ...n })), s.events.length = 0;
  for (let n = 0; n < s.top; n++) s.alive[n] && s.state[n] === se && (s.task[n] === Ht ? s.goPoint(n, s.slotX[n], s.slotZ[n]) : s.state[n] = jt);
  return s.updateFog(), e.explored.forEach((n, r) => {
    s.explored[r].fill(0), Or(n, s.explored[r]);
  }), s;
}
const Rr = "origines_save_v1", Gi = "origines_save_meta_v1", ts = (e) => e ? `${Rr}@${e}` : Rr, Gs = (e) => e ? `${Gi}@${e}` : Gi;
function Q0(e, t) {
  try {
    return localStorage.setItem(ts(t), JSON.stringify(e)), localStorage.setItem(Gs(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function Br(e, t) {
  const a = vn(e);
  return a.meta.savedAt = Date.now(), { d: a, ok: Q0(a, t) };
}
function Tu(e, t) {
  Q0(e, t);
}
function Bs(e) {
  try {
    const t = localStorage.getItem(Gs(e));
    return t && localStorage.getItem(ts(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function $u(e) {
  try {
    const t = localStorage.getItem(ts(e));
    return t ? zs(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function yn(e) {
  try {
    localStorage.removeItem(ts(e)), localStorage.removeItem(Gs(e));
  } catch {
  }
}
function xn(e, t) {
  if (e !== t)
    try {
      const a = localStorage.getItem(ts(e)), s = localStorage.getItem(Gs(e));
      if (!a || !s) return;
      localStorage.setItem(ts(t), a), localStorage.setItem(Gs(t), s), yn(e);
    } catch {
    }
}
function Su(e) {
  try {
    const t = localStorage.getItem(ts(e));
    if (!t) return null;
    const a = JSON.parse(t);
    return { seed: a.seed, tick: a.tick };
  } catch {
    return null;
  }
}
const tl = "origines_save_contas_v1", Cu = () => {
  try {
    return localStorage.getItem(tl) === "1";
  } catch {
    return !0;
  }
}, wu = () => {
  try {
    localStorage.setItem(tl, "1");
  } catch {
  }
};
function Pu() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const a = localStorage.key(t);
      if (!a || !a.startsWith(Gi + "@")) continue;
      const s = a.slice(Gi.length + 1), i = Bs(s);
      i && e.push({ dono: s, meta: i });
    }
  } catch {
  }
  return e.sort((t, a) => (a.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const Mn = "/api/origines/save", el = !location.pathname.startsWith("/jogar/");
let Se = null, ua = null, al = el;
const sl = [], Vs = () => sl.forEach((e) => e()), io = () => al ? !Se || !ua ? "off" : ua : "loading", Eu = (e) => {
  sl.push(e);
}, es = () => !!ua?.logado, fa = () => ua?.logado ? ua.apelido ?? "" : "";
async function Iu() {
  if (!el) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, a) => {
        const s = document.createElement("script");
        s.src = "/conta.js?v=2", s.onload = () => t(), s.onerror = () => a(new Error("conta")), document.head.appendChild(s);
      }), Se = e.QGConta ?? null, Se && (ua = await Se.me(), Se.aoMudar((t) => {
        ua = t, Vs();
      }));
    } catch {
      Se = null, ua = null;
    }
    al = !0, Vs();
  }
}
async function Ca() {
  if (!Se) return;
  const e = fa();
  try {
    const t = await Se.me();
    t && (ua = t);
  } catch {
  }
  fa() !== e && Vs();
}
const Nr = async () => {
  Se && (await Se.entrar(), await Ca(), Vs());
};
async function qu() {
  Se && (await Se.perfil(), await Ca(), es() || (await Se.entrar({ aba: "entrar" }), await Ca()), Vs());
}
async function Ou() {
  if (!es()) return null;
  try {
    const e = await fetch(Mn, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function il() {
  if (!es()) return null;
  try {
    const e = await fetch(`${Mn}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const ol = (e, t = !1) => fetch(Mn, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function Dr(e, t, a = !1) {
  if (a || await Ca(), !es()) return "none";
  if (!t || fa() !== t) return "other";
  try {
    const s = { dados: e };
    return a && JSON.stringify(s).length > 6e4 && (a = !1), (await ol(s, a)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function Ru(e) {
  if (await Ca(), !(!e || fa() !== e))
    try {
      await ol({ apagar: !0 });
    } catch {
    }
}
const Bu = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), nl = ["move", "amove", "gather", "work", "attack", "build", "train", "cancel", "ageup", "rally", "stop", "food", "research", "trade", "wall", "ia", "road"], Na = 400, Nu = Ue, Du = 600, Es = (e) => typeof e == "number" && Number.isInteger(e) && Math.abs(e) <= 2 ** 32;
function Jo(e) {
  const t = [nl.indexOf(e.type), e.player], a = (s) => {
    t.push(s.length, ...s);
  };
  switch (e.type) {
    case "move":
    case "amove":
      a(e.ids), t.push(e.x, e.z);
      break;
    case "gather":
      a(e.ids), t.push(e.k);
      break;
    case "work":
    case "attack":
      a(e.ids), t.push(e.target);
      break;
    case "build":
      a(e.ids), t.push(Ot[e.key], e.tx, e.tz);
      break;
    case "train":
      t.push(e.building, Mt[e.key]);
      break;
    case "cancel":
    case "ageup":
      t.push(e.building);
      break;
    case "rally":
      t.push(e.building, e.x, e.z);
      break;
    case "stop":
      a(e.ids);
      break;
    case "food":
      a(e.ids), t.push(e.on ? 1 : 0);
      break;
    case "research":
      t.push(e.building, Ni[e.key]);
      break;
    case "trade":
      t.push(e.building, Ya.indexOf(e.give), Ya.indexOf(e.get));
      break;
    case "wall":
    case "road":
      a(e.ids), a(e.tiles);
      break;
  }
  return t;
}
function rl(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Du || !e.every(Es)) return null;
  const t = e;
  let a = 2, s = !0;
  const i = () => a >= t.length ? (s = !1, 0) : t[a++], o = (d) => {
    const h = i();
    if (h < 0 || h > d || a + h > t.length)
      return s = !1, [];
    const f = t.slice(a, a + h);
    return a += h, f;
  }, n = (d, h) => {
    const f = d[h];
    return f || (s = !1), f?.key ?? "";
  }, r = nl[t[0]], l = t[1];
  let c = null;
  switch (r) {
    case "move":
    case "amove": {
      const d = o(Na);
      c = { type: r, player: l, ids: d, x: i(), z: i() };
      break;
    }
    case "gather": {
      const d = o(Na);
      c = { type: "gather", player: l, ids: d, k: i() };
      break;
    }
    case "work":
    case "attack": {
      const d = o(Na);
      c = { type: r, player: l, ids: d, target: i() };
      break;
    }
    case "build": {
      const d = o(Na);
      c = { type: "build", player: l, ids: d, key: n(ct, i()), tx: i(), tz: i() };
      break;
    }
    case "train": {
      const d = i();
      c = { type: "train", player: l, building: d, key: n(Z, i()) };
      break;
    }
    case "cancel":
    case "ageup":
      c = { type: r, player: l, building: i() };
      break;
    case "rally":
      c = { type: "rally", player: l, building: i(), x: i(), z: i() };
      break;
    case "stop":
      c = { type: "stop", player: l, ids: o(Na) };
      break;
    case "food": {
      const d = o(Na), h = i();
      h !== 0 && h !== 1 && (s = !1), c = { type: "food", player: l, ids: d, on: h === 1 };
      break;
    }
    case "research": {
      const d = i();
      c = { type: "research", player: l, building: d, key: n(Aa, i()) };
      break;
    }
    case "trade": {
      const d = i(), h = Ya[i()], f = Ya[i()];
      (!h || !f) && (s = !1), c = { type: "trade", player: l, building: d, give: h, get: f };
      break;
    }
    case "wall":
    case "road": {
      const d = o(Na);
      c = { type: r, player: l, ids: d, tiles: o(Nu) };
      break;
    }
    case "ia":
      c = { type: "ia", player: l };
      break;
    default:
      return null;
  }
  return s && a === t.length ? c : null;
}
class ll {
  constructor() {
    g(this, "ordens", []);
    g(this, "marcas", []);
    g(this, "avisado", 0);
  }
  /** começa (ou recomeça, depois de mandar o jogo ao amigo) a partir deste mundo */
  ligar(t) {
    this.ordens = [], this.marcas = [], this.avisado = t.tick, t.onApplied = (a, s) => {
      for (const i of s) this.ordens.push([a, ...Jo(i)]);
    };
  }
  /** depois de cada passo: a cada 50 passos, a impressão digital da partida */
  depoisDoPasso(t) {
    t.tick % 50 === 0 && this.marcas.push([t.tick, t.hash()]);
  }
  /** o turno para mandar agora, ou null: de 2 em 2 passos, ou já se tem ordem ou impressão para mandar
   *  (agora: na pausa, para o amigo parar no mesmo passo) */
  turno(t, a = !1) {
    if (t.tick <= this.avisado || !a && !this.ordens.length && !this.marcas.length && t.tick - this.avisado < 2) return null;
    const s = [t.tick, this.marcas, this.ordens];
    return this.marcas = [], this.ordens = [], this.avisado = t.tick, s;
  }
  /** ordem que chegou do amigo: entra no jogo como ordem de fora, sempre para a tribo de quem joga (me). Com papéis
   *  (D31), `filtro` tira dela o que não é do papel do amigo; se não sobrar nada, ela não entra */
  ordemDoAmigo(t, a, s, i) {
    let o = rl(a);
    return !o || o.type === "ia" || (o.player = s, i && (o = i(o), !o)) ? null : (t.issue(o, !0), o);
  }
}
class cl {
  constructor() {
    /** pode simular até este passo (o anfitrião já avisou tudo o que aconteceu antes dele) */
    g(this, "ate", 0);
    /** a impressão digital deu diferente: precisa pedir o jogo de novo */
    g(this, "divergiu", !1);
    g(this, "marcas", /* @__PURE__ */ new Map());
  }
  /** começa a partir do mundo que veio do anfitrião */
  ligar(t) {
    this.ate = t.tick, this.marcas.clear(), this.divergiu = !1;
  }
  /** um turno do anfitrião: agenda as ordens nos passos certos. false se a mensagem não é um turno válido */
  receber(t, a) {
    if (!Array.isArray(a) || a.length !== 3 || !Es(a[0]) || !Array.isArray(a[1]) || !Array.isArray(a[2])) return !1;
    const [s, i, o] = a;
    if (s < this.ate) return !1;
    for (const n of o) {
      if (!Array.isArray(n) || !Es(n[0]) || n[0] < t.tick) continue;
      const r = rl(n.slice(1));
      r && t.schedule(r, n[0]);
    }
    for (const n of i) Array.isArray(n) && Es(n[0]) && Es(n[1]) && this.marcas.set(n[0], n[1]);
    return this.ate = s, !0;
  }
  /** depois de cada passo: confere a impressão digital, se o anfitrião mandou uma para este passo */
  depoisDoPasso(t) {
    const a = this.marcas.get(t.tick);
    a !== void 0 && (this.marcas.delete(t.tick), a !== t.hash() && (this.divergiu = !0));
  }
}
const dl = new URLSearchParams(location.search), hl = (dl.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`) + "/partida", ul = hl.replace(/^ws/, "http"), Fu = !location.pathname.startsWith("/jogar/") && !dl.get("online"), $e = (e, t = 0) => typeof e == "number" && Number.isInteger(e) ? e : t, zo = (e) => Array.isArray(e) ? e.filter((t) => typeof t == "number" && Number.isInteger(t)) : [], Fr = (e) => Array.isArray(e) ? e.slice(0, 4).map((t) => typeof t == "string" ? t.slice(0, 40) : "") : [];
let Lu = null;
function _u() {
  return Fu ? Promise.resolve(!1) : Lu ?? (Lu = fetch(ul + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class Ks {
  constructor(t, a) {
    g(this, "codigo", "");
    g(this, "ws", null);
    g(this, "fechado", !1);
    g(this, "caiuEm", 0);
    this.criar = t, this.on = a;
  }
  /** quem cria: pede um código ao servidor e entra na sala */
  static async nova(t) {
    const a = await fetch(ul + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!Je.test(s)) throw new Error("rede");
    const i = new Ks(!0, t);
    return i.codigo = s, i.abrir(), i;
  }
  /** quem entra com o código */
  static entrar(t, a) {
    const s = new Ks(!1, a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${hl}/sala/${this.codigo}?modo=${this.criar ? "criar" : "entrar"}&v=${Us}`);
    } catch {
      this.caiu();
      return;
    }
    this.ws = t, t.onmessage = (a) => {
      this.ws === t && typeof a.data == "string" && this.receber(a.data);
    }, t.onclose = () => {
      this.ws === t && (this.ws = null, this.fechado || this.caiu());
    };
  }
  get reconectando() {
    return this.caiuEm > 0;
  }
  /** a internet piscou: tenta de novo a cada 2 s, por até 30 s (a vaga fica guardada esse tempo no servidor) */
  caiu() {
    if (!this.fechado) {
      if (this.caiuEm || (this.caiuEm = Date.now(), this.on({ t: "reconectando" })), Date.now() - this.caiuEm > 3e4) {
        this.fechar(), this.on({ t: "erro", msg: "rede" });
        return;
      }
      setTimeout(() => {
        this.fechado || this.abrir();
      }, 2e3);
    }
  }
  receber(t) {
    let a;
    try {
      a = JSON.parse(t);
    } catch {
      return;
    }
    switch (a.t) {
      case "ok":
        this.caiuEm = 0, this.criar = !1;
        break;
      // voltando, entra como quem já está (a vaga é dela)
      case "sala":
        this.on({ t: "sala", sala: { codigo: this.codigo, modo: $e(a.modo, 1), dif: $e(a.dif, 1), vagas: Fr(a.vagas), criador: $e(a.criador), eu: $e(a.eu, -1) } });
        break;
      case "comeca":
        this.on({ t: "comeca", c: { semente: $e(a.semente), modo: $e(a.modo, 1), dif: $e(a.dif, 1), vagas: Fr(a.vagas), eu: $e(a.eu, -1), anf: $e(a.anf), fora: zo(a.fora), volta: a.volta === !0 } });
        break;
      case "t":
        this.on({ t: "turno", d: a.d });
        break;
      case "s":
        this.on({ t: "jogo", v: Number(a.v), d: a.d });
        break;
      case "p":
        this.on({ t: "pausa", on: Array.isArray(a.d) && a.d[0] === 1 });
        break;
      case "c":
        this.on({ t: "ordem", v: $e(a.v, -1), d: a.d });
        break;
      case "r":
        this.on({ t: "pede", v: $e(a.v, -1) });
        break;
      case "sinal": {
        const s = zo(a.d);
        s.length === 4 && this.on({ t: "sinal", v: s[0], tipo: s[1], x: s[2], z: s[3] });
        break;
      }
      case "caiu":
      case "voltou":
      case "saiu":
        this.on({ t: a.t, v: $e(a.v, -1) });
        break;
      case "anfitriao":
        this.on({ t: "anfitriao", v: $e(a.v, -1), fora: zo(a.fora) });
        break;
      case "fim":
        this.fechar(), this.on({ t: "fim", motivo: typeof a.motivo == "string" ? a.motivo : "" });
        break;
      case "erro":
        this.fechar(), this.on({ t: "erro", msg: typeof a.msg == "string" ? a.msg : "" });
        break;
    }
  }
  enviar(t) {
    this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(typeof t == "string" ? t : JSON.stringify(t));
  }
  // sala de espera (só quem criou)
  cfg(t, a) {
    this.enviar({ t: "cfg", d: [t, a] });
  }
  trocar(t, a) {
    this.enviar({ t: "troca", d: [t, a] });
  }
  comecar() {
    this.enviar('{"t":"comeca"}');
  }
  // partida
  /** anfitrião: o turno (protocolo.ts) */
  turno(t) {
    this.enviar({ t: "t", d: t });
  }
  /** anfitrião: o jogo salvo (já em JSON), para todos recomeçarem dele */
  jogo(t) {
    this.enviar(`{"t":"s","v":${Us},"d":${t}}`);
  }
  /** anfitrião: pausou ou voltou ao jogo (vale para todos) */
  pausa(t) {
    this.enviar({ t: "p", d: [t ? 1 : 0] });
  }
  /** anfitrião sem a partida (recarregou a página): outra pessoa passa a dar o ritmo */
  cede() {
    this.enviar('{"t":"cede"}');
  }
  /** uma ordem da minha tribo (em números); o servidor carimba a vaga */
  ordem(t) {
    this.enviar({ t: "c", d: t });
  }
  /** pede o jogo de novo (deu diferente, ou ficou muito para trás) */
  pedir() {
    this.enviar('{"t":"r"}');
  }
  /** um sinal pronto no mapa, para os aliados (tipo: posição em SINAIS; x, z: o tile) */
  sinal(t, a, s) {
    this.enviar({ t: "sinal", d: [t, a, s] });
  }
  /** sair de vez (na partida, o computador assume a tribo) */
  sair() {
    this.fechado || (this.enviar('{"t":"sai"}'), this.fechar());
  }
  fechar() {
    this.fechado = !0;
    const t = this.ws;
    this.ws = null, t && setTimeout(() => {
      try {
        t.close();
      } catch {
      }
    }, 150);
  }
}
const Lr = /* @__PURE__ */ new WeakMap();
function kn(e) {
  let t = Lr.get(e);
  if (!t) {
    const a = e.sampleRate * 2, s = e.createBuffer(1, a, e.sampleRate), i = s.getChannelData(0);
    let o = 22222;
    for (let n = 0; n < a; n++)
      o = o * 16807 % 2147483647, i[n] = o / 10737418235e-1 - 1;
    t = { noise: s, pluck: /* @__PURE__ */ new Map() }, Lr.set(e, t);
  }
  return t;
}
function za(e, t, a) {
  const s = e.createBufferSource();
  return s.buffer = kn(e).noise, s.loop = !0, s.start(t, t * 7.31 % 1.5), s.stop(t + a + 0.05), s;
}
function Nt(e, t, a, s, i, o = 0) {
  const n = e.createGain(), r = Math.max(2e-4, a);
  return n.gain.value = 1e-4, n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + s), o && n.gain.setValueAtTime(r, t + s + o), n.gain.exponentialRampToValueAtTime(1e-4, t + s + o + i), n;
}
function Jt(e, t, a, s = 1) {
  const i = e.createBiquadFilter();
  return i.type = t, i.frequency.value = a, i.Q.value = s, i;
}
function Dt(e, t, a, s, i) {
  const o = e.createOscillator();
  return o.type = t, o.frequency.setValueAtTime(a, s), o.start(s), o.stop(s + i + 0.05), o;
}
function $t(...e) {
  for (let t = 0; t < e.length - 1; t++) e[t].connect(e[t + 1]);
  return e[e.length - 1];
}
function At(e, t, a, s, i, o, n, r, l = 4e-3) {
  const c = Dt(e, s, i, a, n);
  c.frequency.exponentialRampToValueAtTime(Math.max(20, o), a + n), $t(c, Nt(e, a, r, l, n), t);
}
function pt(e, t, a, s, i, o, n, r, l = 3e-3) {
  $t(za(e, a, n + l), Jt(e, s, i, o), Nt(e, a, r, l, n), t);
}
function Mi(e, t, a, s, i) {
  const o = za(e, a, i.dur), n = Jt(e, "bandpass", i.f, 3), r = e.createGain(), l = Dt(e, "sine", i.lfo[0], a, i.dur), c = e.createGain();
  return l.frequency.linearRampToValueAtTime(i.lfo[1], a + i.dur * 0.9), c.gain.value = 0.5, r.gain.value = 0.5, l.connect(c).connect(r.gain), $t(o, n, r, Nt(e, a, 0.1 * s, i.dur * 0.22, i.dur * 0.73), t), pt(e, t, a + i.snapAt, "bandpass", i.snapF, 2, 0.03, (i.snap ?? 0.08) * s), Math.max(i.dur, i.snapAt + 0.06);
}
function ye(e, t, a, s, i, o = [1, 2.4, 3.6, 5.1], n = 1.6) {
  o.forEach((r, l) => $t(Dt(e, "sine", s * r, a, n), Nt(e, a, i / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function ju(e, t, a, s, i, o) {
  const n = Dt(e, "sine", s, a, o), r = Dt(e, "sine", s * 1.4, a, o), l = e.createGain();
  l.gain.setValueAtTime(s * 1.6, a), l.gain.exponentialRampToValueAtTime(s * 0.1, a + o), r.connect(l).connect(n.frequency), $t(n, Nt(e, a, i, 2e-3, o), t);
  for (const [c, d] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const h of [1, 1.007]) $t(Dt(e, "sine", s * c * h, a, o * 0.7), Nt(e, a, i * d * 0.5, 2e-3, o * (0.7 - c * 0.04)), t);
}
function fl(e, t) {
  const a = Math.round(t * 10), s = kn(e);
  let i = s.pluck.get(a);
  if (i) return i;
  const o = e.sampleRate, n = Math.floor(o * 1.8), r = Math.max(2, Math.round(o / t));
  i = e.createBuffer(1, n, o);
  const l = i.getChannelData(0), c = new Float32Array(r);
  let d = a * 7 + 1;
  for (let h = 0; h < r; h++)
    d = d * 16807 % 2147483647, c[h] = (d / 10737418235e-1 - 1) * 0.6;
  for (let h = 0, f = 0; h < n; h++) {
    const u = c[f], m = c[(f + 1) % r];
    c[f] = 0.996 * 0.5 * (u + m), l[h] = u, f = (f + 1) % r;
  }
  return s.pluck.set(a, i), i;
}
function Hu(e, t, a, s, i, o = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = fl(e, s), r.start(a), r.stop(a + n), $t(r, Jt(e, "lowpass", o, 0.7), Nt(e, a, i, 2e-3, n), t);
}
function Le(e, t, a, s, i, o, n, r, l = "sawtooth") {
  const c = e.createOscillator();
  c.type = l, c.frequency.setValueAtTime(i[0][1], a);
  for (const [u, m] of i.slice(1)) c.frequency.linearRampToValueAtTime(m, a + u);
  const d = e.createOscillator(), h = e.createGain();
  d.frequency.value = n[0], h.gain.value = n[1], d.connect(h).connect(c.frequency), c.start(a), c.stop(a + s + 0.05), d.start(a), d.stop(a + s + 0.05);
  const f = Nt(e, a, r, Math.min(0.05, s * 0.2), s * 0.8, s * 0.1);
  for (const [u, m] of o) {
    const v = e.createGain();
    v.gain.value = m, $t(c, Jt(e, "bandpass", u, 6), v, f);
  }
  f.connect(t);
}
function ki(e) {
  const t = e.createBufferSource();
  return t.buffer = kn(e).noise, t.loop = !0, t.start(), t;
}
function Zo(e, t, a, s, i) {
  const o = 3 + i % 4, n = 2600 + i * 137 % 1600;
  for (let r = 0; r < o; r++) {
    const l = a + r * (0.07 + (i + r) % 3 * 0.02), c = n * (1 + (i * (r + 3) % 7 - 3) * 0.06), d = Dt(e, "sine", c, l, 0.07);
    d.frequency.exponentialRampToValueAtTime(c * (r % 2 ? 0.8 : 1.35), l + 0.06), $t(d, Nt(e, l, 0.05 * s, 0.01, 0.05), t);
  }
  return o * 0.1;
}
const Ne = {
  // interface
  "ui.click": (e, t, a, s) => (At(e, t, a, "sine", 700, 420, 0.05, 0.2 * s), pt(e, t, a, "bandpass", 2400, 2, 0.025, 0.06 * s), 0.08),
  "ui.denied": (e, t, a, s) => {
    const i = Dt(e, "sine", 240, a, 0.15);
    return i.frequency.exponentialRampToValueAtTime(170, a + 0.14), $t(i, Jt(e, "lowpass", 900), Nt(e, a, 0.16 * s, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, a, s) => (At(e, t, a, "triangle", 560, 480, 0.05, 0.12 * s), At(e, t, a + 0.07, "triangle", 700, 600, 0.05, 0.1 * s), 0.14),
  "sel.soldier": (e, t, a, s) => (At(e, t, a, "sine", 180, 90, 0.12, 0.24 * s), pt(e, t, a, "lowpass", 600, 1, 0.04, 0.1 * s), 0.14),
  "sel.building": (e, t, a, s) => (At(e, t, a, "sine", 300, 220, 0.08, 0.18 * s), At(e, t, a + 0.09, "sine", 300, 220, 0.08, 0.13 * s), 0.2),
  "order.move": (e, t, a, s) => (pt(e, t, a, "lowpass", 500, 1, 0.05, 0.13 * s), pt(e, t, a + 0.11, "lowpass", 450, 1, 0.05, 0.11 * s), 0.18),
  "order.work": (e, t, a, s) => (pt(e, t, a, "bandpass", 2600, 3, 0.03, 0.12 * s), At(e, t, a, "sine", 1500, 1300, 0.02, 0.05 * s), 0.05),
  "order.attack": (e, t, a, s) => (At(e, t, a, "sine", 150, 70, 0.18, 0.28 * s), pt(e, t, a, "lowpass", 800, 1, 0.05, 0.1 * s), 0.2),
  place: (e, t, a, s) => (At(e, t, a, "sine", 190, 85, 0.2, 0.3 * s), pt(e, t, a, "lowpass", 400, 1, 0.08, 0.12 * s), 0.22),
  "place.bad": (e, t, a, s) => {
    const i = Dt(e, "triangle", 170, a, 0.17);
    return i.frequency.exponentialRampToValueAtTime(120, a + 0.16), $t(i, Jt(e, "lowpass", 900), Nt(e, a, 0.18 * s, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, a, s) => (ye(e, t, a, 880, 0.14 * s, [1, 1.5], 0.35), 0.4),
  built: (e, t, a, s) => (At(e, t, a, "sine", 180, 100, 0.14, 0.2 * s), At(e, t, a + 0.12, "sine", 150, 90, 0.14, 0.18 * s), ye(e, t, a + 0.26, 1046, 0.09 * s, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, a, s) => (ye(e, t, a, 660, 0.15 * s, [1, 2, 2.76, 4.07], 1.6), ye(e, t, a + 0.18, 990, 0.1 * s, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, a, s) => ([880, 1108, 1320].forEach((i, o) => ye(e, t, a + o * 0.11, i, 0.09 * s, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, a, s) => {
    const i = Nt(e, a, 0.2 * s, 0.18, 0.4, 0.9), o = Jt(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = Dt(e, "sawtooth", n, a, 1.6), c = e.createGain();
      c.gain.value = r, $t(l, c, o);
    }
    return $t(o, i, t), 1.6;
  },
  "drums.war": (e, t, a, s) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((i, o) => {
    At(e, t, a + i, "sine", 95, 55, 0.3, (0.12 + o * 0.025) * s), pt(e, t, a + i, "lowpass", 300, 1, 0.05, 0.06 * s);
  }), 2.9),
  gong: (e, t, a, s) => (ye(e, t, a, 110, 0.22 * s, [1, 1.44, 2.05, 2.84, 3.82], 3), pt(e, t, a, "lowpass", 2e3, 1, 0.05, 0.08 * s), 3),
  winter: (e, t, a, s) => {
    const i = za(e, a, 1.8), o = Jt(e, "lowpass", 300, 0.8);
    return o.frequency.linearRampToValueAtTime(900, a + 0.8), o.frequency.linearRampToValueAtTime(300, a + 1.7), $t(i, o, Nt(e, a, 0.1 * s, 0.5, 1.2), t), ye(e, t, a + 0.3, 520, 0.1 * s, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, a, s) => {
    for (let i = 0; i < 5; i++) Zo(e, t, a + i * 0.22, s * 1.6, 3 + i * 5);
    return 1.6;
  },
  hunger: (e, t, a, s) => ($t(Dt(e, "sine", 98, a, 1.1), Nt(e, a, 0.1 * s, 0.1, 0.9), t), $t(Dt(e, "sine", 147, a, 1.1), Nt(e, a, 0.06 * s, 0.1, 0.9), t), 1.1),
  soft: (e, t, a, s) => (ye(e, t, a, 784, 0.07 * s, [1, 2], 0.5), 0.5),
  fair: (e, t, a, s) => {
    [587, 740, 880, 988, 880].forEach((i, o) => Xs(e, t, a + o * 0.14, i, 0.13, 0.1 * s));
    for (let i = 0; i < 4; i++) Ys(e, t, a + i * 0.18, 0.5 * s);
    return 0.9;
  },
  // censo (eras romanas): moedas caindo na bolsa ("tlim-tlim") e o saquinho no fim
  coins: (e, t, a, s) => ([0, 0.08, 0.15, 0.25, 0.3, 0.41].forEach((i, o) => ye(e, t, a + i, [3e3, 3500, 3200, 3800, 3350, 4100][o], (0.09 - o * 8e-3) * s, [1, 1.47, 2.09], 0.22)), pt(e, t, a + 0.48, "lowpass", 600, 1, 0.07, 0.1 * s), 0.75),
  // festival romano do mês: o aulo toca uma frase de dança sobre o tímpano e o chocalho
  festa: (e, t, a, s) => {
    [[69, 0, 0.11], [74, 0.12, 0.11], [76, 0.24, 0.11], [78, 0.36, 0.11], [76, 0.48, 0.11], [74, 0.6, 0.4]].forEach(([i, o, n]) => zn(e, t, a + o, 440 * Math.pow(2, (i - 69) / 12), n, 0.4 * s)), [[0, 0], [0.24, 1], [0.36, 1], [0.48, 0], [0.72, 1]].forEach(([i, o]) => Js(e, t, a + i, 110, (o ? 0.35 : 0.5) * s, o === 1));
    for (const i of [0.12, 0.36, 0.6, 0.84]) Ys(e, t, a + i, 0.4 * s);
    return 1.2;
  },
  // trabalho
  "work.chop": (e, t, a, s) => (pt(e, t, a, "bandpass", 1100, 1.5, 0.05, 0.28 * s), At(e, t, a, "sine", 260, 170, 0.06, 0.18 * s), 0.08),
  "work.pick": (e, t, a, s) => (ye(e, t, a, 2100, 0.1 * s, [1, 1.45], 0.09), pt(e, t, a, "highpass", 3e3, 1, 0.015, 0.06 * s), 0.1),
  "work.pickMetal": (e, t, a, s) => (ye(e, t, a, 2600, 0.09 * s, [1, 1.5, 2.04], 0.2), pt(e, t, a, "highpass", 3e3, 1, 0.012, 0.05 * s), 0.2),
  "work.hoe": (e, t, a, s) => (pt(e, t, a, "lowpass", 350, 1, 0.09, 0.22 * s), At(e, t, a, "sine", 120, 80, 0.08, 0.12 * s), 0.1),
  "work.mallet": (e, t, a, s) => (At(e, t, a, "sine", 330, 240, 0.07, 0.22 * s), pt(e, t, a, "bandpass", 900, 1.5, 0.04, 0.1 * s), 0.08),
  "work.rustle": (e, t, a, s) => {
    for (const i of [0, 0.07, 0.15]) pt(e, t, a + i, "bandpass", 4e3, 1, 0.05, 0.06 * s);
    return 0.22;
  },
  "drop.wood": (e, t, a, s) => (At(e, t, a, "sine", 160, 110, 0.12, 0.2 * s), pt(e, t, a, "lowpass", 500, 1, 0.06, 0.1 * s), 0.14),
  "drop.stone": (e, t, a, s) => {
    for (let i = 0; i < 4; i++) pt(e, t, a + i * 0.035, "bandpass", 1500 + i * 200, 2, 0.03, 0.08 * s);
    return 0.18;
  },
  "drop.food": (e, t, a, s) => {
    for (const i of [0, 0.06]) pt(e, t, a + i, "bandpass", 2e3, 1, 0.06, 0.07 * s);
    return 0.14;
  },
  "drop.metal": (e, t, a, s) => (ye(e, t, a, 2600, 0.07 * s, [1, 1.5], 0.15), ye(e, t, a + 0.07, 2900, 0.06 * s, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, a, s) => {
    const i = Dt(e, "sawtooth", 90, a, 0.45);
    return i.frequency.linearRampToValueAtTime(70, a + 0.45), $t(i, Jt(e, "bandpass", 400, 4), Nt(e, a, 0.05 * s, 0.05, 0.4), t), pt(e, t, a + 0.4, "lowpass", 700, 1, 0.7, 0.18 * s, 0.01), At(e, t, a + 0.4, "sine", 70, 45, 0.4, 0.16 * s), 1.2;
  },
  "res.crumble": (e, t, a, s) => {
    for (let i = 0; i < 5; i++) pt(e, t, a + i * 0.09, "lowpass", 900, 1, 0.08, (0.14 - i * 0.02) * s);
    return 0.55;
  },
  puff: (e, t, a, s) => (pt(e, t, a, "lowpass", 600, 0.7, 0.3, 0.15 * s, 0.02), At(e, t, a, "sine", 150, 100, 0.12, 0.05 * s), 0.34),
  "fall.animal": (e, t, a, s) => (At(e, t, a, "sine", 95, 50, 0.25, 0.22 * s), pt(e, t, a + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * s, 0.02), 0.4),
  crash: (e, t, a, s) => {
    pt(e, t, a, "lowpass", 1200, 0.8, 1.1, 0.26 * s, 0.01);
    for (const i of [0, 0.18, 0.36]) At(e, t, a + i, "sine", 80, 45, 0.25, 0.18 * s);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, a, s) => (At(e, t, a, "sine", 320, 210, 0.07, 0.26 * s), pt(e, t, a, "bandpass", 1600, 1.5, 0.04, 0.1 * s), 0.08),
  "hit.axe": (e, t, a, s) => (pt(e, t, a, "bandpass", 1e3, 2, 0.06, 0.26 * s), At(e, t, a, "sine", 240, 160, 0.06, 0.16 * s), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, a, s) => (ju(e, t, a, 1250, 0.07 * s, 0.55), pt(e, t, a, "highpass", 4500, 0.8, 0.05, 0.09 * s), At(e, t, a, "sine", 260, 170, 0.05, 0.1 * s), 0.55),
  "hit.spear": (e, t, a, s) => {
    const i = za(e, a, 0.12), o = Jt(e, "bandpass", 2200, 2);
    return o.frequency.exponentialRampToValueAtTime(900, a + 0.1), $t(i, o, Nt(e, a, 0.12 * s, 0.01, 0.1), t), At(e, t, a + 0.08, "sine", 400, 300, 0.03, 0.08 * s), 0.13;
  },
  "hit.wall": (e, t, a, s) => (At(e, t, a, "sine", 200, 130, 0.09, 0.24 * s), pt(e, t, a, "lowpass", 700, 1, 0.05, 0.12 * s), 0.1),
  "hit.bite": (e, t, a, s) => (pt(e, t, a, "bandpass", 1500, 2, 0.04, 0.12 * s), At(e, t, a, "sine", 500, 300, 0.05, 0.08 * s), Le(e, t, a, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * s), 0.2),
  "hit.boar": (e, t, a, s) => (Le(e, t, a, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * s), Le(e, t, a + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * s), At(e, t, a, "sine", 120, 70, 0.12, 0.12 * s), 0.25),
  "hit.aurochs": (e, t, a, s) => (At(e, t, a, "sine", 100, 55, 0.2, 0.2 * s), pt(e, t, a, "bandpass", 700, 1.5, 0.12, 0.08 * s), 0.22),
  throw: (e, t, a, s) => {
    const i = za(e, a, 0.36), o = Jt(e, "bandpass", 500, 1.2);
    return o.frequency.exponentialRampToValueAtTime(1600, a + 0.15), o.frequency.exponentialRampToValueAtTime(700, a + 0.34), $t(i, o, Nt(e, a, 0.1 * s, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, a, s) => Mi(e, t, a, s, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, a, s) => Mi(e, t, a, s, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, a, s) => Mi(e, t, a, s, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  // escorpião (virote grosso): o zunido do arco, mais grave, com o "toc" da madeira do braço batendo
  scorpio: (e, t, a, s) => (At(e, t, a, "sine", 260, 140, 0.08, 0.05 * s), Mi(e, t, a, s, { dur: 0.42, f: 1e3, lfo: [9, 15], snapAt: 0, snapF: 1700, snap: 0.1 })),
  // balista (pedra grande): "tum" de madeira dos braços batendo na trave e o zunido grave da pedra saindo
  ballista: (e, t, a, s) => {
    At(e, t, a, "sine", 150, 70, 0.24, 0.3 * s), pt(e, t, a, "bandpass", 650, 1.5, 0.06, 0.12 * s);
    const i = za(e, a + 0.04, 0.6), o = Jt(e, "bandpass", 350, 2);
    return o.frequency.setValueAtTime(350, a + 0.04), o.frequency.exponentialRampToValueAtTime(700, a + 0.3), o.frequency.exponentialRampToValueAtTime(400, a + 0.64), $t(i, o, Nt(e, a + 0.04, 0.08 * s, 0.14, 0.46), t), 0.7;
  },
  "arrow.hit": (e, t, a, s) => (At(e, t, a, "sine", 420, 260, 0.04, 0.16 * s), pt(e, t, a, "bandpass", 2200, 2, 0.03, 0.08 * s), 0.06),
  "spear.hit": (e, t, a, s) => (At(e, t, a, "sine", 300, 180, 0.06, 0.2 * s), pt(e, t, a, "bandpass", 1500, 2, 0.04, 0.08 * s), 0.08),
  "stone.hit": (e, t, a, s) => (pt(e, t, a, "bandpass", 2600, 4, 0.03, 0.16 * s), At(e, t, a, "sine", 950, 800, 0.02, 0.06 * s), 0.05),
  "ram.boom": (e, t, a, s) => (At(e, t, a, "sine", 72, 42, 0.55, 0.42 * s), pt(e, t, a, "lowpass", 350, 1, 0.4, 0.24 * s), pt(e, t, a + 0.02, "bandpass", 900, 2, 0.08, 0.08 * s), 0.6),
  "ram.creak": (e, t, a, s) => {
    const i = Dt(e, "sawtooth", 140, a, 0.3);
    return i.frequency.linearRampToValueAtTime(120, a + 0.3), $t(i, Jt(e, "bandpass", 600, 5), Nt(e, a, 0.03 * s, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, a, s) => (Le(e, t, a, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * s), 0.7),
  "animal.horse": (e, t, a, s) => (Le(e, t, a, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * s), 0.9),
  "animal.dog": (e, t, a, s) => {
    for (const i of [0, 0.16]) Le(e, t, a + i, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * s);
    return 0.28;
  },
  "animal.wolf": (e, t, a, s) => (Le(e, t, a, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * s), 0.45),
  "animal.howl": (e, t, a, s) => {
    for (const [i, o] of [[0, 1], [0.28, 0.3]]) {
      const n = Dt(e, "sine", 420, a + i, 1.6);
      n.frequency.linearRampToValueAtTime(620, a + i + 0.6), n.frequency.linearRampToValueAtTime(540, a + i + 1.5), $t(n, Jt(e, "lowpass", 1200), Nt(e, a + i, 0.05 * s * o, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, a, s) => (Le(e, t, a, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * s), Le(e, t, a + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * s), 0.28),
  "animal.aurochs": (e, t, a, s) => (Le(e, t, a, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * s), 1),
  "animal.deer": (e, t, a, s) => (pt(e, t, a, "bandpass", 1200, 2, 0.12, 0.07 * s), pt(e, t, a + 0.05, "bandpass", 600, 2, 0.1, 0.05 * s), 0.17),
  "animal.crow": (e, t, a, s) => {
    for (const i of [0, 0.3]) Le(e, t, a + i, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * s);
    return 0.5;
  },
  "animal.hooves": (e, t, a, s) => {
    for (const i of [0, 0.07, 0.2, 0.27])
      At(e, t, a + i, "sine", 180, 120, 0.04, 0.1 * s), pt(e, t, a + i, "lowpass", 900, 1, 0.02, 0.05 * s);
    return 0.32;
  },
  bird: (e, t, a, s) => Zo(e, t, a, s, 1 + Math.floor(a * 977 % 97))
}, Uu = {
  "order.move": 5,
  "order.work": 3.5,
  "work.rustle": 3,
  "drop.stone": 5,
  "drop.food": 4,
  sling: 4,
  "ram.creak": 5,
  throw: 2.5,
  "stone.hit": 2,
  "res.crumble": 2,
  "hit.spear": 1.5,
  "hit.bite": 1.5,
  bow: 4,
  tower: 4,
  scorpio: 1.8,
  "animal.dog": 3.5,
  "animal.wolf": 4,
  "animal.boar": 5,
  "animal.deer": 5,
  "animal.crow": 3,
  "animal.sheep": 2.5,
  "animal.horse": 2,
  "animal.aurochs": 2,
  horn: 0.7,
  gong: 0.7,
  "ram.boom": 0.8
};
for (const [e, t] of Object.entries(Uu)) {
  const a = Ne[e];
  Ne[e] = (s, i, o, n) => a(s, i, o, n * t);
}
function je(e, t, a, s, i) {
  At(e, t, a, "sine", s * 1.6, s, 0.4, 0.22 * i), pt(e, t, a, "lowpass", 400, 1, 0.05, 0.08 * i);
}
function Xs(e, t, a, s, i, o, n = 0.22) {
  const r = Nt(e, a, 0.13 * o, 0.05, 0.14, Math.max(0, i - 0.08)), l = Dt(e, "sine", s, a, i + 0.3), c = Dt(e, "triangle", s * 2, a, i + 0.3), d = e.createGain();
  d.gain.value = n;
  const h = Dt(e, "sine", 5, a, i + 0.3), f = e.createGain();
  f.gain.setValueAtTime(0, a), f.gain.linearRampToValueAtTime(s * 6e-3, a + 0.2), h.connect(f), f.connect(l.frequency), f.connect(c.frequency), $t(l, r), $t(c, d, r), r.connect(t), $t(za(e, a, i + 0.1), Jt(e, "bandpass", s * 2, 8), Nt(e, a, 0.02 * o, 0.03, 0.1, Math.max(0, i - 0.05)), t);
}
function Wu(e, t, a, s, i, o) {
  Xs(e, t, a, s, i, o * 0.9, 0.05);
}
function Gu(e, t, a, s, i) {
  Hu(e, t, a, s, 0.2 * i);
}
function Vu(e, t, a, s, i) {
  $t(Dt(e, "sine", s, a, 0.4), Nt(e, a, 0.12 * i, 2e-3, 0.35), t), $t(Dt(e, "sine", s * 2.92, a, 0.2), Nt(e, a, 0.04 * i, 2e-3, 0.15), t), pt(e, t, a, "bandpass", 3e3, 3, 0.01, 0.03 * i);
}
function Pi(e, t, a, s, i) {
  ye(e, t, a, s, 0.08 * i, [1, 2.4, 3.6, 5.1], 2);
}
function Qo(e, t, a, s, i, o) {
  const n = Jt(e, "lowpass", s * 3, 0.8);
  n.frequency.linearRampToValueAtTime(s * 6, a + 0.15), n.frequency.linearRampToValueAtTime(s * 4, a + i);
  for (const r of [1, 1.004]) $t(Dt(e, "sawtooth", s * r, a, i + 0.3), n);
  $t(n, Nt(e, a, 0.07 * o, 0.08, 0.2, Math.max(0, i - 0.1)), t);
}
function Ku(e, t, a, s, i, o) {
  const n = Jt(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.value = 1e-4, r.gain.setValueAtTime(1e-4, a), r.gain.linearRampToValueAtTime(0.05 * o, a + 1.5), r.gain.setValueAtTime(0.05 * o, a + Math.max(1.5, i - 1.5)), r.gain.linearRampToValueAtTime(1e-4, a + i);
  for (const l of [1, 1.5]) $t(Dt(e, "sawtooth", s * l, a, i), n);
  $t(n, r, t);
}
function Ys(e, t, a, s) {
  pt(e, t, a, "highpass", 5e3, 1, 0.06, 0.05 * s, 5e-3);
}
function pl(e, t, a, s, i) {
  const o = [Dt(e, "sawtooth", t, a, s), Dt(e, "square", t, a, s)], n = e.createGain();
  n.gain.value = 0.35;
  const r = Jt(e, "lowpass", Math.min(3e3, i), 0.5), l = Jt(e, "peaking", 1200, 1.2);
  return l.gain.value = 6, o[0].connect(r), $t(o[1], n, r), r.connect(l), { o, out: l };
}
function zn(e, t, a, s, i, o) {
  const n = pl(e, s, a, i + 0.3, s * 6), r = Dt(e, "sine", 5.5, a, i + 0.3), l = e.createGain();
  for (const c of n.o)
    c.frequency.setValueAtTime(s * 0.97, a), c.frequency.exponentialRampToValueAtTime(s, a + 0.05);
  l.gain.setValueAtTime(0, a), l.gain.linearRampToValueAtTime(s * 5e-3, a + 0.4), r.connect(l);
  for (const c of n.o) l.connect(c.frequency);
  $t(n.out, Nt(e, a, 0.085 * o, 0.03, 0.12, Math.max(0, i - 0.05)), t), $t(za(e, a, 0.1), Jt(e, "bandpass", Math.min(4e3, s * 4), 3), Nt(e, a, 0.012 * o, 8e-3, 0.07), t);
}
function ml(e, t, a, s, i, o) {
  const n = pl(e, s, a, i, s * 4), r = e.createGain(), l = Math.min(0.6, i / 3);
  r.gain.value = 1e-4, r.gain.setValueAtTime(1e-4, a), r.gain.linearRampToValueAtTime(0.035 * o, a + l), r.gain.setValueAtTime(0.035 * o, a + i - l), r.gain.linearRampToValueAtTime(1e-4, a + i), $t(n.out, r, t);
}
function Ao(e, t, a, s) {
  const i = e.createGain(), o = Math.max(2e-4, a);
  return i.gain.value = 1e-4, i.gain.setValueAtTime(1e-4, t), i.gain.exponentialRampToValueAtTime(o, t + 3e-3), i.gain.exponentialRampToValueAtTime(o * 0.3, t + s * 0.4), i.gain.exponentialRampToValueAtTime(1e-4, t + s), i;
}
function gl(e, t, a, s, i) {
  const o = e.createBufferSource();
  o.buffer = fl(e, s), o.start(a), o.stop(a + 1.8), $t(o, Jt(e, "lowpass", 1900, 0.7), Ao(e, a, 0.1 * i, 1.78), t), $t(Dt(e, "sine", s, a, 1.6), Ao(e, a, 0.06 * i, 1.6), t), $t(Dt(e, "sine", s * 2, a, 0.9), Ao(e, a, 0.02 * i, 0.9), t);
}
function Js(e, t, a, s, i, o = !1) {
  if (o) {
    pt(e, t, a, "bandpass", 2200, 1.2, 0.045, 0.2 * i), At(e, t, a, "sine", s * 4, s * 3.2, 0.06, 0.1 * i);
    return;
  }
  At(e, t, a, "sine", s * 1.5, s, 0.28, 0.24 * i), pt(e, t, a, "bandpass", 700, 0.8, 0.07, 0.08 * i);
}
function bl(e, t, a, s, i, o, n) {
  const r = Jt(e, "lowpass", n.lo, 0.9);
  r.frequency.setValueAtTime(n.lo, a), r.frequency.exponentialRampToValueAtTime(n.hi, a + n.a), r.frequency.exponentialRampToValueAtTime(n.rest, a + n.a + Math.min(0.5, i));
  for (const l of [1, n.det]) {
    const c = Dt(e, "sawtooth", s * l * n.scoop, a, i + 0.35);
    c.frequency.exponentialRampToValueAtTime(s * l, a + 0.05), c.connect(r);
  }
  $t(r, Nt(e, a, o, n.a, 0.18, Math.max(0, i - n.a)), t);
}
function vl(e, t, a, s, i, o) {
  bl(e, t, a, s, i, 0.115 * o, { lo: s * 1.5, hi: Math.min(3600, s * 7), rest: Math.min(2400, s * 4), a: 0.03, det: 1.003, scoop: 0.985 });
}
function Ei(e, t, a, s, i, o) {
  const n = Math.max(500, Math.min(1600, s * 4));
  bl(e, t, a, s, i, 0.13 * o, { lo: n * 0.45, hi: n, rest: n * 0.8, a: 0.09, det: 0.997, scoop: 0.99 });
}
function Ii(e, t, a, s, i) {
  At(e, t, a, "triangle", s * 1.6, s, 0.12, 0.24 * i), pt(e, t, a, "bandpass", 1900, 0.9, 0.1, 0.18 * i, 2e-3);
}
const Bt = (e) => 440 * Math.pow(2, (e - 69) / 12);
function yl(e, t, a, s, i) {
  const o = Bt(s.m), n = s.d * i;
  switch (s.i) {
    case "drum":
      je(e, t, a, o, s.v);
      break;
    case "drumHi":
      je(e, t, a, o * 1.8, s.v * 0.8);
      break;
    case "flute":
      Xs(e, t, a, o, n, s.v);
      break;
    case "ocarina":
      Wu(e, t, a, o, n, s.v);
      break;
    case "lyre":
      Gu(e, t, a, o, s.v);
      break;
    case "stones":
      Vu(e, t, a, o, s.v);
      break;
    case "bells":
      Pi(e, t, a, o, s.v);
      break;
    case "horn":
      Qo(e, t, a, o, n, s.v);
      break;
    case "drone":
      Ku(e, t, a, o, n, s.v);
      break;
    case "shaker":
      Ys(e, t, a, s.v);
      break;
    case "aulos":
      zn(e, t, a, o, n, s.v);
      break;
    case "aulosHeld":
      ml(e, t, a, o, n, s.v);
      break;
    case "kithara":
      gl(e, t, a, o, s.v);
      break;
    case "tymp":
      Js(e, t, a, o, s.v);
      break;
    case "tympRim":
      Js(e, t, a, o, s.v, !0);
      break;
    case "tuba":
      vl(e, t, a, o, n, s.v);
      break;
    case "cornu":
      Ei(e, t, a, o, n, s.v);
      break;
    case "march":
      Ii(e, t, a, o, s.v);
      break;
  }
}
const Zs = 62, tn = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], Xu = [...tn.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...tn.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], Yu = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], ds = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function en() {
  const e = [];
  let t = 0;
  const a = (s, i, o) => s.forEach((n, r) => {
    let l = 0;
    for (const [c, d] of n)
      e.push({ b: (t + r) * 4 + l, i, m: Zs + c, d, v: o }), l += d;
  });
  for (let s = 0; s < 4; s++, t += 8) {
    a(s === 2 ? Yu : s === 1 ? Xu : tn, "flute", 1);
    for (let i = 0; i < 8; i++) {
      const o = (t + i) * 4;
      if (e.push({ b: o, i: "drum", m: 38, d: 1, v: 0.9 }, { b: o + 2, i: "drum", m: 43, d: 1, v: 0.6 }), s >= 2) {
        e.push({ b: o + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: o + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      s >= 1 && ds[i].concat([ds[i][2], ds[i][1], ds[i][2], ds[i][1]]).forEach((n, r) => e.push({ b: o + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), s === 3 && e.push({ b: o, i: "bells", m: 74 + ds[i][0], d: 2, v: 0.8 });
    }
    s === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([i, o]) => e.push({ b: t * 4 + i, i: "horn", m: o, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: Zs, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const Ju = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10], [0, 1, 3, 5, 7, 8, 10], [0, 2, 4, 5, 7, 9]], Zu = [72, 80, 88, 76, 90], Qu = [["aulos", "aulos", "kithara"], ["cornu", "tuba", "aulos"]];
function tf(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const _r = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function xl(e, t, a, s) {
  const i = Math.min(e, 4), o = tf(s * 97 + i * 13 + t * 5), n = Ju[i], r = n.length, l = (C) => Zs + 12 * Math.floor(C / r) + n[(C % r + r) % r], c = t === 1, d = a === 3, h = Math.round(Zu[i] * (c ? 1.15 : 1) * (d ? 0.85 : a === 2 ? 0.93 : 1)), f = [], u = (C) => {
    const I = [];
    let S = C;
    for (let O = 0; O < 2; O++) {
      const B = _r[Math.floor(o() * _r.length)], H = [];
      for (const $ of B)
        H.push([S, $]), S = Math.max(-2, Math.min(r + 3, S + [-2, -1, -1, 1, 1, 2, 0][Math.floor(o() * 7)]));
      I.push(H);
    }
    return I;
  }, m = u(i === 3 ? [0, 2, 4][Math.floor(o() * 3)] : Math.floor(o() * 3)), v = u(2 + Math.floor(o() * 3)), y = u(r), M = (C, I) => C.map((S) => S.map(([O, B]) => [O + I, B])), k = [[[2, 2], [1, 2]], [[0, 4]]], x = [...m, ...M(m, 1), ...v, ...k, ...m, ...M(m, -1), ...y, ...k, ...y, ...M(y, -1), ...v, ...k, ...m, ...v, ...m, ...k], z = i >= 3 ? Qu[i - 3][t] : i === 0 ? "flute" : i === 1 ? "ocarina" : "flute", A = i === 0 || i >= 3 || a !== 1 ? 0 : 12, T = z === "kithara" ? 2.4 : 0.85;
  return x.forEach((C, I) => {
    let S = 0;
    const O = I * 4, B = !c && I % 8 === 7 && o() < 0.3;
    for (const [$, P] of C)
      !B && !(d && o() < 0.25) && f.push({ b: O + S, i: z, m: l($) + A, d: P * 0.95, v: T }), S += P;
    const H = d ? 0.4 : c ? 1 : 0.7;
    if (i === 0) {
      if (f.push({ b: O, i: "drum", m: 38, d: 1, v: 0.9 }), o() < H && f.push({ b: O + 2, i: "drum", m: 43, d: 1, v: 0.6 }), c) for (let $ = 0; $ < 4; $++) f.push({ b: O + $ + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      I % 4 === 3 && o() < H && f.push({ b: O + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: O + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (i === 1)
      I % 8 === 0 && f.push({ b: O, i: "drone", m: 38, d: 32, v: 0.9 }), (I % 2 === 0 || c) && f.push({ b: O, i: "drum", m: 38, d: 1, v: 0.7 }), o() < H && [0, 1.5, 3].forEach(($, P) => f.push({ b: O + $, i: "stones", m: l([0, 2, 4][P] + I % 2) - 12, d: 1, v: 0.6 }));
    else if (i === 2) {
      const $ = I % 8 < 4 ? 0 : I % 8 < 6 ? -2 : 5, P = [$, $ + 7, $ + 12, $ + 16];
      o() < H + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((w, D) => f.push({ b: O + D * 0.5, i: "lyre", m: 50 + P[w], d: 0.5, v: 0.6 })), f.push({ b: O, i: "drum", m: 38, d: 1, v: 0.8 }), c && f.push({ b: O + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: O + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), I % 8 === 0 && f.push({ b: O, i: "bells", m: 74 + $, d: 2, v: 0.7 }), I % 8 === 6 && o() < 0.7 && f.push({ b: O, i: "horn", m: 45 + (o() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    } else {
      const $ = I % 8, P = a === 1 ? 12 : 0, w = (j, E, N, K, it) => f.push({ b: O + j, i: E, m: N, d: K, v: it }), D = (j, E, N) => E.forEach((K, it) => w(j + it * 0.06, "kithara", K, 1, N));
      if ((I % 16 === 0 && !d || a === 1 && $ === 0) && w(0, "bells", 74, 2, 0.5), i === 3) {
        const j = ($ < 4 || $ === 7 ? [0, 7, 12, 15] : $ < 6 ? [-4, 3, 8, 12] : [1, 8, 13, 17]).map((K) => 50 + K + P), E = z === "kithara";
        $ === 0 && !d && w(0, "aulosHeld", 50, 31, E ? 1 : 0.8), E ? (w(0, "kithara", j[0] - P, 1, 0.5), o() < H && w(2, "kithara", j[1] - P, 1, 0.4)) : c ? o() < H + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((K, it) => w(it * 0.5, "kithara", j[K], 0.5, 0.45)) : (D(0, j, 0.45), o() < H && (w(2, "kithara", j[2], 1, 0.4), w(3, "kithara", j[1], 1, 0.35)));
        const N = (K, it, q) => w(K, it ? "tympRim" : "tymp", 45, 1, q);
        if (d)
          $ % 4 === 0 && N(0, !1, 0.6);
        else if (c) {
          N(0, !1, 0.85), N(1, !0, 0.45), o() < 0.6 && N(1.5, !0, 0.35), N(2, !1, 0.6), N(3, !0, 0.5), o() < 0.5 && N(3.5, !0, 0.35);
          for (let K = 0; K < 4; K++) w(K + 0.5, "shaker", 0, 0.5, 0.4);
        } else
          (!E || $ % 2 === 0) && N(0, !1, E ? 0.5 : 0.7), o() < H && N(2.5, !0, 0.4), $ === 7 && (N(3, !0, 0.45), N(3.5, !0, 0.5));
      } else {
        const j = $ < 4 || $ === 7 ? 0 : $ < 6 ? 5 : -5, E = [j, j + 7, j + 12, j + 16].map((q) => 50 + q + P), N = 50 + (j === 5 ? -7 : j), K = $ === 7 && !d && (c || I % 16 === 15);
        c ? (d || (w(0, "cornu", N, 1.7, 0.32), K || w(2, "cornu", N + 7, 1.7, 0.26)), o() < H + 0.3 && (D(1, E.slice(1), 0.35), D(3, E.slice(1), 0.35))) : (($ === 0 || !d && $ >= 4 && $ !== 5) && w(0, "cornu", N, $ === 0 ? 15.5 : $ === 4 ? 7.5 : 3.7, 0.28), o() < H + 0.2 && D(0, E, 0.4), o() < H && w(2, "kithara", E[2], 1, 0.35));
        const it = (q, U) => w(q, "march", 55, 0.5, U);
        if (d ? w(0, "drum", 38, 1, 0.6) : c ? (w(0, "drum", 38, 1, 0.75), w(2, "drum", 38, 1, 0.6), it(1, 0.5), it(3, 0.5), $ === 3 || $ === 7 ? [3.25, 3.5, 3.75].forEach((q, U) => it(q, 0.3 + U * 0.08)) : o() < 0.5 && it(3.5, 0.3)) : (w(0, "drum", 38, 1, 0.6), o() < H && it(2, 0.3)), K) {
          const q = z === "tuba" ? "cornu" : "tuba";
          [57, 62, 66, 69].forEach((U, at) => w(1 + at * 0.5, q, U - (q === "cornu" ? 12 : 0), at === 3 ? 1.3 : 0.4, 0.48));
        }
      }
    }
  }), { bpm: h, beats: x.length * 4, notes: f };
}
class ef {
  constructor() {
    g(this, "base", null);
    g(this, "tens", null);
    g(this, "batt", null);
    g(this, "queue", []);
    g(this, "qi", 0);
    g(this, "mode", "off");
    g(this, "pieceEnd", 0);
    g(this, "nextStart", 0);
    g(this, "pieceN", 0);
    g(this, "seed", 1);
    g(this, "tension", 0);
    g(this, "battle", 0);
    g(this, "layerT", 0);
    g(this, "getEra", () => 0);
    g(this, "getSeason", () => 0);
    st.ready(() => {
      const t = st.ctx, a = st.out("music");
      this.base = t.createGain(), this.tens = t.createGain(), this.batt = t.createGain();
      for (const s of [this.base, this.tens, this.batt]) s.connect(a);
      this.tens.gain.value = this.batt.gain.value = 0, setInterval(() => this.tick(), 200), this.mode === "menu" && this.startMenu();
    });
  }
  /** tela inicial: o tema em laço */
  menu() {
    this.mode !== "menu" && (this.mode = "menu", this.startMenu());
  }
  startMenu() {
    st.ctx && (this.clear(), this.enqueue(en(), st.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, a) {
    this.getEra = t, this.getSeason = a, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, st.ctx && (this.clear(), this.nextStart = st.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, a, s) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => s, this.pieceN = a, this.seed = 7, st.ctx && (this.clear(), this.nextStart = st.now + 0.5);
  }
  /** 0..1: inimigos perto da aldeia / aviso dos bárbaros */
  setTension(t) {
    this.tension = t;
  }
  /** 0..1: o seu exército lutando perto da câmera */
  setBattle(t) {
    this.battle = t;
  }
  clear() {
    const t = st.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, a) {
    const s = 60 / t.bpm;
    for (const i of t.notes) this.queue.push({ t: a + i.b * s, n: i, spb: s, out: "base" });
    this.queue.sort((i, o) => i.t - o.t), this.qi = 0, this.pieceEnd = a + t.beats * s;
  }
  tick() {
    if (!st.running || !this.base) return;
    const t = st.now, a = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(en(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const i = xl(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(i, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < a; ) {
      const i = this.queue[this.qi++];
      i.t >= t - 0.05 && yl(st.ctx, this.base, Math.max(i.t, t), i.n, i.spb);
    }
    const s = st.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const i = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < a; ) {
        const o = this.layerT, n = Math.round(o / i % 4);
        this.tension > 0.02 && je(s, this.tens, o, Bt(33), 0.8), this.battle > 0.02 && (je(s, this.batt, o, Bt(n % 2 ? 43 : 38), 0.9), je(s, this.batt, o + i / 2, Bt(48), 0.55), Ys(s, this.batt, o + i / 4, 0.8), Ys(s, this.batt, o + i * 0.75, 0.8)), this.layerT += i;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, a = 0) {
    const s = st.ctx, i = st.out("alert");
    !s || !i || !st.voice(3) || (st.duck(0.7, 3.5), Ml(s, i, s.currentTime + 0.05, t, a));
  }
}
function Ml(e, t, a, s, i = 0) {
  if (s === "age" && i === 3)
    return [[0, 0, 0.7], [0.24, 1, 0.4], [0.36, 1, 0.45], [0.48, 0, 0.75], [0.6, 1, 0.45], [0.66, 1, 0.5], [0.72, 1, 0.55], [0.78, 1, 0.6]].forEach(([o, n, r]) => Js(e, t, a + o, Bt(45), r, n === 1)), ml(e, t, a + 0.86, Bt(50), 2.6, 1), [[69, 0.86, 0.3], [70, 1.18, 0.14], [69, 1.34, 0.14], [67, 1.5, 0.14], [69, 1.66, 0.3], [74, 2, 1.3]].forEach(([o, n, r]) => zn(e, t, a + n, Bt(o), r, 1)), [50, 57, 62, 66].forEach((o, n) => gl(e, t, a + 2 + n * 0.04, Bt(o), 0.9)), Js(e, t, a + 2, Bt(45), 0.9), Pi(e, t, a + 2, Bt(74), 0.8), 3.6;
  if (s === "age" && i >= 4) {
    for (let o = 0; o < 7; o++) Ii(e, t, a + o * 0.08, Bt(55), 0.35 + o * 0.07);
    return je(e, t, a + 0.56, Bt(38), 0.8), Ei(e, t, a + 0.56, Bt(50), 1, 0.65), [[62, 0.56, 0.13], [62, 0.74, 0.13], [62, 0.92, 0.13], [69, 1.1, 0.5], [66, 1.72, 0.13], [69, 1.9, 0.13], [74, 2.08, 1.1]].forEach(([o, n, r]) => vl(e, t, a + n, Bt(o), r, 0.8)), Ii(e, t, a + 1.72, Bt(55), 0.5), Ii(e, t, a + 1.9, Bt(55), 0.55), je(e, t, a + 2.08, Bt(38), 0.9), Ei(e, t, a + 2.08, Bt(50), 1.2, 0.65), Ei(e, t, a + 2.08, Bt(57), 1.2, 0.5), 3.5;
  }
  if (s === "age") {
    for (let n = 0; n < 6; n++) je(e, t, a + n * 0.12, Bt(38 + n % 2 * 5), 0.5 + n * 0.08);
    return [0, 4, 7, 12].map((n) => Zs + n + (i >= 2 ? 0 : -12)).forEach((n, r) => i >= 2 ? Qo(e, t, a + 0.75 + r * 0.22, Bt(n - 12), 0.3, 1.4) : Xs(e, t, a + 0.75 + r * 0.2, Bt(n + 12), 0.3, 1.2)), i >= 2 ? Pi(e, t, a + 1.6, Bt(74), 1.2) : je(e, t, a + 1.6, Bt(38), 1), 3.6;
  }
  if (s === "victory") {
    [0, 4, 7, 12, 7, 12].forEach((o, n) => Qo(e, t, a + n * 0.25, Bt(50 + o), n === 5 ? 1.2 : 0.22, 1.3));
    for (let o = 0; o < 8; o++) je(e, t, a + o * 0.125, Bt(38 + o % 2 * 5), 0.7);
    return Pi(e, t, a + 1.3, Bt(74), 1.3), 3.3;
  }
  return [12, 10, 7, 5, 3, 0].forEach((o, n) => Xs(e, t, a + n * 0.35, Bt(Zs + o), n === 5 ? 1.4 : 0.32, 0.9)), je(e, t, a + 2.1, Bt(38), 0.6), 3.5;
}
const de = new ef(), zi = { theme: en, eraPiece: xl, play: yl, stingerAt: Ml };
class kl {
  constructor() {
    g(this, "loops", {});
    g(this, "wf", null);
    g(this, "t", null);
    g(this, "next", {});
    g(this, "seed", 1);
  }
  start() {
    const t = st.ctx, a = st.out("amb");
    if (!t || !a || this.loops.wind) return;
    const s = (i, o) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(a), this.loops[i] = { g: n, stop: o(n) };
    };
    s("wind", (i) => {
      const o = ki(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const c = t.createGain(), d = t.createOscillator(), h = t.createGain();
      return c.gain.value = 0.75, d.frequency.value = 0.11, h.gain.value = 0.25, d.connect(h).connect(c.gain), o.connect(n).connect(c).connect(i), r.start(), d.start(), () => {
        o.stop(), r.stop(), d.stop();
      };
    }), s("water", (i) => {
      const o = ki(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), c = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, c.gain.value = 0.2, l.connect(c).connect(r.gain), o.connect(n).connect(r).connect(i), l.start(), () => {
        o.stop(), l.stop();
      };
    }), s("fire", (i) => {
      const o = ki(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, o.connect(n).connect(i), () => o.stop();
    }), s("market", (i) => {
      const o = ki(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 600, n.Q.value = 3;
      const r = t.createOscillator(), l = t.createGain();
      return r.frequency.value = 3.3, l.gain.value = 250, r.connect(l).connect(n.frequency), o.connect(n).connect(i), r.start(), () => {
        o.stop(), r.stop();
      };
    }), s("insects", (i) => {
      const o = t.createOscillator();
      o.type = "triangle", o.frequency.value = 4300;
      const n = t.createGain(), r = t.createOscillator(), l = t.createGain();
      n.gain.value = 0.5, r.frequency.value = 32, l.gain.value = 0.5, r.connect(l).connect(n.gain);
      const c = t.createGain(), d = t.createOscillator(), h = t.createGain();
      return c.gain.value = 0.5, d.frequency.value = 0.3, h.gain.value = 0.5, d.connect(h).connect(c.gain), o.connect(n).connect(c).connect(i), o.start(), r.start(), d.start(), () => {
        o.stop(), r.stop(), d.stop();
      };
    });
  }
  stop() {
    const t = st.now;
    for (const a in this.loops) {
      const s = this.loops[a];
      s.g.gain.setTargetAtTime(0, t, 0.3), setTimeout(() => {
        try {
          s.stop();
        } catch {
        }
      }, 1500);
    }
    this.loops = {}, this.wf = null;
  }
  /** novos alvos (4 vezes por segundo): as camadas vão até eles devagar */
  set(t) {
    this.t = t;
    const a = st.now, s = this.loops;
    if (!s.wind) return;
    const i = t.season, o = Math.min(1, Math.max(0, (t.zoom - 20) / 60)), n = {
      wind: ([0.32, 0.22, 0.48, 0.7][i] ?? 0.3) * (0.6 + o * 0.6),
      water: t.water * 0.6 * (1 - o * 0.5),
      fire: t.fire * 0.5,
      market: t.market * (t.fair ? 0.12 : 0.06),
      insects: i === 1 ? 0.012 * (1 - o * 0.5) : 0
    };
    for (const r in n) s[r]?.g.gain.setTargetAtTime(n[r], a, 1);
    this.wf && this.wf.frequency.setTargetAtTime(i === 3 ? 700 : 380, a, 2);
  }
  /** sons de vez em quando */
  tick() {
    const t = this.t, a = st.ctx, s = st.out("amb");
    if (!t || !a || !s || !st.running) return;
    const i = a.currentTime, o = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (d, h) => (this.next[d] ?? 0) > i ? !1 : (this.next[d] = i + h(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), c = [0.9, 0.6, 0.25, 0][o] * (0.4 + t.trees * 0.6);
    c > 0.05 && r("bird", () => 1.5 + n() * 4 / c) && Zo(a, s, i + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), o === 3 && r("crow", () => 9 + n() * 14) && Ne["animal.crow"](a, s, i + 0.05, 0.6), o === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && Ne["work.rustle"](a, s, i + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && Ne["stone.hit"](a, s, i + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && Ne["work.pickMetal"](a, s, i + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && Ne["animal.sheep"](a, s, i + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && Ne["animal.horse"](a, s, i + 0.05, 0.8 * t.stables);
  }
}
const fs = (e, t, a) => Math.max(t, Math.min(a, e)), af = { arrow: "bow", stone: "sling", bolt: "scorpio", boulder: "ballista" }, jr = {
  underAttack: "horn",
  raidSoon: "drums.war",
  centerLost: "gong",
  tech: "tech",
  fair: "fair",
  winter: "winter",
  spring: "spring",
  hunger: "hunger",
  winterSoon: "soft",
  metalSeen: "metal",
  campLoot: "metal",
  prataSeen: "metal",
  censo: "coins",
  festa: "festa"
}, Hr = /* @__PURE__ */ new Map(), an = {};
function Vi(e, t = 1, a = 0, s = "sfx", i = 0.07) {
  const o = st.ctx, n = st.out(s), r = Ne[e];
  if (!o || !n || !r || !st.running || t < 0.01) return;
  const l = o.currentTime;
  if ((Hr.get(e) ?? -9) > l - i || !st.voice(0.35)) return;
  Hr.set(e, l), an[e] = (an[e] ?? 0) + 1;
  let c = n;
  if (a && o.createStereoPanner) {
    const d = o.createStereoPanner();
    d.pan.value = fs(a, -1, 1), d.connect(n), c = d;
  }
  r(o, c, l + 0.01, fs(t, 0, 1.2));
}
const Ke = (e) => st.whenRunning(() => Vi(e, 1, 0, "ui", 0.04));
class sf {
  // avisos esperando a vez (hora do som)
  constructor(t, a, s) {
    g(this, "amb", new kl());
    g(this, "t", 0);
    g(this, "slow", 0);
    g(this, "raidUntil", 0);
    g(this, "animalT", 0);
    g(this, "avisoAt", 0);
    g(this, "fila", []);
    this.w = t, this.me = a, this.cam = s, st.setScene("game"), de.game(() => t.players[a].era, () => t.season), _e.emit = (i, o, n, r) => this.at(i, o, n, r), st.ready(() => this.amb.start());
  }
  dispose() {
    _e.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, a, s, i = 1) {
    if (!st.running) return;
    const o = this.w, n = o.size, r = Math.floor(a), l = Math.floor(s);
    if (r < 0 || l < 0 || r >= n || l >= n || !o.vis[this.me][l * n + r]) return;
    const c = this.cam, d = a - c.x, h = s - c.z, f = Math.hypot(d, h), u = fs(1 - f / 22, 0, 1), m = fs(1.25 - c.dist / 70, 0.3, 1);
    if (u < 0.05) return;
    const v = (d * Math.cos(c.yaw) - h * Math.sin(c.yaw)) / 12;
    Vi(t, i * u * u * m, v);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco. Um de cada vez: o seguinte espera 1,3 s, e todos
   *  esperam a vinheta de uma era nova acabar (na virada do mês chegam juntos feira, festival e primavera; na Fundação de Roma,
   *  a vinheta, a prata e o censo). A mensagem na tela aparece na hora do mesmo jeito */
  aviso(t) {
    const a = st.now;
    if (st.running && this.avisoAt > a && this.fila.length < 4) {
      this.fila.push({ id: t, at: this.avisoAt }), this.avisoAt += 1.3;
      return;
    }
    this.tocaAviso(t), this.avisoAt = Math.max(this.avisoAt, a + 1.3);
  }
  tocaAviso(t) {
    Vi(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && st.duck();
  }
  onEvents(t) {
    const a = this.w, s = a.size;
    for (const i of t) switch (i.t) {
      case "proj":
        this.at(i.h !== void 0 ? "tower" : af[i.kind] ?? "throw", i.x0 / 256, i.z0 / 256);
        break;
      case "death": {
        const o = i.x / 256, n = i.z / 256;
        this.at(i.kind >= ut ? "crash" : i.owner === It ? "fall.animal" : "puff", o, n);
        break;
      }
      case "built":
        a.alive[i.e] && this.at("built", a.x[i.e] / 256, a.z[i.e] / 256);
        break;
      case "trained":
        a.alive[i.e] && a.owner[i.e] === this.me && this.at("trained", a.x[i.e] / 256, a.z[i.e] / 256, 0.8);
        break;
      case "tree":
        this.at("tree.fall", i.k % s + 0.5, Math.floor(i.k / s) + 0.5);
        break;
      case "res":
        a.resKind[i.k] === 0 && this.at("res.crumble", i.k % s + 0.5, Math.floor(i.k / s) + 0.5);
        break;
      case "age":
        i.player === this.me && (de.stinger("age", i.era), st.running && (this.avisoAt = Math.max(this.avisoAt, st.now + 3.4)));
        break;
      case "end":
        de.stinger(this.w.resultadoDe(this.me, i));
        break;
      // M6: o time vencedor
      case "msg": {
        if (i.player !== this.me) break;
        const o = i.key.split(".")[0];
        jr[o] && this.aviso(jr[o]), o === "raidSoon" && (this.raidUntil = this.w.tick + 400);
        break;
      }
    }
  }
  /** a cada quadro: ambiente pela câmera, sons de bichos por perto, camadas da música */
  update(t, a) {
    for (st.setPaused(a); st.running && this.fila.length && this.fila[0].at <= st.now; ) this.tocaAviso(this.fila.shift().id);
    if (this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !st.running)) return;
    const s = this.w, i = this.me, o = s.size, n = this.cam, r = n.x, l = n.z, c = s.vis[i];
    let d = 0, h = 0, f = 0;
    for (let T = -8; T <= 8; T += 2) for (let C = -8; C <= 8; C += 2) {
      const I = Math.floor(r + C), S = Math.floor(l + T);
      if (I < 0 || S < 0 || I >= o || S >= o) continue;
      const O = S * o + I;
      f++;
      const B = s.map.terrain[O];
      (B === Ma || B === Ka) && d++, s.map.tree[O] && h++;
    }
    let u = 0, m = 0, v = 0, y = 0, M = 0, k = 0, x = 0;
    const z = [];
    for (let T = 0; T < s.top; T++) {
      if (!s.alive[T]) continue;
      const C = s.x[T] / 256, I = s.z[T] / 256, S = Math.hypot(C - r, I - l);
      if (S > 18 || !c[Math.floor(I) * o + Math.floor(C)] && s.owner[T] !== i) continue;
      const O = fs(1 - S / 16, 0, 1);
      if (s.kind[T] >= ut) {
        if (!s.done[T]) continue;
        const B = ct[s.kind[T] - ut].key;
        B === "center" || B === "camp" ? u = Math.max(u, O) : B === "forge" ? m = Math.max(m, O) : B === "market" ? v = Math.max(v, O) : B === "pen" ? y = Math.max(y, O) : B === "stable" && (M = Math.max(M, O));
      } else if (s.kind[T] < Z.length) {
        s.owner[T] === It ? S < 14 && z.push(T) : s.task[T] === Wt && (k++, s.owner[T] === i && x++);
        const B = Z[s.kind[T]].key;
        (B === "horseman" || B === "eques") && (M = Math.max(M, O * 0.5));
      }
    }
    if (this.amb.set({ season: s.season, zoom: n.dist, water: f ? Math.min(1, d / f * 3) : 0, fire: u, market: v, fair: s.fair, forge: m, pens: y, stables: M, trees: f ? Math.min(1, h / f * 2) : 0 }), this.amb.tick(), z.length && (this.animalT -= 0.25) <= 0) {
      const T = z[Math.floor(this.t * 7.7 % z.length)], C = Z[s.kind[T]].key, I = C === "wolf" ? s.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${C}`;
      Ne[I] && this.at(I, s.x[T] / 256, s.z[T] / 256, C === "wolf" && s.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let A = s.tick < this.raidUntil;
    if (!A && Math.floor(this.t * 4) % 4 === 0) {
      const T = s.players[i];
      for (let C = 0; C < s.top && !A; C++) if (s.isUnit(C) && s.owner[C] !== i && s.owner[C] !== It && (s.owner[C] === ze || s.hostile(i, s.owner[C]))) {
        const I = s.x[C] / 256 - T.start.x, S = s.z[C] / 256 - T.start.z;
        I * I + S * S < 196 && (A = !0);
      }
    }
    de.setTension(A ? 0.6 : 0), de.setBattle(x > 0 ? fs((k - 1) / 8, 0.3, 1) : 0);
  }
}
const zl = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft", "coins", "festa"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "scorpio", "ballista", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], of = {
  "ui.click": "Toque num botão",
  "ui.denied": "Botão que não dá",
  "sel.villager": "Escolher coletor",
  "sel.soldier": "Escolher soldado",
  "sel.building": "Escolher construção",
  "order.move": "Ordem: andar",
  "order.work": "Ordem: trabalhar",
  "order.attack": "Ordem: atacar",
  place: "Construção colocada",
  "place.bad": "Lugar ruim para construir",
  trained: "Unidade pronta",
  built: "Construção pronta",
  horn: "Trompa: ataque!",
  "drums.war": "Tambores: bárbaros vindo",
  gong: "Gongo: Centro perdido",
  tech: "Pesquisa pronta",
  metal: "Metal encontrado",
  fair: "Dia de feira",
  winter: "Chegou o inverno",
  spring: "Chegou a primavera",
  hunger: "Fome",
  soft: "Aviso calmo",
  coins: "Censo: moedas entrando",
  festa: "Festival romano do mês",
  "work.chop": "Machado na árvore",
  "work.pick": "Picareta na pedra",
  "work.pickMetal": "Picareta no metal",
  "work.hoe": "Enxada na roça",
  "work.mallet": "Martelo na obra",
  "work.rustle": "Mexendo nas folhas",
  "drop.wood": "Entrega de madeira",
  "drop.stone": "Entrega de pedra",
  "drop.food": "Entrega de comida",
  "drop.metal": "Entrega de metal",
  "tree.fall": "Árvore caindo",
  "res.crumble": "Pedreira acabando",
  "hit.club": "Golpe de clava",
  "hit.axe": "Golpe de machado",
  "hit.sword": "Golpe de espada",
  "hit.spear": "Golpe de lança",
  "hit.wall": "Golpe na construção",
  "hit.bite": "Mordida",
  "hit.boar": "Javali atacando",
  "hit.aurochs": "Auroque atacando",
  throw: "Lança arremessada",
  bow: "Arco",
  tower: "Torre atirando",
  sling: "Funda",
  scorpio: "Escorpião atirando",
  ballista: "Balista atirando",
  "arrow.hit": "Flecha acertando",
  "spear.hit": "Lança acertando",
  "stone.hit": "Pedra acertando",
  "ram.boom": "Aríete batendo",
  "ram.creak": "Aríete andando",
  puff: "Alguém caiu",
  "fall.animal": "Bicho caindo",
  crash: "Construção desabando",
  "animal.sheep": "Ovelha",
  "animal.horse": "Cavalo",
  "animal.dog": "Cachorro",
  "animal.wolf": "Lobo",
  "animal.howl": "Uivo do lobo (inverno)",
  "animal.boar": "Javali",
  "animal.aurochs": "Auroque",
  "animal.deer": "Cervo",
  "animal.crow": "Corvo (inverno)",
  "animal.hooves": "Cascos do cavalo",
  bird: "Passarinho"
}, nf = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["age:3", "Chegou o Reino (Fundação de Roma)"], ["age:4", "Chegou a República"], ["victory", "Vitória"], ["defeat", "Derrota"]], rf = ["Pedra", "Neolítico", "Metais", "Reino", "República"], lf = ["calma", "animada", "calma 2"], cf = ["primavera", "verão", "outono", "inverno"], df = [["era:3:0:1", "Reino no verão"], ["era:3:0:3", "Reino no inverno"], ["era:4:1:1", "República no verão"], ["era:4:0:3", "República no inverno"]], hf = ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft", "coins", "festa"];
function uf() {
  st.install(), st.setScene("menu");
  const e = new kl(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${zl.map(([l, c]) => `<h2>${l}</h2>${c.map((d) => `<button data-som="${d}" title="${d}">${of[d] ?? d}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${rf.map((l, c) => lf.map((d, h) => `<button data-musica-teste="era:${c}:${h}">${l} · ${d}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button>${df.map(([l, c]) => `<button data-musica-teste="${l}">${c}</button>`).join("")}<button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${nf.map(([l, c]) => `<button data-vinheta="${l}">${c}</button>`).join("")}
    <h2>Ambiente</h2>${cf.map((l, c) => `<button data-ambiente-teste="${c}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const a = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let s = { ...a }, i = 0;
  const o = (l) => {
    st.setScene("game"), e.start(), s = l, e.set(l), i || (i = window.setInterval(() => {
      e.set(s), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const c = l.target.closest("button");
    c && (st.unlock(), t.querySelectorAll("[aria-pressed]").forEach((d) => d.removeAttribute("aria-pressed")), c.setAttribute("aria-pressed", "true"), st.whenRunning(() => r(c)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = st.ctx ? st.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const c = l.dataset;
    if (c.som && Vi(c.som, 1, 0, hf.includes(c.som) ? "alert" : "sfx", 0), c.musicaTeste) {
      const d = c.musicaTeste;
      if (st.setScene(d === "tema" ? "menu" : "game"), st.setOpts({ music: Math.max(2, st.opts.music) }), d === "tema")
        de.stop(), de.menu();
      else if (d === "parar") de.stop();
      else if (d === "tensao") de.setTension(0.6);
      else if (d === "batalha") de.setBattle(0.9);
      else if (d === "inverno") de.preview(2, 0, 3);
      else {
        const [, h, f, u] = d.split(":").map(Number);
        de.setTension(0), de.setBattle(0), de.preview(h, f, u || 0);
      }
    }
    if (c.vinheta) {
      const [d, h] = c.vinheta.split(":");
      de.stinger(d, Number(h) || 0);
    }
    if (c.ambienteTeste) {
      const d = c.ambienteTeste;
      d === "parar" ? (e.set({ ...a, season: 1, trees: 0 }), s = { ...a, season: -1, trees: 0 }) : o(d === "rio" ? { ...a, season: 1, water: 1, zoom: 22 } : d === "aldeia" ? { ...a, fire: 1, forge: 1, pens: 1, zoom: 22 } : d === "feira" ? { ...a, market: 1, fair: !0, zoom: 22 } : { ...a, season: Number(d) });
    }
  }
}
async function ff(e) {
  const a = new OfflineAudioContext(1, 176400, 44100);
  let s = 0;
  if (Ne[e]) s = Ne[e](a, a.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, c, d] = e.split(":"), h = c === "tema" ? zi.theme() : zi.eraPiece(Number(d), 1, 0, 3), f = 60 / h.bpm;
    for (const u of h.notes) u.b * f < 3.6 && zi.play(a, a.destination, 0.01 + u.b * f, u, f);
    s = 4;
  } else if (e.startsWith("vinheta:")) {
    const [, c, d] = e.split(":");
    s = zi.stingerAt(a, a.destination, 0.01, c, Number(d) || 0);
  }
  const i = await a.startRendering(), o = i.getChannelData(0);
  let n = 0, r = 0, l = 0;
  for (let c = 0; c < o.length; c++) {
    const d = Math.abs(o[c]);
    d > n && (n = d), c < Math.max(1, s) * 44100 && (r += o[c] * o[c], l++);
  }
  return { id: e, peak: n, rms: Math.sqrt(r / Math.max(1, l)), dur: s };
}
const pf = zl.flatMap((e) => e[1]);
oc();
const pa = new URLSearchParams(location.search), Ki = (e, t) => {
  const a = Number(pa.get(e));
  return pa.has(e) && Number.isFinite(a) && a >= 0 ? a : t;
}, Al = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, An = document.getElementById("scene"), Qs = D0.makeRenderer(An);
let mt = 0;
const ia = 1 / Bi;
let Ie = Al ? 1 : 0, Xi = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (Ie = Math.min(2, Math.max(0, Number(e) || 0)), Xi = !1);
} catch {
}
const Tl = (e) => {
  Ie = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class mf {
  /** owner: a conta dona deste jogo (o apelido; '' = sem conta). O jogo só vai para a nuvem dessa conta */
  constructor(t, a = "") {
    g(this, "scene");
    g(this, "hud");
    g(this, "input");
    g(this, "minimap");
    g(this, "snd");
    g(this, "sel", /* @__PURE__ */ new Set());
    g(this, "paused", !1);
    g(this, "ended", !1);
    g(this, "acc", 0);
    g(this, "time", 0);
    g(this, "saveT", 0);
    g(this, "idleCursor", 0);
    g(this, "autoT", 0);
    g(this, "autoN", 0);
    g(this, "marco", 0);
    g(this, "perfT", 0);
    g(this, "perfN", 0);
    g(this, "derrotaPor", "");
    // medição: marcos de tempo, quadros por segundo, quem derrubou o Centro
    g(this, "mode", "normal");
    g(this, "placeKey", "");
    g(this, "place", { tx: 0, tz: 0, ok: !1 });
    g(this, "rallyB", -1);
    // muro desenhado (D35): os blocos na ordem do desenho, onde começa cada traço (para desfazer), a linha reta até o
    // cursor (mouse, ainda não posta) e os blocos que dá para construir (os que vão na ordem)
    g(this, "muro", []);
    g(this, "muroTracos", []);
    g(this, "muroPrevia", []);
    g(this, "wallTiles", []);
    // ── partida online (M6): sinais prontos para os aliados ──
    g(this, "sinalTipo", null);
    g(this, "ultimoSinal", /* @__PURE__ */ new Map());
    /** papéis no jogo com um amigo (D31): o meu papel vale no painel e na seleção; o que não é dele sai da seleção em grupo */
    g(this, "papelVisto");
    /** as dicas da primeira partida (docs/15), ou de novo pela Ajuda. Sozinho, o jogo fica parado enquanto a pessoa lê;
     *  com um amigo ou online, o jogo continua (como na Ajuda) */
    g(this, "dicasPausou", !1);
    /** no jogo de um amigo (convidado): o jogo é do anfitrião; aqui nada é salvo, nem depois que o anfitrião sai */
    g(this, "guest", gt?.papel === "convidado");
    /** partida online (M6): nada é salvo, e os avisos da partida solo não são medidos (só o aviso amigo) */
    g(this, "naRede", !!nt);
    this.world = t, this.owner = a;
    const s = t;
    this.marco = Math.floor(s.tick / 600), this.scene = new D0(Qs, s, mt), this.scene.setQuality(Ie), pa.get("fog") === "0" && this.scene.setFog(!1), this.hud = new Yo(s, mt, {
      idle: () => {
        if (Is() === "combate") return;
        const n = this.own((l) => s.kind[l] === Mt.villager && s.task[l] === 0 && s.state[l] === 0);
        if (!n.length) return;
        const r = n[this.idleCursor++ % n.length];
        this.select([r]), this.focus([r]);
      },
      army: () => {
        if (Is() === "logistica") return;
        const n = this.own((r) => s.kind[r] !== Mt.villager);
        this.select(n), this.focus(n);
      },
      home: () => {
        const n = s.players[mt].start;
        this.scene.camera.tx = n.x, this.scene.camera.tz = n.z;
      },
      menu: () => this.pause(),
      keepKind: (n) => {
        for (const r of [...this.sel]) s.kind[r] !== n && this.sel.delete(r);
      },
      clear: () => {
        this.sel.clear(), this.setMode("normal");
      },
      stop: () => {
        const n = this.own((r) => this.sel.has(r));
        n.length && this.send({ type: "stop", player: mt, ids: n });
      },
      food: (n) => {
        const r = this.own((l) => this.sel.has(l) && s.kind[l] === Mt.villager);
        r.length && this.send({ type: "food", player: mt, ids: r, on: n });
      },
      startPlace: (n) => this.startPlace(n),
      train: (n, r) => this.send({ type: "train", player: mt, building: n, key: r }),
      cancelQueue: (n) => this.send({ type: "cancel", player: mt, building: n }),
      ageUp: (n) => this.send({ type: "ageup", player: mt, building: n }),
      research: (n, r) => this.send({ type: "research", player: mt, building: n, key: r }),
      trade: (n, r, l) => this.send({ type: "trade", player: mt, building: n, give: r, get: l }),
      rally: (n) => {
        this.rallyB = n, this.setMode(this.mode === "rally" ? "normal" : "rally");
      },
      placeConfirm: () => this.confirmPlace(!1),
      undoWall: () => this.muroDesfaz(),
      cancelMode: () => this.setMode("normal"),
      jump: (n, r) => {
        this.scene.camera.tx = n, this.scene.camera.tz = r;
      },
      sinal: (n) => {
        this.sinalTipo = n, this.hud.setSinal(n), this.setMode("sinal");
      },
      dicas: () => this.dicas()
    }, Al, this.sel), this.minimap = new mu(this.hud.minimap, s, mt, this.scene.camera), this.snd = new sf(s, mt, this.scene.camera), this.input = new gu(An, s, mt, this.scene.camera, this.hud.box, {
      onCommand: (n) => {
        if (this.mode !== "normal") return;
        const { cmds: r, ping: l } = Mu(s, mt, [...this.sel], n), c = r.filter((d) => this.send(d));
        c.length && Ti(c[0].type === "attack" ? s.owner[c[0].target] === It ? "cacar" : "atacar" : c[0].type === "gather" ? "coletar" : c[0].type === "work" ? "trabalhar" : "mover"), c.length && (this.scene.ping(n.x, n.z, l), Ke(l === "attack" ? "order.attack" : l === "work" ? "order.work" : "order.move"));
      },
      onRally: (n, r) => {
        if (this.mode === "sinal") {
          this.porSinal(n, r);
          return;
        }
        const l = this.mode === "rally" && s.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        l >= 0 && this.send({ type: "rally", player: mt, building: l, x: Math.round(n * 256), z: Math.round(r * 256) }) && (this.scene.ping(n, r, "move"), Ti("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (n, r) => this.movePlace(n, r),
      onPlaceConfirm: (n) => this.confirmPlace(n),
      onCancel: () => this.setMode("normal"),
      drawing: () => this.isMuro(),
      onDraw: (n, r, l) => this.desenha(n, r, l),
      onSelect: () => {
        this.mode === "place" && !ku(s, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize(), this.aplicarPapel();
    const i = this.scene.camera.cam, o = i.position.clone();
    this.hud.projetor = (n, r) => (o.set(n, zt(s.map, n, r) + 0.6, r).project(i), [(o.x + 1) / 2 * innerWidth, (1 - o.y) / 2 * innerHeight, o.z < 1 && Math.abs(o.x) < 1.05 && Math.abs(o.y) < 1.05]), nt && (this.hud.setTribos(nt.nomes), nt.olhando && !sn(s) && this.scene.setFog(!1), nt.aviso && nt.aviso.ate > performance.now() && this.hud.toast(nt.aviso.texto), nt.aviso = null);
  }
  porSinal(t, a) {
    const s = nt, i = this.sinalTipo ? Xo.indexOf(this.sinalTipo) : -1;
    if (this.setMode("normal"), !s || i < 0) return;
    const o = Math.max(0, Math.min(this.world.size - 1, Math.floor(t))), n = Math.max(0, Math.min(this.world.size - 1, Math.floor(a)));
    s.conn.sinal(i, o, n), this.mostrarSinal(mt, i, o, n);
  }
  /** o sinal de um aliado (ou o meu): marca no mapa e no minimapa, o anel no chão, um aviso e um som */
  mostrarSinal(t, a, s, i) {
    const o = Xo[a], n = t === mt ? b("tribe.you") : nt?.nomes[t] || b("sala.computador");
    if (!o || s < 0 || i < 0 || s >= this.world.size || i >= this.world.size) return;
    this.hud.addMarca(s + 0.5, i + 0.5, o, n), this.minimap.marcar(s + 0.5, i + 0.5, dn[t] ?? "#fff"), this.scene.ping(s + 0.5, i + 0.5, o === "atacar" ? "attack" : o === "ajuda" ? "move" : "work");
    const r = performance.now();
    t !== mt && r - (this.ultimoSinal.get(t) ?? -1e9) > 1500 && (this.ultimoSinal.set(t, r), this.hud.toast(b("sinal.de", { name: n, sinal: b(`sinal.${o}`) }), (s + 0.5) * 256, (i + 0.5) * 256, "sinal"), Ke("soft"));
  }
  /** partida online: a minha tribo perdeu e a partida continua (posso olhar ou sair) */
  perdeuTribo() {
    !nt || this.ended || (this.setMode("normal"), this.sel.clear(), xt.showOlhar(sn(this.world)));
  }
  aplicarPapel() {
    const t = Is();
    if (t !== this.papelVisto) {
      if (this.papelVisto = t, this.hud.setPapel(t, gt?.parceiro ?? ""), this.input.papel = t, t && this.sel.size > 1)
        for (const a of [...this.sel]) Hs(this.world, t, a) || this.sel.delete(a);
      this.hud.refresh();
    }
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, a = [...this.sel][0];
    if (a === void 0 || !t.alive[a] || t.owner[a] !== mt) return;
    if (t.isBuilding(a)) {
      const i = t.bdef(a).key;
      Ke(i === "pen" ? "animal.sheep" : i === "stable" ? "animal.horse" : i === "forge" ? "work.pickMetal" : i === "market" ? "soft" : "sel.building");
      return;
    }
    const s = t.kind[a];
    Ke(s === Mt.villager ? "sel.villager" : s === Mt.dog ? "animal.dog" : s === Mt.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const a = this.world, s = [];
    for (let i = 0; i < a.top; i++) a.isUnit(i) && a.owner[i] === mt && t(i) && s.push(i);
    return s;
  }
  select(t) {
    this.sel.clear();
    for (const a of t) this.sel.add(a);
    this.setMode("normal");
  }
  focus(t) {
    if (!t.length) return;
    let a = 0, s = 0;
    for (const i of t)
      a += this.world.x[i] / 256, s += this.world.z[i] / 256;
    this.scene.camera.tx = a / t.length, this.scene.camera.tz = s / t.length;
  }
  setMode(t) {
    this.mode = t, t !== "place" && (this.scene.setGhost(null), this.scene.setWallGhost(null), this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.wallTiles = []), this.hud.setMode(t, this.place.ok, this.isMuro() ? this.wallTiles.length : -1, t === "place" ? this.placeKey : "", this.muro.length), this.hud.refresh();
  }
  startPlace(t) {
    if (this.placeKey = t, this.mode = "place", this.hud.resetCard(), ct[Ot[t]]?.wall || ct[Ot[t]]?.estrada) {
      this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.renderMuro();
      return;
    }
    this.movePlace(this.scene.camera.x, this.scene.camera.z);
  }
  // ── muro desenhado (D35) ──
  /** desenhando com o dedo: o muro (D35) ou a estrada (M3), que se desenha igual */
  isMuro() {
    const t = ct[Ot[this.placeKey]];
    return this.mode === "place" && !!(t?.wall || t?.estrada);
  }
  isEstrada() {
    return this.mode === "place" && !!ct[Ot[this.placeKey]]?.estrada;
  }
  /** blocos de A até B, sempre encostados de lado (sem pular na diagonal) */
  wallLine(t, a, s, i) {
    const o = this.world.size, n = [a * o + t], r = Math.sign(s - t), l = Math.sign(i - a), c = s - t, d = i - a, h = Math.hypot(c, d) || 1, f = (v, y) => Math.abs((v - t) * d - (y - a) * c) / h;
    let u = t, m = a;
    for (; (u !== s || m !== i) && n.length < Ue * 2; )
      u === s ? m += l : m === i || f(u + r, m) <= f(u, m + l) ? u += r : m += l, n.push(m * o + u);
    return n;
  }
  /** põe o bloco (tx, tz) no muro, ligado ao último por blocos encostados de lado; `solto`: começa um pedaço novo */
  muroAte(t, a, s) {
    const i = this.world.size;
    if (t < 0 || a < 0 || t >= i || a >= i) return;
    const o = this.muro[this.muro.length - 1], n = o === void 0 || s ? [a * i + t] : this.wallLine(o % i, Math.floor(o / i), t, a).slice(1);
    for (const r of n) {
      if (this.muro.length >= Ue) break;
      this.muro.includes(r) || this.muro.push(r);
    }
  }
  /** o dedo (ou o mouse) desenhando: arrastar desenha à mão; tocar liga o último bloco ao tocado em linha reta */
  desenha(t, a, s) {
    if (!this.isMuro()) return;
    const i = this.world.size, o = Math.floor(a), n = Math.floor(s), r = this.muro.length;
    if (t === "start") {
      const l = this.muro[this.muro.length - 1], c = l !== void 0 && Math.abs(l % i - o) <= 1 && Math.abs(Math.floor(l / i) - n) <= 1;
      this.muroTracos.push(this.muro.length), this.muroAte(o, n, !c);
    } else t === "move" ? this.muroAte(o, n, !1) : t === "tap" && (this.muroTracos.push(this.muro.length), this.muroAte(o, n, !1));
    this.muroTracos.length && this.muroTracos[this.muroTracos.length - 1] === this.muro.length && t !== "move" && this.muroTracos.pop(), this.muro.length >= Ue && t !== "end" && (t !== "move" || this.muro.length !== r) ? Ke("place.bad") : this.muro.length !== r && t !== "move" && Ke("order.work"), this.muroPrevia = [], this.renderMuro();
  }
  /** desfaz o último traço */
  muroDesfaz() {
    !this.isMuro() || !this.muroTracos.length || (this.muro.length = this.muroTracos.pop(), this.muroPrevia = [], this.renderMuro());
  }
  /** a prévia: verde o que dá para construir, vermelho o que não dá (lugar ocupado); a linha até o cursor, na cor da madeira.
   *  D37: cada bloco é pago quando o coletor começa a construí-lo; para desenhar, basta o material do primeiro bloco */
  renderMuro() {
    const t = this.world, a = t.size, s = this.isEstrada() ? this.placeKey : t.muroDaEra(t.players[mt].era) ?? this.placeKey, i = t.canAfford(mt, ct[Ot[s]].cost), o = this.muroPrevia.filter((l) => !this.muro.includes(l)), n = [...this.muro, ...o], r = n.map((l) => i && t.canPlace(mt, s, l % a, Math.floor(l / a)));
    this.wallTiles = this.muro.filter((l, c) => r[c]), this.place = { tx: 0, tz: 0, ok: this.wallTiles.length > 0 }, this.scene.setWallGhost(n, r, this.muro.length, s), this.hud.setMode("place", this.place.ok, this.wallTiles.length, this.placeKey, this.muro.length);
  }
  movePlace(t, a) {
    if (this.mode !== "place") return;
    if (this.isMuro()) {
      const l = this.world.size, c = Math.floor(t), d = Math.floor(a), h = this.muro[this.muro.length - 1];
      if (c < 0 || d < 0 || c >= l || d >= l) return;
      this.muroPrevia = h === void 0 ? [d * l + c] : this.wallLine(h % l, Math.floor(h / l), c, d).slice(1, Ue - this.muro.length + 1), this.renderMuro();
      return;
    }
    const s = this.world, i = ct[Ot[this.placeKey]], o = Math.round(t - i.size / 2), n = Math.round(a - i.size / 2), r = s.canPlace(mt, this.placeKey, o, n) && s.canAfford(mt, i.cost);
    this.place = { tx: o, tz: n, ok: r }, this.scene.setGhost(this.placeKey, o, n, r), this.hud.setMode("place", r, -1, this.placeKey);
  }
  confirmPlace(t) {
    const a = this.world, s = this.own((o) => this.sel.has(o) && a.kind[o] === Mt.villager);
    if (this.mode !== "place" || !s.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(b("place.bad"), void 0, void 0, "place"), Ke("place.bad");
      return;
    }
    if (this.isMuro()) {
      this.send({ type: this.isEstrada() ? "road" : "wall", player: mt, ids: s, tiles: this.wallTiles.slice() }), Ke("place"), Ti(this.isEstrada() ? "construir" : "muralha");
      const o = this.wallTiles[0];
      this.scene.ping(o % a.size + 0.5, Math.floor(o / a.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    this.send({ type: "build", player: mt, ids: s, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), Ke("place"), Ti("construir");
    const i = ct[Ot[this.placeKey]];
    this.scene.ping(this.place.tx + i.size / 2, this.place.tz + i.size / 2, "work"), t && a.canAfford(mt, { wood: (i.cost.wood ?? 0) * 2, stone: (i.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    if (!this.ended) {
      if (nt) {
        this.setMode("normal");
        const t = Ai();
        if (t && nt.ativo && !this.paused) {
          this.paused = !0;
          const a = nt.host.turno(this.world, !0);
          a && nt.conn.turno(a), nt.conn.pausa(!0);
        }
        xt.showOnline(Ie, t);
        return;
      }
      if (gt?.papel === "convidado") {
        this.setMode("normal"), xt.showGuest(gt.parceiro, Ie, gt.papelConvidado);
        return;
      }
      if (this.paused = !0, this.setMode("normal"), xt.showPause(Math.floor(this.world.tick / 600), Ie, this.owner, io(), this.world.beta), Ca(), gt?.papel === "anfitriao" && gt.ativo) {
        const t = gt.host.turno(this.world, !0);
        t && gt.amigo.turno(t), Yi(!0);
      }
    }
  }
  dicas() {
    this.ended || (this.setMode("normal"), !gt && !nt && !this.paused && (this.paused = !0, this.dicasPausou = !0), this.hud.abrirDicas(() => {
      this.dicasPausou && (this.dicasPausou = !1, xt.open || (this.paused = !1));
    }));
  }
  resume() {
    const t = this.paused;
    this.paused = this.dicasPausou, xt.hide(), gt?.papel === "anfitriao" && gt.ativo && Yi(!1), nt && Ai() && nt.ativo && t && nt.conn.pausa(!1);
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = fa();
    !this.owner && t && (xn("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended || this.guest || this.naRede) return "fail";
    await Ca(), this.adopt();
    const { d: t, ok: a } = Br(this.world, this.owner), s = await Dr(t, this.owner);
    return a || ka("problema", { tipo: "aparelho" }), s === "fail" && ka("problema", { tipo: "nuvem" }), s === "ok" ? a ? "both" : "cloudOnly" : a ? s === "fail" ? "localOnly" : s === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended || this.guest || this.naRede) return;
    this.adopt();
    const { d: a, ok: s } = Br(this.world, this.owner);
    !s && !t && ka("problema", { tipo: "aparelho" }), Dr(a, this.owner, t).then((i) => {
      i === "fail" && !t && ka("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  /** ordem de quem joga: sozinho ou anfitrião, entra no jogo; no jogo de um amigo, vai para o anfitrião, que a põe no jogo */
  send(t) {
    const a = V0(this.world, Is(), t);
    if (!a) return !1;
    if (gt?.papel === "convidado") gt.amigo.ordem(Jo(a));
    else if (nt && !Ai()) {
      if (!nt.ativo) return !1;
      nt.conn.ordem(Jo(a));
    } else this.world.issue(a, !0);
    return !0;
  }
  /** o anfitrião vê onde o amigo mandou (o mesmo sinal das ordens) */
  pingAmigo(t) {
    const a = this.world, s = a.size;
    t.type === "move" || t.type === "amove" || t.type === "rally" ? this.scene.ping(t.x / 256, t.z / 256, t.type === "amove" ? "attack" : "move") : t.type === "gather" ? this.scene.ping(t.k % s + 0.5, Math.floor(t.k / s) + 0.5, "work") : (t.type === "work" || t.type === "attack") && a.alive[t.target] ? this.scene.ping(a.x[t.target] / 256, a.z[t.target] / 256, t.type === "attack" && a.owner[t.target] !== It ? "attack" : "work") : t.type === "build" && this.scene.ping(t.tx + 1, t.tz + 1, "work");
  }
  /** câmera e seleção, para continuar iguais quando o jogo recarrega (o amigo entrou ou pediu o jogo de novo) */
  view() {
    const t = this.scene.camera;
    return { tx: t.tx, tz: t.tz, yaw: t.tyaw, dist: t.tdist, sel: [...this.sel] };
  }
  setView(t) {
    const a = this.scene.camera;
    a.x = a.tx = t.tx, a.z = a.tz = t.tz, a.yaw = a.tyaw = t.yaw, a.dist = a.tdist = t.dist;
    for (const s of t.sel) this.world.isUnit(s) && this.world.owner[s] === mt && this.sel.add(s);
  }
  /** convidado: anda até o passo que o anfitrião já mandou (mais depressa quando fica para trás) e confere a partida */
  seguir(t, a) {
    const s = this.world, i = a.guest, o = i.ate - s.tick;
    if (o > 0) {
      this.acc += t * (a.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= ia && s.tick < i.ate && r < 40; )
        s.step(), i.depoisDoPasso(s), this.acc -= ia, r++;
    }
    s.tick >= i.ate && (this.acc = Math.min(this.acc, ia * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.amigo.reconectando && (a.parado = n, this.hud.setFaixa(n ? b("amigo.espera") : a.pausado ? b("amigo.pausado") : null)), (i.divergiu || i.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.amigo.pedir(), this.hud.setFaixa(b("amigo.sincronizando")), Xt("amigo", { acao: "sincronizou", papel: "convidado" }));
  }
  /** partida online, quem não dá o ritmo: como o convidado do jogo com um amigo */
  seguirOnline(t, a) {
    const s = this.world, i = a.guest, o = i.ate - s.tick;
    if (o > 0) {
      this.acc += t * (a.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= ia && s.tick < i.ate && r < 40; )
        s.step(), i.depoisDoPasso(s), this.acc -= ia, r++;
    }
    s.tick >= i.ate && (this.acc = Math.min(this.acc, ia * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.conn.reconectando && (a.parado = n, this.hud.setFaixa(n ? b("online.esperaAnf", { name: a.nomes[a.anf] || "" }) : a.pausado ? b("online.pausado", { name: a.nomes[a.anf] || "" }) : null)), (i.divergiu || i.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.conn.pedir(), this.hud.setFaixa(b("online.sincronizando")));
  }
  frame(t) {
    const a = this.world, s = gt, i = s?.papel === "anfitriao" && s.ativo ? s.host : null, o = nt, n = o && o.ativo && o.anf === o.eu ? o.host : null;
    if (s?.papel === "convidado")
      s.ativo && this.seguir(t, s);
    else if (o && !n)
      o.ativo && this.seguirOnline(t, o);
    else if (!this.paused) {
      this.acc += t;
      let c = 0;
      for (; this.acc >= ia && c < 4; )
        a.step(), i?.depoisDoPasso(a), n?.depoisDoPasso(a), this.acc -= ia, c++;
      c === 4 && (this.acc = 0);
    }
    if (i) {
      const c = i.turno(a);
      c && s.amigo.turno(c);
    }
    if (n) {
      const c = n.turno(a);
      c && o.conn.turno(c);
    }
    const r = a.drain();
    if (r.length) {
      this.scene.consume(r), this.hud.onEvents(r), this.snd.onEvents(r);
      for (const c of r)
        (c.t === "tree" || c.t === "res" && a.resKind[c.k] === 0) && this.minimap.clearTile(c.k), c.t === "age" && c.player === mt && !this.guest && !this.naRede && Xt("era_nova", { era: c.era, min: fo(a.tick) }), c.t === "msg" && c.player === mt && !this.guest && !this.naRede && this.medir(c.key), c.t === "msg" && c.player === mt && c.key === `defeated.${mt}` && this.naRede && a.outcome === "playing" && this.perdeuTribo(), c.t === "end" && !this.ended && this.end(a.resultadoDe(mt, c));
    }
    this.input.update(t);
    for (const c of [...this.sel]) a.alive[c] || this.sel.delete(c);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / ia, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && !this.guest && !this.naRede && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const l = Math.floor(a.tick / 600);
    if (!this.ended && !this.guest && !this.naRede && l > this.marco) {
      for (const c of $d) c > this.marco && c <= l && Xt("marco_partida", { min: c });
      this.marco = l;
    }
    if (!Gr && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (Gr = !0, Xt("desempenho", { fps: Ad(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][Ie] }))), Xi && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      Xi = !1;
      const c = this.autoN / this.autoT;
      c < 40 && Ie < 2 && (Tl(Ie + 1), this.scene.setQuality(Ie), this.hud.toast(b("q.auto", { q: b(`q.${us[Ie].key}`), fps: Math.round(c) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [a, s] = t.split("."), i = this.world, o = i.players[mt].era, n = Number(s) === ze ? "barbaros" : "rival";
    a === "centerDanger" ? Xt("centro_em_perigo", { por: n, era: o }) : a === "centerLost" ? this.derrotaPor = n : a === "hunger" && Xt("fome", { era: o, ano: Math.min(3, i.year) });
  }
  end(t) {
    const a = this.world;
    if (this.naRede) {
      Xt("amigo", { acao: t === "victory" ? "venceu" : "perdeu", papel: Ai() ? "anfitriao" : "convidado" }), this.ended = !0, this.setMode("normal"), xt.showEnd(t, Math.floor(a.tick / 600), a.players[mt].era, nt?.modo === 2 ? "time" : "tribo");
      return;
    }
    this.guest || (t === "victory" ? Xt("fim_vitoria", { era: a.players[mt].era, min: fo(a.tick) }) : Xt("fim_derrota", { por: this.derrotaPor || "rival", min: fo(a.tick) }), yn(this.owner), Ru(this.owner)), this.ended = !0, this.setMode("normal"), xt.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[mt].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let _ = null, gt = null;
const $l = (e, t, a = null) => ({ amigo: e, papel: t, parceiro: "", ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), host: new ll(), guest: new cl(), papelConvidado: a });
function Is() {
  const e = gt;
  return !e || !e.papelConvidado ? null : e.papel === "convidado" ? e.papelConvidado : e.ativo ? so(e.papelConvidado) : null;
}
function Yi(e) {
  const t = gt;
  t?.papel === "anfitriao" && t.amigo.pausa(e, ru(t.papelConvidado));
}
const Ji = (e, t) => xt.setConvite({ estado: t, codigo: e.amigo.codigo, nome: t === "junto" ? e.parceiro : void 0, papel: e.papelConvidado ?? void 0 });
async function gf(e) {
  if (!(!_ || gt || _.ended)) {
    xt.setConvite({ estado: "criando" });
    try {
      gt = $l(await Ws.convidar(vf), "anfitriao", e), Xt("amigo", { acao: "convidou", papel: e });
    } catch {
      xt.setConvite({ estado: "erro" });
    }
  }
}
function bf() {
  const e = gt;
  if (!e || e.papel !== "anfitriao" || !e.papelConvidado) return;
  e.papelConvidado = so(e.papelConvidado), e.ativo && Yi(_?.paused ?? !1), Ji(e, e.ativo ? "junto" : "aberto"), _?.aplicarPapel();
  const t = Is();
  t && _?.hud.toast(b("papel.agora", { papel: b(`papel.${t}`) }));
}
function vf(e) {
  const t = gt;
  if (!(!t || t.papel !== "anfitriao"))
    switch (e.t) {
      case "codigo":
        Ji(t, "aberto");
        break;
      case "entrou": {
        const a = t.ativo;
        t.parceiro = e.nome, Ji(t, "junto"), Wr(!a), a || (_?.hud.toast(t.papelConvidado ? b("amigo.entrouComo", { name: e.nome, papel: b(`papel.${t.papelConvidado}`) }) : b("amigo.entrou", { name: e.nome })), Xt("amigo", { acao: "entrou", papel: "anfitriao" }));
        break;
      }
      case "saiu":
        Ur(t, e.nome);
        break;
      case "ordem":
        if (t.ativo && _ && !_.ended) {
          const a = _.world, s = t.host.ordemDoAmigo(a, e.d, mt, (i) => V0(a, t.papelConvidado, i));
          s && _.pingAmigo(s);
        }
        break;
      // só o que é do papel dele (D31)
      case "pede":
        t.ativo && (Wr(!1), Xt("amigo", { acao: "sincronizou", papel: "anfitriao" }));
        break;
      case "caiu":
        _?.hud.setFaixa(b("amigo.caiu"));
        break;
      case "reconectou":
        _?.hud.setFaixa(null), e.sozinho && t.ativo && Ur(t, t.parceiro);
        break;
      case "erro":
        Sl(!1), xt.setConvite({ estado: "erro" });
        break;
    }
}
function Ur(e, t) {
  e.ativo = !1, _ && (_.world.onApplied = null, _.hud.setAmigo(null), _.hud.toast(b(e.papelConvidado ? "amigo.saiuTudo" : "amigo.saiu", { name: t })), _.aplicarPapel()), Ji(e, "aberto");
}
function Wr(e) {
  const t = _, a = gt;
  if (!t || !a || t.ended) return;
  const s = JSON.stringify(vn(t.world)), i = zs(JSON.parse(s));
  for (const n of t.world.takePendingExt()) i.issue(n, !0);
  const o = t.paused && !e;
  da(i, t.owner, t.view()), a.host.ligar(i), a.ativo = !0, a.amigo.jogo(s), _.hud.setAmigo(a.parceiro), _.aplicarPapel(), o ? _.pause() : Yi(!1);
}
function Sl(e = !0) {
  const t = gt;
  !t || t.papel !== "anfitriao" || (gt = null, t.amigo.sair(), _ && (_.world.onApplied = null, _.hud.setAmigo(null), _.hud.setFaixa(null), _.aplicarPapel()), xt.setConvite(null), e && Xt("amigo", { acao: "encerrou", papel: "anfitriao" }));
}
function yf(e) {
  gt || _ || (xt.setAmigoMsg(b("amigo.entrando"), !0), gt = $l(Ws.entrar(e, xf), "convidado"));
}
function xf(e) {
  const t = gt;
  if (!(!t || t.papel !== "convidado"))
    switch (e.t) {
      case "oi":
        t.parceiro = e.nome, xt.setAmigoMsg(b("amigo.entrandoEm", { name: e.nome }), !0);
        break;
      case "jogo": {
        if (e.v !== Us) {
          To(b("amigo.erro.t"), b("amigo.versao"));
          return;
        }
        let a = null;
        try {
          a = zs(e.d);
        } catch {
          a = null;
        }
        if (!a) {
          t.pediu = !0, t.amigo.pedir();
          return;
        }
        const s = !_;
        da(a, "", _ ? _.view() : void 0), t.guest.ligar(a), t.ativo = !0, t.pediu = !1, t.parado = !1, t.ultimoTurno = performance.now(), _.hud.setAmigo(t.parceiro), _.hud.setFaixa(t.pausado ? b("amigo.pausado") : null), s && Xt("amigo", { acao: "entrou", papel: "convidado" });
        break;
      }
      case "turno":
        t.ativo && _ && (t.ultimoTurno = performance.now(), t.guest.receber(_.world, e.d));
        break;
      case "pausa": {
        t.pausado = e.on, t.ultimoTurno = performance.now(), _?.hud.setFaixa(e.on ? b("amigo.pausado") : null);
        const a = lu(e.papel);
        if (a !== t.papelConvidado) {
          const s = t.papelConvidado;
          t.papelConvidado = a, _?.aplicarPapel(), a && _ && _.hud.toast(b(s ? "papel.agora" : "papel.voceE", { papel: b(`papel.${a}`) }));
        }
        break;
      }
      case "espera":
        _?.hud.setFaixa(b("amigo.espera"));
        break;
      case "voltou":
        t.ultimoTurno = performance.now(), t.parado = !1, _?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // o jogo vem de novo
      case "caiu":
        _?.hud.setFaixa(b("amigo.caiu")), Xt("amigo", { acao: "caiu", papel: "convidado" });
        break;
      case "reconectou":
        t.ultimoTurno = performance.now(), t.parado = !1, _?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // a sala avisa o anfitrião, que manda o jogo de novo
      case "fim":
        To(b("amigo.fim.t"), b("amigo.fim")), Xt("amigo", { acao: "fim", papel: "convidado" });
        break;
      case "erro":
        To(b("amigo.erro.t"), !e.msg || e.msg === "rede" ? b("amigo.semRede") : e.msg);
        break;
    }
}
function To(e, t) {
  const a = gt;
  gt = null, a?.amigo.sair(), _ ? (_.paused = !0, _.hud.setFaixa(null), xt.showInfo(e, t)) : xt.setAmigoMsg(t, !1);
}
let nt = null;
function Cs(e) {
  _?.hud.toast(e), nt && (nt.aviso = { texto: e, ate: performance.now() + 4e3 });
}
const Ai = () => !!nt && nt.anf === nt.eu, sn = (e) => e.players.some((t, a) => e.time(a) === e.time(mt) && !t.defeated), Cl = (e) => ({ conn: e, eu: -1, anf: 0, modo: 1, nomes: [], fora: /* @__PURE__ */ new Set(), host: new ll(), guest: new cl(), ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), olhando: !1, aviso: null }), La = (e) => nt?.nomes[e] || b("sala.computador");
async function Mf() {
  if (!(nt || gt || _)) {
    xt.setPartidaMsg(b("online.criando"), !0);
    try {
      nt = Cl(await Ks.nova(wl)), Xt("amigo", { acao: "criou", papel: "anfitriao" });
    } catch {
      xt.setPartidaMsg(b("online.erroCriar"), !1);
    }
  }
}
function kf(e) {
  nt || gt || _ || (xt.setPartidaMsg(b("online.entrando"), !0), nt = Cl(Ks.entrar(e, wl)));
}
function wl(e) {
  const t = nt;
  if (t)
    switch (e.t) {
      case "sala":
        t.eu = e.sala.eu, xt.setPartidaMsg("", !1), xt.showLobby(e.sala);
        break;
      case "comeca":
        zf(t, e.c);
        break;
      case "turno":
        t.ativo && _ && t.anf !== t.eu && (t.ultimoTurno = performance.now(), t.guest.receber(_.world, e.d));
        break;
      case "jogo":
        Af(t, e.v, e.d);
        break;
      case "pausa":
        t.anf !== t.eu && (t.pausado = e.on, t.ultimoTurno = performance.now(), _?.hud.setFaixa(e.on ? b("online.pausado", { name: La(t.anf) }) : null));
        break;
      case "ordem":
        t.anf === t.eu && t.ativo && _ && !_.ended && t.nomes[e.v] && !t.fora.has(e.v) && t.host.ordemDoAmigo(_.world, e.d, e.v);
        break;
      case "pede":
        t.anf === t.eu && t.ativo && qi();
        break;
      case "sinal":
        _ && t.ativo && _.world.aliado(mt, e.v) && _.mostrarSinal(e.v, e.tipo, e.x, e.z);
        break;
      case "caiu":
        if (!_) break;
        e.v === t.anf ? _.hud.setFaixa(b("online.esperaAnf", { name: La(e.v) })) : Cs(b("online.caiu", { name: La(e.v) }));
        break;
      case "voltou":
        _ && (Cs(b("online.voltou", { name: La(e.v) })), e.v === t.anf && _.hud.setFaixa(b("online.sincronizando"))), t.anf === t.eu && qi();
        break;
      case "saiu":
        t.fora.add(e.v), _ && Cs(b("online.saiu", { name: La(e.v) })), t.anf === t.eu && t.ativo && _ && !_.ended && _.world.players[e.v] && !_.world.players[e.v].ai && (_.world.issue({ type: "ia", player: e.v }, !0), Xt("amigo", { acao: "assumiu", papel: "anfitriao" }));
        break;
      case "anfitriao":
        t.anf = e.v;
        for (const a of e.fora) t.fora.add(a);
        if (e.v === t.eu) {
          if (!_ || !t.ativo) {
            t.conn.cede();
            break;
          }
          for (const a of t.fora) _.world.players[a] && !_.world.players[a].ai && _.world.issue({ type: "ia", player: a }, !0);
          Cs(b("online.anfitriaoVoce")), qi();
        } else
          t.pediu = !0, Cs(b("online.anfitriao", { name: La(e.v) })), _?.hud.setFaixa(b("online.sincronizando"));
        break;
      case "reconectando":
        _ ? _.hud.setFaixa(b("online.reconectando")) : xt.setPartidaMsg(b("online.reconectando"), !0);
        break;
      case "fim":
        on(e.motivo === "criador" ? b("sala.fechou") : b("online.fim"));
        break;
      case "erro":
        on(!e.msg || e.msg === "rede" ? b("online.semRede") : e.msg);
        break;
    }
}
function zf(e, t) {
  e.eu = t.eu, e.anf = t.anf, e.modo = t.modo, e.nomes = t.vagas;
  for (const i of t.fora) e.fora.add(i);
  if (mt = t.eu, t.volta) {
    e.anf === e.eu ? _ && e.ativo ? qi() : e.conn.cede() : (e.pediu = !0, _?.hud.setFaixa(b("online.sincronizando")));
    return;
  }
  const a = Wi[t.modo] ?? Wi[1], s = new fn(t.semente, a.vagas, { humanos: uu(t.vagas), times: a.times, difficulty: t.dif });
  da(s, ""), e.anf === e.eu ? e.host.ligar(s) : e.guest.ligar(s), e.ativo = !0, e.ultimoTurno = performance.now(), _?.hud.toast(b("online.voceE", { cor: b(`cor.${t.eu}`) })), e.anf === e.eu && Xt("amigo", { acao: "comecou", papel: "anfitriao" });
}
function Af(e, t, a) {
  if (e.anf === e.eu || _?.ended) return;
  if (t !== Us) {
    on(b("amigo.versao"));
    return;
  }
  let s = null;
  try {
    s = zs(a);
  } catch {
    s = null;
  }
  if (!s) {
    e.conn.pedir();
    return;
  }
  mt = e.eu, da(s, "", _ ? _.view() : void 0), e.guest.ligar(s), e.ativo = !0, e.pediu = !1, e.parado = !1, e.ultimoTurno = performance.now(), _.hud.setFaixa(e.pausado ? b("online.pausado", { name: La(e.anf) }) : null);
}
function qi() {
  const e = _, t = nt;
  if (!e || !t || e.ended) return;
  const a = JSON.stringify(vn(e.world)), s = zs(JSON.parse(a));
  for (const n of e.world.takePendingExt()) s.issue(n, !0);
  const i = e.paused, o = xt.kind;
  da(s, "", e.view()), t.host.ligar(s), t.ativo = !0, t.pediu = !1, t.conn.jogo(a), i ? (_.paused = !0, o === "online" && xt.showOnline(Ie, !0), t.conn.pausa(!0)) : t.conn.pausa(!1), _.hud.setFaixa(null);
}
function on(e) {
  const t = nt;
  if (nt = null, t?.conn.sair(), mt = 0, _) {
    _.paused = !0, _.hud.setFaixa(null), xt.showInfo(b("online.titulo"), e);
    return;
  }
  si(), xt.showStartOnline(Wa), xt.setPartidaMsg(e, !1);
}
function Tf() {
  const e = nt;
  e && (e.ativo && Xt("amigo", { acao: "saiu", papel: e.anf === e.eu ? "anfitriao" : "convidado" }), Oi("online"));
}
let Gr = !1;
const Ti = (e) => ka("ordem_primeira", { tipo: e }), $o = (e, t) => Xt("partida_continuada", { era: e.players[mt].era, de: t });
An.addEventListener("webglcontextlost", () => ka("problema", { tipo: "webgl" }));
const Pl = {
  cont: async () => {
    const e = Wa.save;
    if (!e) return;
    if (e.from === "cloud") {
      const a = await il();
      let s = null;
      try {
        s = a ? zs(a) : null;
      } catch {
        s = null;
      }
      if (s && a) {
        Tu(a, e.owner), da(s, e.owner), $o(s, "nuvem");
        return;
      }
      ka("problema", { tipo: "carregar" });
    }
    const t = $u(e.owner);
    if (!t) {
      ka("problema", { tipo: "carregar" }), yn(e.owner), si();
      return;
    }
    if (e.adopt) {
      const a = fa();
      if (a) {
        xn("", a), da(t, a), $o(t, "aparelho");
        return;
      }
    }
    da(t, e.owner), $o(t, "aparelho");
  },
  start: (e, t, a) => {
    da(new fn(Ki("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, regras: a, testUnits: Math.min(600, Ki("units", 0)) }), fa()), Xt("partida_nova", { rivais: e, dif: Td[t] ?? "normal" }), (pa.get("dicas") === "1" || pa.get("autostart") !== "1" && !su()) && _?.dicas();
  },
  resume: () => _?.resume(),
  save: () => _?.save() ?? Promise.resolve("fail"),
  quit: () => {
    _?.autoSave(), Oi();
  },
  quality: (e) => {
    Tl(e), Xi = !1, _?.scene.setQuality(e);
  },
  help: () => {
    _?.resume(), _?.hud.openHelp();
  },
  watch: () => xt.hide(),
  toMenu: () => Oi(nt ? "online" : ""),
  login: () => {
    Nr();
  },
  profile: () => {
    qu();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await Nr(), _ && es()) {
      const e = await _.save();
      xt.updatePause(_.owner, io(), e);
    }
  },
  convidar: (e) => {
    gf(e);
  },
  trocarPapeis: () => bf(),
  encerrarConvite: () => Sl(),
  entrarAmigo: (e) => yf(e),
  sairAmigo: () => {
    const e = gt;
    gt = null, e?.amigo.sair(), Oi();
  },
  criarPartida: () => {
    Mf();
  },
  entrarPartida: (e) => kf(e),
  cfgPartida: (e, t) => nt?.conn.cfg(e, t),
  trocarVagas: (e, t) => nt?.conn.trocar(e, t),
  comecarPartida: () => nt?.conn.comecar(),
  sairPartida: () => Tf(),
  olharPartida: () => {
    xt.hide(), nt && _ && (nt.olhando = !0, sn(_.world) || _.scene.setFog(!1));
  }
  // sem o time, vê o mapa inteiro
}, xt = new xu(Pl);
function da(e, t, a) {
  _?.dispose(), _ = new mf(e, t), a && _.setView(a), xt.hide();
  const s = _;
  window.__amigo = () => gt && { papel: gt.papel, ativo: gt.ativo, pediu: gt.pediu, divergiu: gt.guest.divergiu, ate: gt.guest.ate, parceiro: gt.parceiro }, window.__online = () => nt && { eu: nt.eu, anf: nt.anf, ativo: nt.ativo, pediu: nt.pediu, divergiu: nt.guest.divergiu, fora: [...nt.fora], olhando: nt.olhando }, window.__origines = {
    world: e,
    scene: s.scene,
    input: s.input,
    game: s,
    screen: (i, o, n = 0.5) => {
      const r = s.scene.camera.cam.position.clone().set(i, zt(e.map, i, o) + n, o).project(s.scene.camera.cam);
      return [(r.x + 1) / 2 * innerWidth, (1 - r.y) / 2 * innerHeight, r.z < 1 ? 1 : 0];
    }
  };
}
function Oi(e = "") {
  if (gt) {
    const t = gt;
    gt = null, t.amigo.sair();
  }
  if (nt) {
    const t = nt;
    nt = null, t.conn.sair();
  }
  mt = 0, xt.setConvite(null), _?.dispose(), _ = null, st.setScene("menu"), de.menu(), Qs.setClearColor(1911332, 1), Qs.clear(), si(), e === "online" && (xt.setPartidaMsg("", !1), xt.showStartOnline(Wa));
}
let Wa = { acc: "loading", save: null, other: null }, So = 0;
async function si() {
  const e = ++So;
  if (Wa = Vr(null, es()), xt.showStart(Wa), !es()) return;
  const t = await Ou();
  e !== So || xt.kind !== "start" || (await $f(t), !(e !== So || xt.kind !== "start") && (Wa = Vr(t, !1), xt.updateStart(Wa)));
}
async function $f(e) {
  const t = fa();
  if (!t || Cu()) return;
  const a = Su("");
  if (a && e && !Bs(t)) {
    const s = await il();
    s && s.seed === a.seed && a.tick >= s.tick && xn("", t);
  }
  wu();
}
function Vr(e, t) {
  const a = io();
  if (a === "loading") return { acc: a, save: null, other: null };
  const s = fa();
  if (s) {
    const o = e ? Bu(e) : null, n = Bs(s);
    if (o && (!n || (o.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: a, save: { meta: o, from: "cloud", owner: s, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: a, save: { meta: n, from: "device", owner: s, adopt: !1 }, other: null, pending: t };
    const r = Bs("");
    return { acc: a, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const i = Bs("");
  return { acc: a, save: i ? { meta: i, from: "device", owner: "", adopt: !1 } : null, other: Pu()[0]?.dono ?? null };
}
Eu(() => {
  xt.kind === "start" ? si() : xt.kind === "pause" && _ && xt.updatePause(_.owner, io());
});
addEventListener("resize", () => {
  Qs.setSize(innerWidth, innerHeight, !1), _?.resize();
});
Qs.setSize(innerWidth, innerHeight, !1);
let nn = performance.now();
const El = () => _?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  nn = performance.now(), document.hidden ? El() : Ca();
});
addEventListener("pagehide", () => {
  if (El(), gt?.papel === "anfitriao") {
    const e = gt;
    gt = null, e.amigo.sair();
  }
  if (nt) {
    const e = nt;
    nt = null, e.conn.sair();
  }
});
let $i = 0, Co = 0, Il = !1;
pa.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  Il = e;
}, step: (e) => _?.frame(e) });
function ql(e) {
  const t = Math.min(0.1, (e - nn) / 1e3);
  nn = e, _ && !Il && _.frame(t), Co++, $i += t, $i > 1 && (window.__fps = Co / $i, Co = 0, $i = 0), requestAnimationFrame(ql);
}
requestAnimationFrame(ql);
const Ol = pa.get("sons") === "1" || location.hash === "#sons";
st.install();
Ol || de.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && Ke(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: pf, measure: ff, audio: st, played: an, music: de };
Ol ? uf() : pa.get("autostart") === "1" ? Pl.start(Math.min(3, Math.max(1, Ki("players", 4) - 1)), Math.min(2, Ki("difficulty", 1)), pa.get("regras") === "beta" ? "beta" : "normal") : (si(), Iu());
yu().then((e) => xt.setAmigoDisponivel(e));
_u().then((e) => xt.setOnlineDisponivel(e));
const wo = document.getElementById("loading");
wo && (wo.style.opacity = "0", setTimeout(() => wo.remove(), 450));
