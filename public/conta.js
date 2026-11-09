/* Conta do queres.games, pronta para qualquer jogo.
 *
 *   <script src="/conta.js?v=1"></script>
 *
 *   const eu = await QGConta.me();            // { logado: true, apelido } | { logado: false } | null (sem servidor)
 *   const r  = await QGConta.entrar();        // abre "criar conta / já tenho conta"; devolve { apelido } ou null se fechou
 *   await QGConta.perfil();                   // mostra o apelido, o código e o botão "Sair da conta"
 *   await QGConta.sair();
 *   QGConta.aoMudar((eu) => ...);             // chamado depois de entrar ou sair
 *
 * Uma conta é um apelido gerado ("Lobo Azul") e um código de 3 caracteres. Sem nome, e-mail nem IP.
 * O cookie de sessão vale no site todo, então o login é o mesmo em todos os jogos.
 * Cores: mude as variáveis --qgc-* no :root do jogo se quiser combinar com o visual dele.
 * Guia completo: .claude/skills/login-queres-games/SKILL.md no repositório do site.
 */
(() => {
'use strict';
if (window.QGConta) return;

const CSS = `
.qgc-fundo{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box;
  background:rgba(8,10,28,.88);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);font-family:var(--qgc-fonte,system-ui,-apple-system,"Segoe UI",sans-serif);color:var(--qgc-texto,#fff)}
.qgc-caixa{width:min(100%,420px);max-height:100%;overflow-y:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;padding:22px 18px 24px;border-radius:22px;
  background:var(--qgc-fundo,#10153a);border:2px solid var(--qgc-borda,rgba(255,255,255,.18));display:flex;flex-direction:column;gap:14px;
  -webkit-user-select:text;user-select:text;touch-action:pan-y}
.qgc-caixa *{box-sizing:border-box}
.qgc-caixa h2{margin:0;text-align:center;font-size:26px;line-height:1.15}
.qgc-sub{margin:0;text-align:center;color:rgba(255,255,255,.7);font-size:16px;line-height:1.35}
.qgc-erro{margin:0;text-align:center;color:var(--qgc-rosa,#ff4da6);font-size:16px;min-height:1.2em}
.qgc-linha{display:flex;flex-wrap:wrap;justify-content:center;gap:10px}
.qgc-btn{min-height:48px;padding:0 20px;border-radius:14px;font:inherit;font-size:18px;font-weight:700;cursor:pointer;-webkit-user-select:none;user-select:none;
  border:2px solid var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.12);color:var(--qgc-acento,#3ee6d0)}
.qgc-btn.principal{border-color:var(--qgc-destaque,#ffd93d);background:rgba(255,217,61,.12);color:var(--qgc-destaque,#ffd93d)}
.qgc-btn.suave{border-color:rgba(255,255,255,.3);background:rgba(255,255,255,.06);color:rgba(255,255,255,.85)}
.qgc-btn.rosa{border-color:var(--qgc-rosa,#ff4da6);background:rgba(255,77,166,.1);color:var(--qgc-rosa,#ff4da6)}
.qgc-btn:active{transform:scale(.97)}
.qgc-abas{display:flex;gap:8px;justify-content:center}
.qgc-aba{min-height:42px;padding:0 16px;border-radius:12px;font:inherit;font-size:16px;font-weight:700;cursor:pointer;border:2px solid rgba(255,255,255,.25);background:transparent;color:rgba(255,255,255,.7)}
.qgc-aba.on{border-color:var(--qgc-acento,#3ee6d0);color:var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.12)}
.qgc-chips{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.qgc-chip{min-height:42px;padding:0 6px;border-radius:12px;font:inherit;font-size:16px;cursor:pointer;border:1.5px solid rgba(255,255,255,.22);background:rgba(255,255,255,.05);color:#fff}
.qgc-chip:active{border-color:var(--qgc-acento,#3ee6d0);background:rgba(62,230,208,.18)}
.qgc-campo{display:flex;flex-direction:column;gap:6px}
.qgc-campo label{font-size:15px;color:rgba(255,255,255,.7)}
.qgc-campo select,.qgc-campo input{width:100%;min-height:50px;border-radius:12px;border:2px solid rgba(255,255,255,.28);background:rgba(255,255,255,.07);color:#fff;font:inherit;font-size:22px;padding:0 12px}
.qgc-campo select option{color:#111}
.qgc-campo input{text-align:center;letter-spacing:.5em;text-transform:uppercase;font-size:28px}
.qgc-campo select:focus,.qgc-campo input:focus{outline:none;border-color:var(--qgc-acento,#3ee6d0)}
.qgc-codigo{font-size:64px;line-height:1.1;letter-spacing:.12em;text-align:center;padding-left:.12em;color:var(--qgc-destaque,#ffd93d);font-weight:800}
.qgc-apelido{color:var(--qgc-destaque,#ffd93d);font-weight:700}
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

function avisar(eu) { ouvintes.forEach((f) => { try { f(eu); } catch (e) { /* ouvinte do jogo falhou */ } }); }

/* ---------- janela ---------- */
function abrirJanela() {
  if (!document.getElementById('qgc-css')) document.head.append(h('style', { id: 'qgc-css' }, CSS));
  if (fundo) fundo.remove();
  const caixa = h('div', { class: 'qgc-caixa', role: 'dialog', 'aria-modal': 'true' });
  fundo = h('div', { class: 'qgc-fundo' }, caixa);
  document.body.append(fundo);
  return caixa;
}
function fecharJanela() { if (fundo) { fundo.remove(); fundo = null; } }
const tela = (caixa, ...nos) => { caixa.replaceChildren(...nos); caixa.scrollTop = 0; };

/* ---------- API pública ---------- */
async function me() {
  const r = await api('/api/conta/me');
  if (r.status !== 200 || typeof r.dados.logado !== 'boolean') return null; // sem servidor de contas
  return r.dados.logado ? { logado: true, apelido: r.dados.apelido } : { logado: false };
}

// Abre a janela de "criar conta / já tenho conta". Resolve com { apelido } ou null (se a pessoa fechar).
function entrar() {
  return new Promise((resolver) => {
    const caixa = abrirJanela();
    let feito = false;
    const terminar = (resultado) => { if (feito) return; feito = true; fecharJanela(); resolver(resultado); };
    const cancelar = () => terminar(null);
    const fechar = btn('Fechar', cancelar, 'suave');
    const abas = (aba) => h('div', { class: 'qgc-abas' },
      h('button', { class: 'qgc-aba' + (aba === 'criar' ? ' on' : ''), type: 'button', onclick: criarConta }, 'Criar conta'),
      h('button', { class: 'qgc-aba' + (aba === 'entrar' ? ' on' : ''), type: 'button', onclick: jaTenho }, 'Já tenho conta'));
    const rede = (tentar) => tela(caixa, h('h2', {}, 'Sem conexão'), h('p', { class: 'qgc-sub' }, FRASES.rede),
      h('div', { class: 'qgc-linha' }, btn('Tentar de novo', tentar), fechar));

    async function criarConta(aviso = '') {
      tela(caixa, h('h2', {}, 'Escolha seu apelido'), abas('criar'), h('p', { class: 'qgc-sub' }, 'Carregando...'), h('div', { class: 'qgc-linha' }, fechar));
      const r = await api('/api/conta/sugestoes');
      if (r.status !== 200) return rede(() => criarConta());
      tela(caixa,
        h('h2', {}, 'Escolha seu apelido'), abas('criar'),
        h('p', { class: 'qgc-sub' }, 'Toque em um apelido. Você recebe um código de 3 letras ou números para entrar de novo depois.'),
        h('div', { class: 'qgc-linha' }, btn('Outros apelidos', () => criarConta())),
        h('p', { class: 'qgc-erro' }, typeof aviso === 'string' ? aviso : ''),
        h('div', { class: 'qgc-chips' }, r.dados.apelidos.map((nome) => h('button', { class: 'qgc-chip', type: 'button', onclick: () => escolher(nome) }, nome))),
        h('div', { class: 'qgc-linha' }, fechar));
    }

    async function escolher(apelido) {
      tela(caixa, h('p', { class: 'qgc-sub' }, 'Criando sua conta...'));
      const r = await api('/api/conta/criar', { metodo: 'POST', corpo: { apelido } });
      if (r.status === 0) return rede(() => criarConta());
      if (r.status !== 201) {
        return criarConta(r.status === 409 ? 'Esse apelido acabou de ser escolhido. Escolha outro.'
          : r.status === 429 ? 'Muitas contas novas agora. Tente daqui a pouco.' : 'Não consegui criar a conta. Tente de novo.');
      }
      avisar({ logado: true, apelido: r.dados.apelido });
      tela(caixa,
        h('h2', {}, 'Conta criada!'),
        h('p', { class: 'qgc-sub' }, 'Você é ', h('span', { class: 'qgc-apelido' }, r.dados.apelido)),
        h('div', { class: 'qgc-codigo' }, r.dados.codigo),
        h('p', { class: 'qgc-sub' }, 'Anote este código. Com o apelido e o código você entra em qualquer aparelho.'),
        h('div', { class: 'qgc-linha' }, btn('Continuar', () => terminar({ apelido: r.dados.apelido }), 'principal')));
    }

    async function jaTenho() {
      tela(caixa, h('h2', {}, 'Entrar'), abas('entrar'), h('p', { class: 'qgc-sub' }, 'Carregando...'), h('div', { class: 'qgc-linha' }, fechar));
      const r = await api('/api/conta/apelidos');
      if (r.status !== 200) return rede(jaTenho);
      if (!r.dados.apelidos.length) {
        return tela(caixa, h('h2', {}, 'Entrar'), abas('entrar'), h('p', { class: 'qgc-sub' }, 'Ainda não existe nenhuma conta. Crie a primeira!'), h('div', { class: 'qgc-linha' }, fechar));
      }
      const seletor = h('select', { id: 'qgc-apelido' }, r.dados.apelidos.map((a) => h('option', { value: a }, a)));
      const campo = h('input', { id: 'qgc-codigo', maxlength: '3', autocomplete: 'off', autocapitalize: 'characters', autocorrect: 'off', spellcheck: 'false', 'aria-label': 'Código de 3 caracteres' });
      const erro = h('p', { class: 'qgc-erro' });
      const ir = btn('Entrar', async () => {
        erro.textContent = '';
        if (campo.value.trim().length !== 3) { erro.textContent = 'O código tem 3 letras ou números.'; return; }
        const res = await api('/api/conta/entrar', { metodo: 'POST', corpo: { apelido: seletor.value, codigo: campo.value } });
        if (res.status === 200) { avisar({ logado: true, apelido: res.dados.apelido }); return terminar({ apelido: res.dados.apelido }); }
        if (res.status === 429) erro.textContent = `Muitas tentativas. Espere ${Math.max(1, Math.ceil((res.dados.segundos || 1800) / 60))} min e tente de novo.`;
        else if (res.status === 401) erro.textContent = res.dados.restantes ? `Apelido ou código incorreto. Mais ${res.dados.restantes} tentativas.` : 'Apelido ou código incorreto.';
        else erro.textContent = 'Não consegui entrar. Confira a internet.';
      }, 'principal');
      campo.addEventListener('keydown', (e) => { if (e.key === 'Enter') ir.click(); });
      tela(caixa,
        h('h2', {}, 'Entrar'), abas('entrar'),
        h('div', { class: 'qgc-campo' }, h('label', { for: 'qgc-apelido' }, 'Seu apelido'), seletor),
        h('div', { class: 'qgc-campo' }, h('label', { for: 'qgc-codigo' }, 'Seu código (3 letras ou números)'), campo),
        erro, h('div', { class: 'qgc-linha' }, ir), h('div', { class: 'qgc-linha' }, fechar));
    }

    criarConta();
  });
}

// Mostra o apelido, o código e "Sair da conta". Resolve quando a janela fecha.
function perfil() {
  return new Promise(async (resolver) => {
    const caixa = abrirJanela();
    const fim = () => { fecharJanela(); resolver(); };
    tela(caixa, h('p', { class: 'qgc-sub' }, 'Carregando...'));
    const r = await api('/api/conta/codigo');
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
}

async function sair() {
  await api('/api/conta/sair', { metodo: 'POST', corpo: {} });
  avisar({ logado: false });
}

window.QGConta = { me, entrar, perfil, sair, aoMudar: (f) => { if (typeof f === 'function') ouvintes.push(f); } };
})();
