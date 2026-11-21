var hr = Object.defineProperty;
var dr = (e, t, s) => t in e ? hr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var m = (e, t, s) => dr(e, typeof t != "symbol" ? t + "" : t, s);
import { C as Kt, M as Aa, a as ur, R as fr, P as La, V as Tt, B as Me, b as Ne, c as pr, S as jo, D as mr, I as Do, d as fi, e as Es, f as oe, g as Ze, F as ds, E as Wo, Q as Bi, h as he, G as Bs, i as Ut, T as gr, j as pi, k as ue, l as Vo, m as cs, n as Ko, o as qi, p as Xo, q as br, r as yr, s as vr, t as kr, U as xr, L as Mr, u as zr, H as Ar, v as Tr, w as wr, W as Sr, A as $r, x as Cr } from "./three-DvEW5KnM.js";
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
const V = 256;
function ns(e) {
  if (e <= 0) return 0;
  let t = Math.floor(Math.sqrt(e));
  for (; t * t > e; ) t--;
  for (; (t + 1) * (t + 1) <= e; ) t++;
  return t;
}
const _e = (e, t) => Math.trunc(e / t), Yo = 10, Zo = 2, Xs = [30, 60, 90, 115, 135, 150], rs = ["food", "wood", "stone", "metal", "coins"], G = [
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
], ct = Object.fromEntries(G.map((e, t) => [e.key, t])), gt = 60, bt = 100, Et = [
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
], Vt = Object.fromEntries(Et.map((e, t) => [e.key, t])), Ri = (e, t) => e.trains?.[Math.min(t, e.trains.length - 1)] ?? [], ls = [
  { cost: { food: 400, wood: 150 }, time: 90 },
  { cost: { food: 900, wood: 400, stone: 200 }, time: 120 },
  { cost: { food: 1400, wood: 700, stone: 500, metal: 400 }, time: 150 }
  // Era IV: chega no M3
], Ke = [
  { key: "bronze", cost: { food: 120, metal: 60 }, time: 40, at: "forge" },
  // +1 ataque dos soldados
  { key: "iron", cost: { food: 180, metal: 120 }, time: 60, at: "forge", needs: "bronze" },
  // +1 ataque e +1 armadura dos soldados
  { key: "wheel", cost: { wood: 120, metal: 40 }, time: 40, at: "market" }
  // coletores levam 15
], ie = 200, Sa = Object.fromEntries(Ke.map((e, t) => [e.key, t])), Se = { give: 100, get: 60, fair: 85 }, Er = 300, Xe = ["food", "wood", "stone", "metal"], ys = { berry: 0.4, carcass: 0.5, farm: 0.33, wood: 0.37, stone: 0.3, metal: 0.28 }, Ir = 10, Or = ["#c0392b", "#2e6fd8", "#e0a526", "#7c3fb0"], Ee = 6, kt = -1, xe = 60 * Yo;
function De(e, t, s) {
  let a = Math.imul(e | 0, 374761393) + Math.imul(t | 0, 668265263) + Math.imul(s | 0, 1442695041) | 0;
  return a = Math.imul(a ^ a >>> 13, 1274126177), ((a ^ a >>> 16) >>> 0) / 4294967296;
}
const Xi = (e) => e * e * (3 - 2 * e);
function Pr(e, t, s) {
  const a = Math.floor(e), i = Math.floor(t), o = e - a, n = t - i, r = Xi(o), l = Xi(n), h = De(a, i, s), c = De(a + 1, i, s), u = De(a, i + 1, s), d = De(a + 1, i + 1, s);
  return h + (c - h) * r + (u - h) * l + (h - c - u + d) * r * l;
}
function os(e, t, s, a = 4) {
  let i = 0, o = 0.5, n = 1, r = 0;
  for (let l = 0; l < a; l++)
    i += o * Pr(e * n, t * n, s + l * 31), r += o, o *= 0.5, n *= 2.03;
  return i / r;
}
const ws = (e, t, s) => e < t ? t : e > s ? s : e, ye = (e, t, s) => {
  const a = ws((s - e) / (t - e), 0, 1);
  return a * a * (3 - 2 * a);
}, ts = (e, t, s) => e + (t - e) * s;
class Jo {
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
const He = 0, $a = 1, hs = 2, We = 3, je = 4, $e = 5, Ys = (e) => e === We || e === je || e === $e, Ni = 2, Qo = 1, mi = 2, tn = 3, Jt = 1, Oe = 2, be = 3, Te = 1.4142135623730951, Ca = 1.7320508075688772, Br = 0.585, Ua = 8.5, qr = 1 / (0.66 * 0.66) - 1, Yi = 2, ra = (e, t) => Math.sqrt(e * e + t * t), en = { 2: [0, 1], 3: [0.5, Ca / 2], 4: [Te / 2, Te / 2] }, Rr = {
  2: [[0, 1], [0, -1]],
  3: [[0.5, Ca / 2], [-1, 0], [0.5, -Ca / 2]],
  4: [[Te / 2, Te / 2], [-Te / 2, Te / 2], [-Te / 2, -Te / 2], [Te / 2, -Te / 2]]
};
function Za(e, t, s) {
  const [a, i] = en[s];
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
function sn(e, t, s = Ni) {
  const a = ws(t, 2, 4), i = a === 2 ? 192 : 256, o = i / 2, n = s >= 2, r = 2, l = i / r + 1, h = new Float32Array(l * l), c = i * (a === 2 ? 0.32 : 0.36), u = 13, d = i * 0.075, [f, p] = en[a], y = [f * c, p * c], g = [i * 0.21, i * 0.4], x = (C, I) => {
    const [R, N] = Za(C, I, a), L = Math.sqrt(R * R + N * N);
    let U = (os(R * 0.02 + 7.3, N * 0.02 - 3.1, e, 4) - 0.28) * 10 + 1.4 + (os(R * 0.08, N * 0.08, e + 9, 2) - 0.5) * 1.2;
    const tt = Math.max(Math.abs(C), Math.abs(I)) / o;
    U += ye(0.8, 0.98, tt) * 20 * (0.6 + 0.4 * os(R * 0.04, N * 0.04, e + 3, 2));
    const rt = N, ft = 2.5 + (os(R * 0.05, 0.5, e + 21, 2) - 0.5) * 3 * 0.45;
    if (L > d * 0.8) {
      let Xt = 0;
      for (const te of g) Xt = Math.max(Xt, 1 - ye(3, 6, Math.abs(L - te)));
      const se = ts(-2.2, -0.35, Xt);
      if (n) {
        let te = 0;
        for (const Qe of g) te = Math.max(te, 1 - ye(5, 11, Math.abs(L - Qe)));
        U = ts(U, Math.min(U, 1), ye(ft + 9 + 12 * te, ft + 3, rt) * (0.75 + 0.25 * te)), U = ts(se, U, ye(ft, ft + 6.5 + 4 * te, rt));
      } else
        U = ts(U, Math.min(U, 1), ye(ft + 9, ft + 3, rt) * 0.75), U = ts(se, U, ye(ft, ft + 6.5, rt));
    }
    U = ts(-2.6, U, ye(d, d + 10, L));
    const Ct = ra(R - y[0], N - y[1]);
    return U = ts(2.2, U, ye(u, u + 8, Ct)), U;
  };
  for (let C = 0; C < l; C++) for (let I = 0; I < l; I++) h[C * l + I] = x(I * r - o, C * r - o);
  const M = (C, I) => {
    const R = ws(C / r, 0, l - 1.001), N = ws(I / r, 0, l - 1.001), L = Math.floor(R), U = Math.floor(N), tt = R - L, rt = N - U, et = h[U * l + L], ft = h[U * l + L + 1], Ct = h[(U + 1) * l + L], Xt = h[(U + 1) * l + L + 1];
    return et + (ft - et) * tt + (Ct - et) * rt + (et - ft - Ct + Xt) * tt * rt;
  }, v = (C, I, R) => R >= 0.5 && C * C + I * I > qr * r * r, w = (C, I) => {
    const R = (C + 0.5) / r, N = (I + 0.5) / r, L = Math.floor(R), U = Math.floor(N), tt = R - L + N - U, rt = h[U * l + L], et = h[U * l + L + 1], ft = h[(U + 1) * l + L], Ct = h[(U + 1) * l + L + 1];
    return tt <= 1 && v(et - rt, ft - rt, (rt + et + ft) / 3) || tt >= 1 && v(Ct - ft, Ct - et, (et + ft + Ct) / 3);
  }, B = (C, I) => {
    const R = C >> 1, N = I >> 1, L = C & 1, U = I & 1, tt = h[N * l + R], rt = h[N * l + R + 1], et = h[(N + 1) * l + R], ft = h[(N + 1) * l + R + 1], Ct = v(rt - tt, et - tt, (tt + rt + et) / 3), Xt = v(ft - et, ft - rt, (rt + et + ft) / 3), se = v(rt - tt, ft - rt, (tt + rt + ft) / 3), te = v(ft - et, et - tt, (tt + et + ft) / 3);
    return L === U ? Ct && L === 0 || Xt && L === 1 || se || te : Ct || Xt || (L === 1 ? se : te);
  }, A = new Uint8Array(i * i), T = new Uint8Array(i * i), S = new Uint16Array(i * i), $ = [];
  for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = M(I + 0.5, C + 0.5), N = C * i + I, L = Math.abs(M(I + 1, C + 0.5) - M(I, C + 0.5)) + Math.abs(M(I + 0.5, C + 1) - M(I + 0.5, C));
    R < -0.9 ? A[N] = We : R < -0.05 ? A[N] = hs : R < 0.55 ? A[N] = $a : L > 2.2 ? A[N] = je : A[N] = He;
  }
  const O = Rr[a].map(([C, I]) => ({ x: Math.round(o + C * c), z: Math.round(o + I * c), ux: C, uz: I })), z = (C, I, R) => O.some((N) => ra(C - N.x, I - N.z) < R);
  for (let C = 1; C < i - 1; C++) for (let I = 1; I < i - 1; I++) {
    const R = C * i + I;
    if (A[R] !== He) continue;
    const [N, L] = Za(I + 0.5 - o, C + 0.5 - o, a), U = ra(N, L);
    let tt = os(N * 0.045 + 13, L * 0.045 - 7, e + 5, 3);
    const rt = ra(N - f * (c + 18), L - p * (c + 18));
    tt += ye(16, 6, rt) * 0.35, tt += ye(14, 8, L) * -0.25, U < d + 10 && (tt -= 0.3);
    const et = M(I + 0.5, C + 0.5);
    tt > Br && !z(I, C, 15) && De(Math.round(N * 4), Math.round(L * 4), e + 77) > 0.12 ? (T[R] = et > 9 ? tn : De(Math.round(N * 3), Math.round(L * 3), e + 78) < 0.14 ? mi : Qo, S[R] = 100) : De(Math.round(N * 2), Math.round(L * 2), e + 79) < 0.012 && !z(I, C, 11) && et < 8 && (T[R] = mi, S[R] = 100);
  }
  if (n) for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = C * i + I;
    A[R] === He && M(I + 0.5, C + 0.5) > Ua && (A[R] = $e);
  }
  if (a === 2 || a === 4) {
    const C = (R, N) => {
      let L = Math.abs(2 * R - (i - 1)), U = Math.abs(2 * N - (i - 1));
      if (a === 4 && U > L) {
        const tt = L;
        L = U, U = tt;
      }
      return (U + i - 1) / 2 * i + (L + i - 1) / 2;
    };
    for (let R = 0; R < i; R++) for (let N = 0; N < i; N++) {
      const L = R * i + N, U = C(N, R);
      U !== L && (A[L] = A[U], T[L] = T[U], S[L] = S[U]);
    }
    const I = (l - 1) / 2;
    for (let R = 0; R < l; R++) for (let N = 0; N < l; N++) {
      let L = Math.abs(N - I), U = Math.abs(R - I);
      if (a === 4 && U > L) {
        const tt = L;
        L = U, U = tt;
      }
      h[R * l + N] = h[(U + I) * l + L + I];
    }
  }
  if (n) for (let C = 0; C < i; C++) for (let I = 0; I < i; I++) {
    const R = C * i + I;
    (A[R] === He || A[R] === $e) && B(I, C) && (A[R] = w(I, C) ? je : $e, T[R] = 0, S[R] = 0);
  }
  const P = (C, I, R) => {
    if (a === 2) return C === 0 ? [I, R] : [i - 1 - I, i - 1 - R];
    if (a === 4) {
      let rt = I, et = R;
      for (let ft = 0; ft < C; ft++) {
        const Ct = rt;
        rt = i - 1 - et, et = Ct;
      }
      return [rt, et];
    }
    let N = I + 0.5 - o, L = R + 0.5 - o;
    const U = -0.5, tt = Ca / 2;
    for (let rt = 0; rt < C; rt++) {
      const et = N * U - L * tt;
      L = N * tt + L * U, N = et;
    }
    return [Math.floor(N + o), Math.floor(L + o)];
  }, F = [[0, 0], [1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [-1, 1], [2, 0]], E = new Jo(e ^ 24301), _ = (C, I, R, N) => {
    if (I < 1 || R < 1 || I >= i - 1 || R >= i - 1) return;
    const L = R * i + I;
    A[L] === We || A[L] === hs || $.some((U) => U.x === I && U.z === R) || (T[L] = 0, S[L] = 0, !n && A[L] === je && (A[L] = He), $.push({ kind: C, x: I, z: R, amount: N }));
  }, q = O[0];
  -q.uz, q.ux;
  const Y = (C, I, R, N, L, U, tt) => {
    const rt = [];
    for (let et = 0; et < tt; et++) {
      const [ft, Ct] = F[et % F.length];
      rt.push([Math.round(C + R * (L + ft) + -N * (U + Ct) - 0.5), Math.round(I + N * (L + ft) + R * (U + Ct) - 0.5)]);
    }
    return rt;
  }, j = [
    { kind: Jt, amount: 125, tiles: Y(q.x, q.z, q.ux, q.uz, -5, 6, 6) },
    { kind: Oe, amount: 350, tiles: Y(q.x, q.z, q.ux, q.uz, -9, -8, 5) },
    { kind: be, amount: 400, tiles: Y(q.x, q.z, q.ux, q.uz, -15, 14, 5) },
    { kind: be, amount: 800, tiles: Y(o, o, q.ux, q.uz, d + 12, 0, 6) },
    { kind: Oe, amount: 500, tiles: Y(o, o, q.ux, q.uz, d + 22, 6, 4) }
  ];
  for (let C = 0; C < a; C++) for (const I of j) for (const [R, N] of I.tiles) {
    const [L, U] = P(C, R, N);
    _(I.kind, L, U, I.amount);
  }
  for (const C of O) for (let I = -8; I <= 7; I++) for (let R = -8; R <= 7; R++) {
    if ((R + 0.5) ** 2 + (I + 0.5) ** 2 >= 50) continue;
    const N = (C.z + I) * i + C.x + R;
    T[N] = 0, S[N] = 0;
  }
  E.next();
  const Z = (C, I) => C > 1 && I > 1 && C < i - 2 && I < i - 2 && (A[I * i + C] === He || A[I * i + C] === $a) && !T[I * i + C] && !$.some((R) => R.x === C && R.z === I), J = (C, I, R = 8) => {
    for (let N = 0; N < R; N++) for (let L = -N; L <= N; L++) for (let U = -N; U <= N; U++)
      if (Math.max(Math.abs(U), Math.abs(L)) === N && Z(C + U, I + L))
        return [C + U, I + L];
    return [C, I];
  }, ut = [
    { kind: "deer", base: "s", u: -15, v: 13, n: 5, r: 5 },
    { kind: "boar", base: "s", u: 3, v: -16, n: 1, r: 3 },
    { kind: "wolf", base: "s", u: 28, v: -22, n: 2, r: 5 },
    { kind: "aurochs", base: "c", u: d + 30, v: 12, n: 3, r: 6 }
  ], ot = [], Q = [], at = (C) => Y(C.base === "s" ? q.x : o, C.base === "s" ? q.z : o, q.ux, q.uz, C.u, C.v, 1)[0], [xt, _t] = Y(o, o, q.ux, q.uz, d + 36, 0, 1)[0], Mt = n ? ut.map((C) => {
    const [I, R] = at(C), N = Array.from({ length: C.n }, (L, U) => {
      const [tt, rt] = F[U % F.length];
      return J(I + tt, R + rt, 24);
    });
    return { casa: Z(I, R) ? [I, R] : N[0], spots: N };
  }) : null, Qt = n ? J(xt, _t) : null, ee = (C, [I, R]) => {
    const [N, L] = P(C, I, R);
    return Z(N, L) ? [N, L] : J(N, L, 24);
  };
  for (let C = 0; C < a; C++) {
    ut.forEach((N, L) => {
      if (Mt) {
        const [Ct, Xt] = P(C, Mt[L].casa[0], Mt[L].casa[1]);
        ot.push({ kind: N.kind, x: Ct + 0.5, z: Xt + 0.5, r: N.r, spots: Mt[L].spots.map((se) => ee(C, se)) });
        return;
      }
      const [U, tt] = at(N), [rt, et] = P(C, U, tt), ft = [];
      for (let Ct = 0; Ct < N.n; Ct++) {
        const [Xt, se] = F[Ct % F.length], [te, Qe] = P(C, U + Xt, tt + se);
        ft.push(J(te, Qe));
      }
      ot.push({ kind: N.kind, x: rt + 0.5, z: et + 0.5, r: N.r, spots: ft });
    });
    const [I, R] = Qt ? ee(C, Qt) : J(...P(C, xt, _t));
    for (let N = -4; N <= 4; N++) for (let L = -4; L <= 4; L++) {
      const U = (R + N) * i + I + L;
      U >= 0 && U < i * i && (T[U] = 0, S[U] = 0);
    }
    Q.push({ x: I, z: R, player: C });
  }
  const Je = Da();
  return { size: i, seed: e, players: a, versao: s, trilhas: Je, hn: l, hstep: r, heights: h, terrain: A, tree: T, wood: S, res: $, starts: O, herds: ot, camps: Q };
  function Da() {
    const C = i * i, I = 1073741823, R = [1, -1, 0, 0, 1, 1, -1, -1], N = [0, 0, 1, -1, 1, -1, 1, -1], L = new Uint8Array(C);
    for (const H of $) L[H.z * i + H.x] = 1;
    const U = new Int32Array(C), tt = new Int32Array(C), rt = new Int32Array(C), et = new Float64Array(8 * C + 8), ft = (H) => {
      for (let K = 0; K < i; K++) for (let W = 0; W < i; W++) {
        const it = K * i + W, ht = A[it];
        if (W < 2 || K < 2 || W >= i - 2 || K >= i - 2 || ht === We || L[it]) {
          U[it] = -1;
          continue;
        }
        if (ht === je || ht === $e) {
          U[it] = H;
          continue;
        }
        let pt = 10 + Math.floor(os(W * 0.13, K * 0.13, e + 91, 2) * 24);
        T[it] && (pt += 60);
        const mt = M(W + 0.5, K + 0.5);
        mt > 4 && (pt += Math.floor((mt - 4) * 30)), !n && w(W, K) && (pt += 300), U[it] = pt;
      }
    }, Ct = (H, K) => {
      tt.fill(I), rt.fill(-1);
      let W = 0;
      const it = (ht) => {
        let pt = W++;
        for (; pt > 0; ) {
          const mt = pt - 1 >> 1;
          if (et[mt] <= ht) break;
          et[pt] = et[mt], pt = mt;
        }
        et[pt] = ht;
      };
      for (tt[H] = 0, it(H); W; ) {
        const ht = et[0], pt = et[--W];
        if (W) {
          let Bt = 0;
          for (; ; ) {
            const Ae = 2 * Bt + 1;
            if (Ae >= W) break;
            const bs = Ae + 1, Pe = bs < W && et[bs] < et[Ae] ? bs : Ae;
            if (et[Pe] >= pt) break;
            et[Bt] = et[Pe], Bt = Pe;
          }
          et[Bt] = pt;
        }
        const mt = ht % 65536, Ht = (ht - mt) / 65536;
        if (Ht > tt[mt]) continue;
        if (K && K[mt]) return mt;
        const fe = mt % i, St = (mt - fe) / i;
        for (let Bt = 0; Bt < 8; Bt++) {
          const Ae = fe + R[Bt], bs = St + N[Bt], Pe = bs * i + Ae, Xa = U[Pe];
          if (Xa < 0 || Bt >= 4 && (U[St * i + Ae] < 0 || U[bs * i + fe] < 0)) continue;
          const Ya = Ht + (Bt >= 4 ? Math.floor(Xa * 14 / 10) : Xa);
          Ya < tt[Pe] && (tt[Pe] = Ya, rt[Pe] = mt, it(Ya * 65536 + Pe));
        }
      }
      return -1;
    }, Xt = (H) => {
      let K = -1, W = I;
      for (const it of H) it >= 0 && it < C && tt[it] < W && (W = tt[it], K = it);
      return K;
    }, se = (H, K) => R.map((W, it) => (K + N[it]) * i + H + W), te = (H, K, W) => {
      for (let it = 0; it <= 8; it++) for (let ht = -it; ht <= it; ht++) for (let pt = -it; pt <= it; pt++) {
        if (Math.max(Math.abs(pt), Math.abs(ht)) !== it) continue;
        const mt = H + pt, Ht = K + ht;
        if (mt >= 0 && Ht >= 0 && mt < i && Ht < i && W(Ht * i + mt)) return Ht * i + mt;
      }
      return -1;
    }, Qe = (H, K) => {
      let W = 0, it = 1 / 0;
      return O.forEach((ht, pt) => {
        const mt = (ht.x - H) * (ht.x - H) + (ht.z - K) * (ht.z - K);
        mt < it && (it = mt, W = pt);
      }), W;
    };
    ft(-1), Ct(q.z * i + q.x);
    const Rs = [];
    for (const [H, K] of [[1, 0], [2 * f * f - 1, 2 * f * p]]) for (const W of g)
      Rs.push(te(Math.floor(o + H * W), Math.floor(o + K * W), (it) => A[it] === hs && tt[it] < I));
    for (const H of $) Qe(H.x, H.z) === 0 && Rs.push(Xt(se(H.x, H.z)));
    Rs.push(te(Q[0].x, Q[0].z, (H) => tt[H] < I));
    for (let H = 0; H < ut.length; H++) Rs.push(Xt(ot[H].spots.flatMap(([K, W]) => se(K, W))));
    const rr = Rs.filter((H) => H >= 0 && tt[H] < I).sort((H, K) => tt[H] - tt[K] || H - K), na = new Uint8Array(C);
    na[q.z * i + q.x] = 1;
    const Vi = [];
    for (const H of rr) {
      if (na[H]) continue;
      const K = Ct(H, na);
      if (!(K < 0))
        for (let W = K; W >= 0; W = rt[W])
          na[W] = 1, Vi.push(W);
    }
    const Wa = new Uint8Array(C);
    for (const H of Vi) {
      const K = H % i, W = (H - K) / i;
      for (let it = 0; it < a; it++) {
        const [ht, pt] = P(it, K, W);
        ht >= 0 && pt >= 0 && ht < i && pt < i && (Wa[pt * i + ht] = 1);
      }
    }
    const Ns = new Uint8Array(C).fill(255), gs = new Int32Array(C);
    let Ki = 0, Va = 0;
    for (let H = 0; H < C; H++) Wa[H] && (Ns[H] = 0, gs[Va++] = H);
    for (; Ki < Va; ) {
      const H = gs[Ki++], K = Ns[H];
      if (K >= Yi) continue;
      const W = H % i, it = (H - W) / i;
      for (let ht = 0; ht < 8; ht++) {
        const pt = W + R[ht], mt = it + N[ht];
        if (pt < 0 || mt < 0 || pt >= i || mt >= i) continue;
        const Ht = mt * i + pt;
        Ns[Ht] > K + 1 && (Ns[Ht] = K + 1, gs[Va++] = Ht);
      }
    }
    for (let H = 0; H < C; H++) {
      const K = Ns[H];
      if (!T[H] || K > Yi) continue;
      const W = H % i, it = (H - W) / i, [ht, pt] = Za(W + 0.5 - o, it + 0.5 - o, a);
      (K <= 1 || De(Math.round(ht * 2), Math.round(pt * 2), e + 93) < 0.45) && (T[H] = 0, S[H] = 0);
    }
    const Ka = (H) => !Ys(A[H]) && !T[H] && !L[H], Fs = new Uint8Array(C), lr = (H) => {
      Fs.fill(0);
      let K = 0, W = 0;
      for (Fs[H] = 1, gs[W++] = H; K < W; ) {
        const it = gs[K++], ht = it % i, pt = (it - ht) / i;
        for (let mt = 0; mt < 8; mt++) {
          const Ht = ht + R[mt], fe = pt + N[mt];
          if (Ht < 1 || fe < 1 || Ht >= i - 1 || fe >= i - 1) continue;
          const St = fe * i + Ht;
          Fs[St] || !Ka(St) || mt >= 4 && (!Ka(pt * i + Ht) || !Ka(fe * i + ht)) || (Fs[St] = 1, gs[W++] = St);
        }
      }
    }, cr = (H) => {
      for (let K = H; K >= 0; K = rt[K]) {
        (A[K] === je || A[K] === $e) && (A[K] = He);
        for (const W of [K, K - 1, K + 1, K - i, K + i]) W >= 0 && W < C && T[W] && (T[W] = 0, S[W] = 0);
      }
    };
    for (let H = 0; H < 3; H++) {
      let K = !1;
      for (let W = 0; W < a; W++) {
        const it = O[W], ht = it.z * i + it.x, pt = O[(W + 1) % a];
        lr(ht);
        const mt = [[pt.z * i + pt.x], [Q[W].z * i + Q[W].x]], Ht = (St) => St >= 0 && St < C && A[St] !== We && !L[St];
        for (const St of $) Qe(St.x, St.z) === W && mt.push(se(St.x, St.z).filter(Ht));
        for (const St of ot) Qe(St.x, St.z) === W && mt.push(St.spots.flatMap(([Bt, Ae]) => [Ae * i + Bt, ...se(Bt, Ae)]).filter(Ht));
        const fe = mt.filter((St) => !St.some((Bt) => Fs[Bt]));
        if (fe.length) {
          K = !0, ft(H ? 500 : -1), Ct(ht), globalThis.__trilhaLog?.push(`volta ${H} jogador ${W}: ${fe.map((St) => St.slice(0, 1).map((Bt) => `${Bt % i},${(Bt - Bt % i) / i}`).join("")).join(" | ")}`);
          for (const St of fe) {
            const Bt = Xt(St);
            Bt >= 0 && cr(Bt);
          }
        }
      }
      if (!K) break;
    }
    return Wa;
  }
}
function dt(e, t, s) {
  const a = ws(t / e.hstep, 0, e.hn - 1.001), i = ws(s / e.hstep, 0, e.hn - 1.001), o = Math.floor(a), n = Math.floor(i), r = a - o, l = i - n, h = e.hn, c = e.heights, u = c[n * h + o], d = c[n * h + o + 1], f = c[(n + 1) * h + o], p = c[(n + 1) * h + o + 1];
  return r + l <= 1 ? u + (d - u) * r + (f - u) * l : p + (f - p) * (1 - r) + (d - p) * (1 - l);
}
const Nr = ["food", "wood", "stone", "metal"], Is = (e) => e.season === 3, ne = (e, t, s, a, i) => {
  t >= 0 && t < e.players.length && e.events.push({ t: "msg", player: t, key: s, x: a, z: i });
};
function Fr(e) {
  rl(e);
  for (let t = 0; t < e.top; t++) {
    if (!e.alive[t]) continue;
    const s = e.kind[t];
    s >= bt ? il(e, t) : s < gt && (e.owner[t] === kt ? sl(e, t) : Lr(e, t));
  }
  tl(e), cl(e), e.tick % 50 === 25 && dl(e);
}
function Lr(e, t) {
  switch (e.cd[t] > 0 && e.cd[t]--, e.foodMode[t] && Xr(e, t), e.task[t]) {
    case Ft:
      jr(e, t);
      break;
    case Ie:
      Yr(e, t);
      break;
    case Rt:
      dn(e, t);
      break;
    case ms:
      _r(e, t);
      break;
    default:
      Ur(e, t);
  }
}
const Ss = 0, an = 1, on = 2, nn = 3;
function rn(e, t, s) {
  return G[e.kind[t]].animal?.mode === "predator" || e.aggro[t] > 0 && e.owner[e.aggro[t] - 1] === s;
}
function gi(e, t, s) {
  return e.isBuilding(s) ? G[e.kind[t]].siege ? Ss : on : e.owner[s] === kt ? rn(e, s, e.owner[t]) ? Ss : nn : e.kind[s] === ct.villager ? an : Ss;
}
function Fi(e, t, s, a = !1, i = nn) {
  const o = e.owner[t], n = G[e.kind[t]].siege;
  let r = -1, l = 99, h = 1 / 0;
  const c = (d, f) => {
    if (f >= i || f > l) return;
    const p = e.x[d] - e.x[t], y = e.z[d] - e.z[t], g = p * p + y * y;
    (f < l || g < h) && (l = f, h = g, r = d);
  };
  n || e.near(e.x[t], e.z[t], s, (d) => {
    if (d === t || !e.isUnit(d) || e.ignoreT[t] === d && e.tick < e.ignoreUntil[t]) return;
    const f = e.owner[d];
    (f === kt ? !rn(e, d, o) : !e.hostile(o, f)) || c(d, f !== kt && e.kind[d] === ct.villager ? an : Ss);
  });
  const u = n ? Ss : on;
  if ((a || n) && u < i && l > u) {
    const d = (s * V) ** 2;
    for (let f = 0; f < e.top; f++) if (e.isBuilding(f) && e.hostile(o, e.owner[f]) && !(e.ignoreT[t] === f && e.tick < e.ignoreUntil[t])) {
      const p = e.x[f] - e.x[t], y = e.z[f] - e.z[t];
      p * p + y * y < d && c(f, u);
    }
  }
  return r;
}
function ln(e, t, s) {
  const a = e.state[t] === Wt;
  a && (e.amx[t] = e.slotX[t], e.amz[t] = e.slotZ[t]), e.task[t] = Rt, e.tgt[t] = s, e.fails[t] = 0, e.rallyX[t] = e.x[t], e.rallyZ[t] = e.z[t], e.phase[t] = a ? 10 : 8;
}
function Ur(e, t) {
  if (e.kind[t] === ct.villager || (e.tick + t) % 5) return;
  const s = Fi(e, t, G[e.kind[t]].sight, e.state[t] !== Wt);
  s >= 0 && ln(e, t, s);
}
function _r(e, t) {
  if ((e.tick + t) % 5 === 0) {
    const s = Fi(e, t, G[e.kind[t]].sight, !0);
    if (s >= 0) {
      e.task[t] = Rt, e.tgt[t] = s, e.phase[t] = 9, e.fails[t] = 0;
      return;
    }
  }
  if (e.state[t] === Pt) {
    const s = e.amx[t] - e.x[t], a = e.amz[t] - e.z[t];
    s * s + a * a > (3 * V) ** 2 && e.fails[t]++ < 6 ? e.goPoint(t, e.amx[t], e.amz[t]) : e.task[t] = Nt;
  }
}
function Hr(e, t) {
  return (e.map.tree[t] > 0 || e.resKind[t] !== 0) && e.resAmt[t] > 0;
}
function bi(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.tgtTile[t] ? Hr(e, s) : e.alive[s] ? e.kind[s] === gt ? e.work[s] > 0 : e.isBuilding(s) && e.done[s] === 1 && e.bdef(s).key === "farm" && e.owner[s] === e.owner[t] : !1;
}
function yi(e, t, s = -1) {
  let a = e.tgt[t];
  const i = e.size;
  if (a < -1 && (a = -1 - a), !e.tgtTile[t] && s < 0 && a >= 0 && (s = a), e.tgtTile[t] && a >= 0 && a < i * i) {
    const o = e.carryRes[t], n = e.map.tree[a] > 0 || o === Zs, r = e.resKind[a] || (o === us ? Jt : o === Ea ? Oe : o === Ia ? be : 0), l = a % i, h = (a - l) / i;
    for (const [c, u] of Os) {
      if (c * c + u * u > 100) break;
      const d = l + c, f = h + u;
      if (d < 0 || f < 0 || d >= i || f >= i) continue;
      const p = f * i + d;
      if (!(p === s || !e.open(p)) && (n ? e.map.tree[p] && e.resAmt[p] > 0 : r && e.resKind[p] === r && e.resAmt[p] > 0))
        return e.tgt[t] = p, e.tgtTile[t] = 1, e.phase[t] = ze, e.fails[t] = 0, e.goNear(t, p, !0), !0;
    }
  } else if (a >= 0 && e.kind[a] === gt || e.carryRes[t] === us) {
    let o = -1, n = (10 * V) ** 2;
    for (let r = 0; r < e.top; r++) if (r !== s && e.alive[r] && e.kind[r] === gt && e.work[r] > 0) {
      const l = e.x[r] - e.x[t], h = e.z[r] - e.z[t], c = l * l + h * h;
      c < n && (n = c, o = r);
    }
    if (o >= 0)
      return e.tgt[t] = o, e.tgtTile[t] = 0, e.phase[t] = ze, e.goNear(t, o, !1), !0;
  }
  return !1;
}
function Li(e, t) {
  const s = e.owner[t];
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.owner[o] === s && e.done[o] && e.bdef(o).drop) {
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function Ta(e, t) {
  const s = Li(e, t);
  if (e.dropB[t] = s, s < 0) {
    e.task[t] = Nt;
    return;
  }
  e.phase[t] = oa, e.fails[t] = 0, e.goNear(t, s, !1);
}
function Gr(e, t, s) {
  const a = e.tgt[t];
  let i;
  s ? i = ys.farm : e.tgtTile[t] ? e.map.tree[a] ? i = ys.wood : i = e.resKind[a] === Jt ? ys.berry : e.resKind[a] === Oe ? ys.stone : ys.metal : i = ys.carcass;
  let o = Math.round(i * 1e3);
  return e.players[e.owner[t]]?.hunger && (o = Math.floor(o * 7 / 10)), e.players[e.owner[t]]?.ai && (o = Math.floor(o * [80, 100, 115][e.difficulty] / 100)), o;
}
function jr(e, t) {
  if (e.phase[t] === oa) {
    Wr(e, t);
    return;
  }
  if (!bi(e, t)) {
    e.carry[t] > 0 ? Ta(e, t) : yi(e, t) || (e.task[t] = Nt);
    return;
  }
  const s = e.tgt[t], a = e.tgtTile[t] === 1, i = !a && e.kind[s] >= bt, o = e.reach(t, s, a);
  if (e.phase[t] === ze) {
    if (o <= (i ? 60 : a ? 330 : 220))
      e.phase[t] = bn, e.state[t] = Pt, e.path[t] = null, e.field[t] = null;
    else if (e.state[t] === Pt && (e.tick + t) % 3 === 0) {
      if (e.overBudget) return;
      if (!e.goNear(t, s, a) || e.lastPartial || ++e.fails[t] > 4) {
        if (e.overBudget) return;
        e.fails[t] = 0, e.tgt[t] = -1 - s, yi(e, t, s) || (e.task[t] = Nt);
      }
    }
    return;
  }
  if (o > (i ? 140 : a ? 420 : 300)) {
    e.phase[t] = ze, e.goNear(t, s, a);
    return;
  }
  if (i && Is(e)) return;
  if (a && e.resKind[s] === Jt && Is(e)) {
    e.carry[t] > 0 ? Ta(e, t) : e.task[t] = Nt;
    return;
  }
  const n = a ? e.map.tree[s] ? Zs : e.resKind[s] === Jt ? us : e.resKind[s] === Oe ? Ea : Ia : us;
  e.carry[t] > 0 && e.carryRes[t] !== n && (e.carry[t] = 0), e.carryRes[t] = n, e.frac[t] += Gr(e, t, i);
  let r = Math.floor(e.frac[t] / 100);
  e.frac[t] %= 100;
  const l = i ? 1e9 : a ? e.resAmt[s] : e.work[s], h = e.carryCap(t);
  r = Math.min(r, l, h - e.carry[t]), r > 0 && (e.carry[t] += r, i || (a ? e.resAmt[s] -= r : e.work[s] -= r, (a ? e.resAmt[s] : e.work[s]) <= 0 && Dr(e, s, a))), (e.carry[t] >= h || !bi(e, t) && e.carry[t] > 0) && Ta(e, t);
}
function Dr(e, t, s) {
  if (!s) {
    e.remove(t);
    return;
  }
  const a = Ys(e.map.terrain[t]) ? 1 : 0;
  if (e.map.tree[t]) {
    e.map.tree[t] = 0, e.map.wood[t] = 0, e.resAmt[t] = 0, e.blocked[t] = a, e.events.push({ t: "tree", k: t });
    return;
  }
  e.resKind[t] = 0, e.resAmt[t] = 0, e.blocked[t] = a, e.events.push({ t: "res", k: t });
}
function Wr(e, t) {
  let s = e.dropB[t];
  if (s < 0 || !e.isBuilding(s) || !e.done[s] || e.owner[s] !== e.owner[t]) {
    if (s = Li(e, t), e.dropB[t] = s, s < 0) {
      e.task[t] = Nt;
      return;
    }
    e.goNear(t, s, !1);
  }
  if (e.reach(t, s, !1) <= 200) {
    const a = e.players[e.owner[t]];
    if (a && (a.res[Nr[e.carryRes[t]]] += e.carry[t]), e.carry[t] = 0, e.state[t] = Pt, e.path[t] = null, e.foodMode[t] && !hn(e, t)) {
      const i = ki(e, t);
      if (i) {
        xi(e, t, i);
        return;
      }
    }
    bi(e, t) ? (e.phase[t] = ze, e.fails[t] = 0, e.goNear(t, e.tgt[t], e.tgtTile[t] === 1)) : yi(e, t) || (e.task[t] = Nt);
    return;
  }
  e.state[t] === Pt && (++e.fails[t] > 5 ? e.task[t] = Nt : e.goNear(t, s, !1));
}
const Vr = 30, Zi = 0, Kr = 1, vi = 2, cn = 3;
function hn(e, t) {
  const s = e.tgt[t];
  return s < 0 ? !1 : e.task[t] === Rt ? e.isAnimal(s) && (G[e.kind[s]].animal?.food ?? 0) > 0 : e.tgtTile[t] ? e.resKind[s] === Jt && e.resAmt[s] > 0 && !Is(e) : e.alive[s] ? e.kind[s] === gt ? e.work[s] > 0 : e.isBuilding(s) && e.bdef(s).key === "farm" && !Is(e) : !1;
}
function ki(e, t) {
  const s = e.owner[t], a = Is(e), i = e.size, o = Li(e, t), n = o >= 0 ? e.x[o] : e.x[t], r = o >= 0 ? e.z[o] : e.z[t], l = (Vr * V) ** 2, h = (g, x) => {
    const M = g - n, v = x - r;
    return M * M + v * v <= l;
  }, c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
  for (let g = 0; g < e.top; g++) if (g !== t && e.isUnit(g) && e.owner[g] === s && e.kind[g] === ct.villager && e.tgt[g] >= 0 && (e.task[g] === Ft || e.task[g] === Rt)) {
    const x = e.task[g] === Ft && e.tgtTile[g] ? u : c;
    x.set(e.tgt[g], (x.get(e.tgt[g]) ?? 0) + 1);
  }
  let d = -1, f = 1 / 0, p = Zi;
  const y = (g, x, M, v) => {
    const w = x - e.x[t], B = M - e.z[t], A = w * w + B * B;
    A < f && (f = A, d = g, p = v);
  };
  for (let g = 0; g < e.top; g++) e.alive[g] && e.kind[g] === gt && e.work[g] > 0 && (c.get(g) ?? 0) < 4 && h(e.x[g], e.z[g]) && y(g, e.x[g], e.z[g], Zi);
  if (d >= 0) return { t: d, how: p };
  if (!a) {
    for (let g = 0; g < e.top; g++) e.isBuilding(g) && e.owner[g] === s && e.done[g] && e.bdef(g).key === "farm" && !c.has(g) && y(g, e.x[g], e.z[g], Kr);
    if (d >= 0) return { t: d, how: p };
    for (const g of e.map.res) {
      const x = g.z * i + g.x;
      if (e.resKind[x] !== Jt || e.resAmt[x] <= 0 || (u.get(x) ?? 0) >= 2 || !e.open(x)) continue;
      const M = g.x * V + 128, v = g.z * V + 128;
      h(M, v) && y(x, M, v, vi);
    }
    if (d >= 0) return { t: d, how: p };
  }
  for (let g = 0; g < e.top; g++) e.isAnimal(g) && G[e.kind[g]].animal.mode === "flee" && (c.get(g) ?? 0) < 2 && h(e.x[g], e.z[g]) && y(g, e.x[g], e.z[g], cn);
  return d >= 0 ? { t: d, how: p } : null;
}
function xi(e, t, s) {
  if (e.fails[t] = 0, e.phase[t] = ze, e.tgt[t] = s.t, s.how === cn) {
    e.task[t] = Rt, e.tgtTile[t] = 0, e.phase[t] = 0, e.goNear(t, s.t, !1);
    return;
  }
  e.task[t] = Ft, e.tgtTile[t] = s.how === vi ? 1 : 0, e.goNear(t, s.t, s.how === vi);
}
function Xr(e, t) {
  if (e.foodMode[t] === 1 && (e.tick + t) % 30) return;
  e.foodMode[t] = 1;
  const s = e.task[t];
  if (s === Nt) {
    if (e.state[t] === Pt) {
      const i = ki(e, t);
      i && xi(e, t, i);
    }
    return;
  }
  if (s !== Ft || e.phase[t] === oa || hn(e, t)) return;
  const a = ki(e, t);
  a && (e.carry[t] > 0 && e.carryRes[t] !== us ? Ta(e, t) : xi(e, t, a));
}
function Yr(e, t) {
  const s = e.tgt[t];
  if (!e.isBuilding(s) || e.owner[s] !== e.owner[t]) {
    e.task[t] = Nt;
    return;
  }
  if (e.done[s]) {
    if (e.bdef(s).key === "farm" && !Jr(e, s, t))
      e.task[t] = Ft, e.phase[t] = ze, e.goNear(t, s, !1);
    else if (e.bdef(s).wall) {
      const r = Zr(e, t, s);
      r >= 0 ? (e.tgt[t] = r, e.fails[t] = 0, e.goNear(t, r, !1)) : e.task[t] = Nt;
    } else e.task[t] = Nt;
    return;
  }
  if (e.reach(t, s, !1) > 230) {
    e.state[t] === Pt && (++e.fails[t] > 5 ? e.task[t] = Nt : e.goNear(t, s, !1));
    return;
  }
  e.state[t] = Pt, e.path[t] = null, e.fails[t] = 0;
  const a = (e.tick & 16383) + 1, i = e.tmr[s] !== a;
  e.tmr[s] = a, e.work[s] += i ? 10 : 6;
  const o = e.bdef(s), n = o.time * 100;
  e.hp[s] = Math.max(e.hp[s], Math.floor(o.hp * Math.min(1, e.work[s] / n))), e.work[s] >= n && (e.done[s] = 1, e.hp[s] = o.hp, e.work[s] = 0, e.events.push({ t: "built", e: s }), ne(e, e.owner[s], "built." + o.key, e.x[s], e.z[s]));
}
function Zr(e, t, s) {
  let a = -1, i = (10 * V) ** 2;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && !e.done[o] && e.owner[o] === e.owner[t] && e.bdef(o).wall) {
    const n = e.x[o] - e.x[s], r = e.z[o] - e.z[s], l = n * n + r * r;
    l < i && (i = l, a = o);
  }
  return a;
}
function Jr(e, t, s) {
  for (let a = 0; a < e.top; a++) if (a !== s && e.isUnit(a) && e.task[a] === Ft && e.tgt[a] === t && !e.tgtTile[a]) return !0;
  return !1;
}
function dn(e, t) {
  let s = e.tgt[t];
  if (s < 0 || !e.alive[s] || s === t || e.kind[s] === gt || e.isUnit(s) && e.owner[s] === e.owner[t]) {
    Ji(e, t);
    return;
  }
  const a = G[e.kind[t]], i = e.kind[t] === ct.villager;
  if (!i && e.owner[t] !== kt && (e.tick + t) % 5 === 0) {
    const l = gi(e, t, s);
    if (l > Ss) {
      const h = Fi(e, t, a.sight, !1, l);
      h >= 0 && (e.tgt[t] = s = h, e.fails[t] = 0);
    }
  }
  i && (e.amx[t] = e.x[s], e.amz[t] = e.z[s]);
  const o = a.hunt && e.owner[s] === kt, n = Math.round((o ? a.hunt : a.range) * V), r = e.reach(t, s, !1);
  if (r <= n + 40) {
    e.fails[t] = 0, e.state[t] === Wt && (e.state[t] = Pt, e.path[t] = null, e.field[t] = null), e.cd[t] === 0 && (Qr(e, t, s), e.cd[t] = a.cd);
    return;
  }
  if ((e.phase[t] === 8 || e.phase[t] === 10) && e.owner[t] !== kt) {
    const l = e.x[t] - e.rallyX[t], h = e.z[t] - e.rallyZ[t];
    if (l * l + h * h > (12 * V) ** 2) {
      e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 100, e.task[t] = Nt, e.tgt[t] = -1, e.phase[t] === 8 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.phase[t] = 0, e.goPoint(t, e.amx[t], e.amz[t]);
      return;
    }
  }
  if (e.state[t] === Pt && (e.tick + t) % 4 === 0 || (e.tick + t) % 15 === 0) {
    if (e.overBudget) return;
    if (e.fails[t] > 8) {
      e.fails[t] = 0, e.ignoreT[t] = s, e.ignoreUntil[t] = e.tick + 300, Ji(e, t);
      return;
    }
    if (e.owner[t] === kt) {
      const l = e.map.herds[e.herd[t]];
      if (l) {
        const h = l.x * V - e.x[t], c = l.z * V - e.z[t];
        if (h * h + c * c > (16 * V) ** 2) {
          e.task[t] = Nt, e.aggro[t] = 0, e.fast[t] = 0, e.goPoint(t, l.x * V, l.z * V);
          return;
        }
      }
    }
    if ((a.proj || o) && r <= n + V * 2 && e.state[t] === Pt) {
      e.goPoint(t, e.x[s], e.z[s]), e.fails[t]++;
      return;
    }
    !e.goNear(t, s, !1) || e.lastPartial ? e.fails[t] += 3 : e.fails[t]++;
  }
}
function Ji(e, t) {
  if (e.kind[t] === ct.villager) {
    let a = -1, i = (3 * V) ** 2;
    for (let o = 0; o < e.top; o++) if (e.alive[o] && e.kind[o] === gt) {
      const n = e.x[o] - e.amx[t], r = e.z[o] - e.amz[t], l = n * n + r * r;
      l < i && (i = l, a = o);
    }
    if (a >= 0) {
      e.task[t] = Ft, e.tgt[t] = a, e.tgtTile[t] = 0, e.phase[t] = ze, e.goNear(t, a, !1);
      return;
    }
  }
  const s = e.phase[t];
  if (s === 9 && e.owner[t] !== kt) {
    e.rallyX[t] >= 0 && (e.amx[t] = e.rallyX[t], e.amz[t] = e.rallyZ[t]), e.task[t] = ms, e.phase[t] = 0, e.fails[t] = 0, e.tgt[t] = -1, e.goPoint(t, e.amx[t], e.amz[t]);
    return;
  }
  e.task[t] = Nt, e.tgt[t] = -1, e.phase[t] = 0, s === 10 && e.owner[t] !== kt ? e.goPoint(t, e.amx[t], e.amz[t]) : (e.state[t] = Pt, e.path[t] = null, e.field[t] = null);
}
function Qr(e, t, s) {
  const a = G[e.kind[t]];
  if (a.siege && !e.isBuilding(s)) return;
  let i = e.atkOf(t);
  if (e.isUnit(s)) {
    const n = G[e.kind[s]];
    i -= e.armorOf(s);
    for (const r of a.bonus ?? []) n.cls === r.vs && (i += r.dmg);
  }
  i = Math.max(1, i);
  const o = a.proj ?? (a.hunt && e.owner[s] === kt ? "spear" : void 0);
  if (o) {
    const n = e.x[s] - e.x[t], r = e.z[s] - e.z[t], l = ns(n * n + r * r), h = Math.max(3, Math.round(l / V));
    e.projectiles.push({ target: s, dmg: i, at: e.tick + h, by: t, k: e.kind[s], o: e.owner[s] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[s], z1: e.z[s], ticks: h, kind: o, tk: e.kind[s], gap: e.reach(t, s, !1), te: s });
  } else un(e, s, i, t);
}
function tl(e) {
  if (!e.projectiles.length) return;
  const t = [];
  for (const s of e.projectiles) {
    if (s.at > e.tick) {
      t.push(s);
      continue;
    }
    e.alive[s.target] && e.kind[s.target] === s.k && e.owner[s.target] === s.o && un(e, s.target, s.dmg, s.by);
  }
  e.projectiles = t;
}
function un(e, t, s, a) {
  e.hp[t] -= s;
  const i = e.owner[t];
  if (i === kt)
    e.alive[a] && (e.aggro[t] = a + 1);
  else if (e.isUnit(t) && e.alive[a]) {
    const n = e.task[t];
    e.kind[t] === ct.villager ? e.owner[a] === kt && n !== Rt && (e.task[t] = Rt, e.tgt[t] = a, e.phase[t] = 0) : G[e.kind[t]].siege || (n === Nt ? ln(e, t, a) : n === ms ? (e.task[t] = Rt, e.tgt[t] = a, e.phase[t] = 9, e.fails[t] = 0) : n === Rt && e.isUnit(a) && e.tgt[t] !== a && gi(e, t, e.tgt[t]) > gi(e, t, a) && (e.tgt[t] = a, e.fails[t] = 0));
  }
  const o = e.players[i];
  if (o && e.tick - o.lastAlert > 300 && e.owner[a] !== i && (o.lastAlert = e.tick, ne(e, i, "underAttack", e.x[t], e.z[t])), o && e.isBuilding(t) && e.bdef(t).key === "center") {
    const n = e.bdef(t).hp, r = e.hp[t] + s;
    (r > n / 2 && e.hp[t] <= n / 2 || r > n / 5 && e.hp[t] <= n / 5) && ne(e, i, "centerDanger." + e.owner[a], e.x[t], e.z[t]);
  }
  e.hp[t] <= 0 && el(e, t, a);
}
function el(e, t, s) {
  if (e.events.push({ t: "death", x: e.x[t], z: e.z[t], kind: e.kind[t], owner: e.owner[t] }), e.isUnit(t)) {
    const a = G[e.kind[t]].animal;
    a && a.food > 0 && e.spawnCarcass(e.kind[t], e.x[t], e.z[t], a.food);
  } else if (e.isBuilding(t)) {
    const a = e.bdef(t).key, i = e.owner[s];
    if (a === "camp" && i >= 0 && i < e.players.length && (e.players[i].res.food += 2e4, e.players[i].res.wood += 15e3, ne(e, i, "campLoot", e.x[t], e.z[t])), a === "center") {
      const o = e.players[e.owner[t]];
      ne(e, e.owner[t], "centerLost." + e.owner[s]), e.remove(t), o && fn(e, o);
      return;
    }
  }
  e.remove(t);
}
function sl(e, t) {
  e.cd[t] > 0 && e.cd[t]--;
  const s = G[e.kind[t]], a = s.animal, i = e.map.herds[e.herd[t]];
  if (e.task[t] === Rt) {
    dn(e, t);
    return;
  }
  if (a.mode === "flee") {
    if (e.fast[t]) {
      (--e.tmr[t] <= 0 || e.state[t] === Pt) && (e.fast[t] = 0, e.tmr[t] = 20);
      return;
    }
    if ((e.tick + t) % 3 === 0) {
      let o = -1;
      if (e.aggro[t] > 0 && e.alive[e.aggro[t] - 1] && (o = e.aggro[t] - 1), o >= 0) {
        let n = e.x[t] - e.x[o], r = e.z[t] - e.z[o];
        const l = ns(n * n + r * r) || 1;
        n = Math.trunc(n * 4 * V / l), r = Math.trunc(r * 4 * V / l), e.fast[t] = 1, e.tmr[t] = 18, e.aggro[t] = 0, e.goPoint(t, e.x[t] + n, e.z[t] + r);
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
    const o = al(e, t, s.sight + (e.season === 3 ? 3 : 0));
    if (o >= 0) {
      e.task[t] = Rt, e.tgt[t] = o, e.fast[t] = 1;
      return;
    }
  }
  if (e.fast[t] = 0, e.state[t] === Pt && i) {
    if (e.tmr[t] > 0) {
      e.tmr[t]--;
      return;
    }
    const o = Math.max(1, i.r) * V, n = e.rng.int(2 * o + 1) - o, r = e.rng.int(2 * o + 1) - o;
    e.goPoint(t, Math.round(i.x * V) + n, Math.round(i.z * V) + r), e.tmr[t] = 50 + e.rng.int(90);
  }
}
function al(e, t, s) {
  let a = -1, i = 1 / 0;
  return e.near(e.x[t], e.z[t], s, (o) => {
    if (!e.isUnit(o) || e.owner[o] === kt) return;
    const n = e.x[o] - e.x[t], r = e.z[o] - e.z[t], l = n * n + r * r;
    l < i && (i = l, a = o);
  }), a;
}
function il(e, t) {
  if (!e.done[t]) return;
  const s = e.owner[t], a = e.players[s];
  if (!a) return;
  const i = e.bdef(t), o = i.key;
  e.queue[t].length && nl(e, t, a), i.tower && ol(e, t, i.tower), o === "pen" && !Is(e) && e.tick % 10 === 0 && (a.res.food += 20), o === "sanctuary" && e.tick % 20 === 0 && e.near(e.x[t], e.z[t], 6, (n) => {
    e.isUnit(n) && e.owner[n] === s && e.hp[n] < G[e.kind[n]].hp && e.hp[n]++;
  });
}
function ol(e, t, s) {
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
    u <= s.range * V && u < o && (o = u, i = c);
  }), i < 0) return;
  const n = Math.max(1, s.atk - e.armorOf(i)), r = e.x[i] - e.x[t], l = e.z[i] - e.z[t], h = Math.max(3, Math.round(ns(r * r + l * l) / V));
  e.projectiles.push({ target: i, dmg: n, at: e.tick + h, by: t, k: e.kind[i], o: e.owner[i] }), e.events.push({ t: "proj", x0: e.x[t], z0: e.z[t], x1: e.x[i], z1: e.z[i], ticks: h, kind: "arrow", tk: e.kind[i], gap: e.reach(t, i, !1), te: i, h: 3.2 }), e.cd[t] = s.cd;
}
function nl(e, t, s) {
  if (s.hunger) return;
  const a = e.queue[t][0];
  if (a >= ie) {
    const v = Ke[a - ie];
    if (++e.work[t] < v.time * 10) return;
    e.work[t] = 0, e.queue[t].shift(), s.tech |= 1 << a - ie, ne(e, s.id, "tech." + v.key, e.x[t], e.z[t]);
    return;
  }
  const i = G[a];
  if (e.work[t] === 0 && e.pop(s.id) + i.pop > e.popCap(s.id)) {
    e.tick % 300 === 0 && ne(e, s.id, e.popCap(s.id) >= Xs[s.era] ? "popEra" : "popHouses");
    return;
  }
  if (e.work[t]++, e.work[t] < i.time * 10) return;
  e.work[t] = 0;
  const o = e.queue[t].shift(), [n, r, l] = e.footprint(t), h = e.size / 2, c = e.rallyX[t] >= 0 ? e.rallyX[t] >> 8 : h, u = e.rallyZ[t] >= 0 ? e.rallyZ[t] >> 8 : h, d = n + l / 2, f = r + l / 2, p = c - d, y = u - f, g = Math.sqrt(p * p + y * y) || 1, x = e.nearestFree(Math.round(d + p / g * (l / 2 + 1)), Math.round(f + y / g * (l / 2 + 1)));
  if (x < 0) return;
  const M = e.spawnUnit(s.id, G[o].key, x % e.size + 0.5, Math.floor(x / e.size) + 0.5);
  e.events.push({ t: "trained", e: M }), e.rallyX[t] >= 0 && e.goPoint(M, e.rallyX[t], e.rallyZ[t]);
}
function rl(e) {
  if (e.tick === 0 || e.tick % xe !== 0) return;
  const t = e.month;
  if (t % 3 === 0)
    for (const s of e.players) !s.defeated && s.era >= 2 && ll(e, s.id) && ne(e, s.id, "fair");
  if (t === 8) for (const s of e.players) ne(e, s.id, "winterSoon");
  if (t >= 9) {
    for (const s of e.players) {
      if (s.defeated) continue;
      const a = e.pop(s.id) * (s.era <= 1 ? 1 : s.era <= 3 ? 2 : 3) * 100;
      s.res.food >= a ? (s.res.food -= a, s.hunger && (s.hunger = !1)) : (s.res.food = 0, s.hunger || ne(e, s.id, "hunger"), s.hunger = !0);
    }
    if (t === 9) for (const s of e.players) ne(e, s.id, "winter");
  }
  if (t === 0) for (const s of e.players)
    s.hunger = !1, ne(e, s.id, "spring");
}
function ll(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.done[s] && e.bdef(s).market) return !0;
  return !1;
}
function cl(e) {
  for (const t of e.players)
    if (t.aging) {
      if (!e.isBuilding(t.agingB) || e.owner[t.agingB] !== t.id) {
        t.aging = 0;
        continue;
      }
      if (!(--t.aging > 0)) {
        t.era++;
        for (let s = 0; s < e.top; s++) if (e.isUnit(s) && e.owner[s] === t.id) {
          const a = G[e.kind[s]].next;
          if (!a) continue;
          const i = G[e.kind[s]], o = G[ct[a]];
          e.hp[s] = Math.round(e.hp[s] * o.hp / i.hp), e.kind[s] = ct[a];
        }
        for (let s = 0; s < e.top; s++) e.isBuilding(s) && e.owner[s] === t.id && (e.queue[s] = e.queue[s].map((a) => a < ie && G[a].next ? ct[G[a].next] : a));
        e.events.push({ t: "age", player: t.id, era: t.era }), t.era === 2 && ne(e, t.id, "metalSeen");
      }
    }
}
function fn(e, t) {
  if (!t.defeated) {
    t.defeated = !0, t.aging = 0;
    for (const s of e.players) ne(e, s.id, "defeated." + t.id);
    for (let s = 0; s < e.top; s++) e.alive[s] && e.owner[s] === t.id && e.remove(s);
    pn(e);
  }
}
function hl(e, t) {
  for (let s = 0; s < e.top; s++) if (e.isBuilding(s) && e.owner[s] === t && e.bdef(s).key === "center") return !0;
  return !1;
}
function dl(e) {
  if (e.outcome === "playing") {
    for (const t of e.players) !t.defeated && !hl(e, t.id) && fn(e, t);
    pn(e);
  }
}
function pn(e) {
  if (e.outcome !== "playing") return;
  const t = e.players.filter((s) => !s.ai);
  t.length && t.every((s) => s.defeated) ? (e.outcome = "defeat", e.events.push({ t: "end", result: "defeat" })) : e.players.filter((s) => s.ai).every((s) => s.defeated) && e.players.some((s) => s.ai) && (e.outcome = "victory", e.events.push({ t: "end", result: "victory" }));
}
const Ja = [13, 24, 30], ul = [3, 9, 14], Qi = [42, 36, 30], fl = [24, 16, 11], pl = [10, 7, 5], ml = [6, 12, 99];
function gl(e) {
  for (const t of e.players) {
    if (!t.ai || t.defeated) continue;
    const s = e.ai[t.id];
    e.tick < s.next || (s.next = e.tick + 10, bl(e, t.id, s));
  }
  Ml(e);
}
function bl(e, t, s) {
  const a = e.players[t], i = Math.min(a.era, 2), o = [], n = [], r = [];
  for (let T = 0; T < e.top; T++)
    !e.alive[T] || e.owner[T] !== t || (e.isBuilding(T) ? r.push(T) : e.isUnit(T) && (e.kind[T] === ct.villager ? o : n).push(T));
  const l = r.find((T) => e.bdef(T).key === "center" && e.done[T]);
  if (l === void 0) return;
  const h = (T, S = !1) => r.filter(($) => e.bdef($).key === T && (!S || e.done[$])), c = o.length + n.length, u = e.popCap(t), d = r.filter((T) => !e.done[T]), f = e.tick / xe, p = /* @__PURE__ */ new Set(), y = (T, S, $) => {
    const O = kl(e, t, T, l, o.filter((z) => !p.has(z)), S, $);
    return O >= 0 && p.add(O), O >= 0;
  }, g = !a.aging && (a.era === 0 && o.length >= Ja[0] || a.era === 1 && o.length >= Ja[1] - 2 && f >= Qi[e.difficulty] - 6 && e.eraBuildingTypes(t) >= 2);
  if (o.length < Ja[i] && !e.queue[l].length && c < u && !a.aging && e.issue({ type: "train", player: t, building: l, key: "villager" }), u - c <= 3 && u < Xs[a.era] && !d.some((T) => e.bdef(T).key === "house") && e.tick >= s.houseCd && y("house", 5, 14) && (s.houseCd = e.tick + 150), o.length >= 6 && !h("depot").length) {
    const T = xl(e, t, l, o.filter((S) => !p.has(S)));
    T >= 0 && p.add(T);
  }
  if (a.era >= 2 && h("depot").length < 2) {
    const T = gn(e, t, l, o.filter((S) => !p.has(S)), (S) => e.resKind[S] === be);
    T >= 0 && p.add(T);
  }
  const x = h("military");
  o.length >= 9 && !x.length && y("military", 7, 16);
  const M = x.filter((T) => e.done[T]), v = ul[i] + (a.era ? Math.floor(f / 8) : 0), w = {};
  a.era >= 2 && (w.stone = (h("forge").length ? 0 : 60) + (h("market").length ? 0 : 40) + (h("tower").length ? 0 : 120), w.metal = (!e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0) + (h("stable", !0).length ? 35 : 0));
  const B = (T, S) => rs.every(($) => a.res[$] >= ((T[$] ?? 0) + (S[$] ?? 0)) * 100);
  if (M.length && !g && n.length < v && !e.queue[M[0]].length && c < u) {
    const T = Ri(Et[Vt.military], a.era).filter((S) => S !== "dog" && B(G[ct[S]].cost, w));
    T.length && e.issue({ type: "train", player: t, building: M[0], key: T[e.rng.int(T.length)] });
  }
  if (a.era >= 2 && !g) {
    const T = h("stable", !0)[0], S = h("workshop", !0)[0];
    T !== void 0 && n.length < v && !e.queue[T].length && c + 2 <= u && B(G[ct.horseman].cost, { stone: w.stone, metal: !e.hasTech(t, "bronze") && h("forge", !0).length ? 60 : 0 }) && e.issue({ type: "train", player: t, building: T, key: "horseman" });
    const $ = n.filter((P) => G[e.kind[P]].siege).length;
    S !== void 0 && $ < 2 && !e.queue[S].length && c + 3 <= u && e.issue({ type: "train", player: t, building: S, key: "ram" });
    const O = h("forge", !0)[0], z = h("market", !0)[0];
    if (O !== void 0 && !e.queue[O].length && (e.hasTech(t, "bronze") ? !e.hasTech(t, "iron") && a.res.metal > 3e4 && e.issue({ type: "research", player: t, building: O, key: "iron" }) : e.issue({ type: "research", player: t, building: O, key: "bronze" })), z !== void 0 && !e.queue[z].length && !e.hasTech(t, "wheel") && a.res.metal > 15e3 && e.issue({ type: "research", player: t, building: z, key: "wheel" }), z !== void 0 && (e.tick + t) % 30 === 0 && a.res.wood > (e.fair ? 5e4 : 9e4)) {
      const P = a.res.stone < 2e4 ? "stone" : a.res.metal < 25e3 ? "metal" : a.res.food < 3e4 ? "food" : null;
      P && e.issue({ type: "trade", player: t, building: z, give: "wood", get: P });
    }
  }
  a.era === 0 && !a.aging && o.length >= 10 && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, ls[0].cost) && e.issue({ type: "ageup", player: t, building: l }), a.era === 1 && !a.aging && o.length >= 18 && f >= Qi[e.difficulty] && e.eraBuildingTypes(t) >= 2 && e.canAfford(t, ls[1].cost) && e.issue({ type: "ageup", player: t, building: l }), a.era >= 1 && !d.length && (h("farm").length < Math.min(a.era >= 2 ? 14 : 10, Math.floor(o.length * 2 / 5)) ? y("farm", 6, 15) : h("pen").length ? !h("sanctuary").length && f > 30 ? y("sanctuary", 6, 14) : a.era >= 2 && (h("stable").length ? h("forge").length ? !h("market").length && (f > 50 || a.res.wood > 6e4) ? y("market", 7, 16) : h("tower").length ? !h("workshop").length && f > 58 && y("workshop", 7, 16) : y("tower", 5, 10) : y("forge", 6, 14) : y("stable", 7, 16)) : y("pen", 7, 16));
  const A = o.filter((T) => e.task[T] === Nt && e.state[T] === Pt && !p.has(T));
  if (A.length) {
    const T = [0, 0, 0, 0];
    for (const $ of o) if (e.task[$] === Ft) {
      const O = e.tgt[$], z = e.tgtTile[$] ? e.map.tree[O] ? Zs : e.resKind[O] === Oe ? Ea : e.resKind[O] === be ? Ia : us : us;
      T[z === Ia ? 3 : z === Ea ? 2 : z === Zs ? 1 : 0]++;
    }
    const S = a.era === 0 ? g ? [0.8, 0.15, 0.05, 0] : [0.62, 0.3, 0.08, 0] : a.era === 1 ? g ? [0.55, 0.25, 0.2, 0] : [0.5, 0.35, 0.15, 0] : [0.42, 0.25, 0.13, 0.2];
    a.res.wood > 4e4 && (S[0] += S[1] - 0.1, S[1] = 0.1), a.res.stone > 25e3 && (S[0] += S[2], S[2] = 0), a.res.metal > 4e4 && (S[0] += S[3], S[3] = 0);
    for (const $ of A) {
      const O = T[0] + T[1] + T[2] + T[3] + 1, z = (P) => S[P] - T[P] / O;
      for (const P of [0, 1, 2, 3].sort((F, E) => z(E) - z(F) || F - E)) if (to(e, t, $, P, l)) {
        T[P]++;
        break;
      }
    }
  }
  if (a.res.wood > 4e4 && (e.tick + t * 7) % 200 === 0) {
    const T = o.find((S) => e.task[S] === Ft && e.tgtTile[S] && e.map.tree[e.tgt[S]] > 0 && !p.has(S));
    T !== void 0 && e.carry[T] === 0 && to(e, t, T, 0, l);
  }
  if ((e.tick + t) % 30 === 0) {
    const T = yl(e, t, l, 18);
    if (T >= 0) {
      const S = n.filter(($) => e.task[$] !== ms || !0);
      S.length && e.issue({ type: "attack", player: t, ids: S, target: T });
    }
  }
  if (s.attackAt || (s.attackAt = fl[e.difficulty] * xe), e.tick >= s.attackAt && n.length >= 5) {
    const T = vl(e, t, l);
    T >= 0 && e.issue({ type: "amove", player: t, ids: n.slice(0, ml[e.difficulty]), x: e.x[T], z: e.z[T] }), s.attackAt = e.tick + pl[e.difficulty] * xe;
  }
}
function yl(e, t, s, a) {
  let i = -1, o = (a * V) ** 2;
  return e.near(e.x[s], e.z[s], a, (n) => {
    if (!e.isUnit(n)) return;
    const r = e.owner[n];
    if (r === t || r < 0) return;
    const l = e.x[n] - e.x[s], h = e.z[n] - e.z[s], c = l * l + h * h;
    c < o && (o = c, i = n);
  }), i;
}
function vl(e, t, s) {
  let a = -1, i = 1 / 0;
  for (let o = 0; o < e.top; o++) if (e.isBuilding(o) && e.bdef(o).key === "center" && e.owner[o] !== t && e.owner[o] >= 0 && e.owner[o] < e.players.length) {
    const n = !e.players[e.owner[o]].ai, r = e.x[o] - e.x[s], l = e.z[o] - e.z[s], h = (r * r + l * l) * (n && e.difficulty === 2 ? 0.6 : 1) * (1 + 0.02 * ((e.owner[o] - t + e.players.length) % e.players.length));
    h < i && (i = h, a = o);
  }
  return a;
}
function kl(e, t, s, a, i, o, n) {
  const r = Et[Vt[s]];
  if (!e.canAfford(t, r.cost) || !i.length) return -1;
  const l = e.x[a] >> 8, h = e.z[a] >> 8;
  for (const [c, u] of Os) {
    const d = c * c + u * u;
    if (d < o * o) continue;
    if (d > n * n) break;
    const f = l + c - (r.size >> 1), p = h + u - (r.size >> 1);
    if (!e.canPlace(t, s, f, p) || !mn(e, f, p, r.size)) continue;
    const y = i.find((g) => e.task[g] !== Ie && (e.carryRes[g] === Zs || e.task[g] === Nt)) ?? i.find((g) => e.task[g] !== Ie) ?? i[0];
    return e.issue({ type: "build", player: t, ids: [y], key: s, tx: f, tz: p }), y;
  }
  return -1;
}
function mn(e, t, s, a) {
  for (let i = s - 1; i <= s + a; i++) for (let o = t - 1; o <= t + a; o++) {
    const n = i * e.size + o;
    if (e.bAt[n]) return !1;
  }
  return !0;
}
function xl(e, t, s, a) {
  return gn(e, t, s, a, (i) => e.map.tree[i] > 0);
}
function gn(e, t, s, a, i) {
  const o = Et[Vt.depot];
  if (!e.canAfford(t, o.cost) || !a.length) return -1;
  const n = e.x[s] >> 8, r = e.z[s] >> 8, l = e.size;
  let h = Os;
  if (!Os.some(([c, u]) => {
    const d = n + c, f = r + u;
    return d >= 0 && f >= 0 && d < l && f < l && i(f * l + d);
  })) {
    let c = -1, u = 1 / 0;
    for (let d = 0; d < l * l; d += 2) if (i(d)) {
      const f = d % l, p = (d - f) / l, y = (f - n) ** 2 + (p - r) ** 2;
      y < u && (u = y, c = d);
    }
    if (c < 0) return -1;
    h = [[c % l - n, Math.floor(c / l) - r]];
  }
  for (const [c, u] of h) {
    const d = n + c, f = r + u;
    if (!(c * c + u * u < 36) && !(d < 2 || f < 2 || d >= l - 3 || f >= l - 3) && i(f * l + d))
      for (const [p, y] of [[2, 0], [-3, 0], [0, 2], [0, -3], [2, 2], [-3, -3], [2, -3], [-3, 2]]) {
        const g = d + p, x = f + y;
        if (e.canPlace(t, "depot", g, x) && mn(e, g, x, 2)) {
          const M = a.find((v) => e.task[v] !== Ie) ?? a[0];
          return e.issue({ type: "build", player: t, ids: [M], key: "depot", tx: g, tz: x }), M;
        }
      }
  }
  return -1;
}
function to(e, t, s, a, i) {
  const o = e.size, n = e.x[i] >> 8, r = e.z[i] >> 8;
  if (a === 0) {
    for (let M = 0; M < e.top; M++) if (e.isBuilding(M) && e.owner[M] === t && e.done[M] && e.bdef(M).key === "farm") {
      let v = !1;
      for (let w = 0; w < e.top; w++) if (e.isUnit(w) && e.task[w] === Ft && e.tgt[w] === M && !e.tgtTile[w]) {
        v = !0;
        break;
      }
      if (!v)
        return e.issue({ type: "work", player: t, ids: [s], target: M }), !0;
    }
    let f = 0;
    for (let M = 0; M < e.top; M++) e.isUnit(M) && e.owner[M] === t && e.task[M] === Ft && e.tgtTile[M] && e.resKind[e.tgt[M]] === Jt && f++;
    if (e.season !== 3 && f < 5) for (const [M, v] of Os) {
      if (M * M + v * v > 196) break;
      const w = n + M, A = (r + v) * o + w;
      if (A >= 0 && A < o * o && e.resKind[A] === Jt && e.resAmt[A] > 0)
        return e.issue({ type: "gather", player: t, ids: [s], k: A }), !0;
    }
    let p = -1, y = (25 * V) ** 2;
    for (let M = 0; M < e.top; M++) if (e.alive[M] && e.kind[M] === gt && e.work[M] > 0) {
      let v = 0;
      for (let T = 0; T < e.top; T++) e.isUnit(T) && e.task[T] === Ft && e.tgt[T] === M && !e.tgtTile[T] && v++;
      const w = e.x[M] - e.x[i], B = e.z[M] - e.z[i], A = w * w + B * B;
      v < 4 && A < y && (y = A, p = M);
    }
    if (p >= 0)
      return e.issue({ type: "work", player: t, ids: [s], target: p }), !0;
    let g = -1, x = (28 * V) ** 2;
    for (let M = 0; M < e.top; M++) if (e.isAnimal(M) && G[e.kind[M]].animal.food > 0 && G[e.kind[M]].key !== "aurochs") {
      const v = e.x[M] - e.x[i], w = e.z[M] - e.z[i], B = v * v + w * w;
      B < x && (x = B, g = M);
    }
    return g >= 0 ? (e.issue({ type: "attack", player: t, ids: [s], target: g }), !0) : !1;
  }
  if (a === 3 && e.players[t].era < 2) return !1;
  const l = (f) => a === 1 ? e.map.tree[f] > 0 : a === 2 ? e.resKind[f] === Oe : e.resKind[f] === be;
  let h = n, c = r;
  if (a === 1) {
    for (let f = 0; f < e.top; f++) if (e.isBuilding(f) && e.owner[f] === t && e.bdef(f).key === "depot") {
      h = e.x[f] >> 8, c = e.z[f] >> 8;
      break;
    }
  }
  for (const [f, p] of Os) {
    const y = h + f, g = c + p;
    if (y < 0 || g < 0 || y >= o || g >= o) continue;
    const x = g * o + y;
    if (l(x) && e.open(x))
      return e.issue({ type: "gather", player: t, ids: [s], k: x }), !0;
  }
  let u = -1, d = 1 / 0;
  for (let f = 0; f < o * o; f += 3) if (l(f) && e.open(f)) {
    const p = f % o, y = (f - p) / o, g = (p - h) ** 2 + (y - c) ** 2;
    g < d && (d = g, u = f);
  }
  return u >= 0 ? (e.issue({ type: "gather", player: t, ids: [s], k: u }), !0) : !1;
}
function Ml(e) {
  if (e.tick + 300 === e.barbNext && !e.barbWarned) {
    e.barbWarned = !0;
    for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.owner[i] === Ee) {
      const o = eo(e, i);
      o >= 0 && e.events.push({ t: "msg", player: e.owner[o], key: "raidSoon", x: e.x[i], z: e.z[i] });
    }
  }
  if (e.tick !== e.barbNext) return;
  e.barbWarned = !1;
  const t = e.tick / xe, a = Math.max(...e.players.map((i) => i.era)) >= 2 ? Math.min(7, 3 + Math.floor(t / 15)) : Math.min(5, 2 + Math.floor(t / 15));
  for (let i = 0; i < e.top; i++) {
    if (!e.isBuilding(i) || e.owner[i] !== Ee) continue;
    const o = eo(e, i);
    if (o < 0) continue;
    const n = [];
    for (let r = 0; r < a; r++) {
      const l = e.nearestFree((e.x[i] >> 8) + r % 3 - 1, (e.z[i] >> 8) + 3 + Math.floor(r / 3));
      l < 0 || n.push(e.spawnUnit(Ee, "barbarian", l % e.size + 0.5, Math.floor(l / e.size) + 0.5));
    }
    for (const r of n)
      e.task[r] = ms, e.amx[r] = e.x[o], e.amz[r] = e.z[o], e.rallyX[r] = e.x[o], e.rallyZ[r] = e.z[o];
    e.orderMove(n, e.x[o], e.z[o]);
  }
  e.barbNext = e.tick + (8 + e.rng.int(5)) * xe;
}
function eo(e, t) {
  let s = -1, a = 1 / 0;
  for (let i = 0; i < e.top; i++) if (e.isBuilding(i) && e.bdef(i).key === "center" && e.owner[i] >= 0 && e.owner[i] < e.players.length && !e.players[e.owner[i]].defeated) {
    const o = e.x[i] - e.x[t], n = e.z[i] - e.z[t], r = o * o + n * n;
    r < a && (a = r, s = i);
  }
  return s;
}
const st = 4096, Pt = 0, Wt = 1, Nt = 0, Ft = 1, Ie = 2, Rt = 3, ms = 4, ze = 0, bn = 1, oa = 2, us = 0, Zs = 1, Ea = 2, Ia = 3, la = [1, -1, 0, 0, 1, 1, -1, -1], ca = [0, 0, 1, -1, 1, -1, 1, -1], so = [10, 10, 10, 10, 14, 14, 14, 14], zl = 4294967295;
class Al {
  constructor(t, s) {
    m(this, "dist");
    this.goal = t, this.dist = new Uint32Array(s).fill(zl);
  }
}
const $s = [];
for (let e = -14; e <= 14; e++) for (let t = -14; t <= 14; t++) t * t + e * e <= 196 && $s.push([t, e]);
$s.sort((e, t) => e[0] * e[0] + e[1] * e[1] - (t[0] * t[0] + t[1] * t[1]) || e[1] - t[1] || e[0] - t[0]);
const Os = $s, ao = /* @__PURE__ */ new Map();
function Tl(e) {
  let t = ao.get(e);
  if (t) return t;
  const s = [];
  for (let a = -e; a <= e; a++) for (let i = -e; i <= e; i++) i * i + a * a <= e * e + e && s.push(i, a);
  return t = new Int16Array(s), ao.set(e, t), t;
}
class yn {
  constructor(t, s, a = {}) {
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
    this.map = sn(t, s, a.mapa ?? Ni), this.size = this.map.size, this.rng = new Jo(t), this.difficulty = a.difficulty ?? 1;
    const i = this.size * this.size;
    this.blocked = new Uint8Array(i), this.bAt = new Int16Array(i), this.resKind = new Uint8Array(i), this.resAmt = new Int32Array(i);
    for (let n = 0; n < i; n++) {
      const r = this.map.terrain[n];
      (Ys(r) || this.map.tree[n]) && (this.blocked[n] = 1), this.map.tree[n] && (this.resAmt[n] = this.map.wood[n] * 100);
    }
    for (const n of this.map.res) {
      const r = n.z * this.size + n.x;
      this.resKind[r] = n.kind, this.resAmt[r] = n.amount * 100, this.blocked[r] = 1;
    }
    this.hs = this.size >> 1, this.hashHead = new Int32Array(this.hs * this.hs), this.aStamp = new Int32Array(i), this.aG = new Int32Array(i), this.aFrom = new Int32Array(i), this.aClosed = new Int32Array(i), this.aHeap = new Float64Array(i * 2);
    const o = a.humans ?? 1;
    this.map.starts.forEach((n, r) => {
      this.players.push({ id: r, color: Or[r], start: { x: n.x, z: n.z }, ai: r >= o, era: 0, res: { food: 2e4, wood: 15e3, stone: 5e3, metal: 0, coins: 0 }, aging: 0, agingB: -1, hunger: !1, defeated: !1, lastAlert: -9999, tech: 0 }), this.vis.push(new Uint8Array(i)), this.explored.push(new Uint8Array(i)), this.spawnBuilding(r, "center", n.x - 2, n.z - 2, !0);
      for (let l = 0; l < 4; l++) this.spawnUnit(r, "villager", n.x - n.ux * 4 + (l - 1.5) * 1.1, n.z - n.uz * 4 + l % 2 * 0.8);
      this.spawnUnit(r, "dog", n.x - n.ux * 3 - n.uz * 3, n.z - n.uz * 3 + n.ux * 3), this.ai.push({ next: 20 + r * 3, attackAt: 0, phase: 0, houseCd: 0 });
    }), this.map.herds.forEach((n, r) => {
      for (const [l, h] of n.spots) {
        const c = this.spawnUnit(kt, n.kind, l + 0.5, h + 0.5);
        this.herd[c] = r, this.tmr[c] = c * 7 % 60;
      }
    });
    for (const n of this.map.camps) this.spawnBuilding(Ee, "camp", n.x - 2, n.z - 2, !0);
    if (this.barbNext = 12 * xe, a.testUnits) {
      const n = this.map.starts[0];
      let r = 0;
      for (let l = 0; l < 40 && r < a.testUnits; l++) for (let h = 0; h < 20 && r < a.testUnits; h++) {
        const c = n.x - n.ux * 9 + (h - 10) * 0.9, u = n.z - n.uz * 9 - l * 0.9 * (n.uz >= 0 ? 1 : -1);
        this.blockedAt(Math.round(c * V), Math.round(u * V)) || (this.spawnUnit(0, "warrior", c, u), r++);
      }
    }
    this.updateFog();
  }
  // teto de busca de caminho por tick
  /** o tile tem algum vizinho livre (dá para chegar perto)? */
  open(t) {
    const s = this.size, a = t % s, i = (t - a) / s;
    for (let o = 0; o < 8; o++) {
      const n = a + la[o], r = i + ca[o];
      if (n >= 0 && r >= 0 && n < s && r < s && !this.blocked[r * s + n]) return !0;
    }
    return !1;
  }
  // ── definições ──
  udef(t) {
    return G[this.kind[t]];
  }
  bdef(t) {
    return Et[this.kind[t] - bt];
  }
  isUnit(t) {
    return this.alive[t] === 1 && this.kind[t] < gt;
  }
  isBuilding(t) {
    return this.alive[t] === 1 && this.kind[t] >= bt;
  }
  isAnimal(t) {
    return this.isUnit(t) && this.owner[t] === kt;
  }
  hostile(t, s) {
    return !(t === s || t === kt || s === kt);
  }
  // ── pesquisas e números de cada unidade ──
  hasTech(t, s) {
    const a = this.players[t];
    return !!a && (a.tech & 1 << Sa[s]) !== 0;
  }
  /** a pesquisa já está na fila de alguma construção do jogador? */
  techQueued(t, s) {
    for (let a = 0; a < this.top; a++) if (this.isBuilding(a) && this.owner[a] === t && this.queue[a].includes(ie + s)) return !0;
    return !1;
  }
  soldier(t) {
    const s = G[this.kind[t]].cls;
    return s !== "villager" && s !== "animal" && this.owner[t] >= 0 && this.owner[t] < this.players.length;
  }
  /** ataque com as pesquisas (Bronze +1, Ferro +1) */
  atkOf(t) {
    const s = G[this.kind[t]];
    if (!this.soldier(t)) return s.atk;
    const a = this.owner[t];
    return s.atk + (this.hasTech(a, "bronze") ? 1 : 0) + (this.hasTech(a, "iron") ? 1 : 0);
  }
  /** armadura com as pesquisas (Ferro +1) */
  armorOf(t) {
    return G[this.kind[t]].armor + (this.soldier(t) && this.hasTech(this.owner[t], "iron") ? 1 : 0);
  }
  /** quanto um coletor leva de cada vez (Roda: 15) */
  carryCap(t) {
    return (Ir + (this.hasTech(this.owner[t], "wheel") ? 5 : 0)) * 100;
  }
  /** a feira: nos primeiros 30 s de cada estação (troca melhor no mercado) */
  get fair() {
    return this.tick >= 3 * xe && this.tick % (3 * xe) < Er;
  }
  // ── entidades ──
  alloc() {
    for (let t = 0; t < st; t++) if (!this.alive[t])
      return t >= this.top && (this.top = t + 1), t;
    throw new Error("entidades esgotadas");
  }
  reset(t) {
    this.state[t] = Pt, this.task[t] = Nt, this.tgt[t] = -1, this.tgtTile[t] = 0, this.phase[t] = 0, this.carry[t] = 0, this.cd[t] = 0, this.work[t] = 0, this.done[t] = 0, this.sub[t] = 0, this.aggro[t] = 0, this.tmr[t] = 0, this.herd[t] = -1, this.fast[t] = 0, this.fails[t] = 0, this.frac[t] = 0, this.field[t] = null, this.path[t] = null, this.queue[t] = [], this.rallyX[t] = -1, this.rallyZ[t] = -1, this.stuck[t] = 0, this.dropB[t] = -1, this.ignoreT[t] = -1, this.foodMode[t] = 0;
  }
  spawnUnit(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = ct[s], this.owner[o] = t, this.x[o] = this.px[o] = Math.round(a * V), this.z[o] = this.pz[o] = Math.round(i * V), this.hp[o] = G[ct[s]].hp, o;
  }
  spawnCarcass(t, s, a, i) {
    const o = this.alloc();
    return this.reset(o), this.alive[o] = 1, this.kind[o] = gt, this.owner[o] = kt, this.sub[o] = t, this.x[o] = this.px[o] = s, this.z[o] = this.pz[o] = a, this.work[o] = i * 100, this.hp[o] = 1, o;
  }
  /** (tx, tz) = canto do terreno ocupado */
  spawnBuilding(t, s, a, i, o) {
    const n = this.alloc();
    this.reset(n);
    const r = Et[Vt[s]];
    this.alive[n] = 1, this.kind[n] = bt + Vt[s], this.owner[n] = t, this.x[n] = this.px[n] = a * V + r.size * 128, this.z[n] = this.pz[n] = i * V + r.size * 128, this.done[n] = o ? 1 : 0, this.hp[n] = o ? r.hp : Math.max(1, r.hp / 10 | 0);
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
    if (this.kind[t] >= bt) {
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
    const o = Et[Vt[s]], n = this.size;
    if (a < 1 || i < 1 || a + o.size >= n - 1 || i + o.size >= n - 1) return !1;
    for (let r = 0; r < o.size; r++) for (let l = 0; l < o.size; l++) {
      const h = (i + r) * n + a + l, c = this.map.terrain[h];
      if (this.blocked[h] || this.bAt[h] || Ys(c) || c === hs || !this.explored[t][h]) return !1;
    }
    for (let r = 0; r < this.top; r++) if (this.isUnit(r)) {
      const l = this.x[r] >> 8, h = this.z[r] >> 8;
      if (l >= a && l < a + o.size && h >= i && h < i + o.size && this.state[r] === Pt && this.owner[r] !== t) return !1;
    }
    return !0;
  }
  // ── economia ──
  canAfford(t, s) {
    const a = this.players[t].res;
    return rs.every((i) => a[i] >= (s[i] ?? 0) * 100);
  }
  pay(t, s) {
    const a = this.players[t].res;
    for (const i of rs) a[i] -= (s[i] ?? 0) * 100;
  }
  refund(t, s) {
    const a = this.players[t].res;
    for (const i of rs) a[i] += (s[i] ?? 0) * 100;
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
    return Math.min(Xs[s], a);
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
      i = c * V, o = u * V, n = i + V, r = o + V;
    } else if (this.kind[s] >= bt) {
      const [c, u, d] = this.footprint(s);
      i = c * V, o = u * V, n = i + d * V, r = o + d * V;
    } else {
      const c = this.x[s] - this.x[t], u = this.z[s] - this.z[t];
      return Math.max(0, ns(c * c + u * u) - (this.kind[s] < gt ? Math.round(G[this.kind[s]].radius * V) : 64));
    }
    const l = Math.max(i - this.x[t], 0, this.x[t] - n), h = Math.max(o - this.z[t], 0, this.z[t] - r);
    return ns(l * l + h * h);
  }
  // ── caminho ──
  nearestFree(t, s) {
    for (const [a, i] of $s) {
      const o = t + a, n = s + i;
      if (o >= 0 && n >= 0 && o < this.size && n < this.size && !this.blocked[n * this.size + o]) return n * this.size + o;
    }
    return -1;
  }
  /** A* até qualquer tile do retângulo [gx0..gx1]×[gz0..gz1]; devolve a lista de tiles (sem o inicial) ou null */
  findPath(t, s, a, i, o, n = 16e3) {
    const r = this.size, l = this.blocked, h = ++this.aId, c = this.aG, u = this.aFrom, d = this.aStamp, f = this.aClosed, p = this.aHeap;
    this.lastPartial = !1;
    const y = (F, E) => {
      const _ = Math.max(s - F, 0, F - i), q = Math.max(a - E, 0, E - o);
      return 15 * Math.max(_, q) + 6 * Math.min(_, q);
    }, g = t % r, x = (t - g) / r;
    if (g >= s && g <= i && x >= a && x <= o) return [];
    let M = 0;
    const v = (F) => {
      let E = M++;
      for (p[E] = F; E > 0; ) {
        const _ = E - 1 >> 1;
        if (p[_] <= p[E]) break;
        const q = p[_];
        p[_] = p[E], p[E] = q, E = _;
      }
    }, w = () => {
      const F = p[0];
      p[0] = p[--M];
      let E = 0;
      for (; ; ) {
        const _ = E * 2 + 1, q = _ + 1;
        let Y = E;
        if (_ < M && p[_] < p[Y] && (Y = _), q < M && p[q] < p[Y] && (Y = q), Y === E) break;
        const j = p[Y];
        p[Y] = p[E], p[E] = j, E = Y;
      }
      return F;
    };
    d[t] = h, c[t] = 0, u[t] = -1, v(y(g, x) * 65536 + t);
    let B = t, A = y(g, x), T = -1, S = 0;
    if (this.nodesTick > 6e4)
      return this.overBudget = !0, this.lastPartial = !0, null;
    for (; M > 0 && S < n; ) {
      const F = w(), E = F % 65536;
      if (f[E] === h) continue;
      f[E] = h, S++;
      const _ = E % r, q = (E - _) / r, Y = y(_, q);
      if (Y === 0) {
        T = E;
        break;
      }
      Y < A && (A = Y, B = E);
      for (let j = 0; j < 8; j++) {
        const Z = _ + la[j], J = q + ca[j];
        if (Z < 0 || J < 0 || Z >= r || J >= r) continue;
        const ut = J * r + Z;
        if (l[ut] || f[ut] === h || j >= 4 && (l[q * r + Z] || l[J * r + _])) continue;
        const ot = c[E] + so[j];
        (d[ut] !== h || ot < c[ut]) && (d[ut] = h, c[ut] = ot, u[ut] = E, v((ot + y(Z, J)) * 65536 + ut));
      }
    }
    this.lastPartial = T < 0, this.nodesTick += S;
    const $ = T >= 0 ? T : B;
    if ($ === t) return T >= 0 ? [] : null;
    const O = [];
    for (let F = $; F !== t && F >= 0; F = u[F]) O.push(F);
    O.reverse();
    const z = [];
    let P = t;
    for (let F = 0; F < O.length; ) {
      let E = Math.min(O.length - 1, F + 12);
      for (; E > F && !this.clear(P, O[E]); ) E--;
      z.push(O[E]), P = O[E], F = E + 1;
    }
    return z;
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
    for (let g = Math.max(0, a); g <= Math.min(c - 1, o) && !u; g++) for (let x = Math.max(0, s); x <= Math.min(c - 1, i); x++) if (!this.blocked[g * c + x]) {
      u = !0;
      break;
    }
    if (!u)
      return this.lastPartial = !0, this.state[t] = Pt, !1;
    const d = this.findPath(h, s, a, i, o, l);
    if (this.field[t] = null, !d)
      return this.state[t] = Pt, !1;
    this.path[t] = d, this.pathI[t] = 0;
    const f = d.length ? d[d.length - 1] : h, p = f % this.size, y = (f - p) / this.size;
    return this.slotX[t] = n ?? p * V + 128, this.slotZ[t] = r ?? y * V + 128, this.state[t] = Wt, this.stuck[t] = 0, this.best[t] = 2147483647, !0;
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
    return i < 0 ? !1 : (this.field[t] = this.flowTo(i), this.path[t] = null, this.lastPartial = !1, this.slotX[t] = i % this.size * V + 128, this.slotZ[t] = Math.floor(i / this.size) * V + 128, this.state[t] = Wt, this.stuck[t] = 0, this.best[t] = 2147483647, !0);
  }
  far(t, s, a) {
    const i = s - this.x[t], o = a - this.z[t];
    return i * i + o * o > (22 * V) ** 2;
  }
  goNear(t, s, a) {
    if (!a && this.far(t, this.x[s], this.z[s])) return this.goFar(t, this.x[s], this.z[s]);
    if (a) {
      const n = s % this.size, r = (s - n) / this.size;
      return this.goTo(t, n - 1, r - 1, n + 1, r + 1, void 0, void 0, 6e3);
    }
    if (this.kind[s] >= bt) {
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
    this.goTo(t, o, n, o, n, r ? s : o * V + 128, r ? a : n * V + 128);
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
    if (!(!s || s.defeated))
      switch (t.type) {
        case "move":
        case "amove": {
          const a = this.own(t);
          for (const i of a)
            this.task[i] = t.type === "amove" ? ms : Nt, this.amx[i] = t.x, this.amz[i] = t.z, this.rallyX[i] = t.type === "amove" ? t.x : -1, this.rallyZ[i] = t.type === "amove" ? t.z : -1, this.tgt[i] = -1, this.aggro[i] = 0, this.fails[i] = 0;
          this.orderMove(a, t.x, t.z);
          break;
        }
        case "stop":
          for (const a of this.own(t))
            this.task[a] = Nt, this.state[a] = Pt, this.path[a] = null, this.field[a] = null, this.foodMode[a] = 0;
          break;
        case "food":
          for (const a of this.own(t)) this.kind[a] === ct.villager && (this.foodMode[a] = t.on ? 2 : 0);
          break;
        // 2 = acabou de ligar: as regras escolhem a comida já no próximo passo
        case "gather": {
          if (t.k < 0 || t.k >= this.size * this.size || !this.map.tree[t.k] && !this.resKind[t.k] || this.resKind[t.k] === be && s.era < 2) return;
          const a = this.resKind[t.k] === Jt;
          for (const i of this.own(t)) this.kind[i] === ct.villager && (this.task[i] = Ft, this.tgt[i] = t.k, this.tgtTile[i] = 1, this.phase[i] = ze, this.fails[i] = 0, a || (this.foodMode[i] = 0), this.goNear(i, t.k, !0));
          break;
        }
        case "work":
        case "attack": {
          const a = t.target;
          if (!this.alive[a]) return;
          for (const i of this.own(t)) {
            const o = this.kind[i] === ct.villager;
            if (this.kind[a] >= bt && this.owner[a] === t.player) {
              if (!o) continue;
              this.done[a] ? this.bdef(a).key === "farm" ? (this.task[i] = Ft, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = ze, this.goNear(i, a, !1)) : this.bdef(a).drop && this.carry[i] > 0 && (this.task[i] = Ft, this.phase[i] = oa, this.tgt[i] = -1, this.goNear(i, a, !1)) : (this.task[i] = Ie, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
              continue;
            }
            if (this.kind[a] === gt) {
              o && (this.task[i] = Ft, this.tgt[i] = a, this.tgtTile[i] = 0, this.phase[i] = ze, this.goNear(i, a, !1));
              continue;
            }
            G[this.kind[i]].siege && this.kind[a] < bt || (this.owner[a] === kt || this.hostile(t.player, this.owner[a])) && (this.task[i] = Rt, this.tgt[i] = a, this.tgtTile[i] = 0, this.goNear(i, a, !1));
          }
          break;
        }
        case "build": {
          const a = this.own(t).filter((n) => this.kind[n] === ct.villager), i = Et[Vt[t.key]];
          if (!a.length || !i?.buildable || i.era > s.era || !this.canAfford(t.player, i.cost) || !this.canPlace(t.player, t.key, t.tx, t.tz)) return;
          this.pay(t.player, i.cost);
          const o = this.spawnBuilding(t.player, t.key, t.tx, t.tz, !1);
          for (const n of a)
            this.task[n] = Ie, this.tgt[n] = o, this.tgtTile[n] = 0, this.goNear(n, o, !1);
          break;
        }
        case "train": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !Ri(this.bdef(a), s.era).includes(t.key) || this.queue[a].length >= 5) return;
          const o = G[ct[t.key]];
          if (!this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(ct[t.key]);
          break;
        }
        case "cancel": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.queue[a].length) return;
          const i = this.queue[a].pop();
          this.refund(t.player, i >= ie ? Ke[i - ie].cost : G[i].cost), this.queue[a].length || (this.work[a] = 0);
          break;
        }
        case "ageup": {
          const a = t.building, i = ls[s.era];
          if (!i || s.era >= Zo || s.aging || !this.isBuilding(a) || this.owner[a] !== t.player || this.bdef(a).key !== "center" || this.eraBuildingTypes(t.player) < 2 || !this.canAfford(t.player, i.cost)) return;
          this.pay(t.player, i.cost), s.aging = i.time * 10, s.agingB = a;
          break;
        }
        case "rally":
          this.isBuilding(t.building) && this.owner[t.building] === t.player && (this.rallyX[t.building] = t.x, this.rallyZ[t.building] = t.z);
          break;
        case "research": {
          const a = t.building, i = Sa[t.key], o = Ke[i];
          if (!o || !this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !(this.bdef(a).research ?? []).includes(t.key) || s.era < 2 || this.hasTech(t.player, t.key) || this.techQueued(t.player, i) || o.needs && !this.hasTech(t.player, o.needs) || this.queue[a].length >= 5 || !this.canAfford(t.player, o.cost)) return;
          this.pay(t.player, o.cost), this.queue[a].push(ie + i);
          break;
        }
        case "trade": {
          const a = t.building;
          if (!this.isBuilding(a) || this.owner[a] !== t.player || !this.done[a] || !this.bdef(a).market || t.give === t.get || !Xe.includes(t.give) || !Xe.includes(t.get) || s.res[t.give] < Se.give * 100) return;
          s.res[t.give] -= Se.give * 100, s.res[t.get] += (this.fair ? Se.fair : Se.get) * 100;
          break;
        }
        case "wall": {
          const a = this.own(t).filter((n) => this.kind[n] === ct.villager), i = Et[Vt.wall];
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
            this.task[n] = Ie, this.tgt[n] = r, this.tgtTile[n] = 0, this.goNear(n, r, !1);
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
    const n = this.blocked[(a >> 8) * i + (s >> 8)], r = n ? o % i * V + 128 : s, l = n ? Math.floor(o / i) * V + 128 : a;
    t.sort((u, d) => {
      const f = (this.x[u] - r) ** 2 + (this.z[u] - l) ** 2, p = (this.x[d] - r) ** 2 + (this.z[d] - l) ** 2;
      return f - p || u - d;
    });
    const h = this.buildFlow(o, t);
    let c = 0;
    for (const u of t) {
      let d = r, f = l;
      for (; c < $s.length; ) {
        const [p, y] = $s[c++], g = r + p * 218, x = l + y * 218;
        if (!this.blockedAt(g, x)) {
          d = g, f = x;
          break;
        }
      }
      this.slotX[u] = d, this.slotZ[u] = f, this.state[u] = Wt, this.field[u] = h, this.path[u] = null, this.stuck[u] = 0, this.best[u] = 2147483647;
    }
  }
  buildFlow(t, s) {
    const a = this.size, i = a * a, o = new Al(t, i), n = o.dist, r = this.blocked, l = /* @__PURE__ */ new Set();
    for (const p of s) l.add((this.z[p] >> 8) * a + (this.x[p] >> 8));
    const h = this.aHeap;
    let c = 0;
    const u = (p) => {
      let y = c++;
      for (h[y] = p; y > 0; ) {
        const g = y - 1 >> 1;
        if (h[g] <= h[y]) break;
        const x = h[g];
        h[g] = h[y], h[y] = x, y = g;
      }
    }, d = () => {
      const p = h[0];
      h[0] = h[--c];
      let y = 0;
      for (; ; ) {
        const g = y * 2 + 1, x = g + 1;
        let M = y;
        if (g < c && h[g] < h[M] && (M = g), x < c && h[x] < h[M] && (M = x), M === y) break;
        const v = h[M];
        h[M] = h[y], h[y] = v, y = M;
      }
      return p;
    };
    n[t] = 0, u(t);
    let f = s.length ? l.size : -1;
    for (; c > 0; ) {
      const p = d(), y = p % 65536, g = (p - y) / 65536;
      if (g > n[y]) continue;
      if (f > 0 && l.has(y) && (l.delete(y), --f <= 0 && g > 400))
        break;
      const x = y % a, M = (y - x) / a;
      for (let v = 0; v < 8; v++) {
        const w = x + la[v], B = M + ca[v];
        if (w < 0 || B < 0 || w >= a || B >= a) continue;
        const A = B * a + w;
        if (r[A] || v >= 4 && (r[M * a + w] || r[B * a + x])) continue;
        const T = g + so[v];
        T < n[A] && (n[A] = T, u(T * 65536 + A));
      }
    }
    return o;
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
    this.buildHash(), gl(this), Fr(this), this.moveUnits(), this.separate(), this.tick % 2 === 0 && this.updateFog(), this.tick++;
  }
  speedOf(t) {
    const s = G[this.kind[t]];
    return Math.round((this.fast[t] && s.animal ? s.animal.run : s.speed) * V / 10);
  }
  moveUnits() {
    const t = this.size;
    for (let s = 0; s < this.top; s++) {
      if (!this.alive[s] || this.state[s] !== Wt || this.kind[s] >= gt) continue;
      const a = this.x[s], i = this.z[s], o = this.speedOf(s);
      let n = this.slotX[s], r = this.slotZ[s];
      const l = this.path[s];
      if (l && this.pathI[s] < l.length) {
        const w = l[this.pathI[s]], B = w % t * V + 128, A = Math.floor(w / t) * V + 128;
        Math.abs(B - a) + Math.abs(A - i) < 110 && this.pathI[s] < l.length - 1 && this.pathI[s]++, (this.pathI[s] < l.length - 1 || Math.abs(B - a) + Math.abs(A - i) >= 110) && (n = B, r = A), this.pathI[s] === l.length - 1 && Math.abs(B - a) + Math.abs(A - i) < 110 && (this.path[s] = null, n = this.slotX[s], r = this.slotZ[s]);
      }
      const h = this.slotX[s] - a, c = this.slotZ[s] - i, u = h * h + c * c;
      if (!this.path[s] && u <= o * o) {
        this.x[s] = this.slotX[s], this.z[s] = this.slotZ[s], this.state[s] = Pt, this.field[s] = null;
        continue;
      }
      const d = this.field[s];
      if (d && !this.path[s] && u > 640 * 640) {
        const w = a >> 8, B = i >> 8, A = B * t + w;
        let T = d.dist[A], S = -1, $ = -1;
        for (let O = 0; O < 8; O++) {
          const z = w + la[O], P = B + ca[O];
          if (z < 0 || P < 0 || z >= t || P >= t) continue;
          const F = P * t + z;
          this.blocked[F] || O >= 4 && (this.blocked[B * t + z] || this.blocked[P * t + w]) || d.dist[F] < T && (T = d.dist[F], S = z, $ = P);
        }
        S >= 0 && (n = S * V + 128, r = $ * V + 128);
      }
      const f = n - a, p = r - i, y = ns(f * f + p * p);
      if (y === 0) {
        this.state[s] = Pt;
        continue;
      }
      const g = Math.min(o, y);
      let x = a + _e(f * g, y), M = i + _e(p * g, y);
      this.blockedAt(x, M) && (this.blockedAt(x, i) ? this.blockedAt(a, M) ? (x = a, M = i) : x = a : M = i), this.x[s] = x, this.z[s] = M;
      const v = Math.abs(h) + Math.abs(c);
      v + 24 < this.best[s] ? (this.best[s] = v, this.stuck[s] = 0) : this.stuck[s] = Math.min(255, this.stuck[s] + 1), (this.stuck[s] > 30 || this.stuck[s] > 10 && v < 3 * V && !this.path[s]) && (this.state[s] = Pt, this.field[s] = null, this.path[s] = null);
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
    const o = this.hs, n = Math.max(0, (t >> 9) - Math.ceil(a / 2)), r = Math.min(o - 1, (t >> 9) + Math.ceil(a / 2)), l = Math.max(0, (s >> 9) - Math.ceil(a / 2)), h = Math.min(o - 1, (s >> 9) + Math.ceil(a / 2)), c = a * V * (a * V);
    for (let u = l; u <= h; u++) for (let d = n; d <= r; d++) for (let f = this.hashHead[u * o + d]; f !== -1; f = this.hashNext[f]) {
      const p = this.x[f] - t, y = this.z[f] - s;
      p * p + y * y <= c && this.alive[f] && i(f);
    }
  }
  separate() {
    const t = this.hs, s = this.hashHead, a = this.hashNext;
    this.buildHash();
    for (let i = 0; i < this.top; i++)
      this.pushX[i] = 0, this.pushZ[i] = 0;
    for (let i = 0; i < this.top; i++) {
      if (!this.isUnit(i)) continue;
      const o = Math.round(G[this.kind[i]].radius * V), n = this.x[i] >> 9, r = this.z[i] >> 9;
      for (let l = -1; l <= 1; l++) for (let h = -1; h <= 1; h++) {
        const c = n + h, u = r + l;
        if (!(c < 0 || u < 0 || c >= t || u >= t))
          for (let d = s[u * t + c]; d !== -1; d = a[d]) {
            if (d <= i || !this.isUnit(d)) continue;
            const f = Math.round(G[this.kind[d]].radius * V), p = o + f;
            let y = this.x[d] - this.x[i], g = this.z[d] - this.z[i];
            if (y >= p || y <= -p || g >= p || g <= -p) continue;
            let x = y * y + g * g;
            if (x >= p * p) continue;
            x === 0 && (y = 1 + i % 3, g = 1 + d % 3, x = y * y + g * g);
            const M = ns(x) || 1, v = p - M >> 1, w = _e(y * v, M), B = _e(g * v, M), A = this.state[i] === Wt ? 1 : 2, T = this.state[d] === Wt ? 1 : 2;
            this.pushX[i] -= _e(w * A, 2), this.pushZ[i] -= _e(B * A, 2), this.pushX[d] += _e(w * T, 2), this.pushZ[d] += _e(B * T, 2);
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
        if (!this.alive[o] || this.owner[o] !== s || this.kind[o] === gt) continue;
        const n = this.kind[o] >= bt ? this.bdef(o).sight : G[this.kind[o]].sight, r = Tl(n), l = this.x[o] >> 8, h = this.z[o] >> 8;
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
    return Math.floor(this.tick / xe) % 12;
  }
  get season() {
    return Math.floor(this.month / 3);
  }
  get year() {
    return Math.floor(this.tick / (xe * 12)) + 1;
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
    for (const a of this.players) for (const i of rs) s(a.res[i]);
    return t >>> 0;
  }
}
function jt(e, t) {
  try {
    window.QG?.evento?.(e, t);
  } catch {
  }
}
const io = /* @__PURE__ */ new Set();
function Ve(e, t) {
  const s = e + JSON.stringify(t);
  io.has(s) || (io.add(s), jt(e, t));
}
function Qa(e) {
  const t = e / 600;
  return t < 10 ? 10 : t < 20 ? 20 : t < 30 ? 30 : t < 45 ? 45 : t < 60 ? 60 : t < 90 ? 90 : 120;
}
function wl(e) {
  return e < 12 ? 10 : e < 25 ? 20 : e < 35 ? 30 : e < 50 ? 45 : 60;
}
const Sl = ["facil", "normal", "dificil"], $l = [5, 15, 30, 60, 90], pe = (e) => new Kt(e), It = {
  uTime: { value: 0 },
  uFow: { value: null },
  uFowOn: { value: 1 },
  uWorld: { value: 256 },
  uSnow: { value: 0 },
  uSnowColor: { value: pe("#f4f7fa") },
  uGrassA: { value: pe("#6fa84a") },
  uGrassB: { value: pe("#93c25a") },
  uLeaf: { value: 1 },
  uLeafColor: { value: pe("#6fae46") },
  uCrop: { value: 0.35 },
  uCropColor: { value: pe("#86c457") },
  uFlower: { value: 1 },
  uFruit: { value: 1 },
  uShallow: { value: pe("#5cb8b2") },
  uDeep: { value: pe("#1f6079") }
}, vn = `
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`, Cl = `
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`, kn = `
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
#endif`, El = `
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`, Il = `
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
#endif`, Ol = `
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`, Pl = `
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
function Ui(e, t = {}) {
  const s = { SNOW_K: "1.0", WIND_AMP: "0.0", WIND_BYH: "false", ...t };
  return e.defines = Object.assign(e.defines || {}, s), e.onBeforeCompile = (a) => {
    for (const i in It) a.uniforms[i] = It[i];
    a.vertexShader = a.vertexShader.replace("#include <common>", `#include <common>
` + vn).replace("#include <begin_vertex>", `#include <begin_vertex>
` + kn).replace("#include <project_vertex>", `#include <project_vertex>
` + El), a.fragmentShader = a.fragmentShader.replace("#include <common>", `#include <common>
` + Cl).replace("#include <color_fragment>", `#include <color_fragment>
` + Il).replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
` + Ol).replace("#include <opaque_fragment>", `#include <opaque_fragment>
` + Pl);
  }, e.customProgramCacheKey = () => JSON.stringify(s), e;
}
function xn(e) {
  const t = new ur({ depthPacking: fr });
  return t.defines = { WIND_AMP: "0.0", WIND_BYH: "false", ...e }, t.onBeforeCompile = (s) => {
    for (const a in It) s.uniforms[a] = It[a];
    s.vertexShader = s.vertexShader.replace("#include <common>", `#include <common>
` + vn).replace("#include <begin_vertex>", `#include <begin_vertex>
` + kn);
  }, t.customProgramCacheKey = () => "d" + JSON.stringify(e), t;
}
const Dt = (e = {}, t = {}) => Ui(new Aa({ flatShading: !0, ...e }), t);
function Bl(e) {
  const t = e.hn - 1;
  e.hstep;
  const s = e.size, a = new La(s, s, t, t).rotateX(-Math.PI / 2).translate(s / 2, 0, s / 2), i = a.attributes.position;
  for (let x = 0; x < i.count; x++) i.setY(x, e.heights[x]);
  const o = a.toNonIndexed(), n = o.attributes.position, r = n.count, l = new Float32Array(r * 3), h = new Float32Array(r * 2), c = { bed: [0.42, 0.4, 0.31], sand: [0.82, 0.74, 0.55], rock: [0.55, 0.53, 0.49], rock2: [0.64, 0.61, 0.55] }, u = (x) => new Kt().setRGB(x[0], x[1], x[2], jo), d = Object.fromEntries(Object.entries(c).map(([x, M]) => [x, u(M)])), f = new Tt(), p = new Tt(), y = new Tt();
  for (let x = 0; x < r; x += 3) {
    f.fromBufferAttribute(n, x), p.fromBufferAttribute(n, x + 1), y.fromBufferAttribute(n, x + 2);
    const M = (f.x + p.x + y.x) / 3, v = (f.y + p.y + y.y) / 3, w = (f.z + p.z + y.z) / 3, B = Math.min(s - 1, Math.max(0, Math.floor(M))), A = Math.min(s - 1, Math.max(0, Math.floor(w))), T = e.terrain[A * s + B], S = Math.abs(new Tt().subVectors(y, p).cross(new Tt().subVectors(f, p)).normalize().y), $ = 0.93 + (x * 2654435761 >>> 0) / 4294967296 * 0.14, O = os(M * 0.045, w * 0.045, 5, 2);
    let z = null, P = 0;
    if (v < -0.45) z = d.bed;
    else if (T === $a || T === hs || T === We || v < 0.5) z = d.sand;
    else if (T === je || S < 0.66) z = v > 6 ? d.rock2 : d.rock;
    else if (T === $e && v > Ua - 0.3) z = d.rock2;
    else {
      P = 1;
      const F = 0.86 + O * 0.3 - Math.min(1, Math.max(0, (v - 4) / 12)) * 0.08;
      z = new Kt(F, F, F);
    }
    for (let F = 0; F < 3; F++) {
      const E = (x + F) * 3;
      l[E] = z.r * $, l[E + 1] = z.g * $, l[E + 2] = z.b * $, h[(x + F) * 2] = P, h[(x + F) * 2 + 1] = O;
    }
  }
  o.setAttribute("color", new Me(l, 3)), o.setAttribute("aGrass", new Me(h, 2)), o.computeVertexNormals();
  const g = new Ne(o, Dt({ vertexColors: !0 }, { TERRAIN: "" }));
  return g.receiveShadow = !0, g.castShadow = !0, g;
}
function ql(e) {
  const t = e.size, s = Math.round(t / 1.6), a = new La(t, t, s, s).rotateX(-Math.PI / 2).translate(t / 2, 0, t / 2), i = a.attributes.position, o = new Float32Array(i.count);
  for (let r = 0; r < i.count; r++) o[r] = -dt(e, i.getX(r), i.getZ(r));
  a.setAttribute("aDepth", new Me(o, 1));
  const n = new Ne(a, Ui(new pr({ color: 16777215, specular: 10475744, shininess: 70, flatShading: !0, transparent: !0, depthWrite: !1 }), { WATER: "", NO_SNOW: "" }));
  return n.receiveShadow = !0, n.renderOrder = 2, n;
}
const ge = Math.PI * 2, oo = new Wo(), no = new Bi(), ro = new Tt(), lo = new Tt(), ha = new Tt(), da = new Kt();
function k(e = 0, t = 0, s = 0, a = 0, i = 1, o = 1, n = 1, r = 0, l = 0) {
  return oo.set(r, a, l, "YXZ"), no.setFromEuler(oo), ro.set(e, t, s), lo.set(i, o, n), new he().compose(ro, no, lo);
}
function Rl() {
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
  ], t = new Ze();
  return t.setAttribute("position", new ds(e, 3)), t;
}
const ua = {
  box: new oe(1, 1, 1).translate(0, 0.5, 0),
  cyl5: new Es(0.5, 0.5, 1, 5).translate(0, 0.5, 0),
  cyl8: new Es(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  cone4: new fi(0.5, 1, 4).translate(0, 0.5, 0),
  cone7: new fi(0.5, 1, 7).translate(0, 0.5, 0),
  ico: new Do(0.5, 0),
  dode: new mr(0.5, 0),
  prism: Rl()
}, Ws = {};
for (const e in ua) Ws[e] = ua[e].index ? ua[e].toNonIndexed() : ua[e];
class _i {
  constructor(t = Math.random) {
    m(this, "pos", []);
    m(this, "col", []);
    this.rand = t;
  }
  add(t, s, a, i = 0.06) {
    const o = Ws[t], n = o.attributes.position;
    da.set(s);
    const r = 1 + (this.rand() - 0.5) * i;
    for (let l = 0; l < n.count; l++)
      ha.fromBufferAttribute(n, l).applyMatrix4(a), this.pos.push(ha.x, ha.y, ha.z), this.col.push(da.r * r, da.g * r, da.b * r);
    return this;
  }
  build() {
    const t = new Ze();
    return t.setAttribute("position", new ds(this.pos, 3)), t.setAttribute("color", new ds(this.col, 3)), t.computeVertexNormals(), t.computeBoundingSphere(), t;
  }
}
const wt = (e) => {
  const t = new _i();
  return e(t), t.build();
};
function Mn(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const fa = new he().makeScale(0, 0, 0);
function Nl(e) {
  const t = new Bs(), s = Mn(e.seed * 7 + 1), a = e.size, i = {
    oakT: wt((z) => {
      z.add("cyl5", "#6b4a32", k(0, 0, 0, 0, 0.36, 1.8, 0.36)), z.add("cyl5", "#634430", k(0.12, 1.1, 0, 0, 0.14, 0.8, 0.14, 0, -0.9));
    }),
    oakC: wt((z) => {
      z.add("ico", "#ffffff", k(0, 0, 0, 0, 2.4, 2, 2.4)), z.add("ico", "#e6e6e6", k(0.75, -0.3, 0.3, 0.6, 1.6, 1.35, 1.6)), z.add("ico", "#f3f3f3", k(-0.65, 0.15, -0.45, 1.2, 1.7, 1.45, 1.7));
    }),
    pineT: wt((z) => {
      z.add("cyl5", "#6e4d36", k(0, 0, 0, 0, 0.3, 2.3, 0.3, 0, 0.07)), z.add("cyl5", "#6e4d36", k(-0.15, 2.18, 0, 0, 0.24, 1.4, 0.24, 0, -0.2));
    }),
    // começa no topo da parte de baixo (antes ficava um degrau)
    pineC: wt((z) => {
      z.add("ico", "#ffffff", k(0, 0, 0, 0, 3.7, 1.15, 3.5)), z.add("ico", "#e8e8e8", k(0.45, 0.4, 0.2, 0.5, 2.5, 0.85, 2.4));
    }),
    firT: wt((z) => z.add("cyl5", "#5d4330", k(0, 0, 0, 0, 0.26, 0.9, 0.26))),
    firC: wt((z) => {
      z.add("cone7", "#ffffff", k(0, 0.6, 0, 0, 2.3, 1.9, 2.3)), z.add("cone7", "#ececec", k(0, 1.55, 0, 0.4, 1.75, 1.7, 1.75)), z.add("cone7", "#f6f6f6", k(0, 2.4, 0, 0.8, 1.2, 1.5, 1.2));
    })
  }, o = Dt({ vertexColors: !0 }), n = [
    { kind: Qo, t: i.oakT, c: i.oakC, mat: Dt({ vertexColors: !0 }, { LEAF: "", CANOPY: "", WIND: "", WIND_AMP: "0.07" }), cy: 2.35, depth: { CANOPY: "", WIND: "", WIND_AMP: "0.07" }, s: 0.55 },
    { kind: mi, t: i.pineT, c: i.pineC, mat: Dt({ vertexColors: !0, color: "#56803e" }, { WIND: "", WIND_AMP: "0.05" }), cy: 3.45, depth: null, s: 0.5 },
    { kind: tn, t: i.firT, c: i.firC, mat: Dt({ vertexColors: !0, color: "#3e6a42" }, { WIND: "", WIND_AMP: "0.02", WIND_BYH: "true" }), cy: 0, depth: null, s: 0.5 }
  ], r = [], l = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), c = 3, u = (z, P) => Math.min(c - 1, Math.floor(z / a * c)) * c + Math.min(c - 1, Math.floor(P / a * c));
  for (const z of n) {
    const P = [];
    for (let E = 0; E < a * a; E++) e.tree[E] === z.kind && P.push(E);
    for (let E = P.length - 1; E > 0; E--) {
      const _ = Math.floor(s() * (E + 1)), q = P[E];
      P[E] = P[_], P[_] = q;
    }
    const F = Array.from({ length: c * c }, () => []);
    for (const E of P) {
      const _ = E % a + 0.5 + (s() - 0.5) * 0.4, q = Math.floor(E / a) + 0.5 + (s() - 0.5) * 0.4, Y = dt(e, _, q), j = z.s * (0.85 + s() * 0.45), Z = s() * ge;
      F[u(_, q)].push({ mt: k(_, Y - 0.1, q, Z, j, j, j), mc: k(_, Y - 0.1 + z.cy * j, q, Z, j, j, j), c: new Kt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.8 + s() * 0.25), k: E });
    }
    for (const E of F) {
      if (!E.length) continue;
      const _ = new Ut(z.t, o, E.length), q = new Ut(z.c, z.mat, E.length);
      E.forEach((Y, j) => {
        _.setMatrixAt(j, Y.mt), q.setMatrixAt(j, Y.mc), q.setColorAt(j, Y.c), l.set(Y.k, { t: _, c: q, i: j });
      });
      for (const Y of [_, q])
        Y.castShadow = !0, Y.receiveShadow = !0, Y.computeBoundingSphere(), t.add(Y);
      z.depth && (q.customDepthMaterial = xn(z.depth)), r.push({ t: _, c: q, n: E.length });
    }
  }
  const d = [], f = (z, P, F, E, _ = !0) => {
    const q = new Ut(Ws.dode, Dt(), Math.max(1, z.length * E));
    let Y = 0;
    for (const j of z) for (let Z = 0; Z < E; Z++) {
      const J = j.x + 0.5 + (s() - 0.5) * 0.7, ut = j.z + 0.5 + (s() - 0.5) * 0.7, ot = F * (0.6 + s() * 0.6);
      if (q.setMatrixAt(Y, k(J, dt(e, J, ut) + ot * 0.15, ut, s() * ge, ot, ot * (0.55 + s() * 0.4), ot, s() * 0.5, s() * 0.5)), _) {
        const Q = j.z * a + j.x, at = h.get(Q) ?? [];
        at.push({ m: q, i: Y }), h.set(Q, at);
      }
      q.setColorAt(Y++, new Kt(P).multiplyScalar(0.85 + s() * 0.3));
    }
    return q.count = Y, q.castShadow = q.receiveShadow = !0, q.computeBoundingSphere(), t.add(q), q;
  };
  f(e.res.filter((z) => z.kind === Oe), "#c4bdae", 0.75, 2);
  const p = e.res.filter((z) => z.kind === be);
  d.push(f(p, "#7a6a58", 0.7, 2), f(p, "#4fa58a", 0.32, 2));
  const y = e.res.filter((z) => z.kind === Jt), g = new Ut(Ws.ico, Dt({ color: "#4f7f3a" }, { WIND: "", WIND_AMP: "0.03" }), Math.max(1, y.length)), x = new Ut(Ws.ico, Dt({ color: "#c0303a" }, { NO_SNOW: "", FRUIT: "" }), Math.max(1, y.length * 6)), M = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
  y.forEach((z, P) => {
    const F = z.x + 0.5, E = z.z + 0.5, _ = dt(e, F, E);
    g.setMatrixAt(P, k(F, _ + 0.35, E, s() * ge, 1.05, 0.85, 1.05));
    const q = [];
    for (let Y = 0; Y < 6; Y++) {
      const j = s() * ge, Z = k(F + Math.cos(j) * 0.45, _ + 0.35 + s() * 0.35, E + Math.sin(j) * 0.45, 0, 0.11, 0.11, 0.11);
      x.setMatrixAt(P * 6 + Y, Z), q.push(Z);
    }
    M.set(z.z * a + z.x, q), v.set(z.z * a + z.x, P * 6);
  });
  for (const z of [g, x])
    z.castShadow = !0, z.computeBoundingSphere(), t.add(z);
  const w = wt((z) => {
    for (let P = 0; P < 3; P++) z.add("cone4", "#ffffff", k((P - 1) * 0.12, 0, P % 2 * 0.1, P * 2, 0.14, 0.5 + P * 0.08, 0.14, (P - 1) * 0.3, (P - 1) * 0.25), 0.15);
  }), B = [];
  for (let z = 0; z < 3e4 && B.length < 3200; z++) {
    const P = s() * a, F = s() * a, E = Math.floor(F) * a + Math.floor(P), _ = e.terrain[E];
    if (_ !== He && _ !== $e || e.tree[E]) continue;
    const q = dt(e, P, F);
    q < 0.7 || q > 14 || _ === $e && q > Ua - 0.3 || B.push(k(P, q - 0.02, F, s() * ge, 0.6 + s() * 0.6, 0.5 + s() * 0.6, 0.6 + s() * 0.6));
  }
  const A = new Ut(w, Dt({ vertexColors: !0 }, { GRASSTUFT: "", WIND: "", WIND_AMP: "0.08", WIND_BYH: "true", SNOW_K: "0.6" }), Math.max(1, B.length));
  B.forEach((z, P) => {
    A.setMatrixAt(P, z), A.setColorAt(P, new Kt(0.85 + s() * 0.3, 0.85 + s() * 0.3, 0.85 + s() * 0.3));
  }), A.receiveShadow = !0, A.computeBoundingSphere(), t.add(A);
  const T = (z, P) => {
    for (const F of r) F.t.count = F.c.count = Math.floor(F.n * z);
    A.count = Math.floor(B.length * P);
  }, S = (z) => {
    const P = l.get(z);
    P && (P.t.setMatrixAt(P.i, fa), P.c.setMatrixAt(P.i, fa), P.t.instanceMatrix.needsUpdate = P.c.instanceMatrix.needsUpdate = !0, l.delete(z));
  }, $ = (z) => {
    O(z, !1);
    const P = h.get(z);
    if (P) {
      for (const { m: F, i: E } of P)
        F.setMatrixAt(E, fa), F.instanceMatrix.needsUpdate = !0;
      h.delete(z);
    }
  }, O = (z, P) => {
    const F = M.get(z), E = v.get(z);
    !F || E === void 0 || (F.forEach((_, q) => x.setMatrixAt(E + q, P ? _ : fa)), x.instanceMatrix.needsUpdate = !0);
  };
  return { group: t, trees: r, metal: d, tufts: A, setDensity: T, removeTree: S, removeRes: $, setBerries: O };
}
function Fl(e, t = !1) {
  const s = e[0].index !== null, a = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), o = {}, n = {}, r = e[0].morphTargetsRelative, l = new Ze();
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
    const u = co(o[c]);
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
      for (let y = 0; y < n[c].length; ++y)
        f.push(n[c][y][d]);
      const p = co(f);
      if (!p)
        return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + c + " morphAttribute."), null;
      l.morphAttributes[c].push(p);
    }
  }
  return l;
}
function co(e) {
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
  const n = new t(o), r = new Me(n, s, a);
  let l = 0;
  for (let h = 0; h < e.length; ++h) {
    const c = e[h];
    if (c.isInterleavedBufferAttribute) {
      const u = l / s;
      for (let d = 0, f = c.count; d < f; d++)
        for (let p = 0; p < s; p++) {
          const y = c.getComponent(d, p);
          r.setComponent(d + u, p, y);
        }
    } else
      n.set(c.array, l);
    l += c.count * s;
  }
  return i !== void 0 && (r.gpuType = i), r;
}
const ke = {
  emit: (e, t, s, a) => {
  }
}, es = new he().makeScale(0, 0, 0), Ll = ["#e3b98f", "#d1a074", "#b98559", "#9a6a45"], Ul = ["#2a1c12", "#3b2817", "#5a3a1e", "#1f1a17", "#6b4a2a"], _l = ["#7b5634", "#8d6a43", "#6a4a2c", "#9a7a55"], Hl = ["#b9a27a", "#a08a5c", "#8f7a52", "#c8b48a"], Gl = ["#d9a43a", "#7a5634", "#bdb6a8", "#4f9c85"], jl = ["spear", "club", "axe", "pick", "mallet", "bow", "arrow", "sword", "sling"], Mi = "#b5813e";
function Dl(e) {
  const t = [], s = [], a = new Kt();
  for (const [o, n] of e) {
    const r = o.index ? o.toNonIndexed() : o, l = r.attributes.position.array;
    a.set(n);
    for (let h = 0; h < l.length; h += 3)
      t.push(l[h], l[h + 1], l[h + 2]), s.push(a.r, a.g, a.b);
  }
  const i = new Ze();
  return i.setAttribute("position", new ds(t, 3)), i.setAttribute("color", new ds(s, 3)), i.computeVertexNormals(), i;
}
const ti = {
  leg: new oe(0.12, 0.44, 0.13).translate(0, -0.22, 0),
  skirt: new Es(0.17, 0.22, 0.26, 8).translate(0, -0.13, 0),
  torso: new oe(0.34, 0.42, 0.22).translate(0, 0.21, 0),
  arm: new oe(0.09, 0.38, 0.09).translate(0, -0.19, 0),
  head: new Do(0.13, 0),
  // cabelo no alto, dos lados e atrás; o rosto (frente, +z) fica à mostra. As duas partes se encontram sem sobrepor
  hair: Fl([new pi(0.142, 8, 2, 0, Math.PI * 2, 0, Math.PI * 0.36), new pi(0.142, 6, 2, Math.PI * 0.75, Math.PI * 1.5, Math.PI * 0.36, Math.PI * 0.26)]),
  shield: new Es(0.24, 0.24, 0.05, 10).rotateX(Math.PI / 2),
  spear: wt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.55, 0, 0, 0.04, 1.75, 0.04), 0), e.add("cone4", "#9a948a", k(0, 1.2, 0, 0, 0.07, 0.2, 0.07), 0);
  }),
  club: wt((e) => {
    e.add("cyl5", "#6b4a2f", k(0, -0.1, 0, 0, 0.05, 0.5, 0.05), 0), e.add("cyl5", "#5a3d27", k(0, 0.35, 0, 0, 0.12, 0.3, 0.12), 0);
  }),
  axe: wt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.66, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.43, 0.07, 0, 0.045, 0.14, 0.15), 0), e.add("box", "#b9b4aa", k(0, 0.44, 0.15, 0, 0.03, 0.12, 0.03), 0);
  }),
  pick: wt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.7, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.55, 0.02, 0, 0.055, 0.06, 0.24), 0), e.add("cone4", "#a29d94", k(0, 0.58, 0.14, 0, 0.06, 0.13, 0.06, Math.PI / 2), 0);
  }),
  // arco pouco curvo (como um arco de verdade): empunhadura na origem, barriga para a frente, corda para trás
  mallet: wt((e) => {
    e.add("cyl5", "#7a5a3c", k(0, -0.08, 0, 0, 0.045, 0.62, 0.045), 0), e.add("box", "#8d8a85", k(0, 0.45, 0, 0, 0.12, 0.12, 0.26), 0);
  }),
  // flecha encaixada no arco: a ponta vai para +y (o encaixe na corda fica atrás da mão)
  arrow: wt((e) => {
    e.add("cyl5", "#8a6a48", k(0, -0.3, 0, 0, 0.018, 0.66, 0.018), 0), e.add("cone4", "#b9b4aa", k(0, 0.36, 0, 0, 0.045, 0.1, 0.045), 0), e.add("box", "#e8e2d4", k(0, -0.3, 0, 0, 0.012, 0.1, 0.06), 0);
  }),
  bow: Dl([[new gr(0.62, 0.02, 4, 10, 1.1).rotateZ(-0.55).rotateY(-Math.PI / 2).translate(0, 0, -0.62), "#6b4a2f"], [new oe(8e-3, 0.65, 8e-3).translate(0, 0, -0.094), "#ddd6c6"]]),
  // espada curta de bronze: punho na mão, lâmina para +y, o fio para +z
  sword: wt((e) => {
    e.add("cyl5", "#4a3326", k(0, -0.09, 0, 0, 0.045, 0.17, 0.045), 0), e.add("box", Mi, k(0, 0.07, 0, 0, 0.05, 0.04, 0.17), 0), e.add("box", "#c9965a", k(0, 0.1, 0, 0, 0.024, 0.33, 0.075), 0), e.add("cone4", "#c9965a", k(0, 0.43, 0, Math.PI / 4, 0.055, 0.08, 0.055), 0);
  }),
  // funda: duas cordas saindo da mão (+y) e a bolsa de couro com a pedra na ponta
  sling: wt((e) => {
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", k(t * 0.02, 0, 0, 0, 0.01, 0.38, 0.01, 0, -t * 0.05), 0);
    e.add("box", "#7a5634", k(0, 0.36, 0, 0, 0.09, 0.08, 0.06), 0), e.add("dode", "#8f8a80", k(0, 0.4, 0, 0, 0.07, 0.07, 0.07), 0);
  }),
  carry: new oe(0.26, 0.26, 0.15)
}, ho = {
  body: new oe(1, 1, 1),
  neck: new oe(1, 1, 1).translate(0, 0.5, 0),
  collar: new oe(1, 1, 1),
  // coleira com a cor do time (cão do jogador)
  head: wt((e) => {
    e.add("box", "#ffffff", k(0, -0.5, 0, 0, 1, 1, 0.65), 0), e.add("box", "#e4e4e4", k(0, -0.42, 0.55, 0, 0.72, 0.66, 0.5), 0);
  }),
  ears: wt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#ffffff", k(t * 0.07, 0, 0, 0, 0.07, 0.13, 0.05, 0, -t * 0.35), 0);
  }),
  leg: new oe(1, 1, 1).translate(0, -0.5, 0),
  tail: new oe(1, 1, 1).translate(0, -0.5, 0),
  antlers: wt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#d8c8a8", k(t * 0.08, 0, 0, 0, 0.035, 0.42, 0.035, 0.25, -t * 0.5), 0), e.add("cyl5", "#d8c8a8", k(t * 0.2, 0.25, 0.04, 0, 0.03, 0.26, 0.03, -0.4, -t * 0.1), 0), e.add("cyl5", "#d8c8a8", k(t * 0.25, 0.3, -0.02, 0, 0.03, 0.22, 0.03, 0.5, -t * 0.9), 0);
  }),
  horns: wt((e) => {
    for (const t of [-1, 1])
      e.add("cyl5", "#e8dcc0", k(t * 0.12, 0, 0.02, 0, 0.06, 0.28, 0.06, 0, -t * 1.3), 0), e.add("cone4", "#3a3530", k(t * 0.36, 0.08, 0.05, 0, 0.07, 0.28, 0.07, 0.5, -t * 0.3), 0);
  }),
  tusks: wt((e) => {
    for (const t of [-1, 1]) e.add("cone4", "#f0eadc", k(t * 0.1, 0, 0, 0, 0.05, 0.14, 0.05, 0, -t * 0.5), 0);
  })
}, ei = {
  body: wt((e) => {
    for (const t of [-1, 1])
      e.add("box", "#6e4f37", k(t * 0.42, 0.3, 0, 0, 0.1, 0.1, 1.6), 0), e.add("box", "#6e4f37", k(t * 0.42, 0.3, 0.75, 0, 0.1, 0.26, 0.1), 0), e.add("box", "#6e4f37", k(t * 0.42, 0.3, -0.75, 0, 0.1, 0.26, 0.1), 0);
    e.add("box", "#6e4f37", k(0, 0.3, 0.75, 0, 0.94, 0.1, 0.1), 0), e.add("box", "#6e4f37", k(0, 0.3, -0.75, 0, 0.94, 0.1, 0.1), 0);
    for (const t of [-1, 1]) e.add("box", t < 0 ? "#8d6a46" : "#76573a", k(t * 0.26, 0.85, 0, 0, 0.9, 0.05, 1.7, 0, -t * 0.93), 0);
    e.add("box", "#4f3a2a", k(0, 1.16, 0, 0, 0.1, 0.1, 1.76), 0), e.add("prism", "#5e4431", k(0, 0.5, -0.84, 0, 1.04, 0.7, 0.05), 0), e.add("prism", "#5e4431", k(0, 0.85, 0.84, 0, 0.52, 0.35, 0.05), 0);
  }),
  wheel: new Es(0.22, 0.22, 0.08, 9).rotateZ(Math.PI / 2),
  log: wt((e) => {
    e.add("cyl8", "#5e4431", k(0, 0, -0.9, 0, 0.22, 1.85, 0.22, Math.PI / 2), 0), e.add("box", "#b5813e", k(0, -0.14, 0.95, 0, 0.3, 0.28, 0.26), 0), e.add("cone4", "#c9965a", k(0, 0, 1.08, Math.PI / 4, 0.26, 0.2, 0.26, Math.PI / 2), 0);
    for (const t of [-1, 1]) e.add("box", "#d8cfb8", k(0, 0, t * 0.4, 0, 0.02, 0.62, 0.02), 0);
  }),
  cloth: new oe(0.13, 0.05, 1.5).translate(0, 1.25, 0)
  // faixa na cor do time, na cumeeira
}, Ce = {
  deer: { body: [0.34, 0.4, 0.95], leg: 0.72, legW: 0.075, head: [0.17, 0.2, 0.36], neck: 0.32, tail: [0.08, 0.12, 0.06], color: ["#8a5a36", "#7d5230", "#93613b"], antl: !0 },
  boar: { body: [0.4, 0.42, 0.85], leg: 0.3, legW: 0.1, head: [0.24, 0.26, 0.46], neck: 0.04, tail: [0.04, 0.14, 0.04], color: ["#3e3229", "#4a3b30"], tusks: !0 },
  wolf: { body: [0.24, 0.28, 0.72], leg: 0.38, legW: 0.07, head: [0.17, 0.18, 0.34], neck: 0.18, tail: [0.07, 0.34, 0.07], color: ["#77746f", "#6a665f"] },
  aurochs: { body: [0.58, 0.64, 1.4], leg: 0.66, legW: 0.15, head: [0.3, 0.32, 0.5], neck: 0.1, tail: [0.06, 0.42, 0.06], color: ["#2b221d", "#3a2a20"], horns: !0 },
  dog: { body: [0.2, 0.24, 0.58], leg: 0.32, legW: 0.06, head: [0.15, 0.16, 0.3], neck: 0.16, tail: [0.05, 0.3, 0.05], color: ["#7a6650", "#5d4d3c", "#8a7a62"] },
  horse: { body: [0.36, 0.46, 1.15], leg: 0.78, legW: 0.085, head: [0.17, 0.22, 0.46], neck: 0.52, tail: [0.08, 0.5, 0.08], color: ["#6b4a32", "#3b2a20", "#8a5f3c", "#5a3d28"], neckTilt: 0.72, headTilt: 0.85, neckW: 1 }
}, zn = Ce.horse.leg + Ce.horse.body[1], Hs = (e) => e * e * (3 - 2 * e);
function Ls(e, t, s) {
  if (e < 0.12) return s - 0.12 * Math.sin(e / 0.12 * Math.PI);
  if (e < 0.68) return s + (t - s) * Hs((e - 0.12) / 0.56);
  if (e < 0.8) return t;
  const a = (e - 0.8) / 0.2;
  return t + (s - t) * a * a;
}
const Us = (e) => e > 0.85 ? (e - 0.85) / 0.15 : e < 0.15 ? 1 - e / 0.15 : 0, zi = 2.6;
function An(e) {
  const t = G[e]?.key ?? "";
  if (t === "horseman") return Ce.horse.leg + Ce.horse.body[1] * 0.5;
  if (t === "ram") return 0.6;
  const s = Ce[t];
  return s ? s.leg + s.body[1] * 0.5 : 0.72;
}
function Wl(e) {
  const t = G[e]?.key ?? "";
  if (t === "horseman") return zn + 0.1;
  if (t === "ram") return 1.15;
  const s = Ce[t];
  return s ? s.leg + s.body[1] + 0.06 : 1.15;
}
const _s = (e) => {
  let t = Math.imul(e ^ 2654435769, 2246822507);
  return t ^= t >>> 13, t = Math.imul(t, 3266489909), ((t ^ t >>> 16) >>> 0) / 4294967296;
}, Be = (e, t) => e[Math.floor(t * e.length) % e.length];
class Vl {
  constructor(t = 720, s = 160) {
    m(this, "group", new Bs());
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
    m(this, "m", { b: new he(), hip: new he(), tor: new he(), l: new he(), t: new he(), al: new he(), ar: new he(), hd: new he() });
    m(this, "e", new Wo());
    m(this, "q", new Bi());
    m(this, "p", new Tt());
    m(this, "s", new Tt());
    m(this, "v", new Tt());
    m(this, "c", new Kt());
    this.maxH = t, this.maxA = s;
    const a = Dt({}, { NO_SNOW: "" }), i = Dt({ vertexColors: !0 }, { NO_SNOW: "" });
    for (const r in ti) {
      const l = r === "leg" || r === "arm" ? t * 2 : t, h = !!ti[r].attributes.color, c = new Ut(ti[r], h ? i : a, l);
      c.instanceMatrix.setUsage(ue), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set("#ffffff"));
      this.group.add(c), this.hm[r] = c;
    }
    for (const r in ho) {
      const l = r === "leg" ? s * 4 : s, h = ["head", "ears", "antlers", "horns", "tusks"].includes(r), c = new Ut(ho[r], h ? i : a, l);
      c.instanceMatrix.setUsage(ue), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set("#ffffff"));
      this.group.add(c), this.am[r] = c;
    }
    for (const r in ei) {
      const l = r === "wheel" ? this.maxR * 4 : this.maxR, h = !!ei[r].attributes.color, c = new Ut(ei[r], h ? i : a, l);
      c.instanceMatrix.setUsage(ue), c.frustumCulled = !1, c.castShadow = !0, c.count = 0;
      for (let u = 0; u < l; u++) c.setColorAt(u, this.c.set(r === "wheel" ? "#6b4a2f" : "#ffffff"));
      this.group.add(c), this.rm[r] = c;
    }
    this.slotR = new Int32Array(this.maxR).fill(-1);
    const o = new Vo(0.36, 0.46, 28).rotateX(-Math.PI / 2);
    this.ring = new Ut(o, new cs({ color: 16777215, transparent: !0, opacity: 0.95, depthWrite: !1, toneMapped: !1 }), t);
    const n = new La(1, 0.11);
    this.barBg = new Ut(n, new cs({ color: 1711900, transparent: !0, opacity: 0.75, depthTest: !1, toneMapped: !1 }), 400), this.barFg = new Ut(n.clone().translate(0.5, 0, 0), new cs({ color: 16777215, transparent: !0, opacity: 1, depthTest: !1, toneMapped: !1 }), 400);
    for (const r of [this.ring, this.barBg, this.barFg])
      r.instanceMatrix.setUsage(ue), r.frustumCulled = !1, r.count = 0, this.group.add(r);
    this.ring.renderOrder = 5, this.barBg.renderOrder = 8, this.barFg.renderOrder = 9;
    for (let r = 0; r < t; r++) this.ring.setColorAt(r, this.c.set("#9dffc4"));
    for (let r = 0; r < 400; r++) this.barFg.setColorAt(r, this.c.set("#6fe08a"));
    this.slotH = new Int32Array(t).fill(-1), this.slotA = new Int32Array(s).fill(-1);
  }
  trs(t, s, a, i, o = 0, n = 0, r = 0, l = 1, h = l, c = l) {
    return this.e.set(o, n, r, "YXZ"), this.q.setFromEuler(this.e), this.p.set(s, a, i), this.s.set(l, h, c), t.compose(this.p, this.q, this.s);
  }
  look(t, s) {
    const a = _s(s * 7 + 1), i = _s(s * 13 + 5), o = t.owner[s], n = o >= 0 && o < t.players.length ? t.players[o].era : 0, r = o === Ee ? "#4f6b4a" : t.players[o]?.color ?? "#888", l = G[t.kind[s]].key, h = Be(Ll, a), c = Be(Ul, i), u = Be(_l, i), d = Be(Hl, a), f = { skin: h, hair: c, tunic: u, skirt: r, legs: h, arms: h, weapon: null, shield: null, bigHair: !1, sc: 0.95 + a * 0.08 };
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
        return { ...f, tunic: r, skirt: d, weapon: "spear", shield: n >= 2 ? Mi : "#8a6a44", sc: 1.04, helmet: n >= 2 };
      case "swordsman":
        return { ...f, tunic: r, skirt: d, weapon: "sword", shield: "#8a6a44", sc: 1.05, helmet: !0 };
      case "slinger":
        return { ...f, tunic: d, skirt: r, weapon: "sling", sc: 0.98 };
      case "horseman":
        return { ...f, tunic: r, skirt: d, weapon: "spear", helmet: !0, sc: 1 };
      case "barbarian":
        return { ...f, tunic: Be(["#4f6b4a", "#6b5a3a", "#3f5a6a"], a), skirt: "#5a4d3c", legs: "#5a4d3c", weapon: "spear", shield: Be(["#3f6a4a", "#8a6a3a"], i), hair: Be(["#c48a4a", "#8a5a2a", "#d9a35f"], a), bigHair: !0, sc: 1.05 };
    }
    return f;
  }
  colorHuman(t, s) {
    const a = this.hm, i = this.c;
    a.leg.setColorAt(t * 2, i.set(s.legs)), a.leg.setColorAt(t * 2 + 1, i), a.skirt.setColorAt(t, i.set(s.skirt)), a.torso.setColorAt(t, i.set(s.tunic)), a.arm.setColorAt(t * 2, i.set(s.arms)), a.arm.setColorAt(t * 2 + 1, i), a.head.setColorAt(t, i.set(s.skin)), a.hair.setColorAt(t, i.set(s.helmet ? Mi : s.hair)), a.shield.setColorAt(t, i.set(s.shield ?? "#888"));
    for (const o in a) a[o].instanceColor && (a[o].instanceColor.needsUpdate = !0);
  }
  speciesOf(t, s) {
    const a = t.kind[s] === gt ? t.sub[s] : t.kind[s];
    return G[a]?.key ?? "deer";
  }
  update(t, s, a, i, o, n, r, l) {
    const h = t.size, c = t.vis[o], u = this.hm, d = this.am, f = this.rm;
    let p = 0, y = 0, g = 0, x = 0, M = 0;
    for (let v = 0; v < t.top; v++) {
      if (!t.alive[v]) continue;
      const w = t.kind[v];
      if (w >= bt) {
        const j = Et[w - bt], Z = t.x[v] / 256, J = t.z[v] / 256;
        if (n && t.owner[v] !== o && !c[Math.floor(J) * h + Math.floor(Z)]) continue;
        const ut = dt(t.map, Z, J), ot = i.has(v);
        ot && g < this.maxH && this.ring.setMatrixAt(g++, k(Z, ut + 0.08, J, 0, j.size * 0.95, 1, j.size * 0.95)), (ot || t.hp[v] < j.hp) && x < 400 && this.bar(x++, Z, ut + 2.3, J, t.hp[v] / j.hp, j.size * 0.6, l);
        continue;
      }
      const B = (t.px[v] + (t.x[v] - t.px[v]) * s) / 256, A = (t.pz[v] + (t.z[v] - t.pz[v]) * s) / 256;
      if (n && t.owner[v] !== o) {
        const j = Math.floor(B), Z = Math.floor(A);
        if (j < 0 || Z < 0 || j >= h || Z >= h || !c[Z * h + j]) continue;
      }
      const T = t.x[v] - t.px[v], S = t.z[v] - t.pz[v], $ = (T !== 0 || S !== 0) && t.state[v] === Wt, O = dt(t.map, B, A);
      let z = this.heading[v];
      if ($) z = Math.atan2(T, S);
      else if (w !== gt && (t.task[v] === Ft || t.task[v] === Ie || t.task[v] === Rt) && t.tgt[v] >= 0) {
        const j = t.tgt[v];
        let Z, J;
        t.task[v] === Ft && t.tgtTile[v] ? (Z = j % h + 0.5, J = Math.floor(j / h) + 0.5) : (Z = t.x[j] / 256, J = t.z[j] / 256), Math.abs(Z - B) + Math.abs(J - A) > 0.05 && (z = Math.atan2(Z - B, J - A));
      }
      const P = this.heading[v];
      this.heading[v] = P + Math.atan2(Math.sin(z - P), Math.cos(z - P)) * Math.min(1, a * 10);
      const F = this.heading[v], E = Math.hypot(T, S) / 256 * 10, _ = w === gt ? "" : G[w].key, q = w === gt || t.owner[v] === kt || _ === "dog";
      if (_ === "ram") {
        if (M >= this.maxR) continue;
        this.phase[v] += $ ? a * E / 0.22 : 0, this.slotR[M] !== v * 8 + t.owner[v] + 1 && (this.slotR[M] = v * 8 + t.owner[v] + 1, f.cloth.setColorAt(M, this.c.set(t.players[t.owner[v]]?.color ?? "#888")), f.cloth.instanceColor && (f.cloth.instanceColor.needsUpdate = !0)), this.poseRam(t, v, M, B, O, A, F, s), M++;
      } else if (_ === "horseman") {
        if (y >= this.maxA || p >= this.maxH) continue;
        const j = Ce.horse, Z = E > 1.1;
        this.phase[v] += $ ? a * E * 2.6 / j.leg : 0;
        const J = v * 64 + w;
        if (this.slotA[y] !== J) {
          this.slotA[y] = J;
          const xt = this.c.set(Be(j.color, _s(v)));
          for (const _t of ["body", "neck", "head", "ears", "tail"]) d[_t].setColorAt(y, xt);
          for (let _t = 0; _t < 4; _t++) d.leg.setColorAt(y * 4 + _t, xt);
          d.collar.setColorAt(y, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const _t in d) d[_t].instanceColor && (d[_t].instanceColor.needsUpdate = !0);
        }
        this.poseAnimal(y, j, B, O, A, F, $, this.phase[v], r, !1, Z, !1, 1, !1, 0, 0, !0, !0), y++;
        const ut = t.owner[v], ot = `${w}:${ut}:${ut >= 0 && ut < t.players.length ? t.players[ut].era : 0}`, Q = this.look(t, v);
        (this.slotH[p] !== v || this.lookKey[p] !== ot) && (this.slotH[p] = v, this.lookKey[p] = ot, this.colorHuman(p, Q));
        const at = $ ? Math.abs(Math.cos(this.phase[v])) * (Z ? 0.06 : 0.025) : 0;
        if ($ && Z) {
          const xt = this.phase[v] / Math.PI % 2;
          xt < this.lastP[v] && ke.emit("animal.hooves", B, A, 0.5), this.lastP[v] = xt;
        }
        this.poseHuman(t, v, p, Q, B, O, A, F, $, r, s, zn + at - 0.44 * Q.sc), p++;
      } else if (q) {
        if (y >= this.maxA) continue;
        const j = this.speciesOf(t, v), Z = Ce[j] ?? Ce.deer;
        this.phase[v] += $ ? a * E * 2.6 / Z.leg : 0;
        const J = v * 64 + w;
        if (this.slotA[y] !== J) {
          this.slotA[y] = J;
          const at = this.c.set(Be(Z.color, _s(v)));
          w === gt && at.multiplyScalar(0.8);
          for (const xt of ["body", "neck", "head", "ears", "tail"]) d[xt].setColorAt(y, at);
          for (let xt = 0; xt < 4; xt++) d.leg.setColorAt(y * 4 + xt, at);
          d.collar.setColorAt(y, this.c.set(t.players[t.owner[v]]?.color ?? "#888"));
          for (const xt in d) d[xt].instanceColor && (d[xt].instanceColor.needsUpdate = !0);
        }
        const ut = w !== gt && t.task[v] === Rt && !$;
        let ot = 0, Q = 0;
        if (ut) {
          const at = 1 - Math.max(0, Math.min(1, (t.cd[v] - s) / G[w].cd));
          ot = at > 0.8 ? (at - 0.8) / 0.2 : at < 0.2 ? 1 - at / 0.2 : 0;
          const xt = t.tgt[v];
          if (xt >= 0 && t.alive[xt]) {
            const _t = Math.hypot(t.x[xt] - t.x[v], t.z[xt] - t.z[v]) / 256, Mt = Z.body[2] * 0.5 + Z.neck * 0.3 + Z.head[2] * 0.85, Qt = t.kind[xt] < gt ? G[t.kind[xt]].radius : 0.5;
            Q = Math.max(0, Math.min(Z.body[2] * 0.3, _t - Mt - Qt * 0.95));
          }
        }
        ut && t.cd[v] > this.lastCd[v] && ke.emit(j === "boar" ? "hit.boar" : j === "aurochs" ? "hit.aurochs" : "hit.bite", B, A), this.lastCd[v] = w === gt ? 0 : t.cd[v], this.poseAnimal(y, Z, B, O, A, F, $, this.phase[v], r, w === gt, t.fast[v] === 1, j === "deer" && _s(v * 3) < 0.5, w === gt ? 1 : 1 + (j === "aurochs" ? 0.1 : 0), ut, ot, Q, t.owner[v] >= 0 && w !== gt), y++;
      } else {
        if (p >= this.maxH) continue;
        this.phase[v] += $ ? a * E * 7.2 : 0;
        const j = t.owner[v], Z = `${w}:${j}:${j >= 0 && j < t.players.length ? t.players[j].era : 0}`, J = this.look(t, v);
        (this.slotH[p] !== v || this.lookKey[p] !== Z) && (this.slotH[p] = v, this.lookKey[p] = Z, this.colorHuman(p, J)), this.poseHuman(t, v, p, J, B, O, A, F, $, r, s), p++;
      }
      const Y = _ === "ram" ? 1.9 : _ === "horseman" ? 1.6 : q ? 1.2 : 1;
      i.has(v) && g < this.maxH && this.ring.setMatrixAt(g++, k(B, O + 0.06, A, 0, Y, 1, Y)), w !== gt && (i.has(v) || t.hp[v] < G[w].hp) && x < 400 && this.bar(x++, B, O + (_ === "horseman" ? 2.6 : _ === "ram" ? 1.75 : q ? 1.3 : 1.55), A, t.hp[v] / G[w].hp, _ === "ram" || _ === "horseman" ? 0.9 : 0.7, l);
    }
    for (const v in u)
      u[v].count = p, u[v].instanceMatrix.needsUpdate = !0;
    u.leg.count = u.arm.count = p * 2;
    for (const v in d)
      d[v].count = y, d[v].instanceMatrix.needsUpdate = !0;
    d.leg.count = y * 4;
    for (const v in f)
      f[v].count = M, f[v].instanceMatrix.needsUpdate = !0;
    f.wheel.count = M * 4, this.ring.count = g, this.ring.instanceMatrix.needsUpdate = !0, this.barBg.count = this.barFg.count = x, this.barBg.instanceMatrix.needsUpdate = this.barFg.instanceMatrix.needsUpdate = !0, this.barFg.instanceColor && (this.barFg.instanceColor.needsUpdate = !0);
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
    const f = this.hm, p = this.m, y = this.phase[s], g = Math.sin(y), x = c + s * 0.37, M = d > 0;
    let v = 0, w = 0, B = 0.05 + Math.sin(x * 1.3) * 0.03, A = -0.05 - Math.sin(x * 1.3) * 0.03, T = 0.07, S = -0.07, $ = 0, O = 0, z = 0, P = 0, F = 0, E = i.weapon, _ = i.weapon === "spear" ? "torso" : i.weapon === "bow" ? "left" : "arm", q = i.weapon === "spear" ? 0.12 : i.weapon === "bow" ? 0 : i.weapon === "sling" ? Math.PI - 0.12 : i.weapon === "sword" ? Math.PI - 0.3 : 0.79, Y = 0, j = !1, Z = 0;
    const J = () => {
      S = -0.42, T = 0.42, B = A + 0.06;
    }, ut = t.task[s];
    if (M && (h || ut !== Rt || t.state[s] === Wt))
      B = -0.75, T = 0.1, A = -0.25, $ = h ? 0.14 : 0.03;
    else if (h)
      v = g * 0.65, w = -g * 0.65, B = -g * 0.5, A = g * 0.5, O = Math.abs(Math.cos(y)) * 0.035;
    else if (ut === Ft && t.phase[s] === bn) {
      const ot = t.tgt[s], Q = t.tgtTile[s] === 1, at = Q && t.map.tree[ot] > 0, xt = Q && t.resKind[ot] === 1, _t = !Q && t.kind[ot] >= bt, Mt = (Qt, ee) => {
        const Je = x / Qt % 1;
        Je < this.lastP[s] && ke.emit(ee, o, r), this.lastP[s] = Je;
      };
      if (at)
        A = Ls(x / 1 % 1, -2.75, -1.35), J(), $ = 0.1 + Us(x / 1 % 1) * 0.12, E = "axe", _ = "arm", q = Math.PI - 0.6, Mt(1, "work.chop");
      else if (Q && !xt)
        A = Ls(x / 1.15 % 1, -2.8, -0.55), J(), $ = 0.22 + Us(x / 1.15 % 1) * 0.14, E = "pick", _ = "arm", q = Math.PI - 0.6, Mt(1.15, t.resKind[ot] === 3 ? "work.pickMetal" : "work.pick");
      else if (_t)
        A = Ls(x / 1.4 % 1, -1.95, -0.35), J(), $ = 0.32 + Us(x / 1.4 % 1) * 0.1, E = "pick", _ = "arm", q = Math.PI - 0.7, Mt(1.4, "work.hoe");
      else if (xt) {
        const Qt = Math.sin(x * 4.5);
        A = -0.95 + Qt * 0.45, B = -0.95 - Qt * 0.45, S = -0.2, T = 0.2, $ = 0.5, E = null, Mt(1.4, "work.rustle");
      } else
        A = -0.55 + Math.sin(x * 7) * 0.3, B = -0.4, $ = 0.68, E = null, Mt(1.6, "work.rustle");
    } else if (ut === Ie && t.state[s] !== Wt) {
      const ot = x / 0.75 % 1;
      A = Ls(ot, -2.3, -0.7), S = -0.15, B = -0.75, $ = 0.15 + Us(ot) * 0.08, E = "mallet", _ = "arm", q = Math.PI - 0.75, ot < this.lastP[s] && ke.emit("work.mallet", o, r), this.lastP[s] = ot;
    } else if (ut === Rt && t.state[s] !== Wt) {
      const ot = G[t.kind[s]], Q = 1 - Math.max(0, Math.min(1, (t.cd[s] - u) / ot.cd)), at = t.tgt[s], xt = !!ot.hunt && at >= 0 && t.owner[at] === kt;
      if (t.cd[s] > this.lastCd[s] && !ot.proj && !(xt && at >= 0 && t.alive[at] && t.reach(s, at, !1) / 256 >= zi)) {
        const Mt = at >= 0 && t.kind[at] >= bt;
        ke.emit(Mt ? "hit.wall" : i.weapon === "sword" ? "hit.sword" : i.weapon === "axe" ? "hit.axe" : i.weapon === "spear" ? "hit.spear" : "hit.club", o, r);
      }
      const _t = at >= 0 && t.alive[at] ? t.reach(s, at, !1) / 256 : 9;
      if (ot.proj === "arrow" || i.weapon === "bow")
        E = "bow", _ = "left", q = 0, B = -1.5, T = 0.2, S = -0.3, $ = -0.04, A = Q < 0.2 ? -0.95 - Q / 0.2 * 0.5 : -1.45, j = Q >= 0.25;
      else if (ot.proj === "stone")
        if (E = "sling", _ = "arm", B = -0.55, T = 0.18, $ = -0.03, Q < 0.2) {
          const Mt = Q / 0.2;
          A = -0.75 - Mt * 2.05, q = Math.PI / 2 + 0.7 - Mt * 0.85;
        } else if (Q < 0.85)
          A = -2.8, S = -0.18, q = Math.PI / 2 - 0.1, F = x * 15;
        else {
          const Mt = (Q - 0.85) / 0.15;
          A = -2.8 + Hs(Mt) * 2.05, q = Math.PI / 2 - 0.1 + Mt * 0.8, $ = -0.03 + Mt * 0.12;
        }
      else if ((ot.proj === "spear" || xt) && _t >= zi)
        if (E = Q < 0.3 ? null : "spear", _ = "torso", q = Math.PI / 2 - 0.25, Y = 0.1, B = -1, $ = -0.05, Q < 0.3)
          A = -1.25 + Q / 0.3 * 1.05, $ = 0.12 - Q / 0.3 * 0.17;
        else if (Q < 0.75) A = -0.2 - Hs((Q - 0.3) / 0.45) * 2.55;
        else if (Q < 0.9) A = -2.75;
        else {
          const Mt = (Q - 0.9) / 0.1;
          A = -2.75 + Mt * Mt * 1.5, $ = -0.05 + Mt * 0.17;
        }
      else if (i.weapon === "spear" || ot.proj === "spear" || xt) {
        if (E = "spear", _ = "torso", Y = 0.05, B = i.shield ? -0.9 : -0.5, T = 0.15, Q < 0.15) A = -1.25;
        else if (Q < 0.85) A = -1.25 + Hs((Q - 0.15) / 0.7) * 0.9;
        else {
          const I = (Q - 0.85) / 0.15;
          A = -0.35 - I * I * 0.9;
        }
        $ = 0.06 + (Q > 0.85 ? (Q - 0.85) / 0.15 : Q < 0.15 ? 1 - Q / 0.15 : 0) * 0.12;
        let Mt = _t, Qt = 0.72;
        const ee = at >= 0 ? Math.hypot(t.x[at] - t.x[s], t.z[at] - t.z[s]) / 256 : _t;
        if (at >= 0 && t.alive[at] && t.kind[at] < gt) {
          const I = Ce[G[t.kind[at]].key];
          if (Qt = An(t.kind[at]), I) {
            const R = Math.cos(Math.atan2(t.x[s] - t.x[at], t.z[s] - t.z[at]) - this.heading[at]);
            Mt = ee - Math.max(I.body[0] * 0.55, I.body[2] * 0.5 * Math.abs(R));
          } else {
            const R = G[t.kind[at]].radius;
            Mt = ee - (R > 0.35 ? R * 0.85 : 0.2);
          }
        }
        const Je = 0.35 * Math.sin(-A), Da = (0.84 - 0.35 * Math.cos(A)) * i.sc + d, C = Math.atan2(Da - Qt, Math.max(0.4, ee - Je));
        q = Math.PI / 2 + C, Z = Math.max(0, Je + 1.4 * Math.cos(C) - Mt + 0.03);
      } else {
        E || (E = "club");
        const Qt = (at >= 0 && t.alive[at] ? t.kind[at] >= bt ? 1 : Wl(t.kind[at]) : 0.6) + (E === "sword" ? 0.18 : 0);
        let ee = -0.6;
        for (; ee > -2.2 && (0.84 - 0.35 * Math.cos(ee) - 0.5 * Math.cos(ee - 0.75)) * i.sc + d < Qt; ) ee -= 0.05;
        _ = "arm", q = Math.PI - 0.75, A = Ls(Q, -2.6, Math.max(-2.25, ee)), S = -0.15, B = -0.5, $ = 0.08 + Us(Q) * 0.12, E === "sword" && (F = 0.22);
      }
    }
    M && (v = w = -0.38, z = 0.5, P = -0.5), this.lastCd[s] = t.cd[s], this.lastCarry[s] > 0 && t.carry[s] === 0 && t.task[s] === Ft && ke.emit(["drop.food", "drop.wood", "drop.stone", "drop.metal"][t.carryRes[s]] ?? "drop.food", o, r), this.lastCarry[s] = t.carry[s], this.trs(p.b, o, n + O + d, r, 0, l, 0, i.sc), p.hip.multiplyMatrices(p.b, this.trs(p.t, 0, 0.46, 0)), p.tor.multiplyMatrices(p.hip, this.trs(p.t, 0, 0, 0, $)), f.torso.setMatrixAt(a, p.tor), f.leg.setMatrixAt(a * 2, p.l.multiplyMatrices(p.hip, this.trs(p.t, 0.09, 0, 0, v, 0, z))), f.leg.setMatrixAt(a * 2 + 1, p.l.multiplyMatrices(p.hip, this.trs(p.t, -0.09, 0, 0, w, 0, P))), f.skirt.setMatrixAt(a, p.l.multiplyMatrices(p.hip, this.trs(p.t, 0, 0.03, 0, $ * 0.35))), p.al.multiplyMatrices(p.tor, this.trs(p.t, 0.215, 0.38, 0, B, 0, -T)), f.arm.setMatrixAt(a * 2, p.al), p.ar.multiplyMatrices(p.tor, this.trs(p.t, -0.215, 0.38, 0, A, 0, -S)), f.arm.setMatrixAt(a * 2 + 1, p.ar), p.hd.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.53, 0, -$ * 0.6)), f.head.setMatrixAt(a, p.hd), f.hair.setMatrixAt(a, p.l.multiplyMatrices(p.hd, this.trs(p.t, 0, 0.03, -0.012, 0, 0, 0, i.bigHair ? 1.18 : 1))), i.shield ? (this.v.set(0.04, -0.24, 0.13).applyMatrix4(p.al), f.shield.setMatrixAt(a, p.l.copy(p.tor).setPosition(this.v))) : f.shield.setMatrixAt(a, es);
    for (const ot of jl) f[ot].setMatrixAt(a, es);
    E && (_ === "arm" ? f[E].setMatrixAt(a, p.l.multiplyMatrices(p.ar, this.trs(p.t, 0, -0.35, 0, q, F))) : (this.gripTorso(p.l, _ === "left" ? p.al : p.ar, _ === "left" ? 0.02 : 0, q, _ === "torso" ? Y : 0), Z && p.l.multiply(this.trs(p.t, 0, -Z, 0)), f[E].setMatrixAt(a, p.l))), j && f.arrow.setMatrixAt(a, this.gripTorso(p.l, p.al, 0.02, Math.PI / 2, -0.12)), t.carry[s] > 0 ? (f.carry.setMatrixAt(a, p.l.multiplyMatrices(p.tor, this.trs(p.t, 0, 0.2, -0.19))), f.carry.setColorAt(a, this.c.set(Gl[t.carryRes[s]] ?? "#888")), f.carry.instanceColor && (f.carry.instanceColor.needsUpdate = !0)) : f.carry.setMatrixAt(a, es);
  }
  poseAnimal(t, s, a, i, o, n, r, l, h, c, u, d, f, p = !1, y = 0, g = 0, x = !1, M = !1) {
    const v = this.am, w = this.m, [B, A, T] = s.body, [S, $, O] = s.head, z = s.leg + A * 0.5, P = r ? Math.sin(l) * (u ? 0.8 : 0.45) : 0, F = r ? Math.abs(Math.cos(l)) * (u ? 0.06 : 0.025) : 0;
    c ? this.trs(w.b, a, i + B * 0.5 - z * 0, o, 0, n, Math.PI / 2, f) : this.trs(w.b, a, i + F, o, 0, n, 0, f), c && w.b.multiply(this.trs(w.t, 0, -z + B * 0.1, 0)), y > 0 && w.b.multiply(this.trs(w.t, 0, 0, g * y, 0.1 * y)), v.body.setMatrixAt(t, w.l.multiplyMatrices(w.b, this.trs(w.t, 0, z, 0, 0, 0, 0, B, A, T))), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([j, Z], J) => v.leg.setMatrixAt(t * 4 + J, w.l.multiplyMatrices(w.b, this.trs(w.t, j * B * 0.32, s.leg, Z * T * 0.36, j * Z > 0 ? P : -P, 0, 0, s.legW, s.leg, s.legW))));
    const E = c ? 0.2 : M ? u ? 0.22 : r ? 0.08 : 0.12 + Math.sin(h * 1.3 + a) * 0.04 : p ? 0.05 + y * 0.55 : r ? u ? 0.15 : -0.3 : 0.9 + Math.sin(h * 1.7 + a) * 0.08;
    w.hd.multiplyMatrices(w.b, this.trs(w.t, 0, z + A * 0.3, T * 0.46, E));
    const _ = s.neckTilt ?? 0.29, q = s.neckW ?? 0.72;
    v.neck.setMatrixAt(t, w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, -0.04, 0, _, 0, 0, S * q, s.neck * 1.05 + 0.1, $ * q))), M ? v.collar.setMatrixAt(t, w.l.multiplyMatrices(w.b, this.trs(w.t, 0, z + A * 0.5 - 0.17, -T * 0.04, 0, 0, 0, B * 1.14, 0.22, T * 0.4))) : v.collar.setMatrixAt(t, x ? w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, s.neck * 0.45, s.neck * 0.13, 0.29, 0, 0, S * 0.9, 0.06, $ * 0.9)) : es), w.hd.multiply(this.trs(w.t, 0, s.neck * Math.cos(_) / Math.cos(0.29), s.neck * Math.sin(_) * (0.3 / Math.sin(0.29)) + O * 0.3, -E * 0.6 + (s.headTilt ?? 0))), v.head.setMatrixAt(t, w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, 0, 0, 0, 0, 0, S, $, O)));
    const Y = Math.min(S / 0.15, 1.35);
    v.ears.setMatrixAt(t, w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, $ * 0.5, -O * 0.2, -(s.headTilt ?? 0) * 0.85, 0, 0, Y, Y, Y))), v.antlers.setMatrixAt(t, d && s.antl ? w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, $ * 0.45, -O * 0.12)) : es), v.horns.setMatrixAt(t, s.horns ? w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, $ * 0.35, O * 0.02)) : es), v.tusks.setMatrixAt(t, s.tusks ? w.l.multiplyMatrices(w.hd, this.trs(w.t, 0, -$ * 0.25, O * 0.72, -0.6)) : es), v.tail.setMatrixAt(t, w.l.multiplyMatrices(w.b, this.trs(w.t, 0, z + A * 0.32, -T * 0.5, -0.4 + (r ? Math.sin(l * 2) * 0.15 : Math.sin(h * 3 + a) * 0.06), 0, 0, s.tail[0], s.tail[1], s.tail[2])));
  }
  /** aríete: rodas giram andando; atacando, o tronco recua devagar e bate rápido */
  poseRam(t, s, a, i, o, n, r, l) {
    const h = this.rm, c = this.m, u = this.phase[s];
    t.task[s] === Rt && t.cd[s] > this.lastCd[s] && ke.emit("ram.boom", i, n), this.lastCd[s] = t.cd[s];
    {
      const y = u / Math.PI % 2;
      y < this.lastP[s] && ke.emit("ram.creak", i, n, 0.7), this.lastP[s] = y;
    }
    this.trs(c.b, i, o, n, 0, r, 0), h.body.setMatrixAt(a, c.b), h.cloth.setMatrixAt(a, c.b), [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([y, g], x) => h.wheel.setMatrixAt(a * 4 + x, c.l.multiplyMatrices(c.b, this.trs(c.t, y * 0.5, 0.22, g * 0.55, u))));
    let d = 0;
    if (t.task[s] === Rt && t.state[s] !== Wt) {
      const y = 1 - Math.max(0, Math.min(1, (t.cd[s] - l) / G[t.kind[s]].cd));
      d = y < 0.15 ? 0.06 * (1 - y / 0.15) : y < 0.85 ? Hs((y - 0.15) / 0.7) * 0.5 : 0.5 * (1 - ((y - 0.85) / 0.15) ** 2);
    }
    let f = 0;
    const p = t.tgt[s];
    if (t.task[s] === Rt && p >= 0 && t.alive[p] && t.kind[p] >= bt) {
      const y = Jl(t, p, i, n, Math.sin(r), Math.cos(r), 0.62);
      y !== null && (f = Math.max(0, Math.min(0.9, y - 1.33)));
    }
    h.log.setMatrixAt(a, c.l.multiplyMatrices(c.b, this.trs(c.t, 0, 0.62, 0.05 + f - d)));
  }
}
const qt = "#6e4f37", Yt = "#8a6545", si = "#a0754c", ss = "#c9a75e", vs = "#b8954f", pa = "#cdb48a", Ai = "#9b968c", uo = "#b98b62", ks = "#b5813e", ma = "#8a857c", ga = "#a7a196";
function ba(e, t, s, a, i, o, n) {
  const r = n() * ge;
  e.add("cone7", o, k(t, 0, s, r, a * 2, i, a * 2));
  for (let l = 0; l < 3; l++) {
    const h = l * ge / 3 + r;
    e.add("cyl5", qt, k(t + Math.cos(h) * 0.08, i - 0.3, s + Math.sin(h) * 0.08, 0, 0.05, 0.6, 0.05, Math.sin(h) * 0.3, Math.cos(h) * 0.3));
  }
  e.add("box", "#3b2b1f", k(t + Math.sin(r) * a * 0.95, 0, s + Math.cos(r) * a * 0.95, r, 0.36, i * 0.4, 0.05, -Math.atan2(a, i)));
}
function fo(e, t, s, a, i, o, n, r, l, h = 0) {
  e.add("cyl8", r, k(t, 0, s, h, a * 2, o, i * 2)), e.add("cone7", l, k(t, o - 0.06, s, h, a * 2 + 0.44, n, i * 2 + 0.44));
  const c = o - 0.06 + n * 0.86, u = Math.sin(h), d = Math.cos(h), f = Math.cos(h), p = -Math.sin(h);
  for (const y of [-1, 1]) e.add("cyl5", qt, k(t + f * y * 0.05, c, s + p * y * 0.05, h, 0.045, 0.42, 0.045, 0, y * 0.62));
  e.add("box", "#3a2a1e", k(t + u * i * 0.94, 0, s + d * i * 0.94, h, 0.42, o * 0.8, 0.08));
}
function ai(e, t, s, a, i, o, n, r) {
  const l = Math.cos(n), h = -Math.sin(n), c = Math.sin(n), u = Math.cos(n);
  for (const [d, f] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) e.add("cyl5", qt, k(t + l * d * a / 2 + c * f * i / 2, 0, s + h * d * a / 2 + u * f * i / 2, 0, 0.07, f > 0 ? 1.15 : 1.35, 0.07));
  e.add("box", o, k(t, 1.24, s, n, a + 0.2, 0.05, i + 0.3, 0.18)), e.add("box", Yt, k(t + c * i * 0.3, 0, s + u * i * 0.3, n, a * 0.9, 0.55, 0.32)), r.forEach((d, f) => e.add(f % 2 ? "ico" : "cyl8", d, k(t + c * i * 0.3 + l * (f - (r.length - 1) / 2) * 0.24, 0.55, s + u * i * 0.3 + h * (f - (r.length - 1) / 2) * 0.24, 0, 0.17, f % 2 ? 0.17 : 0.2, 0.17)));
}
function Kl(e, t, s, a, i) {
  const o = Math.sin(a), n = Math.cos(a), r = Math.cos(a), l = -Math.sin(a);
  e.add("box", i, k(t, 0.78, s, a, 0.34, 0.42, 1));
  for (const [h, c] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) e.add("box", i, k(t + r * h * 0.12 + o * c * 0.36, 0, s + l * h * 0.12 + n * c * 0.36, a, 0.09, 0.8, 0.09));
  e.add("box", i, k(t + o * 0.52, 1, s + n * 0.52, a, 0.16, 0.5, 0.2, 0.5)), e.add("box", i, k(t + o * 0.72, 1.34, s + n * 0.72, a, 0.15, 0.17, 0.42, 0.25)), e.add("box", "#2a211b", k(t + o * 0.5, 1.1, s + n * 0.5, a, 0.05, 0.42, 0.12, 0.5)), e.add("box", "#2a211b", k(t - o * 0.52, 0.55, s - n * 0.52, a, 0.07, 0.42, 0.07, -0.25));
}
function po(e, t, s, a, i, o, n = 0) {
  e.add("cyl8", "#6b4a2f", k(t, s + i * Math.cos(n), a, o, i * 2, 0.08, i * 2, 0, Math.PI / 2 + n));
}
function ya(e, t, s, a = 1) {
  for (let i = 0; i < 9; i++) {
    const o = i / 9 * ge;
    e.add("dode", "#8a857c", k(t + Math.cos(o) * 0.5 * a, 0.05, s + Math.sin(o) * 0.5 * a, o, 0.24 * a, 0.18 * a, 0.24 * a));
  }
  e.add("cyl5", "#4a3526", k(t, 0.08, s, 0.3, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0)), e.add("cyl5", "#4a3526", k(t, 0.1, s, 1.9, 0.1, 0.8 * a, 0.1, Math.PI / 2, 0));
}
function va(e, t, s, a, i, o, n, r, l, h = 0, c = 0) {
  e.add("box", r, k(t, c, s, h, a, o, i)), e.add("prism", l, k(t, c + o - 0.04, s, h, a + 0.4, n, i + 0.36)), e.add("box", "#3a2a1e", k(t + Math.sin(h) * (i / 2 + 0.01), c, s + Math.cos(h) * (i / 2 + 0.01), h, Math.min(0.5, a * 0.3), o * 0.72, 0.06));
}
function mo(e, t, s, a) {
  for (let i = 0; i < s; i++) {
    const o = i / s * ge;
    e.add("box", Ai, k(Math.cos(o) * t, 0, Math.sin(o) * t, o, 0.3, a * (0.8 + i % 3 * 0.15), 0.22));
  }
}
function Xl(e, t) {
  const s = Math.round(t * 4);
  for (let a = 0; a <= s; a++) {
    const i = -t + a * 2 * t / s;
    for (const [o, n] of [[i, -t], [i, t], [-t, i], [t, i]]) e.add("cyl5", qt, k(o, 0, n, 0, 0.08, 0.6, 0.08));
  }
  for (const a of [0.25, 0.48])
    e.add("box", Yt, k(0, a, -t, 0, t * 2, 0.05, 0.05)), e.add("box", Yt, k(0, a, t, 0, t * 2, 0.05, 0.05)), e.add("box", Yt, k(-t, a, 0, 0, 0.05, 0.05, t * 2)), e.add("box", Yt, k(t, a, 0, 0, 0.05, 0.05, t * 2));
}
function ii(e, t, s, a) {
  e.add("ico", "#ece6d6", k(t, 0.32, s, a, 0.5, 0.36, 0.62)), e.add("box", "#3a332e", k(t + Math.sin(a) * 0.32, 0.36, s + Math.cos(a) * 0.32, a, 0.13, 0.16, 0.2));
  for (const [i, o] of [[-0.1, -0.15], [0.1, -0.15], [-0.1, 0.15], [0.1, 0.15]]) e.add("box", "#3a332e", k(t + i, 0, s + o, a, 0.05, 0.2, 0.05));
}
function Yl(e, t, s) {
  const a = new _i(s), i = Math.min(t, 2);
  switch (e) {
    case "center":
      if (i === 0)
        ya(a, 0, 0, 1), [0.4, 1.5, 2.6, 3.6, 4.7, 5.6].forEach((o, n) => ba(a, Math.cos(o) * 1.45, Math.sin(o) * 1.45, 0.48, 1.25 + n % 2 * 0.2, [si, "#8d6a46", "#b58a5d"][n % 3], s));
      else if (i === 1)
        va(a, 0, -0.4, 2.2, 3.2, 1.3, 1.5, pa, ss, Math.PI / 2), ya(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", k(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5));
      else {
        fo(a, 0, -0.45, 1.5, 1.02, 1.3, 1.75, pa, ss);
        for (const o of [-1, 1])
          a.add("cyl5", qt, k(o * 0.55, 0, 0.95, 0, 0.12, 1.45, 0.12)), a.add("cyl8", ks, k(o * 0.55, 0.95, 1.02, 0, 0.36, 0.05, 0.36, Math.PI / 2));
        a.add("box", Yt, k(0, 1.42, 0.85, 0, 1.4, 0.1, 0.36)), ya(a, 1.2, 1.3, 0.6), a.add("cyl8", "#a0654a", k(-1.3, 0, 1.3, 0, 0.5, 0.55, 0.5)), a.add("cyl8", "#8a5a40", k(-1, 0, 1.55, 0, 0.32, 0.38, 0.32));
      }
      break;
    case "house":
      i === 0 ? (ba(a, 0, 0, 0.8, 1.5, si, s), a.add("box", "#9a7148", k(0.6, 0, 0.6, 0.4, 0.3, 0.4, 0.03))) : i === 1 ? va(a, 0, 0, 1.3, 1.6, 1, 0.95, pa, vs, s() < 0.5 ? 0 : Math.PI / 2) : (fo(a, 0, -0.08, 0.66, 0.5, 0.85, 1, uo, vs), a.add("cyl8", "#a0654a", k(0.62, 0, 0.62, 0, 0.26, 0.32, 0.26)));
      break;
    case "depot":
      if (i === 0) {
        for (let o = 0; o < 6; o++) a.add("cyl5", "#5e4431", k(-0.3, 0.1 + o % 3 * 0.18, -0.35 + Math.floor(o / 3) * 0.18 + o % 3 * 0.05, 0.2, 0.17, 1.2, 0.17, Math.PI / 2, 0));
        a.add("prism", si, k(0.35, 0, 0.3, 0.3, 1, 0.8, 1.1)), a.add("cyl8", "#b48a5c", k(0.55, 0, -0.5, 0, 0.3, 0.3, 0.3));
      } else if (i === 1) {
        for (const [o, n] of [[-0.45, -0.45], [0.45, -0.45], [-0.45, 0.45], [0.45, 0.45]]) a.add("cyl5", qt, k(o, 0, n, 0, 0.13, 0.6, 0.13));
        a.add("cyl8", pa, k(0, 0.6, 0, 0, 1.3, 0.8, 1.3)), a.add("cone7", ss, k(0, 1.38, 0, 0, 1.8, 0.9, 1.8));
      } else {
        for (const [o, n] of [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.1], [0.5, 0.1]]) a.add("cyl5", qt, k(o, 0, n, 0, 0.12, 0.5, 0.12));
        a.add("box", Yt, k(0, 0.5, -0.22, 0, 1.25, 0.75, 0.9)), a.add("prism", ss, k(0, 1.22, -0.22, Math.PI / 2, 1.2, 0.6, 1.6)), a.add("cyl8", "#a0654a", k(-0.55, 0, 0.62, 0, 0.3, 0.42, 0.3)), a.add("cyl8", "#8a5a40", k(-0.22, 0, 0.7, 0, 0.26, 0.36, 0.26));
        for (let o = 0; o < 3; o++) a.add("box", ks, k(0.42, o * 0.07, 0.62 + o % 2 * 0.03, o % 2 ? 0.2 : -0.1, 0.36, 0.07, 0.12));
      }
      break;
    case "military":
      if (i === 0) {
        mo(a, 1.15, 10, 0.32), ba(a, -0.55, -0.5, 0.5, 1.2, "#8d6a46", s);
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", k(0.6 + o * 0.12, 0, 0.55, 0, 0.04, 1.3, 0.04, 0.12));
        a.add("cyl5", qt, k(0.5, 0, -0.6, 0, 0.12, 0.9, 0.12));
      } else if (i === 1) {
        va(a, -0.3, -0.2, 1.8, 2.2, 1.2, 1.2, "#c4a77c", vs, 0);
        for (let o = 0; o < 7; o++) a.add("cyl5", Yt, k(-1.3 + o * 0.4, 0, 1.25, 0, 0.14, 0.9 + o % 2 * 0.15, 0.14));
        for (let o = 0; o < 3; o++) a.add("cyl5", "#8a6a48", k(1, 0, -0.6 + o * 0.25, 0, 0.04, 1.3, 0.04, 0, 0.1));
      } else {
        a.add("box", ma, k(-0.15, 0, -0.45, 0, 2.6, 0.25, 1.35)), va(a, -0.15, -0.45, 1.25, 2.5, 0.85, 0.85, "#9c7a52", vs, Math.PI / 2, 0.25), a.add("box", qt, k(0.9, 0, 0.75, 0, 0.9, 0.08, 0.1));
        for (let o = 0; o < 4; o++) a.add("cyl5", "#8a6a48", k(0.6 + o * 0.2, 0, 0.72, 0, 0.04, 1.35, 0.04, -0.12));
        a.add("cyl5", qt, k(-0.9, 0, 0.8, 0, 0.1, 1.2, 0.1)), a.add("box", qt, k(-0.9, 0.85, 0.8, 0, 0.6, 0.08, 0.08)), a.add("cyl8", ks, k(-0.9, 0.62, 0.87, 0, 0.42, 0.05, 0.42, Math.PI / 2));
      }
      break;
    case "farm":
      a.add("box", "#7d5f3e", k(0, -0.02, 0, 0, 3, 0.08, 3), 0.02);
      for (let o = 0; o < 4; o++) a.add("box", "#6b4f33", k(0, 0.03, -1.12 + o * 0.75, 0, 2.8, 0.07, 0.28), 0.03);
      for (const [o, n] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) a.add("cyl5", Yt, k(o, 0, n, 0, 0.08, 0.5, 0.08));
      break;
    case "pen":
      Xl(a, 1.35), ii(a, -0.5, -0.3, 0.6), ii(a, 0.45, 0.2, 2.5), ii(a, -0.2, 0.65, 4.1), a.add("box", "#a0754c", k(0.8, 0, -0.8, 0.3, 0.5, 0.2, 0.3));
      break;
    case "sanctuary":
      if (i < 2)
        a.add("box", "#a8a397", k(0, -0.1, 0, 0.3, 0.5, 2, 0.35, 0.05)), mo(a, 0.85, 8, 0.45), a.add("dode", "#8a857c", k(0.5, 0, 0.45, 0, 0.4, 0.3, 0.4));
      else {
        for (const [o, n] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) a.add("cyl5", qt, k(o, 0, n, 0, 0.1, 1.15, 0.1));
        a.add("cone4", ss, k(0, 1.1, 0, Math.PI / 4, 1.9, 0.75, 1.9)), a.add("box", ga, k(0, 0, 0, 0, 0.6, 0.55, 0.45)), a.add("cyl8", ks, k(0, 0.55, 0, 0, 0.32, 0.08, 0.32)), a.add("box", "#a8a397", k(-0.75, -0.1, 0.75, 0.3, 0.3, 1.2, 0.22, 0.05)), a.add("box", "#a8a397", k(0.78, -0.1, 0.72, -0.4, 0.26, 1, 0.2, -0.05));
      }
      break;
    case "camp":
      ya(a, 0, 0, 1);
      for (let o = 0; o < 4; o++) {
        const n = o / 4 * ge + 0.4;
        ba(a, Math.cos(n) * 1.4, Math.sin(n) * 1.4, 0.55, 1.4, ["#6b5a45", "#5d5040", "#7a6248"][o % 3], s);
      }
      for (let o = 0; o < 9; o++) {
        const n = -0.9 + o * 0.22;
        a.add("cyl5", "#5a4030", k(Math.cos(n) * 1.95, 0, Math.sin(n) * 1.95, 0, 0.16, 1.1 + o % 2 * 0.2, 0.16));
      }
      break;
    // ── Idade dos Metais ──
    case "forge":
      a.add("box", uo, k(0, 0, -0.75, 0, 1.8, 1.05, 0.2));
      for (const o of [-1, 1]) a.add("cyl5", qt, k(o * 0.82, 0, 0.1, 0, 0.1, 1.05, 0.1));
      a.add("prism", vs, k(0, 1, -0.3, 0, 2, 0.6, 1.2)), a.add("ico", "#a5603f", k(0.45, 0.32, -0.25, 0, 0.75, 0.72, 0.7)), a.add("cyl5", "#8f5236", k(0.55, 0.5, -0.45, 0, 0.2, 1.25, 0.2)), a.add("box", "#2b1d16", k(0.45, 0.12, 0.08, 0, 0.26, 0.22, 0.06)), a.add("box", ma, k(-0.42, 0, 0.35, 0.3, 0.32, 0.38, 0.3)), a.add("box", "#5c5a57", k(-0.42, 0.38, 0.35, 0.3, 0.42, 0.1, 0.18));
      for (let o = 0; o < 3; o++) a.add("box", ks, k(-0.55 + o * 0.05, o * 0.06, -0.35, 0.1 * o, 0.3, 0.06, 0.1));
      break;
    case "market":
      ai(a, -0.72, -0.7, 1.1, 0.8, "#b5523b", 0, ["#a0654a", "#d9a43a", "#8a5a40"]), ai(a, 0.78, -0.55, 1, 0.8, "#d8b45a", -0.25, ["#bdb6a8", "#7a5634", "#a0654a"]), ai(a, -0.05, 0.85, 1.2, 0.75, "#5b7f9a", Math.PI, [ks, "#d9a43a", "#bdb6a8"]), a.add("cyl8", "#a0654a", k(0.95, 0, 0.75, 0, 0.3, 0.45, 0.3)), a.add("cyl8", "#c9a75e", k(1.15, 0, 0.45, 0, 0.32, 0.22, 0.32)), a.add("ico", "#d6c49a", k(1.05, 0.15, 1.05, 0, 0.3, 0.3, 0.3));
      break;
    case "stable":
      a.add("box", Yt, k(0, 0, -1.2, 0, 2.7, 1, 0.16));
      for (const o of [-1, 1]) a.add("box", Yt, k(o * 1.3, 0, -0.75, 0, 0.14, 1, 0.9));
      for (let o = 0; o < 4; o++) a.add("cyl5", qt, k(-1.3 + o * 0.866, 0, -0.32, 0, 0.11, 1, 0.11));
      a.add("prism", ss, k(0, 0.97, -0.76, 0, 3, 0.62, 1.3));
      for (let o = 0; o < 5; o++) a.add("cyl5", qt, k(-1.35 + o * 0.675, 0, 1.35, 0, 0.08, 0.62, 0.08));
      for (const o of [0.28, 0.52]) a.add("box", Yt, k(0, o, 1.35, 0, 2.75, 0.05, 0.05));
      Kl(a, 0.2, 0.55, -1.2, "#7a5236"), a.add("box", "#d6b85a", k(-1, 0, 0.6, 0.3, 0.5, 0.36, 0.38)), a.add("box", "#c9ab50", k(-1.05, 0.36, 0.62, 0.4, 0.46, 0.32, 0.34));
      break;
    case "workshop":
      for (const [o, n] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, -0.2], [1.2, -0.2]]) a.add("cyl5", qt, k(o, 0, n, 0, 0.12, 1.15, 0.12));
      a.add("prism", vs, k(0, 1.12, -0.7, 0, 2.8, 0.6, 1.4)), a.add("box", Yt, k(0, 0, -1.25, 0, 2.5, 0.9, 0.12));
      for (const o of [-1, 1])
        a.add("box", qt, k(o * 0.32, 0.35, 0.55, 0, 0.1, 0.1, 1.5)), a.add("box", qt, k(o * 0.32, 0.35, 0.55, 0, 0.1, 0.75, 0.1));
      a.add("box", qt, k(0, 1.05, 0.55, 0, 0.75, 0.1, 0.1)), a.add("cyl8", "#5e4431", k(0, 0.65, 0.4, 0, 0.26, 1.5, 0.26, Math.PI / 2));
      for (const o of [-1, 1]) for (const n of [-0.1, 1.2]) a.add("box", Yt, k(o * 0.32, 0, n, 0, 0.16, 0.35, 0.16));
      a.add("cyl5", "#4a3a2c", k(0, 0.77, 0.55, 0, 0.03, 0.3, 0.03)), po(a, -0.95, 0, 0.9, 0.3, 0.4, -0.12), po(a, 1.05, 0.02, 0.35, 0.3, -0.3, 0.1);
      for (let o = 0; o < 3; o++) a.add("cyl5", "#5e4431", k(0.9, 0.1 + o % 2 * 0.16, -0.65 + o * 0.12, Math.PI / 2, 0.18, 1.1, 0.18, Math.PI / 2));
      break;
    case "wall":
      a.add("box", ma, k(0, 0, 0, 0, 1, 0.55, 1), 0.1);
      for (const [o, n, r] of [[-0.25, -0.25, Ai], [0.25, -0.25, ga], [-0.25, 0.25, ga], [0.25, 0.25, Ai]]) a.add("box", r, k(o, 0.55, n, (o + n) * 0.4, 0.5, 0.36 + Math.abs(o - n) * 0.2, 0.5), 0.12);
      a.add("dode", ma, k(0, 0.95, 0, 0.4, 0.5, 0.3, 0.5));
      break;
    case "tower":
      a.add("cyl8", "#b3ada2", k(0, 0, 0, 0.2, 1.5, 2.2, 1.5)), a.add("cyl8", ga, k(0, 0, 0, 0.6, 1.62, 0.4, 1.62)), a.add("cyl8", "#9d978b", k(0, 1.15, 0, 0.4, 1.56, 0.12, 1.56)), a.add("box", "#2b211a", k(0, 0, 0.7, 0, 0.42, 0.8, 0.14)), a.add("box", "#2b211a", k(0.55, 1.4, 0.48, 0.8, 0.08, 0.3, 0.12)), a.add("box", Yt, k(0, 2.2, 0, 0, 1.8, 0.14, 1.8));
      for (let o = 0; o < 8; o++) {
        const n = o / 8 * ge;
        a.add("cyl5", qt, k(Math.cos(n) * 0.84, 2.3, Math.sin(n) * 0.84, 0, 0.08, 0.95, 0.08));
      }
      for (const [o, n, r] of [[0, 0.85, 0], [0, -0.85, 0], [0.85, 0, Math.PI / 2], [-0.85, 0, Math.PI / 2]]) a.add("box", qt, k(o, 2.62, n, r, 1.7, 0.08, 0.06));
      a.add("cone4", ss, k(0, 3.2, 0, Math.PI / 4, 2.6, 1, 2.6));
      break;
  }
  return a.build();
}
function Zl(e, t, s) {
  const a = [], i = [], o = new Kt(), n = (u, d) => dt(e, u, d), r = (u, d, f, p, y, g) => {
    const x = [[u, d], [u, p], [f, p], [f, d]].map(([M, v]) => [M, n(M, v) + y, v]);
    o.set(g);
    for (const M of [0, 1, 3, 1, 2, 3])
      a.push(...x[M]), i.push(o.r, o.g, o.b);
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
  const l = new _i();
  for (const [u, d] of [[-1.45, -1.45], [1.45, -1.45], [-1.45, 1.45], [1.45, 1.45]]) l.add("cyl5", Yt, k(t + u, n(t + u, s + d), s + d, 0, 0.08, 0.5, 0.08));
  const h = l.build();
  a.push(...h.attributes.position.array), i.push(...h.attributes.color.array);
  const c = new Ze();
  return c.setAttribute("position", new ds(a, 3)), c.setAttribute("color", new ds(i, 3)), c.computeVertexNormals(), c.computeBoundingSphere(), c;
}
const go = /* @__PURE__ */ new Map();
function Js(e, t) {
  const s = Math.min(t, 2), a = e + s;
  let i = go.get(a);
  return i || (i = Yl(e, s, Mn(e.length * 31 + s)), go.set(a, i)), i;
}
const ka = new Ko(), bo = new Tt(), yo = new Tt(), vo = new Tt(), ko = new Tt();
function Jl(e, t, s, a, i, o, n) {
  const r = Et[e.kind[t] - bt], l = e.owner[t], h = Math.min(l >= 0 && l < e.players.length ? e.players[l].era : 0, 2), c = Js(r.key, h), u = c.attributes.position.array, d = e.done[t] ? 1 : Math.max(0.12, Math.min(1, e.work[t] / (r.time * 100))), f = e.x[t] / 256, p = e.z[t] / 256, y = r.key === "farm" ? 0 : (t * 2654435761 >>> 0) % 4 * Math.PI / 2, g = Math.cos(y), x = Math.sin(y), M = s - f, v = a - p, w = M * g - v * x, B = M * x + v * g, A = i * g - o * x, T = i * x + o * g, S = Math.hypot(A, T) || 1;
  let $ = 1 / 0;
  for (const O of [0, 0.1, -0.1]) {
    ka.origin.set(w - T / S * O, n / d, B + A / S * O), ka.direction.set(A / S, 0, T / S);
    for (let z = 0; z + 8 < u.length; z += 9) {
      if (bo.set(u[z], u[z + 1], u[z + 2]), yo.set(u[z + 3], u[z + 4], u[z + 5]), vo.set(u[z + 6], u[z + 7], u[z + 8]), !ka.intersectTriangle(bo, yo, vo, !1, ko)) continue;
      const P = ko.distanceTo(ka.origin);
      P < $ && ($ = P);
    }
  }
  return $ < 1 / 0 ? $ : null;
}
const Ql = wt((e) => e.add("cyl5", qt, k(0, 0, 0, 0, 0.06, 2, 0.06), 0)), tc = new oe(0.42, 0.34, 0.03).translate(0.24, 1.75, 0);
class ec {
  constructor() {
    m(this, "group", new Bs());
    m(this, "meshes", /* @__PURE__ */ new Map());
    m(this, "poles");
    m(this, "flags");
    m(this, "crops");
    m(this, "fair");
    m(this, "mat", Dt({ vertexColors: !0 }));
    m(this, "farms", /* @__PURE__ */ new Map());
    m(this, "fires", []);
    m(this, "smokes", []);
    this.poles = new Ut(Ql, Dt({ vertexColors: !0 }), 256), this.flags = new Ut(tc, Dt({}, { NO_SNOW: "" }), 256);
    const t = wt((a) => {
      for (let i = 0; i < 3; i++) a.add("cone4", "#ffffff", k((i - 1) * 0.1, 0, i % 2 * 0.08, i, 0.1, 0.75, 0.1, (i - 1) * 0.15, 0), 0.1);
    });
    this.crops = new Ut(t, Dt({ vertexColors: !0 }, { CROP: "", CROPCOL: "", WIND: "", WIND_AMP: "0.06", WIND_BYH: "true", SNOW_K: "0.5" }), 2560), this.crops.customDepthMaterial = xn({ CROP: "" });
    const s = wt((a) => {
      const i = [[-1.38, -1.38], [1.38, -1.38], [1.38, 1.38], [-1.38, 1.38]], o = ["#e0533c", "#f2c14e", "#5bb39a", "#5b7f9a", "#efe6cf"];
      for (const [n, r] of i) a.add("cyl5", qt, k(n, 0, r, 0, 0.07, 2.05, 0.07), 0);
      for (let n = 0; n < 4; n++) {
        const [r, l] = i[n], [h, c] = i[(n + 1) % 4], u = Math.hypot(h - r, c - l), d = Math.atan2(h - r, c - l);
        a.add("box", "#e8e2d4", k((r + h) / 2, 1.95, (l + c) / 2, d, 0.015, 0.015, u), 0);
        for (let f = 1; f < 8; f++) {
          const p = f / 8, y = Math.sin(p * Math.PI) * 0.18;
          a.add("cone4", o[(f + n) % o.length], k(r + (h - r) * p, 1.95 - y - 0.2, l + (c - l) * p, d, 0.16, 0.2, 0.03, Math.PI), 0);
        }
      }
    });
    this.fair = new Ut(s, Dt({ vertexColors: !0 }), 16);
    for (const a of [this.poles, this.flags, this.crops, this.fair])
      a.instanceMatrix.setUsage(ue), a.frustumCulled = !1, a.castShadow = !0, a.receiveShadow = !0, a.count = 0, this.group.add(a);
    for (let a = 0; a < 256; a++) this.flags.setColorAt(a, new Kt("#ffffff"));
  }
  mesh(t, s) {
    const a = t + s;
    let i = this.meshes.get(a);
    return i || (i = new Ut(Js(t, s), this.mat, t === "center" || t === "camp" ? 8 : 64), i.instanceMatrix.setUsage(ue), i.frustumCulled = !1, i.castShadow = !0, i.receiveShadow = !0, i.count = 0, this.meshes.set(a, i), this.group.add(i)), i;
  }
  /** atualiza tudo a partir do mundo (≈100 construções: barato) */
  update(t, s, a, i = 0) {
    const o = /* @__PURE__ */ new Map();
    let n = 0, r = 0, l = 0;
    const h = t.size, c = t.explored[s];
    this.fires.length = 0, this.smokes.length = 0;
    const u = new Kt(), d = /* @__PURE__ */ new Set();
    for (let f = 0; f < t.top; f++) {
      if (!t.alive[f] || t.kind[f] < bt) continue;
      const p = Et[t.kind[f] - bt], y = t.owner[f], g = t.x[f] / 256, x = t.z[f] / 256;
      if (a && y !== s && !c[Math.floor(x) * h + Math.floor(g)]) continue;
      const M = y >= 0 && y < t.players.length ? t.players[y].era : 0;
      if (p.key === "farm") {
        let $ = this.farms.get(f);
        if ($ && ($.x !== g || $.z !== x) && (this.group.remove($.mesh), $.mesh.geometry.dispose(), $ = void 0), !$) {
          const O = new Ne(Zl(t.map, g, x), this.mat);
          O.receiveShadow = O.castShadow = !0, this.group.add(O), $ = { mesh: O, x: g, z: x }, this.farms.set(f, $);
        }
        if ($.mesh.visible = !0, d.add(f), t.done[f]) for (let O = 0; O < 4; O++) for (let z = 0; z < 9 && r < this.crops.instanceMatrix.count; z++) {
          const P = g - 1.25 + z * 0.31, F = x - 1.12 + O * 0.75;
          this.crops.setMatrixAt(r++, k(P, dt(t.map, P, F) + 0.08, F, (z * 7 + O) % 6, 1, 0.85 + (z + O) % 3 * 0.12, 1));
        }
        continue;
      }
      const v = this.mesh(p.key, Math.min(M, 2)), w = o.get(v) ?? 0;
      if (w >= v.instanceMatrix.count) continue;
      const B = dt(t.map, g, x), A = t.done[f] === 1, T = A ? 1 : Math.max(0.12, Math.min(1, t.work[f] / (p.time * 100))), S = (f * 2654435761 >>> 0) % 4 * Math.PI / 2;
      if (v.setMatrixAt(w, k(g, B - 0.02, x, p.key === "farm" ? 0 : S, 1, T, 1)), o.set(v, w + 1), p.key !== "farm" && !p.wall && A && n < 256) {
        const $ = p.size / 2 - 0.25, O = g + $, z = x - $;
        this.poles.setMatrixAt(n, k(O, dt(t.map, O, z), z)), this.flags.setMatrixAt(n, k(O, dt(t.map, O, z), z, Math.sin(i * 1.1 + f) * 0.15)), this.flags.setColorAt(n, u.set(y === Ee ? "#efe6cf" : t.players[y]?.color ?? "#888")), n++;
      }
      if (A && p.key === "forge") {
        const z = g + 0.45 * Math.cos(S) + 0.12 * Math.sin(S), P = x - 0.45 * Math.sin(S) + 0.12 * Math.cos(S), F = g + 0.55 * Math.cos(S) - 0.45 * Math.sin(S), E = x - 0.55 * Math.sin(S) - 0.45 * Math.cos(S);
        this.fires.push({ x: z, y: dt(t.map, z, P) + 0.1, z: P, s: 0.16 }), this.smokes.push({ x: F, y: dt(t.map, F, E) + 1.5, z: E, s: 0.6 });
      }
      if (A && p.market && t.fair && l < 16 && this.fair.setMatrixAt(l++, k(g, B - 0.02, x, S)), A && (p.key === "center" || p.key === "camp")) {
        const $ = M >= 1 && p.key === "center", O = $ ? g + 1.2 * Math.cos(S) + 1.3 * Math.sin(S) : g, z = $ ? x - 1.2 * Math.sin(S) + 1.3 * Math.cos(S) : x;
        this.fires.push({ x: O, y: dt(t.map, O, z) + 0.15, z, s: M >= 1 && p.key === "center" ? 0.42 : 0.6 }), this.smokes.push({ x: O, y: dt(t.map, O, z) + 0.3, z, s: 1 });
      }
    }
    for (const f of this.meshes.values())
      f.count = o.get(f) ?? 0, f.instanceMatrix.needsUpdate = !0;
    for (const [f, p] of this.farms) d.has(f) || (!t.alive[f] || t.kind[f] !== bt + Vt.farm ? (this.group.remove(p.mesh), p.mesh.geometry.dispose(), this.farms.delete(f)) : p.mesh.visible = !1);
    this.poles.count = this.flags.count = n, this.poles.instanceMatrix.needsUpdate = this.flags.instanceMatrix.needsUpdate = !0, this.flags.instanceColor && (this.flags.instanceColor.needsUpdate = !0), this.crops.count = r, this.crops.instanceMatrix.needsUpdate = !0, this.fair.count = l, this.fair.instanceMatrix.needsUpdate = !0;
  }
}
class sc {
  constructor(t = 48) {
    m(this, "mesh");
    this.mesh = new Ut(new fi(0.32, 1, 6).translate(0, 0.5, 0), Ui(new cs({ color: 16777215, toneMapped: !1 }), { NO_SNOW: "" }), t), this.mesh.instanceMatrix.setUsage(ue), this.mesh.frustumCulled = !1;
    for (let s = 0; s < t; s++) this.mesh.setColorAt(s, new Kt(s % 2 ? "#ffd166" : "#ff7b2e"));
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
const ac = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`, ic = `varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class oc {
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
    m(this, "geo", new Ze());
    m(this, "mat");
    m(this, "points");
    this.n = s, this.pos = new Float32Array(s * 3), this.a = new Float32Array(s), this.sz = new Float32Array(s).fill(1), this.colr = new Float32Array(s * 3), this.age = new Float32Array(s).fill(99), this.life = new Float32Array(s), this.vel = new Float32Array(s * 3), this.grow = new Float32Array(s), this.geo.setAttribute("position", new Me(this.pos, 3).setUsage(ue)), this.geo.setAttribute("aA", new Me(this.a, 1).setUsage(ue)), this.geo.setAttribute("aS", new Me(this.sz, 1).setUsage(ue)), this.geo.setAttribute("aC", new Me(this.colr, 3).setUsage(ue)), this.mat = new qi({ transparent: !0, depthWrite: !1, uniforms: { ...t, uPR: { value: 1 }, uSize: { value: 2.6 } }, vertexShader: ac, fragmentShader: ic }), this.points = new Xo(this.geo, this.mat), this.points.frustumCulled = !1, this.points.renderOrder = 3;
  }
  emit(t, s, a, i, o, n, r, l, h, c) {
    const u = this.next;
    this.next = (this.next + 1) % this.n, this.pos.set([t, s, a], u * 3), this.vel.set([i, o, n], u * 3), this.colr.set([c.r, c.g, c.b], u * 3), this.age[u] = 0, this.life[u] = r, this.sz[u] = l, this.grow[u] = h;
  }
  smoke(t, s) {
    this.acc += t;
    const a = new Kt(0.86, 0.85, 0.83);
    for (; this.acc > 0.2; ) {
      this.acc -= 0.2;
      for (const i of s) Math.random() < 0.5 && this.emit(i.x + (Math.random() - 0.5) * 0.2, i.y + 0.4, i.z + (Math.random() - 0.5) * 0.2, 0.2 + Math.random() * 0.2, 0.6 + Math.random() * 0.4, 0.1 + Math.random() * 0.15, 3.5 + Math.random() * 2, 0.5, 1.6, a);
    }
  }
  /** nuvem de poeira (queda de unidade, obra pronta, construção destruída) */
  puff(t, s, a, i) {
    const o = new Kt(0.62, 0.55, 0.45), n = i ? 22 : 9;
    for (let r = 0; r < n; r++) {
      const l = Math.random() * ge, h = (i ? 1.4 : 0.7) * (0.4 + Math.random());
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
class nc {
  constructor() {
    m(this, "group", new Bs());
    m(this, "spears");
    m(this, "arrows");
    m(this, "stones");
    m(this, "list", []);
    m(this, "ray", new Ko());
    m(this, "ta", new Tt());
    m(this, "tb", new Tt());
    m(this, "tc", new Tt());
    m(this, "th", new Tt());
    const t = wt((o) => {
      o.add("cyl5", "#7a5a3c", k(0, -1.88, 0, 0, 0.035, 1.7, 0.035), 0), o.add("cone4", "#b9b4aa", k(0, -0.18, 0, 0, 0.065, 0.18, 0.065), 0);
    }).rotateX(Math.PI / 2), s = wt((o) => {
      o.add("cyl5", "#8a6a48", k(0, -0.72, 0, 0, 0.018, 0.64, 0.018), 0), o.add("cone4", "#b9b4aa", k(0, -0.1, 0, 0, 0.045, 0.1, 0.045), 0), o.add("box", "#e8e2d4", k(0, -0.7, 0, 0, 0.012, 0.12, 0.07), 0), o.add("box", "#e8e2d4", k(0, -0.7, 0, 0, 0.07, 0.12, 0.012), 0);
    }).rotateX(Math.PI / 2), a = wt((o) => o.add("dode", "#8f8a80", k(0, 0, -0.05, 0, 0.11, 0.1, 0.11), 0)), i = Dt({ vertexColors: !0 }, { NO_SNOW: "" });
    this.spears = new Ut(t, i, 96), this.arrows = new Ut(s, i, 96), this.stones = new Ut(a, i, 96);
    for (const o of [this.spears, this.arrows, this.stones])
      o.instanceMatrix.setUsage(ue), o.frustumCulled = !1, o.castShadow = !0, o.count = 0, this.group.add(o);
  }
  /** gap = distância até a superfície do alvo (a mesma que decide arremesso ou estocada); tk = tipo do alvo; te = o alvo; h = altura de saída (torre) */
  add(t, s, a, i, o, n, r, l, h, c, u) {
    const d = r === "arrow", f = r === "stone";
    if (r === "spear" && l < zi) return;
    let p, y, g;
    if (h >= bt) {
      const S = t.alive[c] ? this.hitBuilding(t, c, s, a) : null;
      S ? (p = S.x, y = S.z, g = S.y) : (p = i, y = o, g = dt(t.map, i, o) + 0.08);
    } else {
      const S = Math.hypot(i - s, o - a) || 1, $ = S - (G[h]?.radius ?? 0.3) * 0.8;
      p = s + (i - s) / S * $, y = a + (o - a) / S * $, g = dt(t.map, p, y) + An(h);
    }
    const x = Math.hypot(p - s, y - a) || 1, M = (p - s) / x, v = (y - a) / x, w = u !== void 0 ? 0.9 : d ? 0.75 : f ? 0.3 : 1.7;
    if (x - w < 0.15) return;
    const B = s + M * w, A = a + v * w, T = u !== void 0 ? dt(t.map, s, a) + u : dt(t.map, B, A) + (d ? 0.88 : f ? 1.55 : 1.1);
    this.list.push({
      x0: B,
      z0: A,
      y0: T,
      x1: p,
      z1: y,
      y1: g,
      arc: (x - w) * (d ? 0.1 : f ? 0.07 : 0.18),
      t: 0,
      dur: Math.max(0.15, n / 10),
      kind: r
    });
  }
  /** primeiro ponto do modelo da construção na direção de quem atira (raio contra os triângulos), em coordenadas do mundo */
  hitBuilding(t, s, a, i) {
    const o = Et[t.kind[s] - bt], n = t.owner[s], r = Math.min(n >= 0 && n < t.players.length ? t.players[n].era : 0, 2), l = Js(o.key, r), h = l.attributes.position.array, c = t.done[s] ? 1 : Math.max(0.12, Math.min(1, t.work[s] / (o.time * 100))), u = t.x[s] / 256, d = t.z[s] / 256, f = dt(t.map, u, d) - 0.02, p = o.key === "farm" ? 0 : (s * 2654435761 >>> 0) % 4 * Math.PI / 2, y = a - u, g = i - d, x = Math.cos(p), M = Math.sin(p), v = y * x - g * M, w = y * M + g * x, B = Math.hypot(v, w) || 1, A = -v / B, T = -w / B, S = -T, $ = A;
    let O = 0, z = 0, P = 0, F = !1;
    for (const E of [0, 0.35, -0.35, 0.7, -0.7, 1.05, -1.05, 1.4, -1.4]) {
      let _ = 1 / 0;
      for (const q of [0.9, 0.6, 0.35]) {
        const Y = v + S * E, j = w + $ * E, Z = -(Y * A + j * T);
        this.ray.origin.set(Y, q / c, j), this.ray.direction.set(A, 0, T);
        for (let J = 0; J + 8 < h.length; J += 9) {
          if (this.ta.set(h[J], h[J + 1], h[J + 2]), this.tb.set(h[J + 3], h[J + 4], h[J + 5]), this.tc.set(h[J + 6], h[J + 7], h[J + 8]), !this.ray.intersectTriangle(this.ta, this.tb, this.tc, !1, this.th)) continue;
          const ut = this.th.distanceTo(this.ray.origin);
          ut > Z + 0.1 || ut >= _ || (_ = ut, O = this.th.x + A * 0.05, z = this.th.y, P = this.th.z + T * 0.05);
        }
      }
      if (_ < 1 / 0) {
        F = !0;
        break;
      }
    }
    return F ? { x: u + O * x + P * M, y: f + z * c, z: d - O * M + P * x } : null;
  }
  update(t) {
    let s = 0, a = 0, i = 0;
    const o = [], n = new Bi(), r = new Tt(), l = new Tt(1, 1, 1), h = new Tt(), c = new Tt(0, 0, 1), u = new he();
    for (const d of this.list) {
      if (d.t += t, d.t > d.dur + (d.kind === "stone" ? 0.03 : 0.35)) continue;
      !d.hit && d.t >= d.dur && (d.hit = !0, ke.emit(d.kind === "arrow" ? "arrow.hit" : d.kind === "stone" ? "stone.hit" : "spear.hit", d.x1, d.z1));
      const f = d.kind === "arrow" ? this.arrows : d.kind === "stone" ? this.stones : this.spears, p = d.kind === "arrow" ? a : d.kind === "stone" ? i : s;
      if (p >= 96) continue;
      o.push(d);
      const y = Math.min(1, d.t / d.dur);
      r.set(d.x0 + (d.x1 - d.x0) * y, d.y0 + (d.y1 - d.y0) * y + Math.sin(y * Math.PI) * d.arc, d.z0 + (d.z1 - d.z0) * y), h.set(d.x1 - d.x0, d.y1 - d.y0 + Math.cos(y * Math.PI) * d.arc * Math.PI, d.z1 - d.z0).normalize(), n.setFromUnitVectors(c, h), f.setMatrixAt(p, u.compose(r, n, l)), d.kind === "arrow" ? a++ : d.kind === "stone" ? i++ : s++;
    }
    this.list = o, this.spears.count = s, this.arrows.count = a, this.stones.count = i, this.spears.instanceMatrix.needsUpdate = this.arrows.instanceMatrix.needsUpdate = this.stones.instanceMatrix.needsUpdate = !0;
  }
}
const rc = (e, t, s) => e + (t - e) * s, lc = (e, t, s) => {
  const a = Math.min(1, Math.max(0, (s - e) / (t - e)));
  return a * a * (3 - 2 * a);
};
class cc {
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
    this.map = t, this.cam = new br(42, 1, 0.5, 900), this.x = this.tx = s, this.z = this.tz = a, this.yaw = this.tyaw = i, this.dist = 70, this.tdist = 44;
  }
  pitch(t = this.dist) {
    return rc(0.66, 1.12, lc(this.minD, this.maxD, t));
  }
  update(t) {
    const s = 1 - Math.exp(-t * 9), a = this.map.size;
    this.tx = Math.min(a - 8, Math.max(8, this.tx)), this.tz = Math.min(a - 8, Math.max(8, this.tz)), this.tdist = Math.min(this.maxD, Math.max(this.minD, this.tdist)), this.x += (this.tx - this.x) * s, this.z += (this.tz - this.z) * s, this.yaw += (this.tyaw - this.yaw) * s, this.dist += (this.tdist - this.dist) * s;
    const i = this.pitch(), o = Math.max(dt(this.map, this.x, this.z), 0), n = Math.cos(i) * this.dist;
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
    const o = new Tt(t / a * 2 - 1, -(s / i) * 2 + 1, 0.5).unproject(this.cam), n = this.cam.position.clone(), r = o.sub(n).normalize();
    let l = 0, h = 0;
    const c = this.map.size;
    for (let u = 0; u < 400; u++) {
      l += 0.6 + l * 0.01;
      const d = n.x + r.x * l, f = n.y + r.y * l, p = n.z + r.z * l;
      if (d < -20 || p < -20 || d > c + 20 || p > c + 20 || l > 900) return null;
      if (f <= Math.max(dt(this.map, d, p), -0.1)) {
        let y = h, g = l;
        for (let x = 0; x < 12; x++) {
          const M = (y + g) / 2;
          n.y + r.y * M <= Math.max(dt(this.map, n.x + r.x * M, n.z + r.z * M), -0.1) ? g = M : y = M;
        }
        return new Tt(n.x + r.x * g, n.y + r.y * g, n.z + r.z * g);
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
const xo = [
  { grassA: "#6fa84a", grassB: "#93c25a", leaf: "#7cbc4c", leafAmt: 1, crop: 0.32, cropC: "#86c457", flower: 1, snow: 0, sun: "#fff2dc", sunI: 2.7, elev: 0.95, top: "#78ade0", hor: "#d3e6ef", hS: "#cfe6ff", hG: "#6b7a4a", hI: 1, fog: "#cfe2eb", sh: "#5cb8b2", dp: "#1f6079", w: [0, 0, 1] },
  { grassA: "#86a845", grassB: "#bcae57", leaf: "#4f8a3a", leafAmt: 1, crop: 1, cropC: "#e3bf52", flower: 0.3, snow: 0, sun: "#fff0d0", sunI: 3, elev: 1.1, top: "#64a2de", hor: "#d9e7ee", hS: "#d6ebff", hG: "#7a7a4a", hI: 1.05, fog: "#d4e3ea", sh: "#62c0b4", dp: "#1d6a80", w: [0, 0, 0] },
  { grassA: "#8f9a4c", grassB: "#ad8b47", leaf: "#d4782f", leafAmt: 0.82, crop: 0.14, cropC: "#b99a5c", flower: 0, snow: 0, sun: "#ffd6a6", sunI: 2.55, elev: 0.72, top: "#8aa8c6", hor: "#e6d9c4", hS: "#e8dccb", hG: "#7a5f3a", hI: 1, fog: "#e0d4c2", sh: "#5aa9a2", dp: "#235a6e", w: [0, 1, 0] },
  { grassA: "#7e8a6c", grassB: "#8d9079", leaf: "#6b5a45", leafAmt: 0, crop: 0, cropC: "#9a8a6a", flower: 0, snow: 1, sun: "#e9f0ff", sunI: 2.15, elev: 0.5, top: "#98b0c6", hor: "#e6ebee", hS: "#e6eef8", hG: "#8b9096", hI: 1.2, fog: "#e1e7ec", sh: "#4f8f98", dp: "#1f4a5e", w: [1, 0, 0] }
], Mo = ["grassA", "grassB", "leaf", "cropC", "sun", "top", "hor", "hS", "hG", "fog", "sh", "dp"], zo = ["leafAmt", "crop", "flower", "snow", "sunI", "elev", "hI"];
class hc {
  constructor(t) {
    m(this, "c", {});
    m(this, "n", {});
    m(this, "w", [0, 0, 0]);
    m(this, "tmp", new Kt());
    const s = xo[t];
    for (const a of Mo) this.c[a] = pe(s[a]);
    for (const a of zo) this.n[a] = s[a];
    this.w = [...s.w];
  }
  /** aproxima-se da estação atual em alguns segundos */
  update(t, s, a) {
    const i = xo[s], o = 1 - Math.exp(-t * 0.3);
    for (const l of Mo) this.c[l].lerp(this.tmp.set(i[l]), o);
    for (const l of zo) this.n[l] += (i[l] - this.n[l]) * o;
    for (let l = 0; l < 3; l++) this.w[l] += (i.w[l] - this.w[l]) * o;
    const n = this.c, r = this.n;
    It.uGrassA.value.copy(n.grassA), It.uGrassB.value.copy(n.grassB), It.uLeafColor.value.copy(n.leaf), It.uCropColor.value.copy(n.cropC), It.uLeaf.value = r.leafAmt, It.uCrop.value = r.crop, It.uFlower.value = r.flower, It.uSnow.value = r.snow, It.uFruit.value = Math.max(0, 1 - r.snow * 1.6), It.uShallow.value.copy(n.sh), It.uDeep.value.copy(n.dp), a.sun.color.copy(n.sun), a.sun.intensity = r.sunI, a.hemi.color.copy(n.hS), a.hemi.groundColor.copy(n.hG), a.hemi.intensity = r.hI, a.sky.uniforms.uTop.value.copy(n.top), a.sky.uniforms.uHor.value.copy(n.hor), a.fog.color.copy(n.fog);
  }
  get elev() {
    return this.n.elev;
  }
}
const dc = `uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`, uc = `uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
class fc {
  constructor(t, s = 1) {
    m(this, "group", new Bs());
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
    for (let y = 0; y < t; y++)
      l[y * 3] = (Math.random() - 0.5) * 90, l[y * 3 + 1] = -999, l[y * 3 + 2] = (Math.random() - 0.5) * 90, h[y] = Math.random(), c[y] = Math.random() * 100, u[y] = 0.7 + Math.random() * 0.6;
    const d = new Ze();
    d.setAttribute("position", new Me(l, 3).setUsage(ue)), d.setAttribute("aK", new Me(h, 1)), d.setAttribute("aS", new Me(u, 1));
    const f = new qi({ transparent: !0, depthWrite: !1, uniforms: { uFow: It.uFow, uFowOn: It.uFowOn, uWorld: It.uWorld, uPR: { value: 1 }, uSize: { value: s }, uColA: { value: pe(a) }, uColB: { value: pe(i) }, uAmt: { value: 0 } }, vertexShader: dc, fragmentShader: uc }), p = new Xo(d, f);
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
        const y = dt(this.map, c, d);
        (u < y || u > y + n.hMax + 4) && (u = y + n.hMax * (0.45 + Math.random() * 0.55)), n.pos[l * 3] = c, n.pos[l * 3 + 1] = u, n.pos[l * 3 + 2] = d;
      }
      n.p.geometry.attributes.position.needsUpdate = !0;
    });
  }
}
const Vs = [
  { key: "high", pr: 2, shadow: 2048, trees: 1, tufts: 1, weather: 1 },
  { key: "medium", pr: 1.5, shadow: 1024, trees: 0.75, tufts: 0.5, weather: 0.55 },
  { key: "low", pr: 1, shadow: 0, trees: 0.55, tufts: 0, weather: 0.25 }
], pc = { move: "#9dffc4", attack: "#ff7a5c", work: "#ffd166" };
class Tn {
  constructor(t, s, a) {
    m(this, "renderer");
    m(this, "scene", new wr());
    m(this, "camera");
    m(this, "sun");
    m(this, "hemi");
    m(this, "sky");
    m(this, "skyMat");
    m(this, "nature");
    m(this, "units", new Vl());
    m(this, "buildings", new ec());
    m(this, "flames", new sc());
    m(this, "particles");
    m(this, "projectiles", new nc());
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
    this.renderer = t, this.scene.fog = new yr(13624043, 130, 360), this.fowData = new Uint8Array(new ArrayBuffer(o * o)), this.fowTex = new vr(this.fowData, o, o, kr, xr), this.fowTex.magFilter = this.fowTex.minFilter = Mr, this.fowTex.needsUpdate = !0, It.uFow.value = this.fowTex, It.uWorld.value = o, this.skyMat = new qi({
      side: zr,
      depthWrite: !1,
      fog: !1,
      uniforms: { uTop: { value: pe("#78ade0") }, uHor: { value: pe("#d3e6ef") } },
      vertexShader: "varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader: `uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`
    }), this.sky = new Ne(new pi(600, 24, 12), this.skyMat), this.sky.renderOrder = -10, this.scene.add(this.sky), this.hemi = new Ar(13625087, 7043658, 1), this.scene.add(this.hemi), this.sun = new Tr(16773852, 2.7), this.sun.castShadow = !0, this.sun.shadow.bias = -4e-4, this.sun.shadow.normalBias = 0.04, this.scene.add(this.sun, this.sun.target), this.scene.add(Bl(i), ql(i)), this.nature = Nl(i), this.scene.add(this.nature.group);
    for (const h of this.nature.metal) h.visible = s.players[a].era >= 2;
    this.syncNature(), this.scene.add(this.buildings.group, this.flames.mesh, this.projectiles.group, this.units.group), this.particles = new oc({ uFow: It.uFow, uFowOn: It.uFowOn, uWorld: It.uWorld }, 600), this.scene.add(this.particles.points), this.weather = new fc(i), this.scene.add(this.weather.group), this.seasons = new hc(s.season), this.ghost = new Ne(new Ze(), new Aa({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 })), this.ghost.visible = !1, this.ghost.renderOrder = 7, this.foot = new Ne(new La(1, 1).rotateX(-Math.PI / 2), new cs({ color: 7331978, transparent: !0, opacity: 0.35, depthTest: !1, depthWrite: !1, toneMapped: !1 })), this.foot.visible = !1, this.foot.renderOrder = 6, this.scene.add(this.ghost, this.foot);
    const n = new Vo(0.3, 0.55, 28).rotateX(-Math.PI / 2);
    for (let h = 0; h < 4; h++) {
      const c = new Ne(n, new cs({ color: 16777215, transparent: !0, opacity: 0, depthWrite: !1, toneMapped: !1 }));
      c.renderOrder = 6, c.visible = !1, this.scene.add(c), this.pings.push({ m: c, t: 0 });
    }
    this.rally = new Bs(), this.rally.add(new Ne(new Es(0.04, 0.04, 1.6, 5).translate(0, 0.8, 0), new Aa({ color: 7229239 }))), this.rallyFlag = new Ne(new oe(0.5, 0.34, 0.03).translate(0.27, 1.38, 0), new cs({ color: 16777215, toneMapped: !1 })), this.rally.add(this.rallyFlag), this.rally.visible = !1, this.scene.add(this.rally);
    const r = s.players[a].start, l = o / 2;
    this.camera = new cc(i, r.x + (l - r.x) * 0.06, r.z + (l - r.z) * 0.06, Math.atan2(r.x - l, r.z - l)), this.updateFog(!0);
  }
  /** um só renderizador para todas as partidas (o iPhone limita quantos contextos WebGL existem) */
  static makeRenderer(t) {
    const s = new Sr({ canvas: t, antialias: !0, powerPreference: "high-performance" });
    return s.outputColorSpace = jo, s.toneMapping = $r, s.toneMappingExposure = 1.08, s.shadowMap.enabled = !0, s.shadowMap.type = Cr, s;
  }
  /** árvores cortadas, pedras acabadas e frutos (ao carregar um jogo salvo) */
  syncNature() {
    const t = this.world;
    for (const s of t.map.res) {
      const a = s.z * t.size + s.x;
      t.resKind[a] === 0 ? this.nature.removeRes(a) : t.resKind[a] === Jt && t.resAmt[a] <= 0 && this.nature.setBerries(a, !1);
    }
  }
  setQuality(t) {
    this.q = t;
    const s = Vs[t], a = Math.min(window.devicePixelRatio || 1, s.pr);
    this.renderer.setPixelRatio(a), this.sun.castShadow = s.shadow > 0, s.shadow > 0 && this.sun.shadow.mapSize.x !== s.shadow && (this.sun.shadow.mapSize.set(s.shadow, s.shadow), this.sun.shadow.map?.dispose(), this.sun.shadow.map = null), this.nature.setDensity(s.trees, s.tufts), this.particles.mat.uniforms.uPR.value = a, this.weather.setPixelRatio(a), this.weather.setScale(s.weather);
  }
  get quality() {
    return this.q;
  }
  resize(t, s) {
    this.renderer.setSize(t, s, !1), this.camera.setAspect(t, s);
  }
  setFog(t) {
    this.fogOn = t, It.uFowOn.value = t ? 1 : 0;
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
        s.resKind[o] === 0 ? this.nature.removeRes(o) : s.resKind[o] === Jt && this.nature.setBerries(o, s.resAmt[o] > 0);
        break;
      }
      case "death":
        if (i.kind < bt) {
          const o = i.x / 256, n = i.z / 256;
          this.seen(o, n) && this.particles.puff(o, dt(a, o, n), n, !1);
        }
        break;
      case "built":
      case "gone": {
        const o = s.x[i.e] / 256, n = s.z[i.e] / 256;
        this.seen(o, n) && this.particles.puff(o, dt(a, o, n), n, !0);
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
    (!this.wallGhost || this.wallGhostEra !== Math.min(a, 2)) && (this.wallGhost && (this.scene.remove(this.wallGhost), this.wallGhost.dispose()), this.wallGhost = new Ut(Js("wall", a), new Aa({ vertexColors: !0, transparent: !0, opacity: 0.62, depthWrite: !1, flatShading: !0 }), 40), this.wallGhost.renderOrder = 7, this.wallGhost.frustumCulled = !1, this.wallGhostEra = Math.min(a, 2), this.scene.add(this.wallGhost));
    const i = this.wallGhost, o = this.world.size, n = new Kt();
    let r = 0;
    for (let l = 0; t && l < t.length && r < 40; l++) {
      const h = t[l] % o + 0.5, c = Math.floor(t[l] / o) + 0.5;
      i.setMatrixAt(r, new he().makeTranslation(h, dt(this.world.map, h, c), c)), i.setColorAt(r, n.set(s[l] ? "#d8ffe2" : "#ff8f80")), r++;
    }
    i.count = r, i.instanceMatrix.needsUpdate = !0, i.instanceColor && (i.instanceColor.needsUpdate = !0);
  }
  /** prévia da construção: canto (tx, tz), verde se dá para construir */
  setGhost(t, s = 0, a = 0, i = !0) {
    if (!t) {
      this.ghost.visible = this.foot.visible = !1;
      return;
    }
    const o = Et[Vt[t]], n = this.world.players[this.me].era, r = t + Math.min(n, 2);
    r !== this.ghostKey && (this.ghost.geometry = Js(t, n), this.ghostKey = r);
    const l = s + o.size / 2, h = a + o.size / 2, c = dt(this.world.map, l, h);
    this.ghost.position.set(l, c, h), this.ghost.visible = !0, this.ghost.material.color.set(i ? "#d8ffe2" : "#ff8f80"), this.foot.position.set(l, c + 0.12, h), this.foot.scale.set(o.size, 1, o.size), this.foot.visible = !0, this.foot.material.color.set(i ? "#6fe08a" : "#e0533c");
  }
  ping(t, s, a) {
    const i = this.pings[this.pingI++ % this.pings.length];
    i.t = 0.7, i.m.position.set(t, dt(this.world.map, t, s) + 0.08, s), i.m.material.color.set(pc[a]), i.m.visible = !0;
  }
  render(t, s, a, i) {
    const o = this.world, n = this.camera;
    It.uTime.value = i, n.update(t), this.seasons.update(t, o.season, { sun: this.sun, hemi: this.hemi, sky: this.skyMat, fog: this.scene.fog });
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
      this.rally.position.set(d, dt(o.map, d, f), f), this.rally.visible = !0, this.rallyFlag.rotation.y = Math.sin(i * 1.4) * 0.2, this.rallyFlag.material.color.set(o.players[this.me].color);
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
const wn = {
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
  "amigo.convidar.d": "A friend joins your game with a code and helps you play.",
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
  "help.l8": '"Invite a friend" (in the menu): a friend joins your game with a 4-letter code and can do everything you can.',
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
}, mc = {
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
  "amigo.convidar.d": "Um amigo entra no seu jogo com um código e ajuda você a jogar.",
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
  "help.l8": '"Convidar um amigo" (no menu): um amigo entra no seu jogo com um código de 4 letras e pode fazer tudo o que você faz.',
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
}, gc = { en: wn, pt: mc }, Sn = "origines_lang";
let qs = "en";
try {
  const e = localStorage.getItem(Sn);
  (e === "pt" || e === "en") && (qs = e);
} catch {
}
const wa = [], qe = () => qs;
function Ao(e) {
  qs = e;
  try {
    localStorage.setItem(Sn, e);
  } catch {
  }
  document.documentElement.lang = e === "pt" ? "pt-BR" : "en", wa.forEach((t) => t());
}
const $n = (e) => (wa.push(e), () => {
  const t = wa.indexOf(e);
  t >= 0 && wa.splice(t, 1);
});
function b(e, t = {}) {
  let s = gc[qs][e] ?? wn[e] ?? e;
  for (const a in t) s = s.split(`{${a}}`).join(String(t[a]));
  return s;
}
const bc = (e) => Math.floor(e).toLocaleString(qs === "pt" ? "pt-BR" : "en-US");
typeof document < "u" && (document.documentElement.lang = qs === "pt" ? "pt-BR" : "en");
const yc = (e, t = "currentColor") => `<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`, Ti = {
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
  idle: '<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',
  army: '<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',
  cancel: '<path d="M6 6l12 12M18 6L6 18"/>',
  "season.0": '<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',
  "season.1": '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  "season.2": '<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
  "season.3": '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'
}, vc = { food: "#d4a334", wood: "#b07a48", stone: "#a3a9b0", metal: "#5bb39a", coins: "#d6a84a", pop: "#ecf1ec" }, kc = ["#8fd16a", "#f2c14e", "#e08a3c", "#a9d3f2"];
function At(e, t) {
  const s = Ti[e] ?? Ti.animal;
  return !t && e.startsWith("season.") && (t = kc[Number(e.slice(7))]), yc(s, t ?? vc[e] ?? "currentColor");
}
function Fe(e) {
  return e in Ti ? At(e, "currentColor") : At(["deer", "boar", "wolf", "aurochs"].includes(e) ? "animal" : "villager", "currentColor");
}
const zs = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), _a = (e) => G.find((t) => t.key === e), xc = G.filter((e) => e.pop > 0 && e.cls !== "villager").map((e) => e.key), Mc = (e) => G.filter((t) => t.cls === e && (t.pop > 0 || t.key === "barbarian")).map((t) => t.key);
function Cn(e) {
  const t = _a(e);
  if (!t) return [];
  const s = [];
  for (const a of t.bonus ?? [])
    if (a.vs === "animal") s.push({ k: "animais", dmg: a.dmg });
    else for (const i of Mc(a.vs)) s.push({ k: i, dmg: a.dmg });
  return t.siege && s.push({ k: "construcoes" }), s;
}
function En(e) {
  const t = _a(e);
  if (!t) return [];
  const s = [];
  for (const a of G) if (a.pop > 0)
    for (const i of a.bonus ?? []) i.vs === t.cls && s.push({ k: a.key, dmg: i.dmg });
  return t.siege && s.push({ k: "todos" }), s;
}
function zc(e) {
  const t = _a(e)?.cls;
  return t === "ranged" ? "vs.far" : t === "scout" ? "vs.scout" : t === "cavalry" ? "vs.fast" : t === "infantry" ? "vs.foot" : null;
}
const To = ["spearman", "horseman", "slinger", "swordsman"], wo = (e) => b(e === "animais" ? "vs.animals" : e === "construcoes" ? "vs.buildings" : e === "todos" ? "vs.anyone" : `unit.${e}`), Ac = (e) => e === "animais" ? At("animal", "currentColor") : e === "construcoes" ? At("house", "currentColor") : e === "todos" ? At("army", "currentColor") : Fe(e), Oa = (e) => e.length ? e.map((t) => `<span class="vs-i" title="${zs(wo(t.k))}">${Ac(t.k)}<span>${zs(wo(t.k))}</span></span>`).join("") : '<span class="vs-i vs-nada">—</span>';
function So(e) {
  const t = Cn(e), s = En(e);
  return !t.length && !s.length ? "" : `<div class="vs">${t.length ? `<div class="vs-l vs-win"><b>${b("vs.win")}</b>${Oa(t)}</div>` : ""}${s.length ? `<div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${Oa(s)}</div>` : ""}</div>`;
}
function Tc(e) {
  const t = [...To, To[0]].map((a, i) => (i ? `<span class="vs-seta">${b("vs.beats")} ›</span>` : "") + `<span class="vs-c">${Fe(a)}<b>${zs(b(`unit.${a}`))}</b></span>`).join(""), s = [...xc, "barbarian"].map((a) => {
    const i = _a(a), o = i.pop > 0 && i.era > e, n = zc(a), r = a === "barbarian" ? b("vs.enemy") : o ? b("vs.from", { era: b(`era.${i.era}.in`) }) : "";
    return `<li class="vs-row${o ? " futura" : ""}"><div class="vs-who">${Fe(a)}<b>${zs(b(`unit.${a}`))}</b>${r ? `<small>${zs(r)}</small>` : ""}${n ? `<em>${zs(b(n))}</em>` : ""}</div><div class="vs-l vs-win"><b>${b("vs.win")}</b>${Oa(Cn(a))}</div><div class="vs-l vs-lose"><b>${b("vs.lose")}</b>${Oa(En(a))}</div></li>`;
  }).join("");
  return `<p class="vs-intro">${b("vs.intro")}</p><div class="vs-ciclo" aria-label="${b("vs.cycle")}">${t}</div><ul class="vs-tab">${s}</ul>`;
}
const as = [0, 0.2, 0.5, 0.85], $o = "origines_som", Co = { music: 1, sfx: 3, amb: 2, muted: !1 };
class wc {
  constructor() {
    m(this, "ctx", null);
    m(this, "opts", { ...Co });
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
      const t = JSON.parse(localStorage.getItem($o) ?? "null");
      t && typeof t == "object" && (this.opts = { ...Co, ...t });
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
      localStorage.setItem($o, JSON.stringify(this.opts));
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
        return this.scene === "menu" ? s.music ? Math.max(as[2], as[s.music]) : 0 : as[s.music];
      case "amb":
        return this.scene === "game" ? as[s.amb] * (this.paused ? 0.35 : 1) : 0;
      case "sfx":
        return as[s.sfx];
      case "ui":
        return as[s.sfx] * 0.8;
      case "alert":
        return s.sfx ? Math.max(0.5, as[s.sfx]) : 0;
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
const D = new wc(), Sc = ["food", "wood", "stone", "metal"], $c = ["I", "II", "III", "IV", "V", "VI"], re = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]), Fa = class Fa {
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
    // ── jogo com um amigo ──
    m(this, "amigoNome", null);
    m(this, "amigoFaixa", null);
    this.world = t, this.me = s, this.act = a, this.touch = i, this.selected = o, this.root = document.getElementById("hud"), this.box = document.createElement("div"), this.box.className = "box", document.body.appendChild(this.box), this.minimap = document.createElement("canvas"), this.minimap.id = "minimapa", this.tipEl = document.createElement("div"), this.tipEl.className = "tip panel", this.tipEl.id = "dica", this.tipEl.setAttribute("role", "tooltip"), this.tipEl.hidden = !0, document.body.appendChild(this.tipEl), this.bindTips(), this.build(), this.offLang = $n(() => this.build()), D.changed(() => {
      const n = document.getElementById("btn-som");
      if (!n) return;
      const r = D.opts.muted;
      n.innerHTML = At(r ? "mute" : "sound"), n.title = b(r ? "snd.unmute" : "snd.mute"), n.setAttribute("aria-label", n.title), n.setAttribute("aria-pressed", String(r));
    });
  }
  dispose() {
    this.offLang(), this.root.innerHTML = "", this.box.remove(), this.hideTip(), this.tipEl.remove(), removeEventListener("pointerup", this.tipUp), removeEventListener("pointercancel", this.tipUp);
  }
  bindTips() {
    const t = (s) => s.target?.closest?.(Fa.TIP_SEL) ?? null;
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
      s = `<div class="tip-h"><b>${re(l)}</b></div>`;
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
    return `<div class="tip-h"><span class="tip-ic">${Fe(t.ic)}</span><b>${re(t.tip?.name ?? t.label)}</b>${t.cost ? this.costHtml(t.cost) : ""}</div>` + (t.tip?.desc ? `<p>${re(t.tip.desc)}</p>` : "") + (t.vs ? So(t.vs) : "") + (t.why ? `<p class="tip-why">${re(t.why)}</p>` : "");
  }
  costHtml(t) {
    const s = this.world.players[this.me].res;
    return `<span class="cost">${rs.filter((a) => t[a]).map((a) => `<span class="c${s[a] < t[a] * 100 ? " no" : ""}">${At(a)}${t[a]}</span>`).join("")}</span>`;
  }
  bldDesc(t, s) {
    const a = Et[Vt[t]];
    return b(`bld.${t}.d`, { n: a.pop ? a.pop[Math.min(s, a.pop.length - 1)] : 0, get: Se.get, fair: Se.fair });
  }
  build() {
    const t = this.touch;
    this.root.innerHTML = `
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="amigo-chip panel" id="amigo-chip" hidden></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-som" title="${b(D.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(D.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${D.opts.muted}">${At(D.opts.muted ? "mute" : "sound")}</button>
          <button id="btn-quem-vence" title="${b("btn.vs")}" aria-label="${b("btn.vs")}">${At("vs")}</button>
          <button id="btn-ajuda" title="${b("btn.help")}" aria-label="${b("btn.help")}">${At("help")}</button>
          <button id="btn-menu" title="${b("btn.menu")}" aria-label="${b("btn.menu")}">${At("menu")}<span class="btn-label">${b("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <p class="amigo-faixa panel" id="amigo-faixa" hidden></p>
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${At("check")}<span>${b("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${At("cancel")}<span>${b("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden ? ' style="opacity:0"' : ""}>${b(t ? "hint.touch" : "hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${b("btn.idle")}">${At("idle")}<span class="btn-label">${b("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${b("btn.army")}">${At("army")}<span class="btn-label">${b("btn.army")}</span></button>
            <button id="btn-aldeia" title="${b("btn.home")}">${At("home")}<span class="btn-label">${b("btn.home")}</span></button>
          </div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${b("help.title")}</h2><p class="goal">${b("help.goal")}</p>
        <ul>${["help.l1", "help.l6", "help.l7", "help.l2", "help.l3", "help.l4", "help.l9", "help.l8", t ? "help.l5.touch" : "help.l5.mouse"].map((a) => `<li>${b(a)}</li>`).join("")}</ul>
        <p class="hint-copy">${b(t ? "hint.touch" : "hint.mouse")}</p>
        <div class="row-btns"><button id="btn-quem-vence-ajuda">${At("vs")}<span>${b("btn.vs")}</span></button><button id="btn-fechar-ajuda" class="primary">${b("help.close")}</button></div></div></div>
      <div class="modal" id="vantagens" data-open="false"><div class="card panel vs-card">
        <h2>${At("vs")}${b("btn.vs")}</h2><div id="vantagens-corpo"></div>
        <button id="btn-fechar-vantagens" class="primary">${b("help.close")}</button></div></div>`;
    for (const a of ["era", "res", "cal", "amigo-chip", "amigo-faixa", "toasts", "modebar", "modebar-text", "btn-confirmar-obra", "hint", "sel", "cmd", "mini", "ajuda", "vantagens", "vantagens-corpo", "idle-n"]) this.$[a] = document.getElementById(a);
    this.$.mini.appendChild(this.minimap);
    const s = (a, i) => {
      document.getElementById(a).onclick = i;
    };
    s("btn-ajuda", () => this.$.ajuda.dataset.open = "true"), s("btn-fechar-ajuda", () => this.$.ajuda.dataset.open = "false"), s("btn-quem-vence", () => this.openVs()), s("btn-quem-vence-ajuda", () => {
      this.$.ajuda.dataset.open = "false", this.openVs();
    }), s("btn-fechar-vantagens", () => this.$.vantagens.dataset.open = "false"), s("btn-menu", () => this.act.menu()), s("btn-som", () => D.toggleMute()), s("btn-ocioso", () => this.act.idle()), s("btn-exercito", () => this.act.army()), s("btn-aldeia", () => this.act.home()), s("btn-confirmar-obra", () => this.act.placeConfirm()), s("btn-cancelar-modo", () => this.act.cancelMode()), this.$.ajuda.onclick = (a) => {
      a.target === this.$.ajuda && (this.$.ajuda.dataset.open = "false");
    }, this.$.vantagens.onclick = (a) => {
      a.target === this.$.vantagens && (this.$.vantagens.dataset.open = "false");
    }, this.sigTop = this.sigSel = this.sigCard = this.sigMode = "", this.idleN = -1, this.toasts = [], this.setAmigo(this.amigoNome), this.setFaixa(this.amigoFaixa), this.update(0, !0);
  }
  /** no alto da tela: com quem está jogando (null: sozinho) */
  setAmigo(t) {
    this.amigoNome = t;
    const s = this.$["amigo-chip"];
    s && (s.hidden = !t, s.innerHTML = t ? `${At("amigo")}<span>${re(b("amigo.chip", { name: t }))}</span>` : "");
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
    this.hideTip(), this.$["vantagens-corpo"].innerHTML = Tc(this.world.players[this.me].era), this.$.vantagens.dataset.open = "true";
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
      const i = `bld.${t}.e${a}`, o = b(i);
      if (o !== i) return o;
    }
    return b(`bld.${t}`);
  }
  resetCard() {
    this.cardMode = "main";
  }
  // ── avisos ──
  toast(t, s, a, i = "") {
    if (this.toasts.some((n) => n.text === t && n.t > 2.5)) return;
    const o = document.createElement("button");
    for (o.className = "toast panel", o.dataset.aviso = i || "info", o.innerHTML = `<span>${re(t)}</span>${s !== void 0 ? `<span class="go">${b("msg.go")}</span>` : ""}`, o.onclick = () => {
      s !== void 0 && a !== void 0 && this.act.jump(s, a), o.remove(), this.toasts = this.toasts.filter((n) => n.el !== o);
    }, this.$.toasts.prepend(o), this.toasts.unshift({ el: o, t: 5, text: t }); this.toasts.length > 3; ) this.toasts.pop().el.remove();
  }
  tribe(t) {
    return t === this.me ? b("tribe.you") : b(t === kt ? "tribe.wild" : `tribe.${t === Ee ? 6 : t}`);
  }
  onEvents(t) {
    for (const s of t) {
      if (s.t === "age") {
        this.toast(s.player === this.me ? b("msg.ageMe", { era: b(`era.${s.era}.in`) }) : b("msg.ageOther", { p: this.tribe(s.player), era: b(`era.${s.era}.in`) }), void 0, void 0, "era");
        continue;
      }
      if (s.t !== "msg" || s.player !== this.me) continue;
      const [a, i] = s.key.split("."), o = s.x !== void 0 ? s.x / 256 : void 0, n = s.z !== void 0 ? s.z / 256 : void 0;
      a === "built" ? this.toast(b("msg.built", { b: b(`bld.${i}`) }), o, n, "built") : a === "defeated" ? this.toast(Number(i) === this.me ? b("msg.youDefeated") : b("msg.defeated", { p: this.tribe(Number(i)) }), void 0, void 0, "defeated") : a === "tech" ? this.toast(b("msg.tech", { tech: b(`tech.${i}`) }), o, n, "tech") : this.toast(b(`msg.${a}`, { n: this.world.players[this.me].era <= 1 ? 1 : 2 }), a === "underAttack" || a === "raidSoon" || a === "centerLost" || a === "centerDanger" || a === "campLoot" ? o : void 0, n, a);
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
    const t = this.world, s = t.players[this.me], a = s.era, i = a >= 2 ? ["food", "wood", "stone", "metal"] : ["food", "wood", "stone"], o = t.pop(this.me), n = t.popCap(this.me), r = i.map((l) => Math.floor(s.res[l] / 100)).join(",") + `|${o}|${n}|${a}|${s.aging > 0}|${t.season}|${t.year}|${qe()}`;
    r !== this.sigTop && (this.sigTop = r, this.$.res.innerHTML = i.map((l) => `<div class="r" title="${b(`res.${l}`)}">${At(l)}<span>${bc(s.res[l] / 100)}</span></div>`).join("") + `<div class="r${o >= n ? " full" : ""}" title="${b("pop.tip", { n: o, cap: n, max: Xs[a] })}">${At("pop")}<span>${o}/${n}</span></div>`, this.$.era.innerHTML = `<span class="num">${$c[a]}</span><span class="name">${b(`era.${a}`)}</span>${s.aging > 0 ? '<span class="era-prog"><i data-p="aging"></i></span>' : ""}`, this.$.era.title = b(`era.${a}`), this.$.cal.innerHTML = `${At(`season.${t.season}`)}<span class="name">${b(`season.${t.season}`)}</span><span class="yr">${b("cal.year", { y: t.year })}</span><span class="cal-prog"><i data-p="season"></i></span>`, this.$.cal.title = `${b(`season.${t.season}`)} · ${b("cal.year", { y: t.year })}`, this.$.cal.dataset.season = String(t.season), this.bindProgs());
  }
  renderMode() {
    const t = this.world.players[this.me].era, s = `${this.mode}|${this.placeOk}|${this.wallStep}|${this.placeKey}|${t}|${qe()}`;
    if (s === this.sigMode) return;
    this.sigMode = s;
    const a = this.$.modebar;
    a.hidden = this.mode === "normal", this.root.dataset.mode = this.mode, this.$["btn-confirmar-obra"].hidden = !(this.mode === "place" && this.touch), this.$["btn-confirmar-obra"].setAttribute("aria-disabled", String(!this.placeOk));
    const i = this.touch ? "touch" : "mouse", o = this.mode === "place" ? this.wallStep && (this.placeOk || this.wallStep === 2) ? b(`place.wall${this.wallStep}.${i}`) : this.placeOk ? b(`place.${i}`) : b("place.bad") : this.mode === "rally" ? b("rally.hint") : "";
    this.$["modebar-text"].innerHTML = (this.mode === "place" && this.placeKey ? `<b class="mb-name">${re(this.bldName(this.placeKey, t))}</b> · ` : "") + re(o);
  }
  renderIdle() {
    const t = this.world;
    let s = 0;
    for (let a = 0; a < t.top; a++) t.isUnit(a) && t.owner[a] === this.me && t.kind[a] === ct.villager && t.task[a] === 0 && t.state[a] !== Wt && s++;
    s !== this.idleN && (this.idleN = s, this.$["idle-n"].hidden = s === 0, this.$["idle-n"].textContent = String(s));
  }
  /** o que a pessoa está fazendo agora */
  doing(t) {
    const s = this.world, a = s.task[t], i = s.tgt[t];
    return a === Ft ? s.phase[t] === oa ? b("do.return", { n: Math.floor(s.carry[t] / 100), res: b(`res.${Sc[s.carryRes[t]]}`).toLowerCase() }) : i < 0 ? b("do.move") : s.tgtTile[t] ? b(s.map.tree[i] ? "do.wood" : s.resKind[i] === Jt ? "do.berry" : s.resKind[i] === Oe ? "do.stone" : "do.metal") : b(s.kind[i] === gt ? "do.meat" : "do.farm") : b(a === Ie ? "do.build" : a === Rt ? i >= 0 && s.owner[i] === kt ? "do.hunt" : "do.fight" : a === ms ? "do.amove" : s.state[t] === Wt ? "do.move" : s.foodMode[t] ? "do.forage" : "do.idle");
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
      if (r >= bt) {
        const c = Et[r - bt], u = t.players[l]?.era ?? 0, d = t.done[n] === 1, f = t.queue[n], p = c.key === "farm" && d ? this.farmer(n) : null;
        if (a = `b${n}|${t.hp[n]}|${d}|${f.join(",")}|${p}|${qe()}`, a === this.sigSel) return;
        const y = h ? d ? "" : b("info.building") : this.tribe(l), g = this.bldDesc(c.key, u);
        i = this.head(Fe(c.key), this.bldName(c.key, u), y, h) + this.hp(t.hp[n], c.hp) + (!d && h ? `<div class="prog"><i data-p="build:${n}"></i></div>` : "") + `<div class="sel-desc">${g}</div>` + (p !== null ? `<div class="sel-line">${b("info.farmer", { who: b(p ? "info.yes" : "info.no") })}</div>` : "") + (f.length ? `<div class="queue" aria-label="${b("info.queue")}">${f.map((x, M) => {
          const v = x >= ie ? Ke[x - ie].key : G[x].key;
          return `<span class="qi" title="${b(x >= ie ? `tech.${v}` : `unit.${v}`)}">${Fe(v)}${M === 0 ? `<i class="qp" data-p="queue:${n}"></i>` : ""}</span>`;
        }).join("")}</div>` : "");
      } else if (r === gt) {
        const c = Math.floor(t.work[n] / 100);
        if (a = `c${n}|${c}|${qe()}`, a === this.sigSel) return;
        i = this.head(At("carcass", "currentColor"), b("unit.carcass"), b(`unit.${G[t.sub[n]]?.key ?? "deer"}`), !1) + `<div class="sel-desc">${b("unit.carcass.d", { food: c })}</div>`;
      } else {
        const c = G[r], u = h ? this.doing(n) : this.tribe(l);
        if (a = `u${n}|${t.hp[n]}|${u}|${qe()}`, a === this.sigSel) return;
        i = this.head(Fe(c.key), b(`unit.${c.key}`), u, h) + this.hp(t.hp[n], c.hp) + `<div class="sel-desc">${b(`unit.${c.key}.d`, { food: c.animal?.food ?? 0 })}</div>` + So(c.key);
      }
    } else {
      const n = /* @__PURE__ */ new Map();
      for (const l of s) n.set(t.kind[l], (n.get(t.kind[l]) || 0) + 1);
      const r = [...n.entries()].sort((l, h) => l[0] - h[0]);
      if (a = "m" + r.map(([l, h]) => `${l}:${h}`).join(",") + qe(), a === this.sigSel) return;
      i = this.head(At("pop", "currentColor"), b("sel.many", { n: s.length }), "", !0) + `<div class="sel-icons">${r.map(([l, h]) => `<button data-selecionar="${G[l]?.key ?? l}" title="${b(`unit.${G[l]?.key}`)}">${Fe(G[l]?.key ?? "")}<span>${h}</span></button>`).join("")}</div>`;
    }
    this.sigSel = a, this.$.sel.hidden = !1, this.$.sel.innerHTML = i, this.$.sel.querySelectorAll("[data-selecionar]").forEach((n) => n.onclick = () => this.act.keepKind(ct[n.dataset.selecionar]));
    const o = this.$.sel.querySelector("#btn-limpar-selecao");
    o && (o.onclick = () => this.act.clear()), this.bindProgs();
  }
  head(t, s, a, i) {
    return `<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${re(s)}</div>${a ? `<div class="sel-sub">${re(a)}</div>` : ""}</div><button id="btn-limpar-selecao" class="x" title="${b("sel.clear")}" aria-label="${b("sel.clear")}">${At("close")}</button></div>`;
  }
  hp(t, s) {
    const a = Math.max(0, Math.min(1, t / s));
    return `<div class="hp" title="${b("info.hp")} ${Math.max(0, t)}/${s}"><i style="width:${Math.round(a * 100)}%" class="${a > 0.6 ? "ok" : a > 0.3 ? "mid" : "low"}"></i></div>`;
  }
  farmer(t) {
    const s = this.world;
    for (let a = 0; a < s.top; a++) if (s.isUnit(a) && s.task[a] === Ft && s.tgt[a] === t && !s.tgtTile[a]) return !0;
    return !1;
  }
  // ── cartão de comandos ──
  missing(t) {
    const s = this.world.players[this.me].res;
    return rs.find((a) => s[a] < (t[a] ?? 0) * 100);
  }
  whyCost(t) {
    const s = this.missing(t);
    return s ? b("why.cost", { res: b(`res.${s}`).toLowerCase() }) : void 0;
  }
  buttons() {
    const t = this.world, s = this.me, a = t.players[s], i = [...this.selected].filter((g) => t.alive[g]), o = i.filter((g) => t.isUnit(g) && t.owner[g] === s), n = o.filter((g) => t.kind[g] === ct.villager), r = [];
    if (o.length) {
      if (this.cardMode === "build" && n.length) {
        r.push({ id: "btn-voltar-comandos", ic: "back", label: b("cmd.back"), act: () => {
          this.cardMode = "main", this.refresh();
        } });
        for (const g of Et) if (g.buildable && g.era <= a.era + 1) {
          const x = g.era > a.era ? b("why.era", { era: b(`era.${g.era}.in`) }) : this.whyCost(g.cost), M = this.bldName(g.key, a.era);
          r.push({ data: ["construir", g.key], ic: g.key, label: M, tip: { name: M, desc: this.bldDesc(g.key, a.era) }, cost: g.cost, why: x, act: () => this.act.startPlace(g.key) });
        }
        return r;
      }
      if (n.length && r.push({ id: "btn-construir", ic: "build", label: b("cmd.build"), act: () => {
        this.cardMode = "build", this.refresh();
      } }), n.length) {
        const g = n.every((x) => t.foodMode[x] > 0);
        r.push({ id: "btn-buscar-comida", ic: "food", label: b("cmd.food"), tip: { name: b("cmd.food"), desc: b(g ? "cmd.food.off" : "cmd.food.d") }, pressed: g, act: () => this.act.food(!g) });
      }
      return r.push({ id: "btn-parar", ic: "stop", label: b("cmd.stop"), act: () => this.act.stop() }), r;
    }
    if (i.length !== 1 || !t.isBuilding(i[0]) || t.owner[i[0]] !== s) return r;
    const l = i[0], h = t.bdef(l), c = t.done[l] === 1, u = a.era;
    if (!c) return r;
    const d = Ri(h, u), f = t.pop(s), p = t.popCap(s);
    let y = 0;
    for (let g = 0; g < t.top; g++) if (t.isBuilding(g) && t.owner[g] === s)
      for (const x of t.queue[g]) x < ie && (y += G[x].pop);
    for (const g of d) {
      const x = G[ct[g]], M = t.queue[l], v = M.length >= 5 ? b("why.queue") : this.whyCost(x.cost) ?? (f + y + x.pop > p ? b(p >= Xs[u] ? "why.popEra" : "why.pop") : void 0);
      r.push({ data: ["treinar", g], ic: g, label: b(`unit.${g}`), tip: { name: b(`unit.${g}`), desc: b(`unit.${g}.d`) }, vs: g, cost: x.cost, why: v, badge: M.filter((w) => w === ct[g]).length, act: () => this.act.train(l, g) });
    }
    for (const g of h.research ?? []) {
      const x = Sa[g], M = Ke[x], v = t.queue[l];
      if (t.hasTech(s, g)) continue;
      const w = t.techQueued(s, x) ? b("why.techQueued") : M.needs && !t.hasTech(s, M.needs) ? b("why.needs", { tech: b(`tech.${M.needs}`) }) : v.length >= 5 ? b("why.queue") : this.whyCost(M.cost);
      r.push({ data: ["pesquisar", g], ic: g, label: `${b(`tech.${g}`)}: ${b(`tech.${g}.d`)}`, tip: { name: b(`tech.${g}`), desc: b(`tech.${g}.d`) }, cost: M.cost, why: w, act: () => this.act.research(l, g) });
    }
    if (h.market) {
      const g = t.fair ? Se.fair : Se.get;
      for (const x of Xe) r.push({ data: ["dar", x], ic: x, label: b("trade.give", { res: b(`res.${x}`).toLowerCase() }), short: b("trade.giveShort"), pressed: this.give === x, act: () => {
        this.give = x;
      } });
      for (const x of Xe) if (x !== this.give) {
        const M = a.res[this.give] < Se.give * 100 ? b("why.trade", { res: b(`res.${this.give}`).toLowerCase() }) : void 0;
        r.push({ data: ["receber", x], ic: x, label: (t.fair ? b("trade.fair") + " " : "") + b("trade.get", { n: g, res: b(`res.${x}`).toLowerCase() }), short: `+${g}`, cost: { [this.give]: Se.give }, why: M, act: () => this.act.trade(l, this.give, x) });
      }
    }
    if (t.queue[l].length && r.push({ id: "btn-cancelar-fila", ic: "cancel", label: b("cmd.cancelQueue"), act: () => this.act.cancelQueue(l) }), h.key === "center")
      if (a.aging > 0) r.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.aging", { era: b(`era.${u + 1}.to`) }), why: b("why.ageBusy"), prog: () => 1 - a.aging / (ls[u].time * 10), act: () => {
      } });
      else if (u < Zo) {
        const g = t.eraBuildingTypes(s), x = ls[u];
        r.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.ageup", { era: b(`era.${u + 1}.to`) }), tip: { name: b("cmd.ageup", { era: b(`era.${u + 1}.to`) }), desc: b("help.l4") }, cost: x.cost, why: g < 2 ? b("why.age", { n: g }) : this.whyCost(x.cost), act: () => this.act.ageUp(l) });
      } else r.push({ id: "btn-avancar-era", ic: "ageup", label: b("cmd.ageup", { era: b(`era.${u + 1}.to`) }), why: b("why.maxEra"), act: () => {
      } });
    return d.length && r.push({ id: "btn-ponto-reuniao", ic: "rally", label: b("cmd.rally"), tip: { name: b("cmd.rally"), desc: b("rally.hint") }, pressed: this.mode === "rally", act: () => this.act.rally(l) }), r;
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
      const l = n.id ? `id="${n.id}"` : `data-${n.data[0]}="${n.data[1]}"`, h = n.cost ? this.costHtml(n.cost) : "";
      return `<button ${l} data-i="${r}" class="cb${n.why ? " off" : ""}" aria-disabled="${!!n.why}" aria-pressed="${!!n.pressed}" aria-label="${re(n.label + (n.why ? " — " + n.why : ""))}"><span class="cb-ic">${Fe(n.ic)}${n.badge ? `<span class="badge">${n.badge}</span>` : ""}</span><span class="cb-l">${re(n.label)}</span>${n.short ? `<span class="cb-s">${re(n.short)}</span>` : ""}${h}${n.prog ? '<span class="cb-p"><i data-p="btn"></i></span>' : ""}</button>`;
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
      i === "aging" || i === "btn" ? r = () => s.aging > 0 ? 1 - s.aging / (ls[Math.min(s.era, ls.length - 1)].time * 10) : 0 : i === "season" ? r = () => t.tick % 1800 / 1800 : i === "build" ? r = () => t.alive[n] ? t.work[n] / (t.bdef(n).time * 100) : 0 : i === "queue" && (r = () => {
        if (!t.alive[n] || !t.queue[n].length) return 0;
        const l = t.queue[n][0];
        return t.work[n] / ((l >= ie ? Ke[l - ie].time : G[l].time) * 10);
      }), r && this.progs.push({ el: a, f: r });
    });
  }
};
// ── dica dos ícones ──
m(Fa, "TIP_SEL", ".cb, .qi, .sel-icons button, .sel .vs-i, .r, .era-chip, .cal, .tools button, .quick button");
let wi = Fa;
class Cc {
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
      let y = [104, 150, 72];
      if (f === We) y = [46, 104, 128];
      else if (f === hs) y = [86, 150, 160];
      else if (f === $a) y = [205, 186, 140];
      else if (f === je || f === $e && p > Ua - 0.3) y = [140, 135, 125];
      else {
        const g = Math.max(0, Math.min(1, (p - 1) / 12));
        y = [104 + g * 30, 150 - g * 10, 72 + g * 20];
      }
      n.tree[d] && (y = [52, 92, 50]), r.set([y[0], y[1], y[2], 255], d * 4);
    }
    for (const c of n.res) {
      const u = c.kind === Jt ? [200, 60, 70] : c.kind === Oe ? [215, 210, 200] : c.kind === be ? [90, 190, 160] : [255, 255, 255];
      c.kind === be || !s.resKind[c.z * o + c.x] || this.base.data.set([u[0], u[1], u[2], 255], (c.z * o + c.x) * 4);
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
      for (const f of this.world.map.res) f.kind === be && this.world.resKind[f.z * d + f.x] === be && this.base.data.set([90, 190, 160, 255], (f.z * d + f.x) * 4);
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
      const f = c.x[d] / 256, p = c.z[d] / 256, y = c.owner[d] === this.me;
      if (s && !y && !l[Math.floor(p) * o + Math.floor(f)] || c.kind[d] === gt) continue;
      const g = c.kind[d] >= bt, x = c.owner[d], M = g ? c.bdef(d).size === 1 ? 2 : 7 : x === kt ? 2 : 3;
      this.ctx.fillStyle = x === kt ? "#e8d9b0" : x === Ee ? "#2f3b27" : c.players[x]?.color ?? "#fff", this.ctx.fillRect(f - M / 2, p - M / 2, M, M), g && M > 2 && (this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1, this.ctx.strokeRect(f - M / 2, p - M / 2, M, M));
    }
    const u = [[0, 0], [a, 0], [a, i], [0, i]].map(([d, f]) => this.cam.ground(d, f, a, i));
    u.every((d) => d) && (this.ctx.strokeStyle = "rgba(255,255,255,0.9)", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), u.forEach((d, f) => f ? this.ctx.lineTo(d.x, d.z) : this.ctx.moveTo(d.x, d.z)), this.ctx.closePath(), this.ctx.stroke());
  }
}
class Ec {
  constructor(t, s, a, i, o, n) {
    m(this, "selected", /* @__PURE__ */ new Set());
    m(this, "pointers", /* @__PURE__ */ new Map());
    m(this, "gesture", "none");
    m(this, "longTimer", 0);
    m(this, "lastTap", { t: 0, x: 0, y: 0 });
    m(this, "keys", /* @__PURE__ */ new Set());
    m(this, "v", new Tt());
    m(this, "v2", new Tt());
    m(this, "right", new Tt());
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
    if (h.kind === "unit" && c.owner[h.e] === this.me && c.kind[h.e] !== gt) {
      this.clickSelect(a, i, !1, r);
      return;
    }
    if (h.kind === "building" && c.owner[h.e] === this.me) {
      const d = !c.done[h.e] || Et[c.kind[h.e] - bt].walk;
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
      if (!i.alive[l] || i.kind[l] >= bt) continue;
      const h = i.owner[l] === this.me;
      if (a && !h) continue;
      const c = i.x[l] / 256, u = i.z[l] / 256;
      if (!h && !this.seen(c, u) || (this.cam.toScreen(c, dt(i.map, c, u) + (i.kind[l] === gt ? 0.2 : 0.6), u, this.W, this.H, this.v), !this.v.z)) continue;
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
      const h = Et[a.kind[n] - bt].size, c = dt(a.map, r, l) + (h >= 3 ? 0.7 : 0.5);
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
      const y = p * o + f, g = i.map.tree[y] > 0;
      if (!(!(g || i.resKind[y]) || i.resAmt[y] <= 0 || !i.explored[this.me][y]) && !(i.resKind[y] === 3 && i.players[this.me].era < 2))
        for (const x of g ? [0.6, 1.5, 2.4] : [0.3]) {
          if (this.cam.toScreen(f + 0.5, dt(i.map, f + 0.5, p + 0.5) + x, p + 0.5, this.W, this.H, this.v), !this.v.z) continue;
          const M = (this.v.x - t) ** 2 + (this.v.y - s) ** 2;
          M < c && (c = M, h = y);
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
    if (a && !this.ownUnitsSelected() && this.selected.clear(), r >= 0 && o.owner[r] === this.me && o.kind[r] !== gt) {
      if (a || this.selected.clear(), i) {
        const l = o.kind[r];
        for (let h = 0; h < o.top; h++) if (o.isUnit(h) && o.owner[h] === this.me && o.kind[h] === l) {
          const c = o.x[h] / 256, u = o.z[h] / 256;
          this.cam.toScreen(c, dt(o.map, c, u), u, this.W, this.H, this.v), this.v.z && this.v.x >= 0 && this.v.y >= 0 && this.v.x <= this.W && this.v.y <= this.H && this.selected.add(h);
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
      this.cam.toScreen(d, dt(n.map, d, f) + 0.5, f, this.W, this.H, this.v), this.v.z && this.v.x >= r && this.v.x <= l && this.v.y >= h && this.v.y <= c && this.selected.add(u);
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
const In = (() => {
  const e = "413c031";
  return /^[0-9a-f]{7}$/.test(e) ? parseInt(e, 16) : 0;
})(), On = new URLSearchParams(location.search), Pn = On.get("online") || `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/online/origines`, Bn = Pn.replace(/^ws/, "http"), Ic = !location.pathname.startsWith("/jogar/") && !On.get("online"), Gs = /^[A-HJ-NP-Z2-9]{4}$/, Oc = (e) => e.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, "").slice(0, 4);
let Pc = null;
function Bc() {
  return Ic ? Promise.resolve(!1) : Pc ?? (Pc = fetch(Bn + "/saude", { cache: "no-store" }).then((e) => e.ok ? e.json() : null).then((e) => !!e?.ok && !!e?.banco).catch(() => !1));
}
class Qs {
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
    const s = await fetch(Bn + "/nova", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: "{}" });
    if (!s.ok) throw new Error(s.status === 401 ? "conta" : "rede");
    const { codigo: a } = await s.json();
    if (!Gs.test(a)) throw new Error("rede");
    const i = new Qs("anfitriao", t);
    return i.codigo = a, i.abrir(), i;
  }
  /** o amigo entra com o código */
  static entrar(t, s) {
    const a = new Qs("convidado", s);
    return a.codigo = t, a.abrir(), a;
  }
  abrir() {
    let t;
    try {
      t = new WebSocket(`${Pn}/sala/${this.codigo}?modo=${this.papel === "anfitriao" ? "criar" : "entrar"}`);
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
        this.on({ t: "pausa", on: Array.isArray(s.d) && s.d[0] === 1 });
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
    this.enviar(`{"t":"s","v":${In},"d":${t}}`);
  }
  /** anfitrião: pausou ou voltou ao jogo */
  pausa(t) {
    this.enviar(JSON.stringify({ t: "p", d: [t ? 1 : 0] }));
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
const Eo = "origines_opts", le = (e) => e.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
class qc {
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
    this.act = t, this.root = document.getElementById("menus");
    try {
      const s = JSON.parse(localStorage.getItem(Eo) ?? "{}");
      s.rivals >= 1 && s.rivals <= 3 && (this.rivals = s.rivals), s.diff >= 0 && s.diff <= 2 && (this.diff = s.diff);
    } catch {
    }
    $n(() => this.render());
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
    i && (i.disabled = s || !Gs.test(this.codigo));
  }
  /** abre a tela inicial já no passo "Entrar no jogo de um amigo" (depois de um erro, por exemplo) */
  showStartAmigo(t) {
    this.screen = { k: "start", info: t, step: "amigo" }, this.render();
  }
  /** o menu de quem está no jogo de um amigo */
  showGuest(t, s) {
    this.screen = { k: "guest", nome: t, quality: s }, this.render();
  }
  showInfo(t, s) {
    this.screen = { k: "info", titulo: t, texto: s }, this.render();
  }
  /** na pausa do anfitrião: convidar um amigo, o código e quem está jogando junto */
  pauseFriend(t) {
    if (!this.amigoOn || t === "off" || t === "loading") return "";
    const s = this.convite, a = (i) => `<b>${le(i)}</b>`;
    return t.logado ? !s || s.estado === "erro" ? `${s ? `<p class="saved fail">${b("amigo.erroCriar")}</p>` : ""}<button id="btn-convidar-amigo" class="big">${At("amigo")}<span>${b("amigo.convidar")}</span></button><p class="muted small">${b("amigo.convidar.d")}</p>` : s.estado === "criando" ? `<p class="muted">${b("amigo.criando")}</p>` : `<div class="acct on convite"><p class="acct-k">${b("amigo.codigo")}</p><p class="codigo" aria-label="${le((s.codigo ?? "").split("").join(" "))}">${le(s.codigo ?? "")}</p>
      ${s.estado === "junto" ? `<p class="acct-l">${b("amigo.jogando", { name: a(s.nome ?? "") })}</p>` : `<p class="acct-s">${b("amigo.instrucoes")}</p><p class="acct-l">${b("amigo.esperando")}</p>`}
      <button id="btn-encerrar-convite" class="acct-btn">${b("amigo.encerrar")}</button></div>` : `<p class="muted small">${b("amigo.semConta")}</p>`;
  }
  soundRows() {
    return ["music", "sfx", "amb"].map((t) => `<div class="opt"><div class="opt-l">${b(`snd.${t}`)}</div><div class="seg">${[0, 1, 2, 3].map((s) => `<button data-${{ music: "musica", sfx: "efeitos", amb: "ambiente" }[t]}="${s}" aria-pressed="${D.opts[t] === s}">${b(`snd.l${s}`)}</button>`).join("")}</div></div>`).join("");
  }
  lang() {
    return `<div class="seg" role="group" aria-label="${b("lang.label")}"><button id="btn-idioma-en" aria-pressed="${qe() === "en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${qe() === "pt"}">PT</button></div>`;
  }
  /** na pausa: em que conta este jogo está sendo salvo (fora do site, nada) */
  pauseAccount(t, s) {
    if (s === "off" || s === "loading") return "";
    const a = s.logado ? s.apelido ?? "" : "", i = (n) => `<b>${le(n)}</b>`, o = `<button id="btn-entrar-conta-pausa" class="acct-btn strong">${b("acct.pauseLogin")}</button>`;
    return t && t === a ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAccount", { name: i(a) })}</p></div>` : t ? `<div class="acct small warn"><p class="acct-l">${b("acct.pauseOther", { name: i(t) })}</p>${a ? `<button id="btn-perfil-conta-pausa" class="acct-btn">${b("acct.switch")}</button>` : o}</div>` : a ? `<div class="acct on small"><p class="acct-l">${b("acct.pauseAdopt", { name: i(a) })}</p></div>` : `<div class="acct small"><p class="acct-l">${b("acct.pauseNone")}</p>${o}</div>`;
  }
  render() {
    const t = this.screen, s = this.root;
    if (s.dataset.open = String(!!t), s.dataset.screen = t?.k ?? "", !t) {
      s.innerHTML = "";
      return;
    }
    if (t.k === "start") {
      const { acc: n, save: r, other: l } = t.info, h = typeof n == "object" && n.logado ? n.apelido ?? "" : "", c = (M) => `<b>${le(M)}</b>`, u = r ? r.adopt ? b("save.adopt", { name: c(h) }) : h ? b("save.inAccount", { name: c(h) }) : b("save.deviceOnly") : "", d = n === "off" ? "" : n === "loading" ? `<div class="acct"><p class="acct-l">${b("acct.checking")}</p></div>` : n.logado ? `<div class="acct on"><p class="acct-k">${b("acct.yours")}</p><p class="acct-name">${le(h)}</p><p class="acct-l">${b(t.info.pending ? "acct.looking" : "acct.savesHere")}</p>
            <button id="btn-perfil-conta" class="acct-btn">${b("acct.switch")}</button></div>` : `<div class="acct"><p class="acct-k">${b("acct.none")}</p><p class="acct-l">${b("acct.deviceOnly")}</p>
            <button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>
            ${l ? `<p class="acct-s">${b("acct.otherHint", { name: c(l) })}</p>` : `<p class="acct-s">${b("acct.why")}</p>`}</div>`, f = n !== "loading" && !t.info.pending, p = `${d}
        ${f && r ? `<button id="btn-continuar" class="big primary">${b("menu.continue")}<small>${b("menu.saved", { era: b(`era.${r.meta.era}`), y: r.meta.year, r: r.meta.rivals })}</small><small class="where">${u}</small></button>` : ""}
        <button id="btn-novo-jogo" class="big${f && r ? "" : " primary"}">${b("menu.new")}</button>
        ${this.amigoOn && n !== "off" ? `<button id="btn-entrar-amigo" class="big">${At("amigo")}<span>${b("amigo.entrar")}</span></button>` : ""}`, y = `<p class="acct-k">${b("amigo.entrar")}</p>
        ${h ? `<p class="acct-l">${b("amigo.digite")}</p>
          <input id="codigo-amigo" class="codigo-in" maxlength="4" autocomplete="off" autocorrect="off" autocapitalize="characters" spellcheck="false" aria-label="${b("amigo.codigoCampo")}" value="${le(this.codigo)}">
          <button id="btn-entrar-codigo" class="big primary"${this.amigoBusy || !Gs.test(this.codigo) ? " disabled" : ""}>${b("amigo.entrarBtn")}</button>
          <p class="acct-s" id="amigo-msg" aria-live="polite">${le(this.amigoMsg)}</p>` : `<p class="acct-l">${b("amigo.semConta")}</p><button id="btn-entrar-conta" class="acct-btn strong">${b("acct.login")}</button>`}
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`, x = `${n === "off" ? "" : `<p class="muted small">${h ? b("new.inAccount", { name: c(h) }) : b("new.deviceOnly")}${r && !r.adopt ? " " + b("new.replaces") : ""}</p>`}<div class="opt"><div class="opt-l">${b("menu.rivals")}</div><div class="seg">${[1, 2, 3].map((M) => `<button data-rivais="${M}" aria-pressed="${this.rivals === M}">${M}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("menu.difficulty")}</div><div class="seg">${[0, 1, 2].map((M) => `<button data-dificuldade="${M}" aria-pressed="${this.diff === M}">${b(`diff.${M}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${b("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${b("menu.back")}</button>`;
      s.innerHTML = `<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${b("menu.tagline")}</div></div>
        <div class="card panel">${t.step === "main" ? p : t.step === "amigo" ? y : x}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${b(D.opts.muted ? "snd.unmute" : "snd.mute")}" aria-label="${b(D.opts.muted ? "snd.unmute" : "snd.mute")}" aria-pressed="${D.opts.muted}">${At(D.opts.muted ? "mute" : "sound")}</button><span class="credits">${b("menu.credits")}</span></div>
        ${n === "off" ? `<p class="local">${b("menu.local")}</p>` : ""}</div>`;
    } else t.k === "pause" ? s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("pause.title")}</h2><p class="muted">${b("pause.time", { m: t.minutes })}</p>
        ${this.pauseAccount(t.owner, t.acc)}
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <button id="btn-salvar" class="big">${b("pause.save")}</button>
        ${t.saved ? `<p class="saved ${t.saved === "fail" ? "fail" : t.saved === "saving" ? "" : t.saved === "other" || t.saved === "localOnly" ? "warn" : "ok"}">${b({ saving: "pause.saving", both: "pause.savedBoth", local: "pause.saved", localOnly: "pause.savedLocalOnly", other: "pause.savedOther", cloudOnly: "pause.savedCloudOnly", fail: "pause.saveFail" }[t.saved], { name: `<b>${le(t.owner)}</b>` })}</p>` : ""}
        ${this.pauseFriend(t.acc)}
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${Vs.map((n, r) => `<button data-qualidade="${n.key}" aria-pressed="${t.quality === r}">${b(`q.${n.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair">${b("pause.quit")}</button></div>
      </div></div>` : t.k === "guest" ? s.innerHTML = `<div class="screen pause"><div class="card panel">
        <h2>${b("amigo.titulo", { name: le(t.nome) })}</h2><p class="muted">${b("amigo.noJogoDe", { name: `<b>${le(t.nome)}</b>` })}</p>
        <button id="btn-voltar-jogo" class="big primary">${b("pause.resume")}</button>
        <div class="opt"><div class="opt-l">${b("q.label")}</div><div class="seg">${Vs.map((n, r) => `<button data-qualidade="${n.key}" aria-pressed="${t.quality === r}">${b(`q.${n.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${b("lang.label")}</div>${this.lang()}</div>
        ${this.soundRows()}
        <div class="row2"><button id="btn-ajuda-pausa">${b("btn.help")}</button><button id="btn-sair-amigo">${b("amigo.sair")}</button></div>
      </div></div>` : t.k === "info" ? s.innerHTML = `<div class="screen end"><div class="card panel">
        <h2>${le(t.titulo)}</h2><p>${le(t.texto)}</p>
        <button id="btn-fim-menu" class="big primary">${b("end.menu")}</button>
      </div></div>` : s.innerHTML = `<div class="screen end ${t.result}"><div class="card panel">
        <h2>${b(`end.${t.result}`)}</h2><p>${b(`end.${t.result}.d`)}</p><p class="muted">${b(`era.${t.era}`)} · ${b("pause.time", { m: t.minutes })}</p>
        <button id="btn-fim-menu" class="big primary">${b("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${b("end.watch")}</button>
      </div></div>`;
    const a = (n, r) => s.querySelectorAll(n).forEach((l) => l.onclick = () => r(l)), i = () => {
      try {
        localStorage.setItem(Eo, JSON.stringify({ rivals: this.rivals, diff: this.diff }));
      } catch {
      }
    };
    a("#btn-idioma-en", () => Ao("en")), a("#btn-idioma-pt", () => Ao("pt")), a("#btn-continuar", () => this.act.cont()), a("#btn-novo-jogo", () => {
      this.screen?.k === "start" && (this.screen.step = "new", this.render());
    }), a("#btn-voltar-inicio", () => {
      this.screen?.k === "start" && (this.screen.step = "main", this.render());
    }), a("[data-rivais]", (n) => {
      this.rivals = Number(n.dataset.rivais), i(), this.render();
    }), a("[data-dificuldade]", (n) => {
      this.diff = Number(n.dataset.dificuldade), i(), this.render();
    }), a("#btn-comecar", () => this.act.start(this.rivals, this.diff)), a("#btn-voltar-jogo", () => this.act.resume()), a("#btn-salvar", async () => {
      if (this.screen?.k !== "pause" || this.screen.saved === "saving") return;
      this.screen.saved = "saving", this.render();
      const n = await this.act.save();
      this.screen?.k === "pause" && (this.screen.saved = n, this.render());
    }), a("#btn-entrar-conta", () => this.act.login()), a("#btn-entrar-conta-pausa", () => this.act.loginPause()), a("#btn-perfil-conta-pausa", () => this.act.profile()), a("#btn-perfil-conta", () => this.act.profile()), a("[data-qualidade]", (n) => {
      const r = Vs.findIndex((l) => l.key === n.dataset.qualidade);
      r >= 0 && (this.screen?.k === "pause" || this.screen?.k === "guest") && (this.screen.quality = r, this.act.quality(r), this.render());
    }), a("#btn-entrar-amigo", () => {
      this.screen?.k === "start" && (this.screen.step = "amigo", this.amigoMsg = "", this.amigoBusy = !1, this.render());
    }), a("#btn-entrar-codigo", () => {
      Gs.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }), a("#btn-convidar-amigo", () => this.act.convidar()), a("#btn-encerrar-convite", () => this.act.encerrarConvite()), a("#btn-sair-amigo", () => this.act.sairAmigo());
    const o = s.querySelector("#codigo-amigo");
    o && (o.oninput = () => {
      const n = Oc(o.value);
      o.value !== n && (o.value = n), this.codigo = n, this.setAmigoMsg(this.amigoBusy ? this.amigoMsg : "", this.amigoBusy);
    }, o.onkeydown = (n) => {
      n.key === "Enter" && Gs.test(this.codigo) && !this.amigoBusy && this.act.entrarAmigo(this.codigo);
    }, this.amigoBusy || setTimeout(() => o.focus({ preventScroll: !0 }), 50)), a("#btn-ajuda-pausa", () => this.act.help()), a("#btn-som-inicio", () => {
      D.toggleMute(), this.render();
    }), a("[data-musica]", (n) => {
      D.setOpts({ music: Number(n.dataset.musica), muted: !1 }), this.render();
    }), a("[data-efeitos]", (n) => {
      D.setOpts({ sfx: Number(n.dataset.efeitos), muted: !1 }), this.render();
    }), a("[data-ambiente]", (n) => {
      D.setOpts({ amb: Number(n.dataset.ambiente), muted: !1 }), this.render();
    }), a("#btn-sair", () => this.act.quit()), a("#btn-fim-menu", () => this.act.toMenu()), a("#btn-continuar-olhando", () => this.act.watch()), s.querySelector(".primary")?.focus({ preventScroll: !0 });
  }
}
function Rc(e, t, s, a) {
  const i = s.filter((c) => e.isUnit(c) && e.owner[c] === t), o = i.filter((c) => e.kind[c] === ct.villager), n = i.filter((c) => e.kind[c] !== ct.villager), r = Math.round(a.x * 256), l = Math.round(a.z * 256), h = (c) => c.length ? [{ type: "move", player: t, ids: c, x: r, z: l }] : [];
  if (a.kind === "tile" && o.length) return { cmds: [{ type: "gather", player: t, ids: o, k: a.k }, ...h(n)], ping: "work" };
  if (a.kind === "building" && e.alive[a.e]) {
    const c = a.e;
    return e.owner[c] === t ? { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: c }] : [], ...h(n)], ping: o.length ? "work" : "move" } : { cmds: [{ type: "attack", player: t, ids: i, target: c }], ping: "attack" };
  }
  if (a.kind === "unit" && e.alive[a.e]) {
    const c = a.e;
    if (e.kind[c] === gt) return { cmds: [...o.length ? [{ type: "work", player: t, ids: o, target: c }] : [], ...h(n)], ping: o.length ? "work" : "move" };
    if (e.owner[c] !== t && (e.owner[c] === kt || e.hostile(t, e.owner[c]))) return { cmds: [{ type: "attack", player: t, ids: i, target: c }], ping: "attack" };
  }
  return { cmds: h(i), ping: "move" };
}
const Nc = (e, t) => {
  for (const s of t) if (e.isUnit(s) && e.kind[s] === ct.villager) return !0;
  return !1;
}, qn = 2, Rn = [
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
], Io = /* @__PURE__ */ new WeakMap();
function Fc(e) {
  let t = Io.get(e);
  if (t) return t;
  const s = sn(e.map.seed, e.players.length, e.map.versao), a = s.size * s.size, i = new Uint8Array(a), o = new Int32Array(a);
  for (let n = 0; n < a; n++) s.tree[n] && (o[n] = s.wood[n] * 100);
  for (const n of s.res) {
    const r = n.z * s.size + n.x;
    i[r] = n.kind, o[r] = n.amount * 100;
  }
  return t = { tree: s.tree, kind: i, amt: o }, Io.set(e, t), t;
}
function Lc(e) {
  const t = [];
  let s = 0, a = 0;
  for (let i = 0; i < e.length; i++) {
    const o = e[i] ? 1 : 0;
    o === s ? a++ : (t.push(a), s = o, a = 1);
  }
  return t.push(a), t;
}
function Oo(e, t) {
  let s = 0, a = 0;
  for (const i of e)
    a && t.fill(1, s, s + i), s += i, a ^= 1;
}
function Nn(e) {
  const t = Fc(e), s = e.size, a = e.top, i = {};
  for (const c of Rn) i[c] = Array.from(e[c].subarray(0, a));
  const o = [];
  for (let c = 0; c < a; c++) e.alive[c] && e.queue[c].length && o.push([c, e.queue[c].slice()]);
  const n = [], r = [], l = [];
  for (let c = 0; c < s * s; c++)
    t.tree[c] && !e.map.tree[c] && n.push(c), e.resAmt[c] !== t.amt[c] && r.push(c, e.resAmt[c]), e.resKind[c] !== t.kind[c] && l.push(c, e.resKind[c]);
  const h = e.players.find((c) => !c.ai) ?? e.players[0];
  return {
    v: qn,
    mapa: e.map.versao,
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
    explored: e.explored.map(Lc),
    projectiles: e.projectiles.map((c) => ({ ...c })),
    meta: { era: h.era, year: e.year, rivals: e.players.filter((c) => c.ai).length, difficulty: e.difficulty, minutes: Math.floor(e.tick / 600) }
  };
}
function Ha(e) {
  if (!e || e.v !== 1 && e.v !== qn) throw new Error("save version");
  const t = e.v === 1 ? 1 : e.mapa;
  if (typeof t != "number" || !Number.isInteger(t) || t < 1 || t > Ni) throw new Error("save version");
  const s = new yn(e.seed, e.players, { humans: e.humans, difficulty: e.difficulty, mapa: t }), a = s.size, i = a * a;
  for (const o of Rn) {
    const n = s[o];
    n.fill(o === "ignoreT" || o === "dropB" || o === "tgt" ? -1 : 0), e.ent[o] && n.set(e.ent[o]);
  }
  s.top = e.top;
  for (let o = 0; o < st; o++)
    s.queue[o] = [], s.field[o] = null, s.path[o] = null;
  for (const [o, n] of e.queue) s.queue[o] = n.slice();
  if (s.px.set(s.x), s.pz.set(s.z), !e.ent.foodMode)
    for (let o = 0; o < e.top; o++) s.alive[o] && s.kind[o] === bt + Vt.center && (s.hp[o] = Math.min(Et[Vt.center].hp, s.hp[o] * 2));
  for (const o of e.cut)
    s.map.tree[o] = 0, s.map.wood[o] = 0;
  for (let o = 0; o < e.amt.length; o += 2) s.resAmt[e.amt[o]] = e.amt[o + 1];
  for (let o = 0; o < e.kindDiff.length; o += 2) s.resKind[e.kindDiff[o]] = e.kindDiff[o + 1];
  for (let o = 0; o < i; o++) s.resKind[o] === Jt && s.resAmt[o] <= 0 && (s.resKind[o] = 0, s.resAmt[o] = 0);
  for (let o = 0; o < i; o++) !s.map.tree[o] && !s.resKind[o] && (s.resAmt[o] = 0);
  s.bAt.fill(0);
  for (let o = 0; o < i; o++) s.blocked[o] = Ys(s.map.terrain[o]) || s.map.tree[o] || s.resKind[o] ? 1 : 0;
  for (let o = 0; o < s.top; o++) if (s.alive[o] && s.kind[o] >= bt) {
    const [n, r, l] = s.footprint(o), h = Et[s.kind[o] - bt].walk;
    for (let c = 0; c < l; c++) for (let u = 0; u < l; u++) {
      const d = (r + c) * a + n + u;
      s.bAt[d] = o + 1, h || (s.blocked[d] = 1);
    }
  }
  e.explored.forEach((o, n) => {
    s.explored[n].fill(0), Oo(o, s.explored[n]);
  }), e.P.forEach((o, n) => {
    const r = s.players[n];
    Object.assign(r.res, o.res), r.era = o.era, r.aging = o.aging, r.agingB = o.agingB, r.hunger = o.hunger, r.defeated = o.defeated, r.lastAlert = o.lastAlert, r.ai = o.ai, r.tech = o.tech ?? 0;
  }), s.ai = e.ai.map((o) => ({ ...o })), s.barbNext = e.barbNext, s.barbWarned = e.barbWarned, s.outcome = e.outcome, s.tick = e.tick, s.rng.load(e.rng), s.projectiles = e.projectiles.map((o) => ({ ...o })), s.events.length = 0;
  for (let o = 0; o < s.top; o++) s.alive[o] && s.state[o] === Wt && (s.task[o] === Nt ? s.goPoint(o, s.slotX[o], s.slotZ[o]) : s.state[o] = Pt);
  return s.updateFog(), e.explored.forEach((o, n) => {
    s.explored[n].fill(0), Oo(o, s.explored[n]);
  }), s;
}
const Po = "origines_save_v1", Pa = "origines_save_meta_v1", fs = (e) => e ? `${Po}@${e}` : Po, ta = (e) => e ? `${Pa}@${e}` : Pa;
function Fn(e, t) {
  try {
    return localStorage.setItem(fs(t), JSON.stringify(e)), localStorage.setItem(ta(t), JSON.stringify(e.meta)), !0;
  } catch {
    return !1;
  }
}
function Bo(e, t) {
  const s = Nn(e);
  return s.meta.savedAt = Date.now(), { d: s, ok: Fn(s, t) };
}
function Uc(e, t) {
  Fn(e, t);
}
function Ks(e) {
  try {
    const t = localStorage.getItem(ta(e));
    return t && localStorage.getItem(fs(e)) ? JSON.parse(t) : null;
  } catch {
    return null;
  }
}
function _c(e) {
  try {
    const t = localStorage.getItem(fs(e));
    return t ? Ha(JSON.parse(t)) : null;
  } catch {
    return null;
  }
}
function Hi(e) {
  try {
    localStorage.removeItem(fs(e)), localStorage.removeItem(ta(e));
  } catch {
  }
}
function Gi(e, t) {
  if (e !== t)
    try {
      const s = localStorage.getItem(fs(e)), a = localStorage.getItem(ta(e));
      if (!s || !a) return;
      localStorage.setItem(fs(t), s), localStorage.setItem(ta(t), a), Hi(e);
    } catch {
    }
}
function Hc(e) {
  try {
    const t = localStorage.getItem(fs(e));
    if (!t) return null;
    const s = JSON.parse(t);
    return { seed: s.seed, tick: s.tick };
  } catch {
    return null;
  }
}
const Ln = "origines_save_contas_v1", Gc = () => {
  try {
    return localStorage.getItem(Ln) === "1";
  } catch {
    return !0;
  }
}, jc = () => {
  try {
    localStorage.setItem(Ln, "1");
  } catch {
  }
};
function Dc() {
  const e = [];
  try {
    for (let t = 0; t < localStorage.length; t++) {
      const s = localStorage.key(t);
      if (!s || !s.startsWith(Pa + "@")) continue;
      const a = s.slice(Pa.length + 1), i = Ks(a);
      i && e.push({ dono: a, meta: i });
    }
  } catch {
  }
  return e.sort((t, s) => (s.meta.savedAt ?? 0) - (t.meta.savedAt ?? 0));
}
const ji = "/api/origines/save", Un = !location.pathname.startsWith("/jogar/");
let de = null, Le = null, _n = Un;
const Hn = [], ea = () => Hn.forEach((e) => e()), Ga = () => _n ? !de || !Le ? "off" : Le : "loading", Wc = (e) => {
  Hn.push(e);
}, ps = () => !!Le?.logado, Ue = () => Le?.logado ? Le.apelido ?? "" : "";
async function Vc() {
  if (!Un) {
    try {
      const e = window;
      e.QGConta || await new Promise((t, s) => {
        const a = document.createElement("script");
        a.src = "/conta.js?v=2", a.onload = () => t(), a.onerror = () => s(new Error("conta")), document.head.appendChild(a);
      }), de = e.QGConta ?? null, de && (Le = await de.me(), de.aoMudar((t) => {
        Le = t, ea();
      }));
    } catch {
      de = null, Le = null;
    }
    _n = !0, ea();
  }
}
async function Ye() {
  if (!de) return;
  const e = Ue();
  try {
    const t = await de.me();
    t && (Le = t);
  } catch {
  }
  Ue() !== e && ea();
}
const qo = async () => {
  de && (await de.entrar(), await Ye(), ea());
};
async function Kc() {
  de && (await de.perfil(), await Ye(), ps() || (await de.entrar({ aba: "entrar" }), await Ye()), ea());
}
async function Xc() {
  if (!ps()) return null;
  try {
    const e = await fetch(ji, { credentials: "same-origin" });
    return e.ok ? (await e.json()).save ?? null : null;
  } catch {
    return null;
  }
}
async function Gn() {
  if (!ps()) return null;
  try {
    const e = await fetch(`${ji}?dados=1`, { credentials: "same-origin" });
    return e.ok ? (await e.json()).dados ?? null : null;
  } catch {
    return null;
  }
}
const jn = (e, t = !1) => fetch(ji, { method: "POST", credentials: "same-origin", keepalive: t, headers: { "content-type": "application/json" }, body: JSON.stringify(e) });
async function Ro(e, t, s = !1) {
  if (s || await Ye(), !ps()) return "none";
  if (!t || Ue() !== t) return "other";
  try {
    const a = { dados: e };
    return s && JSON.stringify(a).length > 6e4 && (s = !1), (await jn(a, s)).ok ? "ok" : "fail";
  } catch {
    return "fail";
  }
}
async function Yc(e) {
  if (await Ye(), !(!e || Ue() !== e))
    try {
      await jn({ apagar: !0 });
    } catch {
    }
}
const Zc = (e) => ({ era: e.era, year: e.ano, rivals: e.rivais, difficulty: e.dificuldade, minutes: e.minutos, savedAt: e.salvoEm }), Dn = ["move", "amove", "gather", "work", "attack", "build", "train", "cancel", "ageup", "rally", "stop", "food", "research", "trade", "wall"], is = 400, Jc = 40, Qc = 600, js = (e) => typeof e == "number" && Number.isInteger(e) && Math.abs(e) <= 2 ** 32;
function Wn(e) {
  const t = [Dn.indexOf(e.type), e.player], s = (a) => {
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
      s(e.ids), t.push(Vt[e.key], e.tx, e.tz);
      break;
    case "train":
      t.push(e.building, ct[e.key]);
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
      t.push(e.building, Sa[e.key]);
      break;
    case "trade":
      t.push(e.building, Xe.indexOf(e.give), Xe.indexOf(e.get));
      break;
    case "wall":
      s(e.ids), s(e.tiles);
      break;
  }
  return t;
}
function Vn(e) {
  if (!Array.isArray(e) || e.length < 2 || e.length > Qc || !e.every(js)) return null;
  const t = e;
  let s = 2, a = !0;
  const i = () => s >= t.length ? (a = !1, 0) : t[s++], o = (c) => {
    const u = i();
    if (u < 0 || u > c || s + u > t.length)
      return a = !1, [];
    const d = t.slice(s, s + u);
    return s += u, d;
  }, n = (c, u) => {
    const d = c[u];
    return d || (a = !1), d?.key ?? "";
  }, r = Dn[t[0]], l = t[1];
  let h = null;
  switch (r) {
    case "move":
    case "amove": {
      const c = o(is);
      h = { type: r, player: l, ids: c, x: i(), z: i() };
      break;
    }
    case "gather": {
      const c = o(is);
      h = { type: "gather", player: l, ids: c, k: i() };
      break;
    }
    case "work":
    case "attack": {
      const c = o(is);
      h = { type: r, player: l, ids: c, target: i() };
      break;
    }
    case "build": {
      const c = o(is);
      h = { type: "build", player: l, ids: c, key: n(Et, i()), tx: i(), tz: i() };
      break;
    }
    case "train": {
      const c = i();
      h = { type: "train", player: l, building: c, key: n(G, i()) };
      break;
    }
    case "cancel":
    case "ageup":
      h = { type: r, player: l, building: i() };
      break;
    case "rally":
      h = { type: "rally", player: l, building: i(), x: i(), z: i() };
      break;
    case "stop":
      h = { type: "stop", player: l, ids: o(is) };
      break;
    case "food": {
      const c = o(is), u = i();
      u !== 0 && u !== 1 && (a = !1), h = { type: "food", player: l, ids: c, on: u === 1 };
      break;
    }
    case "research": {
      const c = i();
      h = { type: "research", player: l, building: c, key: n(Ke, i()) };
      break;
    }
    case "trade": {
      const c = i(), u = Xe[i()], d = Xe[i()];
      (!u || !d) && (a = !1), h = { type: "trade", player: l, building: c, give: u, get: d };
      break;
    }
    case "wall": {
      const c = o(is);
      h = { type: "wall", player: l, ids: c, tiles: o(Jc) };
      break;
    }
    default:
      return null;
  }
  return a && s === t.length ? h : null;
}
class t0 {
  constructor() {
    m(this, "ordens", []);
    m(this, "marcas", []);
    m(this, "avisado", 0);
  }
  /** começa (ou recomeça, depois de mandar o jogo ao amigo) a partir deste mundo */
  ligar(t) {
    this.ordens = [], this.marcas = [], this.avisado = t.tick, t.onApplied = (s, a) => {
      for (const i of a) this.ordens.push([s, ...Wn(i)]);
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
  /** ordem que chegou do amigo: entra no jogo como ordem de fora, sempre para a tribo de quem joga (me) */
  ordemDoAmigo(t, s, a) {
    const i = Vn(s);
    return i ? (i.player = a, t.issue(i, !0), i) : null;
  }
}
class e0 {
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
    if (!Array.isArray(s) || s.length !== 3 || !js(s[0]) || !Array.isArray(s[1]) || !Array.isArray(s[2])) return !1;
    const [a, i, o] = s;
    if (a < this.ate) return !1;
    for (const n of o) {
      if (!Array.isArray(n) || !js(n[0]) || n[0] < t.tick) continue;
      const r = Vn(n.slice(1));
      r && t.schedule(r, n[0]);
    }
    for (const n of i) Array.isArray(n) && js(n[0]) && js(n[1]) && this.marcas.set(n[0], n[1]);
    return this.ate = a, !0;
  }
  /** depois de cada passo: confere a impressão digital, se o anfitrião mandou uma para este passo */
  depoisDoPasso(t) {
    const s = this.marcas.get(t.tick);
    s !== void 0 && (this.marcas.delete(t.tick), s !== t.hash() && (this.divergiu = !0));
  }
}
const No = /* @__PURE__ */ new WeakMap();
function Di(e) {
  let t = No.get(e);
  if (!t) {
    const s = e.sampleRate * 2, a = e.createBuffer(1, s, e.sampleRate), i = a.getChannelData(0);
    let o = 22222;
    for (let n = 0; n < s; n++)
      o = o * 16807 % 2147483647, i[n] = o / 10737418235e-1 - 1;
    t = { noise: a, pluck: /* @__PURE__ */ new Map() }, No.set(e, t);
  }
  return t;
}
function Cs(e, t, s) {
  const a = e.createBufferSource();
  return a.buffer = Di(e).noise, a.loop = !0, a.start(t, t * 7.31 % 1.5), a.stop(t + s + 0.05), a;
}
function Ot(e, t, s, a, i, o = 0) {
  const n = e.createGain(), r = Math.max(2e-4, s);
  return n.gain.setValueAtTime(1e-4, t), n.gain.exponentialRampToValueAtTime(r, t + a), o && n.gain.setValueAtTime(r, t + a + o), n.gain.exponentialRampToValueAtTime(1e-4, t + a + o + i), n;
}
function Zt(e, t, s, a = 1) {
  const i = e.createBiquadFilter();
  return i.type = t, i.frequency.value = s, i.Q.value = a, i;
}
function Lt(e, t, s, a, i) {
  const o = e.createOscillator();
  return o.type = t, o.frequency.setValueAtTime(s, a), o.start(a), o.stop(a + i + 0.05), o;
}
function zt(...e) {
  for (let t = 0; t < e.length - 1; t++) e[t].connect(e[t + 1]);
  return e[e.length - 1];
}
function yt(e, t, s, a, i, o, n, r, l = 4e-3) {
  const h = Lt(e, a, i, s, n);
  h.frequency.exponentialRampToValueAtTime(Math.max(20, o), s + n), zt(h, Ot(e, s, r, l, n), t);
}
function nt(e, t, s, a, i, o, n, r, l = 3e-3) {
  zt(Cs(e, s, n + l), Zt(e, a, i, o), Ot(e, s, r, l, n), t);
}
function oi(e, t, s, a, i) {
  const o = Cs(e, s, i.dur), n = Zt(e, "bandpass", i.f, 3), r = e.createGain(), l = Lt(e, "sine", i.lfo[0], s, i.dur), h = e.createGain();
  return l.frequency.linearRampToValueAtTime(i.lfo[1], s + i.dur * 0.9), h.gain.value = 0.5, r.gain.value = 0.5, l.connect(h).connect(r.gain), zt(o, n, r, Ot(e, s, 0.1 * a, i.dur * 0.22, i.dur * 0.73), t), nt(e, t, s + i.snapAt, "bandpass", i.snapF, 2, 0.03, (i.snap ?? 0.08) * a), Math.max(i.dur, i.snapAt + 0.06);
}
function ce(e, t, s, a, i, o = [1, 2.4, 3.6, 5.1], n = 1.6) {
  o.forEach((r, l) => zt(Lt(e, "sine", a * r, s, n), Ot(e, s, i / (1 + l * 0.9), 3e-3, n / (1 + l * 0.6)), t));
}
function s0(e, t, s, a, i, o) {
  const n = Lt(e, "sine", a, s, o), r = Lt(e, "sine", a * 1.4, s, o), l = e.createGain();
  l.gain.setValueAtTime(a * 1.6, s), l.gain.exponentialRampToValueAtTime(a * 0.1, s + o), r.connect(l).connect(n.frequency), zt(n, Ot(e, s, i, 2e-3, o), t);
  for (const [h, c] of [[2.756, 0.5], [5.404, 0.3], [8.933, 0.18]]) for (const u of [1, 1.007]) zt(Lt(e, "sine", a * h * u, s, o * 0.7), Ot(e, s, i * c * 0.5, 2e-3, o * (0.7 - h * 0.04)), t);
}
function a0(e, t) {
  const s = Math.round(t * 10), a = Di(e);
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
function i0(e, t, s, a, i, o = 2600, n = 1.6) {
  const r = e.createBufferSource();
  r.buffer = a0(e, a), r.start(s), r.stop(s + n), zt(r, Zt(e, "lowpass", o, 0.7), Ot(e, s, i, 2e-3, n), t);
}
function ve(e, t, s, a, i, o, n, r, l = "sawtooth") {
  const h = e.createOscillator();
  h.type = l, h.frequency.setValueAtTime(i[0][1], s);
  for (const [f, p] of i.slice(1)) h.frequency.linearRampToValueAtTime(p, s + f);
  const c = e.createOscillator(), u = e.createGain();
  c.frequency.value = n[0], u.gain.value = n[1], c.connect(u).connect(h.frequency), h.start(s), h.stop(s + a + 0.05), c.start(s), c.stop(s + a + 0.05);
  const d = Ot(e, s, r, Math.min(0.05, a * 0.2), a * 0.8, a * 0.1);
  for (const [f, p] of o) {
    const y = e.createGain();
    y.gain.value = p, zt(h, Zt(e, "bandpass", f, 6), y, d);
  }
  d.connect(t);
}
function xa(e) {
  const t = e.createBufferSource();
  return t.buffer = Di(e).noise, t.loop = !0, t.start(), t;
}
function Si(e, t, s, a, i) {
  const o = 3 + i % 4, n = 2600 + i * 137 % 1600;
  for (let r = 0; r < o; r++) {
    const l = s + r * (0.07 + (i + r) % 3 * 0.02), h = n * (1 + (i * (r + 3) % 7 - 3) * 0.06), c = Lt(e, "sine", h, l, 0.07);
    c.frequency.exponentialRampToValueAtTime(h * (r % 2 ? 0.8 : 1.35), l + 0.06), zt(c, Ot(e, l, 0.05 * a, 0.01, 0.05), t);
  }
  return o * 0.1;
}
const me = {
  // interface
  "ui.click": (e, t, s, a) => (yt(e, t, s, "sine", 700, 420, 0.05, 0.2 * a), nt(e, t, s, "bandpass", 2400, 2, 0.025, 0.06 * a), 0.08),
  "ui.denied": (e, t, s, a) => {
    const i = Lt(e, "sine", 240, s, 0.15);
    return i.frequency.exponentialRampToValueAtTime(170, s + 0.14), zt(i, Zt(e, "lowpass", 900), Ot(e, s, 0.16 * a, 6e-3, 0.14), t), 0.16;
  },
  "sel.villager": (e, t, s, a) => (yt(e, t, s, "triangle", 560, 480, 0.05, 0.12 * a), yt(e, t, s + 0.07, "triangle", 700, 600, 0.05, 0.1 * a), 0.14),
  "sel.soldier": (e, t, s, a) => (yt(e, t, s, "sine", 180, 90, 0.12, 0.24 * a), nt(e, t, s, "lowpass", 600, 1, 0.04, 0.1 * a), 0.14),
  "sel.building": (e, t, s, a) => (yt(e, t, s, "sine", 300, 220, 0.08, 0.18 * a), yt(e, t, s + 0.09, "sine", 300, 220, 0.08, 0.13 * a), 0.2),
  "order.move": (e, t, s, a) => (nt(e, t, s, "lowpass", 500, 1, 0.05, 0.13 * a), nt(e, t, s + 0.11, "lowpass", 450, 1, 0.05, 0.11 * a), 0.18),
  "order.work": (e, t, s, a) => (nt(e, t, s, "bandpass", 2600, 3, 0.03, 0.12 * a), yt(e, t, s, "sine", 1500, 1300, 0.02, 0.05 * a), 0.05),
  "order.attack": (e, t, s, a) => (yt(e, t, s, "sine", 150, 70, 0.18, 0.28 * a), nt(e, t, s, "lowpass", 800, 1, 0.05, 0.1 * a), 0.2),
  place: (e, t, s, a) => (yt(e, t, s, "sine", 190, 85, 0.2, 0.3 * a), nt(e, t, s, "lowpass", 400, 1, 0.08, 0.12 * a), 0.22),
  "place.bad": (e, t, s, a) => {
    const i = Lt(e, "triangle", 170, s, 0.17);
    return i.frequency.exponentialRampToValueAtTime(120, s + 0.16), zt(i, Zt(e, "lowpass", 900), Ot(e, s, 0.18 * a, 5e-3, 0.16), t), 0.18;
  },
  trained: (e, t, s, a) => (ce(e, t, s, 880, 0.14 * a, [1, 1.5], 0.35), 0.4),
  built: (e, t, s, a) => (yt(e, t, s, "sine", 180, 100, 0.14, 0.2 * a), yt(e, t, s + 0.12, "sine", 150, 90, 0.14, 0.18 * a), ce(e, t, s + 0.26, 1046, 0.09 * a, [1, 1.5], 0.6), 0.9),
  // avisos
  tech: (e, t, s, a) => (ce(e, t, s, 660, 0.15 * a, [1, 2, 2.76, 4.07], 1.6), ce(e, t, s + 0.18, 990, 0.1 * a, [1, 2, 2.76], 1.2), 1.8),
  metal: (e, t, s, a) => ([880, 1108, 1320].forEach((i, o) => ce(e, t, s + o * 0.11, i, 0.09 * a, [1, 2.4, 3.6], 0.9)), 1.2),
  horn: (e, t, s, a) => {
    const i = Ot(e, s, 0.2 * a, 0.18, 0.4, 0.9), o = Zt(e, "lowpass", 1100, 0.7);
    for (const [n, r] of [[98, 1], [98.7, 0.8], [147, 0.45]]) {
      const l = Lt(e, "sawtooth", n, s, 1.6), h = e.createGain();
      h.gain.value = r, zt(l, h, o);
    }
    return zt(o, i, t), 1.6;
  },
  "drums.war": (e, t, s, a) => ([0, 0.45, 0.9, 1.2, 1.5, 1.95, 2.25, 2.55].forEach((i, o) => {
    yt(e, t, s + i, "sine", 95, 55, 0.3, (0.12 + o * 0.025) * a), nt(e, t, s + i, "lowpass", 300, 1, 0.05, 0.06 * a);
  }), 2.9),
  gong: (e, t, s, a) => (ce(e, t, s, 110, 0.22 * a, [1, 1.44, 2.05, 2.84, 3.82], 3), nt(e, t, s, "lowpass", 2e3, 1, 0.05, 0.08 * a), 3),
  winter: (e, t, s, a) => {
    const i = Cs(e, s, 1.8), o = Zt(e, "lowpass", 300, 0.8);
    return o.frequency.linearRampToValueAtTime(900, s + 0.8), o.frequency.linearRampToValueAtTime(300, s + 1.7), zt(i, o, Ot(e, s, 0.1 * a, 0.5, 1.2), t), ce(e, t, s + 0.3, 520, 0.1 * a, [1, 2.4, 3.6], 2), 2.3;
  },
  spring: (e, t, s, a) => {
    for (let i = 0; i < 5; i++) Si(e, t, s + i * 0.22, a * 1.6, 3 + i * 5);
    return 1.6;
  },
  hunger: (e, t, s, a) => (zt(Lt(e, "sine", 98, s, 1.1), Ot(e, s, 0.1 * a, 0.1, 0.9), t), zt(Lt(e, "sine", 147, s, 1.1), Ot(e, s, 0.06 * a, 0.1, 0.9), t), 1.1),
  soft: (e, t, s, a) => (ce(e, t, s, 784, 0.07 * a, [1, 2], 0.5), 0.5),
  fair: (e, t, s, a) => {
    [587, 740, 880, 988, 880].forEach((i, o) => sa(e, t, s + o * 0.14, i, 0.13, 0.1 * a));
    for (let i = 0; i < 4; i++) Ba(e, t, s + i * 0.18, 0.5 * a);
    return 0.9;
  },
  // trabalho
  "work.chop": (e, t, s, a) => (nt(e, t, s, "bandpass", 1100, 1.5, 0.05, 0.28 * a), yt(e, t, s, "sine", 260, 170, 0.06, 0.18 * a), 0.08),
  "work.pick": (e, t, s, a) => (ce(e, t, s, 2100, 0.1 * a, [1, 1.45], 0.09), nt(e, t, s, "highpass", 3e3, 1, 0.015, 0.06 * a), 0.1),
  "work.pickMetal": (e, t, s, a) => (ce(e, t, s, 2600, 0.09 * a, [1, 1.5, 2.04], 0.2), nt(e, t, s, "highpass", 3e3, 1, 0.012, 0.05 * a), 0.2),
  "work.hoe": (e, t, s, a) => (nt(e, t, s, "lowpass", 350, 1, 0.09, 0.22 * a), yt(e, t, s, "sine", 120, 80, 0.08, 0.12 * a), 0.1),
  "work.mallet": (e, t, s, a) => (yt(e, t, s, "sine", 330, 240, 0.07, 0.22 * a), nt(e, t, s, "bandpass", 900, 1.5, 0.04, 0.1 * a), 0.08),
  "work.rustle": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.15]) nt(e, t, s + i, "bandpass", 4e3, 1, 0.05, 0.06 * a);
    return 0.22;
  },
  "drop.wood": (e, t, s, a) => (yt(e, t, s, "sine", 160, 110, 0.12, 0.2 * a), nt(e, t, s, "lowpass", 500, 1, 0.06, 0.1 * a), 0.14),
  "drop.stone": (e, t, s, a) => {
    for (let i = 0; i < 4; i++) nt(e, t, s + i * 0.035, "bandpass", 1500 + i * 200, 2, 0.03, 0.08 * a);
    return 0.18;
  },
  "drop.food": (e, t, s, a) => {
    for (const i of [0, 0.06]) nt(e, t, s + i, "bandpass", 2e3, 1, 0.06, 0.07 * a);
    return 0.14;
  },
  "drop.metal": (e, t, s, a) => (ce(e, t, s, 2600, 0.07 * a, [1, 1.5], 0.15), ce(e, t, s + 0.07, 2900, 0.06 * a, [1, 1.5], 0.15), 0.25),
  "tree.fall": (e, t, s, a) => {
    const i = Lt(e, "sawtooth", 90, s, 0.45);
    return i.frequency.linearRampToValueAtTime(70, s + 0.45), zt(i, Zt(e, "bandpass", 400, 4), Ot(e, s, 0.05 * a, 0.05, 0.4), t), nt(e, t, s + 0.4, "lowpass", 700, 1, 0.7, 0.18 * a, 0.01), yt(e, t, s + 0.4, "sine", 70, 45, 0.4, 0.16 * a), 1.2;
  },
  "res.crumble": (e, t, s, a) => {
    for (let i = 0; i < 5; i++) nt(e, t, s + i * 0.09, "lowpass", 900, 1, 0.08, (0.14 - i * 0.02) * a);
    return 0.55;
  },
  puff: (e, t, s, a) => (nt(e, t, s, "lowpass", 600, 0.7, 0.3, 0.15 * a, 0.02), yt(e, t, s, "sine", 150, 100, 0.12, 0.05 * a), 0.34),
  "fall.animal": (e, t, s, a) => (yt(e, t, s, "sine", 95, 50, 0.25, 0.22 * a), nt(e, t, s + 0.05, "lowpass", 600, 0.7, 0.3, 0.12 * a, 0.02), 0.4),
  crash: (e, t, s, a) => {
    nt(e, t, s, "lowpass", 1200, 0.8, 1.1, 0.26 * a, 0.01);
    for (const i of [0, 0.18, 0.36]) yt(e, t, s + i, "sine", 80, 45, 0.25, 0.18 * a);
    return 1.2;
  },
  // batalha
  "hit.club": (e, t, s, a) => (yt(e, t, s, "sine", 320, 210, 0.07, 0.26 * a), nt(e, t, s, "bandpass", 1600, 1.5, 0.04, 0.1 * a), 0.08),
  "hit.axe": (e, t, s, a) => (nt(e, t, s, "bandpass", 1e3, 2, 0.06, 0.26 * a), yt(e, t, s, "sine", 240, 160, 0.06, 0.16 * a), 0.08),
  // espada: tinido de metal (pedido do dono, 20/11/2026), com o chiado da lâmina e a pancada por baixo
  "hit.sword": (e, t, s, a) => (s0(e, t, s, 1250, 0.07 * a, 0.55), nt(e, t, s, "highpass", 4500, 0.8, 0.05, 0.09 * a), yt(e, t, s, "sine", 260, 170, 0.05, 0.1 * a), 0.55),
  "hit.spear": (e, t, s, a) => {
    const i = Cs(e, s, 0.12), o = Zt(e, "bandpass", 2200, 2);
    return o.frequency.exponentialRampToValueAtTime(900, s + 0.1), zt(i, o, Ot(e, s, 0.12 * a, 0.01, 0.1), t), yt(e, t, s + 0.08, "sine", 400, 300, 0.03, 0.08 * a), 0.13;
  },
  "hit.wall": (e, t, s, a) => (yt(e, t, s, "sine", 200, 130, 0.09, 0.24 * a), nt(e, t, s, "lowpass", 700, 1, 0.05, 0.12 * a), 0.1),
  "hit.bite": (e, t, s, a) => (nt(e, t, s, "bandpass", 1500, 2, 0.04, 0.12 * a), yt(e, t, s, "sine", 500, 300, 0.05, 0.08 * a), ve(e, t, s, 0.18, [[0, 110], [0.18, 95]], [[400, 1]], [22, 8], 0.05 * a), 0.2),
  "hit.boar": (e, t, s, a) => (ve(e, t, s, 0.1, [[0, 140], [0.1, 120]], [[500, 1], [1100, 0.4]], [30, 10], 0.1 * a), ve(e, t, s + 0.13, 0.08, [[0, 130], [0.08, 115]], [[500, 1]], [30, 10], 0.08 * a), yt(e, t, s, "sine", 120, 70, 0.12, 0.12 * a), 0.25),
  "hit.aurochs": (e, t, s, a) => (yt(e, t, s, "sine", 100, 55, 0.2, 0.2 * a), nt(e, t, s, "bandpass", 700, 1.5, 0.12, 0.08 * a), 0.22),
  throw: (e, t, s, a) => {
    const i = Cs(e, s, 0.36), o = Zt(e, "bandpass", 500, 1.2);
    return o.frequency.exponentialRampToValueAtTime(1600, s + 0.15), o.frequency.exponentialRampToValueAtTime(700, s + 0.34), zt(i, o, Ot(e, s, 0.1 * a, 0.08, 0.26), t), 0.36;
  },
  // arco, torre e funda soam parecidos (pedido do dono, 20/11/2026): o mesmo zunido, com o estalo da soltura
  bow: (e, t, s, a) => oi(e, t, s, a, { dur: 0.3, f: 1800, lfo: [16, 24], snapAt: 0, snapF: 2900, snap: 0.1 }),
  // a corda estala primeiro, depois a flecha zune
  tower: (e, t, s, a) => oi(e, t, s, a, { dur: 0.34, f: 1500, lfo: [13, 20], snapAt: 0, snapF: 2300, snap: 0.1 }),
  // como o arco, um pouco mais grave
  sling: (e, t, s, a) => oi(e, t, s, a, { dur: 0.45, f: 1400, lfo: [10, 18], snapAt: 0.42, snapF: 2500 }),
  // gira (o zunido tremula) e solta a pedra no fim
  "arrow.hit": (e, t, s, a) => (yt(e, t, s, "sine", 420, 260, 0.04, 0.16 * a), nt(e, t, s, "bandpass", 2200, 2, 0.03, 0.08 * a), 0.06),
  "spear.hit": (e, t, s, a) => (yt(e, t, s, "sine", 300, 180, 0.06, 0.2 * a), nt(e, t, s, "bandpass", 1500, 2, 0.04, 0.08 * a), 0.08),
  "stone.hit": (e, t, s, a) => (nt(e, t, s, "bandpass", 2600, 4, 0.03, 0.16 * a), yt(e, t, s, "sine", 950, 800, 0.02, 0.06 * a), 0.05),
  "ram.boom": (e, t, s, a) => (yt(e, t, s, "sine", 72, 42, 0.55, 0.42 * a), nt(e, t, s, "lowpass", 350, 1, 0.4, 0.24 * a), nt(e, t, s + 0.02, "bandpass", 900, 2, 0.08, 0.08 * a), 0.6),
  "ram.creak": (e, t, s, a) => {
    const i = Lt(e, "sawtooth", 140, s, 0.3);
    return i.frequency.linearRampToValueAtTime(120, s + 0.3), zt(i, Zt(e, "bandpass", 600, 5), Ot(e, s, 0.03 * a, 0.05, 0.25), t), 0.3;
  },
  // animais
  "animal.sheep": (e, t, s, a) => (ve(e, t, s, 0.7, [[0, 330], [0.6, 300]], [[800, 1], [1800, 0.5], [2600, 0.2]], [7, 18], 0.07 * a), 0.7),
  "animal.horse": (e, t, s, a) => (ve(e, t, s, 0.9, [[0, 500], [0.15, 900], [0.5, 700], [0.9, 450]], [[1e3, 1], [2200, 0.4]], [9, 40], 0.05 * a), 0.9),
  "animal.dog": (e, t, s, a) => {
    for (const i of [0, 0.16]) ve(e, t, s + i, 0.1, [[0, 420], [0.09, 300]], [[900, 1], [1700, 0.5]], [0, 0], 0.08 * a);
    return 0.28;
  },
  "animal.wolf": (e, t, s, a) => (ve(e, t, s, 0.45, [[0, 95], [0.45, 90]], [[350, 1]], [22, 6], 0.06 * a), 0.45),
  "animal.howl": (e, t, s, a) => {
    for (const [i, o] of [[0, 1], [0.28, 0.3]]) {
      const n = Lt(e, "sine", 420, s + i, 1.6);
      n.frequency.linearRampToValueAtTime(620, s + i + 0.6), n.frequency.linearRampToValueAtTime(540, s + i + 1.5), zt(n, Zt(e, "lowpass", 1200), Ot(e, s + i, 0.05 * a * o, 0.25, 1.2, 0.1), t);
    }
    return 1.9;
  },
  "animal.boar": (e, t, s, a) => (ve(e, t, s, 0.12, [[0, 125], [0.12, 110]], [[500, 1]], [28, 10], 0.07 * a), ve(e, t, s + 0.16, 0.1, [[0, 120], [0.1, 105]], [[500, 1]], [28, 10], 0.06 * a), 0.28),
  "animal.aurochs": (e, t, s, a) => (ve(e, t, s, 1, [[0, 120], [1, 100]], [[350, 1], [800, 0.4]], [4, 3], 0.07 * a), 1),
  "animal.deer": (e, t, s, a) => (nt(e, t, s, "bandpass", 1200, 2, 0.12, 0.07 * a), nt(e, t, s + 0.05, "bandpass", 600, 2, 0.1, 0.05 * a), 0.17),
  "animal.crow": (e, t, s, a) => {
    for (const i of [0, 0.3]) ve(e, t, s + i, 0.18, [[0, 620], [0.18, 520]], [[1300, 1], [2600, 0.4]], [0, 0], 0.04 * a);
    return 0.5;
  },
  "animal.hooves": (e, t, s, a) => {
    for (const i of [0, 0.07, 0.2, 0.27])
      yt(e, t, s + i, "sine", 180, 120, 0.04, 0.1 * a), nt(e, t, s + i, "lowpass", 900, 1, 0.02, 0.05 * a);
    return 0.32;
  },
  bird: (e, t, s, a) => Si(e, t, s, a, 1 + Math.floor(s * 977 % 97))
}, o0 = {
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
for (const [e, t] of Object.entries(o0)) {
  const s = me[e];
  me[e] = (a, i, o, n) => s(a, i, o, n * t);
}
function Re(e, t, s, a, i) {
  yt(e, t, s, "sine", a * 1.6, a, 0.4, 0.22 * i), nt(e, t, s, "lowpass", 400, 1, 0.05, 0.08 * i);
}
function sa(e, t, s, a, i, o, n = 0.22) {
  const r = Ot(e, s, 0.13 * o, 0.05, 0.14, Math.max(0, i - 0.08)), l = Lt(e, "sine", a, s, i + 0.3), h = Lt(e, "triangle", a * 2, s, i + 0.3), c = e.createGain();
  c.gain.value = n;
  const u = Lt(e, "sine", 5, s, i + 0.3), d = e.createGain();
  d.gain.setValueAtTime(0, s), d.gain.linearRampToValueAtTime(a * 6e-3, s + 0.2), u.connect(d), d.connect(l.frequency), d.connect(h.frequency), zt(l, r), zt(h, c, r), r.connect(t), zt(Cs(e, s, i + 0.1), Zt(e, "bandpass", a * 2, 8), Ot(e, s, 0.02 * o, 0.03, 0.1, Math.max(0, i - 0.05)), t);
}
function n0(e, t, s, a, i, o) {
  sa(e, t, s, a, i, o * 0.9, 0.05);
}
function r0(e, t, s, a, i) {
  i0(e, t, s, a, 0.2 * i);
}
function l0(e, t, s, a, i) {
  zt(Lt(e, "sine", a, s, 0.4), Ot(e, s, 0.12 * i, 2e-3, 0.35), t), zt(Lt(e, "sine", a * 2.92, s, 0.2), Ot(e, s, 0.04 * i, 2e-3, 0.15), t), nt(e, t, s, "bandpass", 3e3, 3, 0.01, 0.03 * i);
}
function $i(e, t, s, a, i) {
  ce(e, t, s, a, 0.08 * i, [1, 2.4, 3.6, 5.1], 2);
}
function Ci(e, t, s, a, i, o) {
  const n = Zt(e, "lowpass", a * 3, 0.8);
  n.frequency.linearRampToValueAtTime(a * 6, s + 0.15), n.frequency.linearRampToValueAtTime(a * 4, s + i);
  for (const r of [1, 1.004]) zt(Lt(e, "sawtooth", a * r, s, i + 0.3), n);
  zt(n, Ot(e, s, 0.07 * o, 0.08, 0.2, Math.max(0, i - 0.1)), t);
}
function c0(e, t, s, a, i, o) {
  const n = Zt(e, "lowpass", 420, 0.7), r = e.createGain();
  r.gain.setValueAtTime(1e-4, s), r.gain.linearRampToValueAtTime(0.05 * o, s + 1.5), r.gain.setValueAtTime(0.05 * o, s + Math.max(1.5, i - 1.5)), r.gain.linearRampToValueAtTime(1e-4, s + i);
  for (const l of [1, 1.5]) zt(Lt(e, "sawtooth", a * l, s, i), n);
  zt(n, r, t);
}
function Ba(e, t, s, a) {
  nt(e, t, s, "highpass", 5e3, 1, 0.06, 0.05 * a, 5e-3);
}
const ae = (e) => 440 * Math.pow(2, (e - 69) / 12);
function Kn(e, t, s, a, i) {
  const o = ae(a.m), n = a.d * i;
  switch (a.i) {
    case "drum":
      Re(e, t, s, o, a.v);
      break;
    case "drumHi":
      Re(e, t, s, o * 1.8, a.v * 0.8);
      break;
    case "flute":
      sa(e, t, s, o, n, a.v);
      break;
    case "ocarina":
      n0(e, t, s, o, n, a.v);
      break;
    case "lyre":
      r0(e, t, s, o, a.v);
      break;
    case "stones":
      l0(e, t, s, o, a.v);
      break;
    case "bells":
      $i(e, t, s, o, a.v);
      break;
    case "horn":
      Ci(e, t, s, o, n, a.v);
      break;
    case "drone":
      c0(e, t, s, o, n, a.v);
      break;
    case "shaker":
      Ba(e, t, s, a.v);
      break;
  }
}
const aa = 62, Ei = [[[0, 2], [3, 1], [5, 1]], [[7, 3], [5, 1]], [[3, 1], [5, 1], [7, 1], [10, 1]], [[12, 4]], [[10, 2], [7, 1], [5, 1]], [[3, 2], [5, 2]], [[7, 1], [5, 1], [3, 1], [2, 1]], [[0, 4]]], h0 = [...Ei.slice(0, 3), [[12, 2], [10, 1], [12, 1]], ...Ei.slice(4, 7), [[0, 2], [-5, 1], [0, 1]]], d0 = [[[7, 1], [10, 1], [12, 2]], [[14, 2], [12, 2]], [[10, 1], [12, 1], [14, 1], [15, 1]], [[17, 3], [15, 1]], [[14, 2], [12, 1], [10, 1]], [[12, 2], [7, 2]], [[10, 1], [9, 1], [7, 1], [5, 1]], [[7, 4]]], xs = [[0, 7, 12, 15], [0, 7, 12, 15], [-2, 5, 10, 14], [-2, 5, 10, 14], [0, 7, 12, 15], [7, 14, 19, 22], [-2, 5, 10, 14], [0, 7, 12, 15]];
function Ii() {
  const e = [];
  let t = 0;
  const s = (a, i, o) => a.forEach((n, r) => {
    let l = 0;
    for (const [h, c] of n)
      e.push({ b: (t + r) * 4 + l, i, m: aa + h, d: c, v: o }), l += c;
  });
  for (let a = 0; a < 4; a++, t += 8) {
    s(a === 2 ? d0 : a === 1 ? h0 : Ei, "flute", 1);
    for (let i = 0; i < 8; i++) {
      const o = (t + i) * 4;
      if (e.push({ b: o, i: "drum", m: 38, d: 1, v: 0.9 }, { b: o + 2, i: "drum", m: 43, d: 1, v: 0.6 }), a >= 2) {
        e.push({ b: o + 3.5, i: "drumHi", m: 43, d: 1, v: 0.4 });
        for (let n = 0; n < 4; n++) e.push({ b: o + n + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.7 });
      }
      a >= 1 && xs[i].concat([xs[i][2], xs[i][1], xs[i][2], xs[i][1]]).forEach((n, r) => e.push({ b: o + r * 0.5, i: "lyre", m: 50 + n, d: 0.5, v: 0.7 })), a === 3 && e.push({ b: o, i: "bells", m: 74 + xs[i][0], d: 2, v: 0.8 });
    }
    a === 2 && [[0, 50], [8, 45], [16, 48], [24, 50]].forEach(([i, o]) => e.push({ b: t * 4 + i, i: "horn", m: o, d: 7, v: 0.9 }));
  }
  return e.push({ b: 128, i: "drum", m: 38, d: 1, v: 1 }, { b: 128, i: "flute", m: aa, d: 3, v: 0.9 }), { bpm: 80, beats: 132, notes: e };
}
const u0 = [[0, 3, 5, 7, 10], [0, 2, 3, 5, 7, 9, 10], [0, 2, 4, 5, 7, 9, 10]];
function f0(e) {
  let t = e >>> 0;
  return () => {
    t = t + 1831565813 | 0;
    let s = Math.imul(t ^ t >>> 15, 1 | t);
    return s = s + Math.imul(s ^ s >>> 7, 61 | s) ^ s, ((s ^ s >>> 14) >>> 0) / 4294967296;
  };
}
const Fo = [[1, 1, 2], [0.5, 0.5, 1, 2], [1.5, 0.5, 2], [2, 1, 1], [1, 1, 1, 1], [3, 1], [2, 2]];
function Xn(e, t, s, a) {
  const i = Math.min(e, 2), o = f0(a * 97 + i * 13 + t * 5), n = u0[i], r = n.length, l = (B) => aa + 12 * Math.floor(B / r) + n[(B % r + r) % r], h = t === 1, c = s === 3, u = Math.round([72, 80, 88][i] * (h ? 1.15 : 1) * (c ? 0.85 : s === 2 ? 0.93 : 1)), d = [], f = (B) => {
    const A = [];
    let T = B;
    for (let S = 0; S < 2; S++) {
      const $ = Fo[Math.floor(o() * Fo.length)], O = [];
      for (const z of $)
        O.push([T, z]), T = Math.max(-2, Math.min(r + 3, T + [-2, -1, -1, 1, 1, 2, 0][Math.floor(o() * 7)]));
      A.push(O);
    }
    return A;
  }, p = f(Math.floor(o() * 3)), y = f(2 + Math.floor(o() * 3)), g = f(r), x = (B, A) => B.map((T) => T.map(([S, $]) => [S + A, $])), M = [[[2, 2], [1, 2]], [[0, 4]]], v = [...p, ...x(p, 1), ...y, ...M, ...p, ...x(p, -1), ...g, ...M, ...g, ...x(g, -1), ...y, ...M, ...p, ...y, ...p, ...M], w = i === 0 ? "flute" : i === 1 ? "ocarina" : "flute";
  return v.forEach((B, A) => {
    let T = 0;
    const S = A * 4, $ = !h && A % 8 === 7 && o() < 0.3;
    for (const [z, P] of B)
      !$ && !(c && o() < 0.25) && d.push({ b: S + T, i: w, m: l(z) + (i === 0 ? 0 : 12 * (s === 1 ? 1 : 0)), d: P * 0.95, v: 0.85 }), T += P;
    const O = c ? 0.4 : h ? 1 : 0.7;
    if (i === 0) {
      if (d.push({ b: S, i: "drum", m: 38, d: 1, v: 0.9 }), o() < O && d.push({ b: S + 2, i: "drum", m: 43, d: 1, v: 0.6 }), h) for (let z = 0; z < 4; z++) d.push({ b: S + z + 0.5, i: "shaker", m: 0, d: 0.5, v: 0.6 });
      A % 4 === 3 && o() < O && d.push({ b: S + 3, i: "drumHi", m: 43, d: 0.5, v: 0.5 }, { b: S + 3.5, i: "drumHi", m: 43, d: 0.5, v: 0.4 });
    } else if (i === 1)
      A % 8 === 0 && d.push({ b: S, i: "drone", m: 38, d: 32, v: 0.9 }), (A % 2 === 0 || h) && d.push({ b: S, i: "drum", m: 38, d: 1, v: 0.7 }), o() < O && [0, 1.5, 3].forEach((z, P) => d.push({ b: S + z, i: "stones", m: l([0, 2, 4][P] + A % 2) - 12, d: 1, v: 0.6 }));
    else {
      const z = A % 8 < 4 ? 0 : A % 8 < 6 ? -2 : 5, P = [z, z + 7, z + 12, z + 16];
      o() < O + 0.2 && [0, 1, 2, 3, 2, 1, 2, 1].forEach((F, E) => d.push({ b: S + E * 0.5, i: "lyre", m: 50 + P[F], d: 0.5, v: 0.6 })), d.push({ b: S, i: "drum", m: 38, d: 1, v: 0.8 }), h && d.push({ b: S + 2, i: "drum", m: 43, d: 1, v: 0.6 }, { b: S + 3.5, i: "shaker", m: 0, d: 0.5, v: 0.6 }), A % 8 === 0 && d.push({ b: S, i: "bells", m: 74 + z, d: 2, v: 0.7 }), A % 8 === 6 && o() < 0.7 && d.push({ b: S, i: "horn", m: 45 + (o() < 0.5 ? 0 : 5), d: 6, v: 0.8 });
    }
  }), { bpm: u, beats: v.length * 4, notes: d };
}
class p0 {
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
    D.ready(() => {
      const t = D.ctx, s = D.out("music");
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
    D.ctx && (this.clear(), this.enqueue(Ii(), D.now + 0.4));
  }
  /** partida: depois de uns segundos, as peças da era, com silêncio entre elas */
  game(t, s) {
    this.getEra = t, this.getSeason = s, this.mode = "game", this.pieceN = 0, this.seed = (Date.now() & 65535) + 1, D.ctx && (this.clear(), this.nextStart = D.now + 6);
  }
  stop() {
    this.mode = "off", this.clear();
  }
  /** página de escuta: toca uma peça de uma era agora (kind 0 calma, 1 animada, 2 calma), sem silêncio antes */
  preview(t, s, a) {
    this.mode = "game", this.getEra = () => t, this.getSeason = () => a, this.pieceN = s, this.seed = 7, D.ctx && (this.clear(), this.nextStart = D.now + 0.5);
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
    const t = D.now;
    this.queue = [], this.qi = 0, this.pieceEnd = t, this.base && (this.base.gain.cancelScheduledValues(t), this.base.gain.setValueAtTime(this.base.gain.value, t), this.base.gain.linearRampToValueAtTime(0, t + 0.6), this.base.gain.linearRampToValueAtTime(1, t + 1.6));
  }
  enqueue(t, s) {
    const a = 60 / t.bpm;
    for (const i of t.notes) this.queue.push({ t: s + i.b * a, n: i, spb: a, out: "base" });
    this.queue.sort((i, o) => i.t - o.t), this.qi = 0, this.pieceEnd = s + t.beats * a;
  }
  tick() {
    if (!D.running || !this.base) return;
    const t = D.now, s = t + 1.2;
    if (this.qi >= this.queue.length) {
      if (this.mode === "menu" && t > this.pieceEnd - 0.5) this.enqueue(Ii(), Math.max(t + 0.2, this.pieceEnd + 3));
      else if (this.mode === "game" && t >= this.nextStart - 0.5) {
        const i = Xn(this.getEra(), this.pieceN % 3, this.getSeason(), this.seed + this.pieceN);
        this.pieceN++, this.enqueue(i, Math.max(t + 0.2, this.nextStart)), this.nextStart = this.pieceEnd + 60 + (this.seed * 7 + this.pieceN * 31) % 90;
      }
    }
    for (; this.qi < this.queue.length && this.queue[this.qi].t < s; ) {
      const i = this.queue[this.qi++];
      i.t >= t - 0.05 && Kn(D.ctx, this.base, Math.max(i.t, t), i.n, i.spb);
    }
    const a = D.ctx;
    if (this.tens.gain.setTargetAtTime(this.mode === "game" ? this.tension : 0, t, 1.2), this.batt.gain.setTargetAtTime(this.mode === "game" ? this.battle : 0, t, this.battle > 0.05 ? 0.4 : 2.5), this.mode === "game" && (this.tension > 0.02 || this.battle > 0.02)) {
      const i = 0.7142857142857143;
      for (this.layerT < t && (this.layerT = t + 0.05); this.layerT < s; ) {
        const o = this.layerT, n = Math.round(o / i % 4);
        this.tension > 0.02 && Re(a, this.tens, o, ae(33), 0.8), this.battle > 0.02 && (Re(a, this.batt, o, ae(n % 2 ? 43 : 38), 0.9), Re(a, this.batt, o + i / 2, ae(48), 0.55), Ba(a, this.batt, o + i / 4, 0.8), Ba(a, this.batt, o + i * 0.75, 0.8)), this.layerT += i;
      }
    }
  }
  /** vinhetas curtas (canal de avisos): nova era, vitória, derrota */
  stinger(t, s = 0) {
    const a = D.ctx, i = D.out("alert");
    if (!a || !i || !D.voice(3)) return;
    const o = a.currentTime + 0.05;
    if (D.duck(0.7, 3.5), t === "age") {
      for (let r = 0; r < 6; r++) Re(a, i, o + r * 0.12, ae(38 + r % 2 * 5), 0.5 + r * 0.08);
      [0, 4, 7, 12].map((r) => aa + r + (s >= 2 ? 0 : -12)).forEach((r, l) => s >= 2 ? Ci(a, i, o + 0.75 + l * 0.22, ae(r - 12), 0.3, 1.4) : sa(a, i, o + 0.75 + l * 0.2, ae(r + 12), 0.3, 1.2)), s >= 2 ? $i(a, i, o + 1.6, ae(74), 1.2) : Re(a, i, o + 1.6, ae(38), 1);
    } else if (t === "victory") {
      [0, 4, 7, 12, 7, 12].forEach((n, r) => Ci(a, i, o + r * 0.25, ae(50 + n), r === 5 ? 1.2 : 0.22, 1.3));
      for (let n = 0; n < 8; n++) Re(a, i, o + n * 0.125, ae(38 + n % 2 * 5), 0.7);
      $i(a, i, o + 1.3, ae(74), 1.3);
    } else
      [12, 10, 7, 5, 3, 0].forEach((n, r) => sa(a, i, o + r * 0.35, ae(aa + n), r === 5 ? 1.4 : 0.32, 0.9)), Re(a, i, o + 2.1, ae(38), 0.6);
  }
}
const Gt = new p0(), ni = { theme: Ii, eraPiece: Xn, play: Kn };
class Yn {
  constructor() {
    m(this, "loops", {});
    m(this, "wf", null);
    m(this, "t", null);
    m(this, "next", {});
    m(this, "seed", 1);
  }
  start() {
    const t = D.ctx, s = D.out("amb");
    if (!t || !s || this.loops.wind) return;
    const a = (i, o) => {
      const n = t.createGain();
      n.gain.value = 0, n.connect(s), this.loops[i] = { g: n, stop: o(n) };
    };
    a("wind", (i) => {
      const o = xa(t), n = t.createBiquadFilter();
      n.type = "lowpass", n.frequency.value = 380, n.Q.value = 0.6, this.wf = n;
      const r = t.createOscillator(), l = t.createGain();
      r.frequency.value = 0.07, l.gain.value = 220, r.connect(l).connect(n.frequency);
      const h = t.createGain(), c = t.createOscillator(), u = t.createGain();
      return h.gain.value = 0.75, c.frequency.value = 0.11, u.gain.value = 0.25, c.connect(u).connect(h.gain), o.connect(n).connect(h).connect(i), r.start(), c.start(), () => {
        o.stop(), r.stop(), c.stop();
      };
    }), a("water", (i) => {
      const o = xa(t), n = t.createBiquadFilter();
      n.type = "bandpass", n.frequency.value = 700, n.Q.value = 0.9;
      const r = t.createGain(), l = t.createOscillator(), h = t.createGain();
      return r.gain.value = 0.8, l.frequency.value = 0.4, h.gain.value = 0.2, l.connect(h).connect(r.gain), o.connect(n).connect(r).connect(i), l.start(), () => {
        o.stop(), l.stop();
      };
    }), a("fire", (i) => {
      const o = xa(t), n = t.createBiquadFilter();
      return n.type = "lowpass", n.frequency.value = 170, o.connect(n).connect(i), () => o.stop();
    }), a("market", (i) => {
      const o = xa(t), n = t.createBiquadFilter();
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
    const t = D.now;
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
    const s = D.now, a = this.loops;
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
    const t = this.t, s = D.ctx, a = D.out("amb");
    if (!t || !s || !a || !D.running) return;
    const i = s.currentTime, o = t.season, n = () => (this.seed = this.seed * 16807 % 2147483647, this.seed / 2147483647), r = (c, u) => (this.next[c] ?? 0) > i ? !1 : (this.next[c] = i + u(), !0), l = 1 - Math.min(1, Math.max(0, (t.zoom - 20) / 70)), h = [0.9, 0.6, 0.25, 0][o] * (0.4 + t.trees * 0.6);
    h > 0.05 && r("bird", () => 1.5 + n() * 4 / h) && Si(s, a, i + 0.05, 0.9 * l + 0.3, 1 + Math.floor(n() * 90)), o === 3 && r("crow", () => 9 + n() * 14) && me["animal.crow"](s, a, i + 0.05, 0.6), o === 2 && t.trees > 0.2 && r("leaves", () => 2 + n() * 4) && me["work.rustle"](s, a, i + 0.05, 0.6 * l), t.fire > 0.05 && r("crackle", () => 0.08 + n() * 0.35) && me["stone.hit"](s, a, i + 0.02, 0.18 * t.fire * (0.5 + n())), t.forge > 0.05 && r("forge", () => 1.1 + n() * 1.2) && me["work.pickMetal"](s, a, i + 0.02, 0.8 * t.forge), t.pens > 0.05 && r("sheep", () => 6 + n() * 10) && me["animal.sheep"](s, a, i + 0.05, 0.9 * t.pens), t.stables > 0.05 && r("horse", () => 9 + n() * 12) && me["animal.horse"](s, a, i + 0.05, 0.8 * t.stables);
  }
}
const As = (e, t, s) => Math.max(t, Math.min(s, e)), Lo = /* @__PURE__ */ new Map(), Oi = {};
function qa(e, t = 1, s = 0, a = "sfx", i = 0.07) {
  const o = D.ctx, n = D.out(a), r = me[e];
  if (!o || !n || !r || !D.running || t < 0.01) return;
  const l = o.currentTime;
  if ((Lo.get(e) ?? -9) > l - i || !D.voice(0.35)) return;
  Lo.set(e, l), Oi[e] = (Oi[e] ?? 0) + 1;
  let h = n;
  if (s && o.createStereoPanner) {
    const c = o.createStereoPanner();
    c.pan.value = As(s, -1, 1), c.connect(n), h = c;
  }
  r(o, h, l + 0.01, As(t, 0, 1.2));
}
const Ge = (e) => D.whenRunning(() => qa(e, 1, 0, "ui", 0.04));
class m0 {
  constructor(t, s, a) {
    m(this, "amb", new Yn());
    m(this, "t", 0);
    m(this, "slow", 0);
    m(this, "raidUntil", 0);
    m(this, "animalT", 0);
    this.w = t, this.me = s, this.cam = a, D.setScene("game"), Gt.game(() => t.players[s].era, () => t.season), ke.emit = (i, o, n, r) => this.at(i, o, n, r), D.ready(() => this.amb.start());
  }
  dispose() {
    ke.emit = () => {
    }, this.amb.stop();
  }
  /** som do mundo na posição (x, z): só perto da câmera e fora da névoa; volume pela distância, lado pela tela */
  at(t, s, a, i = 1) {
    if (!D.running) return;
    const o = this.w, n = o.size, r = Math.floor(s), l = Math.floor(a);
    if (r < 0 || l < 0 || r >= n || l >= n || !o.vis[this.me][l * n + r]) return;
    const h = this.cam, c = s - h.x, u = a - h.z, d = Math.hypot(c, u), f = As(1 - d / 22, 0, 1), p = As(1.25 - h.dist / 70, 0.3, 1);
    if (f < 0.05) return;
    const y = (c * Math.cos(h.yaw) - u * Math.sin(h.yaw)) / 12;
    qa(t, i * f * f * p, y);
  }
  /** aviso (ouve-se de qualquer lugar); os importantes abaixam a música um pouco */
  aviso(t) {
    qa(t, 1, 0, "alert", 0.5), (t === "horn" || t === "drums.war" || t === "gong") && D.duck();
  }
  onEvents(t) {
    const s = this.w, a = s.size;
    for (const i of t) switch (i.t) {
      case "proj":
        this.at(i.h !== void 0 ? "tower" : i.kind === "arrow" ? "bow" : i.kind === "stone" ? "sling" : "throw", i.x0 / 256, i.z0 / 256);
        break;
      case "death": {
        const o = i.x / 256, n = i.z / 256;
        this.at(i.kind >= bt ? "crash" : i.owner === kt ? "fall.animal" : "puff", o, n);
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
        i.player === this.me && Gt.stinger("age", i.era);
        break;
      case "end":
        Gt.stinger(i.result === "victory" ? "victory" : "defeat");
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
    if (D.setPaused(s), this.t += t, (this.slow -= t) > 0 || (this.slow = 0.25, !D.running)) return;
    const a = this.w, i = this.me, o = a.size, n = this.cam, r = n.x, l = n.z, h = a.vis[i];
    let c = 0, u = 0, d = 0;
    for (let A = -8; A <= 8; A += 2) for (let T = -8; T <= 8; T += 2) {
      const S = Math.floor(r + T), $ = Math.floor(l + A);
      if (S < 0 || $ < 0 || S >= o || $ >= o) continue;
      const O = $ * o + S;
      d++;
      const z = a.map.terrain[O];
      (z === We || z === hs) && c++, a.map.tree[O] && u++;
    }
    let f = 0, p = 0, y = 0, g = 0, x = 0, M = 0, v = 0;
    const w = [];
    for (let A = 0; A < a.top; A++) {
      if (!a.alive[A]) continue;
      const T = a.x[A] / 256, S = a.z[A] / 256, $ = Math.hypot(T - r, S - l);
      if ($ > 18 || !h[Math.floor(S) * o + Math.floor(T)] && a.owner[A] !== i) continue;
      const O = As(1 - $ / 16, 0, 1);
      if (a.kind[A] >= bt) {
        if (!a.done[A]) continue;
        const z = Et[a.kind[A] - bt].key;
        z === "center" || z === "camp" ? f = Math.max(f, O) : z === "forge" ? p = Math.max(p, O) : z === "market" ? y = Math.max(y, O) : z === "pen" ? g = Math.max(g, O) : z === "stable" && (x = Math.max(x, O));
      } else a.kind[A] < G.length && (a.owner[A] === kt ? $ < 14 && w.push(A) : a.task[A] === Rt && (M++, a.owner[A] === i && v++), G[a.kind[A]].key === "horseman" && (x = Math.max(x, O * 0.5)));
    }
    if (this.amb.set({ season: a.season, zoom: n.dist, water: d ? Math.min(1, c / d * 3) : 0, fire: f, market: y, fair: a.fair, forge: p, pens: g, stables: x, trees: d ? Math.min(1, u / d * 2) : 0 }), this.amb.tick(), w.length && (this.animalT -= 0.25) <= 0) {
      const A = w[Math.floor(this.t * 7.7 % w.length)], T = G[a.kind[A]].key, S = T === "wolf" ? a.season === 3 ? "animal.howl" : "animal.wolf" : `animal.${T}`;
      me[S] && this.at(S, a.x[A] / 256, a.z[A] / 256, T === "wolf" && a.season === 3 ? 0.6 : 0.8), this.animalT = 5 + this.t * 13 % 7;
    }
    let B = a.tick < this.raidUntil;
    if (!B && Math.floor(this.t * 4) % 4 === 0) {
      const A = a.players[i];
      for (let T = 0; T < a.top && !B; T++) if (a.isUnit(T) && a.owner[T] !== i && a.owner[T] !== kt && (a.owner[T] === Ee || a.hostile(i, a.owner[T]))) {
        const S = a.x[T] / 256 - A.start.x, $ = a.z[T] / 256 - A.start.z;
        S * S + $ * $ < 196 && (B = !0);
      }
    }
    Gt.setTension(B ? 0.6 : 0), Gt.setBattle(v > 0 ? As((M - 1) / 8, 0.3, 1) : 0);
  }
}
const Zn = [
  ["Botões e ordens", ["ui.click", "ui.denied", "sel.villager", "sel.soldier", "sel.building", "order.move", "order.work", "order.attack", "place", "place.bad", "trained", "built"]],
  ["Avisos", ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"]],
  ["Trabalho", ["work.chop", "work.pick", "work.pickMetal", "work.hoe", "work.mallet", "work.rustle", "drop.wood", "drop.stone", "drop.food", "drop.metal", "tree.fall", "res.crumble"]],
  ["Batalha", ["hit.club", "hit.axe", "hit.sword", "hit.spear", "hit.wall", "hit.bite", "hit.boar", "hit.aurochs", "throw", "bow", "tower", "sling", "arrow.hit", "spear.hit", "stone.hit", "ram.boom", "ram.creak", "puff", "fall.animal", "crash"]],
  ["Animais", ["animal.sheep", "animal.horse", "animal.dog", "animal.wolf", "animal.howl", "animal.boar", "animal.aurochs", "animal.deer", "animal.crow", "animal.hooves", "bird"]]
], g0 = {
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
}, b0 = [["age:1", "Chegou o Neolítico"], ["age:2", "Chegou a Idade dos Metais"], ["victory", "Vitória"], ["defeat", "Derrota"]], y0 = ["Pedra", "Neolítico", "Metais"], v0 = ["calma", "animada", "calma 2"], k0 = ["primavera", "verão", "outono", "inverno"];
function x0() {
  D.install(), D.setScene("menu");
  const e = new Yn(), t = document.createElement("div");
  t.id = "escuta", t.innerHTML = `<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${Zn.map(([l, h]) => `<h2>${l}</h2>${h.map((c) => `<button data-som="${c}" title="${c}">${g0[c] ?? c}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${y0.map((l, h) => v0.map((c, u) => `<button data-musica-teste="era:${h}:${u}">${l} · ${c}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${b0.map(([l, h]) => `<button data-vinheta="${l}">${h}</button>`).join("")}
    <h2>Ambiente</h2>${k0.map((l, h) => `<button data-ambiente-teste="${h}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`, document.body.appendChild(t);
  const s = { season: 0, zoom: 40, water: 0, fire: 0, market: 0, fair: !1, forge: 0, pens: 0, stables: 0, trees: 0.6 };
  let a = { ...s }, i = 0;
  const o = (l) => {
    D.setScene("game"), e.start(), a = l, e.set(l), i || (i = window.setInterval(() => {
      e.set(a), e.tick();
    }, 250));
  };
  t.addEventListener("click", (l) => {
    const h = l.target.closest("button");
    h && (D.unlock(), t.querySelectorAll("[aria-pressed]").forEach((c) => c.removeAttribute("aria-pressed")), h.setAttribute("aria-pressed", "true"), D.whenRunning(() => r(h)));
  });
  const n = t.querySelector("#escuta-estado");
  window.setInterval(() => {
    n.textContent = D.ctx ? D.running ? "Som: ligado." : "Som: ligando… se não tocar, toque de novo." : "Som: toque em qualquer botão para ligar.";
  }, 400);
  function r(l) {
    const h = l.dataset;
    if (h.som && qa(h.som, 1, 0, ["horn", "drums.war", "gong", "tech", "metal", "fair", "winter", "spring", "hunger", "soft"].includes(h.som) ? "alert" : "sfx", 0), h.musicaTeste) {
      const c = h.musicaTeste;
      if (D.setScene(c === "tema" ? "menu" : "game"), D.setOpts({ music: Math.max(2, D.opts.music) }), c === "tema")
        Gt.stop(), Gt.menu();
      else if (c === "parar") Gt.stop();
      else if (c === "tensao") Gt.setTension(0.6);
      else if (c === "batalha") Gt.setBattle(0.9);
      else if (c === "inverno") Gt.preview(2, 0, 3);
      else {
        const [, u, d] = c.split(":").map(Number);
        Gt.setTension(0), Gt.setBattle(0), Gt.preview(u, d, 0);
      }
    }
    if (h.vinheta) {
      const [c, u] = h.vinheta.split(":");
      Gt.stinger(c, Number(u) || 0);
    }
    if (h.ambienteTeste) {
      const c = h.ambienteTeste;
      c === "parar" ? (e.set({ ...s, season: 1, trees: 0 }), a = { ...s, season: -1, trees: 0 }) : o(c === "rio" ? { ...s, season: 1, water: 1, zoom: 22 } : c === "aldeia" ? { ...s, fire: 1, forge: 1, pens: 1, zoom: 22 } : c === "feira" ? { ...s, market: 1, fair: !0, zoom: 22 } : { ...s, season: Number(c) });
    }
  }
}
async function M0(e) {
  const s = new OfflineAudioContext(1, 176400, 44100);
  let a = 0;
  if (me[e]) a = me[e](s, s.destination, 0.01, 1);
  else if (e.startsWith("musica:")) {
    const [, h, c] = e.split(":"), u = h === "tema" ? ni.theme() : ni.eraPiece(Number(c), 1, 0, 3), d = 60 / u.bpm;
    for (const f of u.notes) f.b * d < 3.6 && ni.play(s, s.destination, 0.01 + f.b * d, f, d);
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
const z0 = Zn.flatMap((e) => e[1]), Ps = new URLSearchParams(location.search), Ra = (e, t) => {
  const s = Number(Ps.get(e));
  return Ps.has(e) && Number.isFinite(s) && s >= 0 ? s : t;
}, Jn = matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 1, Wi = document.getElementById("scene"), ia = Tn.makeRenderer(Wi), vt = 0, Ms = 1 / Yo;
let we = Jn ? 1 : 0, Na = !0;
try {
  const e = localStorage.getItem("origines_q");
  e !== null && (we = Math.min(2, Math.max(0, Number(e) || 0)), Na = !1);
} catch {
}
const Qn = (e) => {
  we = e;
  try {
    localStorage.setItem("origines_q", String(e));
  } catch {
  }
};
class A0 {
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
    /** no jogo de um amigo (convidado): o jogo é do anfitrião; aqui nada é salvo, nem depois que o anfitrião sai */
    m(this, "guest", lt?.papel === "convidado");
    this.world = t, this.owner = s;
    const a = t;
    this.marco = Math.floor(a.tick / 600), this.scene = new Tn(ia, a, vt), this.scene.setQuality(we), Ps.get("fog") === "0" && this.scene.setFog(!1), this.hud = new wi(a, vt, {
      idle: () => {
        const i = this.own((n) => a.kind[n] === ct.villager && a.task[n] === 0 && a.state[n] === 0);
        if (!i.length) return;
        const o = i[this.idleCursor++ % i.length];
        this.select([o]), this.focus([o]);
      },
      army: () => {
        const i = this.own((o) => a.kind[o] !== ct.villager);
        this.select(i), this.focus(i);
      },
      home: () => {
        const i = a.players[vt].start;
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
        i.length && this.send({ type: "stop", player: vt, ids: i });
      },
      food: (i) => {
        const o = this.own((n) => this.sel.has(n) && a.kind[n] === ct.villager);
        o.length && this.send({ type: "food", player: vt, ids: o, on: i });
      },
      startPlace: (i) => this.startPlace(i),
      train: (i, o) => this.send({ type: "train", player: vt, building: i, key: o }),
      cancelQueue: (i) => this.send({ type: "cancel", player: vt, building: i }),
      ageUp: (i) => this.send({ type: "ageup", player: vt, building: i }),
      research: (i, o) => this.send({ type: "research", player: vt, building: i, key: o }),
      trade: (i, o, n) => this.send({ type: "trade", player: vt, building: i, give: o, get: n }),
      rally: (i) => {
        this.rallyB = i, this.setMode(this.mode === "rally" ? "normal" : "rally");
      },
      placeConfirm: () => this.confirmPlace(!1),
      cancelMode: () => this.setMode("normal"),
      jump: (i, o) => {
        this.scene.camera.tx = i, this.scene.camera.tz = o;
      }
    }, Jn, this.sel), this.minimap = new Cc(this.hud.minimap, a, vt, this.scene.camera), this.snd = new m0(a, vt, this.scene.camera), this.input = new Ec(Wi, a, vt, this.scene.camera, this.hud.box, {
      onCommand: (i) => {
        if (this.mode !== "normal") return;
        const { cmds: o, ping: n } = Rc(a, vt, [...this.sel], i);
        for (const r of o) this.send(r);
        o.length && Ma(o[0].type === "attack" ? a.owner[o[0].target] === kt ? "cacar" : "atacar" : o[0].type === "gather" ? "coletar" : o[0].type === "work" ? "trabalhar" : "mover"), o.length && (this.scene.ping(i.x, i.z, n), Ge(n === "attack" ? "order.attack" : n === "work" ? "order.work" : "order.move"));
      },
      onRally: (i, o) => {
        const n = this.mode === "rally" && a.alive[this.rallyB] ? this.rallyB : this.input.singleOwnBuilding();
        n >= 0 && (this.send({ type: "rally", player: vt, building: n, x: Math.round(i * 256), z: Math.round(o * 256) }), this.scene.ping(i, o, "move"), Ma("reuniao")), this.setMode("normal");
      },
      onPlaceAt: (i, o) => this.movePlace(i, o),
      onPlaceConfirm: (i) => this.confirmPlace(i),
      onCancel: () => this.setMode("normal"),
      onSelect: () => {
        this.mode === "place" && !Nc(a, this.sel) && this.setMode("normal"), this.mode === "rally" && this.setMode("normal"), this.selectSound();
      },
      onInteract: () => this.hud.hideHint(),
      mode: () => this.mode,
      fogOn: () => this.scene.fogOn
    }), this.input.selected = this.sel, this.resize();
  }
  /** som de seleção (sem vozes): ferramenta, tambor, ou o som da construção ou do bicho */
  selectSound() {
    const t = this.world, s = [...this.sel][0];
    if (s === void 0 || !t.alive[s] || t.owner[s] !== vt) return;
    if (t.isBuilding(s)) {
      const i = t.bdef(s).key;
      Ge(i === "pen" ? "animal.sheep" : i === "stable" ? "animal.horse" : i === "forge" ? "work.pickMetal" : i === "market" ? "soft" : "sel.building");
      return;
    }
    const a = t.kind[s];
    Ge(a === ct.villager ? "sel.villager" : a === ct.dog ? "animal.dog" : a === ct.horseman ? "animal.horse" : "sel.soldier");
  }
  own(t) {
    const s = this.world, a = [];
    for (let i = 0; i < s.top; i++) s.isUnit(i) && s.owner[i] === vt && t(i) && a.push(i);
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
    const o = this.world.size, n = [s * o + t], r = Math.sign(a - t), l = Math.sign(i - s), h = a - t, c = i - s, u = Math.hypot(h, c) || 1, d = (y, g) => Math.abs((y - t) * c - (g - s) * h) / u;
    let f = t, p = s;
    for (; (f !== a || p !== i) && n.length < 40; )
      f === a ? p += l : p === i || d(f + r, p) <= d(f, p + l) ? f += r : p += l, n.push(p * o + f);
    return n;
  }
  moveWall(t, s) {
    const a = this.world, i = a.size, o = Et[Vt.wall].cost.stone ?? 0, n = Math.floor(t), r = Math.floor(s), l = this.wallA ? this.wallLine(this.wallA.tx, this.wallA.tz, n, r) : [r * i + n];
    let h = Math.floor(a.players[vt].res.stone / 100 / o);
    const c = l.map((u) => {
      const d = a.canPlace(vt, "wall", u % i, Math.floor(u / i)) && h > 0;
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
    const a = this.world, i = Et[Vt[this.placeKey]], o = Math.round(t - i.size / 2), n = Math.round(s - i.size / 2), r = a.canPlace(vt, this.placeKey, o, n) && a.canAfford(vt, i.cost);
    this.place = { tx: o, tz: n, ok: r }, this.scene.setGhost(this.placeKey, o, n, r), this.hud.setMode("place", r, 0, this.placeKey);
  }
  confirmPlace(t) {
    const s = this.world, a = this.own((o) => this.sel.has(o) && s.kind[o] === ct.villager);
    if (this.mode !== "place" || !a.length) {
      this.setMode("normal");
      return;
    }
    if (!this.place.ok) {
      this.hud.toast(b("place.bad"), void 0, void 0, "place"), Ge("place.bad");
      return;
    }
    if (this.placeKey === "wall") {
      if (!this.wallA) {
        this.wallA = { tx: this.place.tx, tz: this.place.tz }, this.moveWall(this.place.tx + 0.5, this.place.tz + 0.5), Ge("order.work");
        return;
      }
      this.send({ type: "wall", player: vt, ids: a, tiles: this.wallTiles.slice() }), Ge("place"), Ma("muralha");
      const o = this.wallTiles[this.wallTiles.length - 1];
      this.scene.ping(o % s.size + 0.5, Math.floor(o / s.size) + 0.5, "work"), this.setMode("normal"), this.hud.resetCard();
      return;
    }
    this.send({ type: "build", player: vt, ids: a, key: this.placeKey, tx: this.place.tx, tz: this.place.tz }), Ge("place"), Ma("construir");
    const i = Et[Vt[this.placeKey]];
    this.scene.ping(this.place.tx + i.size / 2, this.place.tz + i.size / 2, "work"), t && s.canAfford(vt, { wood: (i.cost.wood ?? 0) * 2, stone: (i.cost.stone ?? 0) * 2 }) ? (this.place.ok = !1, this.scene.setGhost(this.placeKey, this.place.tx, this.place.tz, !1)) : (this.setMode("normal"), this.hud.resetCard());
  }
  pause() {
    if (!this.ended) {
      if (lt?.papel === "convidado") {
        this.setMode("normal"), $t.showGuest(lt.parceiro, we);
        return;
      }
      if (this.paused = !0, this.setMode("normal"), $t.showPause(Math.floor(this.world.tick / 600), we, this.owner, Ga()), Ye(), lt?.papel === "anfitriao" && lt.ativo) {
        const t = lt.host.turno(this.world, !0);
        t && lt.amigo.turno(t), lt.amigo.pausa(!0);
      }
    }
  }
  resume() {
    this.paused = !1, $t.hide(), lt?.papel === "anfitriao" && lt.ativo && lt.amigo.pausa(!1);
  }
  /** jogo sem conta: passa para a conta em que a pessoa entrou (no aparelho, vai para o lugar dela) */
  adopt() {
    const t = Ue();
    !this.owner && t && (Gi("", t), this.owner = t);
  }
  /** salva no aparelho (no lugar da conta dona do jogo) e, se a pessoa estiver nessa conta, na nuvem */
  async save() {
    if (this.ended || this.guest) return "fail";
    await Ye(), this.adopt();
    const { d: t, ok: s } = Bo(this.world, this.owner), a = await Ro(t, this.owner);
    return s || Ve("problema", { tipo: "aparelho" }), a === "fail" && Ve("problema", { tipo: "nuvem" }), a === "ok" ? s ? "both" : "cloudOnly" : s ? a === "fail" ? "localOnly" : a === "other" && this.owner ? "other" : "local" : "fail";
  }
  /** salva sem esperar (a cada 5 min, ao sair da partida e ao fechar a aba) */
  autoSave(t = !1) {
    if (this.ended || this.guest) return;
    this.adopt();
    const { d: s, ok: a } = Bo(this.world, this.owner);
    !a && !t && Ve("problema", { tipo: "aparelho" }), Ro(s, this.owner, t).then((i) => {
      i === "fail" && !t && Ve("problema", { tipo: "nuvem" });
    });
  }
  resize() {
    this.scene.resize(innerWidth, innerHeight);
  }
  /** ordem de quem joga: sozinho ou anfitrião, entra no jogo; no jogo de um amigo, vai para o anfitrião, que a põe no jogo */
  send(t) {
    lt?.papel === "convidado" ? lt.amigo.ordem(Wn(t)) : this.world.issue(t, !0);
  }
  /** o anfitrião vê onde o amigo mandou (o mesmo sinal das ordens) */
  pingAmigo(t) {
    const s = this.world, a = s.size;
    t.type === "move" || t.type === "amove" || t.type === "rally" ? this.scene.ping(t.x / 256, t.z / 256, t.type === "amove" ? "attack" : "move") : t.type === "gather" ? this.scene.ping(t.k % a + 0.5, Math.floor(t.k / a) + 0.5, "work") : (t.type === "work" || t.type === "attack") && s.alive[t.target] ? this.scene.ping(s.x[t.target] / 256, s.z[t.target] / 256, t.type === "attack" && s.owner[t.target] !== kt ? "attack" : "work") : t.type === "build" && this.scene.ping(t.tx + 1, t.tz + 1, "work");
  }
  /** câmera e seleção, para continuar iguais quando o jogo recarrega (o amigo entrou ou pediu o jogo de novo) */
  view() {
    const t = this.scene.camera;
    return { tx: t.tx, tz: t.tz, yaw: t.tyaw, dist: t.tdist, sel: [...this.sel] };
  }
  setView(t) {
    const s = this.scene.camera;
    s.x = s.tx = t.tx, s.z = s.tz = t.tz, s.yaw = s.tyaw = t.yaw, s.dist = s.tdist = t.dist;
    for (const a of t.sel) this.world.isUnit(a) && this.world.owner[a] === vt && this.sel.add(a);
  }
  /** convidado: anda até o passo que o anfitrião já mandou (mais depressa quando fica para trás) e confere a partida */
  seguir(t, s) {
    const a = this.world, i = s.guest, o = i.ate - a.tick;
    if (o > 0) {
      this.acc += t * (s.pausado || o > 30 ? 6 : o > 6 ? 2 : 1);
      let r = 0;
      for (; this.acc >= Ms && a.tick < i.ate && r < 40; )
        a.step(), i.depoisDoPasso(a), this.acc -= Ms, r++;
    }
    a.tick >= i.ate && (this.acc = Math.min(this.acc, Ms * 0.95));
    const n = !s.pausado && performance.now() - s.ultimoTurno > 4e3;
    n !== s.parado && !s.amigo.reconectando && (s.parado = n, this.hud.setFaixa(n ? b("amigo.espera") : s.pausado ? b("amigo.pausado") : null)), (i.divergiu || i.ate - a.tick > 600) && !s.pediu && (s.pediu = !0, s.amigo.pedir(), this.hud.setFaixa(b("amigo.sincronizando")), jt("amigo", { acao: "sincronizou", papel: "convidado" }));
  }
  frame(t) {
    const s = this.world, a = lt, i = a?.papel === "anfitriao" && a.ativo ? a.host : null;
    if (a?.papel === "convidado")
      a.ativo && this.seguir(t, a);
    else if (!this.paused) {
      this.acc += t;
      let r = 0;
      for (; this.acc >= Ms && r < 4; )
        s.step(), i?.depoisDoPasso(s), this.acc -= Ms, r++;
      r === 4 && (this.acc = 0);
    }
    if (i) {
      const r = i.turno(s);
      r && a.amigo.turno(r);
    }
    const o = s.drain();
    if (o.length) {
      this.scene.consume(o), this.hud.onEvents(o), this.snd.onEvents(o);
      for (const r of o)
        (r.t === "tree" || r.t === "res" && s.resKind[r.k] === 0) && this.minimap.clearTile(r.k), r.t === "age" && r.player === vt && !this.guest && jt("era_nova", { era: r.era, min: Qa(s.tick) }), r.t === "msg" && r.player === vt && !this.guest && this.medir(r.key), r.t === "end" && !this.ended && this.end(r.result);
    }
    this.input.update(t);
    for (const r of [...this.sel]) s.alive[r] || this.sel.delete(r);
    this.time += t, this.scene.render(t, this.paused ? 1 : this.acc / Ms, this.sel, this.time), this.minimap.update(t, this.scene.fogOn, innerWidth, innerHeight), this.hud.update(t), this.snd.update(t, this.paused), !this.paused && !this.ended && !this.guest && (this.saveT += t) > 300 && (this.saveT = 0, this.autoSave());
    const n = Math.floor(s.tick / 600);
    if (!this.ended && !this.guest && n > this.marco) {
      for (const r of $l) r > this.marco && r <= n && jt("marco_partida", { min: r });
      this.marco = n;
    }
    if (!Ho && !this.paused && !document.hidden && (this.perfT += t, this.perfT > 10 && this.perfN++, this.perfT >= 40 && (Ho = !0, jt("desempenho", { fps: wl(this.perfN / (this.perfT - 10)), q: ["alta", "media", "baixa"][we] }))), Na && !this.paused && (this.autoT += t, this.autoN++, this.autoT > 4)) {
      Na = !1;
      const r = this.autoN / this.autoT;
      r < 40 && we < 2 && (Qn(we + 1), this.scene.setQuality(we), this.hud.toast(b("q.auto", { q: b(`q.${Vs[we].key}`), fps: Math.round(r) })));
    }
  }
  /** avisos da partida para a medição anônima do site (o que cada um quer dizer: docs/09-medicao.md) */
  medir(t) {
    const [s, a] = t.split("."), i = this.world, o = i.players[vt].era, n = Number(a) === Ee ? "barbaros" : "rival";
    s === "centerDanger" ? jt("centro_em_perigo", { por: n, era: o }) : s === "centerLost" ? this.derrotaPor = n : s === "hunger" && jt("fome", { era: o, ano: Math.min(3, i.year) });
  }
  end(t) {
    const s = this.world;
    this.guest || (t === "victory" ? jt("fim_vitoria", { era: s.players[vt].era, min: Qa(s.tick) }) : jt("fim_derrota", { por: this.derrotaPor || "rival", min: Qa(s.tick) }), Hi(this.owner), Yc(this.owner)), this.ended = !0, this.setMode("normal"), $t.showEnd(t, Math.floor(this.world.tick / 600), this.world.players[vt].era);
  }
  dispose() {
    this.snd.dispose(), this.input.dispose(), this.hud.dispose(), this.scene.dispose();
  }
}
let X = null, lt = null;
const tr = (e, t) => ({ amigo: e, papel: t, parceiro: "", ativo: !1, pediu: !1, pausado: !1, parado: !1, ultimoTurno: performance.now(), host: new t0(), guest: new e0() });
async function T0() {
  if (!(!X || lt || X.ended)) {
    $t.setConvite({ estado: "criando" });
    try {
      lt = tr(await Qs.convidar(w0), "anfitriao"), jt("amigo", { acao: "convidou", papel: "anfitriao" });
    } catch {
      $t.setConvite({ estado: "erro" });
    }
  }
}
function w0(e) {
  const t = lt;
  if (!(!t || t.papel !== "anfitriao"))
    switch (e.t) {
      case "codigo":
        $t.setConvite({ estado: "aberto", codigo: t.amigo.codigo });
        break;
      case "entrou": {
        const s = t.ativo;
        t.parceiro = e.nome, $t.setConvite({ estado: "junto", codigo: t.amigo.codigo, nome: e.nome }), _o(!s), s || (X?.hud.toast(b("amigo.entrou", { name: e.nome })), jt("amigo", { acao: "entrou", papel: "anfitriao" }));
        break;
      }
      case "saiu":
        Uo(t, e.nome);
        break;
      case "ordem":
        if (t.ativo && X && !X.ended) {
          const s = t.host.ordemDoAmigo(X.world, e.d, vt);
          s && X.pingAmigo(s);
        }
        break;
      case "pede":
        t.ativo && (_o(!1), jt("amigo", { acao: "sincronizou", papel: "anfitriao" }));
        break;
      case "caiu":
        X?.hud.setFaixa(b("amigo.caiu"));
        break;
      case "reconectou":
        X?.hud.setFaixa(null), e.sozinho && t.ativo && Uo(t, t.parceiro);
        break;
      case "erro":
        er(!1), $t.setConvite({ estado: "erro" });
        break;
    }
}
function Uo(e, t) {
  e.ativo = !1, X && (X.world.onApplied = null, X.hud.setAmigo(null), X.hud.toast(b("amigo.saiu", { name: t }))), $t.setConvite({ estado: "aberto", codigo: e.amigo.codigo });
}
function _o(e) {
  const t = X, s = lt;
  if (!t || !s || t.ended) return;
  const a = JSON.stringify(Nn(t.world)), i = Ha(JSON.parse(a));
  for (const n of t.world.takePendingExt()) i.issue(n, !0);
  const o = t.paused && !e;
  Ts(i, t.owner, t.view()), s.host.ligar(i), s.ativo = !0, s.amigo.jogo(a), X.hud.setAmigo(s.parceiro), o ? X.pause() : s.amigo.pausa(!1);
}
function er(e = !0) {
  const t = lt;
  !t || t.papel !== "anfitriao" || (lt = null, t.amigo.sair(), X && (X.world.onApplied = null, X.hud.setAmigo(null), X.hud.setFaixa(null)), $t.setConvite(null), e && jt("amigo", { acao: "encerrou", papel: "anfitriao" }));
}
function S0(e) {
  lt || X || ($t.setAmigoMsg(b("amigo.entrando"), !0), lt = tr(Qs.entrar(e, $0), "convidado"));
}
function $0(e) {
  const t = lt;
  if (!(!t || t.papel !== "convidado"))
    switch (e.t) {
      case "oi":
        t.parceiro = e.nome, $t.setAmigoMsg(b("amigo.entrandoEm", { name: e.nome }), !0);
        break;
      case "jogo": {
        if (e.v !== In) {
          ri(b("amigo.erro.t"), b("amigo.versao"));
          return;
        }
        let s = null;
        try {
          s = Ha(e.d);
        } catch {
          s = null;
        }
        if (!s) {
          t.pediu = !0, t.amigo.pedir();
          return;
        }
        const a = !X;
        Ts(s, "", X ? X.view() : void 0), t.guest.ligar(s), t.ativo = !0, t.pediu = !1, t.parado = !1, t.ultimoTurno = performance.now(), X.hud.setAmigo(t.parceiro), X.hud.setFaixa(t.pausado ? b("amigo.pausado") : null), a && jt("amigo", { acao: "entrou", papel: "convidado" });
        break;
      }
      case "turno":
        t.ativo && X && (t.ultimoTurno = performance.now(), t.guest.receber(X.world, e.d));
        break;
      case "pausa":
        t.pausado = e.on, t.ultimoTurno = performance.now(), X?.hud.setFaixa(e.on ? b("amigo.pausado") : null);
        break;
      case "espera":
        X?.hud.setFaixa(b("amigo.espera"));
        break;
      case "voltou":
        t.ultimoTurno = performance.now(), t.parado = !1, X?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // o jogo vem de novo
      case "caiu":
        X?.hud.setFaixa(b("amigo.caiu")), jt("amigo", { acao: "caiu", papel: "convidado" });
        break;
      case "reconectou":
        t.ultimoTurno = performance.now(), t.parado = !1, X?.hud.setFaixa(b("amigo.sincronizando"));
        break;
      // a sala avisa o anfitrião, que manda o jogo de novo
      case "fim":
        ri(b("amigo.fim.t"), b("amigo.fim")), jt("amigo", { acao: "fim", papel: "convidado" });
        break;
      case "erro":
        ri(b("amigo.erro.t"), !e.msg || e.msg === "rede" ? b("amigo.semRede") : e.msg);
        break;
    }
}
function ri(e, t) {
  const s = lt;
  lt = null, s?.amigo.sair(), X ? (X.paused = !0, X.hud.setFaixa(null), $t.showInfo(e, t)) : $t.setAmigoMsg(t, !1);
}
let Ho = !1;
const Ma = (e) => Ve("ordem_primeira", { tipo: e }), li = (e, t) => jt("partida_continuada", { era: e.players[vt].era, de: t });
Wi.addEventListener("webglcontextlost", () => Ve("problema", { tipo: "webgl" }));
const sr = {
  cont: async () => {
    const e = Ds.save;
    if (!e) return;
    if (e.from === "cloud") {
      const s = await Gn();
      let a = null;
      try {
        a = s ? Ha(s) : null;
      } catch {
        a = null;
      }
      if (a && s) {
        Uc(s, e.owner), Ts(a, e.owner), li(a, "nuvem");
        return;
      }
      Ve("problema", { tipo: "carregar" });
    }
    const t = _c(e.owner);
    if (!t) {
      Ve("problema", { tipo: "carregar" }), Hi(e.owner), ja();
      return;
    }
    if (e.adopt) {
      const s = Ue();
      if (s) {
        Gi("", s), Ts(t, s), li(t, "aparelho");
        return;
      }
    }
    Ts(t, e.owner), li(t, "aparelho");
  },
  start: (e, t) => {
    Ts(new yn(Ra("seed", Date.now() % 1000000007 >>> 0), e + 1, { humans: 1, difficulty: t, testUnits: Math.min(600, Ra("units", 0)) }), Ue()), jt("partida_nova", { rivais: e, dif: Sl[t] ?? "normal" });
  },
  resume: () => X?.resume(),
  save: () => X?.save() ?? Promise.resolve("fail"),
  quit: () => {
    X?.autoSave(), ci();
  },
  quality: (e) => {
    Qn(e), Na = !1, X?.scene.setQuality(e);
  },
  help: () => {
    X?.resume(), X?.hud.openHelp();
  },
  watch: () => $t.hide(),
  toMenu: () => ci(),
  login: () => {
    qo();
  },
  profile: () => {
    Kc();
  },
  // na pausa: entrou na conta, então o jogo (sem conta) passa para ela e já é salvo lá
  loginPause: async () => {
    if (await qo(), X && ps()) {
      const e = await X.save();
      $t.updatePause(X.owner, Ga(), e);
    }
  },
  convidar: () => {
    T0();
  },
  encerrarConvite: () => er(),
  entrarAmigo: (e) => S0(e),
  sairAmigo: () => {
    const e = lt;
    lt = null, e?.amigo.sair(), ci();
  }
}, $t = new qc(sr);
function Ts(e, t, s) {
  X?.dispose(), X = new A0(e, t), s && X.setView(s), $t.hide();
  const a = X;
  window.__amigo = () => lt && { papel: lt.papel, ativo: lt.ativo, pediu: lt.pediu, divergiu: lt.guest.divergiu, ate: lt.guest.ate, parceiro: lt.parceiro }, window.__origines = {
    world: e,
    scene: a.scene,
    input: a.input,
    game: a,
    screen: (i, o, n = 0.5) => {
      const r = a.scene.camera.cam.position.clone().set(i, dt(e.map, i, o) + n, o).project(a.scene.camera.cam);
      return [(r.x + 1) / 2 * innerWidth, (1 - r.y) / 2 * innerHeight, r.z < 1 ? 1 : 0];
    }
  };
}
function ci() {
  if (lt) {
    const e = lt;
    lt = null, e.amigo.sair();
  }
  $t.setConvite(null), X?.dispose(), X = null, D.setScene("menu"), Gt.menu(), ia.setClearColor(1911332, 1), ia.clear(), ja();
}
let Ds = { acc: "loading", save: null, other: null }, hi = 0;
async function ja() {
  const e = ++hi;
  if (Ds = Go(null, ps()), $t.showStart(Ds), !ps()) return;
  const t = await Xc();
  e !== hi || $t.kind !== "start" || (await C0(t), !(e !== hi || $t.kind !== "start") && (Ds = Go(t, !1), $t.updateStart(Ds)));
}
async function C0(e) {
  const t = Ue();
  if (!t || Gc()) return;
  const s = Hc("");
  if (s && e && !Ks(t)) {
    const a = await Gn();
    a && a.seed === s.seed && s.tick >= a.tick && Gi("", t);
  }
  jc();
}
function Go(e, t) {
  const s = Ga();
  if (s === "loading") return { acc: s, save: null, other: null };
  const a = Ue();
  if (a) {
    const o = e ? Zc(e) : null, n = Ks(a);
    if (o && (!n || (o.savedAt ?? 0) > (n.savedAt ?? 0))) return { acc: s, save: { meta: o, from: "cloud", owner: a, adopt: !1 }, other: null, pending: t };
    if (n) return { acc: s, save: { meta: n, from: "device", owner: a, adopt: !1 }, other: null, pending: t };
    const r = Ks("");
    return { acc: s, save: r ? { meta: r, from: "device", owner: "", adopt: !0 } : null, other: null, pending: t };
  }
  const i = Ks("");
  return { acc: s, save: i ? { meta: i, from: "device", owner: "", adopt: !1 } : null, other: Dc()[0]?.dono ?? null };
}
Wc(() => {
  $t.kind === "start" ? ja() : $t.kind === "pause" && X && $t.updatePause(X.owner, Ga());
});
addEventListener("resize", () => {
  ia.setSize(innerWidth, innerHeight, !1), X?.resize();
});
ia.setSize(innerWidth, innerHeight, !1);
let Pi = performance.now();
const ar = () => X?.autoSave(!0);
document.addEventListener("visibilitychange", () => {
  Pi = performance.now(), document.hidden ? ar() : Ye();
});
addEventListener("pagehide", () => {
  if (ar(), lt?.papel === "anfitriao") {
    const e = lt;
    lt = null, e.amigo.sair();
  }
});
let za = 0, di = 0, ir = !1;
Ps.get("autostart") === "1" && (window.__clock = { manual: (e) => {
  ir = e;
}, step: (e) => X?.frame(e) });
function or(e) {
  const t = Math.min(0.1, (e - Pi) / 1e3);
  Pi = e, X && !ir && X.frame(t), di++, za += t, za > 1 && (window.__fps = di / za, di = 0, za = 0), requestAnimationFrame(or);
}
requestAnimationFrame(or);
const nr = Ps.get("sons") === "1" || location.hash === "#sons";
D.install();
nr || Gt.menu();
document.addEventListener("click", (e) => {
  const t = e.target?.closest?.("button");
  t && t.closest("#hud, #menus") && t.id !== "btn-som" && t.id !== "btn-som-inicio" && Ge(t.getAttribute("aria-disabled") === "true" ? "ui.denied" : "ui.click");
}, !0);
window.__som = { ids: z0, measure: M0, audio: D, played: Oi, music: Gt };
nr ? x0() : Ps.get("autostart") === "1" ? sr.start(Math.min(3, Math.max(1, Ra("players", 4) - 1)), Math.min(2, Ra("difficulty", 1))) : (ja(), Vc());
Bc().then((e) => $t.setAmigoDisponivel(e));
const ui = document.getElementById("loading");
ui && (ui.style.opacity = "0", setTimeout(() => ui.remove(), 450));
