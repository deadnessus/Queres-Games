// Texturas do cenário, pré-desenhadas uma vez (por tamanho de tela) em canvas fora da tela.
import { criarRng } from './rng.js';

const TAU = Math.PI * 2;

function novoCanvas(larg, alt, px) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(larg * px);
  c.height = Math.ceil(alt * px);
  const g = c.getContext('2d');
  g.scale(px, px);
  return { c, g };
}

export const GRAMA = { largura: 360, altura: 160 };
export const TORCIDA = { largura: 360, altura: 72 };
export const PLACA = { altura: 14 };
export const LATERAL = { largura: 12, altura: 160 };

// Gramado com faixas de corte, ruído de folhas e manchas suaves. Repete a cada 160 unidades.
export function criarGrama(px) {
  const { c, g } = novoCanvas(GRAMA.largura, GRAMA.altura, px);
  const rng = criarRng(20240);
  for (let i = 0; i < 4; i++) {
    const clara = i % 2 === 1;
    const grad = g.createLinearGradient(0, i * 40, 0, i * 40 + 40);
    grad.addColorStop(0, clara ? '#38A358' : '#2D8949');
    grad.addColorStop(1, clara ? '#319A52' : '#27803F');
    g.fillStyle = grad;
    g.fillRect(0, i * 40, GRAMA.largura, 40);
  }
  // manchas largas, mais escuras ou mais claras
  for (let i = 0; i < 18; i++) {
    const x = rng() * GRAMA.largura;
    const y = rng() * GRAMA.altura;
    const r = 24 + rng() * 46;
    const escura = rng() < 0.6;
    for (const dy of [-GRAMA.altura, 0, GRAMA.altura]) {
      const rg = g.createRadialGradient(x, y + dy, 0, x, y + dy, r);
      rg.addColorStop(0, escura ? 'rgba(6,40,16,0.10)' : 'rgba(210,255,170,0.07)');
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg;
      g.fillRect(x - r, y + dy - r, r * 2, r * 2);
    }
  }
  // folhas de grama
  g.lineCap = 'round';
  g.lineWidth = 0.55;
  for (let i = 0; i < 4200; i++) {
    const x = rng() * GRAMA.largura;
    const y = rng() * GRAMA.altura;
    const len = 1.4 + rng() * 2.6;
    const ang = -Math.PI / 2 + (rng() - 0.5) * 0.9;
    g.strokeStyle = rng() < 0.5 ? 'rgba(220,255,190,0.10)' : 'rgba(4,38,14,0.13)';
    for (const dy of [0, GRAMA.altura, -GRAMA.altura]) {
      if (y + dy < -4 || y + dy > GRAMA.altura + 4) continue;
      g.beginPath();
      g.moveTo(x, y + dy);
      g.lineTo(x + Math.cos(ang) * len, y + dy + Math.sin(ang) * len);
      g.stroke();
    }
  }
  return c;
}

const CAMISAS = ['#FFD23F', '#FFD23F', '#FFD23F', '#1E8B4C', '#1E8B4C', '#2D5BD0', '#F2F2F2', '#D7263D', '#8E5BE0', '#2A2F3A'];
const PELES = ['#F3CDA8', '#E0A878', '#C58A5B', '#A06A42', '#6F4528'];

// Arquibancada: fileiras de torcedores. Repete a cada 72 unidades.
export function criarTorcida(px) {
  const { c, g } = novoCanvas(TORCIDA.largura, TORCIDA.altura, px);
  const rng = criarRng(777);
  g.fillStyle = '#0D141B';
  g.fillRect(0, 0, TORCIDA.largura, TORCIDA.altura);
  const passo = 9;
  for (let fila = 0; fila < 8; fila++) {
    const y = 4.5 + fila * passo;
    const desloc = (fila % 2) * (passo / 2);
    g.fillStyle = 'rgba(255,255,255,0.045)';
    g.fillRect(0, y + 4.4, TORCIDA.largura, 1);
    for (let x = desloc - passo; x < TORCIDA.largura + passo; x += passo) {
      const camisa = CAMISAS[Math.floor(rng() * CAMISAS.length)];
      const pele = PELES[Math.floor(rng() * PELES.length)];
      const jx = x + (rng() - 0.5) * 1.2;
      const braco = rng() < 0.08;
      g.fillStyle = camisa;
      g.beginPath();
      g.ellipse(jx, y + 2, 4.3, 3, 0, 0, TAU);
      g.fill();
      g.fillStyle = 'rgba(0,0,0,0.18)';
      g.beginPath();
      g.ellipse(jx + 1.1, y + 2.8, 3, 1.5, 0, 0, TAU);
      g.fill();
      g.fillStyle = pele;
      g.beginPath();
      g.arc(jx, y - 0.4, 2.4, 0, TAU);
      g.fill();
      g.fillStyle = rng() < 0.5 ? '#1B130E' : '#4A2E18';
      g.beginPath();
      g.arc(jx, y + 0.1, 2.2, Math.PI * 0.95, Math.PI * 2.05);
      g.fill();
      if (braco) {
        g.strokeStyle = pele;
        g.lineWidth = 1.2;
        g.lineCap = 'round';
        g.beginPath();
        g.moveTo(jx + 2.6, y + 0.8);
        g.lineTo(jx + 3.6, y - 2.4);
        g.stroke();
      }
    }
  }
  // véu escuro: a torcida é cenário e não deve brigar com o jogo
  g.fillStyle = 'rgba(8,14,24,0.34)';
  g.fillRect(0, 0, TORCIDA.largura, TORCIDA.altura);
  return c;
}

const ANUNCIOS = [
  { texto: 'GINGA', fundo: '#FFD23F', cor: '#0F2A19' },
  { texto: 'JOGA BONITO', fundo: '#1E8B4C', cor: '#FFFFFF' },
  { texto: 'BRASA', fundo: '#D7263D', cor: '#FFFFFF' },
  { texto: 'RODA DE BOLA', fundo: '#1F57B8', cor: '#FFFFFF' },
  { texto: 'GINGA', fundo: '#F4F7F2', cor: '#1F57B8' },
  { texto: 'SAMBA', fundo: '#8E5BE0', cor: '#FFFFFF' },
];

// Faixa de placas de publicidade atrás do gol.
export function criarPlacas(px, fonte) {
  const { c, g } = novoCanvas(360, PLACA.altura, px);
  const w = 360 / ANUNCIOS.length;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  ANUNCIOS.forEach((a, i) => {
    const grad = g.createLinearGradient(0, 0, 0, PLACA.altura);
    grad.addColorStop(0, a.fundo);
    grad.addColorStop(1, a.fundo);
    g.fillStyle = grad;
    g.fillRect(i * w, 0, w, PLACA.altura);
    g.fillStyle = 'rgba(255,255,255,0.18)';
    g.fillRect(i * w, 0, w, 2);
    g.fillStyle = 'rgba(0,0,0,0.28)';
    g.fillRect(i * w, PLACA.altura - 2, w, 2);
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.fillRect(i * w, 0, 1, PLACA.altura);
    g.font = `700 8.5px ${fonte}`;
    g.fillStyle = a.cor;
    g.fillText(a.texto, i * w + w / 2, PLACA.altura / 2 + 0.5);
  });
  return c;
}

// Placas laterais (ao longo da linha lateral), repetidas a cada 160 unidades.
export function criarLateral(px) {
  const { c, g } = novoCanvas(LATERAL.largura, LATERAL.altura, px);
  const cores = ['#FFD23F', '#1E8B4C', '#1F57B8', '#D7263D', '#F4F7F2', '#8E5BE0', '#FFD23F', '#1E8B4C'];
  const h = LATERAL.altura / cores.length;
  cores.forEach((cor, i) => {
    g.fillStyle = cor;
    g.fillRect(0, i * h, LATERAL.largura, h);
    g.fillStyle = 'rgba(255,255,255,0.2)';
    g.fillRect(0, i * h, LATERAL.largura, 1.4);
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.fillRect(0, i * h + h - 1.4, LATERAL.largura, 1.4);
    g.fillRect(LATERAL.largura - 2.5, i * h, 2.5, h);
  });
  return c;
}
