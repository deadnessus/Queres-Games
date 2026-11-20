// Telas por cima do jogo: carregando, início, pausa, opções, "gire o aparelho" e erro.
// Todas as opções ficam guardadas só neste aparelho.
const $ = (id) => document.getElementById(id);
const TELAS = ['tela-carregando', 'tela-inicio', 'tela-pausa', 'tela-opcoes', 'tela-erro'];

export function mostrarTela(qual) {
  for (const t of TELAS) $(t).hidden = t !== qual;
}

export function progresso(fracao, texto) {
  $('carregando-barra').style.transform = `scaleX(${fracao})`;
  if (texto) $('carregando-texto').textContent = texto;
}

export function mostrarErro(texto) {
  $('erro-texto').textContent = texto;
  mostrarTela('tela-erro');
}

// Liga os campos da tela de opções às configurações. "aoMudar(config)" é chamado a cada mudança.
export function ligarOpcoes(config, aoMudar) {
  const sens = $('opt-sensibilidade'), vol = $('opt-volume'), inv = $('opt-inverter'), tremor = $('opt-tremor');
  function preencher() {
    sens.value = config.sensibilidade;
    vol.value = config.volume;
    inv.checked = config.inverterY;
    tremor.checked = config.reduzirTremor;
    for (const grupo of ['visual', 'qualidade', 'mira', 'botoes']) {
      document.querySelectorAll(`[data-${grupo}]`).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset[grupo] === config[grupo])));
    }
    $('opt-sensibilidade-valor').textContent = config.sensibilidade;
    $('opt-volume-valor').textContent = config.volume;
  }
  sens.addEventListener('input', () => { config.sensibilidade = Number(sens.value); preencher(); aoMudar(config); });
  vol.addEventListener('input', () => { config.volume = Number(vol.value); preencher(); aoMudar(config); });
  inv.addEventListener('change', () => { config.inverterY = inv.checked; aoMudar(config); });
  tremor.addEventListener('change', () => { config.reduzirTremor = tremor.checked; aoMudar(config); });
  for (const grupo of ['visual', 'qualidade', 'mira', 'botoes']) {
    document.querySelectorAll(`[data-${grupo}]`).forEach((b) => b.addEventListener('click', () => {
      config[grupo] = b.dataset[grupo];
      preencher();
      aoMudar(config);
    }));
  }
  preencher();
  return { preencher };
}
