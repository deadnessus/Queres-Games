// Tiros dos inimigos: tipos, movimento e acerto na nave do jogador. Sem tela nem canvas (testado com node --test).
// O que acontece quando um tiro acerta (perder vida, ficar lento) é decidido em motor.js.
import * as L from './logica.js?v=11';

// Área de acerto de cada tipo de tiro na nave: meia largura e meia altura.
//   reto: plasma comum · ferrao: da vespa, rápido · bomba: estoura em 3 estilhaços perto do chão
//   teia: deixa a nave lenta · guiado: lento, segue a nave
export const ALCANCE = {
  reto: [17, 22],
  ferrao: [12, 20],
  bomba: [18, 22],
  estilhaco: [13, 16],
  teia: [20, 22],
  guiado: [15, 19],
};

export function novoTiro(tipo, x, y, vx, vy, extra = {}) {
  return { tipo, x, y, xa: x, ya: y, vx, vy, ...extra };
}

// Move os tiros (`de` já vem mais lento na câmera lenta). A bomba estoura em 3 estilhaços ao chegar na altura dela.
export function moverTiros(p, de) {
  let novos = null;
  for (const s of p.disparos) {
    s.t = (s.t || 0) + de;
    if (s.tipo === 'guiado' && s.t < L.GUIADO_SEG && s.y < L.Y_JOGADOR - 30) {
      // vira aos poucos para o lado da nave, sem passar de GUIADO_VX: quem anda desvia
      const alvo = L.clamp((L.alvoX(p) - s.x) * 2, -L.GUIADO_VX, L.GUIADO_VX);
      s.vx += L.clamp(alvo - s.vx, -L.GUIADO_CURVA * de, L.GUIADO_CURVA * de);
    }
    s.x += s.vx * de;
    s.y += s.vy * de;
    if (s.tipo === 'bomba' && s.y >= s.estoura) {
      s.fora = true;
      novos = novos || [];
      for (const vx of [-110, 0, 110]) novos.push(novoTiro('estilhaco', s.x, s.y, vx, vx ? 150 : 185));
      p.eventos.push({ tipo: 'bomba', x: s.x, y: s.y });
    }
  }
  p.disparos = p.disparos.filter((s) => !s.fora && s.y < L.ALTURA + 20 && s.x > -30 && s.x < L.LARGURA + 30);
  if (novos) p.disparos.push(...novos);
}

// O tiro está encostando na nave do jogador (que fica em `jx`, na altura Y_JOGADOR)?
export function tiroNaNave(s, jx) {
  const [rx, ry] = ALCANCE[s.tipo] || ALCANCE.reto;
  return Math.abs(s.x - jx) < rx && Math.abs(s.y - L.Y_JOGADOR) < ry;
}
