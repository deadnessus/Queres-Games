// Contas dos controles de toque (sem DOM, testáveis no Node).

// Vetor do joystick a partir do deslocamento do dedo (em pixels, y da tela para baixo) em relação à base.
// Devolve { x, y, mag }: x para a direita, y para a frente (dedo para cima), mag de 0 a 1.
// Tem zona morta (o dedo parado perto do centro não anda) e uma curva leve para dar controle fino.
export function vetorJoystick(dx, dy, raio, zonaMorta = 0.12) {
  let mx = dx / raio, my = -dy / raio;
  const m = Math.hypot(mx, my);
  if (m < zonaMorta || m === 0) return { x: 0, y: 0, mag: 0 };
  const limitado = Math.min(m, 1);
  const curva = Math.pow((limitado - zonaMorta) / (1 - zonaMorta), 1.2);
  return { x: (mx / m) * curva, y: (my / m) * curva, mag: curva };
}

// Base que "segue" o dedo: se o dedo passa do raio, a base anda junto, para o dedo nunca "sair" do joystick.
export function seguirBase(baseX, baseY, dedoX, dedoY, raio) {
  const dx = dedoX - baseX, dy = dedoY - baseY;
  const d = Math.hypot(dx, dy);
  if (d <= raio) return [baseX, baseY];
  const k = (d - raio) / d;
  return [baseX + dx * k, baseY + dy * k];
}

// Graus por pixel ao arrastar para olhar, a partir da sensibilidade das opções (1 a 10).
export const grausPorPixel = (sensibilidade) => 0.08 + 0.04 * sensibilidade;

// Quanto girar (em radianos) para um arrasto de "px" pixels feito em "ms" milissegundos.
// Arrastos rápidos giram um pouco mais (aceleração), para virar de costas sem precisar de 2 arrastos.
export function giroDoArrasto(px, ms, sensibilidade, aceleracao = 0.8) {
  const vel = Math.abs(px) / Math.max(ms, 1); // pixels por milissegundo
  const fator = 1 + aceleracao * Math.min(Math.max((vel - 0.3) / 1.5, 0), 1);
  return px * grausPorPixel(sensibilidade) * fator * (Math.PI / 180);
}
