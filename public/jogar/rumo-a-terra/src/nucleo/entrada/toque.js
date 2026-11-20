// Controles de toque (iPad e iPhone deitados).
// - Metade esquerda: joystick que aparece onde o dedão encostar (e segue o dedo se ele for longe).
// - Metade direita: arrastar para olhar em volta.
// - Botão ATIRAR: segurar atira; arrastar o dedo em cima dele também mira (o dedão direito faz as duas coisas).
// - Botões PULAR e AÇÃO.
// Usa Pointer Events com vários dedos ao mesmo tempo. Os botões são <button> de verdade (a telemetria do site conta).
import { entrada } from './entrada.js';
import { vetorJoystick, seguirBase, giroDoArrasto } from '../../logica/joystick.js';

const RAIO = 62; // raio do joystick em pixels
const ZONA_ESQUERDA = 0.45; // parte da largura da tela que é do joystick

export function iniciarToque({ camada, base, pino, btnAtirar, btnPular, btnAcao, config, aoPrimeiroToque }) {
  const papeis = new Map(); // pointerId -> { papel, x, y, t, bx, by }
  let ativo = false;

  const usar = () => {
    entrada.ultimaFonte = 'toque';
    document.body.classList.add('com-toque');
    if (aoPrimeiroToque) aoPrimeiroToque();
  };

  function mostrarJoystick(bx, by, px, py) {
    base.style.transform = `translate(${bx - 60}px, ${by - 60}px)`;
    pino.style.transform = `translate(${px - 27}px, ${py - 27}px)`;
    base.hidden = false;
    pino.hidden = false;
  }
  function esconderJoystick() { base.hidden = true; pino.hidden = true; }

  function olhar(p, e) {
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    const ms = Math.max(1, e.timeStamp - p.t);
    const f = entrada.fatorMira;
    entrada.girar(giroDoArrasto(dx, ms, config.sensibilidade) * f, -giroDoArrasto(dy, ms, config.sensibilidade) * f * 0.85);
    p.x = e.clientX; p.y = e.clientY; p.t = e.timeStamp;
  }

  camada.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' || !ativo) return;
    e.preventDefault();
    usar();
    const naEsquerda = e.clientX < innerWidth * ZONA_ESQUERDA;
    const jaTemMover = [...papeis.values()].some((p) => p.papel === 'mover');
    const jaTemOlhar = [...papeis.values()].some((p) => p.papel === 'olhar');
    if (naEsquerda && !jaTemMover) {
      // A base não fica colada na borda (o dedão precisa de espaço para todos os lados).
      const bx = Math.max(RAIO + 16, Math.min(e.clientX, innerWidth * ZONA_ESQUERDA - 20));
      const by = Math.max(RAIO + 16, Math.min(e.clientY, innerHeight - RAIO - 16));
      papeis.set(e.pointerId, { papel: 'mover', bx, by });
      atualizarMover(papeis.get(e.pointerId), e.clientX, e.clientY);
    } else if (!naEsquerda && !jaTemOlhar) {
      papeis.set(e.pointerId, { papel: 'olhar', x: e.clientX, y: e.clientY, t: e.timeStamp });
    }
  }, { passive: false });

  function atualizarMover(p, x, y) {
    [p.bx, p.by] = seguirBase(p.bx, p.by, x, y, RAIO);
    const v = vetorJoystick(x - p.bx, y - p.by, RAIO);
    const f = entrada.fontes.toque;
    f.x = v.x; f.y = v.y; f.correr = v.mag > 0.94;
    mostrarJoystick(p.bx, p.by, x, y);
  }

  function botao(el, aoApertar, aoSoltar, mira) {
    el.addEventListener('pointerdown', (e) => {
      if (!ativo) return;
      e.preventDefault();
      usar();
      el.classList.add('apertado');
      papeis.set(e.pointerId, { papel: mira ? 'atirar' : 'botao', el, aoSoltar, x: e.clientX, y: e.clientY, t: e.timeStamp });
      aoApertar();
    }, { passive: false });
  }
  botao(btnAtirar, () => { entrada.atirandoToque = true; }, () => { entrada.atirandoToque = false; }, true);
  botao(btnPular, () => { entrada.pularPedido = true; });
  botao(btnAcao, () => { entrada.acaoPedida = true; });

  addEventListener('pointermove', (e) => {
    const p = papeis.get(e.pointerId);
    if (!p) return;
    if (p.papel === 'mover') atualizarMover(p, e.clientX, e.clientY);
    else if (p.papel === 'olhar' || p.papel === 'atirar') olhar(p, e);
  }, { passive: true });

  function soltar(e) {
    const p = papeis.get(e.pointerId);
    if (!p) return;
    papeis.delete(e.pointerId);
    if (p.papel === 'mover') {
      const f = entrada.fontes.toque;
      f.x = 0; f.y = 0; f.correr = false;
      esconderJoystick();
    }
    if (p.el) p.el.classList.remove('apertado');
    if (p.aoSoltar) p.aoSoltar();
  }
  addEventListener('pointerup', soltar);
  addEventListener('pointercancel', soltar);

  // Impede o zoom com pinça e a lupa do iPhone em cima do jogo.
  document.addEventListener('gesturestart', (e) => e.preventDefault(), { passive: false });
  document.addEventListener('dblclick', (e) => e.preventDefault(), { passive: false });
  for (const el of [camada, btnAtirar, btnPular, btnAcao]) {
    el.addEventListener('touchstart', (e) => { if (ativo) e.preventDefault(); }, { passive: false });
  }

  return {
    ligar() { ativo = true; },
    desligar() {
      ativo = false;
      for (const [id] of papeis) soltar({ pointerId: id });
      papeis.clear();
      esconderJoystick();
    },
  };
}
