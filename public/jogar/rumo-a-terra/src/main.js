// Rumo à Terra — Etapa 0 (fundação): andar, olhar, pular e treinar a mira no Vale da Queda.
// Liga tudo: carregamento em etapas, telas, laço do jogo, controles, céu, mundo e a arma de teste.
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
import { mostrarTela, progresso, mostrarErro, ligarOpcoes } from './ui/telas.js';

const $ = (id) => document.getElementById(id);
const esperarQuadro = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const ehToque = () => matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

const config = carregarConfig();
const params = parametros();
if (params.visual) config.visual = params.visual;
entrada.inverterY = config.inverterY;
definirVolume(config.volume);

let estado = 'carregando'; // carregando | inicio | prologo | jogando | pausa | mochila
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

  progresso(0.45, 'Plantando a grama-pena...');
  await esperarQuadro();
  const livres = [
    { x: vale.nave.x, z: vale.nave.z, r: 15 },
    { x: vale.inicio.x, z: vale.inicio.z, r: 5 },
    ...vale.alvos.map((a) => ({ x: a.x, z: a.z, r: 3.5 })),
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
  const arma = criarArma({ camera, cena, grade, colisoes, alvos: alvosTiro, faiscas, som });

  // ---- coleta, mochila, criar e construir (salvo neste aparelho) ----
  const save = carregarSave();
  const inventario = criarInventario(save ? save.inventario : []);
  const recursos = criarRecursos({ lista: vegetacao.recursos, colisoes, lascas, som, tamanho: vale.tamanho });
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
    sujo = !gravarSave(montarSave({ inventario: inventario.lista(), ...construcoes.serializar(), tempoJogado, pos }));
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
    aoMorrer: (c, itens, p) => { if (itens.length) coletaveis.soltar(itens, p); },
    aoVer: (tipo) => hud.mensagem(AVISOS_BICHO[tipo], 5),
  });
  function levarDano(n) {
    if (estado !== 'jogando' || desmaio > 0 || acordando > 1) return;
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
    nave.casco.material = m.nave;
    if (nave.destrocos) nave.destrocos.material = m.nave;
    render.definir(config.visual, config.qualidade);
    const longe = config.qualidade === 'leve' ? 125 : 165;
    cena.fog.far = longe;
    cena.fog.near = longe * 0.22;
    document.body.classList.toggle('botoes-grandes', config.botoes === 'grande');
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
    verificarGiro();
  }
  const prologo = criarPrologo({ renderer, som });
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
  const temJogoSalvo = () => !!carregarSave() || inventario.lista().length > 0 || construcoes.total > 0;
  function atualizarMenu() {
    salvarAgora();
    const tem = temJogoSalvo();
    $('btn-continuar-jogo').hidden = !tem;
    $('btn-novo-jogo').classList.toggle('grande', !tem);
    const info = $('info-save');
    info.hidden = !tem;
    if (tem) {
      const itens = inventario.lista().reduce((soma, [, n]) => soma + n, 0);
      info.textContent = `Guardado neste aparelho: ${itens} ${itens === 1 ? 'item' : 'itens'} na mochila e ${construcoes.total} ${construcoes.total === 1 ? 'construção' : 'construções'}.`;
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
    vida = 100; desmaio = 0; semDano = 99;
    hud.vida(1);
    volta.x = volta.z = 0; volta.avisou = false;
    jogador.reposicionar(vale.inicio.x, vale.inicio.z, vale.inicio.olhar);
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
      if (!acordou && inventario.lista().length + construcoes.total > 0) {
        hud.mensagem('Bem-vindo de volta, Comandante! Suas coisas estão onde você deixou.', 4);
        return;
      }
      hud.mensagem('Comandante... está me ouvindo? A Andorinha caiu, mas você está inteiro!', 4);
      hud.mensagem(entrada.ultimaFonte === 'toque' || ehToque()
        ? 'Dedão esquerdo: andar. Dedão direito: arrastar para olhar em volta.'
        : 'W A S D para andar, o mouse para olhar, Espaço para pular.', 5);
      hud.mensagem('Achei bolhas de cristal flutuando perto da nave. Treine a mira nelas!', 5);
      hud.mensagem('Dica: mire no tronco de uma árvore e segure ✋ para pegar madeira. Na 🎒 dá para criar ferramentas e blocos.', 6);
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
    inventario,
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
    mapa.desenhar($('mapa-canvas'), { jogador, nave: nave.centro, fogueiras: construcoes.listaFogueiras(), blocos: construcoes.listaBlocos() });
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
    const hr = recursos.mirar(olho, dirOlhar);
    const hc = construcoes.mirar(olho, dirOlhar, recursos.ALCANCE);
    if (hc && (!hr || hc.distancia < hr.distancia)) return { tipo: 'construcao', hit: hc, texto: 'Desmontar' };
    if (hr) {
      const regra = hr.recurso.regra;
      if (regra.exige && !inventario.tem(regra.exige)) return { tipo: 'recurso', hit: hr, texto: `Precisa de ${ITENS[regra.exige].nome.split(' ')[0].toLowerCase()}`, bloqueado: true };
      return { tipo: 'recurso', hit: hr, texto: regra.verbo };
    }
    const d = Math.hypot(jogador.pos.x - nave.porta.x, jogador.pos.z - nave.porta.z);
    if (d < 4.2) return { tipo: 'porta', texto: 'Examinar' };
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
    } else if (alvoAcao.tipo === 'porta') {
      som.clique();
      hud.mensagem('A Andorinha está sem energia e a porta não abre. Primeiro precisamos achar a bateria principal.', 5);
      hud.mensagem('(Isso chega na Etapa 1. Por enquanto: explorar, pegar materiais, criar e construir.)', 4);
    }
  }

  function atualizar(dt) {
    if (estado === 'prologo') {
      if (!document.hidden) prologo.atualizar(dt);
      return;
    }
    if (estado !== 'jogando') {
      nave.atualizar(dt);
      fumaca.atualizar(dt);
      return;
    }
    lerControle(dt, config.sensibilidade);
    if (entrada.pausaPedida) { entrada.pausaPedida = false; pausar(); return; }
    if (entrada.mochilaPedida) { entrada.mochilaPedida = false; abrirMochila(); return; }
    if (entrada.mapaPedido) { entrada.mapaPedido = false; abrirMapa(); return; }
    if (entrada.cancelarPedido) { entrada.cancelarPedido = false; sairModoColocar(); }
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
    } else if (estado === 'inicio' || estado === 'carregando') {
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
    const cx = camera.position.x, cz = camera.position.z, T = vale.tamanho;
    const longe = cena.fog.far + 20;
    for (const lista of [terreno.pedacos, vegetacao.malhas, vegetacao.malhasCristais]) {
      for (const p of lista) {
        const ox = maisPerto(p.x, cx, T) - p.x, oz = maisPerto(p.z, cz, T) - p.z;
        if (p.mesh.position.x !== ox || p.mesh.position.z !== oz) { p.mesh.position.set(ox, 0, oz); p.mesh.updateMatrix(); }
        p.mesh.visible = Math.hypot(p.x + ox - cx, p.z + oz - cz) - p.raio < longe;
      }
    }
    nave.grupo.position.x = maisPerto(vale.nave.x, cx, T);
    nave.grupo.position.z = maisPerto(vale.nave.z, cz, T);
    if (nave.destrocos) nave.destrocos.position.set(maisPerto(0, cx, T), 0, maisPerto(0, cz, T));
    for (const disco of agua.grupo.children) {
      const l = disco.userData.lago || (disco.userData.lago = { x: disco.position.x, z: disco.position.z });
      disco.position.x = maisPerto(l.x, cx, T); disco.position.z = maisPerto(l.z, cz, T);
    }
    construcoes.acompanhar(camera.position);
    criaturas.posicionar(camera.position, agora);
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
      tmp.copy(nave.centro).sub(jogador.pos);
      const rumoNave = (Math.atan2(tmp.x, -tmp.z) * 180) / Math.PI;
      hud.bussola(rumoGraus, [
        { id: 'colosso', icone: '🪐', texto: 'Colosso', rumo: ceu.rumoColosso },
        { id: 'nave', icone: '▼', texto: `nave ${Math.round(tmp.length())} m`, rumo: rumoNave },
      ]);
      hud.mira(ajuda ? 'alvo' : 'normal');
      hud.calor(arma.calor, arma.travada);
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
      get vida() { return vida; },
      aplicarVisual: (v) => { config.visual = v; aplicarVisual(); },
    };
  }
}

iniciar().catch((e) => {
  console.error(e);
  mostrarErro('Algo deu errado ao abrir o jogo. Tente recarregar a página.');
});
