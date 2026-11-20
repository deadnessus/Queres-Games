// O renderizador 3D (Three.js) com resolução que se ajusta sozinha para manter o jogo liso.
// Dois visuais (decisão D11, o dono escolhe mais para frente):
//  - "pixelado": desenha em baixa resolução (cerca de 360 linhas) e amplia com pixels grandes, como em 1997;
//  - "liso": resolução cheia (até 2x), formas facetadas e cores lisas.
import * as THREE from 'three';

export function criarRenderizador(canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, stencil: false, powerPreference: 'default' });
  } catch (e) {
    return null; // sem WebGL neste aparelho
  }
  renderer.setClearColor(0x0b1020, 1);

  let estilo = 'pixelado', qualidade = 'auto';
  let escala = 1; // 0.55 a 1, mexida pela qualidade automática
  let media = 16.7, ultimoAjuste = 0, quadrosBons = 0;

  function aplicarTamanho() {
    const w = innerWidth, h = innerHeight;
    let pr;
    if (estilo === 'pixelado') {
      const linhas = qualidade === 'leve' ? 280 : qualidade === 'bonita' ? 420 : 360;
      pr = Math.min(1.5, linhas / h) * (qualidade === 'auto' ? 0.75 + 0.25 * escala : 1);
    } else {
      const max = qualidade === 'leve' ? 1 : Math.min(devicePixelRatio || 1, 2);
      pr = qualidade === 'auto' ? Math.max(0.6, max * escala) : max;
    }
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h, false);
    canvas.classList.toggle('pixelado', estilo === 'pixelado');
  }

  // Chamado a cada quadro com o tempo do quadro. Na qualidade "auto", baixa a resolução se o aparelho
  // estiver sofrendo (quadros acima de ~19 ms) e sobe devagar quando sobra folga.
  function medir(dtSeg, agora) {
    const ms = dtSeg * 1000;
    if (ms <= 0 || ms > 200) return;
    media += (ms - media) * 0.05;
    if (qualidade !== 'auto' || agora - ultimoAjuste < 1500) return;
    if (media > 19.5 && escala > 0.55) {
      escala = Math.max(0.55, escala - 0.1);
      ultimoAjuste = agora; quadrosBons = 0;
      aplicarTamanho();
    } else if (media < 14.5) {
      quadrosBons++;
      if (quadrosBons > 3 && escala < 1) {
        escala = Math.min(1, escala + 0.05);
        ultimoAjuste = agora; quadrosBons = 0;
        aplicarTamanho();
      }
    }
  }

  addEventListener('resize', aplicarTamanho);
  aplicarTamanho();

  return {
    three: renderer,
    definir(novoEstilo, novaQualidade) {
      estilo = novoEstilo; qualidade = novaQualidade;
      if (qualidade !== 'auto') escala = 1;
      aplicarTamanho();
    },
    medir,
    get estilo() { return estilo; },
    get escala() { return escala; },
    get mediaMs() { return media; },
    aplicarTamanho,
  };
}
