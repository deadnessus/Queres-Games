// Mochila e receitas (sem DOM e sem Three.js: testável no Node).
import { ITENS, ORDEM_ITENS } from '../dados/itens.js';

export const MAX_POR_ITEM = 999;

export function criarInventario(inicial = []) {
  const itens = new Map();
  const ouvintes = [];
  for (const [id, n] of inicial) if (ITENS[id] && Number.isInteger(n) && n > 0) itens.set(id, Math.min(n, MAX_POR_ITEM));
  const avisar = () => { for (const f of ouvintes) f(); };

  return {
    quantos: (id) => itens.get(id) || 0,
    tem: (id) => (itens.get(id) || 0) > 0,
    adicionar(id, n = 1) {
      if (!ITENS[id] || n <= 0) return 0;
      const antes = itens.get(id) || 0;
      const depois = Math.min(MAX_POR_ITEM, antes + n);
      itens.set(id, depois);
      avisar();
      return depois - antes;
    },
    remover(id, n = 1) {
      const antes = itens.get(id) || 0;
      if (antes < n) return false;
      if (antes === n) itens.delete(id); else itens.set(id, antes - n);
      avisar();
      return true;
    },
    // Lista na ordem da mochila: [[id, quantidade], ...]
    lista: () => ORDEM_ITENS.filter((id) => itens.has(id)).map((id) => [id, itens.get(id)]),
    aoMudar(f) { ouvintes.push(f); },
  };
}

// Dá para criar? Devolve { ok, faltando: [[id, quanto falta]], jaTem }.
export function podeCriar(inv, receita) {
  const faltando = [];
  for (const [id, n] of Object.entries(receita.custo)) {
    const tem = inv.quantos(id);
    if (tem < n) faltando.push([id, n - tem]);
  }
  const jaTem = !!receita.unico && inv.tem(receita.resultado);
  return { ok: faltando.length === 0 && !jaTem, faltando, jaTem };
}

// Cria: tira os ingredientes e põe o resultado. Devolve true se criou.
export function criar(inv, receita) {
  if (!podeCriar(inv, receita).ok) return false;
  for (const [id, n] of Object.entries(receita.custo)) inv.remover(id, n);
  inv.adicionar(receita.resultado, receita.qtd);
  return true;
}
