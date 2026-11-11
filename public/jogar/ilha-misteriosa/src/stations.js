/* =====================================================================
 * stations.js — Estações com fila/estoque (Forno, Alto-Forno, Serraria,
 * Moinho), baú, força hidráulica, energia elétrica e processamento
 * automático no onHourTick (sem gastar tempo/calorias de Cyrus).
 * Modelo simples: a Roda d'Água ao lado alimenta a máquina; o Dínamo
 * alimentado liga Poste, Estufa, Oficina e Telégrafo a até 5 tiles.
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
  const WHEEL_RANGE = 2; // a máquina precisa estar a até 2 tiles de uma Roda d'Água
  const GRID_RANGE = 5; // o consumidor precisa estar a até 5 tiles de um Dínamo ligado
  const CONSUMERS = { LAMP_POST: 1, GREENHOUSE: 1, TELEGRAPH: 1, WORKSHOP: 1 };

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
    RECIPES, FUEL, NEEDS_FUEL, WHEEL_RANGE, GRID_RANGE, CONSUMERS,

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
    /** Há um consumidor (ex.: Oficina) ligado ao alcance do jogador? */
    nearPowered(type, r) {
      const p = D().player; r = r || 2; const on = D().power.on;
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const o = Ilha.World.objectAt(p.x + dx, p.y + dy);
        if (o && this.typeOf(o) === type && on[key(p.x + dx, p.y + dy)]) return true;
      }
      return false;
    },
    powerStored() { return 0; }, // legado (kWh removido)
    usePower() { /* legado: a energia agora é ligada/desligada, sem estoque */ },

    // ------------------------------------------------------------
    // Operações de UI
    // ------------------------------------------------------------
    inputItems(type) {
      const set = new Set();
      (RECIPES[type] || []).forEach((r) => Object.keys(r.in).forEach((id) => set.add(id)));
      return [...set];
    },

    /** Peso (kg) guardado num baú/caixote. */
    chestWeight(st) {
      const C = Ilha.Crafting;
      return Object.keys(st.items || {}).reduce((a, id) => a + ((C.ITEMS[id] && C.ITEMS[id].weight) || 0) * st.items[id], 0);
    },
    /** Capacidade em kg do baú em (x,y) (null = ilimitada). */
    chestCapacity(x, y) {
      const o = Ilha.World.objectAt(x, y); const d = o && Config.OBJECTS[o];
      return d && d.capacity != null ? d.capacity : null;
    },

    /** Move itens do inventário para a estação. */
    deposit(x, y, id, qty) {
      const st = this.get(x, y); const C = Ilha.Crafting;
      if (!st || qty <= 0) return 0;
      const n = Math.min(qty, C.count(id));
      if (n <= 0) return 0;
      if (st.type === 'chest') {
        const cap = this.chestCapacity(x, y);
        let m = n;
        if (cap != null) {
          const w = (C.ITEMS[id] && C.ITEMS[id].weight) || 0;
          if (w > 0) m = Math.min(n, Math.max(0, Math.floor((cap - this.chestWeight(st) + 1e-6) / w)));
        }
        if (m <= 0) { Ilha.UI.toast('O caixote está cheio (' + cap + ' kg).'); return 0; }
        C.remove(id, m); st.items[id] = (st.items[id] || 0) + m; Ilha.State.touch(); return m;
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
      const w = W(); const wheels = []; const machines = []; const consumers = [];
      for (let y = 0; y < Config.MAP_H; y++) for (let x = 0; x < Config.MAP_W; x++) {
        const o = w.objects[y][x];
        if (!o) continue;
        if (o === 'WATER_WHEEL') wheels.push({ x, y, k: key(x, y), used: 0 });
        else if (o === 'SAWMILL' || o === 'MILL' || o === 'DYNAMO') machines.push({ x, y, k: key(x, y), o });
        else if (CONSUMERS[o]) consumers.push({ x, y, k: key(x, y), o });
      }
      return { wheels, machines, consumers };
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

      // 1) força hidráulica: máquina a até 2 tiles de uma Roda d'Água funciona (sem contar torque)
      const fed = {};
      sc.machines.forEach((m) => {
        const st = w.stations[m.k];
        if (m.o !== 'DYNAMO') {
          // só "usa" a roda quando há trabalho a fazer
          if (!st || !st.recipe) return;
          const r = RECIPES[st.type].find((q) => q.id === st.recipe);
          const canStart = st.progress > 0 || (r && Object.keys(r.in).every((id) => (st.in[id] || 0) >= r.in[id]));
          if (!canStart) return;
        }
        const wh = sc.wheels.find((q) => Math.max(Math.abs(q.x - m.x), Math.abs(q.y - m.y)) <= WHEEL_RANGE);
        if (!wh) return;
        wh.used += 1; fed[m.k] = true;
      });
      sc.wheels.forEach((q) => { if (q.used > 0) pw.wheels[q.k] = q.used; });

      // 2) energia: Dínamo alimentado liga os consumidores a até 5 tiles (sem kWh nem bateria)
      const dynamos = sc.machines.filter((m) => m.o === 'DYNAMO' && fed[m.k]);
      dynamos.forEach((m) => { pw.on[m.k] = true; });
      const h = d.time.hour; const night = h >= 18 || h < 6;
      let use = 0;
      sc.consumers.forEach((c) => {
        if (c.o === 'LAMP_POST' && !night) return;
        if (dynamos.some((m) => Math.max(Math.abs(m.x - c.x), Math.abs(m.y - c.y)) <= GRID_RANGE)) { pw.on[c.k] = true; use++; }
      });
      pw.gen = dynamos.length; pw.use = use; pw.stored = 0; pw.cap = 0;

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

    /** Texto de status para máquinas (roda, dínamo, poste, estufa, oficina, telégrafo). */
    machineInfo(x, y, id) {
      const pw = D().power; const k = key(x, y); const lines = [];
      const on = !!pw.on[k];
      if (id === 'WATER_WHEEL') {
        const used = (pw.wheels && pw.wheels[k]) || 0;
        lines.push(used ? `Girando: ${used} máquina(s) em uso.` : 'Parada (nenhuma máquina trabalhando agora).');
        lines.push('Alimenta Serraria, Moinho e Dínamo a até 2 tiles de distância.');
      } else if (id === 'DYNAMO') {
        lines.push(on ? 'Ligado: a energia chega a até 5 tiles de distância.' : 'Parado: precisa de uma Roda d\'Água a até 2 tiles.');
      } else if (id === 'BATTERY') {
        lines.push('Peça antiga: não é mais necessária. A energia vai direto do Dínamo.');
      } else if (id === 'LAMP_POST') {
        lines.push(on ? 'Acesa.' : 'Apagada (de dia, ou sem Dínamo ligado a até 5 tiles).');
      } else if (id === 'GREENHOUSE') {
        lines.push(on ? 'Ligada: plantações a até 2 tiles crescem 2x e ignoram o clima.' : 'Sem energia: efeito desligado (precisa de um Dínamo ligado a até 5 tiles).');
      } else if (id === 'TELEGRAPH') {
        lines.push(on ? 'Estação no ar: você negocia com a tribo sem caravana.' : 'Sem energia (precisa de um Dínamo ligado a até 5 tiles).');
      } else if (id === 'WORKSHOP') {
        lines.push(on ? 'Ligada: pode fabricar peças de precisão.' : 'Sem energia (precisa de um Dínamo ligado a até 5 tiles).');
      }
      return lines.join('\n');
    },
  };

  Ilha.Stations = Stations;
})();
