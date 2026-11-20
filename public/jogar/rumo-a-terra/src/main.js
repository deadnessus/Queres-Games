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
import { mostrarTela, progresso, mostrarErro, ligarOpcoes } from './ui/telas.js';

const $ = (id) => document.getElementById(id);
const esperarQuadro = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));
const ehToque = () => matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

const config = carregarConfig();
const params = parametros();
if (params.visual) config.visual = params.visual;
entrada.inverterY = config.inverterY;
definirVolume(config.volume);

let estado = 'carregando'; // carregando | inicio | jogando | pausa
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
  const jogador = criarJogador({
    def: vale, grade, colisoes, som,
    aoAguaFunda() {
      const agora = performance.now();
      if (agora - avisoAgua > 7000) { avisoAgua = agora; hud.mensagem('Cuidado, Comandante! A água ali é funda demais.', 3); }
    },
  });
  const alvos = criarAlvos({ def: vale, grade, cena, particulas: faiscas, som });
  const arma = criarArma({ camera, cena, grade, colisoes, alvos, faiscas, som });

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
    fumaca.definirEscala(altura, vfov);
    faiscas.definirEscala(altura, vfov);
    verificarGiro();
  }
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

  function comecar() {
    destravarAudio();
    som.clique();
    som.ligarVento();
    estado = 'jogando';
    mostrarTela(null);
    $('hud').hidden = false;
    entrada.soltarTudo();
    toque.ligar();
    if (!jaJogou) {
      jaJogou = true;
      hud.mensagem('Comandante, está me ouvindo? A Andorinha caiu, mas você está inteiro!', 4);
      hud.mensagem(entrada.ultimaFonte === 'toque' || ehToque()
        ? 'Dedão esquerdo: andar. Dedão direito: arrastar para olhar em volta.'
        : 'W A S D para andar, o mouse para olhar, Espaço para pular.', 5);
      hud.mensagem('Achei bolhas de cristal flutuando perto da nave. Treine a mira nelas!', 5);
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
    estado = 'inicio';
    $('hud').hidden = true;
    hud.limparMensagens();
    mostrarTela('tela-inicio');
    retomarAudio();
  }

  $('btn-jogar').addEventListener('click', comecar);
  $('btn-opcoes').addEventListener('click', () => { voltarDasOpcoes = 'tela-inicio'; opcoes.preencher(); mostrarTela('tela-opcoes'); });
  $('btn-opcoes-pausa').addEventListener('click', () => { voltarDasOpcoes = 'tela-pausa'; opcoes.preencher(); mostrarTela('tela-opcoes'); });
  $('btn-voltar-opcoes').addEventListener('click', () => { som.clique(); mostrarTela(voltarDasOpcoes); });
  $('btn-continuar').addEventListener('click', continuar);
  $('btn-sair').addEventListener('click', sairParaInicio);
  $('btn-pausar').addEventListener('click', pausar);
  $('btn-recarregar').addEventListener('click', () => location.reload());

  // Pausa sozinho quando a criança troca de app ou a aba esconde.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { pausar(); pausarAudio(); }
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

  function atualizar(dt) {
    if (estado !== 'jogando') {
      nave.atualizar(dt);
      fumaca.atualizar(dt);
      return;
    }
    lerControle(dt, config.sensibilidade);
    if (entrada.pausaPedida) { entrada.pausaPedida = false; pausar(); return; }
    jogador.passo(dt, entrada.movimento(), entrada.pularPedido);
    entrada.pularPedido = false;
    arma.atualizar(dt, entrada.atirando, ajuda);
    alvos.atualizar(dt);
    nave.atualizar(dt);
    fumaca.atualizar(dt);
    faiscas.atualizar(dt);

    // ação perto da porta da nave
    const d = Math.hypot(jogador.pos.x - nave.porta.x, jogador.pos.z - nave.porta.z);
    acaoAtual = d < 4.2 ? 'Examinar' : null;
    if (entrada.acaoPedida) {
      entrada.acaoPedida = false;
      if (acaoAtual) {
        som.clique();
        hud.mensagem('A Andorinha está sem energia e a porta não abre. Primeiro precisamos achar a bateria principal.', 5);
        hud.mensagem('(Isso chega na Etapa 1. Por enquanto: andar, olhar, pular e treinar a mira.)', 4);
      }
    }
  }

  let tempoMenu = 0;
  function desenhar(alfa, dt) {
    const agora = performance.now();
    if (estado === 'jogando') {
      const [gr, gi] = entrada.consumirGiro();
      jogador.girar(gr, gi);
      jogador.posicionarCamera(camera, alfa, config.reduzirTremor);
    } else if (estado === 'inicio' || estado === 'carregando') {
      tempoMenu += dt;
      const a = -0.6 + tempoMenu * 0.045;
      camera.position.set(nave.centro.x + Math.sin(a) * 27, nave.centro.y + 7.5, nave.centro.z + Math.cos(a) * 27);
      camera.lookAt(nave.centro.x, nave.centro.y + 4.5, nave.centro.z);
    }
    camera.updateMatrixWorld();
    ceu.seguir(camera.position);

    // ajuda na mira (nunca atira sozinho)
    ajuda = estado === 'jogando' ? procurarAlvo(camera, alvos, grade, ANGULO_MIRA[config.mira]) : null;
    entrada.fatorMira = ajuda && ajuda.angulo < ANGULO_MIRA[config.mira] * 0.7 && entrada.ultimaFonte !== 'teclado' ? 0.55 : 1;

    // esconde pedaços longe (atrás da névoa)
    if (contadorQuadros++ % 8 === 0) {
      const longe = cena.fog.far + 20;
      for (const lista of [terreno.pedacos, vegetacao.malhas]) {
        for (const p of lista) p.mesh.visible = Math.hypot(p.x - camera.position.x, p.z - camera.position.z) - p.raio < longe;
      }
    }

    renderer.render(cena, camera);
    const chamadas = renderer.info.render.calls, triangulos = renderer.info.render.triangles;
    if (estado === 'jogando' || estado === 'pausa') arma.desenhar(renderer, jogador.balanco, jogador.velHoriz, ceu.sol, ceu.ambiente, agora);
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
      hud.acao(acaoAtual ? (entrada.ultimaFonte === 'teclado' ? `E: ${acaoAtual}` : acaoAtual) : null);
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
  mostrarTela('tela-inicio');
  laco.iniciar();

  if (params.debug) {
    // Gancho só para testes automáticos (com ?debug=1): ler o estado do jogo.
    window.__rumo = {
      get estado() { return estado; }, jogador, alvos, nave, renderer, config, entrada, comecar, pausar,
      aplicarVisual: (v) => { config.visual = v; aplicarVisual(); },
    };
  }
}

iniciar().catch((e) => {
  console.error(e);
  mostrarErro('Algo deu errado ao abrir o jogo. Tente recarregar a página.');
});
