// Rumo à Terra: a Andorinha caiu em Lúmen; 12 missões para consertar a nave e voltar para a Terra.
// Liga tudo: carregamento em etapas, telas, laço do jogo, controles, céu, mundo, bichos, missões, abertura e final.
// Plano completo em docs/ (comece por docs/README.md).
import * as THREE from 'three';
import vale from './dados/regioes/vale.js';
import { criarRelevo, gerarGrade } from './logica/relevo.js';
import { ANGULO_MIRA } from './logica/config.js';
import { carregarConfig, salvarConfig, parametros } from './nucleo/config.js';
import { criarLaco } from './nucleo/laco.js';
import { som, destravarAudio, pausarAudio, retomarAudio, definirVolume } from './nucleo/audio.js';
import { entrada } from './nucleo/entrada/entrada.js';
import { iniciarToque } from './nucleo/entrada/toque.js';
import { iniciarTecladoMouse } from './nucleo/entrada/teclado-mouse.js';
import { lerControle } from './nucleo/entrada/controle.js';
import { criarRenderizador } from './desenho/renderizador.js';
import { criarCeu } from './desenho/ceu.js';
import { criarParticulas } from './desenho/particulas.js';
import { texturaDetalhe, texturaPaineis } from './desenho/texturas.js';
import { criarTerreno } from './mundo/terreno.js';
import { criarVegetacao } from './mundo/vegetacao.js';
import { criarAgua } from './mundo/agua.js';
import { criarNave } from './mundo/nave.js';
import { criarColisoes } from './fisica/colisao.js';
import { criarJogador } from './entidades/jogador.js';
import { criarAlvos } from './entidades/alvos.js';
import { criarArma, procurarAlvo } from './entidades/arma.js';
import { criarHud } from './ui/hud.js';
import { criarTelaMochila } from './ui/mochila.js';
import { ITENS } from './dados/itens.js';
import { criarInventario, criar } from './logica/inventario.js';
import { montarSave } from './logica/save.js';
import { carregarSave, gravarSave, apagarSave } from './nucleo/save-local.js';
import { criarPrologo } from './cenas/prologo.js';
import { criarRecursos } from './mundo/recursos.js';
import { criarConstrucoes } from './mundo/construcoes.js';
import { criarColetaveis } from './entidades/coletaveis.js';
import { criarCriaturas } from './entidades/criaturas.js';
import { CRIATURAS } from './dados/criaturas.js';
import { criarMapa } from './ui/mapa.js';
import { maisPerto, embrulhar } from './logica/toro.js';
import { criarLocais } from './mundo/locais.js';
import { criarPecas } from './entidades/pecas.js';
import { criarMissoes } from './logica/missoes.js';
import { criarPainel } from './ui/painel.js';
import { criarFinal } from './cenas/final.js';
import { LOCAIS, PONTOS, SUCATA, PECAS_NO_LOCAL, CHEFE_NO_LOCAL, RIFLE_NO_CHAO } from './dados/locais.js';
import { MISSOES } from './dados/missoes.js';
import { mostrarTela, progresso, mostrarErro, ligarOpcoes } from './ui/telas.js';

const $ = (id) => document.getElementById(id);
const esperarQuadro = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const ehToque = () => matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

const config = carregarConfig();
const params = parametros();
if (params.visual) config.visual = params.visual;
entrada.inverterY = config.inverterY;
definirVolume(config.volume);

let estado = 'carregando'; // carregando | inicio | prologo | jogando | pausa | mochila | mapa | painel | decolando | final | creditos
let voltarDasOpcoes = 'inicio';
let jaJogou = false;

async function iniciar() {
  progresso(0.05, 'Ligando o 3D...');
  await esperarQuadro();
  const canvas = $('tela3d');
  const render = criarRenderizador(canvas);
  if (!render) {
    mostrarErro('Este aparelho não conseguiu ligar o 3D (WebGL). Tente atualizar o iOS ou abrir em outro navegador.');
    return;
  }
  const renderer = render.three;
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); pausar(); });

  let girarAtivo = false; // celular em pé (ver verificarGiro)
  const cena = new THREE.Scene();
  cena.fog = new THREE.Fog(0xcfe3d4, 35, 165);
  const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.08, 620);

  progresso(0.12, 'Calculando o relevo do Vale...');
  await esperarQuadro();
  const relevo = criarRelevo(vale);
  const grade = gerarGrade(relevo, vale.passo);
  const colisoes = criarColisoes(vale.tamanho);

  progresso(0.3, 'Pintando o chão...');
  await esperarQuadro();
  const terreno = criarTerreno(grade, relevo);
  cena.add(terreno.grupo);
  const agua = criarAgua(vale);
  cena.add(agua.grupo);
  const locais = criarLocais({ def: vale, grade, colisoes });
  cena.add(locais.grupo);

  progresso(0.45, 'Plantando a grama-pena...');
  await esperarQuadro();
  const livres = [
    { x: vale.nave.x, z: vale.nave.z, r: 15 },
    { x: vale.inicio.x, z: vale.inicio.z, r: 5 },
    ...vale.alvos.map((a) => ({ x: a.x, z: a.z, r: 3.5 })),
    ...locais.livres,
    ...Object.values(PONTOS).flat().map(([x, z]) => ({ x, z, r: 2 })),
  ];
  const vegetacao = criarVegetacao({ def: vale, grade, relevo, colisoes, livres });
  cena.add(vegetacao.grupo);

  progresso(0.62, 'Arrumando os destroços da Andorinha...');
  await esperarQuadro();
  const fumaca = criarParticulas(cena, { max: 60 });
  const faiscas = criarParticulas(cena, { max: 220, aditivo: true });
  const lascas = criarParticulas(cena, { max: 160 });
  const chamas = criarParticulas(cena, { max: 160, aditivo: true });
  // Luz da fogueira: criada já no começo (apagada) para o 3D não "engasgar" na hora da primeira fogueira.
  const luzFogueira = new THREE.PointLight(0xff9a40, 0, 16, 1.6);
  cena.add(luzFogueira);
  const nave = criarNave({ def: vale, grade, colisoes, particulas: fumaca });
  cena.add(nave.grupo);
  if (nave.destrocos) cena.add(nave.destrocos);

  progresso(0.75, 'Desenhando o Colosso no céu...');
  await esperarQuadro();
  const ceu = criarCeu(cena, vale);
  const hora = params.hora ?? vale.ceu.hora;
  ceu.atualizar(hora);

  progresso(0.88, 'Preparando os controles...');
  await esperarQuadro();
  const hud = criarHud({ som });
  let avisoAgua = 0;
  // Dar a volta no mundo: conta as passagens pela emenda; voltando perto da nave sem desfazer, avisa.
  const volta = { x: 0, z: 0, avisou: false };
  const jogador = criarJogador({
    def: vale, grade, colisoes, som,
    aoAguaFunda() {
      const agora = performance.now();
      if (agora - avisoAgua > 7000) { avisoAgua = agora; hud.mensagem('Cuidado, Comandante! A água ali é funda demais.', 3); }
    },
    aoDarAVolta(dx, dz) { volta.x += dx; volta.z += dz; },
  });
  const alvos = criarAlvos({ def: vale, grade, cena, particulas: faiscas, som });
  const alvosTiro = { lista: [] }; // bolhas de treino + bichos (a arma e a ajuda na mira olham esta lista)
  const arma = criarArma({ camera, cena, grade, colisoes, alvos: alvosTiro, faiscas, som, aoTiroForte: () => { tremor = Math.max(tremor, 0.3); } });

  // ---- coleta, mochila, criar e construir (salvo neste aparelho) ----
  const save = carregarSave();
  const inventario = criarInventario(save ? save.inventario : []);
  const recursos = criarRecursos({ lista: [...vegetacao.recursos, ...locais.recursos], colisoes, lascas, som, tamanho: vale.tamanho });
  const missoes = criarMissoes(save ? save.missao : null, inventario);
  const pecas = criarPecas({ cena, grade });
  const construcoes = criarConstrucoes({ cena, grade, colisoes, chamas, luz: luzFogueira, som });
  if (save) construcoes.carregar(save);
  if (save && save.pos) jogador.reposicionar(save.pos[0] / 100, save.pos[1] / 100, save.pos[2]);
  let tempoJogado = save ? save.tempo_jogado_s : 0;
  let sujo = false, relogioSave = 0;
  const marcarSujo = () => { sujo = true; };
  inventario.aoMudar(marcarSujo);
  function salvarAgora() {
    if (!sujo) return;
    const rumo = ((((jogador.rumo * 180) / Math.PI) % 360) + 540) % 360 - 180;
    const pos = [Math.round(jogador.pos.x * 100), Math.round(jogador.pos.z * 100), Math.round(rumo)];
    sujo = !gravarSave(montarSave({ inventario: inventario.lista(), ...construcoes.serializar(), tempoJogado, pos, missao: missoes.serializar() }));
  }
  const coletaveis = criarColetaveis({
    cena,
    aoPegar(id, n) {
      if (!n) return;
      inventario.adicionar(id, n);
      som.pegar();
      hud.aviso(`+${n} ${ITENS[id].icone} ${ITENS[id].nome}`);
    },
  });

  // ---- os aliens de Lúmen e a sua vida ----
  let vida = 100, semDano = 99, desmaio = 0, tremor = 0;
  const AVISOS_BICHO = {
    saltito: 'Olha, um Saltito! É inofensivo e foge de você. Dá para caçar para comer.',
    rastejador: 'Cuidado, Comandante! Rastejadores! Eles caçam em grupo. Perto da nave ou de uma fogueira eles não chegam.',
    zumbidor: 'Um Zumbidor lá no alto! Ele dá rasantes: atire quando ele vier na sua direção.',
  };
  const criaturas = criarCriaturas({
    cena, def: vale, grade, colisoes, som, nuvem: lascas, posNave: nave.centro,
    fogueiras: () => construcoes.listaFogueiras(),
    aoAtacar: (dano) => levarDano(dano),
    aoMorrer: (c, itens, p) => {
      if (itens.length) coletaveis.soltar(itens, p);
      if (c.tag) mostrarMsgs(missoes.evento('derrotou', { tag: c.tag }));
    },
    aoVer: (tipo) => { if (AVISOS_BICHO[tipo]) hud.mensagem(AVISOS_BICHO[tipo], 5); },
  });
  function levarDano(n) {
    if (estado !== 'jogando' || desmaio > 0 || acordando > 1) return;
    if (inventario.tem('armadura')) n = Math.max(1, Math.round(n * 0.6)); // a armadura de carapaça protege
    vida -= n;
    semDano = 0;
    tremor = 0.35;
    hud.dano();
    som.dor();
    if (vida <= 0) { vida = 0; desmaio = 1.3; som.desmaio(); entrada.soltarTudo(); }
    hud.vida(vida / 100);
  }
  // Desmaiou: tela preta, o drone da ÍRIS leva você para a nave (perde metade da carne que carregava).
  function acordarNaNave() {
    const p = nave.porta;
    jogador.reposicionar(p.x, p.z, vale.inicio.olhar);
    vida = 100;
    hud.vida(1);
    const carne = inventario.quantos('carne');
    if (carne > 1) inventario.remover('carne', Math.floor(carne / 2));
    acordando = TEMPO_ACORDAR;
    hud.mensagem('Você desmaiou! Meu drone trouxe você de volta para a nave, Comandante.', 5);
    if (carne > 1) hud.mensagem('Na correria, metade da carne ficou para trás.', 4);
  }

  // ---- os dois visuais (decisão D11) ----
  const texChao = texturaDetalhe(3, 64, 1), texProps = texturaDetalhe(8, 32, 1.3), texPaineis = texturaPaineis();
  const mats = {
    liso: {
      terreno: new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }),
      props: new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide }),
      nave: new THREE.MeshLambertMaterial({ vertexColors: true }),
    },
    pixelado: {
      terreno: new THREE.MeshLambertMaterial({ vertexColors: true, map: texChao }),
      props: new THREE.MeshLambertMaterial({ vertexColors: true, map: texProps, side: THREE.DoubleSide }),
      nave: new THREE.MeshLambertMaterial({ vertexColors: true, map: texPaineis }),
    },
  };
  for (const m of Object.values(mats.pixelado)) m.color.setScalar(1.14); // compensa o escurecimento da textura

  function aplicarVisual() {
    const m = mats[config.visual];
    for (const p of terreno.pedacos) p.mesh.material = m.terreno;
    for (const p of vegetacao.malhas) p.mesh.material = m.props;
    for (const p of locais.malhas) p.mesh.material = m.props;
    nave.casco.material = m.nave;
    for (const e of nave.extras) e.material = m.nave;
    if (nave.destrocos) nave.destrocos.material = m.nave;
    render.definir(config.visual, config.qualidade);
    const longe = config.qualidade === 'leve' ? 125 : 165;
    cena.fog.far = longe;
    cena.fog.near = longe * 0.22;
    document.body.classList.toggle('botoes-grandes', config.botoes === 'grande');
    document.body.classList.toggle('atirar-esquerda', config.atirar === 'esquerda');
    ajustarTela();
  }

  function ajustarTela() {
    const aspecto = innerWidth / innerHeight;
    // campo de visão horizontal de ~100°, limitado (iPhone deitado é muito largo)
    const vfov = Math.max(55, Math.min(78, (2 * Math.atan(Math.tan((100 * Math.PI) / 360) / aspecto) * 180) / Math.PI));
    camera.fov = vfov;
    camera.aspect = aspecto;
    camera.updateProjectionMatrix();
    arma.ajustarTela(aspecto, vfov);
    const altura = renderer.domElement.height;
    for (const p of [fumaca, faiscas, lascas, chamas]) p.definirEscala(altura, vfov);
    prologo.ajustarTela(aspecto, altura);
    final.ajustarTela(aspecto);
    verificarGiro();
  }
  const prologo = criarPrologo({ renderer, som });
  const final = criarFinal({ renderer, som });
  addEventListener('resize', () => setTimeout(ajustarTela, 50));
  aplicarVisual();

  // ---- controles ----
  const toque = iniciarToque({
    camada: $('camada-toque'), base: $('joy-base'), pino: $('joy-pino'),
    btnAtirar: $('btn-atirar'), btnPular: $('btn-pular'), btnAcao: $('btn-acao'),
    config, aoPrimeiroToque: destravarAudio,
  });
  const teclado = iniciarTecladoMouse({ canvas, config, podeJogar: () => estado === 'jogando' });
  if (ehToque()) document.body.classList.add('com-toque');
  addEventListener('pointerdown', destravarAudio, { once: false, passive: true });
  addEventListener('keydown', destravarAudio, { passive: true });
  addEventListener('touchend', destravarAudio, { passive: true }); // o iPhone às vezes só libera o som ao soltar o dedo
  addEventListener('click', destravarAudio, { passive: true });

  // ---- telas e botões ----
  const opcoes = ligarOpcoes(config, (c) => {
    entrada.inverterY = c.inverterY;
    definirVolume(c.volume);
    aplicarVisual();
    salvarConfig(c);
  });

  // ---- menu: novo jogo, continuar ----
  const temJogoSalvo = () => !!carregarSave() || inventario.lista().length > 0 || construcoes.total > 0 || missoes.indice > 0 || missoes.estado.p > 0;
  function atualizarMenu() {
    salvarAgora();
    const tem = temJogoSalvo();
    $('btn-continuar-jogo').hidden = !tem;
    $('btn-novo-jogo').classList.toggle('grande', !tem);
    const info = $('info-save');
    info.hidden = !tem;
    if (tem) {
      const itens = inventario.lista().reduce((soma, [, n]) => soma + n, 0);
      const m = missoes.missao();
      const qual = m ? `missão ${missoes.indice + 1} de ${MISSOES.length} (${m.titulo})` : 'todas as missões completas';
      info.textContent = `Guardado neste aparelho: ${qual}, ${itens} ${itens === 1 ? 'item' : 'itens'} na mochila e ${construcoes.total} ${construcoes.total === 1 ? 'construção' : 'construções'}.`;
    }
    $('botoes-inicio').hidden = false;
    $('confirmar-novo').hidden = true;
  }

  function resetarMundo() {
    sairModoColocar();
    inventario.limpar();
    construcoes.limpar();
    recursos.restaurarTudo();
    criaturas.reiniciar();
    locais.abrirPorta(false);
    pecas.limpar();
    missoes.reiniciar(); // chama prepararPasso() (primeiro passo)
    nave.mostrarSistemas(missoes.estado.sistemas);
    vida = 100; desmaio = 0; semDano = 99;
    hud.vida(1);
    volta.x = volta.z = 0; volta.avisou = false;
    jogador.reposicionar(vale.inicio.x, vale.inicio.z, vale.inicio.olhar);
    avisouEsqueleto = false;
    tempoJogado = 0;
    apagarSave();
    sujo = false;
    jaJogou = false;
    hud.limparMensagens();
  }

  function pedirNovoJogo() {
    som.clique();
    if (temJogoSalvo()) { $('botoes-inicio').hidden = true; $('confirmar-novo').hidden = false; return; }
    iniciarNovoJogo();
  }

  // Novo jogo: a abertura no espaço (a queda) e depois acordar no Vale.
  function iniciarNovoJogo() {
    destravarAudio();
    resetarMundo();
    estado = 'prologo';
    mostrarTela(null);
    $('hud').hidden = true;
    $('prologo').hidden = false;
    prologo.iniciar(acordar);
  }

  let acordando = 0;
  const TEMPO_ACORDAR = 3.8;
  function acordar() {
    $('prologo').hidden = true;
    acordando = TEMPO_ACORDAR;
    comecar({ acordou: true });
  }

  function comecar({ acordou = false } = {}) {
    destravarAudio();
    if (!acordou) som.clique();
    som.ligarVento();
    estado = 'jogando';
    mostrarTela(null);
    $('hud').hidden = false;
    entrada.soltarTudo();
    toque.ligar();
    if (!jaJogou) {
      jaJogou = true;
      if (!acordou && temJogoSalvo()) {
        hud.mensagem('Bem-vindo de volta, Comandante! Suas coisas estão onde você deixou.', 4);
        const m = missoes.missao();
        if (m) hud.mensagem(`Missão de agora: ${m.icone} ${m.titulo}. ${missoes.passo().texto}`, 6);
        return;
      }
      hud.mensagem('Comandante... está me ouvindo? A Andorinha caiu, mas você está inteiro!', 4);
      hud.mensagem(entrada.ultimaFonte === 'toque' || ehToque()
        ? 'Dedão esquerdo: andar. Dedão direito: arrastar para olhar em volta.'
        : 'W A S D para andar, o mouse para olhar, Espaço para pular.', 5);
      hud.mensagem('Venha até a porta da nave e toque em "Falar com a ÍRIS". Vamos consertar a Andorinha juntos!', 6);
      hud.mensagem('Dica: perto da nave há bolhas de cristal para treinar a mira. E mirando numa árvore, segure ✋ para pegar madeira.', 6);
    }
  }

  function pausar() {
    if (estado !== 'jogando') return;
    estado = 'pausa';
    entrada.soltarTudo();
    toque.desligar();
    teclado.soltarTrava();
    mostrarTela('tela-pausa');
    pausarAudio();
    salvarAgora();
  }
  function continuar() {
    if (girarAtivo) return;
    estado = 'jogando';
    mostrarTela(null);
    entrada.soltarTudo();
    toque.ligar();
    retomarAudio();
    som.clique();
  }
  function sairParaInicio() {
    sairModoColocar();
    salvarAgora();
    estado = 'inicio';
    $('hud').hidden = true;
    hud.limparMensagens();
    jaJogou = false;
    atualizarMenu();
    mostrarTela('tela-inicio');
    retomarAudio();
  }

  // ---- mochila ----
  const telaMochila = criarTelaMochila({
    inventario, missoes,
    aoCriar(r) {
      if (criar(inventario, r)) {
        som.criar();
        hud.aviso(`Criou: ${ITENS[r.resultado].icone} ${ITENS[r.resultado].nome}${r.qtd > 1 ? ' ×' + r.qtd : ''}`);
        salvarAgora();
      } else som.negado();
    },
    aoColocar(id) { fecharMochila(); entrarModoColocar(id); },
  });
  function abrirMochila() {
    if (estado !== 'jogando') return;
    estado = 'mochila';
    entrada.soltarTudo();
    toque.desligar();
    teclado.soltarTrava();
    som.clique();
    telaMochila.abrir();
    mostrarTela('tela-mochila');
  }
  function fecharMochila() {
    if (estado !== 'mochila') return;
    estado = 'jogando';
    mostrarTela(null);
    entrada.soltarTudo();
    toque.ligar();
  }
  $('btn-mochila').addEventListener('click', abrirMochila);

  // ---- mapa ----
  const mapa = criarMapa({ grade, terreno, recursos });
  function abrirMapa() {
    if (estado !== 'jogando') return;
    estado = 'mapa';
    entrada.soltarTudo();
    toque.desligar();
    teclado.soltarTrava();
    som.clique();
    mapa.desenhar($('mapa-canvas'), {
      jogador, nave: nave.centro, fogueiras: construcoes.listaFogueiras(), blocos: construcoes.listaBlocos(),
      locais: locaisConhecidos(), objetivo: alvoMissao(),
    });
    mostrarTela('tela-mapa');
  }
  function fecharMapa() {
    if (estado !== 'mapa') return;
    estado = 'jogando';
    mostrarTela(null);
    entrada.soltarTudo();
    toque.ligar();
  }
  $('btn-mapa').addEventListener('click', abrirMapa);
  $('btn-fechar-mapa').addEventListener('click', () => { som.clique(); fecharMapa(); });
  addEventListener('keydown', (e) => {
    if (estado === 'mapa' && ['Escape', 'KeyM'].includes(e.code)) { e.preventDefault(); fecharMapa(); }
  });
  $('btn-fechar-mochila').addEventListener('click', () => { som.clique(); fecharMochila(); });
  addEventListener('keydown', (e) => {
    if (estado === 'mochila' && ['Escape', 'KeyI', 'Tab'].includes(e.code)) { e.preventDefault(); fecharMochila(); }
  });

  // ---- missões (lógica em src/logica/missoes.js, dados em src/dados/missoes.js e src/dados/locais.js) ----
  const T = vale.tamanho;
  const distToro = (ax, az, bx, bz) => Math.hypot(embrulhar(ax - bx, T), embrulhar(az - bz, T));
  const suave = (t) => { const k = Math.max(0, Math.min(1, t)); return k * k * (3 - 2 * k); };
  // Mensagens da ÍRIS quando um passo termina (e a musiquinha quando uma missão inteira termina).
  function mostrarMsgs(msgs) {
    if (!msgs || !msgs.length) return;
    let completou = false;
    for (const m of msgs) {
      if (m.startsWith('✅')) { completou = true; hud.aviso(m); }
      hud.mensagem(m, m.length > 70 ? 6 : 4.5);
    }
    if (completou) som.missaoCompleta();
  }
  // O Rifle de raio fica no chão, ao lado do esqueleto do Tavares, até alguém pegar (pedido do dono).
  function mostrarRifle() {
    if (!inventario.tem('rifle')) pecas.mostrar([{ id: 'rifle', item: 'rifle', x: RIFLE_NO_CHAO.x, z: RIFLE_NO_CHAO.z, extra: true }]);
  }
  // Põe no mundo o que o passo de agora precisa: bichos para derrotar, o chefe, as peças para pegar e os guardas.
  function prepararPasso() {
    pecas.limpar();
    mostrarRifle();
    const ps = missoes.passo();
    if (!ps) return;
    const tag = missoes.tag(), est = missoes.estado;
    const L = ps.local ? LOCAIS[ps.local] : null;
    const perto = (l, r) => { const a = Math.random() * Math.PI * 2, d = Math.random() * r; return [l.x + Math.cos(a) * d, l.z + Math.sin(a) * d]; };
    if (ps.tipo === 'derrotar') {
      for (let k = est.n; k < ps.qtd; k++) { const [x, z] = perto(L, (L.raio || 8) * 0.6); criaturas.invocar(ps.bicho, x, z, tag); }
    } else if (ps.tipo === 'chefe') {
      const [dx, dz] = CHEFE_NO_LOCAL[ps.chefe] || [0, 0];
      criaturas.invocar(ps.chefe, L.x + dx, L.z + dz, tag);
    } else if (ps.tipo === 'pegar') {
      const [dx, dz, dy] = PECAS_NO_LOCAL[ps.item] || [0, 0, 0];
      const x = L.x + dx, z = L.z + dz;
      pecas.mostrar([{ id: ps.item, item: ps.item, x, z, y: grade.alturaEm(x, z) + dy }]);
    } else if (ps.tipo === 'achar') {
      const faltam = PONTOS[ps.item].map(([x, z], k) => ({ id: `${ps.item}:${k}`, item: ps.item, x, z })).filter((pc) => !est.pegos.includes(pc.id));
      pecas.mostrar(faltam);
      const g = ps.guardas;
      if (g) {
        const lugares = g.porPonto ? faltam.map((pc) => ({ x: pc.x, z: pc.z, raio: 8 })) : [LOCAIS[g.local]];
        for (const l of lugares) for (let k = 0; k < g.qtd; k++) { const [x, z] = perto(l, (l.raio || 8) * 0.6); criaturas.invocar(g.bicho, x, z, 'guarda'); }
      }
    }
  }
  // Para onde a ⭐ da bússola e do mapa aponta agora.
  function alvoMissao() {
    const ps = missoes.passo();
    if (!ps) return null;
    if (['falar', 'instalar', 'minijogo', 'decolar', 'construir'].includes(ps.tipo)) return { x: nave.centro.x, z: nave.centro.z, nome: 'Andorinha', nave: true };
    if (ps.tipo === 'pegar' || ps.tipo === 'achar') {
      const pc = pecas.maisProxima(jogador.pos);
      if (pc) return { x: pc.x, z: pc.z, nome: ITENS[pc.item].nome };
    }
    if (ps.tipo === 'abrir' && locais.portaFrente) return { ...locais.portaFrente, nome: 'Porta dos Antigos' };
    if (ps.local) { const L = LOCAIS[ps.local]; return { x: L.x, z: L.z, nome: L.nome }; }
    if (ps.tipo === 'coletar' && ps.itens.sucata) {
      let melhor = null, dm = Infinity;
      for (const [x, z] of SUCATA) { const d = distToro(x, z, jogador.pos.x, jogador.pos.z); if (d < dm) { dm = d; melhor = { x, z, nome: 'Sucata' }; } }
      return melhor;
    }
    return null;
  }
  // Lugares das missões que você já conhece (aparecem no mapa).
  function locaisConhecidos() {
    const ids = new Set();
    MISSOES.forEach((m, i) => {
      if (i > missoes.indice) return;
      for (const ps of m.passos) {
        if (ps.local) ids.add(ps.local);
        if (ps.guardas && ps.guardas.local) ids.add(ps.guardas.local);
        if (ps.item === 'chave') for (const id of ['monolito1', 'monolito2', 'monolito3']) ids.add(id);
      }
    });
    return [...ids].map((id) => LOCAIS[id]);
  }
  function atualizarRastreador() {
    const m = missoes.missao(), ps = missoes.passo();
    hud.missao(m && ps ? { icone: m.icone, titulo: `Missão ${missoes.indice + 1}: ${m.titulo}`, texto: ps.texto, progresso: missoes.progresso() } : null);
  }
  const ctxMissao = {
    pertoDe: (id) => { const L = LOCAIS[id]; return distToro(jogador.pos.x, jogador.pos.z, L.x, L.z) < (L.raio || 8) + 6; },
    get fogueiraPertoDaNave() { return construcoes.listaFogueiras().some((f) => distToro(f.x, f.z, nave.centro.x, nave.centro.z) < 25); },
  };

  // ---- painel da nave ----
  const painel = criarPainel({
    missoes, inventario, som,
    aoInstalar() {
      const msgs = missoes.instalar();
      if (!msgs) { som.negado(); return; }
      som.instalar();
      nave.mostrarSistemas(missoes.estado.sistemas);
      fecharPainel();
      mostrarMsgs(msgs);
      salvarAgora();
    },
    aoMinijogo() { fecharPainel(); mostrarMsgs(missoes.evento('minijogo')); salvarAgora(); },
    aoDecolar() { decolar(); },
  });
  function abrirPainel() {
    if (estado !== 'jogando') return;
    estado = 'painel';
    entrada.soltarTudo();
    toque.desligar();
    teclado.soltarTrava();
    som.clique();
    painel.abrir();
    mostrarTela('tela-painel');
  }
  function fecharPainel() {
    if (estado !== 'painel') return;
    estado = 'jogando';
    mostrarTela(null);
    entrada.soltarTudo();
    toque.ligar();
  }
  $('btn-fechar-painel').addEventListener('click', () => { som.clique(); fecharPainel(); });
  $('btn-missao').addEventListener('click', () => { abrirMochila(); telaMochila.abrir('missoes'); });
  addEventListener('keydown', (e) => {
    if (estado === 'painel' && e.code === 'Escape') { e.preventDefault(); fecharPainel(); }
  });

  // ---- decolagem, final e créditos ----
  let decolagem = null;
  const TEMPO_DECOLAGEM = 7.5;
  const naveFrente = new THREE.Vector3(), saidaFogo = new THREE.Vector3(), posNaveAgora = new THREE.Vector3();
  function decolar() {
    if (estado !== 'painel') return;
    const ps = missoes.passo();
    if (!(ps && ps.tipo === 'decolar') && !missoes.fim) return;
    if (ps && ps.tipo === 'decolar') missoes.evento('decolou');
    salvarAgora();
    estado = 'decolando';
    mostrarTela(null);
    $('hud').hidden = true;
    entrada.soltarTudo();
    toque.desligar();
    teclado.soltarTrava();
    hud.limparMensagens();
    decolagem = { t: 0, altura: 0, vel: 0, ofs: new THREE.Vector3(), ronco: som.laco('ronco') };
  }
  function atualizarDecolagem(dt) {
    const d = decolagem, g = nave.grupo, pose = nave.poseOriginal;
    d.t += dt;
    const sobe = suave((d.t - 1.2) / 2.8), inclina = suave((d.t - 3.4) / 2.2);
    g.rotation.set(-0.55 * inclina, pose.rotacao.y, pose.rotacao.z * (1 - sobe), 'YXZ');
    d.altura = 16 * sobe;
    naveFrente.set(0, 0, 1).applyEuler(g.rotation);
    if (d.t > 3.4) { d.vel += dt * 24; d.ofs.addScaledVector(naveFrente, d.vel * dt); }
    g.position.y = pose.y + d.altura + d.ofs.y;
    g.updateMatrixWorld(true);
    // fogo do motor e poeira no chão
    g.localToWorld(saidaFogo.copy(nave.saidaMotor));
    const forca = Math.min(1, d.t / 1.2);
    for (let k = 0; k < 4; k++) {
      chamas.soltar({
        x: saidaFogo.x + (Math.random() - 0.5) * 0.6, y: saidaFogo.y + (Math.random() - 0.5) * 0.6, z: saidaFogo.z + (Math.random() - 0.5) * 0.6,
        vx: -naveFrente.x * 7 + (Math.random() - 0.5) * 2, vy: -naveFrente.y * 7 - 1.5, vz: -naveFrente.z * 7 + (Math.random() - 0.5) * 2,
        vida: 0.45, tamanho: (0.7 + Math.random() * 0.6) * forca, cresce: 1.5, cor: Math.random() < 0.5 ? 0xffa040 : 0x8fd8ff, alfa: 0.85,
      });
    }
    if (d.t < 4.5 && Math.random() < 0.5) {
      const a = Math.random() * Math.PI * 2;
      fumaca.soltar({ x: nave.centro.x + Math.cos(a) * 5, y: nave.centro.y + 0.3, z: nave.centro.z + Math.sin(a) * 5, vx: Math.cos(a) * 3, vy: 0.6, vz: Math.sin(a) * 3, vida: 2.5, tamanho: 1.6, cresce: 1.2, cor: 0x9a8a7a, alfa: 0.35 });
    }
    d.ronco.nivel(forca * (1 - suave((d.t - 6) / 1.5)));
    nave.atualizar(dt);
    fumaca.atualizar(dt);
    chamas.atualizar(dt);
    $('cortina').style.opacity = String(suave((d.t - 6.2) / 1.2));
    if (d.t >= TEMPO_DECOLAGEM) {
      d.ronco.parar();
      estado = 'final';
      $('final').hidden = false;
      final.iniciar(mostrarCreditos);
    }
  }
  function mostrarCreditos() {
    estado = 'creditos';
    $('final').hidden = true;
    const min = Math.round(tempoJogado / 60);
    $('final-tempo').textContent = `Tempo de jogo: ${min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`}. Missões: ${MISSOES.length} de ${MISSOES.length}.`;
    mostrarTela('tela-final');
    $('cortina').style.opacity = '0';
  }
  function voltarDoFinal(explorar) {
    nave.voltarAoLugar();
    decolagem = null;
    if (explorar) {
      jogador.reposicionar(nave.porta.x, nave.porta.z, vale.inicio.olhar);
      comecar();
      hud.mensagem('A Andorinha voltou a Lúmen para você explorar mais, Comandante. No "Painel da nave" dá para decolar de novo.', 6);
    } else sairParaInicio();
  }
  $('btn-pular-final').addEventListener('click', () => final.pular());
  $('btn-final-explorar').addEventListener('click', () => { som.clique(); voltarDoFinal(true); });
  $('btn-final-inicio').addEventListener('click', () => { som.clique(); voltarDoFinal(false); });

  // ---- trocar de arma (Desintegrador ou Rifle de raio, uma de cada vez) ----
  function trocarArma(qual) {
    if (estado !== 'jogando' || !arma.trocar(qual)) return;
    const nova = arma.proxima === 'rifle' ? '💥 Rifle de raio (segure o tiro para carregar)' : '✦ Desintegrador';
    hud.aviso(nova);
  }
  let ignorarClique = 0;
  $('btn-trocar-arma').addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('apertado');
    ignorarClique = performance.now();
    trocarArma();
  });
  for (const ev of ['pointerup', 'pointercancel', 'pointerleave']) $('btn-trocar-arma').addEventListener(ev, (e) => e.currentTarget.classList.remove('apertado'));
  $('btn-trocar-arma').addEventListener('click', () => { if (performance.now() - ignorarClique > 600) trocarArma(); });
  inventario.aoMudar(() => arma.definirRifle(inventario.tem('rifle')));
  arma.definirRifle(inventario.tem('rifle'));
  let avisouEsqueleto = false;

  // ---- modo colocar (blocos e fogueira) ----
  let modoColocar = null;
  function entrarModoColocar(id) {
    if (!inventario.tem(id) || ITENS[id].tipo !== 'colocavel') return;
    modoColocar = id;
    atualizarTextoColocar();
    if (!jaViuDicaColocar) {
      jaViuDicaColocar = true;
      hud.mensagem(entrada.ultimaFonte === 'teclado' ? 'Mire onde quer pôr e aperte E. Q para parar.' : 'Mire onde quer pôr e toque em "Colocar". O ✕ para de colocar.', 5);
    }
  }
  let jaViuDicaColocar = false;
  function atualizarTextoColocar() {
    if (!modoColocar) return;
    const i = ITENS[modoColocar];
    hud.modoColocar(`Colocando: ${i.icone} ${i.nome} (${inventario.quantos(modoColocar)})`);
  }
  function sairModoColocar() {
    modoColocar = null;
    construcoes.mostrarFantasma(null, null);
    hud.modoColocar(null);
  }
  $('btn-cancelar').addEventListener('click', () => { som.clique(); sairModoColocar(); });

  $('btn-novo-jogo').addEventListener('click', pedirNovoJogo);
  $('btn-continuar-jogo').addEventListener('click', () => comecar());
  $('btn-confirmar-novo').addEventListener('click', () => { som.clique(); iniciarNovoJogo(); });
  $('btn-cancelar-novo').addEventListener('click', () => { som.clique(); atualizarMenu(); });
  $('btn-pular-prologo').addEventListener('click', () => prologo.pular());
  $('btn-opcoes').addEventListener('click', () => { voltarDasOpcoes = 'tela-inicio'; opcoes.preencher(); mostrarTela('tela-opcoes'); });
  $('btn-opcoes-pausa').addEventListener('click', () => { voltarDasOpcoes = 'tela-pausa'; opcoes.preencher(); mostrarTela('tela-opcoes'); });
  $('btn-voltar-opcoes').addEventListener('click', () => { som.clique(); mostrarTela(voltarDasOpcoes); });
  $('btn-continuar').addEventListener('click', continuar);
  $('btn-sair').addEventListener('click', sairParaInicio);
  $('btn-pausar').addEventListener('click', pausar);
  $('btn-recarregar').addEventListener('click', () => location.reload());

  // Pausa sozinho quando a criança troca de app ou a aba esconde.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { pausar(); pausarAudio(); salvarAgora(); }
    else if (estado !== 'jogando') retomarAudio();
  });

  // Celular em pé: pede para girar (e pausa).
  function verificarGiro() {
    const emPe = ehToque() && innerHeight > innerWidth;
    if (emPe === girarAtivo) return;
    girarAtivo = emPe;
    $('tela-girar').hidden = !emPe;
    if (emPe) pausar();
  }

  // ---- laço do jogo ----
  const tmp = new THREE.Vector3();
  let ajuda = null, acaoAtual = null, contadorQuadros = 0, fpsMedia = 60;
  let alvoAcao = null, esperaGolpe = 0, avisoFalta = 0;
  const olho = new THREE.Vector3(), dirOlhar = new THREE.Vector3(), peito = new THREE.Vector3();

  // O que o jogador pode fazer com o botão de ação agora (mirando).
  function escolherAlvoAcao() {
    camera.getWorldPosition(olho);
    camera.getWorldDirection(dirOlhar);
    if (modoColocar) {
      const info = ITENS[modoColocar];
      const tipo = info.bloco ? 'bloco' : 'fogueira';
      const alvo = construcoes.alvoColocacao(tipo, olho, dirOlhar, jogador.pos);
      construcoes.mostrarFantasma(tipo, alvo);
      return { tipo: 'colocar', alvo, tipoColocacao: tipo, bloco: info.bloco, texto: 'Colocar', bloqueado: !alvo || !alvo.valido };
    }
    const pc = pecas.perto(jogador.pos);
    if (pc) return { tipo: 'peca', peca: pc, texto: `Pegar ${ITENS[pc.item].icone} ${ITENS[pc.item].nome.split(' ')[0]}` };
    const hr = recursos.mirar(olho, dirOlhar);
    const hc = construcoes.mirar(olho, dirOlhar, recursos.ALCANCE);
    if (hc && (!hr || hc.distancia < hr.distancia)) return { tipo: 'construcao', hit: hc, texto: 'Desmontar' };
    if (hr) {
      const regra = hr.recurso.regra;
      if (regra.exige && !inventario.tem(regra.exige)) return { tipo: 'recurso', hit: hr, texto: `Precisa de ${ITENS[regra.exige].nome.split(' ')[0].toLowerCase()}`, bloqueado: true };
      return { tipo: 'recurso', hit: hr, texto: regra.verbo };
    }
    const pf = locais.portaFrente;
    if (pf && !missoes.estado.porta && distToro(jogador.pos.x, jogador.pos.z, pf.x, pf.z) < 3.8) {
      const ps = missoes.passo();
      const tem = inventario.quantos('chave') >= 3;
      if (ps && ps.tipo === 'abrir') return { tipo: 'portaRuinas', texto: tem ? 'Abrir a porta 🗝️' : 'Precisa de 3 🗝️', bloqueado: !tem };
      return { tipo: 'portaRuinas', texto: 'Porta dos Antigos', bloqueado: true };
    }
    const d = distToro(jogador.pos.x, jogador.pos.z, nave.porta.x, nave.porta.z);
    if (d < 4.2) {
      const ps = missoes.passo();
      return { tipo: 'porta', texto: ps && ps.tipo === 'falar' ? 'Falar com a ÍRIS' : 'Painel da nave' };
    }
    return null;
  }

  function golpearRecurso(hit) {
    const r = hit.recurso, regra = r.regra;
    const ferramenta = [regra.ferramenta, regra.exige].find((f) => f && inventario.tem(f)) || 'luva';
    arma.golpear(ferramenta);
    const res = recursos.bater(r, (id) => inventario.tem(id), hit.ponto);
    if (res.falta) {
      som.negado();
      const agora = performance.now();
      if (agora - avisoFalta > 2500) { avisoFalta = agora; hud.aviso(`Precisa de ${ITENS[res.falta].icone} ${ITENS[res.falta].nome}`); }
    } else if (res.quebrou) {
      coletaveis.soltar(res.itens, { x: hit.cx, y: r.y + Math.min(r.altura * 0.5, 1.3), z: hit.cz });
    }
  }

  function fazerAcao(dt) {
    if (!alvoAcao) { esperaGolpe = 0; entrada.acaoPedida = false; return; }
    const tocou = entrada.acaoPedida;
    entrada.acaoPedida = false;
    if (alvoAcao.tipo === 'recurso') {
      if (tocou) esperaGolpe = 0;
      if (tocou || entrada.segurandoAcao) {
        esperaGolpe -= dt;
        if (esperaGolpe <= 0) { esperaGolpe = 0.4; golpearRecurso(alvoAcao.hit); }
      }
      return;
    }
    if (!tocou) return;
    if (alvoAcao.tipo === 'colocar') {
      if (construcoes.colocar(alvoAcao.tipoColocacao, alvoAcao.bloco, alvoAcao.alvo)) {
        inventario.remover(modoColocar, 1);
        if (!inventario.tem(modoColocar)) { hud.aviso(`Acabou: ${ITENS[modoColocar].icone} ${ITENS[modoColocar].nome}`); sairModoColocar(); }
        else atualizarTextoColocar();
      } else som.negado();
    } else if (alvoAcao.tipo === 'construcao') {
      arma.golpear('luva');
      const id = construcoes.desmontar(alvoAcao.hit);
      inventario.adicionar(id, 1);
      marcarSujo();
      som.pegar();
      hud.aviso(`+1 ${ITENS[id].icone} ${ITENS[id].nome}`);
    } else if (alvoAcao.tipo === 'peca') {
      const pc = alvoAcao.peca;
      pecas.remover(pc);
      inventario.adicionar(pc.item, 1);
      som.pegar();
      hud.aviso(`+1 ${ITENS[pc.item].icone} ${ITENS[pc.item].nome}`);
      if (pc.item === 'rifle') {
        hud.mensagem('🎙️ Gravador: "Registro 1 de 12, Expedição Cruzeiro. Meu nome é Tavares... Se alguém achar isto, o rifle é seu."', 7);
        hud.mensagem(entrada.ultimaFonte === 'teclado'
          ? 'Pegou o Rifle de raio! Aperte R para trocar de arma. Segure o tiro 2 segundos: ele carrega e dá um tiro bem forte.'
          : 'Pegou o Rifle de raio! Apareceu o botão 💥 para trocar de arma. Segure o tiro 2 segundos: ele carrega e dá um tiro bem forte.', 7);
        hud.mensagem('Quem era o Tavares? A Expedição Cruzeiro esteve em Lúmen há 60 anos... Um mistério, Comandante.', 5);
      } else mostrarMsgs(missoes.evento('pegou', { id: pc.id }));
      salvarAgora();
    } else if (alvoAcao.tipo === 'portaRuinas') {
      if (alvoAcao.bloqueado) {
        som.negado();
        const agora = performance.now();
        if (agora - avisoFalta > 4000) {
          avisoFalta = agora;
          const ps = missoes.passo();
          hud.mensagem(ps && ps.tipo === 'abrir' ? 'Faltam pedras-chave! Tem uma em cada monólito (Leste, Oeste e Norte).' : 'Uma porta enorme de pedra, com três buracos em forma de losango. Está trancada.', 5);
        }
        return;
      }
      inventario.remover('chave', 3);
      locais.abrirPorta(true);
      som.explosao(0.5);
      tremor = 0.6;
      mostrarMsgs(missoes.evento('abriu'));
      salvarAgora();
    } else if (alvoAcao.tipo === 'porta') {
      const ps = missoes.passo();
      if (ps && ps.tipo === 'falar') { som.clique(); mostrarMsgs(missoes.evento('falou')); } else abrirPainel();
    }
  }

  function atualizar(dt) {
    if (estado === 'prologo') {
      if (!document.hidden) prologo.atualizar(dt);
      return;
    }
    if (estado === 'decolando') { atualizarDecolagem(dt); return; }
    if (estado === 'final') { if (!document.hidden) final.atualizar(dt); return; }
    if (estado !== 'jogando') {
      arma.cancelarCarga();
      nave.atualizar(dt);
      fumaca.atualizar(dt);
      return;
    }
    lerControle(dt, config.sensibilidade);
    if (entrada.pausaPedida) { entrada.pausaPedida = false; pausar(); return; }
    if (entrada.mochilaPedida) { entrada.mochilaPedida = false; abrirMochila(); return; }
    if (entrada.mapaPedido) { entrada.mapaPedido = false; abrirMapa(); return; }
    if (entrada.cancelarPedido) { entrada.cancelarPedido = false; sairModoColocar(); }
    if (entrada.trocarArmaPedida) { entrada.trocarArmaPedida = false; trocarArma(); }
    if (entrada.armaPedida) { trocarArma(entrada.armaPedida); entrada.armaPedida = null; }
    tempoJogado += dt;
    if (desmaio > 0) {
      // desmaiando: a tela escurece e não dá para fazer nada
      desmaio -= dt;
      $('cortina').style.opacity = String(Math.min(1, 1 - desmaio / 1.3));
      entrada.soltarTudo();
      if (desmaio <= 0) { desmaio = 0; acordarNaNave(); }
    } else {
      jogador.passo(dt, entrada.movimento(), entrada.pularPedido);
    }
    entrada.pularPedido = false;
    // vida volta devagar quando nada te acerta por um tempo
    semDano += dt;
    if (semDano > 6 && vida < 100 && desmaio <= 0) { vida = Math.min(100, vida + 6 * dt); hud.vida(vida / 100); }
    criaturas.atualizar(dt, jogador);
    pecas.atualizar(dt);
    mostrarMsgs(missoes.verificar(dt, ctxMissao));
    // perto do esqueleto pela primeira vez (sem susto: a ÍRIS explica)
    if (!avisouEsqueleto && !inventario.tem('rifle') && distToro(jogador.pos.x, jogador.pos.z, LOCAIS.esqueleto.x, LOCAIS.esqueleto.z) < 14) {
      avisouEsqueleto = true;
      hud.mensagem('Comandante, ali no chão... é um traje espacial bem antigo, da Expedição Cruzeiro. Tem alguém dentro, há muito tempo.', 6);
      hud.mensagem('Do lado dele tem uma arma diferente, um Rifle de raio! Chegue perto para pegar.', 5);
    }
    // deu a volta no mundo e voltou perto da nave?
    if (!volta.avisou && (volta.x || volta.z) && Math.hypot(jogador.pos.x - nave.centro.x, jogador.pos.z - nave.centro.z) < 40) {
      volta.avisou = true;
      hud.mensagem('Você deu a volta em Lúmen, Comandante! Andando sempre para o mesmo lado, voltamos para a nave.', 6);
    }
    arma.atualizar(dt, entrada.atirando, ajuda);
    alvos.atualizar(dt);
    nave.atualizar(dt);
    fumaca.atualizar(dt);
    faiscas.atualizar(dt);

    lascas.atualizar(dt);
    chamas.atualizar(dt);
    recursos.atualizar(dt, jogador.pos);
    construcoes.atualizar(dt, jogador.pos);
    peito.set(jogador.pos.x, jogador.pos.y + 1.1, jogador.pos.z);
    coletaveis.atualizar(dt, peito);

    // botão de ação: colocar, cortar/quebrar/colher (segurando), desmontar ou examinar
    alvoAcao = escolherAlvoAcao();
    acaoAtual = alvoAcao ? alvoAcao.texto : null;
    fazerAcao(dt);

    relogioSave += dt;
    if (relogioSave > 10) { relogioSave = 0; salvarAgora(); }
  }

  let tempoMenu = 0;
  function desenhar(alfa, dt) {
    const agora = performance.now();
    if (estado === 'prologo') {
      prologo.desenhar();
      render.medir(dt, agora);
      return;
    }
    if (estado === 'final') {
      final.desenhar();
      render.medir(dt, agora);
      return;
    }
    if (estado === 'jogando') {
      const [gr, gi] = entrada.consumirGiro();
      jogador.girar(gr, gi);
      jogador.posicionarCamera(camera, alfa, config.reduzirTremor);
      // acordando depois da queda: olhos abrindo (tela preta clareando), deitado e levantando
      if (acordando > 0) {
        acordando = Math.max(0, acordando - dt);
        const e = TEMPO_ACORDAR - acordando; // segundos desde que acordou
        // deitado olhando o céu, depois senta e levanta
        const sobe = Math.min(1, Math.max(0, (e - 1.0) / 2.6));
        const k = 1 - sobe * sobe * (3 - 2 * sobe);
        camera.position.y -= 1.3 * k;
        camera.rotation.x += 0.55 * k;
        camera.rotation.z += 0.5 * k;
        // dois piscares de olhos e a tela clareando
        const cortina = e < 1.4 ? 0.4 + 0.6 * Math.abs(Math.cos((e * Math.PI) / 0.7)) : Math.max(0, 1 - (e - 1.4) / 1.6) * 0.4;
        $('cortina').style.opacity = acordando === 0 ? '0' : String(cortina);
      }
    } else if (estado === 'decolando') {
      // a câmera fica onde você acordou, olhando a nave subir
      posNaveAgora.setFromMatrixPosition(nave.grupo.matrixWorld);
      const treme = decolagem.t < 4.5 ? 0.12 * Math.min(1, decolagem.t) : 0;
      camera.position.set(vale.inicio.x + (Math.random() - 0.5) * treme, grade.alturaEm(vale.inicio.x, vale.inicio.z) + 1.7 + (Math.random() - 0.5) * treme, vale.inicio.z);
      camera.lookAt(posNaveAgora.x, posNaveAgora.y + 2, posNaveAgora.z);
    } else if (estado === 'inicio' || estado === 'carregando' || estado === 'creditos') {
      tempoMenu += dt;
      const a = -0.6 + tempoMenu * 0.045;
      camera.position.set(nave.centro.x + Math.sin(a) * 27, nave.centro.y + 7.5, nave.centro.z + Math.cos(a) * 27);
      camera.lookAt(nave.centro.x, nave.centro.y + 4.5, nave.centro.z);
    }
    if (tremor > 0 && estado === 'jogando') {
      tremor = Math.max(0, tremor - dt * 1.5);
      camera.position.x += (Math.random() - 0.5) * tremor * 0.3;
      camera.position.y += (Math.random() - 0.5) * tremor * 0.3;
    }
    camera.updateMatrixWorld();
    ceu.seguir(camera.position);

    // o mundo dá a volta: cada pedaço do mundo é desenhado na cópia mais perto da câmera
    const cx = camera.position.x, cz = camera.position.z;
    const longe = cena.fog.far + 20;
    for (const lista of [terreno.pedacos, vegetacao.malhas, vegetacao.malhasCristais, locais.malhas, locais.malhasBrilho]) {
      for (const p of lista) {
        const ox = maisPerto(p.x, cx, T) - p.x, oz = maisPerto(p.z, cz, T) - p.z;
        if (p.mesh.position.x !== ox || p.mesh.position.z !== oz) { p.mesh.position.set(ox, 0, oz); p.mesh.updateMatrix(); }
        p.mesh.visible = !p.escondido && Math.hypot(p.x + ox - cx, p.z + oz - cz) - p.raio < longe;
      }
    }
    const ofs = estado === 'decolando' && decolagem ? decolagem.ofs : null;
    nave.grupo.position.x = maisPerto(vale.nave.x, cx, T) + (ofs ? ofs.x : 0);
    nave.grupo.position.z = maisPerto(vale.nave.z, cz, T) + (ofs ? ofs.z : 0);
    if (nave.destrocos) nave.destrocos.position.set(maisPerto(0, cx, T), 0, maisPerto(0, cz, T));
    for (const disco of agua.grupo.children) {
      const l = disco.userData.lago || (disco.userData.lago = { x: disco.position.x, z: disco.position.z });
      disco.position.x = maisPerto(l.x, cx, T); disco.position.z = maisPerto(l.z, cz, T);
    }
    construcoes.acompanhar(camera.position);
    criaturas.posicionar(camera.position, agora);
    pecas.acompanhar(camera.position);
    alvosTiro.lista.length = 0;
    for (const a of alvos.lista) alvosTiro.lista.push(a);
    for (const a of criaturas.alvos) alvosTiro.lista.push(a);

    // ajuda na mira (nunca atira sozinho)
    ajuda = estado === 'jogando' ? procurarAlvo(camera, alvosTiro, grade, ANGULO_MIRA[config.mira]) : null;
    entrada.fatorMira = ajuda && ajuda.angulo < ANGULO_MIRA[config.mira] * 0.7 && entrada.ultimaFonte !== 'teclado' ? 0.55 : 1;

    contadorQuadros++;

    renderer.render(cena, camera);
    const chamadas = renderer.info.render.calls, triangulos = renderer.info.render.triangles;
    if (estado === 'jogando' || estado === 'pausa' || estado === 'mochila') arma.desenhar(renderer, jogador.balanco, jogador.velHoriz, ceu.sol, ceu.ambiente, agora);
    render.medir(dt, agora);

    if (estado === 'jogando') {
      const rumoGraus = (jogador.rumo * 180) / Math.PI;
      const marcas = [{ id: 'colosso', icone: '🪐', texto: 'Colosso', rumo: ceu.rumoColosso }];
      const alvo = alvoMissao();
      tmp.set(maisPerto(nave.centro.x, jogador.pos.x, T) - jogador.pos.x, 0, maisPerto(nave.centro.z, jogador.pos.z, T) - jogador.pos.z);
      if (!alvo || !alvo.nave) marcas.push({ id: 'nave', icone: '▼', texto: `nave ${Math.round(tmp.length())} m`, rumo: (Math.atan2(tmp.x, -tmp.z) * 180) / Math.PI });
      if (alvo) {
        tmp.set(maisPerto(alvo.x, jogador.pos.x, T) - jogador.pos.x, 0, maisPerto(alvo.z, jogador.pos.z, T) - jogador.pos.z);
        marcas.push({ id: 'missao', icone: '⭐', texto: `${alvo.nave ? 'nave ' : ''}${Math.round(tmp.length())} m`, rumo: (Math.atan2(tmp.x, -tmp.z) * 180) / Math.PI });
      }
      hud.bussola(rumoGraus, marcas);
      hud.chefe(criaturas.chefePerto(jogador.pos));
      hud.mira(ajuda ? 'alvo' : 'normal');
      hud.calor(arma.atual === 'pistola' ? arma.calor : 0, arma.atual === 'pistola' && arma.travada);
      hud.carga(arma.carga);
      hud.arma(arma.atual, arma.temRifle);
      hud.acao(acaoAtual ? (entrada.ultimaFonte === 'teclado' ? `E: ${acaoAtual}` : acaoAtual) : null, !!(alvoAcao && alvoAcao.bloqueado));
      hud.contador(alvos.estourados);
    }
    if (params.debug && dt > 0) {
      fpsMedia += (1 / dt - fpsMedia) * 0.05;
      if (contadorQuadros % 10 === 0) {
        hud.debug(`${fpsMedia.toFixed(0)} qps · ${render.mediaMs.toFixed(1)} ms · ${chamadas} chamadas · ${(triangulos / 1000).toFixed(0)} mil triângulos · escala ${render.escala.toFixed(2)} · ${config.visual}\n`
          + `x ${jogador.pos.x.toFixed(1)} z ${jogador.pos.z.toFixed(1)} y ${jogador.pos.y.toFixed(1)} · tela ${renderer.domElement.width}x${renderer.domElement.height}`);
      }
    }
  }

  // missões: avisos, o que aparece no mundo e a nave com as partes já consertadas
  missoes.aoMudar(() => { marcarSujo(); atualizarRastreador(); });
  missoes.aoComecarPasso(() => {
    prepararPasso();
    hud.destacarMissao();
    if (missoes.estado.p > 0) som.objetivo();
  });
  inventario.aoMudar(atualizarRastreador);
  prepararPasso();
  locais.abrirPorta(missoes.estado.porta);
  nave.mostrarSistemas(missoes.estado.sistemas);
  atualizarRastreador();

  const laco = criarLaco({ atualizar, desenhar });
  progresso(1, 'Pronto!');
  await esperarQuadro();
  estado = 'inicio';
  atualizarMenu();
  mostrarTela('tela-inicio');
  laco.iniciar();

  if (params.debug) {
    // Gancho só para testes automáticos (com ?debug=1): ler o estado do jogo.
    window.__rumo = {
      get estado() { return estado; }, jogador, alvos, nave, renderer, config, entrada, comecar, pausar,
      inventario, recursos, construcoes, grade, abrirMochila, fecharMochila, entrarModoColocar, salvarAgora,
      prologo, iniciarNovoJogo, atualizarMenu, criaturas, abrirMapa, fecharMapa, levarDano,
      missoes, pecas, locais, painel, abrirPainel, fecharPainel, final, alvoMissao, prepararPasso, mostrarMsgs,
      get decolagem() { return decolagem; }, arma, trocarArma,
      get vida() { return vida; },
      aplicarVisual: (v) => { config.visual = v; aplicarVisual(); },
    };
  }
}

iniciar().catch((e) => {
  console.error(e);
  mostrarErro('Algo deu errado ao abrir o jogo. Tente recarregar a página.');
});
