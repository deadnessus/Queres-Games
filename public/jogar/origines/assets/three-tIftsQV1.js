/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const Cf = 2;
const Pf = 1;
const Lf = 4;
const Df = 1006;
const Uf = 1009;
const If = 1028;
const Nf = 3201;
const be = "srgb", On = "srgb-linear", Bi = "linear", $t = "srgb";
const Ff = 35048, Hr = "300 es";
class Bn {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const r = this._listeners[t];
    if (r !== void 0) {
      const s = r.indexOf(e);
      s !== -1 && r.splice(s, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, t);
      t.target = null;
    }
  }
}
const de = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Wi = Math.PI / 180, Er = 180 / Math.PI;
function zn() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (de[i & 255] + de[i >> 8 & 255] + de[i >> 16 & 255] + de[i >> 24 & 255] + "-" + de[t & 255] + de[t >> 8 & 255] + "-" + de[t >> 16 & 15 | 64] + de[t >> 24 & 255] + "-" + de[e & 63 | 128] + de[e >> 8 & 255] + "-" + de[e >> 16 & 255] + de[e >> 24 & 255] + de[n & 255] + de[n >> 8 & 255] + de[n >> 16 & 255] + de[n >> 24 & 255]).toLowerCase();
}
function me(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Pa(i, t) {
  return (i % t + t) % t;
}
function Xi(i, t, e) {
  return (1 - e) * i + e * t;
}
function Wn(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function xe(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class at {
  constructor(t = 0, e = 0) {
    at.prototype.isVector2 = !0, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6], this.y = r[1] * e + r[4] * n + r[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(me(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = this.x - t.x, a = this.y - t.y;
    return this.x = s * n - a * r + t.x, this.y = s * r + a * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Bt {
  constructor(t, e, n, r, s, a, o, l, c) {
    Bt.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c);
  }
  set(t, e, n, r, s, a, o, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = r, h[2] = o, h[3] = e, h[4] = s, h[5] = l, h[6] = n, h[7] = a, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[4],
      e[8],
      e[1],
      e[5],
      e[9],
      e[2],
      e[6],
      e[10]
    ), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[3], l = n[6], c = n[1], h = n[4], f = n[7], d = n[2], p = n[5], _ = n[8], M = r[0], m = r[3], u = r[6], A = r[1], y = r[4], g = r[7], N = r[2], R = r[5], C = r[8];
    return s[0] = a * M + o * A + l * N, s[3] = a * m + o * y + l * R, s[6] = a * u + o * g + l * C, s[1] = c * M + h * A + f * N, s[4] = c * m + h * y + f * R, s[7] = c * u + h * g + f * C, s[2] = d * M + p * A + _ * N, s[5] = d * m + p * y + _ * R, s[8] = d * u + p * g + _ * C, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8];
    return e * a * h - e * o * c - n * s * h + n * o * l + r * s * c - r * a * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = h * a - o * c, d = o * l - h * s, p = c * s - a * l, _ = e * f + n * d + r * p;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / _;
    return t[0] = f * M, t[1] = (r * c - h * n) * M, t[2] = (o * n - r * a) * M, t[3] = d * M, t[4] = (h * e - r * l) * M, t[5] = (r * s - o * e) * M, t[6] = p * M, t[7] = (n * l - c * e) * M, t[8] = (a * e - n * s) * M, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, r, s, a, o) {
    const l = Math.cos(s), c = Math.sin(s);
    return this.set(
      n * l,
      n * c,
      -n * (l * a + c * o) + a + t,
      -r * c,
      r * l,
      -r * (-c * a + l * o) + o + e,
      0,
      0,
      1
    ), this;
  }
  //
  scale(t, e) {
    return this.premultiply(qi.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(qi.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(qi.makeTranslation(t, e)), this;
  }
  // for 2D Transforms
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(
      1,
      0,
      t.x,
      0,
      1,
      t.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      t,
      0,
      1,
      e,
      0,
      0,
      1
    ), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      n,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e) {
    return this.set(
      t,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 9; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const qi = /* @__PURE__ */ new Bt();
function qs(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function Oi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function La() {
  const i = Oi("canvas");
  return i.style.display = "block", i;
}
const kr = {};
function $n(i) {
  i in kr || (kr[i] = !0, console.warn(i));
}
function Da(i, t, e) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, e);
          break;
        default:
          n();
      }
    }
    setTimeout(s, e);
  });
}
function Ua(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Ia(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const Xt = {
  enabled: !0,
  workingColorSpace: On,
  /**
   * Implementations of supported color spaces.
   *
   * Required:
   *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
   *	- whitePoint: reference white [ x y ]
   *	- transfer: transfer function (pre-defined)
   *	- toXYZ: Matrix3 RGB to XYZ transform
   *	- fromXYZ: Matrix3 XYZ to RGB transform
   *	- luminanceCoefficients: RGB luminance coefficients
   *
   * Optional:
   *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }
   *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
   *
   * Reference:
   * - https://www.russellcottrell.com/photo/matrixCalculator.htm
   */
  spaces: {},
  convert: function(i, t, e) {
    return this.enabled === !1 || t === e || !t || !e || (this.spaces[t].transfer === $t && (i.r = Ye(i.r), i.g = Ye(i.g), i.b = Ye(i.b)), this.spaces[t].primaries !== this.spaces[e].primaries && (i.applyMatrix3(this.spaces[t].toXYZ), i.applyMatrix3(this.spaces[e].fromXYZ)), this.spaces[e].transfer === $t && (i.r = Nn(i.r), i.g = Nn(i.g), i.b = Nn(i.b))), i;
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this.workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this.workingColorSpace);
  },
  getPrimaries: function(i) {
    return this.spaces[i].primaries;
  },
  getTransfer: function(i) {
    return i === "" ? Bi : this.spaces[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this.workingColorSpace) {
    return i.fromArray(this.spaces[t].luminanceCoefficients);
  },
  define: function(i) {
    Object.assign(this.spaces, i);
  },
  // Internal APIs
  _getMatrix: function(i, t, e) {
    return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ);
  },
  _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  },
  _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }
};
function Ye(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Nn(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
const Wr = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], Xr = [0.2126, 0.7152, 0.0722], qr = [0.3127, 0.329], Yr = /* @__PURE__ */ new Bt().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), Zr = /* @__PURE__ */ new Bt().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
Xt.define({
  [On]: {
    primaries: Wr,
    whitePoint: qr,
    transfer: Bi,
    toXYZ: Yr,
    fromXYZ: Zr,
    luminanceCoefficients: Xr,
    workingColorSpaceConfig: { unpackColorSpace: be },
    outputColorSpaceConfig: { drawingBufferColorSpace: be }
  },
  [be]: {
    primaries: Wr,
    whitePoint: qr,
    transfer: $t,
    toXYZ: Yr,
    fromXYZ: Zr,
    luminanceCoefficients: Xr,
    outputColorSpaceConfig: { drawingBufferColorSpace: be }
  }
});
let xn;
class Na {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      xn === void 0 && (xn = Oi("canvas")), xn.width = t.width, xn.height = t.height;
      const n = xn.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = xn;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = Oi("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const r = n.getImageData(0, 0, t.width, t.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Ye(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(Ye(e[n] / 255) * 255) : e[n] = Ye(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let Fa = 0;
class Ys {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Fa++ }), this.uuid = zn(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0)
      return t.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(Yi(r[a].image)) : s.push(Yi(r[a]));
      } else
        s = Yi(r);
      n.url = s;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function Yi(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Na.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Oa = 0;
class ge extends Bn {
  constructor(t = ge.DEFAULT_IMAGE, e = ge.DEFAULT_MAPPING, n = 1001, r = 1001, s = 1006, a = 1008, o = 1023, l = 1009, c = ge.DEFAULT_ANISOTROPY, h = "") {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Oa++ }), this.uuid = zn(), this.name = "", this.source = new Ys(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = c, this.format = o, this.internalFormat = null, this.type = l, this.offset = new at(0, 0), this.repeat = new at(1, 1), this.center = new at(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Bt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0)
      return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== 300) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case 1e3:
          t.x = t.x - Math.floor(t.x);
          break;
        case 1001:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case 1e3:
          t.y = t.y - Math.floor(t.y);
          break;
        case 1001:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
ge.DEFAULT_IMAGE = null;
ge.DEFAULT_MAPPING = 300;
ge.DEFAULT_ANISOTROPY = 1;
class ae {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    ae.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, r) {
    return this.x = t, this.y = e, this.z = n, this.w = r, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = this.w, a = t.elements;
    return this.x = a[0] * e + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * e + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * e + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * e + a[7] * n + a[11] * r + a[15] * s, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, r, s;
    const l = t.elements, c = l[0], h = l[4], f = l[8], d = l[1], p = l[5], _ = l[9], M = l[2], m = l[6], u = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(f - M) < 0.01 && Math.abs(_ - m) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(f + M) < 0.1 && Math.abs(_ + m) < 0.1 && Math.abs(c + p + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const y = (c + 1) / 2, g = (p + 1) / 2, N = (u + 1) / 2, R = (h + d) / 4, C = (f + M) / 4, P = (_ + m) / 4;
      return y > g && y > N ? y < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(y), r = R / n, s = C / n) : g > N ? g < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(g), n = R / r, s = P / r) : N < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(N), n = C / s, r = P / s), this.set(n, r, s, e), this;
    }
    let A = Math.sqrt((m - _) * (m - _) + (f - M) * (f - M) + (d - h) * (d - h));
    return Math.abs(A) < 1e-3 && (A = 1), this.x = (m - _) / A, this.y = (f - M) / A, this.z = (d - h) / A, this.w = Math.acos((c + p + u - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Ba extends Bn {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new ae(0, 0, t, e), this.scissorTest = !1, this.viewport = new ae(0, 0, t, e);
    const r = { width: t, height: e, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const s = new ge(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    s.flipY = !1, s.generateMipmaps = n.generateMipmaps, s.internalFormat = n.internalFormat, this.textures = [];
    const a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = t, this.textures[r].image.height = e, this.textures[r].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, r = t.textures.length; n < r; n++)
      this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new Ys(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class pn extends Ba {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class Zs extends ge {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class za extends ge {
  constructor(t = null, e = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class si {
  constructor(t = 0, e = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = r;
  }
  static slerpFlat(t, e, n, r, s, a, o) {
    let l = n[r + 0], c = n[r + 1], h = n[r + 2], f = n[r + 3];
    const d = s[a + 0], p = s[a + 1], _ = s[a + 2], M = s[a + 3];
    if (o === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
      return;
    }
    if (o === 1) {
      t[e + 0] = d, t[e + 1] = p, t[e + 2] = _, t[e + 3] = M;
      return;
    }
    if (f !== M || l !== d || c !== p || h !== _) {
      let m = 1 - o;
      const u = l * d + c * p + h * _ + f * M, A = u >= 0 ? 1 : -1, y = 1 - u * u;
      if (y > Number.EPSILON) {
        const N = Math.sqrt(y), R = Math.atan2(N, u * A);
        m = Math.sin(m * R) / N, o = Math.sin(o * R) / N;
      }
      const g = o * A;
      if (l = l * m + d * g, c = c * m + p * g, h = h * m + _ * g, f = f * m + M * g, m === 1 - o) {
        const N = 1 / Math.sqrt(l * l + c * c + h * h + f * f);
        l *= N, c *= N, h *= N, f *= N;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = f;
  }
  static multiplyQuaternionsFlat(t, e, n, r, s, a) {
    const o = n[r], l = n[r + 1], c = n[r + 2], h = n[r + 3], f = s[a], d = s[a + 1], p = s[a + 2], _ = s[a + 3];
    return t[e] = o * _ + h * f + l * p - c * d, t[e + 1] = l * _ + h * d + c * f - o * p, t[e + 2] = c * _ + h * p + o * d - l * f, t[e + 3] = h * _ - o * f - l * d - c * p, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, r) {
    return this._x = t, this._y = e, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = !0) {
    const n = t._x, r = t._y, s = t._z, a = t._order, o = Math.cos, l = Math.sin, c = o(n / 2), h = o(r / 2), f = o(s / 2), d = l(n / 2), p = l(r / 2), _ = l(s / 2);
    switch (a) {
      case "XYZ":
        this._x = d * h * f + c * p * _, this._y = c * p * f - d * h * _, this._z = c * h * _ + d * p * f, this._w = c * h * f - d * p * _;
        break;
      case "YXZ":
        this._x = d * h * f + c * p * _, this._y = c * p * f - d * h * _, this._z = c * h * _ - d * p * f, this._w = c * h * f + d * p * _;
        break;
      case "ZXY":
        this._x = d * h * f - c * p * _, this._y = c * p * f + d * h * _, this._z = c * h * _ + d * p * f, this._w = c * h * f - d * p * _;
        break;
      case "ZYX":
        this._x = d * h * f - c * p * _, this._y = c * p * f + d * h * _, this._z = c * h * _ - d * p * f, this._w = c * h * f + d * p * _;
        break;
      case "YZX":
        this._x = d * h * f + c * p * _, this._y = c * p * f + d * h * _, this._z = c * h * _ - d * p * f, this._w = c * h * f - d * p * _;
        break;
      case "XZY":
        this._x = d * h * f - c * p * _, this._y = c * p * f - d * h * _, this._z = c * h * _ + d * p * f, this._w = c * h * f + d * p * _;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, r = Math.sin(n);
    return this._x = t.x * r, this._y = t.y * r, this._z = t.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], r = e[4], s = e[8], a = e[1], o = e[5], l = e[9], c = e[2], h = e[6], f = e[10], d = n + o + f;
    if (d > 0) {
      const p = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / p, this._x = (h - l) * p, this._y = (s - c) * p, this._z = (a - r) * p;
    } else if (n > o && n > f) {
      const p = 2 * Math.sqrt(1 + n - o - f);
      this._w = (h - l) / p, this._x = 0.25 * p, this._y = (r + a) / p, this._z = (s + c) / p;
    } else if (o > f) {
      const p = 2 * Math.sqrt(1 + o - n - f);
      this._w = (s - c) / p, this._x = (r + a) / p, this._y = 0.25 * p, this._z = (l + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + f - n - o);
      this._w = (a - r) / p, this._x = (s + c) / p, this._y = (l + h) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(me(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const r = Math.min(1, e / n);
    return this.slerp(t, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, r = t._y, s = t._z, a = t._w, o = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + a * o + r * c - s * l, this._y = r * h + a * l + s * o - n * c, this._z = s * h + a * c + n * l - r * o, this._w = a * h - n * o - r * l - s * c, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, r = this._y, s = this._z, a = this._w;
    let o = a * t._w + n * t._x + r * t._y + s * t._z;
    if (o < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, o = -o) : this.copy(t), o >= 1)
      return this._w = a, this._x = n, this._y = r, this._z = s, this;
    const l = 1 - o * o;
    if (l <= Number.EPSILON) {
      const p = 1 - e;
      return this._w = p * a + e * this._w, this._x = p * n + e * this._x, this._y = p * r + e * this._y, this._z = p * s + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, o), f = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
    return this._w = a * f + this._w * d, this._x = n * f + this._x * d, this._y = r * f + this._y * d, this._z = s * f + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(t),
      r * Math.cos(t),
      s * Math.sin(e),
      s * Math.cos(e)
    );
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class L {
  constructor(t = 0, e = 0, n = 0) {
    L.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(Jr.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(Jr.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6] * r, this.y = s[1] * e + s[4] * n + s[7] * r, this.z = s[2] * e + s[5] * n + s[8] * r, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements, a = 1 / (s[3] * e + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * e + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * e + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * e + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, r = this.z, s = t.x, a = t.y, o = t.z, l = t.w, c = 2 * (a * r - o * n), h = 2 * (o * e - s * r), f = 2 * (s * n - a * e);
    return this.x = e + l * c + a * f - o * h, this.y = n + l * h + o * c - s * f, this.z = r + l * f + s * h - a * c, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, r = this.z, s = t.elements;
    return this.x = s[0] * e + s[4] * n + s[8] * r, this.y = s[1] * e + s[5] * n + s[9] * r, this.z = s[2] * e + s[6] * n + s[10] * r, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, r = t.y, s = t.z, a = e.x, o = e.y, l = e.z;
    return this.x = r * l - s * o, this.y = s * a - n * l, this.z = n * o - r * a, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return Zi.copy(this).projectOnVector(t), this.sub(Zi);
  }
  reflect(t) {
    return this.sub(Zi.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(me(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, r = this.z - t.z;
    return e * e + n * n + r * r;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const r = Math.sin(e) * t;
    return this.x = r * Math.sin(n), this.y = Math.cos(e) * t, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), r = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Zi = /* @__PURE__ */ new L(), Jr = /* @__PURE__ */ new si();
class _n {
  constructor(t = new L(1 / 0, 1 / 0, 1 / 0), e = new L(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(Ce.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(Ce.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = Ce.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (e === !0 && s !== void 0 && t.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          t.isMesh === !0 ? t.getVertexPosition(a, Ce) : Ce.fromBufferAttribute(s, a), Ce.applyMatrix4(t.matrixWorld), this.expandByPoint(Ce);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), ci.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), ci.copy(n.boundingBox)), ci.applyMatrix4(t.matrixWorld), this.union(ci);
    }
    const r = t.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, Ce), Ce.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Xn), hi.subVectors(this.max, Xn), Mn.subVectors(t.a, Xn), Sn.subVectors(t.b, Xn), yn.subVectors(t.c, Xn), Ke.subVectors(Sn, Mn), $e.subVectors(yn, Sn), sn.subVectors(Mn, yn);
    let e = [
      0,
      -Ke.z,
      Ke.y,
      0,
      -$e.z,
      $e.y,
      0,
      -sn.z,
      sn.y,
      Ke.z,
      0,
      -Ke.x,
      $e.z,
      0,
      -$e.x,
      sn.z,
      0,
      -sn.x,
      -Ke.y,
      Ke.x,
      0,
      -$e.y,
      $e.x,
      0,
      -sn.y,
      sn.x,
      0
    ];
    return !Ji(e, Mn, Sn, yn, hi) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ji(e, Mn, Sn, yn, hi)) ? !1 : (ui.crossVectors(Ke, $e), e = [ui.x, ui.y, ui.z], Ji(e, Mn, Sn, yn, hi));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, Ce).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(Ce).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (He[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), He[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), He[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), He[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), He[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), He[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), He[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), He[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(He), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const He = [
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L(),
  /* @__PURE__ */ new L()
], Ce = /* @__PURE__ */ new L(), ci = /* @__PURE__ */ new _n(), Mn = /* @__PURE__ */ new L(), Sn = /* @__PURE__ */ new L(), yn = /* @__PURE__ */ new L(), Ke = /* @__PURE__ */ new L(), $e = /* @__PURE__ */ new L(), sn = /* @__PURE__ */ new L(), Xn = /* @__PURE__ */ new L(), hi = /* @__PURE__ */ new L(), ui = /* @__PURE__ */ new L(), an = /* @__PURE__ */ new L();
function Ji(i, t, e, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    an.fromArray(i, s);
    const o = r.x * Math.abs(an.x) + r.y * Math.abs(an.y) + r.z * Math.abs(an.z), l = t.dot(an), c = e.dot(an), h = n.dot(an);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > o)
      return !1;
  }
  return !0;
}
const Ga = /* @__PURE__ */ new _n(), qn = /* @__PURE__ */ new L(), Ki = /* @__PURE__ */ new L();
class Gn {
  constructor(t = new L(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Ga.setFromPoints(t).getCenter(n);
    let r = 0;
    for (let s = 0, a = t.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(t[s]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty())
      return this.center.copy(t), this.radius = 0, this;
    qn.subVectors(t, this.center);
    const e = qn.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(qn, r / n), this.radius += r;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (Ki.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(qn.copy(t.center).add(Ki)), this.expandByPoint(qn.copy(t.center).sub(Ki))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ke = /* @__PURE__ */ new L(), $i = /* @__PURE__ */ new L(), fi = /* @__PURE__ */ new L(), je = /* @__PURE__ */ new L(), ji = /* @__PURE__ */ new L(), di = /* @__PURE__ */ new L(), Qi = /* @__PURE__ */ new L();
class Js {
  constructor(t = new L(), e = new L(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, ke)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = ke.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (ke.copy(this.origin).addScaledVector(this.direction, e), ke.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, r) {
    $i.copy(t).add(e).multiplyScalar(0.5), fi.copy(e).sub(t).normalize(), je.copy(this.origin).sub($i);
    const s = t.distanceTo(e) * 0.5, a = -this.direction.dot(fi), o = je.dot(this.direction), l = -je.dot(fi), c = je.lengthSq(), h = Math.abs(1 - a * a);
    let f, d, p, _;
    if (h > 0)
      if (f = a * l - o, d = a * o - l, _ = s * h, f >= 0)
        if (d >= -_)
          if (d <= _) {
            const M = 1 / h;
            f *= M, d *= M, p = f * (f + a * d + 2 * o) + d * (a * f + d + 2 * l) + c;
          } else
            d = s, f = Math.max(0, -(a * d + o)), p = -f * f + d * (d + 2 * l) + c;
        else
          d = -s, f = Math.max(0, -(a * d + o)), p = -f * f + d * (d + 2 * l) + c;
      else
        d <= -_ ? (f = Math.max(0, -(-a * s + o)), d = f > 0 ? -s : Math.min(Math.max(-s, -l), s), p = -f * f + d * (d + 2 * l) + c) : d <= _ ? (f = 0, d = Math.min(Math.max(-s, -l), s), p = d * (d + 2 * l) + c) : (f = Math.max(0, -(a * s + o)), d = f > 0 ? s : Math.min(Math.max(-s, -l), s), p = -f * f + d * (d + 2 * l) + c);
    else
      d = a > 0 ? -s : s, f = Math.max(0, -(a * d + o)), p = -f * f + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, f), r && r.copy($i).addScaledVector(fi, d), p;
  }
  intersectSphere(t, e) {
    ke.subVectors(t.center, this.origin);
    const n = ke.dot(this.direction), r = ke.dot(ke) - n * n, s = t.radius * t.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, l = n + a;
    return l < 0 ? null : o < 0 ? this.at(l, e) : this.at(o, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0)
      return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, r, s, a, o, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, f = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, r = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, r = (t.min.x - d.x) * c), h >= 0 ? (s = (t.min.y - d.y) * h, a = (t.max.y - d.y) * h) : (s = (t.max.y - d.y) * h, a = (t.min.y - d.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), f >= 0 ? (o = (t.min.z - d.z) * f, l = (t.max.z - d.z) * f) : (o = (t.max.z - d.z) * f, l = (t.min.z - d.z) * f), n > l || o > r) || ((o > n || n !== n) && (n = o), (l < r || r !== r) && (r = l), r < 0) ? null : this.at(n >= 0 ? n : r, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, ke) !== null;
  }
  intersectTriangle(t, e, n, r, s) {
    ji.subVectors(e, t), di.subVectors(n, t), Qi.crossVectors(ji, di);
    let a = this.direction.dot(Qi), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    je.subVectors(this.origin, t);
    const l = o * this.direction.dot(di.crossVectors(je, di));
    if (l < 0)
      return null;
    const c = o * this.direction.dot(ji.cross(je));
    if (c < 0 || l + c > a)
      return null;
    const h = -o * je.dot(Qi);
    return h < 0 ? null : this.at(h / a, s);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class jt {
  constructor(t, e, n, r, s, a, o, l, c, h, f, d, p, _, M, m) {
    jt.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, r, s, a, o, l, c, h, f, d, p, _, M, m);
  }
  set(t, e, n, r, s, a, o, l, c, h, f, d, p, _, M, m) {
    const u = this.elements;
    return u[0] = t, u[4] = e, u[8] = n, u[12] = r, u[1] = s, u[5] = a, u[9] = o, u[13] = l, u[2] = c, u[6] = h, u[10] = f, u[14] = d, u[3] = p, u[7] = _, u[11] = M, u[15] = m, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new jt().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[3],
      e[6],
      0,
      e[1],
      e[4],
      e[7],
      0,
      e[2],
      e[5],
      e[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(
      t.x,
      e.x,
      n.x,
      0,
      t.y,
      e.y,
      n.y,
      0,
      t.z,
      e.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, r = 1 / En.setFromMatrixColumn(t, 0).length(), s = 1 / En.setFromMatrixColumn(t, 1).length(), a = 1 / En.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * r, e[1] = n[1] * r, e[2] = n[2] * r, e[3] = 0, e[4] = n[4] * s, e[5] = n[5] * s, e[6] = n[6] * s, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z, a = Math.cos(n), o = Math.sin(n), l = Math.cos(r), c = Math.sin(r), h = Math.cos(s), f = Math.sin(s);
    if (t.order === "XYZ") {
      const d = a * h, p = a * f, _ = o * h, M = o * f;
      e[0] = l * h, e[4] = -l * f, e[8] = c, e[1] = p + _ * c, e[5] = d - M * c, e[9] = -o * l, e[2] = M - d * c, e[6] = _ + p * c, e[10] = a * l;
    } else if (t.order === "YXZ") {
      const d = l * h, p = l * f, _ = c * h, M = c * f;
      e[0] = d + M * o, e[4] = _ * o - p, e[8] = a * c, e[1] = a * f, e[5] = a * h, e[9] = -o, e[2] = p * o - _, e[6] = M + d * o, e[10] = a * l;
    } else if (t.order === "ZXY") {
      const d = l * h, p = l * f, _ = c * h, M = c * f;
      e[0] = d - M * o, e[4] = -a * f, e[8] = _ + p * o, e[1] = p + _ * o, e[5] = a * h, e[9] = M - d * o, e[2] = -a * c, e[6] = o, e[10] = a * l;
    } else if (t.order === "ZYX") {
      const d = a * h, p = a * f, _ = o * h, M = o * f;
      e[0] = l * h, e[4] = _ * c - p, e[8] = d * c + M, e[1] = l * f, e[5] = M * c + d, e[9] = p * c - _, e[2] = -c, e[6] = o * l, e[10] = a * l;
    } else if (t.order === "YZX") {
      const d = a * l, p = a * c, _ = o * l, M = o * c;
      e[0] = l * h, e[4] = M - d * f, e[8] = _ * f + p, e[1] = f, e[5] = a * h, e[9] = -o * h, e[2] = -c * h, e[6] = p * f + _, e[10] = d - M * f;
    } else if (t.order === "XZY") {
      const d = a * l, p = a * c, _ = o * l, M = o * c;
      e[0] = l * h, e[4] = -f, e[8] = c * h, e[1] = d * f + M, e[5] = a * h, e[9] = p * f - _, e[2] = _ * f - p, e[6] = o * h, e[10] = M * f + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(Va, t, Ha);
  }
  lookAt(t, e, n) {
    const r = this.elements;
    return ye.subVectors(t, e), ye.lengthSq() === 0 && (ye.z = 1), ye.normalize(), Qe.crossVectors(n, ye), Qe.lengthSq() === 0 && (Math.abs(n.z) === 1 ? ye.x += 1e-4 : ye.z += 1e-4, ye.normalize(), Qe.crossVectors(n, ye)), Qe.normalize(), pi.crossVectors(ye, Qe), r[0] = Qe.x, r[4] = pi.x, r[8] = ye.x, r[1] = Qe.y, r[5] = pi.y, r[9] = ye.y, r[2] = Qe.z, r[6] = pi.z, r[10] = ye.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, r = e.elements, s = this.elements, a = n[0], o = n[4], l = n[8], c = n[12], h = n[1], f = n[5], d = n[9], p = n[13], _ = n[2], M = n[6], m = n[10], u = n[14], A = n[3], y = n[7], g = n[11], N = n[15], R = r[0], C = r[4], P = r[8], E = r[12], x = r[1], w = r[5], G = r[9], O = r[13], V = r[2], Z = r[6], H = r[10], tt = r[14], k = r[3], ot = r[7], pt = r[11], Mt = r[15];
    return s[0] = a * R + o * x + l * V + c * k, s[4] = a * C + o * w + l * Z + c * ot, s[8] = a * P + o * G + l * H + c * pt, s[12] = a * E + o * O + l * tt + c * Mt, s[1] = h * R + f * x + d * V + p * k, s[5] = h * C + f * w + d * Z + p * ot, s[9] = h * P + f * G + d * H + p * pt, s[13] = h * E + f * O + d * tt + p * Mt, s[2] = _ * R + M * x + m * V + u * k, s[6] = _ * C + M * w + m * Z + u * ot, s[10] = _ * P + M * G + m * H + u * pt, s[14] = _ * E + M * O + m * tt + u * Mt, s[3] = A * R + y * x + g * V + N * k, s[7] = A * C + y * w + g * Z + N * ot, s[11] = A * P + y * G + g * H + N * pt, s[15] = A * E + y * O + g * tt + N * Mt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], r = t[8], s = t[12], a = t[1], o = t[5], l = t[9], c = t[13], h = t[2], f = t[6], d = t[10], p = t[14], _ = t[3], M = t[7], m = t[11], u = t[15];
    return _ * (+s * l * f - r * c * f - s * o * d + n * c * d + r * o * p - n * l * p) + M * (+e * l * p - e * c * d + s * a * d - r * a * p + r * c * h - s * l * h) + m * (+e * c * f - e * o * p - s * a * f + n * a * p + s * o * h - n * c * h) + u * (-r * o * h - e * l * f + e * o * d + r * a * f - n * a * d + n * l * h);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const r = this.elements;
    return t.isVector3 ? (r[12] = t.x, r[13] = t.y, r[14] = t.z) : (r[12] = t, r[13] = e, r[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], r = t[2], s = t[3], a = t[4], o = t[5], l = t[6], c = t[7], h = t[8], f = t[9], d = t[10], p = t[11], _ = t[12], M = t[13], m = t[14], u = t[15], A = f * m * c - M * d * c + M * l * p - o * m * p - f * l * u + o * d * u, y = _ * d * c - h * m * c - _ * l * p + a * m * p + h * l * u - a * d * u, g = h * M * c - _ * f * c + _ * o * p - a * M * p - h * o * u + a * f * u, N = _ * f * l - h * M * l - _ * o * d + a * M * d + h * o * m - a * f * m, R = e * A + n * y + r * g + s * N;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const C = 1 / R;
    return t[0] = A * C, t[1] = (M * d * s - f * m * s - M * r * p + n * m * p + f * r * u - n * d * u) * C, t[2] = (o * m * s - M * l * s + M * r * c - n * m * c - o * r * u + n * l * u) * C, t[3] = (f * l * s - o * d * s - f * r * c + n * d * c + o * r * p - n * l * p) * C, t[4] = y * C, t[5] = (h * m * s - _ * d * s + _ * r * p - e * m * p - h * r * u + e * d * u) * C, t[6] = (_ * l * s - a * m * s - _ * r * c + e * m * c + a * r * u - e * l * u) * C, t[7] = (a * d * s - h * l * s + h * r * c - e * d * c - a * r * p + e * l * p) * C, t[8] = g * C, t[9] = (_ * f * s - h * M * s - _ * n * p + e * M * p + h * n * u - e * f * u) * C, t[10] = (a * M * s - _ * o * s + _ * n * c - e * M * c - a * n * u + e * o * u) * C, t[11] = (h * o * s - a * f * s - h * n * c + e * f * c + a * n * p - e * o * p) * C, t[12] = N * C, t[13] = (h * M * r - _ * f * r + _ * n * d - e * M * d - h * n * m + e * f * m) * C, t[14] = (_ * o * r - a * M * r - _ * n * l + e * M * l + a * n * m - e * o * m) * C, t[15] = (a * f * r - h * o * r + h * n * l - e * f * l - a * n * d + e * o * d) * C, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, r = t.y, s = t.z;
    return e[0] *= n, e[4] *= r, e[8] *= s, e[1] *= n, e[5] *= r, e[9] *= s, e[2] *= n, e[6] *= r, e[10] *= s, e[3] *= n, e[7] *= r, e[11] *= s, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], r = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, r));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(
      1,
      0,
      0,
      t.x,
      0,
      1,
      0,
      t.y,
      0,
      0,
      1,
      t.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      t,
      0,
      1,
      0,
      e,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), r = Math.sin(e), s = 1 - n, a = t.x, o = t.y, l = t.z, c = s * a, h = s * o;
    return this.set(
      c * a + n,
      c * o - r * l,
      c * l + r * o,
      0,
      c * o + r * l,
      h * o + n,
      h * l - r * a,
      0,
      c * l - r * o,
      h * l + r * a,
      s * l * l + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e, n) {
    return this.set(
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(t, e, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      t,
      1,
      a,
      0,
      e,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(t, e, n) {
    const r = this.elements, s = e._x, a = e._y, o = e._z, l = e._w, c = s + s, h = a + a, f = o + o, d = s * c, p = s * h, _ = s * f, M = a * h, m = a * f, u = o * f, A = l * c, y = l * h, g = l * f, N = n.x, R = n.y, C = n.z;
    return r[0] = (1 - (M + u)) * N, r[1] = (p + g) * N, r[2] = (_ - y) * N, r[3] = 0, r[4] = (p - g) * R, r[5] = (1 - (d + u)) * R, r[6] = (m + A) * R, r[7] = 0, r[8] = (_ + y) * C, r[9] = (m - A) * C, r[10] = (1 - (d + M)) * C, r[11] = 0, r[12] = t.x, r[13] = t.y, r[14] = t.z, r[15] = 1, this;
  }
  decompose(t, e, n) {
    const r = this.elements;
    let s = En.set(r[0], r[1], r[2]).length();
    const a = En.set(r[4], r[5], r[6]).length(), o = En.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (s = -s), t.x = r[12], t.y = r[13], t.z = r[14], Pe.copy(this);
    const c = 1 / s, h = 1 / a, f = 1 / o;
    return Pe.elements[0] *= c, Pe.elements[1] *= c, Pe.elements[2] *= c, Pe.elements[4] *= h, Pe.elements[5] *= h, Pe.elements[6] *= h, Pe.elements[8] *= f, Pe.elements[9] *= f, Pe.elements[10] *= f, e.setFromRotationMatrix(Pe), n.x = s, n.y = a, n.z = o, this;
  }
  makePerspective(t, e, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 2 * s / (e - t), h = 2 * s / (n - r), f = (e + t) / (e - t), d = (n + r) / (n - r);
    let p, _;
    if (o === 2e3)
      p = -(a + s) / (a - s), _ = -2 * a * s / (a - s);
    else if (o === 2001)
      p = -a / (a - s), _ = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = c, l[4] = 0, l[8] = f, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = p, l[14] = _, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, r, s, a, o = 2e3) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - r), f = 1 / (a - s), d = (e + t) * c, p = (n + r) * h;
    let _, M;
    if (o === 2e3)
      _ = (a + s) * f, M = -2 * f;
    else if (o === 2001)
      _ = s * f, M = -1 * f;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -p, l[2] = 0, l[6] = 0, l[10] = M, l[14] = -_, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let r = 0; r < 16; r++)
      if (e[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const En = /* @__PURE__ */ new L(), Pe = /* @__PURE__ */ new jt(), Va = /* @__PURE__ */ new L(0, 0, 0), Ha = /* @__PURE__ */ new L(1, 1, 1), Qe = /* @__PURE__ */ new L(), pi = /* @__PURE__ */ new L(), ye = /* @__PURE__ */ new L(), Kr = /* @__PURE__ */ new jt(), $r = /* @__PURE__ */ new si();
class Fe {
  constructor(t = 0, e = 0, n = 0, r = Fe.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, r = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const r = t.elements, s = r[0], a = r[4], o = r[8], l = r[1], c = r[5], h = r[9], f = r[2], d = r[6], p = r[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(me(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-me(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-f, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(me(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-f, p), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(l, s));
        break;
      case "ZYX":
        this._y = Math.asin(-me(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._x = Math.atan2(d, p), this._z = Math.atan2(l, s)) : (this._x = 0, this._z = Math.atan2(-a, c));
        break;
      case "YZX":
        this._z = Math.asin(me(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-f, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-me(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return Kr.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Kr, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return $r.setFromEuler(this), this.setFromQuaternion($r, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
Fe.DEFAULT_ORDER = "XYZ";
class Ks {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let ka = 0;
const jr = /* @__PURE__ */ new L(), Tn = /* @__PURE__ */ new si(), We = /* @__PURE__ */ new jt(), mi = /* @__PURE__ */ new L(), Yn = /* @__PURE__ */ new L(), Wa = /* @__PURE__ */ new L(), Xa = /* @__PURE__ */ new si(), Qr = /* @__PURE__ */ new L(1, 0, 0), ts = /* @__PURE__ */ new L(0, 1, 0), es = /* @__PURE__ */ new L(0, 0, 1), ns = { type: "added" }, qa = { type: "removed" }, An = { type: "childadded", child: null }, tr = { type: "childremoved", child: null };
class ue extends Bn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: ka++ }), this.uuid = zn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ue.DEFAULT_UP.clone();
    const t = new L(), e = new Fe(), n = new si(), r = new L(1, 1, 1);
    function s() {
      n.setFromEuler(e, !1);
    }
    function a() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(s), n._onChange(a), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new jt()
      },
      normalMatrix: {
        value: new Bt()
      }
    }), this.matrix = new jt(), this.matrixWorld = new jt(), this.matrixAutoUpdate = ue.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Ks(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return Tn.setFromAxisAngle(t, e), this.quaternion.multiply(Tn), this;
  }
  rotateOnWorldAxis(t, e) {
    return Tn.setFromAxisAngle(t, e), this.quaternion.premultiply(Tn), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Qr, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(ts, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(es, t);
  }
  translateOnAxis(t, e) {
    return jr.copy(t).applyQuaternion(this.quaternion), this.position.add(jr.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Qr, t);
  }
  translateY(t) {
    return this.translateOnAxis(ts, t);
  }
  translateZ(t) {
    return this.translateOnAxis(es, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(We.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? mi.copy(t) : mi.set(t, e, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Yn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? We.lookAt(Yn, mi, this.up) : We.lookAt(mi, Yn, this.up), this.quaternion.setFromRotationMatrix(We), r && (We.extractRotation(r.matrixWorld), Tn.setFromRotationMatrix(We), this.quaternion.premultiply(Tn.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(ns), An.child = t, this.dispatchEvent(An), An.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(qa), tr.child = t, this.dispatchEvent(tr), tr.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), We.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), We.multiply(t.parent.matrixWorld)), t.applyMatrix4(We), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(ns), An.child = t, this.dispatchEvent(An), An.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(t, e);
      if (a !== void 0)
        return a;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Yn, t, Wa), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Yn, Xa, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const e = this.children;
    for (let n = 0, r = e.length; n < r; n++)
      e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((o) => ({
      boxInitialized: o.boxInitialized,
      boxMin: o.box.min.toArray(),
      boxMax: o.box.max.toArray(),
      sphereInitialized: o.sphereInitialized,
      sphereRadius: o.sphere.radius,
      sphereCenter: o.sphere.center.toArray()
    })), r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function s(o, l) {
      return o[l.uuid] === void 0 && (o[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(t.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const l = o.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const f = l[c];
            s(t.shapes, f);
          }
        else
          s(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(t.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          o.push(s(t.materials, this.material[l]));
        r.material = o;
      } else
        r.material = s(t.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const l = this.animations[o];
        r.animations.push(s(t.animations, l));
      }
    }
    if (e) {
      const o = a(t.geometries), l = a(t.materials), c = a(t.textures), h = a(t.images), f = a(t.shapes), d = a(t.skeletons), p = a(t.animations), _ = a(t.nodes);
      o.length > 0 && (n.geometries = o), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), f.length > 0 && (n.shapes = f), d.length > 0 && (n.skeletons = d), p.length > 0 && (n.animations = p), _.length > 0 && (n.nodes = _);
    }
    return n.object = r, n;
    function a(o) {
      const l = [];
      for (const c in o) {
        const h = o[c];
        delete h.metadata, l.push(h);
      }
      return l;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
      for (let n = 0; n < t.children.length; n++) {
        const r = t.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
ue.DEFAULT_UP = /* @__PURE__ */ new L(0, 1, 0);
ue.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Le = /* @__PURE__ */ new L(), Xe = /* @__PURE__ */ new L(), er = /* @__PURE__ */ new L(), qe = /* @__PURE__ */ new L(), bn = /* @__PURE__ */ new L(), Rn = /* @__PURE__ */ new L(), is = /* @__PURE__ */ new L(), nr = /* @__PURE__ */ new L(), ir = /* @__PURE__ */ new L(), rr = /* @__PURE__ */ new L(), sr = /* @__PURE__ */ new ae(), ar = /* @__PURE__ */ new ae(), or = /* @__PURE__ */ new ae();
class Ue {
  constructor(t = new L(), e = new L(), n = new L()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, r) {
    r.subVectors(n, e), Le.subVectors(t, e), r.cross(Le);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(t, e, n, r, s) {
    Le.subVectors(r, e), Xe.subVectors(n, e), er.subVectors(t, e);
    const a = Le.dot(Le), o = Le.dot(Xe), l = Le.dot(er), c = Xe.dot(Xe), h = Xe.dot(er), f = a * c - o * o;
    if (f === 0)
      return s.set(0, 0, 0), null;
    const d = 1 / f, p = (c * l - o * h) * d, _ = (a * h - o * l) * d;
    return s.set(1 - p - _, _, p);
  }
  static containsPoint(t, e, n, r) {
    return this.getBarycoord(t, e, n, r, qe) === null ? !1 : qe.x >= 0 && qe.y >= 0 && qe.x + qe.y <= 1;
  }
  static getInterpolation(t, e, n, r, s, a, o, l) {
    return this.getBarycoord(t, e, n, r, qe) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(s, qe.x), l.addScaledVector(a, qe.y), l.addScaledVector(o, qe.z), l);
  }
  static getInterpolatedAttribute(t, e, n, r, s, a) {
    return sr.setScalar(0), ar.setScalar(0), or.setScalar(0), sr.fromBufferAttribute(t, e), ar.fromBufferAttribute(t, n), or.fromBufferAttribute(t, r), a.setScalar(0), a.addScaledVector(sr, s.x), a.addScaledVector(ar, s.y), a.addScaledVector(or, s.z), a;
  }
  static isFrontFacing(t, e, n, r) {
    return Le.subVectors(n, e), Xe.subVectors(t, e), Le.cross(Xe).dot(r) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, r) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[r]), this;
  }
  setFromAttributeAndIndices(t, e, n, r) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return Le.subVectors(this.c, this.b), Xe.subVectors(this.a, this.b), Le.cross(Xe).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return Ue.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return Ue.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, r, s) {
    return Ue.getInterpolation(t, this.a, this.b, this.c, e, n, r, s);
  }
  containsPoint(t) {
    return Ue.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return Ue.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    bn.subVectors(r, n), Rn.subVectors(s, n), nr.subVectors(t, n);
    const l = bn.dot(nr), c = Rn.dot(nr);
    if (l <= 0 && c <= 0)
      return e.copy(n);
    ir.subVectors(t, r);
    const h = bn.dot(ir), f = Rn.dot(ir);
    if (h >= 0 && f <= h)
      return e.copy(r);
    const d = l * f - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return a = l / (l - h), e.copy(n).addScaledVector(bn, a);
    rr.subVectors(t, s);
    const p = bn.dot(rr), _ = Rn.dot(rr);
    if (_ >= 0 && p <= _)
      return e.copy(s);
    const M = p * c - l * _;
    if (M <= 0 && c >= 0 && _ <= 0)
      return o = c / (c - _), e.copy(n).addScaledVector(Rn, o);
    const m = h * _ - p * f;
    if (m <= 0 && f - h >= 0 && p - _ >= 0)
      return is.subVectors(s, r), o = (f - h) / (f - h + (p - _)), e.copy(r).addScaledVector(is, o);
    const u = 1 / (m + M + d);
    return a = M * u, o = d * u, e.copy(n).addScaledVector(bn, a).addScaledVector(Rn, o);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const $s = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, tn = { h: 0, s: 0, l: 0 }, _i = { h: 0, s: 0, l: 0 };
function lr(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Vt {
  constructor(t, e, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const r = t;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = be) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Xt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, r = Xt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Xt.toWorkingColorSpace(this, r), this;
  }
  setHSL(t, e, n, r = Xt.workingColorSpace) {
    if (t = Pa(t, 1), e = me(e, 0, 1), n = me(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + e) : n + e - n * e, a = 2 * n - s;
      this.r = lr(a, s, t + 1 / 3), this.g = lr(a, s, t), this.b = lr(a, s, t - 1 / 3);
    }
    return Xt.toWorkingColorSpace(this, r), this;
  }
  setStyle(t, e = be) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              e
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              e
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              e
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          e
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0)
      return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = be) {
    const n = $s[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = Ye(t.r), this.g = Ye(t.g), this.b = Ye(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = Nn(t.r), this.g = Nn(t.g), this.b = Nn(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = be) {
    return Xt.fromWorkingColorSpace(pe.copy(this), t), Math.round(me(pe.r * 255, 0, 255)) * 65536 + Math.round(me(pe.g * 255, 0, 255)) * 256 + Math.round(me(pe.b * 255, 0, 255));
  }
  getHexString(t = be) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Xt.workingColorSpace) {
    Xt.fromWorkingColorSpace(pe.copy(this), e);
    const n = pe.r, r = pe.g, s = pe.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let l, c;
    const h = (o + a) / 2;
    if (o === a)
      l = 0, c = 0;
    else {
      const f = a - o;
      switch (c = h <= 0.5 ? f / (a + o) : f / (2 - a - o), a) {
        case n:
          l = (r - s) / f + (r < s ? 6 : 0);
          break;
        case r:
          l = (s - n) / f + 2;
          break;
        case s:
          l = (n - r) / f + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
  }
  getRGB(t, e = Xt.workingColorSpace) {
    return Xt.fromWorkingColorSpace(pe.copy(this), e), t.r = pe.r, t.g = pe.g, t.b = pe.b, t;
  }
  getStyle(t = be) {
    Xt.fromWorkingColorSpace(pe.copy(this), t);
    const e = pe.r, n = pe.g, r = pe.b;
    return t !== be ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(tn), this.setHSL(tn.h + t, tn.s + e, tn.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(tn), t.getHSL(_i);
    const n = Xi(tn.h, _i.h, e), r = Xi(tn.s, _i.s, e), s = Xi(tn.l, _i.l, e);
    return this.setHSL(n, r, s), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, r = this.b, s = t.elements;
    return this.r = s[0] * e + s[3] * n + s[6] * r, this.g = s[1] * e + s[4] * n + s[7] * r, this.b = s[2] * e + s[5] * n + s[8] * r, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const pe = /* @__PURE__ */ new Vt();
Vt.NAMES = $s;
let Ya = 0;
class gn extends Bn {
  static get type() {
    return "Material";
  }
  get type() {
    return this.constructor.type;
  }
  set type(t) {
  }
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ya++ }), this.uuid = zn(), this.name = "", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Vt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const r = this[e];
        if (r === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[e] = n;
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const l = s[o];
        delete l.metadata, a.push(l);
      }
      return a;
    }
    if (e) {
      const s = r(t.textures), a = r(t.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const r = e.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = e[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class js extends gn {
  static get type() {
    return "MeshBasicMaterial";
  }
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.color = new Vt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Fe(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const oe = /* @__PURE__ */ new L(), gi = /* @__PURE__ */ new at();
class Ne {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[t + r] = e.array[n + r];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        gi.fromBufferAttribute(this, e), gi.applyMatrix3(t), this.setXY(e, gi.x, gi.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        oe.fromBufferAttribute(this, e), oe.applyMatrix3(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      oe.fromBufferAttribute(this, e), oe.applyMatrix4(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      oe.fromBufferAttribute(this, e), oe.applyNormalMatrix(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      oe.fromBufferAttribute(this, e), oe.transformDirection(t), this.setXYZ(e, oe.x, oe.y, oe.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = Wn(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = xe(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = Wn(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = xe(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = Wn(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = xe(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = Wn(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = xe(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = Wn(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = xe(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = xe(e, this.array), n = xe(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, r) {
    return t *= this.itemSize, this.normalized && (e = xe(e, this.array), n = xe(n, this.array), r = xe(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this;
  }
  setXYZW(t, e, n, r, s) {
    return t *= this.itemSize, this.normalized && (e = xe(e, this.array), n = xe(n, this.array), r = xe(r, this.array), s = xe(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = r, this.array[t + 3] = s, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== 35044 && (t.usage = this.usage), t;
  }
}
class Qs extends Ne {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class ta extends Ne {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class ie extends Ne {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Za = 0;
const Ae = /* @__PURE__ */ new jt(), cr = /* @__PURE__ */ new ue(), wn = /* @__PURE__ */ new L(), Ee = /* @__PURE__ */ new _n(), Zn = /* @__PURE__ */ new _n(), he = /* @__PURE__ */ new L();
class Me extends Bn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Za++ }), this.uuid = zn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (qs(t) ? ta : Qs)(t, 1) : this.index = t, this;
  }
  setIndirect(t) {
    return this.indirect = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Bt().getNormalMatrix(t);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(t), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return Ae.makeRotationFromQuaternion(t), this.applyMatrix4(Ae), this;
  }
  rotateX(t) {
    return Ae.makeRotationX(t), this.applyMatrix4(Ae), this;
  }
  rotateY(t) {
    return Ae.makeRotationY(t), this.applyMatrix4(Ae), this;
  }
  rotateZ(t) {
    return Ae.makeRotationZ(t), this.applyMatrix4(Ae), this;
  }
  translate(t, e, n) {
    return Ae.makeTranslation(t, e, n), this.applyMatrix4(Ae), this;
  }
  scale(t, e, n) {
    return Ae.makeScale(t, e, n), this.applyMatrix4(Ae), this;
  }
  lookAt(t) {
    return cr.lookAt(t), cr.updateMatrix(), this.applyMatrix4(cr.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(wn).negate(), this.translate(wn.x, wn.y, wn.z), this;
  }
  setFromPoints(t) {
    const e = this.getAttribute("position");
    if (e === void 0) {
      const n = [];
      for (let r = 0, s = t.length; r < s; r++) {
        const a = t[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new ie(n, 3));
    } else {
      for (let n = 0, r = e.count; n < r; n++) {
        const s = t[n];
        e.setXYZ(n, s.x, s.y, s.z || 0);
      }
      t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = !0;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new _n());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new L(-1 / 0, -1 / 0, -1 / 0),
        new L(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, r = e.length; n < r; n++) {
          const s = e[n];
          Ee.setFromBufferAttribute(s), this.morphTargetsRelative ? (he.addVectors(this.boundingBox.min, Ee.min), this.boundingBox.expandByPoint(he), he.addVectors(this.boundingBox.max, Ee.max), this.boundingBox.expandByPoint(he)) : (this.boundingBox.expandByPoint(Ee.min), this.boundingBox.expandByPoint(Ee.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Gn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new L(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Ee.setFromBufferAttribute(t), e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s];
          Zn.setFromBufferAttribute(o), this.morphTargetsRelative ? (he.addVectors(Ee.min, Zn.min), Ee.expandByPoint(he), he.addVectors(Ee.max, Zn.max), Ee.expandByPoint(he)) : (Ee.expandByPoint(Zn.min), Ee.expandByPoint(Zn.max));
        }
      Ee.getCenter(n);
      let r = 0;
      for (let s = 0, a = t.count; s < a; s++)
        he.fromBufferAttribute(t, s), r = Math.max(r, n.distanceToSquared(he));
      if (e)
        for (let s = 0, a = e.length; s < a; s++) {
          const o = e[s], l = this.morphTargetsRelative;
          for (let c = 0, h = o.count; c < h; c++)
            he.fromBufferAttribute(o, c), l && (wn.fromBufferAttribute(t, c), he.add(wn)), r = Math.max(r, n.distanceToSquared(he));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, r = e.normal, s = e.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ne(new Float32Array(4 * n.count), 4));
    const a = this.getAttribute("tangent"), o = [], l = [];
    for (let P = 0; P < n.count; P++)
      o[P] = new L(), l[P] = new L();
    const c = new L(), h = new L(), f = new L(), d = new at(), p = new at(), _ = new at(), M = new L(), m = new L();
    function u(P, E, x) {
      c.fromBufferAttribute(n, P), h.fromBufferAttribute(n, E), f.fromBufferAttribute(n, x), d.fromBufferAttribute(s, P), p.fromBufferAttribute(s, E), _.fromBufferAttribute(s, x), h.sub(c), f.sub(c), p.sub(d), _.sub(d);
      const w = 1 / (p.x * _.y - _.x * p.y);
      isFinite(w) && (M.copy(h).multiplyScalar(_.y).addScaledVector(f, -p.y).multiplyScalar(w), m.copy(f).multiplyScalar(p.x).addScaledVector(h, -_.x).multiplyScalar(w), o[P].add(M), o[E].add(M), o[x].add(M), l[P].add(m), l[E].add(m), l[x].add(m));
    }
    let A = this.groups;
    A.length === 0 && (A = [{
      start: 0,
      count: t.count
    }]);
    for (let P = 0, E = A.length; P < E; ++P) {
      const x = A[P], w = x.start, G = x.count;
      for (let O = w, V = w + G; O < V; O += 3)
        u(
          t.getX(O + 0),
          t.getX(O + 1),
          t.getX(O + 2)
        );
    }
    const y = new L(), g = new L(), N = new L(), R = new L();
    function C(P) {
      N.fromBufferAttribute(r, P), R.copy(N);
      const E = o[P];
      y.copy(E), y.sub(N.multiplyScalar(N.dot(E))).normalize(), g.crossVectors(R, E);
      const w = g.dot(l[P]) < 0 ? -1 : 1;
      a.setXYZW(P, y.x, y.y, y.z, w);
    }
    for (let P = 0, E = A.length; P < E; ++P) {
      const x = A[P], w = x.start, G = x.count;
      for (let O = w, V = w + G; O < V; O += 3)
        C(t.getX(O + 0)), C(t.getX(O + 1)), C(t.getX(O + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Ne(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, p = n.count; d < p; d++)
          n.setXYZ(d, 0, 0, 0);
      const r = new L(), s = new L(), a = new L(), o = new L(), l = new L(), c = new L(), h = new L(), f = new L();
      if (t)
        for (let d = 0, p = t.count; d < p; d += 3) {
          const _ = t.getX(d + 0), M = t.getX(d + 1), m = t.getX(d + 2);
          r.fromBufferAttribute(e, _), s.fromBufferAttribute(e, M), a.fromBufferAttribute(e, m), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), o.fromBufferAttribute(n, _), l.fromBufferAttribute(n, M), c.fromBufferAttribute(n, m), o.add(h), l.add(h), c.add(h), n.setXYZ(_, o.x, o.y, o.z), n.setXYZ(M, l.x, l.y, l.z), n.setXYZ(m, c.x, c.y, c.z);
        }
      else
        for (let d = 0, p = e.count; d < p; d += 3)
          r.fromBufferAttribute(e, d + 0), s.fromBufferAttribute(e, d + 1), a.fromBufferAttribute(e, d + 2), h.subVectors(a, s), f.subVectors(r, s), h.cross(f), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      he.fromBufferAttribute(t, e), he.normalize(), t.setXYZ(e, he.x, he.y, he.z);
  }
  toNonIndexed() {
    function t(o, l) {
      const c = o.array, h = o.itemSize, f = o.normalized, d = new c.constructor(l.length * h);
      let p = 0, _ = 0;
      for (let M = 0, m = l.length; M < m; M++) {
        o.isInterleavedBufferAttribute ? p = l[M] * o.data.stride + o.offset : p = l[M] * h;
        for (let u = 0; u < h; u++)
          d[_++] = c[p++];
      }
      return new Ne(d, h, f);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Me(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const l = r[o], c = t(l, n);
      e.setAttribute(o, c);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const l = [], c = s[o];
      for (let h = 0, f = c.length; h < f; h++) {
        const d = c[h], p = t(d, n);
        l.push(p);
      }
      e.morphAttributes[o] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, l = a.length; o < l; o++) {
      const c = a[o];
      e.addGroup(c.start, c.count, c.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const r = {};
    let s = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let f = 0, d = c.length; f < d; f++) {
        const p = c[f];
        h.push(p.toJSON(t.data));
      }
      h.length > 0 && (r[l] = h, s = !0);
    }
    s && (t.data.morphAttributes = r, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (t.data.boundingSphere = {
      center: o.center.toArray(),
      radius: o.radius
    }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const r = t.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(e));
    }
    const s = t.morphAttributes;
    for (const c in s) {
      const h = [], f = s[c];
      for (let d = 0, p = f.length; d < p; d++)
        h.push(f[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const a = t.groups;
    for (let c = 0, h = a.length; c < h; c++) {
      const f = a[c];
      this.addGroup(f.start, f.count, f.materialIndex);
    }
    const o = t.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const rs = /* @__PURE__ */ new jt(), on = /* @__PURE__ */ new Js(), vi = /* @__PURE__ */ new Gn(), ss = /* @__PURE__ */ new L(), xi = /* @__PURE__ */ new L(), Mi = /* @__PURE__ */ new L(), Si = /* @__PURE__ */ new L(), hr = /* @__PURE__ */ new L(), yi = /* @__PURE__ */ new L(), as = /* @__PURE__ */ new L(), Ei = /* @__PURE__ */ new L();
class Ie extends ue {
  constructor(t = new Me(), e = new js()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    e.fromBufferAttribute(r, t);
    const o = this.morphTargetInfluences;
    if (s && o) {
      yi.set(0, 0, 0);
      for (let l = 0, c = s.length; l < c; l++) {
        const h = o[l], f = s[l];
        h !== 0 && (hr.fromBufferAttribute(f, t), a ? yi.addScaledVector(hr, h) : yi.addScaledVector(hr.sub(e), h));
      }
      e.add(yi);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), vi.copy(n.boundingSphere), vi.applyMatrix4(s), on.copy(t.ray).recast(t.near), !(vi.containsPoint(on.origin) === !1 && (on.intersectSphere(vi, ss) === null || on.origin.distanceToSquared(ss) > (t.far - t.near) ** 2)) && (rs.copy(s).invert(), on.copy(t.ray).applyMatrix4(rs), !(n.boundingBox !== null && on.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, on)));
  }
  _computeIntersections(t, e, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, l = s.attributes.position, c = s.attributes.uv, h = s.attributes.uv1, f = s.attributes.normal, d = s.groups, p = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let _ = 0, M = d.length; _ < M; _++) {
          const m = d[_], u = a[m.materialIndex], A = Math.max(m.start, p.start), y = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let g = A, N = y; g < N; g += 3) {
            const R = o.getX(g), C = o.getX(g + 1), P = o.getX(g + 2);
            r = Ti(this, u, t, n, c, h, f, R, C, P), r && (r.faceIndex = Math.floor(g / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), M = Math.min(o.count, p.start + p.count);
        for (let m = _, u = M; m < u; m += 3) {
          const A = o.getX(m), y = o.getX(m + 1), g = o.getX(m + 2);
          r = Ti(this, a, t, n, c, h, f, A, y, g), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(a))
        for (let _ = 0, M = d.length; _ < M; _++) {
          const m = d[_], u = a[m.materialIndex], A = Math.max(m.start, p.start), y = Math.min(l.count, Math.min(m.start + m.count, p.start + p.count));
          for (let g = A, N = y; g < N; g += 3) {
            const R = g, C = g + 1, P = g + 2;
            r = Ti(this, u, t, n, c, h, f, R, C, P), r && (r.faceIndex = Math.floor(g / 3), r.face.materialIndex = m.materialIndex, e.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), M = Math.min(l.count, p.start + p.count);
        for (let m = _, u = M; m < u; m += 3) {
          const A = m, y = m + 1, g = m + 2;
          r = Ti(this, a, t, n, c, h, f, A, y, g), r && (r.faceIndex = Math.floor(m / 3), e.push(r));
        }
      }
  }
}
function Ja(i, t, e, n, r, s, a, o) {
  let l;
  if (t.side === 1 ? l = n.intersectTriangle(a, s, r, !0, o) : l = n.intersectTriangle(r, s, a, t.side === 0, o), l === null) return null;
  Ei.copy(o), Ei.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(Ei);
  return c < e.near || c > e.far ? null : {
    distance: c,
    point: Ei.clone(),
    object: i
  };
}
function Ti(i, t, e, n, r, s, a, o, l, c) {
  i.getVertexPosition(o, xi), i.getVertexPosition(l, Mi), i.getVertexPosition(c, Si);
  const h = Ja(i, t, e, n, xi, Mi, Si, as);
  if (h) {
    const f = new L();
    Ue.getBarycoord(as, xi, Mi, Si, f), r && (h.uv = Ue.getInterpolatedAttribute(r, o, l, c, f, new at())), s && (h.uv1 = Ue.getInterpolatedAttribute(s, o, l, c, f, new at())), a && (h.normal = Ue.getInterpolatedAttribute(a, o, l, c, f, new L()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a: o,
      b: l,
      c,
      normal: new L(),
      materialIndex: 0
    };
    Ue.getNormal(xi, Mi, Si, d.normal), h.face = d, h.barycoord = f;
  }
  return h;
}
class ai extends Me {
  constructor(t = 1, e = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const l = [], c = [], h = [], f = [];
    let d = 0, p = 0;
    _("z", "y", "x", -1, -1, n, e, t, a, s, 0), _("z", "y", "x", 1, -1, n, e, -t, a, s, 1), _("x", "z", "y", 1, 1, t, n, e, r, a, 2), _("x", "z", "y", 1, -1, t, n, -e, r, a, 3), _("x", "y", "z", 1, -1, t, e, n, r, s, 4), _("x", "y", "z", -1, -1, t, e, -n, r, s, 5), this.setIndex(l), this.setAttribute("position", new ie(c, 3)), this.setAttribute("normal", new ie(h, 3)), this.setAttribute("uv", new ie(f, 2));
    function _(M, m, u, A, y, g, N, R, C, P, E) {
      const x = g / C, w = N / P, G = g / 2, O = N / 2, V = R / 2, Z = C + 1, H = P + 1;
      let tt = 0, k = 0;
      const ot = new L();
      for (let pt = 0; pt < H; pt++) {
        const Mt = pt * w - O;
        for (let Nt = 0; Nt < Z; Nt++) {
          const Yt = Nt * x - G;
          ot[M] = Yt * A, ot[m] = Mt * y, ot[u] = V, c.push(ot.x, ot.y, ot.z), ot[M] = 0, ot[m] = 0, ot[u] = R > 0 ? 1 : -1, h.push(ot.x, ot.y, ot.z), f.push(Nt / C), f.push(1 - pt / P), tt += 1;
        }
      }
      for (let pt = 0; pt < P; pt++)
        for (let Mt = 0; Mt < C; Mt++) {
          const Nt = d + Mt + Z * pt, Yt = d + Mt + Z * (pt + 1), Y = d + (Mt + 1) + Z * (pt + 1), nt = d + (Mt + 1) + Z * pt;
          l.push(Nt, Yt, nt), l.push(Yt, Y, nt), k += 6;
        }
      o.addGroup(p, k, E), p += k, d += tt;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ai(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function Fn(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const r = i[e][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = r.clone() : Array.isArray(r) ? t[e][n] = r.slice() : t[e][n] = r;
    }
  }
  return t;
}
function _e(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = Fn(i[e]);
    for (const r in n)
      t[r] = n[r];
  }
  return t;
}
function Ka(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function ea(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Xt.workingColorSpace;
}
const $a = { clone: Fn, merge: _e };
var ja = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Qa = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class nn extends gn {
  static get type() {
    return "ShaderMaterial";
  }
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = ja, this.fragmentShader = Qa, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = Fn(t.uniforms), this.uniformsGroups = Ka(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? e.uniforms[r] = {
        type: "t",
        value: a.toJSON(t).uuid
      } : a && a.isColor ? e.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? e.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? e.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? e.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? e.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? e.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : e.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class na extends ue {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new jt(), this.projectionMatrix = new jt(), this.projectionMatrixInverse = new jt(), this.coordinateSystem = 2e3;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const en = /* @__PURE__ */ new L(), os = /* @__PURE__ */ new at(), ls = /* @__PURE__ */ new at();
class De extends na {
  constructor(t = 50, e = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = Er * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(Wi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return Er * 2 * Math.atan(
      Math.tan(Wi * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(t, e, n) {
    en.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(en.x, en.y).multiplyScalar(-t / en.z), en.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(en.x, en.y).multiplyScalar(-t / en.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, os, ls), e.subVectors(ls, os);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(t, e, n, r, s, a) {
    this.aspect = t / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(Wi * 0.5 * this.fov) / this.zoom, n = 2 * e, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = a.fullWidth, c = a.fullHeight;
      s += a.offsetX * r / l, e -= a.offsetY * n / c, r *= a.width / l, n *= a.height / c;
    }
    const o = this.filmOffset;
    o !== 0 && (s += t * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Cn = -90, Pn = 1;
class to extends ue {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new De(Cn, Pn, t, e);
    r.layers = this.layers, this.add(r);
    const s = new De(Cn, Pn, t, e);
    s.layers = this.layers, this.add(s);
    const a = new De(Cn, Pn, t, e);
    a.layers = this.layers, this.add(a);
    const o = new De(Cn, Pn, t, e);
    o.layers = this.layers, this.add(o);
    const l = new De(Cn, Pn, t, e);
    l.layers = this.layers, this.add(l);
    const c = new De(Cn, Pn, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, r, s, a, o, l] = e;
    for (const c of e) this.remove(c);
    if (t === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e)
      this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, l, c, h] = this.children, f = t.getRenderTarget(), d = t.getActiveCubeFace(), p = t.getActiveMipmapLevel(), _ = t.xr.enabled;
    t.xr.enabled = !1;
    const M = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, r), t.render(e, s), t.setRenderTarget(n, 1, r), t.render(e, a), t.setRenderTarget(n, 2, r), t.render(e, o), t.setRenderTarget(n, 3, r), t.render(e, l), t.setRenderTarget(n, 4, r), t.render(e, c), n.texture.generateMipmaps = M, t.setRenderTarget(n, 5, r), t.render(e, h), t.setRenderTarget(f, d, p), t.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}
class ia extends ge {
  constructor(t, e, n, r, s, a, o, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : 301, super(t, e, n, r, s, a, o, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class eo extends pn {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new ia(r, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : 1006;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new ai(5, 5, 5), s = new nn({
      name: "CubemapFromEquirect",
      uniforms: Fn(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    s.uniforms.tEquirect.value = e;
    const a = new Ie(r, s), o = e.minFilter;
    return e.minFilter === 1008 && (e.minFilter = 1006), new to(1, 10, this).update(t, a), e.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  clear(t, e, n, r) {
    const s = t.getRenderTarget();
    for (let a = 0; a < 6; a++)
      t.setRenderTarget(this, a), t.clear(e, n, r);
    t.setRenderTarget(s);
  }
}
const ur = /* @__PURE__ */ new L(), no = /* @__PURE__ */ new L(), io = /* @__PURE__ */ new Bt();
class un {
  constructor(t = new L(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, r) {
    return this.normal.set(t, e, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const r = ur.subVectors(n, e).cross(no.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(ur), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const s = -(t.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : e.copy(t.start).addScaledVector(n, s);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || io.getNormalMatrix(t), r = this.coplanarPoint(ur).applyMatrix4(t), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ln = /* @__PURE__ */ new Gn(), Ai = /* @__PURE__ */ new L();
class Cr {
  constructor(t = new un(), e = new un(), n = new un(), r = new un(), s = new un(), a = new un()) {
    this.planes = [t, e, n, r, s, a];
  }
  set(t, e, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(t), o[1].copy(e), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = 2e3) {
    const n = this.planes, r = t.elements, s = r[0], a = r[1], o = r[2], l = r[3], c = r[4], h = r[5], f = r[6], d = r[7], p = r[8], _ = r[9], M = r[10], m = r[11], u = r[12], A = r[13], y = r[14], g = r[15];
    if (n[0].setComponents(l - s, d - c, m - p, g - u).normalize(), n[1].setComponents(l + s, d + c, m + p, g + u).normalize(), n[2].setComponents(l + a, d + h, m + _, g + A).normalize(), n[3].setComponents(l - a, d - h, m - _, g - A).normalize(), n[4].setComponents(l - o, d - f, m - M, g - y).normalize(), e === 2e3)
      n[5].setComponents(l + o, d + f, m + M, g + y).normalize();
    else if (e === 2001)
      n[5].setComponents(o, f, M, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), ln.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), ln.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(ln);
  }
  intersectsSprite(t) {
    return ln.center.set(0, 0, 0), ln.radius = 0.7071067811865476, ln.applyMatrix4(t.matrixWorld), this.intersectsSphere(ln);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, r = -t.radius;
    for (let s = 0; s < 6; s++)
      if (e[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = e[n];
      if (Ai.x = r.normal.x > 0 ? t.max.x : t.min.x, Ai.y = r.normal.y > 0 ? t.max.y : t.min.y, Ai.z = r.normal.z > 0 ? t.max.z : t.min.z, r.distanceToPoint(Ai) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      if (e[n].distanceToPoint(t) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function ra() {
  let i = null, t = !1, e = null, n = null;
  function r(s, a) {
    e(s, a), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      t !== !0 && e !== null && (n = i.requestAnimationFrame(r), t = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(s) {
      e = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function ro(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(o, l) {
    const c = o.array, h = o.usage, f = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), o.onUploadCallback();
    let p;
    if (c instanceof Float32Array)
      p = i.FLOAT;
    else if (c instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      p = i.SHORT;
    else if (c instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      p = i.INT;
    else if (c instanceof Int8Array)
      p = i.BYTE;
    else if (c instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: p,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: o.version,
      size: f
    };
  }
  function n(o, l, c) {
    const h = l.array, f = l.updateRanges;
    if (i.bindBuffer(c, o), f.length === 0)
      i.bufferSubData(c, 0, h);
    else {
      f.sort((p, _) => p.start - _.start);
      let d = 0;
      for (let p = 1; p < f.length; p++) {
        const _ = f[d], M = f[p];
        M.start <= _.start + _.count + 1 ? _.count = Math.max(
          _.count,
          M.start + M.count - _.start
        ) : (++d, f[d] = M);
      }
      f.length = d + 1;
      for (let p = 0, _ = f.length; p < _; p++) {
        const M = f[p];
        i.bufferSubData(
          c,
          M.start * h.BYTES_PER_ELEMENT,
          h,
          M.start,
          M.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), t.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const l = t.get(o);
    l && (i.deleteBuffer(l.buffer), t.delete(o));
  }
  function a(o, l) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = t.get(o);
      (!h || h.version < o.version) && t.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const c = t.get(o);
    if (c === void 0)
      t.set(o, e(o, l));
    else if (c.version < o.version) {
      if (c.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, o, l), c.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
class zi extends Me {
  constructor(t = 1, e = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: r
    };
    const s = t / 2, a = e / 2, o = Math.floor(n), l = Math.floor(r), c = o + 1, h = l + 1, f = t / o, d = e / l, p = [], _ = [], M = [], m = [];
    for (let u = 0; u < h; u++) {
      const A = u * d - a;
      for (let y = 0; y < c; y++) {
        const g = y * f - s;
        _.push(g, -A, 0), M.push(0, 0, 1), m.push(y / o), m.push(1 - u / l);
      }
    }
    for (let u = 0; u < l; u++)
      for (let A = 0; A < o; A++) {
        const y = A + c * u, g = A + c * (u + 1), N = A + 1 + c * (u + 1), R = A + 1 + c * u;
        p.push(y, g, R), p.push(g, N, R);
      }
    this.setIndex(p), this.setAttribute("position", new ie(_, 3)), this.setAttribute("normal", new ie(M, 3)), this.setAttribute("uv", new ie(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new zi(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var so = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, ao = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, oo = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, lo = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, co = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, ho = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, uo = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, fo = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, po = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, mo = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, _o = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, go = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, vo = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, xo = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Mo = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, So = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, yo = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Eo = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, To = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Ao = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, bo = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Ro = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, wo = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, Co = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Po = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Lo = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Do = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Uo = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Io = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, No = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Fo = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Oo = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Bo = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, zo = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Go = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Vo = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Ho = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, ko = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Wo = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Xo = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, qo = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Yo = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Zo = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Jo = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Ko = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, $o = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, jo = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, Qo = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, tl = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, el = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, nl = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, il = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, rl = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, sl = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, al = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, ol = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, ll = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, cl = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, hl = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, ul = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, fl = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, dl = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, pl = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, ml = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, _l = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, gl = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, vl = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, xl = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Ml = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Sl = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, yl = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, El = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Tl = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Al = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, bl = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Rl = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, wl = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Cl = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Pl = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Ll = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Dl = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Ul = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Il = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Nl = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Fl = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Ol = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Bl = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, zl = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Gl = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Vl = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, Hl = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, kl = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Wl = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Xl = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, ql = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Yl = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Zl = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Jl = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Kl = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, $l = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, jl = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, Ql = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, tc = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, ec = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, nc = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, ic = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, rc = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const sc = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, ac = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, oc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, lc = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, cc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, hc = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, uc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, fc = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, dc = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, pc = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, mc = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, _c = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, gc = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, vc = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, xc = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Mc = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Sc = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, yc = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ec = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Tc = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Ac = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, bc = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Rc = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, wc = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Cc = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Pc = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Lc = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Dc = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Uc = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Ic = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Nc = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Fc = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Oc = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Bc = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Gt = {
  alphahash_fragment: so,
  alphahash_pars_fragment: ao,
  alphamap_fragment: oo,
  alphamap_pars_fragment: lo,
  alphatest_fragment: co,
  alphatest_pars_fragment: ho,
  aomap_fragment: uo,
  aomap_pars_fragment: fo,
  batching_pars_vertex: po,
  batching_vertex: mo,
  begin_vertex: _o,
  beginnormal_vertex: go,
  bsdfs: vo,
  iridescence_fragment: xo,
  bumpmap_pars_fragment: Mo,
  clipping_planes_fragment: So,
  clipping_planes_pars_fragment: yo,
  clipping_planes_pars_vertex: Eo,
  clipping_planes_vertex: To,
  color_fragment: Ao,
  color_pars_fragment: bo,
  color_pars_vertex: Ro,
  color_vertex: wo,
  common: Co,
  cube_uv_reflection_fragment: Po,
  defaultnormal_vertex: Lo,
  displacementmap_pars_vertex: Do,
  displacementmap_vertex: Uo,
  emissivemap_fragment: Io,
  emissivemap_pars_fragment: No,
  colorspace_fragment: Fo,
  colorspace_pars_fragment: Oo,
  envmap_fragment: Bo,
  envmap_common_pars_fragment: zo,
  envmap_pars_fragment: Go,
  envmap_pars_vertex: Vo,
  envmap_physical_pars_fragment: jo,
  envmap_vertex: Ho,
  fog_vertex: ko,
  fog_pars_vertex: Wo,
  fog_fragment: Xo,
  fog_pars_fragment: qo,
  gradientmap_pars_fragment: Yo,
  lightmap_pars_fragment: Zo,
  lights_lambert_fragment: Jo,
  lights_lambert_pars_fragment: Ko,
  lights_pars_begin: $o,
  lights_toon_fragment: Qo,
  lights_toon_pars_fragment: tl,
  lights_phong_fragment: el,
  lights_phong_pars_fragment: nl,
  lights_physical_fragment: il,
  lights_physical_pars_fragment: rl,
  lights_fragment_begin: sl,
  lights_fragment_maps: al,
  lights_fragment_end: ol,
  logdepthbuf_fragment: ll,
  logdepthbuf_pars_fragment: cl,
  logdepthbuf_pars_vertex: hl,
  logdepthbuf_vertex: ul,
  map_fragment: fl,
  map_pars_fragment: dl,
  map_particle_fragment: pl,
  map_particle_pars_fragment: ml,
  metalnessmap_fragment: _l,
  metalnessmap_pars_fragment: gl,
  morphinstance_vertex: vl,
  morphcolor_vertex: xl,
  morphnormal_vertex: Ml,
  morphtarget_pars_vertex: Sl,
  morphtarget_vertex: yl,
  normal_fragment_begin: El,
  normal_fragment_maps: Tl,
  normal_pars_fragment: Al,
  normal_pars_vertex: bl,
  normal_vertex: Rl,
  normalmap_pars_fragment: wl,
  clearcoat_normal_fragment_begin: Cl,
  clearcoat_normal_fragment_maps: Pl,
  clearcoat_pars_fragment: Ll,
  iridescence_pars_fragment: Dl,
  opaque_fragment: Ul,
  packing: Il,
  premultiplied_alpha_fragment: Nl,
  project_vertex: Fl,
  dithering_fragment: Ol,
  dithering_pars_fragment: Bl,
  roughnessmap_fragment: zl,
  roughnessmap_pars_fragment: Gl,
  shadowmap_pars_fragment: Vl,
  shadowmap_pars_vertex: Hl,
  shadowmap_vertex: kl,
  shadowmask_pars_fragment: Wl,
  skinbase_vertex: Xl,
  skinning_pars_vertex: ql,
  skinning_vertex: Yl,
  skinnormal_vertex: Zl,
  specularmap_fragment: Jl,
  specularmap_pars_fragment: Kl,
  tonemapping_fragment: $l,
  tonemapping_pars_fragment: jl,
  transmission_fragment: Ql,
  transmission_pars_fragment: tc,
  uv_pars_fragment: ec,
  uv_pars_vertex: nc,
  uv_vertex: ic,
  worldpos_vertex: rc,
  background_vert: sc,
  background_frag: ac,
  backgroundCube_vert: oc,
  backgroundCube_frag: lc,
  cube_vert: cc,
  cube_frag: hc,
  depth_vert: uc,
  depth_frag: fc,
  distanceRGBA_vert: dc,
  distanceRGBA_frag: pc,
  equirect_vert: mc,
  equirect_frag: _c,
  linedashed_vert: gc,
  linedashed_frag: vc,
  meshbasic_vert: xc,
  meshbasic_frag: Mc,
  meshlambert_vert: Sc,
  meshlambert_frag: yc,
  meshmatcap_vert: Ec,
  meshmatcap_frag: Tc,
  meshnormal_vert: Ac,
  meshnormal_frag: bc,
  meshphong_vert: Rc,
  meshphong_frag: wc,
  meshphysical_vert: Cc,
  meshphysical_frag: Pc,
  meshtoon_vert: Lc,
  meshtoon_frag: Dc,
  points_vert: Uc,
  points_frag: Ic,
  shadow_vert: Nc,
  shadow_frag: Fc,
  sprite_vert: Oc,
  sprite_frag: Bc
}, lt = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Vt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Bt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Bt() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Bt() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Bt() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Bt() },
    normalScale: { value: /* @__PURE__ */ new at(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Bt() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Bt() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Vt(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Vt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Bt() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Bt() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Vt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new at(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Bt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Bt() },
    alphaTest: { value: 0 }
  }
}, Be = {
  basic: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.specularmap,
      lt.envmap,
      lt.aomap,
      lt.lightmap,
      lt.fog
    ]),
    vertexShader: Gt.meshbasic_vert,
    fragmentShader: Gt.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.specularmap,
      lt.envmap,
      lt.aomap,
      lt.lightmap,
      lt.emissivemap,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      lt.fog,
      lt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Vt(0) }
      }
    ]),
    vertexShader: Gt.meshlambert_vert,
    fragmentShader: Gt.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.specularmap,
      lt.envmap,
      lt.aomap,
      lt.lightmap,
      lt.emissivemap,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      lt.fog,
      lt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Vt(0) },
        specular: { value: /* @__PURE__ */ new Vt(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Gt.meshphong_vert,
    fragmentShader: Gt.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.envmap,
      lt.aomap,
      lt.lightmap,
      lt.emissivemap,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      lt.roughnessmap,
      lt.metalnessmap,
      lt.fog,
      lt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Vt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Gt.meshphysical_vert,
    fragmentShader: Gt.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.aomap,
      lt.lightmap,
      lt.emissivemap,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      lt.gradientmap,
      lt.fog,
      lt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Vt(0) }
      }
    ]),
    vertexShader: Gt.meshtoon_vert,
    fragmentShader: Gt.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      lt.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Gt.meshmatcap_vert,
    fragmentShader: Gt.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ _e([
      lt.points,
      lt.fog
    ]),
    vertexShader: Gt.points_vert,
    fragmentShader: Gt.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Gt.linedashed_vert,
    fragmentShader: Gt.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.displacementmap
    ]),
    vertexShader: Gt.depth_vert,
    fragmentShader: Gt.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.bumpmap,
      lt.normalmap,
      lt.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Gt.meshnormal_vert,
    fragmentShader: Gt.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ _e([
      lt.sprite,
      lt.fog
    ]),
    vertexShader: Gt.sprite_vert,
    fragmentShader: Gt.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Bt() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Gt.background_vert,
    fragmentShader: Gt.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Bt() }
    },
    vertexShader: Gt.backgroundCube_vert,
    fragmentShader: Gt.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Gt.cube_vert,
    fragmentShader: Gt.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Gt.equirect_vert,
    fragmentShader: Gt.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ _e([
      lt.common,
      lt.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new L() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Gt.distanceRGBA_vert,
    fragmentShader: Gt.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ _e([
      lt.lights,
      lt.fog,
      {
        color: { value: /* @__PURE__ */ new Vt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Gt.shadow_vert,
    fragmentShader: Gt.shadow_frag
  }
};
Be.physical = {
  uniforms: /* @__PURE__ */ _e([
    Be.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Bt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Bt() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new at(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Bt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Bt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Bt() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Vt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Bt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Bt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Bt() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new at() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Bt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Vt(0) },
      specularColor: { value: /* @__PURE__ */ new Vt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Bt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Bt() },
      anisotropyVector: { value: /* @__PURE__ */ new at() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Bt() }
    }
  ]),
  vertexShader: Gt.meshphysical_vert,
  fragmentShader: Gt.meshphysical_frag
};
const bi = { r: 0, b: 0, g: 0 }, cn = /* @__PURE__ */ new Fe(), zc = /* @__PURE__ */ new jt();
function Gc(i, t, e, n, r, s, a) {
  const o = new Vt(0);
  let l = s === !0 ? 0 : 1, c, h, f = null, d = 0, p = null;
  function _(A) {
    let y = A.isScene === !0 ? A.background : null;
    return y && y.isTexture && (y = (A.backgroundBlurriness > 0 ? e : t).get(y)), y;
  }
  function M(A) {
    let y = !1;
    const g = _(A);
    g === null ? u(o, l) : g && g.isColor && (u(g, 1), y = !0);
    const N = i.xr.getEnvironmentBlendMode();
    N === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : N === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (i.autoClear || y) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function m(A, y) {
    const g = _(y);
    g && (g.isCubeTexture || g.mapping === 306) ? (h === void 0 && (h = new Ie(
      new ai(1, 1, 1),
      new nn({
        name: "BackgroundCubeMaterial",
        uniforms: Fn(Be.backgroundCube.uniforms),
        vertexShader: Be.backgroundCube.vertexShader,
        fragmentShader: Be.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(N, R, C) {
      this.matrixWorld.copyPosition(C.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), cn.copy(y.backgroundRotation), cn.x *= -1, cn.y *= -1, cn.z *= -1, g.isCubeTexture && g.isRenderTargetTexture === !1 && (cn.y *= -1, cn.z *= -1), h.material.uniforms.envMap.value = g, h.material.uniforms.flipEnvMap.value = g.isCubeTexture && g.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(zc.makeRotationFromEuler(cn)), h.material.toneMapped = Xt.getTransfer(g.colorSpace) !== $t, (f !== g || d !== g.version || p !== i.toneMapping) && (h.material.needsUpdate = !0, f = g, d = g.version, p = i.toneMapping), h.layers.enableAll(), A.unshift(h, h.geometry, h.material, 0, 0, null)) : g && g.isTexture && (c === void 0 && (c = new Ie(
      new zi(2, 2),
      new nn({
        name: "BackgroundMaterial",
        uniforms: Fn(Be.background.uniforms),
        vertexShader: Be.background.vertexShader,
        fragmentShader: Be.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = g, c.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, c.material.toneMapped = Xt.getTransfer(g.colorSpace) !== $t, g.matrixAutoUpdate === !0 && g.updateMatrix(), c.material.uniforms.uvTransform.value.copy(g.matrix), (f !== g || d !== g.version || p !== i.toneMapping) && (c.material.needsUpdate = !0, f = g, d = g.version, p = i.toneMapping), c.layers.enableAll(), A.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function u(A, y) {
    A.getRGB(bi, ea(i)), n.buffers.color.setClear(bi.r, bi.g, bi.b, y, a);
  }
  return {
    getClearColor: function() {
      return o;
    },
    setClearColor: function(A, y = 1) {
      o.set(A), l = y, u(o, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(A) {
      l = A, u(o, l);
    },
    render: M,
    addToRenderList: m
  };
}
function Vc(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = d(null);
  let s = r, a = !1;
  function o(x, w, G, O, V) {
    let Z = !1;
    const H = f(O, G, w);
    s !== H && (s = H, c(s.object)), Z = p(x, O, G, V), Z && _(x, O, G, V), V !== null && t.update(V, i.ELEMENT_ARRAY_BUFFER), (Z || a) && (a = !1, g(x, w, G, O), V !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(V).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(x) {
    return i.bindVertexArray(x);
  }
  function h(x) {
    return i.deleteVertexArray(x);
  }
  function f(x, w, G) {
    const O = G.wireframe === !0;
    let V = n[x.id];
    V === void 0 && (V = {}, n[x.id] = V);
    let Z = V[w.id];
    Z === void 0 && (Z = {}, V[w.id] = Z);
    let H = Z[O];
    return H === void 0 && (H = d(l()), Z[O] = H), H;
  }
  function d(x) {
    const w = [], G = [], O = [];
    for (let V = 0; V < e; V++)
      w[V] = 0, G[V] = 0, O[V] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: w,
      enabledAttributes: G,
      attributeDivisors: O,
      object: x,
      attributes: {},
      index: null
    };
  }
  function p(x, w, G, O) {
    const V = s.attributes, Z = w.attributes;
    let H = 0;
    const tt = G.getAttributes();
    for (const k in tt)
      if (tt[k].location >= 0) {
        const pt = V[k];
        let Mt = Z[k];
        if (Mt === void 0 && (k === "instanceMatrix" && x.instanceMatrix && (Mt = x.instanceMatrix), k === "instanceColor" && x.instanceColor && (Mt = x.instanceColor)), pt === void 0 || pt.attribute !== Mt || Mt && pt.data !== Mt.data) return !0;
        H++;
      }
    return s.attributesNum !== H || s.index !== O;
  }
  function _(x, w, G, O) {
    const V = {}, Z = w.attributes;
    let H = 0;
    const tt = G.getAttributes();
    for (const k in tt)
      if (tt[k].location >= 0) {
        let pt = Z[k];
        pt === void 0 && (k === "instanceMatrix" && x.instanceMatrix && (pt = x.instanceMatrix), k === "instanceColor" && x.instanceColor && (pt = x.instanceColor));
        const Mt = {};
        Mt.attribute = pt, pt && pt.data && (Mt.data = pt.data), V[k] = Mt, H++;
      }
    s.attributes = V, s.attributesNum = H, s.index = O;
  }
  function M() {
    const x = s.newAttributes;
    for (let w = 0, G = x.length; w < G; w++)
      x[w] = 0;
  }
  function m(x) {
    u(x, 0);
  }
  function u(x, w) {
    const G = s.newAttributes, O = s.enabledAttributes, V = s.attributeDivisors;
    G[x] = 1, O[x] === 0 && (i.enableVertexAttribArray(x), O[x] = 1), V[x] !== w && (i.vertexAttribDivisor(x, w), V[x] = w);
  }
  function A() {
    const x = s.newAttributes, w = s.enabledAttributes;
    for (let G = 0, O = w.length; G < O; G++)
      w[G] !== x[G] && (i.disableVertexAttribArray(G), w[G] = 0);
  }
  function y(x, w, G, O, V, Z, H) {
    H === !0 ? i.vertexAttribIPointer(x, w, G, V, Z) : i.vertexAttribPointer(x, w, G, O, V, Z);
  }
  function g(x, w, G, O) {
    M();
    const V = O.attributes, Z = G.getAttributes(), H = w.defaultAttributeValues;
    for (const tt in Z) {
      const k = Z[tt];
      if (k.location >= 0) {
        let ot = V[tt];
        if (ot === void 0 && (tt === "instanceMatrix" && x.instanceMatrix && (ot = x.instanceMatrix), tt === "instanceColor" && x.instanceColor && (ot = x.instanceColor)), ot !== void 0) {
          const pt = ot.normalized, Mt = ot.itemSize, Nt = t.get(ot);
          if (Nt === void 0) continue;
          const Yt = Nt.buffer, Y = Nt.type, nt = Nt.bytesPerElement, St = Y === i.INT || Y === i.UNSIGNED_INT || ot.gpuType === 1013;
          if (ot.isInterleavedBufferAttribute) {
            const rt = ot.data, wt = rt.stride, Ut = ot.offset;
            if (rt.isInstancedInterleavedBuffer) {
              for (let Lt = 0; Lt < k.locationSize; Lt++)
                u(k.location + Lt, rt.meshPerAttribute);
              x.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = rt.meshPerAttribute * rt.count);
            } else
              for (let Lt = 0; Lt < k.locationSize; Lt++)
                m(k.location + Lt);
            i.bindBuffer(i.ARRAY_BUFFER, Yt);
            for (let Lt = 0; Lt < k.locationSize; Lt++)
              y(
                k.location + Lt,
                Mt / k.locationSize,
                Y,
                pt,
                wt * nt,
                (Ut + Mt / k.locationSize * Lt) * nt,
                St
              );
          } else {
            if (ot.isInstancedBufferAttribute) {
              for (let rt = 0; rt < k.locationSize; rt++)
                u(k.location + rt, ot.meshPerAttribute);
              x.isInstancedMesh !== !0 && O._maxInstanceCount === void 0 && (O._maxInstanceCount = ot.meshPerAttribute * ot.count);
            } else
              for (let rt = 0; rt < k.locationSize; rt++)
                m(k.location + rt);
            i.bindBuffer(i.ARRAY_BUFFER, Yt);
            for (let rt = 0; rt < k.locationSize; rt++)
              y(
                k.location + rt,
                Mt / k.locationSize,
                Y,
                pt,
                Mt * nt,
                Mt / k.locationSize * rt * nt,
                St
              );
          }
        } else if (H !== void 0) {
          const pt = H[tt];
          if (pt !== void 0)
            switch (pt.length) {
              case 2:
                i.vertexAttrib2fv(k.location, pt);
                break;
              case 3:
                i.vertexAttrib3fv(k.location, pt);
                break;
              case 4:
                i.vertexAttrib4fv(k.location, pt);
                break;
              default:
                i.vertexAttrib1fv(k.location, pt);
            }
        }
      }
    }
    A();
  }
  function N() {
    P();
    for (const x in n) {
      const w = n[x];
      for (const G in w) {
        const O = w[G];
        for (const V in O)
          h(O[V].object), delete O[V];
        delete w[G];
      }
      delete n[x];
    }
  }
  function R(x) {
    if (n[x.id] === void 0) return;
    const w = n[x.id];
    for (const G in w) {
      const O = w[G];
      for (const V in O)
        h(O[V].object), delete O[V];
      delete w[G];
    }
    delete n[x.id];
  }
  function C(x) {
    for (const w in n) {
      const G = n[w];
      if (G[x.id] === void 0) continue;
      const O = G[x.id];
      for (const V in O)
        h(O[V].object), delete O[V];
      delete G[x.id];
    }
  }
  function P() {
    E(), a = !0, s !== r && (s = r, c(s.object));
  }
  function E() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: P,
    resetDefaultState: E,
    dispose: N,
    releaseStatesOfGeometry: R,
    releaseStatesOfProgram: C,
    initAttributes: M,
    enableAttribute: m,
    disableUnusedAttributes: A
  };
}
function Hc(i, t, e) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function a(c, h, f) {
    f !== 0 && (i.drawArraysInstanced(n, c, h, f), e.update(h, n, f));
  }
  function o(c, h, f) {
    if (f === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, f);
    let p = 0;
    for (let _ = 0; _ < f; _++)
      p += h[_];
    e.update(p, n, 1);
  }
  function l(c, h, f, d) {
    if (f === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null)
      for (let _ = 0; _ < c.length; _++)
        a(c[_], h[_], d[_]);
    else {
      p.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, f);
      let _ = 0;
      for (let M = 0; M < f; M++)
        _ += h[M] * d[M];
      e.update(_, n, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = l;
}
function kc(i, t, e, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const C = t.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(C) {
    return !(C !== 1023 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(C) {
    const P = C === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(C !== 1009 && n.convert(C) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    C !== 1015 && !P);
  }
  function l(C) {
    if (C === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      C = "mediump";
    }
    return C === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const f = e.logarithmicDepthBuffer === !0, d = e.reverseDepthBuffer === !0 && t.has("EXT_clip_control"), p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), M = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), u = i.getParameter(i.MAX_VERTEX_ATTRIBS), A = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), y = i.getParameter(i.MAX_VARYING_VECTORS), g = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), N = _ > 0, R = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: l,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: c,
    logarithmicDepthBuffer: f,
    reverseDepthBuffer: d,
    maxTextures: p,
    maxVertexTextures: _,
    maxTextureSize: M,
    maxCubemapSize: m,
    maxAttributes: u,
    maxVertexUniforms: A,
    maxVaryings: y,
    maxFragmentUniforms: g,
    vertexTextures: N,
    maxSamples: R
  };
}
function Wc(i) {
  const t = this;
  let e = null, n = 0, r = !1, s = !1;
  const a = new un(), o = new Bt(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(f, d) {
    const p = f.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = d, n = f.length, p;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(f, d) {
    e = h(f, d, 0);
  }, this.setState = function(f, d, p) {
    const _ = f.clippingPlanes, M = f.clipIntersection, m = f.clipShadows, u = i.get(f);
    if (!r || _ === null || _.length === 0 || s && !m)
      s ? h(null) : c();
    else {
      const A = s ? 0 : n, y = A * 4;
      let g = u.clippingState || null;
      l.value = g, g = h(_, d, y, p);
      for (let N = 0; N !== y; ++N)
        g[N] = e[N];
      u.clippingState = g, this.numIntersection = M ? this.numPlanes : 0, this.numPlanes += A;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(f, d, p, _) {
    const M = f !== null ? f.length : 0;
    let m = null;
    if (M !== 0) {
      if (m = l.value, _ !== !0 || m === null) {
        const u = p + M * 4, A = d.matrixWorldInverse;
        o.getNormalMatrix(A), (m === null || m.length < u) && (m = new Float32Array(u));
        for (let y = 0, g = p; y !== M; ++y, g += 4)
          a.copy(f[y]).applyMatrix4(A, o), a.normal.toArray(m, g), m[g + 3] = a.constant;
      }
      l.value = m, l.needsUpdate = !0;
    }
    return t.numPlanes = M, t.numIntersection = 0, m;
  }
}
function Xc(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(a, o) {
    return o === 303 ? a.mapping = 301 : o === 304 && (a.mapping = 302), a;
  }
  function n(a) {
    if (a && a.isTexture) {
      const o = a.mapping;
      if (o === 303 || o === 304)
        if (t.has(a)) {
          const l = t.get(a).texture;
          return e(l, a.mapping);
        } else {
          const l = a.image;
          if (l && l.height > 0) {
            const c = new eo(l.height);
            return c.fromEquirectangularTexture(i, a), t.set(a, c), a.addEventListener("dispose", r), e(c.texture, a.mapping);
          } else
            return null;
        }
    }
    return a;
  }
  function r(a) {
    const o = a.target;
    o.removeEventListener("dispose", r);
    const l = t.get(o);
    l !== void 0 && (t.delete(o), l.dispose());
  }
  function s() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: s
  };
}
class sa extends na {
  constructor(t = -1, e = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - t, a = n + t, o = r + e, l = r - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += c * this.view.offsetX, a = s + c * this.view.width, o -= h * this.view.offsetY, l = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const Un = 4, cs = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], dn = 20, fr = /* @__PURE__ */ new sa(), hs = /* @__PURE__ */ new Vt();
let dr = null, pr = 0, mr = 0, _r = !1;
const fn = (1 + Math.sqrt(5)) / 2, Ln = 1 / fn, us = [
  /* @__PURE__ */ new L(-fn, Ln, 0),
  /* @__PURE__ */ new L(fn, Ln, 0),
  /* @__PURE__ */ new L(-Ln, 0, fn),
  /* @__PURE__ */ new L(Ln, 0, fn),
  /* @__PURE__ */ new L(0, fn, -Ln),
  /* @__PURE__ */ new L(0, fn, Ln),
  /* @__PURE__ */ new L(-1, 1, -1),
  /* @__PURE__ */ new L(1, 1, -1),
  /* @__PURE__ */ new L(-1, 1, 1),
  /* @__PURE__ */ new L(1, 1, 1)
];
class fs {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(t, e = 0, n = 0.1, r = 100) {
    dr = this._renderer.getRenderTarget(), pr = this._renderer.getActiveCubeFace(), mr = this._renderer.getActiveMipmapLevel(), _r = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const s = this._allocateTargets();
    return s.depthBuffer = !0, this._sceneToCubeUV(t, n, r, s), e > 0 && this._blur(s, 0, 0, e), this._applyPMREM(s), this._cleanup(s), s;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = ms(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = ps(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++)
      this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(dr, pr, mr), this._renderer.xr.enabled = _r, t.scissorTest = !1, Ri(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === 301 || t.mapping === 302 ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), dr = this._renderer.getRenderTarget(), pr = this._renderer.getActiveCubeFace(), mr = this._renderer.getActiveMipmapLevel(), _r = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: On,
      depthBuffer: !1
    }, r = ds(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ds(t, e, n);
      const { _lodMax: s } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = qc(s)), this._blurMaterial = Yc(s, t, e);
    }
    return r;
  }
  _compileMaterial(t) {
    const e = new Ie(this._lodPlanes[0], t);
    this._renderer.compile(e, fr);
  }
  _sceneToCubeUV(t, e, n, r) {
    const o = new De(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, f = h.autoClear, d = h.toneMapping;
    h.getClearColor(hs), h.toneMapping = 0, h.autoClear = !1;
    const p = new js({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), _ = new Ie(new ai(), p);
    let M = !1;
    const m = t.background;
    m ? m.isColor && (p.color.copy(m), t.background = null, M = !0) : (p.color.copy(hs), M = !0);
    for (let u = 0; u < 6; u++) {
      const A = u % 3;
      A === 0 ? (o.up.set(0, l[u], 0), o.lookAt(c[u], 0, 0)) : A === 1 ? (o.up.set(0, 0, l[u]), o.lookAt(0, c[u], 0)) : (o.up.set(0, l[u], 0), o.lookAt(0, 0, c[u]));
      const y = this._cubeSize;
      Ri(r, A * y, u > 2 ? y : 0, y, y), h.setRenderTarget(r), M && h.render(_, o), h.render(t, o);
    }
    _.geometry.dispose(), _.material.dispose(), h.toneMapping = d, h.autoClear = f, t.background = m;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, r = t.mapping === 301 || t.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = ms()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = ps());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = new Ie(this._lodPlanes[0], s), o = s.uniforms;
    o.envMap.value = t;
    const l = this._cubeSize;
    Ri(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(a, fr);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const r = this._lodPlanes.length;
    for (let s = 1; s < r; s++) {
      const a = Math.sqrt(this._sigmas[s] * this._sigmas[s] - this._sigmas[s - 1] * this._sigmas[s - 1]), o = us[(r - s - 1) % us.length];
      this._blur(t, s - 1, s, a, o);
    }
    e.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(t, e, n, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      t,
      a,
      e,
      n,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      t,
      n,
      n,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(t, e, n, r, s, a, o) {
    const l = this._renderer, c = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, f = new Ie(this._lodPlanes[r], c), d = c.uniforms, p = this._sizeLods[n] - 1, _ = isFinite(s) ? Math.PI / (2 * p) : 2 * Math.PI / (2 * dn - 1), M = s / _, m = isFinite(s) ? 1 + Math.floor(h * M) : dn;
    m > dn && console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${dn}`);
    const u = [];
    let A = 0;
    for (let C = 0; C < dn; ++C) {
      const P = C / M, E = Math.exp(-P * P / 2);
      u.push(E), C === 0 ? A += E : C < m && (A += 2 * E);
    }
    for (let C = 0; C < u.length; C++)
      u[C] = u[C] / A;
    d.envMap.value = t.texture, d.samples.value = m, d.weights.value = u, d.latitudinal.value = a === "latitudinal", o && (d.poleAxis.value = o);
    const { _lodMax: y } = this;
    d.dTheta.value = _, d.mipInt.value = y - n;
    const g = this._sizeLods[r], N = 3 * g * (r > y - Un ? r - y + Un : 0), R = 4 * (this._cubeSize - g);
    Ri(e, N, R, 3 * g, 2 * g), l.setRenderTarget(e), l.render(f, fr);
  }
}
function qc(i) {
  const t = [], e = [], n = [];
  let r = i;
  const s = i - Un + 1 + cs.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let l = 1 / o;
    a > i - Un ? l = cs[a - i + Un - 1] : a === 0 && (l = 0), n.push(l);
    const c = 1 / (o - 2), h = -c, f = 1 + c, d = [h, h, f, h, f, f, h, h, f, f, h, f], p = 6, _ = 6, M = 3, m = 2, u = 1, A = new Float32Array(M * _ * p), y = new Float32Array(m * _ * p), g = new Float32Array(u * _ * p);
    for (let R = 0; R < p; R++) {
      const C = R % 3 * 2 / 3 - 1, P = R > 2 ? 0 : -1, E = [
        C,
        P,
        0,
        C + 2 / 3,
        P,
        0,
        C + 2 / 3,
        P + 1,
        0,
        C,
        P,
        0,
        C + 2 / 3,
        P + 1,
        0,
        C,
        P + 1,
        0
      ];
      A.set(E, M * _ * R), y.set(d, m * _ * R);
      const x = [R, R, R, R, R, R];
      g.set(x, u * _ * R);
    }
    const N = new Me();
    N.setAttribute("position", new Ne(A, M)), N.setAttribute("uv", new Ne(y, m)), N.setAttribute("faceIndex", new Ne(g, u)), t.push(N), r > Un && r--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function ds(i, t, e) {
  const n = new pn(i, t, e);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Ri(i, t, e, n, r) {
  i.viewport.set(t, e, n, r), i.scissor.set(t, e, n, r);
}
function Yc(i, t, e) {
  const n = new Float32Array(dn), r = new L(0, 1, 0);
  return new nn({
    name: "SphericalGaussianBlur",
    defines: {
      n: dn,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: Pr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ps() {
  return new nn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Pr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ms() {
  return new nn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Pr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Pr() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Zc(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(o) {
    if (o && o.isTexture) {
      const l = o.mapping, c = l === 303 || l === 304, h = l === 301 || l === 302;
      if (c || h) {
        let f = t.get(o);
        const d = f !== void 0 ? f.texture.pmremVersion : 0;
        if (o.isRenderTargetTexture && o.pmremVersion !== d)
          return e === null && (e = new fs(i)), f = c ? e.fromEquirectangular(o, f) : e.fromCubemap(o, f), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), f.texture;
        if (f !== void 0)
          return f.texture;
        {
          const p = o.image;
          return c && p && p.height > 0 || h && p && r(p) ? (e === null && (e = new fs(i)), f = c ? e.fromEquirectangular(o) : e.fromCubemap(o), f.texture.pmremVersion = o.pmremVersion, t.set(o, f), o.addEventListener("dispose", s), f.texture) : null;
        }
      }
    }
    return o;
  }
  function r(o) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      o[h] !== void 0 && l++;
    return l === c;
  }
  function s(o) {
    const l = o.target;
    l.removeEventListener("dispose", s);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function a() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return {
    get: n,
    dispose: a
  };
}
function Jc(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0)
      return t[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return t[n] = r, r;
  }
  return {
    has: function(n) {
      return e(n) !== null;
    },
    init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = e(n);
      return r === null && $n("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Kc(i, t, e, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(f) {
    const d = f.target;
    d.index !== null && t.remove(d.index);
    for (const _ in d.attributes)
      t.remove(d.attributes[_]);
    for (const _ in d.morphAttributes) {
      const M = d.morphAttributes[_];
      for (let m = 0, u = M.length; m < u; m++)
        t.remove(M[m]);
    }
    d.removeEventListener("dispose", a), delete r[d.id];
    const p = s.get(d);
    p && (t.remove(p), s.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function o(f, d) {
    return r[d.id] === !0 || (d.addEventListener("dispose", a), r[d.id] = !0, e.memory.geometries++), d;
  }
  function l(f) {
    const d = f.attributes;
    for (const _ in d)
      t.update(d[_], i.ARRAY_BUFFER);
    const p = f.morphAttributes;
    for (const _ in p) {
      const M = p[_];
      for (let m = 0, u = M.length; m < u; m++)
        t.update(M[m], i.ARRAY_BUFFER);
    }
  }
  function c(f) {
    const d = [], p = f.index, _ = f.attributes.position;
    let M = 0;
    if (p !== null) {
      const A = p.array;
      M = p.version;
      for (let y = 0, g = A.length; y < g; y += 3) {
        const N = A[y + 0], R = A[y + 1], C = A[y + 2];
        d.push(N, R, R, C, C, N);
      }
    } else if (_ !== void 0) {
      const A = _.array;
      M = _.version;
      for (let y = 0, g = A.length / 3 - 1; y < g; y += 3) {
        const N = y + 0, R = y + 1, C = y + 2;
        d.push(N, R, R, C, C, N);
      }
    } else
      return;
    const m = new (qs(d) ? ta : Qs)(d, 1);
    m.version = M;
    const u = s.get(f);
    u && t.remove(u), s.set(f, m);
  }
  function h(f) {
    const d = s.get(f);
    if (d) {
      const p = f.index;
      p !== null && d.version < p.version && c(f);
    } else
      c(f);
    return s.get(f);
  }
  return {
    get: o,
    update: l,
    getWireframeAttribute: h
  };
}
function $c(i, t, e) {
  let n;
  function r(d) {
    n = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function l(d, p) {
    i.drawElements(n, p, s, d * a), e.update(p, n, 1);
  }
  function c(d, p, _) {
    _ !== 0 && (i.drawElementsInstanced(n, p, s, d * a, _), e.update(p, n, _));
  }
  function h(d, p, _) {
    if (_ === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, p, 0, s, d, 0, _);
    let m = 0;
    for (let u = 0; u < _; u++)
      m += p[u];
    e.update(m, n, 1);
  }
  function f(d, p, _, M) {
    if (_ === 0) return;
    const m = t.get("WEBGL_multi_draw");
    if (m === null)
      for (let u = 0; u < d.length; u++)
        c(d[u] / a, p[u], M[u]);
    else {
      m.multiDrawElementsInstancedWEBGL(n, p, 0, s, d, 0, M, 0, _);
      let u = 0;
      for (let A = 0; A < _; A++)
        u += p[A] * M[A];
      e.update(u, n, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = f;
}
function jc(i) {
  const t = {
    geometries: 0,
    textures: 0
  }, e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (e.calls++, a) {
      case i.TRIANGLES:
        e.triangles += o * (s / 3);
        break;
      case i.LINES:
        e.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        e.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        e.lines += o * s;
        break;
      case i.POINTS:
        e.points += o * s;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Qc(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), r = new ae();
  function s(a, o, l) {
    const c = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, f = h !== void 0 ? h.length : 0;
    let d = n.get(o);
    if (d === void 0 || d.count !== f) {
      let E = function() {
        C.dispose(), n.delete(o), o.removeEventListener("dispose", E);
      };
      d !== void 0 && d.texture.dispose();
      const p = o.morphAttributes.position !== void 0, _ = o.morphAttributes.normal !== void 0, M = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], u = o.morphAttributes.normal || [], A = o.morphAttributes.color || [];
      let y = 0;
      p === !0 && (y = 1), _ === !0 && (y = 2), M === !0 && (y = 3);
      let g = o.attributes.position.count * y, N = 1;
      g > t.maxTextureSize && (N = Math.ceil(g / t.maxTextureSize), g = t.maxTextureSize);
      const R = new Float32Array(g * N * 4 * f), C = new Zs(R, g, N, f);
      C.type = 1015, C.needsUpdate = !0;
      const P = y * 4;
      for (let x = 0; x < f; x++) {
        const w = m[x], G = u[x], O = A[x], V = g * N * 4 * x;
        for (let Z = 0; Z < w.count; Z++) {
          const H = Z * P;
          p === !0 && (r.fromBufferAttribute(w, Z), R[V + H + 0] = r.x, R[V + H + 1] = r.y, R[V + H + 2] = r.z, R[V + H + 3] = 0), _ === !0 && (r.fromBufferAttribute(G, Z), R[V + H + 4] = r.x, R[V + H + 5] = r.y, R[V + H + 6] = r.z, R[V + H + 7] = 0), M === !0 && (r.fromBufferAttribute(O, Z), R[V + H + 8] = r.x, R[V + H + 9] = r.y, R[V + H + 10] = r.z, R[V + H + 11] = O.itemSize === 4 ? r.w : 1);
        }
      }
      d = {
        count: f,
        texture: C,
        size: new at(g, N)
      }, n.set(o, d), o.addEventListener("dispose", E);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", a.morphTexture, e);
    else {
      let p = 0;
      for (let M = 0; M < c.length; M++)
        p += c[M];
      const _ = o.morphTargetsRelative ? 1 : 1 - p;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", _), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: s
  };
}
function th(i, t, e, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function s(l) {
    const c = n.render.frame, h = l.geometry, f = t.get(l, h);
    if (r.get(f) !== c && (t.update(f), r.set(f, c)), l.isInstancedMesh && (l.hasEventListener("dispose", o) === !1 && l.addEventListener("dispose", o), r.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), r.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      r.get(d) !== c && (d.update(), r.set(d, c));
    }
    return f;
  }
  function a() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function o(l) {
    const c = l.target;
    c.removeEventListener("dispose", o), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return {
    update: s,
    dispose: a
  };
}
class aa extends ge {
  constructor(t, e, n, r, s, a, o, l, c, h = 1026) {
    if (h !== 1026 && h !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === 1026 && (n = 1014), n === void 0 && h === 1027 && (n = 1020), super(null, r, s, a, o, l, h, n, c), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = o !== void 0 ? o : 1003, this.minFilter = l !== void 0 ? l : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const oa = /* @__PURE__ */ new ge(), _s = /* @__PURE__ */ new aa(1, 1), la = /* @__PURE__ */ new Zs(), ca = /* @__PURE__ */ new za(), ha = /* @__PURE__ */ new ia(), gs = [], vs = [], xs = new Float32Array(16), Ms = new Float32Array(9), Ss = new Float32Array(4);
function Vn(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = t * e;
  let s = gs[r];
  if (s === void 0 && (s = new Float32Array(r), gs[r] = s), t !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== t; ++a)
      o += e, i[a].toArray(s, o);
  }
  return s;
}
function le(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function ce(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function Gi(i, t) {
  let e = vs[t];
  e === void 0 && (e = new Int32Array(t), vs[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function eh(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function nh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (le(e, t)) return;
    i.uniform2fv(this.addr, t), ce(e, t);
  }
}
function ih(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (le(e, t)) return;
    i.uniform3fv(this.addr, t), ce(e, t);
  }
}
function rh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (le(e, t)) return;
    i.uniform4fv(this.addr, t), ce(e, t);
  }
}
function sh(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (le(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), ce(e, t);
  } else {
    if (le(e, n)) return;
    Ss.set(n), i.uniformMatrix2fv(this.addr, !1, Ss), ce(e, n);
  }
}
function ah(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (le(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), ce(e, t);
  } else {
    if (le(e, n)) return;
    Ms.set(n), i.uniformMatrix3fv(this.addr, !1, Ms), ce(e, n);
  }
}
function oh(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (le(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), ce(e, t);
  } else {
    if (le(e, n)) return;
    xs.set(n), i.uniformMatrix4fv(this.addr, !1, xs), ce(e, n);
  }
}
function lh(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function ch(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (le(e, t)) return;
    i.uniform2iv(this.addr, t), ce(e, t);
  }
}
function hh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (le(e, t)) return;
    i.uniform3iv(this.addr, t), ce(e, t);
  }
}
function uh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (le(e, t)) return;
    i.uniform4iv(this.addr, t), ce(e, t);
  }
}
function fh(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function dh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (le(e, t)) return;
    i.uniform2uiv(this.addr, t), ce(e, t);
  }
}
function ph(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (le(e, t)) return;
    i.uniform3uiv(this.addr, t), ce(e, t);
  }
}
function mh(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (le(e, t)) return;
    i.uniform4uiv(this.addr, t), ce(e, t);
  }
}
function _h(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (_s.compareFunction = 515, s = _s) : s = oa, e.setTexture2D(t || s, r);
}
function gh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture3D(t || ca, r);
}
function vh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTextureCube(t || ha, r);
}
function xh(i, t, e) {
  const n = this.cache, r = e.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), e.setTexture2DArray(t || la, r);
}
function Mh(i) {
  switch (i) {
    case 5126:
      return eh;
    // FLOAT
    case 35664:
      return nh;
    // _VEC2
    case 35665:
      return ih;
    // _VEC3
    case 35666:
      return rh;
    // _VEC4
    case 35674:
      return sh;
    // _MAT2
    case 35675:
      return ah;
    // _MAT3
    case 35676:
      return oh;
    // _MAT4
    case 5124:
    case 35670:
      return lh;
    // INT, BOOL
    case 35667:
    case 35671:
      return ch;
    // _VEC2
    case 35668:
    case 35672:
      return hh;
    // _VEC3
    case 35669:
    case 35673:
      return uh;
    // _VEC4
    case 5125:
      return fh;
    // UINT
    case 36294:
      return dh;
    // _VEC2
    case 36295:
      return ph;
    // _VEC3
    case 36296:
      return mh;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return _h;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return gh;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return vh;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return xh;
  }
}
function Sh(i, t) {
  i.uniform1fv(this.addr, t);
}
function yh(i, t) {
  const e = Vn(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function Eh(i, t) {
  const e = Vn(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function Th(i, t) {
  const e = Vn(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Ah(i, t) {
  const e = Vn(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function bh(i, t) {
  const e = Vn(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function Rh(i, t) {
  const e = Vn(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function wh(i, t) {
  i.uniform1iv(this.addr, t);
}
function Ch(i, t) {
  i.uniform2iv(this.addr, t);
}
function Ph(i, t) {
  i.uniform3iv(this.addr, t);
}
function Lh(i, t) {
  i.uniform4iv(this.addr, t);
}
function Dh(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Uh(i, t) {
  i.uniform2uiv(this.addr, t);
}
function Ih(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Nh(i, t) {
  i.uniform4uiv(this.addr, t);
}
function Fh(i, t, e) {
  const n = this.cache, r = t.length, s = Gi(e, r);
  le(n, s) || (i.uniform1iv(this.addr, s), ce(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture2D(t[a] || oa, s[a]);
}
function Oh(i, t, e) {
  const n = this.cache, r = t.length, s = Gi(e, r);
  le(n, s) || (i.uniform1iv(this.addr, s), ce(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture3D(t[a] || ca, s[a]);
}
function Bh(i, t, e) {
  const n = this.cache, r = t.length, s = Gi(e, r);
  le(n, s) || (i.uniform1iv(this.addr, s), ce(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTextureCube(t[a] || ha, s[a]);
}
function zh(i, t, e) {
  const n = this.cache, r = t.length, s = Gi(e, r);
  le(n, s) || (i.uniform1iv(this.addr, s), ce(n, s));
  for (let a = 0; a !== r; ++a)
    e.setTexture2DArray(t[a] || la, s[a]);
}
function Gh(i) {
  switch (i) {
    case 5126:
      return Sh;
    // FLOAT
    case 35664:
      return yh;
    // _VEC2
    case 35665:
      return Eh;
    // _VEC3
    case 35666:
      return Th;
    // _VEC4
    case 35674:
      return Ah;
    // _MAT2
    case 35675:
      return bh;
    // _MAT3
    case 35676:
      return Rh;
    // _MAT4
    case 5124:
    case 35670:
      return wh;
    // INT, BOOL
    case 35667:
    case 35671:
      return Ch;
    // _VEC2
    case 35668:
    case 35672:
      return Ph;
    // _VEC3
    case 35669:
    case 35673:
      return Lh;
    // _VEC4
    case 5125:
      return Dh;
    // UINT
    case 36294:
      return Uh;
    // _VEC2
    case 36295:
      return Ih;
    // _VEC3
    case 36296:
      return Nh;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Fh;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Oh;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Bh;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return zh;
  }
}
class Vh {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = Mh(e.type);
  }
}
class Hh {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = Gh(e.type);
  }
}
class kh {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(t, e[o.id], n);
    }
  }
}
const gr = /(\w+)(\])?(\[|\.)?/g;
function ys(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function Wh(i, t, e) {
  const n = i.name, r = n.length;
  for (gr.lastIndex = 0; ; ) {
    const s = gr.exec(n), a = gr.lastIndex;
    let o = s[1];
    const l = s[2] === "]", c = s[3];
    if (l && (o = o | 0), c === void 0 || c === "[" && a + 2 === r) {
      ys(e, c === void 0 ? new Vh(o, i, t) : new Hh(o, i, t));
      break;
    } else {
      let f = e.map[o];
      f === void 0 && (f = new kh(o), ys(e, f)), e = f;
    }
  }
}
class Fi {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const s = t.getActiveUniform(e, r), a = t.getUniformLocation(e, s.name);
      Wh(s, a, this);
    }
  }
  setValue(t, e, n, r) {
    const s = this.map[e];
    s !== void 0 && s.setValue(t, n, r);
  }
  setOptional(t, e, n) {
    const r = e[n];
    r !== void 0 && this.setValue(t, n, r);
  }
  static upload(t, e, n, r) {
    for (let s = 0, a = e.length; s !== a; ++s) {
      const o = e[s], l = n[o.id];
      l.needsUpdate !== !1 && o.setValue(t, l.value, r);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let r = 0, s = t.length; r !== s; ++r) {
      const a = t[r];
      a.id in e && n.push(a);
    }
    return n;
  }
}
function Es(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const Xh = 37297;
let qh = 0;
function Yh(i, t) {
  const e = i.split(`
`), n = [], r = Math.max(t - 6, 0), s = Math.min(t + 6, e.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === t ? ">" : " "} ${o}: ${e[a]}`);
  }
  return n.join(`
`);
}
const Ts = /* @__PURE__ */ new Bt();
function Zh(i) {
  Xt._getMatrix(Ts, Xt.workingColorSpace, i);
  const t = `mat3( ${Ts.elements.map((e) => e.toFixed(4))} )`;
  switch (Xt.getTransfer(i)) {
    case Bi:
      return [t, "LinearTransferOETF"];
    case $t:
      return [t, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space: ", i), [t, "LinearTransferOETF"];
  }
}
function As(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), r = i.getShaderInfoLog(t).trim();
  if (n && r === "") return "";
  const s = /ERROR: 0:(\d+)/.exec(r);
  if (s) {
    const a = parseInt(s[1]);
    return e.toUpperCase() + `

` + r + `

` + Yh(i.getShaderSource(t), a);
  } else
    return r;
}
function Jh(i, t) {
  const e = Zh(t);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
function Kh(i, t) {
  let e;
  switch (t) {
    case 1:
      e = "Linear";
      break;
    case 2:
      e = "Reinhard";
      break;
    case 3:
      e = "Cineon";
      break;
    case 4:
      e = "ACESFilmic";
      break;
    case 6:
      e = "AgX";
      break;
    case 7:
      e = "Neutral";
      break;
    case 5:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const wi = /* @__PURE__ */ new L();
function $h() {
  Xt.getLuminanceCoefficients(wi);
  const i = wi.x.toFixed(4), t = wi.y.toFixed(4), e = wi.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function jh(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(jn).join(`
`);
}
function Qh(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function tu(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(t, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), e[a] = {
      type: s.type,
      location: i.getAttribLocation(t, a),
      locationSize: o
    };
  }
  return e;
}
function jn(i) {
  return i !== "";
}
function bs(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Rs(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const eu = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Tr(i) {
  return i.replace(eu, iu);
}
const nu = /* @__PURE__ */ new Map();
function iu(i, t) {
  let e = Gt[t];
  if (e === void 0) {
    const n = nu.get(t);
    if (n !== void 0)
      e = Gt[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return Tr(e);
}
const ru = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function ws(i) {
  return i.replace(ru, su);
}
function su(i, t, e, n) {
  let r = "";
  for (let s = parseInt(t); s < parseInt(e); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function Cs(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function au(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === 1 ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === 2 ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === 3 && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function ou(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case 301:
      case 302:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function lu(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case 302:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function cu(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case 0:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function hu(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 112)), texelHeight: n, maxMip: e };
}
function uu(i, t, e, n) {
  const r = i.getContext(), s = e.defines;
  let a = e.vertexShader, o = e.fragmentShader;
  const l = au(e), c = ou(e), h = lu(e), f = cu(e), d = hu(e), p = jh(e), _ = Qh(s), M = r.createProgram();
  let m, u, A = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _
  ].filter(jn).join(`
`), m.length > 0 && (m += `
`), u = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _
  ].filter(jn).join(`
`), u.length > 0 && (u += `
`)) : (m = [
    Cs(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _,
    e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    e.batching ? "#define USE_BATCHING" : "",
    e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    e.instancing ? "#define USE_INSTANCING" : "",
    e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.map ? "#define USE_MAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + h : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    e.mapUv ? "#define MAP_UV " + e.mapUv : "",
    e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
    e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
    e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
    e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
    e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
    e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
    e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
    e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
    e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
    e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
    e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
    e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
    e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
    e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
    e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
    e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
    e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
    e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
    e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
    e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
    e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
    e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
    //
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.skinning ? "#define USE_SKINNING" : "",
    e.morphTargets ? "#define USE_MORPHTARGETS" : "",
    e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    e.morphColors ? "#define USE_MORPHCOLORS" : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(jn).join(`
`), u = [
    Cs(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    _,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + c : "",
    e.envMap ? "#define " + h : "",
    e.envMap ? "#define " + f : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoat ? "#define USE_CLEARCOAT" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.dispersion ? "#define USE_DISPERSION" : "",
    e.iridescence ? "#define USE_IRIDESCENCE" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaTest ? "#define USE_ALPHATEST" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.sheen ? "#define USE_SHEEN" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.gradientMap ? "#define USE_GRADIENTMAP" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + l : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    e.toneMapping !== 0 ? Gt.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== 0 ? Kh("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Gt.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Jh("linearToOutputTexel", e.outputColorSpace),
    $h(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(jn).join(`
`)), a = Tr(a), a = bs(a, e), a = Rs(a, e), o = Tr(o), o = bs(o, e), o = Rs(o, e), a = ws(a), o = ws(o), e.isRawShaderMaterial !== !0 && (A = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, u = [
    "#define varying in",
    e.glslVersion === Hr ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === Hr ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + u);
  const y = A + m + a, g = A + u + o, N = Es(r, r.VERTEX_SHADER, y), R = Es(r, r.FRAGMENT_SHADER, g);
  r.attachShader(M, N), r.attachShader(M, R), e.index0AttributeName !== void 0 ? r.bindAttribLocation(M, 0, e.index0AttributeName) : e.morphTargets === !0 && r.bindAttribLocation(M, 0, "position"), r.linkProgram(M);
  function C(w) {
    if (i.debug.checkShaderErrors) {
      const G = r.getProgramInfoLog(M).trim(), O = r.getShaderInfoLog(N).trim(), V = r.getShaderInfoLog(R).trim();
      let Z = !0, H = !0;
      if (r.getProgramParameter(M, r.LINK_STATUS) === !1)
        if (Z = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, M, N, R);
        else {
          const tt = As(r, N, "vertex"), k = As(r, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(M, r.VALIDATE_STATUS) + `

Material Name: ` + w.name + `
Material Type: ` + w.type + `

Program Info Log: ` + G + `
` + tt + `
` + k
          );
        }
      else G !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", G) : (O === "" || V === "") && (H = !1);
      H && (w.diagnostics = {
        runnable: Z,
        programLog: G,
        vertexShader: {
          log: O,
          prefix: m
        },
        fragmentShader: {
          log: V,
          prefix: u
        }
      });
    }
    r.deleteShader(N), r.deleteShader(R), P = new Fi(r, M), E = tu(r, M);
  }
  let P;
  this.getUniforms = function() {
    return P === void 0 && C(this), P;
  };
  let E;
  this.getAttributes = function() {
    return E === void 0 && C(this), E;
  };
  let x = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return x === !1 && (x = r.getProgramParameter(M, Xh)), x;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(M), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = qh++, this.cacheKey = t, this.usedTimes = 1, this.program = M, this.vertexShader = N, this.fragmentShader = R, this;
}
let fu = 0;
class du {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, r = this._getShaderStage(e), s = this._getShaderStage(n), a = this._getShaderCacheForMaterial(t);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new pu(t), e.set(t, n)), n;
  }
}
class pu {
  constructor(t) {
    this.id = fu++, this.code = t, this.usedTimes = 0;
  }
}
function mu(i, t, e, n, r, s, a) {
  const o = new Ks(), l = new du(), c = /* @__PURE__ */ new Set(), h = [], f = r.logarithmicDepthBuffer, d = r.vertexTextures;
  let p = r.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function M(E) {
    return c.add(E), E === 0 ? "uv" : `uv${E}`;
  }
  function m(E, x, w, G, O) {
    const V = G.fog, Z = O.geometry, H = E.isMeshStandardMaterial ? G.environment : null, tt = (E.isMeshStandardMaterial ? e : t).get(E.envMap || H), k = tt && tt.mapping === 306 ? tt.image.height : null, ot = _[E.type];
    E.precision !== null && (p = r.getMaxPrecision(E.precision), p !== E.precision && console.warn("THREE.WebGLProgram.getParameters:", E.precision, "not supported, using", p, "instead."));
    const pt = Z.morphAttributes.position || Z.morphAttributes.normal || Z.morphAttributes.color, Mt = pt !== void 0 ? pt.length : 0;
    let Nt = 0;
    Z.morphAttributes.position !== void 0 && (Nt = 1), Z.morphAttributes.normal !== void 0 && (Nt = 2), Z.morphAttributes.color !== void 0 && (Nt = 3);
    let Yt, Y, nt, St;
    if (ot) {
      const Kt = Be[ot];
      Yt = Kt.vertexShader, Y = Kt.fragmentShader;
    } else
      Yt = E.vertexShader, Y = E.fragmentShader, l.update(E), nt = l.getVertexShaderID(E), St = l.getFragmentShaderID(E);
    const rt = i.getRenderTarget(), wt = i.state.buffers.depth.getReversed(), Ut = O.isInstancedMesh === !0, Lt = O.isBatchedMesh === !0, Wt = !!E.map, K = !!E.matcap, et = !!tt, b = !!E.aoMap, bt = !!E.lightMap, j = !!E.bumpMap, gt = !!E.normalMap, st = !!E.displacementMap, Ct = !!E.emissiveMap, mt = !!E.metalnessMap, T = !!E.roughnessMap, v = E.anisotropy > 0, F = E.clearcoat > 0, X = E.dispersion > 0, $ = E.iridescence > 0, q = E.sheen > 0, yt = E.transmission > 0, ct = v && !!E.anisotropyMap, _t = F && !!E.clearcoatMap, Ht = F && !!E.clearcoatNormalMap, Q = F && !!E.clearcoatRoughnessMap, vt = $ && !!E.iridescenceMap, Pt = $ && !!E.iridescenceThicknessMap, Dt = q && !!E.sheenColorMap, xt = q && !!E.sheenRoughnessMap, kt = !!E.specularMap, zt = !!E.specularColorMap, Qt = !!E.specularIntensityMap, D = yt && !!E.transmissionMap, ht = yt && !!E.thicknessMap, W = !!E.gradientMap, J = !!E.alphaMap, dt = E.alphaTest > 0, ut = !!E.alphaHash, Ft = !!E.extensions;
    let se = 0;
    E.toneMapped && (rt === null || rt.isXRRenderTarget === !0) && (se = i.toneMapping);
    const fe = {
      shaderID: ot,
      shaderType: E.type,
      shaderName: E.name,
      vertexShader: Yt,
      fragmentShader: Y,
      defines: E.defines,
      customVertexShaderID: nt,
      customFragmentShaderID: St,
      isRawShaderMaterial: E.isRawShaderMaterial === !0,
      glslVersion: E.glslVersion,
      precision: p,
      batching: Lt,
      batchingColor: Lt && O._colorsTexture !== null,
      instancing: Ut,
      instancingColor: Ut && O.instanceColor !== null,
      instancingMorph: Ut && O.morphTexture !== null,
      supportsVertexTextures: d,
      outputColorSpace: rt === null ? i.outputColorSpace : rt.isXRRenderTarget === !0 ? rt.texture.colorSpace : On,
      alphaToCoverage: !!E.alphaToCoverage,
      map: Wt,
      matcap: K,
      envMap: et,
      envMapMode: et && tt.mapping,
      envMapCubeUVHeight: k,
      aoMap: b,
      lightMap: bt,
      bumpMap: j,
      normalMap: gt,
      displacementMap: d && st,
      emissiveMap: Ct,
      normalMapObjectSpace: gt && E.normalMapType === 1,
      normalMapTangentSpace: gt && E.normalMapType === 0,
      metalnessMap: mt,
      roughnessMap: T,
      anisotropy: v,
      anisotropyMap: ct,
      clearcoat: F,
      clearcoatMap: _t,
      clearcoatNormalMap: Ht,
      clearcoatRoughnessMap: Q,
      dispersion: X,
      iridescence: $,
      iridescenceMap: vt,
      iridescenceThicknessMap: Pt,
      sheen: q,
      sheenColorMap: Dt,
      sheenRoughnessMap: xt,
      specularMap: kt,
      specularColorMap: zt,
      specularIntensityMap: Qt,
      transmission: yt,
      transmissionMap: D,
      thicknessMap: ht,
      gradientMap: W,
      opaque: E.transparent === !1 && E.blending === 1 && E.alphaToCoverage === !1,
      alphaMap: J,
      alphaTest: dt,
      alphaHash: ut,
      combine: E.combine,
      //
      mapUv: Wt && M(E.map.channel),
      aoMapUv: b && M(E.aoMap.channel),
      lightMapUv: bt && M(E.lightMap.channel),
      bumpMapUv: j && M(E.bumpMap.channel),
      normalMapUv: gt && M(E.normalMap.channel),
      displacementMapUv: st && M(E.displacementMap.channel),
      emissiveMapUv: Ct && M(E.emissiveMap.channel),
      metalnessMapUv: mt && M(E.metalnessMap.channel),
      roughnessMapUv: T && M(E.roughnessMap.channel),
      anisotropyMapUv: ct && M(E.anisotropyMap.channel),
      clearcoatMapUv: _t && M(E.clearcoatMap.channel),
      clearcoatNormalMapUv: Ht && M(E.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Q && M(E.clearcoatRoughnessMap.channel),
      iridescenceMapUv: vt && M(E.iridescenceMap.channel),
      iridescenceThicknessMapUv: Pt && M(E.iridescenceThicknessMap.channel),
      sheenColorMapUv: Dt && M(E.sheenColorMap.channel),
      sheenRoughnessMapUv: xt && M(E.sheenRoughnessMap.channel),
      specularMapUv: kt && M(E.specularMap.channel),
      specularColorMapUv: zt && M(E.specularColorMap.channel),
      specularIntensityMapUv: Qt && M(E.specularIntensityMap.channel),
      transmissionMapUv: D && M(E.transmissionMap.channel),
      thicknessMapUv: ht && M(E.thicknessMap.channel),
      alphaMapUv: J && M(E.alphaMap.channel),
      //
      vertexTangents: !!Z.attributes.tangent && (gt || v),
      vertexColors: E.vertexColors,
      vertexAlphas: E.vertexColors === !0 && !!Z.attributes.color && Z.attributes.color.itemSize === 4,
      pointsUvs: O.isPoints === !0 && !!Z.attributes.uv && (Wt || J),
      fog: !!V,
      useFog: E.fog === !0,
      fogExp2: !!V && V.isFogExp2,
      flatShading: E.flatShading === !0,
      sizeAttenuation: E.sizeAttenuation === !0,
      logarithmicDepthBuffer: f,
      reverseDepthBuffer: wt,
      skinning: O.isSkinnedMesh === !0,
      morphTargets: Z.morphAttributes.position !== void 0,
      morphNormals: Z.morphAttributes.normal !== void 0,
      morphColors: Z.morphAttributes.color !== void 0,
      morphTargetsCount: Mt,
      morphTextureStride: Nt,
      numDirLights: x.directional.length,
      numPointLights: x.point.length,
      numSpotLights: x.spot.length,
      numSpotLightMaps: x.spotLightMap.length,
      numRectAreaLights: x.rectArea.length,
      numHemiLights: x.hemi.length,
      numDirLightShadows: x.directionalShadowMap.length,
      numPointLightShadows: x.pointShadowMap.length,
      numSpotLightShadows: x.spotShadowMap.length,
      numSpotLightShadowsWithMaps: x.numSpotLightShadowsWithMaps,
      numLightProbes: x.numLightProbes,
      numClippingPlanes: a.numPlanes,
      numClipIntersection: a.numIntersection,
      dithering: E.dithering,
      shadowMapEnabled: i.shadowMap.enabled && w.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: se,
      decodeVideoTexture: Wt && E.map.isVideoTexture === !0 && Xt.getTransfer(E.map.colorSpace) === $t,
      decodeVideoTextureEmissive: Ct && E.emissiveMap.isVideoTexture === !0 && Xt.getTransfer(E.emissiveMap.colorSpace) === $t,
      premultipliedAlpha: E.premultipliedAlpha,
      doubleSided: E.side === 2,
      flipSided: E.side === 1,
      useDepthPacking: E.depthPacking >= 0,
      depthPacking: E.depthPacking || 0,
      index0AttributeName: E.index0AttributeName,
      extensionClipCullDistance: Ft && E.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Ft && E.extensions.multiDraw === !0 || Lt) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: E.customProgramCacheKey()
    };
    return fe.vertexUv1s = c.has(1), fe.vertexUv2s = c.has(2), fe.vertexUv3s = c.has(3), c.clear(), fe;
  }
  function u(E) {
    const x = [];
    if (E.shaderID ? x.push(E.shaderID) : (x.push(E.customVertexShaderID), x.push(E.customFragmentShaderID)), E.defines !== void 0)
      for (const w in E.defines)
        x.push(w), x.push(E.defines[w]);
    return E.isRawShaderMaterial === !1 && (A(x, E), y(x, E), x.push(i.outputColorSpace)), x.push(E.customProgramCacheKey), x.join();
  }
  function A(E, x) {
    E.push(x.precision), E.push(x.outputColorSpace), E.push(x.envMapMode), E.push(x.envMapCubeUVHeight), E.push(x.mapUv), E.push(x.alphaMapUv), E.push(x.lightMapUv), E.push(x.aoMapUv), E.push(x.bumpMapUv), E.push(x.normalMapUv), E.push(x.displacementMapUv), E.push(x.emissiveMapUv), E.push(x.metalnessMapUv), E.push(x.roughnessMapUv), E.push(x.anisotropyMapUv), E.push(x.clearcoatMapUv), E.push(x.clearcoatNormalMapUv), E.push(x.clearcoatRoughnessMapUv), E.push(x.iridescenceMapUv), E.push(x.iridescenceThicknessMapUv), E.push(x.sheenColorMapUv), E.push(x.sheenRoughnessMapUv), E.push(x.specularMapUv), E.push(x.specularColorMapUv), E.push(x.specularIntensityMapUv), E.push(x.transmissionMapUv), E.push(x.thicknessMapUv), E.push(x.combine), E.push(x.fogExp2), E.push(x.sizeAttenuation), E.push(x.morphTargetsCount), E.push(x.morphAttributeCount), E.push(x.numDirLights), E.push(x.numPointLights), E.push(x.numSpotLights), E.push(x.numSpotLightMaps), E.push(x.numHemiLights), E.push(x.numRectAreaLights), E.push(x.numDirLightShadows), E.push(x.numPointLightShadows), E.push(x.numSpotLightShadows), E.push(x.numSpotLightShadowsWithMaps), E.push(x.numLightProbes), E.push(x.shadowMapType), E.push(x.toneMapping), E.push(x.numClippingPlanes), E.push(x.numClipIntersection), E.push(x.depthPacking);
  }
  function y(E, x) {
    o.disableAll(), x.supportsVertexTextures && o.enable(0), x.instancing && o.enable(1), x.instancingColor && o.enable(2), x.instancingMorph && o.enable(3), x.matcap && o.enable(4), x.envMap && o.enable(5), x.normalMapObjectSpace && o.enable(6), x.normalMapTangentSpace && o.enable(7), x.clearcoat && o.enable(8), x.iridescence && o.enable(9), x.alphaTest && o.enable(10), x.vertexColors && o.enable(11), x.vertexAlphas && o.enable(12), x.vertexUv1s && o.enable(13), x.vertexUv2s && o.enable(14), x.vertexUv3s && o.enable(15), x.vertexTangents && o.enable(16), x.anisotropy && o.enable(17), x.alphaHash && o.enable(18), x.batching && o.enable(19), x.dispersion && o.enable(20), x.batchingColor && o.enable(21), E.push(o.mask), o.disableAll(), x.fog && o.enable(0), x.useFog && o.enable(1), x.flatShading && o.enable(2), x.logarithmicDepthBuffer && o.enable(3), x.reverseDepthBuffer && o.enable(4), x.skinning && o.enable(5), x.morphTargets && o.enable(6), x.morphNormals && o.enable(7), x.morphColors && o.enable(8), x.premultipliedAlpha && o.enable(9), x.shadowMapEnabled && o.enable(10), x.doubleSided && o.enable(11), x.flipSided && o.enable(12), x.useDepthPacking && o.enable(13), x.dithering && o.enable(14), x.transmission && o.enable(15), x.sheen && o.enable(16), x.opaque && o.enable(17), x.pointsUvs && o.enable(18), x.decodeVideoTexture && o.enable(19), x.decodeVideoTextureEmissive && o.enable(20), x.alphaToCoverage && o.enable(21), E.push(o.mask);
  }
  function g(E) {
    const x = _[E.type];
    let w;
    if (x) {
      const G = Be[x];
      w = $a.clone(G.uniforms);
    } else
      w = E.uniforms;
    return w;
  }
  function N(E, x) {
    let w;
    for (let G = 0, O = h.length; G < O; G++) {
      const V = h[G];
      if (V.cacheKey === x) {
        w = V, ++w.usedTimes;
        break;
      }
    }
    return w === void 0 && (w = new uu(i, x, E, s), h.push(w)), w;
  }
  function R(E) {
    if (--E.usedTimes === 0) {
      const x = h.indexOf(E);
      h[x] = h[h.length - 1], h.pop(), E.destroy();
    }
  }
  function C(E) {
    l.remove(E);
  }
  function P() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: u,
    getUniforms: g,
    acquireProgram: N,
    releaseProgram: R,
    releaseShaderCache: C,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: P
  };
}
function _u() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(a) {
    return i.has(a);
  }
  function e(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, l) {
    i.get(a)[o] = l;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: e,
    remove: n,
    update: r,
    dispose: s
  };
}
function gu(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Ps(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function Ls() {
  const i = [];
  let t = 0;
  const e = [], n = [], r = [];
  function s() {
    t = 0, e.length = 0, n.length = 0, r.length = 0;
  }
  function a(f, d, p, _, M, m) {
    let u = i[t];
    return u === void 0 ? (u = {
      id: f.id,
      object: f,
      geometry: d,
      material: p,
      groupOrder: _,
      renderOrder: f.renderOrder,
      z: M,
      group: m
    }, i[t] = u) : (u.id = f.id, u.object = f, u.geometry = d, u.material = p, u.groupOrder = _, u.renderOrder = f.renderOrder, u.z = M, u.group = m), t++, u;
  }
  function o(f, d, p, _, M, m) {
    const u = a(f, d, p, _, M, m);
    p.transmission > 0 ? n.push(u) : p.transparent === !0 ? r.push(u) : e.push(u);
  }
  function l(f, d, p, _, M, m) {
    const u = a(f, d, p, _, M, m);
    p.transmission > 0 ? n.unshift(u) : p.transparent === !0 ? r.unshift(u) : e.unshift(u);
  }
  function c(f, d) {
    e.length > 1 && e.sort(f || gu), n.length > 1 && n.sort(d || Ps), r.length > 1 && r.sort(d || Ps);
  }
  function h() {
    for (let f = t, d = i.length; f < d; f++) {
      const p = i[f];
      if (p.id === null) break;
      p.id = null, p.object = null, p.geometry = null, p.material = null, p.group = null;
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: r,
    init: s,
    push: o,
    unshift: l,
    finish: h,
    sort: c
  };
}
function vu() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new Ls(), i.set(n, [a])) : r >= s.length ? (a = new Ls(), s.push(a)) : a = s[r], a;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function xu() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new L(),
            color: new Vt()
          };
          break;
        case "SpotLight":
          e = {
            position: new L(),
            direction: new L(),
            color: new Vt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new L(),
            color: new Vt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new L(),
            skyColor: new Vt(),
            groundColor: new Vt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Vt(),
            position: new L(),
            halfWidth: new L(),
            halfHeight: new L()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function Mu() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new at(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let Su = 0;
function yu(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Eu(i) {
  const t = new xu(), e = Mu(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let c = 0; c < 9; c++) n.probe.push(new L());
  const r = new L(), s = new jt(), a = new jt();
  function o(c) {
    let h = 0, f = 0, d = 0;
    for (let E = 0; E < 9; E++) n.probe[E].set(0, 0, 0);
    let p = 0, _ = 0, M = 0, m = 0, u = 0, A = 0, y = 0, g = 0, N = 0, R = 0, C = 0;
    c.sort(yu);
    for (let E = 0, x = c.length; E < x; E++) {
      const w = c[E], G = w.color, O = w.intensity, V = w.distance, Z = w.shadow && w.shadow.map ? w.shadow.map.texture : null;
      if (w.isAmbientLight)
        h += G.r * O, f += G.g * O, d += G.b * O;
      else if (w.isLightProbe) {
        for (let H = 0; H < 9; H++)
          n.probe[H].addScaledVector(w.sh.coefficients[H], O);
        C++;
      } else if (w.isDirectionalLight) {
        const H = t.get(w);
        if (H.color.copy(w.color).multiplyScalar(w.intensity), w.castShadow) {
          const tt = w.shadow, k = e.get(w);
          k.shadowIntensity = tt.intensity, k.shadowBias = tt.bias, k.shadowNormalBias = tt.normalBias, k.shadowRadius = tt.radius, k.shadowMapSize = tt.mapSize, n.directionalShadow[p] = k, n.directionalShadowMap[p] = Z, n.directionalShadowMatrix[p] = w.shadow.matrix, A++;
        }
        n.directional[p] = H, p++;
      } else if (w.isSpotLight) {
        const H = t.get(w);
        H.position.setFromMatrixPosition(w.matrixWorld), H.color.copy(G).multiplyScalar(O), H.distance = V, H.coneCos = Math.cos(w.angle), H.penumbraCos = Math.cos(w.angle * (1 - w.penumbra)), H.decay = w.decay, n.spot[M] = H;
        const tt = w.shadow;
        if (w.map && (n.spotLightMap[N] = w.map, N++, tt.updateMatrices(w), w.castShadow && R++), n.spotLightMatrix[M] = tt.matrix, w.castShadow) {
          const k = e.get(w);
          k.shadowIntensity = tt.intensity, k.shadowBias = tt.bias, k.shadowNormalBias = tt.normalBias, k.shadowRadius = tt.radius, k.shadowMapSize = tt.mapSize, n.spotShadow[M] = k, n.spotShadowMap[M] = Z, g++;
        }
        M++;
      } else if (w.isRectAreaLight) {
        const H = t.get(w);
        H.color.copy(G).multiplyScalar(O), H.halfWidth.set(w.width * 0.5, 0, 0), H.halfHeight.set(0, w.height * 0.5, 0), n.rectArea[m] = H, m++;
      } else if (w.isPointLight) {
        const H = t.get(w);
        if (H.color.copy(w.color).multiplyScalar(w.intensity), H.distance = w.distance, H.decay = w.decay, w.castShadow) {
          const tt = w.shadow, k = e.get(w);
          k.shadowIntensity = tt.intensity, k.shadowBias = tt.bias, k.shadowNormalBias = tt.normalBias, k.shadowRadius = tt.radius, k.shadowMapSize = tt.mapSize, k.shadowCameraNear = tt.camera.near, k.shadowCameraFar = tt.camera.far, n.pointShadow[_] = k, n.pointShadowMap[_] = Z, n.pointShadowMatrix[_] = w.shadow.matrix, y++;
        }
        n.point[_] = H, _++;
      } else if (w.isHemisphereLight) {
        const H = t.get(w);
        H.skyColor.copy(w.color).multiplyScalar(O), H.groundColor.copy(w.groundColor).multiplyScalar(O), n.hemi[u] = H, u++;
      }
    }
    m > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = lt.LTC_FLOAT_1, n.rectAreaLTC2 = lt.LTC_FLOAT_2) : (n.rectAreaLTC1 = lt.LTC_HALF_1, n.rectAreaLTC2 = lt.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = f, n.ambient[2] = d;
    const P = n.hash;
    (P.directionalLength !== p || P.pointLength !== _ || P.spotLength !== M || P.rectAreaLength !== m || P.hemiLength !== u || P.numDirectionalShadows !== A || P.numPointShadows !== y || P.numSpotShadows !== g || P.numSpotMaps !== N || P.numLightProbes !== C) && (n.directional.length = p, n.spot.length = M, n.rectArea.length = m, n.point.length = _, n.hemi.length = u, n.directionalShadow.length = A, n.directionalShadowMap.length = A, n.pointShadow.length = y, n.pointShadowMap.length = y, n.spotShadow.length = g, n.spotShadowMap.length = g, n.directionalShadowMatrix.length = A, n.pointShadowMatrix.length = y, n.spotLightMatrix.length = g + N - R, n.spotLightMap.length = N, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = C, P.directionalLength = p, P.pointLength = _, P.spotLength = M, P.rectAreaLength = m, P.hemiLength = u, P.numDirectionalShadows = A, P.numPointShadows = y, P.numSpotShadows = g, P.numSpotMaps = N, P.numLightProbes = C, n.version = Su++);
  }
  function l(c, h) {
    let f = 0, d = 0, p = 0, _ = 0, M = 0;
    const m = h.matrixWorldInverse;
    for (let u = 0, A = c.length; u < A; u++) {
      const y = c[u];
      if (y.isDirectionalLight) {
        const g = n.directional[f];
        g.direction.setFromMatrixPosition(y.matrixWorld), r.setFromMatrixPosition(y.target.matrixWorld), g.direction.sub(r), g.direction.transformDirection(m), f++;
      } else if (y.isSpotLight) {
        const g = n.spot[p];
        g.position.setFromMatrixPosition(y.matrixWorld), g.position.applyMatrix4(m), g.direction.setFromMatrixPosition(y.matrixWorld), r.setFromMatrixPosition(y.target.matrixWorld), g.direction.sub(r), g.direction.transformDirection(m), p++;
      } else if (y.isRectAreaLight) {
        const g = n.rectArea[_];
        g.position.setFromMatrixPosition(y.matrixWorld), g.position.applyMatrix4(m), a.identity(), s.copy(y.matrixWorld), s.premultiply(m), a.extractRotation(s), g.halfWidth.set(y.width * 0.5, 0, 0), g.halfHeight.set(0, y.height * 0.5, 0), g.halfWidth.applyMatrix4(a), g.halfHeight.applyMatrix4(a), _++;
      } else if (y.isPointLight) {
        const g = n.point[d];
        g.position.setFromMatrixPosition(y.matrixWorld), g.position.applyMatrix4(m), d++;
      } else if (y.isHemisphereLight) {
        const g = n.hemi[M];
        g.direction.setFromMatrixPosition(y.matrixWorld), g.direction.transformDirection(m), M++;
      }
    }
  }
  return {
    setup: o,
    setupView: l,
    state: n
  };
}
function Ds(i) {
  const t = new Eu(i), e = [], n = [];
  function r(h) {
    c.camera = h, e.length = 0, n.length = 0;
  }
  function s(h) {
    e.push(h);
  }
  function a(h) {
    n.push(h);
  }
  function o() {
    t.setup(e);
  }
  function l(h) {
    t.setupView(e, h);
  }
  const c = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: c,
    setupLights: o,
    setupLightsView: l,
    pushLight: s,
    pushShadow: a
  };
}
function Tu(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(r, s = 0) {
    const a = t.get(r);
    let o;
    return a === void 0 ? (o = new Ds(i), t.set(r, [o])) : s >= a.length ? (o = new Ds(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class Au extends gn {
  static get type() {
    return "MeshDepthMaterial";
  }
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class bu extends gn {
  static get type() {
    return "MeshDistanceMaterial";
  }
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const Ru = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, wu = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Cu(i, t, e) {
  let n = new Cr();
  const r = new at(), s = new at(), a = new ae(), o = new Au({ depthPacking: 3201 }), l = new bu(), c = {}, h = e.maxTextureSize, f = { 0: 1, 1: 0, 2: 2 }, d = new nn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new at() },
      radius: { value: 4 }
    },
    vertexShader: Ru,
    fragmentShader: wu
  }), p = d.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const _ = new Me();
  _.setAttribute(
    "position",
    new Ne(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const M = new Ie(_, d), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let u = this.type;
  this.render = function(R, C, P) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || R.length === 0) return;
    const E = i.getRenderTarget(), x = i.getActiveCubeFace(), w = i.getActiveMipmapLevel(), G = i.state;
    G.setBlending(0), G.buffers.color.setClear(1, 1, 1, 1), G.buffers.depth.setTest(!0), G.setScissorTest(!1);
    const O = u !== 3 && this.type === 3, V = u === 3 && this.type !== 3;
    for (let Z = 0, H = R.length; Z < H; Z++) {
      const tt = R[Z], k = tt.shadow;
      if (k === void 0) {
        console.warn("THREE.WebGLShadowMap:", tt, "has no shadow.");
        continue;
      }
      if (k.autoUpdate === !1 && k.needsUpdate === !1) continue;
      r.copy(k.mapSize);
      const ot = k.getFrameExtents();
      if (r.multiply(ot), s.copy(k.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / ot.x), r.x = s.x * ot.x, k.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / ot.y), r.y = s.y * ot.y, k.mapSize.y = s.y)), k.map === null || O === !0 || V === !0) {
        const Mt = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        k.map !== null && k.map.dispose(), k.map = new pn(r.x, r.y, Mt), k.map.texture.name = tt.name + ".shadowMap", k.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(k.map), i.clear();
      const pt = k.getViewportCount();
      for (let Mt = 0; Mt < pt; Mt++) {
        const Nt = k.getViewport(Mt);
        a.set(
          s.x * Nt.x,
          s.y * Nt.y,
          s.x * Nt.z,
          s.y * Nt.w
        ), G.viewport(a), k.updateMatrices(tt, Mt), n = k.getFrustum(), g(C, P, k.camera, tt, this.type);
      }
      k.isPointLightShadow !== !0 && this.type === 3 && A(k, P), k.needsUpdate = !1;
    }
    u = this.type, m.needsUpdate = !1, i.setRenderTarget(E, x, w);
  };
  function A(R, C) {
    const P = t.update(M);
    d.defines.VSM_SAMPLES !== R.blurSamples && (d.defines.VSM_SAMPLES = R.blurSamples, p.defines.VSM_SAMPLES = R.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), R.mapPass === null && (R.mapPass = new pn(r.x, r.y)), d.uniforms.shadow_pass.value = R.map.texture, d.uniforms.resolution.value = R.mapSize, d.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(C, null, P, d, M, null), p.uniforms.shadow_pass.value = R.mapPass.texture, p.uniforms.resolution.value = R.mapSize, p.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(C, null, P, p, M, null);
  }
  function y(R, C, P, E) {
    let x = null;
    const w = P.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (w !== void 0)
      x = w;
    else if (x = P.isPointLight === !0 ? l : o, i.localClippingEnabled && C.clipShadows === !0 && Array.isArray(C.clippingPlanes) && C.clippingPlanes.length !== 0 || C.displacementMap && C.displacementScale !== 0 || C.alphaMap && C.alphaTest > 0 || C.map && C.alphaTest > 0) {
      const G = x.uuid, O = C.uuid;
      let V = c[G];
      V === void 0 && (V = {}, c[G] = V);
      let Z = V[O];
      Z === void 0 && (Z = x.clone(), V[O] = Z, C.addEventListener("dispose", N)), x = Z;
    }
    if (x.visible = C.visible, x.wireframe = C.wireframe, E === 3 ? x.side = C.shadowSide !== null ? C.shadowSide : C.side : x.side = C.shadowSide !== null ? C.shadowSide : f[C.side], x.alphaMap = C.alphaMap, x.alphaTest = C.alphaTest, x.map = C.map, x.clipShadows = C.clipShadows, x.clippingPlanes = C.clippingPlanes, x.clipIntersection = C.clipIntersection, x.displacementMap = C.displacementMap, x.displacementScale = C.displacementScale, x.displacementBias = C.displacementBias, x.wireframeLinewidth = C.wireframeLinewidth, x.linewidth = C.linewidth, P.isPointLight === !0 && x.isMeshDistanceMaterial === !0) {
      const G = i.properties.get(x);
      G.light = P;
    }
    return x;
  }
  function g(R, C, P, E, x) {
    if (R.visible === !1) return;
    if (R.layers.test(C.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && x === 3) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse, R.matrixWorld);
      const O = t.update(R), V = R.material;
      if (Array.isArray(V)) {
        const Z = O.groups;
        for (let H = 0, tt = Z.length; H < tt; H++) {
          const k = Z[H], ot = V[k.materialIndex];
          if (ot && ot.visible) {
            const pt = y(R, ot, E, x);
            R.onBeforeShadow(i, R, C, P, O, pt, k), i.renderBufferDirect(P, null, O, pt, R, k), R.onAfterShadow(i, R, C, P, O, pt, k);
          }
        }
      } else if (V.visible) {
        const Z = y(R, V, E, x);
        R.onBeforeShadow(i, R, C, P, O, Z, null), i.renderBufferDirect(P, null, O, Z, R, null), R.onAfterShadow(i, R, C, P, O, Z, null);
      }
    }
    const G = R.children;
    for (let O = 0, V = G.length; O < V; O++)
      g(G[O], C, P, E, x);
  }
  function N(R) {
    R.target.removeEventListener("dispose", N);
    for (const P in c) {
      const E = c[P], x = R.target.uuid;
      x in E && (E[x].dispose(), delete E[x]);
    }
  }
}
const Pu = {
  0: 1,
  2: 6,
  4: 7,
  3: 5,
  1: 0,
  6: 2,
  7: 4,
  5: 3
};
function Lu(i, t) {
  function e() {
    let D = !1;
    const ht = new ae();
    let W = null;
    const J = new ae(0, 0, 0, 0);
    return {
      setMask: function(dt) {
        W !== dt && !D && (i.colorMask(dt, dt, dt, dt), W = dt);
      },
      setLocked: function(dt) {
        D = dt;
      },
      setClear: function(dt, ut, Ft, se, fe) {
        fe === !0 && (dt *= se, ut *= se, Ft *= se), ht.set(dt, ut, Ft, se), J.equals(ht) === !1 && (i.clearColor(dt, ut, Ft, se), J.copy(ht));
      },
      reset: function() {
        D = !1, W = null, J.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let D = !1, ht = !1, W = null, J = null, dt = null;
    return {
      setReversed: function(ut) {
        if (ht !== ut) {
          const Ft = t.get("EXT_clip_control");
          ht ? Ft.clipControlEXT(Ft.LOWER_LEFT_EXT, Ft.ZERO_TO_ONE_EXT) : Ft.clipControlEXT(Ft.LOWER_LEFT_EXT, Ft.NEGATIVE_ONE_TO_ONE_EXT);
          const se = dt;
          dt = null, this.setClear(se);
        }
        ht = ut;
      },
      getReversed: function() {
        return ht;
      },
      setTest: function(ut) {
        ut ? rt(i.DEPTH_TEST) : wt(i.DEPTH_TEST);
      },
      setMask: function(ut) {
        W !== ut && !D && (i.depthMask(ut), W = ut);
      },
      setFunc: function(ut) {
        if (ht && (ut = Pu[ut]), J !== ut) {
          switch (ut) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          J = ut;
        }
      },
      setLocked: function(ut) {
        D = ut;
      },
      setClear: function(ut) {
        dt !== ut && (ht && (ut = 1 - ut), i.clearDepth(ut), dt = ut);
      },
      reset: function() {
        D = !1, W = null, J = null, dt = null, ht = !1;
      }
    };
  }
  function r() {
    let D = !1, ht = null, W = null, J = null, dt = null, ut = null, Ft = null, se = null, fe = null;
    return {
      setTest: function(Kt) {
        D || (Kt ? rt(i.STENCIL_TEST) : wt(i.STENCIL_TEST));
      },
      setMask: function(Kt) {
        ht !== Kt && !D && (i.stencilMask(Kt), ht = Kt);
      },
      setFunc: function(Kt, Re, Ge) {
        (W !== Kt || J !== Re || dt !== Ge) && (i.stencilFunc(Kt, Re, Ge), W = Kt, J = Re, dt = Ge);
      },
      setOp: function(Kt, Re, Ge) {
        (ut !== Kt || Ft !== Re || se !== Ge) && (i.stencilOp(Kt, Re, Ge), ut = Kt, Ft = Re, se = Ge);
      },
      setLocked: function(Kt) {
        D = Kt;
      },
      setClear: function(Kt) {
        fe !== Kt && (i.clearStencil(Kt), fe = Kt);
      },
      reset: function() {
        D = !1, ht = null, W = null, J = null, dt = null, ut = null, Ft = null, se = null, fe = null;
      }
    };
  }
  const s = new e(), a = new n(), o = new r(), l = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let h = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), p = [], _ = null, M = !1, m = null, u = null, A = null, y = null, g = null, N = null, R = null, C = new Vt(0, 0, 0), P = 0, E = !1, x = null, w = null, G = null, O = null, V = null;
  const Z = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let H = !1, tt = 0;
  const k = i.getParameter(i.VERSION);
  k.indexOf("WebGL") !== -1 ? (tt = parseFloat(/^WebGL (\d)/.exec(k)[1]), H = tt >= 1) : k.indexOf("OpenGL ES") !== -1 && (tt = parseFloat(/^OpenGL ES (\d)/.exec(k)[1]), H = tt >= 2);
  let ot = null, pt = {};
  const Mt = i.getParameter(i.SCISSOR_BOX), Nt = i.getParameter(i.VIEWPORT), Yt = new ae().fromArray(Mt), Y = new ae().fromArray(Nt);
  function nt(D, ht, W, J) {
    const dt = new Uint8Array(4), ut = i.createTexture();
    i.bindTexture(D, ut), i.texParameteri(D, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(D, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ft = 0; Ft < W; Ft++)
      D === i.TEXTURE_3D || D === i.TEXTURE_2D_ARRAY ? i.texImage3D(ht, 0, i.RGBA, 1, 1, J, 0, i.RGBA, i.UNSIGNED_BYTE, dt) : i.texImage2D(ht + Ft, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, dt);
    return ut;
  }
  const St = {};
  St[i.TEXTURE_2D] = nt(i.TEXTURE_2D, i.TEXTURE_2D, 1), St[i.TEXTURE_CUBE_MAP] = nt(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), St[i.TEXTURE_2D_ARRAY] = nt(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), St[i.TEXTURE_3D] = nt(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), rt(i.DEPTH_TEST), a.setFunc(3), j(!1), gt(1), rt(i.CULL_FACE), b(0);
  function rt(D) {
    h[D] !== !0 && (i.enable(D), h[D] = !0);
  }
  function wt(D) {
    h[D] !== !1 && (i.disable(D), h[D] = !1);
  }
  function Ut(D, ht) {
    return f[D] !== ht ? (i.bindFramebuffer(D, ht), f[D] = ht, D === i.DRAW_FRAMEBUFFER && (f[i.FRAMEBUFFER] = ht), D === i.FRAMEBUFFER && (f[i.DRAW_FRAMEBUFFER] = ht), !0) : !1;
  }
  function Lt(D, ht) {
    let W = p, J = !1;
    if (D) {
      W = d.get(ht), W === void 0 && (W = [], d.set(ht, W));
      const dt = D.textures;
      if (W.length !== dt.length || W[0] !== i.COLOR_ATTACHMENT0) {
        for (let ut = 0, Ft = dt.length; ut < Ft; ut++)
          W[ut] = i.COLOR_ATTACHMENT0 + ut;
        W.length = dt.length, J = !0;
      }
    } else
      W[0] !== i.BACK && (W[0] = i.BACK, J = !0);
    J && i.drawBuffers(W);
  }
  function Wt(D) {
    return _ !== D ? (i.useProgram(D), _ = D, !0) : !1;
  }
  const K = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  K[103] = i.MIN, K[104] = i.MAX;
  const et = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function b(D, ht, W, J, dt, ut, Ft, se, fe, Kt) {
    if (D === 0) {
      M === !0 && (wt(i.BLEND), M = !1);
      return;
    }
    if (M === !1 && (rt(i.BLEND), M = !0), D !== 5) {
      if (D !== m || Kt !== E) {
        if ((u !== 100 || g !== 100) && (i.blendEquation(i.FUNC_ADD), u = 100, g = 100), Kt)
          switch (D) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        else
          switch (D) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", D);
              break;
          }
        A = null, y = null, N = null, R = null, C.set(0, 0, 0), P = 0, m = D, E = Kt;
      }
      return;
    }
    dt = dt || ht, ut = ut || W, Ft = Ft || J, (ht !== u || dt !== g) && (i.blendEquationSeparate(K[ht], K[dt]), u = ht, g = dt), (W !== A || J !== y || ut !== N || Ft !== R) && (i.blendFuncSeparate(et[W], et[J], et[ut], et[Ft]), A = W, y = J, N = ut, R = Ft), (se.equals(C) === !1 || fe !== P) && (i.blendColor(se.r, se.g, se.b, fe), C.copy(se), P = fe), m = D, E = !1;
  }
  function bt(D, ht) {
    D.side === 2 ? wt(i.CULL_FACE) : rt(i.CULL_FACE);
    let W = D.side === 1;
    ht && (W = !W), j(W), D.blending === 1 && D.transparent === !1 ? b(0) : b(D.blending, D.blendEquation, D.blendSrc, D.blendDst, D.blendEquationAlpha, D.blendSrcAlpha, D.blendDstAlpha, D.blendColor, D.blendAlpha, D.premultipliedAlpha), a.setFunc(D.depthFunc), a.setTest(D.depthTest), a.setMask(D.depthWrite), s.setMask(D.colorWrite);
    const J = D.stencilWrite;
    o.setTest(J), J && (o.setMask(D.stencilWriteMask), o.setFunc(D.stencilFunc, D.stencilRef, D.stencilFuncMask), o.setOp(D.stencilFail, D.stencilZFail, D.stencilZPass)), Ct(D.polygonOffset, D.polygonOffsetFactor, D.polygonOffsetUnits), D.alphaToCoverage === !0 ? rt(i.SAMPLE_ALPHA_TO_COVERAGE) : wt(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function j(D) {
    x !== D && (D ? i.frontFace(i.CW) : i.frontFace(i.CCW), x = D);
  }
  function gt(D) {
    D !== 0 ? (rt(i.CULL_FACE), D !== w && (D === 1 ? i.cullFace(i.BACK) : D === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : wt(i.CULL_FACE), w = D;
  }
  function st(D) {
    D !== G && (H && i.lineWidth(D), G = D);
  }
  function Ct(D, ht, W) {
    D ? (rt(i.POLYGON_OFFSET_FILL), (O !== ht || V !== W) && (i.polygonOffset(ht, W), O = ht, V = W)) : wt(i.POLYGON_OFFSET_FILL);
  }
  function mt(D) {
    D ? rt(i.SCISSOR_TEST) : wt(i.SCISSOR_TEST);
  }
  function T(D) {
    D === void 0 && (D = i.TEXTURE0 + Z - 1), ot !== D && (i.activeTexture(D), ot = D);
  }
  function v(D, ht, W) {
    W === void 0 && (ot === null ? W = i.TEXTURE0 + Z - 1 : W = ot);
    let J = pt[W];
    J === void 0 && (J = { type: void 0, texture: void 0 }, pt[W] = J), (J.type !== D || J.texture !== ht) && (ot !== W && (i.activeTexture(W), ot = W), i.bindTexture(D, ht || St[D]), J.type = D, J.texture = ht);
  }
  function F() {
    const D = pt[ot];
    D !== void 0 && D.type !== void 0 && (i.bindTexture(D.type, null), D.type = void 0, D.texture = void 0);
  }
  function X() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function $() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function q() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function yt() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function ct() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function _t() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Ht() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Q() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function vt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Pt() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (D) {
      console.error("THREE.WebGLState:", D);
    }
  }
  function Dt(D) {
    Yt.equals(D) === !1 && (i.scissor(D.x, D.y, D.z, D.w), Yt.copy(D));
  }
  function xt(D) {
    Y.equals(D) === !1 && (i.viewport(D.x, D.y, D.z, D.w), Y.copy(D));
  }
  function kt(D, ht) {
    let W = c.get(ht);
    W === void 0 && (W = /* @__PURE__ */ new WeakMap(), c.set(ht, W));
    let J = W.get(D);
    J === void 0 && (J = i.getUniformBlockIndex(ht, D.name), W.set(D, J));
  }
  function zt(D, ht) {
    const J = c.get(ht).get(D);
    l.get(ht) !== J && (i.uniformBlockBinding(ht, J, D.__bindingPointIndex), l.set(ht, J));
  }
  function Qt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), h = {}, ot = null, pt = {}, f = {}, d = /* @__PURE__ */ new WeakMap(), p = [], _ = null, M = !1, m = null, u = null, A = null, y = null, g = null, N = null, R = null, C = new Vt(0, 0, 0), P = 0, E = !1, x = null, w = null, G = null, O = null, V = null, Yt.set(0, 0, i.canvas.width, i.canvas.height), Y.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: rt,
    disable: wt,
    bindFramebuffer: Ut,
    drawBuffers: Lt,
    useProgram: Wt,
    setBlending: b,
    setMaterial: bt,
    setFlipSided: j,
    setCullFace: gt,
    setLineWidth: st,
    setPolygonOffset: Ct,
    setScissorTest: mt,
    activeTexture: T,
    bindTexture: v,
    unbindTexture: F,
    compressedTexImage2D: X,
    compressedTexImage3D: $,
    texImage2D: vt,
    texImage3D: Pt,
    updateUBOMapping: kt,
    uniformBlockBinding: zt,
    texStorage2D: Ht,
    texStorage3D: Q,
    texSubImage2D: q,
    texSubImage3D: yt,
    compressedTexSubImage2D: ct,
    compressedTexSubImage3D: _t,
    scissor: Dt,
    viewport: xt,
    reset: Qt
  };
}
function Us(i, t, e, n) {
  const r = Du(n);
  switch (e) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case 1021:
      return i * t;
    case 1024:
      return i * t;
    case 1025:
      return i * t * 2;
    case 1028:
      return i * t / r.components * r.byteLength;
    case 1029:
      return i * t / r.components * r.byteLength;
    case 1030:
      return i * t * 2 / r.components * r.byteLength;
    case 1031:
      return i * t * 2 / r.components * r.byteLength;
    case 1022:
      return i * t * 3 / r.components * r.byteLength;
    case 1023:
      return i * t * 4 / r.components * r.byteLength;
    case 1033:
      return i * t * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case 33776:
    case 33777:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 33778:
    case 33779:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case 35841:
    case 35843:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case 35840:
    case 35842:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case 36196:
    case 37492:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case 37496:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case 37808:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case 37809:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case 37810:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case 37811:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case 37812:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case 37813:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case 37814:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case 37815:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case 37816:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case 37817:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case 37818:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case 37819:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case 37820:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case 37821:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case 36492:
    case 36494:
    case 36495:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case 36283:
    case 36284:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case 36285:
    case 36286:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function Du(i) {
  switch (i) {
    case 1009:
    case 1010:
      return { byteLength: 1, components: 1 };
    case 1012:
    case 1011:
    case 1016:
      return { byteLength: 2, components: 1 };
    case 1017:
    case 1018:
      return { byteLength: 2, components: 4 };
    case 1014:
    case 1013:
    case 1015:
      return { byteLength: 4, components: 1 };
    case 35902:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Uu(i, t, e, n, r, s, a) {
  const o = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new at(), h = /* @__PURE__ */ new WeakMap();
  let f;
  const d = /* @__PURE__ */ new WeakMap();
  let p = !1;
  try {
    p = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function _(T, v) {
    return p ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, v)
    ) : Oi("canvas");
  }
  function M(T, v, F) {
    let X = 1;
    const $ = mt(T);
    if (($.width > F || $.height > F) && (X = F / Math.max($.width, $.height)), X < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const q = Math.floor(X * $.width), yt = Math.floor(X * $.height);
        f === void 0 && (f = _(q, yt));
        const ct = v ? _(q, yt) : f;
        return ct.width = q, ct.height = yt, ct.getContext("2d").drawImage(T, 0, 0, q, yt), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + $.width + "x" + $.height + ") to (" + q + "x" + yt + ")."), ct;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + $.width + "x" + $.height + ")."), T;
    return T;
  }
  function m(T) {
    return T.generateMipmaps;
  }
  function u(T) {
    i.generateMipmap(T);
  }
  function A(T) {
    return T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : T.isWebGL3DRenderTarget ? i.TEXTURE_3D : T.isWebGLArrayRenderTarget || T.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function y(T, v, F, X, $ = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let q = v;
    if (v === i.RED && (F === i.FLOAT && (q = i.R32F), F === i.HALF_FLOAT && (q = i.R16F), F === i.UNSIGNED_BYTE && (q = i.R8)), v === i.RED_INTEGER && (F === i.UNSIGNED_BYTE && (q = i.R8UI), F === i.UNSIGNED_SHORT && (q = i.R16UI), F === i.UNSIGNED_INT && (q = i.R32UI), F === i.BYTE && (q = i.R8I), F === i.SHORT && (q = i.R16I), F === i.INT && (q = i.R32I)), v === i.RG && (F === i.FLOAT && (q = i.RG32F), F === i.HALF_FLOAT && (q = i.RG16F), F === i.UNSIGNED_BYTE && (q = i.RG8)), v === i.RG_INTEGER && (F === i.UNSIGNED_BYTE && (q = i.RG8UI), F === i.UNSIGNED_SHORT && (q = i.RG16UI), F === i.UNSIGNED_INT && (q = i.RG32UI), F === i.BYTE && (q = i.RG8I), F === i.SHORT && (q = i.RG16I), F === i.INT && (q = i.RG32I)), v === i.RGB_INTEGER && (F === i.UNSIGNED_BYTE && (q = i.RGB8UI), F === i.UNSIGNED_SHORT && (q = i.RGB16UI), F === i.UNSIGNED_INT && (q = i.RGB32UI), F === i.BYTE && (q = i.RGB8I), F === i.SHORT && (q = i.RGB16I), F === i.INT && (q = i.RGB32I)), v === i.RGBA_INTEGER && (F === i.UNSIGNED_BYTE && (q = i.RGBA8UI), F === i.UNSIGNED_SHORT && (q = i.RGBA16UI), F === i.UNSIGNED_INT && (q = i.RGBA32UI), F === i.BYTE && (q = i.RGBA8I), F === i.SHORT && (q = i.RGBA16I), F === i.INT && (q = i.RGBA32I)), v === i.RGB && F === i.UNSIGNED_INT_5_9_9_9_REV && (q = i.RGB9_E5), v === i.RGBA) {
      const yt = $ ? Bi : Xt.getTransfer(X);
      F === i.FLOAT && (q = i.RGBA32F), F === i.HALF_FLOAT && (q = i.RGBA16F), F === i.UNSIGNED_BYTE && (q = yt === $t ? i.SRGB8_ALPHA8 : i.RGBA8), F === i.UNSIGNED_SHORT_4_4_4_4 && (q = i.RGBA4), F === i.UNSIGNED_SHORT_5_5_5_1 && (q = i.RGB5_A1);
    }
    return (q === i.R16F || q === i.R32F || q === i.RG16F || q === i.RG32F || q === i.RGBA16F || q === i.RGBA32F) && t.get("EXT_color_buffer_float"), q;
  }
  function g(T, v) {
    let F;
    return T ? v === null || v === 1014 || v === 1020 ? F = i.DEPTH24_STENCIL8 : v === 1015 ? F = i.DEPTH32F_STENCIL8 : v === 1012 && (F = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : v === null || v === 1014 || v === 1020 ? F = i.DEPTH_COMPONENT24 : v === 1015 ? F = i.DEPTH_COMPONENT32F : v === 1012 && (F = i.DEPTH_COMPONENT16), F;
  }
  function N(T, v) {
    return m(T) === !0 || T.isFramebufferTexture && T.minFilter !== 1003 && T.minFilter !== 1006 ? Math.log2(Math.max(v.width, v.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? v.mipmaps.length : 1;
  }
  function R(T) {
    const v = T.target;
    v.removeEventListener("dispose", R), P(v), v.isVideoTexture && h.delete(v);
  }
  function C(T) {
    const v = T.target;
    v.removeEventListener("dispose", C), x(v);
  }
  function P(T) {
    const v = n.get(T);
    if (v.__webglInit === void 0) return;
    const F = T.source, X = d.get(F);
    if (X) {
      const $ = X[v.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && E(T), Object.keys(X).length === 0 && d.delete(F);
    }
    n.remove(T);
  }
  function E(T) {
    const v = n.get(T);
    i.deleteTexture(v.__webglTexture);
    const F = T.source, X = d.get(F);
    delete X[v.__cacheKey], a.memory.textures--;
  }
  function x(T) {
    const v = n.get(T);
    if (T.depthTexture && (T.depthTexture.dispose(), n.remove(T.depthTexture)), T.isWebGLCubeRenderTarget)
      for (let X = 0; X < 6; X++) {
        if (Array.isArray(v.__webglFramebuffer[X]))
          for (let $ = 0; $ < v.__webglFramebuffer[X].length; $++) i.deleteFramebuffer(v.__webglFramebuffer[X][$]);
        else
          i.deleteFramebuffer(v.__webglFramebuffer[X]);
        v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer[X]);
      }
    else {
      if (Array.isArray(v.__webglFramebuffer))
        for (let X = 0; X < v.__webglFramebuffer.length; X++) i.deleteFramebuffer(v.__webglFramebuffer[X]);
      else
        i.deleteFramebuffer(v.__webglFramebuffer);
      if (v.__webglDepthbuffer && i.deleteRenderbuffer(v.__webglDepthbuffer), v.__webglMultisampledFramebuffer && i.deleteFramebuffer(v.__webglMultisampledFramebuffer), v.__webglColorRenderbuffer)
        for (let X = 0; X < v.__webglColorRenderbuffer.length; X++)
          v.__webglColorRenderbuffer[X] && i.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);
      v.__webglDepthRenderbuffer && i.deleteRenderbuffer(v.__webglDepthRenderbuffer);
    }
    const F = T.textures;
    for (let X = 0, $ = F.length; X < $; X++) {
      const q = n.get(F[X]);
      q.__webglTexture && (i.deleteTexture(q.__webglTexture), a.memory.textures--), n.remove(F[X]);
    }
    n.remove(T);
  }
  let w = 0;
  function G() {
    w = 0;
  }
  function O() {
    const T = w;
    return T >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + r.maxTextures), w += 1, T;
  }
  function V(T) {
    const v = [];
    return v.push(T.wrapS), v.push(T.wrapT), v.push(T.wrapR || 0), v.push(T.magFilter), v.push(T.minFilter), v.push(T.anisotropy), v.push(T.internalFormat), v.push(T.format), v.push(T.type), v.push(T.generateMipmaps), v.push(T.premultiplyAlpha), v.push(T.flipY), v.push(T.unpackAlignment), v.push(T.colorSpace), v.join();
  }
  function Z(T, v) {
    const F = n.get(T);
    if (T.isVideoTexture && st(T), T.isRenderTargetTexture === !1 && T.version > 0 && F.__version !== T.version) {
      const X = T.image;
      if (X === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (X.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Y(F, T, v);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function H(T, v) {
    const F = n.get(T);
    if (T.version > 0 && F.__version !== T.version) {
      Y(F, T, v);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, F.__webglTexture, i.TEXTURE0 + v);
  }
  function tt(T, v) {
    const F = n.get(T);
    if (T.version > 0 && F.__version !== T.version) {
      Y(F, T, v);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, F.__webglTexture, i.TEXTURE0 + v);
  }
  function k(T, v) {
    const F = n.get(T);
    if (T.version > 0 && F.__version !== T.version) {
      nt(F, T, v);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, F.__webglTexture, i.TEXTURE0 + v);
  }
  const ot = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, pt = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, Mt = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function Nt(T, v) {
    if (v.type === 1015 && t.has("OES_texture_float_linear") === !1 && (v.magFilter === 1006 || v.magFilter === 1007 || v.magFilter === 1005 || v.magFilter === 1008 || v.minFilter === 1006 || v.minFilter === 1007 || v.minFilter === 1005 || v.minFilter === 1008) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, ot[v.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, ot[v.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, ot[v.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, pt[v.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, pt[v.minFilter]), v.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, Mt[v.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (v.magFilter === 1003 || v.minFilter !== 1005 && v.minFilter !== 1008 || v.type === 1015 && t.has("OES_texture_float_linear") === !1) return;
      if (v.anisotropy > 1 || n.get(v).__currentAnisotropy) {
        const F = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, F.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(v.anisotropy, r.getMaxAnisotropy())), n.get(v).__currentAnisotropy = v.anisotropy;
      }
    }
  }
  function Yt(T, v) {
    let F = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, v.addEventListener("dispose", R));
    const X = v.source;
    let $ = d.get(X);
    $ === void 0 && ($ = {}, d.set(X, $));
    const q = V(v);
    if (q !== T.__cacheKey) {
      $[q] === void 0 && ($[q] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, F = !0), $[q].usedTimes++;
      const yt = $[T.__cacheKey];
      yt !== void 0 && ($[T.__cacheKey].usedTimes--, yt.usedTimes === 0 && E(v)), T.__cacheKey = q, T.__webglTexture = $[q].texture;
    }
    return F;
  }
  function Y(T, v, F) {
    let X = i.TEXTURE_2D;
    (v.isDataArrayTexture || v.isCompressedArrayTexture) && (X = i.TEXTURE_2D_ARRAY), v.isData3DTexture && (X = i.TEXTURE_3D);
    const $ = Yt(T, v), q = v.source;
    e.bindTexture(X, T.__webglTexture, i.TEXTURE0 + F);
    const yt = n.get(q);
    if (q.version !== yt.__version || $ === !0) {
      e.activeTexture(i.TEXTURE0 + F);
      const ct = Xt.getPrimaries(Xt.workingColorSpace), _t = v.colorSpace === "" ? null : Xt.getPrimaries(v.colorSpace), Ht = v.colorSpace === "" || ct === _t ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ht);
      let Q = M(v.image, !1, r.maxTextureSize);
      Q = Ct(v, Q);
      const vt = s.convert(v.format, v.colorSpace), Pt = s.convert(v.type);
      let Dt = y(v.internalFormat, vt, Pt, v.colorSpace, v.isVideoTexture);
      Nt(X, v);
      let xt;
      const kt = v.mipmaps, zt = v.isVideoTexture !== !0, Qt = yt.__version === void 0 || $ === !0, D = q.dataReady, ht = N(v, Q);
      if (v.isDepthTexture)
        Dt = g(v.format === 1027, v.type), Qt && (zt ? e.texStorage2D(i.TEXTURE_2D, 1, Dt, Q.width, Q.height) : e.texImage2D(i.TEXTURE_2D, 0, Dt, Q.width, Q.height, 0, vt, Pt, null));
      else if (v.isDataTexture)
        if (kt.length > 0) {
          zt && Qt && e.texStorage2D(i.TEXTURE_2D, ht, Dt, kt[0].width, kt[0].height);
          for (let W = 0, J = kt.length; W < J; W++)
            xt = kt[W], zt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, xt.width, xt.height, vt, Pt, xt.data) : e.texImage2D(i.TEXTURE_2D, W, Dt, xt.width, xt.height, 0, vt, Pt, xt.data);
          v.generateMipmaps = !1;
        } else
          zt ? (Qt && e.texStorage2D(i.TEXTURE_2D, ht, Dt, Q.width, Q.height), D && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Q.width, Q.height, vt, Pt, Q.data)) : e.texImage2D(i.TEXTURE_2D, 0, Dt, Q.width, Q.height, 0, vt, Pt, Q.data);
      else if (v.isCompressedTexture)
        if (v.isCompressedArrayTexture) {
          zt && Qt && e.texStorage3D(i.TEXTURE_2D_ARRAY, ht, Dt, kt[0].width, kt[0].height, Q.depth);
          for (let W = 0, J = kt.length; W < J; W++)
            if (xt = kt[W], v.format !== 1023)
              if (vt !== null)
                if (zt) {
                  if (D)
                    if (v.layerUpdates.size > 0) {
                      const dt = Us(xt.width, xt.height, v.format, v.type);
                      for (const ut of v.layerUpdates) {
                        const Ft = xt.data.subarray(
                          ut * dt / xt.data.BYTES_PER_ELEMENT,
                          (ut + 1) * dt / xt.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, ut, xt.width, xt.height, 1, vt, Ft);
                      }
                      v.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, 0, xt.width, xt.height, Q.depth, vt, xt.data);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, W, Dt, xt.width, xt.height, Q.depth, 0, xt.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              zt ? D && e.texSubImage3D(i.TEXTURE_2D_ARRAY, W, 0, 0, 0, xt.width, xt.height, Q.depth, vt, Pt, xt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, W, Dt, xt.width, xt.height, Q.depth, 0, vt, Pt, xt.data);
        } else {
          zt && Qt && e.texStorage2D(i.TEXTURE_2D, ht, Dt, kt[0].width, kt[0].height);
          for (let W = 0, J = kt.length; W < J; W++)
            xt = kt[W], v.format !== 1023 ? vt !== null ? zt ? D && e.compressedTexSubImage2D(i.TEXTURE_2D, W, 0, 0, xt.width, xt.height, vt, xt.data) : e.compressedTexImage2D(i.TEXTURE_2D, W, Dt, xt.width, xt.height, 0, xt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : zt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, xt.width, xt.height, vt, Pt, xt.data) : e.texImage2D(i.TEXTURE_2D, W, Dt, xt.width, xt.height, 0, vt, Pt, xt.data);
        }
      else if (v.isDataArrayTexture)
        if (zt) {
          if (Qt && e.texStorage3D(i.TEXTURE_2D_ARRAY, ht, Dt, Q.width, Q.height, Q.depth), D)
            if (v.layerUpdates.size > 0) {
              const W = Us(Q.width, Q.height, v.format, v.type);
              for (const J of v.layerUpdates) {
                const dt = Q.data.subarray(
                  J * W / Q.data.BYTES_PER_ELEMENT,
                  (J + 1) * W / Q.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, J, Q.width, Q.height, 1, vt, Pt, dt);
              }
              v.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Q.width, Q.height, Q.depth, vt, Pt, Q.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Dt, Q.width, Q.height, Q.depth, 0, vt, Pt, Q.data);
      else if (v.isData3DTexture)
        zt ? (Qt && e.texStorage3D(i.TEXTURE_3D, ht, Dt, Q.width, Q.height, Q.depth), D && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Q.width, Q.height, Q.depth, vt, Pt, Q.data)) : e.texImage3D(i.TEXTURE_3D, 0, Dt, Q.width, Q.height, Q.depth, 0, vt, Pt, Q.data);
      else if (v.isFramebufferTexture) {
        if (Qt)
          if (zt)
            e.texStorage2D(i.TEXTURE_2D, ht, Dt, Q.width, Q.height);
          else {
            let W = Q.width, J = Q.height;
            for (let dt = 0; dt < ht; dt++)
              e.texImage2D(i.TEXTURE_2D, dt, Dt, W, J, 0, vt, Pt, null), W >>= 1, J >>= 1;
          }
      } else if (kt.length > 0) {
        if (zt && Qt) {
          const W = mt(kt[0]);
          e.texStorage2D(i.TEXTURE_2D, ht, Dt, W.width, W.height);
        }
        for (let W = 0, J = kt.length; W < J; W++)
          xt = kt[W], zt ? D && e.texSubImage2D(i.TEXTURE_2D, W, 0, 0, vt, Pt, xt) : e.texImage2D(i.TEXTURE_2D, W, Dt, vt, Pt, xt);
        v.generateMipmaps = !1;
      } else if (zt) {
        if (Qt) {
          const W = mt(Q);
          e.texStorage2D(i.TEXTURE_2D, ht, Dt, W.width, W.height);
        }
        D && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, vt, Pt, Q);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, Dt, vt, Pt, Q);
      m(v) && u(X), yt.__version = q.version, v.onUpdate && v.onUpdate(v);
    }
    T.__version = v.version;
  }
  function nt(T, v, F) {
    if (v.image.length !== 6) return;
    const X = Yt(T, v), $ = v.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + F);
    const q = n.get($);
    if ($.version !== q.__version || X === !0) {
      e.activeTexture(i.TEXTURE0 + F);
      const yt = Xt.getPrimaries(Xt.workingColorSpace), ct = v.colorSpace === "" ? null : Xt.getPrimaries(v.colorSpace), _t = v.colorSpace === "" || yt === ct ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, v.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, v.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, v.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, _t);
      const Ht = v.isCompressedTexture || v.image[0].isCompressedTexture, Q = v.image[0] && v.image[0].isDataTexture, vt = [];
      for (let J = 0; J < 6; J++)
        !Ht && !Q ? vt[J] = M(v.image[J], !0, r.maxCubemapSize) : vt[J] = Q ? v.image[J].image : v.image[J], vt[J] = Ct(v, vt[J]);
      const Pt = vt[0], Dt = s.convert(v.format, v.colorSpace), xt = s.convert(v.type), kt = y(v.internalFormat, Dt, xt, v.colorSpace), zt = v.isVideoTexture !== !0, Qt = q.__version === void 0 || X === !0, D = $.dataReady;
      let ht = N(v, Pt);
      Nt(i.TEXTURE_CUBE_MAP, v);
      let W;
      if (Ht) {
        zt && Qt && e.texStorage2D(i.TEXTURE_CUBE_MAP, ht, kt, Pt.width, Pt.height);
        for (let J = 0; J < 6; J++) {
          W = vt[J].mipmaps;
          for (let dt = 0; dt < W.length; dt++) {
            const ut = W[dt];
            v.format !== 1023 ? Dt !== null ? zt ? D && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt, 0, 0, ut.width, ut.height, Dt, ut.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt, kt, ut.width, ut.height, 0, ut.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : zt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt, 0, 0, ut.width, ut.height, Dt, xt, ut.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt, kt, ut.width, ut.height, 0, Dt, xt, ut.data);
          }
        }
      } else {
        if (W = v.mipmaps, zt && Qt) {
          W.length > 0 && ht++;
          const J = mt(vt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, ht, kt, J.width, J.height);
        }
        for (let J = 0; J < 6; J++)
          if (Q) {
            zt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, vt[J].width, vt[J].height, Dt, xt, vt[J].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, kt, vt[J].width, vt[J].height, 0, Dt, xt, vt[J].data);
            for (let dt = 0; dt < W.length; dt++) {
              const Ft = W[dt].image[J].image;
              zt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt + 1, 0, 0, Ft.width, Ft.height, Dt, xt, Ft.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt + 1, kt, Ft.width, Ft.height, 0, Dt, xt, Ft.data);
            }
          } else {
            zt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, 0, 0, Dt, xt, vt[J]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, 0, kt, Dt, xt, vt[J]);
            for (let dt = 0; dt < W.length; dt++) {
              const ut = W[dt];
              zt ? D && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt + 1, 0, 0, Dt, xt, ut.image[J]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + J, dt + 1, kt, Dt, xt, ut.image[J]);
            }
          }
      }
      m(v) && u(i.TEXTURE_CUBE_MAP), q.__version = $.version, v.onUpdate && v.onUpdate(v);
    }
    T.__version = v.version;
  }
  function St(T, v, F, X, $, q) {
    const yt = s.convert(F.format, F.colorSpace), ct = s.convert(F.type), _t = y(F.internalFormat, yt, ct, F.colorSpace), Ht = n.get(v), Q = n.get(F);
    if (Q.__renderTarget = v, !Ht.__hasExternalTextures) {
      const vt = Math.max(1, v.width >> q), Pt = Math.max(1, v.height >> q);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? e.texImage3D($, q, _t, vt, Pt, v.depth, 0, yt, ct, null) : e.texImage2D($, q, _t, vt, Pt, 0, yt, ct, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, T), gt(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, X, $, Q.__webglTexture, 0, j(v)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, X, $, Q.__webglTexture, q), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function rt(T, v, F) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), v.depthBuffer) {
      const X = v.depthTexture, $ = X && X.isDepthTexture ? X.type : null, q = g(v.stencilBuffer, $), yt = v.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ct = j(v);
      gt(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ct, q, v.width, v.height) : F ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ct, q, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, q, v.width, v.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, yt, i.RENDERBUFFER, T);
    } else {
      const X = v.textures;
      for (let $ = 0; $ < X.length; $++) {
        const q = X[$], yt = s.convert(q.format, q.colorSpace), ct = s.convert(q.type), _t = y(q.internalFormat, yt, ct, q.colorSpace), Ht = j(v);
        F && gt(v) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ht, _t, v.width, v.height) : gt(v) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ht, _t, v.width, v.height) : i.renderbufferStorage(i.RENDERBUFFER, _t, v.width, v.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function wt(T, v) {
    if (v && v.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, T), !(v.depthTexture && v.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const X = n.get(v.depthTexture);
    X.__renderTarget = v, (!X.__webglTexture || v.depthTexture.image.width !== v.width || v.depthTexture.image.height !== v.height) && (v.depthTexture.image.width = v.width, v.depthTexture.image.height = v.height, v.depthTexture.needsUpdate = !0), Z(v.depthTexture, 0);
    const $ = X.__webglTexture, q = j(v);
    if (v.depthTexture.format === 1026)
      gt(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, q) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (v.depthTexture.format === 1027)
      gt(v) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, q) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Ut(T) {
    const v = n.get(T), F = T.isWebGLCubeRenderTarget === !0;
    if (v.__boundDepthTexture !== T.depthTexture) {
      const X = T.depthTexture;
      if (v.__depthDisposeCallback && v.__depthDisposeCallback(), X) {
        const $ = () => {
          delete v.__boundDepthTexture, delete v.__depthDisposeCallback, X.removeEventListener("dispose", $);
        };
        X.addEventListener("dispose", $), v.__depthDisposeCallback = $;
      }
      v.__boundDepthTexture = X;
    }
    if (T.depthTexture && !v.__autoAllocateDepthBuffer) {
      if (F) throw new Error("target.depthTexture not supported in Cube render targets");
      wt(v.__webglFramebuffer, T);
    } else if (F) {
      v.__webglDepthbuffer = [];
      for (let X = 0; X < 6; X++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer[X]), v.__webglDepthbuffer[X] === void 0)
          v.__webglDepthbuffer[X] = i.createRenderbuffer(), rt(v.__webglDepthbuffer[X], T, !1);
        else {
          const $ = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, q = v.__webglDepthbuffer[X];
          i.bindRenderbuffer(i.RENDERBUFFER, q), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, q);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, v.__webglFramebuffer), v.__webglDepthbuffer === void 0)
      v.__webglDepthbuffer = i.createRenderbuffer(), rt(v.__webglDepthbuffer, T, !1);
    else {
      const X = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, $ = v.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, $), i.framebufferRenderbuffer(i.FRAMEBUFFER, X, i.RENDERBUFFER, $);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Lt(T, v, F) {
    const X = n.get(T);
    v !== void 0 && St(X.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), F !== void 0 && Ut(T);
  }
  function Wt(T) {
    const v = T.texture, F = n.get(T), X = n.get(v);
    T.addEventListener("dispose", C);
    const $ = T.textures, q = T.isWebGLCubeRenderTarget === !0, yt = $.length > 1;
    if (yt || (X.__webglTexture === void 0 && (X.__webglTexture = i.createTexture()), X.__version = v.version, a.memory.textures++), q) {
      F.__webglFramebuffer = [];
      for (let ct = 0; ct < 6; ct++)
        if (v.mipmaps && v.mipmaps.length > 0) {
          F.__webglFramebuffer[ct] = [];
          for (let _t = 0; _t < v.mipmaps.length; _t++)
            F.__webglFramebuffer[ct][_t] = i.createFramebuffer();
        } else
          F.__webglFramebuffer[ct] = i.createFramebuffer();
    } else {
      if (v.mipmaps && v.mipmaps.length > 0) {
        F.__webglFramebuffer = [];
        for (let ct = 0; ct < v.mipmaps.length; ct++)
          F.__webglFramebuffer[ct] = i.createFramebuffer();
      } else
        F.__webglFramebuffer = i.createFramebuffer();
      if (yt)
        for (let ct = 0, _t = $.length; ct < _t; ct++) {
          const Ht = n.get($[ct]);
          Ht.__webglTexture === void 0 && (Ht.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (T.samples > 0 && gt(T) === !1) {
        F.__webglMultisampledFramebuffer = i.createFramebuffer(), F.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, F.__webglMultisampledFramebuffer);
        for (let ct = 0; ct < $.length; ct++) {
          const _t = $[ct];
          F.__webglColorRenderbuffer[ct] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, F.__webglColorRenderbuffer[ct]);
          const Ht = s.convert(_t.format, _t.colorSpace), Q = s.convert(_t.type), vt = y(_t.internalFormat, Ht, Q, _t.colorSpace, T.isXRRenderTarget === !0), Pt = j(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Pt, vt, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ct, i.RENDERBUFFER, F.__webglColorRenderbuffer[ct]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (F.__webglDepthRenderbuffer = i.createRenderbuffer(), rt(F.__webglDepthRenderbuffer, T, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (q) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, X.__webglTexture), Nt(i.TEXTURE_CUBE_MAP, v);
      for (let ct = 0; ct < 6; ct++)
        if (v.mipmaps && v.mipmaps.length > 0)
          for (let _t = 0; _t < v.mipmaps.length; _t++)
            St(F.__webglFramebuffer[ct][_t], T, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ct, _t);
        else
          St(F.__webglFramebuffer[ct], T, v, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ct, 0);
      m(v) && u(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (yt) {
      for (let ct = 0, _t = $.length; ct < _t; ct++) {
        const Ht = $[ct], Q = n.get(Ht);
        e.bindTexture(i.TEXTURE_2D, Q.__webglTexture), Nt(i.TEXTURE_2D, Ht), St(F.__webglFramebuffer, T, Ht, i.COLOR_ATTACHMENT0 + ct, i.TEXTURE_2D, 0), m(Ht) && u(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let ct = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (ct = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(ct, X.__webglTexture), Nt(ct, v), v.mipmaps && v.mipmaps.length > 0)
        for (let _t = 0; _t < v.mipmaps.length; _t++)
          St(F.__webglFramebuffer[_t], T, v, i.COLOR_ATTACHMENT0, ct, _t);
      else
        St(F.__webglFramebuffer, T, v, i.COLOR_ATTACHMENT0, ct, 0);
      m(v) && u(ct), e.unbindTexture();
    }
    T.depthBuffer && Ut(T);
  }
  function K(T) {
    const v = T.textures;
    for (let F = 0, X = v.length; F < X; F++) {
      const $ = v[F];
      if (m($)) {
        const q = A(T), yt = n.get($).__webglTexture;
        e.bindTexture(q, yt), u(q), e.unbindTexture();
      }
    }
  }
  const et = [], b = [];
  function bt(T) {
    if (T.samples > 0) {
      if (gt(T) === !1) {
        const v = T.textures, F = T.width, X = T.height;
        let $ = i.COLOR_BUFFER_BIT;
        const q = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, yt = n.get(T), ct = v.length > 1;
        if (ct)
          for (let _t = 0; _t < v.length; _t++)
            e.bindFramebuffer(i.FRAMEBUFFER, yt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, yt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, yt.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, yt.__webglFramebuffer);
        for (let _t = 0; _t < v.length; _t++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), ct) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, yt.__webglColorRenderbuffer[_t]);
            const Ht = n.get(v[_t]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ht, 0);
          }
          i.blitFramebuffer(0, 0, F, X, 0, 0, F, X, $, i.NEAREST), l === !0 && (et.length = 0, b.length = 0, et.push(i.COLOR_ATTACHMENT0 + _t), T.depthBuffer && T.resolveDepthBuffer === !1 && (et.push(q), b.push(q), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, b)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, et));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ct)
          for (let _t = 0; _t < v.length; _t++) {
            e.bindFramebuffer(i.FRAMEBUFFER, yt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.RENDERBUFFER, yt.__webglColorRenderbuffer[_t]);
            const Ht = n.get(v[_t]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, yt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + _t, i.TEXTURE_2D, Ht, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, yt.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
        const v = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [v]);
      }
    }
  }
  function j(T) {
    return Math.min(r.maxSamples, T.samples);
  }
  function gt(T) {
    const v = n.get(T);
    return T.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && v.__useRenderToTexture !== !1;
  }
  function st(T) {
    const v = a.render.frame;
    h.get(T) !== v && (h.set(T, v), T.update());
  }
  function Ct(T, v) {
    const F = T.colorSpace, X = T.format, $ = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || F !== On && F !== "" && (Xt.getTransfer(F) === $t ? (X !== 1023 || $ !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", F)), v;
  }
  function mt(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c;
  }
  this.allocateTextureUnit = O, this.resetTextureUnits = G, this.setTexture2D = Z, this.setTexture2DArray = H, this.setTexture3D = tt, this.setTextureCube = k, this.rebindTextures = Lt, this.setupRenderTarget = Wt, this.updateRenderTargetMipmap = K, this.updateMultisampleRenderTarget = bt, this.setupDepthRenderbuffer = Ut, this.setupFrameBufferTexture = St, this.useMultisampledRTT = gt;
}
function Iu(i, t) {
  function e(n, r = "") {
    let s;
    const a = Xt.getTransfer(r);
    if (n === 1009) return i.UNSIGNED_BYTE;
    if (n === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === 35902) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === 1010) return i.BYTE;
    if (n === 1011) return i.SHORT;
    if (n === 1012) return i.UNSIGNED_SHORT;
    if (n === 1013) return i.INT;
    if (n === 1014) return i.UNSIGNED_INT;
    if (n === 1015) return i.FLOAT;
    if (n === 1016) return i.HALF_FLOAT;
    if (n === 1021) return i.ALPHA;
    if (n === 1022) return i.RGB;
    if (n === 1023) return i.RGBA;
    if (n === 1024) return i.LUMINANCE;
    if (n === 1025) return i.LUMINANCE_ALPHA;
    if (n === 1026) return i.DEPTH_COMPONENT;
    if (n === 1027) return i.DEPTH_STENCIL;
    if (n === 1028) return i.RED;
    if (n === 1029) return i.RED_INTEGER;
    if (n === 1030) return i.RG;
    if (n === 1031) return i.RG_INTEGER;
    if (n === 1033) return i.RGBA_INTEGER;
    if (n === 33776 || n === 33777 || n === 33778 || n === 33779)
      if (a === $t)
        if (s = t.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = t.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === 35840 || n === 35841 || n === 35842 || n === 35843)
      if (s = t.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === 36196 || n === 37492 || n === 37496)
      if (s = t.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === 36196 || n === 37492) return a === $t ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === 37496) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821)
      if (s = t.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === 37808) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === 37809) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === 37810) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === 37811) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === 37812) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === 37813) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === 37814) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === 37815) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === 37816) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === 37817) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === 37818) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === 37819) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === 37820) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === 37821) return a === $t ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === 36492 || n === 36494 || n === 36495)
      if (s = t.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === 36492) return a === $t ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === 36283 || n === 36284 || n === 36285 || n === 36286)
      if (s = t.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === 36492) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === 1020 ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class Nu extends De {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class Ci extends ue {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Fu = { type: "move" };
class vr {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new Ci(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Ci(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new L(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new L()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new Ci(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new L(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new L()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e)
        for (const n of t.hand.values())
          this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(t, e, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        a = !0;
        for (const M of t.hand.values()) {
          const m = e.getJointPose(M, n), u = this._getHandJoint(c, M);
          m !== null && (u.matrix.fromArray(m.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = m.radius), u.visible = m !== null;
        }
        const h = c.joints["index-finger-tip"], f = c.joints["thumb-tip"], d = h.position.distanceTo(f.position), p = 0.02, _ = 5e-3;
        c.inputState.pinching && d > p + _ ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !c.inputState.pinching && d <= p - _ && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        l !== null && t.gripSpace && (s = e.getPose(t.gripSpace, n), s !== null && (l.matrix.fromArray(s.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(s.linearVelocity)) : l.hasLinearVelocity = !1, s.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(s.angularVelocity)) : l.hasAngularVelocity = !1));
      o !== null && (r = e.getPose(t.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Fu)));
    }
    return o !== null && (o.visible = r !== null), l !== null && (l.visible = s !== null), c !== null && (c.visible = a !== null), this;
  }
  // private method
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new Ci();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const Ou = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Bu = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class zu {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const r = new ge(), s = t.properties.get(r);
      s.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = r;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new nn({
        vertexShader: Ou,
        fragmentShader: Bu,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new Ie(new zi(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class Gu extends Bn {
  constructor(t, e) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", l = 1, c = null, h = null, f = null, d = null, p = null, _ = null;
    const M = new zu(), m = e.getContextAttributes();
    let u = null, A = null;
    const y = [], g = [], N = new at();
    let R = null;
    const C = new De();
    C.viewport = new ae();
    const P = new De();
    P.viewport = new ae();
    const E = [C, P], x = new Nu();
    let w = null, G = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(Y) {
      let nt = y[Y];
      return nt === void 0 && (nt = new vr(), y[Y] = nt), nt.getTargetRaySpace();
    }, this.getControllerGrip = function(Y) {
      let nt = y[Y];
      return nt === void 0 && (nt = new vr(), y[Y] = nt), nt.getGripSpace();
    }, this.getHand = function(Y) {
      let nt = y[Y];
      return nt === void 0 && (nt = new vr(), y[Y] = nt), nt.getHandSpace();
    };
    function O(Y) {
      const nt = g.indexOf(Y.inputSource);
      if (nt === -1)
        return;
      const St = y[nt];
      St !== void 0 && (St.update(Y.inputSource, Y.frame, c || a), St.dispatchEvent({ type: Y.type, data: Y.inputSource }));
    }
    function V() {
      r.removeEventListener("select", O), r.removeEventListener("selectstart", O), r.removeEventListener("selectend", O), r.removeEventListener("squeeze", O), r.removeEventListener("squeezestart", O), r.removeEventListener("squeezeend", O), r.removeEventListener("end", V), r.removeEventListener("inputsourceschange", Z);
      for (let Y = 0; Y < y.length; Y++) {
        const nt = g[Y];
        nt !== null && (g[Y] = null, y[Y].disconnect(nt));
      }
      w = null, G = null, M.reset(), t.setRenderTarget(u), p = null, d = null, f = null, r = null, A = null, Yt.stop(), n.isPresenting = !1, t.setPixelRatio(R), t.setSize(N.width, N.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(Y) {
      s = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(Y) {
      o = Y, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || a;
    }, this.setReferenceSpace = function(Y) {
      c = Y;
    }, this.getBaseLayer = function() {
      return d !== null ? d : p;
    }, this.getBinding = function() {
      return f;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(Y) {
      if (r = Y, r !== null) {
        if (u = t.getRenderTarget(), r.addEventListener("select", O), r.addEventListener("selectstart", O), r.addEventListener("selectend", O), r.addEventListener("squeeze", O), r.addEventListener("squeezestart", O), r.addEventListener("squeezeend", O), r.addEventListener("end", V), r.addEventListener("inputsourceschange", Z), m.xrCompatible !== !0 && await e.makeXRCompatible(), R = t.getPixelRatio(), t.getSize(N), r.renderState.layers === void 0) {
          const nt = {
            antialias: m.antialias,
            alpha: !0,
            depth: m.depth,
            stencil: m.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, e, nt), r.updateRenderState({ baseLayer: p }), t.setPixelRatio(1), t.setSize(p.framebufferWidth, p.framebufferHeight, !1), A = new pn(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: t.outputColorSpace,
              stencilBuffer: m.stencil
            }
          );
        } else {
          let nt = null, St = null, rt = null;
          m.depth && (rt = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, nt = m.stencil ? 1027 : 1026, St = m.stencil ? 1020 : 1014);
          const wt = {
            colorFormat: e.RGBA8,
            depthFormat: rt,
            scaleFactor: s
          };
          f = new XRWebGLBinding(r, e), d = f.createProjectionLayer(wt), r.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, !1), A = new pn(
            d.textureWidth,
            d.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new aa(d.textureWidth, d.textureHeight, St, void 0, void 0, void 0, void 0, void 0, void 0, nt),
              stencilBuffer: m.stencil,
              colorSpace: t.outputColorSpace,
              samples: m.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        A.isXRRenderTarget = !0, this.setFoveation(l), c = null, a = await r.requestReferenceSpace(o), Yt.setContext(r), Yt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return M.getDepthTexture();
    };
    function Z(Y) {
      for (let nt = 0; nt < Y.removed.length; nt++) {
        const St = Y.removed[nt], rt = g.indexOf(St);
        rt >= 0 && (g[rt] = null, y[rt].disconnect(St));
      }
      for (let nt = 0; nt < Y.added.length; nt++) {
        const St = Y.added[nt];
        let rt = g.indexOf(St);
        if (rt === -1) {
          for (let Ut = 0; Ut < y.length; Ut++)
            if (Ut >= g.length) {
              g.push(St), rt = Ut;
              break;
            } else if (g[Ut] === null) {
              g[Ut] = St, rt = Ut;
              break;
            }
          if (rt === -1) break;
        }
        const wt = y[rt];
        wt && wt.connect(St);
      }
    }
    const H = new L(), tt = new L();
    function k(Y, nt, St) {
      H.setFromMatrixPosition(nt.matrixWorld), tt.setFromMatrixPosition(St.matrixWorld);
      const rt = H.distanceTo(tt), wt = nt.projectionMatrix.elements, Ut = St.projectionMatrix.elements, Lt = wt[14] / (wt[10] - 1), Wt = wt[14] / (wt[10] + 1), K = (wt[9] + 1) / wt[5], et = (wt[9] - 1) / wt[5], b = (wt[8] - 1) / wt[0], bt = (Ut[8] + 1) / Ut[0], j = Lt * b, gt = Lt * bt, st = rt / (-b + bt), Ct = st * -b;
      if (nt.matrixWorld.decompose(Y.position, Y.quaternion, Y.scale), Y.translateX(Ct), Y.translateZ(st), Y.matrixWorld.compose(Y.position, Y.quaternion, Y.scale), Y.matrixWorldInverse.copy(Y.matrixWorld).invert(), wt[10] === -1)
        Y.projectionMatrix.copy(nt.projectionMatrix), Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse);
      else {
        const mt = Lt + st, T = Wt + st, v = j - Ct, F = gt + (rt - Ct), X = K * Wt / T * mt, $ = et * Wt / T * mt;
        Y.projectionMatrix.makePerspective(v, F, X, $, mt, T), Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert();
      }
    }
    function ot(Y, nt) {
      nt === null ? Y.matrixWorld.copy(Y.matrix) : Y.matrixWorld.multiplyMatrices(nt.matrixWorld, Y.matrix), Y.matrixWorldInverse.copy(Y.matrixWorld).invert();
    }
    this.updateCamera = function(Y) {
      if (r === null) return;
      let nt = Y.near, St = Y.far;
      M.texture !== null && (M.depthNear > 0 && (nt = M.depthNear), M.depthFar > 0 && (St = M.depthFar)), x.near = P.near = C.near = nt, x.far = P.far = C.far = St, (w !== x.near || G !== x.far) && (r.updateRenderState({
        depthNear: x.near,
        depthFar: x.far
      }), w = x.near, G = x.far), C.layers.mask = Y.layers.mask | 2, P.layers.mask = Y.layers.mask | 4, x.layers.mask = C.layers.mask | P.layers.mask;
      const rt = Y.parent, wt = x.cameras;
      ot(x, rt);
      for (let Ut = 0; Ut < wt.length; Ut++)
        ot(wt[Ut], rt);
      wt.length === 2 ? k(x, C, P) : x.projectionMatrix.copy(C.projectionMatrix), pt(Y, x, rt);
    };
    function pt(Y, nt, St) {
      St === null ? Y.matrix.copy(nt.matrixWorld) : (Y.matrix.copy(St.matrixWorld), Y.matrix.invert(), Y.matrix.multiply(nt.matrixWorld)), Y.matrix.decompose(Y.position, Y.quaternion, Y.scale), Y.updateMatrixWorld(!0), Y.projectionMatrix.copy(nt.projectionMatrix), Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse), Y.isPerspectiveCamera && (Y.fov = Er * 2 * Math.atan(1 / Y.projectionMatrix.elements[5]), Y.zoom = 1);
    }
    this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (!(d === null && p === null))
        return l;
    }, this.setFoveation = function(Y) {
      l = Y, d !== null && (d.fixedFoveation = Y), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = Y);
    }, this.hasDepthSensing = function() {
      return M.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return M.getMesh(x);
    };
    let Mt = null;
    function Nt(Y, nt) {
      if (h = nt.getViewerPose(c || a), _ = nt, h !== null) {
        const St = h.views;
        p !== null && (t.setRenderTargetFramebuffer(A, p.framebuffer), t.setRenderTarget(A));
        let rt = !1;
        St.length !== x.cameras.length && (x.cameras.length = 0, rt = !0);
        for (let Ut = 0; Ut < St.length; Ut++) {
          const Lt = St[Ut];
          let Wt = null;
          if (p !== null)
            Wt = p.getViewport(Lt);
          else {
            const et = f.getViewSubImage(d, Lt);
            Wt = et.viewport, Ut === 0 && (t.setRenderTargetTextures(
              A,
              et.colorTexture,
              d.ignoreDepthValues ? void 0 : et.depthStencilTexture
            ), t.setRenderTarget(A));
          }
          let K = E[Ut];
          K === void 0 && (K = new De(), K.layers.enable(Ut), K.viewport = new ae(), E[Ut] = K), K.matrix.fromArray(Lt.transform.matrix), K.matrix.decompose(K.position, K.quaternion, K.scale), K.projectionMatrix.fromArray(Lt.projectionMatrix), K.projectionMatrixInverse.copy(K.projectionMatrix).invert(), K.viewport.set(Wt.x, Wt.y, Wt.width, Wt.height), Ut === 0 && (x.matrix.copy(K.matrix), x.matrix.decompose(x.position, x.quaternion, x.scale)), rt === !0 && x.cameras.push(K);
        }
        const wt = r.enabledFeatures;
        if (wt && wt.includes("depth-sensing")) {
          const Ut = f.getDepthInformation(St[0]);
          Ut && Ut.isValid && Ut.texture && M.init(t, Ut, r.renderState);
        }
      }
      for (let St = 0; St < y.length; St++) {
        const rt = g[St], wt = y[St];
        rt !== null && wt !== void 0 && wt.update(rt, nt, c || a);
      }
      Mt && Mt(Y, nt), nt.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: nt }), _ = null;
    }
    const Yt = new ra();
    Yt.setAnimationLoop(Nt), this.setAnimationLoop = function(Y) {
      Mt = Y;
    }, this.dispose = function() {
    };
  }
}
const hn = /* @__PURE__ */ new Fe(), Vu = /* @__PURE__ */ new jt();
function Hu(i, t) {
  function e(m, u) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), u.value.copy(m.matrix);
  }
  function n(m, u) {
    u.color.getRGB(m.fogColor.value, ea(i)), u.isFog ? (m.fogNear.value = u.near, m.fogFar.value = u.far) : u.isFogExp2 && (m.fogDensity.value = u.density);
  }
  function r(m, u, A, y, g) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? s(m, u) : u.isMeshToonMaterial ? (s(m, u), f(m, u)) : u.isMeshPhongMaterial ? (s(m, u), h(m, u)) : u.isMeshStandardMaterial ? (s(m, u), d(m, u), u.isMeshPhysicalMaterial && p(m, u, g)) : u.isMeshMatcapMaterial ? (s(m, u), _(m, u)) : u.isMeshDepthMaterial ? s(m, u) : u.isMeshDistanceMaterial ? (s(m, u), M(m, u)) : u.isMeshNormalMaterial ? s(m, u) : u.isLineBasicMaterial ? (a(m, u), u.isLineDashedMaterial && o(m, u)) : u.isPointsMaterial ? l(m, u, A, y) : u.isSpriteMaterial ? c(m, u) : u.isShadowMaterial ? (m.color.value.copy(u.color), m.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function s(m, u) {
    m.opacity.value = u.opacity, u.color && m.diffuse.value.copy(u.color), u.emissive && m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (m.map.value = u.map, e(u.map, m.mapTransform)), u.alphaMap && (m.alphaMap.value = u.alphaMap, e(u.alphaMap, m.alphaMapTransform)), u.bumpMap && (m.bumpMap.value = u.bumpMap, e(u.bumpMap, m.bumpMapTransform), m.bumpScale.value = u.bumpScale, u.side === 1 && (m.bumpScale.value *= -1)), u.normalMap && (m.normalMap.value = u.normalMap, e(u.normalMap, m.normalMapTransform), m.normalScale.value.copy(u.normalScale), u.side === 1 && m.normalScale.value.negate()), u.displacementMap && (m.displacementMap.value = u.displacementMap, e(u.displacementMap, m.displacementMapTransform), m.displacementScale.value = u.displacementScale, m.displacementBias.value = u.displacementBias), u.emissiveMap && (m.emissiveMap.value = u.emissiveMap, e(u.emissiveMap, m.emissiveMapTransform)), u.specularMap && (m.specularMap.value = u.specularMap, e(u.specularMap, m.specularMapTransform)), u.alphaTest > 0 && (m.alphaTest.value = u.alphaTest);
    const A = t.get(u), y = A.envMap, g = A.envMapRotation;
    y && (m.envMap.value = y, hn.copy(g), hn.x *= -1, hn.y *= -1, hn.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (hn.y *= -1, hn.z *= -1), m.envMapRotation.value.setFromMatrix4(Vu.makeRotationFromEuler(hn)), m.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, m.reflectivity.value = u.reflectivity, m.ior.value = u.ior, m.refractionRatio.value = u.refractionRatio), u.lightMap && (m.lightMap.value = u.lightMap, m.lightMapIntensity.value = u.lightMapIntensity, e(u.lightMap, m.lightMapTransform)), u.aoMap && (m.aoMap.value = u.aoMap, m.aoMapIntensity.value = u.aoMapIntensity, e(u.aoMap, m.aoMapTransform));
  }
  function a(m, u) {
    m.diffuse.value.copy(u.color), m.opacity.value = u.opacity, u.map && (m.map.value = u.map, e(u.map, m.mapTransform));
  }
  function o(m, u) {
    m.dashSize.value = u.dashSize, m.totalSize.value = u.dashSize + u.gapSize, m.scale.value = u.scale;
  }
  function l(m, u, A, y) {
    m.diffuse.value.copy(u.color), m.opacity.value = u.opacity, m.size.value = u.size * A, m.scale.value = y * 0.5, u.map && (m.map.value = u.map, e(u.map, m.uvTransform)), u.alphaMap && (m.alphaMap.value = u.alphaMap, e(u.alphaMap, m.alphaMapTransform)), u.alphaTest > 0 && (m.alphaTest.value = u.alphaTest);
  }
  function c(m, u) {
    m.diffuse.value.copy(u.color), m.opacity.value = u.opacity, m.rotation.value = u.rotation, u.map && (m.map.value = u.map, e(u.map, m.mapTransform)), u.alphaMap && (m.alphaMap.value = u.alphaMap, e(u.alphaMap, m.alphaMapTransform)), u.alphaTest > 0 && (m.alphaTest.value = u.alphaTest);
  }
  function h(m, u) {
    m.specular.value.copy(u.specular), m.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function f(m, u) {
    u.gradientMap && (m.gradientMap.value = u.gradientMap);
  }
  function d(m, u) {
    m.metalness.value = u.metalness, u.metalnessMap && (m.metalnessMap.value = u.metalnessMap, e(u.metalnessMap, m.metalnessMapTransform)), m.roughness.value = u.roughness, u.roughnessMap && (m.roughnessMap.value = u.roughnessMap, e(u.roughnessMap, m.roughnessMapTransform)), u.envMap && (m.envMapIntensity.value = u.envMapIntensity);
  }
  function p(m, u, A) {
    m.ior.value = u.ior, u.sheen > 0 && (m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), m.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (m.sheenColorMap.value = u.sheenColorMap, e(u.sheenColorMap, m.sheenColorMapTransform)), u.sheenRoughnessMap && (m.sheenRoughnessMap.value = u.sheenRoughnessMap, e(u.sheenRoughnessMap, m.sheenRoughnessMapTransform))), u.clearcoat > 0 && (m.clearcoat.value = u.clearcoat, m.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (m.clearcoatMap.value = u.clearcoatMap, e(u.clearcoatMap, m.clearcoatMapTransform)), u.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, e(u.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (m.clearcoatNormalMap.value = u.clearcoatNormalMap, e(u.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === 1 && m.clearcoatNormalScale.value.negate())), u.dispersion > 0 && (m.dispersion.value = u.dispersion), u.iridescence > 0 && (m.iridescence.value = u.iridescence, m.iridescenceIOR.value = u.iridescenceIOR, m.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (m.iridescenceMap.value = u.iridescenceMap, e(u.iridescenceMap, m.iridescenceMapTransform)), u.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = u.iridescenceThicknessMap, e(u.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), u.transmission > 0 && (m.transmission.value = u.transmission, m.transmissionSamplerMap.value = A.texture, m.transmissionSamplerSize.value.set(A.width, A.height), u.transmissionMap && (m.transmissionMap.value = u.transmissionMap, e(u.transmissionMap, m.transmissionMapTransform)), m.thickness.value = u.thickness, u.thicknessMap && (m.thicknessMap.value = u.thicknessMap, e(u.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = u.attenuationDistance, m.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (m.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (m.anisotropyMap.value = u.anisotropyMap, e(u.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = u.specularIntensity, m.specularColor.value.copy(u.specularColor), u.specularColorMap && (m.specularColorMap.value = u.specularColorMap, e(u.specularColorMap, m.specularColorMapTransform)), u.specularIntensityMap && (m.specularIntensityMap.value = u.specularIntensityMap, e(u.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function _(m, u) {
    u.matcap && (m.matcap.value = u.matcap);
  }
  function M(m, u) {
    const A = t.get(u).light;
    m.referencePosition.value.setFromMatrixPosition(A.matrixWorld), m.nearDistance.value = A.shadow.camera.near, m.farDistance.value = A.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function ku(i, t, e, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(A, y) {
    const g = y.program;
    n.uniformBlockBinding(A, g);
  }
  function c(A, y) {
    let g = r[A.id];
    g === void 0 && (_(A), g = h(A), r[A.id] = g, A.addEventListener("dispose", m));
    const N = y.program;
    n.updateUBOMapping(A, N);
    const R = t.render.frame;
    s[A.id] !== R && (d(A), s[A.id] = R);
  }
  function h(A) {
    const y = f();
    A.__bindingPointIndex = y;
    const g = i.createBuffer(), N = A.__size, R = A.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, g), i.bufferData(i.UNIFORM_BUFFER, N, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, g), g;
  }
  function f() {
    for (let A = 0; A < o; A++)
      if (a.indexOf(A) === -1)
        return a.push(A), A;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(A) {
    const y = r[A.id], g = A.uniforms, N = A.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, y);
    for (let R = 0, C = g.length; R < C; R++) {
      const P = Array.isArray(g[R]) ? g[R] : [g[R]];
      for (let E = 0, x = P.length; E < x; E++) {
        const w = P[E];
        if (p(w, R, E, N) === !0) {
          const G = w.__offset, O = Array.isArray(w.value) ? w.value : [w.value];
          let V = 0;
          for (let Z = 0; Z < O.length; Z++) {
            const H = O[Z], tt = M(H);
            typeof H == "number" || typeof H == "boolean" ? (w.__data[0] = H, i.bufferSubData(i.UNIFORM_BUFFER, G + V, w.__data)) : H.isMatrix3 ? (w.__data[0] = H.elements[0], w.__data[1] = H.elements[1], w.__data[2] = H.elements[2], w.__data[3] = 0, w.__data[4] = H.elements[3], w.__data[5] = H.elements[4], w.__data[6] = H.elements[5], w.__data[7] = 0, w.__data[8] = H.elements[6], w.__data[9] = H.elements[7], w.__data[10] = H.elements[8], w.__data[11] = 0) : (H.toArray(w.__data, V), V += tt.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, G, w.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(A, y, g, N) {
    const R = A.value, C = y + "_" + g;
    if (N[C] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? N[C] = R : N[C] = R.clone(), !0;
    {
      const P = N[C];
      if (typeof R == "number" || typeof R == "boolean") {
        if (P !== R)
          return N[C] = R, !0;
      } else if (P.equals(R) === !1)
        return P.copy(R), !0;
    }
    return !1;
  }
  function _(A) {
    const y = A.uniforms;
    let g = 0;
    const N = 16;
    for (let C = 0, P = y.length; C < P; C++) {
      const E = Array.isArray(y[C]) ? y[C] : [y[C]];
      for (let x = 0, w = E.length; x < w; x++) {
        const G = E[x], O = Array.isArray(G.value) ? G.value : [G.value];
        for (let V = 0, Z = O.length; V < Z; V++) {
          const H = O[V], tt = M(H), k = g % N, ot = k % tt.boundary, pt = k + ot;
          g += ot, pt !== 0 && N - pt < tt.storage && (g += N - pt), G.__data = new Float32Array(tt.storage / Float32Array.BYTES_PER_ELEMENT), G.__offset = g, g += tt.storage;
        }
      }
    }
    const R = g % N;
    return R > 0 && (g += N - R), A.__size = g, A.__cache = {}, this;
  }
  function M(A) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof A == "number" || typeof A == "boolean" ? (y.boundary = 4, y.storage = 4) : A.isVector2 ? (y.boundary = 8, y.storage = 8) : A.isVector3 || A.isColor ? (y.boundary = 16, y.storage = 12) : A.isVector4 ? (y.boundary = 16, y.storage = 16) : A.isMatrix3 ? (y.boundary = 48, y.storage = 48) : A.isMatrix4 ? (y.boundary = 64, y.storage = 64) : A.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", A), y;
  }
  function m(A) {
    const y = A.target;
    y.removeEventListener("dispose", m);
    const g = a.indexOf(y.__bindingPointIndex);
    a.splice(g, 1), i.deleteBuffer(r[y.id]), delete r[y.id], delete s[y.id];
  }
  function u() {
    for (const A in r)
      i.deleteBuffer(r[A]);
    a = [], r = {}, s = {};
  }
  return {
    bind: l,
    update: c,
    dispose: u
  };
}
class Of {
  constructor(t = {}) {
    const {
      canvas: e = La(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: f = !1,
      reverseDepthBuffer: d = !1
    } = t;
    this.isWebGLRenderer = !0;
    let p;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      p = n.getContextAttributes().alpha;
    } else
      p = a;
    const _ = new Uint32Array(4), M = new Int32Array(4);
    let m = null, u = null;
    const A = [], y = [];
    this.domElement = e, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = be, this.toneMapping = 0, this.toneMappingExposure = 1;
    const g = this;
    let N = !1, R = 0, C = 0, P = null, E = -1, x = null;
    const w = new ae(), G = new ae();
    let O = null;
    const V = new Vt(0);
    let Z = 0, H = e.width, tt = e.height, k = 1, ot = null, pt = null;
    const Mt = new ae(0, 0, H, tt), Nt = new ae(0, 0, H, tt);
    let Yt = !1;
    const Y = new Cr();
    let nt = !1, St = !1;
    const rt = new jt(), wt = new jt(), Ut = new L(), Lt = new ae(), Wt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let K = !1;
    function et() {
      return P === null ? k : 1;
    }
    let b = n;
    function bt(S, U) {
      return e.getContext(S, U);
    }
    try {
      const S = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: f
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r170"), e.addEventListener("webglcontextlost", J, !1), e.addEventListener("webglcontextrestored", dt, !1), e.addEventListener("webglcontextcreationerror", ut, !1), b === null) {
        const U = "webgl2";
        if (b = bt(U, S), b === null)
          throw bt(U) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (S) {
      throw console.error("THREE.WebGLRenderer: " + S.message), S;
    }
    let j, gt, st, Ct, mt, T, v, F, X, $, q, yt, ct, _t, Ht, Q, vt, Pt, Dt, xt, kt, zt, Qt, D;
    function ht() {
      j = new Jc(b), j.init(), zt = new Iu(b, j), gt = new kc(b, j, t, zt), st = new Lu(b, j), gt.reverseDepthBuffer && d && st.buffers.depth.setReversed(!0), Ct = new jc(b), mt = new _u(), T = new Uu(b, j, st, mt, gt, zt, Ct), v = new Xc(g), F = new Zc(g), X = new ro(b), Qt = new Vc(b, X), $ = new Kc(b, X, Ct, Qt), q = new th(b, $, X, Ct), Dt = new Qc(b, gt, T), Q = new Wc(mt), yt = new mu(g, v, F, j, gt, Qt, Q), ct = new Hu(g, mt), _t = new vu(), Ht = new Tu(j), Pt = new Gc(g, v, F, st, q, p, l), vt = new Cu(g, q, gt), D = new ku(b, Ct, gt, st), xt = new Hc(b, j, Ct), kt = new $c(b, j, Ct), Ct.programs = yt.programs, g.capabilities = gt, g.extensions = j, g.properties = mt, g.renderLists = _t, g.shadowMap = vt, g.state = st, g.info = Ct;
    }
    ht();
    const W = new Gu(g, b);
    this.xr = W, this.getContext = function() {
      return b;
    }, this.getContextAttributes = function() {
      return b.getContextAttributes();
    }, this.forceContextLoss = function() {
      const S = j.get("WEBGL_lose_context");
      S && S.loseContext();
    }, this.forceContextRestore = function() {
      const S = j.get("WEBGL_lose_context");
      S && S.restoreContext();
    }, this.getPixelRatio = function() {
      return k;
    }, this.setPixelRatio = function(S) {
      S !== void 0 && (k = S, this.setSize(H, tt, !1));
    }, this.getSize = function(S) {
      return S.set(H, tt);
    }, this.setSize = function(S, U, B = !0) {
      if (W.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      H = S, tt = U, e.width = Math.floor(S * k), e.height = Math.floor(U * k), B === !0 && (e.style.width = S + "px", e.style.height = U + "px"), this.setViewport(0, 0, S, U);
    }, this.getDrawingBufferSize = function(S) {
      return S.set(H * k, tt * k).floor();
    }, this.setDrawingBufferSize = function(S, U, B) {
      H = S, tt = U, k = B, e.width = Math.floor(S * B), e.height = Math.floor(U * B), this.setViewport(0, 0, S, U);
    }, this.getCurrentViewport = function(S) {
      return S.copy(w);
    }, this.getViewport = function(S) {
      return S.copy(Mt);
    }, this.setViewport = function(S, U, B, z) {
      S.isVector4 ? Mt.set(S.x, S.y, S.z, S.w) : Mt.set(S, U, B, z), st.viewport(w.copy(Mt).multiplyScalar(k).round());
    }, this.getScissor = function(S) {
      return S.copy(Nt);
    }, this.setScissor = function(S, U, B, z) {
      S.isVector4 ? Nt.set(S.x, S.y, S.z, S.w) : Nt.set(S, U, B, z), st.scissor(G.copy(Nt).multiplyScalar(k).round());
    }, this.getScissorTest = function() {
      return Yt;
    }, this.setScissorTest = function(S) {
      st.setScissorTest(Yt = S);
    }, this.setOpaqueSort = function(S) {
      ot = S;
    }, this.setTransparentSort = function(S) {
      pt = S;
    }, this.getClearColor = function(S) {
      return S.copy(Pt.getClearColor());
    }, this.setClearColor = function() {
      Pt.setClearColor.apply(Pt, arguments);
    }, this.getClearAlpha = function() {
      return Pt.getClearAlpha();
    }, this.setClearAlpha = function() {
      Pt.setClearAlpha.apply(Pt, arguments);
    }, this.clear = function(S = !0, U = !0, B = !0) {
      let z = 0;
      if (S) {
        let I = !1;
        if (P !== null) {
          const it = P.texture.format;
          I = it === 1033 || it === 1031 || it === 1029;
        }
        if (I) {
          const it = P.texture.type, ft = it === 1009 || it === 1014 || it === 1012 || it === 1020 || it === 1017 || it === 1018, Et = Pt.getClearColor(), Tt = Pt.getClearAlpha(), It = Et.r, Ot = Et.g, At = Et.b;
          ft ? (_[0] = It, _[1] = Ot, _[2] = At, _[3] = Tt, b.clearBufferuiv(b.COLOR, 0, _)) : (M[0] = It, M[1] = Ot, M[2] = At, M[3] = Tt, b.clearBufferiv(b.COLOR, 0, M));
        } else
          z |= b.COLOR_BUFFER_BIT;
      }
      U && (z |= b.DEPTH_BUFFER_BIT), B && (z |= b.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), b.clear(z);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", J, !1), e.removeEventListener("webglcontextrestored", dt, !1), e.removeEventListener("webglcontextcreationerror", ut, !1), _t.dispose(), Ht.dispose(), mt.dispose(), v.dispose(), F.dispose(), q.dispose(), Qt.dispose(), D.dispose(), yt.dispose(), W.dispose(), W.removeEventListener("sessionstart", Ir), W.removeEventListener("sessionend", Nr), rn.stop();
    };
    function J(S) {
      S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), N = !0;
    }
    function dt() {
      console.log("THREE.WebGLRenderer: Context Restored."), N = !1;
      const S = Ct.autoReset, U = vt.enabled, B = vt.autoUpdate, z = vt.needsUpdate, I = vt.type;
      ht(), Ct.autoReset = S, vt.enabled = U, vt.autoUpdate = B, vt.needsUpdate = z, vt.type = I;
    }
    function ut(S) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage);
    }
    function Ft(S) {
      const U = S.target;
      U.removeEventListener("dispose", Ft), se(U);
    }
    function se(S) {
      fe(S), mt.remove(S);
    }
    function fe(S) {
      const U = mt.get(S).programs;
      U !== void 0 && (U.forEach(function(B) {
        yt.releaseProgram(B);
      }), S.isShaderMaterial && yt.releaseShaderCache(S));
    }
    this.renderBufferDirect = function(S, U, B, z, I, it) {
      U === null && (U = Wt);
      const ft = I.isMesh && I.matrixWorld.determinant() < 0, Et = Ra(S, U, B, z, I);
      st.setMaterial(z, ft);
      let Tt = B.index, It = 1;
      if (z.wireframe === !0) {
        if (Tt = $.getWireframeAttribute(B), Tt === void 0) return;
        It = 2;
      }
      const Ot = B.drawRange, At = B.attributes.position;
      let qt = Ot.start * It, te = (Ot.start + Ot.count) * It;
      it !== null && (qt = Math.max(qt, it.start * It), te = Math.min(te, (it.start + it.count) * It)), Tt !== null ? (qt = Math.max(qt, 0), te = Math.min(te, Tt.count)) : At != null && (qt = Math.max(qt, 0), te = Math.min(te, At.count));
      const ee = te - qt;
      if (ee < 0 || ee === 1 / 0) return;
      Qt.setup(I, z, Et, B, Tt);
      let ve, Zt = xt;
      if (Tt !== null && (ve = X.get(Tt), Zt = kt, Zt.setIndex(ve)), I.isMesh)
        z.wireframe === !0 ? (st.setLineWidth(z.wireframeLinewidth * et()), Zt.setMode(b.LINES)) : Zt.setMode(b.TRIANGLES);
      else if (I.isLine) {
        let Rt = z.linewidth;
        Rt === void 0 && (Rt = 1), st.setLineWidth(Rt * et()), I.isLineSegments ? Zt.setMode(b.LINES) : I.isLineLoop ? Zt.setMode(b.LINE_LOOP) : Zt.setMode(b.LINE_STRIP);
      } else I.isPoints ? Zt.setMode(b.POINTS) : I.isSprite && Zt.setMode(b.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Zt.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (j.get("WEBGL_multi_draw"))
          Zt.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const Rt = I._multiDrawStarts, Ve = I._multiDrawCounts, Jt = I._multiDrawCount, we = Tt ? X.get(Tt).bytesPerElement : 1, vn = mt.get(z).currentProgram.getUniforms();
          for (let Se = 0; Se < Jt; Se++)
            vn.setValue(b, "_gl_DrawID", Se), Zt.render(Rt[Se] / we, Ve[Se]);
        }
      else if (I.isInstancedMesh)
        Zt.renderInstances(qt, ee, I.count);
      else if (B.isInstancedBufferGeometry) {
        const Rt = B._maxInstanceCount !== void 0 ? B._maxInstanceCount : 1 / 0, Ve = Math.min(B.instanceCount, Rt);
        Zt.renderInstances(qt, ee, Ve);
      } else
        Zt.render(qt, ee);
    };
    function Kt(S, U, B) {
      S.transparent === !0 && S.side === 2 && S.forceSinglePass === !1 ? (S.side = 1, S.needsUpdate = !0, li(S, U, B), S.side = 0, S.needsUpdate = !0, li(S, U, B), S.side = 2) : li(S, U, B);
    }
    this.compile = function(S, U, B = null) {
      B === null && (B = S), u = Ht.get(B), u.init(U), y.push(u), B.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (u.pushLight(I), I.castShadow && u.pushShadow(I));
      }), S !== B && S.traverseVisible(function(I) {
        I.isLight && I.layers.test(U.layers) && (u.pushLight(I), I.castShadow && u.pushShadow(I));
      }), u.setupLights();
      const z = /* @__PURE__ */ new Set();
      return S.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const it = I.material;
        if (it)
          if (Array.isArray(it))
            for (let ft = 0; ft < it.length; ft++) {
              const Et = it[ft];
              Kt(Et, B, I), z.add(Et);
            }
          else
            Kt(it, B, I), z.add(it);
      }), y.pop(), u = null, z;
    }, this.compileAsync = function(S, U, B = null) {
      const z = this.compile(S, U, B);
      return new Promise((I) => {
        function it() {
          if (z.forEach(function(ft) {
            mt.get(ft).currentProgram.isReady() && z.delete(ft);
          }), z.size === 0) {
            I(S);
            return;
          }
          setTimeout(it, 10);
        }
        j.get("KHR_parallel_shader_compile") !== null ? it() : setTimeout(it, 10);
      });
    };
    let Re = null;
    function Ge(S) {
      Re && Re(S);
    }
    function Ir() {
      rn.stop();
    }
    function Nr() {
      rn.start();
    }
    const rn = new ra();
    rn.setAnimationLoop(Ge), typeof self < "u" && rn.setContext(self), this.setAnimationLoop = function(S) {
      Re = S, W.setAnimationLoop(S), S === null ? rn.stop() : rn.start();
    }, W.addEventListener("sessionstart", Ir), W.addEventListener("sessionend", Nr), this.render = function(S, U) {
      if (U !== void 0 && U.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (N === !0) return;
      if (S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), U.parent === null && U.matrixWorldAutoUpdate === !0 && U.updateMatrixWorld(), W.enabled === !0 && W.isPresenting === !0 && (W.cameraAutoUpdate === !0 && W.updateCamera(U), U = W.getCamera()), S.isScene === !0 && S.onBeforeRender(g, S, U, P), u = Ht.get(S, y.length), u.init(U), y.push(u), wt.multiplyMatrices(U.projectionMatrix, U.matrixWorldInverse), Y.setFromProjectionMatrix(wt), St = this.localClippingEnabled, nt = Q.init(this.clippingPlanes, St), m = _t.get(S, A.length), m.init(), A.push(m), W.enabled === !0 && W.isPresenting === !0) {
        const it = g.xr.getDepthSensingMesh();
        it !== null && ki(it, U, -1 / 0, g.sortObjects);
      }
      ki(S, U, 0, g.sortObjects), m.finish(), g.sortObjects === !0 && m.sort(ot, pt), K = W.enabled === !1 || W.isPresenting === !1 || W.hasDepthSensing() === !1, K && Pt.addToRenderList(m, S), this.info.render.frame++, nt === !0 && Q.beginShadows();
      const B = u.state.shadowsArray;
      vt.render(B, S, U), nt === !0 && Q.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const z = m.opaque, I = m.transmissive;
      if (u.setupLights(), U.isArrayCamera) {
        const it = U.cameras;
        if (I.length > 0)
          for (let ft = 0, Et = it.length; ft < Et; ft++) {
            const Tt = it[ft];
            Or(z, I, S, Tt);
          }
        K && Pt.render(S);
        for (let ft = 0, Et = it.length; ft < Et; ft++) {
          const Tt = it[ft];
          Fr(m, S, Tt, Tt.viewport);
        }
      } else
        I.length > 0 && Or(z, I, S, U), K && Pt.render(S), Fr(m, S, U);
      P !== null && (T.updateMultisampleRenderTarget(P), T.updateRenderTargetMipmap(P)), S.isScene === !0 && S.onAfterRender(g, S, U), Qt.resetDefaultState(), E = -1, x = null, y.pop(), y.length > 0 ? (u = y[y.length - 1], nt === !0 && Q.setGlobalState(g.clippingPlanes, u.state.camera)) : u = null, A.pop(), A.length > 0 ? m = A[A.length - 1] : m = null;
    };
    function ki(S, U, B, z) {
      if (S.visible === !1) return;
      if (S.layers.test(U.layers)) {
        if (S.isGroup)
          B = S.renderOrder;
        else if (S.isLOD)
          S.autoUpdate === !0 && S.update(U);
        else if (S.isLight)
          u.pushLight(S), S.castShadow && u.pushShadow(S);
        else if (S.isSprite) {
          if (!S.frustumCulled || Y.intersectsSprite(S)) {
            z && Lt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(wt);
            const ft = q.update(S), Et = S.material;
            Et.visible && m.push(S, ft, Et, B, Lt.z, null);
          }
        } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || Y.intersectsObject(S))) {
          const ft = q.update(S), Et = S.material;
          if (z && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), Lt.copy(S.boundingSphere.center)) : (ft.boundingSphere === null && ft.computeBoundingSphere(), Lt.copy(ft.boundingSphere.center)), Lt.applyMatrix4(S.matrixWorld).applyMatrix4(wt)), Array.isArray(Et)) {
            const Tt = ft.groups;
            for (let It = 0, Ot = Tt.length; It < Ot; It++) {
              const At = Tt[It], qt = Et[At.materialIndex];
              qt && qt.visible && m.push(S, ft, qt, B, Lt.z, At);
            }
          } else Et.visible && m.push(S, ft, Et, B, Lt.z, null);
        }
      }
      const it = S.children;
      for (let ft = 0, Et = it.length; ft < Et; ft++)
        ki(it[ft], U, B, z);
    }
    function Fr(S, U, B, z) {
      const I = S.opaque, it = S.transmissive, ft = S.transparent;
      u.setupLightsView(B), nt === !0 && Q.setGlobalState(g.clippingPlanes, B), z && st.viewport(w.copy(z)), I.length > 0 && oi(I, U, B), it.length > 0 && oi(it, U, B), ft.length > 0 && oi(ft, U, B), st.buffers.depth.setTest(!0), st.buffers.depth.setMask(!0), st.buffers.color.setMask(!0), st.setPolygonOffset(!1);
    }
    function Or(S, U, B, z) {
      if ((B.isScene === !0 ? B.overrideMaterial : null) !== null)
        return;
      u.state.transmissionRenderTarget[z.id] === void 0 && (u.state.transmissionRenderTarget[z.id] = new pn(1, 1, {
        generateMipmaps: !0,
        type: j.has("EXT_color_buffer_half_float") || j.has("EXT_color_buffer_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: 4,
        stencilBuffer: s,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Xt.workingColorSpace
      }));
      const it = u.state.transmissionRenderTarget[z.id], ft = z.viewport || w;
      it.setSize(ft.z, ft.w);
      const Et = g.getRenderTarget();
      g.setRenderTarget(it), g.getClearColor(V), Z = g.getClearAlpha(), Z < 1 && g.setClearColor(16777215, 0.5), g.clear(), K && Pt.render(B);
      const Tt = g.toneMapping;
      g.toneMapping = 0;
      const It = z.viewport;
      if (z.viewport !== void 0 && (z.viewport = void 0), u.setupLightsView(z), nt === !0 && Q.setGlobalState(g.clippingPlanes, z), oi(S, B, z), T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it), j.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Ot = !1;
        for (let At = 0, qt = U.length; At < qt; At++) {
          const te = U[At], ee = te.object, ve = te.geometry, Zt = te.material, Rt = te.group;
          if (Zt.side === 2 && ee.layers.test(z.layers)) {
            const Ve = Zt.side;
            Zt.side = 1, Zt.needsUpdate = !0, Br(ee, B, z, ve, Zt, Rt), Zt.side = Ve, Zt.needsUpdate = !0, Ot = !0;
          }
        }
        Ot === !0 && (T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it));
      }
      g.setRenderTarget(Et), g.setClearColor(V, Z), It !== void 0 && (z.viewport = It), g.toneMapping = Tt;
    }
    function oi(S, U, B) {
      const z = U.isScene === !0 ? U.overrideMaterial : null;
      for (let I = 0, it = S.length; I < it; I++) {
        const ft = S[I], Et = ft.object, Tt = ft.geometry, It = z === null ? ft.material : z, Ot = ft.group;
        Et.layers.test(B.layers) && Br(Et, U, B, Tt, It, Ot);
      }
    }
    function Br(S, U, B, z, I, it) {
      S.onBeforeRender(g, U, B, z, I, it), S.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), I.onBeforeRender(g, U, B, z, S, it), I.transparent === !0 && I.side === 2 && I.forceSinglePass === !1 ? (I.side = 1, I.needsUpdate = !0, g.renderBufferDirect(B, U, z, I, S, it), I.side = 0, I.needsUpdate = !0, g.renderBufferDirect(B, U, z, I, S, it), I.side = 2) : g.renderBufferDirect(B, U, z, I, S, it), S.onAfterRender(g, U, B, z, I, it);
    }
    function li(S, U, B) {
      U.isScene !== !0 && (U = Wt);
      const z = mt.get(S), I = u.state.lights, it = u.state.shadowsArray, ft = I.state.version, Et = yt.getParameters(S, I.state, it, U, B), Tt = yt.getProgramCacheKey(Et);
      let It = z.programs;
      z.environment = S.isMeshStandardMaterial ? U.environment : null, z.fog = U.fog, z.envMap = (S.isMeshStandardMaterial ? F : v).get(S.envMap || z.environment), z.envMapRotation = z.environment !== null && S.envMap === null ? U.environmentRotation : S.envMapRotation, It === void 0 && (S.addEventListener("dispose", Ft), It = /* @__PURE__ */ new Map(), z.programs = It);
      let Ot = It.get(Tt);
      if (Ot !== void 0) {
        if (z.currentProgram === Ot && z.lightsStateVersion === ft)
          return Gr(S, Et), Ot;
      } else
        Et.uniforms = yt.getUniforms(S), S.onBeforeCompile(Et, g), Ot = yt.acquireProgram(Et, Tt), It.set(Tt, Ot), z.uniforms = Et.uniforms;
      const At = z.uniforms;
      return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (At.clippingPlanes = Q.uniform), Gr(S, Et), z.needsLights = Ca(S), z.lightsStateVersion = ft, z.needsLights && (At.ambientLightColor.value = I.state.ambient, At.lightProbe.value = I.state.probe, At.directionalLights.value = I.state.directional, At.directionalLightShadows.value = I.state.directionalShadow, At.spotLights.value = I.state.spot, At.spotLightShadows.value = I.state.spotShadow, At.rectAreaLights.value = I.state.rectArea, At.ltc_1.value = I.state.rectAreaLTC1, At.ltc_2.value = I.state.rectAreaLTC2, At.pointLights.value = I.state.point, At.pointLightShadows.value = I.state.pointShadow, At.hemisphereLights.value = I.state.hemi, At.directionalShadowMap.value = I.state.directionalShadowMap, At.directionalShadowMatrix.value = I.state.directionalShadowMatrix, At.spotShadowMap.value = I.state.spotShadowMap, At.spotLightMatrix.value = I.state.spotLightMatrix, At.spotLightMap.value = I.state.spotLightMap, At.pointShadowMap.value = I.state.pointShadowMap, At.pointShadowMatrix.value = I.state.pointShadowMatrix), z.currentProgram = Ot, z.uniformsList = null, Ot;
    }
    function zr(S) {
      if (S.uniformsList === null) {
        const U = S.currentProgram.getUniforms();
        S.uniformsList = Fi.seqWithValue(U.seq, S.uniforms);
      }
      return S.uniformsList;
    }
    function Gr(S, U) {
      const B = mt.get(S);
      B.outputColorSpace = U.outputColorSpace, B.batching = U.batching, B.batchingColor = U.batchingColor, B.instancing = U.instancing, B.instancingColor = U.instancingColor, B.instancingMorph = U.instancingMorph, B.skinning = U.skinning, B.morphTargets = U.morphTargets, B.morphNormals = U.morphNormals, B.morphColors = U.morphColors, B.morphTargetsCount = U.morphTargetsCount, B.numClippingPlanes = U.numClippingPlanes, B.numIntersection = U.numClipIntersection, B.vertexAlphas = U.vertexAlphas, B.vertexTangents = U.vertexTangents, B.toneMapping = U.toneMapping;
    }
    function Ra(S, U, B, z, I) {
      U.isScene !== !0 && (U = Wt), T.resetTextureUnits();
      const it = U.fog, ft = z.isMeshStandardMaterial ? U.environment : null, Et = P === null ? g.outputColorSpace : P.isXRRenderTarget === !0 ? P.texture.colorSpace : On, Tt = (z.isMeshStandardMaterial ? F : v).get(z.envMap || ft), It = z.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, Ot = !!B.attributes.tangent && (!!z.normalMap || z.anisotropy > 0), At = !!B.morphAttributes.position, qt = !!B.morphAttributes.normal, te = !!B.morphAttributes.color;
      let ee = 0;
      z.toneMapped && (P === null || P.isXRRenderTarget === !0) && (ee = g.toneMapping);
      const ve = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, Zt = ve !== void 0 ? ve.length : 0, Rt = mt.get(z), Ve = u.state.lights;
      if (nt === !0 && (St === !0 || S !== x)) {
        const Te = S === x && z.id === E;
        Q.setState(z, S, Te);
      }
      let Jt = !1;
      z.version === Rt.__version ? (Rt.needsLights && Rt.lightsStateVersion !== Ve.state.version || Rt.outputColorSpace !== Et || I.isBatchedMesh && Rt.batching === !1 || !I.isBatchedMesh && Rt.batching === !0 || I.isBatchedMesh && Rt.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && Rt.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && Rt.instancing === !1 || !I.isInstancedMesh && Rt.instancing === !0 || I.isSkinnedMesh && Rt.skinning === !1 || !I.isSkinnedMesh && Rt.skinning === !0 || I.isInstancedMesh && Rt.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && Rt.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && Rt.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && Rt.instancingMorph === !1 && I.morphTexture !== null || Rt.envMap !== Tt || z.fog === !0 && Rt.fog !== it || Rt.numClippingPlanes !== void 0 && (Rt.numClippingPlanes !== Q.numPlanes || Rt.numIntersection !== Q.numIntersection) || Rt.vertexAlphas !== It || Rt.vertexTangents !== Ot || Rt.morphTargets !== At || Rt.morphNormals !== qt || Rt.morphColors !== te || Rt.toneMapping !== ee || Rt.morphTargetsCount !== Zt) && (Jt = !0) : (Jt = !0, Rt.__version = z.version);
      let we = Rt.currentProgram;
      Jt === !0 && (we = li(z, U, I));
      let vn = !1, Se = !1, Hn = !1;
      const ne = we.getUniforms(), Oe = Rt.uniforms;
      if (st.useProgram(we.program) && (vn = !0, Se = !0, Hn = !0), z.id !== E && (E = z.id, Se = !0), vn || x !== S) {
        st.buffers.depth.getReversed() ? (rt.copy(S.projectionMatrix), Ua(rt), Ia(rt), ne.setValue(b, "projectionMatrix", rt)) : ne.setValue(b, "projectionMatrix", S.projectionMatrix), ne.setValue(b, "viewMatrix", S.matrixWorldInverse);
        const Ze = ne.map.cameraPosition;
        Ze !== void 0 && Ze.setValue(b, Ut.setFromMatrixPosition(S.matrixWorld)), gt.logarithmicDepthBuffer && ne.setValue(
          b,
          "logDepthBufFC",
          2 / (Math.log(S.far + 1) / Math.LN2)
        ), (z.isMeshPhongMaterial || z.isMeshToonMaterial || z.isMeshLambertMaterial || z.isMeshBasicMaterial || z.isMeshStandardMaterial || z.isShaderMaterial) && ne.setValue(b, "isOrthographic", S.isOrthographicCamera === !0), x !== S && (x = S, Se = !0, Hn = !0);
      }
      if (I.isSkinnedMesh) {
        ne.setOptional(b, I, "bindMatrix"), ne.setOptional(b, I, "bindMatrixInverse");
        const Te = I.skeleton;
        Te && (Te.boneTexture === null && Te.computeBoneTexture(), ne.setValue(b, "boneTexture", Te.boneTexture, T));
      }
      I.isBatchedMesh && (ne.setOptional(b, I, "batchingTexture"), ne.setValue(b, "batchingTexture", I._matricesTexture, T), ne.setOptional(b, I, "batchingIdTexture"), ne.setValue(b, "batchingIdTexture", I._indirectTexture, T), ne.setOptional(b, I, "batchingColorTexture"), I._colorsTexture !== null && ne.setValue(b, "batchingColorTexture", I._colorsTexture, T));
      const kn = B.morphAttributes;
      if ((kn.position !== void 0 || kn.normal !== void 0 || kn.color !== void 0) && Dt.update(I, B, we), (Se || Rt.receiveShadow !== I.receiveShadow) && (Rt.receiveShadow = I.receiveShadow, ne.setValue(b, "receiveShadow", I.receiveShadow)), z.isMeshGouraudMaterial && z.envMap !== null && (Oe.envMap.value = Tt, Oe.flipEnvMap.value = Tt.isCubeTexture && Tt.isRenderTargetTexture === !1 ? -1 : 1), z.isMeshStandardMaterial && z.envMap === null && U.environment !== null && (Oe.envMapIntensity.value = U.environmentIntensity), Se && (ne.setValue(b, "toneMappingExposure", g.toneMappingExposure), Rt.needsLights && wa(Oe, Hn), it && z.fog === !0 && ct.refreshFogUniforms(Oe, it), ct.refreshMaterialUniforms(Oe, z, k, tt, u.state.transmissionRenderTarget[S.id]), Fi.upload(b, zr(Rt), Oe, T)), z.isShaderMaterial && z.uniformsNeedUpdate === !0 && (Fi.upload(b, zr(Rt), Oe, T), z.uniformsNeedUpdate = !1), z.isSpriteMaterial && ne.setValue(b, "center", I.center), ne.setValue(b, "modelViewMatrix", I.modelViewMatrix), ne.setValue(b, "normalMatrix", I.normalMatrix), ne.setValue(b, "modelMatrix", I.matrixWorld), z.isShaderMaterial || z.isRawShaderMaterial) {
        const Te = z.uniformsGroups;
        for (let Ze = 0, Je = Te.length; Ze < Je; Ze++) {
          const Vr = Te[Ze];
          D.update(Vr, we), D.bind(Vr, we);
        }
      }
      return we;
    }
    function wa(S, U) {
      S.ambientLightColor.needsUpdate = U, S.lightProbe.needsUpdate = U, S.directionalLights.needsUpdate = U, S.directionalLightShadows.needsUpdate = U, S.pointLights.needsUpdate = U, S.pointLightShadows.needsUpdate = U, S.spotLights.needsUpdate = U, S.spotLightShadows.needsUpdate = U, S.rectAreaLights.needsUpdate = U, S.hemisphereLights.needsUpdate = U;
    }
    function Ca(S) {
      return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return R;
    }, this.getActiveMipmapLevel = function() {
      return C;
    }, this.getRenderTarget = function() {
      return P;
    }, this.setRenderTargetTextures = function(S, U, B) {
      mt.get(S.texture).__webglTexture = U, mt.get(S.depthTexture).__webglTexture = B;
      const z = mt.get(S);
      z.__hasExternalTextures = !0, z.__autoAllocateDepthBuffer = B === void 0, z.__autoAllocateDepthBuffer || j.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), z.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(S, U) {
      const B = mt.get(S);
      B.__webglFramebuffer = U, B.__useDefaultFramebuffer = U === void 0;
    }, this.setRenderTarget = function(S, U = 0, B = 0) {
      P = S, R = U, C = B;
      let z = !0, I = null, it = !1, ft = !1;
      if (S) {
        const Tt = mt.get(S);
        if (Tt.__useDefaultFramebuffer !== void 0)
          st.bindFramebuffer(b.FRAMEBUFFER, null), z = !1;
        else if (Tt.__webglFramebuffer === void 0)
          T.setupRenderTarget(S);
        else if (Tt.__hasExternalTextures)
          T.rebindTextures(S, mt.get(S.texture).__webglTexture, mt.get(S.depthTexture).__webglTexture);
        else if (S.depthBuffer) {
          const At = S.depthTexture;
          if (Tt.__boundDepthTexture !== At) {
            if (At !== null && mt.has(At) && (S.width !== At.image.width || S.height !== At.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(S);
          }
        }
        const It = S.texture;
        (It.isData3DTexture || It.isDataArrayTexture || It.isCompressedArrayTexture) && (ft = !0);
        const Ot = mt.get(S).__webglFramebuffer;
        S.isWebGLCubeRenderTarget ? (Array.isArray(Ot[U]) ? I = Ot[U][B] : I = Ot[U], it = !0) : S.samples > 0 && T.useMultisampledRTT(S) === !1 ? I = mt.get(S).__webglMultisampledFramebuffer : Array.isArray(Ot) ? I = Ot[B] : I = Ot, w.copy(S.viewport), G.copy(S.scissor), O = S.scissorTest;
      } else
        w.copy(Mt).multiplyScalar(k).floor(), G.copy(Nt).multiplyScalar(k).floor(), O = Yt;
      if (st.bindFramebuffer(b.FRAMEBUFFER, I) && z && st.drawBuffers(S, I), st.viewport(w), st.scissor(G), st.setScissorTest(O), it) {
        const Tt = mt.get(S.texture);
        b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_CUBE_MAP_POSITIVE_X + U, Tt.__webglTexture, B);
      } else if (ft) {
        const Tt = mt.get(S.texture), It = U || 0;
        b.framebufferTextureLayer(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, Tt.__webglTexture, B || 0, It);
      }
      E = -1;
    }, this.readRenderTargetPixels = function(S, U, B, z, I, it, ft) {
      if (!(S && S.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Et = mt.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && ft !== void 0 && (Et = Et[ft]), Et) {
        st.bindFramebuffer(b.FRAMEBUFFER, Et);
        try {
          const Tt = S.texture, It = Tt.format, Ot = Tt.type;
          if (!gt.textureFormatReadable(It)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!gt.textureTypeReadable(Ot)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          U >= 0 && U <= S.width - z && B >= 0 && B <= S.height - I && b.readPixels(U, B, z, I, zt.convert(It), zt.convert(Ot), it);
        } finally {
          const Tt = P !== null ? mt.get(P).__webglFramebuffer : null;
          st.bindFramebuffer(b.FRAMEBUFFER, Tt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(S, U, B, z, I, it, ft) {
      if (!(S && S.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let Et = mt.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && ft !== void 0 && (Et = Et[ft]), Et) {
        const Tt = S.texture, It = Tt.format, Ot = Tt.type;
        if (!gt.textureFormatReadable(It))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!gt.textureTypeReadable(Ot))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (U >= 0 && U <= S.width - z && B >= 0 && B <= S.height - I) {
          st.bindFramebuffer(b.FRAMEBUFFER, Et);
          const At = b.createBuffer();
          b.bindBuffer(b.PIXEL_PACK_BUFFER, At), b.bufferData(b.PIXEL_PACK_BUFFER, it.byteLength, b.STREAM_READ), b.readPixels(U, B, z, I, zt.convert(It), zt.convert(Ot), 0);
          const qt = P !== null ? mt.get(P).__webglFramebuffer : null;
          st.bindFramebuffer(b.FRAMEBUFFER, qt);
          const te = b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return b.flush(), await Da(b, te, 4), b.bindBuffer(b.PIXEL_PACK_BUFFER, At), b.getBufferSubData(b.PIXEL_PACK_BUFFER, 0, it), b.deleteBuffer(At), b.deleteSync(te), it;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(S, U = null, B = 0) {
      S.isTexture !== !0 && ($n("WebGLRenderer: copyFramebufferToTexture function signature has changed."), U = arguments[0] || null, S = arguments[1]);
      const z = Math.pow(2, -B), I = Math.floor(S.image.width * z), it = Math.floor(S.image.height * z), ft = U !== null ? U.x : 0, Et = U !== null ? U.y : 0;
      T.setTexture2D(S, 0), b.copyTexSubImage2D(b.TEXTURE_2D, B, 0, 0, ft, Et, I, it), st.unbindTexture();
    }, this.copyTextureToTexture = function(S, U, B = null, z = null, I = 0) {
      S.isTexture !== !0 && ($n("WebGLRenderer: copyTextureToTexture function signature has changed."), z = arguments[0] || null, S = arguments[1], U = arguments[2], I = arguments[3] || 0, B = null);
      let it, ft, Et, Tt, It, Ot, At, qt, te;
      const ee = S.isCompressedTexture ? S.mipmaps[I] : S.image;
      B !== null ? (it = B.max.x - B.min.x, ft = B.max.y - B.min.y, Et = B.isBox3 ? B.max.z - B.min.z : 1, Tt = B.min.x, It = B.min.y, Ot = B.isBox3 ? B.min.z : 0) : (it = ee.width, ft = ee.height, Et = ee.depth || 1, Tt = 0, It = 0, Ot = 0), z !== null ? (At = z.x, qt = z.y, te = z.z) : (At = 0, qt = 0, te = 0);
      const ve = zt.convert(U.format), Zt = zt.convert(U.type);
      let Rt;
      U.isData3DTexture ? (T.setTexture3D(U, 0), Rt = b.TEXTURE_3D) : U.isDataArrayTexture || U.isCompressedArrayTexture ? (T.setTexture2DArray(U, 0), Rt = b.TEXTURE_2D_ARRAY) : (T.setTexture2D(U, 0), Rt = b.TEXTURE_2D), b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, U.flipY), b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, U.premultiplyAlpha), b.pixelStorei(b.UNPACK_ALIGNMENT, U.unpackAlignment);
      const Ve = b.getParameter(b.UNPACK_ROW_LENGTH), Jt = b.getParameter(b.UNPACK_IMAGE_HEIGHT), we = b.getParameter(b.UNPACK_SKIP_PIXELS), vn = b.getParameter(b.UNPACK_SKIP_ROWS), Se = b.getParameter(b.UNPACK_SKIP_IMAGES);
      b.pixelStorei(b.UNPACK_ROW_LENGTH, ee.width), b.pixelStorei(b.UNPACK_IMAGE_HEIGHT, ee.height), b.pixelStorei(b.UNPACK_SKIP_PIXELS, Tt), b.pixelStorei(b.UNPACK_SKIP_ROWS, It), b.pixelStorei(b.UNPACK_SKIP_IMAGES, Ot);
      const Hn = S.isDataArrayTexture || S.isData3DTexture, ne = U.isDataArrayTexture || U.isData3DTexture;
      if (S.isRenderTargetTexture || S.isDepthTexture) {
        const Oe = mt.get(S), kn = mt.get(U), Te = mt.get(Oe.__renderTarget), Ze = mt.get(kn.__renderTarget);
        st.bindFramebuffer(b.READ_FRAMEBUFFER, Te.__webglFramebuffer), st.bindFramebuffer(b.DRAW_FRAMEBUFFER, Ze.__webglFramebuffer);
        for (let Je = 0; Je < Et; Je++)
          Hn && b.framebufferTextureLayer(b.READ_FRAMEBUFFER, b.COLOR_ATTACHMENT0, mt.get(S).__webglTexture, I, Ot + Je), S.isDepthTexture ? (ne && b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER, b.COLOR_ATTACHMENT0, mt.get(U).__webglTexture, I, te + Je), b.blitFramebuffer(Tt, It, it, ft, At, qt, it, ft, b.DEPTH_BUFFER_BIT, b.NEAREST)) : ne ? b.copyTexSubImage3D(Rt, I, At, qt, te + Je, Tt, It, it, ft) : b.copyTexSubImage2D(Rt, I, At, qt, te + Je, Tt, It, it, ft);
        st.bindFramebuffer(b.READ_FRAMEBUFFER, null), st.bindFramebuffer(b.DRAW_FRAMEBUFFER, null);
      } else
        ne ? S.isDataTexture || S.isData3DTexture ? b.texSubImage3D(Rt, I, At, qt, te, it, ft, Et, ve, Zt, ee.data) : U.isCompressedArrayTexture ? b.compressedTexSubImage3D(Rt, I, At, qt, te, it, ft, Et, ve, ee.data) : b.texSubImage3D(Rt, I, At, qt, te, it, ft, Et, ve, Zt, ee) : S.isDataTexture ? b.texSubImage2D(b.TEXTURE_2D, I, At, qt, it, ft, ve, Zt, ee.data) : S.isCompressedTexture ? b.compressedTexSubImage2D(b.TEXTURE_2D, I, At, qt, ee.width, ee.height, ve, ee.data) : b.texSubImage2D(b.TEXTURE_2D, I, At, qt, it, ft, ve, Zt, ee);
      b.pixelStorei(b.UNPACK_ROW_LENGTH, Ve), b.pixelStorei(b.UNPACK_IMAGE_HEIGHT, Jt), b.pixelStorei(b.UNPACK_SKIP_PIXELS, we), b.pixelStorei(b.UNPACK_SKIP_ROWS, vn), b.pixelStorei(b.UNPACK_SKIP_IMAGES, Se), I === 0 && U.generateMipmaps && b.generateMipmap(Rt), st.unbindTexture();
    }, this.copyTextureToTexture3D = function(S, U, B = null, z = null, I = 0) {
      return S.isTexture !== !0 && ($n("WebGLRenderer: copyTextureToTexture3D function signature has changed."), B = arguments[0] || null, z = arguments[1] || null, S = arguments[2], U = arguments[3], I = arguments[4] || 0), $n('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(S, U, B, z, I);
    }, this.initRenderTarget = function(S) {
      mt.get(S).__webglFramebuffer === void 0 && T.setupRenderTarget(S);
    }, this.initTexture = function(S) {
      S.isCubeTexture ? T.setTextureCube(S, 0) : S.isData3DTexture ? T.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? T.setTexture2DArray(S, 0) : T.setTexture2D(S, 0), st.unbindTexture();
    }, this.resetState = function() {
      R = 0, C = 0, P = null, st.reset(), Qt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorspace = Xt._getDrawingBufferColorSpace(t), e.unpackColorSpace = Xt._getUnpackColorSpace();
  }
}
class ua {
  constructor(t, e = 1, n = 1e3) {
    this.isFog = !0, this.name = "", this.color = new Vt(t), this.near = e, this.far = n;
  }
  clone() {
    return new ua(this.color, this.near, this.far);
  }
  toJSON() {
    return {
      type: "Fog",
      name: this.name,
      color: this.color.getHex(),
      near: this.near,
      far: this.far
    };
  }
}
class Bf extends ue {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Fe(), this.environmentIntensity = 1, this.environmentRotation = new Fe(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class Wu extends ge {
  constructor(t = null, e = 1, n = 1, r, s, a, o, l, c = 1003, h = 1003, f, d) {
    super(null, a, o, l, c, h, r, s, f, d), this.isDataTexture = !0, this.image = { data: t, width: e, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class Is extends Ne {
  constructor(t, e, n, r = 1) {
    super(t, e, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = !0, t;
  }
}
const Dn = /* @__PURE__ */ new jt(), Ns = /* @__PURE__ */ new jt(), Pi = [], Fs = /* @__PURE__ */ new _n(), Xu = /* @__PURE__ */ new jt(), Jn = /* @__PURE__ */ new Ie(), Kn = /* @__PURE__ */ new Gn();
class zf extends Ie {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = !0, this.instanceMatrix = new Is(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let r = 0; r < n; r++)
      this.setMatrixAt(r, Xu);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new _n()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Dn), Fs.copy(t.boundingBox).applyMatrix4(Dn), this.boundingBox.union(Fs);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new Gn()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Dn), Kn.copy(t.boundingSphere).applyMatrix4(Dn), this.boundingSphere.union(Kn);
  }
  copy(t, e) {
    return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, e) {
    const n = e.morphTargetInfluences, r = this.morphTexture.source.data.data, s = n.length + 1, a = t * s + 1;
    for (let o = 0; o < n.length; o++)
      n[o] = r[a + o];
  }
  raycast(t, e) {
    const n = this.matrixWorld, r = this.count;
    if (Jn.geometry = this.geometry, Jn.material = this.material, Jn.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Kn.copy(this.boundingSphere), Kn.applyMatrix4(n), t.ray.intersectsSphere(Kn) !== !1))
      for (let s = 0; s < r; s++) {
        this.getMatrixAt(s, Dn), Ns.multiplyMatrices(n, Dn), Jn.matrixWorld = Ns, Jn.raycast(t, Pi);
        for (let a = 0, o = Pi.length; a < o; a++) {
          const l = Pi[a];
          l.instanceId = s, l.object = this, e.push(l);
        }
        Pi.length = 0;
      }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new Is(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, r = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Wu(new Float32Array(r * this.count), r, this.count, 1028, 1015));
    const s = this.morphTexture.source.data.data;
    let a = 0;
    for (let c = 0; c < n.length; c++)
      a += n[c];
    const o = this.geometry.morphTargetsRelative ? 1 : 1 - a, l = r * t;
    s[l] = o, s.set(n, l + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class qu extends gn {
  static get type() {
    return "PointsMaterial";
  }
  constructor(t) {
    super(), this.isPointsMaterial = !0, this.color = new Vt(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
const Os = /* @__PURE__ */ new jt(), Ar = /* @__PURE__ */ new Js(), Li = /* @__PURE__ */ new Gn(), Di = /* @__PURE__ */ new L();
class Gf extends ue {
  constructor(t = new Me(), e = new qu()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  raycast(t, e) {
    const n = this.geometry, r = this.matrixWorld, s = t.params.Points.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Li.copy(n.boundingSphere), Li.applyMatrix4(r), Li.radius += s, t.ray.intersectsSphere(Li) === !1) return;
    Os.copy(r).invert(), Ar.copy(t.ray).applyMatrix4(Os);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = o * o, c = n.index, f = n.attributes.position;
    if (c !== null) {
      const d = Math.max(0, a.start), p = Math.min(c.count, a.start + a.count);
      for (let _ = d, M = p; _ < M; _++) {
        const m = c.getX(_);
        Di.fromBufferAttribute(f, m), Bs(Di, m, l, r, t, e, this);
      }
    } else {
      const d = Math.max(0, a.start), p = Math.min(f.count, a.start + a.count);
      for (let _ = d, M = p; _ < M; _++)
        Di.fromBufferAttribute(f, _), Bs(Di, _, l, r, t, e, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const r = e[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
function Bs(i, t, e, n, r, s, a) {
  const o = Ar.distanceSqToPoint(i);
  if (o < e) {
    const l = new L();
    Ar.closestPointToPoint(i, l), l.applyMatrix4(n);
    const c = r.ray.origin.distanceTo(l);
    if (c < r.near || c > r.far) return;
    s.push({
      distance: c,
      distanceToRay: Math.sqrt(o),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a
    });
  }
}
class ze {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  // Get sequence of points using getPoint( t )
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return e;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPointAt(n / t));
    return e;
  }
  // Get total curve arc length
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n, r = this.getPoint(0), s = 0;
    e.push(0);
    for (let a = 1; a <= t; a++)
      n = this.getPoint(a / t), s += n.distanceTo(r), e.push(s), r = n;
    return this.cacheArcLengths = e, e;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let r = 0;
    const s = n.length;
    let a;
    e ? a = e : a = t * n[s - 1];
    let o = 0, l = s - 1, c;
    for (; o <= l; )
      if (r = Math.floor(o + (l - o) / 2), c = n[r] - a, c < 0)
        o = r + 1;
      else if (c > 0)
        l = r - 1;
      else {
        l = r;
        break;
      }
    if (r = l, n[r] === a)
      return r / (s - 1);
    const h = n[r], d = n[r + 1] - h, p = (a - h) / d;
    return (r + p) / (s - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(t, e) {
    let r = t - 1e-4, s = t + 1e-4;
    r < 0 && (r = 0), s > 1 && (s = 1);
    const a = this.getPoint(r), o = this.getPoint(s), l = e || (a.isVector2 ? new at() : new L());
    return l.copy(o).sub(a).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new L(), r = [], s = [], a = [], o = new L(), l = new jt();
    for (let p = 0; p <= t; p++) {
      const _ = p / t;
      r[p] = this.getTangentAt(_, new L());
    }
    s[0] = new L(), a[0] = new L();
    let c = Number.MAX_VALUE;
    const h = Math.abs(r[0].x), f = Math.abs(r[0].y), d = Math.abs(r[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), f <= c && (c = f, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), s[0].crossVectors(r[0], o), a[0].crossVectors(r[0], s[0]);
    for (let p = 1; p <= t; p++) {
      if (s[p] = s[p - 1].clone(), a[p] = a[p - 1].clone(), o.crossVectors(r[p - 1], r[p]), o.length() > Number.EPSILON) {
        o.normalize();
        const _ = Math.acos(me(r[p - 1].dot(r[p]), -1, 1));
        s[p].applyMatrix4(l.makeRotationAxis(o, _));
      }
      a[p].crossVectors(r[p], s[p]);
    }
    if (e === !0) {
      let p = Math.acos(me(s[0].dot(s[t]), -1, 1));
      p /= t, r[0].dot(o.crossVectors(s[0], s[t])) > 0 && (p = -p);
      for (let _ = 1; _ <= t; _++)
        s[_].applyMatrix4(l.makeRotationAxis(r[_], p * _)), a[_].crossVectors(r[_], s[_]);
    }
    return {
      tangents: r,
      normals: s,
      binormals: a
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class Lr extends ze {
  constructor(t = 0, e = 0, n = 1, r = 1, s = 0, a = Math.PI * 2, o = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = r, this.aStartAngle = s, this.aEndAngle = a, this.aClockwise = o, this.aRotation = l;
  }
  getPoint(t, e = new at()) {
    const n = e, r = Math.PI * 2;
    let s = this.aEndAngle - this.aStartAngle;
    const a = Math.abs(s) < Number.EPSILON;
    for (; s < 0; ) s += r;
    for (; s > r; ) s -= r;
    s < Number.EPSILON && (a ? s = 0 : s = r), this.aClockwise === !0 && !a && (s === r ? s = -r : s = s - r);
    const o = this.aStartAngle + t * s;
    let l = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), f = Math.sin(this.aRotation), d = l - this.aX, p = c - this.aY;
      l = d * h - p * f + this.aX, c = d * f + p * h + this.aY;
    }
    return n.set(l, c);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class Yu extends Lr {
  constructor(t, e, n, r, s, a) {
    super(t, e, n, n, r, s, a), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Dr() {
  let i = 0, t = 0, e = 0, n = 0;
  function r(s, a, o, l) {
    i = s, t = o, e = -3 * s + 3 * a - 2 * o - l, n = 2 * s - 2 * a + o + l;
  }
  return {
    initCatmullRom: function(s, a, o, l, c) {
      r(a, o, c * (o - s), c * (l - a));
    },
    initNonuniformCatmullRom: function(s, a, o, l, c, h, f) {
      let d = (a - s) / c - (o - s) / (c + h) + (o - a) / h, p = (o - a) / h - (l - a) / (h + f) + (l - o) / f;
      d *= h, p *= h, r(a, o, d, p);
    },
    calc: function(s) {
      const a = s * s, o = a * s;
      return i + t * s + e * a + n * o;
    }
  };
}
const Ui = /* @__PURE__ */ new L(), xr = /* @__PURE__ */ new Dr(), Mr = /* @__PURE__ */ new Dr(), Sr = /* @__PURE__ */ new Dr();
class Zu extends ze {
  constructor(t = [], e = !1, n = "centripetal", r = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = r;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.points, s = r.length, a = (s - (this.closed ? 0 : 1)) * t;
    let o = Math.floor(a), l = a - o;
    this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / s) + 1) * s : l === 0 && o === s - 1 && (o = s - 2, l = 1);
    let c, h;
    this.closed || o > 0 ? c = r[(o - 1) % s] : (Ui.subVectors(r[0], r[1]).add(r[0]), c = Ui);
    const f = r[o % s], d = r[(o + 1) % s];
    if (this.closed || o + 2 < s ? h = r[(o + 2) % s] : (Ui.subVectors(r[s - 1], r[s - 2]).add(r[s - 1]), h = Ui), this.curveType === "centripetal" || this.curveType === "chordal") {
      const p = this.curveType === "chordal" ? 0.5 : 0.25;
      let _ = Math.pow(c.distanceToSquared(f), p), M = Math.pow(f.distanceToSquared(d), p), m = Math.pow(d.distanceToSquared(h), p);
      M < 1e-4 && (M = 1), _ < 1e-4 && (_ = M), m < 1e-4 && (m = M), xr.initNonuniformCatmullRom(c.x, f.x, d.x, h.x, _, M, m), Mr.initNonuniformCatmullRom(c.y, f.y, d.y, h.y, _, M, m), Sr.initNonuniformCatmullRom(c.z, f.z, d.z, h.z, _, M, m);
    } else this.curveType === "catmullrom" && (xr.initCatmullRom(c.x, f.x, d.x, h.x, this.tension), Mr.initCatmullRom(c.y, f.y, d.y, h.y, this.tension), Sr.initCatmullRom(c.z, f.z, d.z, h.z, this.tension));
    return n.set(
      xr.calc(l),
      Mr.calc(l),
      Sr.calc(l)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new L().fromArray(r));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function zs(i, t, e, n, r) {
  const s = (n - t) * 0.5, a = (r - e) * 0.5, o = i * i, l = i * o;
  return (2 * e - 2 * n + s + a) * l + (-3 * e + 3 * n - 2 * s - a) * o + s * i + e;
}
function Ju(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function Ku(i, t) {
  return 2 * (1 - i) * i * t;
}
function $u(i, t) {
  return i * i * t;
}
function Qn(i, t, e, n) {
  return Ju(i, t) + Ku(i, e) + $u(i, n);
}
function ju(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Qu(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function tf(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function ef(i, t) {
  return i * i * i * t;
}
function ti(i, t, e, n, r) {
  return ju(i, t) + Qu(i, e) + tf(i, n) + ef(i, r);
}
class fa extends ze {
  constructor(t = new at(), e = new at(), n = new at(), r = new at()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  getPoint(t, e = new at()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      ti(t, r.x, s.x, a.x, o.x),
      ti(t, r.y, s.y, a.y, o.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class nf extends ze {
  constructor(t = new L(), e = new L(), n = new L(), r = new L()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = r;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2, o = this.v3;
    return n.set(
      ti(t, r.x, s.x, a.x, o.x),
      ti(t, r.y, s.y, a.y, o.y),
      ti(t, r.z, s.z, a.z, o.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class da extends ze {
  constructor(t = new at(), e = new at()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new at()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new at()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class rf extends ze {
  constructor(t = new L(), e = new L()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new L()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new L()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class pa extends ze {
  constructor(t = new at(), e = new at(), n = new at()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new at()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      Qn(t, r.x, s.x, a.x),
      Qn(t, r.y, s.y, a.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class sf extends ze {
  constructor(t = new L(), e = new L(), n = new L()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new L()) {
    const n = e, r = this.v0, s = this.v1, a = this.v2;
    return n.set(
      Qn(t, r.x, s.x, a.x),
      Qn(t, r.y, s.y, a.y),
      Qn(t, r.z, s.z, a.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class ma extends ze {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new at()) {
    const n = e, r = this.points, s = (r.length - 1) * t, a = Math.floor(s), o = s - a, l = r[a === 0 ? a : a - 1], c = r[a], h = r[a > r.length - 2 ? r.length - 1 : a + 1], f = r[a > r.length - 3 ? r.length - 1 : a + 2];
    return n.set(
      zs(o, l.x, c.x, h.x, f.x),
      zs(o, l.y, c.y, h.y, f.y)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const r = this.points[e];
      t.points.push(r.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const r = t.points[e];
      this.points.push(new at().fromArray(r));
    }
    return this;
  }
}
var br = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: Yu,
  CatmullRomCurve3: Zu,
  CubicBezierCurve: fa,
  CubicBezierCurve3: nf,
  EllipseCurve: Lr,
  LineCurve: da,
  LineCurve3: rf,
  QuadraticBezierCurve: pa,
  QuadraticBezierCurve3: sf,
  SplineCurve: ma
});
class af extends ze {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new br[n](e, t));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(t, e) {
    const n = t * this.getLength(), r = this.getCurveLengths();
    let s = 0;
    for (; s < r.length; ) {
      if (r[s] >= n) {
        const a = r[s] - n, o = this.curves[s], l = o.getLength(), c = l === 0 ? 0 : 1 - a / l;
        return o.getPointAt(c, e);
      }
      s++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, r = this.curves.length; n < r; n++)
      e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let r = 0, s = this.curves; r < s.length; r++) {
      const a = s[r], o = a.isEllipseCurve ? t * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? t * a.points.length : t, l = a.getPoints(o);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
        n && n.equals(h) || (e.push(h), n = h);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(r.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const r = this.curves[e];
      t.curves.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const r = t.curves[e];
      this.curves.push(new br[r.type]().fromJSON(r));
    }
    return this;
  }
}
class Gs extends af {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new at(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++)
      this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new da(this.currentPoint.clone(), new at(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, r) {
    const s = new pa(
      this.currentPoint.clone(),
      new at(t, e),
      new at(n, r)
    );
    return this.curves.push(s), this.currentPoint.set(n, r), this;
  }
  bezierCurveTo(t, e, n, r, s, a) {
    const o = new fa(
      this.currentPoint.clone(),
      new at(t, e),
      new at(n, r),
      new at(s, a)
    );
    return this.curves.push(o), this.currentPoint.set(s, a), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new ma(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, r, s, a) {
    const o = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      t + o,
      e + l,
      n,
      r,
      s,
      a
    ), this;
  }
  absarc(t, e, n, r, s, a) {
    return this.absellipse(t, e, n, n, r, s, a), this;
  }
  ellipse(t, e, n, r, s, a, o, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, r, s, a, o, l), this;
  }
  absellipse(t, e, n, r, s, a, o, l) {
    const c = new Lr(t, e, n, r, s, a, o, l);
    if (this.curves.length > 0) {
      const f = c.getPoint(0);
      f.equals(this.currentPoint) || this.lineTo(f.x, f.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Ur extends Me {
  constructor(t = 1, e = 1, n = 1, r = 32, s = 1, a = !1, o = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: e,
      height: n,
      radialSegments: r,
      heightSegments: s,
      openEnded: a,
      thetaStart: o,
      thetaLength: l
    };
    const c = this;
    r = Math.floor(r), s = Math.floor(s);
    const h = [], f = [], d = [], p = [];
    let _ = 0;
    const M = [], m = n / 2;
    let u = 0;
    A(), a === !1 && (t > 0 && y(!0), e > 0 && y(!1)), this.setIndex(h), this.setAttribute("position", new ie(f, 3)), this.setAttribute("normal", new ie(d, 3)), this.setAttribute("uv", new ie(p, 2));
    function A() {
      const g = new L(), N = new L();
      let R = 0;
      const C = (e - t) / n;
      for (let P = 0; P <= s; P++) {
        const E = [], x = P / s, w = x * (e - t) + t;
        for (let G = 0; G <= r; G++) {
          const O = G / r, V = O * l + o, Z = Math.sin(V), H = Math.cos(V);
          N.x = w * Z, N.y = -x * n + m, N.z = w * H, f.push(N.x, N.y, N.z), g.set(Z, C, H).normalize(), d.push(g.x, g.y, g.z), p.push(O, 1 - x), E.push(_++);
        }
        M.push(E);
      }
      for (let P = 0; P < r; P++)
        for (let E = 0; E < s; E++) {
          const x = M[E][P], w = M[E + 1][P], G = M[E + 1][P + 1], O = M[E][P + 1];
          (t > 0 || E !== 0) && (h.push(x, w, O), R += 3), (e > 0 || E !== s - 1) && (h.push(w, G, O), R += 3);
        }
      c.addGroup(u, R, 0), u += R;
    }
    function y(g) {
      const N = _, R = new at(), C = new L();
      let P = 0;
      const E = g === !0 ? t : e, x = g === !0 ? 1 : -1;
      for (let G = 1; G <= r; G++)
        f.push(0, m * x, 0), d.push(0, x, 0), p.push(0.5, 0.5), _++;
      const w = _;
      for (let G = 0; G <= r; G++) {
        const V = G / r * l + o, Z = Math.cos(V), H = Math.sin(V);
        C.x = E * H, C.y = m * x, C.z = E * Z, f.push(C.x, C.y, C.z), d.push(0, x, 0), R.x = Z * 0.5 + 0.5, R.y = H * 0.5 * x + 0.5, p.push(R.x, R.y), _++;
      }
      for (let G = 0; G < r; G++) {
        const O = N + G, V = w + G;
        g === !0 ? h.push(V, V + 1, O) : h.push(V + 1, V, O), P += 3;
      }
      c.addGroup(u, P, g === !0 ? 1 : 2), u += P;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ur(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class _a extends Ur {
  constructor(t = 1, e = 1, n = 32, r = 1, s = !1, a = 0, o = Math.PI * 2) {
    super(0, t, e, n, r, s, a, o), this.type = "ConeGeometry", this.parameters = {
      radius: t,
      height: e,
      radialSegments: n,
      heightSegments: r,
      openEnded: s,
      thetaStart: a,
      thetaLength: o
    };
  }
  static fromJSON(t) {
    return new _a(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class Vi extends Me {
  constructor(t = [], e = [], n = 1, r = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: e,
      radius: n,
      detail: r
    };
    const s = [], a = [];
    o(r), c(n), h(), this.setAttribute("position", new ie(s, 3)), this.setAttribute("normal", new ie(s.slice(), 3)), this.setAttribute("uv", new ie(a, 2)), r === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function o(A) {
      const y = new L(), g = new L(), N = new L();
      for (let R = 0; R < e.length; R += 3)
        p(e[R + 0], y), p(e[R + 1], g), p(e[R + 2], N), l(y, g, N, A);
    }
    function l(A, y, g, N) {
      const R = N + 1, C = [];
      for (let P = 0; P <= R; P++) {
        C[P] = [];
        const E = A.clone().lerp(g, P / R), x = y.clone().lerp(g, P / R), w = R - P;
        for (let G = 0; G <= w; G++)
          G === 0 && P === R ? C[P][G] = E : C[P][G] = E.clone().lerp(x, G / w);
      }
      for (let P = 0; P < R; P++)
        for (let E = 0; E < 2 * (R - P) - 1; E++) {
          const x = Math.floor(E / 2);
          E % 2 === 0 ? (d(C[P][x + 1]), d(C[P + 1][x]), d(C[P][x])) : (d(C[P][x + 1]), d(C[P + 1][x + 1]), d(C[P + 1][x]));
        }
    }
    function c(A) {
      const y = new L();
      for (let g = 0; g < s.length; g += 3)
        y.x = s[g + 0], y.y = s[g + 1], y.z = s[g + 2], y.normalize().multiplyScalar(A), s[g + 0] = y.x, s[g + 1] = y.y, s[g + 2] = y.z;
    }
    function h() {
      const A = new L();
      for (let y = 0; y < s.length; y += 3) {
        A.x = s[y + 0], A.y = s[y + 1], A.z = s[y + 2];
        const g = m(A) / 2 / Math.PI + 0.5, N = u(A) / Math.PI + 0.5;
        a.push(g, 1 - N);
      }
      _(), f();
    }
    function f() {
      for (let A = 0; A < a.length; A += 6) {
        const y = a[A + 0], g = a[A + 2], N = a[A + 4], R = Math.max(y, g, N), C = Math.min(y, g, N);
        R > 0.9 && C < 0.1 && (y < 0.2 && (a[A + 0] += 1), g < 0.2 && (a[A + 2] += 1), N < 0.2 && (a[A + 4] += 1));
      }
    }
    function d(A) {
      s.push(A.x, A.y, A.z);
    }
    function p(A, y) {
      const g = A * 3;
      y.x = t[g + 0], y.y = t[g + 1], y.z = t[g + 2];
    }
    function _() {
      const A = new L(), y = new L(), g = new L(), N = new L(), R = new at(), C = new at(), P = new at();
      for (let E = 0, x = 0; E < s.length; E += 9, x += 6) {
        A.set(s[E + 0], s[E + 1], s[E + 2]), y.set(s[E + 3], s[E + 4], s[E + 5]), g.set(s[E + 6], s[E + 7], s[E + 8]), R.set(a[x + 0], a[x + 1]), C.set(a[x + 2], a[x + 3]), P.set(a[x + 4], a[x + 5]), N.copy(A).add(y).add(g).divideScalar(3);
        const w = m(N);
        M(R, x + 0, A, w), M(C, x + 2, y, w), M(P, x + 4, g, w);
      }
    }
    function M(A, y, g, N) {
      N < 0 && A.x === 1 && (a[y] = A.x - 1), g.x === 0 && g.z === 0 && (a[y] = N / 2 / Math.PI + 0.5);
    }
    function m(A) {
      return Math.atan2(A.z, -A.x);
    }
    function u(A) {
      return Math.atan2(-A.y, Math.sqrt(A.x * A.x + A.z * A.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Vi(t.vertices, t.indices, t.radius, t.details);
  }
}
class ga extends Vi {
  constructor(t = 1, e = 0) {
    const n = (1 + Math.sqrt(5)) / 2, r = 1 / n, s = [
      // (±1, ±1, ±1)
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1,
      -1,
      -1,
      1,
      -1,
      1,
      1,
      1,
      -1,
      1,
      1,
      1,
      // (0, ±1/φ, ±φ)
      0,
      -r,
      -n,
      0,
      -r,
      n,
      0,
      r,
      -n,
      0,
      r,
      n,
      // (±1/φ, ±φ, 0)
      -r,
      -n,
      0,
      -r,
      n,
      0,
      r,
      -n,
      0,
      r,
      n,
      0,
      // (±φ, 0, ±1/φ)
      -n,
      0,
      -r,
      n,
      0,
      -r,
      -n,
      0,
      r,
      n,
      0,
      r
    ], a = [
      3,
      11,
      7,
      3,
      7,
      15,
      3,
      15,
      13,
      7,
      19,
      17,
      7,
      17,
      6,
      7,
      6,
      15,
      17,
      4,
      8,
      17,
      8,
      10,
      17,
      10,
      6,
      8,
      0,
      16,
      8,
      16,
      2,
      8,
      2,
      10,
      0,
      12,
      1,
      0,
      1,
      18,
      0,
      18,
      16,
      6,
      10,
      2,
      6,
      2,
      13,
      6,
      13,
      15,
      2,
      16,
      18,
      2,
      18,
      3,
      2,
      3,
      13,
      18,
      1,
      9,
      18,
      9,
      11,
      18,
      11,
      3,
      4,
      14,
      12,
      4,
      12,
      0,
      4,
      0,
      8,
      11,
      9,
      5,
      11,
      5,
      19,
      11,
      19,
      7,
      19,
      5,
      14,
      19,
      14,
      4,
      19,
      4,
      17,
      1,
      12,
      14,
      1,
      14,
      5,
      1,
      5,
      9
    ];
    super(s, a, t, e), this.type = "DodecahedronGeometry", this.parameters = {
      radius: t,
      detail: e
    };
  }
  static fromJSON(t) {
    return new ga(t.radius, t.detail);
  }
}
class of extends Gs {
  constructor(t) {
    super(t), this.uuid = zn(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, r = this.holes.length; n < r; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(r.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const r = this.holes[e];
      t.holes.push(r.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const r = t.holes[e];
      this.holes.push(new Gs().fromJSON(r));
    }
    return this;
  }
}
const lf = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, r = n ? t[0] * e : i.length;
    let s = va(i, 0, r, e, !0);
    const a = [];
    if (!s || s.next === s.prev) return a;
    let o, l, c, h, f, d, p;
    if (n && (s = df(i, t, s, e)), i.length > 80 * e) {
      o = c = i[0], l = h = i[1];
      for (let _ = e; _ < r; _ += e)
        f = i[_], d = i[_ + 1], f < o && (o = f), d < l && (l = d), f > c && (c = f), d > h && (h = d);
      p = Math.max(c - o, h - l), p = p !== 0 ? 32767 / p : 0;
    }
    return ni(s, a, e, o, l, p, 0), a;
  }
};
function va(i, t, e, n, r) {
  let s, a;
  if (r === Tf(i, t, e, n) > 0)
    for (s = t; s < e; s += n) a = Vs(s, i[s], i[s + 1], a);
  else
    for (s = e - n; s >= t; s -= n) a = Vs(s, i[s], i[s + 1], a);
  return a && Hi(a, a.next) && (ri(a), a = a.next), a;
}
function mn(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (Hi(e, e.next) || re(e.prev, e, e.next) === 0)) {
      if (ri(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function ni(i, t, e, n, r, s, a) {
  if (!i) return;
  !a && s && vf(i, n, r, s);
  let o = i, l, c;
  for (; i.prev !== i.next; ) {
    if (l = i.prev, c = i.next, s ? hf(i, n, r, s) : cf(i)) {
      t.push(l.i / e | 0), t.push(i.i / e | 0), t.push(c.i / e | 0), ri(i), i = c.next, o = c.next;
      continue;
    }
    if (i = c, i === o) {
      a ? a === 1 ? (i = uf(mn(i), t, e), ni(i, t, e, n, r, s, 2)) : a === 2 && ff(i, t, e, n, r, s) : ni(mn(i), t, e, n, r, s, 1);
      break;
    }
  }
}
function cf(i) {
  const t = i.prev, e = i, n = i.next;
  if (re(t, e, n) >= 0) return !1;
  const r = t.x, s = e.x, a = n.x, o = t.y, l = e.y, c = n.y, h = r < s ? r < a ? r : a : s < a ? s : a, f = o < l ? o < c ? o : c : l < c ? l : c, d = r > s ? r > a ? r : a : s > a ? s : a, p = o > l ? o > c ? o : c : l > c ? l : c;
  let _ = n.next;
  for (; _ !== t; ) {
    if (_.x >= h && _.x <= d && _.y >= f && _.y <= p && In(r, o, s, l, a, c, _.x, _.y) && re(_.prev, _, _.next) >= 0) return !1;
    _ = _.next;
  }
  return !0;
}
function hf(i, t, e, n) {
  const r = i.prev, s = i, a = i.next;
  if (re(r, s, a) >= 0) return !1;
  const o = r.x, l = s.x, c = a.x, h = r.y, f = s.y, d = a.y, p = o < l ? o < c ? o : c : l < c ? l : c, _ = h < f ? h < d ? h : d : f < d ? f : d, M = o > l ? o > c ? o : c : l > c ? l : c, m = h > f ? h > d ? h : d : f > d ? f : d, u = Rr(p, _, t, e, n), A = Rr(M, m, t, e, n);
  let y = i.prevZ, g = i.nextZ;
  for (; y && y.z >= u && g && g.z <= A; ) {
    if (y.x >= p && y.x <= M && y.y >= _ && y.y <= m && y !== r && y !== a && In(o, h, l, f, c, d, y.x, y.y) && re(y.prev, y, y.next) >= 0 || (y = y.prevZ, g.x >= p && g.x <= M && g.y >= _ && g.y <= m && g !== r && g !== a && In(o, h, l, f, c, d, g.x, g.y) && re(g.prev, g, g.next) >= 0)) return !1;
    g = g.nextZ;
  }
  for (; y && y.z >= u; ) {
    if (y.x >= p && y.x <= M && y.y >= _ && y.y <= m && y !== r && y !== a && In(o, h, l, f, c, d, y.x, y.y) && re(y.prev, y, y.next) >= 0) return !1;
    y = y.prevZ;
  }
  for (; g && g.z <= A; ) {
    if (g.x >= p && g.x <= M && g.y >= _ && g.y <= m && g !== r && g !== a && In(o, h, l, f, c, d, g.x, g.y) && re(g.prev, g, g.next) >= 0) return !1;
    g = g.nextZ;
  }
  return !0;
}
function uf(i, t, e) {
  let n = i;
  do {
    const r = n.prev, s = n.next.next;
    !Hi(r, s) && xa(r, n, n.next, s) && ii(r, s) && ii(s, r) && (t.push(r.i / e | 0), t.push(n.i / e | 0), t.push(s.i / e | 0), ri(n), ri(n.next), n = i = s), n = n.next;
  } while (n !== i);
  return mn(n);
}
function ff(i, t, e, n, r, s) {
  let a = i;
  do {
    let o = a.next.next;
    for (; o !== a.prev; ) {
      if (a.i !== o.i && Sf(a, o)) {
        let l = Ma(a, o);
        a = mn(a, a.next), l = mn(l, l.next), ni(a, t, e, n, r, s, 0), ni(l, t, e, n, r, s, 0);
        return;
      }
      o = o.next;
    }
    a = a.next;
  } while (a !== i);
}
function df(i, t, e, n) {
  const r = [];
  let s, a, o, l, c;
  for (s = 0, a = t.length; s < a; s++)
    o = t[s] * n, l = s < a - 1 ? t[s + 1] * n : i.length, c = va(i, o, l, n, !1), c === c.next && (c.steiner = !0), r.push(Mf(c));
  for (r.sort(pf), s = 0; s < r.length; s++)
    e = mf(r[s], e);
  return e;
}
function pf(i, t) {
  return i.x - t.x;
}
function mf(i, t) {
  const e = _f(i, t);
  if (!e)
    return t;
  const n = Ma(e, i);
  return mn(n, n.next), mn(e, e.next);
}
function _f(i, t) {
  let e = t, n = -1 / 0, r;
  const s = i.x, a = i.y;
  do {
    if (a <= e.y && a >= e.next.y && e.next.y !== e.y) {
      const d = e.x + (a - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (d <= s && d > n && (n = d, r = e.x < e.next.x ? e : e.next, d === s))
        return r;
    }
    e = e.next;
  } while (e !== t);
  if (!r) return null;
  const o = r, l = r.x, c = r.y;
  let h = 1 / 0, f;
  e = r;
  do
    s >= e.x && e.x >= l && s !== e.x && In(a < c ? s : n, a, l, c, a < c ? n : s, a, e.x, e.y) && (f = Math.abs(a - e.y) / (s - e.x), ii(e, i) && (f < h || f === h && (e.x > r.x || e.x === r.x && gf(r, e))) && (r = e, h = f)), e = e.next;
  while (e !== o);
  return r;
}
function gf(i, t) {
  return re(i.prev, i, t.prev) < 0 && re(t.next, i, i.next) < 0;
}
function vf(i, t, e, n) {
  let r = i;
  do
    r.z === 0 && (r.z = Rr(r.x, r.y, t, e, n)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== i);
  r.prevZ.nextZ = null, r.prevZ = null, xf(r);
}
function xf(i) {
  let t, e, n, r, s, a, o, l, c = 1;
  do {
    for (e = i, i = null, s = null, a = 0; e; ) {
      for (a++, n = e, o = 0, t = 0; t < c && (o++, n = n.nextZ, !!n); t++)
        ;
      for (l = c; o > 0 || l > 0 && n; )
        o !== 0 && (l === 0 || !n || e.z <= n.z) ? (r = e, e = e.nextZ, o--) : (r = n, n = n.nextZ, l--), s ? s.nextZ = r : i = r, r.prevZ = s, s = r;
      e = n;
    }
    s.nextZ = null, c *= 2;
  } while (a > 1);
  return i;
}
function Rr(i, t, e, n, r) {
  return i = (i - e) * r | 0, t = (t - n) * r | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function Mf(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function In(i, t, e, n, r, s, a, o) {
  return (r - a) * (t - o) >= (i - a) * (s - o) && (i - a) * (n - o) >= (e - a) * (t - o) && (e - a) * (s - o) >= (r - a) * (n - o);
}
function Sf(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !yf(i, t) && // dones't intersect other edges
  (ii(i, t) && ii(t, i) && Ef(i, t) && // locally visible
  (re(i.prev, i, t.prev) || re(i, t.prev, t)) || // does not create opposite-facing sectors
  Hi(i, t) && re(i.prev, i, i.next) > 0 && re(t.prev, t, t.next) > 0);
}
function re(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function Hi(i, t) {
  return i.x === t.x && i.y === t.y;
}
function xa(i, t, e, n) {
  const r = Ni(re(i, t, e)), s = Ni(re(i, t, n)), a = Ni(re(e, n, i)), o = Ni(re(e, n, t));
  return !!(r !== s && a !== o || r === 0 && Ii(i, e, t) || s === 0 && Ii(i, n, t) || a === 0 && Ii(e, i, n) || o === 0 && Ii(e, t, n));
}
function Ii(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Ni(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function yf(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && xa(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function ii(i, t) {
  return re(i.prev, i, i.next) < 0 ? re(i, t, i.next) >= 0 && re(i, i.prev, t) >= 0 : re(i, t, i.prev) < 0 || re(i, i.next, t) < 0;
}
function Ef(i, t) {
  let e = i, n = !1;
  const r = (i.x + t.x) / 2, s = (i.y + t.y) / 2;
  do
    e.y > s != e.next.y > s && e.next.y !== e.y && r < (e.next.x - e.x) * (s - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function Ma(i, t) {
  const e = new wr(i.i, i.x, i.y), n = new wr(t.i, t.x, t.y), r = i.next, s = t.prev;
  return i.next = t, t.prev = i, e.next = r, r.prev = e, n.next = e, e.prev = n, s.next = n, n.prev = s, n;
}
function Vs(i, t, e, n) {
  const r = new wr(i, t, e);
  return n ? (r.next = n.next, r.prev = n, n.next.prev = r, n.next = r) : (r.prev = r, r.next = r), r;
}
function ri(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function wr(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Tf(i, t, e, n) {
  let r = 0;
  for (let s = t, a = e - n; s < e; s += n)
    r += (i[a] - i[s]) * (i[s + 1] + i[a + 1]), a = s;
  return r;
}
class ei {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let r = e - 1, s = 0; s < e; r = s++)
      n += t[r].x * t[s].y - t[s].x * t[r].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return ei.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], r = [], s = [];
    Hs(t), ks(n, t);
    let a = t.length;
    e.forEach(Hs);
    for (let l = 0; l < e.length; l++)
      r.push(a), a += e[l].length, ks(n, e[l]);
    const o = lf.triangulate(n, r);
    for (let l = 0; l < o.length; l += 3)
      s.push(o.slice(l, l + 3));
    return s;
  }
}
function Hs(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function ks(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Sa extends Me {
  constructor(t = new of([new at(0.5, 0.5), new at(-0.5, 0.5), new at(-0.5, -0.5), new at(0.5, -0.5)]), e = {}) {
    super(), this.type = "ExtrudeGeometry", this.parameters = {
      shapes: t,
      options: e
    }, t = Array.isArray(t) ? t : [t];
    const n = this, r = [], s = [];
    for (let o = 0, l = t.length; o < l; o++) {
      const c = t[o];
      a(c);
    }
    this.setAttribute("position", new ie(r, 3)), this.setAttribute("uv", new ie(s, 2)), this.computeVertexNormals();
    function a(o) {
      const l = [], c = e.curveSegments !== void 0 ? e.curveSegments : 12, h = e.steps !== void 0 ? e.steps : 1, f = e.depth !== void 0 ? e.depth : 1;
      let d = e.bevelEnabled !== void 0 ? e.bevelEnabled : !0, p = e.bevelThickness !== void 0 ? e.bevelThickness : 0.2, _ = e.bevelSize !== void 0 ? e.bevelSize : p - 0.1, M = e.bevelOffset !== void 0 ? e.bevelOffset : 0, m = e.bevelSegments !== void 0 ? e.bevelSegments : 3;
      const u = e.extrudePath, A = e.UVGenerator !== void 0 ? e.UVGenerator : Af;
      let y, g = !1, N, R, C, P;
      u && (y = u.getSpacedPoints(h), g = !0, d = !1, N = u.computeFrenetFrames(h, !1), R = new L(), C = new L(), P = new L()), d || (m = 0, p = 0, _ = 0, M = 0);
      const E = o.extractPoints(c);
      let x = E.shape;
      const w = E.holes;
      if (!ei.isClockWise(x)) {
        x = x.reverse();
        for (let K = 0, et = w.length; K < et; K++) {
          const b = w[K];
          ei.isClockWise(b) && (w[K] = b.reverse());
        }
      }
      const O = ei.triangulateShape(x, w), V = x;
      for (let K = 0, et = w.length; K < et; K++) {
        const b = w[K];
        x = x.concat(b);
      }
      function Z(K, et, b) {
        return et || console.error("THREE.ExtrudeGeometry: vec does not exist"), K.clone().addScaledVector(et, b);
      }
      const H = x.length, tt = O.length;
      function k(K, et, b) {
        let bt, j, gt;
        const st = K.x - et.x, Ct = K.y - et.y, mt = b.x - K.x, T = b.y - K.y, v = st * st + Ct * Ct, F = st * T - Ct * mt;
        if (Math.abs(F) > Number.EPSILON) {
          const X = Math.sqrt(v), $ = Math.sqrt(mt * mt + T * T), q = et.x - Ct / X, yt = et.y + st / X, ct = b.x - T / $, _t = b.y + mt / $, Ht = ((ct - q) * T - (_t - yt) * mt) / (st * T - Ct * mt);
          bt = q + st * Ht - K.x, j = yt + Ct * Ht - K.y;
          const Q = bt * bt + j * j;
          if (Q <= 2)
            return new at(bt, j);
          gt = Math.sqrt(Q / 2);
        } else {
          let X = !1;
          st > Number.EPSILON ? mt > Number.EPSILON && (X = !0) : st < -Number.EPSILON ? mt < -Number.EPSILON && (X = !0) : Math.sign(Ct) === Math.sign(T) && (X = !0), X ? (bt = -Ct, j = st, gt = Math.sqrt(v)) : (bt = st, j = Ct, gt = Math.sqrt(v / 2));
        }
        return new at(bt / gt, j / gt);
      }
      const ot = [];
      for (let K = 0, et = V.length, b = et - 1, bt = K + 1; K < et; K++, b++, bt++)
        b === et && (b = 0), bt === et && (bt = 0), ot[K] = k(V[K], V[b], V[bt]);
      const pt = [];
      let Mt, Nt = ot.concat();
      for (let K = 0, et = w.length; K < et; K++) {
        const b = w[K];
        Mt = [];
        for (let bt = 0, j = b.length, gt = j - 1, st = bt + 1; bt < j; bt++, gt++, st++)
          gt === j && (gt = 0), st === j && (st = 0), Mt[bt] = k(b[bt], b[gt], b[st]);
        pt.push(Mt), Nt = Nt.concat(Mt);
      }
      for (let K = 0; K < m; K++) {
        const et = K / m, b = p * Math.cos(et * Math.PI / 2), bt = _ * Math.sin(et * Math.PI / 2) + M;
        for (let j = 0, gt = V.length; j < gt; j++) {
          const st = Z(V[j], ot[j], bt);
          rt(st.x, st.y, -b);
        }
        for (let j = 0, gt = w.length; j < gt; j++) {
          const st = w[j];
          Mt = pt[j];
          for (let Ct = 0, mt = st.length; Ct < mt; Ct++) {
            const T = Z(st[Ct], Mt[Ct], bt);
            rt(T.x, T.y, -b);
          }
        }
      }
      const Yt = _ + M;
      for (let K = 0; K < H; K++) {
        const et = d ? Z(x[K], Nt[K], Yt) : x[K];
        g ? (C.copy(N.normals[0]).multiplyScalar(et.x), R.copy(N.binormals[0]).multiplyScalar(et.y), P.copy(y[0]).add(C).add(R), rt(P.x, P.y, P.z)) : rt(et.x, et.y, 0);
      }
      for (let K = 1; K <= h; K++)
        for (let et = 0; et < H; et++) {
          const b = d ? Z(x[et], Nt[et], Yt) : x[et];
          g ? (C.copy(N.normals[K]).multiplyScalar(b.x), R.copy(N.binormals[K]).multiplyScalar(b.y), P.copy(y[K]).add(C).add(R), rt(P.x, P.y, P.z)) : rt(b.x, b.y, f / h * K);
        }
      for (let K = m - 1; K >= 0; K--) {
        const et = K / m, b = p * Math.cos(et * Math.PI / 2), bt = _ * Math.sin(et * Math.PI / 2) + M;
        for (let j = 0, gt = V.length; j < gt; j++) {
          const st = Z(V[j], ot[j], bt);
          rt(st.x, st.y, f + b);
        }
        for (let j = 0, gt = w.length; j < gt; j++) {
          const st = w[j];
          Mt = pt[j];
          for (let Ct = 0, mt = st.length; Ct < mt; Ct++) {
            const T = Z(st[Ct], Mt[Ct], bt);
            g ? rt(T.x, T.y + y[h - 1].y, y[h - 1].x + b) : rt(T.x, T.y, f + b);
          }
        }
      }
      Y(), nt();
      function Y() {
        const K = r.length / 3;
        if (d) {
          let et = 0, b = H * et;
          for (let bt = 0; bt < tt; bt++) {
            const j = O[bt];
            wt(j[2] + b, j[1] + b, j[0] + b);
          }
          et = h + m * 2, b = H * et;
          for (let bt = 0; bt < tt; bt++) {
            const j = O[bt];
            wt(j[0] + b, j[1] + b, j[2] + b);
          }
        } else {
          for (let et = 0; et < tt; et++) {
            const b = O[et];
            wt(b[2], b[1], b[0]);
          }
          for (let et = 0; et < tt; et++) {
            const b = O[et];
            wt(b[0] + H * h, b[1] + H * h, b[2] + H * h);
          }
        }
        n.addGroup(K, r.length / 3 - K, 0);
      }
      function nt() {
        const K = r.length / 3;
        let et = 0;
        St(V, et), et += V.length;
        for (let b = 0, bt = w.length; b < bt; b++) {
          const j = w[b];
          St(j, et), et += j.length;
        }
        n.addGroup(K, r.length / 3 - K, 1);
      }
      function St(K, et) {
        let b = K.length;
        for (; --b >= 0; ) {
          const bt = b;
          let j = b - 1;
          j < 0 && (j = K.length - 1);
          for (let gt = 0, st = h + m * 2; gt < st; gt++) {
            const Ct = H * gt, mt = H * (gt + 1), T = et + bt + Ct, v = et + j + Ct, F = et + j + mt, X = et + bt + mt;
            Ut(T, v, F, X);
          }
        }
      }
      function rt(K, et, b) {
        l.push(K), l.push(et), l.push(b);
      }
      function wt(K, et, b) {
        Lt(K), Lt(et), Lt(b);
        const bt = r.length / 3, j = A.generateTopUV(n, r, bt - 3, bt - 2, bt - 1);
        Wt(j[0]), Wt(j[1]), Wt(j[2]);
      }
      function Ut(K, et, b, bt) {
        Lt(K), Lt(et), Lt(bt), Lt(et), Lt(b), Lt(bt);
        const j = r.length / 3, gt = A.generateSideWallUV(n, r, j - 6, j - 3, j - 2, j - 1);
        Wt(gt[0]), Wt(gt[1]), Wt(gt[3]), Wt(gt[1]), Wt(gt[2]), Wt(gt[3]);
      }
      function Lt(K) {
        r.push(l[K * 3 + 0]), r.push(l[K * 3 + 1]), r.push(l[K * 3 + 2]);
      }
      function Wt(K) {
        s.push(K.x), s.push(K.y);
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes, n = this.parameters.options;
    return bf(e, n, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, a = t.shapes.length; s < a; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    const r = t.options.extrudePath;
    return r !== void 0 && (t.options.extrudePath = new br[r.type]().fromJSON(r)), new Sa(n, t.options);
  }
}
const Af = {
  generateTopUV: function(i, t, e, n, r) {
    const s = t[e * 3], a = t[e * 3 + 1], o = t[n * 3], l = t[n * 3 + 1], c = t[r * 3], h = t[r * 3 + 1];
    return [
      new at(s, a),
      new at(o, l),
      new at(c, h)
    ];
  },
  generateSideWallUV: function(i, t, e, n, r, s) {
    const a = t[e * 3], o = t[e * 3 + 1], l = t[e * 3 + 2], c = t[n * 3], h = t[n * 3 + 1], f = t[n * 3 + 2], d = t[r * 3], p = t[r * 3 + 1], _ = t[r * 3 + 2], M = t[s * 3], m = t[s * 3 + 1], u = t[s * 3 + 2];
    return Math.abs(o - h) < Math.abs(a - c) ? [
      new at(a, 1 - l),
      new at(c, 1 - f),
      new at(d, 1 - _),
      new at(M, 1 - u)
    ] : [
      new at(o, 1 - l),
      new at(h, 1 - f),
      new at(p, 1 - _),
      new at(m, 1 - u)
    ];
  }
};
function bf(i, t, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let n = 0, r = i.length; n < r; n++) {
      const s = i[n];
      e.shapes.push(s.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e.options = Object.assign({}, t), t.extrudePath !== void 0 && (e.options.extrudePath = t.extrudePath.toJSON()), e;
}
class ya extends Vi {
  constructor(t = 1, e = 0) {
    const n = (1 + Math.sqrt(5)) / 2, r = [
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      0,
      0,
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      n,
      0,
      -1,
      n,
      0,
      1,
      -n,
      0,
      -1,
      -n,
      0,
      1
    ], s = [
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    ];
    super(r, s, t, e), this.type = "IcosahedronGeometry", this.parameters = {
      radius: t,
      detail: e
    };
  }
  static fromJSON(t) {
    return new ya(t.radius, t.detail);
  }
}
class Ea extends Me {
  constructor(t = 0.5, e = 1, n = 32, r = 1, s = 0, a = Math.PI * 2) {
    super(), this.type = "RingGeometry", this.parameters = {
      innerRadius: t,
      outerRadius: e,
      thetaSegments: n,
      phiSegments: r,
      thetaStart: s,
      thetaLength: a
    }, n = Math.max(3, n), r = Math.max(1, r);
    const o = [], l = [], c = [], h = [];
    let f = t;
    const d = (e - t) / r, p = new L(), _ = new at();
    for (let M = 0; M <= r; M++) {
      for (let m = 0; m <= n; m++) {
        const u = s + m / n * a;
        p.x = f * Math.cos(u), p.y = f * Math.sin(u), l.push(p.x, p.y, p.z), c.push(0, 0, 1), _.x = (p.x / e + 1) / 2, _.y = (p.y / e + 1) / 2, h.push(_.x, _.y);
      }
      f += d;
    }
    for (let M = 0; M < r; M++) {
      const m = M * (n + 1);
      for (let u = 0; u < n; u++) {
        const A = u + m, y = A, g = A + n + 1, N = A + n + 2, R = A + 1;
        o.push(y, g, R), o.push(g, N, R);
      }
    }
    this.setIndex(o), this.setAttribute("position", new ie(l, 3)), this.setAttribute("normal", new ie(c, 3)), this.setAttribute("uv", new ie(h, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ea(t.innerRadius, t.outerRadius, t.thetaSegments, t.phiSegments, t.thetaStart, t.thetaLength);
  }
}
class Ta extends Me {
  constructor(t = 1, e = 32, n = 16, r = 0, s = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: e,
      heightSegments: n,
      phiStart: r,
      phiLength: s,
      thetaStart: a,
      thetaLength: o
    }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
    const l = Math.min(a + o, Math.PI);
    let c = 0;
    const h = [], f = new L(), d = new L(), p = [], _ = [], M = [], m = [];
    for (let u = 0; u <= n; u++) {
      const A = [], y = u / n;
      let g = 0;
      u === 0 && a === 0 ? g = 0.5 / e : u === n && l === Math.PI && (g = -0.5 / e);
      for (let N = 0; N <= e; N++) {
        const R = N / e;
        f.x = -t * Math.cos(r + R * s) * Math.sin(a + y * o), f.y = t * Math.cos(a + y * o), f.z = t * Math.sin(r + R * s) * Math.sin(a + y * o), _.push(f.x, f.y, f.z), d.copy(f).normalize(), M.push(d.x, d.y, d.z), m.push(R + g, 1 - y), A.push(c++);
      }
      h.push(A);
    }
    for (let u = 0; u < n; u++)
      for (let A = 0; A < e; A++) {
        const y = h[u][A + 1], g = h[u][A], N = h[u + 1][A], R = h[u + 1][A + 1];
        (u !== 0 || a > 0) && p.push(y, g, R), (u !== n - 1 || l < Math.PI) && p.push(g, N, R);
      }
    this.setIndex(p), this.setAttribute("position", new ie(_, 3)), this.setAttribute("normal", new ie(M, 3)), this.setAttribute("uv", new ie(m, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ta(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Aa extends Me {
  constructor(t = 1, e = 0.4, n = 12, r = 48, s = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: t,
      tube: e,
      radialSegments: n,
      tubularSegments: r,
      arc: s
    }, n = Math.floor(n), r = Math.floor(r);
    const a = [], o = [], l = [], c = [], h = new L(), f = new L(), d = new L();
    for (let p = 0; p <= n; p++)
      for (let _ = 0; _ <= r; _++) {
        const M = _ / r * s, m = p / n * Math.PI * 2;
        f.x = (t + e * Math.cos(m)) * Math.cos(M), f.y = (t + e * Math.cos(m)) * Math.sin(M), f.z = e * Math.sin(m), o.push(f.x, f.y, f.z), h.x = t * Math.cos(M), h.y = t * Math.sin(M), d.subVectors(f, h).normalize(), l.push(d.x, d.y, d.z), c.push(_ / r), c.push(p / n);
      }
    for (let p = 1; p <= n; p++)
      for (let _ = 1; _ <= r; _++) {
        const M = (r + 1) * p + _ - 1, m = (r + 1) * (p - 1) + _ - 1, u = (r + 1) * (p - 1) + _, A = (r + 1) * p + _;
        a.push(M, m, A), a.push(m, u, A);
      }
    this.setIndex(a), this.setAttribute("position", new ie(o, 3)), this.setAttribute("normal", new ie(l, 3)), this.setAttribute("uv", new ie(c, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Aa(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class Vf extends gn {
  static get type() {
    return "MeshPhongMaterial";
  }
  constructor(t) {
    super(), this.isMeshPhongMaterial = !0, this.color = new Vt(16777215), this.specular = new Vt(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Vt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new at(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Fe(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.specular.copy(t.specular), this.shininess = t.shininess, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class Hf extends gn {
  static get type() {
    return "MeshLambertMaterial";
  }
  constructor(t) {
    super(), this.isMeshLambertMaterial = !0, this.color = new Vt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Vt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new at(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Fe(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class ba extends ue {
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Vt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
class kf extends ba {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(ue.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Vt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const yr = /* @__PURE__ */ new jt(), Ws = /* @__PURE__ */ new L(), Xs = /* @__PURE__ */ new L();
class Rf {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new at(512, 512), this.map = null, this.mapPass = null, this.matrix = new jt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Cr(), this._frameExtents = new at(1, 1), this._viewportCount = 1, this._viewports = [
      new ae(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    Ws.setFromMatrixPosition(t.matrixWorld), e.position.copy(Ws), Xs.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Xs), e.updateMatrixWorld(), yr.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(yr), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(yr);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}
class wf extends Rf {
  constructor() {
    super(new sa(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Wf extends ba {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ue.DEFAULT_UP), this.updateMatrix(), this.target = new ue(), this.shadow = new wf();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: "170"
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "170");
export {
  Lf as A,
  Ne as B,
  Vt as C,
  ga as D,
  Fe as E,
  ie as F,
  Ci as G,
  kf as H,
  ya as I,
  Cf as J,
  Df as L,
  Hf as M,
  zi as P,
  si as Q,
  Nf as R,
  be as S,
  Aa as T,
  Uf as U,
  L as V,
  Of as W,
  Au as a,
  Ie as b,
  Vf as c,
  Ta as d,
  _a as e,
  Ur as f,
  ai as g,
  Me as h,
  jt as i,
  of as j,
  Sa as k,
  zf as l,
  Ff as m,
  Ea as n,
  js as o,
  Js as p,
  nn as q,
  Gf as r,
  Is as s,
  De as t,
  ua as u,
  Wu as v,
  If as w,
  Pf as x,
  Wf as y,
  Bf as z
};
