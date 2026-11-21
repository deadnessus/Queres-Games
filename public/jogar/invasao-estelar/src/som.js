// Sons feitos no código (Web Audio), sem arquivos de áudio. Efeitos e música ligam e desligam separados, e a
// escolha fica salva no aparelho. A música em si fica em musica.js.
const LS_EFEITOS = 'invasao_estelar_efeitos';
const LS_MUSICA = 'invasao_estelar_musica';
const LS_ANTIGO = 'invasao_estelar_som'; // antes havia um botão só para tudo

let ctx = null;
let ruido = null;
let saidaMusica = null;
let efeitos = true;
let musica = true;

try {
  const antigo = localStorage.getItem(LS_ANTIGO) === 'desligado';
  const e = localStorage.getItem(LS_EFEITOS);
  const m = localStorage.getItem(LS_MUSICA);
  efeitos = e ? e === 'ligado' : !antigo;
  musica = m ? m === 'ligado' : !antigo;
} catch (e) { /* sem armazenamento */ }

function guardar(chave, ligado) {
  try { localStorage.setItem(chave, ligado ? 'ligado' : 'desligado'); } catch (e) { /* sem armazenamento */ }
}

export const efeitosLigados = () => efeitos;
export const musicaLigada = () => musica;

export function alternarEfeitos() {
  efeitos = !efeitos;
  guardar(LS_EFEITOS, efeitos);
  return efeitos;
}

export function alternarMusica() {
  musica = !musica;
  guardar(LS_MUSICA, musica);
  return musica;
}

// O navegador só deixa tocar som depois de um toque da pessoa: crie o contexto no primeiro toque.
export function liberarSom() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  const n = ctx.sampleRate * 0.3;
  ruido = ctx.createBuffer(1, n, ctx.sampleRate);
  const dados = ruido.getChannelData(0);
  for (let i = 0; i < n; i++) dados[i] = (Math.random() * 2 - 1) * (1 - i / n);
  saidaMusica = ctx.createGain();
  saidaMusica.gain.value = 0.55;
  saidaMusica.connect(ctx.destination);
}

// Para a música (musica.js): o contexto, o ruído (bateria) e a saída com o volume da música.
export const audio = () => (ctx && ctx.state === 'running' ? { ctx, ruido, saida: saidaMusica } : null);

function tom(tipo, freq, fim, dur, vol, atraso = 0) {
  const t0 = ctx.currentTime + atraso;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = tipo;
  o.frequency.setValueAtTime(freq, t0);
  o.frequency.exponentialRampToValueAtTime(fim, t0 + dur);
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.02);
}

// Chiado (ruído) passando por um filtro: explosões graves, estrondos e o salto.
function chiado(dur, freq, vol, tipo = 'lowpass', atraso = 0) {
  const t0 = ctx.currentTime + atraso;
  const s = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const g = ctx.createGain();
  s.buffer = ruido;
  f.type = tipo;
  f.frequency.value = freq;
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  s.connect(f).connect(g).connect(ctx.destination);
  s.start(t0);
  s.stop(t0 + dur + 0.02);
}

const arpejo = (notas, tipo, vol, passo = 0.06, dur = 0.09) => notas.forEach((f, i) => tom(tipo, f, f, dur, vol, i * passo));

// Um som para cada cápsula: dá para saber o que pegou sem olhar.
const SOM_CAPSULA = {
  duplo: () => arpejo([660, 990], 'square', 0.06),
  leque: () => arpejo([660, 880, 1320], 'square', 0.055, 0.045),
  escudo: () => { tom('sine', 520, 1040, 0.25, 0.12); tom('triangle', 1560, 1560, 0.12, 0.05, 0.12); },
  energia: () => arpejo([523, 659, 784, 1047], 'triangle', 0.1, 0.05),
  lento: () => { tom('sine', 900, 300, 0.5, 0.12); tom('sine', 450, 150, 0.5, 0.06); },
  bomba: () => { chiado(0.6, 400, 0.3); tom('sine', 200, 55, 0.6, 0.18); },
};

// Um som para cada ataque dos inimigos.
const SOM_DISPARO = {
  reto: () => tom('sawtooth', 340, 120, 0.2, 0.05),
  duplo: () => { tom('sawtooth', 380, 140, 0.16, 0.045); tom('sawtooth', 300, 110, 0.16, 0.04, 0.03); },
  ferrao: () => tom('square', 1800, 600, 0.1, 0.04),
  bomba: () => tom('triangle', 220, 110, 0.35, 0.09),
  teia: () => tom('triangle', 500, 260, 0.2, 0.06),
  leque: () => { tom('sawtooth', 420, 160, 0.18, 0.04); tom('sawtooth', 340, 130, 0.18, 0.04, 0.02); tom('sawtooth', 280, 100, 0.18, 0.04, 0.04); },
  guiado: () => tom('sine', 300, 700, 0.3, 0.07),
};

const SONS = {
  tiro: () => tom('square', 1100, 260, 0.09, 0.06),
  explosao: () => {
    const s = ctx.createBufferSource();
    const g = ctx.createGain();
    s.buffer = ruido;
    g.gain.value = 0.22;
    s.connect(g).connect(ctx.destination);
    s.start();
  },
  disparo: (tiro) => (SOM_DISPARO[tiro] || SOM_DISPARO.reto)(),
  perdeu: () => tom('sawtooth', 300, 70, 0.45, 0.12),
  fase: () => { tom('triangle', 523, 523, 0.1, 0.12); tom('triangle', 659, 659, 0.1, 0.12, 0.09); tom('triangle', 784, 784, 0.16, 0.12, 0.18); },
  vida: () => { tom('sine', 660, 660, 0.1, 0.12); tom('sine', 880, 880, 0.14, 0.12, 0.1); },
  fim: () => tom('sawtooth', 220, 60, 0.7, 0.1),
  capsula: (tipo) => (SOM_CAPSULA[tipo] || SOM_CAPSULA.duplo)(),
  escudo: () => { tom('sine', 1400, 700, 0.25, 0.12); tom('triangle', 2100, 1500, 0.12, 0.05); },
  vidro: () => { tom('triangle', 2200, 1600, 0.08, 0.06); tom('triangle', 2600, 1900, 0.06, 0.05, 0.03); },
  dano: () => tom('square', 520, 300, 0.05, 0.04),
  furia: () => tom('sawtooth', 130, 70, 0.3, 0.09),
  bomba: () => chiado(0.35, 700, 0.25),
  carregando: () => tom('sine', 300, 1200, 0.85, 0.035), // a linha da sentinela ou do chefão piscando
  raio: () => tom('square', 1600, 200, 0.3, 0.06),
  teia: () => tom('triangle', 320, 180, 0.16, 0.09),
  ponto: () => tom('sine', 1320, 1320, 0.05, 0.025),
  combo: (n) => { const f = 440 * Math.pow(1.12, n); tom('triangle', f, f * 1.5, 0.09, 0.07); },
  bombaJogador: () => SOM_CAPSULA.bomba(),
  fugiram: () => tom('triangle', 784, 392, 0.4, 0.08),
  casco: () => tom('square', 2400, 1800, 0.04, 0.025), // tiro batendo no casco do chefão
  parte: () => { chiado(0.5, 900, 0.3); tom('sawtooth', 180, 60, 0.4, 0.1); },
  chefeCaiu: () => { chiado(1.2, 600, 0.35); tom('sawtooth', 160, 40, 1.2, 0.14); tom('sine', 90, 30, 1.4, 0.2, 0.1); },
  salto: () => { tom('sine', 120, 1600, 1.2, 0.12); chiado(1.3, 3000, 0.08, 'highpass'); },
};

export function tocar(nome, arg) {
  if (!efeitos || !ctx || ctx.state !== 'running' || !SONS[nome]) return;
  SONS[nome](arg);
}

export function vibrar(ms) {
  if (efeitos && navigator.vibrate) navigator.vibrate(ms);
}
