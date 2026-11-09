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
      if (jogo.controlaLivre && jogo.controlaLivre()) {
        // modo Livre: a tela toda; o lado define a direção e a altura do dedo, a velocidade
        const r = canvas.getBoundingClientRect();
        const lado = e.clientX - r.left < r.width / 2 ? 'E' : 'D';
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch {
          // segue sem captura
        }
        jogo.toqueLivre('down', e.pointerId, lado, (e.clientY - r.top) / r.height, horario(e));
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
    if (jogo.toqueLivre) jogo.toqueLivre('up', e.pointerId, null, null, horario(e));
    for (const ev of rec.up(e.pointerId, horario(e))) tratar(ev);
  };
  canvas.addEventListener('pointermove', (e) => {
    if (!jogo.toqueLivre) return;
    const r = canvas.getBoundingClientRect();
    jogo.toqueLivre('move', e.pointerId, null, (e.clientY - r.top) / r.height, horario(e));
  });
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
    if (jogo.controlaLivre && jogo.controlaLivre()) {
      e.preventDefault();
      // teclado no modo Livre: A/D ou setas seguram o lado; ↑/↓ correm/freiam; S caneta; W chapéu
      const t = performance.now();
      if (tecla === 'a' || tecla === 'arrowleft') jogo.toqueLivre('down', 'tecla-E', 'E', jogo.yTeclado ?? 0.8, t);
      else if (tecla === 'd' || tecla === 'arrowright') jogo.toqueLivre('down', 'tecla-D', 'D', jogo.yTeclado ?? 0.8, t);
      else if (tecla === 'arrowup' || tecla === 'w') {
        if (tecla === 'w') jogo.drible('CHAPEU');
        else jogo.yTeclado = 0.3;
      } else if (tecla === 'arrowdown') jogo.yTeclado = 0.97;
      else if (tecla === 's') jogo.drible('CANETA');
      return;
    }
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

  window.addEventListener('keyup', (e) => {
    if (!jogo.toqueLivre) return;
    const tecla = e.key.toLowerCase();
    const t = performance.now();
    if (tecla === 'a' || tecla === 'arrowleft') jogo.toqueLivre('up', 'tecla-E', null, null, t);
    else if (tecla === 'd' || tecla === 'arrowright') jogo.toqueLivre('up', 'tecla-D', null, null, t);
    else if (tecla === 'arrowup' || tecla === 'arrowdown') jogo.yTeclado = null;
  });
}
