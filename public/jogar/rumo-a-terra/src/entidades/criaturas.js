// Os aliens de Lúmen (pedido do dono, 20/11/2026): Saltitos (inofensivos, fogem), Rastejadores (caçam em grupo,
// têm medo de fogo e não chegam perto da nave) e Zumbidores (insetos gigantes que dão rasantes).
// Derrotado: cai, some numa nuvenzinha e deixa itens (decisões D4 e D5). Depois de um tempo, outro aparece longe.
// O mundo dá a volta: as distâncias usam o caminho mais curto e cada bicho é desenhado na cópia mais perto da câmera.
import * as THREE from 'three';
import { CRIATURAS } from '../dados/criaturas.js';
import { preparar, mesclar, matriz, tremer, misturarHex } from '../desenho/geometria.js';
import { criarAleatorio } from '../logica/ruido.js';
import { embrulhar, maisPerto } from '../logica/toro.js';

const RAIO_NAVE_SEGURA = 22; // perto da nave os Rastejadores não entram (é a sua base)
const RAIO_FOGO = 7; // os Rastejadores têm medo de fogo

// ---------- modelos (feitos com formas simples, a cabeça aponta para -z) ----------
function modeloRastejador(rnd) {
  const corpo = mesclar([
    preparar(tremer(new THREE.BoxGeometry(0.7, 0.36, 1.25, 2, 1, 3), 0.06, rnd), (x, y) => misturarHex(0x3e2466, 0x7a4cb8, y / 0.36 + 0.5), matriz(0, 0.55, 0)),
    preparar(new THREE.BoxGeometry(0.5, 0.28, 0.5), (x, y) => misturarHex(0x4a2a78, 0x8a5cc8, y / 0.28 + 0.5), matriz(0, 0.6, -0.8, 0.15, 0, 0)),
    preparar(new THREE.BoxGeometry(0.42, 0.08, 0.2), 0x1a0d22, matriz(0, 0.5, -1.02)), // boca
    preparar(new THREE.IcosahedronGeometry(0.07, 0), 0xffe14d, matriz(-0.16, 0.7, -1.0)),
    preparar(new THREE.IcosahedronGeometry(0.07, 0), 0xffe14d, matriz(0.16, 0.7, -1.0)),
    preparar(new THREE.BoxGeometry(0.22, 0.16, 0.9), 0x4a2a78, matriz(0, 0.52, 1.0, 0.12, 0, 0)), // cauda
    ...[-0.35, -0.05, 0.25, 0.55].map((z, k) => preparar(new THREE.OctahedronGeometry(0.1, 0), 0x7ff4ff, matriz(0, 0.82 + (k % 2) * 0.04, z, 0, k, 0, 1, 2.4, 1))),
  ]);
  const perna = (lado, z) => preparar(new THREE.BoxGeometry(0.09, 0.09, 0.62), 0x2e1a4a, matriz(lado * 0.52, 0.32, z, 0.9, lado * 0.9, 0));
  const tripA = mesclar([perna(-1, -0.4), perna(1, 0.05), perna(-1, 0.45)]);
  const tripB = mesclar([perna(1, -0.4), perna(-1, 0.05), perna(1, 0.45)]);
  return { corpo, extras: [tripA, tripB] };
}

function modeloSaltito() {
  const corpo = mesclar([
    preparar(new THREE.IcosahedronGeometry(1, 1), (x, y) => misturarHex(0xc98a5a, 0xf2d0a6, (y + 1) / 2), matriz(0, 0.36, 0, 0, 0, 0, 0.3, 0.27, 0.36)),
    preparar(new THREE.IcosahedronGeometry(1, 0), 0xe8b88a, matriz(0, 0.5, -0.32, 0, 0, 0, 0.19, 0.17, 0.2)), // cabeça
    preparar(new THREE.BoxGeometry(0.07, 0.34, 0.03), (x, y) => (y > 0.08 ? 0xf08aa8 : 0xe8b88a), matriz(-0.09, 0.78, -0.3, -0.25, 0, -0.15)),
    preparar(new THREE.BoxGeometry(0.07, 0.34, 0.03), (x, y) => (y > 0.08 ? 0xf08aa8 : 0xe8b88a), matriz(0.09, 0.78, -0.3, -0.25, 0, 0.15)),
    preparar(new THREE.IcosahedronGeometry(0.04, 0), 0x121212, matriz(-0.09, 0.55, -0.48)),
    preparar(new THREE.IcosahedronGeometry(0.04, 0), 0x121212, matriz(0.09, 0.55, -0.48)),
    preparar(new THREE.BoxGeometry(0.12, 0.08, 0.32), 0xa86e44, matriz(-0.18, 0.1, 0.08)), // patas grandes de trás
    preparar(new THREE.BoxGeometry(0.12, 0.08, 0.32), 0xa86e44, matriz(0.18, 0.1, 0.08)),
    preparar(new THREE.IcosahedronGeometry(0.1, 0), 0xfff2e0, matriz(0, 0.36, 0.38)), // rabinho
  ]);
  return { corpo, extras: [] };
}

function modeloZumbidor() {
  const corpo = mesclar([
    preparar(new THREE.IcosahedronGeometry(1, 1), 0x1f6f78, matriz(0, 0, 0, 0, 0, 0, 0.26, 0.24, 0.3)), // tórax
    preparar(new THREE.CylinderGeometry(0.2, 0.06, 0.9, 8, 4), (x, y) => (Math.floor((y + 0.45) * 6) % 2 ? 0xf2a03c : 0x1a2a30), matriz(0, -0.02, 0.6, Math.PI / 2, 0, 0)), // abdômen listrado
    preparar(new THREE.IcosahedronGeometry(1, 1), 0x2a8a94, matriz(0, 0.02, -0.33, 0, 0, 0, 0.18, 0.16, 0.18)), // cabeça
    preparar(new THREE.IcosahedronGeometry(0.09, 0), 0xff4a3a, matriz(-0.11, 0.06, -0.42)),
    preparar(new THREE.IcosahedronGeometry(0.09, 0), 0xff4a3a, matriz(0.11, 0.06, -0.42)),
    preparar(new THREE.ConeGeometry(0.04, 0.2, 5), 0x1a1a1a, matriz(0, -0.02, 1.12, Math.PI / 2, 0, 0)), // ferrão
  ]);
  const asa = (lado) => preparar(new THREE.PlaneGeometry(0.85, 0.32), 0xbfefff, matriz(lado * 0.45, 0.16, -0.02, -Math.PI / 2, 0, 0));
  return { corpo, extras: [mesclar([asa(-1)]), mesclar([asa(1)])], asas: true };
}

const MODELOS = { rastejador: modeloRastejador, saltito: modeloSaltito, zumbidor: modeloZumbidor };
const ESCALA = { rastejador: 1.3, saltito: 1.1, zumbidor: 1.25 };

export function criarCriaturas({ cena, def, grade, colisoes, som, nuvem, posNave, fogueiras, aoAtacar, aoMorrer, aoVer }) {
  const T = grade.tamanho;
  const rnd = criarAleatorio(def.semente + 700);
  const matAsa = new THREE.MeshBasicMaterial({ color: 0xbfefff, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false });
  const lista = [];
  const vistos = new Set();
  const tmp = new THREE.Vector3();

  // Lugar bom para um bicho nascer (terra firme, sem rampa forte, longe da nave e do jogador).
  function lugarLivre(longeDe, distMin) {
    for (let k = 0; k < 60; k++) {
      const x = (rnd() - 0.5) * T, z = (rnd() - 0.5) * T;
      const y = grade.alturaEm(x, z);
      if (y < grade.nivelAgua + 0.6 || grade.normalEm(x, z)[1] < 0.8) continue;
      if (Math.hypot(embrulhar(x - posNave.x, T), embrulhar(z - posNave.z, T)) < RAIO_NAVE_SEGURA + 15) continue;
      if (longeDe && Math.hypot(embrulhar(x - longeDe.x, T), embrulhar(z - longeDe.z, T)) < distMin) continue;
      return [x, z];
    }
    return [(rnd() - 0.5) * T, (rnd() - 0.5) * T];
  }

  function criarBicho(tipo, x, z) {
    const d = CRIATURAS[tipo];
    const m = MODELOS[tipo](rnd);
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
    const grupo = new THREE.Group();
    const corpo = new THREE.Mesh(m.corpo, mat);
    grupo.add(corpo);
    const extras = m.extras.map((g) => { const e = new THREE.Mesh(g, m.asas ? matAsa : mat); grupo.add(e); return e; });
    grupo.visible = false;
    cena.add(grupo);
    const c = {
      tipo, d, grupo, corpo, extras, mat,
      pos: new THREE.Vector3(x, grade.alturaEm(x, z), z),
      casa: new THREE.Vector3(x, 0, z), // onde costuma ficar
      rumo: rnd() * Math.PI * 2, vida: d.vida, estado: 'passeando', t: rnd() * 3, fase: rnd() * 6,
      alvoX: x, alvoZ: z, espera: 0, recarga: 0, pisca: 0, vivo: true, renasce: 0, altura: 0, lado: rnd() < 0.5 ? -1 : 1,
      alvo: { pos: new THREE.Vector3(), raio: d.raio, ativo: false, criatura: null, acertar: null },
    };
    c.alvo.criatura = c;
    c.alvo.acertar = (dir) => acertar(c, 1, dir);
    if (tipo === 'zumbidor') c.altura = 6 + rnd() * 3;
    lista.push(c);
    return c;
  }

  // Popula o mundo (em grupos).
  for (const [tipo, d] of Object.entries(CRIATURAS)) {
    for (let feitos = 0; feitos < d.quantidade;) {
      const [cx, cz] = lugarLivre(def.inicio, 60);
      for (let k = 0; k < d.grupo && feitos < d.quantidade; k++, feitos++) criarBicho(tipo, cx + (rnd() - 0.5) * 8, cz + (rnd() - 0.5) * 8);
    }
  }

  // ---------- comportamento ----------
  function andar(c, dirX, dirZ, vel, dt) {
    const m = Math.hypot(dirX, dirZ);
    if (m < 1e-4) return 0;
    const alvoRumo = Math.atan2(dirX, -dirZ);
    let dif = embrulhar(alvoRumo - c.rumo, Math.PI * 2);
    c.rumo += Math.max(-dt * 6, Math.min(dt * 6, dif));
    const px = c.pos.x + Math.sin(c.rumo) * vel * dt, pz = c.pos.z - Math.cos(c.rumo) * vel * dt;
    if (c.tipo !== 'zumbidor') {
      // não entra na água funda (vira para outro lado)
      if (grade.alturaEm(px, pz) < grade.nivelAgua + 0.25) { c.rumo += Math.PI * 0.6 * c.lado; c.espera = 0; return 0; }
    }
    c.pos.x = px; c.pos.z = pz;
    if (c.tipo !== 'zumbidor') colisoes.empurrar(c.pos, c.d.raio * 0.8, c.pos.y + 0.2, c.pos.y + 1);
    c.pos.x = embrulhar(c.pos.x, T); c.pos.z = embrulhar(c.pos.z, T);
    return vel * dt;
  }

  function novoPasseio(c, raio) {
    c.alvoX = embrulhar(c.casa.x + (rnd() - 0.5) * raio * 2, T);
    c.alvoZ = embrulhar(c.casa.z + (rnd() - 0.5) * raio * 2, T);
    c.espera = 1 + rnd() * 3;
  }

  function passear(c, dt, vel, raio) {
    const dx = embrulhar(c.alvoX - c.pos.x, T), dz = embrulhar(c.alvoZ - c.pos.z, T);
    if (Math.hypot(dx, dz) < 1.2) {
      c.espera -= dt;
      if (c.espera <= 0) novoPasseio(c, raio);
      return 0;
    }
    return andar(c, dx, dz, vel, dt);
  }

  const perigoFogo = (c) => fogueiras().some((f) => Math.hypot(embrulhar(f.x - c.pos.x, T), embrulhar(f.z - c.pos.z, T)) < RAIO_FOGO);

  function atualizarBicho(c, dt, jog) {
    const dx = embrulhar(jog.pos.x - c.pos.x, T), dz = embrulhar(jog.pos.z - c.pos.z, T);
    const dist = Math.hypot(dx, dz);
    const d = c.d;
    let andou = 0;
    c.recarga = Math.max(0, c.recarga - dt);
    c.t += dt;

    if (c.tipo === 'saltito') {
      if (dist < d.visao || c.estado === 'fugindo') {
        c.estado = dist > d.visao * 1.6 ? 'passeando' : 'fugindo';
        if (c.estado === 'fugindo') andou = andar(c, -dx, -dz, d.velFuga, dt);
        if (c.estado === 'passeando') { c.casa.set(c.pos.x, 0, c.pos.z); novoPasseio(c, 10); }
      } else andou = passear(c, dt, d.vel, 12);
    } else if (c.tipo === 'rastejador') {
      const naveDx = embrulhar(posNave.x - c.pos.x, T), naveDz = embrulhar(posNave.z - c.pos.z, T);
      const distNave = Math.hypot(naveDx, naveDz);
      const jogNaBase = Math.hypot(embrulhar(jog.pos.x - posNave.x, T), embrulhar(jog.pos.z - posNave.z, T)) < RAIO_NAVE_SEGURA;
      if (c.estado === 'fugindo') {
        andou = andar(c, -dx, -dz, d.velCaca, dt);
        if (c.t > 4) { c.estado = 'passeando'; c.casa.set(c.pos.x, 0, c.pos.z); }
      } else if (perigoFogo(c) || distNave < RAIO_NAVE_SEGURA) {
        // medo de fogo / não entra na base: se afasta
        const f = distNave < RAIO_NAVE_SEGURA ? [-naveDx, -naveDz] : [-dx, -dz];
        andou = andar(c, f[0], f[1], d.vel * 1.6, dt);
        if (c.estado === 'atacando') c.estado = 'cacando';
      } else if (c.estado === 'atacando') {
        if (c.t > 0.18 && !c.mordeu) {
          c.mordeu = true;
          if (dist < 2.3 && !jogNaBase) aoAtacar(d.dano, c);
        }
        if (c.t > 0.45) { c.estado = 'cacando'; c.t = 0; }
      } else if ((dist < d.visao || c.estado === 'cacando') && !jogNaBase) {
        c.estado = dist > d.visao * 1.7 ? 'passeando' : 'cacando';
        if (dist < 1.9 && c.recarga <= 0) { c.estado = 'atacando'; c.t = 0; c.mordeu = false; c.recarga = 1.3; if (som) som.rosnado(); }
        else if (dist > 1.4) {
          // cerca: cada um chega por um lado
          const lado = dist > 4 ? 0.5 * c.lado : 0;
          andou = andar(c, dx + dz * lado, dz - dx * lado, d.velCaca, dt);
        }
      } else {
        if (c.estado === 'cacando') { c.estado = 'passeando'; c.casa.set(c.pos.x, 0, c.pos.z); }
        andou = passear(c, dt, d.vel, 14);
      }
    } else if (c.tipo === 'zumbidor') {
      const chao = grade.alturaEm(c.pos.x, c.pos.z);
      if (c.estado === 'mergulho') {
        const dy = jog.pos.y + 1.3 - c.pos.y;
        const d3 = Math.hypot(dx, dy, dz);
        andou = andar(c, dx, dz, d.velRasante, dt);
        c.pos.y += Math.sign(dy) * Math.min(Math.abs(dy), d.velRasante * dt * Math.abs(dy) / Math.max(d3, 0.1));
        if (d3 < 1.5) { aoAtacar(d.dano, c); c.estado = 'subindo'; c.t = 0; c.recarga = 3.5; }
        else if (c.t > 3) { c.estado = 'subindo'; c.t = 0; c.recarga = 2; }
      } else if (c.estado === 'subindo') {
        andou = andar(c, -dx, -dz, d.vel, dt);
        c.pos.y += (chao + c.altura - c.pos.y) * Math.min(1, dt * 1.5);
        if (c.t > 2.2) { c.estado = 'passeando'; c.t = 0; }
      } else {
        // voa em círculos em volta da "casa"
        const a = c.t * 0.35 + c.fase;
        const cx = embrulhar(c.casa.x + Math.cos(a) * 12, T), cz = embrulhar(c.casa.z + Math.sin(a) * 12, T);
        andou = andar(c, embrulhar(cx - c.pos.x, T), embrulhar(cz - c.pos.z, T), d.vel, dt);
        c.pos.y += (chao + c.altura + Math.sin(c.t * 1.3) * 0.6 - c.pos.y) * Math.min(1, dt * 1.5);
        if (dist < d.visao && c.recarga <= 0) { c.estado = 'mergulho'; c.t = 0; if (som) som.zumbido(); }
      }
    }

    // em cima do chão (o Zumbidor voa)
    if (c.tipo !== 'zumbidor') {
      c.pos.y = grade.alturaEm(c.pos.x, c.pos.z);
      // não fica dentro do jogador
      if (dist < d.raio + 0.45 && dist > 1e-3) { c.pos.x -= (dx / dist) * (d.raio + 0.45 - dist); c.pos.z -= (dz / dist) * (d.raio + 0.45 - dist); }
    }
    c.fase += andou * (c.tipo === 'saltito' ? 2.2 : 5);

    // primeira vez que vê cada tipo: a ÍRIS avisa
    if (!vistos.has(c.tipo) && dist < 22) { vistos.add(c.tipo); if (aoVer) aoVer(c.tipo); }
  }

  // Leva um tiro.
  function acertar(c, dano, dir) {
    if (!c.vivo || c.estado === 'caindo') return;
    c.vida -= dano;
    c.pisca = 0.15;
    if (c.tipo !== 'zumbidor' && dir) { c.pos.x = embrulhar(c.pos.x + dir.x * 0.5, T); c.pos.z = embrulhar(c.pos.z + dir.z * 0.5, T); }
    if (som) som.bichoAcertado(c.tipo);
    if (c.vida <= 0) { c.estado = 'caindo'; c.t = 0; if (som) som.bichoCaiu(c.tipo); return; }
    if (c.tipo === 'rastejador') { if (c.vida <= 1) { c.estado = 'fugindo'; c.t = 0; } else c.estado = 'cacando'; }
    if (c.tipo === 'saltito') c.estado = 'fugindo';
    if (c.tipo === 'zumbidor' && c.estado === 'mergulho') { c.estado = 'subindo'; c.t = 0; c.recarga = 3; }
  }

  function atualizar(dt, jog) {
    for (const c of lista) {
      if (!c.vivo) {
        c.renasce -= dt;
        if (c.renasce <= 0) {
          const [x, z] = lugarLivre(jog.pos, 70);
          c.pos.set(x, grade.alturaEm(x, z), z); c.casa.set(x, 0, z);
          c.vida = c.d.vida; c.estado = 'passeando'; c.vivo = true; c.t = 0; c.grupo.scale.setScalar(1);
          if (c.tipo === 'zumbidor') c.pos.y += c.altura;
        }
        continue;
      }
      if (c.estado === 'caindo') {
        // cai de lado, depois some numa nuvenzinha e deixa os itens
        c.t += dt;
        if (c.tipo === 'zumbidor') c.pos.y = Math.max(grade.alturaEm(c.pos.x, c.pos.z), c.pos.y - dt * 9);
        if (c.t > 0.9) {
          c.vivo = false;
          c.renasce = 60 + rnd() * 40;
          const p = c.alvo.pos;
          for (let k = 0; k < 14; k++) {
            nuvem.soltar({ x: p.x + (Math.random() - 0.5) * 0.6, y: p.y, z: p.z + (Math.random() - 0.5) * 0.6, vx: (Math.random() - 0.5) * 1.5, vy: 0.8 + Math.random(), vz: (Math.random() - 0.5) * 1.5, vida: 0.9, tamanho: 0.6, cresce: 1.2, cor: 0xe8e0ff, alfa: 0.6 });
          }
          const itens = [];
          for (const [id, min, max, chance] of c.d.da) if (Math.random() < chance) itens.push([id, min + Math.floor(Math.random() * (max - min + 1))]);
          aoMorrer(c, itens, { x: p.x, y: p.y, z: p.z });
        }
        continue;
      }
      const dist = Math.hypot(embrulhar(jog.pos.x - c.pos.x, T), embrulhar(jog.pos.z - c.pos.z, T));
      if (dist < 150) atualizarBicho(c, dt, jog);
      else if ((c.t += dt) > 0) { /* longe: fica parado até o jogador chegar perto */ }
    }
  }

  // Põe cada bicho na cópia mais perto da câmera, anima e atualiza o ponto que os tiros procuram.
  function posicionar(cam, agora) {
    for (const c of lista) {
      const x = maisPerto(c.pos.x, cam.x, T), z = maisPerto(c.pos.z, cam.z, T);
      const visivel = c.vivo && Math.hypot(x - cam.x, z - cam.z) < 160;
      c.grupo.visible = visivel;
      c.alvo.ativo = visivel && c.estado !== 'caindo';
      if (!visivel) continue;
      let y = c.pos.y, inclina = 0, rola = 0, escala = 1;
      if (c.tipo === 'saltito' && c.estado !== 'caindo') y += Math.abs(Math.sin(c.fase)) * 0.45;
      if (c.tipo === 'rastejador') {
        const s = Math.sin(c.fase);
        c.extras[0].position.set(0, Math.max(0, s) * 0.12, Math.cos(c.fase) * 0.12);
        c.extras[1].position.set(0, Math.max(0, -s) * 0.12, -Math.cos(c.fase) * 0.12);
        if (c.estado === 'atacando') { const k = Math.sin(Math.min(1, c.t / 0.45) * Math.PI); c.corpo.position.z = -k * 0.5; inclina = -k * 0.25; }
        else c.corpo.position.z = 0;
      }
      if (c.tipo === 'zumbidor') {
        const bate = Math.sin(agora / 18) * 0.7;
        c.extras[0].rotation.z = bate; c.extras[1].rotation.z = -bate;
        inclina = c.estado === 'mergulho' ? 0.5 : 0;
      }
      if (c.estado === 'caindo') { rola = Math.min(1, c.t / 0.35) * Math.PI / 2; escala = c.t > 0.5 ? Math.max(0.05, 1 - (c.t - 0.5) / 0.4) : 1; }
      c.grupo.position.set(x, y, z);
      c.grupo.rotation.set(inclina, -c.rumo, rola, 'YXZ');
      c.grupo.scale.setScalar(escala * ESCALA[c.tipo]);
      c.pisca = Math.max(0, c.pisca - 1 / 60);
      c.mat.emissive.setHex(c.pisca > 0 ? 0xff3020 : 0x000000);
      c.alvo.pos.set(x, y + (c.tipo === 'zumbidor' ? 0 : c.d.alturaAlvo), z);
    }
  }

  const alvos = lista.map((c) => c.alvo);
  return {
    lista, alvos, atualizar, posicionar, acertar,
    reiniciar() {
      for (const c of lista) {
        c.vivo = true; c.vida = c.d.vida; c.estado = 'passeando'; c.grupo.scale.setScalar(1);
        const [x, z] = lugarLivre(def.inicio, 60);
        c.pos.set(x, grade.alturaEm(x, z), z); c.casa.set(x, 0, z);
        if (c.tipo === 'zumbidor') c.pos.y += c.altura;
      }
    },
  };
}
