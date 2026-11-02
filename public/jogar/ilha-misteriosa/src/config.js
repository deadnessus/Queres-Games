/* =====================================================================
 * config.js — Constantes globais, balanceamento biológico e tabelas
 * A Ilha Misteriosa (The Mysterious Island: Engineer's Survival) — Sprint 1
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});

  const Config = {
    VERSION: 3,
    SAVE_KEY: 'ilha_misteriosa_save_v1',

    // ---- Renderização -------------------------------------------------
    TILE: 16,          // resolução lógica dos ícones de item (16x16)
    ISO_TW: 64,        // largura do losango isométrico (projeção 2:1)
    ISO_TH: 32,        // altura do losango
    VOXELS_PER_TILE: 16,
    DIAG_COST: 1.41,   // custo de movimento na diagonal
    // 8 direções em coordenadas de TELA -> vetor no grid. (S = para baixo na tela)
    DIR8: {
      N: [-1, -1], NE: [0, -1], E: [1, -1], SE: [1, 0],
      S: [1, 1], SW: [0, 1], W: [-1, 1], NW: [-1, 0],
    },
    MAP_W: 64,
    MAP_H: 64,
    SEED: 1865,
    SPAWN: { x: 32, y: 48 },
    MOVE_REPEAT_MS: 120,

    // ---- Mochila ------------------------------------------------------
    MAX_WEIGHT: 25, // kg

    // ---- Progressão ---------------------------------------------------
    LEVEL_CAP: 15, // as 4 Eras completas (1–3 / 4–7 / 8–11 / 12–15)
    xpToNext(level) { return level <= 3 ? 100 * level : 150 + 40 * (level - 3); },
    eraOfLevel(level) { return level <= 3 ? 1 : level <= 7 ? 2 : level <= 11 ? 3 : 4; },

    // ---- Motor biológico ---------------------------------------------
    BIO: {
      MAX_CALORIES: 3000,
      BASAL_KCAL_H: 80,
      HYDRATION_H: 4,
      HYDRATION_SUN_H: 8,
      HYDRATION_RAIN_H: 3,
      DYSENTERY_HYD_MULT: 3,
      SLEEP_HYD_MULT: 0.5,
      PROTEIN_DAILY: 15,
      VITAMIN_DAILY: 12,
      HYGIENE_H: 0.4,
      SCURVY_LOW_VIT: 20,
      SCURVY_DAYS: 3,
      SCURVY_CURE_VIT: 60,
      SCURVY_DAILY_HP: 5,
      SCURVY_MAXHP_MULT: 0.6,
      DYSENTERY_CHANCE: 0.35,
      DYSENTERY_HOURS: 72,
      DYSENTERY_STAMINA_MULT: 0.7,
      FOOD_POISON_RAW_CHANCE: 0.4,
      FOOD_POISON_KCAL: 600,
      FOOD_POISON_HYD: 30,
      FOOD_POISON_HOURS: 12,
      HYPOTHERMIA_ON: 35.5,
      HYPOTHERMIA_OFF: 36.3,
      COLD_COMFORT_TEMP: 18,
      INFECTION_HYGIENE: 30,
      INFECTION_CHANCE: 0.4,
      INFECTION_CURE_HOURS: 24,
      WASH_CAP: 70,
      LOW_KCAL: 500,
      WALK_KCAL_PER_MIN: 1.1,
      WALK_STAMINA_PER_MIN: 0.08,
      WALK_HYD_PER_MIN: 0.05,
      STAMINA_REGEN_H: 4,
      HP_REGEN_BASE_H: 0.6,
      HP_REGEN_PROTEIN_H: 1.4,
      BASE_MAX_HP: 100,
      BASE_MAX_STAMINA: 100,
      STARVE_HP_H: 3,
      THIRST_HP_H: 4,
      COLD_HP_H: 1.5,
      INFECTION_HP_H: 1,
      WELL_RESTED_HOURS: 16,
      MUSCLE_ACHE_HOURS: 12,
    },

    // ---- Terrenos -----------------------------------------------------
    TERRAIN: {
      DEEP_OCEAN:    { name: 'Oceano Profundo',        walk: false, cost: 0, water: 'sea' },
      SHALLOW_WATER: { name: 'Água Rasa do Mar',       walk: true,  cost: 3, water: 'sea' },
      SAND:          { name: 'Areia da Praia',         walk: true,  cost: 2 },
      RIVER_WATER:   { name: 'Rio de Água Doce',       walk: true,  cost: 3, water: 'river' },
      CLAY_BANK:     { name: 'Margem de Argila Úmida', walk: true,  cost: 2 },
      GRASS:         { name: 'Grama Tropical',         walk: true,  cost: 1 },
      JUNGLE_FLOOR:  { name: 'Solo de Floresta Densa', walk: true,  cost: 1 },
      GRANITE_FLOOR: { name: 'Rocha de Granito',       walk: true,  cost: 1 },
      TILLED_SOIL:   { name: 'Terra Arada',            walk: true,  cost: 1 },
      IRRIGATION_CANAL: { name: 'Canal de Irrigação',  walk: true,  cost: 2, water: 'canal' },
    },

    // ---- Objetos do mapa ---------------------------------------------
    // solid: bloqueia passagem; handler: chave em Player.handlers
    OBJECTS: {
      TREE_HARDWOOD: {
        name: 'Árvore de Madeira de Lei', solid: true, verb: 'Cortar', handler: 'gather',
        tool: 'axe', toolName: 'Machado de Pedra', minutes: 60, kcal: 150, stamina: 15, hygiene: -2,
        drops: [{ id: 'log', min: 1, max: 2 }, { id: 'wood_branch', min: 1, max: 2 }, { id: 'resin', min: 1, max: 1, chance: 0.5 }],
        depleted: 'STUMP', regen: 9, catalog: 'Madeira de Lei',
        blast: [{ id: 'log', min: 3, max: 5 }, { id: 'wood_branch', min: 2, max: 4 }],
      },
      STUMP: { name: 'Toco de Árvore', solid: true, inert: true, note: 'Rebrotará em alguns dias.' },
      BUSH_TWIGS: {
        name: 'Arbusto de Galhos e Cipós', solid: true, verb: 'Colher galhos', handler: 'gather',
        tool: null, minutes: 10, kcal: 20, stamina: 3, hygiene: -1,
        drops: [{ id: 'wood_branch', min: 2, max: 4 }],
        depleted: 'BUSH_BARE', regen: 3, catalog: 'Galhos e Cipós',
      },
      BUSH_BARE: { name: 'Arbusto Desfolhado', solid: true, inert: true, note: 'Voltará a brotar em poucos dias.' },
      CITRUS_TREE: {
        name: 'Árvore Cítrica Silvestre', solid: true, verb: 'Colher frutas', handler: 'gather',
        tool: null, minutes: 10, kcal: 20, stamina: 3, hygiene: -1,
        drops: [{ id: 'citrus', min: 1, max: 3 }],
        depleted: 'CITRUS_BARE', regen: 4, catalog: 'Frutas Cítricas (Vitaminas)',
      },
      CITRUS_BARE: { name: 'Cítrica sem Frutos', solid: true, inert: true, note: 'Novos frutos amadurecem em alguns dias.' },
      HERB_PLANT: {
        name: 'Erva Medicinal', solid: true, verb: 'Colher ervas', handler: 'gather',
        tool: null, minutes: 10, kcal: 20, stamina: 3, hygiene: -1,
        drops: [{ id: 'herb', min: 1, max: 2 }],
        depleted: 'HERB_SPROUT', regen: 4, catalog: 'Ervas Medicinais',
      },
      HERB_SPROUT: { name: 'Broto de Erva', solid: true, inert: true, note: 'A erva está rebrotando.' },
      BOULDER_STONE: {
        name: 'Rocha Superficial (Pedra/Sílex)', solid: true, verb: 'Lascar pedra', handler: 'gather',
        tool: null, minutes: 15, kcal: 30, stamina: 5, hygiene: -3,
        drops: [{ id: 'stone', min: 1, max: 2 }],
        uses: 4, depleted: null, regen: 20, catalog: 'Pedra e Sílex',
        blast: [{ id: 'stone', min: 5, max: 7 }],
      },
      IRON_VEIN: {
        name: 'Veio de Pirita / Ferro', solid: true, verb: 'Minerar', handler: 'mine',
        tool: 'pickaxe', toolName: 'Picareta de Ferro ou Aço (Era 2)', minutes: 90, kcal: 250, stamina: 25, hygiene: -6,
        drops: [{ id: 'iron_ore', min: 2, max: 3 }, { id: 'copper_ore', min: 1, max: 1, chance: 0.25 }, { id: 'sulfur', min: 1, max: 1, chance: 0.2 }],
        uses: 8, depleted: null, regen: 40, catalog: 'Minério de Ferro (Pirita)',
        blast: [{ id: 'iron_ore', min: 5, max: 7 }, { id: 'copper_ore', min: 1, max: 3 }, { id: 'sulfur', min: 1, max: 2 }],
      },
      CLAY_DEPOSIT: {
        name: 'Depósito de Argila', solid: true, verb: 'Escavar argila', handler: 'gather',
        tool: null, minutes: 15, kcal: 30, stamina: 5, hygiene: -8,
        drops: [{ id: 'clay', min: 2, max: 3 }],
        depleted: null, regen: 6, catalog: 'Argila Úmida',
      },
      BALLOON_WRECKAGE: {
        name: 'Destroços do Balão', solid: true, verb: 'Vasculhar', handler: 'wreckage',
        tool: null, minutes: 30, kcal: 40, stamina: 5, hygiene: -3, catalog: 'Destroços do Balão',
      },
      BALLOON_RAGS: { name: 'Lona Rasgada do Balão', solid: false, inert: true, note: 'Nada mais de útil aqui.' },
      WASHED_CRATE: {
        name: 'Caixa de Naufrágio', solid: true, verb: 'Abrir caixa', handler: 'crate',
        tool: null, minutes: 20, kcal: 25, stamina: 4, hygiene: -2, catalog: 'Caixas de Naufrágio',
      },
      CAMPFIRE_UNLIT: { name: 'Fogueira Apagada', solid: true, verb: 'Acender / Reabastecer', handler: 'campfire', structure: true },
      CAMPFIRE_LIT:   { name: 'Fogueira Acesa',   solid: true, verb: 'Alimentar fogo',        handler: 'campfire', structure: true, light: 5.5 },
      LEAF_SHELTER:   { name: 'Abrigo de Folhas', solid: true, verb: 'Inspecionar', handler: 'shelter', structure: true },
      WATER_FILTER:   { name: 'Filtro de Água (Areia + Carvão)', solid: true, verb: 'Filtrar água', handler: 'filter', structure: true },
    },

    // ---- Clima --------------------------------------------------------
    WEATHER: {
      CLEAR:   { label: 'Sol',            temp: 0,  fuel: 1.0, wet: false, weight: 50, hours: [4, 10] },
      WIND:    { label: 'Vento Forte',    temp: -3, fuel: 1.3, wet: false, weight: 15, hours: [3, 7] },
      RAIN:    { label: 'Chuva Tropical', temp: -4, fuel: 2.0, wet: true,  weight: 25, hours: [3, 8] },
      MONSOON: { label: 'Monção',         temp: -6, fuel: 2.5, wet: true,  weight: 10, hours: [5, 12] },
    },

    // ---- Condições (doenças e buffs) ---------------------------------
    CONDITIONS: {
      DYSENTERY: {
        name: 'Disenteria', kind: 'bad', icon: '☣',
        desc: 'Hidratação cai 3x mais rápido e a Stamina máxima é reduzida em 30%.',
        cure: 'Beba apenas água fervida ou filtrada, tome Chá de Ervas e descanse/durma por cerca de 2 dias.',
      },
      SCURVY: {
        name: 'Escorbuto', kind: 'bad', icon: '☠',
        desc: 'HP máximo reduzido em 40%, sangramento lento (-5 HP/dia) e fadiga.',
        cure: 'Coma frutas cítricas ou vegetais frescos até as Vitaminas passarem de 60%.',
      },
      SCURVY_RISK: {
        name: 'Risco de Escorbuto', kind: 'warn', icon: '!',
        desc: 'As Vitaminas estão abaixo de 20%. Após 3 dias assim surge o Escorbuto.',
        cure: 'Colha Frutas Cítricas nas árvores silvestres da floresta.',
      },
      FOOD_POISONING: {
        name: 'Intoxicação Alimentar', kind: 'bad', icon: '☢',
        desc: 'Náusea: perda de Hidratação, HP e Stamina máxima reduzida por algumas horas.',
        cure: 'Chá de Ervas Digestivas (Erva + Água Fervida) e hidratação limpa. Cozinhe sempre o peixe.',
      },
      HYPOTHERMIA: {
        name: 'Hipotermia', kind: 'bad', icon: '❄',
        desc: 'Movimento e ações com metade da velocidade; perda contínua de HP.',
        cure: 'Aproxime-se de uma Fogueira acesa ou abrigue-se. Bebidas quentes (Chá de Ervas) ajudam.',
      },
      SKIN_INFECTION: {
        name: 'Infecção Cutânea', kind: 'bad', icon: '✚',
        desc: 'Dano contínuo de HP e febre. Surge ao trabalhar ferido com Higiene < 30%.',
        cure: 'Lave-se no rio (Higiene ≥ 60%) e descanse; Ervas Medicinais aceleram a cura.',
      },
      MALARIA: {
        name: 'Malária / Febre Tropical', kind: 'bad', icon: '♨',
        desc: 'Picos de febre: a Stamina máxima despenca (×0,4) e há tremores à noite.',
        cure: 'Extrato de Quinino Refinado (Laboratório Químico: Ervas + Ácido Sulfúrico) e uma cama aquecida.',
      },
      MUSCLE_ACHE: {
        name: 'Dores Musculares', kind: 'bad', icon: '≈',
        desc: 'Ações 20% mais lentas. Causado por sono ruim no chão/na chuva.',
        cure: 'Durma em um Abrigo de Folhas perto de uma Fogueira.',
      },
      WELL_RESTED: {
        name: 'Bem Descansado', kind: 'good', icon: '☼',
        desc: 'Sono reparador: Stamina e disposição em alta durante o dia.',
        cure: '',
      },
      MIND_LUCID: {
        name: 'Mente Lúcida', kind: 'good', icon: '✦',
        desc: '+50% de XP Científico. Bem nutrido, hidratado e descansado perto de fogo/abrigo.',
        cure: '',
      },
    },

    // ---- As 4 Eras ----------------------------------------------------
    ERAS: [
      { id: 1, name: 'Sobrevivência e Empirismo', levels: '1–3', active: true,
        text: 'Fogueira, Abrigo de Folhas, Machado de Pedra, Lança de Madeira, Filtro de Água, coleta e desmontagem de sucatas simples.' },
      { id: 2, name: 'Cerâmica, Metalurgia e Agricultura', levels: '4–7', active: true,
        text: 'Forno de Olaria, Alto-Forno Catalão, ferramentas de ferro e aço, agricultura sistemática, alvenaria e marcenaria.',
        diary: '"Sem fornos não há ferro; sem ferro, não há ciência. Preciso de argila refratária e carvão em abundância."' },
      { id: 3, name: 'Química, Hidráulica e Automação', levels: '8–11', active: true,
        text: 'Laboratório Químico, Roda d\'Água, Serraria Hidráulica, Moinho, irrigação por canais, sabão e nitroglicerina.',
        diary: '"A água do rio trabalhará por nós, sem pedir calorias."' },
      { id: 4, name: 'Eletricidade e Domínio Industrial', levels: '12–15', active: true,
        text: 'Bateria Voltaica, Dínamo Hidrelétrico, iluminação elétrica, estufa climatizada, telégrafo e oficina de precisão.',
        diary: '"Quando a ilha acender suas luzes, saberei que vencemos."' },
    ],
  };

  // ------------------------------------------------------------------
  // Sprint 2: estruturas, estações, máquinas e culturas
  // ------------------------------------------------------------------
  const OBJ = Config.OBJECTS;
  const struct = (id, name, extra) => {
    OBJ[id] = Object.assign({ name, solid: true, structure: true, handler: 'info', verb: 'Inspecionar' }, extra);
  };
  struct('WALL_WOOD', 'Parede de Madeira', { barrier: true });
  struct('WALL_STONE', 'Parede de Alvenaria (Granito)', { barrier: true });
  struct('WALL_BRICK', 'Parede de Alvenaria (Tijolo)', { barrier: true });
  struct('WINDOW_GLASS', 'Janela de Vidro', { barrier: true });
  struct('DOOR_WOOD', 'Porta de Madeira', { solid: false, barrier: 'door', handler: 'door', verb: 'Abrir / Fechar' });
  struct('FIREPLACE_UNLIT', 'Lareira de Pedra (apagada)', { handler: 'campfire', verb: 'Acender / Reabastecer' });
  struct('FIREPLACE_LIT', 'Lareira de Pedra (acesa)', { handler: 'campfire', verb: 'Alimentar fogo', light: 4.5 });
  struct('BED_RUSTIC', 'Cama Rústica', { handler: 'bed', verb: 'Deitar', bed: 40 });
  struct('BED_COMFORT', 'Cama Confortável', { handler: 'bed', verb: 'Deitar', bed: 55 });
  struct('CHEST', 'Baú de Armazenamento', { handler: 'station', station: 'chest', verb: 'Abrir baú' });
  struct('WORKBENCH', 'Bancada de Engenharia', { handler: 'station', station: 'workbench', verb: 'Usar bancada' });
  struct('KILN', 'Forno de Olaria (Kiln)', { handler: 'station', station: 'kiln', verb: 'Operar forno' });
  struct('BLAST_FURNACE', 'Alto-Forno Catalão', { handler: 'station', station: 'blast', verb: 'Operar alto-forno' });
  struct('LAB', 'Laboratório Químico', { handler: 'station', station: 'lab', verb: 'Usar laboratório' });
  struct('WORKSHOP', 'Oficina de Precisão', { handler: 'station', station: 'workshop', verb: 'Usar oficina' });
  struct('SAWMILL', 'Serraria Hidráulica', { handler: 'station', station: 'sawmill', verb: 'Operar serraria' });
  struct('MILL', 'Moinho Hidráulico', { handler: 'station', station: 'mill', verb: 'Operar moinho' });
  struct('WATER_WHEEL', "Roda d'Água", { handler: 'machine', verb: 'Inspecionar' });
  struct('DYNAMO', 'Dínamo Hidrelétrico', { handler: 'machine', verb: 'Inspecionar' });
  struct('BATTERY', 'Bateria Voltaica', { handler: 'machine', verb: 'Inspecionar' });
  struct('LAMP_POST', 'Poste de Luz Elétrica', { handler: 'machine', verb: 'Inspecionar', light: 7 });
  struct('GREENHOUSE', 'Estufa Climatizada', { handler: 'machine', verb: 'Inspecionar' });
  struct('TELEGRAPH', 'Estação de Telégrafo', { handler: 'machine', verb: 'Inspecionar' });

  // Culturas: 4 tipos x 4 estágios visuais
  Config.CROPS = {
    tuber:  { name: 'Tubérculo',        seed: 'seed_tuber',  days: 4, yield: { id: 'root', min: 3, max: 5 } },
    legume: { name: 'Feijão',           seed: 'seed_legume', days: 5, yield: { id: 'bean', min: 2, max: 4 } },
    veg:    { name: 'Hortaliça',        seed: 'seed_veg',    days: 3, yield: { id: 'vegetable', min: 2, max: 4 } },
    fiber:  { name: 'Fibra / Algodão',  seed: 'seed_fiber',  days: 4, yield: { id: 'fiber', min: 3, max: 5 } },
  };
  Config.CROP_STAGES = ['Semente', 'Broto', 'Crescendo', 'Pronta para colheita'];
  Object.keys(Config.CROPS).forEach((t) => {
    for (let st = 0; st < 4; st++) {
      OBJ[`CROP_${t.toUpperCase()}_${st}`] = {
        name: `${Config.CROPS[t].name} (${Config.CROP_STAGES[st]})`, solid: false, handler: 'crop', structure: false,
        crop: { type: t, stage: st }, clickInteract: true, verb: st === 3 ? 'Colher' : 'Cuidar da plantação',
      };
    }
  });

  // Helpers de tempo/clima
  Config.pad2 = (n) => String(Math.floor(n)).padStart(2, '0');
  Config.clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  Ilha.Config = Config;
})();
