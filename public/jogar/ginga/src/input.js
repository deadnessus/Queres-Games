// Liga Pointer Events e teclado ao reconhecedor de gestos. Ver docs/ESPEC.md, seção 3.5.
const TECLAS = {
  a: 'ESQUERDA',
  d: 'DIREITA',
  s: 'CANETA',
  w: 'CHAPEU',
  q: 'ELASTICO_ESQ',
  e: 'ELASTICO_DIR',
};

// Horário real do toque (não do momento em que o código roda): um quadro pesado não atrasa o gesto.
function horario(e) {
  const agora = performance.now();
  return e.timeStamp > 0 && e.timeStamp <= agora + 5 ? e.timeStamp : agora;
}

export function ligarEntrada({ canvas, rec, jogo, tratar, ativo, aoAjuda }) {
  canvas.addEventListener(
    'pointerdown',
    (e) => {
      e.preventDefault();
      if (!ativo()) return;
      if (jogo.estado === 'BARRA') {
        jogo.chutar();
        return;
      }
      if (!jogo.aceitaGestos()) return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (y < r.height / 2) return;
      const lado = x < r.width / 2 ? 'E' : 'D';
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // alguns navegadores não deixam capturar; segue sem
      }
      for (const ev of rec.down(e.pointerId, lado, horario(e))) tratar(ev);
    },
    { passive: false },
  );

  const soltar = (e) => {
    for (const ev of rec.up(e.pointerId, horario(e))) tratar(ev);
  };
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  for (const tipo of ['touchstart', 'touchmove', 'touchend']) {
    canvas.addEventListener(tipo, (e) => e.preventDefault(), { passive: false });
  }
  document.addEventListener('contextmenu', (e) => e.preventDefault());
  document.addEventListener('dblclick', (e) => e.preventDefault());

  window.addEventListener('keydown', (e) => {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const tecla = e.key.toLowerCase();
    if (tecla === 'h' || tecla === 'escape') {
      aoAjuda();
      return;
    }
    if (!ativo()) return;
    if (tecla === ' ') {
      e.preventDefault();
      jogo.chutar();
      return;
    }
    const drible = TECLAS[tecla];
    if (!drible) return;
    const t = performance.now();
    tratar({ tipo: 'gesto', drible, t0: t, t });
  });
}
