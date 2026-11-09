// Apelidos das contas do queres.games: sempre "Bicho Qualidade" (30 x 10 = 300), sem texto livre,
// para nunca aparecer nome de criança no ranking. Se os 300 acabarem, entram variantes com número
// ("Lobo Azul 2"). Esta lista só é usada no servidor; o banco guarda os apelidos já escolhidos.

export const BICHOS = [
  'Lobo', 'Tigre', 'Leão', 'Urso', 'Falcão', 'Gavião', 'Coruja', 'Raposa', 'Golfinho', 'Tubarão',
  'Baleia', 'Panda', 'Coelho', 'Gato', 'Cavalo', 'Dragão', 'Fênix', 'Onça', 'Jacaré', 'Tucano',
  'Arara', 'Capivara', 'Lontra', 'Pinguim', 'Foca', 'Polvo', 'Tartaruga', 'Camaleão', 'Canguru', 'Esquilo',
];

// Só qualidades que não mudam com o gênero do bicho (Lobo Azul, Onça Azul).
export const QUALIDADES = [
  'Azul', 'Verde', 'Laranja', 'Rosa', 'Lilás', 'Turquesa', 'Veloz', 'Valente', 'Ágil', 'Brilhante',
];

export const BASE = BICHOS.flatMap((b) => QUALIDADES.map((q) => `${b} ${q}`));
const BASE_SET = new Set(BASE);
export const MAX_VARIANTE = 999;

export function apelidoValido(apelido) {
  if (typeof apelido !== 'string') return false;
  if (BASE_SET.has(apelido)) return true;
  const m = /^(.+) (\d{1,3})$/.exec(apelido);
  return !!m && BASE_SET.has(m[1]) && +m[2] >= 2 && +m[2] <= MAX_VARIANTE && String(+m[2]) === m[2];
}

function embaralhar(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Devolve `n` apelidos livres, em ordem aleatória. `ocupados` é um Set com os já escolhidos.
export function sugerir(ocupados, n = 20) {
  const livres = embaralhar(BASE.filter((a) => !ocupados.has(a)));
  const saida = livres.slice(0, n);
  const jaSugeridos = new Set(saida);
  // acabaram os 300: oferece variantes com número
  for (let tentativas = 0; saida.length < n && tentativas < 5000; tentativas++) {
    const base = BASE[Math.floor(Math.random() * BASE.length)];
    const numero = 2 + Math.floor(Math.random() * (MAX_VARIANTE - 1));
    const apelido = `${base} ${numero}`;
    if (!ocupados.has(apelido) && !jaSugeridos.has(apelido)) {
      saida.push(apelido);
      jaSugeridos.add(apelido);
    }
  }
  return saida;
}
