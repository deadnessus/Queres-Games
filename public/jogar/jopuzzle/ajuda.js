// "Como jogar": explica como arrastar, girar e espelhar, com uma peça de treino de verdade.
// Aparece sozinho na primeira vez que a pessoa aperta jogar (neste aparelho) e pode ser revisto
// no botão "Como jogar" da tela inicial e da pausa.
(() => {
'use strict';

const E = window.JoPuzzleEngine;
if (!E) return;

const painel = document.getElementById('painel');
const CHAVE = 'jopuzzle_tutorial_visto';
let vistoNestaAba = false;

const lido = () => { try { return localStorage.getItem(CHAVE) === '1'; } catch (e) { return false; } };
const marcar = () => { vistoNestaAba = true; try { localStorage.setItem(CHAVE, '1'); } catch (e) { /* sem armazenamento */ } };
const { norm, rotate, mirror } = E.formas;

function h(tag, attrs = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  for (const f of filhos.flat()) if (f != null && f !== false) n.append(f instanceof Node ? f : document.createTextNode(f));
  return n;
}
const icone = (svg, extra = '') => { const s = h('span', { class: 'aj-ico ' + extra, 'aria-hidden': 'true' }); s.innerHTML = svg; return s; };

const SVG = {
  arrastar: '<svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18M12 3l-3 3M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"/></svg>',
  girar: '<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
  espelhar: '<svg viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M8 7L3 17h5z"/><path d="M16 7l5 10h-5z"/></svg>',
  // dedo que toca: um círculo que pulsa
  toque: '<svg viewBox="0 0 24 24"><circle class="n" cx="12" cy="12" r="3.5"/><circle class="o" cx="12" cy="12" r="8"/></svg>',
  // dedo que segura: um anel que vai se completando
  segura: '<svg viewBox="0 0 24 24"><circle class="n" cx="12" cy="12" r="3.5"/><circle class="a" cx="12" cy="12" r="8.5"/></svg>',
};

// ---------- a peça de treino ----------
function pecaDeTreino({ aoGirar, aoEspelhar }) {
  const C = window.innerHeight < 700 ? 28 : 36; // telas baixas: peça menor, para caber tudo sem rolar
  let cells = norm([[0, 0], [0, 1], [0, 2], [1, 2]]); // um "L": o espelho dele não é igual a nenhum giro
  const el = h('div', { class: 'piece aj-peca', style: '--col:#38E1FF;left:50%;top:50%', role: 'button', 'aria-label': 'Peça de treino: toque para girar, segure para espelhar' });
  const animar = (nome) => { el.classList.remove('wiggle', 'flip'); void el.offsetWidth; el.classList.add(nome); };
  const desenhar = () => {
    const w = Math.max(...cells.map((c) => c[0])) + 1;
    const alt = Math.max(...cells.map((c) => c[1])) + 1;
    el.style.width = w * C + 'px';
    el.style.height = alt * C + 'px';
    el.style.marginLeft = -(w * C) / 2 + 'px';
    el.style.marginTop = -(alt * C) / 2 + 'px';
    el.replaceChildren(...cells.map(([x, y]) => h('div', { class: 'cell', style: `left:${x * C}px;top:${y * C}px;width:${C}px;height:${C}px` })));
    el.dataset.forma = JSON.stringify(cells);
  };
  desenhar();

  let toque = null;
  const soltar = (cancelado) => {
    if (!toque) return;
    clearTimeout(toque.timer);
    el.classList.remove('segurando');
    const t = toque;
    toque = null;
    if (!cancelado && !t.segurou && !t.moveu) { cells = rotate(cells); desenhar(); animar('wiggle'); aoGirar(); }
  };
  el.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (toque) return;
    toque = { x: e.clientX, y: e.clientY, segurou: false, moveu: false };
    el.classList.add('segurando');
    toque.timer = setTimeout(() => {
      if (!toque) return;
      toque.segurou = true;
      el.classList.remove('segurando');
      cells = mirror(cells); desenhar(); animar('flip'); aoEspelhar();
    }, E.holdMs);
  });
  el.addEventListener('pointermove', (e) => {
    if (toque && Math.hypot(e.clientX - toque.x, e.clientY - toque.y) > 8) {
      toque.moveu = true;
      clearTimeout(toque.timer);
      el.classList.remove('segurando');
    }
  });
  el.addEventListener('pointerup', () => soltar(false));
  el.addEventListener('pointercancel', () => soltar(true));
  el.addEventListener('contextmenu', (e) => e.preventDefault());
  return el;
}

// ---------- a tela ----------
// primeira vez: mostrar({ aoConcluir, aoFechar? })  ->  botão "Entendi, jogar" (e "Voltar" se houver aoFechar)
// revendo:      mostrar({ aoFechar })                ->  botão "Fechar"
function mostrar({ aoConcluir, aoFechar } = {}) {
  const estado = { girou: false, espelhou: false };
  const dica = h('p', { class: 'pn-sub aj-dica', 'aria-live': 'polite' });
  const chipGirar = h('span', { class: 'aj-chip' }, 'Girar');
  const chipEspelhar = h('span', { class: 'aj-chip' }, 'Espelhar');
  const atualizar = () => {
    chipGirar.classList.toggle('feito', estado.girou);
    chipEspelhar.classList.toggle('feito', estado.espelhou);
    painel.dataset.girou = estado.girou ? '1' : '0';
    painel.dataset.espelhou = estado.espelhou ? '1' : '0';
    dica.textContent = estado.girou && estado.espelhou ? 'Muito bem! Você já sabe girar e espelhar.'
      : estado.girou ? 'Girou! Agora segure o dedo na peça sem mexer.'
      : estado.espelhou ? 'Espelhou! Agora dê um toque rápido na peça para girar.'
      : 'Experimente: dê um toque na peça e depois segure o dedo nela.';
  };
  const peca = pecaDeTreino({
    aoGirar: () => { estado.girou = true; atualizar(); },
    aoEspelhar: () => { estado.espelhou = true; atualizar(); },
  });
  const palco = h('div', { class: 'aj-palco' }, peca);

  const regra = (ico, titulo, texto) => h('li', {}, ico, h('span', {}, h('b', {}, titulo), ' ', texto));
  const botoes = [];
  if (aoConcluir) botoes.push(h('button', { class: 'pn-btn principal', type: 'button', onclick: () => { marcar(); aoConcluir(); } }, 'Entendi, jogar'));
  if (aoFechar) botoes.push(h('button', { class: 'pn-btn suave', type: 'button', onclick: () => { if (!aoConcluir) marcar(); aoFechar(); } }, aoConcluir ? 'Voltar' : 'Fechar'));

  painel.replaceChildren(
    h('h2', { class: 'pn-titulo' }, 'Como jogar'),
    h('p', { class: 'pn-sub' }, 'Encaixe todas as peças na silhueta antes que o tempo acabe.'),
    palco,
    h('div', { class: 'aj-chips' }, chipGirar, chipEspelhar),
    dica,
    h('ul', { class: 'aj-regras' },
      regra(icone(SVG.arrastar), 'Arraste', 'a peça até a silhueta. Ela encaixa sozinha quando chega perto.'),
      regra(icone(SVG.toque, 'toque'), 'Um toque', 'na peça: ela gira.'),
      regra(icone(SVG.segura, 'segura'), 'Segure o dedo', 'na peça, sem mexer, por um instante: ela espelha (vira como num espelho).')),
    h('div', { class: 'pn-linha' }, ...botoes),
  );
  painel.scrollTop = 0;
  atualizar();
  E.mostrar('painel');
}

document.getElementById('btn-ajuda').addEventListener('click', () => mostrar({ aoFechar: () => E.voltar() }));

window.JoAjuda = { precisa: () => !vistoNestaAba && !lido(), mostrar };
})();
