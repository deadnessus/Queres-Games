// Conexão com o servidor online do queres.games (Etapa 4): o Worker do Fúria, em /online/invasao-estelar/.
// Só números passam pela sala (sem chat). O nome de cada piloto é o apelido da conta, que o servidor põe sozinho.
// No computador, para testar com o servidor local: ?online=ws://localhost:8787/online/invasao-estelar
// (só vale quando o jogo também está em localhost).
const CAMINHO = '/online/invasao-estelar';
const LOCAL = /^(localhost|127\.0\.0\.1)$/;
const TESTE = /^wss?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/online\/invasao-estelar\/?$/;
export const CODIGO_RE = /^[A-HJ-NP-Z2-9]{4}$/; // 4 letras e números, sem 0/O/1/I (o mesmo do servidor)

export function enderecos() {
  let ws = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}${CAMINHO}`;
  const teste = new URLSearchParams(location.search).get('online');
  if (teste && LOCAL.test(location.hostname) && TESTE.test(teste)) ws = teste.replace(/\/$/, '');
  return { ws, http: ws.replace(/^ws/, 'http') };
}

// O servidor online está no ar? (Enquanto não estiver, o jogo esconde os botões de jogar ao vivo.)
export async function onlineNoAr() {
  const ctrl = typeof AbortController === 'function' ? new AbortController() : null;
  const relogio = ctrl ? setTimeout(() => ctrl.abort(), 5000) : 0;
  try {
    const r = await fetch(`${enderecos().http}/saude`, { cache: 'no-store', credentials: 'omit', signal: ctrl ? ctrl.signal : undefined });
    if (!r.ok) return false;
    const j = await r.json();
    return Boolean(j && j.ok && j.banco);
  } catch (e) {
    return false; // sem conexão ou servidor fora do ar: o jogo só esconde o online
  } finally {
    clearTimeout(relogio);
  }
}

// Pede ao servidor um código novo de sala (precisa estar logado). { codigo } ou { erro }.
export async function codigoDeSala() {
  try {
    const r = await fetch(`${enderecos().http}/nova`, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/json' }, body: '{}' });
    let j = {};
    try { j = await r.json(); } catch (e) { /* resposta sem JSON */ }
    if (r.ok && j.codigo) return { codigo: j.codigo };
    return { erro: r.status === 401 ? 'entre na sua conta' : j.erro || 'não deu para criar a sala agora' };
  } catch (e) {
    return { erro: 'sem conexão com o servidor' };
  }
}

// Entra numa sala (ou cria, com `criar`). `aoReceber(msg)` recebe cada mensagem do servidor; `aoFechar(motivo)` é
// chamado uma vez quando a conexão acaba (motivo em texto simples, para mostrar na tela).
export function conectar({ codigo, criar = false, jogo = 'duelo', nave = 0, cor = 0 }, aoReceber, aoFechar) {
  const consulta = criar ? `?modo=criar&jogo=${jogo === 'esquadrao' ? 'esquadrao' : 'duelo'}` : '?modo=entrar';
  let fechado = false;
  let erro = null;
  let sock = null;
  const fechar = (motivo) => {
    if (fechado) return;
    fechado = true;
    aoFechar(motivo);
  };
  try {
    sock = new WebSocket(`${enderecos().ws}/sala/${codigo}${consulta}`);
  } catch (e) {
    setTimeout(() => fechar('sem conexão com o servidor'), 0);
    return { enviar() {}, sair() {} };
  }
  sock.addEventListener('open', () => sock.send(JSON.stringify({ t: 'join', d: [nave, cor] })));
  sock.addEventListener('message', (e) => {
    let m = null;
    try { m = JSON.parse(e.data); } catch (x) { return; }
    if (!m || typeof m.t !== 'string') return;
    if (m.t === 'erro') erro = m.msg;
    if (!fechado) aoReceber(m);
  });
  sock.addEventListener('close', (e) => {
    if (e.code === 4001) fechar('você entrou nesta sala em outra aba');
    else fechar(erro || 'a conexão caiu');
  });
  return {
    enviar(m) {
      if (!fechado && sock.readyState === 1) sock.send(JSON.stringify(m));
    },
    sair() {
      fechado = true;
      try { sock.close(1000, 'saiu'); } catch (e) { /* já fechada */ }
    },
  };
}
