// Cápsulas: caem às vezes de inimigos derrubados e a nave pega encostando nelas (combina com "só esquerda e
// direita"). Somem se ninguém pegar. Sem tela nem canvas (testado com node --test).
import * as L from './logica.js?v=11';
import { CAPSULA, CAPSULAS } from './dados.js?v=11';

export const capsulaPorId = (id) => CAPSULAS.find((c) => c.id === id);

// Sorteia o tipo pelo peso de cada uma. `semEnergia`: na chuva de meteoros a energia aumentaria a chuva.
export function sortearCapsula(p, semEnergia = false) {
  const lista = semEnergia ? CAPSULAS.filter((c) => c.id !== 'energia') : CAPSULAS;
  const total = lista.reduce((s, c) => s + c.peso, 0);
  let r = p.rand() * total;
  for (const c of lista) {
    r -= c.peso;
    if (r < 0) return c.id;
  }
  return lista[lista.length - 1].id;
}

export function soltarCapsula(p, x, y, tipo) {
  const cx = L.clamp(x, 20, L.LARGURA - 20);
  p.capsulas.push({ tipo, x: cx, y, xa: cx, ya: y, t: 0 });
}

// Um inimigo caiu: às vezes ele solta uma cápsula (no máximo CAPSULA.maxNaTela caindo ao mesmo tempo).
export function talvezSoltarCapsula(p, x, y) {
  if (p.capsulas.length >= CAPSULA.maxNaTela) return;
  if (p.rand() >= CAPSULA.chance) return;
  soltarCapsula(p, x, y, sortearCapsula(p));
}

// As cápsulas caem em tempo normal (mesmo na câmera lenta). Devolve as que a nave pegou neste passo.
export function moverCapsulas(p, d) {
  const pegas = [];
  p.capsulas = p.capsulas.filter((c) => {
    c.y += CAPSULA.vel * d;
    c.t += d;
    if (!p.caido && Math.abs(c.x - p.jx) < 26 && Math.abs(c.y - L.Y_JOGADOR) < 28) {
      pegas.push(c);
      return false;
    }
    // esquadrão (Etapa 4): um colega pegou
    const a = p.aliados && p.aliados.find((x) => !x.caido && Math.abs(c.x - x.x) < 26 && Math.abs(c.y - L.Y_JOGADOR) < 28);
    if (a) {
      c.quem = a;
      pegas.push(c);
      return false;
    }
    return c.y < L.ALTURA + 20;
  });
  return pegas;
}

export function aplicarCapsula(p, c) {
  const def = capsulaPorId(c.tipo);
  const pod = p.poderes;
  switch (c.tipo) {
    case 'duplo':
    case 'leque':
      pod.arma = c.tipo; // uma arma por vez: a nova troca a anterior
      pod.armaT = def.segundos;
      break;
    case 'escudo':
      pod.escudo = true;
      break;
    case 'energia':
      // a barra não passa do máximo da onda (o servidor confere o bônus de energia por esse máximo)
      if (p.onda.especie !== 'meteoros') p.energia = Math.min(p.energiaMax, p.energia + def.segundos);
      break;
    case 'lento':
      pod.lento = def.segundos;
      break;
    case 'bomba':
      // apaga os tiros inimigos da tela e corta os raios que estão disparando
      p.disparos = [];
      for (const n of p.naves) if (n.ataque && n.ataque.fase === 'raio') n.ataque = null;
      p.eventos.push({ tipo: 'bomba_jogador', x: p.jx, y: L.Y_JOGADOR });
      break;
    default:
  }
  p.stats.capsulas++;
  p.stats.capsulasTipos |= 1 << CAPSULAS.findIndex((x) => x.id === c.tipo);
  p.eventos.push({ tipo: 'capsula', x: c.x, y: L.Y_JOGADOR - 30, capsula: c.tipo });
}

export function atualizarPoderes(p, d) {
  const pod = p.poderes;
  pod.armaT = Math.max(0, pod.armaT - d);
  if (pod.armaT <= 0) pod.arma = null;
  pod.lento = Math.max(0, pod.lento - d);
  pod.teia = Math.max(0, pod.teia - d);
}
