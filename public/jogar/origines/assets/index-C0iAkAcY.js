var Dr = Object.defineProperty;
var Hr = (e, t, a) => t in e ? Dr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : e[t] = a;
var m = (e, t, a) => Hr(e, typeof t != "symbol" ? t + "" : t, a);
import { C as Jt, M as qs, a as Ur, R as _r, P as ei, V as wt, B as Te, b as He, c as Wr, S as vn, D as Gr, I as yn, d as Si, e as Na, f as le, g as aa, F as va, E as kn, Q as to, h as ue, G as ja, i as Ht, T as Vr, j as Ci, k as pe, l as xn, m as ga, n as Mn, o as eo, p as zn, q as Kr, r as Yr, s as Xr, t as Jr, U as Zr, L as Qr, u as tl, H as el, v as al, w as sl, W as il, A as ol, x as nl } from "./three-DvEW5KnM.js";
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
const K = 256;
function ua(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const Ve = (e, t) => Math.trunc(e / t), An = 10, Tn = 2, es = [30, 60, 90, 115, 135, 150], fa = ["food", "wood", "stone", "metal", "coins"], _ = [
  { key: "villager", cls: "villager", hp: 25, atk: 3, armor: 0, range: 0.6, cd: 15, speed: 0.95, radius: 0.28, sight: 8, pop: 1, cost: { food: 50 }, time: 20, era: 0, hunt: 2.6 },
  { key: "warrior", cls: "infantry", hp: 40, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 40, wood: 20 }, time: 18, era: 0, next: "axeman" },
  { key: "hunter", cls: "ranged", hp: 30, atk: 4, armor: 0, range: 5, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 30 }, time: 20, era: 0, next: "archer", proj: "spear" },
  { key: "dog", cls: "scout", hp: 30, atk: 2, armor: 0, range: 0.6, cd: 10, speed: 1.9, radius: 0.25, sight: 12, pop: 1, cost: { food: 40 }, time: 15, era: 0 },
  { key: "axeman", cls: "infantry", hp: 55, atk: 7, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, wood: 25 }, time: 18, era: 1, next: "swordsman" },
  { key: "archer", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 40 }, time: 22, era: 1, next: "slinger", proj: "arrow" },
  { key: "spearman", cls: "spear", hp: 50, atk: 5, armor: 1, range: 0.9, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 35, wood: 25 }, time: 18, era: 1, bonus: [{ vs: "animal", dmg: 6 }, { vs: "cavalry", dmg: 8 }] },
  { key: "deer", cls: "animal", hp: 12, atk: 0, armor: 0, range: 0, cd: 10, speed: 0.9, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 150, mode: "flee", run: 1.8 } },
  { key: "boar", cls: "animal", hp: 40, atk: 3, armor: 0, range: 0.7, cd: 15, speed: 0.8, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 250, mode: "fight", run: 1.6 } },
  { key: "wolf", cls: "animal", hp: 20, atk: 3, armor: 0, range: 0.7, cd: 12, speed: 1.1, radius: 0.3, sight: 5, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 0, mode: "predator", run: 2 } },
  { key: "aurochs", cls: "animal", hp: 60, atk: 5, armor: 1, range: 0.8, cd: 15, speed: 0.7, radius: 0.45, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 400, mode: "fight", run: 1.4 } },
  { key: "barbarian", cls: "infantry", hp: 45, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 0, cost: {}, time: 0, era: 0 },
  // Era III (M2)
  { key: "swordsman", cls: "infantry", hp: 60, atk: 8, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, metal: 20 }, time: 20, era: 2, bonus: [{ vs: "spear", dmg: 3 }] },
  { key: "slinger", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 18, speed: 1.05, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, stone: 25 }, time: 20, era: 2, proj: "stone", bonus: [{ vs: "infantry", dmg: 2 }] },
  { key: "horseman", cls: "cavalry", hp: 90, atk: 8, armor: 1, range: 0.8, cd: 15, speed: 1.75, radius: 0.45, sight: 9, pop: 2, cost: { food: 60, metal: 35 }, time: 26, era: 2, bonus: [{ vs: "ranged", dmg: 4 }, { vs: "siege", dmg: 10 }] },
  { key: "ram", cls: "siege", hp: 160, atk: 35, armor: 4, range: 1.15, cd: 30, speed: 0.5, radius: 0.6, sight: 5, pop: 3, cost: { wood: 150, metal: 30 }, time: 35, era: 2, siege: !0 }
], ut = Object.fromEntries(_.map((e, t) => [e.key, t])), kt = 60, xt = 100, Et = [
  { key: "center", hp: 1200, size: 4, sight: 14, cost: {}, time: 0, era: 0, pop: [8, 10, 10, 10, 10, 10], drop: !0, trains: [["villager"], ["villager"], ["villager"]] },
  { key: "house", hp: 150, size: 2, sight: 5, cost: { wood: 30 }, time: 20, era: 0, pop: [4, 5, 6, 6, 6, 10], buildable: !0 },
  { key: "depot", hp: 200, size: 2, sight: 6, cost: { wood: 60 }, time: 25, era: 0, drop: !0, buildable: !0 },
  { key: "military", hp: 300, size: 3, sight: 7, cost: { wood: 100 }, time: 40, era: 0, trains: [["warrior", "hunter", "dog"], ["axeman", "spearman", "archer", "dog"], ["swordsman", "spearman", "slinger", "dog"]], buildable: !0 },
  { key: "farm", hp: 80, size: 3, sight: 3, cost: { wood: 60 }, time: 15, era: 1, walk: !0, buildable: !0 },
  { key: "pen", hp: 150, size: 3, sight: 5, cost: { wood: 80 }, time: 30, era: 1, buildable: !0 },
  { key: "sanctuary", hp: 250, size: 2, sight: 7, cost: { wood: 40, stone: 60 }, time: 40, era: 1, buildable: !0 },
  { key: "camp", hp: 400, size: 4, sight: 8, cost: {}, time: 0, era: 0 },
  // Era III (M2)
  { key: "forge", hp: 350, size: 2, sight: 6, cost: { wood: 100, stone: 60 }, time: 40, era: 2, buildable: !0, research: ["bronze", "iron"] },
  { key: "market", hp: 350, size: 3, sight: 7, cost: { wood: 150, stone: 40 }, time: 45, era: 2, buildable: !0, market: !0, research: ["wheel"] },
  { key: "stable", hp: 350, size: 3, sight: 7, cost: { wood: 150 }, time: 45, era: 2, buildable: !0, trains: [[], [], ["horseman"]] },
  { key: "workshop", hp: 350, size: 3, sight: 6, cost: { wood: 175 }, time: 45, era: 2, buildable: !0, trains: [[], [], ["ram"]] },
  { key: "wall", hp: 300, size: 1, sight: 2, cost: { stone: 8 }, time: 6, era: 2, buildable: !0, wall: !0 },
  { key: "tower", hp: 450, size: 2, sight: 9, cost: { wood: 60, stone: 120 }, time: 50, era: 2, buildable: !0, tower: { atk: 6, range: 7, cd: 20 } }
], Vt = Object.fromEntries(Et.map((e, t) => [e.key, t])), ao = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], pa = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 }
  // Era IV: chega no M3
], Qe = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], re = 200, js = Object.fromEntries(Qe.map((e, t) => [e.key, t])), Pe = { give: 100, get: 60, fair: 85 }, rl = 300, ta = ["food", "wood", "stone", "metal"], Ta = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28 }, ll = 10, so = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], Be = 6, zt = -1, Ae = 60 * An;
function Xe(e, t, a) {
  let s = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(a | 0, 1442695041) | 0;
  return s = Math.imul(s ^ s >>> 13, 1274126177), ((s ^ s >>> 16) >>> 0) / 4294967296;
}
const ko = (e) => e * e * (3 - 2 * e);
function cl(e, t, a) {
  const s = Math.floor(e), i = Math.floor(t), o = e - s, n = t - i, r = ko(o), l = ko(n), c = Xe(s, i, a), h = Xe(s + 1, i, a), f = Xe(s, i + 1, a), d = Xe(s + 1, i + 1, a);
  return c + (h - c) * r + (f - c) * l + (c - h - f + d) * r * l;
}
function ha(e, t, a, s = 4) {
  let i = 0, o = 0.5, n = 1, r = 0;
  for (let l = 0; l < s; l++)
    i += o * cl(e * n, t * n, a + l * 31), r += o, o *= 0.5, n *= 2.03;
  return i / r;
}
const Ia = (e, t, a) => e < t ? t : e > a ? a : e, xe = (e, t, a) => {
  const s = Ia((a - e) / (t - e), 0, 1);
  return s * s * (3 - 2 * s);
}, oa = (e, t, a) => e + (t - e) * a;
class $n {
  constructor(t) {
    m(this, "a");
    m(this, "b");
    m(this, "c");
    m(this, "d");
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
const Ke = 0, Ds = 1, ba = 2, Je = 3, Ye = 4, Ie = 5, as = (e) => e === Je || e === Ye || e === Ie, io = 2, wn = 1, Ei = 2, Sn = 3, ee = 1, Ne = 2, ke = 3, Se = 1.4142135623730951, Hs = 1.7320508075688772, hl = 0.585, ai = 8.5, dl = 1 / (0.66 * 0.66) - 1, xo = 2, bs = (e, t) => Math.sqrt(e * e + t * t), Cn = { 2: [0, 1], 3: [0.5, Hs / 2], 4: [Se / 2, Se / 2] }, ul = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Hs / 2], [-1, 0], [0.5, -Hs / 2]],
  4: [[Se / 2, Se / 2], [-Se / 2, Se / 2], [-Se / 2, -Se / 2], [Se / 2, -Se / 2]]
};
function ui(e, t, a) {
  const [s, i] = Cn[a];
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
function En(e, t, a = io) {
  const s = Ia(t, 2, 4), i = s === 2 ? 192 : 256, o = i / 2, n = a >= 2, r = 2, l = i / r + 1, c = new Float32Array(l * l), h = i * (s === 2 ? 0.32 : 0.36), f = 13, d = i * 0.075, [u, g] = Cn[s], b = [u * h, g * h], k = [i * 0.21, i * 0.4], v = (C, I) => {
    const [R, F] = ui(C, I, s), j = Math.sqrt(R * R + F * F);
    let D = (ha(R * 0.02 + 7.3, F * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (ha(R * 0.08, F * 0.08, e + 9, 2) - 0.5) * 1.2;
    const et = Math.max(Math.abs(C), Math.abs(I)) / o;
    D += xe(0.8, 0.98, et) * 20 * (0.6 + 0.4 * ha(R * 0.04, F * 0.04, e + 3, 2));
    const dt = F, gt = 2.5 + (ha(R * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (j > d * 0.8) {
      let Zt = 0;
      for (const se of k) Zt = Math.max(Zt, 1 - xe(3, 6, Math.abs(j - se)));
      const oe = oa(-2.2, -0.35, Zt);
      if (n) {
        let se = 0;
        for (const ia of k) se = Math.max(se, 1 - xe(5, 11, Math.abs(j - ia)));
        D = oa(D, Math.min(D, 1), xe(gt + 9 + 12 * se, gt + 3, dt) * (0.75 + 0.25 * se)), D = oa(oe, D, xe(gt, gt + 6.5 + 4 * se, dt));
      } else
        D = oa(D, Math.min(D, 1), xe(gt + 9, gt + 3, dt) * 0.75), D = oa(oe, D, xe(gt, gt + 6.5, dt));
    }
    D = oa(-2.6, D, xe(d, d + 10, j));
    const Pt = bs(R - b[0], F - b[1]);
    return D = oa(2.2, D, xe(f, f + 8, Pt)), D;
  };
  for (let C = 0; C < l; C++) for (let I = 0; I < l; I++) c[C * l + I] = v(I * r - o, C * r - o);
  const M = (C, I) => {
    const R = Ia(C / r, 0, l - 1.001), F = Ia(I / r, 0, l - 1.001), j = Math.floor(R), D = Math.floor(F), et = R - j, dt = F - D, at = c[D * l + j], gt = c[D * l + j + 1], Pt = c[(D + 1) * l + j], Zt = c[(D + 1) * l + j + 1];
    return at + (gt - at) * et + (Pt - at) * dt + (at - gt - Pt + Zt) * et * dt;
  }, y = (C, I, R) => R >= 0.5 && C * C + I * I > dl * r * r, $ = (C, I) => {
    const R = (C + 0.5) / r, F = (I + 0.5) / r, j = Math.floor(R), D = Math.floor(F), et = R - j + F - D, dt = c[D * l + j], at = c[D * l + j + 1], gt = c[(D + 1) * l + j], Pt = c[(D + 1) * l + j + 1];
    return et <= 1 && y(at - dt, gt - dt, (dt + at + gt) / 3) || et >= 1 && y(Pt - gt, Pt - at, (at + gt + Pt) / 3);
  }, q = (C, I) => {
    const R = C >> 1, F = I >> 1, j = C & 1, D = I & 1, et = c[F * l + R], dt = c[F * l + R + 1], at = c[(F + 1) * l + R], gt = c[(F + 1) * l + R + 1], Pt = y(dt - et, at - et, (et + dt + at) / 3), Zt = y(gt - at, gt - dt, (dt + at + gt) / 3), oe = y(dt - et, gt - dt, (et + dt + gt) / 3), se = y(gt - at, at - et, (et + at + gt) / 3);
    return j === D ? Pt && j === 0 || Zt && j === 1 || oe || se : Pt || Zt || (j === 1 ? oe : se);
  }, A = new Uint8Array(i * i), T = new Uint8Array(i * i), w = new Uint16Array(i * i), S = [];
  for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = M(I + 0.5, C + 0.5), F = C * i + I, j = Math.abs(M(I + 1, C + 0.5) - M(I, C + 0.5)) + Math.abs(M(I + 0.5, C + 1) - M(I + 0.5, C));
    R < -0.9 ? A[F] = Je : R < -0.05 ? A[F] = ba : R < 0.55 ? A[F] = Ds : j > 2.2 ? A[F] = Ye : A[F] = Ke;
  }
  const O = ul[s].map(([C, I]) => ({ x: Math.round(o + C * h), z: Math.round(o + I * h), ux: C, uz: I })), z = (C, I, R) => O.some((F) => bs(C - F.x, I - F.z) < R);
  for (let C = 1; C < i - 1; C++) for (let I = 1; I < i - 1; I++) {
    const R = C * i + I;
    if (A[R] !== Ke) continue;
    const [F, j] = ui(I + 0.5 - o, C + 0.5 - o, s), D = bs(F, j);
    let et = ha(F * 0.045 + 13, j * 0.045 - 7, e + 5, 3);
    const dt = bs(F - u * (h + 18), j - g * (h + 18));
    et += xe(16, 6, dt) * 0.35, et += xe(14, 8, j) * -0.25, D < d + 10 && (et -= 0.3);
    const at = M(I + 0.5, C + 0.5);
    et > hl && !z(I, C, 15) && Xe(Math.round(F * 4), Math.round(j * 4), e + 77) > 0.12 ? (T[R] = at > 9 ? Sn : Xe(Math.round(F * 3), Math.round(j * 3), e + 78) < 0.14 ? Ei : wn, w[R] = 100) : Xe(Math.round(F * 2), Math.round(j * 2), e + 79) < 0.012 && !z(I, C, 11) && at < 8 && (T[R] = Ei, w[R] = 100);
  }
  if (n) for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = C * i + I;
    A[R] === Ke && M(I + 0.5, C + 0.5) > ai && (A[R] = Ie);
  }
  if (s === 2 || s === 4) {
    const C = (R, F) => {
      let j = Math.abs(2 * R - (i - 1)), D = Math.abs(2 * F - (i - 1));
      if (s === 4 && D > j) {
        const et = j;
        j = D, D = et;
      }
      return (D + i - 1) / 2 * i + (j + i - 1) / 2;
    };
    for (let R = 0; R < i; R++) for (let F = 0; F < i; F++) {
      const j = R * i + F, D = C(F, R);
      D !== j && (A[j] = A[D], T[j] = T[D], w[j] = w[D]);
    }
    const I = (l - 1) / 2;
    for (let R = 0; R < l; R++) for (let F = 0; F < l; F++) {
      let j = Math.abs(F - I), D = Math.abs(R - I);
      if (s === 4 && D > j) {
        const et = j;
        j = D, D = et;
      }
      c[R * l + F] = c[(D + I) * l + j + I];
    }
  }
  if (n) for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = C * i + I;
    (A[R] === Ke || A[R] === Ie) && q(I, C) && (A[R] = $(I, C) ? Ye : Ie, T[R] = 0, w[R] = 0);
  }
  const B = (C, I, R) => {
    if (s === 2) return C === 0 ? [I, R] : [i - 1 - I, i - 1 - R];
    if (s === 4) {
      let dt = I, at = R;
      for (let gt = 0; gt < C; gt++) {
        const Pt = dt;
        dt = i - 1 - at, at = Pt;
      }
      return [dt, at];
    }
    let F = I + 0.5 - o, j = R + 0.5 - o;
    const D = -0.5, et = Hs / 2;
    for (let dt = 0; dt < C; dt++) {
      const at = F * D - j * et;
      j = F * et + j * D, F = at;
    }
    return [Math.floor(F + o), Math.floor(j + o)];
  }, L = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], E = new $n(e ^ 24301), H = (C, I, R, F) => {
    if (I < 1 || R < 1 || I >= i - 1 || R >= i - 1) return;
    const j = R * i + I;
    A[j] === Je || A[j] === ba || S.some((D) => D.x === I && D.z === R) || (T[j] = 0, w[j] = 0, !n && A[j] === Ye && (A[j] = Ke), S.push({ kind: C, x: I, z: R, amount: F }));
  }, N = O[0];
  -N.uz, N.ux;
  const J = (C, I, R, F, j, D, et) => {
    const dt = [];
    for (let at = 0; at < et; at++) {
      const [gt, Pt] = L[at % L.length];
      dt.push([Math.round(C + R * (j + gt) + -F * (D + Pt) - 0.5), Math.round(I + F * (j + gt) + R * (D + Pt) - 0.5)]);
    }
    return dt;
  }, W = [
    { kind: ee, amount: 125, tiles: J(N.x, N.z, N.ux, N.uz, -5, 6, 6) },
    { kind: Ne, amount: 350, tiles: J(N.x, N.z, N.ux, N.uz, -9, -8, 5) },
    { kind: ke, amount: 400, tiles: J(N.x, N.z, N.ux, N.uz, -15, 14, 5) },
    { kind: ke, amount: 800, tiles: J(o, o, N.ux, N.uz, d + 12, 0, 6) },
    { kind: Ne, amount: 500, tiles: J(o, o, N.ux, N.uz, d + 22, 6, 4) }
  ];
  for (let C = 0; C < s; C++) for (const I of W) for (const [R, F] of I.tiles) {
    const [j, D] = B(C, R, F);
    H(I.kind, j, D, I.amount);
  }
  for (const C of O) for (let I = -8; I <= 7; I++) for (let R = -8; R <= 7; R++) {
    if ((R + 0.5) ** 2 + (I + 0.5) ** 2 >= 50) continue;
    const F = (C.z + I) * i + C.x + R;
    T[F] = 0, w[F] = 0;
  }
  E.next();
  const Z = (C, I) => C > 1 && I > 1 && C < i - 2 && I < i - 2 && (A[I * i + C] === Ke || A[I * i + C] === Ds) && !T[I * i + C] && !S.some((R) => R.x === C && R.z === I), Q = (C, I, R = 8) => {
    for (let F = 0; F < R; F++) for (let j = -F; j <= F; j++) for (let D = -F; D <= F; D++)
      if (Math.max(Math.abs(D), Math.abs(j)) === F && Z(C + D, I + j))
        return [C + D, I + j];
    return [C, I];
  }, mt = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: d + 30, v: 12, n: 3, r: 6 }
  ], lt = [], tt = [], it = (C) => J(C.base === "s" ? N.x : o, C.base === "s" ? N.z : o, N.ux, N.uz, C.u, C.v, 1)[0], [At, _t] = J(o, o, N.ux, N.uz, d + 36, 0, 1)[0], Tt = n ? mt.map((C) => {
    const [I, R] = it(C), F = Array.from({ length: C.n }, (j, D) => {
      const [et, dt] = L[D % L.length];
      return Q(I + et, R + dt, 24);
    });
    return { casa: Z(I, R) ? [I, R] : F[0], spots: F };
  }) : null, ae = n ? Q(At, _t) : null, ie = (C, [I, R]) => {
    const [F, j] = B(C, I, R);
    return Z(F, j) ? [F, j] : Q(F, j, 24);
  };
  for (let C = 0; C < s; C++) {
    mt.forEach((F, j) => {
      if (Tt) {
        const [Pt, Zt] = B(C, Tt[j].casa[0], Tt[j].casa[1]);
        lt.push({ kind: F.kind, x: Pt + 0.5, z: Zt + 0.5, r: F.r, spots: Tt[j].spots.map((oe) => ie(C, oe)) });
        return;
      }
      const [D, et] = it(F), [dt, at] = B(C, D, et), gt = [];
      for (let Pt = 0; Pt < F.n; Pt++) {
        const [Zt, oe] = L[Pt % L.length], [se, ia] = B(C, D + Zt, et + oe);
        gt.push(Q(se, ia));
      }
      lt.push({ kind: F.kind, x: dt + 0.5, z: at + 0.5, r: F.r, spots: gt });
    });
    const [I, R] = ae ? ie(C, ae) : Q(...B(C, At, _t));
    for (let F = -4; F <= 4; F++) for (let j = -4; j <= 4; j++) {
      const D = (R + F) * i + I + j;
      D >= 0 && D < i * i && (T[D] = 0, w[D] = 0);
    }
    tt.push({ x: I, z: R, player: C });
  }
  const sa = ni();
  return { size: i, seed: e, players: s, versao: a, trilhas: sa, hn: l, hstep: r, heights: c, terrain: A, tree: T, wood: w, res: S, starts: O, herds: lt, camps: tt };
  function ni() {
    const C = i * i, I = 1073741823, R = [1, -1, 0, 0, 1, 1, -1, -1], F = [0, 0, 1, -1, 1, -1, 1, -1], j = new Uint8Array(C);
    for (const U of S) j[U.z * i + U.x] = 1;
    const D = new Int32Array(C), et = new Int32Array(C), dt = new Int32Array(C), at = new Float64Array(8 * C + 8), gt = (U) => {
      for (let Y = 0; Y < i; Y++) for (let V = 0; V < i; V++) {
        const ot = Y * i + V, pt = A[ot];
        if (V < 2 || Y < 2 || V >= i - 2 || Y >= i - 2 || pt === Je || j[ot]) {
          D[ot] = -1;
          continue;
        }
        if (pt === Ye || pt === Ie) {
          D[ot] = U;
          continue;
        }
        let bt = 10 + Math.floor(ha(V * 0.13, Y * 0.13, e + 91, 2) * 24);
        T[ot] && (bt += 60);
        const vt = M(V + 0.5, Y + 0.5);
        vt > 4 && (bt += Math.floor((vt - 4) * 30)), !n && $(V, Y) && (bt += 300), D[ot] = bt;
      }
    }, Pt = (U, Y) => {
      et.fill(I), dt.fill(-1);
      let V = 0;
      const ot = (pt) => {
        let bt = V++;
        for (; bt > 0; ) {
          const vt = bt - 1 >> 1;
          if (at[vt] <= pt) break;
          at[bt] = at[vt], bt = vt;
        }
        at[bt] = pt;
      };
      for (et[U] = 0, ot(U); V; ) {
        const pt = at[0], bt = at[--V];
        if (V) {
          let qt = 0;
          for (; ; ) {
            const we = 2 * qt + 1;
            if (we >= V) break;
            const Aa = we + 1, Re = Aa < V && at[Aa] < at[we] ? Aa : we;
            if (at[Re] >= bt) break;
            at[qt] = at[Re], qt = Re;
          }
          at[qt] = bt;
        }
        const vt = pt % 65536, Wt = (pt - vt) / 65536;
        if (Wt > et[vt]) continue;
        if (Y && Y[vt]) return vt;
        const me = vt % i, Ct = (vt - me) / i;
        for (let qt = 0; qt < 8; qt++) {
          const we = me + R[qt], Aa = Ct + F[qt], Re = Aa * i + we, hi = D[Re];
          if (hi < 0 || qt >= 4 && (D[Ct * i + we] < 0 || D[Aa * i + me] < 0)) continue;
          const di = Wt + (qt >= 4 ? Math.floor(hi * 14 / 10) : hi);
          di < et[Re] && (et[Re] = di, dt[Re] = vt, ot(di * 65536 + Re));
        }
      }
      return -1;
    }, Zt = (U) => {
      let Y = -1, V = I;
      for (const ot of U) ot >= 0 && ot < C && et[ot] < V && (V = et[ot], Y = ot);
      return Y;
    }, oe = (U, Y) => R.map((V, ot) => (Y + F[ot]) * i + U + V), se = (U, Y, V) => {
      for (let ot = 0; ot <= 8; ot++) for (let pt = -ot; pt <= ot; pt++) for (let bt = -ot; bt <= ot; bt++) {
        if (Math.max(Math.abs(bt), Math.abs(pt)) !== ot) continue;
        const vt = U + bt, Wt = Y + pt;
        if (vt >= 0 && Wt >= 0 && vt < i && Wt < i && V(Wt * i + vt)) return Wt * i + vt;
      }
      return -1;
    }, ia = (U, Y) => {
      let V = 0, ot = 1 / 0;
      return O.forEach((pt, bt) => {
        const vt = (pt.x - U) * (pt.x - U) + (pt.z - Y) * (pt.z - Y);
        vt < ot && (ot = vt, V = bt);
      }), V;
    };
    gt(-1), Pt(N.z * i + N.x);
    const Ua = [];
    for (const [U, Y] of [[1, 0], [2 * u * u - 1, 2 * u * g]]) for (const V of k)
      Ua.push(se(Math.floor(o + U * V), Math.floor(o + Y * V), (ot) => A[ot] === ba && et[ot] < I));
    for (const U of S) ia(U.x, U.z) === 0 && Ua.push(Zt(oe(U.x, U.z)));
    Ua.push(se(tt[0].x, tt[0].z, (U) => et[U] < I));
    for (let U = 0; U < mt.length; U++) Ua.push(Zt(lt[U].spots.flatMap(([Y, V]) => oe(Y, V))));
    const Fr = Ua.filter((U) => U >= 0 && et[U] < I).sort((U, Y) => et[U] - et[Y] || U - Y), gs = new Uint8Array(C);
    gs[N.z * i + N.x] = 1;
    const vo = [];
    for (const U of Fr) {
      if (gs[U]) continue;
      const Y = Pt(U, gs);
      if (!(Y < 0))
        for (let V = Y; V >= 0; V = dt[V])
          gs[V] = 1, vo.push(V);
    }
    const ri = new Uint8Array(C);
    for (const U of vo) {
      const Y = U % i, V = (U - Y) / i;
      for (let ot = 0; ot < s; ot++) {
        const [pt, bt] = B(ot, Y, V);
        pt >= 0 && bt >= 0 && pt < i && bt < i && (ri[bt * i + pt] = 1);
      }
    }
    const _a = new Uint8Array(C).fill(255), za = new Int32Array(C);
    let yo = 0, li = 0;
    for (let U = 0; U < C; U++) ri[U] && (_a[U] = 0, za[li++] = U);
    for (; yo < li; ) {
      const U = za[yo++], Y = _a[U];
      if (Y >= xo) continue;
      const V = U % i, ot = (U - V) / i;
      for (let pt = 0; pt < 8; pt++) {
        const bt = V + R[pt], vt = ot + F[pt];
        if (bt < 0 || vt < 0 || bt >= i || vt >= i) continue;
        const Wt = vt * i + bt;
        _a[Wt] > Y + 1 && (_a[Wt] = Y + 1, za[li++] = Wt);
      }
    }
    for (let U = 0; U < C; U++) {
      const Y = _a[U];
      if (!T[U] || Y > xo) continue;
      const V = U % i, ot = (U - V) / i, [pt, bt] = ui(V + 0.5 - o, ot + 0.5 - o, s);
      (Y <= 1 || Xe(Math.round(pt * 2), Math.round(bt * 2), e + 93) < 0.45) && (T[U] = 0, w[U] = 0);
    }
    const ci = (U) => !as(A[U]) && !T[U] && !j[U], Wa = new Uint8Array(C), Lr = (U) => {
      Wa.fill(0);
      let Y = 0, V = 0;
      for (Wa[U] = 1, za[V++] = U; Y < V; ) {
        const ot = za[Y++], pt = ot % i, bt = (ot - pt) / i;
        for (let vt = 0; vt < 8; vt++) {
          const Wt = pt + R[vt], me = bt + F[vt];
          if (Wt < 1 || me < 1 || Wt >= i - 1 || me >= i - 1) continue;
          const Ct = me * i + Wt;
          Wa[Ct] || !ci(Ct) || vt >= 4 && (!ci(bt * i + Wt) || !ci(me * i + pt)) || (Wa[Ct] = 1, za[V++] = Ct);
        }
      }
    }, jr = (U) => {
      for (let Y = U; Y >= 0; Y = dt[Y]) {
        (A[Y] === Ye || A[Y] === Ie) && (A[Y] = Ke);
        for (const V of [Y, Y - 1, Y + 1, Y - i, Y + i]) V >= 0 && V < C && T[V] && (T[V] = 0, w[V] = 0);
      }
    };
    for (let U = 0; U < 3; U++) {
      let Y = !1;
      for (let V = 0; V < s; V++) {
        const ot = O[V], pt = ot.z * i + ot.x, bt = O[(V + 1) % s];
        Lr(pt);
        const vt = [[bt.z * i + bt.x], [tt[V].z * i + tt[V].x]], Wt = (Ct) => Ct >= 0 && Ct < C && A[Ct] !== Je && !j[Ct];
        for (const Ct of S) ia(Ct.x, Ct.z) === V && vt.push(oe(Ct.x, Ct.z).filter(Wt));
        for (const Ct of lt) ia(Ct.x, Ct.z) === V && vt.push(Ct.spots.flatMap(([qt, we]) => [we * i + qt, ...oe(qt, we)]).filter(Wt));
        const me = vt.filter((Ct) => !Ct.some((qt) => Wa[qt]));
        if (me.length) {
          Y = !0, gt(U ? 500 : -1), Pt(pt), globalThis.__trilhaLog?.push(`volta ${U} jogador ${V}: ${me.map((Ct) => Ct.slice(0, 1).map((qt) => `${qt % i},${(qt - qt % i) / i}`).join("")).join(" | ")}`);
          for (const Ct of me) {
            const qt = Zt(Ct);
            qt >= 0 && jr(qt);
          }
        }
      }
      if (!Y) break;
    }
    return ri;
  }
}
function ft(e, t, a) {
  const s = Ia(t / e.hstep, 0, e.hn - 1.001), i = Ia(a / e.hstep, 0, e.hn - 1.001), o = Math.floor(s), n = Math.floor(i), r = s - o, l = i - n, c = e.hn, h = e.heights, f = h[n * c + o], d = h[n * c + o + 1], u = h[(n + 1) * c + o], g = h[(n + 1) * c + o + 1];
  return r + l <= 1 ? f + (d - f) * r + (u - f) * l : g + (u - g) * (1 - r) + (d - g) * (1 - l);
}
const fl = ["food", "wood", "stone", "metal"], Ra = (e) => e.season === 3, ce = (e, t, a, s, i) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: a, x: s, z: i });
};
function pl(e) {
  Rl(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const a = e.kind[t];
    a >= xt ? Bl(e, t) : a < kt && (e.owner[t] === zt ? Il(e, t) : ml(e, t));
  }
  El(e), Ll(e), e.tick % 50 === 25 && Dl(e);
}
function ml(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, e.foodMode[t] && Tl(e, t), e.task[t]) {
    case jt:
      kl(e, t);
      break;
    case qe:
      $l(e, t);
      break;
    case Ft:
      Fn(e, t);
      break;
    case Ma:
      bl(e, t);
      break;
    default:
      gl(e, t);
  }
}
const Oa = 0, Pn = 1, In = 2, On = 3;
function Bn(e, t, a) {
  return _[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === a;
}
function Pi(e, t, a) {
  return e.isBuilding(a) ? _[e.kind[t]].siege ? Oa : In : e.owner[a] === zt ? Bn(e, a, e.owner[t]) ? Oa : On : e.kind[a] === ut.villager ? Pn : Oa;
}
function oo(e, t, a, s = !1, i = On) {
  const o = e.owner[t], n = _[e.kind[t]].siege;
  let r = -1, l = 99, c = 1 / 0;
  const h = (d, u) => {
    if (u >= i || u > l) return;
    const g = e.x[d] - e.x[t], b = e.z[d] - e.z[t], k = g * g + b * b;
    (u < l || k < c) && (l = u, c = k, r = d);
  };
  n || e.near(e.x[t], e.z[t], a, (d) => {
    if (d === t || !e.isUnit(d) || e.ignoreT[t] === d && e.tick < e.ignoreUntil[t]) return;
    const u = e.owner[d];
    (u === zt ? !Bn(e, d, o) : !e.hostile(o, u)) || h(d, u !== zt && e.kind[d] === ut.villager ? Pn : Oa);
  });
  const f = n ? Oa : In;
  if ((s || n) && f < i && l > f) {
    const d = (a * K) ** 2;
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.hostile(o, e.owner[u]) && !(e.ignoreT[t] === u && e.tick < e.ignoreUntil[t])) {
      const g = e.x[u] - e.x[t], b = e.z[u] - e.z[t];
      g * g + b * b < d && h(u, f);
    }
  }
  return r;
}
function qn(e, t, a) {
  const s = e.state[t] === Xt;
  s && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = Ft, e.tgt[t] = a, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = s ? 10 : 8;
}
function gl(e, t) {
  if (e.kind[t] === ut.villager || (e.tick + t) % 5) return;
  const a = oo(e, t, _[e.kind[t]].sight, e.state[t] !== Xt);
  a >= 0 && qn(e, t, a);
}
function bl(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const a = oo(e, t, _[e.kind[t]].sight, !0);
    if (a >= 0) {
      e.task[t] = Ft, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === Bt) {
    const a = e.amx[t] - e.x[t], s = e.amz[t] - e.z[t];
    a * a + s * s > (3 * K) ** 2 && e.fails[t]++ < 6 ? e.goPoint(t, e.amx[t], e.amz[t]) : e.task[t] = Lt;
  }
}
function vl(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function Ii(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.tgtTile[t] ? vl(e, a) : e.alive[a] ? e.kind[a] === kt ? e.work[a] > 0 : e.isBuilding(a) && e.done[a] === 1 && e.bdef(a).key === "farm" && e.owner[a] === e.owner[t] : !1;
}
function Oi(e, t, a = -1) {
  let s = e.tgt[t];
  const i = e.size;
  if (s < -1 && (s = -1 - s), !e.tgtTile[t] && a < 0 && s >= 0 && (a = s), e.tgtTile[t] && s >= 0 && s < i * i) {
    const o = e.carryRes[t], n = e.map.tree[s] > 0 || o === ss, r = e.resKind[s] || (o === ya ? ee : o === Us ? Ne : o === _s ? ke : 0), l = s % i, c = (s - l) / i;
    for (const [h, f] of Fa) {
      if (h * h + f * f > 100) break;
      const d = l + h, u = c + f;
      if (d < 0 || u < 0 || d >= i || u >= i) continue;
      const g = u * i + d;
      if (!(g === a || !e.open(g)) && (n ? e.map.tree[g] && e.resAmt[g] > 0 : r && e.resKind[g] === r && e.resAmt[g] > 0))
        return e.tgt[t] = g, e.tgtTile[t] = 1, e.phase[t] = $e, e.fails[t] = 0, e.goNear(t, g, !0), !0;
    }
  } else if (s >= 0 && e.kind[s] === kt || e.carryRes[t] === ya) {
    let o = -1, n = (10 * K) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== a && e.alive[r] && e.kind[r] === kt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], c = e.z[r] - e.z[t], h = l * l + c * c;
      h < n && (n = h, o = r);
    }
    if (o >= 0)
      return e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = $e, e.goNear(t, o, !1), !0;
  }
  return !1;
}
function no(e, t) {
  const a = e.owner[t];
  let s = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === a && e.done[o] && e.bdef(o).drop) {
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, s = o);
  }
  return s;
}
function Ns(e, t) {
  const a = no(e, t);
  if (e.dropB[t] = a, a < 0) {
    e.task[t] = Lt;
    return;
  }
  e.phase[t] = ps, e.fails[t] = 0, e.goNear(t, a, !1);
}
function yl(e, t, a) {
  const s = e.tgt[t];
  let i;
  a ? i = Ta.farm : e.tgtTile[t] ? e.map.tree[s] ? i = Ta.wood : i = e.resKind[s] === ee ? Ta.berry : e.resKind[s] === Ne ? Ta.stone : Ta.metal : i = Ta.carcass;
  let o = Math.round(i * 1e3);
  return e.players[e.owner[t]]?.hunger && (o = Math.floor(o * 7 / 10)), e.players[e.owner[t]]?.ai && (o = Math.floor(o * [80, 100, 115][e.difficulty] / 100)), o;
}
function kl(e, t) {
  if (e.phase[t] === ps) {
    Ml(e, t);
    return;
  }
  if (!Ii(e, t)) {
    e.carry[t] > 0 ? Ns(e, t) : Oi(e, t) || (e.task[t] = Lt);
    return;
  }
  const a = e.tgt[t], s = e.tgtTile[t] === 1, i = !s && e.kind[a] >= xt, o = e.reach(t, a, s);
  if (e.phase[t] === $e) {
    if (o <= (i ? 60 : s ? 330 : 220))
      e.phase[t] = _n, e.state[t] = Bt, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === Bt && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, a, s) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - a, Oi(e, t, a) || (e.task[t] = Lt);
      }
    }
    return;
  }
  if (o > (i ? 140 : s ? 420 : 300)) {
    e.phase[t] = $e, e.goNear(t, a, s);
    return;
  }
  if (i && Ra(e)) return;
  if (s && e.resKind[a] === ee && Ra(e)) {
    e.carry[t] > 0 ? Ns(e, t) : e.task[t] = Lt;
    return;
  }
  const n = s ? e.map.tree[a] ? ss : e.resKind[a] === ee ? ya : e.resKind[a] === Ne ? Us : _s : ya;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += yl(e, t, i);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = i ? 1e9 : s ? e.resAmt[a] : e.work[a], c = e.carryCap(t);
  r = Math.min(r, l, c - e.carry[t]), r > 0 && (e.carry[t] += r, i || (s ? e.resAmt[a] -= r : e.work[a] -= r, (s ? e.resAmt[a] : e.work[a]) <= 0 && xl(e, a, s))), (e.carry[t] >= c || !Ii(e, t) && e.carry[t] > 0) && Ns(e, t);
}
function xl(e, t, a) {
  if (!a) {
    e.remove(t);
    return;
  }
  const s = as(e.map.terrain[t]) ? 1 : 0;
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.blocked[t] = s, e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.blocked[t] = s, e.events.push({ t: "res", k: t });
}
function Ml(e, t) {
  let a = e.dropB[t];
  if (a < 0 || !e.isBuilding(a) || !e.done[a] || e.owner[a] !== e.owner[t]) {
    if (a = no(e, t), e.dropB[t] = a, a < 0) {
      e.task[t] = Lt;
      return;
    }
    e.goNear(t, a, !1);
  }
  if (e.reach(t, a, !1) <= 200) {
    const s = e.players[e.owner[t]];
    if (s && (s.res[fl[e.carryRes[t]]] += e.carry[t]), e.carry[t] = 0, e.state[t] = Bt, e.path[t] = null, e.foodMode[t] && !Rn(e, t)) {
      const i = qi(e, t);
      if (i) {
        Ni(e, t, i);
        return;
      }
    }
    Ii(e, t) ? (e.phase[t] = $e, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : Oi(e, t) || (e.task[t] = Lt);
    return;
  }
  e.state[t] === Bt && (++e.fails[t] > 5 ? e.task[t] = Lt : e.goNear(t, a, !1));
}
const zl = 30, Mo = 0, Al = 1, Bi = 2, Nn = 3;
function Rn(e, t) {
  const a = e.tgt[t];
  return a < 0 ? !1 : e.task[t] === Ft ? e.isAnimal(a) && (_[e.kind[a]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[a] === ee && e.resAmt[a] > 0 && !Ra(e) : e.alive[a] ? e.kind[a] === kt ? e.work[a] > 0 : e.isBuilding(a) && e.bdef(a).key === "farm" && !Ra(e) : !1;
}
function qi(e, t) {
  const a = e.owner[t], s = Ra(e), i = e.size, o = no(e, t), n = o >= 0 ? e.x[o] : e.x[t], r = o >= 0 ? e.z[o] : e.z[t], l = (zl * K) ** 2, c = (k, v) => {
    const M = k - n, y = v - r;
    return M * M + y * y <= l;
  }, h = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
  for (let k = 0; k < e.top; k++) if (k !== t && e.isUnit(k) && e.owner[k] === a && e.kind[k] === ut.villager && e.tgt[k] >= 0 && (e.task[k] === jt || e.task[k] === Ft)) {
    const v = e.task[k] === jt && e.tgtTile[k] ? f : h;
    v.set(e.tgt[k], (v.get(e.tgt[k]) ?? 0) + 1);
  }
  let d = -1, u = 1 / 0, g = Mo;
  const b = (k, v, M, y) => {
    const $ = v - e.x[t], q = M - e.z[t], A = $ * $ + q * q;
    A < u && (u = A, d = k, g = y);
  };
  for (let k = 0; k < e.top; k++) e.alive[k] && e.kind[k] === kt && e.work[k] > 0 && (h.get(k) ?? 0) < 4 && c(e.x[k], e.z[k]) && b(k, e.x[k], e.z[k], Mo);
  if (d >= 0) return { t: d, how: g };
  if (!s) {
    for (let k = 0; k < e.top; k++) e.isBuilding(k) && e.owner[k] === a && e.done[k] && e.bdef(k).key === "farm" && !h.has(k) && b(k, e.x[k], e.z[k], Al);
    if (d >= 0) return { t: d, how: g };
    for (const k of e.map.res) {
      const v = k.z * i + k.x;
      if (e.resKind[v] !== ee || e.resAmt[v] <= 0 || (f.get(v) ?? 0) >= 2 || !e.open(v)) continue;
      const M = k.x * K + 128, y = k.z * K + 128;
      c(M, y) && b(v, M, y, Bi);
    }
    if (d >= 0) return { t: d, how: g };
  }
  for (let k = 0; k < e.top; k++) e.isAnimal(k) && _[e.kind[k]].animal.mode === "flee" && (h.get(k) ?? 0) < 2 && c(e.x[k], e.z[k]) && b(k, e.x[k], e.z[k], Nn);
  return d >= 0 ? { t: d, how: g } : null;
}
function Ni(e, t, a) {
  if (e.fails[t] = 0, e.phase[t] = $e, e.tgt[t] = a.t, a.how === Nn) {
    e.task[t] = Ft, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, a.t, !1);
    return;
  }
  e.task[t] = jt, e.tgtTile[t] = a.how === Bi ? 1 : 0, e.goNear(t, a.t, a.how === Bi);
}
function Tl(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const a = e.task[t];
  if (a === Lt) {
    if (e.state[t] === Bt) {
      const i = qi(e, t);
      i && Ni(e, t, i);
    }
    return;
  }
  if (a !== jt || e.phase[t] === ps || Rn(e, t)) return;
  const s = qi(e, t);
  s && (e.carry[t] > 0 && e.carryRes[t] !== ya ? Ns(e, t) : Ni(e, t, s));
}
function $l(e, t) {
  const a = e.tgt[t];
  if (!e.isBuilding(a) || e.owner[a] !== e.owner[t]) {
    e.task[t] = Lt;
    return;
  }
  if (e.done[a]) {
    if (e.bdef(a).key === "farm" && !Sl(e, a, t))
      e.task[t] = jt, e.phase[t] = $e, e.goNear(t, a, !1);
    else if (e.bdef(a).wall) {
      const r = wl(e, t, a);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = Lt;
    } else e.task[t] = Lt;
    return;
  }
  if (e.reach(t, a, !1) > 230) {
    e.state[t] === Bt && (++e.fails[t] > 5 ? e.task[t] = Lt : e.goNear(t, a, !1));
    return;
  }
  e.state[t] = Bt, e.path[t] = null, e.fails[t] = 0;
  const s = (e.tick & 16383) + 1, i = e.tmr[a] !== s;
  e.tmr[a] = s, e.work[a] += i ? 10 : 6;
  const o = e.bdef(a), n = o.time * 100;
  e.hp[a] = Math.max(e.hp[a], Math.floor(o.hp * Math.min(1, e.work[a] / n))), e.work[a] >= n && (e.done[a] = 1, e.hp[a] = o.hp, e.work[a] = 0, e.events.push({ t: "built", e: a }), ce(e, e.owner[a], "built." + o.key, e.x[a], e.z[a]));
}
function wl(e, t, a) {
  let s = -1, i = (10 * K) ** 2;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && !e.done[o] && e.owner[o] === e.owner[t] && e.bdef(o).wall) {
    const n = e.x[o] - e.x[a], r = e.z[o] - e.z[a], l = n * n + r * r;
    l < i && (i = l, s = o);
  }
  return s;
}
function Sl(e, t, a) {
  for (let s = 0; s < e.top; s++) if (s !== a && e.isUnit(s) && e.task[s] === jt && e.tgt[s] === t && !e.tgtTile[s]) return !0;
  return !1;
}
function Fn(e, t) {
  let a = e.tgt[t];
  if (a < 0 || !e.alive[a] || a === t || e.kind[a] === kt || e.isUnit(a) && e.owner[a] === e.owner[t]) {
    zo(e, t);
    return;
  }
  const s = _[e.kind[t]], i = e.kind[t] === ut.villager;
  if (!i && e.owner[t] !== zt && (e.tick + t) % 5 === 0) {
    const l = Pi(e, t, a);
    if (l > Oa) {
      const c = oo(e, t, s.sight, !1, l);
      c >= 0 && (e.tgt[t] = a = c, e.fails[t] = 0);
    }
  }
  i && (e.amx[t] = e.x[a], e.amz[t] = e.z[a]);
  const o = s.hunt && e.owner[a] === zt, n = Math.round((o ? s.hunt : s.range) * K), r = e.reach(t, a, !1);
  if (r <= n + 40) {
    e.fails[t] = 0, e.state[t] === Xt && (e.state[t] = Bt, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (Cl(e, t, a), e.cd[t] = s.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== zt) {
    const l = e.x[t] - e.rallyX[t], c = e.z[t] - e.rallyZ[t];
    if (l * l + c * c > (12 * K) ** 2) {
      e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 100, e.task[t] = Lt, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === Bt && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = a, e.ignoreUntil[t] = e.tick + 300, zo(e, t);
      return;
    }
    if (e.owner[t] === zt) {
      const l = e.map.herds[e.herd[t]];
      if (l) {
        const c = l.x * K - e.x[t], h = l.z * K - e.z[t];
        if (c * c + h * h > (16 * K) ** 2) {
          e.task[t] = Lt, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, l.x * K, l.z * K);
          return;
        }
      }
    }
    if ((s.proj || o) && r <= n + K * 2 && e.state[t] === Bt) {
      e.goPoint(t, e.x[a], e.z[a]), e.fails[t]++;
      return;
    }
    !e.goNear(t, a, !1) || e.lastPartial ? e.fails[t] += 3 : e.fails[t]++;
  }
}
function zo(e, t) {
  if (e.kind[t] === ut.villager) {
    let s = -1, i = (3 * K) ** 2;
    for (let o = 0; o < e.top; o++) if (e.alive[o] && e.kind[o] === kt) {
      const n = e.x[o] - e.amx[t], r = e.z[o] - e.amz[t], l = n * n + r * r;
      l < i && (i = l, s = o);
    }
    if (s >= 0) {
      e.task[t] = jt, e.tgt[t] = s, e.tgtTile[t] = 0, e.phase[t] = $e, e.goNear(t, s, !1);
      return;
    }
  }
  const a = e.phase[t];
  if (a === 9 && e.owner[t] !== zt) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = Ma, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = Lt, e.tgt[t] = -1, e.phase[t] = 0, a === 10 && e.owner[t] !== zt ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = Bt, e.path[t] = null, e.field[t] = null);
}
function Cl(e, t, a) {
  const s = _[e.kind[t]];
  if (s.siege && !e.isBuilding(a)) return;
  let i = e.atkOf(t);
  if (e.isUnit(a)) {
    const n = _[e.kind[a]];
    i -= e.armorOf(a);
    for (const r of s.bonus ?? []) n.cls === r.vs && (i += r.dmg);
  }
  i = Math.max(1, i);
  const o = s.proj ?? (s.hunt && e.owner[a] === zt ? "spear" : void 0);
  if (o) {
    const n = e.x[a] - e.x[t], r = e.z[a] - e.z[t], l = ua(n * n + r * r), c = Math.max(3, Math.round(l / K));
    e.projectiles.push({ target: a, dmg: i, at: e.tick + c, by: t, k: e.kind[a], o: e.owner[a] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[a], z1: e.z[a], ticks: c, kind: o, tk: e.kind[a], gap: e.reach(t, a, !1), te: a });
  } else Ln(e, a, i, t);
}
function El(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const a of e.projectiles) {
    if (a.at > e.tick) {
      t.push(a);
      continue;
    }
    e.alive[a.target] && e.kind[a.target] === a.k && e.owner[a.target] === a.o && Ln(e, a.target, a.dmg, a.by);
  }
  e.projectiles = t;
}
function Ln(e, t, a, s) {
  e.hp[t] -= a;
  const i = e.owner[t];
  if (i === zt)
    e.alive[s] && (e.aggro[t] = s + 1);
  else if (e.isUnit(t) && e.alive[s]) {
    const n = e.task[t];
    e.kind[t] === ut.villager ? e.owner[s] === zt && n !== Ft && (e.task[t] = Ft, e.tgt[t] = s, e.phase[t] = 0) : _[e.kind[t]].siege || (n === Lt ? qn(e, t, s) : n === Ma ? (e.task[t] = Ft, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0) : n === Ft && e.isUnit(s) && e.tgt[t] !== s && Pi(e, t, e.tgt[t]) > Pi(e, t, s) && (e.tgt[t] = s, e.fails[t] = 0));
  }
  const o = e.players[i];
  if (o && e.tick - o.lastAlert > 300 && e.owner[s] !== i && (o.lastAlert = e.tick, ce(e, i, "underAttack", e.x[t], e.z[t])), o && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + a;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && ce(e, i, "centerDanger." + e.owner[s], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && Pl(e, t, s);
}
function Pl(e, t, a) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const s = _[e.kind[t]].animal;
    s && s.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], s.food);
  } else if (e.isBuilding(t)) {
    const s = e.bdef(t).key, i = e.owner[a];
    if (s === "camp" && i >= 0 && i < e.players.length && (e.players[i].res.food += 2e4, e.players[i].res.wood += 15e3, ce(e, i, "campLoot", e.x[t], e.z[t])), s === "center") {
      const o = e.players[e.owner[t]];
      ce(e, e.owner[t], "centerLost." + e.owner[a]), e.remove(t), o && jn(e, o);
      return;
    }
  }
  e.remove(t);
}
function Il(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const a = _[e.kind[t]], s = a.animal, i = e.map.herds[e.herd[t]];
  if (e.task[t] === Ft) {
    Fn(e, t);
    return;
  }
  if (s.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === Bt) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let o = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (o = e.aggro[t] - 1), o >= 0) {
        let n = e.x[t] - e.x[o], r = e.z[t] - e.z[o];
        const l = ua(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * K / l), r = Math.trunc(r * 4 * K / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
        return;
      }
    }
  } else if (s.mode === "fight") {
    if (e.aggro[t] > 0) {
      const o = e.aggro[t] - 1;
      if (e.aggro[t] = 0, e.alive[o] && e.isUnit(o)) {
        e.task[t] = Ft, e.tgt[t] = o, e.fast[t] = 1;
        return;
      }
    }
  } else if ((e.tick + t) % 10 === 0) {
    const o = Ol(e, t, a.sight + (e.season === 3 ? 3 : 0));
    if (o >= 0) {
      e.task[t] = Ft, e.tgt[t] = o, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === Bt && i) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const o = Math.max(1, i.r) * K, n = e.rng.int(2 * o + 1) - o, r = e.rng.int(2 * o + 1) - o;
    e.goPoint(t, Math.round(i.x * K) + n, Math.round(i.z * K) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function Ol(e, t, a) {
  let s = -1, i = 1 / 0;
  return e.near(e.x[t], e.z[t], a, (o) => {
    if (!e.isUnit(o) || e.owner[o] === zt) return;
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, s = o);
  }), s;
}
function Bl(e, t) {
  if (!e.done[t]) return;
  const a = e.owner[t], s = e.players[a];
  if (!s) return;
  const i = e.bdef(t), o = i.key;
  e.queue[t].length && Nl(e, t, s), i.tower && ql(e, t, i.tower), o === "pen" && !Ra(e) && e.tick % 10 === 0 && (s.res.food += 20), o === "sanctuary" && e.tick % 20 === 0 && e.near(e.x[t], e.z[t], 6, (n) => {
    e.isUnit(n) && e.owner[n] === a && e.hp[n] < _[e.kind[n]].hp && e.hp[n]++;
  });
}
function ql(e, t, a) {
  if (e.cd[t] > 0) {
    e.cd[t]--;
    return;
  }
  if ((e.tick + t) % 3) return;
  const s = e.owner[t];
  let i = -1, o = 1 / 0;
  if (e.near(e.x[t], e.z[t], a.range + 1, (h) => {
    if (!e.isUnit(h) || !e.hostile(s, e.owner[h])) return;
    const f = e.reach(t, h, !1);
    f <= a.range * K && f < o && (o = f, i = h);
  }), i < 0) return;
  const n = Math.max(1, a.atk - e.armorOf(i)), r = e.x[i] - e.x[t], l = e.z[i] - e.z[t], c = Math.max(3, Math.round(ua(r * r + l * l) / K));
  e.projectiles.push({ target: i, dmg: n, at: e.tick + c, by: t, k: e.kind[i], o: e.owner[i] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[i], z1: e.z[i], ticks: c, kind: "arrow", tk: e.kind[i], gap: e.reach(t, i, !1), te: i, h: 3.2 }), e.cd[t] = a.cd;
}
function Nl(e, t, a) {
  if (a.hunger) return;
  const s = e.queue[t][0];
  if (s >= re) {
    const y = Qe[s - re];
    if (++e.work[t] < y.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), a.tech |= 1 << s - re, ce(e, a.id, "tech." + y.key, e.x[t], e.z[t]);
    return;
  }
  const i = _[s];
  if (e.work[t] === 0 && e.pop(a.id) + i.pop > e.popCap(a.id)) {
    e.tick % 300 === 0 && ce(e, a.id, e.popCap(a.id) >= es[a.era] ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.work[t] < i.time * 10) return;
  e.work[t] = 0;
  const o = e.queue[t].shift(), [n, r, l] = e.footprint(t), c = e.size / 2, h = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : c, f = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : c, d = n + l / 2, u = r + l / 2, g = h - d, b = f - u, k = Math.sqrt(g * g + b * b) || 1, v = e.nearestFree(Math.round(d + g / k * (l / 2 + 1)), Math.round(u + b / k * (l / 2 + 1)));
  if (v < 0) return;
  const M = e.spawnUnit(a.id, _[o].key, v % e.size + 0.5, Math.floor(v / e.size) + 0.5);
  e.events.push({ t: "trained", e: M }), e.rallyX[t] >= 0 && e.goPoint(M, e.rallyX[t], e.rallyZ[t]);
}
function Rl(e) {
  if (e.tick === 0 || e.tick % Ae !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const a of e.players) !a.defeated && a.era >= 2 && Fl(e, a.id) && ce(e, a.id, "fair");
  if (t === 8) for (const a of e.players) ce(e, a.id, "winterSoon");
  if (t >= 9) {
    for (const a of e.players) {
      if (a.defeated) continue;
      const s = e.pop(a.id) * (a.era <= 1 ? 1 : a.era <= 3 ? 2 : 3) * 100;
      a.res.food >= s ? (a.res.food -= s, a.hunger && (a.hunger = !1)) : (a.res.food = 0, a.hunger || ce(e, a.id, "hunger"), a.hunger = !0);
    }
    if (t === 9) for (const a of e.players) ce(e, a.id, "winter");
  }
  if (t === 0) for (const a of e.players)
    a.hunger = !1, ce(e, a.id, "spring");
}
function Fl(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.done[a] && e.bdef(a).market) return !0;
  return !1;
}
function Ll(e) {
  for (const t of e.players)
    if (t.aging) {
      if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
        t.aging = 0;
        continue;
      }
      if (!(--t.aging > 0)) {
        t.era++;
        for (let a = 0; a < e.top; a++) if (e.isUnit(a) && e.owner[a] === t.id) {
          const s = _[e.kind[a]].next;
          if (!s) continue;
          const i = _[e.kind[a]], o = _[ut[s]];
          e.hp[a] = Math.round(e.hp[a] * o.hp / i.hp), e.kind[a] = ut[s];
        }
        for (let a = 0; a < e.top; a++) e.isBuilding(a) && e.owner[a] === t.id && (e.queue[a] = e.queue[a].map((s) => s < re && _[s].next ? ut[_[s].next] : s));
        e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && ce(e, t.id, "metalSeen");
      }
    }
}
function jn(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const a of e.players) ce(e, a.id, "defeated." + t.id);
    for (let a = 0; a < e.top; a++) e.alive[a] && e.owner[a] === t.id && e.remove(a);
    Dn(e);
  }
}
function jl(e, t) {
  for (let a = 0; a < e.top; a++) if (e.isBuilding(a) && e.owner[a] === t && e.bdef(a).key === "center") return !0;
  return !1;
}
function Dl(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !jl(e, t.id) && jn(e, t);
    Dn(e);
  }
}
function Dn(e) {
  if (e.outcome !== "playing") return;
  if (e.times) {
    Hl(e, e.times);
    return;
  }
  const t = e.players.filter((a) => !a.ai);
  t.length && t.every((a) => a.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((a) => a.ai).every((a) => a.defeated) && e.players.some((a) => a.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
function Hl(e, t) {
  const a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set();
  if (e.players.forEach((n, r) => {
    n.defeated || a.add(t[r]), n.ai || s.add(t[r]);
  }), !(a.size <= 1 || ![...a].some((n) => s.has(n)))) return;
  e.vencedor = a.size === 1 ? [...a][0] : -1;
  const o = e.players.findIndex((n) => !n.ai);
  e.outcome = o >= 0 && e.vencedor === t[o] ? "victory" : "defeat", e.events.push({ t: "end", result: e.outcome, vencedor: e.vencedor });
}
const fi = [13, 24, 30], Ul = [3, 9, 14], Ao = [42, 36, 30], _l = [24, 16, 11], Wl = [10, 7, 5], Gl = [6, 12, 99];
function Vl(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const a = e.ai[t.id];
    e.tick < a.next || (a.next = e.tick + 10, Kl(e, t.id, a));
  }
  Ql(e);
}
function Kl(e, t, a) {
  const s = e.players[t], i = Math.min(s.era, 2), o = [], n = [], r = [];
  for (let T = 0; T < e.top; T++)
    !e.alive[T] || e.owner[T] !== t || (e.isBuilding(T) ? r.push(T) : e.isUnit(T) && (e.kind[T] === ut.villager ? o : n).push(T));
  const l = r.find((T) => e.bdef(T).key === "center" && e.done[T]);
  if (l === void 0) return;
  const c = (T, w = !1) => r.filter((S) => e.bdef(S).key === T && (!w || e.done[S])), h = o.length + n.length, f = e.popCap(t), d = r.filter((T) => !e.done[T]), u = e.tick / Ae, g = /* @__PURE__ */ new Set(), b = (T, w, S) => {
    const O = Jl(e, t, T, l, o.filter((z) => !g.has(z)), w, S);
    return O >= 0 && g.add(O), O >= 0;
  }, k = !s.aging && (s.era === 0 && o.length >= fi[0] || s.era === 1 && o.length >= fi[1] - 2 && u >= Ao[e.difficulty] - 6 && e.eraBuildingTypes(t) >= 2);
  if (o.length < fi[i] && !e.queue[l].length && h < f && !s.aging && e.issue({ type: "train", player: t, building: l, key: "villager" }), f - h <= 3 && f < es[s.era] && !d.some((T) => e.bdef(T).key === "house") && e.tick >= a.houseCd && b("house", 5, 14) && (a.houseCd = e.tick + 150), o.length >= 6 && !c("depot").length) {
    const T = Zl(e, t, l, o.filter((w) => !g.has(w)));
    T >= 0 && g.add(T);
  }
  if (s.era >= 2 && c("depot").length < 2) {
    const T = Un(e, t, l, o.filter((w) => !g.has(w)), (w) => e.resKind[w] === ke);
    T >= 0 && g.add(T);
  }
  const v = c("military");
  o.length >= 9 && !v.length && b("military", 7, 16);
  const M = v.filter((T) => e.done[T]), y = Ul[i] + (s.era ? Math.floor(u / 8) : 0), $ = {};
  s.era >= 2 && ($.stone = (c("forge").length ? 0 : 60) + (c("market").length ? 0 : 40) + (c("tower").length ? 0 : 120), $.metal = (!e.hasTech(t, "bronze") && c("forge", !0).length ? 60 : 0) + (c("stable", !0).length ? 35 : 0));
  const q = (T, w) => fa.every((S) => s.res[S] >= ((T[S] ?? 0) + (w[S] ?? 0)) * 100);
  if (M.length && !k && n.length < y && !e.queue[M[0]].length && h < f) {
    const T = ao(Et[Vt.military], s.era).filter((w) => w !== "dog" && q(_[ut[w]].cost, $));
    T.length && e.issue({ type: "train", player: t, building: M[0], key: T[e.rng.int(T.length)] });
  }
  if (s.era >= 2 && !k) {
    const T = c("stable", !0)[0], w = c("workshop", !0)[0];
    T !== void 0 && n.length < y && !e.queue[T].length && h + 2 <= f && q(_[ut.horseman].cost, { stone: $.stone, metal: !e.hasTech(t, "bronze") && c("forge", !0).length ? 60 : 0 }) && e.issue({ type: "train", player: t, building: T, key: "horseman" });
    const S = n.filter((B) => _[e.kind[B]].siege).length;
    w !== void 0 && S < 2 && !e.queue[w].length && h + 3 <= f && e.issue({ type: "train", player: t, building: w, key: "ram" });
    const O = c("forge", !0)[0], z = c("market", !0)[0];
    if (O !== void 0 && !e.queue[O].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && s.res.metal > 3e4 && e.issue({ type: "research", player: t, building: O, key: "iron" }) : e.issue({ type: "research", player: t, building: O, key: "bronze" })), z !== void 0 && !e.queue[z].length && !e.hasTech(t, "wheel") && s.res.metal > 15e3 && e.issue({ type: "research", player: t, building: z, key: "wheel" }), z !== void 0 && (e.tick + t) % 30 === 0 && s.res.wood > (e.fair ? 5e4 : 9e4)) {
      const B = s.res.stone < 2e4 ? "stone" : s.res.metal < 25e3 ? "metal" : s.res.food < 3e4 ? "food" : null;
      B && e.issue({ type: "trade", player: t, building: z, give: "wood", get: B });
    }
  }
  s.era === 0 && !s.aging && o.length >= 10 && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, pa[0].cost) && e.issue({ type: "ageup", player: t, building: l }), s.era === 1 && !s.aging && o.length >= 18 && u >= Ao[e.difficulty] && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, pa[1].cost) && e.issue({ type: "ageup", player: t, building: l }), s.era >= 1 && !d.length && (c("farm").length < Math.min(s.era >= 2 ? 14 : 10, Math.floor(o.length * 2 / 5)) ? b("farm", 6, 15) : c("pen").length ? !c("sanctuary").length && u > 30 ? b("sanctuary", 6, 14) : s.era >= 2 && (c("stable").length ? c("forge").length ? !c("market").length && (u > 50 || s.res.wood > 6e4) ? b("market", 7, 16) : c("tower").length ? !c("workshop").length && u > 58 && b("workshop", 7, 16) : b("tower", 5, 10) : b("forge", 6, 14) : b("stable", 7, 16)) : b("pen", 7, 16));
  const A = o.filter((T) => e.task[T] === Lt && e.state[T] === Bt && !g.has(T));
  if (A.length) {
    const T = [0, 0, 0, 0];
    for (const S of o) if (e.task[S] === jt) {
      const O = e.tgt[S], z = e.tgtTile[S] ? e.map.tree[O] ? ss : e.resKind[O] === Ne ? Us : e.resKind[O] === ke ? _s : ya : ya;
      T[z === _s ? 3 : z === Us ? 2 : z === ss ? 1 : 0]++;
    }
    const w = s.era === 0 ? k ? [0.8, 0.15, 0.05, 0] : [0.62, 0.3, 0.08, 0] : s.era === 1 ? k ? [0.55, 0.25, 0.2, 0] : [0.5, 0.35, 0.15, 0] : [0.42, 0.25, 0.13, 0.2];
    s.res.wood > 4e4 && (w[0] += w[1] - 0.1, w[1] = 0.1), s.res.stone > 25e3 && (w[0] += w[2], w[2] = 0), s.res.metal > 4e4 && (w[0] += w[3], w[3] = 0);
    for (const S of A) {
      const O = T[0] + T[1] + T[2] + T[3] + 1, z = (B) => w[B] - T[B] / O;
      for (const B of [0, 1, 2, 3].sort((L, E) => z(E) - z(L) || L - E)) if (To(e, t, S, B, l)) {
        T[B]++;
        break;
      }
    }
  }
  if (s.res.wood > 4e4 && (e.tick + t * 7) % 200 === 0) {
    const T = o.find((w) => e.task[w] === jt && e.tgtTile[w] && e.map.tree[e.tgt[w]] > 0 && !g.has(w));
    T !== void 0 && e.carry[T] === 0 && To(e, t, T, 0, l);
  }
  if ((e.tick + t) % 30 === 0) {
    const T = Yl(e, t, l, 18);
    if (T >= 0) {
      const w = n.filter((S) => e.task[S] !== Ma || !0);
      w.length && e.issue({ type: "attack", player: t, ids: w, target: T });
    }
  }
  if (a.attackAt || (a.attackAt = _l[e.difficulty] * Ae), e.tick >= a.attackAt && n.length >= 5) {
    const T = Xl(e, t, l);
    T >= 0 && e.issue({ type: "amove", player: t, ids: n.slice(0, Gl[e.difficulty]), x: e.x[T], z: e.z[T] }), a.attackAt = e.tick + Wl[e.difficulty] * Ae;
  }
}
function Yl(e, t, a, s) {
  let i = -1, o = (s * K) ** 2;
  return e.near(e.x[a], e.z[a], s, (n) => {
    if (!e.isUnit(n)) return;
    const r = e.owner[n];
    if (r < 0 || !e.hostile(t, r)) return;
    const l = e.x[n] - e.x[a], c = e.z[n] - e.z[a], h = l * l + c * c;
    h < o && (o = h, i = n);
  }), i;
}
function Xl(e, t, a) {
  let s = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.hostile(t, e.owner[o]) && e.owner[o] >= 0 && e.owner[o] < e.players.length) {
    const n = !e.players[e.owner[o]].ai, r = e.x[o] - e.x[a], l = e.z[o] - e.z[a], c = (r * r + l * l) * (n && e.difficulty === 2 ? 0.6 : 1) * (1 + 0.02 * ((e.owner[o] - t + e.players.length) % e.players.length));
    c < i && (i = c, s = o);
  }
  return s;
}
function Jl(e, t, a, s, i, o, n) {
  const r = Et[Vt[a]];
  if (!e.canAfford(t, r.cost) || !i.length) return -1;
  const l = e.x[s] >> 8, c = e.z[s] >> 8;
  for (const [h, f] of Fa) {
    const d = h * h + f * f;
    if (d < o * o) continue;
    if (d > n * n) break;
    const u = l + h - (r.size >> 1), g = c + f - (r.size >> 1);
    if (!e.canPlace(t, a, u, g) || !Hn(e, u, g, r.size)) continue;
    const b = i.find((k) => e.task[k] !== qe && (e.carryRes[k] === ss || e.task[k] === Lt)) ?? i.find((k) => e.task[k] !== qe) ?? i[0];
    return e.issue({ type: "build", player: t, ids: [b], key: a, tx: u, tz: g }), b;
  }
  return -1;
}
function Hn(e, t, a, s) {
  for (let i = a - 1; i <= a + s; i++) for (let o = t - 1; o <= t + s; o++) {
    const n = i * e.size + o;
    if (e.bAt[n]) return !1;
  }
  return !0;
}
function Zl(e, t, a, s) {
  return Un(e, t, a, s, (i) => e.map.tree[i] > 0);
}
function Un(e, t, a, s, i) {
  const o = Et[Vt.depot];
  if (!e.canAfford(t, o.cost) || !s.length) return -1;
  const n = e.x[a] >> 8, r = e.z[a] >> 8, l = e.size;
  let c = Fa;
  if (!Fa.some(([h, f]) => {
    const d = n + h, u = r + f;
    return d >= 0 && u >= 0 && d < l && u < l && i(u * l + d);
  })) {
    let h = -1, f = 1 / 0;
    for (let d = 0; d < l * l; d += 2) if (i(d)) {
      const u = d % l, g = (d - u) / l, b = (u - n) ** 2 + (g - r) ** 2;
      b < f && (f = b, h = d);
    }
    if (h < 0) return -1;
    c = [[h % l - n, Math.floor(h / l) - r]];
  }
  for (const [h, f] of c) {
    const d = n + h, u = r + f;
    if (!(h * h + f * f < 36) && !(d < 2 || u < 2 || d >= l - 3 || u >= l - 3) && i(u * l + d))
      for (const [g, b] of [[2, 0], [-3, 0], [0, 2], [0, -3], [2, 2], [-3, -3], [2, -3], [-3, 2]]) {
        const k = d + g, v = u + b;
        if (e.canPlace(t, "depot", k, v) && Hn(e, k, v, 2)) {
          const M = s.find((y) => e.task[y] !== qe) ?? s[0];
          return e.issue({ type: "build", player: t, ids: [M], key: "depot", tx: k, tz: v }), M;
        }
      }
  }
  return -1;
}
function To(e, t, a, s, i) {
  const o = e.size, n = e.x[i] >> 8, r = e.z[i] >> 8;
  if (s === 0) {
    for (let M = 0; M < e.top; M++) if (e.isBuilding(M) && e.owner[M] === t && e.done[M] && e.bdef(M).key === "farm") {
      let y = !1;
      for (let $ = 0; $ < e.top; $++) if (e.isUnit($) && e.task[$] === jt && e.tgt[$] === M && !e.tgtTile[$]) {
        y = !0;
        break;
      }
      if (!y)
        return e.issue({ type: "work", player: t, ids: [a], target: M }), !0;
    }
    let u = 0;
    for (let M = 0; M < e.top; M++) e.isUnit(M) && e.owner[M] === t && e.task[M] === jt && e.tgtTile[M] && e.resKind[e.tgt[M]] === ee && u++;
    if (e.season !== 3 && u < 5) for (const [M, y] of Fa) {
      if (M * M + y * y > 196) break;
      const $ = n + M, A = (r + y) * o + $;
      if (A >= 0 && A < o * o && e.resKind[A] === ee && e.resAmt[A] > 0)
        return e.issue({ type: "gather", player: t, ids: [a], k: A }), !0;
    }
    let g = -1, b = (25 * K) ** 2;
    for (let M = 0; M < e.top; M++) if (e.alive[M] && e.kind[M] === kt && e.work[M] > 0) {
      let y = 0;
      for (let T = 0; T < e.top; T++) e.isUnit(T) && e.task[T] === jt && e.tgt[T] === M && !e.tgtTile[T] && y++;
      const $ = e.x[M] - e.x[i], q = e.z[M] - e.z[i], A = $ * $ + q * q;
      y < 4 && A < b && (b = A, g = M);
    }
    if (g >= 0)
      return e.issue({ type: "work", player: t, ids: [a], target: g }), !0;
    let k = -1, v = (28 * K) ** 2;
    for (let M = 0; M < e.top; M++) if (e.isAnimal(M) && _[e.kind[M]].animal.food > 0 && _[e.kind[M]].key !== "aurochs") {
      const y = e.x[M] - e.x[i], $ = e.z[M] - e.z[i], q = y * y + $ * $;
      q < v && (v = q, k = M);
    }
    return k >= 0 ? (e.issue({ type: "attack", player: t, ids: [a], target: k }), !0) : !1;
  }
  if (s === 3 && e.players[t].era < 2) return !1;
  const l = (u) => s === 1 ? e.map.tree[u] > 0 : s === 2 ? e.resKind[u] === Ne : e.resKind[u] === ke;
  let c = n, h = r;
  if (s === 1) {
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.owner[u] === t && e.bdef(u).key === "depot") {
      c = e.x[u] >> 8, h = e.z[u] >> 8;
      break;
    }
  }
  for (const [u, g] of Fa) {
    const b = c + u, k = h + g;
    if (b < 0 || k < 0 || b >= o || k >= o) continue;
    const v = k * o + b;
    if (l(v) && e.open(v))
      return e.issue({ type: "gather", player: t, ids: [a], k: v }), !0;
  }
  let f = -1, d = 1 / 0;
  for (let u = 0; u < o * o; u += 3) if (l(u) && e.open(u)) {
    const g = u % o, b = (u - g) / o, k = (g - c) ** 2 + (b - h) ** 2;
    k < d && (d = k, f = u);
  }
  return f >= 0 ? (e.issue({ type: "gather", player: t, ids: [a], k: f }), !0) : !1;
}
function Ql(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === Be) {
      const o = $o(e, i);
      o >= 0 && e.events.push({ t: "msg", player: e.owner[o], key: "raidSoon", x: e.x[i], z: e.z[i] });
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / Ae, s = Math.max(...e.players.map((i) => i.era)) >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15));
  for (let i = 0; i < e.top; i++) {
    if (!e.isBuilding(i) || e.owner[i] !== Be) continue;
    const o = $o(e, i);
    if (o < 0) continue;
    const n = [];
    for (let r = 0; r < s; r++) {
      const l = e.nearestFree((e.x[i] >> 8) + r % 3 - 1, (e.z[i] >> 8) + 3 + Math.floor(r / 3));
      l < 0 || n.push(e.spawnUnit(Be, "barbarian", l % e.size + 0.5, Math.floor(l / e.size) + 0.5));
    }
    for (const r of n)
      e.task[r] = Ma, e.amx[r] = e.x[o], e.amz[r] = e.z[o], e.rallyX[r] = e.x[o], e.rallyZ[r] = e.z[o];
    e.orderMove(n, e.x[o], e.z[o]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * Ae;
}
function $o(e, t) {
  let a = -1, s = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.bdef(i).key === "center" && e.owner[i] >= 0 && e.owner[i] < e.players.length && !e.players[e.owner[i]].defeated) {
    const o = e.x[i] - e.x[t], n = e.z[i] - e.z[t], r = o * o + n * n;
    r < s && (s = r, a = i);
  }
  return a;
}
const st = 4096, Bt = 0, Xt = 1, Lt = 0, jt = 1, qe = 2, Ft = 3, Ma = 4, $e = 0, _n = 1, ps = 2, ya = 0, ss = 1, Us = 2, _s = 3, vs = [1, -1, 0, 0, 1, 1, -1, -1], ys = [0, 0, 1, -1, 1, -1, 1, -1], wo = [10, 10, 10, 10, 14, 14, 14, 14], tc = 4294967295;
class ec {
  constructor(t, a) {
    m(this, "dist");
    this.goal = t, this.dist = new Uint32Array(a).fill(tc);
  }
}
const Ba = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && Ba.push([t, e]);
Ba.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const Fa = Ba, So = /* @__PURE__ */ new Map();
function ac(e) {
  let t = So.get(e);
  if (t) return t;
  const a = [];
  for (let s = -e; s <= e; s++) for (let i = -e; i <= e; i++) i * i + s * s <= e * e + e && a.push(i, s);
  return t = new Int16Array(a), So.set(e, t), t;
}
class ro {
  constructor(t, a, s = {}) {
    m(this, "map");
    m(this, "size");
    m(this, "rng");
    m(this, "tick", 0);
    m(this, "difficulty", 1);
    m(this, "players", []);
    // entidades (estrutura de arrays)
    m(this, "alive", new Uint8Array(st));
    m(this, "kind", new Uint8Array(st));
    m(this, "owner", new Int8Array(st));
    m(this, "x", new Int32Array(st));
    m(this, "z", new Int32Array(st));
    m(this, "px", new Int32Array(st));
    m(this, "pz", new Int32Array(st));
    m(this, "hp", new Int16Array(st));
    m(this, "state", new Uint8Array(st));
    m(this, "stuck", new Uint8Array(st));
    m(this, "best", new Int32Array(st));
    m(this, "slotX", new Int32Array(st));
    m(this, "slotZ", new Int32Array(st));
    m(this, "task", new Uint8Array(st));
    m(this, "tgt", new Int32Array(st));
    m(this, "tgtTile", new Uint8Array(st));
    m(this, "phase", new Uint8Array(st));
    m(this, "carry", new Int16Array(st));
    m(this, "carryRes", new Uint8Array(st));
    m(this, "cd", new Uint16Array(st));
    m(this, "work", new Int32Array(st));
    m(this, "done", new Uint8Array(st));
    m(this, "sub", new Uint8Array(st));
    m(this, "aggro", new Int32Array(st));
    m(this, "tmr", new Int16Array(st));
    m(this, "herd", new Int16Array(st));
    m(this, "fast", new Uint8Array(st));
    m(this, "amx", new Int32Array(st));
    m(this, "amz", new Int32Array(st));
    m(this, "fails", new Uint8Array(st));
    m(this, "frac", new Int32Array(st));
    m(this, "rallyX", new Int32Array(st));
    m(this, "rallyZ", new Int32Array(st));
    m(this, "dropB", new Int32Array(st));
    m(this, "ignoreT", new Int32Array(st).fill(-1));
    m(this, "ignoreUntil", new Int32Array(st));
    // alvo inalcançável a ignorar por um tempo
    m(this, "foodMode", new Uint8Array(st));
    // coletor no modo Buscar comida (procura comida sozinho)
    m(this, "queue", Array.from({ length: st }, () => []));
    m(this, "field", new Array(st).fill(null));
    m(this, "path", new Array(st).fill(null));
    m(this, "pathI", new Uint16Array(st));
    m(this, "top", 0);
    // mapa vivo
    m(this, "blocked");
    m(this, "bAt");
    // bAt = id da construção + 1 em cada tile
    m(this, "resKind");
    m(this, "resAmt");
    // recursos por tile (centésimos)
    m(this, "vis", []);
    m(this, "explored", []);
    m(this, "projectiles", []);
    // k, o: tipo e dono do alvo na hora do disparo
    m(this, "events", []);
    m(this, "ai", []);
    m(this, "barbNext", 0);
    m(this, "barbWarned", !1);
    m(this, "outcome", "playing");
    /** partida online (M6): o time de cada tribo; null = cada tribo é um time (o jogo solo e o jogo com um amigo) */
    m(this, "times", null);
    /** partida online (M6), depois do fim: o time que venceu (-1: nenhum time com gente) */
    m(this, "vencedor", -1);
    m(this, "pending", []);
    m(this, "seq", 0);
    /** jogo com amigo (anfitrião): recebe as ordens de fora aplicadas em cada passo, na ordem em que foram aplicadas */
    m(this, "onApplied", null);
    m(this, "hashHead");
    m(this, "hashNext", new Int32Array(st));
    m(this, "hs");
    m(this, "pushX", new Int32Array(st));
    m(this, "pushZ", new Int32Array(st));
    // A*
    m(this, "aStamp");
    m(this, "aG");
    m(this, "aFrom");
    m(this, "aClosed");
    m(this, "aId", 0);
    m(this, "aHeap");
    m(this, "lastPartial", !1);
    // o último caminho não chegou ao destino
    m(this, "flowCache", /* @__PURE__ */ new Map());
    m(this, "nodesTick", 0);
    m(this, "overBudget", !1);
    this.map = En(t, a, s.mapa ?? io), this.size = this.map.size, this.rng = new $n(t), this.difficulty = s.difficulty ?? 1;
    const i = this.size * this.size;
    this.blocked = new Uint8Array(i), this.bAt = new Int16Array(i), this.resKind = new Uint8Array(i), this.resAmt = new Int32Array(i);
    for (let r = 0; r < i; r++) {
      const l = this.map.terrain[r];
      (as(l) || this.map.tree[r]) && (this.blocked[r] = 1), this.map.tree[r] && (this.resAmt[r] = this.map.wood[r] * 100);
    }
    for (const r of this.map.res) {
      const l = r.z * this.size + r.x;
      this.resKind[l] = r.kind, this.resAmt[l] = r.amount * 100, this.blocked[l] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(i), this.aG = new Int32Array(i), this.aFrom = new Int32Array(i), this.aClosed = new Int32Array(i), this.aHeap = new Float64Array(i * 2);
    const o = s.humans ?? 1, n = s.humanos;
    s.times && s.times.length === a && (this.times = s.times.slice()), this.map.starts.forEach((r, l) => {
      this.players.push({ id: l, color: so[l], start: { x: r.x, z: r.z }, ai: n ? !n.includes(l) : l >= o, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0 }), this.vis.push(new Uint8Array(i)), this.explored.push(new Uint8Array(i)), this.spawnBuilding(l, "center", r.x - 2, r.z - 2, !0);
      for (let c = 0; c < 4; c++) this.spawnUnit(l, "villager", r.x - r.ux * 4 + (c - 1.5) * 1.1, r.z - r.uz * 4 + c % 2 * 0.8);
      this.spawnUnit(l, "dog", r.x - r.ux * 3 - r.uz * 3, r.z - r.uz * 3 + r.ux * 3), this.ai.push({ next: 20 + l * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((r, l) => {
      for (const [c, h] of r.spots) {
        const f = this.spawnUnit(zt, r.kind, c + 0.5, h + 0.5);
        this.herd[f] = l, this.tmr[f] = f * 7 % 60;
      }
    });
    for (const r of this.map.camps) this.spawnBuilding(Be, "camp", r.x - 2, r.z - 2, !0);
    if (this.barbNext = 12 * Ae, s.testUnits) {
      const r = this.map.starts[0];
      let l = 0;
      for (let c = 0; c < 40 && l < s.testUnits; c++) for (let h = 0; h < 20 && l < s.testUnits; h++) {
        const f = r.x - r.ux * 9 + (h - 10) * 0.9, d = r.z - r.uz * 9 - c * 0.9 * (r.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(f * K), Math.round(d * K)) || (this.spawnUnit(0, "warrior", f, d), l++);
      }
    }
    this.updateFog();
  }
  // teto de busca de caminho por tick
  /** o tile tem algum vizinho livre (dá para chegar perto)? */
  open(t) {
    const a = this.size, s = t % a, i = (t - s) / a;
    for (let o = 0; o < 8; o++) {
      const n = s + vs[o], r = i + ys[o];
      if (n >= 0 && r >= 0 && n < a && r < a && !this.blocked[r * a + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return _[this.kind[t]];
  }
  bdef(t) {
    return Et[this.kind[t] - xt];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < kt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= xt;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === zt;
  }
  hostile(t, a) {
    if (t === a || t === zt || a === zt) return !1;
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
    return !!s && (s.tech & 1 << js[a]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, a) {
    for (let s = 0; s < this.top; s++) if (this.isBuilding(s) && this.owner[s] === t && this.queue[s].includes(re + a)) return !0;
    return !1;
  }
  soldier(t) {
    const a = _[this.kind[t]].cls;
    return a !== "villager" && a !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const a = _[this.kind[t]];
    if (!this.soldier(t)) return a.atk;
    const s = this.owner[t];
    return a.atk + (this.hasTech(s, "bronze") ? 1 : 0) + (this.hasTech(s, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return _[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return (ll + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * Ae && this.tick % (3 * Ae) < rl;
  }
  // ── entidades ──
  alloc() {
    for (let t = 0; t < st; t++) if (!this.alive[t])
      return t >= this.top && (this.top = t + 1), t;
    throw new Error("entidades esgotadas");
  }
  reset(t) {
    this.state[t] = Bt, this.task[t] = Lt, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0;
  }
  spawnUnit(t, a, s, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = ut[a], this.owner[o] = t, this.x[o] = this.px[o] = Math.round(s * K), this.z[o] = this.pz[o] = Math.round(i * K), this.hp[o] = _[ut[a]].hp, o;
  }
  spawnCarcass(t, a, s, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = kt, this.owner[o] = zt, this.sub[o] = t, this.x[o] = this.px[o] = a, this.z[o] = this.pz[o] = s, this.work[o] = i * 100, this.hp[o] = 1, o;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, a, s, i, o) {
    const n = this.alloc();
    this.reset(n);
    const r = Et[Vt[a]];
    this.alive[n] = 1, this.kind[n] = xt + Vt[a], this.owner[n] = t, this.x[n] = this.px[n] = s * K + r.size * 128, this.z[n] = this.pz[n] = i * K + r.size * 128, this.done[n] = o ? 1 : 0, this.hp[n] = o ? r.hp : Math.max(1, r.hp / 10 | 0);
    for (let l = 0; l < r.size; l++) for (let c = 0; c < r.size; c++) {
      const h = (i + l) * this.size + s + c;
      this.bAt[h] = n + 1, r.walk || (this.blocked[h] = 1);
    }
    return this.events.push({ t: "placed", e: n }), n;
  }
  footprint(t) {
    const a = this.bdef(t).size;
    return [(this.x[t] >> 8) - (a >> 1), (this.z[t] >> 8) - (a >> 1), a];
  }
  remove(t) {
    if (this.kind[t] >= xt) {
      const [a, s, i] = this.footprint(t), o = this.bdef(t).walk;
      for (let n = 0; n < i; n++) for (let r = 0; r < i; r++) {
        const l = (s + n) * this.size + a + r;
        this.bAt[l] = 0, o || (this.blocked[l] = 0);
      }
      this.events.push({ t: "gone", e: t });
    }
    this.alive[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [];
  }
  blockedAt(t, a) {
    const s = t >> 8, i = a >> 8;
    return s < 0 || i < 0 || s >= this.size || i >= this.size ? !0 : this.blocked[i * this.size + s] === 1;
  }
  canPlace(t, a, s, i) {
    const o = Et[Vt[a]], n = this.size;
    if (s < 1 || i < 1 || s + o.size >= n - 1 || i + o.size >= n - 1) return !1;
    for (let r = 0; r < o.size; r++) for (let l = 0; l < o.size; l++) {
      const c = (i + r) * n + s + l, h = this.map.terrain[c];
      if (this.blocked[c] || this.bAt[c] || as(h) || h === ba || !this.explored[t][c]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, c = this.z[r] >> 8;
      if (l >= s && l < s + o.size && c >= i && c < i + o.size && this.state[r] === Bt && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  canAfford(t, a) {
    const s = this.players[t].res;
    return fa.every((i) => s[i] >= (a[i] ?? 0) * 100);
  }
  pay(t, a) {
    const s = this.players[t].res;
    for (const i of fa) s[i] -= (a[i] ?? 0) * 100;
  }
  refund(t, a) {
    const s = this.players[t].res;
    for (const i of fa) s[i] += (a[i] ?? 0) * 100;
  }
  pop(t) {
    let a = 0;
    for (let s = 0; s < this.top; s++) this.isUnit(s) && this.owner[s] === t && (a += this.udef(s).pop);
    return a;
  }
  popCap(t) {
    const a = this.players[t].era;
    let s = 0;
    for (let i = 0; i < this.top; i++) if (this.isBuilding(i) && this.owner[i] === t && this.done[i]) {
      const o = this.bdef(i).pop;
      o && (s += o[a]);
    }
    return Math.min(es[a], s);
  }
  /** tipos de construção da era atual já prontos (requisito para avançar) */
  eraBuildingTypes(t) {
    const a = this.players[t].era, s = /* @__PURE__ */ new Set();
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).buildable && this.bdef(i).era === a && s.add(this.bdef(i).key);
    return s.size;
  }
  // ── geometria ──
  /** distância (sub-tiles) da unidade até a borda do alvo (construção, tile ou unidade) */
  reach(t, a, s) {
    let i, o, n, r;
    if (s) {
      const h = a % this.size, f = (a - h) / this.size;
      i = h * K, o = f * K, n = i + K, r = o + K;
    } else if (this.kind[a] >= xt) {
      const [h, f, d] = this.footprint(a);
      i = h * K, o = f * K, n = i + d * K, r = o + d * K;
    } else {
      const h = this.x[a] - this.x[t], f = this.z[a] - this.z[t];
      return Math.max(0, ua(h * h + f * f) - (this.kind[a] < kt ? Math.round(_[this.kind[a]].radius * K) : 64));
    }
    const l = Math.max(i - this.x[t], 0, this.x[t] - n), c = Math.max(o - this.z[t], 0, this.z[t] - r);
    return ua(l * l + c * c);
  }
  // ── caminho ──
  nearestFree(t, a) {
    for (const [s, i] of Ba) {
      const o = t + s, n = a + i;
      if (o >= 0 && n >= 0 && o < this.size && n < this.size && !this.blocked[n * this.size + o]) return n * this.size + o;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, a, s, i, o, n = 16e3) {
    const r = this.size, l = this.blocked, c = ++this.aId, h = this.aG, f = this.aFrom, d = this.aStamp, u = this.aClosed, g = this.aHeap;
    this.lastPartial = !1;
    const b = (L, E) => {
      const H = Math.max(a - L, 0, L - i), N = Math.max(s - E, 0, E - o);
      return 15 * Math.max(H, N) + 6 * Math.min(H, N);
    }, k = t % r, v = (t - k) / r;
    if (k >= a && k <= i && v >= s && v <= o) return [];
    let M = 0;
    const y = (L) => {
      let E = M++;
      for (g[E] = L; E > 0; ) {
        const H = E - 1 >> 1;
        if (g[H] <= g[E]) break;
        const N = g[H];
        g[H] = g[E], g[E] = N, E = H;
      }
    }, $ = () => {
      const L = g[0];
      g[0] = g[--M];
      let E = 0;
      for (; ; ) {
        const H = E * 2 + 1, N = H + 1;
        let J = E;
        if (H < M && g[H] < g[J] && (J = H), N < M && g[N] < g[J] && (J = N), J === E) break;
        const W = g[J];
        g[J] = g[E], g[E] = W, E = J;
      }
      return L;
    };
    d[t] = c, h[t] = 0, f[t] = -1, y(b(k, v) * 65536 + t);
    let q = t, A = b(k, v), T = -1, w = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; M > 0 && w < n; ) {
      const L = $(), E = L % 65536;
      if (u[E] === c) continue;
      u[E] = c, w++;
      const H = E % r, N = (E - H) / r, J = b(H, N);
      if (J === 0) {
        T = E;
        break;
      }
      J < A && (A = J, q = E);
      for (let W = 0; W < 8; W++) {
        const Z = H + vs[W], Q = N + ys[W];
        if (Z < 0 || Q < 0 || Z >= r || Q >= r) continue;
        const mt = Q * r + Z;
        if (l[mt] || u[mt] === c || W >= 4 && (l[N * r + Z] || l[Q * r + H])) continue;
        const lt = h[E] + wo[W];
        (d[mt] !== c || lt < h[mt]) && (d[mt] = c, h[mt] = lt, f[mt] = E, y((lt + b(Z, Q)) * 65536 + mt));
      }
    }
    this.lastPartial = T < 0, this.nodesTick += w;
    const S = T >= 0 ? T : q;
    if (S === t) return T >= 0 ? [] : null;
    const O = [];
    for (let L = S; L !== t && L >= 0; L = f[L]) O.push(L);
    O.reverse();
    const z = [];
    let B = t;
    for (let L = 0; L < O.length; ) {
      let E = Math.min(O.length - 1, L + 12);
      for (; E > L && !this.clear(B, O[E]); ) E--;
      z.push(O[E]), B = O[E], L = E + 1;
    }
    return z;
  }
  clear(t, a) {
    const s = this.size;
    let i = t % s, o = (t - i) / s;
    const n = a % s, r = (a - n) / s, l = Math.abs(n - i), c = Math.abs(r - o), h = i < n ? 1 : -1, f = o < r ? 1 : -1;
    let d = l - c;
    for (let u = 0; u < 64; u++) {
      if (this.blocked[o * s + i]) return !1;
      if (i === n && o === r) return !0;
      const g = 2 * d;
      if (g > -c && g < l && (this.blocked[o * s + i + h] || this.blocked[(o + f) * s + i]))
        return !1;
      g > -c && (d -= c, i += h), g < l && (d += l, o += f);
    }
    return !1;
  }
  /** manda uma unidade até perto de um retângulo de tiles (alvo) ou de um ponto */
  goTo(t, a, s, i, o, n, r, l = 16e3) {
    const c = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), h = this.size;
    let f = !1;
    for (let k = Math.max(0, s); k <= Math.min(h - 1, o) && !f; k++) for (let v = Math.max(0, a); v <= Math.min(h - 1, i); v++) if (!this.blocked[k * h + v]) {
      f = !0;
      break;
    }
    if (!f)
      return this.lastPartial = !0, this.state[t] = Bt, !1;
    const d = this.findPath(c, a, s, i, o, l);
    if (this.field[t] = null, !d)
      return this.state[t] = Bt, !1;
    this.path[t] = d, this.pathI[t] = 0;
    const u = d.length ? d[d.length - 1] : c, g = u % this.size, b = (u - g) / this.size;
    return this.slotX[t] = n ?? g * K + 128, this.slotZ[t] = r ?? b * K + 128, this.state[t] = Xt, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  /** campo de fluxo completo até um tile, guardado e reaproveitado por 1 minuto (destinos longe) */
  flowTo(t) {
    const a = this.flowCache.get(t);
    if (a && this.tick - a.t < 600) return a.f;
    const s = this.buildFlow(t, []);
    if (this.flowCache.set(t, { f: s, t: this.tick }), this.flowCache.size > 12) {
      let i = -1, o = 1 / 0;
      for (const [n, r] of this.flowCache) r.t < o && (o = r.t, i = n);
      this.flowCache.delete(i);
    }
    return s;
  }
  /** vai longe seguindo o campo de fluxo (sem A*) */
  goFar(t, a, s) {
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)));
    return i < 0 ? !1 : (this.field[t] = this.flowTo(i), this.path[t] = null, this.lastPartial = !1, this.slotX[t] = i % this.size * K + 128, this.slotZ[t] = Math.floor(i / this.size) * K + 128, this.state[t] = Xt, this.stuck[t] = 0, this.best[t] = 2147483647, !0);
  }
  far(t, a, s) {
    const i = a - this.x[t], o = s - this.z[t];
    return i * i + o * o > (22 * K) ** 2;
  }
  goNear(t, a, s) {
    if (!s && this.far(t, this.x[a], this.z[a])) return this.goFar(t, this.x[a], this.z[a]);
    if (s) {
      const n = a % this.size, r = (a - n) / this.size;
      return this.goTo(t, n - 1, r - 1, n + 1, r + 1, void 0, void 0, 6e3);
    }
    if (this.kind[a] >= xt) {
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
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, a >> 8)), Math.min(this.size - 1, Math.max(0, s >> 8)));
    if (i < 0) return;
    const o = i % this.size, n = (i - o) / this.size, r = !this.blocked[(s >> 8) * this.size + (a >> 8)];
    this.goTo(t, o, n, o, n, r ? a : o * K + 128, r ? s : n * K + 128);
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
    if (!(!a || a.defeated))
      switch (t.type) {
        case "move":
        case "amove": {
          const s = this.own(t);
          for (const i of s)
            this.task[i] = t.type === "amove" ? Ma : Lt, this.amx[i] = t.x, this.amz[i] = t.z, this.rallyX[i] = t.type === "amove" ? t.x : -1, this.rallyZ[i] = t.type === "amove" ? t.z : -1, this.tgt[i] = -1, this.aggro[i] = 0, this.fails[i] = 0;
          this.orderMove(s, t.x, t.z);
          break;
        }
        case "stop":
          for (const s of this.own(t))
            this.task[s] = Lt, this.state[s] = Bt, this.path[s] = null, this.field[s] = null, this.foodMode[s] = 0;
          break;
        case "food":
          for (const s of this.own(t)) this.kind[s] === ut.villager && (this.foodMode[s] = t.on ? 2 : 0);
          break;
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === ke && a.era < 2) return;
          const s = this.resKind[t.k] === ee;
          for (const i of this.own(t)) this.kind[i] === ut.villager && (this.task[i] = jt, this.tgt[i] = t.k, this.tgtTile[i] = 1, this.phase[i] = $e, this.fails[i] = 0, s || (this.foodMode[i] = 0), this.goNear(i, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const s = t.target;
          if (!this.alive[s]) return;
          for (const i of this.own(t)) {
            const o = this.kind[i] === ut.villager;
            if (this.kind[s] >= xt && this.owner[s] === t.player) {
              if (!o) continue;
              this.done[s] ? this.bdef(s).key === "farm" ? (this.task[i] = jt, this.tgt[i] = s, this.tgtTile[i] = 0, this.phase[i] = $e, this.goNear(i, s, !1)) : this.bdef(s).drop && this.carry[i] > 0 && (this.task[i] = jt, this.phase[i] = ps, this.tgt[i] = -1, this.goNear(i, s, !1)) : (this.task[i] = qe, this.tgt[i] = s, this.tgtTile[i] = 0, this.goNear(i, s, !1));
              continue;
            }
            if (this.kind[s] === kt) {
              o && (this.task[i] = jt, this.tgt[i] = s, this.tgtTile[i] = 0, this.phase[i] = $e, this.goNear(i, s, !1));
              continue;
            }
            _[this.kind[i]].siege && this.kind[s] < xt || (this.owner[s] === zt || this.hostile(t.player, this.owner[s])) && (this.task[i] = Ft, this.tgt[i] = s, this.tgtTile[i] = 0, this.goNear(i, s, !1));
          }
          break;
        }
        case "build": {
          const s = this.own(t).filter((n) => this.kind[n] === ut.villager), i = Et[Vt[t.key]];
          if (!s.length || !i?.buildable || i.era > a.era || !this.canAfford(t.player, i.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, i.cost);
          const o = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of s)
            this.task[n] = qe, this.tgt[n] = o, this.tgtTile[n] = 0, this.goNear(n, o, !1);
          break;
        }
        case "train": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !ao(this.bdef(s), a.era).includes(t.key) || this.queue[s].length >= 5) return;
          const o = _[ut[t.key]];
          if (!this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[s].push(ut[t.key]);
          break;
        }
        case "cancel": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.queue[s].length) return;
          const i = this.queue[s].pop();
          this.refund(t.player, i >= re ? Qe[i - re].cost : _[i].cost), this.queue[s].length || (this.work[s] = 0);
          break;
        }
        case "ageup": {
          const s = t.building, i = pa[a.era];
          if (!i || a.era >= Tn || a.aging || !this.isBuilding(s) || this.owner[s] !== t.player || this.bdef(s).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), a.aging = i.time * 10, a.agingB = s;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const s = t.building, i = js[t.key], o = Qe[i];
          if (!o || !this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !(this.bdef(s).research ?? []).includes(t.key) || a.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, i) || o.needs && !this.hasTech(t.player, o.needs) || this.queue[s].length >= 5 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[s].push(re + i);
          break;
        }
        case "trade": {
          const s = t.building;
          if (!this.isBuilding(s) || this.owner[s] !== t.player || !this.done[s] || !this.bdef(s).market || t.give === t.get || !ta.includes(t.give) || !ta.includes(t.get) || a.res[t.give] < Pe.give * 100) return;
          a.res[t.give] -= Pe.give * 100, a.res[t.get] += (this.fair ? Pe.fair : Pe.get) * 100;
          break;
        }
        case "ia":
          a.ai = !0;
          break;
        // M6: o computador assume (a IA continua de onde a tribo estava)
        case "wall": {
          const s = this.own(t).filter((n) => this.kind[n] === ut.villager), i = Et[Vt.wall];
          if (!s.length || i.era > a.era) return;
          const o = [];
          for (const n of t.tiles.slice(0, 40)) {
            if (!this.canAfford(t.player, i.cost)) break;
            const r = n % this.size, l = (n - r) / this.size;
            this.canPlace(t.player, "wall", r, l) && (this.pay(t.player, i.cost), o.push(this.spawnBuilding(t.player, "wall", r, l, !1)));
          }
          if (!o.length) return;
          for (const n of s) {
            let r = o[0], l = 1 / 0;
            for (const c of o) {
              const h = this.x[c] - this.x[n], f = this.z[c] - this.z[n], d = h * h + f * f;
              d < l && (l = d, r = c);
            }
            this.task[n] = qe, this.tgt[n] = r, this.tgtTile[n] = 0, this.goNear(n, r, !1);
          }
          break;
        }
      }
  }
  orderMove(t, a, s) {
    if (!t.length) return;
    const i = this.size, o = this.nearestFree(Math.min(i - 1, Math.max(0, a >> 8)), Math.min(i - 1, Math.max(0, s >> 8)));
    if (o < 0) return;
    if (t.length === 1) {
      this.goPoint(t[0], a, s);
      return;
    }
    const n = this.blocked[(s >> 8) * i + (a >> 8)], r = n ? o % i * K + 128 : a, l = n ? Math.floor(o / i) * K + 128 : s;
    t.sort((f, d) => {
      const u = (this.x[f] - r) ** 2 + (this.z[f] - l) ** 2, g = (this.x[d] - r) ** 2 + (this.z[d] - l) ** 2;
      return u - g || f - d;
    });
    const c = this.buildFlow(o, t);
    let h = 0;
    for (const f of t) {
      let d = r, u = l;
      for (; h < Ba.length; ) {
        const [g, b] = Ba[h++], k = r + g * 218, v = l + b * 218;
        if (!this.blockedAt(k, v)) {
          d = k, u = v;
          break;
        }
      }
      this.slotX[f] = d, this.slotZ[f] = u, this.state[f] = Xt, this.field[f] = c, this.path[f] = null, this.stuck[f] = 0, this.best[f] = 2147483647;
    }
  }
  buildFlow(t, a) {
    const s = this.size, i = s * s, o = new ec(t, i), n = o.dist, r = this.blocked, l = /* @__PURE__ */ new Set();
    for (const g of a) l.add((this.z[g] >> 8) * s + (this.x[g] >> 8));
    const c = this.aHeap;
    let h = 0;
    const f = (g) => {
      let b = h++;
      for (c[b] = g; b > 0; ) {
        const k = b - 1 >> 1;
        if (c[k] <= c[b]) break;
        const v = c[k];
        c[k] = c[b], c[b] = v, b = k;
      }
    }, d = () => {
      const g = c[0];
      c[0] = c[--h];
      let b = 0;
      for (; ; ) {
        const k = b * 2 + 1, v = k + 1;
        let M = b;
        if (k < h && c[k] < c[M] && (M = k), v < h && c[v] < c[M] && (M = v), M === b) break;
        const y = c[M];
        c[M] = c[b], c[b] = y, b = M;
      }
      return g;
    };
    n[t] = 0, f(t);
    let u = a.length ? l.size : -1;
    for (; h > 0; ) {
      const g = d(), b = g % 65536, k = (g - b) / 65536;
      if (k > n[b]) continue;
      if (u > 0 && l.has(b) && (l.delete(b), --u <= 0 && k > 400))
        break;
      const v = b % s, M = (b - v) / s;
      for (let y = 0; y < 8; y++) {
        const $ = v + vs[y], q = M + ys[y];
        if ($ < 0 || q < 0 || $ >= s || q >= s) continue;
        const A = q * s + $;
        if (r[A] || y >= 4 && (r[M * s + $] || r[q * s + v])) continue;
        const T = k + wo[y];
        T < n[A] && (n[A] = T, f(T * 65536 + A));
      }
    }
    return o;
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
    this.buildHash(), Vl(this), pl(this), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const a = _[this.kind[t]];
    return Math.round((this.fast[t] && a.animal ? a.animal.run : a.speed) * K / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let a = 0; a < this.top; a++) {
      if (!this.alive[a] || this.state[a] !== Xt || this.kind[a] >= kt) continue;
      const s = this.x[a], i = this.z[a], o = this.speedOf(a);
      let n = this.slotX[a], r = this.slotZ[a];
      const l = this.path[a];
      if (l && this.pathI[a] < l.length) {
        const $ = l[this.pathI[a]], q = $ % t * K + 128, A = Math.floor($ / t) * K + 128;
        Math.abs(q - s) + Math.abs(A - i) < 110 && this.pathI[a] < l.length - 1 && this.pathI[a]++, (this.pathI[a] < l.length - 1 || Math.abs(q - s) + Math.abs(A - i) >= 110) && (n = q, r = A), this.pathI[a] === l.length - 1 && Math.abs(q - s) + Math.abs(A - i) < 110 && (this.path[a] = null, n = this.slotX[a], r = this.slotZ[a]);
      }
      const c = this.slotX[a] - s, h = this.slotZ[a] - i, f = c * c + h * h;
      if (!this.path[a] && f <= o * o) {
        this.x[a] = this.slotX[a], this.z[a] = this.slotZ[a], this.state[a] = Bt, this.field[a] = null;
        continue;
      }
      const d = this.field[a];
      if (d && !this.path[a] && f > 640 * 640) {
        const $ = s >> 8, q = i >> 8, A = q * t + $;
        let T = d.dist[A], w = -1, S = -1;
        for (let O = 0; O < 8; O++) {
          const z = $ + vs[O], B = q + ys[O];
          if (z < 0 || B < 0 || z >= t || B >= t) continue;
          const L = B * t + z;
          this.blocked[L] || O >= 4 && (this.blocked[q * t + z] || this.blocked[B * t + $]) || d.dist[L] < T && (T = d.dist[L], w = z, S = B);
        }
        w >= 0 && (n = w * K + 128, r = S * K + 128);
      }
      const u = n - s, g = r - i, b = ua(u * u + g * g);
      if (b === 0) {
        this.state[a] = Bt;
        continue;
      }
      const k = Math.min(o, b);
      let v = s + Ve(u * k, b), M = i + Ve(g * k, b);
      this.blockedAt(v, M) && (this.blockedAt(v, i) ? this.blockedAt(s, M) ? (v = s, M = i) : v = s : M = i), this.x[a] = v, this.z[a] = M;
      const y = Math.abs(c) + Math.abs(h);
      y + 24 < this.best[a] ? (this.best[a] = y, this.stuck[a] = 0) : this.stuck[a] = Math.min(255, this.stuck[a] + 1), (this.stuck[a] > 30 || this.stuck[a] > 10 && y < 3 * K && !this.path[a]) && (this.state[a] = Bt, this.field[a] = null, this.path[a] = null);
    }
  }
  buildHash() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    a.fill(-1);
    for (let i = 0; i < this.top; i++) {
      if (!this.alive[i] || this.kind[i] >= kt) continue;
      const o = Math.min(t - 1, Math.max(0, this.z[i] >> 9)) * t + Math.min(t - 1, Math.max(0, this.x[i] >> 9));
      s[i] = a[o], a[o] = i;
    }
  }
  /** chama fn para cada unidade a até r tiles de (x, z) (usa a grade do tick) */
  near(t, a, s, i) {
    const o = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(s / 2)), r = Math.min(o - 1, (t >> 9) + Math.ceil(s / 2)), l = Math.max(0, (a >> 9) - Math.ceil(s / 2)), c = Math.min(o - 1, (a >> 9) + Math.ceil(s / 2)), h = s * K * (s * K);
    for (let f = l; f <= c; f++) for (let d = n; d <= r; d++) for (let u = this.hashHead[f * o + d]; u !== -1; u = this.hashNext[u]) {
      const g = this.x[u] - t, b = this.z[u] - a;
      g * g + b * b <= h && this.alive[u] && i(u);
    }
  }
  separate() {
    const t = this.hs, a = this.hashHead, s = this.hashNext;
    this.buildHash();
    for (let i = 0; i < this.top; i++)
      this.pushX[i] = 0, this.pushZ[i] = 0;
    for (let i = 0; i < this.top; i++) {
      if (!this.isUnit(i)) continue;
      const o = Math.round(_[this.kind[i]].radius * K), n = this.x[i] >> 9, r = this.z[i] >> 9;
      for (let l = -1; l <= 1; l++) for (let c = -1; c <= 1; c++) {
        const h = n + c, f = r + l;
        if (!(h < 0 || f < 0 || h >= t || f >= t))
          for (let d = a[f * t + h]; d !== -1; d = s[d]) {
            if (d <= i || !this.isUnit(d)) continue;
            const u = Math.round(_[this.kind[d]].radius * K), g = o + u;
            let b = this.x[d] - this.x[i], k = this.z[d] - this.z[i];
            if (b >= g || b <= -g || k >= g || k <= -g) continue;
            let v = b * b + k * k;
            if (v >= g * g) continue;
            v === 0 && (b = 1 + i % 3, k = 1 + d % 3, v = b * b + k * k);
            const M = ua(v) || 1, y = g - M >> 1, $ = Ve(b * y, M), q = Ve(k * y, M), A = this.state[i] === Xt ? 1 : 2, T = this.state[d] === Xt ? 1 : 2;
            this.pushX[i] -= Ve($ * A, 2), this.pushZ[i] -= Ve(q * A, 2), this.pushX[d] += Ve($ * T, 2), this.pushZ[d] += Ve(q * T, 2);
          }
      }
    }
    for (let i = 0; i < this.top; i++) {
      if (!this.pushX[i] && !this.pushZ[i]) continue;
      const o = this.x[i] + this.pushX[i], n = this.z[i] + this.pushZ[i];
      this.blockedAt(o, n) ? this.blockedAt(o, this.z[i]) ? this.blockedAt(this.x[i], n) || (this.z[i] = n) : this.x[i] = o : (this.x[i] = o, this.z[i] = n);
    }
  }
  updateFog() {
    const t = this.size;
    for (let i = 0; i < this.players.length; i++) {
      const o = this.vis[i], n = this.explored[i];
      o.fill(0);
      for (let r = 0; r < this.top; r++) {
        if (!this.alive[r] || this.owner[r] !== i || this.kind[r] === kt) continue;
        const l = this.kind[r] >= xt ? this.bdef(r).sight : _[this.kind[r]].sight, c = ac(l), h = this.x[r] >> 8, f = this.z[r] >> 8;
        for (let d = 0; d < c.length; d += 2) {
          const u = h + c[d], g = f + c[d + 1];
          if (u < 0 || g < 0 || u >= t || g >= t) continue;
          const b = g * t + u;
          o[b] = 1, n[b] = 1;
        }
      }
    }
    const a = this.times;
    if (!a) return;
    const s = t * t;
    for (let i = 0; i < a.length; i++) for (let o = i + 1; o < a.length; o++) if (a[i] === a[o]) {
      const n = this.vis[i], r = this.vis[o], l = this.explored[i], c = this.explored[o];
      for (let h = 0; h < s; h++)
        n[h] !== r[h] && (n[h] = r[h] = 1), l[h] !== c[h] && (l[h] = c[h] = 1);
    }
  }
  /** calendário: mês 0 = março */
  get month() {
    return Math.floor(this.tick / Ae) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (Ae * 12)) + 1;
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
    for (const s of this.players) for (const i of fa) a(s.res[i]);
    return t >>> 0;
  }
}
function Rt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const Co = /* @__PURE__ */ new Set();
function Ze(e, t) {
  const a = e + JSON.stringify(t);
  Co.has(a) || (Co.add(a), Rt(e, t));
}
function pi(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function sc(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const ic = ["facil", "normal", "dificil"], oc = [5, 15, 30, 60, 90], be = (e) => new Jt(e), It = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: be("#f4f7fa") },
  uGrassA: { value: be("#6fa84a") },
  uGrassB: { value: be("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: be("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: be("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: be("#5cb8b2") },
  uDeep: { value: be("#1f6079") }
}, Wn = `
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`, nc = `
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, Gn = `
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
#endif`, rc = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, lc = `
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
#endif`, cc = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, hc = `
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
function lo(e, t = {}) {
  const a = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", ...t };
  return e.defines = Object.assign(e.defines || {}, a), e.onBeforeCompile = (s) => {
    for (const i in It) s.uniforms[i] = It[i];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + Wn).replace("#include <begin_vertex>", `#include <begin_vertex>
` + Gn).replace("#include <project_vertex>", `#include <project_vertex>
` + rc), s.fragmentShader = s.fragmentShader.replace("#include <common>", `#include <common>
` + nc).replace("#include <color_fragment>", `#include <color_fragment>
` + lc).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + cc).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + hc);
  }, e.customProgramCacheKey = () => JSON.stringify(a), e;
}
function Vn(e) {
  const t = new Ur({ depthPacking: _r });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (a) => {
    for (const s in It) a.uniforms[s] = It[s];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + Wn).replace("#include <begin_vertex>", `#include <begin_vertex>
` + Gn);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const Yt = (e = {}, t = {}) => lo(new qs({ flatShading: !0, ...e }), t);
function dc(e) {
  const t = e.hn - 1;
  e.hstep;
  const a = e.size, s = new ei(a, a, t, t).rotateX(-Math.PI / 2).translate(a / 2, 0, a / 2), i = s.attributes.position;
  for (let v = 0; v < i.count; v++) i.setY(v, e.heights[v]);
  const o = s.toNonIndexed(), n = o.attributes.position, r = n.count, l = new Float32Array(r * 3), c = new Float32Array(r * 2), h = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, f = (v) => new Jt().setRGB(v[0], v[1], v[2], vn), d = Object.fromEntries(Object.entries(h).map(([v, M]) => [v, f(M)])), u = new wt(), g = new wt(), b = new wt();
  for (let v = 0; v < r; v += 3) {
    u.fromBufferAttribute(n, v), g.fromBufferAttribute(n, v + 1), b.fromBufferAttribute(n, v + 2);
    const M = (u.x + g.x + b.x) / 3, y = (u.y + g.y + b.y) / 3, $ = (u.z + g.z + b.z) / 3, q = Math.min(a - 1, Math.max(0, Math.floor(M))), A = Math.min(a - 1, Math.max(0, Math.floor($))), T = e.terrain[A * a + q], w = Math.abs(new wt().subVectors(b, g).cross(new wt().subVectors(u, g)).normalize().y), S = 0.93 + (v * 2654435761 >>> 0) / 4294967296 * 0.14, O = ha(M * 0.045, $ * 0.045, 5, 2);
    let z = null, B = 0;
    if (y < -0.45) z = d.bed;
    else if (T === Ds || T === ba || T === Je || y < 0.5) z = d.sand;
    else if (T === Ye || w < 0.66) z = y > 6 ? d.rock2 : d.rock;
    else if (T === Ie && y > ai - 0.3) z = d.rock2;
    else {
      B = 1;
      const L = 0.86 + O * 0.3 - Math.min(1, Math.max(0, (y - 4) / 12)) * 0.08;
      z = new Jt(L, L, L);
    }
    for (let L = 0; L < 3; L++) {
      const E = (v + L) * 3;
      l[E] = z.r * S, l[E + 1] = z.g * S, l[E + 2] = z.b * S, c[(v + L) * 2] = B, c[(v + L) * 2 + 1] = O;
    }
  }
  o.setAttribute("color", new Te(l, 3)), o.setAttribute("aGrass", new Te(c, 2)), o.computeVertexNormals();
  const k = new He(o, Yt({ vertexColors: !0 }, { TERRAIN: "" }));
  return k.receiveShadow = !0, k.castShadow = !0, k;
}
function uc(e) {
  const t = e.size, a = Math.round(t / 1.6), s = new ei(t, t, a, a).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), i = s.attributes.position, o = new Float32Array(i.count);
  for (let r = 0; r < i.count; r++) o[r] = -ft(e, i.getX(r), i.getZ(r));
  s.setAttribute("aDepth", new Te(o, 1));
  const n = new He(s, lo(new Wr({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const ye = Math.PI * 2, Eo = new kn(), Po = new to(), Io = new wt(), Oo = new wt(), ks = new wt(), xs = new Jt();
function x(e = 0, t = 0, a = 0, s = 0, i = 1, o = 1, n = 1, r = 0, l = 0) {
  return Eo.set(r, s, l, "YXZ"), Po.setFromEuler(Eo), Io.set(e, t, a), Oo.set(i, o, n), new ue().compose(Io, Po, Oo);
}
function fc() {
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
  ], t = new aa();
  return t.setAttribute("position", new va(e, 3)), t;
}
const Ms = {
  box: new le(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new Na(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new Na(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cone4: new Si(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new Si(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new yn(0.5, 0),
  dode: new Gr(0.5, 0),
  prism: fc()
}, Qa = {};
for (const e in Ms) Qa[e] = Ms[e].index ? Ms[e].toNonIndexed() : Ms[e];
class co {
  constructor(t = Math.random) {
    m(this, "pos", []);
    m(this, "col", []);
    this.rand = t;
  }
  add(t, a, s, i = 0.06) {
    const o = Qa[t], n = o.attributes.position;
    xs.set(a);
    const r = 1 + (this.rand() - 0.5) * i;
    for (let l = 0; l < n.count; l++)
      ks.fromBufferAttribute(n, l).applyMatrix4(s), this.pos.push(ks.x, ks.y, ks.z), this.col.push(xs.r * r, xs.g * r, xs.b * r);
    return this;
  }
  build() {
    const t = new aa();
    return t.setAttribute("position", new va(this.pos, 3)), t.setAttribute("color", new va(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const St = (e) => {
  const t = new co();
  return e(t), t.build();
};
function Kn(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const zs = new ue().makeScale(0, 0, 0);
function pc(e) {
  const t = new ja(), a = Kn(e.seed * 7 + 1), s = e.size, i = {
    oakT: St((z) => {
      z.add("cyl5", "#6b4a32", x(0, 0, 0, 0, 0.36, 1.8, 0.36)), z.add("cyl5", "#634430", x(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: St((z) => {
      z.add("ico", "#ffffff", x(0, 0, 0, 0, 2.4, 2, 2.4)), z.add("ico", "#e6e6e6", x(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), z.add("ico", "#f3f3f3", x(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: St((z) => {
      z.add("cyl5", "#6e4d36", x(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), z.add("cyl5", "#6e4d36", x(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: St((z) => {
      z.add("ico", "#ffffff", x(0, 0, 0, 0, 3.7, 1.15, 3.5)), z.add("ico", "#e8e8e8", x(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: St((z) => z.add("cyl5", "#5d4330", x(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: St((z) => {
      z.add("cone7", "#ffffff", x(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), z.add("cone7", "#ececec", x(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), z.add("cone7", "#f6f6f6", x(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, o = Yt({ vertexColors: !0 }), n = [
    { kind: wn, t: i.oakT, c: i.oakC, mat: Yt({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: Ei, t: i.pineT, c: i.pineC, mat: Yt({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: Sn, t: i.firT, c: i.firC, mat: Yt({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = 3, f = (z, B) => Math.min(h - 1, Math.floor(z / s * h)) * h + Math.min(h - 1, Math.floor(B / s * h));
  for (const z of n) {
    const B = [];
    for (let E = 0; E < s * s; E++) e.tree[E] === z.kind && B.push(E);
    for (let E = B.length - 1; E > 0; E--) {
      const H = Math.floor(a() * (E + 1)), N = B[E];
      B[E] = B[H], B[H] = N;
    }
    const L = Array.from({ length: h * h }, () => []);
    for (const E of B) {
      const H = E % s + 0.5 + (a() - 0.5) * 0.4, N = Math.floor(E / s) + 0.5 + (a() - 0.5) * 0.4, J = ft(e, H, N), W = z.s * (0.85 + a() * 0.45), Z = a() * ye;
      L[f(H, N)].push({ mt: x(H, J - 0.1, N, Z, W, W, W), mc: x(H, J - 0.1 + z.cy * W, N, Z, W, W, W), c: new Jt(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.8 + a() * 0.25), k: E });
    }
    for (const E of L) {
      if (!E.length) continue;
      const H = new Ht(z.t, o, E.length), N = new Ht(z.c, z.mat, E.length);
      E.forEach((J, W) => {
        H.setMatrixAt(W, J.mt), N.setMatrixAt(W, J.mc), N.setColorAt(W, J.c), l.set(J.k, { t: H, c: N, i: W });
      });
      for (const J of [H, N])
        J.castShadow = !0, J.receiveShadow = !0, J.computeBoundingSphere(), t.add(J);
      z.depth && (N.customDepthMaterial = Vn(z.depth)), r.push({ t: H, c: N, n: E.length });
    }
  }
  const d = [], u = (z, B, L, E, H = !0) => {
    const N = new Ht(Qa.dode, Yt(), Math.max(1, z.length * E));
    let J = 0;
    for (const W of z) for (let Z = 0; Z < E; Z++) {
      const Q = W.x + 0.5 + (a() - 0.5) * 0.7, mt = W.z + 0.5 + (a() - 0.5) * 0.7, lt = L * (0.6 + a() * 0.6);
      if (N.setMatrixAt(J, x(Q, ft(e, Q, mt) + lt * 0.15, mt, a() * ye, lt, lt * (0.55 + a() * 0.4), lt, a() * 0.5, a() * 0.5)), H) {
        const tt = W.z * s + W.x, it = c.get(tt) ?? [];
        it.push({ m: N, i: J }), c.set(tt, it);
      }
      N.setColorAt(J++, new Jt(B).multiplyScalar(0.85 + a() * 0.3));
    }
    return N.count = J, N.castShadow = N.receiveShadow = !0, N.computeBoundingSphere(), t.add(N), N;
  };
  u(e.res.filter((z) => z.kind === Ne), "#c4bdae", 0.75, 2);
  const g = e.res.filter((z) => z.kind === ke);
  d.push(u(g, "#7a6a58", 0.7, 2), u(g, "#4fa58a", 0.32, 2));
  const b = e.res.filter((z) => z.kind === ee), k = new Ht(Qa.ico, Yt({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, b.length)), v = new Ht(Qa.ico, Yt({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, b.length * 6)), M = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
  b.forEach((z, B) => {
    const L = z.x + 0.5, E = z.z + 0.5, H = ft(e, L, E);
    k.setMatrixAt(B, x(L, H + 0.35, E, a() * ye, 1.05, 0.85, 1.05));
    const N = [];
    for (let J = 0; J < 6; J++) {
      const W = a() * ye, Z = x(L + Math.cos(W) * 0.45, H + 0.35 + a() * 0.35, E + Math.sin(W) * 0.45, 0, 0.11, 0.11, 0.11);
      v.setMatrixAt(B * 6 + J, Z), N.push(Z);
    }
    M.set(z.z * s + z.x, N), y.set(z.z * s + z.x, B * 6);
  });
  for (const z of [k, v])
    z.castShadow = !0, z.computeBoundingSphere(), t.add(z);
  const $ = St((z) => {
    for (let B = 0; B < 3; B++) z.add("cone4", "#ffffff", x((B - 1) * 0.12, 0, B % 2 * 0.1, B * 2, 0.14, 0.5 + B * 0.08, 0.14, (B - 1) * 0.3, (B - 1) * 0.25), 0.15);
  }), q = [];
  for (let z = 0; z < 3e4 && q.length < 3200; z++) {
    const B = a() * s, L = a() * s, E = Math.floor(L) * s + Math.floor(B), H = e.terrain[E];
    if (H !== Ke && H !== Ie || e.tree[E]) continue;
    const N = ft(e, B, L);
    N < 0.7 || N > 14 || H === Ie && N > ai - 0.3 || q.push(x(B, N - 0.02, L, a() * ye, 0.6 + a() * 0.6, 0.5 + a() * 0.6, 0.6 + a() * 0.6));
  }
  const A = new Ht($, Yt({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, q.length));
  q.forEach((z, B) => {
    A.setMatrixAt(B, z), A.setColorAt(B, new Jt(0.85 + a() * 0.3, 0.85 + a() * 0.3, 0.85 + a() * 0.3));
  }), A.receiveShadow = !0, A.computeBoundingSphere(), t.add(A);
  const T = (z, B) => {
    for (const L of r) L.t.count = L.c.count = Math.floor(L.n * z);
    A.count = Math.floor(q.length * B);
  }, w = (z) => {
    const B = l.get(z);
    B && (B.t.setMatrixAt(B.i, zs), B.c.setMatrixAt(B.i, zs), B.t.instanceMatrix.needsUpdate = B.c.instanceMatrix.needsUpdate = !0, l.delete(z));
  }, S = (z) => {
    O(z, !1);
    const B = c.get(z);
    if (B) {
      for (const { m: L, i: E } of B)
        L.setMatrixAt(E, zs), L.instanceMatrix.needsUpdate = !0;
      c.delete(z);
    }
  }, O = (z, B) => {
    const L = M.get(z), E = y.get(z);
    !L || E === void 0 || (L.forEach((H, N) => v.setMatrixAt(E + N, B ? H : zs)), v.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: d, tufts: A, setDensity: T, removeTree: w, removeRes: S, setBerries: O };
}
function mc(e, t = !1) {
  const a = e[0].index !== null, s = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), o = {}, n = {}, r = e[0].morphTargetsRelative, l = new aa();
  let c = 0;
  for (let h = 0; h < e.length; ++h) {
    const f = e[h];
    let d = 0;
    if (a !== (f.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const u in f.attributes) {
      if (!s.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + '. All geometries must have compatible attributes; make sure "' + u + '" attribute exists among all geometries, or in none of them.'), null;
      o[u] === void 0 && (o[u] = []), o[u].push(f.attributes[u]), d++;
    }
    if (d !== s.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". Make sure all geometries have the same number of attributes."), null;
    if (r !== f.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const u in f.morphAttributes) {
      if (!i.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ".  .morphAttributes must be consistent throughout all geometries."), null;
      n[u] === void 0 && (n[u] = []), n[u].push(f.morphAttributes[u]);
    }
    if (t) {
      let u;
      if (a)
        u = f.index.count;
      else if (f.attributes.position !== void 0)
        u = f.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(c, u, h), c += u;
    }
  }
  if (a) {
    let h = 0;
    const f = [];
    for (let d = 0; d < e.length; ++d) {
      const u = e[d].index;
      for (let g = 0; g < u.count; ++g)
        f.push(u.getX(g) + h);
      h += e[d].attributes.position.count;
    }
    l.setIndex(f);
  }
  for (const h in o) {
    const f = Bo(o[h]);
    if (!f)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " attribute."), null;
    l.setAttribute(h, f);
  }
  for (const h in n) {
    const f = n[h][0].length;
    if (f === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[h] = [];
    for (let d = 0; d < f; ++d) {
      const u = [];
      for (let b = 0; b < n[h].length; ++b)
        u.push(n[h][b][d]);
      const g = Bo(u);
      if (!g)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " morphAttribute."), null;
      l.morphAttributes[h].push(g);
    }
  }
  return l;
}
function Bo(e) {
  let t, a, s, i = -1, o = 0;
  for (let c = 0; c < e.length; ++c) {
    const h = e[c];
    if (t === void 0 && (t = h.array.constructor), t !== h.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (a === void 0 && (a = h.itemSize), a !== h.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (s === void 0 && (s = h.normalized), s !== h.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (i === -1 && (i = h.gpuType), i !== h.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    o += h.count * a;
  }
  const n = new t(o), r = new Te(n, a, s);
  let l = 0;
  for (let c = 0; c < e.length; ++c) {
    const h = e[c];
    if (h.isInterleavedBufferAttribute) {
      const f = l / a;
      for (let d = 0, u = h.count; d < u; d++)
        for (let g = 0; g < a; g++) {
          const b = h.getComponent(d, g);
          r.setComponent(d + f, g, b);
        }
    } else
      n.set(h.array, l);
    l += h.count * a;
  }
  return i !== void 0 && (r.gpuType = i), r;
}
const ze = {
  emit: (e, t, a, s) => {
  }
}, na = new ue().makeScale(0, 0, 0), gc = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], bc = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], vc = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], yc = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], kc = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85"], xc = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], Ri = "#b5813e";
function Mc(e) {
  const t = [], a = [], s = new Jt();
  for (const [o, n] of e) {
    const r = o.index ? o.toNonIndexed() : o, l = r.attributes.position.array;
    s.set(n);
    for (let c = 0; c < l.length; c += 3)
      t.push(l[c], l[c + 1], l[c + 2]), a.push(s.r, s.g, s.b);
  }
  const i = new aa();
  return i.setAttribute("position", new va(t, 3)), i.setAttribute("color", new va(a, 3)), i.computeVertexNormals(), i;
}
const mi = {
  leg: new le(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new Na(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new le(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new le(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new yn(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: mc([new Ci(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new Ci(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new Na(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: St((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", x(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: St((e) => {
    e.add("cyl5", "#6b4a2f", x(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", x(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: St((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", x(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: St((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", x(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: St((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: St((e) => {
    e.add("cyl5", "#8a6a48", x(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", x(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", x(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: Mc([[new Vr(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new le(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: St((e) => {
    e.add("cyl5", "#4a3326", x(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", Ri, x(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", x(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", x(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: St((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", x(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", x(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", x(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new le(0.26, 0.26, 0.15)
}, qo = {
  body: new le(1, 1, 1),
  neck: new le(1, 1, 1).translate(0, 0.5, 0),
  collar: new le(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: St((e) => {
    e.add("box", "#ffffff", x(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", x(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: St((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", x(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new le(1, 1, 1).translate(0, -0.5, 0),
  tail: new le(1, 1, 1).translate(0, -0.5, 0),
  antlers: St((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", x(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", x(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", x(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: St((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", x(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", x(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: St((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", x(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, gi = {
  body: St((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", x(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", x(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", x(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", x(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", x(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", x(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", x(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", x(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", x(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new Na(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: St((e) => {
    e.add("cyl8", "#5e4431", x(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", x(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", x(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", x(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new le(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, Oe = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, Yn = Oe.horse.leg + Oe.horse.body[1], Xa = (e) => e * e * (3 - 2 * e);
function Ga(e, t, a) {
  if (e < 0.12) return a - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return a + (t - a) * Xa((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const s = (e - 0.8) / 0.2;
  return t + (a - t) * s * s;
}
const Va = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, Fi = 2.6;
function Xn(e) {
  const t = _[e]?.key ?? "";
  if (t === "horseman") return Oe.horse.leg + Oe.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  const a = Oe[t];
  return a ? a.leg + a.body[1] * 0.5 : 0.72;
}
function zc(e) {
  const t = _[e]?.key ?? "";
  if (t === "horseman") return Yn + 0.1;
  if (t === "ram") return 1.15;
  const a = Oe[t];
  return a ? a.leg + a.body[1] + 0.06 : 1.15;
}
const Ka = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, Fe = (e, t) => e[Math.floor(t * e.length) % e.length];
class Ac {
  constructor(t = 720, a = 160) {
    m(this, "group", new ja());
    m(this, "hm", {});
    m(this, "am", {});
    m(this, "rm", {});
    m(this, "slotR");
    m(this, "maxR", 48);
    m(this, "ring");
    m(this, "barBg");
    m(this, "barFg");
    m(this, "slotH");
    m(this, "slotA");
    m(this, "lookKey", []);
    m(this, "heading", new Float32Array(4096));
    m(this, "phase", new Float32Array(4096));
    m(this, "lastP", new Float32Array(4096));
    m(this, "lastCd", new Int16Array(4096));
    m(this, "lastCarry", new Int16Array(4096));
    // para o som: golpe, ataque e entrega
    m(this, "m", { b: new ue(), hip: new ue(), tor: new ue(), l: new ue(), t: new ue(), al: new ue(), ar: new ue(), hd: new ue() });
    m(this, "e", new kn());
    m(this, "q", new to());
    m(this, "p", new wt());
    m(this, "s", new wt());
    m(this, "v", new wt());
    m(this, "c", new Jt());
    this.maxH = t, this.maxA = a;
    const s = Yt({}, { NO_SNOW: "" }), i = Yt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const r in mi) {
      const l = r === "leg" || r === "arm" ? t * 2 : t, c = !!mi[r].attributes.color, h = new Ht(mi[r], c ? i : s, l);
      h.instanceMatrix.setUsage(pe), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.hm[r] = h;
    }
    for (const r in qo) {
      const l = r === "leg" ? a * 4 : a, c = ["head", "ears", "antlers", "horns", "tusks"].includes(r), h = new Ht(qo[r], c ? i : s, l);
      h.instanceMatrix.setUsage(pe), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.am[r] = h;
    }
    for (const r in gi) {
      const l = r === "wheel" ? this.maxR * 4 : this.maxR, c = !!gi[r].attributes.color, h = new Ht(gi[r], c ? i : s, l);
      h.instanceMatrix.setUsage(pe), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set(r === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(h), this.rm[r] = h;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const o = new xn(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new Ht(o, new ga({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const n = new ei(1, 0.11);
    this.barBg = new Ht(n, new ga({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new Ht(n.clone().translate(0.5, 0, 0), new ga({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const r of [this.ring, this.barBg, this.barFg])
      r.instanceMatrix.setUsage(pe), r.frustumCulled = !1, r.count = 0, this.group.add(r);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let r = 0; r < t; r++) this.ring.setColorAt(r, this.c.set("#9dffc4"));
    for (let r = 0; r < 400; r++) this.barFg.setColorAt(r, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(a).fill(-1);
  }
  trs(t, a, s, i, o = 0, n = 0, r = 0, l = 1, c = l, h = l) {
    return this.e.set(o, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(a, s, i), this.s.set(l, c, h), t.compose(this.p, this.q, this.s);
  }
  look(t, a) {
    const s = Ka(a * 7 + 1), i = Ka(a * 13 + 5), o = t.owner[a], n = o >= 0 && o < t.players.length ? t.players[o].era : 0, r = o === Be ? "#4f6b4a" : t.players[o]?.color ?? "#888", l = _[t.kind[a]].key, c = Fe(gc, s), h = Fe(bc, i), f = Fe(vc, i), d = Fe(yc, s), u = { skin: c, hair: h, tunic: f, skirt: r, legs: c, arms: c, weapon: null, shield: null, bigHair: !1, sc: 0.95 + s * 0.08 };
    switch (l) {
      case "villager":
        return { ...u, tunic: n ? d : f, arms: n ? c : f };
      case "warrior":
        return { ...u, tunic: r, skirt: f, weapon: "club", sc: 1.02 };
      case "axeman":
        return { ...u, tunic: r, skirt: d, weapon: "axe", sc: 1.04 };
      case "hunter":
        return { ...u, weapon: "spear" };
      case "archer":
        return { ...u, tunic: r, skirt: d, weapon: "bow" };
      case "spearman":
        return { ...u, tunic: r, skirt: d, weapon: "spear", shield: n >= 2 ? Ri : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...u, tunic: r, skirt: d, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...u, tunic: d, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...u, tunic: r, skirt: d, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...u, tunic: Fe(["#4f6b4a", "#6b5a3a", "#3f5a6a"], s), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: Fe(["#3f6a4a", "#8a6a3a"], i), hair: Fe(["#c48a4a", "#8a5a2a", "#d9a35f"], s), bigHair: !0, sc: 1.05 };
    }
    return u;
  }
  colorHuman(t, a) {
    const s = this.hm, i = this.c;
    s.leg.setColorAt(t * 2, i.set(a.legs)), s.leg.setColorAt(t * 2 + 1, i), s.skirt.setColorAt(t, i.set(a.skirt)), s.torso.setColorAt(t, i.set(a.tunic)), s.arm.setColorAt(t * 2, i.set(a.arms)), s.arm.setColorAt(t * 2 + 1, i), s.head.setColorAt(t, i.set(a.skin)), s.hair.setColorAt(t, i.set(a.helmet ? Ri : a.hair)), s.shield.setColorAt(t, i.set(a.shield ?? "#888"));
    for (const o in s) s[o].instanceColor && (s[o].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, a) {
    const s = t.kind[a] === kt ? t.sub[a] : t.kind[a];
    return _[s]?.key ?? "deer";
  }
  update(t, a, s, i, o, n, r, l) {
    const c = t.size, h = t.vis[o], f = this.hm, d = this.am, u = this.rm;
    let g = 0, b = 0, k = 0, v = 0, M = 0;
    for (let y = 0; y < t.top; y++) {
      if (!t.alive[y]) continue;
      const $ = t.kind[y];
      if ($ >= xt) {
        const W = Et[$ - xt], Z = t.x[y] / 256, Q = t.z[y] / 256;
        if (n && t.owner[y] !== o && !h[Math.floor(Q) * c + Math.floor(Z)]) continue;
        const mt = ft(t.map, Z, Q), lt = i.has(y);
        lt && k < this.maxH && this.ring.setMatrixAt(k++, x(Z, mt + 0.08, Q, 0, W.size * 0.95, 1, W.size * 0.95)), (lt || t.hp[y] < W.hp) && v < 400 && this.bar(v++, Z, mt + 2.3, Q, t.hp[y] / W.hp, W.size * 0.6, l);
        continue;
      }
      const q = (t.px[y] + (t.x[y] - t.px[y]) * a) / 256, A = (t.pz[y] + (t.z[y] - t.pz[y]) * a) / 256;
      if (n && t.owner[y] !== o) {
        const W = Math.floor(q), Z = Math.floor(A);
        if (W < 0 || Z < 0 || W >= c || Z >= c || !h[Z * c + W]) continue;
      }
      const T = t.x[y] - t.px[y], w = t.z[y] - t.pz[y], S = (T !== 0 || w !== 0) && t.state[y] === Xt, O = ft(t.map, q, A);
      let z = this.heading[y];
      if (S) z = Math.atan2(T, w);
      else if ($ !== kt && (t.task[y] === jt || t.task[y] === qe || t.task[y] === Ft) && t.tgt[y] >= 0) {
        const W = t.tgt[y];
        let Z, Q;
        t.task[y] === jt && t.tgtTile[y] ? (Z = W % c + 0.5, Q = Math.floor(W / c) + 0.5) : (Z = t.x[W] / 256, Q = t.z[W] / 256), Math.abs(Z - q) + Math.abs(Q - A) > 0.05 && (z = Math.atan2(Z - q, Q - A));
      }
      const B = this.heading[y];
      this.heading[y] = B + Math.atan2(Math.sin(z - B), Math.cos(z - B)) * Math.min(1, s * 10);
      const L = this.heading[y], E = Math.hypot(T, w) / 256 * 10, H = $ === kt ? "" : _[$].key, N = $ === kt || t.owner[y] === zt || H === "dog";
      if (H === "ram") {
        if (M >= this.maxR) continue;
        this.phase[y] += S ? s * E / 0.22 : 0, this.slotR[M] !== y * 8 + t.owner[y] + 1 && (this.slotR[M] = y * 8 + t.owner[y] + 1, u.cloth.setColorAt(M, this.c.set(t.players[t.owner[y]]?.color ?? "#888")), u.cloth.instanceColor && (u.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, y, M, q, O, A, L, a), M++;
      } else if (H === "horseman") {
        if (b >= this.maxA || g >= this.maxH) continue;
        const W = Oe.horse, Z = E > 1.1;
        this.phase[y] += S ? s * E * 2.6 / W.leg : 0;
        const Q = y * 64 + $;
        if (this.slotA[b] !== Q) {
          this.slotA[b] = Q;
          const At = this.c.set(Fe(W.color, Ka(y)));
          for (const _t of ["body", "neck", "head", "ears", "tail"]) d[_t].setColorAt(b, At);
          for (let _t = 0; _t < 4; _t++) d.leg.setColorAt(b * 4 + _t, At);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[y]]?.color ?? "#888"));
          for (const _t in d) d[_t].instanceColor && (d[_t].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(b, W, q, O, A, L, S, this.phase[y], r, !1, Z, !1, 1, !1, 0, 0, !0, !0), b++;
        const mt = t.owner[y], lt = `${$}:${mt}:${mt >= 0 && mt < t.players.length ? t.players[mt].era : 0}`, tt = this.look(t, y);
        (this.slotH[g] !== y || this.lookKey[g] !== lt) && (this.slotH[g] = y, this.lookKey[g] = lt, this.colorHuman(g, tt));
        const it = S ? Math.abs(Math.cos(this.phase[y])) * (Z ? 0.06 : 0.025) : 0;
        if (S && Z) {
          const At = this.phase[y] / Math.PI % 2;
          At < this.lastP[y] && ze.emit("animal.hooves", q, A, 0.5), this.lastP[y] = At;
        }
        this.poseHuman(t, y, g, tt, q, O, A, L, S, r, a, Yn + it - 0.44 * tt.sc), g++;
      } else if (N) {
        if (b >= this.maxA) continue;
        const W = this.speciesOf(t, y), Z = Oe[W] ?? Oe.deer;
        this.phase[y] += S ? s * E * 2.6 / Z.leg : 0;
        const Q = y * 64 + $;
        if (this.slotA[b] !== Q) {
          this.slotA[b] = Q;
          const it = this.c.set(Fe(Z.color, Ka(y)));
          $ === kt && it.multiplyScalar(0.8);
          for (const At of ["body", "neck", "head", "ears", "tail"]) d[At].setColorAt(b, it);
          for (let At = 0; At < 4; At++) d.leg.setColorAt(b * 4 + At, it);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[y]]?.color ?? "#888"));
          for (const At in d) d[At].instanceColor && (d[At].instanceColor.needsUpdate = !0);
        }
        const mt = $ !== kt && t.task[y] === Ft && !S;
        let lt = 0, tt = 0;
        if (mt) {
          const it = 1 - Math.max(0, Math.min(1, (t.cd[y] - a) / _[$].cd));
          lt = it > 0.8 ? (it - 0.8) / 0.2 : it < 0.2 ? 1 - it / 0.2 : 0;
          const At = t.tgt[y];
          if (At >= 0 && t.alive[At]) {
            const _t = Math.hypot(t.x[At] - t.x[y], t.z[At] - t.z[y]) / 256, Tt = Z.body[2] * 0.5 + Z.neck * 0.3 + Z.head[2] * 0.85, ae = t.kind[At] < kt ? _[t.kind[At]].radius : 0.5;
            tt = Math.max(0, Math.min(Z.body[2] * 0.3, _t - Tt - ae * 0.95));
          }
        }
        mt && t.cd[y] > this.lastCd[y] && ze.emit(W === "boar" ? "hit.boar" : W === "aurochs" ? "hit.aurochs" : "hit.bite", q, A), this.lastCd[y] = $ === kt ? 0 : t.cd[y], this.poseAnimal(b, Z, q, O, A, L, S, this.phase[y], r, $ === kt, t.fast[y] === 1, W === "deer" && Ka(y * 3) < 0.5, $ === kt ? 1 : 1 + (W === "aurochs" ? 0.1 : 0), mt, lt, tt, t.owner[y] >= 0 && $ !== kt), b++;
      } else {
        if (g >= this.maxH) continue;
        this.phase[y] += S ? s * E * 7.2 : 0;
        const W = t.owner[y], Z = `${$}:${W}:${W >= 0 && W < t.players.length ? t.players[W].era : 0}`, Q = this.look(t, y);
        (this.slotH[g] !== y || this.lookKey[g] !== Z) && (this.slotH[g] = y, this.lookKey[g] = Z, this.colorHuman(g, Q)), this.poseHuman(t, y, g, Q, q, O, A, L, S, r, a), g++;
      }
      const J = H === "ram" ? 1.9 : H === "horseman" ? 1.6 : N ? 1.2 : 1;
      i.has(y) && k < this.maxH && this.ring.setMatrixAt(k++, x(q, O + 0.06, A, 0, J, 1, J)), $ !== kt && (i.has(y) || t.hp[y] < _[$].hp) && v < 400 && this.bar(v++, q, O + (H === "horseman" ? 2.6 : H === "ram" ? 1.75 : N ? 1.3 : 1.55), A, t.hp[y] / _[$].hp, H === "ram" || H === "horseman" ? 0.9 : 0.7, l);
    }
    for (const y in f)
      f[y].count = g, f[y].instanceMatrix.needsUpdate = !0;
    f.leg.count = f.arm.count = g * 2;
    for (const y in d)
      d[y].count = b, d[y].instanceMatrix.needsUpdate = !0;
    d.leg.count = b * 4;
    for (const y in u)
      u[y].count = M, u[y].instanceMatrix.needsUpdate = !0;
    u.wheel.count = M * 4, this.ring.count = k, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = v, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
  }
  bar(t, a, s, i, o, n, r) {
    o = Math.max(0, Math.min(1, o)), this.p.set(a, s, i), this.s.set(n, 1, 1), this.barBg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.v.set(-n / 2, 0, 0).applyQuaternion(r), this.p.set(a + this.v.x, s + this.v.y, i + this.v.z), this.s.set(n * o, 1, 1), this.barFg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.barFg.setColorAt(t, this.c.set(o > 0.6 ? "#6fe08a" : o > 0.3 ? "#f2c14e" : "#e0533c"));
  }
  /** mão direita ou esquerda (ponto no braço) em coordenadas do mundo, com a orientação do tronco e um giro em X */
  gripTorso(t, a, s, i, o = 0) {
    return this.v.set(0, -0.35, s).applyMatrix4(a), t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t, 0, 0, 0, i, o));
  }
  /** mount > 0: montado (altura extra do quadril, em cima do cavalo) */
  poseHuman(t, a, s, i, o, n, r, l, c, h, f, d = 0) {
    const u = this.hm, g = this.m, b = this.phase[a], k = Math.sin(b), v = h + a * 0.37, M = d > 0;
    let y = 0, $ = 0, q = 0.05 + Math.sin(v * 1.3) * 0.03, A = -0.05 - Math.sin(v * 1.3) * 0.03, T = 0.07, w = -0.07, S = 0, O = 0, z = 0, B = 0, L = 0, E = i.weapon, H = i.weapon === "spear" ? "torso" : i.weapon === "bow" ? "left" : "arm", N = i.weapon === "spear" ? 0.12 : i.weapon === "bow" ? 0 : i.weapon === "sling" ? Math.PI - 0.12 : i.weapon === "sword" ? Math.PI - 0.3 : 0.79, J = 0, W = !1, Z = 0;
    const Q = () => {
      w = -0.42, T = 0.42, q = A + 0.06;
    }, mt = t.task[a];
    if (M && (c || mt !== Ft || t.state[a] === Xt))
      q = -0.75, T = 0.1, A = -0.25, S = c ? 0.14 : 0.03;
    else if (c)
      y = k * 0.65, $ = -k * 0.65, q = -k * 0.5, A = k * 0.5, O = Math.abs(Math.cos(b)) * 0.035;
    else if (mt === jt && t.phase[a] === _n) {
      const lt = t.tgt[a], tt = t.tgtTile[a] === 1, it = tt && t.map.tree[lt] > 0, At = tt && t.resKind[lt] === 1, _t = !tt && t.kind[lt] >= xt, Tt = (ae, ie) => {
        const sa = v / ae % 1;
        sa < this.lastP[a] && ze.emit(ie, o, r), this.lastP[a] = sa;
      };
      if (it)
        A = Ga(v / 1 % 1, -2.75, -1.35), Q(), S = 0.1 + Va(v / 1 % 1) * 0.12, E = "axe", H = "arm", N = Math.PI - 0.6, Tt(1, "work.chop");
      else if (tt && !At)
        A = Ga(v / 1.15 % 1, -2.8, -0.55), Q(), S = 0.22 + Va(v / 1.15 % 1) * 0.14, E = "pick", H = "arm", N = Math.PI - 0.6, Tt(1.15, t.resKind[lt] === 3 ? "work.pickMetal" : "work.pick");
      else if (_t)
        A = Ga(v / 1.4 % 1, -1.95, -0.35), Q(), S = 0.32 + Va(v / 1.4 % 1) * 0.1, E = "pick", H = "arm", N = Math.PI - 0.7, Tt(1.4, "work.hoe");
      else if (At) {
        const ae = Math.sin(v * 4.5);
        A = -0.95 + ae * 0.45, q = -0.95 - ae * 0.45, w = -0.2, T = 0.2, S = 0.5, E = null, Tt(1.4, "work.rustle");
      } else
        A = -0.55 + Math.sin(v * 7) * 0.3, q = -0.4, S = 0.68, E = null, Tt(1.6, "work.rustle");
    } else if (mt === qe && t.state[a] !== Xt) {
      const lt = v / 0.75 % 1;
      A = Ga(lt, -2.3, -0.7), w = -0.15, q = -0.75, S = 0.15 + Va(lt) * 0.08, E = "mallet", H = "arm", N = Math.PI - 0.75, lt < this.lastP[a] && ze.emit("work.mallet", o, r), this.lastP[a] = lt;
    } else if (mt === Ft && t.state[a] !== Xt) {
      const lt = _[t.kind[a]], tt = 1 - Math.max(0, Math.min(1, (t.cd[a] - f) / lt.cd)), it = t.tgt[a], At = !!lt.hunt && it >= 0 && t.owner[it] === zt;
      if (t.cd[a] > this.lastCd[a] && !lt.proj && !(At && it >= 0 && t.alive[it] && t.reach(a, it, !1) / 256 >= Fi)) {
        const Tt = it >= 0 && t.kind[it] >= xt;
        ze.emit(Tt ? "hit.wall" : i.weapon === "sword" ? "hit.sword" : i.weapon === "axe" ? "hit.axe" : i.weapon === "spear" ? "hit.spear" : "hit.club", o, r);
      }
      const _t = it >= 0 && t.alive[it] ? t.reach(a, it, !1) / 256 : 9;
      if (lt.proj === "arrow" || i.weapon === "bow")
        E = "bow", H = "left", N = 0, q = -1.5, T = 0.2, w = -0.3, S = -0.04, A = tt < 0.2 ? -0.95 - tt / 0.2 * 0.5 : -1.45, W = tt >= 0.25;
      else if (lt.proj === "stone")
        if (E = "sling", H = "arm", q = -0.55, T = 0.18, S = -0.03, tt < 0.2) {
          const Tt = tt / 0.2;
          A = -0.75 - Tt * 2.05, N = Math.PI / 2 + 0.7 - Tt * 0.85;
        } else if (tt < 0.85)
          A = -2.8, w = -0.18, N = Math.PI / 2 - 0.1, L = v * 15;
        else {
          const Tt = (tt - 0.85) / 0.15;
          A = -2.8 + Xa(Tt) * 2.05, N = Math.PI / 2 - 0.1 + Tt * 0.8, S = -0.03 + Tt * 0.12;
        }
      else if ((lt.proj === "spear" || At) && _t >= Fi)
        if (E = tt < 0.3 ? null : "spear", H = "torso", N = Math.PI / 2 - 0.25, J = 0.1, q = -1, S = -0.05, tt < 0.3)
          A = -1.25 + tt / 0.3 * 1.05, S = 0.12 - tt / 0.3 * 0.17;
        else if (tt < 0.75) A = -0.2 - Xa((tt - 0.3) / 0.45) * 2.55;
        else if (tt < 0.9) A = -2.75;
        else {
          const Tt = (tt - 0.9) / 0.1;
          A = -2.75 + Tt * Tt * 1.5, S = -0.05 + Tt * 0.17;
        }
      else if (i.weapon === "spear" || lt.proj === "spear" || At) {
        if (E = "spear", H = "torso", J = 0.05, q = i.shield ? -0.9 : -0.5, T = 0.15, tt < 0.15) A = -1.25;
        else if (tt < 0.85) A = -1.25 + Xa((tt - 0.15) / 0.7) * 0.9;
        else {
          const I = (tt - 0.85) / 0.15;
          A = -0.35 - I * I * 0.9;
        }
        S = 0.06 + (tt > 0.85 ? (tt - 0.85) / 0.15 : tt < 0.15 ? 1 - tt / 0.15 : 0) * 0.12;
        let Tt = _t, ae = 0.72;
        const ie = it >= 0 ? Math.hypot(t.x[it] - t.x[a], t.z[it] - t.z[a]) / 256 : _t;
        if (it >= 0 && t.alive[it] && t.kind[it] < kt) {
          const I = Oe[_[t.kind[it]].key];
          if (ae = Xn(t.kind[it]), I) {
            const R = Math.cos(Math.atan2(t.x[a] - t.x[it], t.z[a] - t.z[it]) - this.heading[it]);
            Tt = ie - Math.max(I.body[0] * 0.55, I.body[2] * 0.5 * Math.abs(R));
          } else {
            const R = _[t.kind[it]].radius;
            Tt = ie - (R > 0.35 ? R * 0.85 : 0.2);
          }
        }
        const sa = 0.35 * Math.sin(-A), ni = (0.84 - 0.35 * Math.cos(A)) * i.sc + d, C = Math.atan2(ni - ae, Math.max(0.4, ie - sa));
        N = Math.PI / 2 + C, Z = Math.max(0, sa + 1.4 * Math.cos(C) - Tt + 0.03);
      } else {
        E || (E = "club");
        const ae = (it >= 0 && t.alive[it] ? t.kind[it] >= xt ? 1 : zc(t.kind[it]) : 0.6) + (E === "sword" ? 0.18 : 0);
        let ie = -0.6;
        for (; ie > -2.2 && (0.84 - 0.35 * Math.cos(ie) - 0.5 * Math.cos(ie - 0.75)) * i.sc + d < ae; ) ie -= 0.05;
        H = "arm", N = Math.PI - 0.75, A = Ga(tt, -2.6, Math.max(-2.25, ie)), w = -0.15, q = -0.5, S = 0.08 + Va(tt) * 0.12, E === "sword" && (L = 0.22);
      }
    }
    M && (y = $ = -0.38, z = 0.5, B = -0.5), this.lastCd[a] = t.cd[a], this.lastCarry[a] > 0 && t.carry[a] === 0 && t.task[a] === jt && ze.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal"][t.carryRes[a]] ?? "drop.food", o, r), this.lastCarry[a] = t.carry[a], this.trs(g.b, o, n + O + d, r, 0, l, 0, i.sc), g.hip.multiplyMatrices(g.b, this.trs(g.t, 0, 0.46, 0)), g.tor.multiplyMatrices(g.hip, this.trs(g.t, 0, 0, 0, S)), u.torso.setMatrixAt(s, g.tor), u.leg.setMatrixAt(s * 2, g.l.multiplyMatrices(g.hip, this.trs(g.t, 0.09, 0, 0, y, 0, z))), u.leg.setMatrixAt(s * 2 + 1, g.l.multiplyMatrices(g.hip, this.trs(g.t, -0.09, 0, 0, $, 0, B))), u.skirt.setMatrixAt(s, g.l.multiplyMatrices(g.hip, this.trs(g.t, 0, 0.03, 0, S * 0.35))), g.al.multiplyMatrices(g.tor, this.trs(g.t, 0.215, 0.38, 0, q, 0, -T)), u.arm.setMatrixAt(s * 2, g.al), g.ar.multiplyMatrices(g.tor, this.trs(g.t, -0.215, 0.38, 0, A, 0, -w)), u.arm.setMatrixAt(s * 2 + 1, g.ar), g.hd.multiplyMatrices(g.tor, this.trs(g.t, 0, 0.53, 0, -S * 0.6)), u.head.setMatrixAt(s, g.hd), u.hair.setMatrixAt(s, g.l.multiplyMatrices(g.hd, this.trs(g.t, 0, 0.03, -0.012, 0, 0, 0, i.bigHair ? 1.18 : 1))), i.shield ? (this.v.set(0.04, -0.24, 0.13).applyMatrix4(g.al), u.shield.setMatrixAt(s, g.l.copy(g.tor).setPosition(this.v))) : u.shield.setMatrixAt(s, na);
    for (const lt of xc) u[lt].setMatrixAt(s, na);
    E && (H === "arm" ? u[E].setMatrixAt(s, g.l.multiplyMatrices(g.ar, this.trs(g.t, 0, -0.35, 0, N, L))) : (this.gripTorso(g.l, H === "left" ? g.al : g.ar, H === "left" ? 0.02 : 0, N, H === "torso" ? J : 0), Z && g.l.multiply(this.trs(g.t, 0, -Z, 0)), u[E].setMatrixAt(s, g.l))), W && u.arrow.setMatrixAt(s, this.gripTorso(g.l, g.al, 0.02, Math.PI / 2, -0.12)), t.carry[a] > 0 ? (u.carry.setMatrixAt(s, g.l.multiplyMatrices(g.tor, this.trs(g.t, 0, 0.2, -0.19))), u.carry.setColorAt(s, this.c.set(kc[t.carryRes[a]] ?? "#888")), u.carry.instanceColor && (u.carry.instanceColor.needsUpdate = !0)) : u.carry.setMatrixAt(s, na);
  }
  poseAnimal(t, a, s, i, o, n, r, l, c, h, f, d, u, g = !1, b = 0, k = 0, v = !1, M = !1) {
    const y = this.am, $ = this.m, [q, A, T] = a.body, [w, S, O] = a.head, z = a.leg + A * 0.5, B = r ? Math.sin(l) * (f ? 0.8 : 0.45) : 0, L = r ? Math.abs(Math.cos(l)) * (f ? 0.06 : 0.025) : 0;
    h ? this.trs($.b, s, i + q * 0.5 - z * 0, o, 0, n, Math.PI / 2, u) : this.trs($.b, s, i + L, o, 0, n, 0, u), h && $.b.multiply(this.trs($.t, 0, -z + q * 0.1, 0)), b > 0 && $.b.multiply(this.trs($.t, 0, 0, k * b, 0.1 * b)), y.body.setMatrixAt(t, $.l.multiplyMatrices($.b, this.trs($.t, 0, z, 0, 0, 0, 0, q, A, T))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([W, Z], Q) => y.leg.setMatrixAt(t * 4 + Q, $.l.multiplyMatrices($.b, this.trs($.t, W * q * 0.32, a.leg, Z * T * 0.36, W * Z > 0 ? B : -B, 0, 0, a.legW, a.leg, a.legW))));
    const E = h ? 0.2 : M ? f ? 0.22 : r ? 0.08 : 0.12 + Math.sin(c * 1.3 + s) * 0.04 : g ? 0.05 + b * 0.55 : r ? f ? 0.15 : -0.3 : 0.9 + Math.sin(c * 1.7 + s) * 0.08;
    $.hd.multiplyMatrices($.b, this.trs($.t, 0, z + A * 0.3, T * 0.46, E));
    const H = a.neckTilt ?? 0.29, N = a.neckW ?? 0.72;
    y.neck.setMatrixAt(t, $.l.multiplyMatrices($.hd, this.trs($.t, 0, -0.04, 0, H, 0, 0, w * N, a.neck * 1.05 + 0.1, S * N))), M ? y.collar.setMatrixAt(t, $.l.multiplyMatrices($.b, this.trs($.t, 0, z + A * 0.5 - 0.17, -T * 0.04, 0, 0, 0, q * 1.14, 0.22, T * 0.4))) : y.collar.setMatrixAt(t, v ? $.l.multiplyMatrices($.hd, this.trs($.t, 0, a.neck * 0.45, a.neck * 0.13, 0.29, 0, 0, w * 0.9, 0.06, S * 0.9)) : na), $.hd.multiply(this.trs($.t, 0, a.neck * Math.cos(H) / Math.cos(0.29), a.neck * Math.sin(H) * (0.3 / Math.sin(0.29)) + O * 0.3, -E * 0.6 + (a.headTilt ?? 0))), y.head.setMatrixAt(t, $.l.multiplyMatrices($.hd, this.trs($.t, 0, 0, 0, 0, 0, 0, w, S, O)));
    const J = Math.min(w / 0.15, 1.35);
    y.ears.setMatrixAt(t, $.l.multiplyMatrices($.hd, this.trs($.t, 0, S * 0.5, -O * 0.2, -(a.headTilt ?? 0) * 0.85, 0, 0, J, J, J))), y.antlers.setMatrixAt(t, d && a.antl ? $.l.multiplyMatrices($.hd, this.trs($.t, 0, S * 0.45, -O * 0.12)) : na), y.horns.setMatrixAt(t, a.horns ? $.l.multiplyMatrices($.hd, this.trs($.t, 0, S * 0.35, O * 0.02)) : na), y.tusks.setMatrixAt(t, a.tusks ? $.l.multiplyMatrices($.hd, this.trs($.t, 0, -S * 0.25, O * 0.72, -0.6)) : na), y.tail.setMatrixAt(t, $.l.multiplyMatrices($.b, this.trs($.t, 0, z + A * 0.32, -T * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(c * 3 + s) * 0.06), 0, 0, a.tail[0], a.tail[1], a.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, a, s, i, o, n, r, l) {
    const c = this.rm, h = this.m, f = this.phase[a];
    t.task[a] === Ft && t.cd[a] > this.lastCd[a] && ze.emit("ram.boom", i, n), this.lastCd[a] = t.cd[a];
    {
      const b = f / Math.PI % 2;
      b < this.lastP[a] && ze.emit("ram.creak", i, n, 0.7), this.lastP[a] = b;
    }
    this.trs(h.b, i, o, n, 0, r, 0), c.body.setMatrixAt(s, h.b), c.cloth.setMatrixAt(s, h.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([b, k], v) => c.wheel.setMatrixAt(s * 4 + v, h.l.multiplyMatrices(h.b, this.trs(h.t, b * 0.5, 0.22, k * 0.55, f))));
    let d = 0;
    if (t.task[a] === Ft && t.state[a] !== Xt) {
      const b = 1 - Math.max(0, Math.min(1, (t.cd[a] - l) / _[t.kind[a]].cd));
      d = b < 0.15 ? 0.06 * (1 - b / 0.15) : b < 0.85 ? Xa((b - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((b - 0.85) / 0.15) ** 2);
    }
    let u = 0;
    const g = t.tgt[a];
    if (t.task[a] === Ft && g >= 0 && t.alive[g] && t.kind[g] >= xt) {
      const b = Cc(t, g, i, n, Math.sin(r), Math.cos(r), 0.62);
      b !== null && (u = Math.max(0, Math.min(0.9, b - 1.33)));
    }
    c.log.setMatrixAt(s, h.l.multiplyMatrices(h.b, this.trs(h.t, 0, 0.62, 0.05 + u - d)));
  }
}
const Nt = "#6e4f37", Qt = "#8a6545", bi = "#a0754c", ra = "#c9a75e", $a = "#b8954f", As = "#cdb48a", Li = "#9b968c", No = "#b98b62", wa = "#b5813e", Ts = "#8a857c", $s = "#a7a196";
function ws(e, t, a, s, i, o, n) {
  const r = n() * ye;
  e.add("cone7", o, x(t, 0, a, r, s * 2, i, s * 2));
  for (let l = 0; l < 3; l++) {
    const c = l * ye / 3 + r;
    e.add("cyl5", Nt, x(t + Math.cos(c) * 0.08, i - 0.3, a + Math.sin(c) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(c) * 0.3, Math.cos(c) * 0.3));
  }
  e.add("box", "#3b2b1f", x(t + Math.sin(r) * s * 0.95, 0, a + Math.cos(r) * s * 0.95, r, 0.36, i * 0.4, 0.05, -Math.atan2(s, i)));
}
function Ro(e, t, a, s, i, o, n, r, l, c = 0) {
  e.add("cyl8", r, x(t, 0, a, c, s * 2, o, i * 2)), e.add("cone7", l, x(t, o - 0.06, a, c, s * 2 + 0.44, n, i * 2 + 0.44));
  const h = o - 0.06 + n * 0.86, f = Math.sin(c), d = Math.cos(c), u = Math.cos(c), g = -Math.sin(c);
  for (const b of [-1, 1]) e.add("cyl5", Nt, x(t + u * b * 0.05, h, a + g * b * 0.05, c, 0.045, 0.42, 0.045, 0, b * 0.62));
  e.add("box", "#3a2a1e", x(t + f * i * 0.94, 0, a + d * i * 0.94, c, 0.42, o * 0.8, 0.08));
}
function vi(e, t, a, s, i, o, n, r) {
  const l = Math.cos(n), c = -Math.sin(n), h = Math.sin(n), f = Math.cos(n);
  for (const [d, u] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", Nt, x(t + l * d * s / 2 + h * u * i / 2, 0, a + c * d * s / 2 + f * u * i / 2, 0, 0.07, u > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", o, x(t, 1.24, a, n, s + 0.2, 0.05, i + 0.3, 0.18)), e.add("box", Qt, x(t + h * i * 0.3, 0, a + f * i * 0.3, n, s * 0.9, 0.55, 0.32)), r.forEach((d, u) => e.add(u % 2 ? "ico" : "cyl8", d, x(t + h * i * 0.3 + l * (u - (r.length - 1) / 2) * 0.24, 0.55, a + f * i * 0.3 + c * (u - (r.length - 1) / 2) * 0.24, 0, 0.17, u % 2 ? 0.17 : 0.2, 0.17)));
}
function Tc(e, t, a, s, i) {
  const o = Math.sin(s), n = Math.cos(s), r = Math.cos(s), l = -Math.sin(s);
  e.add("box", i, x(t, 0.78, a, s, 0.34, 0.42, 1));
  for (const [c, h] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", i, x(t + r * c * 0.12 + o * h * 0.36, 0, a + l * c * 0.12 + n * h * 0.36, s, 0.09, 0.8, 0.09));
  e.add("box", i, x(t + o * 0.52, 1, a + n * 0.52, s, 0.16, 0.5, 0.2, 0.5)), e.add("box", i, x(t + o * 0.72, 1.34, a + n * 0.72, s, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", x(t + o * 0.5, 1.1, a + n * 0.5, s, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", x(t - o * 0.52, 0.55, a - n * 0.52, s, 0.07, 0.42, 0.07, -0.25));
}
function Fo(e, t, a, s, i, o, n = 0) {
  e.add("cyl8", "#6b4a2f", x(t, a + i * Math.cos(n), s, o, i * 2, 0.08, i * 2, 0, Math.PI / 2 + n));
}
function Ss(e, t, a, s = 1) {
  for (let i = 0; i < 9; i++) {
    const o = i / 9 * ye;
    e.add("dode", "#8a857c", x(t + Math.cos(o) * 0.5 * s, 0.05, a + Math.sin(o) * 0.5 * s, o, 0.24 * s, 0.18 * s, 0.24 * s));
  }
  e.add("cyl5", "#4a3526", x(t, 0.08, a, 0.3, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", x(t, 0.1, a, 1.9, 0.1, 0.8 * s, 0.1, Math.PI / 2, 0));
}
function Cs(e, t, a, s, i, o, n, r, l, c = 0, h = 0) {
  e.add("box", r, x(t, h, a, c, s, o, i)), e.add("prism", l, x(t, h + o - 0.04, a, c, s + 0.4, n, i + 0.36)), e.add("box", "#3a2a1e", x(t + Math.sin(c) * (i / 2 + 0.01), h, a + Math.cos(c) * (i / 2 + 0.01), c, Math.min(0.5, s * 0.3), o * 0.72, 0.06));
}
function Lo(e, t, a, s) {
  for (let i = 0; i < a; i++) {
    const o = i / a * ye;
    e.add("box", Li, x(Math.cos(o) * t, 0, Math.sin(o) * t, o, 0.3, s * (0.8 + i % 3 * 0.15), 0.22));
  }
}
function $c(e, t) {
  const a = Math.round(t * 4);
  for (let s = 0; s <= a; s++) {
    const i = -t + s * 2 * t / a;
    for (const [o, n] of [[i, -t], [i, t], [-t, i], [t, i]]) e.add("cyl5", Nt, x(o, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const s of [0.25, 0.48])
    e.add("box", Qt, x(0, s, -t, 0, t * 2, 0.05, 0.05)), e.add("box", Qt, x(0, s, t, 0, t * 2, 0.05, 0.05)), e.add("box", Qt, x(-t, s, 0, 0, 0.05, 0.05, t * 2)), e.add("box", Qt, x(t, s, 0, 0, 0.05, 0.05, t * 2));
}
function yi(e, t, a, s) {
  e.add("ico", "#ece6d6", x(t, 0.32, a, s, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", x(t + Math.sin(s) * 0.32, 0.36, a + Math.cos(s) * 0.32, s, 0.13, 0.16, 0.2));
  for (const [i, o] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", x(t + i, 0, a + o, s, 0.05, 0.2, 0.05));
}
function wc(e, t, a) {
  const s = new co(a), i = Math.min(t, 2);
  switch (e) {
    case "center":
      if (i === 0)
        Ss(s, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((o, n) => ws(s, Math.cos(o) * 1.45, Math.sin(o) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [bi, "#8d6a46", "#b58a5d"][n % 3], a));
      else if (i === 1)
        Cs(s, 0, -0.4, 2.2, 3.2, 1.3, 1.5, As, ra, Math.PI / 2), Ss(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", x(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        Ro(s, 0, -0.45, 1.5, 1.02, 1.3, 1.75, As, ra);
        for (const o of [-1, 1])
          s.add("cyl5", Nt, x(o * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), s.add("cyl8", wa, x(o * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        s.add("box", Qt, x(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), Ss(s, 1.2, 1.3, 0.6), s.add("cyl8", "#a0654a", x(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), s.add("cyl8", "#8a5a40", x(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      i === 0 ? (ws(s, 0, 0, 0.8, 1.5, bi, a), s.add("box", "#9a7148", x(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : i === 1 ? Cs(s, 0, 0, 1.3, 1.6, 1, 0.95, As, $a, a() < 0.5 ? 0 : Math.PI / 2) : (Ro(s, 0, -0.08, 0.66, 0.5, 0.85, 1, No, $a), s.add("cyl8", "#a0654a", x(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (i === 0) {
        for (let o = 0; o < 6; o++) s.add("cyl5", "#5e4431", x(-0.3, 0.1 + o % 3 * 0.18, -0.35 + Math.floor(o / 3) * 0.18 + o % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        s.add("prism", bi, x(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), s.add("cyl8", "#b48a5c", x(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (i === 1) {
        for (const [o, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) s.add("cyl5", Nt, x(o, 0, n, 0, 0.13, 0.6, 0.13));
        s.add("cyl8", As, x(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), s.add("cone7", ra, x(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [o, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) s.add("cyl5", Nt, x(o, 0, n, 0, 0.12, 0.5, 0.12));
        s.add("box", Qt, x(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), s.add("prism", ra, x(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), s.add("cyl8", "#a0654a", x(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), s.add("cyl8", "#8a5a40", x(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let o = 0; o < 3; o++) s.add("box", wa, x(0.42, o * 0.07, 0.62 + o % 2 * 0.03, o % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (i === 0) {
        Lo(s, 1.15, 10, 0.32), ws(s, -0.55, -0.5, 0.5, 1.2, "#8d6a46", a);
        for (let o = 0; o < 4; o++) s.add("cyl5", "#8a6a48", x(0.6 + o * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        s.add("cyl5", Nt, x(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (i === 1) {
        Cs(s, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", $a, 0);
        for (let o = 0; o < 7; o++) s.add("cyl5", Qt, x(-1.3 + o * 0.4, 0, 1.25, 0, 0.14, 0.9 + o % 2 * 0.15, 0.14));
        for (let o = 0; o < 3; o++) s.add("cyl5", "#8a6a48", x(1, 0, -0.6 + o * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        s.add("box", Ts, x(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), Cs(s, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", $a, Math.PI / 2, 0.25), s.add("box", Nt, x(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let o = 0; o < 4; o++) s.add("cyl5", "#8a6a48", x(0.6 + o * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        s.add("cyl5", Nt, x(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), s.add("box", Nt, x(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), s.add("cyl8", wa, x(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      s.add("box", "#7d5f3e", x(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let o = 0; o < 4; o++) s.add("box", "#6b4f33", x(0, 0.03, -1.12 + o * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [o, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) s.add("cyl5", Qt, x(o, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      $c(s, 1.35), yi(s, -0.5, -0.3, 0.6), yi(s, 0.45, 0.2, 2.5), yi(s, -0.2, 0.65, 4.1), s.add("box", "#a0754c", x(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (i < 2)
        s.add("box", "#a8a397", x(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), Lo(s, 0.85, 8, 0.45), s.add("dode", "#8a857c", x(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [o, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) s.add("cyl5", Nt, x(o, 0, n, 0, 0.1, 1.15, 0.1));
        s.add("cone4", ra, x(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), s.add("box", $s, x(0, 0, 0, 0, 0.6, 0.55, 0.45)), s.add("cyl8", wa, x(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), s.add("box", "#a8a397", x(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), s.add("box", "#a8a397", x(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      Ss(s, 0, 0, 1);
      for (let o = 0; o < 4; o++) {
        const n = o / 4 * ye + 0.4;
        ws(s, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][o % 3], a);
      }
      for (let o = 0; o < 9; o++) {
        const n = -0.9 + o * 0.22;
        s.add("cyl5", "#5a4030", x(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + o % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      s.add("box", No, x(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const o of [-1, 1]) s.add("cyl5", Nt, x(o * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      s.add("prism", $a, x(0, 1, -0.3, 0, 2, 0.6, 1.2)), s.add("ico", "#a5603f", x(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), s.add("cyl5", "#8f5236", x(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), s.add("box", "#2b1d16", x(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), s.add("box", Ts, x(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), s.add("box", "#5c5a57", x(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let o = 0; o < 3; o++) s.add("box", wa, x(-0.55 + o * 0.05, o * 0.06, -0.35, 0.1 * o, 0.3, 0.06, 0.1));
      break;
    case "market":
      vi(s, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), vi(s, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), vi(s, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [wa, "#d9a43a", "#bdb6a8"]), s.add("cyl8", "#a0654a", x(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), s.add("cyl8", "#c9a75e", x(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), s.add("ico", "#d6c49a", x(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      s.add("box", Qt, x(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const o of [-1, 1]) s.add("box", Qt, x(o * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let o = 0; o < 4; o++) s.add("cyl5", Nt, x(-1.3 + o * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      s.add("prism", ra, x(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let o = 0; o < 5; o++) s.add("cyl5", Nt, x(-1.35 + o * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const o of [0.28, 0.52]) s.add("box", Qt, x(0, o, 1.35, 0, 2.75, 0.05, 0.05));
      Tc(s, 0.2, 0.55, -1.2, "#7a5236"), s.add("box", "#d6b85a", x(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), s.add("box", "#c9ab50", x(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [o, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) s.add("cyl5", Nt, x(o, 0, n, 0, 0.12, 1.15, 0.12));
      s.add("prism", $a, x(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), s.add("box", Qt, x(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const o of [-1, 1])
        s.add("box", Nt, x(o * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), s.add("box", Nt, x(o * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      s.add("box", Nt, x(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), s.add("cyl8", "#5e4431", x(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const o of [-1, 1]) for (const n of [-0.1, 1.2]) s.add("box", Qt, x(o * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      s.add("cyl5", "#4a3a2c", x(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), Fo(s, -0.95, 0, 0.9, 0.3, 0.4, -0.12), Fo(s, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let o = 0; o < 3; o++) s.add("cyl5", "#5e4431", x(0.9, 0.1 + o % 2 * 0.16, -0.65 + o * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      s.add("box", Ts, x(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [o, n, r] of [[-0.25, -0.25, Li], [0.25, -0.25, $s], [-0.25, 0.25, $s], [0.25, 0.25, Li]]) s.add("box", r, x(o, 0.55, n, (o + n) * 0.4, 0.5, 0.36 + Math.abs(o - n) * 0.2, 0.5), 0.12);
      s.add("dode", Ts, x(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    case "tower":
      s.add("cyl8", "#b3ada2", x(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), s.add("cyl8", $s, x(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), s.add("cyl8", "#9d978b", x(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), s.add("box", "#2b211a", x(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), s.add("box", "#2b211a", x(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), s.add("box", Qt, x(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let o = 0; o < 8; o++) {
        const n = o / 8 * ye;
        s.add("cyl5", Nt, x(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [o, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) s.add("box", Nt, x(o, 2.62, n, r, 1.7, 0.08, 0.06));
      s.add("cone4", ra, x(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return s.build();
}
function Sc(e, t, a) {
  const s = [], i = [], o = new Jt(), n = (f, d) => ft(e, f, d), r = (f, d, u, g, b, k) => {
    const v = [[f, d], [f, g], [u, g], [u, d]].map(([M, y]) => [M, n(M, y) + b, y]);
    o.set(k);
    for (const M of [0, 1, 3, 1, 2, 3])
      s.push(...v[M]), i.push(o.r, o.g, o.b);
  };
  for (let f = 0; f < 6; f++) for (let d = 0; d < 6; d++) {
    const u = t - 1.5 + f * 0.5, g = a - 1.5 + d * 0.5;
    r(u, g, u + 0.5, g + 0.5, 0.05, (f + d) % 2 ? "#7d5f3e" : "#795b3a");
  }
  for (let f = 0; f < 4; f++) {
    const d = a - 1.12 + f * 0.75;
    for (let u = 0; u < 7; u++) {
      const g = t - 1.4 + u * 0.4;
      r(g, d - 0.14, g + 0.4, d + 0.14, 0.09, "#6b4f33");
    }
  }
  const l = new co();
  for (const [f, d] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", Qt, x(t + f, n(t + f, a + d), a + d, 0, 0.08, 0.5, 0.08));
  const c = l.build();
  s.push(...c.attributes.position.array), i.push(...c.attributes.color.array);
  const h = new aa();
  return h.setAttribute("position", new va(s, 3)), h.setAttribute("color", new va(i, 3)), h.computeVertexNormals(), h.computeBoundingSphere(), h;
}
const jo = /* @__PURE__ */ new Map();
function is(e, t) {
  const a = Math.min(t, 2), s = e + a;
  let i = jo.get(s);
  return i || (i = wc(e, a, Kn(e.length * 31 + a)), jo.set(s, i)), i;
}
const Es = new Mn(), Do = new wt(), Ho = new wt(), Uo = new wt(), _o = new wt();
function Cc(e, t, a, s, i, o, n) {
  const r = Et[e.kind[t] - xt], l = e.owner[t], c = Math.min(l >= 0 && l < e.players.length ? e.players[l].era : 0, 2), h = is(r.key, c), f = h.attributes.position.array, d = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), u = e.x[t] / 256, g = e.z[t] / 256, b = r.key === "farm" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2, k = Math.cos(b), v = Math.sin(b), M = a - u, y = s - g, $ = M * k - y * v, q = M * v + y * k, A = i * k - o * v, T = i * v + o * k, w = Math.hypot(A, T) || 1;
  let S = 1 / 0;
  for (const O of [0, 0.1, -0.1]) {
    Es.origin.set($ - T / w * O, n / d, q + A / w * O), Es.direction.set(A / w, 0, T / w);
    for (let z = 0; z + 8 < f.length; z += 9) {
      if (Do.set(f[z], f[z + 1], f[z + 2]), Ho.set(f[z + 3], f[z + 4], f[z + 5]), Uo.set(f[z + 6], f[z + 7], f[z + 8]), !Es.intersectTriangle(Do, Ho, Uo, !1, _o)) continue;
      const B = _o.distanceTo(Es.origin);
      B < S && (S = B);
    }
  }
  return S < 1 / 0 ? S : null;
}
const Ec = St((e) => e.add("cyl5", Nt, x(0, 0, 0, 0, 0.06, 2, 0.06), 0)), Pc = new le(0.42, 0.34, 0.03).translate(0.24, 1.75, 0);
class Ic {
  constructor() {
    m(this, "group", new ja());
    m(this, "meshes", /* @__PURE__ */ new Map());
    m(this, "poles");
    m(this, "flags");
    m(this, "crops");
    m(this, "fair");
    m(this, "mat", Yt({ vertexColors: !0 }));
    m(this, "farms", /* @__PURE__ */ new Map());
    m(this, "fires", []);
    m(this, "smokes", []);
    this.poles = new Ht(Ec, Yt({ vertexColors: !0 }), 256), this.flags = new Ht(Pc, Yt({}, { NO_SNOW: "" }), 256);
    const t = St((s) => {
      for (let i = 0; i < 3; i++) s.add("cone4", "#ffffff", x((i - 1) * 0.1, 0, i % 2 * 0.08, i, 0.1, 0.75, 0.1, (i - 1) * 0.15, 0), 0.1);
    });
    this.crops = new Ht(t, Yt({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = Vn({ CROP: "" });
    const a = St((s) => {
      const i = [[-1.38, -1.38], [1.38, -1.38], [1.38, 1.38], [-1.38, 1.38]], o = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"];
      for (const [n, r] of i) s.add("cyl5", Nt, x(n, 0, r, 0, 0.07, 2.05, 0.07), 0);
      for (let n = 0; n < 4; n++) {
        const [r, l] = i[n], [c, h] = i[(n + 1) % 4], f = Math.hypot(c - r, h - l), d = Math.atan2(c - r, h - l);
        s.add("box", "#e8e2d4", x((r + c) / 2, 1.95, (l + h) / 2, d, 0.015, 0.015, f), 0);
        for (let u = 1; u < 8; u++) {
          const g = u / 8, b = Math.sin(g * Math.PI) * 0.18;
          s.add("cone4", o[(u + n) % o.length], x(r + (c - r) * g, 1.95 - b - 0.2, l + (h - l) * g, d, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new Ht(a, Yt({ vertexColors: !0 }), 16);
    for (const s of [this.poles, this.flags, this.crops, this.fair])
      s.instanceMatrix.setUsage(pe), s.frustumCulled = !1, s.castShadow = !0, s.receiveShadow = !0, s.count = 0, this.group.add(s);
    for (let s = 0; s < 256; s++) this.flags.setColorAt(s, new Jt("#ffffff"));
  }
  mesh(t, a) {
    const s = t + a;
    let i = this.meshes.get(s);
    return i || (i = new Ht(is(t, a), this.mat, t === "center" || t === "camp" ? 8 : 64), i.instanceMatrix.setUsage(pe), i.frustumCulled = !1, i.castShadow = !0, i.receiveShadow = !0, i.count = 0, this.meshes.set(s, i), this.group.add(i)), i;
  }
  /** atualiza tudo a partir do mundo (≈100 construções: barato) */
  update(t, a, s, i = 0) {
    const o = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0;
    const c = t.size, h = t.explored[a];
    this.fires.length = 0, this.smokes.length = 0;
    const f = new Jt(), d = /* @__PURE__ */ new Set();
    for (let u = 0; u < t.top; u++) {
      if (!t.alive[u] || t.kind[u] < xt) continue;
      const g = Et[t.kind[u] - xt], b = t.owner[u], k = t.x[u] / 256, v = t.z[u] / 256;
      if (s && b !== a && !h[Math.floor(v) * c + Math.floor(k)]) continue;
      const M = b >= 0 && b < t.players.length ? t.players[b].era : 0;
      if (g.key === "farm") {
        let S = this.farms.get(u);
        if (S && (S.x !== k || S.z !== v) && (this.group.remove(S.mesh), S.mesh.geometry.dispose(), S = void 0), !S) {
          const O = new He(Sc(t.map, k, v), this.mat);
          O.receiveShadow = O.castShadow = !0, this.group.add(O), S = { mesh: O, x: k, z: v }, this.farms.set(u, S);
        }
        if (S.mesh.visible = !0, d.add(u), t.done[u]) for (let O = 0; O < 4; O++) for (let z = 0; z < 9 && r < this.crops.instanceMatrix.count; z++) {
          const B = k - 1.25 + z * 0.31, L = v - 1.12 + O * 0.75;
          this.crops.setMatrixAt(r++, x(B, ft(t.map, B, L) + 0.08, L, (z * 7 + O) % 6, 1, 0.85 + (z + O) % 3 * 0.12, 1));
        }
        continue;
      }
      const y = this.mesh(g.key, Math.min(M, 2)), $ = o.get(y) ?? 0;
      if ($ >= y.instanceMatrix.count) continue;
      const q = ft(t.map, k, v), A = t.done[u] === 1, T = A ? 1 : Math.max(0.12, Math.min(1, t.work[u] / (g.time * 100))), w = (u * 2654435761 >>> 0) % 4 * Math.PI / 2;
      if (y.setMatrixAt($, x(k, q - 0.02, v, g.key === "farm" ? 0 : w, 1, T, 1)), o.set(y, $ + 1), g.key !== "farm" && !g.wall && A && n < 256) {
        const S = g.size / 2 - 0.25, O = k + S, z = v - S;
        this.poles.setMatrixAt(n, x(O, ft(t.map, O, z), z)), this.flags.setMatrixAt(n, x(O, ft(t.map, O, z), z, Math.sin(i * 1.1 + u) * 0.15)), this.flags.setColorAt(n, f.set(b === Be ? "#efe6cf" : t.players[b]?.color ?? "#888")), n++;
      }
      if (A && g.key === "forge") {
        const z = k + 0.45 * Math.cos(w) + 0.12 * Math.sin(w), B = v - 0.45 * Math.sin(w) + 0.12 * Math.cos(w), L = k + 0.55 * Math.cos(w) - 0.45 * Math.sin(w), E = v - 0.55 * Math.sin(w) - 0.45 * Math.cos(w);
        this.fires.push({ x: z, y: ft(t.map, z, B) + 0.1, z: B, s: 0.16 }), this.smokes.push({ x: L, y: ft(t.map, L, E) + 1.5, z: E, s: 0.6 });
      }
      if (A && g.market && t.fair && l < 16 && this.fair.setMatrixAt(l++, x(k, q - 0.02, v, w)), A && (g.key === "center" || g.key === "camp")) {
        const S = M >= 1 && g.key === "center", O = S ? k + 1.2 * Math.cos(w) + 1.3 * Math.sin(w) : k, z = S ? v - 1.2 * Math.sin(w) + 1.3 * Math.cos(w) : v;
        this.fires.push({ x: O, y: ft(t.map, O, z) + 0.15, z, s: M >= 1 && g.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: O, y: ft(t.map, O, z) + 0.3, z, s: 1 });
      }
    }
    for (const u of this.meshes.values())
      u.count = o.get(u) ?? 0, u.instanceMatrix.needsUpdate = !0;
    for (const [u, g] of this.farms) d.has(u) || (!t.alive[u] || t.kind[u] !== xt + Vt.farm ? (this.group.remove(g.mesh), g.mesh.geometry.dispose(), this.farms.delete(u)) : g.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0;
  }
}
class Oc {
  constructor(t = 48) {
    m(this, "mesh");
    this.mesh = new Ht(new Si(0.32, 1, 6).translate(0, 0.5, 0), lo(new ga({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(pe), this.mesh.frustumCulled = !1;
    for (let a = 0; a < t; a++) this.mesh.setColorAt(a, new Jt(a % 2 ? "#ffd166" : "#ff7b2e"));
  }
  update(t, a) {
    let s = 0;
    const i = this.mesh.instanceMatrix.count;
    for (const o of t) {
      const n = 0.85 + Math.sin(a * 13 + o.x) * 0.12 + Math.sin(a * 29 + o.z) * 0.08;
      s < i && this.mesh.setMatrixAt(s++, x(o.x, o.y, o.z, a * 2 + o.x, o.s, o.s * 1.25 * n, o.s)), s < i && this.mesh.setMatrixAt(s++, x(o.x, o.y, o.z, -a * 3, o.s * 0.55, o.s * 0.85 * (2 - n), o.s * 0.55));
    }
    this.mesh.count = s, this.mesh.instanceMatrix.needsUpdate = !0;
  }
}
const Bc = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, qc = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Nc {
  constructor(t, a = 500) {
    m(this, "n");
    m(this, "pos");
    m(this, "a");
    m(this, "sz");
    m(this, "colr");
    m(this, "age");
    m(this, "life");
    m(this, "vel");
    m(this, "grow");
    m(this, "next", 0);
    m(this, "acc", 0);
    m(this, "geo", new aa());
    m(this, "mat");
    m(this, "points");
    this.n = a, this.pos = new Float32Array(a * 3), this.a = new Float32Array(a), this.sz = new Float32Array(a).fill(1), this.colr = new Float32Array(a * 3), this.age = new Float32Array(a).fill(99), this.life = new Float32Array(a), this.vel = new Float32Array(a * 3), this.grow = new Float32Array(a), this.geo.setAttribute("position", new Te(this.pos, 3).setUsage(pe)), this.geo.setAttribute("aA", new Te(this.a, 1).setUsage(pe)), this.geo.setAttribute("aS", new Te(this.sz, 1).setUsage(pe)), this.geo.setAttribute("aC", new Te(this.colr, 3).setUsage(pe)), this.mat = new eo({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: Bc, fragmentShader: qc }), this.points = new zn(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, a, s, i, o, n, r, l, c, h) {
    const f = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, a, s], f * 3), this.vel.set([i, o, n], f * 3), this.colr.set([h.r, h.g, h.b], f * 3), this.age[f] = 0, this.life[f] = r, this.sz[f] = l, this.grow[f] = c;
  }
  smoke(t, a) {
    this.acc += t;
    const s = new Jt(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const i of a) Math.random() < 0.5 && this.emit(i.x + (Math.random() - 0.5) * 0.2, i.y + 0.4, i.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, s);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, a, s, i) {
    const o = new Jt(0.62, 0.55, 0.45), n = i ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * ye, c = (i ? 1.4 : 0.7) * (0.4 + Math.random());
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
class Rc {
  constructor() {
    m(this, "group", new ja());
    m(this, "spears");
    m(this, "arrows");
    m(this, "stones");
    m(this, "list", []);
    m(this, "ray", new Mn());
    m(this, "ta", new wt());
    m(this, "tb", new wt());
    m(this, "tc", new wt());
    m(this, "th", new wt());
    const t = St((o) => {
      o.add("cyl5", "#7a5a3c", x(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), o.add("cone4", "#b9b4aa", x(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
    }).rotateX(Math.PI / 2), a = St((o) => {
      o.add("cyl5", "#8a6a48", x(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), o.add("cone4", "#b9b4aa", x(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), o.add("box", "#e8e2d4", x(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), o.add("box", "#e8e2d4", x(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
    }).rotateX(Math.PI / 2), s = St((o) => o.add("dode", "#8f8a80", x(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)), i = Yt({ vertexColors: !0 }, { NO_SNOW: "" });
    this.spears = new Ht(t, i, 96), this.arrows = new Ht(a, i, 96), this.stones = new Ht(s, i, 96);
    for (const o of [this.spears, this.arrows, this.stones])
      o.instanceMatrix.setUsage(pe), o.frustumCulled = !1, o.castShadow = !0, o.count = 0, this.group.add(o);
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, a, s, i, o, n, r, l, c, h, f) {
    const d = r === "arrow", u = r === "stone";
    if (r === "spear" && l < Fi) return;
    let g, b, k;
    if (c >= xt) {
      const w = t.alive[h] ? this.hitBuilding(t, h, a, s) : null;
      w ? (g = w.x, b = w.z, k = w.y) : (g = i, b = o, k = ft(t.map, i, o) + 0.08);
    } else {
      const w = Math.hypot(i - a, o - s) || 1, S = w - (_[c]?.radius ?? 0.3) * 0.8;
      g = a + (i - a) / w * S, b = s + (o - s) / w * S, k = ft(t.map, g, b) + Xn(c);
    }
    const v = Math.hypot(g - a, b - s) || 1, M = (g - a) / v, y = (b - s) / v, $ = f !== void 0 ? 0.9 : d ? 0.75 : u ? 0.3 : 1.7;
    if (v - $ < 0.15) return;
    const q = a + M * $, A = s + y * $, T = f !== void 0 ? ft(t.map, a, s) + f : ft(t.map, q, A) + (d ? 0.88 : u ? 1.55 : 1.1);
    this.list.push({
      x0: q,
      z0: A,
      y0: T,
      x1: g,
      z1: b,
      y1: k,
      arc: (v - $) * (d ? 0.1 : u ? 0.07 : 0.18),
      t: 0,
      dur: Math.max(0.15, n / 10),
      kind: r
    });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, a, s, i) {
    const o = Et[t.kind[a] - xt], n = t.owner[a], r = Math.min(n >= 0 && n < t.players.length ? t.players[n].era : 0, 2), l = is(o.key, r), c = l.attributes.position.array, h = t.done[a] ? 1 : Math.max(0.12, Math.min(1, t.work[a] / (o.time * 100))), f = t.x[a] / 256, d = t.z[a] / 256, u = ft(t.map, f, d) - 0.02, g = o.key === "farm" ? 0 : (a * 2654435761 >>> 0) % 4 * Math.PI / 2, b = s - f, k = i - d, v = Math.cos(g), M = Math.sin(g), y = b * v - k * M, $ = b * M + k * v, q = Math.hypot(y, $) || 1, A = -y / q, T = -$ / q, w = -T, S = A;
    let O = 0, z = 0, B = 0, L = !1;
    for (const E of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let H = 1 / 0;
      for (const N of [0.9, 0.6, 0.35]) {
        const J = y + w * E, W = $ + S * E, Z = -(J * A + W * T);
        this.ray.origin.set(J, N / h, W), this.ray.direction.set(A, 0, T);
        for (let Q = 0; Q + 8 < c.length; Q += 9) {
          if (this.ta.set(c[Q], c[Q + 1], c[Q + 2]), this.tb.set(c[Q + 3], c[Q + 4], c[Q + 5]), this.tc.set(c[Q + 6], c[Q + 7], c[Q + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const mt = this.th.distanceTo(this.ray.origin);
          mt > Z + 0.1 || mt >= H || (H = mt, O = this.th.x + A * 0.05, z = this.th.y, B = this.th.z + T * 0.05);
        }
      }
      if (H < 1 / 0) {
        L = !0;
        break;
      }
    }
    return L ? { x: f + O * v + B * M, y: u + z * h, z: d - O * M + B * v } : null;
  }
  update(t) {
    let a = 0, s = 0, i = 0;
    const o = [], n = new to(), r = new wt(), l = new wt(1, 1, 1), c = new wt(), h = new wt(0, 0, 1), f = new ue();
    for (const d of this.list) {
      if (d.t += t, d.t > d.dur + (d.kind === "stone" ? 0.03 : 0.35)) continue;
      !d.hit && d.t >= d.dur && (d.hit = !0, ze.emit(d.kind === "arrow" ? "arrow.hit" : d.kind === "stone" ? "stone.hit" : "spear.hit", d.x1, d.z1));
      const u = d.kind === "arrow" ? this.arrows : d.kind === "stone" ? this.stones : this.spears, g = d.kind === "arrow" ? s : d.kind === "stone" ? i : a;
      if (g >= 96) continue;
      o.push(d);
      const b = Math.min(1, d.t / d.dur);
      r.set(d.x0 + (d.x1 - d.x0) * b, d.y0 + (d.y1 - d.y0) * b + Math.sin(b * Math.PI) * d.arc, d.z0 + (d.z1 - d.z0) * b), c.set(d.x1 - d.x0, d.y1 - d.y0 + Math.cos(b * Math.PI) * d.arc * Math.PI, d.z1 - d.z0).normalize(), n.setFromUnitVectors(h, c), u.setMatrixAt(g, f.compose(r, n, l)), d.kind === "arrow" ? s++ : d.kind === "stone" ? i++ : a++;
    }
    this.list = o, this.spears.count = a, this.arrows.count = s, this.stones.count = i, this.spears.instanceMatrix.needsUpdate = this.arrows.instanceMatrix.needsUpdate = this.stones.instanceMatrix.needsUpdate = !0;
  }
}
const Fc = (e, t, a) => e + (t - e) * a, Lc = (e, t, a) => {
  const s = Math.min(1, Math.max(0, (a - e) / (t - e)));
  return s * s * (3 - 2 * s);
};
class jc {
  constructor(t, a, s, i) {
    m(this, "cam");
    m(this, "x");
    m(this, "z");
    m(this, "yaw");
    m(this, "dist");
    m(this, "tx");
    m(this, "tz");
    m(this, "tyaw");
    m(this, "tdist");
    m(this, "minD", 14);
    m(this, "maxD", 110);
    this.map = t, this.cam = new Kr(42, 1, 0.5, 900), this.x = this.tx = a, this.z = this.tz = s, this.yaw = this.tyaw = i, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return Fc(0.66, 1.12, Lc(this.minD, this.maxD, t));
  }
  update(t) {
    const a = 1 - Math.exp(-t * 9), s = this.map.size;
    this.tx = Math.min(s - 8, Math.max(8, this.tx)), this.tz = Math.min(s - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * a, this.z += (this.tz - this.z) * a, this.yaw += (this.tyaw - this.yaw) * a, this.dist += (this.tdist - this.dist) * a;
    const i = this.pitch(), o = Math.max(ft(this.map, this.x, this.z), 0), n = Math.cos(i) * this.dist;
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
    const o = new wt(t / s * 2 - 1, -(a / i) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = o.sub(n).normalize();
    let l = 0, c = 0;
    const h = this.map.size;
    for (let f = 0; f < 400; f++) {
      l += 0.6 + l * 0.01;
      const d = n.x + r.x * l, u = n.y + r.y * l, g = n.z + r.z * l;
      if (d < -20 || g < -20 || d > h + 20 || g > h + 20 || l > 900) return null;
      if (u <= Math.max(ft(this.map, d, g), -0.1)) {
        let b = c, k = l;
        for (let v = 0; v < 12; v++) {
          const M = (b + k) / 2;
          n.y + r.y * M <= Math.max(ft(this.map, n.x + r.x * M, n.z + r.z * M), -0.1) ? k = M : b = M;
        }
        return new wt(n.x + r.x * k, n.y + r.y * k, n.z + r.z * k);
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
const Wo = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], Go = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], Vo = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class Dc {
  constructor(t) {
    m(this, "c", {});
    m(this, "n", {});
    m(this, "w", [0, 0, 0]);
    m(this, "tmp", new Jt());
    const a = Wo[t];
    for (const s of Go) this.c[s] = be(a[s]);
    for (const s of Vo) this.n[s] = a[s];
    this.w = [...a.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, a, s) {
    const i = Wo[a], o = 1 - Math.exp(-t * 0.3);
    for (const l of Go) this.c[l].lerp(this.tmp.set(i[l]), o);
    for (const l of Vo) this.n[l] += (i[l] - this.n[l]) * o;
    for (let l = 0; l < 3; l++) this.w[l] += (i.w[l] - this.w[l]) * o;
    const n = this.c, r = this.n;
    It.uGrassA.value.copy(n.grassA), It.uGrassB.value.copy(n.grassB), It.uLeafColor.value.copy(n.leaf), It.uCropColor.value.copy(n.cropC), It.uLeaf.value = r.leafAmt, It.uCrop.value = r.crop, It.uFlower.value = r.flower, It.uSnow.value = r.snow, It.uFruit.value = Math.max(0, 1 - r.snow * 1.6), It.uShallow.value.copy(n.sh), It.uDeep.value.copy(n.dp), s.sun.color.copy(n.sun), s.sun.intensity = r.sunI, s.hemi.color.copy(n.hS), s.hemi.groundColor.copy(n.hG), s.hemi.intensity = r.hI, s.sky.uniforms.uTop.value.copy(n.top), s.sky.uniforms.uHor.value.copy(n.hor), s.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const Hc = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, Uc = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class _c {
  constructor(t, a = 1) {
    m(this, "group", new ja());
    m(this, "list");
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
    const l = new Float32Array(t * 3), c = new Float32Array(t), h = new Float32Array(t), f = new Float32Array(t);
    for (let b = 0; b < t; b++)
      l[b * 3] = (Math.random() - 0.5) * 90, l[b * 3 + 1] = -999, l[b * 3 + 2] = (Math.random() - 0.5) * 90, c[b] = Math.random(), h[b] = Math.random() * 100, f[b] = 0.7 + Math.random() * 0.6;
    const d = new aa();
    d.setAttribute("position", new Te(l, 3).setUsage(pe)), d.setAttribute("aK", new Te(c, 1)), d.setAttribute("aS", new Te(f, 1));
    const u = new eo({ transparent: !0, depthWrite: !1, uniforms: { uFow: It.uFow, uFowOn: It.uFowOn, uWorld: It.uWorld, uPR: { value: 1 }, uSize: { value: a }, uColA: { value: be(s) }, uColB: { value: be(i) }, uAmt: { value: 0 } }, vertexShader: Hc, fragmentShader: Uc }), g = new zn(d, u);
    return g.frustumCulled = !1, g.renderOrder = 4, g.visible = !1, this.group.add(g), { p: g, pos: l, seed: h, n: t, use: t, fall: o, sway: n, m: u, hMax: r };
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
        let h = n.pos[l * 3], f = n.pos[l * 3 + 1], d = n.pos[l * 3 + 2];
        f -= n.fall * t * (0.7 + c % 1 * 0.6), h += (Math.sin(a + c) * n.sway + 0.4) * t, d += Math.cos(a * 0.8 + c) * n.sway * 0.5 * t;
        const u = h - i, g = d - o;
        u > 45 && (h -= 90), u < -45 && (h += 90), g > 45 && (d -= 90), g < -45 && (d += 90);
        const b = ft(this.map, h, d);
        (f < b || f > b + n.hMax + 4) && (f = b + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = h, n.pos[l * 3 + 1] = f, n.pos[l * 3 + 2] = d;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const Ca = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], Wc = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class Jn {
  constructor(t, a, s) {
    m(this, "renderer");
    m(this, "scene", new sl());
    m(this, "camera");
    m(this, "sun");
    m(this, "hemi");
    m(this, "sky");
    m(this, "skyMat");
    m(this, "nature");
    m(this, "units", new Ac());
    m(this, "buildings", new Ic());
    m(this, "flames", new Oc());
    m(this, "particles");
    m(this, "projectiles", new Rc());
    m(this, "weather");
    m(this, "seasons");
    m(this, "fowTex");
    m(this, "fowData");
    m(this, "fogOn", !0);
    m(this, "ghost");
    m(this, "foot");
    m(this, "ghostKey", "");
    m(this, "pings", []);
    m(this, "pingI", 0);
    m(this, "rally");
    m(this, "rallyFlag");
    m(this, "shadowExt", 0);
    m(this, "lastFogTick", -1);
    m(this, "q", 0);
    m(this, "metalOn", !1);
    m(this, "wallGhost", null);
    m(this, "wallGhostEra", -1);
    this.world = a, this.me = s;
    const i = a.map, o = i.size;
    this.renderer = t, this.scene.fog = new Yr(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(o * o)), this.fowTex = new Xr(this.fowData, o, o, Jr, Zr), this.fowTex.magFilter = this.fowTex.minFilter = Qr, this.fowTex.needsUpdate = !0, It.uFow.value = this.fowTex, It.uWorld.value = o, this.skyMat = new eo({
      side: tl,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: be("#78ade0") }, uHor: { value: be("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new He(new Ci(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new el(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new al(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(dc(i), uc(i)), this.nature = pc(i), this.scene.add(this.nature.group);
    for (const c of this.nature.metal) c.visible = a.players[s].era >= 2;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new Nc({ uFow: It.uFow, uFowOn: It.uFowOn, uWorld: It.uWorld }, 600), this.scene.add(this.particles.points), this.weather = new _c(i), this.scene.add(this.weather.group), this.seasons = new Dc(a.season), this.ghost = new He(new aa(), new qs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new He(new ei(1, 1).rotateX(-Math.PI / 2), new ga({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new xn(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let c = 0; c < 4; c++) {
      const h = new He(n, new ga({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      h.renderOrder = 6, h.visible = !1, this.scene.add(h), this.pings.push({ m: h, t: 0 });
    }
    this.rally = new ja(), this.rally.add(new He(new Na(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new qs({ color: 7229239 }))), this.rallyFlag = new He(new le(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new ga({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = a.players[s].start, l = o / 2;
    this.camera = new jc(i, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const a = new il({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return a.outputColorSpace = vn, a.toneMapping = ol, a.toneMappingExposure = 1.08, a.shadowMap.enabled = !0, a.shadowMap.type = nl, a;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const a of t.map.res) {
      const s = a.z * t.size + a.x;
      t.resKind[s] === 0 ? this.nature.removeRes(s) : t.resKind[s] === ee && t.resAmt[s] <= 0 && this.nature.setBerries(s, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const a = Ca[t], s = Math.min(window.devicePixelRatio || 1, a.pr);
    this.renderer.setPixelRatio(s), this.sun.castShadow = a.shadow > 0, a.shadow > 0 && this.sun.shadow.mapSize.x !== a.shadow && (this.sun.shadow.mapSize.set(a.shadow, a.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(a.trees, a.tufts), this.particles.mat.uniforms.uPR.value = s, this.weather.setPixelRatio(s), this.weather.setScale(a.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, a) {
    this.renderer.setSize(t, a, !1), this.camera.setAspect(t, a);
  }
  setFog(t) {
    this.fogOn = t, It.uFowOn.value = t ? 1 : 0;
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
        a.resKind[o] === 0 ? this.nature.removeRes(o) : a.resKind[o] === ee && this.nature.setBerries(o, a.resAmt[o] > 0);
        break;
      }
      case "death":
        if (i.kind < xt) {
          const o = i.x / 256, n = i.z / 256;
          this.seen(o, n) && this.particles.puff(o, ft(s, o, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const o = a.x[i.e] / 256, n = a.z[i.e] / 256;
        this.seen(o, n) && this.particles.puff(o, ft(s, o, n), n, !0);
        break;
      }
      case "proj": {
        const o = i.x0 / 256, n = i.z0 / 256, r = i.x1 / 256, l = i.z1 / 256;
        (this.seen(o, n) || this.seen(r, l)) && this.projectiles.add(a, o, n, r, l, i.ticks, i.kind, i.gap / 256, i.tk, i.te, i.h);
        break;
      }
      case "age":
        if (i.player === this.me && i.era >= 2) for (const o of this.nature.metal) o.visible = !0;
        break;
    }
  }
  /** prévia da muralha: um bloco por tile (claro onde dá para construir, vermelho onde não dá) */
  setWallGhost(t, a = []) {
    const s = this.world.players[this.me].era;
    (!this.wallGhost || this.wallGhostEra !== Math.min(s, 2)) && (this.wallGhost && (this.scene.remove(this.wallGhost), this.wallGhost.dispose()), this.wallGhost = new Ht(is("wall", s), new qs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 }), 40), this.wallGhost.renderOrder = 7, this.wallGhost.frustumCulled = !1, this.wallGhostEra = Math.min(s, 2), this.scene.add(this.wallGhost));
    const i = this.wallGhost, o = this.world.size, n = new Jt();
    let r = 0;
    for (let l = 0; t && l < t.length && r < 40; l++) {
      const c = t[l] % o + 0.5, h = Math.floor(t[l] / o) + 0.5;
      i.setMatrixAt(r, new ue().makeTranslation(c, ft(this.world.map, c, h), h)), i.setColorAt(r, n.set(a[l] ? "#d8ffe2" : "#ff8f80")), r++;
    }
    i.count = r, i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, a = 0, s = 0, i = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const o = Et[Vt[t]], n = this.world.players[this.me].era, r = t + Math.min(n, 2);
    r !== this.ghostKey && (this.ghost.geometry = is(t, n), this.ghostKey = r);
    const l = a + o.size / 2, c = s + o.size / 2, h = ft(this.world.map, l, c);
    this.ghost.position.set(l, h, c), this.ghost.visible = !0, this.ghost.material.color.set(i ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, h + 0.12, c), this.foot.scale.set(o.size, 1, o.size), this.foot.visible = !0, this.foot.material.color.set(i ? "#6fe08a" : "#e0533c");
  }
  ping(t, a, s) {
    const i = this.pings[this.pingI++ % this.pings.length];
    i.t = 0.7, i.m.position.set(t, ft(this.world.map, t, a) + 0.08, a), i.m.material.color.set(Wc[s]), i.m.visible = !0;
  }
  render(t, a, s, i) {
    const o = this.world, n = this.camera;
    It.uTime.value = i, n.update(t), this.seasons.update(t, o.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
    const r = 2.25, l = this.seasons.elev;
    this.sun.position.set(n.x + Math.cos(r) * Math.cos(l) * 120, Math.sin(l) * 120, n.z + Math.sin(r) * Math.cos(l) * 120), this.sun.target.position.set(n.x, 0, n.z), this.sun.target.updateMatrixWorld();
    const c = Math.round(Math.min(90, Math.max(28, n.dist * 0.95)) / 4) * 4;
    if (c !== this.shadowExt) {
      this.shadowExt = c;
      const d = this.sun.shadow.camera;
      d.left = -c, d.right = c, d.top = c, d.bottom = -c, d.near = 1, d.far = 300, d.updateProjectionMatrix();
    }
    this.sky.position.copy(n.cam.position), this.updateFog();
    const h = o.players[this.me].era >= 2;
    if (h !== this.metalOn) {
      this.metalOn = h;
      for (const d of this.nature.metal) d.visible = h;
    }
    this.buildings.update(o, this.me, this.fogOn, i), this.units.update(o, a, t, s, this.me, this.fogOn, i, n.cam.quaternion), this.flames.update(this.buildings.fires, i), this.particles.smoke(t, this.buildings.smokes), this.particles.update(t), this.projectiles.update(t), this.weather.update(t, i, this.seasons.w, n.x, n.z);
    for (const d of this.pings) if (d.t > 0) {
      d.t -= t;
      const u = 1 - Math.max(0, d.t) / 0.7;
      d.m.scale.setScalar(1.4 - u * 0.8), d.m.material.opacity = Math.max(0, 1 - u), d.t <= 0 && (d.m.visible = !1);
    }
    let f = -1;
    if (s.size === 1) {
      const d = s.values().next().value;
      o.isBuilding(d) && o.owner[d] === this.me && o.rallyX[d] >= 0 && (f = d);
    }
    if (f >= 0) {
      const d = o.rallyX[f] / 256, u = o.rallyZ[f] / 256;
      this.rally.position.set(d, ft(o.map, d, u), u), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(i * 1.4) * 0.2, this.rallyFlag.material.color.set(o.players[this.me].color);
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
const Zn = {
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
  "bld.wall.d": "Blocks the way. Choose where it starts and where it ends.",
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
  "place.wall1.mouse": "Click where the wall starts · right-click to cancel",
  "place.wall1.touch": "Tap where the wall starts, then confirm",
  "place.wall2.mouse": "Now click where the wall ends",
  "place.wall2.touch": "Now tap where the wall ends, then confirm",
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
}, Gc = {
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
  "bld.wall.d": "Bloqueia a passagem. Escolha onde ela começa e onde termina.",
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
  "place.wall1.mouse": "Clique onde a muralha começa · botão direito cancela",
  "place.wall1.touch": "Toque onde a muralha começa e confirme",
  "place.wall2.mouse": "Agora clique onde a muralha termina",
  "place.wall2.touch": "Agora toque onde ela termina e confirme",
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
}, Vc = { en: Zn, pt: Gc }, Qn = "origines_lang";
let Da = "en";
try {
  const e = localStorage.getItem(Qn);
  (e === "pt" || e === "en") && (Da = e);
} catch {
}
const Rs = [], Ce = () => Da;
function Ko(e) {
  Da = e;
  try {
    localStorage.setItem(Qn, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", Rs.forEach((t) => t());
}
const tr = (e) => (Rs.push(e), () => {
  const t = Rs.indexOf(e);
  t >= 0 && Rs.splice(t, 1);
});
function p(e, t = {}) {
  let a = Vc[Da][e] ?? Zn[e] ?? e;
  for (const s in t) a = a.split(`{${s}}`).join(String(t[s]));
  return a;
}
const Kc = (e) => Math.floor(e).toLocaleString(Da === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = Da === "pt" ? "pt-BR" : "en");
const Yc = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, ji = {
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
  tower: '<path d="M7 21V9h10v12"/><path d="M5 9V4h3v2h3V4h2v2h3V4h3v5z"/><path d="M10.5 21v-4h3v4"/>',
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
}, Xc = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, Jc = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function yt(e, t) {
  const a = ji[e] ?? ji.animal;
  return !t && e.startsWith("season.") && (t = Jc[Number(e.slice(7))]), Yc(a, t ?? Xc[e] ?? "currentColor");
}
function Ue(e) {
  return e in ji ? yt(e, "currentColor") : yt(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const Ea = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), si = (e) => _.find((t) => t.key === e), Zc = _.filter((e) => e.pop > 0 && e.cls !== "villager").map((e) => e.key), Qc = (e) => _.filter((t) => t.cls === e && (t.pop > 0 || t.key === "barbarian")).map((t) => t.key);
function er(e) {
  const t = si(e);
  if (!t) return [];
  const a = [];
  for (const s of t.bonus ?? [])
    if (s.vs === "animal") a.push({ k: "animais", dmg: s.dmg });
    else for (const i of Qc(s.vs)) a.push({ k: i, dmg: s.dmg });
  return t.siege && a.push({ k: "construcoes" }), a;
}
function ar(e) {
  const t = si(e);
  if (!t) return [];
  const a = [];
  for (const s of _) if (s.pop > 0)
    for (const i of s.bonus ?? []) i.vs === t.cls && a.push({ k: s.key, dmg: i.dmg });
  return t.siege && a.push({ k: "todos" }), a;
}
function th(e) {
  const t = si(e)?.cls;
  return t === "ranged" ? "vs.far" : t === "scout" ? "vs.scout" : t === "cavalry" ? "vs.fast" : t === "infantry" ? "vs.foot" : null;
}
const Yo = ["spearman", "horseman", "slinger", "swordsman"], Xo = (e) => p(e === "animais" ? "vs.animals" : e === "construcoes" ? "vs.buildings" : e === "todos" ? "vs.anyone" : `unit.${e}`), eh = (e) => e === "animais" ? yt("animal", "currentColor") : e === "construcoes" ? yt("house", "currentColor") : e === "todos" ? yt("army", "currentColor") : Ue(e), Ws = (e) => e.length ? e.map((t) => `<span class="vs-i" title="${Ea(Xo(t.k))}">${eh(t.k)}<span>${Ea(Xo(t.k))}</span></span>`).join("") : '<span class="vs-i vs-nada">—</span>';
function Jo(e) {
  const t = er(e), a = ar(e);
  return !t.length && !a.length ? "" : `<div class="vs">${t.length ? `<div class="vs-l vs-win"><b>${p("vs.win")}</b>${Ws(t)}</div>` : ""}${a.length ? `<div class="vs-l vs-lose"><b>${p("vs.lose")}</b>${Ws(a)}</div>` : ""}</div>`;
}
function ah(e) {
  const t = [...Yo, Yo[0]].map((s, i) => (i ? `<span class="vs-seta">${p("vs.beats")} ›</span>` : "") + `<span class="vs-c">${Ue(s)}<b>${Ea(p(`unit.${s}`))}</b></span>`).join(""), a = [...Zc, "barbarian"].map((s) => {
    const i = si(s), o = i.pop > 0 && i.era > e, n = th(s), r = s === "barbarian" ? p("vs.enemy") : o ? p("vs.from", { era: p(`era.${i.era}.in`) }) : "";
    return `<li class="vs-row${o ? " futura" : ""}"><div class="vs-who">${Ue(s)}<b>${Ea(p(`unit.${s}`))}</b>${r ? `<small>${Ea(r)}</small>` : ""}${n ? `<em>${Ea(p(n))}</em>` : ""}</div><div class="vs-l vs-win"><b>${p("vs.win")}</b>${Ws(er(s))}</div><div class="vs-l vs-lose"><b>${p("vs.lose")}</b>${Ws(ar(s))}</div></li>`;
  }).join("");
  return `<p class="vs-intro">${p("vs.intro")}</p><div class="vs-ciclo" aria-label="${p("vs.cycle")}">${t}</div><ul class="vs-tab">${a}</ul>`;
}
const ii = (e) => e === "logistica" ? "combate" : "logistica", sh = (e) => e === "logistica" ? 1 : e === "combate" ? 2 : 0, ih = (e) => e === 1 ? "logistica" : e === 2 ? "combate" : null, ho = (e) => {
  const t = _.find((a) => a.key === e);
  return !!t && t.pop > 0 && t.cls !== "villager";
}, oh = (e) => {
  const t = _[e];
  return !!t && t.pop > 0 && t.cls !== "villager";
}, Di = (e) => {
  const t = Et[Vt[e]];
  if (!t) return !1;
  const a = (t.trains ?? []).flat();
  return a.length > 0 && a.every(ho) && !(t.research ?? []).length;
};
function os(e, t, a) {
  return t ? e.isBuilding(a) ? t === "logistica" : e.isUnit(a) ? oh(e.kind[a]) ? t === "combate" : t === "logistica" : !1 : !0;
}
const nh = /* @__PURE__ */ new Set(["gather", "work", "food", "build", "wall", "ageup", "rally", "research", "trade"]);
function sr(e, t, a) {
  if (!t) return a;
  switch (a.type) {
    case "ia":
      return null;
    // não é ordem de quem joga
    case "train":
      return t === "logistica" || ho(a.key) ? a : null;
    // treinar tropas: os dois
    case "cancel":
      return t === "logistica" || e.isBuilding(a.building) && Di(e.bdef(a.building).key) ? a : null;
    default: {
      if (nh.has(a.type) && t !== "logistica") return null;
      if (!("ids" in a)) return t === "logistica" ? a : null;
      const s = a.ids.filter((i) => os(e, t, i));
      return s.length ? { ...a, ids: s } : null;
    }
  }
}
const la = [0, 0.2, 0.5, 0.85], Zo = "origines_som", Qo = { music: 1, sfx: 3, amb: 2, muted: !1 };
class rh {
  constructor() {
    m(this, "ctx", null);
    m(this, "opts", { ...Qo });
    m(this, "master");
    m(this, "duckG");
    m(this, "buses", {});
    m(this, "scene", "menu");
    m(this, "paused", !1);
    m(this, "hidden", !1);
    m(this, "onReady", []);
    m(this, "onChange", []);
    m(this, "voices", []);
    m(this, "maxVoices", 16);
    /** uma vez, na carga da página */
    m(this, "installed", !1);
    try {
      const t = JSON.parse(localStorage.getItem(Zo) ?? "null");
      t && typeof t == "object" && (this.opts = { ...Qo, ...t });
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
      localStorage.setItem(Zo, JSON.stringify(this.opts));
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
        return this.scene === "menu" ? a.music ? Math.max(la[2], la[a.music]) : 0 : la[a.music];
      case "amb":
        return this.scene === "game" ? la[a.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return la[a.sfx];
      case "ui":
        return la[a.sfx] * 0.8;
      case "alert":
        return a.sfx ? Math.max(0.5, la[a.sfx]) : 0;
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
const G = new rh(), Gs = { 1: { vagas: 2, times: [0, 1] }, 2: { vagas: 4, times: [0, 0, 1, 1] }, 3: { vagas: 3, times: [0, 1, 2] }, 4: { vagas: 4, times: [0, 1, 2, 3] } }, Hi = ["ajuda", "atacar", "cuidado"], lh = (e) => e.map((t, a) => t ? a : -1).filter((t) => t >= 0), tn = { ajuda: "ajuda", atacar: "vs", cuidado: "cuidado" }, ch = ["food", "wood", "stone", "metal"], hh = ["I", "II", "III", "IV", "V", "VI"], Kt = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), ti = class ti {
  constructor(t, a, s, i, o) {
    m(this, "root");
    m(this, "box");
    m(this, "minimap");
    m(this, "$", {});
    m(this, "cardMode", "main");
    m(this, "cardFor", "");
    m(this, "sigTop", "");
    m(this, "sigSel", "");
    m(this, "sigCard", "");
    m(this, "sigMode", "");
    m(this, "idleN", -1);
    m(this, "toasts", []);
    m(this, "btns", []);
    m(this, "progs", []);
    m(this, "mode", "normal");
    m(this, "placeOk", !0);
    m(this, "slow", 0);
    m(this, "hintHidden", !1);
    m(this, "wallStep", 0);
    m(this, "give", "food");
    // mercado: o que vai ser dado na troca
    // dica dos ícones: no celular os botões só têm ícone; tocar mostra nome, custo e para que serve, segurar só consulta
    m(this, "tipEl");
    m(this, "tipTimer", 0);
    m(this, "holdTimer", 0);
    m(this, "hoverTimer", 0);
    m(this, "tipHeld", !1);
    m(this, "placeKey", "");
    m(this, "tipUp", (t) => {
      clearTimeout(this.holdTimer), !(t.pointerType === "mouse" || this.tipEl.hidden) && (clearTimeout(this.tipTimer), this.tipTimer = window.setTimeout(() => this.hideTip(), this.tipHeld ? 4e3 : 2500));
    });
    // quem segurou para ler ganha mais tempo
    m(this, "offLang");
    // ── jogo com um amigo ──
    m(this, "amigoNome", null);
    m(this, "amigoFaixa", null);
    // ── papéis no jogo com um amigo (D31): o meu papel (null = comando tudo) e quem tem o outro ──
    m(this, "papel", null);
    m(this, "papelQuem", "");
    // ── partida online (M6): as tribos no alto (com o apelido de cada pessoa e os aliados), sinais e marcas ──
    m(this, "tribos", null);
    m(this, "sigTribos", "");
    m(this, "sinalTipo", null);
    m(this, "marcas", []);
    /** onde um ponto do mapa fica na tela: [x, y, visível] (posto pelo main, com a câmera) */
    m(this, "projetor", null);
    this.world = t, this.me = a, this.act = s, this.touch = i, this.selected = o, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = tr(() => this.build()), G.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = G.opts.muted;
      n.innerHTML = yt(r ? "mute" : "sound"), n.title = p(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (a) => a.target?.closest?.(ti.TIP_SEL) ?? null;
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
      a = `<div class="tip-h"><b>${Kt(l)}</b></div>`;
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
    return `<div class="tip-h"><span class="tip-ic">${Ue(t.ic)}</span><b>${Kt(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${Kt(t.tip.desc)}</p>` : "") + (t.vs ? Jo(t.vs) : "") + (t.why ? `<p class="tip-why">${Kt(t.why)}</p>` : "");
  }
  costHtml(t) {
    const a = this.world.players[this.me].res;
    return `<span class="cost">${fa.filter((s) => t[s]).map((s) => `<span class="c${a[s] < t[s] * 100 ? " no" : ""}">${yt(s)}${t[s]}</span>`).join("")}</span>`;
  }
  bldDesc(t, a) {
    const s = Et[Vt[t]];
    return p(`bld.${t}.d`, { n: s.pop ? s.pop[Math.min(a, s.pop.length - 1)] : 0, get: Pe.get, fair: Pe.fair });
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
          <button id="btn-som" title="${p(G.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${p(G.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${G.opts.muted}">${yt(G.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-quem-vence" title="${p("btn.vs")}" aria-label="${p("btn.vs")}">${yt("vs")}</button>
          <button id="btn-ajuda" title="${p("btn.help")}" aria-label="${p("btn.help")}">${yt("help")}</button>
          <button id="btn-menu" title="${p("btn.menu")}" aria-label="${p("btn.menu")}">${yt("menu")}<span class="btn-label">${p("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <p class="amigo-faixa panel" id="amigo-faixa" hidden></p>
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${yt("check")}<span>${p("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${yt("cancel")}<span>${p("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${p(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${p("btn.idle")}">${yt("idle")}<span class="btn-label">${p("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${p("btn.army")}">${yt("army")}<span class="btn-label">${p("btn.army")}</span></button>
            <button id="btn-aldeia" title="${p("btn.home")}">${yt("home")}<span class="btn-label">${p("btn.home")}</span></button>
            <button id="btn-sinal" title="${p("sinal.btn")}" hidden>${yt("sinal")}<span class="btn-label">${p("sinal.btn")}</span></button>
          </div>
          <div class="sinais panel" id="sinais" hidden>${Hi.map((s) => `<button data-sinal="${s}">${yt(tn[s])}<span>${p(`sinal.${s}`)}</span></button>`).join("")}</div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="marcas" id="marcas" aria-live="polite"></div>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${p("help.title")}</h2><p class="goal">${p("help.goal")}</p>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", "help.l9", "help.l8", "help.l10", t ? "help.l5.touch" : "help.l5.mouse"].map((s) => `<li>${p(s)}</li>`).join("")}</ul>
        <p class="hint-copy">${p(t ? "hint.touch" : "hint.mouse")}</p>
        <div class="row-btns"><button id="btn-quem-vence-ajuda">${yt("vs")}<span>${p("btn.vs")}</span></button><button id="btn-fechar-ajuda" class="primary">${p("help.close")}</button></div></div></div>
      <div class="modal" id="vantagens" data-open="false"><div class="card panel vs-card">
        <h2>${yt("vs")}${p("btn.vs")}</h2><div id="vantagens-corpo"></div>
        <button id="btn-fechar-vantagens" class="primary">${p("help.close")}</button></div></div>`;
    for (const s of ["era", "res", "cal", "amigo-chip", "tribos", "sinais", "marcas", "amigo-faixa", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "hint", "sel", "cmd", "mini", "ajuda", "vantagens", "vantagens-corpo", "idle-n"]) this.$[s] = document.getElementById(s);
    this.$.mini.appendChild(this.minimap);
    const a = (s, i) => {
      document.getElementById(s).onclick = i;
    };
    a("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), a("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), a("btn-quem-vence", () => this.openVs()), a("btn-quem-vence-ajuda", () => {
      this.$.ajuda.dataset.open = "false", this.openVs();
    }), a("btn-fechar-vantagens", () => this.$.vantagens.dataset.open = "false"), a("btn-menu", () => this.act.menu()), a("btn-som", () => G.toggleMute()), a("btn-ocioso", () => this.act.idle()), a("btn-exercito", () => this.act.army()), a("btn-aldeia", () => this.act.home()), a("btn-sinal", () => {
      const s = this.$.sinais;
      s.hidden = !s.hidden;
    }), this.$.sinais.querySelectorAll("[data-sinal]").forEach((s) => s.onclick = () => {
      this.$.sinais.hidden = !0, this.act.sinal?.(s.dataset.sinal);
    }), a("btn-confirmar-obra", () => this.act.placeConfirm()), a("btn-cancelar-modo", () => this.act.cancelMode()), this.$.ajuda.onclick = (s) => {
      s.target === this.$.ajuda && (this.$.ajuda.dataset.open = "false");
    }, this.$.vantagens.onclick = (s) => {
      s.target === this.$.vantagens && (this.$.vantagens.dataset.open = "false");
    }, this.sigTop = this.sigSel = this.sigCard = this.sigMode = "", this.idleN = -1, this.toasts = [], this.setAmigo(this.amigoNome), this.setFaixa(this.amigoFaixa), this.setPapel(this.papel, this.papelQuem), this.setTribos(this.tribos), this.sigTribos = "", this.update(0, !0);
  }
  /** no alto da tela: com quem está jogando (null: sozinho) */
  setAmigo(t) {
    this.amigoNome = t;
    const a = this.$["amigo-chip"];
    if (!a) return;
    const s = t && this.papel ? p("amigo.chipPapel", { name: t, papel: p(`papel.${this.papel}`) }) : t ? p("amigo.chip", { name: t }) : "";
    a.hidden = !t, a.innerHTML = t ? `${yt("amigo")}<span>${Kt(s)}</span>` : "";
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
    const s = this.world, i = s.players.map((o) => `${o.ai ? 1 : 0}${o.defeated ? 1 : 0}`).join("") + Ce();
    i !== this.sigTribos && (this.sigTribos = i, a.innerHTML = s.players.map((o, n) => {
      const r = n === this.me ? p("tribe.you") : t[n] ? o.ai ? p("online.computadorDe", { name: t[n] }) : t[n] : p("sala.computador"), l = s.aliado(this.me, n);
      return `<span class="trib${n === this.me ? " eu" : ""}${l ? " aliado" : ""}${o.defeated ? " fora" : ""}" style="--cor:${o.color}" title="${Kt(r)}${l ? " · " + p("online.aliado") : ""}"><i></i>${Kt(r)}${l ? yt("amigo") : ""}</span>`;
    }).join(""));
  }
  /** o modo sinal: qual sinal o próximo toque no mapa põe */
  setSinal(t) {
    this.sinalTipo = t;
  }
  /** a marca de um sinal no mapa (some depois de 6 s) */
  addMarca(t, a, s, i) {
    const o = document.createElement("div");
    o.className = `marca-sinal ${s}`, o.innerHTML = `${yt(tn[s])}<span><b>${Kt(i)}</b>${p(`sinal.${s}`)}</span>`, this.$.marcas.appendChild(o), this.marcas.push({ x: t, z: a, ate: performance.now() + 6e3, el: o }), this.marcas.length > 6 && this.marcas.shift().el.remove(), this.posicionarMarcas();
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
    this.hideTip(), this.$["vantagens-corpo"].innerHTML = ah(this.world.players[this.me].era), this.$.vantagens.dataset.open = "true";
  }
  hideHint() {
    this.hintHidden || (this.hintHidden = !0, this.$.hint.style.opacity = "0");
  }
  /** wall: 1 = escolhendo o começo da muralha, 2 = escolhendo o fim */
  setMode(t, a = !0, s = 0, i = "") {
    this.mode = t, this.placeOk = a, this.wallStep = s, this.placeKey = i, t !== "normal" && this.hideTip();
  }
  /** nome da construção na era (o Centro vira Salão do chefe, o campo de treino vira Quartel) */
  bldName(t, a) {
    for (let s = a; s >= 0; s--) {
      const i = `bld.${t}.e${s}`, o = p(i);
      if (o !== i) return o;
    }
    return p(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, a, s, i = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const o = document.createElement("button");
    for (o.className = "toast panel", o.dataset.aviso = i || "info", o.innerHTML = `<span>${Kt(t)}</span>${a !== void 0 ? `<span class="go">${p("msg.go")}</span>` : ""}`, o.onclick = () => {
      a !== void 0 && s !== void 0 && this.act.jump(a, s), o.remove(), this.toasts = this.toasts.filter((n) => n.el !== o);
    }, this.$.toasts.prepend(o), this.toasts.unshift({ el: o, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return this.tribos && t >= 0 && t < this.tribos.length && t !== this.me ? this.tribos[t] || p("sala.computador") : t === this.me ? p("tribe.you") : p(t === zt ? "tribe.wild" : `tribe.${t === Be ? 6 : t}`);
  }
  onEvents(t) {
    for (const a of t) {
      if (a.t === "age") {
        this.toast(a.player === this.me ? p("msg.ageMe", { era: p(`era.${a.era}.in`) }) : p("msg.ageOther", { p: this.tribe(a.player), era: p(`era.${a.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (a.t !== "msg" || a.player !== this.me) continue;
      const [s, i] = a.key.split("."), o = a.x !== void 0 ? a.x / 256 : void 0, n = a.z !== void 0 ? a.z / 256 : void 0;
      if (s === "built") this.toast(p("msg.built", { b: p(`bld.${i}`) }), o, n, "built");
      else if (s === "defeated") {
        const r = Number(i), l = this.tribos?.[r];
        this.toast(r === this.me ? p("msg.youDefeated") : l ? p("msg.defeatedDe", { p: l }) : p("msg.defeated", { p: this.tribos ? p(`tribe.${r}`) : this.tribe(r) }), void 0, void 0, "defeated");
      } else s === "tech" ? this.toast(p("msg.tech", { tech: p(`tech.${i}`) }), o, n, "tech") : this.toast(p(`msg.${s}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), s === "underAttack" || s === "raidSoon" || s === "centerLost" || s === "centerDanger" || s === "campLoot" ? o : void 0, n, s);
    }
  }
  // ── atualização ──
  update(t, a = !1) {
    for (const s of this.toasts) (s.t -= t) <= 0 && s.el.remove();
    this.toasts = this.toasts.filter((s) => s.t > 0);
    for (const s of this.progs) s.el.style.width = `${Math.round(Math.max(0, Math.min(1, s.f())) * 100)}%`;
    this.marcas.length && this.posicionarMarcas(), this.slow -= t, !(!a && this.slow > 0) && (this.slow = 0.15, this.renderTop(), this.renderMode(), this.renderSel(), this.renderCard(), this.renderIdle(), this.desenharTribos());
  }
  renderTop() {
    const t = this.world, a = t.players[this.me], s = a.era, i = s >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], o = t.pop(this.me), n = t.popCap(this.me), r = i.map((l) => Math.floor(a.res[l] / 100)).join(",") + `|${o}|${n}|${s}|${a.aging > 0}|${t.season}|${t.year}|${Ce()}`;
    r !== this.sigTop && (this.sigTop = r, this.$.res.innerHTML = i.map((l) => `<div class="r" title="${p(`res.${l}`)}">${yt(l)}<span>${Kc(a.res[l] / 100)}</span></div>`).join("") + `<div class="r${o >= n ? " full" : ""}" title="${p("pop.tip", { n: o, cap: n, max: es[s] })}">${yt("pop")}<span>${o}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${hh[s]}</span><span class="name">${p(`era.${s}`)}</span>${a.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = p(`era.${s}`), this.$.cal.innerHTML = `${yt(`season.${t.season}`)}<span class="name">${p(`season.${t.season}`)}</span><span class="yr">${p("cal.year", { y: t.year })}</span><span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${p(`season.${t.season}`)} · ${p("cal.year", { y: t.year })}`, this.$.cal.dataset.season = String(t.season), this.bindProgs());
  }
  renderMode() {
    const t = this.world.players[this.me].era, a = `${this.mode}|${this.placeOk}|${this.wallStep}|${this.placeKey}|${t}|${Ce()}`;
    if (a === this.sigMode) return;
    this.sigMode = a;
    const s = this.$.modebar;
    s.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && this.touch), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk));
    const i = this.touch ? "touch" : "mouse", o = this.mode === "place" ? this.wallStep && (this.placeOk || this.wallStep === 2) ? p(`place.wall${this.wallStep}.${i}`) : this.placeOk ? p(`place.${i}`) : p("place.bad") : this.mode === "rally" ? p("rally.hint") : this.mode === "sinal" && this.sinalTipo ? p("sinal.toque", { sinal: p(`sinal.${this.sinalTipo}`) }) : "";
    this.$["modebar-text"].innerHTML = (this.mode === "place" && this.placeKey ? `<b class="mb-name">${Kt(this.bldName(this.placeKey, t))}</b> · ` : "") + Kt(o);
  }
  renderIdle() {
    const t = this.world;
    let a = 0;
    for (let s = 0; s < t.top; s++) t.isUnit(s) && t.owner[s] === this.me && t.kind[s] === ut.villager && t.task[s] === 0 && t.state[s] !== Xt && a++;
    a !== this.idleN && (this.idleN = a, this.$["idle-n"].hidden = a === 0, this.$["idle-n"].textContent = String(a));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const a = this.world, s = a.task[t], i = a.tgt[t];
    return s === jt ? a.phase[t] === ps ? p("do.return", { n: Math.floor(a.carry[t] / 100), res: p(`res.${ch[a.carryRes[t]]}`).toLowerCase() }) : i < 0 ? p("do.move") : a.tgtTile[t] ? p(a.map.tree[i] ? "do.wood" : a.resKind[i] === ee ? "do.berry" : a.resKind[i] === Ne ? "do.stone" : "do.metal") : p(a.kind[i] === kt ? "do.meat" : "do.farm") : p(s === qe ? "do.build" : s === Ft ? i >= 0 && a.owner[i] === zt ? "do.hunt" : "do.fight" : s === Ma ? "do.amove" : a.state[t] === Xt ? "do.move" : a.foodMode[t] ? "do.forage" : "do.idle");
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
      if (r >= xt) {
        const h = Et[r - xt], f = t.players[l]?.era ?? 0, d = t.done[n] === 1, u = t.queue[n], g = h.key === "farm" && d ? this.farmer(n) : null;
        if (s = `b${n}|${t.hp[n]}|${d}|${u.join(",")}|${g}|${Ce()}|${this.papel}`, s === this.sigSel) return;
        const b = c ? d ? "" : p("info.building") : this.tribe(l), k = this.bldDesc(h.key, f);
        i = this.head(Ue(h.key), this.bldName(h.key, f), b, c) + this.hp(t.hp[n], h.hp) + (!d && c ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${k}</div>` + (g !== null ? `<div class="sel-line">${p("info.farmer", { who: p(g ? "info.yes" : "info.no") })}</div>` : "") + (c ? this.quemComanda(n, h.key) : "") + (u.length ? `<div class="queue" aria-label="${p("info.queue")}">${u.map((v, M) => {
          const y = v >= re ? Qe[v - re].key : _[v].key;
          return `<span class="qi" title="${p(v >= re ? `tech.${y}` : `unit.${y}`)}">${Ue(y)}${M === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === kt) {
        const h = Math.floor(t.work[n] / 100);
        if (s = `c${n}|${h}|${Ce()}`, s === this.sigSel) return;
        i = this.head(yt("carcass", "currentColor"), p("unit.carcass"), p(`unit.${_[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${p("unit.carcass.d", { food: h })}</div>`;
      } else {
        const h = _[r], f = c ? this.doing(n) : this.tribe(l), d = c ? this.quemComanda(n) : "";
        if (s = `u${n}|${t.hp[n]}|${f}|${Ce()}|${this.papel}`, s === this.sigSel) return;
        i = this.head(Ue(h.key), p(`unit.${h.key}`), f, c) + this.hp(t.hp[n], h.hp) + `<div class="sel-desc">${p(`unit.${h.key}.d`, { food: h.animal?.food ?? 0 })}</div>` + d + Jo(h.key);
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of a) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, c) => l[0] - c[0]);
      if (s = "m" + r.map(([l, c]) => `${l}:${c}`).join(",") + Ce(), s === this.sigSel) return;
      i = this.head(yt("pop", "currentColor"), p("sel.many", { n: a.length }), "", !0) + `<div class="sel-icons">${r.map(([l, c]) => `<button data-selecionar="${_[l]?.key ?? l}" title="${p(`unit.${_[l]?.key}`)}">${Ue(_[l]?.key ?? "")}<span>${c}</span></button>`).join("")}</div>`;
    }
    this.sigSel = s, this.$.sel.hidden = !1, this.$.sel.innerHTML = i, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(ut[n.dataset.selecionar]));
    const o = this.$.sel.querySelector("#btn-limpar-selecao");
    o && (o.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, a, s, i) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Kt(a)}</div>${s ? `<div class="sel-sub">${Kt(s)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${p("sel.clear")}" aria-label="${p("sel.clear")}">${yt("close")}</button></div>`;
  }
  /** com papel (D31): no que é do outro papel, quem comanda; no campo de treino, o Líder de Combate só treina tropas */
  quemComanda(t, a = "") {
    const s = this.papel;
    if (!s || os(this.world, s, t)) return "";
    const i = p(`papel.${ii(s)}`), o = Kt(this.papelQuem || "?"), n = a && Di(a) ? p("papel.soTreinar", { name: o, papel: i }) : p("papel.quem", { name: o, papel: i });
    return `<div class="sel-line papel-quem">${yt("amigo")}<span>${n}</span></div>`;
  }
  hp(t, a) {
    const s = Math.max(0, Math.min(1, t / a));
    return `<div class="hp" title="${p("info.hp")} ${Math.max(0, t)}/${a}"><i style="width:${Math.round(s * 100)}%" class="${s > 0.6 ? "ok" : s > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const a = this.world;
    for (let s = 0; s < a.top; s++) if (a.isUnit(s) && a.task[s] === jt && a.tgt[s] === t && !a.tgtTile[s]) return !0;
    return !1;
  }
  // ── cartão de comandos ──
  missing(t) {
    const a = this.world.players[this.me].res;
    return fa.find((s) => a[s] < (t[s] ?? 0) * 100);
  }
  whyCost(t) {
    const a = this.missing(t);
    return a ? p("why.cost", { res: p(`res.${a}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, a = this.me, s = t.players[a], i = [...this.selected].filter((v) => t.alive[v]), o = i.filter((v) => t.isUnit(v) && t.owner[v] === a && os(t, this.papel, v)), n = o.filter((v) => t.kind[v] === ut.villager), r = this.papel === "combate", l = [];
    if (o.length) {
      if (this.cardMode === "build" && n.length) {
        l.push({ id: "btn-voltar-comandos", ic: "back", label: p("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const v of Et) if (v.buildable && v.era <= s.era + 1) {
          const M = v.era > s.era ? p("why.era", { era: p(`era.${v.era}.in`) }) : this.whyCost(v.cost), y = this.bldName(v.key, s.era);
          l.push({ data: ["construir", v.key], ic: v.key, label: y, tip: { name: y, desc: this.bldDesc(v.key, s.era) }, cost: v.cost, why: M, act: () => this.act.startPlace(v.key) });
        }
        return l;
      }
      if (n.length && l.push({ id: "btn-construir", ic: "build", label: p("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const v = n.every((M) => t.foodMode[M] > 0);
        l.push({ id: "btn-buscar-comida", ic: "food", label: p("cmd.food"), tip: { name: p("cmd.food"), desc: p(v ? "cmd.food.off" : "cmd.food.d") }, pressed: v, act: () => this.act.food(!v) });
      }
      return l.push({ id: "btn-parar", ic: "stop", label: p("cmd.stop"), act: () => this.act.stop() }), l;
    }
    if (i.length !== 1 || !t.isBuilding(i[0]) || t.owner[i[0]] !== a) return l;
    const c = i[0], h = t.bdef(c), f = t.done[c] === 1, d = s.era;
    if (!f) return l;
    const u = ao(h, d), g = t.pop(a), b = t.popCap(a);
    let k = 0;
    for (let v = 0; v < t.top; v++) if (t.isBuilding(v) && t.owner[v] === a)
      for (const M of t.queue[v]) M < re && (k += _[M].pop);
    for (const v of u) {
      if (r && !ho(v)) continue;
      const M = _[ut[v]], y = t.queue[c], $ = y.length >= 5 ? p("why.queue") : this.whyCost(M.cost) ?? (g + k + M.pop > b ? p(b >= es[d] ? "why.popEra" : "why.pop") : void 0);
      l.push({ data: ["treinar", v], ic: v, label: p(`unit.${v}`), tip: { name: p(`unit.${v}`), desc: p(`unit.${v}.d`) }, vs: v, cost: M.cost, why: $, badge: y.filter((q) => q === ut[v]).length, act: () => this.act.train(c, v) });
    }
    for (const v of r ? [] : h.research ?? []) {
      const M = js[v], y = Qe[M], $ = t.queue[c];
      if (t.hasTech(a, v)) continue;
      const q = t.techQueued(a, M) ? p("why.techQueued") : y.needs && !t.hasTech(a, y.needs) ? p("why.needs", { tech: p(`tech.${y.needs}`) }) : $.length >= 5 ? p("why.queue") : this.whyCost(y.cost);
      l.push({ data: ["pesquisar", v], ic: v, label: `${p(`tech.${v}`)}: ${p(`tech.${v}.d`)}`, tip: { name: p(`tech.${v}`), desc: p(`tech.${v}.d`) }, cost: y.cost, why: q, act: () => this.act.research(c, v) });
    }
    if (h.market && !r) {
      const v = t.fair ? Pe.fair : Pe.get;
      for (const M of ta) l.push({ data: ["dar", M], ic: M, label: p("trade.give", { res: p(`res.${M}`).toLowerCase() }), short: p("trade.giveShort"), pressed: this.give === M, act: () => {
        this.give = M;
      } });
      for (const M of ta) if (M !== this.give) {
        const y = s.res[this.give] < Pe.give * 100 ? p("why.trade", { res: p(`res.${this.give}`).toLowerCase() }) : void 0;
        l.push({ data: ["receber", M], ic: M, label: (t.fair ? p("trade.fair") + " " : "") + p("trade.get", { n: v, res: p(`res.${M}`).toLowerCase() }), short: `+${v}`, cost: { [this.give]: Pe.give }, why: y, act: () => this.act.trade(c, this.give, M) });
      }
    }
    if (t.queue[c].length && (!r || Di(h.key)) && l.push({ id: "btn-cancelar-fila", ic: "cancel", label: p("cmd.cancelQueue"), act: () => this.act.cancelQueue(c) }), h.key === "center" && !r)
      if (s.aging > 0) l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.aging", { era: p(`era.${d + 1}.to`) }), why: p("why.ageBusy"), prog: () => 1 - s.aging / (pa[d].time * 10), act: () => {
      } });
      else if (d < Tn) {
        const v = t.eraBuildingTypes(a), M = pa[d];
        l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), tip: { name: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), desc: p("help.l4") }, cost: M.cost, why: v < 2 ? p("why.age", { n: v }) : this.whyCost(M.cost), act: () => this.act.ageUp(c) });
      } else l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), why: p("why.maxEra"), act: () => {
      } });
    return u.length && !r && l.push({ id: "btn-ponto-reuniao", ic: "rally", label: p("cmd.rally"), tip: { name: p("cmd.rally"), desc: p("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(c) }), l;
  }
  refresh() {
    this.sigCard = "", this.slow = 0;
  }
  renderCard() {
    const t = [...this.selected].filter((n) => this.world.alive[n]), a = t.slice(0, 4).join(",");
    a !== this.cardFor && (this.cardFor = a, this.cardMode = "main");
    const s = this.buttons(), i = s.map((n) => `${n.id ?? n.data?.join("=")}|${n.label}|${n.why ?? ""}|${n.badge ?? ""}|${n.pressed ?? ""}`).join(";") + Ce();
    if (i === this.sigCard) {
      this.btns = s;
      return;
    }
    this.sigCard = i, this.btns = s;
    const o = this.$.cmd;
    o.hidden = s.length === 0, o.innerHTML = s.map((n, r) => {
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, c = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${Kt(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${Ue(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${Kt(n.label)}</span>${n.short ? `<span class="cb-s">${Kt(n.short)}</span>` : ""}${c}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
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
      i === "aging" || i === "btn" ? r = () => a.aging > 0 ? 1 - a.aging / (pa[Math.min(a.era, pa.length - 1)].time * 10) : 0 : i === "season" ? r = () => t.tick % 1800 / 1800 : i === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : i === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= re ? Qe[l - re].time : _[l].time) * 10);
      }), r && this.progs.push({ el: s, f: r });
    });
  }
};
// ── dica dos ícones ──
m(ti, "TIP_SEL", ".cb, .qi, .sel-icons button, .sel .vs-i, .r, .era-chip, .cal, .tools button, .quick button");
let Ui = ti;
class dh {
  constructor(t, a, s, i) {
    m(this, "ctx");
    m(this, "base");
    m(this, "img");
    m(this, "t", 1);
    /** partida online (M6): o sinal de um aliado, um círculo piscando por 6 s */
    m(this, "marcas", []);
    m(this, "metalOn", !1);
    this.world = a, this.me = s, this.cam = i;
    const o = a.size;
    t.width = t.height = o, this.ctx = t.getContext("2d"), this.base = this.ctx.createImageData(o, o), this.img = this.ctx.createImageData(o, o);
    const n = a.map, r = this.base.data;
    for (let h = 0; h < o; h++) for (let f = 0; f < o; f++) {
      const d = h * o + f, u = n.terrain[d], g = n.heights[Math.round(h / n.hstep) * n.hn + Math.round(f / n.hstep)];
      let b = [104, 150, 72];
      if (u === Je) b = [46, 104, 128];
      else if (u === ba) b = [86, 150, 160];
      else if (u === Ds) b = [205, 186, 140];
      else if (u === Ye || u === Ie && g > ai - 0.3) b = [140, 135, 125];
      else {
        const k = Math.max(0, Math.min(1, (g - 1) / 12));
        b = [104 + k * 30, 150 - k * 10, 72 + k * 20];
      }
      n.tree[d] && (b = [52, 92, 50]), r.set([b[0], b[1], b[2], 255], d * 4);
    }
    for (const h of n.res) {
      const f = h.kind === ee ? [200, 60, 70] : h.kind === Ne ? [215, 210, 200] : h.kind === ke ? [90, 190, 160] : [255, 255, 255];
      h.kind === ke || !a.resKind[h.z * o + h.x] || this.base.data.set([f[0], f[1], f[2], 255], (h.z * o + h.x) * 4);
    }
    let l = !1;
    const c = (h) => {
      const f = t.getBoundingClientRect();
      this.cam.tx = (h.clientX - f.left) / f.width * o, this.cam.tz = (h.clientY - f.top) / f.height * o;
    };
    t.addEventListener("pointerdown", (h) => {
      l = !0, t.setPointerCapture(h.pointerId), c(h), h.stopPropagation();
    }), t.addEventListener("pointermove", (h) => {
      l && c(h);
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
      for (const g of this.world.map.res) g.kind === ke && this.world.resKind[g.z * u + g.x] === ke && this.base.data.set([90, 190, 160, 255], (g.z * u + g.x) * 4);
    }
    const o = this.world.size, n = this.base.data, r = this.img.data, l = this.world.vis[this.me], c = this.world.explored[this.me];
    for (let u = 0; u < o * o; u++) {
      const g = !a || l[u] ? 1 : c[u] ? 0.5 : 0.08, b = u * 4;
      r[b] = n[b] * g, r[b + 1] = n[b + 1] * g, r[b + 2] = n[b + 2] * g, r[b + 3] = 255;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const h = this.world;
    for (let u = 0; u < h.top; u++) {
      if (!h.alive[u]) continue;
      const g = h.x[u] / 256, b = h.z[u] / 256, k = h.owner[u] === this.me;
      if (a && !k && !l[Math.floor(b) * o + Math.floor(g)] || h.kind[u] === kt) continue;
      const v = h.kind[u] >= xt, M = h.owner[u], y = v ? h.bdef(u).size === 1 ? 2 : 7 : M === zt ? 2 : 3;
      this.ctx.fillStyle = M === zt ? "#e8d9b0" : M === Be ? "#2f3b27" : h.players[M]?.color ?? "#fff", this.ctx.fillRect(g - y / 2, b - y / 2, y, y), v && y > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(g - y / 2, b - y / 2, y, y));
    }
    const f = performance.now();
    this.marcas = this.marcas.filter((u) => u.ate > f);
    for (const u of this.marcas) {
      const g = 5 + Math.floor(f / 250) % 2 * 2;
      this.ctx.strokeStyle = u.cor, this.ctx.lineWidth = 2.5, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, g, 0, Math.PI * 2), this.ctx.stroke(), this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, g + 2, 0, Math.PI * 2), this.ctx.stroke();
    }
    const d = [[0, 0], [s, 0], [s, i], [0, i]].map(([u, g]) => this.cam.ground(u, g, s, i));
    d.every((u) => u) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), d.forEach((u, g) => g ? this.ctx.lineTo(u.x, u.z) : this.ctx.moveTo(u.x, u.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class uh {
  constructor(t, a, s, i, o, n) {
    m(this, "selected", /* @__PURE__ */ new Set());
    /** papel no jogo com um amigo (D31): só seleciona em grupo e só manda no que é do papel; null = tudo */
    m(this, "papel", null);
    m(this, "pointers", /* @__PURE__ */ new Map());
    m(this, "gesture", "none");
    m(this, "longTimer", 0);
    m(this, "lastTap", { t: 0, x: 0, y: 0 });
    m(this, "keys", /* @__PURE__ */ new Set());
    m(this, "v", new wt());
    m(this, "v2", new wt());
    m(this, "right", new wt());
    m(this, "ac", new AbortController());
    this.canvas = t, this.world = a, this.me = s, this.cam = i, this.box = o, this.hooks = n;
    const r = { signal: this.ac.signal };
    t.addEventListener("pointerdown", (l) => this.down(l), r), t.addEventListener("pointermove", (l) => this.move(l), r), t.addEventListener("pointerup", (l) => this.up(l), r), t.addEventListener("pointercancel", (l) => this.cancel(l), r), t.addEventListener("contextmenu", (l) => l.preventDefault(), r), t.addEventListener("wheel", (l) => {
      l.preventDefault(), this.cam.tdist *= Math.exp(l.deltaY * 12e-4), this.hooks.onInteract();
    }, { passive: !1, signal: this.ac.signal }), addEventListener("keydown", (l) => this.key(l), r), addEventListener("keyup", (l) => this.keys.delete(l.key.toLowerCase()), r), addEventListener("blur", () => this.keys.clear(), r);
  }
  manda(t) {
    return os(this.world, this.papel, t);
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
      this.keys.add(t.key.toLowerCase());
    }
  }
  down(t) {
    if (this.canvas.setPointerCapture(t.pointerId), this.hooks.onInteract(), this.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY, sx: t.clientX, sy: t.clientY, t: performance.now(), button: t.button, type: t.pointerType }), clearTimeout(this.longTimer), this.pointers.size === 2) {
      this.gesture = "pinch", this.hideBox();
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
    if (this.gesture === "pinch" && this.pointers.size === 2) {
      const n = [...this.pointers.entries()].find(([f]) => f !== t.pointerId)[1], r = Math.hypot(a.x - n.x, a.y - n.y), l = Math.hypot(t.clientX - n.x, t.clientY - n.y);
      l > 10 && r > 10 && (this.cam.tdist *= r / l);
      const c = Math.atan2(a.y - n.y, a.x - n.x), h = Math.atan2(t.clientY - n.y, t.clientX - n.x);
      this.cam.tyaw += Math.atan2(Math.sin(h - c), Math.cos(h - c)), this.cam.pan(s * 0.5, i * 0.5, this.H);
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
        const d = this.cam.ground(s, i, this.W, this.H);
        if (!d) return;
        if (o === "rally" || o === "sinal" || this.singleOwnBuilding() >= 0) {
          this.hooks.onRally(d.x, d.z);
          return;
        }
        this.ownUnitsSelected() && this.hooks.onCommand(this.target(s, i, d));
      } else if (a.button === 0) {
        if (o === "place") {
          const d = this.cam.ground(s, i, this.W, this.H);
          d && this.hooks.onPlaceAt(d.x, d.z), this.hooks.onPlaceConfirm(t.shiftKey);
          return;
        }
        if (o === "rally" || o === "sinal") {
          const d = this.cam.ground(s, i, this.W, this.H);
          d && this.hooks.onRally(d.x, d.z);
          return;
        }
        this.clickSelect(s, i, t.shiftKey, r);
      }
      return;
    }
    const l = this.cam.ground(s, i, this.W, this.H);
    if (o === "place") {
      l && this.hooks.onPlaceAt(l.x, l.z);
      return;
    }
    if (o === "rally" || o === "sinal") {
      l && this.hooks.onRally(l.x, l.z);
      return;
    }
    const c = this.target(s, i, l), h = this.world, f = this.ownUnitsSelected();
    if (c.kind === "unit" && h.owner[c.e] === this.me && h.kind[c.e] !== kt && this.manda(c.e)) {
      this.clickSelect(s, i, !1, r);
      return;
    }
    if (c.kind === "building" && h.owner[c.e] === this.me) {
      const d = !h.done[c.e] || Et[h.kind[c.e] - xt].walk;
      f && d ? this.hooks.onCommand(c) : this.only(c.e);
      return;
    }
    if (f && l) {
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
    this.pointers.delete(t.pointerId), clearTimeout(this.longTimer), this.hideBox(), this.gesture = "none";
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
      if (!i.alive[l] || i.kind[l] >= xt) continue;
      const c = i.owner[l] === this.me;
      if (s && !c) continue;
      const h = i.x[l] / 256, f = i.z[l] / 256;
      if (!c && !this.seen(h, f) || (this.cam.toScreen(h, ft(i.map, h, f) + (i.kind[l] === kt ? 0.2 : 0.6), f, this.W, this.H, this.v), !this.v.z)) continue;
      const d = (this.v.x - t) ** 2 + (this.v.y - a) ** 2;
      d < r && (r = d, n = l);
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
      const c = Et[s.kind[n] - xt].size, h = ft(s.map, r, l) + (c >= 3 ? 0.7 : 0.5);
      if (this.cam.toScreen(r, h, l, this.W, this.H, this.v), !this.v.z) continue;
      this.cam.toScreen(r + this.right.x * c * 0.55, h, l + this.right.z * c * 0.55, this.W, this.H, this.v2);
      const f = Math.max(18, Math.hypot(this.v2.x - this.v.x, this.v2.y - this.v.y)), d = Math.hypot(this.v.x - t, this.v.y - a) / f;
      d < o && (o = d, i = n);
    }
    return [i, o];
  }
  /** árvore, arbusto ou pedra perto do ponto (a copa de uma árvore cobre o chão atrás dela) */
  pickTile(t, a, s) {
    const i = this.world, o = i.size, n = Math.floor(s.x), r = Math.floor(s.z), l = this.lastTouch ? 36 : 28;
    let c = -1, h = l * l;
    for (let f = -3; f <= 2; f++) for (let d = -3; d <= 3; d++) {
      const u = n + d, g = r + f;
      if (u < 0 || g < 0 || u >= o || g >= o) continue;
      const b = g * o + u, k = i.map.tree[b] > 0;
      if (!(!(k || i.resKind[b]) || i.resAmt[b] <= 0 || !i.explored[this.me][b]) && !(i.resKind[b] === 3 && i.players[this.me].era < 2))
        for (const v of k ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(u + 0.5, ft(i.map, u + 0.5, g + 0.5) + v, g + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const M = (this.v.x - t) ** 2 + (this.v.y - a) ** 2;
          M < h && (h = M, c = b);
        }
    }
    return c;
  }
  /** o que está sob o ponto da tela */
  target(t, a, s = this.cam.ground(t, a, this.W, this.H)) {
    const i = this.world, o = s?.x ?? 0, n = s?.z ?? 0, [r, l] = this.pickUnit(t, a, !1), [c, h] = this.pickBuilding(t, a);
    if (r >= 0 && (c < 0 || l < 14 || h > 0.75)) return { kind: "unit", e: r, k: -1, x: i.x[r] / 256, z: i.z[r] / 256 };
    if (c >= 0) return { kind: "building", e: c, k: -1, x: i.x[c] / 256, z: i.z[c] / 256 };
    if (s) {
      const f = this.pickTile(t, a, s);
      if (f >= 0) return { kind: "tile", e: -1, k: f, x: f % i.size + 0.5, z: Math.floor(f / i.size) + 0.5 };
    }
    return { kind: "ground", e: -1, k: -1, x: o, z: n };
  }
  clickSelect(t, a, s, i) {
    const o = this.world, n = this.target(t, a, null), r = n.kind === "unit" ? n.e : -1;
    if (s && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && o.owner[r] === this.me && o.kind[r] !== kt && this.manda(r)) {
      if (s || this.selected.clear(), i) {
        const l = o.kind[r];
        for (let c = 0; c < o.top; c++) if (o.isUnit(c) && o.owner[c] === this.me && o.kind[c] === l && this.manda(c)) {
          const h = o.x[c] / 256, f = o.z[c] / 256;
          this.cam.toScreen(h, ft(o.map, h, f), f, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(c);
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
    const n = this.world, r = Math.min(t, s), l = Math.max(t, s), c = Math.min(a, i), h = Math.max(a, i);
    (!o || !this.ownUnitsSelected()) && this.selected.clear();
    for (let f = 0; f < n.top; f++) {
      if (!n.isUnit(f) || n.owner[f] !== this.me || !this.manda(f)) continue;
      const d = n.x[f] / 256, u = n.z[f] / 256;
      this.cam.toScreen(d, ft(n.map, d, u) + 0.5, u, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= c && this.v.y <= h && this.selected.add(f);
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
const ns = (() => {
  const e = "153c7f7";
  return /^[0-9a-f]{7}$/.test(e) ? parseInt(e, 16) : 0;
})(), ir = new URLSearchParams(location.search), or = ir.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`, nr = or.replace(/^ws/, "http"), fh = !location.pathname.startsWith("/jogar/") && !ir.get("online"), Ee = /^[A-HJ-NP-Z2-9]{4}$/, en = (e) => e.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 4);
let ph = null;
function mh() {
  return fh ? Promise.resolve(!1) : ph ?? (ph = fetch(nr + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class rs {
  // já entrou na sala alguma vez
  constructor(t, a) {
    m(this, "codigo", "");
    m(this, "parceiro", "");
    m(this, "ws", null);
    m(this, "fechado", !1);
    m(this, "caiuEm", 0);
    m(this, "conectou", !1);
    this.papel = t, this.on = a;
  }
  /** o anfitrião abre a sala: pede um código ao servidor e entra nela */
  static async convidar(t) {
    const a = await fetch(nr + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!Ee.test(s)) throw new Error("rede");
    const i = new rs("anfitriao", t);
    return i.codigo = s, i.abrir(), i;
  }
  /** o amigo entra com o código */
  static entrar(t, a) {
    const s = new rs("convidado", a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${or}/sala/${this.codigo}?modo=${this.papel === "anfitriao" ? "criar" : "entrar"}`);
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
    this.enviar(`{"t":"s","v":${ns},"d":${t}}`);
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
const an = "origines_opts", Ut = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class gh {
  // partida online
  constructor(t) {
    m(this, "root");
    m(this, "screen", null);
    m(this, "rivals", 3);
    m(this, "diff", 1);
    m(this, "amigoOn", !1);
    m(this, "convite", null);
    m(this, "codigo", "");
    m(this, "amigoMsg", "");
    m(this, "amigoBusy", !1);
    m(this, "escolhendoPapel", !1);
    // "Convidar um amigo" tocado: falta escolher o papel do amigo
    m(this, "onlineOn", !1);
    m(this, "codigoPartida", "");
    m(this, "partidaMsg", "");
    m(this, "partidaBusy", !1);
    m(this, "vagaEscolhida", -1);
    this.act = t, this.root = document.getElementById("menus");
    try {
      const a = JSON.parse(localStorage.getItem(an) ?? "{}");
      a.rivals >= 1 && a.rivals <= 3 && (this.rivals = a.rivals), a.diff >= 0 && a.diff <= 2 && (this.diff = a.diff);
    } catch {
    }
    tr(() => this.render());
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
  showPause(t, a, s, i) {
    this.screen = { k: "pause", minutes: t, quality: a, saved: "", owner: s, acc: i }, this.render();
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
    i && (i.disabled = a || !Ee.test(this.codigo));
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
    i && (i.disabled = a || !Ee.test(this.codigoPartida));
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
  /** a sala de espera: as vagas com a cor de cada tribo; no 2 contra 2, em dois times */
  vagas(t, a) {
    const s = Gs[t.modo] ?? Gs[1], i = (n) => {
      const r = t.vagas[n] ?? "", l = n === t.eu;
      return `<button data-vaga="${n}" class="vaga${r ? "" : " cpu"}" style="--cor:${so[n]}" aria-pressed="${this.vagaEscolhida === n}"${a ? "" : ' tabindex="-1"'}><i class="cor" aria-hidden="true"></i><span>${r ? Ut(r) : p("sala.computador")}</span>${l ? `<small>${p("sala.voce")}</small>` : ""}</button>`;
    }, o = Array.from({ length: s.vagas }, (n, r) => r);
    return t.modo !== 2 ? `<div class="vagas">${o.map(i).join("")}</div>` : `<div class="vagas times">${[0, 1].map((n) => `<div class="time"><p class="acct-k">${p("sala.time", { n: n + 1 })}</p>${o.filter((r) => s.times[r] === n).map(i).join("")}</div>`).join("")}</div>`;
  }
  /** na pausa do anfitrião: convidar um amigo, o código e quem está jogando junto */
  pauseFriend(t) {
    if (!this.amigoOn || t === "off" || t === "loading") return "";
    const a = this.convite, s = (o) => `<b>${Ut(o)}</b>`;
    if (!t.logado) return `<p class="muted small">${p("amigo.semConta")}</p>`;
    if ((!a || a.estado === "erro") && this.escolhendoPapel) {
      const o = (n, r) => `<button id="btn-papel-${n}" class="big papel">${yt(r)}<span>${p(`papel.${n}`)}<small>${p(`papel.${n}.d`)}</small></span></button>`;
      return `<div class="acct on papeis"><p class="acct-l">${p("papel.pergunta")}</p><p class="acct-s">${p("papel.regra")}</p>${o("logistica", "villager")}${o("combate", "army")}<button id="btn-papel-voltar" class="link">${p("papel.voltar")}</button></div>`;
    }
    if (!a || a.estado === "erro") return `${a ? `<p class="saved fail">${p("amigo.erroCriar")}</p>` : ""}<button id="btn-convidar-amigo" class="big">${yt("amigo")}<span>${p("amigo.convidar")}</span></button><p class="muted small">${p("amigo.convidar.d")}</p>`;
    if (a.estado === "criando") return `<p class="muted">${p("amigo.criando")}</p>`;
    const i = a.papel ? `<p class="acct-s papeis-l">${p("papel.dele", { papel: s(p(`papel.${a.papel}`)) })} · ${p("papel.seu", { papel: s(p(`papel.${ii(a.papel)}`)) })}</p>` : "";
    return `<div class="acct on convite"><p class="acct-k">${p("amigo.codigo")}</p><p class="codigo" aria-label="${Ut((a.codigo ?? "").split("").join(" "))}">${Ut(a.codigo ?? "")}</p>
      ${a.estado === "junto" ? `<p class="acct-l">${p("amigo.jogando", { name: s(a.nome ?? "") })}</p>` : `<p class="acct-s">${p("amigo.instrucoes")}</p><p class="acct-l">${p("amigo.esperando")}</p>`}
      ${i}${a.papel ? `<button id="btn-trocar-papeis" class="acct-btn">${p("papel.trocar")}</button>` : ""}
      <button id="btn-encerrar-convite" class="acct-btn">${p("amigo.encerrar")}</button></div>`;
  }
  soundRows() {
    return ["music", "sfx", "amb"].map((t) => `<div class="opt"><div class="opt-l">${p(`snd.${t}`)}</div><div class="seg">${[0, 1, 2, 3].map((a) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[t]}="${a}" aria-pressed="${G.opts[t] === a}">${p(`snd.l${a}`)}</button>`).join("")}</div></div>`).join("");
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${p("lang.label")}"><button id="btn-idioma-en" aria-pressed="${Ce() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${Ce() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, a) {
    if (a === "off" || a === "loading") return "";
    const s = a.logado ? a.apelido ?? "" : "", i = (n) => `<b>${Ut(n)}</b>`, o = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${p("acct.pauseLogin")}</button>`;
    return t && t === s ? `<div class="acct on small"><p class="acct-l">${p("acct.pauseAccount", { name: i(s) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${p("acct.pauseOther", { name: i(t) })}</p>${s ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${p("acct.switch")}</button>` : o}</div>` : s ? `<div class="acct on small"><p class="acct-l">${p("acct.pauseAdopt", { name: i(s) })}</p></div>` : `<div class="acct small"><p class="acct-l">${p("acct.pauseNone")}</p>${o}</div>`;
  }
  render() {
    const t = this.screen, a = this.root;
    if (a.dataset.open = String(!!t), a.dataset.screen = t?.k ?? "", !t) {
      a.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: r, save: l, other: c } = t.info, h = typeof r == "object" && r.logado ? r.apelido ?? "" : "", f = ($) => `<b>${Ut($)}</b>`, d = l ? l.adopt ? p("save.adopt", { name: f(h) }) : h ? p("save.inAccount", { name: f(h) }) : p("save.deviceOnly") : "", u = r === "off" ? "" : r === "loading" ? `<div class="acct"><p class="acct-l">${p("acct.checking")}</p></div>` : r.logado ? `<div class="acct on"><p class="acct-k">${p("acct.yours")}</p><p class="acct-name">${Ut(h)}</p><p class="acct-l">${p(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${p("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${p("acct.none")}</p><p class="acct-l">${p("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>
            ${c ? `<p class="acct-s">${p("acct.otherHint", { name: f(c) })}</p>` : `<p class="acct-s">${p("acct.why")}</p>`}</div>`, g = r !== "loading" && !t.info.pending, b = `${u}
        ${g && l ? `<button id="btn-continuar" class="big primary">${p("menu.continue")}<small>${p("menu.saved", { era: p(`era.${l.meta.era}`), y: l.meta.year, r: l.meta.rivals })}</small><small class="where">${d}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${g && l ? "" : " primary"}">${p("menu.new")}</button>
        ${this.amigoOn && r !== "off" ? `<button id="btn-entrar-amigo" class="big">${yt("amigo")}<span>${p("amigo.entrar")}</span></button>` : ""}
        ${this.onlineOn && r !== "off" ? `<button id="btn-jogar-online" class="big">${yt("online")}<span>${p("online.jogar")}</span></button>` : ""}`, k = `<p class="acct-k">${p("online.jogar")}</p>
        ${h ? `<p class="acct-s">${p("online.jogar.d")}</p>
          <button id="btn-criar-partida" class="big primary"${this.partidaBusy ? " disabled" : ""}>${yt("online")}<span>${p("online.criar")}</span></button>
          <p class="acct-l">${p("online.digite")}</p>
          <input id="codigo-partida" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${p("online.digite")}" value="${Ut(this.codigoPartida)}">
          <button id="btn-entrar-partida" class="big"${this.partidaBusy || !Ee.test(this.codigoPartida) ? " disabled" : ""}>${p("online.entrarBtn")}</button>
          <p class="acct-s" id="partida-msg" aria-live="polite">${Ut(this.partidaMsg)}</p>` : `<p class="acct-l">${p("online.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`, v = `<p class="acct-k">${p("amigo.entrar")}</p>
        ${h ? `<p class="acct-l">${p("amigo.digite")}</p>
          <input id="codigo-amigo" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${p("amigo.codigoCampo")}" value="${Ut(this.codigo)}">
          <button id="btn-entrar-codigo" class="big primary"${this.amigoBusy || !Ee.test(this.codigo) ? " disabled" : ""}>${p("amigo.entrarBtn")}</button>
          <p class="acct-s" id="amigo-msg" aria-live="polite">${Ut(this.amigoMsg)}</p>` : `<p class="acct-l">${p("amigo.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`, y = `${r === "off" ? "" : `<p class="muted small">${h ? p("new.inAccount", { name: f(h) }) : p("new.deviceOnly")}${l && !l.adopt ? " " + p("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${p("menu.rivals")}</div><div class="seg">${[1, 2, 3].map(($) => `<button data-rivais="${$}" aria-pressed="${this.rivals === $}">${$}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map(($) => `<button data-dificuldade="${$}" aria-pressed="${this.diff === $}">${p(`diff.${$}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${p("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`;
      a.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${p("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? b : t.step === "amigo" ? v : t.step === "online" ? k : y}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${p(G.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${p(G.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${G.opts.muted}">${yt(G.opts.muted ? "mute" : "sound")}</button><span class="credits">${p("menu.credits")}</span></div>
        ${r === "off" ? `<p class="local">${p("menu.local")}</p>` : ""}</div>`;
    } else if (t.k === "pause")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("pause.title")}</h2><p class="muted">${p("pause.time", { m: t.minutes })}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <button id="btn-salvar" class="big">${p("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${p({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${Ut(t.owner)}</b>` })}</p>` : ""}
        ${this.pauseFriend(t.acc)}
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${Ca.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair">${p("pause.quit")}</button></div>
      </div></div>`;
    else if (t.k === "guest")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("amigo.titulo", { name: Ut(t.nome) })}</h2><p class="muted">${p("amigo.noJogoDe", { name: `<b>${Ut(t.nome)}</b>` })}</p>
        ${t.papel ? `<p class="papel-guest">${p("papel.seuPapel", { papel: `<b>${p(`papel.${t.papel}`)}</b>` })}<br><small>${p(`papel.${t.papel}.d`)}</small></p>` : ""}
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${Ca.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair-amigo">${p("amigo.sair")}</button></div>
      </div></div>`;
    else if (t.k === "lobby") {
      const r = t.sala, l = r.eu === r.criador, c = r.vagas.filter(Boolean).length, h = r.vagas[r.criador] ?? "", f = [1, 2, 3, 4].map((u) => `<button data-modo="${u}" aria-pressed="${r.modo === u}">${p(`modo.${u}`)}</button>`).join(""), d = [0, 1, 2].map((u) => `<button data-dif-partida="${u}" aria-pressed="${r.dif === u}">${p(`diff.${u}`)}</button>`).join("");
      a.innerHTML = `<div class="screen lobby"><div class="card panel">
        <h2>${p("sala.titulo")}</h2>
        <div class="acct on convite"><p class="acct-k">${p("sala.codigo")}</p><p class="codigo" aria-label="${Ut(r.codigo.split("").join(" "))}">${Ut(r.codigo)}</p><p class="acct-s">${p("sala.instrucoes")}</p></div>
        ${l ? `<div class="opt"><div class="opt-l">${p("sala.modo")}</div><div class="seg modos">${f}</div></div>
          <div class="opt"><div class="opt-l">${p("sala.dif")}</div><div class="seg">${d}</div></div>` : `<p class="acct-l">${p(`modo.${r.modo}`)} · ${p("sala.dif")}: ${p(`diff.${r.dif}`)}</p>`}
        <p class="muted small">${p(`modo.${r.modo}.d`)}</p>
        ${this.vagas(r, l)}
        ${l ? `<p class="muted small">${p("sala.trocar")}</p><button id="btn-comecar-partida" class="big primary"${c < 2 ? " disabled" : ""}>${p("sala.comecar")}</button>${c < 2 ? `<p class="muted small">${p("sala.precisa")}</p>` : ""}` : `<p class="acct-l">${p("sala.esperando", { name: `<b>${Ut(h)}</b>` })}</p>`}
        <p class="acct-s" id="partida-msg" aria-live="polite">${Ut(this.partidaMsg)}</p>
        <button id="btn-sair-sala" class="link">${p("sala.sair")}</button>
      </div></div>`;
    } else if (t.k === "online")
      a.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("online.titulo")}</h2><p class="muted">${p(t.anfitriao ? "online.pausadoTodos" : "online.naoPausa")}</p>
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${Ca.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair-partida">${p("online.sair")}</button></div>
        <p class="muted small">${p("online.sair.d")}</p>
      </div></div>`;
    else if (t.k === "olhar")
      a.innerHTML = `<div class="screen end defeat"><div class="card panel">
        <h2>${p("online.perdeu")}</h2><p>${p(t.timeVivo ? "online.perdeu.time" : "online.perdeu.d")}</p>
        <button id="btn-olhar-partida" class="big primary">${p("online.olhar")}</button>
        <button id="btn-sair-partida" class="big">${p("online.sair")}</button>
      </div></div>`;
    else if (t.k === "info")
      a.innerHTML = `<div class="screen end"><div class="card panel">
        <h2>${Ut(t.titulo)}</h2><p>${Ut(t.texto)}</p>
        <button id="btn-fim-menu" class="big primary">${p("end.menu")}</button>
      </div></div>`;
    else {
      const r = t.online === "time" ? `end.time.${t.result}` : t.online ? `end.online.${t.result}` : `end.${t.result}`;
      a.innerHTML = `<div class="screen end ${t.result}"><div class="card panel">
        <h2>${p(r)}</h2><p>${p(`${r}.d`)}</p><p class="muted">${p(`era.${t.era}`)} · ${p("pause.time", { m: t.minutes })}</p>
        <button id="btn-fim-menu" class="big primary">${p("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${p("end.watch")}</button>
      </div></div>`;
    }
    const s = (r, l) => a.querySelectorAll(r).forEach((c) => c.onclick = () => l(c)), i = () => {
      try {
        localStorage.setItem(an, JSON.stringify({ rivals: this.rivals, diff: this.diff }));
      } catch {
      }
    };
    s("#btn-idioma-en", () => Ko("en")), s("#btn-idioma-pt", () => Ko("pt")), s("#btn-continuar", () => this.act.cont()), s("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), s("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.render());
    }), s("[data-rivais]", (r) => {
      this.rivals = Number(r.dataset.rivais), i(), this.render();
    }), s("[data-dificuldade]", (r) => {
      this.diff = Number(r.dataset.dificuldade), i(), this.render();
    }), s("#btn-comecar", () => this.act.start(this.rivals, this.diff)), s("#btn-voltar-jogo", () => this.act.resume()), s("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const r = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = r, this.render());
    }), s("#btn-entrar-conta", () => this.act.login()), s("#btn-entrar-conta-pausa", () => this.act.loginPause()), s("#btn-perfil-conta-pausa", () => this.act.profile()), s("#btn-perfil-conta", () => this.act.profile()), s("[data-qualidade]", (r) => {
      const l = Ca.findIndex((c) => c.key === r.dataset.qualidade);
      l >= 0 && (this.screen?.k === "pause" || this.screen?.k === "guest" || this.screen?.k === "online") && (this.screen.quality = l, this.act.quality(l), this.render());
    }), s("#btn-entrar-amigo", () => {
      this.screen?.k === "start" && (this.screen.step = "amigo", this.amigoMsg = "", this.amigoBusy = !1, this.render());
    }), s("#btn-entrar-codigo", () => {
      Ee.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
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
      Ee.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
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
      const r = en(o.value);
      o.value !== r && (o.value = r), this.codigoPartida = r, this.setPartidaMsg(this.partidaBusy ? this.partidaMsg : "", this.partidaBusy);
    }, o.onkeydown = (r) => {
      r.key === "Enter" && Ee.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    });
    const n = a.querySelector("#codigo-amigo");
    n && (n.oninput = () => {
      const r = en(n.value);
      n.value !== r && (n.value = r), this.codigo = r, this.setAmigoMsg(this.amigoBusy ? this.amigoMsg : "", this.amigoBusy);
    }, n.onkeydown = (r) => {
      r.key === "Enter" && Ee.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }, this.amigoBusy || setTimeout(() => n.focus({ preventScroll: !0 }), 50)), s("#btn-ajuda-pausa", () => this.act.help()), s("#btn-som-inicio", () => {
      G.toggleMute(), this.render();
    }), s("[data-musica]", (r) => {
      G.setOpts({ music: Number(r.dataset.musica), muted: !1 }), this.render();
    }), s("[data-efeitos]", (r) => {
      G.setOpts({ sfx: Number(r.dataset.efeitos), muted: !1 }), this.render();
    }), s("[data-ambiente]", (r) => {
      G.setOpts({ amb: Number(r.dataset.ambiente), muted: !1 }), this.render();
    }), s("#btn-sair", () => this.act.quit()), s("#btn-fim-menu", () => this.act.toMenu()), s("#btn-continuar-olhando", () => this.act.watch()), a.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function bh(e, t, a, s) {
  const i = a.filter((h) => e.isUnit(h) && e.owner[h] === t), o = i.filter((h) => e.kind[h] === ut.villager), n = i.filter((h) => e.kind[h] !== ut.villager), r = Math.round(s.x * 256), l = Math.round(s.z * 256), c = (h) => h.length ? [{ type: "move", player: t, ids: h, x: r, z: l }] : [];
  if (s.kind === "tile" && o.length) return { cmds: [{ type: "gather", player: t, ids: o, k: s.k }, ...c(n)], ping: "work" };
  if (s.kind === "building" && e.alive[s.e]) {
    const h = s.e;
    return e.owner[h] === t ? { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: h }] : [], ...c(n)], ping: o.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: i, target: h }], ping: "attack" };
  }
  if (s.kind === "unit" && e.alive[s.e]) {
    const h = s.e;
    if (e.kind[h] === kt) return { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: h }] : [], ...c(n)], ping: o.length ? "work" : "move" };
    if (e.owner[h] !== t && (e.owner[h] === zt || e.hostile(t, e.owner[h]))) return { cmds: [{ type: "attack", player: t, ids: i, target: h }], ping: "attack" };
  }
  return { cmds: c(i), ping: "move" };
}
const vh = (e, t) => {
  for (const a of t) if (e.isUnit(a) && e.kind[a] === ut.villager) return !0;
  return !1;
}, rr = 2, lr = [
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
  "foodMode"
], sn = /* @__PURE__ */ new WeakMap();
function yh(e) {
  let t = sn.get(e);
  if (t) return t;
  const a = En(e.map.seed, e.players.length, e.map.versao), s = a.size * a.size, i = new Uint8Array(s), o = new Int32Array(s);
  for (let n = 0; n < s; n++) a.tree[n] && (o[n] = a.wood[n] * 100);
  for (const n of a.res) {
    const r = n.z * a.size + n.x;
    i[r] = n.kind, o[r] = n.amount * 100;
  }
  return t = { tree: a.tree, kind: i, amt: o }, sn.set(e, t), t;
}
function kh(e) {
  const t = [];
  let a = 0, s = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i] ? 1 : 0;
    o === a ? s++ : (t.push(s), a = o, s = 1);
  }
  return t.push(s), t;
}
function on(e, t) {
  let a = 0, s = 0;
  for (const i of e)
    s && t.fill(1, a, a + i), a += i, s ^= 1;
}
function uo(e) {
  const t = yh(e), a = e.size, s = e.top, i = {};
  for (const h of lr) i[h] = Array.from(e[h].subarray(0, s));
  const o = [];
  for (let h = 0; h < s; h++) e.alive[h] && e.queue[h].length && o.push([h, e.queue[h].slice()]);
  const n = [], r = [], l = [];
  for (let h = 0; h < a * a; h++)
    t.tree[h] && !e.map.tree[h] && n.push(h), e.resAmt[h] !== t.amt[h] && r.push(h, e.resAmt[h]), e.resKind[h] !== t.kind[h] && l.push(h, e.resKind[h]);
  const c = e.players.find((h) => !h.ai) ?? e.players[0];
  return {
    v: rr,
    mapa: e.map.versao,
    seed: e.map.seed,
    players: e.players.length,
    humans: e.players.filter((h) => !h.ai).length,
    difficulty: e.difficulty,
    tick: e.tick,
    rng: e.rng.save(),
    top: s,
    ent: i,
    queue: o,
    P: e.players.map((h) => ({ res: { ...h.res }, era: h.era, aging: h.aging, agingB: h.agingB, hunger: h.hunger, defeated: h.defeated, lastAlert: h.lastAlert, ai: h.ai, tech: h.tech })),
    ai: e.ai.map((h) => ({ ...h })),
    barbNext: e.barbNext,
    barbWarned: e.barbWarned,
    outcome: e.outcome,
    ...e.times ? { times: e.times.slice(), vencedor: e.vencedor } : {},
    cut: n,
    amt: r,
    kindDiff: l,
    explored: e.explored.map(kh),
    projectiles: e.projectiles.map((h) => ({ ...h })),
    meta: { era: c.era, year: e.year, rivals: e.players.filter((h) => h.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600) }
  };
}
function Ha(e) {
  if (!e || e.v !== 1 && e.v !== rr) throw new Error("save version");
  const t = e.v === 1 ? 1 : e.mapa;
  if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > io) throw new Error("save version");
  const a = Array.isArray(e.times) && e.times.length === e.players && e.times.every((n) => Number.isInteger(n) && n >= 0 && n < 8) ? e.times : void 0, s = new ro(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty, mapa: t, times: a }), i = s.size, o = i * i;
  for (const n of lr) {
    const r = s[n];
    r.fill(n === "ignoreT" || n === "dropB" || n === "tgt" ? -1 : 0), e.ent[n] && r.set(e.ent[n]);
  }
  s.top = e.top;
  for (let n = 0; n < st; n++)
    s.queue[n] = [], s.field[n] = null, s.path[n] = null;
  for (const [n, r] of e.queue) s.queue[n] = r.slice();
  if (s.px.set(s.x), s.pz.set(s.z), !e.ent.foodMode)
    for (let n = 0; n < e.top; n++) s.alive[n] && s.kind[n] === xt + Vt.center && (s.hp[n] = Math.min(Et[Vt.center].hp, s.hp[n] * 2));
  for (const n of e.cut)
    s.map.tree[n] = 0, s.map.wood[n] = 0;
  for (let n = 0; n < e.amt.length; n += 2) s.resAmt[e.amt[n]] = e.amt[n + 1];
  for (let n = 0; n < e.kindDiff.length; n += 2) s.resKind[e.kindDiff[n]] = e.kindDiff[n + 1];
  for (let n = 0; n < o; n++) s.resKind[n] === ee && s.resAmt[n] <= 0 && (s.resKind[n] = 0, s.resAmt[n] = 0);
  for (let n = 0; n < o; n++) !s.map.tree[n] && !s.resKind[n] && (s.resAmt[n] = 0);
  s.bAt.fill(0);
  for (let n = 0; n < o; n++) s.blocked[n] = as(s.map.terrain[n]) || s.map.tree[n] || s.resKind[n] ? 1 : 0;
  for (let n = 0; n < s.top; n++) if (s.alive[n] && s.kind[n] >= xt) {
    const [r, l, c] = s.footprint(n), h = Et[s.kind[n] - xt].walk;
    for (let f = 0; f < c; f++) for (let d = 0; d < c; d++) {
      const u = (l + f) * i + r + d;
      s.bAt[u] = n + 1, h || (s.blocked[u] = 1);
    }
  }
  e.explored.forEach((n, r) => {
    s.explored[r].fill(0), on(n, s.explored[r]);
  }), e.P.forEach((n, r) => {
    const l = s.players[r];
    Object.assign(l.res, n.res), l.era = n.era, l.aging = n.aging, l.agingB = n.agingB, l.hunger = n.hunger, l.defeated = n.defeated, l.lastAlert = n.lastAlert, l.ai = n.ai, l.tech = n.tech ?? 0;
  }), s.ai = e.ai.map((n) => ({ ...n })), s.barbNext = e.barbNext, s.barbWarned = e.barbWarned, s.outcome = e.outcome, a && Number.isInteger(e.vencedor) && (s.vencedor = e.vencedor), s.tick = e.tick, s.rng.load(e.rng), s.projectiles = e.projectiles.map((n) => ({ ...n })), s.events.length = 0;
  for (let n = 0; n < s.top; n++) s.alive[n] && s.state[n] === Xt && (s.task[n] === Lt ? s.goPoint(n, s.slotX[n], s.slotZ[n]) : s.state[n] = Bt);
  return s.updateFog(), e.explored.forEach((n, r) => {
    s.explored[r].fill(0), on(n, s.explored[r]);
  }), s;
}
const nn = "origines_save_v1", Vs = "origines_save_meta_v1", ka = (e) => e ? `${nn}@${e}` : nn, ls = (e) => e ? `${Vs}@${e}` : Vs;
function cr(e, t) {
  try {
    return localStorage.setItem(ka(t), JSON.stringify(e)), localStorage.setItem(ls(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function rn(e, t) {
  const a = uo(e);
  return a.meta.savedAt = Date.now(), { d: a, ok: cr(a, t) };
}
function xh(e, t) {
  cr(e, t);
}
function ts(e) {
  try {
    const t = localStorage.getItem(ls(e));
    return t && localStorage.getItem(ka(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function Mh(e) {
  try {
    const t = localStorage.getItem(ka(e));
    return t ? Ha(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function fo(e) {
  try {
    localStorage.removeItem(ka(e)), localStorage.removeItem(ls(e));
  } catch {
  }
}
function po(e, t) {
  if (e !== t)
    try {
      const a = localStorage.getItem(ka(e)), s = localStorage.getItem(ls(e));
      if (!a || !s) return;
      localStorage.setItem(ka(t), a), localStorage.setItem(ls(t), s), fo(e);
    } catch {
    }
}
function zh(e) {
  try {
    const t = localStorage.getItem(ka(e));
    if (!t) return null;
    const a = JSON.parse(t);
    return { seed: a.seed, tick: a.tick };
  } catch {
    return null;
  }
}
const hr = "origines_save_contas_v1", Ah = () => {
  try {
    return localStorage.getItem(hr) === "1";
  } catch {
    return !0;
  }
}, Th = () => {
  try {
    localStorage.setItem(hr, "1");
  } catch {
  }
};
function $h() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const a = localStorage.key(t);
      if (!a || !a.startsWith(Vs + "@")) continue;
      const s = a.slice(Vs.length + 1), i = ts(s);
      i && e.push({ dono: s, meta: i });
    }
  } catch {
  }
  return e.sort((t, a) => (a.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const mo = "/api/origines/save", dr = !location.pathname.startsWith("/jogar/");
let fe = null, We = null, ur = dr;
const fr = [], cs = () => fr.forEach((e) => e()), oi = () => ur ? !fe || !We ? "off" : We : "loading", wh = (e) => {
  fr.push(e);
}, xa = () => !!We?.logado, Ge = () => We?.logado ? We.apelido ?? "" : "";
async function Sh() {
  if (!dr) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, a) => {
        const s = document.createElement("script");
        s.src = "/conta.js?v=2", s.onload = () => t(), s.onerror = () => a(new Error("conta")), document.head.appendChild(s);
      }), fe = e.QGConta ?? null, fe && (We = await fe.me(), fe.aoMudar((t) => {
        We = t, cs();
      }));
    } catch {
      fe = null, We = null;
    }
    ur = !0, cs();
  }
}
async function ea() {
  if (!fe) return;
  const e = Ge();
  try {
    const t = await fe.me();
    t && (We = t);
  } catch {
  }
  Ge() !== e && cs();
}
const ln = async () => {
  fe && (await fe.entrar(), await ea(), cs());
};
async function Ch() {
  fe && (await fe.perfil(), await ea(), xa() || (await fe.entrar({ aba: "entrar" }), await ea()), cs());
}
async function Eh() {
  if (!xa()) return null;
  try {
    const e = await fetch(mo, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function pr() {
  if (!xa()) return null;
  try {
    const e = await fetch(`${mo}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const mr = (e, t = !1) => fetch(mo, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function cn(e, t, a = !1) {
  if (a || await ea(), !xa()) return "none";
  if (!t || Ge() !== t) return "other";
  try {
    const s = { dados: e };
    return a && JSON.stringify(s).length > 6e4 && (a = !1), (await mr(s, a)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function Ph(e) {
  if (await ea(), !(!e || Ge() !== e))
    try {
      await mr({ apagar: !0 });
    } catch {
    }
}
const Ih = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), gr = ["move", "amove", "gather", "work", "attack", "build", "train", "cancel", "ageup", "rally", "stop", "food", "research", "trade", "wall", "ia"], ca = 400, Oh = 40, Bh = 600, Ja = (e) => typeof e == "number" && Number.isInteger(e) && Math.abs(e) <= 2 ** 32;
function _i(e) {
  const t = [gr.indexOf(e.type), e.player], a = (s) => {
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
      a(e.ids), t.push(Vt[e.key], e.tx, e.tz);
      break;
    case "train":
      t.push(e.building, ut[e.key]);
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
      t.push(e.building, js[e.key]);
      break;
    case "trade":
      t.push(e.building, ta.indexOf(e.give), ta.indexOf(e.get));
      break;
    case "wall":
      a(e.ids), a(e.tiles);
      break;
  }
  return t;
}
function br(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Bh || !e.every(Ja)) return null;
  const t = e;
  let a = 2, s = !0;
  const i = () => a >= t.length ? (s = !1, 0) : t[a++], o = (h) => {
    const f = i();
    if (f < 0 || f > h || a + f > t.length)
      return s = !1, [];
    const d = t.slice(a, a + f);
    return a += f, d;
  }, n = (h, f) => {
    const d = h[f];
    return d || (s = !1), d?.key ?? "";
  }, r = gr[t[0]], l = t[1];
  let c = null;
  switch (r) {
    case "move":
    case "amove": {
      const h = o(ca);
      c = { type: r, player: l, ids: h, x: i(), z: i() };
      break;
    }
    case "gather": {
      const h = o(ca);
      c = { type: "gather", player: l, ids: h, k: i() };
      break;
    }
    case "work":
    case "attack": {
      const h = o(ca);
      c = { type: r, player: l, ids: h, target: i() };
      break;
    }
    case "build": {
      const h = o(ca);
      c = { type: "build", player: l, ids: h, key: n(Et, i()), tx: i(), tz: i() };
      break;
    }
    case "train": {
      const h = i();
      c = { type: "train", player: l, building: h, key: n(_, i()) };
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
      c = { type: "stop", player: l, ids: o(ca) };
      break;
    case "food": {
      const h = o(ca), f = i();
      f !== 0 && f !== 1 && (s = !1), c = { type: "food", player: l, ids: h, on: f === 1 };
      break;
    }
    case "research": {
      const h = i();
      c = { type: "research", player: l, building: h, key: n(Qe, i()) };
      break;
    }
    case "trade": {
      const h = i(), f = ta[i()], d = ta[i()];
      (!f || !d) && (s = !1), c = { type: "trade", player: l, building: h, give: f, get: d };
      break;
    }
    case "wall": {
      const h = o(ca);
      c = { type: "wall", player: l, ids: h, tiles: o(Oh) };
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
class vr {
  constructor() {
    m(this, "ordens", []);
    m(this, "marcas", []);
    m(this, "avisado", 0);
  }
  /** começa (ou recomeça, depois de mandar o jogo ao amigo) a partir deste mundo */
  ligar(t) {
    this.ordens = [], this.marcas = [], this.avisado = t.tick, t.onApplied = (a, s) => {
      for (const i of s) this.ordens.push([a, ..._i(i)]);
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
    let o = br(a);
    return !o || o.type === "ia" || (o.player = s, i && (o = i(o), !o)) ? null : (t.issue(o, !0), o);
  }
}
class yr {
  constructor() {
    /** pode simular até este passo (o anfitrião já avisou tudo o que aconteceu antes dele) */
    m(this, "ate", 0);
    /** a impressão digital deu diferente: precisa pedir o jogo de novo */
    m(this, "divergiu", !1);
    m(this, "marcas", /* @__PURE__ */ new Map());
  }
  /** começa a partir do mundo que veio do anfitrião */
  ligar(t) {
    this.ate = t.tick, this.marcas.clear(), this.divergiu = !1;
  }
  /** um turno do anfitrião: agenda as ordens nos passos certos. false se a mensagem não é um turno válido */
  receber(t, a) {
    if (!Array.isArray(a) || a.length !== 3 || !Ja(a[0]) || !Array.isArray(a[1]) || !Array.isArray(a[2])) return !1;
    const [s, i, o] = a;
    if (s < this.ate) return !1;
    for (const n of o) {
      if (!Array.isArray(n) || !Ja(n[0]) || n[0] < t.tick) continue;
      const r = br(n.slice(1));
      r && t.schedule(r, n[0]);
    }
    for (const n of i) Array.isArray(n) && Ja(n[0]) && Ja(n[1]) && this.marcas.set(n[0], n[1]);
    return this.ate = s, !0;
  }
  /** depois de cada passo: confere a impressão digital, se o anfitrião mandou uma para este passo */
  depoisDoPasso(t) {
    const a = this.marcas.get(t.tick);
    a !== void 0 && (this.marcas.delete(t.tick), a !== t.hash() && (this.divergiu = !0));
  }
}
const kr = new URLSearchParams(location.search), xr = (kr.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`) + "/partida", Mr = xr.replace(/^ws/, "http"), qh = !location.pathname.startsWith("/jogar/") && !kr.get("online"), he = (e, t = 0) => typeof e == "number" && Number.isInteger(e) ? e : t, ki = (e) => Array.isArray(e) ? e.filter((t) => typeof t == "number" && Number.isInteger(t)) : [], hn = (e) => Array.isArray(e) ? e.slice(0, 4).map((t) => typeof t == "string" ? t.slice(0, 40) : "") : [];
let Nh = null;
function Rh() {
  return qh ? Promise.resolve(!1) : Nh ?? (Nh = fetch(Mr + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class hs {
  constructor(t, a) {
    m(this, "codigo", "");
    m(this, "ws", null);
    m(this, "fechado", !1);
    m(this, "caiuEm", 0);
    this.criar = t, this.on = a;
  }
  /** quem cria: pede um código ao servidor e entra na sala */
  static async nova(t) {
    const a = await fetch(Mr + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!a.ok) throw new Error(a.status === 401 ? "conta" : "rede");
    const { codigo: s } = await a.json();
    if (!Ee.test(s)) throw new Error("rede");
    const i = new hs(!0, t);
    return i.codigo = s, i.abrir(), i;
  }
  /** quem entra com o código */
  static entrar(t, a) {
    const s = new hs(!1, a);
    return s.codigo = t, s.abrir(), s;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${xr}/sala/${this.codigo}?modo=${this.criar ? "criar" : "entrar"}&v=${ns}`);
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
        this.on({ t: "sala", sala: { codigo: this.codigo, modo: he(a.modo, 1), dif: he(a.dif, 1), vagas: hn(a.vagas), criador: he(a.criador), eu: he(a.eu, -1) } });
        break;
      case "comeca":
        this.on({ t: "comeca", c: { semente: he(a.semente), modo: he(a.modo, 1), dif: he(a.dif, 1), vagas: hn(a.vagas), eu: he(a.eu, -1), anf: he(a.anf), fora: ki(a.fora), volta: a.volta === !0 } });
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
        this.on({ t: "ordem", v: he(a.v, -1), d: a.d });
        break;
      case "r":
        this.on({ t: "pede", v: he(a.v, -1) });
        break;
      case "sinal": {
        const s = ki(a.d);
        s.length === 4 && this.on({ t: "sinal", v: s[0], tipo: s[1], x: s[2], z: s[3] });
        break;
      }
      case "caiu":
      case "voltou":
      case "saiu":
        this.on({ t: a.t, v: he(a.v, -1) });
        break;
      case "anfitriao":
        this.on({ t: "anfitriao", v: he(a.v, -1), fora: ki(a.fora) });
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
    this.enviar(`{"t":"s","v":${ns},"d":${t}}`);
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
const dn = /* @__PURE__ */ new WeakMap();
function go(e) {
  let t = dn.get(e);
  if (!t) {
    const a = e.sampleRate * 2, s = e.createBuffer(1, a, e.sampleRate), i = s.getChannelData(0);
    let o = 22222;
    for (let n = 0; n < a; n++)
      o = o * 16807 % 2147483647, i[n] = o / 10737418235e-1 - 1;
    t = { noise: s, pluck: /* @__PURE__ */ new Map() }, dn.set(e, t);
  }
  return t;
}
function qa(e, t, a) {
  const s = e.createBufferSource();
  return s.buffer = go(e).noise, s.loop = !0, s.start(t, t * 7.31 % 1.5), s.stop(t + a + 0.05), s;
}
function Ot(e, t, a, s, i, o = 0) {
  const n = e.createGain(), r = Math.max(2e-4, a);
  return n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + s), o && n.gain.setValueAtTime(r, t + s + o), n.gain.exponentialRampToValueAtTime(1e-4, t + s + o + i), n;
}
function te(e, t, a, s = 1) {
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
function Mt(e, t, a, s, i, o, n, r, l = 4e-3) {
  const c = Dt(e, s, i, a, n);
  c.frequency.exponentialRampToValueAtTime(Math.max(20, o), a + n), $t(c, Ot(e, a, r, l, n), t);
}
function ht(e, t, a, s, i, o, n, r, l = 3e-3) {
  $t(qa(e, a, n + l), te(e, s, i, o), Ot(e, a, r, l, n), t);
}
function xi(e, t, a, s, i) {
  const o = qa(e, a, i.dur), n = te(e, "bandpass", i.f, 3), r = e.createGain(), l = Dt(e, "sine", i.lfo[0], a, i.dur), c = e.createGain();
  return l.frequency.linearRampToValueAtTime(i.lfo[1], a + i.dur * 0.9), c.gain.value = 0.5, r.gain.value = 0.5, l.connect(c).connect(r.gain), $t(o, n, r, Ot(e, a, 0.1 * s, i.dur * 0.22, i.dur * 0.73), t), ht(e, t, a + i.snapAt, "bandpass", i.snapF, 2, 0.03, (i.snap ?? 0.08) * s), Math.max(i.dur, i.snapAt + 0.06);
}
function de(e, t, a, s, i, o = [1, 2.4, 3.6, 5.1], n = 1.6) {
  o.forEach((r, l) => $t(Dt(e, "sine", s * r, a, n), Ot(e, a, i / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function Fh(e, t, a, s, i, o) {
  const n = Dt(e, "sine", s, a, o), r = Dt(e, "sine", s * 1.4, a, o), l = e.createGain();
  l.gain.setValueAtTime(s * 1.6, a), l.gain.exponentialRampToValueAtTime(s * 0.1, a + o), r.connect(l).connect(n.frequency), $t(n, Ot(e, a, i, 2e-3, o), t);
  for (const [c, h] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const f of [1, 1.007]) $t(Dt(e, "sine", s * c * f, a, o * 0.7), Ot(e, a, i * h * 0.5, 2e-3, o * (0.7 - c * 0.04)), t);
}
function Lh(e, t) {
  const a = Math.round(t * 10), s = go(e);
  let i = s.pluck.get(a);
  if (i) return i;
  const o = e.sampleRate, n = Math.floor(o * 1.8), r = Math.max(2, Math.round(o / t));
  i = e.createBuffer(1, n, o);
  const l = i.getChannelData(0), c = new Float32Array(r);
  let h = a * 7 + 1;
  for (let f = 0; f < r; f++)
    h = h * 16807 % 2147483647, c[f] = (h / 10737418235e-1 - 1) * 0.6;
  for (let f = 0, d = 0; f < n; f++) {
    const u = c[d], g = c[(d + 1) % r];
    c[d] = 0.996 * 0.5 * (u + g), l[f] = u, d = (d + 1) % r;
  }
  return s.pluck.set(a, i), i;
}
function jh(e, t, a, s, i, o = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = Lh(e, s), r.start(a), r.stop(a + n), $t(r, te(e, "lowpass", o, 0.7), Ot(e, a, i, 2e-3, n), t);
}
function Me(e, t, a, s, i, o, n, r, l = "sawtooth") {
  const c = e.createOscillator();
  c.type = l, c.frequency.setValueAtTime(i[0][1], a);
  for (const [u, g] of i.slice(1)) c.frequency.linearRampToValueAtTime(g, a + u);
  const h = e.createOscillator(), f = e.createGain();
  h.frequency.value = n[0], f.gain.value = n[1], h.connect(f).connect(c.frequency), c.start(a), c.stop(a + s + 0.05), h.start(a), h.stop(a + s + 0.05);
  const d = Ot(e, a, r, Math.min(0.05, s * 0.2), s * 0.8, s * 0.1);
  for (const [u, g] of o) {
    const b = e.createGain();
    b.gain.value = g, $t(c, te(e, "bandpass", u, 6), b, d);
  }
  d.connect(t);
}
function Ps(e) {
  const t = e.createBufferSource();
  return t.buffer = go(e).noise, t.loop = !0, t.start(), t;
}
function Wi(e, t, a, s, i) {
  const o = 3 + i % 4, n = 2600 + i * 137 % 1600;
  for (let r = 0; r < o; r++) {
    const l = a + r * (0.07 + (i + r) % 3 * 0.02), c = n * (1 + (i * (r + 3) % 7 - 3) * 0.06), h = Dt(e, "sine", c, l, 0.07);
    h.frequency.exponentialRampToValueAtTime(c * (r % 2 ? 0.8 : 1.35), l + 0.06), $t(h, Ot(e, l, 0.05 * s, 0.01, 0.05), t);
  }
  return o * 0.1;
}
const ve = {
  // interface
  "ui.click": (e, t, a, s) => (Mt(e, t, a, "sine", 700, 420, 0.05, 0.2 * s), ht(e, t, a, "bandpass", 2400, 2, 0.025, 0.06 * s), 0.08),
  "ui.denied": (e, t, a, s) => {
    const i = Dt(e, "sine", 240, a, 0.15);
    return i.frequency.exponentialRampToValueAtTime(170, a + 0.14), $t(i, te(e, "lowpass", 900), Ot(e, a, 0.16 * s, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, a, s) => (Mt(e, t, a, "triangle", 560, 480, 0.05, 0.12 * s), Mt(e, t, a + 0.07, "triangle", 700, 600, 0.05, 0.1 * s), 0.14),
  "sel.soldier": (e, t, a, s) => (Mt(e, t, a, "sine", 180, 90, 0.12, 0.24 * s), ht(e, t, a, "lowpass", 600, 1, 0.04, 0.1 * s), 0.14),
  "sel.building": (e, t, a, s) => (Mt(e, t, a, "sine", 300, 220, 0.08, 0.18 * s), Mt(e, t, a + 0.09, "sine", 300, 220, 0.08, 0.13 * s), 0.2),
  "order.move": (e, t, a, s) => (ht(e, t, a, "lowpass", 500, 1, 0.05, 0.13 * s), ht(e, t, a + 0.11, "lowpass", 450, 1, 0.05, 0.11 * s), 0.18),
  "order.work": (e, t, a, s) => (ht(e, t, a, "bandpass", 2600, 3, 0.03, 0.12 * s), Mt(e, t, a, "sine", 1500, 1300, 0.02, 0.05 * s), 0.05),
  "order.attack": (e, t, a, s) => (Mt(e, t, a, "sine", 150, 70, 0.18, 0.28 * s), ht(e, t, a, "lowpass", 800, 1, 0.05, 0.1 * s), 0.2),
  place: (e, t, a, s) => (Mt(e, t, a, "sine", 190, 85, 0.2, 0.3 * s), ht(e, t, a, "lowpass", 400, 1, 0.08, 0.12 * s), 0.22),
  "place.bad": (e, t, a, s) => {
    const i = Dt(e, "triangle", 170, a, 0.17);
    return i.frequency.exponentialRampToValueAtTime(120, a + 0.16), $t(i, te(e, "lowpass", 900), Ot(e, a, 0.18 * s, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, a, s) => (de(e, t, a, 880, 0.14 * s, [1, 1.5], 0.35), 0.4),
  built: (e, t, a, s) => (Mt(e, t, a, "sine", 180, 100, 0.14, 0.2 * s), Mt(e, t, a + 0.12, "sine", 150, 90, 0.14, 0.18 * s), de(e, t, a + 0.26, 1046, 0.09 * s, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, a, s) => (de(e, t, a, 660, 0.15 * s, [1, 2, 2.76, 4.07], 1.6), de(e, t, a + 0.18, 990, 0.1 * s, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, a, s) => ([880, 1108, 1320].forEach((i, o) => de(e, t, a + o * 0.11, i, 0.09 * s, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, a, s) => {
    const i = Ot(e, a, 0.2 * s, 0.18, 0.4, 0.9), o = te(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = Dt(e, "sawtooth", n, a, 1.6), c = e.createGain();
      c.gain.value = r, $t(l, c, o);
    }
    return $t(o, i, t), 1.6;
  },
  "drums.war": (e, t, a, s) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((i, o) => {
    Mt(e, t, a + i, "sine", 95, 55, 0.3, (0.12 + o * 0.025) * s), ht(e, t, a + i, "lowpass", 300, 1, 0.05, 0.06 * s);
  }), 2.9),
  gong: (e, t, a, s) => (de(e, t, a, 110, 0.22 * s, [1, 1.44, 2.05, 2.84, 3.82], 3), ht(e, t, a, "lowpass", 2e3, 1, 0.05, 0.08 * s), 3),
  winter: (e, t, a, s) => {
    const i = qa(e, a, 1.8), o = te(e, "lowpass", 300, 0.8);
    return o.frequency.linearRampToValueAtTime(900, a + 0.8), o.frequency.linearRampToValueAtTime(300, a + 1.7), $t(i, o, Ot(e, a, 0.1 * s, 0.5, 1.2), t), de(e, t, a + 0.3, 520, 0.1 * s, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, a, s) => {
    for (let i = 0; i < 5; i++) Wi(e, t, a + i * 0.22, s * 1.6, 3 + i * 5);
    return 1.6;
  },
  hunger: (e, t, a, s) => ($t(Dt(e, "sine", 98, a, 1.1), Ot(e, a, 0.1 * s, 0.1, 0.9), t), $t(Dt(e, "sine", 147, a, 1.1), Ot(e, a, 0.06 * s, 0.1, 0.9), t), 1.1),
  soft: (e, t, a, s) => (de(e, t, a, 784, 0.07 * s, [1, 2], 0.5), 0.5),
  fair: (e, t, a, s) => {
    [587, 740, 880, 988, 880].forEach((i, o) => ds(e, t, a + o * 0.14, i, 0.13, 0.1 * s));
    for (let i = 0; i < 4; i++) Ks(e, t, a + i * 0.18, 0.5 * s);
    return 0.9;
  },
  // trabalho
  "work.chop": (e, t, a, s) => (ht(e, t, a, "bandpass", 1100, 1.5, 0.05, 0.28 * s), Mt(e, t, a, "sine", 260, 170, 0.06, 0.18 * s), 0.08),
  "work.pick": (e, t, a, s) => (de(e, t, a, 2100, 0.1 * s, [1, 1.45], 0.09), ht(e, t, a, "highpass", 3e3, 1, 0.015, 0.06 * s), 0.1),
  "work.pickMetal": (e, t, a, s) => (de(e, t, a, 2600, 0.09 * s, [1, 1.5, 2.04], 0.2), ht(e, t, a, "highpass", 3e3, 1, 0.012, 0.05 * s), 0.2),
  "work.hoe": (e, t, a, s) => (ht(e, t, a, "lowpass", 350, 1, 0.09, 0.22 * s), Mt(e, t, a, "sine", 120, 80, 0.08, 0.12 * s), 0.1),
  "work.mallet": (e, t, a, s) => (Mt(e, t, a, "sine", 330, 240, 0.07, 0.22 * s), ht(e, t, a, "bandpass", 900, 1.5, 0.04, 0.1 * s), 0.08),
  "work.rustle": (e, t, a, s) => {
    for (const i of [0, 0.07, 0.15]) ht(e, t, a + i, "bandpass", 4e3, 1, 0.05, 0.06 * s);
    return 0.22;
  },
  "drop.wood": (e, t, a, s) => (Mt(e, t, a, "sine", 160, 110, 0.12, 0.2 * s), ht(e, t, a, "lowpass", 500, 1, 0.06, 0.1 * s), 0.14),
  "drop.stone": (e, t, a, s) => {
    for (let i = 0; i < 4; i++) ht(e, t, a + i * 0.035, "bandpass", 1500 + i * 200, 2, 0.03, 0.08 * s);
    return 0.18;
  },
  "drop.food": (e, t, a, s) => {
    for (const i of [0, 0.06]) ht(e, t, a + i, "bandpass", 2e3, 1, 0.06, 0.07 * s);
    return 0.14;
  },
  "drop.metal": (e, t, a, s) => (de(e, t, a, 2600, 0.07 * s, [1, 1.5], 0.15), de(e, t, a + 0.07, 2900, 0.06 * s, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, a, s) => {
    const i = Dt(e, "sawtooth", 90, a, 0.45);
    return i.frequency.linearRampToValueAtTime(70, a + 0.45), $t(i, te(e, "bandpass", 400, 4), Ot(e, a, 0.05 * s, 0.05, 0.4), t), ht(e, t, a + 0.4, "lowpass", 700, 1, 0.7, 0.18 * s, 0.01), Mt(e, t, a + 0.4, "sine", 70, 45, 0.4, 0.16 * s), 1.2;
  },
  "res.crumble": (e, t, a, s) => {
    for (let i = 0; i < 5; i++) ht(e, t, a + i * 0.09, "lowpass", 900, 1, 0.08, (0.14 - i * 0.02) * s);
    return 0.55;
  },
  puff: (e, t, a, s) => (ht(e, t, a, "lowpass", 600, 0.7, 0.3, 0.15 * s, 0.02), Mt(e, t, a, "sine", 150, 100, 0.12, 0.05 * s), 0.34),
  "fall.animal": (e, t, a, s) => (Mt(e, t, a, "sine", 95, 50, 0.25, 0.22 * s), ht(e, t, a + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * s, 0.02), 0.4),
  crash: (e, t, a, s) => {
    ht(e, t, a, "lowpass", 1200, 0.8, 1.1, 0.26 * s, 0.01);
    for (const i of [0, 0.18, 0.36]) Mt(e, t, a + i, "sine", 80, 45, 0.25, 0.18 * s);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, a, s) => (Mt(e, t, a, "sine", 320, 210, 0.07, 0.26 * s), ht(e, t, a, "bandpass", 1600, 1.5, 0.04, 0.1 * s), 0.08),
  "hit.axe": (e, t, a, s) => (ht(e, t, a, "bandpass", 1e3, 2, 0.06, 0.26 * s), Mt(e, t, a, "sine", 240, 160, 0.06, 0.16 * s), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, a, s) => (Fh(e, t, a, 1250, 0.07 * s, 0.55), ht(e, t, a, "highpass", 4500, 0.8, 0.05, 0.09 * s), Mt(e, t, a, "sine", 260, 170, 0.05, 0.1 * s), 0.55),
  "hit.spear": (e, t, a, s) => {
    const i = qa(e, a, 0.12), o = te(e, "bandpass", 2200, 2);
    return o.frequency.exponentialRampToValueAtTime(900, a + 0.1), $t(i, o, Ot(e, a, 0.12 * s, 0.01, 0.1), t), Mt(e, t, a + 0.08, "sine", 400, 300, 0.03, 0.08 * s), 0.13;
  },
  "hit.wall": (e, t, a, s) => (Mt(e, t, a, "sine", 200, 130, 0.09, 0.24 * s), ht(e, t, a, "lowpass", 700, 1, 0.05, 0.12 * s), 0.1),
  "hit.bite": (e, t, a, s) => (ht(e, t, a, "bandpass", 1500, 2, 0.04, 0.12 * s), Mt(e, t, a, "sine", 500, 300, 0.05, 0.08 * s), Me(e, t, a, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * s), 0.2),
  "hit.boar": (e, t, a, s) => (Me(e, t, a, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * s), Me(e, t, a + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * s), Mt(e, t, a, "sine", 120, 70, 0.12, 0.12 * s), 0.25),
  "hit.aurochs": (e, t, a, s) => (Mt(e, t, a, "sine", 100, 55, 0.2, 0.2 * s), ht(e, t, a, "bandpass", 700, 1.5, 0.12, 0.08 * s), 0.22),
  throw: (e, t, a, s) => {
    const i = qa(e, a, 0.36), o = te(e, "bandpass", 500, 1.2);
    return o.frequency.exponentialRampToValueAtTime(1600, a + 0.15), o.frequency.exponentialRampToValueAtTime(700, a + 0.34), $t(i, o, Ot(e, a, 0.1 * s, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, a, s) => xi(e, t, a, s, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, a, s) => xi(e, t, a, s, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, a, s) => xi(e, t, a, s, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  "arrow.hit": (e, t, a, s) => (Mt(e, t, a, "sine", 420, 260, 0.04, 0.16 * s), ht(e, t, a, "bandpass", 2200, 2, 0.03, 0.08 * s), 0.06),
  "spear.hit": (e, t, a, s) => (Mt(e, t, a, "sine", 300, 180, 0.06, 0.2 * s), ht(e, t, a, "bandpass", 1500, 2, 0.04, 0.08 * s), 0.08),
  "stone.hit": (e, t, a, s) => (ht(e, t, a, "bandpass", 2600, 4, 0.03, 0.16 * s), Mt(e, t, a, "sine", 950, 800, 0.02, 0.06 * s), 0.05),
  "ram.boom": (e, t, a, s) => (Mt(e, t, a, "sine", 72, 42, 0.55, 0.42 * s), ht(e, t, a, "lowpass", 350, 1, 0.4, 0.24 * s), ht(e, t, a + 0.02, "bandpass", 900, 2, 0.08, 0.08 * s), 0.6),
  "ram.creak": (e, t, a, s) => {
    const i = Dt(e, "sawtooth", 140, a, 0.3);
    return i.frequency.linearRampToValueAtTime(120, a + 0.3), $t(i, te(e, "bandpass", 600, 5), Ot(e, a, 0.03 * s, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, a, s) => (Me(e, t, a, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * s), 0.7),
  "animal.horse": (e, t, a, s) => (Me(e, t, a, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * s), 0.9),
  "animal.dog": (e, t, a, s) => {
    for (const i of [0, 0.16]) Me(e, t, a + i, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * s);
    return 0.28;
  },
  "animal.wolf": (e, t, a, s) => (Me(e, t, a, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * s), 0.45),
  "animal.howl": (e, t, a, s) => {
    for (const [i, o] of [[0, 1], [0.28, 0.3]]) {
      const n = Dt(e, "sine", 420, a + i, 1.6);
      n.frequency.linearRampToValueAtTime(620, a + i + 0.6), n.frequency.linearRampToValueAtTime(540, a + i + 1.5), $t(n, te(e, "lowpass", 1200), Ot(e, a + i, 0.05 * s * o, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, a, s) => (Me(e, t, a, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * s), Me(e, t, a + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * s), 0.28),
  "animal.aurochs": (e, t, a, s) => (Me(e, t, a, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * s), 1),
  "animal.deer": (e, t, a, s) => (ht(e, t, a, "bandpass", 1200, 2, 0.12, 0.07 * s), ht(e, t, a + 0.05, "bandpass", 600, 2, 0.1, 0.05 * s), 0.17),
  "animal.crow": (e, t, a, s) => {
    for (const i of [0, 0.3]) Me(e, t, a + i, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * s);
    return 0.5;
  },
  "animal.hooves": (e, t, a, s) => {
    for (const i of [0, 0.07, 0.2, 0.27])
      Mt(e, t, a + i, "sine", 180, 120, 0.04, 0.1 * s), ht(e, t, a + i, "lowpass", 900, 1, 0.02, 0.05 * s);
    return 0.32;
  },
  bird: (e, t, a, s) => Wi(e, t, a, s, 1 + Math.floor(a * 977 % 97))
}, Dh = {
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
for (const [e, t] of Object.entries(Dh)) {
  const a = ve[e];
  ve[e] = (s, i, o, n) => a(s, i, o, n * t);
}
function De(e, t, a, s, i) {
  Mt(e, t, a, "sine", s * 1.6, s, 0.4, 0.22 * i), ht(e, t, a, "lowpass", 400, 1, 0.05, 0.08 * i);
}
function ds(e, t, a, s, i, o, n = 0.22) {
  const r = Ot(e, a, 0.13 * o, 0.05, 0.14, Math.max(0, i - 0.08)), l = Dt(e, "sine", s, a, i + 0.3), c = Dt(e, "triangle", s * 2, a, i + 0.3), h = e.createGain();
  h.gain.value = n;
  const f = Dt(e, "sine", 5, a, i + 0.3), d = e.createGain();
  d.gain.setValueAtTime(0, a), d.gain.linearRampToValueAtTime(s * 6e-3, a + 0.2), f.connect(d), d.connect(l.frequency), d.connect(c.frequency), $t(l, r), $t(c, h, r), r.connect(t), $t(qa(e, a, i + 0.1), te(e, "bandpass", s * 2, 8), Ot(e, a, 0.02 * o, 0.03, 0.1, Math.max(0, i - 0.05)), t);
}
function Hh(e, t, a, s, i, o) {
  ds(e, t, a, s, i, o * 0.9, 0.05);
}
function Uh(e, t, a, s, i) {
  jh(e, t, a, s, 0.2 * i);
}
function _h(e, t, a, s, i) {
  $t(Dt(e, "sine", s, a, 0.4), Ot(e, a, 0.12 * i, 2e-3, 0.35), t), $t(Dt(e, "sine", s * 2.92, a, 0.2), Ot(e, a, 0.04 * i, 2e-3, 0.15), t), ht(e, t, a, "bandpass", 3e3, 3, 0.01, 0.03 * i);
}
function Gi(e, t, a, s, i) {
  de(e, t, a, s, 0.08 * i, [1, 2.4, 3.6, 5.1], 2);
}
function Vi(e, t, a, s, i, o) {
  const n = te(e, "lowpass", s * 3, 0.8);
  n.frequency.linearRampToValueAtTime(s * 6, a + 0.15), n.frequency.linearRampToValueAtTime(s * 4, a + i);
  for (const r of [1, 1.004]) $t(Dt(e, "sawtooth", s * r, a, i + 0.3), n);
  $t(n, Ot(e, a, 0.07 * o, 0.08, 0.2, Math.max(0, i - 0.1)), t);
}
function Wh(e, t, a, s, i, o) {
  const n = te(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.setValueAtTime(1e-4, a), r.gain.linearRampToValueAtTime(0.05 * o, a + 1.5), r.gain.setValueAtTime(0.05 * o, a + Math.max(1.5, i - 1.5)), r.gain.linearRampToValueAtTime(1e-4, a + i);
  for (const l of [1, 1.5]) $t(Dt(e, "sawtooth", s * l, a, i), n);
  $t(n, r, t);
}
function Ks(e, t, a, s) {
  ht(e, t, a, "highpass", 5e3, 1, 0.06, 0.05 * s, 5e-3);
}
const ne = (e) => 440 * Math.pow(2, (e - 69) / 12);
function zr(e, t, a, s, i) {
  const o = ne(s.m), n = s.d * i;
  switch (s.i) {
    case "drum":
      De(e, t, a, o, s.v);
      break;
    case "drumHi":
      De(e, t, a, o * 1.8, s.v * 0.8);
      break;
    case "flute":
      ds(e, t, a, o, n, s.v);
      break;
    case "ocarina":
      Hh(e, t, a, o, n, s.v);
      break;
    case "lyre":
      Uh(e, t, a, o, s.v);
      break;
    case "stones":
      _h(e, t, a, o, s.v);
      break;
    case "bells":
      Gi(e, t, a, o, s.v);
      break;
    case "horn":
      Vi(e, t, a, o, n, s.v);
      break;
    case "drone":
      Wh(e, t, a, o, n, s.v);
      break;
    case "shaker":
      Ks(e, t, a, s.v);
      break;
  }
}
const us = 62, Ki = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], Gh = [...Ki.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...Ki.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], Vh = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], Sa = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function Yi() {
  const e = [];
  let t = 0;
  const a = (s, i, o) => s.forEach((n, r) => {
    let l = 0;
    for (const [c, h] of n)
      e.push({ b: (t + r) * 4 + l, i, m: us + c, d: h, v: o }), l += h;
  });
  for (let s = 0; s < 4; s++, t += 8) {
    a(s === 2 ? Vh : s === 1 ? Gh : Ki, "flute", 1);
    for (let i = 0; i < 8; i++) {
      const o = (t + i) * 4;
      if (e.push({ b: o, i: "drum", m: 38, d: 1, v: 0.9 }, { b: o + 2, i: "drum", m: 43, d: 1, v: 0.6 }), s >= 2) {
        e.push({ b: o + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: o + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      s >= 1 && Sa[i].concat([Sa[i][2], Sa[i][1], Sa[i][2], Sa[i][1]]).forEach((n, r) => e.push({ b: o + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), s === 3 && e.push({ b: o, i: "bells", m: 74 + Sa[i][0], d: 2, v: 0.8 });
    }
    s === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([i, o]) => e.push({ b: t * 4 + i, i: "horn", m: o, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: us, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const Kh = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10]];
function Yh(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let a = Math.imul(t ^ t >>> 15, 1 | t);
    return a = a + Math.imul(a ^ a >>> 7, 61 | a) ^ a, ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
const un = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function Ar(e, t, a, s) {
  const i = Math.min(e, 2), o = Yh(s * 97 + i * 13 + t * 5), n = Kh[i], r = n.length, l = (q) => us + 12 * Math.floor(q / r) + n[(q % r + r) % r], c = t === 1, h = a === 3, f = Math.round([72, 80, 88][i] * (c ? 1.15 : 1) * (h ? 0.85 : a === 2 ? 0.93 : 1)), d = [], u = (q) => {
    const A = [];
    let T = q;
    for (let w = 0; w < 2; w++) {
      const S = un[Math.floor(o() * un.length)], O = [];
      for (const z of S)
        O.push([T, z]), T = Math.max(-2, Math.min(r + 3, T + [-2, -1, -1, 1, 1, 2, 0][Math.floor(o() * 7)]));
      A.push(O);
    }
    return A;
  }, g = u(Math.floor(o() * 3)), b = u(2 + Math.floor(o() * 3)), k = u(r), v = (q, A) => q.map((T) => T.map(([w, S]) => [w + A, S])), M = [[[2, 2], [1, 2]], [[0, 4]]], y = [...g, ...v(g, 1), ...b, ...M, ...g, ...v(g, -1), ...k, ...M, ...k, ...v(k, -1), ...b, ...M, ...g, ...b, ...g, ...M], $ = i === 0 ? "flute" : i === 1 ? "ocarina" : "flute";
  return y.forEach((q, A) => {
    let T = 0;
    const w = A * 4, S = !c && A % 8 === 7 && o() < 0.3;
    for (const [z, B] of q)
      !S && !(h && o() < 0.25) && d.push({ b: w + T, i: $, m: l(z) + (i === 0 ? 0 : 12 * (a === 1 ? 1 : 0)), d: B * 0.95, v: 0.85 }), T += B;
    const O = h ? 0.4 : c ? 1 : 0.7;
    if (i === 0) {
      if (d.push({ b: w, i: "drum", m: 38, d: 1, v: 0.9 }), o() < O && d.push({ b: w + 2, i: "drum", m: 43, d: 1, v: 0.6 }), c) for (let z = 0; z < 4; z++) d.push({ b: w + z + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      A % 4 === 3 && o() < O && d.push({ b: w + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: w + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (i === 1)
      A % 8 === 0 && d.push({ b: w, i: "drone", m: 38, d: 32, v: 0.9 }), (A % 2 === 0 || c) && d.push({ b: w, i: "drum", m: 38, d: 1, v: 0.7 }), o() < O && [0, 1.5, 3].forEach((z, B) => d.push({ b: w + z, i: "stones", m: l([0, 2, 4][B] + A % 2) - 12, d: 1, v: 0.6 }));
    else {
      const z = A % 8 < 4 ? 0 : A % 8 < 6 ? -2 : 5, B = [z, z + 7, z + 12, z + 16];
      o() < O + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((L, E) => d.push({ b: w + E * 0.5, i: "lyre", m: 50 + B[L], d: 0.5, v: 0.6 })), d.push({ b: w, i: "drum", m: 38, d: 1, v: 0.8 }), c && d.push({ b: w + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: w + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), A % 8 === 0 && d.push({ b: w, i: "bells", m: 74 + z, d: 2, v: 0.7 }), A % 8 === 6 && o() < 0.7 && d.push({ b: w, i: "horn", m: 45 + (o() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    }
  }), { bpm: f, beats: y.length * 4, notes: d };
}
class Xh {
  constructor() {
    m(this, "base", null);
    m(this, "tens", null);
    m(this, "batt", null);
    m(this, "queue", []);
    m(this, "qi", 0);
    m(this, "mode", "off");
    m(this, "pieceEnd", 0);
    m(this, "nextStart", 0);
    m(this, "pieceN", 0);
    m(this, "seed", 1);
    m(this, "tension", 0);
    m(this, "battle", 0);
    m(this, "layerT", 0);
    m(this, "getEra", () => 0);
    m(this, "getSeason", () => 0);
    G.ready(() => {
      const t = G.ctx, a = G.out("music");
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
    G.ctx && (this.clear(), this.enqueue(Yi(), G.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, a) {
    this.getEra = t, this.getSeason = a, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, G.ctx && (this.clear(), this.nextStart = G.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, a, s) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => s, this.pieceN = a, this.seed = 7, G.ctx && (this.clear(), this.nextStart = G.now + 0.5);
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
    const t = G.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, a) {
    const s = 60 / t.bpm;
    for (const i of t.notes) this.queue.push({ t: a + i.b * s, n: i, spb: s, out: "base" });
    this.queue.sort((i, o) => i.t - o.t), this.qi = 0, this.pieceEnd = a + t.beats * s;
  }
  tick() {
    if (!G.running || !this.base) return;
    const t = G.now, a = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(Yi(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const i = Ar(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(i, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < a; ) {
      const i = this.queue[this.qi++];
      i.t >= t - 0.05 && zr(G.ctx, this.base, Math.max(i.t, t), i.n, i.spb);
    }
    const s = G.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const i = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < a; ) {
        const o = this.layerT, n = Math.round(o / i % 4);
        this.tension > 0.02 && De(s, this.tens, o, ne(33), 0.8), this.battle > 0.02 && (De(s, this.batt, o, ne(n % 2 ? 43 : 38), 0.9), De(s, this.batt, o + i / 2, ne(48), 0.55), Ks(s, this.batt, o + i / 4, 0.8), Ks(s, this.batt, o + i * 0.75, 0.8)), this.layerT += i;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, a = 0) {
    const s = G.ctx, i = G.out("alert");
    if (!s || !i || !G.voice(3)) return;
    const o = s.currentTime + 0.05;
    if (G.duck(0.7, 3.5), t === "age") {
      for (let r = 0; r < 6; r++) De(s, i, o + r * 0.12, ne(38 + r % 2 * 5), 0.5 + r * 0.08);
      [0, 4, 7, 12].map((r) => us + r + (a >= 2 ? 0 : -12)).forEach((r, l) => a >= 2 ? Vi(s, i, o + 0.75 + l * 0.22, ne(r - 12), 0.3, 1.4) : ds(s, i, o + 0.75 + l * 0.2, ne(r + 12), 0.3, 1.2)), a >= 2 ? Gi(s, i, o + 1.6, ne(74), 1.2) : De(s, i, o + 1.6, ne(38), 1);
    } else if (t === "victory") {
      [0, 4, 7, 12, 7, 12].forEach((n, r) => Vi(s, i, o + r * 0.25, ne(50 + n), r === 5 ? 1.2 : 0.22, 1.3));
      for (let n = 0; n < 8; n++) De(s, i, o + n * 0.125, ne(38 + n % 2 * 5), 0.7);
      Gi(s, i, o + 1.3, ne(74), 1.3);
    } else
      [12, 10, 7, 5, 3, 0].forEach((n, r) => ds(s, i, o + r * 0.35, ne(us + n), r === 5 ? 1.4 : 0.32, 0.9)), De(s, i, o + 2.1, ne(38), 0.6);
  }
}
const Gt = new Xh(), Mi = { theme: Yi, eraPiece: Ar, play: zr };
class Tr {
  constructor() {
    m(this, "loops", {});
    m(this, "wf", null);
    m(this, "t", null);
    m(this, "next", {});
    m(this, "seed", 1);
  }
  start() {
    const t = G.ctx, a = G.out("amb");
    if (!t || !a || this.loops.wind) return;
    const s = (i, o) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(a), this.loops[i] = { g: n, stop: o(n) };
    };
    s("wind", (i) => {
      const o = Ps(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const c = t.createGain(), h = t.createOscillator(), f = t.createGain();
      return c.gain.value = 0.75, h.frequency.value = 0.11, f.gain.value = 0.25, h.connect(f).connect(c.gain), o.connect(n).connect(c).connect(i), r.start(), h.start(), () => {
        o.stop(), r.stop(), h.stop();
      };
    }), s("water", (i) => {
      const o = Ps(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), c = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, c.gain.value = 0.2, l.connect(c).connect(r.gain), o.connect(n).connect(r).connect(i), l.start(), () => {
        o.stop(), l.stop();
      };
    }), s("fire", (i) => {
      const o = Ps(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, o.connect(n).connect(i), () => o.stop();
    }), s("market", (i) => {
      const o = Ps(t), n = t.createBiquadFilter();
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
      const c = t.createGain(), h = t.createOscillator(), f = t.createGain();
      return c.gain.value = 0.5, h.frequency.value = 0.3, f.gain.value = 0.5, h.connect(f).connect(c.gain), o.connect(n).connect(c).connect(i), o.start(), r.start(), h.start(), () => {
        o.stop(), r.stop(), h.stop();
      };
    });
  }
  stop() {
    const t = G.now;
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
    const a = G.now, s = this.loops;
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
    const t = this.t, a = G.ctx, s = G.out("amb");
    if (!t || !a || !s || !G.running) return;
    const i = a.currentTime, o = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (h, f) => (this.next[h] ?? 0) > i ? !1 : (this.next[h] = i + f(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), c = [0.9, 0.6, 0.25, 0][o] * (0.4 + t.trees * 0.6);
    c > 0.05 && r("bird", () => 1.5 + n() * 4 / c) && Wi(a, s, i + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), o === 3 && r("crow", () => 9 + n() * 14) && ve["animal.crow"](a, s, i + 0.05, 0.6), o === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && ve["work.rustle"](a, s, i + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && ve["stone.hit"](a, s, i + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && ve["work.pickMetal"](a, s, i + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && ve["animal.sheep"](a, s, i + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && ve["animal.horse"](a, s, i + 0.05, 0.8 * t.stables);
  }
}
const Pa = (e, t, a) => Math.max(t, Math.min(a, e)), fn = /* @__PURE__ */ new Map(), Xi = {};
function Ys(e, t = 1, a = 0, s = "sfx", i = 0.07) {
  const o = G.ctx, n = G.out(s), r = ve[e];
  if (!o || !n || !r || !G.running || t < 0.01) return;
  const l = o.currentTime;
  if ((fn.get(e) ?? -9) > l - i || !G.voice(0.35)) return;
  fn.set(e, l), Xi[e] = (Xi[e] ?? 0) + 1;
  let c = n;
  if (a && o.createStereoPanner) {
    const h = o.createStereoPanner();
    h.pan.value = Pa(a, -1, 1), h.connect(n), c = h;
  }
  r(o, c, l + 0.01, Pa(t, 0, 1.2));
}
const je = (e) => G.whenRunning(() => Ys(e, 1, 0, "ui", 0.04));
class Jh {
  constructor(t, a, s) {
    m(this, "amb", new Tr());
    m(this, "t", 0);
    m(this, "slow", 0);
    m(this, "raidUntil", 0);
    m(this, "animalT", 0);
    this.w = t, this.me = a, this.cam = s, G.setScene("game"), Gt.game(() => t.players[a].era, () => t.season), ze.emit = (i, o, n, r) => this.at(i, o, n, r), G.ready(() => this.amb.start());
  }
  dispose() {
    ze.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, a, s, i = 1) {
    if (!G.running) return;
    const o = this.w, n = o.size, r = Math.floor(a), l = Math.floor(s);
    if (r < 0 || l < 0 || r >= n || l >= n || !o.vis[this.me][l * n + r]) return;
    const c = this.cam, h = a - c.x, f = s - c.z, d = Math.hypot(h, f), u = Pa(1 - d / 22, 0, 1), g = Pa(1.25 - c.dist / 70, 0.3, 1);
    if (u < 0.05) return;
    const b = (h * Math.cos(c.yaw) - f * Math.sin(c.yaw)) / 12;
    Ys(t, i * u * u * g, b);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco */
  aviso(t) {
    Ys(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && G.duck();
  }
  onEvents(t) {
    const a = this.w, s = a.size;
    for (const i of t) switch (i.t) {
      case "proj":
        this.at(i.h !== void 0 ? "tower" : i.kind === "arrow" ? "bow" : i.kind === "stone" ? "sling" : "throw", i.x0 / 256, i.z0 / 256);
        break;
      case "death": {
        const o = i.x / 256, n = i.z / 256;
        this.at(i.kind >= xt ? "crash" : i.owner === zt ? "fall.animal" : "puff", o, n);
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
        i.player === this.me && Gt.stinger("age", i.era);
        break;
      case "end":
        Gt.stinger(this.w.resultadoDe(this.me, i));
        break;
      // M6: o time vencedor
      case "msg": {
        if (i.player !== this.me) break;
        const o = i.key.split(".")[0], n = { underAttack: "horn", raidSoon: "drums.war", centerLost: "gong", tech: "tech", fair: "fair", winter: "winter", spring: "spring", hunger: "hunger", winterSoon: "soft", metalSeen: "metal", campLoot: "metal" };
        n[o] && this.aviso(n[o]), o === "raidSoon" && (this.raidUntil = this.w.tick + 400);
        break;
      }
    }
  }
  /** a cada quadro: ambiente pela câmera, sons de bichos por perto, camadas da música */
  update(t, a) {
    if (G.setPaused(a), this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !G.running)) return;
    const s = this.w, i = this.me, o = s.size, n = this.cam, r = n.x, l = n.z, c = s.vis[i];
    let h = 0, f = 0, d = 0;
    for (let A = -8; A <= 8; A += 2) for (let T = -8; T <= 8; T += 2) {
      const w = Math.floor(r + T), S = Math.floor(l + A);
      if (w < 0 || S < 0 || w >= o || S >= o) continue;
      const O = S * o + w;
      d++;
      const z = s.map.terrain[O];
      (z === Je || z === ba) && h++, s.map.tree[O] && f++;
    }
    let u = 0, g = 0, b = 0, k = 0, v = 0, M = 0, y = 0;
    const $ = [];
    for (let A = 0; A < s.top; A++) {
      if (!s.alive[A]) continue;
      const T = s.x[A] / 256, w = s.z[A] / 256, S = Math.hypot(T - r, w - l);
      if (S > 18 || !c[Math.floor(w) * o + Math.floor(T)] && s.owner[A] !== i) continue;
      const O = Pa(1 - S / 16, 0, 1);
      if (s.kind[A] >= xt) {
        if (!s.done[A]) continue;
        const z = Et[s.kind[A] - xt].key;
        z === "center" || z === "camp" ? u = Math.max(u, O) : z === "forge" ? g = Math.max(g, O) : z === "market" ? b = Math.max(b, O) : z === "pen" ? k = Math.max(k, O) : z === "stable" && (v = Math.max(v, O));
      } else s.kind[A] < _.length && (s.owner[A] === zt ? S < 14 && $.push(A) : s.task[A] === Ft && (M++, s.owner[A] === i && y++), _[s.kind[A]].key === "horseman" && (v = Math.max(v, O * 0.5)));
    }
    if (this.amb.set({ season: s.season, zoom: n.dist, water: d ? Math.min(1, h / d * 3) : 0, fire: u, market: b, fair: s.fair, forge: g, pens: k, stables: v, trees: d ? Math.min(1, f / d * 2) : 0 }), this.amb.tick(), $.length && (this.animalT -= 0.25) <= 0) {
      const A = $[Math.floor(this.t * 7.7 % $.length)], T = _[s.kind[A]].key, w = T === "wolf" ? s.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${T}`;
      ve[w] && this.at(w, s.x[A] / 256, s.z[A] / 256, T === "wolf" && s.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let q = s.tick < this.raidUntil;
    if (!q && Math.floor(this.t * 4) % 4 === 0) {
      const A = s.players[i];
      for (let T = 0; T < s.top && !q; T++) if (s.isUnit(T) && s.owner[T] !== i && s.owner[T] !== zt && (s.owner[T] === Be || s.hostile(i, s.owner[T]))) {
        const w = s.x[T] / 256 - A.start.x, S = s.z[T] / 256 - A.start.z;
        w * w + S * S < 196 && (q = !0);
      }
    }
    Gt.setTension(q ? 0.6 : 0), Gt.setBattle(y > 0 ? Pa((M - 1) / 8, 0.3, 1) : 0);
  }
}
const $r = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], Zh = {
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
}, Qh = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["victory", "Vitória"], ["defeat", "Derrota"]], td = ["Pedra", "Neolítico", "Metais"], ed = ["calma", "animada", "calma 2"], ad = ["primavera", "verão", "outono", "inverno"];
function sd() {
  G.install(), G.setScene("menu");
  const e = new Tr(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${$r.map(([l, c]) => `<h2>${l}</h2>${c.map((h) => `<button data-som="${h}" title="${h}">${Zh[h] ?? h}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${td.map((l, c) => ed.map((h, f) => `<button data-musica-teste="era:${c}:${f}">${l} · ${h}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${Qh.map(([l, c]) => `<button data-vinheta="${l}">${c}</button>`).join("")}
    <h2>Ambiente</h2>${ad.map((l, c) => `<button data-ambiente-teste="${c}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const a = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let s = { ...a }, i = 0;
  const o = (l) => {
    G.setScene("game"), e.start(), s = l, e.set(l), i || (i = window.setInterval(() => {
      e.set(s), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const c = l.target.closest("button");
    c && (G.unlock(), t.querySelectorAll("[aria-pressed]").forEach((h) => h.removeAttribute("aria-pressed")), c.setAttribute("aria-pressed", "true"), G.whenRunning(() => r(c)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = G.ctx ? G.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const c = l.dataset;
    if (c.som && Ys(c.som, 1, 0, ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"].includes(c.som) ? "alert" : "sfx", 0), c.musicaTeste) {
      const h = c.musicaTeste;
      if (G.setScene(h === "tema" ? "menu" : "game"), G.setOpts({ music: Math.max(2, G.opts.music) }), h === "tema")
        Gt.stop(), Gt.menu();
      else if (h === "parar") Gt.stop();
      else if (h === "tensao") Gt.setTension(0.6);
      else if (h === "batalha") Gt.setBattle(0.9);
      else if (h === "inverno") Gt.preview(2, 0, 3);
      else {
        const [, f, d] = h.split(":").map(Number);
        Gt.setTension(0), Gt.setBattle(0), Gt.preview(f, d, 0);
      }
    }
    if (c.vinheta) {
      const [h, f] = c.vinheta.split(":");
      Gt.stinger(h, Number(f) || 0);
    }
    if (c.ambienteTeste) {
      const h = c.ambienteTeste;
      h === "parar" ? (e.set({ ...a, season: 1, trees: 0 }), s = { ...a, season: -1, trees: 0 }) : o(h === "rio" ? { ...a, season: 1, water: 1, zoom: 22 } : h === "aldeia" ? { ...a, fire: 1, forge: 1, pens: 1, zoom: 22 } : h === "feira" ? { ...a, market: 1, fair: !0, zoom: 22 } : { ...a, season: Number(h) });
    }
  }
}
async function id(e) {
  const a = new OfflineAudioContext(1, 176400, 44100);
  let s = 0;
  if (ve[e]) s = ve[e](a, a.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, c, h] = e.split(":"), f = c === "tema" ? Mi.theme() : Mi.eraPiece(Number(h), 1, 0, 3), d = 60 / f.bpm;
    for (const u of f.notes) u.b * d < 3.6 && Mi.play(a, a.destination, 0.01 + u.b * d, u, d);
    s = 4;
  }
  const i = await a.startRendering(), o = i.getChannelData(0);
  let n = 0, r = 0, l = 0;
  for (let c = 0; c < o.length; c++) {
    const h = Math.abs(o[c]);
    h > n && (n = h), c < Math.max(1, s) * 44100 && (r += o[c] * o[c], l++);
  }
  return { id: e, peak: n, rms: Math.sqrt(r / Math.max(1, l)), dur: s };
}
const od = $r.flatMap((e) => e[1]), La = new URLSearchParams(location.search), Xs = (e, t) => {
  const a = Number(La.get(e));
  return La.has(e) && Number.isFinite(a) && a >= 0 ? a : t;
}, wr = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, bo = document.getElementById("scene"), fs = Jn.makeRenderer(bo);
let nt = 0;
const Le = 1 / An;
let ge = wr ? 1 : 0, Js = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (ge = Math.min(2, Math.max(0, Number(e) || 0)), Js = !1);
} catch {
}
const Sr = (e) => {
  ge = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class nd {
  // muralha: começo escolhido e blocos da linha
  /** owner: a conta dona deste jogo (o apelido; '' = sem conta). O jogo só vai para a nuvem dessa conta */
  constructor(t, a = "") {
    m(this, "scene");
    m(this, "hud");
    m(this, "input");
    m(this, "minimap");
    m(this, "snd");
    m(this, "sel", /* @__PURE__ */ new Set());
    m(this, "paused", !1);
    m(this, "ended", !1);
    m(this, "acc", 0);
    m(this, "time", 0);
    m(this, "saveT", 0);
    m(this, "idleCursor", 0);
    m(this, "autoT", 0);
    m(this, "autoN", 0);
    m(this, "marco", 0);
    m(this, "perfT", 0);
    m(this, "perfN", 0);
    m(this, "derrotaPor", "");
    // medição: marcos de tempo, quadros por segundo, quem derrubou o Centro
    m(this, "mode", "normal");
    m(this, "placeKey", "");
    m(this, "place", { tx: 0, tz: 0, ok: !1 });
    m(this, "rallyB", -1);
    m(this, "wallA", null);
    m(this, "wallTiles", []);
    // ── partida online (M6): sinais prontos para os aliados ──
    m(this, "sinalTipo", null);
    m(this, "ultimoSinal", /* @__PURE__ */ new Map());
    /** papéis no jogo com um amigo (D31): o meu papel vale no painel e na seleção; o que não é dele sai da seleção em grupo */
    m(this, "papelVisto");
    /** no jogo de um amigo (convidado): o jogo é do anfitrião; aqui nada é salvo, nem depois que o anfitrião sai */
    m(this, "guest", rt?.papel === "convidado");
    /** partida online (M6): nada é salvo, e os avisos da partida solo não são medidos (só o aviso amigo) */
    m(this, "naRede", !!X);
    this.world = t, this.owner = a;
    const s = t;
    this.marco = Math.floor(s.tick / 600), this.scene = new Jn(fs, s, nt), this.scene.setQuality(ge), La.get("fog") === "0" && this.scene.setFog(!1), this.hud = new Ui(s, nt, {
      idle: () => {
        if (Za() === "combate") return;
        const n = this.own((l) => s.kind[l] === ut.villager && s.task[l] === 0 && s.state[l] === 0);
        if (!n.length) return;
        const r = n[this.idleCursor++ % n.length];
        this.select([r]), this.focus([r]);
      },
      army: () => {
        if (Za() === "logistica") return;
        const n = this.own((r) => s.kind[r] !== ut.villager);
        this.select(n), this.focus(n);
      },
      home: () => {
        const n = s.players[nt].start;
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
        n.length && this.send({ type: "stop", player: nt, ids: n });
      },
      food: (n) => {
        const r = this.own((l) => this.sel.has(l) && s.kind[l] === ut.villager);
        r.length && this.send({ type: "food", player: nt, ids: r, on: n });
      },
      startPlace: (n) => this.startPlace(n),
      train: (n, r) => this.send({ type: "train", player: nt, building: n, key: r }),
      cancelQueue: (n) => this.send({ type: "cancel", player: nt, building: n }),
      ageUp: (n) => this.send({ type: "ageup", player: nt, building: n }),
      research: (n, r) => this.send({ type: "research", player: nt, building: n, key: r }),
      trade: (n, r, l) => this.send({ type: "trade", player: nt, building: n, give: r, get: l }),
      rally: (n) => {
        this.rallyB = n, this.setMode(this.mode === "rally" ? "normal" : "rally");
      },
      placeConfirm: () => this.confirmPlace(!1),
      cancelMode: () => this.setMode("normal"),
      jump: (n, r) => {
        this.scene.camera.tx = n, this.scene.camera.tz = r;
      },
      sinal: (n) => {
        this.sinalTipo = n, this.hud.setSinal(n), this.setMode("sinal");
      }
    }, wr, this.sel), this.minimap = new dh(this.hud.minimap, s, nt, this.scene.camera), this.snd = new Jh(s, nt, this.scene.camera), this.input = new uh(bo, s, nt, this.scene.camera, this.hud.box, {
      onCommand: (n) => {
        if (this.mode !== "normal") return;
        const { cmds: r, ping: l } = bh(s, nt, [...this.sel], n), c = r.filter((h) => this.send(h));
        c.length && Os(c[0].type === "attack" ? s.owner[c[0].target] === zt ? "cacar" : "atacar" : c[0].type === "gather" ? "coletar" : c[0].type === "work" ? "trabalhar" : "mover"), c.length && (this.scene.ping(n.x, n.z, l), je(l === "attack" ? "order.attack" : l === "work" ? "order.work" : "order.move"));
      },
      onRally: (n, r) => {
        if (this.mode === "sinal") {
          this.porSinal(n, r);
          return;
        }
        const l = this.mode === "rally" && s.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        l >= 0 && this.send({ type: "rally", player: nt, building: l, x: Math.round(n * 256), z: Math.round(r * 256) }) && (this.scene.ping(n, r, "move"), Os("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (n, r) => this.movePlace(n, r),
      onPlaceConfirm: (n) => this.confirmPlace(n),
      onCancel: () => this.setMode("normal"),
      onSelect: () => {
        this.mode === "place" && !vh(s, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize(), this.aplicarPapel();
    const i = this.scene.camera.cam, o = i.position.clone();
    this.hud.projetor = (n, r) => (o.set(n, ft(s.map, n, r) + 0.6, r).project(i), [(o.x + 1) / 2 * innerWidth, (1 - o.y) / 2 * innerHeight, o.z < 1 && Math.abs(o.x) < 1.05 && Math.abs(o.y) < 1.05]), X && (this.hud.setTribos(X.nomes), X.olhando && !Ji(s) && this.scene.setFog(!1), X.aviso && X.aviso.ate > performance.now() && this.hud.toast(X.aviso.texto), X.aviso = null);
  }
  porSinal(t, a) {
    const s = X, i = this.sinalTipo ? Hi.indexOf(this.sinalTipo) : -1;
    if (this.setMode("normal"), !s || i < 0) return;
    const o = Math.max(0, Math.min(this.world.size - 1, Math.floor(t))), n = Math.max(0, Math.min(this.world.size - 1, Math.floor(a)));
    s.conn.sinal(i, o, n), this.mostrarSinal(nt, i, o, n);
  }
  /** o sinal de um aliado (ou o meu): marca no mapa e no minimapa, o anel no chão, um aviso e um som */
  mostrarSinal(t, a, s, i) {
    const o = Hi[a], n = t === nt ? p("tribe.you") : X?.nomes[t] || p("sala.computador");
    if (!o || s < 0 || i < 0 || s >= this.world.size || i >= this.world.size) return;
    this.hud.addMarca(s + 0.5, i + 0.5, o, n), this.minimap.marcar(s + 0.5, i + 0.5, so[t] ?? "#fff"), this.scene.ping(s + 0.5, i + 0.5, o === "atacar" ? "attack" : o === "ajuda" ? "move" : "work");
    const r = performance.now();
    t !== nt && r - (this.ultimoSinal.get(t) ?? -1e9) > 1500 && (this.ultimoSinal.set(t, r), this.hud.toast(p("sinal.de", { name: n, sinal: p(`sinal.${o}`) }), (s + 0.5) * 256, (i + 0.5) * 256, "sinal"), je("soft"));
  }
  /** partida online: a minha tribo perdeu e a partida continua (posso olhar ou sair) */
  perdeuTribo() {
    !X || this.ended || (this.setMode("normal"), this.sel.clear(), ct.showOlhar(Ji(this.world)));
  }
  aplicarPapel() {
    const t = Za();
    if (t !== this.papelVisto) {
      if (this.papelVisto = t, this.hud.setPapel(t, rt?.parceiro ?? ""), this.input.papel = t, t && this.sel.size > 1)
        for (const a of [...this.sel]) os(this.world, t, a) || this.sel.delete(a);
      this.hud.refresh();
    }
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, a = [...this.sel][0];
    if (a === void 0 || !t.alive[a] || t.owner[a] !== nt) return;
    if (t.isBuilding(a)) {
      const i = t.bdef(a).key;
      je(i === "pen" ? "animal.sheep" : i === "stable" ? "animal.horse" : i === "forge" ? "work.pickMetal" : i === "market" ? "soft" : "sel.building");
      return;
    }
    const s = t.kind[a];
    je(s === ut.villager ? "sel.villager" : s === ut.dog ? "animal.dog" : s === ut.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const a = this.world, s = [];
    for (let i = 0; i < a.top; i++) a.isUnit(i) && a.owner[i] === nt && t(i) && s.push(i);
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
    this.mode = t, t !== "place" && (this.scene.setGhost(null), this.scene.setWallGhost(null), this.wallA = null), this.hud.setMode(t, this.place.ok, t === "place" && this.placeKey === "wall" ? this.wallA ? 2 : 1 : 0, t === "place" ? this.placeKey : ""), this.hud.refresh();
  }
  startPlace(t) {
    this.placeKey = t, this.mode = "place", this.wallA = null, this.hud.resetCard(), this.movePlace(this.scene.camera.x, this.scene.camera.z);
  }
  /** muralha: blocos de A até o ponteiro, sempre encostados de lado (sem pular na diagonal), no máximo 40 */
  wallLine(t, a, s, i) {
    const o = this.world.size, n = [a * o + t], r = Math.sign(s - t), l = Math.sign(i - a), c = s - t, h = i - a, f = Math.hypot(c, h) || 1, d = (b, k) => Math.abs((b - t) * h - (k - a) * c) / f;
    let u = t, g = a;
    for (; (u !== s || g !== i) && n.length < 40; )
      u === s ? g += l : g === i || d(u + r, g) <= d(u, g + l) ? u += r : g += l, n.push(g * o + u);
    return n;
  }
  moveWall(t, a) {
    const s = this.world, i = s.size, o = Et[Vt.wall].cost.stone ?? 0, n = Math.floor(t), r = Math.floor(a), l = this.wallA ? this.wallLine(this.wallA.tx, this.wallA.tz, n, r) : [r * i + n];
    let c = Math.floor(s.players[nt].res.stone / 100 / o);
    const h = l.map((f) => {
      const d = s.canPlace(nt, "wall", f % i, Math.floor(f / i)) && c > 0;
      return d && c--, d;
    });
    this.wallTiles = l.filter((f, d) => h[d]), this.place = { tx: n, tz: r, ok: this.wallTiles.length > 0 }, this.scene.setWallGhost(l, h), this.hud.setMode("place", this.place.ok, this.wallA ? 2 : 1, this.placeKey);
  }
  movePlace(t, a) {
    if (this.mode !== "place") return;
    if (this.placeKey === "wall") {
      this.moveWall(t, a);
      return;
    }
    const s = this.world, i = Et[Vt[this.placeKey]], o = Math.round(t - i.size / 2), n = Math.round(a - i.size / 2), r = s.canPlace(nt, this.placeKey, o, n) && s.canAfford(nt, i.cost);
    this.place = { tx: o, tz: n, ok: r }, this.scene.setGhost(this.placeKey, o, n, r), this.hud.setMode("place", r, 0, this.placeKey);
  }
  confirmPlace(t) {
    const a = this.world, s = this.own((o) => this.sel.has(o) && a.kind[o] === ut.villager);
    if (this.mode !== "place" || !s.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(p("place.bad"), void 0, void 0, "place"), je("place.bad");
      return;
    }
    if (this.placeKey === "wall") {
      if (!this.wallA) {
        this.wallA = { tx: this.place.tx, tz: this.place.tz }, this.moveWall(this.place.tx + 0.5, this.place.tz + 0.5), je("order.work");
        return;
      }
      this.send({ type: "wall", player: nt, ids: s, tiles: this.wallTiles.slice() }), je("place"), Os("muralha");
      const o = this.wallTiles[this.wallTiles.length - 1];
      this.scene.ping(o % a.size + 0.5, Math.floor(o / a.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    this.send({ type: "build", player: nt, ids: s, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), je("place"), Os("construir");
    const i = Et[Vt[this.placeKey]];
    this.scene.ping(this.place.tx + i.size / 2, this.place.tz + i.size / 2, "work"), t && a.canAfford(nt, { wood: (i.cost.wood ?? 0) * 2, stone: (i.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    if (!this.ended) {
      if (X) {
        this.setMode("normal");
        const t = Is();
        if (t && X.ativo && !this.paused) {
          this.paused = !0;
          const a = X.host.turno(this.world, !0);
          a && X.conn.turno(a), X.conn.pausa(!0);
        }
        ct.showOnline(ge, t);
        return;
      }
      if (rt?.papel === "convidado") {
        this.setMode("normal"), ct.showGuest(rt.parceiro, ge, rt.papelConvidado);
        return;
      }
      if (this.paused = !0, this.setMode("normal"), ct.showPause(Math.floor(this.world.tick / 600), ge, this.owner, oi()), ea(), rt?.papel === "anfitriao" && rt.ativo) {
        const t = rt.host.turno(this.world, !0);
        t && rt.amigo.turno(t), Zs(!0);
      }
    }
  }
  resume() {
    const t = this.paused;
    this.paused = !1, ct.hide(), rt?.papel === "anfitriao" && rt.ativo && Zs(!1), X && Is() && X.ativo && t && X.conn.pausa(!1);
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = Ge();
    !this.owner && t && (po("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended || this.guest || this.naRede) return "fail";
    await ea(), this.adopt();
    const { d: t, ok: a } = rn(this.world, this.owner), s = await cn(t, this.owner);
    return a || Ze("problema", { tipo: "aparelho" }), s === "fail" && Ze("problema", { tipo: "nuvem" }), s === "ok" ? a ? "both" : "cloudOnly" : a ? s === "fail" ? "localOnly" : s === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended || this.guest || this.naRede) return;
    this.adopt();
    const { d: a, ok: s } = rn(this.world, this.owner);
    !s && !t && Ze("problema", { tipo: "aparelho" }), cn(a, this.owner, t).then((i) => {
      i === "fail" && !t && Ze("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  /** ordem de quem joga: sozinho ou anfitrião, entra no jogo; no jogo de um amigo, vai para o anfitrião, que a põe no jogo */
  send(t) {
    const a = sr(this.world, Za(), t);
    if (!a) return !1;
    if (rt?.papel === "convidado") rt.amigo.ordem(_i(a));
    else if (X && !Is()) {
      if (!X.ativo) return !1;
      X.conn.ordem(_i(a));
    } else this.world.issue(a, !0);
    return !0;
  }
  /** o anfitrião vê onde o amigo mandou (o mesmo sinal das ordens) */
  pingAmigo(t) {
    const a = this.world, s = a.size;
    t.type === "move" || t.type === "amove" || t.type === "rally" ? this.scene.ping(t.x / 256, t.z / 256, t.type === "amove" ? "attack" : "move") : t.type === "gather" ? this.scene.ping(t.k % s + 0.5, Math.floor(t.k / s) + 0.5, "work") : (t.type === "work" || t.type === "attack") && a.alive[t.target] ? this.scene.ping(a.x[t.target] / 256, a.z[t.target] / 256, t.type === "attack" && a.owner[t.target] !== zt ? "attack" : "work") : t.type === "build" && this.scene.ping(t.tx + 1, t.tz + 1, "work");
  }
  /** câmera e seleção, para continuar iguais quando o jogo recarrega (o amigo entrou ou pediu o jogo de novo) */
  view() {
    const t = this.scene.camera;
    return { tx: t.tx, tz: t.tz, yaw: t.tyaw, dist: t.tdist, sel: [...this.sel] };
  }
  setView(t) {
    const a = this.scene.camera;
    a.x = a.tx = t.tx, a.z = a.tz = t.tz, a.yaw = a.tyaw = t.yaw, a.dist = a.tdist = t.dist;
    for (const s of t.sel) this.world.isUnit(s) && this.world.owner[s] === nt && this.sel.add(s);
  }
  /** convidado: anda até o passo que o anfitrião já mandou (mais depressa quando fica para trás) e confere a partida */
  seguir(t, a) {
    const s = this.world, i = a.guest, o = i.ate - s.tick;
    if (o > 0) {
      this.acc += t * (a.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= Le && s.tick < i.ate && r < 40; )
        s.step(), i.depoisDoPasso(s), this.acc -= Le, r++;
    }
    s.tick >= i.ate && (this.acc = Math.min(this.acc, Le * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.amigo.reconectando && (a.parado = n, this.hud.setFaixa(n ? p("amigo.espera") : a.pausado ? p("amigo.pausado") : null)), (i.divergiu || i.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.amigo.pedir(), this.hud.setFaixa(p("amigo.sincronizando")), Rt("amigo", { acao: "sincronizou", papel: "convidado" }));
  }
  /** partida online, quem não dá o ritmo: como o convidado do jogo com um amigo */
  seguirOnline(t, a) {
    const s = this.world, i = a.guest, o = i.ate - s.tick;
    if (o > 0) {
      this.acc += t * (a.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= Le && s.tick < i.ate && r < 40; )
        s.step(), i.depoisDoPasso(s), this.acc -= Le, r++;
    }
    s.tick >= i.ate && (this.acc = Math.min(this.acc, Le * 0.95));
    const n = !a.pausado && performance.now() - a.ultimoTurno > 4e3;
    n !== a.parado && !a.conn.reconectando && (a.parado = n, this.hud.setFaixa(n ? p("online.esperaAnf", { name: a.nomes[a.anf] || "" }) : a.pausado ? p("online.pausado", { name: a.nomes[a.anf] || "" }) : null)), (i.divergiu || i.ate - s.tick > 600) && !a.pediu && (a.pediu = !0, a.conn.pedir(), this.hud.setFaixa(p("online.sincronizando")));
  }
  frame(t) {
    const a = this.world, s = rt, i = s?.papel === "anfitriao" && s.ativo ? s.host : null, o = X, n = o && o.ativo && o.anf === o.eu ? o.host : null;
    if (s?.papel === "convidado")
      s.ativo && this.seguir(t, s);
    else if (o && !n)
      o.ativo && this.seguirOnline(t, o);
    else if (!this.paused) {
      this.acc += t;
      let c = 0;
      for (; this.acc >= Le && c < 4; )
        a.step(), i?.depoisDoPasso(a), n?.depoisDoPasso(a), this.acc -= Le, c++;
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
        (c.t === "tree" || c.t === "res" && a.resKind[c.k] === 0) && this.minimap.clearTile(c.k), c.t === "age" && c.player === nt && !this.guest && !this.naRede && Rt("era_nova", { era: c.era, min: pi(a.tick) }), c.t === "msg" && c.player === nt && !this.guest && !this.naRede && this.medir(c.key), c.t === "msg" && c.player === nt && c.key === `defeated.${nt}` && this.naRede && a.outcome === "playing" && this.perdeuTribo(), c.t === "end" && !this.ended && this.end(a.resultadoDe(nt, c));
    }
    this.input.update(t);
    for (const c of [...this.sel]) a.alive[c] || this.sel.delete(c);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / Le, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && !this.guest && !this.naRede && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const l = Math.floor(a.tick / 600);
    if (!this.ended && !this.guest && !this.naRede && l > this.marco) {
      for (const c of oc) c > this.marco && c <= l && Rt("marco_partida", { min: c });
      this.marco = l;
    }
    if (!gn && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (gn = !0, Rt("desempenho", { fps: sc(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][ge] }))), Js && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      Js = !1;
      const c = this.autoN / this.autoT;
      c < 40 && ge < 2 && (Sr(ge + 1), this.scene.setQuality(ge), this.hud.toast(p("q.auto", { q: p(`q.${Ca[ge].key}`), fps: Math.round(c) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [a, s] = t.split("."), i = this.world, o = i.players[nt].era, n = Number(s) === Be ? "barbaros" : "rival";
    a === "centerDanger" ? Rt("centro_em_perigo", { por: n, era: o }) : a === "centerLost" ? this.derrotaPor = n : a === "hunger" && Rt("fome", { era: o, ano: Math.min(3, i.year) });
  }
  end(t) {
    const a = this.world;
    if (this.naRede) {
      Rt("amigo", { acao: t === "victory" ? "venceu" : "perdeu", papel: Is() ? "anfitriao" : "convidado" }), this.ended = !0, this.setMode("normal"), ct.showEnd(t, Math.floor(a.tick / 600), a.players[nt].era, X?.modo === 2 ? "time" : "tribo");
      return;
    }
    this.guest || (t === "victory" ? Rt("fim_vitoria", { era: a.players[nt].era, min: pi(a.tick) }) : Rt("fim_derrota", { por: this.derrotaPor || "rival", min: pi(a.tick) }), fo(this.owner), Ph(this.owner)), this.ended = !0, this.setMode("normal"), ct.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[nt].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let P = null, rt = null;
const Cr = (e, t, a = null) => ({ amigo: e, papel: t, parceiro: "", ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), host: new vr(), guest: new yr(), papelConvidado: a });
function Za() {
  const e = rt;
  return !e || !e.papelConvidado ? null : e.papel === "convidado" ? e.papelConvidado : e.ativo ? ii(e.papelConvidado) : null;
}
function Zs(e) {
  const t = rt;
  t?.papel === "anfitriao" && t.amigo.pausa(e, sh(t.papelConvidado));
}
const Qs = (e, t) => ct.setConvite({ estado: t, codigo: e.amigo.codigo, nome: t === "junto" ? e.parceiro : void 0, papel: e.papelConvidado ?? void 0 });
async function rd(e) {
  if (!(!P || rt || P.ended)) {
    ct.setConvite({ estado: "criando" });
    try {
      rt = Cr(await rs.convidar(cd), "anfitriao", e), Rt("amigo", { acao: "convidou", papel: e });
    } catch {
      ct.setConvite({ estado: "erro" });
    }
  }
}
function ld() {
  const e = rt;
  if (!e || e.papel !== "anfitriao" || !e.papelConvidado) return;
  e.papelConvidado = ii(e.papelConvidado), e.ativo && Zs(P?.paused ?? !1), Qs(e, e.ativo ? "junto" : "aberto"), P?.aplicarPapel();
  const t = Za();
  t && P?.hud.toast(p("papel.agora", { papel: p(`papel.${t}`) }));
}
function cd(e) {
  const t = rt;
  if (!(!t || t.papel !== "anfitriao"))
    switch (e.t) {
      case "codigo":
        Qs(t, "aberto");
        break;
      case "entrou": {
        const a = t.ativo;
        t.parceiro = e.nome, Qs(t, "junto"), mn(!a), a || (P?.hud.toast(t.papelConvidado ? p("amigo.entrouComo", { name: e.nome, papel: p(`papel.${t.papelConvidado}`) }) : p("amigo.entrou", { name: e.nome })), Rt("amigo", { acao: "entrou", papel: "anfitriao" }));
        break;
      }
      case "saiu":
        pn(t, e.nome);
        break;
      case "ordem":
        if (t.ativo && P && !P.ended) {
          const a = P.world, s = t.host.ordemDoAmigo(a, e.d, nt, (i) => sr(a, t.papelConvidado, i));
          s && P.pingAmigo(s);
        }
        break;
      // só o que é do papel dele (D31)
      case "pede":
        t.ativo && (mn(!1), Rt("amigo", { acao: "sincronizou", papel: "anfitriao" }));
        break;
      case "caiu":
        P?.hud.setFaixa(p("amigo.caiu"));
        break;
      case "reconectou":
        P?.hud.setFaixa(null), e.sozinho && t.ativo && pn(t, t.parceiro);
        break;
      case "erro":
        Er(!1), ct.setConvite({ estado: "erro" });
        break;
    }
}
function pn(e, t) {
  e.ativo = !1, P && (P.world.onApplied = null, P.hud.setAmigo(null), P.hud.toast(p(e.papelConvidado ? "amigo.saiuTudo" : "amigo.saiu", { name: t })), P.aplicarPapel()), Qs(e, "aberto");
}
function mn(e) {
  const t = P, a = rt;
  if (!t || !a || t.ended) return;
  const s = JSON.stringify(uo(t.world)), i = Ha(JSON.parse(s));
  for (const n of t.world.takePendingExt()) i.issue(n, !0);
  const o = t.paused && !e;
  _e(i, t.owner, t.view()), a.host.ligar(i), a.ativo = !0, a.amigo.jogo(s), P.hud.setAmigo(a.parceiro), P.aplicarPapel(), o ? P.pause() : Zs(!1);
}
function Er(e = !0) {
  const t = rt;
  !t || t.papel !== "anfitriao" || (rt = null, t.amigo.sair(), P && (P.world.onApplied = null, P.hud.setAmigo(null), P.hud.setFaixa(null), P.aplicarPapel()), ct.setConvite(null), e && Rt("amigo", { acao: "encerrou", papel: "anfitriao" }));
}
function hd(e) {
  rt || P || (ct.setAmigoMsg(p("amigo.entrando"), !0), rt = Cr(rs.entrar(e, dd), "convidado"));
}
function dd(e) {
  const t = rt;
  if (!(!t || t.papel !== "convidado"))
    switch (e.t) {
      case "oi":
        t.parceiro = e.nome, ct.setAmigoMsg(p("amigo.entrandoEm", { name: e.nome }), !0);
        break;
      case "jogo": {
        if (e.v !== ns) {
          zi(p("amigo.erro.t"), p("amigo.versao"));
          return;
        }
        let a = null;
        try {
          a = Ha(e.d);
        } catch {
          a = null;
        }
        if (!a) {
          t.pediu = !0, t.amigo.pedir();
          return;
        }
        const s = !P;
        _e(a, "", P ? P.view() : void 0), t.guest.ligar(a), t.ativo = !0, t.pediu = !1, t.parado = !1, t.ultimoTurno = performance.now(), P.hud.setAmigo(t.parceiro), P.hud.setFaixa(t.pausado ? p("amigo.pausado") : null), s && Rt("amigo", { acao: "entrou", papel: "convidado" });
        break;
      }
      case "turno":
        t.ativo && P && (t.ultimoTurno = performance.now(), t.guest.receber(P.world, e.d));
        break;
      case "pausa": {
        t.pausado = e.on, t.ultimoTurno = performance.now(), P?.hud.setFaixa(e.on ? p("amigo.pausado") : null);
        const a = ih(e.papel);
        if (a !== t.papelConvidado) {
          const s = t.papelConvidado;
          t.papelConvidado = a, P?.aplicarPapel(), a && P && P.hud.toast(p(s ? "papel.agora" : "papel.voceE", { papel: p(`papel.${a}`) }));
        }
        break;
      }
      case "espera":
        P?.hud.setFaixa(p("amigo.espera"));
        break;
      case "voltou":
        t.ultimoTurno = performance.now(), t.parado = !1, P?.hud.setFaixa(p("amigo.sincronizando"));
        break;
      // o jogo vem de novo
      case "caiu":
        P?.hud.setFaixa(p("amigo.caiu")), Rt("amigo", { acao: "caiu", papel: "convidado" });
        break;
      case "reconectou":
        t.ultimoTurno = performance.now(), t.parado = !1, P?.hud.setFaixa(p("amigo.sincronizando"));
        break;
      // a sala avisa o anfitrião, que manda o jogo de novo
      case "fim":
        zi(p("amigo.fim.t"), p("amigo.fim")), Rt("amigo", { acao: "fim", papel: "convidado" });
        break;
      case "erro":
        zi(p("amigo.erro.t"), !e.msg || e.msg === "rede" ? p("amigo.semRede") : e.msg);
        break;
    }
}
function zi(e, t) {
  const a = rt;
  rt = null, a?.amigo.sair(), P ? (P.paused = !0, P.hud.setFaixa(null), ct.showInfo(e, t)) : ct.setAmigoMsg(t, !1);
}
let X = null;
function Ya(e) {
  P?.hud.toast(e), X && (X.aviso = { texto: e, ate: performance.now() + 4e3 });
}
const Is = () => !!X && X.anf === X.eu, Ji = (e) => e.players.some((t, a) => e.time(a) === e.time(nt) && !t.defeated), Pr = (e) => ({ conn: e, eu: -1, anf: 0, modo: 1, nomes: [], fora: /* @__PURE__ */ new Set(), host: new vr(), guest: new yr(), ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), olhando: !1, aviso: null }), da = (e) => X?.nomes[e] || p("sala.computador");
async function ud() {
  if (!(X || rt || P)) {
    ct.setPartidaMsg(p("online.criando"), !0);
    try {
      X = Pr(await hs.nova(Ir)), Rt("amigo", { acao: "criou", papel: "anfitriao" });
    } catch {
      ct.setPartidaMsg(p("online.erroCriar"), !1);
    }
  }
}
function fd(e) {
  X || rt || P || (ct.setPartidaMsg(p("online.entrando"), !0), X = Pr(hs.entrar(e, Ir)));
}
function Ir(e) {
  const t = X;
  if (t)
    switch (e.t) {
      case "sala":
        t.eu = e.sala.eu, ct.setPartidaMsg("", !1), ct.showLobby(e.sala);
        break;
      case "comeca":
        pd(t, e.c);
        break;
      case "turno":
        t.ativo && P && t.anf !== t.eu && (t.ultimoTurno = performance.now(), t.guest.receber(P.world, e.d));
        break;
      case "jogo":
        md(t, e.v, e.d);
        break;
      case "pausa":
        t.anf !== t.eu && (t.pausado = e.on, t.ultimoTurno = performance.now(), P?.hud.setFaixa(e.on ? p("online.pausado", { name: da(t.anf) }) : null));
        break;
      case "ordem":
        t.anf === t.eu && t.ativo && P && !P.ended && t.nomes[e.v] && !t.fora.has(e.v) && t.host.ordemDoAmigo(P.world, e.d, e.v);
        break;
      case "pede":
        t.anf === t.eu && t.ativo && Fs();
        break;
      case "sinal":
        P && t.ativo && P.world.aliado(nt, e.v) && P.mostrarSinal(e.v, e.tipo, e.x, e.z);
        break;
      case "caiu":
        if (!P) break;
        e.v === t.anf ? P.hud.setFaixa(p("online.esperaAnf", { name: da(e.v) })) : Ya(p("online.caiu", { name: da(e.v) }));
        break;
      case "voltou":
        P && (Ya(p("online.voltou", { name: da(e.v) })), e.v === t.anf && P.hud.setFaixa(p("online.sincronizando"))), t.anf === t.eu && Fs();
        break;
      case "saiu":
        t.fora.add(e.v), P && Ya(p("online.saiu", { name: da(e.v) })), t.anf === t.eu && t.ativo && P && !P.ended && P.world.players[e.v] && !P.world.players[e.v].ai && (P.world.issue({ type: "ia", player: e.v }, !0), Rt("amigo", { acao: "assumiu", papel: "anfitriao" }));
        break;
      case "anfitriao":
        t.anf = e.v;
        for (const a of e.fora) t.fora.add(a);
        if (e.v === t.eu) {
          if (!P || !t.ativo) {
            t.conn.cede();
            break;
          }
          for (const a of t.fora) P.world.players[a] && !P.world.players[a].ai && P.world.issue({ type: "ia", player: a }, !0);
          Ya(p("online.anfitriaoVoce")), Fs();
        } else
          t.pediu = !0, Ya(p("online.anfitriao", { name: da(e.v) })), P?.hud.setFaixa(p("online.sincronizando"));
        break;
      case "reconectando":
        P ? P.hud.setFaixa(p("online.reconectando")) : ct.setPartidaMsg(p("online.reconectando"), !0);
        break;
      case "fim":
        Zi(e.motivo === "criador" ? p("sala.fechou") : p("online.fim"));
        break;
      case "erro":
        Zi(!e.msg || e.msg === "rede" ? p("online.semRede") : e.msg);
        break;
    }
}
function pd(e, t) {
  e.eu = t.eu, e.anf = t.anf, e.modo = t.modo, e.nomes = t.vagas;
  for (const i of t.fora) e.fora.add(i);
  if (nt = t.eu, t.volta) {
    e.anf === e.eu ? P && e.ativo ? Fs() : e.conn.cede() : (e.pediu = !0, P?.hud.setFaixa(p("online.sincronizando")));
    return;
  }
  const a = Gs[t.modo] ?? Gs[1], s = new ro(t.semente, a.vagas, { humanos: lh(t.vagas), times: a.times, difficulty: t.dif });
  _e(s, ""), e.anf === e.eu ? e.host.ligar(s) : e.guest.ligar(s), e.ativo = !0, e.ultimoTurno = performance.now(), P?.hud.toast(p("online.voceE", { cor: p(`cor.${t.eu}`) })), e.anf === e.eu && Rt("amigo", { acao: "comecou", papel: "anfitriao" });
}
function md(e, t, a) {
  if (e.anf === e.eu || P?.ended) return;
  if (t !== ns) {
    Zi(p("amigo.versao"));
    return;
  }
  let s = null;
  try {
    s = Ha(a);
  } catch {
    s = null;
  }
  if (!s) {
    e.conn.pedir();
    return;
  }
  nt = e.eu, _e(s, "", P ? P.view() : void 0), e.guest.ligar(s), e.ativo = !0, e.pediu = !1, e.parado = !1, e.ultimoTurno = performance.now(), P.hud.setFaixa(e.pausado ? p("online.pausado", { name: da(e.anf) }) : null);
}
function Fs() {
  const e = P, t = X;
  if (!e || !t || e.ended) return;
  const a = JSON.stringify(uo(e.world)), s = Ha(JSON.parse(a));
  for (const n of e.world.takePendingExt()) s.issue(n, !0);
  const i = e.paused, o = ct.kind;
  _e(s, "", e.view()), t.host.ligar(s), t.ativo = !0, t.pediu = !1, t.conn.jogo(a), i ? (P.paused = !0, o === "online" && ct.showOnline(ge, !0), t.conn.pausa(!0)) : t.conn.pausa(!1), P.hud.setFaixa(null);
}
function Zi(e) {
  const t = X;
  if (X = null, t?.conn.sair(), nt = 0, P) {
    P.paused = !0, P.hud.setFaixa(null), ct.showInfo(p("online.titulo"), e);
    return;
  }
  ms(), ct.showStartOnline(ma), ct.setPartidaMsg(e, !1);
}
function gd() {
  const e = X;
  e && (e.ativo && Rt("amigo", { acao: "saiu", papel: e.anf === e.eu ? "anfitriao" : "convidado" }), Ls("online"));
}
let gn = !1;
const Os = (e) => Ze("ordem_primeira", { tipo: e }), Ai = (e, t) => Rt("partida_continuada", { era: e.players[nt].era, de: t });
bo.addEventListener("webglcontextlost", () => Ze("problema", { tipo: "webgl" }));
const Or = {
  cont: async () => {
    const e = ma.save;
    if (!e) return;
    if (e.from === "cloud") {
      const a = await pr();
      let s = null;
      try {
        s = a ? Ha(a) : null;
      } catch {
        s = null;
      }
      if (s && a) {
        xh(a, e.owner), _e(s, e.owner), Ai(s, "nuvem");
        return;
      }
      Ze("problema", { tipo: "carregar" });
    }
    const t = Mh(e.owner);
    if (!t) {
      Ze("problema", { tipo: "carregar" }), fo(e.owner), ms();
      return;
    }
    if (e.adopt) {
      const a = Ge();
      if (a) {
        po("", a), _e(t, a), Ai(t, "aparelho");
        return;
      }
    }
    _e(t, e.owner), Ai(t, "aparelho");
  },
  start: (e, t) => {
    _e(new ro(Xs("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, testUnits: Math.min(600, Xs("units", 0)) }), Ge()), Rt("partida_nova", { rivais: e, dif: ic[t] ?? "normal" });
  },
  resume: () => P?.resume(),
  save: () => P?.save() ?? Promise.resolve("fail"),
  quit: () => {
    P?.autoSave(), Ls();
  },
  quality: (e) => {
    Sr(e), Js = !1, P?.scene.setQuality(e);
  },
  help: () => {
    P?.resume(), P?.hud.openHelp();
  },
  watch: () => ct.hide(),
  toMenu: () => Ls(X ? "online" : ""),
  login: () => {
    ln();
  },
  profile: () => {
    Ch();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await ln(), P && xa()) {
      const e = await P.save();
      ct.updatePause(P.owner, oi(), e);
    }
  },
  convidar: (e) => {
    rd(e);
  },
  trocarPapeis: () => ld(),
  encerrarConvite: () => Er(),
  entrarAmigo: (e) => hd(e),
  sairAmigo: () => {
    const e = rt;
    rt = null, e?.amigo.sair(), Ls();
  },
  criarPartida: () => {
    ud();
  },
  entrarPartida: (e) => fd(e),
  cfgPartida: (e, t) => X?.conn.cfg(e, t),
  trocarVagas: (e, t) => X?.conn.trocar(e, t),
  comecarPartida: () => X?.conn.comecar(),
  sairPartida: () => gd(),
  olharPartida: () => {
    ct.hide(), X && P && (X.olhando = !0, Ji(P.world) || P.scene.setFog(!1));
  }
  // sem o time, vê o mapa inteiro
}, ct = new gh(Or);
function _e(e, t, a) {
  P?.dispose(), P = new nd(e, t), a && P.setView(a), ct.hide();
  const s = P;
  window.__amigo = () => rt && { papel: rt.papel, ativo: rt.ativo, pediu: rt.pediu, divergiu: rt.guest.divergiu, ate: rt.guest.ate, parceiro: rt.parceiro }, window.__online = () => X && { eu: X.eu, anf: X.anf, ativo: X.ativo, pediu: X.pediu, divergiu: X.guest.divergiu, fora: [...X.fora], olhando: X.olhando }, window.__origines = {
    world: e,
    scene: s.scene,
    input: s.input,
    game: s,
    screen: (i, o, n = 0.5) => {
      const r = s.scene.camera.cam.position.clone().set(i, ft(e.map, i, o) + n, o).project(s.scene.camera.cam);
      return [(r.x + 1) / 2 * innerWidth, (1 - r.y) / 2 * innerHeight, r.z < 1 ? 1 : 0];
    }
  };
}
function Ls(e = "") {
  if (rt) {
    const t = rt;
    rt = null, t.amigo.sair();
  }
  if (X) {
    const t = X;
    X = null, t.conn.sair();
  }
  nt = 0, ct.setConvite(null), P?.dispose(), P = null, G.setScene("menu"), Gt.menu(), fs.setClearColor(1911332, 1), fs.clear(), ms(), e === "online" && (ct.setPartidaMsg("", !1), ct.showStartOnline(ma));
}
let ma = { acc: "loading", save: null, other: null }, Ti = 0;
async function ms() {
  const e = ++Ti;
  if (ma = bn(null, xa()), ct.showStart(ma), !xa()) return;
  const t = await Eh();
  e !== Ti || ct.kind !== "start" || (await bd(t), !(e !== Ti || ct.kind !== "start") && (ma = bn(t, !1), ct.updateStart(ma)));
}
async function bd(e) {
  const t = Ge();
  if (!t || Ah()) return;
  const a = zh("");
  if (a && e && !ts(t)) {
    const s = await pr();
    s && s.seed === a.seed && a.tick >= s.tick && po("", t);
  }
  Th();
}
function bn(e, t) {
  const a = oi();
  if (a === "loading") return { acc: a, save: null, other: null };
  const s = Ge();
  if (s) {
    const o = e ? Ih(e) : null, n = ts(s);
    if (o && (!n || (o.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: a, save: { meta: o, from: "cloud", owner: s, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: a, save: { meta: n, from: "device", owner: s, adopt: !1 }, other: null, pending: t };
    const r = ts("");
    return { acc: a, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const i = ts("");
  return { acc: a, save: i ? { meta: i, from: "device", owner: "", adopt: !1 } : null, other: $h()[0]?.dono ?? null };
}
wh(() => {
  ct.kind === "start" ? ms() : ct.kind === "pause" && P && ct.updatePause(P.owner, oi());
});
addEventListener("resize", () => {
  fs.setSize(innerWidth, innerHeight, !1), P?.resize();
});
fs.setSize(innerWidth, innerHeight, !1);
let Qi = performance.now();
const Br = () => P?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  Qi = performance.now(), document.hidden ? Br() : ea();
});
addEventListener("pagehide", () => {
  if (Br(), rt?.papel === "anfitriao") {
    const e = rt;
    rt = null, e.amigo.sair();
  }
  if (X) {
    const e = X;
    X = null, e.conn.sair();
  }
});
let Bs = 0, $i = 0, qr = !1;
La.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  qr = e;
}, step: (e) => P?.frame(e) });
function Nr(e) {
  const t = Math.min(0.1, (e - Qi) / 1e3);
  Qi = e, P && !qr && P.frame(t), $i++, Bs += t, Bs > 1 && (window.__fps = $i / Bs, $i = 0, Bs = 0), requestAnimationFrame(Nr);
}
requestAnimationFrame(Nr);
const Rr = La.get("sons") === "1" || location.hash === "#sons";
G.install();
Rr || Gt.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && je(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: od, measure: id, audio: G, played: Xi, music: Gt };
Rr ? sd() : La.get("autostart") === "1" ? Or.start(Math.min(3, Math.max(1, Xs("players", 4) - 1)), Math.min(2, Xs("difficulty", 1))) : (ms(), Sh());
mh().then((e) => ct.setAmigoDisponivel(e));
Rh().then((e) => ct.setOnlineDisponivel(e));
const wi = document.getElementById("loading");
wi && (wi.style.opacity = "0", setTimeout(() => wi.remove(), 450));
