// Infiltrados na Órbita: personagem guardado na conta do site (cor, roupas da loja e créditos).
//
// Só números e nomes de itens da lista fixa da loja (nada de texto livre). Tabela própria `inf_personagens`,
// ligada a contas.id. Os créditos vêm do jogo (que roda no navegador), então o servidor limita:
//  - na primeira vez, aceita até CREDITOS_INICIAIS_MAX (o que a criança já tinha juntado no aparelho);
//  - depois, os créditos só podem subir até GANHO_MAX por vez, e só se já passou GANHO_INTERVALO_S desde o
//    último ganho (uma partida dura mais que isso);
//  - roupa nova custa o preço da lista; sem créditos suficientes, a compra é recusada;
//  - roupa comprada não some (a lista só cresce).
// Isso dificulta inventar créditos, mas não impede quem conhece as regras: é um jogo para brincar, sem prêmio.

// [id, preço] — a MESMA lista de SHOP em game.html (deadnessus/Bento-3, pasta infiltrados/)
export const LOJA = {
  h_bone: 100, h_gorro: 150, h_laco: 150, h_festa: 200, h_fones: 250, h_cartola: 300, h_cowboy: 350, h_viking: 450, h_aureola: 600, h_coroa: 800,
  f_gravata: 120, f_cachecol: 150, f_cinto: 220, f_jaleco: 300, f_capa: 400, f_terno: 550,
  e_rosa: 80, e_verde: 80, e_ouro: 150, e_coracao: 300, e_estrela: 350,
};
const CATEGORIA = (id) => id.slice(0, 2); // 'h_' chapéu, 'f_' roupa, 'e_' olhos
const ORDEM = ['h_', 'f_', 'e_'];
export const CORES = 16;
export const CREDITOS_INICIAIS = 150;
export const CREDITOS_INICIAIS_MAX = 3000;
export const GANHO_MAX = 400;
export const GANHO_INTERVALO_S = 45;
export const CREDITOS_MAX = 1_000_000;

let pronto = false;
export async function prepararInfiltrados(db) {
  if (pronto) return;
  await db.prepare(
    'CREATE TABLE IF NOT EXISTS inf_personagens (conta_id INTEGER PRIMARY KEY, cor INTEGER NOT NULL, creditos INTEGER NOT NULL, roupas TEXT NOT NULL, vestindo TEXT NOT NULL, ganho_em INTEGER NOT NULL, atualizado_em INTEGER NOT NULL)',
  ).run();
  pronto = true;
}

const listaRoupas = (txt) => String(txt || '').split(',').filter((id) => Object.hasOwn(LOJA, id));

export function linhaParaPersonagem(l) {
  if (!l) return null;
  const roupas = listaRoupas(l.roupas);
  const v = String(l.vestindo || '').split(',');
  return {
    cor: l.cor,
    creditos: l.creditos,
    roupas,
    vestindo: ORDEM.map((cat, i) => (roupas.includes(v[i]) && CATEGORIA(v[i]) === cat ? v[i] : '')),
  };
}

// Confere o pedido do jogo. Devolve { erro } ou { cor, creditos, roupas, vestindo, ganhou }.
export function conferir(pedido, antes, agoraS) {
  const cor = Number(pedido.cor);
  if (!Number.isInteger(cor) || cor < 0 || cor >= CORES) return { erro: 'cor inválida' };
  const pedidoCred = Number(pedido.creditos);
  if (!Number.isInteger(pedidoCred) || pedidoCred < 0 || pedidoCred > CREDITOS_MAX) return { erro: 'créditos inválidos' };
  if (!Array.isArray(pedido.roupas) || pedido.roupas.length > Object.keys(LOJA).length) return { erro: 'roupas inválidas' };
  if (!pedido.roupas.every((id) => typeof id === 'string' && Object.hasOwn(LOJA, id))) return { erro: 'roupas inválidas' };
  if (!Array.isArray(pedido.vestindo) || pedido.vestindo.length !== 3) return { erro: 'roupas inválidas' };

  let roupas, creditos, ganhou = false;
  if (!antes) {
    // primeira vez: o que já estava no aparelho (com limite)
    roupas = [...new Set(pedido.roupas)];
    creditos = Math.min(pedidoCred, CREDITOS_INICIAIS_MAX);
  } else {
    const velhas = listaRoupas(antes.roupas);
    const novas = [...new Set(pedido.roupas)].filter((id) => !velhas.includes(id));
    const custo = novas.reduce((s, id) => s + LOJA[id], 0);
    const podeGanhar = agoraS - antes.ganho_em >= GANHO_INTERVALO_S ? GANHO_MAX : 0;
    const teto = antes.creditos + podeGanhar - custo;
    if (teto < 0) return { erro: 'créditos insuficientes' };
    creditos = Math.min(pedidoCred, teto);
    ganhou = creditos > antes.creditos - custo;
    roupas = velhas.concat(novas);
  }
  const vestindo = ORDEM.map((cat, i) => {
    const id = pedido.vestindo[i];
    return typeof id === 'string' && roupas.includes(id) && CATEGORIA(id) === cat ? id : '';
  });
  return { cor, creditos, roupas, vestindo, ganhou };
}
