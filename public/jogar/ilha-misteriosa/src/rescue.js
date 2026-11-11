/* =====================================================================
 * rescue.js — "Sinal de resgate": o objetivo final do jogo, em 0–100%.
 * Enche com marcos de construção (derivados do estado). Ao chegar a 100%
 * (Telégrafo no ar) um navio responde e o jogo tem seu final.
 * Também gera o "Resumo do dia" mostrado ao acordar.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const D = () => Ilha.State.data;
  const made = (id) => !!D().player.crafted[id];

  const MILESTONES = [
    { id: 'house', name: 'Casa de Madeira', pts: 8, done: () => made('house_wood') },
    { id: 'kiln', name: 'Forno de Olaria', pts: 10, done: () => made('kiln') },
    { id: 'masonry', name: 'Casa de Alvenaria', pts: 8, done: () => made('house_masonry') },
    { id: 'blast', name: 'Alto-Forno', pts: 14, done: () => made('blast_furnace') },
    { id: 'lab', name: 'Laboratório', pts: 10, done: () => made('lab') },
    { id: 'wheel', name: 'Roda d’Água', pts: 10, done: () => made('water_wheel') },
    { id: 'dynamo', name: 'Dínamo', pts: 15, done: () => made('dynamo') },
    { id: 'telegraph', name: 'Telégrafo', pts: 25, done: () => made('telegraph') },
  ];

  const Rescue = {
    MILESTONES,

    pct() { if (!D()) return 0; return MILESTONES.reduce((a, m) => a + (m.done() ? m.pts : 0), 0); },
    next() { return MILESTONES.find((m) => !m.done()) || null; },

    /** Chamado a cada hora e a cada atualização da tela: dispara o final uma única vez. */
    check() {
      const d = D();
      if (!d || d.dead) return;
      // a barra comemora quando sobe (silencioso na 1ª leitura de um jogo carregado)
      const pct = this.pct();
      if (this._ref !== d) { this._ref = d; this._last = pct; }
      else if (pct > this._last) {
        const dl = pct - this._last; this._last = pct;
        Ilha.State.log(`📡 Sinal de resgate: ${pct}% (+${dl}%).`, 'xp');
        Ilha.State.float(`+${dl}% resgate`, 'xp');
        if (Ilha.Audio) Ilha.Audio.play('achieve');
        if (Ilha.UI && Ilha.UI.rescueBump) Ilha.UI.rescueBump();
      } else this._last = pct;
      if (d.rescued) return;
      if (pct >= 100) {
        d.rescued = true;
        Ilha.State.log('Um apito no horizonte: um navio responde ao seu telégrafo! Cyrus foi encontrado.', 'story');
        if (Ilha.Audio) Ilha.Audio.play('levelup');
        Ilha.State.touch();
        if (Ilha.UI && Ilha.UI.showVictory) Ilha.UI.showVictory();
      }
    },

    snapshot() {
      const d = D();
      return { logId: d.logSeq, day: d.time.day, pct: this.pct(), level: d.player.level, built: Object.keys(d.player.crafted).filter((k) => Ilha.Crafting.recipe(k)).length, ach: Ilha.Achievements ? Ilha.Achievements.count() : 0 };
    },

    /** Resumo do que mudou desde a última noite dormida; atualiza o marco de comparação. */
    daySummary() {
      const d = D(); const cur = this.snapshot(); const prev = d.snap || Object.assign({}, cur, { pct: 0, level: 1, built: 0, ach: 0, logId: 0 });
      const nxt = this.next(); const goal = Ilha.Goals ? Ilha.Goals.current() : null;
      const s = {
        day: cur.day, pct: cur.pct, dPct: cur.pct - prev.pct, level: cur.level, dLevel: cur.level - prev.level,
        dBuilt: cur.built - prev.built, dAch: cur.ach - prev.ach,
        next: nxt ? `${nxt.name} (+${nxt.pts}%)` : 'Resgate completo',
        goal: goal && goal.goal ? goal.goal.text : 'Todas as metas cumpridas',
        stats: d.player.stats,
        // destaques desde a última noite: as 3 últimas linhas boas do diário (sem estado novo)
        highlights: d.log.filter((l) => l.id > (prev.logId || 0) && l.cls === 'good').slice(-3).map((l) => l.text),
      };
      d.snap = cur;
      return s;
    },
  };

  Ilha.Rescue = Rescue;
})();
