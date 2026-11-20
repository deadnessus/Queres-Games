// Laço do jogo: a lógica roda em passos fixos de 1/60 s (física sempre igual, em qualquer aparelho)
// e o desenho roda a cada quadro da tela (60 ou 120 por segundo), com interpolação entre os passos.
// Usa o tempo real decorrido: no modo de economia do iOS (30 quadros por segundo) o jogo anda na mesma velocidade.
export const PASSO = 1 / 60;
const MAX_PASSOS = 5; // se o aparelho travar, não tenta "alcançar" para sempre

export function criarLaco({ atualizar, desenhar }) {
  let rodando = false, ultimo = 0, acumulado = 0, pedido = 0;

  function quadro(agora) {
    if (!rodando) return;
    pedido = requestAnimationFrame(quadro);
    const dt = Math.min((agora - ultimo) / 1000, 0.25);
    ultimo = agora;
    acumulado += dt;
    let passos = 0;
    while (acumulado >= PASSO && passos < MAX_PASSOS) {
      atualizar(PASSO);
      acumulado -= PASSO;
      passos++;
    }
    if (passos === MAX_PASSOS) acumulado = 0;
    desenhar(acumulado / PASSO, dt);
  }

  return {
    iniciar() {
      if (rodando) return;
      rodando = true;
      ultimo = performance.now();
      acumulado = 0;
      pedido = requestAnimationFrame(quadro);
    },
    parar() {
      rodando = false;
      cancelAnimationFrame(pedido);
    },
    get rodando() { return rodando; },
  };
}
