// Job career levels: Estagiário → Profissional → Chefe → Lenda
export const LEVELS = [
  { name: 'Estagiário', need: 0, mult: 1, icon: '🧑‍🎓' },
  { name: 'Profissional', need: 5, mult: 1.25, icon: '💼' },
  { name: 'Chefe', need: 15, mult: 1.5, icon: '👑' },
  { name: 'Lenda', need: 35, mult: 2, icon: '🏆' },
];

// stat key counted by each job -> job key
export const STAT_JOB = {
  pizzas: 'pizza', corridas: 'taxi', lixo: 'garbage', mudancas: 'moving', incendios: 'fire',
  voos: 'pilot', resgates: 'helirescue', pacientes: 'paramedic', prisoes: 'police', peixes: 'fisher',
  cristais: 'mining', entregasEspaciais: 'spacedelivery', antenas: 'repair',
};

// what one completed task is called, [singular, plural]
export const UNITS = {
  pizza: ['entrega', 'entregas'], taxi: ['corrida', 'corridas'], garbage: ['coleta', 'coletas'], moving: ['mudança', 'mudanças'],
  fire: ['incêndio', 'incêndios'], pilot: ['voo', 'voos'], helirescue: ['resgate', 'resgates'], paramedic: ['paciente', 'pacientes'],
  police: ['prisão', 'prisões'], fisher: ['peixe', 'peixes'], mining: ['carga', 'cargas'], spacedelivery: ['entrega', 'entregas'],
  repair: ['conserto', 'consertos'],
};

// the better tool each career unlocks, and at which level
export const PERKS = {
  pizza: { lvl: 2, name: 'Jetpack de entrega', desc: 'Durante o turno você entrega voando: segure Espaço no ar.' },
  taxi: { lvl: 2, name: 'Táxi turbinado', desc: 'O táxi fica 40% mais rápido.' },
  garbage: { lvl: 2, name: 'Ímã de lixo', desc: 'Sacos perto da traseira do caminhão são puxados sozinhos.' },
  moving: { lvl: 2, name: 'Esteira magnética', desc: 'Caixas perto do caminhão entram sozinhas.' },
  fire: { lvl: 2, name: 'Canhão gigante', desc: 'Jato de água enorme, mais longe e 3x mais forte.' },
  pilot: { lvl: 2, name: 'Motores turbo', desc: 'O avião de carga voa 40% mais rápido.' },
  helirescue: { lvl: 2, name: 'Guincho de resgate', desc: 'Resgate sem pousar: basta pairar perto da pessoa.' },
  paramedic: { lvl: 2, name: 'Ambulância turbo', desc: 'A ambulância fica 40% mais rápida.' },
  police: { lvl: 2, name: 'Cerco relâmpago', desc: 'Viatura turbo e o cerco termina na metade do tempo.' },
  fisher: { lvl: 3, name: 'Tubarão Lendário', desc: 'Só uma Lenda consegue fisgar o tubarão lendário ($600)!' },
  mining: { lvl: 2, name: 'Ímã de cristais', desc: 'Cristais perto do rover ou da refinaria são puxados sozinhos.' },
  spacedelivery: { lvl: 2, name: 'Jetpack espacial', desc: 'Durante o turno você entrega voando: segure Espaço no ar.' },
  repair: { lvl: 2, name: 'Chave turbo', desc: 'Conserta antenas em 1 segundo.' },
};

export function levelOf(xp) {
  let l = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].need) l = i;
  return l;
}

// "faltam 3 entregas para Chefe" + progress 0..1 inside the current level
export function progressInfo(job, xp) {
  const l = levelOf(xp);
  if (l >= LEVELS.length - 1) return { level: l, text: `${LEVELS[l].icon} ${LEVELS[l].name} · nível máximo!`, frac: 1 };
  const next = LEVELS[l + 1], left = next.need - xp, u = UNITS[job] || ['tarefa', 'tarefas'];
  const frac = (xp - LEVELS[l].need) / (next.need - LEVELS[l].need);
  return { level: l, text: `${LEVELS[l].icon} ${LEVELS[l].name} · faltam ${left} ${left === 1 ? u[0] : u[1]} para ${next.name}`, frac };
}
