// Laço do duelo frente a frente (Etapa 4, #24). A regra fica em duelo.js; aqui ficam o tempo, a troca de mensagens
// com a sala (umas 20 por segundo), os sons, os efeitos e o desenho.
import * as L from './logica.js?v=11';
import {
  novoDuelo, passoDuelo, mensagemDuelo, receberDuelo, meuTiroAcertou, alienDerrubado, posicaoDele, Y_EU, Y_ELE,
} from './duelo.js?v=11';
import { desenharDuelo } from './desenho-duelo.js?v=11';
import { novosEfeitos, reagir, atualizarEfeitos, rastroDoMotor } from './efeitos.js?v=11';
import { tocar, vibrar } from './som.js?v=11';
import { tocarMusica } from './musica.js?v=11';

const ENVIO_MS = 50; // 20 mensagens por segundo
const ENTRE_RODADAS_MS = 2400; // tempo mostrando quem ganhou a rodada
const SONS = { tiro: 'tiro', perdeu: 'perdeu', escudo_gasto: 'escudo', casco: 'casco', explosao: 'explosao' };

// `sessao`: { con, meuId, pilotos: Map(id -> { name, nave, cor }) }. `inicio`: { semente, rodada, ordem }.
// `aoTerminar({ venci, minhas, dele, nomeDele, motivo })` é chamado uma vez, no fim do duelo.
export function iniciarDuelo(ctx, sessao, inicio, aoTerminar) {
  const outroId = inicio.ordem.find((id) => id !== sessao.meuId);
  const nomeDele = (sessao.pilotos.get(outroId) || {}).name || 'Adversário';
  const naveIdx = ctx.naveIndice();
  const corIdx = ctx.corIndice();
  const primeiro = inicio.ordem[0] === sessao.meuId;
  const novo = (semente, rodada) => novoDuelo({ semente, rodada, primeiro, nave: ctx.naveAtual() });
  let d = novo(inicio.semente, inicio.rodada);
  const ef = novosEfeitos();
  ef.tremorMax = ctx.menosTremor() ? 0 : 1;
  const placar = { minhas: 0, dele: 0 };
  let aviso = null; // texto grande no meio
  let proxima = null; // a rodada seguinte, depois do aviso
  let fim = null; // o resultado, depois do aviso
  let ativo = true;
  let ultimoQuadro = 0;
  let ultimoEnvio = 0;
  const relogio = { sobra: 0 };

  function tratarEventos() {
    const tocados = new Set();
    for (const ev of d.eventos.splice(0)) {
      reagir(ef, ev);
      const som = SONS[ev.tipo];
      if (som && !tocados.has(som)) { tocados.add(som); tocar(som); }
      if (ev.tipo === 'capsula') tocar('capsula', ev.capsula);
      if (ev.tipo === 'perdeu') vibrar(80);
      if (ev.tipo === 'acertado') sessao.con.enviar({ t: 'e', d: [1, ev.id, ev.escudo ? 1 : 0] });
      if (ev.tipo === 'pedir_alien') sessao.con.enviar({ t: 'alien', i: ev.i, r: d.rodada });
      if (ev.tipo === 'perdi_rodada') sessao.con.enviar({ t: 'perdi', r: d.rodada });
    }
  }

  function quadro(tms) {
    if (!ativo) return;
    const dt = ultimoQuadro ? Math.min((tms - ultimoQuadro) / 1000, 0.25) : 0;
    ultimoQuadro = tms;
    const agora = performance.now();
    if (fim && agora >= fim.em) {
      parar();
      aoTerminar(fim.resultado);
      return;
    }
    if (proxima && agora >= proxima.em) {
      d = novo(proxima.semente, proxima.rodada);
      proxima = null;
      aviso = null;
      relogio.sobra = 0;
    }
    if (!proxima && !fim) {
      // passos fixos, como na partida normal (o desenho fica entre um passo e o outro)
      relogio.sobra += dt;
      let passos = 0;
      const dir = ctx.direcaoDaEntrada();
      while (relogio.sobra >= L.PASSO && passos < L.PASSOS_POR_QUADRO_MAX) {
        passoDuelo(d, L.PASSO, dir, agora);
        relogio.sobra -= L.PASSO;
        passos++;
      }
      if (passos >= L.PASSOS_POR_QUADRO_MAX) relogio.sobra = 0;
      tratarEventos();
      if (agora - ultimoEnvio >= ENVIO_MS) {
        ultimoEnvio = agora;
        sessao.con.enviar({ t: 'p', d: mensagemDuelo(d, naveIdx, corIdx) });
      }
    }
    const dtv = Math.min(dt, 0.05);
    atualizarEfeitos(ef, dtv);
    if (!d.perdeu) rastroDoMotor(ef, d.eu.x, Y_EU, dtv);
    const alfa = L.clamp(relogio.sobra / L.PASSO, 0, 1);
    desenharDuelo(ctx.g, d, ef, tms / 1000, ctx.vista, alfa, agora, { nomeDele, minhas: placar.minhas, dele: placar.dele, aviso });
    requestAnimationFrame(quadro);
  }

  function lerPlacar(vitorias) {
    placar.minhas = (vitorias && vitorias[sessao.meuId]) || 0;
    placar.dele = (vitorias && vitorias[outroId]) || 0;
  }

  function receber(m) {
    const agora = performance.now();
    if (m.t === 'p' && m.id === outroId) {
      receberDuelo(d, m.d, agora);
    } else if (m.t === 'e' && m.id === outroId && Array.isArray(m.d) && m.d[0] === 1) {
      // um tiro meu acertou nele
      meuTiroAcertou(d, m.d[1]);
      const x = posicaoDele(d, agora);
      if (m.d[2] === 1) reagir(ef, { tipo: 'escudo_gasto', x, y: Y_ELE });
      else reagir(ef, { tipo: 'parte_caiu', x, y: Y_ELE });
      tocar(m.d[2] === 1 ? 'escudo' : 'parte');
    } else if (m.t === 'alien' && m.r === d.rodada) {
      alienDerrubado(d, m.i, m.por === sessao.meuId);
    } else if (m.t === 'rodada') {
      lerPlacar(m.vitorias);
      const ganhei = m.ganhou === sessao.meuId;
      aviso = {
        titulo: ganhei ? 'RODADA SUA!' : 'RODADA DO RIVAL',
        sub: `${placar.minhas} × ${placar.dele} · vence quem ganhar 2`,
        cor: ganhei ? '#7dff9a' : '#ff8fb8',
      };
      tocar(ganhei ? 'vida' : 'perdeu');
      proxima = { semente: m.semente, rodada: m.rodada, em: agora + ENTRE_RODADAS_MS };
    } else if (m.t === 'fim') {
      lerPlacar(m.vitorias);
      const venci = m.vencedor === sessao.meuId;
      aviso = {
        titulo: venci ? 'VOCÊ VENCEU!' : 'FIM DO DUELO',
        sub: m.motivo === 'saiu' ? 'O outro piloto saiu.' : `${placar.minhas} × ${placar.dele}`,
        cor: venci ? '#7dff9a' : '#ff8fb8',
      };
      tocar(venci ? 'vida' : 'fim');
      proxima = null;
      fim = { em: agora + ENTRE_RODADAS_MS, resultado: { venci, minhas: placar.minhas, dele: placar.dele, nomeDele, motivo: m.motivo || '' } };
    }
  }

  function parar() {
    ativo = false;
  }

  tocarMusica('partida', 3);
  requestAnimationFrame(quadro);
  return { receber, parar };
}
