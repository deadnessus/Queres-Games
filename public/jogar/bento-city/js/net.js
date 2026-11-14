// Online mode: lightweight WebSocket relay client
export class Net {
  constructor() {
    this.ws = null; this.id = null; this.connected = false; this.handlers = {};
    this.room = ''; this.lastSend = 0;
  }
  on(t, f) { this.handlers[t] = f; }
  emit(t, m) { this.handlers[t]?.(m); }
  // opts: { mode: 'create' } or { mode: 'join', room: 'K7P2' }
  connect(url, opts, name, look) {
    return new Promise((resolve, reject) => {
      let done = false;
      try { this.ws = new WebSocket(url); } catch (e) { reject(e); return; }
      const to = setTimeout(() => { if (!done) { done = true; reject(new Error('Tempo esgotado')); try { this.ws.close(); } catch (e) {} } }, 8000);
      this.ws.onopen = () => this.send({ t: 'join', mode: opts.mode, room: opts.room || '', name, look });
      this.ws.onmessage = (ev) => {
        let m; try { m = JSON.parse(ev.data); } catch (e) { return; }
        if (m.t === 'welcome') {
          this.id = m.id; this.connected = true; this.room = m.room; this.host = m.host; this.ips = m.ips || []; this.port = m.port;
          if (!done) { done = true; clearTimeout(to); resolve(m); }
        } else if (m.t === 'error') {
          if (!done) { done = true; clearTimeout(to); reject(new Error(m.msg)); }
        }
        this.emit(m.t, m);
      };
      this.ws.onerror = () => { if (!done) { done = true; clearTimeout(to); reject(new Error('Não foi possível conectar ao servidor')); } };
      this.ws.onclose = () => { this.connected = false; this.emit('close', {}); };
    });
  }
  send(m) {
    if (this.mode === 'room') { this.sendRoom(m); return; }
    if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(m));
  }
  close() {
    try { this.ws?.close(); } catch (e) {}
    try { this.lobby?.presence({ mt: null, s: null, v: null }); } catch (e) {}
    this.connected = false;
  }


  // ---------- claude.ai room transport (works inside the published link, no server) ----------
  // Everything happens in the artifact's shared room (the "lobby"): each player puts their
  // match code in their presence, and we only listen to peers with the same code.
  static inViewer() { return !!(window.claude && typeof window.claude.use === 'function'); }
  // Wait briefly for the viewer to inject window.claude (it can arrive after our module runs).
  static async waitViewer(ms = 4000) {
    const t0 = Date.now();
    while (!Net.inViewer() && Date.now() - t0 < ms) await new Promise((r) => setTimeout(r, 100));
    return Net.inViewer();
  }
  async getLobby() {
    if (this.lobby) return this.lobby;
    if (!(await Net.waitViewer())) { this.diag = 'sem_claude'; return null; }
    if (!this._lobbyP) {
      this.diag = 'conectando';
      this._lobbyP = window.claude.use('room').then((r) => {
        if (!r) { this.diag = 'sem_acesso'; return null; }
        this.lobbyConnected = false;
        r.onConnection((c) => { this.lobbyConnected = c; this.diag = c ? 'ok' : 'reconectando'; },
          (e) => { this.diag = 'erro_' + e.code; this.lobbyConnected = false; });
        r.onPeers((ch) => this.onLobbyPeers(ch), (e) => { this.diag = 'erro_' + e.code; if (this.mode === 'room') { this.connected = false; this.emit('close', {}); } });
        return r;
      }).catch((e) => { this.diag = 'erro_' + (e && e.code || 'use'); return null; });
    }
    this.lobby = await this._lobbyP;
    return this.lobby;
  }
  // Human-readable connection status for the menu
  diagText() {
    const d = this.diag || 'conectando';
    if (d === 'ok') return '✅ Conectado ao online';
    if (d === 'conectando' || d === 'reconectando') return '⏳ Conectando ao online...';
    if (d === 'sem_claude') return '❌ Online indisponível: abra o jogo pelo link do claude.ai (código: sem_claude)';
    if (d === 'sem_acesso') return '❌ Sua conta não conseguiu entrar no online deste link. Quem abre por link público ou sem login não conecta (código: sem_acesso)';
    return `❌ Erro na conexão online (código: ${d})`;
  }
  // Matches announced in the room: [{code, host, players, max}]
  async lobbyMatches() {
    const r = await this.getLobby();
    if (!r) return null;
    const map = {};
    for (const p of r.peers()) {
      const mt = p.presence && p.presence.mt;
      if (!mt || typeof mt.c !== 'string') continue;
      const code = mt.c.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
      if (!code) continue;
      if (!map[code]) map[code] = { code, host: String(mt.h || '?').slice(0, 16), players: 0, max: 16, mine: false };
      map[code].players++;
      if (p.sameTab) map[code].mine = true;
    }
    return Object.values(map).filter((m) => !m.mine);
  }
  async connectRoom(opts, name, look) {
    const lobby = await this.getLobby();
    if (!lobby) throw new Error(this.diagText());
    // give the room a moment to list the people already here
    for (let i = 0; i < 20 && !this.lobbyConnected; i++) await new Promise((r) => setTimeout(r, 150));
    let code, host = name;
    if (opts.mode === 'create') {
      const C = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      const taken = new Set(((await this.lobbyMatches()) || []).map((m) => m.code));
      do { code = ''; for (let i = 0; i < 4; i++) code += C[Math.floor(Math.random() * C.length)]; } while (taken.has(code));
    } else {
      code = String(opts.room || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      let found = null;
      for (let i = 0; i < 10 && !found; i++) {
        found = ((await this.lobbyMatches()) || []).find((m) => m.code === code);
        if (!found) await new Promise((r) => setTimeout(r, 300));
      }
      if (!found) throw new Error(`Código "${code || '?'}" não encontrado. Confira o código e se seu amigo está com a partida aberta agora. (${this.diagText()})`);
      host = found.host;
    }
    this.mode = 'room'; this.connected = true;
    this.room = code; this.host = host; this.ips = []; this.port = null;
    this.id = 'r' + Math.random().toString(36).slice(2, 8);
    this.prev = new Map(); this.joinedPeers = new Set(); this.chatK = 0;
    await lobby.presence({ mt: { c: code, h: String(host).slice(0, 16) }, nm: String(name).slice(0, 16), look }).catch((e) => { throw new Error('Não consegui entrar na partida (código: ' + (e && e.code) + ')'); });
    this.emit('welcome', { id: this.id, room: code, host, players: [] });
    // players already here
    for (const p of lobby.peers()) if (!p.sameTab) this.peerChanged(p);
    return { room: code, host };
  }
  onLobbyPeers(ch) {
    if (this.mode !== 'room') return;
    for (const p of ch.joined) if (!p.sameTab) this.peerChanged(p);
    for (const p of ch.updated) if (!p.sameTab) this.peerChanged(p);
    for (const p of ch.left) if (!p.sameTab) this.dropPeer(p.peer);
  }
  dropPeer(id) {
    this.prev.delete(id);
    if (this.joinedPeers.delete(id)) this.emit('leave', { id });
  }
  peerChanged(p) {
    const P = p.presence || {}, id = p.peer;
    const inMatch = P.mt && typeof P.mt.c === 'string' && P.mt.c.toUpperCase() === this.room;
    if (!inMatch) { this.dropPeer(id); return; }
    const old = this.prev.get(id) || {};
    const obj = (o) => (o && typeof o === 'object' ? o : {});
    if (!this.joinedPeers.has(id)) {
      if (typeof P.nm !== 'string') return;
      this.joinedPeers.add(id);
      this.emit('join', { id, name: P.nm.slice(0, 16), look: obj(P.look) });
    } else if (P.look && JSON.stringify(P.look) !== JSON.stringify(old.look)) this.emit('look', { id, look: obj(P.look) });
    if (P.s && P.s !== old.s) this.emit('s', { ...obj(P.s), id });
    if (P.v && P.v !== old.v) this.emit('v', { ...obj(P.v), id });
    if (P.chat && typeof P.chat.text === 'string' && (!old.chat || old.chat.k !== P.chat.k)) this.emit('c', { id, text: P.chat.text.slice(0, 140) });
    if (P.honk && P.honk !== old.honk) this.emit('honk', { id });
    this.prev.set(id, P);
  }
  sendRoom(m) {
    const r = this.lobby; if (!r) return;
    const { t, ...rest } = m;
    const ts = Date.now();
    let patch = null;
    if (t === 's') patch = { s: { ...rest, ts } };
    else if (t === 'v') patch = { v: { ...rest, ts } };
    else if (t === 'look') patch = { look: rest.look };
    else if (t === 'c') patch = { chat: { k: ++this.chatK, text: String(rest.text).slice(0, 140) } };
    else if (t === 'honk') patch = { honk: ts };
    if (patch) r.presence(patch).catch(() => {});
  }
}
