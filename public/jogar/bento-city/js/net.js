// Online: cliente WebSocket das salas do queres.games. Não existe chat: só passam posição, veículos, buzina e visual.
// O servidor (Worker do Cloudflare) decide o nome de cada jogador pelo apelido da conta do site.
export class Net {
  constructor() {
    this.ws = null; this.id = null; this.connected = false; this.handlers = {};
    this.room = ''; this.host = ''; this.lastSend = 0;
  }
  on(t, f) { this.handlers[t] = f; }
  emit(t, m) { this.handlers[t]?.(m); }
  // url: wss://.../online/bento-city/sala/ABCD?modo=criar|entrar   opts: { mode: 'create' | 'join', room }
  connect(url, opts, name, look) {
    return new Promise((resolve, reject) => {
      let done = false;
      const falhar = (msg) => {
        if (done) return; done = true; clearTimeout(to);
        try { this.ws.close(); } catch (e) { /* já fechada */ }
        reject(new Error(msg));
      };
      try { this.ws = new WebSocket(url); } catch (e) { reject(e); return; }
      const to = setTimeout(() => falhar('Tempo esgotado. Confira a internet e tente de novo.'), 8000);
      this.ws.onopen = () => this.send({ t: 'join', mode: opts.mode, room: opts.room || '', name, look });
      this.ws.onmessage = (ev) => {
        let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
        if (m.t === 'welcome') {
          this.id = m.id; this.connected = true; this.room = m.room; this.host = m.host;
          if (!done) { done = true; clearTimeout(to); resolve(m); }
        } else if (m.t === 'error') {
          falhar(m.msg);
          return;
        }
        this.emit(m.t, m);
      };
      this.ws.onerror = () => falhar('Não consegui conectar. Confira a internet e se você está na sua conta.');
      this.ws.onclose = () => { if (!done) { falhar('A conexão foi encerrada. Tente de novo.'); return; } this.connected = false; this.emit('close', {}); };
    });
  }
  send(m) {
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(m));
  }
  close() {
    try { this.ws?.close(); } catch (e) { /* já fechada */ }
    this.connected = false;
  }
}
