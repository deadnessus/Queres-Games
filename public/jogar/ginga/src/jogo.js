// Máquina de estados do jogo. Sem DOM: a interface conversa por `eventos`. Ver docs/ESPEC.md, seção 8.
import { CONFIG } from './config.js';
import * as R from './regras.js';
import { criarDuelo } from './duel.js';
import { criarBarra } from './shot.js';

const M = CONFIG.mundo;
const D = CONFIG.duelo;
const RAD = Math.PI / 180;

// Geometria do campo em unidades do mundo.
export const CAMPO = {
  traveEsq: 136,
  traveDir: 224,
  grandeArea: { largura: 240, profundidade: 200 },
  pequenaArea: { largura: 128, profundidade: 66 },
  penalti: 132,
  raioMeiaLua: 110,
  bolaAFrente: 40,
  profRede: 16,
};

export const NOME_DRIBLE = {
  DIREITA: 'drible pela direita',
  ESQUERDA: 'drible pela esquerda',
  CANETA: 'caneta',
  CHAPEU: 'chapéu',
  ELASTICO_DIR: 'elástico',
  ELASTICO_ESQ: 'elástico',
};

export const PASSOS_TUTORIAL = [
  {
    titulo: 'Toque à direita',
    texto: 'Um polegar na metade de baixo da tela, do lado direito.',
    aceita: (d) => d === 'DIREITA',
  },
  {
    titulo: 'Os dois juntos e solta',
    texto: 'Esquerda e direita ao mesmo tempo, e solte logo. É a caneta.',
    aceita: (d) => d === 'CANETA',
  },
  {
    titulo: 'Os dois juntos e segura',
    texto: 'Esquerda e direita ao mesmo tempo, segurando um instante. É o chapéu.',
    aceita: (d) => d === 'CHAPEU',
  },
  {
    titulo: 'Um lado e logo o outro',
    texto: 'Toque num lado e, logo depois, no outro. É o elástico.',
    aceita: (d) => d === 'ELASTICO_DIR' || d === 'ELASTICO_ESQ',
  },
];

export function dxPostura(postura) {
  if (postura === 'FECHA_ESQ') return -18;
  if (postura === 'FECHA_DIR') return 18;
  return 0;
}

const ease = (u) => u * u * (3 - 2 * u);
const lerp = (a, b, u) => a + (b - a) * u;
const aproximar = (v, alvo, passo) => (v < alvo ? Math.min(alvo, v + passo) : Math.max(alvo, v - passo));

function ladoDoDrible(drible) {
  if (drible === 'DIREITA' || drible === 'ELASTICO_DIR') return 1;
  if (drible === 'ESQUERDA' || drible === 'ELASTICO_ESQ') return -1;
  if (drible === 'CANETA' || drible === 'CHAPEU') return 1;
  return 0;
}

export class Jogo {
  constructor({ rng, eventos }) {
    this.rng = rng;
    this.ev = eventos;
    this.estado = 'MENU';
    this.modo = 'normal';
    this.dificuldade = 'facil';
    this.fase = 1;
    this.total = 0;
    this.distancia = 0;
    this.textos = [];
    this.historico = [];
    this.ultimoGesto = null;
    this.pts = { base: 0, bonus: 0, perfeitos: 0, dribles: 0 };
    this.vencidos = 0;
    this.params = R.parametrosDaFase(CONFIG, 'facil', 1);
    this.lt = R.linhaDoTempo(this.params.leitura, this.params.janela, D);
    this.limparJogada();
  }

  limparJogada() {
    this.duelo = null;
    this.passados = [];
    this.anim = null;
    this.jogDX = 0;
    this.bolaDX = 0;
    this.bolaEscala = 1;
    this.bolaDono = 'jogador';
    this.alvoDX = 0;
    this.alvoRot = 0;
    this.gingaLado = 0;
    this.distGol = null;
    this.goleiro = null;
    this.barra = null;
    this.chute = null;
    this.tackle = null;
    this.chegada = null;
    this.espera = 0;
    this.tEstado = 0;
  }

  mudarEstado(e) {
    this.estado = e;
    this.tEstado = 0;
  }

  // ---------- início de partida e fases ----------

  iniciar(dificuldade, modo = 'normal') {
    this.dificuldade = dificuldade;
    this.modo = modo;
    this.fase = 1;
    this.total = 0;
    this.historico = [];
    this.iniciarFase();
  }

  iniciarFase() {
    const treino = this.modo === 'treino';
    this.params = R.parametrosDaFase(CONFIG, treino ? 'facil' : this.dificuldade, treino ? 1 : this.fase);
    if (treino) this.params.dicas = true;
    this.lt = R.linhaDoTempo(this.params.leitura, this.params.janela, D);
    this.limparJogada();
    this.textos = [];
    this.pts = { base: 0, bonus: 0, perfeitos: 0, dribles: 0 };
    this.vencidos = 0;
    this.mudarEstado('CORRIDA');
    this.espera = 0.8;
  }

  proximaFase() {
    this.fase += 1;
    this.iniciarFase();
  }

  repetirFase() {
    this.iniciarFase();
  }

  irParaMenu() {
    this.limparJogada();
    this.textos = [];
    this.mudarEstado('MENU');
  }

  iniciarTutorial(dificuldade) {
    this.dificuldade = dificuldade;
    this.modo = 'tutorial';
    this.limparJogada();
    this.textos = [];
    this.passo = 0;
    this.passoFeito = false;
    this.mudarEstado('TUTORIAL');
  }

  pularTutorial() {
    if (this.estado === 'TUTORIAL') this.ev.tutorialFim(this.dificuldade);
  }

  // ---------- entrada ----------

  aceitaGestos() {
    if (this.estado === 'TUTORIAL') return !this.passoFeito;
    const d = this.duelo;
    return this.estado === 'DUELO' && !!d && !d.resultado && (d.aceita() || !!d.pendente);
  }

  inicioGesto(lado) {
    if (this.estado === 'TUTORIAL') {
      this.gingaLado = lado === 'D' ? 1 : -1;
      return;
    }
    if (this.estado !== 'DUELO' || !this.duelo) return;
    if (this.duelo.iniciarGesto()) this.gingaLado = lado === 'D' ? 1 : -1;
  }

  gesto(drible, info = {}) {
    this.ultimoGesto = { drible, t0: info.t0, t: info.t };
    if (this.estado === 'TUTORIAL') {
      this.gestoTutorial(drible);
      return;
    }
    if (this.estado !== 'DUELO' || !this.duelo) return;
    const r = this.duelo.resolver(drible);
    if (r) this.aoResolver(r);
  }

  cancelarGesto() {
    this.gingaLado = 0;
    if (this.duelo && !this.duelo.resultado) this.duelo.pendente = null;
  }

  chutar() {
    if (this.estado !== 'BARRA' || !this.barra) return;
    const res = this.barra.chutar(this.rng);
    const alvoX = R.pParaX(res.p, CONFIG.barra, CAMPO.traveEsq, CAMPO.traveDir);
    const g = this.goleiro;
    const keeperX = M.xCentro + g.dx;
    let mergulho;
    if (res.resultado === 'DEFESA') mergulho = alvoX - M.xCentro;
    else if (res.resultado === 'GOL') mergulho = g.dx + (alvoX > keeperX ? -26 : 26);
    else mergulho = g.dx + Math.sign(alvoX - keeperX || 1) * 16;
    g.mergulhoAlvo = mergulho;
    g.mergulho = g.dx;
    g.rotMergulho = 0;
    this.chute = { ...res, alvoX, t: 0, anunciado: false, origemX: M.xCentro + this.jogDX };
    this.bolaDono = 'chute';
    this.ev.vibrar(20);
    this.mudarEstado('CHUTE');
  }

  // ---------- textos na tela ----------

  texto(texto, sub = null, cor = '#FFD23F', dur = 0.8, sub2 = null) {
    this.textos = this.textos.filter((t) => t.tipo !== 'grande');
    this.textos.push({ tipo: 'grande', texto, sub, sub2, cor, dur, t: 0 });
  }

  // Quando o dedo encostou em relação à faixa verde do anel.
  quandoTocou(res, d) {
    if (!res.drible) return 'nao';
    if (res.tempo === 'TARDE') return 'tarde';
    if (res.tempo === 'CEDO') return 'cedo';
    if (res.tempo === 'PERFEITO') return 'certo';
    const centro = (d.lt.inicioJanela + d.lt.fimJanela) / 2;
    return res.ttcToque > centro ? 'poucoCedo' : 'poucoTarde';
  }

  faixa(texto, dur = 1.6) {
    this.textos = this.textos.filter((t) => t.tipo !== 'faixa');
    this.textos.push({ tipo: 'faixa', texto, dur, t: 0 });
  }

  // ---------- posições ----------

  // Distância do adversário do duelo atual à frente do jogador.
  alvoDist() {
    const d = this.duelo;
    if (!d) return null;
    if (d.tipo === 'defensor') return d.ttc * M.velocidade;
    return CAMPO.bolaAFrente + (d.distInicial - CAMPO.bolaAFrente) * (d.ttc / d.ttcInicial);
  }

  baseDXAlvo() {
    const d = this.duelo;
    if (!d) return 0;
    if (d.tipo === 'goleiro') return this.goleiro ? this.goleiro.dx : 0;
    return dxPostura(d.posturaReal);
  }

  velocidadeDoEstado() {
    const defensor = this.duelo && this.duelo.tipo === 'defensor';
    switch (this.estado) {
      case 'CORRIDA':
      case 'AREA':
        return M.velocidade;
      case 'DUELO':
      case 'DRIBLE_OK':
        return defensor ? M.velocidade : 0;
      case 'DESARME':
        return defensor && !this.tackle ? M.velocidade : 0;
      case 'BARRA':
        return M.velocidadeArea;
      case 'GOL_DE_PLACA':
        return this.chegada === null ? M.velocidade : 0;
      default:
        return 0;
    }
  }

  // ---------- laço ----------

  atualizar(dt) {
    this.tEstado += dt;
    for (const t of this.textos) t.t += dt;
    this.textos = this.textos.filter((t) => t.t < t.dur);

    if (this.estado === 'MENU') {
      this.distancia += 40 * dt;
      return;
    }
    if (this.estado === 'RESULTADO') return;

    const v = this.velocidadeDoEstado();
    const passo = v * dt;
    this.distancia += passo;
    if (this.distGol !== null) this.distGol -= passo;
    for (const p of this.passados) p.dist -= passo;
    this.passados = this.passados.filter((p) => p.dist > -600);
    const dtDuelo = this.duelo && this.duelo.tipo === 'defensor' ? passo / M.velocidade : dt;

    switch (this.estado) {
      case 'TUTORIAL':
        this.atualizarTutorial(dt);
        break;
      case 'CORRIDA':
        this.voltarAoCentro(dt);
        if (this.modo !== 'treino' && this.vencidos >= this.params.adversarios) {
          this.mudarEstado('AREA');
          break;
        }
        this.espera -= dt;
        if (this.espera <= 0) this.novoDefensor();
        break;
      case 'DUELO':
        this.duelo.atualizar(dtDuelo);
        if (!this.duelo.pendente && !this.aceitaGestos()) this.gingaLado = 0;
        this.jogDX = aproximar(this.jogDX, this.gingaLado * CONFIG.movimento.gingaDist, CONFIG.movimento.gingaVel * dt);
        this.bolaDX = this.jogDX;
        if (this.duelo.resultado) this.aoResolver(this.duelo.resultado);
        break;
      case 'DRIBLE_OK':
        this.duelo.atualizar(dtDuelo);
        this.animar();
        if (this.duelo.ttc <= -CONFIG.movimento.voltaTempo) this.fimDoDrible();
        break;
      case 'DESARME':
        this.atualizarDesarme(dt, dtDuelo);
        break;
      case 'AREA':
        this.voltarAoCentro(dt);
        if (this.distGol <= CAMPO.grandeArea.profundidade) this.iniciarBarra();
        break;
      case 'BARRA':
        this.voltarAoCentro(dt);
        this.barra.atualizar(dt);
        this.goleiro.avanco = M.saidaGoleiro * (this.barra.t / this.barra.duracao);
        if (this.barra.acabou()) this.iniciarBoteGoleiro();
        break;
      case 'CHUTE':
        this.atualizarChute(dt);
        break;
      case 'GOL_DE_PLACA':
        this.atualizarGolDePlaca(dt, passo);
        break;
      default:
        break;
    }
  }

  voltarAoCentro(dt) {
    this.jogDX = aproximar(this.jogDX, 0, CONFIG.movimento.voltaVel * dt);
    this.bolaDX = this.jogDX;
    this.bolaEscala = 1;
    this.alvoDX = 0;
    this.alvoRot = 0;
  }

  novoDefensor() {
    const mostrada = R.sortearPostura(this.rng, R.POSTURAS, this.historico);
    this.historico.push(mostrada);
    if (this.historico.length > 5) this.historico.shift();
    const real = this.rng() < this.params.finta ? R.sortearOutra(this.rng, R.POSTURAS, mostrada) : mostrada;
    this.duelo = criarDuelo({
      tipo: 'defensor',
      lt: this.lt,
      posturaMostrada: mostrada,
      posturaReal: real,
      matriz: CONFIG.matrizDefensor,
      cfgDuelo: D,
      rng: this.rng,
    });
    this.duelo.id = this.fase * 20 + this.vencidos; // só para variar a aparência
    if (this.modo === 'normal' && this.vencidos === this.params.adversarios - 1) {
      this.prepararArea(this.duelo.ttc * M.velocidade);
    }
    this.gingaLado = 0;
    this.mudarEstado('DUELO');
  }

  // A área fica 120 unidades depois do último defensor.
  prepararArea(distDefensor) {
    this.distGol = distDefensor + 120 + CAMPO.grandeArea.profundidade;
    let kc = 0.5;
    if (this.rng() < this.params.barra.chanceCanto) {
      kc += (this.rng() < 0.5 ? -1 : 1) * CONFIG.barra.desvioCanto;
    }
    this.goleiro = {
      kc,
      dx: R.pParaX(kc, CONFIG.barra, CAMPO.traveEsq, CAMPO.traveDir) - M.xCentro,
      avanco: 0,
    };
  }

  aoResolver(res) {
    this.ev.resetGestos();
    this.gingaLado = 0;
    const d = this.duelo;
    this.anim = {
      drible: res.drible,
      sucesso: res.sucesso,
      ttc0: Math.max(d.ttc, 0.05),
      dx0: this.jogDX,
      lado: ladoDoDrible(res.drible),
    };
    if (res.sucesso) {
      const textoTempo = res.tempo === 'PERFEITO' ? 'Perfeito!' : 'Por pouco!';
      if (d.tipo === 'defensor') {
        const pts = R.pontosDrible(CONFIG.pontos, res.drible, res.tempo);
        const base = CONFIG.pontos[res.drible];
        this.pts.base += base;
        this.pts.bonus += pts - base;
        this.pts.dribles += 1;
        if (res.tempo === 'PERFEITO') this.pts.perfeitos += 1;
        this.vencidos += 1;
        const quando = this.quandoTocou(res, d);
        const obs = { cedo: 'tocou cedo', poucoCedo: 'tocou um pouco cedo', poucoTarde: 'tocou um pouco tarde' }[quando] || null;
        this.texto(textoTempo, `+${R.formatarPontos(pts)}`, '#FFD23F', obs ? 1.4 : 0.8, obs);
      } else {
        this.texto(textoTempo, 'passou pelo goleiro');
      }
      this.ev.vibrar(30);
      this.mudarEstado('DRIBLE_OK');
    } else {
      const falha = this.motivoDaFalha(res, d);
      this.texto(falha.texto, falha.sub, '#FF7A7A', 2.6, falha.sub2);
      this.ev.vibrar(120);
      this.tackle = null;
      this.mudarEstado('DESARME');
    }
  }

  // Texto da falha: o que aconteceu (linha 2) e o que fazer (linha 3).
  motivoDaFalha(res, d) {
    const quando = this.quandoTocou(res, d);
    const matriz = d.tipo === 'goleiro' ? CONFIG.matrizGoleiro : CONFIG.matrizDefensor;
    const dica = `Tente: ${R.TEXTO_DICA[R.melhorDrible(matriz, d.posturaReal)]}.`;
    const titulo = d.tipo === 'goleiro' ? 'Defendeu!' : null;
    if (quando === 'nao') return { texto: titulo || 'Lento demais!', sub: 'Você não tocou a tempo.', sub2: 'Toque quando o anel branco entrar no verde.' };
    if (quando === 'tarde') return { texto: titulo || 'Lento demais!', sub: 'Você tocou tarde.', sub2: 'Toque quando o anel branco entrar no verde.' };
    const errado = matriz[d.posturaReal][res.drible] < 35;
    if (quando === 'cedo') return { texto: titulo || 'Rápido demais!', sub: 'Você tocou cedo.', sub2: errado ? dica : 'Espere o anel branco chegar no verde.' };
    if (errado) return { texto: titulo || 'Drible errado!', sub: `Ele estava ${R.NOME_POSTURA[d.posturaReal]}.`, sub2: dica };
    return { texto: titulo || 'Desarmado!', sub: 'Drible e tempo bons, mas ele chegou.', sub2: 'Faz parte. Tente de novo!' };
  }

  // Posições do jogador, da bola e do adversário durante o drible (ESPEC 4.6).
  animar() {
    const a = this.anim;
    const d = this.duelo;
    const ttc = d.ttc;
    const u = R.clamp((a.ttc0 - ttc) / a.ttc0, 0, 1);
    const e = ease(u);
    const mv = CONFIG.movimento;
    const porMeio = a.drible === 'CANETA' || a.drible === 'CHAPEU';
    // o desvio é lateral e começa na hora: não espera o defensor chegar
    let alvoJog = porMeio ? mv.meioDist : mv.ladoDist * a.lado;
    if (!a.sucesso) alvoJog = a.lado * mv.falhaDist;
    const t = a.ttc0 - ttc;
    const rapido = 1 - (1 - R.clamp(t / (porMeio ? mv.meioTempo : mv.ladoTempo), 0, 1)) ** 3;
    this.jogDX = lerp(a.dx0, alvoJog, rapido);
    // já passou pelo defensor: volta ao centro correndo
    const volta = a.sucesso && ttc < 0 ? ease(R.clamp(-ttc / mv.voltaTempo, 0, 1)) : 0;
    if (volta > 0) this.jogDX = lerp(alvoJog, 0, volta);
    this.bolaDX = this.jogDX;
    // a bola vai na diagonal, à frente do jogador, para o lado do drible
    if (!porMeio) this.bolaDX += a.lado * mv.bolaAdiante * rapido * (1 - volta);
    this.bolaEscala = 1;
    if (a.sucesso && a.drible === 'CANETA') {
      const centro = this.baseDXAlvo();
      this.bolaDX = ttc > 0 ? lerp(a.dx0, centro, e) : lerp(centro, this.jogDX, R.clamp(-ttc / 0.3, 0, 1));
    }
    if (a.sucesso && a.drible === 'CHAPEU') {
      const w = R.clamp((a.ttc0 - ttc) / (a.ttc0 + 0.3), 0, 1);
      this.bolaEscala = 1 + 0.8 * Math.sin(Math.PI * w);
    }
    if (a.sucesso) {
      this.alvoDX = 0;
      this.alvoRot = -Math.sign(alvoJog || 1) * 30 * RAD * e;
    } else {
      this.alvoDX = (this.jogDX - this.baseDXAlvo()) * e;
      this.alvoRot = 0;
    }
  }

  fimDoDrible() {
    const d = this.duelo;
    if (d.tipo === 'goleiro') {
      this.goleiro.distFixa = this.alvoDist();
      this.goleiro.dxFixa = this.goleiro.dx + this.alvoDX;
      this.goleiro.rotFixa = this.alvoRot;
      this.goleiro.posturaFixa = d.posturaVisivel;
      this.duelo = null;
      this.anim = null;
      this.chegada = null;
      this.mudarEstado('GOL_DE_PLACA');
      return;
    }
    this.passados.push({
      id: d.id,
      dist: this.alvoDist(),
      postura: d.posturaVisivel,
      dx: dxPostura(d.posturaVisivel) + this.alvoDX,
      rot: this.alvoRot,
    });
    this.duelo = null;
    this.anim = null;
    this.alvoDX = 0;
    this.alvoRot = 0;
    if (this.modo !== 'treino' && this.vencidos >= this.params.adversarios) {
      this.mudarEstado('AREA');
    } else {
      this.mudarEstado('CORRIDA');
      this.espera = D.intervaloEntreDefensores;
    }
  }

  atualizarDesarme(dt, dtDuelo) {
    if (!this.tackle) {
      this.duelo.atualizar(dtDuelo);
      this.animar();
      if (this.duelo.ttc <= CAMPO.bolaAFrente / M.velocidade) {
        this.tackle = { t: 0 };
        this.bolaDono = 'alvo';
      }
      return;
    }
    this.tackle.t += dt;
    if (this.tackle.t < D.pausaDesarme) return;
    if (this.modo === 'treino') {
      this.duelo = null;
      this.anim = null;
      this.tackle = null;
      this.bolaDono = 'jogador';
      this.jogDX = 0;
      this.bolaDX = 0;
      this.alvoDX = 0;
      this.mudarEstado('CORRIDA');
      this.espera = 0.8;
      return;
    }
    this.finalizarFase(this.duelo.tipo === 'goleiro' ? 'DEFESA' : 'DESARME');
  }

  iniciarBarra() {
    this.barra = criarBarra({
      duracao: this.params.barra.duracao,
      periodo: this.params.barra.periodo,
      kc: this.goleiro.kc,
      cfgBarra: CONFIG.barra,
    });
    this.mudarEstado('BARRA');
  }

  iniciarBoteGoleiro() {
    this.barra = null;
    const postura = this.rng() < 0.5 ? 'ABAFA' : 'EM_PE';
    const lt = R.linhaDoTempo(this.params.goleiro.leitura, this.params.goleiro.janela, D);
    const d = criarDuelo({
      tipo: 'goleiro',
      lt,
      posturaMostrada: postura,
      posturaReal: postura,
      matriz: CONFIG.matrizGoleiro,
      cfgDuelo: D,
      rng: this.rng,
    });
    d.distInicial = Math.max(40, this.distGol - this.goleiro.avanco);
    d.ttcInicial = lt.nascimento;
    this.duelo = d;
    this.gingaLado = 0;
    this.faixa('A barra sumiu: drible o goleiro!');
    this.mudarEstado('DUELO');
  }

  atualizarChute(dt) {
    const c = this.chute;
    const g = this.goleiro;
    c.t += dt;
    const e = ease(R.clamp(c.t / 0.35, 0, 1));
    g.mergulho = lerp(g.dx, g.mergulhoAlvo, e);
    g.rotMergulho = Math.sign(g.mergulhoAlvo - g.dx) * 60 * RAD * e;
    if (!c.anunciado && c.t >= 0.45) {
      c.anunciado = true;
      if (c.resultado === 'GOL') {
        this.texto('GOL!', c.noCanto ? 'no canto' : null, '#FFD23F', 1.4);
        this.ev.vibrar(80);
      } else if (c.resultado === 'DEFESA') this.texto('Defendeu!', null, '#FF7A7A', 1.4);
      else if (c.resultado === 'TRAVE') this.texto('Na trave!', null, '#FF7A7A', 1.4);
      else this.texto('Pra fora!', null, '#FF7A7A', 1.4);
    }
    if (c.t >= 1.8) this.finalizarFase(c.resultado, { noCanto: c.noCanto });
  }

  atualizarGolDePlaca(dt, passo) {
    this.goleiro.distFixa -= passo;
    if (this.chegada === null && this.distGol <= CAMPO.bolaAFrente - CAMPO.profRede) {
      this.chegada = 0;
      this.texto('GOL DE PLACA!', `+${R.formatarPontos(CONFIG.pontos.golDePlaca)}`, '#FFD23F', 1.4);
      this.ev.vibrar(80);
    }
    if (this.chegada !== null) {
      this.chegada += dt;
      if (this.chegada >= 1.3) this.finalizarFase('GOL_DE_PLACA');
    }
  }

  finalizarFase(tipo, extra = {}) {
    const concluida = tipo === 'GOL' || tipo === 'GOL_DE_PLACA';
    const gol = tipo === 'GOL' ? CONFIG.pontos.gol : 0;
    const canto = tipo === 'GOL' && extra.noCanto ? CONFIG.pontos.noCanto : 0;
    const placa = tipo === 'GOL_DE_PLACA' ? CONFIG.pontos.golDePlaca : 0;
    const ptsFase = this.pts.base + this.pts.bonus + gol + canto + placa;
    if (concluida) this.total += ptsFase;
    const res = {
      tipo,
      concluida,
      fase: this.fase,
      dificuldade: this.dificuldade,
      ...this.pts,
      gol,
      canto,
      placa,
      ptsFase,
      total: this.total,
      estrelas: R.contarEstrelas({
        concluida,
        perfeitos: this.pts.perfeitos,
        dribles: this.pts.dribles,
        placa: placa > 0,
        noCanto: canto > 0,
      }),
    };
    this.resultadoFase = res;
    this.mudarEstado('RESULTADO');
    this.ev.resultado(res);
  }

  // ---------- tutorial ----------

  atualizarTutorial(dt) {
    this.jogDX = aproximar(this.jogDX, this.gingaLado * CONFIG.movimento.gingaDist, CONFIG.movimento.gingaVel * dt);
    this.bolaDX = this.jogDX;
    if (this.passoFeito && this.tEstado > 0.9) {
      this.passo += 1;
      this.passoFeito = false;
      this.tEstado = 0;
      this.gingaLado = 0;
      if (this.passo >= PASSOS_TUTORIAL.length) this.ev.tutorialFim(this.dificuldade);
    }
  }

  gestoTutorial(drible) {
    if (this.passoFeito || this.passo >= PASSOS_TUTORIAL.length) return;
    this.gingaLado = 0;
    if (PASSOS_TUTORIAL[this.passo].aceita(drible)) {
      this.passoFeito = true;
      this.tEstado = 0;
      this.texto('Isso!', NOME_DRIBLE[drible], '#8CF0A0', 0.9);
      this.ev.vibrar(30);
    } else {
      this.texto('Quase!', `Saiu ${NOME_DRIBLE[drible]}. Tente de novo.`, '#FFFFFF', 1.2);
    }
  }

  // ---------- para a interface ----------

  infoHud() {
    if (this.modo === 'tutorial') return { rotulo: 'TUTORIAL', total: 0, passados: 0, area: false, pontos: null };
    const pontos = this.total + this.pts.base + this.pts.bonus;
    if (this.modo === 'treino') return { rotulo: 'TREINO', total: 0, passados: 0, area: false, pontos };
    const area = this.vencidos >= this.params.adversarios;
    return {
      rotulo: area ? 'ÁREA' : `FASE ${this.fase} · ADVERSÁRIOS`,
      total: this.params.adversarios,
      passados: this.vencidos,
      area,
      pontos,
    };
  }
}
