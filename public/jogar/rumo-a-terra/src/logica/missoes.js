// Motor das missões (sem DOM e sem Three.js: testável no Node). Os dados estão em src/dados/missoes.js.
// Guarda em que missão e passo você está, conta o progresso e avança. O mundo (bichos, peças, nave) fica com o main.js,
// que avisa os acontecimentos com evento(...) e chama verificar(...) a cada passo do jogo.
import { MISSOES, SISTEMAS, TEMPO_TANQUE_S, VERSAO_CAMPANHA } from '../dados/missoes.js';
import { PONTOS } from '../dados/locais.js';
import { ITENS } from '../dados/itens.js';

const vazio = () => ({ m: 0, p: 0, n: 0, pegos: [], sistemas: Object.fromEntries(SISTEMAS.map((s) => [s.id, 0])), combustivel: 0, porta: false });

export function criarMissoes(salvo, inventario) {
  const e = vazio();
  if (salvo) {
    e.m = Math.min(salvo.m, MISSOES.length);
    e.p = salvo.p; e.n = salvo.n; e.pegos = [...salvo.pegos]; e.combustivel = salvo.combustivel; e.porta = !!salvo.porta;
    for (const [id, nivel] of salvo.sistemas) if (id in e.sistemas) e.sistemas[id] = nivel;
    if (e.m < MISSOES.length && e.p >= MISSOES[e.m].passos.length) { e.p = 0; e.n = 0; }
  }
  const ouvintes = { mudou: [], passo: [] };
  const avisar = (qual, ...a) => { for (const f of ouvintes[qual]) f(...a); };

  const missao = () => MISSOES[e.m] || null;
  const passo = () => (missao() ? missao().passos[e.p] : null);
  const tag = () => (missao() ? `${missao().id}:${e.p}` : '');
  const tem = (custos) => Object.entries(custos).every(([id, n]) => inventario.quantos(id) >= n);

  // Termina o passo atual e vai para o próximo. Devolve as mensagens da ÍRIS.
  function avancar() {
    const msgs = [...(passo().msgFim || [])];
    e.p++; e.n = 0; e.pegos = [];
    if (e.p >= missao().passos.length) {
      msgs.push(`✅ Missão completa: ${missao().titulo}!`);
      e.m++; e.p = 0;
      if (missao()) msgs.push(`Nova missão: ${missao().icone} ${missao().titulo}`);
    }
    avisar('mudou');
    if (passo()) avisar('passo', passo(), tag());
    return msgs;
  }

  // Acontecimentos do jogo: 'falou', 'pegou' {id}, 'derrotou' {tag}, 'abriu', 'minijogo', 'decolou'.
  function evento(tipo, dados = {}) {
    const ps = passo();
    if (!ps) return [];
    if (tipo === 'falou' && ps.tipo === 'falar') return avancar();
    if (tipo === 'minijogo' && ps.tipo === 'minijogo') return avancar();
    if (tipo === 'decolou' && ps.tipo === 'decolar') return avancar();
    if (tipo === 'abriu' && ps.tipo === 'abrir') { e.porta = true; return avancar(); }
    if (tipo === 'derrotou' && dados.tag === tag()) {
      if (ps.tipo === 'chefe') return avancar();
      if (ps.tipo === 'derrotar') { e.n++; avisar('mudou'); if (e.n >= ps.qtd) return avancar(); }
    }
    if (tipo === 'pegou') {
      if (ps.tipo === 'pegar' && dados.id === ps.item) return avancar();
      if (ps.tipo === 'achar' && dados.id.startsWith(ps.item + ':') && !e.pegos.includes(dados.id)) {
        e.pegos.push(dados.id); e.n++; avisar('mudou');
        if (e.n >= PONTOS[ps.item].length) return avancar();
      }
    }
    return [];
  }

  // Chamado a cada passo do jogo. ctx = { pertoDe(local) -> bool, fogueiraPertoDaNave -> bool }.
  function verificar(dt, ctx) {
    if (e.sistemas.combustivel > 0 && e.combustivel < 100) {
      const antes = Math.floor(e.combustivel);
      e.combustivel = Math.min(100, e.combustivel + (dt * 100) / TEMPO_TANQUE_S);
      if (Math.floor(e.combustivel) !== antes) avisar('mudou');
    }
    const ps = passo();
    if (!ps) return [];
    if (ps.tipo === 'ir' && ctx.pertoDe(ps.local)) return avancar();
    if (ps.tipo === 'coletar' && tem(ps.itens)) return avancar();
    if (ps.tipo === 'criar' && inventario.quantos(ps.item) >= ps.qtd) return avancar();
    if (ps.tipo === 'construir' && ctx.fogueiraPertoDaNave) return avancar();
    if (ps.tipo === 'esperar' && e.combustivel >= 100) return avancar();
    return [];
  }

  // Instalar no Painel da nave: confere, gasta os itens e conserta o sistema.
  function podeInstalar() {
    const ps = passo();
    if (!ps || ps.tipo !== 'instalar') return { ok: false, faltando: [] };
    const faltando = Object.entries(ps.precisa).filter(([id, n]) => inventario.quantos(id) < n).map(([id, n]) => [id, n - inventario.quantos(id)]);
    return { ok: faltando.length === 0, faltando };
  }
  function instalar() {
    if (!podeInstalar().ok) return null;
    const ps = passo();
    for (const [id, n] of Object.entries(ps.precisa)) inventario.remover(id, n);
    if (missao().sistema) e.sistemas[missao().sistema]++;
    return avancar();
  }

  // Texto do progresso do passo atual (para o HUD).
  function progresso() {
    const ps = passo();
    if (!ps) return '';
    if (ps.tipo === 'coletar') return Object.entries(ps.itens).map(([id, n]) => `${ITENS[id].icone} ${Math.min(inventario.quantos(id), n)}/${n}`).join('  ');
    if (ps.tipo === 'criar') return `${ITENS[ps.item].icone} ${Math.min(inventario.quantos(ps.item), ps.qtd)}/${ps.qtd}`;
    if (ps.tipo === 'derrotar') return `${e.n}/${ps.qtd}`;
    if (ps.tipo === 'achar') return `${ITENS[ps.item].icone} ${e.n}/${PONTOS[ps.item].length}`;
    if (ps.tipo === 'instalar') return Object.entries(ps.precisa).map(([id, n]) => `${ITENS[id].icone} ${Math.min(inventario.quantos(id), n)}/${n}`).join('  ');
    if (ps.tipo === 'esperar') return `Tanque: ${Math.floor(e.combustivel)}%`;
    if (ps.tipo === 'abrir' && ps.precisa) return Object.entries(ps.precisa).map(([id, n]) => `${ITENS[id].icone} ${Math.min(inventario.quantos(id), n)}/${n}`).join('  ');
    return '';
  }

  return {
    missao, passo, tag, evento, verificar, podeInstalar, instalar, progresso,
    get estado() { return e; },
    get fim() { return e.m >= MISSOES.length; },
    get indice() { return e.m; },
    // Receita liberada? (receitas com "desde" aparecem a partir daquela missão)
    receitaLiberada: (r) => !r.desde || MISSOES.findIndex((x) => x.id === r.desde) <= e.m,
    aoMudar(f) { ouvintes.mudou.push(f); },
    aoComecarPasso(f) { ouvintes.passo.push(f); },
    serializar: () => ({ v: VERSAO_CAMPANHA, m: e.m, p: e.p, n: e.n, pegos: [...e.pegos], sistemas: Object.entries(e.sistemas), combustivel: Math.floor(e.combustivel), porta: e.porta }),
    // Para testes e para "Novo jogo".
    reiniciar() { Object.assign(e, vazio()); avisar('mudou'); if (passo()) avisar('passo', passo(), tag()); },
  };
}
