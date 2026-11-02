/* =====================================================================
 * economy.js — As 3 Tribos da Ilha Lincoln: comércio por escambo com
 * oferta e demanda direta, Conchas de Escambo (UT), reputação,
 * Caravana de Troca e acesso instantâneo pelo Telégrafo (Era 4)
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const clamp = Config.clamp;

  const D = () => Ilha.State.data;
  const M = () => Ilha.State.data.map;

  // item: [estoqueAtual, estoqueAlvo, precoBase (UT)]
  const TRIBES = {
    coral_crown: {
      name: 'Tribo Coroa de Coral', place: 'Costa Leste', icon: '🐚',
      desc: 'Pescadores e navegadores. Produzem peixe, óleo e pérolas; precisam de madeira, ferramentas e lentes.',
      items: {
        salted_fish: [50, 40, 4], fish_oil: [14, 12, 6], iron_scrap: [20, 15, 5], pearl: [8, 6, 14], cooked_fish: [24, 20, 5],
        log: [4, 14, 7], plank: [5, 14, 6], iron_knife: [2, 6, 28], lens: [1, 3, 30], citrus: [4, 15, 6],
      },
    },
    raiz_verde: {
      name: 'Tribo Raiz Verde', place: 'Vale Central', icon: '🌿',
      desc: 'Agricultores e herbalistas. Produzem sementes, ervas e fibras; precisam de enxadas, potes, sabão e cinzas.',
      items: {
        seed_tuber: [25, 20, 5], seed_legume: [18, 16, 6], seed_veg: [18, 16, 6], seed_fiber: [14, 14, 5], herb: [36, 30, 4],
        fiber: [40, 40, 3], iron_hoe: [1, 4, 35], pot: [3, 10, 10], soap: [2, 8, 16], ash: [3, 12, 5],
      },
    },
    cinza_pico: {
      name: 'Tribo Cinza do Pico', place: 'Norte Vulcânico', icon: '🌋',
      desc: 'Caçadores e mineradores. Produzem couro, minérios e carvão; precisam de farinha, sabão, aço e remédios.',
      items: {
        leather: [18, 15, 8], copper_ore: [16, 14, 9], sulfur: [16, 14, 7], iron_ore: [20, 18, 6], charcoal: [22, 20, 4],
        flour: [3, 14, 9], soap: [2, 8, 16], steel_blade: [1, 5, 22], quinine: [1, 4, 45], iron_knife: [2, 6, 28],
      },
    },
  };

  const PRICE_EXP = 0.6;
  const CARAVAN_MINUTES = 120;

  const Economy = {
    TRIBES, PRICE_EXP, CARAVAN_MINUTES,

    initTribes() {
      const out = {};
      Object.keys(TRIBES).forEach((id) => {
        const stock = {};
        Object.keys(TRIBES[id].items).forEach((it) => {
          const [qty, target, base] = TRIBES[id].items[it];
          stock[it] = { qty, target, base };
        });
        out[id] = { discovered: false, reputation: 0, volume: 0, stock };
      });
      return out;
    },

    tribe(id) { return M().tribes[id]; },

    /** Preço unitário (UT): base × (alvo / estoque)^0.6, limitado a 0.3x–3.0x a base. */
    rawPrice(base, target, qty) {
      const f = clamp(Math.pow(target / Math.max(qty, 1), PRICE_EXP), 0.3, 3.0);
      return Math.max(1, Math.round(base * f));
    },
    price(id, item) { const s = this.tribe(id).stock[item]; return this.rawPrice(s.base, s.target, s.qty); },
    /** Spread (diferença entre compra e venda): 15%, caindo a 5% com reputação máxima. */
    spread(id) { return 0.15 - 0.10 * clamp(this.tribe(id).reputation / 100, 0, 1); },
    available(id, item) { return Math.max(0, Math.floor(this.tribe(id).stock[item].qty + 1e-6)); },

    // ------------------------------------------------------------
    // Acesso: caravana (2h) ou Telégrafo energizado (0 min)
    // ------------------------------------------------------------
    telegraphActive() {
      const d = D(); const W = Ilha.World;
      return Object.keys(d.power.on || {}).some((k) => { const [x, y] = k.split(',').map(Number); return W.objectAt(x, y) === 'TELEGRAPH'; });
    },
    discovered(id) { return !!(this.tribe(id) && this.tribe(id).discovered); },
    discoveredCount() { return Object.keys(TRIBES).filter((id) => this.discovered(id)).length; },

    /** Abre o comércio. Retorna true se abriu. */
    openTrade(id) {
      const P = Ilha.Player; const d = D();
      if (d.dead || d.sleeping) return false;
      if (!this.discovered(id)) { P.say('Você ainda não descobriu esta aldeia. Desbrave o quadrante dela no mapa.'); return false; }
      if (this.telegraphActive()) {
        Ilha.State.log(`Pelo Telégrafo, você consulta preços e negocia com a ${TRIBES[id].name} sem sair da base.`, 'good');
      } else {
        Ilha.State.log(`Você envia uma caravana de troca à ${TRIBES[id].name} (2 horas, ida e volta)…`);
        Ilha.State.advance(CARAVAN_MINUTES); // a caravana viaja sozinha: o tempo passa, sem custo de stamina
        if (d.dead) return false;
      }
      Ilha.UI.openTrade(id);
      return true;
    },

    // ------------------------------------------------------------
    // Cotação e troca
    // ------------------------------------------------------------
    /** give/take: { itemId: qtd }. Preço unitário recalculado a cada unidade (sem exploit de lote). */
    quote(id, give, take) {
      const t = this.tribe(id); const s = this.spread(id); const C = Ilha.Crafting;
      let giveValue = 0, takeValue = 0; const lines = []; let err = '';
      Object.keys(give || {}).forEach((it) => {
        const n = give[it]; if (!n) return;
        const st = t.stock[it];
        if (!st) { err = 'A tribo não negocia este item.'; return; }
        if (n > C.count(it)) { err = `Você não tem ${n}x ${C.name(it)}.`; return; }
        let q = st.qty; let v = 0;
        for (let i = 0; i < n; i++) { v += Math.max(1, Math.round(this.rawPrice(st.base, st.target, q) * (1 - s))); q += 1; }
        giveValue += v; lines.push({ side: 'give', id: it, n, value: v, endQty: q });
      });
      Object.keys(take || {}).forEach((it) => {
        const n = take[it]; if (!n) return;
        const st = t.stock[it];
        if (!st) { err = 'A tribo não negocia este item.'; return; }
        if (give && give[it]) { err = 'Não troque o mesmo item nos dois lados.'; return; }
        if (n > this.available(id, it)) { err = `A tribo só tem ${this.available(id, it)}x ${C.name(it)}.`; return; }
        let q = st.qty; let v = 0;
        for (let i = 0; i < n; i++) { v += Math.max(1, Math.round(this.rawPrice(st.base, st.target, q) * (1 + s))); q -= 1; }
        takeValue += v; lines.push({ side: 'take', id: it, n, value: v, endQty: q });
      });
      return { giveValue, takeValue, lines, err, credits: M().credits };
    },

    /** Confirma a troca: valor oferecido + saldo ≥ valor pedido; a sobra vira saldo de Conchas. */
    trade(id, give, take) {
      const C = Ilha.Crafting; const S = Ilha.State; const P = Ilha.Player; const m = M(); const t = this.tribe(id);
      const q = this.quote(id, give, take);
      if (q.err) { P.say(q.err); return false; }
      if (!q.lines.length) { P.say('Nada selecionado para trocar.', 'hint'); return false; }
      if (q.giveValue + m.credits < q.takeValue) { P.say(`Valor insuficiente: você oferece ${q.giveValue} UT (+${m.credits} de saldo) e a tribo pede ${q.takeValue} UT.`); return false; }
      const wGive = Object.keys(give).reduce((a, it) => a + (give[it] || 0) * C.ITEMS[it].weight, 0);
      const wTake = Object.keys(take).reduce((a, it) => a + (take[it] || 0) * C.ITEMS[it].weight, 0);
      if (C.weight() - wGive + wTake > Config.MAX_WEIGHT + 1e-6) { P.say('Sua mochila não comporta os itens pedidos. Libere peso.'); return false; }
      Object.keys(give).forEach((it) => { if (give[it]) C.remove(it, give[it]); });
      Object.keys(take).forEach((it) => { if (take[it]) C.add(it, take[it]); });
      q.lines.forEach((l) => { t.stock[l.id].qty = Math.max(0, l.endQty); });
      m.credits = Math.round((m.credits + q.giveValue - q.takeValue) * 100) / 100;
      const vol = q.giveValue + q.takeValue;
      t.volume += vol; m.volume += vol; m.trades++;
      t.reputation = clamp(t.reputation + vol / 40, 0, 100);
      const gl = q.lines.filter((l) => l.side === 'give').map((l) => `${l.n}x ${C.name(l.id)}`).join(', ');
      const tl = q.lines.filter((l) => l.side === 'take').map((l) => `${l.n}x ${C.name(l.id)}`).join(', ');
      S.log(`Troca com a ${TRIBES[id].name}: ${gl ? 'deu ' + gl + ` (${q.giveValue} UT)` : ''}${gl && tl ? ' · ' : ''}${tl ? 'recebeu ' + tl + ` (${q.takeValue} UT)` : ''}. Saldo: ${m.credits} UT. Reputação: ${Math.round(t.reputation)}.`, 'good');
      if (!D().player.crafted['trade_' + id]) { D().player.crafted['trade_' + id] = true; P.gainXP(20 * Config.eraOfLevel(D().player.level), 'primeira troca com a tribo'); }
      S.touch();
      return true;
    },

    // ------------------------------------------------------------
    // Equilíbrio diário (consumo e produção das tribos)
    // ------------------------------------------------------------
    daily() {
      Object.keys(TRIBES).forEach((id) => {
        const t = this.tribe(id);
        Object.keys(t.stock).forEach((it) => {
          const s = t.stock[it];
          s.qty = Math.round((s.qty + (s.target - s.qty) * 0.15) * 1000) / 1000;
        });
      });
    },

    // ------------------------------------------------------------
    // Pontuação M_Economia (0.0 a 2.0)
    // ------------------------------------------------------------
    ecoScore() {
      const m = M(); const ids = Object.keys(TRIBES);
      const disc = this.discoveredCount();
      const repAvg = ids.reduce((a, id) => a + this.tribe(id).reputation, 0) / (ids.length * 100);
      const trade = clamp(0.6 * repAvg + 0.4 * clamp(m.volume / 600, 0, 1), 0, 1);
      return clamp(0.3 * disc + 1.1 * trade, 0, 2);
    },
  };

  Ilha.Economy = Economy;
})();
