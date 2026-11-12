// Efeitos visuais (só desenho): faíscas, ondas de choque, tremor de tela e rastro do motor.
// Ficam separados do motor da partida: o motor diz o que aconteceu (eventos), aqui se decide como mostrar.
import { TIPOS } from './naves.js';

const TAU = Math.PI * 2;

export function novosEfeitos(rand = Math.random) {
  return { rand, particulas: [], ondas: [], tremor: 0, clarao: 0 };
}

function explosao(ef, x, y, cor, quantidade, forca) {
  const r = ef.rand;
  for (let i = 0; i < quantidade; i++) {
    const a = r() * TAU;
    const v = forca * (0.25 + r() * 0.75);
    ef.particulas.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      vida: 0.45 + r() * 0.45, max: 0.9, r: 1.2 + r() * 2.2,
      cor: r() < 0.3 ? '#ffffff' : r() < 0.55 ? '#ffd45e' : cor,
    });
  }
  ef.ondas.push({ x, y, t: 0, dur: 0.42, raio: forca * 0.3, cor });
}

// Transforma o que o motor avisou em efeitos na tela.
export function reagir(ef, ev) {
  switch (ev.tipo) {
    case 'explosao':
      explosao(ef, ev.x, ev.y, TIPOS[ev.nave].cor, 20, 190);
      break;
    case 'perdeu':
      explosao(ef, ev.x, ev.y, '#ff8a3c', 36, 260);
      ef.tremor = 0.45;
      ef.clarao = 0.35;
      break;
    case 'tiro':
      for (let i = 0; i < 3; i++) {
        ef.particulas.push({ x: ev.x, y: ev.y, vx: (ef.rand() - 0.5) * 70, vy: -20 - ef.rand() * 40, vida: 0.15, max: 0.15, r: 1.4, cor: '#9ff6ff' });
      }
      break;
    case 'fase':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.9, raio: 260, cor: '#ffd45e' });
      break;
    case 'vida':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.7, raio: 90, cor: '#7dff9a' });
      break;
    default:
  }
}

export function atualizarEfeitos(ef, dt) {
  for (const p of ef.particulas) {
    p.vida -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 1 - Math.min(1, 2.2 * dt);
    p.vy *= 1 - Math.min(1, 2.2 * dt);
  }
  ef.particulas = ef.particulas.filter((p) => p.vida > 0);
  for (const o of ef.ondas) o.t += dt;
  ef.ondas = ef.ondas.filter((o) => o.t < o.dur);
  ef.tremor = Math.max(0, ef.tremor - dt);
  ef.clarao = Math.max(0, ef.clarao - dt);
}

// Faíscas saindo dos motores da nave do jogador.
export function rastroDoMotor(ef, x, y, dt) {
  const r = ef.rand;
  if (r() < dt * 40) {
    ef.particulas.push({
      x: x + (r() - 0.5) * 8, y: y + 28, vx: (r() - 0.5) * 24, vy: 70 + r() * 60,
      vida: 0.3, max: 0.3, r: 1 + r() * 1.2, cor: r() < 0.5 ? '#ffb347' : '#8fe9ff',
    });
  }
}

export function deslocamentoDoTremor(ef) {
  if (ef.tremor <= 0) return { x: 0, y: 0 };
  const f = Math.min(1, ef.tremor / 0.45) * 7;
  return { x: (ef.rand() - 0.5) * f, y: (ef.rand() - 0.5) * f };
}

export function desenharEfeitos(g, ef) {
  g.save();
  g.globalCompositeOperation = 'lighter';
  for (const o of ef.ondas) {
    const k = o.t / o.dur;
    g.globalAlpha = (1 - k) * 0.85;
    g.strokeStyle = o.cor;
    g.lineWidth = 3 * (1 - k) + 0.5;
    g.beginPath();
    g.arc(o.x, o.y, 6 + o.raio * k, 0, TAU);
    g.stroke();
  }
  for (const p of ef.particulas) {
    const k = p.vida / p.max;
    g.globalAlpha = Math.max(0, Math.min(1, k * 1.2));
    g.fillStyle = p.cor;
    g.beginPath();
    g.arc(p.x, p.y, p.r * (0.5 + k * 0.7), 0, TAU);
    g.fill();
  }
  g.restore();
  g.globalAlpha = 1;
}
