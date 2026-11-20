// Lê e grava as opções do jogador neste aparelho (localStorage, com chave própria; nunca .clear()).
// Nada disso vai para servidor nenhum.
import { validarConfig } from '../logica/config.js';

const CHAVE = 'rumo-a-terra:config';

export function carregarConfig() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    return validarConfig(bruto ? JSON.parse(bruto) : null);
  } catch (e) {
    return validarConfig(null); // aba privada ou armazenamento bloqueado: usa o padrão
  }
}

export function salvarConfig(config) {
  try { localStorage.setItem(CHAVE, JSON.stringify(validarConfig(config))); } catch (e) { /* sem armazenamento: segue sem salvar */ }
}

// Parâmetros do endereço para testes: ?debug=1, ?visual=liso|pixelado, ?hora=0.7
export function parametros() {
  const p = new URLSearchParams(location.search);
  const hora = parseFloat(p.get('hora'));
  return {
    debug: p.get('debug') === '1',
    visual: ['liso', 'pixelado'].includes(p.get('visual')) ? p.get('visual') : null,
    hora: Number.isFinite(hora) ? ((hora % 1) + 1) % 1 : null,
  };
}
