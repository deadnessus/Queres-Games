// O jogador em primeira pessoa: anda, corre, pula (gravidade de Lúmen = 0,8 da Terra), sobe rampas suaves,
// escorrega nas íngremes, não atravessa troncos, pedras nem a nave, e não entra na água funda.
import * as THREE from 'three';

const GRAU = Math.PI / 180;
export const GRAVIDADE = 9.81 * 0.8;
const RAIO = 0.4, ALTURA = 1.75, OLHO = 1.62;
const ANDAR = 4.4, CORRER = 7.0, PULO = 4.8;
const limitar = (v, a, b) => (v < a ? a : v > b ? b : v);

export function criarJogador({ def, grade, colisoes, som, aoAguaFunda }) {
  const pos = new THREE.Vector3(def.inicio.x, 0, def.inicio.z);
  pos.y = grade.alturaEm(pos.x, pos.z);
  const anterior = pos.clone();
  const vel = new THREE.Vector3();
  let rumo = def.inicio.olhar * GRAU; // radianos, sentido horário a partir do norte
  let inclinacao = -0.04;
  let noChao = true, tempoNoAr = 0, pedidoPulo = 0, distPasso = 0, balanco = 0, afundo = 0, velHoriz = 0;
  const meio = grade.tamanho / 2 - 10;

  function girar(dRumo, dIncl) {
    rumo += dRumo;
    inclinacao = limitar(inclinacao + dIncl, -1.45, 1.45);
  }

  function passo(dt, mov, pular) {
    anterior.copy(pos);
    if (pular) pedidoPulo = 0.15;
    const mag = Math.min(1, Math.hypot(mov.x, mov.y));
    const s = Math.sin(rumo), c = Math.cos(rumo);
    // frente = (sen, 0, -cos); direita = (cos, 0, sen)
    let wx = s * mov.y + c * mov.x, wz = -c * mov.y + s * mov.x;
    const wm = Math.hypot(wx, wz);
    if (wm > 1e-4) { wx /= wm; wz /= wm; }

    const yAqui = grade.alturaEm(pos.x, pos.z);
    const naAgua = grade.nivelAgua - yAqui > 0.3;
    let vmax = (mov.correr ? CORRER : ANDAR) * mag;
    if (naAgua) vmax *= 0.55;
    const acel = (noChao ? 40 : 10) * dt;
    vel.x += limitar(wx * vmax - vel.x, -acel, acel);
    vel.z += limitar(wz * vmax - vel.z, -acel, acel);

    // rampa íngreme: não sobe e escorrega
    if (noChao) {
      const [nx, ny, nz] = grade.normalEm(pos.x, pos.z);
      if (ny < 0.72) {
        const gm = Math.hypot(nx, nz) || 1, ux = nx / gm, uz = nz / gm; // direção morro abaixo
        const subindo = vel.x * ux + vel.z * uz;
        if (subindo < 0) { vel.x -= subindo * ux; vel.z -= subindo * uz; }
        vel.x += ux * 9 * dt; vel.z += uz * 9 * dt;
      }
    }

    // pulo (com uma folguinha: vale apertar um pouco antes de cair no chão ou logo depois de sair dele)
    pedidoPulo -= dt;
    if (pedidoPulo > 0 && (noChao || tempoNoAr < 0.12)) {
      vel.y = PULO;
      noChao = false;
      tempoNoAr = 1;
      pedidoPulo = 0;
      if (som) som.pulo();
    }
    vel.y -= GRAVIDADE * dt;

    pos.x += vel.x * dt; pos.y += vel.y * dt; pos.z += vel.z * dt;

    // obstáculos e bordas
    if (colisoes.empurrar(pos, RAIO, pos.y + 0.3, pos.y + ALTURA)) {
      vel.x = (pos.x - anterior.x) / dt;
      vel.z = (pos.z - anterior.z) / dt;
    }
    pos.x = limitar(pos.x, -meio, meio);
    pos.z = limitar(pos.z, -meio, meio);

    // água funda: volta
    if (grade.nivelAgua - grade.alturaEm(pos.x, pos.z) > 1.3) {
      pos.x = anterior.x; pos.z = anterior.z; vel.x = 0; vel.z = 0;
      if (aoAguaFunda) aoAguaFunda();
    }

    // chão
    const yChao = grade.alturaEm(pos.x, pos.z);
    if (pos.y <= yChao) {
      if (!noChao && vel.y < -5) { afundo = Math.min(0.22, -vel.y * 0.025); if (som) som.aterrissar(); }
      pos.y = yChao; vel.y = 0; noChao = true; tempoNoAr = 0;
    } else if (noChao && vel.y <= 0 && pos.y - yChao < 0.45) {
      pos.y = yChao; vel.y = 0; // desce a rampa grudado no chão
    } else {
      noChao = false;
      tempoNoAr += dt;
    }

    // passos e balanço da câmera
    velHoriz = Math.hypot(vel.x, vel.z);
    if (noChao && velHoriz > 0.6) {
      balanco += velHoriz * dt * 1.55;
      distPasso += velHoriz * dt;
      if (distPasso > (mov.correr ? 2.5 : 2.0)) { distPasso = 0; if (som) som.passo(); }
    } else {
      balanco += (Math.round(balanco / Math.PI) * Math.PI - balanco) * Math.min(1, dt * 6);
    }
    afundo *= Math.max(0, 1 - dt * 7);
  }

  const tmp = new THREE.Vector3();
  // Põe a câmera no olho do jogador (com interpolação entre dois passos da física).
  function posicionarCamera(camera, alfa, reduzirTremor) {
    tmp.copy(anterior).lerp(pos, alfa);
    const k = reduzirTremor ? 0 : Math.min(1, velHoriz / 4.4);
    const bob = Math.abs(Math.sin(balanco)) * 0.06 * k - 0.03 * k;
    camera.position.set(tmp.x, tmp.y + OLHO + bob - afundo, tmp.z);
    camera.rotation.set(inclinacao, -rumo, reduzirTremor ? 0 : Math.sin(balanco) * 0.006 * k, 'YXZ');
  }

  return {
    pos, vel, girar, passo, posicionarCamera,
    get rumo() { return rumo; },
    get inclinacao() { return inclinacao; },
    get noChao() { return noChao; },
    get balanco() { return balanco; },
    get velHoriz() { return velHoriz; },
    olho() { return new THREE.Vector3(pos.x, pos.y + OLHO, pos.z); },
  };
}
