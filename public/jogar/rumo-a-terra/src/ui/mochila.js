// Tela da mochila: aba "Mochila" (o que você tem, e "Colocar" para blocos e fogueira), aba "Criar" (receitas)
// e aba "Missões" (a campanha: o que já fez, o que está fazendo e quantas faltam).
// Os botões gerados aqui usam data-acao primeiro (a telemetria do site conta pelo primeiro data-..., um nome por ação).
import { ITENS, RECEITAS } from '../dados/itens.js';
import { podeCriar } from '../logica/inventario.js';
import { MISSOES } from '../dados/missoes.js';

const $ = (id) => document.getElementById(id);

export function criarTelaMochila({ inventario, missoes, aoCriar, aoColocar }) {
  const painelMochila = $('painel-mochila'), painelCriar = $('painel-criar'), painelMissoes = $('painel-missoes');
  const abaMochila = $('aba-mochila'), abaCriar = $('aba-criar'), abaMissoes = $('aba-missoes');
  let aba = 'mochila';

  const el = (tag, classe, texto) => { const e = document.createElement(tag); if (classe) e.className = classe; if (texto != null) e.textContent = texto; return e; };

  function desenharMochila() {
    painelMochila.replaceChildren();
    const lista = inventario.lista();
    if (!lista.length) {
      painelMochila.append(el('p', 'vazio', 'A mochila está vazia. Chegue perto de uma árvore, mire no tronco e segure ✋ para pegar madeira.'));
      return;
    }
    for (const [id, n] of lista) {
      const info = ITENS[id];
      const card = el('div', 'item');
      card.append(el('span', 'icone', info.icone), el('b', null, info.nome), el('span', 'qtd', `×${n}`), el('small', null, info.texto));
      if (info.tipo === 'colocavel') {
        const b = el('button', 'pequeno', 'Colocar');
        b.type = 'button';
        b.dataset.acao = 'colocar';
        b.dataset.item = id;
        card.append(b);
      }
      painelMochila.append(card);
    }
  }

  function desenharCriar() {
    painelCriar.replaceChildren();
    for (const r of RECEITAS) {
      if (!missoes.receitaLiberada(r)) continue;
      const info = ITENS[r.resultado];
      const estado = podeCriar(inventario, r);
      const linha = el('div', 'receita' + (estado.ok ? ' pode' : ''));
      const textos = el('div', 'info');
      textos.append(el('b', null, r.qtd > 1 ? `${info.nome} ×${r.qtd}` : info.nome), el('small', null, info.texto));
      const custos = el('div', 'custos');
      for (const [id, precisa] of Object.entries(r.custo)) {
        const tem = inventario.quantos(id);
        custos.append(el('span', 'custo' + (tem >= precisa ? ' ok' : ''), `${ITENS[id].icone} ${Math.min(tem, precisa)}/${precisa}`));
      }
      textos.append(custos);
      const b = el('button', 'pequeno', estado.jaTem ? 'Já tem' : 'Criar');
      b.type = 'button';
      b.dataset.acao = 'criar';
      b.dataset.receita = r.id;
      b.disabled = !estado.ok;
      linha.append(el('span', 'icone', info.icone), textos, b);
      painelCriar.append(linha);
    }
  }

  function desenharMissoes() {
    painelMissoes.replaceChildren();
    const atual = missoes.indice, est = missoes.estado;
    painelMissoes.append(el('p', 'vazio', missoes.fim ? '🌍 Você completou as 12 missões!' : `Missão ${atual + 1} de ${MISSOES.length}. Cada missão conserta uma parte da Andorinha.`));
    MISSOES.forEach((m, i) => {
      const card = el('div', 'missao-item' + (i < atual ? ' feita' : i === atual ? ' atual' : ''));
      if (i > atual) { card.append(el('b', null, `🔒 Missão ${i + 1}: ???`)); painelMissoes.append(card); return; }
      card.append(el('b', null, `${i < atual ? '✅' : m.icone} Missão ${i + 1}: ${m.titulo}`));
      if (i === atual) {
        const ol = el('ol');
        m.passos.forEach((p, k) => {
          const li = el('li', k < est.p ? 'feito' : k === est.p ? 'agora' : null, k <= est.p ? p.texto : '...');
          if (k === est.p) { const prog = missoes.progresso(); if (prog) li.textContent += `  (${prog})`; }
          ol.append(li);
        });
        card.append(ol);
      }
      painelMissoes.append(card);
    });
  }

  function desenhar() {
    abaMochila.setAttribute('aria-selected', String(aba === 'mochila'));
    abaCriar.setAttribute('aria-selected', String(aba === 'criar'));
    abaMissoes.setAttribute('aria-selected', String(aba === 'missoes'));
    painelMochila.hidden = aba !== 'mochila';
    painelCriar.hidden = aba !== 'criar';
    painelMissoes.hidden = aba !== 'missoes';
    if (aba === 'mochila') desenharMochila(); else if (aba === 'criar') desenharCriar(); else desenharMissoes();
  }

  abaMochila.addEventListener('click', () => { aba = 'mochila'; desenhar(); });
  abaCriar.addEventListener('click', () => { aba = 'criar'; desenhar(); });
  abaMissoes.addEventListener('click', () => { aba = 'missoes'; desenhar(); });
  painelCriar.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-receita]');
    if (!b || b.disabled) return;
    const r = RECEITAS.find((x) => x.id === b.dataset.receita);
    if (r) aoCriar(r);
    desenhar();
  });
  painelMochila.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-item]');
    if (b) aoColocar(b.dataset.item);
  });

  return {
    abrir(qual = aba) { aba = qual; desenhar(); },
    redesenhar: desenhar,
  };
}
