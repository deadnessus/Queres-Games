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

// Envia o resultado da partida, os números dela (só números) e a nave usada.
// Devolve { ok, geral, mes, progresso } ou { erro }.
export async function enviarPartida(partida, resultado, est, nave) {
  const r = await api('/api/invasao-estelar/enviar', { metodo: 'POST', corpo: { partida, ...resultado, est, nave } });
  if (r.status === 200) return { ok: true, ...r.dados };
  return { erro: r.dados.erro || 'não consegui salvar agora' };
}

export async function ranking(escopo) {
  const r = await api(`/api/invasao-estelar/ranking?escopo=${escopo}`);
  return r.status === 200 ? r.dados : null;
}

// Progresso do piloto (patente, medalhas, missões, naves). null sem conta ou sem servidor.
export async function progresso() {
  const r = await api('/api/invasao-estelar/progresso');
  return r.status === 200 ? r.dados : null;
}

// Guarda a nave e a cor escolhidas no hangar (só as liberadas).
export async function escolherNaveECor(mudancas) {
  const r = await api('/api/invasao-estelar/progresso', { metodo: 'POST', corpo: mudancas });
  return r.status === 200 ? r.dados : null;
}

// Desafio do dia: situação de hoje e ranking (`escopo`: 'dia' ou 'mes').
export async function desafio(escopo = 'dia') {
  const r = await api(`/api/invasao-estelar/desafio?escopo=${escopo}`);
  return r.status === 200 ? r.dados : null;
}

// Começa a tentativa do dia. Devolve { dia, semente } ou { erro }.
export async function iniciarDesafio() {
  const r = await api('/api/invasao-estelar/desafio-iniciar', { metodo: 'POST', corpo: {} });
  if (r.status === 200) return r.dados;
  return { erro: r.dados.erro || 'não consegui começar o desafio agora' };
}

export async function enviarDesafio(dia, resultado, est, nave) {
  const r = await api('/api/invasao-estelar/desafio-enviar', { metodo: 'POST', corpo: { dia, ...resultado, est, nave } });
  if (r.status === 200) return { ok: true, ...r.dados };
  return { erro: r.dados.erro || 'não consegui salvar o desafio agora' };
}

/* ---------- desafie um amigo por código (Etapa 4, #26) ---------- */

// Cria um código de 4 letras (vale 7 dias). { codigo, expiraEm } ou { erro }.
export async function amigoCriar() {
  const r = await api('/api/invasao-estelar/amigo-criar', { metodo: 'POST', corpo: {} });
  if (r.status === 200) return r.dados;
  return { erro: r.status === 401 ? 'entre na sua conta' : r.dados.erro || 'não consegui criar o código agora' };
}

// Placar do código. { codigo, criador, expiraEm, expirado, total, top, eu } ou { erro, status }.
export async function amigo(codigo) {
  const r = await api(`/api/invasao-estelar/amigo?codigo=${encodeURIComponent(codigo)}`);
  if (r.status === 200) return r.dados;
  return { erro: r.dados.erro || 'não consegui abrir o código agora', status: r.status };
}

// Começa uma partida do código (o relógio começa aqui). { partida, semente, codigo } ou { erro }.
export async function amigoIniciar(codigo) {
  const r = await api('/api/invasao-estelar/amigo-iniciar', { metodo: 'POST', corpo: { codigo } });
  if (r.status === 200) return r.dados;
  return { erro: r.dados.erro || 'não consegui começar agora' };
}

// Envia a partida do código. { ok, codigo, posicao, total, faltam, progresso } ou { erro }.
export async function amigoEnviar(partida, resultado, est, nave) {
  const r = await api('/api/invasao-estelar/amigo-enviar', { metodo: 'POST', corpo: { partida, ...resultado, est, nave } });
  if (r.status === 200) return { ok: true, ...r.dados };
  return { erro: r.dados.erro || 'não consegui salvar agora' };
}
