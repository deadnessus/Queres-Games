// O que aparece por cima do jogo (HTML + CSS): bússola, mira, calor da arma, botão de ação,
// mensagens da ÍRIS, contador dos alvos de treino, a missão atual, a vida do chefe e o painel de desempenho (?debug=1).
const $ = (id) => document.getElementById(id);

const PONTOS = [['N', 0], ['NE', 45], ['L', 90], ['SE', 135], ['S', 180], ['SO', 225], ['O', 270], ['NO', 315]];
const CAMPO_BUSSOLA = 150; // graus visíveis na fita

export function criarHud({ som }) {
  const fita = $('bussola-fita');
  const marcas = PONTOS.map(([texto, rumo]) => {
    const el = document.createElement('span');
    el.className = texto.length === 1 ? 'marca principal' : 'marca';
    el.textContent = texto;
    fita.appendChild(el);
    return { el, rumo };
  });
  const marcadores = new Map();

  function marcador(id, icone, texto) {
    if (marcadores.has(id)) return marcadores.get(id);
    const el = document.createElement('span');
    el.className = 'marcador';
    el.innerHTML = `<b></b><small></small>`;
    el.querySelector('b').textContent = icone;
    el.querySelector('small').textContent = texto;
    fita.appendChild(el);
    const m = { el, rumo: 0, legenda: el.querySelector('small'), texto };
    marcadores.set(id, m);
    return m;
  }

  // Ângulo de -180 a 180.
  const rel = (a) => ((((a + 180) % 360) + 360) % 360) - 180;

  function bussola(rumoJogador, extras) {
    const largura = fita.clientWidth || 260;
    const px = (graus) => (rel(graus - rumoJogador) / CAMPO_BUSSOLA) * largura;
    for (const m of marcas) {
      const r = rel(m.rumo - rumoJogador);
      m.el.style.opacity = Math.abs(r) > CAMPO_BUSSOLA / 2 ? 0 : 1 - Math.abs(r) / (CAMPO_BUSSOLA / 2) * 0.6;
      m.el.style.transform = `translateX(${px(m.rumo)}px)`;
    }
    const usados = new Set(extras.map((x) => x.id));
    for (const [id, m] of marcadores) m.el.hidden = !usados.has(id);
    for (const x of extras) {
      const m = marcador(x.id, x.icone, x.texto);
      if (m.texto !== x.texto) { m.texto = x.texto; m.legenda.textContent = x.texto; }
      const r = rel(x.rumo - rumoJogador);
      const lim = CAMPO_BUSSOLA / 2 - 6;
      const preso = Math.max(-lim, Math.min(lim, r));
      m.el.classList.toggle('na-borda', Math.abs(r) > lim);
      m.el.style.transform = `translateX(${(preso / CAMPO_BUSSOLA) * largura}px)`;
    }
  }

  const mira = $('mira');
  const calorEl = $('calor'), calorBarra = $('calor-barra');
  const btnAcao = $('btn-acao'), btnAcaoTexto = $('btn-acao-texto');
  const caixa = $('mensagem'), caixaTexto = $('mensagem-texto');
  const contador = $('contador-alvos');
  const debugEl = $('debug');
  const avisos = $('avisos');
  const vidaCheia = $('vida-cheia'), vidaEl = $('vida'), danoEl = $('dano');
  let ultimaVida = -1;
  const modoEl = $('modo-colocar'), btnCancelar = $('btn-cancelar');

  let fila = [], digitando = null, fechar = null;
  function proxima() {
    if (digitando || !fila.length) return;
    const { texto, segundos } = fila.shift();
    caixa.hidden = false;
    caixaTexto.textContent = '';
    if (som) som.mensagem();
    let i = 0;
    digitando = setInterval(() => {
      i += 2;
      caixaTexto.textContent = texto.slice(0, i);
      if (i >= texto.length) {
        clearInterval(digitando);
        digitando = null;
        clearTimeout(fechar);
        fechar = setTimeout(() => { if (fila.length) proxima(); else caixa.hidden = true; }, segundos * 1000);
      }
    }, 22);
  }

  let ultimoAcao = null, ultimoCalor = -1, ultimaMira = null, ultimoContador = -1;
  const btnMissao = $('btn-missao'), missaoIcone = $('missao-icone'), missaoTitulo = $('missao-titulo'), missaoTexto = $('missao-texto'), missaoProg = $('missao-progresso');
  const chefeEl = $('chefe'), chefeNome = $('chefe-nome'), chefeCheia = $('chefe-cheia');
  let ultimaMissao = '', ultimoChefe = '';

  return {
    bussola,
    mira(estado) { if (estado !== ultimaMira) { mira.className = estado; ultimaMira = estado; } },
    calor(valor, travada) {
      const v = Math.round(valor * 50) / 50;
      if (v === ultimoCalor && !travada) return;
      ultimoCalor = v;
      calorEl.classList.toggle('visivel', valor > 0.02);
      calorEl.classList.toggle('travada', travada);
      calorBarra.style.transform = `scaleX(${valor})`;
    },
    acao(texto, bloqueado = false) {
      const chave = texto + (bloqueado ? '!' : '');
      if (chave === ultimoAcao) return;
      ultimoAcao = chave;
      btnAcao.hidden = !texto;
      btnAcao.classList.toggle('bloqueado', bloqueado);
      if (texto) btnAcaoTexto.textContent = texto;
    },
    // Aviso rápido embaixo ("+3 🪵 Madeira"). Junta avisos iguais seguidos.
    aviso(texto) {
      const ultimo = avisos.lastElementChild;
      if (ultimo && ultimo.dataset.base === texto && !ultimo.classList.contains('saindo')) {
        ultimo.dataset.vezes = String(Number(ultimo.dataset.vezes) + 1);
        ultimo.textContent = `${texto} (×${ultimo.dataset.vezes})`;
        clearTimeout(ultimo._t);
      } else {
        const e = document.createElement('div');
        e.className = 'aviso';
        e.dataset.base = texto;
        e.dataset.vezes = '1';
        e.textContent = texto;
        avisos.append(e);
        while (avisos.children.length > 3) avisos.firstElementChild.remove();
      }
      const alvo = avisos.lastElementChild;
      alvo._t = setTimeout(() => { alvo.classList.add('saindo'); setTimeout(() => alvo.remove(), 400); }, 2200);
    },
    vida(fracao) {
      const v = Math.round(Math.max(0, Math.min(1, fracao)) * 100);
      if (v === ultimaVida) return;
      ultimaVida = v;
      vidaCheia.style.transform = `scaleX(${v / 100})`;
      vidaEl.classList.toggle('baixa', v <= 30);
    },
    dano() {
      danoEl.classList.remove('ativo');
      void danoEl.offsetWidth; // reinicia a animação
      danoEl.classList.add('ativo');
    },
    modoColocar(texto) {
      modoEl.hidden = !texto;
      btnCancelar.hidden = !texto;
      if (texto) modoEl.textContent = texto;
    },
    mensagem(texto, segundos = 5) { fila.push({ texto, segundos }); proxima(); },
    limparMensagens() { fila = []; clearInterval(digitando); digitando = null; clearTimeout(fechar); caixa.hidden = true; },
    contador(n) {
      if (n === ultimoContador) return;
      ultimoContador = n;
      contador.hidden = n <= 0;
      contador.textContent = `Bolhas de treino: ${n}`;
    },
    debug(texto) { if (debugEl.hidden) debugEl.hidden = false; debugEl.textContent = texto; },
    // A missão atual (canto de cima, à esquerda). null esconde.
    missao(m) {
      const chave = m ? `${m.icone}|${m.titulo}|${m.texto}|${m.progresso}` : '';
      if (chave === ultimaMissao) return;
      ultimaMissao = chave;
      btnMissao.hidden = !m;
      if (!m) return;
      missaoIcone.textContent = m.icone;
      missaoTitulo.textContent = m.titulo;
      missaoTexto.textContent = m.texto;
      missaoProg.textContent = m.progresso || '';
      missaoProg.hidden = !m.progresso;
    },
    // Pisca a caixa da missão (passo novo).
    destacarMissao() {
      btnMissao.classList.remove('novo');
      void btnMissao.offsetWidth;
      btnMissao.classList.add('novo');
    },
    // Barra de vida do chefe por perto (embaixo, no meio). null esconde.
    chefe(c) {
      const chave = c ? `${c.nome}|${Math.round(c.fracao * 100)}` : '';
      if (chave === ultimoChefe) return;
      ultimoChefe = chave;
      chefeEl.hidden = !c;
      if (!c) return;
      chefeNome.textContent = c.nome;
      chefeCheia.style.transform = `scaleX(${c.fracao})`;
    },
  };
}
