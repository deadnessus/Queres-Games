var Xo = Object.defineProperty;
var Yo = (e, t, s) => t in e ? Xo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var m = (e, t, s) => Yo(e, typeof t != "symbol" ? t + "" : t, s);
import { C as Tt, M as Ns, a as Zo, R as Qo, P as Qs, V as rt, B as Kt, b as le, c as Jo, S as Li, D as tn, I as Ui, d as ma, e as je, f as Ot, g as ye, F as we, E as Gi, Q as Na, h as qt, G as Ze, i as vt, T as en, j as ga, k as Ft, l as Hi, m as Se, n as _i, o as Fa, p as Wi, q as sn, r as an, s as on, t as nn, U as rn, L as ln, u as cn, H as hn, v as dn, w as un, W as fn, A as pn, x as mn } from "./three-DvEW5KnM.js";
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
const D = 256;
function Me(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const ue = (e, t) => Math.trunc(e / t), Di = 10, ji = 2, cs = [30, 60, 90, 115, 135, 150], ze = ["food", "wood", "stone", "metal", "coins"], _ = [
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
], Q = Object.fromEntries(_.map((e, t) => [e.key, t])), tt = 60, et = 100, dt = [
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
], wt = Object.fromEntries(dt.map((e, t) => [e.key, t])), La = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], Ae = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 }
  // Era IV: chega no M3
], Ce = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], Pt = 200, ba = Object.fromEntries(Ce.map((e, t) => [e.key, t])), Qt = { give: 100, get: 60, fair: 85 }, gn = 300, Us = ["food", "wood", "stone", "metal"], Re = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28 }, bn = 10, yn = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], te = 6, it = -1, Vt = 60 * Di;
function Te(e, t, s) {
  let a = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(s | 0, 1442695041) | 0;
  return a = Math.imul(a ^ a >>> 13, 1274126177), ((a ^ a >>> 16) >>> 0) / 4294967296;
}
const Xa = (e) => e * e * (3 - 2 * e);
function vn(e, t, s) {
  const a = Math.floor(e), i = Math.floor(t), o = e - a, n = t - i, r = Xa(o), l = Xa(n), h = Te(a, i, s), c = Te(a + 1, i, s), u = Te(a, i + 1, s), d = Te(a + 1, i + 1, s);
  return h + (c - h) * r + (u - h) * l + (h - c - u + d) * r * l;
}
function Ue(e, t, s, a = 4) {
  let i = 0, o = 0.5, n = 1, r = 0;
  for (let l = 0; l < a; l++)
    i += o * vn(e * n, t * n, s + l * 31), r += o, o *= 0.5, n *= 2.03;
  return i / r;
}
const He = (e, t, s) => e < t ? t : e > s ? s : e, fe = (e, t, s) => {
  const a = He((s - e) / (t - e), 0, 1);
  return a * a * (3 - 2 * a);
}, ts = (e, t, s) => e + (t - e) * s;
class Vi {
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
const is = 0, Gs = 1, Ve = 2, ge = 3, $e = 4, Ki = 1, ya = 2, Xi = 3, $t = 1, se = 2, Wt = 3, Yt = 1.4142135623730951, Hs = 1.7320508075688772, ys = (e, t) => Math.sqrt(e * e + t * t), Yi = { 2: [0, 1], 3: [0.5, Hs / 2], 4: [Yt / 2, Yt / 2] }, kn = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Hs / 2], [-1, 0], [0.5, -Hs / 2]],
  4: [[Yt / 2, Yt / 2], [-Yt / 2, Yt / 2], [-Yt / 2, -Yt / 2], [Yt / 2, -Yt / 2]]
};
function Ya(e, t, s) {
  const [a, i] = Yi[s];
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
function Zi(e, t) {
  const s = He(t, 2, 4), a = s === 2 ? 192 : 256, i = a / 2, o = 2, n = a / o + 1, r = new Float32Array(n * n), l = a * (s === 2 ? 0.32 : 0.36), h = 13, c = a * 0.075, [u, d] = Yi[s], f = [u * l, d * l], p = [a * 0.21, a * 0.4], b = (w, E) => {
    const [R, N] = Ya(w, E, s), q = Math.sqrt(R * R + N * N);
    let F = (Ue(R * 0.02 + 7.3, N * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (Ue(R * 0.08, N * 0.08, e + 9, 2) - 0.5) * 1.2;
    const V = Math.max(Math.abs(w), Math.abs(E)) / i;
    F += fe(0.8, 0.98, V) * 20 * (0.6 + 0.4 * Ue(R * 0.04, N * 0.04, e + 3, 2));
    const X = N, at = 2.5 + (Ue(R * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (q > c * 0.8) {
      let Et = 0;
      for (const Be of p) Et = Math.max(Et, 1 - fe(3, 6, Math.abs(q - Be)));
      const Je = ts(-2.2, -0.35, Et);
      F = ts(F, Math.min(F, 1), fe(at + 9, at + 3, X) * 0.75), F = ts(Je, F, fe(at, at + 6.5, X));
    }
    F = ts(-2.6, F, fe(c, c + 10, q));
    const ut = ys(R - f[0], N - f[1]);
    return F = ts(2.2, F, fe(h, h + 8, ut)), F;
  };
  for (let w = 0; w < n; w++) for (let E = 0; E < n; E++) r[w * n + E] = b(E * o - i, w * o - i);
  const g = (w, E) => {
    const R = He(w / o, 0, n - 1.001), N = He(E / o, 0, n - 1.001), q = Math.floor(R), F = Math.floor(N), V = R - q, X = N - F, K = r[F * n + q], at = r[F * n + q + 1], ut = r[(F + 1) * n + q], Et = r[(F + 1) * n + q + 1];
    return K + (at - K) * V + (ut - K) * X + (K - at - ut + Et) * V * X;
  }, y = new Uint8Array(a * a), M = new Uint8Array(a * a), v = new Uint16Array(a * a), S = [];
  for (let w = 0; w < a; w++) for (let E = 0; E < a; E++) {
    const R = g(E + 0.5, w + 0.5), N = w * a + E, q = Math.abs(g(E + 1, w + 0.5) - g(E, w + 0.5)) + Math.abs(g(E + 0.5, w + 1) - g(E + 0.5, w));
    R < -0.9 ? y[N] = ge : R < -0.05 ? y[N] = Ve : R < 0.55 ? y[N] = Gs : q > 2.2 ? y[N] = $e : y[N] = is;
  }
  const O = kn[s].map(([w, E]) => ({ x: Math.round(i + w * l), z: Math.round(i + E * l), ux: w, uz: E })), T = (w, E, R) => O.some((N) => ys(w - N.x, E - N.z) < R);
  for (let w = 1; w < a - 1; w++) for (let E = 1; E < a - 1; E++) {
    const R = w * a + E;
    if (y[R] !== is) continue;
    const [N, q] = Ya(E + 0.5 - i, w + 0.5 - i, s), F = ys(N, q);
    let V = Ue(N * 0.045 + 13, q * 0.045 - 7, e + 5, 3);
    const X = ys(N - u * (l + 18), q - d * (l + 18));
    V += fe(16, 6, X) * 0.35, V += fe(14, 8, q) * -0.25, F < c + 10 && (V -= 0.3);
    const K = g(E + 0.5, w + 0.5);
    V > 0.585 && !T(E, w, 15) && Te(Math.round(N * 4), Math.round(q * 4), e + 77) > 0.12 ? (M[R] = K > 9 ? Xi : Te(Math.round(N * 3), Math.round(q * 3), e + 78) < 0.14 ? ya : Ki, v[R] = 100) : Te(Math.round(N * 2), Math.round(q * 2), e + 79) < 0.012 && !T(E, w, 11) && K < 8 && (M[R] = ya, v[R] = 100);
  }
  if (s === 2 || s === 4) {
    const w = (R, N) => {
      let q = Math.abs(2 * R - (a - 1)), F = Math.abs(2 * N - (a - 1));
      if (s === 4 && F > q) {
        const V = q;
        q = F, F = V;
      }
      return (F + a - 1) / 2 * a + (q + a - 1) / 2;
    };
    for (let R = 0; R < a; R++) for (let N = 0; N < a; N++) {
      const q = R * a + N, F = w(N, R);
      F !== q && (y[q] = y[F], M[q] = M[F], v[q] = v[F]);
    }
    const E = (n - 1) / 2;
    for (let R = 0; R < n; R++) for (let N = 0; N < n; N++) {
      let q = Math.abs(N - E), F = Math.abs(R - E);
      if (s === 4 && F > q) {
        const V = q;
        q = F, F = V;
      }
      r[R * n + N] = r[(F + E) * n + q + E];
    }
  }
  const A = (w, E, R) => {
    if (s === 2) return w === 0 ? [E, R] : [a - 1 - E, a - 1 - R];
    if (s === 4) {
      let X = E, K = R;
      for (let at = 0; at < w; at++) {
        const ut = X;
        X = a - 1 - K, K = ut;
      }
      return [X, K];
    }
    let N = E + 0.5 - i, q = R + 0.5 - i;
    const F = -0.5, V = Hs / 2;
    for (let X = 0; X < w; X++) {
      const K = N * F - q * V;
      q = N * V + q * F, N = K;
    }
    return [Math.floor(N + i), Math.floor(q + i)];
  }, C = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], $ = new Vi(e ^ 24301), B = (w, E, R, N) => {
    if (E < 1 || R < 1 || E >= a - 1 || R >= a - 1) return;
    const q = R * a + E;
    y[q] === ge || y[q] === Ve || S.some((F) => F.x === E && F.z === R) || (M[q] = 0, v[q] = 0, y[q] === $e && (y[q] = is), S.push({ kind: w, x: E, z: R, amount: N }));
  }, x = O[0];
  -x.uz, x.ux;
  const P = (w, E, R, N, q, F, V) => {
    const X = [];
    for (let K = 0; K < V; K++) {
      const [at, ut] = C[K % C.length];
      X.push([Math.round(w + R * (q + at) + -N * (F + ut) - 0.5), Math.round(E + N * (q + at) + R * (F + ut) - 0.5)]);
    }
    return X;
  }, L = [
    { kind: $t, amount: 125, tiles: P(x.x, x.z, x.ux, x.uz, -5, 6, 6) },
    { kind: se, amount: 350, tiles: P(x.x, x.z, x.ux, x.uz, -9, -8, 5) },
    { kind: Wt, amount: 400, tiles: P(x.x, x.z, x.ux, x.uz, -15, 14, 5) },
    { kind: Wt, amount: 800, tiles: P(i, i, x.ux, x.uz, c + 12, 0, 6) },
    { kind: se, amount: 500, tiles: P(i, i, x.ux, x.uz, c + 22, 6, 4) }
  ];
  for (let w = 0; w < s; w++) for (const E of L) for (const [R, N] of E.tiles) {
    const [q, F] = A(w, R, N);
    B(E.kind, q, F, E.amount);
  }
  for (const w of O) for (let E = -8; E <= 7; E++) for (let R = -8; R <= 7; R++) {
    if ((R + 0.5) ** 2 + (E + 0.5) ** 2 >= 50) continue;
    const N = (w.z + E) * a + w.x + R;
    M[N] = 0, v[N] = 0;
  }
  $.next();
  const I = (w, E) => w > 1 && E > 1 && w < a - 2 && E < a - 2 && (y[E * a + w] === is || y[E * a + w] === Gs) && !M[E * a + w] && !S.some((R) => R.x === w && R.z === E), U = (w, E) => {
    for (let R = 0; R < 8; R++) for (let N = -R; N <= R; N++) for (let q = -R; q <= R; q++)
      if (Math.max(Math.abs(q), Math.abs(N)) === R && I(w + q, E + N))
        return [w + q, E + N];
    return [w, E];
  }, H = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: c + 30, v: 12, n: 3, r: 6 }
  ], j = [], G = [];
  for (let w = 0; w < s; w++) {
    for (const X of H) {
      const K = X.base === "s" ? x.x : i, at = X.base === "s" ? x.z : i, [ut, Et] = P(K, at, x.ux, x.uz, X.u, X.v, 1)[0], [Je, Be] = A(w, ut, Et), ae = [];
      for (let de = 0; de < X.n; de++) {
        const [Do, jo] = C[de % C.length], [Vo, Ko] = A(w, ut + Do, Et + jo);
        ae.push(U(Vo, Ko));
      }
      j.push({ kind: X.kind, x: Je + 0.5, z: Be + 0.5, r: X.r, spots: ae });
    }
    const [E, R] = P(i, i, x.ux, x.uz, c + 36, 0, 1)[0], [N, q] = A(w, E, R), [F, V] = U(N, q);
    for (let X = -4; X <= 4; X++) for (let K = -4; K <= 4; K++) {
      const at = (V + X) * a + F + K;
      at >= 0 && at < a * a && (M[at] = 0, v[at] = 0);
    }
    G.push({ x: F, z: V, player: w });
  }
  return { size: a, seed: e, players: s, hn: n, hstep: o, heights: r, terrain: y, tree: M, wood: v, res: S, starts: O, herds: j, camps: G };
}
function J(e, t, s) {
  const a = He(t / e.hstep, 0, e.hn - 1.001), i = He(s / e.hstep, 0, e.hn - 1.001), o = Math.floor(a), n = Math.floor(i), r = a - o, l = i - n, h = e.hn, c = e.heights, u = c[n * h + o], d = c[n * h + o + 1], f = c[(n + 1) * h + o], p = c[(n + 1) * h + o + 1];
  return r + l <= 1 ? u + (d - u) * r + (f - u) * l : p + (f - p) * (1 - r) + (d - p) * (1 - l);
}
const xn = ["food", "wood", "stone", "metal"], Ke = (e) => e.season === 3, Bt = (e, t, s, a, i) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: s, x: a, z: i });
};
function Mn(e) {
  Dn(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const s = e.kind[t];
    s >= et ? Hn(e, t) : s < tt && (e.owner[t] === it ? Un(e, t) : zn(e, t));
  }
  Fn(e), Vn(e), e.tick % 50 === 25 && Xn(e);
}
function zn(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, e.foodMode[t] && On(e, t), e.task[t]) {
    case bt:
      wn(e, t);
      break;
    case ee:
      Bn(e, t);
      break;
    case mt:
      oo(e, t);
      break;
    case Oe:
      Tn(e, t);
      break;
    default:
      An(e, t);
  }
}
const _e = 0, Qi = 1, Ji = 2, to = 3;
function eo(e, t, s) {
  return _[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === s;
}
function va(e, t, s) {
  return e.isBuilding(s) ? _[e.kind[t]].siege ? _e : Ji : e.owner[s] === it ? eo(e, s, e.owner[t]) ? _e : to : e.kind[s] === Q.villager ? Qi : _e;
}
function Ua(e, t, s, a = !1, i = to) {
  const o = e.owner[t], n = _[e.kind[t]].siege;
  let r = -1, l = 99, h = 1 / 0;
  const c = (d, f) => {
    if (f >= i || f > l) return;
    const p = e.x[d] - e.x[t], b = e.z[d] - e.z[t], g = p * p + b * b;
    (f < l || g < h) && (l = f, h = g, r = d);
  };
  n || e.near(e.x[t], e.z[t], s, (d) => {
    if (d === t || !e.isUnit(d) || e.ignoreT[t] === d && e.tick < e.ignoreUntil[t]) return;
    const f = e.owner[d];
    (f === it ? !eo(e, d, o) : !e.hostile(o, f)) || c(d, f !== it && e.kind[d] === Q.villager ? Qi : _e);
  });
  const u = n ? _e : Ji;
  if ((a || n) && u < i && l > u) {
    const d = (s * D) ** 2;
    for (let f = 0; f < e.top; f++) if (e.isBuilding(f) && e.hostile(o, e.owner[f]) && !(e.ignoreT[t] === f && e.tick < e.ignoreUntil[t])) {
      const p = e.x[f] - e.x[t], b = e.z[f] - e.z[t];
      p * p + b * b < d && c(f, u);
    }
  }
  return r;
}
function so(e, t, s) {
  const a = e.state[t] === At;
  a && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = mt, e.tgt[t] = s, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = a ? 10 : 8;
}
function An(e, t) {
  if (e.kind[t] === Q.villager || (e.tick + t) % 5) return;
  const s = Ua(e, t, _[e.kind[t]].sight, e.state[t] !== At);
  s >= 0 && so(e, t, s);
}
function Tn(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const s = Ua(e, t, _[e.kind[t]].sight, !0);
    if (s >= 0) {
      e.task[t] = mt, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === ft) {
    const s = e.amx[t] - e.x[t], a = e.amz[t] - e.z[t];
    s * s + a * a > (3 * D) ** 2 && e.fails[t]++ < 6 ? e.goPoint(t, e.amx[t], e.amz[t]) : e.task[t] = gt;
  }
}
function Sn(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function ka(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.tgtTile[t] ? Sn(e, s) : e.alive[s] ? e.kind[s] === tt ? e.work[s] > 0 : e.isBuilding(s) && e.done[s] === 1 && e.bdef(s).key === "farm" && e.owner[s] === e.owner[t] : !1;
}
function xa(e, t, s = -1) {
  let a = e.tgt[t];
  const i = e.size;
  if (a < -1 && (a = -1 - a), !e.tgtTile[t] && s < 0 && a >= 0 && (s = a), e.tgtTile[t] && a >= 0 && a < i * i) {
    const o = e.carryRes[t], n = e.map.tree[a] > 0 || o === hs, r = e.resKind[a] || (o === Ee ? $t : o === _s ? se : o === Ws ? Wt : 0), l = a % i, h = (a - l) / i;
    for (const [c, u] of Xe) {
      if (c * c + u * u > 100) break;
      const d = l + c, f = h + u;
      if (d < 0 || f < 0 || d >= i || f >= i) continue;
      const p = f * i + d;
      if (!(p === s || !e.open(p)) && (n ? e.map.tree[p] && e.resAmt[p] > 0 : r && e.resKind[p] === r && e.resAmt[p] > 0))
        return e.tgt[t] = p, e.tgtTile[t] = 1, e.phase[t] = Xt, e.fails[t] = 0, e.goNear(t, p, !0), !0;
    }
  } else if (a >= 0 && e.kind[a] === tt || e.carryRes[t] === Ee) {
    let o = -1, n = (10 * D) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== s && e.alive[r] && e.kind[r] === tt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], h = e.z[r] - e.z[t], c = l * l + h * h;
      c < n && (n = c, o = r);
    }
    if (o >= 0)
      return e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = Xt, e.goNear(t, o, !1), !0;
  }
  return !1;
}
function Ga(e, t) {
  const s = e.owner[t];
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === s && e.done[o] && e.bdef(o).drop) {
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function Fs(e, t) {
  const s = Ga(e, t);
  if (e.dropB[t] = s, s < 0) {
    e.task[t] = gt;
    return;
  }
  e.phase[t] = bs, e.fails[t] = 0, e.goNear(t, s, !1);
}
function Cn(e, t, s) {
  const a = e.tgt[t];
  let i;
  s ? i = Re.farm : e.tgtTile[t] ? e.map.tree[a] ? i = Re.wood : i = e.resKind[a] === $t ? Re.berry : e.resKind[a] === se ? Re.stone : Re.metal : i = Re.carcass;
  let o = Math.round(i * 1e3);
  return e.players[e.owner[t]]?.hunger && (o = Math.floor(o * 7 / 10)), e.players[e.owner[t]]?.ai && (o = Math.floor(o * [80, 100, 115][e.difficulty] / 100)), o;
}
function wn(e, t) {
  if (e.phase[t] === bs) {
    En(e, t);
    return;
  }
  if (!ka(e, t)) {
    e.carry[t] > 0 ? Fs(e, t) : xa(e, t) || (e.task[t] = gt);
    return;
  }
  const s = e.tgt[t], a = e.tgtTile[t] === 1, i = !a && e.kind[s] >= et, o = e.reach(t, s, a);
  if (e.phase[t] === Xt) {
    if (o <= (i ? 60 : a ? 330 : 220))
      e.phase[t] = uo, e.state[t] = ft, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === ft && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, s, a) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - s, xa(e, t, s) || (e.task[t] = gt);
      }
    }
    return;
  }
  if (o > (i ? 140 : a ? 420 : 300)) {
    e.phase[t] = Xt, e.goNear(t, s, a);
    return;
  }
  if (i && Ke(e)) return;
  if (a && e.resKind[s] === $t && Ke(e)) {
    e.carry[t] > 0 ? Fs(e, t) : e.task[t] = gt;
    return;
  }
  const n = a ? e.map.tree[s] ? hs : e.resKind[s] === $t ? Ee : e.resKind[s] === se ? _s : Ws : Ee;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += Cn(e, t, i);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = i ? 1e9 : a ? e.resAmt[s] : e.work[s], h = e.carryCap(t);
  r = Math.min(r, l, h - e.carry[t]), r > 0 && (e.carry[t] += r, i || (a ? e.resAmt[s] -= r : e.work[s] -= r, (a ? e.resAmt[s] : e.work[s]) <= 0 && $n(e, s, a))), (e.carry[t] >= h || !ka(e, t) && e.carry[t] > 0) && Fs(e, t);
}
function $n(e, t, s) {
  if (!s) {
    e.remove(t);
    return;
  }
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.blocked[t] = 0, e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.blocked[t] = 0, e.events.push({ t: "res", k: t });
}
function En(e, t) {
  let s = e.dropB[t];
  if (s < 0 || !e.isBuilding(s) || !e.done[s] || e.owner[s] !== e.owner[t]) {
    if (s = Ga(e, t), e.dropB[t] = s, s < 0) {
      e.task[t] = gt;
      return;
    }
    e.goNear(t, s, !1);
  }
  if (e.reach(t, s, !1) <= 200) {
    const a = e.players[e.owner[t]];
    if (a && (a.res[xn[e.carryRes[t]]] += e.carry[t]), e.carry[t] = 0, e.state[t] = ft, e.path[t] = null, e.foodMode[t] && !io(e, t)) {
      const i = za(e, t);
      if (i) {
        Aa(e, t, i);
        return;
      }
    }
    ka(e, t) ? (e.phase[t] = Xt, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : xa(e, t) || (e.task[t] = gt);
    return;
  }
  e.state[t] === ft && (++e.fails[t] > 5 ? e.task[t] = gt : e.goNear(t, s, !1));
}
const In = 30, Za = 0, Pn = 1, Ma = 2, ao = 3;
function io(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.task[t] === mt ? e.isAnimal(s) && (_[e.kind[s]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[s] === $t && e.resAmt[s] > 0 && !Ke(e) : e.alive[s] ? e.kind[s] === tt ? e.work[s] > 0 : e.isBuilding(s) && e.bdef(s).key === "farm" && !Ke(e) : !1;
}
function za(e, t) {
  const s = e.owner[t], a = Ke(e), i = e.size, o = Ga(e, t), n = o >= 0 ? e.x[o] : e.x[t], r = o >= 0 ? e.z[o] : e.z[t], l = (In * D) ** 2, h = (g, y) => {
    const M = g - n, v = y - r;
    return M * M + v * v <= l;
  }, c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (let g = 0; g < e.top; g++) if (g !== t && e.isUnit(g) && e.owner[g] === s && e.kind[g] === Q.villager && e.tgt[g] >= 0 && (e.task[g] === bt || e.task[g] === mt)) {
    const y = e.task[g] === bt && e.tgtTile[g] ? u : c;
    y.set(e.tgt[g], (y.get(e.tgt[g]) ?? 0) + 1);
  }
  let d = -1, f = 1 / 0, p = Za;
  const b = (g, y, M, v) => {
    const S = y - e.x[t], O = M - e.z[t], T = S * S + O * O;
    T < f && (f = T, d = g, p = v);
  };
  for (let g = 0; g < e.top; g++) e.alive[g] && e.kind[g] === tt && e.work[g] > 0 && (c.get(g) ?? 0) < 4 && h(e.x[g], e.z[g]) && b(g, e.x[g], e.z[g], Za);
  if (d >= 0) return { t: d, how: p };
  if (!a) {
    for (let g = 0; g < e.top; g++) e.isBuilding(g) && e.owner[g] === s && e.done[g] && e.bdef(g).key === "farm" && !c.has(g) && b(g, e.x[g], e.z[g], Pn);
    if (d >= 0) return { t: d, how: p };
    for (const g of e.map.res) {
      const y = g.z * i + g.x;
      if (e.resKind[y] !== $t || e.resAmt[y] <= 0 || (u.get(y) ?? 0) >= 2 || !e.open(y)) continue;
      const M = g.x * D + 128, v = g.z * D + 128;
      h(M, v) && b(y, M, v, Ma);
    }
    if (d >= 0) return { t: d, how: p };
  }
  for (let g = 0; g < e.top; g++) e.isAnimal(g) && _[e.kind[g]].animal.mode === "flee" && (c.get(g) ?? 0) < 2 && h(e.x[g], e.z[g]) && b(g, e.x[g], e.z[g], ao);
  return d >= 0 ? { t: d, how: p } : null;
}
function Aa(e, t, s) {
  if (e.fails[t] = 0, e.phase[t] = Xt, e.tgt[t] = s.t, s.how === ao) {
    e.task[t] = mt, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, s.t, !1);
    return;
  }
  e.task[t] = bt, e.tgtTile[t] = s.how === Ma ? 1 : 0, e.goNear(t, s.t, s.how === Ma);
}
function On(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const s = e.task[t];
  if (s === gt) {
    if (e.state[t] === ft) {
      const i = za(e, t);
      i && Aa(e, t, i);
    }
    return;
  }
  if (s !== bt || e.phase[t] === bs || io(e, t)) return;
  const a = za(e, t);
  a && (e.carry[t] > 0 && e.carryRes[t] !== Ee ? Fs(e, t) : Aa(e, t, a));
}
function Bn(e, t) {
  const s = e.tgt[t];
  if (!e.isBuilding(s) || e.owner[s] !== e.owner[t]) {
    e.task[t] = gt;
    return;
  }
  if (e.done[s]) {
    if (e.bdef(s).key === "farm" && !qn(e, s, t))
      e.task[t] = bt, e.phase[t] = Xt, e.goNear(t, s, !1);
    else if (e.bdef(s).wall) {
      const r = Rn(e, t, s);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = gt;
    } else e.task[t] = gt;
    return;
  }
  if (e.reach(t, s, !1) > 230) {
    e.state[t] === ft && (++e.fails[t] > 5 ? e.task[t] = gt : e.goNear(t, s, !1));
    return;
  }
  e.state[t] = ft, e.path[t] = null, e.fails[t] = 0;
  const a = (e.tick & 16383) + 1, i = e.tmr[s] !== a;
  e.tmr[s] = a, e.work[s] += i ? 10 : 6;
  const o = e.bdef(s), n = o.time * 100;
  e.hp[s] = Math.max(e.hp[s], Math.floor(o.hp * Math.min(1, e.work[s] / n))), e.work[s] >= n && (e.done[s] = 1, e.hp[s] = o.hp, e.work[s] = 0, e.events.push({ t: "built", e: s }), Bt(e, e.owner[s], "built." + o.key, e.x[s], e.z[s]));
}
function Rn(e, t, s) {
  let a = -1, i = (10 * D) ** 2;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && !e.done[o] && e.owner[o] === e.owner[t] && e.bdef(o).wall) {
    const n = e.x[o] - e.x[s], r = e.z[o] - e.z[s], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function qn(e, t, s) {
  for (let a = 0; a < e.top; a++) if (a !== s && e.isUnit(a) && e.task[a] === bt && e.tgt[a] === t && !e.tgtTile[a]) return !0;
  return !1;
}
function oo(e, t) {
  let s = e.tgt[t];
  if (s < 0 || !e.alive[s] || s === t || e.kind[s] === tt || e.isUnit(s) && e.owner[s] === e.owner[t]) {
    Qa(e, t);
    return;
  }
  const a = _[e.kind[t]], i = e.kind[t] === Q.villager;
  if (!i && e.owner[t] !== it && (e.tick + t) % 5 === 0) {
    const l = va(e, t, s);
    if (l > _e) {
      const h = Ua(e, t, a.sight, !1, l);
      h >= 0 && (e.tgt[t] = s = h, e.fails[t] = 0);
    }
  }
  i && (e.amx[t] = e.x[s], e.amz[t] = e.z[s]);
  const o = a.hunt && e.owner[s] === it, n = Math.round((o ? a.hunt : a.range) * D), r = e.reach(t, s, !1);
  if (r <= n + 40) {
    e.fails[t] = 0, e.state[t] === At && (e.state[t] = ft, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (Nn(e, t, s), e.cd[t] = a.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== it) {
    const l = e.x[t] - e.rallyX[t], h = e.z[t] - e.rallyZ[t];
    if (l * l + h * h > (12 * D) ** 2) {
      e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 100, e.task[t] = gt, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === ft && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 300, Qa(e, t);
      return;
    }
    if (e.owner[t] === it) {
      const l = e.map.herds[e.herd[t]];
      if (l) {
        const h = l.x * D - e.x[t], c = l.z * D - e.z[t];
        if (h * h + c * c > (16 * D) ** 2) {
          e.task[t] = gt, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, l.x * D, l.z * D);
          return;
        }
      }
    }
    if ((a.proj || o) && r <= n + D * 2 && e.state[t] === ft) {
      e.goPoint(t, e.x[s], e.z[s]), e.fails[t]++;
      return;
    }
    !e.goNear(t, s, !1) || e.lastPartial ? e.fails[t] += 3 : e.fails[t]++;
  }
}
function Qa(e, t) {
  if (e.kind[t] === Q.villager) {
    let a = -1, i = (3 * D) ** 2;
    for (let o = 0; o < e.top; o++) if (e.alive[o] && e.kind[o] === tt) {
      const n = e.x[o] - e.amx[t], r = e.z[o] - e.amz[t], l = n * n + r * r;
      l < i && (i = l, a = o);
    }
    if (a >= 0) {
      e.task[t] = bt, e.tgt[t] = a, e.tgtTile[t] = 0, e.phase[t] = Xt, e.goNear(t, a, !1);
      return;
    }
  }
  const s = e.phase[t];
  if (s === 9 && e.owner[t] !== it) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = Oe, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = gt, e.tgt[t] = -1, e.phase[t] = 0, s === 10 && e.owner[t] !== it ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = ft, e.path[t] = null, e.field[t] = null);
}
function Nn(e, t, s) {
  const a = _[e.kind[t]];
  if (a.siege && !e.isBuilding(s)) return;
  let i = e.atkOf(t);
  if (e.isUnit(s)) {
    const n = _[e.kind[s]];
    i -= e.armorOf(s);
    for (const r of a.bonus ?? []) n.cls === r.vs && (i += r.dmg);
  }
  i = Math.max(1, i);
  const o = a.proj ?? (a.hunt && e.owner[s] === it ? "spear" : void 0);
  if (o) {
    const n = e.x[s] - e.x[t], r = e.z[s] - e.z[t], l = Me(n * n + r * r), h = Math.max(3, Math.round(l / D));
    e.projectiles.push({ target: s, dmg: i, at: e.tick + h, by: t, k: e.kind[s], o: e.owner[s] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[s], z1: e.z[s], ticks: h, kind: o, tk: e.kind[s], gap: e.reach(t, s, !1), te: s });
  } else no(e, s, i, t);
}
function Fn(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const s of e.projectiles) {
    if (s.at > e.tick) {
      t.push(s);
      continue;
    }
    e.alive[s.target] && e.kind[s.target] === s.k && e.owner[s.target] === s.o && no(e, s.target, s.dmg, s.by);
  }
  e.projectiles = t;
}
function no(e, t, s, a) {
  e.hp[t] -= s;
  const i = e.owner[t];
  if (i === it)
    e.alive[a] && (e.aggro[t] = a + 1);
  else if (e.isUnit(t) && e.alive[a]) {
    const n = e.task[t];
    e.kind[t] === Q.villager ? e.owner[a] === it && n !== mt && (e.task[t] = mt, e.tgt[t] = a, e.phase[t] = 0) : _[e.kind[t]].siege || (n === gt ? so(e, t, a) : n === Oe ? (e.task[t] = mt, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0) : n === mt && e.isUnit(a) && e.tgt[t] !== a && va(e, t, e.tgt[t]) > va(e, t, a) && (e.tgt[t] = a, e.fails[t] = 0));
  }
  const o = e.players[i];
  if (o && e.tick - o.lastAlert > 300 && e.owner[a] !== i && (o.lastAlert = e.tick, Bt(e, i, "underAttack", e.x[t], e.z[t])), o && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + s;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && Bt(e, i, "centerDanger." + e.owner[a], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && Ln(e, t, a);
}
function Ln(e, t, s) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const a = _[e.kind[t]].animal;
    a && a.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], a.food);
  } else if (e.isBuilding(t)) {
    const a = e.bdef(t).key, i = e.owner[s];
    if (a === "camp" && i >= 0 && i < e.players.length && (e.players[i].res.food += 2e4, e.players[i].res.wood += 15e3, Bt(e, i, "campLoot", e.x[t], e.z[t])), a === "center") {
      const o = e.players[e.owner[t]];
      Bt(e, e.owner[t], "centerLost." + e.owner[s]), e.remove(t), o && ro(e, o);
      return;
    }
  }
  e.remove(t);
}
function Un(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const s = _[e.kind[t]], a = s.animal, i = e.map.herds[e.herd[t]];
  if (e.task[t] === mt) {
    oo(e, t);
    return;
  }
  if (a.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === ft) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let o = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (o = e.aggro[t] - 1), o >= 0) {
        let n = e.x[t] - e.x[o], r = e.z[t] - e.z[o];
        const l = Me(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * D / l), r = Math.trunc(r * 4 * D / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
        return;
      }
    }
  } else if (a.mode === "fight") {
    if (e.aggro[t] > 0) {
      const o = e.aggro[t] - 1;
      if (e.aggro[t] = 0, e.alive[o] && e.isUnit(o)) {
        e.task[t] = mt, e.tgt[t] = o, e.fast[t] = 1;
        return;
      }
    }
  } else if ((e.tick + t) % 10 === 0) {
    const o = Gn(e, t, s.sight + (e.season === 3 ? 3 : 0));
    if (o >= 0) {
      e.task[t] = mt, e.tgt[t] = o, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === ft && i) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const o = Math.max(1, i.r) * D, n = e.rng.int(2 * o + 1) - o, r = e.rng.int(2 * o + 1) - o;
    e.goPoint(t, Math.round(i.x * D) + n, Math.round(i.z * D) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function Gn(e, t, s) {
  let a = -1, i = 1 / 0;
  return e.near(e.x[t], e.z[t], s, (o) => {
    if (!e.isUnit(o) || e.owner[o] === it) return;
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }), a;
}
function Hn(e, t) {
  if (!e.done[t]) return;
  const s = e.owner[t], a = e.players[s];
  if (!a) return;
  const i = e.bdef(t), o = i.key;
  e.queue[t].length && Wn(e, t, a), i.tower && _n(e, t, i.tower), o === "pen" && !Ke(e) && e.tick % 10 === 0 && (a.res.food += 20), o === "sanctuary" && e.tick % 20 === 0 && e.near(e.x[t], e.z[t], 6, (n) => {
    e.isUnit(n) && e.owner[n] === s && e.hp[n] < _[e.kind[n]].hp && e.hp[n]++;
  });
}
function _n(e, t, s) {
  if (e.cd[t] > 0) {
    e.cd[t]--;
    return;
  }
  if ((e.tick + t) % 3) return;
  const a = e.owner[t];
  let i = -1, o = 1 / 0;
  if (e.near(e.x[t], e.z[t], s.range + 1, (c) => {
    if (!e.isUnit(c) || !e.hostile(a, e.owner[c])) return;
    const u = e.reach(t, c, !1);
    u <= s.range * D && u < o && (o = u, i = c);
  }), i < 0) return;
  const n = Math.max(1, s.atk - e.armorOf(i)), r = e.x[i] - e.x[t], l = e.z[i] - e.z[t], h = Math.max(3, Math.round(Me(r * r + l * l) / D));
  e.projectiles.push({ target: i, dmg: n, at: e.tick + h, by: t, k: e.kind[i], o: e.owner[i] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[i], z1: e.z[i], ticks: h, kind: "arrow", tk: e.kind[i], gap: e.reach(t, i, !1), te: i, h: 3.2 }), e.cd[t] = s.cd;
}
function Wn(e, t, s) {
  if (s.hunger) return;
  const a = e.queue[t][0];
  if (a >= Pt) {
    const v = Ce[a - Pt];
    if (++e.work[t] < v.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), s.tech |= 1 << a - Pt, Bt(e, s.id, "tech." + v.key, e.x[t], e.z[t]);
    return;
  }
  const i = _[a];
  if (e.work[t] === 0 && e.pop(s.id) + i.pop > e.popCap(s.id)) {
    e.tick % 300 === 0 && Bt(e, s.id, e.popCap(s.id) >= cs[s.era] ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.work[t] < i.time * 10) return;
  e.work[t] = 0;
  const o = e.queue[t].shift(), [n, r, l] = e.footprint(t), h = e.size / 2, c = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : h, u = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : h, d = n + l / 2, f = r + l / 2, p = c - d, b = u - f, g = Math.sqrt(p * p + b * b) || 1, y = e.nearestFree(Math.round(d + p / g * (l / 2 + 1)), Math.round(f + b / g * (l / 2 + 1)));
  if (y < 0) return;
  const M = e.spawnUnit(s.id, _[o].key, y % e.size + 0.5, Math.floor(y / e.size) + 0.5);
  e.events.push({ t: "trained", e: M }), e.rallyX[t] >= 0 && e.goPoint(M, e.rallyX[t], e.rallyZ[t]);
}
function Dn(e) {
  if (e.tick === 0 || e.tick % Vt !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const s of e.players) !s.defeated && s.era >= 2 && jn(e, s.id) && Bt(e, s.id, "fair");
  if (t === 8) for (const s of e.players) Bt(e, s.id, "winterSoon");
  if (t >= 9) {
    for (const s of e.players) {
      if (s.defeated) continue;
      const a = e.pop(s.id) * (s.era <= 1 ? 1 : s.era <= 3 ? 2 : 3) * 100;
      s.res.food >= a ? (s.res.food -= a, s.hunger && (s.hunger = !1)) : (s.res.food = 0, s.hunger || Bt(e, s.id, "hunger"), s.hunger = !0);
    }
    if (t === 9) for (const s of e.players) Bt(e, s.id, "winter");
  }
  if (t === 0) for (const s of e.players)
    s.hunger = !1, Bt(e, s.id, "spring");
}
function jn(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.done[s] && e.bdef(s).market) return !0;
  return !1;
}
function Vn(e) {
  for (const t of e.players)
    if (t.aging) {
      if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
        t.aging = 0;
        continue;
      }
      if (!(--t.aging > 0)) {
        t.era++;
        for (let s = 0; s < e.top; s++) if (e.isUnit(s) && e.owner[s] === t.id) {
          const a = _[e.kind[s]].next;
          if (!a) continue;
          const i = _[e.kind[s]], o = _[Q[a]];
          e.hp[s] = Math.round(e.hp[s] * o.hp / i.hp), e.kind[s] = Q[a];
        }
        for (let s = 0; s < e.top; s++) e.isBuilding(s) && e.owner[s] === t.id && (e.queue[s] = e.queue[s].map((a) => a < Pt && _[a].next ? Q[_[a].next] : a));
        e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && Bt(e, t.id, "metalSeen");
      }
    }
}
function ro(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const s of e.players) Bt(e, s.id, "defeated." + t.id);
    for (let s = 0; s < e.top; s++) e.alive[s] && e.owner[s] === t.id && e.remove(s);
    lo(e);
  }
}
function Kn(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.bdef(s).key === "center") return !0;
  return !1;
}
function Xn(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !Kn(e, t.id) && ro(e, t);
    lo(e);
  }
}
function lo(e) {
  if (e.outcome !== "playing") return;
  const t = e.players.filter((s) => !s.ai);
  t.length && t.every((s) => s.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((s) => s.ai).every((s) => s.defeated) && e.players.some((s) => s.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
const ea = [13, 24, 30], Yn = [3, 9, 14], Ja = [42, 36, 30], Zn = [24, 16, 11], Qn = [10, 7, 5], Jn = [6, 12, 99];
function tr(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const s = e.ai[t.id];
    e.tick < s.next || (s.next = e.tick + 10, er(e, t.id, s));
  }
  nr(e);
}
function er(e, t, s) {
  const a = e.players[t], i = Math.min(a.era, 2), o = [], n = [], r = [];
  for (let A = 0; A < e.top; A++)
    !e.alive[A] || e.owner[A] !== t || (e.isBuilding(A) ? r.push(A) : e.isUnit(A) && (e.kind[A] === Q.villager ? o : n).push(A));
  const l = r.find((A) => e.bdef(A).key === "center" && e.done[A]);
  if (l === void 0) return;
  const h = (A, C = !1) => r.filter(($) => e.bdef($).key === A && (!C || e.done[$])), c = o.length + n.length, u = e.popCap(t), d = r.filter((A) => !e.done[A]), f = e.tick / Vt, p = /* @__PURE__ */ new Set(), b = (A, C, $) => {
    const B = ir(e, t, A, l, o.filter((x) => !p.has(x)), C, $);
    return B >= 0 && p.add(B), B >= 0;
  }, g = !a.aging && (a.era === 0 && o.length >= ea[0] || a.era === 1 && o.length >= ea[1] - 2 && f >= Ja[e.difficulty] - 6 && e.eraBuildingTypes(t) >= 2);
  if (o.length < ea[i] && !e.queue[l].length && c < u && !a.aging && e.issue({ type: "train", player: t, building: l, key: "villager" }), u - c <= 3 && u < cs[a.era] && !d.some((A) => e.bdef(A).key === "house") && e.tick >= s.houseCd && b("house", 5, 14) && (s.houseCd = e.tick + 150), o.length >= 6 && !h("depot").length) {
    const A = or(e, t, l, o.filter((C) => !p.has(C)));
    A >= 0 && p.add(A);
  }
  if (a.era >= 2 && h("depot").length < 2) {
    const A = ho(e, t, l, o.filter((C) => !p.has(C)), (C) => e.resKind[C] === Wt);
    A >= 0 && p.add(A);
  }
  const y = h("military");
  o.length >= 9 && !y.length && b("military", 7, 16);
  const M = y.filter((A) => e.done[A]), v = Yn[i] + (a.era ? Math.floor(f / 8) : 0), S = {};
  a.era >= 2 && (S.stone = (h("forge").length ? 0 : 60) + (h("market").length ? 0 : 40) + (h("tower").length ? 0 : 120), S.metal = (!e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0) + (h("stable", !0).length ? 35 : 0));
  const O = (A, C) => ze.every(($) => a.res[$] >= ((A[$] ?? 0) + (C[$] ?? 0)) * 100);
  if (M.length && !g && n.length < v && !e.queue[M[0]].length && c < u) {
    const A = La(dt[wt.military], a.era).filter((C) => C !== "dog" && O(_[Q[C]].cost, S));
    A.length && e.issue({ type: "train", player: t, building: M[0], key: A[e.rng.int(A.length)] });
  }
  if (a.era >= 2 && !g) {
    const A = h("stable", !0)[0], C = h("workshop", !0)[0];
    A !== void 0 && n.length < v && !e.queue[A].length && c + 2 <= u && O(_[Q.horseman].cost, { stone: S.stone, metal: !e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0 }) && e.issue({ type: "train", player: t, building: A, key: "horseman" });
    const $ = n.filter((P) => _[e.kind[P]].siege).length;
    C !== void 0 && $ < 2 && !e.queue[C].length && c + 3 <= u && e.issue({ type: "train", player: t, building: C, key: "ram" });
    const B = h("forge", !0)[0], x = h("market", !0)[0];
    if (B !== void 0 && !e.queue[B].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && a.res.metal > 3e4 && e.issue({ type: "research", player: t, building: B, key: "iron" }) : e.issue({ type: "research", player: t, building: B, key: "bronze" })), x !== void 0 && !e.queue[x].length && !e.hasTech(t, "wheel") && a.res.metal > 15e3 && e.issue({ type: "research", player: t, building: x, key: "wheel" }), x !== void 0 && (e.tick + t) % 30 === 0 && a.res.wood > (e.fair ? 5e4 : 9e4)) {
      const P = a.res.stone < 2e4 ? "stone" : a.res.metal < 25e3 ? "metal" : a.res.food < 3e4 ? "food" : null;
      P && e.issue({ type: "trade", player: t, building: x, give: "wood", get: P });
    }
  }
  a.era === 0 && !a.aging && o.length >= 10 && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Ae[0].cost) && e.issue({ type: "ageup", player: t, building: l }), a.era === 1 && !a.aging && o.length >= 18 && f >= Ja[e.difficulty] && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, Ae[1].cost) && e.issue({ type: "ageup", player: t, building: l }), a.era >= 1 && !d.length && (h("farm").length < Math.min(a.era >= 2 ? 14 : 10, Math.floor(o.length * 2 / 5)) ? b("farm", 6, 15) : h("pen").length ? !h("sanctuary").length && f > 30 ? b("sanctuary", 6, 14) : a.era >= 2 && (h("stable").length ? h("forge").length ? !h("market").length && (f > 50 || a.res.wood > 6e4) ? b("market", 7, 16) : h("tower").length ? !h("workshop").length && f > 58 && b("workshop", 7, 16) : b("tower", 5, 10) : b("forge", 6, 14) : b("stable", 7, 16)) : b("pen", 7, 16));
  const T = o.filter((A) => e.task[A] === gt && e.state[A] === ft && !p.has(A));
  if (T.length) {
    const A = [0, 0, 0, 0];
    for (const $ of o) if (e.task[$] === bt) {
      const B = e.tgt[$], x = e.tgtTile[$] ? e.map.tree[B] ? hs : e.resKind[B] === se ? _s : e.resKind[B] === Wt ? Ws : Ee : Ee;
      A[x === Ws ? 3 : x === _s ? 2 : x === hs ? 1 : 0]++;
    }
    const C = a.era === 0 ? g ? [0.8, 0.15, 0.05, 0] : [0.62, 0.3, 0.08, 0] : a.era === 1 ? g ? [0.55, 0.25, 0.2, 0] : [0.5, 0.35, 0.15, 0] : [0.42, 0.25, 0.13, 0.2];
    a.res.wood > 4e4 && (C[0] += C[1] - 0.1, C[1] = 0.1), a.res.stone > 25e3 && (C[0] += C[2], C[2] = 0), a.res.metal > 4e4 && (C[0] += C[3], C[3] = 0);
    for (const $ of T) {
      const B = A[0] + A[1] + A[2] + A[3] + 1, x = (P) => C[P] - A[P] / B;
      for (const P of [0, 1, 2, 3].sort((L, I) => x(I) - x(L) || L - I)) if (ti(e, t, $, P, l)) {
        A[P]++;
        break;
      }
    }
  }
  if (a.res.wood > 4e4 && (e.tick + t * 7) % 200 === 0) {
    const A = o.find((C) => e.task[C] === bt && e.tgtTile[C] && e.map.tree[e.tgt[C]] > 0 && !p.has(C));
    A !== void 0 && e.carry[A] === 0 && ti(e, t, A, 0, l);
  }
  if ((e.tick + t) % 30 === 0) {
    const A = sr(e, t, l, 18);
    if (A >= 0) {
      const C = n.filter(($) => e.task[$] !== Oe || !0);
      C.length && e.issue({ type: "attack", player: t, ids: C, target: A });
    }
  }
  if (s.attackAt || (s.attackAt = Zn[e.difficulty] * Vt), e.tick >= s.attackAt && n.length >= 5) {
    const A = ar(e, t, l);
    A >= 0 && e.issue({ type: "amove", player: t, ids: n.slice(0, Jn[e.difficulty]), x: e.x[A], z: e.z[A] }), s.attackAt = e.tick + Qn[e.difficulty] * Vt;
  }
}
function sr(e, t, s, a) {
  let i = -1, o = (a * D) ** 2;
  return e.near(e.x[s], e.z[s], a, (n) => {
    if (!e.isUnit(n)) return;
    const r = e.owner[n];
    if (r === t || r < 0) return;
    const l = e.x[n] - e.x[s], h = e.z[n] - e.z[s], c = l * l + h * h;
    c < o && (o = c, i = n);
  }), i;
}
function ar(e, t, s) {
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.owner[o] !== t && e.owner[o] >= 0 && e.owner[o] < e.players.length) {
    const n = !e.players[e.owner[o]].ai, r = e.x[o] - e.x[s], l = e.z[o] - e.z[s], h = (r * r + l * l) * (n && e.difficulty === 2 ? 0.6 : 1) * (1 + 0.02 * ((e.owner[o] - t + e.players.length) % e.players.length));
    h < i && (i = h, a = o);
  }
  return a;
}
function ir(e, t, s, a, i, o, n) {
  const r = dt[wt[s]];
  if (!e.canAfford(t, r.cost) || !i.length) return -1;
  const l = e.x[a] >> 8, h = e.z[a] >> 8;
  for (const [c, u] of Xe) {
    const d = c * c + u * u;
    if (d < o * o) continue;
    if (d > n * n) break;
    const f = l + c - (r.size >> 1), p = h + u - (r.size >> 1);
    if (!e.canPlace(t, s, f, p) || !co(e, f, p, r.size)) continue;
    const b = i.find((g) => e.task[g] !== ee && (e.carryRes[g] === hs || e.task[g] === gt)) ?? i.find((g) => e.task[g] !== ee) ?? i[0];
    return e.issue({ type: "build", player: t, ids: [b], key: s, tx: f, tz: p }), b;
  }
  return -1;
}
function co(e, t, s, a) {
  for (let i = s - 1; i <= s + a; i++) for (let o = t - 1; o <= t + a; o++) {
    const n = i * e.size + o;
    if (e.bAt[n]) return !1;
  }
  return !0;
}
function or(e, t, s, a) {
  return ho(e, t, s, a, (i) => e.map.tree[i] > 0);
}
function ho(e, t, s, a, i) {
  const o = dt[wt.depot];
  if (!e.canAfford(t, o.cost) || !a.length) return -1;
  const n = e.x[s] >> 8, r = e.z[s] >> 8, l = e.size;
  let h = Xe;
  if (!Xe.some(([c, u]) => {
    const d = n + c, f = r + u;
    return d >= 0 && f >= 0 && d < l && f < l && i(f * l + d);
  })) {
    let c = -1, u = 1 / 0;
    for (let d = 0; d < l * l; d += 2) if (i(d)) {
      const f = d % l, p = (d - f) / l, b = (f - n) ** 2 + (p - r) ** 2;
      b < u && (u = b, c = d);
    }
    if (c < 0) return -1;
    h = [[c % l - n, Math.floor(c / l) - r]];
  }
  for (const [c, u] of h) {
    const d = n + c, f = r + u;
    if (!(c * c + u * u < 36) && !(d < 2 || f < 2 || d >= l - 3 || f >= l - 3) && i(f * l + d))
      for (const [p, b] of [[2, 0], [-3, 0], [0, 2], [0, -3], [2, 2], [-3, -3], [2, -3], [-3, 2]]) {
        const g = d + p, y = f + b;
        if (e.canPlace(t, "depot", g, y) && co(e, g, y, 2)) {
          const M = a.find((v) => e.task[v] !== ee) ?? a[0];
          return e.issue({ type: "build", player: t, ids: [M], key: "depot", tx: g, tz: y }), M;
        }
      }
  }
  return -1;
}
function ti(e, t, s, a, i) {
  const o = e.size, n = e.x[i] >> 8, r = e.z[i] >> 8;
  if (a === 0) {
    for (let M = 0; M < e.top; M++) if (e.isBuilding(M) && e.owner[M] === t && e.done[M] && e.bdef(M).key === "farm") {
      let v = !1;
      for (let S = 0; S < e.top; S++) if (e.isUnit(S) && e.task[S] === bt && e.tgt[S] === M && !e.tgtTile[S]) {
        v = !0;
        break;
      }
      if (!v)
        return e.issue({ type: "work", player: t, ids: [s], target: M }), !0;
    }
    let f = 0;
    for (let M = 0; M < e.top; M++) e.isUnit(M) && e.owner[M] === t && e.task[M] === bt && e.tgtTile[M] && e.resKind[e.tgt[M]] === $t && f++;
    if (e.season !== 3 && f < 5) for (const [M, v] of Xe) {
      if (M * M + v * v > 196) break;
      const S = n + M, T = (r + v) * o + S;
      if (T >= 0 && T < o * o && e.resKind[T] === $t && e.resAmt[T] > 0)
        return e.issue({ type: "gather", player: t, ids: [s], k: T }), !0;
    }
    let p = -1, b = (25 * D) ** 2;
    for (let M = 0; M < e.top; M++) if (e.alive[M] && e.kind[M] === tt && e.work[M] > 0) {
      let v = 0;
      for (let A = 0; A < e.top; A++) e.isUnit(A) && e.task[A] === bt && e.tgt[A] === M && !e.tgtTile[A] && v++;
      const S = e.x[M] - e.x[i], O = e.z[M] - e.z[i], T = S * S + O * O;
      v < 4 && T < b && (b = T, p = M);
    }
    if (p >= 0)
      return e.issue({ type: "work", player: t, ids: [s], target: p }), !0;
    let g = -1, y = (28 * D) ** 2;
    for (let M = 0; M < e.top; M++) if (e.isAnimal(M) && _[e.kind[M]].animal.food > 0 && _[e.kind[M]].key !== "aurochs") {
      const v = e.x[M] - e.x[i], S = e.z[M] - e.z[i], O = v * v + S * S;
      O < y && (y = O, g = M);
    }
    return g >= 0 ? (e.issue({ type: "attack", player: t, ids: [s], target: g }), !0) : !1;
  }
  if (a === 3 && e.players[t].era < 2) return !1;
  const l = (f) => a === 1 ? e.map.tree[f] > 0 : a === 2 ? e.resKind[f] === se : e.resKind[f] === Wt;
  let h = n, c = r;
  if (a === 1) {
    for (let f = 0; f < e.top; f++) if (e.isBuilding(f) && e.owner[f] === t && e.bdef(f).key === "depot") {
      h = e.x[f] >> 8, c = e.z[f] >> 8;
      break;
    }
  }
  for (const [f, p] of Xe) {
    const b = h + f, g = c + p;
    if (b < 0 || g < 0 || b >= o || g >= o) continue;
    const y = g * o + b;
    if (l(y) && e.open(y))
      return e.issue({ type: "gather", player: t, ids: [s], k: y }), !0;
  }
  let u = -1, d = 1 / 0;
  for (let f = 0; f < o * o; f += 3) if (l(f) && e.open(f)) {
    const p = f % o, b = (f - p) / o, g = (p - h) ** 2 + (b - c) ** 2;
    g < d && (d = g, u = f);
  }
  return u >= 0 ? (e.issue({ type: "gather", player: t, ids: [s], k: u }), !0) : !1;
}
function nr(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === te) {
      const o = ei(e, i);
      o >= 0 && e.events.push({ t: "msg", player: e.owner[o], key: "raidSoon", x: e.x[i], z: e.z[i] });
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / Vt, a = Math.max(...e.players.map((i) => i.era)) >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15));
  for (let i = 0; i < e.top; i++) {
    if (!e.isBuilding(i) || e.owner[i] !== te) continue;
    const o = ei(e, i);
    if (o < 0) continue;
    const n = [];
    for (let r = 0; r < a; r++) {
      const l = e.nearestFree((e.x[i] >> 8) + r % 3 - 1, (e.z[i] >> 8) + 3 + Math.floor(r / 3));
      l < 0 || n.push(e.spawnUnit(te, "barbarian", l % e.size + 0.5, Math.floor(l / e.size) + 0.5));
    }
    for (const r of n)
      e.task[r] = Oe, e.amx[r] = e.x[o], e.amz[r] = e.z[o], e.rallyX[r] = e.x[o], e.rallyZ[r] = e.z[o];
    e.orderMove(n, e.x[o], e.z[o]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * Vt;
}
function ei(e, t) {
  let s = -1, a = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.bdef(i).key === "center" && e.owner[i] >= 0 && e.owner[i] < e.players.length && !e.players[e.owner[i]].defeated) {
    const o = e.x[i] - e.x[t], n = e.z[i] - e.z[t], r = o * o + n * n;
    r < a && (a = r, s = i);
  }
  return s;
}
const Y = 4096, ft = 0, At = 1, gt = 0, bt = 1, ee = 2, mt = 3, Oe = 4, Xt = 0, uo = 1, bs = 2, Ee = 0, hs = 1, _s = 2, Ws = 3, vs = [1, -1, 0, 0, 1, 1, -1, -1], ks = [0, 0, 1, -1, 1, -1, 1, -1], si = [10, 10, 10, 10, 14, 14, 14, 14], rr = 4294967295;
class lr {
  constructor(t, s) {
    m(this, "dist");
    this.goal = t, this.dist = new Uint32Array(s).fill(rr);
  }
}
const We = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && We.push([t, e]);
We.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const Xe = We, ai = /* @__PURE__ */ new Map();
function cr(e) {
  let t = ai.get(e);
  if (t) return t;
  const s = [];
  for (let a = -e; a <= e; a++) for (let i = -e; i <= e; i++) i * i + a * a <= e * e + e && s.push(i, a);
  return t = new Int16Array(s), ai.set(e, t), t;
}
class fo {
  constructor(t, s, a = {}) {
    m(this, "map");
    m(this, "size");
    m(this, "rng");
    m(this, "tick", 0);
    m(this, "difficulty", 1);
    m(this, "players", []);
    // entidades (estrutura de arrays)
    m(this, "alive", new Uint8Array(Y));
    m(this, "kind", new Uint8Array(Y));
    m(this, "owner", new Int8Array(Y));
    m(this, "x", new Int32Array(Y));
    m(this, "z", new Int32Array(Y));
    m(this, "px", new Int32Array(Y));
    m(this, "pz", new Int32Array(Y));
    m(this, "hp", new Int16Array(Y));
    m(this, "state", new Uint8Array(Y));
    m(this, "stuck", new Uint8Array(Y));
    m(this, "best", new Int32Array(Y));
    m(this, "slotX", new Int32Array(Y));
    m(this, "slotZ", new Int32Array(Y));
    m(this, "task", new Uint8Array(Y));
    m(this, "tgt", new Int32Array(Y));
    m(this, "tgtTile", new Uint8Array(Y));
    m(this, "phase", new Uint8Array(Y));
    m(this, "carry", new Int16Array(Y));
    m(this, "carryRes", new Uint8Array(Y));
    m(this, "cd", new Uint16Array(Y));
    m(this, "work", new Int32Array(Y));
    m(this, "done", new Uint8Array(Y));
    m(this, "sub", new Uint8Array(Y));
    m(this, "aggro", new Int32Array(Y));
    m(this, "tmr", new Int16Array(Y));
    m(this, "herd", new Int16Array(Y));
    m(this, "fast", new Uint8Array(Y));
    m(this, "amx", new Int32Array(Y));
    m(this, "amz", new Int32Array(Y));
    m(this, "fails", new Uint8Array(Y));
    m(this, "frac", new Int32Array(Y));
    m(this, "rallyX", new Int32Array(Y));
    m(this, "rallyZ", new Int32Array(Y));
    m(this, "dropB", new Int32Array(Y));
    m(this, "ignoreT", new Int32Array(Y).fill(-1));
    m(this, "ignoreUntil", new Int32Array(Y));
    // alvo inalcançável a ignorar por um tempo
    m(this, "foodMode", new Uint8Array(Y));
    // coletor no modo Buscar comida (procura comida sozinho)
    m(this, "queue", Array.from({ length: Y }, () => []));
    m(this, "field", new Array(Y).fill(null));
    m(this, "path", new Array(Y).fill(null));
    m(this, "pathI", new Uint16Array(Y));
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
    m(this, "pending", []);
    m(this, "seq", 0);
    m(this, "hashHead");
    m(this, "hashNext", new Int32Array(Y));
    m(this, "hs");
    m(this, "pushX", new Int32Array(Y));
    m(this, "pushZ", new Int32Array(Y));
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
    this.map = Zi(t, s), this.size = this.map.size, this.rng = new Vi(t), this.difficulty = a.difficulty ?? 1;
    const i = this.size * this.size;
    this.blocked = new Uint8Array(i), this.bAt = new Int16Array(i), this.resKind = new Uint8Array(i), this.resAmt = new Int32Array(i);
    for (let n = 0; n < i; n++) {
      const r = this.map.terrain[n];
      (r === ge || r === $e || this.map.tree[n]) && (this.blocked[n] = 1), this.map.tree[n] && (this.resAmt[n] = this.map.wood[n] * 100);
    }
    for (const n of this.map.res) {
      const r = n.z * this.size + n.x;
      this.resKind[r] = n.kind, this.resAmt[r] = n.amount * 100, this.blocked[r] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(i), this.aG = new Int32Array(i), this.aFrom = new Int32Array(i), this.aClosed = new Int32Array(i), this.aHeap = new Float64Array(i * 2);
    const o = a.humans ?? 1;
    this.map.starts.forEach((n, r) => {
      this.players.push({ id: r, color: yn[r], start: { x: n.x, z: n.z }, ai: r >= o, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0 }), this.vis.push(new Uint8Array(i)), this.explored.push(new Uint8Array(i)), this.spawnBuilding(r, "center", n.x - 2, n.z - 2, !0);
      for (let l = 0; l < 4; l++) this.spawnUnit(r, "villager", n.x - n.ux * 4 + (l - 1.5) * 1.1, n.z - n.uz * 4 + l % 2 * 0.8);
      this.spawnUnit(r, "dog", n.x - n.ux * 3 - n.uz * 3, n.z - n.uz * 3 + n.ux * 3), this.ai.push({ next: 20 + r * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((n, r) => {
      for (const [l, h] of n.spots) {
        const c = this.spawnUnit(it, n.kind, l + 0.5, h + 0.5);
        this.herd[c] = r, this.tmr[c] = c * 7 % 60;
      }
    });
    for (const n of this.map.camps) this.spawnBuilding(te, "camp", n.x - 2, n.z - 2, !0);
    if (this.barbNext = 12 * Vt, a.testUnits) {
      const n = this.map.starts[0];
      let r = 0;
      for (let l = 0; l < 40 && r < a.testUnits; l++) for (let h = 0; h < 20 && r < a.testUnits; h++) {
        const c = n.x - n.ux * 9 + (h - 10) * 0.9, u = n.z - n.uz * 9 - l * 0.9 * (n.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(c * D), Math.round(u * D)) || (this.spawnUnit(0, "warrior", c, u), r++);
      }
    }
    this.updateFog();
  }
  // teto de busca de caminho por tick
  /** o tile tem algum vizinho livre (dá para chegar perto)? */
  open(t) {
    const s = this.size, a = t % s, i = (t - a) / s;
    for (let o = 0; o < 8; o++) {
      const n = a + vs[o], r = i + ks[o];
      if (n >= 0 && r >= 0 && n < s && r < s && !this.blocked[r * s + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return _[this.kind[t]];
  }
  bdef(t) {
    return dt[this.kind[t] - et];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < tt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= et;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === it;
  }
  hostile(t, s) {
    return !(t === s || t === it || s === it);
  }
  // ── pesquisas e números de cada unidade ──
  hasTech(t, s) {
    const a = this.players[t];
    return !!a && (a.tech & 1 << ba[s]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, s) {
    for (let a = 0; a < this.top; a++) if (this.isBuilding(a) && this.owner[a] === t && this.queue[a].includes(Pt + s)) return !0;
    return !1;
  }
  soldier(t) {
    const s = _[this.kind[t]].cls;
    return s !== "villager" && s !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const s = _[this.kind[t]];
    if (!this.soldier(t)) return s.atk;
    const a = this.owner[t];
    return s.atk + (this.hasTech(a, "bronze") ? 1 : 0) + (this.hasTech(a, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return _[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return (bn + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * Vt && this.tick % (3 * Vt) < gn;
  }
  // ── entidades ──
  alloc() {
    for (let t = 0; t < Y; t++) if (!this.alive[t])
      return t >= this.top && (this.top = t + 1), t;
    throw new Error("entidades esgotadas");
  }
  reset(t) {
    this.state[t] = ft, this.task[t] = gt, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0;
  }
  spawnUnit(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = Q[s], this.owner[o] = t, this.x[o] = this.px[o] = Math.round(a * D), this.z[o] = this.pz[o] = Math.round(i * D), this.hp[o] = _[Q[s]].hp, o;
  }
  spawnCarcass(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = tt, this.owner[o] = it, this.sub[o] = t, this.x[o] = this.px[o] = s, this.z[o] = this.pz[o] = a, this.work[o] = i * 100, this.hp[o] = 1, o;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, s, a, i, o) {
    const n = this.alloc();
    this.reset(n);
    const r = dt[wt[s]];
    this.alive[n] = 1, this.kind[n] = et + wt[s], this.owner[n] = t, this.x[n] = this.px[n] = a * D + r.size * 128, this.z[n] = this.pz[n] = i * D + r.size * 128, this.done[n] = o ? 1 : 0, this.hp[n] = o ? r.hp : Math.max(1, r.hp / 10 | 0);
    for (let l = 0; l < r.size; l++) for (let h = 0; h < r.size; h++) {
      const c = (i + l) * this.size + a + h;
      this.bAt[c] = n + 1, r.walk || (this.blocked[c] = 1);
    }
    return this.events.push({ t: "placed", e: n }), n;
  }
  footprint(t) {
    const s = this.bdef(t).size;
    return [(this.x[t] >> 8) - (s >> 1), (this.z[t] >> 8) - (s >> 1), s];
  }
  remove(t) {
    if (this.kind[t] >= et) {
      const [s, a, i] = this.footprint(t), o = this.bdef(t).walk;
      for (let n = 0; n < i; n++) for (let r = 0; r < i; r++) {
        const l = (a + n) * this.size + s + r;
        this.bAt[l] = 0, o || (this.blocked[l] = 0);
      }
      this.events.push({ t: "gone", e: t });
    }
    this.alive[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [];
  }
  blockedAt(t, s) {
    const a = t >> 8, i = s >> 8;
    return a < 0 || i < 0 || a >= this.size || i >= this.size ? !0 : this.blocked[i * this.size + a] === 1;
  }
  canPlace(t, s, a, i) {
    const o = dt[wt[s]], n = this.size;
    if (a < 1 || i < 1 || a + o.size >= n - 1 || i + o.size >= n - 1) return !1;
    for (let r = 0; r < o.size; r++) for (let l = 0; l < o.size; l++) {
      const h = (i + r) * n + a + l, c = this.map.terrain[h];
      if (this.blocked[h] || this.bAt[h] || c === ge || c === Ve || c === $e || !this.explored[t][h]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, h = this.z[r] >> 8;
      if (l >= a && l < a + o.size && h >= i && h < i + o.size && this.state[r] === ft && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  canAfford(t, s) {
    const a = this.players[t].res;
    return ze.every((i) => a[i] >= (s[i] ?? 0) * 100);
  }
  pay(t, s) {
    const a = this.players[t].res;
    for (const i of ze) a[i] -= (s[i] ?? 0) * 100;
  }
  refund(t, s) {
    const a = this.players[t].res;
    for (const i of ze) a[i] += (s[i] ?? 0) * 100;
  }
  pop(t) {
    let s = 0;
    for (let a = 0; a < this.top; a++) this.isUnit(a) && this.owner[a] === t && (s += this.udef(a).pop);
    return s;
  }
  popCap(t) {
    const s = this.players[t].era;
    let a = 0;
    for (let i = 0; i < this.top; i++) if (this.isBuilding(i) && this.owner[i] === t && this.done[i]) {
      const o = this.bdef(i).pop;
      o && (a += o[s]);
    }
    return Math.min(cs[s], a);
  }
  /** tipos de construção da era atual já prontos (requisito para avançar) */
  eraBuildingTypes(t) {
    const s = this.players[t].era, a = /* @__PURE__ */ new Set();
    for (let i = 0; i < this.top; i++) this.isBuilding(i) && this.owner[i] === t && this.done[i] && this.bdef(i).buildable && this.bdef(i).era === s && a.add(this.bdef(i).key);
    return a.size;
  }
  // ── geometria ──
  /** distância (sub-tiles) da unidade até a borda do alvo (construção, tile ou unidade) */
  reach(t, s, a) {
    let i, o, n, r;
    if (a) {
      const c = s % this.size, u = (s - c) / this.size;
      i = c * D, o = u * D, n = i + D, r = o + D;
    } else if (this.kind[s] >= et) {
      const [c, u, d] = this.footprint(s);
      i = c * D, o = u * D, n = i + d * D, r = o + d * D;
    } else {
      const c = this.x[s] - this.x[t], u = this.z[s] - this.z[t];
      return Math.max(0, Me(c * c + u * u) - (this.kind[s] < tt ? Math.round(_[this.kind[s]].radius * D) : 64));
    }
    const l = Math.max(i - this.x[t], 0, this.x[t] - n), h = Math.max(o - this.z[t], 0, this.z[t] - r);
    return Me(l * l + h * h);
  }
  // ── caminho ──
  nearestFree(t, s) {
    for (const [a, i] of We) {
      const o = t + a, n = s + i;
      if (o >= 0 && n >= 0 && o < this.size && n < this.size && !this.blocked[n * this.size + o]) return n * this.size + o;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, s, a, i, o, n = 16e3) {
    const r = this.size, l = this.blocked, h = ++this.aId, c = this.aG, u = this.aFrom, d = this.aStamp, f = this.aClosed, p = this.aHeap;
    this.lastPartial = !1;
    const b = (L, I) => {
      const U = Math.max(s - L, 0, L - i), H = Math.max(a - I, 0, I - o);
      return 15 * Math.max(U, H) + 6 * Math.min(U, H);
    }, g = t % r, y = (t - g) / r;
    if (g >= s && g <= i && y >= a && y <= o) return [];
    let M = 0;
    const v = (L) => {
      let I = M++;
      for (p[I] = L; I > 0; ) {
        const U = I - 1 >> 1;
        if (p[U] <= p[I]) break;
        const H = p[U];
        p[U] = p[I], p[I] = H, I = U;
      }
    }, S = () => {
      const L = p[0];
      p[0] = p[--M];
      let I = 0;
      for (; ; ) {
        const U = I * 2 + 1, H = U + 1;
        let j = I;
        if (U < M && p[U] < p[j] && (j = U), H < M && p[H] < p[j] && (j = H), j === I) break;
        const G = p[j];
        p[j] = p[I], p[I] = G, I = j;
      }
      return L;
    };
    d[t] = h, c[t] = 0, u[t] = -1, v(b(g, y) * 65536 + t);
    let O = t, T = b(g, y), A = -1, C = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; M > 0 && C < n; ) {
      const L = S(), I = L % 65536;
      if (f[I] === h) continue;
      f[I] = h, C++;
      const U = I % r, H = (I - U) / r, j = b(U, H);
      if (j === 0) {
        A = I;
        break;
      }
      j < T && (T = j, O = I);
      for (let G = 0; G < 8; G++) {
        const w = U + vs[G], E = H + ks[G];
        if (w < 0 || E < 0 || w >= r || E >= r) continue;
        const R = E * r + w;
        if (l[R] || f[R] === h || G >= 4 && (l[H * r + w] || l[E * r + U])) continue;
        const N = c[I] + si[G];
        (d[R] !== h || N < c[R]) && (d[R] = h, c[R] = N, u[R] = I, v((N + b(w, E)) * 65536 + R));
      }
    }
    this.lastPartial = A < 0, this.nodesTick += C;
    const $ = A >= 0 ? A : O;
    if ($ === t) return A >= 0 ? [] : null;
    const B = [];
    for (let L = $; L !== t && L >= 0; L = u[L]) B.push(L);
    B.reverse();
    const x = [];
    let P = t;
    for (let L = 0; L < B.length; ) {
      let I = Math.min(B.length - 1, L + 12);
      for (; I > L && !this.clear(P, B[I]); ) I--;
      x.push(B[I]), P = B[I], L = I + 1;
    }
    return x;
  }
  clear(t, s) {
    const a = this.size;
    let i = t % a, o = (t - i) / a;
    const n = s % a, r = (s - n) / a, l = Math.abs(n - i), h = Math.abs(r - o), c = i < n ? 1 : -1, u = o < r ? 1 : -1;
    let d = l - h;
    for (let f = 0; f < 64; f++) {
      if (this.blocked[o * a + i]) return !1;
      if (i === n && o === r) return !0;
      const p = 2 * d;
      if (p > -h && p < l && (this.blocked[o * a + i + c] || this.blocked[(o + u) * a + i]))
        return !1;
      p > -h && (d -= h, i += c), p < l && (d += l, o += u);
    }
    return !1;
  }
  /** manda uma unidade até perto de um retângulo de tiles (alvo) ou de um ponto */
  goTo(t, s, a, i, o, n, r, l = 16e3) {
    const h = (this.z[t] >> 8) * this.size + (this.x[t] >> 8), c = this.size;
    let u = !1;
    for (let g = Math.max(0, a); g <= Math.min(c - 1, o) && !u; g++) for (let y = Math.max(0, s); y <= Math.min(c - 1, i); y++) if (!this.blocked[g * c + y]) {
      u = !0;
      break;
    }
    if (!u)
      return this.lastPartial = !0, this.state[t] = ft, !1;
    const d = this.findPath(h, s, a, i, o, l);
    if (this.field[t] = null, !d)
      return this.state[t] = ft, !1;
    this.path[t] = d, this.pathI[t] = 0;
    const f = d.length ? d[d.length - 1] : h, p = f % this.size, b = (f - p) / this.size;
    return this.slotX[t] = n ?? p * D + 128, this.slotZ[t] = r ?? b * D + 128, this.state[t] = At, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
  }
  /** campo de fluxo completo até um tile, guardado e reaproveitado por 1 minuto (destinos longe) */
  flowTo(t) {
    const s = this.flowCache.get(t);
    if (s && this.tick - s.t < 600) return s.f;
    const a = this.buildFlow(t, []);
    if (this.flowCache.set(t, { f: a, t: this.tick }), this.flowCache.size > 12) {
      let i = -1, o = 1 / 0;
      for (const [n, r] of this.flowCache) r.t < o && (o = r.t, i = n);
      this.flowCache.delete(i);
    }
    return a;
  }
  /** vai longe seguindo o campo de fluxo (sem A*) */
  goFar(t, s, a) {
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, s >> 8)), Math.min(this.size - 1, Math.max(0, a >> 8)));
    return i < 0 ? !1 : (this.field[t] = this.flowTo(i), this.path[t] = null, this.lastPartial = !1, this.slotX[t] = i % this.size * D + 128, this.slotZ[t] = Math.floor(i / this.size) * D + 128, this.state[t] = At, this.stuck[t] = 0, this.best[t] = 2147483647, !0);
  }
  far(t, s, a) {
    const i = s - this.x[t], o = a - this.z[t];
    return i * i + o * o > (22 * D) ** 2;
  }
  goNear(t, s, a) {
    if (!a && this.far(t, this.x[s], this.z[s])) return this.goFar(t, this.x[s], this.z[s]);
    if (a) {
      const n = s % this.size, r = (s - n) / this.size;
      return this.goTo(t, n - 1, r - 1, n + 1, r + 1, void 0, void 0, 6e3);
    }
    if (this.kind[s] >= et) {
      const [n, r, l] = this.footprint(s);
      if (this.bdef(s).walk) {
        const h = l >> 1;
        return this.goTo(t, n + h, r + h, n + h, r + h, this.x[s], this.z[s], 8e3);
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
    const i = this.nearestFree(Math.min(this.size - 1, Math.max(0, s >> 8)), Math.min(this.size - 1, Math.max(0, a >> 8)));
    if (i < 0) return;
    const o = i % this.size, n = (i - o) / this.size, r = !this.blocked[(a >> 8) * this.size + (s >> 8)];
    this.goTo(t, o, n, o, n, r ? s : o * D + 128, r ? a : n * D + 128);
  }
  // ── comandos ──
  issue(t) {
    this.pending.push({ ...t, ..."ids" in t ? { ids: t.ids.slice() } : {}, at: this.tick + 1, seq: this.seq++ });
  }
  own(t) {
    return t.ids.filter((s) => this.isUnit(s) && this.owner[s] === t.player);
  }
  apply(t) {
    const s = this.players[t.player];
    if (!(!s || s.defeated))
      switch (t.type) {
        case "move":
        case "amove": {
          const a = this.own(t);
          for (const i of a)
            this.task[i] = t.type === "amove" ? Oe : gt, this.amx[i] = t.x, this.amz[i] = t.z, this.rallyX[i] = t.type === "amove" ? t.x : -1, this.rallyZ[i] = t.type === "amove" ? t.z : -1, this.tgt[i] = -1, this.aggro[i] = 0, this.fails[i] = 0;
          this.orderMove(a, t.x, t.z);
          break;
        }
        case "stop":
          for (const a of this.own(t))
            this.task[a] = gt, this.state[a] = ft, this.path[a] = null, this.field[a] = null, this.foodMode[a] = 0;
          break;
        case "food":
          for (const a of this.own(t)) this.kind[a] === Q.villager && (this.foodMode[a] = t.on ? 2 : 0);
          break;
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === Wt && s.era < 2) return;
          const a = this.resKind[t.k] === $t;
          for (const i of this.own(t)) this.kind[i] === Q.villager && (this.task[i] = bt, this.tgt[i] = t.k, this.tgtTile[i] = 1, this.phase[i] = Xt, this.fails[i] = 0, a || (this.foodMode[i] = 0), this.goNear(i, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const a = t.target;
          if (!this.alive[a]) return;
          for (const i of this.own(t)) {
            const o = this.kind[i] === Q.villager;
            if (this.kind[a] >= et && this.owner[a] === t.player) {
              if (!o) continue;
              this.done[a] ? this.bdef(a).key === "farm" ? (this.task[i] = bt, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = Xt, this.goNear(i, a, !1)) : this.bdef(a).drop && this.carry[i] > 0 && (this.task[i] = bt, this.phase[i] = bs, this.tgt[i] = -1, this.goNear(i, a, !1)) : (this.task[i] = ee, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
              continue;
            }
            if (this.kind[a] === tt) {
              o && (this.task[i] = bt, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = Xt, this.goNear(i, a, !1));
              continue;
            }
            _[this.kind[i]].siege && this.kind[a] < et || (this.owner[a] === it || this.hostile(t.player, this.owner[a])) && (this.task[i] = mt, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
          }
          break;
        }
        case "build": {
          const a = this.own(t).filter((n) => this.kind[n] === Q.villager), i = dt[wt[t.key]];
          if (!a.length || !i?.buildable || i.era > s.era || !this.canAfford(t.player, i.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, i.cost);
          const o = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of a)
            this.task[n] = ee, this.tgt[n] = o, this.tgtTile[n] = 0, this.goNear(n, o, !1);
          break;
        }
        case "train": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !La(this.bdef(a), s.era).includes(t.key) || this.queue[a].length >= 5) return;
          const o = _[Q[t.key]];
          if (!this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(Q[t.key]);
          break;
        }
        case "cancel": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.queue[a].length) return;
          const i = this.queue[a].pop();
          this.refund(t.player, i >= Pt ? Ce[i - Pt].cost : _[i].cost), this.queue[a].length || (this.work[a] = 0);
          break;
        }
        case "ageup": {
          const a = t.building, i = Ae[s.era];
          if (!i || s.era >= ji || s.aging || !this.isBuilding(a) || this.owner[a] !== t.player || this.bdef(a).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), s.aging = i.time * 10, s.agingB = a;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const a = t.building, i = ba[t.key], o = Ce[i];
          if (!o || !this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !(this.bdef(a).research ?? []).includes(t.key) || s.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, i) || o.needs && !this.hasTech(t.player, o.needs) || this.queue[a].length >= 5 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(Pt + i);
          break;
        }
        case "trade": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !this.bdef(a).market || t.give === t.get || !Us.includes(t.give) || !Us.includes(t.get) || s.res[t.give] < Qt.give * 100) return;
          s.res[t.give] -= Qt.give * 100, s.res[t.get] += (this.fair ? Qt.fair : Qt.get) * 100;
          break;
        }
        case "wall": {
          const a = this.own(t).filter((n) => this.kind[n] === Q.villager), i = dt[wt.wall];
          if (!a.length || i.era > s.era) return;
          const o = [];
          for (const n of t.tiles.slice(0, 40)) {
            if (!this.canAfford(t.player, i.cost)) break;
            const r = n % this.size, l = (n - r) / this.size;
            this.canPlace(t.player, "wall", r, l) && (this.pay(t.player, i.cost), o.push(this.spawnBuilding(t.player, "wall", r, l, !1)));
          }
          if (!o.length) return;
          for (const n of a) {
            let r = o[0], l = 1 / 0;
            for (const h of o) {
              const c = this.x[h] - this.x[n], u = this.z[h] - this.z[n], d = c * c + u * u;
              d < l && (l = d, r = h);
            }
            this.task[n] = ee, this.tgt[n] = r, this.tgtTile[n] = 0, this.goNear(n, r, !1);
          }
          break;
        }
      }
  }
  orderMove(t, s, a) {
    if (!t.length) return;
    const i = this.size, o = this.nearestFree(Math.min(i - 1, Math.max(0, s >> 8)), Math.min(i - 1, Math.max(0, a >> 8)));
    if (o < 0) return;
    if (t.length === 1) {
      this.goPoint(t[0], s, a);
      return;
    }
    const n = this.blocked[(a >> 8) * i + (s >> 8)], r = n ? o % i * D + 128 : s, l = n ? Math.floor(o / i) * D + 128 : a;
    t.sort((u, d) => {
      const f = (this.x[u] - r) ** 2 + (this.z[u] - l) ** 2, p = (this.x[d] - r) ** 2 + (this.z[d] - l) ** 2;
      return f - p || u - d;
    });
    const h = this.buildFlow(o, t);
    let c = 0;
    for (const u of t) {
      let d = r, f = l;
      for (; c < We.length; ) {
        const [p, b] = We[c++], g = r + p * 218, y = l + b * 218;
        if (!this.blockedAt(g, y)) {
          d = g, f = y;
          break;
        }
      }
      this.slotX[u] = d, this.slotZ[u] = f, this.state[u] = At, this.field[u] = h, this.path[u] = null, this.stuck[u] = 0, this.best[u] = 2147483647;
    }
  }
  buildFlow(t, s) {
    const a = this.size, i = a * a, o = new lr(t, i), n = o.dist, r = this.blocked, l = /* @__PURE__ */ new Set();
    for (const p of s) l.add((this.z[p] >> 8) * a + (this.x[p] >> 8));
    const h = this.aHeap;
    let c = 0;
    const u = (p) => {
      let b = c++;
      for (h[b] = p; b > 0; ) {
        const g = b - 1 >> 1;
        if (h[g] <= h[b]) break;
        const y = h[g];
        h[g] = h[b], h[b] = y, b = g;
      }
    }, d = () => {
      const p = h[0];
      h[0] = h[--c];
      let b = 0;
      for (; ; ) {
        const g = b * 2 + 1, y = g + 1;
        let M = b;
        if (g < c && h[g] < h[M] && (M = g), y < c && h[y] < h[M] && (M = y), M === b) break;
        const v = h[M];
        h[M] = h[b], h[b] = v, b = M;
      }
      return p;
    };
    n[t] = 0, u(t);
    let f = s.length ? l.size : -1;
    for (; c > 0; ) {
      const p = d(), b = p % 65536, g = (p - b) / 65536;
      if (g > n[b]) continue;
      if (f > 0 && l.has(b) && (l.delete(b), --f <= 0 && g > 400))
        break;
      const y = b % a, M = (b - y) / a;
      for (let v = 0; v < 8; v++) {
        const S = y + vs[v], O = M + ks[v];
        if (S < 0 || O < 0 || S >= a || O >= a) continue;
        const T = O * a + S;
        if (r[T] || v >= 4 && (r[M * a + S] || r[O * a + y])) continue;
        const A = g + si[v];
        A < n[T] && (n[T] = A, u(A * 65536 + T));
      }
    }
    return o;
  }
  // ── passo ──
  step() {
    if (this.outcome !== "playing" && this.players.every((t) => !t.ai || t.defeated), this.px.set(this.x), this.pz.set(this.z), this.nodesTick = 0, this.overBudget = !1, this.pending.length) {
      const t = this.pending.filter((s) => s.at <= this.tick).sort((s, a) => s.seq - a.seq);
      this.pending = this.pending.filter((s) => s.at > this.tick);
      for (const s of t) this.apply(s);
    }
    this.buildHash(), tr(this), Mn(this), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const s = _[this.kind[t]];
    return Math.round((this.fast[t] && s.animal ? s.animal.run : s.speed) * D / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let s = 0; s < this.top; s++) {
      if (!this.alive[s] || this.state[s] !== At || this.kind[s] >= tt) continue;
      const a = this.x[s], i = this.z[s], o = this.speedOf(s);
      let n = this.slotX[s], r = this.slotZ[s];
      const l = this.path[s];
      if (l && this.pathI[s] < l.length) {
        const S = l[this.pathI[s]], O = S % t * D + 128, T = Math.floor(S / t) * D + 128;
        Math.abs(O - a) + Math.abs(T - i) < 110 && this.pathI[s] < l.length - 1 && this.pathI[s]++, (this.pathI[s] < l.length - 1 || Math.abs(O - a) + Math.abs(T - i) >= 110) && (n = O, r = T), this.pathI[s] === l.length - 1 && Math.abs(O - a) + Math.abs(T - i) < 110 && (this.path[s] = null, n = this.slotX[s], r = this.slotZ[s]);
      }
      const h = this.slotX[s] - a, c = this.slotZ[s] - i, u = h * h + c * c;
      if (!this.path[s] && u <= o * o) {
        this.x[s] = this.slotX[s], this.z[s] = this.slotZ[s], this.state[s] = ft, this.field[s] = null;
        continue;
      }
      const d = this.field[s];
      if (d && !this.path[s] && u > 640 * 640) {
        const S = a >> 8, O = i >> 8, T = O * t + S;
        let A = d.dist[T], C = -1, $ = -1;
        for (let B = 0; B < 8; B++) {
          const x = S + vs[B], P = O + ks[B];
          if (x < 0 || P < 0 || x >= t || P >= t) continue;
          const L = P * t + x;
          this.blocked[L] || B >= 4 && (this.blocked[O * t + x] || this.blocked[P * t + S]) || d.dist[L] < A && (A = d.dist[L], C = x, $ = P);
        }
        C >= 0 && (n = C * D + 128, r = $ * D + 128);
      }
      const f = n - a, p = r - i, b = Me(f * f + p * p);
      if (b === 0) {
        this.state[s] = ft;
        continue;
      }
      const g = Math.min(o, b);
      let y = a + ue(f * g, b), M = i + ue(p * g, b);
      this.blockedAt(y, M) && (this.blockedAt(y, i) ? this.blockedAt(a, M) ? (y = a, M = i) : y = a : M = i), this.x[s] = y, this.z[s] = M;
      const v = Math.abs(h) + Math.abs(c);
      v + 24 < this.best[s] ? (this.best[s] = v, this.stuck[s] = 0) : this.stuck[s] = Math.min(255, this.stuck[s] + 1), (this.stuck[s] > 30 || this.stuck[s] > 10 && v < 3 * D && !this.path[s]) && (this.state[s] = ft, this.field[s] = null, this.path[s] = null);
    }
  }
  buildHash() {
    const t = this.hs, s = this.hashHead, a = this.hashNext;
    s.fill(-1);
    for (let i = 0; i < this.top; i++) {
      if (!this.alive[i] || this.kind[i] >= tt) continue;
      const o = Math.min(t - 1, Math.max(0, this.z[i] >> 9)) * t + Math.min(t - 1, Math.max(0, this.x[i] >> 9));
      a[i] = s[o], s[o] = i;
    }
  }
  /** chama fn para cada unidade a até r tiles de (x, z) (usa a grade do tick) */
  near(t, s, a, i) {
    const o = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(a / 2)), r = Math.min(o - 1, (t >> 9) + Math.ceil(a / 2)), l = Math.max(0, (s >> 9) - Math.ceil(a / 2)), h = Math.min(o - 1, (s >> 9) + Math.ceil(a / 2)), c = a * D * (a * D);
    for (let u = l; u <= h; u++) for (let d = n; d <= r; d++) for (let f = this.hashHead[u * o + d]; f !== -1; f = this.hashNext[f]) {
      const p = this.x[f] - t, b = this.z[f] - s;
      p * p + b * b <= c && this.alive[f] && i(f);
    }
  }
  separate() {
    const t = this.hs, s = this.hashHead, a = this.hashNext;
    this.buildHash();
    for (let i = 0; i < this.top; i++)
      this.pushX[i] = 0, this.pushZ[i] = 0;
    for (let i = 0; i < this.top; i++) {
      if (!this.isUnit(i)) continue;
      const o = Math.round(_[this.kind[i]].radius * D), n = this.x[i] >> 9, r = this.z[i] >> 9;
      for (let l = -1; l <= 1; l++) for (let h = -1; h <= 1; h++) {
        const c = n + h, u = r + l;
        if (!(c < 0 || u < 0 || c >= t || u >= t))
          for (let d = s[u * t + c]; d !== -1; d = a[d]) {
            if (d <= i || !this.isUnit(d)) continue;
            const f = Math.round(_[this.kind[d]].radius * D), p = o + f;
            let b = this.x[d] - this.x[i], g = this.z[d] - this.z[i];
            if (b >= p || b <= -p || g >= p || g <= -p) continue;
            let y = b * b + g * g;
            if (y >= p * p) continue;
            y === 0 && (b = 1 + i % 3, g = 1 + d % 3, y = b * b + g * g);
            const M = Me(y) || 1, v = p - M >> 1, S = ue(b * v, M), O = ue(g * v, M), T = this.state[i] === At ? 1 : 2, A = this.state[d] === At ? 1 : 2;
            this.pushX[i] -= ue(S * T, 2), this.pushZ[i] -= ue(O * T, 2), this.pushX[d] += ue(S * A, 2), this.pushZ[d] += ue(O * A, 2);
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
    for (let s = 0; s < this.players.length; s++) {
      const a = this.vis[s], i = this.explored[s];
      a.fill(0);
      for (let o = 0; o < this.top; o++) {
        if (!this.alive[o] || this.owner[o] !== s || this.kind[o] === tt) continue;
        const n = this.kind[o] >= et ? this.bdef(o).sight : _[this.kind[o]].sight, r = cr(n), l = this.x[o] >> 8, h = this.z[o] >> 8;
        for (let c = 0; c < r.length; c += 2) {
          const u = l + r[c], d = h + r[c + 1];
          if (u < 0 || d < 0 || u >= t || d >= t) continue;
          const f = d * t + u;
          a[f] = 1, i[f] = 1;
        }
      }
    }
  }
  /** calendário: mês 0 = março */
  get month() {
    return Math.floor(this.tick / Vt) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (Vt * 12)) + 1;
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
    for (const a of this.players) for (const i of ze) s(a.res[i]);
    return t >>> 0;
  }
}
function Zt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const ii = /* @__PURE__ */ new Set();
function me(e, t) {
  const s = e + JSON.stringify(t);
  ii.has(s) || (ii.add(s), Zt(e, t));
}
function sa(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function hr(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const dr = ["facil", "normal", "dificil"], ur = [5, 15, 30, 60, 90], Gt = (e) => new Tt(e), ct = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: Gt("#f4f7fa") },
  uGrassA: { value: Gt("#6fa84a") },
  uGrassB: { value: Gt("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: Gt("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: Gt("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: Gt("#5cb8b2") },
  uDeep: { value: Gt("#1f6079") }
}, po = `
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`, fr = `
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, mo = `
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
#endif`, pr = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, mr = `
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
#endif`, gr = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, br = `
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
function Ha(e, t = {}) {
  const s = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", ...t };
  return e.defines = Object.assign(e.defines || {}, s), e.onBeforeCompile = (a) => {
    for (const i in ct) a.uniforms[i] = ct[i];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + po).replace("#include <begin_vertex>", `#include <begin_vertex>
` + mo).replace("#include <project_vertex>", `#include <project_vertex>
` + pr), a.fragmentShader = a.fragmentShader.replace("#include <common>", `#include <common>
` + fr).replace("#include <color_fragment>", `#include <color_fragment>
` + mr).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + gr).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + br);
  }, e.customProgramCacheKey = () => JSON.stringify(s), e;
}
function go(e) {
  const t = new Zo({ depthPacking: Qo });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (s) => {
    for (const a in ct) s.uniforms[a] = ct[a];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + po).replace("#include <begin_vertex>", `#include <begin_vertex>
` + mo);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const zt = (e = {}, t = {}) => Ha(new Ns({ flatShading: !0, ...e }), t);
function yr(e) {
  const t = e.hn - 1;
  e.hstep;
  const s = e.size, a = new Qs(s, s, t, t).rotateX(-Math.PI / 2).translate(s / 2, 0, s / 2), i = a.attributes.position;
  for (let y = 0; y < i.count; y++) i.setY(y, e.heights[y]);
  const o = a.toNonIndexed(), n = o.attributes.position, r = n.count, l = new Float32Array(r * 3), h = new Float32Array(r * 2), c = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, u = (y) => new Tt().setRGB(y[0], y[1], y[2], Li), d = Object.fromEntries(Object.entries(c).map(([y, M]) => [y, u(M)])), f = new rt(), p = new rt(), b = new rt();
  for (let y = 0; y < r; y += 3) {
    f.fromBufferAttribute(n, y), p.fromBufferAttribute(n, y + 1), b.fromBufferAttribute(n, y + 2);
    const M = (f.x + p.x + b.x) / 3, v = (f.y + p.y + b.y) / 3, S = (f.z + p.z + b.z) / 3, O = Math.min(s - 1, Math.max(0, Math.floor(M))), T = Math.min(s - 1, Math.max(0, Math.floor(S))), A = e.terrain[T * s + O], C = Math.abs(new rt().subVectors(b, p).cross(new rt().subVectors(f, p)).normalize().y), $ = 0.93 + (y * 2654435761 >>> 0) / 4294967296 * 0.14, B = Ue(M * 0.045, S * 0.045, 5, 2);
    let x = null, P = 0;
    if (v < -0.45) x = d.bed;
    else if (A === Gs || A === Ve || A === ge || v < 0.5) x = d.sand;
    else if (A === $e || C < 0.66) x = v > 6 ? d.rock2 : d.rock;
    else {
      P = 1;
      const L = 0.86 + B * 0.3 - Math.min(1, Math.max(0, (v - 4) / 12)) * 0.08;
      x = new Tt(L, L, L);
    }
    for (let L = 0; L < 3; L++) {
      const I = (y + L) * 3;
      l[I] = x.r * $, l[I + 1] = x.g * $, l[I + 2] = x.b * $, h[(y + L) * 2] = P, h[(y + L) * 2 + 1] = B;
    }
  }
  o.setAttribute("color", new Kt(l, 3)), o.setAttribute("aGrass", new Kt(h, 2)), o.computeVertexNormals();
  const g = new le(o, zt({ vertexColors: !0 }, { TERRAIN: "" }));
  return g.receiveShadow = !0, g.castShadow = !0, g;
}
function vr(e) {
  const t = e.size, s = Math.round(t / 1.6), a = new Qs(t, t, s, s).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), i = a.attributes.position, o = new Float32Array(i.count);
  for (let r = 0; r < i.count; r++) o[r] = -J(e, i.getX(r), i.getZ(r));
  a.setAttribute("aDepth", new Kt(o, 1));
  const n = new le(a, Ha(new Jo({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const _t = Math.PI * 2, oi = new Gi(), ni = new Na(), ri = new rt(), li = new rt(), xs = new rt(), Ms = new Tt();
function k(e = 0, t = 0, s = 0, a = 0, i = 1, o = 1, n = 1, r = 0, l = 0) {
  return oi.set(r, a, l, "YXZ"), ni.setFromEuler(oi), ri.set(e, t, s), li.set(i, o, n), new qt().compose(ri, ni, li);
}
function kr() {
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
  ], t = new ye();
  return t.setAttribute("position", new we(e, 3)), t;
}
const zs = {
  box: new Ot(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new je(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new je(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cone4: new ma(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new ma(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new Ui(0.5, 0),
  dode: new tn(0.5, 0),
  prism: kr()
}, rs = {};
for (const e in zs) rs[e] = zs[e].index ? zs[e].toNonIndexed() : zs[e];
class _a {
  constructor(t = Math.random) {
    m(this, "pos", []);
    m(this, "col", []);
    this.rand = t;
  }
  add(t, s, a, i = 0.06) {
    const o = rs[t], n = o.attributes.position;
    Ms.set(s);
    const r = 1 + (this.rand() - 0.5) * i;
    for (let l = 0; l < n.count; l++)
      xs.fromBufferAttribute(n, l).applyMatrix4(a), this.pos.push(xs.x, xs.y, xs.z), this.col.push(Ms.r * r, Ms.g * r, Ms.b * r);
    return this;
  }
  build() {
    const t = new ye();
    return t.setAttribute("position", new we(this.pos, 3)), t.setAttribute("color", new we(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const lt = (e) => {
  const t = new _a();
  return e(t), t.build();
};
function bo(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const As = new qt().makeScale(0, 0, 0);
function xr(e) {
  const t = new Ze(), s = bo(e.seed * 7 + 1), a = e.size, i = {
    oakT: lt((x) => {
      x.add("cyl5", "#6b4a32", k(0, 0, 0, 0, 0.36, 1.8, 0.36)), x.add("cyl5", "#634430", k(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: lt((x) => {
      x.add("ico", "#ffffff", k(0, 0, 0, 0, 2.4, 2, 2.4)), x.add("ico", "#e6e6e6", k(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), x.add("ico", "#f3f3f3", k(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: lt((x) => {
      x.add("cyl5", "#6e4d36", k(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), x.add("cyl5", "#6e4d36", k(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: lt((x) => {
      x.add("ico", "#ffffff", k(0, 0, 0, 0, 3.7, 1.15, 3.5)), x.add("ico", "#e8e8e8", k(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: lt((x) => x.add("cyl5", "#5d4330", k(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: lt((x) => {
      x.add("cone7", "#ffffff", k(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), x.add("cone7", "#ececec", k(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), x.add("cone7", "#f6f6f6", k(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, o = zt({ vertexColors: !0 }), n = [
    { kind: Ki, t: i.oakT, c: i.oakC, mat: zt({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: ya, t: i.pineT, c: i.pineC, mat: zt({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: Xi, t: i.firT, c: i.firC, mat: zt({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), c = 3, u = (x, P) => Math.min(c - 1, Math.floor(x / a * c)) * c + Math.min(c - 1, Math.floor(P / a * c));
  for (const x of n) {
    const P = [];
    for (let I = 0; I < a * a; I++) e.tree[I] === x.kind && P.push(I);
    for (let I = P.length - 1; I > 0; I--) {
      const U = Math.floor(s() * (I + 1)), H = P[I];
      P[I] = P[U], P[U] = H;
    }
    const L = Array.from({ length: c * c }, () => []);
    for (const I of P) {
      const U = I % a + 0.5 + (s() - 0.5) * 0.4, H = Math.floor(I / a) + 0.5 + (s() - 0.5) * 0.4, j = J(e, U, H), G = x.s * (0.85 + s() * 0.45), w = s() * _t;
      L[u(U, H)].push({ mt: k(U, j - 0.1, H, w, G, G, G), mc: k(U, j - 0.1 + x.cy * G, H, w, G, G, G), c: new Tt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.8 + s() * 0.25), k: I });
    }
    for (const I of L) {
      if (!I.length) continue;
      const U = new vt(x.t, o, I.length), H = new vt(x.c, x.mat, I.length);
      I.forEach((j, G) => {
        U.setMatrixAt(G, j.mt), H.setMatrixAt(G, j.mc), H.setColorAt(G, j.c), l.set(j.k, { t: U, c: H, i: G });
      });
      for (const j of [U, H])
        j.castShadow = !0, j.receiveShadow = !0, j.computeBoundingSphere(), t.add(j);
      x.depth && (H.customDepthMaterial = go(x.depth)), r.push({ t: U, c: H, n: I.length });
    }
  }
  const d = [], f = (x, P, L, I, U = !0) => {
    const H = new vt(rs.dode, zt(), Math.max(1, x.length * I));
    let j = 0;
    for (const G of x) for (let w = 0; w < I; w++) {
      const E = G.x + 0.5 + (s() - 0.5) * 0.7, R = G.z + 0.5 + (s() - 0.5) * 0.7, N = L * (0.6 + s() * 0.6);
      if (H.setMatrixAt(j, k(E, J(e, E, R) + N * 0.15, R, s() * _t, N, N * (0.55 + s() * 0.4), N, s() * 0.5, s() * 0.5)), U) {
        const q = G.z * a + G.x, F = h.get(q) ?? [];
        F.push({ m: H, i: j }), h.set(q, F);
      }
      H.setColorAt(j++, new Tt(P).multiplyScalar(0.85 + s() * 0.3));
    }
    return H.count = j, H.castShadow = H.receiveShadow = !0, H.computeBoundingSphere(), t.add(H), H;
  };
  f(e.res.filter((x) => x.kind === se), "#c4bdae", 0.75, 2);
  const p = e.res.filter((x) => x.kind === Wt);
  d.push(f(p, "#7a6a58", 0.7, 2), f(p, "#4fa58a", 0.32, 2));
  const b = e.res.filter((x) => x.kind === $t), g = new vt(rs.ico, zt({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, b.length)), y = new vt(rs.ico, zt({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, b.length * 6)), M = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  b.forEach((x, P) => {
    const L = x.x + 0.5, I = x.z + 0.5, U = J(e, L, I);
    g.setMatrixAt(P, k(L, U + 0.35, I, s() * _t, 1.05, 0.85, 1.05));
    const H = [];
    for (let j = 0; j < 6; j++) {
      const G = s() * _t, w = k(L + Math.cos(G) * 0.45, U + 0.35 + s() * 0.35, I + Math.sin(G) * 0.45, 0, 0.11, 0.11, 0.11);
      y.setMatrixAt(P * 6 + j, w), H.push(w);
    }
    M.set(x.z * a + x.x, H), v.set(x.z * a + x.x, P * 6);
  });
  for (const x of [g, y])
    x.castShadow = !0, x.computeBoundingSphere(), t.add(x);
  const S = lt((x) => {
    for (let P = 0; P < 3; P++) x.add("cone4", "#ffffff", k((P - 1) * 0.12, 0, P % 2 * 0.1, P * 2, 0.14, 0.5 + P * 0.08, 0.14, (P - 1) * 0.3, (P - 1) * 0.25), 0.15);
  }), O = [];
  for (let x = 0; x < 3e4 && O.length < 3200; x++) {
    const P = s() * a, L = s() * a, I = Math.floor(L) * a + Math.floor(P);
    if (e.terrain[I] !== is || e.tree[I]) continue;
    const U = J(e, P, L);
    U < 0.7 || U > 14 || O.push(k(P, U - 0.02, L, s() * _t, 0.6 + s() * 0.6, 0.5 + s() * 0.6, 0.6 + s() * 0.6));
  }
  const T = new vt(S, zt({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, O.length));
  O.forEach((x, P) => {
    T.setMatrixAt(P, x), T.setColorAt(P, new Tt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.85 + s() * 0.3));
  }), T.receiveShadow = !0, T.computeBoundingSphere(), t.add(T);
  const A = (x, P) => {
    for (const L of r) L.t.count = L.c.count = Math.floor(L.n * x);
    T.count = Math.floor(O.length * P);
  }, C = (x) => {
    const P = l.get(x);
    P && (P.t.setMatrixAt(P.i, As), P.c.setMatrixAt(P.i, As), P.t.instanceMatrix.needsUpdate = P.c.instanceMatrix.needsUpdate = !0, l.delete(x));
  }, $ = (x) => {
    B(x, !1);
    const P = h.get(x);
    if (P) {
      for (const { m: L, i: I } of P)
        L.setMatrixAt(I, As), L.instanceMatrix.needsUpdate = !0;
      h.delete(x);
    }
  }, B = (x, P) => {
    const L = M.get(x), I = v.get(x);
    !L || I === void 0 || (L.forEach((U, H) => y.setMatrixAt(I + H, P ? U : As)), y.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: d, tufts: T, setDensity: A, removeTree: C, removeRes: $, setBerries: B };
}
function Mr(e, t = !1) {
  const s = e[0].index !== null, a = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), o = {}, n = {}, r = e[0].morphTargetsRelative, l = new ye();
  let h = 0;
  for (let c = 0; c < e.length; ++c) {
    const u = e[c];
    let d = 0;
    if (s !== (u.index !== null))
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
    for (const f in u.attributes) {
      if (!a.has(f))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + '. All geometries must have compatible attributes; make sure "' + f + '" attribute exists among all geometries, or in none of them.'), null;
      o[f] === void 0 && (o[f] = []), o[f].push(u.attributes[f]), d++;
    }
    if (d !== a.size)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". Make sure all geometries have the same number of attributes."), null;
    if (r !== u.morphTargetsRelative)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
    for (const f in u.morphAttributes) {
      if (!i.has(f))
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ".  .morphAttributes must be consistent throughout all geometries."), null;
      n[f] === void 0 && (n[f] = []), n[f].push(u.morphAttributes[f]);
    }
    if (t) {
      let f;
      if (s)
        f = u.index.count;
      else if (u.attributes.position !== void 0)
        f = u.attributes.position.count;
      else
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + c + ". The geometry must have either an index or a position attribute"), null;
      l.addGroup(h, f, c), h += f;
    }
  }
  if (s) {
    let c = 0;
    const u = [];
    for (let d = 0; d < e.length; ++d) {
      const f = e[d].index;
      for (let p = 0; p < f.count; ++p)
        u.push(f.getX(p) + c);
      c += e[d].attributes.position.count;
    }
    l.setIndex(u);
  }
  for (const c in o) {
    const u = ci(o[c]);
    if (!u)
      return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " attribute."), null;
    l.setAttribute(c, u);
  }
  for (const c in n) {
    const u = n[c][0].length;
    if (u === 0) break;
    l.morphAttributes = l.morphAttributes || {}, l.morphAttributes[c] = [];
    for (let d = 0; d < u; ++d) {
      const f = [];
      for (let b = 0; b < n[c].length; ++b)
        f.push(n[c][b][d]);
      const p = ci(f);
      if (!p)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " morphAttribute."), null;
      l.morphAttributes[c].push(p);
    }
  }
  return l;
}
function ci(e) {
  let t, s, a, i = -1, o = 0;
  for (let h = 0; h < e.length; ++h) {
    const c = e[h];
    if (t === void 0 && (t = c.array.constructor), t !== c.array.constructor)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
    if (s === void 0 && (s = c.itemSize), s !== c.itemSize)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
    if (a === void 0 && (a = c.normalized), a !== c.normalized)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
    if (i === -1 && (i = c.gpuType), i !== c.gpuType)
      return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
    o += c.count * s;
  }
  const n = new t(o), r = new Kt(n, s, a);
  let l = 0;
  for (let h = 0; h < e.length; ++h) {
    const c = e[h];
    if (c.isInterleavedBufferAttribute) {
      const u = l / s;
      for (let d = 0, f = c.count; d < f; d++)
        for (let p = 0; p < s; p++) {
          const b = c.getComponent(d, p);
          r.setComponent(d + u, p, b);
        }
    } else
      n.set(c.array, l);
    l += c.count * s;
  }
  return i !== void 0 && (r.gpuType = i), r;
}
const jt = {
  emit: (e, t, s, a) => {
  }
}, ve = new qt().makeScale(0, 0, 0), zr = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], Ar = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], Tr = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], Sr = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], Cr = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85"], wr = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], Ta = "#b5813e";
function $r(e) {
  const t = [], s = [], a = new Tt();
  for (const [o, n] of e) {
    const r = o.index ? o.toNonIndexed() : o, l = r.attributes.position.array;
    a.set(n);
    for (let h = 0; h < l.length; h += 3)
      t.push(l[h], l[h + 1], l[h + 2]), s.push(a.r, a.g, a.b);
  }
  const i = new ye();
  return i.setAttribute("position", new we(t, 3)), i.setAttribute("color", new we(s, 3)), i.computeVertexNormals(), i;
}
const aa = {
  leg: new Ot(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new je(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new Ot(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new Ot(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new Ui(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: Mr([new ga(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new ga(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new je(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: lt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", k(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: lt((e) => {
    e.add("cyl5", "#6b4a2f", k(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", k(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: lt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", k(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: lt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", k(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: lt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: lt((e) => {
    e.add("cyl5", "#8a6a48", k(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", k(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", k(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: $r([[new en(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new Ot(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: lt((e) => {
    e.add("cyl5", "#4a3326", k(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", Ta, k(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", k(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", k(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: lt((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", k(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", k(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", k(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new Ot(0.26, 0.26, 0.15)
}, hi = {
  body: new Ot(1, 1, 1),
  neck: new Ot(1, 1, 1).translate(0, 0.5, 0),
  collar: new Ot(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: lt((e) => {
    e.add("box", "#ffffff", k(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", k(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: lt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", k(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new Ot(1, 1, 1).translate(0, -0.5, 0),
  tail: new Ot(1, 1, 1).translate(0, -0.5, 0),
  antlers: lt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", k(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", k(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", k(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: lt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", k(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", k(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: lt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", k(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, ia = {
  body: lt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", k(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", k(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", k(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", k(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", k(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", k(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", k(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", k(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", k(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new je(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: lt((e) => {
    e.add("cyl8", "#5e4431", k(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", k(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", k(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", k(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new Ot(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, Jt = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, yo = Jt.horse.leg + Jt.horse.body[1], os = (e) => e * e * (3 - 2 * e);
function es(e, t, s) {
  if (e < 0.12) return s - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return s + (t - s) * os((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const a = (e - 0.8) / 0.2;
  return t + (s - t) * a * a;
}
const ss = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, Sa = 2.6;
function vo(e) {
  const t = _[e]?.key ?? "";
  if (t === "horseman") return Jt.horse.leg + Jt.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  const s = Jt[t];
  return s ? s.leg + s.body[1] * 0.5 : 0.72;
}
function Er(e) {
  const t = _[e]?.key ?? "";
  if (t === "horseman") return yo + 0.1;
  if (t === "ram") return 1.15;
  const s = Jt[t];
  return s ? s.leg + s.body[1] + 0.06 : 1.15;
}
const as = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, ie = (e, t) => e[Math.floor(t * e.length) % e.length];
class Ir {
  constructor(t = 720, s = 160) {
    m(this, "group", new Ze());
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
    m(this, "m", { b: new qt(), hip: new qt(), tor: new qt(), l: new qt(), t: new qt(), al: new qt(), ar: new qt(), hd: new qt() });
    m(this, "e", new Gi());
    m(this, "q", new Na());
    m(this, "p", new rt());
    m(this, "s", new rt());
    m(this, "v", new rt());
    m(this, "c", new Tt());
    this.maxH = t, this.maxA = s;
    const a = zt({}, { NO_SNOW: "" }), i = zt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const r in aa) {
      const l = r === "leg" || r === "arm" ? t * 2 : t, h = !!aa[r].attributes.color, c = new vt(aa[r], h ? i : a, l);
      c.instanceMatrix.setUsage(Ft), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set("#ffffff"));
      this.group.add(c), this.hm[r] = c;
    }
    for (const r in hi) {
      const l = r === "leg" ? s * 4 : s, h = ["head", "ears", "antlers", "horns", "tusks"].includes(r), c = new vt(hi[r], h ? i : a, l);
      c.instanceMatrix.setUsage(Ft), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set("#ffffff"));
      this.group.add(c), this.am[r] = c;
    }
    for (const r in ia) {
      const l = r === "wheel" ? this.maxR * 4 : this.maxR, h = !!ia[r].attributes.color, c = new vt(ia[r], h ? i : a, l);
      c.instanceMatrix.setUsage(Ft), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set(r === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(c), this.rm[r] = c;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const o = new Hi(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new vt(o, new Se({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const n = new Qs(1, 0.11);
    this.barBg = new vt(n, new Se({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new vt(n.clone().translate(0.5, 0, 0), new Se({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const r of [this.ring, this.barBg, this.barFg])
      r.instanceMatrix.setUsage(Ft), r.frustumCulled = !1, r.count = 0, this.group.add(r);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let r = 0; r < t; r++) this.ring.setColorAt(r, this.c.set("#9dffc4"));
    for (let r = 0; r < 400; r++) this.barFg.setColorAt(r, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(s).fill(-1);
  }
  trs(t, s, a, i, o = 0, n = 0, r = 0, l = 1, h = l, c = l) {
    return this.e.set(o, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(s, a, i), this.s.set(l, h, c), t.compose(this.p, this.q, this.s);
  }
  look(t, s) {
    const a = as(s * 7 + 1), i = as(s * 13 + 5), o = t.owner[s], n = o >= 0 && o < t.players.length ? t.players[o].era : 0, r = o === te ? "#4f6b4a" : t.players[o]?.color ?? "#888", l = _[t.kind[s]].key, h = ie(zr, a), c = ie(Ar, i), u = ie(Tr, i), d = ie(Sr, a), f = { skin: h, hair: c, tunic: u, skirt: r, legs: h, arms: h, weapon: null, shield: null, bigHair: !1, sc: 0.95 + a * 0.08 };
    switch (l) {
      case "villager":
        return { ...f, tunic: n ? d : u, arms: n ? h : u };
      case "warrior":
        return { ...f, tunic: r, skirt: u, weapon: "club", sc: 1.02 };
      case "axeman":
        return { ...f, tunic: r, skirt: d, weapon: "axe", sc: 1.04 };
      case "hunter":
        return { ...f, weapon: "spear" };
      case "archer":
        return { ...f, tunic: r, skirt: d, weapon: "bow" };
      case "spearman":
        return { ...f, tunic: r, skirt: d, weapon: "spear", shield: n >= 2 ? Ta : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...f, tunic: r, skirt: d, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...f, tunic: d, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...f, tunic: r, skirt: d, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...f, tunic: ie(["#4f6b4a", "#6b5a3a", "#3f5a6a"], a), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: ie(["#3f6a4a", "#8a6a3a"], i), hair: ie(["#c48a4a", "#8a5a2a", "#d9a35f"], a), bigHair: !0, sc: 1.05 };
    }
    return f;
  }
  colorHuman(t, s) {
    const a = this.hm, i = this.c;
    a.leg.setColorAt(t * 2, i.set(s.legs)), a.leg.setColorAt(t * 2 + 1, i), a.skirt.setColorAt(t, i.set(s.skirt)), a.torso.setColorAt(t, i.set(s.tunic)), a.arm.setColorAt(t * 2, i.set(s.arms)), a.arm.setColorAt(t * 2 + 1, i), a.head.setColorAt(t, i.set(s.skin)), a.hair.setColorAt(t, i.set(s.helmet ? Ta : s.hair)), a.shield.setColorAt(t, i.set(s.shield ?? "#888"));
    for (const o in a) a[o].instanceColor && (a[o].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, s) {
    const a = t.kind[s] === tt ? t.sub[s] : t.kind[s];
    return _[a]?.key ?? "deer";
  }
  update(t, s, a, i, o, n, r, l) {
    const h = t.size, c = t.vis[o], u = this.hm, d = this.am, f = this.rm;
    let p = 0, b = 0, g = 0, y = 0, M = 0;
    for (let v = 0; v < t.top; v++) {
      if (!t.alive[v]) continue;
      const S = t.kind[v];
      if (S >= et) {
        const G = dt[S - et], w = t.x[v] / 256, E = t.z[v] / 256;
        if (n && t.owner[v] !== o && !c[Math.floor(E) * h + Math.floor(w)]) continue;
        const R = J(t.map, w, E), N = i.has(v);
        N && g < this.maxH && this.ring.setMatrixAt(g++, k(w, R + 0.08, E, 0, G.size * 0.95, 1, G.size * 0.95)), (N || t.hp[v] < G.hp) && y < 400 && this.bar(y++, w, R + 2.3, E, t.hp[v] / G.hp, G.size * 0.6, l);
        continue;
      }
      const O = (t.px[v] + (t.x[v] - t.px[v]) * s) / 256, T = (t.pz[v] + (t.z[v] - t.pz[v]) * s) / 256;
      if (n && t.owner[v] !== o) {
        const G = Math.floor(O), w = Math.floor(T);
        if (G < 0 || w < 0 || G >= h || w >= h || !c[w * h + G]) continue;
      }
      const A = t.x[v] - t.px[v], C = t.z[v] - t.pz[v], $ = (A !== 0 || C !== 0) && t.state[v] === At, B = J(t.map, O, T);
      let x = this.heading[v];
      if ($) x = Math.atan2(A, C);
      else if (S !== tt && (t.task[v] === bt || t.task[v] === ee || t.task[v] === mt) && t.tgt[v] >= 0) {
        const G = t.tgt[v];
        let w, E;
        t.task[v] === bt && t.tgtTile[v] ? (w = G % h + 0.5, E = Math.floor(G / h) + 0.5) : (w = t.x[G] / 256, E = t.z[G] / 256), Math.abs(w - O) + Math.abs(E - T) > 0.05 && (x = Math.atan2(w - O, E - T));
      }
      const P = this.heading[v];
      this.heading[v] = P + Math.atan2(Math.sin(x - P), Math.cos(x - P)) * Math.min(1, a * 10);
      const L = this.heading[v], I = Math.hypot(A, C) / 256 * 10, U = S === tt ? "" : _[S].key, H = S === tt || t.owner[v] === it || U === "dog";
      if (U === "ram") {
        if (M >= this.maxR) continue;
        this.phase[v] += $ ? a * I / 0.22 : 0, this.slotR[M] !== v * 8 + t.owner[v] + 1 && (this.slotR[M] = v * 8 + t.owner[v] + 1, f.cloth.setColorAt(M, this.c.set(t.players[t.owner[v]]?.color ?? "#888")), f.cloth.instanceColor && (f.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, v, M, O, B, T, L, s), M++;
      } else if (U === "horseman") {
        if (b >= this.maxA || p >= this.maxH) continue;
        const G = Jt.horse, w = I > 1.1;
        this.phase[v] += $ ? a * I * 2.6 / G.leg : 0;
        const E = v * 64 + S;
        if (this.slotA[b] !== E) {
          this.slotA[b] = E;
          const V = this.c.set(ie(G.color, as(v)));
          for (const X of ["body", "neck", "head", "ears", "tail"]) d[X].setColorAt(b, V);
          for (let X = 0; X < 4; X++) d.leg.setColorAt(b * 4 + X, V);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const X in d) d[X].instanceColor && (d[X].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(b, G, O, B, T, L, $, this.phase[v], r, !1, w, !1, 1, !1, 0, 0, !0, !0), b++;
        const R = t.owner[v], N = `${S}:${R}:${R >= 0 && R < t.players.length ? t.players[R].era : 0}`, q = this.look(t, v);
        (this.slotH[p] !== v || this.lookKey[p] !== N) && (this.slotH[p] = v, this.lookKey[p] = N, this.colorHuman(p, q));
        const F = $ ? Math.abs(Math.cos(this.phase[v])) * (w ? 0.06 : 0.025) : 0;
        if ($ && w) {
          const V = this.phase[v] / Math.PI % 2;
          V < this.lastP[v] && jt.emit("animal.hooves", O, T, 0.5), this.lastP[v] = V;
        }
        this.poseHuman(t, v, p, q, O, B, T, L, $, r, s, yo + F - 0.44 * q.sc), p++;
      } else if (H) {
        if (b >= this.maxA) continue;
        const G = this.speciesOf(t, v), w = Jt[G] ?? Jt.deer;
        this.phase[v] += $ ? a * I * 2.6 / w.leg : 0;
        const E = v * 64 + S;
        if (this.slotA[b] !== E) {
          this.slotA[b] = E;
          const F = this.c.set(ie(w.color, as(v)));
          S === tt && F.multiplyScalar(0.8);
          for (const V of ["body", "neck", "head", "ears", "tail"]) d[V].setColorAt(b, F);
          for (let V = 0; V < 4; V++) d.leg.setColorAt(b * 4 + V, F);
          d.collar.setColorAt(b, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const V in d) d[V].instanceColor && (d[V].instanceColor.needsUpdate = !0);
        }
        const R = S !== tt && t.task[v] === mt && !$;
        let N = 0, q = 0;
        if (R) {
          const F = 1 - Math.max(0, Math.min(1, (t.cd[v] - s) / _[S].cd));
          N = F > 0.8 ? (F - 0.8) / 0.2 : F < 0.2 ? 1 - F / 0.2 : 0;
          const V = t.tgt[v];
          if (V >= 0 && t.alive[V]) {
            const X = Math.hypot(t.x[V] - t.x[v], t.z[V] - t.z[v]) / 256, K = w.body[2] * 0.5 + w.neck * 0.3 + w.head[2] * 0.85, at = t.kind[V] < tt ? _[t.kind[V]].radius : 0.5;
            q = Math.max(0, Math.min(w.body[2] * 0.3, X - K - at * 0.95));
          }
        }
        R && t.cd[v] > this.lastCd[v] && jt.emit(G === "boar" ? "hit.boar" : G === "aurochs" ? "hit.aurochs" : "hit.bite", O, T), this.lastCd[v] = S === tt ? 0 : t.cd[v], this.poseAnimal(b, w, O, B, T, L, $, this.phase[v], r, S === tt, t.fast[v] === 1, G === "deer" && as(v * 3) < 0.5, S === tt ? 1 : 1 + (G === "aurochs" ? 0.1 : 0), R, N, q, t.owner[v] >= 0 && S !== tt), b++;
      } else {
        if (p >= this.maxH) continue;
        this.phase[v] += $ ? a * I * 7.2 : 0;
        const G = t.owner[v], w = `${S}:${G}:${G >= 0 && G < t.players.length ? t.players[G].era : 0}`, E = this.look(t, v);
        (this.slotH[p] !== v || this.lookKey[p] !== w) && (this.slotH[p] = v, this.lookKey[p] = w, this.colorHuman(p, E)), this.poseHuman(t, v, p, E, O, B, T, L, $, r, s), p++;
      }
      const j = U === "ram" ? 1.9 : U === "horseman" ? 1.6 : H ? 1.2 : 1;
      i.has(v) && g < this.maxH && this.ring.setMatrixAt(g++, k(O, B + 0.06, T, 0, j, 1, j)), S !== tt && (i.has(v) || t.hp[v] < _[S].hp) && y < 400 && this.bar(y++, O, B + (U === "horseman" ? 2.6 : U === "ram" ? 1.75 : H ? 1.3 : 1.55), T, t.hp[v] / _[S].hp, U === "ram" || U === "horseman" ? 0.9 : 0.7, l);
    }
    for (const v in u)
      u[v].count = p, u[v].instanceMatrix.needsUpdate = !0;
    u.leg.count = u.arm.count = p * 2;
    for (const v in d)
      d[v].count = b, d[v].instanceMatrix.needsUpdate = !0;
    d.leg.count = b * 4;
    for (const v in f)
      f[v].count = M, f[v].instanceMatrix.needsUpdate = !0;
    f.wheel.count = M * 4, this.ring.count = g, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = y, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
  }
  bar(t, s, a, i, o, n, r) {
    o = Math.max(0, Math.min(1, o)), this.p.set(s, a, i), this.s.set(n, 1, 1), this.barBg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.v.set(-n / 2, 0, 0).applyQuaternion(r), this.p.set(s + this.v.x, a + this.v.y, i + this.v.z), this.s.set(n * o, 1, 1), this.barFg.setMatrixAt(t, this.m.l.compose(this.p, r, this.s)), this.barFg.setColorAt(t, this.c.set(o > 0.6 ? "#6fe08a" : o > 0.3 ? "#f2c14e" : "#e0533c"));
  }
  /** mão direita ou esquerda (ponto no braço) em coordenadas do mundo, com a orientação do tronco e um giro em X */
  gripTorso(t, s, a, i, o = 0) {
    return this.v.set(0, -0.35, a).applyMatrix4(s), t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t, 0, 0, 0, i, o));
  }
  /** mount > 0: montado (altura extra do quadril, em cima do cavalo) */
  poseHuman(t, s, a, i, o, n, r, l, h, c, u, d = 0) {
    const f = this.hm, p = this.m, b = this.phase[s], g = Math.sin(b), y = c + s * 0.37, M = d > 0;
    let v = 0, S = 0, O = 0.05 + Math.sin(y * 1.3) * 0.03, T = -0.05 - Math.sin(y * 1.3) * 0.03, A = 0.07, C = -0.07, $ = 0, B = 0, x = 0, P = 0, L = 0, I = i.weapon, U = i.weapon === "spear" ? "torso" : i.weapon === "bow" ? "left" : "arm", H = i.weapon === "spear" ? 0.12 : i.weapon === "bow" ? 0 : i.weapon === "sling" ? Math.PI - 0.12 : i.weapon === "sword" ? Math.PI - 0.3 : 0.79, j = 0, G = !1, w = 0;
    const E = () => {
      C = -0.42, A = 0.42, O = T + 0.06;
    }, R = t.task[s];
    if (M && (h || R !== mt || t.state[s] === At))
      O = -0.75, A = 0.1, T = -0.25, $ = h ? 0.14 : 0.03;
    else if (h)
      v = g * 0.65, S = -g * 0.65, O = -g * 0.5, T = g * 0.5, B = Math.abs(Math.cos(b)) * 0.035;
    else if (R === bt && t.phase[s] === uo) {
      const N = t.tgt[s], q = t.tgtTile[s] === 1, F = q && t.map.tree[N] > 0, V = q && t.resKind[N] === 1, X = !q && t.kind[N] >= et, K = (at, ut) => {
        const Et = y / at % 1;
        Et < this.lastP[s] && jt.emit(ut, o, r), this.lastP[s] = Et;
      };
      if (F)
        T = es(y / 1 % 1, -2.75, -1.35), E(), $ = 0.1 + ss(y / 1 % 1) * 0.12, I = "axe", U = "arm", H = Math.PI - 0.6, K(1, "work.chop");
      else if (q && !V)
        T = es(y / 1.15 % 1, -2.8, -0.55), E(), $ = 0.22 + ss(y / 1.15 % 1) * 0.14, I = "pick", U = "arm", H = Math.PI - 0.6, K(1.15, t.resKind[N] === 3 ? "work.pickMetal" : "work.pick");
      else if (X)
        T = es(y / 1.4 % 1, -1.95, -0.35), E(), $ = 0.32 + ss(y / 1.4 % 1) * 0.1, I = "pick", U = "arm", H = Math.PI - 0.7, K(1.4, "work.hoe");
      else if (V) {
        const at = Math.sin(y * 4.5);
        T = -0.95 + at * 0.45, O = -0.95 - at * 0.45, C = -0.2, A = 0.2, $ = 0.5, I = null, K(1.4, "work.rustle");
      } else
        T = -0.55 + Math.sin(y * 7) * 0.3, O = -0.4, $ = 0.68, I = null, K(1.6, "work.rustle");
    } else if (R === ee && t.state[s] !== At) {
      const N = y / 0.75 % 1;
      T = es(N, -2.3, -0.7), C = -0.15, O = -0.75, $ = 0.15 + ss(N) * 0.08, I = "mallet", U = "arm", H = Math.PI - 0.75, N < this.lastP[s] && jt.emit("work.mallet", o, r), this.lastP[s] = N;
    } else if (R === mt && t.state[s] !== At) {
      const N = _[t.kind[s]], q = 1 - Math.max(0, Math.min(1, (t.cd[s] - u) / N.cd)), F = t.tgt[s], V = !!N.hunt && F >= 0 && t.owner[F] === it;
      if (t.cd[s] > this.lastCd[s] && !N.proj && !(V && F >= 0 && t.alive[F] && t.reach(s, F, !1) / 256 >= Sa)) {
        const K = F >= 0 && t.kind[F] >= et;
        jt.emit(K ? "hit.wall" : i.weapon === "sword" ? "hit.sword" : i.weapon === "axe" ? "hit.axe" : i.weapon === "spear" ? "hit.spear" : "hit.club", o, r);
      }
      const X = F >= 0 && t.alive[F] ? t.reach(s, F, !1) / 256 : 9;
      if (N.proj === "arrow" || i.weapon === "bow")
        I = "bow", U = "left", H = 0, O = -1.5, A = 0.2, C = -0.3, $ = -0.04, T = q < 0.2 ? -0.95 - q / 0.2 * 0.5 : -1.45, G = q >= 0.25;
      else if (N.proj === "stone")
        if (I = "sling", U = "arm", O = -0.55, A = 0.18, $ = -0.03, q < 0.2) {
          const K = q / 0.2;
          T = -0.75 - K * 2.05, H = Math.PI / 2 + 0.7 - K * 0.85;
        } else if (q < 0.85)
          T = -2.8, C = -0.18, H = Math.PI / 2 - 0.1, L = y * 15;
        else {
          const K = (q - 0.85) / 0.15;
          T = -2.8 + os(K) * 2.05, H = Math.PI / 2 - 0.1 + K * 0.8, $ = -0.03 + K * 0.12;
        }
      else if ((N.proj === "spear" || V) && X >= Sa)
        if (I = q < 0.3 ? null : "spear", U = "torso", H = Math.PI / 2 - 0.25, j = 0.1, O = -1, $ = -0.05, q < 0.3)
          T = -1.25 + q / 0.3 * 1.05, $ = 0.12 - q / 0.3 * 0.17;
        else if (q < 0.75) T = -0.2 - os((q - 0.3) / 0.45) * 2.55;
        else if (q < 0.9) T = -2.75;
        else {
          const K = (q - 0.9) / 0.1;
          T = -2.75 + K * K * 1.5, $ = -0.05 + K * 0.17;
        }
      else if (i.weapon === "spear" || N.proj === "spear" || V) {
        if (I = "spear", U = "torso", j = 0.05, O = i.shield ? -0.9 : -0.5, A = 0.15, q < 0.15) T = -1.25;
        else if (q < 0.85) T = -1.25 + os((q - 0.15) / 0.7) * 0.9;
        else {
          const ae = (q - 0.85) / 0.15;
          T = -0.35 - ae * ae * 0.9;
        }
        $ = 0.06 + (q > 0.85 ? (q - 0.85) / 0.15 : q < 0.15 ? 1 - q / 0.15 : 0) * 0.12;
        let K = X, at = 0.72;
        const ut = F >= 0 ? Math.hypot(t.x[F] - t.x[s], t.z[F] - t.z[s]) / 256 : X;
        if (F >= 0 && t.alive[F] && t.kind[F] < tt) {
          const ae = Jt[_[t.kind[F]].key];
          if (at = vo(t.kind[F]), ae) {
            const de = Math.cos(Math.atan2(t.x[s] - t.x[F], t.z[s] - t.z[F]) - this.heading[F]);
            K = ut - Math.max(ae.body[0] * 0.55, ae.body[2] * 0.5 * Math.abs(de));
          } else {
            const de = _[t.kind[F]].radius;
            K = ut - (de > 0.35 ? de * 0.85 : 0.2);
          }
        }
        const Et = 0.35 * Math.sin(-T), Je = (0.84 - 0.35 * Math.cos(T)) * i.sc + d, Be = Math.atan2(Je - at, Math.max(0.4, ut - Et));
        H = Math.PI / 2 + Be, w = Math.max(0, Et + 1.4 * Math.cos(Be) - K + 0.03);
      } else {
        I || (I = "club");
        const at = (F >= 0 && t.alive[F] ? t.kind[F] >= et ? 1 : Er(t.kind[F]) : 0.6) + (I === "sword" ? 0.18 : 0);
        let ut = -0.6;
        for (; ut > -2.2 && (0.84 - 0.35 * Math.cos(ut) - 0.5 * Math.cos(ut - 0.75)) * i.sc + d < at; ) ut -= 0.05;
        U = "arm", H = Math.PI - 0.75, T = es(q, -2.6, Math.max(-2.25, ut)), C = -0.15, O = -0.5, $ = 0.08 + ss(q) * 0.12, I === "sword" && (L = 0.22);
      }
    }
    M && (v = S = -0.38, x = 0.5, P = -0.5), this.lastCd[s] = t.cd[s], this.lastCarry[s] > 0 && t.carry[s] === 0 && t.task[s] === bt && jt.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal"][t.carryRes[s]] ?? "drop.food", o, r), this.lastCarry[s] = t.carry[s], this.trs(p.b, o, n + B + d, r, 0, l, 0, i.sc), p.hip.multiplyMatrices(p.b, this.trs(p.t, 0, 0.46, 0)), p.tor.multiplyMatrices(p.hip, this.trs(p.t, 0, 0, 0, $)), f.torso.setMatrixAt(a, p.tor), f.leg.setMatrixAt(a * 2, p.l.multiplyMatrices(p.hip, this.trs(p.t, 0.09, 0, 0, v, 0, x))), f.leg.setMatrixAt(a * 2 + 1, p.l.multiplyMatrices(p.hip, this.trs(p.t, -0.09, 0, 0, S, 0, P))), f.skirt.setMatrixAt(a, p.l.multiplyMatrices(p.hip, this.trs(p.t, 0, 0.03, 0, $ * 0.35))), p.al.multiplyMatrices(p.tor, this.trs(p.t, 0.215, 0.38, 0, O, 0, -A)), f.arm.setMatrixAt(a * 2, p.al), p.ar.multiplyMatrices(p.tor, this.trs(p.t, -0.215, 0.38, 0, T, 0, -C)), f.arm.setMatrixAt(a * 2 + 1, p.ar), p.hd.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.53, 0, -$ * 0.6)), f.head.setMatrixAt(a, p.hd), f.hair.setMatrixAt(a, p.l.multiplyMatrices(p.hd, this.trs(p.t, 0, 0.03, -0.012, 0, 0, 0, i.bigHair ? 1.18 : 1))), i.shield ? (this.v.set(0.04, -0.24, 0.13).applyMatrix4(p.al), f.shield.setMatrixAt(a, p.l.copy(p.tor).setPosition(this.v))) : f.shield.setMatrixAt(a, ve);
    for (const N of wr) f[N].setMatrixAt(a, ve);
    I && (U === "arm" ? f[I].setMatrixAt(a, p.l.multiplyMatrices(p.ar, this.trs(p.t, 0, -0.35, 0, H, L))) : (this.gripTorso(p.l, U === "left" ? p.al : p.ar, U === "left" ? 0.02 : 0, H, U === "torso" ? j : 0), w && p.l.multiply(this.trs(p.t, 0, -w, 0)), f[I].setMatrixAt(a, p.l))), G && f.arrow.setMatrixAt(a, this.gripTorso(p.l, p.al, 0.02, Math.PI / 2, -0.12)), t.carry[s] > 0 ? (f.carry.setMatrixAt(a, p.l.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.2, -0.19))), f.carry.setColorAt(a, this.c.set(Cr[t.carryRes[s]] ?? "#888")), f.carry.instanceColor && (f.carry.instanceColor.needsUpdate = !0)) : f.carry.setMatrixAt(a, ve);
  }
  poseAnimal(t, s, a, i, o, n, r, l, h, c, u, d, f, p = !1, b = 0, g = 0, y = !1, M = !1) {
    const v = this.am, S = this.m, [O, T, A] = s.body, [C, $, B] = s.head, x = s.leg + T * 0.5, P = r ? Math.sin(l) * (u ? 0.8 : 0.45) : 0, L = r ? Math.abs(Math.cos(l)) * (u ? 0.06 : 0.025) : 0;
    c ? this.trs(S.b, a, i + O * 0.5 - x * 0, o, 0, n, Math.PI / 2, f) : this.trs(S.b, a, i + L, o, 0, n, 0, f), c && S.b.multiply(this.trs(S.t, 0, -x + O * 0.1, 0)), b > 0 && S.b.multiply(this.trs(S.t, 0, 0, g * b, 0.1 * b)), v.body.setMatrixAt(t, S.l.multiplyMatrices(S.b, this.trs(S.t, 0, x, 0, 0, 0, 0, O, T, A))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([G, w], E) => v.leg.setMatrixAt(t * 4 + E, S.l.multiplyMatrices(S.b, this.trs(S.t, G * O * 0.32, s.leg, w * A * 0.36, G * w > 0 ? P : -P, 0, 0, s.legW, s.leg, s.legW))));
    const I = c ? 0.2 : M ? u ? 0.22 : r ? 0.08 : 0.12 + Math.sin(h * 1.3 + a) * 0.04 : p ? 0.05 + b * 0.55 : r ? u ? 0.15 : -0.3 : 0.9 + Math.sin(h * 1.7 + a) * 0.08;
    S.hd.multiplyMatrices(S.b, this.trs(S.t, 0, x + T * 0.3, A * 0.46, I));
    const U = s.neckTilt ?? 0.29, H = s.neckW ?? 0.72;
    v.neck.setMatrixAt(t, S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, -0.04, 0, U, 0, 0, C * H, s.neck * 1.05 + 0.1, $ * H))), M ? v.collar.setMatrixAt(t, S.l.multiplyMatrices(S.b, this.trs(S.t, 0, x + T * 0.5 - 0.17, -A * 0.04, 0, 0, 0, O * 1.14, 0.22, A * 0.4))) : v.collar.setMatrixAt(t, y ? S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, s.neck * 0.45, s.neck * 0.13, 0.29, 0, 0, C * 0.9, 0.06, $ * 0.9)) : ve), S.hd.multiply(this.trs(S.t, 0, s.neck * Math.cos(U) / Math.cos(0.29), s.neck * Math.sin(U) * (0.3 / Math.sin(0.29)) + B * 0.3, -I * 0.6 + (s.headTilt ?? 0))), v.head.setMatrixAt(t, S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, 0, 0, 0, 0, 0, C, $, B)));
    const j = Math.min(C / 0.15, 1.35);
    v.ears.setMatrixAt(t, S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, $ * 0.5, -B * 0.2, -(s.headTilt ?? 0) * 0.85, 0, 0, j, j, j))), v.antlers.setMatrixAt(t, d && s.antl ? S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, $ * 0.45, -B * 0.12)) : ve), v.horns.setMatrixAt(t, s.horns ? S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, $ * 0.35, B * 0.02)) : ve), v.tusks.setMatrixAt(t, s.tusks ? S.l.multiplyMatrices(S.hd, this.trs(S.t, 0, -$ * 0.25, B * 0.72, -0.6)) : ve), v.tail.setMatrixAt(t, S.l.multiplyMatrices(S.b, this.trs(S.t, 0, x + T * 0.32, -A * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(h * 3 + a) * 0.06), 0, 0, s.tail[0], s.tail[1], s.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, s, a, i, o, n, r, l) {
    const h = this.rm, c = this.m, u = this.phase[s];
    t.task[s] === mt && t.cd[s] > this.lastCd[s] && jt.emit("ram.boom", i, n), this.lastCd[s] = t.cd[s];
    {
      const b = u / Math.PI % 2;
      b < this.lastP[s] && jt.emit("ram.creak", i, n, 0.7), this.lastP[s] = b;
    }
    this.trs(c.b, i, o, n, 0, r, 0), h.body.setMatrixAt(a, c.b), h.cloth.setMatrixAt(a, c.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([b, g], y) => h.wheel.setMatrixAt(a * 4 + y, c.l.multiplyMatrices(c.b, this.trs(c.t, b * 0.5, 0.22, g * 0.55, u))));
    let d = 0;
    if (t.task[s] === mt && t.state[s] !== At) {
      const b = 1 - Math.max(0, Math.min(1, (t.cd[s] - l) / _[t.kind[s]].cd));
      d = b < 0.15 ? 0.06 * (1 - b / 0.15) : b < 0.85 ? os((b - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((b - 0.85) / 0.15) ** 2);
    }
    let f = 0;
    const p = t.tgt[s];
    if (t.task[s] === mt && p >= 0 && t.alive[p] && t.kind[p] >= et) {
      const b = qr(t, p, i, n, Math.sin(r), Math.cos(r), 0.62);
      b !== null && (f = Math.max(0, Math.min(0.9, b - 1.33)));
    }
    h.log.setMatrixAt(a, c.l.multiplyMatrices(c.b, this.trs(c.t, 0, 0.62, 0.05 + f - d)));
  }
}
const pt = "#6e4f37", St = "#8a6545", oa = "#a0754c", ke = "#c9a75e", qe = "#b8954f", Ts = "#cdb48a", Ca = "#9b968c", di = "#b98b62", Ne = "#b5813e", Ss = "#8a857c", Cs = "#a7a196";
function ws(e, t, s, a, i, o, n) {
  const r = n() * _t;
  e.add("cone7", o, k(t, 0, s, r, a * 2, i, a * 2));
  for (let l = 0; l < 3; l++) {
    const h = l * _t / 3 + r;
    e.add("cyl5", pt, k(t + Math.cos(h) * 0.08, i - 0.3, s + Math.sin(h) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(h) * 0.3, Math.cos(h) * 0.3));
  }
  e.add("box", "#3b2b1f", k(t + Math.sin(r) * a * 0.95, 0, s + Math.cos(r) * a * 0.95, r, 0.36, i * 0.4, 0.05, -Math.atan2(a, i)));
}
function ui(e, t, s, a, i, o, n, r, l, h = 0) {
  e.add("cyl8", r, k(t, 0, s, h, a * 2, o, i * 2)), e.add("cone7", l, k(t, o - 0.06, s, h, a * 2 + 0.44, n, i * 2 + 0.44));
  const c = o - 0.06 + n * 0.86, u = Math.sin(h), d = Math.cos(h), f = Math.cos(h), p = -Math.sin(h);
  for (const b of [-1, 1]) e.add("cyl5", pt, k(t + f * b * 0.05, c, s + p * b * 0.05, h, 0.045, 0.42, 0.045, 0, b * 0.62));
  e.add("box", "#3a2a1e", k(t + u * i * 0.94, 0, s + d * i * 0.94, h, 0.42, o * 0.8, 0.08));
}
function na(e, t, s, a, i, o, n, r) {
  const l = Math.cos(n), h = -Math.sin(n), c = Math.sin(n), u = Math.cos(n);
  for (const [d, f] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", pt, k(t + l * d * a / 2 + c * f * i / 2, 0, s + h * d * a / 2 + u * f * i / 2, 0, 0.07, f > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", o, k(t, 1.24, s, n, a + 0.2, 0.05, i + 0.3, 0.18)), e.add("box", St, k(t + c * i * 0.3, 0, s + u * i * 0.3, n, a * 0.9, 0.55, 0.32)), r.forEach((d, f) => e.add(f % 2 ? "ico" : "cyl8", d, k(t + c * i * 0.3 + l * (f - (r.length - 1) / 2) * 0.24, 0.55, s + u * i * 0.3 + h * (f - (r.length - 1) / 2) * 0.24, 0, 0.17, f % 2 ? 0.17 : 0.2, 0.17)));
}
function Pr(e, t, s, a, i) {
  const o = Math.sin(a), n = Math.cos(a), r = Math.cos(a), l = -Math.sin(a);
  e.add("box", i, k(t, 0.78, s, a, 0.34, 0.42, 1));
  for (const [h, c] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", i, k(t + r * h * 0.12 + o * c * 0.36, 0, s + l * h * 0.12 + n * c * 0.36, a, 0.09, 0.8, 0.09));
  e.add("box", i, k(t + o * 0.52, 1, s + n * 0.52, a, 0.16, 0.5, 0.2, 0.5)), e.add("box", i, k(t + o * 0.72, 1.34, s + n * 0.72, a, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", k(t + o * 0.5, 1.1, s + n * 0.5, a, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", k(t - o * 0.52, 0.55, s - n * 0.52, a, 0.07, 0.42, 0.07, -0.25));
}
function fi(e, t, s, a, i, o, n = 0) {
  e.add("cyl8", "#6b4a2f", k(t, s + i * Math.cos(n), a, o, i * 2, 0.08, i * 2, 0, Math.PI / 2 + n));
}
function $s(e, t, s, a = 1) {
  for (let i = 0; i < 9; i++) {
    const o = i / 9 * _t;
    e.add("dode", "#8a857c", k(t + Math.cos(o) * 0.5 * a, 0.05, s + Math.sin(o) * 0.5 * a, o, 0.24 * a, 0.18 * a, 0.24 * a));
  }
  e.add("cyl5", "#4a3526", k(t, 0.08, s, 0.3, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", k(t, 0.1, s, 1.9, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0));
}
function Es(e, t, s, a, i, o, n, r, l, h = 0, c = 0) {
  e.add("box", r, k(t, c, s, h, a, o, i)), e.add("prism", l, k(t, c + o - 0.04, s, h, a + 0.4, n, i + 0.36)), e.add("box", "#3a2a1e", k(t + Math.sin(h) * (i / 2 + 0.01), c, s + Math.cos(h) * (i / 2 + 0.01), h, Math.min(0.5, a * 0.3), o * 0.72, 0.06));
}
function pi(e, t, s, a) {
  for (let i = 0; i < s; i++) {
    const o = i / s * _t;
    e.add("box", Ca, k(Math.cos(o) * t, 0, Math.sin(o) * t, o, 0.3, a * (0.8 + i % 3 * 0.15), 0.22));
  }
}
function Or(e, t) {
  const s = Math.round(t * 4);
  for (let a = 0; a <= s; a++) {
    const i = -t + a * 2 * t / s;
    for (const [o, n] of [[i, -t], [i, t], [-t, i], [t, i]]) e.add("cyl5", pt, k(o, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const a of [0.25, 0.48])
    e.add("box", St, k(0, a, -t, 0, t * 2, 0.05, 0.05)), e.add("box", St, k(0, a, t, 0, t * 2, 0.05, 0.05)), e.add("box", St, k(-t, a, 0, 0, 0.05, 0.05, t * 2)), e.add("box", St, k(t, a, 0, 0, 0.05, 0.05, t * 2));
}
function ra(e, t, s, a) {
  e.add("ico", "#ece6d6", k(t, 0.32, s, a, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", k(t + Math.sin(a) * 0.32, 0.36, s + Math.cos(a) * 0.32, a, 0.13, 0.16, 0.2));
  for (const [i, o] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", k(t + i, 0, s + o, a, 0.05, 0.2, 0.05));
}
function Br(e, t, s) {
  const a = new _a(s), i = Math.min(t, 2);
  switch (e) {
    case "center":
      if (i === 0)
        $s(a, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((o, n) => ws(a, Math.cos(o) * 1.45, Math.sin(o) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [oa, "#8d6a46", "#b58a5d"][n % 3], s));
      else if (i === 1)
        Es(a, 0, -0.4, 2.2, 3.2, 1.3, 1.5, Ts, ke, Math.PI / 2), $s(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", k(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        ui(a, 0, -0.45, 1.5, 1.02, 1.3, 1.75, Ts, ke);
        for (const o of [-1, 1])
          a.add("cyl5", pt, k(o * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), a.add("cyl8", Ne, k(o * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        a.add("box", St, k(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), $s(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", k(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), a.add("cyl8", "#8a5a40", k(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      i === 0 ? (ws(a, 0, 0, 0.8, 1.5, oa, s), a.add("box", "#9a7148", k(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : i === 1 ? Es(a, 0, 0, 1.3, 1.6, 1, 0.95, Ts, qe, s() < 0.5 ? 0 : Math.PI / 2) : (ui(a, 0, -0.08, 0.66, 0.5, 0.85, 1, di, qe), a.add("cyl8", "#a0654a", k(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (i === 0) {
        for (let o = 0; o < 6; o++) a.add("cyl5", "#5e4431", k(-0.3, 0.1 + o % 3 * 0.18, -0.35 + Math.floor(o / 3) * 0.18 + o % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        a.add("prism", oa, k(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), a.add("cyl8", "#b48a5c", k(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (i === 1) {
        for (const [o, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) a.add("cyl5", pt, k(o, 0, n, 0, 0.13, 0.6, 0.13));
        a.add("cyl8", Ts, k(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), a.add("cone7", ke, k(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [o, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) a.add("cyl5", pt, k(o, 0, n, 0, 0.12, 0.5, 0.12));
        a.add("box", St, k(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), a.add("prism", ke, k(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), a.add("cyl8", "#a0654a", k(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), a.add("cyl8", "#8a5a40", k(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let o = 0; o < 3; o++) a.add("box", Ne, k(0.42, o * 0.07, 0.62 + o % 2 * 0.03, o % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (i === 0) {
        pi(a, 1.15, 10, 0.32), ws(a, -0.55, -0.5, 0.5, 1.2, "#8d6a46", s);
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", k(0.6 + o * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        a.add("cyl5", pt, k(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (i === 1) {
        Es(a, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", qe, 0);
        for (let o = 0; o < 7; o++) a.add("cyl5", St, k(-1.3 + o * 0.4, 0, 1.25, 0, 0.14, 0.9 + o % 2 * 0.15, 0.14));
        for (let o = 0; o < 3; o++) a.add("cyl5", "#8a6a48", k(1, 0, -0.6 + o * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        a.add("box", Ss, k(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), Es(a, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", qe, Math.PI / 2, 0.25), a.add("box", pt, k(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", k(0.6 + o * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        a.add("cyl5", pt, k(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), a.add("box", pt, k(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), a.add("cyl8", Ne, k(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      a.add("box", "#7d5f3e", k(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let o = 0; o < 4; o++) a.add("box", "#6b4f33", k(0, 0.03, -1.12 + o * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [o, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) a.add("cyl5", St, k(o, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      Or(a, 1.35), ra(a, -0.5, -0.3, 0.6), ra(a, 0.45, 0.2, 2.5), ra(a, -0.2, 0.65, 4.1), a.add("box", "#a0754c", k(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (i < 2)
        a.add("box", "#a8a397", k(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), pi(a, 0.85, 8, 0.45), a.add("dode", "#8a857c", k(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [o, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) a.add("cyl5", pt, k(o, 0, n, 0, 0.1, 1.15, 0.1));
        a.add("cone4", ke, k(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), a.add("box", Cs, k(0, 0, 0, 0, 0.6, 0.55, 0.45)), a.add("cyl8", Ne, k(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), a.add("box", "#a8a397", k(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), a.add("box", "#a8a397", k(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      $s(a, 0, 0, 1);
      for (let o = 0; o < 4; o++) {
        const n = o / 4 * _t + 0.4;
        ws(a, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][o % 3], s);
      }
      for (let o = 0; o < 9; o++) {
        const n = -0.9 + o * 0.22;
        a.add("cyl5", "#5a4030", k(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + o % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      a.add("box", di, k(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const o of [-1, 1]) a.add("cyl5", pt, k(o * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      a.add("prism", qe, k(0, 1, -0.3, 0, 2, 0.6, 1.2)), a.add("ico", "#a5603f", k(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), a.add("cyl5", "#8f5236", k(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), a.add("box", "#2b1d16", k(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), a.add("box", Ss, k(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), a.add("box", "#5c5a57", k(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let o = 0; o < 3; o++) a.add("box", Ne, k(-0.55 + o * 0.05, o * 0.06, -0.35, 0.1 * o, 0.3, 0.06, 0.1));
      break;
    case "market":
      na(a, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), na(a, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), na(a, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [Ne, "#d9a43a", "#bdb6a8"]), a.add("cyl8", "#a0654a", k(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), a.add("cyl8", "#c9a75e", k(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), a.add("ico", "#d6c49a", k(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      a.add("box", St, k(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const o of [-1, 1]) a.add("box", St, k(o * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let o = 0; o < 4; o++) a.add("cyl5", pt, k(-1.3 + o * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      a.add("prism", ke, k(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let o = 0; o < 5; o++) a.add("cyl5", pt, k(-1.35 + o * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const o of [0.28, 0.52]) a.add("box", St, k(0, o, 1.35, 0, 2.75, 0.05, 0.05));
      Pr(a, 0.2, 0.55, -1.2, "#7a5236"), a.add("box", "#d6b85a", k(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), a.add("box", "#c9ab50", k(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [o, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) a.add("cyl5", pt, k(o, 0, n, 0, 0.12, 1.15, 0.12));
      a.add("prism", qe, k(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), a.add("box", St, k(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const o of [-1, 1])
        a.add("box", pt, k(o * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), a.add("box", pt, k(o * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      a.add("box", pt, k(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), a.add("cyl8", "#5e4431", k(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const o of [-1, 1]) for (const n of [-0.1, 1.2]) a.add("box", St, k(o * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      a.add("cyl5", "#4a3a2c", k(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), fi(a, -0.95, 0, 0.9, 0.3, 0.4, -0.12), fi(a, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let o = 0; o < 3; o++) a.add("cyl5", "#5e4431", k(0.9, 0.1 + o % 2 * 0.16, -0.65 + o * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      a.add("box", Ss, k(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [o, n, r] of [[-0.25, -0.25, Ca], [0.25, -0.25, Cs], [-0.25, 0.25, Cs], [0.25, 0.25, Ca]]) a.add("box", r, k(o, 0.55, n, (o + n) * 0.4, 0.5, 0.36 + Math.abs(o - n) * 0.2, 0.5), 0.12);
      a.add("dode", Ss, k(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    case "tower":
      a.add("cyl8", "#b3ada2", k(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), a.add("cyl8", Cs, k(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), a.add("cyl8", "#9d978b", k(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), a.add("box", "#2b211a", k(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), a.add("box", "#2b211a", k(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), a.add("box", St, k(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let o = 0; o < 8; o++) {
        const n = o / 8 * _t;
        a.add("cyl5", pt, k(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [o, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) a.add("box", pt, k(o, 2.62, n, r, 1.7, 0.08, 0.06));
      a.add("cone4", ke, k(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return a.build();
}
function Rr(e, t, s) {
  const a = [], i = [], o = new Tt(), n = (u, d) => J(e, u, d), r = (u, d, f, p, b, g) => {
    const y = [[u, d], [u, p], [f, p], [f, d]].map(([M, v]) => [M, n(M, v) + b, v]);
    o.set(g);
    for (const M of [0, 1, 3, 1, 2, 3])
      a.push(...y[M]), i.push(o.r, o.g, o.b);
  };
  for (let u = 0; u < 6; u++) for (let d = 0; d < 6; d++) {
    const f = t - 1.5 + u * 0.5, p = s - 1.5 + d * 0.5;
    r(f, p, f + 0.5, p + 0.5, 0.05, (u + d) % 2 ? "#7d5f3e" : "#795b3a");
  }
  for (let u = 0; u < 4; u++) {
    const d = s - 1.12 + u * 0.75;
    for (let f = 0; f < 7; f++) {
      const p = t - 1.4 + f * 0.4;
      r(p, d - 0.14, p + 0.4, d + 0.14, 0.09, "#6b4f33");
    }
  }
  const l = new _a();
  for (const [u, d] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", St, k(t + u, n(t + u, s + d), s + d, 0, 0.08, 0.5, 0.08));
  const h = l.build();
  a.push(...h.attributes.position.array), i.push(...h.attributes.color.array);
  const c = new ye();
  return c.setAttribute("position", new we(a, 3)), c.setAttribute("color", new we(i, 3)), c.computeVertexNormals(), c.computeBoundingSphere(), c;
}
const mi = /* @__PURE__ */ new Map();
function ds(e, t) {
  const s = Math.min(t, 2), a = e + s;
  let i = mi.get(a);
  return i || (i = Br(e, s, bo(e.length * 31 + s)), mi.set(a, i)), i;
}
const Is = new _i(), gi = new rt(), bi = new rt(), yi = new rt(), vi = new rt();
function qr(e, t, s, a, i, o, n) {
  const r = dt[e.kind[t] - et], l = e.owner[t], h = Math.min(l >= 0 && l < e.players.length ? e.players[l].era : 0, 2), c = ds(r.key, h), u = c.attributes.position.array, d = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), f = e.x[t] / 256, p = e.z[t] / 256, b = r.key === "farm" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2, g = Math.cos(b), y = Math.sin(b), M = s - f, v = a - p, S = M * g - v * y, O = M * y + v * g, T = i * g - o * y, A = i * y + o * g, C = Math.hypot(T, A) || 1;
  let $ = 1 / 0;
  for (const B of [0, 0.1, -0.1]) {
    Is.origin.set(S - A / C * B, n / d, O + T / C * B), Is.direction.set(T / C, 0, A / C);
    for (let x = 0; x + 8 < u.length; x += 9) {
      if (gi.set(u[x], u[x + 1], u[x + 2]), bi.set(u[x + 3], u[x + 4], u[x + 5]), yi.set(u[x + 6], u[x + 7], u[x + 8]), !Is.intersectTriangle(gi, bi, yi, !1, vi)) continue;
      const P = vi.distanceTo(Is.origin);
      P < $ && ($ = P);
    }
  }
  return $ < 1 / 0 ? $ : null;
}
const Nr = lt((e) => e.add("cyl5", pt, k(0, 0, 0, 0, 0.06, 2, 0.06), 0)), Fr = new Ot(0.42, 0.34, 0.03).translate(0.24, 1.75, 0);
class Lr {
  constructor() {
    m(this, "group", new Ze());
    m(this, "meshes", /* @__PURE__ */ new Map());
    m(this, "poles");
    m(this, "flags");
    m(this, "crops");
    m(this, "fair");
    m(this, "mat", zt({ vertexColors: !0 }));
    m(this, "farms", /* @__PURE__ */ new Map());
    m(this, "fires", []);
    m(this, "smokes", []);
    this.poles = new vt(Nr, zt({ vertexColors: !0 }), 256), this.flags = new vt(Fr, zt({}, { NO_SNOW: "" }), 256);
    const t = lt((a) => {
      for (let i = 0; i < 3; i++) a.add("cone4", "#ffffff", k((i - 1) * 0.1, 0, i % 2 * 0.08, i, 0.1, 0.75, 0.1, (i - 1) * 0.15, 0), 0.1);
    });
    this.crops = new vt(t, zt({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = go({ CROP: "" });
    const s = lt((a) => {
      const i = [[-1.38, -1.38], [1.38, -1.38], [1.38, 1.38], [-1.38, 1.38]], o = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"];
      for (const [n, r] of i) a.add("cyl5", pt, k(n, 0, r, 0, 0.07, 2.05, 0.07), 0);
      for (let n = 0; n < 4; n++) {
        const [r, l] = i[n], [h, c] = i[(n + 1) % 4], u = Math.hypot(h - r, c - l), d = Math.atan2(h - r, c - l);
        a.add("box", "#e8e2d4", k((r + h) / 2, 1.95, (l + c) / 2, d, 0.015, 0.015, u), 0);
        for (let f = 1; f < 8; f++) {
          const p = f / 8, b = Math.sin(p * Math.PI) * 0.18;
          a.add("cone4", o[(f + n) % o.length], k(r + (h - r) * p, 1.95 - b - 0.2, l + (c - l) * p, d, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new vt(s, zt({ vertexColors: !0 }), 16);
    for (const a of [this.poles, this.flags, this.crops, this.fair])
      a.instanceMatrix.setUsage(Ft), a.frustumCulled = !1, a.castShadow = !0, a.receiveShadow = !0, a.count = 0, this.group.add(a);
    for (let a = 0; a < 256; a++) this.flags.setColorAt(a, new Tt("#ffffff"));
  }
  mesh(t, s) {
    const a = t + s;
    let i = this.meshes.get(a);
    return i || (i = new vt(ds(t, s), this.mat, t === "center" || t === "camp" ? 8 : 64), i.instanceMatrix.setUsage(Ft), i.frustumCulled = !1, i.castShadow = !0, i.receiveShadow = !0, i.count = 0, this.meshes.set(a, i), this.group.add(i)), i;
  }
  /** atualiza tudo a partir do mundo (≈100 construções: barato) */
  update(t, s, a, i = 0) {
    const o = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0;
    const h = t.size, c = t.explored[s];
    this.fires.length = 0, this.smokes.length = 0;
    const u = new Tt(), d = /* @__PURE__ */ new Set();
    for (let f = 0; f < t.top; f++) {
      if (!t.alive[f] || t.kind[f] < et) continue;
      const p = dt[t.kind[f] - et], b = t.owner[f], g = t.x[f] / 256, y = t.z[f] / 256;
      if (a && b !== s && !c[Math.floor(y) * h + Math.floor(g)]) continue;
      const M = b >= 0 && b < t.players.length ? t.players[b].era : 0;
      if (p.key === "farm") {
        let $ = this.farms.get(f);
        if ($ && ($.x !== g || $.z !== y) && (this.group.remove($.mesh), $.mesh.geometry.dispose(), $ = void 0), !$) {
          const B = new le(Rr(t.map, g, y), this.mat);
          B.receiveShadow = B.castShadow = !0, this.group.add(B), $ = { mesh: B, x: g, z: y }, this.farms.set(f, $);
        }
        if ($.mesh.visible = !0, d.add(f), t.done[f]) for (let B = 0; B < 4; B++) for (let x = 0; x < 9 && r < this.crops.instanceMatrix.count; x++) {
          const P = g - 1.25 + x * 0.31, L = y - 1.12 + B * 0.75;
          this.crops.setMatrixAt(r++, k(P, J(t.map, P, L) + 0.08, L, (x * 7 + B) % 6, 1, 0.85 + (x + B) % 3 * 0.12, 1));
        }
        continue;
      }
      const v = this.mesh(p.key, Math.min(M, 2)), S = o.get(v) ?? 0;
      if (S >= v.instanceMatrix.count) continue;
      const O = J(t.map, g, y), T = t.done[f] === 1, A = T ? 1 : Math.max(0.12, Math.min(1, t.work[f] / (p.time * 100))), C = (f * 2654435761 >>> 0) % 4 * Math.PI / 2;
      if (v.setMatrixAt(S, k(g, O - 0.02, y, p.key === "farm" ? 0 : C, 1, A, 1)), o.set(v, S + 1), p.key !== "farm" && !p.wall && T && n < 256) {
        const $ = p.size / 2 - 0.25, B = g + $, x = y - $;
        this.poles.setMatrixAt(n, k(B, J(t.map, B, x), x)), this.flags.setMatrixAt(n, k(B, J(t.map, B, x), x, Math.sin(i * 1.1 + f) * 0.15)), this.flags.setColorAt(n, u.set(b === te ? "#efe6cf" : t.players[b]?.color ?? "#888")), n++;
      }
      if (T && p.key === "forge") {
        const x = g + 0.45 * Math.cos(C) + 0.12 * Math.sin(C), P = y - 0.45 * Math.sin(C) + 0.12 * Math.cos(C), L = g + 0.55 * Math.cos(C) - 0.45 * Math.sin(C), I = y - 0.55 * Math.sin(C) - 0.45 * Math.cos(C);
        this.fires.push({ x, y: J(t.map, x, P) + 0.1, z: P, s: 0.16 }), this.smokes.push({ x: L, y: J(t.map, L, I) + 1.5, z: I, s: 0.6 });
      }
      if (T && p.market && t.fair && l < 16 && this.fair.setMatrixAt(l++, k(g, O - 0.02, y, C)), T && (p.key === "center" || p.key === "camp")) {
        const $ = M >= 1 && p.key === "center", B = $ ? g + 1.2 * Math.cos(C) + 1.3 * Math.sin(C) : g, x = $ ? y - 1.2 * Math.sin(C) + 1.3 * Math.cos(C) : y;
        this.fires.push({ x: B, y: J(t.map, B, x) + 0.15, z: x, s: M >= 1 && p.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: B, y: J(t.map, B, x) + 0.3, z: x, s: 1 });
      }
    }
    for (const f of this.meshes.values())
      f.count = o.get(f) ?? 0, f.instanceMatrix.needsUpdate = !0;
    for (const [f, p] of this.farms) d.has(f) || (!t.alive[f] || t.kind[f] !== et + wt.farm ? (this.group.remove(p.mesh), p.mesh.geometry.dispose(), this.farms.delete(f)) : p.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0;
  }
}
class Ur {
  constructor(t = 48) {
    m(this, "mesh");
    this.mesh = new vt(new ma(0.32, 1, 6).translate(0, 0.5, 0), Ha(new Se({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(Ft), this.mesh.frustumCulled = !1;
    for (let s = 0; s < t; s++) this.mesh.setColorAt(s, new Tt(s % 2 ? "#ffd166" : "#ff7b2e"));
  }
  update(t, s) {
    let a = 0;
    const i = this.mesh.instanceMatrix.count;
    for (const o of t) {
      const n = 0.85 + Math.sin(s * 13 + o.x) * 0.12 + Math.sin(s * 29 + o.z) * 0.08;
      a < i && this.mesh.setMatrixAt(a++, k(o.x, o.y, o.z, s * 2 + o.x, o.s, o.s * 1.25 * n, o.s)), a < i && this.mesh.setMatrixAt(a++, k(o.x, o.y, o.z, -s * 3, o.s * 0.55, o.s * 0.85 * (2 - n), o.s * 0.55));
    }
    this.mesh.count = a, this.mesh.instanceMatrix.needsUpdate = !0;
  }
}
const Gr = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, Hr = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class _r {
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
    m(this, "geo", new ye());
    m(this, "mat");
    m(this, "points");
    this.n = s, this.pos = new Float32Array(s * 3), this.a = new Float32Array(s), this.sz = new Float32Array(s).fill(1), this.colr = new Float32Array(s * 3), this.age = new Float32Array(s).fill(99), this.life = new Float32Array(s), this.vel = new Float32Array(s * 3), this.grow = new Float32Array(s), this.geo.setAttribute("position", new Kt(this.pos, 3).setUsage(Ft)), this.geo.setAttribute("aA", new Kt(this.a, 1).setUsage(Ft)), this.geo.setAttribute("aS", new Kt(this.sz, 1).setUsage(Ft)), this.geo.setAttribute("aC", new Kt(this.colr, 3).setUsage(Ft)), this.mat = new Fa({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: Gr, fragmentShader: Hr }), this.points = new Wi(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, s, a, i, o, n, r, l, h, c) {
    const u = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, s, a], u * 3), this.vel.set([i, o, n], u * 3), this.colr.set([c.r, c.g, c.b], u * 3), this.age[u] = 0, this.life[u] = r, this.sz[u] = l, this.grow[u] = h;
  }
  smoke(t, s) {
    this.acc += t;
    const a = new Tt(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const i of s) Math.random() < 0.5 && this.emit(i.x + (Math.random() - 0.5) * 0.2, i.y + 0.4, i.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, a);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, s, a, i) {
    const o = new Tt(0.62, 0.55, 0.45), n = i ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * _t, h = (i ? 1.4 : 0.7) * (0.4 + Math.random());
      this.emit(t, s + 0.2, a, Math.cos(l) * h, 0.3 + Math.random() * 0.6, Math.sin(l) * h, 0.9 + Math.random() * 0.6, i ? 1.4 : 0.8, 1.2, o);
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
class Wr {
  constructor() {
    m(this, "group", new Ze());
    m(this, "spears");
    m(this, "arrows");
    m(this, "stones");
    m(this, "list", []);
    m(this, "ray", new _i());
    m(this, "ta", new rt());
    m(this, "tb", new rt());
    m(this, "tc", new rt());
    m(this, "th", new rt());
    const t = lt((o) => {
      o.add("cyl5", "#7a5a3c", k(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), o.add("cone4", "#b9b4aa", k(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
    }).rotateX(Math.PI / 2), s = lt((o) => {
      o.add("cyl5", "#8a6a48", k(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), o.add("cone4", "#b9b4aa", k(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), o.add("box", "#e8e2d4", k(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), o.add("box", "#e8e2d4", k(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
    }).rotateX(Math.PI / 2), a = lt((o) => o.add("dode", "#8f8a80", k(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)), i = zt({ vertexColors: !0 }, { NO_SNOW: "" });
    this.spears = new vt(t, i, 96), this.arrows = new vt(s, i, 96), this.stones = new vt(a, i, 96);
    for (const o of [this.spears, this.arrows, this.stones])
      o.instanceMatrix.setUsage(Ft), o.frustumCulled = !1, o.castShadow = !0, o.count = 0, this.group.add(o);
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, s, a, i, o, n, r, l, h, c, u) {
    const d = r === "arrow", f = r === "stone";
    if (r === "spear" && l < Sa) return;
    let p, b, g;
    if (h >= et) {
      const C = t.alive[c] ? this.hitBuilding(t, c, s, a) : null;
      C ? (p = C.x, b = C.z, g = C.y) : (p = i, b = o, g = J(t.map, i, o) + 0.08);
    } else {
      const C = Math.hypot(i - s, o - a) || 1, $ = C - (_[h]?.radius ?? 0.3) * 0.8;
      p = s + (i - s) / C * $, b = a + (o - a) / C * $, g = J(t.map, p, b) + vo(h);
    }
    const y = Math.hypot(p - s, b - a) || 1, M = (p - s) / y, v = (b - a) / y, S = u !== void 0 ? 0.9 : d ? 0.75 : f ? 0.3 : 1.7;
    if (y - S < 0.15) return;
    const O = s + M * S, T = a + v * S, A = u !== void 0 ? J(t.map, s, a) + u : J(t.map, O, T) + (d ? 0.88 : f ? 1.55 : 1.1);
    this.list.push({
      x0: O,
      z0: T,
      y0: A,
      x1: p,
      z1: b,
      y1: g,
      arc: (y - S) * (d ? 0.1 : f ? 0.07 : 0.18),
      t: 0,
      dur: Math.max(0.15, n / 10),
      kind: r
    });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, s, a, i) {
    const o = dt[t.kind[s] - et], n = t.owner[s], r = Math.min(n >= 0 && n < t.players.length ? t.players[n].era : 0, 2), l = ds(o.key, r), h = l.attributes.position.array, c = t.done[s] ? 1 : Math.max(0.12, Math.min(1, t.work[s] / (o.time * 100))), u = t.x[s] / 256, d = t.z[s] / 256, f = J(t.map, u, d) - 0.02, p = o.key === "farm" ? 0 : (s * 2654435761 >>> 0) % 4 * Math.PI / 2, b = a - u, g = i - d, y = Math.cos(p), M = Math.sin(p), v = b * y - g * M, S = b * M + g * y, O = Math.hypot(v, S) || 1, T = -v / O, A = -S / O, C = -A, $ = T;
    let B = 0, x = 0, P = 0, L = !1;
    for (const I of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let U = 1 / 0;
      for (const H of [0.9, 0.6, 0.35]) {
        const j = v + C * I, G = S + $ * I, w = -(j * T + G * A);
        this.ray.origin.set(j, H / c, G), this.ray.direction.set(T, 0, A);
        for (let E = 0; E + 8 < h.length; E += 9) {
          if (this.ta.set(h[E], h[E + 1], h[E + 2]), this.tb.set(h[E + 3], h[E + 4], h[E + 5]), this.tc.set(h[E + 6], h[E + 7], h[E + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const R = this.th.distanceTo(this.ray.origin);
          R > w + 0.1 || R >= U || (U = R, B = this.th.x + T * 0.05, x = this.th.y, P = this.th.z + A * 0.05);
        }
      }
      if (U < 1 / 0) {
        L = !0;
        break;
      }
    }
    return L ? { x: u + B * y + P * M, y: f + x * c, z: d - B * M + P * y } : null;
  }
  update(t) {
    let s = 0, a = 0, i = 0;
    const o = [], n = new Na(), r = new rt(), l = new rt(1, 1, 1), h = new rt(), c = new rt(0, 0, 1), u = new qt();
    for (const d of this.list) {
      if (d.t += t, d.t > d.dur + (d.kind === "stone" ? 0.03 : 0.35)) continue;
      !d.hit && d.t >= d.dur && (d.hit = !0, jt.emit(d.kind === "arrow" ? "arrow.hit" : d.kind === "stone" ? "stone.hit" : "spear.hit", d.x1, d.z1));
      const f = d.kind === "arrow" ? this.arrows : d.kind === "stone" ? this.stones : this.spears, p = d.kind === "arrow" ? a : d.kind === "stone" ? i : s;
      if (p >= 96) continue;
      o.push(d);
      const b = Math.min(1, d.t / d.dur);
      r.set(d.x0 + (d.x1 - d.x0) * b, d.y0 + (d.y1 - d.y0) * b + Math.sin(b * Math.PI) * d.arc, d.z0 + (d.z1 - d.z0) * b), h.set(d.x1 - d.x0, d.y1 - d.y0 + Math.cos(b * Math.PI) * d.arc * Math.PI, d.z1 - d.z0).normalize(), n.setFromUnitVectors(c, h), f.setMatrixAt(p, u.compose(r, n, l)), d.kind === "arrow" ? a++ : d.kind === "stone" ? i++ : s++;
    }
    this.list = o, this.spears.count = s, this.arrows.count = a, this.stones.count = i, this.spears.instanceMatrix.needsUpdate = this.arrows.instanceMatrix.needsUpdate = this.stones.instanceMatrix.needsUpdate = !0;
  }
}
const Dr = (e, t, s) => e + (t - e) * s, jr = (e, t, s) => {
  const a = Math.min(1, Math.max(0, (s - e) / (t - e)));
  return a * a * (3 - 2 * a);
};
class Vr {
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
    this.map = t, this.cam = new sn(42, 1, 0.5, 900), this.x = this.tx = s, this.z = this.tz = a, this.yaw = this.tyaw = i, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return Dr(0.66, 1.12, jr(this.minD, this.maxD, t));
  }
  update(t) {
    const s = 1 - Math.exp(-t * 9), a = this.map.size;
    this.tx = Math.min(a - 8, Math.max(8, this.tx)), this.tz = Math.min(a - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * s, this.z += (this.tz - this.z) * s, this.yaw += (this.tyaw - this.yaw) * s, this.dist += (this.tdist - this.dist) * s;
    const i = this.pitch(), o = Math.max(J(this.map, this.x, this.z), 0), n = Math.cos(i) * this.dist;
    this.cam.position.set(this.x + Math.sin(this.yaw) * n, o + Math.sin(i) * this.dist, this.z + Math.cos(this.yaw) * n), this.cam.lookAt(this.x, o + 0.6, this.z), this.cam.updateMatrixWorld();
  }
  /** arrasta a câmera em pixels de tela */
  pan(t, s, a) {
    const i = this.pitch(), o = 0.77 * this.dist / a, n = Math.cos(this.yaw), r = -Math.sin(this.yaw), l = -Math.sin(this.yaw), h = -Math.cos(this.yaw);
    this.tx += (-t * n + s * l / Math.sin(i)) * o, this.tz += (-t * r + s * h / Math.sin(i)) * o;
  }
  setAspect(t, s) {
    this.cam.aspect = t / s, this.cam.fov = t / s < 1 ? 55 : 42, this.cam.updateProjectionMatrix();
  }
  /** posição no chão sob um ponto da tela (marcha ao longo do raio e refina) */
  ground(t, s, a, i) {
    const o = new rt(t / a * 2 - 1, -(s / i) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = o.sub(n).normalize();
    let l = 0, h = 0;
    const c = this.map.size;
    for (let u = 0; u < 400; u++) {
      l += 0.6 + l * 0.01;
      const d = n.x + r.x * l, f = n.y + r.y * l, p = n.z + r.z * l;
      if (d < -20 || p < -20 || d > c + 20 || p > c + 20 || l > 900) return null;
      if (f <= Math.max(J(this.map, d, p), -0.1)) {
        let b = h, g = l;
        for (let y = 0; y < 12; y++) {
          const M = (b + g) / 2;
          n.y + r.y * M <= Math.max(J(this.map, n.x + r.x * M, n.z + r.z * M), -0.1) ? g = M : b = M;
        }
        return new rt(n.x + r.x * g, n.y + r.y * g, n.z + r.z * g);
      }
      h = l;
    }
    return null;
  }
  toScreen(t, s, a, i, o, n) {
    n.set(t, s, a).project(this.cam);
    const r = n.z < 1;
    return n.set((n.x + 1) / 2 * i, (1 - n.y) / 2 * o, r ? 1 : 0), n;
  }
}
const ki = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], xi = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], Mi = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class Kr {
  constructor(t) {
    m(this, "c", {});
    m(this, "n", {});
    m(this, "w", [0, 0, 0]);
    m(this, "tmp", new Tt());
    const s = ki[t];
    for (const a of xi) this.c[a] = Gt(s[a]);
    for (const a of Mi) this.n[a] = s[a];
    this.w = [...s.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, s, a) {
    const i = ki[s], o = 1 - Math.exp(-t * 0.3);
    for (const l of xi) this.c[l].lerp(this.tmp.set(i[l]), o);
    for (const l of Mi) this.n[l] += (i[l] - this.n[l]) * o;
    for (let l = 0; l < 3; l++) this.w[l] += (i.w[l] - this.w[l]) * o;
    const n = this.c, r = this.n;
    ct.uGrassA.value.copy(n.grassA), ct.uGrassB.value.copy(n.grassB), ct.uLeafColor.value.copy(n.leaf), ct.uCropColor.value.copy(n.cropC), ct.uLeaf.value = r.leafAmt, ct.uCrop.value = r.crop, ct.uFlower.value = r.flower, ct.uSnow.value = r.snow, ct.uFruit.value = Math.max(0, 1 - r.snow * 1.6), ct.uShallow.value.copy(n.sh), ct.uDeep.value.copy(n.dp), a.sun.color.copy(n.sun), a.sun.intensity = r.sunI, a.hemi.color.copy(n.hS), a.hemi.groundColor.copy(n.hG), a.hemi.intensity = r.hI, a.sky.uniforms.uTop.value.copy(n.top), a.sky.uniforms.uHor.value.copy(n.hor), a.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const Xr = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, Yr = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class Zr {
  constructor(t, s = 1) {
    m(this, "group", new Ze());
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
    const l = new Float32Array(t * 3), h = new Float32Array(t), c = new Float32Array(t), u = new Float32Array(t);
    for (let b = 0; b < t; b++)
      l[b * 3] = (Math.random() - 0.5) * 90, l[b * 3 + 1] = -999, l[b * 3 + 2] = (Math.random() - 0.5) * 90, h[b] = Math.random(), c[b] = Math.random() * 100, u[b] = 0.7 + Math.random() * 0.6;
    const d = new ye();
    d.setAttribute("position", new Kt(l, 3).setUsage(Ft)), d.setAttribute("aK", new Kt(h, 1)), d.setAttribute("aS", new Kt(u, 1));
    const f = new Fa({ transparent: !0, depthWrite: !1, uniforms: { uFow: ct.uFow, uFowOn: ct.uFowOn, uWorld: ct.uWorld, uPR: { value: 1 }, uSize: { value: s }, uColA: { value: Gt(a) }, uColB: { value: Gt(i) }, uAmt: { value: 0 } }, vertexShader: Xr, fragmentShader: Yr }), p = new Wi(d, f);
    return p.frustumCulled = !1, p.renderOrder = 4, p.visible = !1, this.group.add(p), { p, pos: l, seed: c, n: t, use: t, fall: o, sway: n, m: f, hMax: r };
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
        const h = n.seed[l];
        let c = n.pos[l * 3], u = n.pos[l * 3 + 1], d = n.pos[l * 3 + 2];
        u -= n.fall * t * (0.7 + h % 1 * 0.6), c += (Math.sin(s + h) * n.sway + 0.4) * t, d += Math.cos(s * 0.8 + h) * n.sway * 0.5 * t;
        const f = c - i, p = d - o;
        f > 45 && (c -= 90), f < -45 && (c += 90), p > 45 && (d -= 90), p < -45 && (d += 90);
        const b = J(this.map, c, d);
        (u < b || u > b + n.hMax + 4) && (u = b + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = c, n.pos[l * 3 + 1] = u, n.pos[l * 3 + 2] = d;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const Ds = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], Qr = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class ko {
  constructor(t, s, a) {
    m(this, "renderer");
    m(this, "scene", new un());
    m(this, "camera");
    m(this, "sun");
    m(this, "hemi");
    m(this, "sky");
    m(this, "skyMat");
    m(this, "nature");
    m(this, "units", new Ir());
    m(this, "buildings", new Lr());
    m(this, "flames", new Ur());
    m(this, "particles");
    m(this, "projectiles", new Wr());
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
    this.world = s, this.me = a;
    const i = s.map, o = i.size;
    this.renderer = t, this.scene.fog = new an(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(o * o)), this.fowTex = new on(this.fowData, o, o, nn, rn), this.fowTex.magFilter = this.fowTex.minFilter = ln, this.fowTex.needsUpdate = !0, ct.uFow.value = this.fowTex, ct.uWorld.value = o, this.skyMat = new Fa({
      side: cn,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: Gt("#78ade0") }, uHor: { value: Gt("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new le(new ga(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new hn(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new dn(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(yr(i), vr(i)), this.nature = xr(i), this.scene.add(this.nature.group);
    for (const h of this.nature.metal) h.visible = s.players[a].era >= 2;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new _r({ uFow: ct.uFow, uFowOn: ct.uFowOn, uWorld: ct.uWorld }, 600), this.scene.add(this.particles.points), this.weather = new Zr(i), this.scene.add(this.weather.group), this.seasons = new Kr(s.season), this.ghost = new le(new ye(), new Ns({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new le(new Qs(1, 1).rotateX(-Math.PI / 2), new Se({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new Hi(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let h = 0; h < 4; h++) {
      const c = new le(n, new Se({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      c.renderOrder = 6, c.visible = !1, this.scene.add(c), this.pings.push({ m: c, t: 0 });
    }
    this.rally = new Ze(), this.rally.add(new le(new je(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new Ns({ color: 7229239 }))), this.rallyFlag = new le(new Ot(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new Se({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = s.players[a].start, l = o / 2;
    this.camera = new Vr(i, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const s = new fn({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return s.outputColorSpace = Li, s.toneMapping = pn, s.toneMappingExposure = 1.08, s.shadowMap.enabled = !0, s.shadowMap.type = mn, s;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const s of t.map.res) {
      const a = s.z * t.size + s.x;
      t.resKind[a] === 0 ? this.nature.removeRes(a) : t.resKind[a] === $t && t.resAmt[a] <= 0 && this.nature.setBerries(a, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const s = Ds[t], a = Math.min(window.devicePixelRatio || 1, s.pr);
    this.renderer.setPixelRatio(a), this.sun.castShadow = s.shadow > 0, s.shadow > 0 && this.sun.shadow.mapSize.x !== s.shadow && (this.sun.shadow.mapSize.set(s.shadow, s.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(s.trees, s.tufts), this.particles.mat.uniforms.uPR.value = a, this.weather.setPixelRatio(a), this.weather.setScale(s.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, s) {
    this.renderer.setSize(t, s, !1), this.camera.setAspect(t, s);
  }
  setFog(t) {
    this.fogOn = t, ct.uFowOn.value = t ? 1 : 0;
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
        s.resKind[o] === 0 ? this.nature.removeRes(o) : s.resKind[o] === $t && this.nature.setBerries(o, s.resAmt[o] > 0);
        break;
      }
      case "death":
        if (i.kind < et) {
          const o = i.x / 256, n = i.z / 256;
          this.seen(o, n) && this.particles.puff(o, J(a, o, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const o = s.x[i.e] / 256, n = s.z[i.e] / 256;
        this.seen(o, n) && this.particles.puff(o, J(a, o, n), n, !0);
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
  /** prévia da muralha: um bloco por tile (claro onde dá para construir, vermelho onde não dá) */
  setWallGhost(t, s = []) {
    const a = this.world.players[this.me].era;
    (!this.wallGhost || this.wallGhostEra !== Math.min(a, 2)) && (this.wallGhost && (this.scene.remove(this.wallGhost), this.wallGhost.dispose()), this.wallGhost = new vt(ds("wall", a), new Ns({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 }), 40), this.wallGhost.renderOrder = 7, this.wallGhost.frustumCulled = !1, this.wallGhostEra = Math.min(a, 2), this.scene.add(this.wallGhost));
    const i = this.wallGhost, o = this.world.size, n = new Tt();
    let r = 0;
    for (let l = 0; t && l < t.length && r < 40; l++) {
      const h = t[l] % o + 0.5, c = Math.floor(t[l] / o) + 0.5;
      i.setMatrixAt(r, new qt().makeTranslation(h, J(this.world.map, h, c), c)), i.setColorAt(r, n.set(s[l] ? "#d8ffe2" : "#ff8f80")), r++;
    }
    i.count = r, i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, s = 0, a = 0, i = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const o = dt[wt[t]], n = this.world.players[this.me].era, r = t + Math.min(n, 2);
    r !== this.ghostKey && (this.ghost.geometry = ds(t, n), this.ghostKey = r);
    const l = s + o.size / 2, h = a + o.size / 2, c = J(this.world.map, l, h);
    this.ghost.position.set(l, c, h), this.ghost.visible = !0, this.ghost.material.color.set(i ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, c + 0.12, h), this.foot.scale.set(o.size, 1, o.size), this.foot.visible = !0, this.foot.material.color.set(i ? "#6fe08a" : "#e0533c");
  }
  ping(t, s, a) {
    const i = this.pings[this.pingI++ % this.pings.length];
    i.t = 0.7, i.m.position.set(t, J(this.world.map, t, s) + 0.08, s), i.m.material.color.set(Qr[a]), i.m.visible = !0;
  }
  render(t, s, a, i) {
    const o = this.world, n = this.camera;
    ct.uTime.value = i, n.update(t), this.seasons.update(t, o.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
    const r = 2.25, l = this.seasons.elev;
    this.sun.position.set(n.x + Math.cos(r) * Math.cos(l) * 120, Math.sin(l) * 120, n.z + Math.sin(r) * Math.cos(l) * 120), this.sun.target.position.set(n.x, 0, n.z), this.sun.target.updateMatrixWorld();
    const h = Math.round(Math.min(90, Math.max(28, n.dist * 0.95)) / 4) * 4;
    if (h !== this.shadowExt) {
      this.shadowExt = h;
      const d = this.sun.shadow.camera;
      d.left = -h, d.right = h, d.top = h, d.bottom = -h, d.near = 1, d.far = 300, d.updateProjectionMatrix();
    }
    this.sky.position.copy(n.cam.position), this.updateFog();
    const c = o.players[this.me].era >= 2;
    if (c !== this.metalOn) {
      this.metalOn = c;
      for (const d of this.nature.metal) d.visible = c;
    }
    this.buildings.update(o, this.me, this.fogOn, i), this.units.update(o, s, t, a, this.me, this.fogOn, i, n.cam.quaternion), this.flames.update(this.buildings.fires, i), this.particles.smoke(t, this.buildings.smokes), this.particles.update(t), this.projectiles.update(t), this.weather.update(t, i, this.seasons.w, n.x, n.z);
    for (const d of this.pings) if (d.t > 0) {
      d.t -= t;
      const f = 1 - Math.max(0, d.t) / 0.7;
      d.m.scale.setScalar(1.4 - f * 0.8), d.m.material.opacity = Math.max(0, 1 - f), d.t <= 0 && (d.m.visible = !1);
    }
    let u = -1;
    if (a.size === 1) {
      const d = a.values().next().value;
      o.isBuilding(d) && o.owner[d] === this.me && o.rallyX[d] >= 0 && (u = d);
    }
    if (u >= 0) {
      const d = o.rallyX[u] / 256, f = o.rallyZ[u] / 256;
      this.rally.position.set(d, J(o.map, d, f), f), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(i * 1.4) * 0.2, this.rallyFlag.material.color.set(o.players[this.me].color);
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
const xo = {
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
}, Jr = {
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
}, tl = { en: xo, pt: Jr }, Mo = "origines_lang";
let Qe = "en";
try {
  const e = localStorage.getItem(Mo);
  (e === "pt" || e === "en") && (Qe = e);
} catch {
}
const Ls = [], oe = () => Qe;
function zi(e) {
  Qe = e;
  try {
    localStorage.setItem(Mo, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", Ls.forEach((t) => t());
}
const zo = (e) => (Ls.push(e), () => {
  const t = Ls.indexOf(e);
  t >= 0 && Ls.splice(t, 1);
});
function z(e, t = {}) {
  let s = tl[Qe][e] ?? xo[e] ?? e;
  for (const a in t) s = s.split(`{${a}}`).join(String(t[a]));
  return s;
}
const el = (e) => Math.floor(e).toLocaleString(Qe === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = Qe === "pt" ? "pt-BR" : "en");
const sl = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, wa = {
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
  build: '<path d="M13.5 5.5l5 5-2.5 2.5-5-5z"/><path d="M11 8l-7 7 2.5 2.5 7-7"/><path d="M14 4l2-1 5 5-1 2"/>',
  rally: '<path d="M6 21V4"/><path d="M6 4h11l-2.2 4L17 12H6"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',
  idle: '<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',
  army: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  cancel: '<path d="M6 6l12 12M18 6L6 18"/>',
  "season.0": '<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',
  "season.1": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  "season.2": '<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
  "season.3": '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'
}, al = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, il = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function xt(e, t) {
  const s = wa[e] ?? wa.animal;
  return !t && e.startsWith("season.") && (t = il[Number(e.slice(7))]), sl(s, t ?? al[e] ?? "currentColor");
}
function Fe(e) {
  return e in wa ? xt(e, "currentColor") : xt(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const xe = [0, 0.2, 0.5, 0.85], Ai = "origines_som", Ti = { music: 1, sfx: 3, amb: 2, muted: !1 };
class ol {
  constructor() {
    m(this, "ctx", null);
    m(this, "opts", { ...Ti });
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
      const t = JSON.parse(localStorage.getItem(Ai) ?? "null");
      t && typeof t == "object" && (this.opts = { ...Ti, ...t });
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
      localStorage.setItem(Ai, JSON.stringify(this.opts));
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
        return this.scene === "menu" ? s.music ? Math.max(xe[2], xe[s.music]) : 0 : xe[s.music];
      case "amb":
        return this.scene === "game" ? xe[s.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return xe[s.sfx];
      case "ui":
        return xe[s.sfx] * 0.8;
      case "alert":
        return s.sfx ? Math.max(0.5, xe[s.sfx]) : 0;
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
const W = new ol(), nl = ["food", "wood", "stone", "metal"], rl = ["I", "II", "III", "IV", "V", "VI"], Ut = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), Zs = class Zs {
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
    this.world = t, this.me = s, this.act = a, this.touch = i, this.selected = o, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = zo(() => this.build()), W.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = W.opts.muted;
      n.innerHTML = xt(r ? "mute" : "sound"), n.title = z(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (s) => s.target?.closest?.(Zs.TIP_SEL) ?? null;
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
      s = `<div class="tip-h"><b>${Ut(l)}</b></div>`;
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
    return `<div class="tip-h"><span class="tip-ic">${Fe(t.ic)}</span><b>${Ut(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${Ut(t.tip.desc)}</p>` : "") + (t.why ? `<p class="tip-why">${Ut(t.why)}</p>` : "");
  }
  costHtml(t) {
    const s = this.world.players[this.me].res;
    return `<span class="cost">${ze.filter((a) => t[a]).map((a) => `<span class="c${s[a] < t[a] * 100 ? " no" : ""}">${xt(a)}${t[a]}</span>`).join("")}</span>`;
  }
  bldDesc(t, s) {
    const a = dt[wt[t]];
    return z(`bld.${t}.d`, { n: a.pop ? a.pop[Math.min(s, a.pop.length - 1)] : 0, get: Qt.get, fair: Qt.fair });
  }
  build() {
    const t = this.touch;
    this.root.innerHTML = `
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-som" title="${z(W.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${z(W.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${W.opts.muted}">${xt(W.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-ajuda" title="${z("btn.help")}" aria-label="${z("btn.help")}">${xt("help")}</button>
          <button id="btn-menu" title="${z("btn.menu")}" aria-label="${z("btn.menu")}">${xt("menu")}<span class="btn-label">${z("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${xt("check")}<span>${z("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${xt("cancel")}<span>${z("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${z(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${z("btn.idle")}">${xt("idle")}<span class="btn-label">${z("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${z("btn.army")}">${xt("army")}<span class="btn-label">${z("btn.army")}</span></button>
            <button id="btn-aldeia" title="${z("btn.home")}">${xt("home")}<span class="btn-label">${z("btn.home")}</span></button>
          </div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${z("help.title")}</h2><p class="goal">${z("help.goal")}</p>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", t ? "help.l5.touch" : "help.l5.mouse"].map((a) => `<li>${z(a)}</li>`).join("")}</ul>
        <p class="hint-copy">${z(t ? "hint.touch" : "hint.mouse")}</p>
        <button id="btn-fechar-ajuda" class="primary">${z("help.close")}</button></div></div>`;
    for (const a of ["era", "res", "cal", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "hint", "sel", "cmd", "mini", "ajuda", "idle-n"]) this.$[a] = document.getElementById(a);
    this.$.mini.appendChild(this.minimap);
    const s = (a, i) => {
      document.getElementById(a).onclick = i;
    };
    s("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), s("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), s("btn-menu", () => this.act.menu()), s("btn-som", () => W.toggleMute()), s("btn-ocioso", () => this.act.idle()), s("btn-exercito", () => this.act.army()), s("btn-aldeia", () => this.act.home()), s("btn-confirmar-obra", () => this.act.placeConfirm()), s("btn-cancelar-modo", () => this.act.cancelMode()), this.$.ajuda.onclick = (a) => {
      a.target === this.$.ajuda && (this.$.ajuda.dataset.open = "false");
    }, this.sigTop = this.sigSel = this.sigCard = this.sigMode = "", this.idleN = -1, this.toasts = [], this.update(0, !0);
  }
  openHelp() {
    this.$.ajuda.dataset.open = "true";
  }
  hideHint() {
    this.hintHidden || (this.hintHidden = !0, this.$.hint.style.opacity = "0");
  }
  /** wall: 1 = escolhendo o começo da muralha, 2 = escolhendo o fim */
  setMode(t, s = !0, a = 0, i = "") {
    this.mode = t, this.placeOk = s, this.wallStep = a, this.placeKey = i, t !== "normal" && this.hideTip();
  }
  /** nome da construção na era (o Centro vira Salão do chefe, o campo de treino vira Quartel) */
  bldName(t, s) {
    for (let a = s; a >= 0; a--) {
      const i = `bld.${t}.e${a}`, o = z(i);
      if (o !== i) return o;
    }
    return z(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, s, a, i = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const o = document.createElement("button");
    for (o.className = "toast panel", o.dataset.aviso = i || "info", o.innerHTML = `<span>${Ut(t)}</span>${s !== void 0 ? `<span class="go">${z("msg.go")}</span>` : ""}`, o.onclick = () => {
      s !== void 0 && a !== void 0 && this.act.jump(s, a), o.remove(), this.toasts = this.toasts.filter((n) => n.el !== o);
    }, this.$.toasts.prepend(o), this.toasts.unshift({ el: o, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return t === this.me ? z("tribe.you") : z(t === it ? "tribe.wild" : `tribe.${t === te ? 6 : t}`);
  }
  onEvents(t) {
    for (const s of t) {
      if (s.t === "age") {
        this.toast(s.player === this.me ? z("msg.ageMe", { era: z(`era.${s.era}.in`) }) : z("msg.ageOther", { p: this.tribe(s.player), era: z(`era.${s.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (s.t !== "msg" || s.player !== this.me) continue;
      const [a, i] = s.key.split("."), o = s.x !== void 0 ? s.x / 256 : void 0, n = s.z !== void 0 ? s.z / 256 : void 0;
      a === "built" ? this.toast(z("msg.built", { b: z(`bld.${i}`) }), o, n, "built") : a === "defeated" ? this.toast(Number(i) === this.me ? z("msg.youDefeated") : z("msg.defeated", { p: this.tribe(Number(i)) }), void 0, void 0, "defeated") : a === "tech" ? this.toast(z("msg.tech", { tech: z(`tech.${i}`) }), o, n, "tech") : this.toast(z(`msg.${a}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), a === "underAttack" || a === "raidSoon" || a === "centerLost" || a === "centerDanger" || a === "campLoot" ? o : void 0, n, a);
    }
  }
  // ── atualização ──
  update(t, s = !1) {
    for (const a of this.toasts) (a.t -= t) <= 0 && a.el.remove();
    this.toasts = this.toasts.filter((a) => a.t > 0);
    for (const a of this.progs) a.el.style.width = `${Math.round(Math.max(0, Math.min(1, a.f())) * 100)}%`;
    this.slow -= t, !(!s && this.slow > 0) && (this.slow = 0.15, this.renderTop(), this.renderMode(), this.renderSel(), this.renderCard(), this.renderIdle());
  }
  renderTop() {
    const t = this.world, s = t.players[this.me], a = s.era, i = a >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], o = t.pop(this.me), n = t.popCap(this.me), r = i.map((l) => Math.floor(s.res[l] / 100)).join(",") + `|${o}|${n}|${a}|${s.aging > 0}|${t.season}|${t.year}|${oe()}`;
    r !== this.sigTop && (this.sigTop = r, this.$.res.innerHTML = i.map((l) => `<div class="r" title="${z(`res.${l}`)}">${xt(l)}<span>${el(s.res[l] / 100)}</span></div>`).join("") + `<div class="r${o >= n ? " full" : ""}" title="${z("pop.tip", { n: o, cap: n, max: cs[a] })}">${xt("pop")}<span>${o}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${rl[a]}</span><span class="name">${z(`era.${a}`)}</span>${s.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = z(`era.${a}`), this.$.cal.innerHTML = `${xt(`season.${t.season}`)}<span class="name">${z(`season.${t.season}`)}</span><span class="yr">${z("cal.year", { y: t.year })}</span><span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${z(`season.${t.season}`)} · ${z("cal.year", { y: t.year })}`, this.$.cal.dataset.season = String(t.season), this.bindProgs());
  }
  renderMode() {
    const t = this.world.players[this.me].era, s = `${this.mode}|${this.placeOk}|${this.wallStep}|${this.placeKey}|${t}|${oe()}`;
    if (s === this.sigMode) return;
    this.sigMode = s;
    const a = this.$.modebar;
    a.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && this.touch), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk));
    const i = this.touch ? "touch" : "mouse", o = this.mode === "place" ? this.wallStep && (this.placeOk || this.wallStep === 2) ? z(`place.wall${this.wallStep}.${i}`) : this.placeOk ? z(`place.${i}`) : z("place.bad") : this.mode === "rally" ? z("rally.hint") : "";
    this.$["modebar-text"].innerHTML = (this.mode === "place" && this.placeKey ? `<b class="mb-name">${Ut(this.bldName(this.placeKey, t))}</b> · ` : "") + Ut(o);
  }
  renderIdle() {
    const t = this.world;
    let s = 0;
    for (let a = 0; a < t.top; a++) t.isUnit(a) && t.owner[a] === this.me && t.kind[a] === Q.villager && t.task[a] === 0 && t.state[a] !== At && s++;
    s !== this.idleN && (this.idleN = s, this.$["idle-n"].hidden = s === 0, this.$["idle-n"].textContent = String(s));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const s = this.world, a = s.task[t], i = s.tgt[t];
    return a === bt ? s.phase[t] === bs ? z("do.return", { n: Math.floor(s.carry[t] / 100), res: z(`res.${nl[s.carryRes[t]]}`).toLowerCase() }) : i < 0 ? z("do.move") : s.tgtTile[t] ? z(s.map.tree[i] ? "do.wood" : s.resKind[i] === $t ? "do.berry" : s.resKind[i] === se ? "do.stone" : "do.metal") : z(s.kind[i] === tt ? "do.meat" : "do.farm") : z(a === ee ? "do.build" : a === mt ? i >= 0 && s.owner[i] === it ? "do.hunt" : "do.fight" : a === Oe ? "do.amove" : s.state[t] === At ? "do.move" : s.foodMode[t] ? "do.forage" : "do.idle");
  }
  renderSel() {
    const t = this.world, s = [...this.selected].filter((n) => t.alive[n]);
    if (!s.length) {
      this.sigSel !== "none" && (this.sigSel = "none", this.$.sel.hidden = !0);
      return;
    }
    let a, i;
    if (s.length === 1) {
      const n = s[0], r = t.kind[n], l = t.owner[n], h = l === this.me;
      if (r >= et) {
        const c = dt[r - et], u = t.players[l]?.era ?? 0, d = t.done[n] === 1, f = t.queue[n], p = c.key === "farm" && d ? this.farmer(n) : null;
        if (a = `b${n}|${t.hp[n]}|${d}|${f.join(",")}|${p}|${oe()}`, a === this.sigSel) return;
        const b = h ? d ? "" : z("info.building") : this.tribe(l), g = this.bldDesc(c.key, u);
        i = this.head(Fe(c.key), this.bldName(c.key, u), b, h) + this.hp(t.hp[n], c.hp) + (!d && h ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${g}</div>` + (p !== null ? `<div class="sel-line">${z("info.farmer", { who: z(p ? "info.yes" : "info.no") })}</div>` : "") + (f.length ? `<div class="queue" aria-label="${z("info.queue")}">${f.map((y, M) => {
          const v = y >= Pt ? Ce[y - Pt].key : _[y].key;
          return `<span class="qi" title="${z(y >= Pt ? `tech.${v}` : `unit.${v}`)}">${Fe(v)}${M === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === tt) {
        const c = Math.floor(t.work[n] / 100);
        if (a = `c${n}|${c}|${oe()}`, a === this.sigSel) return;
        i = this.head(xt("carcass", "currentColor"), z("unit.carcass"), z(`unit.${_[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${z("unit.carcass.d", { food: c })}</div>`;
      } else {
        const c = _[r], u = h ? this.doing(n) : this.tribe(l);
        if (a = `u${n}|${t.hp[n]}|${u}|${oe()}`, a === this.sigSel) return;
        i = this.head(Fe(c.key), z(`unit.${c.key}`), u, h) + this.hp(t.hp[n], c.hp) + `<div class="sel-desc">${z(`unit.${c.key}.d`, { food: c.animal?.food ?? 0 })}</div>`;
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of s) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, h) => l[0] - h[0]);
      if (a = "m" + r.map(([l, h]) => `${l}:${h}`).join(",") + oe(), a === this.sigSel) return;
      i = this.head(xt("pop", "currentColor"), z("sel.many", { n: s.length }), "", !0) + `<div class="sel-icons">${r.map(([l, h]) => `<button data-selecionar="${_[l]?.key ?? l}" title="${z(`unit.${_[l]?.key}`)}">${Fe(_[l]?.key ?? "")}<span>${h}</span></button>`).join("")}</div>`;
    }
    this.sigSel = a, this.$.sel.hidden = !1, this.$.sel.innerHTML = i, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(Q[n.dataset.selecionar]));
    const o = this.$.sel.querySelector("#btn-limpar-selecao");
    o && (o.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, s, a, i) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Ut(s)}</div>${a ? `<div class="sel-sub">${Ut(a)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${z("sel.clear")}" aria-label="${z("sel.clear")}">${xt("close")}</button></div>`;
  }
  hp(t, s) {
    const a = Math.max(0, Math.min(1, t / s));
    return `<div class="hp" title="${z("info.hp")} ${Math.max(0, t)}/${s}"><i style="width:${Math.round(a * 100)}%" class="${a > 0.6 ? "ok" : a > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const s = this.world;
    for (let a = 0; a < s.top; a++) if (s.isUnit(a) && s.task[a] === bt && s.tgt[a] === t && !s.tgtTile[a]) return !0;
    return !1;
  }
  // ── cartão de comandos ──
  missing(t) {
    const s = this.world.players[this.me].res;
    return ze.find((a) => s[a] < (t[a] ?? 0) * 100);
  }
  whyCost(t) {
    const s = this.missing(t);
    return s ? z("why.cost", { res: z(`res.${s}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, s = this.me, a = t.players[s], i = [...this.selected].filter((g) => t.alive[g]), o = i.filter((g) => t.isUnit(g) && t.owner[g] === s), n = o.filter((g) => t.kind[g] === Q.villager), r = [];
    if (o.length) {
      if (this.cardMode === "build" && n.length) {
        r.push({ id: "btn-voltar-comandos", ic: "back", label: z("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const g of dt) if (g.buildable && g.era <= a.era + 1) {
          const y = g.era > a.era ? z("why.era", { era: z(`era.${g.era}.in`) }) : this.whyCost(g.cost), M = this.bldName(g.key, a.era);
          r.push({ data: ["construir", g.key], ic: g.key, label: M, tip: { name: M, desc: this.bldDesc(g.key, a.era) }, cost: g.cost, why: y, act: () => this.act.startPlace(g.key) });
        }
        return r;
      }
      if (n.length && r.push({ id: "btn-construir", ic: "build", label: z("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const g = n.every((y) => t.foodMode[y] > 0);
        r.push({ id: "btn-buscar-comida", ic: "food", label: z("cmd.food"), tip: { name: z("cmd.food"), desc: z(g ? "cmd.food.off" : "cmd.food.d") }, pressed: g, act: () => this.act.food(!g) });
      }
      return r.push({ id: "btn-parar", ic: "stop", label: z("cmd.stop"), act: () => this.act.stop() }), r;
    }
    if (i.length !== 1 || !t.isBuilding(i[0]) || t.owner[i[0]] !== s) return r;
    const l = i[0], h = t.bdef(l), c = t.done[l] === 1, u = a.era;
    if (!c) return r;
    const d = La(h, u), f = t.pop(s), p = t.popCap(s);
    let b = 0;
    for (let g = 0; g < t.top; g++) if (t.isBuilding(g) && t.owner[g] === s)
      for (const y of t.queue[g]) y < Pt && (b += _[y].pop);
    for (const g of d) {
      const y = _[Q[g]], M = t.queue[l], v = M.length >= 5 ? z("why.queue") : this.whyCost(y.cost) ?? (f + b + y.pop > p ? z(p >= cs[u] ? "why.popEra" : "why.pop") : void 0);
      r.push({ data: ["treinar", g], ic: g, label: z(`unit.${g}`), tip: { name: z(`unit.${g}`), desc: z(`unit.${g}.d`) }, cost: y.cost, why: v, badge: M.filter((S) => S === Q[g]).length, act: () => this.act.train(l, g) });
    }
    for (const g of h.research ?? []) {
      const y = ba[g], M = Ce[y], v = t.queue[l];
      if (t.hasTech(s, g)) continue;
      const S = t.techQueued(s, y) ? z("why.techQueued") : M.needs && !t.hasTech(s, M.needs) ? z("why.needs", { tech: z(`tech.${M.needs}`) }) : v.length >= 5 ? z("why.queue") : this.whyCost(M.cost);
      r.push({ data: ["pesquisar", g], ic: g, label: `${z(`tech.${g}`)}: ${z(`tech.${g}.d`)}`, tip: { name: z(`tech.${g}`), desc: z(`tech.${g}.d`) }, cost: M.cost, why: S, act: () => this.act.research(l, g) });
    }
    if (h.market) {
      const g = t.fair ? Qt.fair : Qt.get;
      for (const y of Us) r.push({ data: ["dar", y], ic: y, label: z("trade.give", { res: z(`res.${y}`).toLowerCase() }), short: z("trade.giveShort"), pressed: this.give === y, act: () => {
        this.give = y;
      } });
      for (const y of Us) if (y !== this.give) {
        const M = a.res[this.give] < Qt.give * 100 ? z("why.trade", { res: z(`res.${this.give}`).toLowerCase() }) : void 0;
        r.push({ data: ["receber", y], ic: y, label: (t.fair ? z("trade.fair") + " " : "") + z("trade.get", { n: g, res: z(`res.${y}`).toLowerCase() }), short: `+${g}`, cost: { [this.give]: Qt.give }, why: M, act: () => this.act.trade(l, this.give, y) });
      }
    }
    if (t.queue[l].length && r.push({ id: "btn-cancelar-fila", ic: "cancel", label: z("cmd.cancelQueue"), act: () => this.act.cancelQueue(l) }), h.key === "center")
      if (a.aging > 0) r.push({ id: "btn-avancar-era", ic: "ageup", label: z("cmd.aging", { era: z(`era.${u + 1}.to`) }), why: z("why.ageBusy"), prog: () => 1 - a.aging / (Ae[u].time * 10), act: () => {
      } });
      else if (u < ji) {
        const g = t.eraBuildingTypes(s), y = Ae[u];
        r.push({ id: "btn-avancar-era", ic: "ageup", label: z("cmd.ageup", { era: z(`era.${u + 1}.to`) }), tip: { name: z("cmd.ageup", { era: z(`era.${u + 1}.to`) }), desc: z("help.l4") }, cost: y.cost, why: g < 2 ? z("why.age", { n: g }) : this.whyCost(y.cost), act: () => this.act.ageUp(l) });
      } else r.push({ id: "btn-avancar-era", ic: "ageup", label: z("cmd.ageup", { era: z(`era.${u + 1}.to`) }), why: z("why.maxEra"), act: () => {
      } });
    return d.length && r.push({ id: "btn-ponto-reuniao", ic: "rally", label: z("cmd.rally"), tip: { name: z("cmd.rally"), desc: z("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(l) }), r;
  }
  refresh() {
    this.sigCard = "", this.slow = 0;
  }
  renderCard() {
    const t = [...this.selected].filter((n) => this.world.alive[n]), s = t.slice(0, 4).join(",");
    s !== this.cardFor && (this.cardFor = s, this.cardMode = "main");
    const a = this.buttons(), i = a.map((n) => `${n.id ?? n.data?.join("=")}|${n.label}|${n.why ?? ""}|${n.badge ?? ""}|${n.pressed ?? ""}`).join(";") + oe();
    if (i === this.sigCard) {
      this.btns = a;
      return;
    }
    this.sigCard = i, this.btns = a;
    const o = this.$.cmd;
    o.hidden = a.length === 0, o.innerHTML = a.map((n, r) => {
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, h = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${Ut(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${Fe(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${Ut(n.label)}</span>${n.short ? `<span class="cb-s">${Ut(n.short)}</span>` : ""}${h}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
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
      i === "aging" || i === "btn" ? r = () => s.aging > 0 ? 1 - s.aging / (Ae[Math.min(s.era, Ae.length - 1)].time * 10) : 0 : i === "season" ? r = () => t.tick % 1800 / 1800 : i === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : i === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= Pt ? Ce[l - Pt].time : _[l].time) * 10);
      }), r && this.progs.push({ el: a, f: r });
    });
  }
};
// ── dica dos ícones ──
m(Zs, "TIP_SEL", ".cb, .qi, .sel-icons button, .r, .era-chip, .cal, .tools button, .quick button");
let $a = Zs;
class ll {
  constructor(t, s, a, i) {
    m(this, "ctx");
    m(this, "base");
    m(this, "img");
    m(this, "t", 1);
    m(this, "metalOn", !1);
    this.world = s, this.me = a, this.cam = i;
    const o = s.size;
    t.width = t.height = o, this.ctx = t.getContext("2d"), this.base = this.ctx.createImageData(o, o), this.img = this.ctx.createImageData(o, o);
    const n = s.map, r = this.base.data;
    for (let c = 0; c < o; c++) for (let u = 0; u < o; u++) {
      const d = c * o + u, f = n.terrain[d], p = n.heights[Math.round(c / n.hstep) * n.hn + Math.round(u / n.hstep)];
      let b = [104, 150, 72];
      if (f === ge) b = [46, 104, 128];
      else if (f === Ve) b = [86, 150, 160];
      else if (f === Gs) b = [205, 186, 140];
      else if (f === $e) b = [140, 135, 125];
      else {
        const g = Math.max(0, Math.min(1, (p - 1) / 12));
        b = [104 + g * 30, 150 - g * 10, 72 + g * 20];
      }
      n.tree[d] && (b = [52, 92, 50]), r.set([b[0], b[1], b[2], 255], d * 4);
    }
    for (const c of n.res) {
      const u = c.kind === $t ? [200, 60, 70] : c.kind === se ? [215, 210, 200] : c.kind === Wt ? [90, 190, 160] : [255, 255, 255];
      c.kind === Wt || !s.resKind[c.z * o + c.x] || this.base.data.set([u[0], u[1], u[2], 255], (c.z * o + c.x) * 4);
    }
    let l = !1;
    const h = (c) => {
      const u = t.getBoundingClientRect();
      this.cam.tx = (c.clientX - u.left) / u.width * o, this.cam.tz = (c.clientY - u.top) / u.height * o;
    };
    t.addEventListener("pointerdown", (c) => {
      l = !0, t.setPointerCapture(c.pointerId), h(c), c.stopPropagation();
    }), t.addEventListener("pointermove", (c) => {
      l && h(c);
    }), t.addEventListener("pointerup", () => {
      l = !1;
    }), t.addEventListener("pointercancel", () => {
      l = !1;
    });
  }
  /** árvore cortada ou pedra acabada: vira chão no minimapa */
  clearTile(t) {
    this.base.data.set([112, 148, 76, 255], t * 4), this.t = 1;
  }
  update(t, s, a, i) {
    if ((this.t += t) < 0.25) return;
    if (this.t = 0, !this.metalOn && this.world.players[this.me].era >= 2) {
      this.metalOn = !0;
      const d = this.world.size;
      for (const f of this.world.map.res) f.kind === Wt && this.world.resKind[f.z * d + f.x] === Wt && this.base.data.set([90, 190, 160, 255], (f.z * d + f.x) * 4);
    }
    const o = this.world.size, n = this.base.data, r = this.img.data, l = this.world.vis[this.me], h = this.world.explored[this.me];
    for (let d = 0; d < o * o; d++) {
      const f = !s || l[d] ? 1 : h[d] ? 0.5 : 0.08, p = d * 4;
      r[p] = n[p] * f, r[p + 1] = n[p + 1] * f, r[p + 2] = n[p + 2] * f, r[p + 3] = 255;
    }
    this.ctx.putImageData(this.img, 0, 0);
    const c = this.world;
    for (let d = 0; d < c.top; d++) {
      if (!c.alive[d]) continue;
      const f = c.x[d] / 256, p = c.z[d] / 256, b = c.owner[d] === this.me;
      if (s && !b && !l[Math.floor(p) * o + Math.floor(f)] || c.kind[d] === tt) continue;
      const g = c.kind[d] >= et, y = c.owner[d], M = g ? c.bdef(d).size === 1 ? 2 : 7 : y === it ? 2 : 3;
      this.ctx.fillStyle = y === it ? "#e8d9b0" : y === te ? "#2f3b27" : c.players[y]?.color ?? "#fff", this.ctx.fillRect(f - M / 2, p - M / 2, M, M), g && M > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(f - M / 2, p - M / 2, M, M));
    }
    const u = [[0, 0], [a, 0], [a, i], [0, i]].map(([d, f]) => this.cam.ground(d, f, a, i));
    u.every((d) => d) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), u.forEach((d, f) => f ? this.ctx.lineTo(d.x, d.z) : this.ctx.moveTo(d.x, d.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class cl {
  constructor(t, s, a, i, o, n) {
    m(this, "selected", /* @__PURE__ */ new Set());
    m(this, "pointers", /* @__PURE__ */ new Map());
    m(this, "gesture", "none");
    m(this, "longTimer", 0);
    m(this, "lastTap", { t: 0, x: 0, y: 0 });
    m(this, "keys", /* @__PURE__ */ new Set());
    m(this, "v", new rt());
    m(this, "v2", new rt());
    m(this, "right", new rt());
    m(this, "ac", new AbortController());
    this.canvas = t, this.world = s, this.me = a, this.cam = i, this.box = o, this.hooks = n;
    const r = { signal: this.ac.signal };
    t.addEventListener("pointerdown", (l) => this.down(l), r), t.addEventListener("pointermove", (l) => this.move(l), r), t.addEventListener("pointerup", (l) => this.up(l), r), t.addEventListener("pointercancel", (l) => this.cancel(l), r), t.addEventListener("contextmenu", (l) => l.preventDefault(), r), t.addEventListener("wheel", (l) => {
      l.preventDefault(), this.cam.tdist *= Math.exp(l.deltaY * 12e-4), this.hooks.onInteract();
    }, { passive: !1, signal: this.ac.signal }), addEventListener("keydown", (l) => this.key(l), r), addEventListener("keyup", (l) => this.keys.delete(l.key.toLowerCase()), r), addEventListener("blur", () => this.keys.clear(), r);
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
    const s = this.pointers.get(t.pointerId);
    if (!s) {
      if (t.pointerType === "mouse" && this.hooks.mode() === "place") {
        const n = this.cam.ground(t.clientX, t.clientY, this.W, this.H);
        n && this.hooks.onPlaceAt(n.x, n.z);
      }
      return;
    }
    const a = t.clientX - s.x, i = t.clientY - s.y, o = Math.hypot(t.clientX - s.sx, t.clientY - s.sy);
    if (this.gesture === "pinch" && this.pointers.size === 2) {
      const n = [...this.pointers.entries()].find(([u]) => u !== t.pointerId)[1], r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.hypot(t.clientX - n.x, t.clientY - n.y);
      l > 10 && r > 10 && (this.cam.tdist *= r / l);
      const h = Math.atan2(s.y - n.y, s.x - n.x), c = Math.atan2(t.clientY - n.y, t.clientX - n.x);
      this.cam.tyaw += Math.atan2(Math.sin(c - h), Math.cos(c - h)), this.cam.pan(a * 0.5, i * 0.5, this.H);
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
        if (o === "rally" || this.singleOwnBuilding() >= 0) {
          this.hooks.onRally(d.x, d.z);
          return;
        }
        this.ownUnitsSelected() && this.hooks.onCommand(this.target(a, i, d));
      } else if (s.button === 0) {
        if (o === "place") {
          const d = this.cam.ground(a, i, this.W, this.H);
          d && this.hooks.onPlaceAt(d.x, d.z), this.hooks.onPlaceConfirm(t.shiftKey);
          return;
        }
        if (o === "rally") {
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
      l && this.hooks.onPlaceAt(l.x, l.z);
      return;
    }
    if (o === "rally") {
      l && this.hooks.onRally(l.x, l.z);
      return;
    }
    const h = this.target(a, i, l), c = this.world, u = this.ownUnitsSelected();
    if (h.kind === "unit" && c.owner[h.e] === this.me && c.kind[h.e] !== tt) {
      this.clickSelect(a, i, !1, r);
      return;
    }
    if (h.kind === "building" && c.owner[h.e] === this.me) {
      const d = !c.done[h.e] || dt[c.kind[h.e] - et].walk;
      u && d ? this.hooks.onCommand(h) : this.only(h.e);
      return;
    }
    if (u && l) {
      this.hooks.onCommand(h);
      return;
    }
    if (h.kind === "unit" || h.kind === "building") {
      this.only(h.e);
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
    for (const t of this.selected) if (this.world.isUnit(t) && this.world.owner[t] === this.me) return !0;
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
      if (!i.alive[l] || i.kind[l] >= et) continue;
      const h = i.owner[l] === this.me;
      if (a && !h) continue;
      const c = i.x[l] / 256, u = i.z[l] / 256;
      if (!h && !this.seen(c, u) || (this.cam.toScreen(c, J(i.map, c, u) + (i.kind[l] === tt ? 0.2 : 0.6), u, this.W, this.H, this.v), !this.v.z)) continue;
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
      const h = dt[a.kind[n] - et].size, c = J(a.map, r, l) + (h >= 3 ? 0.7 : 0.5);
      if (this.cam.toScreen(r, c, l, this.W, this.H, this.v), !this.v.z) continue;
      this.cam.toScreen(r + this.right.x * h * 0.55, c, l + this.right.z * h * 0.55, this.W, this.H, this.v2);
      const u = Math.max(18, Math.hypot(this.v2.x - this.v.x, this.v2.y - this.v.y)), d = Math.hypot(this.v.x - t, this.v.y - s) / u;
      d < o && (o = d, i = n);
    }
    return [i, o];
  }
  /** árvore, arbusto ou pedra perto do ponto (a copa de uma árvore cobre o chão atrás dela) */
  pickTile(t, s, a) {
    const i = this.world, o = i.size, n = Math.floor(a.x), r = Math.floor(a.z), l = this.lastTouch ? 36 : 28;
    let h = -1, c = l * l;
    for (let u = -3; u <= 2; u++) for (let d = -3; d <= 3; d++) {
      const f = n + d, p = r + u;
      if (f < 0 || p < 0 || f >= o || p >= o) continue;
      const b = p * o + f, g = i.map.tree[b] > 0;
      if (!(!(g || i.resKind[b]) || i.resAmt[b] <= 0 || !i.explored[this.me][b]) && !(i.resKind[b] === 3 && i.players[this.me].era < 2))
        for (const y of g ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(f + 0.5, J(i.map, f + 0.5, p + 0.5) + y, p + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const M = (this.v.x - t) ** 2 + (this.v.y - s) ** 2;
          M < c && (c = M, h = b);
        }
    }
    return h;
  }
  /** o que está sob o ponto da tela */
  target(t, s, a = this.cam.ground(t, s, this.W, this.H)) {
    const i = this.world, o = a?.x ?? 0, n = a?.z ?? 0, [r, l] = this.pickUnit(t, s, !1), [h, c] = this.pickBuilding(t, s);
    if (r >= 0 && (h < 0 || l < 14 || c > 0.75)) return { kind: "unit", e: r, k: -1, x: i.x[r] / 256, z: i.z[r] / 256 };
    if (h >= 0) return { kind: "building", e: h, k: -1, x: i.x[h] / 256, z: i.z[h] / 256 };
    if (a) {
      const u = this.pickTile(t, s, a);
      if (u >= 0) return { kind: "tile", e: -1, k: u, x: u % i.size + 0.5, z: Math.floor(u / i.size) + 0.5 };
    }
    return { kind: "ground", e: -1, k: -1, x: o, z: n };
  }
  clickSelect(t, s, a, i) {
    const o = this.world, n = this.target(t, s, null), r = n.kind === "unit" ? n.e : -1;
    if (a && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && o.owner[r] === this.me && o.kind[r] !== tt) {
      if (a || this.selected.clear(), i) {
        const l = o.kind[r];
        for (let h = 0; h < o.top; h++) if (o.isUnit(h) && o.owner[h] === this.me && o.kind[h] === l) {
          const c = o.x[h] / 256, u = o.z[h] / 256;
          this.cam.toScreen(c, J(o.map, c, u), u, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(h);
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
    const n = this.world, r = Math.min(t, a), l = Math.max(t, a), h = Math.min(s, i), c = Math.max(s, i);
    (!o || !this.ownUnitsSelected()) && this.selected.clear();
    for (let u = 0; u < n.top; u++) {
      if (!n.isUnit(u) || n.owner[u] !== this.me) continue;
      const d = n.x[u] / 256, f = n.z[u] / 256;
      this.cam.toScreen(d, J(n.map, d, f) + 0.5, f, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= h && this.v.y <= c && this.selected.add(u);
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
const Si = "origines_opts", Ps = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class hl {
  constructor(t) {
    m(this, "root");
    m(this, "screen", null);
    m(this, "rivals", 3);
    m(this, "diff", 1);
    this.act = t, this.root = document.getElementById("menus");
    try {
      const s = JSON.parse(localStorage.getItem(Si) ?? "{}");
      s.rivals >= 1 && s.rivals <= 3 && (this.rivals = s.rivals), s.diff >= 0 && s.diff <= 2 && (this.diff = s.diff);
    } catch {
    }
    zo(() => this.render());
  }
  get open() {
    return this.screen !== null;
  }
  get kind() {
    return this.screen?.k ?? null;
  }
  showStart(t) {
    this.screen = { k: "start", info: t, step: "main" }, this.render();
  }
  /** a nuvem respondeu depois: atualiza a tela inicial sem tirar a pessoa do passo em que está */
  updateStart(t) {
    this.screen?.k === "start" && (this.screen.info = t, this.render());
  }
  /** owner: a conta dona do jogo ('' sem conta); acc: a conta em que a pessoa está agora */
  showPause(t, s, a, i) {
    this.screen = { k: "pause", minutes: t, quality: s, saved: "", owner: a, acc: i }, this.render();
  }
  /** a conta mudou (entrou, saiu ou o jogo passou para a conta): redesenha a pausa */
  updatePause(t, s, a) {
    this.screen?.k === "pause" && (this.screen.owner = t, this.screen.acc = s, a && (this.screen.saved = a), this.render());
  }
  showEnd(t, s, a) {
    this.screen = { k: "end", result: t, minutes: s, era: a }, this.render();
  }
  hide() {
    this.screen = null, this.render();
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${z("lang.label")}"><button id="btn-idioma-en" aria-pressed="${oe() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${oe() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, s) {
    if (s === "off" || s === "loading") return "";
    const a = s.logado ? s.apelido ?? "" : "", i = (n) => `<b>${Ps(n)}</b>`, o = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${z("acct.pauseLogin")}</button>`;
    return t && t === a ? `<div class="acct on small"><p class="acct-l">${z("acct.pauseAccount", { name: i(a) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${z("acct.pauseOther", { name: i(t) })}</p>${a ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${z("acct.switch")}</button>` : o}</div>` : a ? `<div class="acct on small"><p class="acct-l">${z("acct.pauseAdopt", { name: i(a) })}</p></div>` : `<div class="acct small"><p class="acct-l">${z("acct.pauseNone")}</p>${o}</div>`;
  }
  render() {
    const t = this.screen, s = this.root;
    if (s.dataset.open = String(!!t), s.dataset.screen = t?.k ?? "", !t) {
      s.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: o, save: n, other: r } = t.info, l = typeof o == "object" && o.logado ? o.apelido ?? "" : "", h = (g) => `<b>${Ps(g)}</b>`, c = n ? n.adopt ? z("save.adopt", { name: h(l) }) : l ? z("save.inAccount", { name: h(l) }) : z("save.deviceOnly") : "", u = o === "off" ? "" : o === "loading" ? `<div class="acct"><p class="acct-l">${z("acct.checking")}</p></div>` : o.logado ? `<div class="acct on"><p class="acct-k">${z("acct.yours")}</p><p class="acct-name">${Ps(l)}</p><p class="acct-l">${z(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${z("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${z("acct.none")}</p><p class="acct-l">${z("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${z("acct.login")}</button>
            ${r ? `<p class="acct-s">${z("acct.otherHint", { name: h(r) })}</p>` : `<p class="acct-s">${z("acct.why")}</p>`}</div>`, d = o !== "loading" && !t.info.pending, f = `${u}
        ${d && n ? `<button id="btn-continuar" class="big primary">${z("menu.continue")}<small>${z("menu.saved", { era: z(`era.${n.meta.era}`), y: n.meta.year, r: n.meta.rivals })}</small><small class="where">${c}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${d && n ? "" : " primary"}">${z("menu.new")}</button>`, b = `${o === "off" ? "" : `<p class="muted small">${l ? z("new.inAccount", { name: h(l) }) : z("new.deviceOnly")}${n && !n.adopt ? " " + z("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${z("menu.rivals")}</div><div class="seg">${[1, 2, 3].map((g) => `<button data-rivais="${g}" aria-pressed="${this.rivals === g}">${g}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${z("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map((g) => `<button data-dificuldade="${g}" aria-pressed="${this.diff === g}">${z(`diff.${g}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${z("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${z("menu.back")}</button>`;
      s.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${z("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? f : b}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${z(W.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${z(W.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${W.opts.muted}">${xt(W.opts.muted ? "mute" : "sound")}</button><span class="credits">${z("menu.credits")}</span></div>
        ${o === "off" ? `<p class="local">${z("menu.local")}</p>` : ""}</div>`;
    } else t.k === "pause" ? s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${z("pause.title")}</h2><p class="muted">${z("pause.time", { m: t.minutes })}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${z("pause.resume")}</button>
        <button id="btn-salvar" class="big">${z("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${z({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${Ps(t.owner)}</b>` })}</p>` : ""}
        <div class="opt"><div class="opt-l">${z("q.label")}</div><div class="seg">${Ds.map((o, n) => `<button data-qualidade="${o.key}" aria-pressed="${t.quality === n}">${z(`q.${o.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${z("lang.label")}</div>${this.lang()}</div>
        ${["music", "sfx", "amb"].map((o) => `<div class="opt"><div class="opt-l">${z(`snd.${o}`)}</div><div class="seg">${[0, 1, 2, 3].map((n) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[o]}="${n}" aria-pressed="${W.opts[o] === n}">${z(`snd.l${n}`)}</button>`).join("")}</div></div>`).join("")}
        <div class="row2"><button id="btn-ajuda-pausa">${z("btn.help")}</button><button id="btn-sair">${z("pause.quit")}</button></div>
      </div></div>` : s.innerHTML = `<div class="screen end ${t.result}"><div class="card panel">
        <h2>${z(`end.${t.result}`)}</h2><p>${z(`end.${t.result}.d`)}</p><p class="muted">${z(`era.${t.era}`)} · ${z("pause.time", { m: t.minutes })}</p>
        <button id="btn-fim-menu" class="big primary">${z("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${z("end.watch")}</button>
      </div></div>`;
    const a = (o, n) => s.querySelectorAll(o).forEach((r) => r.onclick = () => n(r)), i = () => {
      try {
        localStorage.setItem(Si, JSON.stringify({ rivals: this.rivals, diff: this.diff }));
      } catch {
      }
    };
    a("#btn-idioma-en", () => zi("en")), a("#btn-idioma-pt", () => zi("pt")), a("#btn-continuar", () => this.act.cont()), a("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), a("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.render());
    }), a("[data-rivais]", (o) => {
      this.rivals = Number(o.dataset.rivais), i(), this.render();
    }), a("[data-dificuldade]", (o) => {
      this.diff = Number(o.dataset.dificuldade), i(), this.render();
    }), a("#btn-comecar", () => this.act.start(this.rivals, this.diff)), a("#btn-voltar-jogo", () => this.act.resume()), a("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const o = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = o, this.render());
    }), a("#btn-entrar-conta", () => this.act.login()), a("#btn-entrar-conta-pausa", () => this.act.loginPause()), a("#btn-perfil-conta-pausa", () => this.act.profile()), a("#btn-perfil-conta", () => this.act.profile()), a("[data-qualidade]", (o) => {
      const n = Ds.findIndex((r) => r.key === o.dataset.qualidade);
      n >= 0 && this.screen?.k === "pause" && (this.screen.quality = n, this.act.quality(n), this.render());
    }), a("#btn-ajuda-pausa", () => this.act.help()), a("#btn-som-inicio", () => {
      W.toggleMute(), this.render();
    }), a("[data-musica]", (o) => {
      W.setOpts({ music: Number(o.dataset.musica), muted: !1 }), this.render();
    }), a("[data-efeitos]", (o) => {
      W.setOpts({ sfx: Number(o.dataset.efeitos), muted: !1 }), this.render();
    }), a("[data-ambiente]", (o) => {
      W.setOpts({ amb: Number(o.dataset.ambiente), muted: !1 }), this.render();
    }), a("#btn-sair", () => this.act.quit()), a("#btn-fim-menu", () => this.act.toMenu()), a("#btn-continuar-olhando", () => this.act.watch()), s.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function dl(e, t, s, a) {
  const i = s.filter((c) => e.isUnit(c) && e.owner[c] === t), o = i.filter((c) => e.kind[c] === Q.villager), n = i.filter((c) => e.kind[c] !== Q.villager), r = Math.round(a.x * 256), l = Math.round(a.z * 256), h = (c) => c.length ? [{ type: "move", player: t, ids: c, x: r, z: l }] : [];
  if (a.kind === "tile" && o.length) return { cmds: [{ type: "gather", player: t, ids: o, k: a.k }, ...h(n)], ping: "work" };
  if (a.kind === "building" && e.alive[a.e]) {
    const c = a.e;
    return e.owner[c] === t ? { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: c }] : [], ...h(n)], ping: o.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: i, target: c }], ping: "attack" };
  }
  if (a.kind === "unit" && e.alive[a.e]) {
    const c = a.e;
    if (e.kind[c] === tt) return { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: c }] : [], ...h(n)], ping: o.length ? "work" : "move" };
    if (e.owner[c] !== t && (e.owner[c] === it || e.hostile(t, e.owner[c]))) return { cmds: [{ type: "attack", player: t, ids: i, target: c }], ping: "attack" };
  }
  return { cmds: h(i), ping: "move" };
}
const ul = (e, t) => {
  for (const s of t) if (e.isUnit(s) && e.kind[s] === Q.villager) return !0;
  return !1;
}, Ao = 1, To = [
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
], Ci = /* @__PURE__ */ new WeakMap();
function fl(e) {
  let t = Ci.get(e);
  if (t) return t;
  const s = Zi(e.map.seed, e.players.length), a = s.size * s.size, i = new Uint8Array(a), o = new Int32Array(a);
  for (let n = 0; n < a; n++) s.tree[n] && (o[n] = s.wood[n] * 100);
  for (const n of s.res) {
    const r = n.z * s.size + n.x;
    i[r] = n.kind, o[r] = n.amount * 100;
  }
  return t = { tree: s.tree, kind: i, amt: o }, Ci.set(e, t), t;
}
function pl(e) {
  const t = [];
  let s = 0, a = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i] ? 1 : 0;
    o === s ? a++ : (t.push(a), s = o, a = 1);
  }
  return t.push(a), t;
}
function wi(e, t) {
  let s = 0, a = 0;
  for (const i of e)
    a && t.fill(1, s, s + i), s += i, a ^= 1;
}
function ml(e) {
  const t = fl(e), s = e.size, a = e.top, i = {};
  for (const c of To) i[c] = Array.from(e[c].subarray(0, a));
  const o = [];
  for (let c = 0; c < a; c++) e.alive[c] && e.queue[c].length && o.push([c, e.queue[c].slice()]);
  const n = [], r = [], l = [];
  for (let c = 0; c < s * s; c++)
    t.tree[c] && !e.map.tree[c] && n.push(c), e.resAmt[c] !== t.amt[c] && r.push(c, e.resAmt[c]), e.resKind[c] !== t.kind[c] && l.push(c, e.resKind[c]);
  const h = e.players.find((c) => !c.ai) ?? e.players[0];
  return {
    v: Ao,
    seed: e.map.seed,
    players: e.players.length,
    humans: e.players.filter((c) => !c.ai).length,
    difficulty: e.difficulty,
    tick: e.tick,
    rng: e.rng.save(),
    top: a,
    ent: i,
    queue: o,
    P: e.players.map((c) => ({ res: { ...c.res }, era: c.era, aging: c.aging, agingB: c.agingB, hunger: c.hunger, defeated: c.defeated, lastAlert: c.lastAlert, ai: c.ai, tech: c.tech })),
    ai: e.ai.map((c) => ({ ...c })),
    barbNext: e.barbNext,
    barbWarned: e.barbWarned,
    outcome: e.outcome,
    cut: n,
    amt: r,
    kindDiff: l,
    explored: e.explored.map(pl),
    projectiles: e.projectiles.map((c) => ({ ...c })),
    meta: { era: h.era, year: e.year, rivals: e.players.filter((c) => c.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600) }
  };
}
function So(e) {
  if (!e || e.v !== Ao) throw new Error("save version");
  const t = new fo(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty }), s = t.size, a = s * s;
  for (const i of To) {
    const o = t[i];
    o.fill(i === "ignoreT" || i === "dropB" || i === "tgt" ? -1 : 0), e.ent[i] && o.set(e.ent[i]);
  }
  t.top = e.top;
  for (let i = 0; i < Y; i++)
    t.queue[i] = [], t.field[i] = null, t.path[i] = null;
  for (const [i, o] of e.queue) t.queue[i] = o.slice();
  if (t.px.set(t.x), t.pz.set(t.z), !e.ent.foodMode)
    for (let i = 0; i < e.top; i++) t.alive[i] && t.kind[i] === et + wt.center && (t.hp[i] = Math.min(dt[wt.center].hp, t.hp[i] * 2));
  for (const i of e.cut)
    t.map.tree[i] = 0, t.map.wood[i] = 0;
  for (let i = 0; i < e.amt.length; i += 2) t.resAmt[e.amt[i]] = e.amt[i + 1];
  for (let i = 0; i < e.kindDiff.length; i += 2) t.resKind[e.kindDiff[i]] = e.kindDiff[i + 1];
  for (let i = 0; i < a; i++) t.resKind[i] === $t && t.resAmt[i] <= 0 && (t.resKind[i] = 0, t.resAmt[i] = 0);
  t.bAt.fill(0);
  for (let i = 0; i < a; i++) {
    const o = t.map.terrain[i];
    t.blocked[i] = o === ge || o === $e || t.map.tree[i] || t.resKind[i] ? 1 : 0;
  }
  for (let i = 0; i < t.top; i++) if (t.alive[i] && t.kind[i] >= et) {
    const [o, n, r] = t.footprint(i), l = dt[t.kind[i] - et].walk;
    for (let h = 0; h < r; h++) for (let c = 0; c < r; c++) {
      const u = (n + h) * s + o + c;
      t.bAt[u] = i + 1, l || (t.blocked[u] = 1);
    }
  }
  e.explored.forEach((i, o) => {
    t.explored[o].fill(0), wi(i, t.explored[o]);
  }), e.P.forEach((i, o) => {
    const n = t.players[o];
    Object.assign(n.res, i.res), n.era = i.era, n.aging = i.aging, n.agingB = i.agingB, n.hunger = i.hunger, n.defeated = i.defeated, n.lastAlert = i.lastAlert, n.ai = i.ai, n.tech = i.tech ?? 0;
  }), t.ai = e.ai.map((i) => ({ ...i })), t.barbNext = e.barbNext, t.barbWarned = e.barbWarned, t.outcome = e.outcome, t.tick = e.tick, t.rng.load(e.rng), t.projectiles = e.projectiles.map((i) => ({ ...i })), t.events.length = 0;
  for (let i = 0; i < t.top; i++) t.alive[i] && t.state[i] === At && (t.task[i] === gt ? t.goPoint(i, t.slotX[i], t.slotZ[i]) : t.state[i] = ft);
  return t.updateFog(), e.explored.forEach((i, o) => {
    t.explored[o].fill(0), wi(i, t.explored[o]);
  }), t;
}
const $i = "origines_save_v1", js = "origines_save_meta_v1", Ie = (e) => e ? `${$i}@${e}` : $i, us = (e) => e ? `${js}@${e}` : js;
function Co(e, t) {
  try {
    return localStorage.setItem(Ie(t), JSON.stringify(e)), localStorage.setItem(us(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function Ei(e, t) {
  const s = ml(e);
  return s.meta.savedAt = Date.now(), { d: s, ok: Co(s, t) };
}
function gl(e, t) {
  Co(e, t);
}
function ls(e) {
  try {
    const t = localStorage.getItem(us(e));
    return t && localStorage.getItem(Ie(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function bl(e) {
  try {
    const t = localStorage.getItem(Ie(e));
    return t ? So(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function Wa(e) {
  try {
    localStorage.removeItem(Ie(e)), localStorage.removeItem(us(e));
  } catch {
  }
}
function Da(e, t) {
  if (e !== t)
    try {
      const s = localStorage.getItem(Ie(e)), a = localStorage.getItem(us(e));
      if (!s || !a) return;
      localStorage.setItem(Ie(t), s), localStorage.setItem(us(t), a), Wa(e);
    } catch {
    }
}
function yl(e) {
  try {
    const t = localStorage.getItem(Ie(e));
    if (!t) return null;
    const s = JSON.parse(t);
    return { seed: s.seed, tick: s.tick };
  } catch {
    return null;
  }
}
const wo = "origines_save_contas_v1", vl = () => {
  try {
    return localStorage.getItem(wo) === "1";
  } catch {
    return !0;
  }
}, kl = () => {
  try {
    localStorage.setItem(wo, "1");
  } catch {
  }
};
function xl() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const s = localStorage.key(t);
      if (!s || !s.startsWith(js + "@")) continue;
      const a = s.slice(js.length + 1), i = ls(a);
      i && e.push({ dono: a, meta: i });
    }
  } catch {
  }
  return e.sort((t, s) => (s.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const ja = "/api/origines/save", $o = !location.pathname.startsWith("/jogar/");
let Nt = null, ce = null, Eo = $o;
const Io = [], fs = () => Io.forEach((e) => e()), Js = () => Eo ? !Nt || !ce ? "off" : ce : "loading", Ml = (e) => {
  Io.push(e);
}, Pe = () => !!ce?.logado, he = () => ce?.logado ? ce.apelido ?? "" : "";
async function zl() {
  if (!$o) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, s) => {
        const a = document.createElement("script");
        a.src = "/conta.js?v=2", a.onload = () => t(), a.onerror = () => s(new Error("conta")), document.head.appendChild(a);
      }), Nt = e.QGConta ?? null, Nt && (ce = await Nt.me(), Nt.aoMudar((t) => {
        ce = t, fs();
      }));
    } catch {
      Nt = null, ce = null;
    }
    Eo = !0, fs();
  }
}
async function be() {
  if (!Nt) return;
  const e = he();
  try {
    const t = await Nt.me();
    t && (ce = t);
  } catch {
  }
  he() !== e && fs();
}
const Ii = async () => {
  Nt && (await Nt.entrar(), await be(), fs());
};
async function Al() {
  Nt && (await Nt.perfil(), await be(), Pe() || (await Nt.entrar({ aba: "entrar" }), await be()), fs());
}
async function Tl() {
  if (!Pe()) return null;
  try {
    const e = await fetch(ja, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function Po() {
  if (!Pe()) return null;
  try {
    const e = await fetch(`${ja}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const Oo = (e, t = !1) => fetch(ja, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function Pi(e, t, s = !1) {
  if (s || await be(), !Pe()) return "none";
  if (!t || he() !== t) return "other";
  try {
    const a = { dados: e };
    return s && JSON.stringify(a).length > 6e4 && (s = !1), (await Oo(a, s)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function Sl(e) {
  if (await be(), !(!e || he() !== e))
    try {
      await Oo({ apagar: !0 });
    } catch {
    }
}
const Cl = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), Oi = /* @__PURE__ */ new WeakMap();
function Va(e) {
  let t = Oi.get(e);
  if (!t) {
    const s = e.sampleRate * 2, a = e.createBuffer(1, s, e.sampleRate), i = a.getChannelData(0);
    let o = 22222;
    for (let n = 0; n < s; n++)
      o = o * 16807 % 2147483647, i[n] = o / 10737418235e-1 - 1;
    t = { noise: a, pluck: /* @__PURE__ */ new Map() }, Oi.set(e, t);
  }
  return t;
}
function De(e, t, s) {
  const a = e.createBufferSource();
  return a.buffer = Va(e).noise, a.loop = !0, a.start(t, t * 7.31 % 1.5), a.stop(t + s + 0.05), a;
}
function ht(e, t, s, a, i, o = 0) {
  const n = e.createGain(), r = Math.max(2e-4, s);
  return n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + a), o && n.gain.setValueAtTime(r, t + a + o), n.gain.exponentialRampToValueAtTime(1e-4, t + a + o + i), n;
}
function Ct(e, t, s, a = 1) {
  const i = e.createBiquadFilter();
  return i.type = t, i.frequency.value = s, i.Q.value = a, i;
}
function yt(e, t, s, a, i) {
  const o = e.createOscillator();
  return o.type = t, o.frequency.setValueAtTime(s, a), o.start(a), o.stop(a + i + 0.05), o;
}
function nt(...e) {
  for (let t = 0; t < e.length - 1; t++) e[t].connect(e[t + 1]);
  return e[e.length - 1];
}
function st(e, t, s, a, i, o, n, r, l = 4e-3) {
  const h = yt(e, a, i, s, n);
  h.frequency.exponentialRampToValueAtTime(Math.max(20, o), s + n), nt(h, ht(e, s, r, l, n), t);
}
function Z(e, t, s, a, i, o, n, r, l = 3e-3) {
  nt(De(e, s, n + l), Ct(e, a, i, o), ht(e, s, r, l, n), t);
}
function la(e, t, s, a, i) {
  const o = De(e, s, i.dur), n = Ct(e, "bandpass", i.f, 3), r = e.createGain(), l = yt(e, "sine", i.lfo[0], s, i.dur), h = e.createGain();
  return l.frequency.linearRampToValueAtTime(i.lfo[1], s + i.dur * 0.9), h.gain.value = 0.5, r.gain.value = 0.5, l.connect(h).connect(r.gain), nt(o, n, r, ht(e, s, 0.1 * a, i.dur * 0.22, i.dur * 0.73), t), Z(e, t, s + i.snapAt, "bandpass", i.snapF, 2, 0.03, (i.snap ?? 0.08) * a), Math.max(i.dur, i.snapAt + 0.06);
}
function Rt(e, t, s, a, i, o = [1, 2.4, 3.6, 5.1], n = 1.6) {
  o.forEach((r, l) => nt(yt(e, "sine", a * r, s, n), ht(e, s, i / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function wl(e, t, s, a, i, o) {
  const n = yt(e, "sine", a, s, o), r = yt(e, "sine", a * 1.4, s, o), l = e.createGain();
  l.gain.setValueAtTime(a * 1.6, s), l.gain.exponentialRampToValueAtTime(a * 0.1, s + o), r.connect(l).connect(n.frequency), nt(n, ht(e, s, i, 2e-3, o), t);
  for (const [h, c] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const u of [1, 1.007]) nt(yt(e, "sine", a * h * u, s, o * 0.7), ht(e, s, i * c * 0.5, 2e-3, o * (0.7 - h * 0.04)), t);
}
function $l(e, t) {
  const s = Math.round(t * 10), a = Va(e);
  let i = a.pluck.get(s);
  if (i) return i;
  const o = e.sampleRate, n = Math.floor(o * 1.8), r = Math.max(2, Math.round(o / t));
  i = e.createBuffer(1, n, o);
  const l = i.getChannelData(0), h = new Float32Array(r);
  let c = s * 7 + 1;
  for (let u = 0; u < r; u++)
    c = c * 16807 % 2147483647, h[u] = (c / 10737418235e-1 - 1) * 0.6;
  for (let u = 0, d = 0; u < n; u++) {
    const f = h[d], p = h[(d + 1) % r];
    h[d] = 0.996 * 0.5 * (f + p), l[u] = f, d = (d + 1) % r;
  }
  return a.pluck.set(s, i), i;
}
function El(e, t, s, a, i, o = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = $l(e, a), r.start(s), r.stop(s + n), nt(r, Ct(e, "lowpass", o, 0.7), ht(e, s, i, 2e-3, n), t);
}
function Dt(e, t, s, a, i, o, n, r, l = "sawtooth") {
  const h = e.createOscillator();
  h.type = l, h.frequency.setValueAtTime(i[0][1], s);
  for (const [f, p] of i.slice(1)) h.frequency.linearRampToValueAtTime(p, s + f);
  const c = e.createOscillator(), u = e.createGain();
  c.frequency.value = n[0], u.gain.value = n[1], c.connect(u).connect(h.frequency), h.start(s), h.stop(s + a + 0.05), c.start(s), c.stop(s + a + 0.05);
  const d = ht(e, s, r, Math.min(0.05, a * 0.2), a * 0.8, a * 0.1);
  for (const [f, p] of o) {
    const b = e.createGain();
    b.gain.value = p, nt(h, Ct(e, "bandpass", f, 6), b, d);
  }
  d.connect(t);
}
function Os(e) {
  const t = e.createBufferSource();
  return t.buffer = Va(e).noise, t.loop = !0, t.start(), t;
}
function Ea(e, t, s, a, i) {
  const o = 3 + i % 4, n = 2600 + i * 137 % 1600;
  for (let r = 0; r < o; r++) {
    const l = s + r * (0.07 + (i + r) % 3 * 0.02), h = n * (1 + (i * (r + 3) % 7 - 3) * 0.06), c = yt(e, "sine", h, l, 0.07);
    c.frequency.exponentialRampToValueAtTime(h * (r % 2 ? 0.8 : 1.35), l + 0.06), nt(c, ht(e, l, 0.05 * a, 0.01, 0.05), t);
  }
  return o * 0.1;
}
const Ht = {
  // interface
  "ui.click": (e, t, s, a) => (st(e, t, s, "sine", 700, 420, 0.05, 0.2 * a), Z(e, t, s, "bandpass", 2400, 2, 0.025, 0.06 * a), 0.08),
  "ui.denied": (e, t, s, a) => {
    const i = yt(e, "sine", 240, s, 0.15);
    return i.frequency.exponentialRampToValueAtTime(170, s + 0.14), nt(i, Ct(e, "lowpass", 900), ht(e, s, 0.16 * a, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, s, a) => (st(e, t, s, "triangle", 560, 480, 0.05, 0.12 * a), st(e, t, s + 0.07, "triangle", 700, 600, 0.05, 0.1 * a), 0.14),
  "sel.soldier": (e, t, s, a) => (st(e, t, s, "sine", 180, 90, 0.12, 0.24 * a), Z(e, t, s, "lowpass", 600, 1, 0.04, 0.1 * a), 0.14),
  "sel.building": (e, t, s, a) => (st(e, t, s, "sine", 300, 220, 0.08, 0.18 * a), st(e, t, s + 0.09, "sine", 300, 220, 0.08, 0.13 * a), 0.2),
  "order.move": (e, t, s, a) => (Z(e, t, s, "lowpass", 500, 1, 0.05, 0.13 * a), Z(e, t, s + 0.11, "lowpass", 450, 1, 0.05, 0.11 * a), 0.18),
  "order.work": (e, t, s, a) => (Z(e, t, s, "bandpass", 2600, 3, 0.03, 0.12 * a), st(e, t, s, "sine", 1500, 1300, 0.02, 0.05 * a), 0.05),
  "order.attack": (e, t, s, a) => (st(e, t, s, "sine", 150, 70, 0.18, 0.28 * a), Z(e, t, s, "lowpass", 800, 1, 0.05, 0.1 * a), 0.2),
  place: (e, t, s, a) => (st(e, t, s, "sine", 190, 85, 0.2, 0.3 * a), Z(e, t, s, "lowpass", 400, 1, 0.08, 0.12 * a), 0.22),
  "place.bad": (e, t, s, a) => {
    const i = yt(e, "triangle", 170, s, 0.17);
    return i.frequency.exponentialRampToValueAtTime(120, s + 0.16), nt(i, Ct(e, "lowpass", 900), ht(e, s, 0.18 * a, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, s, a) => (Rt(e, t, s, 880, 0.14 * a, [1, 1.5], 0.35), 0.4),
  built: (e, t, s, a) => (st(e, t, s, "sine", 180, 100, 0.14, 0.2 * a), st(e, t, s + 0.12, "sine", 150, 90, 0.14, 0.18 * a), Rt(e, t, s + 0.26, 1046, 0.09 * a, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, s, a) => (Rt(e, t, s, 660, 0.15 * a, [1, 2, 2.76, 4.07], 1.6), Rt(e, t, s + 0.18, 990, 0.1 * a, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, s, a) => ([880, 1108, 1320].forEach((i, o) => Rt(e, t, s + o * 0.11, i, 0.09 * a, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, s, a) => {
    const i = ht(e, s, 0.2 * a, 0.18, 0.4, 0.9), o = Ct(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = yt(e, "sawtooth", n, s, 1.6), h = e.createGain();
      h.gain.value = r, nt(l, h, o);
    }
    return nt(o, i, t), 1.6;
  },
  "drums.war": (e, t, s, a) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((i, o) => {
    st(e, t, s + i, "sine", 95, 55, 0.3, (0.12 + o * 0.025) * a), Z(e, t, s + i, "lowpass", 300, 1, 0.05, 0.06 * a);
  }), 2.9),
  gong: (e, t, s, a) => (Rt(e, t, s, 110, 0.22 * a, [1, 1.44, 2.05, 2.84, 3.82], 3), Z(e, t, s, "lowpass", 2e3, 1, 0.05, 0.08 * a), 3),
  winter: (e, t, s, a) => {
    const i = De(e, s, 1.8), o = Ct(e, "lowpass", 300, 0.8);
    return o.frequency.linearRampToValueAtTime(900, s + 0.8), o.frequency.linearRampToValueAtTime(300, s + 1.7), nt(i, o, ht(e, s, 0.1 * a, 0.5, 1.2), t), Rt(e, t, s + 0.3, 520, 0.1 * a, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, s, a) => {
    for (let i = 0; i < 5; i++) Ea(e, t, s + i * 0.22, a * 1.6, 3 + i * 5);
    return 1.6;
  },
  hunger: (e, t, s, a) => (nt(yt(e, "sine", 98, s, 1.1), ht(e, s, 0.1 * a, 0.1, 0.9), t), nt(yt(e, "sine", 147, s, 1.1), ht(e, s, 0.06 * a, 0.1, 0.9), t), 1.1),
  soft: (e, t, s, a) => (Rt(e, t, s, 784, 0.07 * a, [1, 2], 0.5), 0.5),
  fair: (e, t, s, a) => {
    [587, 740, 880, 988, 880].forEach((i, o) => ps(e, t, s + o * 0.14, i, 0.13, 0.1 * a));
    for (let i = 0; i < 4; i++) Vs(e, t, s + i * 0.18, 0.5 * a);
    return 0.9;
  },
  // trabalho
  "work.chop": (e, t, s, a) => (Z(e, t, s, "bandpass", 1100, 1.5, 0.05, 0.28 * a), st(e, t, s, "sine", 260, 170, 0.06, 0.18 * a), 0.08),
  "work.pick": (e, t, s, a) => (Rt(e, t, s, 2100, 0.1 * a, [1, 1.45], 0.09), Z(e, t, s, "highpass", 3e3, 1, 0.015, 0.06 * a), 0.1),
  "work.pickMetal": (e, t, s, a) => (Rt(e, t, s, 2600, 0.09 * a, [1, 1.5, 2.04], 0.2), Z(e, t, s, "highpass", 3e3, 1, 0.012, 0.05 * a), 0.2),
  "work.hoe": (e, t, s, a) => (Z(e, t, s, "lowpass", 350, 1, 0.09, 0.22 * a), st(e, t, s, "sine", 120, 80, 0.08, 0.12 * a), 0.1),
  "work.mallet": (e, t, s, a) => (st(e, t, s, "sine", 330, 240, 0.07, 0.22 * a), Z(e, t, s, "bandpass", 900, 1.5, 0.04, 0.1 * a), 0.08),
  "work.rustle": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.15]) Z(e, t, s + i, "bandpass", 4e3, 1, 0.05, 0.06 * a);
    return 0.22;
  },
  "drop.wood": (e, t, s, a) => (st(e, t, s, "sine", 160, 110, 0.12, 0.2 * a), Z(e, t, s, "lowpass", 500, 1, 0.06, 0.1 * a), 0.14),
  "drop.stone": (e, t, s, a) => {
    for (let i = 0; i < 4; i++) Z(e, t, s + i * 0.035, "bandpass", 1500 + i * 200, 2, 0.03, 0.08 * a);
    return 0.18;
  },
  "drop.food": (e, t, s, a) => {
    for (const i of [0, 0.06]) Z(e, t, s + i, "bandpass", 2e3, 1, 0.06, 0.07 * a);
    return 0.14;
  },
  "drop.metal": (e, t, s, a) => (Rt(e, t, s, 2600, 0.07 * a, [1, 1.5], 0.15), Rt(e, t, s + 0.07, 2900, 0.06 * a, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, s, a) => {
    const i = yt(e, "sawtooth", 90, s, 0.45);
    return i.frequency.linearRampToValueAtTime(70, s + 0.45), nt(i, Ct(e, "bandpass", 400, 4), ht(e, s, 0.05 * a, 0.05, 0.4), t), Z(e, t, s + 0.4, "lowpass", 700, 1, 0.7, 0.18 * a, 0.01), st(e, t, s + 0.4, "sine", 70, 45, 0.4, 0.16 * a), 1.2;
  },
  "res.crumble": (e, t, s, a) => {
    for (let i = 0; i < 5; i++) Z(e, t, s + i * 0.09, "lowpass", 900, 1, 0.08, (0.14 - i * 0.02) * a);
    return 0.55;
  },
  puff: (e, t, s, a) => (Z(e, t, s, "lowpass", 600, 0.7, 0.3, 0.15 * a, 0.02), st(e, t, s, "sine", 150, 100, 0.12, 0.05 * a), 0.34),
  "fall.animal": (e, t, s, a) => (st(e, t, s, "sine", 95, 50, 0.25, 0.22 * a), Z(e, t, s + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * a, 0.02), 0.4),
  crash: (e, t, s, a) => {
    Z(e, t, s, "lowpass", 1200, 0.8, 1.1, 0.26 * a, 0.01);
    for (const i of [0, 0.18, 0.36]) st(e, t, s + i, "sine", 80, 45, 0.25, 0.18 * a);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, s, a) => (st(e, t, s, "sine", 320, 210, 0.07, 0.26 * a), Z(e, t, s, "bandpass", 1600, 1.5, 0.04, 0.1 * a), 0.08),
  "hit.axe": (e, t, s, a) => (Z(e, t, s, "bandpass", 1e3, 2, 0.06, 0.26 * a), st(e, t, s, "sine", 240, 160, 0.06, 0.16 * a), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, s, a) => (wl(e, t, s, 1250, 0.07 * a, 0.55), Z(e, t, s, "highpass", 4500, 0.8, 0.05, 0.09 * a), st(e, t, s, "sine", 260, 170, 0.05, 0.1 * a), 0.55),
  "hit.spear": (e, t, s, a) => {
    const i = De(e, s, 0.12), o = Ct(e, "bandpass", 2200, 2);
    return o.frequency.exponentialRampToValueAtTime(900, s + 0.1), nt(i, o, ht(e, s, 0.12 * a, 0.01, 0.1), t), st(e, t, s + 0.08, "sine", 400, 300, 0.03, 0.08 * a), 0.13;
  },
  "hit.wall": (e, t, s, a) => (st(e, t, s, "sine", 200, 130, 0.09, 0.24 * a), Z(e, t, s, "lowpass", 700, 1, 0.05, 0.12 * a), 0.1),
  "hit.bite": (e, t, s, a) => (Z(e, t, s, "bandpass", 1500, 2, 0.04, 0.12 * a), st(e, t, s, "sine", 500, 300, 0.05, 0.08 * a), Dt(e, t, s, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * a), 0.2),
  "hit.boar": (e, t, s, a) => (Dt(e, t, s, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * a), Dt(e, t, s + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * a), st(e, t, s, "sine", 120, 70, 0.12, 0.12 * a), 0.25),
  "hit.aurochs": (e, t, s, a) => (st(e, t, s, "sine", 100, 55, 0.2, 0.2 * a), Z(e, t, s, "bandpass", 700, 1.5, 0.12, 0.08 * a), 0.22),
  throw: (e, t, s, a) => {
    const i = De(e, s, 0.36), o = Ct(e, "bandpass", 500, 1.2);
    return o.frequency.exponentialRampToValueAtTime(1600, s + 0.15), o.frequency.exponentialRampToValueAtTime(700, s + 0.34), nt(i, o, ht(e, s, 0.1 * a, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, s, a) => la(e, t, s, a, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, s, a) => la(e, t, s, a, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, s, a) => la(e, t, s, a, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  "arrow.hit": (e, t, s, a) => (st(e, t, s, "sine", 420, 260, 0.04, 0.16 * a), Z(e, t, s, "bandpass", 2200, 2, 0.03, 0.08 * a), 0.06),
  "spear.hit": (e, t, s, a) => (st(e, t, s, "sine", 300, 180, 0.06, 0.2 * a), Z(e, t, s, "bandpass", 1500, 2, 0.04, 0.08 * a), 0.08),
  "stone.hit": (e, t, s, a) => (Z(e, t, s, "bandpass", 2600, 4, 0.03, 0.16 * a), st(e, t, s, "sine", 950, 800, 0.02, 0.06 * a), 0.05),
  "ram.boom": (e, t, s, a) => (st(e, t, s, "sine", 72, 42, 0.55, 0.42 * a), Z(e, t, s, "lowpass", 350, 1, 0.4, 0.24 * a), Z(e, t, s + 0.02, "bandpass", 900, 2, 0.08, 0.08 * a), 0.6),
  "ram.creak": (e, t, s, a) => {
    const i = yt(e, "sawtooth", 140, s, 0.3);
    return i.frequency.linearRampToValueAtTime(120, s + 0.3), nt(i, Ct(e, "bandpass", 600, 5), ht(e, s, 0.03 * a, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, s, a) => (Dt(e, t, s, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * a), 0.7),
  "animal.horse": (e, t, s, a) => (Dt(e, t, s, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * a), 0.9),
  "animal.dog": (e, t, s, a) => {
    for (const i of [0, 0.16]) Dt(e, t, s + i, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * a);
    return 0.28;
  },
  "animal.wolf": (e, t, s, a) => (Dt(e, t, s, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * a), 0.45),
  "animal.howl": (e, t, s, a) => {
    for (const [i, o] of [[0, 1], [0.28, 0.3]]) {
      const n = yt(e, "sine", 420, s + i, 1.6);
      n.frequency.linearRampToValueAtTime(620, s + i + 0.6), n.frequency.linearRampToValueAtTime(540, s + i + 1.5), nt(n, Ct(e, "lowpass", 1200), ht(e, s + i, 0.05 * a * o, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, s, a) => (Dt(e, t, s, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * a), Dt(e, t, s + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * a), 0.28),
  "animal.aurochs": (e, t, s, a) => (Dt(e, t, s, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * a), 1),
  "animal.deer": (e, t, s, a) => (Z(e, t, s, "bandpass", 1200, 2, 0.12, 0.07 * a), Z(e, t, s + 0.05, "bandpass", 600, 2, 0.1, 0.05 * a), 0.17),
  "animal.crow": (e, t, s, a) => {
    for (const i of [0, 0.3]) Dt(e, t, s + i, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * a);
    return 0.5;
  },
  "animal.hooves": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.2, 0.27])
      st(e, t, s + i, "sine", 180, 120, 0.04, 0.1 * a), Z(e, t, s + i, "lowpass", 900, 1, 0.02, 0.05 * a);
    return 0.32;
  },
  bird: (e, t, s, a) => Ea(e, t, s, a, 1 + Math.floor(s * 977 % 97))
}, Il = {
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
for (const [e, t] of Object.entries(Il)) {
  const s = Ht[e];
  Ht[e] = (a, i, o, n) => s(a, i, o, n * t);
}
function ne(e, t, s, a, i) {
  st(e, t, s, "sine", a * 1.6, a, 0.4, 0.22 * i), Z(e, t, s, "lowpass", 400, 1, 0.05, 0.08 * i);
}
function ps(e, t, s, a, i, o, n = 0.22) {
  const r = ht(e, s, 0.13 * o, 0.05, 0.14, Math.max(0, i - 0.08)), l = yt(e, "sine", a, s, i + 0.3), h = yt(e, "triangle", a * 2, s, i + 0.3), c = e.createGain();
  c.gain.value = n;
  const u = yt(e, "sine", 5, s, i + 0.3), d = e.createGain();
  d.gain.setValueAtTime(0, s), d.gain.linearRampToValueAtTime(a * 6e-3, s + 0.2), u.connect(d), d.connect(l.frequency), d.connect(h.frequency), nt(l, r), nt(h, c, r), r.connect(t), nt(De(e, s, i + 0.1), Ct(e, "bandpass", a * 2, 8), ht(e, s, 0.02 * o, 0.03, 0.1, Math.max(0, i - 0.05)), t);
}
function Pl(e, t, s, a, i, o) {
  ps(e, t, s, a, i, o * 0.9, 0.05);
}
function Ol(e, t, s, a, i) {
  El(e, t, s, a, 0.2 * i);
}
function Bl(e, t, s, a, i) {
  nt(yt(e, "sine", a, s, 0.4), ht(e, s, 0.12 * i, 2e-3, 0.35), t), nt(yt(e, "sine", a * 2.92, s, 0.2), ht(e, s, 0.04 * i, 2e-3, 0.15), t), Z(e, t, s, "bandpass", 3e3, 3, 0.01, 0.03 * i);
}
function Ia(e, t, s, a, i) {
  Rt(e, t, s, a, 0.08 * i, [1, 2.4, 3.6, 5.1], 2);
}
function Pa(e, t, s, a, i, o) {
  const n = Ct(e, "lowpass", a * 3, 0.8);
  n.frequency.linearRampToValueAtTime(a * 6, s + 0.15), n.frequency.linearRampToValueAtTime(a * 4, s + i);
  for (const r of [1, 1.004]) nt(yt(e, "sawtooth", a * r, s, i + 0.3), n);
  nt(n, ht(e, s, 0.07 * o, 0.08, 0.2, Math.max(0, i - 0.1)), t);
}
function Rl(e, t, s, a, i, o) {
  const n = Ct(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.setValueAtTime(1e-4, s), r.gain.linearRampToValueAtTime(0.05 * o, s + 1.5), r.gain.setValueAtTime(0.05 * o, s + Math.max(1.5, i - 1.5)), r.gain.linearRampToValueAtTime(1e-4, s + i);
  for (const l of [1, 1.5]) nt(yt(e, "sawtooth", a * l, s, i), n);
  nt(n, r, t);
}
function Vs(e, t, s, a) {
  Z(e, t, s, "highpass", 5e3, 1, 0.06, 0.05 * a, 5e-3);
}
const It = (e) => 440 * Math.pow(2, (e - 69) / 12);
function Bo(e, t, s, a, i) {
  const o = It(a.m), n = a.d * i;
  switch (a.i) {
    case "drum":
      ne(e, t, s, o, a.v);
      break;
    case "drumHi":
      ne(e, t, s, o * 1.8, a.v * 0.8);
      break;
    case "flute":
      ps(e, t, s, o, n, a.v);
      break;
    case "ocarina":
      Pl(e, t, s, o, n, a.v);
      break;
    case "lyre":
      Ol(e, t, s, o, a.v);
      break;
    case "stones":
      Bl(e, t, s, o, a.v);
      break;
    case "bells":
      Ia(e, t, s, o, a.v);
      break;
    case "horn":
      Pa(e, t, s, o, n, a.v);
      break;
    case "drone":
      Rl(e, t, s, o, n, a.v);
      break;
    case "shaker":
      Vs(e, t, s, a.v);
      break;
  }
}
const ms = 62, Oa = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], ql = [...Oa.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...Oa.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], Nl = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], Le = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function Ba() {
  const e = [];
  let t = 0;
  const s = (a, i, o) => a.forEach((n, r) => {
    let l = 0;
    for (const [h, c] of n)
      e.push({ b: (t + r) * 4 + l, i, m: ms + h, d: c, v: o }), l += c;
  });
  for (let a = 0; a < 4; a++, t += 8) {
    s(a === 2 ? Nl : a === 1 ? ql : Oa, "flute", 1);
    for (let i = 0; i < 8; i++) {
      const o = (t + i) * 4;
      if (e.push({ b: o, i: "drum", m: 38, d: 1, v: 0.9 }, { b: o + 2, i: "drum", m: 43, d: 1, v: 0.6 }), a >= 2) {
        e.push({ b: o + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: o + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      a >= 1 && Le[i].concat([Le[i][2], Le[i][1], Le[i][2], Le[i][1]]).forEach((n, r) => e.push({ b: o + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), a === 3 && e.push({ b: o, i: "bells", m: 74 + Le[i][0], d: 2, v: 0.8 });
    }
    a === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([i, o]) => e.push({ b: t * 4 + i, i: "horn", m: o, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: ms, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const Fl = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10]];
function Ll(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const Bi = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function Ro(e, t, s, a) {
  const i = Math.min(e, 2), o = Ll(a * 97 + i * 13 + t * 5), n = Fl[i], r = n.length, l = (O) => ms + 12 * Math.floor(O / r) + n[(O % r + r) % r], h = t === 1, c = s === 3, u = Math.round([72, 80, 88][i] * (h ? 1.15 : 1) * (c ? 0.85 : s === 2 ? 0.93 : 1)), d = [], f = (O) => {
    const T = [];
    let A = O;
    for (let C = 0; C < 2; C++) {
      const $ = Bi[Math.floor(o() * Bi.length)], B = [];
      for (const x of $)
        B.push([A, x]), A = Math.max(-2, Math.min(r + 3, A + [-2, -1, -1, 1, 1, 2, 0][Math.floor(o() * 7)]));
      T.push(B);
    }
    return T;
  }, p = f(Math.floor(o() * 3)), b = f(2 + Math.floor(o() * 3)), g = f(r), y = (O, T) => O.map((A) => A.map(([C, $]) => [C + T, $])), M = [[[2, 2], [1, 2]], [[0, 4]]], v = [...p, ...y(p, 1), ...b, ...M, ...p, ...y(p, -1), ...g, ...M, ...g, ...y(g, -1), ...b, ...M, ...p, ...b, ...p, ...M], S = i === 0 ? "flute" : i === 1 ? "ocarina" : "flute";
  return v.forEach((O, T) => {
    let A = 0;
    const C = T * 4, $ = !h && T % 8 === 7 && o() < 0.3;
    for (const [x, P] of O)
      !$ && !(c && o() < 0.25) && d.push({ b: C + A, i: S, m: l(x) + (i === 0 ? 0 : 12 * (s === 1 ? 1 : 0)), d: P * 0.95, v: 0.85 }), A += P;
    const B = c ? 0.4 : h ? 1 : 0.7;
    if (i === 0) {
      if (d.push({ b: C, i: "drum", m: 38, d: 1, v: 0.9 }), o() < B && d.push({ b: C + 2, i: "drum", m: 43, d: 1, v: 0.6 }), h) for (let x = 0; x < 4; x++) d.push({ b: C + x + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      T % 4 === 3 && o() < B && d.push({ b: C + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: C + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (i === 1)
      T % 8 === 0 && d.push({ b: C, i: "drone", m: 38, d: 32, v: 0.9 }), (T % 2 === 0 || h) && d.push({ b: C, i: "drum", m: 38, d: 1, v: 0.7 }), o() < B && [0, 1.5, 3].forEach((x, P) => d.push({ b: C + x, i: "stones", m: l([0, 2, 4][P] + T % 2) - 12, d: 1, v: 0.6 }));
    else {
      const x = T % 8 < 4 ? 0 : T % 8 < 6 ? -2 : 5, P = [x, x + 7, x + 12, x + 16];
      o() < B + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((L, I) => d.push({ b: C + I * 0.5, i: "lyre", m: 50 + P[L], d: 0.5, v: 0.6 })), d.push({ b: C, i: "drum", m: 38, d: 1, v: 0.8 }), h && d.push({ b: C + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: C + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), T % 8 === 0 && d.push({ b: C, i: "bells", m: 74 + x, d: 2, v: 0.7 }), T % 8 === 6 && o() < 0.7 && d.push({ b: C, i: "horn", m: 45 + (o() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    }
  }), { bpm: u, beats: v.length * 4, notes: d };
}
class Ul {
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
    W.ready(() => {
      const t = W.ctx, s = W.out("music");
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
    W.ctx && (this.clear(), this.enqueue(Ba(), W.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, s) {
    this.getEra = t, this.getSeason = s, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, W.ctx && (this.clear(), this.nextStart = W.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, s, a) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => a, this.pieceN = s, this.seed = 7, W.ctx && (this.clear(), this.nextStart = W.now + 0.5);
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
    const t = W.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, s) {
    const a = 60 / t.bpm;
    for (const i of t.notes) this.queue.push({ t: s + i.b * a, n: i, spb: a, out: "base" });
    this.queue.sort((i, o) => i.t - o.t), this.qi = 0, this.pieceEnd = s + t.beats * a;
  }
  tick() {
    if (!W.running || !this.base) return;
    const t = W.now, s = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(Ba(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const i = Ro(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(i, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < s; ) {
      const i = this.queue[this.qi++];
      i.t >= t - 0.05 && Bo(W.ctx, this.base, Math.max(i.t, t), i.n, i.spb);
    }
    const a = W.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const i = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < s; ) {
        const o = this.layerT, n = Math.round(o / i % 4);
        this.tension > 0.02 && ne(a, this.tens, o, It(33), 0.8), this.battle > 0.02 && (ne(a, this.batt, o, It(n % 2 ? 43 : 38), 0.9), ne(a, this.batt, o + i / 2, It(48), 0.55), Vs(a, this.batt, o + i / 4, 0.8), Vs(a, this.batt, o + i * 0.75, 0.8)), this.layerT += i;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, s = 0) {
    const a = W.ctx, i = W.out("alert");
    if (!a || !i || !W.voice(3)) return;
    const o = a.currentTime + 0.05;
    if (W.duck(0.7, 3.5), t === "age") {
      for (let r = 0; r < 6; r++) ne(a, i, o + r * 0.12, It(38 + r % 2 * 5), 0.5 + r * 0.08);
      [0, 4, 7, 12].map((r) => ms + r + (s >= 2 ? 0 : -12)).forEach((r, l) => s >= 2 ? Pa(a, i, o + 0.75 + l * 0.22, It(r - 12), 0.3, 1.4) : ps(a, i, o + 0.75 + l * 0.2, It(r + 12), 0.3, 1.2)), s >= 2 ? Ia(a, i, o + 1.6, It(74), 1.2) : ne(a, i, o + 1.6, It(38), 1);
    } else if (t === "victory") {
      [0, 4, 7, 12, 7, 12].forEach((n, r) => Pa(a, i, o + r * 0.25, It(50 + n), r === 5 ? 1.2 : 0.22, 1.3));
      for (let n = 0; n < 8; n++) ne(a, i, o + n * 0.125, It(38 + n % 2 * 5), 0.7);
      Ia(a, i, o + 1.3, It(74), 1.3);
    } else
      [12, 10, 7, 5, 3, 0].forEach((n, r) => ps(a, i, o + r * 0.35, It(ms + n), r === 5 ? 1.4 : 0.32, 0.9)), ne(a, i, o + 2.1, It(38), 0.6);
  }
}
const Mt = new Ul(), ca = { theme: Ba, eraPiece: Ro, play: Bo };
class qo {
  constructor() {
    m(this, "loops", {});
    m(this, "wf", null);
    m(this, "t", null);
    m(this, "next", {});
    m(this, "seed", 1);
  }
  start() {
    const t = W.ctx, s = W.out("amb");
    if (!t || !s || this.loops.wind) return;
    const a = (i, o) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(s), this.loops[i] = { g: n, stop: o(n) };
    };
    a("wind", (i) => {
      const o = Os(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const h = t.createGain(), c = t.createOscillator(), u = t.createGain();
      return h.gain.value = 0.75, c.frequency.value = 0.11, u.gain.value = 0.25, c.connect(u).connect(h.gain), o.connect(n).connect(h).connect(i), r.start(), c.start(), () => {
        o.stop(), r.stop(), c.stop();
      };
    }), a("water", (i) => {
      const o = Os(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), h = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, h.gain.value = 0.2, l.connect(h).connect(r.gain), o.connect(n).connect(r).connect(i), l.start(), () => {
        o.stop(), l.stop();
      };
    }), a("fire", (i) => {
      const o = Os(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, o.connect(n).connect(i), () => o.stop();
    }), a("market", (i) => {
      const o = Os(t), n = t.createBiquadFilter();
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
      const h = t.createGain(), c = t.createOscillator(), u = t.createGain();
      return h.gain.value = 0.5, c.frequency.value = 0.3, u.gain.value = 0.5, c.connect(u).connect(h.gain), o.connect(n).connect(h).connect(i), o.start(), r.start(), c.start(), () => {
        o.stop(), r.stop(), c.stop();
      };
    });
  }
  stop() {
    const t = W.now;
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
    const s = W.now, a = this.loops;
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
    const t = this.t, s = W.ctx, a = W.out("amb");
    if (!t || !s || !a || !W.running) return;
    const i = s.currentTime, o = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (c, u) => (this.next[c] ?? 0) > i ? !1 : (this.next[c] = i + u(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), h = [0.9, 0.6, 0.25, 0][o] * (0.4 + t.trees * 0.6);
    h > 0.05 && r("bird", () => 1.5 + n() * 4 / h) && Ea(s, a, i + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), o === 3 && r("crow", () => 9 + n() * 14) && Ht["animal.crow"](s, a, i + 0.05, 0.6), o === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && Ht["work.rustle"](s, a, i + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && Ht["stone.hit"](s, a, i + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && Ht["work.pickMetal"](s, a, i + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && Ht["animal.sheep"](s, a, i + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && Ht["animal.horse"](s, a, i + 0.05, 0.8 * t.stables);
  }
}
const Ge = (e, t, s) => Math.max(t, Math.min(s, e)), Ri = /* @__PURE__ */ new Map(), Ra = {};
function Ks(e, t = 1, s = 0, a = "sfx", i = 0.07) {
  const o = W.ctx, n = W.out(a), r = Ht[e];
  if (!o || !n || !r || !W.running || t < 0.01) return;
  const l = o.currentTime;
  if ((Ri.get(e) ?? -9) > l - i || !W.voice(0.35)) return;
  Ri.set(e, l), Ra[e] = (Ra[e] ?? 0) + 1;
  let h = n;
  if (s && o.createStereoPanner) {
    const c = o.createStereoPanner();
    c.pan.value = Ge(s, -1, 1), c.connect(n), h = c;
  }
  r(o, h, l + 0.01, Ge(t, 0, 1.2));
}
const pe = (e) => W.whenRunning(() => Ks(e, 1, 0, "ui", 0.04));
class Gl {
  constructor(t, s, a) {
    m(this, "amb", new qo());
    m(this, "t", 0);
    m(this, "slow", 0);
    m(this, "raidUntil", 0);
    m(this, "animalT", 0);
    this.w = t, this.me = s, this.cam = a, W.setScene("game"), Mt.game(() => t.players[s].era, () => t.season), jt.emit = (i, o, n, r) => this.at(i, o, n, r), W.ready(() => this.amb.start());
  }
  dispose() {
    jt.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, s, a, i = 1) {
    if (!W.running) return;
    const o = this.w, n = o.size, r = Math.floor(s), l = Math.floor(a);
    if (r < 0 || l < 0 || r >= n || l >= n || !o.vis[this.me][l * n + r]) return;
    const h = this.cam, c = s - h.x, u = a - h.z, d = Math.hypot(c, u), f = Ge(1 - d / 22, 0, 1), p = Ge(1.25 - h.dist / 70, 0.3, 1);
    if (f < 0.05) return;
    const b = (c * Math.cos(h.yaw) - u * Math.sin(h.yaw)) / 12;
    Ks(t, i * f * f * p, b);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco */
  aviso(t) {
    Ks(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && W.duck();
  }
  onEvents(t) {
    const s = this.w, a = s.size;
    for (const i of t) switch (i.t) {
      case "proj":
        this.at(i.h !== void 0 ? "tower" : i.kind === "arrow" ? "bow" : i.kind === "stone" ? "sling" : "throw", i.x0 / 256, i.z0 / 256);
        break;
      case "death": {
        const o = i.x / 256, n = i.z / 256;
        this.at(i.kind >= et ? "crash" : i.owner === it ? "fall.animal" : "puff", o, n);
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
        i.player === this.me && Mt.stinger("age", i.era);
        break;
      case "end":
        Mt.stinger(i.result === "victory" ? "victory" : "defeat");
        break;
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
    if (W.setPaused(s), this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !W.running)) return;
    const a = this.w, i = this.me, o = a.size, n = this.cam, r = n.x, l = n.z, h = a.vis[i];
    let c = 0, u = 0, d = 0;
    for (let T = -8; T <= 8; T += 2) for (let A = -8; A <= 8; A += 2) {
      const C = Math.floor(r + A), $ = Math.floor(l + T);
      if (C < 0 || $ < 0 || C >= o || $ >= o) continue;
      const B = $ * o + C;
      d++;
      const x = a.map.terrain[B];
      (x === ge || x === Ve) && c++, a.map.tree[B] && u++;
    }
    let f = 0, p = 0, b = 0, g = 0, y = 0, M = 0, v = 0;
    const S = [];
    for (let T = 0; T < a.top; T++) {
      if (!a.alive[T]) continue;
      const A = a.x[T] / 256, C = a.z[T] / 256, $ = Math.hypot(A - r, C - l);
      if ($ > 18 || !h[Math.floor(C) * o + Math.floor(A)] && a.owner[T] !== i) continue;
      const B = Ge(1 - $ / 16, 0, 1);
      if (a.kind[T] >= et) {
        if (!a.done[T]) continue;
        const x = dt[a.kind[T] - et].key;
        x === "center" || x === "camp" ? f = Math.max(f, B) : x === "forge" ? p = Math.max(p, B) : x === "market" ? b = Math.max(b, B) : x === "pen" ? g = Math.max(g, B) : x === "stable" && (y = Math.max(y, B));
      } else a.kind[T] < _.length && (a.owner[T] === it ? $ < 14 && S.push(T) : a.task[T] === mt && (M++, a.owner[T] === i && v++), _[a.kind[T]].key === "horseman" && (y = Math.max(y, B * 0.5)));
    }
    if (this.amb.set({ season: a.season, zoom: n.dist, water: d ? Math.min(1, c / d * 3) : 0, fire: f, market: b, fair: a.fair, forge: p, pens: g, stables: y, trees: d ? Math.min(1, u / d * 2) : 0 }), this.amb.tick(), S.length && (this.animalT -= 0.25) <= 0) {
      const T = S[Math.floor(this.t * 7.7 % S.length)], A = _[a.kind[T]].key, C = A === "wolf" ? a.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${A}`;
      Ht[C] && this.at(C, a.x[T] / 256, a.z[T] / 256, A === "wolf" && a.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let O = a.tick < this.raidUntil;
    if (!O && Math.floor(this.t * 4) % 4 === 0) {
      const T = a.players[i];
      for (let A = 0; A < a.top && !O; A++) if (a.isUnit(A) && a.owner[A] !== i && a.owner[A] !== it && (a.owner[A] === te || a.hostile(i, a.owner[A]))) {
        const C = a.x[A] / 256 - T.start.x, $ = a.z[A] / 256 - T.start.z;
        C * C + $ * $ < 196 && (O = !0);
      }
    }
    Mt.setTension(O ? 0.6 : 0), Mt.setBattle(v > 0 ? Ge((M - 1) / 8, 0.3, 1) : 0);
  }
}
const No = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], Hl = {
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
}, _l = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["victory", "Vitória"], ["defeat", "Derrota"]], Wl = ["Pedra", "Neolítico", "Metais"], Dl = ["calma", "animada", "calma 2"], jl = ["primavera", "verão", "outono", "inverno"];
function Vl() {
  W.install(), W.setScene("menu");
  const e = new qo(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${No.map(([l, h]) => `<h2>${l}</h2>${h.map((c) => `<button data-som="${c}" title="${c}">${Hl[c] ?? c}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${Wl.map((l, h) => Dl.map((c, u) => `<button data-musica-teste="era:${h}:${u}">${l} · ${c}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${_l.map(([l, h]) => `<button data-vinheta="${l}">${h}</button>`).join("")}
    <h2>Ambiente</h2>${jl.map((l, h) => `<button data-ambiente-teste="${h}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const s = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let a = { ...s }, i = 0;
  const o = (l) => {
    W.setScene("game"), e.start(), a = l, e.set(l), i || (i = window.setInterval(() => {
      e.set(a), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const h = l.target.closest("button");
    h && (W.unlock(), t.querySelectorAll("[aria-pressed]").forEach((c) => c.removeAttribute("aria-pressed")), h.setAttribute("aria-pressed", "true"), W.whenRunning(() => r(h)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = W.ctx ? W.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const h = l.dataset;
    if (h.som && Ks(h.som, 1, 0, ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"].includes(h.som) ? "alert" : "sfx", 0), h.musicaTeste) {
      const c = h.musicaTeste;
      if (W.setScene(c === "tema" ? "menu" : "game"), W.setOpts({ music: Math.max(2, W.opts.music) }), c === "tema")
        Mt.stop(), Mt.menu();
      else if (c === "parar") Mt.stop();
      else if (c === "tensao") Mt.setTension(0.6);
      else if (c === "batalha") Mt.setBattle(0.9);
      else if (c === "inverno") Mt.preview(2, 0, 3);
      else {
        const [, u, d] = c.split(":").map(Number);
        Mt.setTension(0), Mt.setBattle(0), Mt.preview(u, d, 0);
      }
    }
    if (h.vinheta) {
      const [c, u] = h.vinheta.split(":");
      Mt.stinger(c, Number(u) || 0);
    }
    if (h.ambienteTeste) {
      const c = h.ambienteTeste;
      c === "parar" ? (e.set({ ...s, season: 1, trees: 0 }), a = { ...s, season: -1, trees: 0 }) : o(c === "rio" ? { ...s, season: 1, water: 1, zoom: 22 } : c === "aldeia" ? { ...s, fire: 1, forge: 1, pens: 1, zoom: 22 } : c === "feira" ? { ...s, market: 1, fair: !0, zoom: 22 } : { ...s, season: Number(c) });
    }
  }
}
async function Kl(e) {
  const s = new OfflineAudioContext(1, 176400, 44100);
  let a = 0;
  if (Ht[e]) a = Ht[e](s, s.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, h, c] = e.split(":"), u = h === "tema" ? ca.theme() : ca.eraPiece(Number(c), 1, 0, 3), d = 60 / u.bpm;
    for (const f of u.notes) f.b * d < 3.6 && ca.play(s, s.destination, 0.01 + f.b * d, f, d);
    a = 4;
  }
  const i = await s.startRendering(), o = i.getChannelData(0);
  let n = 0, r = 0, l = 0;
  for (let h = 0; h < o.length; h++) {
    const c = Math.abs(o[h]);
    c > n && (n = c), h < Math.max(1, a) * 44100 && (r += o[h] * o[h], l++);
  }
  return { id: e, peak: n, rms: Math.sqrt(r / Math.max(1, l)), dur: a };
}
const Xl = No.flatMap((e) => e[1]), Ye = new URLSearchParams(location.search), Xs = (e, t) => {
  const s = Number(Ye.get(e));
  return Ye.has(e) && Number.isFinite(s) && s >= 0 ? s : t;
}, Fo = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, Ka = document.getElementById("scene"), gs = ko.makeRenderer(Ka), ot = 0, ha = 1 / Di;
let re = Fo ? 1 : 0, Ys = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (re = Math.min(2, Math.max(0, Number(e) || 0)), Ys = !1);
} catch {
}
const Lo = (e) => {
  re = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class Yl {
  // muralha: começo escolhido e blocos da linha
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
    m(this, "wallA", null);
    m(this, "wallTiles", []);
    this.world = t, this.owner = s;
    const a = t;
    this.marco = Math.floor(a.tick / 600), this.scene = new ko(gs, a, ot), this.scene.setQuality(re), Ye.get("fog") === "0" && this.scene.setFog(!1), this.hud = new $a(a, ot, {
      idle: () => {
        const i = this.own((n) => a.kind[n] === Q.villager && a.task[n] === 0 && a.state[n] === 0);
        if (!i.length) return;
        const o = i[this.idleCursor++ % i.length];
        this.select([o]), this.focus([o]);
      },
      army: () => {
        const i = this.own((o) => a.kind[o] !== Q.villager);
        this.select(i), this.focus(i);
      },
      home: () => {
        const i = a.players[ot].start;
        this.scene.camera.tx = i.x, this.scene.camera.tz = i.z;
      },
      menu: () => this.pause(),
      keepKind: (i) => {
        for (const o of [...this.sel]) a.kind[o] !== i && this.sel.delete(o);
      },
      clear: () => {
        this.sel.clear(), this.setMode("normal");
      },
      stop: () => {
        const i = this.own((o) => this.sel.has(o));
        i.length && a.issue({ type: "stop", player: ot, ids: i });
      },
      food: (i) => {
        const o = this.own((n) => this.sel.has(n) && a.kind[n] === Q.villager);
        o.length && a.issue({ type: "food", player: ot, ids: o, on: i });
      },
      startPlace: (i) => this.startPlace(i),
      train: (i, o) => a.issue({ type: "train", player: ot, building: i, key: o }),
      cancelQueue: (i) => a.issue({ type: "cancel", player: ot, building: i }),
      ageUp: (i) => a.issue({ type: "ageup", player: ot, building: i }),
      research: (i, o) => a.issue({ type: "research", player: ot, building: i, key: o }),
      trade: (i, o, n) => a.issue({ type: "trade", player: ot, building: i, give: o, get: n }),
      rally: (i) => {
        this.rallyB = i, this.setMode(this.mode === "rally" ? "normal" : "rally");
      },
      placeConfirm: () => this.confirmPlace(!1),
      cancelMode: () => this.setMode("normal"),
      jump: (i, o) => {
        this.scene.camera.tx = i, this.scene.camera.tz = o;
      }
    }, Fo, this.sel), this.minimap = new ll(this.hud.minimap, a, ot, this.scene.camera), this.snd = new Gl(a, ot, this.scene.camera), this.input = new cl(Ka, a, ot, this.scene.camera, this.hud.box, {
      onCommand: (i) => {
        if (this.mode !== "normal") return;
        const { cmds: o, ping: n } = dl(a, ot, [...this.sel], i);
        for (const r of o) a.issue(r);
        o.length && Bs(o[0].type === "attack" ? a.owner[o[0].target] === it ? "cacar" : "atacar" : o[0].type === "gather" ? "coletar" : o[0].type === "work" ? "trabalhar" : "mover"), o.length && (this.scene.ping(i.x, i.z, n), pe(n === "attack" ? "order.attack" : n === "work" ? "order.work" : "order.move"));
      },
      onRally: (i, o) => {
        const n = this.mode === "rally" && a.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        n >= 0 && (a.issue({ type: "rally", player: ot, building: n, x: Math.round(i * 256), z: Math.round(o * 256) }), this.scene.ping(i, o, "move"), Bs("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (i, o) => this.movePlace(i, o),
      onPlaceConfirm: (i) => this.confirmPlace(i),
      onCancel: () => this.setMode("normal"),
      onSelect: () => {
        this.mode === "place" && !ul(a, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize();
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, s = [...this.sel][0];
    if (s === void 0 || !t.alive[s] || t.owner[s] !== ot) return;
    if (t.isBuilding(s)) {
      const i = t.bdef(s).key;
      pe(i === "pen" ? "animal.sheep" : i === "stable" ? "animal.horse" : i === "forge" ? "work.pickMetal" : i === "market" ? "soft" : "sel.building");
      return;
    }
    const a = t.kind[s];
    pe(a === Q.villager ? "sel.villager" : a === Q.dog ? "animal.dog" : a === Q.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const s = this.world, a = [];
    for (let i = 0; i < s.top; i++) s.isUnit(i) && s.owner[i] === ot && t(i) && a.push(i);
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
    this.mode = t, t !== "place" && (this.scene.setGhost(null), this.scene.setWallGhost(null), this.wallA = null), this.hud.setMode(t, this.place.ok, t === "place" && this.placeKey === "wall" ? this.wallA ? 2 : 1 : 0, t === "place" ? this.placeKey : ""), this.hud.refresh();
  }
  startPlace(t) {
    this.placeKey = t, this.mode = "place", this.wallA = null, this.hud.resetCard(), this.movePlace(this.scene.camera.x, this.scene.camera.z);
  }
  /** muralha: blocos de A até o ponteiro, sempre encostados de lado (sem pular na diagonal), no máximo 40 */
  wallLine(t, s, a, i) {
    const o = this.world.size, n = [s * o + t], r = Math.sign(a - t), l = Math.sign(i - s), h = a - t, c = i - s, u = Math.hypot(h, c) || 1, d = (b, g) => Math.abs((b - t) * c - (g - s) * h) / u;
    let f = t, p = s;
    for (; (f !== a || p !== i) && n.length < 40; )
      f === a ? p += l : p === i || d(f + r, p) <= d(f, p + l) ? f += r : p += l, n.push(p * o + f);
    return n;
  }
  moveWall(t, s) {
    const a = this.world, i = a.size, o = dt[wt.wall].cost.stone ?? 0, n = Math.floor(t), r = Math.floor(s), l = this.wallA ? this.wallLine(this.wallA.tx, this.wallA.tz, n, r) : [r * i + n];
    let h = Math.floor(a.players[ot].res.stone / 100 / o);
    const c = l.map((u) => {
      const d = a.canPlace(ot, "wall", u % i, Math.floor(u / i)) && h > 0;
      return d && h--, d;
    });
    this.wallTiles = l.filter((u, d) => c[d]), this.place = { tx: n, tz: r, ok: this.wallTiles.length > 0 }, this.scene.setWallGhost(l, c), this.hud.setMode("place", this.place.ok, this.wallA ? 2 : 1, this.placeKey);
  }
  movePlace(t, s) {
    if (this.mode !== "place") return;
    if (this.placeKey === "wall") {
      this.moveWall(t, s);
      return;
    }
    const a = this.world, i = dt[wt[this.placeKey]], o = Math.round(t - i.size / 2), n = Math.round(s - i.size / 2), r = a.canPlace(ot, this.placeKey, o, n) && a.canAfford(ot, i.cost);
    this.place = { tx: o, tz: n, ok: r }, this.scene.setGhost(this.placeKey, o, n, r), this.hud.setMode("place", r, 0, this.placeKey);
  }
  confirmPlace(t) {
    const s = this.world, a = this.own((o) => this.sel.has(o) && s.kind[o] === Q.villager);
    if (this.mode !== "place" || !a.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(z("place.bad"), void 0, void 0, "place"), pe("place.bad");
      return;
    }
    if (this.placeKey === "wall") {
      if (!this.wallA) {
        this.wallA = { tx: this.place.tx, tz: this.place.tz }, this.moveWall(this.place.tx + 0.5, this.place.tz + 0.5), pe("order.work");
        return;
      }
      s.issue({ type: "wall", player: ot, ids: a, tiles: this.wallTiles.slice() }), pe("place"), Bs("muralha");
      const o = this.wallTiles[this.wallTiles.length - 1];
      this.scene.ping(o % s.size + 0.5, Math.floor(o / s.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    s.issue({ type: "build", player: ot, ids: a, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), pe("place"), Bs("construir");
    const i = dt[wt[this.placeKey]];
    this.scene.ping(this.place.tx + i.size / 2, this.place.tz + i.size / 2, "work"), t && s.canAfford(ot, { wood: (i.cost.wood ?? 0) * 2, stone: (i.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    this.ended || (this.paused = !0, this.setMode("normal"), Lt.showPause(Math.floor(this.world.tick / 600), re, this.owner, Js()), be());
  }
  resume() {
    this.paused = !1, Lt.hide();
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = he();
    !this.owner && t && (Da("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended) return "fail";
    await be(), this.adopt();
    const { d: t, ok: s } = Ei(this.world, this.owner), a = await Pi(t, this.owner);
    return s || me("problema", { tipo: "aparelho" }), a === "fail" && me("problema", { tipo: "nuvem" }), a === "ok" ? s ? "both" : "cloudOnly" : s ? a === "fail" ? "localOnly" : a === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended) return;
    this.adopt();
    const { d: s, ok: a } = Ei(this.world, this.owner);
    !a && !t && me("problema", { tipo: "aparelho" }), Pi(s, this.owner, t).then((i) => {
      i === "fail" && !t && me("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  frame(t) {
    const s = this.world;
    if (!this.paused) {
      this.acc += t;
      let o = 0;
      for (; this.acc >= ha && o < 4; )
        s.step(), this.acc -= ha, o++;
      o === 4 && (this.acc = 0);
    }
    const a = s.drain();
    if (a.length) {
      this.scene.consume(a), this.hud.onEvents(a), this.snd.onEvents(a);
      for (const o of a)
        (o.t === "tree" || o.t === "res" && s.resKind[o.k] === 0) && this.minimap.clearTile(o.k), o.t === "age" && o.player === ot && Zt("era_nova", { era: o.era, min: sa(s.tick) }), o.t === "msg" && o.player === ot && this.medir(o.key), o.t === "end" && !this.ended && this.end(o.result);
    }
    this.input.update(t);
    for (const o of [...this.sel]) s.alive[o] || this.sel.delete(o);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / ha, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const i = Math.floor(s.tick / 600);
    if (!this.ended && i > this.marco) {
      for (const o of ur) o > this.marco && o <= i && Zt("marco_partida", { min: o });
      this.marco = i;
    }
    if (!qi && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (qi = !0, Zt("desempenho", { fps: hr(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][re] }))), Ys && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      Ys = !1;
      const o = this.autoN / this.autoT;
      o < 40 && re < 2 && (Lo(re + 1), this.scene.setQuality(re), this.hud.toast(z("q.auto", { q: z(`q.${Ds[re].key}`), fps: Math.round(o) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [s, a] = t.split("."), i = this.world, o = i.players[ot].era, n = Number(a) === te ? "barbaros" : "rival";
    s === "centerDanger" ? Zt("centro_em_perigo", { por: n, era: o }) : s === "centerLost" ? this.derrotaPor = n : s === "hunger" && Zt("fome", { era: o, ano: Math.min(3, i.year) });
  }
  end(t) {
    const s = this.world;
    t === "victory" ? Zt("fim_vitoria", { era: s.players[ot].era, min: sa(s.tick) }) : Zt("fim_derrota", { por: this.derrotaPor || "rival", min: sa(s.tick) }), this.ended = !0, Wa(this.owner), Sl(this.owner), this.setMode("normal"), Lt.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[ot].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let kt = null, qi = !1;
const Bs = (e) => me("ordem_primeira", { tipo: e }), da = (e, t) => Zt("partida_continuada", { era: e.players[ot].era, de: t });
Ka.addEventListener("webglcontextlost", () => me("problema", { tipo: "webgl" }));
const Uo = {
  cont: async () => {
    const e = ns.save;
    if (!e) return;
    if (e.from === "cloud") {
      const s = await Po();
      let a = null;
      try {
        a = s ? So(s) : null;
      } catch {
        a = null;
      }
      if (a && s) {
        gl(s, e.owner), Rs(a, e.owner), da(a, "nuvem");
        return;
      }
      me("problema", { tipo: "carregar" });
    }
    const t = bl(e.owner);
    if (!t) {
      me("problema", { tipo: "carregar" }), Wa(e.owner), ta();
      return;
    }
    if (e.adopt) {
      const s = he();
      if (s) {
        Da("", s), Rs(t, s), da(t, "aparelho");
        return;
      }
    }
    Rs(t, e.owner), da(t, "aparelho");
  },
  start: (e, t) => {
    Rs(new fo(Xs("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, testUnits: Math.min(600, Xs("units", 0)) }), he()), Zt("partida_nova", { rivais: e, dif: dr[t] ?? "normal" });
  },
  resume: () => kt?.resume(),
  save: () => kt?.save() ?? Promise.resolve("fail"),
  quit: () => {
    kt?.autoSave(), Ni();
  },
  quality: (e) => {
    Lo(e), Ys = !1, kt?.scene.setQuality(e);
  },
  help: () => {
    kt?.resume(), kt?.hud.openHelp();
  },
  watch: () => Lt.hide(),
  toMenu: () => Ni(),
  login: () => {
    Ii();
  },
  profile: () => {
    Al();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await Ii(), kt && Pe()) {
      const e = await kt.save();
      Lt.updatePause(kt.owner, Js(), e);
    }
  }
}, Lt = new hl(Uo);
function Rs(e, t) {
  kt?.dispose(), kt = new Yl(e, t), Lt.hide();
  const s = kt;
  window.__origines = {
    world: e,
    scene: s.scene,
    input: s.input,
    game: s,
    screen: (a, i, o = 0.5) => {
      const n = s.scene.camera.cam.position.clone().set(a, J(e.map, a, i) + o, i).project(s.scene.camera.cam);
      return [(n.x + 1) / 2 * innerWidth, (1 - n.y) / 2 * innerHeight, n.z < 1 ? 1 : 0];
    }
  };
}
function Ni() {
  kt?.dispose(), kt = null, W.setScene("menu"), Mt.menu(), gs.setClearColor(1911332, 1), gs.clear(), ta();
}
let ns = { acc: "loading", save: null, other: null }, ua = 0;
async function ta() {
  const e = ++ua;
  if (ns = Fi(null, Pe()), Lt.showStart(ns), !Pe()) return;
  const t = await Tl();
  e !== ua || Lt.kind !== "start" || (await Zl(t), !(e !== ua || Lt.kind !== "start") && (ns = Fi(t, !1), Lt.updateStart(ns)));
}
async function Zl(e) {
  const t = he();
  if (!t || vl()) return;
  const s = yl("");
  if (s && e && !ls(t)) {
    const a = await Po();
    a && a.seed === s.seed && s.tick >= a.tick && Da("", t);
  }
  kl();
}
function Fi(e, t) {
  const s = Js();
  if (s === "loading") return { acc: s, save: null, other: null };
  const a = he();
  if (a) {
    const o = e ? Cl(e) : null, n = ls(a);
    if (o && (!n || (o.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: s, save: { meta: o, from: "cloud", owner: a, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: s, save: { meta: n, from: "device", owner: a, adopt: !1 }, other: null, pending: t };
    const r = ls("");
    return { acc: s, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const i = ls("");
  return { acc: s, save: i ? { meta: i, from: "device", owner: "", adopt: !1 } : null, other: xl()[0]?.dono ?? null };
}
Ml(() => {
  Lt.kind === "start" ? ta() : Lt.kind === "pause" && kt && Lt.updatePause(kt.owner, Js());
});
addEventListener("resize", () => {
  gs.setSize(innerWidth, innerHeight, !1), kt?.resize();
});
gs.setSize(innerWidth, innerHeight, !1);
let qa = performance.now();
const Go = () => kt?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  qa = performance.now(), document.hidden ? Go() : be();
});
addEventListener("pagehide", Go);
let qs = 0, fa = 0, Ho = !1;
Ye.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  Ho = e;
}, step: (e) => kt?.frame(e) });
function _o(e) {
  const t = Math.min(0.1, (e - qa) / 1e3);
  qa = e, kt && !Ho && kt.frame(t), fa++, qs += t, qs > 1 && (window.__fps = fa / qs, fa = 0, qs = 0), requestAnimationFrame(_o);
}
requestAnimationFrame(_o);
const Wo = Ye.get("sons") === "1" || location.hash === "#sons";
W.install();
Wo || Mt.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && pe(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: Xl, measure: Kl, audio: W, played: Ra, music: Mt };
Wo ? Vl() : Ye.get("autostart") === "1" ? Uo.start(Math.min(3, Math.max(1, Xs("players", 4) - 1)), Math.min(2, Xs("difficulty", 1))) : (ta(), zl());
const pa = document.getElementById("loading");
pa && (pa.style.opacity = "0", setTimeout(() => pa.remove(), 450));
