// O que aparece por cima do jogo (HTML + CSS): bússola, mira, calor da arma, botão de ação,
// mensagens da ÍRIS, contador dos alvos de treino e o painel de desempenho (?debug=1).
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
    acao(texto) {
      if (texto === ultimoAcao) return;
      ultimoAcao = texto;
      btnAcao.hidden = !texto;
      if (texto) btnAcaoTexto.textContent = texto;
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
  };
}
