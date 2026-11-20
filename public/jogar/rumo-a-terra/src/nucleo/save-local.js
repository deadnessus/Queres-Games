// Guarda o jogo neste aparelho (localStorage, chave própria; nunca .clear()). Nada vai para servidor.
import { validarSave } from '../logica/save.js';

const CHAVE = 'rumo-a-terra:save:1';

export function carregarSave() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    return bruto ? validarSave(JSON.parse(bruto)) : null;
  } catch (e) {
    return null;
  }
}

export function gravarSave(save) {
  try { localStorage.setItem(CHAVE, JSON.stringify(save)); return true; } catch (e) { return false; }
}

export function apagarSave() {
  try { localStorage.removeItem(CHAVE); } catch (e) { /* nada */ }
}
