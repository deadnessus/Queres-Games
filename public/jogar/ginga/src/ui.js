// Telas em HTML por cima do canvas: menu, HUD, consulta, resultado e avisos. Ver docs/ESPEC.md, seção 9.
import { CONFIG } from './config.js';
import { formatarPontos } from './regras.js';

const TITULO = {
  GOL: 'GOL!',
  GOL_DE_PLACA: 'GOL DE PLACA!',
  DEFESA: 'Defendeu!',
  TRAVE: 'Na trave!',
  FORA: 'Pra fora!',
  DESARME: 'Desarmado!',
};

const ESTRELA = '<svg viewBox="-15 -15 30 30" aria-hidden="true"><polygon points="0,-14 3.53,-4.85 13.31,-4.33 5.71,1.85 8.23,11.33 0,6 -8.23,11.33 -5.71,1.85 -13.31,-4.33 -3.53,-4.85"/></svg>';

export function criarUI(cb) {
  const $ = (id) => document.getElementById(id);
  const menu = $('menu');
  const hud = $('hud');
  const consulta = $('consulta');
  const resultado = $('resultado');
  const girar = $('girar');
  const tutorial = $('tutorial-ui');
  let origemConsulta = 'menu';
  let ultimoHud = '';
  let principal = null;

  // Menu
  for (const botao of menu.querySelectorAll('[data-dif]')) {
    const dif = botao.dataset.dif;
    botao.querySelector('small').textContent = `${CONFIG.dificuldades[dif].adversarios} adversários`;
    botao.addEventListener('click', () => cb.aoEscolherDificuldade(dif));
  }
  $('btn-como').addEventListener('click', () => cb.aoComoDriblarMenu());
  $('btn-treino').addEventListener('click', () => cb.aoTreino());

  // HUD
  $('btn-ajuda').addEventListener('click', () => cb.aoAjuda());

  // Consulta
  const abas = [...consulta.querySelectorAll('[role="tab"]')];
  function selecionarAba(aba) {
    for (const a of abas) {
      const ativa = a === aba;
      a.setAttribute('aria-selected', String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      $(a.getAttribute('aria-controls')).hidden = !ativa;
    }
  }
  for (const a of abas) a.addEventListener('click', () => selecionarAba(a));
  $('btn-continuar').addEventListener('click', () => {
    if (origemConsulta === 'menu') fecharConsulta();
    else cb.aoContinuar();
  });
  $('btn-sair').addEventListener('click', () => cb.aoSairMenu());

  // Resultado
  $('res-principal').addEventListener('click', () => principal && principal());
  $('res-menu').addEventListener('click', () => cb.aoSairMenu());

  // Tutorial
  $('btn-pular').addEventListener('click', () => cb.aoPularTutorial());

  function abrirConsulta(origem) {
    origemConsulta = origem;
    consulta.classList.toggle('do-jogo', origem === 'jogo');
    $('consulta-pausa').hidden = origem !== 'jogo';
    $('btn-continuar').textContent = origem === 'jogo' ? 'Continuar' : 'Voltar';
    $('btn-sair').hidden = origem !== 'jogo';
    selecionarAba(abas[0]);
    consulta.hidden = false;
    consulta.scrollTop = 0;
    $('btn-continuar').focus({ preventScroll: true });
  }

  function fecharConsulta() {
    consulta.hidden = true;
  }

  function mostrarMenu({ dificuldade, nome, recorde }) {
    for (const botao of menu.querySelectorAll('[data-dif]')) {
      botao.classList.toggle('ultima', botao.dataset.dif === dificuldade);
    }
    $('recorde').textContent = recorde > 0 ? `RECORDE (${nome.toUpperCase()})  ${formatarPontos(recorde)}` : '';
    menu.hidden = false;
  }

  function atualizarHud(info) {
    const chave = JSON.stringify(info);
    if (chave === ultimoHud) return;
    ultimoHud = chave;
    $('hud-rotulo').textContent = info.rotulo;
    $('hud-pontos').textContent = info.pontos === null ? '' : formatarPontos(info.pontos);
    const bolinhas = $('hud-bolinhas');
    bolinhas.textContent = '';
    for (let i = 0; i < info.total; i++) {
      const b = document.createElement('span');
      b.className = i < info.passados ? 'passou' : i === info.passados && !info.area ? 'atual' : 'falta';
      bolinhas.append(b);
    }
  }

  function mostrarResultado(res) {
    const titulo = $('res-titulo');
    titulo.textContent = TITULO[res.tipo];
    resultado.classList.toggle('concluida', res.concluida);
    $('res-sub').textContent = res.concluida
      ? `${res.canto ? 'No canto · ' : ''}Fase ${res.fase} concluída`
      : `Fase ${res.fase}`;
    const estrelas = $('res-estrelas');
    estrelas.hidden = !res.concluida;
    estrelas.innerHTML = [0, 1, 2].map((i) => `<span class="${i < res.estrelas ? 'cheia' : ''}">${ESTRELA}</span>`).join('');
    estrelas.setAttribute('aria-label', `${res.estrelas} de 3 estrelas`);
    const linhas = [[`Dribles (${res.dribles})`, res.base]];
    if (res.perfeitos > 0) linhas.push([`Toques perfeitos (${res.perfeitos})`, res.bonus]);
    if (res.gol) linhas.push(['Gol', res.gol]);
    if (res.canto) linhas.push(['No canto', res.canto]);
    if (res.placa) linhas.push(['Gol de placa', res.placa]);
    const lista = $('res-lista');
    lista.innerHTML = '';
    for (const [rotulo, valor] of linhas) {
      const dt = document.createElement('dt');
      dt.textContent = rotulo;
      const dd = document.createElement('dd');
      dd.textContent = `+${formatarPontos(valor)}`;
      lista.append(dt, dd);
    }
    $('res-total').textContent = formatarPontos(res.ptsFase);
    $('res-nota').textContent = res.concluida
      ? `Placar: ${formatarPontos(res.total)}${res.novoRecorde ? ' · Novo recorde!' : ''}`
      : 'Os pontos desta fase não contam. Tente de novo.';
    const botao = $('res-principal');
    botao.textContent = res.concluida ? 'Próxima fase' : 'Repetir fase';
    principal = res.concluida ? cb.aoProximaFase : cb.aoRepetirFase;
    resultado.hidden = false;
    botao.focus({ preventScroll: true });
  }

  return {
    mostrarMenu,
    esconderMenu: () => { menu.hidden = true; },
    mostrarHud: () => { hud.hidden = false; ultimoHud = ''; },
    esconderHud: () => { hud.hidden = true; },
    atualizarHud,
    alturaHud: () => (hud.hidden ? 0 : hud.getBoundingClientRect().height),
    abrirConsulta,
    fecharConsulta,
    consultaAberta: () => !consulta.hidden,
    origemConsulta: () => origemConsulta,
    mostrarResultado,
    esconderResultado: () => { resultado.hidden = true; },
    mostrarGirar: (b) => { girar.hidden = !b; },
    mostrarTutorial: () => { tutorial.hidden = false; },
    esconderTutorial: () => { tutorial.hidden = true; },
  };
}
