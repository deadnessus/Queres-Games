// Formato do jogo salvo (só estado do jogo: números e códigos; nenhum texto livre, nenhum dado pessoal).
// Por enquanto guarda a mochila e o que foi construído. O resto do save (docs/4, seção 4.9) entra na Etapa 1.
// Sem DOM: dá para testar no Node. A leitura e a gravação no aparelho ficam em src/nucleo/save-local.js.
import { ITENS } from '../dados/itens.js';
import { MAX_POR_ITEM } from './inventario.js';

export const JOGO = 'rumo-a-terra';
export const VERSAO_SAVE = 1;
export const TIPOS_BLOCO = ['madeira', 'pedra', 'cristal'];
const MAX_BLOCOS = 3000, MAX_FOGUEIRAS = 40;

const inteiro = (v, a, b) => Number.isInteger(v) && v >= a && v <= b;

export function montarSave({ inventario, blocos, fogueiras, tempoJogado = 0, pos = null }) {
  return {
    jogo: JOGO,
    versao_save: VERSAO_SAVE,
    salvo_em: Math.floor(Date.now() / 1000),
    tempo_jogado_s: Math.floor(tempoJogado),
    inventario, // [[id, n]]
    blocos, // [[tipo, i, j, base em centímetros]]
    fogueiras, // [[x em cm, z em cm]]
    ...(pos ? { pos } : {}), // [x em cm, z em cm, rumo em graus]
  };
}

// Confere um save lido do aparelho. Devolve o save limpo ou null (estragado ou de outro jogo).
export function validarSave(s) {
  if (!s || typeof s !== 'object' || s.jogo !== JOGO || s.versao_save !== VERSAO_SAVE) return null;
  const inventario = Array.isArray(s.inventario)
    ? s.inventario.filter((e) => Array.isArray(e) && ITENS[e[0]] && inteiro(e[1], 1, MAX_POR_ITEM)).map(([id, n]) => [id, n])
    : [];
  const blocos = Array.isArray(s.blocos)
    ? s.blocos.slice(0, MAX_BLOCOS).filter((b) => Array.isArray(b) && TIPOS_BLOCO.includes(b[0]) && inteiro(b[1], -300, 300) && inteiro(b[2], -300, 300) && inteiro(b[3], -10000, 100000))
      .map(([t, i, j, base]) => [t, i, j, base])
    : [];
  const fogueiras = Array.isArray(s.fogueiras)
    ? s.fogueiras.slice(0, MAX_FOGUEIRAS).filter((f) => Array.isArray(f) && inteiro(f[0], -30000, 30000) && inteiro(f[1], -30000, 30000)).map(([x, z]) => [x, z])
    : [];
  const pos = Array.isArray(s.pos) && s.pos.length === 3 && inteiro(s.pos[0], -30000, 30000) && inteiro(s.pos[1], -30000, 30000) && inteiro(s.pos[2], -720, 720)
    ? [s.pos[0], s.pos[1], s.pos[2]] : null;
  return {
    jogo: JOGO, versao_save: VERSAO_SAVE, pos,
    salvo_em: inteiro(s.salvo_em, 0, 1e11) ? s.salvo_em : 0,
    tempo_jogado_s: inteiro(s.tempo_jogado_s, 0, 1e9) ? s.tempo_jogado_s : 0,
    inventario, blocos, fogueiras,
  };
}
