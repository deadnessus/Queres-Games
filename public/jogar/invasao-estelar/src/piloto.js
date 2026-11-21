// Telas do piloto (Etapa 3): insígnias das patentes, medalhas, missões da semana, o progresso no fim da partida e as
// linhas do ranking com patente e nave. As regras ficam em progresso.js; aqui só se monta o que aparece.
import { PATENTES, MEDALHAS, MISSOES, NAVES } from './progresso.js?v=11';
import { desenharNaveDoHangar, CORES_NAVE } from './naves.js?v=11';

const TAU = Math.PI * 2;

function elemento(tag, attrs = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else n.setAttribute(k, v);
  }
  n.append(...filhos.filter((f) => f !== null && f !== undefined));
  return n;
}

function telinha(larg, alt, desenhar) {
  const c = document.createElement('canvas');
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  c.width = Math.round(larg * dpr);
  c.height = Math.round(alt * dpr);
  c.style.width = `${larg}px`;
  c.style.height = `${alt}px`;
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  desenhar(g);
  return c;
}

/* ---------- insígnias das patentes ---------- */

function estrela(g, x, y, r, cor) {
  g.fillStyle = cor;
  g.beginPath();
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5;
    const rr = k % 2 ? r * 0.45 : r;
    if (k === 0) g.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    else g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
}

function divisa(g, x, y, l, cor) {
  g.strokeStyle = cor;
  g.lineWidth = l * 0.16;
  g.lineCap = 'round';
  g.lineJoin = 'round';
  g.beginPath();
  g.moveTo(x - l / 2, y - l * 0.18);
  g.lineTo(x, y + l * 0.18);
  g.lineTo(x + l / 2, y - l * 0.18);
  g.stroke();
}

// Desenha a insígnia da patente `i` centrada em (x, y), num quadrado de lado `t`.
export function desenharPatente(g, i, x, y, t) {
  const prata = '#cfe0ff';
  const ouro = '#ffd45e';
  if (i <= 2) {
    for (let k = 0; k <= i; k++) divisa(g, x, y - t * 0.18 + k * t * 0.2 - (i * t * 0.1), t * 0.7, prata);
  } else if (i <= 5) {
    const n = i - 2;
    for (let k = 0; k < n; k++) estrela(g, x + (k - (n - 1) / 2) * t * 0.32, y, t * 0.17, ouro);
  } else {
    g.strokeStyle = ouro;
    g.lineWidth = t * 0.06;
    g.beginPath(); g.arc(x, y, t * 0.42, 0, TAU); g.stroke();
    estrela(g, x, y, t * 0.3, ouro);
    if (i === 7) {
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * TAU;
        g.fillStyle = ouro;
        g.beginPath(); g.arc(x + Math.cos(a) * t * 0.42, y + Math.sin(a) * t * 0.42, t * 0.05, 0, TAU); g.fill();
      }
    }
  }
}

export function iconePatente(i, t = 22) {
  return telinha(t, t, (g) => desenharPatente(g, i, t / 2, t / 2, t));
}

/* ---------- medalhas e naves ---------- */

export function iconeMedalha(ganha, t = 38) {
  return telinha(t, t, (g) => {
    const cor = ganha ? '#ffd45e' : '#4a5070';
    const escuro = ganha ? '#b8860b' : '#2a2f48';
    g.fillStyle = ganha ? '#ff5f7a' : '#3a3f58';
    g.beginPath(); g.moveTo(t * 0.32, 0); g.lineTo(t * 0.46, t * 0.42); g.lineTo(t * 0.3, t * 0.42); g.closePath(); g.fill();
    g.fillStyle = ganha ? '#5ef2ff' : '#343954';
    g.beginPath(); g.moveTo(t * 0.68, 0); g.lineTo(t * 0.54, t * 0.42); g.lineTo(t * 0.7, t * 0.42); g.closePath(); g.fill();
    g.fillStyle = escuro;
    g.beginPath(); g.arc(t / 2, t * 0.64, t * 0.32, 0, TAU); g.fill();
    g.fillStyle = cor;
    g.beginPath(); g.arc(t / 2, t * 0.64, t * 0.26, 0, TAU); g.fill();
    estrela(g, t / 2, t * 0.64, t * 0.15, ganha ? '#fff6d0' : '#5a6080');
  });
}

export function iconeNave(id, t = 26, corId = 'azul') {
  const cores = CORES_NAVE.find((c) => c.id === corId) || CORES_NAVE[0];
  return telinha(t, t, (g) => desenharNaveDoHangar(g, id, t / 2, t / 2, t / 64, cores));
}

/* ---------- tela do piloto ---------- */

const nomeDaMedalha = (id) => (MEDALHAS.find((m) => m.id === id) || { nome: id }).nome;
const textoDaMissao = (id) => (MISSOES.find((m) => m.id === id) || { texto: id }).texto;

export function montarPatente(caixa, resumo) {
  const p = PATENTES[resumo.patente];
  const proxima = resumo.patente + 1 < PATENTES.length ? PATENTES[resumo.patente + 1] : null;
  const de = p.xp;
  const ate = proxima ? proxima.xp : p.xp;
  const frac = proxima ? (resumo.xp - de) / (ate - de) : 1;
  const barra = elemento('div', { class: 'barra' }, elemento('span', {}));
  barra.firstChild.style.width = `${Math.round(100 * Math.min(1, Math.max(0, frac)))}%`;
  caixa.replaceChildren(
    iconePatente(resumo.patente, 64),
    elemento('div', { class: 'patente-texto' },
      elemento('strong', { text: p.nome }),
      elemento('span', { text: `${resumo.xp.toLocaleString('pt-BR')} de experiência` }),
      barra,
      elemento('small', { text: proxima ? `Faltam ${(ate - resumo.xp).toLocaleString('pt-BR')} para ${proxima.nome}` : 'Patente mais alta!' })));
}

export function montarMissoes(lista, resumo) {
  lista.replaceChildren(...resumo.missoes.map((m) => {
    const barra = elemento('div', { class: 'barra' }, elemento('span', {}));
    barra.firstChild.style.width = `${Math.round((100 * m.progresso) / m.alvo)}%`;
    return elemento('li', { class: m.feita ? 'missao feita' : 'missao' },
      elemento('span', { class: 'missao-texto', text: `${m.feita ? '✓ ' : ''}${textoDaMissao(m.id)}` }),
      elemento('span', { class: 'missao-conta', text: `${Math.min(m.progresso, m.alvo).toLocaleString('pt-BR')}/${m.alvo.toLocaleString('pt-BR')}` }),
      barra);
  }));
}

export function montarMedalhas(grade, resumo) {
  grade.replaceChildren(...MEDALHAS.map((m) => {
    const ganha = resumo.medalhas.includes(m.id);
    return elemento('div', { class: ganha ? 'medalha ganha' : 'medalha', title: m.texto },
      iconeMedalha(ganha),
      elemento('strong', { text: m.nome }),
      elemento('small', { text: m.texto }));
  }));
}

/* ---------- progresso no fim da partida ---------- */

export function montarProgressoDoFim(caixa, prog) {
  const partes = [];
  const patente = PATENTES[prog.patente];
  const subiu = prog.patente > prog.patenteAntes;
  partes.push(elemento('p', { class: 'xp' },
    iconePatente(prog.patente, 26),
    elemento('span', { text: `+${prog.xp} de experiência · ${patente.nome}` })));
  if (subiu) partes.push(elemento('p', { class: 'subiu', text: `Subiu para ${patente.nome}!` }));
  if (prog.medalhas.length) {
    partes.push(elemento('p', { class: 'medalhas-novas' },
      iconeMedalha(true, 26),
      elemento('span', { text: `${prog.medalhas.length === 1 ? 'Medalha nova' : 'Medalhas novas'}: ${prog.medalhas.map(nomeDaMedalha).join(', ')}` })));
  }
  for (const i of prog.missoes) {
    const m = prog.resumo.missoes[i];
    if (m) partes.push(elemento('p', { class: 'missao-feita', text: `Missão completa: ${textoDaMissao(m.id)}` }));
  }
  const naves = NAVES.filter((n) => prog.resumo.naves.includes(n.id) && n.requisito);
  const novaNave = naves.find((n) => (n.requisito.patente && subiu && PATENTES[prog.patente].id === n.requisito.patente)
    || (n.requisito.medalha && prog.medalhas.includes(n.requisito.medalha)));
  if (novaNave) partes.push(elemento('p', { class: 'subiu', text: `Nave nova no hangar: ${novaNave.nome}!` }));
  caixa.replaceChildren(...partes);
  caixa.hidden = false;
}

/* ---------- linhas do ranking ---------- */

export function linhaDeRanking(item, { eu = false, rotuloFase = (i) => `onda ${i.fase}` } = {}) {
  return elemento('li', { class: `linha-rank${eu ? ' eu' : ''}` },
    elemento('span', { class: 'pos', text: `${item.posicao}º` }),
    elemento('span', { class: 'quem' },
      Number.isInteger(item.patente) ? iconePatente(item.patente, 18) : null,
      item.nave ? iconeNave(item.nave, 22) : null,
      elemento('span', { class: 'apelido', text: item.apelido })),
    elemento('span', { class: 'onda', text: rotuloFase(item) }),
    elemento('span', { class: 'pontos', text: String(item.pontos) }));
}

// "Faltam N pontos para passar o 3º" e o recorde, para quem está logado e no ranking.
// "faltam 120 pontos para o 2º" (e "falta 1 ponto", no singular).
export function faltamPontos(faltam, posicao) {
  return `${faltam === 1 ? 'falta 1 ponto' : `faltam ${faltam.toLocaleString('pt-BR')} pontos`} para o ${posicao}º`;
}

export function textoDoMeuLugar(eu) {
  if (!eu) return '';
  const recorde = `Seu recorde: ${eu.pontos.toLocaleString('pt-BR')}.`;
  if (eu.faltam === null || eu.faltam === undefined) return `${recorde} Você é o 1º!`;
  return `${recorde} ${eu.faltam === 1 ? 'Falta 1 ponto' : `Faltam ${eu.faltam.toLocaleString('pt-BR')} pontos`} para passar o ${eu.posicao - 1}º.`;
}
