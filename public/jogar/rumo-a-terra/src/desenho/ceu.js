// Céu de Lúmen: degradê com a estrela Brasa, o planeta gigante Colosso (com anéis) e as estrelas à noite.
// O Colosso fica sempre no mesmo lugar do céu (a lua mostra sempre o mesmo lado para ele): serve de bússola.
import * as THREE from 'three';
import { texturaColosso, texturaAneis } from './texturas.js';
import { criarAleatorio } from '../logica/ruido.js';

const GRAU = Math.PI / 180;

// Direção no céu a partir do rumo (0 = norte, 90 = leste) e da elevação, em graus.
export function direcaoCeu(rumoGraus, elevGraus) {
  const r = rumoGraus * GRAU, e = elevGraus * GRAU;
  return new THREE.Vector3(Math.sin(r) * Math.cos(e), Math.sin(e), -Math.cos(r) * Math.cos(e));
}

// Posição da Brasa pela hora do dia (0 a 1; 0,25 nasce no leste, 0,5 meio-dia ao norte, 0,75 se põe no oeste).
export function posicaoSol(hora) {
  const a = (hora - 0.25) * Math.PI * 2;
  return { rumo: 90 - (hora - 0.25) * 360, elevacao: Math.sin(a) * 68 };
}

// Cores do céu por elevação do sol (graus). Interpola entre noite, entardecer e dia.
const QUADROS = [
  { e: -18, zenite: 0x070c22, horizonte: 0x18233f, sol: 0x000000, luz: 0x6070a0, intLuz: 0.0, intAmb: 0.35 },
  { e: -4, zenite: 0x1a2a55, horizonte: 0x6a5a7a, sol: 0x804020, luz: 0xff9a60, intLuz: 0.0, intAmb: 0.5 },
  { e: 4, zenite: 0x3a6a96, horizonte: 0xf2a070, sol: 0xffa050, luz: 0xffb070, intLuz: 1.2, intAmb: 0.8 },
  { e: 18, zenite: 0x4f9fbd, horizonte: 0xe9d2a8, sol: 0xffd090, luz: 0xffdcb0, intLuz: 2.3, intAmb: 1.05 },
  { e: 40, zenite: 0x5aaec4, horizonte: 0xcfe3d4, sol: 0xfff0c8, luz: 0xffeccc, intLuz: 2.7, intAmb: 1.15 },
];

function interpolar(e) {
  const cor = (h) => new THREE.Color(h);
  const pronto = (q) => ({ zenite: cor(q.zenite), horizonte: cor(q.horizonte), sol: cor(q.sol), luz: cor(q.luz), intLuz: q.intLuz, intAmb: q.intAmb });
  if (e <= QUADROS[0].e) return pronto(QUADROS[0]);
  for (let i = 0; i < QUADROS.length - 1; i++) {
    const a = QUADROS[i], b = QUADROS[i + 1];
    if (e <= b.e) {
      const t = (e - a.e) / (b.e - a.e);
      const m = (x, y) => cor(x).lerp(cor(y), t);
      return {
        zenite: m(a.zenite, b.zenite), horizonte: m(a.horizonte, b.horizonte), sol: m(a.sol, b.sol), luz: m(a.luz, b.luz),
        intLuz: a.intLuz + (b.intLuz - a.intLuz) * t, intAmb: a.intAmb + (b.intAmb - a.intAmb) * t,
      };
    }
  }
  return pronto(QUADROS[QUADROS.length - 1]);
}

export function criarCeu(cena, def) {
  const grupo = new THREE.Group();
  cena.add(grupo);

  // Domo com degradê e brilho do sol.
  const uniforms = {
    zenite: { value: new THREE.Color() }, horizonte: { value: new THREE.Color() }, chao: { value: new THREE.Color(0x2a2036) },
    solDir: { value: new THREE.Vector3(0, 1, 0) }, corSol: { value: new THREE.Color() },
  };
  const domo = new THREE.Mesh(new THREE.SphereGeometry(450, 32, 16), new THREE.ShaderMaterial({
    uniforms, side: THREE.BackSide, depthWrite: false, depthTest: false, fog: false,
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 zenite; uniform vec3 horizonte; uniform vec3 chao; uniform vec3 solDir; uniform vec3 corSol;
      varying vec3 vDir;
      void main(){
        vec3 d = normalize(vDir);
        float y = d.y;
        vec3 cor = y > 0.0 ? mix(horizonte, zenite, pow(clamp(y,0.0,1.0), 0.55)) : mix(horizonte, chao, pow(clamp(-y,0.0,1.0), 0.4));
        float s = max(dot(d, solDir), 0.0);
        cor += corSol * (pow(s, 6.0) * 0.22 + pow(s, 60.0) * 0.5);
        cor = mix(cor, corSol * 1.6 + vec3(0.35), smoothstep(0.99935, 0.9996, s));
        gl_FragColor = vec4(cor, 1.0);
        #include <colorspace_fragment>
      }`,
  }));
  domo.renderOrder = -10;
  domo.frustumCulled = false;
  grupo.add(domo);

  // Estrelas (aparecem à noite).
  const rnd = criarAleatorio(def.semente + 5);
  const pts = [];
  for (let i = 0; i < 700; i++) {
    const u = rnd() * 2 - 1, t = rnd() * Math.PI * 2;
    const y = Math.abs(u) * 0.95 + 0.05, r = Math.sqrt(1 - y * y);
    pts.push(Math.cos(t) * r * 440, y * 440, Math.sin(t) * r * 440);
  }
  const geoEstrelas = new THREE.BufferGeometry();
  geoEstrelas.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const matEstrelas = new THREE.PointsMaterial({ color: 0xffffff, size: 1.6, sizeAttenuation: false, transparent: true, opacity: 0, depthWrite: false, fog: false });
  const estrelas = new THREE.Points(geoEstrelas, matEstrelas);
  estrelas.renderOrder = -9;
  estrelas.frustumCulled = false;
  grupo.add(estrelas);

  // Colosso: esfera listrada, iluminada pela Brasa (por isso aparece "em fase", como a Lua).
  const cc = def.ceu.colosso;
  const colosso = new THREE.Mesh(
    new THREE.SphereGeometry(70, 48, 32),
    new THREE.MeshLambertMaterial({ map: texturaColosso(), fog: false, emissive: 0x15100c }),
  );
  colosso.position.copy(direcaoCeu(cc.direcao, cc.elevacao).multiplyScalar(370));
  colosso.rotation.set(0.62, 0.3, 0.32);
  grupo.add(colosso);

  // Anéis: um disco com furo, com coordenadas de textura de dentro para fora.
  const dentro = 90, fora = 140;
  const geoAnel = new THREE.RingGeometry(dentro, fora, 96, 1);
  const pos = geoAnel.attributes.position, uv = geoAnel.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (Math.hypot(pos.getX(i), pos.getY(i)) - dentro) / (fora - dentro), 0.5);
  const aneis = new THREE.Mesh(geoAnel, new THREE.MeshBasicMaterial({
    map: texturaAneis(), transparent: true, side: THREE.DoubleSide, depthWrite: false, fog: false, opacity: 0.9,
  }));
  aneis.rotation.x = -Math.PI / 2;
  colosso.add(aneis);

  // Luzes da cena: céu/chão (ambiente) e a Brasa (direcional).
  const ambiente = new THREE.HemisphereLight(0xcfe6ff, 0x5a3f66, 1.1);
  const sol = new THREE.DirectionalLight(0xffeccc, 2.6);
  cena.add(ambiente, sol, sol.target);

  let corNevoa = new THREE.Color();
  const dirSol = new THREE.Vector3(0, 1, 0);

  function atualizar(hora) {
    const ps = posicaoSol(hora);
    const dir = direcaoCeu(ps.rumo, ps.elevacao);
    const q = interpolar(ps.elevacao);
    uniforms.zenite.value.copy(q.zenite);
    uniforms.horizonte.value.copy(q.horizonte);
    uniforms.solDir.value.copy(dir);
    uniforms.corSol.value.copy(q.sol);
    sol.color.copy(q.luz);
    sol.intensity = q.intLuz;
    dirSol.copy(dir);
    ambiente.intensity = q.intAmb;
    ambiente.color.copy(q.zenite).lerp(new THREE.Color(0xffffff), 0.55);
    matEstrelas.opacity = Math.max(0, Math.min(1, (-ps.elevacao - 2) / 10));
    corNevoa = q.horizonte.clone().lerp(q.zenite, 0.12);
    if (cena.fog) cena.fog.color.copy(corNevoa);
  }

  return {
    grupo, colosso, sol, ambiente,
    atualizar,
    // O céu acompanha a câmera (fica sempre "infinitamente longe").
    seguir(posCamera) { grupo.position.copy(posCamera); sol.target.position.copy(posCamera); sol.position.copy(dirSol).multiplyScalar(100).add(posCamera); },
    get corNevoa() { return corNevoa; },
    rumoColosso: cc.direcao,
  };
}
