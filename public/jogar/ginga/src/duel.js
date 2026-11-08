// Linha do tempo de um duelo (defensor ou goleiro). Sem DOM. Ver docs/ESPEC.md, seção 4.
import { classificarTempo, calcularChance } from './regras.js';

export function criarDuelo({ tipo, lt, posturaMostrada, posturaReal, matriz, cfgDuelo, rng }) {
  return {
    tipo,
    lt,
    ttc: lt.nascimento,
    fase: 'APROXIMA',
    posturaMostrada,
    posturaReal,
    posturaVisivel: null,
    mudouEm: lt.nascimento, // TTC em que a postura visível mudou (para a transição)
    pendente: null,
    resultado: null,

    atualizar(dt) {
      this.ttc -= dt;
      const { tell, inicioJanela, fimJanela } = this.lt;
      let fase;
      if (this.ttc > tell) fase = 'APROXIMA';
      else if (this.ttc > inicioJanela) fase = 'LEITURA';
      else if (this.ttc > fimJanela) fase = 'JANELA';
      else fase = 'TARDE';
      this.fase = fase;

      let visivel = null;
      if (fase === 'LEITURA') visivel = this.posturaMostrada;
      else if (fase !== 'APROXIMA') visivel = this.posturaReal;
      if (visivel !== this.posturaVisivel) {
        this.posturaVisivel = visivel;
        this.mudouEm = this.ttc;
      }

      if (!this.resultado && !this.pendente && this.ttc <= fimJanela) {
        this.resultado = { drible: null, tempo: 'TARDE', chance: 0, sucesso: false, ttc: this.ttc };
      }
      // Segurança: gesto começado que nunca foi decidido.
      if (!this.resultado && this.pendente && this.ttc < -0.2) {
        this.pendente = null;
        this.resultado = { drible: null, tempo: 'TARDE', chance: 0, sucesso: false, ttc: this.ttc };
      }
    },

    aceita() {
      return !this.resultado && (this.fase === 'LEITURA' || this.fase === 'JANELA');
    },

    // Primeiro dedo encostou: guarda o tempo do toque.
    iniciarGesto() {
      if (!this.aceita() || this.pendente) return false;
      this.pendente = { ttc: this.ttc, tempo: classificarTempo(this.ttc, this.lt) };
      return true;
    },

    // Gesto decidido. Retorna o resultado, ou null se o toque não vale.
    resolver(drible) {
      if (this.resultado) return null;
      let tempo;
      const ttcToque = this.pendente ? this.pendente.ttc : this.ttc;
      if (this.pendente) {
        tempo = this.pendente.tempo;
      } else {
        if (!this.aceita()) return null;
        tempo = classificarTempo(this.ttc, this.lt);
      }
      this.pendente = null;
      const chance = calcularChance(matriz, this.posturaReal, drible, tempo, cfgDuelo);
      const sucesso = rng() * 100 < chance;
      this.resultado = { drible, tempo, chance, sucesso, ttc: this.ttc, ttcToque };
      return this.resultado;
    },
  };
}
