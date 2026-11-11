/* =====================================================================
 * events.js — "Novidade do dia": um evento pequeno por manhã (07:00),
 * com uma ou duas escolhas simples. Sem sistema novo: só itens e tempo.
 * Guardado em state.data.event = { id, day, done }.
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const D = () => Ilha.State.data;

  // gives: { item: [min, max] } · cost: { minutes, kcal, stamina } · when: () => bool
  const LIST = [
    { id: 'box', icon: '📦', title: 'Caixa na praia', text: 'A maré deixou uma caixa de madeira na areia, ainda fechada.',
      choices: [{ label: 'Abrir a caixa', cost: { minutes: 15, kcal: 10, stamina: 2 }, gives: { ration: [1, 1], fiber: [3, 5], iron_scrap: [1, 3] } }, { label: 'Deixar para lá' }] },
    { id: 'school', icon: '🐟', title: 'Cardume na enseada', text: 'Um cardume enorme encalhou numa poça da enseada. É peixe fácil, mas só por hoje.',
      choices: [{ label: 'Pegar peixes (45 min)', cost: { minutes: 45, kcal: 40, stamina: 6 }, gives: { raw_fish: [4, 6] } }, { label: 'Ignorar' }] },
    { id: 'fruit', icon: '🍊', title: 'Árvore carregada', text: 'Uma árvore perto da trilha amanheceu cheia de frutas maduras.',
      choices: [{ label: 'Colher frutas (30 min)', cost: { minutes: 30, kcal: 30, stamina: 4 }, gives: { citrus: [3, 4], root: [1, 3] } }, { label: 'Deixar amadurecer' }] },
    { id: 'rain', icon: '🌧️', title: 'Chuva de madrugada', text: 'Choveu forte durante a noite e as folhas largas estão cheias de água limpa.',
      choices: [{ label: 'Recolher a água (10 min)', cost: { minutes: 10, kcal: 5, stamina: 1 }, gives: { clean_water: [2, 3] } }, { label: 'Deixar' }] },
    { id: 'wreck', icon: '⚓', title: 'Destroço na maré', text: 'Pedaços de um casco velho apareceram na linha da maré: metal e cordas.',
      when: () => D().time.day >= 3,
      choices: [{ label: 'Recolher o que der (20 min)', cost: { minutes: 20, kcal: 20, stamina: 3 }, gives: { iron_scrap: [2, 4], fiber: [2, 4], plank: [1, 2] } }, { label: 'Deixar' }] },
    { id: 'noise', icon: '🐾', title: 'Barulho na mata', text: 'Algo pequeno mexeu nos arbustos à noite. Há rastros frescos perto do acampamento.',
      when: () => D().time.day >= 2,
      choices: [{ label: 'Seguir os rastros (40 min)', cost: { minutes: 40, kcal: 40, stamina: 6 }, gives: { leather: [1, 2], herb: [1, 3] } }, { label: 'Ignorar' }] },
    { id: 'visit', icon: '🌿', title: 'Visita da tribo', text: 'Um mensageiro da Tribo Raiz Verde deixou um presente na entrada do acampamento.',
      when: () => !!(Ilha.Economy && Ilha.Economy.discovered('raiz_verde')),
      choices: [{ label: 'Receber o presente', cost: { minutes: 5 }, gives: { herb: [2, 4], seed_tuber: [1, 2] }, rep: 5 }] },
  ];

  const Events = {
    LIST,
    get(id) { return LIST.find((e) => e.id === id) || null; },
    current() { const d = D(); return d && d.event && !d.event.done ? d.event : null; },

    /** Escolhe o evento do dia de forma estável (mesmo dia → mesmo evento). */
    pick(day) {
      const ok = LIST.filter((e) => !e.when || e.when());
      if (!ok.length) return null;
      const last = D().event && D().event.id;
      const pool = ok.length > 1 ? ok.filter((e) => e.id !== last) : ok;
      const r = Math.sin(day * 12.9898 + 4.1) * 43758.5453; // hash estável por dia
      return pool[Math.floor((r - Math.floor(r)) * pool.length)];
    },

    /** Chamado a cada hora: às 07:00 do dia 2 em diante surge a novidade. */
    hourly() {
      const d = D();
      if (!d || d.dead || d.time.hour !== 7 || d.time.day < 2) return;
      if (d.event && d.event.day === d.time.day) return;
      const e = this.pick(d.time.day);
      if (!e) return;
      d.event = { id: e.id, day: d.time.day, done: false };
      Ilha.State.log(`${e.icon} Novidade do dia: ${e.title}. ${e.text}`, 'story');
      if (Ilha.UI && Ilha.UI.toast) Ilha.UI.toast(`${e.icon} Novidade: ${e.title}`);
      if (Ilha.Audio) Ilha.Audio.play('achieve');
      Ilha.State.touch();
    },

    /** Executa a escolha i do evento pendente. */
    choose(i) {
      const d = D(); const cur = this.current(); const P = Ilha.Player; const C = Ilha.Crafting;
      if (!cur || d.dead || d.sleeping) return false;
      const e = this.get(cur.id); const ch = e && e.choices[i];
      if (!ch) return false;
      if (ch.gives) {
        const c = ch.cost || {};
        if (c.minutes && !P.act({ minutes: c.minutes, kcal: c.kcal || 0, stamina: c.stamina || 0, work: true })) return false;
        if (d.dead) return true;
        const got = [];
        Object.keys(ch.gives).forEach((id) => {
          const [lo, hi] = ch.gives[id]; const n = lo + Math.floor(Math.random() * (hi - lo + 1));
          const added = C.add(id, n); if (added > 0) got.push(`${added}x ${C.name(id)}`);
        });
        cur.done = true;
        if (ch.rep && Ilha.Economy.discovered('raiz_verde')) { const t = Ilha.Economy.tribe('raiz_verde'); t.reputation = Math.min(100, (t.reputation || 0) + ch.rep); }
        Ilha.State.log(`${e.icon} ${e.title}: ${got.length ? 'você pegou ' + got.join(', ') : 'a mochila está cheia, não pegou nada'}.`, 'good');
        if (Ilha.State.float) Ilha.State.float(got.length ? '+ ' + got[0] : 'Mochila cheia');
      } else {
        cur.done = true;
        Ilha.State.log(`${e.icon} ${e.title}: você decidiu deixar passar.`);
      }
      Ilha.State.touch();
      return true;
    },
  };

  Ilha.Events = Events;
})();
