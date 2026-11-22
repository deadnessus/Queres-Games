var il = Object.defineProperty;
var ol = (e, t, s) => t in e ? il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var m = (e, t, s) => ol(e, typeof t != "symbol" ? t + "" : t, s);
import { C as Qt, M as Qs, a as nl, R as rl, P as ri, V as St, B as Ee, b as We, c as ll, S as En, D as cl, I as Pn, d as Bi, e as js, f as he, g as ls, F as xs, E as In, Q as lo, h as me, G as _s, i as Ut, T as hl, j as qi, k as ye, l as On, m as ys, n as Bn, o as co, p as qn, q as dl, r as ul, s as fl, t as pl, U as ml, L as gl, u as bl, H as vl, v as yl, w as kl, W as xl, A as Ml, x as zl } from "./three-DvEW5KnM.js";
(function() {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload"))
    return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
    a(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === "childList")
        for (const n of o.addedNodes)
          n.tagName === "LINK" && n.rel === "modulepreload" && a(n);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(i) {
    const o = {};
    return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o;
  }
  function a(i) {
    if (i.ep)
      return;
    i.ep = !0;
    const o = s(i);
    fetch(i.href, o);
  }
})();
function Al(e = document, t = window) {
  const s = (n) => {
    n.cancelable && n.preventDefault();
  };
  for (const n of ["gesturestart", "gesturechange", "gestureend"]) e.addEventListener(n, s, { passive: !1 });
  e.addEventListener("touchmove", (n) => {
    n.touches.length > 1 && s(n);
  }, { passive: !1 }), t.addEventListener("wheel", (n) => {
    n.ctrlKey && s(n);
  }, { passive: !1 });
  const a = t.visualViewport, i = e.querySelector('meta[name="viewport"]');
  if (!a || !i) return;
  let o = !1;
  a.addEventListener("resize", () => {
    if (a.scale <= 1.01 || o) return;
    const n = e.activeElement;
    if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return;
    o = !0;
    const r = i.getAttribute("content") ?? "";
    i.setAttribute("content", r + ", minimum-scale=1"), setTimeout(() => {
      i.setAttribute("content", r), o = !1;
    }, 300);
  });
}
const G = 256;
function Ve(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const ze = (e, t) => Math.trunc(e / t), _a = 10, Nn = 2, Tl = [30, 60, 90, 115, 135, 150], bs = ["food", "wood", "stone", "metal", "coins"], W = [
  { key: "villager", cls: "villager", hp: 25, atk: 3, armor: 0, range: 0.6, cd: 15, speed: 0.95, radius: 0.28, sight: 8, pop: 1, cost: { food: 50 }, time: 20, era: 0, hunt: 2.6 },
  { key: "warrior", cls: "infantry", hp: 40, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 40, wood: 20 }, time: 18, era: 0, next: "axeman" },
  { key: "hunter", cls: "ranged", hp: 30, atk: 4, armor: 0, range: 5, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 30 }, time: 20, era: 0, next: "archer", proj: "spear", muro: 25 },
  { key: "dog", cls: "scout", hp: 30, atk: 2, armor: 0, range: 0.6, cd: 10, speed: 1.9, radius: 0.25, sight: 12, pop: 1, cost: { food: 40 }, time: 15, era: 0, muro: 25 },
  { key: "axeman", cls: "infantry", hp: 55, atk: 7, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, wood: 25 }, time: 18, era: 1, next: "swordsman", muro: 200 },
  { key: "archer", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 20, speed: 1, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, wood: 40 }, time: 22, era: 1, next: "slinger", proj: "arrow", muro: 25 },
  { key: "spearman", cls: "spear", hp: 50, atk: 5, armor: 1, range: 0.9, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 35, wood: 25 }, time: 18, era: 1, bonus: [{ vs: "animal", dmg: 6 }, { vs: "cavalry", dmg: 8 }], muro: 50 },
  { key: "deer", cls: "animal", hp: 12, atk: 0, armor: 0, range: 0, cd: 10, speed: 0.9, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 150, mode: "flee", run: 1.8 } },
  { key: "boar", cls: "animal", hp: 40, atk: 3, armor: 0, range: 0.7, cd: 15, speed: 0.8, radius: 0.32, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 250, mode: "fight", run: 1.6 } },
  { key: "wolf", cls: "animal", hp: 20, atk: 3, armor: 0, range: 0.7, cd: 12, speed: 1.1, radius: 0.3, sight: 5, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 0, mode: "predator", run: 2 } },
  { key: "aurochs", cls: "animal", hp: 60, atk: 5, armor: 1, range: 0.8, cd: 15, speed: 0.7, radius: 0.45, sight: 6, pop: 0, cost: {}, time: 0, era: 0, animal: { food: 400, mode: "fight", run: 1.4 } },
  { key: "barbarian", cls: "infantry", hp: 45, atk: 5, armor: 0, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 0, cost: {}, time: 0, era: 0 },
  // Era III (M2)
  { key: "swordsman", cls: "infantry", hp: 60, atk: 8, armor: 1, range: 0.7, cd: 15, speed: 0.95, radius: 0.3, sight: 7, pop: 1, cost: { food: 45, metal: 20 }, time: 20, era: 2, bonus: [{ vs: "spear", dmg: 3 }] },
  { key: "slinger", cls: "ranged", hp: 32, atk: 5, armor: 0, range: 6, cd: 18, speed: 1.05, radius: 0.28, sight: 8, pop: 1, cost: { food: 30, stone: 25 }, time: 20, era: 2, proj: "stone", bonus: [{ vs: "infantry", dmg: 2 }], muro: 50 },
  { key: "horseman", cls: "cavalry", hp: 90, atk: 8, armor: 1, range: 0.8, cd: 15, speed: 1.75, radius: 0.45, sight: 9, pop: 2, cost: { food: 60, metal: 35 }, time: 26, era: 2, bonus: [{ vs: "ranged", dmg: 4 }, { vs: "siege", dmg: 10 }], muro: 50 },
  { key: "ram", cls: "siege", hp: 160, atk: 35, armor: 4, range: 1.15, cd: 30, speed: 0.5, radius: 0.6, sight: 5, pop: 3, cost: { wood: 150, metal: 30 }, time: 35, era: 2, siege: !0, muro: 200 }
], pt = Object.fromEntries(W.map((e, t) => [e.key, t])), gt = 60, at = 100, ct = [
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
  { key: "wall", hp: 450, size: 1, sight: 2, cost: { stone: 8 }, time: 6, era: 2, buildable: !0, wall: !0 },
  // muralha de pedra (D35: 300 → 450 de vida)
  { key: "tower", hp: 450, size: 2, sight: 9, cost: { wood: 60, stone: 120 }, time: 50, era: 2, buildable: !0, tower: { atk: 6, range: 7, cd: 20 } },
  // muros (D35): paliçada de madeira no Neolítico; a partir da Idade dos Metais, a muralha de pedra (acima)
  { key: "palisade", hp: 200, size: 1, sight: 2, cost: { wood: 4 }, time: 4, era: 1, buildable: !0, wall: !0, next: "wall" }
], Nt = Object.fromEntries(ct.map((e, t) => [e.key, t])), ho = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], Ke = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 }
  // Era IV: chega no M3
], os = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], ce = 200, Wa = Object.fromEntries(os.map((e, t) => [e.key, t])), Re = { give: 100, get: 60, fair: 85 }, $l = 300, ns = ["food", "wood", "stone", "metal"], Es = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28 }, Sl = 10, uo = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], de = 6, Mt = -1, ge = 60 * _a, Rn = (e) => e === "beta" ? "beta" : "normal", So = [12, 16, 19, 23, 26, 30], Cl = 4, wl = 4, El = 4, Co = [100, 160, 180, 200, 220, 240], Pl = [15], Il = 130;
function es(e, t, s) {
  let a = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(s | 0, 1442695041) | 0;
  return a = Math.imul(a ^ a >>> 13, 1274126177), ((a ^ a >>> 16) >>> 0) / 4294967296;
}
const wo = (e) => e * e * (3 - 2 * e);
function Ol(e, t, s) {
  const a = Math.floor(e), i = Math.floor(t), o = e - a, n = t - i, r = wo(o), l = wo(n), c = es(a, i, s), h = es(a + 1, i, s), f = es(a, i + 1, s), d = es(a + 1, i + 1, s);
  return c + (h - c) * r + (f - c) * l + (c - h - f + d) * r * l;
}
function ms(e, t, s, a = 4) {
  let i = 0, o = 0.5, n = 1, r = 0;
  for (let l = 0; l < a; l++)
    i += o * Ol(e * n, t * n, s + l * 31), r += o, o *= 0.5, n *= 2.03;
  return i / r;
}
const Rs = (e, t, s) => e < t ? t : e > s ? s : e, Se = (e, t, s) => {
  const a = Rs((s - e) / (t - e), 0, 1);
  return a * a * (3 - 2 * a);
}, hs = (e, t, s) => e + (t - e) * s;
class Fn {
  constructor(t) {
    m(this, "a");
    m(this, "b");
    m(this, "c");
    m(this, "d");
    this.a = 2654435769, this.b = 608135816, this.c = 3084996962, this.d = t >>> 0;
    for (let s = 0; s < 16; s++) this.next();
  }
  next() {
    let t = this.a | 0, s = this.b | 0, a = this.c | 0, i = this.d | 0;
    const o = (t + s | 0) + i | 0;
    return i = i + 1 | 0, t = s ^ s >>> 9, s = a + (a << 3) | 0, a = a << 21 | a >>> 11, a = a + o | 0, this.a = t, this.b = s, this.c = a, this.d = i, o >>> 0;
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
const Ze = 0, Ga = 1, ks = 2, ss = 3, Qe = 4, Fe = 5, oa = (e) => e === ss || e === Qe || e === Fe, fo = 2, Dn = 1, Ni = 2, Ln = 3, ie = 1, Le = 2, $e = 3, Be = 1.4142135623730951, Va = 1.7320508075688772, Bl = 0.585, li = 8.5, ql = 1 / (0.66 * 0.66) - 1, Eo = 2, ka = (e, t) => Math.sqrt(e * e + t * t), jn = { 2: [0, 1], 3: [0.5, Va / 2], 4: [Be / 2, Be / 2] }, Nl = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Va / 2], [-1, 0], [0.5, -Va / 2]],
  4: [[Be / 2, Be / 2], [-Be / 2, Be / 2], [-Be / 2, -Be / 2], [Be / 2, -Be / 2]]
};
function yi(e, t, s) {
  const [a, i] = jn[s];
  for (let o = 0; o < 24; o++) {
    if (t < 0) {
      t = -t;
      continue;
    }
    if (a * t - i * e > 1e-9) {
      const r = e * a + t * i;
      e = 2 * r * a - e, t = 2 * r * i - t;
      continue;
    }
    break;
  }
  return [e, t];
}
function Hn(e, t, s = fo) {
  const a = Rs(t, 2, 4), i = a === 2 ? 192 : 256, o = i / 2, n = s >= 2, r = 2, l = i / r + 1, c = new Float32Array(l * l), h = i * (a === 2 ? 0.32 : 0.36), f = 13, d = i * 0.075, [u, g] = jn[a], b = [u * h, g * h], k = [i * 0.21, i * 0.4], y = (E, F) => {
    const [L, D] = yi(E, F, a), j = Math.sqrt(L * L + D * D);
    let _ = (ms(L * 0.02 + 7.3, D * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (ms(L * 0.08, D * 0.08, e + 9, 2) - 0.5) * 1.2;
    const st = Math.max(Math.abs(E), Math.abs(F)) / o;
    _ += Se(0.8, 0.98, st) * 20 * (0.6 + 0.4 * ms(L * 0.04, D * 0.04, e + 3, 2));
    const ft = D, yt = 2.5 + (ms(L * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (j > d * 0.8) {
      let te = 0;
      for (const ne of k) te = Math.max(te, 1 - Se(3, 6, Math.abs(j - ne)));
      const re = hs(-2.2, -0.35, te);
      if (n) {
        let ne = 0;
        for (const cs of k) ne = Math.max(ne, 1 - Se(5, 11, Math.abs(j - cs)));
        _ = hs(_, Math.min(_, 1), Se(yt + 9 + 12 * ne, yt + 3, ft) * (0.75 + 0.25 * ne)), _ = hs(re, _, Se(yt, yt + 6.5 + 4 * ne, ft));
      } else
        _ = hs(_, Math.min(_, 1), Se(yt + 9, yt + 3, ft) * 0.75), _ = hs(re, _, Se(yt, yt + 6.5, ft));
    }
    _ = hs(-2.6, _, Se(d, d + 10, j));
    const Pt = ka(L - b[0], D - b[1]);
    return _ = hs(2.2, _, Se(f, f + 8, Pt)), _;
  };
  for (let E = 0; E < l; E++) for (let F = 0; F < l; F++) c[E * l + F] = y(F * r - o, E * r - o);
  const M = (E, F) => {
    const L = Rs(E / r, 0, l - 1.001), D = Rs(F / r, 0, l - 1.001), j = Math.floor(L), _ = Math.floor(D), st = L - j, ft = D - _, ot = c[_ * l + j], yt = c[_ * l + j + 1], Pt = c[(_ + 1) * l + j], te = c[(_ + 1) * l + j + 1];
    return ot + (yt - ot) * st + (Pt - ot) * ft + (ot - yt - Pt + te) * st * ft;
  }, v = (E, F, L) => L >= 0.5 && E * E + F * F > ql * r * r, z = (E, F) => {
    const L = (E + 0.5) / r, D = (F + 0.5) / r, j = Math.floor(L), _ = Math.floor(D), st = L - j + D - _, ft = c[_ * l + j], ot = c[_ * l + j + 1], yt = c[(_ + 1) * l + j], Pt = c[(_ + 1) * l + j + 1];
    return st <= 1 && v(ot - ft, yt - ft, (ft + ot + yt) / 3) || st >= 1 && v(Pt - yt, Pt - ot, (ot + yt + Pt) / 3);
  }, N = (E, F) => {
    const L = E >> 1, D = F >> 1, j = E & 1, _ = F & 1, st = c[D * l + L], ft = c[D * l + L + 1], ot = c[(D + 1) * l + L], yt = c[(D + 1) * l + L + 1], Pt = v(ft - st, ot - st, (st + ft + ot) / 3), te = v(yt - ot, yt - ft, (ft + ot + yt) / 3), re = v(ft - st, yt - ft, (st + ft + yt) / 3), ne = v(yt - ot, ot - st, (st + ot + yt) / 3);
    return j === _ ? Pt && j === 0 || te && j === 1 || re || ne : Pt || te || (j === 1 ? re : ne);
  }, A = new Uint8Array(i * i), I = new Uint8Array(i * i), B = new Uint16Array(i * i), P = [];
  for (let E = 0; E < i; E++) for (let F = 0; F < i; F++) {
    const L = M(F + 0.5, E + 0.5), D = E * i + F, j = Math.abs(M(F + 1, E + 0.5) - M(F, E + 0.5)) + Math.abs(M(F + 0.5, E + 1) - M(F + 0.5, E));
    L < -0.9 ? A[D] = ss : L < -0.05 ? A[D] = ks : L < 0.55 ? A[D] = Ga : j > 2.2 ? A[D] = Qe : A[D] = Ze;
  }
  const R = Nl[a].map(([E, F]) => ({ x: Math.round(o + E * h), z: Math.round(o + F * h), ux: E, uz: F })), $ = (E, F, L) => R.some((D) => ka(E - D.x, F - D.z) < L);
  for (let E = 1; E < i - 1; E++) for (let F = 1; F < i - 1; F++) {
    const L = E * i + F;
    if (A[L] !== Ze) continue;
    const [D, j] = yi(F + 0.5 - o, E + 0.5 - o, a), _ = ka(D, j);
    let st = ms(D * 0.045 + 13, j * 0.045 - 7, e + 5, 3);
    const ft = ka(D - u * (h + 18), j - g * (h + 18));
    st += Se(16, 6, ft) * 0.35, st += Se(14, 8, j) * -0.25, _ < d + 10 && (st -= 0.3);
    const ot = M(F + 0.5, E + 0.5);
    st > Bl && !$(F, E, 15) && es(Math.round(D * 4), Math.round(j * 4), e + 77) > 0.12 ? (I[L] = ot > 9 ? Ln : es(Math.round(D * 3), Math.round(j * 3), e + 78) < 0.14 ? Ni : Dn, B[L] = 100) : es(Math.round(D * 2), Math.round(j * 2), e + 79) < 0.012 && !$(F, E, 11) && ot < 8 && (I[L] = Ni, B[L] = 100);
  }
  if (n) for (let E = 0; E < i; E++) for (let F = 0; F < i; F++) {
    const L = E * i + F;
    A[L] === Ze && M(F + 0.5, E + 0.5) > li && (A[L] = Fe);
  }
  if (a === 2 || a === 4) {
    const E = (L, D) => {
      let j = Math.abs(2 * L - (i - 1)), _ = Math.abs(2 * D - (i - 1));
      if (a === 4 && _ > j) {
        const st = j;
        j = _, _ = st;
      }
      return (_ + i - 1) / 2 * i + (j + i - 1) / 2;
    };
    for (let L = 0; L < i; L++) for (let D = 0; D < i; D++) {
      const j = L * i + D, _ = E(D, L);
      _ !== j && (A[j] = A[_], I[j] = I[_], B[j] = B[_]);
    }
    const F = (l - 1) / 2;
    for (let L = 0; L < l; L++) for (let D = 0; D < l; D++) {
      let j = Math.abs(D - F), _ = Math.abs(L - F);
      if (a === 4 && _ > j) {
        const st = j;
        j = _, _ = st;
      }
      c[L * l + D] = c[(_ + F) * l + j + F];
    }
  }
  if (n) for (let E = 0; E < i; E++) for (let F = 0; F < i; F++) {
    const L = E * i + F;
    (A[L] === Ze || A[L] === Fe) && N(F, E) && (A[L] = z(F, E) ? Qe : Fe, I[L] = 0, B[L] = 0);
  }
  const T = (E, F, L) => {
    if (a === 2) return E === 0 ? [F, L] : [i - 1 - F, i - 1 - L];
    if (a === 4) {
      let ft = F, ot = L;
      for (let yt = 0; yt < E; yt++) {
        const Pt = ft;
        ft = i - 1 - ot, ot = Pt;
      }
      return [ft, ot];
    }
    let D = F + 0.5 - o, j = L + 0.5 - o;
    const _ = -0.5, st = Va / 2;
    for (let ft = 0; ft < E; ft++) {
      const ot = D * _ - j * st;
      j = D * st + j * _, D = ot;
    }
    return [Math.floor(D + o), Math.floor(j + o)];
  }, w = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], O = new Fn(e ^ 24301), S = (E, F, L, D) => {
    if (F < 1 || L < 1 || F >= i - 1 || L >= i - 1) return;
    const j = L * i + F;
    A[j] === ss || A[j] === ks || P.some((_) => _.x === F && _.z === L) || (I[j] = 0, B[j] = 0, !n && A[j] === Qe && (A[j] = Ze), P.push({ kind: E, x: F, z: L, amount: D }));
  }, C = R[0];
  -C.uz, C.ux;
  const U = (E, F, L, D, j, _, st) => {
    const ft = [];
    for (let ot = 0; ot < st; ot++) {
      const [yt, Pt] = w[ot % w.length];
      ft.push([Math.round(E + L * (j + yt) + -D * (_ + Pt) - 0.5), Math.round(F + D * (j + yt) + L * (_ + Pt) - 0.5)]);
    }
    return ft;
  }, H = [
    { kind: ie, amount: 125, tiles: U(C.x, C.z, C.ux, C.uz, -5, 6, 6) },
    { kind: Le, amount: 350, tiles: U(C.x, C.z, C.ux, C.uz, -9, -8, 5) },
    { kind: $e, amount: 400, tiles: U(C.x, C.z, C.ux, C.uz, -15, 14, 5) },
    { kind: $e, amount: 800, tiles: U(o, o, C.ux, C.uz, d + 12, 0, 6) },
    { kind: Le, amount: 500, tiles: U(o, o, C.ux, C.uz, d + 22, 6, 4) }
  ];
  for (let E = 0; E < a; E++) for (const F of H) for (const [L, D] of F.tiles) {
    const [j, _] = T(E, L, D);
    S(F.kind, j, _, F.amount);
  }
  for (const E of R) for (let F = -8; F <= 7; F++) for (let L = -8; L <= 7; L++) {
    if ((L + 0.5) ** 2 + (F + 0.5) ** 2 >= 50) continue;
    const D = (E.z + F) * i + E.x + L;
    I[D] = 0, B[D] = 0;
  }
  O.next();
  const J = (E, F) => E > 1 && F > 1 && E < i - 2 && F < i - 2 && (A[F * i + E] === Ze || A[F * i + E] === Ga) && !I[F * i + E] && !P.some((L) => L.x === E && L.z === F), ut = (E, F, L = 8) => {
    for (let D = 0; D < L; D++) for (let j = -D; j <= D; j++) for (let _ = -D; _ <= D; _++)
      if (Math.max(Math.abs(_), Math.abs(j)) === D && J(E + _, F + j))
        return [E + _, F + j];
    return [E, F];
  }, $t = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: d + 30, v: 12, n: 3, r: 6 }
  ], At = [], it = [], tt = (E) => U(E.base === "s" ? C.x : o, E.base === "s" ? C.z : o, C.ux, C.uz, E.u, E.v, 1)[0], [X, _t] = U(o, o, C.ux, C.uz, d + 36, 0, 1)[0], ue = n ? $t.map((E) => {
    const [F, L] = tt(E), D = Array.from({ length: E.n }, (j, _) => {
      const [st, ft] = w[_ % w.length];
      return ut(F + st, L + ft, 24);
    });
    return { casa: J(F, L) ? [F, L] : D[0], spots: D };
  }) : null, Wt = n ? ut(X, _t) : null, wt = (E, [F, L]) => {
    const [D, j] = T(E, F, L);
    return J(D, j) ? [D, j] : ut(D, j, 24);
  };
  for (let E = 0; E < a; E++) {
    $t.forEach((D, j) => {
      if (ue) {
        const [Pt, te] = T(E, ue[j].casa[0], ue[j].casa[1]);
        At.push({ kind: D.kind, x: Pt + 0.5, z: te + 0.5, r: D.r, spots: ue[j].spots.map((re) => wt(E, re)) });
        return;
      }
      const [_, st] = tt(D), [ft, ot] = T(E, _, st), yt = [];
      for (let Pt = 0; Pt < D.n; Pt++) {
        const [te, re] = w[Pt % w.length], [ne, cs] = T(E, _ + te, st + re);
        yt.push(ut(ne, cs));
      }
      At.push({ kind: D.kind, x: ft + 0.5, z: ot + 0.5, r: D.r, spots: yt });
    });
    const [F, L] = Wt ? wt(E, Wt) : ut(...T(E, X, _t));
    for (let D = -4; D <= 4; D++) for (let j = -4; j <= 4; j++) {
      const _ = (L + D) * i + F + j;
      _ >= 0 && _ < i * i && (I[_] = 0, B[_] = 0);
    }
    it.push({ x: F, z: L, player: E });
  }
  const oe = Xt();
  return { size: i, seed: e, players: a, versao: s, trilhas: oe, hn: l, hstep: r, heights: c, terrain: A, tree: I, wood: B, res: P, starts: R, herds: At, camps: it };
  function Xt() {
    const E = i * i, F = 1073741823, L = [1, -1, 0, 0, 1, 1, -1, -1], D = [0, 0, 1, -1, 1, -1, 1, -1], j = new Uint8Array(E);
    for (const V of P) j[V.z * i + V.x] = 1;
    const _ = new Int32Array(E), st = new Int32Array(E), ft = new Int32Array(E), ot = new Float64Array(8 * E + 8), yt = (V) => {
      for (let Z = 0; Z < i; Z++) for (let Y = 0; Y < i; Y++) {
        const rt = Z * i + Y, bt = A[rt];
        if (Y < 2 || Z < 2 || Y >= i - 2 || Z >= i - 2 || bt === ss || j[rt]) {
          _[rt] = -1;
          continue;
        }
        if (bt === Qe || bt === Fe) {
          _[rt] = V;
          continue;
        }
        let kt = 10 + Math.floor(ms(Y * 0.13, Z * 0.13, e + 91, 2) * 24);
        I[rt] && (kt += 60);
        const xt = M(Y + 0.5, Z + 0.5);
        xt > 4 && (kt += Math.floor((xt - 4) * 30)), !n && z(Y, Z) && (kt += 300), _[rt] = kt;
      }
    }, Pt = (V, Z) => {
      st.fill(F), ft.fill(-1);
      let Y = 0;
      const rt = (bt) => {
        let kt = Y++;
        for (; kt > 0; ) {
          const xt = kt - 1 >> 1;
          if (ot[xt] <= bt) break;
          ot[kt] = ot[xt], kt = xt;
        }
        ot[kt] = bt;
      };
      for (st[V] = 0, rt(V); Y; ) {
        const bt = ot[0], kt = ot[--Y];
        if (Y) {
          let Ft = 0;
          for (; ; ) {
            const Ie = 2 * Ft + 1;
            if (Ie >= Y) break;
            const ws = Ie + 1, je = ws < Y && ot[ws] < ot[Ie] ? ws : Ie;
            if (ot[je] >= kt) break;
            ot[Ft] = ot[je], Ft = je;
          }
          ot[Ft] = kt;
        }
        const xt = bt % 65536, Vt = (bt - xt) / 65536;
        if (Vt > st[xt]) continue;
        if (Z && Z[xt]) return xt;
        const xe = xt % i, Et = (xt - xe) / i;
        for (let Ft = 0; Ft < 8; Ft++) {
          const Ie = xe + L[Ft], ws = Et + D[Ft], je = ws * i + Ie, bi = _[je];
          if (bi < 0 || Ft >= 4 && (_[Et * i + Ie] < 0 || _[ws * i + xe] < 0)) continue;
          const vi = Vt + (Ft >= 4 ? Math.floor(bi * 14 / 10) : bi);
          vi < st[je] && (st[je] = vi, ft[je] = xt, rt(vi * 65536 + je));
        }
      }
      return -1;
    }, te = (V) => {
      let Z = -1, Y = F;
      for (const rt of V) rt >= 0 && rt < E && st[rt] < Y && (Y = st[rt], Z = rt);
      return Z;
    }, re = (V, Z) => L.map((Y, rt) => (Z + D[rt]) * i + V + Y), ne = (V, Z, Y) => {
      for (let rt = 0; rt <= 8; rt++) for (let bt = -rt; bt <= rt; bt++) for (let kt = -rt; kt <= rt; kt++) {
        if (Math.max(Math.abs(kt), Math.abs(bt)) !== rt) continue;
        const xt = V + kt, Vt = Z + bt;
        if (xt >= 0 && Vt >= 0 && xt < i && Vt < i && Y(Vt * i + xt)) return Vt * i + xt;
      }
      return -1;
    }, cs = (V, Z) => {
      let Y = 0, rt = 1 / 0;
      return R.forEach((bt, kt) => {
        const xt = (bt.x - V) * (bt.x - V) + (bt.z - Z) * (bt.z - Z);
        xt < rt && (rt = xt, Y = kt);
      }), Y;
    };
    yt(-1), Pt(C.z * i + C.x);
    const Vs = [];
    for (const [V, Z] of [[1, 0], [2 * u * u - 1, 2 * u * g]]) for (const Y of k)
      Vs.push(ne(Math.floor(o + V * Y), Math.floor(o + Z * Y), (rt) => A[rt] === ks && st[rt] < F));
    for (const V of P) cs(V.x, V.z) === 0 && Vs.push(te(re(V.x, V.z)));
    Vs.push(ne(it[0].x, it[0].z, (V) => st[V] < F));
    for (let V = 0; V < $t.length; V++) Vs.push(te(At[V].spots.flatMap(([Z, Y]) => re(Z, Y))));
    const el = Vs.filter((V) => V >= 0 && st[V] < F).sort((V, Z) => st[V] - st[Z] || V - Z), ya = new Uint8Array(E);
    ya[C.z * i + C.x] = 1;
    const To = [];
    for (const V of el) {
      if (ya[V]) continue;
      const Z = Pt(V, ya);
      if (!(Z < 0))
        for (let Y = Z; Y >= 0; Y = ft[Y])
          ya[Y] = 1, To.push(Y);
    }
    const pi = new Uint8Array(E);
    for (const V of To) {
      const Z = V % i, Y = (V - Z) / i;
      for (let rt = 0; rt < a; rt++) {
        const [bt, kt] = T(rt, Z, Y);
        bt >= 0 && kt >= 0 && bt < i && kt < i && (pi[kt * i + bt] = 1);
      }
    }
    const Ks = new Uint8Array(E).fill(255), Cs = new Int32Array(E);
    let $o = 0, mi = 0;
    for (let V = 0; V < E; V++) pi[V] && (Ks[V] = 0, Cs[mi++] = V);
    for (; $o < mi; ) {
      const V = Cs[$o++], Z = Ks[V];
      if (Z >= Eo) continue;
      const Y = V % i, rt = (V - Y) / i;
      for (let bt = 0; bt < 8; bt++) {
        const kt = Y + L[bt], xt = rt + D[bt];
        if (kt < 0 || xt < 0 || kt >= i || xt >= i) continue;
        const Vt = xt * i + kt;
        Ks[Vt] > Z + 1 && (Ks[Vt] = Z + 1, Cs[mi++] = Vt);
      }
    }
    for (let V = 0; V < E; V++) {
      const Z = Ks[V];
      if (!I[V] || Z > Eo) continue;
      const Y = V % i, rt = (V - Y) / i, [bt, kt] = yi(Y + 0.5 - o, rt + 0.5 - o, a);
      (Z <= 1 || es(Math.round(bt * 2), Math.round(kt * 2), e + 93) < 0.45) && (I[V] = 0, B[V] = 0);
    }
    const gi = (V) => !oa(A[V]) && !I[V] && !j[V], Ys = new Uint8Array(E), sl = (V) => {
      Ys.fill(0);
      let Z = 0, Y = 0;
      for (Ys[V] = 1, Cs[Y++] = V; Z < Y; ) {
        const rt = Cs[Z++], bt = rt % i, kt = (rt - bt) / i;
        for (let xt = 0; xt < 8; xt++) {
          const Vt = bt + L[xt], xe = kt + D[xt];
          if (Vt < 1 || xe < 1 || Vt >= i - 1 || xe >= i - 1) continue;
          const Et = xe * i + Vt;
          Ys[Et] || !gi(Et) || xt >= 4 && (!gi(kt * i + Vt) || !gi(xe * i + bt)) || (Ys[Et] = 1, Cs[Y++] = Et);
        }
      }
    }, al = (V) => {
      for (let Z = V; Z >= 0; Z = ft[Z]) {
        (A[Z] === Qe || A[Z] === Fe) && (A[Z] = Ze);
        for (const Y of [Z, Z - 1, Z + 1, Z - i, Z + i]) Y >= 0 && Y < E && I[Y] && (I[Y] = 0, B[Y] = 0);
      }
    };
    for (let V = 0; V < 3; V++) {
      let Z = !1;
      for (let Y = 0; Y < a; Y++) {
        const rt = R[Y], bt = rt.z * i + rt.x, kt = R[(Y + 1) % a];
        sl(bt);
        const xt = [[kt.z * i + kt.x], [it[Y].z * i + it[Y].x]], Vt = (Et) => Et >= 0 && Et < E && A[Et] !== ss && !j[Et];
        for (const Et of P) cs(Et.x, Et.z) === Y && xt.push(re(Et.x, Et.z).filter(Vt));
        for (const Et of At) cs(Et.x, Et.z) === Y && xt.push(Et.spots.flatMap(([Ft, Ie]) => [Ie * i + Ft, ...re(Ft, Ie)]).filter(Vt));
        const xe = xt.filter((Et) => !Et.some((Ft) => Ys[Ft]));
        if (xe.length) {
          Z = !0, yt(V ? 500 : -1), Pt(bt), globalThis.__trilhaLog?.push(`volta ${V} jogador ${Y}: ${xe.map((Et) => Et.slice(0, 1).map((Ft) => `${Ft % i},${(Ft - Ft % i) / i}`).join("")).join(" | ")}`);
          for (const Et of xe) {
            const Ft = te(Et);
            Ft >= 0 && al(Ft);
          }
        }
      }
      if (!Z) break;
    }
    return pi;
  }
}
function mt(e, t, s) {
  const a = Rs(t / e.hstep, 0, e.hn - 1.001), i = Rs(s / e.hstep, 0, e.hn - 1.001), o = Math.floor(a), n = Math.floor(i), r = a - o, l = i - n, c = e.hn, h = e.heights, f = h[n * c + o], d = h[n * c + o + 1], u = h[(n + 1) * c + o], g = h[(n + 1) * c + o + 1];
  return r + l <= 1 ? f + (d - f) * r + (u - f) * l : g + (u - g) * (1 - r) + (d - g) * (1 - l);
}
const Rl = ["food", "wood", "stone", "metal"], Hs = (e) => e.season === 3, ae = (e, t, s, a, i) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: s, x: a, z: i });
};
function Fl(e) {
  uc(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const s = e.kind[t];
    s >= at ? cc(e, t) : s < gt && (e.owner[t] === Mt ? rc(e, t) : Dl(e, t));
  }
  oc(e), pc(e), e.tick % 50 === 25 && gc(e);
}
const ci = (e, t) => e.tick < e.firme[t], Un = (e, t) => t === de || !!e.players[t]?.ai;
function Dl(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, e.kind[t] === pt.villager && (e.tick + t) % 5 === 0 && Hl(e, t), e.foodMode[t] && tc(e, t), e.task[t]) {
    case jt:
      Yl(e, t);
      break;
    case ke:
      ec(e, t);
      break;
    case Rt:
      Zn(e, t);
      break;
    case Ss:
      Wl(e, t);
      break;
    case Ms:
      break;
    // correndo (a vigia cuida)
    default:
      _l(e, t);
  }
}
const Ri = 16, Ll = 4;
function jl(e, t) {
  const s = e.owner[t];
  let a = 0, i = 0, o = 0;
  return e.near(e.x[t], e.z[t], W[e.kind[t]].sight, (n) => {
    const r = e.owner[n];
    if (!e.isUnit(n) || r === Mt || e.kind[n] === pt.villager || W[e.kind[n]].siege || !e.hostile(s, r) || !W[e.kind[n]].proj && e.muroNaLinha(e.x[n], e.z[n], e.x[t], e.z[t], r)) return;
    const l = e.x[t] - e.x[n], c = e.z[t] - e.z[n], h = Ve(l * l + c * c) || 1;
    a += ze(l * G, h), i += ze(c * G, h), o++;
  }), o ? [a, i] : null;
}
function Hl(e, t) {
  const s = e.task[t] === Ms;
  if (ci(e, t)) {
    s && Po(e, t);
    return;
  }
  const a = jl(e, t);
  if (!a) {
    s && ++e.fails[t] >= Ll && Po(e, t);
    return;
  }
  if (!s) {
    const i = e.task[t] === Ot;
    if (e.fugaDe[t] = e.task[t] + 1 + (i ? Ri : 0), i) {
      const n = e.state[t] === Yt;
      e.amx[t] = n ? e.slotX[t] : e.x[t], e.amz[t] = n ? e.slotZ[t] : e.z[t];
    }
    e.task[t] = Ms, e.alvo2[t] = -1;
    const o = e.owner[t];
    e.players[o] && e.tick - (e.avisoFuga[o] ?? -1e9) > 300 && (e.avisoFuga[o] = e.tick, ae(e, o, "fuga", e.x[t], e.z[t]));
  }
  e.fails[t] = 0, (!s || e.state[t] === It || (e.tick + t) % 20 === 0) && Ul(e, t, a);
}
function Ul(e, t, [s, a]) {
  const i = Ve(s * s + a * a), o = hi(e, t);
  if (o >= 0 && e.reach(t, o, !1) > 2 * G && (i === 0 || (e.x[o] - e.x[t]) * s + (e.z[o] - e.z[t]) * a > 0)) {
    e.goNear(t, o, !1);
    return;
  }
  if (i === 0) return;
  const n = e.size * G - 1;
  e.goPoint(t, Math.min(n, Math.max(0, e.x[t] + ze(s * 7 * G, i))), Math.min(n, Math.max(0, e.z[t] + ze(a * 7 * G, i))));
}
function Po(e, t) {
  const s = e.fugaDe[t], a = (s & Ri - 1) - 1;
  if (e.fugaDe[t] = 0, e.fails[t] = 0, e.task[t] === Ms && (e.task[t] = a >= 0 && a !== Ms ? a : Ot, e.state[t] = It, e.path[t] = null, e.field[t] = null, e.task[t] === Ot && s & Ri)) {
    const i = e.amx[t] - e.x[t], o = e.amz[t] - e.z[t];
    i * i + o * o > G * G && e.goPoint(t, e.amx[t], e.amz[t]);
  }
}
const Fs = 0, _n = 1, Wn = 2, Gn = 3;
function Vn(e, t, s) {
  return W[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === s;
}
function Fi(e, t, s) {
  return e.isBuilding(s) ? W[e.kind[t]].siege ? Fs : Wn : e.owner[s] === Mt ? Vn(e, s, e.owner[t]) ? Fs : Gn : e.kind[s] === pt.villager ? _n : Fs;
}
function po(e, t, s, a = !1, i = Gn) {
  const o = e.owner[t], n = W[e.kind[t]].siege;
  let r = -1, l = 99, c = 1 / 0;
  const h = (d, u) => {
    if (u >= i || u > l) return;
    const g = e.x[d] - e.x[t], b = e.z[d] - e.z[t], k = g * g + b * b;
    (u < l || k < c) && (l = u, c = k, r = d);
  };
  n || e.near(e.x[t], e.z[t], s, (d) => {
    if (d === t || !e.isUnit(d) || e.ignoreT[t] === d && e.tick < e.ignoreUntil[t]) return;
    const u = e.owner[d];
    (u === Mt ? !Vn(e, d, o) : !e.hostile(o, u)) || h(d, u !== Mt && e.kind[d] === pt.villager ? _n : Fs);
  });
  const f = n ? Fs : Wn;
  if ((a || n) && f < i && l > f) {
    const d = (s * G) ** 2;
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.hostile(o, e.owner[u]) && !e.bdef(u).wall && !(e.ignoreT[t] === u && e.tick < e.ignoreUntil[t])) {
      const g = e.x[u] - e.x[t], b = e.z[u] - e.z[t];
      g * g + b * b < d && h(u, f);
    }
  }
  return r;
}
function Kn(e, t, s) {
  const a = e.state[t] === Yt;
  a && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = Rt, e.tgt[t] = s, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = a ? 10 : 8;
}
function _l(e, t) {
  if (e.kind[t] === pt.villager || (e.tick + t) % 5 || ci(e, t)) return;
  const s = po(e, t, W[e.kind[t]].sight, e.state[t] !== Yt);
  s >= 0 && Kn(e, t, s);
}
function Wl(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const s = po(e, t, W[e.kind[t]].sight, !0);
    if (s >= 0) {
      e.task[t] = Rt, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === It) {
    const s = e.amx[t] - e.x[t], a = e.amz[t] - e.z[t];
    if (s * s + a * a > (3 * G) ** 2 && e.fails[t]++ < 6) {
      if (e.goPoint(t, e.amx[t], e.amz[t]), e.lastPartial && !e.overBudget && Un(e, e.owner[t]) && !W[e.kind[t]].proj) {
        const i = e.amx[t] >> 8, o = e.amz[t] >> 8, n = e.muroNoCaminho(t, i, o, i, o);
        n >= 0 && (e.task[t] = Rt, e.tgt[t] = n, e.phase[t] = 9, e.fails[t] = 0, e.goNear(t, n, !1));
      }
    } else e.task[t] = Ot;
  }
}
function Gl(e, t, s) {
  if (e.isBuilding(s)) {
    const [o, n, r] = e.footprint(s);
    return e.muroNoCaminho(t, o - 1, n - 1, o + r, n + r);
  }
  const a = e.x[s] >> 8, i = e.z[s] >> 8;
  return e.muroNoCaminho(t, a - 1, i - 1, a + 1, i + 1);
}
function Vl(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function Di(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.tgtTile[t] ? Vl(e, s) : e.alive[s] ? e.kind[s] === gt ? e.work[s] > 0 : e.isBuilding(s) && e.done[s] === 1 && e.bdef(s).key === "farm" && e.owner[s] === e.owner[t] : !1;
}
function Li(e, t, s = -1) {
  let a = e.tgt[t];
  const i = e.size;
  if (a < -1 && (a = -1 - a), !e.tgtTile[t] && s < 0 && a >= 0 && (s = a), e.tgtTile[t] && a >= 0 && a < i * i) {
    const o = e.carryRes[t], n = e.map.tree[a] > 0 || o === na, r = e.resKind[a] || (o === zs ? ie : o === Ka ? Le : o === Ya ? $e : 0), l = a % i, c = (a - l) / i;
    for (const [h, f] of Us) {
      if (h * h + f * f > 100) break;
      const d = l + h, u = c + f;
      if (d < 0 || u < 0 || d >= i || u >= i) continue;
      const g = u * i + d;
      if (!(g === s || !e.open(g)) && (n ? e.map.tree[g] && e.resAmt[g] > 0 : r && e.resKind[g] === r && e.resAmt[g] > 0))
        return e.tgt[t] = g, e.tgtTile[t] = 1, e.phase[t] = Pe, e.fails[t] = 0, e.goNear(t, g, !0), !0;
    }
  } else if (a >= 0 && e.kind[a] === gt || e.carryRes[t] === zs) {
    let o = -1, n = (10 * G) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== s && e.alive[r] && e.kind[r] === gt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], c = e.z[r] - e.z[t], h = l * l + c * c;
      h < n && (n = h, o = r);
    }
    if (o >= 0)
      return e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = Pe, e.goNear(t, o, !1), !0;
  }
  return !1;
}
function hi(e, t) {
  const s = e.owner[t];
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === s && e.done[o] && e.bdef(o).drop) {
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function La(e, t) {
  const s = hi(e, t);
  if (e.dropB[t] = s, s < 0) {
    e.task[t] = Ot;
    return;
  }
  e.phase[t] = ga, e.fails[t] = 0, e.goNear(t, s, !1);
}
function Kl(e, t, s) {
  const a = e.tgt[t];
  let i;
  s ? i = Es.farm : e.tgtTile[t] ? e.map.tree[a] ? i = Es.wood : i = e.resKind[a] === ie ? Es.berry : e.resKind[a] === Le ? Es.stone : Es.metal : i = Es.carcass;
  let o = Math.round(i * 1e3);
  return e.beta && (o = Math.floor(o * Co[Math.min(e.players[e.owner[t]]?.era ?? 0, Co.length - 1)] / 100)), e.players[e.owner[t]]?.hunger && (o = Math.floor(o * 7 / 10)), e.players[e.owner[t]]?.ai && (o = Math.floor(o * [80, 100, 115][e.difficulty] / 100)), o;
}
function Yl(e, t) {
  if (e.phase[t] === ga) {
    Jl(e, t);
    return;
  }
  if (!Di(e, t)) {
    e.carry[t] > 0 ? La(e, t) : Li(e, t) || (e.task[t] = Ot);
    return;
  }
  const s = e.tgt[t], a = e.tgtTile[t] === 1, i = !a && e.kind[s] >= at, o = e.reach(t, s, a);
  if (e.phase[t] === Pe) {
    if (o <= (i ? 60 : a ? 330 : 220))
      e.phase[t] = ir, e.state[t] = It, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === It && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, s, a) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - s, Li(e, t, s) || (e.task[t] = Ot);
      }
    }
    return;
  }
  if (o > (i ? 140 : a ? 420 : 300)) {
    e.phase[t] = Pe, e.goNear(t, s, a);
    return;
  }
  if (i && Hs(e)) return;
  if (a && e.resKind[s] === ie && Hs(e)) {
    e.carry[t] > 0 ? La(e, t) : e.task[t] = Ot;
    return;
  }
  const n = a ? e.map.tree[s] ? na : e.resKind[s] === ie ? zs : e.resKind[s] === Le ? Ka : Ya : zs;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += Kl(e, t, i);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = i ? 1e9 : a ? e.resAmt[s] : e.work[s], c = e.carryCap(t);
  r = Math.min(r, l, c - e.carry[t]), r > 0 && (e.carry[t] += r, i || (a ? e.resAmt[s] -= r : e.work[s] -= r, (a ? e.resAmt[s] : e.work[s]) <= 0 && Xl(e, s, a))), (e.carry[t] >= c || !Di(e, t) && e.carry[t] > 0) && La(e, t);
}
function Xl(e, t, s) {
  if (!s) {
    e.remove(t);
    return;
  }
  const a = oa(e.map.terrain[t]) ? 1 : 0;
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, a), e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.setBlocked(t, a), e.events.push({ t: "res", k: t });
}
function Yn(e, t, s, a) {
  var o;
  const i = (o = e.obtido)[t] ?? (o[t] = [0, 0, 0, 0]);
  i[s] += a;
}
function Jl(e, t) {
  let s = e.dropB[t];
  if (s < 0 || !e.isBuilding(s) || !e.done[s] || e.owner[s] !== e.owner[t]) {
    if (s = hi(e, t), e.dropB[t] = s, s < 0) {
      e.task[t] = Ot;
      return;
    }
    e.goNear(t, s, !1);
  }
  if (e.reach(t, s, !1) <= 200) {
    const a = e.players[e.owner[t]];
    if (a && (a.res[Rl[e.carryRes[t]]] += e.carry[t], Yn(e, a.id, e.carryRes[t], e.carry[t])), e.carry[t] = 0, e.state[t] = It, e.path[t] = null, e.foodMode[t] && !Jn(e, t)) {
      const i = Hi(e, t);
      if (i) {
        Ui(e, t, i);
        return;
      }
    }
    Di(e, t) ? (e.phase[t] = Pe, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : Li(e, t) || (e.task[t] = Ot);
    return;
  }
  e.state[t] === It && (++e.fails[t] > 5 ? e.task[t] = Ot : e.goNear(t, s, !1));
}
const Zl = 30, Io = 0, Ql = 1, ji = 2, Xn = 3;
function Jn(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.task[t] === Rt ? e.isAnimal(s) && (W[e.kind[s]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[s] === ie && e.resAmt[s] > 0 && !Hs(e) : e.alive[s] ? e.kind[s] === gt ? e.work[s] > 0 : e.isBuilding(s) && e.bdef(s).key === "farm" && !Hs(e) : !1;
}
function Hi(e, t) {
  const s = e.owner[t], a = Hs(e), i = e.size, o = hi(e, t), n = o >= 0 ? e.x[o] : e.x[t], r = o >= 0 ? e.z[o] : e.z[t], l = (Zl * G) ** 2, c = (k, y) => {
    const M = k - n, v = y - r;
    return M * M + v * v <= l;
  }, h = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
  for (let k = 0; k < e.top; k++) if (k !== t && e.isUnit(k) && e.owner[k] === s && e.kind[k] === pt.villager && e.tgt[k] >= 0 && (e.task[k] === jt || e.task[k] === Rt)) {
    const y = e.task[k] === jt && e.tgtTile[k] ? f : h;
    y.set(e.tgt[k], (y.get(e.tgt[k]) ?? 0) + 1);
  }
  let d = -1, u = 1 / 0, g = Io;
  const b = (k, y, M, v) => {
    const z = y - e.x[t], N = M - e.z[t], A = z * z + N * N;
    A < u && (u = A, d = k, g = v);
  };
  for (let k = 0; k < e.top; k++) e.alive[k] && e.kind[k] === gt && e.work[k] > 0 && (h.get(k) ?? 0) < 4 && c(e.x[k], e.z[k]) && b(k, e.x[k], e.z[k], Io);
  if (d >= 0) return { t: d, how: g };
  if (!a) {
    for (let k = 0; k < e.top; k++) e.isBuilding(k) && e.owner[k] === s && e.done[k] && e.bdef(k).key === "farm" && !h.has(k) && b(k, e.x[k], e.z[k], Ql);
    if (d >= 0) return { t: d, how: g };
    for (const k of e.map.res) {
      const y = k.z * i + k.x;
      if (e.resKind[y] !== ie || e.resAmt[y] <= 0 || (f.get(y) ?? 0) >= 2 || !e.open(y)) continue;
      const M = k.x * G + 128, v = k.z * G + 128;
      c(M, v) && b(y, M, v, ji);
    }
    if (d >= 0) return { t: d, how: g };
  }
  for (let k = 0; k < e.top; k++) e.isAnimal(k) && W[e.kind[k]].animal.mode === "flee" && (h.get(k) ?? 0) < 2 && c(e.x[k], e.z[k]) && b(k, e.x[k], e.z[k], Xn);
  return d >= 0 ? { t: d, how: g } : null;
}
function Ui(e, t, s) {
  if (e.fails[t] = 0, e.phase[t] = Pe, e.tgt[t] = s.t, s.how === Xn) {
    e.task[t] = Rt, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, s.t, !1);
    return;
  }
  e.task[t] = jt, e.tgtTile[t] = s.how === ji ? 1 : 0, e.goNear(t, s.t, s.how === ji);
}
function tc(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const s = e.task[t];
  if (s === Ot) {
    if (e.state[t] === It) {
      const i = Hi(e, t);
      i && Ui(e, t, i);
    }
    return;
  }
  if (s !== jt || e.phase[t] === ga || Jn(e, t)) return;
  const a = Hi(e, t);
  a && (e.carry[t] > 0 && e.carryRes[t] !== zs ? La(e, t) : Ui(e, t, a));
}
function ec(e, t) {
  const s = e.tgt[t];
  if (!e.isBuilding(s) || e.owner[s] !== e.owner[t]) {
    e.task[t] = Ot;
    return;
  }
  if (e.done[s]) {
    if (e.bdef(s).key === "farm" && !ac(e, s, t))
      e.task[t] = jt, e.phase[t] = Pe, e.goNear(t, s, !1);
    else if (e.bdef(s).wall) {
      const r = sc(e, t, s);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = Ot;
    } else e.task[t] = Ot;
    return;
  }
  if (e.reach(t, s, !1) > 230) {
    e.state[t] === It && (++e.fails[t] > 5 ? e.task[t] = Ot : e.goNear(t, s, !1));
    return;
  }
  if (e.state[t] = It, e.path[t] = null, e.fails[t] = 0, e.aPagar[s]) {
    const r = e.owner[s], l = e.players[r], c = e.bdef(s).cost;
    if (!l || !e.canAfford(r, c)) {
      const h = Object.keys(c).find((f) => (l?.res[f] ?? 0) < (c[f] ?? 0) * 100) ?? "wood";
      l && e.tick - (e.avisoMuro[r] ?? -1e9) > 300 && (e.avisoMuro[r] = e.tick, ae(e, r, "muroFalta." + h, e.x[s], e.z[s]));
      return;
    }
    e.pay(r, c), e.aPagar[s] = 0;
  }
  const a = (e.tick & 16383) + 1, i = e.tmr[s] !== a;
  e.tmr[s] = a, e.work[s] += i ? 10 : 6;
  const o = e.bdef(s), n = o.time * 100;
  e.hp[s] = Math.max(e.hp[s], Math.floor(o.hp * Math.min(1, e.work[s] / n))), e.work[s] >= n && (e.done[s] = 1, e.hp[s] = o.hp, e.work[s] = 0, e.events.push({ t: "built", e: s }), o.wall ? e.muroPronto(s) : ae(e, e.owner[s], "built." + o.key, e.x[s], e.z[s]));
}
function sc(e, t, s) {
  let a = -1, i = (30 * G) ** 2;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && !e.done[o] && e.owner[o] === e.owner[t] && e.bdef(o).wall) {
    const n = e.x[o] - e.x[s], r = e.z[o] - e.z[s], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function ac(e, t, s) {
  for (let a = 0; a < e.top; a++) if (a !== s && e.isUnit(a) && e.task[a] === jt && e.tgt[a] === t && !e.tgtTile[a]) return !0;
  return !1;
}
function Zn(e, t) {
  let s = e.tgt[t];
  if (s < 0 || !e.alive[s] || s === t || e.kind[s] === gt || e.isUnit(s) && e.owner[s] === e.owner[t]) {
    Oo(e, t);
    return;
  }
  const a = W[e.kind[t]], i = e.kind[t] === pt.villager;
  if (!i && e.owner[t] !== Mt && (e.tick + t) % 5 === 0 && !ci(e, t) && !(e.isBuilding(s) && e.bdef(s).wall)) {
    const c = Fi(e, t, s);
    if (c > Fs) {
      const h = po(e, t, a.sight, !1, c);
      h >= 0 && (e.tgt[t] = s = h, e.fails[t] = 0);
    }
  }
  i && (e.amx[t] = e.x[s], e.amz[t] = e.z[s]);
  const o = a.hunt && e.owner[s] === Mt, n = Math.round((o ? a.hunt : a.range) * G), r = e.reach(t, s, !1), l = !a.proj && !o && e.isUnit(s) && e.muroNoMeio(e.x[t], e.z[t], e.x[s], e.z[s]);
  if (r <= n + 40 && !l) {
    e.fails[t] = 0, e.state[t] === Yt && (e.state[t] = It, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (ic(e, t, s), e.cd[t] = a.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== Mt) {
    const c = e.x[t] - e.rallyX[t], h = e.z[t] - e.rallyZ[t];
    if (c * c + h * h > (12 * G) ** 2) {
      e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 100, e.task[t] = Ot, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === It && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 300, Oo(e, t);
      return;
    }
    if (e.owner[t] === Mt) {
      const c = e.map.herds[e.herd[t]];
      if (c) {
        const h = c.x * G - e.x[t], f = c.z * G - e.z[t];
        if (h * h + f * f > (16 * G) ** 2) {
          e.task[t] = Ot, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, c.x * G, c.z * G);
          return;
        }
      }
    }
    if ((a.proj || o) && r <= n + G * 2 && e.state[t] === It) {
      e.goPoint(t, e.x[s], e.z[s]), e.fails[t]++;
      return;
    }
    if (!e.goNear(t, s, !1) || e.lastPartial) {
      if (!i && e.owner[t] !== Mt && !e.overBudget) {
        if (a.proj) {
          !e.path[t] && !e.field[t] && e.goPoint(t, e.x[s], e.z[s]), e.fails[t]++;
          return;
        }
        if (Un(e, e.owner[t])) {
          const c = Gl(e, t, s);
          if (c >= 0 && c !== s) {
            e.alvo2[t] = s, e.tgt[t] = c, e.fails[t] = 0, e.goNear(t, c, !1);
            return;
          }
        }
      }
      e.fails[t] += 3;
    } else e.fails[t]++;
  }
}
function Oo(e, t) {
  const s = e.alvo2[t];
  if (s >= 0 && (e.alvo2[t] = -1, e.alive[s] && e.kind[s] !== gt && s !== t && (e.owner[s] === Mt || e.hostile(e.owner[t], e.owner[s])))) {
    e.tgt[t] = s, e.fails[t] = 0;
    return;
  }
  if (e.kind[t] === pt.villager) {
    let i = -1, o = (3 * G) ** 2;
    for (let n = 0; n < e.top; n++) if (e.alive[n] && e.kind[n] === gt) {
      const r = e.x[n] - e.amx[t], l = e.z[n] - e.amz[t], c = r * r + l * l;
      c < o && (o = c, i = n);
    }
    if (i >= 0) {
      e.task[t] = jt, e.tgt[t] = i, e.tgtTile[t] = 0, e.phase[t] = Pe, e.goNear(t, i, !1);
      return;
    }
  }
  const a = e.phase[t];
  if (a === 9 && e.owner[t] !== Mt) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = Ss, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = Ot, e.tgt[t] = -1, e.phase[t] = 0, a === 10 && e.owner[t] !== Mt ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = It, e.path[t] = null, e.field[t] = null);
}
function ic(e, t, s) {
  const a = W[e.kind[t]];
  if (a.siege && !e.isBuilding(s)) return;
  let i = e.atkOf(t);
  if (e.isUnit(s)) {
    const n = W[e.kind[s]];
    i -= e.armorOf(s);
    for (const r of a.bonus ?? []) n.cls === r.vs && (i += r.dmg);
  }
  e.beta && e.soldier(t) && (i = Math.floor((i * Il + 50) / 100)), e.isBuilding(s) && e.bdef(s).wall && (i = Math.floor((i * (a.muro ?? 100) + 50) / 100)), i = Math.max(1, i);
  const o = a.proj ?? (a.hunt && e.owner[s] === Mt ? "spear" : void 0);
  if (o) {
    const n = e.x[s] - e.x[t], r = e.z[s] - e.z[t], l = Ve(n * n + r * r), c = Math.max(3, Math.round(l / G));
    e.projectiles.push({ target: s, dmg: i, at: e.tick + c, by: t, k: e.kind[s], o: e.owner[s] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[s], z1: e.z[s], ticks: c, kind: o, tk: e.kind[s], gap: e.reach(t, s, !1), te: s });
  } else Qn(e, s, i, t);
}
function oc(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const s of e.projectiles) {
    if (s.at > e.tick) {
      t.push(s);
      continue;
    }
    e.alive[s.target] && e.kind[s.target] === s.k && e.owner[s.target] === s.o && Qn(e, s.target, s.dmg, s.by);
  }
  e.projectiles = t;
}
function Qn(e, t, s, a) {
  e.hp[t] -= s;
  const i = e.owner[t];
  if (i === Mt)
    e.alive[a] && (e.aggro[t] = a + 1);
  else if (e.isUnit(t) && e.alive[a] && !ci(e, t)) {
    const n = e.task[t];
    e.kind[t] === pt.villager ? e.owner[a] === Mt && n !== Rt && (e.task[t] = Rt, e.tgt[t] = a, e.phase[t] = 0) : W[e.kind[t]].siege || (n === Ot ? Kn(e, t, a) : n === Ss ? (e.task[t] = Rt, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0) : n === Rt && e.isUnit(a) && e.tgt[t] !== a && Fi(e, t, e.tgt[t]) > Fi(e, t, a) && (e.isBuilding(e.tgt[t]) && e.bdef(e.tgt[t]).wall && e.alvo2[t] < 0 && (e.alvo2[t] = e.tgt[t]), e.tgt[t] = a, e.fails[t] = 0));
  }
  const o = e.players[i];
  if (o && e.tick - o.lastAlert > 300 && e.owner[a] !== i && (o.lastAlert = e.tick, ae(e, i, "underAttack", e.x[t], e.z[t])), o && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + s;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && ae(e, i, "centerDanger." + e.owner[a], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && nc(e, t, a);
}
function nc(e, t, s) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const a = W[e.kind[t]].animal;
    a && a.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], a.food);
  } else if (e.isBuilding(t)) {
    const a = e.bdef(t).key, i = e.owner[s];
    if (a === "camp" && i >= 0 && i < e.players.length && (e.players[i].res.food += 2e4, e.players[i].res.wood += 15e3, ae(e, i, "campLoot", e.x[t], e.z[t])), a === "center") {
      const o = e.players[e.owner[t]];
      ae(e, e.owner[t], "centerLost." + e.owner[s]), e.remove(t), o && tr(e, o);
      return;
    }
  }
  e.remove(t);
}
function rc(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const s = W[e.kind[t]], a = s.animal, i = e.map.herds[e.herd[t]];
  if (e.task[t] === Rt) {
    Zn(e, t);
    return;
  }
  if (a.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === It) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let o = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (o = e.aggro[t] - 1), o >= 0) {
        let n = e.x[t] - e.x[o], r = e.z[t] - e.z[o];
        const l = Ve(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * G / l), r = Math.trunc(r * 4 * G / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
        return;
      }
    }
  } else if (a.mode === "fight") {
    if (e.aggro[t] > 0) {
      const o = e.aggro[t] - 1;
      if (e.aggro[t] = 0, e.alive[o] && e.isUnit(o)) {
        e.task[t] = Rt, e.tgt[t] = o, e.fast[t] = 1;
        return;
      }
    }
  } else if ((e.tick + t) % 10 === 0) {
    const o = lc(e, t, s.sight + (e.season === 3 ? 3 : 0));
    if (o >= 0) {
      e.task[t] = Rt, e.tgt[t] = o, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === It && i) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const o = Math.max(1, i.r) * G, n = e.rng.int(2 * o + 1) - o, r = e.rng.int(2 * o + 1) - o;
    e.goPoint(t, Math.round(i.x * G) + n, Math.round(i.z * G) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function lc(e, t, s) {
  let a = -1, i = 1 / 0;
  return e.near(e.x[t], e.z[t], s, (o) => {
    if (!e.isUnit(o) || e.owner[o] === Mt) return;
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }), a;
}
function cc(e, t) {
  if (!e.done[t]) return;
  const s = e.owner[t], a = e.players[s];
  if (!a) return;
  const i = e.bdef(t), o = i.key;
  e.queue[t].length && dc(e, t, a), i.tower && hc(e, t, i.tower), o === "pen" && !Hs(e) && e.tick % 10 === 0 && (a.res.food += 20, Yn(e, a.id, 0, 20)), o === "sanctuary" && e.tick % 20 === 0 && e.near(e.x[t], e.z[t], 6, (n) => {
    e.isUnit(n) && e.owner[n] === s && e.hp[n] < W[e.kind[n]].hp && e.hp[n]++;
  });
}
function hc(e, t, s) {
  if (e.cd[t] > 0) {
    e.cd[t]--;
    return;
  }
  if ((e.tick + t) % 3) return;
  const a = e.owner[t];
  let i = -1, o = 1 / 0;
  if (e.near(e.x[t], e.z[t], s.range + 1, (h) => {
    if (!e.isUnit(h) || !e.hostile(a, e.owner[h])) return;
    const f = e.reach(t, h, !1);
    f <= s.range * G && f < o && (o = f, i = h);
  }), i < 0) return;
  const n = Math.max(1, s.atk - e.armorOf(i)), r = e.x[i] - e.x[t], l = e.z[i] - e.z[t], c = Math.max(3, Math.round(Ve(r * r + l * l) / G));
  e.projectiles.push({ target: i, dmg: n, at: e.tick + c, by: t, k: e.kind[i], o: e.owner[i] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[i], z1: e.z[i], ticks: c, kind: "arrow", tk: e.kind[i], gap: e.reach(t, i, !1), te: i, h: 3.2 }), e.cd[t] = s.cd;
}
function dc(e, t, s) {
  if (s.hunger) return;
  const a = e.queue[t][0];
  if (a >= ce) {
    const v = os[a - ce];
    if (++e.work[t] < v.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), s.tech |= 1 << a - ce, ae(e, s.id, "tech." + v.key, e.x[t], e.z[t]);
    return;
  }
  const i = W[a];
  if (e.work[t] === 0 && e.pop(s.id) + i.pop > e.popCap(s.id)) {
    e.tick % 300 === 0 && ae(e, s.id, e.popCap(s.id) >= e.limiteEra(s.era) ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.work[t] < i.time * 10) return;
  e.work[t] = 0;
  const o = e.queue[t].shift(), [n, r, l] = e.footprint(t), c = e.size / 2, h = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : c, f = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : c, d = n + l / 2, u = r + l / 2, g = h - d, b = f - u, k = Math.sqrt(g * g + b * b) || 1, y = e.nearestFree(Math.round(d + g / k * (l / 2 + 1)), Math.round(u + b / k * (l / 2 + 1)), s.id);
  if (y < 0) return;
  const M = e.spawnUnit(s.id, W[o].key, y % e.size + 0.5, Math.floor(y / e.size) + 0.5);
  e.events.push({ t: "trained", e: M }), e.rallyX[t] >= 0 && e.goPoint(M, e.rallyX[t], e.rallyZ[t]);
}
function uc(e) {
  if (e.tick === 0 || e.tick % ge !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const s of e.players) !s.defeated && s.era >= 2 && fc(e, s.id) && ae(e, s.id, "fair");
  if (t === 8) for (const s of e.players) ae(e, s.id, "winterSoon");
  if (t >= 9) {
    for (const s of e.players) {
      if (s.defeated) continue;
      const a = e.pop(s.id) * (s.era <= 1 ? 1 : s.era <= 3 ? 2 : 3) * 100;
      e.comido[s.id] = (e.comido[s.id] ?? 0) + Math.min(a, s.res.food), s.res.food >= a ? (s.res.food -= a, s.hunger && (s.hunger = !1)) : (s.res.food = 0, s.hunger || ae(e, s.id, "hunger"), s.hunger = !0);
    }
    if (t === 9) for (const s of e.players) ae(e, s.id, "winter");
  }
  if (t === 0) for (const s of e.players)
    s.hunger = !1, ae(e, s.id, "spring");
}
function fc(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.done[s] && e.bdef(s).market) return !0;
  return !1;
}
function pc(e) {
  for (const t of e.players)
    if (t.aging) {
      if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
        t.aging = 0;
        continue;
      }
      if (!(--t.aging > 0)) {
        t.era++;
        for (let s = 0; s < e.top; s++) if (e.isUnit(s) && e.owner[s] === t.id) {
          const a = W[e.kind[s]].next;
          if (!a) continue;
          const i = W[e.kind[s]], o = W[pt[a]];
          e.hp[s] = Math.round(e.hp[s] * o.hp / i.hp), e.kind[s] = pt[a];
        }
        for (let s = 0; s < e.top; s++) e.isBuilding(s) && e.owner[s] === t.id && (e.queue[s] = e.queue[s].map((a) => a < ce && W[a].next ? pt[W[a].next] : a));
        e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && ae(e, t.id, "metalSeen");
      }
    }
}
function tr(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const s of e.players) ae(e, s.id, "defeated." + t.id);
    for (let s = 0; s < e.top; s++) e.alive[s] && e.owner[s] === t.id && e.remove(s);
    er(e);
  }
}
function mc(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.bdef(s).key === "center") return !0;
  return !1;
}
function gc(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !mc(e, t.id) && tr(e, t);
    er(e);
  }
}
function er(e) {
  if (e.outcome !== "playing") return;
  if (e.times) {
    bc(e, e.times);
    return;
  }
  const t = e.players.filter((s) => !s.ai);
  t.length && t.every((s) => s.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((s) => s.ai).every((s) => s.defeated) && e.players.some((s) => s.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
function bc(e, t) {
  const s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  if (e.players.forEach((n, r) => {
    n.defeated || s.add(t[r]), n.ai || a.add(t[r]);
  }), !(s.size <= 1 || ![...s].some((n) => a.has(n)))) return;
  e.vencedor = s.size === 1 ? [...s][0] : -1;
  const o = e.players.findIndex((n) => !n.ai);
  e.outcome = o >= 0 && e.vencedor === t[o] ? "victory" : "defeat", e.events.push({ t: "end", result: e.outcome, vencedor: e.vencedor });
}
const vc = [13, 24, 30], yc = [3, 9, 14], kc = [9, 12, 14, 17, 19, 21], xc = [2, 3, 4, 5, 6, 8], Mc = [42, 36, 30], zc = [24, 16, 11], Ac = [10, 7, 5], Tc = [6, 12, 99];
function $c(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const s = e.ai[t.id];
    e.tick < s.next || (s.next = e.tick + 10, Sc(e, t.id, s));
  }
  Pc(e);
}
function Sc(e, t, s) {
  const a = e.players[t], i = Math.min(a.era, 2), o = s.vez = (s.vez ?? 0) + 1, n = [], r = [], l = [];
  for (let T = 0; T < e.top; T++)
    !e.alive[T] || e.owner[T] !== t || (e.isBuilding(T) ? l.push(T) : e.isUnit(T) && (e.kind[T] === pt.villager ? n : r).push(T));
  const c = l.find((T) => e.bdef(T).key === "center" && e.done[T]);
  if (c === void 0) return;
  const h = (T) => e.done[T] === 1 || !e.beta || n.some((w) => e.task[w] === ke && e.tgt[w] === T), f = (T, w = !1) => l.filter((O) => e.bdef(O).key === T && (!w || e.done[O]) && h(O)), d = n.length + r.length, u = e.popCap(t), g = l.filter((T) => !e.done[T] && h(T)), b = e.tick / ge, k = e.beta ? kc : vc, y = e.beta ? xc : yc, M = e.beta ? 0 : Mc[e.difficulty], v = /* @__PURE__ */ new Set();
  for (const T of n) e.task[T] === Ms && v.add(T);
  const z = (T, w, O) => {
    let S = Bo(e, t, T, c, n.filter((C) => !v.has(C)), w, O);
    return S < 0 && e.beta && (S = Bo(e, t, T, c, n.filter((C) => !v.has(C)), O, O + 9)), S >= 0 && v.add(S), S >= 0;
  }, N = !a.aging && (a.era === 0 && n.length >= k[0] || a.era === 1 && n.length >= k[1] - 2 && b >= M - 6 && e.eraBuildingTypes(t) >= 2);
  if (n.length < k[i] && !e.queue[c].length && d < u && !a.aging && e.issue({ type: "train", player: t, building: c, key: "villager" }), u - d <= 3 && u < e.limiteEra(a.era) && !g.some((T) => e.bdef(T).key === "house") && e.tick >= s.houseCd && z("house", 5, 14) && (s.houseCd = e.tick + 150), e.beta && o % 30 === 0) for (const T of l) {
    if (e.done[T] || n.some((S) => e.task[S] === ke && e.tgt[S] === T)) continue;
    let w = -1, O = 1 / 0;
    for (const S of n) if (!v.has(S) && e.task[S] !== ke) {
      const C = e.x[S] - e.x[T] >> 8, U = e.z[S] - e.z[T] >> 8, H = C * C + U * U;
      H < O && (O = H, w = S);
    }
    w >= 0 && (e.issue({ type: "work", player: t, ids: [w], target: T }), v.add(w));
  }
  if (n.length >= 6 && !f("depot").length) {
    const T = Ec(e, t, c, n.filter((w) => !v.has(w)));
    T >= 0 && v.add(T);
  }
  if (a.era >= 2 && f("depot").length < 2) {
    const T = ar(e, t, c, n.filter((w) => !v.has(w)), (w) => e.resKind[w] === $e);
    T >= 0 && v.add(T);
  }
  const A = f("military");
  n.length >= (e.beta ? 7 : 9) && !A.length && z("military", 7, 16);
  const I = A.filter((T) => e.done[T]), B = y[i] + (a.era && !e.beta ? Math.floor(b / 8) : 0), P = {};
  a.era >= 2 && (P.stone = (f("forge").length ? 0 : 60) + (f("market").length ? 0 : 40) + (f("tower").length ? 0 : 120), P.metal = (!e.hasTech(t, "bronze") && f("forge", !0).length ? 60 : 0) + (f("stable", !0).length ? 35 : 0));
  const R = (T, w) => bs.every((O) => a.res[O] >= ((T[O] ?? 0) + (w[O] ?? 0)) * 100);
  if (I.length && !N && r.length < B && !e.queue[I[0]].length && d < u) {
    const T = ho(ct[Nt.military], a.era).filter((w) => w !== "dog" && R(W[pt[w]].cost, P));
    T.length && e.issue({ type: "train", player: t, building: I[0], key: T[e.rng.int(T.length)] });
  }
  if (a.era >= 2 && !N) {
    const T = f("stable", !0)[0], w = f("workshop", !0)[0];
    T !== void 0 && r.length < B && !e.queue[T].length && d + 2 <= u && R(W[pt.horseman].cost, { stone: P.stone, metal: !e.hasTech(t, "bronze") && f("forge", !0).length ? 60 : 0 }) && e.issue({ type: "train", player: t, building: T, key: "horseman" });
    const O = r.filter((U) => W[e.kind[U]].siege).length;
    w !== void 0 && O < 2 && !e.queue[w].length && d + 3 <= u && e.issue({ type: "train", player: t, building: w, key: "ram" });
    const S = f("forge", !0)[0], C = f("market", !0)[0];
    if (S !== void 0 && !e.queue[S].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && a.res.metal > 3e4 && e.issue({ type: "research", player: t, building: S, key: "iron" }) : e.issue({ type: "research", player: t, building: S, key: "bronze" })), C !== void 0 && !e.queue[C].length && !e.hasTech(t, "wheel") && a.res.metal > 15e3 && e.issue({ type: "research", player: t, building: C, key: "wheel" }), C !== void 0 && o % 3 === 1 && a.res.wood > (e.fair ? 5e4 : 9e4)) {
      const U = a.res.stone < 2e4 ? "stone" : a.res.metal < 25e3 ? "metal" : a.res.food < 3e4 ? "food" : null;
      U && e.issue({ type: "trade", player: t, building: C, give: "wood", get: U });
    }
  }
  if (a.era === 0 && !a.aging && n.length >= (e.beta ? 8 : 10) && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Ke[0].cost) && e.issue({ type: "ageup", player: t, building: c }), a.era === 1 && !a.aging && n.length >= (e.beta ? 11 : 18) && b >= M && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Ke[1].cost) && e.issue({ type: "ageup", player: t, building: c }), a.era >= 1 && !g.length) {
    const w = f("farm").length < Math.min(a.era >= 2 ? 14 : 10, Math.floor(n.length * 2 / 5));
    w && z("farm", 6, 15) || w && !e.beta || (f("pen").length ? !f("sanctuary").length && b > 30 ? z("sanctuary", 6, 14) : a.era >= 2 && (f("stable").length ? f("forge").length ? !f("market").length && (b > 50 || a.res.wood > 6e4) ? z("market", 7, 16) : f("tower").length ? !f("workshop").length && b > 58 && z("workshop", 7, 16) : z("tower", 5, 10) : z("forge", 6, 14) : z("stable", 7, 16)) : z("pen", 7, 16));
  }
  const $ = n.filter((T) => e.task[T] === Ot && e.state[T] === It && !v.has(T));
  if ($.length) {
    const T = [0, 0, 0, 0];
    for (const O of n) if (e.task[O] === jt) {
      const S = e.tgt[O], C = e.tgtTile[O] ? e.map.tree[S] ? na : e.resKind[S] === Le ? Ka : e.resKind[S] === $e ? Ya : zs : zs;
      T[C === Ya ? 3 : C === Ka ? 2 : C === na ? 1 : 0]++;
    }
    const w = a.era === 0 ? N ? [0.8, 0.15, 0.05, 0] : [0.62, 0.3, 0.08, 0] : a.era === 1 ? N ? [0.55, 0.25, 0.2, 0] : [0.5, 0.35, 0.15, 0] : [0.42, 0.25, 0.13, 0.2];
    if (e.beta && a.era < Ke.length) {
      const O = Ke[a.era].cost, S = ["food", "wood", "stone", "metal"].map((U) => Math.max(0, (O[U] ?? 0) * 100 - a.res[U])), C = S[0] + S[1] + S[2] + S[3];
      if (C > 0) for (let U = 0; U < 4; U++) w[U] = (w[U] + S[U] / C) / 2;
    }
    a.res.wood > 4e4 && (w[0] += w[1] - 0.1, w[1] = 0.1), a.res.stone > 25e3 && (w[0] += w[2], w[2] = 0), a.res.metal > 4e4 && (w[0] += w[3], w[3] = 0);
    for (const O of $) {
      const S = T[0] + T[1] + T[2] + T[3] + 1, C = (U) => w[U] - T[U] / S;
      for (const U of [0, 1, 2, 3].sort((H, J) => C(J) - C(H) || H - J)) if (qo(e, t, O, U, c)) {
        T[U]++;
        break;
      }
    }
  }
  if (a.res.wood > 4e4 && (e.tick + t * 7) % 200 === 0) {
    const T = n.find((w) => e.task[w] === jt && e.tgtTile[w] && e.map.tree[e.tgt[w]] > 0 && !v.has(w));
    T !== void 0 && e.carry[T] === 0 && qo(e, t, T, 0, c);
  }
  if (o % 3 === 0) {
    const T = Cc(e, t, c, 18);
    if (T >= 0) {
      const w = r.filter((O) => e.task[O] !== Ss || !0);
      w.length && e.issue({ type: "attack", player: t, ids: w, target: T });
    }
  }
  if (s.attackAt || (s.attackAt = zc[e.difficulty] * ge), e.tick >= s.attackAt && r.length >= 5) {
    const T = wc(e, t, c);
    T >= 0 && e.issue({ type: "amove", player: t, ids: r.slice(0, Tc[e.difficulty]), x: e.x[T], z: e.z[T] }), s.attackAt = e.tick + Ac[e.difficulty] * ge;
  }
}
function Cc(e, t, s, a) {
  let i = -1, o = (a * G) ** 2;
  return e.near(e.x[s], e.z[s], a, (n) => {
    if (!e.isUnit(n)) return;
    const r = e.owner[n];
    if (r < 0 || !e.hostile(t, r)) return;
    const l = e.x[n] - e.x[s], c = e.z[n] - e.z[s], h = l * l + c * c;
    h < o && (o = h, i = n);
  }), i;
}
function wc(e, t, s) {
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.hostile(t, e.owner[o]) && e.owner[o] >= 0 && e.owner[o] < e.players.length) {
    const n = !e.players[e.owner[o]].ai, r = e.x[o] - e.x[s], l = e.z[o] - e.z[s], c = (r * r + l * l) * (n && e.difficulty === 2 ? 0.6 : 1) * (1 + 0.02 * ((e.owner[o] - t + e.players.length) % e.players.length));
    c < i && (i = c, a = o);
  }
  return a;
}
function Bo(e, t, s, a, i, o, n) {
  const r = ct[Nt[s]];
  if (!e.canAfford(t, r.cost) || !i.length) return -1;
  const l = e.x[a] >> 8, c = e.z[a] >> 8;
  for (const [h, f] of Us) {
    const d = h * h + f * f;
    if (d < o * o) continue;
    if (d > n * n) break;
    const u = l + h - (r.size >> 1), g = c + f - (r.size >> 1);
    if (!e.canPlace(t, s, u, g) || !sr(e, u, g, r.size)) continue;
    const b = i.find((k) => e.task[k] !== ke && (e.carryRes[k] === na || e.task[k] === Ot)) ?? i.find((k) => e.task[k] !== ke) ?? i[0];
    return e.issue({ type: "build", player: t, ids: [b], key: s, tx: u, tz: g }), b;
  }
  return -1;
}
function sr(e, t, s, a) {
  for (let i = s - 1; i <= s + a; i++) for (let o = t - 1; o <= t + a; o++) {
    const n = i * e.size + o;
    if (e.bAt[n]) return !1;
  }
  return !0;
}
function Ec(e, t, s, a) {
  return ar(e, t, s, a, (i) => e.map.tree[i] > 0);
}
function ar(e, t, s, a, i) {
  const o = ct[Nt.depot];
  if (!e.canAfford(t, o.cost) || !a.length) return -1;
  const n = e.x[s] >> 8, r = e.z[s] >> 8, l = e.size;
  let c = Us;
  if (!Us.some(([h, f]) => {
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
        const k = d + g, y = u + b;
        if (e.canPlace(t, "depot", k, y) && sr(e, k, y, 2)) {
          const M = a.find((v) => e.task[v] !== ke) ?? a[0];
          return e.issue({ type: "build", player: t, ids: [M], key: "depot", tx: k, tz: y }), M;
        }
      }
  }
  return -1;
}
function qo(e, t, s, a, i) {
  const o = e.size, n = e.x[i] >> 8, r = e.z[i] >> 8;
  if (a === 0) {
    for (let M = 0; M < e.top; M++) if (e.isBuilding(M) && e.owner[M] === t && e.done[M] && e.bdef(M).key === "farm") {
      let v = !1;
      for (let z = 0; z < e.top; z++) if (e.isUnit(z) && e.task[z] === jt && e.tgt[z] === M && !e.tgtTile[z]) {
        v = !0;
        break;
      }
      if (!v)
        return e.issue({ type: "work", player: t, ids: [s], target: M }), !0;
    }
    let u = 0;
    for (let M = 0; M < e.top; M++) e.isUnit(M) && e.owner[M] === t && e.task[M] === jt && e.tgtTile[M] && e.resKind[e.tgt[M]] === ie && u++;
    if (e.season !== 3 && u < 5) for (const [M, v] of Us) {
      if (M * M + v * v > 196) break;
      const z = n + M, A = (r + v) * o + z;
      if (A >= 0 && A < o * o && e.resKind[A] === ie && e.resAmt[A] > 0)
        return e.issue({ type: "gather", player: t, ids: [s], k: A }), !0;
    }
    let g = -1, b = (25 * G) ** 2;
    for (let M = 0; M < e.top; M++) if (e.alive[M] && e.kind[M] === gt && e.work[M] > 0) {
      let v = 0;
      for (let I = 0; I < e.top; I++) e.isUnit(I) && e.task[I] === jt && e.tgt[I] === M && !e.tgtTile[I] && v++;
      const z = e.x[M] - e.x[i], N = e.z[M] - e.z[i], A = z * z + N * N;
      v < 4 && A < b && (b = A, g = M);
    }
    if (g >= 0)
      return e.issue({ type: "work", player: t, ids: [s], target: g }), !0;
    let k = -1, y = (28 * G) ** 2;
    for (let M = 0; M < e.top; M++) if (e.isAnimal(M) && W[e.kind[M]].animal.food > 0 && W[e.kind[M]].key !== "aurochs") {
      const v = e.x[M] - e.x[i], z = e.z[M] - e.z[i], N = v * v + z * z;
      N < y && (y = N, k = M);
    }
    return k >= 0 ? (e.issue({ type: "attack", player: t, ids: [s], target: k }), !0) : !1;
  }
  if (a === 3 && e.players[t].era < 2) return !1;
  const l = (u) => a === 1 ? e.map.tree[u] > 0 : a === 2 ? e.resKind[u] === Le : e.resKind[u] === $e;
  let c = n, h = r;
  if (a === 1) {
    for (let u = 0; u < e.top; u++) if (e.isBuilding(u) && e.owner[u] === t && e.bdef(u).key === "depot") {
      c = e.x[u] >> 8, h = e.z[u] >> 8;
      break;
    }
  }
  for (const [u, g] of Us) {
    const b = c + u, k = h + g;
    if (b < 0 || k < 0 || b >= o || k >= o) continue;
    const y = k * o + b;
    if (l(y) && e.open(y))
      return e.issue({ type: "gather", player: t, ids: [s], k: y }), !0;
  }
  let f = -1, d = 1 / 0;
  for (let u = 0; u < o * o; u += 3) if (l(u) && e.open(u)) {
    const g = u % o, b = (u - g) / o, k = (g - c) ** 2 + (b - h) ** 2;
    k < d && (d = k, f = u);
  }
  return f >= 0 ? (e.issue({ type: "gather", player: t, ids: [s], k: f }), !0) : !1;
}
function Pc(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === de) {
      const o = No(e, i);
      o >= 0 && e.events.push({ t: "msg", player: e.owner[o], key: "raidSoon", x: e.x[i], z: e.z[i] });
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / ge, a = Math.max(...e.players.map((i) => i.era)) >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15));
  for (let i = 0; i < e.top; i++) {
    if (!e.isBuilding(i) || e.owner[i] !== de) continue;
    const o = No(e, i);
    if (o < 0) continue;
    const n = [];
    for (let r = 0; r < a; r++) {
      const l = e.nearestFree((e.x[i] >> 8) + r % 3 - 1, (e.z[i] >> 8) + 3 + Math.floor(r / 3), de);
      l < 0 || n.push(e.spawnUnit(de, "barbarian", l % e.size + 0.5, Math.floor(l / e.size) + 0.5));
    }
    for (const r of n)
      e.task[r] = Ss, e.amx[r] = e.x[o], e.amz[r] = e.z[o], e.rallyX[r] = e.x[o], e.rallyZ[r] = e.z[o];
    e.orderMove(n, e.x[o], e.z[o]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * ge;
}
function No(e, t) {
  let s = -1, a = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.bdef(i).key === "center" && e.owner[i] >= 0 && e.owner[i] < e.players.length && !e.players[e.owner[i]].defeated) {
    const o = e.x[i] - e.x[t], n = e.z[i] - e.z[t], r = o * o + n * n;
    r < a && (a = r, s = i);
  }
  return s;
}
const et = 4096, It = 0, Yt = 1, Ot = 0, jt = 1, ke = 2, Rt = 3, Ss = 4, Ms = 5, Ic = 30, as = 60, Pe = 0, ir = 1, ga = 2, zs = 0, na = 1, Ka = 2, Ya = 3, xa = [1, -1, 0, 0, 1, 1, -1, -1], Ma = [0, 0, 1, -1, 1, -1, 1, -1], Ro = [10, 10, 10, 10, 14, 14, 14, 14], or = 4294967295;
class Oc {
  constructor(t, s) {
    m(this, "dist");
    this.goal = t, this.dist = new Uint32Array(s).fill(or);
  }
}
const Ds = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && Ds.push([t, e]);
Ds.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const Us = Ds, Fo = /* @__PURE__ */ new Map();
function Bc(e) {
  let t = Fo.get(e);
  if (t) return t;
  const s = [];
  for (let a = -e; a <= e; a++) for (let i = -e; i <= e; i++) i * i + a * a <= e * e + e && s.push(i, a);
  return t = new Int16Array(s), Fo.set(e, t), t;
}
class mo {
  constructor(t, s, a = {}) {
    m(this, "map");
    m(this, "size");
    m(this, "rng");
    m(this, "tick", 0);
    m(this, "difficulty", 1);
    m(this, "players", []);
    // entidades (estrutura de arrays)
    m(this, "alive", new Uint8Array(et));
    m(this, "kind", new Uint8Array(et));
    m(this, "owner", new Int8Array(et));
    m(this, "x", new Int32Array(et));
    m(this, "z", new Int32Array(et));
    m(this, "px", new Int32Array(et));
    m(this, "pz", new Int32Array(et));
    m(this, "hp", new Int16Array(et));
    m(this, "state", new Uint8Array(et));
    m(this, "stuck", new Uint8Array(et));
    m(this, "best", new Int32Array(et));
    m(this, "slotX", new Int32Array(et));
    m(this, "slotZ", new Int32Array(et));
    m(this, "task", new Uint8Array(et));
    m(this, "tgt", new Int32Array(et));
    m(this, "tgtTile", new Uint8Array(et));
    m(this, "phase", new Uint8Array(et));
    m(this, "carry", new Int16Array(et));
    m(this, "carryRes", new Uint8Array(et));
    m(this, "cd", new Uint16Array(et));
    m(this, "work", new Int32Array(et));
    m(this, "done", new Uint8Array(et));
    m(this, "sub", new Uint8Array(et));
    m(this, "aggro", new Int32Array(et));
    m(this, "tmr", new Int16Array(et));
    m(this, "herd", new Int16Array(et));
    m(this, "fast", new Uint8Array(et));
    m(this, "amx", new Int32Array(et));
    m(this, "amz", new Int32Array(et));
    m(this, "fails", new Uint8Array(et));
    m(this, "frac", new Int32Array(et));
    m(this, "rallyX", new Int32Array(et));
    m(this, "rallyZ", new Int32Array(et));
    m(this, "dropB", new Int32Array(et));
    m(this, "ignoreT", new Int32Array(et).fill(-1));
    m(this, "ignoreUntil", new Int32Array(et));
    // alvo inalcançável a ignorar por um tempo
    m(this, "foodMode", new Uint8Array(et));
    // coletor no modo Buscar comida (procura comida sozinho)
    /** muros (D35): o alvo a retomar depois de derrubar o bloco que fechava o caminho (-1: nenhum) */
    m(this, "alvo2", new Int32Array(et).fill(-1));
    /** fuga (D35): a tarefa de antes da fuga + 1 (+ 16 sem tarefa: volta ao lugar ou segue para onde ia) */
    m(this, "fugaDe", new Uint8Array(et));
    /** ordem firme (D36): até que tick a unidade segue a ordem de quem joga sem reagir ao que vê */
    m(this, "firme", new Int32Array(et));
    /** muro marcado (D37): 1 = bloco desenhado que ainda não foi pago (é pago quando alguém começa a construí-lo) */
    m(this, "aPagar", new Uint8Array(et));
    /** quando cada tribo foi avisada de que falta material para o muro (só para o aviso na tela; não entra no jogo salvo) */
    m(this, "avisoMuro", []);
    /** taxa dos materiais (D38): quanto cada tribo já obteve de comida, madeira, pedra e metal, e quanto já comeu (centésimos).
     *  Só para a interface: não entra no jogo salvo nem na conferência entre aparelhos */
    m(this, "obtido", []);
    m(this, "comido", []);
    /** fuga (D35): quando cada tribo foi avisada da última fuga (só para o aviso na tela; não entra no jogo salvo) */
    m(this, "avisoFuga", []);
    m(this, "queue", Array.from({ length: et }, () => []));
    m(this, "field", new Array(et).fill(null));
    m(this, "path", new Array(et).fill(null));
    m(this, "pathI", new Uint16Array(et));
    m(this, "top", 0);
    // mapa vivo
    m(this, "blocked");
    m(this, "bAt");
    // bAt = id da construção + 1 em cada tile. blocked: o fixo (sem os muros)
    /** muros (D35): dono + 1 do muro pronto em cada tile (0 = nenhum). O muro barra quem não é amigo do dono */
    m(this, "muroDono");
    /** o mapa de bloqueio de cada um: o fixo e os muros prontos de quem não é amigo (jogadores, bárbaros e bichos) */
    m(this, "bloq", []);
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
    /** regras do jogo (D34): normal ou beta. Escolhidas no começo e guardadas no jogo salvo */
    m(this, "regras");
    m(this, "pending", []);
    m(this, "seq", 0);
    /** jogo com amigo (anfitrião): recebe as ordens de fora aplicadas em cada passo, na ordem em que foram aplicadas */
    m(this, "onApplied", null);
    m(this, "hashHead");
    m(this, "hashNext", new Int32Array(et));
    m(this, "hs");
    m(this, "pushX", new Int32Array(et));
    m(this, "pushZ", new Int32Array(et));
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
    this.map = Hn(t, s, a.mapa ?? fo), this.size = this.map.size, this.rng = new Fn(t), this.difficulty = a.difficulty ?? 1;
    const i = this.size * this.size;
    this.blocked = new Uint8Array(i), this.bAt = new Int16Array(i), this.resKind = new Uint8Array(i), this.resAmt = new Int32Array(i), this.muroDono = new Int8Array(i);
    for (let r = 0; r < i; r++) {
      const l = this.map.terrain[r];
      (oa(l) || this.map.tree[r]) && (this.blocked[r] = 1), this.map.tree[r] && (this.resAmt[r] = this.map.wood[r] * 100);
    }
    for (const r of this.map.res) {
      const l = r.z * this.size + r.x;
      this.resKind[l] = r.kind, this.resAmt[l] = r.amount * 100, this.blocked[l] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(i), this.aG = new Int32Array(i), this.aFrom = new Int32Array(i), this.aClosed = new Int32Array(i), this.aHeap = new Float64Array(i * 2), this.regras = Rn(a.regras);
    const o = a.humans ?? 1, n = a.humanos;
    a.times && a.times.length === s && (this.times = a.times.slice()), this.map.starts.forEach((r, l) => {
      this.players.push({ id: l, color: uo[l], start: { x: r.x, z: r.z }, ai: n ? !n.includes(l) : l >= o, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0 }), this.vis.push(new Uint8Array(i)), this.explored.push(new Uint8Array(i)), this.spawnBuilding(l, "center", r.x - 2, r.z - 2, !0);
      for (let c = 0; c < (this.beta ? El : 4); c++) this.spawnUnit(l, "villager", r.x - r.ux * 4 + (c - 1.5) * 1.1, r.z - r.uz * 4 + c % 2 * 0.8);
      this.beta || this.spawnUnit(l, "dog", r.x - r.ux * 3 - r.uz * 3, r.z - r.uz * 3 + r.ux * 3), this.ai.push({ next: 20 + l * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((r, l) => {
      for (const [c, h] of r.spots) {
        const f = this.spawnUnit(Mt, r.kind, c + 0.5, h + 0.5);
        this.herd[f] = l, this.tmr[f] = f * 7 % 60;
      }
    });
    for (const r of this.map.camps) this.spawnBuilding(de, "camp", r.x - 2, r.z - 2, !0);
    if (this.barbNext = 12 * ge, a.testUnits) {
      const r = this.map.starts[0];
      let l = 0;
      for (let c = 0; c < 40 && l < a.testUnits; c++) for (let h = 0; h < 20 && l < a.testUnits; h++) {
        const f = r.x - r.ux * 9 + (h - 10) * 0.9, d = r.z - r.uz * 9 - c * 0.9 * (r.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(f * G), Math.round(d * G)) || (this.spawnUnit(0, "warrior", f, d), l++);
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
    const s = this.size, a = t % s, i = (t - a) / s;
    for (let o = 0; o < 8; o++) {
      const n = a + xa[o], r = i + Ma[o];
      if (n >= 0 && r >= 0 && n < s && r < s && !this.blocked[r * s + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return W[this.kind[t]];
  }
  bdef(t) {
    return ct[this.kind[t] - at];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < gt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= at;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === Mt;
  }
  hostile(t, s) {
    if (t === s || t === Mt || s === Mt) return !1;
    const a = this.times;
    return !(a && t >= 0 && s >= 0 && t < a.length && s < a.length && a[t] === a[s]);
  }
  /** o time da tribo (no jogo solo, cada tribo é um time) */
  time(t) {
    return this.times?.[t] ?? t;
  }
  /** tribos diferentes do mesmo time (partida online, M6) */
  aliado(t, s) {
    return t !== s && t >= 0 && s >= 0 && t < this.players.length && s < this.players.length && this.time(t) === this.time(s);
  }
  /** o fim da partida para esta tribo: no M6, vence quem é do time vencedor; no solo, o que o evento diz */
  resultadoDe(t, s) {
    return s.vencedor === void 0 ? s.result : s.vencedor >= 0 && s.vencedor === this.time(t) ? "victory" : "defeat";
  }
  // ── pesquisas e números de cada unidade ──
  hasTech(t, s) {
    const a = this.players[t];
    return !!a && (a.tech & 1 << Wa[s]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, s) {
    for (let a = 0; a < this.top; a++) if (this.isBuilding(a) && this.owner[a] === t && this.queue[a].includes(ce + s)) return !0;
    return !1;
  }
  /** tropa de uma tribo (não coletor, bicho nem bárbaro) */
  soldier(t) {
    const s = W[this.kind[t]].cls;
    return s !== "villager" && s !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const s = W[this.kind[t]];
    if (!this.soldier(t)) return s.atk;
    const a = this.owner[t];
    return s.atk + (this.hasTech(a, "bronze") ? 1 : 0) + (this.hasTech(a, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return W[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return ((this.beta ? Pl[0] : Sl) + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  // regras beta: leva mais por viagem
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * ge && this.tick % (3 * ge) < $l;
  }
  // ── entidades ──
  alloc() {
    for (let t = 0; t < et; t++) if (!this.alive[t])
      return t >= this.top && (this.top = t + 1), t;
    throw new Error("entidades esgotadas");
  }
  reset(t) {
    this.state[t] = It, this.task[t] = Ot, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0, this.alvo2[t] = -1, this.fugaDe[t] = 0, this.firme[t] = 0, this.aPagar[t] = 0;
  }
  spawnUnit(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = pt[s], this.owner[o] = t, this.x[o] = this.px[o] = Math.round(a * G), this.z[o] = this.pz[o] = Math.round(i * G), this.hp[o] = W[pt[s]].hp, o;
  }
  spawnCarcass(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = gt, this.owner[o] = Mt, this.sub[o] = t, this.x[o] = this.px[o] = s, this.z[o] = this.pz[o] = a, this.work[o] = i * 100, this.hp[o] = 1, o;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, s, a, i, o) {
    const n = this.alloc();
    this.reset(n);
    const r = ct[Nt[s]];
    this.alive[n] = 1, this.kind[n] = at + Nt[s], this.owner[n] = t, this.x[n] = this.px[n] = a * G + r.size * 128, this.z[n] = this.pz[n] = i * G + r.size * 128, this.done[n] = o ? 1 : 0, this.hp[n] = o ? r.hp : Math.max(1, r.hp / 10 | 0);
    for (let l = 0; l < r.size; l++) for (let c = 0; c < r.size; c++) {
      const h = (i + l) * this.size + a + c;
      this.bAt[h] = n + 1, !r.walk && !r.wall && this.setBlocked(h, 1);
    }
    return o && r.wall && this.muroPronto(n), this.events.push({ t: "placed", e: n }), n;
  }
  footprint(t) {
    const s = this.bdef(t).size;
    return [(this.x[t] >> 8) - (s >> 1), (this.z[t] >> 8) - (s >> 1), s];
  }
  remove(t) {
    if (this.kind[t] >= at) {
      const [s, a, i] = this.footprint(t), o = this.bdef(t).walk, n = this.bdef(t).wall;
      n && this.done[t] && this.muroFora(t);
      for (let r = 0; r < i; r++) for (let l = 0; l < i; l++) {
        const c = (a + r) * this.size + s + l;
        this.bAt[c] = 0, !o && !n && this.setBlocked(c, 0);
      }
      this.events.push({ t: "gone", e: t });
    }
    this.alive[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [];
  }
  /** bloqueado para quem é do dono o (sem o: só o fixo) */
  blockedAt(t, s, a) {
    const i = t >> 8, o = s >> 8;
    return i < 0 || o < 0 || i >= this.size || o >= this.size ? !0 : (a === void 0 ? this.blocked : this.bloqueioDe(a))[o * this.size + i] === 1;
  }
  // ── muros (D35): o muro pronto barra os inimigos (outras tribos, bárbaros e bichos); a própria tribo e os aliados passam ──
  /** quem é do dono o passa pelo muro de `dono`? */
  passaMuro(t, s) {
    return t === s || this.aliado(t, s);
  }
  iBloq(t) {
    const s = this.players.length;
    return t >= 0 && t < s ? t : t === de ? s : s + 1;
  }
  /** o mapa de bloqueio de quem é do dono o */
  bloqueioDe(t) {
    return this.bloq[this.iBloq(t)] ?? this.blocked;
  }
  /** refaz o mapa de cada um a partir do fixo e dos muros prontos (no começo e ao abrir um jogo salvo) */
  refazBloqueios() {
    const t = this.size * this.size;
    this.muroDono.fill(0);
    for (let s = 0; s < this.top; s++) this.isBuilding(s) && this.done[s] && this.bdef(s).wall && (this.muroDono[(this.z[s] >> 8) * this.size + (this.x[s] >> 8)] = this.owner[s] + 1);
    this.bloq = Array.from({ length: this.players.length + 2 }, () => this.blocked.slice());
    for (let s = 0; s < t; s++) this.muroDono[s] && this.refazTile(s);
    this.flowCache.clear();
  }
  /** o tile k em cada mapa: o fixo, ou um muro pronto de quem não é amigo */
  refazTile(t) {
    const s = this.muroDono[t] - 1, a = this.players.length;
    for (let i = 0; i < this.bloq.length; i++) this.bloq[i][t] = this.blocked[t] || s >= 0 && !this.passaMuro(i < a ? i : i === a ? de : Mt, s) ? 1 : 0;
  }
  /** o obstáculo fixo mudou num tile (árvore cortada, construção posta ou tirada) */
  setBlocked(t, s) {
    this.blocked[t] = s, this.bloq.length && this.refazTile(t);
  }
  /** o muro ficou pronto: passa a barrar quem não é amigo; quem não é amigo e está em cima sai para o lado */
  muroPronto(t) {
    const s = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), a = this.owner[t];
    if (this.muroDono[s] = a + 1, !!this.bloq.length) {
      this.refazTile(s), this.flowCache.clear();
      for (let i = 0; i < this.top; i++) if (this.isUnit(i) && (this.z[i] >> 8) * this.size + (this.x[i] >> 8) === s && !this.passaMuro(this.owner[i], a)) {
        const o = this.nearestFree(this.x[i] >> 8, this.z[i] >> 8, this.owner[i]);
        if (o < 0) continue;
        this.x[i] = this.px[i] = o % this.size * G + 128, this.z[i] = this.pz[i] = Math.floor(o / this.size) * G + 128, this.path[i] = null, this.field[i] = null;
      }
    }
  }
  /** o muro caiu: o caminho abre para todos */
  muroFora(t) {
    const s = (this.z[t] >> 8) * this.size + (this.x[t] >> 8);
    this.muroDono[s] && (this.muroDono[s] = 0, this.bloq.length && (this.refazTile(s), this.flowCache.clear()));
  }
  /** o muro que o jogador constrói nesta era (D35): paliçada no Neolítico, muralha de pedra a partir dos Metais */
  muroDaEra(t) {
    return t >= 2 ? "wall" : t >= 1 ? "palisade" : null;
  }
  /** o muro de quem não é amigo que fecha o caminho de e até o retângulo (num caminho que ignora esses muros): o bloco a
   *  derrubar, ou -1 (não há caminho nem assim, ou o caminho não passa por muro) */
  muroNoCaminho(t, s, a, i, o) {
    const n = this.owner[t], r = this.size, l = (this.z[t] >> 8) * r + (this.x[t] >> 8), c = this.findPath(l, s, a, i, o, 12e3, this.blocked, !1);
    if (!c || this.lastPartial) return -1;
    const h = (d) => {
      const u = this.muroDono[d] - 1;
      return u >= 0 && !this.passaMuro(n, u) && this.bAt[d] ? this.bAt[d] - 1 : -1;
    };
    let f = l;
    for (const d of c) {
      let u = h(d);
      const g = f % r, b = (f - g) / r, k = d % r, y = (d - k) / r;
      if (u < 0 && g !== k && b !== y && (u = h(b * r + k), u < 0 && (u = h(y * r + g))), u >= 0) return u;
      f = d;
    }
    return -1;
  }
  canPlace(t, s, a, i) {
    const o = ct[Nt[s]], n = this.size;
    if (a < 1 || i < 1 || a + o.size >= n - 1 || i + o.size >= n - 1) return !1;
    for (let r = 0; r < o.size; r++) for (let l = 0; l < o.size; l++) {
      const c = (i + r) * n + a + l, h = this.map.terrain[c];
      if (this.blocked[c] || this.bAt[c] || oa(h) || h === ks || !this.explored[t][c]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, c = this.z[r] >> 8;
      if (l >= a && l < a + o.size && c >= i && c < i + o.size && this.state[r] === It && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  canAfford(t, s) {
    const a = this.players[t].res;
    return bs.every((i) => a[i] >= (s[i] ?? 0) * 100);
  }
  pay(t, s) {
    const a = this.players[t].res;
    for (const i of bs) a[i] -= (s[i] ?? 0) * 100;
  }
  refund(t, s) {
    const a = this.players[t].res;
    for (const i of bs) a[i] += (s[i] ?? 0) * 100;
  }
  pop(t) {
    let s = 0;
    for (let a = 0; a < this.top; a++) this.isUnit(a) && this.owner[a] === t && (s += this.udef(a).pop);
    return s;
  }
  popCap(t) {
    const s = this.players[t].era;
    let a = 0;
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).pop && (a += this.vagas(this.bdef(i).key, s));
    return Math.min(this.limiteEra(s), a);
  }
  /** a população máxima da era (regras beta: 12 na primeira, 30 na última) */
  limiteEra(t) {
    return this.beta ? So[Math.min(t, So.length - 1)] : Tl[t];
  }
  /** quantas vagas a construção dá nesta era (o Centro e a casa; regras beta: 4 cada) */
  vagas(t, s) {
    const a = ct[Nt[t]];
    return a?.pop ? this.beta ? t === "center" ? Cl : wl : a.pop[Math.min(s, a.pop.length - 1)] : 0;
  }
  /** tipos de construção da era atual já prontos (requisito para avançar) */
  eraBuildingTypes(t) {
    const s = this.players[t].era, a = /* @__PURE__ */ new Set();
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).buildable && !this.bdef(i).wall && this.bdef(i).era === s && a.add(this.bdef(i).key);
    return a.size;
  }
  // muros não contam (D35)
  // ── geometria ──
  /** distância (sub-tiles) da unidade até a borda do alvo (construção, tile ou unidade) */
  reach(t, s, a) {
    let i, o, n, r;
    if (a) {
      const h = s % this.size, f = (s - h) / this.size;
      i = h * G, o = f * G, n = i + G, r = o + G;
    } else if (this.kind[s] >= at) {
      const [h, f, d] = this.footprint(s);
      i = h * G, o = f * G, n = i + d * G, r = o + d * G;
    } else {
      const h = this.x[s] - this.x[t], f = this.z[s] - this.z[t];
      return Math.max(0, Ve(h * h + f * f) - (this.kind[s] < gt ? Math.round(W[this.kind[s]].radius * G) : 64));
    }
    const l = Math.max(i - this.x[t], 0, this.x[t] - n), c = Math.max(o - this.z[t], 0, this.z[t] - r);
    return Ve(l * l + c * c);
  }
  // ── caminho ──
  /** o tile livre mais perto (para quem é do dono o; sem o, só o fixo) */
  /** há muro de quem não é amigo de o na linha reta entre os dois pontos? (quem está do outro lado do muro não alcança) */
  /** há bloco de muro pronto (de qualquer dono) entre os dois pontos (contando o tile de cada ponta: quem está dentro dos
   *  troncos também não acerta)? O golpe de perto não passa pelos troncos nem pelas pedras (D35): quem luta de perto
   *  precisa estar do mesmo lado */
  muroNoMeio(t, s, a, i) {
    const o = this.size;
    let n = t >> 8, r = s >> 8;
    const l = a >> 8, c = i >> 8, h = (k) => this.muroDono[k] > 0, f = Math.abs(l - n), d = Math.abs(c - r), u = n < l ? 1 : -1, g = r < c ? 1 : -1;
    let b = f - d;
    for (let k = 0; k < 64; k++) {
      if (n < 0 || r < 0 || n >= o || r >= o) return !1;
      if (h(r * o + n)) return !0;
      if (n === l && r === c) return !1;
      const y = 2 * b;
      if (y > -d && y < f && (h(r * o + n + u) || h((r + g) * o + n))) return !0;
      y > -d && (b -= d, n += u), y < f && (b += f, r += g);
    }
    return !1;
  }
  muroNaLinha(t, s, a, i, o) {
    const n = this.size;
    let r = t >> 8, l = s >> 8;
    const c = a >> 8, h = i >> 8, f = (y) => {
      const M = this.muroDono[y] - 1;
      return M >= 0 && !this.passaMuro(o, M);
    }, d = Math.abs(c - r), u = Math.abs(h - l), g = r < c ? 1 : -1, b = l < h ? 1 : -1;
    let k = d - u;
    for (let y = 0; y < 64; y++) {
      if (r < 0 || l < 0 || r >= n || l >= n) return !1;
      if (f(l * n + r)) return !0;
      if (r === c && l === h) return !1;
      const M = 2 * k;
      if (M > -u && M < d && (f(l * n + r + g) || f((l + b) * n + r))) return !0;
      M > -u && (k -= u, r += g), M < d && (k += d, l += b);
    }
    return !1;
  }
  /** tem bloco de muro (de qualquer dono, pronto, em obra ou só marcado) no tile k? A tribo passa por ele, mas ninguém para
   *  em cima: sumiria dentro dos troncos (D35) */
  ehMuro(t) {
    const s = this.bAt[t] - 1;
    return s >= 0 && ct[this.kind[s] - at].wall === !0;
  }
  /** quem ficou parado em cima de um bloco de muro (o muro ficou pronto embaixo dele, ou foi empurrado) anda até o espaço
   *  livre mais perto, logo ao lado; a tarefa dele continua de lá (D35) */
  saiDoMuro() {
    const t = this.size;
    for (let s = 0; s < this.top; s++) {
      if (!this.alive[s] || this.kind[s] >= gt || this.state[s] === Yt) continue;
      const a = this.x[s] >> 8, i = this.z[s] >> 8;
      if (a < 0 || i < 0 || a >= t || i >= t || !this.ehMuro(i * t + a)) continue;
      const o = this.bloqueioDe(this.owner[s]);
      let n = -1, r = 1 / 0;
      for (let l = 1; l <= 3 && n < 0; l++) for (let c = -l; c <= l; c++) for (let h = -l; h <= l; h++) {
        if (Math.max(Math.abs(h), Math.abs(c)) !== l) continue;
        const f = a + h, d = i + c;
        if (f < 0 || d < 0 || f >= t || d >= t) continue;
        const u = d * t + f;
        if (o[u] || this.bAt[u]) continue;
        const g = f * G + 128 - this.x[s], b = d * G + 128 - this.z[s], k = g * g + b * b;
        k < r && (r = k, n = u);
      }
      n >= 0 && this.goPoint(s, n % t * G + 128, Math.floor(n / t) * G + 128);
    }
  }
  nearestFree(t, s, a) {
    const i = a === void 0 ? this.blocked : this.bloqueioDe(a);
    for (const [o, n] of Ds) {
      const r = t + o, l = s + n;
      if (r >= 0 && l >= 0 && r < this.size && l < this.size && !i[l * this.size + r] && !this.ehMuro(l * this.size + r)) return l * this.size + r;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, s, a, i, o, n = 16e3, r = this.blocked, l = !0) {
    const c = this.size, h = ++this.aId, f = this.aG, d = this.aFrom, u = this.aStamp, g = this.aClosed, b = this.aHeap;
    this.lastPartial = !1;
    const k = (O, S) => {
      const C = Math.max(s - O, 0, O - i), U = Math.max(a - S, 0, S - o);
      return 15 * Math.max(C, U) + 6 * Math.min(C, U);
    }, y = t % c, M = (t - y) / c;
    if (y >= s && y <= i && M >= a && M <= o) return [];
    let v = 0;
    const z = (O) => {
      let S = v++;
      for (b[S] = O; S > 0; ) {
        const C = S - 1 >> 1;
        if (b[C] <= b[S]) break;
        const U = b[C];
        b[C] = b[S], b[S] = U, S = C;
      }
    }, N = () => {
      const O = b[0];
      b[0] = b[--v];
      let S = 0;
      for (; ; ) {
        const C = S * 2 + 1, U = C + 1;
        let H = S;
        if (C < v && b[C] < b[H] && (H = C), U < v && b[U] < b[H] && (H = U), H === S) break;
        const J = b[H];
        b[H] = b[S], b[S] = J, S = H;
      }
      return O;
    };
    u[t] = h, f[t] = 0, d[t] = -1, z(k(y, M) * 65536 + t);
    let A = t, I = k(y, M), B = -1, P = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; v > 0 && P < n; ) {
      const O = N(), S = O % 65536;
      if (g[S] === h) continue;
      g[S] = h, P++;
      const C = S % c, U = (S - C) / c, H = k(C, U), J = this.ehMuro(S);
      if (H === 0 && !J) {
        B = S;
        break;
      }
      H < I && !J && (I = H, A = S);
      for (let ut = 0; ut < 8; ut++) {
        const $t = C + xa[ut], At = U + Ma[ut];
        if ($t < 0 || At < 0 || $t >= c || At >= c) continue;
        const it = At * c + $t;
        if (r[it] || g[it] === h || ut >= 4 && (r[U * c + $t] || r[At * c + C])) continue;
        const tt = f[S] + Ro[ut];
        (u[it] !== h || tt < f[it]) && (u[it] = h, f[it] = tt, d[it] = S, z((tt + k($t, At)) * 65536 + it));
      }
    }
    this.lastPartial = B < 0, this.nodesTick += P;
    const R = B >= 0 ? B : A;
    if (R === t) return B >= 0 ? [] : null;
    const $ = [];
    for (let O = R; O !== t && O >= 0; O = d[O]) $.push(O);
    if ($.reverse(), !l) return $;
    const T = [];
    let w = t;
    for (let O = 0; O < $.length; ) {
      let S = Math.min($.length - 1, O + 12);
      for (; S > O && !this.clear(w, $[S], r); ) S--;
      T.push($[S]), w = $[S], O = S + 1;
    }
    return T;
  }
  clear(t, s, a) {
    const i = this.size;
    let o = t % i, n = (t - o) / i;
    const r = s % i, l = (s - r) / i, c = Math.abs(r - o), h = Math.abs(l - n), f = o < r ? 1 : -1, d = n < l ? 1 : -1;
    let u = c - h;
    for (let g = 0; g < 64; g++) {
      if (a[n * i + o]) return !1;
      if (o === r && n === l) return !0;
      const b = 2 * u;
      if (b > -h && b < c && (a[n * i + o + f] || a[(n + d) * i + o]))
        return !1;
      b > -h && (u -= h, o += f), b < c && (u += c, n += d);
    }
    return !1;
  }
  /** manda uma unidade até perto de um retângulo de tiles (alvo) ou de um ponto */
  goTo(t, s, a, i, o, n, r, l = 16e3) {
    const c = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), h = this.size, f = this.bloqueioDe(this.owner[t]);
    let d = !1;
    for (let y = Math.max(0, a); y <= Math.min(h - 1, o) && !d; y++) for (let M = Math.max(0, s); M <= Math.min(h - 1, i); M++) if (!f[y * h + M]) {
      d = !0;
      break;
    }
    if (!d)
      return this.lastPartial = !0, this.state[t] = It, !1;
    const u = this.findPath(c, s, a, i, o, l, f);
    if (this.field[t] = null, !u)
      return this.state[t] = It, !1;
    this.path[t] = u, this.pathI[t] = 0;
    const g = u.length ? u[u.length - 1] : c, b = g % this.size, k = (g - b) / this.size;
    return this.slotX[t] = n ?? b * G + 128, this.slotZ[t] = r ?? k * G + 128, this.state[t] = Yt, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  /** campo de fluxo completo até um tile, guardado e reaproveitado por 1 minuto (destinos longe) */
  flowTo(t, s) {
    const a = t * 8 + this.iBloq(s), i = this.flowCache.get(a);
    if (i && this.tick - i.t < 600) return i.f;
    const o = this.buildFlow(t, [], s);
    if (this.flowCache.set(a, { f: o, t: this.tick }), this.flowCache.size > 12) {
      let n = -1, r = 1 / 0;
      for (const [l, c] of this.flowCache) c.t < r && (r = c.t, n = l);
      this.flowCache.delete(n);
    }
    return o;
  }
  /** vai longe seguindo o campo de fluxo (sem A*) */
  goFar(t, s, a) {
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, s >> 8)), Math.min(this.size - 1, Math.max(0, a >> 8)), this.owner[t]);
    if (i < 0) return !1;
    const o = this.flowTo(i, this.owner[t]);
    if (o.dist[(this.z[t] >> 8) * this.size + (this.x[t] >> 8)] === or) {
      const n = i % this.size, r = (i - n) / this.size;
      return this.goTo(t, n, r, n, r, void 0, void 0, 4e3);
    }
    return this.field[t] = o, this.path[t] = null, this.lastPartial = !1, this.slotX[t] = i % this.size * G + 128, this.slotZ[t] = Math.floor(i / this.size) * G + 128, this.state[t] = Yt, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  far(t, s, a) {
    const i = s - this.x[t], o = a - this.z[t];
    return i * i + o * o > (22 * G) ** 2;
  }
  goNear(t, s, a) {
    if (!a && this.far(t, this.x[s], this.z[s])) return this.goFar(t, this.x[s], this.z[s]);
    if (a) {
      const n = s % this.size, r = (s - n) / this.size;
      return this.goTo(t, n - 1, r - 1, n + 1, r + 1, void 0, void 0, 6e3);
    }
    if (this.kind[s] >= at) {
      const [n, r, l] = this.footprint(s);
      if (this.bdef(s).walk) {
        const c = l >> 1;
        return this.goTo(t, n + c, r + c, n + c, r + c, this.x[s], this.z[s], 8e3);
      }
      return this.goTo(t, n - 1, r - 1, n + l, r + l, void 0, void 0, 8e3);
    }
    const i = this.x[s] >> 8, o = this.z[s] >> 8;
    return this.goTo(t, i - 1, o - 1, i + 1, o + 1, this.x[s], this.z[s], 3e3);
  }
  goPoint(t, s, a) {
    if (this.far(t, s, a)) {
      this.goFar(t, s, a);
      return;
    }
    const i = this.owner[t], o = this.nearestFree(Math.min(this.size - 1, Math.max(0, s >> 8)), Math.min(this.size - 1, Math.max(0, a >> 8)), i);
    if (o < 0) return;
    const n = o % this.size, r = (o - n) / this.size, l = !this.bloqueioDe(i)[(a >> 8) * this.size + (s >> 8)];
    this.goTo(t, n, r, n, r, l ? s : n * G + 128, l ? a : r * G + 128);
  }
  // ── comandos ──
  /** ordem para o próximo passo. ext: veio de fora da simulação (quem joga, ou o amigo pela rede); as da IA não */
  issue(t, s = !1) {
    this.pending.push({ ...t, ..."ids" in t ? { ids: t.ids.slice() } : {}, at: this.tick + 1, seq: this.seq++, ext: s ? 1 : 0 });
  }
  /** jogo com amigo (convidado): a ordem de fora que o anfitrião aplicou no passo `at` (chegam na ordem em que ele aplicou) */
  schedule(t, s) {
    this.pending.push({ ...t, ..."ids" in t ? { ids: t.ids.slice() } : {}, at: s, seq: this.seq++, ext: 1 });
  }
  /** as ordens de fora que ainda não foram aplicadas (quando o anfitrião recarrega o jogo para o amigo entrar) */
  takePendingExt() {
    const t = this.pending.filter((s) => s.ext);
    return this.pending = this.pending.filter((s) => !s.ext), t.map(({ at: s, seq: a, ext: i, ...o }) => o);
  }
  own(t) {
    return t.ids.filter((s) => this.isUnit(s) && this.owner[s] === t.player);
  }
  apply(t) {
    const s = this.players[t.player];
    if (!(!s || s.defeated)) {
      if ("ids" in t) {
        const a = t.ext === 1;
        for (const i of t.ids) this.isUnit(i) && this.owner[i] === t.player && (this.alvo2[i] = -1, a && (this.firme[i] = this.tick + Ic));
      }
      switch (t.type) {
        case "move":
        case "amove": {
          const a = this.own(t);
          for (const i of a)
            this.task[i] = t.type === "amove" ? Ss : Ot, this.amx[i] = t.x, this.amz[i] = t.z, this.rallyX[i] = t.type === "amove" ? t.x : -1, this.rallyZ[i] = t.type === "amove" ? t.z : -1, this.tgt[i] = -1, this.aggro[i] = 0, this.fails[i] = 0;
          this.orderMove(a, t.x, t.z);
          break;
        }
        case "stop":
          for (const a of this.own(t))
            this.task[a] = Ot, this.state[a] = It, this.path[a] = null, this.field[a] = null, this.foodMode[a] = 0;
          break;
        case "food":
          for (const a of this.own(t)) this.kind[a] === pt.villager && (this.foodMode[a] = t.on ? 2 : 0);
          break;
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === $e && s.era < 2) return;
          const a = this.resKind[t.k] === ie;
          for (const i of this.own(t)) this.kind[i] === pt.villager && (this.task[i] = jt, this.tgt[i] = t.k, this.tgtTile[i] = 1, this.phase[i] = Pe, this.fails[i] = 0, a || (this.foodMode[i] = 0), this.goNear(i, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const a = t.target;
          if (!this.alive[a]) return;
          for (const i of this.own(t)) {
            const o = this.kind[i] === pt.villager;
            if (this.kind[a] >= at && this.owner[a] === t.player) {
              if (!o) continue;
              this.done[a] ? this.bdef(a).key === "farm" ? (this.task[i] = jt, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = Pe, this.goNear(i, a, !1)) : this.bdef(a).drop && this.carry[i] > 0 && (this.task[i] = jt, this.phase[i] = ga, this.tgt[i] = -1, this.goNear(i, a, !1)) : (this.task[i] = ke, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
              continue;
            }
            if (this.kind[a] === gt) {
              o && (this.task[i] = jt, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = Pe, this.goNear(i, a, !1));
              continue;
            }
            W[this.kind[i]].siege && this.kind[a] < at || (this.owner[a] === Mt || this.hostile(t.player, this.owner[a])) && (this.task[i] = Rt, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
          }
          break;
        }
        case "build": {
          const a = this.own(t).filter((n) => this.kind[n] === pt.villager), i = ct[Nt[t.key]];
          if (!a.length || !i?.buildable || i.era > s.era || !this.canAfford(t.player, i.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, i.cost);
          const o = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of a)
            this.task[n] = ke, this.tgt[n] = o, this.tgtTile[n] = 0, this.goNear(n, o, !1);
          break;
        }
        case "train": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !ho(this.bdef(a), s.era).includes(t.key) || this.queue[a].length >= 5) return;
          const o = W[pt[t.key]];
          if (!this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(pt[t.key]);
          break;
        }
        case "cancel": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.queue[a].length) return;
          const i = this.queue[a].pop();
          this.refund(t.player, i >= ce ? os[i - ce].cost : W[i].cost), this.queue[a].length || (this.work[a] = 0);
          break;
        }
        case "ageup": {
          const a = t.building, i = Ke[s.era];
          if (!i || s.era >= Nn || s.aging || !this.isBuilding(a) || this.owner[a] !== t.player || this.bdef(a).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), s.aging = i.time * 10, s.agingB = a;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const a = t.building, i = Wa[t.key], o = os[i];
          if (!o || !this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !(this.bdef(a).research ?? []).includes(t.key) || s.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, i) || o.needs && !this.hasTech(t.player, o.needs) || this.queue[a].length >= 5 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(ce + i);
          break;
        }
        case "trade": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !this.bdef(a).market || t.give === t.get || !ns.includes(t.give) || !ns.includes(t.get) || s.res[t.give] < Re.give * 100) return;
          s.res[t.give] -= Re.give * 100, s.res[t.get] += (this.fair ? Re.fair : Re.get) * 100;
          break;
        }
        case "ia":
          s.ai = !0;
          break;
        // M6: o computador assume (a IA continua de onde a tribo estava)
        case "wall": {
          const a = this.muroDaEra(s.era), i = this.own(t).filter((r) => this.kind[r] === pt.villager);
          if (!a || !i.length) return;
          const o = ct[Nt[a]], n = [];
          if (!this.canAfford(t.player, o.cost)) return;
          for (const r of t.tiles.slice(0, as)) {
            const l = r % this.size, c = (r - l) / this.size;
            if (r < 0 || r >= this.size * this.size || !this.canPlace(t.player, a, l, c)) continue;
            const h = this.spawnBuilding(t.player, a, l, c, !1);
            this.aPagar[h] = 1, n.push(h);
          }
          if (!n.length) return;
          for (const r of i)
            this.task[r] = ke, this.tgt[r] = n[0], this.tgtTile[r] = 0, this.goNear(r, n[0], !1);
          break;
        }
      }
    }
  }
  orderMove(t, s, a) {
    if (!t.length) return;
    const i = this.owner[t[0]], o = this.bloqueioDe(i), n = this.size, r = this.nearestFree(Math.min(n - 1, Math.max(0, s >> 8)), Math.min(n - 1, Math.max(0, a >> 8)), i);
    if (r < 0) return;
    if (t.length === 1) {
      this.goPoint(t[0], s, a);
      return;
    }
    const l = o[(a >> 8) * n + (s >> 8)], c = l ? r % n * G + 128 : s, h = l ? Math.floor(r / n) * G + 128 : a;
    t.sort((u, g) => {
      const b = (this.x[u] - c) ** 2 + (this.z[u] - h) ** 2, k = (this.x[g] - c) ** 2 + (this.z[g] - h) ** 2;
      return b - k || u - g;
    });
    const f = this.buildFlow(r, t, i);
    let d = 0;
    for (const u of t) {
      let g = c, b = h;
      for (; d < Ds.length; ) {
        const [k, y] = Ds[d++], M = c + k * 218, v = h + y * 218;
        if (!this.blockedAt(M, v, i) && !this.ehMuro((v >> 8) * n + (M >> 8))) {
          g = M, b = v;
          break;
        }
      }
      this.slotX[u] = g, this.slotZ[u] = b, this.state[u] = Yt, this.field[u] = f, this.path[u] = null, this.stuck[u] = 0, this.best[u] = 2147483647;
    }
  }
  buildFlow(t, s, a) {
    const i = this.size, o = i * i, n = new Oc(t, o), r = n.dist, l = this.bloqueioDe(a), c = /* @__PURE__ */ new Set();
    for (const b of s) c.add((this.z[b] >> 8) * i + (this.x[b] >> 8));
    const h = this.aHeap;
    let f = 0;
    const d = (b) => {
      let k = f++;
      for (h[k] = b; k > 0; ) {
        const y = k - 1 >> 1;
        if (h[y] <= h[k]) break;
        const M = h[y];
        h[y] = h[k], h[k] = M, k = y;
      }
    }, u = () => {
      const b = h[0];
      h[0] = h[--f];
      let k = 0;
      for (; ; ) {
        const y = k * 2 + 1, M = y + 1;
        let v = k;
        if (y < f && h[y] < h[v] && (v = y), M < f && h[M] < h[v] && (v = M), v === k) break;
        const z = h[v];
        h[v] = h[k], h[k] = z, k = v;
      }
      return b;
    };
    r[t] = 0, d(t);
    let g = s.length ? c.size : -1;
    for (; f > 0; ) {
      const b = u(), k = b % 65536, y = (b - k) / 65536;
      if (y > r[k]) continue;
      if (g > 0 && c.has(k) && (c.delete(k), --g <= 0 && y > 400))
        break;
      const M = k % i, v = (k - M) / i;
      for (let z = 0; z < 8; z++) {
        const N = M + xa[z], A = v + Ma[z];
        if (N < 0 || A < 0 || N >= i || A >= i) continue;
        const I = A * i + N;
        if (l[I] || z >= 4 && (l[v * i + N] || l[A * i + M])) continue;
        const B = y + Ro[z];
        B < r[I] && (r[I] = B, d(B * 65536 + I));
      }
    }
    return n;
  }
  // ── passo ──
  step() {
    if (this.outcome !== "playing" && this.players.every((t) => !t.ai || t.defeated), this.px.set(this.x), this.pz.set(this.z), this.nodesTick = 0, this.overBudget = !1, this.pending.length) {
      const t = this.pending.filter((s) => s.at <= this.tick).sort((s, a) => a.ext - s.ext || s.seq - a.seq);
      this.pending = this.pending.filter((s) => s.at > this.tick);
      for (const s of t) this.apply(s);
      if (this.onApplied) {
        const s = t.filter((a) => a.ext);
        s.length && this.onApplied(this.tick, s);
      }
    }
    this.buildHash(), $c(this), Fl(this), this.saiDoMuro(), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const s = W[this.kind[t]];
    return Math.round((this.fast[t] && s.animal ? s.animal.run : s.speed) * G / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let s = 0; s < this.top; s++) {
      if (!this.alive[s] || this.state[s] !== Yt || this.kind[s] >= gt) continue;
      const a = this.x[s], i = this.z[s], o = this.speedOf(s), n = this.owner[s], r = this.bloqueioDe(n);
      let l = this.slotX[s], c = this.slotZ[s];
      const h = this.path[s];
      if (h && this.pathI[s] < h.length) {
        const A = h[this.pathI[s]], I = A % t * G + 128, B = Math.floor(A / t) * G + 128;
        Math.abs(I - a) + Math.abs(B - i) < 110 && this.pathI[s] < h.length - 1 && this.pathI[s]++, (this.pathI[s] < h.length - 1 || Math.abs(I - a) + Math.abs(B - i) >= 110) && (l = I, c = B), this.pathI[s] === h.length - 1 && Math.abs(I - a) + Math.abs(B - i) < 110 && (this.path[s] = null, l = this.slotX[s], c = this.slotZ[s]);
      }
      const f = this.slotX[s] - a, d = this.slotZ[s] - i, u = f * f + d * d;
      if (!this.path[s] && u <= o * o) {
        this.x[s] = this.slotX[s], this.z[s] = this.slotZ[s], this.state[s] = It, this.field[s] = null;
        continue;
      }
      const g = this.field[s];
      if (g && !this.path[s] && u > 640 * 640) {
        const A = a >> 8, I = i >> 8, B = I * t + A;
        let P = g.dist[B], R = -1, $ = -1;
        for (let T = 0; T < 8; T++) {
          const w = A + xa[T], O = I + Ma[T];
          if (w < 0 || O < 0 || w >= t || O >= t) continue;
          const S = O * t + w;
          r[S] || T >= 4 && (r[I * t + w] || r[O * t + A]) || g.dist[S] < P && (P = g.dist[S], R = w, $ = O);
        }
        R >= 0 && (l = R * G + 128, c = $ * G + 128);
      }
      const b = l - a, k = c - i, y = Ve(b * b + k * k);
      if (y === 0) {
        this.state[s] = It;
        continue;
      }
      const M = Math.min(o, y);
      let v = a + ze(b * M, y), z = i + ze(k * M, y);
      this.blockedAt(v, z, n) && (this.blockedAt(v, i, n) ? this.blockedAt(a, z, n) ? (v = a, z = i) : v = a : z = i), this.x[s] = v, this.z[s] = z;
      const N = Math.abs(f) + Math.abs(d);
      N + 24 < this.best[s] ? (this.best[s] = N, this.stuck[s] = 0) : this.stuck[s] = Math.min(255, this.stuck[s] + 1), (this.stuck[s] > 30 || this.stuck[s] > 10 && N < 3 * G && !this.path[s]) && (this.state[s] = It, this.field[s] = null, this.path[s] = null);
    }
  }
  buildHash() {
    const t = this.hs, s = this.hashHead, a = this.hashNext;
    s.fill(-1);
    for (let i = 0; i < this.top; i++) {
      if (!this.alive[i] || this.kind[i] >= gt) continue;
      const o = Math.min(t - 1, Math.max(0, this.z[i] >> 9)) * t + Math.min(t - 1, Math.max(0, this.x[i] >> 9));
      a[i] = s[o], s[o] = i;
    }
  }
  /** chama fn para cada unidade a até r tiles de (x, z) (usa a grade do tick) */
  near(t, s, a, i) {
    const o = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(a / 2)), r = Math.min(o - 1, (t >> 9) + Math.ceil(a / 2)), l = Math.max(0, (s >> 9) - Math.ceil(a / 2)), c = Math.min(o - 1, (s >> 9) + Math.ceil(a / 2)), h = a * G * (a * G);
    for (let f = l; f <= c; f++) for (let d = n; d <= r; d++) for (let u = this.hashHead[f * o + d]; u !== -1; u = this.hashNext[u]) {
      const g = this.x[u] - t, b = this.z[u] - s;
      g * g + b * b <= h && this.alive[u] && i(u);
    }
  }
  separate() {
    const t = this.hs, s = this.hashHead, a = this.hashNext;
    this.buildHash();
    for (let i = 0; i < this.top; i++)
      this.pushX[i] = 0, this.pushZ[i] = 0;
    for (let i = 0; i < this.top; i++) {
      if (!this.isUnit(i)) continue;
      const o = Math.round(W[this.kind[i]].radius * G), n = this.x[i] >> 9, r = this.z[i] >> 9;
      for (let l = -1; l <= 1; l++) for (let c = -1; c <= 1; c++) {
        const h = n + c, f = r + l;
        if (!(h < 0 || f < 0 || h >= t || f >= t))
          for (let d = s[f * t + h]; d !== -1; d = a[d]) {
            if (d <= i || !this.isUnit(d)) continue;
            const u = Math.round(W[this.kind[d]].radius * G), g = o + u;
            let b = this.x[d] - this.x[i], k = this.z[d] - this.z[i];
            if (b >= g || b <= -g || k >= g || k <= -g) continue;
            let y = b * b + k * k;
            if (y >= g * g) continue;
            y === 0 && (b = 1 + i % 3, k = 1 + d % 3, y = b * b + k * k);
            const M = Ve(y) || 1, v = g - M >> 1, z = ze(b * v, M), N = ze(k * v, M), A = this.state[i] === Yt ? 1 : 2, I = this.state[d] === Yt ? 1 : 2;
            this.pushX[i] -= ze(z * A, 2), this.pushZ[i] -= ze(N * A, 2), this.pushX[d] += ze(z * I, 2), this.pushZ[d] += ze(N * I, 2);
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
        if (!this.alive[r] || this.owner[r] !== i || this.kind[r] === gt) continue;
        const l = this.kind[r] >= at ? this.bdef(r).sight : W[this.kind[r]].sight, c = Bc(l), h = this.x[r] >> 8, f = this.z[r] >> 8;
        for (let d = 0; d < c.length; d += 2) {
          const u = h + c[d], g = f + c[d + 1];
          if (u < 0 || g < 0 || u >= t || g >= t) continue;
          const b = g * t + u;
          o[b] = 1, n[b] = 1;
        }
      }
    }
    const s = this.times;
    if (!s) return;
    const a = t * t;
    for (let i = 0; i < s.length; i++) for (let o = i + 1; o < s.length; o++) if (s[i] === s[o]) {
      const n = this.vis[i], r = this.vis[o], l = this.explored[i], c = this.explored[o];
      for (let h = 0; h < a; h++)
        n[h] !== r[h] && (n[h] = r[h] = 1), l[h] !== c[h] && (l[h] = c[h] = 1);
    }
  }
  /** calendário: mês 0 = março */
  get month() {
    return Math.floor(this.tick / ge) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (ge * 12)) + 1;
  }
  drain() {
    const t = this.events;
    return this.events = [], t;
  }
  hash() {
    let t = 2166136261;
    const s = (a) => {
      for (let i = 0; i < 32; i += 8)
        t ^= a >>> i & 255, t = Math.imul(t, 16777619);
    };
    s(this.tick);
    for (let a = 0; a < this.top; a++) this.alive[a] && (s(a), s(this.kind[a]), s(this.owner[a]), s(this.x[a]), s(this.z[a]), s(this.hp[a]), s(this.task[a]), s(this.carry[a]));
    for (const a of this.players) for (const i of bs) s(a.res[i]);
    return t >>> 0;
  }
}
function Lt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const Do = /* @__PURE__ */ new Set();
function is(e, t) {
  const s = e + JSON.stringify(t);
  Do.has(s) || (Do.add(s), Lt(e, t));
}
function ki(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function qc(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const Nc = ["facil", "normal", "dificil"], Rc = [5, 15, 30, 60, 90], Ae = (e) => new Qt(e), Bt = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: Ae("#f4f7fa") },
  uGrassA: { value: Ae("#6fa84a") },
  uGrassB: { value: Ae("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: Ae("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: Ae("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: Ae("#5cb8b2") },
  uDeep: { value: Ae("#1f6079") }
}, nr = `
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`, Fc = `
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, rr = `
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
#endif`, Dc = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, Lc = `
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
#endif`, jc = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, Hc = `
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
function go(e, t = {}) {
  const s = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", ...t };
  return e.defines = Object.assign(e.defines || {}, s), e.onBeforeCompile = (a) => {
    for (const i in Bt) a.uniforms[i] = Bt[i];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + nr).replace("#include <begin_vertex>", `#include <begin_vertex>
` + rr).replace("#include <project_vertex>", `#include <project_vertex>
` + Dc), a.fragmentShader = a.fragmentShader.replace("#include <common>", `#include <common>
` + Fc).replace("#include <color_fragment>", `#include <color_fragment>
` + Lc).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + jc).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + Hc);
  }, e.customProgramCacheKey = () => JSON.stringify(s), e;
}
function lr(e) {
  const t = new nl({ depthPacking: rl });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (s) => {
    for (const a in Bt) s.uniforms[a] = Bt[a];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + nr).replace("#include <begin_vertex>", `#include <begin_vertex>
` + rr);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const Zt = (e = {}, t = {}) => go(new Qs({ flatShading: !0, ...e }), t);
function Uc(e) {
  const t = e.hn - 1;
  e.hstep;
  const s = e.size, a = new ri(s, s, t, t).rotateX(-Math.PI / 2).translate(s / 2, 0, s / 2), i = a.attributes.position;
  for (let y = 0; y < i.count; y++) i.setY(y, e.heights[y]);
  const o = a.toNonIndexed(), n = o.attributes.position, r = n.count, l = new Float32Array(r * 3), c = new Float32Array(r * 2), h = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, f = (y) => new Qt().setRGB(y[0], y[1], y[2], En), d = Object.fromEntries(Object.entries(h).map(([y, M]) => [y, f(M)])), u = new St(), g = new St(), b = new St();
  for (let y = 0; y < r; y += 3) {
    u.fromBufferAttribute(n, y), g.fromBufferAttribute(n, y + 1), b.fromBufferAttribute(n, y + 2);
    const M = (u.x + g.x + b.x) / 3, v = (u.y + g.y + b.y) / 3, z = (u.z + g.z + b.z) / 3, N = Math.min(s - 1, Math.max(0, Math.floor(M))), A = Math.min(s - 1, Math.max(0, Math.floor(z))), I = e.terrain[A * s + N], B = Math.abs(new St().subVectors(b, g).cross(new St().subVectors(u, g)).normalize().y), P = 0.93 + (y * 2654435761 >>> 0) / 4294967296 * 0.14, R = ms(M * 0.045, z * 0.045, 5, 2);
    let $ = null, T = 0;
    if (v < -0.45) $ = d.bed;
    else if (I === Ga || I === ks || I === ss || v < 0.5) $ = d.sand;
    else if (I === Qe || B < 0.66) $ = v > 6 ? d.rock2 : d.rock;
    else if (I === Fe && v > li - 0.3) $ = d.rock2;
    else {
      T = 1;
      const w = 0.86 + R * 0.3 - Math.min(1, Math.max(0, (v - 4) / 12)) * 0.08;
      $ = new Qt(w, w, w);
    }
    for (let w = 0; w < 3; w++) {
      const O = (y + w) * 3;
      l[O] = $.r * P, l[O + 1] = $.g * P, l[O + 2] = $.b * P, c[(y + w) * 2] = T, c[(y + w) * 2 + 1] = R;
    }
  }
  o.setAttribute("color", new Ee(l, 3)), o.setAttribute("aGrass", new Ee(c, 2)), o.computeVertexNormals();
  const k = new We(o, Zt({ vertexColors: !0 }, { TERRAIN: "" }));
  return k.receiveShadow = !0, k.castShadow = !0, k;
}
function _c(e) {
  const t = e.size, s = Math.round(t / 1.6), a = new ri(t, t, s, s).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), i = a.attributes.position, o = new Float32Array(i.count);
  for (let r = 0; r < i.count; r++) o[r] = -mt(e, i.getX(r), i.getZ(r));
  a.setAttribute("aDepth", new Ee(o, 1));
  const n = new We(a, go(new ll({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const be = Math.PI * 2, Lo = new In(), jo = new lo(), Ho = new St(), Uo = new St(), za = new St(), Aa = new Qt();
function x(e = 0, t = 0, s = 0, a = 0, i = 1, o = 1, n = 1, r = 0, l = 0) {
  return Lo.set(r, a, l, "YXZ"), jo.setFromEuler(Lo), Ho.set(e, t, s), Uo.set(i, o, n), new me().compose(Ho, jo, Uo);
}
function Wc() {
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
  ], t = new ls();
  return t.setAttribute("position", new xs(e, 3)), t;
}
const Ta = {
  box: new he(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new js(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new js(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cone4: new Bi(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new Bi(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new Pn(0.5, 0),
  dode: new cl(0.5, 0),
  prism: Wc()
}, aa = {};
for (const e in Ta) aa[e] = Ta[e].index ? Ta[e].toNonIndexed() : Ta[e];
class di {
  constructor(t = Math.random) {
    m(this, "pos", []);
    m(this, "col", []);
    this.rand = t;
  }
  add(t, s, a, i = 0.06) {
    const o = aa[t], n = o.attributes.position;
    Aa.set(s);
    const r = 1 + (this.rand() - 0.5) * i;
    for (let l = 0; l < n.count; l++)
      za.fromBufferAttribute(n, l).applyMatrix4(a), this.pos.push(za.x, za.y, za.z), this.col.push(Aa.r * r, Aa.g * r, Aa.b * r);
    return this;
  }
  build() {
    const t = new ls();
    return t.setAttribute("position", new xs(this.pos, 3)), t.setAttribute("color", new xs(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const Ct = (e) => {
  const t = new di();
  return e(t), t.build();
};
function _i(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const $a = new me().makeScale(0, 0, 0);
function Gc(e) {
  const t = new _s(), s = _i(e.seed * 7 + 1), a = e.size, i = {
    oakT: Ct(($) => {
      $.add("cyl5", "#6b4a32", x(0, 0, 0, 0, 0.36, 1.8, 0.36)), $.add("cyl5", "#634430", x(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: Ct(($) => {
      $.add("ico", "#ffffff", x(0, 0, 0, 0, 2.4, 2, 2.4)), $.add("ico", "#e6e6e6", x(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), $.add("ico", "#f3f3f3", x(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: Ct(($) => {
      $.add("cyl5", "#6e4d36", x(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), $.add("cyl5", "#6e4d36", x(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: Ct(($) => {
      $.add("ico", "#ffffff", x(0, 0, 0, 0, 3.7, 1.15, 3.5)), $.add("ico", "#e8e8e8", x(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: Ct(($) => $.add("cyl5", "#5d4330", x(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: Ct(($) => {
      $.add("cone7", "#ffffff", x(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), $.add("cone7", "#ececec", x(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), $.add("cone7", "#f6f6f6", x(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, o = Zt({ vertexColors: !0 }), n = [
    { kind: Dn, t: i.oakT, c: i.oakC, mat: Zt({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: Ni, t: i.pineT, c: i.pineC, mat: Zt({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: Ln, t: i.firT, c: i.firC, mat: Zt({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = 3, f = ($, T) => Math.min(h - 1, Math.floor($ / a * h)) * h + Math.min(h - 1, Math.floor(T / a * h));
  for (const $ of n) {
    const T = [];
    for (let O = 0; O < a * a; O++) e.tree[O] === $.kind && T.push(O);
    for (let O = T.length - 1; O > 0; O--) {
      const S = Math.floor(s() * (O + 1)), C = T[O];
      T[O] = T[S], T[S] = C;
    }
    const w = Array.from({ length: h * h }, () => []);
    for (const O of T) {
      const S = O % a + 0.5 + (s() - 0.5) * 0.4, C = Math.floor(O / a) + 0.5 + (s() - 0.5) * 0.4, U = mt(e, S, C), H = $.s * (0.85 + s() * 0.45), J = s() * be;
      w[f(S, C)].push({ mt: x(S, U - 0.1, C, J, H, H, H), mc: x(S, U - 0.1 + $.cy * H, C, J, H, H, H), c: new Qt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.8 + s() * 0.25), k: O });
    }
    for (const O of w) {
      if (!O.length) continue;
      const S = new Ut($.t, o, O.length), C = new Ut($.c, $.mat, O.length);
      O.forEach((U, H) => {
        S.setMatrixAt(H, U.mt), C.setMatrixAt(H, U.mc), C.setColorAt(H, U.c), l.set(U.k, { t: S, c: C, i: H });
      });
      for (const U of [S, C])
        U.castShadow = !0, U.receiveShadow = !0, U.computeBoundingSphere(), t.add(U);
      $.depth && (C.customDepthMaterial = lr($.depth)), r.push({ t: S, c: C, n: O.length });
    }
  }
  const d = [], u = ($, T, w, O, S = !0) => {
    const C = new Ut(aa.dode, Zt(), Math.max(1, $.length * O));
    let U = 0;
    for (const H of $) for (let J = 0; J < O; J++) {
      const ut = H.x + 0.5 + (s() - 0.5) * 0.7, $t = H.z + 0.5 + (s() - 0.5) * 0.7, At = w * (0.6 + s() * 0.6);
      if (C.setMatrixAt(U, x(ut, mt(e, ut, $t) + At * 0.15, $t, s() * be, At, At * (0.55 + s() * 0.4), At, s() * 0.5, s() * 0.5)), S) {
        const it = H.z * a + H.x, tt = c.get(it) ?? [];
        tt.push({ m: C, i: U }), c.set(it, tt);
      }
      C.setColorAt(U++, new Qt(T).multiplyScalar(0.85 + s() * 0.3));
    }
    return C.count = U, C.castShadow = C.receiveShadow = !0, C.computeBoundingSphere(), t.add(C), C;
  };
  u(e.res.filter(($) => $.kind === Le), "#c4bdae", 0.75, 2);
  const g = e.res.filter(($) => $.kind === $e);
  d.push(u(g, "#7a6a58", 0.7, 2), u(g, "#4fa58a", 0.32, 2));
  const b = e.res.filter(($) => $.kind === ie), k = new Ut(aa.ico, Zt({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, b.length)), y = new Ut(aa.ico, Zt({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, b.length * 6)), M = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  b.forEach(($, T) => {
    const w = $.x + 0.5, O = $.z + 0.5, S = mt(e, w, O);
    k.setMatrixAt(T, x(w, S + 0.35, O, s() * be, 1.05, 0.85, 1.05));
    const C = [];
    for (let U = 0; U < 6; U++) {
      const H = s() * be, J = x(w + Math.cos(H) * 0.45, S + 0.35 + s() * 0.35, O + Math.sin(H) * 0.45, 0, 0.11, 0.11, 0.11);
      y.setMatrixAt(T * 6 + U, J), C.push(J);
    }
    M.set($.z * a + $.x, C), v.set($.z * a + $.x, T * 6);
  });
  for (const $ of [k, y])
    $.castShadow = !0, $.computeBoundingSphere(), t.add($);
  const z = Ct(($) => {
    for (let T = 0; T < 3; T++) $.add("cone4", "#ffffff", x((T - 1) * 0.12, 0, T % 2 * 0.1, T * 2, 0.14, 0.5 + T * 0.08, 0.14, (T - 1) * 0.3, (T - 1) * 0.25), 0.15);
  }), N = [];
  for (let $ = 0; $ < 3e4 && N.length < 3200; $++) {
    const T = s() * a, w = s() * a, O = Math.floor(w) * a + Math.floor(T), S = e.terrain[O];
    if (S !== Ze && S !== Fe || e.tree[O]) continue;
    const C = mt(e, T, w);
    C < 0.7 || C > 14 || S === Fe && C > li - 0.3 || N.push(x(T, C - 0.02, w, s() * be, 0.6 + s() * 0.6, 0.5 + s() * 0.6, 0.6 + s() * 0.6));
  }
  const A = new Ut(z, Zt({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, N.length));
  N.forEach(($, T) => {
    A.setMatrixAt(T, $), A.setColorAt(T, new Qt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.85 + s() * 0.3));
  }), A.receiveShadow = !0, A.computeBoundingSphere(), t.add(A);
  const I = ($, T) => {
    for (const w of r) w.t.count = w.c.count = Math.floor(w.n * $);
    A.count = Math.floor(N.length * T);
  }, B = ($) => {
    const T = l.get($);
    T && (T.t.setMatrixAt(T.i, $a), T.c.setMatrixAt(T.i, $a), T.t.instanceMatrix.needsUpdate = T.c.instanceMatrix.needsUpdate = !0, l.delete($));
  }, P = ($) => {
    R($, !1);
    const T = c.get($);
    if (T) {
      for (const { m: w, i: O } of T)
        w.setMatrixAt(O, $a), w.instanceMatrix.needsUpdate = !0;
      c.delete($);
    }
  }, R = ($, T) => {
    const w = M.get($), O = v.get($);
    !w || O === void 0 || (w.forEach((S, C) => y.setMatrixAt(O + C, T ? S : $a)), y.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: d, tufts: A, setDensity: I, removeTree: B, removeRes: P, setBerries: R };
}
function Vc(e, t = !1) {
  const s = e[0].index !== null, a = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), o = {}, n = {}, r = e[0].morphTargetsRelative, l = new ls();
  let c = 0;
  for (let h = 0; h < e.length; ++h) {
    const f = e[h];
    let d = 0;
    if (s !== (f.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const u in f.attributes) {
      if (!a.has(u))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + '. All geometries must have compatible attributes; make sure "' + u + '" attribute exists among all geometries, or in none of them.'), null;
      o[u] === void 0 && (o[u] = []), o[u].push(f.attributes[u]), d++;
    }
    if (d !== a.size)
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
      if (s)
        u = f.index.count;
      else if (f.attributes.position !== void 0)
        u = f.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + h + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(c, u, h), c += u;
    }
  }
  if (s) {
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
    const f = _o(o[h]);
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
      const g = _o(u);
      if (!g)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + h + " morphAttribute."), null;
      l.morphAttributes[h].push(g);
    }
  }
  return l;
}
function _o(e) {
  let t, s, a, i = -1, o = 0;
  for (let c = 0; c < e.length; ++c) {
    const h = e[c];
    if (t === void 0 && (t = h.array.constructor), t !== h.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (s === void 0 && (s = h.itemSize), s !== h.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (a === void 0 && (a = h.normalized), a !== h.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (i === -1 && (i = h.gpuType), i !== h.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    o += h.count * s;
  }
  const n = new t(o), r = new Ee(n, s, a);
  let l = 0;
  for (let c = 0; c < e.length; ++c) {
    const h = e[c];
    if (h.isInterleavedBufferAttribute) {
      const f = l / s;
      for (let d = 0, u = h.count; d < u; d++)
        for (let g = 0; g < s; g++) {
          const b = h.getComponent(d, g);
          r.setComponent(d + f, g, b);
        }
    } else
      n.set(h.array, l);
    l += h.count * s;
  }
  return i !== void 0 && (r.gpuType = i), r;
}
const we = {
  emit: (e, t, s, a) => {
  }
}, ds = new me().makeScale(0, 0, 0), Kc = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], Yc = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], Xc = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], Jc = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], Zc = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85"], Qc = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], Wi = "#b5813e";
function th(e) {
  const t = [], s = [], a = new Qt();
  for (const [o, n] of e) {
    const r = o.index ? o.toNonIndexed() : o, l = r.attributes.position.array;
    a.set(n);
    for (let c = 0; c < l.length; c += 3)
      t.push(l[c], l[c + 1], l[c + 2]), s.push(a.r, a.g, a.b);
  }
  const i = new ls();
  return i.setAttribute("position", new xs(t, 3)), i.setAttribute("color", new xs(s, 3)), i.computeVertexNormals(), i;
}
const xi = {
  leg: new he(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new js(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new he(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new he(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new Pn(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: Vc([new qi(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new qi(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new js(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: Ct((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", x(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: Ct((e) => {
    e.add("cyl5", "#6b4a2f", x(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", x(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: Ct((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", x(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: Ct((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", x(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: Ct((e) => {
    e.add("cyl5", "#7a5a3c", x(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", x(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: Ct((e) => {
    e.add("cyl5", "#8a6a48", x(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", x(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", x(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: th([[new hl(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new he(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: Ct((e) => {
    e.add("cyl5", "#4a3326", x(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", Wi, x(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", x(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", x(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: Ct((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", x(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", x(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", x(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new he(0.26, 0.26, 0.15)
}, Wo = {
  body: new he(1, 1, 1),
  neck: new he(1, 1, 1).translate(0, 0.5, 0),
  collar: new he(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: Ct((e) => {
    e.add("box", "#ffffff", x(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", x(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: Ct((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", x(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new he(1, 1, 1).translate(0, -0.5, 0),
  tail: new he(1, 1, 1).translate(0, -0.5, 0),
  antlers: Ct((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", x(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", x(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", x(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: Ct((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", x(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", x(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: Ct((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", x(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, Mi = {
  body: Ct((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", x(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", x(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", x(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", x(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", x(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", x(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", x(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", x(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", x(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new js(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: Ct((e) => {
    e.add("cyl8", "#5e4431", x(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", x(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", x(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", x(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new he(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, De = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, cr = De.horse.leg + De.horse.body[1], ta = (e) => e * e * (3 - 2 * e);
function Xs(e, t, s) {
  if (e < 0.12) return s - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return s + (t - s) * ta((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const a = (e - 0.8) / 0.2;
  return t + (s - t) * a * a;
}
const Ps = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, Gi = 2.6;
function hr(e) {
  const t = W[e]?.key ?? "";
  if (t === "horseman") return De.horse.leg + De.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  const s = De[t];
  return s ? s.leg + s.body[1] * 0.5 : 0.72;
}
function eh(e) {
  const t = W[e]?.key ?? "";
  if (t === "horseman") return cr + 0.1;
  if (t === "ram") return 1.15;
  const s = De[t];
  return s ? s.leg + s.body[1] + 0.06 : 1.15;
}
const Js = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, He = (e, t) => e[Math.floor(t * e.length) % e.length];
class sh {
  constructor(t = 720, s = 160) {
    m(this, "group", new _s());
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
    /** muros (D35): a peça do muro na frente de quem ataca (troncos ou pedras): a que distância (do centro de quem ataca) e até
     *  que altura ela vai. O golpe, a estocada e a mordida param ali: os troncos ficam no meio do terreno do bloco, não na
     *  borda. Guardado por unidade (quem ataca fica parado: a conta é feita uma vez) */
    m(this, "muroFrente", /* @__PURE__ */ new Map());
    m(this, "m", { b: new me(), hip: new me(), tor: new me(), l: new me(), t: new me(), al: new me(), ar: new me(), hd: new me() });
    m(this, "e", new In());
    m(this, "q", new lo());
    m(this, "p", new St());
    m(this, "s", new St());
    m(this, "v", new St());
    m(this, "c", new Qt());
    this.maxH = t, this.maxA = s;
    const a = Zt({}, { NO_SNOW: "" }), i = Zt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const r in xi) {
      const l = r === "leg" || r === "arm" ? t * 2 : t, c = !!xi[r].attributes.color, h = new Ut(xi[r], c ? i : a, l);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.hm[r] = h;
    }
    for (const r in Wo) {
      const l = r === "leg" ? s * 4 : s, c = ["head", "ears", "antlers", "horns", "tusks"].includes(r), h = new Ut(Wo[r], c ? i : a, l);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set("#ffffff"));
      this.group.add(h), this.am[r] = h;
    }
    for (const r in Mi) {
      const l = r === "wheel" ? this.maxR * 4 : this.maxR, c = !!Mi[r].attributes.color, h = new Ut(Mi[r], c ? i : a, l);
      h.instanceMatrix.setUsage(ye), h.frustumCulled = !1, h.castShadow = !0, h.count = 0;
      for (let f = 0; f < l; f++) h.setColorAt(f, this.c.set(r === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(h), this.rm[r] = h;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const o = new On(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new Ut(o, new ys({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const n = new ri(1, 0.11);
    this.barBg = new Ut(n, new ys({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new Ut(n.clone().translate(0.5, 0, 0), new ys({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const r of [this.ring, this.barBg, this.barFg])
      r.instanceMatrix.setUsage(ye), r.frustumCulled = !1, r.count = 0, this.group.add(r);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let r = 0; r < t; r++) this.ring.setColorAt(r, this.c.set("#9dffc4"));
    for (let r = 0; r < 400; r++) this.barFg.setColorAt(r, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(s).fill(-1);
  }
  /** d: distância até a face da peça; top: até onde ela vai (as pontas dos troncos são finas e escapam dos raios: vale a
   *  altura do modelo, menor na obra); esp: a grossura (a paliçada é uma fileira de troncos; a muralha ocupa o bloco) */
  frenteMuro(t, s, a, i, o, n) {
    const r = `${a}|${Math.round(i * 50)}|${Math.round(o * 50)}|${Math.round(n * 50)}|${t.done[a]}|${t.work[a] >> 5}`, l = this.muroFrente.get(s);
    if (l && l.k === r) return l;
    const c = Math.sin(n), h = Math.cos(n), f = ct[t.kind[a] - at], d = f.key === "palisade";
    let u = 1 / 0;
    for (const k of [0.1, 0.3, 0.55, 0.8]) {
      const y = sn(t, a, i, o, c, h, k * (t.done[a] ? 1 : 0.3));
      y !== null && y < u && (u = y);
    }
    const g = t.done[a] ? 1 : Math.max(0.12, Math.min(1, t.work[a] / (f.time * 100))), b = { k: r, d: u, top: (d ? 1.3 : 1.2) * g, esp: d ? 0.26 : 1 };
    return this.muroFrente.set(s, b), this.muroFrente.size > 512 && this.muroFrente.clear(), b;
  }
  /** o muro (de qualquer dono) até 2 m na frente de quem atira: a lança na mão sobe por cima dele (D35) */
  muroNaFrente(t, s, a, i, o) {
    const n = Math.sin(o), r = Math.cos(o), l = t.size;
    for (let c = 0.2; c <= 2; c += 0.2) {
      const h = Math.floor(a + n * c), f = Math.floor(i + r * c);
      if (h < 0 || f < 0 || h >= l || f >= l) return null;
      const d = t.bAt[f * l + h] - 1;
      if (d >= 0 && t.isBuilding(d) && t.bdef(d).wall) {
        const u = this.frenteMuro(t, s, d, a, i, o);
        return u.d < 3 ? u : null;
      }
    }
    return null;
  }
  trs(t, s, a, i, o = 0, n = 0, r = 0, l = 1, c = l, h = l) {
    return this.e.set(o, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(s, a, i), this.s.set(l, c, h), t.compose(this.p, this.q, this.s);
  }
  look(t, s) {
    const a = Js(s * 7 + 1), i = Js(s * 13 + 5), o = t.owner[s], n = o >= 0 && o < t.players.length ? t.players[o].era : 0, r = o === de ? "#4f6b4a" : t.players[o]?.color ?? "#888", l = W[t.kind[s]].key, c = He(Kc, a), h = He(Yc, i), f = He(Xc, i), d = He(Jc, a), u = { skin: c, hair: h, tunic: f, skirt: r, legs: c, arms: c, weapon: null, shield: null, bigHair: !1, sc: 0.95 + a * 0.08 };
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
        return { ...u, tunic: r, skirt: d, weapon: "spear", shield: n >= 2 ? Wi : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...u, tunic: r, skirt: d, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...u, tunic: d, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...u, tunic: r, skirt: d, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...u, tunic: He(["#4f6b4a", "#6b5a3a", "#3f5a6a"], a), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: He(["#3f6a4a", "#8a6a3a"], i), hair: He(["#c48a4a", "#8a5a2a", "#d9a35f"], a), bigHair: !0, sc: 1.05 };
    }
    return u;
  }
  colorHuman(t, s) {
    const a = this.hm, i = this.c;
    a.leg.setColorAt(t * 2, i.set(s.legs)), a.leg.setColorAt(t * 2 + 1, i), a.skirt.setColorAt(t, i.set(s.skirt)), a.torso.setColorAt(t, i.set(s.tunic)), a.arm.setColorAt(t * 2, i.set(s.arms)), a.arm.setColorAt(t * 2 + 1, i), a.head.setColorAt(t, i.set(s.skin)), a.hair.setColorAt(t, i.set(s.helmet ? Wi : s.hair)), a.shield.setColorAt(t, i.set(s.shield ?? "#888"));
    for (const o in a) a[o].instanceColor && (a[o].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, s) {
    const a = t.kind[s] === gt ? t.sub[s] : t.kind[s];
    return W[a]?.key ?? "deer";
  }
  update(t, s, a, i, o, n, r, l) {
    const c = t.size, h = t.vis[o], f = this.hm, d = this.am, u = this.rm;
    let g = 0, b = 0, k = 0, y = 0, M = 0;
    for (let v = 0; v < t.top; v++) {
      if (!t.alive[v]) continue;
      const z = t.kind[v];
      if (z >= at) {
        const H = ct[z - at], J = t.x[v] / 256, ut = t.z[v] / 256;
        if (n && t.owner[v] !== o && !h[Math.floor(ut) * c + Math.floor(J)]) continue;
        const $t = mt(t.map, J, ut), At = i.has(v);
        At && k < this.maxH && this.ring.setMatrixAt(k++, x(J, $t + 0.08, ut, 0, H.size * 0.95, 1, H.size * 0.95)), (At || t.hp[v] < H.hp) && y < 400 && this.bar(y++, J, $t + 2.3, ut, t.hp[v] / H.hp, H.size * 0.6, l);
        continue;
      }
      const N = (t.px[v] + (t.x[v] - t.px[v]) * s) / 256, A = (t.pz[v] + (t.z[v] - t.pz[v]) * s) / 256;
      if (n && t.owner[v] !== o) {
        const H = Math.floor(N), J = Math.floor(A);
        if (H < 0 || J < 0 || H >= c || J >= c || !h[J * c + H]) continue;
      }
      const I = t.x[v] - t.px[v], B = t.z[v] - t.pz[v], P = (I !== 0 || B !== 0) && t.state[v] === Yt, R = mt(t.map, N, A);
      let $ = this.heading[v];
      if (P) $ = Math.atan2(I, B);
      else if (z !== gt && (t.task[v] === jt || t.task[v] === ke || t.task[v] === Rt) && t.tgt[v] >= 0) {
        const H = t.tgt[v];
        let J, ut;
        t.task[v] === jt && t.tgtTile[v] ? (J = H % c + 0.5, ut = Math.floor(H / c) + 0.5) : (J = t.x[H] / 256, ut = t.z[H] / 256), Math.abs(J - N) + Math.abs(ut - A) > 0.05 && ($ = Math.atan2(J - N, ut - A));
      }
      const T = this.heading[v];
      this.heading[v] = T + Math.atan2(Math.sin($ - T), Math.cos($ - T)) * Math.min(1, a * 10);
      const w = this.heading[v], O = Math.hypot(I, B) / 256 * 10, S = z === gt ? "" : W[z].key, C = z === gt || t.owner[v] === Mt || S === "dog";
      if (S === "ram") {
        if (M >= this.maxR) continue;
        this.phase[v] += P ? a * O / 0.22 : 0, this.slotR[M] !== v * 8 + t.owner[v] + 1 && (this.slotR[M] = v * 8 + t.owner[v] + 1, u.cloth.setColorAt(M, this.c.set(t.players[t.owner[v]]?.color ?? "#888")), u.cloth.instanceColor && (u.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, v, M, N, R, A, w, s), M++;
      } else if (S === "horseman") {
        if (b >= this.maxA || g >= this.maxH) continue;
        const H = De.horse, J = O > 1.1;
        this.phase[v] += P ? a * O * 2.6 / H.leg : 0;
        const ut = v * 64 + z;
        if (this.slotA[b] !== ut) {
          this.slotA[b] = ut;
          const X = this.c.set(He(H.color, Js(v)));
          for (const _t of ["body", "neck", "head", "ears", "tail"]) d[_t].setColorAt(b, X);
          for (let _t = 0; _t < 4; _t++) d.leg.setColorAt(b * 4 + _t, X);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const _t in d) d[_t].instanceColor && (d[_t].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(b, H, N, R, A, w, P, this.phase[v], r, !1, J, !1, 1, !1, 0, 0, !0, !0), b++;
        const $t = t.owner[v], At = `${z}:${$t}:${$t >= 0 && $t < t.players.length ? t.players[$t].era : 0}`, it = this.look(t, v);
        (this.slotH[g] !== v || this.lookKey[g] !== At) && (this.slotH[g] = v, this.lookKey[g] = At, this.colorHuman(g, it));
        const tt = P ? Math.abs(Math.cos(this.phase[v])) * (J ? 0.06 : 0.025) : 0;
        if (P && J) {
          const X = this.phase[v] / Math.PI % 2;
          X < this.lastP[v] && we.emit("animal.hooves", N, A, 0.5), this.lastP[v] = X;
        }
        this.poseHuman(t, v, g, it, N, R, A, w, P, r, s, cr + tt - 0.44 * it.sc), g++;
      } else if (C) {
        if (b >= this.maxA) continue;
        const H = this.speciesOf(t, v), J = De[H] ?? De.deer;
        this.phase[v] += P ? a * O * 2.6 / J.leg : 0;
        const ut = v * 64 + z;
        if (this.slotA[b] !== ut) {
          this.slotA[b] = ut;
          const tt = this.c.set(He(J.color, Js(v)));
          z === gt && tt.multiplyScalar(0.8);
          for (const X of ["body", "neck", "head", "ears", "tail"]) d[X].setColorAt(b, tt);
          for (let X = 0; X < 4; X++) d.leg.setColorAt(b * 4 + X, tt);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const X in d) d[X].instanceColor && (d[X].instanceColor.needsUpdate = !0);
        }
        const $t = z !== gt && t.task[v] === Rt && !P;
        let At = 0, it = 0;
        if ($t) {
          const tt = 1 - Math.max(0, Math.min(1, (t.cd[v] - s) / W[z].cd));
          At = tt > 0.8 ? (tt - 0.8) / 0.2 : tt < 0.2 ? 1 - tt / 0.2 : 0;
          const X = t.tgt[v];
          if (X >= 0 && t.alive[X]) {
            const _t = Math.hypot(t.x[X] - t.x[v], t.z[X] - t.z[v]) / 256, ue = J.body[2] * 0.5 + J.neck * 0.3 + J.head[2] * 0.85, Wt = t.kind[X] < gt ? W[t.kind[X]].radius : 0.5;
            t.kind[X] >= at && ct[t.kind[X] - at].wall ? it = Math.max(0, Math.min(0.5, this.frenteMuro(t, v, X, N, A, w).d - ue)) : it = Math.max(0, Math.min(J.body[2] * 0.3, _t - ue - Wt * 0.95));
          }
        }
        $t && t.cd[v] > this.lastCd[v] && we.emit(H === "boar" ? "hit.boar" : H === "aurochs" ? "hit.aurochs" : "hit.bite", N, A), this.lastCd[v] = z === gt ? 0 : t.cd[v], this.poseAnimal(b, J, N, R, A, w, P, this.phase[v], r, z === gt, t.fast[v] === 1, H === "deer" && Js(v * 3) < 0.5, z === gt ? 1 : 1 + (H === "aurochs" ? 0.1 : 0), $t, At, it, t.owner[v] >= 0 && z !== gt), b++;
      } else {
        if (g >= this.maxH) continue;
        this.phase[v] += P ? a * O * 7.2 : 0;
        const H = t.owner[v], J = `${z}:${H}:${H >= 0 && H < t.players.length ? t.players[H].era : 0}`, ut = this.look(t, v);
        (this.slotH[g] !== v || this.lookKey[g] !== J) && (this.slotH[g] = v, this.lookKey[g] = J, this.colorHuman(g, ut)), this.poseHuman(t, v, g, ut, N, R, A, w, P, r, s), g++;
      }
      const U = S === "ram" ? 1.9 : S === "horseman" ? 1.6 : C ? 1.2 : 1;
      i.has(v) && k < this.maxH && this.ring.setMatrixAt(k++, x(N, R + 0.06, A, 0, U, 1, U)), z !== gt && (i.has(v) || t.hp[v] < W[z].hp) && y < 400 && this.bar(y++, N, R + (S === "horseman" ? 2.6 : S === "ram" ? 1.75 : C ? 1.3 : 1.55), A, t.hp[v] / W[z].hp, S === "ram" || S === "horseman" ? 0.9 : 0.7, l);
    }
    for (const v in f)
      f[v].count = g, f[v].instanceMatrix.needsUpdate = !0;
    f.leg.count = f.arm.count = g * 2;
    for (const v in d)
      d[v].count = b, d[v].instanceMatrix.needsUpdate = !0;
    d.leg.count = b * 4;
    for (const v in u)
      u[v].count = M, u[v].instanceMatrix.needsUpdate = !0;
    u.wheel.count = M * 4, this.ring.count = k, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = y, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
  }
  bar(t, s, a, i, o, n, r) {
    o = Math.max(0, Math.min(1, o)), this.p.set(s, a, i), this.s.set(n, 1, 1), this.barBg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.v.set(-n / 2, 0, 0).applyQuaternion(r), this.p.set(s + this.v.x, a + this.v.y, i + this.v.z), this.s.set(n * o, 1, 1), this.barFg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.barFg.setColorAt(t, this.c.set(o > 0.6 ? "#6fe08a" : o > 0.3 ? "#f2c14e" : "#e0533c"));
  }
  /** mão direita ou esquerda (ponto no braço) em coordenadas do mundo, com a orientação do tronco e um giro em X */
  gripTorso(t, s, a, i, o = 0) {
    return this.v.set(0, -0.35, a).applyMatrix4(s), t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t, 0, 0, 0, i, o));
  }
  /** mount > 0: montado (altura extra do quadril, em cima do cavalo) */
  poseHuman(t, s, a, i, o, n, r, l, c, h, f, d = 0) {
    const u = this.hm, g = this.m, b = this.phase[s], k = Math.sin(b), y = h + s * 0.37, M = d > 0;
    let v = 0, z = 0, N = 0.05 + Math.sin(y * 1.3) * 0.03, A = -0.05 - Math.sin(y * 1.3) * 0.03, I = 0.07, B = -0.07, P = 0, R = 0, $ = 0, T = 0, w = 0, O = 0, S = i.weapon, C = i.weapon === "spear" ? "torso" : i.weapon === "bow" ? "left" : "arm", U = i.weapon === "spear" ? 0.12 : i.weapon === "bow" ? 0 : i.weapon === "sling" ? Math.PI - 0.12 : i.weapon === "sword" ? Math.PI - 0.3 : 0.79, H = 0, J = !1, ut = 0;
    const $t = () => {
      B = -0.42, I = 0.42, N = A + 0.06;
    }, At = t.task[s];
    if (M && (c || At !== Rt || t.state[s] === Yt))
      N = -0.75, I = 0.1, A = -0.25, P = c ? 0.14 : 0.03;
    else if (c)
      v = k * 0.65, z = -k * 0.65, N = -k * 0.5, A = k * 0.5, R = Math.abs(Math.cos(b)) * 0.035;
    else if (At === jt && t.phase[s] === ir) {
      const it = t.tgt[s], tt = t.tgtTile[s] === 1, X = tt && t.map.tree[it] > 0, _t = tt && t.resKind[it] === 1, ue = !tt && t.kind[it] >= at, Wt = (wt, oe) => {
        const Xt = y / wt % 1;
        Xt < this.lastP[s] && we.emit(oe, o, r), this.lastP[s] = Xt;
      };
      if (X)
        A = Xs(y / 1 % 1, -2.75, -1.35), $t(), P = 0.1 + Ps(y / 1 % 1) * 0.12, S = "axe", C = "arm", U = Math.PI - 0.6, Wt(1, "work.chop");
      else if (tt && !_t)
        A = Xs(y / 1.15 % 1, -2.8, -0.55), $t(), P = 0.22 + Ps(y / 1.15 % 1) * 0.14, S = "pick", C = "arm", U = Math.PI - 0.6, Wt(1.15, t.resKind[it] === 3 ? "work.pickMetal" : "work.pick");
      else if (ue)
        A = Xs(y / 1.4 % 1, -1.95, -0.35), $t(), P = 0.32 + Ps(y / 1.4 % 1) * 0.1, S = "pick", C = "arm", U = Math.PI - 0.7, Wt(1.4, "work.hoe");
      else if (_t) {
        const wt = Math.sin(y * 4.5);
        A = -0.95 + wt * 0.45, N = -0.95 - wt * 0.45, B = -0.2, I = 0.2, P = 0.5, S = null, Wt(1.4, "work.rustle");
      } else
        A = -0.55 + Math.sin(y * 7) * 0.3, N = -0.4, P = 0.68, S = null, Wt(1.6, "work.rustle");
    } else if (At === ke && t.state[s] !== Yt) {
      const it = y / 0.75 % 1;
      A = Xs(it, -2.3, -0.7), B = -0.15, N = -0.75, P = 0.15 + Ps(it) * 0.08, S = "mallet", C = "arm", U = Math.PI - 0.75, it < this.lastP[s] && we.emit("work.mallet", o, r), this.lastP[s] = it;
    } else if (At === Rt && t.state[s] !== Yt) {
      const it = W[t.kind[s]], tt = 1 - Math.max(0, Math.min(1, (t.cd[s] - f) / it.cd)), X = t.tgt[s], _t = !!it.hunt && X >= 0 && t.owner[X] === Mt;
      if (t.cd[s] > this.lastCd[s] && !it.proj && !(_t && X >= 0 && t.alive[X] && t.reach(s, X, !1) / 256 >= Gi)) {
        const wt = X >= 0 && t.kind[X] >= at;
        we.emit(wt ? "hit.wall" : i.weapon === "sword" ? "hit.sword" : i.weapon === "axe" ? "hit.axe" : i.weapon === "spear" ? "hit.spear" : "hit.club", o, r);
      }
      const ue = X >= 0 && t.alive[X] ? t.reach(s, X, !1) / 256 : 9, Wt = X >= 0 && t.alive[X] && t.kind[X] >= at && ct[t.kind[X] - at].wall ? this.frenteMuro(t, s, X, o, r, l) : null;
      if (it.proj === "arrow" || i.weapon === "bow")
        S = "bow", C = "left", U = 0, N = -1.5, I = 0.2, B = -0.3, P = -0.04, A = tt < 0.2 ? -0.95 - tt / 0.2 * 0.5 : -1.45, J = tt >= 0.25;
      else if (it.proj === "stone")
        if (S = "sling", C = "arm", N = -0.55, I = 0.18, P = -0.03, tt < 0.2) {
          const wt = tt / 0.2;
          A = -0.75 - wt * 2.05, U = Math.PI / 2 + 0.7 - wt * 0.85;
        } else if (tt < 0.85)
          A = -2.8, B = -0.18, U = Math.PI / 2 - 0.1, w = y * 15;
        else {
          const wt = (tt - 0.85) / 0.15;
          A = -2.8 + ta(wt) * 2.05, U = Math.PI / 2 - 0.1 + wt * 0.8, P = -0.03 + wt * 0.12;
        }
      else if ((it.proj === "spear" || _t) && ue >= Gi) {
        if (S = tt < 0.3 ? null : "spear", C = "torso", U = Math.PI / 2 - 0.25, H = 0.1, N = -1, P = -0.05, tt < 0.3)
          A = -1.25 + tt / 0.3 * 1.05, P = 0.12 - tt / 0.3 * 0.17;
        else if (tt < 0.75) A = -0.2 - ta((tt - 0.3) / 0.45) * 2.55;
        else if (tt < 0.9) A = -2.75;
        else {
          const oe = (tt - 0.9) / 0.1;
          A = -2.75 + oe * oe * 1.5, P = -0.05 + oe * 0.17;
        }
        const wt = this.muroNaFrente(t, s, o, r, l);
        if (wt) {
          const oe = (0.84 - 0.35 * Math.cos(A)) * i.sc + d, Xt = 0.35 * Math.sin(-A) * i.sc, E = Math.atan2(wt.top + 0.25 - oe, Math.max(0.12, wt.d - Xt));
          E > 0.25 && (U = Math.PI / 2 - Math.min(1.35, E));
        }
      } else if (i.weapon === "spear" || it.proj === "spear" || _t) {
        if (S = "spear", C = "torso", H = 0.05, N = i.shield ? -0.9 : -0.5, I = 0.15, tt < 0.15) A = -1.25;
        else if (tt < 0.85) A = -1.25 + ta((tt - 0.15) / 0.7) * 0.9;
        else {
          const D = (tt - 0.85) / 0.15;
          A = -0.35 - D * D * 0.9;
        }
        P = 0.06 + (tt > 0.85 ? (tt - 0.85) / 0.15 : tt < 0.15 ? 1 - tt / 0.15 : 0) * 0.12;
        let wt = ue, oe = 0.72, Xt = X >= 0 ? Math.hypot(t.x[X] - t.x[s], t.z[X] - t.z[s]) / 256 : ue;
        if (Wt)
          wt = Wt.d, Xt = Wt.d, oe = Math.min(0.72, Wt.top * 0.6);
        else if (X >= 0 && t.alive[X] && t.kind[X] < gt) {
          const D = De[W[t.kind[X]].key];
          if (oe = hr(t.kind[X]), D) {
            const j = Math.cos(Math.atan2(t.x[s] - t.x[X], t.z[s] - t.z[X]) - this.heading[X]);
            wt = Xt - Math.max(D.body[0] * 0.55, D.body[2] * 0.5 * Math.abs(j));
          } else {
            const j = W[t.kind[X]].radius;
            wt = Xt - (j > 0.35 ? j * 0.85 : 0.2);
          }
        }
        const E = 0.35 * Math.sin(-A), F = (0.84 - 0.35 * Math.cos(A)) * i.sc + d, L = Math.atan2(F - oe, Math.max(0.4, Xt - E));
        U = Math.PI / 2 + L, ut = Math.max(0, E + 1.4 * Math.cos(L) - wt + 0.03);
      } else {
        S || (S = "club");
        const oe = (X >= 0 && t.alive[X] ? t.kind[X] >= at ? 1 : eh(t.kind[X]) : 0.6) + (S === "sword" ? 0.18 : 0);
        let Xt = -0.6;
        for (; Xt > -2.2 && (0.84 - 0.35 * Math.cos(Xt) - 0.5 * Math.cos(Xt - 0.75)) * i.sc + d < oe; ) Xt -= 0.05;
        if (Wt) {
          const E = (j) => (0.84 - 0.35 * Math.cos(j) - 0.5 * Math.cos(j - 0.75)) * i.sc + d, F = (j) => (0.35 * Math.sin(-j) + 0.5 * Math.sin(0.75 - j)) * i.sc + 0.06;
          O = Math.max(0, Math.min(0.5, Wt.d - 0.74 * i.sc));
          const L = Wt.d - O;
          let D = -2.6;
          for (; D < -0.6 && !(F(D) >= L - 0.02 && (E(D) <= Wt.top + 0.04 || F(D) >= L + Wt.esp)); ) D += 0.04;
          Xt = D;
        }
        if (C = "arm", U = Math.PI - 0.75, A = Xs(tt, -2.6, Math.max(-2.25, Xt)), B = -0.15, N = -0.5, P = 0.08 + Ps(tt) * 0.12, O) {
          const E = O * Ps(tt);
          o += Math.sin(l) * E, r += Math.cos(l) * E;
        }
        S === "sword" && (w = 0.22);
      }
    }
    M && (v = z = -0.38, $ = 0.5, T = -0.5), this.lastCd[s] = t.cd[s], this.lastCarry[s] > 0 && t.carry[s] === 0 && t.task[s] === jt && we.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal"][t.carryRes[s]] ?? "drop.food", o, r), this.lastCarry[s] = t.carry[s], this.trs(g.b, o, n + R + d, r, 0, l, 0, i.sc), g.hip.multiplyMatrices(g.b, this.trs(g.t, 0, 0.46, 0)), g.tor.multiplyMatrices(g.hip, this.trs(g.t, 0, 0, 0, P)), u.torso.setMatrixAt(a, g.tor), u.leg.setMatrixAt(a * 2, g.l.multiplyMatrices(g.hip, this.trs(g.t, 0.09, 0, 0, v, 0, $))), u.leg.setMatrixAt(a * 2 + 1, g.l.multiplyMatrices(g.hip, this.trs(g.t, -0.09, 0, 0, z, 0, T))), u.skirt.setMatrixAt(a, g.l.multiplyMatrices(g.hip, this.trs(g.t, 0, 0.03, 0, P * 0.35))), g.al.multiplyMatrices(g.tor, this.trs(g.t, 0.215, 0.38, 0, N, 0, -I)), u.arm.setMatrixAt(a * 2, g.al), g.ar.multiplyMatrices(g.tor, this.trs(g.t, -0.215, 0.38, 0, A, 0, -B)), u.arm.setMatrixAt(a * 2 + 1, g.ar), g.hd.multiplyMatrices(g.tor, this.trs(g.t, 0, 0.53, 0, -P * 0.6)), u.head.setMatrixAt(a, g.hd), u.hair.setMatrixAt(a, g.l.multiplyMatrices(g.hd, this.trs(g.t, 0, 0.03, -0.012, 0, 0, 0, i.bigHair ? 1.18 : 1))), i.shield ? (this.v.set(0.04, -0.24, 0.13).applyMatrix4(g.al), u.shield.setMatrixAt(a, g.l.copy(g.tor).setPosition(this.v))) : u.shield.setMatrixAt(a, ds);
    for (const it of Qc) u[it].setMatrixAt(a, ds);
    S && (C === "arm" ? u[S].setMatrixAt(a, g.l.multiplyMatrices(g.ar, this.trs(g.t, 0, -0.35, 0, U, w))) : (this.gripTorso(g.l, C === "left" ? g.al : g.ar, C === "left" ? 0.02 : 0, U, C === "torso" ? H : 0), ut && g.l.multiply(this.trs(g.t, 0, -ut, 0)), u[S].setMatrixAt(a, g.l))), J && u.arrow.setMatrixAt(a, this.gripTorso(g.l, g.al, 0.02, Math.PI / 2, -0.12)), t.carry[s] > 0 ? (u.carry.setMatrixAt(a, g.l.multiplyMatrices(g.tor, this.trs(g.t, 0, 0.2, -0.19))), u.carry.setColorAt(a, this.c.set(Zc[t.carryRes[s]] ?? "#888")), u.carry.instanceColor && (u.carry.instanceColor.needsUpdate = !0)) : u.carry.setMatrixAt(a, ds);
  }
  poseAnimal(t, s, a, i, o, n, r, l, c, h, f, d, u, g = !1, b = 0, k = 0, y = !1, M = !1) {
    const v = this.am, z = this.m, [N, A, I] = s.body, [B, P, R] = s.head, $ = s.leg + A * 0.5, T = r ? Math.sin(l) * (f ? 0.8 : 0.45) : 0, w = r ? Math.abs(Math.cos(l)) * (f ? 0.06 : 0.025) : 0;
    h ? this.trs(z.b, a, i + N * 0.5 - $ * 0, o, 0, n, Math.PI / 2, u) : this.trs(z.b, a, i + w, o, 0, n, 0, u), h && z.b.multiply(this.trs(z.t, 0, -$ + N * 0.1, 0)), b > 0 && z.b.multiply(this.trs(z.t, 0, 0, k * b, 0.1 * b)), v.body.setMatrixAt(t, z.l.multiplyMatrices(z.b, this.trs(z.t, 0, $, 0, 0, 0, 0, N, A, I))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([H, J], ut) => v.leg.setMatrixAt(t * 4 + ut, z.l.multiplyMatrices(z.b, this.trs(z.t, H * N * 0.32, s.leg, J * I * 0.36, H * J > 0 ? T : -T, 0, 0, s.legW, s.leg, s.legW))));
    const O = h ? 0.2 : M ? f ? 0.22 : r ? 0.08 : 0.12 + Math.sin(c * 1.3 + a) * 0.04 : g ? 0.05 + b * 0.55 : r ? f ? 0.15 : -0.3 : 0.9 + Math.sin(c * 1.7 + a) * 0.08;
    z.hd.multiplyMatrices(z.b, this.trs(z.t, 0, $ + A * 0.3, I * 0.46, O));
    const S = s.neckTilt ?? 0.29, C = s.neckW ?? 0.72;
    v.neck.setMatrixAt(t, z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, -0.04, 0, S, 0, 0, B * C, s.neck * 1.05 + 0.1, P * C))), M ? v.collar.setMatrixAt(t, z.l.multiplyMatrices(z.b, this.trs(z.t, 0, $ + A * 0.5 - 0.17, -I * 0.04, 0, 0, 0, N * 1.14, 0.22, I * 0.4))) : v.collar.setMatrixAt(t, y ? z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, s.neck * 0.45, s.neck * 0.13, 0.29, 0, 0, B * 0.9, 0.06, P * 0.9)) : ds), z.hd.multiply(this.trs(z.t, 0, s.neck * Math.cos(S) / Math.cos(0.29), s.neck * Math.sin(S) * (0.3 / Math.sin(0.29)) + R * 0.3, -O * 0.6 + (s.headTilt ?? 0))), v.head.setMatrixAt(t, z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, 0, 0, 0, 0, 0, B, P, R)));
    const U = Math.min(B / 0.15, 1.35);
    v.ears.setMatrixAt(t, z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, P * 0.5, -R * 0.2, -(s.headTilt ?? 0) * 0.85, 0, 0, U, U, U))), v.antlers.setMatrixAt(t, d && s.antl ? z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, P * 0.45, -R * 0.12)) : ds), v.horns.setMatrixAt(t, s.horns ? z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, P * 0.35, R * 0.02)) : ds), v.tusks.setMatrixAt(t, s.tusks ? z.l.multiplyMatrices(z.hd, this.trs(z.t, 0, -P * 0.25, R * 0.72, -0.6)) : ds), v.tail.setMatrixAt(t, z.l.multiplyMatrices(z.b, this.trs(z.t, 0, $ + A * 0.32, -I * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(c * 3 + a) * 0.06), 0, 0, s.tail[0], s.tail[1], s.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, s, a, i, o, n, r, l) {
    const c = this.rm, h = this.m, f = this.phase[s];
    t.task[s] === Rt && t.cd[s] > this.lastCd[s] && we.emit("ram.boom", i, n), this.lastCd[s] = t.cd[s];
    {
      const b = f / Math.PI % 2;
      b < this.lastP[s] && we.emit("ram.creak", i, n, 0.7), this.lastP[s] = b;
    }
    this.trs(h.b, i, o, n, 0, r, 0), c.body.setMatrixAt(a, h.b), c.cloth.setMatrixAt(a, h.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([b, k], y) => c.wheel.setMatrixAt(a * 4 + y, h.l.multiplyMatrices(h.b, this.trs(h.t, b * 0.5, 0.22, k * 0.55, f))));
    let d = 0;
    if (t.task[s] === Rt && t.state[s] !== Yt) {
      const b = 1 - Math.max(0, Math.min(1, (t.cd[s] - l) / W[t.kind[s]].cd));
      d = b < 0.15 ? 0.06 * (1 - b / 0.15) : b < 0.85 ? ta((b - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((b - 0.85) / 0.15) ** 2);
    }
    let u = 0;
    const g = t.tgt[s];
    if (t.task[s] === Rt && g >= 0 && t.alive[g] && t.kind[g] >= at) {
      const b = sn(t, g, i, n, Math.sin(r), Math.cos(r), 0.62);
      b !== null && (u = Math.max(0, Math.min(0.9, b - 1.33)));
    }
    c.log.setMatrixAt(a, h.l.multiplyMatrices(h.b, this.trs(h.t, 0, 0.62, 0.05 + u - d)));
  }
}
const Dt = "#6e4f37", ee = "#8a6545", zi = "#a0754c", us = "#c9a75e", Is = "#b8954f", Sa = "#cdb48a", Vi = "#9b968c", Go = "#b98b62", Os = "#b5813e", Ca = "#8a857c", wa = "#a7a196";
function Ea(e, t, s, a, i, o, n) {
  const r = n() * be;
  e.add("cone7", o, x(t, 0, s, r, a * 2, i, a * 2));
  for (let l = 0; l < 3; l++) {
    const c = l * be / 3 + r;
    e.add("cyl5", Dt, x(t + Math.cos(c) * 0.08, i - 0.3, s + Math.sin(c) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(c) * 0.3, Math.cos(c) * 0.3));
  }
  e.add("box", "#3b2b1f", x(t + Math.sin(r) * a * 0.95, 0, s + Math.cos(r) * a * 0.95, r, 0.36, i * 0.4, 0.05, -Math.atan2(a, i)));
}
function Vo(e, t, s, a, i, o, n, r, l, c = 0) {
  e.add("cyl8", r, x(t, 0, s, c, a * 2, o, i * 2)), e.add("cone7", l, x(t, o - 0.06, s, c, a * 2 + 0.44, n, i * 2 + 0.44));
  const h = o - 0.06 + n * 0.86, f = Math.sin(c), d = Math.cos(c), u = Math.cos(c), g = -Math.sin(c);
  for (const b of [-1, 1]) e.add("cyl5", Dt, x(t + u * b * 0.05, h, s + g * b * 0.05, c, 0.045, 0.42, 0.045, 0, b * 0.62));
  e.add("box", "#3a2a1e", x(t + f * i * 0.94, 0, s + d * i * 0.94, c, 0.42, o * 0.8, 0.08));
}
function Ai(e, t, s, a, i, o, n, r) {
  const l = Math.cos(n), c = -Math.sin(n), h = Math.sin(n), f = Math.cos(n);
  for (const [d, u] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", Dt, x(t + l * d * a / 2 + h * u * i / 2, 0, s + c * d * a / 2 + f * u * i / 2, 0, 0.07, u > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", o, x(t, 1.24, s, n, a + 0.2, 0.05, i + 0.3, 0.18)), e.add("box", ee, x(t + h * i * 0.3, 0, s + f * i * 0.3, n, a * 0.9, 0.55, 0.32)), r.forEach((d, u) => e.add(u % 2 ? "ico" : "cyl8", d, x(t + h * i * 0.3 + l * (u - (r.length - 1) / 2) * 0.24, 0.55, s + f * i * 0.3 + c * (u - (r.length - 1) / 2) * 0.24, 0, 0.17, u % 2 ? 0.17 : 0.2, 0.17)));
}
function ah(e, t, s, a, i) {
  const o = Math.sin(a), n = Math.cos(a), r = Math.cos(a), l = -Math.sin(a);
  e.add("box", i, x(t, 0.78, s, a, 0.34, 0.42, 1));
  for (const [c, h] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", i, x(t + r * c * 0.12 + o * h * 0.36, 0, s + l * c * 0.12 + n * h * 0.36, a, 0.09, 0.8, 0.09));
  e.add("box", i, x(t + o * 0.52, 1, s + n * 0.52, a, 0.16, 0.5, 0.2, 0.5)), e.add("box", i, x(t + o * 0.72, 1.34, s + n * 0.72, a, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", x(t + o * 0.5, 1.1, s + n * 0.5, a, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", x(t - o * 0.52, 0.55, s - n * 0.52, a, 0.07, 0.42, 0.07, -0.25));
}
function Ko(e, t, s, a, i, o, n = 0) {
  e.add("cyl8", "#6b4a2f", x(t, s + i * Math.cos(n), a, o, i * 2, 0.08, i * 2, 0, Math.PI / 2 + n));
}
function Pa(e, t, s, a = 1) {
  for (let i = 0; i < 9; i++) {
    const o = i / 9 * be;
    e.add("dode", "#8a857c", x(t + Math.cos(o) * 0.5 * a, 0.05, s + Math.sin(o) * 0.5 * a, o, 0.24 * a, 0.18 * a, 0.24 * a));
  }
  e.add("cyl5", "#4a3526", x(t, 0.08, s, 0.3, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", x(t, 0.1, s, 1.9, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0));
}
function Ia(e, t, s, a, i, o, n, r, l, c = 0, h = 0) {
  e.add("box", r, x(t, h, s, c, a, o, i)), e.add("prism", l, x(t, h + o - 0.04, s, c, a + 0.4, n, i + 0.36)), e.add("box", "#3a2a1e", x(t + Math.sin(c) * (i / 2 + 0.01), h, s + Math.cos(c) * (i / 2 + 0.01), c, Math.min(0.5, a * 0.3), o * 0.72, 0.06));
}
function Yo(e, t, s, a) {
  for (let i = 0; i < s; i++) {
    const o = i / s * be;
    e.add("box", Vi, x(Math.cos(o) * t, 0, Math.sin(o) * t, o, 0.3, a * (0.8 + i % 3 * 0.15), 0.22));
  }
}
function ih(e, t) {
  const s = Math.round(t * 4);
  for (let a = 0; a <= s; a++) {
    const i = -t + a * 2 * t / s;
    for (const [o, n] of [[i, -t], [i, t], [-t, i], [t, i]]) e.add("cyl5", Dt, x(o, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const a of [0.25, 0.48])
    e.add("box", ee, x(0, a, -t, 0, t * 2, 0.05, 0.05)), e.add("box", ee, x(0, a, t, 0, t * 2, 0.05, 0.05)), e.add("box", ee, x(-t, a, 0, 0, 0.05, 0.05, t * 2)), e.add("box", ee, x(t, a, 0, 0, 0.05, 0.05, t * 2));
}
function Ti(e, t, s, a) {
  e.add("ico", "#ece6d6", x(t, 0.32, s, a, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", x(t + Math.sin(a) * 0.32, 0.36, s + Math.cos(a) * 0.32, a, 0.13, 0.16, 0.2));
  for (const [i, o] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", x(t + i, 0, s + o, a, 0.05, 0.2, 0.05));
}
function oh(e, t, s) {
  const a = new di(s), i = Math.min(t, 2);
  switch (e) {
    case "center":
      if (i === 0)
        Pa(a, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((o, n) => Ea(a, Math.cos(o) * 1.45, Math.sin(o) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [zi, "#8d6a46", "#b58a5d"][n % 3], s));
      else if (i === 1)
        Ia(a, 0, -0.4, 2.2, 3.2, 1.3, 1.5, Sa, us, Math.PI / 2), Pa(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", x(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        Vo(a, 0, -0.45, 1.5, 1.02, 1.3, 1.75, Sa, us);
        for (const o of [-1, 1])
          a.add("cyl5", Dt, x(o * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), a.add("cyl8", Os, x(o * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        a.add("box", ee, x(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), Pa(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", x(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), a.add("cyl8", "#8a5a40", x(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      i === 0 ? (Ea(a, 0, 0, 0.8, 1.5, zi, s), a.add("box", "#9a7148", x(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : i === 1 ? Ia(a, 0, 0, 1.3, 1.6, 1, 0.95, Sa, Is, s() < 0.5 ? 0 : Math.PI / 2) : (Vo(a, 0, -0.08, 0.66, 0.5, 0.85, 1, Go, Is), a.add("cyl8", "#a0654a", x(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (i === 0) {
        for (let o = 0; o < 6; o++) a.add("cyl5", "#5e4431", x(-0.3, 0.1 + o % 3 * 0.18, -0.35 + Math.floor(o / 3) * 0.18 + o % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        a.add("prism", zi, x(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), a.add("cyl8", "#b48a5c", x(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (i === 1) {
        for (const [o, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) a.add("cyl5", Dt, x(o, 0, n, 0, 0.13, 0.6, 0.13));
        a.add("cyl8", Sa, x(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), a.add("cone7", us, x(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [o, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) a.add("cyl5", Dt, x(o, 0, n, 0, 0.12, 0.5, 0.12));
        a.add("box", ee, x(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), a.add("prism", us, x(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), a.add("cyl8", "#a0654a", x(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), a.add("cyl8", "#8a5a40", x(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let o = 0; o < 3; o++) a.add("box", Os, x(0.42, o * 0.07, 0.62 + o % 2 * 0.03, o % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (i === 0) {
        Yo(a, 1.15, 10, 0.32), Ea(a, -0.55, -0.5, 0.5, 1.2, "#8d6a46", s);
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", x(0.6 + o * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        a.add("cyl5", Dt, x(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (i === 1) {
        Ia(a, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", Is, 0);
        for (let o = 0; o < 7; o++) a.add("cyl5", ee, x(-1.3 + o * 0.4, 0, 1.25, 0, 0.14, 0.9 + o % 2 * 0.15, 0.14));
        for (let o = 0; o < 3; o++) a.add("cyl5", "#8a6a48", x(1, 0, -0.6 + o * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        a.add("box", Ca, x(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), Ia(a, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", Is, Math.PI / 2, 0.25), a.add("box", Dt, x(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", x(0.6 + o * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        a.add("cyl5", Dt, x(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), a.add("box", Dt, x(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), a.add("cyl8", Os, x(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      a.add("box", "#7d5f3e", x(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let o = 0; o < 4; o++) a.add("box", "#6b4f33", x(0, 0.03, -1.12 + o * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [o, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) a.add("cyl5", ee, x(o, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      ih(a, 1.35), Ti(a, -0.5, -0.3, 0.6), Ti(a, 0.45, 0.2, 2.5), Ti(a, -0.2, 0.65, 4.1), a.add("box", "#a0754c", x(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (i < 2)
        a.add("box", "#a8a397", x(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), Yo(a, 0.85, 8, 0.45), a.add("dode", "#8a857c", x(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [o, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) a.add("cyl5", Dt, x(o, 0, n, 0, 0.1, 1.15, 0.1));
        a.add("cone4", us, x(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), a.add("box", wa, x(0, 0, 0, 0, 0.6, 0.55, 0.45)), a.add("cyl8", Os, x(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), a.add("box", "#a8a397", x(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), a.add("box", "#a8a397", x(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      Pa(a, 0, 0, 1);
      for (let o = 0; o < 4; o++) {
        const n = o / 4 * be + 0.4;
        Ea(a, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][o % 3], s);
      }
      for (let o = 0; o < 9; o++) {
        const n = -0.9 + o * 0.22;
        a.add("cyl5", "#5a4030", x(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + o % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      a.add("box", Go, x(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const o of [-1, 1]) a.add("cyl5", Dt, x(o * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      a.add("prism", Is, x(0, 1, -0.3, 0, 2, 0.6, 1.2)), a.add("ico", "#a5603f", x(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), a.add("cyl5", "#8f5236", x(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), a.add("box", "#2b1d16", x(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), a.add("box", Ca, x(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), a.add("box", "#5c5a57", x(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let o = 0; o < 3; o++) a.add("box", Os, x(-0.55 + o * 0.05, o * 0.06, -0.35, 0.1 * o, 0.3, 0.06, 0.1));
      break;
    case "market":
      Ai(a, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), Ai(a, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), Ai(a, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [Os, "#d9a43a", "#bdb6a8"]), a.add("cyl8", "#a0654a", x(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), a.add("cyl8", "#c9a75e", x(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), a.add("ico", "#d6c49a", x(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      a.add("box", ee, x(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const o of [-1, 1]) a.add("box", ee, x(o * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let o = 0; o < 4; o++) a.add("cyl5", Dt, x(-1.3 + o * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      a.add("prism", us, x(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let o = 0; o < 5; o++) a.add("cyl5", Dt, x(-1.35 + o * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const o of [0.28, 0.52]) a.add("box", ee, x(0, o, 1.35, 0, 2.75, 0.05, 0.05));
      ah(a, 0.2, 0.55, -1.2, "#7a5236"), a.add("box", "#d6b85a", x(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), a.add("box", "#c9ab50", x(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [o, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) a.add("cyl5", Dt, x(o, 0, n, 0, 0.12, 1.15, 0.12));
      a.add("prism", Is, x(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), a.add("box", ee, x(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const o of [-1, 1])
        a.add("box", Dt, x(o * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), a.add("box", Dt, x(o * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      a.add("box", Dt, x(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), a.add("cyl8", "#5e4431", x(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const o of [-1, 1]) for (const n of [-0.1, 1.2]) a.add("box", ee, x(o * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      a.add("cyl5", "#4a3a2c", x(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), Ko(a, -0.95, 0, 0.9, 0.3, 0.4, -0.12), Ko(a, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let o = 0; o < 3; o++) a.add("cyl5", "#5e4431", x(0.9, 0.1 + o % 2 * 0.16, -0.65 + o * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      a.add("box", Ca, x(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [o, n, r] of [[-0.25, -0.25, Vi], [0.25, -0.25, wa], [-0.25, 0.25, wa], [0.25, 0.25, Vi]]) a.add("box", r, x(o, 0.55, n, (o + n) * 0.4, 0.5, 0.36 + Math.abs(o - n) * 0.2, 0.5), 0.12);
      a.add("dode", Ca, x(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    case "tower":
      a.add("cyl8", "#b3ada2", x(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), a.add("cyl8", wa, x(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), a.add("cyl8", "#9d978b", x(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), a.add("box", "#2b211a", x(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), a.add("box", "#2b211a", x(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), a.add("box", ee, x(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let o = 0; o < 8; o++) {
        const n = o / 8 * be;
        a.add("cyl5", Dt, x(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [o, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) a.add("box", Dt, x(o, 2.62, n, r, 1.7, 0.08, 0.06));
      a.add("cone4", us, x(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return a.build();
}
function nh(e, t, s) {
  const a = [], i = [], o = new Qt(), n = (f, d) => mt(e, f, d), r = (f, d, u, g, b, k) => {
    const y = [[f, d], [f, g], [u, g], [u, d]].map(([M, v]) => [M, n(M, v) + b, v]);
    o.set(k);
    for (const M of [0, 1, 3, 1, 2, 3])
      a.push(...y[M]), i.push(o.r, o.g, o.b);
  };
  for (let f = 0; f < 6; f++) for (let d = 0; d < 6; d++) {
    const u = t - 1.5 + f * 0.5, g = s - 1.5 + d * 0.5;
    r(u, g, u + 0.5, g + 0.5, 0.05, (f + d) % 2 ? "#7d5f3e" : "#795b3a");
  }
  for (let f = 0; f < 4; f++) {
    const d = s - 1.12 + f * 0.75;
    for (let u = 0; u < 7; u++) {
      const g = t - 1.4 + u * 0.4;
      r(g, d - 0.14, g + 0.4, d + 0.14, 0.09, "#6b4f33");
    }
  }
  const l = new di();
  for (const [f, d] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", ee, x(t + f, n(t + f, s + d), s + d, 0, 0.08, 0.5, 0.08));
  const c = l.build();
  a.push(...c.attributes.position.array), i.push(...c.attributes.color.array);
  const h = new ls();
  return h.setAttribute("position", new xs(a, 3)), h.setAttribute("color", new xs(i, 3)), h.computeVertexNormals(), h.computeBoundingSphere(), h;
}
const rh = "#7a5a3c", lh = "#8d6a48", ch = "#b89068", Xo = "#6a5640", Jo = "#4f3a28";
function hh(e, t) {
  const s = new di(t), a = e >> 4;
  e &= 15;
  const i = (r, l) => {
    const c = 1.02 + (t() - 0.5) * 0.24, h = 0.21 + t() * 0.03, f = t() * be;
    s.add("cyl5", t() < 0.5 ? rh : lh, x(r, -0.35, l, f, h, c + 0.35, h), 0.12), s.add("cone4", ch, x(r, c - 0.01, l, f, h * 1.02, 0.24, h * 1.02), 0.1);
  };
  s.add("box", Xo, x(0, -0.3, 0, 0, 0.42, 0.4, 0.42), 0.12), i(0, 0);
  const o = [[1, 0, 1], [-1, 0, 2], [0, 1, 4], [0, -1, 8]];
  let n = 0;
  for (const [r, l, c] of o)
    if (e & c) {
      n++, i(r * 0.25, l * 0.25), (c === 1 || c === 4 || a & c) && i(r * 0.5, l * 0.5), s.add("box", Xo, x(r * 0.25, -0.3, l * 0.25, 0, r ? 0.52 : 0.4, 0.39, l ? 0.52 : 0.4), 0.12);
      for (const h of [-1, 1]) s.add("box", Jo, x(r * 0.25 + (l ? h * 0.12 : 0), 0.55 + h * 0.04, l * 0.25 + (r ? h * 0.12 : 0), 0, r ? 0.54 : 0.06, 0.07, l ? 0.54 : 0.06), 0.08);
    }
  if (!n) {
    for (const [r, l] of [[0.2, 0.17], [-0.19, 0.18], [0.18, -0.19], [-0.2, -0.17]]) i(r, l);
    s.add("cyl8", Jo, x(0, 0.52, 0, 0, 0.7, 0.07, 0.7), 0.08);
  }
  return s.build();
}
function dr(e, t) {
  const s = e.size, a = e.x[t] >> 8, i = e.z[t] >> 8, o = e.owner[t];
  let n = 0;
  const r = (l, c, h) => {
    if (l < 0 || c < 0 || l >= s || c >= s) return;
    const f = e.bAt[c * s + l] - 1;
    f >= 0 && e.isBuilding(f) && e.owner[f] === o && ct[e.kind[f] - at].wall && (n |= h, ct[e.kind[f] - at].key !== "palisade" && (n |= h << 4));
  };
  return r(a + 1, i, 1), r(a - 1, i, 2), r(a, i + 1, 4), r(a, i - 1, 8), n;
}
const bo = (e, t) => e === "farm" || e === "palisade" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2;
function ur(e, t) {
  const s = ct[e.kind[t] - at], a = e.owner[t], i = a >= 0 && a < e.players.length ? e.players[a].era : 0;
  return Xa(s.key, i, s.key === "palisade" ? dr(e, t) : -1);
}
const Oa = /* @__PURE__ */ new Map();
function Xa(e, t, s = -1) {
  if (e === "palisade") {
    const n = Math.max(0, s), r = "palisade/" + n;
    let l = Oa.get(r);
    return l || (l = hh(n, _i(97 + n * 13)), Oa.set(r, l)), l;
  }
  const a = Math.min(t, 2), i = e + a;
  let o = Oa.get(i);
  return o || (o = oh(e, a, _i(e.length * 31 + a)), Oa.set(i, o)), o;
}
const Ba = new Bn(), Zo = new St(), Qo = new St(), tn = new St(), en = new St();
function sn(e, t, s, a, i, o, n) {
  const r = ct[e.kind[t] - at], l = ur(e, t), c = l.attributes.position.array, h = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), f = e.x[t] / 256, d = e.z[t] / 256, u = bo(r.key, t), g = Math.cos(u), b = Math.sin(u), k = s - f, y = a - d, M = k * g - y * b, v = k * b + y * g, z = i * g - o * b, N = i * b + o * g, A = Math.hypot(z, N) || 1;
  let I = 1 / 0;
  for (const B of [0, 0.1, -0.1]) {
    Ba.origin.set(M - N / A * B, n / h, v + z / A * B), Ba.direction.set(z / A, 0, N / A);
    for (let P = 0; P + 8 < c.length; P += 9) {
      if (Zo.set(c[P], c[P + 1], c[P + 2]), Qo.set(c[P + 3], c[P + 4], c[P + 5]), tn.set(c[P + 6], c[P + 7], c[P + 8]), !Ba.intersectTriangle(Zo, Qo, tn, !1, en)) continue;
      const R = en.distanceTo(Ba.origin);
      R < I && (I = R);
    }
  }
  return I < 1 / 0 ? I : null;
}
const dh = Ct((e) => e.add("cyl5", Dt, x(0, 0, 0, 0, 0.06, 2, 0.06), 0)), uh = new he(0.42, 0.34, 0.03).translate(0.24, 1.75, 0);
class fh {
  constructor() {
    m(this, "group", new _s());
    m(this, "meshes", /* @__PURE__ */ new Map());
    m(this, "poles");
    m(this, "flags");
    m(this, "crops");
    m(this, "fair");
    m(this, "mat", Zt({ vertexColors: !0 }));
    m(this, "farms", /* @__PURE__ */ new Map());
    m(this, "fires", []);
    m(this, "smokes", []);
    this.poles = new Ut(dh, Zt({ vertexColors: !0 }), 256), this.flags = new Ut(uh, Zt({}, { NO_SNOW: "" }), 256);
    const t = Ct((a) => {
      for (let i = 0; i < 3; i++) a.add("cone4", "#ffffff", x((i - 1) * 0.1, 0, i % 2 * 0.08, i, 0.1, 0.75, 0.1, (i - 1) * 0.15, 0), 0.1);
    });
    this.crops = new Ut(t, Zt({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = lr({ CROP: "" });
    const s = Ct((a) => {
      const i = [[-1.38, -1.38], [1.38, -1.38], [1.38, 1.38], [-1.38, 1.38]], o = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"];
      for (const [n, r] of i) a.add("cyl5", Dt, x(n, 0, r, 0, 0.07, 2.05, 0.07), 0);
      for (let n = 0; n < 4; n++) {
        const [r, l] = i[n], [c, h] = i[(n + 1) % 4], f = Math.hypot(c - r, h - l), d = Math.atan2(c - r, h - l);
        a.add("box", "#e8e2d4", x((r + c) / 2, 1.95, (l + h) / 2, d, 0.015, 0.015, f), 0);
        for (let u = 1; u < 8; u++) {
          const g = u / 8, b = Math.sin(g * Math.PI) * 0.18;
          a.add("cone4", o[(u + n) % o.length], x(r + (c - r) * g, 1.95 - b - 0.2, l + (h - l) * g, d, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new Ut(s, Zt({ vertexColors: !0 }), 16);
    for (const a of [this.poles, this.flags, this.crops, this.fair])
      a.instanceMatrix.setUsage(ye), a.frustumCulled = !1, a.castShadow = !0, a.receiveShadow = !0, a.count = 0, this.group.add(a);
    for (let a = 0; a < 256; a++) this.flags.setColorAt(a, new Qt("#ffffff"));
  }
  mesh(t, s, a = -1) {
    const i = t === "palisade" ? "palisade/" + Math.max(0, a) : t + s;
    let o = this.meshes.get(i);
    return o || (o = new Ut(Xa(t, s, a), this.mat, t === "center" || t === "camp" ? 8 : t === "palisade" || t === "wall" ? 160 : 64), o.instanceMatrix.setUsage(ye), o.frustumCulled = !1, o.castShadow = !0, o.receiveShadow = !0, o.count = 0, this.meshes.set(i, o), this.group.add(o)), o;
  }
  /** atualiza tudo a partir do mundo (≈100 construções: barato) */
  update(t, s, a, i = 0) {
    const o = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0;
    const c = t.size, h = t.explored[s];
    this.fires.length = 0, this.smokes.length = 0;
    const f = new Qt(), d = /* @__PURE__ */ new Set();
    for (let u = 0; u < t.top; u++) {
      if (!t.alive[u] || t.kind[u] < at) continue;
      const g = ct[t.kind[u] - at], b = t.owner[u], k = t.x[u] / 256, y = t.z[u] / 256;
      if (a && b !== s && !h[Math.floor(y) * c + Math.floor(k)]) continue;
      const M = b >= 0 && b < t.players.length ? t.players[b].era : 0;
      if (g.key === "farm") {
        let P = this.farms.get(u);
        if (P && (P.x !== k || P.z !== y) && (this.group.remove(P.mesh), P.mesh.geometry.dispose(), P = void 0), !P) {
          const R = new We(nh(t.map, k, y), this.mat);
          R.receiveShadow = R.castShadow = !0, this.group.add(R), P = { mesh: R, x: k, z: y }, this.farms.set(u, P);
        }
        if (P.mesh.visible = !0, d.add(u), t.done[u]) for (let R = 0; R < 4; R++) for (let $ = 0; $ < 9 && r < this.crops.instanceMatrix.count; $++) {
          const T = k - 1.25 + $ * 0.31, w = y - 1.12 + R * 0.75;
          this.crops.setMatrixAt(r++, x(T, mt(t.map, T, w) + 0.08, w, ($ * 7 + R) % 6, 1, 0.85 + ($ + R) % 3 * 0.12, 1));
        }
        continue;
      }
      const v = this.mesh(g.key, Math.min(M, 2), g.key === "palisade" ? dr(t, u) : -1), z = o.get(v) ?? 0;
      if (z >= v.instanceMatrix.count) continue;
      const N = mt(t.map, k, y), A = t.done[u] === 1, I = A ? 1 : Math.max(0.12, Math.min(1, t.work[u] / (g.time * 100))), B = bo(g.key, u);
      if (v.setMatrixAt(z, x(k, N - 0.02, y, B, 1, I, 1)), o.set(v, z + 1), g.key !== "farm" && !g.wall && A && n < 256) {
        const P = g.size / 2 - 0.25, R = k + P, $ = y - P;
        this.poles.setMatrixAt(n, x(R, mt(t.map, R, $), $)), this.flags.setMatrixAt(n, x(R, mt(t.map, R, $), $, Math.sin(i * 1.1 + u) * 0.15)), this.flags.setColorAt(n, f.set(b === de ? "#efe6cf" : t.players[b]?.color ?? "#888")), n++;
      }
      if (A && g.key === "forge") {
        const $ = k + 0.45 * Math.cos(B) + 0.12 * Math.sin(B), T = y - 0.45 * Math.sin(B) + 0.12 * Math.cos(B), w = k + 0.55 * Math.cos(B) - 0.45 * Math.sin(B), O = y - 0.55 * Math.sin(B) - 0.45 * Math.cos(B);
        this.fires.push({ x: $, y: mt(t.map, $, T) + 0.1, z: T, s: 0.16 }), this.smokes.push({ x: w, y: mt(t.map, w, O) + 1.5, z: O, s: 0.6 });
      }
      if (A && g.market && t.fair && l < 16 && this.fair.setMatrixAt(l++, x(k, N - 0.02, y, B)), A && (g.key === "center" || g.key === "camp")) {
        const P = M >= 1 && g.key === "center", R = P ? k + 1.2 * Math.cos(B) + 1.3 * Math.sin(B) : k, $ = P ? y - 1.2 * Math.sin(B) + 1.3 * Math.cos(B) : y;
        this.fires.push({ x: R, y: mt(t.map, R, $) + 0.15, z: $, s: M >= 1 && g.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: R, y: mt(t.map, R, $) + 0.3, z: $, s: 1 });
      }
    }
    for (const u of this.meshes.values())
      u.count = o.get(u) ?? 0, u.instanceMatrix.needsUpdate = !0;
    for (const [u, g] of this.farms) d.has(u) || (!t.alive[u] || t.kind[u] !== at + Nt.farm ? (this.group.remove(g.mesh), g.mesh.geometry.dispose(), this.farms.delete(u)) : g.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0;
  }
}
class ph {
  constructor(t = 48) {
    m(this, "mesh");
    this.mesh = new Ut(new Bi(0.32, 1, 6).translate(0, 0.5, 0), go(new ys({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(ye), this.mesh.frustumCulled = !1;
    for (let s = 0; s < t; s++) this.mesh.setColorAt(s, new Qt(s % 2 ? "#ffd166" : "#ff7b2e"));
  }
  update(t, s) {
    let a = 0;
    const i = this.mesh.instanceMatrix.count;
    for (const o of t) {
      const n = 0.85 + Math.sin(s * 13 + o.x) * 0.12 + Math.sin(s * 29 + o.z) * 0.08;
      a < i && this.mesh.setMatrixAt(a++, x(o.x, o.y, o.z, s * 2 + o.x, o.s, o.s * 1.25 * n, o.s)), a < i && this.mesh.setMatrixAt(a++, x(o.x, o.y, o.z, -s * 3, o.s * 0.55, o.s * 0.85 * (2 - n), o.s * 0.55));
    }
    this.mesh.count = a, this.mesh.instanceMatrix.needsUpdate = !0;
  }
}
const mh = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, gh = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class bh {
  constructor(t, s = 500) {
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
    m(this, "geo", new ls());
    m(this, "mat");
    m(this, "points");
    this.n = s, this.pos = new Float32Array(s * 3), this.a = new Float32Array(s), this.sz = new Float32Array(s).fill(1), this.colr = new Float32Array(s * 3), this.age = new Float32Array(s).fill(99), this.life = new Float32Array(s), this.vel = new Float32Array(s * 3), this.grow = new Float32Array(s), this.geo.setAttribute("position", new Ee(this.pos, 3).setUsage(ye)), this.geo.setAttribute("aA", new Ee(this.a, 1).setUsage(ye)), this.geo.setAttribute("aS", new Ee(this.sz, 1).setUsage(ye)), this.geo.setAttribute("aC", new Ee(this.colr, 3).setUsage(ye)), this.mat = new co({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: mh, fragmentShader: gh }), this.points = new qn(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, s, a, i, o, n, r, l, c, h) {
    const f = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, s, a], f * 3), this.vel.set([i, o, n], f * 3), this.colr.set([h.r, h.g, h.b], f * 3), this.age[f] = 0, this.life[f] = r, this.sz[f] = l, this.grow[f] = c;
  }
  smoke(t, s) {
    this.acc += t;
    const a = new Qt(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const i of s) Math.random() < 0.5 && this.emit(i.x + (Math.random() - 0.5) * 0.2, i.y + 0.4, i.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, a);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, s, a, i) {
    const o = new Qt(0.62, 0.55, 0.45), n = i ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * be, c = (i ? 1.4 : 0.7) * (0.4 + Math.random());
      this.emit(t, s + 0.2, a, Math.cos(l) * c, 0.3 + Math.random() * 0.6, Math.sin(l) * c, 0.9 + Math.random() * 0.6, i ? 1.4 : 0.8, 1.2, o);
    }
  }
  update(t) {
    for (let s = 0; s < this.n; s++) {
      if (this.age[s] > this.life[s]) {
        this.a[s] = 0;
        continue;
      }
      this.age[s] += t;
      const a = this.age[s] / this.life[s], i = 1 - Math.min(0.9, t * 1.5);
      this.vel[s * 3] *= i, this.vel[s * 3 + 2] *= i, this.pos[s * 3] += this.vel[s * 3] * t, this.pos[s * 3 + 1] += this.vel[s * 3 + 1] * t, this.pos[s * 3 + 2] += this.vel[s * 3 + 2] * t, this.a[s] = Math.sin(Math.min(a, 1) * Math.PI) * 0.4, this.sz[s] = this.sz[s] + this.grow[s] * t / this.life[s] * 0.5;
    }
    for (const s of ["position", "aA", "aS", "aC"]) this.geo.attributes[s].needsUpdate = !0;
  }
}
class vh {
  constructor() {
    m(this, "group", new _s());
    m(this, "spears");
    m(this, "arrows");
    m(this, "stones");
    m(this, "list", []);
    m(this, "ray", new Bn());
    m(this, "ta", new St());
    m(this, "tb", new St());
    m(this, "tc", new St());
    m(this, "th", new St());
    const t = Ct((o) => {
      o.add("cyl5", "#7a5a3c", x(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), o.add("cone4", "#b9b4aa", x(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
    }).rotateX(Math.PI / 2), s = Ct((o) => {
      o.add("cyl5", "#8a6a48", x(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), o.add("cone4", "#b9b4aa", x(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), o.add("box", "#e8e2d4", x(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), o.add("box", "#e8e2d4", x(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
    }).rotateX(Math.PI / 2), a = Ct((o) => o.add("dode", "#8f8a80", x(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)), i = Zt({ vertexColors: !0 }, { NO_SNOW: "" });
    this.spears = new Ut(t, i, 96), this.arrows = new Ut(s, i, 96), this.stones = new Ut(a, i, 96);
    for (const o of [this.spears, this.arrows, this.stones])
      o.instanceMatrix.setUsage(ye), o.frustumCulled = !1, o.castShadow = !0, o.count = 0, this.group.add(o);
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, s, a, i, o, n, r, l, c, h, f) {
    const d = r === "arrow", u = r === "stone";
    if (r === "spear" && l < Gi) return;
    let g, b, k;
    if (c >= at) {
      const R = t.alive[h] ? this.hitBuilding(t, h, s, a) : null;
      R ? (g = R.x, b = R.z, k = R.y) : (g = i, b = o, k = mt(t.map, i, o) + 0.08);
    } else {
      const R = Math.hypot(i - s, o - a) || 1, $ = R - (W[c]?.radius ?? 0.3) * 0.8;
      g = s + (i - s) / R * $, b = a + (o - a) / R * $, k = mt(t.map, g, b) + hr(c);
    }
    const y = Math.hypot(g - s, b - a) || 1, M = (g - s) / y, v = (b - a) / y;
    let z = f !== void 0 ? 0.9 : d ? 0.75 : u ? 0.3 : 1.7;
    if (f === void 0) for (let R = 0.1; R < Math.min(z + 0.4, y - 0.3); R += 0.1) {
      const $ = t.bAt[Math.floor(a + v * R) * t.size + Math.floor(s + M * R)] - 1;
      if ($ >= 0 && $ !== h && t.isBuilding($) && ct[t.kind[$] - at].wall) {
        z = Math.max(0.1, Math.min(z, R - 0.45));
        break;
      }
    }
    if (y - z < 0.15) return;
    const N = s + M * z, A = a + v * z, I = f !== void 0 ? mt(t.map, s, a) + f : mt(t.map, N, A) + (d ? 0.88 : u ? 1.55 : 1.1);
    let B = (y - z) * (d ? 0.1 : u ? 0.07 : 0.18);
    const P = y - z;
    for (let R = 0.15; R < P - 0.3; R += 0.15) {
      const $ = R / P, T = N + M * R, w = A + v * R, O = t.bAt[Math.floor(w) * t.size + Math.floor(T)] - 1;
      if (O < 0 || O === h || !t.isBuilding(O) || !ct[t.kind[O] - at].wall) continue;
      const S = mt(t.map, T, w) + 1.6 - (I + (k - I) * $), C = Math.sin($ * Math.PI);
      C > 0.05 && S > B * C && (B = S / C);
    }
    this.list.push({ x0: N, z0: A, y0: I, x1: g, z1: b, y1: k, arc: B, t: 0, dur: Math.max(0.15, n / 10), kind: r });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, s, a, i) {
    const o = ct[t.kind[s] - at], n = ur(t, s), r = n.attributes.position.array, l = t.done[s] ? 1 : Math.max(0.12, Math.min(1, t.work[s] / (o.time * 100))), c = t.x[s] / 256, h = t.z[s] / 256, f = mt(t.map, c, h) - 0.02, d = bo(o.key, s), u = a - c, g = i - h, b = Math.cos(d), k = Math.sin(d), y = u * b - g * k, M = u * k + g * b, v = Math.hypot(y, M) || 1, z = -y / v, N = -M / v, A = -N, I = z;
    let B = 0, P = 0, R = 0, $ = !1;
    for (const T of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let w = 1 / 0;
      for (const O of [0.9, 0.6, 0.35]) {
        const S = y + A * T, C = M + I * T, U = -(S * z + C * N);
        this.ray.origin.set(S, O / l, C), this.ray.direction.set(z, 0, N);
        for (let H = 0; H + 8 < r.length; H += 9) {
          if (this.ta.set(r[H], r[H + 1], r[H + 2]), this.tb.set(r[H + 3], r[H + 4], r[H + 5]), this.tc.set(r[H + 6], r[H + 7], r[H + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const J = this.th.distanceTo(this.ray.origin);
          J > U + 0.1 || J >= w || (w = J, B = this.th.x + z * 0.05, P = this.th.y, R = this.th.z + N * 0.05);
        }
      }
      if (w < 1 / 0) {
        $ = !0;
        break;
      }
    }
    return $ ? { x: c + B * b + R * k, y: f + P * l, z: h - B * k + R * b } : null;
  }
  update(t) {
    let s = 0, a = 0, i = 0;
    const o = [], n = new lo(), r = new St(), l = new St(1, 1, 1), c = new St(), h = new St(0, 0, 1), f = new me();
    for (const d of this.list) {
      if (d.t += t, d.t > d.dur + (d.kind === "stone" ? 0.03 : 0.35)) continue;
      !d.hit && d.t >= d.dur && (d.hit = !0, we.emit(d.kind === "arrow" ? "arrow.hit" : d.kind === "stone" ? "stone.hit" : "spear.hit", d.x1, d.z1));
      const u = d.kind === "arrow" ? this.arrows : d.kind === "stone" ? this.stones : this.spears, g = d.kind === "arrow" ? a : d.kind === "stone" ? i : s;
      if (g >= 96) continue;
      o.push(d);
      const b = Math.min(1, d.t / d.dur);
      r.set(d.x0 + (d.x1 - d.x0) * b, d.y0 + (d.y1 - d.y0) * b + Math.sin(b * Math.PI) * d.arc, d.z0 + (d.z1 - d.z0) * b), c.set(d.x1 - d.x0, d.y1 - d.y0 + Math.cos(b * Math.PI) * d.arc * Math.PI, d.z1 - d.z0).normalize(), n.setFromUnitVectors(h, c), u.setMatrixAt(g, f.compose(r, n, l)), d.kind === "arrow" ? a++ : d.kind === "stone" ? i++ : s++;
    }
    this.list = o, this.spears.count = s, this.arrows.count = a, this.stones.count = i, this.spears.instanceMatrix.needsUpdate = this.arrows.instanceMatrix.needsUpdate = this.stones.instanceMatrix.needsUpdate = !0;
  }
}
const yh = (e, t, s) => e + (t - e) * s, kh = (e, t, s) => {
  const a = Math.min(1, Math.max(0, (s - e) / (t - e)));
  return a * a * (3 - 2 * a);
};
class xh {
  constructor(t, s, a, i) {
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
    this.map = t, this.cam = new dl(42, 1, 0.5, 900), this.x = this.tx = s, this.z = this.tz = a, this.yaw = this.tyaw = i, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return yh(0.66, 1.12, kh(this.minD, this.maxD, t));
  }
  update(t) {
    const s = 1 - Math.exp(-t * 9), a = this.map.size;
    this.tx = Math.min(a - 8, Math.max(8, this.tx)), this.tz = Math.min(a - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * s, this.z += (this.tz - this.z) * s, this.yaw += (this.tyaw - this.yaw) * s, this.dist += (this.tdist - this.dist) * s;
    const i = this.pitch(), o = Math.max(mt(this.map, this.x, this.z), 0), n = Math.cos(i) * this.dist;
    this.cam.position.set(this.x + Math.sin(this.yaw) * n, o + Math.sin(i) * this.dist, this.z + Math.cos(this.yaw) * n), this.cam.lookAt(this.x, o + 0.6, this.z), this.cam.updateMatrixWorld();
  }
  /** arrasta a câmera em pixels de tela */
  pan(t, s, a) {
    const i = this.pitch(), o = 0.77 * this.dist / a, n = Math.cos(this.yaw), r = -Math.sin(this.yaw), l = -Math.sin(this.yaw), c = -Math.cos(this.yaw);
    this.tx += (-t * n + s * l / Math.sin(i)) * o, this.tz += (-t * r + s * c / Math.sin(i)) * o;
  }
  setAspect(t, s) {
    this.cam.aspect = t / s, this.cam.fov = t / s < 1 ? 55 : 42, this.cam.updateProjectionMatrix();
  }
  /** posição no chão sob um ponto da tela (marcha ao longo do raio e refina) */
  ground(t, s, a, i) {
    const o = new St(t / a * 2 - 1, -(s / i) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = o.sub(n).normalize();
    let l = 0, c = 0;
    const h = this.map.size;
    for (let f = 0; f < 400; f++) {
      l += 0.6 + l * 0.01;
      const d = n.x + r.x * l, u = n.y + r.y * l, g = n.z + r.z * l;
      if (d < -20 || g < -20 || d > h + 20 || g > h + 20 || l > 900) return null;
      if (u <= Math.max(mt(this.map, d, g), -0.1)) {
        let b = c, k = l;
        for (let y = 0; y < 12; y++) {
          const M = (b + k) / 2;
          n.y + r.y * M <= Math.max(mt(this.map, n.x + r.x * M, n.z + r.z * M), -0.1) ? k = M : b = M;
        }
        return new St(n.x + r.x * k, n.y + r.y * k, n.z + r.z * k);
      }
      c = l;
    }
    return null;
  }
  toScreen(t, s, a, i, o, n) {
    n.set(t, s, a).project(this.cam);
    const r = n.z < 1;
    return n.set((n.x + 1) / 2 * i, (1 - n.y) / 2 * o, r ? 1 : 0), n;
  }
}
const an = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], on = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], nn = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class Mh {
  constructor(t) {
    m(this, "c", {});
    m(this, "n", {});
    m(this, "w", [0, 0, 0]);
    m(this, "tmp", new Qt());
    const s = an[t];
    for (const a of on) this.c[a] = Ae(s[a]);
    for (const a of nn) this.n[a] = s[a];
    this.w = [...s.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, s, a) {
    const i = an[s], o = 1 - Math.exp(-t * 0.3);
    for (const l of on) this.c[l].lerp(this.tmp.set(i[l]), o);
    for (const l of nn) this.n[l] += (i[l] - this.n[l]) * o;
    for (let l = 0; l < 3; l++) this.w[l] += (i.w[l] - this.w[l]) * o;
    const n = this.c, r = this.n;
    Bt.uGrassA.value.copy(n.grassA), Bt.uGrassB.value.copy(n.grassB), Bt.uLeafColor.value.copy(n.leaf), Bt.uCropColor.value.copy(n.cropC), Bt.uLeaf.value = r.leafAmt, Bt.uCrop.value = r.crop, Bt.uFlower.value = r.flower, Bt.uSnow.value = r.snow, Bt.uFruit.value = Math.max(0, 1 - r.snow * 1.6), Bt.uShallow.value.copy(n.sh), Bt.uDeep.value.copy(n.dp), a.sun.color.copy(n.sun), a.sun.intensity = r.sunI, a.hemi.color.copy(n.hS), a.hemi.groundColor.copy(n.hG), a.hemi.intensity = r.hI, a.sky.uniforms.uTop.value.copy(n.top), a.sky.uniforms.uHor.value.copy(n.hor), a.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const zh = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, Ah = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Th {
  constructor(t, s = 1) {
    m(this, "group", new _s());
    m(this, "list");
    this.map = t, this.list = [
      this.make(Math.round(1500 * s), 0.55, "#ffffff", "#e8eef6", 2.2, 0.4, 30),
      // neve
      this.make(Math.round(220 * s), 0.85, "#d9772f", "#b8452a", 0.9, 1.4, 11),
      // folhas
      this.make(Math.round(110 * s), 0.62, "#f49ac0", "#e2709c", 0.6, 1.1, 6)
      // pétalas (bem rosadas, para não parecer neve)
    ];
  }
  make(t, s, a, i, o, n, r) {
    t = Math.max(1, t);
    const l = new Float32Array(t * 3), c = new Float32Array(t), h = new Float32Array(t), f = new Float32Array(t);
    for (let b = 0; b < t; b++)
      l[b * 3] = (Math.random() - 0.5) * 90, l[b * 3 + 1] = -999, l[b * 3 + 2] = (Math.random() - 0.5) * 90, c[b] = Math.random(), h[b] = Math.random() * 100, f[b] = 0.7 + Math.random() * 0.6;
    const d = new ls();
    d.setAttribute("position", new Ee(l, 3).setUsage(ye)), d.setAttribute("aK", new Ee(c, 1)), d.setAttribute("aS", new Ee(f, 1));
    const u = new co({ transparent: !0, depthWrite: !1, uniforms: { uFow: Bt.uFow, uFowOn: Bt.uFowOn, uWorld: Bt.uWorld, uPR: { value: 1 }, uSize: { value: s }, uColA: { value: Ae(a) }, uColB: { value: Ae(i) }, uAmt: { value: 0 } }, vertexShader: zh, fragmentShader: Ah }), g = new qn(d, u);
    return g.frustumCulled = !1, g.renderOrder = 4, g.visible = !1, this.group.add(g), { p: g, pos: l, seed: h, n: t, use: t, fall: o, sway: n, m: u, hMax: r };
  }
  /** quantidade de partículas (qualidade gráfica) */
  setScale(t) {
    for (const s of this.list)
      s.use = Math.max(1, Math.round(s.n * t)), s.p.geometry.setDrawRange(0, s.use);
  }
  setPixelRatio(t) {
    for (const s of this.list) s.m.uniforms.uPR.value = t;
  }
  update(t, s, a, i, o) {
    this.list.forEach((n, r) => {
      if (n.m.uniforms.uAmt.value = a[r], a[r] < 0.01) {
        n.p.visible = !1;
        return;
      }
      n.p.visible = !0;
      for (let l = 0; l < n.use; l++) {
        const c = n.seed[l];
        let h = n.pos[l * 3], f = n.pos[l * 3 + 1], d = n.pos[l * 3 + 2];
        f -= n.fall * t * (0.7 + c % 1 * 0.6), h += (Math.sin(s + c) * n.sway + 0.4) * t, d += Math.cos(s * 0.8 + c) * n.sway * 0.5 * t;
        const u = h - i, g = d - o;
        u > 45 && (h -= 90), u < -45 && (h += 90), g > 45 && (d -= 90), g < -45 && (d += 90);
        const b = mt(this.map, h, d);
        (f < b || f > b + n.hMax + 4) && (f = b + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = h, n.pos[l * 3 + 1] = f, n.pos[l * 3 + 2] = d;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const qs = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], $h = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class fr {
  constructor(t, s, a) {
    m(this, "renderer");
    m(this, "scene", new kl());
    m(this, "camera");
    m(this, "sun");
    m(this, "hemi");
    m(this, "sky");
    m(this, "skyMat");
    m(this, "nature");
    m(this, "units", new sh());
    m(this, "buildings", new fh());
    m(this, "flames", new ph());
    m(this, "particles");
    m(this, "projectiles", new vh());
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
    // prévia do muro desenhado (D35): uma malha por desenho de bloco (a paliçada muda com os vizinhos)
    m(this, "wallGhosts", /* @__PURE__ */ new Map());
    m(this, "ghostMat", null);
    m(this, "ghostMatX", null);
    this.world = s, this.me = a;
    const i = s.map, o = i.size;
    this.renderer = t, this.scene.fog = new ul(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(o * o)), this.fowTex = new fl(this.fowData, o, o, pl, ml), this.fowTex.magFilter = this.fowTex.minFilter = gl, this.fowTex.needsUpdate = !0, Bt.uFow.value = this.fowTex, Bt.uWorld.value = o, this.skyMat = new co({
      side: bl,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: Ae("#78ade0") }, uHor: { value: Ae("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new We(new qi(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new vl(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new yl(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(Uc(i), _c(i)), this.nature = Gc(i), this.scene.add(this.nature.group);
    for (const c of this.nature.metal) c.visible = s.players[a].era >= 2;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new bh({ uFow: Bt.uFow, uFowOn: Bt.uFowOn, uWorld: Bt.uWorld }, 600), this.scene.add(this.particles.points), this.weather = new Th(i), this.scene.add(this.weather.group), this.seasons = new Mh(s.season), this.ghost = new We(new ls(), new Qs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new We(new ri(1, 1).rotateX(-Math.PI / 2), new ys({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new On(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let c = 0; c < 4; c++) {
      const h = new We(n, new ys({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      h.renderOrder = 6, h.visible = !1, this.scene.add(h), this.pings.push({ m: h, t: 0 });
    }
    this.rally = new _s(), this.rally.add(new We(new js(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new Qs({ color: 7229239 }))), this.rallyFlag = new We(new he(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new ys({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = s.players[a].start, l = o / 2;
    this.camera = new xh(i, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const s = new xl({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return s.outputColorSpace = En, s.toneMapping = Ml, s.toneMappingExposure = 1.08, s.shadowMap.enabled = !0, s.shadowMap.type = zl, s;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const s of t.map.res) {
      const a = s.z * t.size + s.x;
      t.resKind[a] === 0 ? this.nature.removeRes(a) : t.resKind[a] === ie && t.resAmt[a] <= 0 && this.nature.setBerries(a, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const s = qs[t], a = Math.min(window.devicePixelRatio || 1, s.pr);
    this.renderer.setPixelRatio(a), this.sun.castShadow = s.shadow > 0, s.shadow > 0 && this.sun.shadow.mapSize.x !== s.shadow && (this.sun.shadow.mapSize.set(s.shadow, s.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(s.trees, s.tufts), this.particles.mat.uniforms.uPR.value = a, this.weather.setPixelRatio(a), this.weather.setScale(s.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, s) {
    this.renderer.setSize(t, s, !1), this.camera.setAspect(t, s);
  }
  setFog(t) {
    this.fogOn = t, Bt.uFowOn.value = t ? 1 : 0;
  }
  seen(t, s) {
    if (!this.fogOn) return !0;
    const a = this.world.size, i = Math.floor(t), o = Math.floor(s);
    return i >= 0 && o >= 0 && i < a && o < a && this.world.vis[this.me][o * a + i] === 1;
  }
  /** acontecimentos da simulação que mudam a cena */
  consume(t) {
    const s = this.world, a = s.map;
    for (const i of t) switch (i.t) {
      case "tree":
        this.nature.removeTree(i.k);
        break;
      case "res": {
        const o = i.k;
        s.resKind[o] === 0 ? this.nature.removeRes(o) : s.resKind[o] === ie && this.nature.setBerries(o, s.resAmt[o] > 0);
        break;
      }
      case "death":
        if (i.kind < at) {
          const o = i.x / 256, n = i.z / 256;
          this.seen(o, n) && this.particles.puff(o, mt(a, o, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const o = s.x[i.e] / 256, n = s.z[i.e] / 256;
        this.seen(o, n) && this.particles.puff(o, mt(a, o, n), n, !0);
        break;
      }
      case "proj": {
        const o = i.x0 / 256, n = i.z0 / 256, r = i.x1 / 256, l = i.z1 / 256;
        (this.seen(o, n) || this.seen(r, l)) && this.projectiles.add(s, o, n, r, l, i.ticks, i.kind, i.gap / 256, i.tk, i.te, i.h);
        break;
      }
      case "age":
        if (i.player === this.me && i.era >= 2) for (const o of this.nature.metal) o.visible = !0;
        break;
    }
  }
  /** prévia do muro: um bloco por tile, na ordem do desenho. Verde onde dá para construir, vermelho onde não dá; os blocos
   *  depois de `drawn` (a linha reta até o cursor, ainda não posta) ficam mais claros */
  setWallGhost(t, s = [], a = t?.length ?? 0) {
    for (const d of this.wallGhosts.values()) d.count = 0;
    if (!t?.length) return;
    const i = this.world, o = i.size, n = i.players[this.me].era, r = i.muroDaEra(n) ?? "palisade", l = new Qt(), c = new Set(t);
    this.ghostMat ?? (this.ghostMat = new Qs({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghostMatX ?? (this.ghostMatX = new Qs({ vertexColors: !0, transparent: !0, opacity: 0.55, depthWrite: !1, depthTest: !1, flatShading: !0 }));
    const h = (d) => {
      const u = i.bAt[d] - 1;
      return u >= 0 && i.isBuilding(u) && i.owner[u] === this.me && i.bdef(u).wall;
    }, f = (d) => {
      const u = i.bAt[d] - 1;
      return h(d) && i.bdef(u).key !== "palisade";
    };
    for (let d = 0; d < t.length; d++) {
      const u = t[d], g = u % o, b = Math.floor(u / o), k = g + 0.5, y = b + 0.5;
      let M = -1;
      if (r === "palisade") {
        M = 0;
        const N = (A, I, B) => {
          if (A < 0 || I < 0 || A >= o || I >= o) return;
          const P = I * o + A;
          (c.has(P) || h(P)) && (M |= B), !c.has(P) && f(P) && (M |= B << 4);
        };
        N(g + 1, b, 1), N(g - 1, b, 2), N(g, b + 1, 4), N(g, b - 1, 8);
      }
      const v = (r === "palisade" ? "palisade/" + M : r + Math.min(n, 2)) + (s[d] ? "" : "/x");
      let z = this.wallGhosts.get(v);
      z || (z = new Ut(Xa(r, n, M), s[d] ? this.ghostMat : this.ghostMatX, as * 2), z.renderOrder = s[d] ? 7 : 8, z.frustumCulled = !1, z.count = 0, this.wallGhosts.set(v, z), this.scene.add(z)), !(z.count >= as * 2) && (z.setMatrixAt(z.count, new me().makeTranslation(k, mt(i.map, k, y), y)), z.setColorAt(z.count, l.set(s[d] ? d < a ? "#c6ffd4" : "#f4fff6" : "#ff8f80")), z.count++);
    }
    for (const d of this.wallGhosts.values())
      d.instanceMatrix.needsUpdate = !0, d.instanceColor && (d.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, s = 0, a = 0, i = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const o = ct[Nt[t]], n = this.world.players[this.me].era, r = t + Math.min(n, 2);
    r !== this.ghostKey && (this.ghost.geometry = Xa(t, n), this.ghostKey = r);
    const l = s + o.size / 2, c = a + o.size / 2, h = mt(this.world.map, l, c);
    this.ghost.position.set(l, h, c), this.ghost.visible = !0, this.ghost.material.color.set(i ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, h + 0.12, c), this.foot.scale.set(o.size, 1, o.size), this.foot.visible = !0, this.foot.material.color.set(i ? "#6fe08a" : "#e0533c");
  }
  ping(t, s, a) {
    const i = this.pings[this.pingI++ % this.pings.length];
    i.t = 0.7, i.m.position.set(t, mt(this.world.map, t, s) + 0.08, s), i.m.material.color.set($h[a]), i.m.visible = !0;
  }
  render(t, s, a, i) {
    const o = this.world, n = this.camera;
    Bt.uTime.value = i, n.update(t), this.seasons.update(t, o.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
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
    this.buildings.update(o, this.me, this.fogOn, i), this.units.update(o, s, t, a, this.me, this.fogOn, i, n.cam.quaternion), this.flames.update(this.buildings.fires, i), this.particles.smoke(t, this.buildings.smokes), this.particles.update(t), this.projectiles.update(t), this.weather.update(t, i, this.seasons.w, n.x, n.z);
    for (const d of this.pings) if (d.t > 0) {
      d.t -= t;
      const u = 1 - Math.max(0, d.t) / 0.7;
      d.m.scale.setScalar(1.4 - u * 0.8), d.m.material.opacity = Math.max(0, 1 - u), d.t <= 0 && (d.m.visible = !1);
    }
    let f = -1;
    if (a.size === 1) {
      const d = a.values().next().value;
      o.isBuilding(d) && o.owner[d] === this.me && o.rallyX[d] >= 0 && (f = d);
    }
    if (f >= 0) {
      const d = o.rallyX[f] / 256, u = o.rallyZ[f] / 256;
      this.rally.position.set(d, mt(o.map, d, u), u), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(i * 1.4) * 0.2, this.rallyFlag.material.color.set(o.players[this.me].color);
    } else this.rally.visible = !1;
    this.renderer.render(this.scene, n.cam);
  }
  updateFog(t = !1) {
    const s = this.world;
    if (!t && s.tick === this.lastFogTick) return;
    this.lastFogTick = s.tick;
    const a = s.vis[this.me], i = s.explored[this.me], o = this.fowData;
    for (let n = 0; n < o.length; n++) o[n] = a[n] ? 255 : i[n] ? 128 : 0;
    this.fowTex.needsUpdate = !0;
  }
  /** libera a memória da placa de vídeo ao sair da partida */
  dispose() {
    this.scene.traverse((t) => {
      const s = t;
      s.geometry && s.geometry.dispose();
      const a = s.material;
      Array.isArray(a) ? a.forEach((i) => i.dispose()) : a?.dispose();
    }), this.fowTex.dispose(), this.sun.shadow.map?.dispose(), this.renderer.renderLists.dispose();
  }
}
const pr = {
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
}, Sh = {
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
}, Ch = { en: pr, pt: Sh }, mr = "origines_lang";
let Ws = "en";
try {
  const e = localStorage.getItem(mr);
  (e === "pt" || e === "en") && (Ws = e);
} catch {
}
const ja = [], qe = () => Ws;
function rn(e) {
  Ws = e;
  try {
    localStorage.setItem(mr, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", ja.forEach((t) => t());
}
const gr = (e) => (ja.push(e), () => {
  const t = ja.indexOf(e);
  t >= 0 && ja.splice(t, 1);
});
function p(e, t = {}) {
  let s = Ch[Ws][e] ?? pr[e] ?? e;
  for (const a in t) s = s.split(`{${a}}`).join(String(t[a]));
  return s;
}
const qa = (e) => Math.floor(e).toLocaleString(Ws === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = Ws === "pt" ? "pt-BR" : "en");
const wh = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, Ki = {
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
}, Eh = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, Ph = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function vt(e, t) {
  const s = Ki[e] ?? Ki.animal;
  return !t && e.startsWith("season.") && (t = Ph[Number(e.slice(7))]), wh(s, t ?? Eh[e] ?? "currentColor");
}
function Ge(e) {
  return e in Ki ? vt(e, "currentColor") : vt(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const ts = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), ba = (e) => W.find((t) => t.key === e), Ih = W.filter((e) => e.pop > 0 && e.cls !== "villager").map((e) => e.key), Oh = (e) => W.filter((t) => t.cls === e && (t.pop > 0 || t.key === "barbarian")).map((t) => t.key);
function br(e) {
  const t = ba(e);
  if (!t) return [];
  const s = [];
  for (const a of t.bonus ?? [])
    if (a.vs === "animal") s.push({ k: "animais", dmg: a.dmg });
    else for (const i of Oh(a.vs)) s.push({ k: i, dmg: a.dmg });
  return t.siege && s.push({ k: "construcoes" }), s;
}
function vr(e) {
  const t = ba(e);
  if (!t) return [];
  const s = [];
  for (const a of W) if (a.pop > 0)
    for (const i of a.bonus ?? []) i.vs === t.cls && s.push({ k: a.key, dmg: i.dmg });
  return t.siege && s.push({ k: "todos" }), s;
}
function Bh(e) {
  const t = ba(e)?.cls;
  return t === "ranged" ? "vs.far" : t === "scout" ? "vs.scout" : t === "cavalry" ? "vs.fast" : t === "infantry" ? "vs.foot" : null;
}
function yr(e) {
  const t = ba(e);
  if (!t || t.cls === "animal") return null;
  const s = t.muro ?? 100;
  return t.proj ? "vs.muroCima" : s >= 150 ? "vs.muroForte" : s <= 50 ? "vs.muroFraco" : null;
}
const ln = ["spearman", "horseman", "slinger", "swordsman"], cn = (e) => p(e === "animais" ? "vs.animals" : e === "construcoes" ? "vs.buildings" : e === "todos" ? "vs.anyone" : `unit.${e}`), qh = (e) => e === "animais" ? vt("animal", "currentColor") : e === "construcoes" ? vt("house", "currentColor") : e === "todos" ? vt("army", "currentColor") : Ge(e), Ja = (e) => e.length ? e.map((t) => `<span class="vs-i" title="${ts(cn(t.k))}">${qh(t.k)}<span>${ts(cn(t.k))}</span></span>`).join("") : '<span class="vs-i vs-nada">—</span>';
function hn(e) {
  const t = br(e), s = vr(e), a = yr(e);
  return !t.length && !s.length && !a ? "" : `<div class="vs">${t.length ? `<div class="vs-l vs-win"><b>${p("vs.win")}</b>${Ja(t)}</div>` : ""}${s.length ? `<div class="vs-l vs-lose"><b>${p("vs.lose")}</b>${Ja(s)}</div>` : ""}${a ? `<div class="vs-l vs-muro"><b>${p("vs.muros")}</b><span class="vs-mt">${ts(p(a))}</span></div>` : ""}</div>`;
}
function Nh(e) {
  const t = [...ln, ln[0]].map((a, i) => (i ? `<span class="vs-seta">${p("vs.beats")} ›</span>` : "") + `<span class="vs-c">${Ge(a)}<b>${ts(p(`unit.${a}`))}</b></span>`).join(""), s = [...Ih, "barbarian"].map((a) => {
    const i = ba(a), o = i.pop > 0 && i.era > e, n = Bh(a), r = yr(a), l = a === "barbarian" ? p("vs.enemy") : o ? p("vs.from", { era: p(`era.${i.era}.in`) }) : "";
    return `<li class="vs-row${o ? " futura" : ""}"><div class="vs-who">${Ge(a)}<b>${ts(p(`unit.${a}`))}</b>${l ? `<small>${ts(l)}</small>` : ""}${n ? `<em>${ts(p(n))}</em>` : ""}${r ? `<em class="vs-muro">${ts(p(r))}</em>` : ""}</div><div class="vs-l vs-win"><b>${p("vs.win")}</b>${Ja(br(a))}</div><div class="vs-l vs-lose"><b>${p("vs.lose")}</b>${Ja(vr(a))}</div></li>`;
  }).join("");
  return `<p class="vs-intro">${p("vs.intro")}</p><div class="vs-ciclo" aria-label="${p("vs.cycle")}">${t}</div><ul class="vs-tab">${s}</ul>`;
}
const ui = (e) => e === "logistica" ? "combate" : "logistica", Rh = (e) => e === "logistica" ? 1 : e === "combate" ? 2 : 0, Fh = (e) => e === 1 ? "logistica" : e === 2 ? "combate" : null, vo = (e) => {
  const t = W.find((s) => s.key === e);
  return !!t && t.pop > 0 && t.cls !== "villager";
}, Dh = (e) => {
  const t = W[e];
  return !!t && t.pop > 0 && t.cls !== "villager";
}, Yi = (e) => {
  const t = ct[Nt[e]];
  if (!t) return !1;
  const s = (t.trains ?? []).flat();
  return s.length > 0 && s.every(vo) && !(t.research ?? []).length;
};
function ra(e, t, s) {
  return t ? e.isBuilding(s) ? t === "logistica" : e.isUnit(s) ? Dh(e.kind[s]) ? t === "combate" : t === "logistica" : !1 : !0;
}
const Lh = /* @__PURE__ */ new Set(["gather", "work", "food", "build", "wall", "ageup", "rally", "research", "trade"]);
function kr(e, t, s) {
  if (!t) return s;
  switch (s.type) {
    case "ia":
      return null;
    // não é ordem de quem joga
    case "train":
      return t === "logistica" || vo(s.key) ? s : null;
    // treinar tropas: os dois
    case "cancel":
      return t === "logistica" || e.isBuilding(s.building) && Yi(e.bdef(s.building).key) ? s : null;
    default: {
      if (Lh.has(s.type) && t !== "logistica") return null;
      if (!("ids" in s)) return t === "logistica" ? s : null;
      const a = s.ids.filter((i) => ra(e, t, i));
      return a.length ? { ...s, ids: a } : null;
    }
  }
}
const fs = [0, 0.2, 0.5, 0.85], dn = "origines_som", un = { music: 1, sfx: 3, amb: 2, muted: !1 };
class jh {
  constructor() {
    m(this, "ctx", null);
    m(this, "opts", { ...un });
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
      const t = JSON.parse(localStorage.getItem(dn) ?? "null");
      t && typeof t == "object" && (this.opts = { ...un, ...t });
    } catch {
    }
  }
  install() {
    if (this.installed) return;
    this.installed = !0;
    const t = () => this.unlock();
    for (const s of ["pointerdown", "pointerup", "touchend", "click", "keydown"]) addEventListener(s, t, { capture: !0, passive: !0 });
    document.addEventListener("visibilitychange", () => this.setHidden(document.hidden)), addEventListener("pagehide", () => this.setHidden(!0)), addEventListener("pageshow", () => this.setHidden(document.hidden));
  }
  /** cria o som no primeiro toque (antes disso o navegador não deixa) */
  unlock() {
    if (!this.ctx) {
      const s = window.AudioContext ?? window.webkitAudioContext;
      if (!s) return;
      try {
        this.ctx = new s({ latencyHint: "interactive" });
      } catch {
        return;
      }
      const a = this.ctx, i = a.createDynamicsCompressor();
      i.threshold.value = -12, i.knee.value = 8, i.ratio.value = 10, i.attack.value = 4e-3, i.release.value = 0.25, i.connect(a.destination), this.master = a.createGain(), this.master.connect(i), this.duckG = a.createGain(), this.duckG.connect(this.master);
      for (const o of ["music", "amb", "sfx", "ui", "alert"]) {
        const n = a.createGain();
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
        const s = t.createBufferSource();
        s.buffer = t.createBuffer(1, 1, t.sampleRate), s.connect(t.destination), s.start(0);
      } catch {
      }
    }
  }
  /** roda f assim que o som estiver tocando: na hora, se já está; senão, quando o resume() terminar (o iPhone liga o som aos poucos) */
  whenRunning(t) {
    const s = this.ctx;
    if (s) {
      if (this.running) {
        t();
        return;
      }
      this.hidden || s.state === "closed" || s.resume().then(() => {
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
      localStorage.setItem(dn, JSON.stringify(this.opts));
    } catch {
    }
    this.apply();
    for (const s of this.onChange) s();
  }
  toggleMute() {
    this.setOpts({ muted: !this.opts.muted });
  }
  level(t) {
    const s = this.opts;
    if (s.muted) return 0;
    switch (t) {
      case "music":
        return this.scene === "menu" ? s.music ? Math.max(fs[2], fs[s.music]) : 0 : fs[s.music];
      case "amb":
        return this.scene === "game" ? fs[s.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return fs[s.sfx];
      case "ui":
        return fs[s.sfx] * 0.8;
      case "alert":
        return s.sfx ? Math.max(0.5, fs[s.sfx]) : 0;
    }
  }
  apply(t = !1) {
    if (!this.ctx) return;
    const s = this.ctx.currentTime;
    for (const a of Object.keys(this.buses)) {
      const i = this.buses[a].gain;
      i.cancelScheduledValues(s), t ? i.setValueAtTime(this.level(a), s) : i.setTargetAtTime(this.level(a), s, a === "music" ? 0.8 : 0.15);
    }
  }
  /** a música abaixa um pouco quando toca um aviso e volta sozinha */
  duck(t = 0.55, s = 2.2) {
    if (!this.ctx) return;
    const a = this.duckG.gain, i = this.ctx.currentTime;
    a.cancelScheduledValues(i), a.setTargetAtTime(1 - t, i, 0.05), a.setTargetAtTime(1, i + s, 0.6);
  }
  setHidden(t) {
    this.hidden = t, this.ctx && (t ? this.ctx.suspend().catch(() => {
    }) : this.ctx.resume().catch(() => {
    }));
  }
  /** limite de sons ao mesmo tempo: só toca se houver vaga; ocupa a vaga por dur segundos */
  voice(t) {
    const s = this.now;
    return this.voices = this.voices.filter((a) => a > s), this.voices.length >= this.maxVoices ? !1 : (this.voices.push(s + t), !0);
  }
}
const K = new jh(), Za = { 1: { vagas: 2, times: [0, 1] }, 2: { vagas: 4, times: [0, 0, 1, 1] }, 3: { vagas: 3, times: [0, 1, 2] }, 4: { vagas: 4, times: [0, 1, 2, 3] } }, Xi = ["ajuda", "atacar", "cuidado"], Hh = (e) => e.map((t, s) => t ? s : -1).filter((t) => t >= 0), fn = { ajuda: "ajuda", atacar: "vs", cuidado: "cuidado" }, Uh = ["food", "wood", "stone", "metal"], _h = ["I", "II", "III", "IV", "V", "VI"], Kt = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), ni = class ni {
  constructor(t, s, a, i, o) {
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
    m(this, "muroN", -1);
    m(this, "muroDesenho", 0);
    // muro desenhado (D35): blocos que dá para construir (-1 = não é muro) e blocos desenhados
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
    // ── taxa dos materiais (D38): quanto entra por minuto de jogo, na média dos últimos 2 minutos ──
    m(this, "amostras", []);
    this.world = t, this.me = s, this.act = a, this.touch = i, this.selected = o, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = gr(() => this.build()), K.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = K.opts.muted;
      n.innerHTML = vt(r ? "mute" : "sound"), n.title = p(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (s) => s.target?.closest?.(ni.TIP_SEL) ?? null;
    this.root.addEventListener("pointerdown", (s) => {
      if (s.pointerType === "mouse") return;
      clearTimeout(this.holdTimer), this.tipHeld = !1;
      const a = t(s);
      a && (a.classList.contains("cb") && this.showTip(a), this.holdTimer = window.setTimeout(() => {
        this.tipHeld = !0, this.showTip(a);
      }, 550));
    }), this.root.addEventListener("pointerover", (s) => {
      if (s.pointerType !== "mouse") return;
      const a = t(s);
      a?.classList.contains("cb") && (clearTimeout(this.hoverTimer), this.hoverTimer = window.setTimeout(() => this.showTip(a), 250));
    }), this.root.addEventListener("pointerout", (s) => {
      if (s.pointerType !== "mouse") return;
      const a = t(s);
      a && a.contains(s.relatedTarget) || (clearTimeout(this.hoverTimer), this.hideTip());
    }), this.root.addEventListener("click", (s) => {
      this.tipHeld && (this.tipHeld = !1, s.stopPropagation(), s.preventDefault());
    }, !0), this.root.addEventListener("contextmenu", (s) => {
      t(s) && s.preventDefault();
    }), addEventListener("pointerup", this.tipUp), addEventListener("pointercancel", this.tipUp);
  }
  showTip(t) {
    let s = "";
    if (t.classList.contains("cb")) {
      const l = this.btns[Number(t.dataset.i)];
      if (!l) return;
      s = this.tipHtml(l);
    } else {
      const l = t.getAttribute("title") ?? t.getAttribute("aria-label");
      if (!l) return;
      s = `<div class="tip-h"><b>${Kt(l)}</b></div>`;
    }
    const a = this.tipEl;
    clearTimeout(this.tipTimer), a.innerHTML = s, a.hidden = !1;
    const i = t.getBoundingClientRect(), o = a.offsetWidth, n = a.offsetHeight;
    let r = i.top - n - 8;
    r < 8 && (r = i.bottom + 8), a.style.left = `${Math.round(Math.max(8, Math.min(innerWidth - o - 8, i.left + i.width / 2 - o / 2)))}px`, a.style.top = `${Math.round(r)}px`;
  }
  hideTip() {
    clearTimeout(this.tipTimer), clearTimeout(this.hoverTimer), this.tipEl.hidden = !0;
  }
  tipHtml(t) {
    return `<div class="tip-h"><span class="tip-ic">${Ge(t.ic)}</span><b>${Kt(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${Kt(t.tip.desc)}</p>` : "") + (t.vs ? hn(t.vs) : "") + (t.why ? `<p class="tip-why">${Kt(t.why)}</p>` : "");
  }
  costHtml(t) {
    const s = this.world.players[this.me].res;
    return `<span class="cost">${bs.filter((a) => t[a]).map((a) => `<span class="c${s[a] < t[a] * 100 ? " no" : ""}">${vt(a)}${t[a]}</span>`).join("")}</span>`;
  }
  /** o botão de construir dá a versão desta era (D35: a paliçada vira muralha de pedra nos Metais; antes disso, a muralha não aparece) */
  trocada(t, s) {
    const a = ct[Nt[t]];
    return a.next && ct[Nt[a.next]].era <= s ? !0 : ct.some((i) => i.next === t && i.era <= s && a.era > s);
  }
  bldDesc(t, s) {
    return p(`bld.${t}.d`, { n: this.world.vagas(t, s), get: Re.get, fair: Re.fair });
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
          <button id="btn-som" title="${p(K.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${p(K.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${K.opts.muted}">${vt(K.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-quem-vence" title="${p("btn.vs")}" aria-label="${p("btn.vs")}">${vt("vs")}</button>
          <button id="btn-ajuda" title="${p("btn.help")}" aria-label="${p("btn.help")}">${vt("help")}</button>
          <button id="btn-menu" title="${p("btn.menu")}" aria-label="${p("btn.menu")}">${vt("menu")}<span class="btn-label">${p("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <p class="amigo-faixa panel" id="amigo-faixa" hidden></p>
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${vt("check")}<span>${p("cmd.place")}</span></button>
          <button id="btn-desfazer-muro" hidden>${vt("undo")}<span>${p("cmd.undo")}</span></button>
          <button id="btn-cancelar-modo">${vt("cancel")}<span>${p("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${p(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${p("btn.idle")}">${vt("idle")}<span class="btn-label">${p("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${p("btn.army")}">${vt("army")}<span class="btn-label">${p("btn.army")}</span></button>
            <button id="btn-aldeia" title="${p("btn.home")}">${vt("home")}<span class="btn-label">${p("btn.home")}</span></button>
            <button id="btn-sinal" title="${p("sinal.btn")}" hidden>${vt("sinal")}<span class="btn-label">${p("sinal.btn")}</span></button>
          </div>
          <div class="sinais panel" id="sinais" hidden>${Xi.map((a) => `<button data-sinal="${a}">${vt(fn[a])}<span>${p(`sinal.${a}`)}</span></button>`).join("")}</div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="marcas" id="marcas" aria-live="polite"></div>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${p("help.title")}</h2><p class="goal">${p("help.goal")}</p>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", "help.l9", "help.l8", "help.l10", t ? "help.l5.touch" : "help.l5.mouse"].map((a) => `<li>${p(a)}</li>`).join("")}</ul>
        <p class="hint-copy">${p(t ? "hint.touch" : "hint.mouse")}</p>
        <div class="row-btns"><button id="btn-quem-vence-ajuda">${vt("vs")}<span>${p("btn.vs")}</span></button><button id="btn-fechar-ajuda" class="primary">${p("help.close")}</button></div></div></div>
      <div class="modal" id="vantagens" data-open="false"><div class="card panel vs-card">
        <h2>${vt("vs")}${p("btn.vs")}</h2><div id="vantagens-corpo"></div>
        <button id="btn-fechar-vantagens" class="primary">${p("help.close")}</button></div></div>`;
    for (const a of ["era", "res", "cal", "amigo-chip", "tribos", "sinais", "marcas", "amigo-faixa", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "btn-desfazer-muro", "hint", "sel", "cmd", "mini", "ajuda", "vantagens", "vantagens-corpo", "idle-n"]) this.$[a] = document.getElementById(a);
    this.$.mini.appendChild(this.minimap);
    const s = (a, i) => {
      document.getElementById(a).onclick = i;
    };
    s("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), s("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), s("btn-quem-vence", () => this.openVs()), s("btn-quem-vence-ajuda", () => {
      this.$.ajuda.dataset.open = "false", this.openVs();
    }), s("btn-fechar-vantagens", () => this.$.vantagens.dataset.open = "false"), s("btn-menu", () => this.act.menu()), s("btn-som", () => K.toggleMute()), s("btn-ocioso", () => this.act.idle()), s("btn-exercito", () => this.act.army()), s("btn-aldeia", () => this.act.home()), s("btn-sinal", () => {
      const a = this.$.sinais;
      a.hidden = !a.hidden;
    }), this.$.sinais.querySelectorAll("[data-sinal]").forEach((a) => a.onclick = () => {
      this.$.sinais.hidden = !0, this.act.sinal?.(a.dataset.sinal);
    }), s("btn-confirmar-obra", () => this.act.placeConfirm()), s("btn-cancelar-modo", () => this.act.cancelMode()), s("btn-desfazer-muro", () => this.act.undoWall()), this.$.ajuda.onclick = (a) => {
      a.target === this.$.ajuda && (this.$.ajuda.dataset.open = "false");
    }, this.$.vantagens.onclick = (a) => {
      a.target === this.$.vantagens && (this.$.vantagens.dataset.open = "false");
    }, this.sigTop = this.sigSel = this.sigCard = this.sigMode = "", this.idleN = -1, this.toasts = [], this.setAmigo(this.amigoNome), this.setFaixa(this.amigoFaixa), this.setPapel(this.papel, this.papelQuem), this.setTribos(this.tribos), this.sigTribos = "", this.update(0, !0);
  }
  /** no alto da tela: com quem está jogando (null: sozinho) */
  setAmigo(t) {
    this.amigoNome = t;
    const s = this.$["amigo-chip"];
    if (!s) return;
    const a = t && this.papel ? p("amigo.chipPapel", { name: t, papel: p(`papel.${this.papel}`) }) : t ? p("amigo.chip", { name: t }) : "";
    s.hidden = !t, s.innerHTML = t ? `${vt("amigo")}<span>${Kt(a)}</span>` : "";
  }
  setPapel(t, s) {
    this.papel = t, this.papelQuem = s;
    const a = document.getElementById("btn-ocioso"), i = document.getElementById("btn-exercito");
    a && (a.hidden = t === "combate"), i && (i.hidden = t === "logistica"), this.setAmigo(this.amigoNome), this.sigSel = "", this.refresh();
  }
  /** nomes: o apelido em cada vaga ('' = computador); null = jogo sem partida online */
  setTribos(t) {
    this.tribos = t, this.sigTribos = "";
    const s = this.$.tribos;
    if (!s) return;
    s.hidden = !t, t || (s.innerHTML = "");
    const a = !!t && this.world.players.some((o, n) => this.world.aliado(this.me, n)), i = document.getElementById("btn-sinal");
    i && (i.hidden = !a), a || (this.$.sinais.hidden = !0);
  }
  desenharTribos() {
    const t = this.tribos, s = this.$.tribos;
    if (!t || !s) return;
    const a = this.world, i = a.players.map((o) => `${o.ai ? 1 : 0}${o.defeated ? 1 : 0}`).join("") + qe();
    i !== this.sigTribos && (this.sigTribos = i, s.innerHTML = a.players.map((o, n) => {
      const r = n === this.me ? p("tribe.you") : t[n] ? o.ai ? p("online.computadorDe", { name: t[n] }) : t[n] : p("sala.computador"), l = a.aliado(this.me, n);
      return `<span class="trib${n === this.me ? " eu" : ""}${l ? " aliado" : ""}${o.defeated ? " fora" : ""}" style="--cor:${o.color}" title="${Kt(r)}${l ? " · " + p("online.aliado") : ""}"><i></i>${Kt(r)}${l ? vt("amigo") : ""}</span>`;
    }).join(""));
  }
  /** o modo sinal: qual sinal o próximo toque no mapa põe */
  setSinal(t) {
    this.sinalTipo = t;
  }
  /** a marca de um sinal no mapa (some depois de 6 s) */
  addMarca(t, s, a, i) {
    const o = document.createElement("div");
    o.className = `marca-sinal ${a}`, o.innerHTML = `${vt(fn[a])}<span><b>${Kt(i)}</b>${p(`sinal.${a}`)}</span>`, this.$.marcas.appendChild(o), this.marcas.push({ x: t, z: s, ate: performance.now() + 6e3, el: o }), this.marcas.length > 6 && this.marcas.shift().el.remove(), this.posicionarMarcas();
  }
  posicionarMarcas() {
    const t = performance.now();
    this.marcas = this.marcas.filter((s) => s.ate > t ? !0 : (s.el.remove(), !1));
    for (const s of this.marcas) {
      const a = this.projetor?.(s.x, s.z);
      a && (s.el.style.transform = `translate(${Math.round(a[0])}px, ${Math.round(a[1])}px)`, s.el.hidden = !a[2]);
    }
  }
  /** a faixa de aviso do jogo com amigo (pausado pelo anfitrião, esperando, sincronizando…); null some */
  setFaixa(t) {
    this.amigoFaixa = t;
    const s = this.$["amigo-faixa"];
    s && (s.hidden = !t, s.textContent = t ?? "");
  }
  openHelp() {
    this.$.ajuda.dataset.open = "true";
  }
  /** quem vence quem: a tabela com a era de agora (as tropas das próximas eras aparecem apagadas) */
  openVs() {
    this.hideTip(), this.$["vantagens-corpo"].innerHTML = Nh(this.world.players[this.me].era), this.$.vantagens.dataset.open = "true";
  }
  hideHint() {
    this.hintHidden || (this.hintHidden = !0, this.$.hint.style.opacity = "0");
  }
  /** wall: 1 = escolhendo o começo da muralha, 2 = escolhendo o fim */
  /** muro: blocos que dá para construir (-1 = não é muro) e blocos desenhados */
  setMode(t, s = !0, a = -1, i = "", o = 0) {
    this.mode = t, this.placeOk = s, this.muroN = a, this.muroDesenho = o, this.placeKey = i, t !== "normal" && this.hideTip();
  }
  /** nome da construção na era (o Centro vira Salão do chefe, o campo de treino vira Quartel) */
  bldName(t, s) {
    for (let a = s; a >= 0; a--) {
      const i = `bld.${t}.e${a}`, o = p(i);
      if (o !== i) return o;
    }
    return p(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, s, a, i = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const o = document.createElement("button");
    for (o.className = "toast panel", o.dataset.aviso = i || "info", o.innerHTML = `<span>${Kt(t)}</span>${s !== void 0 ? `<span class="go">${p("msg.go")}</span>` : ""}`, o.onclick = () => {
      s !== void 0 && a !== void 0 && this.act.jump(s, a), o.remove(), this.toasts = this.toasts.filter((n) => n.el !== o);
    }, this.$.toasts.prepend(o), this.toasts.unshift({ el: o, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return this.tribos && t >= 0 && t < this.tribos.length && t !== this.me ? this.tribos[t] || p("sala.computador") : t === this.me ? p("tribe.you") : p(t === Mt ? "tribe.wild" : `tribe.${t === de ? 6 : t}`);
  }
  onEvents(t) {
    for (const s of t) {
      if (s.t === "age") {
        this.toast(s.player === this.me ? p("msg.ageMe", { era: p(`era.${s.era}.in`) }) : p("msg.ageOther", { p: this.tribe(s.player), era: p(`era.${s.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (s.t !== "msg" || s.player !== this.me) continue;
      const [a, i] = s.key.split("."), o = s.x !== void 0 ? s.x / 256 : void 0, n = s.z !== void 0 ? s.z / 256 : void 0;
      if (a === "built") this.toast(p("msg.built", { b: p(`bld.${i}`) }), o, n, "built");
      else if (a === "defeated") {
        const r = Number(i), l = this.tribos?.[r];
        this.toast(r === this.me ? p("msg.youDefeated") : l ? p("msg.defeatedDe", { p: l }) : p("msg.defeated", { p: this.tribos ? p(`tribe.${r}`) : this.tribe(r) }), void 0, void 0, "defeated");
      } else a === "tech" ? this.toast(p("msg.tech", { tech: p(`tech.${i}`) }), o, n, "tech") : a === "muroFalta" ? this.toast(p("msg.muroFalta", { res: p(`res.${i}`).toLowerCase() }), o, n, "muroFalta") : this.toast(p(`msg.${a}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), a === "underAttack" || a === "raidSoon" || a === "centerLost" || a === "centerDanger" || a === "campLoot" || a === "fuga" ? o : void 0, n, a);
    }
  }
  // ── atualização ──
  update(t, s = !1) {
    for (const a of this.toasts) (a.t -= t) <= 0 && a.el.remove();
    this.toasts = this.toasts.filter((a) => a.t > 0);
    for (const a of this.progs) a.el.style.width = `${Math.round(Math.max(0, Math.min(1, a.f())) * 100)}%`;
    this.marcas.length && this.posicionarMarcas(), this.slow -= t, !(!s && this.slow > 0) && (this.slow = 0.15, this.renderTop(), this.renderMode(), this.renderSel(), this.renderCard(), this.renderIdle(), this.desenharTribos());
  }
  /** por minuto: comida (o que entra menos o que a tribo come), madeira, pedra e metal; null nos primeiros 10 s */
  taxas() {
    const t = this.world, s = t.obtido[this.me] ?? [0, 0, 0, 0], a = t.comido[this.me] ?? 0, i = this.amostras[this.amostras.length - 1];
    i && (t.tick < i.t || s.some((h, f) => h < i.o[f])) && (this.amostras = []);
    const o = this.amostras[this.amostras.length - 1];
    if (!o || t.tick - o.t >= _a)
      for (this.amostras.push({ t: t.tick, o: s.slice(), c: a }); this.amostras.length > 2 && t.tick - this.amostras[1].t >= 2 * ge; ) this.amostras.shift();
    const n = this.amostras[0], r = this.amostras[this.amostras.length - 1], l = r.t - n.t;
    if (l < 10 * _a) return null;
    const c = l / ge;
    return [0, 1, 2, 3].map((h) => Math.round((r.o[h] - n.o[h] - (h === 0 ? r.c - n.c : 0)) / 100 / c));
  }
  renderTop() {
    const t = this.world, s = t.players[this.me], a = s.era, i = a >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], o = t.pop(this.me), n = t.popCap(this.me), r = this.taxas(), l = i.map((f) => Math.floor(s.res[f] / 100)).join(",") + `|${r?.join(",")}|${o}|${n}|${a}|${s.aging > 0}|${t.season}|${t.year}|${qe()}`;
    if (l === this.sigTop) return;
    this.sigTop = l;
    const c = (f) => {
      if (!r) return "";
      const d = r[f];
      return `<small class="taxa${d < 0 ? " neg" : d === 0 ? " zero" : ""}">${d > 0 ? "+" : d < 0 ? "−" : ""}${qa(Math.abs(d))}${p("taxa.min")}</small>`;
    }, h = (f, d) => r ? p(d === 0 ? "taxa.tip.food" : "taxa.tip", { res: p(`res.${f}`), n: qa(s.res[f] / 100), v: `${r[d] > 0 ? "+" : r[d] < 0 ? "−" : ""}${qa(Math.abs(r[d]))}` }) : p(`res.${f}`);
    this.$.res.innerHTML = i.map((f, d) => `<div class="r" title="${Kt(h(f, d))}">${vt(f)}<span class="q"><span>${qa(s.res[f] / 100)}</span>${c(d)}</span></div>`).join("") + `<div class="r${o >= n ? " full" : ""}" title="${p("pop.tip", { n: o, cap: n, max: this.world.limiteEra(a) })}">${vt("pop")}<span>${o}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${_h[a]}</span><span class="name">${p(`era.${a}`)}</span>${s.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = p(`era.${a}`), this.$.cal.innerHTML = `${vt(`season.${t.season}`)}<span class="name">${p(`season.${t.season}`)}</span><span class="yr">${p("cal.year", { y: t.year })}</span><span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${p(`season.${t.season}`)} · ${p("cal.year", { y: t.year })}`, this.$.cal.dataset.season = String(t.season), this.bindProgs();
  }
  renderMode() {
    const t = this.world.players[this.me].era, s = this.mode === "place" && this.muroN >= 0, a = s && this.world.canAfford(this.me, ct[Nt[this.world.muroDaEra(t) ?? this.placeKey]].cost), i = `${this.mode}|${this.placeOk}|${this.muroN}|${this.muroDesenho}|${a}|${this.placeKey}|${t}|${qe()}`;
    if (i === this.sigMode) return;
    this.sigMode = i;
    const o = this.$.modebar;
    o.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, o.classList.toggle("muro", s), this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && (this.touch || s)), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk)), this.$["btn-desfazer-muro"].hidden = !s, this.$["btn-desfazer-muro"].setAttribute("aria-disabled", String(!this.muroDesenho));
    const n = this.touch ? "touch" : "mouse";
    let r = this.mode === "place" ? this.placeOk ? p(`place.${n}`) : p("place.bad") : this.mode === "rally" ? p("rally.hint") : this.mode === "sinal" && this.sinalTipo ? p("sinal.toque", { sinal: p(`sinal.${this.sinalTipo}`) }) : "", l = this.mode === "place" && this.placeKey ? this.bldName(this.placeKey, t) : "";
    if (s) {
      const c = this.world.muroDaEra(t) ?? this.placeKey, [h, f] = Object.entries(ct[Nt[c]].cost)[0];
      l = this.bldName(c, t), this.world.canAfford(this.me, ct[Nt[c]].cost) ? r = this.muroDesenho ? p("muro.blocos", { n: this.muroN, v: this.muroN * f, res: p(`res.${h}`).toLowerCase() }) + (this.muroN < this.muroDesenho ? " · " + p("muro.vermelhos") : "") : p(`place.muro.${n}`) : r = p("muro.falta", { v: f, res: p(`res.${h}`).toLowerCase() }), this.muroDesenho && !this.touch && (r += " · " + p("place.muro.mouse2"));
    }
    this.$["modebar-text"].innerHTML = (l ? `<b class="mb-name">${Kt(l)}</b> · ` : "") + Kt(r) + (s && this.touch ? `<small class="mb-dica">${Kt(p("place.muro.dica"))}</small>` : "");
  }
  renderIdle() {
    const t = this.world;
    let s = 0;
    for (let a = 0; a < t.top; a++) t.isUnit(a) && t.owner[a] === this.me && t.kind[a] === pt.villager && t.task[a] === 0 && t.state[a] !== Yt && s++;
    s !== this.idleN && (this.idleN = s, this.$["idle-n"].hidden = s === 0, this.$["idle-n"].textContent = String(s));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const s = this.world, a = s.task[t], i = s.tgt[t];
    return a === jt ? s.phase[t] === ga ? p("do.return", { n: Math.floor(s.carry[t] / 100), res: p(`res.${Uh[s.carryRes[t]]}`).toLowerCase() }) : i < 0 ? p("do.move") : s.tgtTile[t] ? p(s.map.tree[i] ? "do.wood" : s.resKind[i] === ie ? "do.berry" : s.resKind[i] === Le ? "do.stone" : "do.metal") : p(s.kind[i] === gt ? "do.meat" : "do.farm") : a === ke ? i >= 0 && s.aPagar[i] && s.isBuilding(i) && !s.canAfford(s.owner[i], s.bdef(i).cost) ? p("do.waitRes", { res: p(`res.${Object.keys(s.bdef(i).cost)[0]}`).toLowerCase() }) : p("do.build") : p(a === Rt ? i >= 0 && s.owner[i] === Mt ? "do.hunt" : "do.fight" : a === Ss ? "do.amove" : a === Ms ? "do.flee" : s.state[t] === Yt ? "do.move" : s.foodMode[t] ? "do.forage" : "do.idle");
  }
  renderSel() {
    const t = this.world, s = [...this.selected].filter((n) => t.alive[n]);
    if (!s.length) {
      this.sigSel !== "none" && (this.sigSel = "none", this.$.sel.hidden = !0);
      return;
    }
    let a, i;
    if (s.length === 1) {
      const n = s[0], r = t.kind[n], l = t.owner[n], c = l === this.me;
      if (r >= at) {
        const h = ct[r - at], f = t.players[l]?.era ?? 0, d = t.done[n] === 1, u = t.queue[n], g = h.key === "farm" && d ? this.farmer(n) : null;
        if (a = `b${n}|${t.hp[n]}|${d}|${u.join(",")}|${g}|${qe()}|${this.papel}`, a === this.sigSel) return;
        const b = c ? d ? "" : p("info.building") : this.tribe(l), k = this.bldDesc(h.key, f);
        i = this.head(Ge(h.key), this.bldName(h.key, f), b, c) + this.hp(t.hp[n], h.hp) + (!d && c ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${k}</div>` + (g !== null ? `<div class="sel-line">${p("info.farmer", { who: p(g ? "info.yes" : "info.no") })}</div>` : "") + (c ? this.quemComanda(n, h.key) : "") + (u.length ? `<div class="queue" aria-label="${p("info.queue")}">${u.map((y, M) => {
          const v = y >= ce ? os[y - ce].key : W[y].key;
          return `<span class="qi" title="${p(y >= ce ? `tech.${v}` : `unit.${v}`)}">${Ge(v)}${M === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === gt) {
        const h = Math.floor(t.work[n] / 100);
        if (a = `c${n}|${h}|${qe()}`, a === this.sigSel) return;
        i = this.head(vt("carcass", "currentColor"), p("unit.carcass"), p(`unit.${W[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${p("unit.carcass.d", { food: h })}</div>`;
      } else {
        const h = W[r], f = c ? this.doing(n) : this.tribe(l), d = c ? this.quemComanda(n) : "";
        if (a = `u${n}|${t.hp[n]}|${f}|${qe()}|${this.papel}`, a === this.sigSel) return;
        i = this.head(Ge(h.key), p(`unit.${h.key}`), f, c) + this.hp(t.hp[n], h.hp) + `<div class="sel-desc">${p(`unit.${h.key}.d`, { food: h.animal?.food ?? 0 })}</div>` + d + hn(h.key);
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of s) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, c) => l[0] - c[0]);
      if (a = "m" + r.map(([l, c]) => `${l}:${c}`).join(",") + qe(), a === this.sigSel) return;
      i = this.head(vt("pop", "currentColor"), p("sel.many", { n: s.length }), "", !0) + `<div class="sel-icons">${r.map(([l, c]) => `<button data-selecionar="${W[l]?.key ?? l}" title="${p(`unit.${W[l]?.key}`)}">${Ge(W[l]?.key ?? "")}<span>${c}</span></button>`).join("")}</div>`;
    }
    this.sigSel = a, this.$.sel.hidden = !1, this.$.sel.innerHTML = i, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(pt[n.dataset.selecionar]));
    const o = this.$.sel.querySelector("#btn-limpar-selecao");
    o && (o.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, s, a, i) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Kt(s)}</div>${a ? `<div class="sel-sub">${Kt(a)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${p("sel.clear")}" aria-label="${p("sel.clear")}">${vt("close")}</button></div>`;
  }
  /** com papel (D31): no que é do outro papel, quem comanda; no campo de treino, o Líder de Combate só treina tropas */
  quemComanda(t, s = "") {
    const a = this.papel;
    if (!a || ra(this.world, a, t)) return "";
    const i = p(`papel.${ui(a)}`), o = Kt(this.papelQuem || "?"), n = s && Yi(s) ? p("papel.soTreinar", { name: o, papel: i }) : p("papel.quem", { name: o, papel: i });
    return `<div class="sel-line papel-quem">${vt("amigo")}<span>${n}</span></div>`;
  }
  hp(t, s) {
    const a = Math.max(0, Math.min(1, t / s));
    return `<div class="hp" title="${p("info.hp")} ${Math.max(0, t)}/${s}"><i style="width:${Math.round(a * 100)}%" class="${a > 0.6 ? "ok" : a > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const s = this.world;
    for (let a = 0; a < s.top; a++) if (s.isUnit(a) && s.task[a] === jt && s.tgt[a] === t && !s.tgtTile[a]) return !0;
    return !1;
  }
  // ── cartão de comandos ──
  missing(t) {
    const s = this.world.players[this.me].res;
    return bs.find((a) => s[a] < (t[a] ?? 0) * 100);
  }
  whyCost(t) {
    const s = this.missing(t);
    return s ? p("why.cost", { res: p(`res.${s}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, s = this.me, a = t.players[s], i = [...this.selected].filter((y) => t.alive[y]), o = i.filter((y) => t.isUnit(y) && t.owner[y] === s && ra(t, this.papel, y)), n = o.filter((y) => t.kind[y] === pt.villager), r = this.papel === "combate", l = [];
    if (o.length) {
      if (this.cardMode === "build" && n.length) {
        l.push({ id: "btn-voltar-comandos", ic: "back", label: p("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const y of ct) if (y.buildable && y.era <= a.era + 1 && !this.trocada(y.key, a.era)) {
          const M = y.era > a.era ? p("why.era", { era: p(`era.${y.era}.in`) }) : this.whyCost(y.cost), v = this.bldName(y.key, a.era);
          l.push({ data: ["construir", y.key], ic: y.key, label: v, tip: { name: v, desc: this.bldDesc(y.key, a.era) }, cost: y.cost, why: M, act: () => this.act.startPlace(y.key) });
        }
        return l;
      }
      if (n.length && l.push({ id: "btn-construir", ic: "build", label: p("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const y = n.every((M) => t.foodMode[M] > 0);
        l.push({ id: "btn-buscar-comida", ic: "food", label: p("cmd.food"), tip: { name: p("cmd.food"), desc: p(y ? "cmd.food.off" : "cmd.food.d") }, pressed: y, act: () => this.act.food(!y) });
      }
      return l.push({ id: "btn-parar", ic: "stop", label: p("cmd.stop"), act: () => this.act.stop() }), l;
    }
    if (i.length !== 1 || !t.isBuilding(i[0]) || t.owner[i[0]] !== s) return l;
    const c = i[0], h = t.bdef(c), f = t.done[c] === 1, d = a.era;
    if (!f) return l;
    const u = ho(h, d), g = t.pop(s), b = t.popCap(s);
    let k = 0;
    for (let y = 0; y < t.top; y++) if (t.isBuilding(y) && t.owner[y] === s)
      for (const M of t.queue[y]) M < ce && (k += W[M].pop);
    for (const y of u) {
      if (r && !vo(y)) continue;
      const M = W[pt[y]], v = t.queue[c], z = v.length >= 5 ? p("why.queue") : this.whyCost(M.cost) ?? (g + k + M.pop > b ? p(b >= this.world.limiteEra(d) ? "why.popEra" : "why.pop") : void 0);
      l.push({ data: ["treinar", y], ic: y, label: p(`unit.${y}`), tip: { name: p(`unit.${y}`), desc: p(`unit.${y}.d`) }, vs: y, cost: M.cost, why: z, badge: v.filter((N) => N === pt[y]).length, act: () => this.act.train(c, y) });
    }
    for (const y of r ? [] : h.research ?? []) {
      const M = Wa[y], v = os[M], z = t.queue[c];
      if (t.hasTech(s, y)) continue;
      const N = t.techQueued(s, M) ? p("why.techQueued") : v.needs && !t.hasTech(s, v.needs) ? p("why.needs", { tech: p(`tech.${v.needs}`) }) : z.length >= 5 ? p("why.queue") : this.whyCost(v.cost);
      l.push({ data: ["pesquisar", y], ic: y, label: `${p(`tech.${y}`)}: ${p(`tech.${y}.d`)}`, tip: { name: p(`tech.${y}`), desc: p(`tech.${y}.d`) }, cost: v.cost, why: N, act: () => this.act.research(c, y) });
    }
    if (h.market && !r) {
      const y = t.fair ? Re.fair : Re.get;
      for (const M of ns) l.push({ data: ["dar", M], ic: M, label: p("trade.give", { res: p(`res.${M}`).toLowerCase() }), short: p("trade.giveShort"), pressed: this.give === M, act: () => {
        this.give = M;
      } });
      for (const M of ns) if (M !== this.give) {
        const v = a.res[this.give] < Re.give * 100 ? p("why.trade", { res: p(`res.${this.give}`).toLowerCase() }) : void 0;
        l.push({ data: ["receber", M], ic: M, label: (t.fair ? p("trade.fair") + " " : "") + p("trade.get", { n: y, res: p(`res.${M}`).toLowerCase() }), short: `+${y}`, cost: { [this.give]: Re.give }, why: v, act: () => this.act.trade(c, this.give, M) });
      }
    }
    if (t.queue[c].length && (!r || Yi(h.key)) && l.push({ id: "btn-cancelar-fila", ic: "cancel", label: p("cmd.cancelQueue"), act: () => this.act.cancelQueue(c) }), h.key === "center" && !r)
      if (a.aging > 0) l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.aging", { era: p(`era.${d + 1}.to`) }), why: p("why.ageBusy"), prog: () => 1 - a.aging / (Ke[d].time * 10), act: () => {
      } });
      else if (d < Nn) {
        const y = t.eraBuildingTypes(s), M = Ke[d];
        l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), tip: { name: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), desc: p("help.l4") }, cost: M.cost, why: y < 2 ? p("why.age", { n: y }) : this.whyCost(M.cost), act: () => this.act.ageUp(c) });
      } else l.push({ id: "btn-avancar-era", ic: "ageup", label: p("cmd.ageup", { era: p(`era.${d + 1}.to`) }), why: p("why.maxEra"), act: () => {
      } });
    return u.length && !r && l.push({ id: "btn-ponto-reuniao", ic: "rally", label: p("cmd.rally"), tip: { name: p("cmd.rally"), desc: p("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(c) }), l;
  }
  refresh() {
    this.sigCard = "", this.slow = 0;
  }
  renderCard() {
    const t = [...this.selected].filter((n) => this.world.alive[n]), s = t.slice(0, 4).join(",");
    s !== this.cardFor && (this.cardFor = s, this.cardMode = "main");
    const a = this.buttons(), i = a.map((n) => `${n.id ?? n.data?.join("=")}|${n.label}|${n.why ?? ""}|${n.badge ?? ""}|${n.pressed ?? ""}`).join(";") + qe();
    if (i === this.sigCard) {
      this.btns = a;
      return;
    }
    this.sigCard = i, this.btns = a;
    const o = this.$.cmd;
    o.hidden = a.length === 0, o.innerHTML = a.map((n, r) => {
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, c = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${Kt(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${Ge(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${Kt(n.label)}</span>${n.short ? `<span class="cb-s">${Kt(n.short)}</span>` : ""}${c}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
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
    const t = this.world, s = t.players[this.me];
    this.progs = [], this.root.querySelectorAll("[data-p]").forEach((a) => {
      const [i, o] = (a.dataset.p ?? "").split(":"), n = Number(o);
      let r = null;
      i === "aging" || i === "btn" ? r = () => s.aging > 0 ? 1 - s.aging / (Ke[Math.min(s.era, Ke.length - 1)].time * 10) : 0 : i === "season" ? r = () => t.tick % 1800 / 1800 : i === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : i === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= ce ? os[l - ce].time : W[l].time) * 10);
      }), r && this.progs.push({ el: a, f: r });
    });
  }
};
// ── dica dos ícones ──
m(ni, "TIP_SEL", ".cb, .qi, .sel-icons button, .sel .vs-i, .r, .era-chip, .cal, .tools button, .quick button");
let Ji = ni;
class Wh {
  constructor(t, s, a, i) {
    m(this, "ctx");
    m(this, "base");
    m(this, "img");
    m(this, "t", 1);
    /** partida online (M6): o sinal de um aliado, um círculo piscando por 6 s */
    m(this, "marcas", []);
    m(this, "metalOn", !1);
    this.world = s, this.me = a, this.cam = i;
    const o = s.size;
    t.width = t.height = o, this.ctx = t.getContext("2d"), this.base = this.ctx.createImageData(o, o), this.img = this.ctx.createImageData(o, o);
    const n = s.map, r = this.base.data;
    for (let h = 0; h < o; h++) for (let f = 0; f < o; f++) {
      const d = h * o + f, u = n.terrain[d], g = n.heights[Math.round(h / n.hstep) * n.hn + Math.round(f / n.hstep)];
      let b = [104, 150, 72];
      if (u === ss) b = [46, 104, 128];
      else if (u === ks) b = [86, 150, 160];
      else if (u === Ga) b = [205, 186, 140];
      else if (u === Qe || u === Fe && g > li - 0.3) b = [140, 135, 125];
      else {
        const k = Math.max(0, Math.min(1, (g - 1) / 12));
        b = [104 + k * 30, 150 - k * 10, 72 + k * 20];
      }
      n.tree[d] && (b = [52, 92, 50]), r.set([b[0], b[1], b[2], 255], d * 4);
    }
    for (const h of n.res) {
      const f = h.kind === ie ? [200, 60, 70] : h.kind === Le ? [215, 210, 200] : h.kind === $e ? [90, 190, 160] : [255, 255, 255];
      h.kind === $e || !s.resKind[h.z * o + h.x] || this.base.data.set([f[0], f[1], f[2], 255], (h.z * o + h.x) * 4);
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
  marcar(t, s, a) {
    this.marcas.push({ x: t, z: s, cor: a, ate: performance.now() + 6e3 }), this.marcas.length > 6 && this.marcas.shift(), this.t = 1;
  }
  /** árvore cortada ou pedra acabada: vira chão no minimapa */
  clearTile(t) {
    this.base.data.set([112, 148, 76, 255], t * 4), this.t = 1;
  }
  update(t, s, a, i) {
    if ((this.t += t) < 0.25) return;
    if (this.t = 0, !this.metalOn && this.world.players[this.me].era >= 2) {
      this.metalOn = !0;
      const u = this.world.size;
      for (const g of this.world.map.res) g.kind === $e && this.world.resKind[g.z * u + g.x] === $e && this.base.data.set([90, 190, 160, 255], (g.z * u + g.x) * 4);
    }
    const o = this.world.size, n = this.base.data, r = this.img.data, l = this.world.vis[this.me], c = this.world.explored[this.me];
    for (let u = 0; u < o * o; u++) {
      const g = !s || l[u] ? 1 : c[u] ? 0.5 : 0.08, b = u * 4;
      r[b] = n[b] * g, r[b + 1] = n[b + 1] * g, r[b + 2] = n[b + 2] * g, r[b + 3] = 255;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const h = this.world;
    for (let u = 0; u < h.top; u++) {
      if (!h.alive[u]) continue;
      const g = h.x[u] / 256, b = h.z[u] / 256, k = h.owner[u] === this.me;
      if (s && !k && !l[Math.floor(b) * o + Math.floor(g)] || h.kind[u] === gt) continue;
      const y = h.kind[u] >= at, M = h.owner[u], v = y ? h.bdef(u).size === 1 ? 2 : 7 : M === Mt ? 2 : 3;
      this.ctx.fillStyle = M === Mt ? "#e8d9b0" : M === de ? "#2f3b27" : h.players[M]?.color ?? "#fff", this.ctx.fillRect(g - v / 2, b - v / 2, v, v), y && v > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(g - v / 2, b - v / 2, v, v));
    }
    const f = performance.now();
    this.marcas = this.marcas.filter((u) => u.ate > f);
    for (const u of this.marcas) {
      const g = 5 + Math.floor(f / 250) % 2 * 2;
      this.ctx.strokeStyle = u.cor, this.ctx.lineWidth = 2.5, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, g, 0, Math.PI * 2), this.ctx.stroke(), this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.beginPath(), this.ctx.arc(u.x, u.z, g + 2, 0, Math.PI * 2), this.ctx.stroke();
    }
    const d = [[0, 0], [a, 0], [a, i], [0, i]].map(([u, g]) => this.cam.ground(u, g, a, i));
    d.every((u) => u) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), d.forEach((u, g) => g ? this.ctx.lineTo(u.x, u.z) : this.ctx.moveTo(u.x, u.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class Gh {
  constructor(t, s, a, i, o, n) {
    m(this, "selected", /* @__PURE__ */ new Set());
    /** papel no jogo com um amigo (D31): só seleciona em grupo e só manda no que é do papel; null = tudo */
    m(this, "papel", null);
    m(this, "pointers", /* @__PURE__ */ new Map());
    m(this, "gesture", "none");
    m(this, "longTimer", 0);
    m(this, "lastTap", { t: 0, x: 0, y: 0 });
    m(this, "keys", /* @__PURE__ */ new Set());
    m(this, "v", new St());
    m(this, "v2", new St());
    m(this, "right", new St());
    m(this, "ac", new AbortController());
    this.canvas = t, this.world = s, this.me = a, this.cam = i, this.box = o, this.hooks = n;
    const r = { signal: this.ac.signal };
    t.addEventListener("pointerdown", (l) => this.down(l), r), t.addEventListener("pointermove", (l) => this.move(l), r), t.addEventListener("pointerup", (l) => this.up(l), r), t.addEventListener("pointercancel", (l) => this.cancel(l), r), t.addEventListener("contextmenu", (l) => l.preventDefault(), r), t.addEventListener("wheel", (l) => {
      l.preventDefault(), this.cam.tdist *= Math.exp(l.deltaY * 12e-4), this.hooks.onInteract();
    }, { passive: !1, signal: this.ac.signal }), addEventListener("keydown", (l) => this.key(l), r), addEventListener("keyup", (l) => this.keys.delete(l.key.toLowerCase()), r), addEventListener("blur", () => this.keys.clear(), r);
  }
  manda(t) {
    return ra(this.world, this.papel, t);
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
    const s = this.pointers.get(t.pointerId);
    if (!s) {
      if (t.pointerType === "mouse" && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      }
      return;
    }
    const a = t.clientX - s.x, i = t.clientY - s.y, o = Math.hypot(t.clientX - s.sx, t.clientY - s.sy);
    if (this.gesture === "draw") {
      const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("move", n.x, n.z), s.x = t.clientX, s.y = t.clientY;
      return;
    }
    if (this.gesture === "none" && this.pointers.size === 1 && this.hooks.mode() === "place" && this.hooks.drawing() && (s.type !== "mouse" || s.button === 0) && o > (s.type === "mouse" ? 6 : 10)) {
      this.gesture = "draw", clearTimeout(this.longTimer);
      const n = this.cam.ground(s.sx, s.sy, this.W, this.H), r = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
      n && this.hooks.onDraw("start", n.x, n.z), r && this.hooks.onDraw("move", r.x, r.z), s.x = t.clientX, s.y = t.clientY;
      return;
    }
    if (this.gesture === "pinch" && this.pointers.size === 2) {
      const n = [...this.pointers.entries()].find(([f]) => f !== t.pointerId)[1], r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.hypot(t.clientX - n.x, t.clientY - n.y);
      l > 10 && r > 10 && (this.cam.tdist *= r / l);
      const c = Math.atan2(s.y - n.y, s.x - n.x), h = Math.atan2(t.clientY - n.y, t.clientX - n.x);
      this.cam.tyaw += Math.atan2(Math.sin(h - c), Math.cos(h - c)), this.cam.pan(a * 0.5, i * 0.5, this.H);
    } else if (this.gesture === "rotate")
      this.cam.tyaw -= a * 6e-3;
    else if (s.type === "mouse")
      if (s.button === 0 && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      } else s.button === 0 && (this.gesture === "box" || o > 6) && (this.gesture = "box", this.drawBox(s, t));
    else
      this.gesture === "none" && this.hooks.mode() === "normal" && o > 10 && performance.now() - s.t >= 380 && Math.hypot(s.x - s.sx, s.y - s.sy) < 10 && (this.gesture = "box"), this.gesture === "box" ? this.drawBox(s, t) : (this.gesture === "pan" || o > 10) && (this.gesture = "pan", clearTimeout(this.longTimer), this.cam.pan(a, i, this.H));
    s.x = t.clientX, s.y = t.clientY;
  }
  up(t) {
    const s = this.pointers.get(t.pointerId);
    if (this.pointers.delete(t.pointerId), clearTimeout(this.longTimer), !s) return;
    if (this.gesture === "pinch") {
      this.pointers.size === 0 && (this.gesture = "none");
      return;
    }
    if (this.gesture === "draw") {
      this.endDraw(t.clientX, t.clientY);
      return;
    }
    if (this.gesture === "box") {
      this.selectBox(s.sx, s.sy, t.clientX, t.clientY, t.shiftKey), this.hideBox(), this.gesture = "none";
      return;
    }
    if (this.gesture === "pan" || this.gesture === "rotate") {
      this.gesture = "none";
      return;
    }
    this.gesture = "none";
    const a = t.clientX, i = t.clientY, o = this.hooks.mode(), n = performance.now(), r = n - this.lastTap.t < 320 && Math.hypot(a - this.lastTap.x, i - this.lastTap.y) < 30;
    if (this.lastTap = { t: n, x: a, y: i }, s.type === "mouse") {
      if (s.button === 2) {
        if (o === "place") {
          this.hooks.onCancel();
          return;
        }
        const d = this.cam.ground(a, i, this.W, this.H);
        if (!d) return;
        if (o === "rally" || o === "sinal" || this.singleOwnBuilding() >= 0) {
          this.hooks.onRally(d.x, d.z);
          return;
        }
        this.ownUnitsSelected() && this.hooks.onCommand(this.target(a, i, d));
      } else if (s.button === 0) {
        if (o === "place") {
          const d = this.cam.ground(a, i, this.W, this.H);
          if (this.hooks.drawing()) {
            d && this.hooks.onDraw("tap", d.x, d.z);
            return;
          }
          d && this.hooks.onPlaceAt(d.x, d.z), this.hooks.onPlaceConfirm(t.shiftKey);
          return;
        }
        if (o === "rally" || o === "sinal") {
          const d = this.cam.ground(a, i, this.W, this.H);
          d && this.hooks.onRally(d.x, d.z);
          return;
        }
        this.clickSelect(a, i, t.shiftKey, r);
      }
      return;
    }
    const l = this.cam.ground(a, i, this.W, this.H);
    if (o === "place") {
      l && (this.hooks.drawing() ? this.hooks.onDraw("tap", l.x, l.z) : this.hooks.onPlaceAt(l.x, l.z));
      return;
    }
    if (o === "rally" || o === "sinal") {
      l && this.hooks.onRally(l.x, l.z);
      return;
    }
    const c = this.target(a, i, l), h = this.world, f = this.ownUnitsSelected();
    if (c.kind === "unit" && h.owner[c.e] === this.me && h.kind[c.e] !== gt && this.manda(c.e)) {
      this.clickSelect(a, i, !1, r);
      return;
    }
    if (c.kind === "building" && h.owner[c.e] === this.me) {
      const d = !h.done[c.e] || ct[h.kind[c.e] - at].walk;
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
    this.pointers.delete(t.pointerId), clearTimeout(this.longTimer), this.hideBox(), this.gesture === "draw" && this.endDraw(), this.gesture = "none";
  }
  /** fim de um traço do muro (o que foi desenhado fica) */
  endDraw(t, s) {
    this.gesture = "none";
    const a = t !== void 0 && s !== void 0 ? this.cam.ground(t, s, this.W, this.H) : null;
    this.hooks.onDraw("end", a?.x ?? -1, a?.z ?? -1);
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
  seen(t, s, a = !1) {
    if (!this.hooks.fogOn()) return !0;
    const i = this.world.size, o = Math.floor(t), n = Math.floor(s);
    return o < 0 || n < 0 || o >= i || n >= i ? !1 : (a ? this.world.explored : this.world.vis)[this.me][n * i + o] === 1;
  }
  /** pessoa, animal ou caça mais perto do ponto da tela */
  pickUnit(t, s, a) {
    const i = this.world, o = this.lastTouch ? 34 : 24;
    let n = -1, r = o * o;
    for (let l = 0; l < i.top; l++) {
      if (!i.alive[l] || i.kind[l] >= at) continue;
      const c = i.owner[l] === this.me;
      if (a && !c) continue;
      const h = i.x[l] / 256, f = i.z[l] / 256;
      if (!c && !this.seen(h, f) || (this.cam.toScreen(h, mt(i.map, h, f) + (i.kind[l] === gt ? 0.2 : 0.6), f, this.W, this.H, this.v), !this.v.z)) continue;
      const d = (this.v.x - t) ** 2 + (this.v.y - s) ** 2;
      d < r && (r = d, n = l);
    }
    return [n, Math.sqrt(r)];
  }
  get lastTouch() {
    for (const t of this.pointers.values()) return t.type !== "mouse";
    return matchMedia("(pointer: coarse)").matches;
  }
  /** construção sob o ponto da tela (pelo tamanho dela na tela) */
  pickBuilding(t, s) {
    const a = this.world;
    let i = -1, o = 1;
    this.right.set(1, 0, 0).applyQuaternion(this.cam.cam.quaternion);
    for (let n = 0; n < a.top; n++) {
      if (!a.isBuilding(n)) continue;
      const r = a.x[n] / 256, l = a.z[n] / 256;
      if (a.owner[n] !== this.me && !this.seen(r, l, !0)) continue;
      const c = ct[a.kind[n] - at].size, h = mt(a.map, r, l) + (c >= 3 ? 0.7 : 0.5);
      if (this.cam.toScreen(r, h, l, this.W, this.H, this.v), !this.v.z) continue;
      this.cam.toScreen(r + this.right.x * c * 0.55, h, l + this.right.z * c * 0.55, this.W, this.H, this.v2);
      const f = Math.max(18, Math.hypot(this.v2.x - this.v.x, this.v2.y - this.v.y)), d = Math.hypot(this.v.x - t, this.v.y - s) / f;
      d < o && (o = d, i = n);
    }
    return [i, o];
  }
  /** árvore, arbusto ou pedra perto do ponto (a copa de uma árvore cobre o chão atrás dela) */
  pickTile(t, s, a) {
    const i = this.world, o = i.size, n = Math.floor(a.x), r = Math.floor(a.z), l = this.lastTouch ? 36 : 28;
    let c = -1, h = l * l;
    for (let f = -3; f <= 2; f++) for (let d = -3; d <= 3; d++) {
      const u = n + d, g = r + f;
      if (u < 0 || g < 0 || u >= o || g >= o) continue;
      const b = g * o + u, k = i.map.tree[b] > 0;
      if (!(!(k || i.resKind[b]) || i.resAmt[b] <= 0 || !i.explored[this.me][b]) && !(i.resKind[b] === 3 && i.players[this.me].era < 2))
        for (const y of k ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(u + 0.5, mt(i.map, u + 0.5, g + 0.5) + y, g + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const M = (this.v.x - t) ** 2 + (this.v.y - s) ** 2;
          M < h && (h = M, c = b);
        }
    }
    return c;
  }
  /** o que está sob o ponto da tela */
  target(t, s, a = this.cam.ground(t, s, this.W, this.H)) {
    const i = this.world, o = a?.x ?? 0, n = a?.z ?? 0, [r, l] = this.pickUnit(t, s, !1), [c, h] = this.pickBuilding(t, s);
    if (r >= 0 && (c < 0 || l < 14 || h > 0.75)) return { kind: "unit", e: r, k: -1, x: i.x[r] / 256, z: i.z[r] / 256 };
    if (c >= 0) return { kind: "building", e: c, k: -1, x: i.x[c] / 256, z: i.z[c] / 256 };
    if (a) {
      const f = this.pickTile(t, s, a);
      if (f >= 0) return { kind: "tile", e: -1, k: f, x: f % i.size + 0.5, z: Math.floor(f / i.size) + 0.5 };
    }
    return { kind: "ground", e: -1, k: -1, x: o, z: n };
  }
  clickSelect(t, s, a, i) {
    const o = this.world, n = this.target(t, s, null), r = n.kind === "unit" ? n.e : -1;
    if (a && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && o.owner[r] === this.me && o.kind[r] !== gt && this.manda(r)) {
      if (a || this.selected.clear(), i) {
        const l = o.kind[r];
        for (let c = 0; c < o.top; c++) if (o.isUnit(c) && o.owner[c] === this.me && o.kind[c] === l && this.manda(c)) {
          const h = o.x[c] / 256, f = o.z[c] / 256;
          this.cam.toScreen(h, mt(o.map, h, f), f, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(c);
        }
      } else a && this.selected.has(r) ? this.selected.delete(r) : this.selected.add(r);
      this.hooks.onSelect();
      return;
    }
    if (n.kind === "unit" || n.kind === "building") {
      this.only(n.e);
      return;
    }
    !a && this.selected.size && (this.selected.clear(), this.hooks.onSelect());
  }
  selectBox(t, s, a, i, o) {
    const n = this.world, r = Math.min(t, a), l = Math.max(t, a), c = Math.min(s, i), h = Math.max(s, i);
    (!o || !this.ownUnitsSelected()) && this.selected.clear();
    for (let f = 0; f < n.top; f++) {
      if (!n.isUnit(f) || n.owner[f] !== this.me || !this.manda(f)) continue;
      const d = n.x[f] / 256, u = n.z[f] / 256;
      this.cam.toScreen(d, mt(n.map, d, u) + 0.5, u, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= c && this.v.y <= h && this.selected.add(f);
    }
    this.hooks.onSelect();
  }
  drawBox(t, s) {
    const a = this.box;
    if (a.style.display = "block", !t || !s) {
      const i = [...this.pointers.values()][0];
      if (!i) return;
      a.style.left = i.sx + "px", a.style.top = i.sy + "px", a.style.width = a.style.height = "2px";
      return;
    }
    a.style.left = Math.min(t.sx, s.clientX) + "px", a.style.top = Math.min(t.sy, s.clientY) + "px", a.style.width = Math.abs(s.clientX - t.sx) + "px", a.style.height = Math.abs(s.clientY - t.sy) + "px";
  }
  hideBox() {
    this.box.style.display = "none";
  }
  /** teclado: WASD/setas movem, Q/E giram, +/- zoom */
  update(t) {
    const s = this.keys;
    let a = 0, i = 0;
    const o = 900 * t;
    (s.has("a") || s.has("arrowleft")) && (a += o), (s.has("d") || s.has("arrowright")) && (a -= o), (s.has("w") || s.has("arrowup")) && (i += o), (s.has("s") || s.has("arrowdown")) && (i -= o), (a || i) && (this.cam.pan(a, i, this.H), this.hooks.onInteract()), s.has("q") && (this.cam.tyaw += t * 1.6), s.has("e") && (this.cam.tyaw -= t * 1.6), (s.has("+") || s.has("=")) && (this.cam.tdist *= 1 - t * 1.2), s.has("-") && (this.cam.tdist *= 1 + t * 1.2);
  }
}
const la = (() => {
  const e = "956be08";
  return /^[0-9a-f]{7}$/.test(e) ? parseInt(e, 16) : 0;
})(), xr = new URLSearchParams(location.search), Mr = xr.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`, zr = Mr.replace(/^ws/, "http"), Vh = !location.pathname.startsWith("/jogar/") && !xr.get("online"), Ne = /^[A-HJ-NP-Z2-9]{4}$/, pn = (e) => e.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 4);
let Kh = null;
function Yh() {
  return Vh ? Promise.resolve(!1) : Kh ?? (Kh = fetch(zr + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class ca {
  // já entrou na sala alguma vez
  constructor(t, s) {
    m(this, "codigo", "");
    m(this, "parceiro", "");
    m(this, "ws", null);
    m(this, "fechado", !1);
    m(this, "caiuEm", 0);
    m(this, "conectou", !1);
    this.papel = t, this.on = s;
  }
  /** o anfitrião abre a sala: pede um código ao servidor e entra nela */
  static async convidar(t) {
    const s = await fetch(zr + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!s.ok) throw new Error(s.status === 401 ? "conta" : "rede");
    const { codigo: a } = await s.json();
    if (!Ne.test(a)) throw new Error("rede");
    const i = new ca("anfitriao", t);
    return i.codigo = a, i.abrir(), i;
  }
  /** o amigo entra com o código */
  static entrar(t, s) {
    const a = new ca("convidado", s);
    return a.codigo = t, a.abrir(), a;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${Mr}/sala/${this.codigo}?modo=${this.papel === "anfitriao" ? "criar" : "entrar"}`);
    } catch {
      this.caiu();
      return;
    }
    this.ws = t, t.onmessage = (s) => {
      this.ws === t && typeof s.data == "string" && this.receber(s.data);
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
    let s;
    try {
      s = JSON.parse(t);
    } catch {
      return;
    }
    const a = typeof s.nome == "string" ? s.nome : "";
    switch (s.t) {
      case "ok": {
        const i = this.caiuEm > 0;
        this.caiuEm = 0, this.conectou = !0, this.papel === "convidado" ? (this.parceiro = a, this.on(i ? { t: "reconectou", sozinho: !1 } : { t: "oi", nome: a })) : this.on(i ? { t: "reconectou", sozinho: s.amigo === "" } : { t: "codigo", codigo: this.codigo });
        break;
      }
      case "entrou":
        this.parceiro = a, this.on({ t: "entrou", nome: a });
        break;
      case "saiu":
        this.on({ t: "saiu", nome: a });
        break;
      case "c":
        this.on({ t: "ordem", d: s.d });
        break;
      case "r":
        this.on({ t: "pede" });
        break;
      case "s":
        this.on({ t: "jogo", v: Number(s.v), d: s.d });
        break;
      case "t":
        this.on({ t: "turno", d: s.d });
        break;
      case "p":
        this.on({ t: "pausa", on: Array.isArray(s.d) && s.d[0] === 1, papel: Array.isArray(s.d) && typeof s.d[1] == "number" ? s.d[1] : 0 });
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
        this.fechar(), this.on({ t: "erro", msg: typeof s.msg == "string" ? s.msg : "" });
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
    this.enviar(`{"t":"s","v":${la},"d":${t}}`);
  }
  /** anfitrião: pausou ou voltou ao jogo; junto vai o papel do amigo (D31: 0 sem papel, 1 Logística, 2 Combate) */
  pausa(t, s = 0) {
    this.enviar(JSON.stringify({ t: "p", d: [t ? 1 : 0, s] }));
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
const mn = "origines_opts", Gt = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class Xh {
  // partida online
  constructor(t) {
    m(this, "root");
    m(this, "screen", null);
    m(this, "rivals", 3);
    m(this, "diff", 1);
    m(this, "regras", "normal");
    m(this, "dicaRegras", null);
    // a explicação aberta (segurou o botão)
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
      const s = JSON.parse(localStorage.getItem(mn) ?? "{}");
      s.rivals >= 1 && s.rivals <= 3 && (this.rivals = s.rivals), s.diff >= 0 && s.diff <= 2 && (this.diff = s.diff), s.regras === "beta" && (this.regras = "beta");
    } catch {
    }
    gr(() => this.render());
  }
  get open() {
    return this.screen !== null;
  }
  get kind() {
    return this.screen?.k ?? null;
  }
  /** a tela inicial; se ela já está aberta (a conta mudou, por exemplo), continua no mesmo passo */
  showStart(t) {
    const s = this.screen?.k === "start" ? this.screen.step : "main";
    this.screen = { k: "start", info: t, step: s }, this.render();
  }
  /** a nuvem respondeu depois: atualiza a tela inicial sem tirar a pessoa do passo em que está */
  updateStart(t) {
    this.screen?.k === "start" && (this.screen.info = t, this.render());
  }
  /** owner: a conta dona do jogo ('' sem conta); acc: a conta em que a pessoa está agora */
  showPause(t, s, a, i, o = !1) {
    this.screen = { k: "pause", minutes: t, quality: s, saved: "", owner: a, acc: i, beta: o }, this.render();
  }
  /** a conta mudou (entrou, saiu ou o jogo passou para a conta): redesenha a pausa */
  updatePause(t, s, a) {
    this.screen?.k === "pause" && (this.screen.owner = t, this.screen.acc = s, a && (this.screen.saved = a), this.render());
  }
  showEnd(t, s, a, i) {
    this.screen = { k: "end", result: t, minutes: s, era: a, online: i }, this.render();
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
  setAmigoMsg(t, s = !1) {
    this.amigoMsg = t, this.amigoBusy = s;
    const a = this.root.querySelector("#amigo-msg");
    a && (a.textContent = t);
    const i = this.root.querySelector("#btn-entrar-codigo");
    i && (i.disabled = s || !Ne.test(this.codigo));
  }
  /** abre a tela inicial já no passo "Entrar no jogo de um amigo" (depois de um erro, por exemplo) */
  showStartAmigo(t) {
    this.screen = { k: "start", info: t, step: "amigo" }, this.render();
  }
  /** o menu de quem está no jogo de um amigo */
  showGuest(t, s, a = null) {
    this.screen = { k: "guest", nome: t, quality: s, papel: a }, this.render();
  }
  showInfo(t, s) {
    this.screen = { k: "info", titulo: t, texto: s }, this.render();
  }
  // ── partida online (M6) ──
  /** o servidor da partida online respondeu: "Jogar online" aparece */
  setOnlineDisponivel(t) {
    t !== this.onlineOn && (this.onlineOn = t, this.screen?.k === "start" && this.render());
  }
  /** a mensagem de baixo nas telas da partida online (criando, entrando, erro…) e se está esperando a resposta */
  setPartidaMsg(t, s = !1) {
    this.partidaMsg = t, this.partidaBusy = s;
    const a = this.root.querySelector("#partida-msg");
    a && (a.textContent = t);
    const i = this.root.querySelector("#btn-entrar-partida");
    i && (i.disabled = s || !Ne.test(this.codigoPartida));
    const o = this.root.querySelector("#btn-criar-partida");
    o && (o.disabled = s);
  }
  /** a tela inicial no passo "Jogar online" (depois de um erro, ou ao sair de uma partida) */
  showStartOnline(t) {
    this.screen = { k: "start", info: t, step: "online" }, this.render();
  }
  showLobby(t) {
    this.screen?.k !== "lobby" && (this.vagaEscolhida = -1), this.screen = { k: "lobby", sala: t }, this.partidaBusy = !1, this.render();
  }
  showOnline(t, s) {
    this.screen = { k: "online", quality: t, anfitriao: s }, this.render();
  }
  showOlhar(t) {
    this.screen = { k: "olhar", timeVivo: t }, this.render();
  }
  /** regras (D34): um toque escolhe; segurar mostra o que a regra tem e o que muda (fica aberto até o próximo toque) */
  segurarRegras(t) {
    const s = this.root.querySelector("#regras-tip");
    if (!s) return;
    const a = (n) => {
      this.dicaRegras = n, s.innerHTML = this.textoRegras(n), s.hidden = !1;
    };
    let i = 0, o = !1;
    this.root.querySelectorAll("[data-regras]").forEach((n) => {
      const r = n.dataset.regras;
      n.onpointerdown = () => {
        o = !1, clearTimeout(i), i = window.setTimeout(() => {
          o = !0, a(r);
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
    const s = t === "beta" ? [1, 2, 3, 4, 5] : [1, 2, 3];
    return `<p class="acct-k">${p(`regras.${t}.t`)}</p><ul>${s.map((a) => `<li>${p(`regras.${t}.l${a}`)}</li>`).join("")}</ul>`;
  }
  /** a sala de espera: as vagas com a cor de cada tribo; no 2 contra 2, em dois times */
  vagas(t, s) {
    const a = Za[t.modo] ?? Za[1], i = (n) => {
      const r = t.vagas[n] ?? "", l = n === t.eu;
      return `<button data-vaga="${n}" class="vaga${r ? "" : " cpu"}" style="--cor:${uo[n]}" aria-pressed="${this.vagaEscolhida === n}"${s ? "" : ' tabindex="-1"'}><i class="cor" aria-hidden="true"></i><span>${r ? Gt(r) : p("sala.computador")}</span>${l ? `<small>${p("sala.voce")}</small>` : ""}</button>`;
    }, o = Array.from({ length: a.vagas }, (n, r) => r);
    return t.modo !== 2 ? `<div class="vagas">${o.map(i).join("")}</div>` : `<div class="vagas times">${[0, 1].map((n) => `<div class="time"><p class="acct-k">${p("sala.time", { n: n + 1 })}</p>${o.filter((r) => a.times[r] === n).map(i).join("")}</div>`).join("")}</div>`;
  }
  /** na pausa do anfitrião: convidar um amigo, o código e quem está jogando junto */
  pauseFriend(t) {
    if (!this.amigoOn || t === "off" || t === "loading") return "";
    const s = this.convite, a = (o) => `<b>${Gt(o)}</b>`;
    if (!t.logado) return `<p class="muted small">${p("amigo.semConta")}</p>`;
    if ((!s || s.estado === "erro") && this.escolhendoPapel) {
      const o = (n, r) => `<button id="btn-papel-${n}" class="big papel">${vt(r)}<span>${p(`papel.${n}`)}<small>${p(`papel.${n}.d`)}</small></span></button>`;
      return `<div class="acct on papeis"><p class="acct-l">${p("papel.pergunta")}</p><p class="acct-s">${p("papel.regra")}</p>${o("logistica", "villager")}${o("combate", "army")}<button id="btn-papel-voltar" class="link">${p("papel.voltar")}</button></div>`;
    }
    if (!s || s.estado === "erro") return `${s ? `<p class="saved fail">${p("amigo.erroCriar")}</p>` : ""}<button id="btn-convidar-amigo" class="big">${vt("amigo")}<span>${p("amigo.convidar")}</span></button><p class="muted small">${p("amigo.convidar.d")}</p>`;
    if (s.estado === "criando") return `<p class="muted">${p("amigo.criando")}</p>`;
    const i = s.papel ? `<p class="acct-s papeis-l">${p("papel.dele", { papel: a(p(`papel.${s.papel}`)) })} · ${p("papel.seu", { papel: a(p(`papel.${ui(s.papel)}`)) })}</p>` : "";
    return `<div class="acct on convite"><p class="acct-k">${p("amigo.codigo")}</p><p class="codigo" aria-label="${Gt((s.codigo ?? "").split("").join(" "))}">${Gt(s.codigo ?? "")}</p>
      ${s.estado === "junto" ? `<p class="acct-l">${p("amigo.jogando", { name: a(s.nome ?? "") })}</p>` : `<p class="acct-s">${p("amigo.instrucoes")}</p><p class="acct-l">${p("amigo.esperando")}</p>`}
      ${i}${s.papel ? `<button id="btn-trocar-papeis" class="acct-btn">${p("papel.trocar")}</button>` : ""}
      <button id="btn-encerrar-convite" class="acct-btn">${p("amigo.encerrar")}</button></div>`;
  }
  soundRows() {
    return ["music", "sfx", "amb"].map((t) => `<div class="opt"><div class="opt-l">${p(`snd.${t}`)}</div><div class="seg">${[0, 1, 2, 3].map((s) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[t]}="${s}" aria-pressed="${K.opts[t] === s}">${p(`snd.l${s}`)}</button>`).join("")}</div></div>`).join("");
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${p("lang.label")}"><button id="btn-idioma-en" aria-pressed="${qe() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${qe() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, s) {
    if (s === "off" || s === "loading") return "";
    const a = s.logado ? s.apelido ?? "" : "", i = (n) => `<b>${Gt(n)}</b>`, o = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${p("acct.pauseLogin")}</button>`;
    return t && t === a ? `<div class="acct on small"><p class="acct-l">${p("acct.pauseAccount", { name: i(a) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${p("acct.pauseOther", { name: i(t) })}</p>${a ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${p("acct.switch")}</button>` : o}</div>` : a ? `<div class="acct on small"><p class="acct-l">${p("acct.pauseAdopt", { name: i(a) })}</p></div>` : `<div class="acct small"><p class="acct-l">${p("acct.pauseNone")}</p>${o}</div>`;
  }
  render() {
    const t = this.screen, s = this.root;
    if (s.dataset.open = String(!!t), s.dataset.screen = t?.k ?? "", !t) {
      s.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: r, save: l, other: c } = t.info, h = typeof r == "object" && r.logado ? r.apelido ?? "" : "", f = (z) => `<b>${Gt(z)}</b>`, d = l ? l.adopt ? p("save.adopt", { name: f(h) }) : h ? p("save.inAccount", { name: f(h) }) : p("save.deviceOnly") : "", u = r === "off" ? "" : r === "loading" ? `<div class="acct"><p class="acct-l">${p("acct.checking")}</p></div>` : r.logado ? `<div class="acct on"><p class="acct-k">${p("acct.yours")}</p><p class="acct-name">${Gt(h)}</p><p class="acct-l">${p(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${p("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${p("acct.none")}</p><p class="acct-l">${p("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>
            ${c ? `<p class="acct-s">${p("acct.otherHint", { name: f(c) })}</p>` : `<p class="acct-s">${p("acct.why")}</p>`}</div>`, g = r !== "loading" && !t.info.pending, b = `${u}
        ${g && l ? `<button id="btn-continuar" class="big primary">${p("menu.continue")}<small>${p("menu.saved", { era: p(`era.${l.meta.era}`), y: l.meta.year, r: l.meta.rivals })}${l.meta.regras === "beta" ? ` · ${p("regras.salvo")}` : ""}</small><small class="where">${d}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${g && l ? "" : " primary"}">${p("menu.new")}</button>
        ${this.amigoOn && r !== "off" ? `<button id="btn-entrar-amigo" class="big">${vt("amigo")}<span>${p("amigo.entrar")}</span></button>` : ""}
        ${this.onlineOn && r !== "off" ? `<button id="btn-jogar-online" class="big">${vt("online")}<span>${p("online.jogar")}</span></button>` : ""}`, k = `<p class="acct-k">${p("online.jogar")}</p>
        ${h ? `<p class="acct-s">${p("online.jogar.d")}</p>
          <button id="btn-criar-partida" class="big primary"${this.partidaBusy ? " disabled" : ""}>${vt("online")}<span>${p("online.criar")}</span></button>
          <p class="acct-l">${p("online.digite")}</p>
          <input id="codigo-partida" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${p("online.digite")}" value="${Gt(this.codigoPartida)}">
          <button id="btn-entrar-partida" class="big"${this.partidaBusy || !Ne.test(this.codigoPartida) ? " disabled" : ""}>${p("online.entrarBtn")}</button>
          <p class="acct-s" id="partida-msg" aria-live="polite">${Gt(this.partidaMsg)}</p>` : `<p class="acct-l">${p("online.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`, y = `<p class="acct-k">${p("amigo.entrar")}</p>
        ${h ? `<p class="acct-l">${p("amigo.digite")}</p>
          <input id="codigo-amigo" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${p("amigo.codigoCampo")}" value="${Gt(this.codigo)}">
          <button id="btn-entrar-codigo" class="big primary"${this.amigoBusy || !Ne.test(this.codigo) ? " disabled" : ""}>${p("amigo.entrarBtn")}</button>
          <p class="acct-s" id="amigo-msg" aria-live="polite">${Gt(this.amigoMsg)}</p>` : `<p class="acct-l">${p("amigo.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${p("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`, v = `${r === "off" ? "" : `<p class="muted small">${h ? p("new.inAccount", { name: f(h) }) : p("new.deviceOnly")}${l && !l.adopt ? " " + p("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${p("menu.rivals")}</div><div class="seg">${[1, 2, 3].map((z) => `<button data-rivais="${z}" aria-pressed="${this.rivals === z}">${z}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map((z) => `<button data-dificuldade="${z}" aria-pressed="${this.diff === z}">${p(`diff.${z}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("regras.label")}</div><div class="seg">${["normal", "beta"].map((z) => `<button data-regras="${z}" aria-pressed="${this.regras === z}" title="${p("regras.segure")}">${p(`regras.${z}`)}</button>`).join("")}</div></div>
        <p class="muted small regras-dica">${p("regras.segure")}</p>
        <div class="regras-tip" id="regras-tip" aria-live="polite"${this.dicaRegras ? "" : " hidden"}>${this.dicaRegras ? this.textoRegras(this.dicaRegras) : ""}</div>
        <button id="btn-comecar" class="big primary">${p("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${p("menu.back")}</button>`;
      s.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${p("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? b : t.step === "amigo" ? y : t.step === "online" ? k : v}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${p(K.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${p(K.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${K.opts.muted}">${vt(K.opts.muted ? "mute" : "sound")}</button><span class="credits">${p("menu.credits")}</span></div>
        ${r === "off" ? `<p class="local">${p("menu.local")}</p>` : ""}</div>`;
    } else if (t.k === "pause")
      s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("pause.title")}</h2><p class="muted">${p("pause.time", { m: t.minutes })}${t.beta ? ` · ${p("regras.naPartida")}` : ""}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <button id="btn-salvar" class="big">${p("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${p({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${Gt(t.owner)}</b>` })}</p>` : ""}
        ${this.pauseFriend(t.acc)}
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${qs.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair">${p("pause.quit")}</button></div>
      </div></div>`;
    else if (t.k === "guest")
      s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("amigo.titulo", { name: Gt(t.nome) })}</h2><p class="muted">${p("amigo.noJogoDe", { name: `<b>${Gt(t.nome)}</b>` })}</p>
        ${t.papel ? `<p class="papel-guest">${p("papel.seuPapel", { papel: `<b>${p(`papel.${t.papel}`)}</b>` })}<br><small>${p(`papel.${t.papel}.d`)}</small></p>` : ""}
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${qs.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair-amigo">${p("amigo.sair")}</button></div>
      </div></div>`;
    else if (t.k === "lobby") {
      const r = t.sala, l = r.eu === r.criador, c = r.vagas.filter(Boolean).length, h = r.vagas[r.criador] ?? "", f = [1, 2, 3, 4].map((u) => `<button data-modo="${u}" aria-pressed="${r.modo === u}">${p(`modo.${u}`)}</button>`).join(""), d = [0, 1, 2].map((u) => `<button data-dif-partida="${u}" aria-pressed="${r.dif === u}">${p(`diff.${u}`)}</button>`).join("");
      s.innerHTML = `<div class="screen lobby"><div class="card panel">
        <h2>${p("sala.titulo")}</h2>
        <div class="acct on convite"><p class="acct-k">${p("sala.codigo")}</p><p class="codigo" aria-label="${Gt(r.codigo.split("").join(" "))}">${Gt(r.codigo)}</p><p class="acct-s">${p("sala.instrucoes")}</p></div>
        ${l ? `<div class="opt"><div class="opt-l">${p("sala.modo")}</div><div class="seg modos">${f}</div></div>
          <div class="opt"><div class="opt-l">${p("sala.dif")}</div><div class="seg">${d}</div></div>` : `<p class="acct-l">${p(`modo.${r.modo}`)} · ${p("sala.dif")}: ${p(`diff.${r.dif}`)}</p>`}
        <p class="muted small">${p(`modo.${r.modo}.d`)}</p>
        ${this.vagas(r, l)}
        ${l ? `<p class="muted small">${p("sala.trocar")}</p><button id="btn-comecar-partida" class="big primary"${c < 2 ? " disabled" : ""}>${p("sala.comecar")}</button>${c < 2 ? `<p class="muted small">${p("sala.precisa")}</p>` : ""}` : `<p class="acct-l">${p("sala.esperando", { name: `<b>${Gt(h)}</b>` })}</p>`}
        <p class="acct-s" id="partida-msg" aria-live="polite">${Gt(this.partidaMsg)}</p>
        <button id="btn-sair-sala" class="link">${p("sala.sair")}</button>
      </div></div>`;
    } else if (t.k === "online")
      s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${p("online.titulo")}</h2><p class="muted">${p(t.anfitriao ? "online.pausadoTodos" : "online.naoPausa")}</p>
        <button id="btn-voltar-jogo" class="big primary">${p("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${p("q.label")}</div><div class="seg">${qs.map((r, l) => `<button data-qualidade="${r.key}" aria-pressed="${t.quality === l}">${p(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${p("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${p("btn.help")}</button><button id="btn-sair-partida">${p("online.sair")}</button></div>
        <p class="muted small">${p("online.sair.d")}</p>
      </div></div>`;
    else if (t.k === "olhar")
      s.innerHTML = `<div class="screen end defeat"><div class="card panel">
        <h2>${p("online.perdeu")}</h2><p>${p(t.timeVivo ? "online.perdeu.time" : "online.perdeu.d")}</p>
        <button id="btn-olhar-partida" class="big primary">${p("online.olhar")}</button>
        <button id="btn-sair-partida" class="big">${p("online.sair")}</button>
      </div></div>`;
    else if (t.k === "info")
      s.innerHTML = `<div class="screen end"><div class="card panel">
        <h2>${Gt(t.titulo)}</h2><p>${Gt(t.texto)}</p>
        <button id="btn-fim-menu" class="big primary">${p("end.menu")}</button>
      </div></div>`;
    else {
      const r = t.online === "time" ? `end.time.${t.result}` : t.online ? `end.online.${t.result}` : `end.${t.result}`;
      s.innerHTML = `<div class="screen end ${t.result}"><div class="card panel">
        <h2>${p(r)}</h2><p>${p(`${r}.d`)}</p><p class="muted">${p(`era.${t.era}`)} · ${p("pause.time", { m: t.minutes })}</p>
        <button id="btn-fim-menu" class="big primary">${p("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${p("end.watch")}</button>
      </div></div>`;
    }
    const a = (r, l) => s.querySelectorAll(r).forEach((c) => c.onclick = () => l(c)), i = () => {
      try {
        localStorage.setItem(mn, JSON.stringify({ rivals: this.rivals, diff: this.diff, regras: this.regras }));
      } catch {
      }
    };
    a("#btn-idioma-en", () => rn("en")), a("#btn-idioma-pt", () => rn("pt")), a("#btn-continuar", () => this.act.cont()), a("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), a("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.dicaRegras = null, this.render());
    }), a("[data-rivais]", (r) => {
      this.rivals = Number(r.dataset.rivais), i(), this.render();
    }), a("[data-dificuldade]", (r) => {
      this.diff = Number(r.dataset.dificuldade), i(), this.render();
    }), a("#btn-comecar", () => {
      this.dicaRegras = null, this.act.start(this.rivals, this.diff, this.regras);
    }), this.segurarRegras(i), a("#btn-voltar-jogo", () => this.act.resume()), a("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const r = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = r, this.render());
    }), a("#btn-entrar-conta", () => this.act.login()), a("#btn-entrar-conta-pausa", () => this.act.loginPause()), a("#btn-perfil-conta-pausa", () => this.act.profile()), a("#btn-perfil-conta", () => this.act.profile()), a("[data-qualidade]", (r) => {
      const l = qs.findIndex((c) => c.key === r.dataset.qualidade);
      l >= 0 && (this.screen?.k === "pause" || this.screen?.k === "guest" || this.screen?.k === "online") && (this.screen.quality = l, this.act.quality(l), this.render());
    }), a("#btn-entrar-amigo", () => {
      this.screen?.k === "start" && (this.screen.step = "amigo", this.amigoMsg = "", this.amigoBusy = !1, this.render());
    }), a("#btn-entrar-codigo", () => {
      Ne.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }), a("#btn-convidar-amigo", () => {
      this.escolhendoPapel = !0, this.render();
    }), a("#btn-papel-logistica", () => {
      this.escolhendoPapel = !1, this.act.convidar("logistica");
    }), a("#btn-papel-combate", () => {
      this.escolhendoPapel = !1, this.act.convidar("combate");
    }), a("#btn-papel-voltar", () => {
      this.escolhendoPapel = !1, this.render();
    }), a("#btn-trocar-papeis", () => this.act.trocarPapeis()), a("#btn-encerrar-convite", () => this.act.encerrarConvite()), a("#btn-sair-amigo", () => this.act.sairAmigo()), a("#btn-jogar-online", () => {
      this.screen?.k === "start" && (this.screen.step = "online", this.partidaMsg = "", this.partidaBusy = !1, this.render());
    }), a("#btn-criar-partida", () => {
      this.partidaBusy || this.act.criarPartida();
    }), a("#btn-entrar-partida", () => {
      Ne.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    }), a("[data-modo]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(Number(r.dataset.modo), this.screen.sala.dif);
    }), a("[data-dif-partida]", (r) => {
      this.screen?.k === "lobby" && this.act.cfgPartida(this.screen.sala.modo, Number(r.dataset.difPartida));
    }), a("[data-vaga]", (r) => {
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
    }), a("#btn-comecar-partida", () => this.act.comecarPartida()), a("#btn-sair-sala", () => this.act.sairPartida()), a("#btn-sair-partida", () => this.act.sairPartida()), a("#btn-olhar-partida", () => this.act.olharPartida());
    const o = s.querySelector("#codigo-partida");
    o && (o.oninput = () => {
      const r = pn(o.value);
      o.value !== r && (o.value = r), this.codigoPartida = r, this.setPartidaMsg(this.partidaBusy ? this.partidaMsg : "", this.partidaBusy);
    }, o.onkeydown = (r) => {
      r.key === "Enter" && Ne.test(this.codigoPartida) && !this.partidaBusy && this.act.entrarPartida(this.codigoPartida);
    });
    const n = s.querySelector("#codigo-amigo");
    n && (n.oninput = () => {
      const r = pn(n.value);
      n.value !== r && (n.value = r), this.codigo = r, this.setAmigoMsg(this.amigoBusy ? this.amigoMsg : "", this.amigoBusy);
    }, n.onkeydown = (r) => {
      r.key === "Enter" && Ne.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }, this.amigoBusy || setTimeout(() => n.focus({ preventScroll: !0 }), 50)), a("#btn-ajuda-pausa", () => this.act.help()), a("#btn-som-inicio", () => {
      K.toggleMute(), this.render();
    }), a("[data-musica]", (r) => {
      K.setOpts({ music: Number(r.dataset.musica), muted: !1 }), this.render();
    }), a("[data-efeitos]", (r) => {
      K.setOpts({ sfx: Number(r.dataset.efeitos), muted: !1 }), this.render();
    }), a("[data-ambiente]", (r) => {
      K.setOpts({ amb: Number(r.dataset.ambiente), muted: !1 }), this.render();
    }), a("#btn-sair", () => this.act.quit()), a("#btn-fim-menu", () => this.act.toMenu()), a("#btn-continuar-olhando", () => this.act.watch()), s.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function Jh(e, t, s, a) {
  const i = s.filter((h) => e.isUnit(h) && e.owner[h] === t), o = i.filter((h) => e.kind[h] === pt.villager), n = i.filter((h) => e.kind[h] !== pt.villager), r = Math.round(a.x * 256), l = Math.round(a.z * 256), c = (h) => h.length ? [{ type: "move", player: t, ids: h, x: r, z: l }] : [];
  if (a.kind === "tile" && o.length) return { cmds: [{ type: "gather", player: t, ids: o, k: a.k }, ...c(n)], ping: "work" };
  if (a.kind === "building" && e.alive[a.e]) {
    const h = a.e;
    return e.owner[h] === t ? { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: h }] : [], ...c(n)], ping: o.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: i, target: h }], ping: "attack" };
  }
  if (a.kind === "unit" && e.alive[a.e]) {
    const h = a.e;
    if (e.kind[h] === gt) return { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: h }] : [], ...c(n)], ping: o.length ? "work" : "move" };
    if (e.owner[h] !== t && (e.owner[h] === Mt || e.hostile(t, e.owner[h]))) return { cmds: [{ type: "attack", player: t, ids: i, target: h }], ping: "attack" };
  }
  return { cmds: c(i), ping: "move" };
}
const Zh = (e, t) => {
  for (const s of t) if (e.isUnit(s) && e.kind[s] === pt.villager) return !0;
  return !1;
}, Ar = 2, Tr = [
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
], gn = /* @__PURE__ */ new WeakMap();
function Qh(e) {
  let t = gn.get(e);
  if (t) return t;
  const s = Hn(e.map.seed, e.players.length, e.map.versao), a = s.size * s.size, i = new Uint8Array(a), o = new Int32Array(a);
  for (let n = 0; n < a; n++) s.tree[n] && (o[n] = s.wood[n] * 100);
  for (const n of s.res) {
    const r = n.z * s.size + n.x;
    i[r] = n.kind, o[r] = n.amount * 100;
  }
  return t = { tree: s.tree, kind: i, amt: o }, gn.set(e, t), t;
}
function td(e) {
  const t = [];
  let s = 0, a = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i] ? 1 : 0;
    o === s ? a++ : (t.push(a), s = o, a = 1);
  }
  return t.push(a), t;
}
function bn(e, t) {
  let s = 0, a = 0;
  for (const i of e)
    a && t.fill(1, s, s + i), s += i, a ^= 1;
}
function yo(e) {
  const t = Qh(e), s = e.size, a = e.top, i = {};
  for (const h of Tr) i[h] = Array.from(e[h].subarray(0, a));
  const o = [];
  for (let h = 0; h < a; h++) e.alive[h] && e.queue[h].length && o.push([h, e.queue[h].slice()]);
  const n = [], r = [], l = [];
  for (let h = 0; h < s * s; h++)
    t.tree[h] && !e.map.tree[h] && n.push(h), e.resAmt[h] !== t.amt[h] && r.push(h, e.resAmt[h]), e.resKind[h] !== t.kind[h] && l.push(h, e.resKind[h]);
  const c = e.players.find((h) => !h.ai) ?? e.players[0];
  return {
    v: Ar,
    mapa: e.map.versao,
    seed: e.map.seed,
    players: e.players.length,
    humans: e.players.filter((h) => !h.ai).length,
    difficulty: e.difficulty,
    tick: e.tick,
    rng: e.rng.save(),
    top: a,
    ent: i,
    queue: o,
    P: e.players.map((h) => ({ res: { ...h.res }, era: h.era, aging: h.aging, agingB: h.agingB, hunger: h.hunger, defeated: h.defeated, lastAlert: h.lastAlert, ai: h.ai, tech: h.tech })),
    ai: e.ai.map((h) => ({ ...h })),
    barbNext: e.barbNext,
    barbWarned: e.barbWarned,
    outcome: e.outcome,
    ...e.times ? { times: e.times.slice(), vencedor: e.vencedor } : {},
    ...e.beta ? { regras: "beta" } : {},
    cut: n,
    amt: r,
    kindDiff: l,
    explored: e.explored.map(td),
    projectiles: e.projectiles.map((h) => ({ ...h })),
    meta: { era: c.era, year: e.year, rivals: e.players.filter((h) => h.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600), ...e.beta ? { regras: "beta" } : {} }
  };
}
function Gs(e) {
  if (!e || e.v !== 1 && e.v !== Ar) throw new Error("save version");
  const t = e.v === 1 ? 1 : e.mapa;
  if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > fo) throw new Error("save version");
  const s = Array.isArray(e.times) && e.times.length === e.players && e.times.every((n) => Number.isInteger(n) && n >= 0 && n < 8) ? e.times : void 0, a = new mo(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty, mapa: t, times: s, regras: Rn(e.regras) }), i = a.size, o = i * i;
  for (const n of Tr) {
    const r = a[n];
    r.fill(n === "ignoreT" || n === "dropB" || n === "tgt" || n === "alvo2" ? -1 : 0), e.ent[n] && r.set(e.ent[n]);
  }
  a.top = e.top;
  for (let n = 0; n < et; n++)
    a.queue[n] = [], a.field[n] = null, a.path[n] = null;
  for (const [n, r] of e.queue) a.queue[n] = r.slice();
  if (a.px.set(a.x), a.pz.set(a.z), !e.ent.foodMode)
    for (let n = 0; n < e.top; n++) a.alive[n] && a.kind[n] === at + Nt.center && (a.hp[n] = Math.min(ct[Nt.center].hp, a.hp[n] * 2));
  for (const n of e.cut)
    a.map.tree[n] = 0, a.map.wood[n] = 0;
  for (let n = 0; n < e.amt.length; n += 2) a.resAmt[e.amt[n]] = e.amt[n + 1];
  for (let n = 0; n < e.kindDiff.length; n += 2) a.resKind[e.kindDiff[n]] = e.kindDiff[n + 1];
  for (let n = 0; n < o; n++) a.resKind[n] === ie && a.resAmt[n] <= 0 && (a.resKind[n] = 0, a.resAmt[n] = 0);
  for (let n = 0; n < o; n++) !a.map.tree[n] && !a.resKind[n] && (a.resAmt[n] = 0);
  a.bAt.fill(0);
  for (let n = 0; n < o; n++) a.blocked[n] = oa(a.map.terrain[n]) || a.map.tree[n] || a.resKind[n] ? 1 : 0;
  for (let n = 0; n < a.top; n++) if (a.alive[n] && a.kind[n] >= at) {
    const [r, l, c] = a.footprint(n), h = ct[a.kind[n] - at];
    for (let f = 0; f < c; f++) for (let d = 0; d < c; d++) {
      const u = (l + f) * i + r + d;
      a.bAt[u] = n + 1, !h.walk && !h.wall && (a.blocked[u] = 1);
    }
  }
  a.refazBloqueios(), e.explored.forEach((n, r) => {
    a.explored[r].fill(0), bn(n, a.explored[r]);
  }), e.P.forEach((n, r) => {
    const l = a.players[r];
    Object.assign(l.res, n.res), l.era = n.era, l.aging = n.aging, l.agingB = n.agingB, l.hunger = n.hunger, l.defeated = n.defeated, l.lastAlert = n.lastAlert, l.ai = n.ai, l.tech = n.tech ?? 0;
  }), a.ai = e.ai.map((n) => ({ ...n })), a.barbNext = e.barbNext, a.barbWarned = e.barbWarned, a.outcome = e.outcome, s && Number.isInteger(e.vencedor) && (a.vencedor = e.vencedor), a.tick = e.tick, a.rng.load(e.rng), a.projectiles = e.projectiles.map((n) => ({ ...n })), a.events.length = 0;
  for (let n = 0; n < a.top; n++) a.alive[n] && a.state[n] === Yt && (a.task[n] === Ot ? a.goPoint(n, a.slotX[n], a.slotZ[n]) : a.state[n] = It);
  return a.updateFog(), e.explored.forEach((n, r) => {
    a.explored[r].fill(0), bn(n, a.explored[r]);
  }), a;
}
const vn = "origines_save_v1", Qa = "origines_save_meta_v1", As = (e) => e ? `${vn}@${e}` : vn, ha = (e) => e ? `${Qa}@${e}` : Qa;
function $r(e, t) {
  try {
    return localStorage.setItem(As(t), JSON.stringify(e)), localStorage.setItem(ha(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function yn(e, t) {
  const s = yo(e);
  return s.meta.savedAt = Date.now(), { d: s, ok: $r(s, t) };
}
function ed(e, t) {
  $r(e, t);
}
function ia(e) {
  try {
    const t = localStorage.getItem(ha(e));
    return t && localStorage.getItem(As(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function sd(e) {
  try {
    const t = localStorage.getItem(As(e));
    return t ? Gs(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function ko(e) {
  try {
    localStorage.removeItem(As(e)), localStorage.removeItem(ha(e));
  } catch {
  }
}
function xo(e, t) {
  if (e !== t)
    try {
      const s = localStorage.getItem(As(e)), a = localStorage.getItem(ha(e));
      if (!s || !a) return;
      localStorage.setItem(As(t), s), localStorage.setItem(ha(t), a), ko(e);
    } catch {
    }
}
function ad(e) {
  try {
    const t = localStorage.getItem(As(e));
    if (!t) return null;
    const s = JSON.parse(t);
    return { seed: s.seed, tick: s.tick };
  } catch {
    return null;
  }
}
const Sr = "origines_save_contas_v1", id = () => {
  try {
    return localStorage.getItem(Sr) === "1";
  } catch {
    return !0;
  }
}, od = () => {
  try {
    localStorage.setItem(Sr, "1");
  } catch {
  }
};
function nd() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const s = localStorage.key(t);
      if (!s || !s.startsWith(Qa + "@")) continue;
      const a = s.slice(Qa.length + 1), i = ia(a);
      i && e.push({ dono: a, meta: i });
    }
  } catch {
  }
  return e.sort((t, s) => (s.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const Mo = "/api/origines/save", Cr = !location.pathname.startsWith("/jogar/");
let ve = null, Xe = null, wr = Cr;
const Er = [], da = () => Er.forEach((e) => e()), fi = () => wr ? !ve || !Xe ? "off" : Xe : "loading", rd = (e) => {
  Er.push(e);
}, Ts = () => !!Xe?.logado, Je = () => Xe?.logado ? Xe.apelido ?? "" : "";
async function ld() {
  if (!Cr) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, s) => {
        const a = document.createElement("script");
        a.src = "/conta.js?v=2", a.onload = () => t(), a.onerror = () => s(new Error("conta")), document.head.appendChild(a);
      }), ve = e.QGConta ?? null, ve && (Xe = await ve.me(), ve.aoMudar((t) => {
        Xe = t, da();
      }));
    } catch {
      ve = null, Xe = null;
    }
    wr = !0, da();
  }
}
async function rs() {
  if (!ve) return;
  const e = Je();
  try {
    const t = await ve.me();
    t && (Xe = t);
  } catch {
  }
  Je() !== e && da();
}
const kn = async () => {
  ve && (await ve.entrar(), await rs(), da());
};
async function cd() {
  ve && (await ve.perfil(), await rs(), Ts() || (await ve.entrar({ aba: "entrar" }), await rs()), da());
}
async function hd() {
  if (!Ts()) return null;
  try {
    const e = await fetch(Mo, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function Pr() {
  if (!Ts()) return null;
  try {
    const e = await fetch(`${Mo}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const Ir = (e, t = !1) => fetch(Mo, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function xn(e, t, s = !1) {
  if (s || await rs(), !Ts()) return "none";
  if (!t || Je() !== t) return "other";
  try {
    const a = { dados: e };
    return s && JSON.stringify(a).length > 6e4 && (s = !1), (await Ir(a, s)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function dd(e) {
  if (await rs(), !(!e || Je() !== e))
    try {
      await Ir({ apagar: !0 });
    } catch {
    }
}
const ud = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), Or = ["move", "amove", "gather", "work", "attack", "build", "train", "cancel", "ageup", "rally", "stop", "food", "research", "trade", "wall", "ia"], ps = 400, fd = as, pd = 600, ea = (e) => typeof e == "number" && Number.isInteger(e) && Math.abs(e) <= 2 ** 32;
function Zi(e) {
  const t = [Or.indexOf(e.type), e.player], s = (a) => {
    t.push(a.length, ...a);
  };
  switch (e.type) {
    case "move":
    case "amove":
      s(e.ids), t.push(e.x, e.z);
      break;
    case "gather":
      s(e.ids), t.push(e.k);
      break;
    case "work":
    case "attack":
      s(e.ids), t.push(e.target);
      break;
    case "build":
      s(e.ids), t.push(Nt[e.key], e.tx, e.tz);
      break;
    case "train":
      t.push(e.building, pt[e.key]);
      break;
    case "cancel":
    case "ageup":
      t.push(e.building);
      break;
    case "rally":
      t.push(e.building, e.x, e.z);
      break;
    case "stop":
      s(e.ids);
      break;
    case "food":
      s(e.ids), t.push(e.on ? 1 : 0);
      break;
    case "research":
      t.push(e.building, Wa[e.key]);
      break;
    case "trade":
      t.push(e.building, ns.indexOf(e.give), ns.indexOf(e.get));
      break;
    case "wall":
      s(e.ids), s(e.tiles);
      break;
  }
  return t;
}
function Br(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > pd || !e.every(ea)) return null;
  const t = e;
  let s = 2, a = !0;
  const i = () => s >= t.length ? (a = !1, 0) : t[s++], o = (h) => {
    const f = i();
    if (f < 0 || f > h || s + f > t.length)
      return a = !1, [];
    const d = t.slice(s, s + f);
    return s += f, d;
  }, n = (h, f) => {
    const d = h[f];
    return d || (a = !1), d?.key ?? "";
  }, r = Or[t[0]], l = t[1];
  let c = null;
  switch (r) {
    case "move":
    case "amove": {
      const h = o(ps);
      c = { type: r, player: l, ids: h, x: i(), z: i() };
      break;
    }
    case "gather": {
      const h = o(ps);
      c = { type: "gather", player: l, ids: h, k: i() };
      break;
    }
    case "work":
    case "attack": {
      const h = o(ps);
      c = { type: r, player: l, ids: h, target: i() };
      break;
    }
    case "build": {
      const h = o(ps);
      c = { type: "build", player: l, ids: h, key: n(ct, i()), tx: i(), tz: i() };
      break;
    }
    case "train": {
      const h = i();
      c = { type: "train", player: l, building: h, key: n(W, i()) };
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
      c = { type: "stop", player: l, ids: o(ps) };
      break;
    case "food": {
      const h = o(ps), f = i();
      f !== 0 && f !== 1 && (a = !1), c = { type: "food", player: l, ids: h, on: f === 1 };
      break;
    }
    case "research": {
      const h = i();
      c = { type: "research", player: l, building: h, key: n(os, i()) };
      break;
    }
    case "trade": {
      const h = i(), f = ns[i()], d = ns[i()];
      (!f || !d) && (a = !1), c = { type: "trade", player: l, building: h, give: f, get: d };
      break;
    }
    case "wall": {
      const h = o(ps);
      c = { type: "wall", player: l, ids: h, tiles: o(fd) };
      break;
    }
    case "ia":
      c = { type: "ia", player: l };
      break;
    default:
      return null;
  }
  return a && s === t.length ? c : null;
}
class qr {
  constructor() {
    m(this, "ordens", []);
    m(this, "marcas", []);
    m(this, "avisado", 0);
  }
  /** começa (ou recomeça, depois de mandar o jogo ao amigo) a partir deste mundo */
  ligar(t) {
    this.ordens = [], this.marcas = [], this.avisado = t.tick, t.onApplied = (s, a) => {
      for (const i of a) this.ordens.push([s, ...Zi(i)]);
    };
  }
  /** depois de cada passo: a cada 50 passos, a impressão digital da partida */
  depoisDoPasso(t) {
    t.tick % 50 === 0 && this.marcas.push([t.tick, t.hash()]);
  }
  /** o turno para mandar agora, ou null: de 2 em 2 passos, ou já se tem ordem ou impressão para mandar
   *  (agora: na pausa, para o amigo parar no mesmo passo) */
  turno(t, s = !1) {
    if (t.tick <= this.avisado || !s && !this.ordens.length && !this.marcas.length && t.tick - this.avisado < 2) return null;
    const a = [t.tick, this.marcas, this.ordens];
    return this.marcas = [], this.ordens = [], this.avisado = t.tick, a;
  }
  /** ordem que chegou do amigo: entra no jogo como ordem de fora, sempre para a tribo de quem joga (me). Com papéis
   *  (D31), `filtro` tira dela o que não é do papel do amigo; se não sobrar nada, ela não entra */
  ordemDoAmigo(t, s, a, i) {
    let o = Br(s);
    return !o || o.type === "ia" || (o.player = a, i && (o = i(o), !o)) ? null : (t.issue(o, !0), o);
  }
}
class Nr {
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
  receber(t, s) {
    if (!Array.isArray(s) || s.length !== 3 || !ea(s[0]) || !Array.isArray(s[1]) || !Array.isArray(s[2])) return !1;
    const [a, i, o] = s;
    if (a < this.ate) return !1;
    for (const n of o) {
      if (!Array.isArray(n) || !ea(n[0]) || n[0] < t.tick) continue;
      const r = Br(n.slice(1));
      r && t.schedule(r, n[0]);
    }
    for (const n of i) Array.isArray(n) && ea(n[0]) && ea(n[1]) && this.marcas.set(n[0], n[1]);
    return this.ate = a, !0;
  }
  /** depois de cada passo: confere a impressão digital, se o anfitrião mandou uma para este passo */
  depoisDoPasso(t) {
    const s = this.marcas.get(t.tick);
    s !== void 0 && (this.marcas.delete(t.tick), s !== t.hash() && (this.divergiu = !0));
  }
}
const Rr = new URLSearchParams(location.search), Fr = (Rr.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`) + "/partida", Dr = Fr.replace(/^ws/, "http"), md = !location.pathname.startsWith("/jogar/") && !Rr.get("online"), fe = (e, t = 0) => typeof e == "number" && Number.isInteger(e) ? e : t, $i = (e) => Array.isArray(e) ? e.filter((t) => typeof t == "number" && Number.isInteger(t)) : [], Mn = (e) => Array.isArray(e) ? e.slice(0, 4).map((t) => typeof t == "string" ? t.slice(0, 40) : "") : [];
let gd = null;
function bd() {
  return md ? Promise.resolve(!1) : gd ?? (gd = fetch(Dr + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class ua {
  constructor(t, s) {
    m(this, "codigo", "");
    m(this, "ws", null);
    m(this, "fechado", !1);
    m(this, "caiuEm", 0);
    this.criar = t, this.on = s;
  }
  /** quem cria: pede um código ao servidor e entra na sala */
  static async nova(t) {
    const s = await fetch(Dr + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!s.ok) throw new Error(s.status === 401 ? "conta" : "rede");
    const { codigo: a } = await s.json();
    if (!Ne.test(a)) throw new Error("rede");
    const i = new ua(!0, t);
    return i.codigo = a, i.abrir(), i;
  }
  /** quem entra com o código */
  static entrar(t, s) {
    const a = new ua(!1, s);
    return a.codigo = t, a.abrir(), a;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${Fr}/sala/${this.codigo}?modo=${this.criar ? "criar" : "entrar"}&v=${la}`);
    } catch {
      this.caiu();
      return;
    }
    this.ws = t, t.onmessage = (s) => {
      this.ws === t && typeof s.data == "string" && this.receber(s.data);
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
    let s;
    try {
      s = JSON.parse(t);
    } catch {
      return;
    }
    switch (s.t) {
      case "ok":
        this.caiuEm = 0, this.criar = !1;
        break;
      // voltando, entra como quem já está (a vaga é dela)
      case "sala":
        this.on({ t: "sala", sala: { codigo: this.codigo, modo: fe(s.modo, 1), dif: fe(s.dif, 1), vagas: Mn(s.vagas), criador: fe(s.criador), eu: fe(s.eu, -1) } });
        break;
      case "comeca":
        this.on({ t: "comeca", c: { semente: fe(s.semente), modo: fe(s.modo, 1), dif: fe(s.dif, 1), vagas: Mn(s.vagas), eu: fe(s.eu, -1), anf: fe(s.anf), fora: $i(s.fora), volta: s.volta === !0 } });
        break;
      case "t":
        this.on({ t: "turno", d: s.d });
        break;
      case "s":
        this.on({ t: "jogo", v: Number(s.v), d: s.d });
        break;
      case "p":
        this.on({ t: "pausa", on: Array.isArray(s.d) && s.d[0] === 1 });
        break;
      case "c":
        this.on({ t: "ordem", v: fe(s.v, -1), d: s.d });
        break;
      case "r":
        this.on({ t: "pede", v: fe(s.v, -1) });
        break;
      case "sinal": {
        const a = $i(s.d);
        a.length === 4 && this.on({ t: "sinal", v: a[0], tipo: a[1], x: a[2], z: a[3] });
        break;
      }
      case "caiu":
      case "voltou":
      case "saiu":
        this.on({ t: s.t, v: fe(s.v, -1) });
        break;
      case "anfitriao":
        this.on({ t: "anfitriao", v: fe(s.v, -1), fora: $i(s.fora) });
        break;
      case "fim":
        this.fechar(), this.on({ t: "fim", motivo: typeof s.motivo == "string" ? s.motivo : "" });
        break;
      case "erro":
        this.fechar(), this.on({ t: "erro", msg: typeof s.msg == "string" ? s.msg : "" });
        break;
    }
  }
  enviar(t) {
    this.ws && this.ws.readyState === WebSocket.OPEN && this.ws.send(typeof t == "string" ? t : JSON.stringify(t));
  }
  // sala de espera (só quem criou)
  cfg(t, s) {
    this.enviar({ t: "cfg", d: [t, s] });
  }
  trocar(t, s) {
    this.enviar({ t: "troca", d: [t, s] });
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
    this.enviar(`{"t":"s","v":${la},"d":${t}}`);
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
  sinal(t, s, a) {
    this.enviar({ t: "sinal", d: [t, s, a] });
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
const zn = /* @__PURE__ */ new WeakMap();
function zo(e) {
  let t = zn.get(e);
  if (!t) {
    const s = e.sampleRate * 2, a = e.createBuffer(1, s, e.sampleRate), i = a.getChannelData(0);
    let o = 22222;
    for (let n = 0; n < s; n++)
      o = o * 16807 % 2147483647, i[n] = o / 10737418235e-1 - 1;
    t = { noise: a, pluck: /* @__PURE__ */ new Map() }, zn.set(e, t);
  }
  return t;
}
function Ls(e, t, s) {
  const a = e.createBufferSource();
  return a.buffer = zo(e).noise, a.loop = !0, a.start(t, t * 7.31 % 1.5), a.stop(t + s + 0.05), a;
}
function qt(e, t, s, a, i, o = 0) {
  const n = e.createGain(), r = Math.max(2e-4, s);
  return n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + a), o && n.gain.setValueAtTime(r, t + a + o), n.gain.exponentialRampToValueAtTime(1e-4, t + a + o + i), n;
}
function se(e, t, s, a = 1) {
  const i = e.createBiquadFilter();
  return i.type = t, i.frequency.value = s, i.Q.value = a, i;
}
function Ht(e, t, s, a, i) {
  const o = e.createOscillator();
  return o.type = t, o.frequency.setValueAtTime(s, a), o.start(a), o.stop(a + i + 0.05), o;
}
function Tt(...e) {
  for (let t = 0; t < e.length - 1; t++) e[t].connect(e[t + 1]);
  return e[e.length - 1];
}
function zt(e, t, s, a, i, o, n, r, l = 4e-3) {
  const c = Ht(e, a, i, s, n);
  c.frequency.exponentialRampToValueAtTime(Math.max(20, o), s + n), Tt(c, qt(e, s, r, l, n), t);
}
function dt(e, t, s, a, i, o, n, r, l = 3e-3) {
  Tt(Ls(e, s, n + l), se(e, a, i, o), qt(e, s, r, l, n), t);
}
function Si(e, t, s, a, i) {
  const o = Ls(e, s, i.dur), n = se(e, "bandpass", i.f, 3), r = e.createGain(), l = Ht(e, "sine", i.lfo[0], s, i.dur), c = e.createGain();
  return l.frequency.linearRampToValueAtTime(i.lfo[1], s + i.dur * 0.9), c.gain.value = 0.5, r.gain.value = 0.5, l.connect(c).connect(r.gain), Tt(o, n, r, qt(e, s, 0.1 * a, i.dur * 0.22, i.dur * 0.73), t), dt(e, t, s + i.snapAt, "bandpass", i.snapF, 2, 0.03, (i.snap ?? 0.08) * a), Math.max(i.dur, i.snapAt + 0.06);
}
function pe(e, t, s, a, i, o = [1, 2.4, 3.6, 5.1], n = 1.6) {
  o.forEach((r, l) => Tt(Ht(e, "sine", a * r, s, n), qt(e, s, i / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function vd(e, t, s, a, i, o) {
  const n = Ht(e, "sine", a, s, o), r = Ht(e, "sine", a * 1.4, s, o), l = e.createGain();
  l.gain.setValueAtTime(a * 1.6, s), l.gain.exponentialRampToValueAtTime(a * 0.1, s + o), r.connect(l).connect(n.frequency), Tt(n, qt(e, s, i, 2e-3, o), t);
  for (const [c, h] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const f of [1, 1.007]) Tt(Ht(e, "sine", a * c * f, s, o * 0.7), qt(e, s, i * h * 0.5, 2e-3, o * (0.7 - c * 0.04)), t);
}
function yd(e, t) {
  const s = Math.round(t * 10), a = zo(e);
  let i = a.pluck.get(s);
  if (i) return i;
  const o = e.sampleRate, n = Math.floor(o * 1.8), r = Math.max(2, Math.round(o / t));
  i = e.createBuffer(1, n, o);
  const l = i.getChannelData(0), c = new Float32Array(r);
  let h = s * 7 + 1;
  for (let f = 0; f < r; f++)
    h = h * 16807 % 2147483647, c[f] = (h / 10737418235e-1 - 1) * 0.6;
  for (let f = 0, d = 0; f < n; f++) {
    const u = c[d], g = c[(d + 1) % r];
    c[d] = 0.996 * 0.5 * (u + g), l[f] = u, d = (d + 1) % r;
  }
  return a.pluck.set(s, i), i;
}
function kd(e, t, s, a, i, o = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = yd(e, a), r.start(s), r.stop(s + n), Tt(r, se(e, "lowpass", o, 0.7), qt(e, s, i, 2e-3, n), t);
}
function Ce(e, t, s, a, i, o, n, r, l = "sawtooth") {
  const c = e.createOscillator();
  c.type = l, c.frequency.setValueAtTime(i[0][1], s);
  for (const [u, g] of i.slice(1)) c.frequency.linearRampToValueAtTime(g, s + u);
  const h = e.createOscillator(), f = e.createGain();
  h.frequency.value = n[0], f.gain.value = n[1], h.connect(f).connect(c.frequency), c.start(s), c.stop(s + a + 0.05), h.start(s), h.stop(s + a + 0.05);
  const d = qt(e, s, r, Math.min(0.05, a * 0.2), a * 0.8, a * 0.1);
  for (const [u, g] of o) {
    const b = e.createGain();
    b.gain.value = g, Tt(c, se(e, "bandpass", u, 6), b, d);
  }
  d.connect(t);
}
function Na(e) {
  const t = e.createBufferSource();
  return t.buffer = zo(e).noise, t.loop = !0, t.start(), t;
}
function Qi(e, t, s, a, i) {
  const o = 3 + i % 4, n = 2600 + i * 137 % 1600;
  for (let r = 0; r < o; r++) {
    const l = s + r * (0.07 + (i + r) % 3 * 0.02), c = n * (1 + (i * (r + 3) % 7 - 3) * 0.06), h = Ht(e, "sine", c, l, 0.07);
    h.frequency.exponentialRampToValueAtTime(c * (r % 2 ? 0.8 : 1.35), l + 0.06), Tt(h, qt(e, l, 0.05 * a, 0.01, 0.05), t);
  }
  return o * 0.1;
}
const Te = {
  // interface
  "ui.click": (e, t, s, a) => (zt(e, t, s, "sine", 700, 420, 0.05, 0.2 * a), dt(e, t, s, "bandpass", 2400, 2, 0.025, 0.06 * a), 0.08),
  "ui.denied": (e, t, s, a) => {
    const i = Ht(e, "sine", 240, s, 0.15);
    return i.frequency.exponentialRampToValueAtTime(170, s + 0.14), Tt(i, se(e, "lowpass", 900), qt(e, s, 0.16 * a, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, s, a) => (zt(e, t, s, "triangle", 560, 480, 0.05, 0.12 * a), zt(e, t, s + 0.07, "triangle", 700, 600, 0.05, 0.1 * a), 0.14),
  "sel.soldier": (e, t, s, a) => (zt(e, t, s, "sine", 180, 90, 0.12, 0.24 * a), dt(e, t, s, "lowpass", 600, 1, 0.04, 0.1 * a), 0.14),
  "sel.building": (e, t, s, a) => (zt(e, t, s, "sine", 300, 220, 0.08, 0.18 * a), zt(e, t, s + 0.09, "sine", 300, 220, 0.08, 0.13 * a), 0.2),
  "order.move": (e, t, s, a) => (dt(e, t, s, "lowpass", 500, 1, 0.05, 0.13 * a), dt(e, t, s + 0.11, "lowpass", 450, 1, 0.05, 0.11 * a), 0.18),
  "order.work": (e, t, s, a) => (dt(e, t, s, "bandpass", 2600, 3, 0.03, 0.12 * a), zt(e, t, s, "sine", 1500, 1300, 0.02, 0.05 * a), 0.05),
  "order.attack": (e, t, s, a) => (zt(e, t, s, "sine", 150, 70, 0.18, 0.28 * a), dt(e, t, s, "lowpass", 800, 1, 0.05, 0.1 * a), 0.2),
  place: (e, t, s, a) => (zt(e, t, s, "sine", 190, 85, 0.2, 0.3 * a), dt(e, t, s, "lowpass", 400, 1, 0.08, 0.12 * a), 0.22),
  "place.bad": (e, t, s, a) => {
    const i = Ht(e, "triangle", 170, s, 0.17);
    return i.frequency.exponentialRampToValueAtTime(120, s + 0.16), Tt(i, se(e, "lowpass", 900), qt(e, s, 0.18 * a, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, s, a) => (pe(e, t, s, 880, 0.14 * a, [1, 1.5], 0.35), 0.4),
  built: (e, t, s, a) => (zt(e, t, s, "sine", 180, 100, 0.14, 0.2 * a), zt(e, t, s + 0.12, "sine", 150, 90, 0.14, 0.18 * a), pe(e, t, s + 0.26, 1046, 0.09 * a, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, s, a) => (pe(e, t, s, 660, 0.15 * a, [1, 2, 2.76, 4.07], 1.6), pe(e, t, s + 0.18, 990, 0.1 * a, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, s, a) => ([880, 1108, 1320].forEach((i, o) => pe(e, t, s + o * 0.11, i, 0.09 * a, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, s, a) => {
    const i = qt(e, s, 0.2 * a, 0.18, 0.4, 0.9), o = se(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = Ht(e, "sawtooth", n, s, 1.6), c = e.createGain();
      c.gain.value = r, Tt(l, c, o);
    }
    return Tt(o, i, t), 1.6;
  },
  "drums.war": (e, t, s, a) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((i, o) => {
    zt(e, t, s + i, "sine", 95, 55, 0.3, (0.12 + o * 0.025) * a), dt(e, t, s + i, "lowpass", 300, 1, 0.05, 0.06 * a);
  }), 2.9),
  gong: (e, t, s, a) => (pe(e, t, s, 110, 0.22 * a, [1, 1.44, 2.05, 2.84, 3.82], 3), dt(e, t, s, "lowpass", 2e3, 1, 0.05, 0.08 * a), 3),
  winter: (e, t, s, a) => {
    const i = Ls(e, s, 1.8), o = se(e, "lowpass", 300, 0.8);
    return o.frequency.linearRampToValueAtTime(900, s + 0.8), o.frequency.linearRampToValueAtTime(300, s + 1.7), Tt(i, o, qt(e, s, 0.1 * a, 0.5, 1.2), t), pe(e, t, s + 0.3, 520, 0.1 * a, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, s, a) => {
    for (let i = 0; i < 5; i++) Qi(e, t, s + i * 0.22, a * 1.6, 3 + i * 5);
    return 1.6;
  },
  hunger: (e, t, s, a) => (Tt(Ht(e, "sine", 98, s, 1.1), qt(e, s, 0.1 * a, 0.1, 0.9), t), Tt(Ht(e, "sine", 147, s, 1.1), qt(e, s, 0.06 * a, 0.1, 0.9), t), 1.1),
  soft: (e, t, s, a) => (pe(e, t, s, 784, 0.07 * a, [1, 2], 0.5), 0.5),
  fair: (e, t, s, a) => {
    [587, 740, 880, 988, 880].forEach((i, o) => fa(e, t, s + o * 0.14, i, 0.13, 0.1 * a));
    for (let i = 0; i < 4; i++) ti(e, t, s + i * 0.18, 0.5 * a);
    return 0.9;
  },
  // trabalho
  "work.chop": (e, t, s, a) => (dt(e, t, s, "bandpass", 1100, 1.5, 0.05, 0.28 * a), zt(e, t, s, "sine", 260, 170, 0.06, 0.18 * a), 0.08),
  "work.pick": (e, t, s, a) => (pe(e, t, s, 2100, 0.1 * a, [1, 1.45], 0.09), dt(e, t, s, "highpass", 3e3, 1, 0.015, 0.06 * a), 0.1),
  "work.pickMetal": (e, t, s, a) => (pe(e, t, s, 2600, 0.09 * a, [1, 1.5, 2.04], 0.2), dt(e, t, s, "highpass", 3e3, 1, 0.012, 0.05 * a), 0.2),
  "work.hoe": (e, t, s, a) => (dt(e, t, s, "lowpass", 350, 1, 0.09, 0.22 * a), zt(e, t, s, "sine", 120, 80, 0.08, 0.12 * a), 0.1),
  "work.mallet": (e, t, s, a) => (zt(e, t, s, "sine", 330, 240, 0.07, 0.22 * a), dt(e, t, s, "bandpass", 900, 1.5, 0.04, 0.1 * a), 0.08),
  "work.rustle": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.15]) dt(e, t, s + i, "bandpass", 4e3, 1, 0.05, 0.06 * a);
    return 0.22;
  },
  "drop.wood": (e, t, s, a) => (zt(e, t, s, "sine", 160, 110, 0.12, 0.2 * a), dt(e, t, s, "lowpass", 500, 1, 0.06, 0.1 * a), 0.14),
  "drop.stone": (e, t, s, a) => {
    for (let i = 0; i < 4; i++) dt(e, t, s + i * 0.035, "bandpass", 1500 + i * 200, 2, 0.03, 0.08 * a);
    return 0.18;
  },
  "drop.food": (e, t, s, a) => {
    for (const i of [0, 0.06]) dt(e, t, s + i, "bandpass", 2e3, 1, 0.06, 0.07 * a);
    return 0.14;
  },
  "drop.metal": (e, t, s, a) => (pe(e, t, s, 2600, 0.07 * a, [1, 1.5], 0.15), pe(e, t, s + 0.07, 2900, 0.06 * a, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, s, a) => {
    const i = Ht(e, "sawtooth", 90, s, 0.45);
    return i.frequency.linearRampToValueAtTime(70, s + 0.45), Tt(i, se(e, "bandpass", 400, 4), qt(e, s, 0.05 * a, 0.05, 0.4), t), dt(e, t, s + 0.4, "lowpass", 700, 1, 0.7, 0.18 * a, 0.01), zt(e, t, s + 0.4, "sine", 70, 45, 0.4, 0.16 * a), 1.2;
  },
  "res.crumble": (e, t, s, a) => {
    for (let i = 0; i < 5; i++) dt(e, t, s + i * 0.09, "lowpass", 900, 1, 0.08, (0.14 - i * 0.02) * a);
    return 0.55;
  },
  puff: (e, t, s, a) => (dt(e, t, s, "lowpass", 600, 0.7, 0.3, 0.15 * a, 0.02), zt(e, t, s, "sine", 150, 100, 0.12, 0.05 * a), 0.34),
  "fall.animal": (e, t, s, a) => (zt(e, t, s, "sine", 95, 50, 0.25, 0.22 * a), dt(e, t, s + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * a, 0.02), 0.4),
  crash: (e, t, s, a) => {
    dt(e, t, s, "lowpass", 1200, 0.8, 1.1, 0.26 * a, 0.01);
    for (const i of [0, 0.18, 0.36]) zt(e, t, s + i, "sine", 80, 45, 0.25, 0.18 * a);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, s, a) => (zt(e, t, s, "sine", 320, 210, 0.07, 0.26 * a), dt(e, t, s, "bandpass", 1600, 1.5, 0.04, 0.1 * a), 0.08),
  "hit.axe": (e, t, s, a) => (dt(e, t, s, "bandpass", 1e3, 2, 0.06, 0.26 * a), zt(e, t, s, "sine", 240, 160, 0.06, 0.16 * a), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, s, a) => (vd(e, t, s, 1250, 0.07 * a, 0.55), dt(e, t, s, "highpass", 4500, 0.8, 0.05, 0.09 * a), zt(e, t, s, "sine", 260, 170, 0.05, 0.1 * a), 0.55),
  "hit.spear": (e, t, s, a) => {
    const i = Ls(e, s, 0.12), o = se(e, "bandpass", 2200, 2);
    return o.frequency.exponentialRampToValueAtTime(900, s + 0.1), Tt(i, o, qt(e, s, 0.12 * a, 0.01, 0.1), t), zt(e, t, s + 0.08, "sine", 400, 300, 0.03, 0.08 * a), 0.13;
  },
  "hit.wall": (e, t, s, a) => (zt(e, t, s, "sine", 200, 130, 0.09, 0.24 * a), dt(e, t, s, "lowpass", 700, 1, 0.05, 0.12 * a), 0.1),
  "hit.bite": (e, t, s, a) => (dt(e, t, s, "bandpass", 1500, 2, 0.04, 0.12 * a), zt(e, t, s, "sine", 500, 300, 0.05, 0.08 * a), Ce(e, t, s, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * a), 0.2),
  "hit.boar": (e, t, s, a) => (Ce(e, t, s, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * a), Ce(e, t, s + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * a), zt(e, t, s, "sine", 120, 70, 0.12, 0.12 * a), 0.25),
  "hit.aurochs": (e, t, s, a) => (zt(e, t, s, "sine", 100, 55, 0.2, 0.2 * a), dt(e, t, s, "bandpass", 700, 1.5, 0.12, 0.08 * a), 0.22),
  throw: (e, t, s, a) => {
    const i = Ls(e, s, 0.36), o = se(e, "bandpass", 500, 1.2);
    return o.frequency.exponentialRampToValueAtTime(1600, s + 0.15), o.frequency.exponentialRampToValueAtTime(700, s + 0.34), Tt(i, o, qt(e, s, 0.1 * a, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, s, a) => Si(e, t, s, a, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, s, a) => Si(e, t, s, a, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, s, a) => Si(e, t, s, a, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  "arrow.hit": (e, t, s, a) => (zt(e, t, s, "sine", 420, 260, 0.04, 0.16 * a), dt(e, t, s, "bandpass", 2200, 2, 0.03, 0.08 * a), 0.06),
  "spear.hit": (e, t, s, a) => (zt(e, t, s, "sine", 300, 180, 0.06, 0.2 * a), dt(e, t, s, "bandpass", 1500, 2, 0.04, 0.08 * a), 0.08),
  "stone.hit": (e, t, s, a) => (dt(e, t, s, "bandpass", 2600, 4, 0.03, 0.16 * a), zt(e, t, s, "sine", 950, 800, 0.02, 0.06 * a), 0.05),
  "ram.boom": (e, t, s, a) => (zt(e, t, s, "sine", 72, 42, 0.55, 0.42 * a), dt(e, t, s, "lowpass", 350, 1, 0.4, 0.24 * a), dt(e, t, s + 0.02, "bandpass", 900, 2, 0.08, 0.08 * a), 0.6),
  "ram.creak": (e, t, s, a) => {
    const i = Ht(e, "sawtooth", 140, s, 0.3);
    return i.frequency.linearRampToValueAtTime(120, s + 0.3), Tt(i, se(e, "bandpass", 600, 5), qt(e, s, 0.03 * a, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, s, a) => (Ce(e, t, s, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * a), 0.7),
  "animal.horse": (e, t, s, a) => (Ce(e, t, s, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * a), 0.9),
  "animal.dog": (e, t, s, a) => {
    for (const i of [0, 0.16]) Ce(e, t, s + i, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * a);
    return 0.28;
  },
  "animal.wolf": (e, t, s, a) => (Ce(e, t, s, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * a), 0.45),
  "animal.howl": (e, t, s, a) => {
    for (const [i, o] of [[0, 1], [0.28, 0.3]]) {
      const n = Ht(e, "sine", 420, s + i, 1.6);
      n.frequency.linearRampToValueAtTime(620, s + i + 0.6), n.frequency.linearRampToValueAtTime(540, s + i + 1.5), Tt(n, se(e, "lowpass", 1200), qt(e, s + i, 0.05 * a * o, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, s, a) => (Ce(e, t, s, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * a), Ce(e, t, s + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * a), 0.28),
  "animal.aurochs": (e, t, s, a) => (Ce(e, t, s, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * a), 1),
  "animal.deer": (e, t, s, a) => (dt(e, t, s, "bandpass", 1200, 2, 0.12, 0.07 * a), dt(e, t, s + 0.05, "bandpass", 600, 2, 0.1, 0.05 * a), 0.17),
  "animal.crow": (e, t, s, a) => {
    for (const i of [0, 0.3]) Ce(e, t, s + i, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * a);
    return 0.5;
  },
  "animal.hooves": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.2, 0.27])
      zt(e, t, s + i, "sine", 180, 120, 0.04, 0.1 * a), dt(e, t, s + i, "lowpass", 900, 1, 0.02, 0.05 * a);
    return 0.32;
  },
  bird: (e, t, s, a) => Qi(e, t, s, a, 1 + Math.floor(s * 977 % 97))
}, xd = {
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
for (const [e, t] of Object.entries(xd)) {
  const s = Te[e];
  Te[e] = (a, i, o, n) => s(a, i, o, n * t);
}
function _e(e, t, s, a, i) {
  zt(e, t, s, "sine", a * 1.6, a, 0.4, 0.22 * i), dt(e, t, s, "lowpass", 400, 1, 0.05, 0.08 * i);
}
function fa(e, t, s, a, i, o, n = 0.22) {
  const r = qt(e, s, 0.13 * o, 0.05, 0.14, Math.max(0, i - 0.08)), l = Ht(e, "sine", a, s, i + 0.3), c = Ht(e, "triangle", a * 2, s, i + 0.3), h = e.createGain();
  h.gain.value = n;
  const f = Ht(e, "sine", 5, s, i + 0.3), d = e.createGain();
  d.gain.setValueAtTime(0, s), d.gain.linearRampToValueAtTime(a * 6e-3, s + 0.2), f.connect(d), d.connect(l.frequency), d.connect(c.frequency), Tt(l, r), Tt(c, h, r), r.connect(t), Tt(Ls(e, s, i + 0.1), se(e, "bandpass", a * 2, 8), qt(e, s, 0.02 * o, 0.03, 0.1, Math.max(0, i - 0.05)), t);
}
function Md(e, t, s, a, i, o) {
  fa(e, t, s, a, i, o * 0.9, 0.05);
}
function zd(e, t, s, a, i) {
  kd(e, t, s, a, 0.2 * i);
}
function Ad(e, t, s, a, i) {
  Tt(Ht(e, "sine", a, s, 0.4), qt(e, s, 0.12 * i, 2e-3, 0.35), t), Tt(Ht(e, "sine", a * 2.92, s, 0.2), qt(e, s, 0.04 * i, 2e-3, 0.15), t), dt(e, t, s, "bandpass", 3e3, 3, 0.01, 0.03 * i);
}
function to(e, t, s, a, i) {
  pe(e, t, s, a, 0.08 * i, [1, 2.4, 3.6, 5.1], 2);
}
function eo(e, t, s, a, i, o) {
  const n = se(e, "lowpass", a * 3, 0.8);
  n.frequency.linearRampToValueAtTime(a * 6, s + 0.15), n.frequency.linearRampToValueAtTime(a * 4, s + i);
  for (const r of [1, 1.004]) Tt(Ht(e, "sawtooth", a * r, s, i + 0.3), n);
  Tt(n, qt(e, s, 0.07 * o, 0.08, 0.2, Math.max(0, i - 0.1)), t);
}
function Td(e, t, s, a, i, o) {
  const n = se(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.setValueAtTime(1e-4, s), r.gain.linearRampToValueAtTime(0.05 * o, s + 1.5), r.gain.setValueAtTime(0.05 * o, s + Math.max(1.5, i - 1.5)), r.gain.linearRampToValueAtTime(1e-4, s + i);
  for (const l of [1, 1.5]) Tt(Ht(e, "sawtooth", a * l, s, i), n);
  Tt(n, r, t);
}
function ti(e, t, s, a) {
  dt(e, t, s, "highpass", 5e3, 1, 0.06, 0.05 * a, 5e-3);
}
const le = (e) => 440 * Math.pow(2, (e - 69) / 12);
function Lr(e, t, s, a, i) {
  const o = le(a.m), n = a.d * i;
  switch (a.i) {
    case "drum":
      _e(e, t, s, o, a.v);
      break;
    case "drumHi":
      _e(e, t, s, o * 1.8, a.v * 0.8);
      break;
    case "flute":
      fa(e, t, s, o, n, a.v);
      break;
    case "ocarina":
      Md(e, t, s, o, n, a.v);
      break;
    case "lyre":
      zd(e, t, s, o, a.v);
      break;
    case "stones":
      Ad(e, t, s, o, a.v);
      break;
    case "bells":
      to(e, t, s, o, a.v);
      break;
    case "horn":
      eo(e, t, s, o, n, a.v);
      break;
    case "drone":
      Td(e, t, s, o, n, a.v);
      break;
    case "shaker":
      ti(e, t, s, a.v);
      break;
  }
}
const pa = 62, so = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], $d = [...so.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...so.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], Sd = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], Bs = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function ao() {
  const e = [];
  let t = 0;
  const s = (a, i, o) => a.forEach((n, r) => {
    let l = 0;
    for (const [c, h] of n)
      e.push({ b: (t + r) * 4 + l, i, m: pa + c, d: h, v: o }), l += h;
  });
  for (let a = 0; a < 4; a++, t += 8) {
    s(a === 2 ? Sd : a === 1 ? $d : so, "flute", 1);
    for (let i = 0; i < 8; i++) {
      const o = (t + i) * 4;
      if (e.push({ b: o, i: "drum", m: 38, d: 1, v: 0.9 }, { b: o + 2, i: "drum", m: 43, d: 1, v: 0.6 }), a >= 2) {
        e.push({ b: o + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: o + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      a >= 1 && Bs[i].concat([Bs[i][2], Bs[i][1], Bs[i][2], Bs[i][1]]).forEach((n, r) => e.push({ b: o + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), a === 3 && e.push({ b: o, i: "bells", m: 74 + Bs[i][0], d: 2, v: 0.8 });
    }
    a === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([i, o]) => e.push({ b: t * 4 + i, i: "horn", m: o, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: pa, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const Cd = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10]];
function wd(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const An = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function jr(e, t, s, a) {
  const i = Math.min(e, 2), o = wd(a * 97 + i * 13 + t * 5), n = Cd[i], r = n.length, l = (N) => pa + 12 * Math.floor(N / r) + n[(N % r + r) % r], c = t === 1, h = s === 3, f = Math.round([72, 80, 88][i] * (c ? 1.15 : 1) * (h ? 0.85 : s === 2 ? 0.93 : 1)), d = [], u = (N) => {
    const A = [];
    let I = N;
    for (let B = 0; B < 2; B++) {
      const P = An[Math.floor(o() * An.length)], R = [];
      for (const $ of P)
        R.push([I, $]), I = Math.max(-2, Math.min(r + 3, I + [-2, -1, -1, 1, 1, 2, 0][Math.floor(o() * 7)]));
      A.push(R);
    }
    return A;
  }, g = u(Math.floor(o() * 3)), b = u(2 + Math.floor(o() * 3)), k = u(r), y = (N, A) => N.map((I) => I.map(([B, P]) => [B + A, P])), M = [[[2, 2], [1, 2]], [[0, 4]]], v = [...g, ...y(g, 1), ...b, ...M, ...g, ...y(g, -1), ...k, ...M, ...k, ...y(k, -1), ...b, ...M, ...g, ...b, ...g, ...M], z = i === 0 ? "flute" : i === 1 ? "ocarina" : "flute";
  return v.forEach((N, A) => {
    let I = 0;
    const B = A * 4, P = !c && A % 8 === 7 && o() < 0.3;
    for (const [$, T] of N)
      !P && !(h && o() < 0.25) && d.push({ b: B + I, i: z, m: l($) + (i === 0 ? 0 : 12 * (s === 1 ? 1 : 0)), d: T * 0.95, v: 0.85 }), I += T;
    const R = h ? 0.4 : c ? 1 : 0.7;
    if (i === 0) {
      if (d.push({ b: B, i: "drum", m: 38, d: 1, v: 0.9 }), o() < R && d.push({ b: B + 2, i: "drum", m: 43, d: 1, v: 0.6 }), c) for (let $ = 0; $ < 4; $++) d.push({ b: B + $ + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      A % 4 === 3 && o() < R && d.push({ b: B + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: B + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (i === 1)
      A % 8 === 0 && d.push({ b: B, i: "drone", m: 38, d: 32, v: 0.9 }), (A % 2 === 0 || c) && d.push({ b: B, i: "drum", m: 38, d: 1, v: 0.7 }), o() < R && [0, 1.5, 3].forEach(($, T) => d.push({ b: B + $, i: "stones", m: l([0, 2, 4][T] + A % 2) - 12, d: 1, v: 0.6 }));
    else {
      const $ = A % 8 < 4 ? 0 : A % 8 < 6 ? -2 : 5, T = [$, $ + 7, $ + 12, $ + 16];
      o() < R + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((w, O) => d.push({ b: B + O * 0.5, i: "lyre", m: 50 + T[w], d: 0.5, v: 0.6 })), d.push({ b: B, i: "drum", m: 38, d: 1, v: 0.8 }), c && d.push({ b: B + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: B + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), A % 8 === 0 && d.push({ b: B, i: "bells", m: 74 + $, d: 2, v: 0.7 }), A % 8 === 6 && o() < 0.7 && d.push({ b: B, i: "horn", m: 45 + (o() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    }
  }), { bpm: f, beats: v.length * 4, notes: d };
}
class Ed {
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
    K.ready(() => {
      const t = K.ctx, s = K.out("music");
      this.base = t.createGain(), this.tens = t.createGain(), this.batt = t.createGain();
      for (const a of [this.base, this.tens, this.batt]) a.connect(s);
      this.tens.gain.value = this.batt.gain.value = 0, setInterval(() => this.tick(), 200), this.mode === "menu" && this.startMenu();
    });
  }
  /** tela inicial: o tema em laço */
  menu() {
    this.mode !== "menu" && (this.mode = "menu", this.startMenu());
  }
  startMenu() {
    K.ctx && (this.clear(), this.enqueue(ao(), K.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, s) {
    this.getEra = t, this.getSeason = s, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, K.ctx && (this.clear(), this.nextStart = K.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, s, a) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => a, this.pieceN = s, this.seed = 7, K.ctx && (this.clear(), this.nextStart = K.now + 0.5);
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
    const t = K.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, s) {
    const a = 60 / t.bpm;
    for (const i of t.notes) this.queue.push({ t: s + i.b * a, n: i, spb: a, out: "base" });
    this.queue.sort((i, o) => i.t - o.t), this.qi = 0, this.pieceEnd = s + t.beats * a;
  }
  tick() {
    if (!K.running || !this.base) return;
    const t = K.now, s = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(ao(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const i = jr(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(i, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < s; ) {
      const i = this.queue[this.qi++];
      i.t >= t - 0.05 && Lr(K.ctx, this.base, Math.max(i.t, t), i.n, i.spb);
    }
    const a = K.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const i = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < s; ) {
        const o = this.layerT, n = Math.round(o / i % 4);
        this.tension > 0.02 && _e(a, this.tens, o, le(33), 0.8), this.battle > 0.02 && (_e(a, this.batt, o, le(n % 2 ? 43 : 38), 0.9), _e(a, this.batt, o + i / 2, le(48), 0.55), ti(a, this.batt, o + i / 4, 0.8), ti(a, this.batt, o + i * 0.75, 0.8)), this.layerT += i;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, s = 0) {
    const a = K.ctx, i = K.out("alert");
    if (!a || !i || !K.voice(3)) return;
    const o = a.currentTime + 0.05;
    if (K.duck(0.7, 3.5), t === "age") {
      for (let r = 0; r < 6; r++) _e(a, i, o + r * 0.12, le(38 + r % 2 * 5), 0.5 + r * 0.08);
      [0, 4, 7, 12].map((r) => pa + r + (s >= 2 ? 0 : -12)).forEach((r, l) => s >= 2 ? eo(a, i, o + 0.75 + l * 0.22, le(r - 12), 0.3, 1.4) : fa(a, i, o + 0.75 + l * 0.2, le(r + 12), 0.3, 1.2)), s >= 2 ? to(a, i, o + 1.6, le(74), 1.2) : _e(a, i, o + 1.6, le(38), 1);
    } else if (t === "victory") {
      [0, 4, 7, 12, 7, 12].forEach((n, r) => eo(a, i, o + r * 0.25, le(50 + n), r === 5 ? 1.2 : 0.22, 1.3));
      for (let n = 0; n < 8; n++) _e(a, i, o + n * 0.125, le(38 + n % 2 * 5), 0.7);
      to(a, i, o + 1.3, le(74), 1.3);
    } else
      [12, 10, 7, 5, 3, 0].forEach((n, r) => fa(a, i, o + r * 0.35, le(pa + n), r === 5 ? 1.4 : 0.32, 0.9)), _e(a, i, o + 2.1, le(38), 0.6);
  }
}
const Jt = new Ed(), Ci = { theme: ao, eraPiece: jr, play: Lr };
class Hr {
  constructor() {
    m(this, "loops", {});
    m(this, "wf", null);
    m(this, "t", null);
    m(this, "next", {});
    m(this, "seed", 1);
  }
  start() {
    const t = K.ctx, s = K.out("amb");
    if (!t || !s || this.loops.wind) return;
    const a = (i, o) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(s), this.loops[i] = { g: n, stop: o(n) };
    };
    a("wind", (i) => {
      const o = Na(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const c = t.createGain(), h = t.createOscillator(), f = t.createGain();
      return c.gain.value = 0.75, h.frequency.value = 0.11, f.gain.value = 0.25, h.connect(f).connect(c.gain), o.connect(n).connect(c).connect(i), r.start(), h.start(), () => {
        o.stop(), r.stop(), h.stop();
      };
    }), a("water", (i) => {
      const o = Na(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), c = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, c.gain.value = 0.2, l.connect(c).connect(r.gain), o.connect(n).connect(r).connect(i), l.start(), () => {
        o.stop(), l.stop();
      };
    }), a("fire", (i) => {
      const o = Na(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, o.connect(n).connect(i), () => o.stop();
    }), a("market", (i) => {
      const o = Na(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 600, n.Q.value = 3;
      const r = t.createOscillator(), l = t.createGain();
      return r.frequency.value = 3.3, l.gain.value = 250, r.connect(l).connect(n.frequency), o.connect(n).connect(i), r.start(), () => {
        o.stop(), r.stop();
      };
    }), a("insects", (i) => {
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
    const t = K.now;
    for (const s in this.loops) {
      const a = this.loops[s];
      a.g.gain.setTargetAtTime(0, t, 0.3), setTimeout(() => {
        try {
          a.stop();
        } catch {
        }
      }, 1500);
    }
    this.loops = {}, this.wf = null;
  }
  /** novos alvos (4 vezes por segundo): as camadas vão até eles devagar */
  set(t) {
    this.t = t;
    const s = K.now, a = this.loops;
    if (!a.wind) return;
    const i = t.season, o = Math.min(1, Math.max(0, (t.zoom - 20) / 60)), n = {
      wind: ([0.32, 0.22, 0.48, 0.7][i] ?? 0.3) * (0.6 + o * 0.6),
      water: t.water * 0.6 * (1 - o * 0.5),
      fire: t.fire * 0.5,
      market: t.market * (t.fair ? 0.12 : 0.06),
      insects: i === 1 ? 0.012 * (1 - o * 0.5) : 0
    };
    for (const r in n) a[r]?.g.gain.setTargetAtTime(n[r], s, 1);
    this.wf && this.wf.frequency.setTargetAtTime(i === 3 ? 700 : 380, s, 2);
  }
  /** sons de vez em quando */
  tick() {
    const t = this.t, s = K.ctx, a = K.out("amb");
    if (!t || !s || !a || !K.running) return;
    const i = s.currentTime, o = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (h, f) => (this.next[h] ?? 0) > i ? !1 : (this.next[h] = i + f(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), c = [0.9, 0.6, 0.25, 0][o] * (0.4 + t.trees * 0.6);
    c > 0.05 && r("bird", () => 1.5 + n() * 4 / c) && Qi(s, a, i + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), o === 3 && r("crow", () => 9 + n() * 14) && Te["animal.crow"](s, a, i + 0.05, 0.6), o === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && Te["work.rustle"](s, a, i + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && Te["stone.hit"](s, a, i + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && Te["work.pickMetal"](s, a, i + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && Te["animal.sheep"](s, a, i + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && Te["animal.horse"](s, a, i + 0.05, 0.8 * t.stables);
  }
}
const Ns = (e, t, s) => Math.max(t, Math.min(s, e)), Tn = /* @__PURE__ */ new Map(), io = {};
function ei(e, t = 1, s = 0, a = "sfx", i = 0.07) {
  const o = K.ctx, n = K.out(a), r = Te[e];
  if (!o || !n || !r || !K.running || t < 0.01) return;
  const l = o.currentTime;
  if ((Tn.get(e) ?? -9) > l - i || !K.voice(0.35)) return;
  Tn.set(e, l), io[e] = (io[e] ?? 0) + 1;
  let c = n;
  if (s && o.createStereoPanner) {
    const h = o.createStereoPanner();
    h.pan.value = Ns(s, -1, 1), h.connect(n), c = h;
  }
  r(o, c, l + 0.01, Ns(t, 0, 1.2));
}
const Oe = (e) => K.whenRunning(() => ei(e, 1, 0, "ui", 0.04));
class Pd {
  constructor(t, s, a) {
    m(this, "amb", new Hr());
    m(this, "t", 0);
    m(this, "slow", 0);
    m(this, "raidUntil", 0);
    m(this, "animalT", 0);
    this.w = t, this.me = s, this.cam = a, K.setScene("game"), Jt.game(() => t.players[s].era, () => t.season), we.emit = (i, o, n, r) => this.at(i, o, n, r), K.ready(() => this.amb.start());
  }
  dispose() {
    we.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, s, a, i = 1) {
    if (!K.running) return;
    const o = this.w, n = o.size, r = Math.floor(s), l = Math.floor(a);
    if (r < 0 || l < 0 || r >= n || l >= n || !o.vis[this.me][l * n + r]) return;
    const c = this.cam, h = s - c.x, f = a - c.z, d = Math.hypot(h, f), u = Ns(1 - d / 22, 0, 1), g = Ns(1.25 - c.dist / 70, 0.3, 1);
    if (u < 0.05) return;
    const b = (h * Math.cos(c.yaw) - f * Math.sin(c.yaw)) / 12;
    ei(t, i * u * u * g, b);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco */
  aviso(t) {
    ei(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && K.duck();
  }
  onEvents(t) {
    const s = this.w, a = s.size;
    for (const i of t) switch (i.t) {
      case "proj":
        this.at(i.h !== void 0 ? "tower" : i.kind === "arrow" ? "bow" : i.kind === "stone" ? "sling" : "throw", i.x0 / 256, i.z0 / 256);
        break;
      case "death": {
        const o = i.x / 256, n = i.z / 256;
        this.at(i.kind >= at ? "crash" : i.owner === Mt ? "fall.animal" : "puff", o, n);
        break;
      }
      case "built":
        s.alive[i.e] && this.at("built", s.x[i.e] / 256, s.z[i.e] / 256);
        break;
      case "trained":
        s.alive[i.e] && s.owner[i.e] === this.me && this.at("trained", s.x[i.e] / 256, s.z[i.e] / 256, 0.8);
        break;
      case "tree":
        this.at("tree.fall", i.k % a + 0.5, Math.floor(i.k / a) + 0.5);
        break;
      case "res":
        s.resKind[i.k] === 0 && this.at("res.crumble", i.k % a + 0.5, Math.floor(i.k / a) + 0.5);
        break;
      case "age":
        i.player === this.me && Jt.stinger("age", i.era);
        break;
      case "end":
        Jt.stinger(this.w.resultadoDe(this.me, i));
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
  update(t, s) {
    if (K.setPaused(s), this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !K.running)) return;
    const a = this.w, i = this.me, o = a.size, n = this.cam, r = n.x, l = n.z, c = a.vis[i];
    let h = 0, f = 0, d = 0;
    for (let A = -8; A <= 8; A += 2) for (let I = -8; I <= 8; I += 2) {
      const B = Math.floor(r + I), P = Math.floor(l + A);
      if (B < 0 || P < 0 || B >= o || P >= o) continue;
      const R = P * o + B;
      d++;
      const $ = a.map.terrain[R];
      ($ === ss || $ === ks) && h++, a.map.tree[R] && f++;
    }
    let u = 0, g = 0, b = 0, k = 0, y = 0, M = 0, v = 0;
    const z = [];
    for (let A = 0; A < a.top; A++) {
      if (!a.alive[A]) continue;
      const I = a.x[A] / 256, B = a.z[A] / 256, P = Math.hypot(I - r, B - l);
      if (P > 18 || !c[Math.floor(B) * o + Math.floor(I)] && a.owner[A] !== i) continue;
      const R = Ns(1 - P / 16, 0, 1);
      if (a.kind[A] >= at) {
        if (!a.done[A]) continue;
        const $ = ct[a.kind[A] - at].key;
        $ === "center" || $ === "camp" ? u = Math.max(u, R) : $ === "forge" ? g = Math.max(g, R) : $ === "market" ? b = Math.max(b, R) : $ === "pen" ? k = Math.max(k, R) : $ === "stable" && (y = Math.max(y, R));
      } else a.kind[A] < W.length && (a.owner[A] === Mt ? P < 14 && z.push(A) : a.task[A] === Rt && (M++, a.owner[A] === i && v++), W[a.kind[A]].key === "horseman" && (y = Math.max(y, R * 0.5)));
    }
    if (this.amb.set({ season: a.season, zoom: n.dist, water: d ? Math.min(1, h / d * 3) : 0, fire: u, market: b, fair: a.fair, forge: g, pens: k, stables: y, trees: d ? Math.min(1, f / d * 2) : 0 }), this.amb.tick(), z.length && (this.animalT -= 0.25) <= 0) {
      const A = z[Math.floor(this.t * 7.7 % z.length)], I = W[a.kind[A]].key, B = I === "wolf" ? a.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${I}`;
      Te[B] && this.at(B, a.x[A] / 256, a.z[A] / 256, I === "wolf" && a.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let N = a.tick < this.raidUntil;
    if (!N && Math.floor(this.t * 4) % 4 === 0) {
      const A = a.players[i];
      for (let I = 0; I < a.top && !N; I++) if (a.isUnit(I) && a.owner[I] !== i && a.owner[I] !== Mt && (a.owner[I] === de || a.hostile(i, a.owner[I]))) {
        const B = a.x[I] / 256 - A.start.x, P = a.z[I] / 256 - A.start.z;
        B * B + P * P < 196 && (N = !0);
      }
    }
    Jt.setTension(N ? 0.6 : 0), Jt.setBattle(v > 0 ? Ns((M - 1) / 8, 0.3, 1) : 0);
  }
}
const Ur = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], Id = {
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
}, Od = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["victory", "Vitória"], ["defeat", "Derrota"]], Bd = ["Pedra", "Neolítico", "Metais"], qd = ["calma", "animada", "calma 2"], Nd = ["primavera", "verão", "outono", "inverno"];
function Rd() {
  K.install(), K.setScene("menu");
  const e = new Hr(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${Ur.map(([l, c]) => `<h2>${l}</h2>${c.map((h) => `<button data-som="${h}" title="${h}">${Id[h] ?? h}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${Bd.map((l, c) => qd.map((h, f) => `<button data-musica-teste="era:${c}:${f}">${l} · ${h}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${Od.map(([l, c]) => `<button data-vinheta="${l}">${c}</button>`).join("")}
    <h2>Ambiente</h2>${Nd.map((l, c) => `<button data-ambiente-teste="${c}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const s = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let a = { ...s }, i = 0;
  const o = (l) => {
    K.setScene("game"), e.start(), a = l, e.set(l), i || (i = window.setInterval(() => {
      e.set(a), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const c = l.target.closest("button");
    c && (K.unlock(), t.querySelectorAll("[aria-pressed]").forEach((h) => h.removeAttribute("aria-pressed")), c.setAttribute("aria-pressed", "true"), K.whenRunning(() => r(c)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = K.ctx ? K.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const c = l.dataset;
    if (c.som && ei(c.som, 1, 0, ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"].includes(c.som) ? "alert" : "sfx", 0), c.musicaTeste) {
      const h = c.musicaTeste;
      if (K.setScene(h === "tema" ? "menu" : "game"), K.setOpts({ music: Math.max(2, K.opts.music) }), h === "tema")
        Jt.stop(), Jt.menu();
      else if (h === "parar") Jt.stop();
      else if (h === "tensao") Jt.setTension(0.6);
      else if (h === "batalha") Jt.setBattle(0.9);
      else if (h === "inverno") Jt.preview(2, 0, 3);
      else {
        const [, f, d] = h.split(":").map(Number);
        Jt.setTension(0), Jt.setBattle(0), Jt.preview(f, d, 0);
      }
    }
    if (c.vinheta) {
      const [h, f] = c.vinheta.split(":");
      Jt.stinger(h, Number(f) || 0);
    }
    if (c.ambienteTeste) {
      const h = c.ambienteTeste;
      h === "parar" ? (e.set({ ...s, season: 1, trees: 0 }), a = { ...s, season: -1, trees: 0 }) : o(h === "rio" ? { ...s, season: 1, water: 1, zoom: 22 } : h === "aldeia" ? { ...s, fire: 1, forge: 1, pens: 1, zoom: 22 } : h === "feira" ? { ...s, market: 1, fair: !0, zoom: 22 } : { ...s, season: Number(h) });
    }
  }
}
async function Fd(e) {
  const s = new OfflineAudioContext(1, 176400, 44100);
  let a = 0;
  if (Te[e]) a = Te[e](s, s.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, c, h] = e.split(":"), f = c === "tema" ? Ci.theme() : Ci.eraPiece(Number(h), 1, 0, 3), d = 60 / f.bpm;
    for (const u of f.notes) u.b * d < 3.6 && Ci.play(s, s.destination, 0.01 + u.b * d, u, d);
    a = 4;
  }
  const i = await s.startRendering(), o = i.getChannelData(0);
  let n = 0, r = 0, l = 0;
  for (let c = 0; c < o.length; c++) {
    const h = Math.abs(o[c]);
    h > n && (n = h), c < Math.max(1, a) * 44100 && (r += o[c] * o[c], l++);
  }
  return { id: e, peak: n, rms: Math.sqrt(r / Math.max(1, l)), dur: a };
}
const Dd = Ur.flatMap((e) => e[1]);
Al();
const $s = new URLSearchParams(location.search), si = (e, t) => {
  const s = Number($s.get(e));
  return $s.has(e) && Number.isFinite(s) && s >= 0 ? s : t;
}, _r = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, Ao = document.getElementById("scene"), ma = fr.makeRenderer(Ao);
let nt = 0;
const Ue = 1 / _a;
let Me = _r ? 1 : 0, ai = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (Me = Math.min(2, Math.max(0, Number(e) || 0)), ai = !1);
} catch {
}
const Wr = (e) => {
  Me = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class Ld {
  /** owner: a conta dona deste jogo (o apelido; '' = sem conta). O jogo só vai para a nuvem dessa conta */
  constructor(t, s = "") {
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
    // muro desenhado (D35): os blocos na ordem do desenho, onde começa cada traço (para desfazer), a linha reta até o
    // cursor (mouse, ainda não posta) e os blocos que dá para construir (os que vão na ordem)
    m(this, "muro", []);
    m(this, "muroTracos", []);
    m(this, "muroPrevia", []);
    m(this, "wallTiles", []);
    // ── partida online (M6): sinais prontos para os aliados ──
    m(this, "sinalTipo", null);
    m(this, "ultimoSinal", /* @__PURE__ */ new Map());
    /** papéis no jogo com um amigo (D31): o meu papel vale no painel e na seleção; o que não é dele sai da seleção em grupo */
    m(this, "papelVisto");
    /** no jogo de um amigo (convidado): o jogo é do anfitrião; aqui nada é salvo, nem depois que o anfitrião sai */
    m(this, "guest", lt?.papel === "convidado");
    /** partida online (M6): nada é salvo, e os avisos da partida solo não são medidos (só o aviso amigo) */
    m(this, "naRede", !!Q);
    this.world = t, this.owner = s;
    const a = t;
    this.marco = Math.floor(a.tick / 600), this.scene = new fr(ma, a, nt), this.scene.setQuality(Me), $s.get("fog") === "0" && this.scene.setFog(!1), this.hud = new Ji(a, nt, {
      idle: () => {
        if (sa() === "combate") return;
        const n = this.own((l) => a.kind[l] === pt.villager && a.task[l] === 0 && a.state[l] === 0);
        if (!n.length) return;
        const r = n[this.idleCursor++ % n.length];
        this.select([r]), this.focus([r]);
      },
      army: () => {
        if (sa() === "logistica") return;
        const n = this.own((r) => a.kind[r] !== pt.villager);
        this.select(n), this.focus(n);
      },
      home: () => {
        const n = a.players[nt].start;
        this.scene.camera.tx = n.x, this.scene.camera.tz = n.z;
      },
      menu: () => this.pause(),
      keepKind: (n) => {
        for (const r of [...this.sel]) a.kind[r] !== n && this.sel.delete(r);
      },
      clear: () => {
        this.sel.clear(), this.setMode("normal");
      },
      stop: () => {
        const n = this.own((r) => this.sel.has(r));
        n.length && this.send({ type: "stop", player: nt, ids: n });
      },
      food: (n) => {
        const r = this.own((l) => this.sel.has(l) && a.kind[l] === pt.villager);
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
      undoWall: () => this.muroDesfaz(),
      cancelMode: () => this.setMode("normal"),
      jump: (n, r) => {
        this.scene.camera.tx = n, this.scene.camera.tz = r;
      },
      sinal: (n) => {
        this.sinalTipo = n, this.hud.setSinal(n), this.setMode("sinal");
      }
    }, _r, this.sel), this.minimap = new Wh(this.hud.minimap, a, nt, this.scene.camera), this.snd = new Pd(a, nt, this.scene.camera), this.input = new Gh(Ao, a, nt, this.scene.camera, this.hud.box, {
      onCommand: (n) => {
        if (this.mode !== "normal") return;
        const { cmds: r, ping: l } = Jh(a, nt, [...this.sel], n), c = r.filter((h) => this.send(h));
        c.length && Fa(c[0].type === "attack" ? a.owner[c[0].target] === Mt ? "cacar" : "atacar" : c[0].type === "gather" ? "coletar" : c[0].type === "work" ? "trabalhar" : "mover"), c.length && (this.scene.ping(n.x, n.z, l), Oe(l === "attack" ? "order.attack" : l === "work" ? "order.work" : "order.move"));
      },
      onRally: (n, r) => {
        if (this.mode === "sinal") {
          this.porSinal(n, r);
          return;
        }
        const l = this.mode === "rally" && a.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        l >= 0 && this.send({ type: "rally", player: nt, building: l, x: Math.round(n * 256), z: Math.round(r * 256) }) && (this.scene.ping(n, r, "move"), Fa("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (n, r) => this.movePlace(n, r),
      onPlaceConfirm: (n) => this.confirmPlace(n),
      onCancel: () => this.setMode("normal"),
      drawing: () => this.isMuro(),
      onDraw: (n, r, l) => this.desenha(n, r, l),
      onSelect: () => {
        this.mode === "place" && !Zh(a, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize(), this.aplicarPapel();
    const i = this.scene.camera.cam, o = i.position.clone();
    this.hud.projetor = (n, r) => (o.set(n, mt(a.map, n, r) + 0.6, r).project(i), [(o.x + 1) / 2 * innerWidth, (1 - o.y) / 2 * innerHeight, o.z < 1 && Math.abs(o.x) < 1.05 && Math.abs(o.y) < 1.05]), Q && (this.hud.setTribos(Q.nomes), Q.olhando && !oo(a) && this.scene.setFog(!1), Q.aviso && Q.aviso.ate > performance.now() && this.hud.toast(Q.aviso.texto), Q.aviso = null);
  }
  porSinal(t, s) {
    const a = Q, i = this.sinalTipo ? Xi.indexOf(this.sinalTipo) : -1;
    if (this.setMode("normal"), !a || i < 0) return;
    const o = Math.max(0, Math.min(this.world.size - 1, Math.floor(t))), n = Math.max(0, Math.min(this.world.size - 1, Math.floor(s)));
    a.conn.sinal(i, o, n), this.mostrarSinal(nt, i, o, n);
  }
  /** o sinal de um aliado (ou o meu): marca no mapa e no minimapa, o anel no chão, um aviso e um som */
  mostrarSinal(t, s, a, i) {
    const o = Xi[s], n = t === nt ? p("tribe.you") : Q?.nomes[t] || p("sala.computador");
    if (!o || a < 0 || i < 0 || a >= this.world.size || i >= this.world.size) return;
    this.hud.addMarca(a + 0.5, i + 0.5, o, n), this.minimap.marcar(a + 0.5, i + 0.5, uo[t] ?? "#fff"), this.scene.ping(a + 0.5, i + 0.5, o === "atacar" ? "attack" : o === "ajuda" ? "move" : "work");
    const r = performance.now();
    t !== nt && r - (this.ultimoSinal.get(t) ?? -1e9) > 1500 && (this.ultimoSinal.set(t, r), this.hud.toast(p("sinal.de", { name: n, sinal: p(`sinal.${o}`) }), (a + 0.5) * 256, (i + 0.5) * 256, "sinal"), Oe("soft"));
  }
  /** partida online: a minha tribo perdeu e a partida continua (posso olhar ou sair) */
  perdeuTribo() {
    !Q || this.ended || (this.setMode("normal"), this.sel.clear(), ht.showOlhar(oo(this.world)));
  }
  aplicarPapel() {
    const t = sa();
    if (t !== this.papelVisto) {
      if (this.papelVisto = t, this.hud.setPapel(t, lt?.parceiro ?? ""), this.input.papel = t, t && this.sel.size > 1)
        for (const s of [...this.sel]) ra(this.world, t, s) || this.sel.delete(s);
      this.hud.refresh();
    }
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, s = [...this.sel][0];
    if (s === void 0 || !t.alive[s] || t.owner[s] !== nt) return;
    if (t.isBuilding(s)) {
      const i = t.bdef(s).key;
      Oe(i === "pen" ? "animal.sheep" : i === "stable" ? "animal.horse" : i === "forge" ? "work.pickMetal" : i === "market" ? "soft" : "sel.building");
      return;
    }
    const a = t.kind[s];
    Oe(a === pt.villager ? "sel.villager" : a === pt.dog ? "animal.dog" : a === pt.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const s = this.world, a = [];
    for (let i = 0; i < s.top; i++) s.isUnit(i) && s.owner[i] === nt && t(i) && a.push(i);
    return a;
  }
  select(t) {
    this.sel.clear();
    for (const s of t) this.sel.add(s);
    this.setMode("normal");
  }
  focus(t) {
    if (!t.length) return;
    let s = 0, a = 0;
    for (const i of t)
      s += this.world.x[i] / 256, a += this.world.z[i] / 256;
    this.scene.camera.tx = s / t.length, this.scene.camera.tz = a / t.length;
  }
  setMode(t) {
    this.mode = t, t !== "place" && (this.scene.setGhost(null), this.scene.setWallGhost(null), this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.wallTiles = []), this.hud.setMode(t, this.place.ok, this.isMuro() ? this.wallTiles.length : -1, t === "place" ? this.placeKey : "", this.muro.length), this.hud.refresh();
  }
  startPlace(t) {
    if (this.placeKey = t, this.mode = "place", this.hud.resetCard(), ct[Nt[t]]?.wall) {
      this.muro = [], this.muroTracos = [], this.muroPrevia = [], this.renderMuro();
      return;
    }
    this.movePlace(this.scene.camera.x, this.scene.camera.z);
  }
  // ── muro desenhado (D35) ──
  isMuro() {
    return this.mode === "place" && !!ct[Nt[this.placeKey]]?.wall;
  }
  /** blocos de A até B, sempre encostados de lado (sem pular na diagonal) */
  wallLine(t, s, a, i) {
    const o = this.world.size, n = [s * o + t], r = Math.sign(a - t), l = Math.sign(i - s), c = a - t, h = i - s, f = Math.hypot(c, h) || 1, d = (b, k) => Math.abs((b - t) * h - (k - s) * c) / f;
    let u = t, g = s;
    for (; (u !== a || g !== i) && n.length < as * 2; )
      u === a ? g += l : g === i || d(u + r, g) <= d(u, g + l) ? u += r : g += l, n.push(g * o + u);
    return n;
  }
  /** põe o bloco (tx, tz) no muro, ligado ao último por blocos encostados de lado; `solto`: começa um pedaço novo */
  muroAte(t, s, a) {
    const i = this.world.size;
    if (t < 0 || s < 0 || t >= i || s >= i) return;
    const o = this.muro[this.muro.length - 1], n = o === void 0 || a ? [s * i + t] : this.wallLine(o % i, Math.floor(o / i), t, s).slice(1);
    for (const r of n) {
      if (this.muro.length >= as) break;
      this.muro.includes(r) || this.muro.push(r);
    }
  }
  /** o dedo (ou o mouse) desenhando: arrastar desenha à mão; tocar liga o último bloco ao tocado em linha reta */
  desenha(t, s, a) {
    if (!this.isMuro()) return;
    const i = this.world.size, o = Math.floor(s), n = Math.floor(a), r = this.muro.length;
    if (t === "start") {
      const l = this.muro[this.muro.length - 1], c = l !== void 0 && Math.abs(l % i - o) <= 1 && Math.abs(Math.floor(l / i) - n) <= 1;
      this.muroTracos.push(this.muro.length), this.muroAte(o, n, !c);
    } else t === "move" ? this.muroAte(o, n, !1) : t === "tap" && (this.muroTracos.push(this.muro.length), this.muroAte(o, n, !1));
    this.muroTracos.length && this.muroTracos[this.muroTracos.length - 1] === this.muro.length && t !== "move" && this.muroTracos.pop(), this.muro.length >= as && t !== "end" && (t !== "move" || this.muro.length !== r) ? Oe("place.bad") : this.muro.length !== r && t !== "move" && Oe("order.work"), this.muroPrevia = [], this.renderMuro();
  }
  /** desfaz o último traço */
  muroDesfaz() {
    !this.isMuro() || !this.muroTracos.length || (this.muro.length = this.muroTracos.pop(), this.muroPrevia = [], this.renderMuro());
  }
  /** a prévia: verde o que dá para construir, vermelho o que não dá (lugar ocupado); a linha até o cursor, na cor da madeira.
   *  D37: cada bloco é pago quando o coletor começa a construí-lo; para desenhar, basta o material do primeiro bloco */
  renderMuro() {
    const t = this.world, s = t.size, a = t.muroDaEra(t.players[nt].era) ?? this.placeKey, i = t.canAfford(nt, ct[Nt[a]].cost), o = this.muroPrevia.filter((l) => !this.muro.includes(l)), n = [...this.muro, ...o], r = n.map((l) => i && t.canPlace(nt, a, l % s, Math.floor(l / s)));
    this.wallTiles = this.muro.filter((l, c) => r[c]), this.place = { tx: 0, tz: 0, ok: this.wallTiles.length > 0 }, this.scene.setWallGhost(n, r, this.muro.length), this.hud.setMode("place", this.place.ok, this.wallTiles.length, this.placeKey, this.muro.length);
  }
  movePlace(t, s) {
    if (this.mode !== "place") return;
    if (this.isMuro()) {
      const l = this.world.size, c = Math.floor(t), h = Math.floor(s), f = this.muro[this.muro.length - 1];
      if (c < 0 || h < 0 || c >= l || h >= l) return;
      this.muroPrevia = f === void 0 ? [h * l + c] : this.wallLine(f % l, Math.floor(f / l), c, h).slice(1, as - this.muro.length + 1), this.renderMuro();
      return;
    }
    const a = this.world, i = ct[Nt[this.placeKey]], o = Math.round(t - i.size / 2), n = Math.round(s - i.size / 2), r = a.canPlace(nt, this.placeKey, o, n) && a.canAfford(nt, i.cost);
    this.place = { tx: o, tz: n, ok: r }, this.scene.setGhost(this.placeKey, o, n, r), this.hud.setMode("place", r, -1, this.placeKey);
  }
  confirmPlace(t) {
    const s = this.world, a = this.own((o) => this.sel.has(o) && s.kind[o] === pt.villager);
    if (this.mode !== "place" || !a.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(p("place.bad"), void 0, void 0, "place"), Oe("place.bad");
      return;
    }
    if (this.isMuro()) {
      this.send({ type: "wall", player: nt, ids: a, tiles: this.wallTiles.slice() }), Oe("place"), Fa("muralha");
      const o = this.wallTiles[0];
      this.scene.ping(o % s.size + 0.5, Math.floor(o / s.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    this.send({ type: "build", player: nt, ids: a, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), Oe("place"), Fa("construir");
    const i = ct[Nt[this.placeKey]];
    this.scene.ping(this.place.tx + i.size / 2, this.place.tz + i.size / 2, "work"), t && s.canAfford(nt, { wood: (i.cost.wood ?? 0) * 2, stone: (i.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    if (!this.ended) {
      if (Q) {
        this.setMode("normal");
        const t = Ra();
        if (t && Q.ativo && !this.paused) {
          this.paused = !0;
          const s = Q.host.turno(this.world, !0);
          s && Q.conn.turno(s), Q.conn.pausa(!0);
        }
        ht.showOnline(Me, t);
        return;
      }
      if (lt?.papel === "convidado") {
        this.setMode("normal"), ht.showGuest(lt.parceiro, Me, lt.papelConvidado);
        return;
      }
      if (this.paused = !0, this.setMode("normal"), ht.showPause(Math.floor(this.world.tick / 600), Me, this.owner, fi(), this.world.beta), rs(), lt?.papel === "anfitriao" && lt.ativo) {
        const t = lt.host.turno(this.world, !0);
        t && lt.amigo.turno(t), ii(!0);
      }
    }
  }
  resume() {
    const t = this.paused;
    this.paused = !1, ht.hide(), lt?.papel === "anfitriao" && lt.ativo && ii(!1), Q && Ra() && Q.ativo && t && Q.conn.pausa(!1);
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = Je();
    !this.owner && t && (xo("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended || this.guest || this.naRede) return "fail";
    await rs(), this.adopt();
    const { d: t, ok: s } = yn(this.world, this.owner), a = await xn(t, this.owner);
    return s || is("problema", { tipo: "aparelho" }), a === "fail" && is("problema", { tipo: "nuvem" }), a === "ok" ? s ? "both" : "cloudOnly" : s ? a === "fail" ? "localOnly" : a === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended || this.guest || this.naRede) return;
    this.adopt();
    const { d: s, ok: a } = yn(this.world, this.owner);
    !a && !t && is("problema", { tipo: "aparelho" }), xn(s, this.owner, t).then((i) => {
      i === "fail" && !t && is("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  /** ordem de quem joga: sozinho ou anfitrião, entra no jogo; no jogo de um amigo, vai para o anfitrião, que a põe no jogo */
  send(t) {
    const s = kr(this.world, sa(), t);
    if (!s) return !1;
    if (lt?.papel === "convidado") lt.amigo.ordem(Zi(s));
    else if (Q && !Ra()) {
      if (!Q.ativo) return !1;
      Q.conn.ordem(Zi(s));
    } else this.world.issue(s, !0);
    return !0;
  }
  /** o anfitrião vê onde o amigo mandou (o mesmo sinal das ordens) */
  pingAmigo(t) {
    const s = this.world, a = s.size;
    t.type === "move" || t.type === "amove" || t.type === "rally" ? this.scene.ping(t.x / 256, t.z / 256, t.type === "amove" ? "attack" : "move") : t.type === "gather" ? this.scene.ping(t.k % a + 0.5, Math.floor(t.k / a) + 0.5, "work") : (t.type === "work" || t.type === "attack") && s.alive[t.target] ? this.scene.ping(s.x[t.target] / 256, s.z[t.target] / 256, t.type === "attack" && s.owner[t.target] !== Mt ? "attack" : "work") : t.type === "build" && this.scene.ping(t.tx + 1, t.tz + 1, "work");
  }
  /** câmera e seleção, para continuar iguais quando o jogo recarrega (o amigo entrou ou pediu o jogo de novo) */
  view() {
    const t = this.scene.camera;
    return { tx: t.tx, tz: t.tz, yaw: t.tyaw, dist: t.tdist, sel: [...this.sel] };
  }
  setView(t) {
    const s = this.scene.camera;
    s.x = s.tx = t.tx, s.z = s.tz = t.tz, s.yaw = s.tyaw = t.yaw, s.dist = s.tdist = t.dist;
    for (const a of t.sel) this.world.isUnit(a) && this.world.owner[a] === nt && this.sel.add(a);
  }
  /** convidado: anda até o passo que o anfitrião já mandou (mais depressa quando fica para trás) e confere a partida */
  seguir(t, s) {
    const a = this.world, i = s.guest, o = i.ate - a.tick;
    if (o > 0) {
      this.acc += t * (s.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= Ue && a.tick < i.ate && r < 40; )
        a.step(), i.depoisDoPasso(a), this.acc -= Ue, r++;
    }
    a.tick >= i.ate && (this.acc = Math.min(this.acc, Ue * 0.95));
    const n = !s.pausado && performance.now() - s.ultimoTurno > 4e3;
    n !== s.parado && !s.amigo.reconectando && (s.parado = n, this.hud.setFaixa(n ? p("amigo.espera") : s.pausado ? p("amigo.pausado") : null)), (i.divergiu || i.ate - a.tick > 600) && !s.pediu && (s.pediu = !0, s.amigo.pedir(), this.hud.setFaixa(p("amigo.sincronizando")), Lt("amigo", { acao: "sincronizou", papel: "convidado" }));
  }
  /** partida online, quem não dá o ritmo: como o convidado do jogo com um amigo */
  seguirOnline(t, s) {
    const a = this.world, i = s.guest, o = i.ate - a.tick;
    if (o > 0) {
      this.acc += t * (s.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= Ue && a.tick < i.ate && r < 40; )
        a.step(), i.depoisDoPasso(a), this.acc -= Ue, r++;
    }
    a.tick >= i.ate && (this.acc = Math.min(this.acc, Ue * 0.95));
    const n = !s.pausado && performance.now() - s.ultimoTurno > 4e3;
    n !== s.parado && !s.conn.reconectando && (s.parado = n, this.hud.setFaixa(n ? p("online.esperaAnf", { name: s.nomes[s.anf] || "" }) : s.pausado ? p("online.pausado", { name: s.nomes[s.anf] || "" }) : null)), (i.divergiu || i.ate - a.tick > 600) && !s.pediu && (s.pediu = !0, s.conn.pedir(), this.hud.setFaixa(p("online.sincronizando")));
  }
  frame(t) {
    const s = this.world, a = lt, i = a?.papel === "anfitriao" && a.ativo ? a.host : null, o = Q, n = o && o.ativo && o.anf === o.eu ? o.host : null;
    if (a?.papel === "convidado")
      a.ativo && this.seguir(t, a);
    else if (o && !n)
      o.ativo && this.seguirOnline(t, o);
    else if (!this.paused) {
      this.acc += t;
      let c = 0;
      for (; this.acc >= Ue && c < 4; )
        s.step(), i?.depoisDoPasso(s), n?.depoisDoPasso(s), this.acc -= Ue, c++;
      c === 4 && (this.acc = 0);
    }
    if (i) {
      const c = i.turno(s);
      c && a.amigo.turno(c);
    }
    if (n) {
      const c = n.turno(s);
      c && o.conn.turno(c);
    }
    const r = s.drain();
    if (r.length) {
      this.scene.consume(r), this.hud.onEvents(r), this.snd.onEvents(r);
      for (const c of r)
        (c.t === "tree" || c.t === "res" && s.resKind[c.k] === 0) && this.minimap.clearTile(c.k), c.t === "age" && c.player === nt && !this.guest && !this.naRede && Lt("era_nova", { era: c.era, min: ki(s.tick) }), c.t === "msg" && c.player === nt && !this.guest && !this.naRede && this.medir(c.key), c.t === "msg" && c.player === nt && c.key === `defeated.${nt}` && this.naRede && s.outcome === "playing" && this.perdeuTribo(), c.t === "end" && !this.ended && this.end(s.resultadoDe(nt, c));
    }
    this.input.update(t);
    for (const c of [...this.sel]) s.alive[c] || this.sel.delete(c);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / Ue, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && !this.guest && !this.naRede && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const l = Math.floor(s.tick / 600);
    if (!this.ended && !this.guest && !this.naRede && l > this.marco) {
      for (const c of Rc) c > this.marco && c <= l && Lt("marco_partida", { min: c });
      this.marco = l;
    }
    if (!Cn && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (Cn = !0, Lt("desempenho", { fps: qc(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][Me] }))), ai && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      ai = !1;
      const c = this.autoN / this.autoT;
      c < 40 && Me < 2 && (Wr(Me + 1), this.scene.setQuality(Me), this.hud.toast(p("q.auto", { q: p(`q.${qs[Me].key}`), fps: Math.round(c) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [s, a] = t.split("."), i = this.world, o = i.players[nt].era, n = Number(a) === de ? "barbaros" : "rival";
    s === "centerDanger" ? Lt("centro_em_perigo", { por: n, era: o }) : s === "centerLost" ? this.derrotaPor = n : s === "hunger" && Lt("fome", { era: o, ano: Math.min(3, i.year) });
  }
  end(t) {
    const s = this.world;
    if (this.naRede) {
      Lt("amigo", { acao: t === "victory" ? "venceu" : "perdeu", papel: Ra() ? "anfitriao" : "convidado" }), this.ended = !0, this.setMode("normal"), ht.showEnd(t, Math.floor(s.tick / 600), s.players[nt].era, Q?.modo === 2 ? "time" : "tribo");
      return;
    }
    this.guest || (t === "victory" ? Lt("fim_vitoria", { era: s.players[nt].era, min: ki(s.tick) }) : Lt("fim_derrota", { por: this.derrotaPor || "rival", min: ki(s.tick) }), ko(this.owner), dd(this.owner)), this.ended = !0, this.setMode("normal"), ht.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[nt].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let q = null, lt = null;
const Gr = (e, t, s = null) => ({ amigo: e, papel: t, parceiro: "", ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), host: new qr(), guest: new Nr(), papelConvidado: s });
function sa() {
  const e = lt;
  return !e || !e.papelConvidado ? null : e.papel === "convidado" ? e.papelConvidado : e.ativo ? ui(e.papelConvidado) : null;
}
function ii(e) {
  const t = lt;
  t?.papel === "anfitriao" && t.amigo.pausa(e, Rh(t.papelConvidado));
}
const oi = (e, t) => ht.setConvite({ estado: t, codigo: e.amigo.codigo, nome: t === "junto" ? e.parceiro : void 0, papel: e.papelConvidado ?? void 0 });
async function jd(e) {
  if (!(!q || lt || q.ended)) {
    ht.setConvite({ estado: "criando" });
    try {
      lt = Gr(await ca.convidar(Ud), "anfitriao", e), Lt("amigo", { acao: "convidou", papel: e });
    } catch {
      ht.setConvite({ estado: "erro" });
    }
  }
}
function Hd() {
  const e = lt;
  if (!e || e.papel !== "anfitriao" || !e.papelConvidado) return;
  e.papelConvidado = ui(e.papelConvidado), e.ativo && ii(q?.paused ?? !1), oi(e, e.ativo ? "junto" : "aberto"), q?.aplicarPapel();
  const t = sa();
  t && q?.hud.toast(p("papel.agora", { papel: p(`papel.${t}`) }));
}
function Ud(e) {
  const t = lt;
  if (!(!t || t.papel !== "anfitriao"))
    switch (e.t) {
      case "codigo":
        oi(t, "aberto");
        break;
      case "entrou": {
        const s = t.ativo;
        t.parceiro = e.nome, oi(t, "junto"), Sn(!s), s || (q?.hud.toast(t.papelConvidado ? p("amigo.entrouComo", { name: e.nome, papel: p(`papel.${t.papelConvidado}`) }) : p("amigo.entrou", { name: e.nome })), Lt("amigo", { acao: "entrou", papel: "anfitriao" }));
        break;
      }
      case "saiu":
        $n(t, e.nome);
        break;
      case "ordem":
        if (t.ativo && q && !q.ended) {
          const s = q.world, a = t.host.ordemDoAmigo(s, e.d, nt, (i) => kr(s, t.papelConvidado, i));
          a && q.pingAmigo(a);
        }
        break;
      // só o que é do papel dele (D31)
      case "pede":
        t.ativo && (Sn(!1), Lt("amigo", { acao: "sincronizou", papel: "anfitriao" }));
        break;
      case "caiu":
        q?.hud.setFaixa(p("amigo.caiu"));
        break;
      case "reconectou":
        q?.hud.setFaixa(null), e.sozinho && t.ativo && $n(t, t.parceiro);
        break;
      case "erro":
        Vr(!1), ht.setConvite({ estado: "erro" });
        break;
    }
}
function $n(e, t) {
  e.ativo = !1, q && (q.world.onApplied = null, q.hud.setAmigo(null), q.hud.toast(p(e.papelConvidado ? "amigo.saiuTudo" : "amigo.saiu", { name: t })), q.aplicarPapel()), oi(e, "aberto");
}
function Sn(e) {
  const t = q, s = lt;
  if (!t || !s || t.ended) return;
  const a = JSON.stringify(yo(t.world)), i = Gs(JSON.parse(a));
  for (const n of t.world.takePendingExt()) i.issue(n, !0);
  const o = t.paused && !e;
  Ye(i, t.owner, t.view()), s.host.ligar(i), s.ativo = !0, s.amigo.jogo(a), q.hud.setAmigo(s.parceiro), q.aplicarPapel(), o ? q.pause() : ii(!1);
}
function Vr(e = !0) {
  const t = lt;
  !t || t.papel !== "anfitriao" || (lt = null, t.amigo.sair(), q && (q.world.onApplied = null, q.hud.setAmigo(null), q.hud.setFaixa(null), q.aplicarPapel()), ht.setConvite(null), e && Lt("amigo", { acao: "encerrou", papel: "anfitriao" }));
}
function _d(e) {
  lt || q || (ht.setAmigoMsg(p("amigo.entrando"), !0), lt = Gr(ca.entrar(e, Wd), "convidado"));
}
function Wd(e) {
  const t = lt;
  if (!(!t || t.papel !== "convidado"))
    switch (e.t) {
      case "oi":
        t.parceiro = e.nome, ht.setAmigoMsg(p("amigo.entrandoEm", { name: e.nome }), !0);
        break;
      case "jogo": {
        if (e.v !== la) {
          wi(p("amigo.erro.t"), p("amigo.versao"));
          return;
        }
        let s = null;
        try {
          s = Gs(e.d);
        } catch {
          s = null;
        }
        if (!s) {
          t.pediu = !0, t.amigo.pedir();
          return;
        }
        const a = !q;
        Ye(s, "", q ? q.view() : void 0), t.guest.ligar(s), t.ativo = !0, t.pediu = !1, t.parado = !1, t.ultimoTurno = performance.now(), q.hud.setAmigo(t.parceiro), q.hud.setFaixa(t.pausado ? p("amigo.pausado") : null), a && Lt("amigo", { acao: "entrou", papel: "convidado" });
        break;
      }
      case "turno":
        t.ativo && q && (t.ultimoTurno = performance.now(), t.guest.receber(q.world, e.d));
        break;
      case "pausa": {
        t.pausado = e.on, t.ultimoTurno = performance.now(), q?.hud.setFaixa(e.on ? p("amigo.pausado") : null);
        const s = Fh(e.papel);
        if (s !== t.papelConvidado) {
          const a = t.papelConvidado;
          t.papelConvidado = s, q?.aplicarPapel(), s && q && q.hud.toast(p(a ? "papel.agora" : "papel.voceE", { papel: p(`papel.${s}`) }));
        }
        break;
      }
      case "espera":
        q?.hud.setFaixa(p("amigo.espera"));
        break;
      case "voltou":
        t.ultimoTurno = performance.now(), t.parado = !1, q?.hud.setFaixa(p("amigo.sincronizando"));
        break;
      // o jogo vem de novo
      case "caiu":
        q?.hud.setFaixa(p("amigo.caiu")), Lt("amigo", { acao: "caiu", papel: "convidado" });
        break;
      case "reconectou":
        t.ultimoTurno = performance.now(), t.parado = !1, q?.hud.setFaixa(p("amigo.sincronizando"));
        break;
      // a sala avisa o anfitrião, que manda o jogo de novo
      case "fim":
        wi(p("amigo.fim.t"), p("amigo.fim")), Lt("amigo", { acao: "fim", papel: "convidado" });
        break;
      case "erro":
        wi(p("amigo.erro.t"), !e.msg || e.msg === "rede" ? p("amigo.semRede") : e.msg);
        break;
    }
}
function wi(e, t) {
  const s = lt;
  lt = null, s?.amigo.sair(), q ? (q.paused = !0, q.hud.setFaixa(null), ht.showInfo(e, t)) : ht.setAmigoMsg(t, !1);
}
let Q = null;
function Zs(e) {
  q?.hud.toast(e), Q && (Q.aviso = { texto: e, ate: performance.now() + 4e3 });
}
const Ra = () => !!Q && Q.anf === Q.eu, oo = (e) => e.players.some((t, s) => e.time(s) === e.time(nt) && !t.defeated), Kr = (e) => ({ conn: e, eu: -1, anf: 0, modo: 1, nomes: [], fora: /* @__PURE__ */ new Set(), host: new qr(), guest: new Nr(), ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), olhando: !1, aviso: null }), gs = (e) => Q?.nomes[e] || p("sala.computador");
async function Gd() {
  if (!(Q || lt || q)) {
    ht.setPartidaMsg(p("online.criando"), !0);
    try {
      Q = Kr(await ua.nova(Yr)), Lt("amigo", { acao: "criou", papel: "anfitriao" });
    } catch {
      ht.setPartidaMsg(p("online.erroCriar"), !1);
    }
  }
}
function Vd(e) {
  Q || lt || q || (ht.setPartidaMsg(p("online.entrando"), !0), Q = Kr(ua.entrar(e, Yr)));
}
function Yr(e) {
  const t = Q;
  if (t)
    switch (e.t) {
      case "sala":
        t.eu = e.sala.eu, ht.setPartidaMsg("", !1), ht.showLobby(e.sala);
        break;
      case "comeca":
        Kd(t, e.c);
        break;
      case "turno":
        t.ativo && q && t.anf !== t.eu && (t.ultimoTurno = performance.now(), t.guest.receber(q.world, e.d));
        break;
      case "jogo":
        Yd(t, e.v, e.d);
        break;
      case "pausa":
        t.anf !== t.eu && (t.pausado = e.on, t.ultimoTurno = performance.now(), q?.hud.setFaixa(e.on ? p("online.pausado", { name: gs(t.anf) }) : null));
        break;
      case "ordem":
        t.anf === t.eu && t.ativo && q && !q.ended && t.nomes[e.v] && !t.fora.has(e.v) && t.host.ordemDoAmigo(q.world, e.d, e.v);
        break;
      case "pede":
        t.anf === t.eu && t.ativo && Ha();
        break;
      case "sinal":
        q && t.ativo && q.world.aliado(nt, e.v) && q.mostrarSinal(e.v, e.tipo, e.x, e.z);
        break;
      case "caiu":
        if (!q) break;
        e.v === t.anf ? q.hud.setFaixa(p("online.esperaAnf", { name: gs(e.v) })) : Zs(p("online.caiu", { name: gs(e.v) }));
        break;
      case "voltou":
        q && (Zs(p("online.voltou", { name: gs(e.v) })), e.v === t.anf && q.hud.setFaixa(p("online.sincronizando"))), t.anf === t.eu && Ha();
        break;
      case "saiu":
        t.fora.add(e.v), q && Zs(p("online.saiu", { name: gs(e.v) })), t.anf === t.eu && t.ativo && q && !q.ended && q.world.players[e.v] && !q.world.players[e.v].ai && (q.world.issue({ type: "ia", player: e.v }, !0), Lt("amigo", { acao: "assumiu", papel: "anfitriao" }));
        break;
      case "anfitriao":
        t.anf = e.v;
        for (const s of e.fora) t.fora.add(s);
        if (e.v === t.eu) {
          if (!q || !t.ativo) {
            t.conn.cede();
            break;
          }
          for (const s of t.fora) q.world.players[s] && !q.world.players[s].ai && q.world.issue({ type: "ia", player: s }, !0);
          Zs(p("online.anfitriaoVoce")), Ha();
        } else
          t.pediu = !0, Zs(p("online.anfitriao", { name: gs(e.v) })), q?.hud.setFaixa(p("online.sincronizando"));
        break;
      case "reconectando":
        q ? q.hud.setFaixa(p("online.reconectando")) : ht.setPartidaMsg(p("online.reconectando"), !0);
        break;
      case "fim":
        no(e.motivo === "criador" ? p("sala.fechou") : p("online.fim"));
        break;
      case "erro":
        no(!e.msg || e.msg === "rede" ? p("online.semRede") : e.msg);
        break;
    }
}
function Kd(e, t) {
  e.eu = t.eu, e.anf = t.anf, e.modo = t.modo, e.nomes = t.vagas;
  for (const i of t.fora) e.fora.add(i);
  if (nt = t.eu, t.volta) {
    e.anf === e.eu ? q && e.ativo ? Ha() : e.conn.cede() : (e.pediu = !0, q?.hud.setFaixa(p("online.sincronizando")));
    return;
  }
  const s = Za[t.modo] ?? Za[1], a = new mo(t.semente, s.vagas, { humanos: Hh(t.vagas), times: s.times, difficulty: t.dif });
  Ye(a, ""), e.anf === e.eu ? e.host.ligar(a) : e.guest.ligar(a), e.ativo = !0, e.ultimoTurno = performance.now(), q?.hud.toast(p("online.voceE", { cor: p(`cor.${t.eu}`) })), e.anf === e.eu && Lt("amigo", { acao: "comecou", papel: "anfitriao" });
}
function Yd(e, t, s) {
  if (e.anf === e.eu || q?.ended) return;
  if (t !== la) {
    no(p("amigo.versao"));
    return;
  }
  let a = null;
  try {
    a = Gs(s);
  } catch {
    a = null;
  }
  if (!a) {
    e.conn.pedir();
    return;
  }
  nt = e.eu, Ye(a, "", q ? q.view() : void 0), e.guest.ligar(a), e.ativo = !0, e.pediu = !1, e.parado = !1, e.ultimoTurno = performance.now(), q.hud.setFaixa(e.pausado ? p("online.pausado", { name: gs(e.anf) }) : null);
}
function Ha() {
  const e = q, t = Q;
  if (!e || !t || e.ended) return;
  const s = JSON.stringify(yo(e.world)), a = Gs(JSON.parse(s));
  for (const n of e.world.takePendingExt()) a.issue(n, !0);
  const i = e.paused, o = ht.kind;
  Ye(a, "", e.view()), t.host.ligar(a), t.ativo = !0, t.pediu = !1, t.conn.jogo(s), i ? (q.paused = !0, o === "online" && ht.showOnline(Me, !0), t.conn.pausa(!0)) : t.conn.pausa(!1), q.hud.setFaixa(null);
}
function no(e) {
  const t = Q;
  if (Q = null, t?.conn.sair(), nt = 0, q) {
    q.paused = !0, q.hud.setFaixa(null), ht.showInfo(p("online.titulo"), e);
    return;
  }
  va(), ht.showStartOnline(vs), ht.setPartidaMsg(e, !1);
}
function Xd() {
  const e = Q;
  e && (e.ativo && Lt("amigo", { acao: "saiu", papel: e.anf === e.eu ? "anfitriao" : "convidado" }), Ua("online"));
}
let Cn = !1;
const Fa = (e) => is("ordem_primeira", { tipo: e }), Ei = (e, t) => Lt("partida_continuada", { era: e.players[nt].era, de: t });
Ao.addEventListener("webglcontextlost", () => is("problema", { tipo: "webgl" }));
const Xr = {
  cont: async () => {
    const e = vs.save;
    if (!e) return;
    if (e.from === "cloud") {
      const s = await Pr();
      let a = null;
      try {
        a = s ? Gs(s) : null;
      } catch {
        a = null;
      }
      if (a && s) {
        ed(s, e.owner), Ye(a, e.owner), Ei(a, "nuvem");
        return;
      }
      is("problema", { tipo: "carregar" });
    }
    const t = sd(e.owner);
    if (!t) {
      is("problema", { tipo: "carregar" }), ko(e.owner), va();
      return;
    }
    if (e.adopt) {
      const s = Je();
      if (s) {
        xo("", s), Ye(t, s), Ei(t, "aparelho");
        return;
      }
    }
    Ye(t, e.owner), Ei(t, "aparelho");
  },
  start: (e, t, s) => {
    Ye(new mo(si("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, regras: s, testUnits: Math.min(600, si("units", 0)) }), Je()), Lt("partida_nova", { rivais: e, dif: Nc[t] ?? "normal" });
  },
  resume: () => q?.resume(),
  save: () => q?.save() ?? Promise.resolve("fail"),
  quit: () => {
    q?.autoSave(), Ua();
  },
  quality: (e) => {
    Wr(e), ai = !1, q?.scene.setQuality(e);
  },
  help: () => {
    q?.resume(), q?.hud.openHelp();
  },
  watch: () => ht.hide(),
  toMenu: () => Ua(Q ? "online" : ""),
  login: () => {
    kn();
  },
  profile: () => {
    cd();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await kn(), q && Ts()) {
      const e = await q.save();
      ht.updatePause(q.owner, fi(), e);
    }
  },
  convidar: (e) => {
    jd(e);
  },
  trocarPapeis: () => Hd(),
  encerrarConvite: () => Vr(),
  entrarAmigo: (e) => _d(e),
  sairAmigo: () => {
    const e = lt;
    lt = null, e?.amigo.sair(), Ua();
  },
  criarPartida: () => {
    Gd();
  },
  entrarPartida: (e) => Vd(e),
  cfgPartida: (e, t) => Q?.conn.cfg(e, t),
  trocarVagas: (e, t) => Q?.conn.trocar(e, t),
  comecarPartida: () => Q?.conn.comecar(),
  sairPartida: () => Xd(),
  olharPartida: () => {
    ht.hide(), Q && q && (Q.olhando = !0, oo(q.world) || q.scene.setFog(!1));
  }
  // sem o time, vê o mapa inteiro
}, ht = new Xh(Xr);
function Ye(e, t, s) {
  q?.dispose(), q = new Ld(e, t), s && q.setView(s), ht.hide();
  const a = q;
  window.__amigo = () => lt && { papel: lt.papel, ativo: lt.ativo, pediu: lt.pediu, divergiu: lt.guest.divergiu, ate: lt.guest.ate, parceiro: lt.parceiro }, window.__online = () => Q && { eu: Q.eu, anf: Q.anf, ativo: Q.ativo, pediu: Q.pediu, divergiu: Q.guest.divergiu, fora: [...Q.fora], olhando: Q.olhando }, window.__origines = {
    world: e,
    scene: a.scene,
    input: a.input,
    game: a,
    screen: (i, o, n = 0.5) => {
      const r = a.scene.camera.cam.position.clone().set(i, mt(e.map, i, o) + n, o).project(a.scene.camera.cam);
      return [(r.x + 1) / 2 * innerWidth, (1 - r.y) / 2 * innerHeight, r.z < 1 ? 1 : 0];
    }
  };
}
function Ua(e = "") {
  if (lt) {
    const t = lt;
    lt = null, t.amigo.sair();
  }
  if (Q) {
    const t = Q;
    Q = null, t.conn.sair();
  }
  nt = 0, ht.setConvite(null), q?.dispose(), q = null, K.setScene("menu"), Jt.menu(), ma.setClearColor(1911332, 1), ma.clear(), va(), e === "online" && (ht.setPartidaMsg("", !1), ht.showStartOnline(vs));
}
let vs = { acc: "loading", save: null, other: null }, Pi = 0;
async function va() {
  const e = ++Pi;
  if (vs = wn(null, Ts()), ht.showStart(vs), !Ts()) return;
  const t = await hd();
  e !== Pi || ht.kind !== "start" || (await Jd(t), !(e !== Pi || ht.kind !== "start") && (vs = wn(t, !1), ht.updateStart(vs)));
}
async function Jd(e) {
  const t = Je();
  if (!t || id()) return;
  const s = ad("");
  if (s && e && !ia(t)) {
    const a = await Pr();
    a && a.seed === s.seed && s.tick >= a.tick && xo("", t);
  }
  od();
}
function wn(e, t) {
  const s = fi();
  if (s === "loading") return { acc: s, save: null, other: null };
  const a = Je();
  if (a) {
    const o = e ? ud(e) : null, n = ia(a);
    if (o && (!n || (o.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: s, save: { meta: o, from: "cloud", owner: a, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: s, save: { meta: n, from: "device", owner: a, adopt: !1 }, other: null, pending: t };
    const r = ia("");
    return { acc: s, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const i = ia("");
  return { acc: s, save: i ? { meta: i, from: "device", owner: "", adopt: !1 } : null, other: nd()[0]?.dono ?? null };
}
rd(() => {
  ht.kind === "start" ? va() : ht.kind === "pause" && q && ht.updatePause(q.owner, fi());
});
addEventListener("resize", () => {
  ma.setSize(innerWidth, innerHeight, !1), q?.resize();
});
ma.setSize(innerWidth, innerHeight, !1);
let ro = performance.now();
const Jr = () => q?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  ro = performance.now(), document.hidden ? Jr() : rs();
});
addEventListener("pagehide", () => {
  if (Jr(), lt?.papel === "anfitriao") {
    const e = lt;
    lt = null, e.amigo.sair();
  }
  if (Q) {
    const e = Q;
    Q = null, e.conn.sair();
  }
});
let Da = 0, Ii = 0, Zr = !1;
$s.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  Zr = e;
}, step: (e) => q?.frame(e) });
function Qr(e) {
  const t = Math.min(0.1, (e - ro) / 1e3);
  ro = e, q && !Zr && q.frame(t), Ii++, Da += t, Da > 1 && (window.__fps = Ii / Da, Ii = 0, Da = 0), requestAnimationFrame(Qr);
}
requestAnimationFrame(Qr);
const tl = $s.get("sons") === "1" || location.hash === "#sons";
K.install();
tl || Jt.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && Oe(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: Dd, measure: Fd, audio: K, played: io, music: Jt };
tl ? Rd() : $s.get("autostart") === "1" ? Xr.start(Math.min(3, Math.max(1, si("players", 4) - 1)), Math.min(2, si("difficulty", 1)), $s.get("regras") === "beta" ? "beta" : "normal") : (va(), ld());
Yh().then((e) => ht.setAmigoDisponivel(e));
bd().then((e) => ht.setOnlineDisponivel(e));
const Oi = document.getElementById("loading");
Oi && (Oi.style.opacity = "0", setTimeout(() => Oi.remove(), 450));
