// Ponte entre o jogo e o login do queres.games (public/conta.js, o QGConta).
// Sem o site (GitHub Pages, arquivo aberto no computador), window.QGConta não existe e o jogo
// esconde os botões de conta e de ranking. A experiência de login é a do conta.js, sem tela própria.

export const temSite = () => typeof window.QGConta !== 'undefined';

// { logado, apelido } | { logado: false } | null (sem servidor de contas)
export async function eu() {
  if (!temSite()) return null;
  try { return await window.QGConta.me(); } catch (e) { return null; }
}

async function api(caminho, { metodo = 'GET', corpo } = {}) {
  try {
    const r = await fetch(caminho, {
      method: metodo,
      credentials: 'same-origin',
      cache: 'no-store',
      headers: corpo !== undefined ? { 'content-type': 'application/json' } : {},
      body: corpo !== undefined ? JSON.stringify(corpo) : undefined,
    });
    let dados = null;
    try { dados = await r.json(); } catch (e) { /* sem JSON */ }
    return { status: r.status, dados: dados || {} };
  } catch (e) {
    return { status: 0, dados: {} };
  }
}

// Começa uma partida no servidor (o relógio começa aqui). Devolve o id ou null.
export async function iniciarPartida() {
  const r = await api('/api/invasao-estelar/iniciar', { metodo: 'POST', corpo: {} });
  return r.status === 200 ? r.dados.partida : null;
}

// Envia o resultado da partida. Devolve { ok, geral, mes } ou { erro }.
export async function enviarPartida(partida, resultado) {
  const r = await api('/api/invasao-estelar/enviar', { metodo: 'POST', corpo: { partida, ...resultado } });
  if (r.status === 200) return { ok: true, ...r.dados };
  return { erro: r.dados.erro || 'não consegui salvar agora' };
}

export async function ranking(escopo) {
  const r = await api(`/api/invasao-estelar/ranking?escopo=${escopo}`);
  return r.status === 200 ? r.dados : null;
}
