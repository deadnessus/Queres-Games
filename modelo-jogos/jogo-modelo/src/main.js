// Jogo-modelo do queres.games: "toque nos círculos". É só um exemplo para mostrar as boas práticas; troque pelo seu jogo.
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var canvas = $('campo'), ctx = canvas.getContext('2d');
  var estado = 'inicio', pontos = 0, restante = 20, alvo = null, ultimo = 0;

  // Aviso anônimo para a medição do queres.games (nunca dá erro; fora do site, não faz nada).
  // Os nomes precisam estar em qg-eventos.json (na raiz do repositório). Ver a skill telemetria-queres-games.
  function evento(nome, dados) { try { if (window.QG && window.QG.evento) window.QG.evento(nome, dados); } catch (e) { /* a medição nunca atrapalha o jogo */ } }

  function ajustar() { canvas.width = innerWidth * (devicePixelRatio || 1); canvas.height = innerHeight * (devicePixelRatio || 1); }
  addEventListener('resize', ajustar); ajustar();

  function mostrar(qual) { ['tela-inicio', 'tela-pausa', 'tela-fim'].forEach(function (t) { $(t).hidden = t !== qual; }); }
  function novoAlvo() { var r = 36; alvo = { x: r + Math.random() * (innerWidth - 2 * r), y: 70 + r + Math.random() * (innerHeight - 140 - 2 * r), r: r }; }

  function comecar() { pontos = 0; restante = 20; ultimo = 0; novoAlvo(); estado = 'jogando'; mostrar(null); evento('partida_iniciada'); requestAnimationFrame(quadro); }
  function terminar() { estado = 'fim'; $('fim-texto').textContent = 'Você fez ' + pontos + ' pontos.'; mostrar('tela-fim'); evento('partida_terminada'); }
  function pausar() { if (estado !== 'jogando') return; estado = 'pausa'; mostrar('tela-pausa'); }
  function continuar() { if (estado !== 'pausa') return; estado = 'jogando'; ultimo = 0; mostrar(null); requestAnimationFrame(quadro); }

  function quadro(t) {
    if (estado !== 'jogando') return;
    if (ultimo) restante -= (t - ultimo) / 1000;
    ultimo = t;
    if (restante <= 0) { restante = 0; atualizarBarra(); return terminar(); }
    var k = canvas.width / innerWidth;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff4f7b'; ctx.beginPath(); ctx.arc(alvo.x * k, alvo.y * k, alvo.r * k, 0, 7); ctx.fill();
    atualizarBarra();
    requestAnimationFrame(quadro);
  }
  function atualizarBarra() { $('placar').textContent = pontos; $('tempo').textContent = Math.ceil(restante); }

  canvas.addEventListener('pointerdown', function (e) {
    if (estado !== 'jogando') return;
    var dx = e.clientX - alvo.x, dy = e.clientY - alvo.y;
    if (dx * dx + dy * dy <= alvo.r * alvo.r * 1.4) { pontos++; novoAlvo(); }
  });
  $('btn-jogar').onclick = comecar;
  $('btn-de-novo').onclick = comecar;
  $('btn-pausar').onclick = pausar;
  $('btn-continuar').onclick = continuar;
  $('btn-sair').onclick = function () { estado = 'inicio'; mostrar('tela-inicio'); };
  // No celular a criança troca de app o tempo todo: pausa sozinho quando a aba esconde.
  document.addEventListener('visibilitychange', function () { if (document.hidden) pausar(); });
})();
