// Teclado e mouse (computador): WASD ou setas para andar, mouse para olhar (com a "trava" do ponteiro),
// clique para atirar, Espaço para pular, Shift para correr, E para ação, Esc para pausar.
import { entrada } from './entrada.js';

export function iniciarTecladoMouse({ canvas, config, podeJogar }) {
  const teclas = new Set();

  function recalcular() {
    const f = entrada.fontes.teclado;
    const frente = (teclas.has('KeyW') || teclas.has('ArrowUp') ? 1 : 0) - (teclas.has('KeyS') || teclas.has('ArrowDown') ? 1 : 0);
    const lado = (teclas.has('KeyD') || teclas.has('ArrowRight') ? 1 : 0) - (teclas.has('KeyA') || teclas.has('ArrowLeft') ? 1 : 0);
    const m = Math.hypot(frente, lado) || 1;
    f.x = lado / m; f.y = frente / m;
    f.correr = teclas.has('ShiftLeft') || teclas.has('ShiftRight');
  }

  addEventListener('keydown', (e) => {
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (!podeJogar()) return;
    entrada.ultimaFonte = 'teclado';
    if (e.code === 'Space') { if (!e.repeat) entrada.pularPedido = true; e.preventDefault(); }
    if (e.code === 'KeyE' && !e.repeat) entrada.acaoPedida = true;
    if (e.code === 'Escape' || e.code === 'KeyP') entrada.pausaPedida = true;
    teclas.add(e.code);
    recalcular();
  });
  addEventListener('keyup', (e) => { teclas.delete(e.code); recalcular(); });
  addEventListener('blur', () => { teclas.clear(); recalcular(); entrada.atirandoMouse = false; });

  const travado = () => document.pointerLockElement === canvas;

  canvas.addEventListener('mousedown', (e) => {
    if (!podeJogar()) return;
    entrada.ultimaFonte = 'teclado';
    if (!travado()) {
      try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => {}); } catch (err) { /* sem trava: segue */ }
      return;
    }
    if (e.button === 0) entrada.atirandoMouse = true;
  });
  addEventListener('mouseup', (e) => { if (e.button === 0) entrada.atirandoMouse = false; });

  addEventListener('mousemove', (e) => {
    if (!travado() || !podeJogar()) return;
    const k = (0.05 + 0.02 * config.sensibilidade) * (Math.PI / 180) * entrada.fatorMira;
    entrada.girar(e.movementX * k, -e.movementY * k);
  });

  // Esc tira a trava do ponteiro: o jogo pausa junto.
  document.addEventListener('pointerlockchange', () => {
    if (!travado() && podeJogar() && entrada.ultimaFonte === 'teclado') entrada.pausaPedida = true;
  });

  return {
    soltarTrava() { if (travado()) document.exitPointerLock(); },
    limpar() { teclas.clear(); recalcular(); },
  };
}
