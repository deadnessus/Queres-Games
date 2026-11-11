/* =====================================================================
 * main.js — Inicialização, Game Loop e renderizador ISOMÉTRICO
 * (terreno → objetos+jogador por profundidade → iluminação/clima),
 * picking por pixel, clique-para-andar e entrada de teclado/mouse
 * ===================================================================== */
(function () {
  'use strict';
  const Ilha = (window.Ilha = window.Ilha || {});
  const Config = Ilha.Config;
  const TW = Config.ISO_TW, TH = Config.ISO_TH;
  const MW = Config.MAP_W, MH = Config.MAP_H;

  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const lightCanvas = document.createElement('canvas');
  const lctx = lightCanvas.getContext('2d');
  const worldEl = document.getElementById('world');

  let S = 1;                       // escala inteira dos sprites
  const view = { x: 0, y: 0 };     // posição suavizada da câmera (grid)
  const mouse = { tx: -1, ty: -1, px: 0, py: 0, inside: false };
  let zoomPref = 0; // 0 = automático, 1 ou 2 = escolha do jogador (localStorage ilha_zoom)
  const GRAIN = false; // imagem limpa: sem grão por padrão
  let vignette = null, grainPat = null, grainOff = [0, 0], grainAt = 0;
  let lastNow = 0, lastTipKey = '', lastTouchAt = -9999, tipTimer = null;
  const edgeCache = new Map();

  // ------------------------------------------------------------
  // Dimensionamento
  // ------------------------------------------------------------
  function resize() {
    const w = Math.max(200, worldEl.clientWidth);
    const h = Math.max(150, worldEl.clientHeight);
    canvas.width = w; canvas.height = h;
    lightCanvas.width = w; lightCanvas.height = h;
    // Zoom: automático (2x em telas grandes) ou escolhido no botão 🔍; telas pequenas ficam sempre em 1x
    const canZoom = w >= 1100 && h >= 560;
    S = !canZoom ? 1 : (zoomPref || ((w >= 1700 && h >= 820) ? 2 : 1));
    const zb = document.getElementById('zoomBtn');
    if (zb) { zb.classList.toggle('hidden', !canZoom); zb.textContent = '🔍' + S + '×'; }
    vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.38, w / 2, h / 2, Math.max(w, h) * 0.78);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.2)');
  }

  function makeGrain() {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'); const img = g.createImageData(128, 128);
    for (let i = 0; i < 128 * 128; i++) {
      const v = Math.random() * 255;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    grainPat = ctx.createPattern(c, 'repeat');
  }

  // ------------------------------------------------------------
  // Projeção para a tela
  // ------------------------------------------------------------
  /** Centro (chão) do tile (x,y) em pixels de canvas. */
  function proj(x, y) {
    const W = canvas.width, H = canvas.height;
    return {
      x: Math.round(((x - y) - (view.x - view.y)) * (TW / 2) * S + W / 2),
      y: Math.round(((x + y) - (view.x + view.y)) * (TH / 2) * S + H / 2),
    };
  }
  /** Pixel de canvas -> coordenadas de grid fracionárias. */
  function unproj(px, py) {
    const W = canvas.width, H = canvas.height;
    const wx = (px - W / 2) / S + (view.x - view.y) * (TW / 2);
    const wy = (py - H / 2) / S + (view.x + view.y) * (TH / 2);
    return { wx, wy, gx: wy / TH + wx / TW, gy: wy / TH - wx / TW };
  }

  /** Escolhe o tile sob o mouse, testando objetos altos por pixel (de frente p/ trás). */
  function pick(px, py, groundOnly) {
    const u = unproj(px, py);
    if (groundOnly === undefined) groundOnly = !!(Ilha.Building.mode && Ilha.Building.mode !== 'demolish');
    const gx0 = Math.round(u.gx), gy0 = Math.round(u.gy);
    const SE = Ilha.SpriteEngine; const W = Ilha.World;
    const cands = [];
    if (!groundOnly) for (let j = 0; j <= 4; j++) for (let i = 0; i <= 4; i++) cands.push([i, j]);
    cands.sort((a, b) => (b[0] + b[1]) - (a[0] + a[1]));
    for (const [i, j] of cands) {
      const tx = gx0 + i, ty = gy0 + j;
      if (tx < 0 || ty < 0 || tx >= MW || ty >= MH) continue;
      const o = W.objectAt(tx, ty);
      if (!o) continue;
      const spr = SE.object(Ilha.Building.spriteKey(tx, ty, o), tx, ty, 0);
      if (!spr) continue;
      const cx = (tx - ty) * (TW / 2), cy = (tx + ty) * (TH / 2);
      const lx = Math.floor(u.wx - (cx - spr.ax)), ly = Math.floor(u.wy - (cy - spr.ay));
      if (SE.hit(spr, lx, ly)) return { x: tx, y: ty };
    }
    return { x: gx0, y: gy0 };
  }

  // ------------------------------------------------------------
  // Bordas de terreno e espuma
  // ------------------------------------------------------------
  const WATERSET = { DEEP_OCEAN: 1, SHALLOW_WATER: 1, RIVER_WATER: 1 };
  const FOG = [0.3, 0.46, 0.6, 0.72, 0.82, 0.9].map((a) => `rgba(8,11,16,${a})`); // névoa por distância da borda
  function edgesFor(x, y) {
    const k = y * MW + x;
    let e = edgeCache.get(k);
    if (e) return e;
    e = [];
    const SE = Ilha.SpriteEngine;
    const terrain = Ilha.State.data.world.terrain;
    const t = terrain[y][x]; const pr = SE.PRI[t];
    SE.NEIGH.forEach(([dx, dy], i) => {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= MW || ny >= MH) return;
      const nt = terrain[ny][nx];
      if (nt === t) return;
      if (SE.PRI[nt] > pr) { const c = SE.edge(nt, i); if (c) e.push({ c }); }
      if (t === 'SHALLOW_WATER' && !WATERSET[nt]) e.push({ foam: i });
    });
    edgeCache.set(k, e);
    return e;
  }

  // ------------------------------------------------------------
  // Iluminação dinâmica
  // ------------------------------------------------------------
  const SKY = [
    [0, [88, 106, 172]], [4.5, [90, 108, 174]], [5.5, [165, 140, 158]], [7, [250, 226, 196]], [9, [255, 255, 255]],
    [17, [255, 252, 242]], [18.5, [255, 190, 135]], [19.7, [150, 118, 156]], [21, [96, 112, 176]], [24, [88, 106, 172]],
  ];
  const WEATHER_TINT = { CLEAR: [1, 1, 1], WIND: [0.95, 0.96, 0.97], RAIN: [0.78, 0.82, 0.9], MONSOON: [0.68, 0.72, 0.82] };

  function ambientColor() {
    const t = Ilha.State.data.time;
    const h = t.hour + t.minute / 60;
    let a = SKY[0], b = SKY[SKY.length - 1];
    for (let i = 0; i < SKY.length - 1; i++) {
      if (h >= SKY[i][0] && h <= SKY[i + 1][0]) { a = SKY[i]; b = SKY[i + 1]; break; }
    }
    const f = (h - a[0]) / Math.max(0.001, b[0] - a[0]);
    const tint = WEATHER_TINT[t.weather];
    return [0, 1, 2].map((i) => Math.round((a[1][i] + (b[1][i] - a[1][i]) * f) * tint[i]));
  }

  function drawLighting(now) {
    const amb = ambientColor();
    if ((amb[0] + amb[1] + amb[2]) / 765 > 0.97) return;
    lctx.globalCompositeOperation = 'source-over';
    lctx.fillStyle = `rgb(${amb[0]},${amb[1]},${amb[2]})`;
    lctx.fillRect(0, 0, lightCanvas.width, lightCanvas.height);
    lctx.globalCompositeOperation = 'lighter';

    const lights = Ilha.Building.lights();
    if (Ilha.Player.torchActive()) lights.push({ x: view.x, y: view.y, r: 3.8, seed: 5, warm: 0.85, lift: 30, kind: 'fire' });

    lights.forEach((l) => {
      const c = proj(l.x, l.y);
      const flick = 1 + 0.045 * Math.sin(now / 90 + l.seed) + 0.03 * Math.sin(now / 37 + l.seed * 2);
      const rx = l.r * 45 * S * flick;
      if (c.x + rx < 0 || c.x - rx > lightCanvas.width || c.y + rx < -100 || c.y - rx > lightCanvas.height + 100) return;
      lctx.save();
      lctx.translate(c.x, c.y - l.lift * S);
      lctx.scale(1, 0.5);
      const g = lctx.createRadialGradient(0, 0, 0, 0, 0, rx);
      const lamp = l.kind === 'lamp';
      g.addColorStop(0, lamp ? `rgba(255,248,225,${0.95 * l.warm})` : `rgba(255,200,120,${0.95 * l.warm})`);
      g.addColorStop(0.45, lamp ? `rgba(255,236,190,${0.5 * l.warm})` : `rgba(255,150,70,${0.5 * l.warm})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      lctx.fillStyle = g;
      lctx.fillRect(-rx, -rx, rx * 2, rx * 2);
      lctx.restore();
    });
    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(lightCanvas, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawWeather(now) {
    const w = Ilha.State.data.time.weather;
    const W = canvas.width, H = canvas.height;
    ctx.globalAlpha = Ilha.Player.indoors() ? 0.22 : 1;
    if (w === 'RAIN' || w === 'MONSOON') {
      const n = w === 'MONSOON' ? 280 : 140;
      ctx.strokeStyle = w === 'MONSOON' ? 'rgba(190,210,240,0.55)' : 'rgba(200,220,245,0.42)';
      ctx.lineWidth = 1.5; ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const sp = 0.55 + (i % 7) * 0.07;
        const x = ((i * 97.3 + now * 0.12 * sp) % (W + 80)) - 40;
        const y = ((i * 53.1 + now * 0.75 * sp) % (H + 40)) - 20;
        ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 13);
      }
      ctx.stroke();
    } else if (w === 'WIND') {
      ctx.strokeStyle = 'rgba(255,255,255,0.13)'; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i < 26; i++) {
        const x = ((i * 131.7 + now * 0.5) % (W + 200)) - 100;
        const y = (i * 71.3) % H + Math.sin(now / 400 + i) * 6;
        ctx.moveTo(x, y); ctx.lineTo(x + 42, y + 2);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // ------------------------------------------------------------
  // Renderização
  // ------------------------------------------------------------
  function diamondPath(c, cx, cy, hw, hh) {
    c.beginPath(); c.moveTo(cx, cy - hh); c.lineTo(cx + hw, cy); c.lineTo(cx, cy + hh); c.lineTo(cx - hw, cy); c.closePath();
  }

  // Textos flutuantes sobre Cyrus (+3 Galhos, +20 XP, −5 stamina…)
  const FLOAT_MS = 1400;
  const FLOAT_COL = { good: '#b8f08a', bad: '#ff9a80', xp: '#ffd86a' };
  function drawFloats(cx, topY, now) {
    const list = Ilha.State.floats;
    if (!list || !list.length) return;
    const t = performance.now();
    while (list.length && t - list[0].t0 > FLOAT_MS) list.shift();
    const fs = Math.round(8 * S + 7);
    ctx.save();
    ctx.font = `bold ${fs}px 'Courier New', monospace`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    for (let i = 0; i < list.length; i++) {
      const f = list[i];
      const age = (t - f.t0) / FLOAT_MS;
      if (age < 0) continue; // ainda esperando o anel de progresso fechar
      const rise = Main.lowGfx ? 0 : age * 34 * S;
      const row = list.length - 1 - i;
      const y = topY - 6 * S - row * (fs + 3) - rise;
      ctx.globalAlpha = Main.lowGfx ? 1 : Math.max(0, Math.min(1, 1.6 - age * 1.6));
      ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(10,6,2,.85)';
      ctx.strokeText(f.text, cx, y); ctx.fillStyle = FLOAT_COL[f.kind] || '#fff'; ctx.fillText(f.text, cx, y);
    }
    ctx.restore();
  }

  function render(now) {
    const St = Ilha.State; const d = St.data; const SE = Ilha.SpriteEngine;
    const W = canvas.width, H = canvas.height;
    const p = d.player;
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0a0705';
    ctx.fillRect(0, 0, W, H);

    // Intervalo de grid visível (com margem para sprites altos)
    const corners = [[-TW * S, -TH * S], [W + TW * S, -TH * S], [-TW * S, H + 110 * S], [W + TW * S, H + 110 * S]].map(([a, b]) => unproj(a, b));
    // (sem cortar no limite do mapa: fora dele o mar continua e a terra some na névoa)
    const x0 = Math.floor(Math.min(...corners.map((c) => c.gx))) - 1;
    const x1 = Math.ceil(Math.max(...corners.map((c) => c.gx))) + 1;
    const y0 = Math.floor(Math.min(...corners.map((c) => c.gy))) - 1;
    const y1 = Math.ceil(Math.max(...corners.map((c) => c.gy))) + 1;
    const terrain = d.world.terrain, objects = d.world.objects, floors = d.world.floors, roofs = d.world.roofs;
    const hw = (TW / 2) * S, hh = (TH / 2) * S;

    // Camada 1: terreno + bordas + espuma
    const objs = [];
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const c = proj(x, y);
        if (c.x < -hw * 2 || c.x > W + hw * 2 || c.y < -hh * 2 || c.y > H + hh * 2 + 120 * S) continue;
        if (x < 0 || y < 0 || x >= MW || y >= MH) {
          // além da borda: repete o terreno da margem; água segue como mar, terra escurece (território inexplorado)
          const bx = x < 0 ? 0 : x >= MW ? MW - 1 : x, by = y < 0 ? 0 : y >= MH ? MH - 1 : y;
          const tn = terrain[by][bx];
          ctx.drawImage(SE.terrain(tn, x, y, now), c.x - hw, c.y - hh, TW * S, TH * S);
          if (!WATERSET[tn]) {
            const dist = Math.max(bx - x, x - bx, by - y, y - by);
            ctx.fillStyle = FOG[Math.min(FOG.length - 1, dist - 1)];
            diamondPath(ctx, c.x, c.y, hw + 1, hh + 1); ctx.fill();
          }
          continue;
        }
        ctx.drawImage(SE.terrain(terrain[y][x], x, y, now), c.x - hw, c.y - hh, TW * S, TH * S);
        const fl = floors[y][x];
        if (fl) ctx.drawImage(SE.floor(fl, x, y), c.x - hw, c.y - hh, TW * S, TH * S);
        else {
          const ed = edgesFor(x, y);
          for (let i = 0; i < ed.length; i++) {
            const e = ed[i];
            ctx.drawImage(e.c || SE.foam(e.foam, now), c.x - hw, c.y - hh, TW * S, TH * S);
          }
        }
        if (objects[y][x]) objs.push({ depth: x + y, x, y, name: objects[y][x], cx: c.x, cy: c.y });
        if (roofs[y][x]) objs.push({ depth: x + y + 0.8, x, y, roof: roofs[y][x], cx: c.x, cy: c.y });
      }
    }

    // Objetos que acabaram de ser colhidos ficam na tela até o golpe terminar (Fx.hit)
    const ghosts = Ilha.Fx.ghosts();
    for (let gi = 0; gi < ghosts.length; gi++) {
      const g = ghosts[gi]; const ex = objs.find((q) => q.x === g.x && q.y === g.y && q.name);
      if (ex) ex.name = g.prev;
      else { const c = proj(g.x, g.y); objs.push({ depth: g.x + g.y, x: g.x, y: g.y, name: g.prev, cx: c.x, cy: c.y }); }
    }

    // Pilhas de itens largados no chão
    const pileMarks = [];
    Object.keys(d.world.drops).forEach((k) => {
      const [dx_, dy_] = k.split(',').map(Number);
      const c = proj(dx_, dy_);
      if (c.x < -hw * 2 || c.x > W + hw * 2 || c.y < -hh * 2 || c.y > H + hh * 2 + 120 * S) return;
      const total = d.world.drops[k].reduce((a, q) => a + q.qty, 0);
      objs.push({ depth: dx_ + dy_ - 0.05, x: dx_, y: dy_, name: total >= 6 ? 'ITEM_PILE_L' : 'ITEM_PILE_S', cx: c.x, cy: c.y });
      pileMarks.push(c);
    });
    // anel pulsante âmbar sob cada pilha (indica que há itens para pegar)
    if (pileMarks.length) {
      const pulse = 0.5 + 0.5 * Math.sin(now / 350);
      pileMarks.forEach((c) => {
        ctx.fillStyle = `rgba(240,192,96,${0.10 + 0.08 * pulse})`; ctx.strokeStyle = `rgba(240,192,96,${0.45 + 0.3 * pulse})`; ctx.lineWidth = 2;
        diamondPath(ctx, c.x, c.y, hw * 0.62, hh * 0.62); ctx.fill(); ctx.stroke();
      });
    }

    // Indicadores no chão: rota, tile à frente, hover
    const tileDiamond = (x, y, style, dash, inset) => {
      const c = proj(x, y);
      ctx.strokeStyle = style; ctx.lineWidth = 2; ctx.setLineDash(dash || []);
      diamondPath(ctx, c.x, c.y, hw - (inset || 3), hh - (inset || 3) / 2);
      ctx.stroke(); ctx.setLineDash([]);
    };
    const route = Ilha.Player.route;
    if (route && route.path.length) {
      ctx.fillStyle = 'rgba(240,192,96,0.85)';
      route.path.forEach(([rx, ry], i) => {
        const c = proj(rx, ry); const last = i === route.path.length - 1;
        diamondPath(ctx, c.x, c.y, (last ? 9 : 4) * S, (last ? 4.5 : 2) * S); ctx.fill();
      });
    }
    const modalOpen = Ilha.UI.isModalOpen();
    if (!modalOpen && !d.dead) {
      if (!route) { const f = Ilha.Player.facingTile(); if (Ilha.World.inBounds(f.x, f.y)) tileDiamond(f.x, f.y, 'rgba(255,236,160,0.45)', [5, 5], 6); }
      if (mouse.inside && Ilha.World.inBounds(mouse.tx, mouse.ty)) {
        const adj = Math.max(Math.abs(mouse.tx - p.x), Math.abs(mouse.ty - p.y)) === 1;
        tileDiamond(mouse.tx, mouse.ty, adj ? 'rgba(143,207,98,0.95)' : 'rgba(240,192,96,0.8)', null, 1);
      }
    }

    // Camada 2: objetos + jogador, ordenados por profundidade
    const moving = Math.abs(view.x - p.x) > 0.03 || Math.abs(view.y - p.y) > 0.03;
    const pf = moving ? [1, 0, 2, 0][Math.floor(now / 110) % 4] : 0;
    objs.push({ depth: view.x + view.y + 0.01, x: view.x, y: view.y, player: true });
    objs.sort((a, b) => (a.depth - b.depth) || (a.x - b.x));
    const room = Ilha.Player.indoors();           // cutaway: telhado do cômodo atual some
    const pd = p.x + p.y;
    const Fx = Ilha.Fx; const windy = d.time.weather === 'WIND';
    // G3: contorno do objeto sob o cursor e brilho (até 2) no alvo da meta atual
    const hoverKey = (!modalOpen && !d.dead && !Ilha.Building.mode && mouse.inside) ? mouse.tx + ',' + mouse.ty : null;
    const glowSet = new Set(); const arrows = [];
    const gl = Ilha.Goals && !modalOpen ? Ilha.Goals.current() : null;
    if (gl && gl.goal && gl.goal.glow) {
      objs.filter((q) => q.name && gl.goal.glow.indexOf(q.name) >= 0)
        .sort((a, b) => (Math.abs(a.x - p.x) + Math.abs(a.y - p.y)) - (Math.abs(b.x - p.x) + Math.abs(b.y - p.y)))
        .slice(0, 2).forEach((q) => glowSet.add(q.x + ',' + q.y));
    }
    for (let i = 0; i < objs.length; i++) {
      const o = objs[i];
      if (o.player) {
        const c = proj(view.x, view.y);
        const spr = SE.player(p.facing, pf);
        const pose = Fx.pose(p.facing, S);
        if (!moving && !Fx.active() && !d.dead) Fx.drawBreath(ctx, spr, c.x - spr.ax * S, c.y - spr.ay * S, spr.w * S, spr.h * S, S, now);
        else ctx.drawImage(spr.c, c.x - spr.ax * S + pose.dx, c.y - spr.ay * S + pose.dy, spr.w * S, spr.h * S);
        Fx.drawRing(ctx, c.x, c.y - spr.ay * S, S);
        drawFloats(c.x, c.y - spr.ay * S, now);
        continue;
      }
      let alpha = 1;
      const k = o.x + ',' + o.y;
      if (o.roof) {
        if (room && room.tiles.has(k)) alpha = 0.1;
        const spr = SE.object(o.roof, o.x, o.y, now);
        if (!spr) continue;
        ctx.globalAlpha = alpha;
        ctx.drawImage(spr.c, o.cx - spr.ax * S, o.cy - spr.ay * S, spr.w * S, spr.h * S);
        ctx.globalAlpha = 1;
        continue;
      }
      // paredes entre a câmera e Cyrus ficam translúcidas quando ele está dentro do cômodo
      if (room && room.boundary.has(k) && o.x + o.y > pd) alpha = 0.38;
      const spr = SE.object(Ilha.Building.spriteKey(o.x, o.y, o.name), o.x, o.y, now);
      if (!spr) continue;
      if (alpha < 1) ctx.globalAlpha = alpha;
      const ox = o.cx - spr.ax * S + Fx.shake(o.x, o.y, S), oy = o.cy - spr.ay * S, ow = spr.w * S, oh = spr.h * S;
      const od = Config.OBJECTS[o.name];
      if (hoverKey === k && od && (od.handler || od.verb) && !od.inert) Fx.outline(ctx, spr, ox, oy, ow, oh, S, '#ffffff', 1);
      else if (glowSet.has(k)) { Fx.outline(ctx, spr, ox, oy, ow, oh, S, '#ffd24a', 0.6 + 0.4 * Math.sin(now / 380)); arrows.push([o.cx, oy]); }
      if (Fx.swaying(o.name)) Fx.drawSway(ctx, spr, ox, oy, ow, oh, S, now, o.x, o.y, windy);
      else ctx.drawImage(spr.c, ox, oy, ow, oh);
      if (alpha < 1) ctx.globalAlpha = 1;
    }

    // vida do mundo: fumaça, poeira/brilho de obra
    Fx.drawSmoke(ctx, Ilha.Building.lights().filter((l) => l.kind === 'fire'), proj, S, now, W, H, windy);
    Fx.drawBursts(ctx, proj, S);
    Fx.drawHits(ctx, proj, S);
    for (let ai = 0; ai < arrows.length; ai++) Fx.drawArrow(ctx, arrows[ai][0], arrows[ai][1], S, now);

    // Fantasma do modo construção
    const Bd = Ilha.Building;
    if (Bd.mode && mouse.inside && Ilha.World.inBounds(mouse.tx, mouse.ty)) {
      const c = proj(mouse.tx, mouse.ty);
      let ok = true; let spr = null;
      if (Bd.mode === 'demolish') {
        ok = !!(Ilha.World.roofAt(mouse.tx, mouse.ty) || Ilha.World.floorAt(mouse.tx, mouse.ty) ||
          (Ilha.World.objectAt(mouse.tx, mouse.ty) && Config.OBJECTS[Ilha.World.objectAt(mouse.tx, mouse.ty)].structure));
      } else {
        const r = Bd.modeRecipe();
        if (r) {
          ok = Bd.canPlace(r, mouse.tx, mouse.ty).ok;
          const L = r.layer || 'object';
          if (L === 'object') spr = SE.object(Bd.spriteKey(mouse.tx, mouse.ty, r.place), mouse.tx, mouse.ty, now);
          else if (L === 'roof') spr = SE.object(r.place, mouse.tx, mouse.ty, now);
        }
      }
      ctx.save();
      ctx.strokeStyle = ok ? 'rgba(120,230,110,0.95)' : 'rgba(240,80,60,0.95)';
      ctx.fillStyle = ok ? 'rgba(120,230,110,0.18)' : 'rgba(240,80,60,0.2)';
      ctx.lineWidth = 2;
      const rr = Bd.mode !== 'demolish' ? Bd.modeRecipe() : null;
      if (rr && rr.layer === 'prefab') {                       // pegada 5x5 da casa
        const tiles = Ilha.Sites.layout(rr, mouse.tx, mouse.ty).sort((a, b) => (a.x + a.y) - (b.x + b.y));
        tiles.forEach((t) => {
          const tc = proj(t.x, t.y);
          diamondPath(ctx, tc.x, tc.y, hw - 1, hh - 1); ctx.fill(); ctx.stroke();
          if (t.role === 'wall' || t.role === 'window') {
            const ws = SE.object('SITE_WALL_2', t.x, t.y, now);
            if (ws) { ctx.globalAlpha = 0.45; ctx.drawImage(ws.c, tc.x - ws.ax * S, tc.y - ws.ay * S, ws.w * S, ws.h * S); ctx.globalAlpha = 1; }
          }
        });
      } else {
        diamondPath(ctx, c.x, c.y, hw - 1, hh - 1); ctx.fill(); ctx.stroke();
      }
      if (spr) { ctx.globalAlpha = 0.55; ctx.drawImage(spr.c, c.x - spr.ax * S, c.y - spr.ay * S, spr.w * S, spr.h * S); }
      ctx.restore();
    }

    // Camada 3: iluminação, clima, vinheta e grão
    Ilha.Fx.drawBirds(ctx, W, H, now, S, d.time.hour, d.time.weather);
    drawLighting(now);
    drawWeather(now);
    if (vignette && !Main.lowGfx) { ctx.fillStyle = vignette; ctx.fillRect(0, 0, W, H); }
    if (GRAIN && grainPat && !Main.lowGfx) {
      if (now - grainAt > 90) { grainAt = now; grainOff = [Math.random() * 128 | 0, Math.random() * 128 | 0]; }
      ctx.save(); ctx.globalAlpha = 0.055; ctx.globalCompositeOperation = 'overlay';
      ctx.translate(-grainOff[0], -grainOff[1]);
      ctx.fillStyle = grainPat; ctx.fillRect(0, 0, W + 128, H + 128);
      ctx.restore();
    }
  }

  // ------------------------------------------------------------
  // Loop
  // ------------------------------------------------------------
  const held = [];            // teclas de movimento pressionadas (ordem)
  let heldSince = 0, lastMoveAt = 0, firstStepDone = true, lastRouteAt = 0;

  function heldVector() {
    let sx = 0, sy = 0;
    held.forEach((k) => {
      if (k === 'up') sy = -1; else if (k === 'down') sy = 1; else if (k === 'left') sx = -1; else if (k === 'right') sx = 1;
    });
    return Ilha.Iso.screenDirToGrid(sx, sy);
  }

  function frame(now) {
    requestAnimationFrame(frame);
    const S_ = Ilha.State;
    if (!S_.data) return;
    const dt = Math.min(0.1, (now - lastNow) / 1000 || 0.016);
    lastNow = now;
    const p = S_.data.player;

    // Câmera suave
    const k = Math.min(1, dt * 14);
    view.x += (p.x - view.x) * k; view.y += (p.y - view.y) * k;
    if (Math.abs(p.x - view.x) < 0.01) view.x = p.x;
    if (Math.abs(p.y - view.y) < 0.01) view.y = p.y;

    const modal = Ilha.UI.isModalOpen();
    if (modal) Ilha.Player.cancelRoute();

    // Movimento por teclado (8 direções)
    if (held.length && !modal) {
      if (!firstStepDone && now - heldSince >= 45) {
        firstStepDone = true; lastMoveAt = now;
        const v = heldVector(); if (v[0] || v[1]) Ilha.Player.tryMove(v[0], v[1], false);
      } else if (firstStepDone && now - lastMoveAt >= Config.MOVE_REPEAT_MS) {
        lastMoveAt = now;
        const v = heldVector(); if (v[0] || v[1]) Ilha.Player.tryMove(v[0], v[1], true);
      }
    }
    // Rota por clique
    if (Ilha.Player.route && !modal && now - lastRouteAt >= 115) {
      lastRouteAt = now;
      Ilha.Player.stepRoute();
    }

    updateCancelBtn();
    if (mouse.inside && S_.dirty) updateTooltip(true);
    render(now);
    Ilha.UI.refresh();
  }

  // ------------------------------------------------------------
  // Entrada
  // ------------------------------------------------------------
  const KEYDIR = { w: 'up', arrowup: 'up', s: 'down', arrowdown: 'down', a: 'left', arrowleft: 'left', d: 'right', arrowright: 'right' };

  function onKeyDown(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const St = Ilha.State;
    if (!St.data) return;
    const k = e.key.toLowerCase();
    const UI = Ilha.UI;

    if (k === 'escape') {
      if (UI.modal && UI.modal.closable !== false) { UI.closeModal(); e.preventDefault(); }
      else if (Ilha.Building.mode) Ilha.Building.setMode(null);
      else Ilha.Player.cancelRoute();
      return;
    }
    if (St.data.dead) return;

    const modalKeys = { i: 'inventory', c: 'craft', m: 'map', j: 'journal', r: 'rest', t: 'routines' };
    if (modalKeys[k]) {
      if (UI.modal && !['inventory', 'craft', 'map', 'journal', 'rest', 'routines'].includes(UI.modal.name)) return;
      UI.toggle(modalKeys[k]);
      e.preventDefault();
      return;
    }
    if (UI.isModalOpen()) return;

    if (KEYDIR[k]) {
      e.preventDefault();
      if (e.repeat) return;
      Ilha.Player.cancelRoute();
      const dir = KEYDIR[k];
      const i = held.indexOf(dir); if (i >= 0) held.splice(i, 1);
      if (!held.length) { heldSince = performance.now(); firstStepDone = false; }
      held.push(dir);
      return;
    }
    if (k === 'e' || k === ' ' || k === 'spacebar') {
      e.preventDefault();
      if (!e.repeat) { Ilha.Player.cancelRoute(); Ilha.Player.interactFacing(); }
    }
  }

  function onKeyUp(e) {
    const dir = KEYDIR[e.key.toLowerCase()];
    if (!dir) return;
    const i = held.indexOf(dir);
    if (i >= 0) {
      // toque curto: garante o passo mesmo se a tecla foi solta antes do atraso inicial
      if (!firstStepDone && held.length) {
        firstStepDone = true; lastMoveAt = performance.now();
        const v = heldVector(); if (v[0] || v[1]) Ilha.Player.tryMove(v[0], v[1], false);
      }
      held.splice(i, 1);
    }
  }

  function pointerPos(e) {
    const r = canvas.getBoundingClientRect();
    return { px: (e.clientX - r.left) * (canvas.width / r.width), py: (e.clientY - r.top) * (canvas.height / r.height), cx: e.clientX - r.left, cy: e.clientY - r.top };
  }

  function updateTooltip(force) {
    if (!mouse.inside || Ilha.UI.isModalOpen() || !Ilha.State.data) { Ilha.UI.hideTooltip(); return; }
    const info = Ilha.Player.inspect(mouse.tx, mouse.ty);
    if (!info) { Ilha.UI.hideTooltip(); lastTipKey = ''; return; }
    const keyStr = mouse.tx + ',' + mouse.ty + info.lines.map((l) => l.text).join('|');
    if (!force || keyStr !== lastTipKey) { Ilha.UI.showTooltip(info, mouse.px, mouse.py); lastTipKey = keyStr; }
  }

  function bindInput() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', () => { held.length = 0; });
    window.addEventListener('resize', resize);
    window.addEventListener('beforeunload', () => Ilha.State.save());

    const fromTouch = () => performance.now() - lastTouchAt < 900;
    canvas.addEventListener('mousemove', (e) => {
      if (fromTouch()) return;
      const q = pointerPos(e);
      const t = pick(q.px, q.py);
      mouse.tx = t.x; mouse.ty = t.y; mouse.px = q.cx; mouse.py = q.cy; mouse.inside = true;
      updateTooltip(false);
    });
    canvas.addEventListener('mouseleave', () => { if (fromTouch()) return; mouse.inside = false; Ilha.UI.hideTooltip(); });
    canvas.addEventListener('click', (e) => {
      if (fromTouch()) return;
      if (Ilha.UI.isModalOpen() || !Ilha.State.data || Ilha.State.data.dead) return;
      const q = pointerPos(e); const t = pick(q.px, q.py);
      if (Ilha.Building.mode) { Ilha.Building.clickInMode(t.x, t.y); Ilha.State.touch(); return; }
      Ilha.Player.clickTile(t.x, t.y, false);
    });
    canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (fromTouch()) return;
      if (Ilha.UI.isModalOpen() || !Ilha.State.data || Ilha.State.data.dead) return;
      if (Ilha.Building.mode) { Ilha.Building.setMode(null); return; }
      const q = pointerPos(e); const t = pick(q.px, q.py);
      Ilha.Player.clickTile(t.x, t.y, true);
    });

    // ---- Toque: 1 toque = inspecionar · 2 toques = mover/usar · toque longo = interagir ----
    const ts = { id: null, x0: 0, y0: 0, timer: null, moved: false, long: false, lastAt: 0, lastTile: null, lastX: 0, lastY: 0 };
    const isTouch = (e) => e.pointerType === 'touch' || e.pointerType === 'pen';
    const ready = () => Ilha.State.data && !Ilha.State.data.dead && !Ilha.UI.isModalOpen();
    const buzz = (ms) => { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (err) { /* ignore */ } };
    const showTap = (t, q) => {
      mouse.tx = t.x; mouse.ty = t.y; mouse.px = q.cx; mouse.py = Math.max(8, q.cy - 110); mouse.inside = true;
      if (Ilha.Building.mode) { Ilha.UI.hideTooltip(); } else updateTooltip(false);
      clearTimeout(tipTimer);
      tipTimer = setTimeout(() => { if (!Ilha.Building.mode) { mouse.inside = false; Ilha.UI.hideTooltip(); } }, 6000);
    };
    canvas.addEventListener('pointerdown', (e) => {
      if (!isTouch(e)) return;
      e.preventDefault(); lastTouchAt = performance.now();
      document.body.classList.add('touch');
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      if (!ready()) return;
      const q = pointerPos(e);
      ts.id = e.pointerId; ts.x0 = e.clientX; ts.y0 = e.clientY; ts.moved = false; ts.long = false;
      clearTimeout(ts.timer);
      ts.timer = setTimeout(() => {
        if (!ready() || ts.id !== e.pointerId) return;
        ts.long = true; buzz(35);
        const t = pick(q.px, q.py);
        if (Ilha.Building.mode) return;           // no modo construção, sair é pelo botão Cancelar
        Ilha.UI.hideTooltip(); mouse.inside = false;
        Ilha.Player.clickTile(t.x, t.y, true);    // interagir: água, chão, cultura, objetos
      }, 450);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (!isTouch(e) || ts.id !== e.pointerId) return;
      lastTouchAt = performance.now();
      if (Math.hypot(e.clientX - ts.x0, e.clientY - ts.y0) > 14) { ts.moved = true; clearTimeout(ts.timer); }
    });
    canvas.addEventListener('pointerup', (e) => {
      if (!isTouch(e)) return;
      e.preventDefault(); lastTouchAt = performance.now();
      clearTimeout(ts.timer);
      if (ts.id !== e.pointerId) return;
      ts.id = null;
      if (ts.long || ts.moved || !ready()) return;
      const q = pointerPos(e); const t = pick(q.px, q.py); const now = performance.now();
      const sameSpot = ts.lastTile && (ts.lastTile.x === t.x && ts.lastTile.y === t.y || Math.hypot(e.clientX - ts.lastX, e.clientY - ts.lastY) < 40);
      if (sameSpot && now - ts.lastAt < 400) {
        ts.lastAt = 0; ts.lastTile = null; buzz(15);
        clearTimeout(tipTimer); Ilha.UI.hideTooltip();
        if (Ilha.Building.mode) { Ilha.Building.clickInMode(t.x, t.y); Ilha.State.touch(); return; }
        mouse.inside = false;
        Ilha.Player.clickTile(t.x, t.y, false);   // mover (A*) ou usar o objeto tocado
      } else {
        ts.lastAt = now; ts.lastTile = t; ts.lastX = e.clientX; ts.lastY = e.clientY;
        showTap(t, q);                            // inspecionar (tooltip)
      }
    });
    canvas.addEventListener('pointercancel', () => { clearTimeout(ts.timer); ts.id = null; });
    document.addEventListener('gesturestart', (e) => e.preventDefault());

    // Botão Cancelar (substitui o Esc no celular)
    $cancel.addEventListener('click', () => { Ilha.Player.cancelRoute(); Ilha.Building.setMode(null); Ilha.State.touch(); });
    window.addEventListener('orientationchange', () => setTimeout(resize, 250));
    const rfs = document.getElementById('rotateFs');
    if (rfs) rfs.addEventListener('click', () => Main.fullscreen());
  }

  const $cancel = document.getElementById('cancelBtn');
  let cancelShown = false;
  function updateCancelBtn() {
    const show = !!(Ilha.Building.mode || Ilha.Player.route) && !Ilha.UI.isModalOpen();
    if (show !== cancelShown) { cancelShown = show; $cancel.classList.toggle('hidden', !show); }
    document.body.classList.toggle('has-build-banner', !!Ilha.Building.mode);
  }

  // ------------------------------------------------------------
  // Ciclo de vida
  // ------------------------------------------------------------
  const Main = {
    view, proj, unproj, pick,
    lowGfx: false,
    /** Alterna o zoom do mundo entre 1x e 2x (guarda a escolha). */
    toggleZoom() {
      zoomPref = S === 2 ? 1 : 2;
      try { localStorage.setItem('ilha_zoom', String(zoomPref)); } catch (e) { /* ignore */ }
      resize(); Ilha.State.touch();
    },
    zoom() { return S; },

    setLowGfx(v) {
      this.lowGfx = !!v;
      document.body.classList.toggle('lowgfx', this.lowGfx);
      try { localStorage.setItem('ilha_lowgfx', this.lowGfx ? '1' : '0'); } catch (e) { /* ignore */ }
    },

    /** Tela cheia + trava em paisagem (celulares). */
    fullscreen() {
      const el = document.documentElement;
      const req = el.requestFullscreen || el.webkitRequestFullscreen;
      const go = req ? req.call(el) : Promise.resolve();
      Promise.resolve(go).then(() => {
        try { if (screen.orientation && screen.orientation.lock) return screen.orientation.lock('landscape'); } catch (e) { /* ignore */ }
        return null;
      }).catch(() => {});
    },

    start() {
      const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      if (coarse) document.body.classList.add('touch');
      let pref = null;
      try { pref = localStorage.getItem('ilha_lowgfx'); } catch (e) { /* ignore */ }
      this.setLowGfx(pref === null ? coarse : pref === '1');
      try { zoomPref = +localStorage.getItem('ilha_zoom') || 0; } catch (e) { zoomPref = 0; }
      if (zoomPref !== 1 && zoomPref !== 2) zoomPref = 0;
      Ilha.SpriteEngine.init();
      resize(); if (GRAIN) makeGrain();
      let loaded = false;
      if (Ilha.State.hasSave()) loaded = Ilha.State.load();
      if (!loaded) Ilha.State.newGame();
      else Ilha.State.log('Jogo carregado. Cyrus retoma a sobrevivência na Ilha Lincoln.', 'story');
      Ilha.State.onDeath = () => Ilha.UI.showGameOver();
      Ilha.State.onRevive = (cause, lost) => { const q = Ilha.State.data.player; view.x = q.x; view.y = q.y; Ilha.Player.cancelRoute(); Ilha.Building.mode = null; Ilha.UI.closeModal(); Ilha.UI.refresh(true); Ilha.UI.showRevive(cause, lost); };
      const p = Ilha.State.data.player;
      view.x = p.x; view.y = p.y;
      Ilha.UI.init();
      if (Ilha.Audio) Ilha.Audio.init();
      bindInput();
      if (Ilha.Cover) Ilha.Cover.show(loaded); else if (!loaded) Ilha.UI.showIntro();
      requestAnimationFrame(frame);
    },

    newGame(skipIntro) {
      Ilha.State.clearSave();
      Ilha.State.newGame();
      Ilha.Player.cancelRoute();
      Ilha.Building.mode = null;
      Ilha.UI.craftTab = null;
      const p = Ilha.State.data.player;
      view.x = p.x; view.y = p.y;
      Ilha.UI.closeModal();
      Ilha.UI.lastLogId = 0;
      document.getElementById('logBox').innerHTML = '';
      Ilha.UI.restState = null;
      Ilha.UI.refresh(true);
      if (!skipIntro) Ilha.UI.showIntro();
    },
  };

  Ilha.Main = Main;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Main.start());
  else Main.start();
})();
