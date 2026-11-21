// GET /api/invasao-estelar/desafio[?escopo=dia|mes][&mes=AAAA-MM]
//   -> { dia, jogou, estado, resultado?, semente? (só para treinar depois de jogar), escopo, mes, total, top, eu?, proximoEm }
// O desafio do dia: as mesmas ondas para todo mundo, uma tentativa que vale ranking por conta e por dia (o dia troca à
// meia-noite de Brasília). Público; com login, traz a situação da pessoa. Ranking do mês: pontos por posição de cada dia.
import { json, semBanco, contaAtual } from '../../_lib/conta.js';
import { prepararPartidas, mesDe, mesValido, rankingDoDesafio, rankingMensalDoDesafio } from '../../_lib/invasao-estelar.js';
import { diaDe, sementeDoDia } from '../../_lib/ie-progresso.js';

const DIA_MS = 86400000;
const BRASILIA_MS = 3 * 3600000;

export async function onRequestGet({ request, env }) {
  if (!env.DB) return semBanco();
  await prepararPartidas(env.DB);
  const agora = Date.now();
  const dia = diaDe(agora);
  const url = new URL(request.url);
  const escopo = url.searchParams.get('escopo') === 'mes' ? 'mes' : 'dia';
  const mes = escopo === 'mes' ? (mesValido(url.searchParams.get('mes')) || mesDe(agora)) : null;
  const conta = await contaAtual(request, env);
  const contaId = conta ? conta.id : 0;
  const corpo = { dia, escopo, mes, proximoEm: DIA_MS - ((agora - BRASILIA_MS) % DIA_MS) };
  if (conta) {
    const minha = await env.DB.prepare('SELECT estado, pontos, fase FROM ie_desafio WHERE conta_id = ? AND dia = ?').bind(conta.id, dia).first();
    corpo.jogou = Boolean(minha);
    corpo.estado = minha ? minha.estado : null;
    if (minha && minha.estado === 'enviada') corpo.resultado = { pontos: minha.pontos, fase: minha.fase };
    if (minha) corpo.semente = sementeDoDia(dia); // depois da tentativa, dá para treinar à vontade
  }
  const r = escopo === 'mes' ? await rankingMensalDoDesafio(env.DB, { mes, contaId }) : await rankingDoDesafio(env.DB, { dia, contaId });
  corpo.total = r.total;
  corpo.top = r.top;
  if (r.eu) corpo.eu = r.eu;
  return json(corpo);
}
