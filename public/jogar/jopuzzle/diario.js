// Desafio do dia, conta (apelido + código de 3 caracteres) e ranking do JoPuzzle.
// Fala com as funções do queres.games (/api/conta/* e /api/jopuzzle/*). Sem elas (por exemplo abrindo o
// index.html direto do disco) o botão do desafio fica escondido e o jogo funciona como sempre.
(() => {
'use strict';

const E = window.JoPuzzleEngine;
if (!E) return;

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
  voltar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  trocar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg>',
};
const botao = (rotulo, onclick, { icone, tipo = '', desligado = false } = {}) => {
  const b = h('button', { class: 'pn-btn ' + tipo, type: 'button', onclick, disabled: desligado });
  if (icone) b.insertAdjacentHTML('beforeend', ICONES[icone]);
  b.append(rotulo);
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
    botao('Ranking', () => abrirRanking(d.dia), { icone: 'rank' }),
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
function abrirLogin(aba = 'criar') {
  const abas = h('div', { class: 'pn-abas' },
    h('button', { class: 'pn-aba' + (aba === 'criar' ? ' on' : ''), type: 'button', onclick: () => abrirLogin('criar') }, 'Criar conta'),
    h('button', { class: 'pn-aba' + (aba === 'entrar' ? ' on' : ''), type: 'button', onclick: () => abrirLogin('entrar') }, 'Já tenho conta'));
  const voltar = h('div', { class: 'pn-linha' }, botao('Voltar ao jogo', fechar, { tipo: 'suave', icone: 'voltar' }));
  if (aba === 'criar') return abaCriar(abas, voltar);
  return abaEntrar(abas, voltar);
}

async function abaCriar(abas, voltar, aviso = '') {
  const erro = h('p', { class: 'pn-erro' }, aviso);
  mostrar(h('h2', { class: 'pn-titulo' }, 'Escolha seu apelido'), abas, h('p', { class: 'pn-sub' }, 'Carregando apelidos...'), voltar);
  const r = await api('/api/conta/sugestoes');
  if (r.status !== 200) return semConexao(() => abaCriar(abas, voltar));
  const chips = h('div', { class: 'pn-chips' }, r.dados.apelidos.map((nome) => h('button', {
    class: 'pn-chip', type: 'button', onclick: () => criar(nome, abas, voltar),
  }, nome)));
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Escolha seu apelido'),
    abas,
    h('p', { class: 'pn-sub' }, 'Toque em um apelido. Você recebe um código de 3 letras ou números para entrar de novo depois.'),
    h('div', { class: 'pn-linha' }, botao('Outros apelidos', () => abaCriar(abas, voltar), { icone: 'trocar' })),
    erro, chips,
    voltar,
  );
}

async function criar(apelido, abas, voltar) {
  carregando('Criando sua conta...');
  const r = await api('/api/conta/criar', { metodo: 'POST', corpo: { apelido } });
  if (r.status === 201) {
    eu = { apelido: r.dados.apelido };
    return mostrarCodigo(r.dados.apelido, r.dados.codigo, true);
  }
  const aviso = r.status === 409 ? 'Esse apelido acabou de ser escolhido. Escolha outro.'
    : r.status === 429 ? 'Muitas contas novas agora. Tente daqui a pouco.'
    : 'Não consegui criar a conta. Tente de novo.';
  if (r.status === 0) return semConexao(() => abaCriar(abas, voltar));
  abaCriar(abas, voltar, aviso);
}

function mostrarCodigo(apelido, codigo, novo) {
  mostrar(
    h('h2', { class: 'pn-titulo' }, novo ? 'Conta criada!' : 'Seu código'),
    h('p', { class: 'pn-sub' }, 'Você é ', h('span', { class: 'pn-apelido' }, apelido)),
    h('div', { class: 'pn-codigo' }, codigo),
    h('p', { class: 'pn-sub' }, 'Anote este código. Com o apelido e o código você entra em qualquer aparelho.'),
    h('div', { class: 'pn-linha' }, botao(novo ? 'Continuar' : 'Voltar', novo ? abrirDiario : abrirPerfil, { tipo: 'principal' })),
  );
}

async function abaEntrar(abas, voltar, aviso = '') {
  mostrar(h('h2', { class: 'pn-titulo' }, 'Entrar'), abas, h('p', { class: 'pn-sub' }, 'Carregando...'), voltar);
  const r = await api('/api/conta/apelidos');
  if (r.status !== 200) return semConexao(() => abaEntrar(abas, voltar));
  if (!r.dados.apelidos.length) {
    return mostrar(h('h2', { class: 'pn-titulo' }, 'Entrar'), abas, h('p', { class: 'pn-sub' }, 'Ainda não existe nenhuma conta. Crie a primeira!'), voltar);
  }
  const seletor = h('select', { id: 'f-apelido', name: 'apelido' }, r.dados.apelidos.map((a) => h('option', { value: a }, a)));
  const campo = h('input', { id: 'f-codigo', name: 'codigo', maxlength: '3', autocomplete: 'off', autocapitalize: 'characters', autocorrect: 'off', spellcheck: 'false', inputmode: 'text', 'aria-label': 'Código de 3 caracteres' });
  const erro = h('p', { class: 'pn-erro' }, aviso);
  const entrar = botao('Entrar', async () => {
    erro.textContent = '';
    if (campo.value.trim().length !== 3) { erro.textContent = 'O código tem 3 letras ou números.'; return; }
    const res = await api('/api/conta/entrar', { metodo: 'POST', corpo: { apelido: seletor.value, codigo: campo.value } });
    if (res.status === 200) { eu = { apelido: res.dados.apelido }; return abrirDiario(); }
    if (res.status === 429) {
      const min = Math.max(1, Math.ceil((res.dados.segundos || 1800) / 60));
      erro.textContent = `Muitas tentativas. Espere ${min} min e tente de novo.`;
    } else if (res.status === 401) {
      erro.textContent = res.dados.restantes ? `Apelido ou código incorreto. Mais ${res.dados.restantes} tentativas.` : 'Apelido ou código incorreto.';
    } else erro.textContent = 'Não consegui entrar. Confira a internet.';
  }, { tipo: 'principal' });
  campo.addEventListener('keydown', (e) => { if (e.key === 'Enter') entrar.click(); });
  mostrar(
    h('h2', { class: 'pn-titulo' }, 'Entrar'), abas,
    h('div', { class: 'pn-campo' }, h('label', { for: 'f-apelido' }, 'Seu apelido'), seletor),
    h('div', { class: 'pn-campo' }, h('label', { for: 'f-codigo' }, 'Seu código (3 letras ou números)'), campo),
    erro,
    h('div', { class: 'pn-linha' }, entrar),
    voltar,
  );
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

async function abrirRanking(dia) {
  carregando();
  const r = await api('/api/jopuzzle/ranking' + (dia ? `?dia=${dia}` : ''));
  if (r.status !== 200) return semConexao(() => abrirRanking(dia));
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
    h('h2', { class: 'pn-titulo' }, 'Ranking do dia'),
    h('p', { class: 'pn-sub' }, `${dd_mm(d.dia)} · ${d.total} ${d.total === 1 ? 'jogador' : 'jogadores'}`),
    itens.length ? h('ol', { class: 'pn-rank' }, itens) : h('p', { class: 'pn-sub' }, 'Ninguém terminou o desafio ainda. Seja o primeiro!'),
    h('div', { class: 'pn-linha' }, botao('Voltar', eu ? abrirDiario : fechar, { icone: 'voltar', tipo: 'suave' })),
  );
}

/* ---------- início ---------- */
const abrirOuEntrar = () => {
  if (E.emDiario()) return;
  if (eu) abrirDiario(); else abrirLogin();
};
botaoDia.addEventListener('click', abrirOuEntrar);
$('btn-diario2').addEventListener('click', abrirOuEntrar);

(async () => {
  const r = await api('/api/conta/me');
  if (r.status !== 200 || typeof r.dados.logado !== 'boolean') return; // sem servidor: o jogo segue normal
  botaoDia.hidden = false;
  $('btn-diario2').hidden = false;
  if (r.dados.logado) {
    eu = { apelido: r.dados.apelido };
    abrirDiario(); // quem já está logada vê o desafio assim que abre o jogo
  }
})();
})();
