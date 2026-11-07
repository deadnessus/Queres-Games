// Conta 1 vez jogada por sessão do navegador. Incluído nas páginas dos jogos pelo build
// (scripts/pos-build.mjs). Não guarda nada sobre quem joga.
(function () {
  var jogo = document.currentScript && document.currentScript.getAttribute('data-jogo');
  if (!jogo) return;
  var chave = 'qg-jogo-' + jogo;
  try { if (sessionStorage.getItem(chave) === '1') return; sessionStorage.setItem(chave, '1'); } catch (e) {}
  try { fetch('/api/jogos/' + encodeURIComponent(jogo), { method: 'POST', keepalive: true }).catch(function () {}); } catch (e) {}
})();
