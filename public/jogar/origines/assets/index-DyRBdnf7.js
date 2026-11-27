var hc = Object.defineProperty;
var uc = (e, t, a) => t in e ? hc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var g = (e, t, a) => uc(e, typeof t != "symbol" ? t + "" : t, a);
import { C as se, M as Rs, a as fc, R as pc, P as ci, V as Ot, B as Ge, b as ca, c as vn, S as v0, d as Ho, D as mc, I as y0, e as Li, f as Ya, g as Me, h as wa, F as Za, E as x0, Q as Ms, i as ue, j as gc, k as bc, G as ns, l as Ht, T as k0, m as ye, n as M0, o as Ja, p as z0, q as yn, r as A0, s as vc, t as yc, u as xc, v as kc, w as Mc, U as zc, L as Ac, x as Tc, H as $c, y as Sc, z as Cc, W as Pc, A as Ec, J as Ic } from "./three-tIftsQV1.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
    s(o);
  new MutationObserver((o) => {
    for (const i of o)
      if (i.type === "childList")
        for (const n of i.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && s(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(o) {
    const i = {};
    return o.integrity && (i.integrity = o.integrity), o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? i.credentials = "include" : o.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i;
  }
  function s(o) {
    if (o.ep)
      return;
    o.ep = !0;
    const i = a(o);
    fetch(o.href, i);
  }
})();
function qc(e = document, t = window) {
  const a = (n) => {
    n.cancelable && n.preventDefault();
  };
  for (const n of ["gesturestart", "gesturechange", "gestureend"]) e.addEventListener(n, a, { passive: !1 });
  e.addEventListener("touchmove", (n) => {
    n.touches.length > 1 && a(n);
  }, { passive: !1 }), t.addEventListener("wheel", (n) => {
    n.ctrlKey && a(n);
  }, { passive: !1 });
  const s = t.visualViewport, o = e.querySelector('meta[name="viewport"]');
  if (!s || !o) return;
  let i = !1;
  s.addEventListener("resize", () => {
    if (s.scale <= 1.01 || i) return;
    const n = e.activeElement;
    if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return;
    i = !0;
    const r = o.getAttribute("content") ?? "";
    o.setAttribute("content", r + ", minimum-scale=1"), setTimeout(() => {
      o.setAttribute("content", r), i = !1;
    }, 300);
  });
}
const J = 256;
function ha(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const Be = (e, t) => Math.trunc(e / t), Wo = 10, xn = 4, Oc = [30, 60, 90, 115, 135, 150], Ga = ["food", "wood", "stone", "metal", "coins"], X = [
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
], mt = Object.fromEntries(X.map((e, t) => [e.key, t])), Tt = 60, ut = 100, lt = [
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
], wt = Object.fromEntries(lt.map((e, t) => [e.key, t])), kn = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], He = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 },
  // Fundação de Roma (Era IV, M3)
  { cost: { food: 2e3, stone: 900, metal: 600, coins: 600 }, time: 180 }
  // República (Era V, M3)
], Ca = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], Se = 200, Go = Object.fromEntries(Ca.map((e, t) => [e.key, t])), Va = { give: 100, get: 60, fair: 85 }, wc = 300, Qa = ["food", "wood", "stone", "metal", "coins"], Ba = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28, silver: 0.25 }, Rc = 10, Mn = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], ze = 6, Rt = -1, ve = 60 * Wo, Bc = ve * 12, Dc = 2, Nc = 3, ji = [
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
], te = 3, T0 = (e) => e === "beta" ? "beta" : "normal", Ln = [12, 16, 19, 23, 26, 30], Fc = 4, Lc = 4, jc = 10, _c = 8, Uc = 4, jn = [100, 160, 180, 200, 220, 240], Hc = [15], Wc = 130;
function Aa(e, t, a) {
  let s = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(a | 0, 1442695041) | 0;
  return s = Math.imul(s ^ s >>> 13, 1274126177), ((s ^ s >>> 16) >>> 0) / 4294967296;
}
const _n = (e) => e * e * (3 - 2 * e);
function Gc(e, t, a) {
  const s = Math.floor(e), o = Math.floor(t), i = e - s, n = t - o, r = _n(i), l = _n(n), d = Aa(s, o, a), c = Aa(s + 1, o, a), h = Aa(s, o + 1, a), f = Aa(s + 1, o + 1, a);
  return d + (c - d) * r + (h - d) * l + (d - c - h + f) * r * l;
}
function _a(e, t, a, s = 4) {
  let o = 0, i = 0.5, n = 1, r = 0;
  for (let l = 0; l < s; l++)
    o += i * Gc(e * n, t * n, a + l * 31), r += i, i *= 0.5, n *= 2.03;
  return o / r;
}
const bs = (e, t, a) => e < t ? t : e > a ? a : e, Le = (e, t, a) => {
  const s = bs((a - e) / (t - e), 0, 1);
  return s * s * (3 - 2 * s);
}, Da = (e, t, a) => e + (t - e) * a;
class $0 {
  constructor(t) {
    g(this, "a");
    g(this, "b");
    g(this, "c");
    g(this, "d");
    this.a = 2654435769, this.b = 608135816, this.c = 3084996962, this.d = t >>> 0;
    for (let a = 0; a < 16; a++) this.next();
  }
  next() {
    let t = this.a | 0, a = this.b | 0, s = this.c | 0, o = this.d | 0;
    const i = (t + a | 0) + o | 0;
    return o = o + 1 | 0, t = a ^ a >>> 9, a = s + (s << 3) | 0, s = s << 21 | s >>> 11, s = s + i | 0, this.a = t, this.b = a, this.c = s, this.d = o, i >>> 0;
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
const xa = 0, Vo = 1, Pa = 2, Ta = 3, Ma = 4, ea = 5, zs = (e) => e === Ta || e === Ma || e === ea, zn = 3, S0 = 1, _i = 2, C0 = 3, xe = 1, Xe = 2, Ie = 3, Ae = 4, Ze = 1.4142135623730951, Ko = 1.7320508075688772, Vc = 0.585, di = 8.5, Kc = 1 / (0.66 * 0.66) - 1, Un = 2, ho = (e, t) => Math.sqrt(e * e + t * t), P0 = { 2: [0, 1], 3: [0.5, Ko / 2], 4: [Ze / 2, Ze / 2] }, Xc = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Ko / 2], [-1, 0], [0.5, -Ko / 2]],
  4: [[Ze / 2, Ze / 2], [-Ze / 2, Ze / 2], [-Ze / 2, -Ze / 2], [Ze / 2, -Ze / 2]]
};
function xi(e, t, a) {
  const [s, o] = P0[a];
  for (let i = 0; i < 24; i++) {
    if (t < 0) {
      t = -t;
      continue;
    }
    if (s * t - o * e > 1e-9) {
      const r = e * s + t * o;
      e = 2 * r * s - e, t = 2 * r * o - t;
      continue;
    }
    break;
  }
  return [e, t];
}
function E0(e, t, a = zn) {
  const s = bs(t, 2, 4), o = s === 2 ? 192 : 256, i = o / 2, n = a >= 2, r = a >= 3, l = 2, d = o / l + 1, c = new Float32Array(d * d), h = o * (s === 2 ? 0.32 : 0.36), f = 13, u = o * 0.075, [p, v] = P0[s], y = [p * h, v * h], k = [o * 0.21, o * 0.4], M = (B, j) => {
    const [K, _] = xi(B, j, s), T = Math.sqrt(K * K + _ * _);
    let E = (_a(K * 0.02 + 7.3, _ * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (_a(K * 0.08, _ * 0.08, e + 9, 2) - 0.5) * 1.2;
    const N = Math.max(Math.abs(B), Math.abs(j)) / i;
    E += Le(0.8, 0.98, N) * 20 * (0.6 + 0.4 * _a(K * 0.04, _ * 0.04, e + 3, 2));
    const D = _, at = 2.5 + (_a(K * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (T > u * 0.8) {
      let Ct = 0;
      for (const Yt of k) Ct = Math.max(Ct, 1 - Le(3, 6, Math.abs(T - Yt)));
      const kt = Da(-2.2, -0.35, Ct);
      if (n) {
        let Yt = 0;
        for (const Jt of k) Yt = Math.max(Yt, 1 - Le(5, 11, Math.abs(T - Jt)));
        E = Da(E, Math.min(E, 1), Le(at + 9 + 12 * Yt, at + 3, D) * (0.75 + 0.25 * Yt)), E = Da(kt, E, Le(at, at + 6.5 + 4 * Yt, D));
      } else
        E = Da(E, Math.min(E, 1), Le(at + 9, at + 3, D) * 0.75), E = Da(kt, E, Le(at, at + 6.5, D));
    }
    E = Da(-2.6, E, Le(u, u + 10, T));
    const xt = ho(K - y[0], _ - y[1]);
    return E = Da(2.2, E, Le(f, f + 8, xt)), E;
  };
  for (let B = 0; B < d; B++) for (let j = 0; j < d; j++) c[B * d + j] = M(j * l - i, B * l - i);
  const x = (B, j) => {
    const K = bs(B / l, 0, d - 1.001), _ = bs(j / l, 0, d - 1.001), T = Math.floor(K), E = Math.floor(_), N = K - T, D = _ - E, G = c[E * d + T], at = c[E * d + T + 1], xt = c[(E + 1) * d + T], Ct = c[(E + 1) * d + T + 1];
    return G + (at - G) * N + (xt - G) * D + (G - at - xt + Ct) * N * D;
  }, z = (B, j, K) => K >= 0.5 && B * B + j * j > Kc * l * l, A = (B, j) => {
    const K = (B + 0.5) / l, _ = (j + 0.5) / l, T = Math.floor(K), E = Math.floor(_), N = K - T + _ - E, D = c[E * d + T], G = c[E * d + T + 1], at = c[(E + 1) * d + T], xt = c[(E + 1) * d + T + 1];
    return N <= 1 && z(G - D, at - D, (D + G + at) / 3) || N >= 1 && z(xt - at, xt - G, (G + at + xt) / 3);
  }, $ = (B, j) => {
    const K = B >> 1, _ = j >> 1, T = B & 1, E = j & 1, N = c[_ * d + K], D = c[_ * d + K + 1], G = c[(_ + 1) * d + K], at = c[(_ + 1) * d + K + 1], xt = z(D - N, G - N, (N + D + G) / 3), Ct = z(at - G, at - D, (D + G + at) / 3), kt = z(D - N, at - D, (N + D + at) / 3), Yt = z(at - G, G - N, (N + G + at) / 3);
    return T === E ? xt && T === 0 || Ct && T === 1 || kt || Yt : xt || Ct || (T === 1 ? kt : Yt);
  }, P = new Uint8Array(o * o), I = new Uint8Array(o * o), C = new Uint16Array(o * o), w = [];
  for (let B = 0; B < o; B++) for (let j = 0; j < o; j++) {
    const K = x(j + 0.5, B + 0.5), _ = B * o + j, T = Math.abs(x(j + 1, B + 0.5) - x(j, B + 0.5)) + Math.abs(x(j + 0.5, B + 1) - x(j + 0.5, B));
    K < -0.9 ? P[_] = Ta : K < -0.05 ? P[_] = Pa : K < 0.55 ? P[_] = Vo : T > 2.2 ? P[_] = Ma : P[_] = xa;
  }
  const F = Xc[s].map(([B, j]) => ({ x: Math.round(i + B * h), z: Math.round(i + j * h), ux: B, uz: j })), V = (B, j, K) => F.some((_) => ho(B - _.x, j - _.z) < K);
  for (let B = 1; B < o - 1; B++) for (let j = 1; j < o - 1; j++) {
    const K = B * o + j;
    if (P[K] !== xa) continue;
    const [_, T] = xi(j + 0.5 - i, B + 0.5 - i, s), E = ho(_, T);
    let N = _a(_ * 0.045 + 13, T * 0.045 - 7, e + 5, 3);
    const D = ho(_ - p * (h + 18), T - v * (h + 18));
    N += Le(16, 6, D) * 0.35, N += Le(14, 8, T) * -0.25, E < u + 10 && (N -= 0.3);
    const G = x(j + 0.5, B + 0.5);
    N > Vc && !V(j, B, 15) && Aa(Math.round(_ * 4), Math.round(T * 4), e + 77) > 0.12 ? (I[K] = G > 9 ? C0 : Aa(Math.round(_ * 3), Math.round(T * 3), e + 78) < 0.14 ? _i : S0, C[K] = 100) : Aa(Math.round(_ * 2), Math.round(T * 2), e + 79) < 0.012 && !V(j, B, 11) && G < 8 && (I[K] = _i, C[K] = 100);
  }
  if (n) for (let B = 0; B < o; B++) for (let j = 0; j < o; j++) {
    const K = B * o + j;
    P[K] === xa && x(j + 0.5, B + 0.5) > di && (P[K] = ea);
  }
  if (s === 2 || s === 4) {
    const B = (K, _) => {
      let T = Math.abs(2 * K - (o - 1)), E = Math.abs(2 * _ - (o - 1));
      if (s === 4 && E > T) {
        const N = T;
        T = E, E = N;
      }
      return (E + o - 1) / 2 * o + (T + o - 1) / 2;
    };
    for (let K = 0; K < o; K++) for (let _ = 0; _ < o; _++) {
      const T = K * o + _, E = B(_, K);
      E !== T && (P[T] = P[E], I[T] = I[E], C[T] = C[E]);
    }
    const j = (d - 1) / 2;
    for (let K = 0; K < d; K++) for (let _ = 0; _ < d; _++) {
      let T = Math.abs(_ - j), E = Math.abs(K - j);
      if (s === 4 && E > T) {
        const N = T;
        T = E, E = N;
      }
      c[K * d + _] = c[(E + j) * d + T + j];
    }
  }
  if (n) for (let B = 0; B < o; B++) for (let j = 0; j < o; j++) {
    const K = B * o + j;
    (P[K] === xa || P[K] === ea) && $(j, B) && (P[K] = A(j, B) ? Ma : ea, I[K] = 0, C[K] = 0);
  }
  const S = (B, j, K) => {
    if (s === 2) return B === 0 ? [j, K] : [o - 1 - j, o - 1 - K];
    if (s === 4) {
      let D = j, G = K;
      for (let at = 0; at < B; at++) {
        const xt = D;
        D = o - 1 - G, G = xt;
      }
      return [D, G];
    }
    let _ = j + 0.5 - i, T = K + 0.5 - i;
    const E = -0.5, N = Ko / 2;
    for (let D = 0; D < B; D++) {
      const G = _ * E - T * N;
      T = _ * N + T * E, _ = G;
    }
    return [Math.floor(_ + i), Math.floor(T + i)];
  }, q = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], O = [[0, 0], [2, 0], [0, 2], [2, 2], [4, 1]], H = new $0(e ^ 24301), U = (B, j, K, _) => {
    if (j < 1 || K < 1 || j >= o - 1 || K >= o - 1) return;
    const T = K * o + j;
    P[T] === Ta || P[T] === Pa || w.some((E) => E.x === j && E.z === K) || (I[T] = 0, C[T] = 0, !n && P[T] === Ma && (P[T] = xa), w.push({ kind: B, x: j, z: K, amount: _ }));
  }, R = F[0];
  -R.uz, R.ux;
  const L = (B, j, K, _, T, E, N, D = q) => {
    const G = [];
    for (let at = 0; at < N; at++) {
      const [xt, Ct] = D[at % D.length];
      G.push([Math.round(B + K * (T + xt) + -_ * (E + Ct) - 0.5), Math.round(j + _ * (T + xt) + K * (E + Ct) - 0.5)]);
    }
    return G;
  }, Y = [
    { kind: xe, amount: 125, tiles: L(R.x, R.z, R.ux, R.uz, -5, 6, 6) },
    { kind: Xe, amount: 350, tiles: L(R.x, R.z, R.ux, R.uz, -9, -8, 5) },
    { kind: Ie, amount: 400, tiles: L(R.x, R.z, R.ux, R.uz, -15, 14, 5) },
    { kind: Ie, amount: 800, tiles: L(i, i, R.ux, R.uz, u + 12, 0, 6) },
    { kind: Xe, amount: 500, tiles: L(i, i, R.ux, R.uz, u + 22, 6, 4) },
    // mapa 3 (M3): veios de prata, um pequeno perto de cada início e um grande no centro (aparecem no Reino e viram moedas)
    ...r ? [
      // as pedras do veio ficam a 2 tiles uma da outra: girando o mapa (3 jogadores), duas não caem no mesmo tile e todos
      // ficam com a mesma prata
      { kind: Ae, amount: 300, tiles: L(R.x, R.z, R.ux, R.uz, -16, -14, 4, O) },
      { kind: Ae, amount: 600, tiles: L(i, i, R.ux, R.uz, u + 12, -10, 5, O) }
    ] : []
  ];
  for (let B = 0; B < s; B++) for (const j of Y) for (const [K, _] of j.tiles) {
    const [T, E] = S(B, K, _);
    U(j.kind, T, E, j.amount);
  }
  for (const B of F) for (let j = -8; j <= 7; j++) for (let K = -8; K <= 7; K++) {
    if ((K + 0.5) ** 2 + (j + 0.5) ** 2 >= 50) continue;
    const _ = (B.z + j) * o + B.x + K;
    I[_] = 0, C[_] = 0;
  }
  H.next();
  const ot = (B, j) => B > 1 && j > 1 && B < o - 2 && j < o - 2 && (P[j * o + B] === xa || P[j * o + B] === Vo) && !I[j * o + B] && !w.some((K) => K.x === B && K.z === j), ft = (B, j, K = 8) => {
    for (let _ = 0; _ < K; _++) for (let T = -_; T <= _; T++) for (let E = -_; E <= _; E++)
      if (Math.max(Math.abs(E), Math.abs(T)) === _ && ot(B + E, j + T))
        return [B + E, j + T];
    return [B, j];
  }, dt = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: u + 30, v: 12, n: 3, r: 6 }
  ], St = [], Wt = [], ct = (B) => L(B.base === "s" ? R.x : i, B.base === "s" ? R.z : i, R.ux, R.uz, B.u, B.v, 1)[0], [et, Z] = L(i, i, R.ux, R.uz, u + 36, 0, 1)[0], de = n ? dt.map((B) => {
    const [j, K] = ct(B), _ = Array.from({ length: B.n }, (T, E) => {
      const [N, D] = q[E % q.length];
      return ft(j + N, K + D, 24);
    });
    return { casa: ot(j, K) ? [j, K] : _[0], spots: _ };
  }) : null, Dt = n ? ft(et, Z) : null, Gt = (B, [j, K]) => {
    const [_, T] = S(B, j, K);
    return ot(_, T) ? [_, T] : ft(_, T, 24);
  };
  for (let B = 0; B < s; B++) {
    dt.forEach((_, T) => {
      if (de) {
        const [xt, Ct] = S(B, de[T].casa[0], de[T].casa[1]);
        St.push({ kind: _.kind, x: xt + 0.5, z: Ct + 0.5, r: _.r, spots: de[T].spots.map((kt) => Gt(B, kt)) });
        return;
      }
      const [E, N] = ct(_), [D, G] = S(B, E, N), at = [];
      for (let xt = 0; xt < _.n; xt++) {
        const [Ct, kt] = q[xt % q.length], [Yt, Jt] = S(B, E + Ct, N + kt);
        at.push(ft(Yt, Jt));
      }
      St.push({ kind: _.kind, x: D + 0.5, z: G + 0.5, r: _.r, spots: at });
    });
    const [j, K] = Dt ? Gt(B, Dt) : ft(...S(B, et, Z));
    for (let _ = -4; _ <= 4; _++) for (let T = -4; T <= 4; T++) {
      const E = (K + _) * o + j + T;
      E >= 0 && E < o * o && (I[E] = 0, C[E] = 0);
    }
    Wt.push({ x: j, z: K, player: B });
  }
  const Et = me();
  return { size: o, seed: e, players: s, versao: a, trilhas: Et, hn: d, hstep: l, heights: c, terrain: P, tree: I, wood: C, res: w, starts: F, herds: St, camps: Wt };
  function me() {
    const B = o * o, j = 1073741823, K = [1, -1, 0, 0, 1, 1, -1, -1], _ = [0, 0, 1, -1, 1, -1, 1, -1], T = new Uint8Array(B);
    for (const Q of w) T[Q.z * o + Q.x] = 1;
    const E = new Int32Array(B), N = new Int32Array(B), D = new Int32Array(B), G = new Float64Array(8 * B + 8), at = (Q) => {
      for (let nt = 0; nt < o; nt++) for (let st = 0; st < o; st++) {
        const vt = nt * o + st, Pt = P[vt];
        if (st < 2 || nt < 2 || st >= o - 2 || nt >= o - 2 || Pt === Ta || T[vt]) {
          E[vt] = -1;
          continue;
        }
        if (Pt === Ma || Pt === ea) {
          E[vt] = Q;
          continue;
        }
        let It = 10 + Math.floor(_a(st * 0.13, nt * 0.13, e + 91, 2) * 24);
        I[vt] && (It += 60);
        const qt = x(st + 0.5, nt + 0.5);
        qt > 4 && (It += Math.floor((qt - 4) * 30)), !n && A(st, nt) && (It += 300), E[vt] = It;
      }
    }, xt = (Q, nt) => {
      N.fill(j), D.fill(-1);
      let st = 0;
      const vt = (Pt) => {
        let It = st++;
        for (; It > 0; ) {
          const qt = It - 1 >> 1;
          if (G[qt] <= Pt) break;
          G[It] = G[qt], It = qt;
        }
        G[It] = Pt;
      };
      for (N[Q] = 0, vt(Q); st; ) {
        const Pt = G[0], It = G[--st];
        if (st) {
          let Zt = 0;
          for (; ; ) {
            const Ye = 2 * Zt + 1;
            if (Ye >= st) break;
            const ls = Ye + 1, ia = ls < st && G[ls] < G[Ye] ? ls : Ye;
            if (G[ia] >= It) break;
            G[Zt] = G[ia], Zt = ia;
          }
          G[Zt] = It;
        }
        const qt = Pt % 65536, he = (Pt - qt) / 65536;
        if (he > N[qt]) continue;
        if (nt && nt[qt]) return qt;
        const qe = qt % o, Ut = (qt - qe) / o;
        for (let Zt = 0; Zt < 8; Zt++) {
          const Ye = qe + K[Zt], ls = Ut + _[Zt], ia = ls * o + Ye, vi = E[ia];
          if (vi < 0 || Zt >= 4 && (E[Ut * o + Ye] < 0 || E[ls * o + qe] < 0)) continue;
          const yi = he + (Zt >= 4 ? Math.floor(vi * 14 / 10) : vi);
          yi < N[ia] && (N[ia] = yi, D[ia] = qt, vt(yi * 65536 + ia));
        }
      }
      return -1;
    }, Ct = (Q) => {
      let nt = -1, st = j;
      for (const vt of Q) vt >= 0 && vt < B && N[vt] < st && (st = N[vt], nt = vt);
      return nt;
    }, kt = (Q, nt) => K.map((st, vt) => (nt + _[vt]) * o + Q + st), Yt = (Q, nt, st) => {
      for (let vt = 0; vt <= 8; vt++) for (let Pt = -vt; Pt <= vt; Pt++) for (let It = -vt; It <= vt; It++) {
        if (Math.max(Math.abs(It), Math.abs(Pt)) !== vt) continue;
        const qt = Q + It, he = nt + Pt;
        if (qt >= 0 && he >= 0 && qt < o && he < o && st(he * o + qt)) return he * o + qt;
      }
      return -1;
    }, Jt = (Q, nt) => {
      let st = 0, vt = 1 / 0;
      return F.forEach((Pt, It) => {
        const qt = (Pt.x - Q) * (Pt.x - Q) + (Pt.z - nt) * (Pt.z - nt);
        qt < vt && (vt = qt, st = It);
      }), st;
    };
    at(-1), xt(R.z * o + R.x);
    const ge = [];
    for (const [Q, nt] of [[1, 0], [2 * p * p - 1, 2 * p * v]]) for (const st of k)
      ge.push(Yt(Math.floor(i + Q * st), Math.floor(i + nt * st), (vt) => P[vt] === Pa && N[vt] < j));
    for (const Q of w) Jt(Q.x, Q.z) === 0 && ge.push(Ct(kt(Q.x, Q.z)));
    ge.push(Yt(Wt[0].x, Wt[0].z, (Q) => N[Q] < j));
    for (let Q = 0; Q < dt.length; Q++) ge.push(Ct(St[Q].spots.flatMap(([nt, st]) => kt(nt, st))));
    const ie = ge.filter((Q) => Q >= 0 && N[Q] < j).sort((Q, nt) => N[Q] - N[nt] || Q - nt), co = new Uint8Array(B);
    co[R.z * o + R.x] = 1;
    const Nn = [];
    for (const Q of ie) {
      if (co[Q]) continue;
      const nt = xt(Q, co);
      if (!(nt < 0))
        for (let st = nt; st >= 0; st = D[st])
          co[st] = 1, Nn.push(st);
    }
    const mi = new Uint8Array(B);
    for (const Q of Nn) {
      const nt = Q % o, st = (Q - nt) / o;
      for (let vt = 0; vt < s; vt++) {
        const [Pt, It] = S(vt, nt, st);
        Pt >= 0 && It >= 0 && Pt < o && It < o && (mi[It * o + Pt] = 1);
      }
    }
    const Es = new Uint8Array(B).fill(255), rs = new Int32Array(B);
    let Fn = 0, gi = 0;
    for (let Q = 0; Q < B; Q++) mi[Q] && (Es[Q] = 0, rs[gi++] = Q);
    for (; Fn < gi; ) {
      const Q = rs[Fn++], nt = Es[Q];
      if (nt >= Un) continue;
      const st = Q % o, vt = (Q - st) / o;
      for (let Pt = 0; Pt < 8; Pt++) {
        const It = st + K[Pt], qt = vt + _[Pt];
        if (It < 0 || qt < 0 || It >= o || qt >= o) continue;
        const he = qt * o + It;
        Es[he] > nt + 1 && (Es[he] = nt + 1, rs[gi++] = he);
      }
    }
    for (let Q = 0; Q < B; Q++) {
      const nt = Es[Q];
      if (!I[Q] || nt > Un) continue;
      const st = Q % o, vt = (Q - st) / o, [Pt, It] = xi(st + 0.5 - i, vt + 0.5 - i, s);
      (nt <= 1 || Aa(Math.round(Pt * 2), Math.round(It * 2), e + 93) < 0.45) && (I[Q] = 0, C[Q] = 0);
    }
    const bi = (Q) => !zs(P[Q]) && !I[Q] && !T[Q], Is = new Uint8Array(B), cc = (Q) => {
      Is.fill(0);
      let nt = 0, st = 0;
      for (Is[Q] = 1, rs[st++] = Q; nt < st; ) {
        const vt = rs[nt++], Pt = vt % o, It = (vt - Pt) / o;
        for (let qt = 0; qt < 8; qt++) {
          const he = Pt + K[qt], qe = It + _[qt];
          if (he < 1 || qe < 1 || he >= o - 1 || qe >= o - 1) continue;
          const Ut = qe * o + he;
          Is[Ut] || !bi(Ut) || qt >= 4 && (!bi(It * o + he) || !bi(qe * o + Pt)) || (Is[Ut] = 1, rs[st++] = Ut);
        }
      }
    }, dc = (Q) => {
      for (let nt = Q; nt >= 0; nt = D[nt]) {
        (P[nt] === Ma || P[nt] === ea) && (P[nt] = xa);
        for (const st of [nt, nt - 1, nt + 1, nt - o, nt + o]) st >= 0 && st < B && I[st] && (I[st] = 0, C[st] = 0);
      }
    };
    for (let Q = 0; Q < 3; Q++) {
      let nt = !1;
      for (let st = 0; st < s; st++) {
        const vt = F[st], Pt = vt.z * o + vt.x, It = F[(st + 1) % s];
        cc(Pt);
        const qt = [[It.z * o + It.x], [Wt[st].z * o + Wt[st].x]], he = (Ut) => Ut >= 0 && Ut < B && P[Ut] !== Ta && !T[Ut];
        for (const Ut of w) Jt(Ut.x, Ut.z) === st && qt.push(kt(Ut.x, Ut.z).filter(he));
        for (const Ut of St) Jt(Ut.x, Ut.z) === st && qt.push(Ut.spots.flatMap(([Zt, Ye]) => [Ye * o + Zt, ...kt(Zt, Ye)]).filter(he));
        const qe = qt.filter((Ut) => !Ut.some((Zt) => Is[Zt]));
        if (qe.length) {
          nt = !0, at(Q ? 500 : -1), xt(Pt), globalThis.__trilhaLog?.push(`volta ${Q} jogador ${st}: ${qe.map((Ut) => Ut.slice(0, 1).map((Zt) => `${Zt % o},${(Zt - Zt % o) / o}`).join("")).join(" | ")}`);
          for (const Ut of qe) {
            const Zt = Ct(Ut);
            Zt >= 0 && dc(Zt);
          }
        }
      }
      if (!nt) break;
    }
    return mi;
  }
}
function zt(e, t, a) {
  const s = bs(t / e.hstep, 0, e.hn - 1.001), o = bs(a / e.hstep, 0, e.hn - 1.001), i = Math.floor(s), n = Math.floor(o), r = s - i, l = o - n, d = e.hn, c = e.heights, h = c[n * d + i], f = c[n * d + i + 1], u = c[(n + 1) * d + i], p = c[(n + 1) * d + i + 1];
  return r + l <= 1 ? h + (f - h) * r + (u - h) * l : p + (u - p) * (1 - r) + (f - p) * (1 - l);
}
const Yc = ["food", "wood", "stone", "metal", "coins"], As = (e) => e.season === 3, oe = (e, t, a, s, o) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: a, x: s, z: o });
};
function Jc(e) {
  Ad(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const a = e.kind[t];
    a >= ut ? kd(e, t) : a < Tt && (e.owner[t] === Rt ? yd(e, t) : Zc(e, t));
  }
  bd(e), Sd(e), $d(e), e.tick % 50 === 25 && Pd(e);
}
const hi = (e, t) => e.tick < e.firme[t], I0 = (e, t) => t === ze || !!e.players[t]?.ai;
function Zc(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, (e.tick + t) % 20 === 0 && e.festaDe(e.owner[t]) === "cura" && e.hp[t] < X[e.kind[t]].hp && e.hp[t]++, e.kind[t] === mt.villager && (e.tick + t) % 5 === 0 && ed(e, t), e.foodMode[t] && ud(e, t), e.task[t]) {
    case Xt:
      rd(e, t);
      break;
    case le:
      fd(e, t);
      break;
    case Vt:
      L0(e, t);
      break;
    case Ss:
      od(e, t);
      break;
    case ts:
      break;
    // correndo (a vigia cuida)
    default:
      sd(e, t);
  }
}
const Ui = 16, Qc = 4;
function td(e, t) {
  const a = e.owner[t];
  let s = 0, o = 0, i = 0;
  return e.near(e.x[t], e.z[t], X[e.kind[t]].sight, (n) => {
    const r = e.owner[n];
    if (!e.isUnit(n) || r === Rt || e.kind[n] === mt.villager || X[e.kind[n]].siege || !e.hostile(a, r) || !X[e.kind[n]].proj && e.muroNaLinha(e.x[n], e.z[n], e.x[t], e.z[t], r)) return;
    const l = e.x[t] - e.x[n], d = e.z[t] - e.z[n], c = ha(l * l + d * d) || 1;
    s += Be(l * J, c), o += Be(d * J, c), i++;
  }), i ? [s, o] : null;
}
function ed(e, t) {
  const a = e.task[t] === ts;
  if (hi(e, t)) {
    a && Hn(e, t);
    return;
  }
  const s = td(e, t);
  if (!s) {
    a && ++e.fails[t] >= Qc && Hn(e, t);
    return;
  }
  if (!a) {
    const o = e.task[t] === _t;
    if (e.fugaDe[t] = e.task[t] + 1 + (o ? Ui : 0), o) {
      const n = e.state[t] === ce;
      e.amx[t] = n ? e.slotX[t] : e.x[t], e.amz[t] = n ? e.slotZ[t] : e.z[t];
    }
    e.task[t] = ts, e.alvo2[t] = -1;
    const i = e.owner[t];
    e.players[i] && e.tick - (e.avisoFuga[i] ?? -1e9) > 300 && (e.avisoFuga[i] = e.tick, oe(e, i, "fuga", e.x[t], e.z[t]));
  }
  e.fails[t] = 0, (!a || e.state[t] === Lt || (e.tick + t) % 20 === 0) && ad(e, t, s);
}
function ad(e, t, [a, s]) {
  const o = ha(a * a + s * s), i = ui(e, t);
  if (i >= 0 && e.reach(t, i, !1) > 2 * J && (o === 0 || (e.x[i] - e.x[t]) * a + (e.z[i] - e.z[t]) * s > 0)) {
    e.goNear(t, i, !1);
    return;
  }
  if (o === 0) return;
  const n = e.size * J - 1;
  e.goPoint(t, Math.min(n, Math.max(0, e.x[t] + Be(a * 7 * J, o))), Math.min(n, Math.max(0, e.z[t] + Be(s * 7 * J, o))));
}
function Hn(e, t) {
  const a = e.fugaDe[t], s = (a & Ui - 1) - 1;
  if (e.fugaDe[t] = 0, e.fails[t] = 0, e.task[t] === ts && (e.task[t] = s >= 0 && s !== ts ? s : _t, e.state[t] = Lt, e.path[t] = null, e.field[t] = null, e.task[t] === _t && a & Ui)) {
    const o = e.amx[t] - e.x[t], i = e.amz[t] - e.z[t];
    o * o + i * i > J * J && e.goPoint(t, e.amx[t], e.amz[t]);
  }
}
const vs = 0, q0 = 1, O0 = 2, w0 = 3;
function R0(e, t, a) {
  return X[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === a;
}
function Hi(e, t, a) {
  return e.isBuilding(a) ? X[e.kind[t]].siege ? vs : O0 : e.owner[a] === Rt ? R0(e, a, e.owner[t]) ? vs : w0 : e.kind[a] === mt.villager ? q0 : vs;
}
function An(e, t, a, s = !1, o = w0) {
  const i = e.owner[t], n = X[e.kind[t]].siege;
  let r = -1, l = 99, d = 1 / 0;
  const c = (f, u) => {
    if (u >= o || u > l) return;
    const p = e.x[f] - e.x[t], v = e.z[f] - e.z[t], y = p * p + v * v;
    (u < l || y < d) && (l = u, d = y, r = f);
  };
  n || e.near(e.x[t], e.z[t], a, (f) => {
    if (f === t || !e.isUnit(f) || e.ignoreT[t] === f && e.tick < e.ignoreUntil[t]) return;
    const u = e.owner[f];
    (u === Rt ? !R0(e, f, i) : !e.hostile(i, u)) || c(f, u !== Rt && e.kind[f] === mt.villager ? q0 : vs);
  });
  const h = n ? vs : O0;
  if ((s || n) && h < o && l > h) {
    const f = (a * J) ** 2;
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.hostile(i, e.owner[u]) && !e.bdef(u).wall && !e.bdef(u).estrada && !(e.ignoreT[t] === u && e.tick < e.ignoreUntil[t])) {
      const p = e.x[u] - e.x[t], v = e.z[u] - e.z[t];
      p * p + v * v < f && c(u, h);
    }
  }
  return r;
}
function B0(e, t, a) {
  const s = e.state[t] === ce;
  s && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = Vt, e.tgt[t] = a, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = s ? 10 : 8;
}
function sd(e, t) {
  if (e.kind[t] === mt.villager || (e.tick + t) % 5 || hi(e, t)) return;
  const a = An(e, t, X[e.kind[t]].sight, e.state[t] !== ce);
  a >= 0 && B0(e, t, a);
}
function od(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const a = An(e, t, X[e.kind[t]].sight, !0);
    if (a >= 0) {
      e.task[t] = Vt, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === Lt) {
    const a = e.amx[t] - e.x[t], s = e.amz[t] - e.z[t];
    if (a * a + s * s > (3 * J) ** 2 && e.fails[t]++ < 6) {
      if (e.goPoint(t, e.amx[t], e.amz[t]), e.lastPartial && !e.overBudget && I0(e, e.owner[t]) && !X[e.kind[t]].proj) {
        const o = e.amx[t] >> 8, i = e.amz[t] >> 8, n = e.muroNoCaminho(t, o, i, o, i);
        n >= 0 && (e.task[t] = Vt, e.tgt[t] = n, e.phase[t] = 9, e.fails[t] = 0, e.goNear(t, n, !1));
      } else if (e.lastPartial && !e.overBudget) {
        const o = e.amx[t] >> 8, i = e.amz[t] >> 8;
        D0(e, t, () => e.muroNoCaminho(t, o, i, o, i));
      }
    } else e.task[t] = _t;
  }
}
function D0(e, t, a) {
  const s = e.owner[t];
  if (s < 0 || s >= e.players.length || e.players[s].ai || e.kind[t] === mt.villager || X[e.kind[t]].proj || e.tick - (e.avisoMuroInimigo[s] ?? -1e9) < 600) return;
  const o = a();
  o < 0 || (e.avisoMuroInimigo[s] = e.tick, oe(e, s, "muroInimigo", e.x[o], e.z[o]));
}
function Wn(e, t, a) {
  if (e.isBuilding(a)) {
    const [i, n, r] = e.footprint(a);
    return e.muroNoCaminho(t, i - 1, n - 1, i + r, n + r);
  }
  const s = e.x[a] >> 8, o = e.z[a] >> 8;
  return e.muroNoCaminho(t, s - 1, o - 1, s + 1, o + 1);
}
function id(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function Wi(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.tgtTile[t] ? id(e, a) : e.alive[a] ? e.kind[a] === Tt ? e.work[a] > 0 : e.isBuilding(a) && e.done[a] === 1 && e.bdef(a).key === "farm" && e.owner[a] === e.owner[t] : !1;
}
function Gi(e, t, a = -1) {
  let s = e.tgt[t];
  const o = e.size;
  if (s < -1 && (s = -1 - s), !e.tgtTile[t] && a < 0 && s >= 0 && (a = s), e.tgtTile[t] && s >= 0 && s < o * o) {
    const i = e.carryRes[t], n = e.map.tree[s] > 0 || i === Hs, r = e.resKind[s] || (i === es ? xe : i === Jo ? Xe : i === Zo ? Ie : i === Ts ? Ae : 0), l = s % o, d = (s - l) / o;
    for (const [c, h] of as) {
      if (c * c + h * h > 100) break;
      const f = l + c, u = d + h;
      if (f < 0 || u < 0 || f >= o || u >= o) continue;
      const p = u * o + f;
      if (!(p === a || !e.open(p)) && (n ? e.map.tree[p] && e.resAmt[p] > 0 : r && e.resKind[p] === r && e.resAmt[p] > 0))
        return e.tgt[t] = p, e.tgtTile[t] = 1, e.phase[t] = Ke, e.fails[t] = 0, e.goNear(t, p, !0), !0;
    }
  } else if (s >= 0 && e.kind[s] === Tt || e.carryRes[t] === es) {
    let i = -1, n = (10 * J) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== a && e.alive[r] && e.kind[r] === Tt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], d = e.z[r] - e.z[t], c = l * l + d * d;
      c < n && (n = c, i = r);
    }
    if (i >= 0)
      return e.tgt[t] = i, e.tgtTile[t] = 0, e.phase[t] = Ke, e.goNear(t, i, !1), !0;
  }
  return !1;
}
function ui(e, t) {
  const a = e.owner[t];
  let s = -1, o = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === a && e.done[i] && e.bdef(i).drop) {
    const n = e.x[i] - e.x[t], r = e.z[i] - e.z[t], l = n * n + r * r;
    l < o && (o = l, s = i);
  }
  return s;
}
function Bo(e, t) {
  const a = ui(e, t);
  if (e.dropB[t] = a, a < 0) {
    e.task[t] = _t;
    return;
  }
  e.phase[t] = io, e.fails[t] = 0, e.goNear(t, a, !1);
}
function nd(e, t, a) {
  const s = e.tgt[t];
  let o;
  a ? o = Ba.farm : e.tgtTile[t] ? e.map.tree[s] ? o = Ba.wood : o = e.resKind[s] === xe ? Ba.berry : e.resKind[s] === Xe ? Ba.stone : e.resKind[s] === Ae ? Ba.silver : Ba.metal : o = Ba.carcass;
  let i = Math.round(o * 1e3);
  return a && e.festaDe(e.owner[t]) === "campos" && (i = Math.floor(i * 5 / 4)), e.beta && (i = Math.floor(i * jn[Math.min(e.players[e.owner[t]]?.era ?? 0, jn.length - 1)] / 100)), e.players[e.owner[t]]?.hunger && (i = Math.floor(i * 7 / 10)), e.players[e.owner[t]]?.ai && (i = Math.floor(i * [80, 100, 115][e.difficulty] / 100)), i;
}
function rd(e, t) {
  if (e.phase[t] === io) {
    cd(e, t);
    return;
  }
  if (!Wi(e, t)) {
    e.carry[t] > 0 ? Bo(e, t) : Gi(e, t) || (e.task[t] = _t);
    return;
  }
  const a = e.tgt[t], s = e.tgtTile[t] === 1, o = !s && e.kind[a] >= ut, i = e.reach(t, a, s);
  if (e.phase[t] === Ke) {
    if (i <= (o ? 60 : s ? 330 : 220))
      e.phase[t] = K0, e.state[t] = Lt, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === Lt && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, a, s) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - a, Gi(e, t, a) || (e.task[t] = _t);
      }
    }
    return;
  }
  if (i > (o ? 140 : s ? 420 : 300)) {
    e.phase[t] = Ke, e.goNear(t, a, s);
    return;
  }
  if (o && As(e)) return;
  if (s && e.resKind[a] === xe && As(e)) {
    e.carry[t] > 0 ? Bo(e, t) : e.task[t] = _t;
    return;
  }
  const n = s ? e.map.tree[a] ? Hs : e.resKind[a] === xe ? es : e.resKind[a] === Xe ? Jo : e.resKind[a] === Ae ? Ts : Zo : es;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += nd(e, t, o);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = o ? 1e9 : s ? e.resAmt[a] : e.work[a], d = e.carryCap(t);
  r = Math.min(r, l, d - e.carry[t]), r > 0 && (e.carry[t] += r, o || (s ? e.resAmt[a] -= r : e.work[a] -= r, (s ? e.resAmt[a] : e.work[a]) <= 0 && ld(e, a, s))), (e.carry[t] >= d || !Wi(e, t) && e.carry[t] > 0) && Bo(e, t);
}
function ld(e, t, a) {
  if (!a) {
    e.remove(t);
    return;
  }
  const s = zs(e.map.terrain[t]) ? 1 : 0;
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, s), e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, s), e.events.push({ t: "res", k: t });
}
function Xo(e, t, a, s) {
  var i;
  const o = (i = e.obtido)[t] ?? (i[t] = [0, 0, 0, 0, 0]);
  o[a] = (o[a] ?? 0) + s;
}
function cd(e, t) {
  let a = e.dropB[t];
  if (a < 0 || !e.isBuilding(a) || !e.done[a] || e.owner[a] !== e.owner[t]) {
    if (a = ui(e, t), e.dropB[t] = a, a < 0) {
      e.task[t] = _t;
      return;
    }
    e.goNear(t, a, !1);
  }
  if (e.reach(t, a, !1) <= 200) {
    const s = e.players[e.owner[t]];
    if (s && (s.res[Yc[e.carryRes[t]]] += e.carry[t], Xo(e, s.id, e.carryRes[t], e.carry[t])), e.carry[t] = 0, e.state[t] = Lt, e.path[t] = null, e.foodMode[t] && !F0(e, t)) {
      const o = Ki(e, t);
      if (o) {
        Xi(e, t, o);
        return;
      }
    }
    Wi(e, t) ? (e.phase[t] = Ke, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : Gi(e, t) || (e.task[t] = _t);
    return;
  }
  e.state[t] === Lt && (++e.fails[t] > 5 ? e.task[t] = _t : e.goNear(t, a, !1));
}
const dd = 30, Gn = 0, hd = 1, Vi = 2, N0 = 3;
function F0(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.task[t] === Vt ? e.isAnimal(a) && (X[e.kind[a]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[a] === xe && e.resAmt[a] > 0 && !As(e) : e.alive[a] ? e.kind[a] === Tt ? e.work[a] > 0 : e.isBuilding(a) && e.bdef(a).key === "farm" && !As(e) : !1;
}
function Ki(e, t) {
  const a = e.owner[t], s = As(e), o = e.size, i = ui(e, t), n = i >= 0 ? e.x[i] : e.x[t], r = i >= 0 ? e.z[i] : e.z[t], l = (dd * J) ** 2, d = (y, k) => {
    const M = y - n, x = k - r;
    return M * M + x * x <= l;
  }, c = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
  for (let y = 0; y < e.top; y++) if (y !== t && e.isUnit(y) && e.owner[y] === a && e.kind[y] === mt.villager && e.tgt[y] >= 0 && (e.task[y] === Xt || e.task[y] === Vt)) {
    const k = e.task[y] === Xt && e.tgtTile[y] ? h : c;
    k.set(e.tgt[y], (k.get(e.tgt[y]) ?? 0) + 1);
  }
  let f = -1, u = 1 / 0, p = Gn;
  const v = (y, k, M, x) => {
    const z = k - e.x[t], A = M - e.z[t], $ = z * z + A * A;
    $ < u && (u = $, f = y, p = x);
  };
  for (let y = 0; y < e.top; y++) e.alive[y] && e.kind[y] === Tt && e.work[y] > 0 && (c.get(y) ?? 0) < 4 && d(e.x[y], e.z[y]) && v(y, e.x[y], e.z[y], Gn);
  if (f >= 0) return { t: f, how: p };
  if (!s) {
    for (let y = 0; y < e.top; y++) e.isBuilding(y) && e.owner[y] === a && e.done[y] && e.bdef(y).key === "farm" && !c.has(y) && v(y, e.x[y], e.z[y], hd);
    if (f >= 0) return { t: f, how: p };
    for (const y of e.map.res) {
      const k = y.z * o + y.x;
      if (e.resKind[k] !== xe || e.resAmt[k] <= 0 || (h.get(k) ?? 0) >= 2 || !e.open(k)) continue;
      const M = y.x * J + 128, x = y.z * J + 128;
      d(M, x) && v(k, M, x, Vi);
    }
    if (f >= 0) return { t: f, how: p };
  }
  for (let y = 0; y < e.top; y++) e.isAnimal(y) && X[e.kind[y]].animal.mode === "flee" && (c.get(y) ?? 0) < 2 && d(e.x[y], e.z[y]) && v(y, e.x[y], e.z[y], N0);
  return f >= 0 ? { t: f, how: p } : null;
}
function Xi(e, t, a) {
  if (e.fails[t] = 0, e.phase[t] = Ke, e.tgt[t] = a.t, a.how === N0) {
    e.task[t] = Vt, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, a.t, !1);
    return;
  }
  e.task[t] = Xt, e.tgtTile[t] = a.how === Vi ? 1 : 0, e.goNear(t, a.t, a.how === Vi);
}
function ud(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const a = e.task[t];
  if (a === _t) {
    if (e.state[t] === Lt) {
      const o = Ki(e, t);
      o && Xi(e, t, o);
    }
    return;
  }
  if (a !== Xt || e.phase[t] === io || F0(e, t)) return;
  const s = Ki(e, t);
  s && (e.carry[t] > 0 && e.carryRes[t] !== es ? Bo(e, t) : Xi(e, t, s));
}
function fd(e, t) {
  const a = e.tgt[t];
  if (!e.isBuilding(a) || e.owner[a] !== e.owner[t]) {
    e.task[t] = _t;
    return;
  }
  if (e.done[a]) {
    if (e.bdef(a).key === "farm" && !md(e, a, t))
      e.task[t] = Xt, e.phase[t] = Ke, e.goNear(t, a, !1);
    else if (e.bdef(a).wall || e.bdef(a).estrada) {
      const r = pd(e, t, a);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = _t;
    } else e.task[t] = _t;
    return;
  }
  if (e.reach(t, a, !1) > 230) {
    e.state[t] === Lt && (++e.fails[t] > 5 ? e.task[t] = _t : e.goNear(t, a, !1));
    return;
  }
  if (e.state[t] = Lt, e.path[t] = null, e.fails[t] = 0, e.aPagar[a]) {
    const r = e.owner[a], l = e.players[r], d = e.bdef(a).cost;
    if (!l || !e.canAfford(r, d)) {
      const c = Object.keys(d).find((h) => (l?.res[h] ?? 0) < (d[h] ?? 0) * 100) ?? "wood";
      l && e.tick - (e.avisoMuro[r] ?? -1e9) > 300 && (e.avisoMuro[r] = e.tick, oe(e, r, (e.bdef(a).estrada ? "estradaFalta." : "muroFalta.") + c, e.x[a], e.z[a]));
      return;
    }
    e.pay(r, d), e.aPagar[a] = 0;
  }
  const s = (e.tick & 16383) + 1, o = e.tmr[a] !== s;
  e.tmr[a] = s, e.work[a] += e.festaDe(e.owner[a]) === "obra" ? o ? 15 : 9 : o ? 10 : 6;
  const i = e.bdef(a), n = i.time * 100;
  e.hp[a] = Math.max(e.hp[a], Math.floor(i.hp * Math.min(1, e.work[a] / n))), e.work[a] >= n && (e.done[a] = 1, e.hp[a] = i.hp, e.work[a] = 0, e.events.push({ t: "built", e: a }), i.wall ? e.muroPronto(a) : i.estrada ? e.estrada[(e.z[a] >> 8) * e.size + (e.x[a] >> 8)] = 1 : oe(e, e.owner[a], "built." + i.key, e.x[a], e.z[a]));
}
function pd(e, t, a) {
  let s = -1, o = (30 * J) ** 2;
  const i = !!e.bdef(a).estrada;
  for (let n = 0; n < e.top; n++) if (e.isBuilding(n) && !e.done[n] && e.owner[n] === e.owner[t] && (i ? e.bdef(n).estrada : e.bdef(n).wall)) {
    const r = e.x[n] - e.x[a], l = e.z[n] - e.z[a], d = r * r + l * l;
    d < o && (o = d, s = n);
  }
  return s;
}
function md(e, t, a) {
  for (let s = 0; s < e.top; s++) if (s !== a && e.isUnit(s) && e.task[s] === Xt && e.tgt[s] === t && !e.tgtTile[s]) return !0;
  return !1;
}
function L0(e, t) {
  let a = e.tgt[t];
  if (a < 0 || !e.alive[a] || a === t || e.kind[a] === Tt || e.isUnit(a) && e.owner[a] === e.owner[t]) {
    Vn(e, t);
    return;
  }
  const s = X[e.kind[t]], o = e.kind[t] === mt.villager;
  if (!o && e.owner[t] !== Rt && (e.tick + t) % 5 === 0 && !hi(e, t) && !(e.isBuilding(a) && e.bdef(a).wall)) {
    const d = Hi(e, t, a);
    if (d > vs) {
      const c = An(e, t, s.sight, !1, d);
      c >= 0 && (e.tgt[t] = a = c, e.fails[t] = 0);
    }
  }
  o && (e.amx[t] = e.x[a], e.amz[t] = e.z[a]);
  const i = s.hunt && e.owner[a] === Rt, n = Math.round((i ? s.hunt : s.range) * J), r = e.reach(t, a, !1), l = !s.proj && !i && e.isUnit(a) && e.muroNoMeio(e.x[t], e.z[t], e.x[a], e.z[a]);
  if (r <= n + 40 && !l) {
    e.fails[t] = 0, e.state[t] === ce && (e.state[t] = Lt, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (gd(e, t, a), e.cd[t] = s.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== Rt) {
    const d = e.x[t] - e.rallyX[t], c = e.z[t] - e.rallyZ[t];
    if (d * d + c * c > (12 * J) ** 2) {
      e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 100, e.task[t] = _t, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === Lt && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 300, Vn(e, t);
      return;
    }
    if (e.owner[t] === Rt) {
      const d = e.map.herds[e.herd[t]];
      if (d) {
        const c = d.x * J - e.x[t], h = d.z * J - e.z[t];
        if (c * c + h * h > (16 * J) ** 2) {
          e.task[t] = _t, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, d.x * J, d.z * J);
          return;
        }
      }
    }
    if ((s.proj || i) && r <= n + J * 2 && e.state[t] === Lt) {
      e.goPoint(t, e.x[a], e.z[a]), e.fails[t]++;
      return;
    }
    if (!e.goNear(t, a, !1) || e.lastPartial) {
      if (!o && e.owner[t] !== Rt && !e.overBudget) {
        if (s.proj) {
          !e.path[t] && !e.field[t] && e.goPoint(t, e.x[a], e.z[a]), e.fails[t]++;
          return;
        }
        if (I0(e, e.owner[t])) {
          const d = Wn(e, t, a);
          if (d >= 0 && d !== a) {
            e.alvo2[t] = a, e.tgt[t] = d, e.fails[t] = 0, e.goNear(t, d, !1);
            return;
          }
        } else D0(e, t, () => Wn(e, t, a));
      }
      e.fails[t] += 3;
    } else e.fails[t]++;
  }
}
function Vn(e, t) {
  const a = e.alvo2[t];
  if (a >= 0 && (e.alvo2[t] = -1, e.alive[a] && e.kind[a] !== Tt && a !== t && (e.owner[a] === Rt || e.hostile(e.owner[t], e.owner[a])))) {
    e.tgt[t] = a, e.fails[t] = 0;
    return;
  }
  if (e.kind[t] === mt.villager) {
    let o = -1, i = (3 * J) ** 2;
    for (let n = 0; n < e.top; n++) if (e.alive[n] && e.kind[n] === Tt) {
      const r = e.x[n] - e.amx[t], l = e.z[n] - e.amz[t], d = r * r + l * l;
      d < i && (i = d, o = n);
    }
    if (o >= 0) {
      e.task[t] = Xt, e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = Ke, e.goNear(t, o, !1);
      return;
    }
  }
  const s = e.phase[t];
  if (s === 9 && e.owner[t] !== Rt) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = Ss, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = _t, e.tgt[t] = -1, e.phase[t] = 0, s === 10 && e.owner[t] !== Rt ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = Lt, e.path[t] = null, e.field[t] = null);
}
function gd(e, t, a) {
  const s = X[e.kind[t]];
  if (s.siege && !e.isBuilding(a)) return;
  let o = e.atkOf(t);
  if (e.isUnit(a)) {
    const n = X[e.kind[a]];
    o -= e.armorOf(a);
    for (const r of s.bonus ?? []) n.cls === r.vs && (o += r.dmg);
  }
  e.beta && e.soldier(t) && (o = Math.floor((o * Wc + 50) / 100)), e.isBuilding(a) && e.bdef(a).wall && (o = Math.floor((o * (s.muro ?? 100) + 50) / 100)), o = Math.max(1, o);
  const i = s.proj ?? (s.hunt && e.owner[a] === Rt ? "spear" : void 0);
  if (i) {
    const n = e.x[a] - e.x[t], r = e.z[a] - e.z[t], l = ha(n * n + r * r), d = Math.max(3, Math.round(l / J));
    e.projectiles.push({ target: a, dmg: o, at: e.tick + d, by: t, k: e.kind[a], o: e.owner[a] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[a], z1: e.z[a], ticks: d, kind: i, tk: e.kind[a], gap: e.reach(t, a, !1), te: a });
  } else j0(e, a, o, t);
}
function bd(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const a of e.projectiles) {
    if (a.at > e.tick) {
      t.push(a);
      continue;
    }
    e.alive[a.target] && e.kind[a.target] === a.k && e.owner[a.target] === a.o && j0(e, a.target, a.dmg, a.by);
  }
  e.projectiles = t;
}
function j0(e, t, a, s) {
  e.hp[t] -= a;
  const o = e.owner[t];
  if (o === Rt)
    e.alive[s] && (e.aggro[t] = s + 1);
  else if (e.isUnit(t) && e.alive[s] && !hi(e, t)) {
    const n = e.task[t];
    e.kind[t] === mt.villager ? e.owner[s] === Rt && n !== Vt && (e.task[t] = Vt, e.tgt[t] = s, e.phase[t] = 0) : X[e.kind[t]].siege || (n === _t ? B0(e, t, s) : n === Ss ? (e.task[t] = Vt, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0) : n === Vt && e.isUnit(s) && e.tgt[t] !== s && Hi(e, t, e.tgt[t]) > Hi(e, t, s) && (e.isBuilding(e.tgt[t]) && e.bdef(e.tgt[t]).wall && e.alvo2[t] < 0 && (e.alvo2[t] = e.tgt[t]), e.tgt[t] = s, e.fails[t] = 0));
  }
  const i = e.players[o];
  if (i && e.tick - i.lastAlert > 300 && e.owner[s] !== o && (i.lastAlert = e.tick, oe(e, o, "underAttack", e.x[t], e.z[t])), i && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + a;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && oe(e, o, "centerDanger." + e.owner[s], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && vd(e, t, s);
}
function vd(e, t, a) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const s = X[e.kind[t]].animal;
    s && s.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], s.food);
  } else if (e.isBuilding(t)) {
    const s = e.bdef(t).key, o = e.owner[a];
    if (s === "camp" && o >= 0 && o < e.players.length && (e.players[o].res.food += 2e4, e.players[o].res.wood += 15e3, oe(e, o, "campLoot", e.x[t], e.z[t])), s === "center") {
      const i = e.players[e.owner[t]];
      oe(e, e.owner[t], "centerLost." + e.owner[a]), e.remove(t), i && _0(e, i);
      return;
    }
  }
  e.remove(t);
}
function yd(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const a = X[e.kind[t]], s = a.animal, o = e.map.herds[e.herd[t]];
  if (e.task[t] === Vt) {
    L0(e, t);
    return;
  }
  if (s.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === Lt) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let i = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (i = e.aggro[t] - 1), i >= 0) {
        let n = e.x[t] - e.x[i], r = e.z[t] - e.z[i];
        const l = ha(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * J / l), r = Math.trunc(r * 4 * J / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
        return;
      }
    }
  } else if (s.mode === "fight") {
    if (e.aggro[t] > 0) {
      const i = e.aggro[t] - 1;
      if (e.aggro[t] = 0, e.alive[i] && e.isUnit(i)) {
        e.task[t] = Vt, e.tgt[t] = i, e.fast[t] = 1;
        return;
      }
    }
  } else if ((e.tick + t) % 10 === 0) {
    const i = xd(e, t, a.sight + (e.season === 3 ? 3 : 0));
    if (i >= 0) {
      e.task[t] = Vt, e.tgt[t] = i, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === Lt && o) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const i = Math.max(1, o.r) * J, n = e.rng.int(2 * i + 1) - i, r = e.rng.int(2 * i + 1) - i;
    e.goPoint(t, Math.round(o.x * J) + n, Math.round(o.z * J) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function xd(e, t, a) {
  let s = -1, o = 1 / 0;
  return e.near(e.x[t], e.z[t], a, (i) => {
    if (!e.isUnit(i) || e.owner[i] === Rt) return;
    const n = e.x[i] - e.x[t], r = e.z[i] - e.z[t], l = n * n + r * r;
    l < o && (o = l, s = i);
  }), s;
}
function kd(e, t) {
  if (!e.done[t]) return;
  const a = e.owner[t], s = e.players[a];
  if (!s) return;
  const o = e.bdef(t), i = o.key;
  if (e.queue[t].length && zd(e, t, s), o.tower && Md(e, t, o.tower), i === "pen" && !As(e) && e.tick % 10 === 0) {
    const r = e.festaDe(a) === "curral" ? 40 : 20;
    s.res.food += r, Xo(e, s.id, 0, r);
  }
  const n = o.cura;
  n && e.tick % n.cd === 0 && e.near(e.x[t], e.z[t], n.r, (r) => {
    e.isUnit(r) && e.owner[r] === a && e.hp[r] < X[e.kind[r]].hp && e.hp[r]++;
  }), o.moedas && e.tick % o.moedas === 0 && (s.res.coins += 100, Xo(e, s.id, Ts, 100));
}
function Md(e, t, a) {
  if (e.cd[t] > 0) {
    e.cd[t]--;
    return;
  }
  if ((e.tick + t) % 3) return;
  const s = e.owner[t];
  let o = -1, i = 1 / 0;
  if (e.near(e.x[t], e.z[t], a.range + 1, (c) => {
    if (!e.isUnit(c) || !e.hostile(s, e.owner[c])) return;
    const h = e.reach(t, c, !1);
    h <= a.range * J && h < i && (i = h, o = c);
  }), o < 0) return;
  const n = Math.max(1, a.atk - e.armorOf(o)), r = e.x[o] - e.x[t], l = e.z[o] - e.z[t], d = Math.max(3, Math.round(ha(r * r + l * l) / J));
  e.projectiles.push({ target: o, dmg: n, at: e.tick + d, by: t, k: e.kind[o], o: e.owner[o] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[o], z1: e.z[o], ticks: d, kind: "arrow", tk: e.kind[o], gap: e.reach(t, o, !1), te: o, h: 3.2 }), e.cd[t] = a.cd;
}
function zd(e, t, a) {
  if (a.hunger) return;
  const s = e.queue[t][0];
  if (s >= Se) {
    const x = Ca[s - Se];
    if (++e.work[t] < x.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), a.tech |= 1 << s - Se, oe(e, a.id, "tech." + x.key, e.x[t], e.z[t]);
    return;
  }
  const o = X[s];
  if (e.work[t] === 0 && e.pop(a.id) + o.pop > e.popCap(a.id)) {
    e.tick % 300 === 0 && oe(e, a.id, e.popCap(a.id) >= e.limiteEra(a.era) ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.festaDe(a.id) === "treino" && e.bdef(t).key !== "center" && e.tick % 2 === 0 && e.work[t]++, e.work[t] < o.time * 10) return;
  e.work[t] = 0;
  const i = e.queue[t].shift(), [n, r, l] = e.footprint(t), d = e.size / 2, c = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : d, h = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : d, f = n + l / 2, u = r + l / 2, p = c - f, v = h - u, y = Math.sqrt(p * p + v * v) || 1, k = e.nearestFree(Math.round(f + p / y * (l / 2 + 1)), Math.round(u + v / y * (l / 2 + 1)), a.id);
  if (k < 0) return;
  const M = e.spawnUnit(a.id, X[i].key, k % e.size + 0.5, Math.floor(k / e.size) + 0.5);
  e.events.push({ t: "trained", e: M }), e.rallyX[t] >= 0 && e.goPoint(M, e.rallyX[t], e.rallyZ[t]);
}
function Ad(e) {
  if (e.tick === 0 || e.tick % ve !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const a of e.players) !a.defeated && a.era >= 2 && Td(e, a.id) && oe(e, a.id, "fair");
  for (const a of e.players) e.festaDe(a.id) && oe(e, a.id, "festa." + t);
  if (t === 8) for (const a of e.players) oe(e, a.id, "winterSoon");
  if (t >= 9) {
    for (const a of e.players) {
      if (a.defeated) continue;
      let s = e.pop(a.id) * (a.era <= 1 ? 1 : a.era <= 3 ? 2 : 3) * 100;
      e.festaDe(a.id) === "inverno" && (s = Math.floor(s / 2)), e.comido[a.id] = (e.comido[a.id] ?? 0) + Math.min(s, a.res.food), a.res.food >= s ? (a.res.food -= s, a.hunger && (a.hunger = !1)) : (a.res.food = 0, a.hunger || oe(e, a.id, "hunger"), a.hunger = !0);
    }
    if (t === 9) for (const a of e.players) oe(e, a.id, "winter");
  }
  if (t === 0) for (const a of e.players)
    a.hunger = !1, oe(e, a.id, "spring");
}
function Td(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.done[a] && e.bdef(a).market) return !0;
  return !1;
}
function $d(e) {
  for (const t of e.players) {
    if (t.defeated || t.era < te || t.fundada < 0 || (e.tick - t.fundada) % (Dc * Bc) !== 0) continue;
    const s = e.pop(t.id), o = s * (e.beta ? _c : Nc);
    t.res.coins += o * 100, Xo(e, t.id, Ts, o * 100), oe(e, t.id, `censo.${s}.${o}`);
  }
}
function Sd(e) {
  for (const t of e.players) {
    if (!t.aging) continue;
    if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
      t.aging = 0;
      continue;
    }
    if (--t.aging > 0) continue;
    t.era++;
    const a = (s) => {
      const o = X[s].next;
      return o && X[mt[o]].era <= t.era ? mt[o] : s;
    };
    for (let s = 0; s < e.top; s++) if (e.isUnit(s) && e.owner[s] === t.id) {
      const o = a(e.kind[s]);
      if (o === e.kind[s]) continue;
      e.hp[s] = Math.round(e.hp[s] * X[o].hp / X[e.kind[s]].hp), e.kind[s] = o;
    }
    for (let s = 0; s < e.top; s++) e.isBuilding(s) && e.owner[s] === t.id && (e.queue[s] = e.queue[s].map((o) => o < Se ? a(o) : o));
    e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && oe(e, t.id, "metalSeen"), t.era === te && (t.fundada = e.tick, oe(e, t.id, "fundacao"), oe(e, t.id, "prataSeen"));
  }
}
function _0(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const a of e.players) oe(e, a.id, "defeated." + t.id);
    for (let a = 0; a < e.top; a++) e.alive[a] && e.owner[a] === t.id && e.remove(a);
    U0(e);
  }
}
function Cd(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.bdef(a).key === "center") return !0;
  return !1;
}
function Pd(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !Cd(e, t.id) && _0(e, t);
    U0(e);
  }
}
function U0(e) {
  if (e.outcome !== "playing") return;
  if (e.times) {
    Ed(e, e.times);
    return;
  }
  const t = e.players.filter((a) => !a.ai);
  t.length && t.every((a) => a.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((a) => a.ai).every((a) => a.defeated) && e.players.some((a) => a.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
function Ed(e, t) {
  const a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  if (e.players.forEach((n, r) => {
    n.defeated || a.add(t[r]), n.ai || s.add(t[r]);
  }), !(a.size <= 1 || ![...a].some((n) => s.has(n)))) return;
  e.vencedor = a.size === 1 ? [...a][0] : -1;
  const i = e.players.findIndex((n) => !n.ai);
  e.outcome = i >= 0 && e.vencedor === t[i] ? "victory" : "defeat", e.events.push({ t: "end", result: e.outcome, vencedor: e.vencedor });
}
const Id = [9, 12, 14, 17, 19, 21], Kn = [2, 3, 4, 5, 6, 8], qd = [42, 36, 30], Od = [84, 74, 64], wd = [124, 110, 96], Xn = [
  // Fácil: poucas tropas, ataques pequenos e espaçados, muro só a partir dos Metais
  {
    vill: [12, 22, 28, 32, 36],
    tropa: [3, 8, 12, 16, 20],
    cresce: 10,
    quarteis: [1, 1, 1, 1, 1],
    muroEra: 2,
    construtores: 1,
    muroCada: 900,
    torres: [0, 0, 1, 1, 2],
    maquinas: [0, 0, 1, 1, 1],
    ataque1: 24,
    entre: 10,
    grupoMin: 6,
    grupoMax: 8,
    fica: 0,
    casa: 3,
    recua: 50,
    contra: 30,
    humano: 100
  },
  // Normal
  {
    vill: [15, 26, 32, 36, 40],
    tropa: [5, 14, 22, 28, 34],
    cresce: 6,
    quarteis: [1, 2, 2, 2, 2],
    muroEra: 1,
    construtores: 2,
    muroCada: 400,
    torres: [0, 0, 2, 3, 3],
    maquinas: [0, 0, 2, 2, 3],
    ataque1: 15,
    entre: 6,
    grupoMin: 8,
    grupoMax: 40,
    fica: 20,
    casa: 5,
    recua: 40,
    contra: 85,
    humano: 100
  },
  // Difícil
  {
    vill: [16, 28, 34, 38, 42],
    tropa: [7, 20, 30, 38, 46],
    cresce: 5,
    quarteis: [1, 2, 3, 3, 3],
    muroEra: 1,
    construtores: 3,
    muroCada: 300,
    torres: [0, 0, 3, 4, 4],
    maquinas: [0, 0, 3, 3, 4],
    ataque1: 11,
    entre: 4,
    grupoMin: 10,
    grupoMax: 99,
    fica: 15,
    casa: 6,
    recua: 33,
    contra: 100,
    humano: 60
  }
], Yn = [
  { warrior: 60, hunter: 40 },
  { axeman: 35, spearman: 30, archer: 35 },
  { swordsman: 30, spearman: 20, slinger: 28, horseman: 22 },
  { hoplite: 45, slinger: 25, eques: 30 },
  { hastatus: 30, triarius: 20, velite: 25, eques: 25 }
], Rd = [0, 15, 17, 18, 19], Bd = [0, 11, 12, 13, 14], H0 = [1, -1, 0, 0, 1, 1, -1, -1], W0 = [0, 0, 1, -1, 1, -1, 1, -1], Dd = [[1, 0], [0, 1], [1, 1], [1, -1]], Nd = {};
function Fd(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const a = e.ai[t.id];
    e.tick < a.next || (a.next = e.tick + 10, (Nd[t.id] ?? Ld)(e, t.id, a));
  }
  th(e);
}
function Ld(e, t, a) {
  const s = e.players[t], o = Math.min(s.era, xn), i = Xn[e.difficulty] ?? Xn[1], n = a.vez = (a.vez ?? 0) + 1, r = [], l = [], d = [];
  let c = 0;
  for (let T = 0; T < e.top; T++)
    !e.alive[T] || e.owner[T] !== t || (e.isBuilding(T) ? d.push(T) : e.isUnit(T) && (e.kind[T] === mt.villager ? r.push(T) : (l.push(T), c += X[e.kind[T]].pop)));
  const h = d.find((T) => e.bdef(T).key === "center" && e.done[T]);
  if (h === void 0) return;
  const f = (T) => e.done[T] === 1 || r.some((E) => e.task[E] === le && e.tgt[E] === T), u = (T, E = !1) => d.filter((N) => e.bdef(N).key === T && (!E || e.done[N]) && f(N)), p = r.length + c, v = e.popCap(t), y = d.filter((T) => !e.done[T] && f(T) && !e.bdef(T).wall && !e.bdef(T).estrada), k = e.tick / ve, M = e.beta ? Id : i.vill, x = e.beta ? 0 : qd[e.difficulty], z = e.beta ? 0 : Od[e.difficulty], A = e.beta ? 0 : wd[e.difficulty], $ = (e.beta ? Bd : Rd)[o], P = d.some((T) => e.bdef(T).wall), I = /* @__PURE__ */ new Set();
  for (const T of r) e.task[T] === ts && I.add(T);
  const C = () => r.filter((T) => !I.has(T)), w = (T, E, N) => {
    let D = P && $ - 2 > E ? ki(e, t, T, h, C(), E, Math.min(N, $ - 2)) : -1;
    return D < 0 && (D = ki(e, t, T, h, C(), E, N)), D < 0 && e.beta && (D = ki(e, t, T, h, C(), N, N + 9)), D >= 0 && I.add(D), D >= 0;
  }, F = (T, E, N) => {
    if (a.porta !== void 0 && a.porta >= 0) {
      const D = or(e, t, T, a.porta, C(), 7);
      if (D >= 0)
        return I.add(D), !0;
    }
    return w(T, E, N);
  };
  n % 3 === 1 && _d(e, t, a);
  const V = a.alvo !== void 0 && a.alvo >= 0 && (e.players[a.alvo]?.defeated ?? !0);
  if (!a.onda?.length && (e.tick >= (a.planoT ?? 0) || V) && (Kd(e, t, a, h, i, $, d.filter((T) => e.done[T] && e.bdef(T).key === "depot" && (e.x[T] - e.x[h] >> 8) ** 2 + (e.z[T] - e.z[h] >> 8) ** 2 > 400)), a.planoT = e.tick + ve, a.porta !== void 0 && a.porta >= 0)) {
    const [T, E] = ys(e.size, a.porta);
    for (const N of d) e.done[N] && e.bdef(N).trains && e.bdef(N).key !== "center" && e.issue({ type: "rally", player: t, building: N, x: T, z: E });
  }
  const S = e.eraBuildingTypes(t) >= 2, q = ["food", "wood", "stone", "metal", "coins"], O = [600, 400, 250, 400, 800], H = s.era >= 2 ? He[s.era]?.cost ?? {} : {}, U = (T) => Math.max(O[T], (H[q[T]] ?? 0) + (T === 0 ? 300 : 100)) * 100, R = (T) => Math.max(0, (H[q[T]] ?? 0) * 100 - s.res[q[T]]), L = (T = -1) => {
    let E = -1, N = 0;
    for (let D = 0; D < 5; D++) D !== T && R(D) > N && (D < 4 || s.era >= te) && (N = R(D), E = D);
    return E;
  }, Y = e.month, ft = (Y >= 6 && Y <= 8 ? 3 : Y === 9 ? 2 : Y === 10 ? 1 : 0) * (p + 4) * (s.era <= 1 ? 1 : s.era <= 3 ? 2 : 3) * 100, dt = !s.aging && (s.era === 0 && r.length >= M[0] || s.era === 1 && r.length >= M[1] - 2 && k >= x - 6 && S || s.era === 2 && r.length >= M[2] - 2 && k >= z - 6 && S || s.era === 3 && r.length >= M[3] - 2 && k >= A - 6 && S);
  r.length < M[o] && !e.queue[h].length && p < v && !s.aging && s.res.food >= ft + 5e3 && e.issue({ type: "train", player: t, building: h, key: "villager" });
  const St = y.filter((T) => e.bdef(T).key === "house" || e.bdef(T).key === "aqueduct").length;
  if (v - p <= (e.beta ? 3 : i.casa) && v < e.limiteEra(s.era) && St < (!e.beta && s.res.wood > 2e4 && e.difficulty > 0 ? 2 : 1) && e.tick >= a.houseCd) {
    const T = s.era >= 4 && u("aqueduct").length < 3 && e.canAfford(t, lt[wt.aqueduct].cost);
    w(T ? "aqueduct" : "house", 5, T ? 16 : 14) && (a.houseCd = e.tick + 100);
  }
  if (n % 30 === 0) for (const T of d) {
    if (e.done[T] || e.bdef(T).wall || r.some((D) => e.task[D] === le && e.tgt[D] === T)) continue;
    let E = -1, N = 1 / 0;
    for (const D of r) if (!I.has(D) && e.task[D] !== le) {
      const G = e.x[D] - e.x[T] >> 8, at = e.z[D] - e.z[T] >> 8, xt = G * G + at * at;
      xt < N && (N = xt, E = D);
    }
    E >= 0 && (e.issue({ type: "work", player: t, ids: [E], target: T }), I.add(E));
  }
  if (r.length >= 6 && !u("depot").length) {
    const T = Qd(e, t, h, C());
    T >= 0 && I.add(T);
  }
  if (s.era >= 2 && u("depot").length < 2) {
    const T = Ji(e, t, h, C(), (E) => e.resKind[E] === Ie);
    T >= 0 && I.add(T);
  } else if (s.era >= te && u("depot").length < 3) {
    const T = Ji(e, t, h, C(), (E) => e.resKind[E] === Ae);
    T >= 0 && I.add(T);
  }
  const Wt = u("military");
  r.length >= (e.beta ? 7 : 9) && !Wt.length ? w("military", 7, 16) : !e.beta && Wt.length < i.quarteis[o] && !dt && r.length >= M[o] - 4 && !y.some((T) => e.bdef(T).key === "military") && s.res.wood >= 15e3 && F("military", 7, 16);
  const ct = e.beta || e.difficulty === 0 ? 0 : Math.floor(Math.min(s.res.food, Math.max(s.res.wood, s.res.stone, s.res.metal)) / 2e4), et = l.filter((T) => X[e.kind[T]].cls === "cavalry").length, Z = !e.beta && u("stable", !0).length && et < 2 ? 4 : 0, de = e.beta ? Kn[o] + (e.difficulty === 2 ? 1 : 0) : Math.min(i.tropa[o] + (s.era ? Math.floor(k / i.cresce) : 0) + ct + Z, e.limiteEra(s.era) - M[o]), Dt = { food: Math.ceil(ft / 100) };
  s.era >= 2 && (Dt.stone = (u("forge").length ? 0 : 60) + (u("market").length ? 0 : 40) + (u("tower").length ? 0 : 120), Dt.metal = (!e.hasTech(t, "bronze") && u("forge", !0).length ? 60 : 0) + (u("stable", !0).length ? 35 : 0)), s.era >= te && (Dt.stone = (Dt.stone ?? 0) + (u("temple").length ? 0 : 150) + (u("mint").length ? 0 : 120), Dt.metal = (Dt.metal ?? 0) + (u("mint").length ? 0 : 80)), s.era >= 4 && (Dt.stone = (Dt.stone ?? 0) + (u("basilica").length ? 0 : 200), Dt.coins = u("basilica").length ? 0 : 100);
  const Gt = (T, E) => Ga.every((N) => s.res[N] >= ((T[N] ?? 0) + (E[N] ?? 0)) * 100), Et = e.beta ? Kn[o] : Math.max(3, Math.floor(i.tropa[o] / 2));
  if (!(dt && (s.era < 2 || c >= Et))) {
    let T = Math.min(de - c, v - p);
    const E = d.filter((G) => e.done[G] && !e.queue[G].length && ["military", "stable", "workshop"].includes(e.bdef(G).key)), N = new Array(X.length).fill(0);
    for (const G of l) N[e.kind[G]]++;
    const D = (G, at) => Gt(G, e.bdef(at).key === "military" ? Dt : { food: Dt.food, stone: Dt.stone, metal: !e.hasTech(t, "bronze") && u("forge", !0).length ? 60 : 0, coins: Dt.coins });
    for (; T > 0 && E.length; ) {
      const G = Ud(e, a, E, o, N, i, T, D);
      if (!G) break;
      e.issue({ type: "train", player: t, building: G.b, key: G.k }), E.splice(E.indexOf(G.b), 1), T -= X[mt[G.k]].pop, N[mt[G.k]]++;
    }
  }
  if (s.era >= 2) {
    const T = u("forge", !0)[0], E = u("market", !0)[0];
    T !== void 0 && !e.queue[T].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && s.res.metal > 3e4 && e.issue({ type: "research", player: t, building: T, key: "iron" }) : e.issue({ type: "research", player: t, building: T, key: "bronze" })), E !== void 0 && !e.queue[E].length && !e.hasTech(t, "wheel") && s.res.metal > 15e3 && e.issue({ type: "research", player: t, building: E, key: "wheel" });
    const N = u("basilica", !0)[0] ?? E;
    if (N !== void 0 && n % 3 === 1) {
      let D = s.res.wood > (e.feiraDe(t) ? 5e4 : 9e4) ? "wood" : null, G = 0;
      if (!D) for (let Ct = 0; Ct < 5; Ct++) {
        const kt = s.res[q[Ct]] - U(Ct) - 1e4;
        kt > G && (Ct < 4 || s.era >= te) && (G = kt, D = q[Ct]);
      }
      const at = D ? L(q.indexOf(D)) : -1, xt = at >= 0 ? q[at] : D !== "wood" ? null : s.res.stone < 2e4 ? "stone" : s.res.metal < 25e3 ? "metal" : s.era >= te && s.res.coins < 6e4 ? "coins" : s.res.food < 3e4 ? "food" : null;
      D && xt && xt !== D && e.issue({ type: "trade", player: t, building: N, give: D, get: xt });
    }
  }
  const B = (T) => e.canAfford(t, { ...He[T].cost, food: (He[T].cost.food ?? 0) + Math.ceil(ft / 100) });
  if (s.era === 0 && !s.aging && r.length >= (e.beta ? 8 : 10) && e.eraBuildingTypes(t) >= 2 && B(0) && e.issue({ type: "ageup", player: t, building: h }), s.era === 1 && !s.aging && r.length >= (e.beta ? 11 : 18) && k >= x && e.eraBuildingTypes(t) >= 2 && B(1) && e.issue({ type: "ageup", player: t, building: h }), s.era === 2 && !s.aging && r.length >= (e.beta ? 13 : 26) && k >= z && S && B(2) && e.issue({ type: "ageup", player: t, building: h }), s.era === 3 && !s.aging && r.length >= (e.beta ? 15 : 30) && k >= A && S && B(3) && e.issue({ type: "ageup", player: t, building: h }), s.era >= 1 && !y.length && (u("farm").length < Math.min(s.era >= 2 ? 14 : 10, Math.floor(r.length * 2 / 5)) && (w("farm", 6, 15) || !e.beta && w("farm", 15, Math.max(20, $ + 5))) || (u("pen").length ? !u("sanctuary").length && k > 30 ? F("sanctuary", 6, 14) : s.era >= te && !u("temple").length ? F("temple", 6, 15) : s.era >= te && !u("mint").length ? w("mint", 6, 14) : s.era >= 4 && !u("aqueduct").length ? w("aqueduct", 7, 16) : s.era >= 4 && !u("basilica").length ? w("basilica", 7, 16) : s.era >= 2 && (u("stable").length ? u("forge").length ? !u("market").length && (k > 50 || s.res.wood > 6e4) ? w("market", 7, 16) : !u("workshop").length && i.maquinas[o] > 0 && (k > (e.difficulty === 2 ? 40 : 48) || s.res.wood > 5e4) && w("workshop", 7, 16) : w("forge", 6, 14) : w("stable", 7, 16)) : w("pen", 7, 16))), s.era >= 2 && !dt && a.porta !== void 0 && a.porta >= 0 && u("tower").length < i.torres[o] && !y.some((T) => e.bdef(T).key === "tower") && Gt(lt[wt.tower].cost, { stone: (Dt.stone ?? 0) - (u("tower").length ? 0 : 120) })) {
    const T = or(e, t, "tower", a.porta, C(), 7);
    T >= 0 && I.add(T);
  }
  const j = e.muroDaEra(s.era);
  if (j && s.era >= i.muroEra && r.length >= (e.beta ? 7 : 12) && Wt.length && e.tick >= (a.muroT ?? 0)) {
    a.muroT = e.tick + i.muroCada;
    const T = lt[wt[j]].cost, E = T.wood ? "wood" : "stone", N = (T[E] ?? 1) * 100, D = ((dt && !P ? He[s.era]?.cost[E] ?? 0 : 0) + (Dt[E] ?? 0) + (E === "wood" ? 80 : 40)) * 100, G = Math.min(60, Math.floor((s.res[E] - D) / N));
    if (G >= 1) {
      const at = (Jt) => {
        const ge = e.bAt[Jt] - 1;
        return ge >= 0 && e.bdef(ge).wall === !0 && e.owner[ge] === t;
      }, xt = (a.muro ?? []).filter((Jt) => at(Jt) || !e.blocked[Jt] && !e.bAt[Jt]), Ct = xt.filter((Jt) => !at(Jt) && Yo(e, t, Jt)).slice(0, G), kt = s.res[E] - D > N * 60 ? lt[wt[j]].hp : 0, Yt = Ct.concat(G - Ct.length >= 4 ? Jd(e, t, h, $, G - Ct.length, kt, new Set(Ct)) : []);
      if (a.muro = [...new Set(xt.concat(Yt))].slice(-400), Yt.length) {
        const Jt = r.filter((ie) => e.task[ie] === le && e.isBuilding(e.tgt[ie]) && e.bdef(e.tgt[ie]).wall), ge = Jt.length >= i.construtores ? Bs(e, Jt, Yt[0], 1) : Bs(e, C().filter((ie) => e.task[ie] !== le), Yt[0], i.construtores - Jt.length);
        if (ge.length) {
          e.issue({ type: "wall", player: t, ids: ge, tiles: Yt });
          for (const ie of ge) I.add(ie);
        }
      }
    }
  }
  if (s.era >= 4 && !dt && n % 50 === 25 && a.estradas?.length && s.res.stone >= ((Dt.stone ?? 0) + 300) * 100) {
    const T = a.estradas.filter((E) => Yo(e, t, E)).slice(0, 60);
    if (T.length >= 3) {
      const [E] = Bs(e, C().filter((N) => e.task[N] !== le), T[0], 1);
      E !== void 0 && (e.issue({ type: "road", player: t, ids: [E], tiles: T }), I.add(E));
    }
  }
  if (n % 6 === 3) {
    const T = d.filter((E) => !e.done[E] && e.bdef(E).wall);
    if (T.length && e.canAfford(t, e.bdef(T[0]).cost) && r.filter((N) => e.task[N] === le && e.isBuilding(e.tgt[N]) && e.bdef(e.tgt[N]).wall).length < i.construtores) {
      const N = T[0], D = (e.z[N] >> 8) * e.size + (e.x[N] >> 8), [G] = Bs(e, C().filter((at) => e.task[at] !== le), D, 1);
      G !== void 0 && (e.issue({ type: "work", player: t, ids: [G], target: N }), I.add(G));
    }
  }
  const K = r.filter((T) => e.task[T] === _t && e.state[T] === Lt && !I.has(T));
  if (K.length) {
    const T = [0, 0, 0, 0, 0];
    for (const N of r) if (e.task[N] === Xt) {
      const D = e.tgt[N], G = e.tgtTile[N] ? e.map.tree[D] ? Hs : e.resKind[D] === Xe ? Jo : e.resKind[D] === Ie ? Zo : e.resKind[D] === Ae ? Ts : es : es;
      T[G === Ts ? 4 : G === Zo ? 3 : G === Jo ? 2 : G === Hs ? 1 : 0]++;
    }
    const E = s.era === 0 ? dt ? [0.8, 0.15, 0.05, 0, 0] : [0.62, 0.3, 0.08, 0, 0] : s.era === 1 ? dt ? [0.55, 0.25, 0.2, 0, 0] : [0.5, 0.35, 0.15, 0, 0] : s.era === 2 ? [0.42, 0.25, 0.13, 0.2, 0] : s.era === 3 ? [0.4, 0.2, 0.15, 0.13, 0.12] : [0.4, 0.15, 0.18, 0.12, 0.15];
    if (e.beta && s.era < He.length) {
      const N = He[s.era].cost, D = ["food", "wood", "stone", "metal", "coins"].map((at) => Math.max(0, (N[at] ?? 0) * 100 - s.res[at]));
      s.era < te && (D[4] = 0);
      const G = D[0] + D[1] + D[2] + D[3] + D[4];
      if (G > 0) for (let at = 0; at < 5; at++) E[at] = (E[at] + D[at] / G) / 2;
    }
    s.res.wood > U(1) && (E[0] += E[1] - 0.1, E[1] = 0.1), s.res.stone > U(2) && (E[0] += E[2], E[2] = 0), s.res.metal > U(3) && (E[0] += E[3], E[3] = 0), s.res.coins > U(4) && (E[0] += E[4], E[4] = 0);
    for (const N of K) {
      const D = T[0] + T[1] + T[2] + T[3] + T[4] + 1, G = (at) => E[at] - T[at] / D;
      for (const at of [0, 1, 2, 3, 4].sort((xt, Ct) => G(Ct) - G(xt) || xt - Ct)) if (Mi(e, t, N, at, h)) {
        T[at]++;
        break;
      }
    }
  }
  if (s.res.wood > U(1) && (e.tick + t * 7) % 200 === 0) {
    const T = r.find((E) => e.task[E] === Xt && e.tgtTile[E] && e.map.tree[e.tgt[E]] > 0 && !I.has(E));
    T !== void 0 && e.carry[T] === 0 && Mi(e, t, T, 0, h);
  }
  if (s.era >= 2 && (e.tick + t * 7) % 200 === 100) {
    const T = (D) => {
      const G = e.tgt[D];
      return e.tgtTile[D] ? e.map.tree[G] ? 1 : e.resKind[G] === Xe ? 2 : e.resKind[G] === Ie ? 3 : e.resKind[G] === Ae ? 4 : -1 : -1;
    }, E = L(), N = E < 0 ? void 0 : r.find((D) => {
      const G = T(D);
      return e.task[D] === Xt && !I.has(D) && e.carry[D] === 0 && G > 0 && G !== E && s.res[q[G]] > U(G);
    });
    N !== void 0 && Mi(e, t, N, E, h);
  }
  let _ = !1;
  if (n % 3 === 0) {
    const T = d.filter((N) => e.done[N] && (e.bdef(N).key === "depot" || e.bdef(N).key === "tower" || e.bdef(N).key === "mint") && (e.x[N] - e.x[h] >> 8) ** 2 + (e.z[N] - e.z[h] >> 8) ** 2 > 196), E = Hd(e, t, h, Math.max(18, $ + 5), T);
    if (E.alvo >= 0) {
      _ = !0, E.dono >= 0 && E.dono < e.players.length && (a.vinganca = E.dono);
      const N = new Set(a.onda ?? []);
      let D = l.filter((G) => !N.has(G) && !X[e.kind[G]].siege);
      a.onda?.length && (E.forca * 10 > Yi(e, D) * 12 || e.hp[h] * 2 < lt[wt.center].hp) && (D = D.concat(a.onda.filter((G) => e.alive[G] && e.owner[G] === t && !X[e.kind[G]].siege)), a.onda = [], a.attackAt = Math.max(a.attackAt, e.tick + Math.floor(i.entre * ve / 2))), D = D.filter((G) => e.task[G] !== Vt), D.length && e.issue({ type: "attack", player: t, ids: D, target: E.alvo });
    }
  }
  if (a.attackAt || (a.attackAt = i.ataque1 * ve), n % 2 === 0 && Wd(e, t, a, i, l, e.beta ? Math.max(3, Math.min(i.grupoMin, de - 1)) : i.grupoMin), n % 5 === 2 && !_ && a.porta !== void 0 && a.porta >= 0) {
    const [T, E] = ys(e.size, a.porta), N = new Set(a.onda ?? []), D = /* @__PURE__ */ new Set(), G = l.filter((kt) => !N.has(kt) && e.task[kt] === _t && e.state[kt] === Lt && !X[e.kind[kt]].siege), at = e.difficulty > 0 && s.era >= 2 ? d.filter((kt) => e.done[kt] && e.bdef(kt).key === "depot" && (e.x[kt] - e.x[h] >> 8) ** 2 + (e.z[kt] - e.z[h] >> 8) ** 2 > 400) : [], xt = e.difficulty === 2 ? 3 : 2;
    for (const kt of at) {
      const Yt = (ie) => (e.x[ie] - e.x[kt]) ** 2 + (e.z[ie] - e.z[kt]) ** 2 < (7 * J) ** 2;
      for (const ie of l) !N.has(ie) && Yt(ie) && D.size < xt * (at.indexOf(kt) + 1) && D.add(ie);
      const Jt = xt * (at.indexOf(kt) + 1) - D.size;
      if (Jt <= 0 || c < 12) continue;
      const ge = Zd(e, G.filter((ie) => !D.has(ie)), e.x[kt], e.z[kt], Jt);
      for (const ie of ge) D.add(ie);
      ge.length && e.issue({ type: "amove", player: t, ids: ge, x: e.x[kt] + 2 * J, z: e.z[kt] + 2 * J });
    }
    const Ct = G.filter((kt) => !D.has(kt) && (e.x[kt] - T) ** 2 + (e.z[kt] - E) ** 2 > (7 * J) ** 2);
    Ct.length && e.issue({ type: "amove", player: t, ids: Ct, x: T, z: E });
  }
}
function G0(e) {
  const t = X[e], a = t.cost;
  let s = (a.food ?? 0) + (a.wood ?? 0) + (a.stone ?? 0) + Math.floor((a.metal ?? 0) * 3 / 2) + (a.coins ?? 0) * 2;
  return s || (s = t.hp + t.atk * 8), t.siege ? Math.floor(s / 3) : s;
}
function Yi(e, t) {
  let a = 0;
  for (const s of t) a += Math.floor(G0(e.kind[s]) * e.hp[s] / X[e.kind[s]].hp);
  return a;
}
const Jn = (e, t) => (X[e].bonus ?? []).some((a) => a.vs === t), jd = (e, t) => (Jn(e, X[t].cls) ? 1 : 0) - (Jn(t, X[e].cls) ? 1 : 0);
function _d(e, t, a) {
  const s = e.vis[t], o = e.size, i = new Array(X.length).fill(0);
  for (let r = 0; r < e.top; r++) {
    if (!e.isUnit(r)) continue;
    const l = e.owner[r];
    if (l < 0 || !e.hostile(t, l)) continue;
    const d = X[e.kind[r]];
    d.cls === "villager" || d.cls === "animal" || s[(e.z[r] >> 8) * o + (e.x[r] >> 8)] && (i[e.kind[r]] += l === ze ? 5 : 10);
  }
  const n = a.intel ?? [];
  a.intel = i.map((r, l) => Math.max(r, Math.floor((n[l] ?? 0) * 99 / 100)));
}
function Ud(e, t, a, s, o, i, n, r) {
  const l = [];
  for (const A of a) for (const $ of kn(e.bdef(A), s)) $ !== "dog" && r(X[mt[$]].cost, A) && l.push({ b: A, k: $ });
  if (!l.length) return null;
  const d = (A) => X[mt[A.k]].pop <= n;
  let c = 0, h = 0;
  for (let A = 0; A < o.length; A++) X[A].cls === "siege" ? c += o[A] : h += o[A];
  const f = l.filter((A) => e.bdef(A.b).key === "workshop");
  if (f.length && c < i.maquinas[s] && h >= 6) {
    const A = (P) => o[mt[P]], $ = A("ram") === 0 ? ["ram", "ballista"] : A("scorpio") <= A("ballista") ? ["scorpio", "ballista", "ram"] : ["ballista", "ram"];
    for (const P of $) {
      const I = f.find((C) => C.k === P);
      if (I) return d(I) ? I : null;
    }
  }
  const u = l.filter((A) => X[mt[A.k]].cls !== "siege");
  if (!u.length) return null;
  if (e.rng.int(100) >= i.contra) {
    const A = u.filter(d);
    return A.length ? A[e.rng.int(A.length)] : null;
  }
  const p = Yn[Math.min(s, Yn.length - 1)], v = t.intel ?? [];
  let y = 0;
  for (const A of v) y += A;
  const k = {};
  let M = 0;
  for (const A of Object.keys(p)) {
    let $ = p[A];
    if (y > 0) {
      let P = 0;
      for (let I = 0; I < v.length; I++) v[I] && (P += v[I] * jd(mt[A], I));
      $ = Math.max(Math.floor($ * 15 / 100), $ + Math.floor($ * 12 * P / y / 10));
    }
    k[A] = $, M += $;
  }
  let x = null, z = -1 / 0;
  for (const A of u) {
    const $ = (k[A.k] ?? 5) / Math.max(1, M) - o[mt[A.k]] / Math.max(1, h);
    $ > z && (z = $, x = A);
  }
  return x && d(x) ? x : null;
}
function Hd(e, t, a, s, o) {
  let i = -1, n = 1 / 0, r = 0, l = -1;
  const d = (s * J) ** 2, c = (10 * J) ** 2;
  for (let h = 0; h < e.top; h++) {
    if (!e.isUnit(h)) continue;
    const f = e.owner[h];
    if (f < 0 || !e.hostile(t, f) || X[e.kind[h]].cls === "animal") continue;
    const u = e.x[h] - e.x[a], p = e.z[h] - e.z[a];
    let v = u * u + p * p;
    if (v >= d) {
      let y = !1;
      for (const k of o) {
        const M = e.x[h] - e.x[k], x = e.z[h] - e.z[k], z = M * M + x * x;
        if (z < c) {
          y = !0, v = d + z;
          break;
        }
      }
      if (!y) continue;
    }
    r += G0(e.kind[h]), v < n && (n = v, i = h, l = f);
  }
  return { alvo: i, forca: r, dono: l };
}
function Wd(e, t, a, s, o, i) {
  const n = e.size, r = (a.onda ?? []).filter((M) => e.alive[M] && e.owner[M] === t && e.isUnit(M)), l = a.alvo !== void 0 && a.alvo >= 0 ? V0(e, a.alvo) : -1;
  if (r.length) {
    a.onda = r;
    const M = Yi(e, r);
    if (l < 0 || M * 100 < s.recua * (a.forca0 ?? M)) {
      Gd(e, t, a, r), a.attackAt = Math.max(a.attackAt, e.tick + Math.floor(s.entre * ve * (l < 0 ? 1 : 2) / 2));
      return;
    }
    const x = a.rota ?? [], z = a.wp ?? 0, [A, $] = z < x.length ? ys(n, x[z]) : [e.x[l], e.z[l]];
    if (z < x.length) {
      let P = 0;
      for (const I of r) (e.x[I] - A) ** 2 + (e.z[I] - $) ** 2 < (7 * J) ** 2 && P++;
      if (P * 10 >= r.length * 7 || e.tick - (a.wpT ?? 0) > 450) {
        a.wp = z + 1, a.wpT = e.tick;
        const [I, C] = a.wp < x.length ? ys(n, x[a.wp]) : [e.x[l], e.z[l]];
        e.issue({ type: "amove", player: t, ids: r, x: I, z: C });
        return;
      }
    }
    if ((a.vez ?? 0) % 6 === 0) {
      const P = r.filter((I) => e.task[I] === _t && e.state[I] === Lt);
      P.length && e.issue({ type: "amove", player: t, ids: P, x: A, z: $ });
    }
    return;
  }
  if (a.onda = [], e.tick < a.attackAt || l < 0 || a.porta === void 0 || a.porta < 0) return;
  let d = 0;
  for (const M of o) d += X[e.kind[M]].pop;
  if (d < i) return;
  const c = Math.min(s.grupoMax, d - Math.floor(d * s.fica / 100)), h = (M) => X[e.kind[M]].proj && !X[e.kind[M]].siege ? 1 : 0, f = [...o].sort((M, x) => h(M) - h(x) || M - x), u = [];
  let p = 0;
  for (const M of f) {
    if (p >= c) break;
    u.push(M), p += X[e.kind[M]].pop;
  }
  if (p < i) return;
  a.onda = u, a.wp = 0, a.wpT = e.tick, a.forca0 = Yi(e, u), a.ataques = (a.ataques ?? 0) + 1;
  const v = a.rota ?? [], [y, k] = v.length ? ys(n, v[0]) : [e.x[l], e.z[l]];
  e.issue({ type: "amove", player: t, ids: u, x: y, z: k }), a.attackAt = e.tick + s.entre * ve;
}
function Gd(e, t, a, s) {
  if (s.length && a.porta !== void 0 && a.porta >= 0) {
    const [o, i] = ys(e.size, a.porta);
    e.issue({ type: "move", player: t, ids: s, x: o, z: i });
  }
  a.onda = [];
}
const ys = (e, t) => [t % e * J + 128, Math.floor(t / e) * J + 128];
function V0(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.bdef(a).key === "center") return a;
  return -1;
}
let Zn = 0, la = new Int32Array(0), Ls = new Int32Array(0), uo = new Int32Array(0);
function Vd(e, t) {
  const a = e.size, s = a * a, o = e.blocked;
  Zn !== s && (Zn = s, la = new Int32Array(s), Ls = new Int32Array(s), uo = new Int32Array(s)), la.fill(-1);
  const [i, n, r] = e.footprint(t);
  let l = 0, d = 0;
  for (let c = n - 1; c <= n + r; c++) for (let h = i - 1; h <= i + r; h++) {
    if (h < 0 || c < 0 || h >= a || c >= a) continue;
    const f = c * a + h;
    o[f] || la[f] >= 0 || (la[f] = 0, Ls[f] = -1, uo[d++] = f);
  }
  for (; l < d; ) {
    const c = uo[l++], h = c % a, f = (c - h) / a;
    for (let u = 0; u < 8; u++) {
      const p = h + H0[u], v = f + W0[u];
      if (p < 0 || v < 0 || p >= a || v >= a) continue;
      const y = v * a + p;
      o[y] || la[y] >= 0 || u >= 4 && (o[f * a + p] || o[v * a + h]) || (la[y] = la[c] + 1, Ls[y] = c, uo[d++] = y);
    }
  }
}
function Qn(e, t) {
  const a = e.size, [s, o, i] = e.footprint(t);
  let n = -1, r = 1 / 0;
  for (let l = o - 1; l <= o + i; l++) for (let d = s - 1; d <= s + i; d++) {
    if (d < 0 || l < 0 || d >= a || l >= a) continue;
    const c = l * a + d, h = la[c];
    h >= 0 && h < r && (r = h, n = c);
  }
  return n;
}
function Kd(e, t, a, s, o, i, n) {
  Vd(e, s);
  const r = e.players.length;
  let l = -1, d = -1, c = 1 / 0;
  for (const p of e.players) {
    if (p.id === t || p.defeated || !e.hostile(t, p.id)) continue;
    const v = V0(e, p.id);
    if (v < 0) continue;
    const y = Qn(e, v);
    if (y < 0) continue;
    const k = la[y] * (p.ai ? 100 : o.humano) * (a.vinganca === p.id ? 75 : 100) * (100 + 2 * ((p.id - t + r) % r));
    k < c && (c = k, l = p.id, d = y);
  }
  if (a.alvo = l, d < 0) {
    a.rota = [], a.porta === void 0 && (a.porta = -1);
    return;
  }
  const h = [];
  for (let p = d; p >= 0; p = Ls[p]) h.push(p);
  h.reverse();
  const f = Math.min(h.length - 1, Math.max(6, i ? i - 4 : 10));
  if (a.porta = h[f], e.players[t].era >= 4) {
    const p = h.slice(0, f + 1);
    for (const v of n) {
      const y = Qn(e, v);
      if (y < 0) continue;
      const k = [];
      for (let M = y; M >= 0 && k.length < 60; M = Ls[M]) k.push(M);
      p.push(...k.reverse());
    }
    a.estradas = p.slice(0, 120);
  }
  const u = [];
  for (let p = f + 12; p < h.length - 1; p += 12) u.push(h[p]);
  u.push(h[h.length - 1]), a.rota = u;
}
let tr = 0, er = 0, qs = new Int32Array(0), fo = new Int32Array(0), po = new Int32Array(0);
function Xd(e, t, a, s) {
  const o = e.size, i = o * o;
  tr !== i && (tr = i, qs = new Int32Array(i), fo = new Int32Array(i), po = new Int32Array(i), er = 0);
  const n = ++er, [r, l, d] = e.footprint(t), c = e.x[t] >> 8, h = e.z[t] >> 8, f = a * a;
  let u = 0, p = 0;
  for (let v = l - 1; v <= l + d; v++) for (let y = r - 1; y <= r + d; y++) {
    if (y < 0 || v < 0 || y >= o || v >= o) continue;
    const k = v * o + y;
    qs[k] === n || !s(k) || (qs[k] = n, fo[k] = -1, po[p++] = k);
  }
  for (; u < p; ) {
    const v = po[u++], y = v % o, k = (v - y) / o;
    if ((y - c) ** 2 + (k - h) ** 2 >= f) {
      const M = [];
      for (let x = v; x >= 0; x = fo[x]) M.push(x);
      return M.reverse();
    }
    for (let M = 0; M < 8; M++) {
      const x = y + H0[M], z = k + W0[M];
      if (x < 0 || z < 0 || x >= o || z >= o) continue;
      const A = z * o + x;
      qs[A] === n || !s(A) || M >= 4 && (!s(k * o + x) || !s(z * o + y)) || (qs[A] = n, fo[A] = v, po[p++] = A);
    }
  }
  return null;
}
const Yo = (e, t, a) => {
  const s = e.map.terrain[a];
  return !e.blocked[a] && !e.bAt[a] && !zs(s) && s !== Pa && e.explored[t][a] === 1;
}, ar = (e, t) => t >= 0 ? e >= 0 ? t / (e + t || 1) : 1 - e / (t - e) : e < 0 ? 2 - t / (-e - t) : 3 + e / (e - t);
function Yd(e, t, a, s, o, i, n) {
  const r = e.size, l = (2 * o - 1) ** 2, d = (2 * o + 1) ** 2, c = [];
  let h = n[n.length - 1];
  for (const u of n) {
    const p = u % r, v = (u - p) / r;
    if (4 * ((p - a) ** 2 + (v - s) ** 2) >= l) {
      h = u;
      break;
    }
  }
  const f = ar(h % r - a, Math.floor(h / r) - s);
  for (let u = -o - 1; u <= o + 1; u++) for (let p = -o - 1; p <= o + 1; p++) {
    const v = 4 * (p * p + u * u);
    if (v < l || v >= d) continue;
    const y = a + p, k = s + u;
    if (y < 1 || k < 1 || y >= r - 1 || k >= r - 1) continue;
    const M = k * r + y;
    if (!i(M) || !Yo(e, t, M)) continue;
    let x = ar(p, u) - f;
    x < 0 && (x += 4), c.push({ k: M, a: x > 2 ? 4 - x : x });
  }
  return c.sort((u, p) => u.a - p.a || u.k - p.k).map((u) => u.k);
}
function sr(e, t, a, s, o, i, n, r) {
  const l = e.size, d = (i - 2) ** 2, c = (i + 3) ** 2;
  let h = null, f = 1 / 0;
  for (let u = 0; u < a.length; u++) {
    const p = a[u], v = p % l, y = (p - v) / l, k = (v - s) ** 2 + (y - o) ** 2;
    if (!(k < d || k > c))
      for (const [M, x] of Dd) {
        const z = [p];
        let A = !0;
        for (const P of [1, -1]) {
          let I = 1;
          for (; I <= n; I++) {
            const C = v + M * I * P, w = y + x * I * P;
            if (C < 1 || w < 1 || C >= l - 1 || w >= l - 1) {
              A = !1;
              break;
            }
            const F = w * l + C;
            if (!r(F)) break;
            z.push(F);
          }
          if (I > n && (A = !1), !A) break;
        }
        if (!A || !z.every((P) => Yo(e, t, P))) continue;
        const $ = z.length * 4 + (M && x ? 1 : 0) + Math.abs(Math.sqrt(k) - i);
        $ < f && (f = $, h = z);
      }
  }
  return h ? h.sort((u, p) => u - p) : null;
}
function Jd(e, t, a, s, o, i = 0, n = /* @__PURE__ */ new Set()) {
  const r = e.x[a] >> 8, l = e.z[a] >> 8, d = [], c = new Set(n), h = (p) => {
    const v = e.bAt[p] - 1;
    return v >= 0 && e.bdef(v).wall === !0 && e.bdef(v).hp >= i && (e.owner[v] === t || e.aliado(t, e.owner[v]));
  }, f = (p) => !e.blocked[p] && !c.has(p) && !h(p);
  let u = !1;
  for (let p = 0; p < 16 && d.length < o; p++) {
    const v = Xd(e, a, s + 6, f);
    if (!v) break;
    let y = sr(e, t, v, r, l, s, 12, f);
    if (!y && !u && (u = !0, y = Yd(e, t, r, l, s, f, v)), y?.length || (y = sr(e, t, v, r, l, s + 3, 18, f)), !y?.length) break;
    const k = y.slice(0, o - d.length);
    for (const M of k)
      c.add(M), d.push(M);
    if (k.length < y.length) break;
  }
  return d;
}
function Zd(e, t, a, s, o) {
  return [...t].sort((i, n) => (e.x[i] - a) ** 2 + (e.z[i] - s) ** 2 - ((e.x[n] - a) ** 2 + (e.z[n] - s) ** 2) || i - n).slice(0, o);
}
function Bs(e, t, a, s) {
  const o = e.size, i = a % o * J + 128, n = Math.floor(a / o) * J + 128;
  return [...t].sort((r, l) => (e.x[r] - i) ** 2 + (e.z[r] - n) ** 2 - ((e.x[l] - i) ** 2 + (e.z[l] - n) ** 2) || r - l).slice(0, s);
}
function or(e, t, a, s, o, i) {
  const n = lt[wt[a]];
  if (!e.canAfford(t, n.cost) || !o.length) return -1;
  const r = e.size, l = s % r, d = (s - l) / r;
  for (const [c, h] of as) {
    if (c * c + h * h > i * i) break;
    const f = l + c - (n.size >> 1), u = d + h - (n.size >> 1);
    if (!e.canPlace(t, a, f, u) || !Tn(e, f, u, n.size)) continue;
    const [p] = Bs(e, o.filter((v) => e.task[v] !== le), u * r + f, 1);
    return p === void 0 ? -1 : (e.issue({ type: "build", player: t, ids: [p], key: a, tx: f, tz: u }), p);
  }
  return -1;
}
function ki(e, t, a, s, o, i, n) {
  const r = lt[wt[a]];
  if (!e.canAfford(t, r.cost) || !o.length) return -1;
  const l = e.x[s] >> 8, d = e.z[s] >> 8;
  for (const [c, h] of as) {
    const f = c * c + h * h;
    if (f < i * i) continue;
    if (f > n * n) break;
    const u = l + c - (r.size >> 1), p = d + h - (r.size >> 1);
    if (!e.canPlace(t, a, u, p) || !Tn(e, u, p, r.size)) continue;
    const v = o.find((y) => e.task[y] !== le && (e.carryRes[y] === Hs || e.task[y] === _t)) ?? o.find((y) => e.task[y] !== le) ?? o[0];
    return e.issue({ type: "build", player: t, ids: [v], key: a, tx: u, tz: p }), v;
  }
  return -1;
}
function Tn(e, t, a, s) {
  for (let o = a - 1; o <= a + s; o++) for (let i = t - 1; i <= t + s; i++) {
    const n = o * e.size + i, r = e.bAt[n] - 1;
    if (r >= 0 && !e.bdef(r).wall && !e.bdef(r).estrada) return !1;
  }
  return !0;
}
function Qd(e, t, a, s) {
  return Ji(e, t, a, s, (o) => e.map.tree[o] > 0);
}
function Ji(e, t, a, s, o) {
  const i = lt[wt.depot];
  if (!e.canAfford(t, i.cost) || !s.length) return -1;
  const n = e.x[a] >> 8, r = e.z[a] >> 8, l = e.size;
  let d = as;
  if (!as.some(([c, h]) => {
    const f = n + c, u = r + h;
    return f >= 0 && u >= 0 && f < l && u < l && o(u * l + f);
  })) {
    let c = -1, h = 1 / 0;
    for (let f = 0; f < l * l; f += 2) if (o(f)) {
      const u = f % l, p = (f - u) / l, v = (u - n) ** 2 + (p - r) ** 2;
      v < h && (h = v, c = f);
    }
    if (c < 0) return -1;
    d = [[c % l - n, Math.floor(c / l) - r]];
  }
  for (const [c, h] of d) {
    const f = n + c, u = r + h;
    if (!(c * c + h * h < 36) && !(f < 2 || u < 2 || f >= l - 3 || u >= l - 3) && o(u * l + f))
      for (const [p, v] of [[2, 0], [-3, 0], [0, 2], [0, -3], [2, 2], [-3, -3], [2, -3], [-3, 2]]) {
        const y = f + p, k = u + v;
        if (e.canPlace(t, "depot", y, k) && Tn(e, y, k, 2)) {
          const M = s.find((x) => e.task[x] !== le) ?? s[0];
          return e.issue({ type: "build", player: t, ids: [M], key: "depot", tx: y, tz: k }), M;
        }
      }
  }
  return -1;
}
function Mi(e, t, a, s, o) {
  const i = e.size, n = e.x[o] >> 8, r = e.z[o] >> 8;
  if (s === 0) {
    for (let M = 0; M < e.top; M++) if (e.isBuilding(M) && e.owner[M] === t && e.done[M] && e.bdef(M).key === "farm") {
      let x = !1;
      for (let z = 0; z < e.top; z++) if (e.isUnit(z) && e.task[z] === Xt && e.tgt[z] === M && !e.tgtTile[z]) {
        x = !0;
        break;
      }
      if (!x)
        return e.issue({ type: "work", player: t, ids: [a], target: M }), !0;
    }
    let u = 0;
    for (let M = 0; M < e.top; M++) e.isUnit(M) && e.owner[M] === t && e.task[M] === Xt && e.tgtTile[M] && e.resKind[e.tgt[M]] === xe && u++;
    if (e.season !== 3 && u < 5) for (const [M, x] of as) {
      if (M * M + x * x > 196) break;
      const z = n + M, $ = (r + x) * i + z;
      if ($ >= 0 && $ < i * i && e.resKind[$] === xe && e.resAmt[$] > 0)
        return e.issue({ type: "gather", player: t, ids: [a], k: $ }), !0;
    }
    let p = -1, v = (25 * J) ** 2;
    for (let M = 0; M < e.top; M++) if (e.alive[M] && e.kind[M] === Tt && e.work[M] > 0) {
      let x = 0;
      for (let P = 0; P < e.top; P++) e.isUnit(P) && e.task[P] === Xt && e.tgt[P] === M && !e.tgtTile[P] && x++;
      const z = e.x[M] - e.x[o], A = e.z[M] - e.z[o], $ = z * z + A * A;
      x < 4 && $ < v && (v = $, p = M);
    }
    if (p >= 0)
      return e.issue({ type: "work", player: t, ids: [a], target: p }), !0;
    let y = -1, k = (28 * J) ** 2;
    for (let M = 0; M < e.top; M++) if (e.isAnimal(M) && X[e.kind[M]].animal.food > 0 && X[e.kind[M]].key !== "aurochs") {
      const x = e.x[M] - e.x[o], z = e.z[M] - e.z[o], A = x * x + z * z;
      A < k && (k = A, y = M);
    }
    return y >= 0 ? (e.issue({ type: "attack", player: t, ids: [a], target: y }), !0) : !1;
  }
  if (s === 3 && e.players[t].era < 2 || s === 4 && e.players[t].era < te) return !1;
  const l = (u) => s === 1 ? e.map.tree[u] > 0 : s === 2 ? e.resKind[u] === Xe : s === 4 ? e.resKind[u] === Ae : e.resKind[u] === Ie;
  let d = n, c = r;
  if (s === 1) {
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.owner[u] === t && e.bdef(u).key === "depot") {
      d = e.x[u] >> 8, c = e.z[u] >> 8;
      break;
    }
  }
  for (const [u, p] of as) {
    const v = d + u, y = c + p;
    if (v < 0 || y < 0 || v >= i || y >= i) continue;
    const k = y * i + v;
    if (l(k) && e.open(k))
      return e.issue({ type: "gather", player: t, ids: [a], k }), !0;
  }
  let h = -1, f = 1 / 0;
  for (let u = 0; u < i * i; u += 3) if (l(u) && e.open(u)) {
    const p = u % i, v = (u - p) / i, y = (p - d) ** 2 + (v - c) ** 2;
    y < f && (f = y, h = u);
  }
  return h >= 0 ? (e.issue({ type: "gather", player: t, ids: [a], k: h }), !0) : !1;
}
function th(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    const o = /* @__PURE__ */ new Set();
    for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === ze) {
      const n = ir(e, i);
      n >= 0 && !o.has(e.owner[n]) && (o.add(e.owner[n]), e.events.push({ t: "msg", player: e.owner[n], key: "raidSoon", x: e.x[i], z: e.z[i] }));
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / ve, a = Math.max(...e.players.map((o) => o.era)), s = /* @__PURE__ */ new Set();
  for (let o = 0; o < e.top; o++) {
    if (!e.isBuilding(o) || e.owner[o] !== ze) continue;
    const i = ir(e, o);
    if (i < 0 || s.has(e.owner[i])) continue;
    s.add(e.owner[i]);
    const n = e.players[e.owner[i]].era >= te, r = n ? "gaul" : "barbarian", l = n ? Math.min(7, 3 + Math.floor(t / 20)) : a >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15)), d = [];
    for (let c = 0; c < l; c++) {
      const h = e.nearestFree((e.x[o] >> 8) + c % 3 - 1, (e.z[o] >> 8) + 3 + Math.floor(c / 3), ze);
      h < 0 || d.push(e.spawnUnit(ze, r, h % e.size + 0.5, Math.floor(h / e.size) + 0.5));
    }
    for (const c of d)
      e.task[c] = Ss, e.amx[c] = e.x[i], e.amz[c] = e.z[i], e.rallyX[c] = e.x[i], e.rallyZ[c] = e.z[i];
    e.orderMove(d, e.x[i], e.z[i]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * ve;
}
function ir(e, t) {
  let a = -1, s = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.owner[o] >= 0 && e.owner[o] < e.players.length && !e.players[e.owner[o]].defeated) {
    const i = e.x[o] - e.x[t], n = e.z[o] - e.z[t], r = i * i + n * n;
    r < s && (s = r, a = o);
  }
  return a;
}
const ht = 4096, Lt = 0, ce = 1, _t = 0, Xt = 1, le = 2, Vt = 3, Ss = 4, ts = 5, eh = 30, Ve = 60, Ke = 0, K0 = 1, io = 2, es = 0, Hs = 1, Jo = 2, Zo = 3, Ts = 4, mo = [1, -1, 0, 0, 1, 1, -1, -1], go = [0, 0, 1, -1, 1, -1, 1, -1], nr = [10, 10, 10, 10, 14, 14, 14, 14], X0 = 4294967295;
class ah {
  constructor(t, a) {
    g(this, "dist");
    this.goal = t, this.dist = new Uint32Array(a).fill(X0);
  }
}
const xs = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && xs.push([t, e]);
xs.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const as = xs, rr = /* @__PURE__ */ new Map();
function sh(e) {
  let t = rr.get(e);
  if (t) return t;
  const a = [];
  for (let s = -e; s <= e; s++) for (let o = -e; o <= e; o++) o * o + s * s <= e * e + e && a.push(o, s);
  return t = new Int16Array(a), rr.set(e, t), t;
}
class $n {
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
    /** D41: quando foi o último aviso "um muro inimigo fecha o caminho" para cada tribo (só a interface usa) */
    g(this, "avisoMuroInimigo", []);
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
    this.map = E0(t, a, s.mapa ?? zn), this.size = this.map.size, this.rng = new $0(t), this.difficulty = s.difficulty ?? 1;
    const o = this.size * this.size;
    this.blocked = new Uint8Array(o), this.bAt = new Int16Array(o), this.resKind = new Uint8Array(o), this.resAmt = new Int32Array(o), this.muroDono = new Int8Array(o), this.estrada = new Uint8Array(o);
    for (let r = 0; r < o; r++) {
      const l = this.map.terrain[r];
      (zs(l) || this.map.tree[r]) && (this.blocked[r] = 1), this.map.tree[r] && (this.resAmt[r] = this.map.wood[r] * 100);
    }
    for (const r of this.map.res) {
      const l = r.z * this.size + r.x;
      this.resKind[l] = r.kind, this.resAmt[l] = r.amount * 100, this.blocked[l] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(o), this.aG = new Int32Array(o), this.aFrom = new Int32Array(o), this.aClosed = new Int32Array(o), this.aHeap = new Float64Array(o * 2), this.regras = T0(s.regras);
    const i = s.humans ?? 1, n = s.humanos;
    s.times && s.times.length === a && (this.times = s.times.slice()), this.map.starts.forEach((r, l) => {
      this.players.push({ id: l, color: Mn[l], start: { x: r.x, z: r.z }, ai: n ? !n.includes(l) : l >= i, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0, fundada: -1 }), this.vis.push(new Uint8Array(o)), this.explored.push(new Uint8Array(o)), this.spawnBuilding(l, "center", r.x - 2, r.z - 2, !0);
      for (let d = 0; d < (this.beta ? Uc : 4); d++) this.spawnUnit(l, "villager", r.x - r.ux * 4 + (d - 1.5) * 1.1, r.z - r.uz * 4 + d % 2 * 0.8);
      this.beta || this.spawnUnit(l, "dog", r.x - r.ux * 3 - r.uz * 3, r.z - r.uz * 3 + r.ux * 3), this.ai.push({ next: 20 + l * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((r, l) => {
      for (const [d, c] of r.spots) {
        const h = this.spawnUnit(Rt, r.kind, d + 0.5, c + 0.5);
        this.herd[h] = l, this.tmr[h] = h * 7 % 60;
      }
    });
    for (const r of this.map.camps) this.spawnBuilding(ze, "camp", r.x - 2, r.z - 2, !0);
    if (this.barbNext = 12 * ve, s.testUnits) {
      const r = this.map.starts[0];
      let l = 0;
      for (let d = 0; d < 40 && l < s.testUnits; d++) for (let c = 0; c < 20 && l < s.testUnits; c++) {
        const h = r.x - r.ux * 9 + (c - 10) * 0.9, f = r.z - r.uz * 9 - d * 0.9 * (r.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(h * J), Math.round(f * J)) || (this.spawnUnit(0, "warrior", h, f), l++);
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
    const a = this.size, s = t % a, o = (t - s) / a;
    for (let i = 0; i < 8; i++) {
      const n = s + mo[i], r = o + go[i];
      if (n >= 0 && r >= 0 && n < a && r < a && !this.blocked[r * a + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return X[this.kind[t]];
  }
  bdef(t) {
    return lt[this.kind[t] - ut];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < Tt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= ut;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === Rt;
  }
  hostile(t, a) {
    if (t === a || t === Rt || a === Rt) return !1;
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
    return !!s && (s.tech & 1 << Go[a]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, a) {
    for (let s = 0; s < this.top; s++) if (this.isBuilding(s) && this.owner[s] === t && this.queue[s].includes(Se + a)) return !0;
    return !1;
  }
  /** tropa de uma tribo (não coletor, bicho nem bárbaro) */
  soldier(t) {
    const a = X[this.kind[t]].cls;
    return a !== "villager" && a !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const a = X[this.kind[t]];
    if (!this.soldier(t)) return a.atk;
    const s = this.owner[t];
    return a.atk + (this.hasTech(s, "bronze") ? 1 : 0) + (this.hasTech(s, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return X[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return ((this.beta ? Hc[0] : Rc) + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  // regras beta: leva mais por viagem
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * ve && this.tick % (3 * ve) < wc;
  }
  /** o festival romano deste mês para a tribo (D39): do Reino em diante, um por mês; antes disso, nenhum */
  festaDe(t) {
    const a = this.players[t];
    return a && a.era >= te && !a.defeated ? ji[this.month].ef : null;
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
    this.state[t] = Lt, this.task[t] = _t, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0, this.alvo2[t] = -1, this.fugaDe[t] = 0, this.firme[t] = 0, this.aPagar[t] = 0;
  }
  spawnUnit(t, a, s, o) {
    const i = this.alloc();
    return this.reset(i), this.alive[i] = 1, this.kind[i] = mt[a], this.owner[i] = t, this.x[i] = this.px[i] = Math.round(s * J), this.z[i] = this.pz[i] = Math.round(o * J), this.hp[i] = X[mt[a]].hp, i;
  }
  spawnCarcass(t, a, s, o) {
    const i = this.alloc();
    return this.reset(i), this.alive[i] = 1, this.kind[i] = Tt, this.owner[i] = Rt, this.sub[i] = t, this.x[i] = this.px[i] = a, this.z[i] = this.pz[i] = s, this.work[i] = o * 100, this.hp[i] = 1, i;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, a, s, o, i) {
    const n = this.alloc();
    this.reset(n);
    const r = lt[wt[a]];
    this.alive[n] = 1, this.kind[n] = ut + wt[a], this.owner[n] = t, this.x[n] = this.px[n] = s * J + r.size * 128, this.z[n] = this.pz[n] = o * J + r.size * 128, this.done[n] = i ? 1 : 0, this.hp[n] = i ? r.hp : Math.max(1, r.hp / 10 | 0);
    for (let l = 0; l < r.size; l++) for (let d = 0; d < r.size; d++) {
      const c = (o + l) * this.size + s + d;
      this.bAt[c] = n + 1, !r.walk && !r.wall && this.setBlocked(c, 1);
    }
    return !r.walk && !r.wall && this.tiraDeCima(s, o, r.size), i && r.wall && this.muroPronto(n), i && r.estrada && (this.estrada[o * this.size + s] = 1), this.events.push({ t: "placed", e: n }), n;
  }
  /** quem está em cima de uma construção nova (o retângulo tx, tz de lado s) vai para o tile livre mais perto. D41: uma
   *  casa posta onde os coletores estavam os prendia lá dentro para sempre (com o computador e com quem joga) */
  tiraDeCima(t, a, s) {
    for (let o = 0; o < this.top; o++) {
      if (!this.isUnit(o)) continue;
      const i = this.x[o] >> 8, n = this.z[o] >> 8;
      if (i < t || i >= t + s || n < a || n >= a + s) continue;
      const r = this.nearestFree(i, n, this.owner[o]);
      r < 0 || (this.x[o] = this.px[o] = r % this.size * J + 128, this.z[o] = this.pz[o] = Math.floor(r / this.size) * J + 128, this.path[o] = null, this.field[o] = null);
    }
  }
  footprint(t) {
    const a = this.bdef(t).size;
    return [(this.x[t] >> 8) - (a >> 1), (this.z[t] >> 8) - (a >> 1), a];
  }
  remove(t) {
    if (this.kind[t] >= ut) {
      const [a, s, o] = this.footprint(t), i = this.bdef(t).walk, n = this.bdef(t).wall;
      n && this.done[t] && this.muroFora(t), this.bdef(t).estrada && (this.estrada[s * this.size + a] = 0);
      for (let r = 0; r < o; r++) for (let l = 0; l < o; l++) {
        const d = (s + r) * this.size + a + l;
        this.bAt[d] = 0, !i && !n && this.setBlocked(d, 0);
      }
      this.events.push({ t: "gone", e: t });
    }
    this.alive[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [];
  }
  /** bloqueado para quem é do dono o (sem o: só o fixo) */
  blockedAt(t, a, s) {
    const o = t >> 8, i = a >> 8;
    return o < 0 || i < 0 || o >= this.size || i >= this.size ? !0 : (s === void 0 ? this.blocked : this.bloqueioDe(s))[i * this.size + o] === 1;
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
    for (let o = 0; o < this.bloq.length; o++) this.bloq[o][t] = this.blocked[t] || a >= 0 && !this.passaMuro(o < s ? o : o === s ? ze : Rt, a) ? 1 : 0;
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
      for (let o = 0; o < this.top; o++) if (this.isUnit(o) && (this.z[o] >> 8) * this.size + (this.x[o] >> 8) === a && !this.passaMuro(this.owner[o], s)) {
        const i = this.nearestFree(this.x[o] >> 8, this.z[o] >> 8, this.owner[o]);
        if (i < 0) continue;
        this.x[o] = this.px[o] = i % this.size * J + 128, this.z[o] = this.pz[o] = Math.floor(i / this.size) * J + 128, this.path[o] = null, this.field[o] = null;
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
    return t >= te ? "tufa" : t >= 2 ? "wall" : t >= 1 ? "palisade" : null;
  }
  /** o muro de quem não é amigo que fecha o caminho de e até o retângulo (num caminho que ignora esses muros): o bloco a
   *  derrubar, ou -1 (não há caminho nem assim, ou o caminho não passa por muro) */
  muroNoCaminho(t, a, s, o, i) {
    const n = this.owner[t], r = this.size, l = (this.z[t] >> 8) * r + (this.x[t] >> 8), d = this.findPath(l, a, s, o, i, 12e3, this.blocked, !1);
    if (!d || this.lastPartial) return -1;
    const c = (f) => {
      const u = this.muroDono[f] - 1;
      return u >= 0 && !this.passaMuro(n, u) && this.bAt[f] ? this.bAt[f] - 1 : -1;
    };
    let h = l;
    for (const f of d) {
      let u = c(f);
      const p = h % r, v = (h - p) / r, y = f % r, k = (f - y) / r;
      if (u < 0 && p !== y && v !== k && (u = c(v * r + y), u < 0 && (u = c(k * r + p))), u >= 0) return u;
      h = f;
    }
    return -1;
  }
  canPlace(t, a, s, o) {
    const i = lt[wt[a]], n = this.size;
    if (s < 1 || o < 1 || s + i.size >= n - 1 || o + i.size >= n - 1) return !1;
    for (let r = 0; r < i.size; r++) for (let l = 0; l < i.size; l++) {
      const d = (o + r) * n + s + l, c = this.map.terrain[d];
      if (this.blocked[d] || this.bAt[d] || zs(c) || c === Pa || !this.explored[t][d]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, d = this.z[r] >> 8;
      if (l >= s && l < s + i.size && d >= o && d < o + i.size && this.state[r] === Lt && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  /** quanto o mercado b dá por 100 (a basílica paga melhor; na feira, ou no mês dos jogos, mais ainda) */
  troca(t, a) {
    const s = this.bdef(t).troca, o = this.feiraDe(a);
    return s ? o ? s.fair : s.get : o ? Va.fair : Va.get;
  }
  canAfford(t, a) {
    const s = this.players[t].res;
    return Ga.every((o) => s[o] >= (a[o] ?? 0) * 100);
  }
  pay(t, a) {
    const s = this.players[t].res;
    for (const o of Ga) s[o] -= (a[o] ?? 0) * 100;
  }
  refund(t, a) {
    const s = this.players[t].res;
    for (const o of Ga) s[o] += (a[o] ?? 0) * 100;
  }
  pop(t) {
    let a = 0;
    for (let s = 0; s < this.top; s++) this.isUnit(s) && this.owner[s] === t && (a += this.udef(s).pop);
    return a;
  }
  popCap(t) {
    const a = this.players[t].era;
    let s = 0;
    for (let o = 0; o < this.top; o++) this.isBuilding(o) && this.owner[o] === t && this.done[o] && this.bdef(o).pop && (s += this.vagas(this.bdef(o).key, a));
    return Math.min(this.limiteEra(a), s);
  }
  /** a população máxima da era (regras beta: 12 na primeira, 30 na última) */
  limiteEra(t) {
    return this.beta ? Ln[Math.min(t, Ln.length - 1)] : Oc[t];
  }
  /** quantas vagas a construção dá nesta era (o Centro e a casa; regras beta: 4 cada) */
  vagas(t, a) {
    const s = lt[wt[t]];
    return s?.pop ? this.beta ? s.pop[Math.min(a, s.pop.length - 1)] ? t === "center" ? Fc : t === "aqueduct" ? jc : Lc : 0 : s.pop[Math.min(a, s.pop.length - 1)] : 0;
  }
  /** tipos de construção da era atual já prontos (requisito para avançar) */
  eraBuildingTypes(t) {
    const a = this.players[t].era, s = /* @__PURE__ */ new Set();
    for (let o = 0; o < this.top; o++) this.isBuilding(o) && this.owner[o] === t && this.done[o] && this.bdef(o).buildable && !this.bdef(o).wall && !this.bdef(o).estrada && this.bdef(o).era === a && s.add(this.bdef(o).key);
    return s.size;
  }
  // muros (D35) e estradas (M3) não contam
  // ── geometria ──
  /** distância (sub-tiles) da unidade até a borda do alvo (construção, tile ou unidade) */
  reach(t, a, s) {
    let o, i, n, r;
    if (s) {
      const c = a % this.size, h = (a - c) / this.size;
      o = c * J, i = h * J, n = o + J, r = i + J;
    } else if (this.kind[a] >= ut) {
      const [c, h, f] = this.footprint(a);
      o = c * J, i = h * J, n = o + f * J, r = i + f * J;
    } else {
      const c = this.x[a] - this.x[t], h = this.z[a] - this.z[t];
      return Math.max(0, ha(c * c + h * h) - (this.kind[a] < Tt ? Math.round(X[this.kind[a]].radius * J) : 64));
    }
    const l = Math.max(o - this.x[t], 0, this.x[t] - n), d = Math.max(i - this.z[t], 0, this.z[t] - r);
    return ha(l * l + d * d);
  }
  // ── caminho ──
  /** o tile livre mais perto (para quem é do dono o; sem o, só o fixo) */
  /** há muro de quem não é amigo de o na linha reta entre os dois pontos? (quem está do outro lado do muro não alcança) */
  /** há bloco de muro pronto (de qualquer dono) entre os dois pontos (contando o tile de cada ponta: quem está dentro dos
   *  troncos também não acerta)? O golpe de perto não passa pelos troncos nem pelas pedras (D35): quem luta de perto
   *  precisa estar do mesmo lado */
  muroNoMeio(t, a, s, o) {
    const i = this.size;
    let n = t >> 8, r = a >> 8;
    const l = s >> 8, d = o >> 8, c = (y) => this.muroDono[y] > 0, h = Math.abs(l - n), f = Math.abs(d - r), u = n < l ? 1 : -1, p = r < d ? 1 : -1;
    let v = h - f;
    for (let y = 0; y < 64; y++) {
      if (n < 0 || r < 0 || n >= i || r >= i) return !1;
      if (c(r * i + n)) return !0;
      if (n === l && r === d) return !1;
      const k = 2 * v;
      if (k > -f && k < h && (c(r * i + n + u) || c((r + p) * i + n))) return !0;
      k > -f && (v -= f, n += u), k < h && (v += h, r += p);
    }
    return !1;
  }
  muroNaLinha(t, a, s, o, i) {
    const n = this.size;
    let r = t >> 8, l = a >> 8;
    const d = s >> 8, c = o >> 8, h = (k) => {
      const M = this.muroDono[k] - 1;
      return M >= 0 && !this.passaMuro(i, M);
    }, f = Math.abs(d - r), u = Math.abs(c - l), p = r < d ? 1 : -1, v = l < c ? 1 : -1;
    let y = f - u;
    for (let k = 0; k < 64; k++) {
      if (r < 0 || l < 0 || r >= n || l >= n) return !1;
      if (h(l * n + r)) return !0;
      if (r === d && l === c) return !1;
      const M = 2 * y;
      if (M > -u && M < f && (h(l * n + r + p) || h((l + v) * n + r))) return !0;
      M > -u && (y -= u, r += p), M < f && (y += f, l += v);
    }
    return !1;
  }
  /** tem bloco de muro (de qualquer dono, pronto, em obra ou só marcado) no tile k? A tribo passa por ele, mas ninguém para
   *  em cima: sumiria dentro dos troncos (D35) */
  ehMuro(t) {
    const a = this.bAt[t] - 1;
    return a >= 0 && lt[this.kind[a] - ut].wall === !0;
  }
  /** quem ficou parado em cima de um bloco de muro (o muro ficou pronto embaixo dele, ou foi empurrado) anda até o espaço
   *  livre mais perto, logo ao lado; a tarefa dele continua de lá (D35) */
  saiDoMuro() {
    const t = this.size;
    for (let a = 0; a < this.top; a++) {
      if (!this.alive[a] || this.kind[a] >= Tt || this.state[a] === ce) continue;
      const s = this.x[a] >> 8, o = this.z[a] >> 8;
      if (s < 0 || o < 0 || s >= t || o >= t || !this.ehMuro(o * t + s)) continue;
      const i = this.bloqueioDe(this.owner[a]);
      let n = -1, r = 1 / 0;
      for (let l = 1; l <= 3 && n < 0; l++) for (let d = -l; d <= l; d++) for (let c = -l; c <= l; c++) {
        if (Math.max(Math.abs(c), Math.abs(d)) !== l) continue;
        const h = s + c, f = o + d;
        if (h < 0 || f < 0 || h >= t || f >= t) continue;
        const u = f * t + h;
        if (i[u] || this.bAt[u]) continue;
        const p = h * J + 128 - this.x[a], v = f * J + 128 - this.z[a], y = p * p + v * v;
        y < r && (r = y, n = u);
      }
      n >= 0 && this.goPoint(a, n % t * J + 128, Math.floor(n / t) * J + 128);
    }
  }
  nearestFree(t, a, s) {
    const o = s === void 0 ? this.blocked : this.bloqueioDe(s);
    for (const [i, n] of xs) {
      const r = t + i, l = a + n;
      if (r >= 0 && l >= 0 && r < this.size && l < this.size && !o[l * this.size + r] && !this.ehMuro(l * this.size + r)) return l * this.size + r;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, a, s, o, i, n = 16e3, r = this.blocked, l = !0) {
    const d = this.size, c = ++this.aId, h = this.aG, f = this.aFrom, u = this.aStamp, p = this.aClosed, v = this.aHeap;
    this.lastPartial = !1;
    const y = (q, O) => {
      const H = Math.max(a - q, 0, q - o), U = Math.max(s - O, 0, O - i);
      return 15 * Math.max(H, U) + 6 * Math.min(H, U);
    }, k = t % d, M = (t - k) / d;
    if (k >= a && k <= o && M >= s && M <= i) return [];
    let x = 0;
    const z = (q) => {
      let O = x++;
      for (v[O] = q; O > 0; ) {
        const H = O - 1 >> 1;
        if (v[H] <= v[O]) break;
        const U = v[H];
        v[H] = v[O], v[O] = U, O = H;
      }
    }, A = () => {
      const q = v[0];
      v[0] = v[--x];
      let O = 0;
      for (; ; ) {
        const H = O * 2 + 1, U = H + 1;
        let R = O;
        if (H < x && v[H] < v[R] && (R = H), U < x && v[U] < v[R] && (R = U), R === O) break;
        const L = v[R];
        v[R] = v[O], v[O] = L, O = R;
      }
      return q;
    };
    u[t] = c, h[t] = 0, f[t] = -1, z(y(k, M) * 65536 + t);
    let $ = t, P = y(k, M), I = -1, C = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; x > 0 && C < n; ) {
      const q = A(), O = q % 65536;
      if (p[O] === c) continue;
      p[O] = c, C++;
      const H = O % d, U = (O - H) / d, R = y(H, U), L = this.ehMuro(O);
      if (R === 0 && !L) {
        I = O;
        break;
      }
      R < P && !L && (P = R, $ = O);
      for (let Y = 0; Y < 8; Y++) {
        const ot = H + mo[Y], ft = U + go[Y];
        if (ot < 0 || ft < 0 || ot >= d || ft >= d) continue;
        const dt = ft * d + ot;
        if (r[dt] || p[dt] === c || Y >= 4 && (r[U * d + ot] || r[ft * d + H])) continue;
        const St = h[O] + nr[Y];
        (u[dt] !== c || St < h[dt]) && (u[dt] = c, h[dt] = St, f[dt] = O, z((St + y(ot, ft)) * 65536 + dt));
      }
    }
    this.lastPartial = I < 0, this.nodesTick += C;
    const w = I >= 0 ? I : $;
    if (w === t) return I >= 0 ? [] : null;
    const F = [];
    for (let q = w; q !== t && q >= 0; q = f[q]) F.push(q);
    if (F.reverse(), !l) return F;
    const V = [];
    let S = t;
    for (let q = 0; q < F.length; ) {
      let O = Math.min(F.length - 1, q + 12);
      for (; O > q && !this.clear(S, F[O], r); ) O--;
      V.push(F[O]), S = F[O], q = O + 1;
    }
    return V;
  }
  clear(t, a, s) {
    const o = this.size;
    let i = t % o, n = (t - i) / o;
    const r = a % o, l = (a - r) / o, d = Math.abs(r - i), c = Math.abs(l - n), h = i < r ? 1 : -1, f = n < l ? 1 : -1;
    let u = d - c;
    for (let p = 0; p < 64; p++) {
      if (s[n * o + i]) return !1;
      if (i === r && n === l) return !0;
      const v = 2 * u;
      if (v > -c && v < d && (s[n * o + i + h] || s[(n + f) * o + i]))
        return !1;
      v > -c && (u -= c, i += h), v < d && (u += d, n += f);
    }
    return !1;
  }
  /** manda uma unidade até perto de um retângulo de tiles (alvo) ou de um ponto */
  goTo(t, a, s, o, i, n, r, l = 16e3) {
    const d = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), c = this.size, h = this.bloqueioDe(this.owner[t]);
    let f = !1;
    for (let k = Math.max(0, s); k <= Math.min(c - 1, i) && !f; k++) for (let M = Math.max(0, a); M <= Math.min(c - 1, o); M++) if (!h[k * c + M]) {
      f = !0;
      break;
    }
    if (!f)
      return this.lastPartial = !0, this.state[t] = Lt, !1;
    const u = this.findPath(d, a, s, o, i, l, h);
    if (this.field[t] = null, !u)
      return this.state[t] = Lt, !1;
    this.path[t] = u, this.pathI[t] = 0;
    const p = u.length ? u[u.length - 1] : d, v = p % this.size, y = (p - v) / this.size;
    return this.slotX[t] = n ?? v * J + 128, this.slotZ[t] = r ?? y * J + 128, this.state[t] = ce, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  /** campo de fluxo completo até um tile, guardado e reaproveitado por 1 minuto (destinos longe) */
  flowTo(t, a) {
    const s = t * 8 + this.iBloq(a), o = this.flowCache.get(s);
    if (o && this.tick - o.t < 600) return o.f;
    const i = this.buildFlow(t, [], a);
    if (this.flowCache.set(s, { f: i, t: this.tick }), this.flowCache.size > 12) {
      let n = -1, r = 1 / 0;
      for (const [l, d] of this.flowCache) d.t < r && (r = d.t, n = l);
      this.flowCache.delete(n);
    }
    return i;
  }
  /** vai longe seguindo o campo de fluxo (sem A*) */
  goFar(t, a, s) {
    const o = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)), this.owner[t]);
    if (o < 0) return !1;
    const i = this.flowTo(o, this.owner[t]);
    if (i.dist[(this.z[t] >> 8) * this.size + (this.x[t] >> 8)] === X0) {
      const n = o % this.size, r = (o - n) / this.size;
      return this.goTo(t, n, r, n, r, void 0, void 0, 4e3);
    }
    return this.field[t] = i, this.path[t] = null, this.lastPartial = !1, this.slotX[t] = o % this.size * J + 128, this.slotZ[t] = Math.floor(o / this.size) * J + 128, this.state[t] = ce, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  far(t, a, s) {
    const o = a - this.x[t], i = s - this.z[t];
    return o * o + i * i > (22 * J) ** 2;
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
        const d = l >> 1;
        return this.goTo(t, n + d, r + d, n + d, r + d, this.x[a], this.z[a], 8e3);
      }
      return this.goTo(t, n - 1, r - 1, n + l, r + l, void 0, void 0, 8e3);
    }
    const o = this.x[a] >> 8, i = this.z[a] >> 8;
    return this.goTo(t, o - 1, i - 1, o + 1, i + 1, this.x[a], this.z[a], 3e3);
  }
  goPoint(t, a, s) {
    if (this.far(t, a, s)) {
      this.goFar(t, a, s);
      return;
    }
    const o = this.owner[t], i = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)), o);
    if (i < 0) return;
    const n = i % this.size, r = (i - n) / this.size, l = !this.bloqueioDe(o)[(s >> 8) * this.size + (a >> 8)];
    this.goTo(t, n, r, n, r, l ? a : n * J + 128, l ? s : r * J + 128);
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
    return this.pending = this.pending.filter((a) => !a.ext), t.map(({ at: a, seq: s, ext: o, ...i }) => i);
  }
  own(t) {
    return t.ids.filter((a) => this.isUnit(a) && this.owner[a] === t.player);
  }
  apply(t) {
    const a = this.players[t.player];
    if (!(!a || a.defeated)) {
      if ("ids" in t) {
        const s = t.ext === 1;
        for (const o of t.ids) this.isUnit(o) && this.owner[o] === t.player && (this.alvo2[o] = -1, s && (this.firme[o] = this.tick + eh));
      }
      switch (t.type) {
        case "move":
        case "amove": {
          const s = this.own(t);
          for (const o of s)
            this.task[o] = t.type === "amove" ? Ss : _t, this.amx[o] = t.x, this.amz[o] = t.z, this.rallyX[o] = t.type === "amove" ? t.x : -1, this.rallyZ[o] = t.type === "amove" ? t.z : -1, this.tgt[o] = -1, this.aggro[o] = 0, this.fails[o] = 0;
          this.orderMove(s, t.x, t.z);
          break;
        }
        case "stop":
          for (const s of this.own(t))
            this.task[s] = _t, this.state[s] = Lt, this.path[s] = null, this.field[s] = null, this.foodMode[s] = 0;
          break;
        case "food":
          for (const s of this.own(t)) this.kind[s] === mt.villager && (this.foodMode[s] = t.on ? 2 : 0);
          break;
        case "disband": {
          const s = this.own(t);
          if (!s.length) return;
          for (const o of s)
            this.events.push({ t: "death", x: this.x[o], z: this.z[o], kind: this.kind[o], owner: this.owner[o] }), this.remove(o);
          this.events.push({ t: "msg", player: t.player, key: "dispensadas." + s.length });
          break;
        }
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === Ie && a.era < 2 || this.resKind[t.k] === Ae && a.era < te) return;
          const s = this.resKind[t.k] === xe;
          for (const o of this.own(t)) this.kind[o] === mt.villager && (this.task[o] = Xt, this.tgt[o] = t.k, this.tgtTile[o] = 1, this.phase[o] = Ke, this.fails[o] = 0, s || (this.foodMode[o] = 0), this.goNear(o, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const s = t.target;
          if (!this.alive[s]) return;
          for (const o of this.own(t)) {
            const i = this.kind[o] === mt.villager;
            if (this.kind[s] >= ut && this.owner[s] === t.player) {
              if (!i) continue;
              this.done[s] ? this.bdef(s).key === "farm" ? (this.task[o] = Xt, this.tgt[o] = s, this.tgtTile[o] = 0, this.phase[o] = Ke, this.goNear(o, s, !1)) : this.bdef(s).drop && this.carry[o] > 0 && (this.task[o] = Xt, this.phase[o] = io, this.tgt[o] = -1, this.goNear(o, s, !1)) : (this.task[o] = le, this.tgt[o] = s, this.tgtTile[o] = 0, this.goNear(o, s, !1));
              continue;
            }
            if (this.kind[s] === Tt) {
              i && (this.task[o] = Xt, this.tgt[o] = s, this.tgtTile[o] = 0, this.phase[o] = Ke, this.goNear(o, s, !1));
              continue;
            }
            X[this.kind[o]].siege && this.kind[s] < ut || (this.owner[s] === Rt || this.hostile(t.player, this.owner[s])) && (this.task[o] = Vt, this.tgt[o] = s, this.tgtTile[o] = 0, this.goNear(o, s, !1));
          }
          break;
        }
        case "build": {
          const s = this.own(t).filter((n) => this.kind[n] === mt.villager), o = lt[wt[t.key]];
          if (!s.length || !o?.buildable || o.era > a.era || !this.canAfford(t.player, o.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, o.cost);
          const i = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of s)
            this.task[n] = le, this.tgt[n] = i, this.tgtTile[n] = 0, this.goNear(n, i, !1);
          break;
        }
        case "train": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !kn(this.bdef(s), a.era).includes(t.key) || this.queue[s].length >= 5) return;
          const i = X[mt[t.key]];
          if (!this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), this.queue[s].push(mt[t.key]);
          break;
        }
        case "cancel": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.queue[s].length) return;
          const o = this.queue[s].pop();
          this.refund(t.player, o >= Se ? Ca[o - Se].cost : X[o].cost), this.queue[s].length || (this.work[s] = 0);
          break;
        }
        case "ageup": {
          const s = t.building, o = He[a.era];
          if (!o || a.era >= xn || a.aging || !this.isBuilding(s) || this.owner[s] !== t.player || this.bdef(s).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), a.aging = o.time * 10, a.agingB = s;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const s = t.building, o = Go[t.key], i = Ca[o];
          if (!i || !this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !(this.bdef(s).research ?? []).includes(t.key) || a.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, o) || i.needs && !this.hasTech(t.player, i.needs) || this.queue[s].length >= 5 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), this.queue[s].push(Se + o);
          break;
        }
        case "trade": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !this.bdef(s).market || t.give === t.get || !Qa.includes(t.give) || !Qa.includes(t.get) || (t.give === "coins" || t.get === "coins") && a.era < te || a.res[t.give] < Va.give * 100) return;
          a.res[t.give] -= Va.give * 100, a.res[t.get] += this.troca(s, t.player) * 100;
          break;
        }
        case "ia":
          a.ai = !0;
          break;
        // M6: o computador assume (a IA continua de onde a tribo estava)
        case "road": {
          const s = lt[wt.road], o = this.own(t).filter((n) => this.kind[n] === mt.villager);
          if (s.era > a.era || !o.length || !this.canAfford(t.player, s.cost)) return;
          const i = [];
          for (const n of t.tiles.slice(0, Ve)) {
            const r = n % this.size, l = (n - r) / this.size;
            if (n < 0 || n >= this.size * this.size || !this.canPlace(t.player, "road", r, l)) continue;
            const d = this.spawnBuilding(t.player, "road", r, l, !1);
            this.aPagar[d] = 1, i.push(d);
          }
          if (!i.length) return;
          for (const n of o)
            this.task[n] = le, this.tgt[n] = i[0], this.tgtTile[n] = 0, this.goNear(n, i[0], !1);
          break;
        }
        case "wall": {
          const s = this.muroDaEra(a.era), o = this.own(t).filter((r) => this.kind[r] === mt.villager);
          if (!s || !o.length) return;
          const i = lt[wt[s]], n = [];
          if (!this.canAfford(t.player, i.cost)) return;
          for (const r of t.tiles.slice(0, Ve)) {
            const l = r % this.size, d = (r - l) / this.size;
            if (r < 0 || r >= this.size * this.size || !this.canPlace(t.player, s, l, d)) continue;
            const c = this.spawnBuilding(t.player, s, l, d, !1);
            this.aPagar[c] = 1, n.push(c);
          }
          if (!n.length) return;
          for (const r of o)
            this.task[r] = le, this.tgt[r] = n[0], this.tgtTile[r] = 0, this.goNear(r, n[0], !1);
          break;
        }
      }
    }
  }
  orderMove(t, a, s) {
    if (!t.length) return;
    const o = this.owner[t[0]], i = this.bloqueioDe(o), n = this.size, r = this.nearestFree(Math.min(n - 1, Math.max(0, a >> 8)), Math.min(n - 1, Math.max(0, s >> 8)), o);
    if (r < 0) return;
    if (t.length === 1) {
      this.goPoint(t[0], a, s);
      return;
    }
    const l = i[(s >> 8) * n + (a >> 8)], d = l ? r % n * J + 128 : a, c = l ? Math.floor(r / n) * J + 128 : s;
    t.sort((u, p) => {
      const v = (this.x[u] - d) ** 2 + (this.z[u] - c) ** 2, y = (this.x[p] - d) ** 2 + (this.z[p] - c) ** 2;
      return v - y || u - p;
    });
    const h = this.buildFlow(r, t, o);
    let f = 0;
    for (const u of t) {
      let p = d, v = c;
      for (; f < xs.length; ) {
        const [y, k] = xs[f++], M = d + y * 218, x = c + k * 218;
        if (!this.blockedAt(M, x, o) && !this.ehMuro((x >> 8) * n + (M >> 8))) {
          p = M, v = x;
          break;
        }
      }
      this.slotX[u] = p, this.slotZ[u] = v, this.state[u] = ce, this.field[u] = h, this.path[u] = null, this.stuck[u] = 0, this.best[u] = 2147483647;
    }
  }
  buildFlow(t, a, s) {
    const o = this.size, i = o * o, n = new ah(t, i), r = n.dist, l = this.bloqueioDe(s), d = /* @__PURE__ */ new Set();
    for (const v of a) d.add((this.z[v] >> 8) * o + (this.x[v] >> 8));
    const c = this.aHeap;
    let h = 0;
    const f = (v) => {
      let y = h++;
      for (c[y] = v; y > 0; ) {
        const k = y - 1 >> 1;
        if (c[k] <= c[y]) break;
        const M = c[k];
        c[k] = c[y], c[y] = M, y = k;
      }
    }, u = () => {
      const v = c[0];
      c[0] = c[--h];
      let y = 0;
      for (; ; ) {
        const k = y * 2 + 1, M = k + 1;
        let x = y;
        if (k < h && c[k] < c[x] && (x = k), M < h && c[M] < c[x] && (x = M), x === y) break;
        const z = c[x];
        c[x] = c[y], c[y] = z, y = x;
      }
      return v;
    };
    r[t] = 0, f(t);
    let p = a.length ? d.size : -1;
    for (; h > 0; ) {
      const v = u(), y = v % 65536, k = (v - y) / 65536;
      if (k > r[y]) continue;
      if (p > 0 && d.has(y) && (d.delete(y), --p <= 0 && k > 400))
        break;
      const M = y % o, x = (y - M) / o;
      for (let z = 0; z < 8; z++) {
        const A = M + mo[z], $ = x + go[z];
        if (A < 0 || $ < 0 || A >= o || $ >= o) continue;
        const P = $ * o + A;
        if (l[P] || z >= 4 && (l[x * o + A] || l[$ * o + M])) continue;
        const I = k + nr[z];
        I < r[P] && (r[P] = I, f(I * 65536 + P));
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
    this.buildHash(), Fd(this), Jc(this), this.saiDoMuro(), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const a = X[this.kind[t]];
    return Math.round((this.fast[t] && a.animal ? a.animal.run : a.speed) * J / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let a = 0; a < this.top; a++) {
      if (!this.alive[a] || this.state[a] !== ce || this.kind[a] >= Tt) continue;
      const s = this.x[a], o = this.z[a], i = this.owner[a], n = this.bloqueioDe(i);
      let r = this.speedOf(a);
      this.estrada[(o >> 8) * t + (s >> 8)] && (r += r >> 1);
      let l = this.slotX[a], d = this.slotZ[a];
      const c = this.path[a];
      if (c && this.pathI[a] < c.length) {
        const $ = c[this.pathI[a]], P = $ % t * J + 128, I = Math.floor($ / t) * J + 128;
        Math.abs(P - s) + Math.abs(I - o) < 110 && this.pathI[a] < c.length - 1 && this.pathI[a]++, (this.pathI[a] < c.length - 1 || Math.abs(P - s) + Math.abs(I - o) >= 110) && (l = P, d = I), this.pathI[a] === c.length - 1 && Math.abs(P - s) + Math.abs(I - o) < 110 && (this.path[a] = null, l = this.slotX[a], d = this.slotZ[a]);
      }
      const h = this.slotX[a] - s, f = this.slotZ[a] - o, u = h * h + f * f;
      if (!this.path[a] && u <= r * r) {
        this.x[a] = this.slotX[a], this.z[a] = this.slotZ[a], this.state[a] = Lt, this.field[a] = null;
        continue;
      }
      const p = this.field[a];
      if (p && !this.path[a] && u > 640 * 640) {
        const $ = s >> 8, P = o >> 8, I = P * t + $;
        let C = p.dist[I], w = -1, F = -1;
        for (let V = 0; V < 8; V++) {
          const S = $ + mo[V], q = P + go[V];
          if (S < 0 || q < 0 || S >= t || q >= t) continue;
          const O = q * t + S;
          n[O] || V >= 4 && (n[P * t + S] || n[q * t + $]) || p.dist[O] < C && (C = p.dist[O], w = S, F = q);
        }
        w >= 0 && (l = w * J + 128, d = F * J + 128);
      }
      const v = l - s, y = d - o, k = ha(v * v + y * y);
      if (k === 0) {
        this.state[a] = Lt;
        continue;
      }
      const M = Math.min(r, k);
      let x = s + Be(v * M, k), z = o + Be(y * M, k);
      (this.blockedAt(x, z, i) || this.quina(s, o, x, z, i)) && (this.blockedAt(x, o, i) ? this.blockedAt(s, z, i) ? (x = s, z = o) : x = s : z = o), this.x[a] = x, this.z[a] = z;
      const A = Math.abs(h) + Math.abs(f);
      A + 24 < this.best[a] ? (this.best[a] = A, this.stuck[a] = 0) : this.stuck[a] = Math.min(255, this.stuck[a] + 1), (this.stuck[a] > 30 || this.stuck[a] > 10 && A < 3 * J && !this.path[a]) && (this.state[a] = Lt, this.field[a] = null, this.path[a] = null);
    }
  }
  buildHash() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    a.fill(-1);
    for (let o = 0; o < this.top; o++) {
      if (!this.alive[o] || this.kind[o] >= Tt) continue;
      const i = Math.min(t - 1, Math.max(0, this.z[o] >> 9)) * t + Math.min(t - 1, Math.max(0, this.x[o] >> 9));
      s[o] = a[i], a[i] = o;
    }
  }
  /** chama fn para cada unidade a até r tiles de (x, z) (usa a grade do tick) */
  near(t, a, s, o) {
    const i = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(s / 2)), r = Math.min(i - 1, (t >> 9) + Math.ceil(s / 2)), l = Math.max(0, (a >> 9) - Math.ceil(s / 2)), d = Math.min(i - 1, (a >> 9) + Math.ceil(s / 2)), c = s * J * (s * J);
    for (let h = l; h <= d; h++) for (let f = n; f <= r; f++) for (let u = this.hashHead[h * i + f]; u !== -1; u = this.hashNext[u]) {
      const p = this.x[u] - t, v = this.z[u] - a;
      p * p + v * v <= c && this.alive[u] && o(u);
    }
  }
  separate() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    this.buildHash();
    for (let o = 0; o < this.top; o++)
      this.pushX[o] = 0, this.pushZ[o] = 0;
    for (let o = 0; o < this.top; o++) {
      if (!this.isUnit(o)) continue;
      const i = Math.round(X[this.kind[o]].radius * J), n = this.x[o] >> 9, r = this.z[o] >> 9;
      for (let l = -1; l <= 1; l++) for (let d = -1; d <= 1; d++) {
        const c = n + d, h = r + l;
        if (!(c < 0 || h < 0 || c >= t || h >= t))
          for (let f = a[h * t + c]; f !== -1; f = s[f]) {
            if (f <= o || !this.isUnit(f)) continue;
            const u = Math.round(X[this.kind[f]].radius * J), p = i + u;
            let v = this.x[f] - this.x[o], y = this.z[f] - this.z[o];
            if (v >= p || v <= -p || y >= p || y <= -p) continue;
            let k = v * v + y * y;
            if (k >= p * p) continue;
            k === 0 && (v = 1 + o % 3, y = 1 + f % 3, k = v * v + y * y);
            const M = ha(k) || 1, x = p - M >> 1, z = Be(v * x, M), A = Be(y * x, M), $ = this.state[o] === ce ? 1 : 2, P = this.state[f] === ce ? 1 : 2;
            this.pushX[o] -= Be(z * $, 2), this.pushZ[o] -= Be(A * $, 2), this.pushX[f] += Be(z * P, 2), this.pushZ[f] += Be(A * P, 2);
          }
      }
    }
    for (let o = 0; o < this.top; o++) {
      if (!this.pushX[o] && !this.pushZ[o]) continue;
      const i = this.x[o] + this.pushX[o], n = this.z[o] + this.pushZ[o], r = this.owner[o];
      !this.blockedAt(i, n, r) && !this.quina(this.x[o], this.z[o], i, n, r) ? (this.x[o] = i, this.z[o] = n) : this.blockedAt(i, this.z[o], r) ? this.blockedAt(this.x[o], n, r) || (this.z[o] = n) : this.x[o] = i;
    }
  }
  /** o passo de (x0, z0) a (x1, z1) cruza na diagonal a quina entre dois tiles bloqueados? D41: o empurrão entre quem se
   *  aperta numa árvore passava gente na diagonal, por entre duas pedras que se tocam pela quina, para dentro de um buraco
   *  fechado, e ela nunca mais saía de lá. Os caminhos já não cortam essas quinas; o passo também não corta */
  quina(t, a, s, o, i) {
    return t >> 8 === s >> 8 || a >> 8 === o >> 8 ? !1 : this.blockedAt(s, a, i) && this.blockedAt(t, o, i);
  }
  updateFog() {
    const t = this.size;
    for (let o = 0; o < this.players.length; o++) {
      const i = this.vis[o], n = this.explored[o];
      i.fill(0);
      for (let r = 0; r < this.top; r++) {
        if (!this.alive[r] || this.owner[r] !== o || this.kind[r] === Tt) continue;
        const l = this.kind[r] >= ut ? this.bdef(r).sight : X[this.kind[r]].sight, d = sh(l), c = this.x[r] >> 8, h = this.z[r] >> 8;
        for (let f = 0; f < d.length; f += 2) {
          const u = c + d[f], p = h + d[f + 1];
          if (u < 0 || p < 0 || u >= t || p >= t) continue;
          const v = p * t + u;
          i[v] = 1, n[v] = 1;
        }
      }
    }
    const a = this.times;
    if (!a) return;
    const s = t * t;
    for (let o = 0; o < a.length; o++) for (let i = o + 1; i < a.length; i++) if (a[o] === a[i]) {
      const n = this.vis[o], r = this.vis[i], l = this.explored[o], d = this.explored[i];
      for (let c = 0; c < s; c++)
        n[c] !== r[c] && (n[c] = r[c] = 1), l[c] !== d[c] && (l[c] = d[c] = 1);
    }
  }
  /** calendário: mês 0 = março */
  get month() {
    return Math.floor(this.tick / ve) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (ve * 12)) + 1;
  }
  drain() {
    const t = this.events;
    return this.events = [], t;
  }
  hash() {
    let t = 2166136261;
    const a = (s) => {
      for (let o = 0; o < 32; o += 8)
        t ^= s >>> o & 255, t = Math.imul(t, 16777619);
    };
    a(this.tick);
    for (let s = 0; s < this.top; s++) this.alive[s] && (a(s), a(this.kind[s]), a(this.owner[s]), a(this.x[s]), a(this.z[s]), a(this.hp[s]), a(this.task[s]), a(this.carry[s]));
    for (const s of this.players) for (const o of Ga) a(s.res[o]);
    return t >>> 0;
  }
}
function Qt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const lr = /* @__PURE__ */ new Set();
function $a(e, t) {
  const a = e + JSON.stringify(t);
  lr.has(a) || (lr.add(a), Qt(e, t));
}
function zi(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function oh(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const ih = ["facil", "normal", "dificil"], nh = [5, 15, 30, 60, 90], De = (e) => new se(e), Kt = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: De("#f4f7fa") },
  uGrassA: { value: De("#6fa84a") },
  uGrassB: { value: De("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: De("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: De("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: De("#5cb8b2") },
  uDeep: { value: De("#1f6079") }
}, Y0 = `
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
#endif`, rh = `
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, J0 = `
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
#endif`, lh = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, ch = `
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
#endif`, dh = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, hh = `
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
function no(e, t = {}) {
  const a = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", HSTEP: "2.0", ...t };
  return e.defines = Object.assign(e.defines || {}, a), e.onBeforeCompile = (s) => {
    for (const o in Kt) s.uniforms[o] = Kt[o];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + Y0).replace("#include <begin_vertex>", `#include <begin_vertex>
` + J0).replace("#include <project_vertex>", `#include <project_vertex>
` + lh), s.fragmentShader = s.fragmentShader.replace("#include <common>", `#include <common>
` + rh).replace("#include <color_fragment>", `#include <color_fragment>
` + ch).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + dh).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + hh);
  }, e.customProgramCacheKey = () => JSON.stringify(a), e;
}
function Z0(e) {
  const t = new fc({ depthPacking: pc });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (a) => {
    for (const s in Kt) a.uniforms[s] = Kt[s];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + Y0).replace("#include <begin_vertex>", `#include <begin_vertex>
` + J0);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const ae = (e = {}, t = {}) => no(new Rs({ flatShading: !0, ...e }), t);
function uh(e) {
  const t = e.hn - 1;
  e.hstep;
  const a = e.size, s = new ci(a, a, t, t).rotateX(-Math.PI / 2).translate(a / 2, 0, a / 2), o = s.attributes.position;
  for (let k = 0; k < o.count; k++) o.setY(k, e.heights[k]);
  const i = s.toNonIndexed(), n = i.attributes.position, r = n.count, l = new Float32Array(r * 3), d = new Float32Array(r * 2), c = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, h = (k) => new se().setRGB(k[0], k[1], k[2], v0), f = Object.fromEntries(Object.entries(c).map(([k, M]) => [k, h(M)])), u = new Ot(), p = new Ot(), v = new Ot();
  for (let k = 0; k < r; k += 3) {
    u.fromBufferAttribute(n, k), p.fromBufferAttribute(n, k + 1), v.fromBufferAttribute(n, k + 2);
    const M = (u.x + p.x + v.x) / 3, x = (u.y + p.y + v.y) / 3, z = (u.z + p.z + v.z) / 3, A = Math.min(a - 1, Math.max(0, Math.floor(M))), $ = Math.min(a - 1, Math.max(0, Math.floor(z))), P = e.terrain[$ * a + A], I = Math.abs(new Ot().subVectors(v, p).cross(new Ot().subVectors(u, p)).normalize().y), C = 0.93 + (k * 2654435761 >>> 0) / 4294967296 * 0.14, w = _a(M * 0.045, z * 0.045, 5, 2);
    let F = null, V = 0;
    if (x < -0.45) F = f.bed;
    else if (P === Vo || P === Pa || P === Ta || x < 0.5) F = f.sand;
    else if (P === Ma || I < 0.66) F = x > 6 ? f.rock2 : f.rock;
    else if (P === ea && x > di - 0.3) F = f.rock2;
    else {
      V = 1;
      const S = 0.86 + w * 0.3 - Math.min(1, Math.max(0, (x - 4) / 12)) * 0.08;
      F = new se(S, S, S);
    }
    for (let S = 0; S < 3; S++) {
      const q = (k + S) * 3;
      l[q] = F.r * C, l[q + 1] = F.g * C, l[q + 2] = F.b * C, d[(k + S) * 2] = V, d[(k + S) * 2 + 1] = w;
    }
  }
  i.setAttribute("color", new Ge(l, 3)), i.setAttribute("aGrass", new Ge(d, 2)), i.computeVertexNormals();
  const y = new ca(i, ae({ vertexColors: !0 }, { TERRAIN: "" }));
  return y.receiveShadow = !0, y.castShadow = !0, y;
}
function fh(e) {
  const t = e.size, a = Math.round(t / 1.6), s = new ci(t, t, a, a).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), o = s.attributes.position, i = new Float32Array(o.count);
  for (let r = 0; r < o.count; r++) i[r] = -zt(e, o.getX(r), o.getZ(r));
  s.setAttribute("aDepth", new Ge(i, 1));
  const n = new ca(s, no(new vn({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const ke = Math.PI * 2, cr = new x0(), dr = new Ms(), hr = new Ot(), ur = new Ot(), ya = new Ot(), Oe = new se();
function m(e = 0, t = 0, a = 0, s = 0, o = 1, i = 1, n = 1, r = 0, l = 0) {
  return cr.set(r, s, l, "YXZ"), dr.setFromEuler(cr), hr.set(e, t, a), ur.set(o, i, n), new ue().compose(hr, dr, ur);
}
function ph() {
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
  return t.setAttribute("position", new Za(e, 3)), t;
}
const bo = {
  box: new Me(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new Ya(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new Ya(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cyl12: new Ya(0.5, 0.5, 1, 12).translate(0, 0.5, 0),
  cone4: new Li(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new Li(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new y0(0.5, 0),
  dode: new mc(0.5, 0),
  prism: ph(),
  hemi: new Ho(0.5, 8, 3, 0, Math.PI * 2, 0, Math.PI / 2)
  // meia esfera (cúpula), base em y = 0
}, Wa = {};
for (const e in bo) Wa[e] = bo[e].index ? bo[e].toNonIndexed() : bo[e];
const fr = /* @__PURE__ */ new Map();
function mh(e, t, a, s) {
  const o = [e, t, a, s].join("/");
  let i = fr.get(o);
  if (!i) {
    const n = new gc(), r = e / 2;
    n.moveTo(-r, 0), n.lineTo(-a, 0), n.lineTo(-a, s), n.absarc(0, s, a, Math.PI, 0, !0), n.lineTo(a, 0), n.lineTo(r, 0), n.lineTo(r, t), n.lineTo(-r, t), n.lineTo(-r, 0);
    const l = new bc(n, { depth: 1, bevelEnabled: !1, curveSegments: 6 }).translate(0, 0, -0.5);
    i = l.index ? l.toNonIndexed() : l, fr.set(o, i);
  }
  return i;
}
class Ra {
  constructor(t = Math.random) {
    g(this, "pos", []);
    g(this, "col", []);
    this.rand = t;
  }
  add(t, a, s, o = 0.06) {
    const i = Wa[t], n = i.attributes.position;
    Oe.set(a);
    const r = 1 + (this.rand() - 0.5) * o;
    for (let l = 0; l < n.count; l++)
      ya.fromBufferAttribute(n, l).applyMatrix4(s), this.pos.push(ya.x, ya.y, ya.z), this.col.push(Oe.r * r, Oe.g * r, Oe.b * r);
    return this;
  }
  /** uma geometria qualquer (sem índice), como as peças de PRIM */
  addGeo(t, a, s, o = 0.06) {
    const i = t.attributes.position;
    Oe.set(a);
    const n = 1 + (this.rand() - 0.5) * o;
    for (let r = 0; r < i.count; r++)
      ya.fromBufferAttribute(i, r).applyMatrix4(s), this.pos.push(ya.x, ya.y, ya.z), this.col.push(Oe.r * n, Oe.g * n, Oe.b * n);
    return this;
  }
  /** polígono plano (convexo), em leque; vira para cima (+y) qualquer que seja a ordem dos pontos */
  poly(t, a, s = 0.06) {
    if (a.length < 3) return this;
    Oe.set(t);
    const o = 1 + (this.rand() - 0.5) * s, [i, n, r] = a, d = (n[2] - i[2]) * (r[0] - i[0]) - (n[0] - i[0]) * (r[2] - i[2]) >= 0 ? a : a.slice().reverse();
    for (let c = 1; c + 1 < d.length; c++) for (const h of [d[0], d[c], d[c + 1]])
      this.pos.push(h[0], h[1], h[2]), this.col.push(Oe.r * o, Oe.g * o, Oe.b * o);
    return this;
  }
  build() {
    const t = new wa();
    return t.setAttribute("position", new Za(this.pos, 3)), t.setAttribute("color", new Za(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const rt = (e) => {
  const t = new Ra();
  return e(t), t.build();
};
function qa(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const vo = new ue().makeScale(0, 0, 0);
function gh(e) {
  const t = new ns(), a = qa(e.seed * 7 + 1), s = e.size, o = {
    oakT: rt((S) => {
      S.add("cyl5", "#6b4a32", m(0, 0, 0, 0, 0.36, 1.8, 0.36)), S.add("cyl5", "#634430", m(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: rt((S) => {
      S.add("ico", "#ffffff", m(0, 0, 0, 0, 2.4, 2, 2.4)), S.add("ico", "#e6e6e6", m(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), S.add("ico", "#f3f3f3", m(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: rt((S) => {
      S.add("cyl5", "#6e4d36", m(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), S.add("cyl5", "#6e4d36", m(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: rt((S) => {
      S.add("ico", "#ffffff", m(0, 0, 0, 0, 3.7, 1.15, 3.5)), S.add("ico", "#e8e8e8", m(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: rt((S) => S.add("cyl5", "#5d4330", m(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: rt((S) => {
      S.add("cone7", "#ffffff", m(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), S.add("cone7", "#ececec", m(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), S.add("cone7", "#f6f6f6", m(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, i = ae({ vertexColors: !0 }), n = [
    { kind: S0, t: o.oakT, c: o.oakC, mat: ae({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: _i, t: o.pineT, c: o.pineC, mat: ae({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: C0, t: o.firT, c: o.firC, mat: ae({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), c = 3, h = (S, q) => Math.min(c - 1, Math.floor(S / s * c)) * c + Math.min(c - 1, Math.floor(q / s * c));
  for (const S of n) {
    const q = [];
    for (let H = 0; H < s * s; H++) e.tree[H] === S.kind && q.push(H);
    for (let H = q.length - 1; H > 0; H--) {
      const U = Math.floor(a() * (H + 1)), R = q[H];
      q[H] = q[U], q[U] = R;
    }
    const O = Array.from({ length: c * c }, () => []);
    for (const H of q) {
      const U = H % s + 0.5 + (a() - 0.5) * 0.4, R = Math.floor(H / s) + 0.5 + (a() - 0.5) * 0.4, L = zt(e, U, R), Y = S.s * (0.85 + a() * 0.45), ot = a() * ke;
      O[h(U, R)].push({ mt: m(U, L - 0.1, R, ot, Y, Y, Y), mc: m(U, L - 0.1 + S.cy * Y, R, ot, Y, Y, Y), c: new se(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.8 + a() * 0.25), k: H });
    }
    for (const H of O) {
      if (!H.length) continue;
      const U = new Ht(S.t, i, H.length), R = new Ht(S.c, S.mat, H.length);
      H.forEach((L, Y) => {
        U.setMatrixAt(Y, L.mt), R.setMatrixAt(Y, L.mc), R.setColorAt(Y, L.c), l.set(L.k, { t: U, c: R, i: Y });
      });
      for (const L of [U, R])
        L.castShadow = !0, L.receiveShadow = !0, L.computeBoundingSphere(), t.add(L);
      S.depth && (R.customDepthMaterial = Z0(S.depth)), r.push({ t: U, c: R, n: H.length });
    }
  }
  const f = [], u = (S, q, O, H, U = !0) => {
    const R = new Ht(Wa.dode, ae(), Math.max(1, S.length * H));
    let L = 0;
    for (const Y of S) for (let ot = 0; ot < H; ot++) {
      const ft = Y.x + 0.5 + (a() - 0.5) * 0.7, dt = Y.z + 0.5 + (a() - 0.5) * 0.7, St = O * (0.6 + a() * 0.6);
      if (R.setMatrixAt(L, m(ft, zt(e, ft, dt) + St * 0.15, dt, a() * ke, St, St * (0.55 + a() * 0.4), St, a() * 0.5, a() * 0.5)), U) {
        const Wt = Y.z * s + Y.x, ct = d.get(Wt) ?? [];
        ct.push({ m: R, i: L }), d.set(Wt, ct);
      }
      R.setColorAt(L++, new se(q).multiplyScalar(0.85 + a() * 0.3));
    }
    return R.count = L, R.castShadow = R.receiveShadow = !0, R.computeBoundingSphere(), t.add(R), R;
  };
  u(e.res.filter((S) => S.kind === Xe), "#c4bdae", 0.75, 2);
  const p = e.res.filter((S) => S.kind === Ie);
  f.push(u(p, "#7a6a58", 0.7, 2), u(p, "#4fa58a", 0.32, 2));
  const v = [], y = e.res.filter((S) => S.kind === Ae);
  if (y.length) {
    const S = new Ht(Wa.dode, ae(), y.length * 2), q = new Ht(Wa.dode, no(new vn({ color: "#ffffff", specular: "#ffffff", shininess: 90, emissive: "#3c3f44", flatShading: !0 })), y.length * 2 * 3);
    let O = 0, H = 0;
    for (const U of y) {
      const R = U.z * s + U.x, L = d.get(R) ?? [];
      for (let Y = 0; Y < 2; Y++) {
        const ot = U.x + 0.5 + (a() - 0.5) * 0.6, ft = U.z + 0.5 + (a() - 0.5) * 0.6, dt = 0.7 * (0.65 + a() * 0.5), St = dt * (0.6 + a() * 0.3), Wt = zt(e, ot, ft);
        S.setMatrixAt(O, m(ot, Wt + St * 0.18, ft, a() * ke, dt, St, dt, a() * 0.4, a() * 0.4)), S.setColorAt(O, new se("#8e9198").multiplyScalar(0.88 + a() * 0.24)), L.push({ m: S, i: O }), O++;
        for (let ct = 0; ct < 3; ct++) {
          const et = a() * ke, Z = 0.25 + a() * 0.45, de = dt * 0.42, Dt = ot + Math.cos(et) * de * (1 - Z * 0.6), Gt = ft + Math.sin(et) * de * (1 - Z * 0.6), Et = Wt + St * 0.18 + St * 0.5 * Z;
          q.setMatrixAt(H, m(Dt, Et, Gt, -et, dt * 0.13, dt * 0.08, dt * (0.42 + a() * 0.25), (a() - 0.5) * 0.6, (a() - 0.5) * 0.5)), q.setColorAt(H, new se("#f4f6fa").multiplyScalar(0.92 + a() * 0.1)), L.push({ m: q, i: H }), H++;
        }
      }
      d.set(R, L);
    }
    for (const U of [S, q])
      U.count = U === S ? O : H, U.castShadow = U.receiveShadow = !0, U.computeBoundingSphere(), t.add(U), v.push(U);
  }
  const k = e.res.filter((S) => S.kind === xe), M = new Ht(Wa.ico, ae({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, k.length)), x = new Ht(Wa.ico, ae({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, k.length * 6)), z = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map();
  k.forEach((S, q) => {
    const O = S.x + 0.5, H = S.z + 0.5, U = zt(e, O, H);
    M.setMatrixAt(q, m(O, U + 0.35, H, a() * ke, 1.05, 0.85, 1.05));
    const R = [];
    for (let L = 0; L < 6; L++) {
      const Y = a() * ke, ot = m(O + Math.cos(Y) * 0.45, U + 0.35 + a() * 0.35, H + Math.sin(Y) * 0.45, 0, 0.11, 0.11, 0.11);
      x.setMatrixAt(q * 6 + L, ot), R.push(ot);
    }
    z.set(S.z * s + S.x, R), A.set(S.z * s + S.x, q * 6);
  });
  for (const S of [M, x])
    S.castShadow = !0, S.computeBoundingSphere(), t.add(S);
  const $ = rt((S) => {
    for (let q = 0; q < 3; q++) S.add("cone4", "#ffffff", m((q - 1) * 0.12, 0, q % 2 * 0.1, q * 2, 0.14, 0.5 + q * 0.08, 0.14, (q - 1) * 0.3, (q - 1) * 0.25), 0.15);
  }), P = [];
  for (let S = 0; S < 3e4 && P.length < 3200; S++) {
    const q = a() * s, O = a() * s, H = Math.floor(O) * s + Math.floor(q), U = e.terrain[H];
    if (U !== xa && U !== ea || e.tree[H]) continue;
    const R = zt(e, q, O);
    R < 0.7 || R > 14 || U === ea && R > di - 0.3 || P.push(m(q, R - 0.02, O, a() * ke, 0.6 + a() * 0.6, 0.5 + a() * 0.6, 0.6 + a() * 0.6));
  }
  const I = new Ht($, ae({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, P.length));
  P.forEach((S, q) => {
    I.setMatrixAt(q, S), I.setColorAt(q, new se(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.85 + a() * 0.3));
  }), I.receiveShadow = !0, I.computeBoundingSphere(), t.add(I);
  const C = (S, q) => {
    for (const O of r) O.t.count = O.c.count = Math.floor(O.n * S);
    I.count = Math.floor(P.length * q);
  }, w = (S) => {
    const q = l.get(S);
    q && (q.t.setMatrixAt(q.i, vo), q.c.setMatrixAt(q.i, vo), q.t.instanceMatrix.needsUpdate = q.c.instanceMatrix.needsUpdate = !0, l.delete(S));
  }, F = (S) => {
    V(S, !1);
    const q = d.get(S);
    if (q) {
      for (const { m: O, i: H } of q)
        O.setMatrixAt(H, vo), O.instanceMatrix.needsUpdate = !0;
      d.delete(S);
    }
  }, V = (S, q) => {
    const O = z.get(S), H = A.get(S);
    !O || H === void 0 || (O.forEach((U, R) => x.setMatrixAt(H + R, q ? U : vo)), x.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: f, silver: v, tufts: I, setDensity: C, removeTree: w, removeRes: F, setBerries: V };
}
function bh(e, t = !1) {
  const a = e[0].index !== null, s = new Set(Object.keys(e[0].attributes)), o = new Set(Object.keys(e[0].morphAttributes)), i = {}, n = {}, r = e[0].morphTargetsRelative, l = new wa();
  let d = 0;
  for (let c = 0; c < e.length; ++c) {
    const h = e[c];
    let f = 0;
    if (a !== (h.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const u in h.attributes) {
      if (!s.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + '. All geometries must have compatible attributes; make sure "' + u + '" attribute exists among all geometries, or in none of them.'), null;
      i[u] === void 0 && (i[u] = []), i[u].push(h.attributes[u]), f++;
    }
    if (f !== s.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". Make sure all geometries have the same number of attributes."), null;
    if (r !== h.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const u in h.morphAttributes) {
      if (!o.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ".  .morphAttributes must be consistent throughout all geometries."), null;
      n[u] === void 0 && (n[u] = []), n[u].push(h.morphAttributes[u]);
    }
    if (t) {
      let u;
      if (a)
        u = h.index.count;
      else if (h.attributes.position !== void 0)
        u = h.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(d, u, c), d += u;
    }
  }
  if (a) {
    let c = 0;
    const h = [];
    for (let f = 0; f < e.length; ++f) {
      const u = e[f].index;
      for (let p = 0; p < u.count; ++p)
        h.push(u.getX(p) + c);
      c += e[f].attributes.position.count;
    }
    l.setIndex(h);
  }
  for (const c in i) {
    const h = pr(i[c]);
    if (!h)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " attribute."), null;
    l.setAttribute(c, h);
  }
  for (const c in n) {
    const h = n[c][0].length;
    if (h === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[c] = [];
    for (let f = 0; f < h; ++f) {
      const u = [];
      for (let v = 0; v < n[c].length; ++v)
        u.push(n[c][v][f]);
      const p = pr(u);
      if (!p)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " morphAttribute."), null;
      l.morphAttributes[c].push(p);
    }
  }
  return l;
}
function pr(e) {
  let t, a, s, o = -1, i = 0;
  for (let d = 0; d < e.length; ++d) {
    const c = e[d];
    if (t === void 0 && (t = c.array.constructor), t !== c.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (a === void 0 && (a = c.itemSize), a !== c.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (s === void 0 && (s = c.normalized), s !== c.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (o === -1 && (o = c.gpuType), o !== c.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    i += c.count * a;
  }
  const n = new t(i), r = new Ge(n, a, s);
  let l = 0;
  for (let d = 0; d < e.length; ++d) {
    const c = e[d];
    if (c.isInterleavedBufferAttribute) {
      const h = l / a;
      for (let f = 0, u = c.count; f < u; f++)
        for (let p = 0; p < a; p++) {
          const v = c.getComponent(f, p);
          r.setComponent(f + h, p, v);
        }
    } else
      n.set(c.array, l);
    l += c.count * a;
  }
  return o !== void 0 && (r.gpuType = o), r;
}
const Ue = {
  emit: (e, t, a, s) => {
  }
}, we = new ue().makeScale(0, 0, 0), mr = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], gr = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], vh = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], br = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], yh = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85", "#c3cfdc"], Ai = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], $e = "#b5813e", na = "#6e4f37", je = "#8a6545", xh = ["#ddd0b4", "#cdbb98", "#c4ab8a", "#e3d9c3"];
function Sn(e) {
  const t = [], a = [], s = new se();
  for (const [i, n] of e) {
    const r = i.index ? i.toNonIndexed() : i, l = r.attributes.position.array;
    s.set(n);
    for (let d = 0; d < l.length; d += 3)
      t.push(l[d], l[d + 1], l[d + 2]), a.push(s.r, s.g, s.b);
  }
  const o = new wa();
  return o.setAttribute("position", new Za(t, 3)), o.setAttribute("color", new Za(a, 3)), o.computeVertexNormals(), o;
}
const Ti = {
  leg: new Me(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new Ya(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new Me(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new Me(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new y0(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: bh([new Ho(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new Ho(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new Ya(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: rt((e) => {
    e.add("cyl5", "#7a5a3c", m(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", m(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: rt((e) => {
    e.add("cyl5", "#6b4a2f", m(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", m(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: rt((e) => {
    e.add("cyl5", "#7a5a3c", m(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", m(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", m(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: rt((e) => {
    e.add("cyl5", "#7a5a3c", m(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", m(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", m(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: rt((e) => {
    e.add("cyl5", "#7a5a3c", m(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", m(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: rt((e) => {
    e.add("cyl5", "#8a6a48", m(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", m(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", m(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: Sn([[new k0(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new Me(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: rt((e) => {
    e.add("cyl5", "#4a3326", m(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", $e, m(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", m(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", m(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: rt((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", m(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", m(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", m(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new Me(0.26, 0.26, 0.15)
}, vr = {
  body: new Me(1, 1, 1),
  neck: new Me(1, 1, 1).translate(0, 0.5, 0),
  collar: new Me(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: rt((e) => {
    e.add("box", "#ffffff", m(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", m(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: rt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", m(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new Me(1, 1, 1).translate(0, -0.5, 0),
  tail: new Me(1, 1, 1).translate(0, -0.5, 0),
  antlers: rt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", m(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", m(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", m(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: rt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", m(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", m(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: rt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", m(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, $i = {
  body: rt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", m(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", m(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", m(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", m(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", m(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", m(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", m(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", m(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", m(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new Ya(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: rt((e) => {
    e.add("cyl8", "#5e4431", m(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", m(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", m(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", m(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new Me(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, Q0 = rt((e) => {
  e.add("cyl5", "#7a5a3c", m(0, -0.7, 0, 0, 0.05, 0.6, 0.05), 0), e.add("cone4", "#6f7276", m(0, -0.14, 0, 0, 0.085, 0.14, 0.085), 0), e.add("box", "#5d5f62", m(0, -0.17, 0, 0, 0.06, 0.04, 0.06), 0);
  for (let t = 0; t < 3; t++) {
    const a = t * Math.PI * 2 / 3;
    e.add("box", "#b08a5c", m(Math.sin(a) * 0.04, -0.7, Math.cos(a) * 0.04, a, 0.012, 0.17, 0.07), 0);
  }
}).rotateX(Math.PI / 2), tl = rt((e) => {
  e.add("dode", "#8f8a80", m(0, 0, -0.2, 0, 0.42, 0.38, 0.4), 0), e.add("dode", "#7f7a71", m(0.06, 0.07, -0.24, 0.6, 0.26, 0.24, 0.26), 0);
}), yo = "#b9bdc3", kh = "#7a5a3c", yr = "#5e4b38", Si = "#9c6c32", xo = "#c99350", xr = (e, t) => Sn([[new Me(e, e, 1).translate(0, 0, 0.5), t]]), kr = (e) => rt((t) => {
  t.add("cyl12", "#6b4a2f", m(-0.035, 0, 0, 0, e * 2, 0.07, e * 2, 0, -Math.PI / 2), 0), t.add("cyl12", "#856043", m(-0.04, 0, 0, 0, e * 1.5, 0.08, e * 1.5, 0, -Math.PI / 2), 0), t.add("cyl8", "#4a3526", m(-0.06, 0, 0, 0, 0.09, 0.12, 0.09, 0, -Math.PI / 2), 0);
}), Mr = {
  // armas (a mão na origem, o cabo para +y, a ponta ou o fio para +y/+z, como as ferramentas)
  // lança longa (hasta): a mão a uns 40% do comprimento (de perto a estocada não deixa um cabo enorme para trás); em pé, ela
  // sobe na mão até o conto encostar no chão (HASTA_UP)
  hasta: rt((e) => {
    e.add("cyl5", kh, m(0, -0.95, 0, 0, 0.042, 2.3, 0.042), 0), e.add("cone4", "#b8b4aa", m(0, 1.33, 0, 0, 0.085, 0.29, 0.085), 0), e.add("cone4", $e, m(0, -0.95, 0, 0, 0.05, 0.1, 0.05, Math.PI), 0);
  }),
  javelin: rt((e) => {
    e.add("cyl5", "#8a6a48", m(0, -0.45, 0, 0, 0.03, 1.42, 0.03), 0), e.add("cyl5", "#8d9096", m(0, 0.9, 0, 0, 0.018, 0.16, 0.018), 0), e.add("cone4", "#a9adb3", m(0, 1.04, 0, 0, 0.05, 0.16, 0.05), 0);
  }),
  gladius: rt((e) => {
    e.add("ico", "#8a6a44", m(0, -0.11, 0, 0, 0.065, 0.055, 0.065), 0), e.add("cyl5", "#d6cbb2", m(0, -0.1, 0, 0, 0.042, 0.17, 0.042), 0), e.add("box", "#8a6a44", m(0, 0.07, 0, 0, 0.05, 0.04, 0.13), 0), e.add("box", yo, m(0, 0.11, 0, 0, 0.022, 0.31, 0.072), 0), e.add("cone4", yo, m(0, 0.42, 0, Math.PI / 4, 0.06, 0.1, 0.06), 0);
  }),
  longsword: rt((e) => {
    e.add("ico", "#6b4a2f", m(0, -0.14, 0, 0, 0.06, 0.05, 0.06), 0), e.add("cyl5", "#4a3326", m(0, -0.13, 0, 0, 0.042, 0.2, 0.042), 0), e.add("box", "#6f7276", m(0, 0.07, 0, 0, 0.045, 0.035, 0.12), 0), e.add("box", yo, m(0, 0.1, 0, 0, 0.02, 0.6, 0.058), 0), e.add("cone4", yo, m(0, 0.7, 0, Math.PI / 4, 0.045, 0.05, 0.045), 0);
  }),
  // escudos (o centro na origem, a frente para +z)
  aspis: rt((e) => {
    e.add("cyl12", Si, m(0, 0, -0.03, 0, 0.72, 0.05, 0.72, Math.PI / 2), 0), e.add("cyl12", xo, m(0, 0, -0.01, 0, 0.62, 0.06, 0.62, Math.PI / 2), 0);
  }),
  emblem: rt((e) => {
    e.add("cyl8", "#ffffff", m(0, 0, 0.045, 0, 0.26, 0.016, 0.26, Math.PI / 2), 0);
  }),
  // na cor do time
  parma: rt((e) => {
    e.add("cyl12", Si, m(0, 0, -0.025, 0, 0.42, 0.035, 0.42, Math.PI / 2), 0), e.add("cyl12", "#8a6a44", m(0, 0, -0.02, 0, 0.36, 0.04, 0.36, Math.PI / 2), 0), e.add("hemi", xo, m(0, 0, 0.015, 0, 0.11, 0.08, 0.11, Math.PI / 2), 0);
  }),
  // escudo comprido e curvo (scutum): quatro tábuas num arco, na cor do time; o umbo de ferro e a faixa do meio à parte
  scutum: rt((e) => {
    for (let a = 0; a < 4; a++) {
      const s = (a - 1.5) * 0.28;
      e.add("box", "#ffffff", m(Math.sin(s) * 0.45, -0.39, Math.cos(s) * 0.45 - 0.45, s, 0.127, 0.78, 0.03), 0);
    }
  }),
  scutumTrim: rt((e) => {
    e.add("box", $e, m(0, -0.36, 0.014, 0, 0.034, 0.72, 0.02), 0), e.add("hemi", "#9ea3a8", m(0, 0, 0.012, 0, 0.15, 0.08, 0.15, Math.PI / 2), 0);
  }),
  // escudo oval dos gauleses (pintado: a cor vem da instância; a faixa e o umbo escuros continuam escuros)
  oval: rt((e) => {
    e.add("cyl12", "#ffffff", m(0, 0, -0.02, 0, 0.42, 0.035, 0.76, Math.PI / 2), 0), e.add("box", "#4a3a2a", m(0, -0.34, 0.012, 0, 0.034, 0.68, 0.02), 0), e.add("cyl8", "#4c4c4c", m(0, 0, 0.012, 0, 0.13, 0.05, 0.13, Math.PI / 2), 0);
  }),
  // cabeça (a origem no centro da cabeça; o rosto para +z; o alto do capacete fica a 0,17)
  crest: rt((e) => {
    for (const t of [0.45, 0.12, -0.21, -0.54, -0.87, -1.2]) e.add("box", "#ffffff", m(0, 0.03 + Math.cos(t) * 0.125, -0.012 + Math.sin(t) * 0.125, 0, 0.034, 0.085 - Math.max(0, -t - 0.6) * 0.06, 0.085, t), 0);
  }),
  // crista de crina: um arco por cima do capacete, da testa à nuca (cor da instância)
  plumes: rt((e) => {
    e.add("cyl5", $e, m(0, 0.15, -5e-3, 0, 0.05, 0.06, 0.05), 0), [-1, 0, 1].forEach((t) => e.add("box", t ? "#7d3a92" : "#26212a", m(t * 0.03, 0.19, -5e-3, 0, 0.028, 0.25, 0.014, 0, -t * 0.16), 0)), e.add("box", $e, m(0, -0.04, -0.12, 0, 0.24, 0.05, 0.06, 0.4), 0);
  }),
  // botão do capacete, três penas em pé e a aba da nuca
  knob: rt((e) => {
    e.add("cyl5", $e, m(0, 0.15, -5e-3, 0, 0.05, 0.06, 0.05), 0), e.add("box", $e, m(0, -0.04, -0.12, 0, 0.24, 0.05, 0.06, 0.4), 0);
  }),
  wolfhood: rt((e) => {
    const t = "#77706a", a = "#5f5952";
    e.add("box", t, m(0, 0.075, 0.07, 0, 0.1, 0.075, 0.18), 0), e.add("box", a, m(0, 0.07, 0.165, 0, 0.07, 0.055, 0.045), 0), e.add("box", "#1e1c1b", m(0, 0.1, 0.19, 0, 0.035, 0.025, 0.02), 0);
    for (const s of [-1, 1]) e.add("cone4", t, m(s * 0.065, 0.14, -0.01, Math.PI / 4, 0.06, 0.1, 0.04, 0, -s * 0.2), 0);
    e.add("box", a, m(0, -0.3, -0.158, 0, 0.22, 0.36, 0.03, 0.1), 0);
  }),
  mustache: rt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#ffffff", m(t * 0.03, -0.052, 0.103, t * 0.37, 0.055, 0.022, 0.022, 0, t * 0.3), 0), e.add("box", "#ffffff", m(t * 0.057, -0.105, 0.091, t * 0.37, 0.018, 0.06, 0.018), 0);
  }),
  // cor do cabelo
  // corpo (a origem no quadril; o tronco vai de 0 a 0,42; a frente para +z)
  pectoral: rt((e) => {
    e.add("box", xo, m(0, 0.15, 0.1, 0, 0.2, 0.2, 0.03), 0), e.add("box", Si, m(0, 0.24, 0.108, 0, 0.13, 0.03, 0.03), 0);
    for (const t of [-1, 1]) e.add("box", "#5a3d27", m(t * 0.08, 0.34, 0, 0, 0.04, 0.03, 0.24), 0);
  }),
  mail: rt((e) => {
    e.add("box", "#7c8187", m(0, 0.31, 0, 0, 0.38, 0.12, 0.25), 0), e.add("box", "#6f747a", m(0, 0, 0, 0, 0.36, 0.07, 0.24), 0);
  }),
  // ombreiras e barra da cota de malha
  torque: Sn([[new k0(0.1, 0.018, 4, 12).rotateX(Math.PI / 2).translate(0, 0.43, 0.012), "#dcab3c"]]),
  greave: rt((e) => {
    e.add("box", xo, m(0, -0.42, 0.045, 0, 0.14, 0.22, 0.05), 0);
  }),
  // na perna (a origem no quadril)
  // escorpião (virado para +z): carrinho de duas rodas com pés na frente, poste, a calha e a armação das molas de corda
  sBody: rt((e) => {
    for (const t of [-1, 1])
      e.add("box", na, m(t * 0.2, 0.17, -0.05, 0, 0.07, 0.07, 0.95), 0), e.add("box", na, m(t * 0.2, 0, 0.36, 0, 0.06, 0.2, 0.06), 0);
    e.add("cyl5", "#4a3526", m(0.34, 0.2, -0.32, 0, 0.05, 0.68, 0.05, 0, Math.PI / 2), 0);
    for (const t of [-0.45, 0.36]) e.add("box", na, m(0, 0.18, t, 0, 0.46, 0.06, 0.06), 0);
    e.add("box", je, m(0, 0.2, 0.02, 0, 0.1, 0.5, 0.1), 0), e.add("cyl8", je, m(0, 0.68, 0.02, 0, 0.22, 0.05, 0.22), 0), e.add("box", na, m(0, 0.73, -0.06, 0, 0.12, 0.1, 1.04), 0), e.add("box", "#a07c55", m(0, 0.83, -0.12, 0, 0.05, 0.015, 0.86), 0);
    for (const t of [0.72, 1]) e.add("box", je, m(0, t, 0.22, 0, 0.56, 0.06, 0.1), 0);
    for (const t of [-0.27, -0.06, 0.06, 0.27]) e.add("box", je, m(t, 0.72, 0.22, 0, 0.05, 0.34, 0.1), 0);
    for (const t of [-1, 1]) {
      e.add("cyl8", yr, m(t * 0.165, 0.72, 0.22, 0, 0.085, 0.34, 0.085), 0);
      for (const a of [0.705, 1.045]) e.add("cyl8", $e, m(t * 0.165, a, 0.22, 0, 0.13, 0.03, 0.13), 0);
    }
    e.add("cyl8", "#5e4431", m(0.13, 0.88, -0.5, 0, 0.09, 0.26, 0.09, 0, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", je, m(t * 0.15, 0.8, -0.5, 0, 0.03, 0.16, 0.03), 0);
  }),
  sPlate: rt((e) => {
    e.add("box", "#ffffff", m(0, 0.36, 0.3, 0, 0.5, 0.3, 0.025), 0);
  }),
  // escudo da frente, na cor do time
  sArm: rt((e) => {
    e.add("box", na, m(0.15, -0.02, 0, 0, 0.3, 0.045, 0.04), 0), e.add("box", $e, m(0.29, -0.025, 0, 0, 0.03, 0.05, 0.05), 0);
  }),
  sString: xr(0.012, "#e2dccb"),
  sBolt: Q0,
  sWheel: kr(0.2),
  // balista (virada para +z): armação grande de quatro rodas, a calha inclinada, a armação das molas na frente e a manivela atrás
  bBody: rt((e) => {
    for (const t of [-1, 1]) e.add("box", na, m(t * 0.4, 0.26, -0.02, 0, 0.1, 0.1, 1.6), 0);
    for (const t of [-0.74, 0, 0.7]) e.add("box", na, m(0, 0.27, t, 0, 0.9, 0.08, 0.1), 0);
    for (const t of [-1, 1]) for (const a of [-0.55, 0.55]) e.add("cyl5", "#4a3526", m(t * 0.52, 0.26, a, 0, 0.06, 0.2, 0.06, 0, t * Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", je, m(t * 0.12, 0.33, 0.05, 0, 0.1, 0.55, 0.1), 0);
    e.add("box", je, m(0, 0.33, -0.5, 0, 0.1, 0.5, 0.1, -0.3), 0), e.add("box", na, m(0, 0.84, 0.04, 0, 0.22, 0.12, 1.72, -0.06), 0), e.add("box", "#a07c55", m(0, 0.955, 0.02, 0, 0.12, 0.02, 1.5, -0.06), 0);
    for (const t of [0.8, 1.32]) e.add("box", je, m(0, t, 0.62, 0, 1.12, 0.1, 0.16), 0);
    for (const t of [-0.54, -0.13, 0.13, 0.54]) e.add("box", je, m(t, 0.8, 0.62, 0, 0.1, 0.62, 0.16), 0);
    for (const t of [-1, 1]) {
      e.add("cyl8", yr, m(t * 0.335, 0.8, 0.62, 0, 0.17, 0.62, 0.17), 0);
      for (const a of [0.78, 1.4]) e.add("cyl8", $e, m(t * 0.335, a, 0.62, 0, 0.25, 0.05, 0.25), 0);
    }
    e.add("cyl8", "#5e4431", m(0.26, 0.99, -0.72, 0, 0.13, 0.52, 0.13, 0, Math.PI / 2), 0);
    for (const t of [-1, 1])
      e.add("box", je, m(t * 0.3, 0.84, -0.72, 0, 0.035, 0.3, 0.035), 0), e.add("box", je, m(t * 0.3, 0.99, -0.87, 0, 0.035, 0.3, 0.035, Math.PI / 2), 0);
  }),
  bPlate: rt((e) => {
    for (const t of [-1, 1]) e.add("box", "#ffffff", m(t * 0.462, 0.2, -0.02, 0, 0.025, 0.16, 1), 0);
    e.add("box", "#ffffff", m(0, 0.46, 0.715, 0, 0.88, 0.26, 0.025), 0);
  }),
  // tábuas na cor do time
  bArm: rt((e) => {
    e.add("box", na, m(0.25, -0.045, 0, 0, 0.5, 0.09, 0.08), 0), e.add("box", $e, m(0.48, -0.05, 0, 0, 0.05, 0.1, 0.09), 0);
  }),
  bString: xr(0.022, "#e2dccb"),
  bStone: tl,
  bWheel: kr(0.26),
  // trouxa de prata nas costas (M3): saco claro amarrado, com pedras de prata por cima (material que brilha)
  prataCarga: rt((e) => {
    e.add("box", "#e9edf2", m(0, -0.13, 0, 0, 0.26, 0.24, 0.15), 0), e.add("box", "#b9c0c9", m(0, 0.07, 0, 0, 0.27, 0.03, 0.16), 0);
    for (const [t, a, s] of [[-0.07, 0.01, 0.1], [0.05, -0.02, 0.12], [0, 0.03, 0.08]]) e.add("ico", "#ffffff", m(t, 0.11, a, t * 9, s, s * 0.8, s), 0);
  })
}, Mh = /* @__PURE__ */ new Set(["emblem", "scutum", "oval", "crest", "mustache", "sPlate", "bPlate"]), zh = { sBody: 48, sPlate: 48, sArm: 96, sString: 96, sBolt: 48, sWheel: 96, bBody: 48, bPlate: 48, bArm: 96, bString: 96, bStone: 48, bWheel: 192, greave: 512 }, Ah = { hasta: "spear", javelin: "spear", gladius: "sword", longsword: "sword" }, Ci = (e) => e && Ah[e] || e, Th = { spear: 1.4, hasta: 1.6, javelin: 1.2 }, $h = { aspis: [-0.05, -0.26, 0.2], parma: [0.04, -0.24, 0.14], scutum: [0.02, -0.27, 0.19], oval: [0.03, -0.24, 0.16] }, js = /* @__PURE__ */ new Set(["horseman", "eques"]), Sh = {
  // a espada longa: o braço fica alto e o pulso deita a lâmina, que cai em cima da borda do escudo, do lado do ombro (longe
  // da cabeça)
  longsword: { up: -2.75, end: -2.3, wrist: 1.9, spin: 0.1, rz: 0, L: 0.75 },
  gladius: { up: -2.65, end: -1.35, wrist: 0.9, spin: 0.2, rz: -0.15, L: 0.48 }
}, aa = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, el = aa.horse.leg + aa.horse.body[1], Ua = (e) => e * e * (3 - 2 * e);
function cs(e, t, a) {
  if (e < 0.12) return a - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return a + (t - a) * Ua((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const s = (e - 0.8) / 0.2;
  return t + (a - t) * s * s;
}
const ds = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, Zi = 2.6;
function al(e) {
  const t = X[e]?.key ?? "";
  if (js.has(t)) return aa.horse.leg + aa.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  if (t === "scorpio") return 0.75;
  if (t === "ballista") return 0.85;
  const a = aa[t];
  return a ? a.leg + a.body[1] * 0.5 : 0.72;
}
function Ch(e) {
  const t = X[e]?.key ?? "";
  if (js.has(t)) return el + 0.1;
  if (t === "ram") return 1.15;
  if (t === "scorpio") return 1.08;
  if (t === "ballista") return 1.45;
  const a = aa[t];
  return a ? a.leg + a.body[1] + 0.06 : 1.15;
}
const Na = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, be = (e, t) => e[Math.floor(t * e.length) % e.length];
class Ph {
  constructor(t = 720, a = 160) {
    g(this, "group", new ns());
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
    g(this, "m", { b: new ue(), hip: new ue(), tor: new ue(), l: new ue(), t: new ue(), al: new ue(), ar: new ue(), hd: new ue(), lgL: new ue(), lgR: new ue() });
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
    g(this, "e", new x0());
    g(this, "q", new Ms());
    g(this, "p", new Ot());
    g(this, "s", new Ot());
    g(this, "v", new Ot());
    g(this, "c", new se());
    /** as cores das peças pintadas, já lidas (ler o texto da cor a cada quadro, para centenas de soldados, pesa no celular) */
    g(this, "cores", /* @__PURE__ */ new Map());
    g(this, "_s0", new ue());
    g(this, "_s1", new ue());
    g(this, "_s2", new ue());
    g(this, "_sp", new Ot());
    g(this, "_za", new Ot(0, 0, 1));
    g(this, "_d", new Ot());
    g(this, "_cq", new Ms());
    g(this, "_cp", new Ot());
    g(this, "_cs", new Ot());
    this.maxH = t, this.maxA = a;
    const s = ae({}, { NO_SNOW: "" }), o = ae({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const l in Ti) {
      const d = l === "leg" || l === "arm" ? t * 2 : t, c = !!Ti[l].attributes.color, h = new Ht(Ti[l], c ? o : s, d);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < d; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.hm[l] = h;
    }
    for (const l in vr) {
      const d = l === "leg" ? a * 4 : a, c = ["head", "ears", "antlers", "horns", "tusks"].includes(l), h = new Ht(vr[l], c ? o : s, d);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < d; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.am[l] = h;
    }
    for (const l in $i) {
      const d = l === "wheel" ? this.maxR * 4 : this.maxR, c = !!$i[l].attributes.color, h = new Ht($i[l], c ? o : s, d);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < d; f++) h.setColorAt(f, this.c.set(l === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(h), this.rm[l] = h;
    }
    const i = no(new vn({ vertexColors: !0, specular: "#ffffff", shininess: 70, emissive: "#3a3e45", flatShading: !0 }), { NO_SNOW: "" });
    for (const l in Mr) {
      const d = zh[l] ?? t, c = new Ht(Mr[l], l === "prataCarga" ? i : o, d);
      if (c.instanceMatrix.setUsage(ye), c.frustumCulled = !1, c.castShadow = !0, c.count = 0, Mh.has(l)) for (let h = 0; h < d; h++) c.setColorAt(h, this.c.set("#ffffff"));
      this.group.add(c), this.xm[l] = c, this.xn[l] = 0;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const n = new M0(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new Ht(n, new Ja({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const r = new ci(1, 0.11);
    this.barBg = new Ht(r, new Ja({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new Ht(r.clone().translate(0.5, 0, 0), new Ja({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const l of [this.ring, this.barBg, this.barFg])
      l.instanceMatrix.setUsage(ye), l.frustumCulled = !1, l.count = 0, this.group.add(l);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let l = 0; l < t; l++) this.ring.setColorAt(l, this.c.set("#9dffc4"));
    for (let l = 0; l < 400; l++) this.barFg.setColorAt(l, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(a).fill(-1);
  }
  /** d: distância até a face da peça; top: até onde ela vai (as pontas dos troncos são finas e escapam dos raios: vale a
   *  altura do modelo, menor na obra); esp: a grossura (a paliçada é uma fileira de troncos; a muralha ocupa o bloco) */
  frenteMuro(t, a, s, o, i, n) {
    const r = `${s}|${Math.round(o * 50)}|${Math.round(i * 50)}|${Math.round(n * 50)}|${t.done[s]}|${t.work[s] >> 5}`, l = this.muroFrente.get(a);
    if (l && l.k === r) return l;
    const d = Math.sin(n), c = Math.cos(n), h = lt[t.kind[s] - ut], f = h.key === "palisade", u = h.key === "tufa";
    let p = 1 / 0;
    for (const k of [0.1, 0.3, 0.55, 0.8]) {
      const M = jr(t, s, o, i, d, c, k * (t.done[s] ? 1 : 0.3));
      M !== null && M < p && (p = M);
    }
    const v = t.done[s] ? 1 : Math.max(0.12, Math.min(1, t.work[s] / (h.time * 100))), y = { k: r, d: p, top: ru(h.key) * v, esp: f ? 0.26 : u ? 0.74 : 1 };
    return this.muroFrente.set(a, y), this.muroFrente.size > 512 && this.muroFrente.clear(), y;
  }
  /** o muro (de qualquer dono) até 2 m na frente de quem atira: a lança na mão sobe por cima dele (D35) */
  muroNaFrente(t, a, s, o, i) {
    const n = Math.sin(i), r = Math.cos(i), l = t.size;
    for (let d = 0.2; d <= 2; d += 0.2) {
      const c = Math.floor(s + n * d), h = Math.floor(o + r * d);
      if (c < 0 || h < 0 || c >= l || h >= l) return null;
      const f = t.bAt[h * l + c] - 1;
      if (f >= 0 && t.isBuilding(f) && t.bdef(f).wall) {
        const u = this.frenteMuro(t, a, f, s, o, i);
        return u.d < 3 ? u : null;
      }
    }
    return null;
  }
  trs(t, a, s, o, i = 0, n = 0, r = 0, l = 1, d = l, c = l) {
    return this.e.set(i, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(a, s, o), this.s.set(l, d, c), t.compose(this.p, this.q, this.s);
  }
  /** uma peça do M3 neste quadro (col: a cor, nas pintadas por instância) */
  put(t, a, s) {
    const o = this.xm[t], i = this.xn[t];
    !o || i >= o.instanceMatrix.count || (o.setMatrixAt(i, a), s !== void 0 && o.instanceColor && o.setColorAt(i, this.cor(s)), this.xn[t] = i + 1);
  }
  cor(t) {
    let a = this.cores.get(t);
    return a || (a = new se(t), this.cores.set(t, a)), a;
  }
  /** a ferramenta na mão: as de sempre têm uma vaga por pessoa; as armas do M3 são peças à parte */
  tool(t, a, s) {
    Ai.includes(a) ? this.hm[a].setMatrixAt(t, s) : this.put(a, s);
  }
  look(t, a) {
    const s = Na(a * 7 + 1), o = Na(a * 13 + 5), i = t.owner[a], n = i >= 0 && i < t.players.length ? t.players[i].era : 0, r = i === ze ? "#4f6b4a" : t.players[i]?.color ?? "#888", l = X[t.kind[a]].key, d = be(mr, s), c = be(gr, o), h = be(vh, o), f = be(br, s), u = { skin: d, hair: c, tunic: h, skirt: r, legs: d, arms: d, weapon: null, shield: null, bigHair: !1, sc: 0.95 + s * 0.08, team: r };
    switch (l) {
      case "villager":
        return { ...u, tunic: n >= 3 ? be(xh, o) : n ? f : h, arms: n ? d : h };
      case "warrior":
        return { ...u, tunic: r, skirt: h, weapon: "club", sc: 1.02 };
      case "axeman":
        return { ...u, tunic: r, skirt: f, weapon: "axe", sc: 1.04 };
      case "hunter":
        return { ...u, weapon: "spear" };
      case "archer":
        return { ...u, tunic: r, skirt: f, weapon: "bow" };
      case "spearman":
        return { ...u, tunic: r, skirt: f, weapon: "spear", shield: n >= 2 ? $e : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...u, tunic: r, skirt: f, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...u, tunic: f, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...u, tunic: r, skirt: f, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...u, tunic: be(["#4f6b4a", "#6b5a3a", "#3f5a6a"], s), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: be(["#3f6a4a", "#8a6a3a"], o), hair: be(["#c48a4a", "#8a5a2a", "#d9a35f"], s), bigHair: !0, sc: 1.05 };
      // ── M3 ──
      // hoplita (Reino): lança longa, escudo redondo grande de bronze com o emblema do time, capacete de bronze com crista
      // de crina na cor do time e caneleiras de bronze
      case "hoplite":
        return { ...u, tunic: r, skirt: f, weapon: "hasta", shield: $e, shieldKind: "aspis", helmet: !0, sc: 1.05, extras: [["crest", "head", r], ["greave", "legs"]] };
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
        const p = be(["#c48a4a", "#d9a35f", "#a8733a", "#e0b870"], s);
        return { ...u, tunic: be(["#3f6a4a", "#6a3f3a", "#3f5a7a", "#7a6a3a"], o), skirt: "#5a4d3c", legs: be(["#7a5a3a", "#6a4a3a", "#7a6248"], s), weapon: "longsword", shield: be(["#4f7a5a", "#9a5a3a", "#5a6a8a", "#a08048"], o), shieldKind: "oval", hair: p, bigHair: !0, sc: 1.07, extras: [["torque", "torso"], ["mustache", "head", p]] };
      }
    }
    return u;
  }
  colorHuman(t, a) {
    const s = this.hm, o = this.c;
    s.leg.setColorAt(t * 2, o.set(a.legs)), s.leg.setColorAt(t * 2 + 1, o), s.skirt.setColorAt(t, o.set(a.skirt)), s.torso.setColorAt(t, o.set(a.tunic)), s.arm.setColorAt(t * 2, o.set(a.arms)), s.arm.setColorAt(t * 2 + 1, o), s.head.setColorAt(t, o.set(a.skin)), s.hair.setColorAt(t, o.set(a.cap ?? (a.helmet ? $e : a.hair))), s.shield.setColorAt(t, o.set(a.shield ?? "#888"));
    for (const i in s) s[i].instanceColor && (s[i].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, a) {
    const s = t.kind[a] === Tt ? t.sub[a] : t.kind[a];
    return X[s]?.key ?? "deer";
  }
  update(t, a, s, o, i, n, r, l) {
    const d = t.size, c = t.vis[i], h = this.hm, f = this.am, u = this.rm;
    let p = 0, v = 0, y = 0, k = 0, M = 0;
    for (const x in this.xn) this.xn[x] = 0;
    this.quadro++;
    for (let x = 0; x < t.top; x++) {
      if (!t.alive[x]) continue;
      const z = t.kind[x];
      if (z >= ut) {
        const L = lt[z - ut], Y = t.x[x] / 256, ot = t.z[x] / 256;
        if (n && t.owner[x] !== i && !c[Math.floor(ot) * d + Math.floor(Y)]) continue;
        const ft = zt(t.map, Y, ot), dt = o.has(x);
        dt && y < this.maxH && this.ring.setMatrixAt(y++, m(Y, ft + 0.08, ot, 0, L.size * 0.95, 1, L.size * 0.95)), (dt || t.hp[x] < L.hp) && k < 400 && this.bar(k++, Y, ft + (L.estrada ? 0.7 : 2.3), ot, t.hp[x] / L.hp, L.size * 0.6, l);
        continue;
      }
      const A = (t.px[x] + (t.x[x] - t.px[x]) * a) / 256, $ = (t.pz[x] + (t.z[x] - t.pz[x]) * a) / 256;
      if (n && t.owner[x] !== i) {
        const L = Math.floor(A), Y = Math.floor($);
        if (L < 0 || Y < 0 || L >= d || Y >= d || !c[Y * d + L]) continue;
      }
      const P = t.x[x] - t.px[x], I = t.z[x] - t.pz[x], C = (P !== 0 || I !== 0) && t.state[x] === ce, w = zt(t.map, A, $);
      let F = this.heading[x];
      if (C) F = Math.atan2(P, I);
      else if (z !== Tt && (t.task[x] === Xt || t.task[x] === le || t.task[x] === Vt) && t.tgt[x] >= 0) {
        const L = t.tgt[x];
        let Y, ot;
        t.task[x] === Xt && t.tgtTile[x] ? (Y = L % d + 0.5, ot = Math.floor(L / d) + 0.5) : (Y = t.x[L] / 256, ot = t.z[L] / 256), Math.abs(Y - A) + Math.abs(ot - $) > 0.05 && (F = Math.atan2(Y - A, ot - $));
      }
      const V = this.heading[x];
      this.heading[x] = V + Math.atan2(Math.sin(F - V), Math.cos(F - V)) * Math.min(1, s * 10);
      const S = this.heading[x], q = Math.hypot(P, I) / 256 * 10, O = z === Tt ? "" : X[z].key, H = z === Tt || t.owner[x] === Rt || O === "dog";
      if (O === "ram") {
        if (M >= this.maxR) continue;
        this.phase[x] += C ? s * q / 0.22 : 0, this.slotR[M] !== x * 8 + t.owner[x] + 1 && (this.slotR[M] = x * 8 + t.owner[x] + 1, u.cloth.setColorAt(M, this.c.set(t.players[t.owner[x]]?.color ?? "#888")), u.cloth.instanceColor && (u.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, x, M, A, w, $, S, a), M++;
      } else if (js.has(O)) {
        if (v >= this.maxA || p >= this.maxH) continue;
        const L = aa.horse, Y = q > 1.1;
        this.phase[x] += C ? s * q * 2.6 / L.leg : 0;
        const ot = x * 64 + z;
        if (this.slotA[v] !== ot) {
          this.slotA[v] = ot;
          const ct = this.c.set(be(L.color, Na(x)));
          for (const et of ["body", "neck", "head", "ears", "tail"]) f[et].setColorAt(v, ct);
          for (let et = 0; et < 4; et++) f.leg.setColorAt(v * 4 + et, ct);
          f.collar.setColorAt(v, this.c.set(t.players[t.owner[x]]?.color ?? "#888"));
          for (const et in f) f[et].instanceColor && (f[et].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(v, L, A, w, $, S, C, this.phase[x], r, !1, Y, !1, 1, !1, 0, 0, !0, !0), v++;
        const ft = t.owner[x], dt = `${z}:${ft}:${ft >= 0 && ft < t.players.length ? t.players[ft].era : 0}`, St = this.look(t, x);
        (this.slotH[p] !== x || this.lookKey[p] !== dt) && (this.slotH[p] = x, this.lookKey[p] = dt, this.colorHuman(p, St));
        const Wt = C ? Math.abs(Math.cos(this.phase[x])) * (Y ? 0.06 : 0.025) : 0;
        if (C && Y) {
          const ct = this.phase[x] / Math.PI % 2;
          ct < this.lastP[x] && Ue.emit("animal.hooves", A, $, 0.5), this.lastP[x] = ct;
        }
        this.poseHuman(t, x, p, St, A, w, $, S, C, r, a, el + Wt - 0.44 * St.sc), p++;
      } else if (O === "scorpio" || O === "ballista") {
        if (p >= this.maxH) continue;
        this.phase[x] += C ? s * q / (O === "ballista" ? 0.26 : 0.2) : 0, this.poseMachine(t, x, p, O === "ballista", A, w, $, S, C, r, a), p++;
      } else if (H) {
        if (v >= this.maxA) continue;
        const L = this.speciesOf(t, x), Y = aa[L] ?? aa.deer;
        this.phase[x] += C ? s * q * 2.6 / Y.leg : 0;
        const ot = x * 64 + z;
        if (this.slotA[v] !== ot) {
          this.slotA[v] = ot;
          const et = this.c.set(be(Y.color, Na(x)));
          z === Tt && et.multiplyScalar(0.8);
          for (const Z of ["body", "neck", "head", "ears", "tail"]) f[Z].setColorAt(v, et);
          for (let Z = 0; Z < 4; Z++) f.leg.setColorAt(v * 4 + Z, et);
          f.collar.setColorAt(v, this.c.set(t.players[t.owner[x]]?.color ?? "#888"));
          for (const Z in f) f[Z].instanceColor && (f[Z].instanceColor.needsUpdate = !0);
        }
        const ft = z !== Tt && t.task[x] === Vt && !C;
        let dt = 0, St = 0, Wt = 0;
        const ct = z === Tt ? 1 : 1 + (L === "aurochs" ? 0.1 : 0);
        if (ft) {
          const et = 1 - Math.max(0, Math.min(1, (t.cd[x] - a) / X[z].cd));
          dt = et > 0.8 ? (et - 0.8) / 0.2 : et < 0.2 ? 1 - et / 0.2 : 0;
          const Z = t.tgt[x];
          if (Z >= 0 && t.alive[Z]) {
            const de = Math.hypot(t.x[Z] - t.x[x], t.z[Z] - t.z[x]) / 256, Dt = Y.body[2] * 0.5 + Y.neck * 0.3 + Y.head[2] * 0.85, Gt = t.kind[Z] < Tt ? X[t.kind[Z]].radius : 0.5;
            t.kind[Z] >= ut && lt[t.kind[Z] - ut].wall ? St = Math.max(0, Math.min(0.5, this.frenteMuro(t, x, Z, A, $, S).d - Dt)) : St = Math.max(0, Math.min(Y.body[2] * 0.3, de - Dt - Gt * 0.95));
            const Et = this.escudoNaFrente(Z, A, w + (Y.leg + Y.body[1] * 0.8) * ct, $, S);
            Et !== null && (Wt = Math.min(0, Et - Dt * ct) / ct, St = Math.max(0, Math.min(St, (Et - Dt * ct) / ct)));
          }
        }
        ft && t.cd[x] > this.lastCd[x] && Ue.emit(L === "boar" ? "hit.boar" : L === "aurochs" ? "hit.aurochs" : "hit.bite", A, $), this.lastCd[x] = z === Tt ? 0 : t.cd[x], this.poseAnimal(v, Y, A, w, $, S, C, this.phase[x], r, z === Tt, t.fast[x] === 1, L === "deer" && Na(x * 3) < 0.5, ct, ft, dt, St, t.owner[x] >= 0 && z !== Tt, !1, Wt), v++;
      } else {
        if (p >= this.maxH) continue;
        this.phase[x] += C ? s * q * 7.2 : 0;
        const L = t.owner[x], Y = `${z}:${L}:${L >= 0 && L < t.players.length ? t.players[L].era : 0}`, ot = this.look(t, x);
        (this.slotH[p] !== x || this.lookKey[p] !== Y) && (this.slotH[p] = x, this.lookKey[p] = Y, this.colorHuman(p, ot)), this.poseHuman(t, x, p, ot, A, w, $, S, C, r, a), p++;
      }
      const U = js.has(O), R = O === "ram" || O === "ballista" ? 1.9 : U ? 1.6 : O === "scorpio" ? 1.5 : H ? 1.2 : 1;
      o.has(x) && y < this.maxH && this.ring.setMatrixAt(y++, m(A, w + 0.06, $, 0, R, 1, R)), z !== Tt && (o.has(x) || t.hp[x] < X[z].hp) && k < 400 && this.bar(k++, A, w + (U ? 2.6 : O === "ram" ? 1.75 : O === "ballista" ? 1.95 : O === "scorpio" ? 1.6 : H ? 1.3 : 1.55), $, t.hp[x] / X[z].hp, O === "ram" || U || O === "ballista" || O === "scorpio" ? 0.9 : 0.7, l);
    }
    for (const x in h)
      h[x].count = p, h[x].instanceMatrix.needsUpdate = !0;
    h.leg.count = h.arm.count = p * 2;
    for (const x in f)
      f[x].count = v, f[x].instanceMatrix.needsUpdate = !0;
    f.leg.count = v * 4;
    for (const x in u)
      u[x].count = M, u[x].instanceMatrix.needsUpdate = !0;
    u.wheel.count = M * 4;
    for (const x in this.xm) {
      const z = this.xm[x], A = this.xn[x];
      z.count = A, z.visible = A > 0, A && (z.instanceMatrix.clearUpdateRanges(), z.instanceMatrix.addUpdateRange(0, A * 16), z.instanceMatrix.needsUpdate = !0, z.instanceColor && (z.instanceColor.clearUpdateRanges(), z.instanceColor.addUpdateRange(0, A * 3), z.instanceColor.needsUpdate = !0));
    }
    this.ring.count = y, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = k, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
  }
  bar(t, a, s, o, i, n, r) {
    i = Math.max(0, Math.min(1, i)), this.p.set(a, s, o), this.s.set(n, 1, 1), this.barBg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.v.set(-n / 2, 0, 0).applyQuaternion(r), this.p.set(a + this.v.x, s + this.v.y, o + this.v.z), this.s.set(n * i, 1, 1), this.barFg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.barFg.setColorAt(t, this.c.set(i > 0.6 ? "#6fe08a" : i > 0.3 ? "#f2c14e" : "#e0533c"));
  }
  /** mão direita ou esquerda (ponto no braço) em coordenadas do mundo, com a orientação do tronco e um giro em X */
  gripTorso(t, a, s, o, i = 0) {
    return this.v.set(0, -0.35, s).applyMatrix4(a), t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t, 0, 0, 0, o, i));
  }
  /** M3: guarda o escudo de e (a matriz dele tem a escala da pessoa) */
  guardaEscudo(t, a, s) {
    const o = s.elements, i = t * 16, n = this.ve, r = Math.hypot(o[0], o[1], o[2]) || 1, [l, d, c] = a === "aspis" ? [0.36, 0.36, 0.36] : a === "parma" ? [0.21, 0.21, 0.21] : a === "oval" ? [0.21, 0.38, 0.38] : a === "scutum" ? [0.25, 0.39, 0.39] : [0.24, 0.24, 0.24];
    n[i] = { round: 1, aspis: 2, parma: 3, scutum: 4, oval: 5 }[a], n[i + 1] = o[12], n[i + 2] = o[13], n[i + 3] = o[14];
    for (let h = 0; h < 3; h++)
      n[i + 4 + h] = o[h] / r, n[i + 7 + h] = o[4 + h] / r, n[i + 10 + h] = o[8 + h] / r;
    n[i + 13] = l * r, n[i + 14] = d * r, n[i + 15] = c * r;
  }
  /** M3: guarda o corpo e a cabeça de e (depois de body: a cabeça está em m.hd) */
  guardaCorpo(t, a, s, o, i, n) {
    const r = this.vb, l = this.vh, d = this.m.hd.elements, c = t * 5;
    r[c] = s, r[c + 1] = o, r[c + 2] = i, r[c + 3] = n, r[c + 4] = a.sc, l[c] = d[12], l[c + 1] = d[13], l[c + 2] = d[14], l[c + 3] = 0.15 * a.sc * (a.bigHair ? 1.18 : 1), l[c + 4] = a.extras?.some(([h]) => h === "crest" || h === "plumes" || h === "knob") ? 0.22 * a.sc : 0, this.vq[t] = this.quadro;
  }
  /** M3: o ponto (px, py, pz) está dentro da pessoa t (corpo, pernas, cabeça com a crista ou escudo)? f = folga */
  dentro(t, a, s, o, i) {
    const n = this.vb, r = this.vh, l = this.ve, d = t * 5, c = n[d + 4], h = n[d + 3], f = a - n[d], u = o - n[d + 2], p = (s - n[d + 1]) / c, v = (f * Math.cos(h) - u * Math.sin(h)) / c, y = (f * Math.sin(h) + u * Math.cos(h)) / c, k = i / c;
    if (Math.abs(v) < 0.27 + k && p > 0.3 && p < 0.92 + k && Math.abs(y) < 0.14 + k || Math.abs(v) < 0.2 + k && p > -0.1 && p <= 0.3 && Math.abs(y) < 0.13 + k) return !0;
    const M = a - r[d], x = s - r[d + 1], z = o - r[d + 2], A = r[d + 3] + i;
    if (M * M + x * x + z * z < A * A || r[d + 4] > 0 && x > 0 && x < r[d + 4] + i && M * M + z * z < (0.06 + i) ** 2) return !0;
    const $ = t * 16, P = l[$];
    if (P) {
      const I = a - l[$ + 1], C = s - l[$ + 2], w = o - l[$ + 3], F = I * l[$ + 10] + C * l[$ + 11] + w * l[$ + 12];
      if (Math.abs(F) < 0.05 + i) {
        const V = I * l[$ + 4] + C * l[$ + 5] + w * l[$ + 6], S = I * l[$ + 7] + C * l[$ + 8] + w * l[$ + 9], q = l[$ + 13] + i;
        if (P === 4) {
          if (Math.abs(V) < q && S < l[$ + 14] + i && S > -l[$ + 15] - i) return !0;
        } else {
          const O = S > 0 ? l[$ + 14] + i : l[$ + 15] + i;
          if ((V / q) ** 2 + (S / O) ** 2 < 1) return !0;
        }
      }
    }
    return !1;
  }
  /** M3: o golpe do gládio ou da espada longa contra uma pessoa: até onde ele vai no caminho de GOLPE (0 = erguido, 1 = o
   *  fim) antes de a lâmina encostar nela (no escudo, no ombro, na cabeça ou na crista); null = não encosta (ou a pessoa não foi
   *  desenhada agora). Faz as contas com as mesmas matrizes do desenho, no instante da pancada (guardado por unidade) */
  bladeStop(t, a, s, o, i, n, r, l) {
    if (this.vq[a] < this.quadro - 1) return null;
    const d = this.vb, c = a * 5, h = a * 16, f = this.ve, u = `${a}|${Math.round(o * 40)}|${Math.round(n * 40)}|${Math.round(r * 40)}|${Math.round(d[c] * 40)}|${Math.round(d[c + 2] * 40)}|${Math.round(d[c + 3] * 20)}|${Math.round(f[h + 1] * 25)}|${Math.round(f[h + 2] * 25)}|${Math.round(f[h + 3] * 25)}`, p = this.lamina.get(t);
    if (p && p.k === u) return p.a;
    const v = this._s0, y = this._s1, k = this._s2, M = this._sp;
    this.trs(v, o, i, n, 0, r, 0, s.sc), v.multiply(this.trs(this.m.t, 0, 0.46, 0, 0.2));
    let x = null;
    for (let z = 0; z <= 1.0001 && x === null; z += 0.025) {
      y.multiplyMatrices(v, this.trs(this.m.t, -0.215, 0.38, 0, l.up + (l.end - l.up) * z, 0, -l.rz)), k.multiplyMatrices(y, this.trs(this.m.t, 0, -0.35, 0, Math.PI - 0.75 + l.wrist * z, l.spin));
      for (let A = 0.12; A <= l.L + 1e-6; A += 0.04)
        if (M.set(0, A, 0).applyMatrix4(k), this.dentro(a, M.x, M.y, M.z, 0.025)) {
          x = Math.max(0, z - 0.025);
          break;
        }
    }
    return this.lamina.set(t, { k: u, a: x }), this.lamina.size > 512 && this.lamina.clear(), x;
  }
  /** M3: a distância (do centro do bicho, andando na direção h) até a frente do escudo da pessoa t, se o escudo estiver
   *  virado para ele e no caminho do focinho (na altura py); null = sem escudo no caminho */
  escudoNaFrente(t, a, s, o, i) {
    if (this.vq[t] < this.quadro - 1) return null;
    const n = this.ve, r = t * 16;
    if (!n[r]) return null;
    const l = Math.sin(i), d = Math.cos(i), c = l * n[r + 10] + d * n[r + 12];
    if (c > -0.3) return null;
    const h = ((n[r + 1] - a) * n[r + 10] + (n[r + 2] - s) * n[r + 11] + (n[r + 3] - o) * n[r + 12]) / c;
    if (h < 0) return null;
    const f = a + l * h - n[r + 1], u = s - n[r + 2], p = o + d * h - n[r + 3], v = f * n[r + 4] + u * n[r + 5] + p * n[r + 6], y = f * n[r + 7] + u * n[r + 8] + p * n[r + 9];
    return Math.abs(v) > n[r + 13] + 0.1 || y > n[r + 14] + 0.12 || y < -n[r + 15] - 0.12 ? null : h - 0.06;
  }
  /** o corpo de uma pessoa (pernas, saia, tronco, braços, cabeça e cabelo) na pose dada; deixa prontas as matrizes do tronco,
   *  dos braços, da cabeça e das pernas (para o escudo, a ferramenta e as peças do M3) */
  body(t, a, s, o, i, n, r, l, d, c, h, f, u, p = 0, v = 0) {
    const y = this.hm, k = this.m;
    this.trs(k.b, s, o, i, 0, n, 0, a.sc), k.hip.multiplyMatrices(k.b, this.trs(k.t, 0, 0.46, 0)), k.tor.multiplyMatrices(k.hip, this.trs(k.t, 0, 0, 0, u)), y.torso.setMatrixAt(t, k.tor), y.leg.setMatrixAt(t * 2, k.lgL.multiplyMatrices(k.hip, this.trs(k.t, 0.09, 0, 0, r, 0, p))), y.leg.setMatrixAt(t * 2 + 1, k.lgR.multiplyMatrices(k.hip, this.trs(k.t, -0.09, 0, 0, l, 0, v))), y.skirt.setMatrixAt(t, k.l.multiplyMatrices(k.hip, this.trs(k.t, 0, 0.03, 0, u * 0.35))), k.al.multiplyMatrices(k.tor, this.trs(k.t, 0.215, 0.38, 0, d, 0, -h)), y.arm.setMatrixAt(t * 2, k.al), k.ar.multiplyMatrices(k.tor, this.trs(k.t, -0.215, 0.38, 0, c, 0, -f)), y.arm.setMatrixAt(t * 2 + 1, k.ar), k.hd.multiplyMatrices(k.tor, this.trs(k.t, 0, 0.53, 0, -u * 0.6)), y.head.setMatrixAt(t, k.hd), y.hair.setMatrixAt(t, k.l.multiplyMatrices(k.hd, this.trs(k.t, 0, 0.03, -0.012, 0, 0, 0, a.bigHair ? 1.18 : 1)));
  }
  /** mount > 0: montado (altura extra do quadril, em cima do cavalo) */
  poseHuman(t, a, s, o, i, n, r, l, d, c, h, f = 0) {
    const u = this.hm, p = this.m, v = this.phase[a], y = Math.sin(v), k = c + a * 0.37, M = f > 0;
    let x = 0, z = 0, A = 0.05 + Math.sin(k * 1.3) * 0.03, $ = -0.05 - Math.sin(k * 1.3) * 0.03, P = 0.07, I = -0.07, C = 0, w = 0, F = 0, V = 0, S = 0, q = 0;
    const O = Ci(o.weapon), H = O === "spear" && o.weapon ? o.weapon : "spear";
    let U = o.weapon, R = O === "spear" ? "torso" : o.weapon === "bow" ? "left" : "arm", L = O === "spear" ? 0.12 : o.weapon === "bow" ? 0 : o.weapon === "sling" ? Math.PI - 0.12 : o.weapon === "longsword" ? Math.PI - 1 : O === "sword" ? Math.PI - 0.3 : 0.79, Y = !1, ot = 0, ft = !1, dt = o.weapon === "hasta" ? -0.55 : 0;
    const St = () => {
      I = -0.42, P = 0.42, A = $ + 0.06;
    }, Wt = t.task[a];
    if (M && (d || Wt !== Vt || t.state[a] === ce))
      A = -0.75, P = 0.1, $ = -0.25, C = d ? 0.14 : 0.03;
    else if (d)
      x = y * 0.65, z = -y * 0.65, A = -y * 0.5, $ = y * 0.5, w = Math.abs(Math.cos(v)) * 0.035;
    else if (Wt === Xt && t.phase[a] === K0) {
      const ct = t.tgt[a], et = t.tgtTile[a] === 1, Z = et && t.map.tree[ct] > 0, de = et && t.resKind[ct] === 1, Dt = !et && t.kind[ct] >= ut, Gt = (Et, me) => {
        const B = k / Et % 1;
        B < this.lastP[a] && Ue.emit(me, i, r), this.lastP[a] = B;
      };
      if (Z)
        $ = cs(k / 1 % 1, -2.75, -1.35), St(), C = 0.1 + ds(k / 1 % 1) * 0.12, U = "axe", R = "arm", L = Math.PI - 0.6, Gt(1, "work.chop");
      else if (et && !de)
        $ = cs(k / 1.15 % 1, -2.8, -0.55), St(), C = 0.22 + ds(k / 1.15 % 1) * 0.14, U = "pick", R = "arm", L = Math.PI - 0.6, Gt(1.15, t.resKind[ct] >= 3 ? "work.pickMetal" : "work.pick");
      else if (Dt)
        $ = cs(k / 1.4 % 1, -1.95, -0.35), St(), C = 0.32 + ds(k / 1.4 % 1) * 0.1, U = "pick", R = "arm", L = Math.PI - 0.7, Gt(1.4, "work.hoe");
      else if (de) {
        const Et = Math.sin(k * 4.5);
        $ = -0.95 + Et * 0.45, A = -0.95 - Et * 0.45, I = -0.2, P = 0.2, C = 0.5, U = null, Gt(1.4, "work.rustle");
      } else
        $ = -0.55 + Math.sin(k * 7) * 0.3, A = -0.4, C = 0.68, U = null, Gt(1.6, "work.rustle");
    } else if (Wt === le && t.state[a] !== ce) {
      const ct = k / 0.75 % 1;
      $ = cs(ct, -2.3, -0.7), I = -0.15, A = -0.75, C = 0.15 + ds(ct) * 0.08, U = "mallet", R = "arm", L = Math.PI - 0.75, ct < this.lastP[a] && Ue.emit("work.mallet", i, r), this.lastP[a] = ct;
    } else if (Wt === Vt && t.state[a] !== ce) {
      const ct = X[t.kind[a]], et = 1 - Math.max(0, Math.min(1, (t.cd[a] - h) / ct.cd)), Z = t.tgt[a], de = !!ct.hunt && Z >= 0 && t.owner[Z] === Rt;
      if (t.cd[a] > this.lastCd[a] && !ct.proj && !(de && Z >= 0 && t.alive[Z] && t.reach(a, Z, !1) / 256 >= Zi)) {
        const Et = Z >= 0 && t.kind[Z] >= ut;
        Ue.emit(Et ? "hit.wall" : O === "sword" ? "hit.sword" : o.weapon === "axe" ? "hit.axe" : O === "spear" ? "hit.spear" : "hit.club", i, r);
      }
      const Dt = Z >= 0 && t.alive[Z] ? t.reach(a, Z, !1) / 256 : 9, Gt = Z >= 0 && t.alive[Z] && t.kind[Z] >= ut && lt[t.kind[Z] - ut].wall ? this.frenteMuro(t, a, Z, i, r, l) : null;
      if (ct.proj === "arrow" || o.weapon === "bow")
        U = "bow", R = "left", L = 0, A = -1.5, P = 0.2, I = -0.3, C = -0.04, $ = et < 0.2 ? -0.95 - et / 0.2 * 0.5 : -1.45, ft = et >= 0.25;
      else if (ct.proj === "stone")
        if (U = "sling", R = "arm", A = -0.55, P = 0.18, C = -0.03, et < 0.2) {
          const Et = et / 0.2;
          $ = -0.75 - Et * 2.05, L = Math.PI / 2 + 0.7 - Et * 0.85;
        } else if (et < 0.85)
          $ = -2.8, I = -0.18, L = Math.PI / 2 - 0.1, S = k * 15;
        else {
          const Et = (et - 0.85) / 0.15;
          $ = -2.8 + Ua(Et) * 2.05, L = Math.PI / 2 - 0.1 + Et * 0.8, C = -0.03 + Et * 0.12;
        }
      else if ((ct.proj === "spear" || de) && Dt >= Zi) {
        if (U = et < 0.3 ? null : H, R = "torso", L = Math.PI / 2 - 0.25, ot = 0.1, A = -1, C = -0.05, et < 0.3)
          $ = -1.25 + et / 0.3 * 1.05, C = 0.12 - et / 0.3 * 0.17;
        else if (et < 0.75) $ = -0.2 - Ua((et - 0.3) / 0.45) * 2.55;
        else if (et < 0.9) $ = -2.75;
        else {
          const me = (et - 0.9) / 0.1;
          $ = -2.75 + me * me * 1.5, C = -0.05 + me * 0.17;
        }
        const Et = this.muroNaFrente(t, a, i, r, l);
        if (Et) {
          const me = (0.84 - 0.35 * Math.cos($)) * o.sc + f, B = 0.35 * Math.sin(-$) * o.sc, j = Math.atan2(Et.top + 0.25 - me, Math.max(0.12, Et.d - B));
          j > 0.25 && (L = Math.PI / 2 - Math.min(1.35, j));
        }
      } else if (O === "spear" || ct.proj === "spear" || de) {
        if (U = H, R = "torso", ot = 0.05, A = o.shieldKind === "aspis" ? -0.55 : o.shield ? -0.9 : -0.5, P = 0.15, H === "hasta")
          if (et < 0.15) $ = -2.3;
          else if (et < 0.85) $ = -2.3 - Ua((et - 0.15) / 0.7) * 0.6;
          else {
            const T = (et - 0.85) / 0.15;
            $ = -2.9 + T * T * 0.6;
          }
        else if (et < 0.15) $ = -1.25;
        else if (et < 0.85) $ = -1.25 + Ua((et - 0.15) / 0.7) * 0.9;
        else {
          const T = (et - 0.85) / 0.15;
          $ = -0.35 - T * T * 0.9;
        }
        C = 0.06 + (et > 0.85 ? (et - 0.85) / 0.15 : et < 0.15 ? 1 - et / 0.15 : 0) * 0.12;
        let Et = Dt, me = 0.72, B = Z >= 0 ? Math.hypot(t.x[Z] - t.x[a], t.z[Z] - t.z[a]) / 256 : Dt;
        if (Z >= 0 && this.recuo[Z] > 0 && t.tgt[Z] === a && (B += this.recuo[Z], Et += this.recuo[Z]), Gt)
          Et = Gt.d, B = Gt.d, me = Math.min(0.72, Gt.top * 0.6);
        else if (Z >= 0 && t.alive[Z] && t.kind[Z] < Tt) {
          const T = aa[X[t.kind[Z]].key];
          if (me = al(t.kind[Z]), T) {
            const E = Math.cos(Math.atan2(t.x[a] - t.x[Z], t.z[a] - t.z[Z]) - this.heading[Z]);
            Et = B - Math.max(T.body[0] * 0.55, T.body[2] * 0.5 * Math.abs(E));
          } else {
            const E = X[t.kind[Z]].radius;
            Et = B - (E > 0.35 ? E * 0.85 : 0.2);
          }
        }
        const j = 0.35 * Math.sin(-$), K = (0.84 - 0.35 * Math.cos($)) * o.sc + f, _ = Math.atan2(K - me, Math.max(0.4, B - j));
        L = Math.PI / 2 + _, dt = Math.max(0, j + (Th[H] ?? 1.4) * Math.cos(_) - Et + 0.03);
      } else {
        U || (U = "club");
        const Et = Z >= 0 && t.alive[Z] ? t.kind[Z] >= ut ? lt[t.kind[Z] - ut].estrada ? 0.15 : 1 : Ch(t.kind[Z]) : 0.6, me = (U === "gladius" || U === "longsword") && !Gt && Z >= 0 && t.alive[Z] && t.kind[Z] < Tt && !js.has(X[t.kind[Z]].key) && this.vq[Z] >= this.quadro - 1;
        if (me) {
          const _ = Math.hypot(t.x[Z] - t.x[a], t.z[Z] - t.z[a]) / 256, T = Math.max(0, Math.min(0.35, (U === "longsword" ? 1.15 : 1) - _));
          this.recuo[a] += (T - this.recuo[a]) * 0.25, Y = !0, i -= Math.sin(l) * this.recuo[a], r -= Math.cos(l) * this.recuo[a];
        }
        const B = Et + (Ci(U) === "sword" ? 0.18 : 0), j = U === "longsword" ? 0.72 : 0.5;
        let K = -0.6;
        for (; K > -2.2 && (0.84 - 0.35 * Math.cos(K) - j * Math.cos(K - 0.75)) * o.sc + f < B; ) K -= 0.05;
        if (Gt) {
          const _ = (D) => (0.84 - 0.35 * Math.cos(D) - j * Math.cos(D - 0.75)) * o.sc + f, T = (D) => (0.35 * Math.sin(-D) + j * Math.sin(0.75 - D)) * o.sc + 0.06;
          q = Math.max(0, Math.min(0.5, Gt.d - 0.74 * o.sc));
          const E = Gt.d - q;
          let N = -2.6;
          for (; N < -0.6 && !(T(N) >= E - 0.02 && (_(N) <= Gt.top + 0.04 || T(N) >= E + Gt.esp)); ) N += 0.04;
          K = N;
        }
        if (R = "arm", L = Math.PI - 0.75, $ = cs(et, -2.6, Math.max(-2.25, K)), I = -0.15, A = -0.5, C = 0.08 + ds(et) * 0.12, q) {
          const _ = q * ds(et);
          i += Math.sin(l) * _, r += Math.cos(l) * _;
        }
        if (Ci(U) === "sword" && (S = 0.22), me) {
          const _ = Sh[U], T = this.bladeStop(a, Z, o, i, n + f, r, l, _) ?? 1;
          $ = cs(et, _.up, _.up + (_.end - _.up) * T), L = Math.PI - 0.75 + _.wrist * Math.max(0, Math.min(T, ($ - _.up) / (_.end - _.up))), S = _.spin, I = _.rz;
        }
      }
    }
    if (!Y && this.recuo[a] > 0 && (this.recuo[a] = this.recuo[a] < 4e-3 ? 0 : this.recuo[a] * 0.75, i -= Math.sin(l) * this.recuo[a], r -= Math.cos(l) * this.recuo[a]), M && (x = z = -0.38, F = 0.5, V = -0.5), this.lastCd[a] = t.cd[a], this.lastCarry[a] > 0 && t.carry[a] === 0 && t.task[a] === Xt && Ue.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal", "drop.metal"][t.carryRes[a]] ?? "drop.food", i, r), this.lastCarry[a] = t.carry[a], this.body(s, o, i, n + w + f, r, l, x, z, A, $, P, I, C, F, V), o.shield) {
      const ct = o.shieldKind ?? "round", et = $h[ct] ?? [0.04, -0.24, 0.13];
      this.v.set(et[0], et[1], et[2]).applyMatrix4(p.al), p.l.copy(p.tor).setPosition(this.v), M && ct !== "round" && p.l.multiply(this.trs(p.t, 0.05, 0, -0.08, 0, 0.9)), this.guardaEscudo(a, ct, p.l), ct === "round" ? u.shield.setMatrixAt(s, p.l) : (u.shield.setMatrixAt(s, we), ct === "aspis" ? (this.put("aspis", p.l), this.put("emblem", p.l, o.team ?? "#888")) : ct === "scutum" ? (this.put("scutum", p.l, o.shield), this.put("scutumTrim", p.l)) : ct === "oval" ? this.put("oval", p.l, o.shield) : this.put(ct, p.l));
    } else
      u.shield.setMatrixAt(s, we), this.ve[a * 16] = 0;
    this.guardaCorpo(a, o, i, n + w + f, r, l);
    for (const ct of Ai) u[ct].setMatrixAt(s, we);
    if (U && (R === "arm" ? this.tool(s, U, p.l.multiplyMatrices(p.ar, this.trs(p.t, 0, -0.35, 0, L, S))) : (this.gripTorso(p.l, R === "left" ? p.al : p.ar, R === "left" ? 0.02 : 0, L, R === "torso" ? ot : 0), dt && p.l.multiply(this.trs(p.t, 0, -dt, 0)), this.tool(s, U, p.l))), o.extras) for (const [ct, et, Z] of o.extras)
      et === "legs" ? (this.put(ct, p.lgL), this.put(ct, p.lgR)) : this.put(ct, et === "head" ? p.hd : p.tor, Z);
    ft && u.arrow.setMatrixAt(s, this.gripTorso(p.l, p.al, 0.02, Math.PI / 2, -0.12)), t.carry[a] > 0 && t.carryRes[a] === 4 ? (u.carry.setMatrixAt(s, we), this.put("prataCarga", p.l.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.2, -0.19)))) : t.carry[a] > 0 ? (u.carry.setMatrixAt(s, p.l.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.2, -0.19))), u.carry.setColorAt(s, this.c.set(yh[t.carryRes[a]] ?? "#888")), u.carry.instanceColor && (u.carry.instanceColor.needsUpdate = !0)) : u.carry.setMatrixAt(s, we);
  }
  poseAnimal(t, a, s, o, i, n, r, l, d, c, h, f, u, p = !1, v = 0, y = 0, k = !1, M = !1, x = 0) {
    const z = this.am, A = this.m, [$, P, I] = a.body, [C, w, F] = a.head, V = a.leg + P * 0.5, S = r ? Math.sin(l) * (h ? 0.8 : 0.45) : 0, q = r ? Math.abs(Math.cos(l)) * (h ? 0.06 : 0.025) : 0;
    c ? this.trs(A.b, s, o + $ * 0.5 - V * 0, i, 0, n, Math.PI / 2, u) : this.trs(A.b, s, o + q, i, 0, n, 0, u), c && A.b.multiply(this.trs(A.t, 0, -V + $ * 0.1, 0)), x && A.b.multiply(this.trs(A.t, 0, 0, x)), v > 0 && A.b.multiply(this.trs(A.t, 0, 0, y * v, 0.1 * v)), z.body.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, V, 0, 0, 0, 0, $, P, I))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([L, Y], ot) => z.leg.setMatrixAt(t * 4 + ot, A.l.multiplyMatrices(A.b, this.trs(A.t, L * $ * 0.32, a.leg, Y * I * 0.36, L * Y > 0 ? S : -S, 0, 0, a.legW, a.leg, a.legW))));
    const O = c ? 0.2 : M ? h ? 0.22 : r ? 0.08 : 0.12 + Math.sin(d * 1.3 + s) * 0.04 : p ? 0.05 + v * 0.55 : r ? h ? 0.15 : -0.3 : 0.9 + Math.sin(d * 1.7 + s) * 0.08;
    A.hd.multiplyMatrices(A.b, this.trs(A.t, 0, V + P * 0.3, I * 0.46, O));
    const H = a.neckTilt ?? 0.29, U = a.neckW ?? 0.72;
    z.neck.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, -0.04, 0, H, 0, 0, C * U, a.neck * 1.05 + 0.1, w * U))), M ? z.collar.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, V + P * 0.5 - 0.17, -I * 0.04, 0, 0, 0, $ * 1.14, 0.22, I * 0.4))) : z.collar.setMatrixAt(t, k ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, a.neck * 0.45, a.neck * 0.13, 0.29, 0, 0, C * 0.9, 0.06, w * 0.9)) : we), A.hd.multiply(this.trs(A.t, 0, a.neck * Math.cos(H) / Math.cos(0.29), a.neck * Math.sin(H) * (0.3 / Math.sin(0.29)) + F * 0.3, -O * 0.6 + (a.headTilt ?? 0))), z.head.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, 0, 0, 0, 0, 0, C, w, F)));
    const R = Math.min(C / 0.15, 1.35);
    z.ears.setMatrixAt(t, A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, w * 0.5, -F * 0.2, -(a.headTilt ?? 0) * 0.85, 0, 0, R, R, R))), z.antlers.setMatrixAt(t, f && a.antl ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, w * 0.45, -F * 0.12)) : we), z.horns.setMatrixAt(t, a.horns ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, w * 0.35, F * 0.02)) : we), z.tusks.setMatrixAt(t, a.tusks ? A.l.multiplyMatrices(A.hd, this.trs(A.t, 0, -w * 0.25, F * 0.72, -0.6)) : we), z.tail.setMatrixAt(t, A.l.multiplyMatrices(A.b, this.trs(A.t, 0, V + P * 0.32, -I * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(d * 3 + s) * 0.06), 0, 0, a.tail[0], a.tail[1], a.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, a, s, o, i, n, r, l) {
    const d = this.rm, c = this.m, h = this.phase[a];
    t.task[a] === Vt && t.cd[a] > this.lastCd[a] && Ue.emit("ram.boom", o, n), this.lastCd[a] = t.cd[a];
    {
      const v = h / Math.PI % 2;
      v < this.lastP[a] && Ue.emit("ram.creak", o, n, 0.7), this.lastP[a] = v;
    }
    this.trs(c.b, o, i, n, 0, r, 0), d.body.setMatrixAt(s, c.b), d.cloth.setMatrixAt(s, c.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([v, y], k) => d.wheel.setMatrixAt(s * 4 + k, c.l.multiplyMatrices(c.b, this.trs(c.t, v * 0.5, 0.22, y * 0.55, h))));
    let f = 0;
    if (t.task[a] === Vt && t.state[a] !== ce) {
      const v = 1 - Math.max(0, Math.min(1, (t.cd[a] - l) / X[t.kind[a]].cd));
      f = v < 0.15 ? 0.06 * (1 - v / 0.15) : v < 0.85 ? Ua((v - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((v - 0.85) / 0.15) ** 2);
    }
    let u = 0;
    const p = t.tgt[a];
    if (t.task[a] === Vt && p >= 0 && t.alive[p] && t.kind[p] >= ut) {
      const v = jr(t, p, o, n, Math.sin(r), Math.cos(r), 0.62);
      v !== null && (u = Math.max(0, Math.min(0.9, v - 1.33)));
    }
    d.log.setMatrixAt(s, c.l.multiplyMatrices(c.b, this.trs(c.t, 0, 0.62, 0.05 + u - f)));
  }
  /** escorpião e balista (M3): as rodas giram andando; atacando, a manivela puxa os braços para trás devagar (o operador gira a
   *  manivela) e o virote ou a pedra aparece na calha; no disparo, os braços voltam de uma vez. Parada sem alvo: armada */
  poseMachine(t, a, s, o, i, n, r, l, d, c, h) {
    const f = this.m, u = o ? "b" : "s", p = t.players[t.owner[a]]?.color ?? "#888", v = t.task[a] === Vt && t.state[a] !== ce, y = v ? 1 - Math.max(0, Math.min(1, (t.cd[a] - h) / X[t.kind[a]].cd)) : 1, k = d ? 0.3 : y < 0.1 ? 0 : y < 0.85 ? Ua((y - 0.1) / 0.75) : 1, M = !d && y >= 0.3;
    this.lastCd[a] = t.cd[a], this.trs(f.b, i, n, r, 0, l, 0), this.put(u + "Body", f.b), this.put(u + "Plate", f.b, p);
    const x = o ? [[0.52, 0.26, 0.55], [-0.52, 0.26, 0.55], [0.52, 0.26, -0.55], [-0.52, 0.26, -0.55]] : [[0.34, 0.2, -0.32], [-0.34, 0.2, -0.32]];
    for (const [F, V, S] of x) this.put(u + "Wheel", f.l.multiplyMatrices(f.b, this.trs(f.t, F, V, S, this.phase[a])));
    const z = o ? { px: 0.335, py: 1.11, pz: 0.62, L: 0.5, back: 0.55 } : { px: 0.165, py: 0.87, pz: 0.22, L: 0.3, back: 0.36 }, A = -0.12 + k * 0.82, $ = Math.cos(A), P = Math.sin(A);
    this.put(u + "Arm", f.l.multiplyMatrices(f.b, this.trs(f.t, z.px, z.py, z.pz, 0, A))), this.put(u + "Arm", f.l.multiplyMatrices(f.b, this.trs(f.t, -z.px, z.py, z.pz, 0, Math.PI - A)));
    const I = z.px + z.L * $, C = z.pz - z.L * P, w = C - 0.02 - z.back * k;
    for (const F of [-1, 1]) this.put(u + "String", this.cord(F * I, z.py, C, 0, z.py, w));
    M && this.put(o ? "bStone" : "sBolt", f.l.multiplyMatrices(f.b, this.trs(f.t, 0, o ? z.py + 0.06 : z.py, w + (o ? 0.42 : 0.72)))), this.crew(t, a, s, i, r, l, o ? -1.1 : -0.8, o ? -1.8 : -1.55, d, v && y < 0.85, c);
  }
  /** corda esticada de a até b (no espaço da máquina, m.b) */
  cord(t, a, s, o, i, n) {
    this._d.set(o - t, i - a, n - s);
    const r = this._d.length() || 1e-3;
    return this._d.divideScalar(r), this._cq.setFromUnitVectors(this._za, this._d), this._cp.set(t, a, s), this._cs.set(1, 1, r), this.m.l.multiplyMatrices(this.m.b, this.m.t.compose(this._cp, this._cq, this._cs));
  }
  /** o operador da máquina: em pé atrás dela (dz, no espaço da máquina), virado para a frente, com capacete e a túnica do time.
   *  Andando, empurra; na carga, gira a manivela (os braços em volta de ang); esperando, fica com a mão na manivela */
  crew(t, a, s, o, i, n, r, l, d, c, h) {
    const f = t.owner[a], u = t.players[f]?.color ?? "#888", p = Na(a * 7 + 1), v = Na(a * 13 + 5), y = be(mr, p), k = { skin: y, hair: be(gr, v), tunic: u, skirt: be(br, p), legs: y, arms: y, weapon: null, shield: null, bigHair: !1, sc: 1, helmet: !0, team: u }, M = "crew:" + f;
    (this.slotH[s] !== a + 8192 || this.lookKey[s] !== M) && (this.slotH[s] = a + 8192, this.lookKey[s] = M, this.colorHuman(s, k));
    const x = o + Math.sin(n) * r, z = i + Math.cos(n) * r, A = h * 6 + a;
    let $ = 0, P = 0, I = l + 0.5, C = l, w = 0.08;
    if (d) {
      const V = Math.sin(A * 1.4);
      $ = V * 0.55, P = -V * 0.55, I = C = -1.3, w = 0.22;
    } else if (c) {
      const V = Math.sin(A);
      C = l + V * 0.3, I = l - V * 0.3, w = 0.16;
    }
    this.body(s, k, x, zt(t.map, x, z), z, n, $, P, I, C, 0.1, -0.1, w);
    const F = this.hm;
    F.shield.setMatrixAt(s, we), F.carry.setMatrixAt(s, we);
    for (const V of Ai) F[V].setMatrixAt(s, we);
  }
}
const Bt = "#6e4f37", fe = "#8a6545", Pi = "#a0754c", Fa = "#c9a75e", hs = "#b8954f", ko = "#cdb48a", Qi = "#9b968c", zr = "#b98b62", Ne = "#b5813e", Ds = "#8a857c", Mo = "#a7a196";
function zo(e, t, a, s, o, i, n) {
  const r = n() * ke;
  e.add("cone7", i, m(t, 0, a, r, s * 2, o, s * 2));
  for (let l = 0; l < 3; l++) {
    const d = l * ke / 3 + r;
    e.add("cyl5", Bt, m(t + Math.cos(d) * 0.08, o - 0.3, a + Math.sin(d) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(d) * 0.3, Math.cos(d) * 0.3));
  }
  e.add("box", "#3b2b1f", m(t + Math.sin(r) * s * 0.95, 0, a + Math.cos(r) * s * 0.95, r, 0.36, o * 0.4, 0.05, -Math.atan2(s, o)));
}
function Ar(e, t, a, s, o, i, n, r, l, d = 0) {
  e.add("cyl8", r, m(t, 0, a, d, s * 2, i, o * 2)), e.add("cone7", l, m(t, i - 0.06, a, d, s * 2 + 0.44, n, o * 2 + 0.44));
  const c = i - 0.06 + n * 0.86, h = Math.sin(d), f = Math.cos(d), u = Math.cos(d), p = -Math.sin(d);
  for (const v of [-1, 1]) e.add("cyl5", Bt, m(t + u * v * 0.05, c, a + p * v * 0.05, d, 0.045, 0.42, 0.045, 0, v * 0.62));
  e.add("box", "#3a2a1e", m(t + h * o * 0.94, 0, a + f * o * 0.94, d, 0.42, i * 0.8, 0.08));
}
function Ei(e, t, a, s, o, i, n, r) {
  const l = Math.cos(n), d = -Math.sin(n), c = Math.sin(n), h = Math.cos(n);
  for (const [f, u] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", Bt, m(t + l * f * s / 2 + c * u * o / 2, 0, a + d * f * s / 2 + h * u * o / 2, 0, 0.07, u > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", i, m(t, 1.24, a, n, s + 0.2, 0.05, o + 0.3, 0.18)), e.add("box", fe, m(t + c * o * 0.3, 0, a + h * o * 0.3, n, s * 0.9, 0.55, 0.32)), r.forEach((f, u) => e.add(u % 2 ? "ico" : "cyl8", f, m(t + c * o * 0.3 + l * (u - (r.length - 1) / 2) * 0.24, 0.55, a + h * o * 0.3 + d * (u - (r.length - 1) / 2) * 0.24, 0, 0.17, u % 2 ? 0.17 : 0.2, 0.17)));
}
function Eh(e, t, a, s, o) {
  const i = Math.sin(s), n = Math.cos(s), r = Math.cos(s), l = -Math.sin(s);
  e.add("box", o, m(t, 0.78, a, s, 0.34, 0.42, 1));
  for (const [d, c] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", o, m(t + r * d * 0.12 + i * c * 0.36, 0, a + l * d * 0.12 + n * c * 0.36, s, 0.09, 0.8, 0.09));
  e.add("box", o, m(t + i * 0.52, 1, a + n * 0.52, s, 0.16, 0.5, 0.2, 0.5)), e.add("box", o, m(t + i * 0.72, 1.34, a + n * 0.72, s, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", m(t + i * 0.5, 1.1, a + n * 0.5, s, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", m(t - i * 0.52, 0.55, a - n * 0.52, s, 0.07, 0.42, 0.07, -0.25));
}
function Tr(e, t, a, s, o, i, n = 0) {
  e.add("cyl8", "#6b4a2f", m(t, a + o * Math.cos(n), s, i, o * 2, 0.08, o * 2, 0, Math.PI / 2 + n));
}
function Ao(e, t, a, s = 1) {
  for (let o = 0; o < 9; o++) {
    const i = o / 9 * ke;
    e.add("dode", "#8a857c", m(t + Math.cos(i) * 0.5 * s, 0.05, a + Math.sin(i) * 0.5 * s, i, 0.24 * s, 0.18 * s, 0.24 * s));
  }
  e.add("cyl5", "#4a3526", m(t, 0.08, a, 0.3, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", m(t, 0.1, a, 1.9, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0));
}
function To(e, t, a, s, o, i, n, r, l, d = 0, c = 0) {
  e.add("box", r, m(t, c, a, d, s, i, o)), e.add("prism", l, m(t, c + i - 0.04, a, d, s + 0.4, n, o + 0.36)), e.add("box", "#3a2a1e", m(t + Math.sin(d) * (o / 2 + 0.01), c, a + Math.cos(d) * (o / 2 + 0.01), d, Math.min(0.5, s * 0.3), i * 0.72, 0.06));
}
function $r(e, t, a, s) {
  for (let o = 0; o < a; o++) {
    const i = o / a * ke;
    e.add("box", Qi, m(Math.cos(i) * t, 0, Math.sin(i) * t, i, 0.3, s * (0.8 + o % 3 * 0.15), 0.22));
  }
}
function Ih(e, t) {
  const a = Math.round(t * 4);
  for (let s = 0; s <= a; s++) {
    const o = -t + s * 2 * t / a;
    for (const [i, n] of [[o, -t], [o, t], [-t, o], [t, o]]) e.add("cyl5", Bt, m(i, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const s of [0.25, 0.48])
    e.add("box", fe, m(0, s, -t, 0, t * 2, 0.05, 0.05)), e.add("box", fe, m(0, s, t, 0, t * 2, 0.05, 0.05)), e.add("box", fe, m(-t, s, 0, 0, 0.05, 0.05, t * 2)), e.add("box", fe, m(t, s, 0, 0, 0.05, 0.05, t * 2));
}
function Ii(e, t, a, s) {
  e.add("ico", "#ece6d6", m(t, 0.32, a, s, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", m(t + Math.sin(s) * 0.32, 0.36, a + Math.cos(s) * 0.32, s, 0.13, 0.16, 0.2));
  for (const [o, i] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", m(t + o, 0, a + i, s, 0.05, 0.2, 0.05));
}
const $s = "#b4532f", ma = "#94402a", Ws = "#ede6d7", Gs = "#ddd2bd", Vs = "#d3ae79", Ea = "#b9673e", ua = "#c9b98e", qh = "#b9a87e", ss = "#d6c9a2", Oh = "#6c624e", wh = "#b3ac9d", Rh = "#a59e8f", ps = "#e0dacb", Do = "#d0c9b8", fa = "#f4f0e7", Bh = "#b06a40", Dh = "#d8c69a", Sr = "#dfe3e8", Cr = "#6f7276", tn = "#4c9cc0", Ce = "#33261c", sa = (e, t, a) => [e * Math.cos(a) + t * Math.sin(a), -e * Math.sin(a) + t * Math.cos(a)], Nh = (e, t, a, s, o, i, n, r = 0.03) => e.poly(t, [[a, n, s], [o, n, s], [o, n, i], [a, n, i]], r);
function oa(e, t, a, s, o, i, n, r = 0, l = $s) {
  e.add("prism", l, m(t, a, s, r, o, i, n), 0.03);
  const d = Math.max(3, Math.round(n / 0.2)), c = Math.hypot(o / 2, i), h = Math.atan2(i, o / 2);
  for (const f of [-1, 1]) for (let u = 0; u < d; u++) {
    const [p, v] = sa(f * o / 4, -n / 2 + (u + 0.5) * n / d, r);
    e.add("box", ma, m(t + p, a + i / 2, s + v, r, c * 0.97, 0.03, 0.05, 0, -f * h), 0.04);
  }
  e.add("box", ma, m(t, a + i - 0.035, s, r, 0.09, 0.07, n), 0.03);
}
function Cn(e, t, a, s, o, i, n, r, l) {
  const [d, c] = sa(0, n / 2 + 0.013, r);
  e.add("prism", l, m(t + d, a + 0.035, s + c, r, o * 0.84, i * 0.82, 0.026), 0.02);
}
function Pr(e, t, a, s) {
  e.add("cone4", $s, m(0, t, 0, Math.PI / 4, a, s, a), 0.03);
  const o = Math.hypot(a / 2, s), i = Math.atan2(a / 2, s);
  for (let n = 0; n < 4; n++) {
    const r = n * Math.PI / 2 + Math.PI / 4;
    e.add("box", ma, m(0, t + s, 0, r, 0.07, o, 0.07, Math.PI - i), 0.03);
  }
  e.add("cone4", Ea, m(0, t + s - 0.04, 0, Math.PI / 4, 0.14, 0.2, 0.14), 0.03);
}
function Ia(e, t, a, s, o, i, n, r = n, l = !1) {
  if (e.add("box", r, m(t, a, s, 0, i * 2.7, 0.05, i * 2.7), 0.02), e.add("cyl8", n, m(t, a + 0.05, s, 0, i * 2, o - 0.12, i * 2), 0.02), e.add("box", r, m(t, a + o - 0.075, s, Math.PI / 4, i * 2.1, 0.04, i * 2.1), 0.02), e.add("box", r, m(t, a + o - 0.04, s, 0, i * 2.9, 0.04, i * 2.9), 0.02), l) for (const d of [-1, 1]) e.add("cyl8", r, m(t + d * i * 1.3, a + o - 0.095, s - i * 1.3, 0, 0.075, i * 2.6, 0.075, Math.PI / 2), 0.02);
}
function sl(e, t, a, s = 1, o = Bh) {
  e.add("ico", o, m(t, 0.2 * s, a, 0, 0.19 * s, 0.34 * s, 0.19 * s), 0.08), e.add("cyl5", o, m(t, 0.34 * s, a, 0, 0.065 * s, 0.13 * s, 0.065 * s), 0.08), e.add("cyl8", o, m(t, 0.46 * s, a, 0, 0.09 * s, 0.025 * s, 0.09 * s), 0.08);
  for (const i of [-1, 1]) e.add("box", o, m(t + i * 0.055 * s, 0.33 * s, a, 0, 0.02 * s, 0.12 * s, 0.03 * s, 0, i * 0.3), 0.08);
}
function Er(e, t, a, s, o, i = 1) {
  e.add("ico", Dh, m(t, a + 0.13 * i, s, o, 0.3 * i, 0.27 * i, 0.25 * i), 0.12), e.add("cyl5", "#a89670", m(t, a + 0.24 * i, s, o, 0.07 * i, 0.07 * i, 0.07 * i), 0.05);
}
const $o = 0.42;
function en(e, t, a, s, o, i = !1) {
  i ? (e.add("cyl8", s, m(t, 0, a, 0, 0.56, 0.34, 0.56), 0.03), e.add("cyl8", o, m(t, 0.34, a, 0, 0.64, 0.06, 0.64), 0.02)) : (e.add("box", s, m(t, 0, a, 0, 0.36, 0.34, 0.34), 0.03), e.add("box", o, m(t, 0.34, a, 0, 0.44, 0.06, 0.42), 0.02)), e.add("cyl8", "#3b2d24", m(t, 0.4, a, 0, 0.3, 0.02, 0.3), 0);
}
function Ir(e, t, a, s) {
  e.add("box", s, m(t, 0, a, 0, 0.36, 0.32, 0.36), 0.02), Ia(e, t, 0.32, a, 1.25, 0.08, s);
  const o = "#c9a24a";
  e.add("box", o, m(t, 1.57, a, 0, 0.12, 0.26, 0.09), 0.05), e.add("ico", o, m(t, 1.9, a, 0, 0.1, 0.11, 0.1), 0.05), e.add("box", o, m(t + 0.08, 1.7, a, 0, 0.04, 0.24, 0.04, 0, -0.5), 0.05);
}
function Fh(e, t) {
  const a = t ? ps : wh, s = t ? Do : Rh, o = t ? "#aaa393" : "#87806f";
  e.add("box", o, m(0, -0.45, 0, 0, 3.86, 0.5, 3.86), 0.02);
  const i = 6, n = 3.86 / i;
  for (let r = 0; r < i; r++) for (let l = 0; l < i; l++) Nh(e, (r * 7 + l * 5) % 3 ? a : s, -1.93 + r * n + 0.02, -1.93 + l * n + 0.02, -1.93 + (r + 1) * n - 0.02, -1.93 + (l + 1) * n - 0.02, 0.06);
  if (t) {
    e.add("box", Do, m(0, 0.05, -1, 0, 3.1, 0.22, 1.42), 0.02);
    for (let r = 0; r < 2; r++) e.add("box", ps, m(0, 0.05, -0.27 + r * 0, 0, 2.2, 0.15 - r * 0.07, 0.12 + (1 - r) * 0.12), 0.02);
    e.add("box", Ws, m(0, 0.27, -1.2, 0, 2.9, 1.35, 0.96)), e.add("box", Ne, m(0, 0.27, -0.71, 0, 0.56, 0.9, 0.03), 0.02);
    for (const r of [-0.95, 0.95]) e.add("box", Ce, m(r, 0.85, -0.71, 0, 0.22, 0.4, 0.03), 0);
    for (let r = 0; r < 6; r++) Ia(e, -1.35 + r * 0.54, 0.27, -0.42, 1.35, 0.065, fa, fa, !0);
    e.add("box", Gs, m(0, 1.62, -0.92, 0, 3.12, 0.14, 1.6), 0.02), oa(e, 0, 1.76, -0.92, 3.2, 0.62, 1.62, 0), Cn(e, 0, 1.76, -0.92, 3.2, 0.62, 1.62, 0, Ws), e.add("box", Do, m(-0.55, 0.06, 0.85, 0, 1.3, 0.44, 0.6), 0.02), e.add("box", ps, m(-0.55, 0.5, 0.85, 0, 1.36, 0.06, 0.66), 0.02);
    for (const r of [-1, -0.55, -0.1]) e.add("cone4", Ne, m(r, 0.28, 1.15, Math.PI / 4, 0.13, 0.24, 0.13, Math.PI / 2), 0.03);
    for (const r of [-1.15, 0.05]) e.add("box", ps, m(r, 0.56, 0.85, 0, 0.06, 0.2, 0.6), 0.02);
    en(e, 1.2, 1.3, fa, ps, !0), Ir(e, -1.45, 1.5, fa);
  } else {
    e.add("box", Vs, m(0, 0.05, -1.15, 0, 3, 1.2, 1)), e.add("box", Ea, m(0, 1.12, -1.15, 0, 3.04, 0.13, 1.04), 0.02), e.add("box", Ce, m(0, 0.05, -0.64, 0, 0.42, 0.72, 0.03), 0);
    for (const r of [-1, 1]) e.add("box", Ce, m(r, 0.55, -0.64, 0, 0.24, 0.3, 0.03), 0);
    for (let r = 0; r < 5; r++) Ia(e, -1.3 + r * 0.65, 0.05, -0.32, 1.12, 0.075, "#eadfc6", Vs);
    e.add("box", Ea, m(0, 1.17, -0.32, 0, 2.86, 0.1, 0.2), 0.02), oa(e, 0, 1.25, -0.95, 1.72, 0.5, 3.15, Math.PI / 2), en(e, 1.2, 1.3, ua, ss, !0), Ir(e, -1.3, 1.25, ss), e.add("cyl8", ua, m(-0.15, 0.06, 0.95, 0, 0.44, 0.28, 0.44), 0.03), e.add("cyl8", "#2c3a40", m(-0.15, 0.3, 0.95, 0, 0.3, 0.05, 0.3), 0);
  }
}
function Lh(e, t) {
  const a = t ? "#f0e9dc" : "#d9bb8c", s = t ? 1 : 0.9, o = 0.8, i = 0.15, n = 0.25, r = t ? "#b8553a" : "#c9925f", l = o + 0.1, d = s + 0.1, c = s - 0.14, h = Math.atan2(d - c, l - n);
  e.add("box", t ? "#c9c0ae" : "#b9a684", m(0, -0.3, 0, 0, o * 2 + 0.04, 0.33, o * 2 + 0.04), 0.02);
  for (const f of [-1, 1])
    e.add("box", a, m(0, 0, f * (o - i / 2), 0, o * 2, s - 0.012, i)), e.add("box", a, m(f * (o - i / 2), 0, 0, 0, i, s - 0.012, o * 2 - i * 2));
  if (t) for (const f of [-1, 1])
    e.add("box", "#a5432f", m(0, 0, f * (o + 3e-3), 0, o * 2 + 0.012, 0.16, 0.02), 0.02), e.add("box", "#a5432f", m(f * (o + 3e-3), 0, 0, 0, 0.02, 0.16, o * 2), 0.02);
  for (const f of [-1, 1])
    e.add("box", r, m(0, 0, f * (n + 0.02), 0, n * 2 + 0.08, c - 0.02, 0.04), 0.03), e.add("box", r, m(f * (n + 0.02), 0, 0, 0, 0.04, c - 0.02, n * 2), 0.03);
  e.add("box", "#d6cbb5", m(0, 0, 0, 0, n * 2, 0.03, n * 2), 0.02), e.add("box", "#b5a991", m(0, 0.03, 0, 0, 0.3, 0.04, 0.3), 0.02), e.add("box", tn, m(0, 0.05, 0, 0, 0.23, 0.03, 0.23), 0.02);
  for (let f = 0; f < 4; f++) {
    const u = f * Math.PI / 2, p = (x, z, A) => {
      const [$, P] = sa(x, A, u);
      return [$, z, P];
    };
    e.poly($s, [p(-l, d, l), p(l, d, l), p(n, c, n), p(-n, c, n)], 0.04);
    for (const x of [-0.66, -0.44, -0.22, 0, 0.22, 0.44, 0.66]) {
      const z = Math.max(Math.abs(x) + 0.03, n), A = (z + l) / 2, $ = c + (A - n) * Math.tan(h), [P, I] = sa(x, A, u);
      e.add("box", ma, m(P, $, I, u, 0.045, 0.03, (l - z) / Math.cos(h), -h), 0.04);
    }
    const [v, y] = sa(0, l, u), [k, M] = sa(0, n, u);
    e.add("box", ma, m(v, d - 0.07, y, u, l * 2, 0.07, 0.04), 0.02), e.add("box", ma, m(k, c - 0.06, M, u, n * 2, 0.06, 0.03), 0.02);
  }
  e.add("box", Ce, m(0, 0, o + 5e-3, 0, 0.3, t ? 0.66 : 0.6, 0.03), 0);
  for (const f of [-1, 1]) for (const u of [-0.4, 0.35]) e.add("box", Ce, m(f * (o + 5e-3), 0.52, u, 0, 0.03, 0.14, 0.12), 0);
  if (t) {
    for (const f of [-1, 1]) e.add("box", Gs, m(f * 0.2, 0, o + 0.02, 0, 0.07, 0.72, 0.05), 0.02);
    e.add("prism", Ea, m(0, 0.72, o + 0.03, 0, 0.52, 0.14, 0.06), 0.02), e.add("box", "#9a8f7c", m(-0.5, 0, o + 0.09, 0, 0.36, 0.15, 0.12), 0.03), e.add("cyl8", Ea, m(0.52, 0, o + 0.1, 0, 0.16, 0.13, 0.16), 0.03), e.add("cone7", "#4f7a3a", m(0.52, 0.12, o + 0.1, 0, 0.17, 0.42, 0.17), 0.05);
  } else sl(e, 0.55, o + 0.11, 1.15, "#a35f3b");
}
function jh(e, t) {
  const a = t ? "#ded3bf" : "#c8b590", s = t ? "#a9553b" : "#ae9870";
  e.add("box", s, m(0, -0.28, -0.38, 0, 1.86, 0.4, 0.96), 0.02), e.add("box", a, m(0, 0.1, -0.38, 0, 1.76, 0.9, 0.88));
  for (const o of [-0.86, -0.29, 0.29, 0.86]) e.add("box", s, m(o, 0.1, 0.07, 0, 0.12, 0.9, 0.06), 0.03);
  for (const o of [-0.575, 0.575]) e.add("box", Ce, m(o, 0.6, 0.065, 0, 0.09, 0.26, 0.03), 0);
  for (const o of [-1, 1]) for (const i of [-0.62, -0.14]) e.add("box", Ce, m(o * 0.885, 0.6, i, 0, 0.03, 0.26, 0.09), 0);
  e.add("box", Ce, m(0, 0.1, 0.065, 0, 0.34, 0.56, 0.03), 0), e.add("box", s, m(0, 0.66, 0.075, 0, 0.46, 0.08, 0.05), 0.02), oa(e, 0, 1, -0.38, 1.12, 0.42, 1.96, Math.PI / 2);
  for (const [o, i, n] of [[0.42, 0.45, 1], [0.62, 0.38, 1.05], [0.78, 0.6, 0.95], [0.55, 0.72, 1]]) sl(e, o, i, n);
  for (const [o, i, n] of [[-0.75, 0.42, 0.3], [-0.45, 0.45, -0.2], [-0.62, 0.72, 0.9]]) Er(e, o, 0, i, n);
  Er(e, -0.6, 0.22, 0.5, 0.5, 0.9), e.add("box", fe, m(-0.05, 0, 0.62, 0.2, 0.3, 0.26, 0.3), 0.05);
}
function _h(e) {
  e.add("box", Ds, m(0, -0.3, -0.82, 0, 2.2, 0.52, 0.98), 0.02), e.add("box", Vs, m(0, 0.2, -0.82, 0, 2.1, 0.85, 0.86));
  for (const t of [-0.55, 0.55]) e.add("box", Ce, m(t, 0.2, -0.385, 0, 0.3, 0.6, 0.03), 0);
  for (const t of [-0.9, 0, 0.9]) e.add("box", Ce, m(t, 0.62, -0.385, 0, 0.15, 0.15, 0.03), 0);
  oa(e, 0, 1.05, -0.82, 1.12, 0.46, 2.3, Math.PI / 2);
  for (const t of [0.2, 1]) e.add("box", Bt, m(t, 0, 0.5, 0, 0.07, 0.9, 0.07));
  e.add("box", Bt, m(0.6, 0.82, 0.5, 0, 0.9, 0.06, 0.06));
  for (let t = 0; t < 5; t++) {
    const a = 0.3 + t * 0.15;
    e.add("cyl5", "#8a6a48", m(a, 0, 0.66, 0, 0.035, 1.4, 0.035, -0.12), 0.05), e.add("cone4", Ne, m(a, 1.39, 0.49, 0, 0.07, 0.18, 0.07, -0.12), 0.03);
  }
  for (const [t, a, s] of [[0.35, 0.78, 0.1], [0.85, 0.8, -0.15]]) e.add("cyl8", Ne, m(t, 0.26, a, s, 0.5, 0.04, 0.5, Math.PI / 2 - 0.2), 0.03);
  e.add("cyl5", Bt, m(-0.85, 0, 0.55, 0, 0.17, 1.1, 0.17));
  for (const t of [-1, 1]) e.add("box", Bt, m(-0.3 + t * 0.16, 0, 0.75, 0, 0.05, 0.62, 0.05, 0, t * 0.12));
  e.add("cyl8", "#d6b85a", m(-0.3, 0.6, 0.72, 0, 0.56, 0.09, 0.56, Math.PI / 2), 0.04), e.add("cyl8", "#b5523b", m(-0.3, 0.6, 0.81, 0, 0.32, 0.012, 0.32, Math.PI / 2), 0.02), e.add("cyl8", "#efe6cf", m(-0.3, 0.6, 0.822, 0, 0.13, 0.012, 0.13, Math.PI / 2), 0.02);
}
const ol = 0.3;
function Uh(e) {
  const t = "#7d6549", a = "#8f6e4a", s = "#a7845c";
  for (let i = 0; i < 4; i++) {
    const n = i * Math.PI / 2, r = i === 0, l = (d, c) => sa(d, c, n);
    {
      const [d, c] = l(0, 1.36);
      e.add("box", t, m(d, -0.3, c, n, 1.36 * 2 + 0.28, 0.48, 0.3), 0.04);
    }
    for (const [d, c] of r ? [[-1.36, -0.34], [0.34, 1.36]] : [[-1.36, 1.36]]) {
      const [h, f] = l((d + c) / 2, 1.36);
      e.add("box", "#5e4632", m(h, 0.1, f, n, c - d, 0.42, 0.05), 0.03);
      const u = Math.max(1, Math.round((c - d) / 0.27));
      for (let p = 0; p <= u; p++) {
        const [v, y] = l(d + (c - d) * p / u, 1.4000000000000001);
        e.add("box", p % 2 ? a : s, m(v, 0.1, y, n, 0.1, 0.5, 0.1), 0.06), e.add("cone4", s, m(v, 0.6, y, n + Math.PI / 4, 0.14, 0.13, 0.14), 0.05);
      }
    }
  }
  for (const i of [-1, 1]) e.add("box", Bt, m(i * 0.36, 0, 1.36 + 0.04, 0, 0.13, 0.98, 0.13));
  e.add("box", Bt, m(0, 0.86, 1.36 + 0.04, 0, 0.86, 0.09, 0.11));
  for (const [i, n] of [[-0.72, -0.66], [0, -0.66], [0.72, -0.66], [-0.72, 0.32], [0.72, 0.32]])
    e.add("prism", "#b8946a", m(i, 0, n, 0, 0.56, 0.5, 0.72), 0.06), e.add("prism", "#6d5139", m(i, 0, n + 0.365, 0, 0.26, 0.27, 0.02), 0.02), e.add("cyl5", Bt, m(i, 0, n + 0.37, 0, 0.03, 0.56, 0.03), 0.03);
  e.add("box", "#9a948a", m(0, 0, ol, 0, 0.26, 0.14, 0.26), 0.03);
}
function Hh(e, t) {
  const a = t ? Gs : ua, s = t ? fa : ss, o = t ? Ws : "#e9dcc1", i = t ? fa : "#efe5cf", n = t ? fa : Vs, r = t ? Gs : Ea, l = 0.6, d = 1.15, c = -1.3, h = 0.62, f = t ? 1.25 : 1.15, u = l + f;
  e.add("box", s, m(0, -0.3, (c + h) / 2, 0, d * 2 + 0.08, 0.38, h - c + 0.08), 0.02), e.add("box", a, m(0, 0, (c + h) / 2, 0, d * 2, l - 0.08, h - c)), e.add("box", s, m(0, l - 0.08, (c + h) / 2, 0, d * 2 + 0.06, 0.08, h - c + 0.06), 0.02);
  for (let C = 1; C <= 4; C++) e.add("box", s, m(0, -0.12, h + (5 - C) * 0.085 - 0.01, 0, (t ? 1.5 : 1.24) - C * 0.012, 0.12 + C * 0.15, (5 - C) * 0.17 + 0.02), 0.03);
  const p = t ? 0.92 : 0.98, v = c + 0.08, y = t ? -0.3 : -0.25;
  if (e.add("box", o, m(0, l, (v + y) / 2, 0, p * 2, f, y - v)), t) e.add("box", Ne, m(0, l, y + 5e-3, 0, 0.42, 0.82, 0.03), 0.02);
  else for (const C of [-0.6, 0, 0.6])
    e.add("box", Ce, m(C, l, y + 5e-3, 0, C ? 0.3 : 0.4, C ? 0.62 : 0.76, 0.03), 0), e.add("box", Ea, m(C, l + (C ? 0.62 : 0.76), y + 0.01, 0, (C ? 0.3 : 0.4) + 0.1, 0.07, 0.04), 0.02);
  const k = t ? [-1, -0.6, -0.2, 0.2, 0.6, 1] : [-0.95, -0.34, 0.34, 0.95], M = 0.48;
  for (const C of k) Ia(e, C, l, M, f, t ? 0.068 : 0.085, i, n, t);
  for (const C of t ? [-1, 1] : [-0.95, -0.34, 0.34, 0.95]) Ia(e, C, l, 0.02, f, t ? 0.068 : 0.085, i, n, t);
  if (t) for (const C of [-1, 1]) for (const w of [-1.05, -0.65]) Ia(e, C * (p + 0.03), l, w, f, 0.06, i, n, !0);
  e.add("box", r, m(0, u, (c + h) / 2 - 0.02, 0, d * 2 - 0.04, 0.15, h - c - 0.04), 0.02), e.add("box", t ? "#cfc7b6" : Vs, m(0, u + 0.04, h - 0.04, 0, d * 2 - 0.02, 0.07, 0.03), 0.02);
  const x = 2.4, z = t ? 0.62 : 0.46, A = h - c + (t ? 0.12 : 0.36), $ = (c + h) / 2 + (t ? 0.04 : 0.16), P = u + 0.15;
  oa(e, 0, P, $, x, z, A, 0), Cn(e, 0, P, $, x, z, A, 0, t ? Ws : Ea);
  const I = $ + A / 2 + 0.03;
  if (t) {
    e.add("cone4", "#d9b04a", m(0, P + z - 0.02, I - 0.02, Math.PI / 4, 0.16, 0.24, 0.05), 0.03);
    for (const C of [-1, 1]) e.add("cone4", "#d9b04a", m(C * (x / 2 - 0.08), P, I - 0.02, Math.PI / 4, 0.1, 0.16, 0.04), 0.03);
  } else
    for (const [C, w] of [[I - 0.2, 1.15], [$ - 0.15, 1], [$ - A / 2 + 0.25, 1]]) {
      const F = P + z - 0.03, V = "#b5653c";
      e.add("box", ma, m(0, F, C, 0, 0.16 * w, 0.05, 0.14 * w), 0.03), e.add("cone7", V, m(0, F + 0.05, C, 0, 0.15 * w, 0.24 * w, 0.13 * w), 0.05), e.add("box", V, m(0, F + 0.2 * w, C, 0, 0.09 * w, 0.11 * w, 0.07 * w), 0.05), e.add("ico", "#c27a4c", m(0, F + 0.35 * w, C, 0, 0.075 * w, 0.085 * w, 0.075 * w), 0.05);
    }
  en(e, 0.95, 1.08, a, s);
}
function Wh(e) {
  const t = "#aea595", a = "#9c9384";
  e.add("box", a, m(0, -0.25, -0.3, 0, 1.84, 0.31, 1.3), 0.02), e.add("box", t, m(0, 0.06, -0.75, 0, 1.7, 1.06, 0.2));
  for (const s of [-1, 1]) e.add("box", t, m(s * 0.79, 0.06, -0.3, 0, 0.12, 1.06, 1.1));
  for (let s = 0; s < 3; s++) e.add("box", a, m(0, 0.3 + s * 0.3, -0.64, 0, 1.6, 0.025, 0.02), 0);
  oa(e, 0, 1.12, -0.3, 1.24, 0.42, 1.84, Math.PI / 2), e.add("cyl8", "#8f5236", m(-0.42, 0.06, -0.38, 0, 0.7, 0.14, 0.7), 0.03), e.add("hemi", "#a5603f", m(-0.42, 0.2, -0.38, 0, 0.66, 0.6, 0.66), 0.04), e.add("box", "#2b1d16", m(-0.42, 0.22, -0.05, 0, 0.22, 0.18, 0.03), 0), e.add("cyl5", "#8f5236", m(-0.5, 0.45, -0.52, 0, 0.17, 1.35, 0.17), 0.03), e.add("box", a, m(0.18, 0.06, -0.2, 0.3, 0.24, 0.3, 0.22), 0.03), e.add("box", Cr, m(0.18, 0.36, -0.2, 0.3, 0.32, 0.07, 0.14), 0.02), e.add("cyl5", Bt, m(0.3, 0.43, -0.12, 0.3, 0.03, 0.22, 0.03, Math.PI / 2 - 0.1), 0.02), e.add("box", Cr, m(0.29, 0.4, -0.12, 0.3, 0.06, 0.06, 0.1), 0.02), e.add("box", fe, m(0.38, 0.4, 0.5, 0, 0.74, 0.05, 0.36), 0.03);
  for (const [s, o] of [[-0.3, -0.13], [0.3, -0.13], [-0.3, 0.13], [0.3, 0.13]]) e.add("box", Bt, m(0.38 + s, 0, 0.5 + o, 0, 0.05, 0.4, 0.05), 0.03);
  for (const [s, o, i] of [[-0.22, -0.06, 3], [-0.08, 0.07, 4], [0.05, -0.07, 2], [0.18, 0.05, 3], [0.28, -0.07, 2]]) for (let n = 0; n < i; n++) e.add("cyl8", n % 2 ? "#c5cbd2" : Sr, m(0.38 + s + n % 2 * 8e-3, 0.45 + n * 0.03, 0.5 + o - n % 3 * 6e-3, n, 0.1, 0.03, 0.1), 0.02);
  e.add("ico", "#a0825a", m(0.62, 0.52, 0.56, 0, 0.12, 0.13, 0.11), 0.05), e.add("box", "#6b4a2f", m(-0.5, 0.06, 0.48, 0.15, 0.4, 0.26, 0.26), 0.04);
  for (let s = 0; s < 3; s++) e.add("box", Sr, m(-0.58 + s * 0.08, 0.32, 0.48, 0.15, 0.06, 0.05, 0.18), 0.03);
  for (const [s, o] of [[0, -0.05], [0.1, 0.07], [-0.06, 0.1]]) e.add("dode", "#c9ccd2", m(-0.05 + s, 0.1, 0.15 + o, s * 9, 0.14, 0.1, 0.13), 0.08);
}
function Gh(e) {
  const t = "#bdb29c", a = "#aa9f88", o = [-1.05, -0.25, 0.55];
  for (const i of o) e.addGeo(mh(0.8, 1.85, 0.26, 1.02), i === -0.25 ? a : t, m(i, 0, 0, 0, 1, 1, 0.44), 0.04);
  for (const i of [-1.45, -0.65, 0.15, 0.95]) e.add("box", a, m(i, -0.4, 0, 0, 0.3, 0.45, 0.5), 0.03);
  for (const i of [-1.45, -0.65, 0.15]) e.add("box", a, m(i === -1.45 ? -1.41 : i, 1, 0, 0, i === -1.45 ? 0.1 : 0.36, 0.06, 0.48), 0.02);
  for (const i of [-1, 1]) e.add("box", a, m(-0.27, 1.56, i * 0.215, 0, 2.44, 0.05, 0.04), 0.02);
  e.add("box", a, m(-0.27, 1.85, 0, 0, 2.44, 0.1, 0.5), 0.02);
  for (const i of [-1, 1]) e.add("box", t, m(-0.27, 1.85 + 0.1, i * 0.2, 0, 2.44, 0.16, 0.1), 0.03);
  e.add("box", tn, m(-0.28, 1.85 + 0.1, 0, 0, 2.42, 0.1, 0.3), 0.03), e.add("box", "#7fc3dc", m(-0.28, 1.85 + 0.2, 0, 0, 2.38, 5e-3, 0.12), 0.02), e.add("box", t, m(1.2, -0.3, 0, 0, 0.56, 1.85 + 0.62, 0.9)), e.add("box", a, m(1.2, 1.85 + 0.32, 0, 0, 0.64, 0.07, 0.98), 0.02), e.add("cone4", $s, m(1.2, 1.85 + 0.39, 0, Math.PI / 4, 0.92, 0.38, 1.3), 0.03), e.add("box", Ne, m(1.2, 0.86, 0.47, 0, 0.08, 0.06, 0.12), 0.02), e.add("box", "#a9dcec", m(1.2, 0.26, 0.55, 0, 0.05, 0.62, 0.05), 0.02), e.add("box", a, m(1.1, 0, 0.84, 0, 0.62, 0.28, 0.62), 0.03), e.add("box", tn, m(1.1, 0.22, 0.84, 0, 0.5, 0.07, 0.5), 0.02);
}
function Vh(e) {
  const t = Ws, a = Gs, s = 1.12, o = -1.15, i = 0.72, n = 0.6, r = 2, l = 1.3;
  e.add("box", Do, m(0, -0.3, 0, 0, 2.86, 0.44, 2.86), 0.02), e.add("box", ps, m(0, 0.1, 0.04, 0, 2.6, 0.04, 2.6), 0.02), e.add("box", t, m(0, 0.14, (o + i) / 2, 0, n * 2, r - 0.14, i - o));
  for (const c of [-1, 1]) e.add("box", a, m(c * (n + 0.21), 0.14, (o + i) / 2, 0, 0.42, l - 0.14, i - o));
  for (const c of [-1, 1]) for (let h = 0; h < 5; h++) e.add("box", Ce, m(c * (n + 5e-3), 1.5, o + 0.2 + h * 0.37, 0, 0.03, 0.28, 0.15), 0);
  e.add("box", Ce, m(0, 0.14, i + 5e-3, 0, 0.36, 0.76, 0.03), 0);
  for (const c of [-1, 1]) e.add("box", Ce, m(c * 0.82, 0.14, i + 5e-3, 0, 0.22, 0.52, 0.03), 0);
  for (const c of [-s, -0.56, 0, 0.56, s]) Ia(e, c, 0.14, s, l - 0.14, 0.058, fa);
  for (const c of [-1, 1]) for (const h of [-1, -0.42, 0.16, 0.62]) Ia(e, c * s, 0.14, h, l - 0.14, 0.058, fa);
  e.add("box", a, m(0, l, s, 0, s * 2 + 0.14, 0.1, 0.14), 0.02);
  for (const c of [-1, 1]) e.add("box", a, m(c * s, l, (o + s) / 2 - 0.05, 0, 0.14, 0.1, s - o + 0.1), 0.02);
  const d = (c, h, f, u, p, v) => {
    const y = Math.hypot(f - c, h - u), k = Math.atan2(h - u, Math.abs(f - c)), M = Math.sign(f - c);
    e.add("box", $s, m((c + f) / 2, (h + u) / 2 - 0.02, (p + v) / 2, 0, y, 0.05, v - p, 0, -M * k), 0.03);
    for (let x = 0; x < Math.round((v - p) / 0.2); x++) e.add("box", ma, m((c + f) / 2, (h + u) / 2 + 0.03, p + (x + 0.5) * 0.2, 0, y, 0.03, 0.045, 0, -M * k), 0.04);
  };
  for (const c of [-1, 1]) d(c * n, 1.58, c * (s + 0.1), l + 0.08, o - 0.06, s + 0.08);
  {
    const c = s - i + 0.16, h = Math.atan2(0.14, c), f = (i + s) / 2 + 0.04;
    e.add("box", $s, m(0, l + 0.09, f, 0, n * 2 + 0.02, 0.05, c, h), 0.03);
    for (let u = 0; u < 6; u++) e.add("box", ma, m(-n + (u + 0.5) * n / 3, l + 0.135, f, 0, 0.045, 0.03, c, h), 0.04);
  }
  oa(e, 0, r, (o + i) / 2, n * 2 + 0.24, 0.42, i - o + 0.14, 0), Cn(e, 0, r, (o + i) / 2, n * 2 + 0.24, 0.42, i - o + 0.14, 0, a);
}
const il = 0.37, Ka = 1.62;
function Kh(e) {
  const t = new Ra(qa(311 + e)), a = il, s = 0.016, o = 4, i = 0.36, n = -0.35, r = [ua, qh, ss, ua], l = e & 2 ? -0.5 : -a, d = e & 1 ? 0.5 : a, c = e & 8 ? -0.5 : -a, h = e & 4 ? 0.5 : a, f = (e & 3) !== 0, u = (e & 12) !== 0, p = (M, x, z) => {
    const $ = x + (x > -0.499 ? 0.012 : 0), P = z - (z < 0.499 ? 0.012 : 0), I = P - $, C = ($ + P) / 2;
    t.add("box", Oh, M === "x" ? m(C, n, 0, 0, I, Ka - n - 0.1, a * 2 - 0.012 * 2) : m(0, n, C, 0, a * 2 - 0.012 * 2, Ka - n - 0.1, I), 0);
  }, v = (M, x, z, A, $, P, I) => {
    const C = z - x, w = (x + z) / 2;
    C < 0.02 || t.add("box", P, M === "x" ? m(w, A, 0, 0, C, $ - A, a * 2) : m(0, A, w, 0, a * 2, $ - A, C), I);
  };
  (f || !u) && p("x", l, d), u && p("z", c, h);
  for (let M = 0; M < o; M++) {
    const x = M === 0 ? n : M * i + s / 2, z = (M + 1) * i - s / 2, A = M % 2 === 1, $ = f && u ? A ? "z" : "x" : u ? "z" : "x", P = (I, C, w, F, V) => {
      const S = A ? 0.25 : 0, q = [];
      for (let H = -1 + S; H <= 1; H += 0.5) H > C + 0.05 && H < w - 0.05 && q.push(H);
      const O = [C, ...q, w];
      for (let H = 0; H + 1 < O.length; H++) {
        const U = O[H] + (H > 0 || F || !A && Math.abs(O[H] + 0.5) < 1e-6 ? s / 2 : 0), R = O[H + 1] - (H + 2 < O.length || V || !A && Math.abs(O[H + 1] - 0.5) < 1e-6 ? s / 2 : 0), L = Math.abs(U + 0.5) < 0.01 || Math.abs(R - 0.5) < 0.01;
        v(I, U, R, x, z, L ? r[M] : r[(M + H + (I === "z" ? 1 : 0)) % 4], L ? 0 : 0.05);
      }
    };
    $ === "x" ? (P("x", l, d, !1, !1), u && (h > a && P("z", a + s / 2, h, !0, !1), c < -a && P("z", c, -a - s / 2, !1, !0))) : (P("z", c, h, !1, !1), f && (d > a && P("x", a + s / 2, d, !0, !1), l < -a && P("x", l, -a - s / 2, !1, !0)));
  }
  const y = o * i, k = (M, x, z) => {
    const A = z - x + (x > -0.5 ? 0.03 : 0) + (z < 0.5 ? 0.03 : 0), $ = (x + z) / 2 + (x > -0.5 ? -0.015 : 0) + (z < 0.5 ? 0.015 : 0);
    t.add("box", ss, M === "x" ? m($, y, 0, 0, A, Ka - y, a * 2 + 0.06) : m(0, y + (f ? 2e-3 : 0), $, 0, a * 2 + 0.06, Ka - y, A), 0);
  };
  return (f || !u) && k("x", l, d), u && k("z", c, h), t.build();
}
function Xh(e) {
  const t = "tufa-previa/" + (e & 15);
  let a = ka.get(t);
  if (a) return a;
  const s = new Ra(qa(5)), o = il, i = e & 2 ? -0.5 : -o, n = e & 1 ? 0.5 : o, r = e & 8 ? -0.5 : -o, l = e & 4 ? 0.5 : o, d = (e & 3) !== 0, c = (e & 12) !== 0, h = Ka - 0.18;
  return (d || !c) && s.add("box", ua, m((i + n) / 2, -0.1, 0, 0, n - i, h + 0.1, o * 2), 0), c && (l > o && s.add("box", ua, m(0, -0.1, (o + l) / 2, 0, o * 2, h + 0.1, l - o), 0), r < -o && s.add("box", ua, m(0, -0.1, (r - o) / 2, 0, o * 2, h + 0.1, -o - r), 0), d || s.add("box", ua, m(0, -0.1, 0, 0, o * 2, h + 0.1, o * 2), 0)), (d || !c) && s.add("box", ss, m((i + n) / 2, h, 0, 0, n - i, 0.18, o * 2 + 0.06), 0), c && s.add("box", ss, m(0, h + 2e-3, (r + l) / 2, 0, o * 2 + 0.06, 0.18, l - r), 0), a = s.build(), ka.set(t, a), a;
}
function Yh(e, t, a) {
  const s = new Ra(a), o = t;
  switch (e) {
    case "center":
      if (o >= 3) Fh(s, o >= 4);
      else if (o === 0)
        Ao(s, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((i, n) => zo(s, Math.cos(i) * 1.45, Math.sin(i) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [Pi, "#8d6a46", "#b58a5d"][n % 3], a));
      else if (o === 1)
        To(s, 0, -0.4, 2.2, 3.2, 1.3, 1.5, ko, Fa, Math.PI / 2), Ao(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", m(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        Ar(s, 0, -0.45, 1.5, 1.02, 1.3, 1.75, ko, Fa);
        for (const i of [-1, 1])
          s.add("cyl5", Bt, m(i * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), s.add("cyl8", Ne, m(i * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        s.add("box", fe, m(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), Ao(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", m(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), s.add("cyl8", "#8a5a40", m(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      o >= 3 ? Lh(s, o >= 4) : o === 0 ? (zo(s, 0, 0, 0.8, 1.5, Pi, a), s.add("box", "#9a7148", m(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : o === 1 ? To(s, 0, 0, 1.3, 1.6, 1, 0.95, ko, hs, a() < 0.5 ? 0 : Math.PI / 2) : (Ar(s, 0, -0.08, 0.66, 0.5, 0.85, 1, zr, hs), s.add("cyl8", "#a0654a", m(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (o >= 3) jh(s, o >= 4);
      else if (o === 0) {
        for (let i = 0; i < 6; i++) s.add("cyl5", "#5e4431", m(-0.3, 0.1 + i % 3 * 0.18, -0.35 + Math.floor(i / 3) * 0.18 + i % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        s.add("prism", Pi, m(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), s.add("cyl8", "#b48a5c", m(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (o === 1) {
        for (const [i, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) s.add("cyl5", Bt, m(i, 0, n, 0, 0.13, 0.6, 0.13));
        s.add("cyl8", ko, m(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), s.add("cone7", Fa, m(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [i, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) s.add("cyl5", Bt, m(i, 0, n, 0, 0.12, 0.5, 0.12));
        s.add("box", fe, m(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), s.add("prism", Fa, m(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), s.add("cyl8", "#a0654a", m(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), s.add("cyl8", "#8a5a40", m(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let i = 0; i < 3; i++) s.add("box", Ne, m(0.42, i * 0.07, 0.62 + i % 2 * 0.03, i % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (o >= 4) Uh(s);
      else if (o === 3) _h(s);
      else if (o === 0) {
        $r(s, 1.15, 10, 0.32), zo(s, -0.55, -0.5, 0.5, 1.2, "#8d6a46", a);
        for (let i = 0; i < 4; i++) s.add("cyl5", "#8a6a48", m(0.6 + i * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        s.add("cyl5", Bt, m(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (o === 1) {
        To(s, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", hs, 0);
        for (let i = 0; i < 7; i++) s.add("cyl5", fe, m(-1.3 + i * 0.4, 0, 1.25, 0, 0.14, 0.9 + i % 2 * 0.15, 0.14));
        for (let i = 0; i < 3; i++) s.add("cyl5", "#8a6a48", m(1, 0, -0.6 + i * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        s.add("box", Ds, m(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), To(s, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", hs, Math.PI / 2, 0.25), s.add("box", Bt, m(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let i = 0; i < 4; i++) s.add("cyl5", "#8a6a48", m(0.6 + i * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        s.add("cyl5", Bt, m(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), s.add("box", Bt, m(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), s.add("cyl8", Ne, m(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      s.add("box", "#7d5f3e", m(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let i = 0; i < 4; i++) s.add("box", "#6b4f33", m(0, 0.03, -1.12 + i * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [i, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) s.add("cyl5", fe, m(i, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      Ih(s, 1.35), Ii(s, -0.5, -0.3, 0.6), Ii(s, 0.45, 0.2, 2.5), Ii(s, -0.2, 0.65, 4.1), s.add("box", "#a0754c", m(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (o < 2)
        s.add("box", "#a8a397", m(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), $r(s, 0.85, 8, 0.45), s.add("dode", "#8a857c", m(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [i, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) s.add("cyl5", Bt, m(i, 0, n, 0, 0.1, 1.15, 0.1));
        o >= 3 ? Pr(s, 1.1, 1.9, 0.75) : s.add("cone4", Fa, m(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), s.add("box", Mo, m(0, 0, 0, 0, 0.6, 0.55, 0.45)), s.add("cyl8", Ne, m(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), s.add("box", "#a8a397", m(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), s.add("box", "#a8a397", m(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      Ao(s, 0, 0, 1);
      for (let i = 0; i < 4; i++) {
        const n = i / 4 * ke + 0.4;
        zo(s, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][i % 3], a);
      }
      for (let i = 0; i < 9; i++) {
        const n = -0.9 + i * 0.22;
        s.add("cyl5", "#5a4030", m(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + i % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      s.add("box", zr, m(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const i of [-1, 1]) s.add("cyl5", Bt, m(i * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      o >= 3 ? oa(s, 0, 1, -0.3, 2, 0.6, 1.2, 0) : s.add("prism", hs, m(0, 1, -0.3, 0, 2, 0.6, 1.2)), s.add("ico", "#a5603f", m(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), s.add("cyl5", "#8f5236", m(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), s.add("box", "#2b1d16", m(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), s.add("box", Ds, m(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), s.add("box", "#5c5a57", m(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let i = 0; i < 3; i++) s.add("box", Ne, m(-0.55 + i * 0.05, i * 0.06, -0.35, 0.1 * i, 0.3, 0.06, 0.1));
      break;
    case "market":
      Ei(s, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), Ei(s, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), Ei(s, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [Ne, "#d9a43a", "#bdb6a8"]), s.add("cyl8", "#a0654a", m(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), s.add("cyl8", "#c9a75e", m(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), s.add("ico", "#d6c49a", m(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      s.add("box", fe, m(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const i of [-1, 1]) s.add("box", fe, m(i * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let i = 0; i < 4; i++) s.add("cyl5", Bt, m(-1.3 + i * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      o >= 3 ? oa(s, 0, 0.97, -0.76, 3, 0.62, 1.3, 0) : s.add("prism", Fa, m(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let i = 0; i < 5; i++) s.add("cyl5", Bt, m(-1.35 + i * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const i of [0.28, 0.52]) s.add("box", fe, m(0, i, 1.35, 0, 2.75, 0.05, 0.05));
      Eh(s, 0.2, 0.55, -1.2, "#7a5236"), s.add("box", "#d6b85a", m(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), s.add("box", "#c9ab50", m(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [i, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) s.add("cyl5", Bt, m(i, 0, n, 0, 0.12, 1.15, 0.12));
      o >= 3 ? oa(s, 0, 1.12, -0.7, 2.8, 0.6, 1.4, 0) : s.add("prism", hs, m(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), s.add("box", fe, m(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const i of [-1, 1])
        s.add("box", Bt, m(i * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), s.add("box", Bt, m(i * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      s.add("box", Bt, m(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), s.add("cyl8", "#5e4431", m(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const i of [-1, 1]) for (const n of [-0.1, 1.2]) s.add("box", fe, m(i * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      s.add("cyl5", "#4a3a2c", m(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), Tr(s, -0.95, 0, 0.9, 0.3, 0.4, -0.12), Tr(s, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let i = 0; i < 3; i++) s.add("cyl5", "#5e4431", m(0.9, 0.1 + i % 2 * 0.16, -0.65 + i * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      s.add("box", Ds, m(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [i, n, r] of [[-0.25, -0.25, Qi], [0.25, -0.25, Mo], [-0.25, 0.25, Mo], [0.25, 0.25, Qi]]) s.add("box", r, m(i, 0.55, n, (i + n) * 0.4, 0.5, 0.36 + Math.abs(i - n) * 0.2, 0.5), 0.12);
      s.add("dode", Ds, m(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    // ── Reino e República (M3) ──
    case "temple":
      Hh(s, o >= 4);
      break;
    case "mint":
      Wh(s);
      break;
    case "aqueduct":
      Gh(s);
      break;
    case "basilica":
      Vh(s);
      break;
    case "road":
      ll(s);
      break;
    // só para as contas de raio (o desenho de verdade é o RoadLayer)
    case "tower":
      s.add("cyl8", "#b3ada2", m(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), s.add("cyl8", Mo, m(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), s.add("cyl8", "#9d978b", m(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), s.add("box", "#2b211a", m(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), s.add("box", "#2b211a", m(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), s.add("box", fe, m(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let i = 0; i < 8; i++) {
        const n = i / 8 * ke;
        s.add("cyl5", Bt, m(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [i, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) s.add("box", Bt, m(i, 2.62, n, r, 1.7, 0.08, 0.06));
      o >= 3 ? Pr(s, 3.2, 2.6, 1) : s.add("cone4", Fa, m(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return s.build();
}
function Jh(e, t, a) {
  const s = [], o = [], i = new se(), n = (h, f) => zt(e, h, f), r = (h, f, u, p, v, y) => {
    const k = [[h, f], [h, p], [u, p], [u, f]].map(([M, x]) => [M, n(M, x) + v, x]);
    i.set(y);
    for (const M of [0, 1, 3, 1, 2, 3])
      s.push(...k[M]), o.push(i.r, i.g, i.b);
  };
  for (let h = 0; h < 6; h++) for (let f = 0; f < 6; f++) {
    const u = t - 1.5 + h * 0.5, p = a - 1.5 + f * 0.5;
    r(u, p, u + 0.5, p + 0.5, 0.05, (h + f) % 2 ? "#7d5f3e" : "#795b3a");
  }
  for (let h = 0; h < 4; h++) {
    const f = a - 1.12 + h * 0.75;
    for (let u = 0; u < 7; u++) {
      const p = t - 1.4 + u * 0.4;
      r(p, f - 0.14, p + 0.4, f + 0.14, 0.09, "#6b4f33");
    }
  }
  const l = new Ra();
  for (const [h, f] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", fe, m(t + h, n(t + h, a + f), a + f, 0, 0.08, 0.5, 0.08));
  const d = l.build();
  s.push(...d.attributes.position.array), o.push(...d.attributes.color.array);
  const c = new wa();
  return c.setAttribute("position", new Za(s, 3)), c.setAttribute("color", new Za(o, 3)), c.computeVertexNormals(), c.computeBoundingSphere(), c;
}
const Zh = "#7a5a3c", Qh = "#8d6a48", tu = "#b89068", qr = "#6a5640", Or = "#4f3a28";
function eu(e, t) {
  const a = new Ra(t), s = e >> 4;
  e &= 15;
  const o = (r, l) => {
    const d = 1.02 + (t() - 0.5) * 0.24, c = 0.21 + t() * 0.03, h = t() * ke;
    a.add("cyl5", t() < 0.5 ? Zh : Qh, m(r, -0.35, l, h, c, d + 0.35, c), 0.12), a.add("cone4", tu, m(r, d - 0.01, l, h, c * 1.02, 0.24, c * 1.02), 0.1);
  };
  a.add("box", qr, m(0, -0.3, 0, 0, 0.42, 0.4, 0.42), 0.12), o(0, 0);
  const i = [[1, 0, 1], [-1, 0, 2], [0, 1, 4], [0, -1, 8]];
  let n = 0;
  for (const [r, l, d] of i)
    if (e & d) {
      n++, o(r * 0.25, l * 0.25), (d === 1 || d === 4 || s & d) && o(r * 0.5, l * 0.5), a.add("box", qr, m(r * 0.25, -0.3, l * 0.25, 0, r ? 0.52 : 0.4, 0.39, l ? 0.52 : 0.4), 0.12);
      for (const c of [-1, 1]) a.add("box", Or, m(r * 0.25 + (l ? c * 0.12 : 0), 0.55 + c * 0.04, l * 0.25 + (r ? c * 0.12 : 0), 0, r ? 0.54 : 0.06, 0.07, l ? 0.54 : 0.06), 0.08);
    }
  if (!n) {
    for (const [r, l] of [[0.2, 0.17], [-0.19, 0.18], [0.18, -0.19], [-0.2, -0.17]]) o(r, l);
    a.add("cyl8", Or, m(0, 0.52, 0, 0, 0.7, 0.07, 0.7), 0.08);
  }
  return a.build();
}
function nl(e, t) {
  const a = e.size, s = e.x[t] >> 8, o = e.z[t] >> 8, i = e.owner[t];
  let n = 0;
  const r = (l, d, c) => {
    if (l < 0 || d < 0 || l >= a || d >= a) return;
    const h = e.bAt[d * a + l] - 1;
    h >= 0 && e.isBuilding(h) && e.owner[h] === i && lt[e.kind[h] - ut].wall && (n |= c, lt[e.kind[h] - ut].key !== "palisade" && (n |= c << 4));
  };
  return r(s + 1, o, 1), r(s - 1, o, 2), r(s, o + 1, 4), r(s, o - 1, 8), n;
}
const au = "#45474b", wr = ["#707276", "#67696d", "#7b7c80", "#606266", "#76777b", "#6b6c70"], su = "#aaa59a", ou = "#9b958b", rl = 0.07;
function ll(e) {
  e.add("box", au, m(0, -0.12, 0, 0, 1, 0.12 + rl - 0.012, 1), 0.02);
}
function Os(e, t, a, s) {
  const o = [];
  for (let i = 0; i < e.length; i++) {
    const n = e[i], r = e[(i + 1) % e.length], l = t * n[0] + a * n[1] - s, d = t * r[0] + a * r[1] - s;
    if (l <= 0 && o.push(n), l < 0 && d > 0 || l > 0 && d < 0) {
      const c = l / (l - d);
      o.push([n[0] + (r[0] - n[0]) * c, n[1] + (r[1] - n[1]) * c]);
    }
  }
  return o;
}
const iu = (e) => {
  let t = 0;
  for (let a = 0; a < e.length; a++) {
    const s = e[a], o = e[(a + 1) % e.length];
    t += s[0] * o[1] - o[0] * s[1];
  }
  return Math.abs(t) / 2;
};
let So = null;
function cl(e, t = !0) {
  const a = new Ra(qa(77 + e));
  if (!So) {
    const n = qa(4243);
    So = [];
    for (let r = 0; r < 6; r++) for (let l = 0; l < 6; l++) So.push([(r + 0.5 + (n() - 0.5) * 0.7) / 3, (l + 0.5 + (n() - 0.5) * 0.7) / 3]);
  }
  t && ll(a);
  const s = e & 1, o = e >> 1, i = [];
  So.forEach(([n, r], l) => {
    for (let d = -1; d <= 1; d++) for (let c = -1; c <= 1; c++) i.push([n + d * 2, r + c * 2, l]);
  });
  for (const [n, r, l] of i) {
    if (n < s - 0.6 || n > s + 1.6 || r < o - 0.6 || r > o + 1.6) continue;
    let d = [[n - 1, r - 1], [n + 1, r - 1], [n + 1, r + 1], [n - 1, r + 1]];
    for (const [c, h] of i) {
      const f = c - n, u = h - r, p = f * f + u * u;
      if (!(p < 1e-9 || p > 1.6) && (d = Os(d, f, u, (f * (n + c) + u * (r + h)) / 2), !d.length))
        break;
    }
    d = d.map(([c, h]) => [n + (c - n) * 0.88, r + (h - r) * 0.88]), d = Os(d, 1, 0, s + 1), d = Os(d, -1, 0, -s), d = Os(d, 0, 1, o + 1), d = Os(d, 0, -1, -o), !(d.length < 3 || iu(d) < 2e-3) && a.poly(wr[l % wr.length], d.map(([c, h]) => [c - s - 0.5, rl, h - o - 0.5]), 0);
  }
  return a.build();
}
function Rr(e) {
  const t = new Ra(qa(e === "x" ? 5 : 6)), a = e === "z" ? 0.15 : 0.145, s = e === "z" ? 0.503 : 0.5015, o = e === "z" ? 1 : 0.988;
  return [[-0.5, -0.17], [-0.155, 0.155], [0.17, 0.5]].forEach(([i, n], r) => {
    const l = (n - i) * o, d = (i + n) / 2 * o, c = r % 2 ? ou : su;
    t.add("box", c, e === "z" ? m(d, -0.08, s - 0.07, 0, l, a + 0.08, 0.14) : m(s - 0.07, -0.08, d, 0, 0.14, a + 0.08, l), 0.04);
  }), t.build();
}
function dl(e, t, a, s) {
  const o = e.size;
  let i = 0;
  const n = (r, l, d) => {
    if (r < 0 || l < 0 || r >= o || l >= o) return;
    const c = l * o + r, h = e.bAt[c] - 1;
    (s?.has(c) || h >= 0 && e.isBuilding(h) && lt[e.kind[h] - ut].estrada) && (i |= d);
  };
  return n(t + 1, a, 1), n(t - 1, a, 2), n(t, a + 1, 4), n(t, a - 1, 8), i;
}
const an = (e, t = {}, a = {}) => ae({ vertexColors: !0, ...t }, { ROAD: "", HSTEP: e.toFixed(2), SNOW_K: "0.35", ...a });
class sn {
  /** colored: a prévia (cores por instância e sem a base escura) */
  constructor(t, a, s = !1, o = 0) {
    g(this, "group", new ns());
    g(this, "pav", []);
    g(this, "cz");
    g(this, "cx");
    g(this, "n", [0, 0, 0, 0]);
    g(this, "ncz", 0);
    g(this, "ncx", 0);
    g(this, "sig", 0);
    g(this, "lastSig", -1);
    g(this, "_m", new ue());
    g(this, "_q", new Ms());
    g(this, "_p", new Ot());
    g(this, "_s", new Ot());
    g(this, "_y", new Ot(0, 1, 0));
    const i = (n, r) => {
      const l = n.clone(), d = new vc(new Float32Array(r * 4), 4);
      d.setUsage(ye), l.setAttribute("aCell", d);
      const c = new Ht(l, t, r);
      if (c.instanceMatrix.setUsage(ye), c.frustumCulled = !1, c.receiveShadow = !0, c.castShadow = !1, c.count = 0, c.renderOrder = o, s) {
        const h = new se("#ffffff");
        for (let f = 0; f < r; f++) c.setColorAt(f, h);
      }
      return this.group.add(c), c;
    };
    for (let n = 0; n < 4; n++) this.pav.push(i(cl(n, !s), a));
    this.cz = i(Rr("z"), a * 2), this.cx = i(Rr("x"), a * 2);
  }
  begin() {
    this.n.fill(0), this.ncz = this.ncx = 0, this.sig = 0;
  }
  /** um bloco no tile (tx, tz): mask = vizinhos com estrada (roadMask); prog = obra (0 a 1); col = cor da prévia */
  add(t, a, s, o, i = 1, n) {
    const r = (a & 1) + 2 * (s & 1), l = a + 0.5, d = s + 0.5, c = t.heights, h = t.hn, f = Math.min(h - 2, Math.floor(l / t.hstep)), u = Math.min(h - 2, Math.floor(d / t.hstep)), p = c[u * h + f], v = c[u * h + f + 1], y = c[(u + 1) * h + f], k = c[(u + 1) * h + f + 1], M = (x, z, A) => z >= x.instanceMatrix.count ? !1 : (this._q.setFromAxisAngle(this._y, A), this._p.set(l, 0, d), this._s.set(1, Math.max(0.12, i), 1), x.setMatrixAt(z, this._m.compose(this._p, this._q, this._s)), x.geometry.attributes.aCell.setXYZW(z, p, v, y, k), n && x.setColorAt(z, n), !0);
    M(this.pav[r], this.n[r], 0) && this.n[r]++, !(o & 4) && M(this.cz, this.ncz, 0) && this.ncz++, !(o & 8) && M(this.cz, this.ncz, Math.PI) && this.ncz++, !(o & 1) && M(this.cx, this.ncx, 0) && this.ncx++, !(o & 2) && M(this.cx, this.ncx, Math.PI) && this.ncx++, this.sig = Math.imul(this.sig, 31) + a * 7 + s * 131 + o * 17 + Math.round(i * 50) + (n ? Math.round(n.r * 97 + n.g * 89 + n.b * 13) : 0) | 0;
  }
  /** só manda para a placa de vídeo o que mudou (a estrada quase nunca muda) */
  end() {
    const t = [...this.pav, this.cz, this.cx], a = [...this.n, this.ncz, this.ncx], s = this.sig !== this.lastSig || t.some((o, i) => o.count !== a[i]);
    this.lastSig = this.sig, t.forEach((o, i) => {
      if (o.count = a[i], o.visible = a[i] > 0, !s || !a[i]) return;
      const n = o.geometry.attributes.aCell;
      o.instanceMatrix.clearUpdateRanges(), o.instanceMatrix.addUpdateRange(0, a[i] * 16), o.instanceMatrix.needsUpdate = !0, n.clearUpdateRanges(), n.addUpdateRange(0, a[i] * 4), n.needsUpdate = !0, o.instanceColor && (o.instanceColor.clearUpdateRanges(), o.instanceColor.addUpdateRange(0, a[i] * 3), o.instanceColor.needsUpdate = !0);
    });
  }
}
const nu = { center: 4, house: 4, depot: 4, military: 4, forge: 3, stable: 3, workshop: 3, tower: 3, sanctuary: 3, tufa: 0, mint: 0, aqueduct: 0, basilica: 0, road: 0 }, Ks = (e, t) => e === "temple" ? t >= 4 ? 4 : 3 : Math.max(0, Math.min(t, nu[e] ?? 2)), Pn = (e, t) => e === "farm" || e === "palisade" || e === "tufa" || e === "road" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2;
function hl(e, t) {
  const a = lt[e.kind[t] - ut], s = e.owner[t], o = s >= 0 && s < e.players.length ? e.players[s].era : 0;
  return Qo(a.key, o, a.key === "palisade" || a.key === "tufa" ? nl(e, t) : -1);
}
const ka = /* @__PURE__ */ new Map();
function Qo(e, t, a = -1) {
  if (e === "palisade" || e === "tufa") {
    const n = e === "tufa" ? Math.max(0, a) & 15 : Math.max(0, a), r = e + "/" + n;
    let l = ka.get(r);
    return l || (l = e === "palisade" ? eu(n, qa(97 + n * 13)) : Kh(n), ka.set(r, l)), l;
  }
  if (e === "road") {
    let n = ka.get(e);
    return n || (n = cl(0), ka.set(e, n)), n;
  }
  const s = Ks(e, t), o = e + s;
  let i = ka.get(o);
  return i || (i = Yh(e, s, qa(e.length * 31 + s)), ka.set(o, i)), i;
}
const ru = (e) => e === "tufa" ? Ka : e === "palisade" ? 1.3 : 1.2, Br = {
  center: { f: [1.2, $o + 0.02, 1.3, 0.24], s: [1.2, $o + 0.3, 1.3, 0.55] },
  temple: { f: [0.95, $o + 0.02, 1.08, 0.2], s: [0.95, $o + 0.3, 1.08, 0.45] },
  mint: { f: [-0.42, 0.22, -0.02, 0.12], s: [-0.5, 1.85, -0.52, 0.5] }
}, Co = new z0(), Dr = new Ot(), Nr = new Ot(), Fr = new Ot(), Lr = new Ot();
function jr(e, t, a, s, o, i, n) {
  const r = lt[e.kind[t] - ut], l = hl(e, t), d = l.attributes.position.array, c = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), h = e.x[t] / 256, f = e.z[t] / 256, u = Pn(r.key, t), p = Math.cos(u), v = Math.sin(u), y = a - h, k = s - f, M = y * p - k * v, x = y * v + k * p, z = o * p - i * v, A = o * v + i * p, $ = Math.hypot(z, A) || 1;
  let P = 1 / 0;
  for (const I of [0, 0.1, -0.1]) {
    Co.origin.set(M - A / $ * I, n / c, x + z / $ * I), Co.direction.set(z / $, 0, A / $);
    for (let C = 0; C + 8 < d.length; C += 9) {
      if (Dr.set(d[C], d[C + 1], d[C + 2]), Nr.set(d[C + 3], d[C + 4], d[C + 5]), Fr.set(d[C + 6], d[C + 7], d[C + 8]), !Co.intersectTriangle(Dr, Nr, Fr, !1, Lr)) continue;
      const w = Lr.distanceTo(Co.origin);
      w < P && (P = w);
    }
  }
  return P < 1 / 0 ? P : null;
}
const lu = rt((e) => e.add("cyl5", Bt, m(0, 0, 0, 0, 0.06, 2, 0.06), 0)), cu = new Me(0.42, 0.34, 0.03).translate(0.24, 1.75, 0), _r = { house: 0.04, depot: 0.025, mint: 0.035 }, Ur = { temple: 0.8, aqueduct: 0.7, basilica: 0.7, center: 0.5 }, du = rt((e) => {
  e.add("cyl5", Bt, m(0, 0, 0, 0, 0.05, 1.78, 0.05), 0), e.add("box", Bt, m(0, 1.5, 0, 0, 0.52, 0.04, 0.04), 0), e.add("cone4", "#d9b04a", m(0, 1.78, 0, Math.PI / 4, 0.09, 0.16, 0.09), 0), e.add("cyl8", "#d9b04a", m(0, 1.64, -0.01, 0, 0.13, 0.02, 0.13, Math.PI / 2), 0);
}), hu = rt((e) => {
  e.add("box", "#ffffff", m(0, 1.12, 0.035, 0, 0.44, 0.38, 0.02), 0), e.add("box", "#d9b04a", m(0, 1.07, 0.035, 0, 0.44, 0.05, 0.024), 0);
});
class uu {
  constructor() {
    g(this, "group", new ns());
    g(this, "meshes", /* @__PURE__ */ new Map());
    g(this, "poles");
    g(this, "flags");
    g(this, "crops");
    g(this, "fair");
    g(this, "vexPole");
    g(this, "vexCloth");
    g(this, "fairB");
    g(this, "mat", ae({ vertexColors: !0 }));
    g(this, "farms", /* @__PURE__ */ new Map());
    /** as estradas (M3): criadas na primeira vez (precisam do passo do terreno) */
    g(this, "roads", null);
    g(this, "fires", []);
    g(this, "smokes", []);
    this.poles = new Ht(lu, ae({ vertexColors: !0 }), 256), this.flags = new Ht(cu, ae({}, { NO_SNOW: "" }), 256);
    const t = rt((s) => {
      for (let o = 0; o < 3; o++) s.add("cone4", "#ffffff", m((o - 1) * 0.1, 0, o % 2 * 0.08, o, 0.1, 0.75, 0.1, (o - 1) * 0.15, 0), 0.1);
    });
    this.crops = new Ht(t, ae({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = Z0({ CROP: "" });
    const a = (s, o) => rt((i) => {
      const n = [[-s, -s], [s, -s], [s, s], [-s, s]], r = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"], l = o - 0.1;
      for (const [d, c] of n) i.add("cyl5", Bt, m(d, 0, c, 0, 0.07, o, 0.07), 0);
      for (let d = 0; d < 4; d++) {
        const [c, h] = n[d], [f, u] = n[(d + 1) % 4], p = Math.hypot(f - c, u - h), v = Math.atan2(f - c, u - h);
        i.add("box", "#e8e2d4", m((c + f) / 2, l, (h + u) / 2, v, 0.015, 0.015, p), 0);
        for (let y = 1; y < 8; y++) {
          const k = y / 8, M = Math.sin(k * Math.PI) * 0.18;
          i.add("cone4", r[(y + d) % r.length], m(c + (f - c) * k, l - M - 0.2, h + (u - h) * k, v, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new Ht(a(1.38, 2.05), ae({ vertexColors: !0 }), 16), this.fairB = new Ht(a(1.42, 2.75), ae({ vertexColors: !0 }), 16), this.vexPole = new Ht(du, ae({ vertexColors: !0 }), 32), this.vexCloth = new Ht(hu, ae({ vertexColors: !0 }, { NO_SNOW: "" }), 32);
    for (const s of [this.poles, this.flags, this.crops, this.fair, this.fairB, this.vexPole, this.vexCloth])
      s.instanceMatrix.setUsage(ye), s.frustumCulled = !1, s.castShadow = !0, s.receiveShadow = !0, s.count = 0, this.group.add(s);
    for (let s = 0; s < 256; s++) this.flags.setColorAt(s, new se("#ffffff"));
    for (let s = 0; s < 32; s++) this.vexCloth.setColorAt(s, new se("#ffffff"));
  }
  /** a malha (instanciada) de uma construção na era do dono; a paliçada e a muralha de tufo têm uma por desenho de vizinhos */
  mesh(t, a, s = -1) {
    const o = Math.max(0, s), i = t === "palisade" ? "palisade/" + o : t === "tufa" ? "tufa/" + (o & 15) : t + Ks(t, a);
    let n = this.meshes.get(i);
    return n || (n = new Ht(Qo(t, a, s), this.mat, t === "center" || t === "camp" ? 8 : t === "palisade" || t === "wall" || t === "tufa" ? 160 : 64), n.instanceMatrix.setUsage(ye), n.frustumCulled = !1, n.castShadow = !0, n.receiveShadow = !0, n.count = 0, this.meshes.set(i, n), this.group.add(n)), n;
  }
  /** atualiza tudo a partir do mundo (≈100 construções e as estradas: barato) */
  update(t, a, s, o = 0) {
    const i = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0, d = 0, c = 0;
    const h = t.size, f = t.explored[a];
    this.fires.length = 0, this.smokes.length = 0;
    const u = new se(), p = /* @__PURE__ */ new Set();
    this.roads || (this.roads = new sn(an(t.map.hstep), 1024), this.group.add(this.roads.group)), this.roads.begin();
    for (let v = 0; v < t.top; v++) {
      if (!t.alive[v] || t.kind[v] < ut) continue;
      const y = lt[t.kind[v] - ut], k = t.owner[v], M = t.x[v] / 256, x = t.z[v] / 256;
      if (s && k !== a && !f[Math.floor(x) * h + Math.floor(M)]) continue;
      const z = k >= 0 && k < t.players.length ? t.players[k].era : 0;
      if (y.key === "farm") {
        let V = this.farms.get(v);
        if (V && (V.x !== M || V.z !== x) && (this.group.remove(V.mesh), V.mesh.geometry.dispose(), V = void 0), !V) {
          const S = new ca(Jh(t.map, M, x), this.mat);
          S.receiveShadow = S.castShadow = !0, this.group.add(S), V = { mesh: S, x: M, z: x }, this.farms.set(v, V);
        }
        if (V.mesh.visible = !0, p.add(v), t.done[v]) for (let S = 0; S < 4; S++) for (let q = 0; q < 9 && r < this.crops.instanceMatrix.count; q++) {
          const O = M - 1.25 + q * 0.31, H = x - 1.12 + S * 0.75;
          this.crops.setMatrixAt(r++, m(O, zt(t.map, O, H) + 0.08, H, (q * 7 + S) % 6, 1, 0.85 + (q + S) % 3 * 0.12, 1));
        }
        continue;
      }
      const A = t.done[v] === 1, $ = A ? 1 : Math.max(0.12, Math.min(1, t.work[v] / (y.time * 100)));
      if (y.estrada) {
        const V = t.x[v] >> 8, S = t.z[v] >> 8;
        this.roads.add(t.map, V, S, dl(t, V, S), $);
        continue;
      }
      const P = this.mesh(y.key, z, y.key === "palisade" || y.key === "tufa" ? nl(t, v) : -1), I = i.get(P) ?? 0;
      if (I >= P.instanceMatrix.count) continue;
      const C = zt(t.map, M, x), w = Ks(y.key, z), F = Pn(y.key, v);
      if (P.setMatrixAt(I, m(M, C - 0.02, x, F, 1, $, 1)), i.set(P, I + 1), y.key !== "farm" && !y.wall && A && n < 256) {
        const V = y.size / 2 - (_r[y.key] !== void 0 && (y.era >= 3 || w >= 3) ? _r[y.key] : 0.25), S = M + V, q = x - V, O = Ur[y.key] && (y.key !== "center" || w >= 3) ? Ur[y.key] : 0, H = zt(t.map, S, q);
        this.poles.setMatrixAt(n, m(S, H, q, 0, 1, 1 + O / 2, 1)), this.flags.setMatrixAt(n, m(S, H + O, q, Math.sin(o * 1.1 + v) * 0.15)), this.flags.setColorAt(n, u.set(k === ze ? "#efe6cf" : t.players[k]?.color ?? "#888")), n++;
      }
      if (A && y.key === "military" && w >= 4 && c < 32) {
        const [V, S] = sa(0, ol, F);
        this.vexPole.setMatrixAt(c, m(M + V, C + 0.12, x + S, F)), this.vexCloth.setMatrixAt(c, m(M + V, C + 0.12, x + S, F + Math.sin(o * 1.3 + v) * 0.12)), this.vexCloth.setColorAt(c, u.set(t.players[k]?.color ?? "#888")), c++;
      }
      if (A && y.key === "forge") {
        const q = M + 0.45 * Math.cos(F) + 0.12 * Math.sin(F), O = x - 0.45 * Math.sin(F) + 0.12 * Math.cos(F), H = M + 0.55 * Math.cos(F) - 0.45 * Math.sin(F), U = x - 0.55 * Math.sin(F) - 0.45 * Math.cos(F);
        this.fires.push({ x: q, y: zt(t.map, q, O) + 0.1, z: O, s: 0.16 }), this.smokes.push({ x: H, y: zt(t.map, H, U) + 1.5, z: U, s: 0.6 });
      }
      if (A && y.market && t.feiraDe(k) && (y.troca ? d < 16 && this.fairB.setMatrixAt(d++, m(M, C - 0.02, x, F)) : l < 16 && this.fair.setMatrixAt(l++, m(M, C - 0.02, x, F))), A && (y.key === "center" && w < 3 || y.key === "camp")) {
        const V = z >= 1 && y.key === "center", S = V ? M + 1.2 * Math.cos(F) + 1.3 * Math.sin(F) : M, q = V ? x - 1.2 * Math.sin(F) + 1.3 * Math.cos(F) : x;
        this.fires.push({ x: S, y: zt(t.map, S, q) + 0.15, z: q, s: z >= 1 && y.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: S, y: zt(t.map, S, q) + 0.3, z: q, s: 1 });
      } else if (A && Br[y.key]) {
        const V = Br[y.key], [S, q] = sa(V.f[0], V.f[2], F), [O, H] = sa(V.s[0], V.s[2], F);
        this.fires.push({ x: M + S, y: C - 0.02 + V.f[1], z: x + q, s: V.f[3] }), this.smokes.push({ x: M + O, y: C - 0.02 + V.s[1], z: x + H, s: V.s[3] });
      }
    }
    for (const v of this.meshes.values())
      v.count = i.get(v) ?? 0, v.instanceMatrix.needsUpdate = !0;
    this.roads.end();
    for (const [v, y] of this.farms) p.has(v) || (!t.alive[v] || t.kind[v] !== ut + wt.farm ? (this.group.remove(y.mesh), y.mesh.geometry.dispose(), this.farms.delete(v)) : y.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.vexPole.count = this.vexCloth.count = c, this.vexPole.instanceMatrix.needsUpdate = this.vexCloth.instanceMatrix.needsUpdate = !0, this.vexCloth.instanceColor && (this.vexCloth.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0, this.fairB.count = d, this.fairB.instanceMatrix.needsUpdate = !0;
  }
}
class fu {
  constructor(t = 48) {
    g(this, "mesh");
    this.mesh = new Ht(new Li(0.32, 1, 6).translate(0, 0.5, 0), no(new Ja({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(ye), this.mesh.frustumCulled = !1;
    for (let a = 0; a < t; a++) this.mesh.setColorAt(a, new se(a % 2 ? "#ffd166" : "#ff7b2e"));
  }
  update(t, a) {
    let s = 0;
    const o = this.mesh.instanceMatrix.count;
    for (const i of t) {
      const n = 0.85 + Math.sin(a * 13 + i.x) * 0.12 + Math.sin(a * 29 + i.z) * 0.08;
      s < o && this.mesh.setMatrixAt(s++, m(i.x, i.y, i.z, a * 2 + i.x, i.s, i.s * 1.25 * n, i.s)), s < o && this.mesh.setMatrixAt(s++, m(i.x, i.y, i.z, -a * 3, i.s * 0.55, i.s * 0.85 * (2 - n), i.s * 0.55));
    }
    this.mesh.count = s, this.mesh.instanceMatrix.needsUpdate = !0;
  }
}
const pu = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, mu = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class gu {
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
    this.n = a, this.pos = new Float32Array(a * 3), this.a = new Float32Array(a), this.sz = new Float32Array(a).fill(1), this.colr = new Float32Array(a * 3), this.age = new Float32Array(a).fill(99), this.life = new Float32Array(a), this.vel = new Float32Array(a * 3), this.grow = new Float32Array(a), this.geo.setAttribute("position", new Ge(this.pos, 3).setUsage(ye)), this.geo.setAttribute("aA", new Ge(this.a, 1).setUsage(ye)), this.geo.setAttribute("aS", new Ge(this.sz, 1).setUsage(ye)), this.geo.setAttribute("aC", new Ge(this.colr, 3).setUsage(ye)), this.mat = new yn({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: pu, fragmentShader: mu }), this.points = new A0(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, a, s, o, i, n, r, l, d, c) {
    const h = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, a, s], h * 3), this.vel.set([o, i, n], h * 3), this.colr.set([c.r, c.g, c.b], h * 3), this.age[h] = 0, this.life[h] = r, this.sz[h] = l, this.grow[h] = d;
  }
  smoke(t, a) {
    this.acc += t;
    const s = new se(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const o of a) Math.random() < 0.5 && this.emit(o.x + (Math.random() - 0.5) * 0.2, o.y + 0.4, o.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, s);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, a, s, o) {
    const i = new se(0.62, 0.55, 0.45), n = o ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * ke, d = (o ? 1.4 : 0.7) * (0.4 + Math.random());
      this.emit(t, a + 0.2, s, Math.cos(l) * d, 0.3 + Math.random() * 0.6, Math.sin(l) * d, 0.9 + Math.random() * 0.6, o ? 1.4 : 0.8, 1.2, i);
    }
  }
  update(t) {
    for (let a = 0; a < this.n; a++) {
      if (this.age[a] > this.life[a]) {
        this.a[a] = 0;
        continue;
      }
      this.age[a] += t;
      const s = this.age[a] / this.life[a], o = 1 - Math.min(0.9, t * 1.5);
      this.vel[a * 3] *= o, this.vel[a * 3 + 2] *= o, this.pos[a * 3] += this.vel[a * 3] * t, this.pos[a * 3 + 1] += this.vel[a * 3 + 1] * t, this.pos[a * 3 + 2] += this.vel[a * 3 + 2] * t, this.a[a] = Math.sin(Math.min(s, 1) * Math.PI) * 0.4, this.sz[a] = this.sz[a] + this.grow[a] * t / this.life[a] * 0.5;
    }
    for (const a of ["position", "aA", "aS", "aC"]) this.geo.attributes[a].needsUpdate = !0;
  }
}
const Po = {
  spear: { a: 1.7, y: 1.1, arc: 0.18, fica: 0.35, som: "spear.hit" },
  arrow: { a: 0.75, y: 0.88, arc: 0.1, fica: 0.35, som: "arrow.hit" },
  stone: { a: 0.3, y: 1.55, arc: 0.07, fica: 0.03, som: "stone.hit" },
  bolt: { a: 0.62, y: 0.92, arc: 0.04, fica: 0.35, som: "arrow.hit" },
  // o virote sai da calha do escorpião, quase reto
  boulder: { a: 0.9, y: 0.98, arc: 0.16, fica: 0.05, som: "stone.hit" }
  // a pedra grande sai da calha da balista, em arco alto
}, Hr = ["spear", "arrow", "stone", "bolt", "boulder"];
class bu {
  constructor() {
    g(this, "group", new ns());
    g(this, "meshes", {});
    g(this, "list", []);
    /** chamado quando algo chega ao alvo (a cena levanta poeira onde a pedra grande bate) */
    g(this, "impacto", null);
    g(this, "ray", new z0());
    g(this, "ta", new Ot());
    g(this, "tb", new Ot());
    g(this, "tc", new Ot());
    g(this, "th", new Ot());
    const t = {
      spear: rt((s) => {
        s.add("cyl5", "#7a5a3c", m(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), s.add("cone4", "#b9b4aa", m(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
      }).rotateX(Math.PI / 2),
      arrow: rt((s) => {
        s.add("cyl5", "#8a6a48", m(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), s.add("cone4", "#b9b4aa", m(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), s.add("box", "#e8e2d4", m(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), s.add("box", "#e8e2d4", m(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
      }).rotateX(Math.PI / 2),
      stone: rt((s) => s.add("dode", "#8f8a80", m(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)),
      // pedra da funda (a frente na origem)
      bolt: Q0,
      boulder: tl
    }, a = ae({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const s of Hr) {
      const o = new Ht(t[s], a, s === "boulder" ? 48 : 96);
      o.instanceMatrix.setUsage(ye), o.frustumCulled = !1, o.castShadow = !0, o.count = 0, this.meshes[s] = o, this.group.add(o);
    }
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, a, s, o, i, n, r, l, d, c, h) {
    const f = Po[r] ?? Po.arrow;
    if (r === "spear" && l < Zi) return;
    let u, p, v;
    if (d >= ut) {
      const C = t.alive[c] ? this.hitBuilding(t, c, a, s) : null;
      C ? (u = C.x, p = C.z, v = C.y) : (u = o, p = i, v = zt(t.map, o, i) + 0.08);
    } else {
      const C = Math.hypot(o - a, i - s) || 1, w = C - (X[d]?.radius ?? 0.3) * 0.8;
      u = a + (o - a) / C * w, p = s + (i - s) / C * w, v = zt(t.map, u, p) + al(d);
    }
    const y = Math.hypot(u - a, p - s) || 1, k = (u - a) / y, M = (p - s) / y;
    let x = h !== void 0 ? 0.9 : f.a;
    if (h === void 0) for (let C = 0.1; C < Math.min(x + 0.4, y - 0.3); C += 0.1) {
      const w = t.bAt[Math.floor(s + M * C) * t.size + Math.floor(a + k * C)] - 1;
      if (w >= 0 && w !== c && t.isBuilding(w) && lt[t.kind[w] - ut].wall) {
        x = Math.max(0.1, Math.min(x, C - 0.45));
        break;
      }
    }
    if (y - x < 0.15) return;
    const z = a + k * x, A = s + M * x, $ = h !== void 0 ? zt(t.map, a, s) + h : zt(t.map, z, A) + f.y;
    let P = (y - x) * f.arc;
    const I = y - x;
    for (let C = 0.15; C < I - 0.3; C += 0.15) {
      const w = C / I, F = z + k * C, V = A + M * C, S = t.bAt[Math.floor(V) * t.size + Math.floor(F)] - 1;
      if (S < 0 || S === c || !t.isBuilding(S) || !lt[t.kind[S] - ut].wall) continue;
      const q = zt(t.map, F, V) + (lt[t.kind[S] - ut].key === "tufa" ? Ka + 0.4 : 1.6) - ($ + (v - $) * w), O = Math.sin(w * Math.PI);
      O > 0.05 && q > P * O && (P = q / O);
    }
    this.list.push({ x0: z, z0: A, y0: $, x1: u, z1: p, y1: v, arc: P, t: 0, dur: Math.max(0.15, n / 10), kind: r });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, a, s, o) {
    const i = lt[t.kind[a] - ut], n = hl(t, a), r = n.attributes.position.array, l = t.done[a] ? 1 : Math.max(0.12, Math.min(1, t.work[a] / (i.time * 100))), d = t.x[a] / 256, c = t.z[a] / 256, h = zt(t.map, d, c) - 0.02, f = Pn(i.key, a), u = s - d, p = o - c, v = Math.cos(f), y = Math.sin(f), k = u * v - p * y, M = u * y + p * v, x = Math.hypot(k, M) || 1, z = -k / x, A = -M / x, $ = -A, P = z;
    let I = 0, C = 0, w = 0, F = !1;
    for (const V of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let S = 1 / 0;
      for (const q of [0.9, 0.6, 0.35]) {
        const O = k + $ * V, H = M + P * V, U = -(O * z + H * A);
        this.ray.origin.set(O, q / l, H), this.ray.direction.set(z, 0, A);
        for (let R = 0; R + 8 < r.length; R += 9) {
          if (this.ta.set(r[R], r[R + 1], r[R + 2]), this.tb.set(r[R + 3], r[R + 4], r[R + 5]), this.tc.set(r[R + 6], r[R + 7], r[R + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const L = this.th.distanceTo(this.ray.origin);
          L > U + 0.1 || L >= S || (S = L, I = this.th.x + z * 0.05, C = this.th.y, w = this.th.z + A * 0.05);
        }
      }
      if (S < 1 / 0) {
        F = !0;
        break;
      }
    }
    return F ? { x: d + I * v + w * y, y: h + C * l, z: c - I * y + w * v } : null;
  }
  update(t) {
    const a = { spear: 0, arrow: 0, stone: 0, bolt: 0, boulder: 0 }, s = [], o = new Ms(), i = new Ms(), n = new Ot(), r = new Ot(1, 1, 1), l = new Ot(), d = new Ot(0, 0, 1), c = new ue();
    for (const h of this.list) {
      const f = Po[h.kind] ?? Po.arrow;
      if (h.t += t, !h.hit && h.t >= h.dur && (h.hit = !0, Ue.emit(f.som, h.x1, h.z1), this.impacto?.(h.x1, h.y1, h.z1, h.kind)), h.t > h.dur + f.fica) continue;
      const u = this.meshes[h.kind] ?? this.meshes.arrow, p = a[h.kind] ?? 0;
      if (p >= u.instanceMatrix.count) continue;
      s.push(h);
      const v = Math.min(1, h.t / h.dur);
      n.set(h.x0 + (h.x1 - h.x0) * v, h.y0 + (h.y1 - h.y0) * v + Math.sin(v * Math.PI) * h.arc, h.z0 + (h.z1 - h.z0) * v), l.set(h.x1 - h.x0, h.y1 - h.y0 + Math.cos(v * Math.PI) * h.arc * Math.PI, h.z1 - h.z0).normalize(), o.setFromUnitVectors(d, l), h.kind === "boulder" && o.multiply(i.setFromAxisAngle(d, h.t * 7)), u.setMatrixAt(p, c.compose(n, o, r)), a[h.kind] = p + 1;
    }
    this.list = s;
    for (const h of Hr)
      this.meshes[h].count = a[h], this.meshes[h].instanceMatrix.needsUpdate = !0;
  }
}
const vu = (e, t, a) => e + (t - e) * a, yu = (e, t, a) => {
  const s = Math.min(1, Math.max(0, (a - e) / (t - e)));
  return s * s * (3 - 2 * s);
};
class xu {
  constructor(t, a, s, o) {
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
    this.map = t, this.cam = new yc(42, 1, 0.5, 900), this.x = this.tx = a, this.z = this.tz = s, this.yaw = this.tyaw = o, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return vu(0.66, 1.12, yu(this.minD, this.maxD, t));
  }
  update(t) {
    const a = 1 - Math.exp(-t * 9), s = this.map.size;
    this.tx = Math.min(s - 8, Math.max(8, this.tx)), this.tz = Math.min(s - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * a, this.z += (this.tz - this.z) * a, this.yaw += (this.tyaw - this.yaw) * a, this.dist += (this.tdist - this.dist) * a;
    const o = this.pitch(), i = Math.max(zt(this.map, this.x, this.z), 0), n = Math.cos(o) * this.dist;
    this.cam.position.set(this.x + Math.sin(this.yaw) * n, i + Math.sin(o) * this.dist, this.z + Math.cos(this.yaw) * n), this.cam.lookAt(this.x, i + 0.6, this.z), this.cam.updateMatrixWorld();
  }
  /** arrasta a câmera em pixels de tela */
  pan(t, a, s) {
    const o = this.pitch(), i = 0.77 * this.dist / s, n = Math.cos(this.yaw), r = -Math.sin(this.yaw), l = -Math.sin(this.yaw), d = -Math.cos(this.yaw);
    this.tx += (-t * n + a * l / Math.sin(o)) * i, this.tz += (-t * r + a * d / Math.sin(o)) * i;
  }
  setAspect(t, a) {
    this.cam.aspect = t / a, this.cam.fov = t / a < 1 ? 55 : 42, this.cam.updateProjectionMatrix();
  }
  /** posição no chão sob um ponto da tela (marcha ao longo do raio e refina) */
  ground(t, a, s, o) {
    const i = new Ot(t / s * 2 - 1, -(a / o) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = i.sub(n).normalize();
    let l = 0, d = 0;
    const c = this.map.size;
    for (let h = 0; h < 400; h++) {
      l += 0.6 + l * 0.01;
      const f = n.x + r.x * l, u = n.y + r.y * l, p = n.z + r.z * l;
      if (f < -20 || p < -20 || f > c + 20 || p > c + 20 || l > 900) return null;
      if (u <= Math.max(zt(this.map, f, p), -0.1)) {
        let v = d, y = l;
        for (let k = 0; k < 12; k++) {
          const M = (v + y) / 2;
          n.y + r.y * M <= Math.max(zt(this.map, n.x + r.x * M, n.z + r.z * M), -0.1) ? y = M : v = M;
        }
        return new Ot(n.x + r.x * y, n.y + r.y * y, n.z + r.z * y);
      }
      d = l;
    }
    return null;
  }
  toScreen(t, a, s, o, i, n) {
    n.set(t, a, s).project(this.cam);
    const r = n.z < 1;
    return n.set((n.x + 1) / 2 * o, (1 - n.y) / 2 * i, r ? 1 : 0), n;
  }
}
const Wr = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], Gr = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], Vr = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class ku {
  constructor(t) {
    g(this, "c", {});
    g(this, "n", {});
    g(this, "w", [0, 0, 0]);
    g(this, "tmp", new se());
    const a = Wr[t];
    for (const s of Gr) this.c[s] = De(a[s]);
    for (const s of Vr) this.n[s] = a[s];
    this.w = [...a.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, a, s) {
    const o = Wr[a], i = 1 - Math.exp(-t * 0.3);
    for (const l of Gr) this.c[l].lerp(this.tmp.set(o[l]), i);
    for (const l of Vr) this.n[l] += (o[l] - this.n[l]) * i;
    for (let l = 0; l < 3; l++) this.w[l] += (o.w[l] - this.w[l]) * i;
    const n = this.c, r = this.n;
    Kt.uGrassA.value.copy(n.grassA), Kt.uGrassB.value.copy(n.grassB), Kt.uLeafColor.value.copy(n.leaf), Kt.uCropColor.value.copy(n.cropC), Kt.uLeaf.value = r.leafAmt, Kt.uCrop.value = r.crop, Kt.uFlower.value = r.flower, Kt.uSnow.value = r.snow, Kt.uFruit.value = Math.max(0, 1 - r.snow * 1.6), Kt.uShallow.value.copy(n.sh), Kt.uDeep.value.copy(n.dp), s.sun.color.copy(n.sun), s.sun.intensity = r.sunI, s.hemi.color.copy(n.hS), s.hemi.groundColor.copy(n.hG), s.hemi.intensity = r.hI, s.sky.uniforms.uTop.value.copy(n.top), s.sky.uniforms.uHor.value.copy(n.hor), s.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const Mu = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, zu = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Au {
  constructor(t, a = 1) {
    g(this, "group", new ns());
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
  make(t, a, s, o, i, n, r) {
    t = Math.max(1, t);
    const l = new Float32Array(t * 3), d = new Float32Array(t), c = new Float32Array(t), h = new Float32Array(t);
    for (let v = 0; v < t; v++)
      l[v * 3] = (Math.random() - 0.5) * 90, l[v * 3 + 1] = -999, l[v * 3 + 2] = (Math.random() - 0.5) * 90, d[v] = Math.random(), c[v] = Math.random() * 100, h[v] = 0.7 + Math.random() * 0.6;
    const f = new wa();
    f.setAttribute("position", new Ge(l, 3).setUsage(ye)), f.setAttribute("aK", new Ge(d, 1)), f.setAttribute("aS", new Ge(h, 1));
    const u = new yn({ transparent: !0, depthWrite: !1, uniforms: { uFow: Kt.uFow, uFowOn: Kt.uFowOn, uWorld: Kt.uWorld, uPR: { value: 1 }, uSize: { value: a }, uColA: { value: De(s) }, uColB: { value: De(o) }, uAmt: { value: 0 } }, vertexShader: Mu, fragmentShader: zu }), p = new A0(f, u);
    return p.frustumCulled = !1, p.renderOrder = 4, p.visible = !1, this.group.add(p), { p, pos: l, seed: c, n: t, use: t, fall: i, sway: n, m: u, hMax: r };
  }
  /** quantidade de partículas (qualidade gráfica) */
  setScale(t) {
    for (const a of this.list)
      a.use = Math.max(1, Math.round(a.n * t)), a.p.geometry.setDrawRange(0, a.use);
  }
  setPixelRatio(t) {
    for (const a of this.list) a.m.uniforms.uPR.value = t;
  }
  update(t, a, s, o, i) {
    this.list.forEach((n, r) => {
      if (n.m.uniforms.uAmt.value = s[r], s[r] < 0.01) {
        n.p.visible = !1;
        return;
      }
      n.p.visible = !0;
      for (let l = 0; l < n.use; l++) {
        const d = n.seed[l];
        let c = n.pos[l * 3], h = n.pos[l * 3 + 1], f = n.pos[l * 3 + 2];
        h -= n.fall * t * (0.7 + d % 1 * 0.6), c += (Math.sin(a + d) * n.sway + 0.4) * t, f += Math.cos(a * 0.8 + d) * n.sway * 0.5 * t;
        const u = c - o, p = f - i;
        u > 45 && (c -= 90), u < -45 && (c += 90), p > 45 && (f -= 90), p < -45 && (f += 90);
        const v = zt(this.map, c, f);
        (h < v || h > v + n.hMax + 4) && (h = v + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = c, n.pos[l * 3 + 1] = h, n.pos[l * 3 + 2] = f;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const ms = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], Tu = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class ul {
  constructor(t, a, s) {
    g(this, "renderer");
    g(this, "scene", new Cc());
    g(this, "camera");
    g(this, "sun");
    g(this, "hemi");
    g(this, "sky");
    g(this, "skyMat");
    g(this, "nature");
    g(this, "units", new Ph());
    g(this, "buildings", new uu());
    g(this, "flames", new fu());
    g(this, "particles");
    g(this, "projectiles", new bu());
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
    const o = a.map, i = o.size;
    this.renderer = t, this.scene.fog = new xc(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(i * i)), this.fowTex = new kc(this.fowData, i, i, Mc, zc), this.fowTex.magFilter = this.fowTex.minFilter = Ac, this.fowTex.needsUpdate = !0, Kt.uFow.value = this.fowTex, Kt.uWorld.value = i, this.skyMat = new yn({
      side: Tc,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: De("#78ade0") }, uHor: { value: De("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new ca(new Ho(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new $c(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new Sc(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(uh(o), fh(o)), this.nature = gh(o), this.scene.add(this.nature.group);
    for (const d of this.nature.metal) d.visible = a.players[s].era >= 2;
    for (const d of this.nature.silver) d.visible = a.players[s].era >= te;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new gu({ uFow: Kt.uFow, uFowOn: Kt.uFowOn, uWorld: Kt.uWorld }, 600), this.scene.add(this.particles.points), this.projectiles.impacto = (d, c, h, f) => {
      f === "boulder" && this.seen(d, h) && this.particles.puff(d, c - 0.2, h, !1);
    }, this.weather = new Au(o), this.scene.add(this.weather.group), this.seasons = new ku(a.season), this.ghost = new ca(new wa(), new Rs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new ca(new ci(1, 1).rotateX(-Math.PI / 2), new Ja({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new M0(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let d = 0; d < 4; d++) {
      const c = new ca(n, new Ja({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      c.renderOrder = 6, c.visible = !1, this.scene.add(c), this.pings.push({ m: c, t: 0 });
    }
    this.rally = new ns(), this.rally.add(new ca(new Ya(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new Rs({ color: 7229239 }))), this.rallyFlag = new ca(new Me(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new Ja({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = a.players[s].start, l = i / 2;
    this.camera = new xu(o, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const a = new Pc({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return a.outputColorSpace = v0, a.toneMapping = Ec, a.toneMappingExposure = 1.08, a.shadowMap.enabled = !0, a.shadowMap.type = Ic, a;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const a of t.map.res) {
      const s = a.z * t.size + a.x;
      t.resKind[s] === 0 ? this.nature.removeRes(s) : t.resKind[s] === xe && t.resAmt[s] <= 0 && this.nature.setBerries(s, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const a = ms[t], s = Math.min(window.devicePixelRatio || 1, a.pr);
    this.renderer.setPixelRatio(s), this.sun.castShadow = a.shadow > 0, a.shadow > 0 && this.sun.shadow.mapSize.x !== a.shadow && (this.sun.shadow.mapSize.set(a.shadow, a.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(a.trees, a.tufts), this.particles.mat.uniforms.uPR.value = s, this.weather.setPixelRatio(s), this.weather.setScale(a.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, a) {
    this.renderer.setSize(t, a, !1), this.camera.setAspect(t, a);
  }
  setFog(t) {
    this.fogOn = t, Kt.uFowOn.value = t ? 1 : 0;
  }
  seen(t, a) {
    if (!this.fogOn) return !0;
    const s = this.world.size, o = Math.floor(t), i = Math.floor(a);
    return o >= 0 && i >= 0 && o < s && i < s && this.world.vis[this.me][i * s + o] === 1;
  }
  /** acontecimentos da simulação que mudam a cena */
  consume(t) {
    const a = this.world, s = a.map;
    for (const o of t) switch (o.t) {
      case "tree":
        this.nature.removeTree(o.k);
        break;
      case "res": {
        const i = o.k;
        a.resKind[i] === 0 ? this.nature.removeRes(i) : a.resKind[i] === xe && this.nature.setBerries(i, a.resAmt[i] > 0);
        break;
      }
      case "death":
        if (o.kind < ut) {
          const i = o.x / 256, n = o.z / 256;
          this.seen(i, n) && this.particles.puff(i, zt(s, i, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const i = a.x[o.e] / 256, n = a.z[o.e] / 256;
        this.seen(i, n) && this.particles.puff(i, zt(s, i, n), n, !0);
        break;
      }
      case "proj": {
        const i = o.x0 / 256, n = o.z0 / 256, r = o.x1 / 256, l = o.z1 / 256;
        (this.seen(i, n) || this.seen(r, l)) && this.projectiles.add(a, i, n, r, l, o.ticks, o.kind, o.gap / 256, o.tk, o.te, o.h);
        break;
      }
      case "age":
        if (o.player === this.me && o.era >= 2) for (const i of this.nature.metal) i.visible = !0;
        if (o.player === this.me && o.era >= te) for (const i of this.nature.silver) i.visible = !0;
        break;
    }
  }
  /** prévia do muro (ou da estrada): um bloco por tile, na ordem do desenho. Verde onde dá para construir, vermelho onde não dá;
   *  os blocos depois de `drawn` (a linha reta até o cursor, ainda não posta) ficam mais claros. key: o que se desenha
   *  (sem ela, o muro da era: paliçada, muralha de pedra ou de tufo) */
  setWallGhost(t, a = [], s = t?.length ?? 0, o) {
    for (const p of this.wallGhosts.values()) p.count = 0;
    this.roadGhost?.begin(), this.roadGhostX?.begin();
    const i = this.world, n = i.size, r = i.players[this.me].era, l = new se(), d = new Set(t ?? []), c = o ?? i.muroDaEra(r) ?? "palisade", h = (p) => l.set(a[p] ? p < s ? "#c6ffd4" : "#f4fff6" : "#ff8f80");
    if (t?.length && c === "road") {
      this.roadGhost || (this.roadGhost = new sn(an(i.map.hstep, { transparent: !0, opacity: 0.66, depthWrite: !1 }, { NO_SNOW: "" }), Ve * 2, !0, 7), this.roadGhostX = new sn(an(i.map.hstep, { transparent: !0, opacity: 0.55, depthWrite: !1, depthTest: !1 }, { NO_SNOW: "" }), Ve * 2, !0, 8), this.scene.add(this.roadGhost.group, this.roadGhostX.group));
      for (let p = 0; p < t.length; p++) {
        const v = t[p], y = v % n, k = Math.floor(v / n);
        (a[p] ? this.roadGhost : this.roadGhostX).add(i.map, y, k, dl(i, y, k, d), 1, h(p));
      }
    }
    if (this.roadGhost?.end(), this.roadGhostX?.end(), !t?.length || c === "road") return;
    this.ghostMat ?? (this.ghostMat = new Rs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghostMatX ?? (this.ghostMatX = new Rs({ vertexColors: !0, transparent: !0, opacity: 0.55, depthWrite: !1, depthTest: !1, flatShading: !0 }));
    const f = (p) => {
      const v = i.bAt[p] - 1;
      return v >= 0 && i.isBuilding(v) && i.owner[v] === this.me && i.bdef(v).wall;
    }, u = (p) => {
      const v = i.bAt[p] - 1;
      return f(p) && i.bdef(v).key !== "palisade";
    };
    for (let p = 0; p < t.length; p++) {
      const v = t[p], y = v % n, k = Math.floor(v / n), M = y + 0.5, x = k + 0.5;
      let z = -1;
      if (c === "palisade" || c === "tufa") {
        z = 0;
        const P = (I, C, w) => {
          if (I < 0 || C < 0 || I >= n || C >= n) return;
          const F = C * n + I;
          (d.has(F) || f(F)) && (z |= w), !d.has(F) && u(F) && (z |= w << 4);
        };
        P(y + 1, k, 1), P(y - 1, k, 2), P(y, k + 1, 4), P(y, k - 1, 8), c === "tufa" && (z &= 15);
      }
      const A = (c === "palisade" || c === "tufa" ? c + "/" + z : c + Ks(c, r)) + (a[p] ? "" : "/x");
      let $ = this.wallGhosts.get(A);
      $ || ($ = new Ht(c === "tufa" ? Xh(z) : Qo(c, r, z), a[p] ? this.ghostMat : this.ghostMatX, Ve * 2), $.renderOrder = a[p] ? 7 : 8, $.frustumCulled = !1, $.count = 0, this.wallGhosts.set(A, $), this.scene.add($)), !($.count >= Ve * 2) && ($.setMatrixAt($.count, new ue().makeTranslation(M, zt(i.map, M, x), x)), $.setColorAt($.count, h(p)), $.count++);
    }
    for (const p of this.wallGhosts.values())
      p.instanceMatrix.needsUpdate = !0, p.instanceColor && (p.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, a = 0, s = 0, o = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const i = lt[wt[t]], n = this.world.players[this.me].era, r = t + Ks(t, n);
    r !== this.ghostKey && (this.ghost.geometry = Qo(t, n), this.ghostKey = r);
    const l = a + i.size / 2, d = s + i.size / 2, c = zt(this.world.map, l, d);
    this.ghost.position.set(l, c, d), this.ghost.visible = !0, this.ghost.material.color.set(o ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, c + 0.12, d), this.foot.scale.set(i.size, 1, i.size), this.foot.visible = !0, this.foot.material.color.set(o ? "#6fe08a" : "#e0533c");
  }
  ping(t, a, s) {
    const o = this.pings[this.pingI++ % this.pings.length];
    o.t = 0.7, o.m.position.set(t, zt(this.world.map, t, a) + 0.08, a), o.m.material.color.set(Tu[s]), o.m.visible = !0;
  }
  render(t, a, s, o) {
    const i = this.world, n = this.camera;
    Kt.uTime.value = o, n.update(t), this.seasons.update(t, i.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
    const r = 2.25, l = this.seasons.elev;
    this.sun.position.set(n.x + Math.cos(r) * Math.cos(l) * 120, Math.sin(l) * 120, n.z + Math.sin(r) * Math.cos(l) * 120), this.sun.target.position.set(n.x, 0, n.z), this.sun.target.updateMatrixWorld();
    const d = Math.round(Math.min(90, Math.max(28, n.dist * 0.95)) / 4) * 4;
    if (d !== this.shadowExt) {
      this.shadowExt = d;
      const u = this.sun.shadow.camera;
      u.left = -d, u.right = d, u.top = d, u.bottom = -d, u.near = 1, u.far = 300, u.updateProjectionMatrix();
    }
    this.sky.position.copy(n.cam.position), this.updateFog();
    const c = i.players[this.me].era >= 2, h = i.players[this.me].era >= te;
    if (c !== this.metalOn) {
      this.metalOn = c;
      for (const u of this.nature.metal) u.visible = c;
    }
    if (h !== this.silverOn) {
      this.silverOn = h;
      for (const u of this.nature.silver) u.visible = h;
    }
    this.buildings.update(i, this.me, this.fogOn, o), this.units.update(i, a, t, s, this.me, this.fogOn, o, n.cam.quaternion), this.flames.update(this.buildings.fires, o), this.particles.smoke(t, this.buildings.smokes), this.particles.update(t), this.projectiles.update(t), this.weather.update(t, o, this.seasons.w, n.x, n.z);
    for (const u of this.pings) if (u.t > 0) {
      u.t -= t;
      const p = 1 - Math.max(0, u.t) / 0.7;
      u.m.scale.setScalar(1.4 - p * 0.8), u.m.material.opacity = Math.max(0, 1 - p), u.t <= 0 && (u.m.visible = !1);
    }
    let f = -1;
    if (s.size === 1) {
      const u = s.values().next().value;
      i.isBuilding(u) && i.owner[u] === this.me && i.rallyX[u] >= 0 && (f = u);
    }
    if (f >= 0) {
      const u = i.rallyX[f] / 256, p = i.rallyZ[f] / 256;
      this.rally.position.set(u, zt(i.map, u, p), p), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(o * 1.4) * 0.2, this.rallyFlag.material.color.set(i.players[this.me].color);
    } else this.rally.visible = !1;
    this.renderer.render(this.scene, n.cam);
  }
  updateFog(t = !1) {
    const a = this.world;
    if (!t && a.tick === this.lastFogTick) return;
    this.lastFogTick = a.tick;
    const s = a.vis[this.me], o = a.explored[this.me], i = this.fowData;
    for (let n = 0; n < i.length; n++) i[n] = s[n] ? 255 : o[n] ? 128 : 0;
    this.fowTex.needsUpdate = !0;
  }
  /** libera a memória da placa de vídeo ao sair da partida */
  dispose() {
    this.scene.traverse((t) => {
      const a = t;
      a.geometry && a.geometry.dispose();
      const s = a.material;
      Array.isArray(s) ? s.forEach((o) => o.dispose()) : s?.dispose();
    }), this.fowTex.dispose(), this.sun.shadow.map?.dispose(), this.renderer.renderLists.dispose();
  }
}
const fl = {
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
  "cmd.disband": "Disband",
  "cmd.disband.ok": "Confirm",
  "cmd.disband.d": "The chosen units leave the tribe and free their places (the cost does not come back). Press twice to confirm; on a computer, the Delete key also works.",
  "msg.dispensada": "1 unit left the tribe.",
  "msg.dispensadas": "{n} units left the tribe.",
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
  "msg.muroInimigo": "An enemy wall blocks the way. Order your troops to attack a wall block to get through (axes and rams knock it down fast).",
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
  "help.l12": '"Disband": pick units and press Disband twice. They leave the tribe and free their places, for example to make room for stronger troops (the cost does not come back).',
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
}, $u = {
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
  "cmd.disband": "Dispensar",
  "cmd.disband.ok": "Confirmar",
  "cmd.disband.d": "As unidades escolhidas vão embora da tribo e liberam as vagas (o custo não volta). Aperte duas vezes para confirmar; no computador, a tecla Delete também serve.",
  "msg.dispensada": "1 unidade foi dispensada.",
  "msg.dispensadas": "{n} unidades foram dispensadas.",
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
  "msg.muroInimigo": "Um muro inimigo fecha o caminho. Mande as tropas atacar um bloco do muro para passar (machados e aríetes derrubam depressa).",
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
  "help.l12": '"Dispensar": escolha unidades e aperte Dispensar duas vezes. Elas vão embora da tribo e liberam as vagas, por exemplo para dar lugar a tropas mais fortes (o custo não volta).',
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
}, Su = { en: fl, pt: $u }, pl = "origines_lang";
let Cs = "en";
try {
  const e = localStorage.getItem(pl);
  (e === "pt" || e === "en") && (Cs = e);
} catch {
}
const No = [], Qe = () => Cs;
function Kr(e) {
  Cs = e;
  try {
    localStorage.setItem(pl, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", No.forEach((t) => t());
}
const ml = (e) => (No.push(e), () => {
  const t = No.indexOf(e);
  t >= 0 && No.splice(t, 1);
});
function b(e, t = {}) {
  let a = Su[Cs][e] ?? fl[e] ?? e;
  for (const s in t) a = a.split(`{${s}}`).join(String(t[s]));
  return a;
}
const us = (e) => Math.floor(e).toLocaleString(Cs === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = Cs === "pt" ? "pt-BR" : "en");
const Cu = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, on = {
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
  dispensar: '<circle cx="8.5" cy="6.5" r="2.7"/><path d="M3.5 21v-5.5a5 5 0 0 1 8.5-3.6"/><path d="M14 16.5h7.5M18.5 13.5l3 3-3 3"/>',
  // D42: alguém indo embora
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
}, Pu = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, Eu = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function Mt(e, t) {
  const a = on[e] ?? on.animal;
  return !t && e.startsWith("season.") && (t = Eu[Number(e.slice(7))]), Cu(a, t ?? Pu[e] ?? "currentColor");
}
function da(e) {
  return e in on ? Mt(e, "currentColor") : Mt(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const za = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), ro = (e) => X.find((t) => t.key === e), Iu = X.filter((e) => e.pop > 0 && e.cls !== "villager").map((e) => e.key), qu = (e) => X.filter((t) => t.cls === e && (t.pop > 0 || t.key === "barbarian" || t.key === "gaul")).map((t) => t.key);
function gl(e) {
  const t = ro(e);
  if (!t) return [];
  const a = [];
  for (const s of t.bonus ?? [])
    if (s.vs === "animal") a.push({ k: "animais", dmg: s.dmg });
    else for (const o of qu(s.vs)) a.push({ k: o, dmg: s.dmg });
  return t.siege && a.push({ k: "construcoes" }), a;
}
function bl(e) {
  const t = ro(e);
  if (!t) return [];
  const a = [];
  for (const s of X) if (s.pop > 0)
    for (const o of s.bonus ?? []) o.vs === t.cls && a.push({ k: s.key, dmg: o.dmg });
  return t.siege && a.push({ k: "todos" }), a;
}
function Ou(e) {
  const t = ro(e)?.cls;
  return t === "ranged" ? "vs.far" : t === "scout" ? "vs.scout" : t === "cavalry" ? "vs.fast" : t === "infantry" ? "vs.foot" : null;
}
function vl(e) {
  const t = ro(e);
  if (!t || t.cls === "animal") return null;
  const a = t.muro ?? 100;
  return t.proj ? "vs.muroCima" : a >= 150 ? "vs.muroForte" : a <= 50 ? "vs.muroFraco" : null;
}
const qi = ["spearman", "horseman", "slinger", "swordsman"], Xr = [qi, qi, qi, ["hoplite", "eques", "slinger"], ["triarius", "eques", "velite", "hastatus"]], wu = (e) => Xr[Math.min(e, Xr.length - 1)], Yr = (e) => b(e === "animais" ? "vs.animals" : e === "construcoes" ? "vs.buildings" : e === "todos" ? "vs.anyone" : `unit.${e}`), Ru = (e) => e === "animais" ? Mt("animal", "currentColor") : e === "construcoes" ? Mt("house", "currentColor") : e === "todos" ? Mt("army", "currentColor") : da(e), ti = (e) => e.length ? e.map((t) => `<span class="vs-i" title="${za(Yr(t.k))}">${Ru(t.k)}<span>${za(Yr(t.k))}</span></span>`).join("") : '<span class="vs-i vs-nada">—</span>';
function Jr(e) {
  const t = gl(e), a = bl(e), s = vl(e);
  return !t.length && !a.length && !s ? "" : `<div class="vs">${t.length ? `<div class="vs-l vs-win"><b>${b("vs.win")}</b>${ti(t)}</div>` : ""}${a.length ? `<div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${ti(a)}</div>` : ""}${s ? `<div class="vs-l vs-muro"><b>${b("vs.muros")}</b><span class="vs-mt">${za(b(s))}</span></div>` : ""}</div>`;
}
function Bu(e) {
  const t = wu(e), a = [...t, t[0]].map((o, i) => (i ? `<span class="vs-seta">${b("vs.beats")} ›</span>` : "") + `<span class="vs-c">${da(o)}<b>${za(b(`unit.${o}`))}</b></span>`).join(""), s = [...Iu, "barbarian", "gaul"].map((o) => {
    const i = ro(o), n = i.pop > 0 && i.era > e, r = Ou(o), l = vl(o), c = o === "barbarian" || o === "gaul" ? b("vs.enemy") : n ? b("vs.from", { era: b(`era.${i.era}.in`) }) : "";
    return `<li class="vs-row${n ? " futura" : ""}"><div class="vs-who">${da(o)}<b>${za(b(`unit.${o}`))}</b>${c ? `<small>${za(c)}</small>` : ""}${r ? `<em>${za(b(r))}</em>` : ""}${l ? `<em class="vs-muro">${za(b(l))}</em>` : ""}</div><div class="vs-l vs-win"><b>${b("vs.win")}</b>${ti(gl(o))}</div><div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${ti(bl(o))}</div></li>`;
  }).join("");
  return `<p class="vs-intro">${b("vs.intro")}</p><div class="vs-ciclo" aria-label="${b("vs.cycle")}">${a}</div><ul class="vs-tab">${s}</ul>`;
}
const yl = "origines_dicas";
let xl = !1;
function Du() {
  if (xl) return !0;
  try {
    return localStorage.getItem(yl) === "1";
  } catch {
    return !0;
  }
}
function Nu() {
  xl = !0;
  try {
    localStorage.setItem(yl, "1");
  } catch {
  }
}
const _s = [
  { ic: "center", k: "tribo" },
  { ic: "villager", k: "ordens", dev: !0 },
  { ic: "house", k: "gente", dev: !0 },
  { ic: "food", k: "inverno" },
  { ic: "vs", k: "defesa" }
], Fu = (e, t) => {
  const a = _s[e];
  return b(`dica.${a.k}${a.dev ? t ? ".touch" : ".mouse" : ""}`);
};
function Lu(e, t) {
  const a = _s[e], s = _s.length, o = e === s - 1, i = b("dica.de", { n: e + 1, total: s });
  return `<div class="card panel dica-card" role="dialog" aria-modal="true" aria-labelledby="dica-titulo">
    <div class="dica-top"><span class="dica-ic">${Mt(a.ic)}</span>
      <span class="dica-pontos" role="img" aria-label="${i}" title="${i}">${_s.map((n, r) => `<i${r <= e ? ' class="on"' : ""}></i>`).join("")}</span></div>
    <h2 id="dica-titulo">${b(`dica.${a.k}.t`)}</h2>
    <p>${Fu(e, t)}</p>
    <div class="dica-btns">${o ? "<span></span>" : `<button id="btn-dica-pular" class="link">${b("dica.pular")}</button>`}
      <button id="${o ? "btn-dica-jogar" : "btn-dica-proxima"}" class="primary">${b(o ? "dica.jogar" : "dica.proxima")}</button></div>
  </div>`;
}
const fi = (e) => e === "logistica" ? "combate" : "logistica", ju = (e) => e === "logistica" ? 1 : e === "combate" ? 2 : 0, _u = (e) => e === 1 ? "logistica" : e === 2 ? "combate" : null, En = (e) => {
  const t = X.find((a) => a.key === e);
  return !!t && t.pop > 0 && t.cls !== "villager";
}, Uu = (e) => {
  const t = X[e];
  return !!t && t.pop > 0 && t.cls !== "villager";
}, nn = (e) => {
  const t = lt[wt[e]];
  if (!t) return !1;
  const a = (t.trains ?? []).flat();
  return a.length > 0 && a.every(En) && !(t.research ?? []).length;
};
function ks(e, t, a) {
  return t ? e.isBuilding(a) ? t === "logistica" : e.isUnit(a) ? Uu(e.kind[a]) ? t === "combate" : t === "logistica" : !1 : !0;
}
const Hu = /* @__PURE__ */ new Set(["gather", "work", "food", "build", "wall", "road", "ageup", "rally", "research", "trade"]);
function kl(e, t, a) {
  if (!t) return a;
  switch (a.type) {
    case "ia":
      return null;
    // não é ordem de quem joga
    case "train":
      return t === "logistica" || En(a.key) ? a : null;
    // treinar tropas: os dois
    case "cancel":
      return t === "logistica" || e.isBuilding(a.building) && nn(e.bdef(a.building).key) ? a : null;
    default: {
      if (Hu.has(a.type) && t !== "logistica") return null;
      if (!("ids" in a)) return t === "logistica" ? a : null;
      const s = a.ids.filter((o) => ks(e, t, o));
      return s.length ? { ...a, ids: s } : null;
    }
  }
}
const La = [0, 0.2, 0.5, 0.85], Zr = "origines_som", Qr = { music: 1, sfx: 3, amb: 2, muted: !1 };
class Wu {
  constructor() {
    g(this, "ctx", null);
    g(this, "opts", { ...Qr });
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
      const t = JSON.parse(localStorage.getItem(Zr) ?? "null");
      t && typeof t == "object" && (this.opts = { ...Qr, ...t });
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
      const s = this.ctx, o = s.createDynamicsCompressor();
      o.threshold.value = -12, o.knee.value = 8, o.ratio.value = 10, o.attack.value = 4e-3, o.release.value = 0.25, o.connect(s.destination), this.master = s.createGain(), this.master.connect(o), this.duckG = s.createGain(), this.duckG.connect(this.master);
      for (const i of ["music", "amb", "sfx", "ui", "alert"]) {
        const n = s.createGain();
        n.gain.value = 0, n.connect(i === "music" ? this.duckG : this.master), this.buses[i] = n;
      }
      this.apply(!0);
      for (const i of this.onReady.splice(0)) i();
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
      localStorage.setItem(Zr, JSON.stringify(this.opts));
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
        return this.scene === "menu" ? a.music ? Math.max(La[2], La[a.music]) : 0 : La[a.music];
      case "amb":
        return this.scene === "game" ? La[a.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return La[a.sfx];
      case "ui":
        return La[a.sfx] * 0.8;
      case "alert":
        return a.sfx ? Math.max(0.5, La[a.sfx]) : 0;
    }
  }
  apply(t = !1) {
    if (!this.ctx) return;
    const a = this.ctx.currentTime;
    for (const s of Object.keys(this.buses)) {
      const o = this.buses[s].gain;
      o.cancelScheduledValues(a), t ? o.setValueAtTime(this.level(s), a) : o.setTargetAtTime(this.level(s), a, s === "music" ? 0.8 : 0.15);
    }
  }
  /** a música abaixa um pouco quando toca um aviso e volta sozinha */
  duck(t = 0.55, a = 2.2) {
    if (!this.ctx) return;
    const s = this.duckG.gain, o = this.ctx.currentTime;
    s.cancelScheduledValues(o), s.setTargetAtTime(1 - t, o, 0.05), s.setTargetAtTime(1, o + a, 0.6);
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
const tt = new Wu(), ei = { 1: { vagas: 2, times: [0, 1] }, 2: { vagas: 4, times: [0, 0, 1, 1] }, 3: { vagas: 3, times: [0, 1, 2] }, 4: { vagas: 4, times: [0, 1, 2, 3] } }, rn = ["ajuda", "atacar", "cuidado"], Gu = (e) => e.map((t, a) => t ? a : -1).filter((t) => t >= 0), t0 = { ajuda: "ajuda", atacar: "vs", cuidado: "cuidado" }, Vu = ["food", "wood", "stone", "metal", "coins"], Ku = ["I", "II", "III", "IV", "V", "VI"], ne = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), li = class li {
  constructor(t, a, s, o, i) {
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
    // ── D42: dispensar ──
    g(this, "dispensarAte", 0);
    this.world = t, this.me = a, this.act = s, this.touch = o, this.selected = i, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = ml(() => this.build()), tt.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = tt.opts.muted;
      n.innerHTML = Mt(r ? "mute" : "sound"), n.title = b(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (a) => a.target?.closest?.(li.TIP_SEL) ?? null;
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
      a = `<div class="tip-h"><b>${ne(l)}</b></div>`;
    }
    const s = this.tipEl;
    clearTimeout(this.tipTimer), s.innerHTML = a, s.hidden = !1;
    const o = t.getBoundingClientRect(), i = s.offsetWidth, n = s.offsetHeight;
    let r = o.top - n - 8;
    r < 8 && (r = o.bottom + 8), s.style.left = `${Math.round(Math.max(8, Math.min(innerWidth - i - 8, o.left + o.width / 2 - i / 2)))}px`, s.style.top = `${Math.round(r)}px`;
  }
  hideTip() {
    clearTimeout(this.tipTimer), clearTimeout(this.hoverTimer), this.tipEl.hidden = !0;
  }
  tipHtml(t) {
    return `<div class="tip-h"><span class="tip-ic">${da(t.ic)}</span><b>${ne(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${ne(t.tip.desc)}</p>` : "") + (t.vs ? Jr(t.vs) : "") + (t.why ? `<p class="tip-why">${ne(t.why)}</p>` : "");
  }
  costHtml(t) {
    const a = this.world.players[this.me].res;
    return `<span class="cost">${Ga.filter((s) => t[s]).map((s) => `<span class="c${a[s] < t[s] * 100 ? " no" : ""}">${Mt(s)}${t[s]}</span>`).join("")}</span>`;
  }
  /** o botão de construir dá a versão desta era (D35: a paliçada vira muralha de pedra nos Metais; antes disso, a muralha não aparece) */
  trocada(t, a) {
    const s = lt[wt[t]];
    return s.next && lt[wt[s.next]].era <= a ? !0 : lt.some((o) => o.next === t && o.era <= a && s.era > a);
  }
  bldDesc(t, a) {
    const s = lt[wt[t]], o = s.troca ?? Va;
    return b(`bld.${t}.d`, { n: this.world.vagas(t, Math.max(a, s.era)), get: o.get, fair: o.fair });
  }
  /** a chave do que está sendo desenhado com o dedo: a estrada (M3) ou o muro desta era (D35) */
  chaveDesenho(t) {
    return this.placeKey && lt[wt[this.placeKey]]?.estrada ? this.placeKey : this.world.muroDaEra(t) ?? this.placeKey;
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
          <button id="btn-som" title="${b(tt.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(tt.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${tt.opts.muted}">${Mt(tt.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-quem-vence" title="${b("btn.vs")}" aria-label="${b("btn.vs")}">${Mt("vs")}</button>
          <button id="btn-ajuda" title="${b("btn.help")}" aria-label="${b("btn.help")}">${Mt("help")}</button>
          <button id="btn-menu" title="${b("btn.menu")}" aria-label="${b("btn.menu")}">${Mt("menu")}<span class="btn-label">${b("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <p class="amigo-faixa panel" id="amigo-faixa" hidden></p>
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${Mt("check")}<span>${b("cmd.place")}</span></button>
          <button id="btn-desfazer-muro" hidden>${Mt("undo")}<span>${b("cmd.undo")}</span></button>
          <button id="btn-cancelar-modo">${Mt("cancel")}<span>${b("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${b(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${b("btn.idle")}">${Mt("idle")}<span class="btn-label">${b("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${b("btn.army")}">${Mt("army")}<span class="btn-label">${b("btn.army")}</span></button>
            <button id="btn-aldeia" title="${b("btn.home")}">${Mt("home")}<span class="btn-label">${b("btn.home")}</span></button>
            <button id="btn-sinal" title="${b("sinal.btn")}" hidden>${Mt("sinal")}<span class="btn-label">${b("sinal.btn")}</span></button>
          </div>
          <div class="sinais panel" id="sinais" hidden>${rn.map((s) => `<button data-sinal="${s}">${Mt(t0[s])}<span>${b(`sinal.${s}`)}</span></button>`).join("")}</div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="marcas" id="marcas" aria-live="polite"></div>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${b("help.title")}</h2><p class="goal">${b("help.goal")}</p>
        <button id="btn-dicas-rever" class="rever">${Mt("help")}<span>${b("dica.rever")}</span></button>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", "help.l11", "help.l9", "help.l8", "help.l10", "help.l12", t ? "help.l5.touch" : "help.l5.mouse"].map((s) => `<li>${b(s)}</li>`).join("")}</ul>
        <p class="hint-copy">${b(t ? "hint.touch" : "hint.mouse")}</p>
        <div class="row-btns"><button id="btn-quem-vence-ajuda">${Mt("vs")}<span>${b("btn.vs")}</span></button><button id="btn-fechar-ajuda" class="primary">${b("help.close")}</button></div></div></div>
      <div class="modal" id="vantagens" data-open="false"><div class="card panel vs-card">
        <h2>${Mt("vs")}${b("btn.vs")}</h2><div id="vantagens-corpo"></div>
        <button id="btn-fechar-vantagens" class="primary">${b("help.close")}</button></div></div>
      <div class="modal dicas" id="dicas" data-open="false"></div>`;
    for (const s of ["era", "res", "cal", "amigo-chip", "tribos", "sinais", "marcas", "amigo-faixa", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "btn-desfazer-muro", "hint", "sel", "cmd", "mini", "ajuda", "vantagens", "vantagens-corpo", "dicas", "idle-n"]) this.$[s] = document.getElementById(s);
    this.$.mini.appendChild(this.minimap);
    const a = (s, o) => {
      document.getElementById(s).onclick = o;
    };
    a("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), a("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), a("btn-quem-vence", () => this.openVs()), a("btn-quem-vence-ajuda", () => {
      this.$.ajuda.dataset.open = "false", this.openVs();
    }), a("btn-fechar-vantagens", () => this.$.vantagens.dataset.open = "false"), a("btn-dicas-rever", () => {
      this.$.ajuda.dataset.open = "false", this.act.dicas?.();
    }), this.$.dicas.onclick = (s) => {
      const o = s.target?.closest?.("button");
      o?.id === "btn-dica-proxima" ? this.proximaDica() : (o?.id === "btn-dica-pular" || o?.id === "btn-dica-jogar") && this.fecharDicas();
    }, a("btn-menu", () => this.act.menu()), a("btn-som", () => tt.toggleMute()), a("btn-ocioso", () => this.act.idle()), a("btn-exercito", () => this.act.army()), a("btn-aldeia", () => this.act.home()), a("btn-sinal", () => {
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
      t.innerHTML = Lu(this.dica, this.touch), t.dataset.open = "true", this.touch || t.querySelector("button.primary")?.focus({ preventScroll: !0 });
    }
  }
  proximaDica() {
    this.dica < 0 || (this.dica < _s.length - 1 ? (this.dica++, this.desenharDica()) : this.fecharDicas());
  }
  fecharDicas() {
    if (this.dica < 0) return;
    this.dica = -1, this.desenharDica(), Nu();
    const t = this.dicaFim;
    this.dicaFim = null, t?.();
  }
  /** no alto da tela: com quem está jogando (null: sozinho) */
  setAmigo(t) {
    this.amigoNome = t;
    const a = this.$["amigo-chip"];
    if (!a) return;
    const s = t && this.papel ? b("amigo.chipPapel", { name: t, papel: b(`papel.${this.papel}`) }) : t ? b("amigo.chip", { name: t }) : "";
    a.hidden = !t, a.innerHTML = t ? `${Mt("amigo")}<span>${ne(s)}</span>` : "";
  }
  setPapel(t, a) {
    this.papel = t, this.papelQuem = a;
    const s = document.getElementById("btn-ocioso"), o = document.getElementById("btn-exercito");
    s && (s.hidden = t === "combate"), o && (o.hidden = t === "logistica"), this.setAmigo(this.amigoNome), this.sigSel = "", this.refresh();
  }
  /** nomes: o apelido em cada vaga ('' = computador); null = jogo sem partida online */
  setTribos(t) {
    this.tribos = t, this.sigTribos = "";
    const a = this.$.tribos;
    if (!a) return;
    a.hidden = !t, t || (a.innerHTML = "");
    const s = !!t && this.world.players.some((i, n) => this.world.aliado(this.me, n)), o = document.getElementById("btn-sinal");
    o && (o.hidden = !s), s || (this.$.sinais.hidden = !0);
  }
  desenharTribos() {
    const t = this.tribos, a = this.$.tribos;
    if (!t || !a) return;
    const s = this.world, o = s.players.map((i) => `${i.ai ? 1 : 0}${i.defeated ? 1 : 0}`).join("") + Qe();
    o !== this.sigTribos && (this.sigTribos = o, a.innerHTML = s.players.map((i, n) => {
      const r = n === this.me ? b("tribe.you") : t[n] ? i.ai ? b("online.computadorDe", { name: t[n] }) : t[n] : b("sala.computador"), l = s.aliado(this.me, n);
      return `<span class="trib${n === this.me ? " eu" : ""}${l ? " aliado" : ""}${i.defeated ? " fora" : ""}" style="--cor:${i.color}" title="${ne(r)}${l ? " · " + b("online.aliado") : ""}"><i></i>${ne(r)}${l ? Mt("amigo") : ""}</span>`;
    }).join(""));
  }
  /** o modo sinal: qual sinal o próximo toque no mapa põe */
  setSinal(t) {
    this.sinalTipo = t;
  }
  /** a marca de um sinal no mapa (some depois de 6 s) */
  addMarca(t, a, s, o) {
    const i = document.createElement("div");
    i.className = `marca-sinal ${s}`, i.innerHTML = `${Mt(t0[s])}<span><b>${ne(o)}</b>${b(`sinal.${s}`)}</span>`, this.$.marcas.appendChild(i), this.marcas.push({ x: t, z: a, ate: performance.now() + 6e3, el: i }), this.marcas.length > 6 && this.marcas.shift().el.remove(), this.posicionarMarcas();
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
    this.hideTip(), this.$["vantagens-corpo"].innerHTML = Bu(this.world.players[this.me].era), this.$.vantagens.dataset.open = "true";
  }
  hideHint() {
    this.hintHidden || (this.hintHidden = !0, this.$.hint.style.opacity = "0");
  }
  /** wall: 1 = escolhendo o começo da muralha, 2 = escolhendo o fim */
  /** muro: blocos que dá para construir (-1 = não é muro) e blocos desenhados */
  setMode(t, a = !0, s = -1, o = "", i = 0) {
    this.mode = t, this.placeOk = a, this.muroN = s, this.muroDesenho = i, this.placeKey = o, t !== "normal" && this.hideTip();
  }
  /** nome da construção na era (o Centro vira Salão do chefe, o campo de treino vira Quartel) */
  bldName(t, a) {
    for (let s = a; s >= 0; s--) {
      const o = `bld.${t}.e${s}`, i = b(o);
      if (i !== o) return i;
    }
    return b(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, a, s, o = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const i = document.createElement("button");
    for (i.className = "toast panel", i.dataset.aviso = o || "info", i.innerHTML = `<span>${ne(t)}</span>${a !== void 0 ? `<span class="go">${b("msg.go")}</span>` : ""}`, i.onclick = () => {
      a !== void 0 && s !== void 0 && this.act.jump(a, s), i.remove(), this.toasts = this.toasts.filter((n) => n.el !== i);
    }, this.$.toasts.prepend(i), this.toasts.unshift({ el: i, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return this.tribos && t >= 0 && t < this.tribos.length && t !== this.me ? this.tribos[t] || b("sala.computador") : t === this.me ? b("tribe.you") : b(t === Rt ? "tribe.wild" : `tribe.${t === ze ? 6 : t}`);
  }
  onEvents(t) {
    for (const a of t) {
      if (a.t === "age") {
        this.toast(a.player === this.me ? b("msg.ageMe", { era: b(`era.${a.era}.in`) }) : b("msg.ageOther", { p: this.tribe(a.player), era: b(`era.${a.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (a.t !== "msg" || a.player !== this.me) continue;
      const [s, o] = a.key.split("."), i = a.x !== void 0 ? a.x / 256 : void 0, n = a.z !== void 0 ? a.z / 256 : void 0;
      if (s === "built") this.toast(b("msg.built", { b: b(`bld.${o}`) }), i, n, "built");
      else if (s === "defeated") {
        const r = Number(o), l = this.tribos?.[r];
        this.toast(r === this.me ? b("msg.youDefeated") : l ? b("msg.defeatedDe", { p: l }) : b("msg.defeated", { p: this.tribos ? b(`tribe.${r}`) : this.tribe(r) }), void 0, void 0, "defeated");
      } else if (s === "tech") this.toast(b("msg.tech", { tech: b(`tech.${o}`) }), i, n, "tech");
      else if (s === "dispensadas") this.toast(b(o === "1" ? "msg.dispensada" : "msg.dispensadas", { n: o }), void 0, void 0, s);
      else if (s === "muroFalta" || s === "estradaFalta") this.toast(b(`msg.${s}`, { res: b(`res.${o}`).toLowerCase() }), i, n, s);
      else if (s === "censo") {
        const [, r, l] = a.key.split(".");
        this.toast(b("msg.censo", { n: us(Number(r)), m: us(Number(l)) }), void 0, void 0, "censo");
      } else if (s === "festa") {
        const r = ji[Number(o)];
        r && this.toast(b("msg.festa", { nome: b(`festa.${r.key}`), ef: b(`festa.ef.${r.ef}`) }), void 0, void 0, "festa");
      } else this.toast(b(`msg.${s}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), s === "underAttack" || s === "raidSoon" || s === "centerLost" || s === "centerDanger" || s === "campLoot" || s === "fuga" || s === "muroInimigo" ? i : void 0, n, s);
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
    const t = this.world, a = t.obtido[this.me] ?? [0, 0, 0, 0, 0], s = t.comido[this.me] ?? 0, o = this.amostras[this.amostras.length - 1];
    o && (t.tick < o.t || a.some((c, h) => c < (o.o[h] ?? 0))) && (this.amostras = []);
    const i = this.amostras[this.amostras.length - 1];
    if (!i || t.tick - i.t >= Wo)
      for (this.amostras.push({ t: t.tick, o: a.slice(), c: s }); this.amostras.length > 2 && t.tick - this.amostras[1].t >= 2 * ve; ) this.amostras.shift();
    const n = this.amostras[0], r = this.amostras[this.amostras.length - 1], l = r.t - n.t;
    if (l < 10 * Wo) return null;
    const d = l / ve;
    return [0, 1, 2, 3, 4].map((c) => Math.round(((r.o[c] ?? 0) - (n.o[c] ?? 0) - (c === 0 ? r.c - n.c : 0)) / 100 / d));
  }
  renderTop() {
    const t = this.world, a = t.players[this.me], s = a.era, o = s >= te ? ["food", "wood", "stone", "metal", "coins"] : s >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], i = t.pop(this.me), n = t.popCap(this.me), r = this.taxas(), l = t.festaDe(this.me) ? ji[t.month] : null, d = o.map((u) => Math.floor(a.res[u] / 100)).join(",") + `|${r?.join(",")}|${i}|${n}|${s}|${a.aging > 0}|${t.season}|${t.year}|${l?.key}|${Qe()}`;
    if (d === this.sigTop) return;
    this.sigTop = d;
    const c = (u) => {
      if (!r) return "";
      const p = r[u];
      return `<small class="taxa${p < 0 ? " neg" : p === 0 ? " zero" : ""}">${p > 0 ? "+" : p < 0 ? "−" : ""}${us(Math.abs(p))}${b("taxa.min")}</small>`;
    }, h = (u, p) => r ? b(p === 0 ? "taxa.tip.food" : "taxa.tip", { res: b(`res.${u}`), n: us(a.res[u] / 100), v: `${r[p] > 0 ? "+" : r[p] < 0 ? "−" : ""}${us(Math.abs(r[p]))}` }) : b(`res.${u}`);
    this.$.res.innerHTML = o.map((u, p) => `<div class="r" title="${ne(h(u, p))}">${Mt(u)}<span class="q"><span>${us(a.res[u] / 100)}</span>${c(p)}</span></div>`).join("") + `<div class="r${i >= n ? " full" : ""}" title="${b("pop.tip", { n: i, cap: n, max: this.world.limiteEra(s) })}">${Mt("pop")}<span>${i}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${Ku[s]}</span><span class="name">${b(`era.${s}`)}</span>${a.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = b(`era.${s}`);
    const f = l ? `<span class="festa">${Mt("festa", "#e9c46a")}<span>${ne(b(`festa.${l.key}`))}</span></span>` : "";
    this.$.cal.innerHTML = `${Mt(`season.${t.season}`)}<span class="name">${b(`season.${t.season}`)}</span><span class="yr">${b("cal.year", { y: t.year })}</span>${f}<span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${b(`season.${t.season}`)} · ${b("cal.year", { y: t.year })}` + (l ? ` · ${b("cal.festa")}: ${b(`festa.${l.key}`)} (${b(`festa.${l.key}.d`)}). ${b(`festa.ef.${l.ef}`)}` : ""), this.$.cal.dataset.festa = l ? l.key : "", this.$.cal.dataset.season = String(t.season), this.bindProgs();
  }
  renderMode() {
    const t = this.world.players[this.me].era, a = this.mode === "place" && this.muroN >= 0, s = a && this.world.canAfford(this.me, lt[wt[this.chaveDesenho(t)]].cost), o = `${this.mode}|${this.placeOk}|${this.muroN}|${this.muroDesenho}|${s}|${this.placeKey}|${t}|${Qe()}`;
    if (o === this.sigMode) return;
    this.sigMode = o;
    const i = this.$.modebar;
    i.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, i.classList.toggle("muro", a), this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && (this.touch || a)), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk)), this.$["btn-desfazer-muro"].hidden = !a, this.$["btn-desfazer-muro"].setAttribute("aria-disabled", String(!this.muroDesenho));
    const n = this.touch ? "touch" : "mouse";
    let r = this.mode === "place" ? this.placeOk ? b(`place.${n}`) : b("place.bad") : this.mode === "rally" ? b("rally.hint") : this.mode === "sinal" && this.sinalTipo ? b("sinal.toque", { sinal: b(`sinal.${this.sinalTipo}`) }) : "", l = this.mode === "place" && this.placeKey ? this.bldName(this.placeKey, t) : "";
    if (a) {
      const d = this.chaveDesenho(t), [c, h] = Object.entries(lt[wt[d]].cost)[0], f = !!lt[wt[d]].estrada;
      l = this.bldName(d, t), this.world.canAfford(this.me, lt[wt[d]].cost) ? r = this.muroDesenho ? b("muro.blocos", { n: this.muroN, v: this.muroN * h, res: b(`res.${c}`).toLowerCase() }) + (this.muroN < this.muroDesenho ? " · " + b("muro.vermelhos") : "") : b(`place.${f ? "estrada" : "muro"}.${n}`) : r = b("muro.falta", { v: h, res: b(`res.${c}`).toLowerCase() }), this.muroDesenho && !this.touch && (r += " · " + b("place.muro.mouse2"));
    }
    this.$["modebar-text"].innerHTML = (l ? `<b class="mb-name">${ne(l)}</b> · ` : "") + ne(r) + (a && this.touch ? `<small class="mb-dica">${ne(b("place.muro.dica"))}</small>` : "");
  }
  renderIdle() {
    const t = this.world;
    let a = 0;
    for (let s = 0; s < t.top; s++) t.isUnit(s) && t.owner[s] === this.me && t.kind[s] === mt.villager && t.task[s] === 0 && t.state[s] !== ce && a++;
    a !== this.idleN && (this.idleN = a, this.$["idle-n"].hidden = a === 0, this.$["idle-n"].textContent = String(a));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const a = this.world, s = a.task[t], o = a.tgt[t];
    return s === Xt ? a.phase[t] === io ? b("do.return", { n: Math.floor(a.carry[t] / 100), res: b(`res.${Vu[a.carryRes[t]]}`).toLowerCase() }) : o < 0 ? b("do.move") : a.tgtTile[t] ? b(a.map.tree[o] ? "do.wood" : a.resKind[o] === xe ? "do.berry" : a.resKind[o] === Xe ? "do.stone" : a.resKind[o] === Ae ? "do.silver" : "do.metal") : b(a.kind[o] === Tt ? "do.meat" : "do.farm") : s === le ? o >= 0 && a.aPagar[o] && a.isBuilding(o) && !a.canAfford(a.owner[o], a.bdef(o).cost) ? b("do.waitRes", { res: b(`res.${Object.keys(a.bdef(o).cost)[0]}`).toLowerCase() }) : b("do.build") : b(s === Vt ? o >= 0 && a.owner[o] === Rt ? "do.hunt" : "do.fight" : s === Ss ? "do.amove" : s === ts ? "do.flee" : a.state[t] === ce ? "do.move" : a.foodMode[t] ? "do.forage" : "do.idle");
  }
  renderSel() {
    const t = this.world, a = [...this.selected].filter((n) => t.alive[n]);
    if (!a.length) {
      this.sigSel !== "none" && (this.sigSel = "none", this.$.sel.hidden = !0);
      return;
    }
    let s, o;
    if (a.length === 1) {
      const n = a[0], r = t.kind[n], l = t.owner[n], d = l === this.me;
      if (r >= ut) {
        const c = lt[r - ut], h = t.players[l]?.era ?? 0, f = t.done[n] === 1, u = t.queue[n], p = c.key === "farm" && f ? this.farmer(n) : null;
        if (s = `b${n}|${t.hp[n]}|${f}|${u.join(",")}|${p}|${Qe()}|${this.papel}`, s === this.sigSel) return;
        const v = d ? f ? "" : b("info.building") : this.tribe(l), y = this.bldDesc(c.key, h);
        o = this.head(da(c.key), this.bldName(c.key, h), v, d) + this.hp(t.hp[n], c.hp) + (!f && d ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${y}</div>` + (p !== null ? `<div class="sel-line">${b("info.farmer", { who: b(p ? "info.yes" : "info.no") })}</div>` : "") + (d ? this.quemComanda(n, c.key) : "") + (u.length ? `<div class="queue" aria-label="${b("info.queue")}">${u.map((k, M) => {
          const x = k >= Se ? Ca[k - Se].key : X[k].key;
          return `<span class="qi" title="${b(k >= Se ? `tech.${x}` : `unit.${x}`)}">${da(x)}${M === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === Tt) {
        const c = Math.floor(t.work[n] / 100);
        if (s = `c${n}|${c}|${Qe()}`, s === this.sigSel) return;
        o = this.head(Mt("carcass", "currentColor"), b("unit.carcass"), b(`unit.${X[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${b("unit.carcass.d", { food: c })}</div>`;
      } else {
        const c = X[r], h = d ? this.doing(n) : this.tribe(l), f = d ? this.quemComanda(n) : "";
        if (s = `u${n}|${t.hp[n]}|${h}|${Qe()}|${this.papel}`, s === this.sigSel) return;
        o = this.head(da(c.key), b(`unit.${c.key}`), h, d) + this.hp(t.hp[n], c.hp) + `<div class="sel-desc">${b(`unit.${c.key}.d`, { food: c.animal?.food ?? 0 })}</div>` + f + Jr(c.key);
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of a) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, d) => l[0] - d[0]);
      if (s = "m" + r.map(([l, d]) => `${l}:${d}`).join(",") + Qe(), s === this.sigSel) return;
      o = this.head(Mt("pop", "currentColor"), b("sel.many", { n: a.length }), "", !0) + `<div class="sel-icons">${r.map(([l, d]) => `<button data-selecionar="${X[l]?.key ?? l}" title="${b(`unit.${X[l]?.key}`)}">${da(X[l]?.key ?? "")}<span>${d}</span></button>`).join("")}</div>`;
    }
    this.sigSel = s, this.$.sel.hidden = !1, this.$.sel.innerHTML = o, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(mt[n.dataset.selecionar]));
    const i = this.$.sel.querySelector("#btn-limpar-selecao");
    i && (i.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, a, s, o) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${ne(a)}</div>${s ? `<div class="sel-sub">${ne(s)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${b("sel.clear")}" aria-label="${b("sel.clear")}">${Mt("close")}</button></div>`;
  }
  /** com papel (D31): no que é do outro papel, quem comanda; no campo de treino, o Líder de Combate só treina tropas */
  quemComanda(t, a = "") {
    const s = this.papel;
    if (!s || ks(this.world, s, t)) return "";
    const o = b(`papel.${fi(s)}`), i = ne(this.papelQuem || "?"), n = a && nn(a) ? b("papel.soTreinar", { name: i, papel: o }) : b("papel.quem", { name: i, papel: o });
    return `<div class="sel-line papel-quem">${Mt("amigo")}<span>${n}</span></div>`;
  }
  hp(t, a) {
    const s = Math.max(0, Math.min(1, t / a));
    return `<div class="hp" title="${b("info.hp")} ${Math.max(0, t)}/${a}"><i style="width:${Math.round(s * 100)}%" class="${s > 0.6 ? "ok" : s > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const a = this.world;
    for (let s = 0; s < a.top; s++) if (a.isUnit(s) && a.task[s] === Xt && a.tgt[s] === t && !a.tgtTile[s]) return !0;
    return !1;
  }
  /** dispensar as unidades escolhidas (o botão ou a tecla Delete): o primeiro aperto pergunta ("Confirmar"), o segundo, em
   *  até 3 s, dispensa. Assim ninguém manda embora uma tropa sem querer */
  dispensar() {
    const t = this.world;
    [...this.selected].filter((s) => t.alive[s] && t.isUnit(s) && t.owner[s] === this.me && ks(t, this.papel, s)).length && (this.dispensarAte > performance.now() ? (this.dispensarAte = 0, this.act.disband()) : this.dispensarAte = performance.now() + 3e3, this.refresh());
  }
  // ── cartão de comandos ──
  missing(t) {
    const a = this.world.players[this.me].res;
    return Ga.find((s) => a[s] < (t[s] ?? 0) * 100);
  }
  whyCost(t) {
    const a = this.missing(t);
    return a ? b("why.cost", { res: b(`res.${a}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, a = this.me, s = t.players[a], o = [...this.selected].filter((k) => t.alive[k]), i = o.filter((k) => t.isUnit(k) && t.owner[k] === a && ks(t, this.papel, k)), n = i.filter((k) => t.kind[k] === mt.villager), r = this.papel === "combate", l = [];
    if (i.length) {
      if (this.cardMode === "build" && n.length) {
        l.push({ id: "btn-voltar-comandos", ic: "back", label: b("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const M of lt) if (M.buildable && M.era <= s.era + 1 && !this.trocada(M.key, s.era)) {
          const x = M.era > s.era ? b("why.era", { era: b(`era.${M.era}.in`) }) : this.whyCost(M.cost), z = this.bldName(M.key, s.era);
          l.push({ data: ["construir", M.key], ic: M.key, label: z, tip: { name: z, desc: this.bldDesc(M.key, s.era) }, cost: M.cost, why: x, act: () => this.act.startPlace(M.key) });
        }
        return l;
      }
      if (n.length && l.push({ id: "btn-construir", ic: "build", label: b("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const M = n.every((x) => t.foodMode[x] > 0);
        l.push({ id: "btn-buscar-comida", ic: "food", label: b("cmd.food"), tip: { name: b("cmd.food"), desc: b(M ? "cmd.food.off" : "cmd.food.d") }, pressed: M, act: () => this.act.food(!M) });
      }
      l.push({ id: "btn-parar", ic: "stop", label: b("cmd.stop"), act: () => this.act.stop() });
      const k = this.dispensarAte > performance.now();
      return l.push({ id: "btn-dispensar", ic: "dispensar", label: b(k ? "cmd.disband.ok" : "cmd.disband"), tip: { name: b("cmd.disband"), desc: b("cmd.disband.d") }, perigo: k, act: () => this.dispensar() }), l;
    }
    if (o.length !== 1 || !t.isBuilding(o[0]) || t.owner[o[0]] !== a) return l;
    const d = o[0], c = t.bdef(d), h = t.done[d] === 1, f = s.era;
    if (!h) return l;
    const u = kn(c, f), p = t.pop(a), v = t.popCap(a);
    let y = 0;
    for (let k = 0; k < t.top; k++) if (t.isBuilding(k) && t.owner[k] === a)
      for (const M of t.queue[k]) M < Se && (y += X[M].pop);
    for (const k of u) {
      if (r && !En(k)) continue;
      const M = X[mt[k]], x = t.queue[d], z = x.length >= 5 ? b("why.queue") : this.whyCost(M.cost) ?? (p + y + M.pop > v ? b(v >= this.world.limiteEra(f) ? "why.popEra" : "why.pop") : void 0);
      l.push({ data: ["treinar", k], ic: k, label: b(`unit.${k}`), tip: { name: b(`unit.${k}`), desc: b(`unit.${k}.d`) }, vs: k, cost: M.cost, why: z, badge: x.filter((A) => A === mt[k]).length, act: () => this.act.train(d, k) });
    }
    for (const k of r ? [] : c.research ?? []) {
      const M = Go[k], x = Ca[M], z = t.queue[d];
      if (t.hasTech(a, k)) continue;
      const A = t.techQueued(a, M) ? b("why.techQueued") : x.needs && !t.hasTech(a, x.needs) ? b("why.needs", { tech: b(`tech.${x.needs}`) }) : z.length >= 5 ? b("why.queue") : this.whyCost(x.cost);
      l.push({ data: ["pesquisar", k], ic: k, label: `${b(`tech.${k}`)}: ${b(`tech.${k}.d`)}`, tip: { name: b(`tech.${k}`), desc: b(`tech.${k}.d`) }, cost: x.cost, why: A, act: () => this.act.research(d, k) });
    }
    if (c.market && !r) {
      const k = t.troca(d, a), M = t.feiraDe(a), x = Qa.filter((z) => z !== "coins" || f >= te);
      x.includes(this.give) || (this.give = x[0]);
      for (const z of x) l.push({ data: ["dar", z], ic: z, label: b("trade.give", { res: b(`res.${z}`).toLowerCase() }), short: b("trade.giveShort"), pressed: this.give === z, act: () => {
        this.give = z;
      } });
      for (const z of x) if (z !== this.give) {
        const A = s.res[this.give] < Va.give * 100 ? b("why.trade", { res: b(`res.${this.give}`).toLowerCase() }) : void 0;
        l.push({ data: ["receber", z], ic: z, label: (M ? b("trade.fair") + " " : "") + b("trade.get", { n: k, res: b(`res.${z}`).toLowerCase() }), short: `+${k}`, cost: { [this.give]: Va.give }, why: A, act: () => this.act.trade(d, this.give, z) });
      }
    }
    if (t.queue[d].length && (!r || nn(c.key)) && l.push({ id: "btn-cancelar-fila", ic: "cancel", label: b("cmd.cancelQueue"), act: () => this.act.cancelQueue(d) }), c.key === "center" && !r)
      if (s.aging > 0) l.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.aging", { era: b(`era.${f + 1}.to`) }), why: b("why.ageBusy"), prog: () => 1 - s.aging / (He[f].time * 10), act: () => {
      } });
      else if (f < xn) {
        const k = t.eraBuildingTypes(a), M = He[f], x = f + 1 === te, z = x ? b("cmd.fundar") : b("cmd.ageup", { era: b(`era.${f + 1}.to`) });
        l.push({ id: "btn-avancar-era", ic: "ageup", label: z, tip: { name: z, desc: x ? `${b("cmd.fundar.d")} ${b("help.l4")}` : b("help.l4") }, cost: M.cost, why: k < 2 ? b("why.age", { n: k }) : this.whyCost(M.cost), act: () => this.act.ageUp(d) });
      } else l.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.ageup", { era: b(`era.${f + 1}.to`) }), why: b("why.maxEra"), act: () => {
      } });
    return u.length && !r && l.push({ id: "btn-ponto-reuniao", ic: "rally", label: b("cmd.rally"), tip: { name: b("cmd.rally"), desc: b("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(d) }), l;
  }
  refresh() {
    this.sigCard = "", this.slow = 0;
  }
  renderCard() {
    const t = [...this.selected].filter((n) => this.world.alive[n]), a = t.slice(0, 4).join(",");
    a !== this.cardFor && (this.cardFor = a, this.cardMode = "main", this.dispensarAte = 0);
    const s = this.buttons(), o = s.map((n) => `${n.id ?? n.data?.join("=")}|${n.label}|${n.why ?? ""}|${n.badge ?? ""}|${n.pressed ?? ""}|${n.perigo ?? ""}`).join(";") + Qe();
    if (o === this.sigCard) {
      this.btns = s;
      return;
    }
    this.sigCard = o, this.btns = s;
    const i = this.$.cmd;
    i.hidden = s.length === 0, i.innerHTML = s.map((n, r) => {
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, d = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}${n.perigo ? " perigo" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${ne(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${da(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${ne(n.label)}</span>${n.short ? `<span class="cb-s">${ne(n.short)}</span>` : ""}${d}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
    }).join(""), i.querySelectorAll("button[data-i]").forEach((n) => n.onclick = () => {
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
      const [o, i] = (s.dataset.p ?? "").split(":"), n = Number(i);
      let r = null;
      o === "aging" || o === "btn" ? r = () => a.aging > 0 ? 1 - a.aging / (He[Math.min(a.era, He.length - 1)].time * 10) : 0 : o === "season" ? r = () => t.tick % 1800 / 1800 : o === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : o === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= Se ? Ca[l - Se].time : X[l].time) * 10);
      }), r && this.progs.push({ el: s, f: r });
    });
  }
};
// ── dica dos ícones ──
g(li, "TIP_SEL", ".cb, .qi, .sel-icons button, .sel .vs-i, .r, .era-chip, .cal, .tools button, .quick button");
let ln = li;
class Xu {
  constructor(t, a, s, o) {
    g(this, "ctx");
    g(this, "base");
    g(this, "img");
    g(this, "t", 1);
    /** partida online (M6): o sinal de um aliado, um círculo piscando por 6 s */
    g(this, "marcas", []);
    g(this, "metalOn", !1);
    g(this, "prataOn", !1);
    this.world = a, this.me = s, this.cam = o;
    const i = a.size;
    t.width = t.height = i, this.ctx = t.getContext("2d"), this.base = this.ctx.createImageData(i, i), this.img = this.ctx.createImageData(i, i);
    const n = a.map, r = this.base.data;
    for (let c = 0; c < i; c++) for (let h = 0; h < i; h++) {
      const f = c * i + h, u = n.terrain[f], p = n.heights[Math.round(c / n.hstep) * n.hn + Math.round(h / n.hstep)];
      let v = [104, 150, 72];
      if (u === Ta) v = [46, 104, 128];
      else if (u === Pa) v = [86, 150, 160];
      else if (u === Vo) v = [205, 186, 140];
      else if (u === Ma || u === ea && p > di - 0.3) v = [140, 135, 125];
      else {
        const y = Math.max(0, Math.min(1, (p - 1) / 12));
        v = [104 + y * 30, 150 - y * 10, 72 + y * 20];
      }
      n.tree[f] && (v = [52, 92, 50]), r.set([v[0], v[1], v[2], 255], f * 4);
    }
    for (const c of n.res) {
      const h = c.kind === xe ? [200, 60, 70] : c.kind === Xe ? [215, 210, 200] : c.kind === Ie ? [90, 190, 160] : [255, 255, 255];
      c.kind === Ie || c.kind === Ae || !a.resKind[c.z * i + c.x] || this.base.data.set([h[0], h[1], h[2], 255], (c.z * i + c.x) * 4);
    }
    let l = !1;
    const d = (c) => {
      const h = t.getBoundingClientRect();
      this.cam.tx = (c.clientX - h.left) / h.width * i, this.cam.tz = (c.clientY - h.top) / h.height * i;
    };
    t.addEventListener("pointerdown", (c) => {
      l = !0, t.setPointerCapture(c.pointerId), d(c), c.stopPropagation();
    }), t.addEventListener("pointermove", (c) => {
      l && d(c);
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
  update(t, a, s, o) {
    if ((this.t += t) < 0.25) return;
    if (this.t = 0, !this.metalOn && this.world.players[this.me].era >= 2) {
      this.metalOn = !0;
      const u = this.world.size;
      for (const p of this.world.map.res) p.kind === Ie && this.world.resKind[p.z * u + p.x] === Ie && this.base.data.set([90, 190, 160, 255], (p.z * u + p.x) * 4);
    }
    if (!this.prataOn && this.world.players[this.me].era >= te) {
      this.prataOn = !0;
      const u = this.world.size;
      for (const p of this.world.map.res) p.kind === Ae && this.world.resKind[p.z * u + p.x] === Ae && this.base.data.set([196, 212, 240, 255], (p.z * u + p.x) * 4);
    }
    const i = this.world.size, n = this.base.data, r = this.img.data, l = this.world.vis[this.me], d = this.world.explored[this.me];
    for (let u = 0; u < i * i; u++) {
      const p = !a || l[u] ? 1 : d[u] ? 0.5 : 0.08, v = u * 4;
      r[v] = n[v] * p, r[v + 1] = n[v + 1] * p, r[v + 2] = n[v + 2] * p, r[v + 3] = 255;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const c = this.world;
    for (let u = 0; u < c.top; u++) {
      if (!c.alive[u]) continue;
      const p = c.x[u] / 256, v = c.z[u] / 256, y = c.owner[u] === this.me;
      if (a && !y && !l[Math.floor(v) * i + Math.floor(p)] || c.kind[u] === Tt) continue;
      const k = c.kind[u] >= ut, M = c.owner[u], x = k ? c.bdef(u).size === 1 ? 2 : 7 : M === Rt ? 2 : 3;
      this.ctx.fillStyle = M === Rt ? "#e8d9b0" : M === ze ? "#2f3b27" : c.players[M]?.color ?? "#fff", this.ctx.fillRect(p - x / 2, v - x / 2, x, x), k && x > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(p - x / 2, v - x / 2, x, x));
    }
    const h = performance.now();
    this.marcas = this.marcas.filter((u) => u.ate > h);
    for (const u of this.marcas) {
      const p = 5 + Math.floor(h / 250) % 2 * 2;
      this.ctx.strokeStyle = u.cor, this.ctx.lineWidth = 2.5, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, p, 0, Math.PI * 2), this.ctx.stroke(), this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, p + 2, 0, Math.PI * 2), this.ctx.stroke();
    }
    const f = [[0, 0], [s, 0], [s, o], [0, o]].map(([u, p]) => this.cam.ground(u, p, s, o));
    f.every((u) => u) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), f.forEach((u, p) => p ? this.ctx.lineTo(u.x, u.z) : this.ctx.moveTo(u.x, u.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class Yu {
  constructor(t, a, s, o, i, n) {
    g(this, "selected", /* @__PURE__ */ new Set());
    /** papel no jogo com um amigo (D31): só seleciona em grupo e só manda no que é do papel; null = tudo */
    g(this, "papel", null);
    g(this, "pointers", /* @__PURE__ */ new Map());
    g(this, "gesture", "none");
    g(this, "longTimer", 0);
    g(this, "lastTap", { t: 0, x: 0, y: 0 });
    g(this, "keys", /* @__PURE__ */ new Set());
    g(this, "v", new Ot());
    g(this, "v2", new Ot());
    g(this, "right", new Ot());
    g(this, "ac", new AbortController());
    this.canvas = t, this.world = a, this.me = s, this.cam = o, this.box = i, this.hooks = n;
    const r = { signal: this.ac.signal };
    t.addEventListener("pointerdown", (l) => this.down(l), r), t.addEventListener("pointermove", (l) => this.move(l), r), t.addEventListener("pointerup", (l) => this.up(l), r), t.addEventListener("pointercancel", (l) => this.cancel(l), r), t.addEventListener("contextmenu", (l) => l.preventDefault(), r), t.addEventListener("wheel", (l) => {
      l.preventDefault(), this.cam.tdist *= Math.exp(l.deltaY * 12e-4), this.hooks.onInteract();
    }, { passive: !1, signal: this.ac.signal }), addEventListener("keydown", (l) => this.key(l), r), addEventListener("keyup", (l) => this.keys.delete(l.key.toLowerCase()), r), addEventListener("blur", () => this.keys.clear(), r);
  }
  manda(t) {
    return ks(this.world, this.papel, t);
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
    const a = t.target?.tagName;
    if (!(a === "BUTTON" && (t.key === " " || t.key === "Enter"))) {
      if (t.key === "Delete") {
        a !== "INPUT" && a !== "TEXTAREA" && this.hooks.onDisband?.();
        return;
      }
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
    const s = t.clientX - a.x, o = t.clientY - a.y, i = Math.hypot(t.clientX - a.sx, t.clientY - a.sy);
    if (this.gesture === "draw") {
      const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("move", n.x, n.z), a.x = t.clientX, a.y = t.clientY;
      return;
    }
    if (this.gesture === "none" && this.pointers.size === 1 && this.hooks.mode() === "place" && this.hooks.drawing() && (a.type !== "mouse" || a.button === 0) && i > (a.type === "mouse" ? 6 : 10)) {
      this.gesture = "draw", clearTimeout(this.longTimer);
      const n = this.cam.ground(a.sx, a.sy, this.W, this.H), r = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("start", n.x, n.z), r && this.hooks.onDraw("move", r.x, r.z), a.x = t.clientX, a.y = t.clientY;
      return;
    }
    if (this.gesture === "pinch" && this.pointers.size === 2) {
      const n = [...this.pointers.entries()].find(([h]) => h !== t.pointerId)[1], r = Math.hypot(a.x - n.x, a.y - n.y), l = Math.hypot(t.clientX - n.x, t.clientY - n.y);
      l > 10 && r > 10 && (this.cam.tdist *= r / l);
      const d = Math.atan2(a.y - n.y, a.x - n.x), c = Math.atan2(t.clientY - n.y, t.clientX - n.x);
      this.cam.tyaw += Math.atan2(Math.sin(c - d), Math.cos(c - d)), this.cam.pan(s * 0.5, o * 0.5, this.H);
    } else if (this.gesture === "rotate")
      this.cam.tyaw -= s * 6e-3;
    else if (a.type === "mouse")
      if (a.button === 0 && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      } else a.button === 0 && (this.gesture === "box" || i > 6) && (this.gesture = "box", this.drawBox(a, t));
    else
      this.gesture === "none" && this.hooks.mode() === "normal" && i > 10 && performance.now() - a.t >= 380 && Math.hypot(a.x - a.sx, a.y - a.sy) < 10 && (this.gesture = "box"), this.gesture === "box" ? this.drawBox(a, t) : (this.gesture === "pan" || i > 10) && (this.gesture = "pan", clearTimeout(this.longTimer), this.cam.pan(s, o, this.H));
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
    const s = t.clientX, o = t.clientY, i = this.hooks.mode(), n = performance.now(), r = n - this.lastTap.t < 320 && Math.hypot(s - this.lastTap.x, o - this.lastTap.y) < 30;
    if (this.lastTap = { t: n, x: s, y: o }, a.type === "mouse") {
      if (a.button === 2) {
        if (i === "place") {
          this.hooks.onCancel();
          return;
        }
        const f = this.cam.ground(s, o, this.W, this.H);
        if (!f) return;
        if (i === "rally" || i === "sinal" || this.singleOwnBuilding() >= 0) {
          this.hooks.onRally(f.x, f.z);
          return;
        }
        this.ownUnitsSelected() && this.hooks.onCommand(this.target(s, o, f));
      } else if (a.button === 0) {
        if (i === "place") {
          const f = this.cam.ground(s, o, this.W, this.H);
          if (this.hooks.drawing()) {
            f && this.hooks.onDraw("tap", f.x, f.z);
            return;
          }
          f && this.hooks.onPlaceAt(f.x, f.z), this.hooks.onPlaceConfirm(t.shiftKey);
          return;
        }
        if (i === "rally" || i === "sinal") {
          const f = this.cam.ground(s, o, this.W, this.H);
          f && this.hooks.onRally(f.x, f.z);
          return;
        }
        this.clickSelect(s, o, t.shiftKey, r);
      }
      return;
    }
    const l = this.cam.ground(s, o, this.W, this.H);
    if (i === "place") {
      l && (this.hooks.drawing() ? this.hooks.onDraw("tap", l.x, l.z) : this.hooks.onPlaceAt(l.x, l.z));
      return;
    }
    if (i === "rally" || i === "sinal") {
      l && this.hooks.onRally(l.x, l.z);
      return;
    }
    const d = this.target(s, o, l), c = this.world, h = this.ownUnitsSelected();
    if (d.kind === "unit" && c.owner[d.e] === this.me && c.kind[d.e] !== Tt && this.manda(d.e)) {
      this.clickSelect(s, o, !1, r);
      return;
    }
    if (d.kind === "building" && c.owner[d.e] === this.me) {
      const f = !c.done[d.e] || lt[c.kind[d.e] - ut].walk;
      h && f ? this.hooks.onCommand(d) : this.only(d.e);
      return;
    }
    if (h && l) {
      this.hooks.onCommand(d);
      return;
    }
    if (d.kind === "unit" || d.kind === "building") {
      this.only(d.e);
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
    const o = this.world.size, i = Math.floor(t), n = Math.floor(a);
    return i < 0 || n < 0 || i >= o || n >= o ? !1 : (s ? this.world.explored : this.world.vis)[this.me][n * o + i] === 1;
  }
  /** pessoa, animal ou caça mais perto do ponto da tela */
  pickUnit(t, a, s) {
    const o = this.world, i = this.lastTouch ? 34 : 24;
    let n = -1, r = i * i;
    for (let l = 0; l < o.top; l++) {
      if (!o.alive[l] || o.kind[l] >= ut) continue;
      const d = o.owner[l] === this.me;
      if (s && !d) continue;
      const c = o.x[l] / 256, h = o.z[l] / 256;
      if (!d && !this.seen(c, h) || (this.cam.toScreen(c, zt(o.map, c, h) + (o.kind[l] === Tt ? 0.2 : 0.6), h, this.W, this.H, this.v), !this.v.z)) continue;
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
    let o = -1, i = 1;
    this.right.set(1, 0, 0).applyQuaternion(this.cam.cam.quaternion);
    for (let n = 0; n < s.top; n++) {
      if (!s.isBuilding(n)) continue;
      const r = s.x[n] / 256, l = s.z[n] / 256;
      if (s.owner[n] !== this.me && !this.seen(r, l, !0)) continue;
      const d = lt[s.kind[n] - ut].size, c = zt(s.map, r, l) + (d >= 3 ? 0.7 : 0.5);
      if (this.cam.toScreen(r, c, l, this.W, this.H, this.v), !this.v.z) continue;
      this.cam.toScreen(r + this.right.x * d * 0.55, c, l + this.right.z * d * 0.55, this.W, this.H, this.v2);
      const h = Math.max(18, Math.hypot(this.v2.x - this.v.x, this.v2.y - this.v.y)), f = Math.hypot(this.v.x - t, this.v.y - a) / h;
      f < i && (i = f, o = n);
    }
    return [o, i];
  }
  /** árvore, arbusto ou pedra perto do ponto (a copa de uma árvore cobre o chão atrás dela) */
  pickTile(t, a, s) {
    const o = this.world, i = o.size, n = Math.floor(s.x), r = Math.floor(s.z), l = this.lastTouch ? 36 : 28;
    let d = -1, c = l * l;
    for (let h = -3; h <= 2; h++) for (let f = -3; f <= 3; f++) {
      const u = n + f, p = r + h;
      if (u < 0 || p < 0 || u >= i || p >= i) continue;
      const v = p * i + u, y = o.map.tree[v] > 0;
      if (!(!(y || o.resKind[v]) || o.resAmt[v] <= 0 || !o.explored[this.me][v]) && !(o.resKind[v] === 3 && o.players[this.me].era < 2))
        for (const k of y ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(u + 0.5, zt(o.map, u + 0.5, p + 0.5) + k, p + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const M = (this.v.x - t) ** 2 + (this.v.y - a) ** 2;
          M < c && (c = M, d = v);
        }
    }
    return d;
  }
  /** o que está sob o ponto da tela */
  target(t, a, s = this.cam.ground(t, a, this.W, this.H)) {
    const o = this.world, i = s?.x ?? 0, n = s?.z ?? 0, [r, l] = this.pickUnit(t, a, !1), [d, c] = this.pickBuilding(t, a);
    if (r >= 0 && (d < 0 || l < 14 || c > 0.75)) return { kind: "unit", e: r, k: -1, x: o.x[r] / 256, z: o.z[r] / 256 };
    if (d >= 0) return { kind: "building", e: d, k: -1, x: o.x[d] / 256, z: o.z[d] / 256 };
    if (s) {
      const h = this.pickTile(t, a, s);
      if (h >= 0) return { kind: "tile", e: -1, k: h, x: h % o.size + 0.5, z: Math.floor(h / o.size) + 0.5 };
    }
    return { kind: "ground", e: -1, k: -1, x: i, z: n };
  }
  clickSelect(t, a, s, o) {
    const i = this.world, n = this.target(t, a, null), r = n.kind === "unit" ? n.e : -1;
    if (s && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && i.owner[r] === this.me && i.kind[r] !== Tt && this.manda(r)) {
      if (s || this.selected.clear(), o) {
        const l = i.kind[r];
        for (let d = 0; d < i.top; d++) if (i.isUnit(d) && i.owner[d] === this.me && i.kind[d] === l && this.manda(d)) {
          const c = i.x[d] / 256, h = i.z[d] / 256;
          this.cam.toScreen(c, zt(i.map, c, h), h, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(d);
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
  selectBox(t, a, s, o, i) {
    const n = this.world, r = Math.min(t, s), l = Math.max(t, s), d = Math.min(a, o), c = Math.max(a, o);
    (!i || !this.ownUnitsSelected()) && this.selected.clear();
    for (let h = 0; h < n.top; h++) {
      if (!n.isUnit(h) || n.owner[h] !== this.me || !this.manda(h)) continue;
      const f = n.x[h] / 256, u = n.z[h] / 256;
      this.cam.toScreen(f, zt(n.map, f, u) + 0.5, u, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= d && this.v.y <= c && this.selected.add(h);
    }
    this.hooks.onSelect();
  }
  drawBox(t, a) {
    const s = this.box;
    if (s.style.display = "block", !t || !a) {
      const o = [...this.pointers.values()][0];
      if (!o) return;
      s.style.left = o.sx + "px", s.style.top = o.sy + "px", s.style.width = s.style.height = "2px";
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
    let s = 0, o = 0;
    const i = 900 * t;
    (a.has("a") || a.has("arrowleft")) && (s += i), (a.has("d") || a.has("arrowright")) && (s -= i), (a.has("w") || a.has("arrowup")) && (o += i), (a.has("s") || a.has("arrowdown")) && (o -= i), (s || o) && (this.cam.pan(s, o, this.H), this.hooks.onInteract()), a.has("q") && (this.cam.tyaw += t * 1.6), a.has("e") && (this.cam.tyaw -= t * 1.6), (a.has("+") || a.has("=")) && (this.cam.tdist *= 1 - t * 1.2), a.has("-") && (this.cam.tdist *= 1 + t * 1.2);
  }
}
const Xs = (() => {
  const e = "34848b9";
  return /^[0-9a-f]{7}$/.test(e) ? parseInt(e, 16) : 0;
})(), Ml = new URLSearchParams(location.search), zl = Ml.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`, Al = zl.replace(/^ws/, "http"), Ju = !location.pathname.startsWith("/jogar/") && !Ml.get("online"), ta = /^[A-HJ-NP-Z2-9]{4}$/, e0 = (e) => e.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 4);
let Zu = null;
function Qu() {
  return Ju ? Promise.resolve(!1) : Zu ?? (Zu = fetch(Al + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class Ys {
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
    const a = await fetch(Al + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!ta.test(s)) throw new Error("rede");
    const o = new Ys("anfitriao", t);
    return o.codigo = s, o.abrir(), o;
  }
  /** o amigo entra com o código */
  static entrar(t, a) {
    const s = new Ys("convidado", a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${zl}/sala/${this.codigo}?modo=${this.papel === "anfitriao" ? "criar" : "entrar"}`);
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
        const o = this.caiuEm > 0;
        this.caiuEm = 0, this.conectou = !0, this.papel === "convidado" ? (this.parceiro = s, this.on(o ? { t: "reconectou", sozinho: !1 } : { t: "oi", nome: s })) : this.on(o ? { t: "reconectou", sozinho: a.amigo === "" } : { t: "codigo", codigo: this.codigo });
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
    this.enviar(`{"t":"s","v":${Xs},"d":${t}}`);
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
const a0 = "origines_opts", re = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class tf {
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
      const a = JSON.parse(localStorage.getItem(a0) ?? "{}");
      a.rivals >= 1 && a.rivals <= 3 && (this.rivals = a.rivals), a.diff >= 0 && a.diff <= 2 && (this.diff = a.diff), a.regras === "beta" && (this.regras = "beta");
    } catch {
    }
    ml(() => this.render());
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
  showPause(t, a, s, o, i = !1) {
    this.screen = { k: "pause", minutes: t, quality: a, saved: "", owner: s, acc: o, beta: i }, this.render();
  }
  /** a conta mudou (entrou, saiu ou o jogo passou para a conta): redesenha a pausa */
  updatePause(t, a, s) {
    this.screen?.k === "pause" && (this.screen.owner = t, this.screen.acc = a, s && (this.screen.saved = s), this.render());
  }
  showEnd(t, a, s, o) {
    this.screen = { k: "end", result: t, minutes: a, era: s, online: o }, this.render();
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
    const o = this.root.querySelector("#btn-entrar-codigo");
    o && (o.disabled = a || !ta.test(this.codigo));
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
    const o = this.root.querySelector("#btn-entrar-partida");
    o && (o.disabled = a || !ta.test(this.codigoPartida));
    const i = this.root.querySelector("#btn-criar-partida");
    i && (i.disabled = a);
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
    let o = 0, i = !1;
    this.root.querySelectorAll("[data-regras]").forEach((n) => {
      const r = n.dataset.regras;
      n.onpointerdown = () => {
        i = !1, clearTimeout(o), o = window.setTimeout(() => {
          i = !0, s(r);
        }, 450);
      };
      const l = () => clearTimeout(o);
      n.onpointerup = l, n.onpointercancel = l, n.onpointerleave = l, n.oncontextmenu = (d) => d.preventDefault(), n.onclick = () => {
        if (i) {
          i = !1;
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
    const s = ei[t.modo] ?? ei[1], o = (n) => {
      const r = t.vagas[n] ?? "", l = n === t.eu;
      return `<button data-vaga="${n}" class="vaga${r ? "" : " cpu"}" style="--cor:${Mn[n]}" aria-pressed="${this.vagaEscolhida === n}"${a ? "" : ' tabindex="-1"'}><i class="cor" aria-hidden="true"></i><span>${r ? re(r) : b("sala.computador")}</span>${l ? `<small>${b("sala.voce")}</small>` : ""}</button>`;
    }, i = Array.from({ length: s.vagas }, (n, r) => r);
    return t.modo !== 2 ? `<div class="vagas">${i.map(o).join("")}</div>` : `<div class="vagas times">${[0, 1].map((n) => `<div class="time"><p class="acct-k">${b("sala.time", { n: n + 1 })}</p>${i.filter((r) => s.times[r] === n).map(o).join("")}</div>`).join("")}</div>`;
  }
  /** na pausa do anfitrião: convidar um amigo, o código e quem está jogando junto */
  pauseFriend(t) {
    if (!this.amigoOn || t === "off" || t === "loading") return "";
    const a = this.convite, s = (i) => `<b>${re(i)}</b>`;
    if (!t.logado) return `<p class="muted small">${b("amigo.semConta")}</p>`;
    if ((!a || a.estado === "erro") && this.escolhendoPapel) {
      const i = (n, r) => `<button id="btn-papel-${n}" class="big papel">${Mt(r)}<span>${b(`papel.${n}`)}<small>${b(`papel.${n}.d`)}</small></span></button>`;
      return `<div class="acct on papeis"><p class="acct-l">${b("papel.pergunta")}</p><p class="acct-s">${b("papel.regra")}</p>${i("logistica", "villager")}${i("combate", "army")}<button id="btn-papel-voltar" class="link">${b("papel.voltar")}</button></div>`;
    }
    if (!a || a.estado === "erro") return `${a ? `<p class="saved fail">${b("amigo.erroCriar")}</p>` : ""}<button id="btn-convidar-amigo" class="big">${Mt("amigo")}<span>${b("amigo.convidar")}</span></button><p class="muted small">${b("amigo.convidar.d")}</p>`;
    if (a.estado === "criando") return `<p class="muted">${b("amigo.criando")}</p>`;
    const o = a.papel ? `<p class="acct-s papeis-l">${b("papel.dele", { papel: s(b(`papel.${a.papel}`)) })} · ${b("papel.seu", { papel: s(b(`papel.${fi(a.papel)}`)) })}</p>` : "";
    return `<div class="acct on convite"><p class="acct-k">${b("amigo.codigo")}</p><p class="codigo" aria-label="${re((a.codigo ?? "").split("").join(" "))}">${re(a.codigo ?? "")}</p>
      ${a.estado === "junto" ? `<p class="acct-l">${b("amigo.jogando", { name: s(a.nome ?? "") })}</p>` : `<p class="acct-s">${b("amigo.instrucoes")}</p><p class="acct-l">${b("amigo.esperando")}</p>`}
      ${o}${a.papel ? `<button id="btn-trocar-papeis" class="acct-btn">${b("papel.trocar")}</button>` : ""}
      <button id="btn-encerrar-convite" class="acct-btn">${b("amigo.encerrar")}</button></div>`;
  }
  soundRows() {
    return ["music", "sfx", "amb"].map((t) => `<div class="opt"><div class="opt-l">${b(`snd.${t}`)}</div><div class="seg">${[0, 1, 2, 3].map((a) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[t]}="${a}" aria-pressed="${tt.opts[t] === a}">${b(`snd.l${a}`)}</button>`).join("")}</div></div>`).join("");
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${b("lang.label")}"><button id="btn-idioma-en" aria-pressed="${Qe() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${Qe() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, a) {
    if (a === "off" || a === "loading") return "";
    const s = a.logado ? a.apelido ?? "" : "", o = (n) => `<b>${re(n)}</b>`, i = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${b("acct.pauseLogin")}</button>`;
    return t && t === s ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAccount", { name: o(s) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${b("acct.pauseOther", { name: o(t) })}</p>${s ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${b("acct.switch")}</button>` : i}</div>` : s ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAdopt", { name: o(s) })}</p></div>` : `<div class="acct small"><p class="acct-l">${b("acct.pauseNone")}</p>${i}</div>`;
  }
  render() {
    const t = this.screen, a = this.root;
    if (a.dataset.open = String(!!t), a.dataset.screen = t?.k ?? "", !t) {
      a.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: r, save: l, other: d } = t.info, c = typeof r == "object" && r.logado ? r.apelido ?? "" : "", h = (z) => `<b>${re(z)}</b>`, f = l ? l.adopt ? b("save.adopt", { name: h(c) }) : c ? b("save.inAccount", { name: h(c) }) : b("save.deviceOnly") : "", u = r === "off" ? "" : r === "loading" ? `<div class="acct"><p class="acct-l">${b("acct.checking")}</p></div>` : r.logado ? `<div class="acct on"><p class="acct-k">${b("acct.yours")}</p><p class="acct-name">${re(c)}</p><p class="acct-l">${b(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${b("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${b("acct.none")}</p><p class="acct-l">${b("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>
            ${d ? `<p class="acct-s">${b("acct.otherHint", { name: h(d) })}</p>` : `<p class="acct-s">${b("acct.why")}</p>`}</div>`, p = r !== "loading" && !t.info.pending, v = `${u}
        ${p && l ? `<button id="btn-continuar" class="big primary">${b("menu.continue")}<small>${b("menu.saved", { era: b(`era.${l.meta.era}`), y: l.meta.year, r: l.meta.rivals })}${l.meta.regras === "beta" ? ` · ${b("regras.salvo")}` : ""}</small><small class="where">${f}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${p && l ? "" : " primary"}">${b("menu.new")}</button>
        ${this.amigoOn && r !== "off" ? `<button id="btn-entrar-amigo" class="big">${Mt("amigo")}<span>${b("amigo.entrar")}</span></button>` : ""}
        ${this.onlineOn && r !== "off" ? `<button id="btn-jogar-online" class="big">${Mt("online")}<span>${b("online.jogar")}</span></button>` : ""}`, y = `<p class="acct-k">${b("online.jogar")}</p>
        ${c ? `<p class="acct-s">${b("online.jogar.d")}</p>
          <button id="btn-criar-partida" class="big primary"${this.partidaBusy ? " disabled" : ""}>${Mt("online")}<span>${b("online.criar")}</span></button>
          <p class="acct-l">${b("online.digite")}</p>
          <input id="codigo-partida" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${b("online.digite")}" value="${re(this.codigoPartida)}">
          <button id="btn-entrar-partida" class="big"${this.partidaBusy || !ta.test(this.codigoPartida) ? " disabled" : ""}>${b("online.entrarBtn")}</button>
          <p class="acct-s" id="partida-msg" aria-live="polite">${re(this.partidaMsg)}</p>` : `<p class="acct-l">${b("online.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`, k = `<p class="acct-k">${b("amigo.entrar")}</p>
        ${c ? `<p class="acct-l">${b("amigo.digite")}</p>
          <input id="codigo-amigo" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${b("amigo.codigoCampo")}" value="${re(this.codigo)}">
          <button id="btn-entrar-codigo" class="big primary"${this.amigoBusy || !ta.test(this.codigo) ? " disabled" : ""}>${b("amigo.entrarBtn")}</button>
          <p class="acct-s" id="amigo-msg" aria-live="polite">${re(this.amigoMsg)}</p>` : `<p class="acct-l">${b("amigo.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`, x = `${r === "off" ? "" : `<p class="muted small">${c ? b("new.inAccount", { name: h(c) }) : b("new.deviceOnly")}${l && !l.adopt ? " " + b("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${b("menu.rivals")}</div><div class="seg">${[1, 2, 3].map((z) => `<button data-rivais="${z}" aria-pressed="${this.rivals === z}">${z}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map((z) => `<button data-dificuldade="${z}" aria-pressed="${this.diff === z}">${b(`diff.${z}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("regras.label")}</div><div class="seg">${["normal", "beta"].map((z) => `<button data-regras="${z}" aria-pressed="${this.regras === z}" title="${b("regras.segure")}">${b(`regras.${z}`)}</button>`).join("")}</div></div>
        <p class="muted small regras-dica">${b("regras.segure")}</p>
        <div class="regras-tip" id="regras-tip" aria-live="polite"${this.dicaRegras ? "" : " hidden"}>${this.dicaRegras ? this.textoRegras(this.dicaRegras) : ""}</div>
        <button id="btn-comecar" class="big primary">${b("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`;
      a.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${b("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? v : t.step === "amigo" ? k : t.step === "online" ? y : x}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${b(tt.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(tt.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${tt.opts.muted}">${Mt(tt.opts.muted ? "mute" : "sound")}</button><span class="credits">${b("menu.credits")}</span></div>
        ${r === "off" ? `<p class="local">${b("menu.local")}</p>` : ""}</div>`;
    } else if (t.k === "pause")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("pause.title")}</h2><p class="muted">${b("pause.time", { m: t.minutes })}${t.beta ? ` · ${b("regras.naPartida")}` : ""}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <button id="btn-salvar" class="big">${b("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${b({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${re(t.owner)}</b>` })}</p>` : ""}
        ${this.pauseFriend(t.acc)}
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${ms.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair">${b("pause.quit")}</button></div>
      </div></div>`;
    else if (t.k === "guest")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("amigo.titulo", { name: re(t.nome) })}</h2><p class="muted">${b("amigo.noJogoDe", { name: `<b>${re(t.nome)}</b>` })}</p>
        ${t.papel ? `<p class="papel-guest">${b("papel.seuPapel", { papel: `<b>${b(`papel.${t.papel}`)}</b>` })}<br><small>${b(`papel.${t.papel}.d`)}</small></p>` : ""}
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${ms.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair-amigo">${b("amigo.sair")}</button></div>
      </div></div>`;
    else if (t.k === "lobby") {
      const r = t.sala, l = r.eu === r.criador, d = r.vagas.filter(Boolean).length, c = r.vagas[r.criador] ?? "", h = [1, 2, 3, 4].map((u) => `<button data-modo="${u}" aria-pressed="${r.modo === u}">${b(`modo.${u}`)}</button>`).join(""), f = [0, 1, 2].map((u) => `<button data-dif-partida="${u}" aria-pressed="${r.dif === u}">${b(`diff.${u}`)}</button>`).join("");
      a.innerHTML = `<div class="screen lobby"><div class="card panel">
        <h2>${b("sala.titulo")}</h2>
        <div class="acct on convite"><p class="acct-k">${b("sala.codigo")}</p><p class="codigo" aria-label="${re(r.codigo.split("").join(" "))}">${re(r.codigo)}</p><p class="acct-s">${b("sala.instrucoes")}</p></div>
        ${l ? `<div class="opt"><div class="opt-l">${b("sala.modo")}</div><div class="seg modos">${h}</div></div>
          <div class="opt"><div class="opt-l">${b("sala.dif")}</div><div class="seg">${f}</div></div>` : `<p class="acct-l">${b(`modo.${r.modo}`)} · ${b("sala.dif")}: ${b(`diff.${r.dif}`)}</p>`}
        <p class="muted small">${b(`modo.${r.modo}.d`)}</p>
        ${this.vagas(r, l)}
        ${l ? `<p class="muted small">${b("sala.trocar")}</p><button id="btn-comecar-partida" class="big primary"${d < 2 ? " disabled" : ""}>${b("sala.comecar")}</button>${d < 2 ? `<p class="muted small">${b("sala.precisa")}</p>` : ""}` : `<p class="acct-l">${b("sala.esperando", { name: `<b>${re(c)}</b>` })}</p>`}
        <p class="acct-s" id="partida-msg" aria-live="polite">${re(this.partidaMsg)}</p>
        <button id="btn-sair-sala" class="link">${b("sala.sair")}</button>
      </div></div>`;
    } else if (t.k === "online")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("online.titulo")}</h2><p class="muted">${b(t.anfitriao ? "online.pausadoTodos" : "online.naoPausa")}</p>
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${ms.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${b(`q.${r.key}`)}</button>`).join("")}</div></div>
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
        <h2>${re(t.titulo)}</h2><p>${re(t.texto)}</p>
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
    const s = (r, l) => a.querySelectorAll(r).forEach((d) => d.onclick = () => l(d)), o = () => {
      try {
        localStorage.setItem(a0, JSON.stringify({ rivals: this.rivals, diff: this.diff, regras: this.regras }));
      } catch {
      }
    };
    s("#btn-idioma-en", () => Kr("en")), s("#btn-idioma-pt", () => Kr("pt")), s("#btn-continuar", () => this.act.cont()), s("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), s("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.dicaRegras = null, this.render());
    }), s("[data-rivais]", (r) => {
      this.rivals = Number(r.dataset.rivais), o(), this.render();
    }), s("[data-dificuldade]", (r) => {
      this.diff = Number(r.dataset.dificuldade), o(), this.render();
    }), s("#btn-comecar", () => {
      this.dicaRegras = null, this.act.start(this.rivals, this.diff, this.regras);
    }), this.segurarRegras(o), s("#btn-voltar-jogo", () => this.act.resume()), s("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const r = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = r, this.render());
    }), s("#btn-entrar-conta", () => this.act.login()), s("#btn-entrar-conta-pausa", () => this.act.loginPause()), s("#btn-perfil-conta-pausa", () => this.act.profile()), s("#btn-perfil-conta", () => this.act.profile()), s("[data-qualidade]", (r) => {
      const l = ms.findIndex((d) => d.key === r.dataset.qualidade);
      l >= 0 && (this.screen?.k === "pause" || this.screen?.k === "guest" || this.screen?.k === "online") && (this.screen.quality = l, this.act.quality(l), this.render());
    }), s("#btn-entrar-amigo", () => {
      this.screen?.k === "start" && (this.screen.step = "amigo", this.amigoMsg = "", this.amigoBusy = !1, this.render());
    }), s("#btn-entrar-codigo", () => {
      ta.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
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
      ta.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    }), s("[data-modo]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(Number(r.dataset.modo), this.screen.sala.dif);
    }), s("[data-dif-partida]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(this.screen.sala.modo, Number(r.dataset.difPartida));
    }), s("[data-vaga]", (r) => {
      if (this.screen?.k !== "lobby" || this.screen.sala.eu !== this.screen.sala.criador) return;
      const l = Number(r.dataset.vaga), d = this.vagaEscolhida;
      if (d < 0) {
        this.vagaEscolhida = l, this.render();
        return;
      }
      if (this.vagaEscolhida = -1, d === l) {
        this.render();
        return;
      }
      this.act.trocarVagas(d, l);
    }), s("#btn-comecar-partida", () => this.act.comecarPartida()), s("#btn-sair-sala", () => this.act.sairPartida()), s("#btn-sair-partida", () => this.act.sairPartida()), s("#btn-olhar-partida", () => this.act.olharPartida());
    const i = a.querySelector("#codigo-partida");
    i && (i.oninput = () => {
      const r = e0(i.value);
      i.value !== r && (i.value = r), this.codigoPartida = r, this.setPartidaMsg(this.partidaBusy ? this.partidaMsg : "", this.partidaBusy);
    }, i.onkeydown = (r) => {
      r.key === "Enter" && ta.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    });
    const n = a.querySelector("#codigo-amigo");
    n && (n.oninput = () => {
      const r = e0(n.value);
      n.value !== r && (n.value = r), this.codigo = r, this.setAmigoMsg(this.amigoBusy ? this.amigoMsg : "", this.amigoBusy);
    }, n.onkeydown = (r) => {
      r.key === "Enter" && ta.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }, this.amigoBusy || setTimeout(() => n.focus({ preventScroll: !0 }), 50)), s("#btn-ajuda-pausa", () => this.act.help()), s("#btn-som-inicio", () => {
      tt.toggleMute(), this.render();
    }), s("[data-musica]", (r) => {
      tt.setOpts({ music: Number(r.dataset.musica), muted: !1 }), this.render();
    }), s("[data-efeitos]", (r) => {
      tt.setOpts({ sfx: Number(r.dataset.efeitos), muted: !1 }), this.render();
    }), s("[data-ambiente]", (r) => {
      tt.setOpts({ amb: Number(r.dataset.ambiente), muted: !1 }), this.render();
    }), s("#btn-sair", () => this.act.quit()), s("#btn-fim-menu", () => this.act.toMenu()), s("#btn-continuar-olhando", () => this.act.watch()), a.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function ef(e, t, a, s) {
  const o = a.filter((c) => e.isUnit(c) && e.owner[c] === t), i = o.filter((c) => e.kind[c] === mt.villager), n = o.filter((c) => e.kind[c] !== mt.villager), r = Math.round(s.x * 256), l = Math.round(s.z * 256), d = (c) => c.length ? [{ type: "move", player: t, ids: c, x: r, z: l }] : [];
  if (s.kind === "tile" && i.length) return { cmds: [{ type: "gather", player: t, ids: i, k: s.k }, ...d(n)], ping: "work" };
  if (s.kind === "building" && e.alive[s.e]) {
    const c = s.e;
    return e.owner[c] === t ? { cmds: [...i.length ? [{ type: "work", player: t, ids: i, target: c }] : [], ...d(n)], ping: i.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: o, target: c }], ping: "attack" };
  }
  if (s.kind === "unit" && e.alive[s.e]) {
    const c = s.e;
    if (e.kind[c] === Tt) return { cmds: [...i.length ? [{ type: "work", player: t, ids: i, target: c }] : [], ...d(n)], ping: i.length ? "work" : "move" };
    if (e.owner[c] !== t && (e.owner[c] === Rt || e.hostile(t, e.owner[c]))) return { cmds: [{ type: "attack", player: t, ids: o, target: c }], ping: "attack" };
  }
  return { cmds: d(o), ping: "move" };
}
const af = (e, t) => {
  for (const a of t) if (e.isUnit(a) && e.kind[a] === mt.villager) return !0;
  return !1;
}, Tl = 2, $l = [
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
], s0 = /* @__PURE__ */ new WeakMap();
function sf(e) {
  let t = s0.get(e);
  if (t) return t;
  const a = E0(e.map.seed, e.players.length, e.map.versao), s = a.size * a.size, o = new Uint8Array(s), i = new Int32Array(s);
  for (let n = 0; n < s; n++) a.tree[n] && (i[n] = a.wood[n] * 100);
  for (const n of a.res) {
    const r = n.z * a.size + n.x;
    o[r] = n.kind, i[r] = n.amount * 100;
  }
  return t = { tree: a.tree, kind: o, amt: i }, s0.set(e, t), t;
}
function of(e) {
  const t = [];
  let a = 0, s = 0;
  for (let o = 0; o < e.length; o++) {
    const i = e[o] ? 1 : 0;
    i === a ? s++ : (t.push(s), a = i, s = 1);
  }
  return t.push(s), t;
}
function o0(e, t) {
  let a = 0, s = 0;
  for (const o of e)
    s && t.fill(1, a, a + o), a += o, s ^= 1;
}
function In(e) {
  const t = sf(e), a = e.size, s = e.top, o = {};
  for (const c of $l) o[c] = Array.from(e[c].subarray(0, s));
  const i = [];
  for (let c = 0; c < s; c++) e.alive[c] && e.queue[c].length && i.push([c, e.queue[c].slice()]);
  const n = [], r = [], l = [];
  for (let c = 0; c < a * a; c++)
    t.tree[c] && !e.map.tree[c] && n.push(c), e.resAmt[c] !== t.amt[c] && r.push(c, e.resAmt[c]), e.resKind[c] !== t.kind[c] && l.push(c, e.resKind[c]);
  const d = e.players.find((c) => !c.ai) ?? e.players[0];
  return {
    v: Tl,
    mapa: e.map.versao,
    seed: e.map.seed,
    players: e.players.length,
    humans: e.players.filter((c) => !c.ai).length,
    difficulty: e.difficulty,
    tick: e.tick,
    rng: e.rng.save(),
    top: s,
    ent: o,
    queue: i,
    P: e.players.map((c) => ({ res: { ...c.res }, era: c.era, aging: c.aging, agingB: c.agingB, hunger: c.hunger, defeated: c.defeated, lastAlert: c.lastAlert, ai: c.ai, tech: c.tech, fundada: c.fundada })),
    ai: e.ai.map((c) => JSON.parse(JSON.stringify(c))),
    barbNext: e.barbNext,
    barbWarned: e.barbWarned,
    outcome: e.outcome,
    ...e.times ? { times: e.times.slice(), vencedor: e.vencedor } : {},
    ...e.beta ? { regras: "beta" } : {},
    cut: n,
    amt: r,
    kindDiff: l,
    explored: e.explored.map(of),
    projectiles: e.projectiles.map((c) => ({ ...c })),
    meta: { era: d.era, year: e.year, rivals: e.players.filter((c) => c.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600), ...e.beta ? { regras: "beta" } : {} }
  };
}
function Ps(e) {
  if (!e || e.v !== 1 && e.v !== Tl) throw new Error("save version");
  const t = e.v === 1 ? 1 : e.mapa;
  if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > zn) throw new Error("save version");
  const a = Array.isArray(e.times) && e.times.length === e.players && e.times.every((n) => Number.isInteger(n) && n >= 0 && n < 8) ? e.times : void 0, s = new $n(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty, mapa: t, times: a, regras: T0(e.regras) }), o = s.size, i = o * o;
  for (const n of $l) {
    const r = s[n];
    r.fill(n === "ignoreT" || n === "dropB" || n === "tgt" || n === "alvo2" ? -1 : 0), e.ent[n] && r.set(e.ent[n]);
  }
  s.top = e.top;
  for (let n = 0; n < ht; n++)
    s.queue[n] = [], s.field[n] = null, s.path[n] = null;
  for (const [n, r] of e.queue) s.queue[n] = r.slice();
  if (s.px.set(s.x), s.pz.set(s.z), !e.ent.foodMode)
    for (let n = 0; n < e.top; n++) s.alive[n] && s.kind[n] === ut + wt.center && (s.hp[n] = Math.min(lt[wt.center].hp, s.hp[n] * 2));
  for (const n of e.cut)
    s.map.tree[n] = 0, s.map.wood[n] = 0;
  for (let n = 0; n < e.amt.length; n += 2) s.resAmt[e.amt[n]] = e.amt[n + 1];
  for (let n = 0; n < e.kindDiff.length; n += 2) s.resKind[e.kindDiff[n]] = e.kindDiff[n + 1];
  for (let n = 0; n < i; n++) s.resKind[n] === xe && s.resAmt[n] <= 0 && (s.resKind[n] = 0, s.resAmt[n] = 0);
  for (let n = 0; n < i; n++) !s.map.tree[n] && !s.resKind[n] && (s.resAmt[n] = 0);
  s.bAt.fill(0);
  for (let n = 0; n < i; n++) s.blocked[n] = zs(s.map.terrain[n]) || s.map.tree[n] || s.resKind[n] ? 1 : 0;
  for (let n = 0; n < s.top; n++) if (s.alive[n] && s.kind[n] >= ut) {
    const [r, l, d] = s.footprint(n), c = lt[s.kind[n] - ut];
    for (let h = 0; h < d; h++) for (let f = 0; f < d; f++) {
      const u = (l + h) * o + r + f;
      s.bAt[u] = n + 1, !c.walk && !c.wall && (s.blocked[u] = 1);
    }
  }
  s.refazBloqueios(), e.explored.forEach((n, r) => {
    s.explored[r].fill(0), o0(n, s.explored[r]);
  }), e.P.forEach((n, r) => {
    const l = s.players[r];
    Object.assign(l.res, n.res), l.era = n.era, l.aging = n.aging, l.agingB = n.agingB, l.hunger = n.hunger, l.defeated = n.defeated, l.lastAlert = n.lastAlert, l.ai = n.ai, l.tech = n.tech ?? 0, l.fundada = Number.isInteger(n.fundada) ? n.fundada : -1;
  }), s.ai = e.ai.map((n) => JSON.parse(JSON.stringify(n))), s.barbNext = e.barbNext, s.barbWarned = e.barbWarned, s.outcome = e.outcome, a && Number.isInteger(e.vencedor) && (s.vencedor = e.vencedor), s.tick = e.tick, s.rng.load(e.rng), s.projectiles = e.projectiles.map((n) => ({ ...n })), s.events.length = 0;
  for (let n = 0; n < s.top; n++) s.alive[n] && s.state[n] === ce && (s.task[n] === _t ? s.goPoint(n, s.slotX[n], s.slotZ[n]) : s.state[n] = Lt);
  return s.updateFog(), e.explored.forEach((n, r) => {
    s.explored[r].fill(0), o0(n, s.explored[r]);
  }), s;
}
const i0 = "origines_save_v1", ai = "origines_save_meta_v1", os = (e) => e ? `${i0}@${e}` : i0, Js = (e) => e ? `${ai}@${e}` : ai;
function Sl(e, t) {
  try {
    return localStorage.setItem(os(t), JSON.stringify(e)), localStorage.setItem(Js(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function n0(e, t) {
  const a = In(e);
  return a.meta.savedAt = Date.now(), { d: a, ok: Sl(a, t) };
}
function nf(e, t) {
  Sl(e, t);
}
function Us(e) {
  try {
    const t = localStorage.getItem(Js(e));
    return t && localStorage.getItem(os(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function rf(e) {
  try {
    const t = localStorage.getItem(os(e));
    return t ? Ps(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function qn(e) {
  try {
    localStorage.removeItem(os(e)), localStorage.removeItem(Js(e));
  } catch {
  }
}
function On(e, t) {
  if (e !== t)
    try {
      const a = localStorage.getItem(os(e)), s = localStorage.getItem(Js(e));
      if (!a || !s) return;
      localStorage.setItem(os(t), a), localStorage.setItem(Js(t), s), qn(e);
    } catch {
    }
}
function lf(e) {
  try {
    const t = localStorage.getItem(os(e));
    if (!t) return null;
    const a = JSON.parse(t);
    return { seed: a.seed, tick: a.tick };
  } catch {
    return null;
  }
}
const Cl = "origines_save_contas_v1", cf = () => {
  try {
    return localStorage.getItem(Cl) === "1";
  } catch {
    return !0;
  }
}, df = () => {
  try {
    localStorage.setItem(Cl, "1");
  } catch {
  }
};
function hf() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const a = localStorage.key(t);
      if (!a || !a.startsWith(ai + "@")) continue;
      const s = a.slice(ai.length + 1), o = Us(s);
      o && e.push({ dono: s, meta: o });
    }
  } catch {
  }
  return e.sort((t, a) => (a.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const wn = "/api/origines/save", Pl = !location.pathname.startsWith("/jogar/");
let Ee = null, ga = null, El = Pl;
const Il = [], Zs = () => Il.forEach((e) => e()), pi = () => El ? !Ee || !ga ? "off" : ga : "loading", uf = (e) => {
  Il.push(e);
}, is = () => !!ga?.logado, ba = () => ga?.logado ? ga.apelido ?? "" : "";
async function ff() {
  if (!Pl) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, a) => {
        const s = document.createElement("script");
        s.src = "/conta.js?v=2", s.onload = () => t(), s.onerror = () => a(new Error("conta")), document.head.appendChild(s);
      }), Ee = e.QGConta ?? null, Ee && (ga = await Ee.me(), Ee.aoMudar((t) => {
        ga = t, Zs();
      }));
    } catch {
      Ee = null, ga = null;
    }
    El = !0, Zs();
  }
}
async function Oa() {
  if (!Ee) return;
  const e = ba();
  try {
    const t = await Ee.me();
    t && (ga = t);
  } catch {
  }
  ba() !== e && Zs();
}
const r0 = async () => {
  Ee && (await Ee.entrar(), await Oa(), Zs());
};
async function pf() {
  Ee && (await Ee.perfil(), await Oa(), is() || (await Ee.entrar({ aba: "entrar" }), await Oa()), Zs());
}
async function mf() {
  if (!is()) return null;
  try {
    const e = await fetch(wn, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function ql() {
  if (!is()) return null;
  try {
    const e = await fetch(`${wn}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const Ol = (e, t = !1) => fetch(wn, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function l0(e, t, a = !1) {
  if (a || await Oa(), !is()) return "none";
  if (!t || ba() !== t) return "other";
  try {
    const s = { dados: e };
    return a && JSON.stringify(s).length > 6e4 && (a = !1), (await Ol(s, a)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function gf(e) {
  if (await Oa(), !(!e || ba() !== e))
    try {
      await Ol({ apagar: !0 });
    } catch {
    }
}
const bf = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), wl = ["move", "amove", "gather", "work", "attack", "build", "train", "cancel", "ageup", "rally", "stop", "food", "research", "trade", "wall", "ia", "road", "disband"], ja = 400, vf = Ve, yf = 600, Ns = (e) => typeof e == "number" && Number.isInteger(e) && Math.abs(e) <= 2 ** 32;
function cn(e) {
  const t = [wl.indexOf(e.type), e.player], a = (s) => {
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
      a(e.ids), t.push(wt[e.key], e.tx, e.tz);
      break;
    case "train":
      t.push(e.building, mt[e.key]);
      break;
    case "cancel":
    case "ageup":
      t.push(e.building);
      break;
    case "rally":
      t.push(e.building, e.x, e.z);
      break;
    case "stop":
    case "disband":
      a(e.ids);
      break;
    case "food":
      a(e.ids), t.push(e.on ? 1 : 0);
      break;
    case "research":
      t.push(e.building, Go[e.key]);
      break;
    case "trade":
      t.push(e.building, Qa.indexOf(e.give), Qa.indexOf(e.get));
      break;
    case "wall":
    case "road":
      a(e.ids), a(e.tiles);
      break;
  }
  return t;
}
function Rl(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > yf || !e.every(Ns)) return null;
  const t = e;
  let a = 2, s = !0;
  const o = () => a >= t.length ? (s = !1, 0) : t[a++], i = (c) => {
    const h = o();
    if (h < 0 || h > c || a + h > t.length)
      return s = !1, [];
    const f = t.slice(a, a + h);
    return a += h, f;
  }, n = (c, h) => {
    const f = c[h];
    return f || (s = !1), f?.key ?? "";
  }, r = wl[t[0]], l = t[1];
  let d = null;
  switch (r) {
    case "move":
    case "amove": {
      const c = i(ja);
      d = { type: r, player: l, ids: c, x: o(), z: o() };
      break;
    }
    case "gather": {
      const c = i(ja);
      d = { type: "gather", player: l, ids: c, k: o() };
      break;
    }
    case "work":
    case "attack": {
      const c = i(ja);
      d = { type: r, player: l, ids: c, target: o() };
      break;
    }
    case "build": {
      const c = i(ja);
      d = { type: "build", player: l, ids: c, key: n(lt, o()), tx: o(), tz: o() };
      break;
    }
    case "train": {
      const c = o();
      d = { type: "train", player: l, building: c, key: n(X, o()) };
      break;
    }
    case "cancel":
    case "ageup":
      d = { type: r, player: l, building: o() };
      break;
    case "rally":
      d = { type: "rally", player: l, building: o(), x: o(), z: o() };
      break;
    case "stop":
    case "disband":
      d = { type: r, player: l, ids: i(ja) };
      break;
    case "food": {
      const c = i(ja), h = o();
      h !== 0 && h !== 1 && (s = !1), d = { type: "food", player: l, ids: c, on: h === 1 };
      break;
    }
    case "research": {
      const c = o();
      d = { type: "research", player: l, building: c, key: n(Ca, o()) };
      break;
    }
    case "trade": {
      const c = o(), h = Qa[o()], f = Qa[o()];
      (!h || !f) && (s = !1), d = { type: "trade", player: l, building: c, give: h, get: f };
      break;
    }
    case "wall":
    case "road": {
      const c = i(ja);
      d = { type: r, player: l, ids: c, tiles: i(vf) };
      break;
    }
    case "ia":
      d = { type: "ia", player: l };
      break;
    default:
      return null;
  }
  return s && a === t.length ? d : null;
}
class Bl {
  constructor() {
    g(this, "ordens", []);
    g(this, "marcas", []);
    g(this, "avisado", 0);
  }
  /** começa (ou recomeça, depois de mandar o jogo ao amigo) a partir deste mundo */
  ligar(t) {
    this.ordens = [], this.marcas = [], this.avisado = t.tick, t.onApplied = (a, s) => {
      for (const o of s) this.ordens.push([a, ...cn(o)]);
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
  ordemDoAmigo(t, a, s, o) {
    let i = Rl(a);
    return !i || i.type === "ia" || (i.player = s, o && (i = o(i), !i)) ? null : (t.issue(i, !0), i);
  }
}
class Dl {
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
    if (!Array.isArray(a) || a.length !== 3 || !Ns(a[0]) || !Array.isArray(a[1]) || !Array.isArray(a[2])) return !1;
    const [s, o, i] = a;
    if (s < this.ate) return !1;
    for (const n of i) {
      if (!Array.isArray(n) || !Ns(n[0]) || n[0] < t.tick) continue;
      const r = Rl(n.slice(1));
      r && t.schedule(r, n[0]);
    }
    for (const n of o) Array.isArray(n) && Ns(n[0]) && Ns(n[1]) && this.marcas.set(n[0], n[1]);
    return this.ate = s, !0;
  }
  /** depois de cada passo: confere a impressão digital, se o anfitrião mandou uma para este passo */
  depoisDoPasso(t) {
    const a = this.marcas.get(t.tick);
    a !== void 0 && (this.marcas.delete(t.tick), a !== t.hash() && (this.divergiu = !0));
  }
}
const Nl = new URLSearchParams(location.search), Fl = (Nl.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`) + "/partida", Ll = Fl.replace(/^ws/, "http"), xf = !location.pathname.startsWith("/jogar/") && !Nl.get("online"), Pe = (e, t = 0) => typeof e == "number" && Number.isInteger(e) ? e : t, Oi = (e) => Array.isArray(e) ? e.filter((t) => typeof t == "number" && Number.isInteger(t)) : [], c0 = (e) => Array.isArray(e) ? e.slice(0, 4).map((t) => typeof t == "string" ? t.slice(0, 40) : "") : [];
let kf = null;
function Mf() {
  return xf ? Promise.resolve(!1) : kf ?? (kf = fetch(Ll + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class Qs {
  constructor(t, a) {
    g(this, "codigo", "");
    g(this, "ws", null);
    g(this, "fechado", !1);
    g(this, "caiuEm", 0);
    this.criar = t, this.on = a;
  }
  /** quem cria: pede um código ao servidor e entra na sala */
  static async nova(t) {
    const a = await fetch(Ll + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!ta.test(s)) throw new Error("rede");
    const o = new Qs(!0, t);
    return o.codigo = s, o.abrir(), o;
  }
  /** quem entra com o código */
  static entrar(t, a) {
    const s = new Qs(!1, a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${Fl}/sala/${this.codigo}?modo=${this.criar ? "criar" : "entrar"}&v=${Xs}`);
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
        this.on({ t: "sala", sala: { codigo: this.codigo, modo: Pe(a.modo, 1), dif: Pe(a.dif, 1), vagas: c0(a.vagas), criador: Pe(a.criador), eu: Pe(a.eu, -1) } });
        break;
      case "comeca":
        this.on({ t: "comeca", c: { semente: Pe(a.semente), modo: Pe(a.modo, 1), dif: Pe(a.dif, 1), vagas: c0(a.vagas), eu: Pe(a.eu, -1), anf: Pe(a.anf), fora: Oi(a.fora), volta: a.volta === !0 } });
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
        this.on({ t: "ordem", v: Pe(a.v, -1), d: a.d });
        break;
      case "r":
        this.on({ t: "pede", v: Pe(a.v, -1) });
        break;
      case "sinal": {
        const s = Oi(a.d);
        s.length === 4 && this.on({ t: "sinal", v: s[0], tipo: s[1], x: s[2], z: s[3] });
        break;
      }
      case "caiu":
      case "voltou":
      case "saiu":
        this.on({ t: a.t, v: Pe(a.v, -1) });
        break;
      case "anfitriao":
        this.on({ t: "anfitriao", v: Pe(a.v, -1), fora: Oi(a.fora) });
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
    this.enviar(`{"t":"s","v":${Xs},"d":${t}}`);
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
const d0 = /* @__PURE__ */ new WeakMap();
function Rn(e) {
  let t = d0.get(e);
  if (!t) {
    const a = e.sampleRate * 2, s = e.createBuffer(1, a, e.sampleRate), o = s.getChannelData(0);
    let i = 22222;
    for (let n = 0; n < a; n++)
      i = i * 16807 % 2147483647, o[n] = i / 10737418235e-1 - 1;
    t = { noise: s, pluck: /* @__PURE__ */ new Map() }, d0.set(e, t);
  }
  return t;
}
function Sa(e, t, a) {
  const s = e.createBufferSource();
  return s.buffer = Rn(e).noise, s.loop = !0, s.start(t, t * 7.31 % 1.5), s.stop(t + a + 0.05), s;
}
function Ft(e, t, a, s, o, i = 0) {
  const n = e.createGain(), r = Math.max(2e-4, a);
  return n.gain.value = 1e-4, n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + s), i && n.gain.setValueAtTime(r, t + s + i), n.gain.exponentialRampToValueAtTime(1e-4, t + s + i + o), n;
}
function ee(e, t, a, s = 1) {
  const o = e.createBiquadFilter();
  return o.type = t, o.frequency.value = a, o.Q.value = s, o;
}
function jt(e, t, a, s, o) {
  const i = e.createOscillator();
  return i.type = t, i.frequency.setValueAtTime(a, s), i.start(s), i.stop(s + o + 0.05), i;
}
function $t(...e) {
  for (let t = 0; t < e.length - 1; t++) e[t].connect(e[t + 1]);
  return e[e.length - 1];
}
function At(e, t, a, s, o, i, n, r, l = 4e-3) {
  const d = jt(e, s, o, a, n);
  d.frequency.exponentialRampToValueAtTime(Math.max(20, i), a + n), $t(d, Ft(e, a, r, l, n), t);
}
function gt(e, t, a, s, o, i, n, r, l = 3e-3) {
  $t(Sa(e, a, n + l), ee(e, s, o, i), Ft(e, a, r, l, n), t);
}
function Eo(e, t, a, s, o) {
  const i = Sa(e, a, o.dur), n = ee(e, "bandpass", o.f, 3), r = e.createGain(), l = jt(e, "sine", o.lfo[0], a, o.dur), d = e.createGain();
  return l.frequency.linearRampToValueAtTime(o.lfo[1], a + o.dur * 0.9), d.gain.value = 0.5, r.gain.value = 0.5, l.connect(d).connect(r.gain), $t(i, n, r, Ft(e, a, 0.1 * s, o.dur * 0.22, o.dur * 0.73), t), gt(e, t, a + o.snapAt, "bandpass", o.snapF, 2, 0.03, (o.snap ?? 0.08) * s), Math.max(o.dur, o.snapAt + 0.06);
}
function Te(e, t, a, s, o, i = [1, 2.4, 3.6, 5.1], n = 1.6) {
  i.forEach((r, l) => $t(jt(e, "sine", s * r, a, n), Ft(e, a, o / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function zf(e, t, a, s, o, i) {
  const n = jt(e, "sine", s, a, i), r = jt(e, "sine", s * 1.4, a, i), l = e.createGain();
  l.gain.setValueAtTime(s * 1.6, a), l.gain.exponentialRampToValueAtTime(s * 0.1, a + i), r.connect(l).connect(n.frequency), $t(n, Ft(e, a, o, 2e-3, i), t);
  for (const [d, c] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const h of [1, 1.007]) $t(jt(e, "sine", s * d * h, a, i * 0.7), Ft(e, a, o * c * 0.5, 2e-3, i * (0.7 - d * 0.04)), t);
}
function jl(e, t) {
  const a = Math.round(t * 10), s = Rn(e);
  let o = s.pluck.get(a);
  if (o) return o;
  const i = e.sampleRate, n = Math.floor(i * 1.8), r = Math.max(2, Math.round(i / t));
  o = e.createBuffer(1, n, i);
  const l = o.getChannelData(0), d = new Float32Array(r);
  let c = a * 7 + 1;
  for (let h = 0; h < r; h++)
    c = c * 16807 % 2147483647, d[h] = (c / 10737418235e-1 - 1) * 0.6;
  for (let h = 0, f = 0; h < n; h++) {
    const u = d[f], p = d[(f + 1) % r];
    d[f] = 0.996 * 0.5 * (u + p), l[h] = u, f = (f + 1) % r;
  }
  return s.pluck.set(a, o), o;
}
function Af(e, t, a, s, o, i = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = jl(e, s), r.start(a), r.stop(a + n), $t(r, ee(e, "lowpass", i, 0.7), Ft(e, a, o, 2e-3, n), t);
}
function _e(e, t, a, s, o, i, n, r, l = "sawtooth") {
  const d = e.createOscillator();
  d.type = l, d.frequency.setValueAtTime(o[0][1], a);
  for (const [u, p] of o.slice(1)) d.frequency.linearRampToValueAtTime(p, a + u);
  const c = e.createOscillator(), h = e.createGain();
  c.frequency.value = n[0], h.gain.value = n[1], c.connect(h).connect(d.frequency), d.start(a), d.stop(a + s + 0.05), c.start(a), c.stop(a + s + 0.05);
  const f = Ft(e, a, r, Math.min(0.05, s * 0.2), s * 0.8, s * 0.1);
  for (const [u, p] of i) {
    const v = e.createGain();
    v.gain.value = p, $t(d, ee(e, "bandpass", u, 6), v, f);
  }
  f.connect(t);
}
function Io(e) {
  const t = e.createBufferSource();
  return t.buffer = Rn(e).noise, t.loop = !0, t.start(), t;
}
function dn(e, t, a, s, o) {
  const i = 3 + o % 4, n = 2600 + o * 137 % 1600;
  for (let r = 0; r < i; r++) {
    const l = a + r * (0.07 + (o + r) % 3 * 0.02), d = n * (1 + (o * (r + 3) % 7 - 3) * 0.06), c = jt(e, "sine", d, l, 0.07);
    c.frequency.exponentialRampToValueAtTime(d * (r % 2 ? 0.8 : 1.35), l + 0.06), $t(c, Ft(e, l, 0.05 * s, 0.01, 0.05), t);
  }
  return i * 0.1;
}
const Fe = {
  // interface
  "ui.click": (e, t, a, s) => (At(e, t, a, "sine", 700, 420, 0.05, 0.2 * s), gt(e, t, a, "bandpass", 2400, 2, 0.025, 0.06 * s), 0.08),
  "ui.denied": (e, t, a, s) => {
    const o = jt(e, "sine", 240, a, 0.15);
    return o.frequency.exponentialRampToValueAtTime(170, a + 0.14), $t(o, ee(e, "lowpass", 900), Ft(e, a, 0.16 * s, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, a, s) => (At(e, t, a, "triangle", 560, 480, 0.05, 0.12 * s), At(e, t, a + 0.07, "triangle", 700, 600, 0.05, 0.1 * s), 0.14),
  "sel.soldier": (e, t, a, s) => (At(e, t, a, "sine", 180, 90, 0.12, 0.24 * s), gt(e, t, a, "lowpass", 600, 1, 0.04, 0.1 * s), 0.14),
  "sel.building": (e, t, a, s) => (At(e, t, a, "sine", 300, 220, 0.08, 0.18 * s), At(e, t, a + 0.09, "sine", 300, 220, 0.08, 0.13 * s), 0.2),
  "order.move": (e, t, a, s) => (gt(e, t, a, "lowpass", 500, 1, 0.05, 0.13 * s), gt(e, t, a + 0.11, "lowpass", 450, 1, 0.05, 0.11 * s), 0.18),
  "order.work": (e, t, a, s) => (gt(e, t, a, "bandpass", 2600, 3, 0.03, 0.12 * s), At(e, t, a, "sine", 1500, 1300, 0.02, 0.05 * s), 0.05),
  "order.attack": (e, t, a, s) => (At(e, t, a, "sine", 150, 70, 0.18, 0.28 * s), gt(e, t, a, "lowpass", 800, 1, 0.05, 0.1 * s), 0.2),
  place: (e, t, a, s) => (At(e, t, a, "sine", 190, 85, 0.2, 0.3 * s), gt(e, t, a, "lowpass", 400, 1, 0.08, 0.12 * s), 0.22),
  "place.bad": (e, t, a, s) => {
    const o = jt(e, "triangle", 170, a, 0.17);
    return o.frequency.exponentialRampToValueAtTime(120, a + 0.16), $t(o, ee(e, "lowpass", 900), Ft(e, a, 0.18 * s, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, a, s) => (Te(e, t, a, 880, 0.14 * s, [1, 1.5], 0.35), 0.4),
  built: (e, t, a, s) => (At(e, t, a, "sine", 180, 100, 0.14, 0.2 * s), At(e, t, a + 0.12, "sine", 150, 90, 0.14, 0.18 * s), Te(e, t, a + 0.26, 1046, 0.09 * s, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, a, s) => (Te(e, t, a, 660, 0.15 * s, [1, 2, 2.76, 4.07], 1.6), Te(e, t, a + 0.18, 990, 0.1 * s, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, a, s) => ([880, 1108, 1320].forEach((o, i) => Te(e, t, a + i * 0.11, o, 0.09 * s, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, a, s) => {
    const o = Ft(e, a, 0.2 * s, 0.18, 0.4, 0.9), i = ee(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = jt(e, "sawtooth", n, a, 1.6), d = e.createGain();
      d.gain.value = r, $t(l, d, i);
    }
    return $t(i, o, t), 1.6;
  },
  "drums.war": (e, t, a, s) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((o, i) => {
    At(e, t, a + o, "sine", 95, 55, 0.3, (0.12 + i * 0.025) * s), gt(e, t, a + o, "lowpass", 300, 1, 0.05, 0.06 * s);
  }), 2.9),
  gong: (e, t, a, s) => (Te(e, t, a, 110, 0.22 * s, [1, 1.44, 2.05, 2.84, 3.82], 3), gt(e, t, a, "lowpass", 2e3, 1, 0.05, 0.08 * s), 3),
  winter: (e, t, a, s) => {
    const o = Sa(e, a, 1.8), i = ee(e, "lowpass", 300, 0.8);
    return i.frequency.linearRampToValueAtTime(900, a + 0.8), i.frequency.linearRampToValueAtTime(300, a + 1.7), $t(o, i, Ft(e, a, 0.1 * s, 0.5, 1.2), t), Te(e, t, a + 0.3, 520, 0.1 * s, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, a, s) => {
    for (let o = 0; o < 5; o++) dn(e, t, a + o * 0.22, s * 1.6, 3 + o * 5);
    return 1.6;
  },
  hunger: (e, t, a, s) => ($t(jt(e, "sine", 98, a, 1.1), Ft(e, a, 0.1 * s, 0.1, 0.9), t), $t(jt(e, "sine", 147, a, 1.1), Ft(e, a, 0.06 * s, 0.1, 0.9), t), 1.1),
  soft: (e, t, a, s) => (Te(e, t, a, 784, 0.07 * s, [1, 2], 0.5), 0.5),
  fair: (e, t, a, s) => {
    [587, 740, 880, 988, 880].forEach((o, i) => to(e, t, a + i * 0.14, o, 0.13, 0.1 * s));
    for (let o = 0; o < 4; o++) eo(e, t, a + o * 0.18, 0.5 * s);
    return 0.9;
  },
  // censo (eras romanas): moedas caindo na bolsa ("tlim-tlim") e o saquinho no fim
  coins: (e, t, a, s) => ([0, 0.08, 0.15, 0.25, 0.3, 0.41].forEach((o, i) => Te(e, t, a + o, [3e3, 3500, 3200, 3800, 3350, 4100][i], (0.09 - i * 8e-3) * s, [1, 1.47, 2.09], 0.22)), gt(e, t, a + 0.48, "lowpass", 600, 1, 0.07, 0.1 * s), 0.75),
  // festival romano do mês: o aulo toca uma frase de dança sobre o tímpano e o chocalho
  festa: (e, t, a, s) => {
    [[69, 0, 0.11], [74, 0.12, 0.11], [76, 0.24, 0.11], [78, 0.36, 0.11], [76, 0.48, 0.11], [74, 0.6, 0.4]].forEach(([o, i, n]) => Bn(e, t, a + i, 440 * Math.pow(2, (o - 69) / 12), n, 0.4 * s)), [[0, 0], [0.24, 1], [0.36, 1], [0.48, 0], [0.72, 1]].forEach(([o, i]) => ao(e, t, a + o, 110, (i ? 0.35 : 0.5) * s, i === 1));
    for (const o of [0.12, 0.36, 0.6, 0.84]) eo(e, t, a + o, 0.4 * s);
    return 1.2;
  },
  // trabalho
  "work.chop": (e, t, a, s) => (gt(e, t, a, "bandpass", 1100, 1.5, 0.05, 0.28 * s), At(e, t, a, "sine", 260, 170, 0.06, 0.18 * s), 0.08),
  "work.pick": (e, t, a, s) => (Te(e, t, a, 2100, 0.1 * s, [1, 1.45], 0.09), gt(e, t, a, "highpass", 3e3, 1, 0.015, 0.06 * s), 0.1),
  "work.pickMetal": (e, t, a, s) => (Te(e, t, a, 2600, 0.09 * s, [1, 1.5, 2.04], 0.2), gt(e, t, a, "highpass", 3e3, 1, 0.012, 0.05 * s), 0.2),
  "work.hoe": (e, t, a, s) => (gt(e, t, a, "lowpass", 350, 1, 0.09, 0.22 * s), At(e, t, a, "sine", 120, 80, 0.08, 0.12 * s), 0.1),
  "work.mallet": (e, t, a, s) => (At(e, t, a, "sine", 330, 240, 0.07, 0.22 * s), gt(e, t, a, "bandpass", 900, 1.5, 0.04, 0.1 * s), 0.08),
  "work.rustle": (e, t, a, s) => {
    for (const o of [0, 0.07, 0.15]) gt(e, t, a + o, "bandpass", 4e3, 1, 0.05, 0.06 * s);
    return 0.22;
  },
  "drop.wood": (e, t, a, s) => (At(e, t, a, "sine", 160, 110, 0.12, 0.2 * s), gt(e, t, a, "lowpass", 500, 1, 0.06, 0.1 * s), 0.14),
  "drop.stone": (e, t, a, s) => {
    for (let o = 0; o < 4; o++) gt(e, t, a + o * 0.035, "bandpass", 1500 + o * 200, 2, 0.03, 0.08 * s);
    return 0.18;
  },
  "drop.food": (e, t, a, s) => {
    for (const o of [0, 0.06]) gt(e, t, a + o, "bandpass", 2e3, 1, 0.06, 0.07 * s);
    return 0.14;
  },
  "drop.metal": (e, t, a, s) => (Te(e, t, a, 2600, 0.07 * s, [1, 1.5], 0.15), Te(e, t, a + 0.07, 2900, 0.06 * s, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, a, s) => {
    const o = jt(e, "sawtooth", 90, a, 0.45);
    return o.frequency.linearRampToValueAtTime(70, a + 0.45), $t(o, ee(e, "bandpass", 400, 4), Ft(e, a, 0.05 * s, 0.05, 0.4), t), gt(e, t, a + 0.4, "lowpass", 700, 1, 0.7, 0.18 * s, 0.01), At(e, t, a + 0.4, "sine", 70, 45, 0.4, 0.16 * s), 1.2;
  },
  "res.crumble": (e, t, a, s) => {
    for (let o = 0; o < 5; o++) gt(e, t, a + o * 0.09, "lowpass", 900, 1, 0.08, (0.14 - o * 0.02) * s);
    return 0.55;
  },
  puff: (e, t, a, s) => (gt(e, t, a, "lowpass", 600, 0.7, 0.3, 0.15 * s, 0.02), At(e, t, a, "sine", 150, 100, 0.12, 0.05 * s), 0.34),
  "fall.animal": (e, t, a, s) => (At(e, t, a, "sine", 95, 50, 0.25, 0.22 * s), gt(e, t, a + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * s, 0.02), 0.4),
  crash: (e, t, a, s) => {
    gt(e, t, a, "lowpass", 1200, 0.8, 1.1, 0.26 * s, 0.01);
    for (const o of [0, 0.18, 0.36]) At(e, t, a + o, "sine", 80, 45, 0.25, 0.18 * s);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, a, s) => (At(e, t, a, "sine", 320, 210, 0.07, 0.26 * s), gt(e, t, a, "bandpass", 1600, 1.5, 0.04, 0.1 * s), 0.08),
  "hit.axe": (e, t, a, s) => (gt(e, t, a, "bandpass", 1e3, 2, 0.06, 0.26 * s), At(e, t, a, "sine", 240, 160, 0.06, 0.16 * s), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, a, s) => (zf(e, t, a, 1250, 0.07 * s, 0.55), gt(e, t, a, "highpass", 4500, 0.8, 0.05, 0.09 * s), At(e, t, a, "sine", 260, 170, 0.05, 0.1 * s), 0.55),
  "hit.spear": (e, t, a, s) => {
    const o = Sa(e, a, 0.12), i = ee(e, "bandpass", 2200, 2);
    return i.frequency.exponentialRampToValueAtTime(900, a + 0.1), $t(o, i, Ft(e, a, 0.12 * s, 0.01, 0.1), t), At(e, t, a + 0.08, "sine", 400, 300, 0.03, 0.08 * s), 0.13;
  },
  "hit.wall": (e, t, a, s) => (At(e, t, a, "sine", 200, 130, 0.09, 0.24 * s), gt(e, t, a, "lowpass", 700, 1, 0.05, 0.12 * s), 0.1),
  "hit.bite": (e, t, a, s) => (gt(e, t, a, "bandpass", 1500, 2, 0.04, 0.12 * s), At(e, t, a, "sine", 500, 300, 0.05, 0.08 * s), _e(e, t, a, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * s), 0.2),
  "hit.boar": (e, t, a, s) => (_e(e, t, a, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * s), _e(e, t, a + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * s), At(e, t, a, "sine", 120, 70, 0.12, 0.12 * s), 0.25),
  "hit.aurochs": (e, t, a, s) => (At(e, t, a, "sine", 100, 55, 0.2, 0.2 * s), gt(e, t, a, "bandpass", 700, 1.5, 0.12, 0.08 * s), 0.22),
  throw: (e, t, a, s) => {
    const o = Sa(e, a, 0.36), i = ee(e, "bandpass", 500, 1.2);
    return i.frequency.exponentialRampToValueAtTime(1600, a + 0.15), i.frequency.exponentialRampToValueAtTime(700, a + 0.34), $t(o, i, Ft(e, a, 0.1 * s, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, a, s) => Eo(e, t, a, s, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, a, s) => Eo(e, t, a, s, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, a, s) => Eo(e, t, a, s, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  // escorpião (virote grosso): o zunido do arco, mais grave, com o "toc" da madeira do braço batendo
  scorpio: (e, t, a, s) => (At(e, t, a, "sine", 260, 140, 0.08, 0.05 * s), Eo(e, t, a, s, { dur: 0.42, f: 1e3, lfo: [9, 15], snapAt: 0, snapF: 1700, snap: 0.1 })),
  // balista (pedra grande): "tum" de madeira dos braços batendo na trave e o zunido grave da pedra saindo
  ballista: (e, t, a, s) => {
    At(e, t, a, "sine", 150, 70, 0.24, 0.3 * s), gt(e, t, a, "bandpass", 650, 1.5, 0.06, 0.12 * s);
    const o = Sa(e, a + 0.04, 0.6), i = ee(e, "bandpass", 350, 2);
    return i.frequency.setValueAtTime(350, a + 0.04), i.frequency.exponentialRampToValueAtTime(700, a + 0.3), i.frequency.exponentialRampToValueAtTime(400, a + 0.64), $t(o, i, Ft(e, a + 0.04, 0.08 * s, 0.14, 0.46), t), 0.7;
  },
  "arrow.hit": (e, t, a, s) => (At(e, t, a, "sine", 420, 260, 0.04, 0.16 * s), gt(e, t, a, "bandpass", 2200, 2, 0.03, 0.08 * s), 0.06),
  "spear.hit": (e, t, a, s) => (At(e, t, a, "sine", 300, 180, 0.06, 0.2 * s), gt(e, t, a, "bandpass", 1500, 2, 0.04, 0.08 * s), 0.08),
  "stone.hit": (e, t, a, s) => (gt(e, t, a, "bandpass", 2600, 4, 0.03, 0.16 * s), At(e, t, a, "sine", 950, 800, 0.02, 0.06 * s), 0.05),
  "ram.boom": (e, t, a, s) => (At(e, t, a, "sine", 72, 42, 0.55, 0.42 * s), gt(e, t, a, "lowpass", 350, 1, 0.4, 0.24 * s), gt(e, t, a + 0.02, "bandpass", 900, 2, 0.08, 0.08 * s), 0.6),
  "ram.creak": (e, t, a, s) => {
    const o = jt(e, "sawtooth", 140, a, 0.3);
    return o.frequency.linearRampToValueAtTime(120, a + 0.3), $t(o, ee(e, "bandpass", 600, 5), Ft(e, a, 0.03 * s, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, a, s) => (_e(e, t, a, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * s), 0.7),
  "animal.horse": (e, t, a, s) => (_e(e, t, a, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * s), 0.9),
  "animal.dog": (e, t, a, s) => {
    for (const o of [0, 0.16]) _e(e, t, a + o, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * s);
    return 0.28;
  },
  "animal.wolf": (e, t, a, s) => (_e(e, t, a, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * s), 0.45),
  "animal.howl": (e, t, a, s) => {
    for (const [o, i] of [[0, 1], [0.28, 0.3]]) {
      const n = jt(e, "sine", 420, a + o, 1.6);
      n.frequency.linearRampToValueAtTime(620, a + o + 0.6), n.frequency.linearRampToValueAtTime(540, a + o + 1.5), $t(n, ee(e, "lowpass", 1200), Ft(e, a + o, 0.05 * s * i, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, a, s) => (_e(e, t, a, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * s), _e(e, t, a + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * s), 0.28),
  "animal.aurochs": (e, t, a, s) => (_e(e, t, a, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * s), 1),
  "animal.deer": (e, t, a, s) => (gt(e, t, a, "bandpass", 1200, 2, 0.12, 0.07 * s), gt(e, t, a + 0.05, "bandpass", 600, 2, 0.1, 0.05 * s), 0.17),
  "animal.crow": (e, t, a, s) => {
    for (const o of [0, 0.3]) _e(e, t, a + o, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * s);
    return 0.5;
  },
  "animal.hooves": (e, t, a, s) => {
    for (const o of [0, 0.07, 0.2, 0.27])
      At(e, t, a + o, "sine", 180, 120, 0.04, 0.1 * s), gt(e, t, a + o, "lowpass", 900, 1, 0.02, 0.05 * s);
    return 0.32;
  },
  bird: (e, t, a, s) => dn(e, t, a, s, 1 + Math.floor(a * 977 % 97))
}, Tf = {
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
for (const [e, t] of Object.entries(Tf)) {
  const a = Fe[e];
  Fe[e] = (s, o, i, n) => a(s, o, i, n * t);
}
function We(e, t, a, s, o) {
  At(e, t, a, "sine", s * 1.6, s, 0.4, 0.22 * o), gt(e, t, a, "lowpass", 400, 1, 0.05, 0.08 * o);
}
function to(e, t, a, s, o, i, n = 0.22) {
  const r = Ft(e, a, 0.13 * i, 0.05, 0.14, Math.max(0, o - 0.08)), l = jt(e, "sine", s, a, o + 0.3), d = jt(e, "triangle", s * 2, a, o + 0.3), c = e.createGain();
  c.gain.value = n;
  const h = jt(e, "sine", 5, a, o + 0.3), f = e.createGain();
  f.gain.setValueAtTime(0, a), f.gain.linearRampToValueAtTime(s * 6e-3, a + 0.2), h.connect(f), f.connect(l.frequency), f.connect(d.frequency), $t(l, r), $t(d, c, r), r.connect(t), $t(Sa(e, a, o + 0.1), ee(e, "bandpass", s * 2, 8), Ft(e, a, 0.02 * i, 0.03, 0.1, Math.max(0, o - 0.05)), t);
}
function $f(e, t, a, s, o, i) {
  to(e, t, a, s, o, i * 0.9, 0.05);
}
function Sf(e, t, a, s, o) {
  Af(e, t, a, s, 0.2 * o);
}
function Cf(e, t, a, s, o) {
  $t(jt(e, "sine", s, a, 0.4), Ft(e, a, 0.12 * o, 2e-3, 0.35), t), $t(jt(e, "sine", s * 2.92, a, 0.2), Ft(e, a, 0.04 * o, 2e-3, 0.15), t), gt(e, t, a, "bandpass", 3e3, 3, 0.01, 0.03 * o);
}
function Fo(e, t, a, s, o) {
  Te(e, t, a, s, 0.08 * o, [1, 2.4, 3.6, 5.1], 2);
}
function hn(e, t, a, s, o, i) {
  const n = ee(e, "lowpass", s * 3, 0.8);
  n.frequency.linearRampToValueAtTime(s * 6, a + 0.15), n.frequency.linearRampToValueAtTime(s * 4, a + o);
  for (const r of [1, 1.004]) $t(jt(e, "sawtooth", s * r, a, o + 0.3), n);
  $t(n, Ft(e, a, 0.07 * i, 0.08, 0.2, Math.max(0, o - 0.1)), t);
}
function Pf(e, t, a, s, o, i) {
  const n = ee(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.value = 1e-4, r.gain.setValueAtTime(1e-4, a), r.gain.linearRampToValueAtTime(0.05 * i, a + 1.5), r.gain.setValueAtTime(0.05 * i, a + Math.max(1.5, o - 1.5)), r.gain.linearRampToValueAtTime(1e-4, a + o);
  for (const l of [1, 1.5]) $t(jt(e, "sawtooth", s * l, a, o), n);
  $t(n, r, t);
}
function eo(e, t, a, s) {
  gt(e, t, a, "highpass", 5e3, 1, 0.06, 0.05 * s, 5e-3);
}
function _l(e, t, a, s, o) {
  const i = [jt(e, "sawtooth", t, a, s), jt(e, "square", t, a, s)], n = e.createGain();
  n.gain.value = 0.35;
  const r = ee(e, "lowpass", Math.min(3e3, o), 0.5), l = ee(e, "peaking", 1200, 1.2);
  return l.gain.value = 6, i[0].connect(r), $t(i[1], n, r), r.connect(l), { o: i, out: l };
}
function Bn(e, t, a, s, o, i) {
  const n = _l(e, s, a, o + 0.3, s * 6), r = jt(e, "sine", 5.5, a, o + 0.3), l = e.createGain();
  for (const d of n.o)
    d.frequency.setValueAtTime(s * 0.97, a), d.frequency.exponentialRampToValueAtTime(s, a + 0.05);
  l.gain.setValueAtTime(0, a), l.gain.linearRampToValueAtTime(s * 5e-3, a + 0.4), r.connect(l);
  for (const d of n.o) l.connect(d.frequency);
  $t(n.out, Ft(e, a, 0.085 * i, 0.03, 0.12, Math.max(0, o - 0.05)), t), $t(Sa(e, a, 0.1), ee(e, "bandpass", Math.min(4e3, s * 4), 3), Ft(e, a, 0.012 * i, 8e-3, 0.07), t);
}
function Ul(e, t, a, s, o, i) {
  const n = _l(e, s, a, o, s * 4), r = e.createGain(), l = Math.min(0.6, o / 3);
  r.gain.value = 1e-4, r.gain.setValueAtTime(1e-4, a), r.gain.linearRampToValueAtTime(0.035 * i, a + l), r.gain.setValueAtTime(0.035 * i, a + o - l), r.gain.linearRampToValueAtTime(1e-4, a + o), $t(n.out, r, t);
}
function wi(e, t, a, s) {
  const o = e.createGain(), i = Math.max(2e-4, a);
  return o.gain.value = 1e-4, o.gain.setValueAtTime(1e-4, t), o.gain.exponentialRampToValueAtTime(i, t + 3e-3), o.gain.exponentialRampToValueAtTime(i * 0.3, t + s * 0.4), o.gain.exponentialRampToValueAtTime(1e-4, t + s), o;
}
function Hl(e, t, a, s, o) {
  const i = e.createBufferSource();
  i.buffer = jl(e, s), i.start(a), i.stop(a + 1.8), $t(i, ee(e, "lowpass", 1900, 0.7), wi(e, a, 0.1 * o, 1.78), t), $t(jt(e, "sine", s, a, 1.6), wi(e, a, 0.06 * o, 1.6), t), $t(jt(e, "sine", s * 2, a, 0.9), wi(e, a, 0.02 * o, 0.9), t);
}
function ao(e, t, a, s, o, i = !1) {
  if (i) {
    gt(e, t, a, "bandpass", 2200, 1.2, 0.045, 0.2 * o), At(e, t, a, "sine", s * 4, s * 3.2, 0.06, 0.1 * o);
    return;
  }
  At(e, t, a, "sine", s * 1.5, s, 0.28, 0.24 * o), gt(e, t, a, "bandpass", 700, 0.8, 0.07, 0.08 * o);
}
function Wl(e, t, a, s, o, i, n) {
  const r = ee(e, "lowpass", n.lo, 0.9);
  r.frequency.setValueAtTime(n.lo, a), r.frequency.exponentialRampToValueAtTime(n.hi, a + n.a), r.frequency.exponentialRampToValueAtTime(n.rest, a + n.a + Math.min(0.5, o));
  for (const l of [1, n.det]) {
    const d = jt(e, "sawtooth", s * l * n.scoop, a, o + 0.35);
    d.frequency.exponentialRampToValueAtTime(s * l, a + 0.05), d.connect(r);
  }
  $t(r, Ft(e, a, i, n.a, 0.18, Math.max(0, o - n.a)), t);
}
function Gl(e, t, a, s, o, i) {
  Wl(e, t, a, s, o, 0.115 * i, { lo: s * 1.5, hi: Math.min(3600, s * 7), rest: Math.min(2400, s * 4), a: 0.03, det: 1.003, scoop: 0.985 });
}
function Lo(e, t, a, s, o, i) {
  const n = Math.max(500, Math.min(1600, s * 4));
  Wl(e, t, a, s, o, 0.13 * i, { lo: n * 0.45, hi: n, rest: n * 0.8, a: 0.09, det: 0.997, scoop: 0.99 });
}
function jo(e, t, a, s, o) {
  At(e, t, a, "triangle", s * 1.6, s, 0.12, 0.24 * o), gt(e, t, a, "bandpass", 1900, 0.9, 0.1, 0.18 * o, 2e-3);
}
const Nt = (e) => 440 * Math.pow(2, (e - 69) / 12);
function Vl(e, t, a, s, o) {
  const i = Nt(s.m), n = s.d * o;
  switch (s.i) {
    case "drum":
      We(e, t, a, i, s.v);
      break;
    case "drumHi":
      We(e, t, a, i * 1.8, s.v * 0.8);
      break;
    case "flute":
      to(e, t, a, i, n, s.v);
      break;
    case "ocarina":
      $f(e, t, a, i, n, s.v);
      break;
    case "lyre":
      Sf(e, t, a, i, s.v);
      break;
    case "stones":
      Cf(e, t, a, i, s.v);
      break;
    case "bells":
      Fo(e, t, a, i, s.v);
      break;
    case "horn":
      hn(e, t, a, i, n, s.v);
      break;
    case "drone":
      Pf(e, t, a, i, n, s.v);
      break;
    case "shaker":
      eo(e, t, a, s.v);
      break;
    case "aulos":
      Bn(e, t, a, i, n, s.v);
      break;
    case "aulosHeld":
      Ul(e, t, a, i, n, s.v);
      break;
    case "kithara":
      Hl(e, t, a, i, s.v);
      break;
    case "tymp":
      ao(e, t, a, i, s.v);
      break;
    case "tympRim":
      ao(e, t, a, i, s.v, !0);
      break;
    case "tuba":
      Gl(e, t, a, i, n, s.v);
      break;
    case "cornu":
      Lo(e, t, a, i, n, s.v);
      break;
    case "march":
      jo(e, t, a, i, s.v);
      break;
  }
}
const so = 62, un = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], Ef = [...un.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...un.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], If = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], fs = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function fn() {
  const e = [];
  let t = 0;
  const a = (s, o, i) => s.forEach((n, r) => {
    let l = 0;
    for (const [d, c] of n)
      e.push({ b: (t + r) * 4 + l, i: o, m: so + d, d: c, v: i }), l += c;
  });
  for (let s = 0; s < 4; s++, t += 8) {
    a(s === 2 ? If : s === 1 ? Ef : un, "flute", 1);
    for (let o = 0; o < 8; o++) {
      const i = (t + o) * 4;
      if (e.push({ b: i, i: "drum", m: 38, d: 1, v: 0.9 }, { b: i + 2, i: "drum", m: 43, d: 1, v: 0.6 }), s >= 2) {
        e.push({ b: i + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: i + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      s >= 1 && fs[o].concat([fs[o][2], fs[o][1], fs[o][2], fs[o][1]]).forEach((n, r) => e.push({ b: i + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), s === 3 && e.push({ b: i, i: "bells", m: 74 + fs[o][0], d: 2, v: 0.8 });
    }
    s === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([o, i]) => e.push({ b: t * 4 + o, i: "horn", m: i, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: so, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const qf = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10], [0, 1, 3, 5, 7, 8, 10], [0, 2, 4, 5, 7, 9]], Of = [72, 80, 88, 76, 90], wf = [["aulos", "aulos", "kithara"], ["cornu", "tuba", "aulos"]];
function Rf(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const h0 = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function Kl(e, t, a, s) {
  const o = Math.min(e, 4), i = Rf(s * 97 + o * 13 + t * 5), n = qf[o], r = n.length, l = (P) => so + 12 * Math.floor(P / r) + n[(P % r + r) % r], d = t === 1, c = a === 3, h = Math.round(Of[o] * (d ? 1.15 : 1) * (c ? 0.85 : a === 2 ? 0.93 : 1)), f = [], u = (P) => {
    const I = [];
    let C = P;
    for (let w = 0; w < 2; w++) {
      const F = h0[Math.floor(i() * h0.length)], V = [];
      for (const S of F)
        V.push([C, S]), C = Math.max(-2, Math.min(r + 3, C + [-2, -1, -1, 1, 1, 2, 0][Math.floor(i() * 7)]));
      I.push(V);
    }
    return I;
  }, p = u(o === 3 ? [0, 2, 4][Math.floor(i() * 3)] : Math.floor(i() * 3)), v = u(2 + Math.floor(i() * 3)), y = u(r), k = (P, I) => P.map((C) => C.map(([w, F]) => [w + I, F])), M = [[[2, 2], [1, 2]], [[0, 4]]], x = [...p, ...k(p, 1), ...v, ...M, ...p, ...k(p, -1), ...y, ...M, ...y, ...k(y, -1), ...v, ...M, ...p, ...v, ...p, ...M], z = o >= 3 ? wf[o - 3][t] : o === 0 ? "flute" : o === 1 ? "ocarina" : "flute", A = o === 0 || o >= 3 || a !== 1 ? 0 : 12, $ = z === "kithara" ? 2.4 : 0.85;
  return x.forEach((P, I) => {
    let C = 0;
    const w = I * 4, F = !d && I % 8 === 7 && i() < 0.3;
    for (const [S, q] of P)
      !F && !(c && i() < 0.25) && f.push({ b: w + C, i: z, m: l(S) + A, d: q * 0.95, v: $ }), C += q;
    const V = c ? 0.4 : d ? 1 : 0.7;
    if (o === 0) {
      if (f.push({ b: w, i: "drum", m: 38, d: 1, v: 0.9 }), i() < V && f.push({ b: w + 2, i: "drum", m: 43, d: 1, v: 0.6 }), d) for (let S = 0; S < 4; S++) f.push({ b: w + S + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      I % 4 === 3 && i() < V && f.push({ b: w + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: w + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (o === 1)
      I % 8 === 0 && f.push({ b: w, i: "drone", m: 38, d: 32, v: 0.9 }), (I % 2 === 0 || d) && f.push({ b: w, i: "drum", m: 38, d: 1, v: 0.7 }), i() < V && [0, 1.5, 3].forEach((S, q) => f.push({ b: w + S, i: "stones", m: l([0, 2, 4][q] + I % 2) - 12, d: 1, v: 0.6 }));
    else if (o === 2) {
      const S = I % 8 < 4 ? 0 : I % 8 < 6 ? -2 : 5, q = [S, S + 7, S + 12, S + 16];
      i() < V + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((O, H) => f.push({ b: w + H * 0.5, i: "lyre", m: 50 + q[O], d: 0.5, v: 0.6 })), f.push({ b: w, i: "drum", m: 38, d: 1, v: 0.8 }), d && f.push({ b: w + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: w + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), I % 8 === 0 && f.push({ b: w, i: "bells", m: 74 + S, d: 2, v: 0.7 }), I % 8 === 6 && i() < 0.7 && f.push({ b: w, i: "horn", m: 45 + (i() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    } else {
      const S = I % 8, q = a === 1 ? 12 : 0, O = (U, R, L, Y, ot) => f.push({ b: w + U, i: R, m: L, d: Y, v: ot }), H = (U, R, L) => R.forEach((Y, ot) => O(U + ot * 0.06, "kithara", Y, 1, L));
      if ((I % 16 === 0 && !c || a === 1 && S === 0) && O(0, "bells", 74, 2, 0.5), o === 3) {
        const U = (S < 4 || S === 7 ? [0, 7, 12, 15] : S < 6 ? [-4, 3, 8, 12] : [1, 8, 13, 17]).map((Y) => 50 + Y + q), R = z === "kithara";
        S === 0 && !c && O(0, "aulosHeld", 50, 31, R ? 1 : 0.8), R ? (O(0, "kithara", U[0] - q, 1, 0.5), i() < V && O(2, "kithara", U[1] - q, 1, 0.4)) : d ? i() < V + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((Y, ot) => O(ot * 0.5, "kithara", U[Y], 0.5, 0.45)) : (H(0, U, 0.45), i() < V && (O(2, "kithara", U[2], 1, 0.4), O(3, "kithara", U[1], 1, 0.35)));
        const L = (Y, ot, ft) => O(Y, ot ? "tympRim" : "tymp", 45, 1, ft);
        if (c)
          S % 4 === 0 && L(0, !1, 0.6);
        else if (d) {
          L(0, !1, 0.85), L(1, !0, 0.45), i() < 0.6 && L(1.5, !0, 0.35), L(2, !1, 0.6), L(3, !0, 0.5), i() < 0.5 && L(3.5, !0, 0.35);
          for (let Y = 0; Y < 4; Y++) O(Y + 0.5, "shaker", 0, 0.5, 0.4);
        } else
          (!R || S % 2 === 0) && L(0, !1, R ? 0.5 : 0.7), i() < V && L(2.5, !0, 0.4), S === 7 && (L(3, !0, 0.45), L(3.5, !0, 0.5));
      } else {
        const U = S < 4 || S === 7 ? 0 : S < 6 ? 5 : -5, R = [U, U + 7, U + 12, U + 16].map((ft) => 50 + ft + q), L = 50 + (U === 5 ? -7 : U), Y = S === 7 && !c && (d || I % 16 === 15);
        d ? (c || (O(0, "cornu", L, 1.7, 0.32), Y || O(2, "cornu", L + 7, 1.7, 0.26)), i() < V + 0.3 && (H(1, R.slice(1), 0.35), H(3, R.slice(1), 0.35))) : ((S === 0 || !c && S >= 4 && S !== 5) && O(0, "cornu", L, S === 0 ? 15.5 : S === 4 ? 7.5 : 3.7, 0.28), i() < V + 0.2 && H(0, R, 0.4), i() < V && O(2, "kithara", R[2], 1, 0.35));
        const ot = (ft, dt) => O(ft, "march", 55, 0.5, dt);
        if (c ? O(0, "drum", 38, 1, 0.6) : d ? (O(0, "drum", 38, 1, 0.75), O(2, "drum", 38, 1, 0.6), ot(1, 0.5), ot(3, 0.5), S === 3 || S === 7 ? [3.25, 3.5, 3.75].forEach((ft, dt) => ot(ft, 0.3 + dt * 0.08)) : i() < 0.5 && ot(3.5, 0.3)) : (O(0, "drum", 38, 1, 0.6), i() < V && ot(2, 0.3)), Y) {
          const ft = z === "tuba" ? "cornu" : "tuba";
          [57, 62, 66, 69].forEach((dt, St) => O(1 + St * 0.5, ft, dt - (ft === "cornu" ? 12 : 0), St === 3 ? 1.3 : 0.4, 0.48));
        }
      }
    }
  }), { bpm: h, beats: x.length * 4, notes: f };
}
class Bf {
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
    tt.ready(() => {
      const t = tt.ctx, a = tt.out("music");
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
    tt.ctx && (this.clear(), this.enqueue(fn(), tt.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, a) {
    this.getEra = t, this.getSeason = a, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, tt.ctx && (this.clear(), this.nextStart = tt.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, a, s) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => s, this.pieceN = a, this.seed = 7, tt.ctx && (this.clear(), this.nextStart = tt.now + 0.5);
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
    const t = tt.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, a) {
    const s = 60 / t.bpm;
    for (const o of t.notes) this.queue.push({ t: a + o.b * s, n: o, spb: s, out: "base" });
    this.queue.sort((o, i) => o.t - i.t), this.qi = 0, this.pieceEnd = a + t.beats * s;
  }
  tick() {
    if (!tt.running || !this.base) return;
    const t = tt.now, a = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(fn(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const o = Kl(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(o, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < a; ) {
      const o = this.queue[this.qi++];
      o.t >= t - 0.05 && Vl(tt.ctx, this.base, Math.max(o.t, t), o.n, o.spb);
    }
    const s = tt.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const o = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < a; ) {
        const i = this.layerT, n = Math.round(i / o % 4);
        this.tension > 0.02 && We(s, this.tens, i, Nt(33), 0.8), this.battle > 0.02 && (We(s, this.batt, i, Nt(n % 2 ? 43 : 38), 0.9), We(s, this.batt, i + o / 2, Nt(48), 0.55), eo(s, this.batt, i + o / 4, 0.8), eo(s, this.batt, i + o * 0.75, 0.8)), this.layerT += o;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, a = 0) {
    const s = tt.ctx, o = tt.out("alert");
    !s || !o || !tt.voice(3) || (tt.duck(0.7, 3.5), Xl(s, o, s.currentTime + 0.05, t, a));
  }
}
function Xl(e, t, a, s, o = 0) {
  if (s === "age" && o === 3)
    return [[0, 0, 0.7], [0.24, 1, 0.4], [0.36, 1, 0.45], [0.48, 0, 0.75], [0.6, 1, 0.45], [0.66, 1, 0.5], [0.72, 1, 0.55], [0.78, 1, 0.6]].forEach(([i, n, r]) => ao(e, t, a + i, Nt(45), r, n === 1)), Ul(e, t, a + 0.86, Nt(50), 2.6, 1), [[69, 0.86, 0.3], [70, 1.18, 0.14], [69, 1.34, 0.14], [67, 1.5, 0.14], [69, 1.66, 0.3], [74, 2, 1.3]].forEach(([i, n, r]) => Bn(e, t, a + n, Nt(i), r, 1)), [50, 57, 62, 66].forEach((i, n) => Hl(e, t, a + 2 + n * 0.04, Nt(i), 0.9)), ao(e, t, a + 2, Nt(45), 0.9), Fo(e, t, a + 2, Nt(74), 0.8), 3.6;
  if (s === "age" && o >= 4) {
    for (let i = 0; i < 7; i++) jo(e, t, a + i * 0.08, Nt(55), 0.35 + i * 0.07);
    return We(e, t, a + 0.56, Nt(38), 0.8), Lo(e, t, a + 0.56, Nt(50), 1, 0.65), [[62, 0.56, 0.13], [62, 0.74, 0.13], [62, 0.92, 0.13], [69, 1.1, 0.5], [66, 1.72, 0.13], [69, 1.9, 0.13], [74, 2.08, 1.1]].forEach(([i, n, r]) => Gl(e, t, a + n, Nt(i), r, 0.8)), jo(e, t, a + 1.72, Nt(55), 0.5), jo(e, t, a + 1.9, Nt(55), 0.55), We(e, t, a + 2.08, Nt(38), 0.9), Lo(e, t, a + 2.08, Nt(50), 1.2, 0.65), Lo(e, t, a + 2.08, Nt(57), 1.2, 0.5), 3.5;
  }
  if (s === "age") {
    for (let n = 0; n < 6; n++) We(e, t, a + n * 0.12, Nt(38 + n % 2 * 5), 0.5 + n * 0.08);
    return [0, 4, 7, 12].map((n) => so + n + (o >= 2 ? 0 : -12)).forEach((n, r) => o >= 2 ? hn(e, t, a + 0.75 + r * 0.22, Nt(n - 12), 0.3, 1.4) : to(e, t, a + 0.75 + r * 0.2, Nt(n + 12), 0.3, 1.2)), o >= 2 ? Fo(e, t, a + 1.6, Nt(74), 1.2) : We(e, t, a + 1.6, Nt(38), 1), 3.6;
  }
  if (s === "victory") {
    [0, 4, 7, 12, 7, 12].forEach((i, n) => hn(e, t, a + n * 0.25, Nt(50 + i), n === 5 ? 1.2 : 0.22, 1.3));
    for (let i = 0; i < 8; i++) We(e, t, a + i * 0.125, Nt(38 + i % 2 * 5), 0.7);
    return Fo(e, t, a + 1.3, Nt(74), 1.3), 3.3;
  }
  return [12, 10, 7, 5, 3, 0].forEach((i, n) => to(e, t, a + n * 0.35, Nt(so + i), n === 5 ? 1.4 : 0.32, 0.9)), We(e, t, a + 2.1, Nt(38), 0.6), 3.5;
}
const pe = new Bf(), qo = { theme: fn, eraPiece: Kl, play: Vl, stingerAt: Xl };
class Yl {
  constructor() {
    g(this, "loops", {});
    g(this, "wf", null);
    g(this, "t", null);
    g(this, "next", {});
    g(this, "seed", 1);
  }
  start() {
    const t = tt.ctx, a = tt.out("amb");
    if (!t || !a || this.loops.wind) return;
    const s = (o, i) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(a), this.loops[o] = { g: n, stop: i(n) };
    };
    s("wind", (o) => {
      const i = Io(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const d = t.createGain(), c = t.createOscillator(), h = t.createGain();
      return d.gain.value = 0.75, c.frequency.value = 0.11, h.gain.value = 0.25, c.connect(h).connect(d.gain), i.connect(n).connect(d).connect(o), r.start(), c.start(), () => {
        i.stop(), r.stop(), c.stop();
      };
    }), s("water", (o) => {
      const i = Io(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), d = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, d.gain.value = 0.2, l.connect(d).connect(r.gain), i.connect(n).connect(r).connect(o), l.start(), () => {
        i.stop(), l.stop();
      };
    }), s("fire", (o) => {
      const i = Io(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, i.connect(n).connect(o), () => i.stop();
    }), s("market", (o) => {
      const i = Io(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 600, n.Q.value = 3;
      const r = t.createOscillator(), l = t.createGain();
      return r.frequency.value = 3.3, l.gain.value = 250, r.connect(l).connect(n.frequency), i.connect(n).connect(o), r.start(), () => {
        i.stop(), r.stop();
      };
    }), s("insects", (o) => {
      const i = t.createOscillator();
      i.type = "triangle", i.frequency.value = 4300;
      const n = t.createGain(), r = t.createOscillator(), l = t.createGain();
      n.gain.value = 0.5, r.frequency.value = 32, l.gain.value = 0.5, r.connect(l).connect(n.gain);
      const d = t.createGain(), c = t.createOscillator(), h = t.createGain();
      return d.gain.value = 0.5, c.frequency.value = 0.3, h.gain.value = 0.5, c.connect(h).connect(d.gain), i.connect(n).connect(d).connect(o), i.start(), r.start(), c.start(), () => {
        i.stop(), r.stop(), c.stop();
      };
    });
  }
  stop() {
    const t = tt.now;
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
    const a = tt.now, s = this.loops;
    if (!s.wind) return;
    const o = t.season, i = Math.min(1, Math.max(0, (t.zoom - 20) / 60)), n = {
      wind: ([0.32, 0.22, 0.48, 0.7][o] ?? 0.3) * (0.6 + i * 0.6),
      water: t.water * 0.6 * (1 - i * 0.5),
      fire: t.fire * 0.5,
      market: t.market * (t.fair ? 0.12 : 0.06),
      insects: o === 1 ? 0.012 * (1 - i * 0.5) : 0
    };
    for (const r in n) s[r]?.g.gain.setTargetAtTime(n[r], a, 1);
    this.wf && this.wf.frequency.setTargetAtTime(o === 3 ? 700 : 380, a, 2);
  }
  /** sons de vez em quando */
  tick() {
    const t = this.t, a = tt.ctx, s = tt.out("amb");
    if (!t || !a || !s || !tt.running) return;
    const o = a.currentTime, i = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (c, h) => (this.next[c] ?? 0) > o ? !1 : (this.next[c] = o + h(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), d = [0.9, 0.6, 0.25, 0][i] * (0.4 + t.trees * 0.6);
    d > 0.05 && r("bird", () => 1.5 + n() * 4 / d) && dn(a, s, o + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), i === 3 && r("crow", () => 9 + n() * 14) && Fe["animal.crow"](a, s, o + 0.05, 0.6), i === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && Fe["work.rustle"](a, s, o + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && Fe["stone.hit"](a, s, o + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && Fe["work.pickMetal"](a, s, o + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && Fe["animal.sheep"](a, s, o + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && Fe["animal.horse"](a, s, o + 0.05, 0.8 * t.stables);
  }
}
const gs = (e, t, a) => Math.max(t, Math.min(a, e)), Df = { arrow: "bow", stone: "sling", bolt: "scorpio", boulder: "ballista" }, u0 = {
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
}, f0 = /* @__PURE__ */ new Map(), pn = {};
function si(e, t = 1, a = 0, s = "sfx", o = 0.07) {
  const i = tt.ctx, n = tt.out(s), r = Fe[e];
  if (!i || !n || !r || !tt.running || t < 0.01) return;
  const l = i.currentTime;
  if ((f0.get(e) ?? -9) > l - o || !tt.voice(0.35)) return;
  f0.set(e, l), pn[e] = (pn[e] ?? 0) + 1;
  let d = n;
  if (a && i.createStereoPanner) {
    const c = i.createStereoPanner();
    c.pan.value = gs(a, -1, 1), c.connect(n), d = c;
  }
  r(i, d, l + 0.01, gs(t, 0, 1.2));
}
const Je = (e) => tt.whenRunning(() => si(e, 1, 0, "ui", 0.04));
class Nf {
  // avisos esperando a vez (hora do som)
  constructor(t, a, s) {
    g(this, "amb", new Yl());
    g(this, "t", 0);
    g(this, "slow", 0);
    g(this, "raidUntil", 0);
    g(this, "animalT", 0);
    g(this, "avisoAt", 0);
    g(this, "fila", []);
    this.w = t, this.me = a, this.cam = s, tt.setScene("game"), pe.game(() => t.players[a].era, () => t.season), Ue.emit = (o, i, n, r) => this.at(o, i, n, r), tt.ready(() => this.amb.start());
  }
  dispose() {
    Ue.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, a, s, o = 1) {
    if (!tt.running) return;
    const i = this.w, n = i.size, r = Math.floor(a), l = Math.floor(s);
    if (r < 0 || l < 0 || r >= n || l >= n || !i.vis[this.me][l * n + r]) return;
    const d = this.cam, c = a - d.x, h = s - d.z, f = Math.hypot(c, h), u = gs(1 - f / 22, 0, 1), p = gs(1.25 - d.dist / 70, 0.3, 1);
    if (u < 0.05) return;
    const v = (c * Math.cos(d.yaw) - h * Math.sin(d.yaw)) / 12;
    si(t, o * u * u * p, v);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco. Um de cada vez: o seguinte espera 1,3 s, e todos
   *  esperam a vinheta de uma era nova acabar (na virada do mês chegam juntos feira, festival e primavera; na Fundação de Roma,
   *  a vinheta, a prata e o censo). A mensagem na tela aparece na hora do mesmo jeito */
  aviso(t) {
    const a = tt.now;
    if (tt.running && this.avisoAt > a && this.fila.length < 4) {
      this.fila.push({ id: t, at: this.avisoAt }), this.avisoAt += 1.3;
      return;
    }
    this.tocaAviso(t), this.avisoAt = Math.max(this.avisoAt, a + 1.3);
  }
  tocaAviso(t) {
    si(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && tt.duck();
  }
  onEvents(t) {
    const a = this.w, s = a.size;
    for (const o of t) switch (o.t) {
      case "proj":
        this.at(o.h !== void 0 ? "tower" : Df[o.kind] ?? "throw", o.x0 / 256, o.z0 / 256);
        break;
      case "death": {
        const i = o.x / 256, n = o.z / 256;
        this.at(o.kind >= ut ? "crash" : o.owner === Rt ? "fall.animal" : "puff", i, n);
        break;
      }
      case "built":
        a.alive[o.e] && this.at("built", a.x[o.e] / 256, a.z[o.e] / 256);
        break;
      case "trained":
        a.alive[o.e] && a.owner[o.e] === this.me && this.at("trained", a.x[o.e] / 256, a.z[o.e] / 256, 0.8);
        break;
      case "tree":
        this.at("tree.fall", o.k % s + 0.5, Math.floor(o.k / s) + 0.5);
        break;
      case "res":
        a.resKind[o.k] === 0 && this.at("res.crumble", o.k % s + 0.5, Math.floor(o.k / s) + 0.5);
        break;
      case "age":
        o.player === this.me && (pe.stinger("age", o.era), tt.running && (this.avisoAt = Math.max(this.avisoAt, tt.now + 3.4)));
        break;
      case "end":
        pe.stinger(this.w.resultadoDe(this.me, o));
        break;
      // M6: o time vencedor
      case "msg": {
        if (o.player !== this.me) break;
        const i = o.key.split(".")[0];
        u0[i] && this.aviso(u0[i]), i === "raidSoon" && (this.raidUntil = this.w.tick + 400);
        break;
      }
    }
  }
  /** a cada quadro: ambiente pela câmera, sons de bichos por perto, camadas da música */
  update(t, a) {
    for (tt.setPaused(a); tt.running && this.fila.length && this.fila[0].at <= tt.now; ) this.tocaAviso(this.fila.shift().id);
    if (this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !tt.running)) return;
    const s = this.w, o = this.me, i = s.size, n = this.cam, r = n.x, l = n.z, d = s.vis[o];
    let c = 0, h = 0, f = 0;
    for (let $ = -8; $ <= 8; $ += 2) for (let P = -8; P <= 8; P += 2) {
      const I = Math.floor(r + P), C = Math.floor(l + $);
      if (I < 0 || C < 0 || I >= i || C >= i) continue;
      const w = C * i + I;
      f++;
      const F = s.map.terrain[w];
      (F === Ta || F === Pa) && c++, s.map.tree[w] && h++;
    }
    let u = 0, p = 0, v = 0, y = 0, k = 0, M = 0, x = 0;
    const z = [];
    for (let $ = 0; $ < s.top; $++) {
      if (!s.alive[$]) continue;
      const P = s.x[$] / 256, I = s.z[$] / 256, C = Math.hypot(P - r, I - l);
      if (C > 18 || !d[Math.floor(I) * i + Math.floor(P)] && s.owner[$] !== o) continue;
      const w = gs(1 - C / 16, 0, 1);
      if (s.kind[$] >= ut) {
        if (!s.done[$]) continue;
        const F = lt[s.kind[$] - ut].key;
        F === "center" || F === "camp" ? u = Math.max(u, w) : F === "forge" ? p = Math.max(p, w) : F === "market" ? v = Math.max(v, w) : F === "pen" ? y = Math.max(y, w) : F === "stable" && (k = Math.max(k, w));
      } else if (s.kind[$] < X.length) {
        s.owner[$] === Rt ? C < 14 && z.push($) : s.task[$] === Vt && (M++, s.owner[$] === o && x++);
        const F = X[s.kind[$]].key;
        (F === "horseman" || F === "eques") && (k = Math.max(k, w * 0.5));
      }
    }
    if (this.amb.set({ season: s.season, zoom: n.dist, water: f ? Math.min(1, c / f * 3) : 0, fire: u, market: v, fair: s.fair, forge: p, pens: y, stables: k, trees: f ? Math.min(1, h / f * 2) : 0 }), this.amb.tick(), z.length && (this.animalT -= 0.25) <= 0) {
      const $ = z[Math.floor(this.t * 7.7 % z.length)], P = X[s.kind[$]].key, I = P === "wolf" ? s.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${P}`;
      Fe[I] && this.at(I, s.x[$] / 256, s.z[$] / 256, P === "wolf" && s.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let A = s.tick < this.raidUntil;
    if (!A && Math.floor(this.t * 4) % 4 === 0) {
      const $ = s.players[o];
      for (let P = 0; P < s.top && !A; P++) if (s.isUnit(P) && s.owner[P] !== o && s.owner[P] !== Rt && (s.owner[P] === ze || s.hostile(o, s.owner[P]))) {
        const I = s.x[P] / 256 - $.start.x, C = s.z[P] / 256 - $.start.z;
        I * I + C * C < 196 && (A = !0);
      }
    }
    pe.setTension(A ? 0.6 : 0), pe.setBattle(x > 0 ? gs((M - 1) / 8, 0.3, 1) : 0);
  }
}
const Jl = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft", "coins", "festa"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "scorpio", "ballista", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], Ff = {
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
}, Lf = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["age:3", "Chegou o Reino (Fundação de Roma)"], ["age:4", "Chegou a República"], ["victory", "Vitória"], ["defeat", "Derrota"]], jf = ["Pedra", "Neolítico", "Metais", "Reino", "República"], _f = ["calma", "animada", "calma 2"], Uf = ["primavera", "verão", "outono", "inverno"], Hf = [["era:3:0:1", "Reino no verão"], ["era:3:0:3", "Reino no inverno"], ["era:4:1:1", "República no verão"], ["era:4:0:3", "República no inverno"]], Wf = ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft", "coins", "festa"];
function Gf() {
  tt.install(), tt.setScene("menu");
  const e = new Yl(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${Jl.map(([l, d]) => `<h2>${l}</h2>${d.map((c) => `<button data-som="${c}" title="${c}">${Ff[c] ?? c}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${jf.map((l, d) => _f.map((c, h) => `<button data-musica-teste="era:${d}:${h}">${l} · ${c}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button>${Hf.map(([l, d]) => `<button data-musica-teste="${l}">${d}</button>`).join("")}<button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${Lf.map(([l, d]) => `<button data-vinheta="${l}">${d}</button>`).join("")}
    <h2>Ambiente</h2>${Uf.map((l, d) => `<button data-ambiente-teste="${d}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const a = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let s = { ...a }, o = 0;
  const i = (l) => {
    tt.setScene("game"), e.start(), s = l, e.set(l), o || (o = window.setInterval(() => {
      e.set(s), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const d = l.target.closest("button");
    d && (tt.unlock(), t.querySelectorAll("[aria-pressed]").forEach((c) => c.removeAttribute("aria-pressed")), d.setAttribute("aria-pressed", "true"), tt.whenRunning(() => r(d)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = tt.ctx ? tt.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const d = l.dataset;
    if (d.som && si(d.som, 1, 0, Wf.includes(d.som) ? "alert" : "sfx", 0), d.musicaTeste) {
      const c = d.musicaTeste;
      if (tt.setScene(c === "tema" ? "menu" : "game"), tt.setOpts({ music: Math.max(2, tt.opts.music) }), c === "tema")
        pe.stop(), pe.menu();
      else if (c === "parar") pe.stop();
      else if (c === "tensao") pe.setTension(0.6);
      else if (c === "batalha") pe.setBattle(0.9);
      else if (c === "inverno") pe.preview(2, 0, 3);
      else {
        const [, h, f, u] = c.split(":").map(Number);
        pe.setTension(0), pe.setBattle(0), pe.preview(h, f, u || 0);
      }
    }
    if (d.vinheta) {
      const [c, h] = d.vinheta.split(":");
      pe.stinger(c, Number(h) || 0);
    }
    if (d.ambienteTeste) {
      const c = d.ambienteTeste;
      c === "parar" ? (e.set({ ...a, season: 1, trees: 0 }), s = { ...a, season: -1, trees: 0 }) : i(c === "rio" ? { ...a, season: 1, water: 1, zoom: 22 } : c === "aldeia" ? { ...a, fire: 1, forge: 1, pens: 1, zoom: 22 } : c === "feira" ? { ...a, market: 1, fair: !0, zoom: 22 } : { ...a, season: Number(c) });
    }
  }
}
async function Vf(e) {
  const a = new OfflineAudioContext(1, 176400, 44100);
  let s = 0;
  if (Fe[e]) s = Fe[e](a, a.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, d, c] = e.split(":"), h = d === "tema" ? qo.theme() : qo.eraPiece(Number(c), 1, 0, 3), f = 60 / h.bpm;
    for (const u of h.notes) u.b * f < 3.6 && qo.play(a, a.destination, 0.01 + u.b * f, u, f);
    s = 4;
  } else if (e.startsWith("vinheta:")) {
    const [, d, c] = e.split(":");
    s = qo.stingerAt(a, a.destination, 0.01, d, Number(c) || 0);
  }
  const o = await a.startRendering(), i = o.getChannelData(0);
  let n = 0, r = 0, l = 0;
  for (let d = 0; d < i.length; d++) {
    const c = Math.abs(i[d]);
    c > n && (n = c), d < Math.max(1, s) * 44100 && (r += i[d] * i[d], l++);
  }
  return { id: e, peak: n, rms: Math.sqrt(r / Math.max(1, l)), dur: s };
}
const Kf = Jl.flatMap((e) => e[1]);
qc();
const va = new URLSearchParams(location.search), oi = (e, t) => {
  const a = Number(va.get(e));
  return va.has(e) && Number.isFinite(a) && a >= 0 ? a : t;
}, Zl = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, Dn = document.getElementById("scene"), oo = ul.makeRenderer(Dn);
let pt = 0;
const ra = 1 / Wo;
let Re = Zl ? 1 : 0, ii = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (Re = Math.min(2, Math.max(0, Number(e) || 0)), ii = !1);
} catch {
}
const Ql = (e) => {
  Re = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class Xf {
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
    g(this, "guest", bt?.papel === "convidado");
    /** partida online (M6): nada é salvo, e os avisos da partida solo não são medidos (só o aviso amigo) */
    g(this, "naRede", !!it);
    this.world = t, this.owner = a;
    const s = t;
    this.marco = Math.floor(s.tick / 600), this.scene = new ul(oo, s, pt), this.scene.setQuality(Re), va.get("fog") === "0" && this.scene.setFog(!1), this.hud = new ln(s, pt, {
      idle: () => {
        if (Fs() === "combate") return;
        const n = this.own((l) => s.kind[l] === mt.villager && s.task[l] === 0 && s.state[l] === 0);
        if (!n.length) return;
        const r = n[this.idleCursor++ % n.length];
        this.select([r]), this.focus([r]);
      },
      army: () => {
        if (Fs() === "logistica") return;
        const n = this.own((r) => s.kind[r] !== mt.villager);
        this.select(n), this.focus(n);
      },
      home: () => {
        const n = s.players[pt].start;
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
        n.length && this.send({ type: "stop", player: pt, ids: n });
      },
      food: (n) => {
        const r = this.own((l) => this.sel.has(l) && s.kind[l] === mt.villager);
        r.length && this.send({ type: "food", player: pt, ids: r, on: n });
      },
      startPlace: (n) => this.startPlace(n),
      train: (n, r) => this.send({ type: "train", player: pt, building: n, key: r }),
      cancelQueue: (n) => this.send({ type: "cancel", player: pt, building: n }),
      ageUp: (n) => this.send({ type: "ageup", player: pt, building: n }),
      research: (n, r) => this.send({ type: "research", player: pt, building: n, key: r }),
      trade: (n, r, l) => this.send({ type: "trade", player: pt, building: n, give: r, get: l }),
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
      dicas: () => this.dicas(),
      disband: () => {
        const n = this.own((r) => this.sel.has(r));
        n.length && this.send({ type: "disband", player: pt, ids: n });
      }
      // D42
    }, Zl, this.sel), this.minimap = new Xu(this.hud.minimap, s, pt, this.scene.camera), this.snd = new Nf(s, pt, this.scene.camera), this.input = new Yu(Dn, s, pt, this.scene.camera, this.hud.box, {
      onCommand: (n) => {
        if (this.mode !== "normal") return;
        const { cmds: r, ping: l } = ef(s, pt, [...this.sel], n), d = r.filter((c) => this.send(c));
        d.length && wo(d[0].type === "attack" ? s.owner[d[0].target] === Rt ? "cacar" : "atacar" : d[0].type === "gather" ? "coletar" : d[0].type === "work" ? "trabalhar" : "mover"), d.length && (this.scene.ping(n.x, n.z, l), Je(l === "attack" ? "order.attack" : l === "work" ? "order.work" : "order.move"));
      },
      onRally: (n, r) => {
        if (this.mode === "sinal") {
          this.porSinal(n, r);
          return;
        }
        const l = this.mode === "rally" && s.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        l >= 0 && this.send({ type: "rally", player: pt, building: l, x: Math.round(n * 256), z: Math.round(r * 256) }) && (this.scene.ping(n, r, "move"), wo("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (n, r) => this.movePlace(n, r),
      onPlaceConfirm: (n) => this.confirmPlace(n),
      onCancel: () => this.setMode("normal"),
      drawing: () => this.isMuro(),
      onDraw: (n, r, l) => this.desenha(n, r, l),
      onSelect: () => {
        this.mode === "place" && !af(s, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      onDisband: () => this.hud.dispensar(),
      // D42: a tecla Delete
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize(), this.aplicarPapel();
    const o = this.scene.camera.cam, i = o.position.clone();
    this.hud.projetor = (n, r) => (i.set(n, zt(s.map, n, r) + 0.6, r).project(o), [(i.x + 1) / 2 * innerWidth, (1 - i.y) / 2 * innerHeight, i.z < 1 && Math.abs(i.x) < 1.05 && Math.abs(i.y) < 1.05]), it && (this.hud.setTribos(it.nomes), it.olhando && !mn(s) && this.scene.setFog(!1), it.aviso && it.aviso.ate > performance.now() && this.hud.toast(it.aviso.texto), it.aviso = null);
  }
  porSinal(t, a) {
    const s = it, o = this.sinalTipo ? rn.indexOf(this.sinalTipo) : -1;
    if (this.setMode("normal"), !s || o < 0) return;
    const i = Math.max(0, Math.min(this.world.size - 1, Math.floor(t))), n = Math.max(0, Math.min(this.world.size - 1, Math.floor(a)));
    s.conn.sinal(o, i, n), this.mostrarSinal(pt, o, i, n);
  }
  /** o sinal de um aliado (ou o meu): marca no mapa e no minimapa, o anel no chão, um aviso e um som */
  mostrarSinal(t, a, s, o) {
    const i = rn[a], n = t === pt ? b("tribe.you") : it?.nomes[t] || b("sala.computador");
    if (!i || s < 0 || o < 0 || s >= this.world.size || o >= this.world.size) return;
    this.hud.addMarca(s + 0.5, o + 0.5, i, n), this.minimap.marcar(s + 0.5, o + 0.5, Mn[t] ?? "#fff"), this.scene.ping(s + 0.5, o + 0.5, i === "atacar" ? "attack" : i === "ajuda" ? "move" : "work");
    const r = performance.now();
    t !== pt && r - (this.ultimoSinal.get(t) ?? -1e9) > 1500 && (this.ultimoSinal.set(t, r), this.hud.toast(b("sinal.de", { name: n, sinal: b(`sinal.${i}`) }), (s + 0.5) * 256, (o + 0.5) * 256, "sinal"), Je("soft"));
  }
  /** partida online: a minha tribo perdeu e a partida continua (posso olhar ou sair) */
  perdeuTribo() {
    !it || this.ended || (this.setMode("normal"), this.sel.clear(), yt.showOlhar(mn(this.world)));
  }
  aplicarPapel() {
    const t = Fs();
    if (t !== this.papelVisto) {
      if (this.papelVisto = t, this.hud.setPapel(t, bt?.parceiro ?? ""), this.input.papel = t, t && this.sel.size > 1)
        for (const a of [...this.sel]) ks(this.world, t, a) || this.sel.delete(a);
      this.hud.refresh();
    }
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, a = [...this.sel][0];
    if (a === void 0 || !t.alive[a] || t.owner[a] !== pt) return;
    if (t.isBuilding(a)) {
      const o = t.bdef(a).key;
      Je(o === "pen" ? "animal.sheep" : o === "stable" ? "animal.horse" : o === "forge" ? "work.pickMetal" : o === "market" ? "soft" : "sel.building");
      return;
    }
    const s = t.kind[a];
    Je(s === mt.villager ? "sel.villager" : s === mt.dog ? "animal.dog" : s === mt.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const a = this.world, s = [];
    for (let o = 0; o < a.top; o++) a.isUnit(o) && a.owner[o] === pt && t(o) && s.push(o);
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
    for (const o of t)
      a += this.world.x[o] / 256, s += this.world.z[o] / 256;
    this.scene.camera.tx = a / t.length, this.scene.camera.tz = s / t.length;
  }
  setMode(t) {
    this.mode = t, t !== "place" && (this.scene.setGhost(null), this.scene.setWallGhost(null), this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.wallTiles = []), this.hud.setMode(t, this.place.ok, this.isMuro() ? this.wallTiles.length : -1, t === "place" ? this.placeKey : "", this.muro.length), this.hud.refresh();
  }
  startPlace(t) {
    if (this.placeKey = t, this.mode = "place", this.hud.resetCard(), lt[wt[t]]?.wall || lt[wt[t]]?.estrada) {
      this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.renderMuro();
      return;
    }
    this.movePlace(this.scene.camera.x, this.scene.camera.z);
  }
  // ── muro desenhado (D35) ──
  /** desenhando com o dedo: o muro (D35) ou a estrada (M3), que se desenha igual */
  isMuro() {
    const t = lt[wt[this.placeKey]];
    return this.mode === "place" && !!(t?.wall || t?.estrada);
  }
  isEstrada() {
    return this.mode === "place" && !!lt[wt[this.placeKey]]?.estrada;
  }
  /** blocos de A até B, sempre encostados de lado (sem pular na diagonal) */
  wallLine(t, a, s, o) {
    const i = this.world.size, n = [a * i + t], r = Math.sign(s - t), l = Math.sign(o - a), d = s - t, c = o - a, h = Math.hypot(d, c) || 1, f = (v, y) => Math.abs((v - t) * c - (y - a) * d) / h;
    let u = t, p = a;
    for (; (u !== s || p !== o) && n.length < Ve * 2; )
      u === s ? p += l : p === o || f(u + r, p) <= f(u, p + l) ? u += r : p += l, n.push(p * i + u);
    return n;
  }
  /** põe o bloco (tx, tz) no muro, ligado ao último por blocos encostados de lado; `solto`: começa um pedaço novo */
  muroAte(t, a, s) {
    const o = this.world.size;
    if (t < 0 || a < 0 || t >= o || a >= o) return;
    const i = this.muro[this.muro.length - 1], n = i === void 0 || s ? [a * o + t] : this.wallLine(i % o, Math.floor(i / o), t, a).slice(1);
    for (const r of n) {
      if (this.muro.length >= Ve) break;
      this.muro.includes(r) || this.muro.push(r);
    }
  }
  /** o dedo (ou o mouse) desenhando: arrastar desenha à mão; tocar liga o último bloco ao tocado em linha reta */
  desenha(t, a, s) {
    if (!this.isMuro()) return;
    const o = this.world.size, i = Math.floor(a), n = Math.floor(s), r = this.muro.length;
    if (t === "start") {
      const l = this.muro[this.muro.length - 1], d = l !== void 0 && Math.abs(l % o - i) <= 1 && Math.abs(Math.floor(l / o) - n) <= 1;
      this.muroTracos.push(this.muro.length), this.muroAte(i, n, !d);
    } else t === "move" ? this.muroAte(i, n, !1) : t === "tap" && (this.muroTracos.push(this.muro.length), this.muroAte(i, n, !1));
    this.muroTracos.length && this.muroTracos[this.muroTracos.length - 1] === this.muro.length && t !== "move" && this.muroTracos.pop(), this.muro.length >= Ve && t !== "end" && (t !== "move" || this.muro.length !== r) ? Je("place.bad") : this.muro.length !== r && t !== "move" && Je("order.work"), this.muroPrevia = [], this.renderMuro();
  }
  /** desfaz o último traço */
  muroDesfaz() {
    !this.isMuro() || !this.muroTracos.length || (this.muro.length = this.muroTracos.pop(), this.muroPrevia = [], this.renderMuro());
  }
  /** a prévia: verde o que dá para construir, vermelho o que não dá (lugar ocupado); a linha até o cursor, na cor da madeira.
   *  D37: cada bloco é pago quando o coletor começa a construí-lo; para desenhar, basta o material do primeiro bloco */
  renderMuro() {
    const t = this.world, a = t.size, s = this.isEstrada() ? this.placeKey : t.muroDaEra(t.players[pt].era) ?? this.placeKey, o = t.canAfford(pt, lt[wt[s]].cost), i = this.muroPrevia.filter((l) => !this.muro.includes(l)), n = [...this.muro, ...i], r = n.map((l) => o && t.canPlace(pt, s, l % a, Math.floor(l / a)));
    this.wallTiles = this.muro.filter((l, d) => r[d]), this.place = { tx: 0, tz: 0, ok: this.wallTiles.length > 0 }, this.scene.setWallGhost(n, r, this.muro.length, s), this.hud.setMode("place", this.place.ok, this.wallTiles.length, this.placeKey, this.muro.length);
  }
  movePlace(t, a) {
    if (this.mode !== "place") return;
    if (this.isMuro()) {
      const l = this.world.size, d = Math.floor(t), c = Math.floor(a), h = this.muro[this.muro.length - 1];
      if (d < 0 || c < 0 || d >= l || c >= l) return;
      this.muroPrevia = h === void 0 ? [c * l + d] : this.wallLine(h % l, Math.floor(h / l), d, c).slice(1, Ve - this.muro.length + 1), this.renderMuro();
      return;
    }
    const s = this.world, o = lt[wt[this.placeKey]], i = Math.round(t - o.size / 2), n = Math.round(a - o.size / 2), r = s.canPlace(pt, this.placeKey, i, n) && s.canAfford(pt, o.cost);
    this.place = { tx: i, tz: n, ok: r }, this.scene.setGhost(this.placeKey, i, n, r), this.hud.setMode("place", r, -1, this.placeKey);
  }
  confirmPlace(t) {
    const a = this.world, s = this.own((i) => this.sel.has(i) && a.kind[i] === mt.villager);
    if (this.mode !== "place" || !s.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(b("place.bad"), void 0, void 0, "place"), Je("place.bad");
      return;
    }
    if (this.isMuro()) {
      this.send({ type: this.isEstrada() ? "road" : "wall", player: pt, ids: s, tiles: this.wallTiles.slice() }), Je("place"), wo(this.isEstrada() ? "construir" : "muralha");
      const i = this.wallTiles[0];
      this.scene.ping(i % a.size + 0.5, Math.floor(i / a.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    this.send({ type: "build", player: pt, ids: s, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), Je("place"), wo("construir");
    const o = lt[wt[this.placeKey]];
    this.scene.ping(this.place.tx + o.size / 2, this.place.tz + o.size / 2, "work"), t && a.canAfford(pt, { wood: (o.cost.wood ?? 0) * 2, stone: (o.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    if (!this.ended) {
      if (it) {
        this.setMode("normal");
        const t = Oo();
        if (t && it.ativo && !this.paused) {
          this.paused = !0;
          const a = it.host.turno(this.world, !0);
          a && it.conn.turno(a), it.conn.pausa(!0);
        }
        yt.showOnline(Re, t);
        return;
      }
      if (bt?.papel === "convidado") {
        this.setMode("normal"), yt.showGuest(bt.parceiro, Re, bt.papelConvidado);
        return;
      }
      if (this.paused = !0, this.setMode("normal"), yt.showPause(Math.floor(this.world.tick / 600), Re, this.owner, pi(), this.world.beta), Oa(), bt?.papel === "anfitriao" && bt.ativo) {
        const t = bt.host.turno(this.world, !0);
        t && bt.amigo.turno(t), ni(!0);
      }
    }
  }
  dicas() {
    this.ended || (this.setMode("normal"), !bt && !it && !this.paused && (this.paused = !0, this.dicasPausou = !0), this.hud.abrirDicas(() => {
      this.dicasPausou && (this.dicasPausou = !1, yt.open || (this.paused = !1));
    }));
  }
  resume() {
    const t = this.paused;
    this.paused = this.dicasPausou, yt.hide(), bt?.papel === "anfitriao" && bt.ativo && ni(!1), it && Oo() && it.ativo && t && it.conn.pausa(!1);
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = ba();
    !this.owner && t && (On("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended || this.guest || this.naRede) return "fail";
    await Oa(), this.adopt();
    const { d: t, ok: a } = n0(this.world, this.owner), s = await l0(t, this.owner);
    return a || $a("problema", { tipo: "aparelho" }), s === "fail" && $a("problema", { tipo: "nuvem" }), s === "ok" ? a ? "both" : "cloudOnly" : a ? s === "fail" ? "localOnly" : s === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended || this.guest || this.naRede) return;
    this.adopt();
    const { d: a, ok: s } = n0(this.world, this.owner);
    !s && !t && $a("problema", { tipo: "aparelho" }), l0(a, this.owner, t).then((o) => {
      o === "fail" && !t && $a("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  /** ordem de quem joga: sozinho ou anfitrião, entra no jogo; no jogo de um amigo, vai para o anfitrião, que a põe no jogo */
  send(t) {
    const a = kl(this.world, Fs(), t);
    if (!a) return !1;
    if (bt?.papel === "convidado") bt.amigo.ordem(cn(a));
    else if (it && !Oo()) {
      if (!it.ativo) return !1;
      it.conn.ordem(cn(a));
    } else this.world.issue(a, !0);
    return !0;
  }
  /** o anfitrião vê onde o amigo mandou (o mesmo sinal das ordens) */
  pingAmigo(t) {
    const a = this.world, s = a.size;
    t.type === "move" || t.type === "amove" || t.type === "rally" ? this.scene.ping(t.x / 256, t.z / 256, t.type === "amove" ? "attack" : "move") : t.type === "gather" ? this.scene.ping(t.k % s + 0.5, Math.floor(t.k / s) + 0.5, "work") : (t.type === "work" || t.type === "attack") && a.alive[t.target] ? this.scene.ping(a.x[t.target] / 256, a.z[t.target] / 256, t.type === "attack" && a.owner[t.target] !== Rt ? "attack" : "work") : t.type === "build" && this.scene.ping(t.tx + 1, t.tz + 1, "work");
  }
  /** câmera e seleção, para continuar iguais quando o jogo recarrega (o amigo entrou ou pediu o jogo de novo) */
  view() {
    const t = this.scene.camera;
    return { tx: t.tx, tz: t.tz, yaw: t.tyaw, dist: t.tdist, sel: [...this.sel] };
  }
  setView(t) {
    const a = this.scene.camera;
    a.x = a.tx = t.tx, a.z = a.tz = t.tz, a.yaw = a.tyaw = t.yaw, a.dist = a.tdist = t.dist;
    for (const s of t.sel) this.world.isUnit(s) && this.world.owner[s] === pt && this.sel.add(s);
  }
  /** convidado: anda até o passo que o anfitrião já mandou (mais depressa quando fica para trás) e confere a partida */
  seguir(t, a) {
    const s = this.world, o = a.guest, i = o.ate - s.tick;
    if (i > 0) {
      this.acc += t * (a.pausado || i > 30 ? 6 : i > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= ra && s.tick < o.ate && r < 40; )
        s.step(), o.depoisDoPasso(s), this.acc -= ra, r++;
    }
    s.tick >= o.ate && (this.acc = Math.min(this.acc, ra * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.amigo.reconectando && (a.parado = n, this.hud.setFaixa(n ? b("amigo.espera") : a.pausado ? b("amigo.pausado") : null)), (o.divergiu || o.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.amigo.pedir(), this.hud.setFaixa(b("amigo.sincronizando")), Qt("amigo", { acao: "sincronizou", papel: "convidado" }));
  }
  /** partida online, quem não dá o ritmo: como o convidado do jogo com um amigo */
  seguirOnline(t, a) {
    const s = this.world, o = a.guest, i = o.ate - s.tick;
    if (i > 0) {
      this.acc += t * (a.pausado || i > 30 ? 6 : i > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= ra && s.tick < o.ate && r < 40; )
        s.step(), o.depoisDoPasso(s), this.acc -= ra, r++;
    }
    s.tick >= o.ate && (this.acc = Math.min(this.acc, ra * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.conn.reconectando && (a.parado = n, this.hud.setFaixa(n ? b("online.esperaAnf", { name: a.nomes[a.anf] || "" }) : a.pausado ? b("online.pausado", { name: a.nomes[a.anf] || "" }) : null)), (o.divergiu || o.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.conn.pedir(), this.hud.setFaixa(b("online.sincronizando")));
  }
  frame(t) {
    const a = this.world, s = bt, o = s?.papel === "anfitriao" && s.ativo ? s.host : null, i = it, n = i && i.ativo && i.anf === i.eu ? i.host : null;
    if (s?.papel === "convidado")
      s.ativo && this.seguir(t, s);
    else if (i && !n)
      i.ativo && this.seguirOnline(t, i);
    else if (!this.paused) {
      this.acc += t;
      let d = 0;
      for (; this.acc >= ra && d < 4; )
        a.step(), o?.depoisDoPasso(a), n?.depoisDoPasso(a), this.acc -= ra, d++;
      d === 4 && (this.acc = 0);
    }
    if (o) {
      const d = o.turno(a);
      d && s.amigo.turno(d);
    }
    if (n) {
      const d = n.turno(a);
      d && i.conn.turno(d);
    }
    const r = a.drain();
    if (r.length) {
      this.scene.consume(r), this.hud.onEvents(r), this.snd.onEvents(r);
      for (const d of r)
        (d.t === "tree" || d.t === "res" && a.resKind[d.k] === 0) && this.minimap.clearTile(d.k), d.t === "age" && d.player === pt && !this.guest && !this.naRede && Qt("era_nova", { era: d.era, min: zi(a.tick) }), d.t === "msg" && d.player === pt && !this.guest && !this.naRede && this.medir(d.key), d.t === "msg" && d.player === pt && d.key === `defeated.${pt}` && this.naRede && a.outcome === "playing" && this.perdeuTribo(), d.t === "end" && !this.ended && this.end(a.resultadoDe(pt, d));
    }
    this.input.update(t);
    for (const d of [...this.sel]) a.alive[d] || this.sel.delete(d);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / ra, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && !this.guest && !this.naRede && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const l = Math.floor(a.tick / 600);
    if (!this.ended && !this.guest && !this.naRede && l > this.marco) {
      for (const d of nh) d > this.marco && d <= l && Qt("marco_partida", { min: d });
      this.marco = l;
    }
    if (!g0 && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (g0 = !0, Qt("desempenho", { fps: oh(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][Re] }))), ii && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      ii = !1;
      const d = this.autoN / this.autoT;
      d < 40 && Re < 2 && (Ql(Re + 1), this.scene.setQuality(Re), this.hud.toast(b("q.auto", { q: b(`q.${ms[Re].key}`), fps: Math.round(d) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [a, s] = t.split("."), o = this.world, i = o.players[pt].era, n = Number(s) === ze ? "barbaros" : "rival";
    a === "centerDanger" ? Qt("centro_em_perigo", { por: n, era: i }) : a === "centerLost" ? this.derrotaPor = n : a === "hunger" && Qt("fome", { era: i, ano: Math.min(3, o.year) });
  }
  end(t) {
    const a = this.world;
    if (this.naRede) {
      Qt("amigo", { acao: t === "victory" ? "venceu" : "perdeu", papel: Oo() ? "anfitriao" : "convidado" }), this.ended = !0, this.setMode("normal"), yt.showEnd(t, Math.floor(a.tick / 600), a.players[pt].era, it?.modo === 2 ? "time" : "tribo");
      return;
    }
    this.guest || (t === "victory" ? Qt("fim_vitoria", { era: a.players[pt].era, min: zi(a.tick) }) : Qt("fim_derrota", { por: this.derrotaPor || "rival", min: zi(a.tick) }), qn(this.owner), gf(this.owner)), this.ended = !0, this.setMode("normal"), yt.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[pt].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let W = null, bt = null;
const tc = (e, t, a = null) => ({ amigo: e, papel: t, parceiro: "", ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), host: new Bl(), guest: new Dl(), papelConvidado: a });
function Fs() {
  const e = bt;
  return !e || !e.papelConvidado ? null : e.papel === "convidado" ? e.papelConvidado : e.ativo ? fi(e.papelConvidado) : null;
}
function ni(e) {
  const t = bt;
  t?.papel === "anfitriao" && t.amigo.pausa(e, ju(t.papelConvidado));
}
const ri = (e, t) => yt.setConvite({ estado: t, codigo: e.amigo.codigo, nome: t === "junto" ? e.parceiro : void 0, papel: e.papelConvidado ?? void 0 });
async function Yf(e) {
  if (!(!W || bt || W.ended)) {
    yt.setConvite({ estado: "criando" });
    try {
      bt = tc(await Ys.convidar(Zf), "anfitriao", e), Qt("amigo", { acao: "convidou", papel: e });
    } catch {
      yt.setConvite({ estado: "erro" });
    }
  }
}
function Jf() {
  const e = bt;
  if (!e || e.papel !== "anfitriao" || !e.papelConvidado) return;
  e.papelConvidado = fi(e.papelConvidado), e.ativo && ni(W?.paused ?? !1), ri(e, e.ativo ? "junto" : "aberto"), W?.aplicarPapel();
  const t = Fs();
  t && W?.hud.toast(b("papel.agora", { papel: b(`papel.${t}`) }));
}
function Zf(e) {
  const t = bt;
  if (!(!t || t.papel !== "anfitriao"))
    switch (e.t) {
      case "codigo":
        ri(t, "aberto");
        break;
      case "entrou": {
        const a = t.ativo;
        t.parceiro = e.nome, ri(t, "junto"), m0(!a), a || (W?.hud.toast(t.papelConvidado ? b("amigo.entrouComo", { name: e.nome, papel: b(`papel.${t.papelConvidado}`) }) : b("amigo.entrou", { name: e.nome })), Qt("amigo", { acao: "entrou", papel: "anfitriao" }));
        break;
      }
      case "saiu":
        p0(t, e.nome);
        break;
      case "ordem":
        if (t.ativo && W && !W.ended) {
          const a = W.world, s = t.host.ordemDoAmigo(a, e.d, pt, (o) => kl(a, t.papelConvidado, o));
          s && W.pingAmigo(s);
        }
        break;
      // só o que é do papel dele (D31)
      case "pede":
        t.ativo && (m0(!1), Qt("amigo", { acao: "sincronizou", papel: "anfitriao" }));
        break;
      case "caiu":
        W?.hud.setFaixa(b("amigo.caiu"));
        break;
      case "reconectou":
        W?.hud.setFaixa(null), e.sozinho && t.ativo && p0(t, t.parceiro);
        break;
      case "erro":
        ec(!1), yt.setConvite({ estado: "erro" });
        break;
    }
}
function p0(e, t) {
  e.ativo = !1, W && (W.world.onApplied = null, W.hud.setAmigo(null), W.hud.toast(b(e.papelConvidado ? "amigo.saiuTudo" : "amigo.saiu", { name: t })), W.aplicarPapel()), ri(e, "aberto");
}
function m0(e) {
  const t = W, a = bt;
  if (!t || !a || t.ended) return;
  const s = JSON.stringify(In(t.world)), o = Ps(JSON.parse(s));
  for (const n of t.world.takePendingExt()) o.issue(n, !0);
  const i = t.paused && !e;
  pa(o, t.owner, t.view()), a.host.ligar(o), a.ativo = !0, a.amigo.jogo(s), W.hud.setAmigo(a.parceiro), W.aplicarPapel(), i ? W.pause() : ni(!1);
}
function ec(e = !0) {
  const t = bt;
  !t || t.papel !== "anfitriao" || (bt = null, t.amigo.sair(), W && (W.world.onApplied = null, W.hud.setAmigo(null), W.hud.setFaixa(null), W.aplicarPapel()), yt.setConvite(null), e && Qt("amigo", { acao: "encerrou", papel: "anfitriao" }));
}
function Qf(e) {
  bt || W || (yt.setAmigoMsg(b("amigo.entrando"), !0), bt = tc(Ys.entrar(e, tp), "convidado"));
}
function tp(e) {
  const t = bt;
  if (!(!t || t.papel !== "convidado"))
    switch (e.t) {
      case "oi":
        t.parceiro = e.nome, yt.setAmigoMsg(b("amigo.entrandoEm", { name: e.nome }), !0);
        break;
      case "jogo": {
        if (e.v !== Xs) {
          Ri(b("amigo.erro.t"), b("amigo.versao"));
          return;
        }
        let a = null;
        try {
          a = Ps(e.d);
        } catch {
          a = null;
        }
        if (!a) {
          t.pediu = !0, t.amigo.pedir();
          return;
        }
        const s = !W;
        pa(a, "", W ? W.view() : void 0), t.guest.ligar(a), t.ativo = !0, t.pediu = !1, t.parado = !1, t.ultimoTurno = performance.now(), W.hud.setAmigo(t.parceiro), W.hud.setFaixa(t.pausado ? b("amigo.pausado") : null), s && Qt("amigo", { acao: "entrou", papel: "convidado" });
        break;
      }
      case "turno":
        t.ativo && W && (t.ultimoTurno = performance.now(), t.guest.receber(W.world, e.d));
        break;
      case "pausa": {
        t.pausado = e.on, t.ultimoTurno = performance.now(), W?.hud.setFaixa(e.on ? b("amigo.pausado") : null);
        const a = _u(e.papel);
        if (a !== t.papelConvidado) {
          const s = t.papelConvidado;
          t.papelConvidado = a, W?.aplicarPapel(), a && W && W.hud.toast(b(s ? "papel.agora" : "papel.voceE", { papel: b(`papel.${a}`) }));
        }
        break;
      }
      case "espera":
        W?.hud.setFaixa(b("amigo.espera"));
        break;
      case "voltou":
        t.ultimoTurno = performance.now(), t.parado = !1, W?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // o jogo vem de novo
      case "caiu":
        W?.hud.setFaixa(b("amigo.caiu")), Qt("amigo", { acao: "caiu", papel: "convidado" });
        break;
      case "reconectou":
        t.ultimoTurno = performance.now(), t.parado = !1, W?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // a sala avisa o anfitrião, que manda o jogo de novo
      case "fim":
        Ri(b("amigo.fim.t"), b("amigo.fim")), Qt("amigo", { acao: "fim", papel: "convidado" });
        break;
      case "erro":
        Ri(b("amigo.erro.t"), !e.msg || e.msg === "rede" ? b("amigo.semRede") : e.msg);
        break;
    }
}
function Ri(e, t) {
  const a = bt;
  bt = null, a?.amigo.sair(), W ? (W.paused = !0, W.hud.setFaixa(null), yt.showInfo(e, t)) : yt.setAmigoMsg(t, !1);
}
let it = null;
function ws(e) {
  W?.hud.toast(e), it && (it.aviso = { texto: e, ate: performance.now() + 4e3 });
}
const Oo = () => !!it && it.anf === it.eu, mn = (e) => e.players.some((t, a) => e.time(a) === e.time(pt) && !t.defeated), ac = (e) => ({ conn: e, eu: -1, anf: 0, modo: 1, nomes: [], fora: /* @__PURE__ */ new Set(), host: new Bl(), guest: new Dl(), ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), olhando: !1, aviso: null }), Ha = (e) => it?.nomes[e] || b("sala.computador");
async function ep() {
  if (!(it || bt || W)) {
    yt.setPartidaMsg(b("online.criando"), !0);
    try {
      it = ac(await Qs.nova(sc)), Qt("amigo", { acao: "criou", papel: "anfitriao" });
    } catch {
      yt.setPartidaMsg(b("online.erroCriar"), !1);
    }
  }
}
function ap(e) {
  it || bt || W || (yt.setPartidaMsg(b("online.entrando"), !0), it = ac(Qs.entrar(e, sc)));
}
function sc(e) {
  const t = it;
  if (t)
    switch (e.t) {
      case "sala":
        t.eu = e.sala.eu, yt.setPartidaMsg("", !1), yt.showLobby(e.sala);
        break;
      case "comeca":
        sp(t, e.c);
        break;
      case "turno":
        t.ativo && W && t.anf !== t.eu && (t.ultimoTurno = performance.now(), t.guest.receber(W.world, e.d));
        break;
      case "jogo":
        op(t, e.v, e.d);
        break;
      case "pausa":
        t.anf !== t.eu && (t.pausado = e.on, t.ultimoTurno = performance.now(), W?.hud.setFaixa(e.on ? b("online.pausado", { name: Ha(t.anf) }) : null));
        break;
      case "ordem":
        t.anf === t.eu && t.ativo && W && !W.ended && t.nomes[e.v] && !t.fora.has(e.v) && t.host.ordemDoAmigo(W.world, e.d, e.v);
        break;
      case "pede":
        t.anf === t.eu && t.ativo && _o();
        break;
      case "sinal":
        W && t.ativo && W.world.aliado(pt, e.v) && W.mostrarSinal(e.v, e.tipo, e.x, e.z);
        break;
      case "caiu":
        if (!W) break;
        e.v === t.anf ? W.hud.setFaixa(b("online.esperaAnf", { name: Ha(e.v) })) : ws(b("online.caiu", { name: Ha(e.v) }));
        break;
      case "voltou":
        W && (ws(b("online.voltou", { name: Ha(e.v) })), e.v === t.anf && W.hud.setFaixa(b("online.sincronizando"))), t.anf === t.eu && _o();
        break;
      case "saiu":
        t.fora.add(e.v), W && ws(b("online.saiu", { name: Ha(e.v) })), t.anf === t.eu && t.ativo && W && !W.ended && W.world.players[e.v] && !W.world.players[e.v].ai && (W.world.issue({ type: "ia", player: e.v }, !0), Qt("amigo", { acao: "assumiu", papel: "anfitriao" }));
        break;
      case "anfitriao":
        t.anf = e.v;
        for (const a of e.fora) t.fora.add(a);
        if (e.v === t.eu) {
          if (!W || !t.ativo) {
            t.conn.cede();
            break;
          }
          for (const a of t.fora) W.world.players[a] && !W.world.players[a].ai && W.world.issue({ type: "ia", player: a }, !0);
          ws(b("online.anfitriaoVoce")), _o();
        } else
          t.pediu = !0, ws(b("online.anfitriao", { name: Ha(e.v) })), W?.hud.setFaixa(b("online.sincronizando"));
        break;
      case "reconectando":
        W ? W.hud.setFaixa(b("online.reconectando")) : yt.setPartidaMsg(b("online.reconectando"), !0);
        break;
      case "fim":
        gn(e.motivo === "criador" ? b("sala.fechou") : b("online.fim"));
        break;
      case "erro":
        gn(!e.msg || e.msg === "rede" ? b("online.semRede") : e.msg);
        break;
    }
}
function sp(e, t) {
  e.eu = t.eu, e.anf = t.anf, e.modo = t.modo, e.nomes = t.vagas;
  for (const o of t.fora) e.fora.add(o);
  if (pt = t.eu, t.volta) {
    e.anf === e.eu ? W && e.ativo ? _o() : e.conn.cede() : (e.pediu = !0, W?.hud.setFaixa(b("online.sincronizando")));
    return;
  }
  const a = ei[t.modo] ?? ei[1], s = new $n(t.semente, a.vagas, { humanos: Gu(t.vagas), times: a.times, difficulty: t.dif });
  pa(s, ""), e.anf === e.eu ? e.host.ligar(s) : e.guest.ligar(s), e.ativo = !0, e.ultimoTurno = performance.now(), W?.hud.toast(b("online.voceE", { cor: b(`cor.${t.eu}`) })), e.anf === e.eu && Qt("amigo", { acao: "comecou", papel: "anfitriao" });
}
function op(e, t, a) {
  if (e.anf === e.eu || W?.ended) return;
  if (t !== Xs) {
    gn(b("amigo.versao"));
    return;
  }
  let s = null;
  try {
    s = Ps(a);
  } catch {
    s = null;
  }
  if (!s) {
    e.conn.pedir();
    return;
  }
  pt = e.eu, pa(s, "", W ? W.view() : void 0), e.guest.ligar(s), e.ativo = !0, e.pediu = !1, e.parado = !1, e.ultimoTurno = performance.now(), W.hud.setFaixa(e.pausado ? b("online.pausado", { name: Ha(e.anf) }) : null);
}
function _o() {
  const e = W, t = it;
  if (!e || !t || e.ended) return;
  const a = JSON.stringify(In(e.world)), s = Ps(JSON.parse(a));
  for (const n of e.world.takePendingExt()) s.issue(n, !0);
  const o = e.paused, i = yt.kind;
  pa(s, "", e.view()), t.host.ligar(s), t.ativo = !0, t.pediu = !1, t.conn.jogo(a), o ? (W.paused = !0, i === "online" && yt.showOnline(Re, !0), t.conn.pausa(!0)) : t.conn.pausa(!1), W.hud.setFaixa(null);
}
function gn(e) {
  const t = it;
  if (it = null, t?.conn.sair(), pt = 0, W) {
    W.paused = !0, W.hud.setFaixa(null), yt.showInfo(b("online.titulo"), e);
    return;
  }
  lo(), yt.showStartOnline(Xa), yt.setPartidaMsg(e, !1);
}
function ip() {
  const e = it;
  e && (e.ativo && Qt("amigo", { acao: "saiu", papel: e.anf === e.eu ? "anfitriao" : "convidado" }), Uo("online"));
}
let g0 = !1;
const wo = (e) => $a("ordem_primeira", { tipo: e }), Bi = (e, t) => Qt("partida_continuada", { era: e.players[pt].era, de: t });
Dn.addEventListener("webglcontextlost", () => $a("problema", { tipo: "webgl" }));
const oc = {
  cont: async () => {
    const e = Xa.save;
    if (!e) return;
    if (e.from === "cloud") {
      const a = await ql();
      let s = null;
      try {
        s = a ? Ps(a) : null;
      } catch {
        s = null;
      }
      if (s && a) {
        nf(a, e.owner), pa(s, e.owner), Bi(s, "nuvem");
        return;
      }
      $a("problema", { tipo: "carregar" });
    }
    const t = rf(e.owner);
    if (!t) {
      $a("problema", { tipo: "carregar" }), qn(e.owner), lo();
      return;
    }
    if (e.adopt) {
      const a = ba();
      if (a) {
        On("", a), pa(t, a), Bi(t, "aparelho");
        return;
      }
    }
    pa(t, e.owner), Bi(t, "aparelho");
  },
  start: (e, t, a) => {
    pa(new $n(oi("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, regras: a, testUnits: Math.min(600, oi("units", 0)) }), ba()), Qt("partida_nova", { rivais: e, dif: ih[t] ?? "normal" }), (va.get("dicas") === "1" || va.get("autostart") !== "1" && !Du()) && W?.dicas();
  },
  resume: () => W?.resume(),
  save: () => W?.save() ?? Promise.resolve("fail"),
  quit: () => {
    W?.autoSave(), Uo();
  },
  quality: (e) => {
    Ql(e), ii = !1, W?.scene.setQuality(e);
  },
  help: () => {
    W?.resume(), W?.hud.openHelp();
  },
  watch: () => yt.hide(),
  toMenu: () => Uo(it ? "online" : ""),
  login: () => {
    r0();
  },
  profile: () => {
    pf();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await r0(), W && is()) {
      const e = await W.save();
      yt.updatePause(W.owner, pi(), e);
    }
  },
  convidar: (e) => {
    Yf(e);
  },
  trocarPapeis: () => Jf(),
  encerrarConvite: () => ec(),
  entrarAmigo: (e) => Qf(e),
  sairAmigo: () => {
    const e = bt;
    bt = null, e?.amigo.sair(), Uo();
  },
  criarPartida: () => {
    ep();
  },
  entrarPartida: (e) => ap(e),
  cfgPartida: (e, t) => it?.conn.cfg(e, t),
  trocarVagas: (e, t) => it?.conn.trocar(e, t),
  comecarPartida: () => it?.conn.comecar(),
  sairPartida: () => ip(),
  olharPartida: () => {
    yt.hide(), it && W && (it.olhando = !0, mn(W.world) || W.scene.setFog(!1));
  }
  // sem o time, vê o mapa inteiro
}, yt = new tf(oc);
function pa(e, t, a) {
  W?.dispose(), W = new Xf(e, t), a && W.setView(a), yt.hide();
  const s = W;
  window.__amigo = () => bt && { papel: bt.papel, ativo: bt.ativo, pediu: bt.pediu, divergiu: bt.guest.divergiu, ate: bt.guest.ate, parceiro: bt.parceiro }, window.__online = () => it && { eu: it.eu, anf: it.anf, ativo: it.ativo, pediu: it.pediu, divergiu: it.guest.divergiu, fora: [...it.fora], olhando: it.olhando }, window.__origines = {
    world: e,
    scene: s.scene,
    input: s.input,
    game: s,
    screen: (o, i, n = 0.5) => {
      const r = s.scene.camera.cam.position.clone().set(o, zt(e.map, o, i) + n, i).project(s.scene.camera.cam);
      return [(r.x + 1) / 2 * innerWidth, (1 - r.y) / 2 * innerHeight, r.z < 1 ? 1 : 0];
    }
  };
}
function Uo(e = "") {
  if (bt) {
    const t = bt;
    bt = null, t.amigo.sair();
  }
  if (it) {
    const t = it;
    it = null, t.conn.sair();
  }
  pt = 0, yt.setConvite(null), W?.dispose(), W = null, tt.setScene("menu"), pe.menu(), oo.setClearColor(1911332, 1), oo.clear(), lo(), e === "online" && (yt.setPartidaMsg("", !1), yt.showStartOnline(Xa));
}
let Xa = { acc: "loading", save: null, other: null }, Di = 0;
async function lo() {
  const e = ++Di;
  if (Xa = b0(null, is()), yt.showStart(Xa), !is()) return;
  const t = await mf();
  e !== Di || yt.kind !== "start" || (await np(t), !(e !== Di || yt.kind !== "start") && (Xa = b0(t, !1), yt.updateStart(Xa)));
}
async function np(e) {
  const t = ba();
  if (!t || cf()) return;
  const a = lf("");
  if (a && e && !Us(t)) {
    const s = await ql();
    s && s.seed === a.seed && a.tick >= s.tick && On("", t);
  }
  df();
}
function b0(e, t) {
  const a = pi();
  if (a === "loading") return { acc: a, save: null, other: null };
  const s = ba();
  if (s) {
    const i = e ? bf(e) : null, n = Us(s);
    if (i && (!n || (i.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: a, save: { meta: i, from: "cloud", owner: s, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: a, save: { meta: n, from: "device", owner: s, adopt: !1 }, other: null, pending: t };
    const r = Us("");
    return { acc: a, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const o = Us("");
  return { acc: a, save: o ? { meta: o, from: "device", owner: "", adopt: !1 } : null, other: hf()[0]?.dono ?? null };
}
uf(() => {
  yt.kind === "start" ? lo() : yt.kind === "pause" && W && yt.updatePause(W.owner, pi());
});
addEventListener("resize", () => {
  oo.setSize(innerWidth, innerHeight, !1), W?.resize();
});
oo.setSize(innerWidth, innerHeight, !1);
let bn = performance.now();
const ic = () => W?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  bn = performance.now(), document.hidden ? ic() : Oa();
});
addEventListener("pagehide", () => {
  if (ic(), bt?.papel === "anfitriao") {
    const e = bt;
    bt = null, e.amigo.sair();
  }
  if (it) {
    const e = it;
    it = null, e.conn.sair();
  }
});
let Ro = 0, Ni = 0, nc = !1;
va.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  nc = e;
}, step: (e) => W?.frame(e) });
function rc(e) {
  const t = Math.min(0.1, (e - bn) / 1e3);
  bn = e, W && !nc && W.frame(t), Ni++, Ro += t, Ro > 1 && (window.__fps = Ni / Ro, Ni = 0, Ro = 0), requestAnimationFrame(rc);
}
requestAnimationFrame(rc);
const lc = va.get("sons") === "1" || location.hash === "#sons";
tt.install();
lc || pe.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && Je(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: Kf, measure: Vf, audio: tt, played: pn, music: pe };
lc ? Gf() : va.get("autostart") === "1" ? oc.start(Math.min(3, Math.max(1, oi("players", 4) - 1)), Math.min(2, oi("difficulty", 1)), va.get("regras") === "beta" ? "beta" : "normal") : (lo(), ff());
Qu().then((e) => yt.setAmigoDisponivel(e));
Mf().then((e) => yt.setOnlineDisponivel(e));
const Fi = document.getElementById("loading");
Fi && (Fi.style.opacity = "0", setTimeout(() => Fi.remove(), 450));
