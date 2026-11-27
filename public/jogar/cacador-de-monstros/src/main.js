// Caçador de Monstros 3D (primeira pessoa): derrote monstros, ganhe moedas e compre armas e armaduras melhores.
// Os monstros aparecem no nível do jogador; monstro de nível maior dá mais moedas. Quanto maior o nível, mais monstros.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };

  // Aviso anônimo para a medição do queres.games (nunca dá erro; fora do site, não faz nada).
  function evento(nome, dados) { try { if (window.QG && window.QG.evento) window.QG.evento(nome, dados); } catch (e) { /* nunca atrapalha */ } }

  var T = window.THREE;
  if (!T) { $('tela-inicio').hidden = true; $('tela-erro').hidden = false; return; }
  T.ColorManagement.legacyMode = false; // cores certinhas com a luz, as sombras e o brilho
  var FOTOS = /[?&]fotos=1(&|$)/.test(location.search); // modo de fotos do revisor 3D (tests/fotos-3d.cjs)
  if (FOTOS) { var sementeFotos = 12345; Math.random = function () { sementeFotos = (sementeFotos * 16807) % 2147483647; return (sementeFotos - 1) / 2147483646; }; }
  var toqueAparelho = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

  // ---------- Itens da loja ----------
  // dano por golpe, espera entre golpes (segundos), alcance (metros), distancia = atira de longe
  var ARMAS = [
    { id: 'graveto', nome: 'Graveto', icone: '🪵', preco: 0, dano: 5, espera: 0.55, alcance: 1.8, cor: 0x8b5a2b, modelo: 'pau' },
    { id: 'espada-madeira', nome: 'Espada de madeira', icone: '🗡️', preco: 40, dano: 8, espera: 0.55, alcance: 2.0, cor: 0xc08a4a, modelo: 'espada' },
    { id: 'espada-ferro', nome: 'Espada de ferro', icone: '⚔️', preco: 180, dano: 17, espera: 0.5, alcance: 2.1, cor: 0xcfd8dc, modelo: 'espada' },
    { id: 'machado', nome: 'Machado', icone: '🪓', preco: 500, dano: 34, espera: 0.75, alcance: 2.2, cor: 0x90a4ae, modelo: 'machado' },
    { id: 'arco', nome: 'Arco e flecha', icone: '🏹', preco: 1100, dano: 38, espera: 0.6, alcance: 22, distancia: true, cor: 0xa1662f, modelo: 'arco', tiro: 0xfff1c1 },
    { id: 'lanca', nome: 'Lança de prata', icone: '🔱', preco: 2400, dano: 85, espera: 0.6, alcance: 3.2, cor: 0xe0f2fe, modelo: 'lanca' },
    { id: 'varinha-gelo', nome: 'Varinha de gelo', icone: '❄️', preco: 5500, dano: 115, espera: 0.55, alcance: 24, distancia: true, gelo: true, cor: 0x7dd3fc, modelo: 'varinha', tiro: 0x3aa0ff },
    { id: 'espada-fogo', nome: 'Espada de fogo', icone: '🔥', preco: 12000, dano: 290, espera: 0.5, alcance: 2.4, cor: 0xff7a1a, modelo: 'espada', brilha: true },
    { id: 'martelo-trovao', nome: 'Martelo do trovão', icone: '⚡', preco: 27000, dano: 580, espera: 0.65, alcance: 2.6, cor: 0xfacc15, modelo: 'martelo', brilha: true },
    { id: 'lamina-estelar', nome: 'Lâmina estelar', icone: '🌟', preco: 65000, dano: 1050, espera: 0.45, alcance: 26, distancia: true, cor: 0xe879f9, modelo: 'espada', brilha: true, tiro: 0xf5d0fe }
  ];
  // defesa = parte do dano que a armadura segura; vida = vida extra
  var ARMADURAS = [
    { id: 'roupa', nome: 'Roupa comum', icone: '👕', preco: 0, defesa: 0, vida: 0, cor: 0x3b82f6 },
    { id: 'couro', nome: 'Armadura de couro', icone: '🦺', preco: 70, defesa: 0.10, vida: 15, cor: 0x8a5a2b },
    { id: 'malha', nome: 'Cota de malha', icone: '⛓️', preco: 350, defesa: 0.20, vida: 40, cor: 0xb8c0c8, metal: true },
    { id: 'ferro', nome: 'Armadura de ferro', icone: '🛡️', preco: 1200, defesa: 0.30, vida: 110, cor: 0x7b8794, metal: true },
    { id: 'ouro', nome: 'Armadura de ouro', icone: '👑', preco: 4300, defesa: 0.40, vida: 280, cor: 0xeab308, metal: true },
    { id: 'cristal', nome: 'Armadura de cristal', icone: '💎', preco: 14000, defesa: 0.50, vida: 650, cor: 0x5ee0f0 },
    { id: 'dragao', nome: 'Armadura de dragão', icone: '🐉', preco: 42000, defesa: 0.60, vida: 1400, cor: 0xc0262d }
  ];
  // vel em metros por segundo, r = tamanho
  var TIPOS = [
    // um tipo novo aparece a cada 2 níveis
    { nome: 'Rato gigante', cor: 0x8d6e63, vel: 2.4, r: 0.45, hp: 0.8, dano: 0.9, forma: 'lobo', orelhasRedondas: true, raboFino: true },
    { nome: 'Aranha', cor: 0x3f3f46, vel: 2.6, r: 0.55, hp: 0.9, dano: 1, forma: 'aranha', olhos: 'vermelho' },
    { nome: 'Cobra', cor: 0x65a30d, vel: 2.2, r: 0.45, hp: 1, dano: 1.1, forma: 'cobra', olhos: 'amarelo' },
    { nome: 'Morcego vampiro', cor: 0x4c0519, vel: 3.1, r: 0.45, hp: 0.8, dano: 1, forma: 'morcego', olhos: 'vermelho', presas: true },
    { nome: 'Lobo', cor: 0x6b7280, vel: 3.4, r: 0.55, hp: 1.1, dano: 1.2, forma: 'lobo', olhos: 'amarelo' },
    { nome: 'Javali', cor: 0x78350f, vel: 2.8, r: 0.6, hp: 1.4, dano: 1.3, forma: 'lobo', dentes: true, orelhasRedondas: true },
    { nome: 'Zumbi', cor: 0x6b8f71, vel: 1.6, r: 0.55, hp: 1.5, dano: 1.2, forma: 'humano', bracosFrente: true },
    { nome: 'Urso', cor: 0x5d4037, vel: 2.2, r: 0.95, hp: 2.2, dano: 1.5, forma: 'lobo', orelhasRedondas: true, raboCurto: true },
    { nome: 'Vampiro', cor: 0x1e1b4b, vel: 2.6, r: 0.6, hp: 1.6, dano: 1.5, forma: 'humano', pele: true, capa: true, presas: true, olhos: 'vermelho' },
    { nome: 'Lobisomem', cor: 0x52525b, vel: 3.0, r: 0.7, hp: 1.9, dano: 1.6, forma: 'humano', lobisomem: true, olhos: 'amarelo' },
    { nome: 'Fantasma', cor: 0xe0f2fe, vel: 2.4, r: 0.6, hp: 1.2, dano: 1.3, forma: 'fantasma' },
    { nome: 'Escorpião gigante', cor: 0xc2410c, vel: 2.5, r: 0.7, hp: 2, dano: 1.6, forma: 'aranha', cauda: true },
    { nome: 'Yeti', cor: 0xf1f5f9, vel: 1.8, r: 0.95, hp: 2.4, dano: 1.6, forma: 'yeti' },
    { nome: 'Ciclope', cor: 0xa16207, vel: 1.7, r: 0.95, hp: 2.6, dano: 1.7, forma: 'humano', umOlho: true },
    { nome: 'Dragãozinho', cor: 0xef4444, vel: 2.4, r: 0.75, hp: 2, dano: 1.7, forma: 'dragao', olhos: 'amarelo' },
    { nome: 'Golem de lava', cor: 0xea580c, brilho: 0x7c2d12, vel: 1.4, r: 1.05, hp: 2.8, dano: 1.9, forma: 'golem' },
    { nome: 'Demônio', cor: 0x9f1239, vel: 2.6, r: 0.7, hp: 2.4, dano: 2, forma: 'humano', chifres: true, olhos: 'amarelo' }
  ];
  var CHEFE_COR = 0x2a0040; // brilho roxo do chefão
  // Defesas: você compra e coloca no campo. Muros seguram os monstros que andam; torres atiram sozinhas.
  var DEFESAS = [
    { id: 'muro-madeira', nome: 'Muro de madeira', icone: '🪵', preco: 25, tipo: 'muro', vida: 60, cor: 0x9c6b3c },
    { id: 'muro-pedra', nome: 'Muro de pedra', icone: '🧱', preco: 150, tipo: 'muro', vida: 260, cor: 0x9ca3af },
    { id: 'torre-flechas', nome: 'Torre de flechas', icone: '🗼', preco: 120, tipo: 'torre', vida: 80, dano: 6, espera: 0.8, alcance: 14, cor: 0xa1662f, tiro: 0xfff1c1 },
    { id: 'torre-gelo', nome: 'Torre de gelo', icone: '🧊', preco: 400, tipo: 'torre', vida: 100, dano: 9, espera: 1.0, alcance: 14, gelo: true, cor: 0x7dd3fc, tiro: 0x3aa0ff },
    { id: 'canhao', nome: 'Canhão', icone: '💣', preco: 900, tipo: 'torre', vida: 160, dano: 40, espera: 1.6, alcance: 17, area: 2.2, cor: 0x374151, tiro: 0x222222 }
  ];
  // Ajudantes: monstros amigos que seguem você e atacam os monstros
  var AJUDANTES = [
    { id: 'geleca-amiga', nome: 'Geleca amiga', icone: '💧', preco: 100, vida: 60, dano: 4, espera: 0.9, vel: 3.5, alcance: 1.3, forma: 'geleca', cor: 0x38bdf8, r: 0.5 },
    { id: 'lobo', nome: 'Lobo', icone: '🐺', preco: 350, vida: 90, dano: 9, espera: 0.7, vel: 6, alcance: 1.4, forma: 'lobo', cor: 0x9ca3af, r: 0.5 },
    { id: 'golem-amigo', nome: 'Golem amigo', icone: '🗿', preco: 1500, vida: 400, dano: 20, espera: 1.1, vel: 3.5, alcance: 1.8, forma: 'golem', cor: 0x60a5fa, r: 0.8 },
    { id: 'dragao-amigo', nome: 'Dragão amigo', icone: '🐲', preco: 5000, vida: 300, dano: 45, espera: 1.0, vel: 5, alcance: 9, distancia: true, forma: 'dragao', cor: 0x22c55e, r: 0.7, tiro: 0xff7a1a }
  ];
  function forcaNivel(n) { return Math.pow(1.17, n - 1); } // defesas e ajudantes ficam mais fortes junto com você
  var LIM = 44; // o campo vai de -44 a 44 metros

  // ---------- Contas do jogo ----------
  function vidaMonstro(n) { return 20 * Math.pow(1.22, n - 1); }
  function danoMonstro(n) { return 3.5 * Math.pow(1.19, n - 1); }
  function moedasMonstro(n) { return Math.round((3 + n) * Math.pow(1.15, n - 1)); }
  function xpMonstro(n) { return 1 + n; } // metade da experiência de antes
  function xpParaSubir(n) { return Math.round(10 * n * Math.pow(1.08, n - 1)); }
  function vidaBase(n) { return Math.round(70 * Math.pow(1.13, n - 1)); }
  function maxMonstros() { return Math.min(36, 2 + save.nivel * 2); } // cada nível: 2 monstros a mais (até 36, para não travar o celular)

  // ---------- Progresso salvo (só neste aparelho; nada de dado pessoal) ----------
  var CHAVE = 'cacador-monstros-v1';
  function novoSave() { return { moedas: 0, nivel: 1, xp: 0, armas: ['graveto'], armaduras: ['roupa'], arma: 'graveto', armadura: 'roupa', pocoes: 1, som: true, defesas: {}, ajudantes: [] }; }
  var save = novoSave();
  try { var lido = JSON.parse(localStorage.getItem(CHAVE) || 'null'); if (lido && lido.nivel) save = Object.assign(novoSave(), lido); } catch (e) { /* sem salvar */ }
  function guardar() { if (FOTOS) return; try { localStorage.setItem(CHAVE, JSON.stringify(save)); } catch (e) { /* sem salvar */ } }
  function acha(lista, id) { for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i]; return lista[0]; }
  function arma() { return acha(ARMAS, save.arma); }
  function armadura() { return acha(ARMADURAS, save.armadura); }
  function vidaMax() { return vidaBase(save.nivel) + armadura().vida; }
  function danoArma() { return arma().dano * (1 + 0.04 * (save.nivel - 1)); }

  // ---------- Som (só depois de um toque) ----------
  var audio = null;
  function somLigar() { if (!audio) { try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audio = null; } } if (audio && audio.state === 'suspended') audio.resume(); }
  function bip(freq, dur, tipo, vol) {
    if (!audio || !save.som) return;
    try {
      var o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime;
      o.type = tipo || 'square'; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(Math.max(40, freq * 0.6), t + dur);
      g.gain.setValueAtTime(vol || 0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(audio.destination); o.start(t); o.stop(t + dur);
    } catch (e) { /* sem som */ }
  }

  // ---------- Qualidade dos gráficos ----------
  // alto: sombras de verdade que acompanham tudo, até os monstros (computador)
  // medio: sombras das árvores, pedras e defesas; monstros com a sombra redonda (celular)
  // baixo: sem sombras de verdade, menos grama (aparelho mais fraco)
  if (!save.graficos) save.graficos = toqueAparelho ? 'medio' : 'alto';
  var QUAL = {
    alto: { sombra: 'movel', mapa: 2048, area: 26, pr: 2, grama: 6000, flores: 700 },
    medio: { sombra: 'fixa', mapa: 2048, area: 50, pr: 1.5, grama: 3800, flores: 420 },
    baixo: { sombra: 'nao', mapa: 0, area: 0, pr: 1, grama: 1500, flores: 160 }
  };
  function qual() { return QUAL[save.graficos] || QUAL.medio; }

  // ---------- Cena 3D ----------
  var canvas = $('mundo'), hud = $('hud2d'), h2 = hud.getContext('2d');
  var renderer;
  try { renderer = new T.WebGLRenderer({ canvas: canvas, antialias: !toqueAparelho || (window.devicePixelRatio || 1) < 2, powerPreference: 'high-performance', preserveDrawingBuffer: FOTOS }); }
  catch (e) { $('tela-inicio').hidden = true; $('tela-erro').hidden = false; return; }
  renderer.outputEncoding = T.sRGBEncoding;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.info.autoReset = false;
  var webgl2 = renderer.capabilities.isWebGL2;
  var ANISO = Math.min(8, renderer.capabilities.getMaxAnisotropy());

  var scene = new T.Scene();
  var COR_HOR = new T.Color(0xd8e9f0), COR_ALTO = new T.Color(0x3b8be0);
  var DIR_SOL = new T.Vector3(0.56, 0.6, 0.58).normalize();
  scene.fog = new T.Fog(COR_HOR, 26, 200);
  var camera = new T.PerspectiveCamera(70, 1, 0.05, 230);
  camera.rotation.order = 'YXZ';
  scene.add(camera);

  // céu: degradê do horizonte para o alto, com o sol e o brilho em volta dele
  var ceuMat = new T.ShaderMaterial({
    uniforms: { cAlto: { value: COR_ALTO }, cHor: { value: COR_HOR }, cBaixo: { value: new T.Color(0x9fbf8a) }, dirSol: { value: DIR_SOL } },
    vertexShader: 'varying vec3 vDir;\nvoid main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: [
      'uniform vec3 cAlto; uniform vec3 cHor; uniform vec3 cBaixo; uniform vec3 dirSol; varying vec3 vDir;',
      'void main() {',
      '  vec3 d = normalize(vDir); float h = d.y;',
      '  vec3 c = h > 0.0 ? mix(cHor, cAlto, pow(clamp(h * 1.35, 0.0, 1.0), 0.6)) : mix(cHor, cBaixo, clamp(-h * 5.0, 0.0, 1.0));',
      '  float s = max(dot(d, dirSol), 0.0);',
      '  c += vec3(1.0, 0.92, 0.75) * (pow(s, 1200.0) * 4.0 + pow(s, 90.0) * 0.4 + pow(s, 8.0) * 0.1);',
      '  gl_FragColor = vec4(c, 1.0);',
      '  #include <tonemapping_fragment>',
      '  #include <encodings_fragment>',
      '}'].join('\n'),
    side: T.BackSide, depthWrite: false
  });
  var ceu = new T.Mesh(new T.SphereGeometry(200, 32, 16), ceuMat);
  ceu.renderOrder = -10; ceu.frustumCulled = false; scene.add(ceu);

  // reflexo do céu nas armas de metal
  var envMapa = null;
  try {
    var pm = new T.PMREMGenerator(renderer), cenaCeu = new T.Scene();
    cenaCeu.add(new T.Mesh(new T.SphereGeometry(10, 32, 16), ceuMat));
    var chaoReflexo = new T.Mesh(new T.CircleGeometry(9, 24), new T.MeshBasicMaterial({ color: 0x4f7f3a })); chaoReflexo.rotation.x = -Math.PI / 2; chaoReflexo.position.y = -1.6; cenaCeu.add(chaoReflexo);
    envMapa = pm.fromScene(cenaCeu, 0.02).texture; pm.dispose();
  } catch (e) { envMapa = null; }

  // luz do céu (azulada por cima, esverdeada por baixo) e o sol, que faz as sombras
  var hemi = new T.HemisphereLight(0xc6e0ff, 0x6f7b42, 0.6); scene.add(hemi);
  var sol = new T.DirectionalLight(0xffe7c4, 1.38); scene.add(sol); scene.add(sol.target);
  sol.shadow.bias = -0.0004; sol.shadow.normalBias = 0.035;
  function posicionarSol(cx, cz) { sol.target.position.set(cx, 0, cz); sol.position.set(cx + DIR_SOL.x * 90, DIR_SOL.y * 90, cz + DIR_SOL.z * 90); sol.target.updateMatrixWorld(); }
  posicionarSol(0, 0);

  // materiais: "cartoon" (luz em degraus) para os bichos, facetado (low-poly) para o cenário, metal com reflexo
  var degraus = (function () {
    var d = new Uint8Array([70, 130, 185, 228]);
    var t = new T.DataTexture(d, 4, 1, webgl2 ? T.RedFormat : T.LuminanceFormat);
    t.minFilter = t.magFilter = T.NearestFilter; t.generateMipmaps = false; t.needsUpdate = true; return t;
  })();
  function toon(cor, emissiva) { var m = new T.MeshToonMaterial({ color: cor, gradientMap: degraus }); if (emissiva) m.emissive.setHex(emissiva); return m; }
  function facetado(cor) { return new T.MeshLambertMaterial({ color: cor, flatShading: true }); }
  function metal(cor, rug, brilho) {
    var m = new T.MeshStandardMaterial({ color: cor, metalness: 0.9, roughness: rug === undefined ? 0.3 : rug, envMap: envMapa, envMapIntensity: 1.3 });
    if (brilho) m.emissive.setHex(brilho); return m;
  }
  function brilhante(cor, forca) { var m = new T.MeshStandardMaterial({ color: cor, emissive: cor, emissiveIntensity: forca || 1.4, roughness: 0.4 }); return m; }

  // peças básicas que todos os modelos reaproveitam
  var G = {
    esfera: new T.SphereGeometry(1, 22, 16), caixa: new T.BoxGeometry(1, 1, 1),
    cone: new T.ConeGeometry(1, 1, 14), cilindro: new T.CylinderGeometry(1, 1, 1, 14),
    icosa: new T.IcosahedronGeometry(1, 0), octa: new T.OctahedronGeometry(1, 0)
  };
  var M = {
    branco: toon(0xffffff), preto: new T.MeshBasicMaterial({ color: 0x15151c }), brilho: new T.MeshBasicMaterial({ color: 0xffffff }),
    amarelo: new T.MeshBasicMaterial({ color: 0xffd23f }), vermelho: new T.MeshBasicMaterial({ color: 0xff2a2a }),
    pele: toon(0xf1d7c2), capa: toon(0x8b1d1d), rosa: toon(0xf9a8d4), osso: toon(0xfff7e0),
    madeira: facetado(0x6b4423), madeiraClara: facetado(0xa8743f), escuro: toon(0x2f2f35), couro: toon(0x5a3a22),
    ouro: metal(0xffc93c, 0.22), ferro: metal(0xd5dde4, 0.28), ferroEscuro: metal(0x4b5563, 0.45)
  };
  function peca(geo, mat, sx, sy, sz, x, y, z, pai) {
    var m = new T.Mesh(geo, mat); m.scale.set(sx, sy, sz); m.position.set(x, y, z); if (pai) pai.add(m); return m;
  }

  // texturas desenhadas na hora: ponto redondo (partículas e brilhos) e sombra redonda
  function texRadial(paradas) {
    var c = document.createElement('canvas'); c.width = c.height = 64; var g = c.getContext('2d');
    var gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    paradas.forEach(function (p) { gr.addColorStop(p[0], p[1]); });
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new T.CanvasTexture(c);
  }
  var texPonto = texRadial([[0, 'rgba(255,255,255,1)'], [0.3, 'rgba(255,255,255,0.85)'], [1, 'rgba(255,255,255,0)']]);
  var texSombra = texRadial([[0, 'rgba(0,0,0,0.5)'], [0.55, 'rgba(0,0,0,0.28)'], [1, 'rgba(0,0,0,0)']]);
  var matSombra = new T.MeshBasicMaterial({ map: texSombra, transparent: true, depthWrite: false });
  var geoSombra = new T.PlaneGeometry(2, 2); geoSombra.rotateX(-Math.PI / 2);

  // ---------- Texturas desenhadas na hora (nada vem de fora do jogo) ----------
  // Cada uma é clarinha (multiplica a cor do material) e vem com um "relevo" (mapa de normais) para a luz pegar nas ranhuras.
  var semT = 99;
  function rt() { semT = (semT * 16807) % 2147483647; return (semT - 1) / 2147483646; }
  function tela(tam, fn) { var c = document.createElement('canvas'); c.width = c.height = tam; fn(c.getContext('2d'), tam); return c; }
  // desenha repetindo nas bordas, para a textura emendar sem costura
  function emendado(tam, x, y, fn) { [[0, 0], [-tam, 0], [tam, 0], [0, -tam], [0, tam]].forEach(function (o) { fn(x + o[0], y + o[1]); }); }
  function riscos(g, tam, qtd, cores, cmin, cmax, ang, angVar, larg, alfa) {
    g.lineCap = 'round';
    for (var i = 0; i < qtd; i++) {
      var x = rt() * tam, y = rt() * tam, c = cmin + rt() * (cmax - cmin), a = ang + (rt() - 0.5) * angVar;
      g.strokeStyle = cores[Math.floor(rt() * cores.length)]; g.globalAlpha = alfa; g.lineWidth = larg;
      emendado(tam, x, y, function (px, py) { g.beginPath(); g.moveTo(px, py); g.lineTo(px + Math.cos(a) * c, py + Math.sin(a) * c); g.stroke(); });
    }
    g.globalAlpha = 1;
  }
  function manchasRedondas(g, tam, qtd, cores, rmin, rmax, alfa) {
    for (var i = 0; i < qtd; i++) {
      var x = rt() * tam, y = rt() * tam, r = rmin + rt() * (rmax - rmin), cor = cores[Math.floor(rt() * cores.length)];
      emendado(tam, x, y, function (px, py) { var gr = g.createRadialGradient(px, py, 0, px, py, r); gr.addColorStop(0, cor); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.globalAlpha = alfa; g.fillStyle = gr; g.fillRect(px - r, py - r, r * 2, r * 2); });
    }
    g.globalAlpha = 1;
  }
  function rachaduras(g, tam, qtd, cor, larg, brilho) {
    g.strokeStyle = cor; g.lineWidth = larg; g.lineJoin = 'round';
    if (brilho) { g.shadowColor = brilho; g.shadowBlur = 6; }
    for (var i = 0; i < qtd; i++) {
      var x = rt() * tam, y = rt() * tam, a = rt() * 6.28, pts = [[x, y]];
      for (var k = 0; k < 7; k++) { a += (rt() - 0.5) * 1.3; x += Math.cos(a) * (6 + rt() * 10); y += Math.sin(a) * (6 + rt() * 10); pts.push([x, y]); }
      emendado(tam, 0, 0, function (ox, oy) { g.beginPath(); pts.forEach(function (p, j) { if (j) g.lineTo(p[0] + ox, p[1] + oy); else g.moveTo(p[0] + ox, p[1] + oy); }); g.stroke(); });
    }
    g.shadowBlur = 0;
  }
  // relevo: transforma o desenho cinza (claro = alto) num mapa de normais
  function relevo(c, forca) {
    var w = c.width, h = c.height, src = c.getContext('2d').getImageData(0, 0, w, h).data;
    return tela(w, function (g) {
      var img = g.createImageData(w, h), d = img.data;
      function alt(x, y) { x = (x + w) % w; y = (y + h) % h; var i = (y * w + x) * 4; return (src[i] + src[i + 1] + src[i + 2]) / 765; }
      for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
        var dx = (alt(x + 1, y) - alt(x - 1, y)) * forca, dy = (alt(x, y + 1) - alt(x, y - 1)) * forca, l = Math.sqrt(dx * dx + dy * dy + 1), i = (y * w + x) * 4;
        d[i] = (-dx / l * 0.5 + 0.5) * 255; d[i + 1] = (dy / l * 0.5 + 0.5) * 255; d[i + 2] = (1 / l * 0.5 + 0.5) * 255; d[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
    });
  }
  var DESENHOS = {
    pelo: { tam: 128, forca: 1.6, fn: function (g, t) { g.fillStyle = '#dedede'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 18, ['#c4c4c4', '#f4f4f4'], 8, 20, 0.6); riscos(g, t, 2600, ['#ffffff', '#f2f2f2', '#b2b2b2', '#c6c6c6'], 4, 10, Math.PI / 2, 0.7, 1.3, 0.6); } },
    escamas: { tam: 128, forca: 2.4, fn: function (g, t) {
      g.fillStyle = '#9c9c9c'; g.fillRect(0, 0, t, t);
      for (var j = 0; j < 12; j++) for (var i = 0; i < 9; i++) {
        var cx = i * 16 + (j % 2) * 8, cy = j * 11;
        emendado(t, cx, cy, function (x, y) { var gr = g.createRadialGradient(x, y - 3, 1, x, y, 10); gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.7, '#dcdcdc'); gr.addColorStop(1, '#8e8e8e'); g.fillStyle = gr; g.beginPath(); g.arc(x, y, 9.5, 0, Math.PI); g.lineTo(x - 9.5, y - 5); g.arc(x, y - 5, 9.5, Math.PI, 0); g.fill(); });
      }
    } },
    manchas: { tam: 128, forca: 0.8, fn: function (g, t) { g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 40, ['#e0e0e0', '#ffffff', '#e8e8e8'], 6, 18, 0.4); riscos(g, t, 400, ['#e2e2e2', '#ffffff'], 1, 2, 0, 6.28, 1, 0.35); } },
    pedra: { tam: 256, forca: 3.2, fn: function (g, t) { g.fillStyle = '#c4c4c4'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 140, ['#a4a4a4', '#e2e2e2', '#b8b8b8', '#d6d6d6'], 8, 32, 0.7); riscos(g, t, 2400, ['#9a9a9a', '#ececec'], 1, 2, 0, 6.28, 1.2, 0.6); rachaduras(g, t, 16, '#707070', 1.6); } },
    lava: { tam: 256, forca: 2.4, fn: function (g, t) { g.fillStyle = '#4a342c'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 120, ['#2c201c', '#5e463c', '#3a2a24'], 8, 30, 0.8); rachaduras(g, t, 26, '#ff9a1a', 3.2, '#ff6a00'); rachaduras(g, t, 10, '#ffe27a', 1.4); } },
    casca: { tam: 128, forca: 3.0, fn: function (g, t) {
      g.fillStyle = '#d6d6d6'; g.fillRect(0, 0, t, t);
      for (var i = 0; i < 24; i++) { var x0 = rt() * t, f = rt() * 6.28; g.strokeStyle = rt() < 0.6 ? '#8a8a8a' : '#efefef'; g.lineWidth = 1.5 + rt() * 2.5; emendado(t, 0, 0, function (ox) { g.beginPath(); for (var y = -4; y <= t + 4; y += 4) { var x = x0 + ox + Math.sin(y * 0.09 + f) * 3; if (y < 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); }); }
      riscos(g, t, 500, ['#b0b0b0', '#f6f6f6'], 2, 6, Math.PI / 2, 0.3, 1, 0.5);
    } },
    madeira: { tam: 128, forca: 1.4, fn: function (g, t) {
      g.fillStyle = '#e0e0e0'; g.fillRect(0, 0, t, t);
      for (var i = 0; i < 36; i++) { var y0 = rt() * t, f = rt() * 6.28, a = 1 + rt() * 2; g.strokeStyle = rt() < 0.5 ? '#bababa' : '#f8f8f8'; g.lineWidth = 1 + rt() * 1.5; emendado(t, 0, 0, function (ox, oy) { g.beginPath(); for (var x = -4; x <= t + 4; x += 4) { var y = y0 + oy + Math.sin(x * 0.05 + f) * a; if (x < 0) g.moveTo(x, y); else g.lineTo(x, y); } g.stroke(); }); }
      for (var k = 0; k < 3; k++) { var nx = rt() * t, ny = rt() * t; for (var a2 = 6; a2 > 0; a2 -= 2) { g.strokeStyle = '#a8a8a8'; g.lineWidth = 1; g.beginPath(); g.ellipse(nx, ny, a2 * 1.8, a2 * 0.8, 0, 0, 6.28); g.stroke(); } }
    } },
    folhas: { tam: 128, forca: 1.2, fn: function (g, t) {
      g.fillStyle = '#d2d2d2'; g.fillRect(0, 0, t, t);
      for (var i = 0; i < 950; i++) { var x = rt() * t, y = rt() * t, r = 2 + rt() * 3, a = rt() * 6.28; g.fillStyle = ['#ffffff', '#bdbdbd', '#e8e8e8', '#a8a8a8'][Math.floor(rt() * 4)]; emendado(t, x, y, function (px, py) { g.beginPath(); g.ellipse(px, py, r, r * 0.55, a, 0, 6.28); g.fill(); }); }
    } },
    metal: { tam: 128, forca: 0.8, fn: function (g, t) { g.fillStyle = '#e6e6e6'; g.fillRect(0, 0, t, t); riscos(g, t, 700, ['#ffffff', '#c8c8c8', '#d8d8d8'], 20, 70, 0, 0.04, 1, 0.35); } },
    tecido: { tam: 64, forca: 1.2, fn: function (g, t) { g.fillStyle = '#d8d8d8'; g.fillRect(0, 0, t, t); for (var y = 0; y < t; y += 4) for (var x = 0; x < t; x += 4) { g.fillStyle = ((x + y) / 4) % 2 ? '#f2f2f2' : '#c4c4c4'; g.fillRect(x, y, 3, 3); } } },
    grama: { tam: 512, forca: 1.2, fn: function (g, t) { g.fillStyle = '#dfe6d6'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 60, ['#cbd6bd', '#eef3e6'], 20, 60, 0.6); riscos(g, t, 9000, ['#f6fbef', '#c2ceb3', '#e4ecd9', '#b0bea0'], 3, 9, -Math.PI / 2, 0.8, 1.4, 0.7); manchasRedondas(g, t, 260, ['#c4d4b0'], 2, 4, 0.8); } },
    terra: { tam: 256, forca: 2.2, fn: function (g, t) {
      g.fillStyle = '#d6c8b2'; g.fillRect(0, 0, t, t); manchasRedondas(g, t, 70, ['#c4b498', '#e6dbc8'], 10, 30, 0.7);
      for (var i = 0; i < 1300; i++) { var x = rt() * t, y = rt() * t, r = 0.8 + rt() * 2.6; g.fillStyle = ['#b6a487', '#efe5d4', '#a39275', '#c9baa0'][Math.floor(rt() * 4)]; emendado(t, x, y, function (px, py) { g.beginPath(); g.ellipse(px, py, r, r * 0.75, rt() * 3, 0, 6.28); g.fill(); }); }
    } }
  };
  var telas = {}, cacheTex = {};
  // tex('pelo', 3, 3) -> { cor: textura de cor, relevo: mapa de normais }, com a repetição pedida
  function tex(nome, rx, ry) {
    var k = nome + ':' + rx + ':' + (ry || rx);
    if (cacheTex[k]) return cacheTex[k];
    if (!telas[nome]) { var d = DESENHOS[nome], c = tela(d.tam, d.fn); telas[nome] = { cor: c, relevo: relevo(c, d.forca) }; }
    var t = telas[nome], cor = new T.CanvasTexture(t.cor), rel = new T.CanvasTexture(t.relevo);
    [cor, rel].forEach(function (x) { x.wrapS = x.wrapT = T.RepeatWrapping; x.repeat.set(rx, ry || rx); x.anisotropy = ANISO; });
    cor.encoding = T.sRGBEncoding;
    return (cacheTex[k] = { cor: cor, relevo: rel });
  }
  // põe a textura e o relevo num material
  function texturizar(mat, nome, rx, ry, forcaRelevo) {
    var t = tex(nome, rx, ry); mat.map = t.cor;
    if (forcaRelevo !== 0 && 'normalMap' in mat) { mat.normalMap = t.relevo; mat.normalScale.set(forcaRelevo || 0.7, forcaRelevo || 0.7); }
    mat.needsUpdate = true; return mat;
  }

  // ---------- Iluminação dos bichos e do cenário ----------
  // Borda clara (contorno de luz, deixa os bichos destacados do fundo) e um escurecido perto do chão
  // (parece que as coisas estão "pisando" no chão, e não flutuando).
  var luzBorda = { cor: { value: new T.Color(0xfff2d8) }, forca: { value: 0.38 } };
  function sombraNoPe(sh, minimo, altura) {
    sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying float vAlturaMundo;')
      .replace('#include <project_vertex>', '#include <project_vertex>\n{ vec4 pm = vec4(transformed, 1.0);\n#ifdef USE_INSTANCING\n pm = instanceMatrix * pm;\n#endif\n vAlturaMundo = (modelMatrix * pm).y; }');
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vAlturaMundo;')
      .replace('#include <output_fragment>', 'outgoingLight *= mix(' + minimo.toFixed(2) + ', 1.0, smoothstep(0.0, ' + altura.toFixed(2) + ', vAlturaMundo));\n#include <output_fragment>');
  }
  function shaderCriatura(sh) {
    sh.uniforms.corBorda = luzBorda.cor; sh.uniforms.forcaBorda = luzBorda.forca;
    sombraNoPe(sh, 0.62, 0.55);
    sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform vec3 corBorda;\nuniform float forcaBorda;')
      .replace('outgoingLight *= mix(', 'float borda = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);\noutgoingLight += corBorda * pow(borda, 3.0) * forcaBorda;\noutgoingLight *= mix(');
  }
  function shaderCenario(sh) { sombraNoPe(sh, 0.68, 0.7); }
  function realceCriatura(mat) { mat.onBeforeCompile = shaderCriatura; mat.customProgramCacheKey = function () { return 'criatura'; }; return mat; }
  function realceCenario(mat) { mat.onBeforeCompile = shaderCenario; mat.customProgramCacheKey = function () { return 'cenario'; }; return mat; }

  // madeira, couro e metal com textura (as mesmas peças servem para o cenário, as defesas e as armas)
  texturizar(M.madeira, 'madeira', 1, 1, 0.6); texturizar(M.madeiraClara, 'madeira', 1, 1, 0.6); texturizar(M.couro, 'manchas', 2, 2, 0.6);
  [M.ferro, M.ferroEscuro, M.ouro].forEach(function (m) { texturizar(m, 'metal', 1, 1, 0.25); });

  // números aleatórios sempre iguais para o cenário
  var semente = 7;
  function rnd() { semente = (semente * 16807) % 2147483647; return (semente - 1) / 2147483646; }
  function hash2(x, z) { var s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453; return s - Math.floor(s); }
  function ruido(x, z) {
    var xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi, u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
    var a = hash2(xi, zi), b = hash2(xi + 1, zi), c = hash2(xi, zi + 1), d = hash2(xi + 1, zi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, z) { return ruido(x, z) * 0.55 + ruido(x * 2.1 + 5, z * 2.1) * 0.3 + ruido(x * 4.3, z * 4.3 + 9) * 0.15; }
  // dentro da cerca o chão é plano; do lado de fora sobem morros
  function alturaChao(x, z) {
    var d = Math.max(Math.abs(x), Math.abs(z)) - (LIM + 5); if (d <= 0) return 0;
    var k = Math.min(1, d / 38); return k * k * (4 + fbm(x * 0.04 + 7, z * 0.04) * 24);
  }

  // chão: grama clara e escura, trilhas de terra e o círculo de terra no meio (duas texturas misturadas, com relevo)
  (function chao() {
    var tg = tex('grama', 95, 95), tt = tex('terra', 95, 95);
    var geo = new T.PlaneGeometry(360, 360, 180, 180); geo.rotateX(-Math.PI / 2);
    var pos = geo.attributes.position, cores = new Float32Array(pos.count * 3), terras = new Float32Array(pos.count), cor = new T.Color();
    var g1 = new T.Color(0x62ad40), g2 = new T.Color(0x3f8a2c), g3 = new T.Color(0x86c24e), claro = new T.Color(0xf2ebe0), pedra = new T.Color(0x8d918a);
    for (var v = 0; v < pos.count; v++) {
      var x = pos.getX(v), z = pos.getZ(v), y = alturaChao(x, z), t = 0; pos.setY(v, y);
      cor.copy(g2).lerp(g1, fbm(x * 0.07, z * 0.07)).lerp(g3, Math.max(0, ruido(x * 0.25 + 50, z * 0.25) - 0.62) * 1.6);
      if (Math.max(Math.abs(x), Math.abs(z)) < LIM) {
        var trilha = Math.max(0, 1 - Math.abs(fbm(x * 0.03 + 3, z * 0.03 + 1) - 0.5) * 22);
        var meio = Math.hypot(x, z), circulo = meio < 4.5 ? Math.min(1, (4.5 - meio) / 2.5) : 0;
        t = Math.min(0.9, Math.max(trilha * 0.85, circulo * 0.85));
        cor.lerp(claro, t); // onde é terra, quem dá a cor é a textura da terra
      }
      if (y > 9) cor.lerp(pedra, Math.min(0.9, (y - 9) / 9));
      cores[v * 3] = cor.r; cores[v * 3 + 1] = cor.g; cores[v * 3 + 2] = cor.b; terras[v] = t;
    }
    geo.setAttribute('color', new T.BufferAttribute(cores, 3)); geo.setAttribute('terra', new T.BufferAttribute(terras, 1)); geo.computeVertexNormals();
    var mat = new T.MeshLambertMaterial({ map: tg.cor, normalMap: tg.relevo, vertexColors: true });
    mat.normalScale.set(0.5, 0.5);
    mat.onBeforeCompile = function (sh) {
      sh.uniforms.mapaTerra = { value: tt.cor };
      sh.vertexShader = 'attribute float terra;\nvarying float vTerra;\n' + sh.vertexShader.replace('#include <uv_vertex>', '#include <uv_vertex>\nvTerra = terra;');
      sh.fragmentShader = 'uniform sampler2D mapaTerra;\nvarying float vTerra;\n' + sh.fragmentShader.replace('#include <map_fragment>',
        '#ifdef USE_MAP\n  vec4 cGrama = texture2D(map, vUv);\n  vec4 cTerra = texture2D(mapaTerra, vUv * 0.7);\n  diffuseColor *= mix(cGrama, cTerra, smoothstep(0.08, 0.6, vTerra));\n#endif');
    };
    mat.customProgramCacheKey = function () { return 'chao'; };
    var chao = new T.Mesh(geo, mat);
    chao.receiveShadow = true; scene.add(chao);
  })();

  // grama e flores que balançam com o vento. Ficam sempre em volta da câmera (dá muita grama perto, com pouco trabalho)
  var tempoU = { value: 0 }, centroU = { value: new T.Vector2() };
  function shaderGrama(sh) {
    sh.uniforms.uTempo = tempoU; sh.uniforms.uCentro = centroU;
    var lim = (LIM + 0.5).toFixed(1);
    sh.vertexShader = 'uniform float uTempo;\nuniform vec2 uCentro;\nvec3 posMundo;\n' + sh.vertexShader
      .replace('#include <project_vertex>', [
        'vec4 mvPosition = vec4(transformed, 1.0);',
        '#ifdef USE_INSTANCING',
        '  vec3 local = mat3(instanceMatrix) * transformed;',
        '  vec2 base = vec2(instanceMatrix[3][0], instanceMatrix[3][2]);',
        '  vec2 wp = mod(base - uCentro + 20.0, 40.0) - 20.0 + uCentro;',
        '  float esc = 1.0 - smoothstep(14.0, 20.0, length(wp - uCentro));',
        '  esc *= step(abs(wp.x), ' + lim + ') * step(abs(wp.y), ' + lim + ');',
        '  local *= esc;',
        '  local.x += sin(uTempo * 1.9 + wp.x * 0.45 + wp.y * 0.3) * 0.09 * transformed.y;',
        '  local.z += cos(uTempo * 1.4 + wp.x * 0.3 - wp.y * 0.2) * 0.06 * transformed.y;',
        '  posMundo = local + vec3(wp.x, 0.0, wp.y);',
        '  mvPosition = vec4(posMundo, 1.0);',
        '#endif',
        'mvPosition = modelViewMatrix * mvPosition;',
        'gl_Position = projectionMatrix * mvPosition;'].join('\n'))
      .replace('#include <worldpos_vertex>', '#if defined(USE_SHADOWMAP)\n  vec4 worldPosition = vec4(posMundo, 1.0);\n#endif');
  }
  function geoTufo(n, alt, corBase, corPonta, flor) {
    var p = [], c = [], nor = [], b = new T.Color(corBase), t = new T.Color(corPonta);
    for (var i = 0; i < n; i++) {
      var a = rnd() * 6.28, r = rnd() * 0.12, x = Math.cos(a) * r, z = Math.sin(a) * r, h = alt * (0.6 + rnd() * 0.6);
      var w = 0.035 + rnd() * 0.02, ang = rnd() * 3.14, lx = Math.cos(ang) * w, lz = Math.sin(ang) * w, inc = (rnd() - 0.5) * 0.16;
      p.push(x - lx, 0, z - lz, x + lx, 0, z + lz, x + inc, h, z + inc * 0.5);
      c.push(b.r, b.g, b.b, b.r, b.g, b.b, t.r, t.g, t.b);
    }
    if (flor) { // cabecinha da flor: 4 pétalas em cima do talo
      var hf = alt * 0.95;
      for (var k = 0; k < 4; k++) { var a2 = k * Math.PI / 2 + 0.4; p.push(0, hf, 0, Math.cos(a2) * 0.07, hf + 0.01, Math.sin(a2) * 0.07, Math.cos(a2 + 0.8) * 0.07, hf + 0.01, Math.sin(a2 + 0.8) * 0.07); c.push(1, 0.95, 0.6, 1, 1, 1, 1, 1, 1); }
    }
    for (var q2 = 0; q2 < p.length / 3; q2++) nor.push(0, 1, 0);
    var g = new T.BufferGeometry();
    g.setAttribute('position', new T.Float32BufferAttribute(p, 3)); g.setAttribute('color', new T.Float32BufferAttribute(c, 3)); g.setAttribute('normal', new T.Float32BufferAttribute(nor, 3));
    return g;
  }
  function campoDeGrama(geo, max, cores) {
    var mat = new T.MeshLambertMaterial({ vertexColors: true, side: T.DoubleSide }); mat.onBeforeCompile = shaderGrama;
    var m = new T.InstancedMesh(geo, mat, max), d = new T.Object3D(), cor = new T.Color();
    for (var i = 0; i < max; i++) {
      d.position.set((rnd() * 2 - 1) * 20, 0, (rnd() * 2 - 1) * 20); d.rotation.set(0, rnd() * 6.28, 0); d.scale.setScalar(0.6 + rnd() * 0.6); d.updateMatrix();
      m.setMatrixAt(i, d.matrix); cor.setHex(cores[Math.floor(rnd() * cores.length)]); m.setColorAt(i, cor);
    }
    m.frustumCulled = false; m.receiveShadow = true; scene.add(m); return m;
  }
  var grama = campoDeGrama(geoTufo(6, 0.26, 0x4e9a33, 0xbfe57a), 6000, [0xffffff, 0xe8f5d0, 0xd2e8b0, 0xffffff]);
  var flores = campoDeGrama(geoTufo(1, 0.24, 0x3f8a2a, 0x5aa83c, true), 700, [0xfff36b, 0xffffff, 0xff9fd2, 0xc4a8ff, 0x8fd3ff, 0xffb35c]);

  // nuvens fofas que andam devagar e montanhas ao longe
  var grupoNuvens = new T.Group(); scene.add(grupoNuvens);
  (function nuvens() {
    var lista = [];
    for (var i = 0; i < 18; i++) {
      var a = rnd() * 6.28, d = 45 + rnd() * 120, y = 50 + rnd() * 28, s = 4 + rnd() * 5, n = 4 + Math.floor(rnd() * 4);
      for (var k = 0; k < n; k++) lista.push([Math.cos(a) * d + (k - n / 2) * s * 0.85 + rnd() * 2, y + rnd() * s * 0.35, Math.sin(a) * d + (rnd() - 0.5) * s, s * (0.6 + rnd() * 0.6)]);
    }
    var m = new T.InstancedMesh(new T.IcosahedronGeometry(1, 2), new T.MeshLambertMaterial({ color: 0xffffff, emissive: 0xaab6c8, fog: false }), lista.length), d2 = new T.Object3D();
    lista.forEach(function (c, i) { d2.position.set(c[0], c[1], c[2]); d2.scale.set(c[3] * 1.4, c[3] * 0.62, c[3]); d2.updateMatrix(); m.setMatrixAt(i, d2.matrix); });
    m.frustumCulled = false; grupoNuvens.add(m);
  })();
  (function montanhas() {
    var n = 36, cone = new T.ConeGeometry(1, 1, 7, 1); cone.translate(0, 0.5, 0);
    var m = new T.InstancedMesh(cone, texturizar(facetado(0xffffff), 'pedra', 3, 3, 0), n), neve = new T.InstancedMesh(cone, facetado(0xf3f6fa), n), d = new T.Object3D(), cor = new T.Color();
    for (var i = 0; i < n; i++) {
      var a = i / n * 6.28 + rnd() * 0.12, r = 125 + rnd() * 35, h = 24 + rnd() * 34, w = 22 + rnd() * 18;
      d.position.set(Math.cos(a) * r, -2, Math.sin(a) * r); d.rotation.set(0, rnd() * 6, 0); d.scale.set(w, h, w); d.updateMatrix(); m.setMatrixAt(i, d.matrix);
      cor.setHSL(0.33 + rnd() * 0.1, 0.22, 0.3 + rnd() * 0.1); m.setColorAt(i, cor);
      var topo = h > 42 ? 0.3 : 0.0001; d.position.y = -2 + h * (1 - topo); d.scale.set(w * topo * 1.03, h * topo * 1.01, w * topo * 1.03); d.updateMatrix(); neve.setMatrixAt(i, d.matrix);
    }
    scene.add(m); scene.add(neve);
  })();

  // árvores (pinheiros e árvores de copa redonda), arbustos, cogumelos, troncos caídos, pedras e a cerca
  var obstaculos = [];
  (function cenario() {
    var pinheiros = [], redondas = [], pedras = [], arbustos = [], cogus = [], troncos = [];
    function livre(x, z, r) { for (var i = 0; i < obstaculos.length; i++) { var o = obstaculos[i]; if (Math.hypot(o.x - x, o.z - z) < o.r + r) return false; } return true; }
    for (var i = 0; i < 500 && pinheiros.length + redondas.length < 80; i++) {
      var x = (rnd() * 2 - 1) * (LIM - 3), z = (rnd() * 2 - 1) * (LIM - 3);
      if (Math.hypot(x, z) < 9 || !livre(x, z, 1.5)) continue;
      var ehPin = rnd() < 0.58; (ehPin ? pinheiros : redondas).push({ x: x, z: z, s: 0.8 + rnd() * 0.6, y: 0, r: rnd() * 6, o: rnd(), pin: ehPin });
      obstaculos.push({ x: x, z: z, r: 0.6 });
    }
    for (var k = 0; k < 340; k++) { // floresta nos morros do lado de fora da cerca
      var a = rnd() * 6.28, dd = LIM + 4 + rnd() * 62, tx = Math.cos(a) * dd, tz = Math.sin(a) * dd;
      if (Math.max(Math.abs(tx), Math.abs(tz)) < LIM + 3) continue;
      var ehPin2 = rnd() < 0.68; (ehPin2 ? pinheiros : redondas).push({ x: tx, z: tz, s: 1 + rnd() * 0.9, y: alturaChao(tx, tz) - 0.1, r: rnd() * 6, o: rnd(), pin: ehPin2 });
    }
    for (var p = 0; p < 60 && pedras.length < 34; p++) {
      var px = (rnd() * 2 - 1) * (LIM - 2), pz = (rnd() * 2 - 1) * (LIM - 2), ps = 0.4 + rnd() * 0.8;
      if (Math.hypot(px, pz) < 7 || !livre(px, pz, ps + 0.4)) continue;
      pedras.push({ x: px, z: pz, s: ps, r: rnd() * 6 }); obstaculos.push({ x: px, z: pz, r: ps * 0.9 });
    }
    for (var b = 0; b < 70; b++) { var bx = (rnd() * 2 - 1) * (LIM - 1), bz = (rnd() * 2 - 1) * (LIM - 1); if (Math.hypot(bx, bz) > 6) arbustos.push({ x: bx, z: bz, s: 0.35 + rnd() * 0.35, r: rnd() * 6, fruta: rnd() < 0.4 }); }
    for (var c2 = 0; c2 < 40; c2++) { var t0 = (pinheiros.concat(redondas))[Math.floor(rnd() * 80)]; if (t0 && t0.y === 0) { var ac = rnd() * 6.28; cogus.push({ x: t0.x + Math.cos(ac) * (0.9 + rnd() * 0.6), z: t0.z + Math.sin(ac) * (0.9 + rnd() * 0.6), s: 0.08 + rnd() * 0.07 }); } }
    for (var tr = 0; tr < 9; tr++) { var lx = (rnd() * 2 - 1) * (LIM - 4), lz = (rnd() * 2 - 1) * (LIM - 4); if (Math.hypot(lx, lz) > 10 && livre(lx, lz, 1.4)) { troncos.push({ x: lx, z: lz, r: rnd() * 3.14, s: 0.8 + rnd() * 0.5 }); obstaculos.push({ x: lx, z: lz, r: 0.9 }); } }

    var d = new T.Object3D(), cor = new T.Color();
    function inst(geo, mat, lista, fn, sombra) {
      var m = new T.InstancedMesh(geo, mat, Math.max(1, lista.length));
      m.count = lista.length;
      lista.forEach(function (o, i) { d.position.set(0, 0, 0); d.rotation.set(0, 0, 0); d.scale.set(1, 1, 1); fn(o, i, m); d.updateMatrix(); m.setMatrixAt(i, d.matrix); });
      m.castShadow = sombra !== false; m.receiveShadow = true; scene.add(m); return m;
    }
    var geoTronco = new T.CylinderGeometry(0.15, 0.27, 1, 8, 4); geoTronco.translate(0, 0.5, 0);
    (function (pp) { for (var v = 0; v < pp.count; v++) { var y = pp.getY(v); if (y < 0.26) { var k = 1 + (0.26 - y) * 2.2 * (0.7 + hash2(Math.round(Math.atan2(pp.getZ(v), pp.getX(v)) * 3), 1) * 0.6); pp.setX(v, pp.getX(v) * k); pp.setZ(v, pp.getZ(v) * k); } } })(geoTronco.attributes.position); // raízes
    geoTronco.computeVertexNormals();
    var geoCone = new T.ConeGeometry(1, 1, 12, 2); geoCone.translate(0, 0.5, 0);
    (function (pp) { for (var v = 0; v < pp.count; v++) { var x = pp.getX(v), z = pp.getZ(v), rr = Math.hypot(x, z); if (rr > 0.05 && pp.getY(v) < 0.01) { var ia = Math.round(Math.atan2(z, x) / (Math.PI * 2 / 12)), k = ia % 2 ? 0.74 : 1.06; pp.setX(v, x * k); pp.setZ(v, z * k); pp.setY(v, ia % 2 ? 0.06 : -0.04); } } })(geoCone.attributes.position); // galhos em pontas
    geoCone.computeVertexNormals();
    var geoCopa = new T.IcosahedronGeometry(1, 1);
    (function (pp) { for (var v = 0; v < pp.count; v++) { var X = pp.getX(v), Y = pp.getY(v), Z = pp.getZ(v), j = 0.86 + hash2(Math.round(X * 7) * 1.3 + Math.round(Z * 7) * 2.7, Math.round(Y * 7) * 1.9) * 0.26; pp.setXYZ(v, X * j, Y * j, Z * j); } })(geoCopa.attributes.position);
    geoCopa.computeVertexNormals();
    var matTronco = texturizar(realceCenario(facetado(0xffffff)), 'casca', 1, 2, 0.9), matFolha = texturizar(realceCenario(facetado(0xffffff)), 'folhas', 2, 2, 0);
    var todas = pinheiros.concat(redondas);
    inst(geoTronco, matTronco, todas, function (o, i, m) { d.position.set(o.x, o.y, o.z); d.rotation.y = o.r; d.scale.set(o.s, (o.pin ? 1.7 : 2.1) * o.s, o.s); cor.setHSL(0.07, 0.42, 0.24 + o.o * 0.08); m.setColorAt(i, cor); });
    [[1.15, 1.55, 2.1], [2.05, 1.18, 1.75], [2.85, 0.8, 1.45]].forEach(function (cam, nivel) {
      inst(geoCone, matFolha, pinheiros, function (o, i, m) {
        d.position.set(o.x, o.y + cam[0] * o.s, o.z); d.rotation.y = o.r + nivel; d.scale.set(cam[1] * o.s, cam[2] * o.s, cam[1] * o.s);
        cor.setHSL(0.32 + o.o * 0.05, 0.58, 0.16 + o.o * 0.06 + nivel * 0.025); m.setColorAt(i, cor);
      });
    });
    [[0, 2.7, 0, 1.45], [0.55, 2.25, 0.25, 1.0], [-0.45, 2.35, -0.3, 0.95]].forEach(function (bl) {
      inst(geoCopa, matFolha, redondas, function (o, i, m) {
        var c = Math.cos(o.r), s = Math.sin(o.r);
        d.position.set(o.x + (bl[0] * c - bl[2] * s) * o.s, o.y + bl[1] * o.s, o.z + (bl[0] * s + bl[2] * c) * o.s); d.rotation.set(o.r, o.r * 2, 0); d.scale.setScalar(bl[3] * o.s);
        if (o.o > 0.86) cor.setHSL(0.08 + o.o * 0.02, 0.75, 0.42); else cor.setHSL(0.24 + o.o * 0.07, 0.62, 0.24 + o.o * 0.07);
        m.setColorAt(i, cor);
      });
    });
    // pedras com cantos tortos
    var geoPedra = new T.DodecahedronGeometry(1, 1), pp = geoPedra.attributes.position;
    for (var v = 0; v < pp.count; v++) { var X = pp.getX(v), Y = pp.getY(v), Z = pp.getZ(v), j = 0.78 + hash2(Math.round(X * 9) * 1.3 + Math.round(Z * 9) * 2.1, Math.round(Y * 9) * 0.7) * 0.44; pp.setXYZ(v, X * j, Y * j, Z * j); }
    geoPedra.computeVertexNormals();
    inst(geoPedra, texturizar(realceCenario(facetado(0xffffff)), 'pedra', 1, 1, 0.9), pedras, function (o, i, m) { d.position.set(o.x, o.s * 0.35, o.z); d.rotation.set(o.r * 0.3, o.r, 0); d.scale.set(o.s, o.s * 0.72, o.s); cor.setHSL(0.1 + o.r * 0.01, 0.07, 0.3 + o.r * 0.025); m.setColorAt(i, cor); });
    inst(geoCopa, matFolha, arbustos, function (o, i, m) { d.position.set(o.x, o.s * 0.6, o.z); d.rotation.set(o.r, o.r, 0); d.scale.set(o.s * 1.4, o.s, o.s * 1.3); cor.setHSL(0.29 + o.r * 0.01, 0.55, 0.22 + o.r * 0.012); m.setColorAt(i, cor); });
    var frutas = []; arbustos.forEach(function (o) { if (o.fruta) for (var f = 0; f < 4; f++) { var af = f * 1.7 + o.r; frutas.push({ x: o.x + Math.cos(af) * o.s * 1.1, y: o.s * (0.5 + (f % 2) * 0.35), z: o.z + Math.sin(af) * o.s * 1.05 }); } });
    inst(new T.SphereGeometry(1, 8, 6), toon(0xe0263a), frutas, function (o) { d.position.set(o.x, o.y, o.z); d.scale.setScalar(0.06); }, false);
    // cogumelos pequenos perto das árvores
    var geoChapeu = new T.SphereGeometry(1, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2);
    inst(G.cilindro, toon(0xfff3dc), cogus, function (o) { d.position.set(o.x, o.s * 0.6, o.z); d.scale.set(o.s * 0.35, o.s * 1.2, o.s * 0.35); }, false);
    inst(geoChapeu, toon(0xd9333f), cogus, function (o) { d.position.set(o.x, o.s * 1.15, o.z); d.scale.set(o.s, o.s * 0.75, o.s); }, false);
    // troncos caídos
    inst(new T.CylinderGeometry(0.28, 0.32, 2.6, 10), texturizar(realceCenario(facetado(0x9a7048)), 'casca', 2, 1, 0.9), troncos, function (o) { d.position.set(o.x, 0.28, o.z); d.rotation.set(0, o.r, Math.PI / 2); d.scale.setScalar(o.s); });
    // cerca de madeira em volta do campo
    var lado = LIM + 1, postes = [], passo = 3;
    for (var w = -lado; w <= lado; w += passo) postes.push([w, -lado], [w, lado], [-lado, w], [lado, w]);
    var matCerca = texturizar(realceCenario(facetado(0x8a5d36)), 'madeira', 1, 2, 0.7);
    inst(new T.CylinderGeometry(0.1, 0.12, 1.24, 7), matCerca, postes, function (p) { d.position.set(p[0], 0.62, p[1]); });
    inst(new T.ConeGeometry(0.1, 0.18, 7), matCerca, postes, function (p) { d.position.set(p[0], 1.33, p[1]); });
    var mTabua = texturizar(realceCenario(facetado(0xa5774a)), 'madeira', 8, 1, 0.6);
    [0.45, 0.95].forEach(function (y) {
      [[0, -lado, lado * 2, 0.08], [0, lado, lado * 2, 0.08], [-lado, 0, 0.08, lado * 2], [lado, 0, 0.08, lado * 2]].forEach(function (t) {
        var tab = peca(G.caixa, mTabua, t[2], 0.12, t[3], t[0], y, t[1], scene); tab.castShadow = true; tab.receiveShadow = true;
      });
    });
  })();

  // partículas (faíscas, fumaça, magia): poucas chamadas de desenho para muitas bolinhas
  var escalaPontos = { value: 400 };
  function sistemaParticulas(max, aditivo) {
    var geo = new T.BufferGeometry(), pos = new Float32Array(max * 3), cor = new Float32Array(max * 3), tam = new Float32Array(max), alfa = new Float32Array(max);
    var aPos = new T.BufferAttribute(pos, 3).setUsage(T.DynamicDrawUsage), aCor = new T.BufferAttribute(cor, 3).setUsage(T.DynamicDrawUsage);
    var aTam = new T.BufferAttribute(tam, 1).setUsage(T.DynamicDrawUsage), aAlfa = new T.BufferAttribute(alfa, 1).setUsage(T.DynamicDrawUsage);
    geo.setAttribute('position', aPos); geo.setAttribute('cor', aCor); geo.setAttribute('tam', aTam); geo.setAttribute('alfa', aAlfa);
    var mat = new T.ShaderMaterial({
      uniforms: { mapa: { value: texPonto }, escala: escalaPontos },
      vertexShader: 'attribute vec3 cor; attribute float tam; attribute float alfa; uniform float escala; varying vec3 vCor; varying float vAlfa;\n' +
        'void main() { vCor = cor; vAlfa = alfa; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = tam * escala / max(-mv.z, 0.1); gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform sampler2D mapa; varying vec3 vCor; varying float vAlfa;\nvoid main() { float a = texture2D(mapa, gl_PointCoord).a * vAlfa; if (a < 0.01) discard; gl_FragColor = vec4(vCor, a);\n#include <encodings_fragment>\n}',
      transparent: true, depthWrite: false, blending: aditivo ? T.AdditiveBlending : T.NormalBlending
    });
    var pts = new T.Points(geo, mat); pts.frustumCulled = false; pts.renderOrder = aditivo ? 6 : 5; scene.add(pts);
    var vel = new Float32Array(max * 3), vida = new Float32Array(max), dur = new Float32Array(max), t0 = new Float32Array(max), t1 = new Float32Array(max), a0 = new Float32Array(max), grav = new Float32Array(max), prox = 0, vivas = 0;
    return {
      emitir: function (x, y, z, vx, vy, vz, d, tamI, tamF, c, alfaI, g) {
        var i = prox; prox = (prox + 1) % max; vivas = max;
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z; vel[i * 3] = vx; vel[i * 3 + 1] = vy; vel[i * 3 + 2] = vz;
        vida[i] = dur[i] = d; t0[i] = tamI; t1[i] = tamF; a0[i] = alfaI; grav[i] = g || 0; cor[i * 3] = c.r; cor[i * 3 + 1] = c.g; cor[i * 3 + 2] = c.b; aCor.needsUpdate = true;
      },
      atualizar: function (dt) {
        if (!vivas) return;
        var alguma = false;
        for (var i = 0; i < max; i++) {
          if (vida[i] <= 0) continue;
          vida[i] -= dt;
          if (vida[i] <= 0) { alfa[i] = 0; tam[i] = 0; continue; }
          alguma = true;
          vel[i * 3 + 1] -= grav[i] * dt;
          pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] = Math.max(0.03, pos[i * 3 + 1] + vel[i * 3 + 1] * dt); pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
          var k = 1 - vida[i] / dur[i];
          tam[i] = t0[i] + (t1[i] - t0[i]) * k; alfa[i] = a0[i] * (1 - k) * Math.min(1, k * 12);
        }
        if (!alguma) vivas = 0;
        aPos.needsUpdate = aTam.needsUpdate = aAlfa.needsUpdate = true;
      },
      limpar: function () { vida.fill(0); alfa.fill(0); tam.fill(0); aTam.needsUpdate = aAlfa.needsUpdate = true; vivas = 0; }
    };
  }
  var fxBrilho = sistemaParticulas(900, true), fxFumaca = sistemaParticulas(600, false);
  var corTmp = new T.Color();
  function faiscas(x, y, z, corHex, qtd, forca) {
    corTmp.setHex(corHex); forca = forca || 4;
    for (var i = 0; i < qtd; i++) {
      var a = Math.random() * 6.28, b = Math.random() * 2 - 1, v = forca * (0.4 + Math.random() * 0.8), r = Math.sqrt(1 - b * b);
      fxBrilho.emitir(x, y, z, Math.cos(a) * r * v, b * v + 1.5, Math.sin(a) * r * v, 0.22 + Math.random() * 0.25, 0.13, 0.02, corTmp, 1, 10);
    }
  }
  function fumaca(x, y, z, corHex, qtd, tam, subida) {
    corTmp.setHex(corHex);
    for (var i = 0; i < qtd; i++) {
      var a = Math.random() * 6.28, r = Math.random() * tam * 0.5;
      fxFumaca.emitir(x + Math.cos(a) * r, y + Math.random() * tam * 0.3, z + Math.sin(a) * r, Math.cos(a) * 0.6, (subida === undefined ? 0.8 : subida) + Math.random() * 0.5, Math.sin(a) * 0.6, 0.55 + Math.random() * 0.35, tam * 0.5, tam * 1.5, corTmp, 0.6, -0.3);
    }
  }
  function brilhoSubindo(x, y, z, corHex, qtd, raio) {
    corTmp.setHex(corHex);
    for (var i = 0; i < qtd; i++) { var a = Math.random() * 6.28, r = Math.random() * raio; fxBrilho.emitir(x + Math.cos(a) * r, y + Math.random() * 0.4, z + Math.sin(a) * r, 0, 1.2 + Math.random() * 1.2, 0, 0.6 + Math.random() * 0.5, 0.16, 0.04, corTmp, 0.9, 0); }
  }
  // pedacinhos coloridos que voam quando algo quebra ou um monstro é derrotado
  function estourar(x, y, z, cor, qtd) {
    corTmp.setHex(cor);
    for (var i = 0; i < qtd; i++) { var a = Math.random() * 6.28, v = 1.5 + Math.random() * 3; fxFumaca.emitir(x, y, z, Math.cos(a) * v, 2 + Math.random() * 3, Math.sin(a) * v, 0.6 + Math.random() * 0.3, 0.2, 0.08, corTmp, 1, 9); }
    fumaca(x, y, z, 0xf4f1ea, Math.ceil(qtd / 2), 0.9, 0.9);
  }

  // moedas douradas que pulam do monstro e voam até você
  var geoMoeda = new T.CylinderGeometry(0.11, 0.11, 0.028, 16); geoMoeda.rotateX(Math.PI / 2);
  var moedasFx = new T.InstancedMesh(geoMoeda, M.ouro, 90); moedasFx.count = 0; moedasFx.frustumCulled = false; scene.add(moedasFx);
  var voando = [], dMoeda = new T.Object3D();
  function soltarMoedas(x, y, z, qtd) {
    for (var i = 0; i < qtd && voando.length < 90; i++) { var a = Math.random() * 6.28, v = 1.2 + Math.random() * 2; voando.push({ x: x, y: y, z: z, vx: Math.cos(a) * v, vy: 3 + Math.random() * 2.5, vz: Math.sin(a) * v, t: -i * 0.03, giro: Math.random() * 6 }); }
  }
  function atualizarMoedas(dt) {
    var alvo = camera.position;
    for (var i = voando.length - 1; i >= 0; i--) {
      var c = voando[i]; c.t += dt; c.giro += dt * 10; if (c.t < 0) continue;
      if (c.t < 0.5) { c.vy -= 12 * dt; c.x += c.vx * dt; c.y = Math.max(0.12, c.y + c.vy * dt); c.z += c.vz * dt; }
      else {
        var dx = alvo.x - c.x, dy = alvo.y - 0.55 - c.y, dz = alvo.z - c.z, d = Math.hypot(dx, dy, dz), v = 5 + (c.t - 0.5) * 32;
        if (d < 0.45 || c.t > 2.5) { voando.splice(i, 1); continue; }
        var p = Math.min(1, v * dt / d); c.x += dx * p; c.y += dy * p; c.z += dz * p;
      }
    }
    for (var k = 0; k < voando.length; k++) { var m = voando[k]; dMoeda.position.set(m.x, m.y, m.z); dMoeda.rotation.set(0, m.giro, 0); dMoeda.scale.setScalar(m.t < 0 ? 0.001 : 1); dMoeda.updateMatrix(); moedasFx.setMatrixAt(k, dMoeda.matrix); }
    moedasFx.count = voando.length; moedasFx.instanceMatrix.needsUpdate = true;
  }

  // ---------- Modelos dos monstros ----------
  // Formas arredondadas (cápsulas, torneados, asas recortadas). Cada tipo é montado uma vez e depois copiado;
  // as peças que não se mexem sozinhas são juntadas num desenho só (fica leve no celular).
  function olhos(g, y, z, r, pupila) {
    [-1, 1].forEach(function (lado) {
      peca(G.esfera, M.branco, r * 0.24, r * 0.24, r * 0.24, lado * r * 0.33, y, z, g);
      peca(G.esfera, pupila || M.preto, r * 0.12, r * 0.12, r * 0.12, lado * r * 0.33, y, z + r * 0.18, g);
      peca(G.esfera, M.brilho, r * 0.045, r * 0.045, r * 0.045, lado * r * 0.33 - r * 0.04, y + r * 0.05, z + r * 0.27, g); // brilho no olho
    });
  }
  var capsCache = {};
  function geoCapsula(k) { k = Math.round(k * 4) / 4; if (!capsCache[k]) capsCache[k] = new T.CapsuleGeometry(1, k, 6, 14); return capsCache[k]; }
  function capsula(pai, mat, raio, comp, x, y, z) { var m = new T.Mesh(geoCapsula(Math.max(0, comp / raio - 2)), mat); m.scale.setScalar(raio); m.position.set(x, y, z); pai.add(m); return m; }
  var EIXO_Y = new T.Vector3(0, 1, 0), dirTmp = new T.Vector3();
  // braço, perna, pescoço: cápsula de um ponto a outro
  function membro(pai, mat, x0, y0, z0, x1, y1, z1, raio) {
    var dx = x1 - x0, dy = y1 - y0, dz = z1 - z0, L = Math.hypot(dx, dy, dz) || 0.001;
    var m = capsula(pai, mat, raio, L + raio * 1.4, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    m.quaternion.setFromUnitVectors(EIXO_Y, dirTmp.set(dx / L, dy / L, dz / L)); return m;
  }
  function segmento(pai, mat, x0, y0, x1, y1, esp) { return membro(pai, mat, x0, y0, 0, x1, y1, 0, esp * 0.55); }
  // tronco das pessoas (peito largo, cintura fina), feito no torno
  var geoTronco = new T.LatheGeometry([[0, -0.5], [0.6, -0.47], [0.8, -0.32], [0.74, -0.08], [0.8, 0.16], [0.95, 0.35], [0.84, 0.5], [0.42, 0.6], [0, 0.62]].map(function (p) { return new T.Vector2(p[0], p[1]); }), 18);
  // fantasma: cúpula redonda e saia com a barra ondulada
  var geoFantasma = (function () {
    var g = new T.LatheGeometry([[1.12, -0.78], [1.04, -0.4], [0.97, 0], [1.0, 0.42], [0.95, 0.75], [0.8, 1.05], [0.55, 1.3], [0.28, 1.45], [0, 1.5]].map(function (p) { return new T.Vector2(p[0], p[1]); }), 28, 0, Math.PI * 2);
    var pos = g.attributes.position;
    for (var i = 0; i < pos.count; i++) { var y = pos.getY(i); if (y < -0.6) pos.setY(i, y + Math.sin(Math.atan2(pos.getZ(i), pos.getX(i)) * 7) * 0.13); }
    g.computeVertexNormals(); return g;
  })();
  // asa recortada (morcego e dragão): borda de cima lisa e a de baixo em "ondas"
  var geoAsa = (function () {
    var s = new T.Shape(); s.moveTo(0, 0.14); s.quadraticCurveTo(0.5, 0.48, 1.0, 0.34);
    s.quadraticCurveTo(0.9, 0.06, 0.8, -0.04); s.quadraticCurveTo(0.68, 0.08, 0.56, -0.12); s.quadraticCurveTo(0.43, 0.02, 0.31, -0.17); s.quadraticCurveTo(0.17, -0.02, 0, -0.1); s.lineTo(0, 0.14);
    return new T.ShapeGeometry(s, 10); // a asa fica em pé (dá para ver de frente)
  })();
  // pedra com cantos tortos (golem)
  var geoRocha = (function () {
    var g = new T.DodecahedronGeometry(1, 0), p = g.attributes.position;
    for (var v = 0; v < p.count; v++) { var X = p.getX(v), Y = p.getY(v), Z = p.getZ(v), j = 0.82 + hash2(Math.round(X * 9) * 1.7 + Math.round(Z * 9) * 2.3, Math.round(Y * 9) * 0.9 + 5) * 0.36; p.setXYZ(v, X * j, Y * j, Z * j); }
    g.computeVertexNormals(); return g;
  })();
  var matCapa = texturizar(realceCriatura(toon(0x8b1d1d)), 'tecido', 3, 3, 0.4); matCapa.side = T.DoubleSide;
  var geoCapa = new T.CylinderGeometry(0.62, 1.0, 1, 18, 1, true, Math.PI / 2 + 0.25, Math.PI - 0.5);
  var geoGola = new T.CylinderGeometry(1.0, 0.62, 1, 14, 1, true, Math.PI / 2, Math.PI);
  function texturaDoTipo(tipo) {
    if (tipo.forma === 'aranha' && tipo.cauda) return ['manchas', 2, 2]; // escorpião: casca lisa
    if (tipo.forma === 'lobo' || tipo.forma === 'morcego' || tipo.forma === 'aranha' || tipo.forma === 'yeti' || tipo.lobisomem) return ['pelo', 3, 3];
    if (tipo.forma === 'cobra' || tipo.forma === 'dragao') return ['escamas', 5, 3];
    if (tipo.forma === 'golem') return tipo.brilho ? ['lava', 2, 2] : ['pedra', 2, 2];
    if (tipo.forma === 'humano') return tipo.umOlho ? null : ['manchas', 2, 2]; // o ciclope tem a pele lisa
    return null;
  }
  // junta as peças paradas de cada parte (corpo, cada braço, cada perna...) num desenho só por material
  function juntarGeos(lista) {
    var pos = [], nor = [], uv = [], v = new T.Vector3(), nm = new T.Matrix3();
    lista.forEach(function (m) {
      m.updateMatrix(); nm.getNormalMatrix(m.matrix);
      var g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry, P = g.attributes.position, N = g.attributes.normal, U = g.attributes.uv;
      for (var i = 0; i < P.count; i++) {
        v.fromBufferAttribute(P, i).applyMatrix4(m.matrix); pos.push(v.x, v.y, v.z);
        v.fromBufferAttribute(N, i).applyMatrix3(nm).normalize(); nor.push(v.x, v.y, v.z);
        if (U) uv.push(U.getX(i), U.getY(i)); else uv.push(0, 0);
      }
      if (g !== m.geometry) g.dispose();
    });
    var out = new T.BufferGeometry();
    out.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new T.Float32BufferAttribute(nor, 3)); out.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
    out.computeBoundingSphere(); return out;
  }
  function fundir(raiz) {
    var grupos = [];
    raiz.traverse(function (o) { if (o.children && o.children.length && !o.isMesh) grupos.push(o); });
    grupos.forEach(function (o) {
      var porMat = {};
      o.children.slice().forEach(function (m) {
        if (!m.isMesh || m.isInstancedMesh || m.children.length || m.userData.solto || m.name) return;
        var k = m.material.uuid; (porMat[k] = porMat[k] || []).push(m);
      });
      Object.keys(porMat).forEach(function (k) {
        var lista = porMat[k]; if (lista.length < 2) return;
        var nova = new T.Mesh(juntarGeos(lista), lista[0].material);
        nova.castShadow = lista[0].castShadow; nova.receiveShadow = lista[0].receiveShadow;
        lista.forEach(function (m) { o.remove(m); }); o.add(nova);
      });
    });
  }
  function construirMonstro(tipo, dourado, chefe) {
    var r = tipo.r * (dourado ? 1.15 : 1) * (chefe ? 1.7 : 1);
    var lava = tipo.forma === 'golem' && tipo.brilho;
    var mat = realceCriatura(toon(dourado ? 0xf2ae1c : (lava ? 0xffe2cc : tipo.cor), chefe ? CHEFE_COR : (dourado ? 0x5a3a00 : (tipo.brilho || 0x000000))));
    var tt = texturaDoTipo(tipo), forcaRel = tt && tt[0] === 'manchas' ? 0.18 : 0.55; if (tt) texturizar(mat, tt[0], tt[1], tt[2], forcaRel);
    if (tipo.forma === 'fantasma') { mat.transparent = true; mat.opacity = 0.82; mat.side = T.DoubleSide; }
    if (tipo.forma === 'morcego' || tipo.forma === 'dragao') mat.side = T.DoubleSide; // as asas são finas
    var corEsc = new T.Color(dourado ? 0xf2ae1c : tipo.cor).multiplyScalar(0.55);
    var matEsc = realceCriatura(toon(corEsc.getHex())); if (tt) texturizar(matEsc, tt[0], tt[1], tt[2], forcaRel);
    var g = new T.Group(), p = {}, alt = r * 2;
    var olhoBrilho = tipo.olhos === 'vermelho' ? M.vermelho : (tipo.olhos === 'amarelo' ? M.amarelo : M.preto);
    if (tipo.forma === 'geleca') {
      p.corpo = peca(G.esfera, mat, r, r * 0.75, r, 0, r * 0.7, 0, g); p.corpo.name = 'corpo';
      peca(G.esfera, M.brilho, r * 0.22, r * 0.1, r * 0.14, -r * 0.35, r * 1.2, r * 0.45, g);
      olhos(g, r * 0.9, r * 0.82, r); alt = r * 1.5;
    } else if (tipo.forma === 'morcego' || tipo.forma === 'dragao') {
      var voo = new T.Group(); voo.position.y = tipo.forma === 'dragao' ? 2.1 : 1.6; voo.name = 'voo'; g.add(voo); p.voo = voo; p.vooY = voo.position.y;
      var tamAsa = tipo.forma === 'dragao' ? 2.1 : 1.7;
      if (tipo.forma === 'dragao') {
        capsula(voo, mat, r * 0.42, r * 1.6, 0, 0, 0).rotation.x = Math.PI / 2;
        peca(G.esfera, matEsc, r * 0.32, r * 0.26, r * 0.62, 0, -r * 0.18, r * 0.05, voo); // barriga
        membro(voo, mat, 0, r * 0.15, r * 0.55, 0, r * 0.5, r * 0.95, r * 0.22); // pescoço
        peca(G.esfera, mat, r * 0.42, r * 0.36, r * 0.5, 0, r * 0.58, r * 1.1, voo);
        membro(voo, mat, 0, r * 0.5, r * 1.32, 0, r * 0.46, r * 1.62, r * 0.15); // focinho
        peca(G.esfera, M.preto, r * 0.04, r * 0.04, r * 0.04, -r * 0.07, r * 0.55, r * 1.74, voo); peca(G.esfera, M.preto, r * 0.04, r * 0.04, r * 0.04, r * 0.07, r * 0.55, r * 1.74, voo);
        [-1, 1].forEach(function (l) { var ch = peca(G.cone, M.osso, r * 0.08, r * 0.38, r * 0.08, l * r * 0.2, r * 0.95, r * 0.92, voo); ch.rotation.set(-0.6, 0, -l * 0.25); });
        for (var es = 0; es < 4; es++) peca(G.cone, matEsc, r * 0.07, r * 0.2, r * 0.07, 0, r * 0.42, r * 0.45 - es * r * 0.32, voo).rotation.x = -0.3; // espinhos nas costas
        var olhosD = new T.Group(); olhosD.position.set(0, r * 0.66, r * 1.43); voo.add(olhosD); olhos(olhosD, 0, 0, r * 0.8, olhoBrilho);
        var raboD = peca(G.cone, mat, r * 0.26, r * 1.2, r * 0.26, 0, -r * 0.05, -r * 1.55, voo); raboD.rotation.x = -Math.PI / 2;
        peca(G4, matEsc, r * 0.2, r * 0.26, r * 0.06, 0, -r * 0.05, -r * 2.2, voo).rotation.x = -Math.PI / 2;
      } else {
        peca(G.esfera, mat, r, r * 0.95, r * 0.9, 0, 0, 0, voo);
        [-1, 1].forEach(function (l) { var or = peca(G.cone, mat, r * 0.24, r * 0.55, r * 0.14, l * r * 0.48, r * 0.92, 0, voo); or.rotation.z = -l * 0.2; peca(G.cone, M.rosa, r * 0.12, r * 0.34, r * 0.06, l * r * 0.48, r * 0.88, r * 0.06, voo).rotation.z = -l * 0.2; });
        olhos(voo, r * 0.18, r * 0.8, r, olhoBrilho);
        if (tipo.presas) [-1, 1].forEach(function (l) { peca(G.cone, M.branco, r * 0.09, r * 0.3, r * 0.09, l * r * 0.22, -r * 0.4, r * 0.8, voo).rotation.x = Math.PI; });
        [-1, 1].forEach(function (l) { peca(G.esfera, matEsc, r * 0.12, r * 0.1, r * 0.16, l * r * 0.3, -r * 0.92, 0, voo); }); // pezinhos
      }
      p.asas = [-1, 1].map(function (lado, i) {
        var piv = new T.Group(); piv.position.set(lado * r * (tipo.forma === 'dragao' ? 0.35 : 0.6), tipo.forma === 'dragao' ? r * 0.25 : 0, 0); piv.name = 'asas' + i; voo.add(piv);
        var incl = new T.Group(); incl.rotation.x = 0.78; piv.add(incl); // inclinada para a frente: aparece de frente e de cima
        var asa = new T.Mesh(geoAsa, mat); asa.scale.set(lado * r * tamAsa, r * tamAsa * 0.75, 1); asa.userData.solto = true; incl.add(asa);
        membro(incl, matEsc, 0, r * tamAsa * 0.75 * 0.14, 0, lado * r * tamAsa, r * tamAsa * 0.75 * 0.34, 0, r * 0.05).userData.solto = true; // osso da asa, na borda de cima
        piv.userData.lado = lado; return piv;
      });
      alt = voo.position.y + r;
    } else if (tipo.forma === 'fantasma') {
      var flut = new T.Group(); flut.position.y = 1.0; flut.name = 'voo'; g.add(flut); p.voo = flut; p.vooY = 1.0;
      peca(geoFantasma, mat, r, r, r, 0, 0, 0, flut);
      [-1, 1].forEach(function (l) { membro(flut, mat, l * r * 0.85, r * 0.35, r * 0.1, l * r * 1.25, r * 0.05, r * 0.35, r * 0.18); });
      olhos(flut, r * 0.88, r * 0.83, r);
      peca(G.esfera, M.preto, r * 0.13, r * 0.17, r * 0.06, 0, r * 0.5, r * 0.95, flut); // boquinha "O"
      alt = 1 + r * 1.5;
    } else if (tipo.forma === 'golem') { // feito de pedras
      peca(geoRocha, mat, r * 0.95, r * 0.82, r * 0.66, 0, r * 1.6, 0, g);
      peca(geoRocha, mat, r * 0.58, r * 0.42, r * 0.48, 0, r * 0.98, 0, g);
      peca(geoRocha, mat, r * 0.44, r * 0.4, r * 0.42, 0, r * 2.55, r * 0.06, g);
      [-1, 1].forEach(function (l) { peca(geoRocha, mat, r * 0.4, r * 0.36, r * 0.4, l * r * 0.95, r * 2.1, 0, g); });
      olhos(g, r * 2.6, r * 0.42, r * 0.85, M.amarelo);
      p.bracos = [-1, 1].map(function (lado, i) { var b = new T.Group(); b.position.set(lado * r * 1.08, r * 2.0, 0); b.name = 'bracos' + i; g.add(b); peca(geoRocha, mat, r * 0.3, r * 0.4, r * 0.3, 0, -r * 0.42, 0, b); peca(geoRocha, mat, r * 0.38, r * 0.36, r * 0.4, 0, -r * 1.0, r * 0.06, b); return b; });
      p.pernas = [-1, 1].map(function (lado, i) { var b = new T.Group(); b.position.set(lado * r * 0.42, r * 0.8, 0); b.name = 'pernas' + i; g.add(b); peca(geoRocha, mat, r * 0.32, r * 0.34, r * 0.32, 0, -r * 0.32, 0, b); peca(geoRocha, mat, r * 0.34, r * 0.18, r * 0.42, 0, -r * 0.64, r * 0.08, b); return b; });
      alt = r * 3;
    } else if (tipo.forma === 'yeti') { // grandão peludo, com a cara e as mãos mais claras
      var matCara = realceCriatura(toon(0xaebccb));
      var corpoY = capsula(g, mat, r * 0.72, r * 1.9, 0, r * 1.6, 0); corpoY.scale.z = r * 0.62;
      peca(G.esfera, mat, r * 0.5, r * 0.48, r * 0.5, 0, r * 2.75, r * 0.08, g);
      peca(G.esfera, matCara, r * 0.36, r * 0.32, r * 0.2, 0, r * 2.7, r * 0.45, g);
      olhos(g, r * 2.8, r * 0.58, r * 0.62);
      peca(G.esfera, M.preto, r * 0.12, r * 0.05, r * 0.05, 0, r * 2.56, r * 0.62, g);
      p.cotovelos = []; p.joelhos = [];
      p.bracos = [-1, 1].map(function (lado, i) {
        var b = new T.Group(); b.position.set(lado * r * 0.8, r * 2.3, 0); b.name = 'bracos' + i; g.add(b);
        membro(b, mat, 0, 0, 0, lado * r * 0.14, -r * 0.75, r * 0.05, r * 0.24);
        var co = new T.Group(); co.position.set(lado * r * 0.14, -r * 0.75, r * 0.05); co.name = 'cotovelos' + i; b.add(co); p.cotovelos.push(co);
        membro(co, mat, 0, 0, 0, lado * r * 0.06, -r * 0.6, r * 0.09, r * 0.22); peca(G.esfera, matCara, r * 0.24, r * 0.2, r * 0.26, lado * r * 0.06, -r * 0.77, r * 0.13, co);
        return b;
      });
      p.pernas = [-1, 1].map(function (lado, i) {
        var b = new T.Group(); b.position.set(lado * r * 0.38, r * 0.95, 0); b.name = 'pernas' + i; g.add(b);
        membro(b, mat, 0, 0, 0, 0, -r * 0.42, r * 0.02, r * 0.27);
        var jo = new T.Group(); jo.position.set(0, -r * 0.42, r * 0.02); jo.name = 'joelhos' + i; b.add(jo); p.joelhos.push(jo);
        membro(jo, mat, 0, 0, 0, 0, -r * 0.2, 0, r * 0.22); peca(G.esfera, matCara, r * 0.3, r * 0.15, r * 0.42, 0, -r * 0.43, r * 0.08, jo);
        return b;
      });
      alt = r * 3.25;
    } else if (tipo.forma === 'cobra') {
      p.segs = [];
      for (var sg = 0; sg < 11; sg++) {
        var tam = r * (sg === 0 ? 1 : Math.max(0.28, 0.95 - sg * 0.07)), seg = peca(G.esfera, mat, tam, tam * 0.72, tam * 1.15, 0, tam * 0.72, r * 0.8 - sg * r * 1.05, g);
        seg.userData.solto = true; seg.name = 'segs' + sg; p.segs.push(seg);
      }
      var cabC = p.segs[0]; cabC.scale.set(r * 1.15, r * 0.88, r * 1.35); cabC.position.y = r * 1.1;
      peca(G.esfera, matEsc, r * 0.7, r * 0.42, r * 0.6, 0, r * 0.82, r * 1.5, g); // queixo mais escuro
      olhos(g, r * 1.5, r * 1.82, r, olhoBrilho);
      p.lingua = peca(G.caixa, M.vermelho, r * 0.08, r * 0.03, r * 0.6, 0, r * 0.95, r * 2.15, g); p.lingua.name = 'lingua';
      alt = r * 2.0;
    } else if (tipo.forma === 'aranha') { // aranha e escorpião
      var esc = !!tipo.cauda, yc = esc ? r * 0.55 : r * 0.75;
      if (esc) {
        peca(G.esfera, mat, r * 0.72, r * 0.4, r * 1.25, 0, yc, -r * 0.2, g);
        for (var pl = 0; pl < 3; pl++) peca(G.esfera, matEsc, r * 0.74, r * 0.12, r * 0.18, 0, yc + r * 0.28, -r * 0.7 + pl * r * 0.42, g); // placas das costas
        peca(G.esfera, mat, r * 0.5, r * 0.34, r * 0.5, 0, yc, r * 0.95, g);
        olhos(g, yc + r * 0.18, r * 1.32, r * 0.62, olhoBrilho);
      } else {
        peca(G.esfera, mat, r, r * 0.68, r * 1.15, 0, yc, -r * 0.3, g);
        peca(G.esfera, matEsc, r * 0.4, r * 0.08, r * 0.5, 0, yc + r * 0.62, -r * 0.35, g); // desenho nas costas
        peca(G.esfera, mat, r * 0.55, r * 0.5, r * 0.55, 0, r * 0.7, r * 0.75, g);
        olhos(g, r * 0.85, r * 1.2, r * 0.7, olhoBrilho);
      }
      p.pernas = [];
      [-1, 1].forEach(function (lado) { // pernas dobradas: sobem até o joelho e descem até o chão
        for (var i = 0; i < 4; i++) {
          var b = new T.Group(); b.position.set(lado * r * (esc ? 0.5 : 0.45), yc, (i - 1.5) * r * (esc ? 0.4 : 0.38) - (esc ? r * 0.2 : 0)); b.rotation.y = -lado * (i - 1.5) * 0.3; b.name = 'pernas' + p.pernas.length; g.add(b);
          var L1 = r * (esc ? 0.5 : 0.72), a = esc ? 0.45 : 0.75, kx = lado * L1 * Math.cos(a), ky = L1 * Math.sin(a), fx = kx + lado * r * (esc ? 0.32 : 0.42), fy = -yc + r * 0.04;
          segmento(b, mat, 0, 0, kx, ky, r * 0.12); segmento(b, matEsc, kx, ky, fx, fy, r * 0.1);
          b.userData.lado = lado; b.userData.baseY = b.rotation.y; b.userData.grupoA = (lado < 0) === (i % 2 === 0);
          p.pernas.push(b);
        }
      });
      if (esc) {
        // cauda: bolinhas encostadas que vão para trás, sobem e curvam para a frente, com o ferrão na ponta
        var cauda = new T.Group(); cauda.position.set(0, yc, -r * 1.25); cauda.name = 'cauda'; g.add(cauda); p.cauda = cauda;
        var fim = null;
        for (var cs = 0; cs <= 12; cs++) {
          var t2 = cs / 12, cz = -r * 0.6 * Math.sin(Math.PI * t2) + r * 1.05 * t2 * t2, cy = r * 1.4 * Math.sin(Math.PI * t2 / 2), rr = r * (0.27 - t2 * 0.07);
          peca(G.esfera, cs % 2 ? matEsc : mat, rr, rr, rr, 0, cy, cz, cauda); fim = [cy, cz];
        }
        var ferrao = peca(G.cone, realceCriatura(toon(0xf0c46a)), r * 0.13, r * 0.46, r * 0.13, 0, fim[0] - r * 0.1, fim[1] + r * 0.2, cauda); ferrao.rotation.x = Math.PI * 0.68;
        // pinças: braço, a mão e as duas pontas abertas
        [-1, 1].forEach(function (l) {
          var bx = l * r * 0.38, bz = r * 0.85, cx = l * r * 0.72, cz2 = r * 1.6;
          membro(g, mat, bx, yc, bz, cx, yc, cz2, r * 0.09);
          peca(G.esfera, mat, r * 0.22, r * 0.17, r * 0.26, cx, yc, cz2, g);
          [-1, 1].forEach(function (k) { var dente = peca(G.cone, matEsc, r * 0.085, r * 0.4, r * 0.085, cx + k * r * 0.09, yc, cz2 + r * 0.32, g); dente.rotation.order = 'YXZ'; dente.rotation.set(Math.PI / 2, k * 0.38, 0); });
        });
      }
      alt = r * (esc ? 2.0 : 1.4);
    } else if (tipo.forma === 'cogumelo') {
      var pulo = new T.Group(); pulo.position.y = 0.15; pulo.name = 'voo'; g.add(pulo); p.voo = pulo; p.vooY = 0.15;
      peca(G.cilindro, M.osso, r * 0.45, r * 1.0, r * 0.45, 0, r * 0.5, 0, pulo);
      peca(G.esfera, mat, r * 1.15, r * 0.6, r * 1.15, 0, r * 1.15, 0, pulo);
      olhos(pulo, r * 0.6, r * 0.42, r * 0.8);
      alt = r * 1.9;
    } else if (tipo.forma === 'humano') { // zumbi, vampiro, lobisomem, ciclope, demônio
      var pele = tipo.pele ? M.pele : mat;
      peca(geoTronco, mat, r * 0.66, r * 1.55, r * 0.44, 0, r * 2.05, 0, g);
      peca(G.esfera, matEsc, r * 0.5, r * 0.3, r * 0.36, 0, r * 1.36, 0, g); // quadril (calça mais escura)
      peca(G.esfera, pele, r * 0.6, r * 0.62, r * 0.58, 0, r * 3.2, 0, g);
      if (tipo.capa) { peca(geoCapa, matCapa, r * 1.0, r * 2.3, r * 0.72, 0, r * 1.95, -r * 0.02, g); peca(geoGola, matCapa, r * 0.62, r * 0.5, r * 0.5, 0, r * 2.98, 0, g); }
      if (tipo.presas) [-1, 1].forEach(function (l) { peca(G.cone, M.branco, r * 0.06, r * 0.2, r * 0.06, l * r * 0.15, r * 2.95, r * 0.55, g).rotation.x = Math.PI; });
      if (tipo.lobisomem) {
        membro(g, mat, 0, r * 3.08, r * 0.45, 0, r * 3.02, r * 0.8, r * 0.18);
        peca(G.esfera, M.preto, r * 0.09, r * 0.08, r * 0.08, 0, r * 3.12, r * 0.96, g);
        [-1, 1].forEach(function (l) { var ore = peca(G.cone, mat, r * 0.16, r * 0.48, r * 0.12, l * r * 0.33, r * 3.82, 0, g); ore.rotation.z = -l * 0.2; });
      }
      if (tipo.umOlho) { // ciclope: um olho grande só
        peca(G.esfera, M.branco, r * 0.3, r * 0.3, r * 0.3, 0, r * 3.3, r * 0.45, g);
        peca(G.esfera, M.preto, r * 0.14, r * 0.14, r * 0.14, 0, r * 3.3, r * 0.72, g);
        peca(G.esfera, M.brilho, r * 0.05, r * 0.05, r * 0.05, -r * 0.05, r * 3.37, r * 0.84, g);
      } else olhos(g, r * 3.3, r * 0.5, r * 0.9, olhoBrilho);
      if (tipo.dentes) { peca(G.cone, M.osso, r * 0.08, r * 0.25, r * 0.08, -r * 0.2, r * 3.0, r * 0.55, g); peca(G.cone, M.osso, r * 0.08, r * 0.25, r * 0.08, r * 0.2, r * 3.0, r * 0.55, g); }
      if (tipo.chifres) [-1, 1].forEach(function (l) { var ch = peca(G.cone, M.escuro, r * 0.14, r * 0.55, r * 0.14, l * r * 0.36, r * 3.85, 0, g); ch.rotation.z = -l * 0.35; });
      var frente = tipo.bracosFrente; // o zumbi anda com os braços esticados para a frente
      p.cotovelos = []; p.joelhos = [];
      p.bracos = [-1, 1].map(function (lado, i) {
        var b = new T.Group(); b.position.set(lado * r * 0.8, r * 2.62, 0); b.name = 'bracos' + i; g.add(b);
        var cot = frente ? [lado * r * 0.04, -r * 0.3, r * 0.55] : [lado * r * 0.06, -r * 0.62, r * 0.02], pun = frente ? [lado * r * 0.06, -r * 0.38, r * 1.08] : [lado * r * 0.09, -r * 1.12, r * 0.08];
        membro(b, mat, 0, 0, 0, cot[0], cot[1], cot[2], r * 0.15);
        var co = new T.Group(); co.position.set(cot[0], cot[1], cot[2]); co.name = 'cotovelos' + i; b.add(co); p.cotovelos.push(co);
        membro(co, mat, 0, 0, 0, pun[0] - cot[0], pun[1] - cot[1], pun[2] - cot[2], r * 0.13);
        peca(G.esfera, pele, r * 0.16, r * 0.16, r * 0.17, pun[0] - cot[0], pun[1] - (frente ? 0 : r * 0.08) - cot[1], pun[2] + (frente ? r * 0.1 : 0.02) - cot[2], co);
        return b;
      });
      p.pernas = [-1, 1].map(function (lado, i) {
        var b = new T.Group(); b.position.set(lado * r * 0.3, r * 1.32, 0); b.name = 'pernas' + i; g.add(b);
        membro(b, matEsc, 0, 0, 0, 0, -r * 0.6, r * 0.02, r * 0.19);
        var jo = new T.Group(); jo.position.set(0, -r * 0.6, r * 0.02); jo.name = 'joelhos' + i; b.add(jo); p.joelhos.push(jo);
        membro(jo, matEsc, 0, 0, 0, 0, -r * 0.5, -r * 0.02, r * 0.16);
        peca(G.esfera, M.escuro, r * 0.19, r * 0.11, r * 0.3, 0, -r * 0.62, r * 0.08, jo);
        return b;
      });
      alt = r * 3.9;
    } else if (tipo.forma === 'lobo') { // lobo, rato, javali, urso (e o lobo ajudante)
      var go = tipo.raboCurto ? 1.2 : 1;
      capsula(g, mat, r * 0.45 * go, r * 1.9, 0, r * 1.2, -r * 0.05).rotation.x = Math.PI / 2;
      peca(G.esfera, mat, r * 0.5 * go, r * 0.5 * go, r * 0.48 * go, 0, r * 1.28, r * 0.5, g); // peito
      membro(g, mat, 0, r * 1.36, r * 0.62, 0, r * 1.62, r * 0.98, r * 0.24 * go); // pescoço
      peca(G.esfera, mat, r * 0.4 * go, r * 0.37 * go, r * 0.44 * go, 0, r * 1.7, r * 1.08, g);
      var ponta = r * (tipo.raboCurto ? 1.54 : 1.66);
      membro(g, tipo.dentes ? matEsc : mat, 0, r * 1.6, r * 1.3, 0, r * 1.55, ponta, r * (tipo.dentes ? 0.21 : 0.16)); // focinho
      if (tipo.dentes) { var disco = peca(G.cilindro, M.rosa, r * 0.17, r * 0.06, r * 0.14, 0, r * 1.55, ponta + r * 0.16, g); disco.rotation.x = Math.PI / 2; }
      else peca(G.esfera, M.preto, r * 0.075, r * 0.06, r * 0.06, 0, r * 1.6, ponta + r * 0.14, g);
      [-1, 1].forEach(function (l) {
        if (tipo.orelhasRedondas) peca(G.esfera, mat, r * 0.17 * go, r * 0.17 * go, r * 0.07, l * r * 0.27 * go, r * 2.02, r * 1.0, g);
        else { var orl = peca(G.cone, mat, r * 0.14, r * 0.36, r * 0.1, l * r * 0.22, r * 2.08, r * 1.02, g); orl.rotation.z = -l * 0.25; }
        if (tipo.dentes) peca(G.cone, M.osso, r * 0.07, r * 0.35, r * 0.07, l * r * 0.2, r * 1.5, r * 1.85, g).rotation.x = Math.PI / 2.4;
      });
      olhos(g, r * 1.8, r * (1.08 + 0.37 * go), r * 0.75, olhoBrilho);
      var rabo = new T.Group(); rabo.position.set(0, r * 1.35, -r * 0.95); rabo.name = 'rabo'; g.add(rabo); p.rabo = rabo;
      if (tipo.raboCurto) peca(G.esfera, mat, r * 0.18, r * 0.18, r * 0.18, 0, r * 0.1, -r * 0.07, rabo);
      else if (tipo.raboFino) { var rf = peca(G.cilindro, M.rosa, r * 0.05, r * 1.6, r * 0.05, 0, -r * 0.25, -r * 0.65, rabo); rf.rotation.x = -1.2; }
      else if (tipo.dentes) { var rc = new T.Mesh(new T.TorusGeometry(r * 0.1, r * 0.03, 6, 12, Math.PI * 1.5), matEsc); rc.position.set(0, r * 0.05, -r * 0.07); rc.rotation.y = Math.PI / 2; rabo.add(rc); }
      else { var rp = peca(G.cone, mat, r * 0.17, r * 0.9, r * 0.17, 0, -r * 0.2, -r * 0.35, rabo); rp.rotation.x = -2.25; }
      p.joelhos = [];
      p.pernas = [[-1, 1], [-1, -1], [1, -1], [1, 1]].map(function (l, i) { // frente-esq., trás-esq., trás-dir., frente-dir.
        var b = new T.Group(); b.position.set(l[0] * r * 0.27 * go, r * 0.98, l[1] * r * 0.55); b.name = 'pernas' + i; b.userData.frente = l[1] > 0; g.add(b);
        membro(b, mat, 0, 0, 0, 0, -r * 0.45, r * 0.03, r * 0.12 * go);
        var jo = new T.Group(); jo.position.set(0, -r * 0.45, r * 0.03); jo.name = 'joelhos' + i; b.add(jo); p.joelhos.push(jo);
        membro(jo, mat, 0, 0, 0, 0, -r * 0.39, -r * 0.05, r * 0.1 * go);
        peca(G.esfera, matEsc, r * 0.13 * go, r * 0.08, r * 0.17 * go, 0, -r * 0.45, r * 0.01, jo);
        return b;
      });
      alt = r * 2.3;
    }
    if (chefe) { // coroa dourada do chefão
      var coroa = new T.Group(); coroa.position.y = alt + 0.05; g.add(coroa);
      peca(G.cilindro, M.ouro, r * 0.45, r * 0.15, r * 0.45, 0, 0, 0, coroa);
      for (var c = 0; c < 5; c++) { var ac = c / 5 * Math.PI * 2; peca(G.cone, M.ouro, r * 0.1, r * 0.3, r * 0.1, Math.cos(ac) * r * 0.38, r * 0.2, Math.sin(ac) * r * 0.38, coroa); peca(G.esfera, M.vermelho, r * 0.05, r * 0.05, r * 0.05, Math.cos(ac + 0.63) * r * 0.46, r * 0.02, Math.sin(ac + 0.63) * r * 0.46, coroa); }
      if (p.voo) { g.remove(coroa); coroa.position.y = alt - p.vooY + 0.05; p.voo.add(coroa); }
      alt += r * 0.4;
    }
    // sombra redonda (quando as sombras de verdade estão desligadas para os bichos)
    var sombra = new T.Mesh(geoSombra, matSombra); sombra.scale.set(r * 1.15, 1, r * 1.15); sombra.position.y = 0.03; sombra.renderOrder = 1; sombra.userData.semSombra = true; sombra.name = 'sombra'; g.add(sombra);
    if (chefe) { // anel roxo girando no chão em volta do chefão
      var aura = new T.Group(); aura.scale.setScalar(r * 1.25); aura.name = 'aura'; g.add(aura);
      var anelChao = new T.Mesh(geoAnel, matAura); anelChao.position.y = 0.05; anelChao.userData.semSombra = true; anelChao.userData.solto = true; aura.add(anelChao);
      var parede = new T.Mesh(geoParedeLuz, matParedeRoxa); parede.userData.semSombra = true; parede.userData.solto = true; aura.add(parede);
    }
    var balanco = new T.Group(); balanco.name = 'balanco';
    g.children.slice().forEach(function (o) { if (o.name !== 'sombra' && o.name !== 'aura') { g.remove(o); balanco.add(o); } });
    g.add(balanco); p.balanco = balanco;
    fundir(g);
    return { grupo: g, partes: p, mat: mat, alt: alt, r: r };
  }
  // cada monstro novo é uma cópia do molde do seu tipo (com o próprio material, para piscar sozinho)
  var moldes = {};
  function fazerMonstro(tipo, dourado, chefe) {
    var k = (tipo.id || tipo.nome) + (dourado ? ':d' : '') + (chefe ? ':c' : '');
    var m = moldes[k] || (moldes[k] = construirMonstro(tipo, dourado, chefe));
    var g = m.grupo.clone(true), mat = m.mat.clone();
    mat.onBeforeCompile = m.mat.onBeforeCompile; mat.customProgramCacheKey = m.mat.customProgramCacheKey;
    g.traverse(function (o) { if (o.isMesh && o.material === m.mat) o.material = mat; });
    var p = {};
    if (m.partes.vooY !== undefined) p.vooY = m.partes.vooY;
    ['corpo', 'voo', 'lingua', 'cauda', 'balanco', 'rabo'].forEach(function (n) { if (m.partes[n]) p[n] = g.getObjectByName(n); });
    ['asas', 'pernas', 'bracos', 'segs', 'joelhos', 'cotovelos'].forEach(function (n) { if (m.partes[n]) p[n] = m.partes[n].map(function (_, i) { return g.getObjectByName(n + i); }); });
    return { grupo: g, partes: p, mat: mat, alt: m.alt, r: m.r, sombra: g.getObjectByName('sombra'), aura: g.getObjectByName('aura') };
  }
  var geoAnel = new T.RingGeometry(0.82, 1.12, 48); geoAnel.rotateX(-Math.PI / 2);
  var matAura = new T.MeshBasicMaterial({ color: 0xa21caf, transparent: true, opacity: 0.8, depthWrite: false, side: T.DoubleSide, toneMapped: false });
  var matAmigo = new T.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.5, depthWrite: false, side: T.DoubleSide });
  // parede de luz baixinha (some para cima): marca o chefão (roxa) e os ajudantes (verde) por cima da grama
  var texSobe = (function () { var c = document.createElement('canvas'); c.width = 4; c.height = 64; var g = c.getContext('2d'); var gr = g.createLinearGradient(0, 0, 0, 64); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, 'rgba(255,255,255,1)'); g.fillStyle = gr; g.fillRect(0, 0, 4, 64); return new T.CanvasTexture(c); })();
  var geoParedeLuz = new T.CylinderGeometry(1, 1, 0.7, 40, 1, true); geoParedeLuz.translate(0, 0.35, 0);
  var matParedeRoxa = new T.MeshBasicMaterial({ color: 0xb21fd0, map: texSobe, transparent: true, opacity: 0.55, depthWrite: false, side: T.DoubleSide, toneMapped: false });
  var matParedeVerde = new T.MeshBasicMaterial({ color: 0x22c55e, map: texSobe, transparent: true, opacity: 0.4, depthWrite: false, side: T.DoubleSide, toneMapped: false });
  // sombra de verdade só no gráfico alto; nos outros, a sombra redonda embaixo
  function sombraDoModelo(modelo) {
    var real = qual().sombra === 'movel';
    modelo.grupo.traverse(function (o) { if (o.isMesh && !o.userData.semSombra) o.castShadow = real; });
    if (modelo.sombra) modelo.sombra.visible = !real;
  }
  // Cada bicho anda do seu jeito. A passada acompanha a velocidade de verdade (as patas não "patinam"),
  // e quando ele para, as pernas voltam ao lugar e ele fica só respirando.
  var PASSADA = { lobo: 2.3, humano: 2.6, golem: 2.0, yeti: 2.4, aranha: 1.3, cobra: 3.0, geleca: 1.6, cogumelo: 1.6 }; // comprimento de um ciclo, em "tamanhos" do bicho
  function virarPara(atual, alvo, max) { var d = alvo - atual; d = Math.atan2(Math.sin(d), Math.cos(d)); return atual + Math.max(-max, Math.min(max, d)); }
  function animarMonstro(m, t, dt) {
    dt = dt || 0;
    var p = m.modelo.partes, forma = m.tipo.forma, r = m.r, bal = p.balanco;
    var v = m.velAtual || 0, vTipo = m.tipo.vel || 2;
    m.anda = (m.anda || 0) + (Math.min(1, v / (vTipo * 0.35)) - (m.anda || 0)) * Math.min(1, dt * 6);
    if (m.ciclo === undefined) m.ciclo = m.fase;
    m.ciclo += v * dt / ((PASSADA[forma] || 2) * r) * Math.PI * 2;
    var w = m.anda, c = m.ciclo, resp = Math.sin(t * 2.1 + m.fase);
    var at = m.ataque > 0 ? Math.sin((1 - m.ataque / 0.25) * Math.PI) : 0; // 0 → 1 → 0 durante o ataque
    if (bal) { bal.position.set(0, 0, 0); bal.rotation.set(0, 0, 0); }
    if (forma === 'lobo') { // quatro patas: trote (diagonais juntas) ou galope (o lobo, que é rápido)
      var galope = v > 3.0, off = galope ? [0, 0.55, 0.65, 0.1] : [0, 0.5, 0, 0.5], amp = galope ? 0.75 : 0.5;
      p.pernas.forEach(function (pe, i) {
        var ph = c + off[i] * Math.PI * 2;
        pe.rotation.x = -Math.sin(ph) * amp * w; // para a frente e para trás
        if (p.joelhos) p.joelhos[i].rotation.x = Math.max(0, Math.cos(ph)) * (pe.userData.frente ? 0.9 : 1.15) * w; // dobra a pata quando ela vai para a frente
      });
      bal.position.y = (galope ? Math.abs(Math.sin(c)) * 0.12 : (Math.cos(c * 2) * 0.5 + 0.5) * 0.04) * r * w + resp * 0.012 * r * (1 - w);
      bal.rotation.x = (galope ? Math.sin(c) * 0.14 : 0) * w + at * 0.3; // no galope o corpo vai para a frente e para trás; no bote abaixa a cabeça
      bal.rotation.z = (m.tipo.raboCurto ? Math.sin(c) * 0.07 : 0) * w; // o urso anda gingando
      bal.position.z = at * 0.4 * r; // bote
      if (p.rabo) { p.rabo.rotation.y = Math.sin(t * (w > 0.3 ? 9 : 3) + m.fase) * (m.tipo.raboFino ? 0.35 : 0.25); p.rabo.rotation.x = Math.sin(c) * 0.15 * w; }
    } else if (forma === 'humano' || forma === 'yeti') { // duas pernas: braço e perna opostos vão juntos
      var zumbi = m.tipo.bracosFrente, curvado = m.tipo.lobisomem, pesado = m.tipo.umOlho || forma === 'yeti';
      var lean = curvado ? 0.28 : (zumbi ? 0.15 : 0.04 * w);
      var ampP = zumbi ? 0.32 : (curvado ? 0.62 : (pesado ? 0.42 : 0.5)), ampB = zumbi ? 0 : (curvado ? 0.7 : (m.tipo.capa ? 0.22 : (forma === 'yeti' ? 0.55 : 0.45)));
      p.pernas.forEach(function (pe, i) {
        var ph = c + i * Math.PI, arrasta = zumbi && i === 1 ? 0.45 : 1; // o zumbi arrasta uma das pernas
        pe.rotation.x = -Math.sin(ph) * ampP * arrasta * w - lean; // "- lean": desfaz a inclinação do corpo, a perna fica em pé e o pé da frente passa à frente do corpo
        if (p.joelhos) p.joelhos[i].rotation.x = (Math.max(0, Math.cos(ph)) * arrasta + 0.06) * w + (curvado ? 0.25 : 0);
      });
      p.bracos.forEach(function (b, i) {
        var ph = c + i * Math.PI;
        b.rotation.x = Math.sin(ph) * ampB * w - at * (zumbi ? 0.35 : 1.7) + (zumbi ? Math.sin(t * 1.6 + i) * 0.06 : resp * 0.03);
        if (zumbi) b.position.z = at * 0.25 * r; // empurra os braços para a frente, para agarrar
        b.rotation.z = (i === 0 ? -1 : 1) * (0.06 + (curvado ? 0.1 : 0));
        if (p.cotovelos) p.cotovelos[i].rotation.x = zumbi ? -at * 0.3 : -(0.2 + Math.max(0, -Math.sin(ph)) * 0.35) * w - 0.15 * (1 - w) - at * 0.4;
      });
      bal.position.y = (Math.cos(c * 2) * 0.5 + 0.5) * (pesado ? 0.09 : 0.05) * r * w;
      bal.rotation.x = lean + (zumbi ? at * 0.2 : 0);
      bal.rotation.z = Math.sin(c) * (zumbi ? 0.12 : (pesado ? 0.07 : 0.03)) * w; // o zumbi cambaleia; o ciclope e o yeti balançam pesado
      bal.rotation.y = Math.sin(c) * 0.08 * w;
      bal.position.z = at * (zumbi ? 0.3 : 0.15) * r;
    } else if (forma === 'golem') { // pedra pesada: passos duros, balança de um lado para o outro, golpe com os dois braços
      p.pernas.forEach(function (pe, i) { pe.rotation.x = -Math.sin(c + i * Math.PI) * 0.4 * w; });
      p.bracos.forEach(function (b, i) { b.rotation.x = Math.sin(c + i * Math.PI) * 0.35 * w - at * 2.2 + resp * 0.03; });
      bal.position.y = Math.abs(Math.cos(c)) * 0.06 * r * w;
      bal.rotation.z = Math.sin(c) * 0.1 * w; bal.rotation.x = at * 0.15;
    } else if (forma === 'aranha') { // 4 pernas sobem e vão para a frente enquanto as outras 4 ficam no chão
      p.pernas.forEach(function (pe) {
        var u = pe.userData, ph = c + (u.grupoA ? 0 : Math.PI);
        pe.rotation.y = u.baseY - u.lado * Math.sin(ph) * 0.32 * w;
        pe.rotation.z = u.lado * Math.max(0, Math.cos(ph)) * 0.35 * w;
      });
      bal.position.y = Math.abs(Math.sin(c * 2)) * 0.03 * r * w + resp * 0.01 * r;
      bal.rotation.x = -at * 0.45; // empina a frente para atacar
      if (p.cauda) { p.cauda.rotation.x = Math.sin(t * 3 + m.fase) * 0.1 + at * 0.9; p.cauda.rotation.y = Math.sin(c * 0.5) * 0.15 * w; }
    } else if (forma === 'cobra') { // serpenteia: o "S" passa da cabeça para o rabo, acompanhando o caminho
      p.segs.forEach(function (sg, i) { if (i) sg.position.x = Math.sin(c - i * 0.75) * r * 0.5 * Math.min(1, i / 3) * (0.35 + 0.65 * w); });
      bal.position.z = at * 0.6 * r; bal.rotation.x = -at * 0.2; // bote
      p.lingua.visible = Math.sin(t * 9 + m.fase) > 0.3;
    } else if (forma === 'morcego') { // asas rápidas, sobe e desce a cada batida e voa em zigue-zague
      var bat = t * 15 + m.fase;
      p.asas.forEach(function (a) { a.rotation.z = a.userData.lado * (0.3 + Math.sin(bat) * 0.6); });
      p.voo.position.y = p.vooY + Math.sin(bat - 1.2) * 0.1 - at * 0.6 + Math.sin(t * 1.3 + m.fase) * 0.15;
      p.voo.position.x = Math.sin(t * 2.2 + m.fase) * 0.45 * r + Math.sin(t * 5.1 + m.fase) * 0.12 * r;
      p.voo.rotation.z = Math.cos(t * 2.2 + m.fase) * 0.25; // inclina nas curvas
    } else if (forma === 'dragao') { // asas lentas e fortes; de vez em quando plana com as asas abertas
      var plana = Math.max(0, Math.sin(t * 0.6 + m.fase)), bd = t * 6.5 + m.fase, ampA = 0.15 + 0.5 * (1 - plana);
      p.asas.forEach(function (a) { a.rotation.z = a.userData.lado * (0.25 + Math.sin(bd) * ampA); });
      p.voo.position.y = p.vooY + Math.sin(bd - 1.4) * 0.12 * (1 - plana) + Math.sin(t * 0.9 + m.fase) * 0.2;
      p.voo.position.z = at * 0.5 * r;
      p.voo.rotation.x = Math.sin(bd - 1.4) * 0.05 * (1 - plana) - at * 0.25; p.voo.rotation.z = Math.sin(t * 0.8 + m.fase) * 0.1;
    } else if (forma === 'fantasma') { // flutua devagar, balançando; cresce um pouco quando dá o susto
      p.voo.position.y = p.vooY + Math.sin(t * 1.6 + m.fase) * 0.18;
      p.voo.position.x = Math.sin(t * 0.9 + m.fase) * 0.3 * r;
      p.voo.rotation.z = Math.sin(t * 1.3 + m.fase) * 0.12; p.voo.rotation.x = 0.14 * w + Math.sin(t * 1.1 + m.fase) * 0.04;
      p.voo.scale.setScalar(1 + at * 0.25);
    } else if (forma === 'geleca') { // anda pulando: amassa ao cair e estica ao subir
      var pulo = Math.abs(Math.sin(c)), am = (1 - pulo) * w;
      bal.position.y = pulo * 0.35 * r * w;
      p.corpo.scale.set(r * (1 + am * 0.14 + resp * 0.02), r * (0.75 - am * 0.14 + resp * 0.02), r * (1 + am * 0.14));
    } else if (forma === 'cogumelo' && p.voo) p.voo.position.y = p.vooY + Math.abs(Math.sin(c)) * 0.2 * r;
  }

  // ---------- Arma na mão (desenhada por cima do mundo, para não entrar nas árvores nem nos monstros) ----------
  var cenaMao = new T.Scene(), camMao = new T.PerspectiveCamera(70, 1, 0.01, 20);
  cenaMao.add(new T.HemisphereLight(0xe2f0ff, 0x5b6b45, 0.85));
  var luzMao = new T.DirectionalLight(0xfff1dc, 1.6); luzMao.position.set(-0.5, 1, 0.7); cenaMao.add(luzMao);
  cenaMao.add(camMao);
  var maoBase = new T.Vector3(0.3, -0.36, -0.26); // o ombro fica no canto de baixo, à direita
  var ombro = new T.Group(); camMao.add(ombro);
  var braco = new T.Group(); ombro.add(braco);
  var mao = new T.Group(); ombro.add(mao); // a arma sai da mão, na ponta do braço
  var rastro = (function () { // meia-lua do golpe: fina nas pontas, mais clara na frente
    var n = 32, R = 0.56, p = [], c = [], idx = [];
    for (var i = 0; i <= n; i++) {
      var t = i / n, a = 1.45 + t * 2.0, w = Math.sin(t * Math.PI) * 0.09, k = 0.12 + t * 0.88; // do alto (t=0) para baixo à esquerda (t=1, mais claro na frente)
      p.push(Math.cos(a) * R, Math.sin(a) * R, 0, Math.cos(a) * (R - w), Math.sin(a) * (R - w), 0);
      c.push(k, k, k, k * 0.4, k * 0.4, k * 0.4);
      if (i < n) { var b = i * 2; idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2); }
    }
    var g = new T.BufferGeometry(); g.setAttribute('position', new T.Float32BufferAttribute(p, 3)); g.setAttribute('color', new T.Float32BufferAttribute(c, 3)); g.setIndex(idx);
    var m = new T.Mesh(g, new T.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide, toneMapped: false }));
    m.position.set(0.24, -0.34, -0.72); camMao.add(m); return m; // o centro da meia-lua fica no ombro, como o caminho da espada
  })();
  var flechaNoArco = null, armaBrilha = null, maoRetrato = null;
  var G4 = new T.ConeGeometry(1, 1, 4); // ponta de 4 lados (lâmina e lança)
  function suave(x) { return x * x * (3 - 2 * x); }
  function brilhoSprite(cor, sx, sy, x, y, pai) {
    var s = new T.Sprite(new T.SpriteMaterial({ map: texPonto, color: cor, depthWrite: false, transparent: true, opacity: 0.4, toneMapped: false }));
    s.scale.set(sx, sy, 1); s.position.set(x, y, 0.02); pai.add(s); return s;
  }
  function laminaExtrudada(larg, comp, ponta, esp) { // lâmina com fio chanfrado
    var s = new T.Shape(); s.moveTo(-larg, 0); s.lineTo(larg, 0); s.lineTo(larg, comp); s.lineTo(0, comp + ponta); s.lineTo(-larg, comp); s.lineTo(-larg, 0);
    var g = new T.ExtrudeGeometry(s, { depth: esp, bevelEnabled: true, bevelThickness: esp * 0.9, bevelSize: larg * 0.32, bevelSegments: 1 }); g.translate(0, 0, -esp / 2); return g;
  }
  var geoLamina = laminaExtrudada(0.022, 0.46, 0.11, 0.003), geoPontaLanca = (function () {
    var s = new T.Shape(); s.moveTo(0, 0); s.quadraticCurveTo(0.06, 0.07, 0, 0.26); s.quadraticCurveTo(-0.06, 0.07, 0, 0);
    var g = new T.ExtrudeGeometry(s, { depth: 0.004, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.008, bevelSegments: 1 }); g.translate(0, 0, -0.002); return g;
  })();
  var geoAnelCabo = new T.TorusGeometry(1, 0.25, 5, 12), geoCil10 = new T.CylinderGeometry(1, 1, 1, 10);
  function caboEnrolado(g, y0, y1, raio) { peca(G.cilindro, M.couro, raio, y1 - y0, raio, 0, (y0 + y1) / 2, 0, g); for (var y = y0 + 0.02; y < y1; y += 0.035) peca(geoAnelCabo, M.couro, raio, raio, raio * 1.15, 0, y, 0, g).rotation.x = Math.PI / 2; }
  function montarArmaNaMao() {
    [braco, mao].forEach(function (g) { while (g.children.length) g.remove(g.children[0]); });
    var a = arma(), arm = armadura(), g = new T.Group();
    flechaNoArco = null; armaBrilha = null;
    // braço com a manga na cor da armadura, punho e mão
    var manga = arm.metal ? texturizar(new T.MeshStandardMaterial({ color: arm.cor, metalness: 0.5, roughness: 0.55, envMap: envMapa, envMapIntensity: 0.5 }), 'metal', 2, 2, 0.3) : texturizar(toon(arm.cor), 'tecido', 3, 3, 0.5);
    peca(new T.CylinderGeometry(0.85, 1, 1, 14), manga, 0.034, 0.4, 0.034, 0.02, 0.03, -0.19, braco).rotation.x = -Math.PI / 2 + 0.15;
    peca(G.cilindro, arm.metal ? M.ferroEscuro : M.couro, 0.037, 0.05, 0.037, 0.02, 0.055, -0.36, braco).rotation.x = -Math.PI / 2 + 0.15;
    peca(G.esfera, M.pele, 0.038, 0.036, 0.046, 0.02, 0.06, -0.41, braco);
    var retrato = innerWidth < innerHeight; maoRetrato = retrato;
    mao.position.set(0.02, 0.06, -0.41); mao.scale.setScalar(retrato ? 0.54 : 0.66); mao.add(g);
    var estilo = 'golpe', rot = [-0.42, 0, 0.24];
    if (a.modelo === 'pau') {
      peca(G.cilindro, M.madeira, 0.02, 0.36, 0.02, 0, 0.06, 0, g);
      var topo = peca(G.cilindro, M.madeira, 0.018, 0.3, 0.018, 0.02, 0.36, 0, g); topo.rotation.z = -0.15;
      var folha = peca(G.icosa, facetado(0x4fa83a), 0.035, 0.012, 0.02, 0.06, 0.32, 0, g); folha.rotation.z = 0.5;
    } else if (a.modelo === 'espada') {
      var madeira = a.id === 'espada-madeira';
      var lamina = madeira ? facetado(0xc99a62) : (a.brilha ? brilhante(a.cor, 1.5) : M.ferro);
      var enfeite = madeira ? M.madeira : M.ouro;
      caboEnrolado(g, -0.08, 0.08, 0.02);
      peca(G.esfera, enfeite, 0.032, 0.032, 0.032, 0, -0.1, 0, g);
      peca(geoCil10, enfeite, 0.02, 0.18, 0.024, 0, 0.1, 0, g).rotation.z = Math.PI / 2; // guarda
      peca(G.esfera, enfeite, 0.026, 0.026, 0.026, -0.095, 0.1, 0, g); peca(G.esfera, enfeite, 0.026, 0.026, 0.026, 0.095, 0.1, 0, g);
      peca(geoLamina, lamina, 1, 1, 1, 0, 0.115, 0, g);
      if (!madeira && !a.brilha) peca(G.caixa, M.ferroEscuro, 0.008, 0.36, 0.013, 0, 0.33, 0, g); // sulco no meio da lâmina
      if (a.brilha) armaBrilha = { sprite: brilhoSprite(a.cor, 0.16, 0.7, 0, 0.4, g), mat: lamina };
      if (a.distancia) { estilo = 'tiro'; rot = [-1.05, 0, 0.12]; }
    } else if (a.modelo === 'machado') {
      peca(G.cilindro, M.madeira, 0.024, 0.66, 0.024, 0, 0.21, 0, g); caboEnrolado(g, -0.1, 0.05, 0.026);
      var forma = new T.Shape(); forma.moveTo(0, -0.05); forma.lineTo(0.07, -0.088); forma.quadraticCurveTo(0.21, 0, 0.07, 0.088); forma.lineTo(0, 0.05); forma.lineTo(0, -0.05);
      var geoMach = new T.ExtrudeGeometry(forma, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.006, bevelSize: 0.006, bevelSegments: 1 }); geoMach.translate(0, 0, -0.01);
      var cab = new T.Mesh(geoMach, M.ferro); cab.position.set(-0.012, 0.47, 0); cab.rotation.y = Math.PI; g.add(cab); // o fio fica para o lado do golpe
      peca(G.caixa, M.ferroEscuro, 0.055, 0.11, 0.042, 0, 0.47, 0, g);
    } else if (a.modelo === 'arco') {
      estilo = 'arco'; rot = [0.04, 0, 0.12];
      var R = 0.32, ini = Math.PI * 0.56, comp = Math.PI * 0.88, xs = R * Math.cos(ini), hs = R * Math.sin(ini);
      var arcoG = new T.Group(); arcoG.rotation.y = -Math.PI / 2; arcoG.position.z = R; g.add(arcoG); // a curva fica para a frente, a corda do seu lado e o cabo na mão
      var corpo = new T.Mesh(new T.TorusGeometry(R, 0.014, 6, 30, comp), M.madeiraClara); corpo.rotation.z = ini; arcoG.add(corpo);
      peca(G.cilindro, toon(0xf5f0e0), 0.0025, hs * 2, 0.0025, xs, 0, 0, arcoG);
      peca(G.cilindro, M.couro, 0.02, 0.09, 0.02, -R, 0, 0, arcoG);
      flechaNoArco = new T.Group(); flechaNoArco.position.y = 0.035; arcoG.add(flechaNoArco);
      var x0 = xs + 0.02, x1 = -R - 0.25, meio = (x0 + x1) / 2;
      peca(G.cilindro, M.madeiraClara, 0.009, x0 - x1, 0.009, meio, 0, 0, flechaNoArco).rotation.z = Math.PI / 2;
      peca(G4, M.ferro, 0.022, 0.075, 0.008, x1 - 0.025, 0, 0, flechaNoArco).rotation.z = Math.PI / 2;
      peca(G.caixa, toon(0xe8463c), 0.06, 0.03, 0.002, x0 - 0.04, 0.012, 0, flechaNoArco);
      peca(G.caixa, toon(0xe8463c), 0.06, 0.03, 0.002, x0 - 0.04, -0.012, 0, flechaNoArco);
    } else if (a.modelo === 'lanca') {
      estilo = 'estocada'; rot = [-1.02, 0, 0.18];
      peca(G.cilindro, M.madeiraClara, 0.026, 1.0, 0.026, 0, 0.22, 0, g); caboEnrolado(g, -0.08, 0.08, 0.028);
      peca(G.cilindro, M.ouro, 0.03, 0.05, 0.03, 0, 0.72, 0, g);
      peca(geoPontaLanca, M.ferro, 1, 1, 1, 0, 0.74, 0, g);
    } else if (a.modelo === 'varinha') {
      estilo = 'tiro'; rot = [-1.0, 0, 0.12];
      peca(new T.CylinderGeometry(0.8, 1, 1, 10), M.madeira, 0.015, 0.42, 0.015, 0, 0.12, 0, g); caboEnrolado(g, -0.06, 0.05, 0.017);
      peca(G.cilindro, M.ouro, 0.019, 0.03, 0.019, 0, 0.3, 0, g);
      var cristal = brilhante(a.cor, 1.6);
      peca(G.octa, cristal, 0.04, 0.075, 0.04, 0, 0.4, 0, g);
      armaBrilha = { sprite: brilhoSprite(a.cor, 0.28, 0.28, 0, 0.4, g), mat: cristal };
    } else if (a.modelo === 'martelo') {
      peca(G.cilindro, M.madeira, 0.026, 0.62, 0.026, 0, 0.19, 0, g); caboEnrolado(g, -0.1, 0.06, 0.03);
      var cabeca = a.brilha ? texturizar(metal(a.cor, 0.3, 0x4a3000), 'metal', 1, 1, 0.25) : M.ferro;
      peca(geoBloco, cabeca, 0.27, 0.15, 0.15, 0, 0.5, 0, g);
      peca(G.caixa, M.ferroEscuro, 0.285, 0.03, 0.16, 0, 0.45, 0, g);
      peca(G.caixa, M.ferroEscuro, 0.285, 0.03, 0.16, 0, 0.55, 0, g);
      if (a.brilha) { var raio = brilhante(0xfff3a0, 2); peca(G.octa, raio, 0.03, 0.05, 0.03, -0.145, 0.5, 0, g); peca(G.octa, raio, 0.03, 0.05, 0.03, 0.145, 0.5, 0, g); armaBrilha = { sprite: brilhoSprite(0xffe066, 0.45, 0.3, 0, 0.5, g), mat: raio }; }
    }
    fundir(g);
    mao.rotation.set(rot[0], rot[1], retrato && estilo !== 'arco' ? rot[2] * 0.35 : rot[2]);
    mao.userData.estilo = estilo; mao.userData.distancia = !!a.distancia;
  }

  // ---------- Estado ----------
  var estado = 'inicio';
  var jog = null, monstros = [], tiros = [], textos = [], particulas = [], defesas = [], amigos = [];
  var ultimo = 0, relogio = 0, proxMonstro = 0, vermelho = 0, esperaChefe = 3, tremor = 0;
  var camLivre = null, semSpawn = false, rotulos = [], vitrine = []; // câmera solta e rótulos: tela de início e modo de fotos
  var teclas = {}, toques = {}, atacando = false, travado = false, olharMouse = null;
  var W = innerWidth, H = innerHeight, dpr2 = 1;
  $('dica-controles').innerHTML = toqueAparelho
    ? 'Lado esquerdo da tela: arraste para andar.<br>Lado direito: arraste para olhar. Botão vermelho: atacar.'
    : 'W A S D para andar, mouse para olhar (clique na tela).<br>Clique ou Espaço: atacar · E: poção · L: loja · Esc: pausa';

  function ajustar() {
    W = innerWidth; H = innerHeight; dpr2 = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, qual().pr));
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.fov = W < H ? 80 : 70; camera.updateProjectionMatrix();
    camMao.aspect = camera.aspect; camMao.fov = camera.fov; camMao.updateProjectionMatrix();
    escalaPontos.value = H * renderer.getPixelRatio() / (2 * Math.tan(camera.fov * Math.PI / 360));
    // a arma fica sempre dentro da tela, mesmo no celular em pé
    var meiaLargura = 0.6 * Math.tan(camera.fov * Math.PI / 360) * camera.aspect;
    maoBase.x = Math.min(0.3, meiaLargura * 0.62);
    maoBase.y = W < H ? -0.44 : -0.36;
    if (jog && maoRetrato !== null && maoRetrato !== (W < H)) montarArmaNaMao();
    hud.width = Math.round(W * dpr2); hud.height = Math.round(H * dpr2);
  }
  addEventListener('resize', ajustar);

  function mostrar(qual) {
    ['tela-inicio', 'tela-pausa', 'tela-morte', 'tela-loja', 'tela-confirmar'].forEach(function (t) { $(t).hidden = t !== qual; });
    var emJogo = !qual;
    $('hud').hidden = !(emJogo || qual === 'tela-pausa' || qual === 'tela-morte');
    $('btn-atacar').hidden = !emJogo;
    montarBarraConstruir(emJogo);
  }

  // ---------- Barra para colocar defesas ----------
  function defesasNaMochila() { return DEFESAS.filter(function (d) { return (save.defesas[d.id] || 0) > 0; }); }
  function montarBarraConstruir(mostrarBarra) {
    var barra = $('construir'); barra.textContent = '';
    var lista = defesasNaMochila();
    barra.hidden = !mostrarBarra || !lista.length;
    lista.forEach(function (d, i) {
      var b = document.createElement('button'); b.type = 'button';
      b.setAttribute('data-colocar', d.id);
      b.setAttribute('aria-label', 'Colocar ' + d.nome);
      b.innerHTML = '<span class="ic"></span><span class="qt"></span>' + (toqueAparelho ? '' : '<span class="tecla">' + (i + 1) + '</span>');
      b.querySelector('.ic').textContent = d.icone; b.querySelector('.qt').textContent = save.defesas[d.id];
      b.addEventListener('pointerdown', function (e) { e.preventDefault(); e.stopPropagation(); colocar(d.id); });
      barra.appendChild(b);
    });
  }

  function novoJogador() { jog = { x: 0, z: 0, yaw: 0, pitch: 0, vida: vidaMax(), espera: 0, golpe: 0, semDano: 0, passo: 0, andando: false }; }
  function tirarMonstro(m) { scene.remove(m.modelo.grupo); m.modelo.mat.dispose(); }
  function limparCampo() {
    monstros.forEach(tirarMonstro);
    tiros.forEach(function (t) { scene.remove(t.mesh); });
    fxBrilho.limpar(); fxFumaca.limpar(); voando = []; atualizarMoedas(0);
    defesas.forEach(function (d) { scene.remove(d.modelo.grupo); d.modelo.mat.dispose(); });
    if (defesas.length) sombraMudou();
    amigos.forEach(function (a) { scene.remove(a.modelo.grupo); a.modelo.mat.dispose(); });
    monstros = []; tiros = []; textos = []; particulas = []; defesas = []; amigos = [];
    vermelho = 0; $('dano').style.opacity = 0; esperaChefe = 3;
  }

  // ---------- Monstros ----------
  function soltarDeObstaculos(o, r) {
    for (var i = 0; i < obstaculos.length; i++) {
      var b = obstaculos[i], dx = o.x - b.x, dz = o.z - b.z, d = Math.hypot(dx, dz) || 1, min = b.r + r;
      if (d < min) { o.x = b.x + dx / d * min; o.z = b.z + dz / d * min; }
    }
    o.x = Math.max(-LIM, Math.min(LIM, o.x)); o.z = Math.max(-LIM, Math.min(LIM, o.z));
  }
  // chefe = o monstro do fim do nível: 2 níveis acima de você e com muito mais vida
  function criarMonstro(chefe) {
    var n = chefe ? save.nivel + 2 : Math.max(1, save.nivel + Math.floor(Math.random() * 3) - 1); // nível do jogador -1, igual ou +1
    var disp = Math.min(TIPOS.length, 1 + Math.floor((save.nivel - 1) / 2));
    var tipo = TIPOS[Math.max(0, disp - 1 - Math.floor(Math.random() * Math.min(3, disp)))];
    var dourado = !chefe && Math.random() < 0.05;
    var ang = Math.random() * Math.PI * 2, dist = chefe ? 13 + Math.random() * 3 : 10 + Math.random() * 8;
    var pos = { x: jog.x + Math.cos(ang) * dist, z: jog.z + Math.sin(ang) * dist };
    soltarDeObstaculos(pos, tipo.r);
    var m = novoMonstro(tipo, pos.x, pos.z, n, dourado, chefe);
    fumaca(m.x, 0.3, m.z, chefe ? 0x6b21a8 : 0x5b4a72, chefe ? 16 : 7, chefe ? 2.2 : 1.1, 0.5); // fumacinha de onde ele aparece
    return m;
  }
  function novoMonstro(tipo, x, z, n, dourado, chefe) {
    var modelo = fazerMonstro(tipo, dourado, chefe);
    var vida = vidaMonstro(n) * tipo.hp * (dourado ? 2 : 1) * (chefe ? 6 : 1);
    var m = { x: x, z: z, n: n, tipo: tipo, vida: vida, max: vida, dano: danoMonstro(n) * tipo.dano * (chefe ? 1.3 : 1), r: modelo.r,
      vel: tipo.vel * (chefe ? 0.85 : 0.9 + Math.random() * 0.2), espera: 0.5, lento: 0, bate: 0, ataque: 0, dourado: dourado, chefe: !!chefe, fase: Math.random() * 6, nasce: 0, modelo: modelo };
    modelo.grupo.position.set(m.x, 0, m.z); modelo.grupo.scale.setScalar(0.01);
    sombraDoModelo(modelo);
    scene.add(modelo.grupo);
    monstros.push(m);
    return m;
  }
  function monstrosNoComeco() { return Math.min(12, 3 + Math.floor(save.nivel / 2)); }
  function horda() {
    var qtd = 5 + Math.floor(save.nivel / 2);
    for (var i = 0; i < qtd; i++) criarMonstro();
    avisar('Uma horda de ' + qtd + ' monstros está chegando!');
    bip(180, 0.6, 'sawtooth', 0.07);
  }

  function texto(x, y, z, t, cor, tam) { textos.push({ x: x, y: y, z: z, t: t, cor: cor, tam: tam || 20, vida: 1 }); }
  function curto(v) { v = Math.round(v); return v >= 100000 ? Math.round(v / 1000) + 'mil' : String(v); }

  // de = quem bateu de perto (empurra o monstro para trás); gelo = deixa lento
  function ferir(m, dano, gelo, de) {
    if (monstros.indexOf(m) < 0) return;
    m.vida -= dano; m.bate = 0.12;
    texto(m.x, m.modelo.alt + 0.2, m.z, curto(dano), '#ffffff', 22);
    if (gelo) m.lento = 1.5;
    if (de) {
      var dx = m.x - de.x, dz = m.z - de.z, d = Math.hypot(dx, dz) || 1;
      faiscas(m.x - dx / d * m.r * 0.8, m.modelo.alt * 0.55, m.z - dz / d * m.r * 0.8, gelo ? 0x9be7ff : 0xfff1b8, 9, 3.5);
      m.x += dx / d * 0.5; m.z += dz / d * 0.5;
    }
    if (m.vida <= 0) matar(m);
  }

  // ---------- Defesas no campo ----------
  var geoBloco = (function () { // cubo com os cantos chanfrados
    var a = 0.44, s = new T.Shape(); s.moveTo(-a, -a); s.lineTo(a, -a); s.lineTo(a, a); s.lineTo(-a, a); s.lineTo(-a, -a);
    var g = new T.ExtrudeGeometry(s, { depth: 0.88, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2 }); g.translate(0, 0, -0.44);
    var uv = g.attributes.uv; for (var i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) + 0.5, uv.getY(i) + 0.5);
    return g;
  })();
  function fazerDefesa(def) {
    var g = new T.Group(), mat, cabeca = null, alturaTiro = 1.5, d = new T.Object3D(), cor = new T.Color();
    var tabua = texturizar(realceCenario(facetado(0x7a5230)), 'madeira', 2, 1, 0.7);
    function blocos(geo, material, lista) { // vários pedaços iguais num desenho só
      var m = new T.InstancedMesh(geo, material, lista.length);
      lista.forEach(function (b, i) { d.position.set(b[0], b[1], b[2]); d.rotation.set(0, b[6] || 0, b[7] || 0); d.scale.set(b[3], b[4], b[5]); d.updateMatrix(); m.setMatrixAt(i, d.matrix); cor.setHSL(0, 0, b[8] || 1); m.setColorAt(i, cor); });
      g.add(m); return m;
    }
    if (def.id === 'muro-madeira') {
      mat = texturizar(realceCenario(facetado(0xb88352)), 'casca', 1, 2, 0.9);
      var troncos = [], pontas = [];
      for (var i = 0; i < 7; i++) { var x = -1.35 + i * 0.45, h = 1.42 + ((i * 37) % 5) * 0.06; troncos.push([x, h / 2, 0, 0.21, h, 0.21, i, 0, 0.85 + (i % 3) * 0.08]); pontas.push([x, h + 0.16, 0, 0.21, 0.32, 0.21, i, 0, 0.85 + (i % 3) * 0.08]); }
      blocos(new T.CylinderGeometry(1, 1, 1, 10), mat, troncos); blocos(new T.ConeGeometry(1, 1, 10), mat, pontas);
      blocos(G.caixa, tabua, [[0, 0.45, 0.22, 3.05, 0.13, 0.09], [0, 1.05, 0.22, 3.05, 0.13, 0.09], [0, 0.45, -0.22, 3.05, 0.13, 0.09], [0, 1.05, -0.22, 3.05, 0.13, 0.09]]);
    } else if (def.id === 'muro-pedra') {
      mat = texturizar(realceCenario(facetado(0xc2c5c8)), 'pedra', 1, 1, 1.0);
      var pedras = [], bordas = [[-1.5, -1, -0.5, 0, 0.5, 1, 1.5], [-1.5, -1.25, -0.75, -0.25, 0.25, 0.75, 1.25, 1.5]];
      for (var f = 0; f < 4; f++) { var e = bordas[f % 2]; for (var k = 0; k < e.length - 1; k++) { var w = e[k + 1] - e[k] - 0.03, hh = hash2(f * 7 + k, 3); pedras.push([(e[k] + e[k + 1]) / 2, 0.19 + f * 0.37, (hh - 0.5) * 0.04, w, 0.34, 0.6 - hh * 0.05, 0, 0, 0.78 + hh * 0.24]); } }
      [-1.25, 0, 1.25].forEach(function (x, i) { pedras.push([x, 1.66, 0, 0.46, 0.34, 0.6, 0, 0, 0.8 + i * 0.08]); });
      blocos(geoBloco, mat, pedras);
    } else if (def.id === 'torre-flechas') {
      mat = texturizar(realceCenario(facetado(0xb88352)), 'madeira', 1, 3, 0.7); alturaTiro = 2.36;
      var pernas = []; [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (l) { pernas.push([l[0] * 0.42, 0.95, l[1] * 0.42, 0.11, 1.9, 0.11, 0, 0, 0.9]); });
      blocos(G.caixa, mat, pernas);
      peca(G.caixa, tabua, 1.1, 0.12, 1.1, 0, 1.85, 0, g);
      [[0, 2.02, 0.52, 1.1, 0.24, 0.06], [0, 2.02, -0.52, 1.1, 0.24, 0.06], [0.52, 2.02, 0, 0.06, 0.24, 1.1], [-0.52, 2.02, 0, 0.06, 0.24, 1.1]].forEach(function (b) { peca(G.caixa, mat, b[3], b[4], b[5], b[0], b[1], b[2], g); });
      peca(G.caixa, M.madeira, 0.9, 0.08, 0.08, 0, 1.0, 0.43, g).rotation.z = 0.7; peca(G.caixa, M.madeira, 0.9, 0.08, 0.08, 0, 1.0, -0.43, g).rotation.z = -0.7;
      var teto = peca(new T.ConeGeometry(1, 1, 4, 3), texturizar(realceCenario(facetado(0xc0502f)), 'madeira', 4, 2, 0.8), 0.95, 0.6, 0.95, 0, 2.95, 0, g); teto.rotation.y = Math.PI / 4;
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (l) { peca(G.cilindro, M.madeira, 0.035, 0.75, 0.035, l[0] * 0.48, 2.3, l[1] * 0.48, g); });
      cabeca = new T.Group(); cabeca.position.y = 2.34; g.add(cabeca); // a besta gira para o monstro (fica acima da grade)
      peca(G.caixa, M.madeira, 0.1, 0.1, 0.6, 0, 0, 0.1, cabeca);
      var arcoT = new T.Mesh(new T.TorusGeometry(0.28, 0.02, 5, 14, Math.PI * 0.8), M.madeiraClara); arcoT.rotation.set(Math.PI / 2, 0, Math.PI * 0.1); arcoT.position.z = 0.32; cabeca.add(arcoT);
      peca(G4, M.ferro, 0.03, 0.12, 0.01, 0, 0.06, 0.45, cabeca).rotation.x = Math.PI / 2;
    } else if (def.id === 'torre-gelo') {
      mat = texturizar(realceCenario(facetado(0xaec2d2)), 'pedra', 1, 1, 0.9); alturaTiro = 2.0;
      peca(new T.CylinderGeometry(0.42, 0.55, 1, 6), mat, 1, 1.5, 1, 0, 0.75, 0, g);
      peca(new T.CylinderGeometry(0.55, 0.4, 1, 6), mat, 1, 0.22, 1, 0, 1.6, 0, g);
      peca(G.cilindro, toon(0xf4fbff), 0.5, 0.06, 0.5, 0, 1.73, 0, g);
      cabeca = new T.Group(); cabeca.position.y = 2.15; g.add(cabeca);
      var cristal = brilhante(0x7dd3fc, 1.4); peca(G.octa, cristal, 0.26, 0.42, 0.26, 0, 0, 0, cabeca);
      var bs = new T.Sprite(new T.SpriteMaterial({ map: texPonto, color: 0x38a8ff, depthWrite: false, transparent: true, opacity: 0.55, toneMapped: false })); bs.scale.set(1.2, 1.2, 1); cabeca.add(bs);
    } else { // canhão
      mat = texturizar(realceCenario(facetado(0x9a6a3e)), 'madeira', 2, 1, 0.7); alturaTiro = 1.05;
      peca(geoBloco, mat, 0.8, 0.35, 1.0, 0, 0.5, 0, g);
      [[-0.45, 0.35], [0.45, 0.35], [-0.45, -0.35], [0.45, -0.35]].forEach(function (r) { var roda = peca(G.cilindro, M.madeira, 0.3, 0.1, 0.3, r[0], 0.3, r[1], g); roda.rotation.z = Math.PI / 2; var aro = peca(G.cilindro, M.ferroEscuro, 0.31, 0.06, 0.31, r[0] * 1.06, 0.3, r[1], g); aro.rotation.z = Math.PI / 2; });
      cabeca = new T.Group(); cabeca.position.y = 0.9; g.add(cabeca);
      var cano = peca(new T.CylinderGeometry(0.15, 0.21, 1, 16), M.ferroEscuro, 1, 1.15, 1, 0, 0.08, 0.25, cabeca); cano.rotation.x = Math.PI / 2 - 0.18;
      [0.0, 0.4].forEach(function (zf) { peca(G.cilindro, M.ferroEscuro, 0.225 - zf * 0.07, 0.05, 0.225 - zf * 0.07, 0, 0.08 - zf * 0.07, zf - 0.05, cabeca).rotation.x = Math.PI / 2 - 0.18; }); // aros do cano
      peca(G.cilindro, M.ouro, 0.18, 0.06, 0.18, 0, 0.17, 0.78, cabeca).rotation.x = Math.PI / 2 - 0.18;
      peca(G.esfera, M.ferroEscuro, 0.2, 0.2, 0.2, 0, 0, -0.33, cabeca);
    }
    fundir(g);
    g.traverse(function (o) { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    return { grupo: g, mat: mat, cabeca: cabeca, alturaTiro: alturaTiro };
  }
  // avisa a sombra fixa (gráfico médio) que algo mudou no campo
  function sombraMudou() { if (qual().sombra === 'fixa') renderer.shadowMap.needsUpdate = true; }
  function novaDefesa(def, x, z, ang) {
    var forca = forcaNivel(save.nivel), modelo = fazerDefesa(def);
    modelo.grupo.position.set(x, 0, z); modelo.grupo.rotation.y = ang;
    scene.add(modelo.grupo);
    var vida = def.vida * forca, d = { def: def, x: x, z: z, ang: ang, vida: vida, max: vida, dano: (def.dano || 0) * forca, espera: 0.3, modelo: modelo, bate: 0 };
    defesas.push(d); sombraMudou();
    return d;
  }
  function colocar(id) {
    if (estado !== 'jogando' || !(save.defesas[id] > 0)) return;
    if (defesas.length >= 16) { avisar('Já tem defesas demais no campo'); return; }
    var def = acha(DEFESAS, id);
    var x = Math.max(-LIM, Math.min(LIM, jog.x - Math.sin(jog.yaw) * 2.6)), z = Math.max(-LIM, Math.min(LIM, jog.z - Math.cos(jog.yaw) * 2.6));
    var lugar = { x: x, z: z }; for (var t = 0; t < 3; t++) empurrarDefesas(lugar, def.tipo === 'muro' ? 0.4 : 0.7); // não fica em cima de outra defesa
    x = lugar.x; z = lugar.z;
    novaDefesa(def, x, z, def.tipo === 'muro' ? jog.yaw : 0);
    fumaca(x, 0.2, z, 0xc9b38a, 10, 1.2, 0.5);
    save.defesas[id]--; guardar();
    montarBarraConstruir(true);
    bip(400, 0.12, 'square', 0.05);
  }
  // empurra quem anda para fora dos muros e torres; devolve a defesa que encostou
  function empurrarDefesas(o, r) {
    var tocou = null;
    for (var i = 0; i < defesas.length; i++) {
      var d = defesas[i], dx = o.x - d.x, dz = o.z - d.z;
      if (d.def.tipo === 'muro') {
        var c = Math.cos(d.ang), s = Math.sin(d.ang);
        var lx = dx * c - dz * s, lz = dx * s + dz * c;
        var cx = Math.max(-1.5, Math.min(1.5, lx)), cz = Math.max(-0.3, Math.min(0.3, lz));
        var ox = lx - cx, oz = lz - cz, dist = Math.hypot(ox, oz);
        if (dist < r) {
          if (dist > 0.0001) { lx = cx + ox / dist * r; lz = cz + oz / dist * r; }
          else { lz = (lz >= 0 ? 0.3 + r : -0.3 - r); }
          o.x = d.x + lx * c + lz * s; o.z = d.z - lx * s + lz * c; tocou = d;
        }
      } else {
        var dd = Math.hypot(dx, dz) || 1, min = 0.5 + r;
        if (dd < min) { o.x = d.x + dx / dd * min; o.z = d.z + dz / dd * min; tocou = d; }
      }
    }
    return tocou;
  }
  function ferirDefesa(d, dano) {
    d.vida -= dano; d.bate = 0.12;
    if (d.vida <= 0) {
      var i = defesas.indexOf(d); if (i < 0) return;
      defesas.splice(i, 1); scene.remove(d.modelo.grupo); d.modelo.mat.dispose(); sombraMudou();
      estourar(d.x, 0.8, d.z, d.def.cor, 16); bip(160, 0.25, 'sawtooth', 0.06);
    }
  }

  // ---------- Ajudantes ----------
  function criarAjudante(def, i) {
    var modelo = fazerMonstro(def, false);
    var vaga = vagaAmigo(i);
    var a = { def: def, tipo: def, x: vaga.x, z: vaga.z, r: modelo.r, vida: 0, max: 0, espera: 0, bate: 0, ataque: 0,
      fase: Math.random() * 6, morto: 0, modelo: modelo, voa: def.forma === 'dragao', ordem: i };
    a.max = a.vida = def.vida * forcaNivel(save.nivel);
    var anel = new T.Mesh(geoAnel, matAmigo); anel.scale.setScalar(modelo.r * 1.2); anel.position.y = 0.04; anel.userData.semSombra = true; modelo.grupo.add(anel); // anel verde: é amigo
    var luz = new T.Mesh(geoParedeLuz, matParedeVerde); luz.scale.set(modelo.r * 1.2, 0.6, modelo.r * 1.2); luz.userData.semSombra = true; modelo.grupo.add(luz);
    sombraDoModelo(modelo);
    scene.add(modelo.grupo);
    return a;
  }
  // lugar de cada ajudante: dos lados de você, um pouco à frente (para você ver eles)
  function vagaAmigo(i) {
    var lado = (i % 2 ? 1 : -1) * (2 + Math.floor(i / 2) * 1.7), frente = 1 - Math.floor(i / 2) * 0.8;
    var sy = Math.sin(jog.yaw), cy = Math.cos(jog.yaw);
    return { x: jog.x - sy * frente + cy * lado, z: jog.z - cy * frente - sy * lado };
  }
  function sincronizarAjudantes() {
    if (!jog) return;
    save.ajudantes.forEach(function (id) {
      if (amigos.some(function (a) { return a.def.id === id; })) return;
      amigos.push(criarAjudante(acha(AJUDANTES, id), amigos.length));
    });
  }
  function ferirAmigo(a, dano) {
    a.vida -= dano; a.bate = 0.12;
    texto(a.x, a.modelo.alt + 0.2, a.z, '-' + curto(dano), '#ff8a8a', 18);
    if (a.vida <= 0) {
      a.morto = 20; scene.remove(a.modelo.grupo);
      estourar(a.x, 0.6, a.z, a.def.cor, 10);
      avisar(a.def.nome + ' caiu! Volta em 20 segundos');
    }
  }
  function matar(m) {
    var i = monstros.indexOf(m); if (i < 0) return;
    monstros.splice(i, 1); tirarMonstro(m);
    var ganho = moedasMonstro(m.n) * (m.dourado ? 5 : 1) * (m.chefe ? 5 : 1);
    ganho = Math.max(1, Math.round(ganho * (0.85 + Math.random() * 0.3)));
    save.moedas += ganho;
    texto(m.x, m.modelo.alt * 0.6, m.z, '+' + curto(ganho), '#ffd23f', m.dourado || m.chefe ? 32 : 24);
    estourar(m.x, m.modelo.alt * 0.5, m.z, m.dourado ? 0xffd23f : m.tipo.cor, m.chefe ? 30 : 12);
    soltarMoedas(m.x, m.modelo.alt * 0.5, m.z, m.chefe ? 16 : Math.min(9, 2 + Math.floor(Math.log(ganho + 1) / Math.log(3))));
    if (m.chefe) { faiscas(m.x, m.modelo.alt * 0.6, m.z, 0xf0abfc, 40, 7); tremor = Math.max(tremor, 0.12); }
    bip(m.dourado ? 1200 : 880, 0.12, 'triangle', 0.07);
    if (m.chefe) passarNivel();
    else ganharXp(xpMonstro(m.n));
    guardar(); atualizarHud();
  }
  // A barra de experiência enche até o fim; aí vem o chefão. Só passa de nível quando o chefão é derrotado.
  function ganharXp(q) { save.xp = Math.min(xpParaSubir(save.nivel), save.xp + q); }
  function chefeNoCampo() { for (var i = 0; i < monstros.length; i++) if (monstros[i].chefe) return monstros[i]; return null; }
  function chamarChefe() {
    criarMonstro(true);
    var c = chefeNoCampo();
    avisar('O chefão chegou: ' + c.tipo.nome + ' nível ' + c.n + '! Derrote ele para passar de nível');
    bip(110, 0.7, 'sawtooth', 0.08); setTimeout(function () { bip(90, 0.7, 'sawtooth', 0.08); }, 350);
    tremor = Math.max(tremor, 0.1);
  }
  function passarNivel() {
    save.xp = 0; save.nivel++;
    jog.vida = vidaMax();
    amigos.forEach(function (a) { a.max = a.def.vida * forcaNivel(save.nivel); if (!a.morto) a.vida = a.max; });
    avisar('Chefão derrotado! Subiu para o nível ' + save.nivel + '!');
    brilhoSubindo(jog.x, 0.1, jog.z, 0xffd23f, 50, 1.6);
    bip(523, 0.15, 'triangle', 0.08); setTimeout(function () { bip(784, 0.25, 'triangle', 0.08); }, 120); setTimeout(function () { bip(1046, 0.3, 'triangle', 0.08); }, 260);
    if (save.nivel % 5 === 0) setTimeout(function () { if (estado === 'jogando') horda(); }, 2600);
  }

  // ---------- Avisos na tela ----------
  var avisoTimer = 0;
  function avisar(t) { var a = $('aviso'); a.textContent = t; a.hidden = false; clearTimeout(avisoTimer); avisoTimer = setTimeout(function () { a.hidden = true; }, 2200); }

  // ---------- Partida ----------
  function travar() {
    if (toqueAparelho || !canvas.requestPointerLock) return;
    try { var r = canvas.requestPointerLock(); if (r && r.catch) r.catch(function () { /* sem trava */ }); } catch (e) { /* sem trava */ }
  }
  function destravar() { try { if (document.pointerLockElement) document.exitPointerLock(); } catch (e) { /* ok */ } }

  function entrar() { estado = 'jogando'; ultimo = 0; teclas = {}; toques = {}; atacando = false; mostrar(null); atualizarHud(); travar(); }
  function comecar() {
    somLigar(); tirarVitrine();
    novoJogador(); limparCampo(); montarArmaNaMao(); proxMonstro = 0;
    for (var i = 0; i < monstrosNoComeco(); i++) criarMonstro();
    sincronizarAjudantes();
    entrar();
    evento('partida_iniciada');
  }
  function pausar() { if (estado !== 'jogando') return; estado = 'pausa'; atacando = false; mostrar('tela-pausa'); destravar(); }
  function continuar() { if (estado !== 'pausa' && estado !== 'loja') return; entrar(); }
  function morrer() {
    estado = 'morto'; atacando = false; destravar(); vermelho = 0; $('dano').style.opacity = 0;
    var perdeu = Math.floor(save.moedas * 0.25);
    save.moedas -= perdeu; guardar();
    $('morte-texto').textContent = perdeu > 0 ? 'Você deixou cair ' + perdeu + ' moedas. Suas armas e armaduras continuam com você.' : 'Suas armas e armaduras continuam com você.';
    bip(200, 0.5, 'sawtooth', 0.08);
    atualizarHud(); mostrar('tela-morte');
    evento('partida_terminada', { nivel: save.nivel });
  }
  function reviver() { somLigar(); tirarVitrine(); novoJogador(); limparCampo(); montarArmaNaMao(); for (var i = 0; i < monstrosNoComeco(); i++) criarMonstro(); sincronizarAjudantes(); entrar(); }

  function tomarPocao() {
    if (estado !== 'jogando' || save.pocoes <= 0) return;
    if (jog.vida >= vidaMax()) { avisar('Sua vida já está cheia'); return; }
    save.pocoes--; jog.vida = Math.min(vidaMax(), jog.vida + vidaMax() * 0.6);
    avisar('+ vida!'); bip(660, 0.2, 'sine', 0.08);
    guardar(); atualizarHud();
  }

  // ---------- Atacar ----------
  var frente = new T.Vector3();
  function atacar() {
    var a = arma();
    jog.espera = a.espera; jog.golpe = 1;
    var fx = -Math.sin(jog.yaw), fz = -Math.cos(jog.yaw);
    if (a.distancia) {
      // ajuda a mirar: escolhe o monstro mais perto do centro da tela
      var alvo = null, melhor = 0.3;
      monstros.forEach(function (m) {
        var dx = m.x - jog.x, dz = m.z - jog.z, d = Math.hypot(dx, dz);
        if (d > a.alcance || m.nasce < 1) return;
        var ang = Math.acos(Math.max(-1, Math.min(1, (dx * fx + dz * fz) / (d || 1))));
        if (ang < melhor) { melhor = ang; alvo = m; }
      });
      camera.getWorldDirection(frente);
      var origem = new T.Vector3(jog.x, 1.45, jog.z).addScaledVector(frente, 0.6), dir;
      if (alvo) dir = new T.Vector3(alvo.x, alvo.modelo.alt * 0.55, alvo.z).sub(origem).normalize();
      else dir = frente.clone();
      if (a.modelo === 'arco') { origem.x -= Math.cos(jog.yaw) * 0.2; origem.z += Math.sin(jog.yaw) * 0.2; origem.y -= 0.03; } // a flecha sai do arco, à esquerda
      disparar(a.modelo === 'arco' ? 'flecha' : 'magia', a.tiro, origem, dir, 32, danoArma(), a.gelo, 0);
      if (a.modelo !== 'arco') faiscas(origem.x, origem.y, origem.z, a.tiro, 6, 1.5);
      bip(a.gelo ? 1000 : 700, 0.07, 'triangle', 0.04);
    } else jog.acertoPendente = true; // o golpe acerta quando a arma desce (veja animarArma)
  }
  function acertarDePerto() {
    var a = arma(), fx = -Math.sin(jog.yaw), fz = -Math.cos(jog.yaw), acertou = false;
    jog.acertoPendente = false;
    monstros.slice().forEach(function (m) {
      var dx = m.x - jog.x, dz = m.z - jog.z, d = Math.hypot(dx, dz);
      if (d - m.r > a.alcance) return;
      var ang = Math.acos(Math.max(-1, Math.min(1, (dx * fx + dz * fz) / (d || 1))));
      if (ang < 0.75 || d < m.r + 0.3) { ferir(m, danoArma(), a.gelo, jog); acertou = true; }
    });
    bip(acertou ? 320 : 220, 0.06, 'square', 0.04);
  }

  // ---------- Tiros (flechas, magia e balas de canhão) ----------
  var geoHaste = new T.CylinderGeometry(0.014, 0.014, 0.7, 6); geoHaste.rotateX(Math.PI / 2);
  var geoPontaF = new T.ConeGeometry(0.032, 0.11, 6); geoPontaF.rotateX(Math.PI / 2); geoPontaF.translate(0, 0, 0.4);
  var geoPena = new T.BoxGeometry(0.004, 0.06, 0.13); geoPena.translate(0, 0, -0.29);
  var matPena = toon(0xe8463c), matNucleo = {}, spriteMats = {};
  function spriteMat(cor) { if (!spriteMats[cor]) spriteMats[cor] = new T.SpriteMaterial({ map: texPonto, color: cor, depthWrite: false, transparent: true, opacity: 0.85, toneMapped: false }); return spriteMats[cor]; }
  function fazerTiro(tipo, cor) {
    var g = new T.Group();
    if (tipo === 'flecha') { g.add(new T.Mesh(geoHaste, M.madeiraClara)); g.add(new T.Mesh(geoPontaF, M.ferro)); var p1 = new T.Mesh(geoPena, matPena); g.add(p1); var p2 = p1.clone(); p2.rotation.z = Math.PI / 2; g.add(p2); }
    else if (tipo === 'bala') peca(G.esfera, M.ferroEscuro, 0.17, 0.17, 0.17, 0, 0, 0, g);
    else { if (!matNucleo[cor]) matNucleo[cor] = new T.MeshBasicMaterial({ color: cor, toneMapped: false }); peca(G.esfera, matNucleo[cor], 0.07, 0.07, 0.07, 0, 0, 0, g); var s = new T.Sprite(spriteMat(cor)); s.scale.set(0.75, 0.75, 1); g.add(s); }
    return g;
  }
  function disparar(tipo, cor, origem, dir, vel, dano, gelo, area) {
    var g = fazerTiro(tipo, cor); g.position.copy(origem);
    if (tipo === 'flecha') g.lookAt(origem.x + dir.x, origem.y + dir.y, origem.z + dir.z);
    scene.add(g);
    tiros.push({ mesh: g, vel: dir.clone().multiplyScalar(vel), vida: 1.3, dano: dano, gelo: !!gelo, area: area || 0, tipo: tipo, cor: cor });
  }

  // ---------- Cada quadro ----------
  function quadro(t) {
    requestAnimationFrame(quadro);
    if (FOTOS) return; // no modo de fotos, quem avança o tempo é o script do revisor
    var dt = ultimo ? Math.min(0.05, (t - ultimo) / 1000) : 0;
    ultimo = t;
    logica(dt); desenhar();
  }
  function logica(dt) {
    relogio += dt;
    if (estado === 'jogando') passo(dt);
    else if (estado === 'inicio' || estado === 'confirmar') { // a câmera gira devagar em volta dos monstros da vitrine
      var ang = relogio * 0.06;
      camera.position.set(Math.sin(ang) * 6.4, 1.9, Math.cos(ang) * 6.4);
      camera.rotation.set(-0.22, ang, 0);
      ombro.visible = false;
      vitrine.forEach(function (v) { v.modelo.grupo.rotation.y = Math.atan2(camera.position.x - v.x, camera.position.z - v.z); animarMonstro(v, relogio, dt); });
    }
    if (estado !== 'pausa' && estado !== 'loja' && estado !== 'morto') {
      fxBrilho.atualizar(dt); fxFumaca.atualizar(dt); atualizarMoedas(dt);
      grupoNuvens.rotation.y += dt * 0.004; tempoU.value = relogio;
    }
  }
  function desenhar() {
    ceu.position.copy(camera.position);
    centroU.value.set(camera.position.x, camera.position.z);
    if (qual().sombra === 'movel') { camera.getWorldDirection(v3); var hl = Math.hypot(v3.x, v3.z) || 1; posicionarSol(Math.round(camera.position.x + v3.x / hl * 12), Math.round(camera.position.z + v3.z / hl * 12)); }
    renderer.info.reset();
    renderer.render(scene, camera);
    if (ombro.visible) { renderer.autoClear = false; renderer.clearDepth(); renderer.render(cenaMao, camMao); renderer.autoClear = true; }
    desenharHud();
  }

  function animarArma(dt) {
    if (jog.golpe > 0) jog.golpe = Math.max(0, jog.golpe - dt / 0.32);
    var pg = 1 - jog.golpe;
    if (jog.acertoPendente && (pg >= 0.45 || jog.golpe <= 0)) acertarDePerto();
    var est = mao.userData.estilo, rx = 0, ry = 0, rz = 0, px = 0, py = 0, pz = 0, op = 0;
    if (jog.golpe > 0) {
      if (est === 'golpe') {
        var subir = suave(Math.min(1, pg / 0.28)), descer = suave(Math.min(1, Math.max(0, (pg - 0.28) / 0.3))), voltar = suave(Math.max(0, (pg - 0.62) / 0.38)), k = 1 - voltar;
        rx = (0.5 * subir - 1.65 * descer) * k; rz = (-0.5 * subir + 1.2 * descer) * k; ry = 0.3 * descer * k; py = 0.04 * subir * k;
        if (pg > 0.3 && pg < 0.72) op = Math.sin((pg - 0.3) / 0.42 * Math.PI) * 0.85;
        rastro.geometry.setDrawRange(0, Math.floor(Math.min(1, Math.max(0, (pg - 0.28) / 0.3)) * 32) * 6);
      } else if (est === 'estocada') { var e = Math.sin(pg * Math.PI); pz = -0.24 * e; py = 0.02 * e; }
      else { var r = Math.sin(pg * Math.PI); pz = 0.06 * r; rx = 0.16 * r; }
    }
    var andar = jog.andando ? jog.passo : 0;
    ombro.position.set((est === 'arco' ? -maoBase.x * 0.75 : maoBase.x) + px + (jog.andando ? Math.cos(andar * 0.5) * 0.01 : 0), maoBase.y + py + (est === 'arco' ? 0.13 : 0) + (jog.andando ? Math.abs(Math.sin(andar)) * 0.016 : 0), maoBase.z + pz);
    ombro.rotation.set(rx, ry, rz);
    rastro.material.opacity = op;
    if (flechaNoArco) flechaNoArco.visible = jog.espera < arma().espera * 0.5; // a flecha nova aparece logo depois do tiro
    if (armaBrilha) armaBrilha.sprite.material.opacity = 0.32 + Math.sin(relogio * 9) * 0.08 + Math.sin(relogio * 23) * 0.04;
    if (arma().id === 'espada-fogo' && Math.random() < dt * 25) { // faíscas de fogo saindo da espada
      v3.set(0.12 + Math.random() * 0.1, -0.05 + Math.random() * 0.25, -0.75).applyQuaternion(camera.quaternion).add(camera.position);
      corTmp.setHex(0xff8a1f); fxBrilho.emitir(v3.x, v3.y, v3.z, 0, 0.8, 0, 0.4, 0.07, 0.01, corTmp, 1, -1);
    }
  }

  function visualMonstro(mo, dt) {
    // pisca de branco quando apanha; azul quando está lento (gelo)
    if (mo.bate > 0) { mo.bate -= dt; mo.modelo.mat.emissive.setHex(0xffffff); }
    else mo.modelo.mat.emissive.setHex(mo.lento > 0 ? 0x1e4d6b : (mo.chefe ? CHEFE_COR : (mo.dourado ? 0x5a3a00 : (mo.tipo.brilho || 0x000000))));
    if (mo.dourado && Math.random() < dt * 8) brilhoSubindo(mo.x, mo.modelo.alt * 0.4, mo.z, 0xffe27a, 1, mo.r);
    if (mo.chefe && mo.modelo.aura) {
      mo.modelo.aura.rotation.y += dt * 1.6; var pa = mo.r * (1.25 + Math.sin(relogio * 4) * 0.08); mo.modelo.aura.scale.set(pa, 1, pa);
      if (Math.random() < dt * 16) brilhoSubindo(mo.x, 0.1, mo.z, 0xd946ef, 1, mo.r * 1.3);
    }
    if (mo.lento > 0 && Math.random() < dt * 6) brilhoSubindo(mo.x, mo.modelo.alt * 0.5, mo.z, 0xbdefff, 1, mo.r);
  }

  function passo(dt) {
    ombro.visible = !camLivre;
    // Olhar com o teclado (setas)
    if (teclas.ArrowLeft) jog.yaw += 2.2 * dt;
    if (teclas.ArrowRight) jog.yaw -= 2.2 * dt;
    // Andar
    var fw = 0, st = 0;
    if (teclas.KeyW || teclas.ArrowUp) fw += 1;
    if (teclas.KeyS || teclas.ArrowDown) fw -= 1;
    if (teclas.KeyA) st -= 1;
    if (teclas.KeyD) st += 1;
    for (var id in toques) {
      var tq = toques[id];
      if (tq.tipo !== 'mover') continue;
      var dx = tq.x - tq.ox, dy = tq.y - tq.oy, d = Math.hypot(dx, dy);
      if (d > 8) { var f = Math.min(1, d / 60); st = dx / d * f; fw = -dy / d * f; }
    }
    var ml = Math.hypot(fw, st); if (ml > 1) { fw /= ml; st /= ml; }
    var vel = 5, sy = Math.sin(jog.yaw), cy = Math.cos(jog.yaw);
    jog.x += (-sy * fw + cy * st) * vel * dt;
    jog.z += (-cy * fw - sy * st) * vel * dt;
    soltarDeObstaculos(jog, 0.4);
    jog.andando = ml > 0.1;
    if (jog.andando) jog.passo += dt * 9;

    // Recupera vida devagar quando fica um tempo sem levar golpe
    jog.semDano += dt;
    if (jog.semDano > 4) jog.vida = Math.min(vidaMax(), jog.vida + vidaMax() * 0.03 * dt);
    if (vermelho > 0) { vermelho = Math.max(0, vermelho - dt * 2.5); $('dano').style.opacity = vermelho; }

    // Câmera
    if (camLivre) { camera.position.set(camLivre[0], camLivre[1], camLivre[2]); camera.lookAt(camLivre[3], camLivre[4], camLivre[5]); }
    else {
      camera.position.set(jog.x, 1.6 + (jog.andando ? Math.sin(jog.passo) * 0.05 : 0), jog.z);
      camera.rotation.set(jog.pitch, jog.yaw, 0);
      if (tremor > 0) { camera.position.x += (Math.random() - 0.5) * tremor; camera.position.y += (Math.random() - 0.5) * tremor; tremor = Math.max(0, tremor - dt * 0.5); }
    }

    // Arma na mão
    jog.espera -= dt;
    if (atacando && jog.espera <= 0) atacar();
    animarArma(dt);

    // Barra de experiência cheia: chega o chefão do fim do nível
    if (!semSpawn && save.xp >= xpParaSubir(save.nivel) && !chefeNoCampo()) { esperaChefe -= dt; if (esperaChefe <= 0) { chamarChefe(); esperaChefe = 3; } }

    // Novos monstros (quanto maior o nível, mais monstros)
    proxMonstro -= dt;
    if (!semSpawn && proxMonstro <= 0 && monstros.length < maxMonstros()) { criarMonstro(); proxMonstro = Math.max(0.25, 1.2 - save.nivel * 0.04); }

    // Tiros
    for (var k = tiros.length - 1; k >= 0; k--) {
      var tr = tiros[k];
      tr.mesh.position.addScaledVector(tr.vel, dt); tr.vida -= dt;
      var acertou = false, tp = tr.mesh.position;
      if (tr.tipo === 'flecha') { corTmp.setHex(0xfff6dd); fxBrilho.emitir(tp.x, tp.y, tp.z, 0, 0, 0, 0.18, 0.09, 0.01, corTmp, 0.55, 0); }
      if (tr.tipo === 'magia') { corTmp.setHex(tr.cor); fxBrilho.emitir(tp.x, tp.y, tp.z, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.4, 0.3, 0.24, 0.02, corTmp, 0.8, 0); }
      else if (tr.tipo === 'bala' && Math.random() < 0.6) { corTmp.setHex(0x8a8a8a); fxFumaca.emitir(tp.x, tp.y, tp.z, 0, 0.3, 0, 0.45, 0.15, 0.4, corTmp, 0.45, 0); }
      for (var j = 0; j < monstros.length; j++) {
        var mm = monstros[j], cy2 = mm.modelo.alt * 0.55;
        if (Math.hypot(mm.x - tp.x, mm.z - tp.z) < mm.r + 0.35 && Math.abs(tp.y - cy2) < mm.modelo.alt * 0.6 + 0.3) {
          if (tr.area) { // canhão: explode e acerta todos em volta
            var px = tp.x, pz = tp.z;
            monstros.slice().forEach(function (m3) { if (Math.hypot(m3.x - px, m3.z - pz) < tr.area + m3.r) ferir(m3, tr.dano, false, null); });
            faiscas(px, tp.y, pz, 0xffa53c, 26, 6); fumaca(px, tp.y, pz, 0x6b6b6b, 10, 1.6, 0.8);
            corTmp.setHex(0xff8a1e); for (var cl = 0; cl < 4; cl++) fxBrilho.emitir(px + (Math.random() - 0.5) * 0.6, tp.y + (Math.random() - 0.5) * 0.4, pz + (Math.random() - 0.5) * 0.6, 0, 0.6, 0, 0.32, 0.9, 2.8, corTmp, 1, 0); // clarão
            bip(90, 0.25, 'sawtooth', 0.07);
            if (Math.hypot(px - jog.x, pz - jog.z) < 10) tremor = Math.max(tremor, 0.05);
          } else {
            faiscas(tp.x, tp.y, tp.z, tr.tipo === 'flecha' ? 0xfff1c4 : tr.cor, tr.tipo === 'flecha' ? 6 : 12, tr.tipo === 'flecha' ? 3 : 4.5);
            if (tr.gelo) fumaca(tp.x, tp.y, tp.z, 0xc8f0ff, 5, 0.6, 0.2);
            ferir(mm, tr.dano, tr.gelo, null);
          }
          acertou = true; break;
        }
      }
      if (acertou || tr.vida <= 0 || tp.y < 0) { scene.remove(tr.mesh); tiros.splice(k, 1); }
    }

    // Você não atravessa os muros e torres
    empurrarDefesas(jog, 0.4);

    // Torres atiram sozinhas no monstro mais perto
    defesas.forEach(function (d) {
      if (d.bate > 0) { d.bate -= dt; d.modelo.mat.emissive.setHex(0x661111); } else d.modelo.mat.emissive.setHex(0x000000);
      if (d.def.id === 'torre-gelo') d.modelo.cabeca.position.y = 2.15 + Math.sin(relogio * 2 + d.x) * 0.08; // o cristal flutua
      if (d.def.tipo !== 'torre') return;
      d.espera -= dt;
      var alvo = null, bd = d.def.alcance;
      monstros.forEach(function (m) { if (m.nasce < 1) return; var dd = Math.hypot(m.x - d.x, m.z - d.z); if (dd < bd) { bd = dd; alvo = m; } });
      if (!alvo) return;
      d.modelo.cabeca.rotation.y = Math.atan2(alvo.x - d.x, alvo.z - d.z);
      if (d.espera > 0) return;
      d.espera = d.def.espera;
      var origem = new T.Vector3(d.x, d.modelo.alturaTiro, d.z);
      var dir = new T.Vector3(alvo.x, alvo.modelo.alt * 0.55, alvo.z).sub(origem).normalize();
      disparar(d.def.area ? 'bala' : (d.def.gelo ? 'magia' : 'flecha'), d.def.tiro, origem, dir, 26, d.dano, d.def.gelo, d.def.area);
      if (d.def.area) { fumaca(origem.x + dir.x * 0.9, origem.y, origem.z + dir.z * 0.9, 0xd8d8d8, 6, 0.8, 0.4); faiscas(origem.x + dir.x * 0.9, origem.y, origem.z + dir.z * 0.9, 0xffb347, 8, 2); }
    });

    // Ajudantes seguem você e atacam os monstros
    amigos.forEach(function (a) {
      if (a.morto > 0) {
        a.morto -= dt;
        if (a.morto <= 0) { a.morto = 0; a.vida = a.max; var vg = vagaAmigo(a.ordem); a.x = vg.x; a.z = vg.z; scene.add(a.modelo.grupo); avisar(a.def.nome + ' voltou!'); }
        return;
      }
      if (a.parado) { a.velAtual = a.desfile ? a.def.vel * 0.6 : 0; a.modelo.grupo.position.set(a.x, 0, a.z); animarMonstro(a, relogio, dt); return; }
      var alvo = null, bd = 1e9;
      monstros.forEach(function (m) {
        if (m.nasce < 1 || Math.hypot(m.x - jog.x, m.z - jog.z) > 15) return;
        var dd = Math.hypot(m.x - a.x, m.z - a.z); if (dd < bd) { bd = dd; alvo = m; }
      });
      var tx, tz, parar;
      if (alvo) { tx = alvo.x; tz = alvo.z; parar = a.def.alcance + alvo.r - 0.2; }
      else { var vaga = vagaAmigo(a.ordem); tx = vaga.x; tz = vaga.z; parar = 0.4; } // fica do seu lado
      if (Math.hypot(jog.x - a.x, jog.z - a.z) > 25) { var vl = vagaAmigo(a.ordem); a.x = vl.x; a.z = vl.z; }
      var ax = tx - a.x, az = tz - a.z, ad = Math.hypot(ax, az) || 1;
      var andou = ad > parar;
      var vAlvoA = andou ? Math.min(a.def.vel, (ad - parar) / Math.max(dt, 0.001)) : 0;
      a.velAtual = (a.velAtual || 0) + Math.max(-dt * 10, Math.min(dt * 8, vAlvoA - (a.velAtual || 0)));
      if (andou) { var passoA = Math.min(ad - parar, a.velAtual * dt); a.x += ax / ad * passoA; a.z += az / ad * passoA; }
      if (!a.voa) { soltarDeObstaculos(a, a.r * 0.8); empurrarDefesas(a, a.r * 0.8); }
      var px = a.x - jog.x, pz = a.z - jog.z, pd = Math.hypot(px, pz) || 1, longe = a.r + 0.9; // não entra na sua frente colado na câmera
      if (pd < longe) { a.x = jog.x + px / pd * longe; a.z = jog.z + pz / pd * longe; }
      a.modelo.grupo.position.set(a.x, 0, a.z);
      if (alvo || andou) { var angA = Math.atan2(alvo ? alvo.x - a.x : ax, alvo ? alvo.z - a.z : az); a.ang = virarPara(a.ang === undefined ? angA : a.ang, angA, dt * 6); a.modelo.grupo.rotation.y = a.ang; }
      a.vida = Math.min(a.max, a.vida + a.max * 0.02 * dt);
      if (a.ataque > 0) a.ataque -= dt;
      if (a.bate > 0) { a.bate -= dt; a.modelo.mat.emissive.setHex(0xff0000); } else a.modelo.mat.emissive.setHex(0x000000);
      animarMonstro(a, relogio, dt);
      a.espera -= dt;
      if (alvo && bd <= a.def.alcance + alvo.r && a.espera <= 0) {
        a.espera = a.def.espera; a.ataque = 0.25;
        var danoA = a.def.dano * forcaNivel(save.nivel);
        if (a.def.distancia) {
          var o2 = new T.Vector3(a.x, a.modelo.alt * 0.7, a.z);
          var d2 = new T.Vector3(alvo.x, alvo.modelo.alt * 0.55, alvo.z).sub(o2).normalize();
          disparar('magia', a.def.tiro, o2, d2, 24, danoA, false, 0);
        } else ferir(alvo, danoA, false, a);
      }
    });

    // Monstros andam até você (ou até o ajudante mais perto) e atacam
    for (var q = 0; q < monstros.length; q++) {
      var mo = monstros[q];
      if (mo.nasce < 1) { mo.nasce = Math.min(1, mo.nasce + dt * 2); mo.modelo.grupo.scale.setScalar(Math.max(0.01, suave(mo.nasce) * (1 + Math.sin(mo.nasce * Math.PI) * 0.18))); }
      visualMonstro(mo, dt);
      if (mo.parado) { if (mo.ataque > 0) mo.ataque -= dt; mo.velAtual = mo.desfile ? mo.vel : 0; /* no desfile das fotos ele anda no lugar, como numa esteira */ mo.modelo.grupo.position.set(mo.x, 0, mo.z); if (mo.olhar !== undefined) mo.modelo.grupo.rotation.y = mo.olhar; animarMonstro(mo, relogio, dt); continue; }
      var voa = mo.tipo.forma === 'fantasma' || mo.tipo.forma === 'morcego' || mo.tipo.forma === 'dragao';
      var distJog = Math.hypot(jog.x - mo.x, jog.z - mo.z) || 1;
      var alvoM = null, alvoX = jog.x, alvoZ = jog.z, dist = distJog, alcanceAlvo = mo.r + 1.0;
      for (var a2 = 0; a2 < amigos.length; a2++) {
        var am = amigos[a2]; if (am.morto) continue;
        var da = Math.hypot(am.x - mo.x, am.z - mo.z);
        if (da < dist) { dist = da; alvoM = am; alvoX = am.x; alvoZ = am.z; alcanceAlvo = mo.r + am.r + 0.6; }
      }
      var ex = alvoX - mo.x, ez = alvoZ - mo.z; dist = dist || 1;
      var vAlvo = dist > alcanceAlvo - 0.3 ? mo.vel * (mo.lento > 0 ? 0.45 : 1) : 0;
      mo.velAtual = (mo.velAtual || 0) + Math.max(-dt * 8, Math.min(dt * 5, vAlvo - (mo.velAtual || 0))); // acelera e freia aos poucos
      var v = mo.velAtual;
      if (mo.lento > 0) mo.lento -= dt;
      if (mo.ataque > 0) mo.ataque -= dt;
      if (dist > alcanceAlvo - 0.3 && v > 0.01) { mo.x += ex / dist * v * dt; mo.z += ez / dist * v * dt; }
      for (var o = q + 1; o < monstros.length; o++) {
        var ou = monstros[o], sx = ou.x - mo.x, sz = ou.z - mo.z, sd = Math.hypot(sx, sz) || 1, min = mo.r + ou.r;
        if (sd < min) { var emp = (min - sd) / 2; mo.x -= sx / sd * emp; mo.z -= sz / sd * emp; ou.x += sx / sd * emp; ou.z += sz / sd * emp; }
      }
      var tocou = null;
      if (!voa) { soltarDeObstaculos(mo, mo.r * 0.8); tocou = empurrarDefesas(mo, mo.r * 0.8); } // os que voam passam por cima dos muros
      mo.modelo.grupo.position.set(mo.x, 0, mo.z);
      mo.ang = virarPara(mo.ang === undefined ? Math.atan2(ex, ez) : mo.ang, Math.atan2(ex, ez), dt * (voa ? 3 : 5)); // vira aos poucos
      mo.modelo.grupo.rotation.y = mo.ang;
      animarMonstro(mo, relogio, dt);
      mo.espera -= dt;
      if (mo.espera <= 0 && mo.nasce >= 1) {
        if (dist < alcanceAlvo) {
          mo.espera = 1.2; mo.ataque = 0.25;
          if (alvoM) ferirAmigo(alvoM, mo.dano);
          else {
            var dano = mo.dano * (1 - armadura().defesa);
            jog.vida -= dano; jog.semDano = 0; vermelho = Math.min(0.9, vermelho + 0.55); $('dano').style.opacity = vermelho; tremor = Math.min(0.12, tremor + 0.05);
            bip(140, 0.1, 'sawtooth', 0.05);
            if (jog.vida <= 0) { jog.vida = 0; atualizarHud(); morrer(); return; }
          }
        } else if (tocou) { mo.espera = 1.2; mo.ataque = 0.25; ferirDefesa(tocou, mo.dano); } // bate no muro que está no caminho
      }
      // monstro que ficou muito longe some (e outro aparece mais perto)
      if (distJog > 48 && !mo.chefe) { tirarMonstro(mo); monstros.splice(q, 1); q--; }
    }

    for (var s2 = textos.length - 1; s2 >= 0; s2--) { textos[s2].y += 1.2 * dt; textos[s2].vida -= dt; if (textos[s2].vida <= 0) textos.splice(s2, 1); }
    atualizarVida();
  }

  // ---------- Desenho por cima (vida dos monstros, números, radar, mira) ----------
  var v3 = new T.Vector3();
  function naTela(x, y, z) {
    v3.set(x, y, z).project(camera);
    if (v3.z > 1 || v3.z < -1) return null;
    return { x: (v3.x + 1) / 2 * W, y: (1 - v3.y) / 2 * H };
  }
  function desenharRotulos() {
    rotulos.forEach(function (r) {
      var pt = naTela(r[0], r[1], r[2]); if (!pt) return;
      h2.font = '700 14px system-ui, sans-serif'; var w = h2.measureText(r[3]).width + 14;
      h2.fillStyle = 'rgba(0,0,0,.6)'; h2.fillRect(pt.x - w / 2, pt.y - 11, w, 22); h2.fillStyle = '#fff'; h2.fillText(r[3], pt.x, pt.y + 5);
    });
  }
  function desenharHud() {
    h2.setTransform(dpr2, 0, 0, dpr2, 0, 0);
    h2.clearRect(0, 0, W, H);
    h2.lineJoin = 'round'; h2.textAlign = 'center';
    if (camLivre || estado === 'inicio') { desenharRotulos(); return; }
    if (!jog || (estado !== 'jogando' && estado !== 'pausa' && estado !== 'morto')) return;
    var fx = -Math.sin(jog.yaw), fz = -Math.cos(jog.yaw);
    // barras de vida dos monstros (perto e na frente)
    var lista = monstros.map(function (m) { return { m: m, d: Math.hypot(m.x - jog.x, m.z - jog.z) }; })
      .filter(function (o) { return o.d < 28 && ((o.m.x - jog.x) * fx + (o.m.z - jog.z) * fz) > 0; })
      .sort(function (a, b) { return b.d - a.d; });
    lista.forEach(function (o) {
      var m = o.m, pt = naTela(m.x, m.modelo.alt + 0.35, m.z); if (!pt) return;
      var esc = Math.max(0.55, Math.min(1.3, 8 / o.d)) * (m.chefe ? 1.4 : 1), bw = 54 * esc, bh = 7 * esc;
      h2.fillStyle = 'rgba(0,0,0,.6)'; h2.fillRect(pt.x - bw / 2, pt.y, bw, bh);
      h2.fillStyle = m.chefe ? '#d946ef' : (m.n > save.nivel ? '#f97316' : (m.n < save.nivel ? '#84cc16' : '#ef4444'));
      h2.fillRect(pt.x - bw / 2, pt.y, bw * Math.max(0, m.vida / m.max), bh);
      var rot = (m.chefe ? 'CHEFÃO ' : '') + 'Nv ' + m.n;
      h2.font = '800 ' + Math.round(13 * esc) + 'px system-ui, sans-serif';
      h2.strokeStyle = '#000'; h2.lineWidth = 3; h2.strokeText(rot, pt.x, pt.y - 3);
      h2.fillStyle = m.chefe ? '#f0abfc' : (m.dourado ? '#ffd23f' : '#fff'); h2.fillText(rot, pt.x, pt.y - 3);
    });
    // vida dos ajudantes (verde, com coração) e das defesas machucadas
    function barra(x, y, z, frac, cor, rotulo) {
      var d = Math.hypot(x - jog.x, z - jog.z);
      if (d > 28 || ((x - jog.x) * fx + (z - jog.z) * fz) <= 0) return;
      var pt = naTela(x, y, z); if (!pt) return;
      var esc = Math.max(0.55, Math.min(1.2, 8 / d)), bw = 48 * esc, bh = 6 * esc;
      h2.fillStyle = 'rgba(0,0,0,.6)'; h2.fillRect(pt.x - bw / 2, pt.y, bw, bh);
      h2.fillStyle = cor; h2.fillRect(pt.x - bw / 2, pt.y, bw * Math.max(0, frac), bh);
      if (rotulo) {
        h2.font = '800 ' + Math.round(14 * esc) + 'px system-ui, sans-serif';
        h2.strokeStyle = '#000'; h2.lineWidth = 3; h2.strokeText(rotulo, pt.x, pt.y - 3);
        h2.fillStyle = '#7dffa0'; h2.fillText(rotulo, pt.x, pt.y - 3);
      }
    }
    amigos.forEach(function (a) { if (!a.morto) barra(a.x, a.modelo.alt + 0.35, a.z, a.vida / a.max, '#22c55e', '♥'); });
    defesas.forEach(function (d) { if (d.vida < d.max) barra(d.x, 2.2, d.z, d.vida / d.max, '#38bdf8', ''); });
    // números que sobem
    textos.forEach(function (t) {
      if (((t.x - jog.x) * fx + (t.z - jog.z) * fz) <= 0) return;
      var pt = naTela(t.x, t.y, t.z); if (!pt) return;
      h2.globalAlpha = Math.min(1, t.vida * 2); h2.font = '800 ' + t.tam + 'px system-ui, sans-serif';
      h2.strokeStyle = '#000'; h2.lineWidth = 4; h2.strokeText(t.t, pt.x, pt.y); h2.fillStyle = t.cor; h2.fillText(t.t, pt.x, pt.y);
    });
    h2.globalAlpha = 1;
    // mira
    var cx = W / 2, cy = H / 2;
    h2.strokeStyle = 'rgba(255,255,255,.9)'; h2.lineWidth = 2;
    h2.beginPath(); h2.moveTo(cx - 10, cy); h2.lineTo(cx - 4, cy); h2.moveTo(cx + 4, cy); h2.lineTo(cx + 10, cy);
    h2.moveTo(cx, cy - 10); h2.lineTo(cx, cy - 4); h2.moveTo(cx, cy + 4); h2.lineTo(cx, cy + 10); h2.stroke();
    // radar: mostra os monstros em volta (você no meio, olhando para cima)
    var R = 50, rx = 12 + R, ry = toqueAparelho ? 112 + R : H - 12 - R;
    h2.fillStyle = 'rgba(0,0,0,.45)'; h2.beginPath(); h2.arc(rx, ry, R, 0, 7); h2.fill();
    h2.strokeStyle = 'rgba(255,255,255,.7)'; h2.lineWidth = 2; h2.stroke();
    var sy = Math.sin(jog.yaw), cyw = Math.cos(jog.yaw), ALC = 30;
    function ponto(x, z, cor, tam, quadrado) {
      var dx = x - jog.x, dz = z - jog.z;
      var lx = dx * cyw - dz * sy, lz = dx * sy + dz * cyw; // em relação para onde você olha
      var d = Math.hypot(lx, lz); if (d > ALC) { lx *= ALC / d; lz *= ALC / d; tam *= 0.7; }
      var px = rx + lx / ALC * (R - 5), pz = ry + lz / ALC * (R - 5);
      h2.fillStyle = cor;
      if (quadrado) h2.fillRect(px - tam, pz - tam, tam * 2, tam * 2);
      else { h2.beginPath(); h2.arc(px, pz, tam, 0, 7); h2.fill(); }
    }
    defesas.forEach(function (d) { ponto(d.x, d.z, '#93c5fd', 2.5, true); });
    amigos.forEach(function (a) { if (!a.morto) ponto(a.x, a.z, '#4ade80', 3.5); });
    monstros.forEach(function (m) { ponto(m.x, m.z, m.chefe ? '#d946ef' : (m.dourado ? '#ffd23f' : (m.n > save.nivel ? '#f97316' : '#ff4d4d')), m.chefe ? 6 : 3.5); });
    // barra grande do chefão no alto da tela
    var chefe = chefeNoCampo();
    if (chefe) {
      var cw = Math.min(420, W * 0.6), cxb = W / 2 - cw / 2, cyb = toqueAparelho ? 96 : 74;
      h2.font = '800 15px system-ui, sans-serif'; h2.lineWidth = 3; h2.strokeStyle = '#000';
      var tit = 'CHEFÃO: ' + chefe.tipo.nome + ' · nível ' + chefe.n;
      h2.strokeText(tit, W / 2, cyb - 5); h2.fillStyle = '#f0abfc'; h2.fillText(tit, W / 2, cyb - 5);
      h2.fillStyle = 'rgba(0,0,0,.6)'; h2.fillRect(cxb, cyb, cw, 12);
      h2.fillStyle = '#d946ef'; h2.fillRect(cxb, cyb, cw * Math.max(0, chefe.vida / chefe.max), 12);
      h2.strokeStyle = '#fff'; h2.lineWidth = 2; h2.strokeRect(cxb, cyb, cw, 12);
    }
    h2.fillStyle = '#fff'; h2.beginPath(); h2.moveTo(rx, ry - 7); h2.lineTo(rx - 5, ry + 5); h2.lineTo(rx + 5, ry + 5); h2.closePath(); h2.fill();
    // controles de toque
    for (var id in toques) {
      var tq = toques[id]; if (tq.tipo !== 'mover') continue;
      h2.globalAlpha = 0.3; h2.fillStyle = '#fff'; h2.beginPath(); h2.arc(tq.ox, tq.oy, 60, 0, 7); h2.fill();
      var dx = tq.x - tq.ox, dy = tq.y - tq.oy, d = Math.hypot(dx, dy), f = d > 60 ? 60 / d : 1;
      h2.globalAlpha = 0.65; h2.beginPath(); h2.arc(tq.ox + dx * f, tq.oy + dy * f, 26, 0, 7); h2.fill();
      h2.globalAlpha = 1;
    }
    if (estado === 'jogando' && !toqueAparelho && !travado && !FOTOS) {
      h2.font = '700 16px system-ui, sans-serif';
      var msg = 'Clique na tela para olhar com o mouse', w = h2.measureText(msg).width + 24;
      h2.fillStyle = 'rgba(0,0,0,.55)'; h2.fillRect(cx - w / 2, H - 44, w, 30); h2.fillStyle = '#fff'; h2.fillText(msg, cx, H - 23);
    }
  }

  // ---------- Barra de cima ----------
  function atualizarVida() {
    var mx = vidaMax();
    $('vida-cheia').style.width = Math.max(0, Math.min(100, jog.vida / mx * 100)) + '%';
    $('vida-texto').textContent = curto(Math.ceil(jog.vida)) + ' / ' + curto(mx);
  }
  function atualizarHud() {
    if (jog) atualizarVida();
    $('xp-cheia').style.width = Math.min(100, save.xp / xpParaSubir(save.nivel) * 100) + '%';
    $('nivel-texto').textContent = 'Nível ' + save.nivel + (save.xp >= xpParaSubir(save.nivel) ? ' · derrote o chefão!' : '');
    $('moedas-texto').textContent = curto(save.moedas);
    $('loja-moedas').textContent = curto(save.moedas);
    $('pocoes-texto').textContent = save.pocoes;
    $('btn-som').textContent = 'Som: ' + (save.som ? 'ligado' : 'desligado');
    $('btn-graficos').textContent = 'Gráficos: ' + ({ alto: 'alto', medio: 'médio', baixo: 'baixo' })[save.graficos];
  }

  // ---------- Loja ----------
  var abaLoja = 'armas', vindoDe = 'jogando';
  function precoPocao() { return Math.max(20, Math.round(vidaMax() * 0.4)); }
  function abrirLoja() {
    if (estado !== 'jogando' && estado !== 'morto') return;
    vindoDe = estado; estado = 'loja'; atacando = false; destravar(); mostrar('tela-loja'); montarLoja();
  }
  function fecharLoja() {
    montarArmaNaMao();
    if (vindoDe === 'morto') { estado = 'morto'; mostrar('tela-morte'); return; }
    sincronizarAjudantes();
    continuar();
  }
  function trocarAba(qual) {
    abaLoja = qual;
    ['armas', 'armaduras', 'defesas', 'ajudantes', 'pocoes'].forEach(function (a) { $('aba-' + a).classList.toggle('ativa', a === qual); });
    montarLoja();
  }
  function montarLoja() {
    var lista = $('loja-lista'); lista.textContent = '';
    atualizarHud();
    if (abaLoja === 'pocoes') {
      lista.appendChild(itemHtml('🧪', 'Poção de vida', 'Recupera boa parte da vida. Você tem ' + save.pocoes + '.', 'Comprar ' + curto(precoPocao()), 'pocao', true, save.moedas >= precoPocao(), false));
      return;
    }
    if (abaLoja === 'defesas') {
      var dicaD = document.createElement('p'); dicaD.className = 'loja-dica';
      dicaD.textContent = 'Compre e depois coloque no campo pelos botões do lado direito da tela' + (toqueAparelho ? '.' : ' (ou teclas 1 a 5).') + ' Os monstros que voam passam por cima dos muros. Se você for derrotado, as defesas do campo somem.';
      lista.appendChild(dicaD);
      DEFESAS.forEach(function (d) {
        var tem = save.defesas[d.id] || 0, desc;
        if (d.tipo === 'muro') desc = 'Segura os monstros que andam · vida ' + d.vida;
        else desc = 'Atira sozinha · dano ' + d.dano + (d.gelo ? ' · deixa lento' : '') + (d.area ? ' · explode e acerta vários' : '');
        desc += ' · você tem ' + tem;
        lista.appendChild(itemHtml(d.icone, d.nome, desc, curto(d.preco) + ' moedas', 'defesa-' + d.id, true, save.moedas >= d.preco, false));
      });
      return;
    }
    if (abaLoja === 'ajudantes') {
      var dicaA = document.createElement('p'); dicaA.className = 'loja-dica';
      dicaA.textContent = 'Ajudantes ficam com você para sempre, seguem você e atacam os monstros. Se caírem, voltam depois de 20 segundos.';
      lista.appendChild(dicaA);
      AJUDANTES.forEach(function (a) {
        var tem = save.ajudantes.indexOf(a.id) >= 0;
        var desc = 'Vida ' + a.vida + ' · dano ' + a.dano + (a.distancia ? ' · cospe fogo de longe' : '');
        lista.appendChild(itemHtml(a.icone, a.nome, desc, tem ? 'Com você' : curto(a.preco) + ' moedas', 'ajudante-' + a.id, !tem, !tem && save.moedas >= a.preco, tem));
      });
      return;
    }
    var itens = abaLoja === 'armas' ? ARMAS : ARMADURAS;
    var donos = abaLoja === 'armas' ? save.armas : save.armaduras;
    var atual = abaLoja === 'armas' ? save.arma : save.armadura;
    itens.forEach(function (it) {
      var tem = donos.indexOf(it.id) >= 0, desc;
      if (abaLoja === 'armas') desc = 'Dano ' + it.dano + ' · ' + (it.distancia ? 'atira de longe' : 'golpe de perto') + (it.gelo ? ' · deixa lento' : '') + ' · ' + (1 / it.espera).toFixed(1) + ' golpes/s';
      else desc = 'Segura ' + Math.round(it.defesa * 100) + '% do dano · +' + it.vida + ' de vida';
      var rotulo = it.id === atual ? 'Usando' : (tem ? 'Usar' : curto(it.preco) + ' moedas');
      var pode = it.id !== atual && (tem || save.moedas >= it.preco);
      lista.appendChild(itemHtml(it.icone, it.nome, desc, rotulo, (abaLoja === 'armas' ? 'arma-' : 'armadura-') + it.id, !tem, pode, it.id === atual));
    });
  }
  function itemHtml(icone, nome, desc, rotulo, chave, comprar, pode, equipado) {
    var d = document.createElement('div'); d.className = 'item' + (equipado ? ' equipado' : '');
    var i = document.createElement('div'); i.className = 'item-icone'; i.textContent = icone;
    var info = document.createElement('div'); info.className = 'item-info';
    var n = document.createElement('div'); n.className = 'item-nome'; n.textContent = nome;
    var s = document.createElement('div'); s.className = 'item-desc'; s.textContent = desc;
    info.appendChild(n); info.appendChild(s);
    var b = document.createElement('button'); b.type = 'button'; b.textContent = rotulo; b.disabled = !pode;
    if (comprar) b.className = 'comprar';
    b.setAttribute('data-loja', chave);
    b.onclick = function () { usarItem(chave); };
    d.appendChild(i); d.appendChild(info); d.appendChild(b);
    return d;
  }
  function usarItem(chave) {
    if (chave === 'pocao') {
      if (save.moedas < precoPocao()) return;
      save.moedas -= precoPocao(); save.pocoes++; bip(660, 0.12, 'triangle', 0.07);
    } else if (chave.indexOf('defesa-') === 0) {
      var def = acha(DEFESAS, chave.slice(7));
      if (save.moedas < def.preco) return;
      save.moedas -= def.preco; save.defesas[def.id] = (save.defesas[def.id] || 0) + 1;
      bip(880, 0.1, 'triangle', 0.07);
    } else if (chave.indexOf('ajudante-') === 0) {
      var aj = acha(AJUDANTES, chave.slice(9));
      if (save.ajudantes.indexOf(aj.id) >= 0 || save.moedas < aj.preco) return;
      save.moedas -= aj.preco; save.ajudantes.push(aj.id);
      bip(880, 0.1, 'triangle', 0.07); setTimeout(function () { bip(1320, 0.18, 'triangle', 0.07); }, 90);
    } else {
      var ehArma = chave.indexOf('armadura-') !== 0;
      var id = chave.replace(/^arma(dura)?-/, '');
      var lista = ehArma ? ARMAS : ARMADURAS, donos = ehArma ? save.armas : save.armaduras, it = acha(lista, id);
      if (donos.indexOf(id) < 0) {
        if (save.moedas < it.preco) return;
        save.moedas -= it.preco; donos.push(id);
        bip(880, 0.1, 'triangle', 0.07); setTimeout(function () { bip(1320, 0.18, 'triangle', 0.07); }, 90);
      }
      var antes = vidaMax();
      if (ehArma) save.arma = id; else save.armadura = id;
      if (jog) jog.vida = Math.max(1, Math.min(vidaMax(), jog.vida + (vidaMax() - antes)));
    }
    guardar(); montarLoja();
  }

  // ---------- Controles ----------
  addEventListener('keydown', function (e) {
    teclas[e.code] = true;
    if (e.code === 'KeyP') { if (estado === 'jogando') pausar(); else if (estado === 'pausa') continuar(); }
    if (e.code === 'KeyL' && estado === 'jogando') abrirLoja();
    if (e.code === 'KeyE' || e.code === 'KeyQ') tomarPocao();
    var num = /^Digit([1-5])$/.exec(e.code);
    if (num && estado === 'jogando') { var lista = defesasNaMochila(), d = lista[+num[1] - 1]; if (d) colocar(d.id); }
    if (e.code === 'Space') { if (estado === 'jogando') atacando = true; e.preventDefault(); }
    if (e.code.indexOf('Arrow') === 0) e.preventDefault();
  });
  addEventListener('keyup', function (e) { teclas[e.code] = false; if (e.code === 'Space') atacando = false; });
  addEventListener('blur', function () { teclas = {}; toques = {}; atacando = false; });

  document.addEventListener('pointerlockchange', function () {
    var agora = document.pointerLockElement === canvas;
    if (!agora && travado && estado === 'jogando') pausar(); // apertou Esc
    travado = agora;
  });
  function olhar(dx, dy, k) { jog.yaw -= dx * k; jog.pitch = Math.max(-1.2, Math.min(1.2, jog.pitch - dy * k)); }
  document.addEventListener('mousemove', function (e) {
    if (estado !== 'jogando') return;
    if (travado) olhar(e.movementX || 0, e.movementY || 0, 0.0025);
    else if (olharMouse) { olhar(e.clientX - olharMouse.x, e.clientY - olharMouse.y, 0.005); olharMouse = { x: e.clientX, y: e.clientY }; }
  });

  canvas.addEventListener('pointerdown', function (e) {
    if (estado !== 'jogando') return;
    somLigar();
    if (e.pointerType === 'mouse') {
      if (!travado) { travar(); olharMouse = { x: e.clientX, y: e.clientY }; }
      atacando = true;
      return;
    }
    toques[e.pointerId] = { tipo: e.clientX < W * 0.45 ? 'mover' : 'olhar', ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY };
    try { canvas.setPointerCapture(e.pointerId); } catch (er) { /* ok */ }
  });
  canvas.addEventListener('pointermove', function (e) {
    var tq = toques[e.pointerId]; if (!tq || estado !== 'jogando') return;
    if (tq.tipo === 'olhar') olhar(e.clientX - tq.x, e.clientY - tq.y, 0.006);
    tq.x = e.clientX; tq.y = e.clientY;
    if (tq.tipo === 'mover') {
      var dx = tq.x - tq.ox, dy = tq.y - tq.oy, d = Math.hypot(dx, dy);
      if (d > 90) { tq.ox = tq.x - dx / d * 90; tq.oy = tq.y - dy / d * 90; }
    }
  });
  function soltar(e) { delete toques[e.pointerId]; if (e.pointerType === 'mouse') { atacando = false; olharMouse = null; } }
  canvas.addEventListener('pointerup', soltar);
  canvas.addEventListener('pointercancel', soltar);

  var btnAtacar = $('btn-atacar');
  btnAtacar.addEventListener('pointerdown', function (e) { e.preventDefault(); somLigar(); if (estado === 'jogando') atacando = true; try { btnAtacar.setPointerCapture(e.pointerId); } catch (er) { /* ok */ } });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (n) { btnAtacar.addEventListener(n, function () { atacando = false; }); });
  btnAtacar.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  document.addEventListener('visibilitychange', function () { if (document.hidden) { pausar(); if (audio) audio.suspend(); } });

  $('btn-jogar').onclick = comecar;
  $('btn-recomecar').onclick = function () { estado = 'confirmar'; mostrar('tela-confirmar'); };
  $('btn-confirmar-sim').onclick = function () { var som = save.som; save = novoSave(); save.som = som; guardar(); irInicio(); };
  $('btn-confirmar-nao').onclick = irInicio;
  $('btn-pausar').onclick = function () { if (estado === 'jogando') pausar(); };
  $('btn-continuar').onclick = continuar;
  $('btn-sair').onclick = function () { limparCampo(); jog = null; irInicio(); };
  $('btn-som').onclick = function () { save.som = !save.som; guardar(); atualizarHud(); somLigar(); bip(660, 0.1, 'triangle', 0.07); };
  $('btn-graficos').onclick = function () { save.graficos = ({ alto: 'medio', medio: 'baixo', baixo: 'alto' })[save.graficos] || 'medio'; guardar(); aplicarGraficos(); atualizarHud(); };
  $('btn-reviver').onclick = reviver;
  $('btn-loja-morte').onclick = abrirLoja;
  $('btn-loja').onclick = abrirLoja;
  $('btn-fechar-loja').onclick = fecharLoja;
  $('btn-pocao').onclick = tomarPocao;
  $('aba-armas').onclick = function () { trocarAba('armas'); };
  $('aba-armaduras').onclick = function () { trocarAba('armaduras'); };
  $('aba-pocoes').onclick = function () { trocarAba('pocoes'); };
  $('aba-defesas').onclick = function () { trocarAba('defesas'); };
  $('aba-ajudantes').onclick = function () { trocarAba('ajudantes'); };

  // monstros parados na tela de início (a câmera gira em volta deles)
  function montarVitrine() {
    tirarVitrine();
    [['Lobo', -2.0, 0.6], ['Vampiro', -0.5, -0.5], ['Urso', 1.4, -0.1], ['Dragãozinho', 0.5, -2.0]].forEach(function (v) {
      var tipo = TIPOS.filter(function (t) { return t.nome === v[0]; })[0], modelo = fazerMonstro(tipo, false, false);
      modelo.grupo.position.set(v[1], 0, v[2]); sombraDoModelo(modelo); scene.add(modelo.grupo);
      vitrine.push({ modelo: modelo, tipo: tipo, r: modelo.r, fase: v[1] * 2, ataque: 0, x: v[1], z: v[2] });
    });
  }
  function tirarVitrine() { vitrine.forEach(function (v) { scene.remove(v.modelo.grupo); v.modelo.mat.dispose(); }); vitrine = []; }
  function irInicio() {
    estado = 'inicio'; destravar(); camLivre = null; rotulos = [];
    if (!vitrine.length) montarVitrine();
    var tem = save.nivel > 1 || save.moedas > 0;
    $('btn-jogar').textContent = tem ? 'Continuar (nível ' + save.nivel + ')' : 'Jogar';
    $('btn-recomecar').hidden = !tem;
    mostrar('tela-inicio');
  }

  // ---------- Modo de fotos (só com ?fotos=1 no endereço; usado pelo revisor 3D em tests/fotos-3d.cjs) ----------
  // Monta cenas fixas (sempre iguais) e deixa o script avançar o tempo aos poucos para tirar as fotos.
  function iniciarFotos() {
    function tipoPorNome(n) { return TIPOS.filter(function (t) { return t.nome === n; })[0]; }
    function preparar(graficos, nivel) {
      tirarVitrine(); limparCampo(); camLivre = null; rotulos = []; semSpawn = true; tremor = 0;
      save = novoSave(); save.som = false; save.nivel = nivel || 9; save.graficos = graficos || (toqueAparelho ? 'medio' : 'alto');
      save.armas = ARMAS.map(function (a) { return a.id; }); save.arma = 'espada-ferro'; save.armadura = 'ferro';
      novoJogador(); aplicarGraficos(); montarArmaNaMao();
      estado = 'jogando'; mostrar(null); atacando = false; teclas = {}; toques = {}; jog.espera = 0;
      atualizarHud();
    }
    function ja(m) { m.nasce = 1; m.modelo.grupo.scale.setScalar(1); return m; }
    function semHud() { $('hud').hidden = true; $('btn-atacar').hidden = true; $('construir').hidden = true; }
    function parado(nome, x, z, extra) {
      extra = extra || {};
      var m = novoMonstro(tipoPorNome(nome), x, z, extra.nivel || save.nivel, !!extra.dourado, !!extra.chefe);
      m.parado = true; m.nasce = 1; m.modelo.grupo.scale.setScalar(1); m.vida = m.max = 1e9;
      m.olhar = extra.olhar !== undefined ? extra.olhar : Math.atan2(jog.x - x, jog.z - z);
      return m;
    }
    // fileira de bichos virados para a câmera, com o nome embaixo
    function fileira(lista, criar) {
      var tam = lista.map(function (o) { return criar(o, 0, 0, true); }), total = 0, xs = [];
      tam.forEach(function (r, i) { if (i) total += tam[i - 1] * 1.5 + r * 1.5 + 0.9; xs.push(total); });
      lista.forEach(function (o, i) { criar(o, xs[i] - total / 2, -2.5, false); });
      return total;
    }
    function galeria(de, ate) {
      preparar('alto', 30); semHud();
      var largura = fileira(TIPOS.slice(de, ate), function (t, x, z, medir) {
        if (medir) return t.r;
        var compridos = t.forma === 'cobra' || t.forma === 'aranha' || t.forma === 'lobo';
        var m = parado(t.nome, x, z, { olhar: t.cauda ? -0.35 : (compridos ? 1.0 : 0.4) });
        rotulos.push([x, -0.1, z + m.r + 0.45, t.nome]);
        return m.r;
      });
      camLivre = [0, 1.7, -2.5 + Math.max(4.2, largura * 0.42 + 1.8), 0, 0.85, -2.5];
    }
    // bichos andando para a direita, vistos de lado, com o nome embaixo
    function desfile(nomes, cima) {
      preparar('alto', 30); semHud();
      // espaço para cada bicho conforme o tamanho: o que fica na frente dele e o que fica atrás (a cobra e o escorpião são compridos)
      var tipos = nomes.map(function (n) { return tipoPorNome(n) || acha(AJUDANTES, n); }), xs = [], total = 0;
      function frenteDe(t) { return t.r * 1.7; }
      function trasDe(t) { return t.forma === 'cobra' ? t.r * 4.8 : (t.cauda ? t.r * 2.8 : t.r * 1.7); }
      tipos.forEach(function (t, i) { if (i) total += frenteDe(tipos[i - 1]) + trasDe(t) + 0.5; xs.push(total); });
      var alto = Math.max.apply(null, tipos.map(function (t) { return t.r; }));
      nomes.forEach(function (n, i) {
        var x = xs[i] - total / 2, m;
        if (tipoPorNome(n)) { m = parado(n, x, -2.5, { olhar: Math.PI / 2 }); m.desfile = true; m.velAtual = m.vel; m.anda = 1; }
        else { m = criarAjudante(acha(AJUDANTES, n), amigos.length); m.x = x; m.z = -2.5; m.parado = true; m.desfile = true; m.modelo.grupo.rotation.y = Math.PI / 2; amigos.push(m); }
        rotulos.push([x, -0.1, -2.5 + m.r + 0.6, n]);
      });
      var dist = Math.max(3.6, total * 0.42 + 1.4);
      if (cima) camLivre = [0, 1.6 + alto + dist * 0.28, -2.5 + dist * 0.95, 0, 0.5, -2.5];
      else camLivre = [0, 1.1 + alto * 0.5, -2.5 + dist, 0, 0.6 + alto * 0.7, -2.5];
    }
    function primeiraPessoa(graficos) {
      preparar(graficos, 9);
      parado('Lobo', -1.3, -4.4); parado('Vampiro', 0.9, -6.4); parado('Urso', 2.6, -7.6); parado('Aranha', -3.4, -7.4); parado('Morcego vampiro', -1.6, -8.4);
      var amigo = criarAjudante(acha(AJUDANTES, 'lobo'), 0); amigo.x = -2.3; amigo.z = -2.2; amigo.parado = true; amigos.push(amigo);
      amigo.modelo.grupo.rotation.y = Math.PI;
      novaDefesa(acha(DEFESAS, 'torre-flechas'), 4.5, -4, 0);
    }
    var cenas = {
      'inicio': function () { tirarVitrine(); limparCampo(); jog = null; save = novoSave(); save.graficos = toqueAparelho ? 'medio' : 'alto'; aplicarGraficos(); irInicio(); relogio = 4; },
      'vista-geral': function () {
        preparar('alto', 14); semHud(); semSpawn = true;
        ['Lobo', 'Javali', 'Zumbi', 'Urso', 'Vampiro', 'Lobisomem', 'Rato gigante', 'Aranha'].forEach(function (n, i) { var a = i / 8 * 6.28; ja(novoMonstro(tipoPorNome(n), Math.cos(a) * 9, Math.sin(a) * 9 - 2, 14, i === 3, false)); });
        novaDefesa(acha(DEFESAS, 'muro-pedra'), -3, 3, 0.3); novaDefesa(acha(DEFESAS, 'torre-gelo'), 3, 2, 0); novaDefesa(acha(DEFESAS, 'canhao'), 0, -3.5, 0);
        save.ajudantes = ['lobo', 'golem-amigo']; sincronizarAjudantes();
        camLivre = [12, 10, 14, 0, 0, -1.5];
      },
      'primeira-pessoa': function () { primeiraPessoa(null); },
      'celular': function () { primeiraPessoa(null); },
      'graficos-baixo': function () { primeiraPessoa('baixo'); },
      'monstros-1': function () { galeria(0, 6); },
      'monstros-2': function () { galeria(6, 12); },
      'monstros-3': function () { galeria(12, 17); },
      'chefe': function () {
        preparar('alto', 9); semHud();
        var c = parado('Lobisomem', -2.6, -2.5, { chefe: true, nivel: 11, olhar: 0.35 }); rotulos.push([-2.6, -0.1, -2.5 + c.r * 1.3 + 0.3, 'Chefão (nível 11)']);
        var n = parado('Lobisomem', 0.9, -2.5, { olhar: 0.35 }); rotulos.push([0.9, -0.1, -2.5 + n.r + 0.45, 'Lobisomem normal']);
        var d = parado('Lobo', 3.4, -2.5, { dourado: true, olhar: 1.0 }); rotulos.push([3.4, -0.1, -2.5 + d.r + 0.45, 'Lobo dourado']);
        camLivre = [0.3, 2.0, 4.6, 0.3, 1.5, -2.5];
      },
      'ajudantes': function () {
        preparar('alto', 9); semHud();
        fileira(AJUDANTES, function (def, x, z, medir) {
          if (medir) return def.r;
          var a = criarAjudante(def, amigos.length); a.x = x; a.z = z; a.parado = true; amigos.push(a);
          a.modelo.grupo.position.set(x, 0, z); a.modelo.grupo.rotation.y = 0.45; rotulos.push([x, -0.15, z + a.r + 0.35, def.nome]);
          return def.r;
        });
        camLivre = [0, 1.7, 2.6, 0, 0.8, -2.5];
      },
      'defesas': function () {
        preparar('alto', 9); semHud();
        DEFESAS.forEach(function (def, i) { var x = (i - 2) * 3.3, d = novaDefesa(def, x, -3, def.tipo === 'muro' ? 0.25 : 0); if (d.modelo.cabeca) d.modelo.cabeca.rotation.y = 0.5; rotulos.push([x, -0.1, -1.6, def.nome]); });
        camLivre = [0, 2.6, 5.2, 0, 1.0, -3];
      },
      'armas-1': function () { preparar('alto', 9); },
      'armas-2': function () { preparar('alto', 9); },
      'golpe': function () { preparar('alto', 9); parado('Lobo', 0.15, -2.2); },
      'ceu': function () { // olhando para o lado do sol
        preparar('alto', 9); semHud();
        var h = Math.hypot(DIR_SOL.x, DIR_SOL.z), el = 0.62;
        camLivre = [0, 1.8, 3, DIR_SOL.x / h * Math.cos(el) * 40, 1.8 + Math.sin(el) * 40, 3 + DIR_SOL.z / h * Math.cos(el) * 40];
      },
      'flecha-de-lado': function () { preparar('alto', 9); semHud(); save.arma = 'arco'; montarArmaNaMao(); parado('Javali', 0, -9); camLivre = [3.0, 1.5, -5.0, -0.8, 1.3, -6.2]; },
      'andar-patas': function () { desfile(['Rato gigante', 'Lobo', 'Javali', 'Urso']); },
      'andar-pernas': function () { desfile(['Zumbi', 'Vampiro', 'Lobisomem', 'Ciclope', 'Demônio']); },
      'andar-outros': function () { desfile(['Aranha', 'Escorpião gigante', 'Cobra', 'Golem de lava', 'Yeti']); },
      'voar': function () { desfile(['Morcego vampiro', 'Dragãozinho', 'Fantasma']); camLivre[2] += 1.2; camLivre[1] += 0.4; },
      'andar-cima': function () { desfile(['Geleca amiga', 'Cobra', 'Urso', 'Zumbi', 'Golem de lava'], true); },
      'ataques-2': function () {
        preparar('alto', 30); semHud();
        ['Escorpião gigante', 'Morcego vampiro', 'Dragãozinho', 'Fantasma'].forEach(function (n, i) { var x = -4.2 + i * 2.8, m = parado(n, x, -2.5, { olhar: 0.9 }); rotulos.push([x, -0.1, -2.5 + m.r + 0.5, n]); });
        camLivre = [0, 2.4, 6.2, 0, 1.3, -2.5];
      },
      'ataques': function () {
        preparar('alto', 30); semHud();
        ['Lobo', 'Zumbi', 'Golem de lava', 'Cobra', 'Aranha'].forEach(function (n, i) { var x = -5.2 + i * 2.6, m = parado(n, x, -2.5, { olhar: 0.9 }); rotulos.push([x, -0.1, -2.5 + m.r + 0.5, n]); });
        camLivre = [0, 2.3, 6.4, 0, 1.0, -2.5];
      },
      'tiro-arco': function () { preparar('alto', 9); save.arma = 'arco'; montarArmaNaMao(); parado('Javali', 0.6, -9); },
      'magia': function () { preparar('alto', 9); save.arma = 'varinha-gelo'; montarArmaNaMao(); parado('Zumbi', -0.6, -8); },
      'moedas': function () { preparar('alto', 9); parado('Lobo', 0, -3.2); },
      'torres': function () {
        preparar('alto', 9); semHud(); semSpawn = true;
        novaDefesa(acha(DEFESAS, 'torre-flechas'), -3, -2, 0); novaDefesa(acha(DEFESAS, 'torre-gelo'), 2.5, -1.5, 0); novaDefesa(acha(DEFESAS, 'canhao'), -0.2, -3.6, 0);
        novaDefesa(acha(DEFESAS, 'muro-madeira'), 0, -6.5, 0);
        ['Lobo', 'Javali', 'Zumbi', 'Rato gigante', 'Urso'].forEach(function (n, i) { var m = ja(novoMonstro(tipoPorNome(n), -6 + i * 3, -14 - (i % 2) * 2, 9, false, false)); m.vida = m.max = 1e9; });
        jog.x = 0; jog.z = 4; camLivre = [4.2, 3.6, 3.4, -0.6, 1.0, -8];
      }
    };
    window.__cacador = {
      cenas: Object.keys(cenas),
      cena: function (nome) {
        if (!cenas[nome]) throw new Error('cena desconhecida: ' + nome);
        sementeFotos = 12345; relogio = 0; cenas[nome](); logica(1 / 60); desenhar();
        return true;
      },
      passo: function (seg) { var n = Math.max(1, Math.round(seg * 60)); for (var i = 0; i < n; i++) logica(seg / n); desenhar(); return true; },
      arma: function (id) { save.arma = id; montarArmaNaMao(); jog.golpe = 0; jog.espera = 0; logica(1 / 60); desenhar(); return true; },
      atacar: function () { jog.espera = 0; atacar(); return true; },
      atacarTodos: function () { monstros.forEach(function (m) { m.ataque = 0.25; }); return true; },
      derrotar: function () { if (monstros[0]) { monstros[0].vida = 1; matar(monstros[0]); } return true; },
      info: function () { return { chamadas: renderer.info.render.calls, triangulos: renderer.info.render.triangles, graficos: save.graficos, monstros: monstros.length }; }
    };
  }

  // ---------- Qualidade dos gráficos (troca na pausa) ----------
  var sombraLigada = null;
  function aplicarGraficos() {
    var c = qual(), liga = c.sombra !== 'nao';
    if (sombraLigada !== liga) {
      renderer.shadowMap.enabled = liga; sol.castShadow = liga; sombraLigada = liga;
      scene.traverse(function (o) { if (o.material) [].concat(o.material).forEach(function (m) { m.needsUpdate = true; }); });
    }
    if (liga) {
      if (sol.shadow.map) { sol.shadow.map.dispose(); sol.shadow.map = null; }
      sol.shadow.mapSize.set(c.mapa, c.mapa);
      var sc = sol.shadow.camera; sc.left = -c.area; sc.right = c.area; sc.top = c.area; sc.bottom = -c.area; sc.near = 1; sc.far = 220; sc.updateProjectionMatrix();
      renderer.shadowMap.autoUpdate = c.sombra === 'movel';
      if (c.sombra === 'fixa') posicionarSol(0, 0);
      renderer.shadowMap.needsUpdate = true;
    }
    grama.count = c.grama; flores.count = c.flores;
    monstros.concat(amigos, vitrine).forEach(function (m) { sombraDoModelo(m.modelo); });
    ajustar();
  }

  aplicarGraficos(); atualizarHud(); irInicio();
  if (FOTOS) iniciarFotos();
  requestAnimationFrame(quadro);
})();
