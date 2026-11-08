// Partículas: poeira, pedaços de grama, faíscas e confete. Só visual; usa Math.random de propósito
// para não mexer na sequência de sorteios do jogo (que pode ser fixada com ?seed=).
const TAU = Math.PI * 2;
const MAX = 260;

const rnd = (a, b) => a + Math.random() * (b - a);
const escolher = (lista) => lista[Math.floor(Math.random() * lista.length)];

const CORES_GRAMA = ['#2B7A3F', '#4C9A3E', '#7DB84A', '#5B4A2B', '#8A6B3A'];
const CORES_CONFETE = ['#FFD23F', '#FFFFFF', '#39C16C', '#2F7BFF', '#FF7A2F', '#E94BA8'];

export function criarParticulas() {
  const lista = [];

  function add(p) {
    if (lista.length >= MAX) lista.shift();
    lista.push(p);
  }

  return {
    get total() {
      return lista.length;
    },

    // nuvem de poeira que cresce e some
    poeira(x, y, n = 8, forca = 1, cor = '230,240,215') {
      for (let i = 0; i < n; i++) {
        const a = rnd(0, TAU);
        const v = rnd(8, 34) * forca;
        add({ tipo: 'poeira', x: x + rnd(-4, 4), y: y + rnd(-3, 3), vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rnd(2.5, 4.5), cresce: rnd(10, 18), vida: 0, max: rnd(0.45, 0.8), arrasto: 2.6, cor, alfa: 0.38 });
      }
    },

    // pedaços de grama arrancados
    grama(x, y, n = 10, forca = 1) {
      for (let i = 0; i < n; i++) {
        const a = rnd(0, TAU);
        const v = rnd(30, 110) * forca;
        add({ tipo: 'bit', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rnd(0.9, 1.9), vida: 0, max: rnd(0.35, 0.7), arrasto: 3.2, cor: escolher(CORES_GRAMA), rot: rnd(0, TAU), vrot: rnd(-12, 12) });
      }
    },

    // gramas minúsculas que ficam para trás ao correr
    pisada(x, y) {
      add({ tipo: 'bit', x: x + rnd(-6, 6), y: y + rnd(-1, 3), vx: rnd(-10, 10), vy: rnd(20, 50), r: rnd(0.7, 1.3), vida: 0, max: rnd(0.25, 0.45), arrasto: 2, cor: escolher(CORES_GRAMA), rot: rnd(0, TAU), vrot: rnd(-8, 8) });
    },

    faiscas(x, y, n = 12, cores = ['#FFD23F', '#FFFFFF']) {
      for (let i = 0; i < n; i++) {
        const a = rnd(0, TAU);
        const v = rnd(50, 150);
        add({ tipo: 'faisca', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: rnd(1.1, 2.2), vida: 0, max: rnd(0.3, 0.6), arrasto: 3.4, cor: escolher(cores) });
      }
    },

    confete(x, y, n = 60) {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + rnd(-1.25, 1.25);
        const v = rnd(80, 260);
        add({ tipo: 'confete', x: x + rnd(-30, 30), y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, w: rnd(3.4, 6), h: rnd(1.8, 3), vida: 0, max: rnd(1.4, 2.3), arrasto: 1.7, deriva: rnd(14, 34), cor: escolher(CORES_CONFETE), rot: rnd(0, TAU), vrot: rnd(-10, 10) });
      }
    },

    atualizar(dt) {
      for (let i = lista.length - 1; i >= 0; i--) {
        const p = lista[i];
        p.vida += dt;
        if (p.vida >= p.max) {
          lista.splice(i, 1);
          continue;
        }
        const k = Math.exp(-p.arrasto * dt);
        p.vx *= k;
        p.vy *= k;
        if (p.deriva) p.vy += p.deriva * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.vrot) p.rot += p.vrot * dt;
        if (p.cresce) p.r += p.cresce * dt;
      }
    },

    desenhar(ctx) {
      for (const p of lista) {
        const u = p.vida / p.max;
        const fade = 1 - u;
        if (p.tipo === 'poeira') {
          ctx.fillStyle = `rgba(${p.cor},${(p.alfa * fade * fade).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, TAU);
          ctx.fill();
        } else if (p.tipo === 'bit') {
          ctx.save();
          ctx.globalAlpha = Math.min(1, fade * 1.6);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.cor;
          ctx.fillRect(-p.r, -p.r * 0.5, p.r * 2, p.r);
          ctx.restore();
        } else if (p.tipo === 'faisca') {
          ctx.globalAlpha = Math.min(1, fade * 1.8);
          ctx.fillStyle = p.cor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * (0.5 + fade * 0.5), 0, TAU);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else if (p.tipo === 'confete') {
          ctx.save();
          ctx.globalAlpha = Math.min(1, fade * 2.2);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, Math.abs(Math.cos(p.vida * 9 + p.rot)) * 0.8 + 0.2);
          ctx.fillStyle = p.cor;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
    },

    limpar() {
      lista.length = 0;
    },
  };
}
