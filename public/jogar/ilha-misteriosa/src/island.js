/* =====================================================================
 * island.js — Mapa Cartográfico da Ilha Lincoln (grid 12x12), névoa de
 * guerra, expedições de exploração e coleta nos Pontos de Interesse.
 * A exploração acontece pelo modal [M]; o jogador continua no mapa 64x64.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  const N = 12;
  const D = () => Ilha.State.data;
  const M = () => Ilha.State.data.map;
  const clamp = Config.clamp;

  // Biomas fixos e determinísticos (linha = y, coluna = x). Base de Cyrus: (5,9).
  const BIOMES = {
    O: { name: 'Oceano', minutes: 0, icon: '≈' },
    C: { name: 'Costa', minutes: 120, icon: '▒' },
    J: { name: 'Selva Densa', minutes: 150, icon: '♣' },
    V: { name: 'Vale Fértil', minutes: 120, icon: '❀' },
    P: { name: 'Pântano de Mangue', minutes: 180, icon: '≋' },
    R: { name: 'Colinas Rochosas', minutes: 180, icon: '▲' },
    M: { name: 'Monte Franklin (Vulcão)', minutes: 180, icon: '☗' },
  };
  const GRID = [
    'OOOOOOOOOOOO',
    'OOOORRMMOOOO',
    'OOORRMMMROOO',
    'OOJRRMMRRCOO',
    'OOJJRRRJJCCO',
    'OCJJVVJJJCCO',
    'OCJPVVVJCCOO',
    'OCCPPVVJCOOO',
    'OOCPJVJCCOOO',
    'OOOCCCCCOOOO',
    'OOOOCCOOOOOO',
    'OOOOOOOOOOOO',
  ];
  const BASE = { x: 5, y: 9 };

  // Aldeias (comércio em economy.js) e Pontos de Interesse de saque
  const TRIBE_POS = { raiz_verde: { x: 5, y: 6 } }; // uma única tribo, perto da base

  const POIS = {
    frigate: {
      name: 'Fragata Encalhada', icon: '⚓', x: 1, y: 6, max: 4,
      desc: 'Um casco de fragata encalhado na praia: sucata mecânica, latão e ferro.',
      loot: [
        { id: 'iron_scrap', min: 3, max: 6 }, { id: 'screw', min: 2, max: 5 }, { id: 'brass_case', min: 0, max: 2 },
        { id: 'gear', min: 0, max: 2 }, { id: 'plank', min: 2, max: 4 }, { id: 'ration', min: 1, max: 2 },
        { id: 'steel_blade', min: 1, max: 1, chance: 0.3 }, { id: 'toolbox_rusty', min: 1, max: 1, chance: 0.4 },
        { id: 'compass_rusty', min: 1, max: 1, chance: 0.3 }, { id: 'pocket_watch_broken', min: 1, max: 1, chance: 0.25 },
      ],
      pickaxeBonus: ['iron_scrap'],
    },
    cave: {
      name: 'Caverna de Salitre e Enxofre', icon: '⛏', x: 3, y: 2, max: 4, needsLight: true,
      desc: 'Galerias úmidas e escuras: enxofre, minérios e carvão. Sem luz, o rendimento cai pela metade.',
      loot: [
        { id: 'sulfur', min: 2, max: 4 }, { id: 'iron_ore', min: 2, max: 5 }, { id: 'copper_ore', min: 1, max: 3 },
        { id: 'charcoal', min: 3, max: 6 }, { id: 'stone', min: 3, max: 6 },
      ],
      pickaxeBonus: ['iron_ore', 'copper_ore', 'sulfur'],
    },
    observatory: {
      name: 'Ruínas do Observatório', icon: '🔭', x: 7, y: 4, max: 4,
      desc: 'Um observatório colonial em ruínas: lentes, vidro, relógios e instrumentos.',
      loot: [
        { id: 'lens', min: 1, max: 3 }, { id: 'glass', min: 2, max: 5 }, { id: 'pocket_watch_broken', min: 1, max: 2 },
        { id: 'gear', min: 1, max: 2 }, { id: 'spring', min: 1, max: 2 }, { id: 'brass_case', min: 0, max: 1 },
        { id: 'toolbox_rusty', min: 1, max: 1, chance: 0.4 }, { id: 'compass_rusty', min: 1, max: 1, chance: 0.3 },
      ],
      pickaxeBonus: [],
    },
    submarine: {
      name: 'Destroços do Submarino Misterioso', icon: '☸', x: 8, y: 8, max: 3, needsLight: true, rare: true,
      desc: 'Um casco metálico impossível para 1865. O casco só abre na Era 3+ (nível 8) ou com Nitroglicerina.',
      loot: [
        { id: 'volt_cell', min: 1, max: 3 }, { id: 'copper_wire', min: 4, max: 8 }, { id: 'steel_ingot', min: 1, max: 3 },
        { id: 'gear', min: 2, max: 4 }, { id: 'spring', min: 2, max: 3 }, { id: 'lens', min: 1, max: 2 }, { id: 'copper_ingot', min: 1, max: 2 },
      ],
      pickaxeBonus: [],
    },
  };

  const EXPLORE = { kcal: 200, hydration: 15, stamina: 20 };
  const FORAGE = { minutes: 180, kcal: 250, hydration: 15, stamina: 20 };

  const Island = {
    N, GRID, BIOMES, POIS, TRIBE_POS, BASE, EXPLORE, FORAGE,

    initState() {
      const revealed = new Array(N * N).fill(false);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) revealed[(BASE.y + dy) * N + (BASE.x + dx)] = true;
      const poi = {};
      Object.keys(POIS).forEach((id) => { poi[id] = { left: POIS[id].max, done: 0 }; });
      return { revealed, poi, explored: 0, credits: 0, trades: 0, volume: 0, tribes: Ilha.Economy.initTribes() };
    },

    /** Completa/normaliza o estado do mapa de saves antigos. */
    migrate(d) {
      const fresh = this.initState();
      if (!d.map) { d.map = fresh; return; }
      const m = d.map;
      if (!Array.isArray(m.revealed) || m.revealed.length !== N * N) m.revealed = fresh.revealed;
      m.poi = m.poi || {};
      Object.keys(POIS).forEach((id) => { if (!m.poi[id]) m.poi[id] = fresh.poi[id]; });
      m.tribes = m.tribes || fresh.tribes;
      // saves antigos tinham 3 tribos: funde tudo na única tribo atual (descoberta, reputação e volume)
      const old = Object.keys(m.tribes).filter((id) => !fresh.tribes[id]);
      Object.keys(fresh.tribes).forEach((id) => {
        if (!m.tribes[id]) m.tribes[id] = fresh.tribes[id];
        const t = m.tribes[id]; const fs = fresh.tribes[id].stock;
        old.forEach((o) => { const ot = m.tribes[o]; if (!ot) return; t.discovered = !!(t.discovered || ot.discovered); t.reputation = Math.max(t.reputation || 0, ot.reputation || 0); t.volume = (t.volume || 0) + (ot.volume || 0); });
        t.stock = t.stock || {};
        Object.keys(fs).forEach((it) => { if (!t.stock[it]) t.stock[it] = fs[it]; });
      });
      old.forEach((o) => { delete m.tribes[o]; });
      // tribo já descoberta (ex.: vinda de um save com 3 tribos): o setor dela fica revelado para o comércio abrir
      Object.keys(fresh.tribes).forEach((id) => { const tp = TRIBE_POS[id]; if (tp && m.tribes[id] && m.tribes[id].discovered) m.revealed[tp.y * N + tp.x] = true; });
      ['explored', 'credits', 'trades', 'volume'].forEach((k) => { if (typeof m[k] !== 'number') m[k] = 0; });
    },

    biomeAt(x, y) { return (x < 0 || y < 0 || x >= N || y >= N) ? 'O' : GRID[y][x]; },
    isLand(x, y) { return this.biomeAt(x, y) !== 'O'; },
    isRevealed(x, y) { return x >= 0 && y >= 0 && x < N && y < N && (this.biomeAt(x, y) === 'O' || !!M().revealed[y * N + x]); },
    poiAt(x, y) { return Object.keys(POIS).find((id) => POIS[id].x === x && POIS[id].y === y) || null; },
    tribeAt(x, y) { return Object.keys(TRIBE_POS).find((id) => TRIBE_POS[id].x === x && TRIBE_POS[id].y === y) || null; },
    revealedCount() { let n = 0; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (this.isLand(x, y) && M().revealed[y * N + x]) n++; return n; },
    landCount() { let n = 0; for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (this.isLand(x, y)) n++; return n; },

    /** Quadrante coberto por névoa, em terra, vizinho (8 direções) de um quadrante revelado. */
    canExplore(x, y) {
      if (!this.isLand(x, y) || M().revealed[y * N + x]) return { ok: false, msg: '' };
      let adj = false;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if ((dx || dy) && this.isLand(nx, ny) && M().revealed[ny * N + nx]) adj = true;
      }
      return adj ? { ok: true, msg: '' } : { ok: false, msg: 'Só é possível desbravar quadrantes vizinhos de um setor já revelado.' };
    },

    exploreCost(x, y) { return Object.assign({ minutes: BIOMES[this.biomeAt(x, y)].minutes }, EXPLORE); },

    // ------------------------------------------------------------
    // Desbravar Quadrante
    // ------------------------------------------------------------
    explore(x, y) {
      const P = Ilha.Player; const S = Ilha.State; const d = D(); const st = d.player.stats;
      if (d.dead || d.sleeping) return false;
      const chk = this.canExplore(x, y);
      if (!chk.ok) { if (chk.msg) P.say(chk.msg, 'hint'); return false; }
      if (st.hydration < EXPLORE.hydration + 10 || st.calories < EXPLORE.kcal + 100) {
        P.say('Você precisa estar hidratado e alimentado para uma expedição (beba e coma antes).'); return false;
      }
      const c = this.exploreCost(x, y);
      if (!P.canAfford({ stamina: c.stamina })) return false;
      const bname = BIOMES[this.biomeAt(x, y)].name;
      S.log(`Você parte em expedição rumo ao setor (${x},${y}) — ${bname}…`);
      if (!P.act({ minutes: c.minutes, kcal: c.kcal, stamina: c.stamina, hyd: -c.hydration, noCheck: true, label: 'Expedição: ' + bname })) return false;
      if (d.dead) return false;
      M().revealed[y * N + x] = true; M().explored++;
      const found = [];
      const poi = this.poiAt(x, y); const tr = this.tribeAt(x, y);
      if (poi) found.push(POIS[poi].name);
      if (tr) { M().tribes[tr].discovered = true; found.push(Ilha.Economy.TRIBES[tr].name); }
      S.log(`Setor (${x},${y}) desbravado: ${bname}.${found.length ? ' DESCOBERTA: ' + found.join(' e ') + '!' : ' Nada de especial por aqui.'}`, 'good');
      P.gainXP(15 * Config.eraOfLevel(d.player.level) + (found.length ? 20 : 0), 'exploração');
      S.touch();
      return true;
    },

    // ------------------------------------------------------------
    // Vasculhar POI
    // ------------------------------------------------------------
    /** Requisitos e estado do POI em (x,y). */
    poiStatus(id) {
      const def = POIS[id]; const s = M().poi[id]; const C = Ilha.Crafting; const lvl = D().player.level;
      const nitro = C.count('nitro');
      const hasLight = Ilha.Player.torchActive();
      const hullOpen = id !== 'submarine' || lvl >= 8;
      return {
        def, left: s.left, max: def.max, hasLight, nitro, hullOpen,
        canNormal: s.left > 0 && hullOpen,
        canNitro: s.left > 0 && nitro > 0,
        pickaxe: C.hasTool('pickaxe'),
        regen: 'Regenera parcialmente a cada 7 dias.',
      };
    },

    /** useNitro: detona 1 Nitroglicerina (+50% e abre o casco do submarino). */
    forage(id, useNitro) {
      const P = Ilha.Player; const C = Ilha.Crafting; const S = Ilha.State; const d = D(); const st = d.player.stats;
      const def = POIS[id]; const sp = M().poi[id];
      if (!def || d.dead || d.sleeping) return false;
      if (!this.isRevealed(def.x, def.y)) return false;
      const ps = this.poiStatus(id);
      if (sp.left <= 0) { P.say('Este local já foi totalmente vasculhado. Ele se renova aos poucos (semanalmente).', 'hint'); return false; }
      if (useNitro ? !ps.canNitro : !ps.canNormal) { P.say(id === 'submarine' ? 'O casco está selado: exige Era 3 (nível 8) ou Nitroglicerina.' : 'Não é possível vasculhar agora.'); return false; }
      if (st.hydration < FORAGE.hydration + 10 || st.calories < FORAGE.kcal + 100) { P.say('Você precisa estar hidratado e alimentado para uma expedição de coleta.'); return false; }
      if (!P.canAfford({ stamina: FORAGE.stamina })) return false;
      S.log(`Você parte para vasculhar: ${def.name}…`);
      const light = P.torchActive(); // a luz conta na PARTIDA (a tocha pode queimar durante a viagem)
      if (useNitro) { C.remove('nitro', 1); st.hp = Math.max(1, st.hp - 10); S.log('A nitroglicerina rasga o casco/entulho: estilhaços ferem Cyrus (-10 HP).', 'bad'); }
      if (!P.act({ minutes: FORAGE.minutes, kcal: FORAGE.kcal, stamina: FORAGE.stamina, hyd: -FORAGE.hydration, noCheck: true, label: 'Coleta: ' + def.name })) return false;
      if (d.dead) return false;
      sp.left--; sp.done++;
      // bônus: luz, picareta, nitroglicerina
      const lightMult = def.needsLight && !light ? 0.5 : (light ? 1.15 : 1);
      const parts = []; let lost = 0;
      def.loot.forEach((dr) => {
        if (dr.chance && Math.random() > dr.chance) return;
        let n = dr.min + Math.floor(Math.random() * (dr.max - dr.min + 1));
        let mult = lightMult;
        if (useNitro) mult *= 1.5;
        if (C.hasTool('pickaxe') && def.pickaxeBonus.includes(dr.id)) mult *= 1.5;
        n = Math.max(dr.min > 0 ? 1 : 0, Math.round(n * mult));
        if (n <= 0) return;
        const got = C.add(dr.id, n);
        if (got > 0) parts.push(`${got}x ${C.name(dr.id)}`);
        lost += n - got;
      });
      S.log(`Expedição a ${def.name}: ${parts.join(', ') || 'nada de útil'}.${def.needsLight && !light ? ' (Sem tocha acesa o rendimento caiu pela metade.)' : ''}${C.hasTool('pickaxe') && def.pickaxeBonus.length ? ' Picareta: +50% de minério.' : ''}`, 'good');
      if (lost > 0) S.log('Sua mochila encheu: parte do saque ficou para trás.', 'warn');
      if (!d.player.crafted['poi_' + id]) { d.player.crafted['poi_' + id] = true; P.gainXP(40 * Config.eraOfLevel(d.player.level), 'primeira expedição de coleta'); }
      else P.gainXP(10, 'expedição de coleta');
      S.touch();
      return true;
    },

    /** onDayTick: a cada 7 dias os POIs recuperam metade do estoque máximo. */
    daily(day) {
      if (day % 7 !== 0) return;
      let any = false;
      Object.keys(POIS).forEach((id) => {
        const s = M().poi[id]; const def = POIS[id];
        if (s.left < def.max) { s.left = Math.min(def.max, s.left + Math.ceil(def.max / 2)); any = true; }
      });
      if (any) Ilha.State.log('Uma semana se passou: os locais de saque da ilha recuperaram parte dos suprimentos (maré, desabamentos, ventos).', 'story');
    },
  };

  Ilha.Island = Island;
})();
