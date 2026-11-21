// Jogar com amigos (Etapa 4): a tela "Jogar com amigos", a sala de espera do online, o desafio por código e a tela
// de resultado do online. Só com conta (o nome é o apelido); sem chat; só números passam pelo servidor.
import { onlineNoAr, codigoDeSala, conectar, CODIGO_RE } from './online.js?v=11';
import { amigoCriar, amigo, amigoIniciar } from './conta-ponte.js?v=11';
import { iniciarDuelo } from './jogo-duelo.js?v=11';
import { iniciarEsquadrao } from './jogo-esquadrao.js?v=11';
import { ORDEM_NAVES, ORDEM_CORES } from './duelo.js?v=11';
import { linhaDeRanking, iconeNave } from './piloto.js?v=11';
import { tocar, liberarSom } from './som.js?v=11';
import { tocarMusica, pararMusica } from './musica.js?v=11';

const NOMES_JOGO = { duelo: 'Duelo', esquadrao: 'Esquadrão' };
const MIN_JOGO = { duelo: 2, esquadrao: 2 };
const MAX_JOGO = { duelo: 2, esquadrao: 4 };
const REGRAS = {
  duelo: 'Um contra o outro. Cada um tem 3 naves; vence quem ganhar 2 rodadas.',
  esquadrao: 'De 2 a 4 pilotos, juntos contra as ondas. Quem cair pode ser salvo por um colega.',
};
const ESCONDIDO_MS = 10000; // o celular foi para outro aplicativo durante o online: depois disso, sai da partida
const formatarDia = (ms) => new Date(ms).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Sao_Paulo' });
const faixaDaOnda = (onda) => (onda <= 4 ? 'onda1a4' : onda <= 8 ? 'onda5a8' : 'onda9mais');

export function iniciarAmigos(ctx) {
  const { $, elemento } = ctx;
  let sessao = null; // a sala online aberta agora
  let codigoAberto = null; // o desafio por código aberto na tela
  let escondido = 0; // relógio para sair se o celular ficar em outro aplicativo

  const status = (texto) => { $('status-amigos').textContent = texto; };

  /* ---------- tela "Jogar com amigos" ---------- */
  async function abrir() {
    ctx.mostrar('tela-amigos');
    ctx.ligarMenu();
    tocarMusica('menu', 0);
    status('');
    const logado = ctx.logado();
    $('amigos-conta').hidden = logado;
    $('btn-amigos-entrar').hidden = logado;
    $('amigos-opcoes').hidden = !logado;
    if (!logado) return;
    $('amigos-ao-vivo').hidden = true;
    $('amigos-ao-vivo-aviso').textContent = 'Procurando o servidor do jogo ao vivo...';
    const noAr = await onlineNoAr();
    $('amigos-ao-vivo').hidden = !noAr;
    $('amigos-ao-vivo-aviso').textContent = noAr ? '' : 'O jogo ao vivo chega em breve. Por enquanto, dá para desafiar por código.';
  }

  async function entrarNaConta() {
    if (await ctx.entrar()) abrir();
  }

  async function criarSala(jogo) {
    liberarSom();
    status('Criando a sala...');
    const r = await codigoDeSala();
    if (r.erro) {
      status(`Não deu para criar a sala: ${r.erro}.`);
      return;
    }
    status('');
    entrarNaSala(r.codigo, { criar: true, jogo });
  }

  // "Tenho um código": pode ser um desafio por código ou uma sala ao vivo.
  async function usarCodigo() {
    liberarSom();
    const campo = $('campo-codigo');
    const codigo = campo.value.trim().toUpperCase();
    campo.value = codigo;
    if (!CODIGO_RE.test(codigo)) {
      status('O código tem 4 letras ou números (sem 0, O, 1 e I).');
      return;
    }
    status('Procurando o código...');
    const r = await amigo(codigo);
    if (!r.erro) {
      status('');
      abrirCodigo(codigo, r);
      return;
    }
    if (r.status !== 404) {
      status(`${r.erro[0].toUpperCase()}${r.erro.slice(1)}.`);
      return;
    }
    if ($('amigos-ao-vivo').hidden) {
      status('Não achei esse código. Confira as letras.');
      return;
    }
    entrarNaSala(codigo, { criar: false });
  }

  /* ---------- sala online ---------- */
  function entrarNaSala(codigo, { criar, jogo = 'duelo' }) {
    fecharSessao();
    const s = { codigo, jogo, meuId: 0, dono: 0, pilotos: new Map(), jogoAtivo: null, estado: 'conectando', con: null };
    sessao = s;
    status('Entrando na sala...');
    s.con = conectar(
      { codigo, criar, jogo, nave: ctx.naveIndice(), cor: ctx.corIndice() },
      (m) => receber(s, m),
      (motivo) => caiu(s, motivo),
    );
  }

  function receber(s, m) {
    if (s !== sessao) return;
    if (m.t === 'welcome') {
      s.meuId = m.id;
      s.dono = m.dono;
      s.jogo = m.jogo === 'esquadrao' ? 'esquadrao' : 'duelo';
      s.pilotos = new Map((m.players || []).map((p) => [p.id, p]));
      s.estado = 'sala';
      status('');
      abrirSala();
      tocar('capsula', 'escudo');
    } else if (m.t === 'join') {
      s.pilotos.set(m.id, { id: m.id, name: m.name, nave: m.nave, cor: m.cor });
      if (s.estado === 'sala') desenharSala();
      if (s.estado !== 'jogo') tocar('capsula', 'duplo');
    } else if (m.t === 'leave') {
      s.pilotos.delete(m.id);
      if (s.jogoAtivo) s.jogoAtivo.receber(m);
      if (s.estado === 'sala') desenharSala();
      if (s.estado === 'fim') atualizarRevanche();
    } else if (m.t === 'dono') {
      s.dono = m.id;
      if (s.estado === 'sala') desenharSala();
      if (s.estado === 'fim') atualizarRevanche();
    } else if (m.t === 'comecar') {
      comecarJogo(s, m);
    } else if (s.jogoAtivo) {
      s.jogoAtivo.receber(m);
    }
  }

  function caiu(s, motivo) {
    if (s !== sessao) return;
    const estava = s.estado;
    pararJogo(s);
    sessao = null;
    if (estava === 'conectando') {
      abrir().then(() => status(/Não achei/.test(motivo) ? 'Não achei esse código. Confira as letras.' : `${motivo[0].toUpperCase()}${motivo.slice(1)}`));
    } else if (estava === 'jogo' || estava === 'fim') {
      abrirFim(s, null, `A conexão acabou: ${motivo}.`);
    } else {
      abrir().then(() => status(`Saiu da sala: ${motivo}.`));
    }
  }

  function linhaDePiloto(s, p, extra = '') {
    const li = elemento('li', { class: p.id === s.meuId ? 'piloto eu' : 'piloto' });
    li.append(iconeNave(ORDEM_NAVES[p.nave] || 'padrao', 30, ORDEM_CORES[p.cor] || 'azul'), elemento('span', { class: 'nome', text: p.name }));
    const marcas = [];
    if (p.id === s.meuId) marcas.push('você');
    if (p.id === s.dono) marcas.push('criou');
    if (marcas.length) li.append(elemento('span', { class: 'marca', text: marcas.join(' · ') }));
    if (extra) li.append(elemento('span', { class: 'pontos-piloto', text: extra }));
    return li;
  }

  function abrirSala() {
    ctx.mostrar('tela-sala');
    ctx.ligarMenu();
    desenharSala();
  }

  function desenharSala() {
    const s = sessao;
    if (!s) return;
    $('sala-titulo').textContent = NOMES_JOGO[s.jogo];
    $('sala-codigo').textContent = s.codigo;
    $('sala-regras').textContent = REGRAS[s.jogo];
    $('sala-pilotos').replaceChildren(...[...s.pilotos.values()].sort((a, b) => a.id - b.id).map((p) => linhaDePiloto(s, p)));
    const n = s.pilotos.size;
    const souDono = s.dono === s.meuId;
    $('btn-comecar-sala').hidden = !souDono;
    $('btn-comecar-sala').disabled = n < MIN_JOGO[s.jogo];
    if (!souDono) $('sala-status').textContent = 'Esperando quem criou a sala começar...';
    else if (n < MIN_JOGO[s.jogo]) $('sala-status').textContent = 'Esperando mais um piloto entrar com o código...';
    else if (n < MAX_JOGO[s.jogo]) $('sala-status').textContent = `Pode começar, ou esperar mais pilotos (até ${MAX_JOGO[s.jogo]}).`;
    else $('sala-status').textContent = 'Sala cheia! Pode começar.';
  }

  function comecarSala() {
    if (!sessao || sessao.dono !== sessao.meuId) return;
    liberarSom();
    sessao.con.enviar({ t: 'comecar' });
  }

  function comecarJogo(s, m) {
    pararJogo(s);
    s.estado = 'jogo';
    mostrarSair(false);
    ctx.entrarNoJogo({ tocarPausa: () => mostrarSair(true) });
    const inicio = { semente: m.semente, rodada: m.rodada, ordem: m.ordem || [] };
    const aoTerminar = (res) => terminarJogo(s, res);
    s.jogoAtivo = s.jogo === 'duelo' ? iniciarDuelo(ctx, s, inicio, aoTerminar) : iniciarEsquadrao(ctx, s, inicio, aoTerminar);
    ctx.evento('partida_iniciada', { modo: s.jogo, conta: 'sim' });
  }

  function pararJogo(s) {
    if (s.jogoAtivo) s.jogoAtivo.parar();
    s.jogoAtivo = null;
    clearTimeout(escondido);
    mostrarSair(false);
    ctx.sairDoJogo();
  }

  function terminarJogo(s, res) {
    if (s !== sessao) return;
    pararJogo(s);
    pararMusica();
    s.estado = 'fim';
    if (s.jogo === 'duelo') ctx.evento('online', { modo: 'duelo', resultado: res.venci ? 'venceu' : 'perdeu' });
    else ctx.evento('online', { modo: 'esquadrao', resultado: faixaDaOnda(res.onda || 1) });
    abrirFim(s, res, '');
  }

  /* ---------- resultado do online ---------- */
  function abrirFim(s, res, aviso) {
    ctx.mostrar('tela-fim-online');
    ctx.ligarMenu();
    tocarMusica('menu', 0);
    const lista = $('fim-online-pilotos');
    if (!res) {
      $('fim-online-titulo').textContent = 'Fim da partida';
      $('fim-online-placar').textContent = '';
      lista.replaceChildren();
    } else if (s.jogo === 'duelo') {
      $('fim-online-titulo').textContent = res.venci ? 'Você venceu o duelo!' : 'Fim do duelo';
      $('fim-online-placar').textContent = `${res.minhas} × ${res.dele}`;
      lista.replaceChildren(...[...s.pilotos.values()].sort((a, b) => (a.id === s.meuId ? -1 : b.id === s.meuId ? 1 : 0))
        .map((p) => linhaDePiloto(s, p, `${p.id === s.meuId ? res.minhas : res.dele} ${(p.id === s.meuId ? res.minhas : res.dele) === 1 ? 'rodada' : 'rodadas'}`)));
      if (res.motivo === 'saiu') aviso = 'O outro piloto saiu do duelo.';
    } else {
      $('fim-online-titulo').textContent = 'Fim do esquadrão';
      $('fim-online-placar').textContent = `${res.pontos.toLocaleString('pt-BR')} pontos · onda ${res.onda}`;
      const pontos = res.porPiloto || {};
      const nomes = res.nomes || {};
      const ids = Object.keys(pontos).map(Number).sort((a, b) => (pontos[b] || 0) - (pontos[a] || 0));
      lista.replaceChildren(...ids.map((id) => linhaDePiloto(s, s.pilotos.get(id) || { id, name: nomes[id] || 'Piloto', nave: 0, cor: 0 }, `${(pontos[id] || 0).toLocaleString('pt-BR')} pts`)));
      if (res.motivo === 'dono-saiu') aviso = 'Quem criou a sala saiu, e a partida acabou.';
    }
    $('fim-online-status').textContent = aviso || '';
    atualizarRevanche();
  }

  function atualizarRevanche() {
    const s = sessao;
    const b = $('btn-revanche');
    if (!s || s.estado !== 'fim') {
      b.hidden = true;
      return;
    }
    const n = s.pilotos.size;
    const souDono = s.dono === s.meuId;
    b.hidden = !souDono || n < MIN_JOGO[s.jogo];
    const aviso = $('fim-online-espera');
    if (n < MIN_JOGO[s.jogo]) aviso.textContent = 'Não sobrou ninguém na sala para jogar de novo.';
    else aviso.textContent = souDono ? '' : 'Se quem criou a sala tocar em "Jogar de novo", a próxima começa sozinha.';
  }

  function revanche() {
    if (!sessao || sessao.estado !== 'fim' || sessao.dono !== sessao.meuId) return;
    liberarSom();
    sessao.con.enviar({ t: 'comecar' });
  }

  function fecharSessao() {
    const s = sessao;
    if (!s) return;
    pararJogo(s);
    sessao = null;
    s.con.sair();
  }

  function sairDaSala() {
    fecharSessao();
    abrir();
  }

  /* ---------- sair no meio da partida online ---------- */
  function mostrarSair(sim) {
    const s = sessao;
    $('sair-online').hidden = !sim;
    if (!sim || !s) return;
    $('sair-online-texto').textContent = s.jogo === 'duelo'
      ? 'Se sair agora, você perde o duelo.'
      : s.dono === s.meuId ? 'Você criou a sala: se sair, a partida acaba para todos.' : 'Os outros pilotos continuam jogando sem você.';
  }

  function deixarPartida() {
    fecharSessao();
    pararMusica();
    abrir();
  }

  // O celular foi para outro aplicativo durante uma partida online: a partida não para (os outros continuam).
  function visibilidade(escondida) {
    clearTimeout(escondido);
    if (escondida && sessao && sessao.estado === 'jogo') escondido = setTimeout(deixarPartida, ESCONDIDO_MS);
  }

  /* ---------- desafio por código (não precisa jogar ao mesmo tempo) ---------- */
  async function criarCodigo() {
    liberarSom();
    status('Criando o código...');
    const r = await amigoCriar();
    if (r.erro) {
      status(`Não deu para criar o código: ${r.erro}.`);
      return;
    }
    status('');
    abrirCodigo(r.codigo, null, true);
  }

  async function abrirCodigo(codigo, dados = null, novo = false) {
    codigoAberto = codigo;
    ctx.mostrar('tela-codigo');
    ctx.ligarMenu();
    $('codigo-titulo').textContent = codigo;
    $('codigo-novo').hidden = !novo;
    $('codigo-novo-letras').textContent = codigo;
    $('lista-codigo').replaceChildren();
    $('status-codigo').textContent = 'Carregando...';
    $('btn-jogar-codigo').hidden = true;
    const d = dados || await amigo(codigo);
    if (codigoAberto !== codigo) return;
    if (d.erro) {
      $('codigo-info').textContent = '';
      $('status-codigo').textContent = `${d.erro[0].toUpperCase()}${d.erro.slice(1)}.`;
      return;
    }
    $('codigo-info').textContent = d.expirado
      ? `Criado por ${d.criador}. Este código já venceu (valia 7 dias).`
      : `Criado por ${d.criador} · todo mundo joga as mesmas ondas · vale até ${formatarDia(d.expiraEm)}.`;
    $('btn-jogar-codigo').hidden = Boolean(d.expirado);
    const lista = $('lista-codigo');
    lista.replaceChildren(...d.top.map((i) => linhaDeRanking(i, { eu: Boolean(d.eu && i.posicao === d.eu.posicao) })));
    if (d.eu && d.eu.posicao > d.top.length) lista.append(elemento('li', { class: 'separador', text: '···' }), linhaDeRanking(d.eu, { eu: true }));
    $('status-codigo').textContent = d.total ? `${d.total} ${d.total === 1 ? 'piloto jogou' : 'pilotos jogaram'} este código.` : 'Ninguém jogou este código ainda.';
  }

  async function jogarCodigo(codigo = codigoAberto) {
    if (!codigo) return;
    liberarSom();
    const r = await amigoIniciar(codigo);
    if (r.erro) {
      if (!$('tela-codigo').hidden) $('status-codigo').textContent = `${r.erro[0].toUpperCase()}${r.erro.slice(1)}.`;
      return r;
    }
    ctx.jogarCodigo({ codigo, semente: r.semente, partida: r.partida });
    return r;
  }

  /* ---------- botões ---------- */
  $('btn-amigos-entrar').addEventListener('click', entrarNaConta);
  $('btn-criar-duelo').addEventListener('click', () => criarSala('duelo'));
  $('btn-criar-esquadrao').addEventListener('click', () => criarSala('esquadrao'));
  $('btn-usar-codigo').addEventListener('click', usarCodigo);
  $('campo-codigo').addEventListener('keydown', (e) => { if (e.key === 'Enter') usarCodigo(); });
  $('campo-codigo').addEventListener('input', (e) => {
    // só as letras e números que existem nos códigos
    const limpo = e.target.value.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, '').slice(0, 4);
    if (limpo !== e.target.value) e.target.value = limpo;
  });
  $('btn-criar-codigo').addEventListener('click', criarCodigo);
  $('btn-voltar-amigos').addEventListener('click', ctx.abrirInicio);
  $('btn-comecar-sala').addEventListener('click', comecarSala);
  $('btn-sair-sala').addEventListener('click', sairDaSala);
  $('btn-revanche').addEventListener('click', revanche);
  $('btn-sair-online').addEventListener('click', sairDaSala);
  $('btn-ficar-online').addEventListener('click', () => mostrarSair(false));
  $('btn-deixar-online').addEventListener('click', deixarPartida);
  $('btn-jogar-codigo').addEventListener('click', () => jogarCodigo());
  $('btn-voltar-codigo').addEventListener('click', abrir);

  return { abrir, abrirCodigo, jogarCodigo, visibilidade, emPartida: () => Boolean(sessao && sessao.estado === 'jogo') };
}
