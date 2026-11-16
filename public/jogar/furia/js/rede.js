// Online do Fúria: peças comuns da Luta e do Battlefield.
//
// Como funciona: o celular de quem CRIOU a partida (o "dono") roda o jogo de verdade (bots, golpes, tiros, dano).
// Os outros mandam só os controles e recebem, umas 15 a 20 vezes por segundo, uma "foto" do jogo.
// Tudo o que passa pela rede é NÚMERO (o servidor recusa texto): nomes saem da lista de jogadores que o próprio
// servidor manda (apelidos das contas) e as mensagens na tela são montadas aqui a partir de códigos.

// ---------- sorteio com semente ----------
// Durante a montagem da arena/mapa e dos bots, Math.random passa a ser um sorteio com semente: assim todos os
// celulares montam exatamente o mesmo cenário e os mesmos bots.
export function seedMath(seed) {
  const original = Math.random;
  let a = seed >>> 0;
  Math.random = () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return () => { Math.random = original; };
}

// ---------- números ----------
export const r2 = (v) => Math.round(v * 100) / 100;
export const r3 = (v) => Math.round(v * 1000) / 1000;
export const num = (v, d = 0) => (typeof v === 'number' && Number.isFinite(v) ? v : d);

// ---------- eventos (o que o dono grava e os outros repetem) ----------
export const EV = { FX: 0, NUM: 6, SOM: 7, BANNER: 8, SHAKE: 9, TOAST: 10, HIT: 11, FEED: 12 };

// Efeitos visuais: [código, ...argumentos]. 'v' = posição (3 números); o resto são valores padrão.
const FX_SPEC = [
  ['burst', ['v', 0xffffff, 12, 5, 0.12, 0.6, -9, true]],
  ['smoke', ['v', 6, 0x555555, 2, 1.5, 1]],
  ['ring', ['v', 0xffffff, 4, 0.45, 0.05]],
  ['flash', ['v', 0xffffff, 1.5, 0.25]],
  ['tracer', ['v', 'v', 0xffd27a, 0.07]],
  ['explosion', ['v', 5]],
];

// No celular do dono: cada efeito "de cima" (não os que um efeito chama por dentro) vira um evento.
export function gravarEfeitos(fx, saida) {
  let dentro = 0;
  FX_SPEC.forEach(([nome, spec], codigo) => {
    const original = fx[nome].bind(fx);
    fx[nome] = (...args) => {
      if (dentro === 0 && saida.ligado) {
        const ev = [EV.FX, codigo];
        spec.forEach((padrao, i) => {
          const v = args[i];
          if (padrao === 'v') ev.push(r2(v.x), r2(v.y), r2(v.z));
          else if (typeof padrao === 'boolean') ev.push((v === undefined ? padrao : v) ? 1 : 0);
          else ev.push(r3(v === undefined ? padrao : v));
        });
        saida.lista.push(ev);
      }
      dentro++;
      try { return original(...args); } finally { dentro--; }
    };
  });
}

// Nos outros celulares: repete um efeito gravado. Devolve o nome (o Battlefield usa para piscar a luz das explosões).
export function repetirEfeito(fx, ev, V) {
  const item = FX_SPEC[ev[1]];
  if (!item) return null;
  const [nome, spec] = item;
  const args = [];
  let k = 2;
  for (const padrao of spec) {
    if (padrao === 'v') { args.push(new V(num(ev[k]), num(ev[k + 1]), num(ev[k + 2]))); k += 3; }
    else if (typeof padrao === 'boolean') { args.push(!!ev[k]); k++; }
    else { args.push(num(ev[k], padrao)); k++; }
  }
  fx[nome](...args);
  return { nome, args };
}

// Sons: o nome vira um número. "arg" é o tipo de tiro, se o golpe é pesado, ou a distância (quando não há posição).
export const SONS = ['swing', 'hit', 'block', 'special', 'ultimate', 'jump', 'ko', 'shoot', 'explosion', 'reload', 'empty',
  'pickup', 'hitmarker', 'capture', 'engine', 'whistle', 'heal'];
export const TIROS = ['rifle', 'sniper', 'lmg', 'smg', 'pistol', 'cannon'];

// ---------- conexão ----------
export function onlineBase() {
  const q = new URLSearchParams(location.search).get('online');
  if (q && /^wss?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(q)) return q.replace(/\/$/, '');
  return `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/online/furia`;
}
export const httpDe = (u) => u.replace(/^ws/, 'http');

// Abre o WebSocket da sala e espera o "welcome". Depois disso, cada mensagem vai para aoReceber(m).
export function conectar(url, join, aoReceber, aoFechar) {
  return new Promise((resolve, reject) => {
    let pronto = false; let ws;
    const falhar = (msg) => { if (pronto) return; pronto = true; clearTimeout(to); try { ws.close(); } catch (e) { /* já fechada */ } reject(new Error(msg)); };
    try { ws = new WebSocket(url); } catch (e) { reject(e); return; }
    const to = setTimeout(() => falhar('Tempo esgotado. Confira a internet e tente de novo.'), 8000);
    ws.onopen = () => ws.send(JSON.stringify(join));
    ws.onmessage = (ev) => {
      let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (!pronto) {
        if (m.t === 'welcome') { pronto = true; clearTimeout(to); resolve({ ws, welcome: m }); }
        else if (m.t === 'error') falhar(m.msg);
        return;
      }
      aoReceber(m, ws);
    };
    ws.onerror = () => falhar('Não consegui conectar. Confira a internet e se você está na sua conta.');
    ws.onclose = (ev) => { if (!pronto) { falhar('A conexão foi encerrada. Tente de novo.'); return; } aoFechar(ws, ev); };
  });
}
