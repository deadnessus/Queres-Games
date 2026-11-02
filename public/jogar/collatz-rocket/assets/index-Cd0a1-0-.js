(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function s(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(o){if(o.ep)return;o.ep=!0;const i=s(o);fetch(o.href,i)}})();const ua=""+new URL("rocket-icon-DzkGOWY_.png",import.meta.url).href,F=999999;function $a(a){return Number.isSafeInteger(a)&&a>0}function qa(a){return $a(a)&&a>1&&a<=2**30&&(a&a-1)===0}function z(a){return a%2===0?a/2:3*a+1}function za(a){if(!$a(a))throw new Error("Digite um número inteiro positivo");const e=[a];let s=a;for(;s!==1;)s=z(s),e.push(s);return e}const ta=[[100,{nome:"Voo de Galinha",emoji:"🐔",cor:"#ffd23f"}],[1e3,{nome:"Voo de Águia",emoji:"🦅",cor:"#3ee6d0"}],[1e4,{nome:"Avião Comercial",emoji:"✈️",cor:"#7ab8ff"}],[1e5,{nome:"Helicóptero Especial",emoji:"🚁",cor:"#ff8ad0"}],[1e6,{nome:"Nave Alienígena",emoji:"🛸",cor:"#b48cff"}],[Number.POSITIVE_INFINITY,{nome:"Foguete Espacial",emoji:"🚀",cor:"#ff4f7b"}]];function Ga(a){return(ta.find(([s])=>a<s)??ta[ta.length-1])[1]}function T(a){const e=za(a),s=Math.max(...e);return{inicio:a,sequencia:e,altitude:s,passos:e.length-1,classe:Ga(s)}}function v(a){return a.toLocaleString("pt-BR")}const da=[{id:"potencias-de-dois",titulo:"Potências de 2",texto:"Em potências de 2, como o 16, a regra só divide por 2: 16 → 8 → 4 → 2 → 1. Nunca aparece o ×3 + 1.",desbloqueia:a=>qa(a)},{id:"o-seis",titulo:"O número 6",texto:"O 6 chega em 1 em apenas 8 passos. O 7, que é quase igual, precisa de 16.",desbloqueia:a=>a===6},{id:"o-vinte-e-sete",titulo:"O número 27",texto:"O 27 faz 111 passos e sobe até 9.232 antes de cair para 1. Um voo longo!",desbloqueia:a=>a===27},{id:"o-noventa-e-sete",titulo:"O número 97",texto:"O 97 demora 118 passos para chegar em 1. É o número abaixo de 100 com o voo mais longo.",desbloqueia:a=>a===97}],K=[{id:"primeiro-voo",titulo:"Primeiro voo",descricao:"Lance um foguete pela primeira vez.",conquistada:a=>a.voos>=1},{id:"primeira-estrela",titulo:"Primeira estrela",descricao:"Ganhe a primeira estrela em uma fase.",conquistada:a=>a.estrelasTotais>=1},{id:"sequencia-10",titulo:"Piloto sem erro",descricao:"Acerte 10 respostas seguidas.",conquistada:a=>a.sequenciaMelhor>=10},{id:"potencia-de-dois",titulo:"Descobriu uma potência de 2",descricao:"Lance um número que é potência de 2.",conquistada:a=>a.potenciaDescoberta},{id:"missoes-completas",titulo:"Explorador da Galáxia",descricao:"Complete todas as missões da Galáxia.",conquistada:a=>a.missoesCompletas},{id:"mapa-completo",titulo:"Mapa completo",descricao:"Ganhe pelo menos uma estrela em todas as fases.",conquistada:a=>a.mapaCompleto}],Ba=[{id:"decolagem-curta",titulo:"Decolagem curta",enunciado:"Chegue a 1 em no máximo 5 passos.",dica:"Tente números pequenos, como o 8.",verifica:(a,e)=>e.passos<=5},{id:"altitude-mil",titulo:"Altitude de mil",enunciado:"Use um número menor que 50 e faça o foguete passar de 1.000 de altitude.",dica:"O 27 sobe muito. Experimente ele!",verifica:(a,e)=>a<50&&e.altitude>1e3},{id:"voo-longo",titulo:"Voo longo",enunciado:"Use um número menor que 100 e faça um voo de pelo menos 100 passos.",dica:"Alguns números demoram muito para cair.",verifica:(a,e)=>a<100&&e.passos>=100},{id:"voo-tranquilo",titulo:"Voo tranquilo",enunciado:"Chegue a 1 sem passar de 20 de altitude.",dica:"Potências de 2 sempre fazem voos tranquilos.",verifica:(a,e)=>a>1&&e.altitude<=20}];function Aa(a){const e=Ba.find(s=>s.id===a);if(!e)throw new Error(`Missão desconhecida: ${a}`);return e}const pa=[{id:"lua",nome:"Lua",descricao:"Primeiros voos. Você só decide se o número é par ou ímpar.",modo:"piloto",cor:"#c9c3e6",fases:[4,6,7,10,12].map(a=>({id:`lua-${a}`,titulo:`Voo do ${a}`,numeros:[a],nivelPiloto:1}))},{id:"marte",nome:"Marte",descricao:"Agora você calcula o próximo número entre três opções.",modo:"piloto",cor:"#ff8a5b",fases:[5,7,11,13,15].map(a=>({id:`marte-${a}`,titulo:`Voo do ${a}`,numeros:[a],nivelPiloto:2}))},{id:"jupiter",nome:"Júpiter",descricao:"Mais rápido: você tem 6 segundos para escolher em cada passo.",modo:"piloto",cor:"#ffd23f",fases:[9,12,17,19,23].map(a=>({id:`jupiter-${a}`,titulo:`Voo do ${a}`,numeros:[a],nivelPiloto:3}))},{id:"saturno",nome:"Saturno",descricao:"Preveja antes de decolar. O foguete passa de 100? Chega em 1 em mais de 5 passos?",modo:"previsao",cor:"#3ee6d0",fases:[{id:"saturno-1",titulo:"Decolagem",numeros:[2,4,8,16,5,6],pergunta:{tipo:"passos",limite:5}},{id:"saturno-2",titulo:"Altitude",numeros:[7,9,12,15,20,27],pergunta:{tipo:"pico",limite:100}},{id:"saturno-3",titulo:"Turbulência",numeros:[11,13,19,23,27,31],pergunta:{tipo:"pico",limite:1e3}},{id:"saturno-4",titulo:"Viagem longa",numeros:[9,18,25,27,41,47],pergunta:{tipo:"passos",limite:50}}]},{id:"cometa",nome:"Cometa",descricao:"Dois foguetes, uma pergunta: qual chega em 1 com menos passos?",modo:"corrida",cor:"#7ab8ff",fases:[{id:"cometa-1",titulo:"Corrida 1",pares:[[6,7],[3,10],[8,27]]},{id:"cometa-2",titulo:"Corrida 2",pares:[[5,12],[9,14],[11,19]]},{id:"cometa-3",titulo:"Corrida 3",pares:[[13,22],[17,25],[21,30]]}]},{id:"galaxia",nome:"Galáxia",descricao:"Missões com metas. Use o teclado de números para achar o lançamento certo.",modo:"missao",cor:"#b48cff",fases:[{id:"galaxia-1",titulo:"Decolagem curta",missao:"decolagem-curta"},{id:"galaxia-2",titulo:"Altitude de mil",missao:"altitude-mil"},{id:"galaxia-3",titulo:"Voo longo",missao:"voo-longo"},{id:"galaxia-4",titulo:"Voo tranquilo",missao:"voo-tranquilo"}]}];function Q(){const a=[];for(const e of pa)e.fases.forEach((s,t)=>a.push({planeta:e,fase:s,indice:t}));return a}function w(a){return Q().find(e=>e.fase.id===a)}const Ua=3;function Qa(a,e){return{inicio:a,atual:a,passos:0,vidas:Ua,nivel:e,erros:0,situacao:"jogando"}}function Ja(a){if(a.nivel===1){const o={rotulo:"PAR",valor:"par"},i={rotulo:"ÍMPAR",valor:"impar"};return a.passos%2===0?[o,i]:[i,o]}const e=z(a.atual),s=[a.atual*2,a.atual+1,Math.floor(a.atual/2),a.atual*3].filter(o=>o!==e&&o!==a.atual&&o>=1),t=[...new Set(s)].slice(0,2);return t.splice(a.passos%3,0,e),t.map(o=>({rotulo:String(o),valor:o}))}function _a(a,e){if(a.situacao!=="jogando")return{estado:a,acertou:!1};if(e!==null&&(a.nivel===1?a.atual%2===0==(e==="par"):e===z(a.atual))){const o=z(a.atual);return{acertou:!0,estado:{...a,atual:o,passos:a.passos+1,situacao:o===1?"venceu":"jogando"}}}const t=a.vidas-1;return{acertou:!1,estado:{...a,vidas:t,erros:a.erros+1,situacao:t<=0?"perdeu":"jogando"}}}function xa(a){return a.situacao!=="venceu"?0:a.vidas>=3?3:a.vidas===2?2:1}function ha(a){return a.tipo==="pico"?`Esse foguete vai passar de ${v(a.limite)} de altitude?`:`Vai levar mais de ${a.limite} passos para chegar em 1?`}function ya(a,e){return a.tipo==="pico"?e.altitude>a.limite:e.passos>a.limite}function Ma(a,e){return a.passos===e.passos?null:a.passos<e.passos?"a":"b"}function Y(a,e){return a>=e?3:a>=Math.ceil(e*.66)?2:1}const Pa="collatz-rocket:v1";function na(){return{versao:1,estrelas:{},descobertos:{},curiosidades:[],conquistas:[],sequenciaMelhor:0,voos:0,mudo:!1}}function J(a){return typeof a=="object"&&a!==null&&!Array.isArray(a)}function Wa(a){const e=na();if(!J(a)||a.versao!==1)return e;const s=r=>{if(!J(r))return{};const c={};for(const[d,f]of Object.entries(r))typeof f=="number"&&Number.isFinite(f)&&(c[d]=f);return c},t=r=>Array.isArray(r)?r.filter(c=>typeof c=="string"):[],o=r=>typeof r=="number"&&Number.isFinite(r)&&r>=0?r:0,i={};if(J(a.descobertos))for(const[r,c]of Object.entries(a.descobertos))J(c)&&(i[r]={pico:o(c.pico),passos:o(c.passos),voos:o(c.voos)});return{versao:1,estrelas:s(a.estrelas),descobertos:i,curiosidades:t(a.curiosidades),conquistas:t(a.conquistas),sequenciaMelhor:o(a.sequenciaMelhor),voos:o(a.voos),mudo:a.mudo===!0}}function Xa(){try{const a=localStorage.getItem(Pa);return a?Wa(JSON.parse(a)):na()}catch{return na()}}function Ha(a){try{localStorage.setItem(Pa,JSON.stringify(a))}catch{}}function Z(a,e){return a.estrelas[e]??0}function Oa(a,e){const s=Q(),t=s.findIndex(o=>o.fase.id===e);return t<0?!1:t===0?!0:Z(a,s[t-1].fase.id)>=1}function aa(a,e,s){const t=Z(a,e);return s<=t?a:{...a,estrelas:{...a.estrelas,[e]:s}}}function Ka(a,e,s){const t=a.descobertos[String(e)],o={pico:Math.max(s.altitude,t?.pico??0),passos:s.passos,voos:(t?.voos??0)+1};return{...a,voos:a.voos+1,descobertos:{...a.descobertos,[String(e)]:o}}}function Ya(a,e){return da.filter(s=>s.desbloqueia(e)&&!a.curiosidades.includes(s.id)).map(s=>s.id)}function Ta(a){const e=Q(),s=Object.values(a.estrelas).reduce((i,r)=>i+r,0),t=i=>Z(a,i)>=1,o=pa.find(i=>i.id==="galaxia");return{voos:a.voos,estrelasTotais:s,sequenciaMelhor:a.sequenciaMelhor,potenciaDescoberta:Object.keys(a.descobertos).some(i=>qa(Number(i))),mapaCompleto:e.every(i=>t(i.fase.id)),missoesCompletas:(o?.fases??[]).every(i=>t(i.id))}}function Za(a){const e=Ta(a);return K.filter(s=>!a.conquistas.includes(s.id)&&s.conquistada(e)).map(s=>s.id)}const ae=""+new URL("energy-particles-BeC13gzq.png",import.meta.url).href,O={esq:62,dir:18,topo:18,base:56};function Sa(a){const e=new Image;return e.src=a,e}const ia=Sa(ua),ra=Sa(ae);function ma(){return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??!1}function ee(a){const e=Math.min(window.devicePixelRatio||1,2),s=a.clientWidth||600,t=a.clientHeight||320,o=Math.round(s*e),i=Math.round(t*e);(a.width!==o||a.height!==i)&&(a.width=o,a.height=i);const r=a.getContext("2d");return r.setTransform(e,0,0,e,0,0),{ctx:r,w:s,h:t}}function oe(a){return a<=3?(10**a).toLocaleString("pt-BR"):`10^${a}`}function D(a,e,s,t=[]){const{ctx:o,w:i,h:r}=ee(a);o.clearRect(0,0,i,r);const c=Math.max(1,...e.flatMap(l=>l.valores)),d=Math.max(1,...e.map(l=>l.valores.length-1)),f=Math.max(1,Math.ceil(Math.log10(c))),h=i-O.esq-O.dir,x=r-O.base-O.topo,y=l=>O.esq+l/d*h,P=l=>r-O.base-l/f*x;o.font="700 13px Nunito, system-ui, sans-serif",o.textBaseline="middle";for(let l=0;l<=f;l++){const q=P(l);o.strokeStyle="rgba(108, 98, 184, 0.45)",o.lineWidth=1,o.setLineDash([4,6]),o.beginPath(),o.moveTo(O.esq,q),o.lineTo(i-O.dir,q),o.stroke(),o.setLineDash([]),o.fillStyle="#b9b3e0",o.textAlign="right",o.fillText(oe(l),O.esq-10,q)}o.textAlign="center",o.textBaseline="top";const j=4;for(let l=0;l<=j;l++){const q=Math.round(d*l/j);o.fillStyle="#b9b3e0",o.fillText(String(q),y(q),r-O.base+8)}o.fillStyle="#d6d0f5",o.fillText("passos",O.esq+h/2,r-14);let m=null;for(const l of e){const q=l.valores.length;if(q===0)continue;const ga=Math.min(1,Math.max(0,s))*(q-1),M=Math.floor(ga),ea=ga-M,C=b=>Math.log10(Math.max(1,l.valores[b]));o.strokeStyle=l.cor,o.lineWidth=3,o.lineJoin="round",o.beginPath();for(let b=0;b<=M;b++)b===0?o.moveTo(y(b),P(C(b))):o.lineTo(y(b),P(C(b)));let oa=y(M),sa=P(C(M));if(M<q-1&&ea>0){const b=C(M)+(C(M+1)-C(M))*ea;oa=y(M+ea),sa=P(b),o.lineTo(oa,sa)}o.stroke(),o.fillStyle=l.cor;for(let b=0;b<=M;b++)o.beginPath(),o.arc(y(b),P(C(b)),3.5,0,Math.PI*2),o.fill();const Da=M<q-1?l.valores[Math.min(M+1,q-1)]>=l.valores[M]:!1,Fa=r-O.base-16;l===e[0]&&(m={x:oa,y:Math.min(sa,Fa),subindo:Da})}for(const l of t)o.globalAlpha=Math.max(0,Math.min(1,l.vida)),ra.complete&&ra.naturalWidth>0?o.drawImage(ra,l.x-9,l.y-9,18,18):(o.fillStyle=l.cor,o.beginPath(),o.arc(l.x,l.y,3,0,Math.PI*2),o.fill());return o.globalAlpha=1,m&&(o.save(),o.translate(m.x,m.y),m.subindo||o.rotate(Math.PI),ia.complete&&ia.naturalWidth>0?o.drawImage(ia,-22,-28,44,44):(o.fillStyle=e[0].cor,o.beginPath(),o.moveTo(0,-14),o.lineTo(9,10),o.lineTo(-9,10),o.closePath(),o.fill()),o.restore()),m}function se(a,e,s,t){if(ma()||s<=0)return D(a,e,1),()=>{};const o=[],i=performance.now();let r=0,c=i,d=!1;const f=h=>{if(d||!a.isConnected)return;const x=Math.min(1,(h-i)/s),y=x<.5?2*x*x:1-(-2*x+2)**2/2,P=Math.min(.05,(h-c)/1e3);c=h;const j=D(a,e,y,o);for(const m of o)m.x+=m.vx*P*60,m.y+=m.vy*P*60,m.vida-=P*1.6;for(let m=o.length-1;m>=0;m--)o[m].vida<=0&&o.splice(m,1);if(j&&x<1)for(let m=0;m<2;m++)o.push({x:j.x+(Math.random()-.5)*8,y:j.y+10,vx:(Math.random()-.5)*1.2,vy:.6+Math.random()*1.2,vida:1,cor:e[0].cor});x<1?r=requestAnimationFrame(f):D(a,e,1)};return r=requestAnimationFrame(f),()=>{d=!0,cancelAnimationFrame(r)}}let S=null,W=!1;function ja(a){W=a,W&&S?.state==="running"&&S.suspend(),!W&&S?.state==="suspended"&&S.resume()}function Ca(){if(W)return null;try{if(!S){const a=window.AudioContext??window.webkitAudioContext;S=new a}return S.state==="suspended"&&S.resume(),S}catch{return null}}function I(a,e,s,t,o=0){const i=Ca();if(!i)return;const r=i.currentTime+o,c=i.createOscillator(),d=i.createGain();c.type=s,c.frequency.setValueAtTime(a,r),d.gain.setValueAtTime(1e-4,r),d.gain.exponentialRampToValueAtTime(t,r+.02),d.gain.exponentialRampToValueAtTime(1e-4,r+e),c.connect(d).connect(i.destination),c.start(r),c.stop(r+e+.05)}const V={acerto(){I(660,.12,"triangle",.18),I(990,.18,"triangle",.18,.09)},erro(){I(220,.28,"sawtooth",.12),I(165,.32,"sawtooth",.1,.12)},estrela(){[784,988,1175,1568].forEach((a,e)=>I(a,.2,"sine",.16,e*.08))},decolagem(){const a=Ca();if(!a)return;const e=a.currentTime,s=a.createOscillator(),t=a.createGain();s.type="sawtooth",s.frequency.setValueAtTime(90,e),s.frequency.exponentialRampToValueAtTime(420,e+1.4),t.gain.setValueAtTime(1e-4,e),t.gain.exponentialRampToValueAtTime(.06,e+.2),t.gain.exponentialRampToValueAtTime(1e-4,e+1.5),s.connect(t).connect(a.destination),s.start(e),s.stop(e+1.6)},clique(){I(520,.05,"square",.05)}},G=document.getElementById("app"),te=6e3;let u=Xa();ja(u.mudo);let n=null,_=0,g="",$="",ba="",k=null,N=!1,ca=null,X=null;function p(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Va(a){return`
    <aside class="mascote" aria-label="Fogo, seu copiloto">
      <img src="${ua}" alt="" width="64" height="64" />
      <p class="balao">${p(a)}</p>
    </aside>`}function ie(a){switch(a){case"piloto":return"Eu sou o Fogo! Regra: par divide por 2, ímpar vira ×3 + 1. Você consegue, piloto!";case"previsao":return"Antes de decolar, faça sua aposta. Confiar na intuição também conta!";case"corrida":return"Dois foguetes na pista. Qual chega em 1 com menos passos?";case"missao":return"Leia a meta e teste números no teclado até cumprir a missão."}}function wa(a,e=3){return"★".repeat(a)+"☆".repeat(Math.max(0,e-a))}function fa(){return location.hash.replace(/^#\/?/,"").split("/").filter(Boolean)}function E(a){const e=Za(a);u={...a,conquistas:[...a.conquistas,...e]},Ha(u);for(const s of e){const t=K.find(o=>o.id===s);t&&Ea(`🏆 Conquista: ${t.titulo}`)}}function L(a,e){let s=Ka(u,a,e);const t=Ya(s,a);if(t.length){s={...s,curiosidades:[...s.curiosidades,...t]};for(const o of t){const i=da.find(r=>r.id===o);i&&Ea(`✨ Curiosidade: ${i.titulo}`)}}E(s)}function B(a){a?(_++,V.acerto(),_>u.sequenciaMelhor&&E({...u,sequenciaMelhor:_})):(_=0,V.erro())}function Ea(a){let e=document.getElementById("toasts");for(e||(e=document.createElement("div"),e.id="toasts",e.className="toasts",e.setAttribute("role","status"),e.setAttribute("aria-live","polite"),document.body.appendChild(e));e.children.length>=2;)e.firstElementChild?.remove();const s=document.createElement("div");s.className="toast",s.textContent=a,e.appendChild(s),window.setTimeout(()=>s.remove(),3e3)}function re(){if(ma())return;const a=G.querySelector(".painel-jogo");a&&(a.classList.remove("tremer"),a.offsetWidth,a.classList.add("tremer"))}function Ia(){X!==null&&(window.clearInterval(X),X=null),ca?.(),ca=null}function ka(a){const e=w(a);if(!e)return null;const{planeta:s,fase:t}=e;switch(s.modo){case"piloto":{const o=t.numeros[0];return{tipo:"piloto",faseId:a,numero:o,estado:Qa(o,t.nivelPiloto),fim:!1}}case"previsao":return{tipo:"previsao",faseId:a,indice:0,acertos:0,resposta:null};case"corrida":return{tipo:"corrida",faseId:a,indice:0,acertos:0,escolha:null};case"missao":return{tipo:"missao",faseId:a,tentativas:0,ultimo:null,concluida:!1}}}function Na(a){const e=Q(),s=e.findIndex(t=>t.fase.id===a);return s>=0&&s+1<e.length?e[s+1].fase.id:null}function ne(a,e){const s=(t,o)=>`<a href="#/${t}"${e===t?' aria-current="page"':""}>${o}</a>`;return`
    <header class="topo">
      <a href="../../" class="logo">queres<span>.</span>games</a>
      <nav class="menu" aria-label="queres.games">
        <a href="../../jogos/">Jogos</a>
        <a href="../../blog/">Blog</a>
        <a href="../../sobre/">Sobre</a>
      </nav>
    </header>
    <div class="subtopo">
      <div class="pagina subtopo-linha">
        <a href="#/" class="jogo-nome">🚀 Collatz Rocket</a>
        <span class="versao" title="Versão do jogo e identificação do build">v2.0.0 · d50c886 · 2026-11-02</span>
        <nav class="subnav" aria-label="Telas do jogo">
          ${s("mapa","Mapa")}${s("lab","Laboratório")}${s("galeria","Galeria")}${s("conquistas","Conquistas")}
        </nav>
        <button class="btn-pequeno" data-acao="mudo" aria-pressed="${u.mudo?"true":"false"}">
          ${u.mudo?"🔇 Som desligado":"🔊 Som ligado"}
        </button>
      </div>
    </div>
    <main class="pagina">${a}</main>
    <footer class="rodape">
      <a href="../../" class="logo">queres<span>.</span>games</a>
      <span>Feito por Jojô e Bento. Versão 2.0.0 · build d50c886 · 2026-11-02</span>
    </footer>`}function ce(){const a=Ta(u),e=Q().length*3;return{html:`
      <section class="hero">
        <div class="hero-texto">
          <div class="hero-etiqueta">JOGO EDUCATIVO DE MATEMÁTICA</div>
          <h1>Collatz <span>Rocket</span></h1>
          <p>Pilote um foguete pela Conjectura de Collatz. Cada número é uma altitude, e a regra leva tudo até o 1.</p>
          <div class="botoes">
            <a href="#/mapa" class="btn">JOGAR AGORA</a>
            <a href="#/lab" class="btn btn-vazado">LABORATÓRIO</a>
          </div>
          <p class="resumo-progresso">
            Estrelas: <strong>${a.estrelasTotais}</strong> de ${e} · Voos: <strong>${u.voos}</strong>
          </p>
        </div>
        <div class="hero-destaque">
          <div class="janela" aria-hidden="true">
            <div class="janela-barra">
              <i style="background:var(--rosa)"></i><i style="background:var(--amarelo)"></i><i style="background:var(--ciano)"></i>
              <b>VOO DO 27</b>
            </div>
            <div class="janela-tela" style="background:linear-gradient(180deg,#3b2f8f,#ff8a5b)">
              <img src="${ua}" alt="" width="256" height="256" />
            </div>
            <div class="janela-legenda">27 → 111 passos · altitude 9.232</div>
          </div>
        </div>
      </section>
      ${Va("Oi, eu sou o Fogo, seu copiloto! Escolha um planeta e vamos voar.")}

      <section class="secao">
        <h2 class="titulo-secao">Como funciona</h2>
        <p class="sub-secao">Uma regra só, e um voo diferente para cada número.</p>
        <div class="grade">
          <article class="card card-regra" style="--sombra:var(--rosa)">
            <div class="card-corpo"><h3>Se é PAR</h3><p>Divida por 2.</p></div>
          </article>
          <article class="card card-regra" style="--sombra:var(--amarelo)">
            <div class="card-corpo"><h3>Se é ÍMPAR</h3><p>Multiplique por 3 e some 1.</p></div>
          </article>
          <article class="card card-regra" style="--sombra:var(--ciano)">
            <div class="card-corpo"><h3>Objetivo</h3><p>Continue até chegar em 1. Quanto mais alto o voo, mais épico!</p></div>
          </article>
        </div>
      </section>`}}function le(){return{html:`
      <section class="pagina-titulo">
        <h1>Mapa de planetas</h1>
        <p>Vença uma fase para liberar a próxima. Você pode repetir qualquer fase para ganhar mais estrelas.</p>
      </section>
      <section class="grade">${pa.map(e=>{const s=e.fases.map((t,o)=>{const i=Oa(u,t.id),r=Z(u,t.id),c=i?wa(r):"🔒";return`
          ${i?`<a href="#/fase/${t.id}" class="fase" style="--cor:${e.cor}">`:'<div class="fase bloqueada" aria-disabled="true">'}
            <span class="fase-num">${o+1}</span>
            <span class="fase-titulo">${p(t.titulo)}</span>
            <span class="fase-estrelas" aria-label="${r} de 3 estrelas">${c}</span>
          ${i?"</a>":"</div>"}`}).join("");return`
      <article class="card planeta" style="--sombra:${e.cor}">
        <div class="planeta-barra" style="background:${e.cor}"></div>
        <div class="card-corpo">
          <span class="selo selo-modo">${ue(e)}</span>
          <h3>${p(e.nome)}</h3>
          <p>${p(e.descricao)}</p>
          <div class="lista-fases">${s}</div>
        </div>
      </article>`}).join("")}</section>`}}function ue(a){switch(a.modo){case"piloto":return`Piloto · nível ${a.fases[0].nivelPiloto}`;case"previsao":return"Previsão";case"corrida":return"Corrida";case"missao":return"Missão"}}function La(){return`
    <div class="teclado" role="group" aria-label="Teclado de números">
      ${[1,2,3,4,5,6,7,8,9].map(e=>`<button class="tecla" data-acao="tecla" data-valor="${e}">${e}</button>`).join("")}
      <button class="tecla tecla-acao" data-acao="limpar" aria-label="Limpar">C</button>
      <button class="tecla" data-acao="tecla" data-valor="0">0</button>
      <button class="tecla tecla-acao" data-acao="apagar" aria-label="Apagar último dígito">⌫</button>
    </div>`}function Ra(a,e,s){return`
    <div class="stats">
      <div class="stat"><span class="stat-rotulo">Altitude máxima</span><span class="stat-valor" style="color:${e}">${v(a.altitude)}</span></div>
      <div class="stat"><span class="stat-rotulo">Tempo de voo</span><span class="stat-valor" style="color:var(--rosa)">${a.passos} passos</span></div>
      <div class="stat"><span class="stat-rotulo">Classificação</span><span class="stat-valor" style="color:${a.classe.cor}">${a.classe.emoji} ${p(a.classe.nome)}</span></div>
    </div>
    <div class="grafico-caixa"><canvas class="grafico" aria-label="${p(s)}"></canvas></div>
    <details class="sequencia">
      <summary>Sequência completa (${a.sequencia.length} números)</summary>
      <p class="sequencia-texto">${a.sequencia.map(t=>v(t)).join(" → ")}</p>
    </details>`}function de(){const a=g?Number(g):null;let e="",s;return R?(e=Ra(R,"#3ee6d0",`Trajetória do ${R.inicio}`),s={series:[{valores:R.sequencia,cor:"#3ee6d0"}],progresso:1}):e='<p class="vazio">Digite um número e lance o foguete para ver o voo.</p>',{html:`
      <section class="pagina-titulo">
        <h1>Laboratório</h1>
        <p>Lance qualquer número de 1 a ${v(F)} e veja o voo completo.</p>
      </section>
      <section class="painel painel-jogo">
        <div class="painel-linha">
          <div class="visor" id="visor" aria-live="polite">${g?v(Number(g)):"—"}</div>
          <button class="btn btn-lancar" data-acao="lancar-lab" ${a?"":"disabled"}>🚀 LANÇAR FOGUETE</button>
        </div>
        ${La()}
        ${$?`<p class="aviso" role="alert">${p($)}</p>`:""}
      </section>
      <section class="painel-resultado">${e}</section>`,cena:s}}let R=null;function pe(){const a=Object.keys(u.descobertos).length,e=Array.from({length:100},(o,i)=>{const r=i+1,c=u.descobertos[String(r)],d=["celula",c?"descoberta":"",k===r?"selecionada":""].join(" ");return c?`<button class="${d}" data-acao="ver-galeria" data-valor="${r}" aria-label="Número ${r}">${r}</button>`:`<span class="${d} oculta" aria-hidden="true">?</span>`}).join("");let s='<p class="vazio">Toque em um número descoberto para ver o recorde.</p>';if(k!==null&&u.descobertos[String(k)]){const o=u.descobertos[String(k)];s=`
      <div class="detalhe">
        <h3>Número ${k}</h3>
        <p>Altitude máxima: <strong>${v(o.pico)}</strong></p>
        <p>Passos até chegar em 1: <strong>${o.passos}</strong></p>
        <p>Lançamentos: <strong>${o.voos}</strong></p>
      </div>`}const t=da.map(o=>{const i=u.curiosidades.includes(o.id);return`
      <article class="card curiosidade ${i?"":"bloqueada"}" style="--sombra:${i?"var(--amarelo)":"var(--borda-suave)"}">
        <div class="card-corpo">
          <span class="selo ${i?"selo-jogavel":"selo-bloqueio"}">${i?"Descoberta":"Bloqueada"}</span>
          <h3>${i?p(o.titulo):"???"}</h3>
          <p>${i?p(o.texto):"Lance um número especial para descobrir esta curiosidade."}</p>
        </div>
      </article>`}).join("");return{html:`
      <section class="pagina-titulo">
        <h1>Galeria</h1>
        <p>Cada número que você lança vira um cartão. Descubra os 100 primeiros.</p>
      </section>
      <section class="painel">
        <h2 class="titulo-secao-pequeno">Números descobertos: ${a} de 100</h2>
        <div class="grade-numeros">${e}</div>
        ${s}
      </section>
      <section class="secao">
        <h2 class="titulo-secao">Curiosidades</h2>
        <div class="grade">${t}</div>
      </section>`}}function me(){const a=K.map(t=>{const o=u.conquistas.includes(t.id);return`
      <article class="conquista ${o?"conquistada":""}">
        <span class="conquista-icone" aria-hidden="true">${o?"🏆":"🔒"}</span>
        <div>
          <h3>${p(t.titulo)}</h3>
          <p>${p(t.descricao)}</p>
        </div>
      </article>`}).join(""),e=K.length;return{html:`
      <section class="pagina-titulo">
        <h1>Conquistas</h1>
        <p>${u.conquistas.length} de ${e} conquistadas.</p>
      </section>
      <section class="lista-conquistas">${a}</section>`}}function U(a,e,s,t,o=3){return`
    <section class="painel painel-jogo resultado">
      <h2 class="titulo-resultado">${p(a)}</h2>
      <div class="estrelas-grandes" aria-label="${e} de ${o} estrelas">${wa(e,o)}</div>
      <p class="resultado-texto">${p(s)}</p>
      <div class="botoes">${t}</div>
    </section>`}function va(a){const e=Na(a);return`${e?`<a href="#/fase/${e}" class="btn">PRÓXIMA FASE</a>`:""}<a href="#/mapa" class="btn btn-vazado">VOLTAR AO MAPA</a>`}function fe(a){const e=w(a);if(!e)return{html:'<section class="painel"><p>Fase não encontrada.</p><a href="#/mapa" class="btn">VOLTAR AO MAPA</a></section>'};if(!Oa(u,a))return{html:`
        <section class="painel painel-jogo">
          <h2 class="titulo-resultado">🔒 Fase bloqueada</h2>
          <p class="resultado-texto">Termine a fase anterior com pelo menos 1 estrela para liberar esta.</p>
          <div class="botoes"><a href="#/mapa" class="btn">VOLTAR AO MAPA</a></div>
        </section>`};if((!n||n.faseId!==a)&&(n=ka(a)),!n)return{html:"<p>Fase não encontrada.</p>"};const s=`
    <div class="cabecalho-fase">
      <a href="#/mapa" class="voltar">← Mapa</a>
      <span class="fase-planeta" style="color:${e.planeta.cor}">${p(e.planeta.nome)} · ${p(e.fase.titulo)}</span>
    </div>${Va(ie(e.planeta.modo))}`;switch(n.tipo){case"piloto":return{html:s+ve(n)};case"previsao":return ge(s,n,e.fase);case"corrida":return he(s,n,e.fase,e.planeta);case"missao":return be(s,n,e.fase)}}function ve(a){const e=a.estado,s=e.nivel;if(e.situacao==="venceu"){const f=xa(e),h=Na(a.faseId);return U("Pouso perfeito!",f,`O foguete chegou em 1 em ${e.passos} passos, com ${e.vidas} de 3 vidas.`,`${h?`<a href="#/fase/${h}" class="btn">PRÓXIMA FASE</a>`:""}
       <a href="#/mapa" class="btn btn-vazado">VOLTAR AO MAPA</a>`)}if(e.situacao==="perdeu")return U("Sem combustível!",0,"Você perdeu as três vidas. Tente de novo: cada tentativa é uma nova chance.",`<button class="btn" data-acao="tentar-novo">TENTAR DE NOVO</button>
       <a href="#/mapa" class="btn btn-vazado">VOLTAR AO MAPA</a>`,3);const t=Ja(e),o=s===1?"Este número é PAR ou ÍMPAR? Par divide por 2. Ímpar multiplica por 3 e soma 1.":"Qual é o próximo número? Par: divida por 2. Ímpar: multiplique por 3 e some 1.",i=t.map(f=>`<button class="opcao opcao-grande" data-acao="escolher-piloto" data-valor="${f.valor}">${p(f.rotulo)}</button>`).join(""),r="♥".repeat(e.vidas)+"♡".repeat(3-e.vidas),c=T(a.numero),d=e.passos/Math.max(1,c.sequencia.length-1);return`
    <section class="painel painel-jogo">
      <div class="painel-linha painel-topo">
        <span class="selo selo-modo">Piloto · nível ${s}</span>
        <span class="vidas" aria-label="${e.vidas} vidas">${r}</span>
      </div>
      <p class="rotulo">Número atual</p>
      <div class="visor visor-grande">${v(e.atual)}</div>
      <p class="regra">${o}</p>
      ${s===3?'<div class="tempo" aria-hidden="true"><div class="tempo-barra" id="barra-tempo"></div></div>':""}
      <div class="opcoes">${i}</div>
      ${$?`<p class="aviso" role="alert">${p($)}</p>`:'<p class="aviso aviso-vazio">&nbsp;</p>'}
    </section>
    <section class="grafico-painel">
      <div class="grafico-caixa"><canvas class="grafico" aria-label="Trajetória do foguete" data-progresso="${d}"></canvas></div>
      <p class="legenda-voo">Passos já voados: <strong>${e.passos}</strong> de ${c.passos}</p>
    </section>
    `}function ge(a,e,s){const t=s.numeros.length,o=s.pergunta;if(e.indice>=t){const y=Y(e.acertos,t);return{html:a+U(`${e.acertos} de ${t} acertos`,y,y===3?"Você previu tudo! Seu olho para números é ótimo.":"Cada voo ensina algo. Tente de novo para ganhar mais estrelas.",va(s.id))}}const i=s.numeros[e.indice],r=T(i),c=`Previsão ${e.indice+1} de ${t}`;if(e.resposta===null)return{html:a+`
        <section class="painel painel-jogo">
          <span class="selo selo-modo">${c}</span>
          <p class="rotulo">Foguete número</p>
          <div class="visor visor-grande">${v(i)}</div>
          <p class="pergunta">${p(ha(o))}</p>
          <div class="opcoes opcoes-duas">
            <button class="opcao opcao-grande" data-acao="prever" data-valor="sim">SIM</button>
            <button class="opcao opcao-grande" data-acao="prever" data-valor="nao">NÃO</button>
          </div>
        </section>`};const d=ya(o,r),f=e.resposta===d,h=f?`Acertou! ${d?"Ele passou do limite.":"Ele ficou abaixo do limite."}`:`Quase! Na verdade, a resposta era ${d?"SIM":"NÃO"}.`,x=e.indice+1>=t;return{html:a+`
      <section class="painel painel-jogo">
        <span class="selo selo-modo">${c}</span>
        <p class="pergunta">${p(ha(o))}</p>
        <p class="resultado-texto ${f?"ok":"nok"}">${p(h)}</p>
        <div class="painel-linha">
          <span>Altitude máxima: <strong>${v(r.altitude)}</strong></span>
          <span>Passos: <strong>${r.passos}</strong></span>
        </div>
        <div class="grafico-caixa"><canvas class="grafico" aria-label="Voo do ${i}"></canvas></div>
        <div class="botoes">
          <button class="btn" data-acao="proxima-previsao">${x?"VER RESULTADO":"PRÓXIMA →"}</button>
        </div>
      </section>`,cena:{series:[{valores:r.sequencia,cor:"#3ee6d0"}],progresso:1}}}function he(a,e,s,t){const o=s.pares.length;if(e.indice>=o){const q=Y(e.acertos,o);return{html:a+U(`${e.acertos} de ${o} corridas`,q,q===3?"Você escolheu o foguete mais rápido em todas!":"Compare os passos e tente de novo para ganhar mais estrelas.",va(s.id))}}const[i,r]=s.pares[e.indice],c=T(i),d=T(r),f=`Corrida ${e.indice+1} de ${o}`;if(e.escolha===null)return{html:a+`
        <section class="painel painel-jogo">
          <span class="selo selo-modo">${f}</span>
          <p class="pergunta">Qual foguete chega em 1 com MENOS passos?</p>
          <div class="corrida-par">
            <button class="foguete-escolha" data-acao="escolher-corrida" data-valor="a" style="--cor:${t.cor}">
              <span class="rotulo">Foguete A</span><span class="visor">${v(i)}</span>
            </button>
            <button class="foguete-escolha" data-acao="escolher-corrida" data-valor="b" style="--cor:${t.cor}">
              <span class="rotulo">Foguete B</span><span class="visor">${v(r)}</span>
            </button>
          </div>
        </section>`};const h=Ma(c,d),x=(h==="a"?"a":"b")===e.escolha,y=h==="a"?i:r,P=h==="a"?r:i,j=h==="a"?c.passos:d.passos,m=h==="a"?d.passos:c.passos,l=e.indice+1>=o;return{html:a+`
      <section class="painel painel-jogo">
        <span class="selo selo-modo">${f}</span>
        <p class="resultado-texto ${x?"ok":"nok"}">${x?"Acertou!":"Quase!"}
          O ${v(y)} chegou em 1 com ${j} passos. O ${v(P)} precisou de ${m}.</p>
        <div class="grafico-caixa grafico-alto"><canvas class="grafico" aria-label="Comparação dos dois voos"></canvas></div>
        <div class="legenda-cores">
          <span><i style="background:#3ee6d0"></i> ${v(i)} (A)</span>
          <span><i style="background:#ff4f7b"></i> ${v(r)} (B)</span>
        </div>
        <div class="botoes">
          <button class="btn" data-acao="proxima-corrida">${l?"VER RESULTADO":"PRÓXIMA →"}</button>
        </div>
      </section>`,cena:{series:[{valores:c.sequencia,cor:"#3ee6d0"},{valores:d.sequencia,cor:"#ff4f7b"}],progresso:1}}}function be(a,e,s){const t=Aa(s.missao);if(e.concluida){const c=e.tentativas<=1?3:e.tentativas===2?2:1;return{html:a+U("Missão cumprida!",c,`Você cumpriu "${t.titulo}" em ${e.tentativas} ${e.tentativas===1?"tentativa":"tentativas"}.`,va(s.id))}}let o="",i;if(e.ultimo){const c=e.ultimo;o=Ra(c,"#b48cff",`Voo do ${c.inicio}`),i={series:[{valores:c.sequencia,cor:"#b48cff"}],progresso:1}}const r=e.tentativas>=2?`<p class="dica">💡 Dica: ${p(t.dica)}</p>`:"";return{html:a+`
      <section class="painel painel-jogo">
        <span class="selo selo-modo">Missão · tentativa ${e.tentativas+1}</span>
        <h2 class="titulo-secao-pequeno">${p(t.titulo)}</h2>
        <p class="pergunta">${p(t.enunciado)}</p>
        ${r}
        <div class="painel-linha">
          <div class="visor" id="visor" aria-live="polite">${g?v(Number(g)):"—"}</div>
          <button class="btn btn-lancar" data-acao="lancar-missao" ${g?"":"disabled"}>🚀 LANÇAR</button>
        </div>
        ${La()}
        ${$?`<p class="aviso" role="alert">${p($)}</p>`:""}
      </section>
      <section class="painel-resultado">${o}</section>`,cena:i}}function la(a){if(!n||n.tipo!=="piloto"||n.estado.situacao!=="jogando")return;Ia();const e=n.estado,{estado:s,acertou:t}=_a(e,a);if(B(t),$="",!t){const o=e.atual%2===0;$=a===null?"O tempo acabou!":e.nivel===1?`Quase! ${v(e.atual)} é ${o?"par":"ímpar"}.`:`Quase! A regra dá ${v(z(e.atual))}.`,re()}if(n={...n,estado:s},s.situacao==="venceu"){const o=xa(s);L(n.numero,T(n.numero)),E(aa(u,n.faseId,o)),V.estrela()}else s.situacao==="perdeu"&&V.erro();A()}function $e(a){if(!n||n.tipo!=="previsao"||n.resposta!==null)return;const e=w(n.faseId);if(!e)return;const s=e.fase.numeros[n.indice],t=T(s),o=a==="sim",i=o===ya(e.fase.pergunta,t);B(i),L(s,t),n={...n,resposta:o,acertos:n.acertos+(i?1:0)},N=!0,A()}function qe(){if(!n||n.tipo!=="previsao")return;const a=w(n.faseId);if(!a)return;const e=a.fase.numeros.length,s=n.indice+1;n={...n,indice:s,resposta:null},s>=e&&E(aa(u,n.faseId,Y(n.acertos,e))),A()}function Ae(a){if(!n||n.tipo!=="corrida"||n.escolha!==null)return;const e=w(n.faseId);if(!e)return;const[s,t]=e.fase.pares[n.indice],o=T(s),i=T(t),r=(Ma(o,i)??"a")===a;B(r),L(s,o),L(t,i),n={...n,escolha:a,acertos:n.acertos+(r?1:0)},N=!0,A()}function xe(){if(!n||n.tipo!=="corrida")return;const a=w(n.faseId);if(!a)return;const e=a.fase.pares.length,s=n.indice+1;n={...n,indice:s,escolha:null},s>=e&&E(aa(u,n.faseId,Y(n.acertos,e))),A()}function ye(){const a=Number(g);if(!g||!Number.isSafeInteger(a)||a<1||a>F){$=`Digite um número entre 1 e ${v(F)}.`,A();return}$="";const e=T(a);if(fa()[0]==="lab"){R=e,L(a,e),N=!0,V.decolagem(),A();return}if(!n||n.tipo!=="missao"||n.concluida)return;const s=Aa(w(n.faseId).fase.missao),t=n.tentativas+1;if(L(a,e),n={...n,tentativas:t,ultimo:e},N=!0,s.verifica(a,e)){const o=t<=1?3:t===2?2:1;E(aa(u,n.faseId,o)),n={...n,concluida:!0},B(!0),V.estrela()}else $=`Ainda não! O número ${v(a)} não cumpre a missão.`,B(!1);g="",A()}function H(a,e){switch(a){case"mudo":ja(!u.mudo),E({...u,mudo:!u.mudo});break;case"tecla":if(g.length<String(F).length){const s=g+(e??"");Number(s)<=F&&(g=s.replace(/^0+(?=\d)/,""))}$="",V.clique(),A();break;case"apagar":g=g.slice(0,-1),$="",A();break;case"limpar":g="",$="",A();break;case"lancar-lab":case"lancar-missao":ye();break;case"escolher-piloto":{const s=e==="par"||e==="impar"?e:Number(e);la(s);break}case"tempo":la(null);break;case"tentar-novo":n&&(n=ka(n.faseId)),$="",A();break;case"prever":$e(e??"");break;case"proxima-previsao":qe();break;case"escolher-corrida":Ae(e==="b"?"b":"a");break;case"proxima-corrida":xe();break;case"ver-galeria":k=Number(e),A();break}}function Me(a){const e=G.querySelector("canvas.grafico");if(e&&a)N&&!ma()?ca=se(e,a.series,1800):D(e,a.series,a.progresso);else if(e&&n?.tipo==="piloto"){const t=T(n.numero),o=Number(e.dataset.progresso??0);D(e,[{valores:t.sequencia,cor:"#3ee6d0"}],o)}N=!1;const s=G.querySelector("#barra-tempo");if(s&&n?.tipo==="piloto"&&n.estado.situacao==="jogando"){const t=performance.now();X=window.setInterval(()=>{const o=Math.min(1,(performance.now()-t)/te);s.style.width=`${(1-o)*100}%`,s.classList.toggle("acabando",o>.6),o>=1&&la(null)},50)}}function A(){Ia();const[a,...e]=fa();a!==ba&&(g="",$="",ba=a??"");let s,t=a??"";switch(a){case"mapa":s=le();break;case"fase":s=fe(e[0]??""),t="mapa";break;case"lab":s=de();break;case"galeria":s=pe();break;case"conquistas":s=me();break;default:s=ce(),t=""}G.innerHTML=ne(s.html,t),Me(s.cena)}G.addEventListener("click",a=>{const e=a.target.closest("[data-acao]");e&&H(e.dataset.acao,e.dataset.valor)});window.addEventListener("keydown",a=>{const[e]=fa();!(e==="lab"||e==="fase"&&n?.tipo==="missao")||a.ctrlKey||a.metaKey||a.altKey||(/^\d$/.test(a.key)?H("tecla",a.key):a.key==="Backspace"?H("apagar"):a.key==="Enter"&&g&&H(e==="lab"?"lancar-lab":"lancar-missao"))});window.addEventListener("hashchange",A);A();
