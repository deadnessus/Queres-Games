// Barra de chute. Sem DOM. Ver docs/ESPEC.md, seção 5.1.
import { posicaoMarcador, meiaLarguraBloco, calcularChute, resolverChute } from './regras.js';

export function criarBarra({ duracao, periodo, kc, cfgBarra }) {
  return {
    t: 0,
    duracao,
    periodo,
    kc,
    atualizar(dt) {
      this.t = Math.min(this.duracao, this.t + dt);
    },
    get p() {
      return posicaoMarcador(this.t, this.periodo);
    },
    get hw() {
      return meiaLarguraBloco(this.t, this.duracao, cfgBarra);
    },
    acabou() {
      return this.t >= this.duracao;
    },
    chanceAtual() {
      return calcularChute(this.p, this.kc, this.hw, cfgBarra);
    },
    chutar(rng) {
      return resolverChute(this.p, this.kc, this.hw, cfgBarra, rng);
    },
  };
}
