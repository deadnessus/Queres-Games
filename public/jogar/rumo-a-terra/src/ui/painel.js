// Painel da Andorinha (porta da nave → "Painel da nave"): a missão de agora, os sistemas da nave (consertados ou não),
// o tanque de combustível, o botão de instalar as peças, o minijogo das estrelas e o botão de decolar.
// Minijogo: tocar nas 5 estrelas do Cruzeiro do Sul na ordem certa (os navegadores antigos se guiavam por elas).
// O mesmo minijogo é o segredo do telescópio do Observatório (abrirEstrelas).
import { SISTEMAS } from '../dados/missoes.js';
import { ITENS } from '../dados/itens.js';

const $ = (id) => document.getElementById(id);

// Cruzeiro do Sul (posições aproximadas, em % do quadro) e a ordem para tocar.
const CRUZEIRO = [
  { id: 'gacrux', x: 50, y: 14, t: 11, pede: 'a estrela de CIMA' },
  { id: 'acrux', x: 55, y: 84, t: 13, pede: 'a estrela de BAIXO' },
  { id: 'mimosa', x: 31, y: 44, t: 12, pede: 'a estrela da ESQUERDA' },
  { id: 'delta', x: 72, y: 37, t: 9, pede: 'a estrela da DIREITA' },
  { id: 'epsilon', x: 61, y: 58, t: 6, pede: 'a estrela PEQUENININHA, entre a de baixo e a da direita' },
];
// Outras estrelas do céu (para não ficar fácil demais), entre elas as duas "Guardas" (Alfa e Beta do Centauro).
const OUTRAS = [[12, 70, 12], [22, 82, 11], [8, 20, 5], [88, 14, 6], [92, 66, 7], [80, 88, 5], [20, 30, 4], [40, 70, 4], [70, 70, 4], [86, 46, 5], [35, 8, 4], [6, 50, 4]];

export function criarPainel({ missoes, inventario, som, aoInstalar, aoMinijogo, aoDecolar }) {
  const conteudo = $('painel-conteudo'), minijogo = $('minijogo');
  const caixa = $('painel-missao'), sistemas = $('painel-sistemas'), falta = $('painel-falta');
  const tanque = $('painel-tanque'), tanqueCheio = $('tanque-cheio'), tanqueTexto = $('tanque-texto');
  const btnInstalar = $('btn-instalar'), btnCalibrar = $('btn-calibrar'), btnDecolar = $('btn-decolar');
  const ceu = $('ceu-minijogo'), linhas = $('linhas-minijogo'), textoMini = $('minijogo-texto');
  const el = (tag, classe, texto) => { const e = document.createElement(tag); if (classe) e.className = classe; if (texto != null) e.textContent = texto; return e; };

  function desenhar() {
    const m = missoes.missao(), ps = missoes.passo(), est = missoes.estado;
    caixa.replaceChildren();
    if (m && ps) {
      caixa.append(el('b', null, `${m.icone} ${m.titulo}`), el('br'), document.createTextNode(ps.texto));
      const prog = missoes.progresso();
      if (prog) caixa.append(el('span', 'progresso', prog));
    } else caixa.append(el('b', null, '🌍 Todas as missões completas!'), el('br'), document.createTextNode('A Andorinha está inteira. Dá para decolar de novo quando quiser.'));

    sistemas.replaceChildren();
    for (const s of SISTEMAS) {
      const nivel = est.sistemas[s.id] || 0;
      const linha = el('div', 'sistema' + (nivel >= s.etapas ? ' ok' : nivel > 0 ? ' meio' : ''));
      linha.append(el('span', 'icone', s.icone), el('b', null, s.nome),
        el('span', 'estado', nivel >= s.etapas ? '✔' : s.etapas > 1 ? `${nivel}/${s.etapas}` : '✖'));
      sistemas.append(linha);
    }

    tanque.hidden = !(est.sistemas.combustivel > 0);
    tanqueCheio.style.transform = `scaleX(${est.combustivel / 100})`;
    tanqueTexto.textContent = `${Math.floor(est.combustivel)}%`;

    const tipo = ps ? ps.tipo : null;
    btnInstalar.hidden = tipo !== 'instalar';
    btnCalibrar.hidden = tipo !== 'minijogo';
    btnDecolar.hidden = !(tipo === 'decolar' || missoes.fim);
    falta.hidden = true;
    if (tipo === 'instalar') {
      const pi = missoes.podeInstalar();
      btnInstalar.disabled = !pi.ok;
      btnInstalar.textContent = '🔧 Instalar ' + Object.entries(ps.precisa).map(([id, n]) => `${ITENS[id].icone}${n > 1 ? '×' + n : ''}`).join(' ');
      if (!pi.ok) {
        falta.hidden = false;
        falta.textContent = 'Ainda falta: ' + pi.faltando.map(([id, n]) => `${n} ${ITENS[id].icone} ${ITENS[id].nome}`).join(', ') + '.';
      }
    }
  }

  // ---------- minijogo das estrelas ----------
  let proxima = 0, modoTelescopio = null;
  const titulo = $('painel-titulo');
  function montarCeu() {
    for (const b of ceu.querySelectorAll('button')) b.remove();
    linhas.replaceChildren();
    proxima = 0;
    const botao = (x, y, t, nome) => {
      const b = el('button', 'estrela');
      b.type = 'button';
      b.dataset.estrela = nome;
      b.style.left = `${x}%`; b.style.top = `${y}%`;
      b.style.setProperty('--t', `${t}px`);
      b.setAttribute('aria-label', 'Estrela');
      ceu.append(b);
      return b;
    };
    for (const [x, y, t] of OUTRAS) botao(x, y, t, 'outra');
    for (const e of CRUZEIRO) e.botao = botao(e.x, e.y, e.t, e.id);
    pedir();
  }
  function pedir() {
    textoMini.textContent = `Toque nas 5 estrelas do Cruzeiro do Sul, uma de cada vez. Agora: ${CRUZEIRO[proxima].pede}.`;
  }
  function linha(a, b) {
    const l = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    l.setAttribute('x1', a.x); l.setAttribute('y1', a.y); l.setAttribute('x2', b.x); l.setAttribute('y2', b.y);
    linhas.append(l);
  }
  ceu.addEventListener('click', (ev) => {
    const b = ev.target.closest('button[data-estrela]');
    if (!b || minijogo.hidden) return;
    const certa = CRUZEIRO[proxima];
    if (b === certa.botao) {
      b.classList.add('certa');
      som.estrela();
      proxima++;
      if (proxima === 2) linha(CRUZEIRO[0], CRUZEIRO[1]);
      if (proxima === 4) linha(CRUZEIRO[2], CRUZEIRO[3]);
      if (proxima >= CRUZEIRO.length) {
        textoMini.textContent = 'Calibrado! Esse é o Cruzeiro do Sul.';
        setTimeout(() => {
          if (modoTelescopio) { const m = modoTelescopio; modoTelescopio = null; m.aoTerminar(); return; }
          fecharMinijogo(); aoMinijogo();
        }, 1100);
      } else pedir();
    } else if (!b.classList.contains('certa')) {
      som.negado();
      b.classList.add('errou');
      setTimeout(() => b.classList.remove('errou'), 400);
      textoMini.textContent = `Essa não. Procure ${certa.pede}. Dica: as 4 mais brilhantes do meio formam uma cruz.`;
    }
  });
  function abrirMinijogo() { conteudo.hidden = true; minijogo.hidden = false; montarCeu(); }
  function fecharMinijogo() { minijogo.hidden = true; conteudo.hidden = false; desenhar(); }

  btnInstalar.addEventListener('click', () => { if (!btnInstalar.disabled) { aoInstalar(); desenhar(); } });
  btnCalibrar.addEventListener('click', () => { som.clique(); abrirMinijogo(); });
  btnDecolar.addEventListener('click', () => aoDecolar());
  $('btn-sair-minijogo').addEventListener('click', () => {
    som.clique();
    if (modoTelescopio) { const m = modoTelescopio; modoTelescopio = null; m.aoSair(); return; }
    fecharMinijogo();
  });

  return {
    abrir() { modoTelescopio = null; titulo.textContent = 'Painel da Andorinha'; minijogo.hidden = true; conteudo.hidden = false; desenhar(); },
    // O telescópio do Observatório (segredo): só o minijogo das estrelas.
    abrirEstrelas(modo) { modoTelescopio = modo; titulo.textContent = 'Telescópio do Observatório'; abrirMinijogo(); },
    desenhar,
    // Para os testes automáticos.
    get estrelas() { return CRUZEIRO.map((e) => e.id); },
  };
}
