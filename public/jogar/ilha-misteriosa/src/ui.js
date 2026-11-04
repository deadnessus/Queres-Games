/* =====================================================================
 * ui.js — HUD "Gabinete de Engenharia Vitoriano", log narrativo,
 * tooltip de inspeção e janelas modais (I, C, M, J, R)
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const clamp = Config.clamp;

  const $ = (id) => document.getElementById(id);
  const S = () => Ilha.State;
  const D = () => Ilha.State.data;
  const Cr = () => Ilha.Crafting;
  const Pl = () => Ilha.Player;
  const Sp = () => Ilha.SpriteEngine;

  /** Cria elementos DOM de forma compacta. */
  function el(tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach((k) => {
        const v = props[k];
        if (v == null || v === false) return;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'disabled') e.disabled = !!v;
        else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v);
      });
    }
    kids.flat(Infinity).forEach((c) => {
      if (c == null || c === false) return;
      e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
    });
    return e;
  }
  const iconImg = (name, scale) => el('img', { class: 'px', src: Sp().iconURL(name, scale || 3), alt: '' });
  const objImg = (name) => el('img', { class: 'px', src: Sp().spriteURL(name, 3), alt: '' });

  const fmt = (n) => Math.round(n);
  const hoursText = (h) => (h >= 24 ? `${Math.floor(h / 24)}d ${Math.round(h % 24)}h` : `${Math.round(h)}h`);

  const UI = {
    modal: null,        // { name, build, closable }
    craftTab: null,
    stationPos: null,
    mapSel: null,
    pickupPos: null,
    trade: null,
    journalTab: 'diag',
    lastLogId: 0,
    toastTimer: null,
    el,

    // ------------------------------------------------------------
    // Inicialização
    // ------------------------------------------------------------
    init() {
      document.querySelectorAll('[data-action]').forEach((b) => {
        b.addEventListener('click', () => this.action(b.dataset.action));
      });
      $('slotMain').addEventListener('click', () => { if (!D().sleeping) Cr().unequip('mainHand'); });
      $('slotOff').addEventListener('click', () => { if (!D().sleeping) Cr().unequip('offHand'); });
      $('modalClose').addEventListener('click', () => this.closeModal());
      $('modalBackdrop').addEventListener('click', () => { if (performance.now() < (this.guardUntil || 0)) return; if (this.modal && this.modal.closable !== false) this.closeModal(); });
      this.lastLogId = 0;
      $('logBox').innerHTML = '';
      this.refresh(true);
    },

    action(name) {
      if (D().dead) return;
      switch (name) {
        case 'inventory': case 'craft': case 'map': case 'journal': case 'rest': this.toggle(name); break;
        case 'fullscreen': Ilha.Main.fullscreen(); break;
        case 'mute': Ilha.Audio.toggleMute(); break;
        case 'goal': this.toggleGoal(); break;
        case 'save':
          S().save(); this.toast('Jogo salvo.');
          break;
        case 'newgame':
          this.confirm('Reiniciar a aventura? O progresso atual será perdido.', () => Ilha.Main.newGame());
          break;
        default: break;
      }
    },

    // ------------------------------------------------------------
    // HUD
    // ------------------------------------------------------------
    refresh(force) {
      const st = S();
      if (!st.data) return;
      if (!st.dirty && !force) return;
      st.dirty = false;
      const d = st.data; const p = d.player; const s = p.stats;
      if (Ilha.Achievements) Ilha.Achievements.check();
      if (Ilha.Goals) Ilha.Goals.check();
      this.renderGoal();
      if (Ilha.Audio) Ilha.Audio.setRain(!d.dead && !d.sleeping && Ilha.State.weather().wet);

      // Log
      const box = $('logBox');
      const fresh = d.log.filter((l) => l.id > this.lastLogId);
      if (fresh.length) {
        const nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
        fresh.forEach((l) => {
          box.appendChild(el('p', { class: 'logline ' + l.cls }, el('span', { class: 'ts', text: l.t + ' ' }), l.text));
          this.lastLogId = l.id;
        });
        while (box.children.length > 220) box.removeChild(box.firstChild);
        if (nearBottom || force) box.scrollTop = box.scrollHeight;
      }

      // Mãos
      this.renderSlot('slotMainBody', p.equipped.mainHand);
      this.renderSlot('slotOffBody', p.equipped.offHand);

      // Mostradores
      const imm = (s.protein + s.vitamins) / 2;
      this.gauge('hp', s.hp, s.maxHp, 100, `${fmt(s.hp)}`);
      this.gauge('stamina', s.stamina, s.maxStamina, 100, `${fmt(s.stamina)}`);
      this.gauge('calories', s.calories, s.maxCalories, s.maxCalories, `${fmt(s.calories)}`);
      this.gauge('hydration', s.hydration, 100, 100, `${fmt(s.hydration)}%`);
      this.gauge('immunity', imm, 100, 100, `${fmt(imm)}%`);
      this.gauge('comfort', s.comfort, 100, 100, `${fmt(s.comfort)}%`);

      // Relógio
      const t = d.time;
      $('clkDay').textContent = `Dia ${t.day}`;
      $('clkTime').textContent = st.timeString();
      const inRoom = Pl().indoors();
      $('clkWeather').textContent = `${st.weather().label} · ${Math.round(st.ambientTemp())}°C${inRoom ? ' · Interior' + (inRoom.heated ? ' aquecido' : '') : ''}`;
      const pw = d.power;
      const pe = $('clkPower');
      if (pe) { const show = pw && (pw.cap > 0 || pw.gen > 0); pe.classList.toggle('hidden', !show); if (show) pe.textContent = `⚡ ${pw.stored.toFixed(1)}/${pw.cap} kWh (+${pw.gen || 0}/h)`; }
      $('clkTemp').textContent = `Corpo ${s.bodyTemp.toFixed(1)}°C`;
      $('clkTemp').style.color = s.bodyTemp < Config.BIO.HYPOTHERMIA_ON ? '#ff8466' : s.bodyTemp > 38 ? '#ffd24a' : '';
      const civ = Pl().civScore();
      $('clkCiv').textContent = `IC ${civ.points.toFixed(0)} · Σ ${Math.round(d.score.totalAccumulatedScore)}`;
      $('clkCiv').title = 'Índice de Civilização (hoje) · Σ acumulado';
      $('xpLine').textContent = `Nível ${p.level} (Era ${p.era}) · XP ${p.xp}/${p.xpToNext}`;

      // Condições
      const strip = $('statusStrip');
      strip.innerHTML = '';
      p.conditions.forEach((c) => {
        const cd = Config.CONDITIONS[c];
        if (!cd) return;
        let txt = cd.name;
        const tm = p.condTimers[c];
        if (tm && c !== 'SKIN_INFECTION') txt += ` (~${hoursText(tm)})`;
        strip.appendChild(el('span', { class: 'badge ' + cd.kind, title: `${cd.name}: ${cd.desc}${cd.cure ? ' Tratamento: ' + cd.cure : ''}` }, cd.icon + ' ' + cd.name));
      });

      if (this.modal && this.modal.live) this.rerender(true);
    },

    /** Painel "Próximo passo" (meta atual da trilha). */
    goalCollapsed() { try { return localStorage.getItem('ilha_goal_collapsed') === '1'; } catch (e) { return false; } },
    toggleGoal() {
      try { localStorage.setItem('ilha_goal_collapsed', this.goalCollapsed() ? '0' : '1'); } catch (e) { /* sem storage */ }
      this.renderGoal();
    },
    renderGoal() {
      const box = $('goalBar'); if (!box) return;
      const g = Ilha.Goals && Ilha.Goals.current();
      if (!g || D().dead) { box.classList.add('hidden'); return; }
      box.classList.remove('hidden');
      box.innerHTML = '';
      const col = this.goalCollapsed();
      const tog = el('button', { class: 'goal-tog', 'aria-label': col ? 'Mostrar meta' : 'Recolher meta', title: col ? 'Mostrar' : 'Recolher', text: col ? '▸' : '▾', onclick: () => this.toggleGoal() });
      if (!g.goal) { box.appendChild(el('span', { class: 'goal-txt' }, el('b', { text: '🎯 Todas as metas cumpridas!' }), ' A Ilha é sua.')); box.appendChild(tog); return; }
      box.appendChild(el('span', { class: 'goal-txt' }, el('b', { text: `🎯 Próximo passo (${g.done + 1}/${g.total}): ` }), g.goal.text, col ? null : el('small', { text: g.goal.hint })));
      box.appendChild(tog);
    },

    gauge(id, val, max, scaleMax, text) {
      const g = document.querySelector(`.gauge[data-g="${id}"]`);
      if (!g) return;
      g.querySelector('.g-fill').style.width = clamp((val / scaleMax) * 100, 0, 100) + '%';
      g.querySelector('.g-cap').style.width = clamp(100 - (max / scaleMax) * 100, 0, 100) + '%';
      g.querySelector('.g-val').textContent = text;
      g.classList.toggle('low', val / Math.max(1, max) < 0.2);
      g.title = `${g.querySelector('.g-label').textContent}: ${text}`;
    },

    renderSlot(id, itemId) {
      const body = $(id);
      body.innerHTML = '';
      if (!itemId) { body.appendChild(el('span', { class: 'empty', text: 'Mãos livres' })); return; }
      const it = Cr().ITEMS[itemId];
      body.appendChild(iconImg(it.icon, 3));
      body.appendChild(el('span', { text: it.name }));
    },

    // ------------------------------------------------------------
    // Tooltip e Toast
    // ------------------------------------------------------------
    showTooltip(info, mx, my) {
      const tt = $('tooltip');
      if (!info) { tt.classList.add('hidden'); return; }
      tt.innerHTML = '';
      tt.appendChild(el('div', { class: 'tt-title', text: info.title }));
      info.lines.forEach((l) => tt.appendChild(el('div', { class: l.cls || '', text: l.text })));
      tt.classList.remove('hidden');
      const world = $('world');
      const w = tt.offsetWidth, h = tt.offsetHeight;
      let x = mx + 16, y = my + 16;
      if (x + w > world.clientWidth - 6) x = mx - w - 12;
      if (y + h > world.clientHeight - 6) y = my - h - 12;
      tt.style.left = Math.max(4, x) + 'px';
      tt.style.top = Math.max(4, y) + 'px';
    },
    hideTooltip() { $('tooltip').classList.add('hidden'); },

    toast(msg) {
      const t = $('toast');
      t.textContent = msg;
      t.classList.remove('hidden');
      t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => t.classList.add('hidden'), 2600);
    },

    // ------------------------------------------------------------
    // Sistema de modais
    // ------------------------------------------------------------
    isModalOpen() { return !$('modalRoot').classList.contains('hidden'); },

    toggle(name) {
      if (this.modal && this.modal.name === name) this.closeModal();
      else this.open(name);
    },

    open(name, opts) {
      const builders = {
        inventory: () => this.buildInventory(),
        craft: () => this.buildCraft(),
        journal: () => this.buildJournal(),
        rest: () => this.buildRest(),
        map: () => this.buildMap(),
        station: () => this.buildStation(),
        trade: () => this.buildTrade(),
        pickup: () => this.buildPickup(),
        site: () => this.buildSite(),
      };
      if (name === 'craft' && !this.craftTab) this.craftTab = D().player.era;
      const build = (opts && opts.build) || builders[name];
      if (!build) return;
      this.modal = { name, build, closable: !(opts && opts.closable === false), live: !(opts && opts.live === false) && !!builders[name] };
      this.hideTooltip();
      this.rerender();
      $('modalRoot').classList.remove('hidden');
      if (document.body.classList.contains('touch')) { // evita toque-fantasma: o dedo ainda pode estar sobre um botão recém-aberto
        this.guardUntil = performance.now() + 450;
      }
      $('modalClose').style.display = this.modal.closable ? '' : 'none';
    },

    rerender(keepScroll) {
      if (!this.modal) return;
      const body = $('modalBody');
      const scroll = keepScroll ? body.scrollTop : 0;
      const m = this.modal.build();
      $('modalTitle').textContent = m.title;
      body.innerHTML = '';
      body.appendChild(m.body);
      const foot = $('modalFoot');
      foot.innerHTML = '';
      (m.foot || []).forEach((n) => foot.appendChild(n));
      body.scrollTop = scroll;
    },

    closeModal() {
      if (!this.modal) return;
      this.modal = null;
      $('modalRoot').classList.add('hidden');
    },

    /** Aplica uma ação do jogador dentro de um modal e atualiza tudo. */
    run(fn) {
      fn();
      this.refresh(true);
      if (this.modal) this.rerender(true);
    },

    /** Menu de ações contextuais (água, fogueira…). */
    menu(title, options, subtitle) {
      this.open('menu', {
        live: false,
        build: () => {
          const body = el('div');
          if (subtitle) body.appendChild(el('p', { class: 'muted', text: subtitle }));
          options.forEach((o) => {
            body.appendChild(el('button', {
              class: 'menu-btn', disabled: o.disabled,
              onclick: () => { if (performance.now() < (this.guardUntil || 0)) return; this.closeModal(); o.action(); this.refresh(true); },
            }, o.label, o.hint ? el('small', { text: o.hint }) : null));
          });
          return { title, body, foot: [el('button', { class: 'btn', text: 'Cancelar', onclick: () => this.closeModal() })] };
        },
      });
    },

    confirm(text, onYes) {
      this.open('confirm', {
        live: false,
        build: () => ({
          title: 'Confirmação',
          body: el('p', { text }),
          foot: [
            el('button', { class: 'btn', text: 'Cancelar', onclick: () => this.closeModal() }),
            el('button', { class: 'btn danger', text: 'Confirmar', onclick: () => { this.closeModal(); onYes(); } }),
          ],
        }),
      });
    },

    // ------------------------------------------------------------
    // [I] Inventário & Sucata
    // ------------------------------------------------------------
    buildInventory() {
      const d = D(); const p = d.player; const C = Cr();
      const body = el('div');
      const eq = p.equipped;

      body.appendChild(el('h3', { text: 'Mãos equipadas' }));
      const handRow = (label, hand) => {
        const id = eq[hand];
        return el('div', { class: 'row' },
          id ? iconImg(C.ITEMS[id].icon, 3) : el('div', { style: 'width:40px;height:40px;flex:none' }),
          el('div', { class: 'info' }, el('div', { class: 'name', text: label }), el('div', { class: 'desc', text: id ? C.ITEMS[id].name : '— livre —' })),
          el('div', { class: 'acts' }, id ? el('button', { class: 'btn sm', text: 'Guardar', onclick: () => this.run(() => C.unequip(hand)) }) : null));
      };
      body.appendChild(handRow('Mão Direita (ferramenta primária)', 'mainHand'));
      body.appendChild(handRow('Mão Esquerda (utilitário / luz)', 'offHand'));

      body.appendChild(el('h3', { text: 'Mochila' }));
      const order = { tool: 0, food: 1, drink: 2, medicine: 3, scrap: 4, component: 5, material: 6 };
      const inv = p.inventory.slice().sort((a, b) => (order[C.ITEMS[a.id].type] - order[C.ITEMS[b.id].type]) || C.ITEMS[a.id].name.localeCompare(C.ITEMS[b.id].name));
      if (!inv.length) body.appendChild(el('p', { class: 'muted', text: 'A mochila está vazia.' }));
      const busy = d.dead || d.sleeping;
      inv.forEach((e) => {
        const it = C.ITEMS[e.id];
        const acts = [];
        if (it.use) acts.push(el('button', { class: 'btn sm', disabled: busy, text: it.type === 'drink' ? 'Beber' : it.type === 'medicine' ? 'Usar' : 'Consumir', onclick: () => this.run(() => C.useItem(e.id)) }));
        if (it.equip) {
          acts.push(el('button', { class: 'btn sm', disabled: busy, text: eq.mainHand === e.id ? '✔ Mão D.' : 'Mão D.', onclick: () => this.run(() => C.equip(e.id, 'mainHand')) }));
          acts.push(el('button', { class: 'btn sm', disabled: busy, text: eq.offHand === e.id ? '✔ Mão E.' : 'Mão E.', onclick: () => this.run(() => C.equip(e.id, 'offHand')) }));
        }
        if (C.SCRAP[e.id]) acts.push(el('button', { class: 'btn sm', disabled: busy, text: 'Desmontar (Scrap)', onclick: () => this.run(() => C.scrap(e.id)) }));
        acts.push(el('button', { class: 'btn sm danger', disabled: busy, title: 'Largar 1 unidade no chão', text: '🗑 1', onclick: () => this.run(() => C.discard(e.id, 1)) }));
        if (e.qty > 1) acts.push(el('button', { class: 'btn sm danger', disabled: busy, title: 'Largar todas as unidades no chão', text: '🗑 Todos',
          onclick: () => this.confirm(`Largar ${e.qty}x ${it.name} no chão? Você poderá pegá-los de novo depois.`, () => { C.discard(e.id, e.qty); this.refresh(true); this.open('inventory'); }) }));
        const extra = C.SCRAP[e.id] ? ' → ' + C.SCRAP[e.id].out.map((o) => `${o.qty}x ${C.ITEMS[o.id].name}`).join(', ') : '';
        body.appendChild(el('div', { class: 'row' },
          iconImg(it.icon, 3),
          el('div', { class: 'info' },
            el('div', { class: 'name', text: `${it.name}  ×${e.qty}${e.charge ? ' (' + e.charge + ' porções)' : ''}` }),
            el('div', { class: 'desc', text: it.desc + extra })),
          el('div', { class: 'small muted', text: (it.weight * e.qty).toFixed(1) + ' kg' }),
          el('div', { class: 'acts' }, acts)));
      });

      const w = C.weight();
      const foot = [
        el('span', { class: 'small', text: `Peso carregado: ${w.toFixed(1)} / ${Config.MAX_WEIGHT} kg` }),
        el('button', { class: 'btn', text: 'Fechar [I]', onclick: () => this.closeModal() }),
      ];
      return { title: 'Inventário & Sucata', body, foot };
    },

    // ------------------------------------------------------------
    // [C] Engenharia & Criação
    // ------------------------------------------------------------
    buildCraft() {
      const d = D(); const C = Cr(); const P = Pl(); const p = d.player;
      const body = el('div');
      const tabs = el('div', { class: 'tabs' });
      const firstLevel = { 1: 1, 2: 4, 3: 8, 4: 12 };
      Config.ERAS.forEach((era) => {
        const locked = p.level < firstLevel[era.id];
        tabs.appendChild(el('button', {
          class: 'tab' + (this.craftTab === era.id ? ' active' : '') + (locked ? ' locked' : ''),
          text: `Era ${era.id}${locked ? ' 🔒' : ''}`,
          onclick: () => { this.craftTab = era.id; this.rerender(); },
        }));
      });
      body.appendChild(tabs);

      const era = Config.ERAS[(this.craftTab || 1) - 1];
      body.appendChild(el('h3', { text: `Era ${era.id} — ${era.name} (Níveis ${era.levels})` }));
      body.appendChild(el('div', { class: 'quote small', text: era.diary || era.text }));
      const fire = P.nearLitFire();
      body.appendChild(el('p', { class: 'small', html: `Seu nível: <b>${p.level}</b> · Fogueira/lareira acesa por perto: <b class="${fire ? 'c-ok' : 'c-bad'}">${fire ? 'SIM ✔' : 'NÃO ✘'}</b> · Estruturas são posicionadas no <b>modo construção</b> (clique no mapa; Esc sai).` }));
      body.appendChild(el('p', {}, el('button', { class: 'btn sm danger', text: '⛏ Modo Demolir (devolve 50%)', onclick: () => { this.closeModal(); Ilha.Building.setMode('demolish'); } })));

      const iconFor = (r) => {
        if (r.kind === 'item') return iconImg(C.ITEMS[r.out.id].icon, 3);
        if (C.RECIPE_ICON_OBJ[r.id]) return objImg(C.RECIPE_ICON_OBJ[r.id]);
        return iconImg({ floor: 'plank', roof: 'roof_tile', canal: 'iron_shovel' }[r.icon] || 'stone', 3);
      };
      const group = (title, kind) => {
        const list = C.visibleRecipes().filter((r) => r.kind === kind && C.eraOf(r) === era.id);
        if (!list.length) return;
        body.appendChild(el('h3', { text: title }));
        list.forEach((r) => {
          const st = C.status(r, null, true);
          const est = P.estimate(r);
          const chips = r.in.map((i) => {
            const have = C.ingHave(i);
            return el('span', { class: 'chip ' + (have >= i.qty ? 'have' : (r.site ? 'part' : 'miss')), text: `${C.ingName(i)} ${have}/${i.qty}` });
          });
          const notes = [];
          if (!st.levelOk) notes.push(el('span', { class: 'c-bad', text: ` 🔒 Requer Nível ${r.minLevel}` }));
          if (r.tool) notes.push(el('span', { class: st.toolOk ? 'c-ok' : 'c-bad', text: ` ${st.toolOk ? '✔' : '✘'} ${Config.TOOL_NAMES[r.tool] || r.tool} equipado` }));
          if (r.station) notes.push(el('span', { class: st.stationOk ? 'c-ok' : 'c-bad', text: ` ${st.stationOk ? '✔' : '✘'} ${Config.STATION_NAMES[r.station]} por perto` }));
          if (r.power) notes.push(el('span', { class: st.powerOk ? 'c-ok' : 'c-bad', text: ` ⚡ ${r.power} kWh` }));
          if (r.fire) notes.push(el('span', { class: st.fireOk ? 'c-ok' : 'c-bad', text: st.fireOk ? ' 🔥 Fogueira ✔' : ' 🔥 Requer fogo aceso próximo ✘' }));
          if (r.rule === 'river') notes.push(el('span', { class: 'c-warn', text: ' ≈ ao lado do rio' }));
          const crafted = p.crafted[r.id];
          const can = st.levelOk && st.toolOk && (r.site || !st.missing.length) && (kind === 'structure' || (st.stationOk && st.fireOk && st.powerOk));
          body.appendChild(el('div', { class: 'row', style: st.levelOk ? '' : 'opacity:.6' },
            iconFor(r),
            el('div', { class: 'info' },
              el('div', { class: 'name', text: r.name + (crafted ? '' : `  ✦ novo (+${r.xp} XP)`) }),
              el('div', { class: 'desc', text: r.desc }),
              el('div', {}, chips, notes),
              r.site
                ? el('div', { class: 'desc', text: `🏗 OBRA: ${r.site.hours} h de trabalho (${Ilha.Sites.isPrefab(r) ? 'terreno ' + Ilha.Sites.sizeText(r) + ' · ' : ''}-${r.site.kcal} kcal e -${Math.round(r.site.stamina * P.staminaMult())} stamina por hora). Marcar não gasta nada: o material sai conforme você trabalha, e dá para parar e continuar depois.` })
                : el('div', { class: 'desc', text: `⏱ ${est.minutes} min · ⚡ -${est.kcal} kcal · stamina -${est.stamina}` })),
            el('div', { class: 'acts' }, el('button', {
              class: 'btn', disabled: !can || d.dead || d.sleeping, text: kind === 'item' ? 'Fabricar' : (r.site ? 'Marcar obra' : 'Construir'),
              onclick: () => {
                if (kind === 'item') this.run(() => C.craft(r.id));
                else { this.closeModal(); Ilha.Building.setMode(r.id); }
              },
            }))));
        });
      };
      group('Fabricação', 'item');
      group('Construção (modo construção)', 'structure');

      return { title: 'Engenharia & Criação', body, foot: [el('button', { class: 'btn', text: 'Fechar [C]', onclick: () => this.closeModal() })] };
    },

    // ------------------------------------------------------------
    // Estações (Forno, Alto-Forno, Serraria, Moinho, Bancada, Laboratório, Oficina, Baú)
    // ------------------------------------------------------------
    buildStation() {
      const C = Cr(); const St = Ilha.Stations; const d = D();
      const pos = this.stationPos || { x: 0, y: 0 };
      const obj = Ilha.World.objectAt(pos.x, pos.y);
      const def = obj && Config.OBJECTS[obj];
      const body = el('div');
      const close = [el('button', { class: 'btn', text: 'Fechar', onclick: () => this.closeModal() })];
      if (!def || !def.station) { this.closeModal(); return { title: 'Estação', body, foot: [] }; }
      const type = def.station;
      const stn = St.get(pos.x, pos.y);
      const busy = d.dead || d.sleeping;
      const pw = d.power;

      if (type === 'chest') {
        body.appendChild(el('h3', { text: 'Conteúdo do ' + (def.capacity != null ? 'caixote' : 'baú') }));
        if (def.capacity != null) {
          const wgt = St.chestWeight(stn);
          body.appendChild(el('p', { class: 'small ' + (wgt >= def.capacity - 0.01 ? 'c-warn' : 'muted'), text: `Peso guardado: ${wgt.toFixed(1)}/${def.capacity} kg${wgt >= def.capacity - 0.01 ? ' — cheio!' : ''}` }));
        }
        const items = Object.keys(stn.items);
        if (!items.length) body.appendChild(el('p', { class: 'muted', text: 'Está vazio.' }));
        items.forEach((id) => body.appendChild(el('div', { class: 'row' }, iconImg(C.ITEMS[id].icon, 3),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${C.ITEMS[id].name} ×${stn.items[id]}` })),
          el('div', { class: 'acts' },
            el('button', { class: 'btn sm', text: 'Retirar 1', onclick: () => this.run(() => St.withdraw(pos.x, pos.y, id, 1)) }),
            el('button', { class: 'btn sm', text: 'Todos', onclick: () => this.run(() => St.withdraw(pos.x, pos.y, id, stn.items[id])) })))));
        body.appendChild(el('h3', { text: 'Mochila' }));
        d.player.inventory.forEach((e) => body.appendChild(el('div', { class: 'row' }, iconImg(C.ITEMS[e.id].icon, 3),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${C.ITEMS[e.id].name} ×${e.qty}` })),
          el('div', { class: 'acts' },
            el('button', { class: 'btn sm', text: 'Guardar 1', onclick: () => this.run(() => St.deposit(pos.x, pos.y, e.id, 1)) }),
            el('button', { class: 'btn sm', text: 'Todos', onclick: () => this.run(() => St.deposit(pos.x, pos.y, e.id, e.qty)) })))));
        return { title: def.name, body, foot: close };
      }

      if (St.isBg(type)) {
        const recs = St.RECIPES[type];
        const needFuel = !!St.NEEDS_FUEL[type];
        const hyd = type === 'sawmill' || type === 'mill';
        const active = stn.active;
        const rec = recs.find((r) => r.id === stn.recipe);
        const why = !rec ? 'Selecione uma receita.'
          : active ? 'Em operação.'
          : (stn.progress > 0 || Object.keys(rec.in).every((id) => (stn.in[id] || 0) >= rec.in[id]))
            ? (needFuel && stn.fuel < 1 ? 'Parado: sem combustível.' : hyd ? 'Parado: sem Roda d\'Água com torque livre a até 2 tiles.' : 'Aguardando a próxima hora.')
            : 'Parado: faltam insumos.';
        body.appendChild(el('p', { class: active ? 'c-ok' : 'c-warn', text: `Estado: ${why}${stn.progress > 0 ? ` (${stn.progress}h restantes no lote)` : ''}` }));
        body.appendChild(el('p', { class: 'small muted', text: 'Funciona sozinha a cada hora, sem gastar tempo ou calorias de Cyrus.' + (needFuel ? ` Combustível: ${stn.fuel.toFixed(1)} h (Tora 3h, Carvão 5h, Galhos 0,5h).` : ` Torque necessário: ${St.TORQUE_NEED[obj]}.`) }));

        body.appendChild(el('h3', { text: 'Receita' }));
        recs.forEach((r) => {
          const radio = el('input', { type: 'radio', name: 'srec', value: r.id });
          if (stn.recipe === r.id) radio.checked = true;
          radio.addEventListener('change', () => this.run(() => St.setRecipe(pos.x, pos.y, r.id)));
          const ins = Object.keys(r.in).map((id) => `${r.in[id]}x ${C.ITEMS[id].name}`).join(' + ');
          const outs = Object.keys(r.out).map((id) => `${r.out[id]}x ${C.ITEMS[id].name}`).join(' + ');
          body.appendChild(el('label', { class: 'opt' }, radio, `${r.name}: ${ins} → ${outs} (${r.hours}h)`));
        });

        body.appendChild(el('h3', { text: 'Insumos na estação' }));
        const ins = St.inputItems(type);
        ins.forEach((id) => {
          const have = C.count(id);
          body.appendChild(el('div', { class: 'row' }, iconImg(C.ITEMS[id].icon, 3),
            el('div', { class: 'info' }, el('div', { class: 'name', text: `${C.ITEMS[id].name}: ${stn.in[id] || 0} na estação · ${have} na mochila` })),
            el('div', { class: 'acts' },
              el('button', { class: 'btn sm', disabled: busy || have < 1, text: 'Depositar 1', onclick: () => this.run(() => St.deposit(pos.x, pos.y, id, 1)) }),
              el('button', { class: 'btn sm', disabled: busy || have < 1, text: 'Tudo', onclick: () => this.run(() => St.deposit(pos.x, pos.y, id, have)) }))));
        });
        if (needFuel) {
          ['log', 'charcoal', 'wood_branch'].forEach((id) => {
            const have = C.count(id);
            body.appendChild(el('div', { class: 'row' }, iconImg(C.ITEMS[id].icon, 3),
              el('div', { class: 'info' }, el('div', { class: 'name', text: `Combustível: ${C.ITEMS[id].name} (+${St.FUEL[id]}h) · ${have} na mochila` })),
              el('div', { class: 'acts' },
                el('button', { class: 'btn sm', disabled: busy || have < 1, text: 'Abastecer 1', onclick: () => this.run(() => St.depositFuel(pos.x, pos.y, id, 1)) }),
                el('button', { class: 'btn sm', disabled: busy || have < 1, text: 'Tudo', onclick: () => this.run(() => St.depositFuel(pos.x, pos.y, id, have)) }))));
          });
        }
        body.appendChild(el('h3', { text: 'Produtos prontos' }));
        const outs = Object.keys(stn.out);
        if (!outs.length) body.appendChild(el('p', { class: 'muted', text: 'Nenhum produto pronto ainda.' }));
        else {
          body.appendChild(el('p', { text: outs.map((id) => `${stn.out[id]}x ${C.ITEMS[id].name}`).join(', ') }));
          body.appendChild(el('button', { class: 'btn', disabled: busy, text: 'Recolher tudo', onclick: () => this.run(() => St.collect(pos.x, pos.y)) }));
        }
        return { title: def.name, body, foot: close };
      }

      // Estações manuais: bancada, laboratório, oficina
      body.appendChild(el('p', { class: 'small muted', text: type === 'workshop' ? `Energia: ${pw.stored.toFixed(1)} kWh disponíveis (1 kWh por peça).` : 'Fabricação manual: gasta tempo e calorias de Cyrus.' }));
      const recs = C.RECIPES.filter((r) => r.station === type);
      body.appendChild(el('h3', { text: 'Fabricar' }));
      recs.forEach((r) => {
        const st = C.status(r);
        const chips = r.in.map((i) => { const have = C.ingHave(i); return el('span', { class: 'chip ' + (have >= i.qty ? 'have' : 'miss'), text: `${C.ingName(i)} ${have}/${i.qty}` }); });
        body.appendChild(el('div', { class: 'row', style: st.levelOk ? '' : 'opacity:.6' }, iconImg(C.ITEMS[r.out.id].icon, 3),
          el('div', { class: 'info' }, el('div', { class: 'name', text: r.name }), el('div', { class: 'desc', text: r.desc }), el('div', {}, chips,
            !st.levelOk ? el('span', { class: 'c-bad', text: ` 🔒 Nível ${r.minLevel}` }) : null,
            r.tool && !st.toolOk ? el('span', { class: 'c-bad', text: ` ✘ ${Config.TOOL_NAMES[r.tool]} equipado` }) : null)),
          el('div', { class: 'acts' }, el('button', { class: 'btn', disabled: !st.ok || busy, text: 'Fabricar', onclick: () => this.run(() => C.craft(r.id)) }))));
      });
      if (type === 'workbench') {
        body.appendChild(el('h3', { text: 'Desmontar sucatas (100% + 1 componente bônus + 50% mais XP)' }));
        const scr = d.player.inventory.filter((e) => C.SCRAP[e.id]);
        if (!scr.length) body.appendChild(el('p', { class: 'muted', text: 'Nenhuma sucata na mochila.' }));
        scr.forEach((e) => body.appendChild(el('div', { class: 'row' }, iconImg(C.ITEMS[e.id].icon, 3),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${C.ITEMS[e.id].name} ×${e.qty}` }),
            el('div', { class: 'desc', text: '→ ' + C.SCRAP[e.id].out.map((o) => `${o.qty}x ${C.ITEMS[o.id].name}`).join(', ') + ' (+1 aleatório)' })),
          el('div', { class: 'acts' }, el('button', { class: 'btn sm', disabled: busy, text: 'Desmontar', onclick: () => this.run(() => C.scrap(e.id, true)) })))));
      }
      return { title: def.name, body, foot: close };
    },

    buildPickup() {
      const C = Cr(); const P = Pl(); const pos = this.pickupPos || { x: 0, y: 0 };
      const body = el('div'); const pile = P.dropsAt(pos.x, pos.y).slice();
      const foot = [el('button', { class: 'btn', text: 'Fechar', onclick: () => this.closeModal() })];
      if (!pile.length) { this.closeModal(); return { title: 'Itens no chão', body, foot: [] }; }
      body.appendChild(el('p', { class: 'small muted', text: `Itens largados no tile (${pos.x},${pos.y}). Pegar custa 1 minuto por vez; o limite de peso da mochila vale.` }));
      pile.forEach((q) => {
        const it = C.ITEMS[q.id]; const busy = D().dead || D().sleeping;
        body.appendChild(el('div', { class: 'row' }, iconImg(it.icon, 3),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${it.name}  ×${q.qty}${q.charge ? ' (' + q.charge + ' porções)' : ''}` }), el('div', { class: 'desc', text: `${(it.weight * q.qty).toFixed(1)} kg · cabem ${Math.min(q.qty, C.room(q.id))} na mochila` })),
          el('div', { class: 'acts' },
            el('button', { class: 'btn sm', disabled: busy, text: 'Pegar 1', onclick: () => this.run(() => P.pickup(pos.x, pos.y, q.id, 1)) }),
            el('button', { class: 'btn sm', disabled: busy, text: 'Pegar todos', onclick: () => this.run(() => P.pickup(pos.x, pos.y, q.id, q.qty)) }))));
      });
      foot.unshift(el('button', { class: 'btn', text: '🧺 Pegar tudo', onclick: () => this.run(() => { pile.forEach((q) => P.pickup(pos.x, pos.y, q.id, q.qty)); }) }));
      return { title: 'Itens no chão', body, foot };
    },


    // ------------------------------------------------------------
    // Obras (canteiros de construção)
    // ------------------------------------------------------------
    openSite(site) { this.siteKey = site.cx + ',' + site.cy; this.open('site'); },

    buildSite() {
      const d = D(); const C = Cr(); const Si = Ilha.Sites;
      const site = Si.all()[this.siteKey];
      const foot = [el('button', { class: 'btn', text: 'Fechar', onclick: () => this.closeModal() })];
      if (!site) { this.closeModal(); return { title: 'Obra', body: el('div'), foot }; }
      const r = Si.recipeOf(site);
      const left = site.hours - site.done;
      const body = el('div');
      const pct = Math.round(Si.progress(site) * 100);
      const stageTxt = ['Estacas e corda marcam o terreno.', 'A estrutura de montantes já está de pé.', 'Quase pronta: faltam os acabamentos.'][Si.stage(site)];
      body.appendChild(el('p', { class: 'small', text: r.desc }));
      body.appendChild(el('div', { class: 'diag' },
        el('div', { class: 'top' }, el('b', { text: 'Progresso da obra' }), el('span', { text: `${site.done}/${site.hours} h · ${pct}%` })),
        el('div', { class: 'meter', style: '--c:#d9a441' }, el('i', { style: `width:${pct}%` }))));
      body.appendChild(el('p', { class: 'small muted', text: `${stageTxt} Cada hora de trabalho custa ${r.site.kcal} kcal e ${Math.round(r.site.stamina * Pl().staminaMult())} de stamina. A estrutura só aparece inteira quando as ${site.hours} horas forem cumpridas.` }));

      const reach = Si.inReach(site);
      if (!reach) body.appendChild(el('p', { class: 'c-warn small', text: '⚠ Você está longe da obra: aproxime-se (até 3 tiles) para trabalhar.' }));

      body.appendChild(el('h3', { text: 'Materiais' }));
      const next = Si.needFor(site, 1);
      Si.materials(site).forEach((m, i) => {
        const have = C.ingHave(m.ing);
        body.appendChild(el('div', { class: 'row' },
          el('div', { class: 'info' },
            el('div', { class: 'name', text: C.ingName(m.ing) }),
            el('div', { class: 'desc', text: `Já usado na obra: ${m.paid}/${m.total} · na mochila: ${have}${next[i] > 0 ? ` · próxima hora precisa de ${next[i]}` : ''}` })),
          el('div', { class: 'acts' }, el('span', { class: 'chip ' + (have >= next[i] ? 'have' : 'miss'), text: have >= next[i] ? 'ok' : `faltam ${next[i] - have}` }))));
      });
      const unpaid = Si.materials(site).reduce((a, m) => a + (m.total - m.paid) * (m.ing.anyOf ? 0.5 : C.ITEMS[m.ing.id].weight), 0);
      body.appendChild(el('p', { class: 'small muted', text: `Falta levar ~${unpaid.toFixed(0)} kg de material até o fim da obra (mochila: ${Config.MAX_WEIGHT} kg). Pode buscar em etapas: a obra espera.` }));

      const busy = d.dead || d.sleeping;
      const canHours = Math.min(left, 8);
      if (this.siteHours == null || this.siteHours > canHours || this.siteHours < 1) this.siteHours = Math.min(2, left);
      const label = el('b', { text: `${this.siteHours} h` });
      const slider = el('input', {
        type: 'range', min: 1, max: canHours, value: this.siteHours, class: 'site-slider',
        oninput: (e) => { this.siteHours = +e.target.value; label.textContent = `${this.siteHours} h`; btn.textContent = `🔨 Trabalhar ${this.siteHours} h`; },
      });
      const doWork = (n) => this.run(() => {
        const res = Si.work(site, n);
        if (res.reason) this.toast(res.reason);
      });
      const btn = el('button', { class: 'btn', disabled: busy, text: `🔨 Trabalhar ${this.siteHours} h`, onclick: () => doWork(this.siteHours) });
      if (left > 1) body.appendChild(el('div', { class: 'row' }, el('div', { class: 'info' }, el('div', { class: 'name' }, 'Quanto trabalhar agora: ', label), slider)));
      body.appendChild(el('div', { class: 'row' }, btn,
        left > 1 ? el('button', { class: 'btn', disabled: busy, text: `⏩ Até terminar (${left} h)`, onclick: () => doWork(left) }) : null));
      foot.unshift(el('button', { class: 'btn danger', text: 'Cancelar obra', onclick: () => this.confirm('Cancelar esta obra? Você recupera 50% do material já gasto; o resto se perde.', () => { Si.cancel(site); this.refresh(true); }) }));
      return { title: '🏗 ' + r.name.replace(' (obra)', '') + ' — obra', body, foot };
    },

    openStation(x, y) { this.stationPos = { x, y }; this.open('station'); },

    /** Faixa do modo construção sobre o mundo. */
    renderBuildBanner() {
      const el_ = $('buildBanner');
      if (!el_) return;
      const B = Ilha.Building;
      if (!B.mode) { el_.classList.add('hidden'); return; }
      el_.classList.remove('hidden');
      el_.innerHTML = '';
      if (B.mode === 'demolish') {
        el_.appendChild(el('b', { text: '⛏ MODO DEMOLIR' }));
        el_.appendChild(document.createTextNode(document.body.classList.contains('touch') ? ' — toque 1x para escolher e 2x para demolir (devolve 50%). Use ✕ Cancelar para sair.' : ' — clique num telhado, parede, estação ou piso (devolve 50% do material). Esc ou clique direito para sair.'));
        return;
      }
      const r = B.modeRecipe();
      if (!r) { el_.classList.add('hidden'); return; }
      el_.appendChild(el('b', { text: `🔨 CONSTRUINDO: ${r.name}` }));
      el_.appendChild(document.createTextNode(document.body.classList.contains('touch') ? ' — toque 1x para ver, 2x para posicionar (alcance 3 tiles). ✕ Cancelar sai. ' : ' — clique para posicionar (alcance 3 tiles). Esc ou clique direito para sair. '));
      if (r.site) {
        el_.appendChild(el('span', { class: 'c-warn', text: ` 🏗 OBRA de ${r.site.hours} h${Ilha.Sites.isPrefab(r) ? ' · terreno ' + Ilha.Sites.sizeText(r) + ' (alcance 5)' : ''}: marcar não gasta nada. ` }));
      }
      r.in.forEach((i) => {
        const have = Cr().ingHave(i);
        el_.appendChild(el('span', { class: 'chip ' + (have >= i.qty ? 'have' : (r.site ? 'part' : 'miss')), text: `${Cr().ingName(i)} ${have}/${i.qty}` }));
      });
    },

    // ------------------------------------------------------------
    // [J] Diário Científico de Cyrus
    // ------------------------------------------------------------
    buildJournal() {
      const d = D(); const p = d.player; const s = p.stats;
      const body = el('div');
      const tabs = el('div', { class: 'tabs' });
      [['diag', 'Diagnóstico Médico'], ['eng', 'Engenharia & Eras'], ['hist', 'Índice de Civilização'], ['tribes', 'Ilha & Tribos'], ['ach', 'Conquistas'], ['sys', 'Sistema / Save']].forEach(([id, label]) => {
        tabs.appendChild(el('button', { class: 'tab' + (this.journalTab === id ? ' active' : ''), text: label, onclick: () => { this.journalTab = id; this.rerender(); } }));
      });
      body.appendChild(tabs);

      const level = (v, crit, low) => (v < crit ? ['CRÍTICO', 'c-bad'] : v < low ? ['BAIXO', 'c-warn'] : ['BOM', 'c-ok']);
      const diag = (label, v, max, color, text, status) => el('div', { class: 'diag' },
        el('div', { class: 'top' }, el('b', { text: label }), el('span', { class: status ? status[1] : '', text: `${text}${status ? ' · ' + status[0] : ''}` })),
        el('div', { class: 'meter', style: `--c:${color}` }, el('i', { style: `width:${clamp(v / max * 100, 0, 100)}%` })));

      if (this.journalTab === 'diag') {
        body.appendChild(el('h3', { text: 'Sinais vitais' }));
        body.appendChild(el('div', { class: 'diag-grid' },
          diag('Saúde (HP)', s.hp, s.maxHp, '#c8402e', `${fmt(s.hp)}/${s.maxHp}`, level(s.hp / s.maxHp * 100, 30, 60)),
          diag('Stamina', s.stamina, s.maxStamina, '#5fb84a', `${fmt(s.stamina)}/${s.maxStamina}`, level(s.stamina / s.maxStamina * 100, 20, 45)),
          diag('Calorias', s.calories, 3000, '#e8932c', `${fmt(s.calories)}/3000 kcal`, level(s.calories, 500, 1000)),
          diag('Hidratação', s.hydration, 100, '#3d8fc4', `${fmt(s.hydration)}%`, level(s.hydration, 20, 45)),
          diag('Proteínas', s.protein, 100, '#c06a4a', `${fmt(s.protein)}%`, level(s.protein, 20, 45)),
          diag('Vitaminas', s.vitamins, 100, '#d8b13a', `${fmt(s.vitamins)}%`, level(s.vitamins, 20, 45)),
          diag('Imunidade', (s.protein + s.vitamins) / 2, 100, '#9a6ac8', `${fmt((s.protein + s.vitamins) / 2)}%`, level((s.protein + s.vitamins) / 2, 25, 50)),
          diag('Higiene', s.hygiene, 100, '#6ab8a8', `${fmt(s.hygiene)}%`, level(s.hygiene, 30, 55)),
          diag('Conforto / Sono', s.comfort, 100, '#c8a85a', `${fmt(s.comfort)}%`, level(s.comfort, 20, 45)),
          diag('Temp. corporal', clamp((s.bodyTemp - 33) / 5 * 100, 0, 100), 100, '#d8704a', `${s.bodyTemp.toFixed(1)}°C`, s.bodyTemp < 35.5 ? ['HIPOTERMIA', 'c-bad'] : s.bodyTemp > 38 ? ['FEBRE', 'c-warn'] : ['NORMAL', 'c-ok'])));

        body.appendChild(el('h3', { text: 'Condições ativas e tratamento' }));
        if (!p.conditions.length) body.appendChild(el('p', { class: 'c-ok', text: 'Nenhuma doença ou condição ativa. Cyrus está saudável.' }));
        p.conditions.forEach((c) => {
          const cd = Config.CONDITIONS[c]; if (!cd) return;
          const tm = p.condTimers[c];
          body.appendChild(el('div', { class: 'cond ' + cd.kind },
            el('div', { class: 'ct', text: `${cd.icon} ${cd.name}${tm && c !== 'SKIN_INFECTION' ? ` — ~${hoursText(tm)} restantes` : ''}` }),
            el('div', { class: 'cc', text: cd.desc }),
            cd.cure ? el('div', { class: 'cc', html: `<b>Tratamento:</b> ${cd.cure}` }) : null));
        });
        if (p.lowVitaminDays > 0) body.appendChild(el('p', { class: 'c-warn small', text: `Dias seguidos com Vitaminas < 20%: ${p.lowVitaminDays}/3 (3 dias causam Escorbuto).` }));

        body.appendChild(el('h3', { text: 'Recomendações do Dr. Smith' }));
        const tips = [];
        if (s.hydration < 45) tips.push('Beba água FERVIDA ou PURIFICADA. A água suja do rio tem 35% de chance de causar Disenteria.');
        if (s.calories < 1000) tips.push('Calorias baixas: coma Raízes Comestíveis (cave a grama/selva), Ração de Emergência ou Peixe Assado.');
        if (s.protein < 45) tips.push('Proteínas baixas: pesque com a Lança de Madeira e asse o Peixe na Fogueira (cru pode intoxicar).');
        if (s.vitamins < 45) tips.push('Vitaminas baixas: colha Frutas Cítricas nas árvores silvestres. Abaixo de 20% por 3 dias → Escorbuto.');
        if (s.hygiene < 45) tips.push('Higiene baixa: lave-se no rio (até 70%). Trabalhar ferido e sujo causa Infecção Cutânea.');
        if (S().isNight() && !Pl().nearLitFire() && !Pl().nearShelter()) tips.push('Noite fria: acenda uma Fogueira e/ou construa um Abrigo de Folhas antes de dormir para evitar Hipotermia.');
        if (s.stamina < 30) tips.push('Stamina baixa: descanse ou durma com [R], de preferência junto ao abrigo e à fogueira.');
        if (!tips.length) tips.push('Tudo em ordem. Continue equilibrando comida, água, sono e higiene.');
        tips.forEach((t) => body.appendChild(el('div', { class: 'cc', style: 'margin:3px 0', text: '• ' + t })));
      }

      if (this.journalTab === 'eng') {
        const pct = clamp(p.xp / p.xpToNext * 100, 0, 100);
        body.appendChild(el('h3', { text: 'Nível de Engenharia' }));
        body.appendChild(el('p', { html: `<b>Nível ${p.level}</b> · Era ${p.era} · XP ${p.xp}/${p.xpToNext}${p.level >= Config.LEVEL_CAP ? ' <span class="c-ok">(nível máximo — Engenharia dominada!)</span>' : ''}` }));
        body.appendChild(el('div', { class: 'meter', style: '--c:#8a6cc8' }, el('i', { style: `width:${pct}%` })));
        body.appendChild(el('p', { class: 'small muted', text: 'XP Científico vem de: construir/fabricar pela primeira vez, desmontar sucatas, catalogar recursos e sobreviver a cada dia (+50% com Mente Lúcida).' }));
        body.appendChild(el('h3', { text: 'As 4 Eras Tecnológicas' }));
        const cards = el('div', { class: 'cards' });
        const firstLevel = { 1: 1, 2: 4, 3: 8, 4: 12 };
        Config.ERAS.forEach((era) => {
          const unlocked = p.level >= firstLevel[era.id];
          const rs = Cr().visibleRecipes().filter((r) => Cr().eraOf(r) === era.id);
          const chipsU = rs.map((r) => el('span', { class: 'chip ' + (p.crafted[r.id] ? 'have' : (p.level >= r.minLevel ? '' : 'miss')), title: p.level >= r.minLevel ? 'Nível ' + r.minLevel : '🔒 Nível ' + r.minLevel, text: (p.level >= r.minLevel ? '' : '🔒 ') + r.name }));
          cards.appendChild(el('div', { class: 'card ' + (era.id === p.era ? 'current' : unlocked ? '' : 'locked') },
            el('div', { html: `<b>Era ${era.id} — ${era.name}</b> <span class="small muted">(Níveis ${era.levels})</span>` }),
            el('div', { class: 'small', text: era.text }),
            el('div', { class: (era.id === p.era ? 'c-ok' : unlocked ? 'c-ok' : 'c-warn') + ' small', text: era.id === p.era ? '▶ Era atual' : unlocked ? 'Era superada/disponível' : `🔒 Desbloqueia no nível ${firstLevel[era.id]}` }),
            era.diary ? el('div', { class: 'quote small', text: era.diary }) : null,
            el('div', { class: 'small' }, chipsU)));
        });
        body.appendChild(cards);
        const known = Object.keys(p.crafted).filter((k) => { const rr = Cr().recipe(k); return rr && !rr.hidden; }).length;
        body.appendChild(el('h3', { text: 'Catálogo' }));
        body.appendChild(el('p', { class: 'small', text: `Receitas fabricadas: ${known}/${Cr().visibleRecipes().length} · Recursos catalogados: ${Object.keys(d.catalog).length}` }));
        const names = Object.keys(d.catalog);
        if (names.length) body.appendChild(el('div', {}, names.map((n) => el('span', { class: 'chip have', text: n }))));
      }

      if (this.journalTab === 'hist') {
        const sc = Pl().civScore();
        body.appendChild(el('h3', { text: 'Índice de Civilização — hoje' }));
        body.appendChild(el('p', { html: `<b>${sc.points.toFixed(1)} pts</b> projetados para hoje · acumulado: <b>${d.score.totalAccumulatedScore.toFixed(1)}</b> · dias sobrevividos: <b>${d.stats.daysSurvived}</b>` }));
        const parts = [['Saúde', sc.mSaude, 2], ['Nutrição', sc.mNutri, 2], ['Conforto', sc.mConf, 2], ['Engenharia', sc.mEng, 3], ['Economia (tribos)', sc.mEco, 2]];
        const g = el('div', { class: 'diag-grid' });
        parts.forEach(([n, v, mx]) => g.appendChild(diag(`M ${n}`, v, mx, '#8a6c26', `${v.toFixed(2)}/${mx}`)));
        body.appendChild(g);
        body.appendChild(el('p', { class: 'small muted', text: 'Pontos do dia = 10 × (Saúde + Nutrição + Conforto + Engenharia + Economia). A pontuação é registrada à meia-noite.' }));
        body.appendChild(el('h3', { text: 'Histórico' }));
        if (!d.score.history.length) body.appendChild(el('p', { class: 'muted', text: 'Nenhum dia concluído ainda.' }));
        d.score.history.slice(-14).reverse().forEach((h) => body.appendChild(el('div', { class: 'small', text: `Dia ${h.day}: +${h.points.toFixed(1)} pts` })));
      }

      if (this.journalTab === 'tribes') {
        const I = Ilha.Island; const E = Ilha.Economy; const m = d.map;
        body.appendChild(el('h3', { text: 'Exploração da Ilha Lincoln' }));
        body.appendChild(el('p', { html: `Setores revelados: <b>${I.revealedCount()}/${I.landCount()}</b> · Expedições de desbravamento: <b>${m.explored}</b> · Conchas de Escambo: <b>${m.credits} UT</b> · Trocas realizadas: <b>${m.trades}</b> (${Math.round(m.volume)} UT)` }));
        body.appendChild(el('p', { class: 'small muted', text: 'Use o Mapa [M] para explorar setores, vasculhar locais de saque e negociar com as aldeias.' }));
        body.appendChild(el('h3', { text: 'As 3 Tribos' }));
        Object.keys(E.TRIBES).forEach((id) => {
          const def = E.TRIBES[id]; const t = E.tribe(id);
          body.appendChild(el('div', { class: 'cond ' + (t.discovered ? 'good' : 'warn') },
            el('div', { class: 'ct', text: `${def.icon} ${def.name} — ${def.place}` }),
            el('div', { class: 'cc', text: t.discovered ? `Reputação ${Math.round(t.reputation)}/100 · volume ${Math.round(t.volume)} UT` : 'Ainda não descoberta (névoa de guerra).' })));
        });
        body.appendChild(el('h3', { text: 'Locais de saque' }));
        Object.keys(I.POIS).forEach((id) => {
          const def = I.POIS[id]; const found = I.isRevealed(def.x, def.y); const ps = m.poi[id];
          body.appendChild(el('div', { class: 'small', text: `${def.icon} ${found ? def.name : '??? (não descoberto)'}${found ? ` — expedições ${ps.left}/${def.max}` : ''}` }));
        });
      }

      if (this.journalTab === 'ach') {
        const A = Ilha.Achievements; const got = (d.achievements) || {};
        body.appendChild(el('h3', { text: `Conquistas: ${A.count()}/${A.LIST.length}` }));
        A.LIST.forEach((a) => {
          const ok = !!got[a.id];
          body.appendChild(el('div', { class: 'row', style: ok ? '' : 'opacity:.55' },
            el('div', { class: 'info' }, el('div', { class: 'name', text: `${ok ? '🏆' : '🔒'} ${a.name}` }), el('div', { class: 'desc', text: a.desc + (ok ? ` · Dia ${got[a.id]}` : '') }))));
        });
      }
      if (this.journalTab === 'sys') {
        const S_ = Ilha.State;
        body.appendChild(el('p', {}, el('button', { class: 'btn sm', text: Ilha.Audio.muted ? '🔇 Som desligado — ligar' : '🔊 Som ligado — desligar', onclick: () => { Ilha.Audio.toggleMute(); this.rerender(true); } })));
        body.appendChild(el('h3', { text: 'Exportar / Importar / Novo Jogo' }));
        body.appendChild(el('p', { class: 'small muted', text: 'O progresso fica salvo automaticamente no navegador. Exporte um arquivo .json para levar o jogo a outro computador ou fazer backup.' }));
        const ta = el('textarea', { class: 'savebox', rows: 4, placeholder: 'Cole aqui o JSON de um save para importar…' });
        body.appendChild(el('div', { class: 'acts' },
          el('button', { class: 'btn', text: '⬇ Exportar (baixar .json)', onclick: () => {
            const json = S_.exportJSON();
            const blob = new Blob([json], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `ilha-lincoln-dia${d.time.day}.json`;
            document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
            this.toast('Save exportado.');
          } }),
          el('button', { class: 'btn', text: '📋 Copiar save', onclick: () => {
            const json = S_.exportJSON();
            const fallback = () => { ta.value = json; ta.select(); try { document.execCommand('copy'); this.toast('Save copiado.'); } catch (e) { this.toast('Selecione e copie o texto da caixa.'); } };
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(() => this.toast('Save copiado.')).catch(fallback); else fallback();
          } })));
        body.appendChild(el('h3', { text: 'Importar' }));
        const file = el('input', { type: 'file', accept: '.json,application/json' });
        const doImport = (text) => {
          const r = S_.importJSON(text);
          this.toast(r.msg);
          if (r.ok) setTimeout(() => location.reload(), 350);
        };
        file.addEventListener('change', () => { if (file.files[0]) file.files[0].text().then(doImport); });
        body.appendChild(el('div', { class: 'opt' }, 'Arquivo: ', file));
        body.appendChild(ta);
        body.appendChild(el('div', { class: 'acts' }, el('button', { class: 'btn', text: '⬆ Importar texto colado', onclick: () => doImport(ta.value) })));
        body.appendChild(el('h3', { text: 'Desempenho e tela' }));
        const lg = el('input', { type: 'checkbox' }); lg.checked = Ilha.Main.lowGfx;
        lg.addEventListener('change', () => Ilha.Main.setLowGfx(lg.checked));
        body.appendChild(el('label', { class: 'opt' }, lg, 'Gráficos leves (sem grão, vinheta e filtro de cor — melhor em celulares)'));
        body.appendChild(el('button', { class: 'btn', text: '⛶ Tela cheia (paisagem)', onclick: () => Ilha.Main.fullscreen() }));
        body.appendChild(el('h3', { text: 'Novo Jogo' }));
        body.appendChild(el('button', { class: 'btn danger', text: '⟲ Novo Jogo (apaga o progresso atual)', onclick: () => this.confirm('Reiniciar a aventura? O progresso atual será perdido (exporte antes, se quiser guardar).', () => Ilha.Main.newGame()) }));
      }

      return { title: 'Diário Científico de Cyrus Smith', body, foot: [el('button', { class: 'btn', text: 'Fechar [J]', onclick: () => this.closeModal() })] };
    },

    // ------------------------------------------------------------
    // [R] Descansar / Dormir
    // ------------------------------------------------------------
    buildRest() {
      const d = D(); const P = Pl(); const s = d.player.stats;
      if (this.restState == null) this.restState = { mode: 'sleep', hours: 8 };
      const rs = this.restState;
      const body = el('div');
      const out = el('div');
      const slider = el('input', { type: 'range', class: 'range', min: 1, max: 8, step: 1, value: rs.hours });
      const label = el('b', { text: `${rs.hours} h` });

      const update = () => {
        out.innerHTML = '';
        const q = P.sleepQuality(rs.hours);
        const eff = rs.mode === 'rest' ? q.total * 0.45 : q.total;
        out.appendChild(el('h3', { text: `Qualidade do Sono estimada: ${Math.round(eff)}%` }));
        q.parts.forEach((pt) => out.appendChild(el('div', { class: 'small', html: `${pt.val >= 0 ? '+' : ''}${pt.val} &nbsp; ${pt.label}` })));
        if (rs.mode === 'rest') out.appendChild(el('div', { class: 'small muted', text: '× 0,45 por apenas descansar acordado (sem buff de Bem Descansado).' }));
        const gain = Math.round(Math.max(2, 14 * eff / 100) * rs.hours);
        out.appendChild(el('p', { class: 'small', html: `Stamina estimada: <b>+${Math.min(gain, s.maxStamina - Math.round(s.stamina))}</b> · Custo: ${rs.hours * 80} kcal basais e hidratação.` }));
        const warn = [];
        if (!q.shelter) warn.push('Sem Abrigo de Folhas encostado: o sono será pior.');
        if (!q.fire && S().isNight()) warn.push('Sem fogueira acesa por perto: risco de Hipotermia à noite.');
        if (q.wet) warn.push('Dormir na chuva, sem abrigo, causa Dores Musculares e frio.');
        if (s.calories < 600 || s.hydration < 25) warn.push('Fome/sede NÃO interrompem o sono: o corpo sofre dano a cada hora e você só acorda com HP muito baixo (≤ 20%).');
        warn.forEach((w) => out.appendChild(el('div', { class: 'c-warn small', text: '⚠ ' + w })));
      };
      slider.addEventListener('input', () => { rs.hours = +slider.value; label.textContent = `${rs.hours} h`; update(); });

      body.appendChild(el('p', { text: 'Cyrus pode dormir (recupera Stamina, Conforto e acelera a cura) ou apenas descansar acordado. O tempo passa hora a hora: fome, sede e clima continuam agindo.' }));
      ['sleep', 'rest'].forEach((m) => {
        const r = el('input', { type: 'radio', name: 'restmode', value: m });
        if (rs.mode === m) r.checked = true;
        r.addEventListener('change', () => { rs.mode = m; update(); });
        body.appendChild(el('label', { class: 'opt' }, r, m === 'sleep' ? 'Dormir (qualidade total, buffs de descanso)' : 'Apenas descansar / passar o tempo (45% da recuperação)'));
      });
      body.appendChild(el('div', { class: 'opt' }, 'Duração: ', label, slider));
      body.appendChild(out);
      update();

      const foot = [
        el('button', { class: 'btn', text: 'Cancelar', onclick: () => this.closeModal() }),
        el('button', { class: 'btn', disabled: d.dead, text: 'Começar', onclick: () => { this.closeModal(); P.sleep(rs.hours, rs.mode); this.refresh(true); } }),
      ];
      return { title: 'Descansar / Dormir', body, foot };
    },

    // ------------------------------------------------------------
    // [M] Mapa Cartográfico da Ilha Lincoln (12x12, névoa, expedições, tribos)
    // ------------------------------------------------------------
    buildMap() {
      const I = Ilha.Island; const E = Ilha.Economy; const C = Cr(); const d = D(); const m = d.map;
      if (!this.mapSel) this.mapSel = { x: I.BASE.x, y: I.BASE.y };
      const sel = this.mapSel;
      const body = el('div');
      const land = I.landCount(); const rev = I.revealedCount();
      body.appendChild(el('div', { class: 'quote small', html: `<b>Diário de Cyrus:</b> "A ilha se desenha aos poucos. Cada expedição custa horas, forças e água — mas revela onde estão as aldeias e os destroços que podem nos salvar." <b>Setores revelados: ${rev}/${land}</b> · Conchas de Escambo: <b>${m.credits} UT</b>` }));

      const wrap = el('div', { class: 'mapwrap' });
      const grid = el('div', { class: 'mapgrid' });
      for (let y = 0; y < I.N; y++) {
        for (let x = 0; x < I.N; x++) {
          const b = I.biomeAt(x, y); const revd = I.isRevealed(x, y);
          const poi = I.poiAt(x, y); const tr = I.tribeAt(x, y);
          const isBase = x === I.BASE.x && y === I.BASE.y;
          let cls = 'mapcell b-' + (revd ? b : 'F');
          if (!revd) cls += I.canExplore(x, y).ok ? ' frontier' : ' fog';
          if (sel.x === x && sel.y === y) cls += ' sel';
          let txt = '';
          if (b === 'O') txt = '';
          else if (!revd) txt = '?';
          else if (isBase) txt = '✚';
          else if (tr) txt = E.TRIBES[tr].icon;
          else if (poi) txt = I.POIS[poi].icon;
          else txt = I.BIOMES[b].icon;
          const label = b === 'O' ? 'Oceano' : !revd ? `Setor (${x},${y}) — névoa de guerra` : `Setor (${x},${y}) — ${I.BIOMES[b].name}`;
          grid.appendChild(el('div', { class: cls, title: label, text: txt, onclick: () => { if (b !== 'O') { this.mapSel = { x, y }; this.rerender(true); } } }));
        }
      }
      wrap.appendChild(grid);

      // ---- painel do quadrante selecionado ----
      const panel = el('div', { class: 'mappanel' });
      const b = I.biomeAt(sel.x, sel.y); const revd = I.isRevealed(sel.x, sel.y);
      const poi = I.poiAt(sel.x, sel.y); const tr = I.tribeAt(sel.x, sel.y);
      const busy = d.dead || d.sleeping;
      panel.appendChild(el('h3', { text: `Setor (${sel.x},${sel.y}) — ${revd ? I.BIOMES[b].name : 'Névoa de guerra'}` }));
      if (sel.x === I.BASE.x && sel.y === I.BASE.y) panel.appendChild(el('p', { class: 'c-ok', text: '✚ Praia do Naufrágio & Casa de Granito: sua base.' }));
      if (!revd) {
        const ce = I.canExplore(sel.x, sel.y);
        const c = I.exploreCost(sel.x, sel.y);
        if (ce.ok) {
          panel.appendChild(el('p', { text: 'Quadrante vizinho de um setor revelado: pode ser desbravado.' }));
          panel.appendChild(el('p', { class: 'small', text: `Expedição: ${c.minutes / 60} h · -${c.kcal} kcal · -${c.hydration}% hidratação · -${c.stamina} stamina` }));
          panel.appendChild(el('button', { class: 'btn', disabled: busy, text: '🧭 Explorar Setor', onclick: () => this.run(() => I.explore(sel.x, sel.y)) }));
        } else panel.appendChild(el('p', { class: 'muted', text: ce.msg || 'Território inexplorado. Desbrave primeiro um setor vizinho.' }));
      } else {
        panel.appendChild(el('p', { class: 'small muted', text: `Bioma: ${I.BIOMES[b].name}.` }));
        if (poi) {
          const ps = I.poiStatus(poi); const def = ps.def;
          panel.appendChild(el('p', { html: `<b>${def.icon} ${def.name}</b><br>${def.desc}` }));
          panel.appendChild(el('p', { class: 'small', html: `Expedições restantes: <b>${ps.left}/${ps.max}</b> (${ps.regen}) · Custo: ${I.FORAGE.minutes / 60} h · -${I.FORAGE.kcal} kcal · -${I.FORAGE.hydration}% hidratação · -${I.FORAGE.stamina} stamina` }));
          const bon = [];
          if (def.needsLight) bon.push(`Tocha acesa: ${ps.hasLight ? '<span class="c-ok">✔ +15%</span>' : '<span class="c-bad">✘ (sem luz: -50%)</span>'}`);
          if (def.pickaxeBonus.length) bon.push(`Picareta: ${ps.pickaxe ? '<span class="c-ok">✔ +50% de minério</span>' : '<span class="c-warn">sem picareta</span>'}`);
          bon.push(`Nitroglicerina: ${ps.nitro ? `<span class="c-ok">${ps.nitro} na mochila (+50%)</span>` : '<span class="muted">nenhuma</span>'}`);
          panel.appendChild(el('p', { class: 'small', html: bon.join(' · ') }));
          if (poi === 'submarine' && !ps.hullOpen) panel.appendChild(el('p', { class: 'c-warn small', text: '🔒 O casco está selado: exige Era 3 (nível 8) ou Nitroglicerina.' }));
          panel.appendChild(el('div', { class: 'acts' },
            el('button', { class: 'btn', disabled: busy || !ps.canNormal, text: '🔎 Vasculhar (Expedição de Coleta)', onclick: () => this.run(() => I.forage(poi, false)) }),
            el('button', { class: 'btn danger', disabled: busy || !ps.canNitro, text: '💥 Vasculhar com Nitroglicerina', onclick: () => this.run(() => I.forage(poi, true)) })));
        }
        if (tr) {
          const def = E.TRIBES[tr]; const t = E.tribe(tr);
          panel.appendChild(el('p', { html: `<b>${def.icon} ${def.name}</b> — ${def.place}<br>${def.desc}` }));
          panel.appendChild(el('p', { class: 'small', text: `Reputação: ${Math.round(t.reputation)}/100 · Volume trocado: ${Math.round(t.volume)} UT · Spread: ${Math.round(E.spread(tr) * 100)}%` }));
          const tele = E.telegraphActive();
          panel.appendChild(el('button', { class: 'btn', disabled: busy, text: tele ? '⚡ Negociar pelo Telégrafo (0 min)' : '🛶 Enviar Caravana de Troca (2 h ida e volta)', onclick: () => { this.closeModal(); E.openTrade(tr); this.refresh(true); } }));
          if (!tele) panel.appendChild(el('p', { class: 'small muted', text: 'Dica: com a Estação de Telégrafo energizada na base você negocia sem gastar tempo.' }));
        }
        if (!poi && !tr && !(sel.x === I.BASE.x && sel.y === I.BASE.y)) panel.appendChild(el('p', { class: 'muted', text: 'Nada de especial neste setor.' }));
      }
      wrap.appendChild(panel);
      body.appendChild(wrap);

      const leg = el('div', { class: 'small muted' });
      leg.innerHTML = '✚ base · 🐚🌿🌋 aldeias · ⚓ Fragata · ⛏ Caverna · 🔭 Observatório · ☸ Submarino · "?" névoa (borda tracejada = pode ser explorado)';
      body.appendChild(leg);
      return { title: 'Mapa Cartográfico da Ilha Lincoln (12×12)', body, foot: [el('button', { class: 'btn', text: 'Fechar [M]', onclick: () => this.closeModal() })] };
    },

    // ------------------------------------------------------------
    // Escambo com as tribos (duas colunas)
    // ------------------------------------------------------------
    openTrade(tid) { this.trade = { tid, give: {}, take: {} }; this.open('trade'); },

    buildTrade() {
      const E = Ilha.Economy; const C = Cr(); const d = D(); const m = d.map;
      const tr = this.trade || { tid: 'raiz_verde', give: {}, take: {} };
      const def = E.TRIBES[tr.tid]; const t = E.tribe(tr.tid);
      const sp = E.spread(tr.tid);
      const body = el('div');
      body.appendChild(el('p', { class: 'small', html: `<b>${def.icon} ${def.name}</b> — ${def.desc}` }));
      body.appendChild(el('p', { class: 'small', html: `Saldo de escambo: <b>${m.credits} UT (Conchas)</b> · Reputação: <b>${Math.round(t.reputation)}</b> · Spread: ${Math.round(sp * 100)}% · ${E.telegraphActive() ? '<span class="c-ok">⚡ via Telégrafo</span>' : 'via caravana'}` }));
      const q = E.quote(tr.tid, tr.give, tr.take);

      const bump = (side, id, delta, max) => {
        const cart = tr[side]; const other = side === 'give' ? tr.take : tr.give;
        cart[id] = clamp((cart[id] || 0) + delta, 0, max);
        if (!cart[id]) delete cart[id];
        if (cart[id]) delete other[id];
        this.rerender(true);
      };
      const ctrl = (side, id, max) => {
        const n = tr[side][id] || 0;
        return el('div', { class: 'acts' },
          el('button', { class: 'btn sm', disabled: n <= 0, text: '−', onclick: () => bump(side, id, -1, max) }),
          el('b', { class: 'cnt', text: String(n) }),
          el('button', { class: 'btn sm', disabled: n >= max, text: '+', onclick: () => bump(side, id, 1, max) }),
          el('button', { class: 'btn sm', disabled: n >= max, text: '+5', onclick: () => bump(side, id, 5, max) }));
      };
      const trend = (id) => { const s = t.stock[id]; const r = E.price(tr.tid, id) / s.base; return r > 1.1 ? '▲' : r < 0.9 ? '▼' : '='; };

      const cols = el('div', { class: 'tradecols' });
      const left = el('div', {}, el('h3', { text: 'Sua Mochila (você vende)' }));
      const right = el('div', {}, el('h3', { text: 'Estoque da Tribo (você compra)' }));
      Object.keys(def.items).forEach((id) => {
        const it = C.ITEMS[id]; const st = t.stock[id];
        const own = C.count(id); const av = E.available(tr.tid, id);
        const sell = Math.max(1, Math.round(E.price(tr.tid, id) * (1 - sp)));
        const buy = Math.max(1, Math.round(E.price(tr.tid, id) * (1 + sp)));
        left.appendChild(el('div', { class: 'row', style: own ? '' : 'opacity:.55' }, iconImg(it.icon, 2),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${it.name} ×${own}` }), el('div', { class: 'desc', text: `Paga ${sell} UT/un ${trend(id)} · base ${st.base}` })),
          ctrl('give', id, own)));
        right.appendChild(el('div', { class: 'row', style: av ? '' : 'opacity:.55' }, iconImg(it.icon, 2),
          el('div', { class: 'info' }, el('div', { class: 'name', text: `${it.name} ×${av}` }), el('div', { class: 'desc', text: `Pede ${buy} UT/un ${trend(id)} · alvo ${st.target}` })),
          ctrl('take', id, av)));
      });
      cols.appendChild(left); cols.appendChild(right);
      body.appendChild(cols);

      const enough = !q.err && (q.giveValue + m.credits >= q.takeValue) && q.lines.length > 0;
      body.appendChild(el('div', { class: 'tradesum' },
        el('div', { html: `Você oferece: <b>${q.giveValue} UT</b> + saldo <b>${m.credits} UT</b> = <b>${Math.round((q.giveValue + m.credits) * 100) / 100} UT</b> &nbsp;|&nbsp; A tribo pede: <b>${q.takeValue} UT</b>` }),
        q.err ? el('div', { class: 'c-bad', text: q.err }) : (q.lines.length && !enough ? el('div', { class: 'c-bad', text: `Faltam ${Math.round((q.takeValue - q.giveValue - m.credits) * 100) / 100} UT.` }) : null),
        enough && q.giveValue + m.credits - q.takeValue > 0 ? el('div', { class: 'c-ok small', text: `Sobra ${Math.round((q.giveValue + m.credits - q.takeValue) * 100) / 100} UT: fica como saldo de Conchas.` }) : null));
      const foot = [
        el('button', { class: 'btn', text: 'Limpar', onclick: () => { tr.give = {}; tr.take = {}; this.rerender(true); } }),
        el('button', { class: 'btn', disabled: !enough || d.dead, text: '🤝 Confirmar Troca', onclick: () => { if (E.trade(tr.tid, tr.give, tr.take)) { tr.give = {}; tr.take = {}; } this.refresh(true); this.rerender(true); } }),
        el('button', { class: 'btn', text: 'Fechar', onclick: () => this.closeModal() }),
      ];
      return { title: `Escambo — ${def.name}`, body, foot };
    },

    // ------------------------------------------------------------
    // Introdução e Fim de Jogo
    // ------------------------------------------------------------
    showIntro() {
      this.open('intro', {
        live: false, closable: true,
        build: () => ({
          title: 'A Ilha Misteriosa',
          body: el('div', {},
            el('p', { html: '<b>1865.</b> Uma tempestade no Pacífico Sul destroça o balão de observação. Você, <b>Cyrus Smith</b>, engenheiro e cientista, cai numa ilha vulcânica não mapeada: a <b>Ilha Lincoln</b>.' }),
            el('p', { text: 'Sem nada além da sua inteligência, sobreviva: recolha recursos, vasculhe os destroços, acenda o fogo e cuide do corpo — comida, água, sono, higiene e doenças.' }),
            el('h3', { text: 'Controles' }),
            document.body.classList.contains('touch') ? el('p', { class: 'small', html: '<b>1 toque</b>: inspeciona o tile (tooltip) · <b>2 toques</b>: anda até lá (ou usa o objeto tocado) · <b>toque longo</b>: interage com água, chão, cultura, etc. · <b>✕ Cancelar</b> interrompe a rota ou o modo construção. Os botões do painel (Inventário, Criação, Mapa, Diário, Descansar) ficam sempre na tela.' }) : el('p', { class: 'small', html: '<b>Clique esquerdo</b>: andar até o tile (ou coletar/usar o objeto clicado) · <b>Clique direito</b>: interagir com qualquer tile (água, areia, grama…) · <b>WASD / Setas</b>: mover nas 8 direções da tela · <b>E / Espaço</b>: interagir com o tile à frente · <b>Passe o mouse</b> sobre um tile para inspecioná-lo.' }),
            el('p', { class: 'small', html: '<b>I</b> Inventário &amp; Sucata · <b>C</b> Engenharia &amp; Criação · <b>M</b> Mapa · <b>J</b> Diário Científico · <b>R</b> Descansar/Dormir · <b>Esc</b> fecha janelas.' }),
            el('p', { class: 'small muted', text: 'O tempo só avança quando você age (andar, coletar, fabricar, descansar). Primeiro passo: vasculhe os Destroços do Balão (lona vermelha e branca) ao lado.' })),
          foot: [el('button', { class: 'btn', text: 'Começar a aventura', onclick: () => this.closeModal() })],
        }),
      });
    },

    /** Texto de resumo da partida (para copiar e compartilhar). */
    gameSummary() {
      const d = D(); const p = d.player;
      const recipes = Object.keys(p.crafted).filter((k) => { const rr = Cr().recipe(k); return rr && !rr.hidden; }).length;
      const ach = Ilha.Achievements ? Ilha.Achievements.count() : 0;
      return [
        `A Ilha Misteriosa — Cyrus Smith sucumbiu a ${d.dead.cause} no dia ${d.dead.day}.`,
        `Nível ${p.level} (Era ${p.era}) · ${d.stats.daysSurvived} dias sobrevividos · Civilização ${Math.round(d.score.totalAccumulatedScore)} pts`,
        `${recipes} receitas dominadas · ${ach} conquistas`,
      ].join('\n');
    },

    showGameOver() {
      const d = D(); const p = d.player;
      const recipes = Object.keys(p.crafted).filter((k) => { const rr = Cr().recipe(k); return rr && !rr.hidden; }).length;
      const ach = Ilha.Achievements ? Ilha.Achievements.count() : 0;
      const stat = (label, val) => el('div', { class: 'diag' }, el('div', { class: 'top' }, el('b', { text: label }), el('span', { text: String(val) })));
      this.open('gameover', {
        live: false, closable: false,
        build: () => ({
          title: 'Fim da Jornada',
          body: el('div', {},
            el('p', { html: `Cyrus Smith sucumbiu a <b class="c-bad">${d.dead.cause}</b> no Dia ${d.dead.day}, às ${d.dead.time}.` }),
            el('div', { class: 'quote', text: `“Aqui descansa um engenheiro que sobreviveu ${d.stats.daysSurvived} dia${d.stats.daysSurvived === 1 ? '' : 's'} na Ilha Lincoln e chegou à Era ${p.era}.”` }),
            el('div', { class: 'diag-grid' },
              stat('Dias sobrevividos', d.stats.daysSurvived), stat('Nível de Engenharia', `${p.level} (Era ${p.era})`),
              stat('Civilização acumulada', Math.round(d.score.totalAccumulatedScore) + ' pts'), stat('Receitas dominadas', `${recipes}/${Cr().visibleRecipes().length}`),
              stat('Conquistas', `${ach}/${Ilha.Achievements ? Ilha.Achievements.LIST.length : 0}`), stat('Tiles percorridos', d.stats.tilesWalked)),
            el('div', { class: 'quote', text: '"A ciência é feita de erros, mas de erros bons de cometer, pois conduzem passo a passo à verdade." — Júlio Verne' })),
          foot: [
            el('button', { class: 'btn', text: '📋 Copiar resumo', onclick: () => {
              const txt = this.gameSummary();
              const fb = () => { try { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); this.toast('Resumo copiado.'); } catch (err) { this.toast(txt.split('\n')[0]); } };
              if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(() => this.toast('Resumo copiado.')).catch(fb); else fb();
            } }),
            el('button', { class: 'btn', text: 'Recomeçar', onclick: () => { this.closeModal(); Ilha.Main.newGame(true); } })],
        }),
      });
    },
  };

  Ilha.UI = UI;
})();
