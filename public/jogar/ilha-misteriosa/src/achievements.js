/* =====================================================================
 * achievements.js — 10 conquistas simples, derivadas do estado do jogo.
 * Guardadas em state.data.achievements = { id: diaDoDesbloqueio }.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const D = () => Ilha.State.data;
  const made = (id) => !!D().player.crafted[id];

  const LIST = [
    { id: 'first_fire', name: 'Primeira Fogueira', desc: 'Acenda uma fogueira.', done: () => made('first_fire') },
    { id: 'first_night', name: 'Primeira Noite', desc: 'Sobreviva ao primeiro dia inteiro.', done: () => D().stats.daysSurvived >= 1 },
    { id: 'first_house', name: 'Um Teto Seu', desc: 'Conclua uma casa ou entre num quarto fechado.', done: () => made('house_wood') || made('house_masonry') || !!Ilha.Building.roomAt(D().player.x, D().player.y) },
    { id: 'first_expedition', name: 'Exploradora da Ilha', desc: 'Faça sua primeira expedição.', done: () => D().map.explored >= 1 },
    { id: 'first_trade', name: 'Escambo', desc: 'Troque itens com uma tribo.', done: () => (D().map.trades || 0) >= 1 },
    { id: 'level5', name: 'Engenheiro da Era 2', desc: 'Alcance o nível 5.', done: () => D().player.level >= 5 },
    { id: 'blast', name: 'Fogo e Ferro', desc: 'Construa o Alto-Forno Catalão.', done: () => made('blast_furnace') },
    { id: 'well_rested', name: 'Noite Bem Dormida', desc: 'Fique Bem Descansado.', done: () => Ilha.Player.hasCond('WELL_RESTED') },
    { id: 'ten_recipes', name: 'Mãos de Engenheiro', desc: 'Fabrique ou construa 10 coisas diferentes.', done: () => Object.keys(D().player.crafted).filter((k) => Ilha.Crafting.recipe(k)).length >= 10 },
    { id: 'week', name: 'Uma Semana na Ilha', desc: 'Sobreviva 7 dias.', done: () => D().stats.daysSurvived >= 7 },
  ];

  const Achievements = {
    LIST,

    count() { const a = (D() && D().achievements) || {}; return LIST.filter((x) => a[x.id]).length; },
    has(id) { return !!(D().achievements && D().achievements[id]); },

    /** Desbloqueia as conquistas cujas condições se cumpriram (uma única vez cada). */
    check() {
      const d = D();
      if (!d || d.dead) return;
      d.achievements = d.achievements || {};
      const fresh = [];
      LIST.forEach((a) => {
        if (d.achievements[a.id]) return;
        let ok = false;
        try { ok = !!a.done(); } catch (e) { ok = false; }
        if (ok) { d.achievements[a.id] = d.time.day; fresh.push(a); }
      });
      if (!fresh.length) return;
      fresh.forEach((a) => Ilha.State.log(`🏆 Conquista: ${a.name} — ${a.desc}`, 'xp'));
      if (Ilha.UI && Ilha.UI.toast) Ilha.UI.toast('🏆 Conquista: ' + fresh[fresh.length - 1].name + (fresh.length > 1 ? ` (+${fresh.length - 1})` : ''));
      if (Ilha.Audio) Ilha.Audio.play('achieve');
      Ilha.State.touch();
    },
  };

  Ilha.Achievements = Achievements;
})();
