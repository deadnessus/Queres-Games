// Efeitos visuais (só desenho): faíscas, pedaços de nave, ondas de choque, pontos subindo, tremor de tela e
// rastro do motor. Ficam separados do motor da partida: o motor diz o que aconteceu (eventos), aqui se decide
// como mostrar. Nada daqui muda a partida.
import { TIPOS } from './naves.js?v=11';

const TAU = Math.PI * 2;
const FONTE = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const CORES_CAPSULA = {
  duplo: '#5ef2ff',
  leque: '#7dd3ff',
  escudo: '#7f9bff',
  energia: '#3dffa5',
  lento: '#c08bff',
  bomba: '#ff9a3c',
};
export const NOMES_CAPSULA = {
  duplo: 'TIRO DUPLO',
  leque: 'LEQUE',
  escudo: 'ESCUDO',
  energia: '+10 S DE ENERGIA',
  lento: 'CÂMERA LENTA',
  bomba: 'BOMBA!',
};

// `rand`: sorteio só dos efeitos (não é o da partida). `tremorMax`: 0 a 1, para a opção "menos tremor".
export function novosEfeitos(rand = Math.random) {
  // fator: quanto das faíscas aparece (a qualidade automática diminui em celular fraco)
  return { rand, particulas: [], pedacos: [], ondas: [], textos: [], tremor: 0, clarao: 0, corClarao: '255,120,60', fator: 1, tremorMax: 1 };
}

function faiscas(ef, x, y, cor, quantidade, forca) {
  const r = ef.rand;
  const total = Math.max(2, Math.round(quantidade * ef.fator));
  for (let i = 0; i < total; i++) {
    const a = r() * TAU;
    const v = forca * (0.25 + r() * 0.75);
    ef.particulas.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      vida: 0.45 + r() * 0.45, max: 0.9, r: 1.2 + r() * 2.2,
      cor: r() < 0.3 ? '#ffffff' : r() < 0.55 ? '#ffd45e' : cor,
    });
  }
}

function explosao(ef, x, y, cor, quantidade, forca) {
  faiscas(ef, x, y, cor, quantidade, forca);
  ef.ondas.push({ x, y, t: 0, dur: 0.42, raio: forca * 0.3, cor });
}

// A nave quebra em pedaços que giram e caem.
function quebrar(ef, x, y, cor, quantidade, tam = 1) {
  const r = ef.rand;
  const total = Math.max(3, Math.round(quantidade * Math.max(0.5, ef.fator)));
  for (let i = 0; i < total; i++) {
    const a = r() * TAU;
    const v = 60 + r() * 140;
    ef.pedacos.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40,
      ang: r() * TAU, va: (r() - 0.5) * 14,
      tam: (3 + r() * 5) * tam, vida: 0.7 + r() * 0.5, max: 1.2,
      cor: r() < 0.35 ? '#2a2236' : cor,
    });
  }
}

function texto(ef, x, y, txt, cor, tam = 13, dur = 0.9) {
  ef.textos.push({ x, y, txt, cor, tam, vida: dur, max: dur });
}

function tremer(ef, quanto) {
  ef.tremor = Math.max(ef.tremor, quanto * ef.tremorMax);
}

// Transforma o que o motor avisou em efeitos na tela. Devolve quantos segundos o jogo deve parar (pausa
// curtinha nos impactos grandes); 0 na maioria das vezes.
export function reagir(ef, ev) {
  switch (ev.tipo) {
    case 'explosao': {
      const cor = TIPOS[ev.nave].cor;
      const tam = ev.filhote ? 0.6 : 1;
      explosao(ef, ev.x, ev.y, cor, ev.filhote ? 10 : 18, ev.filhote ? 130 : 190);
      quebrar(ef, ev.x, ev.y, cor, ev.grande ? 10 : 7, tam);
      if (ev.pontos) texto(ef, ev.x, ev.y - 6, ev.mult > 1 ? `+${ev.pontos} ×${ev.mult}` : `+${ev.pontos}`, ev.mult > 1 ? '#ffd45e' : '#ffffff', ev.mult > 1 ? 14 : 12);
      if (ev.grande) {
        tremer(ef, 0.18);
        return 0.05;
      }
      return 0;
    }
    case 'dano':
      faiscas(ef, ev.x, ev.y + 10, '#ffffff', 6, 120);
      return 0;
    case 'escudo_quebrou':
      quebrar(ef, ev.x, ev.y + 14, '#7fe9ff', 8, 0.8);
      ef.ondas.push({ x: ev.x, y: ev.y + 12, t: 0, dur: 0.3, raio: 40, cor: '#7fe9ff' });
      return 0.03;
    case 'furia':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.4, raio: 50, cor: '#ff3b3b' });
      texto(ef, ev.x, ev.y - 22, 'FÚRIA!', '#ff5a5a', 11, 0.7);
      return 0.03;
    case 'perdeu':
      explosao(ef, ev.x, ev.y, '#ff8a3c', 36, 260);
      quebrar(ef, ev.x, ev.y, '#c9d4ff', 10, 1.1);
      tremer(ef, 0.45);
      ef.clarao = 0.35;
      ef.corClarao = '255,120,60';
      return 0.12;
    case 'escudo_gasto':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.5, raio: 70, cor: '#7f9bff' });
      faiscas(ef, ev.x, ev.y, '#a9bcff', 14, 160);
      texto(ef, ev.x, ev.y - 40, 'ESCUDO!', '#a9bcff', 12, 0.8);
      tremer(ef, 0.12);
      return 0.05;
    case 'tiro':
      for (let i = 0; i < Math.max(1, Math.round(3 * ef.fator)); i++) {
        ef.particulas.push({ x: ev.x, y: ev.y, vx: (ef.rand() - 0.5) * 70, vy: -20 - ef.rand() * 40, vida: 0.15, max: 0.15, r: 1.4, cor: '#9ff6ff' });
      }
      return 0;
    case 'bomba':
      explosao(ef, ev.x, ev.y, '#ffb02e', 14, 150);
      return 0;
    case 'raio':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.25, raio: 30, cor: '#ff3b3b' });
      return 0;
    case 'teia':
      faiscas(ef, ev.x, ev.y, '#e6e6ff', 10, 90);
      texto(ef, ev.x, ev.y - 40, 'TEIA!', '#e6e6ff', 11, 0.7);
      return 0;
    case 'capsula':
      ef.ondas.push({ x: ev.x, y: ev.y + 20, t: 0, dur: 0.45, raio: 55, cor: CORES_CAPSULA[ev.capsula] || '#ffffff' });
      texto(ef, ev.x, ev.y - 20, NOMES_CAPSULA[ev.capsula] || '', CORES_CAPSULA[ev.capsula] || '#ffffff', 13, 1.1);
      return 0;
    case 'bomba_jogador':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.7, raio: 520, cor: '#ffe0a8' });
      ef.clarao = 0.25;
      ef.corClarao = '255,230,170';
      return 0.06;
    case 'meteoro_quebrou':
      quebrar(ef, ev.x, ev.y, '#8a6a52', 9, 1.2);
      faiscas(ef, ev.x, ev.y, '#ff9a3c', 12, 160);
      return 0;
    case 'meteoro_passou':
      return 0;
    case 'fugiram':
      texto(ef, ev.x, ev.y, 'AS NAVES FUGIRAM!', '#ffd45e', 16, 1.4);
      return 0;
    // chefões
    case 'casco':
      faiscas(ef, ev.x, ev.y, '#ffb02e', 4, 110);
      return 0;
    case 'dano_chefe':
      faiscas(ef, ev.x, ev.y, '#ffffff', 5, 120);
      return 0;
    case 'parte_caiu':
      explosao(ef, ev.x, ev.y, '#ff6a4c', 22, 210);
      quebrar(ef, ev.x, ev.y, '#57475f', 9, 1.1);
      tremer(ef, 0.2);
      return 0.06;
    case 'parte':
    case 'chefe_caiu':
      if (ev.pontos) texto(ef, ev.x, ev.y - 16, `+${ev.pontos}`, '#ffd45e', ev.tipo === 'chefe_caiu' ? 22 : 16, 1.3);
      return 0;
    case 'chefe_derrotado':
      explosao(ef, ev.x, ev.y, '#ffd45e', 60, 340);
      quebrar(ef, ev.x, ev.y, '#57475f', 22, 1.8);
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 1.1, raio: 420, cor: '#ffffff' });
      tremer(ef, 0.6);
      ef.clarao = 0.6;
      ef.corClarao = '255,230,190';
      texto(ef, ev.x, ev.y + 60, 'CHEFÃO DERROTADO!', '#ffd45e', 20, 2);
      return 0.3;
    case 'salto':
      return 0;
    case 'fase':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.9, raio: 260, cor: '#ffd45e' });
      return 0;
    case 'vida':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.7, raio: 90, cor: '#7dff9a' });
      texto(ef, ev.x, ev.y - 44, '+1 NAVE', '#7dff9a', 13, 1.1);
      return 0;
    // esquadrão (Etapa 4)
    case 'resgate':
      ef.ondas.push({ x: ev.x, y: ev.y, t: 0, dur: 0.8, raio: 110, cor: '#7dff9a' });
      texto(ef, ev.x, ev.y - 50, 'RESGATE!', '#7dff9a', 15, 1.3);
      return 0;
    case 'caiu':
      texto(ef, ev.x, ev.y - 64, 'PASSE POR CIMA PARA SALVAR', '#ff8fb8', 10, 2);
      return 0;
    default:
      return 0;
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
  for (const p of ef.pedacos) {
    p.vida -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 260 * dt; // os pedaços caem
    p.vx *= 1 - Math.min(1, 1.2 * dt);
    p.ang += p.va * dt;
  }
  ef.pedacos = ef.pedacos.filter((p) => p.vida > 0);
  for (const o of ef.ondas) o.t += dt;
  ef.ondas = ef.ondas.filter((o) => o.t < o.dur);
  for (const t of ef.textos) {
    t.vida -= dt;
    t.y -= 38 * dt;
  }
  ef.textos = ef.textos.filter((t) => t.vida > 0);
  ef.tremor = Math.max(0, ef.tremor - dt);
  ef.clarao = Math.max(0, ef.clarao - dt);
}

// Enquanto o chefão cai: explosões pipocando pelo corpo dele.
export function chefeExplodindo(ef, x, y, larg, dt) {
  const r = ef.rand;
  if (r() < dt * 14) {
    const ex = x + (r() - 0.5) * larg;
    const ey = y + (r() - 0.5) * 60;
    explosao(ef, ex, ey, r() < 0.5 ? '#ff9a3c' : '#ffd45e', 12, 150);
    if (r() < 0.4) quebrar(ef, ex, ey, '#3a2c44', 4, 1);
  }
}

// Faíscas saindo dos motores da nave do jogador.
export function rastroDoMotor(ef, x, y, dt) {
  const r = ef.rand;
  if (r() < dt * 40 * ef.fator) {
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
  // pedaços (sem brilho, por cima do fundo)
  for (const p of ef.pedacos) {
    const k = Math.max(0, p.vida / p.max);
    g.globalAlpha = Math.min(1, k * 1.6);
    g.fillStyle = p.cor;
    g.save();
    g.translate(p.x, p.y);
    g.rotate(p.ang);
    g.beginPath();
    g.moveTo(-p.tam, -p.tam * 0.6);
    g.lineTo(p.tam, -p.tam * 0.2);
    g.lineTo(-p.tam * 0.3, p.tam * 0.8);
    g.closePath();
    g.fill();
    g.restore();
  }
  g.globalAlpha = 1;
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
  // pontos e avisos subindo
  if (ef.textos.length) {
    g.save();
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    for (const t of ef.textos) {
      const k = t.vida / t.max;
      g.globalAlpha = Math.min(1, k * 2.2);
      g.font = `900 ${t.tam}px ${FONTE}`;
      g.lineWidth = 3;
      g.strokeStyle = 'rgba(3,4,18,.85)';
      g.strokeText(t.txt, t.x, t.y);
      g.fillStyle = t.cor;
      g.fillText(t.txt, t.x, t.y);
    }
    g.restore();
    g.globalAlpha = 1;
  }
}
