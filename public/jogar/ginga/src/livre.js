// Modo Livre: o jogador corre devagar para frente e o usuário o controla o tempo todo.
//   Segurar um lado da tela  -> anda para esse lado.
//   Altura do dedo apertado  -> velocidade (mais alto = mais rápido; mais baixo = freia).
//   Toque rápido num lado    -> corte: toca a bola para esse lado.
//   Os dois juntos e solta   -> caneta (só passa se ele abrir as pernas no bote).
//   Os dois juntos e segura  -> chapéu.
//   Corte e logo outro para o lado oposto -> elástico (o defensor compra a finta).
// O defensor tenta ficar na frente da bola com atraso de reação, recua acompanhando e dá o bote
// quando a bola chega perto. O desarme acontece quando a perna dele alcança a bola. Sem DOM.
// Depois do último defensor, a área e o goleiro funcionam como no modo Clássico.
import { CONFIG } from './config.js';
import { Jogo, dxPostura } from './jogo.js';
import { criarBola } from './bola.js';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const aproximar = (v, alvo, passo) => (v < alvo ? Math.min(alvo, v + passo) : Math.max(alvo, v - passo));
const suave = (u) => {
  const c = clamp(u, 0, 1);
  return c * c * (3 - 2 * c);
};

const NOME_PASSE = { CANETA: 'Caneta!', CHAPEU: 'Chapéu!', ELASTICO: 'Elástico!', CORTE: 'Driblou!' };

export class JogoLivre extends Jogo {
  constructor(opcoes) {
    super(opcoes);
    this.bola = criarBola();
    this.eventosBola = [];
    this.relogio = 0;
    this.dedos = new Map();
    this.yTeclado = null;
    this.def = null;
  }

  limparJogada() {
    super.limparJogada();
    this.def = null;
    if (this.dedos) this.dedos.clear();
  }

  // relógio dos toques (ms); os testes podem trocar
  tempoAtual() {
    return performance.now();
  }

  get livre() {
    return this.modo === 'livre';
  }

  controlaLivre() {
    return this.livre && this.estado === 'LIVRE';
  }

  iniciarFase() {
    super.iniciarFase();
    this.def = null;
    this.dedos.clear();
    this.acorde = null;
    this.ultimoCorte = null;
    this.ultimoDrible = null;
    this.tDrible = -9;
    this.lance = null;
    this.vLat = 0;
    this.corteAnim = null;
    this.vel = CONFIG.livre.velBase;
    this.histBola = [];
    if (this.livre) {
      this.mudarEstado('LIVRE');
      this.espera = 0.6;
      this.faixa('Segure um lado para andar · suba o dedo para correr', 3.2);
    }
  }

  velocidadeDoEstado() {
    if (this.livre && this.estado === 'LIVRE') return this.vel;
    if (this.livre && this.estado === 'DESARME_LIVRE') return 0;
    return super.velocidadeDoEstado();
  }

  alvoDist() {
    if (this.duelo && this.duelo.livre && this.def) return this.def.dist;
    return super.alvoDist();
  }

  baseDXAlvo() {
    if (this.duelo && this.duelo.livre && this.def) return this.def.baseDX;
    return super.baseDXAlvo();
  }

  // ---------- entrada ----------

  toqueLivre(tipo, id, lado, y, t) {
    if (tipo === 'up') {
      const dedo = this.dedos.get(id);
      if (!dedo) return;
      this.dedos.delete(id);
      if (!this.controlaLivre()) return;
      if (this.acorde && this.acorde.ids.includes(id)) {
        if (!this.acorde.feito && t - this.acorde.t1 < CONFIG.gestos.segurarMs) this.drible('CANETA');
        this.acorde.feito = true;
        if (!this.acorde.ids.some((k) => this.dedos.has(k))) this.acorde = null;
        return;
      }
      if (t - dedo.t0 < CONFIG.livre.toqueMs) this.corte(dedo.lado === 'D' ? 1 : -1, t);
      return;
    }
    if (tipo === 'move') {
      const dedo = this.dedos.get(id);
      if (dedo && y !== null) dedo.y = y;
      return;
    }
    if (!this.controlaLivre()) return;
    for (const [k, d] of this.dedos) {
      if (d.lado !== lado && !this.acorde && t - d.t0 <= CONFIG.gestos.simultaneoMs) {
        this.acorde = { ids: [k, id], t1: t, feito: false };
      }
    }
    this.dedos.set(id, { lado, y, t0: t });
  }

  tickGestos(t) {
    const a = this.acorde;
    if (a && !a.feito && a.ids.every((k) => this.dedos.has(k)) && t - a.t1 >= CONFIG.gestos.segurarMs) {
      a.feito = true;
      this.drible('CHAPEU');
    }
  }

  corte(lado, t) {
    const cfg = CONFIG.livre;
    const elastico = this.ultimoCorte && this.ultimoCorte.lado !== lado && t - this.ultimoCorte.t <= cfg.elasticoMs;
    this.ultimoCorte = { lado, t };
    // passo curto e decidido para o lado, com a bola colada no pé
    // no elástico, a volta é mais longa: passa do ponto de partida para o outro lado
    this.corteAnim = { lado, u: 0, x0: this.jogDX, dist: cfg.corteDist * (elastico ? cfg.elasticoMult : 1) };
    this.anim = { drible: lado > 0 ? 'DIREITA' : 'ESQUERDA', sucesso: true, lado, livre: true };
    this.ultimoDrible = elastico ? 'ELASTICO' : 'CORTE';
    this.tDrible = this.relogio;
    if (elastico && this.def) {
      // ele foi atrás da primeira finta e demora para voltar
      this.def.enganado = 0.5;
      this.def.alvoEnganado = this.def.x - lado * 55;
    }
    this.ev.vibrar(15);
  }

  drible(tipo) {
    const d = this.def;
    const lado = d ? Math.sign(this.jogDX - d.x) || 1 : 1;
    this.vLat = lado * (tipo === 'CANETA' ? 170 : 120);
    this.corteAnim = null;
    this.anim = { drible: tipo, sucesso: true, lado, x0: this.jogDX };
    this.ultimoDrible = tipo;
    this.tDrible = this.relogio;
    // caneta e chapéu passam quando ele já armou o bote (pernas abertas, corpo indo para a frente)
    const armado = !!d && (d.fase === 'prepara' || d.fase === 'bote');
    const carrinho = !!d && d.carrinho;
    const chance = CONFIG.livre.chanceSemBote;
    let passa = true;
    if (d && tipo === 'CANETA') passa = armado && !carrinho ? true : this.rng() < chance.caneta;
    if (d && tipo === 'CHAPEU') passa = armado ? true : this.rng() < chance.chapeu;
    this.lance = { tipo, t: this.relogio, passa, armado, carrinho };
    this.ev.vibrar(20);
  }

  // ---------- laço ----------

  atualizar(dt) {
    this.relogio += dt;
    if (!this.livre || (this.estado !== 'LIVRE' && this.estado !== 'DESARME_LIVRE')) {
      super.atualizar(dt);
    } else {
      this.tEstado += dt;
      for (const t of this.textos) t.t += dt;
      this.textos = this.textos.filter((t) => t.t < t.dur);
      const passo = this.velocidadeDoEstado() * dt;
      this.distancia += passo;
      if (this.distGol !== null) this.distGol -= passo;
      for (const p of this.passados) p.dist -= passo;
      this.passados = this.passados.filter((p) => p.dist > -600);
      if (this.estado === 'LIVRE') this.atualizarLivre(dt);
      else this.atualizarDesarme(dt);
    }
    if (this.livre && this.estado !== 'MENU') {
      const seguirX = this.jogDX + this.vLat * CONFIG.livre.bolaNaFrente;
      this.eventosBola.push(...this.bola.atualizar(dt, this, { vP: this.velocidadeDoEstado(), jogX: this.jogDX, seguirX }));
    }
  }

  atualizarLivre(dt) {
    const cfg = CONFIG.livre;
    const agora = this.tempoAtual();
    this.tickGestos(agora);
    // velocidade pela altura do dedo mais alto
    const ys = [...this.dedos.values()].map((d) => d.y).filter((y) => y !== null && y !== undefined);
    if (this.yTeclado !== null) ys.push(this.yTeclado);
    const alvoVel = ys.length
      ? clamp(cfg.velBase + (cfg.dedoBase - Math.min(...ys)) * cfg.velPorAltura, cfg.velMin, cfg.velMax)
      : cfg.velBase;
    this.vel = aproximar(this.vel, alvoVel, cfg.aceleracao * dt);
    // para os lados: segurar um lado (os dois juntos não andam)
    let dir = 0;
    for (const [id, d] of this.dedos) {
      if (this.acorde && this.acorde.ids.includes(id)) continue;
      if (agora - d.t0 >= cfg.toqueMs) dir += d.lado === 'D' ? 1 : -1;
    }
    const c = this.corteAnim;
    if (c) {
      c.u = Math.min(1, c.u + dt / cfg.corteTempo);
      const e = 1 - (1 - c.u) * (1 - c.u);
      const novo = clamp(c.x0 + c.lado * c.dist * e, -cfg.limiteLateral, cfg.limiteLateral);
      this.vLat = (novo - this.jogDX) / dt;
      this.jogDX = novo;
      if (c.u >= 1) {
        this.corteAnim = null;
        this.vLat = c.lado * cfg.latVel * 0.5;
      }
    } else {
      this.vLat = aproximar(this.vLat, Math.sign(dir) * cfg.latVel, cfg.latAcel * dt);
      this.jogDX = clamp(this.jogDX + this.vLat * dt, -cfg.limiteLateral, cfg.limiteLateral);
      if (Math.abs(this.jogDX) >= cfg.limiteLateral) this.vLat = 0;
    }
    this.bolaDX = this.jogDX;

    if (!this.def) {
      if (this.vencidos >= this.params.adversarios) {
        this.duelo = null;
        this.dedos.clear();
        this.mudarEstado('AREA');
        return;
      }
      this.espera -= dt;
      if (this.espera <= 0) this.novoDefensorLivre();
      return;
    }
    this.atualizarDefensor(dt);
  }

  novoDefensorLivre() {
    const cfg = CONFIG.livre;
    const dc = cfg.defensor[this.dificuldade];
    const fator = Math.max(0.6, 1 - 0.06 * (this.fase - 1));
    this.def = {
      x: clamp(this.jogDX + (this.rng() - 0.5) * 80, -110, 110),
      vx: 0,
      dist: cfg.distNascer,
      fase: 'aproxima',
      tFase: 0,
      postura: null,
      tMudou: this.relogio,
      reacao: dc.reacao * fator,
      vLat: dc.vLat / fator,
      enganado: 0,
      alvoEnganado: 0,
      vVisto: 0,
      vistoAnt: undefined,
      prepara: dc.prepara * fator,
      carrinho: false,
      baseDX: 0,
    };
    this.histBola = [];
    this.alvoDX = this.def.x;
    this.alvoRot = 0;
    this.duelo = {
      tipo: 'defensor',
      livre: true,
      id: this.fase * 20 + this.vencidos,
      posturaVisivel: null,
      posturaMostrada: null,
      posturaReal: null,
      mudouEm: 0,
      ttc: 0,
      lt: { nascimento: -this.relogio },
      resultado: null,
      bloqueio: null,
      aceita: () => false,
    };
    if (this.vencidos === this.params.adversarios - 1) this.prepararArea(this.def.dist);
  }

  mudarFase(d, fase) {
    d.fase = fase;
    d.tFase = 0;
  }

  atualizarDefensor(dt) {
    const dc = CONFIG.livre.defensor[this.dificuldade];
    const d = this.def;
    const b = this.bola.estado;
    d.tFase += dt;

    // ele enxerga a bola com atraso de reação
    this.histBola.push({ t: this.relogio, x: b.x });
    while (this.histBola.length > 2 && this.histBola[1].t <= this.relogio - d.reacao) this.histBola.shift();
    // e antecipa pelo movimento que viu: corrida para o lado ele acompanha; corte súbito, não
    const visto = this.histBola[0].x;
    if (d.vistoAnt !== undefined) {
      const v = (visto - d.vistoAnt) / Math.max(dt, 1e-3);
      d.vVisto += (v - d.vVisto) * (1 - Math.exp(-dt * 6));
    }
    d.vistoAnt = visto;
    let alvoX = visto + d.vVisto * d.reacao * 0.5;
    if (d.enganado > 0) {
      d.enganado -= dt;
      alvoX = d.alvoEnganado;
    }

    const ateBola = d.dist - b.f;
    const gap = Math.abs(alvoX - d.x);
    let avanco;
    if (d.fase === 'aproxima') {
      avanco = dc.avanco;
      if (d.dist < 130) this.mudarFase(d, 'marcando');
    } else if (d.fase === 'marcando') {
      // recua acompanhando, fechando devagar; fora de posição, recua mais para ganhar tempo
      // não recua: segura a posição e vem ao encontro, mais forte quando o jogador está parado
      avanco = dc.marca;
      const alinhado = Math.abs(b.x - d.x) < 22;
      if ((ateBola < dc.boteDist && (alinhado || (d.tFase > 1.4 && gap < 40))) || ateBola < 26) {
        // arma o bote: planta os pés e abre as pernas (é a hora de driblar)
        this.mudarFase(d, 'prepara');
        d.carrinho = this.rng() < dc.carrinho;
      }
    } else if (d.fase === 'prepara') {
      avanco = 0;
      if (d.tFase >= d.prepara) this.mudarFase(d, 'bote');
    } else if (d.fase === 'bote') {
      avanco = dc.boteVel;
      if (d.tFase > (d.carrinho ? 0.5 : 0.35)) this.mudarFase(d, 'recupera');
    } else {
      avanco = -this.vel * 0.25;
      if (d.tFase > dc.recupera) this.mudarFase(d, 'marcando');
    }
    d.dist -= (this.vel + avanco) * dt;

    let lat = d.vLat;
    if (d.fase === 'prepara') lat = 0;
    else if (d.fase === 'bote') lat = d.vLat * 0.8; // já se jogou: muda pouco de direção
    else if (d.fase === 'recupera') lat = d.vLat * 0.3;
    
    d.vx = aproximar(d.vx, clamp((alvoX - d.x) * 5, -lat, lat), 600 * dt);
    d.x = clamp(d.x + d.vx * dt, -135, 135);

    // postura visível (com folga para não piscar)
    let postura = d.postura;
    if (d.fase === 'bote' || d.fase === 'prepara') postura = d.carrinho ? 'CARRINHO' : 'BOTE';
    else if (Math.abs(d.vx) > 40) postura = d.vx < 0 ? 'FECHA_ESQ' : 'FECHA_DIR';
    else if (Math.abs(d.vx) < 20 || postura === 'BOTE' || postura === 'CARRINHO') postura = d.fase === 'aproxima' ? null : 'CONTIDO';
    if (postura !== d.postura) {
      d.postura = postura;
      d.tMudou = this.relogio;
    }
    const mix = d.postura ? suave((this.relogio - d.tMudou) / 0.15) : 0;
    d.baseDX = dxPostura(d.postura) * mix;
    this.alvoDX = d.x - d.baseDX;
    const du = this.duelo;
    du.posturaVisivel = du.posturaMostrada = du.posturaReal = d.postura;
    du.ttc = -this.relogio;
    du.mudouEm = -d.tMudou;

    // desarme: a perna dele alcança a bola (ou ele domina o chapéu que veio baixo demais para ele)
    const alcance = d.fase === 'bote' ? dc.alcance + (d.carrinho ? 12 : 4) : 12;
    const dx = b.x - d.x;
    const lance = this.lance && this.relogio - this.lance.t < 1.6 ? this.lance : null;
    if (b.dono === 'jogador' && Math.abs(b.f - d.dist) < 14) {
      if (b.z >= 18) {
        if (lance && lance.tipo === 'CHAPEU' && !lance.passa && Math.abs(dx) < 30) {
          this.desarmar(dx, lance);
          return;
        }
      } else if (Math.abs(dx) < alcance) {
        const canetaPassa = lance && lance.tipo === 'CANETA' && lance.passa && Math.abs(dx) < 14;
        if (!canetaPassa) {
          this.desarmar(dx, lance);
          return;
        }
      }
    }
    if (d.dist < -28) this.vencer();
  }

  desarmar(dx, lance = null) {
    let sub;
    let sub2;
    if (lance && lance.tipo === 'CANETA' && lance.carrinho) {
      sub = 'Ele veio de carrinho, com as pernas juntas.';
      sub2 = 'Contra o carrinho, o chapéu é melhor.';
    } else if (lance && lance.tipo === 'CANETA') {
      sub = 'Ele estava com as pernas fechadas.';
      sub2 = 'A caneta passa quando ele arma o bote e abre as pernas.';
    } else if (lance && lance.tipo === 'CHAPEU') {
      sub = 'Ele estava esperando e dominou a bola.';
      sub2 = 'O chapéu passa quando ele vem no bote.';
    } else if (Math.abs(dx) < 8) {
      sub = 'Você foi reto para cima dele.';
      sub2 = 'Quando ele armar o bote, corte para o lado.';
    } else {
      sub = 'A bola ficou ao alcance da perna dele.';
      sub2 = 'Corte quando ele armar o bote, nem antes nem depois.';
    }
    this.tackle = { t: 0 };
    this.bolaDono = 'alvo';
    this.duelo.bloqueio = { lado: Math.sign(dx) || 1, u: 0 };
    this.duelo.resultado = { sucesso: false };
    this.dedos.clear();
    this.acorde = null;
    this.vel = 0;
    this.texto('Desarmado!', sub, '#FF7A7A', 2.6, sub2);
    this.ev.vibrar(120);
    this.mudarEstado('DESARME_LIVRE');
  }

  atualizarDesarme(dt, dtDuelo = dt) {
    if (!this.livre || this.estado !== 'DESARME_LIVRE') {
      super.atualizarDesarme(dt, dtDuelo);
      return;
    }
    this.tackle.t += dt;
    const t = this.tackle.t;
    this.duelo.bloqueio.u = t < 0.15 ? t / 0.15 : 1 - clamp((t - 0.45) / 0.3, 0, 1) * 0.7;
    if (t >= CONFIG.duelo.pausaDesarme) this.finalizarFase('DESARME');
  }

  vencer() {
    const cfg = CONFIG.livre;
    const d = this.def;
    const recente = this.relogio - this.tDrible < 1.6 ? this.ultimoDrible : null;
    const pts = cfg.pontos[recente ? recente.toLowerCase() : 'passar'];
    this.pts.base += pts;
    this.pts.dribles += 1;
    this.vencidos += 1;
    this.texto(NOME_PASSE[recente] || 'Passou!', `+${pts}`);
    this.ev.vibrar(30);
    this.passados.push({
      id: this.duelo.id,
      dist: d.dist,
      postura: d.postura === 'BOTE' || d.postura === 'CARRINHO' ? d.postura : 'CONTIDO',
      dx: d.x,
      rot: (Math.sign(d.x - this.jogDX) || 1) * 0.4,
    });
    this.def = null;
    this.duelo = null;
    this.alvoDX = 0;
    this.alvoRot = 0;
    this.espera = cfg.intervalo;
  }
}
