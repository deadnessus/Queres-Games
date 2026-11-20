// O final (~14 s): depois de decolar do Vale, a Andorinha faz o salto e chega na Terra.
// Cena 3D separada (espaço), como a abertura. Dá para pular. Depois vêm os créditos (tela-final, no main.js).
import * as THREE from 'three';
import { criarAndorinha } from './prologo.js';
import { texturaTerra, texturaParticula } from '../desenho/texturas.js';
import { criarAleatorio } from '../logica/ruido.js';

export const DURACAO_FINAL = 14;

const FALAS = [
  [0.6, 4.2, 'ÍRIS', 'Salto concluído! Olha lá na frente, Comandante...'],
  [4.6, 8.4, 'ÍRIS', 'É a Terra! Nós conseguimos! Estamos voltando para casa!'],
  [8.8, 13.2, '', '"Andorinha, aqui é a Terra. Bem-vindos de volta!"'],
];
const suave = (t) => t * t * (3 - 2 * t);
const entre = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

export function criarFinal({ renderer, som }) {
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(0x01020a);
  const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 12000);
  const rnd = criarAleatorio(2026);

  const dirSol = new THREE.Vector3(-0.6, 0.4, 0.5).normalize();
  const luz = new THREE.DirectionalLight(0xfff4e0, 2.8);
  luz.position.copy(dirSol).multiplyScalar(100);
  cena.add(luz, new THREE.HemisphereLight(0x8fb0ff, 0x101020, 0.35));

  // estrelas e o Sol
  const fundo = new THREE.Group();
  cena.add(fundo);
  const pts = [];
  for (let i = 0; i < 2400; i++) {
    const u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    pts.push(Math.cos(a) * r * 6000, u * 6000, Math.sin(a) * r * 6000);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  fundo.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, sizeAttenuation: false })));
  const sol = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaParticula(), color: 0xfff0c0, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  sol.position.copy(dirSol).multiplyScalar(5000);
  sol.scale.setScalar(700);
  fundo.add(sol);

  // a Terra, com a atmosfera azul, e a Lua
  const centroTerra = new THREE.Vector3(0, -260, -3200);
  const terra = new THREE.Mesh(new THREE.SphereGeometry(900, 64, 40), new THREE.MeshLambertMaterial({ map: texturaTerra() }));
  terra.position.copy(centroTerra);
  terra.rotation.set(0.35, 0, 0.2);
  cena.add(terra);
  const atmosfera = new THREE.Mesh(new THREE.SphereGeometry(950, 48, 32), new THREE.MeshBasicMaterial({ color: 0x6ab8ff, transparent: true, opacity: 0.22, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  atmosfera.position.copy(centroTerra);
  cena.add(atmosfera);
  const lua = new THREE.Mesh(new THREE.SphereGeometry(140, 32, 20), new THREE.MeshLambertMaterial({ color: 0xbab6b0 }));
  lua.position.set(1500, 500, -2600);
  cena.add(lua);

  // a Andorinha consertada, com o motor aceso
  const nave = criarAndorinha();
  cena.add(nave.grupo);
  nave.grupo.rotation.y = Math.PI; // nariz para -z

  const $ = (id) => document.getElementById(id);
  const elFala = $('final-fala'), elQuem = $('final-quem'), elTexto = $('final-texto'), cortina = $('cortina');
  let t = 0, rodando = false, aoTerminar = null, falaAtual = -1, motor = null;
  const posNave = new THREE.Vector3();

  function atualizar(dt) {
    if (!rodando) return;
    t += dt;
    // a nave vai em direção à Terra, cada vez mais devagar
    posNave.set(Math.sin(t * 0.4) * 0.6, Math.sin(t * 0.7) * 0.3, -t * 26 + t * t * 0.6);
    nave.grupo.position.copy(posNave);
    nave.grupo.rotation.z = Math.sin(t * 0.5) * 0.08;
    nave.brilho.scale.setScalar(2.4 + Math.sin(t * 30) * 0.3);
    terra.rotation.y += dt * 0.02;
    // falas
    const f = FALAS.findIndex(([a, b]) => t >= a && t < b);
    if (f !== falaAtual) {
      falaAtual = f;
      elFala.hidden = f < 0;
      if (f >= 0) {
        const [, , quem, texto] = FALAS[f];
        elQuem.hidden = !quem;
        elQuem.textContent = quem;
        elTexto.textContent = texto;
        if (som) som.mensagem();
      }
    }
    // começa saindo do preto e termina no preto
    const escuro = Math.max(1 - entre(t, 0, 1.2), entre(t, DURACAO_FINAL - 1.2, DURACAO_FINAL));
    cortina.style.opacity = String(escuro);
    if (motor) motor.nivel(0.6 * (1 - entre(t, DURACAO_FINAL - 2, DURACAO_FINAL)));
    if (t >= DURACAO_FINAL) terminar();
  }

  function posicionarCamera() {
    if (t < 6.5) {
      // atrás e acima da nave, vendo a Terra na frente
      const k = suave(entre(t, 0, 6.5));
      camera.position.set(posNave.x + 6 - 4 * k, posNave.y + 4 + 1 * k, posNave.z + 22 - 4 * k);
      camera.lookAt(posNave.x, posNave.y, posNave.z - 40);
    } else {
      // de lado: a nave passando com a Terra enorme atrás
      const k = suave(entre(t, 6.5, DURACAO_FINAL));
      camera.position.set(posNave.x - 16 - 6 * k, posNave.y + 3, posNave.z - 8 - 6 * k);
      camera.lookAt(posNave.x, posNave.y - 2, posNave.z - 10);
    }
    fundo.position.copy(camera.position);
  }

  function terminar() {
    if (!rodando) return;
    rodando = false;
    elFala.hidden = true;
    cortina.style.opacity = '1';
    if (motor) motor.parar();
    motor = null;
    if (aoTerminar) aoTerminar();
  }

  return {
    iniciar(fim) {
      t = 0; falaAtual = -1; rodando = true; aoTerminar = fim;
      elFala.hidden = true;
      if (som) motor = som.laco('motor');
    },
    atualizar,
    desenhar() { posicionarCamera(); renderer.render(cena, camera); },
    pular() { if (rodando && t < DURACAO_FINAL - 1.2) t = DURACAO_FINAL - 1.2; },
    ajustarTela(aspecto) { camera.aspect = aspecto; camera.updateProjectionMatrix(); },
    get rodando() { return rodando; },
  };
}
