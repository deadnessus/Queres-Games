// Laço do esquadrão (Etapa 4, #25). Quem criou a sala ("anfitrião") roda as ondas no motor, com os colegas, e manda a
// foto do jogo umas 15 vezes por segundo. Os outros ("convidados") movem a própria nave na hora, desenham a foto e
// avisam quando são atingidos. As regras ficam em esquadrao.js e motor.js; aqui ficam o tempo, as mensagens e o desenho.
import * as L from './logica.js?v=11';
import { novaPartida, avancar } from './motor.js?v=11';
import { desenharPartida, iniciarSalto } from './desenho.js?v=11';
import { novosEfeitos, reagir, atualizarEfeitos, rastroDoMotor, chefeExplodindo } from './efeitos.js?v=11';
import { tocar, vibrar } from './som.js?v=11';
import { tocarMusica, intensidadeDaOnda } from './musica.js?v=11';
import { explodirCruzadorAoFundo } from './cenario.js?v=11';
import {
  novoColega, colegaSaiu, atualizarColega, colegaAtingido, fotoDoEsquadrao, lerFoto, novoConvidado, passoConvidado,
  conferirAtingido, aplicarFotoNoConvidado, mensagemDoConvidado, vistaDoConvidado, FOTOS_POR_SEGUNDO,
} from './esquadrao.js?v=11';
import { ORDEM_NAVES, ORDEM_CORES } from './duelo.js?v=11';

const FOTO_MS = 1000 / FOTOS_POR_SEGUNDO;
const FIM_MS = 2600; // as últimas explosões antes do placar
const SONS = {
  tiro: 'tiro', explosao: 'explosao', perdeu: 'perdeu', fase: 'fase', vida: 'vida', escudo_gasto: 'escudo',
  escudo_quebrou: 'vidro', dano: 'dano', furia: 'furia', bomba: 'bomba', raio: 'raio', teia: 'teia',
  meteoro_passou: 'ponto', meteoro_quebrou: 'explosao', bomba_jogador: 'bombaJogador', fugiram: 'fugiram', casco: 'casco',
  parte_caiu: 'parte', chefe_derrotado: 'chefeCaiu', salto: 'salto', resgate: 'vida',
};

// Efeitos e sons dos acontecimentos (os mesmos da partida normal).
function reagirA(ef, eventos, t) {
  const tocados = new Set();
  for (const ev of eventos) {
    reagir(ef, ev);
    const som = SONS[ev.tipo];
    if (som && !tocados.has(som)) {
      tocados.add(som);
      tocar(som);
    }
    if (ev.tipo === 'disparo') tocar('disparo', ev.tiro);
    if (ev.tipo === 'capsula') tocar('capsula', ev.capsula);
    if (ev.tipo === 'aviso' && ev.tiro === 'raio') tocar('carregando');
    if (ev.tipo === 'explosao' && ev.mult >= 2) tocar('combo', ev.mult);
    if (ev.tipo === 'fase') explodirCruzadorAoFundo(t);
    if (ev.tipo === 'salto') iniciarSalto(t);
  }
}

// Música: a do chefão na onda dele; nas outras, mais intensa conforme o jogo avança.
function musicaDa(especie, intensidade) {
  if (especie === 'chefe') tocarMusica('chefe', 3);
  else tocarMusica('partida', intensidade);
}

// Nomes e cores de cada piloto (para o desenho), a partir de quem está na sala.
function nomesDa(sessao) {
  const m = new Map();
  for (const [id, pl] of sessao.pilotos) m.set(id, { nome: pl.name || 'Piloto', nave: ORDEM_NAVES[pl.nave] || 'padrao', cor: ORDEM_CORES[pl.cor] || 'azul' });
  return m;
}

// `sessao`: { con, meuId, dono, pilotos: Map(id -> { name, nave, cor }) }. `inicio`: { semente, ordem }.
// `aoTerminar({ pontos, onda, porPiloto, nomes, motivo })` é chamado uma vez, no fim.
export function iniciarEsquadrao(ctx, sessao, inicio, aoTerminar) {
  return sessao.dono === sessao.meuId ? anfitriao(ctx, sessao, inicio, aoTerminar) : convidado(ctx, sessao, inicio, aoTerminar);
}

/* ---------- quem criou a sala: roda as ondas ---------- */
function anfitriao(ctx, sessao, inicio, aoTerminar) {
  const ids = (inicio.ordem.length ? inicio.ordem : [...sessao.pilotos.keys()]).slice().sort((a, b) => a - b);
  const p = novaPartida({ semente: inicio.semente, nave: ctx.naveAtual(), rotulo: 'ESQUADRÃO', pilotos: ids.length, idPiloto: sessao.meuId });
  const indices = new Map();
  for (const id of ids) {
    const pl = sessao.pilotos.get(id) || { nave: 0, cor: 0 };
    indices.set(id, { nave: pl.nave, cor: pl.cor });
    if (id !== sessao.meuId) novoColega(p, { id, nave: ORDEM_NAVES[pl.nave] || 'padrao', cor: ORDEM_CORES[pl.cor] || 'azul' });
  }
  indices.set(sessao.meuId, { nave: ctx.naveIndice(), cor: ctx.corIndice() });
  const nomes = nomesDa(sessao);
  p.esquadrao = { meuId: sessao.meuId, nomes, placar: [] };
  const ef = novosEfeitos();
  ef.tremorMax = ctx.menosTremor() ? 0 : 1;
  const relogio = { sobra: 0 };
  let paraFoto = []; // acontecimentos desde a última foto
  let seq = 0;
  let ultimaFoto = 0;
  let ultimoQuadro = 0;
  let ativo = true;
  let acabouEm = 0;
  let fimEnviado = false;
  let terminou = false;
  let especie = '';

  function placar() {
    const lista = [{ id: p.idPiloto, vidas: p.vidas, caido: p.caido }, ...p.aliados.map((a) => ({ id: a.id, vidas: a.vidas, caido: a.caido }))];
    p.esquadrao.placar = lista.map((x) => ({ ...x, ...(nomes.get(x.id) || { nome: 'Piloto', cor: 'azul' }), eu: x.id === p.idPiloto }));
  }

  function resultado(motivo = '') {
    const porPiloto = {};
    for (const id of ids) porPiloto[id] = (p.porPiloto && p.porPiloto[id]) || 0;
    const nomesTexto = {};
    for (const [id, n] of nomes) nomesTexto[id] = n.nome;
    return { pontos: p.pontos, onda: p.fase, porPiloto, nomes: nomesTexto, motivo };
  }

  function terminar(motivo) {
    if (terminou) return;
    terminou = true;
    ativo = false;
    aoTerminar(resultado(motivo));
  }

  function quadro(tms) {
    if (!ativo) return;
    const dt = ultimoQuadro ? Math.min((tms - ultimoQuadro) / 1000, 0.25) : 0;
    ultimoQuadro = tms;
    const agora = performance.now();
    const alfa = p.estado === 'jogando' ? avancar(p, relogio, dt, ctx.direcaoDaEntrada()) : 1;
    const eventos = p.eventos.splice(0);
    paraFoto.push(...eventos);
    reagirA(ef, eventos, tms / 1000);
    for (const ev of eventos) {
      if ((ev.tipo === 'perdeu' && (ev.piloto === undefined || ev.piloto === p.idPiloto))) vibrar(80);
    }
    if (p.onda.especie !== especie) {
      especie = p.onda.especie;
      musicaDa(especie, intensidadeDaOnda(p.onda));
    }
    if (agora - ultimaFoto >= FOTO_MS) {
      ultimaFoto = agora;
      sessao.con.enviar({ t: 'g', d: fotoDoEsquadrao(p, ++seq, paraFoto, indices) });
      paraFoto = [];
    }
    if (p.estado === 'fim') {
      if (!acabouEm) {
        acabouEm = agora;
        tocar('fim');
      } else if (agora - acabouEm > FIM_MS && !fimEnviado) {
        // a última foto (com os pontos de cada um) e o aviso de fim: o servidor avisa todos, inclusive este celular
        fimEnviado = true;
        sessao.con.enviar({ t: 'g', d: fotoDoEsquadrao(p, ++seq, [], indices) });
        sessao.con.enviar({ t: 'fim' });
      } else if (agora - acabouEm > FIM_MS + 3000) {
        terminar(''); // se o servidor não responder, termina assim mesmo
        return;
      }
    }
    const dtv = Math.min(dt, 0.05);
    atualizarEfeitos(ef, dtv);
    const c = p.chefe;
    if (c && !c.vivo && c.morrendo > 0) chefeExplodindo(ef, c.x, c.y, c.id === 'nave-mae' ? 240 : 110, dtv);
    if (p.estado === 'jogando' && !p.caido) rastroDoMotor(ef, L.entre(p.jxAntes, p.jx, alfa), L.Y_JOGADOR, dtv);
    placar();
    desenharPartida(ctx.g, p, ef, tms / 1000, ctx.vista, alfa);
    requestAnimationFrame(quadro);
  }

  function receber(m) {
    if (m.t === 'p') atualizarColega(p, m.id, m.d);
    else if (m.t === 'e') colegaAtingido(p, m.id, m.d);
    else if (m.t === 'leave') colegaSaiu(p, m.id);
    else if (m.t === 'fim') terminar(m.motivo || '');
  }

  requestAnimationFrame(quadro);
  return { receber, parar: () => { ativo = false; } };
}

/* ---------- os outros: movem a própria nave e desenham a foto ---------- */
function convidado(ctx, sessao, inicio, aoTerminar) {
  const cv = novoConvidado({ id: sessao.meuId, nave: ctx.naveAtual() });
  const nomes = nomesDa(sessao);
  const ef = novosEfeitos();
  ef.tremorMax = ctx.menosTremor() ? 0 : 1;
  const relogio = { sobra: 0 };
  let q = null; // a foto mais nova
  let intervalo = FOTO_MS;
  let ultimoEnvio = 0;
  let ultimoQuadro = 0;
  let ativo = true;
  let terminou = false;
  let especie = '';

  function resultado(motivo = '') {
    const porPiloto = {};
    const nomesTexto = {};
    for (const [id, n] of nomes) {
      porPiloto[id] = (q && q.porPiloto[id]) || 0;
      nomesTexto[id] = n.nome;
    }
    return { pontos: q ? q.pontos : 0, onda: q ? q.fase : 1, porPiloto, nomes: nomesTexto, motivo };
  }

  function quadro(tms) {
    if (!ativo) return;
    const dt = ultimoQuadro ? Math.min((tms - ultimoQuadro) / 1000, 0.25) : 0;
    ultimoQuadro = tms;
    const agora = performance.now();
    const u = q ? L.clamp((agora - q.recebido) / intervalo, 0, 1) : 1;
    // a minha nave anda em passos fixos, como no jogo normal
    relogio.sobra += dt;
    let passos = 0;
    const dir = ctx.direcaoDaEntrada();
    while (relogio.sobra >= L.PASSO && passos < L.PASSOS_POR_QUADRO_MAX) {
      passoConvidado(cv, L.PASSO, dir, q);
      relogio.sobra -= L.PASSO;
      passos++;
    }
    if (passos >= L.PASSOS_POR_QUADRO_MAX) relogio.sobra = 0;
    const atingido = conferirAtingido(cv, q, u);
    if (atingido) sessao.con.enviar({ t: 'e', d: atingido });
    const meus = cv.eventos.splice(0);
    reagirA(ef, meus, tms / 1000);
    if (meus.some((e) => e.tipo === 'perdeu')) vibrar(80);
    if (agora - ultimoEnvio >= FOTO_MS) {
      ultimoEnvio = agora;
      sessao.con.enviar({ t: 'p', d: mensagemDoConvidado(cv) });
    }
    const dtv = Math.min(dt, 0.05);
    atualizarEfeitos(ef, dtv);
    const alfa = L.clamp(relogio.sobra / L.PASSO, 0, 1);
    if (q) {
      const c = q.chefe;
      if (c && !c.vivo && c.morrendo > 0) chefeExplodindo(ef, c.x, c.y, c.id === 'nave-mae' ? 240 : 110, dtv);
      if (!cv.caido && !q.fim) rastroDoMotor(ef, L.entre(cv.xa, cv.x, alfa), L.Y_JOGADOR, dtv);
      desenharPartida(ctx.g, vistaDoConvidado(q, cv, u, alfa, nomes), ef, tms / 1000, ctx.vista, 1);
    } else {
      // ainda sem foto: só o fundo (acabou de começar)
      ctx.g.fillStyle = '#02030c';
      ctx.g.fillRect(-ctx.vista.ex, -ctx.vista.ey, L.LARGURA + 2 * ctx.vista.ex, L.ALTURA + 2 * ctx.vista.ey);
    }
    requestAnimationFrame(quadro);
  }

  function receber(m) {
    if (m.t === 'g' && m.id === sessao.dono) {
      const agora = performance.now();
      const nova = lerFoto(m.d, q, agora);
      if (!nova) return;
      if (q) intervalo = L.clamp(intervalo * 0.8 + (agora - q.recebido) * 0.2, 30, 250);
      aplicarFotoNoConvidado(cv, nova);
      // efeitos do que aconteceu lá (o que aconteceu com a minha nave eu já mostrei aqui)
      const deles = nova.eventos.filter((e) => !(e.piloto === cv.id && (e.tipo === 'perdeu' || e.tipo === 'escudo_gasto' || e.tipo === 'teia')));
      reagirA(ef, deles, agora / 1000);
      if (nova.especie !== especie) {
        especie = nova.especie;
        musicaDa(especie, Math.min(3, 1 + Math.floor((nova.fase - 1) / 8)));
      }
      if (nova.fim && !(q && q.fim)) tocar('fim');
      q = nova;
    } else if (m.t === 'fim') {
      if (terminou) return;
      terminou = true;
      ativo = false;
      aoTerminar(resultado(m.motivo || ''));
    }
  }

  requestAnimationFrame(quadro);
  return { receber, parar: () => { ativo = false; } };
}
