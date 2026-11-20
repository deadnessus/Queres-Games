// Estado dos controles, juntando toque, teclado/mouse e controle de videogame num lugar só.
// Cada fonte escreve o seu movimento; o jogo lê o mais forte. Os giros de câmera (em radianos) se somam
// e são consumidos a cada quadro pelo jogador.
export const entrada = {
  fontes: {
    toque: { x: 0, y: 0, correr: false },
    teclado: { x: 0, y: 0, correr: false },
    controle: { x: 0, y: 0, correr: false },
  },
  giroRumo: 0, // + vira para a direita
  giroInclinacao: 0, // + olha para cima
  atirandoToque: false,
  atirandoMouse: false,
  atirandoControle: false,
  pularPedido: false,
  acaoPedida: false, // tocou agora (uma vez)
  acaoSegurando: false, // continua segurando (para cortar/quebrar sem parar)
  acaoSegurandoControle: false,
  cancelarPedido: false,
  mochilaPedida: false,
  mapaPedido: false,
  pausaPedida: false,
  trocarArmaPedida: false, // trocar entre o Desintegrador e o Rifle de raio
  armaPedida: null, // 'pistola' ou 'rifle' (teclas 1 e 2)
  fatorMira: 1, // o jogo baixa quando a mira está em cima de um alvo (ajuda na mira no toque)
  inverterY: false,
  ultimaFonte: 'teclado', // 'toque', 'teclado' ou 'controle' (para os textos de ajuda)

  movimento() {
    let melhor = this.fontes.teclado;
    for (const f of [this.fontes.toque, this.fontes.controle]) {
      if (Math.hypot(f.x, f.y) > Math.hypot(melhor.x, melhor.y)) melhor = f;
    }
    return melhor;
  },
  get atirando() { return this.atirandoToque || this.atirandoMouse || this.atirandoControle; },
  get segurandoAcao() { return this.acaoSegurando || this.acaoSegurandoControle; },

  girar(rumo, inclinacao) {
    this.giroRumo += rumo;
    this.giroInclinacao += this.inverterY ? -inclinacao : inclinacao;
  },

  consumirGiro() {
    const g = [this.giroRumo, this.giroInclinacao];
    this.giroRumo = 0;
    this.giroInclinacao = 0;
    return g;
  },

  // Solta tudo (ao pausar, ao trocar de tela): ninguém continua andando ou atirando sozinho.
  soltarTudo() {
    for (const f of Object.values(this.fontes)) { f.x = 0; f.y = 0; f.correr = false; }
    this.atirandoToque = this.atirandoMouse = this.atirandoControle = false;
    this.pularPedido = this.acaoPedida = this.acaoSegurando = this.acaoSegurandoControle = this.cancelarPedido = this.mochilaPedida = this.mapaPedido = this.trocarArmaPedida = false;
    this.armaPedida = null;
    this.giroRumo = this.giroInclinacao = 0;
  },
};
