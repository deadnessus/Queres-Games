/* =====================================================================
 * state.js — GameState central, relógio Action-Time (onHourTick /
 * onDayTick), clima, log narrativo e Save/Load (localStorage)
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  function newData() {
    return {
      version: Config.VERSION,
      time: { day: 1, hour: 8, minute: 0, weather: 'CLEAR', weatherHours: 6, season: 'SUMMER', total: 0 },
      score: { civilizationIndex: 10, totalAccumulatedScore: 0, history: [] },
      player: {
        x: Config.SPAWN.x, y: Config.SPAWN.y, sectorX: 5, sectorY: 9, facing: 'S',
        level: 1, xp: 0, xpToNext: Config.xpToNext(1), era: 1,
        stats: {
          hp: 100, maxHp: 100, stamina: 100, maxStamina: 100,
          calories: 2200, maxCalories: Config.BIO.MAX_CALORIES,
          hydration: 85, protein: 70, vitamins: 75, hygiene: 80, comfort: 40, bodyTemp: 37.0,
        },
        conditions: [],
        condTimers: {},
        equipped: { mainHand: null, offHand: null },
        inventory: [{ id: 'pocket_watch_broken', qty: 1 }, { id: 'ration', qty: 1 }],
        unlockedRecipes: ['campfire', 'leaf_shelter', 'stone_axe', 'wood_spear', 'water_filter',
          'resin_torch', 'cooked_fish', 'boiled_water', 'herb_tea', 'charcoal'],
        crafted: {},
        torchHours: 0,
        lowVitaminDays: 0,
        stepCount: 0,
      },
      catalog: {},
      achievements: {},
      hardcore: false,     // morte definitiva (padrão: volta ao amanhecer da última noite dormida)
      rescued: false,
      event: null,
      snap: null,
      world: Ilha.World.generate(Config.SEED),
      log: [],
      logSeq: 0,
      sleeping: false,
      sleepQuality: 0,
      power: { stored: 0, cap: 0, gen: 0, use: 0, on: {} },
      map: Ilha.Island.initState(),
      rainedToday: false,
      monsoonToday: false,
      dead: null,
      stats: { daysSurvived: 0, tilesWalked: 0 },
    };
  }

  const State = {
    data: null,
    dirty: true,
    onDeath: null,
    onRevive: null,

    touch() { this.dirty = true; },

    // ------------------------------------------------------------
    // Novo jogo / Save / Load
    // ------------------------------------------------------------
    newGame() {
      this.data = newData();
      this.dirty = true;
      Ilha.Player.recalcMax();
      this.log('Você, Cyrus Smith, engenheiro, desperta entre os destroços do balão numa praia desconhecida. O céu está claro.', 'story');
      this.clearCheckpoint(); this.checkpointSave();
      this.log('Nos 3 primeiros dias a fome e a sede passam mais devagar: aproveite para aprender.', 'hint');
      this.log('Dica: clique no chão para andar, clique num objeto para usá-lo (botão direito interage com qualquer tile). WASD/Setas também funcionam. O tempo só passa quando você age.', 'hint');
      return this.data;
    },

    suspendSave: false,

    /** JSON do estado (formato do save). O terreno é regenerado da semente ao carregar. */
    serialize(d) {
      d = d || this.data;
      return JSON.stringify(Object.assign({}, d, { log: d.log.slice(-120), world: Object.assign({}, d.world, { terrain: undefined }) }));
    },

    save() {
      if (!this.data || this.data.dead || this.suspendSave) return false;
      try { localStorage.setItem(Config.SAVE_KEY, this.serialize()); return true; } catch (e) { return false; }
    },

    // ---- Ponto de retorno (morte leve): guardado ao acordar de uma noite e no início do jogo ----
    CP_KEY: 'ilha_checkpoint',
    checkpointSave() {
      if (!this.data || this.data.dead) return false;
      try { localStorage.setItem(this.CP_KEY, this.serialize()); return true; } catch (e) { return false; }
    },
    hasCheckpoint() { try { return !!localStorage.getItem(this.CP_KEY); } catch (e) { return false; } },
    clearCheckpoint() { try { localStorage.removeItem(this.CP_KEY); } catch (e) { /* ignore */ } },

    /** Restaura o ponto de retorno após a morte (modo normal). Retorna true se deu certo. */
    revive(cause) {
      let d;
      try { d = JSON.parse(localStorage.getItem(this.CP_KEY)); } catch (e) { d = null; }
      if (!d || !d.world || !d.player) return false;
      const old = this.data;
      try {
        d.world.terrain = Ilha.World.generate(d.world.seed || Config.SEED).terrain;
        this.migrate(d);
        Ilha.World.applyMods(d.world);
      } catch (e) { return false; }
      d.sleeping = false; d.dead = null;
      d.hardcore = !!old.hardcore;
      d.achievements = Object.assign({}, old.achievements || {}, d.achievements || {});
      d.catalog = Object.assign({}, old.catalog || {}, d.catalog || {});
      d.stats = Object.assign({}, d.stats, { revives: ((old.stats && old.stats.revives) || 0) + 1 });
      const lostDays = old.time.day - d.time.day;
      this.data = d; this.dirty = true;
      Ilha.World.bump();
      Ilha.Player.recalcMax();
      this.log(`Cyrus desmaiou (${cause}) e acorda no amanhecer, no último abrigo onde dormiu.${lostDays > 0 ? ` O tempo volta ${lostDays} dia${lostDays > 1 ? 's' : ''}.` : ''}`, 'warn');
      this.save();
      if (this.onRevive) this.onRevive(cause, lostDays);
      return true;
    },

    /** Serializa o jogo (mesmo formato do save) para exportar. */
    exportJSON() {
      const d = this.data;
      const copy = Object.assign({}, d, { log: d.log.slice(-120), world: Object.assign({}, d.world, { terrain: undefined }) });
      return JSON.stringify(copy);
    },

    /** Valida e grava um save importado (o chamador recarrega a página). */
    importJSON(text) {
      let d;
      try { d = JSON.parse(text); } catch (e) { return { ok: false, msg: 'Arquivo inválido: não é um JSON.' }; }
      if (!d || typeof d !== 'object' || !d.player || !d.world || !d.time || !(d.version >= 1 && d.version <= Config.VERSION)) {
        return { ok: false, msg: 'Arquivo inválido: não parece um save de A Ilha Misteriosa.' };
      }
      if (!Array.isArray(d.world.objects) || d.world.objects.length !== Config.MAP_H) return { ok: false, msg: 'Save incompatível (mapa).' };
      try { localStorage.setItem(Config.SAVE_KEY, JSON.stringify(d)); } catch (e) { return { ok: false, msg: 'Não foi possível gravar no navegador.' }; }
      this.suspendSave = true; // impede que o autosave/beforeunload sobrescreva o save importado antes do reload
      return { ok: true, msg: 'Save importado.' };
    },

    hasSave() {
      try { return !!localStorage.getItem(Config.SAVE_KEY); } catch (e) { return false; }
    },

    load() {
      try {
        const raw = localStorage.getItem(Config.SAVE_KEY);
        if (!raw) return false;
        const d = JSON.parse(raw);
        if (!d || !(d.version >= 1 && d.version <= Config.VERSION) || !d.world || !d.player) return false;
        d.world.terrain = Ilha.World.generate(d.world.seed || Config.SEED).terrain;
        this.migrate(d);
        Ilha.World.applyMods(d.world);
        this.data = d;
        this.dirty = true;
        d.sleeping = false;
        Ilha.Player.recalcMax();
        return true;
      } catch (e) { return false; }
    },

    /** Completa saves antigos (Sprint 1 / isométrico) com as propriedades novas, sem perder nada. */
    migrate(d) {
      const w = d.world; const H = Config.MAP_H; const W = Config.MAP_W;
      const blank = () => Array.from({ length: H }, () => new Array(W).fill(null));
      w.regen = w.regen || {}; w.uses = w.uses || {}; w.fires = w.fires || {}; w.dug = w.dug || {}; w.loot = w.loot || {};
      if (!Array.isArray(w.floors) || w.floors.length !== H) w.floors = blank();
      if (!Array.isArray(w.roofs) || w.roofs.length !== H) w.roofs = blank();
      w.crops = w.crops || {}; w.stations = w.stations || {}; w.doorsOpen = w.doorsOpen || {};
      w.mods = w.mods || {}; w.ash = w.ash || {}; w.drops = w.drops || {}; w.sites = w.sites || {};
      d.power = d.power || { stored: 0, cap: 0, gen: 0, use: 0, on: {} };
      Ilha.Island.migrate(d);
      if (typeof d.rainedToday !== 'boolean') d.rainedToday = false;
      if (typeof d.monsoonToday !== 'boolean') d.monsoonToday = false;
      d.achievements = d.achievements || {}; d.hardcore = !!d.hardcore; d.rescued = !!d.rescued; if (d.snap === undefined) d.snap = null; if (d.event === undefined) d.event = null;
      d.catalog = d.catalog || {}; d.stats = d.stats || { daysSurvived: 0, tilesWalked: 0 };
      const p = d.player;
      p.condTimers = p.condTimers || {}; p.crafted = p.crafted || {}; p.conditions = p.conditions || [];
      p.conditions = p.conditions.filter((c) => Config.CONDITIONS[c]);
      Object.keys(p.condTimers).forEach((c) => { if (!Config.CONDITIONS[c] && c !== 'SKIN_INFECTION_CURE') delete p.condTimers[c]; });
      p.equipped = p.equipped || { mainHand: null, offHand: null };
      if (typeof p.level !== 'number') p.level = 1;
      p.level = Math.min(p.level, Config.LEVEL_CAP);
      p.xpToNext = Config.xpToNext(p.level);
      p.era = Config.eraOfLevel(p.level);
      if (typeof p.xp !== 'number') p.xp = 0;
      const mig = { up: 'N', down: 'S', left: 'W', right: 'E' };
      if (mig[p.facing]) p.facing = mig[p.facing];
      if (!Config.DIR8[p.facing]) p.facing = 'S';
      d.version = Config.VERSION;
      return d;
    },

    clearSave() { try { localStorage.removeItem(Config.SAVE_KEY); } catch (e) { /* ignore */ } },

    // ------------------------------------------------------------
    // Log narrativo
    // ------------------------------------------------------------
    timeString() {
      const t = this.data.time;
      return `${Config.pad2(t.hour)}:${Config.pad2(t.minute)}`;
    },
    stamp() { return `[Dia ${this.data.time.day} - ${this.timeString()}]`; },

    /** Textos flutuantes sobre Cyrus (só visual, não vão para o save). kind: good | bad | xp */
    floats: [],
    floatMute: false,
    float(text, kind) {
      if (this.floatMute) return;
      const f = this.floats;
      f.push({ t0: performance.now() + (Ilha.Fx ? Ilha.Fx.floatDelay() : 0), text, kind: kind || 'good' });
      if (f.length > 8) f.shift();
    },

    log(text, cls) {
      const d = this.data;
      d.logSeq++;
      d.log.push({ id: d.logSeq, t: this.stamp(), text, cls: cls || '' });
      if (d.log.length > 300) d.log.splice(0, d.log.length - 300);
      this.dirty = true;
    },

    // ------------------------------------------------------------
    // Ambiente
    // ------------------------------------------------------------
    weather() { return Config.WEATHER[this.data.time.weather]; },

    /** Temperatura ambiente em °C (ciclo diário + clima). */
    ambientTemp() {
      const t = this.data.time;
      const h = t.hour + t.minute / 60;
      const base = 21 + 9 * Math.cos((2 * Math.PI * (h - 15)) / 24);
      return Math.round((base + this.weather().temp) * 10) / 10;
    },

    isNight() { const h = this.data.time.hour; return h >= 20 || h < 5; },
    sunStrong() { const t = this.data.time; return t.weather === 'CLEAR' && t.hour >= 10 && t.hour < 16; },

    updateWeather() {
      const t = this.data.time;
      t.weatherHours -= 1;
      if (t.weatherHours > 0) return;
      const keys = Object.keys(Config.WEATHER);
      const total = keys.reduce((a, k) => a + Config.WEATHER[k].weight, 0);
      let r = Math.random() * total;
      let next = 'CLEAR';
      for (const k of keys) { r -= Config.WEATHER[k].weight; if (r <= 0) { next = k; break; } }
      if (next === t.weather) next = 'CLEAR';
      const w = Config.WEATHER[next];
      t.weather = next;
      t.weatherHours = w.hours[0] + Math.floor(Math.random() * (w.hours[1] - w.hours[0] + 1));
      const msgs = {
        CLEAR: 'As nuvens se dissipam: o sol volta a brilhar.',
        WIND: 'Um Vento Forte começa a soprar do mar, carregando areia.',
        RAIN: 'O céu escurece: começa a Chuva Tropical.',
        MONSOON: 'Nuvens negras cobrem a ilha: a Monção chegou, com chuva torrencial!',
      };
      this.log(`${msgs[next]} (${Math.round(this.ambientTemp())}°C)`, next === 'CLEAR' ? '' : 'warn');
    },

    burnFires() {
      const w = this.data.world;
      const wr = this.weather().fuel;
      const p = this.data.player;
      const UNLIT = { CAMPFIRE_LIT: 'CAMPFIRE_UNLIT', FIREPLACE_LIT: 'FIREPLACE_UNLIT' };
      Object.keys(w.fires).forEach((k) => {
        const [x, y] = k.split(',').map(Number);
        const obj = Ilha.World.objectAt(x, y);
        if (!UNLIT[obj]) { delete w.fires[k]; return; }
        w.fires[k] -= obj === 'FIREPLACE_LIT' ? 1 : wr; // lareira fica protegida do clima
        if (w.fires[k] <= 0) {
          delete w.fires[k];
          Ilha.World.setObject(x, y, UNLIT[obj]);
          w.ash[k] = (w.ash[k] || 0) + 2;
          if (Math.abs(x - p.x) + Math.abs(y - p.y) <= 12) this.log(obj === 'FIREPLACE_LIT' ? 'A lareira consumiu a lenha e se apagou.' : 'Uma fogueira consumiu toda a lenha e se apagou.', 'warn');
        }
      });
    },

    // ------------------------------------------------------------
    // Action-Time System
    // ------------------------------------------------------------
    advance(minutes) {
      const d = this.data;
      if (!d || d.dead) return;
      const t = d.time;
      let left = Math.max(0, minutes);
      while (left > 1e-9 && !d.dead) {
        const step = Math.min(left, 60 - t.minute);
        t.minute += step; t.total += step; left -= step;
        if (t.minute >= 60 - 1e-9) {
          t.minute = 0; t.hour++;
          let newDay = false;
          if (t.hour >= 24) { t.hour = 0; t.day++; newDay = true; }
          this.onHourTick();
          if (newDay && !d.dead) this.onDayTick();
        }
      }
      this.dirty = true;
    },

    /** A cada 60 min acumulados. */
    onHourTick() {
      this.updateWeather();
      if (this.weather().wet) this.data.rainedToday = true;
      if (this.data.time.weather === 'MONSOON') this.data.monsoonToday = true;
      this.burnFires();
      Ilha.Stations.hourly();
      Ilha.Player.hourlyBio();
      Ilha.Player.checkDeath();
      if (!this.data.dead) { if (Ilha.Achievements) Ilha.Achievements.check(); if (Ilha.Goals) Ilha.Goals.check(); if (Ilha.Rescue) Ilha.Rescue.check(); if (Ilha.Events) Ilha.Events.hourly(); this.save(); }
    },

    /** Às 00:00. */
    onDayTick() {
      const d = this.data;
      Ilha.Player.dailyBio();
      Ilha.Farming.daily();
      Ilha.Economy.daily();
      Ilha.Island.daily(d.time.day);
      d.rainedToday = false;
      const regen = Ilha.World.regenerate(d.time.day);
      const sc = Ilha.Player.civScore();
      d.score.totalAccumulatedScore = Math.round((d.score.totalAccumulatedScore + sc.points) * 10) / 10;
      d.score.civilizationIndex = sc.points;
      d.score.history.push({ day: d.time.day - 1, points: sc.points });
      d.stats.daysSurvived = d.time.day - 1;
      this.log(`Fim do Dia ${d.time.day - 1}. Índice de Civilização do dia: +${sc.points.toFixed(1)} pts.${regen ? ' A natureza se renovou.' : ''}`, 'story');
      Ilha.Player.checkDeath();
      if (!d.dead) this.save();
    },
  };

  Ilha.State = State;
})();
