// O Desintegrador (versão de teste da Etapa 0): tiro de energia que recarrega sozinho e superaquece se
// atirar sem parar. A arma na mão é desenhada numa cena separada, por cima de tudo (não entra nas paredes).
// Ajuda na mira: o tiro vai para o alvo mais perto do centro dentro de um cone pequeno. NUNCA atira sozinho.
import * as THREE from 'three';
import { preparar, mesclar, matriz, misturarHex } from '../desenho/geometria.js';
import { texturaParticula } from '../desenho/texturas.js';

const VEL_TIRO = 75, ALCANCE = 140;
const POS_ARMA = new THREE.Vector3(0.2, -0.17, -0.4);

// Procura o alvo mais perto do centro da mira, dentro do cone (graus), que esteja à vista.
export function procurarAlvo(camera, alvos, grade, anguloGraus) {
  if (!anguloGraus) return null;
  const origem = camera.getWorldPosition(new THREE.Vector3());
  const frente = camera.getWorldDirection(new THREE.Vector3());
  const limite = Math.cos((anguloGraus * Math.PI) / 180);
  let melhor = null, melhorCos = limite;
  const v = new THREE.Vector3();
  for (const a of alvos.lista) {
    if (!a.ativo) continue;
    v.copy(a.pos).sub(origem);
    const d = v.length();
    if (d > 80 || d < 0.5) continue;
    const c = v.dot(frente) / d;
    if (c <= melhorCos) continue;
    // à vista? (o chão não está no meio)
    let visivel = true;
    for (let t = 0.15; t < 1; t += 0.12) {
      const x = origem.x + v.x * t, y = origem.y + v.y * t, z = origem.z + v.z * t;
      if (y < grade.alturaEm(x, z)) { visivel = false; break; }
    }
    if (visivel) { melhor = a; melhorCos = c; }
  }
  return melhor ? { alvo: melhor, angulo: (Math.acos(Math.min(1, melhorCos)) * 180) / Math.PI } : null;
}

export function criarArma({ camera, cena, grade, colisoes, alvos, faiscas, som }) {
  // ---- a arma na mão (cena própria, com câmera própria parada) ----
  const cenaArma = new THREE.Scene();
  const cameraArma = new THREE.PerspectiveCamera(55, 1, 0.01, 10);
  const luzAmb = new THREE.HemisphereLight(0xffffff, 0x444455, 1.1);
  const luzSol = new THREE.DirectionalLight(0xffeccc, 2.2);
  cenaArma.add(luzAmb, luzSol, luzSol.target);

  const corpo = mesclar([
    preparar(new THREE.BoxGeometry(0.1, 0.11, 0.4), (x, y) => (y > 0.03 ? 0x59606e : 0x3a3f4b), matriz(0, 0, 0)),
    preparar(new THREE.CylinderGeometry(0.03, 0.036, 0.3, 8), 0x2f333c, matriz(0, 0.012, -0.32, Math.PI / 2, 0, 0)),
    preparar(new THREE.TorusGeometry(0.04, 0.012, 6, 12), 0xc9773a, matriz(0, 0.012, -0.47)),
    preparar(new THREE.BoxGeometry(0.075, 0.17, 0.09), 0x2b2e35, matriz(0, -0.11, 0.1, 0.32, 0, 0)),
    preparar(new THREE.BoxGeometry(0.11, 0.05, 0.12), (x, y, z) => misturarHex(0xb06030, 0x80452a, (z + 0.06) * 6), matriz(0, -0.03, -0.05)),
    preparar(new THREE.CylinderGeometry(0.025, 0.025, 0.03, 8), 0xd88a3c, matriz(0.055, 0.03, 0.08, 0, 0, Math.PI / 2)),
  ]);
  const modelo = new THREE.Group();
  modelo.add(new THREE.Mesh(corpo, new THREE.MeshLambertMaterial({ vertexColors: true })));
  const matTira = new THREE.MeshBasicMaterial({ color: 0x5ff0ff });
  const tira = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.018, 0.26), matTira);
  tira.position.set(0, 0.064, -0.02);
  modelo.add(tira);
  const texBrilho = texturaParticula();
  const matFlash = new THREE.MeshBasicMaterial({ map: texBrilho, color: 0x9ff8ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const flash = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.34), matFlash);
  flash.position.set(0, 0.012, -0.52);
  flash.visible = false;
  modelo.add(flash);
  modelo.position.copy(POS_ARMA);
  modelo.scale.setScalar(0.5);
  cenaArma.add(modelo);

  // ---- tiros (conjunto reaproveitado) ----
  const geoTiro = new THREE.BoxGeometry(0.07, 0.07, 1.1);
  const matTiro = new THREE.MeshBasicMaterial({ color: 0x8ff8ff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
  const tiros = [];
  for (let i = 0; i < 16; i++) {
    const mesh = new THREE.Mesh(geoTiro, matTiro);
    mesh.visible = false;
    cena.add(mesh);
    tiros.push({ mesh, ativo: false, pos: new THREE.Vector3(), dir: new THREE.Vector3(), dist: 0 });
  }

  let calor = 0, travada = false, espera = 0, recuo = 0, tempoFlash = 0;
  const tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3();

  function faiscar(p, cor = 0xffc070, n = 10) {
    for (let k = 0; k < n; k++) {
      faiscas.soltar({
        x: p.x, y: p.y + 0.05, z: p.z,
        vx: (Math.random() - 0.5) * 5, vy: 1.5 + Math.random() * 3, vz: (Math.random() - 0.5) * 5,
        vida: 0.35 + Math.random() * 0.35, tamanho: 0.22, cresce: -0.2, cor: k % 2 ? cor : 0x8ff8ff, alfa: 1, gravidade: 12,
      });
    }
  }

  // Distância até o chão olhando nessa direção (para o tiro ir exatamente para onde a mira aponta).
  function distanciaAteChao(origem, dir) {
    for (let d = 1; d < ALCANCE; d += 1) {
      const x = origem.x + dir.x * d, y = origem.y + dir.y * d, z = origem.z + dir.z * d;
      if (y < grade.alturaEm(x, z) || colisoes.pontoDentro(x, y, z)) return d;
    }
    return 80;
  }

  function disparar(ajuda) {
    espera = 0.16;
    calor += 0.11;
    if (calor >= 1) { calor = 1; travada = true; if (som) som.superaquecido(); }
    recuo = 1;
    tempoFlash = 0.05;
    const origem = camera.getWorldPosition(new THREE.Vector3());
    const frente = camera.getWorldDirection(new THREE.Vector3());
    const pontoMira = ajuda ? ajuda.alvo.pos.clone() : origem.clone().addScaledVector(frente, distanciaAteChao(origem, frente));
    const boca = camera.localToWorld(tmp.set(0.16, -0.13, -0.75));
    const t = tiros.find((x) => !x.ativo) || tiros[0];
    t.ativo = true;
    t.pos.copy(boca);
    t.dir.copy(pontoMira).sub(boca).normalize();
    t.dist = 0;
    t.mesh.visible = true;
    t.mesh.position.copy(boca);
    t.mesh.lookAt(tmp2.copy(boca).add(t.dir));
    if (som) som.tiro();
  }

  function atualizarTiros(dt) {
    for (const t of tiros) {
      if (!t.ativo) continue;
      const total = VEL_TIRO * dt;
      let andou = 0, acabou = false;
      while (andou < total && !acabou) {
        const p = Math.min(0.8, total - andou);
        t.pos.addScaledVector(t.dir, p);
        andou += p;
        for (const a of alvos.lista) {
          if (a.ativo && t.pos.distanceTo(a.pos) < a.raio) { alvos.acertar(a); acabou = true; break; }
        }
        if (acabou) break;
        if (t.pos.y < grade.alturaEm(t.pos.x, t.pos.z) || colisoes.pontoDentro(t.pos.x, t.pos.y, t.pos.z)) {
          faiscar(t.pos);
          if (som) som.acerto();
          acabou = true;
        }
      }
      t.dist += total;
      if (acabou || t.dist > ALCANCE) { t.ativo = false; t.mesh.visible = false; continue; }
      t.mesh.position.copy(t.pos);
    }
  }

  function atualizar(dt, atirando, ajuda) {
    espera -= dt;
    calor = Math.max(0, calor - dt * (travada ? 0.5 : 0.65));
    if (travada && calor < 0.3) travada = false;
    if (atirando && !travada && espera <= 0) disparar(ajuda);
    atualizarTiros(dt);
    recuo = Math.max(0, recuo - dt * 9);
    tempoFlash -= dt;
  }

  // Animação da arma na mão (recuo, balanço ao andar) e cor da tira de calor. Chamado a cada quadro.
  const corFria = new THREE.Color(0x5ff0ff), corQuente = new THREE.Color(0xff4a2a);
  function desenhar(renderer, balanco, velHoriz, sol, ambiente, agora) {
    const k = Math.min(1, velHoriz / 4.4);
    modelo.position.set(
      POS_ARMA.x + Math.cos(balanco) * 0.012 * k,
      POS_ARMA.y + Math.abs(Math.sin(balanco)) * 0.014 * k - recuo * 0.012,
      POS_ARMA.z + recuo * 0.07,
    );
    modelo.rotation.set(recuo * 0.14, 0, 0);
    flash.visible = tempoFlash > 0;
    flash.rotation.z = Math.random() * Math.PI;
    matTira.color.copy(corFria).lerp(corQuente, calor);
    if (travada && Math.floor(agora / 120) % 2) matTira.color.setHex(0xffffff);
    // luz da cena da arma acompanha a luz do mundo (direção vista pela câmera)
    luzSol.color.copy(sol.color);
    luzSol.intensity = sol.intensity * 0.85;
    luzSol.position.copy(sol.position).sub(sol.target.position).normalize().applyQuaternion(camera.quaternion.clone().invert()).multiplyScalar(5);
    luzAmb.intensity = ambiente.intensity;
    luzAmb.color.copy(ambiente.color);
    renderer.autoClear = false;
    renderer.clearDepth();
    renderer.render(cenaArma, cameraArma);
    renderer.autoClear = true;
  }

  return {
    atualizar, desenhar,
    ajustarTela(aspecto, fov) { cameraArma.aspect = aspecto; cameraArma.fov = Math.max(50, fov * 0.95); cameraArma.updateProjectionMatrix(); },
    get calor() { return calor; },
    get travada() { return travada; },
  };
}
