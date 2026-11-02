/* =====================================================================
 * stations.js — Estações com fila/estoque (Forno, Alto-Forno, Serraria,
 * Moinho), baú, torque hidráulico, energia elétrica (kWh) e processamento
 * automático no onHourTick (sem gastar tempo/calorias de Cyrus)
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  const key = (x, y) => x + ',' + y;
  const D = () => Ilha.State.data;
  const W = () => Ilha.State.data.world;

  const FUEL = { log: 3, charcoal: 5, wood_branch: 0.5 };
  const FUEL_CAP = 24;
  const TORQUE_NEED = { SAWMILL: 4, MILL: 3, DYNAMO: 5 };
  const WHEEL_TORQUE = 10;
  const BATTERY_CAP = 10;
  const DYNAMO_KWH = 2;
  const DRAW = { LAMP_POST: 0.2, GREENHOUSE: 0.4, TELEGRAPH: 0.3 };

  // Receitas das estações automáticas (fila: uma receita selecionada, repetida enquanto houver insumo)
  const RECIPES = {
    kiln: [
      { id: 'brick', name: 'Tijolo Refratário (2x)', in: { clay: 2 }, out: { refractory_brick: 2, ash: 1 }, hours: 2 },
      { id: 'tile', name: 'Telha Cerâmica (2x)', in: { clay: 2 }, out: { roof_tile: 2, ash: 1 }, hours: 2 },
      { id: 'pot', name: 'Pote de Cerâmica', in: { clay: 3 }, out: { pot: 1, ash: 1 }, hours: 2 },
      { id: 'glass', name: 'Vidro (areia + cinzas)', in: { sand: 3, ash: 1 }, out: { glass: 1 }, hours: 3 },
    ],
    blast: [
      { id: 'iron_ore', name: 'Lingote de Ferro (minério)', in: { iron_ore: 2 }, out: { iron_ingot: 1, ash: 1 }, hours: 3 },
      { id: 'iron_scrap', name: 'Lingote de Ferro (sucata)', in: { iron_scrap: 3 }, out: { iron_ingot: 1, ash: 1 }, hours: 2 },
      { id: 'steel', name: 'Lingote de Aço (ferro + carvão)', in: { iron_ingot: 2, charcoal: 1 }, out: { steel_ingot: 1 }, hours: 4 },
      { id: 'copper', name: 'Lingote de Cobre (minério)', in: { copper_ore: 2 }, out: { copper_ingot: 1, ash: 1 }, hours: 2 },
    ],
    sawmill: [
      { id: 'planks', name: 'Serrar tora → 3 Tábuas + 2 Galhos', in: { log: 1 }, out: { plank: 3, wood_branch: 2 }, hours: 1 },
    ],
    mill: [
      { id: 'flour_root', name: 'Raízes → Farinha (3 → 2)', in: { root: 3 }, out: { flour: 2 }, hours: 1 },
      { id: 'flour_bean', name: 'Feijões → Farinha (3 → 2)', in: { bean: 3 }, out: { flour: 2 }, hours: 1 },
    ],
  };
  const NEEDS_FUEL = { kiln: true, blast: true };

  const Stations = {
    RECIPES, FUEL, NEEDS_FUEL, TORQUE_NEED, WHEEL_TORQUE, BATTERY_CAP, DYNAMO_KWH, DRAW,

    typeOf(objId) { const d = objId && Config.OBJECTS[objId]; return d && d.station ? d.station : null; },
    isBg(type) { return !!RECIPES[type]; },
    get(x, y) { return W().stations[key(x, y)] || null; },

    /** Cria o estado de uma estação recém-construída. */
    ensure(x, y) {
      const o = Ilha.World.objectAt(x, y); const type = this.typeOf(o);
      const w = W(); const k = key(x, y);
      if (type === 'chest') { if (!w.stations[k]) w.stations[k] = { id: o, type, items: {} }; }
      else if (this.isBg(type)) { if (!w.stations[k]) w.stations[k] = { id: o, type, in: {}, out: {}, fuel: 0, recipe: null, progress: 0, active: false }; }
      return w.stations[k] || null;
    },

    /** Devolve o conteúdo ao jogador ao demolir (o que couber). */
    dismantle(x, y) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st) return;
      const give = (map) => Object.keys(map || {}).forEach((id) => { if (map[id] > 0) C.add(id, map[id]); });
      give(st.items); give(st.in); give(st.out);
      delete W().stations[key(x, y)];
      delete D().power.on[key(x, y)];
    },

    // ------------------------------------------------------------
    // Consultas usadas pelo crafting
    // ------------------------------------------------------------
    nearStation(type, r) {
      const p = D().player; r = r || 2;
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const o = Ilha.World.objectAt(p.x + dx, p.y + dy);
        if (o && this.typeOf(o) === type) return true;
      }
      return false;
    },
    powerStored() { return D().power.stored; },
    usePower(n) { const pw = D().power; pw.stored = Math.max(0, pw.stored - n); },

    // ------------------------------------------------------------
    // Operações de UI
    // ------------------------------------------------------------
    inputItems(type) {
      const set = new Set();
      (RECIPES[type] || []).forEach((r) => Object.keys(r.in).forEach((id) => set.add(id)));
      return [...set];
    },

    /** Move itens do inventário para a estação. */
    deposit(x, y, id, qty) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st || qty <= 0) return 0;
      const n = Math.min(qty, C.count(id));
      if (n <= 0) return 0;
      if (st.type === 'chest') {
        C.remove(id, n); st.items[id] = (st.items[id] || 0) + n; Ilha.State.touch(); return n;
      }
      if (NEEDS_FUEL[st.type] && FUEL[id] && !this.inputItems(st.type).includes(id)) {
        const room = Math.max(0, Math.floor((FUEL_CAP - st.fuel) / FUEL[id] + 1e-6));
        const m = Math.min(n, room);
        if (m <= 0) return 0;
        C.remove(id, m); st.fuel = Math.min(FUEL_CAP, st.fuel + FUEL[id] * m); Ilha.State.touch(); return m;
      }
      if (!this.inputItems(st.type).includes(id)) return 0;
      C.remove(id, n); st.in[id] = (st.in[id] || 0) + n; Ilha.State.touch();
      return n;
    },
    /** Combustível pode ser lenha mesmo que o item também seja insumo (carvão do aço): escolha explícita. */
    depositFuel(x, y, id, qty) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st || !NEEDS_FUEL[st.type] || !FUEL[id]) return 0;
      const n = Math.min(qty, C.count(id), Math.max(0, Math.floor((FUEL_CAP - st.fuel) / FUEL[id] + 1e-6)));
      if (n <= 0) return 0;
      C.remove(id, n); st.fuel = Math.min(FUEL_CAP, st.fuel + FUEL[id] * n); Ilha.State.touch();
      return n;
    },

    setRecipe(x, y, id) { const st = this.get(x, y); if (st) { st.recipe = id; Ilha.State.touch(); } },

    /** Recolhe produtos prontos. Retorna texto resumido. */
    collect(x, y) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st || !st.out) return '';
      const parts = [];
      Object.keys(st.out).forEach((id) => {
        const got = C.add(id, st.out[id]);
        if (got > 0) { st.out[id] -= got; parts.push(`${got}x ${C.name(id)}`); }
        if (st.out[id] <= 0) delete st.out[id];
      });
      if (parts.length) Ilha.State.log(`Você recolhe da estação: ${parts.join(', ')}.`, 'good');
      Ilha.State.touch();
      return parts.join(', ');
    },

    withdraw(x, y, id, qty) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st || st.type !== 'chest') return 0;
      const n = Math.min(qty, st.items[id] || 0);
      const got = C.add(id, n);
      if (got > 0) { st.items[id] -= got; if (st.items[id] <= 0) delete st.items[id]; Ilha.State.touch(); }
      return got;
    },

    // ------------------------------------------------------------
    // Processamento horário: torque, energia e estações automáticas
    // ------------------------------------------------------------
    _scan() {
      const w = W(); const wheels = []; const machines = []; const batteries = []; const consumers = [];
      for (let y = 0; y < Config.MAP_H; y++) for (let x = 0; x < Config.MAP_W; x++) {
        const o = w.objects[y][x];
        if (!o) continue;
        if (o === 'WATER_WHEEL') wheels.push({ x, y, k: key(x, y), spare: WHEEL_TORQUE, used: 0 });
        else if (o === 'SAWMILL' || o === 'MILL' || o === 'DYNAMO') machines.push({ x, y, k: key(x, y), o });
        else if (o === 'BATTERY') batteries.push(key(x, y));
        else if (DRAW[o]) consumers.push({ x, y, k: key(x, y), o });
      }
      return { wheels, machines, batteries, consumers };
    },

    hourly() {
      const d = D(); const w = W(); const pw = d.power;
      const sc = this._scan();
      pw.on = {}; pw.wheels = {};

      // estado das estações automáticas
      Object.keys(w.stations).forEach((k) => {
        const [x, y] = k.split(',').map(Number);
        const st = w.stations[k];
        if (!st.type || !Config.OBJECTS[Ilha.World.objectAt(x, y)] ) { delete w.stations[k]; return; }
        st.active = false;
      });

      // 1) alocação de torque (dínamo primeiro, depois serraria e moinho)
      const order = { DYNAMO: 0, SAWMILL: 1, MILL: 2 };
      sc.machines.sort((a, b) => order[a.o] - order[b.o]);
      const fed = {};
      sc.machines.forEach((m) => {
        const st = w.stations[m.k];
        if (m.o !== 'DYNAMO') {
          // só pede torque quando há trabalho a fazer
          if (!st || !st.recipe) return;
          const r = RECIPES[st.type].find((q) => q.id === st.recipe);
          const canStart = st.progress > 0 || (r && Object.keys(r.in).every((id) => (st.in[id] || 0) >= r.in[id]));
          if (!canStart) return;
        }
        const need = TORQUE_NEED[m.o];
        const wh = sc.wheels.filter((q) => Math.max(Math.abs(q.x - m.x), Math.abs(q.y - m.y)) <= 2 && q.spare >= need)
          .sort((a, b) => b.spare - a.spare)[0];
        if (!wh) return;
        wh.spare -= need; wh.used += need; fed[m.k] = true;
      });
      sc.wheels.forEach((q) => { if (q.used > 0) pw.wheels[q.k] = q.used; });
      pw.wheelSpare = {}; sc.wheels.forEach((q) => { pw.wheelSpare[q.k] = q.spare; });

      // 2) energia: dínamos geram, baterias armazenam, consumidores descontam
      let gen = 0;
      sc.machines.forEach((m) => { if (m.o === 'DYNAMO' && fed[m.k]) { gen += DYNAMO_KWH; pw.on[m.k] = true; } });
      pw.cap = sc.batteries.length * BATTERY_CAP;
      let avail = pw.stored + gen; let use = 0;
      const h = d.time.hour; const night = h >= 18 || h < 6;
      sc.consumers.forEach((c) => {
        if (c.o === 'LAMP_POST' && !night) return;
        const cost = DRAW[c.o];
        if (avail >= cost) { avail -= cost; use += cost; pw.on[c.k] = true; }
      });
      pw.gen = gen; pw.use = Math.round(use * 100) / 100;
      pw.stored = Math.max(0, Math.min(pw.cap, Math.round(avail * 100) / 100));
      if (gen > 0 && pw.cap === 0) pw.stored = 0;

      // 3) estações automáticas (forno, alto-forno, serraria, moinho)
      Object.keys(w.stations).forEach((k) => {
        const st = w.stations[k];
        if (!RECIPES[st.type] || !st.recipe) return;
        const r = RECIPES[st.type].find((q) => q.id === st.recipe);
        if (!r) return;
        const hydraulic = st.type === 'sawmill' || st.type === 'mill';
        const fuelType = !!NEEDS_FUEL[st.type];
        if (st.progress <= 0) {
          const hasIn = Object.keys(r.in).every((id) => (st.in[id] || 0) >= r.in[id]);
          if (!hasIn) return;
          if (fuelType && st.fuel < 1) return;
          if (hydraulic && !fed[k]) return;
          Object.keys(r.in).forEach((id) => { st.in[id] -= r.in[id]; if (st.in[id] <= 0) delete st.in[id]; });
          st.progress = r.hours;
        }
        if (fuelType && st.fuel < 1) return;
        if (hydraulic && !fed[k]) return;
        if (fuelType) st.fuel = Math.max(0, st.fuel - 1);
        st.progress -= 1; st.active = true;
        if (st.progress <= 0) {
          st.progress = 0;
          Object.keys(r.out).forEach((id) => { st.out[id] = (st.out[id] || 0) + r.out[id]; });
        }
      });
      Ilha.World.bump(); // sprites ON/OFF e cache civStats
    },

    /** Texto de status para máquinas (roda, dínamo, bateria, poste, estufa, telégrafo). */
    machineInfo(x, y, id) {
      const pw = D().power; const k = key(x, y); const lines = [];
      const on = !!pw.on[k];
      if (id === 'WATER_WHEEL') {
        const used = (pw.wheels && pw.wheels[k]) || 0;
        lines.push(`Força Hidráulica: ${WHEEL_TORQUE - used} / ${WHEEL_TORQUE} de torque livre (em uso: ${used}).`);
        lines.push('Alimenta Serraria, Moinho e Dínamo a até 2 tiles de distância.');
      } else if (id === 'DYNAMO') {
        lines.push(on ? `Gerando ${DYNAMO_KWH} kWh por hora.` : 'Parado: precisa de uma Roda d\'Água com 5 de torque livre a até 2 tiles.');
      } else if (id === 'BATTERY') {
        lines.push(`Rede elétrica: ${pw.stored.toFixed(1)} / ${pw.cap} kWh armazenados.`);
      } else if (id === 'LAMP_POST') {
        lines.push(on ? 'Acesa (0,2 kWh/h).' : 'Apagada (de dia, ou sem energia).');
      } else if (id === 'GREENHOUSE') {
        lines.push(on ? 'Energizada: plantações a até 2 tiles crescem 2x e ignoram o clima.' : 'Sem energia: efeito desligado.');
      } else if (id === 'TELEGRAPH') {
        lines.push(on ? 'Estação ativa e energizada. A rede com as tribos será conectada na Sprint 4.' : 'Sem energia (0,3 kWh/h).');
      }
      lines.push(`Eletricidade: ${pw.stored.toFixed(1)}/${pw.cap} kWh · geração ${pw.gen || 0} kWh/h · consumo ${pw.use || 0} kWh/h.`);
      return lines.join('\n');
    },
  };

  Ilha.Stations = Stations;
})();
