// Ondas especiais: a chuva de meteoros (só desviar; cada meteoro que passa vale pontos). A onda bônus (inimigos
// que não atiram e valem o dobro) é uma onda comum com outros números, em dados.js e motor.js.
// Sem tela nem canvas (testado com node --test).
import * as L from './logica.js?v=11';
import { METEOROS, MODOS } from './dados.js?v=11';

export function comecarMeteoros(p) {
  p.meteoros = [];
  p.proximoMeteoro = 0.2;
  p.presente = METEOROS.duracao / 2; // no meio da chuva cai uma cápsula de presente
}

function intervalo(p) {
  const M = METEOROS;
  const base = M.intervaloMin + p.rand() * (M.intervaloMax - M.intervaloMin) + M.intervaloPorVolta * p.onda.volta;
  return Math.max(M.intervaloMinimo, base) * ((MODOS[p.modo] || MODOS.normal).meteoros || 1);
}

function novoMeteoro(p) {
  const M = METEOROS;
  const r = M.raioMin + p.rand() * (M.raioMax - M.raioMin);
  const x = 24 + p.rand() * (L.LARGURA - 48);
  const fator = (MODOS[p.modo] || MODOS.normal).velDisparo; // no Recruta os meteoros caem mais devagar
  const vy = (M.velMin + p.rand() * (M.velMax - M.velMin) + M.velPorVolta * p.onda.volta) * fator;
  const vx = (p.rand() - 0.5) * 60;
  // `aviso`: o lugar onde ele vai entrar pisca antes; só depois ele começa a cair
  return { x, y: 58, xa: x, ya: 58, vx, vy, r, aviso: M.aviso, giro: p.rand() * Math.PI * 2, vg: (p.rand() - 0.5) * 3, passou: false };
}

// Anda a chuva (`de` já vem mais lento na câmera lenta). Devolve se algum meteoro acertou a nave e quantos passaram.
export function atualizarMeteoros(p, de) {
  let atingiu = false;
  let passaram = 0;
  if (p.energia > 0) {
    p.proximoMeteoro -= de;
    if (p.proximoMeteoro <= 0) {
      p.meteoros.push(novoMeteoro(p));
      p.proximoMeteoro = intervalo(p);
    }
  }
  for (const m of p.meteoros) {
    if (m.aviso > 0) {
      m.aviso -= de;
      continue;
    }
    m.x += m.vx * de;
    m.y += m.vy * de;
    m.giro += m.vg * de;
    if (m.passou) continue;
    if (!p.caido && p.invulneravel <= 0 && Math.hypot(m.x - p.jx, m.y - L.Y_JOGADOR) < m.r + 10) {
      m.quebrou = true;
      atingiu = true;
      p.eventos.push({ tipo: 'meteoro_quebrou', x: m.x, y: m.y, r: m.r });
    } else if (m.y - m.r > L.Y_JOGADOR + 20) {
      m.passou = true;
      passaram++;
      p.eventos.push({ tipo: 'meteoro_passou', x: m.x, y: L.Y_JOGADOR + 30 });
    }
  }
  p.meteoros = p.meteoros.filter((m) => !m.quebrou && m.y - m.r < L.ALTURA + 30);
  return { atingiu, passaram };
}
