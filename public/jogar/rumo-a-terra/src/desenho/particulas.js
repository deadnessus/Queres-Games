// Partículas simples (fumaça, faíscas, cacos de cristal): um conjunto fixo de pontos reaproveitados.
// Cada partícula tem tamanho, cor e transparência próprios (um shader pequeno faz isso).
import * as THREE from 'three';
import { texturaParticula } from './texturas.js';

let textura = null;

export function criarParticulas(cena, { max = 200, aditivo = false } = {}) {
  textura = textura || texturaParticula();
  const pos = new Float32Array(max * 3), tam = new Float32Array(max), alfa = new Float32Array(max), cor = new Float32Array(max * 3);
  const vel = new Float32Array(max * 3), vida = new Float32Array(max), vidaMax = new Float32Array(max), cresce = new Float32Array(max), grav = new Float32Array(max);
  const alfaInicial = new Float32Array(max);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('tamanho', new THREE.BufferAttribute(tam, 1));
  geo.setAttribute('alfa', new THREE.BufferAttribute(alfa, 1));
  geo.setAttribute('cor', new THREE.BufferAttribute(cor, 3));
  const uniforms = { mapa: { value: textura }, escala: { value: 400 } };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false,
    blending: aditivo ? THREE.AdditiveBlending : THREE.NormalBlending,
    vertexShader: `
      attribute float tamanho; attribute float alfa; attribute vec3 cor;
      uniform float escala; varying float vAlfa; varying vec3 vCor;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = alfa > 0.0 ? tamanho * escala / max(-mv.z, 0.1) : 0.0;
        vAlfa = alfa; vCor = cor;
      }`,
    fragmentShader: `
      uniform sampler2D mapa; varying float vAlfa; varying vec3 vCor;
      void main(){ vec4 t = texture2D(mapa, gl_PointCoord); gl_FragColor = vec4(vCor, t.a * vAlfa); }`,
  });
  const pontos = new THREE.Points(geo, mat);
  pontos.frustumCulled = false;
  cena.add(pontos);
  let proxima = 0;
  const c = new THREE.Color();

  return {
    // Solta uma partícula. "o" = { x, y, z, vx, vy, vz, vida, tamanho, cresce, cor, alfa, gravidade }
    soltar(o) {
      const i = proxima;
      proxima = (proxima + 1) % max;
      pos[i * 3] = o.x; pos[i * 3 + 1] = o.y; pos[i * 3 + 2] = o.z;
      vel[i * 3] = o.vx || 0; vel[i * 3 + 1] = o.vy || 0; vel[i * 3 + 2] = o.vz || 0;
      vida[i] = vidaMax[i] = o.vida || 1;
      tam[i] = o.tamanho || 1;
      cresce[i] = o.cresce || 0;
      grav[i] = o.gravidade || 0;
      c.setHex(o.cor ?? 0xffffff);
      cor[i * 3] = c.r; cor[i * 3 + 1] = c.g; cor[i * 3 + 2] = c.b;
      alfa[i] = alfaInicial[i] = o.alfa ?? 1;
    },
    atualizar(dt) {
      for (let i = 0; i < max; i++) {
        if (vida[i] <= 0) { alfa[i] = 0; continue; }
        vida[i] -= dt;
        vel[i * 3 + 1] -= grav[i] * dt;
        pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        tam[i] += cresce[i] * dt;
        const k = Math.max(0, vida[i] / vidaMax[i]);
        alfa[i] = alfaInicial[i] * Math.min(1, k * 2.5);
      }
      geo.attributes.position.needsUpdate = true;
      geo.attributes.tamanho.needsUpdate = true;
      geo.attributes.alfa.needsUpdate = true;
      geo.attributes.cor.needsUpdate = true;
    },
    definirEscala(alturaPixels, fovGraus) {
      uniforms.escala.value = alturaPixels / (2 * Math.tan((fovGraus * Math.PI) / 360));
    },
    pontos,
  };
}
