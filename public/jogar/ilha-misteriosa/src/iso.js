/* =====================================================================
 * iso.js — Projeção isométrica 2:1, 8 direções e pathfinding (A*)
 * O grid lógico continua ortogonal 64x64; isométrico é só a projeção.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const TW = Config.ISO_TW, TH = Config.ISO_TH;

  /** Heap binário mínimo (menor f primeiro). */
  class Heap {
    constructor() { this.a = []; }
    get size() { return this.a.length; }
    push(n) {
      const a = this.a; a.push(n);
      let i = a.length - 1;
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (a[p].f <= a[i].f) break;
        [a[p], a[i]] = [a[i], a[p]]; i = p;
      }
    }
    pop() {
      const a = this.a; const top = a[0]; const last = a.pop();
      if (a.length) {
        a[0] = last; let i = 0;
        for (;;) {
          const l = i * 2 + 1, r = l + 1; let m = i;
          if (l < a.length && a[l].f < a[m].f) m = l;
          if (r < a.length && a[r].f < a[m].f) m = r;
          if (m === i) break;
          [a[m], a[i]] = [a[i], a[m]]; i = m;
        }
      }
      return top;
    }
  }

  const Iso = {
    TW, TH,

    /** Centro do losango do tile (x,y) em coordenadas de "mundo-tela". */
    toScreen(x, y) { return { x: ((x - y) * TW) / 2, y: ((x + y) * TH) / 2 }; },
    /** Inverso (valores fracionários de grid). */
    toGrid(sx, sy) { return { x: sy / TH + sx / TW, y: sy / TH - sx / TW }; },
    tileAt(sx, sy) { const g = this.toGrid(sx, sy); return { x: Math.round(g.x), y: Math.round(g.y) }; },

    /** Nome da direção (tela) para um passo (dx,dy) do grid. */
    dirName(dx, dy) {
      const sx = Math.sign(dx), sy = Math.sign(dy);
      const D = Config.DIR8;
      for (const k of Object.keys(D)) if (D[k][0] === sx && D[k][1] === sy) return k;
      return null;
    },

    /** Direção de tela (WASD) -> passo do grid. */
    screenDirToGrid(sxDir, syDir) {
      // tela: direita = (+1,-1), baixo = (+1,+1)
      const gx = syDir + sxDir, gy = syDir - sxDir;
      return [Math.sign(gx), Math.sign(gy)];
    },

    /**
     * A* em 8 vizinhos, sem cortar quinas.
     * opts: { sx, sy, isGoal(x,y), walkable(x,y), cost(x,y), w, h, hx, hy, slack, maxNodes }
     * Retorna lista de [x,y] (sem o ponto inicial) ou null.
     */
    findPath(o) {
      const { sx, sy, isGoal, walkable, cost, w, h } = o;
      const maxNodes = o.maxNodes || 6000;
      const hx = o.hx != null ? o.hx : sx, hy = o.hy != null ? o.hy : sy, slack = o.slack || 0;
      const D = Config.DIAG_COST;
      const heur = (x, y) => {
        const dx = Math.abs(x - hx), dy = Math.abs(y - hy);
        return Math.max(0, (dx + dy) + (D - 2) * Math.min(dx, dy) - slack);
      };
      const key = (x, y) => y * w + x;
      const best = new Map(); const from = new Map();
      const heap = new Heap();
      best.set(key(sx, sy), 0);
      heap.push({ x: sx, y: sy, g: 0, f: heur(sx, sy) });
      let expanded = 0;
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      while (heap.size && expanded < maxNodes) {
        const n = heap.pop();
        if (n.g > (best.get(key(n.x, n.y)) ?? Infinity) + 1e-9) continue;
        expanded++;
        if ((n.x !== sx || n.y !== sy) && isGoal(n.x, n.y)) {
          const path = []; let k = key(n.x, n.y);
          while (k !== key(sx, sy)) { path.push([k % w, Math.floor(k / w)]); k = from.get(k); }
          return path.reverse();
        }
        for (const [dx, dy] of dirs) {
          const nx = n.x + dx, ny = n.y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h || !walkable(nx, ny)) continue;
          const diag = dx !== 0 && dy !== 0;
          if (diag && (!walkable(n.x + dx, n.y) || !walkable(n.x, n.y + dy))) continue; // sem cortar quina
          const g = n.g + cost(nx, ny) * (diag ? D : 1);
          const k = key(nx, ny);
          if (g < (best.get(k) ?? Infinity) - 1e-9) {
            best.set(k, g); from.set(k, key(n.x, n.y));
            heap.push({ x: nx, y: ny, g, f: g + heur(nx, ny) });
          }
        }
      }
      return null;
    },
  };

  Ilha.Iso = Iso;
})();
