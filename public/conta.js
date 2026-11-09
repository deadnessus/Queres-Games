/* Conta do queres.games: o MESMO login em todos os jogos.
 *
 *   <script src="/conta.js?v=2"></script>
 *
 *   const eu = await QGConta.me();           // { logado: true, apelido } | { logado: false } | null (sem servidor de contas)
 *   const r  = await QGConta.entrar();       // janela completa de criar conta / entrar. { apelido } ou null se fechou
 *   QGConta.montar(elemento, { aoConcluir, aoFechar, aba, rotuloFechar });   // o mesmo fluxo dentro de uma tela do próprio jogo
 *   await QGConta.perfil();                  // apelido, código e "Sair da conta"
 *   await QGConta.sair();
 *   QGConta.aoMudar((eu) => ...);            // depois de criar conta, entrar ou sair
 *
 * Experiência (não mude por jogo; veja SKILL.md):
 *   Criar conta  -> 20 apelidos sugeridos -> CONFIRMAR o apelido -> "Conta criada!" com o código -> "Anotei meu código"
 *   Já tenho conta -> 3 rodas (animal, qualidade, número com "vazio" como padrão) -> código de 3 caracteres -> Entrar
 *
 * Uma conta é um apelido gerado ("Lobo Azul") e um código de 3 caracteres. Sem nome, e-mail nem IP.
 * O cookie de sessão vale no site todo. Cores: variáveis --qgc-* no :root do jogo.
 * Guia completo: skill login-queres-games (.claude/skills/ deste repositório). Troque o ?v= nos jogos quando mudar este arquivo.
 */
(() => {
'use strict';
if (window.QGConta) return;

const ALT = 40; // altura de cada item das rodas (px); a roda mostra 5 itens
const LS_ULTIMO = 'qg_ultimo_apelido'; // só o apelido, para a roda já começar nele neste aparelho

const CSS = `
.qgc-fundo{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box;
  background:rgba(8,10,28,.88);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font-family:var(--qgc-fonte,system-ui,-apple-system,"Segoe UI",sans-serif);color:var(--qgc-texto,#fff)}
.qgc-caixa{width:min(100%,420px);max-height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;padding:22px 18px 24px;border-radius:22px;
  background:var(--qgc-fundo,#10153a);border:2px solid var(--qgc-borda,rgba(255,255,255,.18));display:flex;flex-direction:column;gap:14px;
  -webkit-user-select:text;user-select:text;touch-action:pan-y}
.qgc-caixa *{box-sizing:border-box}
.qgc-embutida{width:100%;max-height:none;overflow:visible;padding:0;background:none;border:0;border-radius:0}
.qgc-caixa h2{margin:0;text-align:center;font-size:26px;line-height:1.15}
.qgc-sub{margin:0;text-align:center;color:rgba(255,255,255,.72);font-size:16px;line-height:1.35}
.qgc-erro{margin:0;text-align:center;color:var(--qgc-rosa,#ff4da6);font-size:16px;min-height:1.2em}
.qgc-linha{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.qgc-btn{min-height:48px;padding:0 20px;border-radius:14px;font:inherit;font-size:18px;font-weight:700;cursor:pointer;-webkit-user-select:none;user-select:none;
  border:2px solid var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.12);color:var(--qgc-acento,#3ee6d0)}
.qgc-btn.principal{border-color:var(--qgc-destaque,#ffd93d);background:rgba(255,217,61,.12);color:var(--qgc-destaque,#ffd93d)}
.qgc-btn.suave{border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.06);color:rgba(255,255,255,.85)}
.qgc-btn.rosa{border-color:var(--qgc-rosa,#ff4da6);background:rgba(255,77,166,.1);color:var(--qgc-rosa,#ff4da6)}
.qgc-btn:disabled{opacity:.4;cursor:default}
.qgc-btn:active:not(:disabled){transform:scale(.97)}
.qgc-abas{display:flex;gap:8px;justify-content:center}
.qgc-aba{min-height:42px;padding:0 16px;border-radius:12px;font:inherit;font-size:16px;font-weight:700;cursor:pointer;border:2px solid rgba(255,255,255,.25);background:transparent;color:rgba(255,255,255,.7)}
.qgc-aba.on{border-color:var(--qgc-acento,#3ee6d0);color:var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.12)}
.qgc-chips{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.qgc-chip{min-height:42px;padding:0 6px;border-radius:12px;font:inherit;font-size:16px;cursor:pointer;border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.05);color:#fff}
.qgc-chip:active{border-color:var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.18)}
.qgc-grande{font-size:34px;line-height:1.15;text-align:center;font-weight:800;color:var(--qgc-destaque,#ffd93d);overflow-wrap:anywhere}
.qgc-ok{width:64px;height:64px;margin:0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--qgc-acento,#3ee6d0);border:3px solid var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.12)}
.qgc-ok svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
.qgc-codigo{font-size:64px;line-height:1.1;letter-spacing:.12em;text-align:center;padding-left:.12em;color:var(--qgc-destaque,#ffd93d);font-weight:800}
.qgc-apelido{color:var(--qgc-destaque,#ffd93d);font-weight:700}
.qgc-campo{display:flex;flex-direction:column;gap:6px}
.qgc-campo label{font-size:15px;color:rgba(255,255,255,.7)}
.qgc-campo input{width:100%;min-height:50px;border-radius:12px;border:2px solid rgba(255,255,255,.28);background:rgba(255,255,255,.07);color:#fff;font:inherit;
  font-size:28px;padding:0 12px;text-align:center;letter-spacing:.5em;text-transform:uppercase}
.qgc-campo input:focus{outline:none;border-color:var(--qgc-acento,#3ee6d0)}
/* rodas (estilo "picker view" do iOS) */
.qgc-rodas{position:relative;display:grid;grid-template-columns:1.2fr 1.15fr .85fr;gap:6px}
.qgc-rodas::before{content:"";position:absolute;left:0;right:0;top:102px;height:40px;border-radius:12px;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.2);pointer-events:none}
.qgc-col{position:relative;min-width:0}
.qgc-rotulo{height:22px;line-height:22px;text-align:center;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.qgc-roda{position:relative;height:200px;overflow-y:scroll;scroll-snap-type:y mandatory;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;touch-action:pan-y;
  scrollbar-width:none;padding:80px 0;outline:none;
  -webkit-mask-image:linear-gradient(to bottom,transparent,#000 28%,#000 72%,transparent);mask-image:linear-gradient(to bottom,transparent,#000 28%,#000 72%,transparent)}
.qgc-roda::-webkit-scrollbar{display:none}
.qgc-roda:focus-visible{box-shadow:0 0 0 2px var(--qgc-acento,#3ee6d0);border-radius:10px}
.qgc-item{height:40px;line-height:40px;padding:0 4px;text-align:center;scroll-snap-align:center;font-size:19px;color:rgba(255,255,255,.42);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;-webkit-user-select:none;user-select:none}
.qgc-item.sel{color:#fff;font-weight:700}
.qgc-item.vazio{font-style:italic}
.qgc-estado{margin:0;text-align:center;font-size:16px;min-height:1.3em}
.qgc-estado.ok{color:var(--qgc-acento,#3ee6d0)}
.qgc-estado.nao{color:var(--qgc-rosa,#ff4da6)}
`;

const FRASES = { rede: 'Não consegui falar com o servidor. Confira a internet e tente de novo.' };
const ouvintes = [];
let fundo = null;

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
const btn = (texto, onclick, tipo = '') => h('button', { class: 'qgc-btn ' + tipo, type: 'button', onclick }, texto);
const avisar = (eu) => ouvintes.forEach((f) => { try { f(eu); } catch (e) { /* ouvinte do jogo falhou */ } });

function lerUltimo() { try { return localStorage.getItem(LS_ULTIMO) || ''; } catch (e) { return ''; } }
function guardarUltimo(apelido) { try { localStorage.setItem(LS_ULTIMO, apelido); } catch (e) { /* sem armazenamento */ } }

// "Lobo Azul 7" -> { animal: 'Lobo', qual: 'Azul', num: '7' }
function partir(apelido) {
  const m = /^(\S+) (\S+?)(?: (\d{1,3}))?$/.exec(apelido || '');
  return m ? { animal: m[1], qual: m[2], num: m[3] || '' } : null;
}

/* ---------- roda (picker view) ---------- */
function roda(rotulo, itens, indiceInicial, aoMudar) {
  const lista = h('div', { class: 'qgc-roda', role: 'listbox', 'aria-label': rotulo, tabindex: '0' });
  let atual = -1;
  let espera = 0;
  const ir = (i, suave) => lista.scrollTo({ top: i * ALT, behavior: suave ? 'smooth' : 'auto' });
  itens.forEach((it, i) => lista.append(h('div', { class: 'qgc-item' + (it.vazio ? ' vazio' : ''), role: 'option', onclick: () => ir(i, true) }, it.texto)));
  const marcar = () => {
    const i = Math.max(0, Math.min(itens.length - 1, Math.round(lista.scrollTop / ALT)));
    if (i !== atual) {
      atual = i;
      [...lista.children].forEach((c, k) => { c.classList.toggle('sel', k === i); c.setAttribute('aria-selected', String(k === i)); });
    }
  };
  lista.addEventListener('scroll', () => {
    marcar();
    clearTimeout(espera);
    espera = setTimeout(aoMudar, 50);
  });
  lista.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    ir(Math.max(0, Math.min(itens.length - 1, atual + (e.key === 'ArrowDown' ? 1 : -1))), true);
  });
  return {
    el: h('div', { class: 'qgc-col' }, h('div', { class: 'qgc-rotulo' }, rotulo), lista),
    iniciar() { ir(indiceInicial, false); marcar(); }, // chamar depois que a roda entrou na tela
    valor: () => itens[Math.max(0, atual)].valor,
  };
}

/* ---------- janela e fluxo ---------- */
function injetarCSS() {
  if (!document.getElementById('qgc-css')) document.head.append(h('style', { id: 'qgc-css' }, CSS));
}
const tela = (caixa, ...nos) => { caixa.replaceChildren(...nos); caixa.scrollTop = 0; };

// O fluxo todo. Mesmas telas e mesmos textos em todos os jogos.
function fluxo(caixa, { terminar, cancelar, rotuloFechar = 'Fechar', aba = 'criar' }) {
  const fechar = () => btn(rotuloFechar, cancelar, 'suave');
  const abas = (qual) => h('div', { class: 'qgc-abas' },
    h('button', { class: 'qgc-aba' + (qual === 'criar' ? ' on' : ''), type: 'button', onclick: () => telaCriar() }, 'Criar conta'),
    h('button', { class: 'qgc-aba' + (qual === 'entrar' ? ' on' : ''), type: 'button', onclick: () => telaEntrar() }, 'Já tenho conta'));
  const rede = (tentar) => tela(caixa,
    h('h2', {}, 'Sem conexão'), h('p', { class: 'qgc-sub' }, FRASES.rede),
    h('div', { class: 'qgc-linha' }, btn('Tentar de novo', tentar), fechar()));

  // 1) criar conta: escolher o apelido
  async function telaCriar(aviso = '') {
    tela(caixa, h('h2', {}, 'Escolha seu apelido'), abas('criar'), h('p', { class: 'qgc-sub' }, 'Carregando...'), h('div', { class: 'qgc-linha' }, fechar()));
    const r = await api('/api/conta/sugestoes');
    if (r.status !== 200) return rede(() => telaCriar());
    tela(caixa,
      h('h2', {}, 'Escolha seu apelido'), abas('criar'),
      h('p', { class: 'qgc-sub' }, 'Toque em um apelido para escolher. Você ainda vai confirmar.'),
      h('div', { class: 'qgc-linha' }, btn('Outros apelidos', () => telaCriar())),
      h('p', { class: 'qgc-erro' }, aviso),
      h('div', { class: 'qgc-chips' }, r.dados.apelidos.map((nome) => h('button', { class: 'qgc-chip', type: 'button', onclick: () => telaConfirmar(nome) }, nome))),
      h('div', { class: 'qgc-linha' }, fechar()));
  }

  // 2) confirmar: a conta só é criada depois daqui
  function telaConfirmar(apelido) {
    tela(caixa,
      h('h2', {}, 'Confirmar apelido'),
      h('div', { class: 'qgc-grande' }, apelido),
      h('p', { class: 'qgc-sub' }, 'Você vai aparecer assim no ranking de todos os jogos do queres.games. Depois não dá para trocar.'),
      h('div', { class: 'qgc-linha' }, btn('Confirmar', () => criarConta(apelido), 'principal'), btn('Escolher outro', () => telaCriar(), 'suave')));
  }

  async function criarConta(apelido) {
    tela(caixa, h('p', { class: 'qgc-sub' }, 'Criando sua conta...'));
    const r = await api('/api/conta/criar', { metodo: 'POST', corpo: { apelido } });
    if (r.status === 0) return rede(() => criarConta(apelido));
    if (r.status !== 201) {
      return telaCriar(r.status === 409 ? 'Esse apelido acabou de ser escolhido. Escolha outro.'
        : r.status === 429 ? 'Muitas contas novas agora. Tente daqui a pouco.' : 'Não consegui criar a conta. Tente de novo.');
    }
    guardarUltimo(r.dados.apelido);
    avisar({ logado: true, apelido: r.dados.apelido });
    telaCodigo(r.dados.apelido, r.dados.codigo);
  }

  // 3) confirmação de que a conta foi criada
  function telaCodigo(apelido, codigo) {
    const ok = h('div', { class: 'qgc-ok', 'aria-hidden': 'true' });
    ok.innerHTML = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
    tela(caixa,
      ok,
      h('h2', {}, 'Conta criada!'),
      h('p', { class: 'qgc-sub' }, 'Bem-vindo, ', h('span', { class: 'qgc-apelido' }, apelido), '!'),
      h('div', { class: 'qgc-codigo' }, codigo),
      h('p', { class: 'qgc-sub' }, 'Anote este código. Com o apelido e o código você entra em qualquer aparelho.'),
      h('div', { class: 'qgc-linha' }, btn('Anotei meu código', () => terminar({ apelido }), 'principal')));
  }

  // 4) já tenho conta: três rodas ajudam a lembrar o apelido
  async function telaEntrar() {
    tela(caixa, h('h2', {}, 'Entrar'), abas('entrar'), h('p', { class: 'qgc-sub' }, 'Carregando...'), h('div', { class: 'qgc-linha' }, fechar()));
    const r = await api('/api/conta/apelidos');
    if (r.status !== 200) return rede(() => telaEntrar());
    const existentes = r.dados.apelidos;
    if (!existentes.length) {
      return tela(caixa, h('h2', {}, 'Entrar'), abas('entrar'), h('p', { class: 'qgc-sub' }, 'Ainda não existe nenhuma conta. Crie a primeira!'), h('div', { class: 'qgc-linha' }, fechar()));
    }
    const conjunto = new Set(existentes);
    const partes = existentes.map(partir).filter(Boolean);
    const unicos = (lista) => [...new Set(lista)];
    const animais = unicos(partes.map((p) => p.animal)).sort((a, b) => a.localeCompare(b, 'pt'));
    const qualidades = unicos(partes.map((p) => p.qual)).sort((a, b) => a.localeCompare(b, 'pt'));
    const numeros = unicos(partes.map((p) => p.num).filter(Boolean)).sort((a, b) => a - b);
    const ultimo = partir(lerUltimo());
    const pos = (lista, v) => Math.max(0, lista.indexOf(v));

    const previa = h('div', { class: 'qgc-grande' });
    const estado = h('p', { class: 'qgc-estado' });
    const erro = h('p', { class: 'qgc-erro' });
    const campo = h('input', { id: 'qgc-codigo', maxlength: '3', autocomplete: 'off', autocapitalize: 'characters', autocorrect: 'off', spellcheck: 'false', 'aria-label': 'Código de 3 caracteres' });
    const entrarBtn = btn('Entrar', enviar, 'principal');
    const rodaAnimal = roda('Animal', animais.map((a) => ({ valor: a, texto: a })), pos(animais, ultimo && ultimo.animal), atualizar);
    const rodaQual = roda('Qualidade', qualidades.map((q) => ({ valor: q, texto: q })), pos(qualidades, ultimo && ultimo.qual), atualizar);
    const rodaNum = roda('Número', [{ valor: '', texto: 'vazio', vazio: true }, ...numeros.map((n) => ({ valor: n, texto: n }))],
      ultimo && ultimo.num ? 1 + pos(numeros, ultimo.num) : 0, atualizar);
    const nome = () => `${rodaAnimal.valor()} ${rodaQual.valor()}${rodaNum.valor() ? ' ' + rodaNum.valor() : ''}`;

    function atualizar() {
      const n = nome();
      const existe = conjunto.has(n);
      previa.textContent = n;
      estado.textContent = existe ? 'Conta encontrada' : 'Essa conta não existe. Mexa nas rodas.';
      estado.className = 'qgc-estado ' + (existe ? 'ok' : 'nao');
      entrarBtn.disabled = !existe;
    }
    async function enviar() {
      erro.textContent = '';
      if (campo.value.trim().length !== 3) { erro.textContent = 'O código tem 3 letras ou números.'; return; }
      const apelido = nome();
      const res = await api('/api/conta/entrar', { metodo: 'POST', corpo: { apelido, codigo: campo.value } });
      if (res.status === 200) {
        guardarUltimo(res.dados.apelido);
        avisar({ logado: true, apelido: res.dados.apelido });
        return terminar({ apelido: res.dados.apelido });
      }
      if (res.status === 429) erro.textContent = `Muitas tentativas. Espere ${Math.max(1, Math.ceil((res.dados.segundos || 1800) / 60))} min e tente de novo.`;
      else if (res.status === 401) erro.textContent = res.dados.restantes ? `Apelido ou código incorreto. Mais ${res.dados.restantes} tentativas.` : 'Apelido ou código incorreto.';
      else erro.textContent = 'Não consegui entrar. Confira a internet.';
    }
    campo.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !entrarBtn.disabled) entrarBtn.click(); });

    tela(caixa,
      h('h2', {}, 'Entrar'), abas('entrar'),
      h('p', { class: 'qgc-sub' }, 'Gire as rodas até achar o seu apelido.'),
      h('div', { class: 'qgc-rodas' }, rodaAnimal.el, rodaQual.el, rodaNum.el),
      previa, estado,
      h('div', { class: 'qgc-campo' }, h('label', { for: 'qgc-codigo' }, 'Seu código (3 letras ou números)'), campo),
      erro,
      h('div', { class: 'qgc-linha' }, entrarBtn),
      h('div', { class: 'qgc-linha' }, fechar()));
    requestAnimationFrame(() => { rodaAnimal.iniciar(); rodaQual.iniciar(); rodaNum.iniciar(); atualizar(); });
  }

  if (aba === 'entrar') telaEntrar(); else telaCriar();
}

function abrirJanela() {
  injetarCSS();
  if (fundo) fundo.remove();
  const caixa = h('div', { class: 'qgc-caixa', role: 'dialog', 'aria-modal': 'true' });
  fundo = h('div', { class: 'qgc-fundo' }, caixa);
  // jogos que travam o arrasto da página (touchmove) não podem travar a rolagem das rodas
  fundo.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
  document.body.append(fundo);
  return caixa;
}
function fecharJanela() { if (fundo) { fundo.remove(); fundo = null; } }

/* ---------- API pública ---------- */
async function me() {
  const r = await api('/api/conta/me');
  if (r.status !== 200 || typeof r.dados.logado !== 'boolean') return null; // sem servidor de contas
  return r.dados.logado ? { logado: true, apelido: r.dados.apelido } : { logado: false };
}

// Janela completa. Resolve com { apelido } ou null (se a pessoa fechar).
function entrar(opcoes = {}) {
  return new Promise((resolver) => {
    const caixa = abrirJanela();
    const terminar = (resultado) => { fecharJanela(); resolver(resultado); };
    fluxo(caixa, { terminar, cancelar: () => terminar(null), rotuloFechar: opcoes.rotuloFechar || 'Fechar', aba: opcoes.aba });
  });
}

// O mesmo fluxo dentro de um elemento do jogo (sem janela própria).
function montar(elemento, { aoConcluir, aoFechar, aba, rotuloFechar } = {}) {
  injetarCSS();
  const caixa = h('div', { class: 'qgc-caixa qgc-embutida' });
  elemento.replaceChildren(caixa);
  fluxo(caixa, {
    terminar: (r) => { if (aoConcluir) aoConcluir(r); },
    cancelar: () => { if (aoFechar) aoFechar(); },
    rotuloFechar: rotuloFechar || 'Fechar',
    aba,
  });
}

// Apelido, código e "Sair da conta". Resolve quando a janela fecha.
function perfil() {
  return new Promise((resolver) => {
    const caixa = abrirJanela();
    const fim = () => { fecharJanela(); resolver(); };
    tela(caixa, h('p', { class: 'qgc-sub' }, 'Carregando...'));
    api('/api/conta/codigo').then(async (r) => {
      if (r.status === 401) { fecharJanela(); return resolver(); }
      if (r.status !== 200) {
        return tela(caixa, h('h2', {}, 'Sem conexão'), h('p', { class: 'qgc-sub' }, FRASES.rede), h('div', { class: 'qgc-linha' }, btn('Fechar', fim, 'suave')));
      }
      tela(caixa,
        h('h2', {}, 'Seu perfil'),
        h('p', { class: 'qgc-sub' }, 'Você é ', h('span', { class: 'qgc-apelido' }, r.dados.apelido)),
        h('p', { class: 'qgc-sub' }, 'Seu código:'),
        h('div', { class: 'qgc-codigo' }, r.dados.codigo),
        h('div', { class: 'qgc-linha' },
          btn('Fechar', fim, 'suave'),
          btn('Sair da conta', async () => { await sair(); fim(); }, 'rosa')));
    });
  });
}

async function sair() {
  await api('/api/conta/sair', { metodo: 'POST', corpo: {} });
  avisar({ logado: false });
}

window.QGConta = { me, entrar, montar, perfil, sair, aoMudar: (f) => { if (typeof f === 'function') ouvintes.push(f); } };
})();
