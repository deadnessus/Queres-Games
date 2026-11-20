// Mapa do Vale (botão 🗺️): o Vale visto de cima, gerado a partir do relevo, com você, a nave e as fogueiras.
// O norte (onde fica o Colosso) é para cima. O mundo dá a volta: as bordas do mapa se encontram.
import { embrulhar } from '../logica/toro.js';

export function criarMapa({ grade, terreno, recursos }) {
  const T = grade.tamanho;
  const LADO = 256; // pixels da imagem do relevo
  const base = document.createElement('canvas');
  base.width = base.height = LADO;
  const g = base.getContext('2d');
  const img = g.createImageData(LADO, LADO);
  const passo = (grade.n - 1) / LADO;
  for (let py = 0; py < LADO; py++) {
    for (let px = 0; px < LADO; px++) {
      const hex = terreno.corDoMapa(Math.floor(px * passo), Math.floor(py * passo));
      const k = (py * LADO + px) * 4;
      img.data[k] = (hex >> 16) & 255; img.data[k + 1] = (hex >> 8) & 255; img.data[k + 2] = hex & 255; img.data[k + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  // árvores e pedras grandes
  for (const r of recursos.lista) {
    if (r.tipo !== 'arvore' && r.tipo !== 'pedraGrande') continue;
    const px = ((r.x + T / 2) / T) * LADO, py = ((r.z + T / 2) / T) * LADO;
    g.fillStyle = r.tipo === 'arvore' ? '#5a1430' : '#9a94b0';
    g.fillRect(Math.round(px) - 1, Math.round(py) - 1, 2, 2);
  }

  // Desenha o mapa no canvas da tela, com as marcas por cima.
  function desenhar(canvas, { jogador, nave, fogueiras, blocos }) {
    const ctx = canvas.getContext('2d');
    const L = canvas.width;
    const paraTela = (x, z) => [((embrulhar(x, T) + T / 2) / T) * L, ((embrulhar(z, T) + T / 2) / T) * L];
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(base, 0, 0, L, L);
    const e = L / 512; // escala das marcas
    // construções
    ctx.fillStyle = '#c98a4a';
    for (const b of blocos) { const [x, y] = paraTela(b.i + 0.5, b.j + 0.5); ctx.fillRect(x - 1.5 * e, y - 1.5 * e, 3 * e, 3 * e); }
    // fogueiras
    for (const f of fogueiras) {
      const [x, y] = paraTela(f.x, f.z);
      ctx.fillStyle = '#ff8a2a'; ctx.beginPath(); ctx.arc(x, y, 5 * e, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ffe07a'; ctx.beginPath(); ctx.arc(x, y, 2.5 * e, 0, Math.PI * 2); ctx.fill();
    }
    // a nave
    const [nx, ny] = paraTela(nave.x, nave.z);
    ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#1f2f5c'; ctx.lineWidth = 3 * e;
    ctx.beginPath(); ctx.moveTo(nx, ny + 9 * e); ctx.lineTo(nx - 8 * e, ny - 7 * e); ctx.lineTo(nx + 8 * e, ny - 7 * e); ctx.closePath(); ctx.stroke(); ctx.fill();
    ctx.font = `bold ${Math.round(15 * e)}px system-ui, sans-serif`; ctx.textAlign = 'center';
    ctx.lineWidth = 4 * e; ctx.strokeStyle = 'rgba(0,0,0,0.75)'; ctx.strokeText('Andorinha', nx, ny - 13 * e);
    ctx.fillStyle = '#ffe2b8'; ctx.fillText('Andorinha', nx, ny - 13 * e);
    // você (seta para onde está olhando)
    const [jx, jy] = paraTela(jogador.pos.x, jogador.pos.z);
    ctx.save();
    ctx.translate(jx, jy);
    ctx.rotate(jogador.rumo);
    ctx.fillStyle = '#5ff0ff'; ctx.strokeStyle = '#04202a'; ctx.lineWidth = 3 * e;
    ctx.beginPath(); ctx.moveTo(0, -13 * e); ctx.lineTo(9 * e, 9 * e); ctx.lineTo(0, 4 * e); ctx.lineTo(-9 * e, 9 * e); ctx.closePath(); ctx.stroke(); ctx.fill();
    ctx.restore();
    ctx.lineWidth = 4 * e; ctx.strokeStyle = 'rgba(0,0,0,0.75)'; ctx.strokeText('você', jx, jy + 26 * e);
    ctx.fillStyle = '#5ff0ff'; ctx.fillText('você', jx, jy + 26 * e);
  }

  return { desenhar };
}
