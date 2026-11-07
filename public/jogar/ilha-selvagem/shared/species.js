// Animais. kind: passivo (foge) | neutro (só ataca se for atacado) | agressivo (caça você)
// medium: terra | anfibio | agua
export const SPECIES = {
  coelho:   { nome: 'Coelho',   kind: 'passivo',  medium: 'terra',   hp: 10,  walk: 2.2, run: 8.5, sight: 12, meat: 1, r: 0.3, biomes: { planicie: 3, floresta: 1, taiga: 1, deserto: 0.3 } },
  cervo:    { nome: 'Cervo',    kind: 'passivo',  medium: 'terra',   hp: 35,  walk: 2.5, run: 10,  sight: 22, meat: 3, r: 0.7, biomes: { floresta: 2, planicie: 2, taiga: 1 } },
  capivara: { nome: 'Capivara', kind: 'passivo',  medium: 'terra',   hp: 40,  walk: 1.8, run: 6,   sight: 12, meat: 3, r: 0.6, biomes: { pantano: 4, selva: 1, planicie: 0.5, praia: 0.5 } },
  tartaruga:{ nome: 'Tartaruga',kind: 'passivo',  medium: 'terra',   hp: 30,  walk: 0.9, run: 1.8, sight: 8,  meat: 2, r: 0.5, biomes: { praia: 4 } },
  javali:   { nome: 'Javali',   kind: 'neutro',   medium: 'terra',   hp: 55,  walk: 2.4, run: 7.2, sight: 14, meat: 4, r: 0.7, dmg: 9, atkRange: 1.8, cd: 1.5, biomes: { floresta: 2, selva: 2, planicie: 1, pantano: 1 } },
  urso:     { nome: 'Urso',     kind: 'neutro',   medium: 'terra',   hp: 120, walk: 2.2, run: 7.0, sight: 16, meat: 6, r: 1.0, dmg: 16, atkRange: 2.4, cd: 1.7, biomes: { taiga: 3, floresta: 1, neve: 1 } },
  lobo:     { nome: 'Lobo',     kind: 'agressivo',medium: 'terra',   hp: 38,  walk: 2.6, run: 7.0, sight: 30, meat: 2, r: 0.55, dmg: 6, atkRange: 1.7, cd: 1.2, pack: [2, 4], biomes: { taiga: 3, neve: 2, floresta: 2, montanha: 1 } },
  onca:     { nome: 'Onça',     kind: 'agressivo',medium: 'terra',   hp: 55,  walk: 2.8, run: 8.4, sight: 28, meat: 4, r: 0.7, dmg: 11, atkRange: 2.0, cd: 1.4, biomes: { selva: 3, floresta: 0.6 } },
  jacare:   { nome: 'Jacaré',   kind: 'agressivo',medium: 'anfibio', hp: 80,  walk: 1.6, run: 6.4, sight: 20, meat: 5, r: 0.9, dmg: 15, atkRange: 2.4, cd: 1.8, biomes: { pantano: 4, lago: 3, selva: 0.4 } },
  cobra:    { nome: 'Cobra',    kind: 'agressivo',medium: 'terra',   hp: 14,  walk: 1.4, run: 5.0, sight: 9,  meat: 1, r: 0.3, dmg: 5, atkRange: 1.3, cd: 1.3, biomes: { deserto: 3, selva: 2, pantano: 1.5 } },
  escorpiao:{ nome: 'Escorpião',kind: 'agressivo',medium: 'terra',   hp: 14,  walk: 1.2, run: 4.2, sight: 8,  meat: 0, r: 0.3, dmg: 4, atkRange: 1.2, cd: 1.3, biomes: { deserto: 3 } },
  peixe:    { nome: 'Peixe',    kind: 'passivo',  medium: 'agua',    hp: 6,   walk: 1.2, run: 4.5, sight: 10, meat: 1, r: 0.3, minDepth: 1.2, biomes: { mar: 4, recife: 6, lago: 3 } },
  tubarao:  { nome: 'Tubarão',  kind: 'agressivo',medium: 'agua',    hp: 100, walk: 2.4, run: 7.2, sight: 34, meat: 5, r: 1.0, dmg: 17, atkRange: 2.6, cd: 1.8, minDepth: 3.5, biomes: { mar_profundo: 2, mar: 1.2, recife: 0.5 } },
};
export const SPECIES_IDS = Object.keys(SPECIES);
