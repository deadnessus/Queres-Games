/* =====================================================================
 * crafting.js — Banco de itens, inventário, receitas das 4 Eras,
 * consumo, equipamento (com multiplicadores de ferramenta) e desmontagem
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;

  // -----------------------------------------------------------------
  // Banco de itens
  // use: { minutes, cal, hyd, protein, vit, special }
  // equip: { tool, mult }  (mult < 1 = mais rápido/barato)
  // -----------------------------------------------------------------
  const ITEMS = {
    wood_branch: { name: 'Galhos e Cipós', icon: 'twigs', weight: 0.2, type: 'material', desc: 'Gravetos e cipós flexíveis: cordas simples, lenha fina e abrigo primitivo.' },
    stone: { name: 'Pedra / Sílex', icon: 'stone', weight: 0.8, type: 'material', desc: 'Pedra lascável. Duas pedras batidas fazem faísca.' },
    log: { name: 'Tora de Madeira', icon: 'log', weight: 3, type: 'material', desc: 'Madeira de lei. Lenha duradoura e matéria-prima para tábuas e carvão.' },
    clay: { name: 'Argila Úmida', icon: 'clay', weight: 0.6, type: 'material', desc: 'Argila do rio: tijolos, potes e telhas no Forno de Olaria.' },
    resin: { name: 'Resina de Árvore', icon: 'resin', weight: 0.2, type: 'material', desc: 'Seiva espessa e inflamável. Base das tochas.' },
    sand: { name: 'Areia', icon: 'sand', weight: 0.5, type: 'material', desc: 'Areia fina de praia: filtro de água e vidro.' },
    charcoal: { name: 'Carvão Vegetal', icon: 'charcoal', weight: 0.3, type: 'material', desc: 'Madeira carbonizada. Filtra água e alimenta fornos.' },
    plank: { name: 'Tábua', icon: 'plank', weight: 0.8, type: 'material', desc: 'Tábua serrada: pisos, paredes, portas, móveis e máquinas.' },
    fiber: { name: 'Fibra Vegetal', icon: 'fiber', weight: 0.1, type: 'material', desc: 'Fibras resistentes: cordas, tecido e vedação do fole do alto-forno.' },
    ash: { name: 'Cinzas', icon: 'ash', weight: 0.2, type: 'material', desc: 'Cinzas de fogo: adubo (+50% de crescimento), vidro e sabão.' },
    iron_ore: { name: 'Minério de Ferro', icon: 'iron_ore', weight: 1, type: 'material', desc: 'Pirita/hematita. Funda no Alto-Forno com fogo forte.' },
    copper_ore: { name: 'Minério de Cobre', icon: 'copper_ore', weight: 1, type: 'material', desc: 'Para lingotes de cobre: fios, baterias e telégrafo.' },
    sulfur: { name: 'Enxofre', icon: 'sulfur', weight: 0.3, type: 'material', desc: 'Pó amarelo dos veios: base do ácido sulfúrico.' },
    refractory_brick: { name: 'Tijolo Refratário', icon: 'refractory_brick', weight: 1.2, type: 'material', desc: 'Tijolo queimado resistente ao fogo: fornos, lareiras e alvenaria.' },
    roof_tile: { name: 'Telha Cerâmica', icon: 'roof_tile', weight: 0.6, type: 'material', desc: 'Telha de barro cozido para telhados duráveis.' },
    glass: { name: 'Vidro', icon: 'glass', weight: 0.4, type: 'material', desc: 'Vidro soprado: janelas, laboratório, estufa e baterias.' },
    iron_ingot: { name: 'Lingote de Ferro', icon: 'iron_ingot', weight: 1.5, type: 'material', desc: 'Ferro forjado: ferramentas e máquinas.' },
    steel_ingot: { name: 'Lingote de Aço', icon: 'steel_ingot', weight: 1.5, type: 'material', desc: 'Aço temperado com carvão: ferramentas e mecanismos de precisão.' },
    copper_ingot: { name: 'Lingote de Cobre', icon: 'copper_ingot', weight: 1.2, type: 'material', desc: 'Cobre fundido: fios e eletricidade.' },
    iron_gear: { name: 'Engrenagem de Ferro', icon: 'iron_gear', weight: 0.3, type: 'component', desc: 'Engrenagem robusta para serraria e moinho.' },
    copper_wire: { name: 'Fio de Cobre', icon: 'copper_wire', weight: 0.15, type: 'component', desc: 'Fio para dínamo, postes e telégrafo.' },
    fabric: { name: 'Tecido', icon: 'fabric', weight: 0.2, type: 'material', desc: 'Pano tecido de fibras: colchão da cama confortável.' },
    pot: { name: 'Pote de Cerâmica', icon: 'pot', weight: 1, type: 'material', desc: 'Pote de barro. Com 5 águas limpas vira um Pote com Água.' },
    pot_water: { name: 'Pote com Água Limpa', icon: 'pot_water', weight: 1.8, type: 'drink', desc: 'Armazena até 5 porções de água limpa (mais leve que 5 cantis).',
      use: { minutes: 1, hyd: 30, special: 'pot_water' } },
    seed_tuber: { name: 'Semente de Tubérculo', icon: 'seed_tuber', weight: 0.02, type: 'seed', desc: 'Planta em terra arada: rende raízes calóricas.' },
    seed_legume: { name: 'Semente de Feijão', icon: 'seed_legume', weight: 0.02, type: 'seed', desc: 'Leguminosa: rende feijões ricos em proteína.' },
    seed_veg: { name: 'Semente de Hortaliça', icon: 'seed_veg', weight: 0.02, type: 'seed', desc: 'Hortaliça: rende verduras ricas em vitaminas.' },
    seed_fiber: { name: 'Semente de Fibra/Algodão', icon: 'seed_fiber', weight: 0.02, type: 'seed', desc: 'Fibra vegetal para tecido e cordas.' },
    fish_oil: { name: 'Óleo de Peixe', icon: 'fish_oil', weight: 0.4, type: 'material', desc: 'Gordura para sabão e nitroglicerina.' },
    sulfuric_acid: { name: 'Ácido Sulfúrico', icon: 'sulfuric_acid', weight: 0.5, type: 'material', desc: 'Reagente corrosivo. Cuidado!' },
    nitro: { name: 'Nitroglicerina', icon: 'nitro', weight: 0.5, type: 'material', desc: 'Explosivo instável. Interaja com rochas, veios ou árvores para detoná-la.' },

    salted_fish: { name: 'Peixe Salgado', icon: 'salted_fish', weight: 0.4, type: 'food', desc: 'Conserva das tribos costeiras: muita proteína e calorias.',
      use: { minutes: 5, cal: 240, protein: 32 } },
    leather: { name: 'Couro Curtido', icon: 'leather', weight: 0.6, type: 'material', desc: 'Couro das caçadas da Tribo Cinza do Pico. Serve de fole no Alto-Forno.' },
    pearl: { name: 'Pérola', icon: 'pearl', weight: 0.02, type: 'material', desc: 'Gema da Tribo Coroa de Coral: valiosa no escambo.' },
    volt_cell: { name: 'Célula Voltaica Naval', icon: 'volt_cell', weight: 0.6, type: 'component', desc: 'Pilha avançada do Submarino. Substitui o ácido e o cobre na Bateria Voltaica.' },
    citrus: { name: 'Fruta Cítrica', icon: 'citrus', weight: 0.3, type: 'food', desc: 'Rica em vitamina C: previne e cura o Escorbuto.',
      use: { minutes: 3, cal: 60, hyd: 8, vit: 25 } },
    root: { name: 'Raízes Comestíveis', icon: 'root', weight: 0.4, type: 'food', desc: 'Tubérculos, densos em calorias.',
      use: { minutes: 5, cal: 220, vit: 3 } },
    bean: { name: 'Feijão', icon: 'bean', weight: 0.2, type: 'food', desc: 'Grão rico em proteína vegetal.',
      use: { minutes: 4, cal: 180, protein: 22 } },
    vegetable: { name: 'Hortaliça Fresca', icon: 'vegetable', weight: 0.3, type: 'food', desc: 'Verduras: vitaminas e hidratação.',
      use: { minutes: 3, cal: 40, hyd: 6, vit: 30 } },
    flour: { name: 'Farinha Nutritiva', icon: 'flour', weight: 0.5, type: 'food', desc: 'Farinha moída: muito calórica e nutritiva.',
      use: { minutes: 5, cal: 480, protein: 10, vit: 5 } },
    herb: { name: 'Erva Medicinal', icon: 'herb', weight: 0.1, type: 'medicine', desc: 'Mastigada, dá vitaminas e ajuda a combater infecções.',
      use: { minutes: 3, vit: 6, special: 'herb' } },
    raw_fish: { name: 'Peixe Cru', icon: 'raw_fish', weight: 0.5, type: 'food', desc: 'Proteína fresca — mas cru pode causar Intoxicação Alimentar. Asse na fogueira.',
      use: { minutes: 4, cal: 120, protein: 18, special: 'raw_fish' } },
    cooked_fish: { name: 'Peixe Assado', icon: 'cooked_fish', weight: 0.4, type: 'food', desc: 'Peixe assado na brasa: seguro e nutritivo.',
      use: { minutes: 6, cal: 260, protein: 35, vit: 2 } },
    dirty_water: { name: 'Água Suja do Rio', icon: 'water_dirty', weight: 0.5, type: 'drink', desc: 'Não tratada: 35% de chance de causar Disenteria. Ferva ou filtre. (Serve para regar plantas.)',
      use: { minutes: 1, hyd: 25, special: 'dirty_water' } },
    boiled_water: { name: 'Água Fervida', icon: 'water_boiled', weight: 0.5, type: 'drink', desc: 'Água segura, purificada pelo fogo.',
      use: { minutes: 1, hyd: 30 } },
    clean_water: { name: 'Água Purificada', icon: 'water_clean', weight: 0.5, type: 'drink', desc: 'Filtrada em areia e carvão: segura e sem gastar lenha.',
      use: { minutes: 1, hyd: 30 } },
    herb_tea: { name: 'Chá de Ervas Digestivas', icon: 'herb_tea', weight: 0.4, type: 'medicine', desc: 'Bebida quente: cura Intoxicação Alimentar, alivia Disenteria e aquece o corpo.',
      use: { minutes: 3, hyd: 20, vit: 4, special: 'herb_tea' } },
    soap: { name: 'Sabão', icon: 'soap', weight: 0.2, type: 'medicine', desc: 'Higiene a 100% e cura a Infecção Cutânea.',
      use: { minutes: 10, special: 'soap' } },
    quinine: { name: 'Extrato de Quinino Refinado', icon: 'quinine', weight: 0.2, type: 'medicine', desc: 'Cura a Malária / Febre Tropical.',
      use: { minutes: 2, special: 'quinine' } },
    ration: { name: 'Ração de Emergência', icon: 'ration', weight: 0.4, type: 'food', desc: 'Lata de biscoito e carne seca do balão. Muito calórica.',
      use: { minutes: 5, cal: 700, protein: 15, vit: 5 } },

    pocket_watch_broken: { name: 'Relógio de Bolso Quebrado', icon: 'watch', weight: 0.2, type: 'scrap', desc: 'Mecanismo de precisão danificado. Desmonte para obter peças.' },
    compass_rusty: { name: 'Bússola Náutica Oxidada', icon: 'compass', weight: 0.3, type: 'scrap', desc: 'Corroída pela maresia, mas as peças ainda servem.' },
    toolbox_rusty: { name: 'Caixa de Ferramentas Enferrujada', icon: 'toolbox', weight: 2.5, type: 'scrap', desc: 'Cheia de ferro velho aproveitável.' },

    gear: { name: 'Engrenagem de Precisão', icon: 'gear', weight: 0.05, type: 'component', desc: 'Componente de relojoaria.' },
    spring: { name: 'Mola de Aço', icon: 'spring', weight: 0.05, type: 'component', desc: 'Mola fina de aço temperado.' },
    lens: { name: 'Lente Óptica', icon: 'lens', weight: 0.05, type: 'component', desc: 'Vidro polido: luneta, telégrafo e microscópio.' },
    needle: { name: 'Agulha Magnetizada', icon: 'needle', weight: 0.02, type: 'component', desc: 'Agulha imantada de bússola.' },
    brass_case: { name: 'Caixa de Latão', icon: 'brass_case', weight: 0.2, type: 'component', desc: 'Invólucro de latão resistente.' },
    iron_scrap: { name: 'Sucata de Ferro', icon: 'iron_scrap', weight: 0.5, type: 'component', desc: 'Ferro velho: vai direto ao Alto-Forno (3 sucatas = 1 lingote).' },
    screw: { name: 'Parafuso', icon: 'screw', weight: 0.02, type: 'component', desc: 'Parafuso de ferro.' },
    steel_blade: { name: 'Lâmina de Aço', icon: 'steel_blade', weight: 0.3, type: 'component', desc: 'Lâmina de aço, ainda afiada.' },

    stone_axe: { name: 'Machado de Pedra', icon: 'stone_axe', weight: 1.5, type: 'tool', equip: { tool: 'axe', mult: 1 }, desc: 'Corta árvores de lei. Equipe numa das mãos.' },
    iron_axe: { name: 'Machado de Ferro', icon: 'iron_axe', weight: 1.8, type: 'tool', equip: { tool: 'axe', mult: 0.5 }, desc: 'Corta árvores na METADE do tempo e das calorias.' },
    steel_axe: { name: 'Machado de Aço', icon: 'steel_axe', weight: 1.8, type: 'tool', equip: { tool: 'axe', mult: 0.35 }, desc: 'Corta árvores em 35% do tempo e das calorias.' },
    iron_pickaxe: { name: 'Picareta de Ferro', icon: 'iron_pickaxe', weight: 2, type: 'tool', equip: { tool: 'pickaxe', mult: 1 }, desc: 'Habilita minerar os veios de ferro e cobre.' },
    steel_pickaxe: { name: 'Picareta de Aço', icon: 'steel_pickaxe', weight: 2, type: 'tool', equip: { tool: 'pickaxe', mult: 0.6 }, desc: 'Minera em 60% do tempo e das calorias.' },
    iron_hoe: { name: 'Enxada de Ferro', icon: 'iron_hoe', weight: 1.5, type: 'tool', equip: { tool: 'hoe', mult: 1 }, desc: 'Ara a terra para plantar.' },
    iron_shovel: { name: 'Pá de Ferro', icon: 'iron_shovel', weight: 1.6, type: 'tool', equip: { tool: 'shovel', mult: 1 }, desc: 'Cava canais de irrigação.' },
    iron_knife: { name: 'Faca de Ferro', icon: 'iron_knife', weight: 0.4, type: 'tool', equip: { tool: 'knife', mult: 1 }, desc: 'Corta ervas e couro com precisão.' },
    wood_spear: { name: 'Lança de Madeira', icon: 'wood_spear', weight: 1.2, type: 'tool', equip: { tool: 'spear', mult: 1 }, desc: 'Ponta endurecida no fogo. Serve para pescar.' },
    resin_torch: { name: 'Tocha de Resina', icon: 'resin_torch', weight: 0.6, type: 'tool', equip: { tool: 'torch', mult: 1 }, desc: 'Ilumina a noite por ~4 horas. Aquece levemente.' },
  };

  const TORCH_HOURS = 4;
  const WATERS = ['clean_water', 'boiled_water'];

  // -----------------------------------------------------------------
  // Receitas
  //  kind: 'item' | 'structure'
  //  layer (structure): 'object' (padrão) | 'floor' | 'roof' | 'terrain'
  //  station: bancada/lab/oficina próxima (<=2 tiles) para fabricar
  //  tool: ferramenta equipada exigida; minLevel: nível mínimo
  //  in: [{id,qty}] ou [{anyOf:[ids], qty}]
  // -----------------------------------------------------------------
  const R = [];
  const item = (id, name, out, inp, o) => R.push(Object.assign({ id, name, kind: 'item', icon: ITEMS[out.id] ? ITEMS[out.id].icon : 'stone', out, in: inp, minLevel: 1 }, o));
  const struct = (id, name, place, inp, o) => R.push(Object.assign({ id, name, kind: 'structure', layer: 'object', place, in: inp, minLevel: 1 }, o));

  // ---- Era 1 ----
  item('stone_axe', 'Machado de Pedra', { id: 'stone_axe', qty: 1 }, [{ id: 'stone', qty: 2 }, { id: 'wood_branch', qty: 3 }],
    { minutes: 30, kcal: 60, stamina: 6, xp: 20, desc: 'Pedra amarrada a um cabo com cipós. Corta árvores de lei.' });
  item('wood_spear', 'Lança de Madeira', { id: 'wood_spear', qty: 1 }, [{ id: 'wood_branch', qty: 4 }, { id: 'stone', qty: 1 }],
    { minutes: 20, kcal: 40, stamina: 4, xp: 15, desc: 'Arma e ferramenta de pesca. Permite arpoar peixes no rio e no mar raso.' });
  item('resin_torch', 'Tocha de Resina', { id: 'resin_torch', qty: 1 }, [{ id: 'wood_branch', qty: 2 }, { id: 'resin', qty: 1 }],
    { minutes: 10, kcal: 15, stamina: 2, xp: 10, desc: 'Luz portátil para a noite, na mão esquerda.' });
  item('cooked_fish', 'Peixe Assado', { id: 'cooked_fish', qty: 1 }, [{ id: 'raw_fish', qty: 1 }],
    { minutes: 15, kcal: 10, stamina: 1, xp: 8, fire: true, desc: 'Elimina o risco de intoxicação e dobra a proteína.' });
  item('boiled_water', 'Água Fervida', { id: 'boiled_water', qty: 1 }, [{ id: 'dirty_water', qty: 1 }],
    { minutes: 20, kcal: 5, stamina: 1, xp: 8, fire: true, desc: 'Ferver mata os germes da Água Suja do Rio.' });
  item('herb_tea', 'Chá de Ervas Digestivas', { id: 'herb_tea', qty: 1 }, [{ id: 'herb', qty: 1 }, { id: 'boiled_water', qty: 1 }],
    { minutes: 10, kcal: 5, stamina: 1, xp: 10, fire: true, desc: 'Cura Intoxicação Alimentar e alivia a Disenteria.' });
  item('charcoal', 'Carvão Vegetal', { id: 'charcoal', qty: 2 }, [{ id: 'log', qty: 1 }],
    { minutes: 40, kcal: 30, stamina: 3, xp: 12, fire: true, desc: 'Queima lenta de uma tora na brasa. Essencial para o Filtro de Água e fornos.' });
  struct('campfire', 'Fogueira', 'CAMPFIRE_UNLIT', [{ id: 'wood_branch', qty: 5 }, { id: 'stone', qty: 3 }],
    { icon: 'campfire', minutes: 20, kcal: 40, stamina: 4, xp: 25, desc: 'Círculo de pedras com lenha. Depois de posicionada, acenda-a (Pedra + 1 Galhos como isca).' });
  struct('leaf_shelter', 'Abrigo de Folhas', 'LEAF_SHELTER', [{ id: 'wood_branch', qty: 12 }],
    { icon: 'shelter', minutes: 60, kcal: 100, stamina: 12, xp: 30, desc: 'Protege da chuva e do vento. Durma encostado a ele para sono melhor.' });
  struct('water_filter', 'Filtro de Água', 'WATER_FILTER', [{ id: 'sand', qty: 4 }, { id: 'charcoal', qty: 2 }, { id: 'wood_branch', qty: 3 }],
    { icon: 'filter', minutes: 30, kcal: 40, stamina: 4, xp: 35, desc: 'Camadas de areia e carvão purificam a água sem gastar lenha.' });

  // ---- Base de construção (níveis 2–3) ----
  item('plank', 'Tábua (3x)', { id: 'plank', qty: 3 }, [{ id: 'log', qty: 1 }],
    { tool: 'axe', minutes: 40, kcal: 60, stamina: 6, xp: 12, minLevel: 2, desc: 'Serra uma tora em tábuas com o machado equipado.' });
  struct('floor_wood', 'Piso de Madeira', 'FLOOR_WOOD', [{ id: 'plank', qty: 2 }],
    { layer: 'floor', icon: 'floor', minutes: 10, kcal: 15, stamina: 2, xp: 8, minLevel: 2, desc: 'Piso de tábuas: base de uma casa (não bloqueia a passagem).' });
  struct('wall_wood', 'Parede de Madeira', 'WALL_WOOD', [{ id: 'plank', qty: 3 }, { id: 'wood_branch', qty: 1 }],
    { minutes: 25, kcal: 40, stamina: 5, xp: 12, minLevel: 2, desc: 'Parede sólida: delimita cômodos e bloqueia o caminho.' });
  struct('door_wood', 'Porta de Madeira', 'DOOR_WOOD', [{ id: 'plank', qty: 4 }, { id: 'wood_branch', qty: 2 }],
    { minutes: 30, kcal: 40, stamina: 5, xp: 15, minLevel: 2, desc: 'Abre ao passar e fecha atrás de você. Clique direito para travar aberta/fechada.' });
  struct('roof_thatch', 'Telhado de Palha', 'ROOF_THATCH', [{ id: 'wood_branch', qty: 6 }],
    { layer: 'roof', icon: 'roof', minutes: 15, kcal: 25, stamina: 3, xp: 10, minLevel: 3, desc: 'Cobre o cômodo. Precisa apoiar em parede ou em outro telhado.' });

  // ---- Era 2: Cerâmica, Metalurgia e Agricultura (4–7) ----
  struct('kiln', 'Forno de Olaria (Kiln)', 'KILN', [{ id: 'clay', qty: 12 }, { id: 'stone', qty: 6 }],
    { minutes: 60, kcal: 100, stamina: 10, xp: 50, minLevel: 4, desc: 'Queima argila: tijolo refratário, telha, pote e vidro.' });
  struct('workbench', 'Bancada de Engenharia', 'WORKBENCH', [{ id: 'plank', qty: 8 }, { id: 'wood_branch', qty: 6 }],
    { minutes: 45, kcal: 70, stamina: 8, xp: 50, minLevel: 4, desc: 'Fabrica ferramentas de ferro e desmonta sucatas com bônus de componentes.' });
  struct('bed_rustic', 'Cama Rústica (de madeira)', 'BED_RUSTIC', [{ id: 'plank', qty: 6 }, { id: 'fiber', qty: 4 }],
    { minutes: 40, kcal: 60, stamina: 6, xp: 40, minLevel: 4, desc: 'Melhora muito a qualidade do sono.' });
  struct('chest', 'Baú de Armazenamento', 'CHEST', [{ id: 'plank', qty: 6 }, { id: 'fiber', qty: 2 }],
    { minutes: 30, kcal: 40, stamina: 5, xp: 30, minLevel: 4, desc: 'Guarda itens sem pesar na mochila.' });
  struct('floor_stone', 'Piso de Pedra', 'FLOOR_STONE', [{ id: 'stone', qty: 3 }],
    { layer: 'floor', icon: 'floor', minutes: 15, kcal: 25, stamina: 3, xp: 12, minLevel: 4, desc: 'Piso de lajes de pedra.' });
  struct('wall_stone', 'Parede de Alvenaria (Granito)', 'WALL_STONE', [{ id: 'stone', qty: 4 }, { id: 'clay', qty: 1 }],
    { minutes: 35, kcal: 60, stamina: 7, xp: 25, minLevel: 4, desc: 'Alvenaria de pedra e argila.' });
  item('fabric', 'Tecido', { id: 'fabric', qty: 1 }, [{ id: 'fiber', qty: 4 }],
    { station: 'workbench', minutes: 15, kcal: 15, stamina: 2, xp: 15, minLevel: 4, desc: 'Tece fibras em pano.' });
  item('pot_water', 'Pote com Água (5 porções)', { id: 'pot_water', qty: 1 }, [{ id: 'pot', qty: 1 }, { anyOf: WATERS, qty: 5 }],
    { minutes: 5, kcal: 5, stamina: 0, xp: 15, minLevel: 4, desc: 'Armazena 5 porções de água limpa num único pote.' });
  struct('floor_brick', 'Piso de Tijolo', 'FLOOR_BRICK', [{ id: 'refractory_brick', qty: 2 }],
    { layer: 'floor', icon: 'floor', minutes: 15, kcal: 25, stamina: 3, xp: 15, minLevel: 5, desc: 'Piso de tijolos refratários.' });
  struct('wall_brick', 'Parede de Alvenaria (Tijolo)', 'WALL_BRICK', [{ id: 'refractory_brick', qty: 3 }],
    { minutes: 35, kcal: 60, stamina: 7, xp: 30, minLevel: 5, desc: 'Alvenaria de tijolos: a mais resistente.' });
  struct('window_glass', 'Janela de Vidro', 'WINDOW_GLASS', [{ id: 'glass', qty: 1 }, { id: 'plank', qty: 2 }],
    { minutes: 25, kcal: 30, stamina: 4, xp: 25, minLevel: 5, desc: 'Parede com vidro: deixa a luz entrar e mantém o cômodo fechado.' });
  struct('roof_tile', 'Telhado de Telhas', 'ROOF_TILE', [{ id: 'roof_tile', qty: 2 }],
    { layer: 'roof', icon: 'roof', minutes: 20, kcal: 35, stamina: 4, xp: 20, minLevel: 5, desc: 'Cobertura de telhas cerâmicas.' });
  struct('fireplace', 'Lareira de Pedra', 'FIREPLACE_UNLIT', [{ id: 'stone', qty: 6 }, { id: 'refractory_brick', qty: 2 }],
    { minutes: 50, kcal: 80, stamina: 8, xp: 45, minLevel: 5, desc: 'Aquece o cômodo (+15 °C de isolamento quando acesa).' });
  item('iron_pickaxe', 'Picareta de Ferro', { id: 'iron_pickaxe', qty: 1 }, [{ id: 'iron_ingot', qty: 3 }, { id: 'plank', qty: 2 }],
    { station: 'workbench', minutes: 40, kcal: 50, stamina: 5, xp: 70, minLevel: 5, desc: 'Habilita minerar os veios de ferro e cobre!' });
  struct('blast_furnace', 'Alto-Forno Catalão', 'BLAST_FURNACE', [{ id: 'refractory_brick', qty: 10 }, { id: 'stone', qty: 8 }, { anyOf: ['fiber', 'leather'], qty: 4 }],
    { minutes: 90, kcal: 150, stamina: 14, xp: 90, minLevel: 6, desc: 'Funde minério e sucata em lingotes de ferro, aço e cobre.' });
  struct('irrigation_canal', 'Canal de Irrigação', 'IRRIGATION_CANAL', [],
    { layer: 'terrain', tool: 'shovel', icon: 'canal', minutes: 30, kcal: 60, stamina: 8, xp: 25, minLevel: 6, desc: 'Cave junto ao rio (ou de outro canal): rega plantações a até 2 tiles.' });
  item('iron_axe', 'Machado de Ferro', { id: 'iron_axe', qty: 1 }, [{ id: 'iron_ingot', qty: 3 }, { id: 'plank', qty: 2 }],
    { station: 'workbench', minutes: 40, kcal: 50, stamina: 5, xp: 50, minLevel: 6, desc: 'Corta árvores na metade do tempo e das calorias.' });
  item('iron_hoe', 'Enxada de Ferro', { id: 'iron_hoe', qty: 1 }, [{ id: 'iron_ingot', qty: 2 }, { id: 'plank', qty: 2 }],
    { station: 'workbench', minutes: 30, kcal: 40, stamina: 4, xp: 40, minLevel: 6, desc: 'Para arar GRAMA e SELVA em Terra Arada.' });
  item('iron_shovel', 'Pá de Ferro', { id: 'iron_shovel', qty: 1 }, [{ id: 'iron_ingot', qty: 2 }, { id: 'plank', qty: 2 }],
    { station: 'workbench', minutes: 30, kcal: 40, stamina: 4, xp: 40, minLevel: 6, desc: 'Para cavar canais de irrigação.' });
  item('iron_knife', 'Faca de Ferro', { id: 'iron_knife', qty: 1 }, [{ id: 'iron_ingot', qty: 1 }, { id: 'plank', qty: 1 }],
    { station: 'workbench', minutes: 20, kcal: 25, stamina: 3, xp: 30, minLevel: 6, desc: 'Lâmina de uso geral.' });
  item('iron_gear', 'Engrenagem de Ferro (2x)', { id: 'iron_gear', qty: 2 }, [{ id: 'iron_ingot', qty: 1 }],
    { station: 'workbench', minutes: 20, kcal: 25, stamina: 3, xp: 30, minLevel: 6, desc: 'Peças robustas para máquinas hidráulicas.' });

  // ---- Era 3: Química, Hidráulica e Automação (8–11) ----
  struct('lab', 'Laboratório Químico', 'LAB', [{ id: 'plank', qty: 6 }, { id: 'glass', qty: 4 }, { id: 'refractory_brick', qty: 4 }, { id: 'iron_ingot', qty: 2 }],
    { minutes: 90, kcal: 120, stamina: 12, xp: 120, minLevel: 8, desc: 'Sabão, ácido sulfúrico, quinino e nitroglicerina.' });
  struct('water_wheel', "Roda d'Água", 'WATER_WHEEL', [{ id: 'plank', qty: 10 }, { id: 'iron_ingot', qty: 4 }, { id: 'fiber', qty: 4 }],
    { rule: 'river', minutes: 120, kcal: 180, stamina: 18, xp: 150, minLevel: 8, desc: 'Só em tiles ao lado do rio. Gera 10 de Força Hidráulica para máquinas a até 2 tiles.' });
  item('fish_oil', 'Óleo de Peixe', { id: 'fish_oil', qty: 1 }, [{ id: 'raw_fish', qty: 2 }],
    { station: 'lab', minutes: 20, kcal: 10, stamina: 2, xp: 30, minLevel: 8, desc: 'Gordura extraída do peixe.' });
  item('soap', 'Sabão (2x)', { id: 'soap', qty: 2 }, [{ id: 'fish_oil', qty: 1 }, { id: 'ash', qty: 2 }],
    { station: 'lab', minutes: 30, kcal: 15, stamina: 2, xp: 60, minLevel: 8, desc: 'Gordura + cinzas (potassa). Eleva a higiene a 100% e cura infecções.' });
  struct('sawmill', 'Serraria Hidráulica', 'SAWMILL', [{ id: 'plank', qty: 8 }, { id: 'iron_ingot', qty: 4 }, { id: 'iron_gear', qty: 3 }],
    { minutes: 100, kcal: 140, stamina: 14, xp: 140, minLevel: 9, desc: 'Serra toras em tábuas sozinha, movida pela Roda d\'Água (a até 2 tiles).' });
  struct('bed_comfort', 'Cama Confortável', 'BED_COMFORT', [{ id: 'plank', qty: 6 }, { id: 'fabric', qty: 4 }, { id: 'fiber', qty: 4 }],
    { minutes: 50, kcal: 70, stamina: 7, xp: 80, minLevel: 9, desc: 'Colchão de tecido: sono de altíssima qualidade.' });
  item('sulfuric_acid', 'Ácido Sulfúrico', { id: 'sulfuric_acid', qty: 1 }, [{ id: 'sulfur', qty: 2 }, { id: 'iron_scrap', qty: 1 }],
    { station: 'lab', minutes: 30, kcal: 15, stamina: 2, xp: 70, minLevel: 9, desc: 'Enxofre + sucata de ferro.' });
  struct('mill', 'Moinho Hidráulico', 'MILL', [{ id: 'plank', qty: 8 }, { id: 'stone', qty: 4 }, { id: 'iron_gear', qty: 2 }, { id: 'iron_ingot', qty: 2 }],
    { minutes: 100, kcal: 140, stamina: 14, xp: 140, minLevel: 10, desc: 'Mói raízes e feijões em Farinha Nutritiva automaticamente.' });
  item('quinine', 'Extrato de Quinino Refinado (2x)', { id: 'quinine', qty: 2 }, [{ id: 'herb', qty: 4 }, { id: 'sulfuric_acid', qty: 1 }],
    { station: 'lab', minutes: 40, kcal: 20, stamina: 3, xp: 90, minLevel: 10, desc: 'Cura Malária / Febre Tropical.' });
  item('copper_wire', 'Fio de Cobre (3x)', { id: 'copper_wire', qty: 3 }, [{ id: 'copper_ingot', qty: 1 }],
    { station: 'workbench', minutes: 25, kcal: 20, stamina: 3, xp: 60, minLevel: 10, desc: 'Trefila cobre em fio.' });
  item('nitro', 'Nitroglicerina', { id: 'nitro', qty: 1 }, [{ id: 'sulfuric_acid', qty: 2 }, { id: 'fish_oil', qty: 1 }],
    { station: 'lab', minutes: 45, kcal: 25, stamina: 4, xp: 110, minLevel: 11, desc: 'Explosivo para abrir rochas, veios e árvores. Perigoso!' });

  // ---- Era 4: Eletricidade e Domínio Industrial (12–15) ----
  struct('dynamo', 'Dínamo Hidrelétrico', 'DYNAMO', [{ id: 'iron_ingot', qty: 6 }, { id: 'copper_wire', qty: 6 }, { id: 'iron_gear', qty: 2 }, { id: 'refractory_brick', qty: 4 }],
    { minutes: 120, kcal: 160, stamina: 14, xp: 200, minLevel: 12, desc: 'Converte a força da Roda d\'Água (a até 2 tiles) em 2 kWh por hora.' });
  struct('battery', 'Bateria Voltaica', 'BATTERY', [{ id: 'copper_ingot', qty: 4 }, { id: 'iron_ingot', qty: 4 }, { id: 'sulfuric_acid', qty: 2 }, { id: 'glass', qty: 2 }],
    { minutes: 60, kcal: 80, stamina: 8, xp: 160, minLevel: 12, desc: 'Armazena até 10 kWh.' });
  struct('battery_naval', 'Bateria Voltaica (Células Navais)', 'BATTERY', [{ id: 'volt_cell', qty: 2 }, { id: 'iron_ingot', qty: 2 }, { id: 'glass', qty: 1 }],
    { minutes: 40, kcal: 60, stamina: 6, xp: 120, minLevel: 12, desc: 'Versão simples da Bateria usando as Células do Submarino Misterioso.' });
  struct('lamp_post', 'Poste de Luz Elétrica', 'LAMP_POST', [{ id: 'iron_ingot', qty: 2 }, { id: 'copper_wire', qty: 2 }, { id: 'glass', qty: 1 }, { id: 'plank', qty: 2 }],
    { minutes: 40, kcal: 50, stamina: 5, xp: 120, minLevel: 12, desc: 'Ilumina um raio amplo à noite sem lenha (0,2 kWh/h).' });
  struct('greenhouse', 'Estufa Climatizada', 'GREENHOUSE', [{ id: 'glass', qty: 8 }, { id: 'iron_ingot', qty: 6 }, { id: 'plank', qty: 4 }],
    { minutes: 120, kcal: 160, stamina: 16, xp: 220, minLevel: 13, desc: 'Plantações a até 2 tiles crescem 2x mais rápido e ignoram clima (0,4 kWh/h).' });
  struct('workshop', 'Oficina de Precisão', 'WORKSHOP', [{ id: 'iron_ingot', qty: 8 }, { id: 'steel_ingot', qty: 4 }, { id: 'iron_gear', qty: 4 }, { id: 'glass', qty: 4 }],
    { minutes: 120, kcal: 160, stamina: 14, xp: 240, minLevel: 13, desc: 'Fabrica engrenagens, lentes, molas e ferramentas de aço (1 kWh por peça).' });
  item('gear', 'Engrenagem de Precisão (2x)', { id: 'gear', qty: 2 }, [{ id: 'steel_ingot', qty: 1 }],
    { station: 'workshop', power: 1, minutes: 30, kcal: 20, stamina: 3, xp: 60, minLevel: 13, desc: 'Peças de relojoaria feitas do zero.' });
  item('lens', 'Lente Óptica', { id: 'lens', qty: 1 }, [{ id: 'glass', qty: 2 }],
    { station: 'workshop', power: 1, minutes: 30, kcal: 20, stamina: 3, xp: 60, minLevel: 13, desc: 'Vidro polido de precisão.' });
  item('spring', 'Mola de Aço (2x)', { id: 'spring', qty: 2 }, [{ id: 'steel_ingot', qty: 1 }],
    { station: 'workshop', power: 1, minutes: 30, kcal: 20, stamina: 3, xp: 60, minLevel: 13, desc: 'Molas temperadas.' });
  item('steel_axe', 'Machado de Aço', { id: 'steel_axe', qty: 1 }, [{ id: 'steel_ingot', qty: 3 }, { id: 'plank', qty: 2 }],
    { station: 'workshop', power: 1, minutes: 45, kcal: 40, stamina: 5, xp: 100, minLevel: 14, desc: 'Corta em 35% do tempo e das calorias.' });
  item('steel_pickaxe', 'Picareta de Aço', { id: 'steel_pickaxe', qty: 1 }, [{ id: 'steel_ingot', qty: 3 }, { id: 'plank', qty: 2 }],
    { station: 'workshop', power: 1, minutes: 45, kcal: 40, stamina: 5, xp: 100, minLevel: 14, desc: 'Minera em 60% do tempo e das calorias.' });
  struct('telegraph', 'Estação de Telégrafo', 'TELEGRAPH', [{ id: 'copper_wire', qty: 10 }, { id: 'iron_ingot', qty: 4 }, { id: 'steel_ingot', qty: 2 }, { id: 'plank', qty: 4 }, { id: 'lens', qty: 2 }],
    { minutes: 180, kcal: 200, stamina: 20, xp: 400, minLevel: 15, desc: 'Estrutura final da Era 4: conecta a base às tribos (Sprint 4).' });

  // Desmontagem (Salvage)
  const SCRAP = {
    pocket_watch_broken: { out: [{ id: 'gear', qty: 2 }, { id: 'spring', qty: 1 }, { id: 'lens', qty: 1 }], minutes: 20, xp: 30 },
    compass_rusty: { out: [{ id: 'needle', qty: 1 }, { id: 'brass_case', qty: 1 }, { id: 'lens', qty: 1 }], minutes: 20, xp: 25 },
    toolbox_rusty: { out: [{ id: 'iron_scrap', qty: 3 }, { id: 'screw', qty: 2 }, { id: 'steel_blade', qty: 1 }], minutes: 30, xp: 35 },
  };

  const RECIPE_ICON_OBJ = {
    campfire: 'CAMPFIRE_LIT', leaf_shelter: 'LEAF_SHELTER', water_filter: 'WATER_FILTER',
    wall_wood: 'WALL_WOOD', door_wood: 'DOOR_X_CLOSED', wall_stone: 'WALL_STONE', wall_brick: 'WALL_BRICK', window_glass: 'WINDOW_GLASS',
    kiln: 'KILN', workbench: 'WORKBENCH', bed_rustic: 'BED_RUSTIC', chest: 'CHEST', blast_furnace: 'BLAST_FURNACE', fireplace: 'FIREPLACE_LIT',
    lab: 'LAB', water_wheel: 'WATER_WHEEL', sawmill: 'SAWMILL', mill: 'MILL', bed_comfort: 'BED_COMFORT', dynamo: 'DYNAMO',
    battery: 'BATTERY', battery_naval: 'BATTERY', lamp_post: 'LAMP_POST_ON', greenhouse: 'GREENHOUSE', workshop: 'WORKSHOP', telegraph: 'TELEGRAPH',
    roof_thatch: 'ROOF_THATCH', roof_tile: 'ROOF_TILE',
  };

  // -----------------------------------------------------------------
  // Inventário
  // -----------------------------------------------------------------
  const P = () => Ilha.State.data.player;
  const S = () => Ilha.State;

  const Crafting = {
    ITEMS, RECIPES: R, SCRAP, TORCH_HOURS, RECIPE_ICON_OBJ, WATERS,

    item(id) { return ITEMS[id]; },
    name(id) { return ITEMS[id] ? ITEMS[id].name : id; },

    count(id) {
      const e = P().inventory.find((i) => i.id === id);
      return e ? e.qty : 0;
    },

    weight() {
      return P().inventory.reduce((w, i) => w + (ITEMS[i.id] ? ITEMS[i.id].weight : 0) * i.qty, 0);
    },

    room(id) {
      const w = ITEMS[id].weight;
      if (w <= 0) return 999;
      return Math.max(0, Math.floor((Config.MAX_WEIGHT - this.weight() + 1e-6) / w));
    },

    add(id, qty) {
      const n = Math.min(qty, this.room(id));
      if (n <= 0) return 0;
      const e = P().inventory.find((i) => i.id === id);
      if (e) e.qty += n; else P().inventory.push({ id, qty: n });
      if (id === 'pot_water') { const x = P().inventory.find((i) => i.id === id); x.charge = (x.charge || 0) + 5 * n; }
      return n;
    },

    remove(id, qty) {
      const inv = P().inventory;
      const idx = inv.findIndex((i) => i.id === id);
      if (idx < 0 || inv[idx].qty < qty) return false;
      inv[idx].qty -= qty;
      if (inv[idx].qty <= 0) inv.splice(idx, 1);
      this.cleanEquip();
      return true;
    },

    cleanEquip() {
      const eq = P().equipped;
      ['mainHand', 'offHand'].forEach((h) => { if (eq[h] && this.count(eq[h]) <= 0) eq[h] = null; });
    },

    // ---- ingredientes (suportam anyOf) ----
    ingHave(i) { return i.anyOf ? i.anyOf.reduce((a, id) => a + this.count(id), 0) : this.count(i.id); },
    ingName(i) { return i.anyOf ? 'Água limpa/fervida' : ITEMS[i.id].name; },
    ingTake(i) {
      if (!i.anyOf) return this.remove(i.id, i.qty);
      let need = i.qty;
      for (const id of i.anyOf) { const t = Math.min(need, this.count(id)); if (t > 0) { this.remove(id, t); need -= t; } }
      return need === 0;
    },
    ingWeight(i) { return i.anyOf ? ITEMS[i.anyOf[0]].weight * i.qty : ITEMS[i.id].weight * i.qty; },

    // ---------------- Equipamento ----------------
    equip(id, hand) {
      const it = ITEMS[id];
      if (!it || !it.equip) return false;
      if (this.count(id) <= 0) return false;
      const eq = P().equipped;
      const other = hand === 'mainHand' ? 'offHand' : 'mainHand';
      if (eq[other] === id && this.count(id) < 2) eq[other] = null;
      eq[hand] = id;
      if (it.equip.tool === 'torch' && !(P().torchHours > 0)) P().torchHours = TORCH_HOURS;
      S().log(`Você equipou [${it.name}] na ${hand === 'mainHand' ? 'mão direita' : 'mão esquerda'}.`);
      S().touch();
      return true;
    },

    unequip(hand) {
      const eq = P().equipped;
      if (!eq[hand]) return;
      S().log(`Você guardou [${ITEMS[eq[hand]].name}].`);
      eq[hand] = null;
      S().touch();
    },

    hasTool(tool) {
      const eq = P().equipped;
      return [eq.mainHand, eq.offHand].some((id) => id && ITEMS[id] && ITEMS[id].equip && ITEMS[id].equip.tool === tool);
    },

    /** Menor multiplicador de custo entre as ferramentas equipadas do tipo. */
    toolMult(tool) {
      const eq = P().equipped; let m = 1; let found = false;
      [eq.mainHand, eq.offHand].forEach((id) => {
        const it = id && ITEMS[id];
        if (it && it.equip && it.equip.tool === tool) { m = found ? Math.min(m, it.equip.mult) : it.equip.mult; found = true; }
      });
      return m;
    },

    /** Descarta (joga fora) itens da mochila. Não gasta tempo. */
    discard(id, qty) {
      const e = P().inventory.find((i) => i.id === id);
      if (!e || qty <= 0) return false;
      const n = Math.min(qty, e.qty);
      this.remove(id, n);
      const left = P().inventory.find((i) => i.id === id);
      if (left && id === 'pot_water') left.charge = Math.min(left.charge || 0, left.qty * 5);
      S().log(`Você descartou ${n}x [${ITEMS[id].name}].`, 'hint');
      S().touch();
      return true;
    },

    // ---------------- Consumo ----------------
    useItem(id) {
      const it = ITEMS[id];
      if (!it || !it.use || this.count(id) <= 0) return false;
      const u = it.use;
      const st = P().stats;
      const Pl = Ilha.Player;
      const gains = [];

      if (u.special === 'pot_water') {
        const e = P().inventory.find((i) => i.id === 'pot_water');
        e.charge = (e.charge || 5) - 1;
        const newQty = Math.ceil(e.charge / 5);
        if (newQty < e.qty) { e.qty = newQty; if (e.qty <= 0) P().inventory.splice(P().inventory.indexOf(e), 1); this.add('pot', 1); }
      } else if (u.special === 'soap' || u.special === 'quinine') {
        if (u.special === 'quinine' && !Pl.hasCond('MALARIA')) { Ilha.UI.toast('Você não está com Malária.'); return false; }
        this.remove(id, 1);
      } else {
        this.remove(id, 1);
      }

      const addStat = (key, amt, max, label, unit) => {
        if (!amt) return;
        const before = st[key];
        st[key] = Config.clamp(st[key] + amt, 0, max);
        const d = Math.round(st[key] - before);
        gains.push(d >= amt - 0.5 ? `+${Math.round(amt)}${unit} ${label}` : `+${d}${unit} ${label} (máx.)`);
      };
      addStat('calories', u.cal, Config.BIO.MAX_CALORIES, 'kcal', '');
      addStat('hydration', u.hyd, 100, 'Hidratação', '%');
      addStat('protein', u.protein, 100, 'Proteínas', '%');
      addStat('vitamins', u.vit, 100, 'Vitaminas', '%');

      S().log(`Você consumiu [${it.name}]. ${gains.join(', ')}${gains.length ? '.' : ''}`);

      switch (u.special) {
        case 'dirty_water':
          if (Math.random() < Config.BIO.DYSENTERY_CHANCE) {
            Pl.addCondition('DYSENTERY', Config.BIO.DYSENTERY_HOURS);
            S().log('Seu estômago se revolta: a água suja causou DISENTERIA!', 'bad');
          } else S().log('Você teve sorte: a água suja não lhe fez mal… desta vez.', 'warn');
          break;
        case 'raw_fish':
          if (Math.random() < Config.BIO.FOOD_POISON_RAW_CHANCE) Pl.foodPoisoning();
          break;
        case 'herb':
          if (Pl.hasCond('SKIN_INFECTION')) {
            P().condTimers.SKIN_INFECTION_CURE = (P().condTimers.SKIN_INFECTION_CURE || 0) + 8;
            S().log('Você aplica a erva mascada sobre a ferida: a infecção regride um pouco.', 'good');
          }
          break;
        case 'herb_tea':
          if (Pl.hasCond('FOOD_POISONING')) { Pl.removeCondition('FOOD_POISONING'); S().log('O chá acalma o estômago: a Intoxicação Alimentar passou.', 'good'); }
          if (Pl.hasCond('DYSENTERY')) {
            P().condTimers.DYSENTERY = Math.max(0, (P().condTimers.DYSENTERY || 0) - 12);
            S().log('O chá alivia a Disenteria (-12h de convalescença).', 'good');
          }
          st.bodyTemp = Math.min(37.5, st.bodyTemp + 0.4);
          break;
        case 'soap':
          st.hygiene = 100;
          S().log('Você se esfrega com sabão: Higiene a 100%.', 'good');
          if (Pl.hasCond('SKIN_INFECTION')) { Pl.removeCondition('SKIN_INFECTION'); S().log('O sabão elimina a Infecção Cutânea!', 'good'); }
          break;
        case 'quinine':
          Pl.removeCondition('MALARIA');
          S().log('O quinino derruba a febre: a MALÁRIA foi curada!', 'good');
          break;
        default: break;
      }

      Pl.checkScurvyCure();
      Pl.advanceBy(u.minutes || 3, { kcal: 0, stamina: 0 });
      return true;
    },

    // ---------------- Desmontagem ----------------
    scrap(id, bench) {
      const def = SCRAP[id];
      if (!def || this.count(id) <= 0) return false;
      const out = def.out.map((o) => ({ id: o.id, qty: o.qty }));
      if (bench) { const x = out[Math.floor(Math.random() * out.length)]; x.qty += 1; }
      const netWeight = out.reduce((w, o) => w + ITEMS[o.id].weight * o.qty, 0) - ITEMS[id].weight;
      if (netWeight > Config.MAX_WEIGHT - this.weight() + 1e-6) {
        Ilha.UI.toast('Mochila cheia: libere espaço antes de desmontar.');
        return false;
      }
      this.remove(id, 1);
      const parts = out.map((o) => { this.add(o.id, o.qty); return `${o.qty}x ${ITEMS[o.id].name}`; });
      S().log(`Você desmontou [${ITEMS[id].name}]${bench ? ' na Bancada (+1 componente bônus)' : ''}. Obteve: ${parts.join(', ')}.`, 'good');
      Ilha.Player.gainXP(Math.round(def.xp * (bench ? 1.5 : 1)), 'estudo da sucata');
      Ilha.Player.advanceBy(def.minutes, { kcal: 15, stamina: 2 });
      return true;
    },

    // ---------------- Fabricação ----------------
    recipe(id) { return R.find((r) => r.id === id); },

    eraOf(r) { return Config.eraOfLevel(r.minLevel || 1); },

    /** Estado de uma receita (ingredientes, fogo, nível, ferramenta, estação, local). */
    status(r, target, skipPlace) {
      const lvl = P().level;
      const missing = r.in.filter((i) => this.ingHave(i) < i.qty);
      const fireOk = !r.fire || Ilha.Player.nearLitFire();
      const levelOk = lvl >= (r.minLevel || 1);
      const toolOk = !r.tool || this.hasTool(r.tool);
      const stationOk = !r.station || (Ilha.Stations && Ilha.Stations.nearStation(r.station));
      const powerOk = !r.power || (Ilha.Stations && Ilha.Stations.powerStored() >= r.power);
      let placeOk = true; let placeMsg = '';
      if (r.kind === 'structure' && !skipPlace) {
        const t = target || Ilha.Player.facingTile();
        const chk = Ilha.Building.canPlace(r, t.x, t.y);
        placeOk = chk.ok; placeMsg = chk.msg;
      }
      const reason = !levelOk ? `Requer Nível ${r.minLevel}`
        : !toolOk ? `Requer ${Config.TOOL_NAMES[r.tool] || r.tool} equipado`
        : !stationOk ? `Requer ${Config.STATION_NAMES[r.station] || r.station} por perto (até 2 tiles)`
        : !powerOk ? 'Sem energia elétrica (kWh)'
        : missing.length ? 'Faltam ingredientes'
        : !fireOk ? 'Requer Fogueira acesa por perto'
        : !placeOk ? placeMsg : '';
      return { ok: !reason, reason, missing, fireOk, levelOk, toolOk, stationOk, powerOk, placeOk, placeMsg };
    },

    /** Paga ingredientes, consome tempo/energia e dá XP de primeira vez. */
    finish(r, doEffect) {
      if (!Ilha.Player.canAfford({ stamina: r.stamina })) return false;
      r.in.forEach((i) => this.ingTake(i));
      doEffect();
      const d = P();
      if (!d.crafted[r.id]) { d.crafted[r.id] = true; Ilha.Player.gainXP(r.xp, 'primeira vez: ' + r.name); }
      if (r.power) Ilha.Stations.usePower(r.power);
      Ilha.Player.act({ minutes: r.minutes, kcal: r.kcal, stamina: r.stamina, hygiene: -1, noCheck: true });
      return true;
    },

    craft(id, target) {
      const r = this.recipe(id);
      if (!r) return false;
      const st = this.status(r, target);
      if (!st.ok) { Ilha.UI.toast(st.reason + (r.name ? ': ' + r.name : '')); return false; }

      if (r.kind === 'item') {
        const netW = ITEMS[r.out.id].weight * r.out.qty - r.in.reduce((w, i) => w + this.ingWeight(i), 0);
        if (netW > Config.MAX_WEIGHT - this.weight() + 1e-6) { Ilha.UI.toast('Mochila cheia.'); return false; }
        return this.finish(r, () => {
          this.add(r.out.id, r.out.qty);
          S().log(`Você fabricou ${r.out.qty}x [${ITEMS[r.out.id].name}].`, 'good');
        });
      }
      const t = target || Ilha.Player.facingTile();
      return Ilha.Building.build(r, t.x, t.y);
    },
  };

  Config.TOOL_NAMES = { axe: 'Machado', pickaxe: 'Picareta', hoe: 'Enxada de Ferro', shovel: 'Pá de Ferro', knife: 'Faca', spear: 'Lança', torch: 'Tocha' };
  Config.STATION_NAMES = { workbench: 'Bancada de Engenharia', lab: 'Laboratório Químico', workshop: 'Oficina de Precisão' };

  Ilha.Crafting = Crafting;
})();
