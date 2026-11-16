// GET /api/painel/resumo[?dias=14][&jogo=<slug>]  -> números SOMADOS por jogo, dia e versão (nunca dados individuais).
// Protegido: precisa do cabeçalho  Authorization: Bearer <chave>  igual ao segredo PAINEL_CHAVE do Cloudflare.
//  - sem o segredo configurado: 503;  chave errada ou ausente: 401;  sem o banco: 503.
// Quem lê: o painel (/painel) e, no futuro, as rotinas agendadas do Claude Code.
import { chaveConfigurada, chaveValida, diaBrasilia, FUSO, json, lerConfig, prepararBanco, SLUG } from '../../_lib/telemetria.js';

const NOTAS = [
  'Dia = dia no horário de Brasília. Versão = commit curto do jogo de origem (public/jogar/<slug>/versao.json) ou "sem-versao".',
  'sessoes = aba aberta e usada; nova sessão depois de 30 min parado. Não há como ligar sessões a pessoas.',
  'aparelhos_dia = aparelhos diferentes naquele dia; somar dias conta o mesmo aparelho de novo (não é "aparelhos únicos do período").',
  'voltaram = aparelhos que abriram o jogo de novo em outro dia, por tempo desde a última visita (1 dia, 2 a 7 dias, 8 dias ou mais). Aparelho que limpa os dados do navegador conta como novo.',
  'tempo_ativo_s só conta aba visível e com toque, clique, tecla ou rolagem nos últimos 30 s. Controle de videogame não conta como interação.',
  'alcancaram_Ns = sessões que chegaram a N segundos ativos. saida_rapida_pct = sessões que não chegaram a 10 s ativos (inclui lotes finais perdidos).',
  'erros = erros de JavaScript (contagem). A lista "erros" tem os mais frequentes, agrupados por mensagem, arquivo e linha; há teto de tipos distintos por jogo e dia.',
  'amostra_pequena = true quando há menos de 30 sessões: não tire conclusões.',
  'Quem não quer ser medido (Do Not Track / Global Privacy Control) não entra nos números.',
];

const soma = (linhas, campo) => linhas.reduce((t, l) => t + (l[campo] || 0), 0);
const pct = (a, b) => (b > 0 ? Math.round((a / b) * 1000) / 10 : null);
const media = (a, b) => (b > 0 ? Math.round((a / b) * 10) / 10 : null);

function resumirLinhas(linhas) {
  const sessoes = soma(linhas, 'sessoes');
  const m10 = Math.min(soma(linhas, 'm10'), sessoes);
  return {
    sessoes,
    aparelhos_dia: soma(linhas, 'aparelhos'),
    aparelhos_novos: soma(linhas, 'novos'),
    voltaram: { depois_de_1_dia: soma(linhas, 'ret_1'), depois_de_2_a_7_dias: soma(linhas, 'ret_2a7'), depois_de_8_ou_mais_dias: soma(linhas, 'ret_8mais') },
    aparelho: { celular: soma(linhas, 'cel'), computador: soma(linhas, 'comp') },
    tela_largura: {
      menos_de_360: soma(linhas, 'tela_1'), de_360_a_413: soma(linhas, 'tela_2'), de_414_a_599: soma(linhas, 'tela_3'),
      de_600_a_899: soma(linhas, 'tela_4'), de_900_a_1279: soma(linhas, 'tela_5'), de_1280_ou_mais: soma(linhas, 'tela_6'),
    },
    tempo_ativo_s: soma(linhas, 'tempo_s'),
    tempo_ativo_medio_por_sessao_s: media(soma(linhas, 'tempo_s'), sessoes),
    alcancaram_10s: m10, alcancaram_60s: soma(linhas, 'm60'), alcancaram_300s: soma(linhas, 'm300'), alcancaram_900s: soma(linhas, 'm900'),
    saida_rapida_pct: sessoes ? pct(sessoes - m10, sessoes) : null,
    erros: soma(linhas, 'erros'),
    erros_por_100_sessoes: sessoes ? media(soma(linhas, 'erros') * 100, sessoes) : null,
    amostra_pequena: sessoes < 30,
  };
}

export async function onRequestGet({ request, env }) {
  if (!chaveConfigurada(env) || !env.DB) return json({ erro: 'painel não configurado' }, 503);
  if (!(await chaveValida(request, env))) return json({ erro: 'chave inválida' }, 401, { 'www-authenticate': 'Bearer' });

  const url = new URL(request.url);
  const dias = Math.min(90, Math.max(1, Math.trunc(Number(url.searchParams.get('dias') || 14)) || 14));
  const filtro = url.searchParams.get('jogo');
  if (filtro && !SLUG.test(filtro)) return json({ erro: 'jogo inválido' }, 400);
  const de = diaBrasilia(Date.now() - (dias - 1) * 86400 * 1000);
  const ate = diaBrasilia();

  await prepararBanco(env.DB);
  const cfg = await lerConfig(request, env);
  const where = filtro ? 'dia >= ?1 AND jogo = ?2' : 'dia >= ?1';
  const args = filtro ? [de, filtro] : [de];
  const [diario, erros, eventos] = await Promise.all([
    env.DB.prepare(`SELECT * FROM tel_diario WHERE ${where} ORDER BY jogo, dia, versao`).bind(...args).all(),
    env.DB.prepare(`SELECT jogo, versao, dia, mensagem, arquivo, linha, vezes FROM tel_erros WHERE ${where} ORDER BY vezes DESC LIMIT 400`).bind(...args).all(),
    env.DB.prepare(
      `SELECT jogo, versao, nome, valor, SUM(vezes) AS vezes, SUM(sessoes) AS sessoes FROM tel_eventos WHERE ${where} GROUP BY jogo, versao, nome, valor ORDER BY jogo, nome, versao, vezes DESC LIMIT 400`,
    ).bind(...args).all(),
  ]);

  const slugs = new Set(filtro ? [filtro] : Object.keys(cfg));
  for (const l of [...diario.results, ...erros.results, ...eventos.results]) slugs.add(l.jogo);

  const jogos = {};
  for (const slug of [...slugs].sort()) {
    const linhas = diario.results.filter((l) => l.jogo === slug);
    const versoes = [...new Set(linhas.map((l) => l.versao))];
    jogos[slug] = {
      versao_publicada: cfg[slug]?.versao ?? null,
      eventos_permitidos: cfg[slug]?.eventos ?? [],
      total_do_periodo: resumirLinhas(linhas),
      por_versao: versoes
        .map((versao) => {
          const l = linhas.filter((x) => x.versao === versao);
          const dias_com_dados = l.map((x) => x.dia).sort();
          return { versao, primeiro_dia: dias_com_dados[0], ultimo_dia: dias_com_dados[dias_com_dados.length - 1], dias_com_dados: new Set(dias_com_dados).size, ...resumirLinhas(l) };
        })
        .sort((a, b) => (a.primeiro_dia < b.primeiro_dia ? -1 : 1)),
      por_dia: linhas.map((l) => ({ dia: l.dia, versao: l.versao, ...resumirLinhas([l]) })),
      erros_mais_frequentes: erros.results.filter((e) => e.jogo === slug).slice(0, 20).map(({ jogo, ...e }) => e),
      eventos: eventos.results.filter((e) => e.jogo === slug).map(({ jogo, ...e }) => e),
    };
  }

  return json({ gerado_em: new Date().toISOString(), fuso: FUSO, periodo: { de, ate, dias }, notas: NOTAS, jogos });
}
