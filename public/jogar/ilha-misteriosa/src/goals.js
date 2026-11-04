/* =====================================================================
 * goals.js — "Próximo passo": trilha de metas em ordem, derivada do
 * estado do jogo (nada de contador novo; saves antigos funcionam).
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const D = () => Ilha.State.data;
  const made = (id) => !!D().player.crafted[id];

  const GOALS = [
    { id: 'wreck', text: 'Vasculhe os destroços do balão', hint: 'Clique nas lonas vermelhas e brancas: há comida, água e ferramentas.', done: () => !!D().catalog['Destroços do Balão'] },
    { id: 'fire', text: 'Construa uma Fogueira', hint: '[C] → Fogueira: 5 galhos + 3 pedras. Colha galhos nos arbustos e pedras nas rochas.', done: () => made('campfire') },
    { id: 'light', text: 'Acenda a Fogueira', hint: 'Clique nela e escolha Acender (1 pedra + 1 galho).', done: () => made('first_fire') },
    { id: 'boil', text: 'Ferva Água do Rio', hint: 'Clique direito no rio para coletar água suja; ferva perto do fogo em [C].', done: () => made('boiled_water') || made('boiled_water_5') },
    { id: 'shelter', text: 'Construa um Abrigo de Folhas', hint: '[C] → Abrigo de Folhas (12 galhos). Durma encostado nele [R].', done: () => made('leaf_shelter') },
    { id: 'crate', text: 'Construa um Caixote Rústico', hint: '[C] → Caixote (16 galhos) para guardar itens fora da mochila.', done: () => made('crate_rustic') },
    { id: 'axe', text: 'Fabrique o Machado de Pedra', hint: '[C] → Machado de Pedra (2 pedras + 3 galhos).', done: () => made('stone_axe') },
    { id: 'spear', text: 'Fabrique a Lança de Madeira', hint: '[C] → Lança (4 galhos + 1 pedra). Serve para pescar.', done: () => made('wood_spear') },
    { id: 'house', text: 'Erga a Casa de Madeira', hint: 'Nível 2. Serre tábuas com o machado e marque a obra em [C]: ela pode ser feita em etapas.', done: () => made('house_wood') },
    { id: 'expedition', text: 'Faça sua primeira expedição', hint: 'Abra o Mapa [M] e explore um setor vizinho (leve comida e água).', done: () => D().map.explored >= 1 },
    { id: 'kiln', text: 'Construa o Forno de Olaria', hint: 'Nível 4 (Era 2): argila e pedra. Ele faz tijolo, telha e vidro.', done: () => made('kiln') },
    { id: 'blast', text: 'Construa o Alto-Forno', hint: 'Nível 6: funda minério em ferro e aço.', done: () => made('blast_furnace') },
    { id: 'lab', text: 'Construa o Laboratório Químico', hint: 'Nível 8 (Era 3): sabão, quinino e muito mais.', done: () => made('lab') },
    { id: 'wheel', text: 'Construa a Roda d’Água', hint: 'Nível 8: ao lado do rio; move serraria, moinho e dínamo.', done: () => made('water_wheel') },
    { id: 'telegraph', text: 'Acenda a Ilha: Estação de Telégrafo', hint: 'Nível 15: a meta final da civilização.', done: () => made('telegraph') },
  ];

  const Goals = {
    GOALS, _ref: null, _done: null,

    /** Meta atual: a primeira ainda não cumprida. */
    current() {
      if (!Ilha.State.data) return null;
      const total = GOALS.length;
      let doneCount = 0; let cur = null;
      GOALS.forEach((g) => { if (g.done()) doneCount++; else if (!cur) cur = g; });
      return { goal: cur, done: doneCount, total };
    },

    /** Detecta metas recém-cumpridas (toast + log + som). Silencioso na primeira leitura de um jogo. */
    check() {
      const d = Ilha.State.data;
      if (!d || d.dead) return;
      const done = new Set(GOALS.filter((g) => g.done()).map((g) => g.id));
      if (this._ref !== d || !this._done) { this._ref = d; this._done = done; return; }
      const fresh = GOALS.filter((g) => done.has(g.id) && !this._done.has(g.id));
      this._done = done;
      if (!fresh.length) return;
      const g = fresh[0];
      Ilha.State.log(`Meta cumprida: ${g.text}.`, 'xp');
      if (Ilha.UI && Ilha.UI.toast) Ilha.UI.toast('✔ Meta cumprida: ' + g.text);
      if (Ilha.Audio) Ilha.Audio.play('achieve');
    },
  };

  Ilha.Goals = Goals;
})();
