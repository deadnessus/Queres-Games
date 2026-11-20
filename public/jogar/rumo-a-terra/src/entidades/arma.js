// As armas: o Desintegrador (tiro de energia que recarrega sozinho e superaquece se atirar sem parar) e o
// Rifle de raio (achado com o esqueleto do Tavares, perto da nave): segurando o tiro, ele carrega por 2 segundos
// e solta um raio bem mais forte, que também atinge quem está perto de onde bateu. Só uma arma de cada vez;
// o botão de trocar aparece depois de pegar o rifle.
// A arma na mão é desenhada numa cena separada, por cima de tudo (não entra nas paredes).
// Ajuda na mira: o tiro vai para o alvo mais perto do centro dentro de um cone pequeno. NUNCA atira sozinho.
import * as THREE from 'three';
import { preparar, mesclar, matriz, misturarHex } from '../desenho/geometria.js';
import { texturaParticula } from '../desenho/texturas.js';

const VEL_TIRO = 75, VEL_RAIO = 120, ALCANCE = 140;
const POS_ARMA = new THREE.Vector3(0.2, -0.17, -0.4);
const POS_RIFLE = new THREE.Vector3(0.21, -0.2, -0.42);
export const TEMPO_CARGA = 2; // segundos segurando o tiro até o rifle disparar (pedido do dono)
export const DANO = { pistola: 1, rifle: 12, respingo: 5 }; // o raio também atinge quem está a até 3,5 m de onde bateu
const RAIO_RESPINGO = 3.5;

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

export function criarArma({ camera, cena, grade, colisoes, alvos, faiscas, som, aoTiroForte }) {
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

  // ---- o Rifle de raio (grande: cano comprido, bobinas que acendem ao carregar, mira em cima e coronha) ----
  const corpoRifle = mesclar([
    preparar(new THREE.BoxGeometry(0.13, 0.15, 0.62), (x, y) => (y > 0.04 ? 0x4a5060 : 0x2e323c), matriz(0, 0, 0)),
    preparar(new THREE.CylinderGeometry(0.045, 0.055, 0.62, 10), 0x2a2d35, matriz(0, 0.02, -0.6, Math.PI / 2, 0, 0)),
    preparar(new THREE.CylinderGeometry(0.075, 0.06, 0.12, 10), 0x3a3f4b, matriz(0, 0.02, -0.94, Math.PI / 2, 0, 0)),
    preparar(new THREE.BoxGeometry(0.1, 0.13, 0.3), (x, y, z) => misturarHex(0x7a4a8a, 0x5a2f6a, z * 3 + 0.5), matriz(0, -0.03, 0.42, 0.12, 0, 0)), // coronha
    preparar(new THREE.BoxGeometry(0.08, 0.17, 0.09), 0x22252c, matriz(0, -0.14, 0.12, 0.3, 0, 0)), // cabo
    preparar(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 8), 0x1a1d24, matriz(0, 0.13, -0.05, Math.PI / 2, 0, 0)), // mira
    preparar(new THREE.CircleGeometry(0.03, 8), 0xff6ad5, matriz(0, 0.13, -0.161, 0, Math.PI, 0)),
    preparar(new THREE.BoxGeometry(0.03, 0.05, 0.04), 0x2a2d35, matriz(0, 0.09, -0.05)),
    preparar(new THREE.BoxGeometry(0.14, 0.04, 0.2), 0xff9a40, matriz(0, -0.06, -0.18)), // faixa laranja da Expedição
  ]);
  const modeloRifle = new THREE.Group();
  modeloRifle.add(new THREE.Mesh(corpoRifle, new THREE.MeshLambertMaterial({ vertexColors: true })));
  const matBobina = new THREE.MeshBasicMaterial({ color: 0x6a2a5a });
  for (const z of [-0.42, -0.58, -0.74]) {
    const b = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.018, 6, 14), matBobina);
    b.position.set(0, 0.02, z);
    modeloRifle.add(b);
  }
  const matCarga = new THREE.MeshBasicMaterial({ map: texBrilho, color: 0xff8ae8, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const brilhoCarga = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.4), matCarga);
  brilhoCarga.position.set(0, 0.02, -1.02);
  modeloRifle.add(brilhoCarga);
  const flashRifle = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), new THREE.MeshBasicMaterial({ map: texBrilho, color: 0xffb0f0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  flashRifle.position.set(0, 0.02, -1.1);
  flashRifle.visible = false;
  modeloRifle.add(flashRifle);
  modeloRifle.position.copy(POS_RIFLE);
  modeloRifle.scale.setScalar(0.5);
  modeloRifle.visible = false;
  cenaArma.add(modeloRifle);
  let armaAtual = 'pistola', temRifle = false, troca = 0, trocarPara = null, carga = 0, somCarga = null;

  // ---- ferramentas na mão (para coletar): luva, machado de pedra e picareta de pedra ----
  const matFerr = new THREE.MeshLambertMaterial({ vertexColors: true });
  const cabo = (comp) => preparar(new THREE.CylinderGeometry(0.016, 0.02, comp, 6), (x, y) => (y < -comp * 0.3 ? 0x5a3b26 : 0x8a5a3c), matriz(0, 0, 0));
  const ferramentas = {
    luva: new THREE.Mesh(mesclar([
      preparar(new THREE.BoxGeometry(0.085, 0.07, 0.11), 0xd8743b, matriz(0, 0, 0)),
      preparar(new THREE.BoxGeometry(0.085, 0.03, 0.05), 0xb85f30, matriz(0, -0.03, -0.07)),
      preparar(new THREE.BoxGeometry(0.03, 0.035, 0.05), 0xb85f30, matriz(-0.055, -0.01, -0.01)),
      preparar(new THREE.CylinderGeometry(0.045, 0.05, 0.08, 8), 0x3a3f4b, matriz(0, 0.01, 0.09, Math.PI / 2, 0, 0)),
    ]), matFerr),
    machado: new THREE.Mesh(mesclar([
      cabo(0.42),
      preparar(new THREE.BoxGeometry(0.13, 0.075, 0.035), (x) => (x > 0.04 ? 0xa59fb8 : 0x77708a), matriz(0.05, 0.17, 0)),
      preparar(new THREE.BoxGeometry(0.03, 0.05, 0.045), 0xf2a03c, matriz(-0.005, 0.17, 0)),
    ]), matFerr),
    picareta: new THREE.Mesh(mesclar([
      cabo(0.44),
      preparar(new THREE.BoxGeometry(0.3, 0.04, 0.035), (x) => (Math.abs(x) > 0.1 ? 0xa59fb8 : 0x77708a), matriz(0, 0.19, 0, 0, 0, 0)),
      preparar(new THREE.BoxGeometry(0.035, 0.05, 0.045), 0xf2a03c, matriz(0, 0.19, 0)),
    ]), matFerr),
  };
  const POS_MAO = new THREE.Vector3(0.24, -0.26, -0.42);
  const mao = new THREE.Group();
  for (const f of Object.values(ferramentas)) { f.visible = false; mao.add(f); }
  mao.position.copy(POS_MAO);
  mao.visible = false;
  cenaArma.add(mao);
  let tempoMao = 0, golpe = 0, ferramentaAtual = 'luva';

  // ---- tiros (conjunto reaproveitado) ----
  const geoTiro = new THREE.BoxGeometry(0.07, 0.07, 1.1);
  const matTiro = new THREE.MeshBasicMaterial({ color: 0x8ff8ff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
  const geoRaio = new THREE.BoxGeometry(0.26, 0.26, 3);
  const matRaio = new THREE.MeshBasicMaterial({ color: 0xff9af0, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
  const tiros = [];
  for (let i = 0; i < 18; i++) {
    const forte = i >= 16;
    const mesh = new THREE.Mesh(forte ? geoRaio : geoTiro, forte ? matRaio : matTiro);
    mesh.visible = false;
    cena.add(mesh);
    tiros.push({ mesh, forte, ativo: false, pos: new THREE.Vector3(), dir: new THREE.Vector3(), dist: 0 });
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

  function disparar(ajuda, forte = false) {
    if (forte) { espera = 0.7; recuo = 2.2; tempoFlash = 0.09; if (aoTiroForte) aoTiroForte(); } else {
      espera = 0.16;
      calor += 0.11;
      if (calor >= 1) { calor = 1; travada = true; if (som) som.superaquecido(); }
      recuo = 1;
      tempoFlash = 0.05;
    }
    const origem = camera.getWorldPosition(new THREE.Vector3());
    const frente = camera.getWorldDirection(new THREE.Vector3());
    const pontoMira = ajuda ? ajuda.alvo.pos.clone() : origem.clone().addScaledVector(frente, distanciaAteChao(origem, frente));
    const boca = camera.localToWorld(tmp.set(0.16, -0.13, -0.75));
    const t = tiros.find((x) => !x.ativo && x.forte === forte) || tiros.find((x) => x.forte === forte);
    t.ativo = true;
    t.pos.copy(boca);
    t.dir.copy(pontoMira).sub(boca).normalize();
    t.dist = 0;
    t.mesh.visible = true;
    t.mesh.position.copy(boca);
    t.mesh.lookAt(tmp2.copy(boca).add(t.dir));
    if (som) { if (forte) som.tiroForte(); else som.tiro(); }
  }

  // O raio do rifle bateu: estouro grande e dano em quem está perto (menos em quem já levou o tiro direto).
  function estourar(p, dir, acertado) {
    for (let k = 0; k < 26; k++) {
      faiscas.soltar({
        x: p.x, y: p.y + 0.1, z: p.z,
        vx: (Math.random() - 0.5) * 9, vy: 1 + Math.random() * 5, vz: (Math.random() - 0.5) * 9,
        vida: 0.5 + Math.random() * 0.4, tamanho: 0.4, cresce: -0.3, cor: k % 3 ? 0xff8ae8 : 0xffffff, alfa: 1, gravidade: 9,
      });
    }
    for (const a of alvos.lista) {
      if (!a.ativo || a === acertado) continue;
      if (p.distanceTo(a.pos) < RAIO_RESPINGO + a.raio) a.acertar(dir, DANO.respingo);
    }
    if (som) som.explosao(0.45);
  }

  function atualizarTiros(dt) {
    for (const t of tiros) {
      if (!t.ativo) continue;
      const total = (t.forte ? VEL_RAIO : VEL_TIRO) * dt;
      const folga = t.forte ? 0.5 : 0; // o raio é grosso
      let andou = 0, acabou = false;
      while (andou < total && !acabou) {
        const p = Math.min(0.8, total - andou);
        t.pos.addScaledVector(t.dir, p);
        andou += p;
        for (const a of alvos.lista) {
          if (a.ativo && t.pos.distanceTo(a.pos) < a.raio + folga) {
            a.acertar(t.dir, t.forte ? DANO.rifle : DANO.pistola);
            if (t.forte) estourar(t.pos, t.dir, a); else faiscar(t.pos, 0xff8a6a, 5);
            acabou = true;
            break;
          }
        }
        if (acabou) break;
        if (t.pos.y < grade.alturaEm(t.pos.x, t.pos.z) || colisoes.pontoDentro(t.pos.x, t.pos.y, t.pos.z)) {
          if (t.forte) estourar(t.pos, t.dir, null); else { faiscar(t.pos); if (som) som.acerto(); }
          acabou = true;
        }
      }
      t.dist += total;
      if (acabou || t.dist > ALCANCE) { t.ativo = false; t.mesh.visible = false; continue; }
      t.mesh.position.copy(t.pos);
    }
  }

  function pararSomCarga() { if (somCarga) { somCarga.parar(); somCarga = null; } }

  function atualizar(dt, atirando, ajuda) {
    espera -= dt;
    calor = Math.max(0, calor - dt * (travada ? 0.5 : 0.65));
    if (travada && calor < 0.3) travada = false;
    if (atirando) tempoMao = 0; // atirar volta para a arma na hora
    // trocando de arma: abaixa uma, sobe a outra (não atira no meio)
    if (troca > 0) {
      const antes = troca;
      troca = Math.max(0, troca - dt);
      if (antes > 0.2 && troca <= 0.2 && trocarPara) { armaAtual = trocarPara; trocarPara = null; }
    } else if (armaAtual === 'rifle') {
      // segurando o tiro, o rifle carrega por 2 segundos e dispara sozinho quando enche; soltando antes, descarrega
      if (atirando && espera <= 0) {
        carga = Math.min(1, carga + dt / TEMPO_CARGA);
        if (!somCarga && som) somCarga = som.carga();
        if (carga >= 1) { disparar(ajuda, true); carga = 0; pararSomCarga(); }
      } else carga = Math.max(0, carga - dt * 1.5);
      if (somCarga) { somCarga.definir(carga); if (carga === 0) pararSomCarga(); }
    } else if (atirando && !travada && espera <= 0) disparar(ajuda);
    tempoMao = Math.max(0, tempoMao - dt);
    golpe = Math.max(0, golpe - dt * 4.5);
    atualizarTiros(dt);
    recuo = Math.max(0, recuo - dt * 9);
    tempoFlash -= dt;
  }

  // Animação da arma na mão (recuo, balanço ao andar) e cor da tira de calor. Chamado a cada quadro.
  const corFria = new THREE.Color(0x5ff0ff), corQuente = new THREE.Color(0xff4a2a), corCarga = new THREE.Color(0xffd0f8);
  function desenhar(renderer, balanco, velHoriz, sol, ambiente, agora) {
    const k = Math.min(1, velHoriz / 4.4);
    const abaixa = troca > 0 ? Math.sin((troca / 0.4) * Math.PI) * 0.22 : 0; // troca de arma: desce e sobe
    const tremeCarga = armaAtual === 'rifle' ? carga * carga * 0.004 : 0;
    const ativo = armaAtual === 'rifle' ? modeloRifle : modelo, base = armaAtual === 'rifle' ? POS_RIFLE : POS_ARMA;
    ativo.position.set(
      base.x + Math.cos(balanco) * 0.012 * k + (Math.random() - 0.5) * tremeCarga,
      base.y + Math.abs(Math.sin(balanco)) * 0.014 * k - recuo * 0.012 - abaixa + (Math.random() - 0.5) * tremeCarga,
      base.z + recuo * 0.07,
    );
    ativo.rotation.set(recuo * 0.14 - abaixa * 1.5, 0, 0);
    if (armaAtual === 'rifle') {
      matBobina.color.setHex(0x6a2a5a).lerp(corCarga, carga);
      matCarga.opacity = carga * 0.9;
      brilhoCarga.scale.setScalar(0.4 + carga * 1.2);
      brilhoCarga.rotation.z = agora / 200;
      flashRifle.visible = tempoFlash > 0;
      flashRifle.rotation.z = Math.random() * Math.PI;
    }
    // ferramenta na mão (aparece ao coletar e some sozinha depois de um tempinho)
    const comFerramenta = tempoMao > 0;
    modelo.visible = !comFerramenta && armaAtual === 'pistola';
    modeloRifle.visible = !comFerramenta && armaAtual === 'rifle';
    mao.visible = comFerramenta;
    if (comFerramenta) {
      for (const [id, f] of Object.entries(ferramentas)) f.visible = id === ferramentaAtual;
      // golpe: levanta e desce rápido
      const g = golpe > 0.5 ? (1 - golpe) * 2 : golpe * 2; // 0 -> 1 -> 0
      mao.position.set(POS_MAO.x + Math.cos(balanco) * 0.01 * k, POS_MAO.y + g * 0.05, POS_MAO.z - g * 0.05);
      mao.rotation.set(ferramentaAtual === 'luva' ? -0.2 - g * 0.6 : 0.35 - g * 1.4, 0.25, ferramentaAtual === 'luva' ? 0 : 0.35);
    }
    flash.visible = tempoFlash > 0 && armaAtual === 'pistola';
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
    // Mostra a ferramenta e dá um golpe ('luva', 'machado' ou 'picareta').
    golpear(ferramenta) { ferramentaAtual = ferramentas[ferramenta] ? ferramenta : 'luva'; tempoMao = 1.4; golpe = 1; },
    mostrarFerramenta(ferramenta) { ferramentaAtual = ferramentas[ferramenta] ? ferramenta : 'luva'; tempoMao = Math.max(tempoMao, 0.6); },
    ajustarTela(aspecto, fov) { cameraArma.aspect = aspecto; cameraArma.fov = Math.max(50, fov * 0.95); cameraArma.updateProjectionMatrix(); },
    get calor() { return calor; },
    get travada() { return travada; },
    get carga() { return carga; },
    get atual() { return armaAtual; },
    get proxima() { return trocarPara || armaAtual; },
    get temRifle() { return temRifle; },
    // Tem (ou não tem) o rifle: sem ele, volta para o Desintegrador.
    definirRifle(tem) {
      temRifle = !!tem;
      if (!temRifle && (armaAtual === 'rifle' || trocarPara)) { armaAtual = 'pistola'; trocarPara = null; troca = 0; carga = 0; pararSomCarga(); }
    },
    // Troca de arma (só uma de cada vez). "qual" opcional: 'pistola' ou 'rifle'.
    trocar(qual) {
      if (!temRifle || troca > 0) return false;
      const destino = qual || (armaAtual === 'rifle' ? 'pistola' : 'rifle');
      if (destino === armaAtual) return false;
      trocarPara = destino; troca = 0.4; carga = 0; pararSomCarga(); tempoMao = 0;
      if (som) som.trocarArma();
      return true;
    },
    // Ao sair do jogo (pausa, mochila, mapa...): o rifle descarrega e o zumbido para.
    cancelarCarga() { if (carga > 0 || somCarga) { carga = 0; pararSomCarga(); } },
  };
}
