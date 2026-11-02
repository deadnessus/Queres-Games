/* =====================================================================
 * building.js — Construção modular: pisos, paredes, portas, janelas,
 * telhados e estações; detecção de quarto fechado (flood fill);
 * portas automáticas; luzes e estatísticas da base.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  const key = (x, y) => x + ',' + y;
  const D = () => Ilha.State.data;
  const W = () => Ilha.State.data.world;
  const OBJ = (id) => Config.OBJECTS[id];
  const REACH = 3;
  const MAX_ROOM = 400;
  const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const N8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  const BUILDABLE_TERRAIN = ['SAND', 'GRASS', 'JUNGLE_FLOOR', 'GRANITE_FLOOR', 'CLAY_BANK'];
  const CANAL_TERRAIN = ['SAND', 'GRASS', 'JUNGLE_FLOOR', 'CLAY_BANK'];

  const Building = {
    mode: null,      // null | recipeId | 'demolish'
    _room: { ver: -1, map: new Map() },
    _civ: { ver: -1, hour: -1, val: null },

    // ------------------------------------------------------------
    // Consultas
    // ------------------------------------------------------------
    isDoorOpen(x, y) { return !!W().doorsOpen[key(x, y)]; },

    /** Parede, janela ou porta (fechada ou aberta) — para orientação de portas. */
    isWallish(x, y) {
      const o = Ilha.World.objectAt(x, y);
      return !!(o && OBJ(o) && OBJ(o).barrier);
    },
    /** Bloqueia o fluxo do cômodo: parede/janela ou porta FECHADA. */
    isBarrier(x, y) {
      const o = Ilha.World.objectAt(x, y);
      const d = o && OBJ(o);
      if (!d || !d.barrier) return false;
      if (d.barrier === 'door') return !this.isDoorOpen(x, y);
      return true;
    },

    /** Recipe de uma estrutura pelo id do objeto/piso/telhado. */
    recipeFor(placeId) { return Ilha.Crafting.RECIPES.find((r) => r.kind === 'structure' && r.place === placeId); },

    // ------------------------------------------------------------
    // Regras de colocação
    // ------------------------------------------------------------
    canPlace(r, x, y) {
      const Wd = Ilha.World;
      const p = D().player;
      if (!Wd.inBounds(x, y)) return { ok: false, msg: 'Fora do mapa.' };
      if (Math.max(Math.abs(x - p.x), Math.abs(y - p.y)) > REACH) return { ok: false, msg: `Fora de alcance (até ${REACH} tiles).` };
      const terr = Wd.terrainAt(x, y);
      const tdef = Config.TERRAIN[terr];
      const obj = Wd.objectAt(x, y);
      const layer = r.layer || 'object';
      const onPlayer = p.x === x && p.y === y;

      if (layer === 'object') {
        if (onPlayer) return { ok: false, msg: 'Você está neste tile.' };
        if (!tdef.walk || tdef.water) return { ok: false, msg: 'Não é possível construir na água.' };
        if (terr === 'TILLED_SOIL') return { ok: false, msg: 'Não construa sobre a terra arada.' };
        if (obj) return { ok: false, msg: 'O tile está ocupado.' };
        if (r.rule === 'river' && !N8.some(([dx, dy]) => Wd.terrainAt(x + dx, y + dy) === 'RIVER_WATER')) {
          return { ok: false, msg: "A Roda d'Água só pode ser construída ao lado do rio." };
        }
        return { ok: true, msg: '' };
      }
      if (layer === 'floor') {
        if (!tdef.walk || tdef.water) return { ok: false, msg: 'Não é possível pisar na água para colocar piso.' };
        if (terr === 'TILLED_SOIL') return { ok: false, msg: 'Não construa sobre a terra arada.' };
        if (Wd.floorAt(x, y)) return { ok: false, msg: 'Já existe piso aqui.' };
        if (obj && Wd.isSolidObject(obj)) return { ok: false, msg: 'Há uma estrutura no tile.' };
        return { ok: true, msg: '' };
      }
      if (layer === 'roof') {
        if (Wd.roofAt(x, y)) return { ok: false, msg: 'Já existe telhado aqui.' };
        const sup = N8.some(([dx, dy]) => this.isWallish(x + dx, y + dy)) || this.isWallish(x, y) ||
          N4.some(([dx, dy]) => Wd.roofAt(x + dx, y + dy));
        if (!sup) return { ok: false, msg: 'O telhado precisa de apoio: parede ao lado ou outro telhado.' };
        return { ok: true, msg: '' };
      }
      if (layer === 'terrain') {
        if (onPlayer) return { ok: false, msg: 'Você está neste tile.' };
        if (!CANAL_TERRAIN.includes(terr)) return { ok: false, msg: terr === 'IRRIGATION_CANAL' ? 'Já é um canal.' : 'Não dá para cavar canal aqui.' };
        if (obj || Wd.floorAt(x, y)) return { ok: false, msg: 'O tile está ocupado.' };
        const conn = N4.some(([dx, dy]) => { const t = Wd.terrainAt(x + dx, y + dy); return t === 'RIVER_WATER' || t === 'IRRIGATION_CANAL'; });
        if (!conn) return { ok: false, msg: 'O canal deve começar junto ao rio ou continuar outro canal.' };
        return { ok: true, msg: '' };
      }
      return { ok: false, msg: 'Estrutura desconhecida.' };
    },

    build(r, x, y) {
      const chk = this.canPlace(r, x, y);
      if (!chk.ok) { Ilha.UI.toast(chk.msg); return false; }
      const st = Ilha.Crafting.status(r, { x, y });
      if (!st.ok) { Ilha.UI.toast(st.reason); return false; }
      const layer = r.layer || 'object';
      const ok = Ilha.Crafting.finish(r, () => {
        if (layer === 'object') {
          Ilha.World.setObject(x, y, r.place);
          Ilha.Stations.ensure(x, y);
        } else if (layer === 'floor') Ilha.World.setFloor(x, y, r.place);
        else if (layer === 'roof') Ilha.World.setRoof(x, y, r.place);
        else if (layer === 'terrain') Ilha.World.setTerrain(x, y, r.place);
        Ilha.State.log(`Você construiu [${r.name}].`, 'good');
      });
      if (ok) Ilha.State.touch();
      return ok;
    },

    demolish(x, y) {
      const Wd = Ilha.World; const p = D().player; const C = Ilha.Crafting;
      if (!Wd.inBounds(x, y)) return false;
      if (Math.max(Math.abs(x - p.x), Math.abs(y - p.y)) > REACH) { Ilha.UI.toast(`Fora de alcance (até ${REACH} tiles).`); return false; }
      const obj = Wd.objectAt(x, y);
      let kind = null; let id = null;
      if (Wd.roofAt(x, y)) { kind = 'roof'; id = Wd.roofAt(x, y); }
      else if (obj && OBJ(obj) && OBJ(obj).structure && !['CAMPFIRE_UNLIT', 'CAMPFIRE_LIT'].includes(obj)) { kind = 'object'; id = obj; }
      else if (Wd.floorAt(x, y)) { kind = 'floor'; id = Wd.floorAt(x, y); }
      else if (Wd.terrainAt(x, y) === 'IRRIGATION_CANAL') { kind = 'terrain'; id = 'IRRIGATION_CANAL'; }
      if (!kind) { Ilha.UI.toast('Nada para demolir aqui.'); return false; }
      if (!Ilha.Player.canAfford({ stamina: 3 })) return false;
      const r = this.recipeFor(id);
      if (kind === 'object') Ilha.Stations.dismantle(x, y);
      if (kind === 'object') { Wd.setObject(x, y, null); delete W().doorsOpen[key(x, y)]; delete W().fires[key(x, y)]; }
      else if (kind === 'roof') Wd.setRoof(x, y, null);
      else if (kind === 'floor') Wd.setFloor(x, y, null);
      else if (kind === 'terrain') { Wd.setTerrain(x, y, 'GRASS'); }
      const back = [];
      if (r) r.in.forEach((i) => {
        const n = Math.floor(i.qty * 0.5);
        if (n > 0 && !i.anyOf) { const got = C.add(i.id, n); if (got) back.push(`${got}x ${C.name(i.id)}`); }
      });
      Ilha.State.log(`Você demoliu [${r ? r.name : id}].${back.length ? ' Recuperou: ' + back.join(', ') + '.' : ''}`, 'good');
      Ilha.Player.act({ minutes: 10, kcal: 20, stamina: 3, noCheck: true });
      Ilha.State.touch();
      return true;
    },

    // ------------------------------------------------------------
    // Modo construção
    // ------------------------------------------------------------
    setMode(m) {
      this.mode = m || null;
      Ilha.State.touch();
      if (Ilha.UI && Ilha.UI.renderBuildBanner) Ilha.UI.renderBuildBanner();
    },
    modeRecipe() { return this.mode && this.mode !== 'demolish' ? Ilha.Crafting.recipe(this.mode) : null; },
    /** Clique em (x,y) enquanto o modo construção está ativo. */
    clickInMode(x, y) {
      if (this.mode === 'demolish') return this.demolish(x, y);
      const r = this.modeRecipe();
      if (!r) return false;
      const ok = this.build(r, x, y);
      if (ok && Ilha.UI && Ilha.UI.renderBuildBanner) Ilha.UI.renderBuildBanner();
      return ok;
    },

    // ------------------------------------------------------------
    // Portas
    // ------------------------------------------------------------
    toggleDoor(x, y) {
      const k = key(x, y); const w = W();
      if (w.doorsOpen[k] === 'held') { delete w.doorsOpen[k]; Ilha.State.log('Você fecha a porta.'); }
      else { w.doorsOpen[k] = 'held'; Ilha.State.log('Você abre e trava a porta aberta.'); }
      Ilha.World.bump();
      Ilha.State.touch();
    },
    /** Chamado após cada passo: abre a porta sob Cyrus e fecha as automáticas que ficaram para trás. */
    onStep(px, py) {
      const w = W(); let changed = false;
      const here = Ilha.World.objectAt(px, py);
      if (here && OBJ(here) && OBJ(here).barrier === 'door' && !w.doorsOpen[key(px, py)]) { w.doorsOpen[key(px, py)] = 'auto'; changed = true; }
      Object.keys(w.doorsOpen).forEach((k) => {
        if (w.doorsOpen[k] === 'auto' && k !== key(px, py)) { delete w.doorsOpen[k]; changed = true; }
      });
      if (changed) Ilha.World.bump();
    },

    // ------------------------------------------------------------
    // Quarto fechado (flood fill)
    // ------------------------------------------------------------
    /** Retorna { tiles:Set, boundary:Set, heated, size } se (x,y) está num cômodo fechado e coberto; senão null. */
    roomAt(x, y) {
      const Wd = Ilha.World;
      if (!Wd.inBounds(x, y)) return null;
      const c = this._room;
      if (c.ver !== Wd.version) { c.ver = Wd.version; c.map = new Map(); }
      const ck = key(x, y);
      if (c.map.has(ck)) return c.map.get(ck);
      const res = this._flood(x, y);
      c.map.set(ck, res);
      return res;
    },

    _flood(x, y) {
      const Wd = Ilha.World;
      const here = Wd.objectAt(x, y);
      if (here && OBJ(here) && OBJ(here).barrier) return null;
      const seen = new Set([key(x, y)]);
      const boundary = new Set();
      const q = [[x, y]];
      while (q.length) {
        const [cx, cy] = q.pop();
        for (const [dx, dy] of N4) {
          const nx = cx + dx, ny = cy + dy;
          if (!Wd.inBounds(nx, ny)) return null;
          const k = key(nx, ny);
          if (seen.has(k)) continue;
          const o = Wd.objectAt(nx, ny); const d = o && OBJ(o);
          if (d && d.barrier) {
            if (d.barrier === 'door' && this.isDoorOpen(nx, ny)) return null; // porta aberta vaza
            boundary.add(k);
            continue;
          }
          seen.add(k);
          if (seen.size > MAX_ROOM) return null;
          q.push([nx, ny]);
        }
      }
      // todos os tiles do cômodo precisam de telhado
      for (const k of seen) {
        const [tx, ty] = k.split(',').map(Number);
        if (!Wd.roofAt(tx, ty)) return null;
      }
      let heated = false;
      for (const k of seen) {
        const [tx, ty] = k.split(',').map(Number);
        if (Wd.objectAt(tx, ty) === 'FIREPLACE_LIT') { heated = true; break; }
      }
      return { tiles: seen, boundary, heated, size: seen.size };
    },

    // ------------------------------------------------------------
    // Sprites com estado
    // ------------------------------------------------------------
    spriteKey(x, y, name) {
      const w = W();
      if (name === 'DOOR_WOOD') {
        const wx = (this.isWallish(x - 1, y) ? 1 : 0) + (this.isWallish(x + 1, y) ? 1 : 0);
        const wy = (this.isWallish(x, y - 1) ? 1 : 0) + (this.isWallish(x, y + 1) ? 1 : 0);
        return `DOOR_${wx >= wy ? 'X' : 'Y'}_${this.isDoorOpen(x, y) ? 'OPEN' : 'CLOSED'}`;
      }
      if (name === 'KILN' || name === 'BLAST_FURNACE' || name === 'SAWMILL' || name === 'MILL') {
        const st = w.stations[key(x, y)];
        return st && st.active ? name + '_ON' : name;
      }
      if (name === 'DYNAMO' || name === 'LAMP_POST' || name === 'TELEGRAPH') {
        return D().power.on[key(x, y)] ? name + '_ON' : name;
      }
      return name;
    },

    /** Há um Poste de Luz Elétrica aceso a até r tiles? (conforto da base) */
    lampNear(x, y, r) {
      const on = D().power.on;
      return Object.keys(on).some((k) => {
        const [lx, ly] = k.split(',').map(Number);
        return Ilha.World.objectAt(lx, ly) === 'LAMP_POST' && Math.max(Math.abs(lx - x), Math.abs(ly - y)) <= r;
      });
    },

    // ------------------------------------------------------------
    // Luzes (para a camada de iluminação)
    // ------------------------------------------------------------
    lights() {
      const out = []; const w = W();
      Object.keys(w.fires).forEach((k) => {
        const [x, y] = k.split(',').map(Number);
        const o = Ilha.World.objectAt(x, y); const d = o && OBJ(o);
        if (d && d.light) out.push({ x, y, r: d.light, seed: x * 7 + y * 13, warm: 1, lift: 10, kind: 'fire' });
      });
      const on = D().power.on;
      Object.keys(on).forEach((k) => {
        const [x, y] = k.split(',').map(Number);
        if (Ilha.World.objectAt(x, y) === 'LAMP_POST') out.push({ x, y, r: 7, seed: x * 5 + y * 3, warm: 1, lift: 38, kind: 'lamp' });
      });
      return out;
    },

    // ------------------------------------------------------------
    // Estatísticas da base (Índice de Civilização)
    // ------------------------------------------------------------
    civStats() {
      const c = this._civ; const d = D();
      const hourKey = d.time.total;
      if (c.ver === Ilha.World.version && c.hour === Math.floor(hourKey / 60) && c.val) return c.val;
      const w = W();
      const STATION_TYPES = ['KILN', 'WORKBENCH', 'BLAST_FURNACE', 'LAB', 'WORKSHOP', 'SAWMILL', 'MILL', 'WATER_WHEEL', 'DYNAMO', 'BATTERY', 'LAMP_POST', 'GREENHOUSE', 'TELEGRAPH', 'CHEST', 'FIREPLACE_UNLIT', 'FIREPLACE_LIT'];
      const types = new Set(); let heatedRoom = false; let hydraulic = 0; let electric = 0; let telegraph = false;
      for (let y = 0; y < Config.MAP_H; y++) {
        for (let x = 0; x < Config.MAP_W; x++) {
          const o = w.objects[y][x];
          if (!o) continue;
          if (STATION_TYPES.includes(o)) types.add(o === 'FIREPLACE_LIT' ? 'FIREPLACE_UNLIT' : o);
          if (o === 'FIREPLACE_LIT' && !heatedRoom) {
            for (const [dx, dy] of N4) { if (this.roomAt(x + dx, y + dy)) { heatedRoom = true; break; } }
          }
          const st = w.stations[key(x, y)];
          if ((o === 'SAWMILL' || o === 'MILL') && st && st.active) hydraulic++;
          if (o === 'WATER_WHEEL' && d.power.wheels && d.power.wheels[key(x, y)]) hydraulic++;
          if (d.power.on[key(x, y)]) { electric++; if (o === 'TELEGRAPH') telegraph = true; }
        }
      }
      c.ver = Ilha.World.version; c.hour = Math.floor(hourKey / 60);
      c.val = { types: types.size, heatedRoom, hydraulic, electric, telegraph };
      return c.val;
    },
  };

  Ilha.Building = Building;
})();
