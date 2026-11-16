// Telemetria anônima dos jogos do queres.games. Colocado nas páginas de /jogar/<slug>/ pelo build
// (scripts/pos-build.mjs); não precisa (e não deve) ser incluído à mão nos jogos.
//
// O que mede: sessões, tempo ativo, erros de JavaScript, celular/computador, faixa de largura da tela,
// aparelho que volta em outro dia e a versão do jogo. Mais os eventos opcionais de QG.evento().
// O que NÃO faz: não manda IP, nome, e-mail, texto livre nem identificador de aparelho ou de conta.
// A "memória" do aparelho (já visitou? quando?) fica só no navegador, em localStorage, e nunca é enviada:
// o que vai para o servidor são só contagens ("1 aparelho voltou depois de 2 a 7 dias").
// Respeita Do Not Track / Global Privacy Control. Nunca lança erro: tudo dentro de try/catch.
(function () {
  'use strict';
  function seguro(fn) { try { return fn(); } catch (e) { return undefined; } }

  var tag = document.currentScript;
  var jogo = seguro(function () { return tag.getAttribute('data-jogo'); });
  if (!jogo || window.__qgTelemetria) return;
  window.__qgTelemetria = true;
  var versao = seguro(function () { return tag.getAttribute('data-versao'); }) || 'sem-versao';
  var permitidos = (seguro(function () { return tag.getAttribute('data-eventos'); }) || '').split(',').filter(Boolean);

  var respeitarPrivacidade = seguro(function () {
    return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.globalPrivacyControl === true;
  });

  var URL_ENVIO = '/api/telemetria';
  var PARADO_MS = 30000;          // sem interação por 30 s: o tempo para de contar
  var SESSAO_MS = 30 * 60 * 1000; // mais de 30 min parado: sessão nova
  var MARCOS = [10, 60, 300, 900];
  var MAX_ERROS_POR_PAGINA = 3;
  var MAX_EVENTOS_POR_PAGINA = 40;

  // ---------- armazenamento (pode falhar em aba privada: tudo opcional) ----------
  function lerJson(armazem, chave) { return seguro(function () { var t = window[armazem].getItem(chave); return t ? JSON.parse(t) : null; }); }
  function gravarJson(armazem, chave, valor) { seguro(function () { window[armazem].setItem(chave, JSON.stringify(valor)); }); }

  // Dia no horário de Brasília (UTC-3 fixo), igual ao do servidor.
  function diaBrasilia() { return new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10); }
  function diasEntre(a, b) { return Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000); }

  // ---------- estado desta página ----------
  var pendente = { inicio: null, erros: [], eventos: {}, vistosNaPagina: {} };
  var acumMs = 0;                 // tempo ativo ainda não enviado
  var ultInteracao = Date.now();
  var ultTick = Date.now();
  var chaveSessao = 'qg_t_s_' + jogo;
  var sessao = null;              // { t: último movimento, c: segundos ativos da sessão, m: marcos já enviados }
  var errosEstaPagina = 0, eventosEstaPagina = 0, timerErro = null, timerEvento = null;

  function iniciarSessao() {
    var agora = Date.now();
    sessao = lerJson('sessionStorage', chaveSessao);
    var nova = !sessao || typeof sessao.t !== 'number' || agora - sessao.t > SESSAO_MS;
    if (nova) sessao = { t: agora, c: 0, m: [] };
    sessao.t = agora;
    gravarJson('sessionStorage', chaveSessao, sessao);
    if (!nova) return;

    // Sessão nova: tipo de aparelho, faixa de tela e "voltou em outro dia?" (conta feita aqui, no aparelho).
    var larg = window.innerWidth || document.documentElement.clientWidth || 0;
    var faixa = larg < 360 ? 1 : larg < 414 ? 2 : larg < 600 ? 3 : larg < 900 ? 4 : larg < 1280 ? 5 : 6;
    var toque = seguro(function () { return window.matchMedia('(pointer: coarse)').matches; });
    var inicio = { d: toque ? 'c' : 'p', t: faixa };
    var hoje = diaBrasilia();
    var chaveAparelho = 'qg_t_' + jogo;
    var memoria = lerJson('localStorage', chaveAparelho);
    var gravou = false;
    if (!memoria || typeof memoria.u !== 'string') {
      inicio.n = 1; inicio.a = 1; inicio.r = 0;
      gravou = seguro(function () { localStorage.setItem(chaveAparelho, JSON.stringify({ p: hoje, u: hoje })); return true; });
    } else if (memoria.u !== hoje) {
      var dias = diasEntre(memoria.u, hoje);
      inicio.n = 0; inicio.a = 1; inicio.r = dias <= 1 ? 1 : dias <= 7 ? 2 : 3;
      memoria.u = hoje;
      gravou = seguro(function () { localStorage.setItem(chaveAparelho, JSON.stringify(memoria)); return true; });
    } else {
      inicio.n = 0; inicio.a = 0; inicio.r = 0;
    }
    // Sem como lembrar o aparelho (aba privada, armazenamento bloqueado): não contamos aparelho nem retorno.
    if (!memoria && !gravou) { inicio.n = 0; inicio.a = 0; }
    pendente.inicio = inicio;
  }

  // ---------- envio ----------
  function enviar(lote) {
    var corpo = JSON.stringify(lote);
    seguro(function () {
      // fetch com keepalive sobrevive ao fechar a aba e NÃO leva cookies (credentials: 'omit').
      if (window.fetch && window.Request && 'keepalive' in Request.prototype) {
        fetch(URL_ENVIO, { method: 'POST', headers: { 'content-type': 'application/json' }, body: corpo, keepalive: true, credentials: 'omit' })
          .catch(function () {});
        return;
      }
      if (navigator.sendBeacon && navigator.sendBeacon(URL_ENVIO, new Blob([corpo], { type: 'application/json' }))) return;
      fetch(URL_ENVIO, { method: 'POST', headers: { 'content-type': 'application/json' }, body: corpo, credentials: 'omit' }).catch(function () {});
    });
  }

  function descarregar() {
    if (respeitarPrivacidade) return; // quem pediu para não ser medido não manda nada
    seguro(function () {
      tickAtivo();
      var seg = Math.floor(acumMs / 1000);
      acumMs -= seg * 1000;
      var lote = { j: jogo, v: versao };
      var algo = false;
      if (pendente.inicio) { lote.i = pendente.inicio; pendente.inicio = null; algo = true; }
      if (seg > 0 && sessao) {
        lote.a = seg; algo = true;
        sessao.c += seg;
        var novos = MARCOS.filter(function (m) { return sessao.c >= m && sessao.m.indexOf(m) < 0; });
        if (novos.length) { lote.m = novos; sessao.m = sessao.m.concat(novos); }
      } else if (seg > 0) { lote.a = seg; algo = true; }
      if (pendente.erros.length) { lote.e = pendente.erros; pendente.erros = []; algo = true; }
      var nomes = Object.keys(pendente.eventos);
      if (nomes.length) {
        lote.x = nomes.map(function (k) { return pendente.eventos[k]; });
        pendente.eventos = {};
        algo = true;
      }
      if (sessao) { sessao.t = Date.now(); gravarJson('sessionStorage', chaveSessao, sessao); }
      if (algo) enviar(lote);
    });
  }

  // ---------- tempo ativo (aba visível + interação recente) ----------
  function tickAtivo() {
    var agora = Date.now();
    var dt = agora - ultTick;
    ultTick = agora;
    if (document.visibilityState === 'visible' && agora - ultInteracao < PARADO_MS) acumMs += Math.min(dt, 2500);
  }
  function interagiu() { ultInteracao = Date.now(); }
  ['pointerdown', 'pointermove', 'keydown', 'touchstart', 'wheel', 'scroll', 'click'].forEach(function (nome) {
    seguro(function () { window.addEventListener(nome, interagiu, { capture: true, passive: true }); });
  });

  // ---------- erros de JavaScript ----------
  function limparTexto(t, max) {
    return String(t == null ? '' : t)
      .replace(/[\u0000-\u001f\u007f]/g, ' ')
      .replace(/https?:\/\/\S+/gi, '<url>')
      .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '<email>')
      .replace(/\d{6,}/g, '<n>')
      .replace(/\s+/g, ' ').trim().slice(0, max);
  }
  function arquivoCurto(f) { return String(f || '').split(/[?#]/)[0].split('/').pop().replace(/[^A-Za-z0-9._-]/g, '').slice(0, 60); }
  function registrarErro(mensagem, arquivo, linha) {
    if (errosEstaPagina >= MAX_ERROS_POR_PAGINA) return;
    errosEstaPagina++;
    pendente.erros.push({ m: limparTexto(mensagem, 120), f: arquivoCurto(arquivo), l: Math.max(0, Math.min(999999, linha | 0)) });
    if (!timerErro) timerErro = setTimeout(function () { timerErro = null; descarregar(); }, 3000);
  }
  seguro(function () {
    window.addEventListener('error', function (ev) {
      seguro(function () {
        if (!ev || typeof ev.message !== 'string' || !ev.message) return; // erro de carregar imagem/script: ignora
        if (ev.filename && ev.filename.indexOf(location.origin) !== 0) return; // extensões e outros sites
        if (ev.message === 'Script error.') return;
        registrarErro(ev.message, ev.filename, ev.lineno);
      });
    });
    window.addEventListener('unhandledrejection', function (ev) {
      seguro(function () {
        var r = ev && ev.reason, msg, arq = '', lin = 0;
        if (r && typeof r === 'object' && typeof r.message === 'string') msg = r.message;
        else if (typeof r === 'string') msg = r;
        else msg = 'promessa recusada sem mensagem';
        var m = r && r.stack && /([^\/\s()]+\.(?:js|mjs|html))[^\s)]*?:(\d+):\d+/.exec(String(r.stack));
        if (m) { arq = m[1]; lin = parseInt(m[2], 10); }
        registrarErro('(promessa) ' + msg, arq, lin);
      });
    });
  });

  // ---------- eventos opcionais: window.QG.evento('fase_concluida', { fase: 3 }) ----------
  // Só vale o que estiver na lista de nomes do jogo (qg-eventos.json, copiada para versao.json na publicação).
  function valorDeDados(dados) {
    if (!dados || typeof dados !== 'object') return '';
    return Object.keys(dados).slice(0, 2).map(function (k) {
      var v = dados[k], chave = String(k).toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 16), valor;
      if (typeof v === 'number' && isFinite(v)) valor = String(Math.max(-999999, Math.min(999999, Math.round(v))));
      else if (typeof v === 'boolean') valor = v ? 'sim' : 'nao';
      else if (typeof v === 'string') valor = v.toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 16);
      else valor = '';
      return chave && valor ? chave + '=' + valor : '';
    }).filter(Boolean).join(',');
  }
  function evento(nome, dados) {
    seguro(function () {
      nome = String(nome);
      if (respeitarPrivacidade || permitidos.indexOf(nome) < 0 || eventosEstaPagina >= MAX_EVENTOS_POR_PAGINA) return;
      eventosEstaPagina++;
      var valor = valorDeDados(dados), k = nome + '|' + valor;
      var e = pendente.eventos[k] || (pendente.eventos[k] = { n: nome, v: valor, c: 0, s: 0 });
      e.c++;
      if (!pendente.vistosNaPagina[k]) { pendente.vistosNaPagina[k] = 1; e.s = 1; }
      if (!timerEvento) timerEvento = setTimeout(function () { timerEvento = null; descarregar(); }, 20000);
    });
  }
  seguro(function () {
    var QG = window.QG = window.QG || {};
    var fila = QG._fila; // chamadas feitas antes deste script carregar (ver o trecho colocado no <head> pelo build)
    QG.evento = evento;
    if (fila && fila.length) fila.forEach(function (args) { evento(args[0], args[1]); });
    QG._fila = null;
  });

  // ---------- começar ----------
  if (respeitarPrivacidade) return;
  seguro(iniciarSessao);
  seguro(function () {
    setInterval(function () { seguro(function () { tickAtivo(); if (acumMs >= 300000) descarregar(); }); }, 1000);
    document.addEventListener('visibilitychange', function () {
      seguro(function () {
        if (document.visibilityState === 'hidden') descarregar();
        else { ultTick = Date.now(); interagiu(); }
      });
    });
    window.addEventListener('pagehide', function () { descarregar(); });
    setTimeout(descarregar, 2000); // começo da sessão: manda 2 s depois de abrir (ou antes, se a aba for escondida)
  });
})();
