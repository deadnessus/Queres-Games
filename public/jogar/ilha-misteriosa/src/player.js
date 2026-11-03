/* =====================================================================
 * player.js — Cyrus Smith: movimento, colisão, interação com o mapa,
 * metabolismo, nutrição, sono, doenças e Índice de Civilização
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const B = Config.BIO;
  const clamp = Config.clamp;

  const D = () => Ilha.State.data;
  const PL = () => Ilha.State.data.player;
  const ST = () => Ilha.State.data.player.stats;
  const key = (x, y) => x + ',' + y;
  const DIRS = Config.DIR8;

  /** Mensagem no log + aviso flutuante (para bloqueios e erros). */
  function say(msg, cls) {
    Ilha.State.log(msg, cls || 'warn');
    if (Ilha.UI && Ilha.UI.toast) Ilha.UI.toast(msg);
  }

  const Player = {
    DIRS,
    say,

    // ------------------------------------------------------------
    // Condições
    // ------------------------------------------------------------
    hasCond(id) { return PL().conditions.includes(id); },
    addCondition(id, hours) {
      const p = PL();
      if (!p.conditions.includes(id)) p.conditions.push(id);
      if (hours != null) p.condTimers[id] = Math.max(p.condTimers[id] || 0, hours);
      this.recalcMax();
      Ilha.State.touch();
    },
    removeCondition(id) {
      const p = PL();
      p.conditions = p.conditions.filter((c) => c !== id);
      delete p.condTimers[id];
      this.recalcMax();
      Ilha.State.touch();
    },

    foodPoisoning() {
      const st = ST();
      st.calories = Math.max(0, st.calories - B.FOOD_POISON_KCAL);
      st.hydration = Math.max(0, st.hydration - B.FOOD_POISON_HYD);
      this.addCondition('FOOD_POISONING', B.FOOD_POISON_HOURS);
      Ilha.State.log(`Náusea violenta! INTOXICAÇÃO ALIMENTAR: -${B.FOOD_POISON_KCAL} kcal e -${B.FOOD_POISON_HYD}% de Hidratação.`, 'bad');
    },

    checkScurvyCure() {
      if (this.hasCond('SCURVY') && ST().vitamins > B.SCURVY_CURE_VIT) {
        this.removeCondition('SCURVY');
        PL().lowVitaminDays = 0;
        Ilha.State.log('As gengivas deixam de sangrar: o ESCORBUTO foi curado pelas vitaminas!', 'good');
      }
      if (this.hasCond('SCURVY_RISK') && ST().vitamins >= B.SCURVY_LOW_VIT) {
        this.removeCondition('SCURVY_RISK');
        PL().lowVitaminDays = 0;
      }
    },

    /** Recalcula HP/Stamina máximos conforme condições e nutrição. */
    recalcMax() {
      const p = PL(); const st = p.stats;
      let hp = B.BASE_MAX_HP + (p.level - 1) * 2;
      if (p.conditions.includes('SCURVY')) hp *= B.SCURVY_MAXHP_MULT;
      let sta = B.BASE_MAX_STAMINA;
      if (st.calories < B.LOW_KCAL) sta *= 0.6;
      if (p.conditions.includes('DYSENTERY')) sta *= B.DYSENTERY_STAMINA_MULT;
      if (p.conditions.includes('FOOD_POISONING')) sta *= 0.8;
      if (p.conditions.includes('SCURVY')) sta *= 0.85;
      if (p.conditions.includes('HYPOTHERMIA')) sta *= 0.8;
      if (p.conditions.includes('MALARIA')) sta *= 0.4;
      st.maxHp = Math.round(hp);
      st.maxStamina = Math.max(20, Math.round(sta));
      st.hp = Math.min(st.hp, st.maxHp);
      st.stamina = Math.min(st.stamina, st.maxStamina);
    },

    // ------------------------------------------------------------
    // XP / Níveis
    // ------------------------------------------------------------
    gainXP(n, reason) {
      const p = PL();
      const mult = this.hasCond('MIND_LUCID') ? 1.5 : 1;
      const gain = Math.round(n * mult);
      if (gain <= 0) return;
      p.xp += gain;
      Ilha.State.log(`+${gain} XP Científico${reason ? ' (' + reason + ')' : ''}${mult > 1 ? ' — Mente Lúcida +50%' : ''}.`, 'xp');
      while (p.xp >= p.xpToNext && p.level < Config.LEVEL_CAP) {
        p.xp -= p.xpToNext;
        p.level++;
        p.xpToNext = Config.xpToNext(p.level);
        p.era = Config.eraOfLevel(p.level);
        this.recalcMax();
        Ilha.State.log(`Nível de Engenharia ${p.level}! Cyrus aprende e se fortalece (+2 HP máx.).${Config.eraOfLevel(p.level) !== Config.eraOfLevel(p.level - 1) ? ' NOVA ERA: ' + Config.ERAS[p.era - 1].name + '!' : ''}`, 'good');
        if (Ilha.UI && Ilha.UI.toast) Ilha.UI.toast('Nível de Engenharia ' + p.level + '!');
      }
      if (p.level >= Config.LEVEL_CAP && p.xp > p.xpToNext) p.xp = p.xpToNext;
      Ilha.State.touch();
    },

    catalogOnce(name) {
      if (!name) return;
      const c = D().catalog;
      if (c[name]) return;
      c[name] = true;
      Ilha.State.log(`Catalogado no Diário Científico: ${name}.`, 'xp');
      this.gainXP(5, 'catalogação');
    },

    // ------------------------------------------------------------
    // Ambiente próximo
    // ------------------------------------------------------------
    nearObject(id, r) {
      const p = PL();
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Ilha.World.objectAt(p.x + dx, p.y + dy) === id) return true;
      }
      return false;
    },
    nearLitFire(r) {
      r = r == null ? 3 : r;
      if (this.nearObject('CAMPFIRE_LIT', r) || this.nearObject('FIREPLACE_LIT', r)) return true;
      const room = this.indoors();
      return !!(room && room.heated);
    },
    /** Cômodo fechado e coberto onde Cyrus está (ou null). */
    indoors() { const p = PL(); return Ilha.Building.roomAt(p.x, p.y); },
    nearShelter() { return this.nearObject('LEAF_SHELTER', 1) || !!this.indoors(); },
    /** Cama a até 1 tile: { name, bed } ou null. */
    nearBed() {
      const p = PL();
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const o = Ilha.World.objectAt(p.x + dx, p.y + dy); const d = o && Config.OBJECTS[o];
        if (d && d.bed) return { name: d.name, bed: d.bed };
      }
      return null;
    },
    torchActive() {
      const eq = PL().equipped;
      return [eq.mainHand, eq.offHand].includes('resin_torch') && PL().torchHours > 0;
    },

    facingTile() {
      const p = PL(); const v = DIRS[p.facing] || DIRS.S;
      return { x: p.x + v[0], y: p.y + v[1] };
    },

    canPlaceAt(x, y) {
      const p = PL();
      if (!Ilha.World.inBounds(x, y)) return { ok: false, msg: 'Fora do mapa.' };
      const t = Config.TERRAIN[Ilha.World.terrainAt(x, y)];
      if (!t.walk || t.water) return { ok: false, msg: 'Não é possível construir na água.' };
      if (Ilha.World.objectAt(x, y)) return { ok: false, msg: 'O tile à frente está ocupado.' };
      if (p.x === x && p.y === y) return { ok: false, msg: 'Posição inválida.' };
      return { ok: true, msg: '' };
    },

    // ------------------------------------------------------------
    // Custos de ação (tempo, kcal, stamina)
    // ------------------------------------------------------------
    timeMult() {
      let m = 1;
      if (this.hasCond('HYPOTHERMIA')) m *= 2;
      if (this.hasCond('MUSCLE_ACHE')) m *= 1.2;
      return m;
    },
    staminaMult() { return ST().protein > 80 ? 0.8 : 1; },

    estimate(c) {
      return {
        minutes: Math.round((c.minutes || 0) * this.timeMult()),
        kcal: Math.round(c.kcal || 0),
        stamina: Math.round((c.stamina || 0) * this.staminaMult()),
      };
    },

    canAfford(c) {
      const need = (c.stamina || 0) * this.staminaMult();
      if (ST().stamina + 1e-6 < need) {
        say('Você está exausto demais para isso. Descanse ou durma [R].');
        return false;
      }
      return true;
    },

    /**
     * Executa uma ação que consome tempo e recursos.
     * cost: { minutes, kcal, stamina, hygiene, hyd, work, walk, noCheck }
     */
    act(c) {
      const d = D();
      if (d.dead) return false;
      const st = ST();
      if (!c.noCheck && !this.canAfford(c)) return false;
      let minutes = (c.minutes || 0) * this.timeMult();
      if (c.walk && st.stamina <= 0) minutes *= 2; // exausto: passos lentos

      st.stamina = Math.max(0, st.stamina - (c.stamina || 0) * this.staminaMult());
      st.calories = Math.max(0, st.calories - (c.kcal || 0));
      if (c.hyd) st.hydration = clamp(st.hydration + c.hyd, 0, 100);
      if (c.hygiene) st.hygiene = clamp(st.hygiene + c.hygiene, 0, 100);

      // Infecção cutânea: trabalhar ferido e sujo
      if (c.work && st.hygiene < B.INFECTION_HYGIENE && st.hp < st.maxHp * 0.8 &&
          !this.hasCond('SKIN_INFECTION') && Math.random() < B.INFECTION_CHANCE) {
        this.addCondition('SKIN_INFECTION');
        PL().condTimers.SKIN_INFECTION_CURE = 0;
        Ilha.State.log('Sua ferida suja infeccionou: INFECÇÃO CUTÂNEA! Lave-se no rio.', 'bad');
      }
      Ilha.State.advance(minutes);
      return true;
    },

    advanceBy(minutes, extra) {
      return this.act({ minutes, kcal: (extra && extra.kcal) || 0, stamina: (extra && extra.stamina) || 0, noCheck: true });
    },

    // ------------------------------------------------------------
    // Movimento
    // ------------------------------------------------------------
    /** Passo de 1 tile em uma das 8 direções (dx,dy ∈ {-1,0,1}). */
    tryMove(dx, dy, isRepeat) {
      const d = D();
      if (d.dead || d.sleeping) return 'none';
      const p = PL();
      const W = Ilha.World;
      const dirName = Ilha.Iso.dirName(dx, dy);
      if (dirName) p.facing = dirName;
      const nx = p.x + dx, ny = p.y + dy;
      const diag = dx !== 0 && dy !== 0;
      Ilha.State.touch();

      if (!W.inBounds(nx, ny)) {
        if (!isRepeat) say('Além daqui há território inexplorado. O Mapa Cartográfico [M] (Sprint 3) permitirá viajar.', 'hint');
        return 'blocked';
      }
      const terr = Config.TERRAIN[W.terrainAt(nx, ny)];
      if (!terr.walk) {
        if (!isRepeat) say('O oceano profundo é intransponível sem uma embarcação.', 'hint');
        return 'blocked';
      }
      const obj = W.objectAt(nx, ny);
      if (obj && W.isSolidObject(obj)) {
        if (!isRepeat) this.interactAt(nx, ny);
        return 'interact';
      }
      // Sem cortar quina na diagonal
      if (diag && (!W.isWalkable(p.x + dx, p.y) || !W.isWalkable(p.x, p.y + dy))) return 'blocked';

      const cost = terr.cost * (diag ? Config.DIAG_COST : 1);
      p.x = nx; p.y = ny; p.stepCount++;
      D().stats.tilesWalked++;
      Ilha.Building.onStep(nx, ny);
      this.act({
        minutes: cost, walk: true, noCheck: true,
        kcal: B.WALK_KCAL_PER_MIN * cost,
        stamina: B.WALK_STAMINA_PER_MIN * cost,
        hyd: -B.WALK_HYD_PER_MIN * cost,
      });
      return 'moved';
    },

    // ------------------------------------------------------------
    // Clique-para-andar (pathfinding) e rota
    // ------------------------------------------------------------
    route: null, // { path: [[x,y]...], interact: {x,y} | null, seq }

    cancelRoute() { this.route = null; },

    /** Há algo para interagir neste tile (objeto sólido)? */
    tileWantsInteract(x, y) {
      const o = Ilha.World.objectAt(x, y);
      if (!o) return false;
      const d = Config.OBJECTS[o];
      return !!(Ilha.World.isSolidObject(o) || (d && d.clickInteract));
    },

    findRouteTo(tx, ty, adjacent) {
      const p = PL(); const W = Ilha.World;
      const cheb = (x, y) => Math.max(Math.abs(x - tx), Math.abs(y - ty));
      return Ilha.Iso.findPath({
        sx: p.x, sy: p.y, w: Config.MAP_W, h: Config.MAP_H,
        hx: tx, hy: ty, slack: adjacent ? 1 : 0,
        isGoal: adjacent ? (x, y) => cheb(x, y) === 1 : (x, y) => x === tx && y === ty,
        walkable: (x, y) => W.isWalkable(x, y),
        cost: (x, y) => Config.TERRAIN[W.terrainAt(x, y)].cost,
      });
    },

    /**
     * Clique no mapa. Esquerdo: anda até o tile (ou, se houver objeto sólido, anda até
     * ficar adjacente e interage). forceInteract (botão direito): sempre interage
     * (água, areia, grama… também).
     */
    clickTile(x, y, forceInteract) {
      const d = D();
      if (d.dead || d.sleeping) return;
      const p = PL();
      if (!Ilha.World.inBounds(x, y)) return;
      this.cancelRoute();
      const dist = Math.max(Math.abs(x - p.x), Math.abs(y - p.y));
      const hasDrops = this.dropsAt(x, y).length > 0 && !Ilha.World.objectAt(x, y);
      if (dist === 0) { if (forceInteract && hasDrops) this.openPickup(x, y); return; }
      if (forceInteract && hasDrops) {              // toque longo numa pilha: vai até ela e abre a lista
        if (dist === 1) { this.openPickup(x, y); return; }
        const pth = this.findRouteTo(x, y, false);
        if (!pth) { say('Não há caminho até lá.', 'hint'); return; }
        this.route = { path: pth, interact: { x, y } };
        return;
      }
      const interact = forceInteract || this.tileWantsInteract(x, y);
      if (interact) {
        if (dist === 1) { this.interactAt(x, y); return; }
        const path = this.findRouteTo(x, y, true);
        if (!path) { say('Não há caminho até lá.', 'hint'); return; }
        this.route = { path, interact: { x, y } };
        return;
      }
      if (!Ilha.World.isWalkable(x, y)) {
        say(Config.TERRAIN[Ilha.World.terrainAt(x, y)].walk ? 'O caminho está bloqueado.' : 'O oceano profundo é intransponível.', 'hint');
        return;
      }
      const path = this.findRouteTo(x, y, false);
      if (!path) { say('Não há caminho até lá.', 'hint'); return; }
      this.route = { path, interact: null };
    },

    /** Executa UM passo da rota atual. Retorna true se ainda há rota. */
    stepRoute() {
      const r = this.route;
      const d = D();
      if (!r) return false;
      if (d.dead || d.sleeping) { this.route = null; return false; }
      const p = PL();
      if (!r.path.length) {
        this.route = null;
        if (r.interact) this.interactAt(r.interact.x, r.interact.y);
        return false;
      }
      const seq = d.logSeq;
      const [nx, ny] = r.path[0];
      const dx = nx - p.x, dy = ny - p.y;
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) { this.route = null; return false; }
      const res = this.tryMove(dx, dy, true);
      if (res !== 'moved') { this.route = null; return false; }
      r.path.shift();
      // Interrompe se algo ruim aconteceu durante o passo
      if (d.log.some((l) => l.id > seq && l.cls === 'bad')) { this.route = null; return false; }
      if (!r.path.length) {
        this.route = null;
        if (r.interact) this.interactAt(r.interact.x, r.interact.y);
        return false;
      }
      return true;
    },

    interactFacing() {
      const t = this.facingTile();
      this.interactAt(t.x, t.y);
    },

    // ------------------------------------------------------------
    // Interação com o mapa
    // ------------------------------------------------------------
    interactAt(x, y) {
      const d = D();
      if (d.dead || d.sleeping) return;
      const p = PL();
      const dx = x - p.x, dy = y - p.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== 1) {
        if (dx === 0 && dy === 0) { if (this.dropsAt(x, y).length) this.openPickup(x, y); return; }
        say('Longe demais. Aproxime-se (tile adjacente) para interagir.', 'hint');
        return;
      }
      p.facing = Ilha.Iso.dirName(dx, dy) || p.facing;
      if (!Ilha.World.inBounds(x, y)) return;
      Ilha.State.touch();

      const objId = Ilha.World.objectAt(x, y);
      if (!objId && this.dropsAt(x, y).length) { this.openPickup(x, y); return; }
      if (objId) {
        const def = Config.OBJECTS[objId];
        if (def.inert) { Ilha.State.log(`${def.name}. ${def.note || ''}`, 'hint'); Ilha.UI.toast(def.note || def.name); return; }
        if (def.catalog) this.catalogOnce(def.catalog);
        if (def.blast && Crafting().count('nitro') > 0) {
          Ilha.UI.menu(def.name, [
            { label: def.verb + ' (método normal)', hint: def.tool ? `Requer ${def.toolName}` : 'Com as mãos', action: () => this.handlers[def.handler](x, y, objId, def) },
            { label: 'Detonar Nitroglicerina', hint: 'Rende muito mais, mas os estilhaços causam 10 de dano • 5 min', action: () => this.blast(x, y, objId, def) },
          ], 'Você carrega nitroglicerina.');
          return;
        }
        this.handlers[def.handler](x, y, objId, def);
        return;
      }
      this.terrainInteract(x, y);
    },

    // ---- Interação com terrenos ----
    terrainInteract(x, y) {
      const tid = Ilha.World.terrainAt(x, y);
      const w = D().world;
      const k = key(x, y);
      const day = D().time.day;
      const UI = Ilha.UI;
      if (Ilha.World.floorAt(x, y)) { say('Piso construído. Nada para coletar aqui (clique direito + modo demolir em [C] para remover).', 'hint'); return; }
      switch (tid) {
        case 'TILLED_SOIL':
          Ilha.Farming.openMenu(x, y);
          break;
        case 'IRRIGATION_CANAL':
          UI.menu('Canal de Irrigação', [
            { label: 'Beber direto do canal', hint: '+25% Hidratação • 35% de risco de Disenteria', action: () => this.drinkRiver() },
            { label: 'Coletar Água Suja (x2)', hint: 'Também serve para regar • 5 min', action: () => this.collectWater(2) },
            { label: 'Lavar-se no canal', hint: 'Recupera Higiene até 70% • 15 min', action: () => this.wash() },
          ], 'Plantações a até 2 tiles de um canal ligado ao rio são irrigadas sozinhas.');
          break;
        case 'RIVER_WATER':
          this.catalogOnce('Rio de Água Doce');
          UI.menu('Rio de Água Doce', [
            { label: 'Beber direto do rio', hint: '+25% Hidratação • 35% de risco de Disenteria', action: () => this.drinkRiver() },
            { label: 'Coletar Água Suja (x2)', hint: 'Para ferver ou filtrar depois • 5 min', action: () => this.collectWater(2) },
            { label: 'Lavar-se no rio', hint: 'Recupera Higiene até 70% • 15 min', action: () => this.wash() },
            { label: 'Pescar com Lança', hint: 'Requer Lança de Madeira equipada • 45 min', action: () => this.fish(true) },
          ]);
          break;
        case 'SHALLOW_WATER':
          this.catalogOnce('Mar Raso');
          UI.menu('Água Rasa do Mar', [
            { label: 'Pescar com Lança', hint: 'Requer Lança de Madeira equipada • 45 min', action: () => this.fish(false) },
          ], 'A água salgada não é potável: beber só aumentaria a sede.');
          break;
        case 'DEEP_OCEAN':
          say('O Oceano Profundo se estende até o horizonte. Água salgada, sem utilidade imediata.', 'hint');
          break;
        case 'SAND': {
          if (Crafting().room('sand') <= 0) { say('Mochila cheia.'); return; }
          this.catalogOnce('Areia de Praia');
          if (!this.act({ minutes: 5, kcal: 8, stamina: 1, hygiene: -1 })) return;
          Crafting().add('sand', 2);
          Ilha.State.log('Você peneira e junta 2x Areia.', 'good');
          break;
        }
        case 'CLAY_BANK': {
          if ((w.dug[k] || 0) > day) { say('Esta margem já foi escavada. Volte em alguns dias.', 'hint'); return; }
          if (Crafting().room('clay') <= 0) { say('Mochila cheia.'); return; }
          if (!this.act({ minutes: 20, kcal: 35, stamina: 6, hygiene: -6, work: true })) return;
          Crafting().add('clay', 1);
          w.dug[k] = day + 2;
          Ilha.State.log('Você escava a margem com as mãos e junta 1x Argila Úmida.', 'good');
          this.catalogOnce('Argila Úmida');
          break;
        }
        case 'GRASS':
        case 'JUNGLE_FLOOR': {
          if (Crafting().hasTool('hoe')) {
            UI.menu('Solo', [
              { label: 'Arar a terra', hint: 'Cria Terra Arada para plantar • 20 min', action: () => Ilha.Farming.till(x, y) },
              { label: 'Cavar raízes comestíveis', hint: '25 min • 55% de chance • pode render sementes', action: () => this.digRoots(x, y) },
            ]);
            break;
          }
          this.digRoots(x, y);
          break;
        }
        case 'GRANITE_FLOOR':
          say('Granito maciço. Procure rochas soltas e veios de pirita nos afloramentos.', 'hint');
          break;
        default: break;
      }
    },

    digRoots(x, y) {
      const w = D().world; const k = key(x, y); const day = D().time.day;
      if ((w.dug[k] || 0) > day) { say('O solo aqui já foi revirado. Tente outro lugar.', 'hint'); return; }
      if (Crafting().room('root') <= 0) { say('Mochila cheia.'); return; }
      if (!this.act({ minutes: 25, kcal: 50, stamina: 8, hygiene: -3, work: true })) return;
      w.dug[k] = day + 3;
      if (Math.random() < 0.55) {
        const n = 1 + Math.floor(Math.random() * 2);
        const got = Crafting().add('root', n);
        Ilha.State.log(`Você cava o solo e encontra ${got}x Raízes Comestíveis.`, 'good');
        this.catalogOnce('Raízes Comestíveis');
        Ilha.Farming.seedDrop('root');
      } else {
        Ilha.State.log('Você cava o solo por um bom tempo, mas não acha nada comestível.', 'warn');
      }
    },

    /** Detona 1 nitroglicerina contra rocha, veio ou árvore. */
    blast(x, y, id, def) {
      const C = Crafting(); const st = ST();
      if (!C.remove('nitro', 1)) return;
      this.act({ minutes: 5, kcal: 10, stamina: 2, noCheck: true });
      st.hp = Math.max(1, st.hp - 10);
      const got = [];
      (def.blast || []).forEach((dr) => {
        const n = dr.min + Math.floor(Math.random() * (dr.max - dr.min + 1));
        const added = C.add(dr.id, n);
        if (added > 0) got.push(`${added}x ${C.name(dr.id)}`);
      });
      delete D().world.uses[key(x, y)];
      Ilha.World.deplete(x, y, id);
      Ilha.State.log(`BOOM! A nitroglicerina estilhaça [${def.name}]. Estilhaços ferem Cyrus (-10 HP). Obteve: ${got.join(', ') || 'nada'}.`, 'bad');
      const p = PL();
      if (!p.crafted.first_blast) { p.crafted.first_blast = true; this.gainXP(40, 'primeira detonação'); }
    },

    // ------------------------------------------------------------
    // Itens no chão (descartar = largar; pegar por toque longo / clique direito)
    // ------------------------------------------------------------
    dropsAt(x, y) { const dr = D().world.drops; return (dr && dr[key(x, y)]) || []; },

    /** Tile onde largar: o de Cyrus ou o vizinho livre mais próximo (sem água nem objeto). */
    dropTile() {
      const p = PL(); const W = Ilha.World;
      const ok = (x, y) => { if (!W.inBounds(x, y)) return false; const t = Config.TERRAIN[W.terrainAt(x, y)]; return t.walk && !t.water && !W.objectAt(x, y); };
      const order = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dx, dy] of order) if (ok(p.x + dx, p.y + dy)) return { x: p.x + dx, y: p.y + dy };
      return null;
    },

    dropItems(id, qty) {
      const inv = PL().inventory; const e = inv.find((i) => i.id === id);
      if (!e || qty <= 0) return false;
      const t = this.dropTile();
      if (!t) { say('Sem espaço para largar itens aqui. Mova-se para um terreno livre.'); return false; }
      const n = Math.min(qty, e.qty);
      const charge = id === 'pot_water' ? Math.round((e.charge || e.qty * 5) * n / e.qty) : 0;
      Crafting().remove(id, n);
      const left = inv.find((i) => i.id === id);
      if (left && id === 'pot_water') left.charge = Math.max(0, (left.charge || 0) - charge);
      const drops = D().world.drops; const k = key(t.x, t.y);
      const pile = drops[k] || (drops[k] = []);
      const ent = pile.find((q) => q.id === id);
      if (ent) { ent.qty += n; if (charge) ent.charge = (ent.charge || 0) + charge; }
      else pile.push(charge ? { id, qty: n, charge } : { id, qty: n });
      Ilha.State.log(`Você larga no chão: ${n}x [${Crafting().name(id)}]${(t.x !== PL().x || t.y !== PL().y) ? ' (no tile ao lado)' : ''}. Toque longo / clique direito na pilha para pegar.`, 'hint');
      Ilha.World.bump(); Ilha.State.touch();
      return true;
    },

    openPickup(x, y) { Ilha.UI.pickupPos = { x, y }; Ilha.UI.open('pickup'); },

    /** Pega itens da pilha em (x,y). Retorna a quantidade pega. */
    pickup(x, y, id, qty) {
      const C = Crafting(); const drops = D().world.drops; const k = key(x, y);
      const pile = drops[k]; if (!pile) return 0;
      const ent = pile.find((q) => q.id === id); if (!ent) return 0;
      const want = Math.min(qty, ent.qty);
      const per = ent.charge ? ent.charge / ent.qty : 0;
      const room = C.room(id);
      const n = Math.min(want, room);
      if (n <= 0) { say('Mochila cheia: libere peso para pegar.'); return 0; }
      const ch = per ? Math.round(per * n) : undefined;
      const got = C.add(id, n, ch);
      ent.qty -= got; if (ent.charge) ent.charge = Math.max(0, ent.charge - (ch || 0));
      if (ent.qty <= 0) pile.splice(pile.indexOf(ent), 1);
      if (!pile.length) delete drops[k];
      if (got < want) Ilha.State.log('Sua mochila encheu: parte dos itens ficou no chão.', 'warn');
      Ilha.State.log(`Você pega do chão: ${got}x [${C.name(id)}].`, 'good');
      this.advanceBy(1, { kcal: 0, stamina: 0 });
      Ilha.World.bump(); Ilha.State.touch();
      return got;
    },

    drinkRiver() {
      const st = ST();
      if (!this.act({ minutes: 2, kcal: 0, stamina: 0, noCheck: true })) return;
      st.hydration = clamp(st.hydration + 25, 0, 100);
      Ilha.State.log('Você bebe da corrente do rio. +25% Hidratação.');
      if (Math.random() < B.DYSENTERY_CHANCE) {
        this.addCondition('DYSENTERY', B.DYSENTERY_HOURS);
        Ilha.State.log('A água estava contaminada: DISENTERIA! Hidratação cai 3x mais rápido.', 'bad');
      } else Ilha.State.log('Você teve sorte: a água não lhe fez mal… desta vez.', 'warn');
    },

    collectWater(n) {
      const C = Crafting();
      const room = C.room('dirty_water');
      if (room <= 0) { say('Mochila cheia.'); return; }
      if (!this.act({ minutes: 5, kcal: 3, stamina: 0, noCheck: true })) return;
      const got = C.add('dirty_water', Math.min(n, room));
      Ilha.State.log(`Você coleta ${got}x Água Suja do Rio. Ferva ou filtre antes de beber.`, 'good');
    },

    wash() {
      const st = ST();
      if (st.hygiene >= B.WASH_CAP) { say('Você já está limpo (o rio lava só até 70%; sabão é da Era 3).', 'hint'); return; }
      if (!this.act({ minutes: 15, kcal: 10, stamina: 2 })) return;
      const before = st.hygiene;
      st.hygiene = Math.min(B.WASH_CAP, st.hygiene + 35);
      Ilha.State.log(`Você se lava na água fria do rio. Higiene ${Math.round(before)}% → ${Math.round(st.hygiene)}%.`, 'good');
    },

    fish(river) {
      const C = Crafting();
      if (!C.hasTool('spear')) { say('Pescar exige uma Lança de Madeira equipada numa das mãos.'); return; }
      if (C.room('raw_fish') <= 0) { say('Mochila cheia.'); return; }
      if (!this.act({ minutes: 45, kcal: 80, stamina: 10, hygiene: -1 })) return;
      if (Math.random() < (river ? 0.55 : 0.45)) {
        const n = Math.random() < 0.15 ? 2 : 1;
        const got = C.add('raw_fish', n);
        Ilha.State.log(`Um arpão certeiro! Você pesca ${got}x Peixe Cru.`, 'good');
        this.catalogOnce('Peixes');
      } else {
        Ilha.State.log('Os peixes escapam ao menor movimento. Nada desta vez.', 'warn');
      }
    },

    // ---- Handlers de objetos ----
    handlers: {
      gather(x, y, id, def) {
        const C = Crafting();
        if (def.tool && !C.hasTool(def.tool)) { say(`Requer ${def.toolName} equipado numa das mãos.`); return; }
        const firstDrop = def.drops[0].id;
        if (C.room(firstDrop) <= 0) { say('Mochila cheia: libere peso antes de coletar.'); return; }
        const mult = def.tool ? C.toolMult(def.tool) : 1;
        if (!Player.act({ minutes: def.minutes * mult, kcal: def.kcal * mult, stamina: def.stamina, hygiene: def.hygiene, work: true })) return;
        const got = [];
        def.drops.forEach((dr) => {
          if (dr.chance && Math.random() > dr.chance) return;
          const n = dr.min + Math.floor(Math.random() * (dr.max - dr.min + 1));
          const added = C.add(dr.id, n);
          if (added > 0) got.push(`${added}x ${C.name(dr.id)}`);
          if (added < n) Ilha.State.log('Sua mochila está cheia: parte do material ficou para trás.', 'warn');
        });
        Ilha.State.log(`${def.verb}: ${def.name}. Obteve: ${got.join(', ') || 'nada'}.`, 'good');
        const seedSrc = { BUSH_TWIGS: 'bush', CITRUS_TREE: 'citrus', HERB_PLANT: 'herb' }[id];
        if (seedSrc) Ilha.Farming.seedDrop(seedSrc);
        if (id === 'IRON_VEIN' && !PL().crafted.first_mine) { PL().crafted.first_mine = true; Player.gainXP(60, 'primeira mineração'); }

        const w = D().world; const k = key(x, y);
        if (def.uses) {
          w.uses[k] = (w.uses[k] || 0) + 1;
          if (w.uses[k] >= def.uses) { Ilha.World.deplete(x, y, id); Ilha.State.log(id === 'IRON_VEIN' ? 'O veio se esgotou.' : 'A rocha se esgotou em cascalho.', 'hint'); }
        } else {
          Ilha.World.deplete(x, y, id);
        }
      },

      mine(x, y, id, def) { Player.handlers.gather(x, y, id, def); },

      wreckage(x, y, id, def) { Player.openLoot(x, y, id, def, 'BALLOON_RAGS'); },
      crate(x, y, id, def) { Player.openLoot(x, y, id, def, null); Ilha.Farming.crateSeeds(); },

      campfire(x, y, id) {
        const w = D().world; const k = key(x, y);
        const C = Crafting();
        const fp = id.startsWith('FIREPLACE');
        const nm = fp ? 'Lareira' : 'Fogueira';
        const ash = w.ash[k] || 0;
        if (id.endsWith('_UNLIT')) {
          const opts = [{ label: `Acender a ${nm.toLowerCase()}`, hint: 'Requer Pedra (sílex) + 1 Galhos como isca • 10 min', action: () => Player.lightFire(x, y) }];
          opts.push({ label: `Recolher cinzas (${ash})`, hint: 'Adubo (+50% de crescimento), vidro e sabão', disabled: ash < 1, action: () => Player.collectAsh(x, y) });
          Ilha.UI.menu(`${nm} Apagada`, opts, fp ? 'Aquece o cômodo inteiro quando acesa.' : 'Lenha e pedras já estão dispostas.');
        } else {
          const fuel = (w.fires[k] || 0).toFixed(1);
          Ilha.UI.menu(`${nm} Acesa`, [
            { label: 'Adicionar 1 Tora (+4h)', hint: 'Tora de Madeira: ' + C.count('log'), disabled: C.count('log') < 1,
              action: () => Player.addFuel(x, y, 'log', 4) },
            { label: 'Adicionar 3 Galhos (+1h)', hint: 'Galhos e Cipós: ' + C.count('wood_branch'), disabled: C.count('wood_branch') < 3,
              action: () => Player.addFuel(x, y, 'wood_branch', 1, 3) },
          ], `Combustível restante: ~${fuel} h. Fabrique comidas e água fervida em [C] estando perto do fogo.`);
        }
      },

      door(x, y) { Ilha.Building.toggleDoor(x, y); },
      crop(x, y) { Ilha.Farming.openMenu(x, y); },
      station(x, y) { Ilha.UI.openStation(x, y); },
      machine(x, y, id, def) { Ilha.UI.menu(def.name, [], Ilha.Stations.machineInfo(x, y, id)); },
      info(x, y, id, def) { say(def.name + '.', 'hint'); },
      bed(x, y, id, def) {
        Ilha.UI.menu(def.name, [
          { label: 'Dormir / descansar aqui', hint: 'Abre a janela de sono [R]', action: () => Ilha.UI.open('rest') },
        ], 'A cama melhora muito a qualidade do sono (mais ainda dentro de um cômodo fechado e aquecido).');
      },

      shelter() {
        say('Seu Abrigo de Folhas. Fique encostado nele e use [R] para dormir com mais conforto.', 'hint');
      },

      filter() {
        const C = Crafting();
        const have = C.count('dirty_water');
        if (have < 1) { say('O Filtro de Água precisa de Água Suja do Rio no inventário. Colete-a no rio.', 'hint'); return; }
        const n = Math.min(have, 4);
        if (!Player.act({ minutes: 10 * n, kcal: 5 * n, stamina: n })) return;
        C.remove('dirty_water', n);
        C.add('clean_water', n);
        Ilha.State.log(`A água goteja pelas camadas de areia e carvão. Você obtém ${n}x Água Purificada.`, 'good');
      },
    },

    openLoot(x, y, id, def, afterObj) {
      const w = D().world; const k = key(x, y);
      const items = w.loot[k] || [];
      if (!this.act({ minutes: def.minutes, kcal: def.kcal, stamina: def.stamina, hygiene: def.hygiene, work: true })) return;
      const C = Crafting();
      const parts = []; const left = [];
      items.forEach((o) => {
        const got = C.add(o.id, o.qty);
        if (got > 0) parts.push(`${got}x ${C.name(o.id)}`);
        if (got < o.qty) left.push({ id: o.id, qty: o.qty - got });
      });
      if (left.length) {
        w.loot[k] = left;
        say('Mochila cheia: alguns itens ficaram no ' + def.name + '. Libere espaço e volte.');
      } else {
        delete w.loot[k];
        Ilha.World.setObject(x, y, afterObj);
      }
      Ilha.State.log(parts.length ? `Você vasculhou [${def.name}]. Encontrou: ${parts.join(', ')}.` : `[${def.name}] não tinha mais nada de útil.`, parts.length ? 'good' : 'warn');
    },

    lightFire(x, y) {
      const C = Crafting();
      if (C.count('stone') < 1 || C.count('wood_branch') < 1) { say('Para acender você precisa de 1 Pedra (sílex) e 1 Galhos como isca.'); return; }
      const rainy = Ilha.State.weather().wet && !this.nearShelter();
      if (!this.act({ minutes: 10, kcal: 15, stamina: 2 })) return;
      const chance = rainy ? 0.4 : 0.85;
      if (Math.random() < chance) {
        C.remove('wood_branch', 1);
        Ilha.World.setObject(x, y, Ilha.World.objectAt(x, y) === 'FIREPLACE_UNLIT' ? 'FIREPLACE_LIT' : 'CAMPFIRE_LIT');
        D().world.fires[key(x, y)] = 2;
        Ilha.State.log('Faíscas, fumaça… e a isca pega! A fogueira está acesa (~2h de combustível).', 'good');
        const p = PL();
        if (!p.crafted.first_fire) { p.crafted.first_fire = true; this.gainXP(20, 'primeiro fogo'); }
      } else {
        Ilha.State.log(rainy ? 'A umidade apaga as faíscas. Tente de novo, ou abrigue-se.' : 'As faíscas não pegam na isca. Tente novamente.', 'warn');
      }
    },

    collectAsh(x, y) {
      const w = D().world; const k = key(x, y); const n = w.ash[k] || 0;
      if (n < 1) return;
      const got = Crafting().add('ash', n);
      w.ash[k] = n - got; if (w.ash[k] <= 0) delete w.ash[k];
      if (got) Ilha.State.log(`Você recolhe ${got}x Cinzas.`, 'good');
      Ilha.State.touch();
    },

    addFuel(x, y, id, hours, qty) {
      const C = Crafting(); const n = qty || 1;
      const w = D().world; const k = key(x, y);
      if (!C.remove(id, n)) return;
      if (!this.act({ minutes: 3, kcal: 3, stamina: 0, noCheck: true })) return;
      w.fires[k] = Math.min(12, (w.fires[k] || 0) + hours);
      Ilha.State.log(`Você alimenta o fogo com ${n}x ${C.name(id)}. Combustível: ~${w.fires[k].toFixed(1)}h.`, 'good');
    },

    // ------------------------------------------------------------
    // Inspeção (tooltip estilo Fallout)
    // ------------------------------------------------------------
    inspect(x, y) {
      if (!Ilha.World.inBounds(x, y)) return null;
      const p = PL();
      const dist = Math.max(Math.abs(x - p.x), Math.abs(y - p.y));
      const adjacent = dist === 1;
      const tid = Ilha.World.terrainAt(x, y);
      const terr = Config.TERRAIN[tid];
      const objId = Ilha.World.objectAt(x, y);
      const lines = [];
      const C = Crafting();
      let title = terr.name;

      const costLine = (c) => {
        const e = this.estimate(c);
        return `Tempo: ${e.minutes} min  •  Energia: -${e.kcal} kcal  •  Stamina: -${e.stamina}`;
      };

      if (objId) {
        const def = Config.OBJECTS[objId];
        title = def.name;
        if (def.inert) lines.push({ text: def.note || '', cls: 'dim' });
        else {
          lines.push({ text: `Ação: ${def.verb}`, cls: 'act' });
          if (def.tool) {
            const ok = C.hasTool(def.tool);
            lines.push({ text: `Requer: ${def.toolName} ${ok ? '✔' : '✘'}`, cls: ok ? 'ok' : 'bad' });
          } else if (def.minutes) lines.push({ text: 'Requer: Mãos livres ✔', cls: 'ok' });
          if (def.minutes) {
            const mult = def.tool ? C.toolMult(def.tool) : 1;
            lines.push({ text: costLine({ minutes: def.minutes * mult, kcal: def.kcal * mult, stamina: def.stamina }), cls: '' });
          }
          if (def.drops) lines.push({ text: 'Rende: ' + def.drops.map((d) => C.name(d.id)).join(', '), cls: 'dim' });
          if (def.handler === 'campfire') {
            const f = D().world.fires[key(x, y)];
            if (f) lines.push({ text: `Combustível: ~${f.toFixed(1)} h`, cls: 'act' });
          }
          if (def.handler === 'crop') {
            const ci = Ilha.Farming.cropInfo(x, y);
            if (ci) {
              lines.push({ text: `Estágio: ${Config.CROP_STAGES[ci.stage]} (${Math.min(ci.days, Math.floor(ci.grow))}/${ci.days} dias)`, cls: 'act' });
              lines.push({ text: `${ci.wet ? 'Regada' : 'SECA — precisa de água'}${ci.auto ? ' (irrigação automática)' : ''}${ci.fert ? ' · adubada' : ''}${ci.greenhouse ? ' · estufa 2x' : ''}`, cls: ci.wet ? 'ok' : 'bad' });
            }
          }
          if (def.handler === 'station') {
            const stn = Ilha.Stations.get(x, y);
            if (stn && stn.type !== 'chest') lines.push({ text: stn.active ? 'Em operação' : (stn.recipe ? 'Parado / aguardando insumos' : 'Sem receita selecionada'), cls: stn.active ? 'ok' : 'dim' });
          }
          if (def.handler === 'door') lines.push({ text: Ilha.Building.isDoorOpen(x, y) ? 'Aberta' : 'Fechada (clique direito para travar aberta)', cls: 'dim' });
          if (def.blast && C.count('nitro') > 0) lines.push({ text: 'Você tem Nitroglicerina: pode detonar!', cls: 'act' });
          if (def.handler === 'filter') lines.push({ text: `Água Suja no inventário: ${C.count('dirty_water')}`, cls: '' });
          if (def.handler === 'wreckage' || def.handler === 'crate') lines.push({ text: 'Pode conter sucatas e suprimentos.', cls: 'dim' });
        }
        lines.push({ text: `Terreno: ${terr.name}`, cls: 'dim' });
      } else {
        if (terr.walk) lines.push({ text: `Passo: ${terr.cost * this.timeMult()} min`, cls: '' });
        else lines.push({ text: 'Intransponível', cls: 'bad' });
        const hints = {
          RIVER_WATER: 'Ação: Beber / Coletar / Lavar-se / Pescar',
          SHALLOW_WATER: 'Ação: Pescar (Lança de Madeira)',
          SAND: `Ação: Coletar Areia — ${this.estimate({ minutes: 5, kcal: 8, stamina: 1 }).minutes} min`,
          CLAY_BANK: `Ação: Escavar Argila — ${this.estimate({ minutes: 20, kcal: 35, stamina: 6 }).minutes} min, -35 kcal`,
          GRASS: `Ação: Cavar Raízes — ${this.estimate({ minutes: 25, kcal: 50, stamina: 8 }).minutes} min, -50 kcal`,
          JUNGLE_FLOOR: `Ação: Cavar Raízes — ${this.estimate({ minutes: 25, kcal: 50, stamina: 8 }).minutes} min, -50 kcal`,
        };
        if (hints[tid]) lines.push({ text: hints[tid], cls: 'act' });
        if (D().world.dug[key(x, y)] > D().time.day) lines.push({ text: 'Solo já revirado recentemente.', cls: 'dim' });
        if (tid === 'TILLED_SOIL') lines.push({ text: 'Ação (clique direito): plantar / cuidar', cls: 'act' });
        const fl = Ilha.World.floorAt(x, y); if (fl) lines.push({ text: 'Piso construído', cls: 'dim' });
        if (Ilha.World.roofAt(x, y)) lines.push({ text: 'Telhado acima', cls: 'dim' });
      }
      const piles = this.dropsAt(x, y);
      if (piles.length) {
        lines.push({ text: 'Itens no chão: ' + piles.map((q) => `${q.qty}x ${C.name(q.id)}`).join(', '), cls: 'act' });
        lines.push({ text: 'Pegar: ' + (document.body.classList.contains('touch') ? 'toque longo' : 'clique direito'), cls: 'ok' });
        if (!objId) title = 'Itens largados · ' + title;
      }
      lines.push({ text: adjacent ? (document.body.classList.contains('touch') ? 'Ao alcance — toque longo' : 'Ao alcance — clique / [E]') : (dist === 0 ? 'Você está aqui' : 'Fora de alcance'), cls: adjacent ? 'ok' : 'dim' });
      return { title, lines };
    },

    // ------------------------------------------------------------
    // Sono
    // ------------------------------------------------------------
    /** Qualidade do Sono = Base da cama + Abrigo + Fogueira + Temperatura + Higiene. */
    sleepQuality(hours) {
      const st = ST();
      const S = Ilha.State;
      const room = this.indoors();
      const leaf = this.nearObject('LEAF_SHELTER', 1);
      const shel = leaf || !!room;
      const fire = this.nearLitFire(4);
      const bed = this.nearBed();
      const wet = S.weather().wet && !shel;
      // Temperatura média ambiente durante o sono (aprox. com clima atual)
      const t = D().time;
      let sum = 0; const n = Math.max(1, hours || 8);
      for (let i = 0; i < n; i++) {
        const h = (t.hour + t.minute / 60 + i) % 24;
        sum += 21 + 9 * Math.cos((2 * Math.PI * (h - 15)) / 24) + S.weather().temp;
      }
      const temp = sum / n + (fire ? 6 : 0) + (leaf ? 3 : 0) + (room ? (room.heated ? 15 : 10) : 0);
      const tempBonus = temp >= 18 ? 15 : temp >= 12 ? 7 : 0;
      const parts = [
        bed ? { label: bed.name, val: bed.bed } : { label: 'Base da cama (chão)', val: 25 },
        { label: room ? 'Quarto fechado e coberto' : 'Abrigo de Folhas próximo', val: room ? 40 : leaf ? 30 : 0 },
        { label: 'Fogueira/Lareira acesa', val: fire ? (room && room.heated ? 20 : 15) : 0 },
        { label: `Temperatura (~${Math.round(temp)}°C)`, val: tempBonus },
        { label: `Higiene (${Math.round(st.hygiene)}%)`, val: Math.round((st.hygiene / 100) * 15) },
      ];
      if (wet) parts.push({ label: 'Chuva sem abrigo', val: -20 });
      const total = clamp(parts.reduce((a, b2) => a + b2.val, 0), 0, 100);
      return { total, parts, shelter: shel, fire, wet, room: !!room, bed: !!bed };
    },

    /** mode: 'sleep' | 'rest' */
    sleep(hours, mode) {
      const d = D();
      if (d.dead) return;
      const q = this.sleepQuality(hours);
      const st = ST();
      const eff = mode === 'rest' ? q.total * 0.45 : q.total;
      const startStamina = st.stamina;
      let slept = 0;
      Ilha.State.log(mode === 'rest'
        ? `Você se senta para descansar por ${hours}h (qualidade ${Math.round(eff)}%).`
        : `Você se deita para dormir por até ${hours}h (qualidade do sono estimada: ${Math.round(eff)}%).`);
      d.sleeping = true;
      d.sleepQuality = eff;
      for (let i = 0; i < hours; i++) {
        Ilha.State.advance(60);
        if (d.dead) break;
        slept++;
        if (st.calories <= 0 || st.hydration <= 0) {
          Ilha.State.log('Você acorda sobressaltado pela fome ou pela sede.', 'bad');
          break;
        }
      }
      d.sleeping = false;
      d.sleepQuality = 0;
      if (d.dead) return;

      if (mode === 'sleep') {
        if (slept >= 6 && q.total >= 70) {
          this.addCondition('WELL_RESTED', B.WELL_RESTED_HOURS);
          this.removeCondition('MUSCLE_ACHE');
          Ilha.State.log('Você acorda revigorado: BEM DESCANSADO.', 'good');
        } else if (slept >= 4 && q.total < 40) {
          this.addCondition('MUSCLE_ACHE', B.MUSCLE_ACHE_HOURS);
          Ilha.State.log('Dormir assim, sem conforto, deixou o corpo dolorido: DORES MUSCULARES.', 'bad');
        }
      }
      Ilha.State.log(`Você ${mode === 'rest' ? 'descansou' : 'dormiu'} ${slept}h. Stamina ${Math.round(startStamina)} → ${Math.round(st.stamina)}.`);
      Ilha.State.touch();
    },

    // ------------------------------------------------------------
    // Metabolismo horário (chamado por State.onHourTick)
    // ------------------------------------------------------------
    hourlyBio() {
      const d = D(); const p = d.player; const st = p.stats; const S = Ilha.State;
      const sleeping = d.sleeping;
      const w = S.weather();
      const shel = this.nearShelter();
      const fire = this.nearLitFire(3);
      const room = this.indoors();
      const timers = p.condTimers;

      // 1) Calorias
      st.calories = Math.max(0, st.calories - B.BASAL_KCAL_H);

      // 2) Hidratação
      let hyd = (S.sunStrong() && !shel) ? B.HYDRATION_SUN_H : B.HYDRATION_H;
      if (this.hasCond('DYSENTERY')) hyd *= B.DYSENTERY_HYD_MULT;
      if (sleeping) hyd *= B.SLEEP_HYD_MULT;
      st.hydration = Math.max(0, st.hydration - hyd);

      // 3) Higiene
      st.hygiene = Math.max(0, st.hygiene - B.HYGIENE_H);

      // 4) Temperatura corporal
      const amb = S.ambientTemp();
      const wet = w.wet && !shel;
      // Quarto fechado: +10 °C de isolamento (+15 °C com lareira acesa no cômodo)
      const eff = amb - (wet ? 3 : 0) + (room ? (room.heated ? 15 : 10) : 0);
      const exposure = Math.max(0, B.COLD_COMFORT_TEMP - eff);
      if (fire) {
        st.bodyTemp = Math.min(37.2, st.bodyTemp + 0.6);
      } else if (exposure > 0) {
        let drop = exposure * 0.045;
        if (shel) drop *= 0.4;
        if (this.torchActive()) drop *= 0.85;
        if (sleeping) drop *= 0.8;
        st.bodyTemp -= drop;
      } else if (st.bodyTemp < 37) {
        st.bodyTemp = Math.min(37, st.bodyTemp + 0.3);
      } else if (st.bodyTemp > 37) {
        st.bodyTemp = Math.max(37, st.bodyTemp - 0.2);
      }
      if (this.hasCond('SKIN_INFECTION')) st.bodyTemp = Math.max(st.bodyTemp, 37.9);
      st.bodyTemp = clamp(st.bodyTemp, 32, 40);
      st.bodyTemp = Math.round(st.bodyTemp * 100) / 100;

      if (st.bodyTemp < B.HYPOTHERMIA_ON && !this.hasCond('HYPOTHERMIA')) {
        this.addCondition('HYPOTHERMIA');
        S.log(`A temperatura caiu para ${Math.round(amb)}°C. Sem abrigo ou fogo, você sofre de HIPOTERMIA (corpo a ${st.bodyTemp.toFixed(1)}°C).`, 'bad');
      } else if (st.bodyTemp >= B.HYPOTHERMIA_OFF && this.hasCond('HYPOTHERMIA')) {
        this.removeCondition('HYPOTHERMIA');
        S.log('O calor volta ao seu corpo: a Hipotermia passou.', 'good');
      }

      // 4b) Malária / Febre Tropical: noites na selva, a partir do dia 4, sem abrigo nem fogo
      if (d.time.day >= 4 && !this.hasCond('MALARIA') && !shel && !fire && Ilha.World.terrainAt(p.x, p.y) === 'JUNGLE_FLOOR' &&
          (d.time.hour >= 19 || d.time.hour < 6) && Math.random() < 0.03) {
        this.addCondition('MALARIA', 96);
        S.log('Picadas de mosquito na selva à noite: MALÁRIA! A febre derruba suas forças. Procure Quinino.', 'bad');
      }
      if (this.hasCond('MALARIA')) {
        timers.MALARIA = (timers.MALARIA || 96) - 1;
        st.bodyTemp = Math.max(st.bodyTemp, 38.3);
        st.hp = Math.max(0, st.hp - 0.5);
        if (timers.MALARIA <= 0) { this.removeCondition('MALARIA'); S.log('A febre finalmente cedeu sozinha: a Malária passou.', 'good'); }
      }

      // 5) Temporizadores das condições
      if (this.hasCond('DYSENTERY')) {
        timers.DYSENTERY = (timers.DYSENTERY || 0) - (sleeping ? 3 : 1);
        if (timers.DYSENTERY <= 0) { this.removeCondition('DYSENTERY'); S.log('A Disenteria finalmente cedeu.', 'good'); }
      }
      if (this.hasCond('FOOD_POISONING')) {
        timers.FOOD_POISONING = (timers.FOOD_POISONING || 0) - 1;
        if (timers.FOOD_POISONING <= 0) { this.removeCondition('FOOD_POISONING'); S.log('A náusea passou: a Intoxicação Alimentar acabou.', 'good'); }
      }
      if (this.hasCond('MUSCLE_ACHE')) {
        timers.MUSCLE_ACHE = (timers.MUSCLE_ACHE || 0) - 1;
        if (timers.MUSCLE_ACHE <= 0) this.removeCondition('MUSCLE_ACHE');
      }
      if (this.hasCond('WELL_RESTED')) {
        timers.WELL_RESTED = (timers.WELL_RESTED || 0) - 1;
        if (timers.WELL_RESTED <= 0) this.removeCondition('WELL_RESTED');
      }
      if (this.hasCond('SKIN_INFECTION')) {
        if (st.hygiene >= 60) timers.SKIN_INFECTION_CURE = (timers.SKIN_INFECTION_CURE || 0) + 1;
        if ((timers.SKIN_INFECTION_CURE || 0) >= B.INFECTION_CURE_HOURS) {
          this.removeCondition('SKIN_INFECTION');
          S.log('A ferida cicatrizou limpa: a Infecção Cutânea foi vencida.', 'good');
        }
      }

      // 6) Dano / regeneração de HP
      let dmg = 0;
      if (st.calories <= 0) dmg += B.STARVE_HP_H;
      if (st.hydration <= 0) dmg += B.THIRST_HP_H;
      if (this.hasCond('HYPOTHERMIA')) dmg += st.bodyTemp < 34.5 ? 3 : B.COLD_HP_H;
      if (this.hasCond('SKIN_INFECTION')) dmg += B.INFECTION_HP_H;
      if (this.hasCond('FOOD_POISONING')) dmg += 0.5;
      if (dmg > 0) {
        st.hp = Math.max(0, st.hp - dmg);
      } else if (st.calories > 300 && st.hydration > 15) {
        const regen = (B.HP_REGEN_BASE_H + (st.protein / 100) * B.HP_REGEN_PROTEIN_H) * (sleeping ? 1.5 : 1);
        st.hp = Math.min(st.maxHp, st.hp + regen);
      }

      // 7) Stamina
      this.recalcMax();
      if (sleeping) {
        st.stamina = Math.min(st.maxStamina, st.stamina + Math.max(2, 14 * (d.sleepQuality / 100)));
        st.comfort = Math.min(100, st.comfort + 10 * (d.sleepQuality / 100));
      } else if (st.calories > 0 && st.hydration > 0) {
        st.stamina = Math.min(st.maxStamina, st.stamina + B.STAMINA_REGEN_H);
      }

      // 8) Conforto (deriva para um alvo conforme o ambiente)
      if (!sleeping) {
        let target = 40;
        if (fire) target += 15;
        if (shel) target += 15;
        if (wet) target -= 20;
        if (exposure > 0 && !fire) target -= 12;
        if (st.hygiene < 30) target -= 10; else if (st.hygiene > 70) target += 5;
        if (this.hasCond('WELL_RESTED')) target += 10;
        if (Ilha.Building.lampNear(p.x, p.y, 7)) target += 25; // iluminação elétrica: conforto máximo da base
        st.comfort = clamp(st.comfort + clamp(target - st.comfort, -6, 6), 0, 100);
      }

      // 9) Tocha equipada queima
      if (this.torchActive()) {
        p.torchHours -= 1;
        if (p.torchHours <= 0) {
          Crafting().remove('resin_torch', 1);
          S.log('Sua Tocha de Resina se consumiu por completo.', 'warn');
          p.torchHours = Crafting().count('resin_torch') > 0 ? Crafting().TORCH_HOURS : 0;
        }
      }

      // 10) Mente Lúcida: bem nutrido, hidratado, descansado perto de fogo/abrigo
      const lucidNow = st.calories >= 1500 && st.hydration >= 60 && st.protein >= 50 && st.vitamins >= 50 &&
        this.hasCond('WELL_RESTED') && (fire || shel);
      if (lucidNow && !this.hasCond('MIND_LUCID')) { this.addCondition('MIND_LUCID'); S.log('Sua mente está clara e afiada: MENTE LÚCIDA (+50% XP).', 'good'); }
      else if (!lucidNow && this.hasCond('MIND_LUCID')) this.removeCondition('MIND_LUCID');

      // Avisos úteis
      if (st.calories > 0 && st.calories < 400) S.log('Seu estômago ronca de fome. Coma algo.', 'warn');
      if (st.hydration > 0 && st.hydration < 20) S.log('Sua boca está seca. Você precisa beber água.', 'warn');

      st.hp = clamp(st.hp, 0, st.maxHp);
      S.touch();
    },

    // ------------------------------------------------------------
    // Ciclo diário (00:00)
    // ------------------------------------------------------------
    dailyBio() {
      const d = D(); const p = d.player; const st = p.stats; const S = Ilha.State;
      st.protein = Math.max(0, st.protein - B.PROTEIN_DAILY);
      st.vitamins = Math.max(0, st.vitamins - B.VITAMIN_DAILY);

      if (st.vitamins < B.SCURVY_LOW_VIT) p.lowVitaminDays++; else p.lowVitaminDays = 0;
      if (p.lowVitaminDays >= 1 && !this.hasCond('SCURVY_RISK') && !this.hasCond('SCURVY')) {
        this.addCondition('SCURVY_RISK');
        S.log('Suas gengivas doem: as Vitaminas estão perigosamente baixas (risco de Escorbuto).', 'warn');
      }
      if (p.lowVitaminDays >= B.SCURVY_DAYS && !this.hasCond('SCURVY')) {
        this.removeCondition('SCURVY_RISK');
        this.addCondition('SCURVY');
        S.log('Após 3 dias sem vitaminas, surge o ESCORBUTO: HP máximo -40% e sangramento lento.', 'bad');
      }
      if (this.hasCond('SCURVY')) {
        st.hp = Math.max(0, st.hp - B.SCURVY_DAILY_HP);
        S.log(`O Escorbuto drena ${B.SCURVY_DAILY_HP} HP durante a noite.`, 'bad');
      }
      this.checkScurvyCure();
      this.recalcMax();
      // Sobreviver ao dia
      this.gainXP(10 + 5 * (p.era - 1), 'sobreviver ao dia');
      S.log('Um novo dia nasce na Ilha. Proteínas e Vitaminas decaíram durante a noite.', 'story');
    },

    // ------------------------------------------------------------
    // Índice de Civilização
    // ------------------------------------------------------------
    civScore() {
      const p = PL(); const st = p.stats;
      const diseases = p.conditions.filter((c) => Config.CONDITIONS[c].kind === 'bad').length;
      const mSaude = clamp((st.hp / st.maxHp) + clamp(st.hydration / 80, 0, 1) * 0.6 + (diseases === 0 ? 0.4 : 0), 0, 2);
      const n = (v) => clamp(v / 75, 0, 1) * (2 / 3);
      const mNutri = clamp(clamp(st.calories / 2000 * 100 / 75, 0, 1) * (2 / 3) + n(st.protein) + n(st.vitamins), 0, 2);
      const mConf = clamp((st.comfort / 100) * 0.8 + clamp(st.hygiene / 80, 0, 1) * 0.4 +
        (this.nearShelter() ? 0.5 : 0) + (this.nearLitFire(4) ? 0.3 : 0) + (Ilha.Building.lampNear(p.x, p.y, 7) ? 0.3 : 0), 0, 2);
      let structures = 0;
      D().world.objects.forEach((row) => row.forEach((o) => { if (o && Config.OBJECTS[o].structure) structures++; }));
      // Engenharia: nível + estações distintas + quarto aquecido + máquinas hidráulicas/elétricas ativas + telégrafo
      const cs = Ilha.Building.civStats();
      const mEng = clamp(0.5 + 0.05 * (p.level - 1) + 0.1 * cs.types + (cs.heatedRoom ? 0.3 : 0) +
        0.15 * Math.min(3, cs.hydraulic) + 0.2 * Math.min(3, cs.electric) + (cs.telegraph ? 0.5 : 0), 0.5, 3);
      const mEco = Ilha.Economy.ecoScore(); // tribos descobertas (+0.3 cada) + reputação/volume de trocas (até +1.1)
      const points = Math.round(10 * (mSaude + mNutri + mConf + mEng + mEco) * 10) / 10;
      return { points, mSaude, mNutri, mConf, mEng, mEco, structures, base: cs };
    },

    // ------------------------------------------------------------
    // Morte
    // ------------------------------------------------------------
    checkDeath() {
      const d = D();
      if (d.dead || d.player.stats.hp > 0) return;
      const st = d.player.stats;
      let cause = 'exaustão de todos os sistemas do corpo';
      if (st.calories <= 0) cause = 'inanição';
      else if (st.hydration <= 0) cause = 'desidratação';
      else if (this.hasCond('HYPOTHERMIA')) cause = 'hipotermia';
      else if (this.hasCond('SKIN_INFECTION')) cause = 'infecção generalizada';
      else if (this.hasCond('SCURVY')) cause = 'escorbuto';
      d.dead = { cause, day: d.time.day, time: Ilha.State.timeString() };
      Ilha.State.log(`Cyrus Smith sucumbiu a ${cause}. Fim de jogo.`, 'bad');
      Ilha.State.clearSave();
      if (Ilha.State.onDeath) Ilha.State.onDeath();
    },
  };

  function Crafting() { return Ilha.Crafting; }

  Ilha.Player = Player;
})();
