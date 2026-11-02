/* =====================================================================
 * farming.js — Agricultura: arar, semear, regar, adubar, colher,
 * irrigação automática (rio / canais) e ciclo de crescimento diário
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  const key = (x, y) => x + ',' + y;
  const D = () => Ilha.State.data;
  const W = () => Ilha.State.data.world;
  const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const SEED_OF = { root: 'seed_tuber', herb: 'seed_legume', citrus: 'seed_veg', bush: 'seed_fiber' };
  const SEEDS = ['seed_tuber', 'seed_legume', 'seed_veg', 'seed_fiber'];

  const Farming = {
    _irr: { ver: -1, set: new Set() },

    cropObjId(type, stage) { return `CROP_${type.toUpperCase()}_${stage}`; },

    // ------------------------------------------------------------
    // Sementes
    // ------------------------------------------------------------
    /** ~25% de chance de achar semente ao coletar (source: root|herb|citrus|bush). */
    seedDrop(source) {
      const id = SEED_OF[source];
      if (!id || Math.random() >= 0.25) return null;
      const got = Ilha.Crafting.add(id, 1);
      if (got) Ilha.State.log(`Entre o material, você encontra 1x [${Ilha.Crafting.name(id)}].`, 'good');
      return got ? id : null;
    },
    crateSeeds() {
      if (Math.random() >= 0.4) return null;
      const id = SEEDS[Math.floor(Math.random() * SEEDS.length)];
      const n = 1 + Math.floor(Math.random() * 2);
      const got = Ilha.Crafting.add(id, n);
      if (got) Ilha.State.log(`Na caixa havia sementes: ${got}x [${Ilha.Crafting.name(id)}].`, 'good');
      return got ? id : null;
    },

    // ------------------------------------------------------------
    // Irrigação (rio ou canal conectado ao rio, até 2 tiles)
    // ------------------------------------------------------------
    _irrSet() {
      const c = this._irr;
      if (c.ver === Ilha.World.version) return c.set;
      const w = W(); const H = Config.MAP_H, Wd = Config.MAP_W;
      // canais conectados ao rio (flood fill)
      const conn = new Set(); const q = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < Wd; x++) {
        if (w.terrain[y][x] !== 'IRRIGATION_CANAL') continue;
        if (N4.some(([dx, dy]) => Ilha.World.terrainAt(x + dx, y + dy) === 'RIVER_WATER')) { conn.add(key(x, y)); q.push([x, y]); }
      }
      while (q.length) {
        const [x, y] = q.pop();
        N4.forEach(([dx, dy]) => {
          const nx = x + dx, ny = y + dy;
          if (Ilha.World.terrainAt(nx, ny) === 'IRRIGATION_CANAL' && !conn.has(key(nx, ny))) { conn.add(key(nx, ny)); q.push([nx, ny]); }
        });
      }
      const set = new Set();
      const mark = (x, y) => { for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) set.add(key(x + dx, y + dy)); };
      for (let y = 0; y < H; y++) for (let x = 0; x < Wd; x++) {
        if (w.terrain[y][x] === 'RIVER_WATER' || conn.has(key(x, y))) mark(x, y);
      }
      c.ver = Ilha.World.version; c.set = set; c.conn = conn;
      return set;
    },
    irrigated(x, y) { return this._irrSet().has(key(x, y)); },
    connectedCanals() { this._irrSet(); return this._irr.conn; },

    greenhouseAt(x, y) {
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const nx = x + dx, ny = y + dy;
        if (Ilha.World.objectAt(nx, ny) === 'GREENHOUSE' && D().power.on[key(nx, ny)]) return true;
      }
      return false;
    },

    // ------------------------------------------------------------
    // Ações do jogador
    // ------------------------------------------------------------
    till(x, y) {
      const C = Ilha.Crafting; const P = Ilha.Player;
      if (!C.hasTool('hoe')) { P.say('Arar a terra exige uma Enxada de Ferro equipada.'); return false; }
      const t = Ilha.World.terrainAt(x, y);
      if (!['GRASS', 'JUNGLE_FLOOR'].includes(t)) { P.say('Só é possível arar GRAMA ou SOLO DE FLORESTA.'); return false; }
      if (Ilha.World.objectAt(x, y) || Ilha.World.floorAt(x, y)) { P.say('O tile está ocupado.'); return false; }
      if (!P.act({ minutes: 20, kcal: 40, stamina: 8, hygiene: -4, work: true })) return false;
      Ilha.World.setTerrain(x, y, 'TILLED_SOIL');
      Ilha.State.log('Você ara a terra: nasce um canteiro de Terra Arada.', 'good');
      if (!D().player.crafted.first_till) { D().player.crafted.first_till = true; P.gainXP(20 * Config.eraOfLevel(D().player.level), 'primeiro canteiro'); }
      return true;
    },

    plant(x, y, type) {
      const C = Ilha.Crafting; const P = Ilha.Player; const def = Config.CROPS[type];
      if (!def) return false;
      if (Ilha.World.terrainAt(x, y) !== 'TILLED_SOIL' || Ilha.World.objectAt(x, y)) { P.say('Plante apenas em Terra Arada livre.'); return false; }
      if (C.count(def.seed) < 1) { P.say(`Você não tem ${C.name(def.seed)}.`); return false; }
      if (!P.act({ minutes: 5, kcal: 3, stamina: 1, work: true })) return false;
      C.remove(def.seed, 1);
      Ilha.World.setObject(x, y, this.cropObjId(type, 0));
      W().crops[key(x, y)] = { type, grow: 0, stage: 0, wet: false, fert: false, dry: 0 };
      Ilha.State.log(`Você semeia ${def.name}. Regue-a diariamente (ou plante perto do rio/canal).`, 'good');
      if (!D().player.crafted['sow_' + type]) { D().player.crafted['sow_' + type] = true; P.gainXP(12 * Config.eraOfLevel(D().player.level), 'primeiro plantio'); }
      return true;
    },

    water(x, y) {
      const C = Ilha.Crafting; const P = Ilha.Player; const c = W().crops[key(x, y)];
      if (!c) return false;
      if (c.wet) { P.say('Esta plantação já foi regada hoje.', 'hint'); return false; }
      const src = ['dirty_water', 'boiled_water', 'clean_water'].find((id) => C.count(id) > 0);
      if (!src) { P.say('Você precisa de água (Água Suja do Rio serve) para regar.'); return false; }
      if (!P.act({ minutes: 3, kcal: 3, stamina: 1, noCheck: true })) return false;
      C.remove(src, 1); c.wet = true;
      Ilha.State.log('Você rega a plantação.', 'good');
      return true;
    },

    fertilize(x, y) {
      const C = Ilha.Crafting; const P = Ilha.Player; const c = W().crops[key(x, y)];
      if (!c) return false;
      if (c.fert) { P.say('Esta plantação já está adubada.', 'hint'); return false; }
      if (C.count('ash') < 1) { P.say('Você precisa de Cinzas (recolha-as de fogueiras e fornos apagados).'); return false; }
      if (!P.act({ minutes: 3, kcal: 3, stamina: 1, noCheck: true })) return false;
      C.remove('ash', 1); c.fert = true;
      Ilha.State.log('Você espalha cinzas: crescimento +50%.', 'good');
      return true;
    },

    harvest(x, y) {
      const C = Ilha.Crafting; const P = Ilha.Player; const w = W(); const k = key(x, y); const c = w.crops[k];
      if (!c) return false;
      if (c.stage < 3) { P.say(`Ainda não está pronta (${Config.CROP_STAGES[c.stage]}).`, 'hint'); return false; }
      const def = Config.CROPS[c.type];
      if (C.room(def.yield.id) <= 0) { P.say('Mochila cheia.'); return false; }
      if (!P.act({ minutes: 12, kcal: 20, stamina: 4, hygiene: -3, work: true })) return false;
      const n = def.yield.min + Math.floor(Math.random() * (def.yield.max - def.yield.min + 1));
      const got = C.add(def.yield.id, n);
      const seeds = C.add(def.seed, 1 + Math.floor(Math.random() * 2));
      Ilha.World.setObject(x, y, null);
      delete w.crops[k];
      Ilha.State.log(`Colheita! ${got}x ${C.name(def.yield.id)}${seeds ? ` e ${seeds}x ${C.name(def.seed)}` : ''}.`, 'good');
      const era = Config.eraOfLevel(D().player.level);
      P.gainXP(15 * era, 'colheita');
      return true;
    },

    cropInfo(x, y) {
      const c = W().crops[key(x, y)];
      if (!c) return null;
      const def = Config.CROPS[c.type];
      const gh = this.greenhouseAt(x, y);
      const auto = this.irrigated(x, y);
      return {
        name: def.name, stage: c.stage, days: def.days, grow: c.grow,
        wet: c.wet || auto, auto, fert: c.fert, greenhouse: gh, dry: c.dry,
      };
    },

    /** Menu de cuidados / plantio. */
    openMenu(x, y) {
      const C = Ilha.Crafting; const UI = Ilha.UI;
      const c = W().crops[key(x, y)];
      if (c) {
        const i = this.cropInfo(x, y);
        const sub = `${i.name}: ${Config.CROP_STAGES[c.stage]} (${Math.min(i.days, Math.floor(i.grow))}/${i.days} dias) · ${i.wet ? 'regada' : 'seca'}${i.auto ? ' (irrigação automática)' : ''}${i.fert ? ' · adubada (+50%)' : ''}${i.greenhouse ? ' · estufa (2x)' : ''}`;
        UI.menu('Plantação', [
          { label: 'Colher', hint: c.stage === 3 ? 'Pronta para colheita!' : 'Ainda não está pronta', disabled: c.stage < 3, action: () => this.harvest(x, y) },
          { label: 'Regar', hint: 'Usa 1 água (a Água Suja serve)', disabled: c.wet, action: () => this.water(x, y) },
          { label: 'Adubar com Cinzas', hint: `Cinzas: ${C.count('ash')} · +50% de crescimento`, disabled: c.fert || C.count('ash') < 1, action: () => this.fertilize(x, y) },
        ], sub);
        return;
      }
      UI.menu('Terra Arada', Object.keys(Config.CROPS).map((t) => {
        const d = Config.CROPS[t];
        return { label: `Plantar ${d.name}`, hint: `${C.name(d.seed)}: ${C.count(d.seed)} · ${d.days} dias até a colheita`, disabled: C.count(d.seed) < 1, action: () => this.plant(x, y, t) };
      }), 'Plantações precisam de água todo dia (chuva, rega, rio/canal a até 2 tiles).');
    },

    // ------------------------------------------------------------
    // Ciclo diário (onDayTick)
    // ------------------------------------------------------------
    daily() {
      const w = W(); const d = D();
      let ready = 0; let wilted = 0; let storm = 0;
      Object.keys(w.crops).forEach((k) => {
        const [x, y] = k.split(',').map(Number);
        const c = w.crops[k]; const def = Config.CROPS[c.type];
        if (!def) { delete w.crops[k]; return; }
        const gh = this.greenhouseAt(x, y);
        const watered = c.wet || this.irrigated(x, y) || (d.rainedToday && !gh);
        if (watered) { c.grow += (c.fert ? 1.5 : 1) * (gh ? 2 : 1); c.dry = 0; } else c.dry++;
        if (d.monsoonToday && !gh && Math.random() < 0.35) { c.grow = Math.max(0, c.grow - 1.5); storm++; }
        if (c.dry >= 4) {
          delete w.crops[k]; Ilha.World.setObject(x, y, null); wilted++;
          return;
        }
        c.stage = c.grow >= def.days ? 3 : Math.min(2, Math.floor((c.grow / def.days) * 3));
        Ilha.World.setObject(x, y, this.cropObjId(c.type, c.stage));
        c.wet = false;
        if (c.stage === 3) ready++;
      });
      d.monsoonToday = false;
      if (storm) Ilha.State.log(`A monção castigou ${storm} plantação(ões) desprotegida(s). Uma estufa evitaria isso.`, 'warn');
      if (wilted) Ilha.State.log(`${wilted} plantação(ões) murcharam por falta de água.`, 'bad');
      if (ready) Ilha.State.log(`${ready} plantação(ões) prontas para colheita.`, 'good');
    },
  };

  Ilha.Farming = Farming;
})();
