/* =====================================================================
 * sites.js — Obras (canteiros de construção).
 *
 * Estruturas grandes não são montadas "por peças": marca-se uma OBRA e
 * Cyrus trabalha nela hora a hora. O custo (material + energia + tempo)
 * é pago ao longo do trabalho; dá para parar a qualquer hora e voltar
 * depois — o canteiro fica no mapa como uma obra inacabada. Ao completar
 * as horas, a estrutura inteira aparece de uma só vez.
 *
 *   world.sites["cx,cy"] = { rid, cx, cy, hours, done, paid:[n,…], got:{item:n} }
 *   Casa pré-fabricada (layer 'prefab'): âncora = centro da pegada 5x5.
 *   Estrutura de 1 tile: âncora = o próprio tile.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const key = (x, y) => x + ',' + y;
  const D = () => Ilha.State.data;
  const W = () => Ilha.State.data.world;
  const REACH_WORK = 3;       // distância máxima (Chebyshev) até um tile da obra para trabalhar

  const Sites = {

    /** Meias-dimensões (hx, hy) da pegada de uma receita prefab (padrão 5x5 = 2,2). */
    dims(r) { return { hx: r.prefab && r.prefab.hx != null ? r.prefab.hx : 2, hy: r.prefab && r.prefab.hy != null ? r.prefab.hy : 2 }; },
    /** Meias-dimensões gravadas na obra (saves antigos guardavam só `half`). */
    siteDims(s) { const h = s.half || 0; return { hx: s.hx != null ? s.hx : h, hy: s.hy != null ? s.hy : h }; },
    sizeText(r) { const d = this.dims(r); return `${2 * d.hx + 1}×${2 * d.hy + 1}`; },

    recipeOf(site) { return Ilha.Crafting.recipe(site.rid); },
    isPrefab(r) { return !!(r && r.layer === 'prefab'); },
    all() { return (W().sites = W().sites || {}); },

    /** Tiles da obra de uma receita ancorada em (cx,cy): [{x,y,role}] */
    layout(r, cx, cy, hx, hy) {
      if (!this.isPrefab(r)) return [{ x: cx, y: cy, role: 'small' }];
      if (hx == null || hy == null) { const d = this.dims(r); hx = d.hx; hy = d.hy; }
      const out = [];
      for (let dy = -hy; dy <= hy; dy++) {
        for (let dx = -hx; dx <= hx; dx++) {
          const edge = Math.abs(dx) === hx || Math.abs(dy) === hy;
          let role = 'floor';
          if (edge) {
            role = 'wall';
            if (dx === 0 && dy === hy) role = 'door';
            else if (r.prefab.window && dx === hx && dy === 0) role = 'window';
          }
          out.push({ x: cx + dx, y: cy + dy, role });
        }
      }
      return out;
    },

    /** Tiles que ficam "ocupados" pelo canteiro enquanto a obra existe (inclui a porta e o interior). */
    footprint(site) { const d = this.siteDims(site); return this.layout(this.recipeOf(site), site.cx, site.cy, d.hx, d.hy); },

    /** Obra que ocupa (x,y) — canteiro ou terreno reservado (interior/porta) — ou null. */
    siteAt(x, y) {
      const all = this.all();
      for (const k of Object.keys(all)) {
        const s = all[k];
        const d = this.siteDims(s);
        if (Math.abs(x - s.cx) <= d.hx && Math.abs(y - s.cy) <= d.hy) return s;
      }
      return null;
    },

    progress(site) { return site.done / site.hours; },
    stage(site) { const p = this.progress(site); return p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2; },

    /** Material total / pago por ingrediente: [{ing, total, paid}] */
    materials(site) {
      const r = this.recipeOf(site);
      return r.in.map((ing, i) => ({ ing, total: ing.qty, paid: site.paid[i] || 0 }));
    },
    /** Quanto de cada ingrediente falta pagar para fechar as próximas n horas. */
    needFor(site, n) {
      const r = this.recipeOf(site);
      const target = Math.min(site.hours, site.done + n);
      return r.in.map((ing, i) => Math.max(0, Math.ceil(ing.qty * target / site.hours) - (site.paid[i] || 0)));
    },
    /** Horas (de n) que o inventário atual consegue pagar. */
    affordableHours(site, n) {
      const C = Ilha.Crafting; const r = this.recipeOf(site);
      let h = 0;
      for (; h < n; h++) {
        const need = this.needFor(site, h + 1);
        if (!r.in.every((ing, i) => C.ingHave(ing) >= need[i])) break;
      }
      return h;
    },

    // ------------------------------------------------------------
    // Início
    // ------------------------------------------------------------
    canStart(r, x, y) {
      const Wd = Ilha.World; const p = D().player;
      const tiles = this.layout(r, x, y);
      for (const t of tiles) {
        if (!Wd.inBounds(t.x, t.y)) return { ok: false, msg: 'A obra não cabe no mapa aqui.' };
        const terr = Wd.terrainAt(t.x, t.y); const td = Config.TERRAIN[terr];
        if (!td.walk || td.water) return { ok: false, msg: 'Não é possível construir na água.' };
        if (terr === 'TILLED_SOIL') return { ok: false, msg: 'Não construa sobre a terra arada.' };
        if (terr === 'IRRIGATION_CANAL') return { ok: false, msg: 'Há um canal de irrigação no terreno.' };
        if (Wd.objectAt(t.x, t.y)) return { ok: false, msg: this.isPrefab(r) ? `O terreno ${this.sizeText(r)} precisa estar livre (há algo no caminho).` : 'O tile está ocupado.' };
        if (Wd.floorAt(t.x, t.y) || Wd.roofAt(t.x, t.y)) return { ok: false, msg: 'Já há piso ou telhado neste terreno.' };
        if (Ilha.Player.dropsAt(t.x, t.y).length) return { ok: false, msg: 'Há itens largados no terreno da obra.' };
        if (this.siteAt(t.x, t.y)) return { ok: false, msg: 'Já existe uma obra aqui.' };
        const solidRole = t.role === 'wall' || t.role === 'window' || t.role === 'small';
        if (solidRole && p.x === t.x && p.y === t.y) return { ok: false, msg: 'Você está sobre o terreno da obra: afaste-se.' };
      }
      if (r.rule === 'river' && !tiles.some((t) => [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]].some(([dx, dy]) => Wd.terrainAt(t.x + dx, t.y + dy) === 'RIVER_WATER'))) {
        return { ok: false, msg: "A Roda d'Água só pode ser construída ao lado do rio." };
      }
      return { ok: true, msg: '' };
    },

    /** Marca a obra no mapa (sem custo). Retorna o canteiro ou null. */
    start(r, x, y) {
      const chk = this.canStart(r, x, y);
      if (!chk.ok) { Ilha.UI.toast(chk.msg); return null; }
      const lvl = D().player.level;
      if (lvl < (r.minLevel || 1)) { Ilha.UI.toast(`Requer Nível ${r.minLevel}`); return null; }
      const dm = this.isPrefab(r) ? this.dims(r) : { hx: 0, hy: 0 };
      const site = { rid: r.id, cx: x, cy: y, hours: r.site.hours, done: 0, paid: r.in.map(() => 0), got: {}, hx: dm.hx, hy: dm.hy };
      this.all()[key(x, y)] = site;
      this.layout(r, x, y).forEach((t) => {
        delete W().regen[key(t.x, t.y)];      // sem rebrota de vegetação dentro do canteiro
        if (t.role === 'wall' || t.role === 'window') Ilha.World.setObject(t.x, t.y, 'SITE_WALL');
        else if (t.role === 'small') Ilha.World.setObject(t.x, t.y, 'SITE_SMALL');
      });
      Ilha.World.bump();
      Ilha.State.log(`Você marca o terreno da obra: [${r.name}] (${site.hours} h de trabalho). Nada foi gasto ainda — o material sai conforme você trabalha.`, 'good');
      Ilha.State.touch();
      return site;
    },

    // ------------------------------------------------------------
    // Trabalho
    // ------------------------------------------------------------
    /** Perto o suficiente de algum tile da obra? */
    inReach(site) {
      const p = D().player;
      return this.footprint(site).some((t) => Math.max(Math.abs(t.x - p.x), Math.abs(t.y - p.y)) <= REACH_WORK);
    },

    /** Trabalha até `hours` horas. Retorna { worked, reason, finished }. */
    work(site, hours) {
      const d = D(); const C = Ilha.Crafting; const Pl = Ilha.Player;
      const r = this.recipeOf(site);
      const res = { worked: 0, reason: '', finished: false };
      if (!r || !this.all()[key(site.cx, site.cy)]) { res.reason = 'A obra não existe mais.'; return res; }
      if (d.dead) return res;
      if (d.sleeping) { res.reason = 'Você está dormindo.'; return res; }
      if (!this.inReach(site)) { res.reason = 'Aproxime-se da obra (até 3 tiles) para trabalhar.'; return res; }
      if (d.player.level < (r.minLevel || 1)) { res.reason = `Requer Nível ${r.minLevel}.`; return res; }
      const st = d.player.stats;
      const left = site.hours - site.done;
      hours = Math.max(1, Math.min(hours, left));
      const seq = d.logSeq;

      for (let h = 0; h < hours; h++) {
        const need = this.needFor(site, 1);
        const lack = [];
        r.in.forEach((ing, i) => { if (need[i] > 0 && C.ingHave(ing) < need[i]) lack.push(`${need[i] - C.ingHave(ing)}x ${C.ingName(ing)}`); });
        if (lack.length) { res.reason = 'Faltam materiais para a próxima hora: ' + lack.join(', ') + '.'; break; }
        if (st.stamina + 1e-6 < r.site.stamina * Pl.staminaMult()) { res.reason = 'Você está exausto demais: descanse ou durma [R] e volte à obra.'; break; }
        if (st.hydration < 15) { res.reason = 'Sede crítica: beba água antes de continuar.'; break; }
        if (st.calories < 250) { res.reason = 'Fome crítica: coma antes de continuar.'; break; }

        if (!Pl.act({ minutes: 60, kcal: r.site.kcal, stamina: r.site.stamina, hygiene: -2, work: true, noCheck: true })) break;
        if (d.dead) { res.worked++; return res; }
        r.in.forEach((ing, i) => {
          if (need[i] <= 0) return;
          if (!ing.anyOf) { C.remove(ing.id, need[i]); site.got[ing.id] = (site.got[ing.id] || 0) + need[i]; }
          else {
            let n = need[i];
            for (const id of ing.anyOf) { const t = Math.min(n, C.count(id)); if (t > 0) { C.remove(id, t); site.got[id] = (site.got[id] || 0) + t; n -= t; } }
          }
          site.paid[i] = (site.paid[i] || 0) + need[i];
        });
        site.done++; res.worked++;
        if (Ilha.Audio) Ilha.Audio.play('build');
        if (site.done >= site.hours) { this.finish(site); res.finished = true; break; }
        if (d.log.some((l) => l.id > seq && l.cls === 'bad')) { res.reason = 'Algo o interrompeu: veja o diário.'; break; }
      }

      if (res.worked && !res.finished) {
        Ilha.State.log(`Você trabalha ${res.worked} h na obra [${r.name}]: ${site.done}/${site.hours} h (${Math.round(this.progress(site) * 100)}%).`, 'good');
      }
      if (res.reason) Ilha.State.log(res.reason, 'warn');
      Ilha.World.bump();
      Ilha.State.touch();
      return res;
    },

    /** Conclui: o canteiro some e a estrutura inteira surge de uma vez. */
    finish(site) {
      const r = this.recipeOf(site); const Wd = Ilha.World; const w = W();
      const sd = this.siteDims(site);
      const tiles = this.layout(r, site.cx, site.cy, sd.hx, sd.hy);
      delete this.all()[key(site.cx, site.cy)];
      tiles.forEach((t) => { Wd.setObject(t.x, t.y, null); });
      if (this.isPrefab(r)) {
        const pf = r.prefab;
        tiles.forEach((t) => {
          if (t.role === 'floor' || t.role === 'door') Wd.setFloor(t.x, t.y, pf.floor);
          if (t.role === 'wall') Wd.setObject(t.x, t.y, pf.wall);
          else if (t.role === 'window') Wd.setObject(t.x, t.y, pf.window);
          else if (t.role === 'door') Wd.setObject(t.x, t.y, pf.door);
          Wd.setRoof(t.x, t.y, pf.roof);
          if (t.role !== 'door') delete w.doorsOpen[key(t.x, t.y)];
        });
      } else {
        Wd.setObject(site.cx, site.cy, r.place);
        Ilha.Stations.ensure(site.cx, site.cy);
      }
      Wd.bump();
      Ilha.State.log(`A obra terminou! [${r.name}] está pronta.`, 'good');
      Ilha.UI.toast(`Obra concluída: ${r.name.replace(' (obra)', '')}!`);
      const pl = D().player;
      if (!pl.crafted[r.id]) { pl.crafted[r.id] = true; Ilha.Player.gainXP(r.xp, 'primeira vez: ' + r.name); }
      Ilha.State.touch();
    },

    /** Cancela a obra: devolve 50% do material já gasto (excedente vira pilha no chão). */
    cancel(site) {
      const r = this.recipeOf(site); const C = Ilha.Crafting; const Wd = Ilha.World;
      const sd = this.siteDims(site);
      const tiles = this.layout(r, site.cx, site.cy, sd.hx, sd.hy);
      delete this.all()[key(site.cx, site.cy)];
      tiles.forEach((t) => { const o = Wd.objectAt(t.x, t.y); if (o === 'SITE_WALL' || o === 'SITE_SMALL') Wd.setObject(t.x, t.y, null); });
      const back = []; const ground = [];
      Object.keys(site.got).forEach((id) => {
        const n = Math.floor(site.got[id] * 0.5);
        if (n <= 0) return;
        const got = C.add(id, n);
        if (got) back.push(`${got}x ${C.name(id)}`);
        if (n - got > 0 && Ilha.Player.spawnDrop(id, n - got)) ground.push(`${n - got}x ${C.name(id)}`);
      });
      Wd.bump();
      Ilha.State.log(`Você desmonta a obra [${r.name}].${back.length ? ' Recuperou: ' + back.join(', ') + '.' : ' Nada aproveitável.'}${ground.length ? ' No chão: ' + ground.join(', ') + '.' : ''}`, 'warn');
      Ilha.State.touch();
      return true;
    },
  };

  Ilha.Sites = Sites;
})();
