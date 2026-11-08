/* =====================================================================
 * routines.js — Rotinas: atividades cotidianas viram um botão.
 * Depois da 1ª vez à mão, o jogador escolhe só QUANTOS peixes, águas ou
 * raízes quer; Cyrus faz o ciclo inteiro (ir, coletar, voltar, fogueira,
 * assar/ferver, comer, guardar) e a janela mostra o saldo líquido de
 * esforço. Resultado garantido: as falhas entram na média do custo.
 * Cada rotina sai do ponto atual e volta a ele.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const B = Config.BIO;
  const D = () => Ilha.State.data;
  const C = () => Ilha.Crafting;
  const key = (x, y) => x + ',' + y;
  const N8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

  const MAX_RADIUS = 15;        // alcance (tiles) para fogueira e armazém
  const MAX_COST = 90;          // custo máximo de caminhada (min) até o recurso
  const FISH_YIELD = 0.85 * 1 + 0.15 * 2;   // peixes por acerto (média)
  const P_FISH = { river: 0.65, sea: 0.55 };
  const P_ROOT = 0.55, ROOT_YIELD = 1.5, ROOT_PER_TRY = P_ROOT * ROOT_YIELD;
  const KCAL = { cooked_fish: 260, root: 220 };
  const EAT_MIN = { cooked_fish: 6, root: 5 };
  const MAX_N = { fish: 20, water: 40, roots: 20 };

  const fmtMin = (m) => { m = Math.round(m); const h = Math.floor(m / 60); return h ? `${h} h ${String(m % 60).padStart(2, '0')} min` : `${m} min`; };

  // ------------------------------------------------------------
  // Caminhos: Dijkstra com os mesmos custos de terreno do jogo
  // ------------------------------------------------------------
  function distMap(sx, sy, maxCost) {
    const W = Ilha.World; const DC = Config.DIAG_COST;
    const best = new Map(); const heap = [];
    const push = (n) => { heap.push(n); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p][0] <= heap[i][0]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
    const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let l = 2 * i + 1, r = l + 1, m = i; if (l < heap.length && heap[l][0] < heap[m][0]) m = l; if (r < heap.length && heap[r][0] < heap[m][0]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
    best.set(key(sx, sy), 0); push([0, sx, sy]);
    while (heap.length) {
      const [g, x, y] = pop();
      if (g > (best.get(key(x, y)) ?? Infinity) + 1e-9) continue;
      for (const [dx, dy] of N8) {
        const nx = x + dx, ny = y + dy;
        if (!W.isWalkable(nx, ny)) continue;
        const diag = dx !== 0 && dy !== 0;
        if (diag && (!W.isWalkable(x + dx, y) || !W.isWalkable(x, y + dy))) continue;
        const ng = g + Config.TERRAIN[W.terrainAt(nx, ny)].cost * (diag ? DC : 1);
        if (ng > maxCost) continue;
        const k = key(nx, ny);
        if (ng < (best.get(k) ?? Infinity) - 1e-9) { best.set(k, ng); push([ng, nx, ny]); }
      }
    }
    return best;
  }

  /** Contexto da rotina: posição, mapa de distâncias e os pontos úteis (fogueira, armazém). */
  function context() {
    const p = D().player; const W = Ilha.World;
    const dm = distMap(p.x, p.y, MAX_COST);
    // custo para ficar ao lado de um objeto em (ox,oy)
    const costNextTo = (ox, oy) => {
      let best = null;
      for (const [dx, dy] of N8) { const c = dm.get(key(ox + dx, oy + dy)); if (c != null && (best == null || c < best)) best = c; }
      if (Math.max(Math.abs(ox - p.x), Math.abs(oy - p.y)) <= 1) best = 0;
      return best;
    };
    let fire = null; let store = null;
    for (let dy = -MAX_RADIUS; dy <= MAX_RADIUS; dy++) {
      for (let dx = -MAX_RADIUS; dx <= MAX_RADIUS; dx++) {
        const x = p.x + dx, y = p.y + dy;
        const o = W.objectAt(x, y);
        if (!o) continue;
        if (o === 'CAMPFIRE_LIT' || o === 'CAMPFIRE_UNLIT' || o === 'FIREPLACE_LIT' || o === 'FIREPLACE_UNLIT') {
          const c = costNextTo(x, y);
          if (c != null && (!fire || c < fire.cost)) fire = { x, y, cost: c, lit: o.endsWith('_LIT'), obj: o };
        } else if (Config.OBJECTS[o] && Config.OBJECTS[o].station === 'chest' && Ilha.Stations.get(x, y)) {
          const c = costNextTo(x, y);
          if (c != null && (!store || c < store.cost)) store = { x, y, cost: c, obj: o };
        }
      }
    }
    return { p, dm, fire, store, costNextTo };
  }

  /** Ponto em terra (não aquático) ao lado de algum terreno de `kinds`; o mais barato de alcançar. */
  function waterSpot(cx, kinds) {
    const W = Ilha.World; let best = null;
    cx.dm.forEach((cost, k) => {
      if (best && cost >= best.cost) return;
      const [x, y] = k.split(',').map(Number);
      if (Config.TERRAIN[W.terrainAt(x, y)].water) return;
      for (const [dx, dy] of N8) {
        const t = W.terrainAt(x + dx, y + dy);
        if (kinds.includes(t)) { best = { x, y, cost, kind: t }; return; }
      }
    });
    return best;
  }

  // ------------------------------------------------------------
  // Construção do plano (fases) — compartilhada por plan() e run()
  // ------------------------------------------------------------
  const Routines = {
    MAX_N, KCAL,

    /** Liberada depois da 1ª vez à mão (ou já vista em saves antigos). */
    unlocked(id) {
      const d = D(); if (!d) return false;
      const cr = d.player.crafted; const cat = d.catalog || {};
      if (id === 'fish') return !!(cr.first_fish || cat['Peixes']);
      if (id === 'roots') return !!(cr.first_roots || cat['Raízes Comestíveis']);
      if (id === 'water') return !!(cr.first_water || cr.boiled_water || cr.boiled_water_5);
      return false;
    },

    DEFS: {
      fish: { name: 'Pescar', icon: '🐟', unit: 'peixes', hint: 'Pesque uma vez com a Lança para liberar esta rotina.' },
      water: { name: 'Buscar água', icon: '💧', unit: 'porções de água', hint: 'Colete água do rio uma vez para liberar esta rotina.' },
      roots: { name: 'Buscar raízes', icon: '🥔', unit: 'raízes', hint: 'Ache raízes cavando o solo uma vez para liberar esta rotina.' },
    },

    defaults(id) {
      if (id === 'fish') return { n: 3, cook: true, eat: true, store: false };
      if (id === 'water') return { n: 5, boil: true, store: false };
      return { n: 3, eat: true, store: false };
    },

    /** Calcula o plano para n unidades (limitado ao máximo viável). Não altera o jogo. */
    plan(id, n, opts) {
      opts = Object.assign(this.defaults(id), opts || {});
      const cx = context();
      const top = Math.min(MAX_N[id], this._capacity(id, cx).max);
      const want = Math.max(1, Math.min(n || 1, MAX_N[id]));
      let maxN = 0; let planMax = null;
      for (let k = top; k >= 1; k--) { const t = this._build(id, k, opts, cx); if (t.ok) { maxN = k; planMax = t; break; } }
      let best;
      if (!maxN) best = this._build(id, 1, opts, cx);
      else if (want >= maxN) best = planMax;
      else { best = this._build(id, want, opts, cx); if (!best.ok) best = planMax; }
      best.requested = want; best.maxN = maxN; best.opts = opts;
      if (!best.ok && !best.blockers.length) best.blockers.push('Não dá para fazer agora.');
      return best;
    },

    /** Limites simples por peso/recursos (acelera a busca do maior n). */
    _capacity(id, cx) {
      const room = (item) => C().room(item);
      if (id === 'fish') return { max: Math.max(1, room('raw_fish')) };
      if (id === 'water') return { max: Math.max(1, room('dirty_water')) };
      return { max: MAX_N.roots };
    },

    _walk(label, cost, tag) {
      return { kind: 'walk', tag: tag || '', label, reps: 1, minutes: cost, kcal: B.WALK_KCAL_PER_MIN * cost, stamina: B.WALK_STAMINA_PER_MIN * cost, hyd: -B.WALK_HYD_PER_MIN * cost, hygiene: 0 };
    },

    /** Fases de ir até a fogueira, acendê-la e deixá-la com lenha para o tempo de uso. */
    _firePhases(cx, useMinutes, notes, blockers) {
      const fire = cx.fire; const W = D().world; const out = []; const needs = { branch: 0, log: 0 };
      if (fire.cost > 0) out.push(this._walk('Ir até a fogueira', fire.cost, 'tofire'));
      const wet = Ilha.State.weather().wet; const wr = Ilha.State.weather().fuel;
      let cur = fire.lit ? (W.fires[key(fire.x, fire.y)] || 0) : 0;
      if (!fire.lit) {
        const pl = wet ? 0.4 : 0.85;
        if (C().count('stone') < 1 || C().count('wood_branch') < 1) blockers.push('Para acender a fogueira falta 1 Pedra e 1 Galho.');
        out.push({ kind: 'light', label: 'Acender a fogueira', reps: 1, minutes: 10 / pl, kcal: 15 / pl, stamina: 2 / pl, hyd: 0, hygiene: 0, fire });
        needs.branch += 1; cur = 2;
      }
      const need = (useMinutes / 60) * wr + 0.3;
      const add = Math.max(0, need - cur);
      if (add > 0) {
        const haveBr = C().count('wood_branch') - needs.branch; const haveLog = C().count('log');
        let logs = 0; let brs = 0; let left = add;
        if (left > 1.5 && haveLog > 0) { logs = Math.min(haveLog, Math.ceil(left / 4)); left -= logs * 4; }
        if (left > 0) brs = Math.ceil(left) * 3;
        if (brs > haveBr) blockers.push('Faltam galhos ou toras para manter a fogueira acesa durante o preparo.');
        else {
          needs.log += logs; needs.branch += brs;
          if (logs) out.push({ kind: 'fuel', label: 'Alimentar o fogo (toras)', reps: logs, minutes: 3, kcal: 3, stamina: 0, hyd: 0, hygiene: 0, fire, item: 'log', hours: 4, qty: 1 });
          if (brs) out.push({ kind: 'fuel', label: 'Alimentar o fogo (galhos)', reps: brs / 3, minutes: 3, kcal: 3, stamina: 0, hyd: 0, hygiene: 0, fire, item: 'wood_branch', hours: 1, qty: 3 });
        }
      }
      return { phases: out, needs };
    },

    _build(id, n, opts, cx) {
      const d = D(); const st = d.player.stats; const S = Ilha.State;
      const blockers = []; const notes = []; let phases = [];
      let items = {}; let foodKcal = 0; let eatKcal = 0; let eatN = 0;
      const timeMult = Ilha.Player.timeMult(); const staMult = Ilha.Player.staminaMult();
      const room = (item) => C().room(item);
      const totalsSoFar = () => {
        let m = 0; let k = 0;
        phases.forEach((p) => { m += p.reps * p.minutes; k += p.reps * p.kcal; });
        return { m: m * timeMult, k };
      };
      const calAfterSoFar = () => { const t = totalsSoFar(); return st.calories - t.k - (t.m / 60) * B.BASAL_KCAL_H; };

      if (id === 'fish') {
        if (C().count('wood_spear') < 1) blockers.push('Precisa de uma Lança de Madeira na mochila.');
        const river = waterSpot(cx, ['RIVER_WATER']); const sea = waterSpot(cx, ['SHALLOW_WATER']);
        let spot = river;
        if (!river || (sea && sea.cost + 10 < river.cost)) spot = sea;
        if (!spot) blockers.push('Não há água de pesca ao alcance.');
        else {
          const p = spot.kind === 'RIVER_WATER' ? P_FISH.river : P_FISH.sea;
          const fpa = p * FISH_YIELD;
          if (n > room('raw_fish')) blockers.push('A mochila não aguenta tantos peixes.');
          phases.push(this._walk('Ir até ' + (spot.kind === 'RIVER_WATER' ? 'o rio' : 'o mar raso'), spot.cost, 'out'));
          phases.push({ kind: 'fish', label: 'Pescar', reps: n, minutes: 25 / fpa, kcal: 45 / fpa, stamina: 6 / fpa, hyd: 0, hygiene: -1 / fpa, spot });
          phases.push(this._walk('Voltar', spot.cost, 'back'));
          items.raw_fish = n;
          let cooked = false;
          if (opts.cook) {
            if (!cx.fire) notes.push('Sem fogueira por perto (até ' + MAX_RADIUS + ' tiles): o peixe volta cru e não dá para comer com segurança.');
            else {
              const cookMin = 25 * Math.floor(n / 4) + 15 * (n % 4);
              const eatCap = opts.eat ? n : 0;
              const fp = this._firePhases(cx, cookMin + eatCap * EAT_MIN.cooked_fish, notes, blockers);
              phases.push(...fp.phases);
              if (Math.floor(n / 4)) phases.push({ kind: 'cook', label: 'Assar em lote (4×)', reps: Math.floor(n / 4), minutes: 25, kcal: 20, stamina: 2, hyd: 0, hygiene: 0, per: 4 });
              if (n % 4) phases.push({ kind: 'cook', label: 'Assar', reps: n % 4, minutes: 15, kcal: 10, stamina: 1, hyd: 0, hygiene: 0, per: 1 });
              cooked = true; items = { cooked_fish: n };
              if (opts.eat) {
                eatN = Math.max(0, Math.min(n, Math.floor((B.MAX_CALORIES * 0.97 - calAfterSoFar()) / KCAL.cooked_fish)));
                if (eatN) { phases.push({ kind: 'eat', label: 'Comer', reps: eatN, minutes: EAT_MIN.cooked_fish, kcal: 0, stamina: 0, hyd: 0, hygiene: 0, item: 'cooked_fish' }); eatKcal = eatN * KCAL.cooked_fish; }
                else notes.push('Você já está saciado: o peixe fica guardado.');
              }
              if (cx.fire.cost > 0) phases.push(this._walk('Voltar ao ponto de partida', cx.fire.cost, 'fromfire'));
            }
          }
          foodKcal = n * KCAL.cooked_fish;
          if (!cooked) foodKcal = 0;
          void cooked;
        }
      } else if (id === 'water') {
        const spot = waterSpot(cx, ['RIVER_WATER', 'IRRIGATION_CANAL']);
        if (!spot) blockers.push('Não há rio ou canal ao alcance.');
        else {
          if (n > room('dirty_water')) blockers.push('A mochila não aguenta tanta água.');
          const trips = Math.ceil(n / 2);
          phases.push(this._walk('Ir até a água', spot.cost, 'out'));
          phases.push({ kind: 'collect', label: 'Coletar água suja', reps: trips, minutes: 5, kcal: 3, stamina: 0, hyd: 0, hygiene: 0 });
          phases.push(this._walk('Voltar', spot.cost, 'back'));
          items.dirty_water = n;
          if (opts.boil) {
            if (!cx.fire) notes.push('Sem fogueira por perto: a água continua suja (arriscado beber).');
            else {
              const boilMin = 30 * Math.floor(n / 5) + 12 * (n % 5);
              const fp = this._firePhases(cx, boilMin, notes, blockers);
              phases.push(...fp.phases);
              if (Math.floor(n / 5)) phases.push({ kind: 'boil', label: 'Ferver em lote (5×)', reps: Math.floor(n / 5), minutes: 30, kcal: 10, stamina: 2, hyd: 0, hygiene: 0, per: 5 });
              if (n % 5) phases.push({ kind: 'boil', label: 'Ferver', reps: n % 5, minutes: 12, kcal: 5, stamina: 1, hyd: 0, hygiene: 0, per: 1 });
              if (cx.fire.cost > 0) phases.push(this._walk('Voltar ao ponto de partida', cx.fire.cost, 'fromfire'));
              items = { boiled_water: n };
            }
          }
        }
      } else if (id === 'roots') {
        const W = Ilha.World; const day = d.time.day; const tiles = [];
        cx.dm.forEach((cost, k) => {
          const [x, y] = k.split(',').map(Number);
          const t = W.terrainAt(x, y);
          if ((t !== 'GRASS' && t !== 'JUNGLE_FLOOR') || W.objectAt(x, y) || W.floorAt(x, y) || (d.world.dug[k] || 0) > day) return;
          if (Ilha.Sites && Ilha.Sites.siteAt(x, y)) return;
          tiles.push({ x, y, cost });
        });
        tiles.sort((a, b) => a.cost - b.cost);
        const tries = Math.ceil(n / ROOT_PER_TRY);
        if (n > room('root')) blockers.push('A mochila não aguenta tantas raízes.');
        if (tiles.length < tries) blockers.push(`Só há ${tiles.length} pontos de escavação livres por perto (cada um descansa 3 dias).`);
        else {
          const pick = tiles.slice(0, tries);
          // encadeia pelo vizinho mais próximo
          const chain = []; const left = pick.slice(); let cur = left.shift(); chain.push(cur);
          while (left.length) { let bi = 0; let bd = Infinity; left.forEach((t, i) => { const dd = Math.max(Math.abs(t.x - cur.x), Math.abs(t.y - cur.y)); if (dd < bd) { bd = dd; bi = i; } }); cur = left.splice(bi, 1)[0]; chain.push(cur); }
          let hop = 0; for (let i = 1; i < chain.length; i++) hop += Math.max(Math.abs(chain[i].x - chain[i - 1].x), Math.abs(chain[i].y - chain[i - 1].y));
          phases.push(this._walk('Ir até o solo bom', chain[0].cost, 'out'));
          if (hop > 0) phases.push(this._walk('Andar entre os pontos de escavação', hop, 'hop'));
          phases.push({ kind: 'dig', label: 'Cavar raízes', reps: tries, minutes: 25, kcal: 50, stamina: 8, hyd: 0, hygiene: -3, chain, total: n });
          phases.push(this._walk('Voltar', chain[chain.length - 1].cost, 'back'));
          items.root = n; foodKcal = n * KCAL.root;
          if (opts.eat) {
            eatN = Math.max(0, Math.min(n, Math.floor((B.MAX_CALORIES * 0.97 - calAfterSoFar()) / KCAL.root)));
            if (eatN) { phases.push({ kind: 'eat', label: 'Comer', reps: eatN, minutes: EAT_MIN.root, kcal: 0, stamina: 0, hyd: 0, hygiene: 0, item: 'root' }); eatKcal = eatN * KCAL.root; }
            else notes.push('Você já está saciado: as raízes ficam guardadas.');
          }
        }
      }

      // guardar o que sobrou no armazém mais próximo
      let stored = null;
      if (opts.store) {
        if (!cx.store) notes.push('Sem caixote ou baú por perto (até ' + MAX_RADIUS + ' tiles): nada foi guardado.');
        else {
          const goodId = Object.keys(items)[0];
          let left = items[goodId] || 0;
          if (goodId === 'cooked_fish' || goodId === 'root') left -= eatN;
          if (left > 0) {
            if (cx.store.cost > 0) phases.push(this._walk('Ir ao armazém', cx.store.cost, 'tostore'));
            phases.push({ kind: 'store', label: 'Guardar no ' + (cx.store.obj === 'CHEST' ? 'baú' : 'caixote'), reps: 1, minutes: 2, kcal: 1, stamina: 0, hyd: 0, hygiene: 0, store: cx.store, item: goodId, qty: left });
            if (cx.store.cost > 0) phases.push(this._walk('Voltar ao ponto de partida', cx.store.cost, 'fromstore'));
            stored = { item: goodId, qty: left };
          }
        }
      }

      // totais
      let minutes = 0; let kcal = 0; let sta = 0; let hyd = 0; let hyg = 0; let walkMin = 0;
      phases.forEach((p) => {
        minutes += p.reps * p.minutes; kcal += p.reps * p.kcal; sta += p.reps * p.stamina; hyd += p.reps * p.hyd; hyg += p.reps * p.hygiene;
        if (p.kind === 'walk') walkMin += p.reps * p.minutes;
      });
      minutes *= timeMult; walkMin *= timeMult; sta *= staMult;
      const hours = minutes / 60;
      const sunny = S.sunStrong() && !Ilha.Player.nearShelter();
      const hydLoss = hours * (sunny ? B.HYDRATION_SUN_H : B.HYDRATION_H) - hyd;
      const basal = hours * B.BASAL_KCAL_H;
      const net = eatKcal - kcal - basal;
      const spent = kcal + basal;
      const retorno = spent > 0 ? (foodKcal || eatKcal) / spent : 0;
      // viabilidade
      if (sta > st.stamina - 3) blockers.push(`Stamina insuficiente (precisa ~${Math.round(sta)}, tem ${Math.round(st.stamina)}).`);
      if (st.hydration - hydLoss < 15) blockers.push('Você ficaria com sede crítica: beba antes.');
      if (st.calories + net < 200 && !eatKcal) blockers.push('Você ficaria sem energia: coma antes.');
      else if (st.calories + net < 200) blockers.push('Você ficaria sem energia durante a rotina: coma antes.');
      return {
        id, n, ok: blockers.length === 0, blockers, notes, phases, items, stored,
        minutes, walkMin, kcalSpent: kcal, kcalBasal: basal, kcalGained: eatKcal, foodKcal, eatN, net, retorno,
        stamina: sta, hydLoss, hygiene: hyg, fire: cx.fire, store: cx.store,
      };
    },

    // ------------------------------------------------------------
    // Execução
    // ------------------------------------------------------------
    run(id, n, opts) {
      const d = D(); const S = Ilha.State; const Pl = Ilha.Player; const Cr = C();
      if (d.dead || d.sleeping) return { ok: false, msg: 'Agora não dá.' };
      if (!this.unlocked(id)) return { ok: false, msg: 'Rotina ainda bloqueada.' };
      const plan = this.plan(id, n, opts);
      if (!plan.ok) return { ok: false, msg: plan.blockers[0] || 'Não dá para fazer agora.', plan };
      const def = this.DEFS[id];
      const t0 = d.time.total; const c0 = d.player.stats.calories; const s0 = d.player.stats.stamina;
      const seq0 = d.logSeq;
      const got = {}; let aborted = ''; let eaten = 0; let storedN = 0;
      const give = (item, q) => { const a = Cr.add(item, q); got[item] = (got[item] || 0) + a; return a; };
      S.log(`${def.icon} Rotina “${def.name}”: ${plan.n} ${def.unit}. Cyrus sai daqui e voltará ao mesmo ponto.`, 'story');
      S.floatMute = true;

      const guard = (ph, perRepSta) => {
        const st = d.player.stats;
        if (d.dead) return 'Cyrus morreu.';
        if (st.stamina < perRepSta + 0.5) return 'Cyrus ficou exausto e voltou.';
        if (ph.kind !== 'eat' && ph.kind !== 'walk' && st.hydration < 15) return 'Sede crítica: Cyrus interrompeu a rotina.';
        if (ph.kind !== 'eat' && ph.kind !== 'walk' && st.calories < 250) return 'Fome crítica: Cyrus interrompeu a rotina.';
        if (d.log.some((l) => l.id > seq0 && l.cls === 'bad')) return 'Algo o interrompeu: veja o diário.';
        return '';
      };
      const act = (ph, scale) => Pl.act({ minutes: ph.minutes * (scale || 1), kcal: ph.kcal * (scale || 1), stamina: ph.stamina * (scale || 1), hyd: ph.hyd * (scale || 1), hygiene: ph.hygiene * (scale || 1), work: ph.kind !== 'walk', noCheck: true, quiet: true });
      const markCrafted = (rid) => { const r = Cr.recipe(rid); if (r && !d.player.crafted[rid]) { d.player.crafted[rid] = true; Pl.gainXP(r.xp, 'primeira vez: ' + r.name); } };
      const fireK = (f) => key(f.x, f.y);

      const RET = { out: 'back', hop: 'back', tofire: 'fromfire', tostore: 'fromstore' };
      let lastTag = '';
      for (const ph of plan.phases) {
        if (d.dead) break;
        if (aborted && !(ph.kind === 'walk' && ph.tag && ph.tag === RET[lastTag])) continue;
        if (ph.kind === 'walk') { act(ph); lastTag = RET[lastTag] === ph.tag ? '' : ph.tag; continue; }
        if (ph.kind === 'light') {
          const g = guard(ph, ph.stamina);
          if (g) { aborted = g; continue; }
          act(ph);
          if (!Cr.remove('wood_branch', 1)) { aborted = 'Faltou isca para acender a fogueira.'; continue; }
          Pl.igniteFire(ph.fire.x, ph.fire.y);
          continue;
        }
        if (ph.kind === 'fuel') {
          for (let i = 0; i < ph.reps; i++) {
            if (!Cr.remove(ph.item, ph.qty)) { aborted = 'Faltou lenha para manter o fogo.'; break; }
            act(ph);
            const w = d.world; const k = fireK(ph.fire);
            w.fires[k] = Math.min(12, (w.fires[k] || 0) + ph.hours);
          }
          continue;
        }
        for (let i = 0; i < ph.reps; i++) {
          const g = guard(ph, ph.stamina);
          if (g) { aborted = g; break; }
          if (ph.kind === 'fish') {
            act(ph);
            if (give('raw_fish', 1) < 1) { aborted = 'A mochila encheu.'; break; }
            if (!d.player.crafted.first_fish) d.player.crafted.first_fish = true;
            Pl.catalogOnce('Peixes');
          } else if (ph.kind === 'collect') {
            act(ph);
            const q = Math.min(2, plan.n - i * 2);
            if (give('dirty_water', q) < q) { aborted = 'A mochila encheu.'; break; }
          } else if (ph.kind === 'dig') {
            act(ph);
            const tile = ph.chain[i]; d.world.dug[key(tile.x, tile.y)] = d.time.day + 3;
            const q = Math.floor(((i + 1) * ph.total) / ph.reps) - Math.floor((i * ph.total) / ph.reps);
            if (q > 0 && give('root', q) < q) { aborted = 'A mochila encheu.'; break; }
            if (Math.random() < P_ROOT) Ilha.Farming.seedDrop('root');
            Pl.catalogOnce('Raízes Comestíveis');
          } else if (ph.kind === 'cook') {
            const q = Math.min(ph.per, Cr.count('raw_fish'));
            if (q < 1) break;
            act(ph); Cr.remove('raw_fish', q); got.raw_fish = (got.raw_fish || 0) - q; give('cooked_fish', q);
            markCrafted(ph.per > 1 ? 'cooked_fish_4' : 'cooked_fish');
          } else if (ph.kind === 'boil') {
            const q = Math.min(ph.per, Cr.count('dirty_water'));
            if (q < 1) break;
            act(ph); Cr.remove('dirty_water', q); got.dirty_water = (got.dirty_water || 0) - q; give('boiled_water', q);
            markCrafted(ph.per > 1 ? 'boiled_water_5' : 'boiled_water');
          } else if (ph.kind === 'eat') {
            const cal = d.player.stats.calories;
            if (cal + KCAL[ph.item] > B.MAX_CALORIES * 0.99 || Cr.count(ph.item) < 1) break;
            if (Cr.useItem(ph.item)) eaten++;
          } else if (ph.kind === 'store') {
            act(ph);
            const have = Math.min(ph.qty, Cr.count(ph.item));
            storedN = Ilha.Stations.deposit(ph.store.x, ph.store.y, ph.item, have);
            if (storedN < have) S.log('O armazém encheu: o restante ficou na mochila.', 'warn');
          }
        }
      }

      S.floatMute = false;
      if (!d.player.crafted.first_routine) { d.player.crafted.first_routine = true; }
      const mins = Math.round(d.time.total - t0);
      const dk = Math.round(d.player.stats.calories - c0);
      const parts = Object.keys(got).filter((k) => got[k] > 0).map((k) => `${got[k]}x ${Cr.name(k)}`);
      const summary = `${def.icon} Rotina “${def.name}” concluída em ${fmtMin(mins)}. Obteve: ${parts.join(', ') || 'nada'}${eaten ? `; comeu ${eaten}` : ''}${storedN ? `; guardou ${storedN}` : ''}. Energia ${dk >= 0 ? '+' : ''}${dk} kcal, stamina ${Math.round(d.player.stats.stamina - s0)}.`;
      S.log(summary, aborted ? 'warn' : 'good');
      if (aborted) S.log(aborted, 'warn');
      S.float(`${def.icon} ${def.name}: ${plan.n}`, aborted ? 'bad' : 'good');
      if (Ilha.Audio) Ilha.Audio.play('pickup');
      S.touch();
      return { ok: !aborted, msg: aborted || summary, plan, got, minutes: mins };
    },
  };

  Ilha.Routines = Routines;
})();
