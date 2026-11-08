// Reconhecedor de gestos com dois polegares. Puro: sem DOM. Ver docs/ESPEC.md, seção 3.
//
// Cada método retorna um array de eventos (pode ser vazio):
//   { tipo: 'start', lado, t0 }            primeiro dedo encostou
//   { tipo: 'gesto', drible, t0, t }       gesto decidido
export function criarReconhecedor(cfg) {
  let pendente = null;

  const lateral = (lado) => (lado === 'D' ? 'DIREITA' : 'ESQUERDA');

  function gesto(drible, t) {
    const ev = { tipo: 'gesto', drible, t0: pendente.primeiro.t0, t };
    pendente = null;
    return ev;
  }

  function down(id, lado, t) {
    if (!pendente) {
      pendente = { primeiro: { id, lado, t0: t, pressionado: true }, segundo: null };
      return [{ tipo: 'start', lado, t0: t }];
    }
    if (pendente.segundo) return []; // terceiro dedo: ignora
    if (lado === pendente.primeiro.lado) return []; // mesmo lado: ignora
    const dt = t - pendente.primeiro.t0;
    if (dt <= cfg.simultaneoMs) {
      pendente.segundo = { id, lado, t1: t, pressionado: true };
      if (!pendente.primeiro.pressionado) return [gesto('CANETA', t)];
      return [];
    }
    if (dt <= cfg.sequenciaMs) {
      return [gesto(lado === 'D' ? 'ELASTICO_DIR' : 'ELASTICO_ESQ', t)];
    }
    // Não deveria acontecer (tick já teria resolvido), mas por segurança:
    const ev = gesto(lateral(pendente.primeiro.lado), t);
    return [ev, ...down(id, lado, t)];
  }

  function up(id, t) {
    if (!pendente) return [];
    if (pendente.primeiro.id === id) pendente.primeiro.pressionado = false;
    if (pendente.segundo && pendente.segundo.id === id) pendente.segundo.pressionado = false;
    if (
      pendente.segundo &&
      (!pendente.primeiro.pressionado || !pendente.segundo.pressionado) &&
      t - pendente.segundo.t1 < cfg.segurarMs
    ) {
      return [gesto('CANETA', t)];
    }
    return [];
  }

  function tick(t) {
    if (!pendente) return [];
    if (!pendente.segundo && t - pendente.primeiro.t0 > cfg.sequenciaMs) {
      return [gesto(lateral(pendente.primeiro.lado), t)];
    }
    if (
      pendente.segundo &&
      pendente.primeiro.pressionado &&
      pendente.segundo.pressionado &&
      t - pendente.segundo.t1 >= cfg.segurarMs
    ) {
      return [gesto('CHAPEU', t)];
    }
    return [];
  }

  function reset() {
    pendente = null;
  }

  return { down, up, tick, reset, temPendente: () => pendente !== null };
}
