// A abertura (prólogo, ~18 s): a Andorinha voando no espaço, a chuva de meteoros, o impacto, o fogo,
// a queda em Lúmen e a tela preta. Pedido do dono (20/11/2026). Dá para pular.
// É uma cena 3D separada (espaço), desenhada no lugar do Vale enquanto a abertura roda.
import * as THREE from 'three';
import { preparar, mesclar, matriz, tremer, misturarHex } from '../desenho/geometria.js';
import { texturaColosso, texturaAneis, texturaLumen, texturaParticula } from '../desenho/texturas.js';
import { criarParticulas } from '../desenho/particulas.js';
import { criarAleatorio } from '../logica/ruido.js';
import { COR } from '../desenho/paleta.js';

export const DURACAO = 18;
const IMPACTO = 10, QUEDA_FIM = 16;

// Falas na tela: [começo, fim, quem ('' = narrador), texto]
const FALAS = [
  [0.4, 3.4, '', 'Ano 2193. A nave de carga Andorinha está voltando para a Terra.'],
  [3.6, 6.3, 'ÍRIS', 'Rota para a Terra pronta, Comandante. Próximo salto em 3 minutos.'],
  [6.6, 9.8, 'ÍRIS', 'Alerta! Uma chuva de meteoros vindo direto para nós!'],
  [10.2, 12.8, 'ÍRIS', 'Impacto no casco! Estamos pegando fogo!'],
  [13.0, 16.0, 'ÍRIS', 'Vamos cair em Lúmen! Segure firme, Comandante!'],
];

const suave = (t) => t * t * (3 - 2 * t);
const entre = (t, a, b) => Math.max(0, Math.min(1, (t - a) / (b - a)));

// A Andorinha inteira (antes do acidente). A asa direita é separada: ela se solta no impacto.
export function criarAndorinha() {
  const peca = (geo, m, cor) => { geo.applyMatrix4(m); return preparar(geo, cor); };
  const casco = (x, y) => (y < 0.9 ? misturarHex(0x9aa0aa, COR.casco, (y - 0.1) / 0.8) : COR.casco);
  const corpo = mesclar([
    peca(new THREE.CylinderGeometry(1.45, 1.6, 10, 6, 2), matriz(0, 1.6, 0, Math.PI / 2, 0, 0), casco),
    peca(new THREE.BoxGeometry(0.75, 0.12, 9.6), matriz(0, 3.12, 0.2), COR.faixa),
    peca(new THREE.BoxGeometry(0.06, 0.3, 9.2), matriz(1.37, 2.12, 0.2), COR.faixa),
    peca(new THREE.BoxGeometry(0.06, 0.3, 9.2), matriz(-1.37, 2.12, 0.2), COR.faixa),
    peca(new THREE.ConeGeometry(1.45, 3.4, 6, 1), matriz(0, 1.6, 6.7, Math.PI / 2, 0, 0), COR.nariz),
    peca(new THREE.BoxGeometry(1.5, 0.5, 2.3), matriz(0, 2.75, 3.7, -0.24, 0, 0), COR.vidro),
    peca(new THREE.CylinderGeometry(1.25, 1.45, 2.2, 8, 1), matriz(0, 1.6, -6.1, Math.PI / 2, 0, 0), COR.motor),
    peca(new THREE.CylinderGeometry(1.0, 1.35, 1.4, 8, 1, true), matriz(0, 1.6, -7.8, Math.PI / 2, 0, 0), 0x3a3f4b), // bocal
    peca(new THREE.BoxGeometry(5.2, 0.22, 3.0), matriz(-3.95, 1.05, -1.3, 0, 0, 0.07), (x) => (x < -6.0 ? COR.nariz : COR.casco)),
    peca(new THREE.BoxGeometry(0.22, 2.3, 2.2), matriz(0, 3.35, -5.3, 0.35, 0, 0), COR.faixa),
  ]);
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const grupo = new THREE.Group();
  const centro = new THREE.Group(); // gira em volta do meio da nave
  centro.position.y = -1.6;
  grupo.add(centro);
  centro.add(new THREE.Mesh(corpo, mat));
  const asa = new THREE.Mesh(mesclar([peca(new THREE.BoxGeometry(5.2, 0.22, 3.0), matriz(0, 0, 0, 0, 0, -0.07), (x) => (x > 2.0 ? COR.nariz : COR.casco))]), mat);
  asa.position.set(3.95, 1.05, -1.3);
  centro.add(asa);
  // brilho azul do motor
  const brilho = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaParticula(), color: 0x7fd8ff, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  brilho.position.set(0, 1.6, -8.8);
  brilho.scale.setScalar(2.6);
  centro.add(brilho);
  return { grupo, asa, brilho };
}

export function criarPrologo({ renderer, som }) {
  const cena = new THREE.Scene();
  cena.background = new THREE.Color(0x02030a);
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 9000);
  const rnd = criarAleatorio(2193);

  // luz da Brasa e um pouco de luz ambiente
  const dirSol = new THREE.Vector3(0.75, 0.35, 0.3).normalize();
  const luzSol = new THREE.DirectionalLight(0xffe2b0, 2.6);
  luzSol.position.copy(dirSol).multiplyScalar(100);
  cena.add(luzSol, new THREE.HemisphereLight(0x8fa0ff, 0x221a33, 0.45));

  // céu: estrelas que acompanham a câmera e o brilho da Brasa
  const fundo = new THREE.Group();
  cena.add(fundo);
  const pts = [];
  for (let i = 0; i < 2600; i++) {
    const u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, r = Math.sqrt(1 - u * u);
    pts.push(Math.cos(a) * r * 4000, u * 4000, Math.sin(a) * r * 4000);
  }
  const geoEstrelas = new THREE.BufferGeometry();
  geoEstrelas.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  fundo.add(new THREE.Points(geoEstrelas, new THREE.PointsMaterial({ color: 0xffffff, size: 1.4, sizeAttenuation: false })));
  const sol = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaParticula(), color: 0xffc46a, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  sol.position.copy(dirSol).multiplyScalar(3500);
  sol.scale.setScalar(900);
  fundo.add(sol);

  // o Colosso (planeta gigante com anéis) e a lua Lúmen
  const colosso = new THREE.Mesh(new THREE.SphereGeometry(700, 48, 32), new THREE.MeshLambertMaterial({ map: texturaColosso() }));
  colosso.position.set(-2400, 700, -4200);
  colosso.rotation.set(0.5, 0.3, 0.3);
  const geoAnel = new THREE.RingGeometry(900, 1400, 96, 1);
  const pa = geoAnel.attributes.position, ua = geoAnel.attributes.uv;
  for (let i = 0; i < pa.count; i++) ua.setXY(i, (Math.hypot(pa.getX(i), pa.getY(i)) - 900) / 500, 0.5);
  const anel = new THREE.Mesh(geoAnel, new THREE.MeshBasicMaterial({ map: texturaAneis(), transparent: true, side: THREE.DoubleSide, depthWrite: false }));
  anel.rotation.x = -Math.PI / 2;
  colosso.add(anel);
  cena.add(colosso);

  const centroLumen = new THREE.Vector3(0, -700, -2600);
  const RAIO_LUMEN = 420;
  const lumen = new THREE.Mesh(new THREE.SphereGeometry(RAIO_LUMEN, 64, 40), new THREE.MeshLambertMaterial({ map: texturaLumen() }));
  lumen.position.copy(centroLumen);
  cena.add(lumen);
  const atmosfera = new THREE.Mesh(new THREE.SphereGeometry(RAIO_LUMEN * 1.06, 48, 32), new THREE.MeshBasicMaterial({ color: 0x7fd0ff, transparent: true, opacity: 0.18, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  atmosfera.position.copy(centroLumen);
  cena.add(atmosfera);

  // a nave
  const nave = criarAndorinha();
  cena.add(nave.grupo);
  nave.grupo.rotation.y = Math.PI; // nariz para -z (para frente)
  const brilhoEntrada = new THREE.Sprite(new THREE.SpriteMaterial({ map: texturaParticula(), color: 0xff8a3a, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }));
  cena.add(brilhoEntrada);

  // meteoros: pequenos (passam) e o grande (acerta a asa direita)
  const geoMeteoro = preparar(tremer(new THREE.IcosahedronGeometry(1, 1), 0.45, rnd), (x, y) => misturarHex(0x3a3028, 0x7a6858, (y + 1) / 2));
  const matMeteoro = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: 0x2a1006 });
  const meteoros = [];
  for (let i = 0; i < 26; i++) {
    const m = new THREE.Mesh(geoMeteoro, matMeteoro);
    m.visible = false;
    cena.add(m);
    meteoros.push({ m, ativo: false, vel: new THREE.Vector3(), giro: new THREE.Vector3(), rastro: 0 });
  }
  const grande = new THREE.Mesh(geoMeteoro, matMeteoro);
  grande.scale.setScalar(2.6);
  grande.visible = false;
  cena.add(grande);
  const alvoImpacto = new THREE.Vector3(-3.6, -0.5, 1.2); // onde fica a asa solta (lado esquerdo da tela)
  const inicioGrande = new THREE.Vector3(-70, 10, -380);
  const velGrande = alvoImpacto.clone().sub(inicioGrande).divideScalar(IMPACTO - 8.2);

  // partículas: fogo (soma luz) e fumaça
  const fogo = criarParticulas(cena, { max: 600, aditivo: true }); // explosões e o fogo da nave
  const rastros = criarParticulas(cena, { max: 1400, aditivo: true }); // rastros dos meteoros (separado, para não apagar o fogo)
  const fumaca = criarParticulas(cena, { max: 220 });

  // pedaços de casco voando depois do impacto
  const pedacos = [];
  for (let i = 0; i < 8; i++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.3 + rnd() * 0.5, 0.06, 0.3 + rnd() * 0.5), new THREE.MeshLambertMaterial({ color: i % 2 ? COR.casco : 0x555b66 }));
    p.visible = false;
    cena.add(p);
    pedacos.push({ p, vel: new THREE.Vector3() });
  }

  // elementos da tela (alarme vermelho, clarão, falas, botão de pular)
  const $ = (id) => document.getElementById(id);
  const elAlarme = $('prologo-alarme'), elFlash = $('prologo-flash'), elQuem = $('prologo-quem'), elTexto = $('prologo-texto'), elFala = $('prologo-fala');
  const cortina = $('cortina');

  let t = 0, rodando = false, aoTerminar = null, falaAtual = -1, proximoAlarme = 0, proximoWhoosh = 0;
  let motor = null, ronco = null, impactou = false, explodiuFim = false, asaSolta = null, tremor = 0;
  const posNave = new THREE.Vector3(), posAntes = new THREE.Vector3(), velNave = new THREE.Vector3();
  const fimQueda = centroLumen.clone().add(new THREE.Vector3(0, 0.45, 0.89).normalize().multiplyScalar(RAIO_LUMEN + 45));
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();

  function reiniciar() {
    t = 0; falaAtual = -1; proximoAlarme = 0; proximoWhoosh = 0; impactou = false; explodiuFim = false; tremor = 0;
    posNave.set(0, 0, 0);
    posAntes.set(0, 0, 0);
    velNave.set(0, 0, 0);
    nave.grupo.position.set(0, 0, 0);
    nave.grupo.rotation.set(0, Math.PI, 0);
    const centro = nave.grupo.children[0];
    if (asaSolta) { cena.remove(nave.asa); centro.add(nave.asa); asaSolta = null; }
    nave.asa.position.set(3.95, 1.05, -1.3);
    nave.asa.rotation.set(0, 0, 0);
    nave.brilho.visible = true;
    for (const x of meteoros) { x.ativo = false; x.m.visible = false; }
    grande.visible = false;
    for (const x of pedacos) x.p.visible = false;
    brilhoEntrada.material.opacity = 0;
    elFala.hidden = true;
  }

  function soltarMeteoro() {
    const x = meteoros.find((m) => !m.ativo);
    if (!x) return;
    x.ativo = true;
    x.m.visible = true;
    x.m.scale.setScalar(0.3 + rnd() * 1.1);
    x.m.position.set((rnd() - 0.5) * 110, (rnd() - 0.5) * 60, -320 - rnd() * 80);
    x.vel.set((rnd() - 0.5) * 10, (rnd() - 0.5) * 6, 130 + rnd() * 70);
    x.giro.set(rnd() * 3, rnd() * 3, rnd() * 3);
  }

  function rastro(pos, escala, quente, vel = null, dt = 0, alvo = rastros) {
    const passos = vel ? 3 : 1;
    for (let n = 0; n < passos; n++) {
      const volta = vel ? (n / passos) * dt : 0; // espalha os pontos pelo caminho andado neste passo
      alvo.soltar({
        x: pos.x - (vel ? vel.x * volta : 0) + (Math.random() - 0.5) * escala * 0.5,
        y: pos.y - (vel ? vel.y * volta : 0) + (Math.random() - 0.5) * escala * 0.5,
        z: pos.z - (vel ? vel.z * volta : 0) + (Math.random() - 0.5) * escala * 0.5,
        vx: 0, vy: 0, vz: 0, vida: 0.4, tamanho: 2.0 * escala, cresce: -2.5 * escala,
        cor: quente ? 0xffd27a : 0xff7a2a, alfa: 0.85,
      });
    }
  }

  function explodir(ponto, forca) {
    for (let k = 0; k < 70 * forca; k++) {
      const a = Math.random() * Math.PI * 2, b = (Math.random() - 0.5) * Math.PI, v = 4 + Math.random() * 10 * forca;
      fogo.soltar({
        x: ponto.x, y: ponto.y, z: ponto.z,
        vx: Math.cos(a) * Math.cos(b) * v, vy: Math.sin(b) * v, vz: Math.sin(a) * Math.cos(b) * v,
        vida: 0.5 + Math.random() * 0.6, tamanho: 1.6 + Math.random() * 1.5, cresce: 1.5,
        cor: [0xffffff, 0xffd27a, 0xff8a2a, 0xff4a1a][k % 4], alfa: 1,
      });
    }
    for (let k = 0; k < 25; k++) {
      fumaca.soltar({
        x: ponto.x, y: ponto.y, z: ponto.z,
        vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, vz: (Math.random() - 0.5) * 5,
        vida: 1.4, tamanho: 1.6, cresce: 1.8, cor: 0x2e2a28, alfa: 0.45,
      });
    }
  }

  function atualizar(dt) {
    if (!rodando) return;
    t += dt;

    // falas
    const i = FALAS.findIndex(([a, b]) => t >= a && t < b);
    if (i !== falaAtual) {
      falaAtual = i;
      elFala.hidden = i < 0;
      if (i >= 0) {
        const [, , quem, texto] = FALAS[i];
        elQuem.hidden = !quem;
        elQuem.textContent = quem;
        elTexto.textContent = texto;
        if (quem && som) som.mensagem();
      }
    }

    // motor e ronco da queda
    if (!motor && som) { motor = som.laco('motor'); motor.nivel(1); }
    if (t > IMPACTO && !ronco && som) ronco = som.laco('ronco');
    if (ronco) ronco.nivel(entre(t, IMPACTO, QUEDA_FIM) * 0.9 + 0.1);

    // alarme
    const comAlarme = t > 6.5 && t < QUEDA_FIM;
    elAlarme.style.opacity = comAlarme ? String(0.18 + 0.18 * Math.sin(t * 9)) : '0';
    if (comAlarme && t > proximoAlarme) { proximoAlarme = t + 0.75; if (som) som.alarme(); }

    // meteoros pequenos (6 s até o fim da queda)
    if (t > 6 && t < 11.5 && Math.random() < dt * 9) soltarMeteoro();
    for (const x of meteoros) {
      if (!x.ativo) continue;
      x.m.position.addScaledVector(x.vel, dt);
      x.m.rotation.x += x.giro.x * dt; x.m.rotation.y += x.giro.y * dt;
      rastro(x.m.position, x.m.scale.x, false, x.vel, dt);
      if (t > proximoWhoosh && x.m.position.z > -20 && x.m.position.z < 0) { proximoWhoosh = t + 0.35; if (som) som.meteoroPassando(); }
      if (x.m.position.z > 60) { x.ativo = false; x.m.visible = false; }
    }

    // o meteoro grande: aparece em 8,2 s e chega na asa direita no impacto
    if (t > 8.2 && t < IMPACTO) {
      grande.visible = true;
      grande.position.lerpVectors(inicioGrande, alvoImpacto, entre(t, 8.2, IMPACTO));
      grande.rotation.x += dt * 2; grande.rotation.z += dt * 1.3;
      rastro(grande.position, 2.4, true, velGrande, dt);
      rastro(grande.position, 2.4, false, velGrande, dt);
    }
    if (t >= IMPACTO && !impactou) {
      impactou = true;
      grande.visible = false;
      tremor = 1.6;
      explodir(alvoImpacto, 1.4);
      if (som) som.explosao(1);
      // a asa direita se solta e sai girando
      const centro = nave.grupo.children[0];
      nave.asa.getWorldPosition(tmp);
      centro.remove(nave.asa);
      cena.add(nave.asa);
      nave.asa.position.copy(tmp);
      asaSolta = { vel: new THREE.Vector3(-14, 5, 9), giro: new THREE.Vector3(3, 1.5, 4) };
      for (const x of pedacos) {
        x.p.visible = true;
        x.p.position.copy(alvoImpacto);
        x.vel.set(-8 - Math.random() * 10, (Math.random() - 0.3) * 10, (Math.random() - 0.5) * 14);
      }
    }
    if (asaSolta) {
      nave.asa.position.addScaledVector(asaSolta.vel, dt);
      nave.asa.rotation.x += asaSolta.giro.x * dt; nave.asa.rotation.y += asaSolta.giro.y * dt; nave.asa.rotation.z += asaSolta.giro.z * dt;
    }
    for (const x of pedacos) if (x.p.visible) { x.p.position.addScaledVector(x.vel, dt); x.p.rotation.x += dt * 6; x.p.rotation.y += dt * 4; }

    // a queda em Lúmen
    if (t > IMPACTO + 0.4) {
      const k = entre(t, IMPACTO + 0.4, QUEDA_FIM);
      posAntes.copy(posNave);
      posNave.lerpVectors(new THREE.Vector3(0, 0, 0), fimQueda, k * k);
      velNave.copy(posNave).sub(posAntes).divideScalar(Math.max(dt, 1e-4));
      nave.grupo.position.copy(posNave);
      // aponta o nariz para Lúmen e vai rodando
      tmp.copy(centroLumen).sub(posNave).normalize();
      const alvoRot = Math.atan2(-tmp.x, -tmp.z);
      nave.grupo.rotation.set(0.15 + k * 0.6, Math.PI + alvoRot * k, Math.sin(t * 1.7) * 0.5 * k + k * 1.2, 'YXZ');
      nave.brilho.visible = Math.random() > 0.5 * k + 0.3;
      // fogo saindo do lugar da asa
      nave.grupo.localToWorld(tmp2.set(2.2, -0.5, -1.3)); // onde ficava a asa (no espaço da nave o nariz é +z)
      rastro(tmp2, 1.5, true, velNave, dt, fogo);
      rastro(tmp2, 1.2, false, velNave, dt, fogo);
      if (Math.random() < 0.4) fumaca.soltar({ x: tmp2.x, y: tmp2.y, z: tmp2.z, vx: 0, vy: 0, vz: 0, vida: 1.4, tamanho: 1.4, cresce: 2, cor: 0x302a28, alfa: 0.4 });
      // entrando na atmosfera: brilho laranja na frente
      const calor = entre(t, 12.5, QUEDA_FIM);
      brilhoEntrada.material.opacity = calor * 0.55;
      nave.grupo.localToWorld(brilhoEntrada.position.set(0, 0, 9));
      brilhoEntrada.scale.setScalar(6 + calor * 9);
      if (calor > 0) for (let n = 0; n < 2; n++) { nave.grupo.localToWorld(tmp2.set((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3, 1 + Math.random() * 8)); rastro(tmp2, 1.8, true); }
      tremor = Math.max(tremor, 0.25 + calor * 0.9);
    }
    tremor = Math.max(0, tremor - dt * 1.2);

    fogo.atualizar(dt);
    rastros.atualizar(dt);
    fumaca.atualizar(dt);

    // fim: clarão e tela preta
    const flash = t > QUEDA_FIM - 0.15 && t < QUEDA_FIM + 0.25 ? 1 - entre(t, QUEDA_FIM, QUEDA_FIM + 0.25) : t >= IMPACTO && t < IMPACTO + 0.25 ? 0.8 - entre(t, IMPACTO, IMPACTO + 0.25) * 0.8 : 0;
    elFlash.style.opacity = String(Math.max(0, flash));
    cortina.style.opacity = t >= QUEDA_FIM + 0.2 ? '1' : '0';
    if (t >= QUEDA_FIM && !explodiuFim) {
      explodiuFim = true;
      if (som) som.explosao(0.6);
      if (motor) motor.parar();
      if (ronco) ronco.parar();
      motor = ronco = null;
      elFala.hidden = true;
      elAlarme.style.opacity = '0';
    }
    if (t >= DURACAO) terminar();
  }

  function posicionarCamera() {
    const sacode = tremor * 0.35;
    if (t < 6) {
      // de lado, mostrando a nave inteira com o Colosso e Lúmen no fundo
      const k = suave(entre(t, 0, 6));
      camera.position.set(19 - 7 * k, 4 + 2 * k, 10 + 12 * k);
      camera.lookAt(0, -1 - k, -6 * k);
    } else if (t < IMPACTO + 0.4) {
      // atrás e acima, vendo os meteoros chegarem pela frente
      camera.position.set(Math.sin(t * 0.7) * 0.8, 5.5, 19);
      camera.lookAt(0, 0, -30);
    } else {
      // atrás, acima e de lado: a nave em chamas e Lúmen crescendo lá embaixo
      tmp.copy(centroLumen).sub(posNave).normalize();
      camera.position.copy(posNave).addScaledVector(tmp, -16).add(tmp2.set(7, 7, 0));
      camera.lookAt(posNave);
    }
    if (sacode > 0) {
      camera.position.x += (Math.random() - 0.5) * sacode;
      camera.position.y += (Math.random() - 0.5) * sacode;
      camera.rotation.z += (Math.random() - 0.5) * sacode * 0.05;
    }
    fundo.position.copy(camera.position);
  }

  function desenhar() {
    posicionarCamera();
    renderer.render(cena, camera);
  }

  function terminar() {
    if (!rodando) return;
    rodando = false;
    if (motor) motor.parar();
    if (ronco) ronco.parar();
    motor = ronco = null;
    elFala.hidden = true;
    elAlarme.style.opacity = '0';
    elFlash.style.opacity = '0';
    cortina.style.opacity = '1';
    if (aoTerminar) aoTerminar();
  }

  return {
    iniciar(fim) { reiniciar(); aoTerminar = fim; rodando = true; cortina.style.opacity = '0'; },
    atualizar, desenhar,
    // Pular: vai direto para o clarão do fim.
    pular() { if (rodando && t < QUEDA_FIM - 0.2) { t = QUEDA_FIM - 0.2; if (!impactou) impactou = true; } },
    ajustarTela(aspecto, alturaPixels) {
      camera.aspect = aspecto;
      camera.updateProjectionMatrix();
      for (const p of [fogo, rastros, fumaca]) p.definirEscala(alturaPixels, 60);
    },
    irPara(segundos) { reiniciar(); rodando = true; t = 0; while (t < segundos) atualizar(1 / 30); },
    get tempo() { return t; },
    get rodando() { return rodando; },
  };
}
