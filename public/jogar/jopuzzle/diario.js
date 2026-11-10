// Desafio do dia, conta (apelido + código de 3 caracteres) e ranking do JoPuzzle.
// Fala com as funções do queres.games (/api/conta/* e /api/jopuzzle/*). Sem elas (por exemplo abrindo o
// index.html direto do disco) o botão do desafio fica escondido e o jogo funciona como sempre.
(() => {
'use strict';

const E = window.JoPuzzleEngine;
if (!E || !window.QGConta) return;

const $ = (id) => document.getElementById(id);
const painel = $('painel');
const botaoDia = $('mode-daily');
let eu = null; // { apelido } quando a pessoa está logada

/* ---------- utilidades ---------- */
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
    try { dados = await r.json(); } catch (e) { /* resposta sem JSON */ }
    return { status: r.status, dados: dados || {} };
  } catch (e) {
    return { status: 0, dados: {} };
  }
}

function h(tag, attrs = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v === true) n.setAttribute(k, '');
    else if (v !== false && v != null) n.setAttribute(k, v);
  }
  for (const f of filhos.flat()) if (f != null && f !== false) n.append(f instanceof Node ? f : document.createTextNode(f));
  return n;
}

const ICONES = {
  rank: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 13v4M8.5 20h7"/></svg>',
  pessoa: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>',
  prox: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  voltar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  trocar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
};
const botao = (rotulo, onclick, { icone, tipo = '', desligado = false, depois = false } = {}) => {
  const b = h('button', { class: 'pn-btn ' + tipo, type: 'button', onclick, disabled: desligado });
  if (icone && !depois) b.insertAdjacentHTML('beforeend', ICONES[icone]);
  b.append(rotulo);
  if (icone && depois) b.insertAdjacentHTML('beforeend', ICONES[icone]);
  return b;
};

const dd_mm = (dia) => `${dia.slice(8, 10)}/${dia.slice(5, 7)}`;
function tempoLongo(ms) {
  const d = Math.floor(ms / 100);
  const s = Math.floor(d / 10);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}.${d % 10}`;
}
const tempoCurto = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

function mostrar(...nos) {
  painel.replaceChildren(...nos);
  painel.scrollTop = 0;
  E.mostrar('painel');
}

// fecha o painel: no desafio já terminado volta ao jogo normal; senão só mostra a tela de fundo
function fechar() {
  if (E.emDiario()) E.sairDoDiario();
  else E.voltar();
  atualizarEntradas();
}

const carregando = (texto = 'Carregando...') => mostrar(h('p', { class: 'pn-sub' }, texto));

function semConexao(tentar) {
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Sem conexão'),
    h('p', { class: 'pn-sub' }, 'Não consegui falar com o servidor. Confira a internet e tente de novo.'),
    h('div', { class: 'pn-linha' }, botao('Tentar de novo', tentar, { icone: 'trocar' }), botao('Voltar ao jogo', fechar, { tipo: 'suave', icone: 'voltar' })),
  );
}

/* ---------- desafio do dia ---------- */
async function abrirDiario() {
  carregando();
  const r = await api('/api/jopuzzle/desafio');
  if (r.status === 401) { eu = null; return abrirLogin(); }
  if (r.status !== 200) return semConexao(abrirDiario);
  const d = r.dados;
  eu = { apelido: d.apelido };

  const topo = [
    h('h2', { class: 'pn-titulo' }, 'Desafio do dia'),
    h('p', { class: 'pn-sub' }, `${dd_mm(d.dia)} · `, h('span', { class: 'pn-apelido' }, d.apelido)),
  ];
  const rodape = h('div', { class: 'pn-linha' },
    botao('Ranking', () => abrirRanking('dia', d.dia), { icone: 'rank' }),
    botao('Perfil', abrirPerfil, { icone: 'pessoa', tipo: 'suave' }),
    botao('Voltar ao jogo', fechar, { icone: 'voltar', tipo: 'suave' }),
  );

  if (d.estado === 'novo') {
    mostrar(...topo,
      h('p', { class: 'pn-sub' }, '5 peças, todas diferentes. Você tem 10 minutos e uma única tentativa por dia. Depois que começar, o relógio não para.'),
      h('div', { class: 'pn-linha' }, botao('Jogar', comecar, { tipo: 'principal' })),
      rodape);
  } else if (d.estado === 'jogando' && d.restanteMs > 0) {
    mostrar(...topo,
      h('p', { class: 'pn-sub' }, 'Você já começou. O relógio não parou:'),
      h('div', { class: 'pn-grande' }, tempoCurto(d.restanteMs)),
      h('div', { class: 'pn-linha' }, botao('Continuar', comecar, { tipo: 'principal' })),
      rodape);
  } else if (d.estado === 'concluido') {
    mostrar(...topo,
      h('p', { class: 'pn-sub' }, 'Seu tempo'),
      h('div', { class: 'pn-grande' }, tempoLongo(d.tempoMs)),
      h('p', { class: 'pn-sub' }, `${d.posicao}º de ${d.total} ${d.total === 1 ? 'jogador' : 'jogadores'} hoje. Volte amanhã para um novo desafio!`),
      rodape);
  } else {
    mostrar(...topo,
      h('p', { class: 'pn-sub' }, 'O tempo de hoje acabou. Volte amanhã para um novo desafio!'),
      rodape);
  }
}

async function comecar() {
  carregando('Começando...');
  const r = await api('/api/jopuzzle/iniciar', { metodo: 'POST', corpo: {} });
  if (r.status === 401) { eu = null; return abrirLogin(); }
  if (r.status !== 200) return semConexao(comecar);
  const d = r.dados;
  if (d.estado === 'jogando' && d.tabuleiro) E.iniciarDiario(d.tabuleiro, d.restanteMs, d.dia);
  else abrirDiario();
}

// Todas as peças encaixadas: o servidor confere a solução e guarda o tempo.
E.aoConcluir = async function enviar(colocacoes) {
  mostrar(h('p', { class: 'pn-sub' }, 'Conferindo...'));
  const r = await api('/api/jopuzzle/enviar', { metodo: 'POST', corpo: { colocacoes } });
  if (r.status === 200 || r.status === 409 || r.status === 410) return abrirDiario();
  const msg = r.status === 0 ? 'Sem conexão. Seu relógio continua correndo: tente enviar de novo.'
    : r.status === 401 ? 'Você saiu da conta. Entre de novo para enviar.'
    : 'O servidor não aceitou essa solução. Confira as peças e tente de novo.';
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Não deu certo'),
    h('p', { class: 'pn-sub' }, msg),
    h('div', { class: 'pn-linha' },
      botao('Enviar de novo', () => enviar(colocacoes), { icone: 'trocar' }),
      botao('Voltar às peças', () => E.retomar(), { tipo: 'suave', icone: 'voltar' })),
  );
};

E.aoEsgotar = () => abrirDiario();

/* ---------- conta ---------- */
// O fluxo de criar conta / entrar é o mesmo de todos os jogos do queres.games (conta.js).
function abrirLogin(aba) {
  QGConta.montar(painel, {
    aba,
    rotuloFechar: 'Voltar ao jogo',
    aoConcluir: (r) => { eu = { apelido: r.apelido }; abrirDiario(); },
    aoFechar: fechar,
  });
  painel.scrollTop = 0;
  E.mostrar('painel');
}

async function abrirPerfil() {
  carregando();
  const r = await api('/api/conta/codigo');
  if (r.status === 401) { eu = null; return abrirLogin(); }
  if (r.status !== 200) return semConexao(abrirPerfil);
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Seu perfil'),
    h('p', { class: 'pn-sub' }, 'Você é ', h('span', { class: 'pn-apelido' }, r.dados.apelido)),
    h('p', { class: 'pn-sub' }, 'Seu código:'),
    h('div', { class: 'pn-codigo' }, r.dados.codigo),
    h('div', { class: 'pn-linha' },
      botao('Voltar', abrirDiario, { icone: 'voltar', tipo: 'suave' }),
      botao('Sair da conta', async () => {
        await api('/api/conta/sair', { metodo: 'POST', corpo: {} });
        eu = null;
        fechar();
      }, { tipo: 'rosa' })),
  );
}

function abasDoRanking(aba) {
  return h('div', { class: 'pn-abas' },
    h('button', { class: 'pn-aba' + (aba === 'dia' ? ' on' : ''), type: 'button', onclick: () => abrirRanking('dia') }, 'Do dia'),
    h('button', { class: 'pn-aba' + (aba === 'mes' ? ' on' : ''), type: 'button', onclick: () => abrirRanking('mes') }, 'Do mês'));
}

// aba 'dia': ref = AAAA-MM-DD (padrão: hoje). aba 'mes': ref = AAAA-MM (padrão: este mês).
async function abrirRanking(aba = 'dia', ref) {
  if (aba === 'mes') return rankingMensal(ref);
  carregando();
  const r = await api('/api/jopuzzle/ranking' + (ref ? `?dia=${ref}` : ''));
  if (r.status !== 200) return semConexao(() => abrirRanking('dia', ref));
  const d = r.dados;
  const linha = (pos, nome, ms, extra = '') => h('li', { class: extra },
    h('span', { class: 'pos' }, pos + 'º'), h('span', {}, nome), h('span', { class: 'tempo' }, tempoLongo(ms)));
  const itens = d.top.map((x) => linha(x.posicao, x.apelido, x.tempoMs,
    (eu && x.apelido === eu.apelido ? 'eu ' : '') + (x.posicao === 1 ? 'ouro' : '')));
  if (d.eu && !d.top.some((x) => x.apelido === d.eu.apelido)) {
    itens.push(h('li', { class: 'sep' }, h('span'), h('span', {}, '...'), h('span')));
    itens.push(linha(d.eu.posicao, d.eu.apelido, d.eu.tempoMs, 'eu'));
  }
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Ranking'),
    abasDoRanking('dia'),
    h('p', { class: 'pn-sub' }, `Hoje, ${dd_mm(d.dia)} · ${d.total} ${d.total === 1 ? 'jogador' : 'jogadores'}`),
    itens.length ? h('ol', { class: 'pn-rank' }, itens) : h('p', { class: 'pn-sub' }, 'Ninguém terminou o desafio ainda. Seja o primeiro!'),
    h('div', { class: 'pn-linha' }, botao('Voltar', eu ? abrirDiario : fechar, { icone: 'voltar', tipo: 'suave' })),
  );
}

const nomeDoMes = (m) => {
  const [a, n] = m.split('-').map(Number);
  const t = new Date(Date.UTC(a, n - 1, 1)).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return t.charAt(0).toUpperCase() + t.slice(1);
};
const somarMeses = (m, k) => {
  const [a, n] = m.split('-').map(Number);
  const x = new Date(Date.UTC(a, n - 1 + k, 1));
  return `${x.getUTCFullYear()}-${String(x.getUTCMonth() + 1).padStart(2, '0')}`;
};

// Ranking do mês: soma dos pontos de cada dia (a posição no dia vale pontos).
async function rankingMensal(mes) {
  carregando();
  const r = await api('/api/jopuzzle/ranking-mensal' + (mes ? `?mes=${mes}` : ''));
  if (r.status !== 200) return semConexao(() => abrirRanking('mes', mes));
  const d = r.dados;
  const linha = (x, extra = '') => h('li', { class: extra },
    h('span', { class: 'pos' }, x.posicao + 'º'),
    h('span', {}, x.apelido, h('small', { class: 'dias' }, `${x.dias} ${x.dias === 1 ? 'dia' : 'dias'} · ${x.vitorias} ${x.vitorias === 1 ? 'vitória' : 'vitórias'}`)),
    h('span', { class: 'tempo' }, `${x.pontos} pts`));
  const itens = d.top.map((x) => linha(x, (eu && x.apelido === eu.apelido ? 'eu ' : '') + (x.posicao === 1 ? 'ouro' : '')));
  if (d.eu && !d.top.some((x) => x.apelido === d.eu.apelido)) {
    itens.push(h('li', { class: 'sep' }, h('span'), h('span', {}, '...'), h('span')));
    itens.push(linha(d.eu, 'eu'));
  }
  const anterior = somarMeses(d.mes, -1);
  const seguinte = somarMeses(d.mes, 1);
  const pontos = d.pontosPorPosicao.map((p, i) => `${i + 1}º ${p}`).join(', ');
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Ranking'),
    abasDoRanking('mes'),
    h('p', { class: 'pn-sub' }, `${nomeDoMes(d.mes)} · ${d.total} ${d.total === 1 ? 'jogador' : 'jogadores'}`),
    h('div', { class: 'pn-linha junta' },
      botao('Anterior', () => abrirRanking('mes', anterior), { icone: 'voltar', tipo: 'suave compacto', desligado: d.mes <= somarMeses(d.mesAtual, -12) }),
      botao('Próximo', () => abrirRanking('mes', seguinte), { icone: 'prox', depois: true, tipo: 'suave compacto', desligado: d.mes >= d.mesAtual })),
    itens.length ? h('ol', { class: 'pn-rank' }, itens) : h('p', { class: 'pn-sub' }, 'Ninguém terminou o desafio neste mês.'),
    h('p', { class: 'pn-sub pequeno' }, `Cada dia vale pontos pela posição: ${pontos}, e os demais ${d.pontosParticipacao}. Empate: mais vitórias, mais dias, menor tempo total.`),
    h('div', { class: 'pn-linha' }, botao('Voltar', eu ? abrirDiario : fechar, { icone: 'voltar', tipo: 'suave' })),
  );
}

/* ---------- entradas na tela inicial (texto do desafio + prévia do ranking) ---------- */
const statusEl = $('desafio-status');
const top3El = $('top3');

function textoDoDesafio(r) {
  if (r.status === 401) return 'Entre para jogar o desafio do dia.';
  if (r.status !== 200) return '';
  const d = r.dados;
  if (d.estado === 'novo') return 'Desafio de hoje: ainda não jogado.';
  if (d.estado === 'jogando') return d.restanteMs > 0 ? `Desafio em andamento: faltam ${tempoCurto(d.restanteMs)}.` : 'Desafio de hoje: o tempo acabou.';
  if (d.estado === 'concluido') return `Desafio de hoje: ${tempoLongo(d.tempoMs)} · ${d.posicao}º de ${d.total}.`;
  return 'Desafio de hoje: o tempo acabou.';
}

function desenharTop3(r) {
  const itens = r.status === 200 ? r.dados.top.slice(0, 3) : [];
  top3El.replaceChildren(...(itens.length
    ? itens.map((x) => h('li', {}, h('span', {}, `${x.posicao}º ${x.apelido}`), h('span', { class: 'tempo' }, tempoLongo(x.tempoMs))))
    : [h('li', {}, h('span', {}, 'Ninguém terminou o desafio ainda.'))]));
}

async function atualizarEntradas() {
  const [dia, rank] = await Promise.all([api('/api/jopuzzle/desafio'), api('/api/jopuzzle/ranking')]);
  statusEl.textContent = textoDoDesafio(dia);
  desenharTop3(rank);
}

/* ---------- início ---------- */
const abrirOuEntrar = () => {
  if (E.emDiario()) return;
  if (eu) abrirDiario(); else abrirLogin();
};
botaoDia.addEventListener('click', abrirOuEntrar);
$('btn-desafio').addEventListener('click', abrirOuEntrar);
$('btn-ranking').addEventListener('click', () => abrirRanking());

(async () => {
  const r = await api('/api/conta/me');
  if (r.status !== 200 || typeof r.dados.logado !== 'boolean') return; // sem servidor: o jogo segue normal
  botaoDia.hidden = false;
  $('entradas').hidden = false;
  atualizarEntradas();
  if (r.dados.logado) {
    eu = { apelido: r.dados.apelido };
    abrirDiario(); // quem já está logada vê o desafio assim que abre o jogo
  }
})();
})();
