// Controle de videogame (Gamepad API): funciona no iPad com controle de Xbox, PlayStation ou MFi.
// Analógico esquerdo anda, direito olha; A pula; gatilho direito atira; X é ação; LB troca de arma; Start pausa; L3 corre.
import { entrada } from './entrada.js';

const ZONA_MORTA = 0.16;
let antes = {};

const eixo = (v) => (Math.abs(v) < ZONA_MORTA ? 0 : Math.sign(v) * (Math.abs(v) - ZONA_MORTA) / (1 - ZONA_MORTA));

export function lerControle(dt, sensibilidade) {
  const f = entrada.fontes.controle;
  const lista = navigator.getGamepads ? navigator.getGamepads() : [];
  const c = [...lista].find((g) => g && g.connected);
  if (!c) { f.x = 0; f.y = 0; f.correr = false; entrada.atirandoControle = false; return; }
  const ax = eixo(c.axes[0] || 0), ay = eixo(c.axes[1] || 0);
  const lx = eixo(c.axes[2] || 0), ly = eixo(c.axes[3] || 0);
  const b = (i) => !!(c.buttons[i] && c.buttons[i].pressed);
  const novo = (i) => b(i) && !antes[i];

  f.x = ax; f.y = -ay; f.correr = b(10) || Math.hypot(ax, ay) > 0.97;
  if (lx || ly) {
    const vel = (1.2 + 0.35 * sensibilidade) * dt * entrada.fatorMira; // radianos por segundo
    entrada.girar(lx * Math.abs(lx) * vel, -ly * Math.abs(ly) * vel * 0.8);
  }
  if (ax || ay || lx || ly || c.buttons.some((x) => x.pressed)) entrada.ultimaFonte = 'controle';
  entrada.atirandoControle = b(7) || b(5);
  if (novo(0)) entrada.pularPedido = true;
  if (novo(2)) entrada.acaoPedida = true;
  entrada.acaoSegurandoControle = b(2);
  if (novo(3)) entrada.mochilaPedida = true; // Y abre a mochila
  if (novo(1)) entrada.cancelarPedido = true; // B cancela
  if (novo(4)) entrada.trocarArmaPedida = true; // LB troca de arma
  if (novo(9)) entrada.pausaPedida = true;
  antes = {};
  c.buttons.forEach((x, i) => { antes[i] = x.pressed; });
}
