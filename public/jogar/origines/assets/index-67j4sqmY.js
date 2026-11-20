var Ju=Object.defineProperty;var Qu=(n,t,e)=>t in n?Ju(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var R=(n,t,e)=>Qu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Et=256;function Yi(n){if(n<=0)return 0;let t=Math.floor(Math.sqrt(n));for(;t*t>n;)t--;for(;(t+1)*(t+1)<=n;)t++;return t}const gi=(n,t)=>Math.trunc(n/t),xd=10,_d=2,Mr=[30,60,90,115,135,150],Ki=["food","wood","stone","metal","coins"],_t=[{key:"villager",cls:"villager",hp:25,atk:3,armor:0,range:.6,cd:15,speed:.95,radius:.28,sight:8,pop:1,cost:{food:50},time:20,era:0,hunt:2.6},{key:"warrior",cls:"infantry",hp:40,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:40,wood:20},time:18,era:0,next:"axeman"},{key:"hunter",cls:"ranged",hp:30,atk:4,armor:0,range:5,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:30},time:20,era:0,next:"archer",proj:"spear"},{key:"dog",cls:"scout",hp:30,atk:2,armor:0,range:.6,cd:10,speed:1.9,radius:.25,sight:12,pop:1,cost:{food:40},time:15,era:0},{key:"axeman",cls:"infantry",hp:55,atk:7,armor:1,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:45,wood:25},time:18,era:1,next:"swordsman"},{key:"archer",cls:"ranged",hp:32,atk:5,armor:0,range:6,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:40},time:22,era:1,next:"slinger",proj:"arrow"},{key:"spearman",cls:"spear",hp:50,atk:5,armor:1,range:.9,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:35,wood:25},time:18,era:1,bonus:[{vs:"animal",dmg:6},{vs:"cavalry",dmg:8}]},{key:"deer",cls:"animal",hp:12,atk:0,armor:0,range:0,cd:10,speed:.9,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:150,mode:"flee",run:1.8}},{key:"boar",cls:"animal",hp:40,atk:3,armor:0,range:.7,cd:15,speed:.8,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:250,mode:"fight",run:1.6}},{key:"wolf",cls:"animal",hp:20,atk:3,armor:0,range:.7,cd:12,speed:1.1,radius:.3,sight:5,pop:0,cost:{},time:0,era:0,animal:{food:0,mode:"predator",run:2}},{key:"aurochs",cls:"animal",hp:60,atk:5,armor:1,range:.8,cd:15,speed:.7,radius:.45,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:400,mode:"fight",run:1.4}},{key:"barbarian",cls:"infantry",hp:45,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:0,cost:{},time:0,era:0},{key:"swordsman",cls:"infantry",hp:60,atk:8,armor:1,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:45,metal:20},time:20,era:2,bonus:[{vs:"spear",dmg:3}]},{key:"slinger",cls:"ranged",hp:32,atk:5,armor:0,range:6,cd:18,speed:1.05,radius:.28,sight:8,pop:1,cost:{food:30,stone:25},time:20,era:2,proj:"stone",bonus:[{vs:"infantry",dmg:2}]},{key:"horseman",cls:"cavalry",hp:90,atk:8,armor:1,range:.8,cd:15,speed:1.75,radius:.45,sight:9,pop:2,cost:{food:60,metal:35},time:26,era:2,bonus:[{vs:"ranged",dmg:4},{vs:"siege",dmg:10}]},{key:"ram",cls:"siege",hp:160,atk:35,armor:4,range:1.15,cd:30,speed:.5,radius:.6,sight:5,pop:3,cost:{wood:150,metal:30},time:35,era:2,siege:!0}],Xt=Object.fromEntries(_t.map((n,t)=>[n.key,t])),jt=60,Zt=100,be=[{key:"center",hp:1200,size:4,sight:14,cost:{},time:0,era:0,pop:[8,10,10,10,10,10],drop:!0,trains:[["villager"],["villager"],["villager"]]},{key:"house",hp:150,size:2,sight:5,cost:{wood:30},time:20,era:0,pop:[4,5,6,6,6,10],buildable:!0},{key:"depot",hp:200,size:2,sight:6,cost:{wood:60},time:25,era:0,drop:!0,buildable:!0},{key:"military",hp:300,size:3,sight:7,cost:{wood:100},time:40,era:0,trains:[["warrior","hunter","dog"],["axeman","spearman","archer","dog"],["swordsman","spearman","slinger","dog"]],buildable:!0},{key:"farm",hp:80,size:3,sight:3,cost:{wood:60},time:15,era:1,walk:!0,buildable:!0},{key:"pen",hp:150,size:3,sight:5,cost:{wood:80},time:30,era:1,buildable:!0},{key:"sanctuary",hp:250,size:2,sight:7,cost:{wood:40,stone:60},time:40,era:1,buildable:!0},{key:"camp",hp:400,size:4,sight:8,cost:{},time:0,era:0},{key:"forge",hp:350,size:2,sight:6,cost:{wood:100,stone:60},time:40,era:2,buildable:!0,research:["bronze","iron"]},{key:"market",hp:350,size:3,sight:7,cost:{wood:150,stone:40},time:45,era:2,buildable:!0,market:!0,research:["wheel"]},{key:"stable",hp:350,size:3,sight:7,cost:{wood:150},time:45,era:2,buildable:!0,trains:[[],[],["horseman"]]},{key:"workshop",hp:350,size:3,sight:6,cost:{wood:175},time:45,era:2,buildable:!0,trains:[[],[],["ram"]]},{key:"wall",hp:300,size:1,sight:2,cost:{stone:8},time:6,era:2,buildable:!0,wall:!0},{key:"tower",hp:450,size:2,sight:9,cost:{wood:60,stone:120},time:50,era:2,buildable:!0,tower:{atk:6,range:7,cd:20}}],Ze=Object.fromEntries(be.map((n,t)=>[n.key,t])),ec=(n,t)=>n.trains?.[Math.min(t,n.trains.length-1)]??[],ji=[{cost:{food:400,wood:150},time:90},{cost:{food:900,wood:400,stone:200},time:120},{cost:{food:1400,wood:700,stone:500,metal:400},time:150}],ts=[{key:"bronze",cost:{food:120,metal:60},time:40,at:"forge"},{key:"iron",cost:{food:180,metal:120},time:60,at:"forge",needs:"bronze"},{key:"wheel",cost:{wood:120,metal:40},time:40,at:"market"}],ln=200,$o=Object.fromEntries(ts.map((n,t)=>[n.key,t])),Hn={give:100,get:60,fair:85},tf=300,Ia=["food","wood","stone","metal"],cs={berry:.4,carcass:.5,farm:.33,wood:.37,stone:.3,metal:.28},ef=10,nf=["#c0392b","#2e6fd8","#e0a526","#7c3fb0"],hi=6,le=-1,Dn=60*xd;function Zi(n,t,e){let i=Math.imul(n|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,1442695041)|0;return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}const Pc=n=>n*n*(3-2*n);function sf(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,a=t-s,o=Pc(r),l=Pc(a),c=Zi(i,s,e),h=Zi(i+1,s,e),u=Zi(i,s+1,e),d=Zi(i+1,s+1,e);return c+(h-c)*o+(u-c)*l+(c-h-u+d)*o*l}function Rs(n,t,e,i=4){let s=0,r=.5,a=1,o=0;for(let l=0;l<i;l++)s+=r*sf(n*a,t*a,e+l*31),o+=r,r*=.5,a*=2.03;return s/o}const Ls=(n,t,e)=>n<t?t:n>e?e:n,vi=(n,t,e)=>{const i=Ls((e-n)/(t-n),0,1);return i*i*(3-2*i)},sr=(n,t,e)=>n+(t-n)*e;class Md{constructor(t){R(this,"a");R(this,"b");R(this,"c");R(this,"d");this.a=2654435769,this.b=608135816,this.c=3084996962,this.d=t>>>0;for(let e=0;e<16;e++)this.next()}next(){let t=this.a|0,e=this.b|0,i=this.c|0,s=this.d|0;const r=(t+e|0)+s|0;return s=s+1|0,t=e^e>>>9,e=i+(i<<3)|0,i=i<<21|i>>>11,i=i+r|0,this.a=t,this.b=e,this.c=i,this.d=s,r>>>0}int(t){return this.next()%t}float(){return this.next()/4294967296}save(){return[this.a,this.b,this.c,this.d]}load(t){[this.a,this.b,this.c,this.d]=t}}const mr=0,La=1,Bs=2,Ri=3,es=4,yd=1,Yo=2,bd=3,Je=1,Yn=2,Tn=3,Bn=1.4142135623730951,Da=1.7320508075688772,Nr=(n,t)=>Math.sqrt(n*n+t*t),Sd={2:[0,1],3:[.5,Da/2],4:[Bn/2,Bn/2]},rf={2:[[0,1],[0,-1]],3:[[.5,Da/2],[-1,0],[.5,-Da/2]],4:[[Bn/2,Bn/2],[-Bn/2,Bn/2],[-Bn/2,-Bn/2],[Bn/2,-Bn/2]]};function Ic(n,t,e){const[i,s]=Sd[e];for(let r=0;r<24;r++){if(t<0){t=-t;continue}if(i*t-s*n>1e-9){const o=n*i+t*s;n=2*o*i-n,t=2*o*s-t;continue}break}return[n,t]}function Ed(n,t){const e=Ls(t,2,4),i=e===2?192:256,s=i/2,r=2,a=i/r+1,o=new Float32Array(a*a),l=i*(e===2?.32:.36),c=13,h=i*.075,[u,d]=Sd[e],f=[u*l,d*l],g=[i*.21,i*.4],v=(F,H)=>{const[Y,Q]=Ic(F,H,e),et=Math.sqrt(Y*Y+Q*Q);let N=(Rs(Y*.02+7.3,Q*.02-3.1,n,4)-.28)*10+1.4+(Rs(Y*.08,Q*.08,n+9,2)-.5)*1.2;const tt=Math.max(Math.abs(F),Math.abs(H))/s;N+=vi(.8,.98,tt)*20*(.6+.4*Rs(Y*.04,Q*.04,n+3,2));const ot=Q,dt=2.5+(Rs(Y*.05,.5,n+21,2)-.5)*3*.45;if(et>h*.8){let It=0;for(const Gt of g)It=Math.max(It,1-vi(3,6,Math.abs(et-Gt)));const ce=sr(-2.2,-.35,It);N=sr(N,Math.min(N,1),vi(dt+9,dt+3,ot)*.75),N=sr(ce,N,vi(dt,dt+6.5,ot))}N=sr(-2.6,N,vi(h,h+10,et));const xt=Nr(Y-f[0],Q-f[1]);return N=sr(2.2,N,vi(c,c+8,xt)),N};for(let F=0;F<a;F++)for(let H=0;H<a;H++)o[F*a+H]=v(H*r-s,F*r-s);const m=(F,H)=>{const Y=Ls(F/r,0,a-1.001),Q=Ls(H/r,0,a-1.001),et=Math.floor(Y),N=Math.floor(Q),tt=Y-et,ot=Q-N,it=o[N*a+et],dt=o[N*a+et+1],xt=o[(N+1)*a+et],It=o[(N+1)*a+et+1];return it+(dt-it)*tt+(xt-it)*ot+(it-dt-xt+It)*tt*ot},p=new Uint8Array(i*i),M=new Uint8Array(i*i),x=new Uint16Array(i*i),_=[];for(let F=0;F<i;F++)for(let H=0;H<i;H++){const Y=m(H+.5,F+.5),Q=F*i+H,et=Math.abs(m(H+1,F+.5)-m(H,F+.5))+Math.abs(m(H+.5,F+1)-m(H+.5,F));Y<-.9?p[Q]=Ri:Y<-.05?p[Q]=Bs:Y<.55?p[Q]=La:et>2.2?p[Q]=es:p[Q]=mr}const P=rf[e].map(([F,H])=>({x:Math.round(s+F*l),z:Math.round(s+H*l),ux:F,uz:H})),T=(F,H,Y)=>P.some(Q=>Nr(F-Q.x,H-Q.z)<Y);for(let F=1;F<i-1;F++)for(let H=1;H<i-1;H++){const Y=F*i+H;if(p[Y]!==mr)continue;const[Q,et]=Ic(H+.5-s,F+.5-s,e),N=Nr(Q,et);let tt=Rs(Q*.045+13,et*.045-7,n+5,3);const ot=Nr(Q-u*(l+18),et-d*(l+18));tt+=vi(16,6,ot)*.35,tt+=vi(14,8,et)*-.25,N<h+10&&(tt-=.3);const it=m(H+.5,F+.5);tt>.585&&!T(H,F,15)&&Zi(Math.round(Q*4),Math.round(et*4),n+77)>.12?(M[Y]=it>9?bd:Zi(Math.round(Q*3),Math.round(et*3),n+78)<.14?Yo:yd,x[Y]=100):Zi(Math.round(Q*2),Math.round(et*2),n+79)<.012&&!T(H,F,11)&&it<8&&(M[Y]=Yo,x[Y]=100)}if(e===2||e===4){const F=(Y,Q)=>{let et=Math.abs(2*Y-(i-1)),N=Math.abs(2*Q-(i-1));if(e===4&&N>et){const tt=et;et=N,N=tt}return(N+i-1)/2*i+(et+i-1)/2};for(let Y=0;Y<i;Y++)for(let Q=0;Q<i;Q++){const et=Y*i+Q,N=F(Q,Y);N!==et&&(p[et]=p[N],M[et]=M[N],x[et]=x[N])}const H=(a-1)/2;for(let Y=0;Y<a;Y++)for(let Q=0;Q<a;Q++){let et=Math.abs(Q-H),N=Math.abs(Y-H);if(e===4&&N>et){const tt=et;et=N,N=tt}o[Y*a+Q]=o[(N+H)*a+et+H]}}const E=(F,H,Y)=>{if(e===2)return F===0?[H,Y]:[i-1-H,i-1-Y];if(e===4){let ot=H,it=Y;for(let dt=0;dt<F;dt++){const xt=ot;ot=i-1-it,it=xt}return[ot,it]}let Q=H+.5-s,et=Y+.5-s;const N=-.5,tt=Da/2;for(let ot=0;ot<F;ot++){const it=Q*N-et*tt;et=Q*tt+et*N,Q=it}return[Math.floor(Q+s),Math.floor(et+s)]},w=[[0,0],[1,0],[0,1],[1,1],[-1,0],[0,-1],[-1,1],[2,0]],b=new Md(n^24301),y=(F,H,Y,Q)=>{if(H<1||Y<1||H>=i-1||Y>=i-1)return;const et=Y*i+H;p[et]===Ri||p[et]===Bs||_.some(N=>N.x===H&&N.z===Y)||(M[et]=0,x[et]=0,p[et]===es&&(p[et]=mr),_.push({kind:F,x:H,z:Y,amount:Q}))},S=P[0];-S.uz,S.ux;const L=(F,H,Y,Q,et,N,tt)=>{const ot=[];for(let it=0;it<tt;it++){const[dt,xt]=w[it%w.length];ot.push([Math.round(F+Y*(et+dt)+-Q*(N+xt)-.5),Math.round(H+Q*(et+dt)+Y*(N+xt)-.5)])}return ot},U=[{kind:Je,amount:125,tiles:L(S.x,S.z,S.ux,S.uz,-5,6,6)},{kind:Yn,amount:350,tiles:L(S.x,S.z,S.ux,S.uz,-9,-8,5)},{kind:Tn,amount:400,tiles:L(S.x,S.z,S.ux,S.uz,-15,14,5)},{kind:Tn,amount:800,tiles:L(s,s,S.ux,S.uz,h+12,0,6)},{kind:Yn,amount:500,tiles:L(s,s,S.ux,S.uz,h+22,6,4)}];for(let F=0;F<e;F++)for(const H of U)for(const[Y,Q]of H.tiles){const[et,N]=E(F,Y,Q);y(H.kind,et,N,H.amount)}for(const F of P)for(let H=-8;H<=7;H++)for(let Y=-8;Y<=7;Y++){if((Y+.5)**2+(H+.5)**2>=50)continue;const Q=(F.z+H)*i+F.x+Y;M[Q]=0,x[Q]=0}b.next();const D=(F,H)=>F>1&&H>1&&F<i-2&&H<i-2&&(p[H*i+F]===mr||p[H*i+F]===La)&&!M[H*i+F]&&!_.some(Y=>Y.x===F&&Y.z===H),B=(F,H)=>{for(let Y=0;Y<8;Y++)for(let Q=-Y;Q<=Y;Q++)for(let et=-Y;et<=Y;et++)if(Math.max(Math.abs(et),Math.abs(Q))===Y&&D(F+et,H+Q))return[F+et,H+Q];return[F,H]},V=[{kind:"deer",base:"s",u:-15,v:13,n:5,r:5},{kind:"boar",base:"s",u:3,v:-16,n:1,r:3},{kind:"wolf",base:"s",u:28,v:-22,n:2,r:5},{kind:"aurochs",base:"c",u:h+30,v:12,n:3,r:6}],j=[],z=[];for(let F=0;F<e;F++){for(const ot of V){const it=ot.base==="s"?S.x:s,dt=ot.base==="s"?S.z:s,[xt,It]=L(it,dt,S.ux,S.uz,ot.u,ot.v,1)[0],[ce,Gt]=E(F,xt,It),se=[];for(let W=0;W<ot.n;W++){const[nn,Yt]=w[W%w.length],[Kt,Lt]=E(F,xt+nn,It+Yt);se.push(B(Kt,Lt))}j.push({kind:ot.kind,x:ce+.5,z:Gt+.5,r:ot.r,spots:se})}const[H,Y]=L(s,s,S.ux,S.uz,h+36,0,1)[0],[Q,et]=E(F,H,Y),[N,tt]=B(Q,et);for(let ot=-4;ot<=4;ot++)for(let it=-4;it<=4;it++){const dt=(tt+ot)*i+N+it;dt>=0&&dt<i*i&&(M[dt]=0,x[dt]=0)}z.push({x:N,z:tt,player:F})}return{size:i,seed:n,players:e,hn:a,hstep:r,heights:o,terrain:p,tree:M,wood:x,res:_,starts:P,herds:j,camps:z}}function $t(n,t,e){const i=Ls(t/n.hstep,0,n.hn-1.001),s=Ls(e/n.hstep,0,n.hn-1.001),r=Math.floor(i),a=Math.floor(s),o=i-r,l=s-a,c=n.hn,h=n.heights,u=h[a*c+r],d=h[a*c+r+1],f=h[(a+1)*c+r],g=h[(a+1)*c+r+1];return o+l<=1?u+(d-u)*o+(f-u)*l:g+(f-g)*(1-o)+(d-g)*(1-l)}const af=["food","wood","stone","metal"],Hs=n=>n.season===3,hn=(n,t,e,i,s)=>{t>=0&&t<n.players.length&&n.events.push({t:"msg",player:t,key:e,x:i,z:s})};function of(n){Pf(n);for(let t=0;t<n.top;t++){if(!n.alive[t])continue;const e=n.kind[t];e>=Zt?wf(n,t):e<jt&&(n.owner[t]===le?Tf(n,t):lf(n,t))}Sf(n),Lf(n),n.tick%50===25&&Uf(n)}function lf(n,t){switch(n.cd[t]>0&&n.cd[t]--,n.foodMode[t]&&xf(n,t),n.task[t]){case we:ff(n,t);break;case Xn:_f(n,t);break;case Te:Ld(n,t);break;case rs:hf(n,t);break;default:cf(n,t)}}const Ds=0,Td=1,Ad=2,wd=3;function Cd(n,t,e){return _t[n.kind[t]].animal?.mode==="predator"||n.aggro[t]>0&&n.owner[n.aggro[t]-1]===e}function Ko(n,t,e){return n.isBuilding(e)?_t[n.kind[t]].siege?Ds:Ad:n.owner[e]===le?Cd(n,e,n.owner[t])?Ds:wd:n.kind[e]===Xt.villager?Td:Ds}function nc(n,t,e,i=!1,s=wd){const r=n.owner[t],a=_t[n.kind[t]].siege;let o=-1,l=99,c=1/0;const h=(d,f)=>{if(f>=s||f>l)return;const g=n.x[d]-n.x[t],v=n.z[d]-n.z[t],m=g*g+v*v;(f<l||m<c)&&(l=f,c=m,o=d)};a||n.near(n.x[t],n.z[t],e,d=>{if(d===t||!n.isUnit(d)||n.ignoreT[t]===d&&n.tick<n.ignoreUntil[t])return;const f=n.owner[d];(f===le?!Cd(n,d,r):!n.hostile(r,f))||h(d,f!==le&&n.kind[d]===Xt.villager?Td:Ds)});const u=a?Ds:Ad;if((i||a)&&u<s&&l>u){const d=(e*Et)**2;for(let f=0;f<n.top;f++)if(n.isBuilding(f)&&n.hostile(r,n.owner[f])&&!(n.ignoreT[t]===f&&n.tick<n.ignoreUntil[t])){const g=n.x[f]-n.x[t],v=n.z[f]-n.z[t];g*g+v*v<d&&h(f,u)}}return o}function Rd(n,t,e){const i=n.state[t]===qe;i&&(n.amx[t]=n.slotX[t],n.amz[t]=n.slotZ[t]),n.task[t]=Te,n.tgt[t]=e,n.fails[t]=0,n.rallyX[t]=n.x[t],n.rallyZ[t]=n.z[t],n.phase[t]=i?10:8}function cf(n,t){if(n.kind[t]===Xt.villager||(n.tick+t)%5)return;const e=nc(n,t,_t[n.kind[t]].sight,n.state[t]!==qe);e>=0&&Rd(n,t,e)}function hf(n,t){if((n.tick+t)%5===0){const e=nc(n,t,_t[n.kind[t]].sight,!0);if(e>=0){n.task[t]=Te,n.tgt[t]=e,n.phase[t]=9,n.fails[t]=0;return}}if(n.state[t]===Se){const e=n.amx[t]-n.x[t],i=n.amz[t]-n.z[t];e*e+i*i>(3*Et)**2&&n.fails[t]++<6?n.goPoint(t,n.amx[t],n.amz[t]):n.task[t]=Ae}}function df(n,t){return(n.map.tree[t]>0||n.resKind[t]!==0)&&n.resAmt[t]>0}function jo(n,t){const e=n.tgt[t];return e<0?!1:n.tgtTile[t]?df(n,e):n.alive[e]?n.kind[e]===jt?n.work[e]>0:n.isBuilding(e)&&n.done[e]===1&&n.bdef(e).key==="farm"&&n.owner[e]===n.owner[t]:!1}function Zo(n,t,e=-1){let i=n.tgt[t];const s=n.size;if(i<-1&&(i=-1-i),!n.tgtTile[t]&&e<0&&i>=0&&(e=i),n.tgtTile[t]&&i>=0&&i<s*s){const r=n.carryRes[t],a=n.map.tree[i]>0||r===yr,o=n.resKind[i]||(r===ns?Je:r===Ua?Yn:r===ka?Tn:0),l=i%s,c=(i-l)/s;for(const[h,u]of Gs){if(h*h+u*u>100)break;const d=l+h,f=c+u;if(d<0||f<0||d>=s||f>=s)continue;const g=f*s+d;if(!(g===e||!n.open(g))&&(a?n.map.tree[g]&&n.resAmt[g]>0:o&&n.resKind[g]===o&&n.resAmt[g]>0))return n.tgt[t]=g,n.tgtTile[t]=1,n.phase[t]=zn,n.fails[t]=0,n.goNear(t,g,!0),!0}}else if(i>=0&&n.kind[i]===jt||n.carryRes[t]===ns){let r=-1,a=(10*Et)**2;for(let o=0;o<n.top;o++)if(o!==e&&n.alive[o]&&n.kind[o]===jt&&n.work[o]>0){const l=n.x[o]-n.x[t],c=n.z[o]-n.z[t],h=l*l+c*c;h<a&&(a=h,r=o)}if(r>=0)return n.tgt[t]=r,n.tgtTile[t]=0,n.phase[t]=zn,n.goNear(t,r,!1),!0}return!1}function ic(n,t){const e=n.owner[t];let i=-1,s=1/0;for(let r=0;r<n.top;r++)if(n.isBuilding(r)&&n.owner[r]===e&&n.done[r]&&n.bdef(r).drop){const a=n.x[r]-n.x[t],o=n.z[r]-n.z[t],l=a*a+o*o;l<s&&(s=l,i=r)}return i}function ba(n,t){const e=ic(n,t);if(n.dropB[t]=e,e<0){n.task[t]=Ae;return}n.phase[t]=Pr,n.fails[t]=0,n.goNear(t,e,!1)}function uf(n,t,e){const i=n.tgt[t];let s;e?s=cs.farm:n.tgtTile[t]?n.map.tree[i]?s=cs.wood:s=n.resKind[i]===Je?cs.berry:n.resKind[i]===Yn?cs.stone:cs.metal:s=cs.carcass;let r=Math.round(s*1e3);return n.players[n.owner[t]]?.hunger&&(r=Math.floor(r*7/10)),n.players[n.owner[t]]?.ai&&(r=Math.floor(r*[80,100,115][n.difficulty]/100)),r}function ff(n,t){if(n.phase[t]===Pr){mf(n,t);return}if(!jo(n,t)){n.carry[t]>0?ba(n,t):Zo(n,t)||(n.task[t]=Ae);return}const e=n.tgt[t],i=n.tgtTile[t]===1,s=!i&&n.kind[e]>=Zt,r=n.reach(t,e,i);if(n.phase[t]===zn){if(r<=(s?60:i?330:220))n.phase[t]=Fd,n.state[t]=Se,n.path[t]=null,n.field[t]=null;else if(n.state[t]===Se&&(n.tick+t)%3===0){if(n.overBudget)return;if(!n.goNear(t,e,i)||n.lastPartial||++n.fails[t]>4){if(n.overBudget)return;n.fails[t]=0,n.tgt[t]=-1-e,Zo(n,t,e)||(n.task[t]=Ae)}}return}if(r>(s?140:i?420:300)){n.phase[t]=zn,n.goNear(t,e,i);return}if(s&&Hs(n))return;if(i&&n.resKind[e]===Je&&Hs(n)){n.carry[t]>0?ba(n,t):n.task[t]=Ae;return}const a=i?n.map.tree[e]?yr:n.resKind[e]===Je?ns:n.resKind[e]===Yn?Ua:ka:ns;n.carry[t]>0&&n.carryRes[t]!==a&&(n.carry[t]=0),n.carryRes[t]=a,n.frac[t]+=uf(n,t,s);let o=Math.floor(n.frac[t]/100);n.frac[t]%=100;const l=s?1e9:i?n.resAmt[e]:n.work[e],c=n.carryCap(t);o=Math.min(o,l,c-n.carry[t]),o>0&&(n.carry[t]+=o,s||(i?n.resAmt[e]-=o:n.work[e]-=o,(i?n.resAmt[e]:n.work[e])<=0&&pf(n,e,i))),(n.carry[t]>=c||!jo(n,t)&&n.carry[t]>0)&&ba(n,t)}function pf(n,t,e){if(!e){n.remove(t);return}if(n.map.tree[t]){n.map.tree[t]=0,n.map.wood[t]=0,n.resAmt[t]=0,n.blocked[t]=0,n.events.push({t:"tree",k:t});return}n.resKind[t]=0,n.resAmt[t]=0,n.blocked[t]=0,n.events.push({t:"res",k:t})}function mf(n,t){let e=n.dropB[t];if(e<0||!n.isBuilding(e)||!n.done[e]||n.owner[e]!==n.owner[t]){if(e=ic(n,t),n.dropB[t]=e,e<0){n.task[t]=Ae;return}n.goNear(t,e,!1)}if(n.reach(t,e,!1)<=200){const i=n.players[n.owner[t]];if(i&&(i.res[af[n.carryRes[t]]]+=n.carry[t]),n.carry[t]=0,n.state[t]=Se,n.path[t]=null,n.foodMode[t]&&!Id(n,t)){const s=Qo(n,t);if(s){tl(n,t,s);return}}jo(n,t)?(n.phase[t]=zn,n.fails[t]=0,n.goNear(t,n.tgt[t],n.tgtTile[t]===1)):Zo(n,t)||(n.task[t]=Ae);return}n.state[t]===Se&&(++n.fails[t]>5?n.task[t]=Ae:n.goNear(t,e,!1))}const gf=30,Lc=0,vf=1,Jo=2,Pd=3;function Id(n,t){const e=n.tgt[t];return e<0?!1:n.task[t]===Te?n.isAnimal(e)&&(_t[n.kind[e]].animal?.food??0)>0:n.tgtTile[t]?n.resKind[e]===Je&&n.resAmt[e]>0&&!Hs(n):n.alive[e]?n.kind[e]===jt?n.work[e]>0:n.isBuilding(e)&&n.bdef(e).key==="farm"&&!Hs(n):!1}function Qo(n,t){const e=n.owner[t],i=Hs(n),s=n.size,r=ic(n,t),a=r>=0?n.x[r]:n.x[t],o=r>=0?n.z[r]:n.z[t],l=(gf*Et)**2,c=(m,p)=>{const M=m-a,x=p-o;return M*M+x*x<=l},h=new Map,u=new Map;for(let m=0;m<n.top;m++)if(m!==t&&n.isUnit(m)&&n.owner[m]===e&&n.kind[m]===Xt.villager&&n.tgt[m]>=0&&(n.task[m]===we||n.task[m]===Te)){const p=n.task[m]===we&&n.tgtTile[m]?u:h;p.set(n.tgt[m],(p.get(n.tgt[m])??0)+1)}let d=-1,f=1/0,g=Lc;const v=(m,p,M,x)=>{const _=p-n.x[t],P=M-n.z[t],T=_*_+P*P;T<f&&(f=T,d=m,g=x)};for(let m=0;m<n.top;m++)n.alive[m]&&n.kind[m]===jt&&n.work[m]>0&&(h.get(m)??0)<4&&c(n.x[m],n.z[m])&&v(m,n.x[m],n.z[m],Lc);if(d>=0)return{t:d,how:g};if(!i){for(let m=0;m<n.top;m++)n.isBuilding(m)&&n.owner[m]===e&&n.done[m]&&n.bdef(m).key==="farm"&&!h.has(m)&&v(m,n.x[m],n.z[m],vf);if(d>=0)return{t:d,how:g};for(const m of n.map.res){const p=m.z*s+m.x;if(n.resKind[p]!==Je||n.resAmt[p]<=0||(u.get(p)??0)>=2||!n.open(p))continue;const M=m.x*Et+128,x=m.z*Et+128;c(M,x)&&v(p,M,x,Jo)}if(d>=0)return{t:d,how:g}}for(let m=0;m<n.top;m++)n.isAnimal(m)&&_t[n.kind[m]].animal.mode==="flee"&&(h.get(m)??0)<2&&c(n.x[m],n.z[m])&&v(m,n.x[m],n.z[m],Pd);return d>=0?{t:d,how:g}:null}function tl(n,t,e){if(n.fails[t]=0,n.phase[t]=zn,n.tgt[t]=e.t,e.how===Pd){n.task[t]=Te,n.tgtTile[t]=0,n.phase[t]=0,n.goNear(t,e.t,!1);return}n.task[t]=we,n.tgtTile[t]=e.how===Jo?1:0,n.goNear(t,e.t,e.how===Jo)}function xf(n,t){if(n.foodMode[t]===1&&(n.tick+t)%30)return;n.foodMode[t]=1;const e=n.task[t];if(e===Ae){if(n.state[t]===Se){const s=Qo(n,t);s&&tl(n,t,s)}return}if(e!==we||n.phase[t]===Pr||Id(n,t))return;const i=Qo(n,t);i&&(n.carry[t]>0&&n.carryRes[t]!==ns?ba(n,t):tl(n,t,i))}function _f(n,t){const e=n.tgt[t];if(!n.isBuilding(e)||n.owner[e]!==n.owner[t]){n.task[t]=Ae;return}if(n.done[e]){if(n.bdef(e).key==="farm"&&!yf(n,e,t))n.task[t]=we,n.phase[t]=zn,n.goNear(t,e,!1);else if(n.bdef(e).wall){const o=Mf(n,t,e);o>=0?(n.tgt[t]=o,n.fails[t]=0,n.goNear(t,o,!1)):n.task[t]=Ae}else n.task[t]=Ae;return}if(n.reach(t,e,!1)>230){n.state[t]===Se&&(++n.fails[t]>5?n.task[t]=Ae:n.goNear(t,e,!1));return}n.state[t]=Se,n.path[t]=null,n.fails[t]=0;const i=(n.tick&16383)+1,s=n.tmr[e]!==i;n.tmr[e]=i,n.work[e]+=s?10:6;const r=n.bdef(e),a=r.time*100;n.hp[e]=Math.max(n.hp[e],Math.floor(r.hp*Math.min(1,n.work[e]/a))),n.work[e]>=a&&(n.done[e]=1,n.hp[e]=r.hp,n.work[e]=0,n.events.push({t:"built",e}),hn(n,n.owner[e],"built."+r.key,n.x[e],n.z[e]))}function Mf(n,t,e){let i=-1,s=(10*Et)**2;for(let r=0;r<n.top;r++)if(n.isBuilding(r)&&!n.done[r]&&n.owner[r]===n.owner[t]&&n.bdef(r).wall){const a=n.x[r]-n.x[e],o=n.z[r]-n.z[e],l=a*a+o*o;l<s&&(s=l,i=r)}return i}function yf(n,t,e){for(let i=0;i<n.top;i++)if(i!==e&&n.isUnit(i)&&n.task[i]===we&&n.tgt[i]===t&&!n.tgtTile[i])return!0;return!1}function Ld(n,t){let e=n.tgt[t];if(e<0||!n.alive[e]||e===t||n.kind[e]===jt||n.isUnit(e)&&n.owner[e]===n.owner[t]){Dc(n,t);return}const i=_t[n.kind[t]],s=n.kind[t]===Xt.villager;if(!s&&n.owner[t]!==le&&(n.tick+t)%5===0){const l=Ko(n,t,e);if(l>Ds){const c=nc(n,t,i.sight,!1,l);c>=0&&(n.tgt[t]=e=c,n.fails[t]=0)}}s&&(n.amx[t]=n.x[e],n.amz[t]=n.z[e]);const r=i.hunt&&n.owner[e]===le,a=Math.round((r?i.hunt:i.range)*Et),o=n.reach(t,e,!1);if(o<=a+40){n.fails[t]=0,n.state[t]===qe&&(n.state[t]=Se,n.path[t]=null,n.field[t]=null),n.cd[t]===0&&(bf(n,t,e),n.cd[t]=i.cd);return}if((n.phase[t]===8||n.phase[t]===10)&&n.owner[t]!==le){const l=n.x[t]-n.rallyX[t],c=n.z[t]-n.rallyZ[t];if(l*l+c*c>(12*Et)**2){n.ignoreT[t]=e,n.ignoreUntil[t]=n.tick+100,n.task[t]=Ae,n.tgt[t]=-1,n.phase[t]===8&&(n.amx[t]=n.rallyX[t],n.amz[t]=n.rallyZ[t]),n.phase[t]=0,n.goPoint(t,n.amx[t],n.amz[t]);return}}if(n.state[t]===Se&&(n.tick+t)%4===0||(n.tick+t)%15===0){if(n.overBudget)return;if(n.fails[t]>8){n.fails[t]=0,n.ignoreT[t]=e,n.ignoreUntil[t]=n.tick+300,Dc(n,t);return}if(n.owner[t]===le){const l=n.map.herds[n.herd[t]];if(l){const c=l.x*Et-n.x[t],h=l.z*Et-n.z[t];if(c*c+h*h>(16*Et)**2){n.task[t]=Ae,n.aggro[t]=0,n.fast[t]=0,n.goPoint(t,l.x*Et,l.z*Et);return}}}if((i.proj||r)&&o<=a+Et*2&&n.state[t]===Se){n.goPoint(t,n.x[e],n.z[e]),n.fails[t]++;return}!n.goNear(t,e,!1)||n.lastPartial?n.fails[t]+=3:n.fails[t]++}}function Dc(n,t){if(n.kind[t]===Xt.villager){let i=-1,s=(3*Et)**2;for(let r=0;r<n.top;r++)if(n.alive[r]&&n.kind[r]===jt){const a=n.x[r]-n.amx[t],o=n.z[r]-n.amz[t],l=a*a+o*o;l<s&&(s=l,i=r)}if(i>=0){n.task[t]=we,n.tgt[t]=i,n.tgtTile[t]=0,n.phase[t]=zn,n.goNear(t,i,!1);return}}const e=n.phase[t];if(e===9&&n.owner[t]!==le){n.rallyX[t]>=0&&(n.amx[t]=n.rallyX[t],n.amz[t]=n.rallyZ[t]),n.task[t]=rs,n.phase[t]=0,n.fails[t]=0,n.tgt[t]=-1,n.goPoint(t,n.amx[t],n.amz[t]);return}n.task[t]=Ae,n.tgt[t]=-1,n.phase[t]=0,e===10&&n.owner[t]!==le?n.goPoint(t,n.amx[t],n.amz[t]):(n.state[t]=Se,n.path[t]=null,n.field[t]=null)}function bf(n,t,e){const i=_t[n.kind[t]];if(i.siege&&!n.isBuilding(e))return;let s=n.atkOf(t);if(n.isUnit(e)){const a=_t[n.kind[e]];s-=n.armorOf(e);for(const o of i.bonus??[])a.cls===o.vs&&(s+=o.dmg)}s=Math.max(1,s);const r=i.proj??(i.hunt&&n.owner[e]===le?"spear":void 0);if(r){const a=n.x[e]-n.x[t],o=n.z[e]-n.z[t],l=Yi(a*a+o*o),c=Math.max(3,Math.round(l/Et));n.projectiles.push({target:e,dmg:s,at:n.tick+c,by:t,k:n.kind[e],o:n.owner[e]}),n.events.push({t:"proj",x0:n.x[t],z0:n.z[t],x1:n.x[e],z1:n.z[e],ticks:c,kind:r,tk:n.kind[e],gap:n.reach(t,e,!1),te:e})}else Dd(n,e,s,t)}function Sf(n){if(!n.projectiles.length)return;const t=[];for(const e of n.projectiles){if(e.at>n.tick){t.push(e);continue}n.alive[e.target]&&n.kind[e.target]===e.k&&n.owner[e.target]===e.o&&Dd(n,e.target,e.dmg,e.by)}n.projectiles=t}function Dd(n,t,e,i){n.hp[t]-=e;const s=n.owner[t];if(s===le)n.alive[i]&&(n.aggro[t]=i+1);else if(n.isUnit(t)&&n.alive[i]){const a=n.task[t];n.kind[t]===Xt.villager?n.owner[i]===le&&a!==Te&&(n.task[t]=Te,n.tgt[t]=i,n.phase[t]=0):_t[n.kind[t]].siege||(a===Ae?Rd(n,t,i):a===rs?(n.task[t]=Te,n.tgt[t]=i,n.phase[t]=9,n.fails[t]=0):a===Te&&n.isUnit(i)&&n.tgt[t]!==i&&Ko(n,t,n.tgt[t])>Ko(n,t,i)&&(n.tgt[t]=i,n.fails[t]=0))}const r=n.players[s];if(r&&n.tick-r.lastAlert>300&&n.owner[i]!==s&&(r.lastAlert=n.tick,hn(n,s,"underAttack",n.x[t],n.z[t])),r&&n.isBuilding(t)&&n.bdef(t).key==="center"){const a=n.bdef(t).hp,o=n.hp[t]+e;(o>a/2&&n.hp[t]<=a/2||o>a/5&&n.hp[t]<=a/5)&&hn(n,s,"centerDanger",n.x[t],n.z[t])}n.hp[t]<=0&&Ef(n,t,i)}function Ef(n,t,e){if(n.events.push({t:"death",x:n.x[t],z:n.z[t],kind:n.kind[t],owner:n.owner[t]}),n.isUnit(t)){const i=_t[n.kind[t]].animal;i&&i.food>0&&n.spawnCarcass(n.kind[t],n.x[t],n.z[t],i.food)}else if(n.isBuilding(t)){const i=n.bdef(t).key,s=n.owner[e];if(i==="camp"&&s>=0&&s<n.players.length&&(n.players[s].res.food+=2e4,n.players[s].res.wood+=15e3,hn(n,s,"campLoot",n.x[t],n.z[t])),i==="center"){const r=n.players[n.owner[t]];hn(n,n.owner[t],"centerLost"),n.remove(t),r&&Ud(n,r);return}}n.remove(t)}function Tf(n,t){n.cd[t]>0&&n.cd[t]--;const e=_t[n.kind[t]],i=e.animal,s=n.map.herds[n.herd[t]];if(n.task[t]===Te){Ld(n,t);return}if(i.mode==="flee"){if(n.fast[t]){(--n.tmr[t]<=0||n.state[t]===Se)&&(n.fast[t]=0,n.tmr[t]=20);return}if((n.tick+t)%3===0){let r=-1;if(n.aggro[t]>0&&n.alive[n.aggro[t]-1]&&(r=n.aggro[t]-1),r>=0){let a=n.x[t]-n.x[r],o=n.z[t]-n.z[r];const l=Yi(a*a+o*o)||1;a=Math.trunc(a*4*Et/l),o=Math.trunc(o*4*Et/l),n.fast[t]=1,n.tmr[t]=18,n.aggro[t]=0,n.goPoint(t,n.x[t]+a,n.z[t]+o);return}}}else if(i.mode==="fight"){if(n.aggro[t]>0){const r=n.aggro[t]-1;if(n.aggro[t]=0,n.alive[r]&&n.isUnit(r)){n.task[t]=Te,n.tgt[t]=r,n.fast[t]=1;return}}}else if((n.tick+t)%10===0){const r=Af(n,t,e.sight+(n.season===3?3:0));if(r>=0){n.task[t]=Te,n.tgt[t]=r,n.fast[t]=1;return}}if(n.fast[t]=0,n.state[t]===Se&&s){if(n.tmr[t]>0){n.tmr[t]--;return}const r=Math.max(1,s.r)*Et,a=n.rng.int(2*r+1)-r,o=n.rng.int(2*r+1)-r;n.goPoint(t,Math.round(s.x*Et)+a,Math.round(s.z*Et)+o),n.tmr[t]=50+n.rng.int(90)}}function Af(n,t,e){let i=-1,s=1/0;return n.near(n.x[t],n.z[t],e,r=>{if(!n.isUnit(r)||n.owner[r]===le)return;const a=n.x[r]-n.x[t],o=n.z[r]-n.z[t],l=a*a+o*o;l<s&&(s=l,i=r)}),i}function wf(n,t){if(!n.done[t])return;const e=n.owner[t],i=n.players[e];if(!i)return;const s=n.bdef(t),r=s.key;n.queue[t].length&&Rf(n,t,i),s.tower&&Cf(n,t,s.tower),r==="pen"&&!Hs(n)&&n.tick%10===0&&(i.res.food+=20),r==="sanctuary"&&n.tick%20===0&&n.near(n.x[t],n.z[t],6,a=>{n.isUnit(a)&&n.owner[a]===e&&n.hp[a]<_t[n.kind[a]].hp&&n.hp[a]++})}function Cf(n,t,e){if(n.cd[t]>0){n.cd[t]--;return}if((n.tick+t)%3)return;const i=n.owner[t];let s=-1,r=1/0;if(n.near(n.x[t],n.z[t],e.range+1,h=>{if(!n.isUnit(h)||!n.hostile(i,n.owner[h]))return;const u=n.reach(t,h,!1);u<=e.range*Et&&u<r&&(r=u,s=h)}),s<0)return;const a=Math.max(1,e.atk-n.armorOf(s)),o=n.x[s]-n.x[t],l=n.z[s]-n.z[t],c=Math.max(3,Math.round(Yi(o*o+l*l)/Et));n.projectiles.push({target:s,dmg:a,at:n.tick+c,by:t,k:n.kind[s],o:n.owner[s]}),n.events.push({t:"proj",x0:n.x[t],z0:n.z[t],x1:n.x[s],z1:n.z[s],ticks:c,kind:"arrow",tk:n.kind[s],gap:n.reach(t,s,!1),te:s,h:3.2}),n.cd[t]=e.cd}function Rf(n,t,e){if(e.hunger)return;const i=n.queue[t][0];if(i>=ln){const x=ts[i-ln];if(++n.work[t]<x.time*10)return;n.work[t]=0,n.queue[t].shift(),e.tech|=1<<i-ln,hn(n,e.id,"tech."+x.key,n.x[t],n.z[t]);return}const s=_t[i];if(n.work[t]===0&&n.pop(e.id)+s.pop>n.popCap(e.id)){n.tick%300===0&&hn(n,e.id,n.popCap(e.id)>=Mr[e.era]?"popEra":"popHouses");return}if(n.work[t]++,n.work[t]<s.time*10)return;n.work[t]=0;const r=n.queue[t].shift(),[a,o,l]=n.footprint(t),c=n.size/2,h=n.rallyX[t]>=0?n.rallyX[t]>>8:c,u=n.rallyZ[t]>=0?n.rallyZ[t]>>8:c,d=a+l/2,f=o+l/2,g=h-d,v=u-f,m=Math.sqrt(g*g+v*v)||1,p=n.nearestFree(Math.round(d+g/m*(l/2+1)),Math.round(f+v/m*(l/2+1)));if(p<0)return;const M=n.spawnUnit(e.id,_t[r].key,p%n.size+.5,Math.floor(p/n.size)+.5);n.events.push({t:"trained",e:M}),n.rallyX[t]>=0&&n.goPoint(M,n.rallyX[t],n.rallyZ[t])}function Pf(n){if(n.tick===0||n.tick%Dn!==0)return;const t=n.month;if(t%3===0)for(const e of n.players)!e.defeated&&e.era>=2&&If(n,e.id)&&hn(n,e.id,"fair");if(t===8)for(const e of n.players)hn(n,e.id,"winterSoon");if(t>=9){for(const e of n.players){if(e.defeated)continue;const i=n.pop(e.id)*(e.era<=1?1:e.era<=3?2:3)*100;e.res.food>=i?(e.res.food-=i,e.hunger&&(e.hunger=!1)):(e.res.food=0,e.hunger||hn(n,e.id,"hunger"),e.hunger=!0)}if(t===9)for(const e of n.players)hn(n,e.id,"winter")}if(t===0)for(const e of n.players)e.hunger=!1,hn(n,e.id,"spring")}function If(n,t){for(let e=0;e<n.top;e++)if(n.isBuilding(e)&&n.owner[e]===t&&n.done[e]&&n.bdef(e).market)return!0;return!1}function Lf(n){for(const t of n.players)if(t.aging){if(!n.isBuilding(t.agingB)||n.owner[t.agingB]!==t.id){t.aging=0;continue}if(!(--t.aging>0)){t.era++;for(let e=0;e<n.top;e++)if(n.isUnit(e)&&n.owner[e]===t.id){const i=_t[n.kind[e]].next;if(!i)continue;const s=_t[n.kind[e]],r=_t[Xt[i]];n.hp[e]=Math.round(n.hp[e]*r.hp/s.hp),n.kind[e]=Xt[i]}for(let e=0;e<n.top;e++)n.isBuilding(e)&&n.owner[e]===t.id&&(n.queue[e]=n.queue[e].map(i=>i<ln&&_t[i].next?Xt[_t[i].next]:i));n.events.push({t:"age",player:t.id,era:t.era}),t.era===2&&hn(n,t.id,"metalSeen")}}}function Ud(n,t){if(!t.defeated){t.defeated=!0,t.aging=0;for(const e of n.players)hn(n,e.id,"defeated."+t.id);for(let e=0;e<n.top;e++)n.alive[e]&&n.owner[e]===t.id&&n.remove(e);kd(n)}}function Df(n,t){for(let e=0;e<n.top;e++)if(n.isBuilding(e)&&n.owner[e]===t&&n.bdef(e).key==="center")return!0;return!1}function Uf(n){if(n.outcome==="playing"){for(const t of n.players)!t.defeated&&!Df(n,t.id)&&Ud(n,t);kd(n)}}function kd(n){if(n.outcome!=="playing")return;const t=n.players.filter(e=>!e.ai);t.length&&t.every(e=>e.defeated)?(n.outcome="defeat",n.events.push({t:"end",result:"defeat"})):n.players.filter(e=>e.ai).every(e=>e.defeated)&&n.players.some(e=>e.ai)&&(n.outcome="victory",n.events.push({t:"end",result:"victory"}))}const io=[13,24,30],kf=[3,9,14],Uc=[42,36,30],Nf=[24,16,11],zf=[10,7,5],Ff=[6,12,99];function Of(n){for(const t of n.players){if(!t.ai||t.defeated)continue;const e=n.ai[t.id];n.tick<e.next||(e.next=n.tick+10,Bf(n,t.id,e))}qf(n)}function Bf(n,t,e){const i=n.players[t],s=Math.min(i.era,2),r=[],a=[],o=[];for(let E=0;E<n.top;E++)!n.alive[E]||n.owner[E]!==t||(n.isBuilding(E)?o.push(E):n.isUnit(E)&&(n.kind[E]===Xt.villager?r:a).push(E));const l=o.find(E=>n.bdef(E).key==="center"&&n.done[E]);if(l===void 0)return;const c=(E,w=!1)=>o.filter(b=>n.bdef(b).key===E&&(!w||n.done[b])),h=r.length+a.length,u=n.popCap(t),d=o.filter(E=>!n.done[E]),f=n.tick/Dn,g=new Set,v=(E,w,b)=>{const y=Vf(n,t,E,l,r.filter(S=>!g.has(S)),w,b);return y>=0&&g.add(y),y>=0},m=!i.aging&&(i.era===0&&r.length>=io[0]||i.era===1&&r.length>=io[1]-2&&f>=Uc[n.difficulty]-6&&n.eraBuildingTypes(t)>=2);if(r.length<io[s]&&!n.queue[l].length&&h<u&&!i.aging&&n.issue({type:"train",player:t,building:l,key:"villager"}),u-h<=3&&u<Mr[i.era]&&!d.some(E=>n.bdef(E).key==="house")&&n.tick>=e.houseCd&&v("house",5,14)&&(e.houseCd=n.tick+150),r.length>=6&&!c("depot").length){const E=Wf(n,t,l,r.filter(w=>!g.has(w)));E>=0&&g.add(E)}if(i.era>=2&&c("depot").length<2){const E=zd(n,t,l,r.filter(w=>!g.has(w)),w=>n.resKind[w]===Tn);E>=0&&g.add(E)}const p=c("military");r.length>=9&&!p.length&&v("military",7,16);const M=p.filter(E=>n.done[E]),x=kf[s]+(i.era?Math.floor(f/8):0),_={};i.era>=2&&(_.stone=(c("forge").length?0:60)+(c("market").length?0:40)+(c("tower").length?0:120),_.metal=(!n.hasTech(t,"bronze")&&c("forge",!0).length?60:0)+(c("stable",!0).length?35:0));const P=(E,w)=>Ki.every(b=>i.res[b]>=((E[b]??0)+(w[b]??0))*100);if(M.length&&!m&&a.length<x&&!n.queue[M[0]].length&&h<u){const E=ec(be[Ze.military],i.era).filter(w=>w!=="dog"&&P(_t[Xt[w]].cost,_));E.length&&n.issue({type:"train",player:t,building:M[0],key:E[n.rng.int(E.length)]})}if(i.era>=2&&!m){const E=c("stable",!0)[0],w=c("workshop",!0)[0];E!==void 0&&a.length<x&&!n.queue[E].length&&h+2<=u&&P(_t[Xt.horseman].cost,{stone:_.stone,metal:!n.hasTech(t,"bronze")&&c("forge",!0).length?60:0})&&n.issue({type:"train",player:t,building:E,key:"horseman"});const b=a.filter(L=>_t[n.kind[L]].siege).length;w!==void 0&&b<2&&!n.queue[w].length&&h+3<=u&&n.issue({type:"train",player:t,building:w,key:"ram"});const y=c("forge",!0)[0],S=c("market",!0)[0];if(y!==void 0&&!n.queue[y].length&&(n.hasTech(t,"bronze")?!n.hasTech(t,"iron")&&i.res.metal>3e4&&n.issue({type:"research",player:t,building:y,key:"iron"}):n.issue({type:"research",player:t,building:y,key:"bronze"})),S!==void 0&&!n.queue[S].length&&!n.hasTech(t,"wheel")&&i.res.metal>15e3&&n.issue({type:"research",player:t,building:S,key:"wheel"}),S!==void 0&&(n.tick+t)%30===0&&i.res.wood>(n.fair?5e4:9e4)){const L=i.res.stone<2e4?"stone":i.res.metal<25e3?"metal":i.res.food<3e4?"food":null;L&&n.issue({type:"trade",player:t,building:S,give:"wood",get:L})}}i.era===0&&!i.aging&&r.length>=10&&n.eraBuildingTypes(t)>=2&&n.canAfford(t,ji[0].cost)&&n.issue({type:"ageup",player:t,building:l}),i.era===1&&!i.aging&&r.length>=18&&f>=Uc[n.difficulty]&&n.eraBuildingTypes(t)>=2&&n.canAfford(t,ji[1].cost)&&n.issue({type:"ageup",player:t,building:l}),i.era>=1&&!d.length&&(c("farm").length<Math.min(i.era>=2?14:10,Math.floor(r.length*2/5))?v("farm",6,15):c("pen").length?!c("sanctuary").length&&f>30?v("sanctuary",6,14):i.era>=2&&(c("stable").length?c("forge").length?!c("market").length&&(f>50||i.res.wood>6e4)?v("market",7,16):c("tower").length?!c("workshop").length&&f>58&&v("workshop",7,16):v("tower",5,10):v("forge",6,14):v("stable",7,16)):v("pen",7,16));const T=r.filter(E=>n.task[E]===Ae&&n.state[E]===Se&&!g.has(E));if(T.length){const E=[0,0,0,0];for(const b of r)if(n.task[b]===we){const y=n.tgt[b],S=n.tgtTile[b]?n.map.tree[y]?yr:n.resKind[y]===Yn?Ua:n.resKind[y]===Tn?ka:ns:ns;E[S===ka?3:S===Ua?2:S===yr?1:0]++}const w=i.era===0?m?[.8,.15,.05,0]:[.62,.3,.08,0]:i.era===1?m?[.55,.25,.2,0]:[.5,.35,.15,0]:[.42,.25,.13,.2];i.res.wood>4e4&&(w[0]+=w[1]-.1,w[1]=.1),i.res.stone>25e3&&(w[0]+=w[2],w[2]=0),i.res.metal>4e4&&(w[0]+=w[3],w[3]=0);for(const b of T){const y=E[0]+E[1]+E[2]+E[3]+1,S=L=>w[L]-E[L]/y;for(const L of[0,1,2,3].sort((U,D)=>S(D)-S(U)||U-D))if(kc(n,t,b,L,l)){E[L]++;break}}}if(i.res.wood>4e4&&(n.tick+t*7)%200===0){const E=r.find(w=>n.task[w]===we&&n.tgtTile[w]&&n.map.tree[n.tgt[w]]>0&&!g.has(w));E!==void 0&&n.carry[E]===0&&kc(n,t,E,0,l)}if((n.tick+t)%30===0){const E=Hf(n,t,l,18);if(E>=0){const w=a.filter(b=>n.task[b]!==rs||!0);w.length&&n.issue({type:"attack",player:t,ids:w,target:E})}}if(e.attackAt||(e.attackAt=Nf[n.difficulty]*Dn),n.tick>=e.attackAt&&a.length>=5){const E=Gf(n,t,l);E>=0&&n.issue({type:"amove",player:t,ids:a.slice(0,Ff[n.difficulty]),x:n.x[E],z:n.z[E]}),e.attackAt=n.tick+zf[n.difficulty]*Dn}}function Hf(n,t,e,i){let s=-1,r=(i*Et)**2;return n.near(n.x[e],n.z[e],i,a=>{if(!n.isUnit(a))return;const o=n.owner[a];if(o===t||o<0)return;const l=n.x[a]-n.x[e],c=n.z[a]-n.z[e],h=l*l+c*c;h<r&&(r=h,s=a)}),s}function Gf(n,t,e){let i=-1,s=1/0;for(let r=0;r<n.top;r++)if(n.isBuilding(r)&&n.bdef(r).key==="center"&&n.owner[r]!==t&&n.owner[r]>=0&&n.owner[r]<n.players.length){const a=!n.players[n.owner[r]].ai,o=n.x[r]-n.x[e],l=n.z[r]-n.z[e],c=(o*o+l*l)*(a&&n.difficulty===2?.6:1)*(1+.02*((n.owner[r]-t+n.players.length)%n.players.length));c<s&&(s=c,i=r)}return i}function Vf(n,t,e,i,s,r,a){const o=be[Ze[e]];if(!n.canAfford(t,o.cost)||!s.length)return-1;const l=n.x[i]>>8,c=n.z[i]>>8;for(const[h,u]of Gs){const d=h*h+u*u;if(d<r*r)continue;if(d>a*a)break;const f=l+h-(o.size>>1),g=c+u-(o.size>>1);if(!n.canPlace(t,e,f,g)||!Nd(n,f,g,o.size))continue;const v=s.find(m=>n.task[m]!==Xn&&(n.carryRes[m]===yr||n.task[m]===Ae))??s.find(m=>n.task[m]!==Xn)??s[0];return n.issue({type:"build",player:t,ids:[v],key:e,tx:f,tz:g}),v}return-1}function Nd(n,t,e,i){for(let s=e-1;s<=e+i;s++)for(let r=t-1;r<=t+i;r++){const a=s*n.size+r;if(n.bAt[a])return!1}return!0}function Wf(n,t,e,i){return zd(n,t,e,i,s=>n.map.tree[s]>0)}function zd(n,t,e,i,s){const r=be[Ze.depot];if(!n.canAfford(t,r.cost)||!i.length)return-1;const a=n.x[e]>>8,o=n.z[e]>>8,l=n.size;let c=Gs;if(!Gs.some(([h,u])=>{const d=a+h,f=o+u;return d>=0&&f>=0&&d<l&&f<l&&s(f*l+d)})){let h=-1,u=1/0;for(let d=0;d<l*l;d+=2)if(s(d)){const f=d%l,g=(d-f)/l,v=(f-a)**2+(g-o)**2;v<u&&(u=v,h=d)}if(h<0)return-1;c=[[h%l-a,Math.floor(h/l)-o]]}for(const[h,u]of c){const d=a+h,f=o+u;if(!(h*h+u*u<36)&&!(d<2||f<2||d>=l-3||f>=l-3)&&s(f*l+d))for(const[g,v]of[[2,0],[-3,0],[0,2],[0,-3],[2,2],[-3,-3],[2,-3],[-3,2]]){const m=d+g,p=f+v;if(n.canPlace(t,"depot",m,p)&&Nd(n,m,p,2)){const M=i.find(x=>n.task[x]!==Xn)??i[0];return n.issue({type:"build",player:t,ids:[M],key:"depot",tx:m,tz:p}),M}}}return-1}function kc(n,t,e,i,s){const r=n.size,a=n.x[s]>>8,o=n.z[s]>>8;if(i===0){for(let M=0;M<n.top;M++)if(n.isBuilding(M)&&n.owner[M]===t&&n.done[M]&&n.bdef(M).key==="farm"){let x=!1;for(let _=0;_<n.top;_++)if(n.isUnit(_)&&n.task[_]===we&&n.tgt[_]===M&&!n.tgtTile[_]){x=!0;break}if(!x)return n.issue({type:"work",player:t,ids:[e],target:M}),!0}let f=0;for(let M=0;M<n.top;M++)n.isUnit(M)&&n.owner[M]===t&&n.task[M]===we&&n.tgtTile[M]&&n.resKind[n.tgt[M]]===Je&&f++;if(n.season!==3&&f<5)for(const[M,x]of Gs){if(M*M+x*x>196)break;const _=a+M,T=(o+x)*r+_;if(T>=0&&T<r*r&&n.resKind[T]===Je&&n.resAmt[T]>0)return n.issue({type:"gather",player:t,ids:[e],k:T}),!0}let g=-1,v=(25*Et)**2;for(let M=0;M<n.top;M++)if(n.alive[M]&&n.kind[M]===jt&&n.work[M]>0){let x=0;for(let E=0;E<n.top;E++)n.isUnit(E)&&n.task[E]===we&&n.tgt[E]===M&&!n.tgtTile[E]&&x++;const _=n.x[M]-n.x[s],P=n.z[M]-n.z[s],T=_*_+P*P;x<4&&T<v&&(v=T,g=M)}if(g>=0)return n.issue({type:"work",player:t,ids:[e],target:g}),!0;let m=-1,p=(28*Et)**2;for(let M=0;M<n.top;M++)if(n.isAnimal(M)&&_t[n.kind[M]].animal.food>0&&_t[n.kind[M]].key!=="aurochs"){const x=n.x[M]-n.x[s],_=n.z[M]-n.z[s],P=x*x+_*_;P<p&&(p=P,m=M)}return m>=0?(n.issue({type:"attack",player:t,ids:[e],target:m}),!0):!1}if(i===3&&n.players[t].era<2)return!1;const l=f=>i===1?n.map.tree[f]>0:i===2?n.resKind[f]===Yn:n.resKind[f]===Tn;let c=a,h=o;if(i===1){for(let f=0;f<n.top;f++)if(n.isBuilding(f)&&n.owner[f]===t&&n.bdef(f).key==="depot"){c=n.x[f]>>8,h=n.z[f]>>8;break}}for(const[f,g]of Gs){const v=c+f,m=h+g;if(v<0||m<0||v>=r||m>=r)continue;const p=m*r+v;if(l(p)&&n.open(p))return n.issue({type:"gather",player:t,ids:[e],k:p}),!0}let u=-1,d=1/0;for(let f=0;f<r*r;f+=3)if(l(f)&&n.open(f)){const g=f%r,v=(f-g)/r,m=(g-c)**2+(v-h)**2;m<d&&(d=m,u=f)}return u>=0?(n.issue({type:"gather",player:t,ids:[e],k:u}),!0):!1}function qf(n){if(n.tick+300===n.barbNext&&!n.barbWarned){n.barbWarned=!0;for(let s=0;s<n.top;s++)if(n.isBuilding(s)&&n.owner[s]===hi){const r=Nc(n,s);r>=0&&n.events.push({t:"msg",player:n.owner[r],key:"raidSoon",x:n.x[s],z:n.z[s]})}}if(n.tick!==n.barbNext)return;n.barbWarned=!1;const t=n.tick/Dn,i=Math.max(...n.players.map(s=>s.era))>=2?Math.min(7,3+Math.floor(t/15)):Math.min(5,2+Math.floor(t/15));for(let s=0;s<n.top;s++){if(!n.isBuilding(s)||n.owner[s]!==hi)continue;const r=Nc(n,s);if(r<0)continue;const a=[];for(let o=0;o<i;o++){const l=n.nearestFree((n.x[s]>>8)+o%3-1,(n.z[s]>>8)+3+Math.floor(o/3));l<0||a.push(n.spawnUnit(hi,"barbarian",l%n.size+.5,Math.floor(l/n.size)+.5))}for(const o of a)n.task[o]=rs,n.amx[o]=n.x[r],n.amz[o]=n.z[r],n.rallyX[o]=n.x[r],n.rallyZ[o]=n.z[r];n.orderMove(a,n.x[r],n.z[r])}n.barbNext=n.tick+(8+n.rng.int(5))*Dn}function Nc(n,t){let e=-1,i=1/0;for(let s=0;s<n.top;s++)if(n.isBuilding(s)&&n.bdef(s).key==="center"&&n.owner[s]>=0&&n.owner[s]<n.players.length&&!n.players[n.owner[s]].defeated){const r=n.x[s]-n.x[t],a=n.z[s]-n.z[t],o=r*r+a*a;o<i&&(i=o,e=s)}return e}const kt=4096,Se=0,qe=1,Ae=0,we=1,Xn=2,Te=3,rs=4,zn=0,Fd=1,Pr=2,ns=0,yr=1,Ua=2,ka=3,zr=[1,-1,0,0,1,1,-1,-1],Fr=[0,0,1,-1,1,-1,1,-1],zc=[10,10,10,10,14,14,14,14],Xf=4294967295;class $f{constructor(t,e){R(this,"dist");this.goal=t,this.dist=new Uint32Array(e).fill(Xf)}}const Us=[];for(let n=-14;n<=14;n++)for(let t=-14;t<=14;t++)t*t+n*n<=196&&Us.push([t,n]);Us.sort((n,t)=>n[0]*n[0]+n[1]*n[1]-(t[0]*t[0]+t[1]*t[1])||n[1]-t[1]||n[0]-t[0]);const Gs=Us,Fc=new Map;function Yf(n){let t=Fc.get(n);if(t)return t;const e=[];for(let i=-n;i<=n;i++)for(let s=-n;s<=n;s++)s*s+i*i<=n*n+n&&e.push(s,i);return t=new Int16Array(e),Fc.set(n,t),t}class Od{constructor(t,e,i={}){R(this,"map");R(this,"size");R(this,"rng");R(this,"tick",0);R(this,"difficulty",1);R(this,"players",[]);R(this,"alive",new Uint8Array(kt));R(this,"kind",new Uint8Array(kt));R(this,"owner",new Int8Array(kt));R(this,"x",new Int32Array(kt));R(this,"z",new Int32Array(kt));R(this,"px",new Int32Array(kt));R(this,"pz",new Int32Array(kt));R(this,"hp",new Int16Array(kt));R(this,"state",new Uint8Array(kt));R(this,"stuck",new Uint8Array(kt));R(this,"best",new Int32Array(kt));R(this,"slotX",new Int32Array(kt));R(this,"slotZ",new Int32Array(kt));R(this,"task",new Uint8Array(kt));R(this,"tgt",new Int32Array(kt));R(this,"tgtTile",new Uint8Array(kt));R(this,"phase",new Uint8Array(kt));R(this,"carry",new Int16Array(kt));R(this,"carryRes",new Uint8Array(kt));R(this,"cd",new Uint16Array(kt));R(this,"work",new Int32Array(kt));R(this,"done",new Uint8Array(kt));R(this,"sub",new Uint8Array(kt));R(this,"aggro",new Int32Array(kt));R(this,"tmr",new Int16Array(kt));R(this,"herd",new Int16Array(kt));R(this,"fast",new Uint8Array(kt));R(this,"amx",new Int32Array(kt));R(this,"amz",new Int32Array(kt));R(this,"fails",new Uint8Array(kt));R(this,"frac",new Int32Array(kt));R(this,"rallyX",new Int32Array(kt));R(this,"rallyZ",new Int32Array(kt));R(this,"dropB",new Int32Array(kt));R(this,"ignoreT",new Int32Array(kt).fill(-1));R(this,"ignoreUntil",new Int32Array(kt));R(this,"foodMode",new Uint8Array(kt));R(this,"queue",Array.from({length:kt},()=>[]));R(this,"field",new Array(kt).fill(null));R(this,"path",new Array(kt).fill(null));R(this,"pathI",new Uint16Array(kt));R(this,"top",0);R(this,"blocked");R(this,"bAt");R(this,"resKind");R(this,"resAmt");R(this,"vis",[]);R(this,"explored",[]);R(this,"projectiles",[]);R(this,"events",[]);R(this,"ai",[]);R(this,"barbNext",0);R(this,"barbWarned",!1);R(this,"outcome","playing");R(this,"pending",[]);R(this,"seq",0);R(this,"hashHead");R(this,"hashNext",new Int32Array(kt));R(this,"hs");R(this,"pushX",new Int32Array(kt));R(this,"pushZ",new Int32Array(kt));R(this,"aStamp");R(this,"aG");R(this,"aFrom");R(this,"aClosed");R(this,"aId",0);R(this,"aHeap");R(this,"lastPartial",!1);R(this,"flowCache",new Map);R(this,"nodesTick",0);R(this,"overBudget",!1);this.map=Ed(t,e),this.size=this.map.size,this.rng=new Md(t),this.difficulty=i.difficulty??1;const s=this.size*this.size;this.blocked=new Uint8Array(s),this.bAt=new Int16Array(s),this.resKind=new Uint8Array(s),this.resAmt=new Int32Array(s);for(let a=0;a<s;a++){const o=this.map.terrain[a];(o===Ri||o===es||this.map.tree[a])&&(this.blocked[a]=1),this.map.tree[a]&&(this.resAmt[a]=this.map.wood[a]*100)}for(const a of this.map.res){const o=a.z*this.size+a.x;this.resKind[o]=a.kind,this.resAmt[o]=a.amount*100,this.blocked[o]=1}this.hs=this.size>>1,this.hashHead=new Int32Array(this.hs*this.hs),this.aStamp=new Int32Array(s),this.aG=new Int32Array(s),this.aFrom=new Int32Array(s),this.aClosed=new Int32Array(s),this.aHeap=new Float64Array(s*2);const r=i.humans??1;this.map.starts.forEach((a,o)=>{this.players.push({id:o,color:nf[o],start:{x:a.x,z:a.z},ai:o>=r,era:0,res:{food:2e4,wood:15e3,stone:5e3,metal:0,coins:0},aging:0,agingB:-1,hunger:!1,defeated:!1,lastAlert:-9999,tech:0}),this.vis.push(new Uint8Array(s)),this.explored.push(new Uint8Array(s)),this.spawnBuilding(o,"center",a.x-2,a.z-2,!0);for(let l=0;l<4;l++)this.spawnUnit(o,"villager",a.x-a.ux*4+(l-1.5)*1.1,a.z-a.uz*4+l%2*.8);this.spawnUnit(o,"dog",a.x-a.ux*3-a.uz*3,a.z-a.uz*3+a.ux*3),this.ai.push({next:20+o*3,attackAt:0,phase:0,houseCd:0})}),this.map.herds.forEach((a,o)=>{for(const[l,c]of a.spots){const h=this.spawnUnit(le,a.kind,l+.5,c+.5);this.herd[h]=o,this.tmr[h]=h*7%60}});for(const a of this.map.camps)this.spawnBuilding(hi,"camp",a.x-2,a.z-2,!0);if(this.barbNext=12*Dn,i.testUnits){const a=this.map.starts[0];let o=0;for(let l=0;l<40&&o<i.testUnits;l++)for(let c=0;c<20&&o<i.testUnits;c++){const h=a.x-a.ux*9+(c-10)*.9,u=a.z-a.uz*9-l*.9*(a.uz>=0?1:-1);this.blockedAt(Math.round(h*Et),Math.round(u*Et))||(this.spawnUnit(0,"warrior",h,u),o++)}}this.updateFog()}open(t){const e=this.size,i=t%e,s=(t-i)/e;for(let r=0;r<8;r++){const a=i+zr[r],o=s+Fr[r];if(a>=0&&o>=0&&a<e&&o<e&&!this.blocked[o*e+a])return!0}return!1}udef(t){return _t[this.kind[t]]}bdef(t){return be[this.kind[t]-Zt]}isUnit(t){return this.alive[t]===1&&this.kind[t]<jt}isBuilding(t){return this.alive[t]===1&&this.kind[t]>=Zt}isAnimal(t){return this.isUnit(t)&&this.owner[t]===le}hostile(t,e){return!(t===e||t===le||e===le)}hasTech(t,e){const i=this.players[t];return!!i&&(i.tech&1<<$o[e])!==0}techQueued(t,e){for(let i=0;i<this.top;i++)if(this.isBuilding(i)&&this.owner[i]===t&&this.queue[i].includes(ln+e))return!0;return!1}soldier(t){const e=_t[this.kind[t]].cls;return e!=="villager"&&e!=="animal"&&this.owner[t]>=0&&this.owner[t]<this.players.length}atkOf(t){const e=_t[this.kind[t]];if(!this.soldier(t))return e.atk;const i=this.owner[t];return e.atk+(this.hasTech(i,"bronze")?1:0)+(this.hasTech(i,"iron")?1:0)}armorOf(t){return _t[this.kind[t]].armor+(this.soldier(t)&&this.hasTech(this.owner[t],"iron")?1:0)}carryCap(t){return(ef+(this.hasTech(this.owner[t],"wheel")?5:0))*100}get fair(){return this.tick>=3*Dn&&this.tick%(3*Dn)<tf}alloc(){for(let t=0;t<kt;t++)if(!this.alive[t])return t>=this.top&&(this.top=t+1),t;throw new Error("entidades esgotadas")}reset(t){this.state[t]=Se,this.task[t]=Ae,this.tgt[t]=-1,this.tgtTile[t]=0,this.phase[t]=0,this.carry[t]=0,this.cd[t]=0,this.work[t]=0,this.done[t]=0,this.sub[t]=0,this.aggro[t]=0,this.tmr[t]=0,this.herd[t]=-1,this.fast[t]=0,this.fails[t]=0,this.frac[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[],this.rallyX[t]=-1,this.rallyZ[t]=-1,this.stuck[t]=0,this.dropB[t]=-1,this.ignoreT[t]=-1,this.foodMode[t]=0}spawnUnit(t,e,i,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=Xt[e],this.owner[r]=t,this.x[r]=this.px[r]=Math.round(i*Et),this.z[r]=this.pz[r]=Math.round(s*Et),this.hp[r]=_t[Xt[e]].hp,r}spawnCarcass(t,e,i,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=jt,this.owner[r]=le,this.sub[r]=t,this.x[r]=this.px[r]=e,this.z[r]=this.pz[r]=i,this.work[r]=s*100,this.hp[r]=1,r}spawnBuilding(t,e,i,s,r){const a=this.alloc();this.reset(a);const o=be[Ze[e]];this.alive[a]=1,this.kind[a]=Zt+Ze[e],this.owner[a]=t,this.x[a]=this.px[a]=i*Et+o.size*128,this.z[a]=this.pz[a]=s*Et+o.size*128,this.done[a]=r?1:0,this.hp[a]=r?o.hp:Math.max(1,o.hp/10|0);for(let l=0;l<o.size;l++)for(let c=0;c<o.size;c++){const h=(s+l)*this.size+i+c;this.bAt[h]=a+1,o.walk||(this.blocked[h]=1)}return this.events.push({t:"placed",e:a}),a}footprint(t){const e=this.bdef(t).size;return[(this.x[t]>>8)-(e>>1),(this.z[t]>>8)-(e>>1),e]}remove(t){if(this.kind[t]>=Zt){const[e,i,s]=this.footprint(t),r=this.bdef(t).walk;for(let a=0;a<s;a++)for(let o=0;o<s;o++){const l=(i+a)*this.size+e+o;this.bAt[l]=0,r||(this.blocked[l]=0)}this.events.push({t:"gone",e:t})}this.alive[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[]}blockedAt(t,e){const i=t>>8,s=e>>8;return i<0||s<0||i>=this.size||s>=this.size?!0:this.blocked[s*this.size+i]===1}canPlace(t,e,i,s){const r=be[Ze[e]],a=this.size;if(i<1||s<1||i+r.size>=a-1||s+r.size>=a-1)return!1;for(let o=0;o<r.size;o++)for(let l=0;l<r.size;l++){const c=(s+o)*a+i+l,h=this.map.terrain[c];if(this.blocked[c]||this.bAt[c]||h===Ri||h===Bs||h===es||!this.explored[t][c])return!1}for(let o=0;o<this.top;o++)if(this.isUnit(o)){const l=this.x[o]>>8,c=this.z[o]>>8;if(l>=i&&l<i+r.size&&c>=s&&c<s+r.size&&this.state[o]===Se&&this.owner[o]!==t)return!1}return!0}canAfford(t,e){const i=this.players[t].res;return Ki.every(s=>i[s]>=(e[s]??0)*100)}pay(t,e){const i=this.players[t].res;for(const s of Ki)i[s]-=(e[s]??0)*100}refund(t,e){const i=this.players[t].res;for(const s of Ki)i[s]+=(e[s]??0)*100}pop(t){let e=0;for(let i=0;i<this.top;i++)this.isUnit(i)&&this.owner[i]===t&&(e+=this.udef(i).pop);return e}popCap(t){const e=this.players[t].era;let i=0;for(let s=0;s<this.top;s++)if(this.isBuilding(s)&&this.owner[s]===t&&this.done[s]){const r=this.bdef(s).pop;r&&(i+=r[e])}return Math.min(Mr[e],i)}eraBuildingTypes(t){const e=this.players[t].era,i=new Set;for(let s=0;s<this.top;s++)this.isBuilding(s)&&this.owner[s]===t&&this.done[s]&&this.bdef(s).buildable&&this.bdef(s).era===e&&i.add(this.bdef(s).key);return i.size}reach(t,e,i){let s,r,a,o;if(i){const h=e%this.size,u=(e-h)/this.size;s=h*Et,r=u*Et,a=s+Et,o=r+Et}else if(this.kind[e]>=Zt){const[h,u,d]=this.footprint(e);s=h*Et,r=u*Et,a=s+d*Et,o=r+d*Et}else{const h=this.x[e]-this.x[t],u=this.z[e]-this.z[t];return Math.max(0,Yi(h*h+u*u)-(this.kind[e]<jt?Math.round(_t[this.kind[e]].radius*Et):64))}const l=Math.max(s-this.x[t],0,this.x[t]-a),c=Math.max(r-this.z[t],0,this.z[t]-o);return Yi(l*l+c*c)}nearestFree(t,e){for(const[i,s]of Us){const r=t+i,a=e+s;if(r>=0&&a>=0&&r<this.size&&a<this.size&&!this.blocked[a*this.size+r])return a*this.size+r}return-1}findPath(t,e,i,s,r,a=16e3){const o=this.size,l=this.blocked,c=++this.aId,h=this.aG,u=this.aFrom,d=this.aStamp,f=this.aClosed,g=this.aHeap;this.lastPartial=!1;const v=(U,D)=>{const B=Math.max(e-U,0,U-s),V=Math.max(i-D,0,D-r);return 15*Math.max(B,V)+6*Math.min(B,V)},m=t%o,p=(t-m)/o;if(m>=e&&m<=s&&p>=i&&p<=r)return[];let M=0;const x=U=>{let D=M++;for(g[D]=U;D>0;){const B=D-1>>1;if(g[B]<=g[D])break;const V=g[B];g[B]=g[D],g[D]=V,D=B}},_=()=>{const U=g[0];g[0]=g[--M];let D=0;for(;;){const B=D*2+1,V=B+1;let j=D;if(B<M&&g[B]<g[j]&&(j=B),V<M&&g[V]<g[j]&&(j=V),j===D)break;const z=g[j];g[j]=g[D],g[D]=z,D=j}return U};d[t]=c,h[t]=0,u[t]=-1,x(v(m,p)*65536+t);let P=t,T=v(m,p),E=-1,w=0;if(this.nodesTick>6e4)return this.overBudget=!0,this.lastPartial=!0,null;for(;M>0&&w<a;){const U=_(),D=U%65536;if(f[D]===c)continue;f[D]=c,w++;const B=D%o,V=(D-B)/o,j=v(B,V);if(j===0){E=D;break}j<T&&(T=j,P=D);for(let z=0;z<8;z++){const F=B+zr[z],H=V+Fr[z];if(F<0||H<0||F>=o||H>=o)continue;const Y=H*o+F;if(l[Y]||f[Y]===c||z>=4&&(l[V*o+F]||l[H*o+B]))continue;const Q=h[D]+zc[z];(d[Y]!==c||Q<h[Y])&&(d[Y]=c,h[Y]=Q,u[Y]=D,x((Q+v(F,H))*65536+Y))}}this.lastPartial=E<0,this.nodesTick+=w;const b=E>=0?E:P;if(b===t)return E>=0?[]:null;const y=[];for(let U=b;U!==t&&U>=0;U=u[U])y.push(U);y.reverse();const S=[];let L=t;for(let U=0;U<y.length;){let D=Math.min(y.length-1,U+12);for(;D>U&&!this.clear(L,y[D]);)D--;S.push(y[D]),L=y[D],U=D+1}return S}clear(t,e){const i=this.size;let s=t%i,r=(t-s)/i;const a=e%i,o=(e-a)/i,l=Math.abs(a-s),c=Math.abs(o-r),h=s<a?1:-1,u=r<o?1:-1;let d=l-c;for(let f=0;f<64;f++){if(this.blocked[r*i+s])return!1;if(s===a&&r===o)return!0;const g=2*d;if(g>-c&&g<l&&(this.blocked[r*i+s+h]||this.blocked[(r+u)*i+s]))return!1;g>-c&&(d-=c,s+=h),g<l&&(d+=l,r+=u)}return!1}goTo(t,e,i,s,r,a,o,l=16e3){const c=(this.z[t]>>8)*this.size+(this.x[t]>>8),h=this.size;let u=!1;for(let m=Math.max(0,i);m<=Math.min(h-1,r)&&!u;m++)for(let p=Math.max(0,e);p<=Math.min(h-1,s);p++)if(!this.blocked[m*h+p]){u=!0;break}if(!u)return this.lastPartial=!0,this.state[t]=Se,!1;const d=this.findPath(c,e,i,s,r,l);if(this.field[t]=null,!d)return this.state[t]=Se,!1;this.path[t]=d,this.pathI[t]=0;const f=d.length?d[d.length-1]:c,g=f%this.size,v=(f-g)/this.size;return this.slotX[t]=a??g*Et+128,this.slotZ[t]=o??v*Et+128,this.state[t]=qe,this.stuck[t]=0,this.best[t]=2147483647,!0}flowTo(t){const e=this.flowCache.get(t);if(e&&this.tick-e.t<600)return e.f;const i=this.buildFlow(t,[]);if(this.flowCache.set(t,{f:i,t:this.tick}),this.flowCache.size>12){let s=-1,r=1/0;for(const[a,o]of this.flowCache)o.t<r&&(r=o.t,s=a);this.flowCache.delete(s)}return i}goFar(t,e,i){const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,i>>8)));return s<0?!1:(this.field[t]=this.flowTo(s),this.path[t]=null,this.lastPartial=!1,this.slotX[t]=s%this.size*Et+128,this.slotZ[t]=Math.floor(s/this.size)*Et+128,this.state[t]=qe,this.stuck[t]=0,this.best[t]=2147483647,!0)}far(t,e,i){const s=e-this.x[t],r=i-this.z[t];return s*s+r*r>(22*Et)**2}goNear(t,e,i){if(!i&&this.far(t,this.x[e],this.z[e]))return this.goFar(t,this.x[e],this.z[e]);if(i){const a=e%this.size,o=(e-a)/this.size;return this.goTo(t,a-1,o-1,a+1,o+1,void 0,void 0,6e3)}if(this.kind[e]>=Zt){const[a,o,l]=this.footprint(e);if(this.bdef(e).walk){const c=l>>1;return this.goTo(t,a+c,o+c,a+c,o+c,this.x[e],this.z[e],8e3)}return this.goTo(t,a-1,o-1,a+l,o+l,void 0,void 0,8e3)}const s=this.x[e]>>8,r=this.z[e]>>8;return this.goTo(t,s-1,r-1,s+1,r+1,this.x[e],this.z[e],3e3)}goPoint(t,e,i){if(this.far(t,e,i)){this.goFar(t,e,i);return}const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,i>>8)));if(s<0)return;const r=s%this.size,a=(s-r)/this.size,o=!this.blocked[(i>>8)*this.size+(e>>8)];this.goTo(t,r,a,r,a,o?e:r*Et+128,o?i:a*Et+128)}issue(t){this.pending.push({...t,..."ids"in t?{ids:t.ids.slice()}:{},at:this.tick+1,seq:this.seq++})}own(t){return t.ids.filter(e=>this.isUnit(e)&&this.owner[e]===t.player)}apply(t){const e=this.players[t.player];if(!(!e||e.defeated))switch(t.type){case"move":case"amove":{const i=this.own(t);for(const s of i)this.task[s]=t.type==="amove"?rs:Ae,this.amx[s]=t.x,this.amz[s]=t.z,this.rallyX[s]=t.type==="amove"?t.x:-1,this.rallyZ[s]=t.type==="amove"?t.z:-1,this.tgt[s]=-1,this.aggro[s]=0,this.fails[s]=0;this.orderMove(i,t.x,t.z);break}case"stop":for(const i of this.own(t))this.task[i]=Ae,this.state[i]=Se,this.path[i]=null,this.field[i]=null,this.foodMode[i]=0;break;case"food":for(const i of this.own(t))this.kind[i]===Xt.villager&&(this.foodMode[i]=t.on?2:0);break;case"gather":{if(t.k<0||t.k>=this.size*this.size||!this.map.tree[t.k]&&!this.resKind[t.k]||this.resKind[t.k]===Tn&&e.era<2)return;const i=this.resKind[t.k]===Je;for(const s of this.own(t))this.kind[s]===Xt.villager&&(this.task[s]=we,this.tgt[s]=t.k,this.tgtTile[s]=1,this.phase[s]=zn,this.fails[s]=0,i||(this.foodMode[s]=0),this.goNear(s,t.k,!0));break}case"work":case"attack":{const i=t.target;if(!this.alive[i])return;for(const s of this.own(t)){const r=this.kind[s]===Xt.villager;if(this.kind[i]>=Zt&&this.owner[i]===t.player){if(!r)continue;this.done[i]?this.bdef(i).key==="farm"?(this.task[s]=we,this.tgt[s]=i,this.tgtTile[s]=0,this.phase[s]=zn,this.goNear(s,i,!1)):this.bdef(i).drop&&this.carry[s]>0&&(this.task[s]=we,this.phase[s]=Pr,this.tgt[s]=-1,this.goNear(s,i,!1)):(this.task[s]=Xn,this.tgt[s]=i,this.tgtTile[s]=0,this.goNear(s,i,!1));continue}if(this.kind[i]===jt){r&&(this.task[s]=we,this.tgt[s]=i,this.tgtTile[s]=0,this.phase[s]=zn,this.goNear(s,i,!1));continue}_t[this.kind[s]].siege&&this.kind[i]<Zt||(this.owner[i]===le||this.hostile(t.player,this.owner[i]))&&(this.task[s]=Te,this.tgt[s]=i,this.tgtTile[s]=0,this.goNear(s,i,!1))}break}case"build":{const i=this.own(t).filter(a=>this.kind[a]===Xt.villager),s=be[Ze[t.key]];if(!i.length||!s?.buildable||s.era>e.era||!this.canAfford(t.player,s.cost)||!this.canPlace(t.player,t.key,t.tx,t.tz))return;this.pay(t.player,s.cost);const r=this.spawnBuilding(t.player,t.key,t.tx,t.tz,!1);for(const a of i)this.task[a]=Xn,this.tgt[a]=r,this.tgtTile[a]=0,this.goNear(a,r,!1);break}case"train":{const i=t.building;if(!this.isBuilding(i)||this.owner[i]!==t.player||!this.done[i]||!ec(this.bdef(i),e.era).includes(t.key)||this.queue[i].length>=5)return;const r=_t[Xt[t.key]];if(!this.canAfford(t.player,r.cost))return;this.pay(t.player,r.cost),this.queue[i].push(Xt[t.key]);break}case"cancel":{const i=t.building;if(!this.isBuilding(i)||this.owner[i]!==t.player||!this.queue[i].length)return;const s=this.queue[i].pop();this.refund(t.player,s>=ln?ts[s-ln].cost:_t[s].cost),this.queue[i].length||(this.work[i]=0);break}case"ageup":{const i=t.building,s=ji[e.era];if(!s||e.era>=_d||e.aging||!this.isBuilding(i)||this.owner[i]!==t.player||this.bdef(i).key!=="center"||this.eraBuildingTypes(t.player)<2||!this.canAfford(t.player,s.cost))return;this.pay(t.player,s.cost),e.aging=s.time*10,e.agingB=i;break}case"rally":this.isBuilding(t.building)&&this.owner[t.building]===t.player&&(this.rallyX[t.building]=t.x,this.rallyZ[t.building]=t.z);break;case"research":{const i=t.building,s=$o[t.key],r=ts[s];if(!r||!this.isBuilding(i)||this.owner[i]!==t.player||!this.done[i]||!(this.bdef(i).research??[]).includes(t.key)||e.era<2||this.hasTech(t.player,t.key)||this.techQueued(t.player,s)||r.needs&&!this.hasTech(t.player,r.needs)||this.queue[i].length>=5||!this.canAfford(t.player,r.cost))return;this.pay(t.player,r.cost),this.queue[i].push(ln+s);break}case"trade":{const i=t.building;if(!this.isBuilding(i)||this.owner[i]!==t.player||!this.done[i]||!this.bdef(i).market||t.give===t.get||!Ia.includes(t.give)||!Ia.includes(t.get)||e.res[t.give]<Hn.give*100)return;e.res[t.give]-=Hn.give*100,e.res[t.get]+=(this.fair?Hn.fair:Hn.get)*100;break}case"wall":{const i=this.own(t).filter(a=>this.kind[a]===Xt.villager),s=be[Ze.wall];if(!i.length||s.era>e.era)return;const r=[];for(const a of t.tiles.slice(0,40)){if(!this.canAfford(t.player,s.cost))break;const o=a%this.size,l=(a-o)/this.size;this.canPlace(t.player,"wall",o,l)&&(this.pay(t.player,s.cost),r.push(this.spawnBuilding(t.player,"wall",o,l,!1)))}if(!r.length)return;for(const a of i){let o=r[0],l=1/0;for(const c of r){const h=this.x[c]-this.x[a],u=this.z[c]-this.z[a],d=h*h+u*u;d<l&&(l=d,o=c)}this.task[a]=Xn,this.tgt[a]=o,this.tgtTile[a]=0,this.goNear(a,o,!1)}break}}}orderMove(t,e,i){if(!t.length)return;const s=this.size,r=this.nearestFree(Math.min(s-1,Math.max(0,e>>8)),Math.min(s-1,Math.max(0,i>>8)));if(r<0)return;if(t.length===1){this.goPoint(t[0],e,i);return}const a=this.blocked[(i>>8)*s+(e>>8)],o=a?r%s*Et+128:e,l=a?Math.floor(r/s)*Et+128:i;t.sort((u,d)=>{const f=(this.x[u]-o)**2+(this.z[u]-l)**2,g=(this.x[d]-o)**2+(this.z[d]-l)**2;return f-g||u-d});const c=this.buildFlow(r,t);let h=0;for(const u of t){let d=o,f=l;for(;h<Us.length;){const[g,v]=Us[h++],m=o+g*218,p=l+v*218;if(!this.blockedAt(m,p)){d=m,f=p;break}}this.slotX[u]=d,this.slotZ[u]=f,this.state[u]=qe,this.field[u]=c,this.path[u]=null,this.stuck[u]=0,this.best[u]=2147483647}}buildFlow(t,e){const i=this.size,s=i*i,r=new $f(t,s),a=r.dist,o=this.blocked,l=new Set;for(const g of e)l.add((this.z[g]>>8)*i+(this.x[g]>>8));const c=this.aHeap;let h=0;const u=g=>{let v=h++;for(c[v]=g;v>0;){const m=v-1>>1;if(c[m]<=c[v])break;const p=c[m];c[m]=c[v],c[v]=p,v=m}},d=()=>{const g=c[0];c[0]=c[--h];let v=0;for(;;){const m=v*2+1,p=m+1;let M=v;if(m<h&&c[m]<c[M]&&(M=m),p<h&&c[p]<c[M]&&(M=p),M===v)break;const x=c[M];c[M]=c[v],c[v]=x,v=M}return g};a[t]=0,u(t);let f=e.length?l.size:-1;for(;h>0;){const g=d(),v=g%65536,m=(g-v)/65536;if(m>a[v])continue;if(f>0&&l.has(v)&&(l.delete(v),--f<=0&&m>400))break;const p=v%i,M=(v-p)/i;for(let x=0;x<8;x++){const _=p+zr[x],P=M+Fr[x];if(_<0||P<0||_>=i||P>=i)continue;const T=P*i+_;if(o[T]||x>=4&&(o[M*i+_]||o[P*i+p]))continue;const E=m+zc[x];E<a[T]&&(a[T]=E,u(E*65536+T))}}return r}step(){if(this.outcome!=="playing"&&this.players.every(t=>!t.ai||t.defeated),this.px.set(this.x),this.pz.set(this.z),this.nodesTick=0,this.overBudget=!1,this.pending.length){const t=this.pending.filter(e=>e.at<=this.tick).sort((e,i)=>e.seq-i.seq);this.pending=this.pending.filter(e=>e.at>this.tick);for(const e of t)this.apply(e)}this.buildHash(),Of(this),of(this),this.moveUnits(),this.separate(),this.tick%2===0&&this.updateFog(),this.tick++}speedOf(t){const e=_t[this.kind[t]];return Math.round((this.fast[t]&&e.animal?e.animal.run:e.speed)*Et/10)}moveUnits(){const t=this.size;for(let e=0;e<this.top;e++){if(!this.alive[e]||this.state[e]!==qe||this.kind[e]>=jt)continue;const i=this.x[e],s=this.z[e],r=this.speedOf(e);let a=this.slotX[e],o=this.slotZ[e];const l=this.path[e];if(l&&this.pathI[e]<l.length){const _=l[this.pathI[e]],P=_%t*Et+128,T=Math.floor(_/t)*Et+128;Math.abs(P-i)+Math.abs(T-s)<110&&this.pathI[e]<l.length-1&&this.pathI[e]++,(this.pathI[e]<l.length-1||Math.abs(P-i)+Math.abs(T-s)>=110)&&(a=P,o=T),this.pathI[e]===l.length-1&&Math.abs(P-i)+Math.abs(T-s)<110&&(this.path[e]=null,a=this.slotX[e],o=this.slotZ[e])}const c=this.slotX[e]-i,h=this.slotZ[e]-s,u=c*c+h*h;if(!this.path[e]&&u<=r*r){this.x[e]=this.slotX[e],this.z[e]=this.slotZ[e],this.state[e]=Se,this.field[e]=null;continue}const d=this.field[e];if(d&&!this.path[e]&&u>640*640){const _=i>>8,P=s>>8,T=P*t+_;let E=d.dist[T],w=-1,b=-1;for(let y=0;y<8;y++){const S=_+zr[y],L=P+Fr[y];if(S<0||L<0||S>=t||L>=t)continue;const U=L*t+S;this.blocked[U]||y>=4&&(this.blocked[P*t+S]||this.blocked[L*t+_])||d.dist[U]<E&&(E=d.dist[U],w=S,b=L)}w>=0&&(a=w*Et+128,o=b*Et+128)}const f=a-i,g=o-s,v=Yi(f*f+g*g);if(v===0){this.state[e]=Se;continue}const m=Math.min(r,v);let p=i+gi(f*m,v),M=s+gi(g*m,v);this.blockedAt(p,M)&&(this.blockedAt(p,s)?this.blockedAt(i,M)?(p=i,M=s):p=i:M=s),this.x[e]=p,this.z[e]=M;const x=Math.abs(c)+Math.abs(h);x+24<this.best[e]?(this.best[e]=x,this.stuck[e]=0):this.stuck[e]=Math.min(255,this.stuck[e]+1),(this.stuck[e]>30||this.stuck[e]>10&&x<3*Et&&!this.path[e])&&(this.state[e]=Se,this.field[e]=null,this.path[e]=null)}}buildHash(){const t=this.hs,e=this.hashHead,i=this.hashNext;e.fill(-1);for(let s=0;s<this.top;s++){if(!this.alive[s]||this.kind[s]>=jt)continue;const r=Math.min(t-1,Math.max(0,this.z[s]>>9))*t+Math.min(t-1,Math.max(0,this.x[s]>>9));i[s]=e[r],e[r]=s}}near(t,e,i,s){const r=this.hs,a=Math.max(0,(t>>9)-Math.ceil(i/2)),o=Math.min(r-1,(t>>9)+Math.ceil(i/2)),l=Math.max(0,(e>>9)-Math.ceil(i/2)),c=Math.min(r-1,(e>>9)+Math.ceil(i/2)),h=i*Et*(i*Et);for(let u=l;u<=c;u++)for(let d=a;d<=o;d++)for(let f=this.hashHead[u*r+d];f!==-1;f=this.hashNext[f]){const g=this.x[f]-t,v=this.z[f]-e;g*g+v*v<=h&&this.alive[f]&&s(f)}}separate(){const t=this.hs,e=this.hashHead,i=this.hashNext;this.buildHash();for(let s=0;s<this.top;s++)this.pushX[s]=0,this.pushZ[s]=0;for(let s=0;s<this.top;s++){if(!this.isUnit(s))continue;const r=Math.round(_t[this.kind[s]].radius*Et),a=this.x[s]>>9,o=this.z[s]>>9;for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++){const h=a+c,u=o+l;if(!(h<0||u<0||h>=t||u>=t))for(let d=e[u*t+h];d!==-1;d=i[d]){if(d<=s||!this.isUnit(d))continue;const f=Math.round(_t[this.kind[d]].radius*Et),g=r+f;let v=this.x[d]-this.x[s],m=this.z[d]-this.z[s];if(v>=g||v<=-g||m>=g||m<=-g)continue;let p=v*v+m*m;if(p>=g*g)continue;p===0&&(v=1+s%3,m=1+d%3,p=v*v+m*m);const M=Yi(p)||1,x=g-M>>1,_=gi(v*x,M),P=gi(m*x,M),T=this.state[s]===qe?1:2,E=this.state[d]===qe?1:2;this.pushX[s]-=gi(_*T,2),this.pushZ[s]-=gi(P*T,2),this.pushX[d]+=gi(_*E,2),this.pushZ[d]+=gi(P*E,2)}}}for(let s=0;s<this.top;s++){if(!this.pushX[s]&&!this.pushZ[s])continue;const r=this.x[s]+this.pushX[s],a=this.z[s]+this.pushZ[s];this.blockedAt(r,a)?this.blockedAt(r,this.z[s])?this.blockedAt(this.x[s],a)||(this.z[s]=a):this.x[s]=r:(this.x[s]=r,this.z[s]=a)}}updateFog(){const t=this.size;for(let e=0;e<this.players.length;e++){const i=this.vis[e],s=this.explored[e];i.fill(0);for(let r=0;r<this.top;r++){if(!this.alive[r]||this.owner[r]!==e||this.kind[r]===jt)continue;const a=this.kind[r]>=Zt?this.bdef(r).sight:_t[this.kind[r]].sight,o=Yf(a),l=this.x[r]>>8,c=this.z[r]>>8;for(let h=0;h<o.length;h+=2){const u=l+o[h],d=c+o[h+1];if(u<0||d<0||u>=t||d>=t)continue;const f=d*t+u;i[f]=1,s[f]=1}}}}get month(){return Math.floor(this.tick/Dn)%12}get season(){return Math.floor(this.month/3)}get year(){return Math.floor(this.tick/(Dn*12))+1}drain(){const t=this.events;return this.events=[],t}hash(){let t=2166136261;const e=i=>{for(let s=0;s<32;s+=8)t^=i>>>s&255,t=Math.imul(t,16777619)};e(this.tick);for(let i=0;i<this.top;i++)this.alive[i]&&(e(i),e(this.kind[i]),e(this.owner[i]),e(this.x[i]),e(this.z[i]),e(this.hp[i]),e(this.task[i]),e(this.carry[i]));for(const i of this.players)for(const s of Ki)e(i.res[s]);return t>>>0}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sc="170",Kf=0,Oc=1,jf=2,Bd=1,Hd=2,si=3,Pi=0,tn=1,oi=2,wi=0,ks=1,Bc=2,Hc=3,Gc=4,Zf=5,Xi=100,Jf=101,Qf=102,tp=103,ep=104,np=200,ip=201,sp=202,rp=203,el=204,nl=205,ap=206,op=207,lp=208,cp=209,hp=210,dp=211,up=212,fp=213,pp=214,il=0,sl=1,rl=2,Vs=3,al=4,ol=5,ll=6,cl=7,Xa=0,mp=1,gp=2,Ci=0,vp=1,xp=2,_p=3,Gd=4,Mp=5,yp=6,bp=7,Vd=300,Ws=301,qs=302,hl=303,dl=304,$a=306,ul=1e3,Ji=1001,fl=1002,gn=1003,Sp=1004,Or=1005,kn=1006,so=1007,Qi=1008,Kn=1009,Wd=1010,qd=1011,br=1012,rc=1013,is=1014,Vn=1015,Ir=1016,ac=1017,oc=1018,Xs=1020,Xd=35902,$d=1021,Yd=1022,Nn=1023,Kd=1024,jd=1025,Ns=1026,$s=1027,Ya=1028,lc=1029,Zd=1030,cc=1031,hc=1033,Sa=33776,Ea=33777,Ta=33778,Aa=33779,pl=35840,ml=35841,gl=35842,vl=35843,xl=36196,_l=37492,Ml=37496,yl=37808,bl=37809,Sl=37810,El=37811,Tl=37812,Al=37813,wl=37814,Cl=37815,Rl=37816,Pl=37817,Il=37818,Ll=37819,Dl=37820,Ul=37821,wa=36492,kl=36494,Nl=36495,Jd=36283,zl=36284,Fl=36285,Ol=36286,Ep=3200,Qd=3201,dc=0,Tp=1,Ai="",on="srgb",js="srgb-linear",Ka="linear",ue="srgb",hs=7680,Vc=519,Ap=512,wp=513,Cp=514,tu=515,Rp=516,Pp=517,Ip=518,Lp=519,Wc=35044,mn=35048,qc="300 es",ci=2e3,Na=2001;class Zs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ro=Math.PI/180,Bl=180/Math.PI;function Lr(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return($e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]).toLowerCase()}function cn(n,t,e){return Math.max(t,Math.min(e,n))}function Dp(n,t){return(n%t+t)%t}function ao(n,t,e){return(1-e)*n+e*t}function rr(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function rn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Jt{constructor(t=0,e=0){Jt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(cn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,i,s,r,a,o,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],M=s[1],x=s[4],_=s[7],P=s[2],T=s[5],E=s[8];return r[0]=a*v+o*M+l*P,r[3]=a*m+o*x+l*T,r[6]=a*p+o*_+l*E,r[1]=c*v+h*M+u*P,r[4]=c*m+h*x+u*T,r[7]=c*p+h*_+u*E,r[2]=d*v+f*M+g*P,r[5]=d*m+f*x+g*T,r[8]=d*p+f*_+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=e*u+i*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=u*v,t[1]=(s*c-h*i)*v,t[2]=(o*i-s*a)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(i*l-c*e)*v,t[8]=(a*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(oo.makeScale(t,e)),this}rotate(t){return this.premultiply(oo.makeRotation(-t)),this}translate(t,e){return this.premultiply(oo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const oo=new Ht;function eu(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function za(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Up(){const n=za("canvas");return n.style.display="block",n}const Xc={};function gr(n){n in Xc||(Xc[n]=!0,console.warn(n))}function kp(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Np(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function zp(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ne={enabled:!0,workingColorSpace:js,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(n.r=di(n.r),n.g=di(n.g),n.b=di(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(n.r=zs(n.r),n.g=zs(n.g),n.b=zs(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ai?Ka:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const $c=[.64,.33,.3,.6,.15,.06],Yc=[.2126,.7152,.0722],Kc=[.3127,.329],jc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ne.define({[js]:{primaries:$c,whitePoint:Kc,transfer:Ka,toXYZ:jc,fromXYZ:Zc,luminanceCoefficients:Yc,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:$c,whitePoint:Kc,transfer:ue,toXYZ:jc,fromXYZ:Zc,luminanceCoefficients:Yc,outputColorSpaceConfig:{drawingBufferColorSpace:on}}});let ds;class Fp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ds===void 0&&(ds=za("canvas")),ds.width=t.width,ds.height=t.height;const i=ds.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=ds}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=za("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(di(e[i]/255)*255):e[i]=di(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Op=0;class nu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Op++}),this.uuid=Lr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(lo(s[a].image)):r.push(lo(s[a]))}else r=lo(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function lo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bp=0;class en extends Zs{constructor(t=en.DEFAULT_IMAGE,e=en.DEFAULT_MAPPING,i=Ji,s=Ji,r=kn,a=Qi,o=Nn,l=Kn,c=en.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bp++}),this.uuid=Lr(),this.name="",this.source=new nu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Jt(0,0),this.repeat=new Jt(1,1),this.center=new Jt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ul:t.x=t.x-Math.floor(t.x);break;case Ji:t.x=t.x<0?0:1;break;case fl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ul:t.y=t.y-Math.floor(t.y);break;case Ji:t.y=t.y<0?0:1;break;case fl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Vd;en.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,i=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,P=(p+1)/2,T=(h+d)/4,E=(u+v)/4,w=(g+m)/4;return x>_&&x>P?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=T/i,r=E/i):_>P?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=T/s,r=w/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=E/r,s=w/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-v)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hp extends Zs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new en(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new nu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends Hp{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class iu extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gp extends en{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ii{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(u!==v||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*v,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),T=Math.atan2(P,p*M);m=Math.sin(m*T)/P,o=Math.sin(o*T)/P}const _=o*M;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+v*_,m===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=P,c*=P,h*=P,u*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-o*f,t[e+2]=c*g+h*f+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(cn(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return co.copy(this).projectOnVector(t),this.sub(co)}reflect(t){return this.sub(co.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(cn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const co=new O,Jc=new Ii;class as{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Cn):Cn.fromBufferAttribute(r,a),Cn.applyMatrix4(t.matrixWorld),this.expandByPoint(Cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Br.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Br.copy(i.boundingBox)),Br.applyMatrix4(t.matrixWorld),this.union(Br)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Cn),Cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ar),Hr.subVectors(this.max,ar),us.subVectors(t.a,ar),fs.subVectors(t.b,ar),ps.subVectors(t.c,ar),xi.subVectors(fs,us),_i.subVectors(ps,fs),Ui.subVectors(us,ps);let e=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Ui.z,Ui.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Ui.z,0,-Ui.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Ui.y,Ui.x,0];return!ho(e,us,fs,ps,Hr)||(e=[1,0,0,0,1,0,0,0,1],!ho(e,us,fs,ps,Hr))?!1:(Gr.crossVectors(xi,_i),e=[Gr.x,Gr.y,Gr.z],ho(e,us,fs,ps,Hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Jn=[new O,new O,new O,new O,new O,new O,new O,new O],Cn=new O,Br=new as,us=new O,fs=new O,ps=new O,xi=new O,_i=new O,Ui=new O,ar=new O,Hr=new O,Gr=new O,ki=new O;function ho(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ki.fromArray(n,r);const o=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=t.dot(ki),c=e.dot(ki),h=i.dot(ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Vp=new as,or=new O,uo=new O;class Js{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Vp.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;or.subVectors(t,this.center);const e=or.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(or,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(or.copy(t.center).add(uo)),this.expandByPoint(or.copy(t.center).sub(uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new O,fo=new O,Vr=new O,Mi=new O,po=new O,Wr=new O,mo=new O;class ja{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){fo.copy(t).add(e).multiplyScalar(.5),Vr.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(fo);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Vr),o=Mi.dot(this.direction),l=-Mi.dot(Vr),c=Mi.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const v=1/h;u*=v,d*=v,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(fo).addScaledVector(Vr,d),f}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const i=Qn.dot(this.direction),s=Qn.dot(Qn)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,i,s,r){po.subVectors(e,t),Wr.subVectors(i,t),mo.crossVectors(po,Wr);let a=this.direction.dot(mo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mi.subVectors(this.origin,t);const l=o*this.direction.dot(Wr.crossVectors(Mi,Wr));if(l<0)return null;const c=o*this.direction.dot(po.cross(Mi));if(c<0||l+c>a)return null;const h=-o*Mi.dot(mo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qt{constructor(t,e,i,s,r,a,o,l,c,h,u,d,f,g,v,m){qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,d,f,g,v,m)}set(t,e,i,s,r,a,o,l,c,h,u,d,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/ms.setFromMatrixColumn(t,0).length(),r=1/ms.setFromMatrixColumn(t,1).length(),a=1/ms.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-v*c,e[9]=-o*l,e[2]=v-d*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d+v*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=v+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,v=c*u;e[0]=d-v*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=v-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,v=o*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=v-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-v*u}else if(t.order==="XZY"){const d=a*l,f=a*c,g=o*l,v=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wp,t,qp)}lookAt(t,e,i){const s=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),yi.crossVectors(i,un),yi.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),yi.crossVectors(i,un)),yi.normalize(),qr.crossVectors(un,yi),s[0]=yi.x,s[4]=qr.x,s[8]=un.x,s[1]=yi.y,s[5]=qr.y,s[9]=un.y,s[2]=yi.z,s[6]=qr.z,s[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],M=i[3],x=i[7],_=i[11],P=i[15],T=s[0],E=s[4],w=s[8],b=s[12],y=s[1],S=s[5],L=s[9],U=s[13],D=s[2],B=s[6],V=s[10],j=s[14],z=s[3],F=s[7],H=s[11],Y=s[15];return r[0]=a*T+o*y+l*D+c*z,r[4]=a*E+o*S+l*B+c*F,r[8]=a*w+o*L+l*V+c*H,r[12]=a*b+o*U+l*j+c*Y,r[1]=h*T+u*y+d*D+f*z,r[5]=h*E+u*S+d*B+f*F,r[9]=h*w+u*L+d*V+f*H,r[13]=h*b+u*U+d*j+f*Y,r[2]=g*T+v*y+m*D+p*z,r[6]=g*E+v*S+m*B+p*F,r[10]=g*w+v*L+m*V+p*H,r[14]=g*b+v*U+m*j+p*Y,r[3]=M*T+x*y+_*D+P*z,r[7]=M*E+x*S+_*B+P*F,r[11]=M*w+x*L+_*V+P*H,r[15]=M*b+x*U+_*j+P*Y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*l*u-s*c*u-r*o*d+i*c*d+s*o*f-i*l*f)+v*(+e*l*f-e*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+m*(+e*c*u-e*o*f-r*a*u+i*a*f+r*o*h-i*c*h)+p*(-s*o*h-e*l*u+e*o*d+s*a*u-i*a*d+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],M=u*m*c-v*d*c+v*l*f-o*m*f-u*l*p+o*d*p,x=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,_=h*v*c-g*u*c+g*o*f-a*v*f-h*o*p+a*u*p,P=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,T=e*M+i*x+s*_+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=M*E,t[1]=(v*d*r-u*m*r-v*s*f+i*m*f+u*s*p-i*d*p)*E,t[2]=(o*m*r-v*l*r+v*s*c-i*m*c-o*s*p+i*l*p)*E,t[3]=(u*l*r-o*d*r-u*s*c+i*d*c+o*s*f-i*l*f)*E,t[4]=x*E,t[5]=(h*m*r-g*d*r+g*s*f-e*m*f-h*s*p+e*d*p)*E,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*p-e*l*p)*E,t[7]=(a*d*r-h*l*r+h*s*c-e*d*c-a*s*f+e*l*f)*E,t[8]=_*E,t[9]=(g*u*r-h*v*r-g*i*f+e*v*f+h*i*p-e*u*p)*E,t[10]=(a*v*r-g*o*r+g*i*c-e*v*c-a*i*p+e*o*p)*E,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*f-e*o*f)*E,t[12]=P*E,t[13]=(h*v*s-g*u*s+g*i*d-e*v*d-h*i*m+e*u*m)*E,t[14]=(g*o*s-a*v*s-g*i*l+e*v*l+a*i*m-e*o*m)*E,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*d+e*o*d)*E,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,v=a*h,m=a*u,p=o*u,M=l*c,x=l*h,_=l*u,P=i.x,T=i.y,E=i.z;return s[0]=(1-(v+p))*P,s[1]=(f+_)*P,s[2]=(g-x)*P,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(d+p))*T,s[6]=(m+M)*T,s[7]=0,s[8]=(g+x)*E,s[9]=(m-M)*E,s[10]=(1-(d+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=ms.set(s[0],s[1],s[2]).length();const a=ms.set(s[4],s[5],s[6]).length(),o=ms.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Rn.copy(this);const c=1/r,h=1/a,u=1/o;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,e.setFromRotationMatrix(Rn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=ci){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let f,g;if(o===ci)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Na)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=ci){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),d=(e+t)*c,f=(i+s)*h;let g,v;if(o===ci)g=(a+r)*u,v=-2*u;else if(o===Na)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const ms=new O,Rn=new qt,Wp=new O(0,0,0),qp=new O(1,1,1),yi=new O,qr=new O,un=new O,Qc=new qt,th=new Ii;class vn{constructor(t=0,e=0,i=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(cn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-cn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(cn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-cn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Qc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return th.setFromEuler(this),this.setFromQuaternion(th,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class su{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Xp=0;const eh=new O,gs=new Ii,ti=new qt,Xr=new O,lr=new O,$p=new O,Yp=new Ii,nh=new O(1,0,0),ih=new O(0,1,0),sh=new O(0,0,1),rh={type:"added"},Kp={type:"removed"},vs={type:"childadded",child:null},go={type:"childremoved",child:null};class Ve extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new O,e=new vn,i=new Ii,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new Ht}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new su,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return gs.setFromAxisAngle(t,e),this.quaternion.multiply(gs),this}rotateOnWorldAxis(t,e){return gs.setFromAxisAngle(t,e),this.quaternion.premultiply(gs),this}rotateX(t){return this.rotateOnAxis(nh,t)}rotateY(t){return this.rotateOnAxis(ih,t)}rotateZ(t){return this.rotateOnAxis(sh,t)}translateOnAxis(t,e){return eh.copy(t).applyQuaternion(this.quaternion),this.position.add(eh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(nh,t)}translateY(t){return this.translateOnAxis(ih,t)}translateZ(t){return this.translateOnAxis(sh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Xr.copy(t):Xr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(lr,Xr,this.up):ti.lookAt(Xr,lr,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),gs.setFromRotationMatrix(ti),this.quaternion.premultiply(gs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rh),vs.child=t,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kp),go.child=t,this.dispatchEvent(go),go.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rh),vs.child=t,this.dispatchEvent(vs),vs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,t,$p),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lr,Yp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ve.DEFAULT_UP=new O(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new O,ei=new O,vo=new O,ni=new O,xs=new O,_s=new O,ah=new O,xo=new O,_o=new O,Mo=new O,yo=new Ie,bo=new Ie,So=new Ie;class Un{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Pn.subVectors(t,e),s.cross(Pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Pn.subVectors(s,e),ei.subVectors(i,e),vo.subVectors(t,e);const a=Pn.dot(Pn),o=Pn.dot(ei),l=Pn.dot(vo),c=ei.dot(ei),h=ei.dot(vo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ni.x),l.addScaledVector(a,ni.y),l.addScaledVector(o,ni.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return yo.setScalar(0),bo.setScalar(0),So.setScalar(0),yo.fromBufferAttribute(t,e),bo.fromBufferAttribute(t,i),So.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(yo,r.x),a.addScaledVector(bo,r.y),a.addScaledVector(So,r.z),a}static isFrontFacing(t,e,i,s){return Pn.subVectors(i,e),ei.subVectors(t,e),Pn.cross(ei).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Pn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Pn.cross(ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Un.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;xs.subVectors(s,i),_s.subVectors(r,i),xo.subVectors(t,i);const l=xs.dot(xo),c=_s.dot(xo);if(l<=0&&c<=0)return e.copy(i);_o.subVectors(t,s);const h=xs.dot(_o),u=_s.dot(_o);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(xs,a);Mo.subVectors(t,r);const f=xs.dot(Mo),g=_s.dot(Mo);if(g>=0&&f<=g)return e.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(_s,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ah.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(ah,o);const p=1/(m+v+d);return a=v*p,o=d*p,e.copy(i).addScaledVector(xs,a).addScaledVector(_s,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},$r={h:0,s:0,l:0};function Eo(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Pt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=on){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=i,ne.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ne.workingColorSpace){if(t=Dp(t,1),e=cn(e,0,1),i=cn(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=Eo(a,r,t+1/3),this.g=Eo(a,r,t),this.b=Eo(a,r,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,e=on){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=on){const i=ru[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}copyLinearToSRGB(t){return this.r=zs(t.r),this.g=zs(t.g),this.b=zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=on){return ne.fromWorkingColorSpace(Ye.copy(this),t),Math.round(cn(Ye.r*255,0,255))*65536+Math.round(cn(Ye.g*255,0,255))*256+Math.round(cn(Ye.b*255,0,255))}getHexString(t=on){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Ye.copy(this),e);const i=Ye.r,s=Ye.g,r=Ye.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=on){ne.fromWorkingColorSpace(Ye.copy(this),t);const e=Ye.r,i=Ye.g,s=Ye.b;return t!==on?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(bi),this.setHSL(bi.h+t,bi.s+e,bi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(bi),t.getHSL($r);const i=ao(bi.h,$r.h,e),s=ao(bi.s,$r.s,e),r=ao(bi.l,$r.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new Pt;Pt.NAMES=ru;let jp=0;class os extends Zs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=Lr(),this.name="",this.blending=ks,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=nl,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Vc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hs,this.stencilZFail=hs,this.stencilZPass=hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==Pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==el&&(i.blendSrc=this.blendSrc),this.blendDst!==nl&&(i.blendDst=this.blendDst),this.blendEquation!==Xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Vc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==hs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==hs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ui extends os{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Xa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new O,Yr=new Jt;class Le{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Wc,this.updateRanges=[],this.gpuType=Vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Yr.fromBufferAttribute(this,e),Yr.applyMatrix3(t),this.setXY(e,Yr.x,Yr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=rr(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=rn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=rr(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=rr(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=rr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=rr(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),i=rn(i,this.array),s=rn(s,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Wc&&(t.usage=this.usage),t}}class au extends Le{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class ou extends Le{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class de extends Le{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Zp=0;const _n=new qt,To=new Ve,Ms=new O,fn=new as,cr=new as,He=new O;class De extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=Lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eu(t)?ou:au)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,i){return _n.makeTranslation(t,e,i),this.applyMatrix4(_n),this}scale(t,e,i){return _n.makeScale(t,e,i),this.applyMatrix4(_n),this}lookAt(t){return To.lookAt(t),To.updateMatrix(),this.applyMatrix4(To.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new de(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new as);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(He.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(He),He.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(He)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Js);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];cr.setFromBufferAttribute(o),this.morphTargetsRelative?(He.addVectors(fn.min,cr.min),fn.expandByPoint(He),He.addVectors(fn.max,cr.max),fn.expandByPoint(He)):(fn.expandByPoint(cr.min),fn.expandByPoint(cr.max))}fn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)He.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(He));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)He.fromBufferAttribute(o,c),l&&(Ms.fromBufferAttribute(t,c),He.add(Ms)),s=Math.max(s,i.distanceToSquared(He))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Le(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let w=0;w<i.count;w++)o[w]=new O,l[w]=new O;const c=new O,h=new O,u=new O,d=new Jt,f=new Jt,g=new Jt,v=new O,m=new O;function p(w,b,y){c.fromBufferAttribute(i,w),h.fromBufferAttribute(i,b),u.fromBufferAttribute(i,y),d.fromBufferAttribute(r,w),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const S=1/(f.x*g.y-g.x*f.y);isFinite(S)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(S),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(S),o[w].add(v),o[b].add(v),o[y].add(v),l[w].add(m),l[b].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let w=0,b=M.length;w<b;++w){const y=M[w],S=y.start,L=y.count;for(let U=S,D=S+L;U<D;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const x=new O,_=new O,P=new O,T=new O;function E(w){P.fromBufferAttribute(s,w),T.copy(P);const b=o[w];x.copy(b),x.sub(P.multiplyScalar(P.dot(b))).normalize(),_.crossVectors(T,b);const S=_.dot(l[w])<0?-1:1;a.setXYZW(w,x.x,x.y,x.z,S)}for(let w=0,b=M.length;w<b;++w){const y=M[w],S=y.start,L=y.count;for(let U=S,D=S+L;U<D;U+=3)E(t.getX(U+0)),E(t.getX(U+1)),E(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Le(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)He.fromBufferAttribute(t,e),He.normalize(),t.setXYZ(e,He.x,He.y,He.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Le(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const oh=new qt,Ni=new ja,Kr=new Js,lh=new O,jr=new O,Zr=new O,Jr=new O,Ao=new O,Qr=new O,ch=new O,ta=new O;class Ne extends Ve{constructor(t=new De,e=new ui){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Qr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ao.fromBufferAttribute(u,t),a?Qr.addScaledVector(Ao,h):Qr.addScaledVector(Ao.sub(e),h))}e.add(Qr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(Kr.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Kr,lh)===null||Ni.origin.distanceToSquared(lh)>(t.far-t.near)**2))&&(oh.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(oh),!(i.boundingBox!==null&&Ni.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){const T=o.getX(_),E=o.getX(_+1),w=o.getX(_+2);s=ea(this,p,t,i,c,h,u,T,E,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=o.getX(m),x=o.getX(m+1),_=o.getX(m+2);s=ea(this,a,t,i,c,h,u,M,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){const T=_,E=_+1,w=_+2;s=ea(this,p,t,i,c,h,u,T,E,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const M=m,x=m+1,_=m+2;s=ea(this,a,t,i,c,h,u,M,x,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Jp(n,t,e,i,s,r,a,o){let l;if(t.side===tn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Pi,o),l===null)return null;ta.copy(o),ta.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ta);return c<e.near||c>e.far?null:{distance:c,point:ta.clone(),object:n}}function ea(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,jr),n.getVertexPosition(l,Zr),n.getVertexPosition(c,Jr);const h=Jp(n,t,e,i,jr,Zr,Jr,ch);if(h){const u=new O;Un.getBarycoord(ch,jr,Zr,Jr,u),s&&(h.uv=Un.getInterpolatedAttribute(s,o,l,c,u,new Jt)),r&&(h.uv1=Un.getInterpolatedAttribute(r,o,l,c,u,new Jt)),a&&(h.normal=Un.getInterpolatedAttribute(a,o,l,c,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new O,materialIndex:0};Un.getNormal(jr,Zr,Jr,d.normal),h.face=d,h.barycoord=u}return h}class Fe extends De{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new de(c,3)),this.setAttribute("normal",new de(h,3)),this.setAttribute("uv",new de(u,2));function g(v,m,p,M,x,_,P,T,E,w,b){const y=_/E,S=P/w,L=_/2,U=P/2,D=T/2,B=E+1,V=w+1;let j=0,z=0;const F=new O;for(let H=0;H<V;H++){const Y=H*S-U;for(let Q=0;Q<B;Q++){const et=Q*y-L;F[v]=et*M,F[m]=Y*x,F[p]=D,c.push(F.x,F.y,F.z),F[v]=0,F[m]=0,F[p]=T>0?1:-1,h.push(F.x,F.y,F.z),u.push(Q/E),u.push(1-H/w),j+=1}}for(let H=0;H<w;H++)for(let Y=0;Y<E;Y++){const Q=d+Y+B*H,et=d+Y+B*(H+1),N=d+(Y+1)+B*(H+1),tt=d+(Y+1)+B*H;l.push(Q,et,tt),l.push(et,N,tt),z+=6}o.addGroup(f,z,b),f+=z,d+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ys(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Qe(n){const t={};for(let e=0;e<n.length;e++){const i=Ys(n[e]);for(const s in i)t[s]=i[s]}return t}function Qp(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function lu(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const t0={clone:Ys,merge:Qe};var e0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Fn extends os{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e0,this.fragmentShader=n0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ys(t.uniforms),this.uniformsGroups=Qp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class cu extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new O,hh=new Jt,dh=new Jt;class bn extends cu{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Bl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ro*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Bl*2*Math.atan(Math.tan(ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Si.x,Si.y).multiplyScalar(-t/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Si.x,Si.y).multiplyScalar(-t/Si.z)}getViewSize(t,e){return this.getViewBounds(t,hh,dh),e.subVectors(dh,hh)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ro*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ys=-90,bs=1;class i0 extends Ve{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new bn(ys,bs,t,e);s.layers=this.layers,this.add(s);const r=new bn(ys,bs,t,e);r.layers=this.layers,this.add(r);const a=new bn(ys,bs,t,e);a.layers=this.layers,this.add(a);const o=new bn(ys,bs,t,e);o.layers=this.layers,this.add(o);const l=new bn(ys,bs,t,e);l.layers=this.layers,this.add(l);const c=new bn(ys,bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Na)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class hu extends en{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ws,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class s0 extends ss{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new hu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:kn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Fe(5,5,5),r=new Fn({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:tn,blending:wi});r.uniforms.tEquirect.value=e;const a=new Ne(s,r),o=e.minFilter;return e.minFilter===Qi&&(e.minFilter=kn),new i0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const wo=new O,r0=new O,a0=new Ht;class Vi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=wo.subVectors(i,e).cross(r0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(wo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||a0.getNormalMatrix(t),s=this.coplanarPoint(wo).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Js,na=new O;class uc{constructor(t=new Vi,e=new Vi,i=new Vi,s=new Vi,r=new Vi,a=new Vi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ci){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],v=s[10],m=s[11],p=s[12],M=s[13],x=s[14],_=s[15];if(i[0].setComponents(l-r,d-c,m-f,_-p).normalize(),i[1].setComponents(l+r,d+c,m+f,_+p).normalize(),i[2].setComponents(l+a,d+h,m+g,_+M).normalize(),i[3].setComponents(l-a,d-h,m-g,_-M).normalize(),i[4].setComponents(l-o,d-u,m-v,_-x).normalize(),e===ci)i[5].setComponents(l+o,d+u,m+v,_+x).normalize();else if(e===Na)i[5].setComponents(o,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(t){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(na.x=s.normal.x>0?t.max.x:t.min.x,na.y=s.normal.y>0?t.max.y:t.min.y,na.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(na)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function du(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function o0(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Li extends De{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const M=p*d-a;for(let x=0;x<c;x++){const _=x*u-r;g.push(_,-M,0),v.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const x=M+c*p,_=M+c*(p+1),P=M+1+c*(p+1),T=M+1+c*p;f.push(x,_,T),f.push(_,P,T)}this.setIndex(f),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(v,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.width,t.height,t.widthSegments,t.heightSegments)}}var l0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,h0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,d0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,u0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,f0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,m0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,v0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,x0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,M0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,y0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,b0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,E0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,A0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,C0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,R0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,P0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,I0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,L0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,D0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,U0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,k0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,N0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,F0="gl_FragColor = linearToOutputTexel( gl_FragColor );",O0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,B0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,H0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,G0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,V0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,W0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,q0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,K0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,j0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Z0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,tm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,em=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,am=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,om=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_m=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ym=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Em=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Tm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Am=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Pm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Im=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Um=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,km=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Xm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$m=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ym=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Km=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ng=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const og=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ug=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,pg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,mg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_g=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,bg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ag=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Rg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ig=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Lg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Og=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Bg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:l0,alphahash_pars_fragment:c0,alphamap_fragment:h0,alphamap_pars_fragment:d0,alphatest_fragment:u0,alphatest_pars_fragment:f0,aomap_fragment:p0,aomap_pars_fragment:m0,batching_pars_vertex:g0,batching_vertex:v0,begin_vertex:x0,beginnormal_vertex:_0,bsdfs:M0,iridescence_fragment:y0,bumpmap_pars_fragment:b0,clipping_planes_fragment:S0,clipping_planes_pars_fragment:E0,clipping_planes_pars_vertex:T0,clipping_planes_vertex:A0,color_fragment:w0,color_pars_fragment:C0,color_pars_vertex:R0,color_vertex:P0,common:I0,cube_uv_reflection_fragment:L0,defaultnormal_vertex:D0,displacementmap_pars_vertex:U0,displacementmap_vertex:k0,emissivemap_fragment:N0,emissivemap_pars_fragment:z0,colorspace_fragment:F0,colorspace_pars_fragment:O0,envmap_fragment:B0,envmap_common_pars_fragment:H0,envmap_pars_fragment:G0,envmap_pars_vertex:V0,envmap_physical_pars_fragment:tm,envmap_vertex:W0,fog_vertex:q0,fog_pars_vertex:X0,fog_fragment:$0,fog_pars_fragment:Y0,gradientmap_pars_fragment:K0,lightmap_pars_fragment:j0,lights_lambert_fragment:Z0,lights_lambert_pars_fragment:J0,lights_pars_begin:Q0,lights_toon_fragment:em,lights_toon_pars_fragment:nm,lights_phong_fragment:im,lights_phong_pars_fragment:sm,lights_physical_fragment:rm,lights_physical_pars_fragment:am,lights_fragment_begin:om,lights_fragment_maps:lm,lights_fragment_end:cm,logdepthbuf_fragment:hm,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:um,logdepthbuf_vertex:fm,map_fragment:pm,map_pars_fragment:mm,map_particle_fragment:gm,map_particle_pars_fragment:vm,metalnessmap_fragment:xm,metalnessmap_pars_fragment:_m,morphinstance_vertex:Mm,morphcolor_vertex:ym,morphnormal_vertex:bm,morphtarget_pars_vertex:Sm,morphtarget_vertex:Em,normal_fragment_begin:Tm,normal_fragment_maps:Am,normal_pars_fragment:wm,normal_pars_vertex:Cm,normal_vertex:Rm,normalmap_pars_fragment:Pm,clearcoat_normal_fragment_begin:Im,clearcoat_normal_fragment_maps:Lm,clearcoat_pars_fragment:Dm,iridescence_pars_fragment:Um,opaque_fragment:km,packing:Nm,premultiplied_alpha_fragment:zm,project_vertex:Fm,dithering_fragment:Om,dithering_pars_fragment:Bm,roughnessmap_fragment:Hm,roughnessmap_pars_fragment:Gm,shadowmap_pars_fragment:Vm,shadowmap_pars_vertex:Wm,shadowmap_vertex:qm,shadowmask_pars_fragment:Xm,skinbase_vertex:$m,skinning_pars_vertex:Ym,skinning_vertex:Km,skinnormal_vertex:jm,specularmap_fragment:Zm,specularmap_pars_fragment:Jm,tonemapping_fragment:Qm,tonemapping_pars_fragment:tg,transmission_fragment:eg,transmission_pars_fragment:ng,uv_pars_fragment:ig,uv_pars_vertex:sg,uv_vertex:rg,worldpos_vertex:ag,background_vert:og,background_frag:lg,backgroundCube_vert:cg,backgroundCube_frag:hg,cube_vert:dg,cube_frag:ug,depth_vert:fg,depth_frag:pg,distanceRGBA_vert:mg,distanceRGBA_frag:gg,equirect_vert:vg,equirect_frag:xg,linedashed_vert:_g,linedashed_frag:Mg,meshbasic_vert:yg,meshbasic_frag:bg,meshlambert_vert:Sg,meshlambert_frag:Eg,meshmatcap_vert:Tg,meshmatcap_frag:Ag,meshnormal_vert:wg,meshnormal_frag:Cg,meshphong_vert:Rg,meshphong_frag:Pg,meshphysical_vert:Ig,meshphysical_frag:Lg,meshtoon_vert:Dg,meshtoon_frag:Ug,points_vert:kg,points_frag:Ng,shadow_vert:zg,shadow_frag:Fg,sprite_vert:Og,sprite_frag:Bg},ut={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Jt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new Jt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Gn={basic:{uniforms:Qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Qe([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Qe([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Qe([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Qe([ut.points,ut.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Qe([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Qe([ut.common,ut.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Qe([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Qe([ut.sprite,ut.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Qe([ut.common,ut.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Qe([ut.lights,ut.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Gn.physical={uniforms:Qe([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Jt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Jt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Jt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const ia={r:0,b:0,g:0},Fi=new vn,Hg=new qt;function Gg(n,t,e,i,s,r,a){const o=new Pt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function v(M){let x=!1;const _=g(M);_===null?p(o,l):_&&_.isColor&&(p(_,1),x=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(M,x){const _=g(x);_&&(_.isCubeTexture||_.mapping===$a)?(h===void 0&&(h=new Ne(new Fe(1,1,1),new Fn({name:"BackgroundCubeMaterial",uniforms:Ys(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Fi.copy(x.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Hg.makeRotationFromEuler(Fi)),h.material.toneMapped=ne.getTransfer(_.colorSpace)!==ue,(u!==_||d!==_.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ne(new Li(2,2),new Fn({name:"BackgroundMaterial",uniforms:Ys(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ne.getTransfer(_.colorSpace)!==ue,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(ia,lu(n)),i.buffers.color.setClear(ia.r,ia.g,ia.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:v,addToRenderList:m}}function Vg(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(y,S,L,U,D){let B=!1;const V=u(U,L,S);r!==V&&(r=V,c(r.object)),B=f(y,U,L,D),B&&g(y,U,L,D),D!==null&&t.update(D,n.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,_(y,S,L,U),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function h(y){return n.deleteVertexArray(y)}function u(y,S,L){const U=L.wireframe===!0;let D=i[y.id];D===void 0&&(D={},i[y.id]=D);let B=D[S.id];B===void 0&&(B={},D[S.id]=B);let V=B[U];return V===void 0&&(V=d(l()),B[U]=V),V}function d(y){const S=[],L=[],U=[];for(let D=0;D<e;D++)S[D]=0,L[D]=0,U[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:L,attributeDivisors:U,object:y,attributes:{},index:null}}function f(y,S,L,U){const D=r.attributes,B=S.attributes;let V=0;const j=L.getAttributes();for(const z in j)if(j[z].location>=0){const H=D[z];let Y=B[z];if(Y===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(Y=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(Y=y.instanceColor)),H===void 0||H.attribute!==Y||Y&&H.data!==Y.data)return!0;V++}return r.attributesNum!==V||r.index!==U}function g(y,S,L,U){const D={},B=S.attributes;let V=0;const j=L.getAttributes();for(const z in j)if(j[z].location>=0){let H=B[z];H===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(H=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(H=y.instanceColor));const Y={};Y.attribute=H,H&&H.data&&(Y.data=H.data),D[z]=Y,V++}r.attributes=D,r.attributesNum=V,r.index=U}function v(){const y=r.newAttributes;for(let S=0,L=y.length;S<L;S++)y[S]=0}function m(y){p(y,0)}function p(y,S){const L=r.newAttributes,U=r.enabledAttributes,D=r.attributeDivisors;L[y]=1,U[y]===0&&(n.enableVertexAttribArray(y),U[y]=1),D[y]!==S&&(n.vertexAttribDivisor(y,S),D[y]=S)}function M(){const y=r.newAttributes,S=r.enabledAttributes;for(let L=0,U=S.length;L<U;L++)S[L]!==y[L]&&(n.disableVertexAttribArray(L),S[L]=0)}function x(y,S,L,U,D,B,V){V===!0?n.vertexAttribIPointer(y,S,L,D,B):n.vertexAttribPointer(y,S,L,U,D,B)}function _(y,S,L,U){v();const D=U.attributes,B=L.getAttributes(),V=S.defaultAttributeValues;for(const j in B){const z=B[j];if(z.location>=0){let F=D[j];if(F===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(F=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(F=y.instanceColor)),F!==void 0){const H=F.normalized,Y=F.itemSize,Q=t.get(F);if(Q===void 0)continue;const et=Q.buffer,N=Q.type,tt=Q.bytesPerElement,ot=N===n.INT||N===n.UNSIGNED_INT||F.gpuType===rc;if(F.isInterleavedBufferAttribute){const it=F.data,dt=it.stride,xt=F.offset;if(it.isInstancedInterleavedBuffer){for(let It=0;It<z.locationSize;It++)p(z.location+It,it.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let It=0;It<z.locationSize;It++)m(z.location+It);n.bindBuffer(n.ARRAY_BUFFER,et);for(let It=0;It<z.locationSize;It++)x(z.location+It,Y/z.locationSize,N,H,dt*tt,(xt+Y/z.locationSize*It)*tt,ot)}else{if(F.isInstancedBufferAttribute){for(let it=0;it<z.locationSize;it++)p(z.location+it,F.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let it=0;it<z.locationSize;it++)m(z.location+it);n.bindBuffer(n.ARRAY_BUFFER,et);for(let it=0;it<z.locationSize;it++)x(z.location+it,Y/z.locationSize,N,H,Y*tt,Y/z.locationSize*it*tt,ot)}}else if(V!==void 0){const H=V[j];if(H!==void 0)switch(H.length){case 2:n.vertexAttrib2fv(z.location,H);break;case 3:n.vertexAttrib3fv(z.location,H);break;case 4:n.vertexAttrib4fv(z.location,H);break;default:n.vertexAttrib1fv(z.location,H)}}}}M()}function P(){w();for(const y in i){const S=i[y];for(const L in S){const U=S[L];for(const D in U)h(U[D].object),delete U[D];delete S[L]}delete i[y]}}function T(y){if(i[y.id]===void 0)return;const S=i[y.id];for(const L in S){const U=S[L];for(const D in U)h(U[D].object),delete U[D];delete S[L]}delete i[y.id]}function E(y){for(const S in i){const L=i[S];if(L[y.id]===void 0)continue;const U=L[y.id];for(const D in U)h(U[D].object),delete U[D];delete L[y.id]}}function w(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Wg(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function qg(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==Nn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const w=E===Ir&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Kn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Vn&&!w)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:P,maxSamples:T}}function Xg(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Vi,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:i,x=M*4;let _=p.clippingState||null;l.value=_,_=h(g,d,x,f);for(let P=0;P!==x;++P)_[P]=e[P];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,_),m[_+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function $g(n){let t=new WeakMap;function e(a,o){return o===hl?a.mapping=Ws:o===dl&&(a.mapping=qs),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===hl||o===dl)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new s0(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class uu extends cu{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ps=4,uh=[.125,.215,.35,.446,.526,.582],$i=20,Co=new uu,fh=new Pt;let Ro=null,Po=0,Io=0,Lo=!1;const Wi=(1+Math.sqrt(5))/2,Ss=1/Wi,ph=[new O(-Wi,Ss,0),new O(Wi,Ss,0),new O(-Ss,0,Wi),new O(Ss,0,Wi),new O(0,Wi,-Ss),new O(0,Wi,Ss),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class mh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Ro=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ro,Po,Io),this._renderer.xr.enabled=Lo,t.scissorTest=!1,sa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ws||t.mapping===qs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ro=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:Ir,format:Nn,colorSpace:js,depthBuffer:!1},s=gh(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gh(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Yg(r)),this._blurMaterial=Kg(r,t,e)}return s}_compileMaterial(t){const e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,Co)}_sceneToCubeUV(t,e,i,s){const o=new bn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(fh),h.toneMapping=Ci,h.autoClear=!1;const f=new ui({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1}),g=new Ne(new Fe,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(fh),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;sa(s,M*x,p>2?x:0,x,x),h.setRenderTarget(s),v&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ws||t.mapping===qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ne(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;sa(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Co)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ph[(s-r-1)%ph.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ne(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*$i-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):$i;m>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$i}`);const p=[];let M=0;for(let E=0;E<$i;++E){const w=E/v,b=Math.exp(-w*w/2);p.push(b),E===0?M+=b:E<m&&(M+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-i;const _=this._sizeLods[s],P=3*_*(s>x-Ps?s-x+Ps:0),T=4*(this._cubeSize-_);sa(e,P,T,3*_,2*_),l.setRenderTarget(e),l.render(u,Co)}}function Yg(n){const t=[],e=[],i=[];let s=n;const r=n-Ps+1+uh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Ps?l=uh[a-n+Ps-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,v=3,m=2,p=1,M=new Float32Array(v*g*f),x=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,w=T>2?0:-1,b=[E,w,0,E+2/3,w,0,E+2/3,w+1,0,E,w,0,E+2/3,w+1,0,E,w+1,0];M.set(b,v*g*T),x.set(d,m*g*T);const y=[T,T,T,T,T,T];_.set(y,p*g*T)}const P=new De;P.setAttribute("position",new Le(M,v)),P.setAttribute("uv",new Le(x,m)),P.setAttribute("faceIndex",new Le(_,p)),t.push(P),s>Ps&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function gh(n,t,e){const i=new ss(n,t,e);return i.texture.mapping=$a,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function sa(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Kg(n,t,e){const i=new Float32Array($i),s=new O(0,1,0);return new Fn({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function vh(){return new Fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function xh(){return new Fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function fc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jg(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===hl||l===dl,h=l===Ws||l===qs;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new mh(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new mh(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Zg(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&gr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Jg(n,t,e,i){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const v=d.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)t.update(d[g],n.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let x=0,_=M.length;x<_;x+=3){const P=M[x+0],T=M[x+1],E=M[x+2];d.push(P,T,T,E,E,P)}}else if(g!==void 0){const M=g.array;v=g.version;for(let x=0,_=M.length/3-1;x<_;x+=3){const P=x+0,T=x+1,E=x+2;d.push(P,T,T,E,E,P)}}else return;const m=new(eu(d)?ou:au)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Qg(n,t,e){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){n.drawElements(i,f,r,d*a),e.update(f,i,1)}function c(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,d*a,g),e.update(f,i,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function u(d,f,g,v){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,v,0,g);let p=0;for(let M=0;M<g;M++)p+=f[M]*v[M];e.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tv(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function ev(n,t,e){const i=new WeakMap,s=new Ie;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let y=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",y)};var f=y;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let P=o.attributes.position.count*_,T=1;P>t.maxTextureSize&&(T=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*T*4*u),w=new iu(E,P,T,u);w.type=Vn,w.needsUpdate=!0;const b=_*4;for(let S=0;S<u;S++){const L=p[S],U=M[S],D=x[S],B=P*T*4*S;for(let V=0;V<L.count;V++){const j=V*b;g===!0&&(s.fromBufferAttribute(L,V),E[B+j+0]=s.x,E[B+j+1]=s.y,E[B+j+2]=s.z,E[B+j+3]=0),v===!0&&(s.fromBufferAttribute(U,V),E[B+j+4]=s.x,E[B+j+5]=s.y,E[B+j+6]=s.z,E[B+j+7]=0),m===!0&&(s.fromBufferAttribute(D,V),E[B+j+8]=s.x,E[B+j+9]=s.y,E[B+j+10]=s.z,E[B+j+11]=D.itemSize===4?s.w:1)}}d={count:u,texture:w,size:new Jt(P,T)},i.set(o,d),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function nv(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class fu extends en{constructor(t,e,i,s,r,a,o,l,c,h=Ns){if(h!==Ns&&h!==$s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ns&&(i=is),i===void 0&&h===$s&&(i=Xs),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const pu=new en,_h=new fu(1,1),mu=new iu,gu=new Gp,vu=new hu,Mh=[],yh=[],bh=new Float32Array(16),Sh=new Float32Array(9),Eh=new Float32Array(4);function Qs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Mh[s];if(r===void 0&&(r=new Float32Array(s),Mh[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Oe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Za(n,t){let e=yh[t];e===void 0&&(e=new Int32Array(t),yh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function iv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function sv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;n.uniform2fv(this.addr,t),Be(e,t)}}function rv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Oe(e,t))return;n.uniform3fv(this.addr,t),Be(e,t)}}function av(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;n.uniform4fv(this.addr,t),Be(e,t)}}function ov(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Oe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,i))return;Eh.set(i),n.uniformMatrix2fv(this.addr,!1,Eh),Be(e,i)}}function lv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Oe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,i))return;Sh.set(i),n.uniformMatrix3fv(this.addr,!1,Sh),Be(e,i)}}function cv(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Oe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Oe(e,i))return;bh.set(i),n.uniformMatrix4fv(this.addr,!1,bh),Be(e,i)}}function hv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function dv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;n.uniform2iv(this.addr,t),Be(e,t)}}function uv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;n.uniform3iv(this.addr,t),Be(e,t)}}function fv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;n.uniform4iv(this.addr,t),Be(e,t)}}function pv(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function mv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Oe(e,t))return;n.uniform2uiv(this.addr,t),Be(e,t)}}function gv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Oe(e,t))return;n.uniform3uiv(this.addr,t),Be(e,t)}}function vv(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Oe(e,t))return;n.uniform4uiv(this.addr,t),Be(e,t)}}function xv(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(_h.compareFunction=tu,r=_h):r=pu,e.setTexture2D(t||r,s)}function _v(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||gu,s)}function Mv(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||vu,s)}function yv(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||mu,s)}function bv(n){switch(n){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return av;case 35674:return ov;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return hv;case 35667:case 35671:return dv;case 35668:case 35672:return uv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return vv;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return _v;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return yv}}function Sv(n,t){n.uniform1fv(this.addr,t)}function Ev(n,t){const e=Qs(t,this.size,2);n.uniform2fv(this.addr,e)}function Tv(n,t){const e=Qs(t,this.size,3);n.uniform3fv(this.addr,e)}function Av(n,t){const e=Qs(t,this.size,4);n.uniform4fv(this.addr,e)}function wv(n,t){const e=Qs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Cv(n,t){const e=Qs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Rv(n,t){const e=Qs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Pv(n,t){n.uniform1iv(this.addr,t)}function Iv(n,t){n.uniform2iv(this.addr,t)}function Lv(n,t){n.uniform3iv(this.addr,t)}function Dv(n,t){n.uniform4iv(this.addr,t)}function Uv(n,t){n.uniform1uiv(this.addr,t)}function kv(n,t){n.uniform2uiv(this.addr,t)}function Nv(n,t){n.uniform3uiv(this.addr,t)}function zv(n,t){n.uniform4uiv(this.addr,t)}function Fv(n,t,e){const i=this.cache,s=t.length,r=Za(e,s);Oe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||pu,r[a])}function Ov(n,t,e){const i=this.cache,s=t.length,r=Za(e,s);Oe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||gu,r[a])}function Bv(n,t,e){const i=this.cache,s=t.length,r=Za(e,s);Oe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||vu,r[a])}function Hv(n,t,e){const i=this.cache,s=t.length,r=Za(e,s);Oe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||mu,r[a])}function Gv(n){switch(n){case 5126:return Sv;case 35664:return Ev;case 35665:return Tv;case 35666:return Av;case 35674:return wv;case 35675:return Cv;case 35676:return Rv;case 5124:case 35670:return Pv;case 35667:case 35671:return Iv;case 35668:case 35672:return Lv;case 35669:case 35673:return Dv;case 5125:return Uv;case 36294:return kv;case 36295:return Nv;case 36296:return zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return Hv}}class Vv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=bv(e.type)}}class Wv{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gv(e.type)}}class qv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Do=/(\w+)(\])?(\[|\.)?/g;function Th(n,t){n.seq.push(t),n.map[t.id]=t}function Xv(n,t,e){const i=n.name,s=i.length;for(Do.lastIndex=0;;){const r=Do.exec(i),a=Do.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Th(e,c===void 0?new Vv(o,n,t):new Wv(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new qv(o),Th(e,u)),e=u}}}class Ca{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Xv(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Ah(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const $v=37297;let Yv=0;function Kv(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const wh=new Ht;function jv(n){ne._getMatrix(wh,ne.workingColorSpace,n);const t=`mat3( ${wh.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(n)){case Ka:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ch(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Kv(n.getShaderSource(t),a)}else return s}function Zv(n,t){const e=jv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Jv(n,t){let e;switch(t){case vp:e="Linear";break;case xp:e="Reinhard";break;case _p:e="Cineon";break;case Gd:e="ACESFilmic";break;case yp:e="AgX";break;case bp:e="Neutral";break;case Mp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ra=new O;function Qv(){ne.getLuminanceCoefficients(ra);const n=ra.x.toFixed(4),t=ra.y.toFixed(4),e=ra.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vr).join(`
`)}function e1(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function n1(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function vr(n){return n!==""}function Rh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ph(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const i1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Hl(n){return n.replace(i1,r1)}const s1=new Map;function r1(n,t){let e=Wt[t];if(e===void 0){const i=s1.get(t);if(i!==void 0)e=Wt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Hl(e)}const a1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ih(n){return n.replace(a1,o1)}function o1(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Lh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function l1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Bd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Hd?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===si&&(t="SHADOWMAP_TYPE_VSM"),t}function c1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ws:case qs:t="ENVMAP_TYPE_CUBE";break;case $a:t="ENVMAP_TYPE_CUBE_UV";break}return t}function h1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case qs:t="ENVMAP_MODE_REFRACTION";break}return t}function d1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Xa:t="ENVMAP_BLENDING_MULTIPLY";break;case mp:t="ENVMAP_BLENDING_MIX";break;case gp:t="ENVMAP_BLENDING_ADD";break}return t}function u1(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function f1(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=l1(e),c=c1(e),h=h1(e),u=d1(e),d=u1(e),f=t1(e),g=e1(r),v=s.createProgram();let m,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vr).join(`
`),p.length>0&&(p+=`
`)):(m=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vr).join(`
`),p=[Lh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ci?"#define TONE_MAPPING":"",e.toneMapping!==Ci?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Ci?Jv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Zv("linearToOutputTexel",e.outputColorSpace),Qv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vr).join(`
`)),a=Hl(a),a=Rh(a,e),a=Ph(a,e),o=Hl(o),o=Rh(o,e),o=Ph(o,e),a=Ih(a),o=Ih(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=M+m+a,_=M+p+o,P=Ah(s,s.VERTEX_SHADER,x),T=Ah(s,s.FRAGMENT_SHADER,_);s.attachShader(v,P),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(S){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(P).trim(),D=s.getShaderInfoLog(T).trim();let B=!0,V=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,P,T);else{const j=Ch(s,P,"vertex"),z=Ch(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+L+`
`+j+`
`+z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(U===""||D==="")&&(V=!1);V&&(S.diagnostics={runnable:B,programLog:L,vertexShader:{log:U,prefix:m},fragmentShader:{log:D,prefix:p}})}s.deleteShader(P),s.deleteShader(T),w=new Ca(s,v),b=n1(s,v)}let w;this.getUniforms=function(){return w===void 0&&E(this),w};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,$v)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=T,this}let p1=0;class m1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new g1(t),e.set(t,i)),i}}class g1{constructor(t){this.id=p1++,this.code=t,this.usedTimes=0}}function v1(n,t,e,i,s,r,a){const o=new su,l=new m1,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,y,S,L,U){const D=L.fog,B=U.geometry,V=b.isMeshStandardMaterial?L.environment:null,j=(b.isMeshStandardMaterial?e:t).get(b.envMap||V),z=j&&j.mapping===$a?j.image.height:null,F=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const H=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Y=H!==void 0?H.length:0;let Q=0;B.morphAttributes.position!==void 0&&(Q=1),B.morphAttributes.normal!==void 0&&(Q=2),B.morphAttributes.color!==void 0&&(Q=3);let et,N,tt,ot;if(F){const he=Gn[F];et=he.vertexShader,N=he.fragmentShader}else et=b.vertexShader,N=b.fragmentShader,l.update(b),tt=l.getVertexShaderID(b),ot=l.getFragmentShaderID(b);const it=n.getRenderTarget(),dt=n.state.buffers.depth.getReversed(),xt=U.isInstancedMesh===!0,It=U.isBatchedMesh===!0,ce=!!b.map,Gt=!!b.matcap,se=!!j,W=!!b.aoMap,nn=!!b.lightMap,Yt=!!b.bumpMap,Kt=!!b.normalMap,Lt=!!b.displacementMap,ge=!!b.emissiveMap,Dt=!!b.metalnessMap,I=!!b.roughnessMap,A=b.anisotropy>0,K=b.clearcoat>0,rt=b.dispersion>0,lt=b.iridescence>0,st=b.sheen>0,Ct=b.transmission>0,pt=A&&!!b.anisotropyMap,yt=K&&!!b.clearcoatMap,ee=K&&!!b.clearcoatNormalMap,ct=K&&!!b.clearcoatRoughnessMap,bt=lt&&!!b.iridescenceMap,Ut=lt&&!!b.iridescenceThicknessMap,Nt=st&&!!b.sheenColorMap,St=st&&!!b.sheenRoughnessMap,Qt=!!b.specularMap,Vt=!!b.specularColorMap,pe=!!b.specularIntensityMap,G=Ct&&!!b.transmissionMap,ft=Ct&&!!b.thicknessMap,nt=!!b.gradientMap,at=!!b.alphaMap,vt=b.alphaTest>0,mt=!!b.alphaHash,Ft=!!b.extensions;let Ce=Ci;b.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ce=n.toneMapping);const Xe={shaderID:F,shaderType:b.type,shaderName:b.name,vertexShader:et,fragmentShader:N,defines:b.defines,customVertexShaderID:tt,customFragmentShaderID:ot,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:It,batchingColor:It&&U._colorsTexture!==null,instancing:xt,instancingColor:xt&&U.instanceColor!==null,instancingMorph:xt&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:it===null?n.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:js,alphaToCoverage:!!b.alphaToCoverage,map:ce,matcap:Gt,envMap:se,envMapMode:se&&j.mapping,envMapCubeUVHeight:z,aoMap:W,lightMap:nn,bumpMap:Yt,normalMap:Kt,displacementMap:d&&Lt,emissiveMap:ge,normalMapObjectSpace:Kt&&b.normalMapType===Tp,normalMapTangentSpace:Kt&&b.normalMapType===dc,metalnessMap:Dt,roughnessMap:I,anisotropy:A,anisotropyMap:pt,clearcoat:K,clearcoatMap:yt,clearcoatNormalMap:ee,clearcoatRoughnessMap:ct,dispersion:rt,iridescence:lt,iridescenceMap:bt,iridescenceThicknessMap:Ut,sheen:st,sheenColorMap:Nt,sheenRoughnessMap:St,specularMap:Qt,specularColorMap:Vt,specularIntensityMap:pe,transmission:Ct,transmissionMap:G,thicknessMap:ft,gradientMap:nt,opaque:b.transparent===!1&&b.blending===ks&&b.alphaToCoverage===!1,alphaMap:at,alphaTest:vt,alphaHash:mt,combine:b.combine,mapUv:ce&&v(b.map.channel),aoMapUv:W&&v(b.aoMap.channel),lightMapUv:nn&&v(b.lightMap.channel),bumpMapUv:Yt&&v(b.bumpMap.channel),normalMapUv:Kt&&v(b.normalMap.channel),displacementMapUv:Lt&&v(b.displacementMap.channel),emissiveMapUv:ge&&v(b.emissiveMap.channel),metalnessMapUv:Dt&&v(b.metalnessMap.channel),roughnessMapUv:I&&v(b.roughnessMap.channel),anisotropyMapUv:pt&&v(b.anisotropyMap.channel),clearcoatMapUv:yt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ee&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:St&&v(b.sheenRoughnessMap.channel),specularMapUv:Qt&&v(b.specularMap.channel),specularColorMapUv:Vt&&v(b.specularColorMap.channel),specularIntensityMapUv:pe&&v(b.specularIntensityMap.channel),transmissionMapUv:G&&v(b.transmissionMap.channel),thicknessMapUv:ft&&v(b.thicknessMap.channel),alphaMapUv:at&&v(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Kt||A),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(ce||at),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:dt,skinning:U.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:Q,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&S.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ce,decodeVideoTexture:ce&&b.map.isVideoTexture===!0&&ne.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:ge&&b.emissiveMap.isVideoTexture===!0&&ne.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===oi,flipSided:b.side===tn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ft&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&b.extensions.multiDraw===!0||It)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Xe.vertexUv1s=c.has(1),Xe.vertexUv2s=c.has(2),Xe.vertexUv3s=c.has(3),c.clear(),Xe}function p(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const S in b.defines)y.push(S),y.push(b.defines[S]);return b.isRawShaderMaterial===!1&&(M(y,b),x(y,b),y.push(n.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function M(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function x(b,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),b.push(o.mask)}function _(b){const y=g[b.type];let S;if(y){const L=Gn[y];S=t0.clone(L.uniforms)}else S=b.uniforms;return S}function P(b,y){let S;for(let L=0,U=h.length;L<U;L++){const D=h[L];if(D.cacheKey===y){S=D,++S.usedTimes;break}}return S===void 0&&(S=new f1(n,y,b,r),h.push(S)),S}function T(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function E(b){l.remove(b)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:P,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:w}}function x1(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function _1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Dh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Uh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,d,f,g,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function o(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(u,d,f,g,v,m){const p=a(u,d,f,g,v,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||_1),i.length>1&&i.sort(d||Dh),s.length>1&&s.sort(d||Dh)}function h(){for(let u=t,d=n.length;u<d;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function M1(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Uh,n.set(i,[a])):s>=r.length?(a=new Uh,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function y1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Pt};break;case"SpotLight":e={position:new O,direction:new O,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function b1(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Jt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let S1=0;function E1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function T1(n){const t=new y1,e=b1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new qt,a=new qt;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,M=0,x=0,_=0,P=0,T=0,E=0;c.sort(E1);for(let b=0,y=c.length;b<y;b++){const S=c[b],L=S.color,U=S.intensity,D=S.distance,B=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=L.r*U,u+=L.g*U,d+=L.b*U;else if(S.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(S.sh.coefficients[V],U);E++}else if(S.isDirectionalLight){const V=t.get(S);if(V.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const j=S.shadow,z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,i.directionalShadow[f]=z,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=S.shadow.matrix,M++}i.directional[f]=V,f++}else if(S.isSpotLight){const V=t.get(S);V.position.setFromMatrixPosition(S.matrixWorld),V.color.copy(L).multiplyScalar(U),V.distance=D,V.coneCos=Math.cos(S.angle),V.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),V.decay=S.decay,i.spot[v]=V;const j=S.shadow;if(S.map&&(i.spotLightMap[P]=S.map,P++,j.updateMatrices(S),S.castShadow&&T++),i.spotLightMatrix[v]=j.matrix,S.castShadow){const z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,i.spotShadow[v]=z,i.spotShadowMap[v]=B,_++}v++}else if(S.isRectAreaLight){const V=t.get(S);V.color.copy(L).multiplyScalar(U),V.halfWidth.set(S.width*.5,0,0),V.halfHeight.set(0,S.height*.5,0),i.rectArea[m]=V,m++}else if(S.isPointLight){const V=t.get(S);if(V.color.copy(S.color).multiplyScalar(S.intensity),V.distance=S.distance,V.decay=S.decay,S.castShadow){const j=S.shadow,z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,z.shadowCameraNear=j.camera.near,z.shadowCameraFar=j.camera.far,i.pointShadow[g]=z,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=S.shadow.matrix,x++}i.point[g]=V,g++}else if(S.isHemisphereLight){const V=t.get(S);V.skyColor.copy(S.color).multiplyScalar(U),V.groundColor.copy(S.groundColor).multiplyScalar(U),i.hemi[p]=V,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const w=i.hash;(w.directionalLength!==f||w.pointLength!==g||w.spotLength!==v||w.rectAreaLength!==m||w.hemiLength!==p||w.numDirectionalShadows!==M||w.numPointShadows!==x||w.numSpotShadows!==_||w.numSpotMaps!==P||w.numLightProbes!==E)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=_+P-T,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,w.directionalLength=f,w.pointLength=g,w.spotLength=v,w.rectAreaLength=m,w.hemiLength=p,w.numDirectionalShadows=M,w.numPointShadows=x,w.numSpotShadows=_,w.numSpotMaps=P,w.numLightProbes=E,i.version=S1++)}function l(c,h){let u=0,d=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const x=c[p];if(x.isDirectionalLight){const _=i.directional[u];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),u++}else if(x.isSpotLight){const _=i.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){const _=i.point[d];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const _=i.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:i}}function kh(n){const t=new T1(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function A1(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new kh(n),t.set(s,[o])):r>=a.length?(o=new kh(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class xu extends os{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ep,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class w1 extends os{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const C1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function P1(n,t,e){let i=new uc;const s=new Jt,r=new Jt,a=new Ie,o=new xu({depthPacking:Qd}),l=new w1,c={},h=e.maxTextureSize,u={[Pi]:tn,[tn]:Pi,[oi]:oi},d=new Fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Jt},radius:{value:4}},vertexShader:C1,fragmentShader:R1}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new Le(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ne(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bd;let p=this.type;this.render=function(T,E,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const b=n.getRenderTarget(),y=n.getActiveCubeFace(),S=n.getActiveMipmapLevel(),L=n.state;L.setBlending(wi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const U=p!==si&&this.type===si,D=p===si&&this.type!==si;for(let B=0,V=T.length;B<V;B++){const j=T[B],z=j.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const F=z.getFrameExtents();if(s.multiply(F),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,z.mapSize.y=r.y)),z.map===null||U===!0||D===!0){const Y=this.type!==si?{minFilter:gn,magFilter:gn}:{};z.map!==null&&z.map.dispose(),z.map=new ss(s.x,s.y,Y),z.map.texture.name=j.name+".shadowMap",z.camera.updateProjectionMatrix()}n.setRenderTarget(z.map),n.clear();const H=z.getViewportCount();for(let Y=0;Y<H;Y++){const Q=z.getViewport(Y);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),L.viewport(a),z.updateMatrices(j,Y),i=z.getFrustum(),_(E,w,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===si&&M(z,w),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,y,S)};function M(T,E){const w=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ss(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,w,d,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,w,f,v,null)}function x(T,E,w,b){let y=null;const S=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(S!==void 0)y=S;else if(y=w.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=y.uuid,U=E.uuid;let D=c[L];D===void 0&&(D={},c[L]=D);let B=D[U];B===void 0&&(B=y.clone(),D[U]=B,E.addEventListener("dispose",P)),y=B}if(y.visible=E.visible,y.wireframe=E.wireframe,b===si?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:u[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const L=n.properties.get(y);L.light=w}return y}function _(T,E,w,b,y){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===si)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);const U=t.update(T),D=T.material;if(Array.isArray(D)){const B=U.groups;for(let V=0,j=B.length;V<j;V++){const z=B[V],F=D[z.materialIndex];if(F&&F.visible){const H=x(T,F,b,y);T.onBeforeShadow(n,T,E,w,U,H,z),n.renderBufferDirect(w,null,U,H,T,z),T.onAfterShadow(n,T,E,w,U,H,z)}}}else if(D.visible){const B=x(T,D,b,y);T.onBeforeShadow(n,T,E,w,U,B,null),n.renderBufferDirect(w,null,U,B,T,null),T.onAfterShadow(n,T,E,w,U,B,null)}}const L=T.children;for(let U=0,D=L.length;U<D;U++)_(L[U],E,w,b,y)}function P(T){T.target.removeEventListener("dispose",P);for(const w in c){const b=c[w],y=T.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const I1={[il]:sl,[rl]:ll,[al]:cl,[Vs]:ol,[sl]:il,[ll]:rl,[cl]:al,[ol]:Vs};function L1(n,t){function e(){let G=!1;const ft=new Ie;let nt=null;const at=new Ie(0,0,0,0);return{setMask:function(vt){nt!==vt&&!G&&(n.colorMask(vt,vt,vt,vt),nt=vt)},setLocked:function(vt){G=vt},setClear:function(vt,mt,Ft,Ce,Xe){Xe===!0&&(vt*=Ce,mt*=Ce,Ft*=Ce),ft.set(vt,mt,Ft,Ce),at.equals(ft)===!1&&(n.clearColor(vt,mt,Ft,Ce),at.copy(ft))},reset:function(){G=!1,nt=null,at.set(-1,0,0,0)}}}function i(){let G=!1,ft=!1,nt=null,at=null,vt=null;return{setReversed:function(mt){if(ft!==mt){const Ft=t.get("EXT_clip_control");ft?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const Ce=vt;vt=null,this.setClear(Ce)}ft=mt},getReversed:function(){return ft},setTest:function(mt){mt?it(n.DEPTH_TEST):dt(n.DEPTH_TEST)},setMask:function(mt){nt!==mt&&!G&&(n.depthMask(mt),nt=mt)},setFunc:function(mt){if(ft&&(mt=I1[mt]),at!==mt){switch(mt){case il:n.depthFunc(n.NEVER);break;case sl:n.depthFunc(n.ALWAYS);break;case rl:n.depthFunc(n.LESS);break;case Vs:n.depthFunc(n.LEQUAL);break;case al:n.depthFunc(n.EQUAL);break;case ol:n.depthFunc(n.GEQUAL);break;case ll:n.depthFunc(n.GREATER);break;case cl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=mt}},setLocked:function(mt){G=mt},setClear:function(mt){vt!==mt&&(ft&&(mt=1-mt),n.clearDepth(mt),vt=mt)},reset:function(){G=!1,nt=null,at=null,vt=null,ft=!1}}}function s(){let G=!1,ft=null,nt=null,at=null,vt=null,mt=null,Ft=null,Ce=null,Xe=null;return{setTest:function(he){G||(he?it(n.STENCIL_TEST):dt(n.STENCIL_TEST))},setMask:function(he){ft!==he&&!G&&(n.stencilMask(he),ft=he)},setFunc:function(he,An,jn){(nt!==he||at!==An||vt!==jn)&&(n.stencilFunc(he,An,jn),nt=he,at=An,vt=jn)},setOp:function(he,An,jn){(mt!==he||Ft!==An||Ce!==jn)&&(n.stencilOp(he,An,jn),mt=he,Ft=An,Ce=jn)},setLocked:function(he){G=he},setClear:function(he){Xe!==he&&(n.clearStencil(he),Xe=he)},reset:function(){G=!1,ft=null,nt=null,at=null,vt=null,mt=null,Ft=null,Ce=null,Xe=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,x=null,_=null,P=null,T=null,E=new Pt(0,0,0),w=0,b=!1,y=null,S=null,L=null,U=null,D=null;const B=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,j=0;const z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=j>=1):z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=j>=2);let F=null,H={};const Y=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),et=new Ie().fromArray(Y),N=new Ie().fromArray(Q);function tt(G,ft,nt,at){const vt=new Uint8Array(4),mt=n.createTexture();n.bindTexture(G,mt),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ft=0;Ft<nt;Ft++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,vt):n.texImage2D(ft+Ft,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,vt);return mt}const ot={};ot[n.TEXTURE_2D]=tt(n.TEXTURE_2D,n.TEXTURE_2D,1),ot[n.TEXTURE_CUBE_MAP]=tt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[n.TEXTURE_2D_ARRAY]=tt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ot[n.TEXTURE_3D]=tt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),it(n.DEPTH_TEST),a.setFunc(Vs),Yt(!1),Kt(Oc),it(n.CULL_FACE),W(wi);function it(G){h[G]!==!0&&(n.enable(G),h[G]=!0)}function dt(G){h[G]!==!1&&(n.disable(G),h[G]=!1)}function xt(G,ft){return u[G]!==ft?(n.bindFramebuffer(G,ft),u[G]=ft,G===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),G===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function It(G,ft){let nt=f,at=!1;if(G){nt=d.get(ft),nt===void 0&&(nt=[],d.set(ft,nt));const vt=G.textures;if(nt.length!==vt.length||nt[0]!==n.COLOR_ATTACHMENT0){for(let mt=0,Ft=vt.length;mt<Ft;mt++)nt[mt]=n.COLOR_ATTACHMENT0+mt;nt.length=vt.length,at=!0}}else nt[0]!==n.BACK&&(nt[0]=n.BACK,at=!0);at&&n.drawBuffers(nt)}function ce(G){return g!==G?(n.useProgram(G),g=G,!0):!1}const Gt={[Xi]:n.FUNC_ADD,[Jf]:n.FUNC_SUBTRACT,[Qf]:n.FUNC_REVERSE_SUBTRACT};Gt[tp]=n.MIN,Gt[ep]=n.MAX;const se={[np]:n.ZERO,[ip]:n.ONE,[sp]:n.SRC_COLOR,[el]:n.SRC_ALPHA,[hp]:n.SRC_ALPHA_SATURATE,[lp]:n.DST_COLOR,[ap]:n.DST_ALPHA,[rp]:n.ONE_MINUS_SRC_COLOR,[nl]:n.ONE_MINUS_SRC_ALPHA,[cp]:n.ONE_MINUS_DST_COLOR,[op]:n.ONE_MINUS_DST_ALPHA,[dp]:n.CONSTANT_COLOR,[up]:n.ONE_MINUS_CONSTANT_COLOR,[fp]:n.CONSTANT_ALPHA,[pp]:n.ONE_MINUS_CONSTANT_ALPHA};function W(G,ft,nt,at,vt,mt,Ft,Ce,Xe,he){if(G===wi){v===!0&&(dt(n.BLEND),v=!1);return}if(v===!1&&(it(n.BLEND),v=!0),G!==Zf){if(G!==m||he!==b){if((p!==Xi||_!==Xi)&&(n.blendEquation(n.FUNC_ADD),p=Xi,_=Xi),he)switch(G){case ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bc:n.blendFunc(n.ONE,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gc:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bc:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gc:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}M=null,x=null,P=null,T=null,E.set(0,0,0),w=0,m=G,b=he}return}vt=vt||ft,mt=mt||nt,Ft=Ft||at,(ft!==p||vt!==_)&&(n.blendEquationSeparate(Gt[ft],Gt[vt]),p=ft,_=vt),(nt!==M||at!==x||mt!==P||Ft!==T)&&(n.blendFuncSeparate(se[nt],se[at],se[mt],se[Ft]),M=nt,x=at,P=mt,T=Ft),(Ce.equals(E)===!1||Xe!==w)&&(n.blendColor(Ce.r,Ce.g,Ce.b,Xe),E.copy(Ce),w=Xe),m=G,b=!1}function nn(G,ft){G.side===oi?dt(n.CULL_FACE):it(n.CULL_FACE);let nt=G.side===tn;ft&&(nt=!nt),Yt(nt),G.blending===ks&&G.transparent===!1?W(wi):W(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const at=G.stencilWrite;o.setTest(at),at&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ge(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?it(n.SAMPLE_ALPHA_TO_COVERAGE):dt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Yt(G){y!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),y=G)}function Kt(G){G!==Kf?(it(n.CULL_FACE),G!==S&&(G===Oc?n.cullFace(n.BACK):G===jf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):dt(n.CULL_FACE),S=G}function Lt(G){G!==L&&(V&&n.lineWidth(G),L=G)}function ge(G,ft,nt){G?(it(n.POLYGON_OFFSET_FILL),(U!==ft||D!==nt)&&(n.polygonOffset(ft,nt),U=ft,D=nt)):dt(n.POLYGON_OFFSET_FILL)}function Dt(G){G?it(n.SCISSOR_TEST):dt(n.SCISSOR_TEST)}function I(G){G===void 0&&(G=n.TEXTURE0+B-1),F!==G&&(n.activeTexture(G),F=G)}function A(G,ft,nt){nt===void 0&&(F===null?nt=n.TEXTURE0+B-1:nt=F);let at=H[nt];at===void 0&&(at={type:void 0,texture:void 0},H[nt]=at),(at.type!==G||at.texture!==ft)&&(F!==nt&&(n.activeTexture(nt),F=nt),n.bindTexture(G,ft||ot[G]),at.type=G,at.texture=ft)}function K(){const G=H[F];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function rt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function st(){try{n.texSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{n.texSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function pt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function yt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ee(){try{n.texStorage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function bt(){try{n.texImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ut(){try{n.texImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Nt(G){et.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),et.copy(G))}function St(G){N.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),N.copy(G))}function Qt(G,ft){let nt=c.get(ft);nt===void 0&&(nt=new WeakMap,c.set(ft,nt));let at=nt.get(G);at===void 0&&(at=n.getUniformBlockIndex(ft,G.name),nt.set(G,at))}function Vt(G,ft){const at=c.get(ft).get(G);l.get(ft)!==at&&(n.uniformBlockBinding(ft,at,G.__bindingPointIndex),l.set(ft,at))}function pe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},F=null,H={},u={},d=new WeakMap,f=[],g=null,v=!1,m=null,p=null,M=null,x=null,_=null,P=null,T=null,E=new Pt(0,0,0),w=0,b=!1,y=null,S=null,L=null,U=null,D=null,et.set(0,0,n.canvas.width,n.canvas.height),N.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:it,disable:dt,bindFramebuffer:xt,drawBuffers:It,useProgram:ce,setBlending:W,setMaterial:nn,setFlipSided:Yt,setCullFace:Kt,setLineWidth:Lt,setPolygonOffset:ge,setScissorTest:Dt,activeTexture:I,bindTexture:A,unbindTexture:K,compressedTexImage2D:rt,compressedTexImage3D:lt,texImage2D:bt,texImage3D:Ut,updateUBOMapping:Qt,uniformBlockBinding:Vt,texStorage2D:ee,texStorage3D:ct,texSubImage2D:st,texSubImage3D:Ct,compressedTexSubImage2D:pt,compressedTexSubImage3D:yt,scissor:Nt,viewport:St,reset:pe}}function Nh(n,t,e,i){const s=D1(i);switch(e){case $d:return n*t;case Kd:return n*t;case jd:return n*t*2;case Ya:return n*t/s.components*s.byteLength;case lc:return n*t/s.components*s.byteLength;case Zd:return n*t*2/s.components*s.byteLength;case cc:return n*t*2/s.components*s.byteLength;case Yd:return n*t*3/s.components*s.byteLength;case Nn:return n*t*4/s.components*s.byteLength;case hc:return n*t*4/s.components*s.byteLength;case Sa:case Ea:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ta:case Aa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ml:case vl:return Math.max(n,16)*Math.max(t,8)/4;case pl:case gl:return Math.max(n,8)*Math.max(t,8)/2;case xl:case _l:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Ml:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case yl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case bl:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Sl:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case El:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Tl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Al:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case wl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Cl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Rl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Pl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Il:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Ll:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Dl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Ul:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case wa:case kl:case Nl:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Jd:case zl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Fl:case Ol:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function D1(n){switch(n){case Kn:case Wd:return{byteLength:1,components:1};case br:case qd:case Ir:return{byteLength:2,components:1};case ac:case oc:return{byteLength:2,components:4};case is:case rc:case Vn:return{byteLength:4,components:1};case Xd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function U1(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Jt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,A){return f?new OffscreenCanvas(I,A):za("canvas")}function v(I,A,K){let rt=1;const lt=Dt(I);if((lt.width>K||lt.height>K)&&(rt=K/Math.max(lt.width,lt.height)),rt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const st=Math.floor(rt*lt.width),Ct=Math.floor(rt*lt.height);u===void 0&&(u=g(st,Ct));const pt=A?g(st,Ct):u;return pt.width=st,pt.height=Ct,pt.getContext("2d").drawImage(I,0,0,st,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+st+"x"+Ct+")."),pt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){n.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(I,A,K,rt,lt=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let st=A;if(A===n.RED&&(K===n.FLOAT&&(st=n.R32F),K===n.HALF_FLOAT&&(st=n.R16F),K===n.UNSIGNED_BYTE&&(st=n.R8)),A===n.RED_INTEGER&&(K===n.UNSIGNED_BYTE&&(st=n.R8UI),K===n.UNSIGNED_SHORT&&(st=n.R16UI),K===n.UNSIGNED_INT&&(st=n.R32UI),K===n.BYTE&&(st=n.R8I),K===n.SHORT&&(st=n.R16I),K===n.INT&&(st=n.R32I)),A===n.RG&&(K===n.FLOAT&&(st=n.RG32F),K===n.HALF_FLOAT&&(st=n.RG16F),K===n.UNSIGNED_BYTE&&(st=n.RG8)),A===n.RG_INTEGER&&(K===n.UNSIGNED_BYTE&&(st=n.RG8UI),K===n.UNSIGNED_SHORT&&(st=n.RG16UI),K===n.UNSIGNED_INT&&(st=n.RG32UI),K===n.BYTE&&(st=n.RG8I),K===n.SHORT&&(st=n.RG16I),K===n.INT&&(st=n.RG32I)),A===n.RGB_INTEGER&&(K===n.UNSIGNED_BYTE&&(st=n.RGB8UI),K===n.UNSIGNED_SHORT&&(st=n.RGB16UI),K===n.UNSIGNED_INT&&(st=n.RGB32UI),K===n.BYTE&&(st=n.RGB8I),K===n.SHORT&&(st=n.RGB16I),K===n.INT&&(st=n.RGB32I)),A===n.RGBA_INTEGER&&(K===n.UNSIGNED_BYTE&&(st=n.RGBA8UI),K===n.UNSIGNED_SHORT&&(st=n.RGBA16UI),K===n.UNSIGNED_INT&&(st=n.RGBA32UI),K===n.BYTE&&(st=n.RGBA8I),K===n.SHORT&&(st=n.RGBA16I),K===n.INT&&(st=n.RGBA32I)),A===n.RGB&&K===n.UNSIGNED_INT_5_9_9_9_REV&&(st=n.RGB9_E5),A===n.RGBA){const Ct=lt?Ka:ne.getTransfer(rt);K===n.FLOAT&&(st=n.RGBA32F),K===n.HALF_FLOAT&&(st=n.RGBA16F),K===n.UNSIGNED_BYTE&&(st=Ct===ue?n.SRGB8_ALPHA8:n.RGBA8),K===n.UNSIGNED_SHORT_4_4_4_4&&(st=n.RGBA4),K===n.UNSIGNED_SHORT_5_5_5_1&&(st=n.RGB5_A1)}return(st===n.R16F||st===n.R32F||st===n.RG16F||st===n.RG32F||st===n.RGBA16F||st===n.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function _(I,A){let K;return I?A===null||A===is||A===Xs?K=n.DEPTH24_STENCIL8:A===Vn?K=n.DEPTH32F_STENCIL8:A===br&&(K=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===is||A===Xs?K=n.DEPTH_COMPONENT24:A===Vn?K=n.DEPTH_COMPONENT32F:A===br&&(K=n.DEPTH_COMPONENT16),K}function P(I,A){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==gn&&I.minFilter!==kn?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function T(I){const A=I.target;A.removeEventListener("dispose",T),w(A),A.isVideoTexture&&h.delete(A)}function E(I){const A=I.target;A.removeEventListener("dispose",E),y(A)}function w(I){const A=i.get(I);if(A.__webglInit===void 0)return;const K=I.source,rt=d.get(K);if(rt){const lt=rt[A.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&b(I),Object.keys(rt).length===0&&d.delete(K)}i.remove(I)}function b(I){const A=i.get(I);n.deleteTexture(A.__webglTexture);const K=I.source,rt=d.get(K);delete rt[A.__cacheKey],a.memory.textures--}function y(I){const A=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(A.__webglFramebuffer[rt]))for(let lt=0;lt<A.__webglFramebuffer[rt].length;lt++)n.deleteFramebuffer(A.__webglFramebuffer[rt][lt]);else n.deleteFramebuffer(A.__webglFramebuffer[rt]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[rt])}else{if(Array.isArray(A.__webglFramebuffer))for(let rt=0;rt<A.__webglFramebuffer.length;rt++)n.deleteFramebuffer(A.__webglFramebuffer[rt]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let rt=0;rt<A.__webglColorRenderbuffer.length;rt++)A.__webglColorRenderbuffer[rt]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[rt]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const K=I.textures;for(let rt=0,lt=K.length;rt<lt;rt++){const st=i.get(K[rt]);st.__webglTexture&&(n.deleteTexture(st.__webglTexture),a.memory.textures--),i.remove(K[rt])}i.remove(I)}let S=0;function L(){S=0}function U(){const I=S;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),S+=1,I}function D(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function B(I,A){const K=i.get(I);if(I.isVideoTexture&&Lt(I),I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){const rt=I.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(K,I,A);return}}e.bindTexture(n.TEXTURE_2D,K.__webglTexture,n.TEXTURE0+A)}function V(I,A){const K=i.get(I);if(I.version>0&&K.__version!==I.version){N(K,I,A);return}e.bindTexture(n.TEXTURE_2D_ARRAY,K.__webglTexture,n.TEXTURE0+A)}function j(I,A){const K=i.get(I);if(I.version>0&&K.__version!==I.version){N(K,I,A);return}e.bindTexture(n.TEXTURE_3D,K.__webglTexture,n.TEXTURE0+A)}function z(I,A){const K=i.get(I);if(I.version>0&&K.__version!==I.version){tt(K,I,A);return}e.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture,n.TEXTURE0+A)}const F={[ul]:n.REPEAT,[Ji]:n.CLAMP_TO_EDGE,[fl]:n.MIRRORED_REPEAT},H={[gn]:n.NEAREST,[Sp]:n.NEAREST_MIPMAP_NEAREST,[Or]:n.NEAREST_MIPMAP_LINEAR,[kn]:n.LINEAR,[so]:n.LINEAR_MIPMAP_NEAREST,[Qi]:n.LINEAR_MIPMAP_LINEAR},Y={[Ap]:n.NEVER,[Lp]:n.ALWAYS,[wp]:n.LESS,[tu]:n.LEQUAL,[Cp]:n.EQUAL,[Ip]:n.GEQUAL,[Rp]:n.GREATER,[Pp]:n.NOTEQUAL};function Q(I,A){if(A.type===Vn&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===kn||A.magFilter===so||A.magFilter===Or||A.magFilter===Qi||A.minFilter===kn||A.minFilter===so||A.minFilter===Or||A.minFilter===Qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,F[A.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,F[A.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,F[A.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,H[A.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,H[A.minFilter]),A.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,Y[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===gn||A.minFilter!==Or&&A.minFilter!==Qi||A.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");n.texParameterf(I,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function et(I,A){let K=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",T));const rt=A.source;let lt=d.get(rt);lt===void 0&&(lt={},d.set(rt,lt));const st=D(A);if(st!==I.__cacheKey){lt[st]===void 0&&(lt[st]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,K=!0),lt[st].usedTimes++;const Ct=lt[I.__cacheKey];Ct!==void 0&&(lt[I.__cacheKey].usedTimes--,Ct.usedTimes===0&&b(A)),I.__cacheKey=st,I.__webglTexture=lt[st].texture}return K}function N(I,A,K){let rt=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(rt=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(rt=n.TEXTURE_3D);const lt=et(I,A),st=A.source;e.bindTexture(rt,I.__webglTexture,n.TEXTURE0+K);const Ct=i.get(st);if(st.version!==Ct.__version||lt===!0){e.activeTexture(n.TEXTURE0+K);const pt=ne.getPrimaries(ne.workingColorSpace),yt=A.colorSpace===Ai?null:ne.getPrimaries(A.colorSpace),ee=A.colorSpace===Ai||pt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let ct=v(A.image,!1,s.maxTextureSize);ct=ge(A,ct);const bt=r.convert(A.format,A.colorSpace),Ut=r.convert(A.type);let Nt=x(A.internalFormat,bt,Ut,A.colorSpace,A.isVideoTexture);Q(rt,A);let St;const Qt=A.mipmaps,Vt=A.isVideoTexture!==!0,pe=Ct.__version===void 0||lt===!0,G=st.dataReady,ft=P(A,ct);if(A.isDepthTexture)Nt=_(A.format===$s,A.type),pe&&(Vt?e.texStorage2D(n.TEXTURE_2D,1,Nt,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Nt,ct.width,ct.height,0,bt,Ut,null));else if(A.isDataTexture)if(Qt.length>0){Vt&&pe&&e.texStorage2D(n.TEXTURE_2D,ft,Nt,Qt[0].width,Qt[0].height);for(let nt=0,at=Qt.length;nt<at;nt++)St=Qt[nt],Vt?G&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,bt,Ut,St.data):e.texImage2D(n.TEXTURE_2D,nt,Nt,St.width,St.height,0,bt,Ut,St.data);A.generateMipmaps=!1}else Vt?(pe&&e.texStorage2D(n.TEXTURE_2D,ft,Nt,ct.width,ct.height),G&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,bt,Ut,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Nt,ct.width,ct.height,0,bt,Ut,ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Vt&&pe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Nt,Qt[0].width,Qt[0].height,ct.depth);for(let nt=0,at=Qt.length;nt<at;nt++)if(St=Qt[nt],A.format!==Nn)if(bt!==null)if(Vt){if(G)if(A.layerUpdates.size>0){const vt=Nh(St.width,St.height,A.format,A.type);for(const mt of A.layerUpdates){const Ft=St.data.subarray(mt*vt/St.data.BYTES_PER_ELEMENT,(mt+1)*vt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,mt,St.width,St.height,1,bt,Ft)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ct.depth,bt,St.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,nt,Nt,St.width,St.height,ct.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?G&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ct.depth,bt,Ut,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,nt,Nt,St.width,St.height,ct.depth,0,bt,Ut,St.data)}else{Vt&&pe&&e.texStorage2D(n.TEXTURE_2D,ft,Nt,Qt[0].width,Qt[0].height);for(let nt=0,at=Qt.length;nt<at;nt++)St=Qt[nt],A.format!==Nn?bt!==null?Vt?G&&e.compressedTexSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(n.TEXTURE_2D,nt,Nt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?G&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,St.width,St.height,bt,Ut,St.data):e.texImage2D(n.TEXTURE_2D,nt,Nt,St.width,St.height,0,bt,Ut,St.data)}else if(A.isDataArrayTexture)if(Vt){if(pe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Nt,ct.width,ct.height,ct.depth),G)if(A.layerUpdates.size>0){const nt=Nh(ct.width,ct.height,A.format,A.type);for(const at of A.layerUpdates){const vt=ct.data.subarray(at*nt/ct.data.BYTES_PER_ELEMENT,(at+1)*nt/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,ct.width,ct.height,1,bt,Ut,vt)}A.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,bt,Ut,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Nt,ct.width,ct.height,ct.depth,0,bt,Ut,ct.data);else if(A.isData3DTexture)Vt?(pe&&e.texStorage3D(n.TEXTURE_3D,ft,Nt,ct.width,ct.height,ct.depth),G&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,bt,Ut,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Nt,ct.width,ct.height,ct.depth,0,bt,Ut,ct.data);else if(A.isFramebufferTexture){if(pe)if(Vt)e.texStorage2D(n.TEXTURE_2D,ft,Nt,ct.width,ct.height);else{let nt=ct.width,at=ct.height;for(let vt=0;vt<ft;vt++)e.texImage2D(n.TEXTURE_2D,vt,Nt,nt,at,0,bt,Ut,null),nt>>=1,at>>=1}}else if(Qt.length>0){if(Vt&&pe){const nt=Dt(Qt[0]);e.texStorage2D(n.TEXTURE_2D,ft,Nt,nt.width,nt.height)}for(let nt=0,at=Qt.length;nt<at;nt++)St=Qt[nt],Vt?G&&e.texSubImage2D(n.TEXTURE_2D,nt,0,0,bt,Ut,St):e.texImage2D(n.TEXTURE_2D,nt,Nt,bt,Ut,St);A.generateMipmaps=!1}else if(Vt){if(pe){const nt=Dt(ct);e.texStorage2D(n.TEXTURE_2D,ft,Nt,nt.width,nt.height)}G&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt,Ut,ct)}else e.texImage2D(n.TEXTURE_2D,0,Nt,bt,Ut,ct);m(A)&&p(rt),Ct.__version=st.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function tt(I,A,K){if(A.image.length!==6)return;const rt=et(I,A),lt=A.source;e.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+K);const st=i.get(lt);if(lt.version!==st.__version||rt===!0){e.activeTexture(n.TEXTURE0+K);const Ct=ne.getPrimaries(ne.workingColorSpace),pt=A.colorSpace===Ai?null:ne.getPrimaries(A.colorSpace),yt=A.colorSpace===Ai||Ct===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const ee=A.isCompressedTexture||A.image[0].isCompressedTexture,ct=A.image[0]&&A.image[0].isDataTexture,bt=[];for(let at=0;at<6;at++)!ee&&!ct?bt[at]=v(A.image[at],!0,s.maxCubemapSize):bt[at]=ct?A.image[at].image:A.image[at],bt[at]=ge(A,bt[at]);const Ut=bt[0],Nt=r.convert(A.format,A.colorSpace),St=r.convert(A.type),Qt=x(A.internalFormat,Nt,St,A.colorSpace),Vt=A.isVideoTexture!==!0,pe=st.__version===void 0||rt===!0,G=lt.dataReady;let ft=P(A,Ut);Q(n.TEXTURE_CUBE_MAP,A);let nt;if(ee){Vt&&pe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,Qt,Ut.width,Ut.height);for(let at=0;at<6;at++){nt=bt[at].mipmaps;for(let vt=0;vt<nt.length;vt++){const mt=nt[vt];A.format!==Nn?Nt!==null?Vt?G&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,0,0,mt.width,mt.height,Nt,mt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,Qt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,0,0,mt.width,mt.height,Nt,St,mt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,Qt,mt.width,mt.height,0,Nt,St,mt.data)}}}else{if(nt=A.mipmaps,Vt&&pe){nt.length>0&&ft++;const at=Dt(bt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,Qt,at.width,at.height)}for(let at=0;at<6;at++)if(ct){Vt?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,bt[at].width,bt[at].height,Nt,St,bt[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Qt,bt[at].width,bt[at].height,0,Nt,St,bt[at].data);for(let vt=0;vt<nt.length;vt++){const Ft=nt[vt].image[at].image;Vt?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,0,0,Ft.width,Ft.height,Nt,St,Ft.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,Qt,Ft.width,Ft.height,0,Nt,St,Ft.data)}}else{Vt?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Nt,St,bt[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Qt,Nt,St,bt[at]);for(let vt=0;vt<nt.length;vt++){const mt=nt[vt];Vt?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,0,0,Nt,St,mt.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,Qt,Nt,St,mt.image[at])}}}m(A)&&p(n.TEXTURE_CUBE_MAP),st.__version=lt.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ot(I,A,K,rt,lt,st){const Ct=r.convert(K.format,K.colorSpace),pt=r.convert(K.type),yt=x(K.internalFormat,Ct,pt,K.colorSpace),ee=i.get(A),ct=i.get(K);if(ct.__renderTarget=A,!ee.__hasExternalTextures){const bt=Math.max(1,A.width>>st),Ut=Math.max(1,A.height>>st);lt===n.TEXTURE_3D||lt===n.TEXTURE_2D_ARRAY?e.texImage3D(lt,st,yt,bt,Ut,A.depth,0,Ct,pt,null):e.texImage2D(lt,st,yt,bt,Ut,0,Ct,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,I),Kt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,rt,lt,ct.__webglTexture,0,Yt(A)):(lt===n.TEXTURE_2D||lt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,rt,lt,ct.__webglTexture,st),e.bindFramebuffer(n.FRAMEBUFFER,null)}function it(I,A,K){if(n.bindRenderbuffer(n.RENDERBUFFER,I),A.depthBuffer){const rt=A.depthTexture,lt=rt&&rt.isDepthTexture?rt.type:null,st=_(A.stencilBuffer,lt),Ct=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=Yt(A);Kt(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,st,A.width,A.height):K?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,st,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,st,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ct,n.RENDERBUFFER,I)}else{const rt=A.textures;for(let lt=0;lt<rt.length;lt++){const st=rt[lt],Ct=r.convert(st.format,st.colorSpace),pt=r.convert(st.type),yt=x(st.internalFormat,Ct,pt,st.colorSpace),ee=Yt(A);K&&Kt(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,yt,A.width,A.height):Kt(A)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ee,yt,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,yt,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function dt(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const rt=i.get(A.depthTexture);rt.__renderTarget=A,(!rt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),B(A.depthTexture,0);const lt=rt.__webglTexture,st=Yt(A);if(A.depthTexture.format===Ns)Kt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0,st):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0);else if(A.depthTexture.format===$s)Kt(A)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0,st):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function xt(I){const A=i.get(I),K=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const rt=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),rt){const lt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,rt.removeEventListener("dispose",lt)};rt.addEventListener("dispose",lt),A.__depthDisposeCallback=lt}A.__boundDepthTexture=rt}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");dt(A.__webglFramebuffer,I)}else if(K){A.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[rt]),A.__webglDepthbuffer[rt]===void 0)A.__webglDepthbuffer[rt]=n.createRenderbuffer(),it(A.__webglDepthbuffer[rt],I,!1);else{const lt=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=A.__webglDepthbuffer[rt];n.bindRenderbuffer(n.RENDERBUFFER,st),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,st)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),it(A.__webglDepthbuffer,I,!1);else{const rt=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,lt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function It(I,A,K){const rt=i.get(I);A!==void 0&&ot(rt.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),K!==void 0&&xt(I)}function ce(I){const A=I.texture,K=i.get(I),rt=i.get(A);I.addEventListener("dispose",E);const lt=I.textures,st=I.isWebGLCubeRenderTarget===!0,Ct=lt.length>1;if(Ct||(rt.__webglTexture===void 0&&(rt.__webglTexture=n.createTexture()),rt.__version=A.version,a.memory.textures++),st){K.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer[pt]=[];for(let yt=0;yt<A.mipmaps.length;yt++)K.__webglFramebuffer[pt][yt]=n.createFramebuffer()}else K.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer=[];for(let pt=0;pt<A.mipmaps.length;pt++)K.__webglFramebuffer[pt]=n.createFramebuffer()}else K.__webglFramebuffer=n.createFramebuffer();if(Ct)for(let pt=0,yt=lt.length;pt<yt;pt++){const ee=i.get(lt[pt]);ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture(),a.memory.textures++)}if(I.samples>0&&Kt(I)===!1){K.__webglMultisampledFramebuffer=n.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let pt=0;pt<lt.length;pt++){const yt=lt[pt];K.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,K.__webglColorRenderbuffer[pt]);const ee=r.convert(yt.format,yt.colorSpace),ct=r.convert(yt.type),bt=x(yt.internalFormat,ee,ct,yt.colorSpace,I.isXRRenderTarget===!0),Ut=Yt(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut,bt,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,K.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(K.__webglDepthRenderbuffer=n.createRenderbuffer(),it(K.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(st){e.bindTexture(n.TEXTURE_CUBE_MAP,rt.__webglTexture),Q(n.TEXTURE_CUBE_MAP,A);for(let pt=0;pt<6;pt++)if(A.mipmaps&&A.mipmaps.length>0)for(let yt=0;yt<A.mipmaps.length;yt++)ot(K.__webglFramebuffer[pt][yt],I,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,yt);else ot(K.__webglFramebuffer[pt],I,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(A)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let pt=0,yt=lt.length;pt<yt;pt++){const ee=lt[pt],ct=i.get(ee);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),Q(n.TEXTURE_2D,ee),ot(K.__webglFramebuffer,I,ee,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,0),m(ee)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pt=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,rt.__webglTexture),Q(pt,A),A.mipmaps&&A.mipmaps.length>0)for(let yt=0;yt<A.mipmaps.length;yt++)ot(K.__webglFramebuffer[yt],I,A,n.COLOR_ATTACHMENT0,pt,yt);else ot(K.__webglFramebuffer,I,A,n.COLOR_ATTACHMENT0,pt,0);m(A)&&p(pt),e.unbindTexture()}I.depthBuffer&&xt(I)}function Gt(I){const A=I.textures;for(let K=0,rt=A.length;K<rt;K++){const lt=A[K];if(m(lt)){const st=M(I),Ct=i.get(lt).__webglTexture;e.bindTexture(st,Ct),p(st),e.unbindTexture()}}}const se=[],W=[];function nn(I){if(I.samples>0){if(Kt(I)===!1){const A=I.textures,K=I.width,rt=I.height;let lt=n.COLOR_BUFFER_BIT;const st=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ct=i.get(I),pt=A.length>1;if(pt)for(let yt=0;yt<A.length;yt++)e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let yt=0;yt<A.length;yt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(lt|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(lt|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const ee=i.get(A[yt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,K,rt,0,0,K,rt,lt,n.NEAREST),l===!0&&(se.length=0,W.length=0,se.push(n.COLOR_ATTACHMENT0+yt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(se.push(st),W.push(st),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,W)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,se))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let yt=0;yt<A.length;yt++){e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,Ct.__webglColorRenderbuffer[yt]);const ee=i.get(A[yt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Ct.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,ee,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function Yt(I){return Math.min(s.maxSamples,I.samples)}function Kt(I){const A=i.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Lt(I){const A=a.render.frame;h.get(I)!==A&&(h.set(I,A),I.update())}function ge(I,A){const K=I.colorSpace,rt=I.format,lt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||K!==js&&K!==Ai&&(ne.getTransfer(K)===ue?(rt!==Nn||lt!==Kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),A}function Dt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=z,this.rebindTextures=It,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Kt}function k1(n,t){function e(i,s=Ai){let r;const a=ne.getTransfer(s);if(i===Kn)return n.UNSIGNED_BYTE;if(i===ac)return n.UNSIGNED_SHORT_4_4_4_4;if(i===oc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Xd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wd)return n.BYTE;if(i===qd)return n.SHORT;if(i===br)return n.UNSIGNED_SHORT;if(i===rc)return n.INT;if(i===is)return n.UNSIGNED_INT;if(i===Vn)return n.FLOAT;if(i===Ir)return n.HALF_FLOAT;if(i===$d)return n.ALPHA;if(i===Yd)return n.RGB;if(i===Nn)return n.RGBA;if(i===Kd)return n.LUMINANCE;if(i===jd)return n.LUMINANCE_ALPHA;if(i===Ns)return n.DEPTH_COMPONENT;if(i===$s)return n.DEPTH_STENCIL;if(i===Ya)return n.RED;if(i===lc)return n.RED_INTEGER;if(i===Zd)return n.RG;if(i===cc)return n.RG_INTEGER;if(i===hc)return n.RGBA_INTEGER;if(i===Sa||i===Ea||i===Ta||i===Aa)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Aa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Aa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===pl||i===ml||i===gl||i===vl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===pl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ml)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xl||i===_l||i===Ml)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xl||i===_l)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ml)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yl||i===bl||i===Sl||i===El||i===Tl||i===Al||i===wl||i===Cl||i===Rl||i===Pl||i===Il||i===Ll||i===Dl||i===Ul)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===yl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Sl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===El)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Tl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Al)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Cl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Rl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Pl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Il)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ll)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Dl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ul)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===wa||i===kl||i===Nl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===wa)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===kl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Nl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jd||i===zl||i===Fl||i===Ol)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===wa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===zl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Fl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ol)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Xs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class N1 extends bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Wn extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const z1={type:"move"};class Uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(z1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Wn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const F1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class B1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new en,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Fn({vertexShader:F1,fragmentShader:O1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ne(new Li(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H1 extends Zs{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const v=new B1,m=e.getContextAttributes();let p=null,M=null;const x=[],_=[],P=new Jt;let T=null;const E=new bn;E.viewport=new Ie;const w=new bn;w.viewport=new Ie;const b=[E,w],y=new N1;let S=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let tt=x[N];return tt===void 0&&(tt=new Uo,x[N]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(N){let tt=x[N];return tt===void 0&&(tt=new Uo,x[N]=tt),tt.getGripSpace()},this.getHand=function(N){let tt=x[N];return tt===void 0&&(tt=new Uo,x[N]=tt),tt.getHandSpace()};function U(N){const tt=_.indexOf(N.inputSource);if(tt===-1)return;const ot=x[tt];ot!==void 0&&(ot.update(N.inputSource,N.frame,c||a),ot.dispatchEvent({type:N.type,data:N.inputSource}))}function D(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",B);for(let N=0;N<x.length;N++){const tt=_[N];tt!==null&&(_[N]=null,x[N].disconnect(tt))}S=null,L=null,v.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,M=null,et.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){r=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(N){c=N},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",D),s.addEventListener("inputsourceschange",B),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new ss(f.framebufferWidth,f.framebufferHeight,{format:Nn,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,ot=null,it=null;m.depth&&(it=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?$s:Ns,ot=m.stencil?Xs:is);const dt={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(dt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new ss(d.textureWidth,d.textureHeight,{format:Nn,type:Kn,depthTexture:new fu(d.textureWidth,d.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(N){for(let tt=0;tt<N.removed.length;tt++){const ot=N.removed[tt],it=_.indexOf(ot);it>=0&&(_[it]=null,x[it].disconnect(ot))}for(let tt=0;tt<N.added.length;tt++){const ot=N.added[tt];let it=_.indexOf(ot);if(it===-1){for(let xt=0;xt<x.length;xt++)if(xt>=_.length){_.push(ot),it=xt;break}else if(_[xt]===null){_[xt]=ot,it=xt;break}if(it===-1)break}const dt=x[it];dt&&dt.connect(ot)}}const V=new O,j=new O;function z(N,tt,ot){V.setFromMatrixPosition(tt.matrixWorld),j.setFromMatrixPosition(ot.matrixWorld);const it=V.distanceTo(j),dt=tt.projectionMatrix.elements,xt=ot.projectionMatrix.elements,It=dt[14]/(dt[10]-1),ce=dt[14]/(dt[10]+1),Gt=(dt[9]+1)/dt[5],se=(dt[9]-1)/dt[5],W=(dt[8]-1)/dt[0],nn=(xt[8]+1)/xt[0],Yt=It*W,Kt=It*nn,Lt=it/(-W+nn),ge=Lt*-W;if(tt.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ge),N.translateZ(Lt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),dt[10]===-1)N.projectionMatrix.copy(tt.projectionMatrix),N.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Dt=It+Lt,I=ce+Lt,A=Yt-ge,K=Kt+(it-ge),rt=Gt*ce/I*Dt,lt=se*ce/I*Dt;N.projectionMatrix.makePerspective(A,K,rt,lt,Dt,I),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function F(N,tt){tt===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(tt.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let tt=N.near,ot=N.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(ot=v.depthFar)),y.near=w.near=E.near=tt,y.far=w.far=E.far=ot,(S!==y.near||L!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,L=y.far),E.layers.mask=N.layers.mask|2,w.layers.mask=N.layers.mask|4,y.layers.mask=E.layers.mask|w.layers.mask;const it=N.parent,dt=y.cameras;F(y,it);for(let xt=0;xt<dt.length;xt++)F(dt[xt],it);dt.length===2?z(y,E,w):y.projectionMatrix.copy(E.projectionMatrix),H(N,y,it)};function H(N,tt,ot){ot===null?N.matrix.copy(tt.matrixWorld):(N.matrix.copy(ot.matrixWorld),N.matrix.invert(),N.matrix.multiply(tt.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(tt.projectionMatrix),N.projectionMatrixInverse.copy(tt.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Bl*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(N){l=N,d!==null&&(d.fixedFoveation=N),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=N)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let Y=null;function Q(N,tt){if(h=tt.getViewerPose(c||a),g=tt,h!==null){const ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let it=!1;ot.length!==y.cameras.length&&(y.cameras.length=0,it=!0);for(let xt=0;xt<ot.length;xt++){const It=ot[xt];let ce=null;if(f!==null)ce=f.getViewport(It);else{const se=u.getViewSubImage(d,It);ce=se.viewport,xt===0&&(t.setRenderTargetTextures(M,se.colorTexture,d.ignoreDepthValues?void 0:se.depthStencilTexture),t.setRenderTarget(M))}let Gt=b[xt];Gt===void 0&&(Gt=new bn,Gt.layers.enable(xt),Gt.viewport=new Ie,b[xt]=Gt),Gt.matrix.fromArray(It.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(It.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ce.x,ce.y,ce.width,ce.height),xt===0&&(y.matrix.copy(Gt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),it===!0&&y.cameras.push(Gt)}const dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")){const xt=u.getDepthInformation(ot[0]);xt&&xt.isValid&&xt.texture&&v.init(t,xt,s.renderState)}}for(let ot=0;ot<x.length;ot++){const it=_[ot],dt=x[ot];it!==null&&dt!==void 0&&dt.update(it,tt,c||a)}Y&&Y(N,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}const et=new du;et.setAnimationLoop(Q),this.setAnimationLoop=function(N){Y=N},this.dispose=function(){}}}const Oi=new vn,G1=new qt;function V1(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,lu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),x=M.envMap,_=M.envMapRotation;x&&(m.envMap.value=x,Oi.copy(_),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),m.envMapRotation.value.setFromMatrix4(G1.makeRotationFromEuler(Oi)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function W1(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){const _=x.program;i.uniformBlockBinding(M,_)}function c(M,x){let _=s[M.id];_===void 0&&(g(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",m));const P=x.program;i.updateUBOMapping(M,P);const T=t.render.frame;r[M.id]!==T&&(d(M),r[M.id]=T)}function h(M){const x=u();M.__bindingPointIndex=x;const _=n.createBuffer(),P=M.__size,T=M.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,P,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,_),_}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=s[M.id],_=M.uniforms,P=M.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let T=0,E=_.length;T<E;T++){const w=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,y=w.length;b<y;b++){const S=w[b];if(f(S,T,b,P)===!0){const L=S.__offset,U=Array.isArray(S.value)?S.value:[S.value];let D=0;for(let B=0;B<U.length;B++){const V=U[B],j=v(V);typeof V=="number"||typeof V=="boolean"?(S.__data[0]=V,n.bufferSubData(n.UNIFORM_BUFFER,L+D,S.__data)):V.isMatrix3?(S.__data[0]=V.elements[0],S.__data[1]=V.elements[1],S.__data[2]=V.elements[2],S.__data[3]=0,S.__data[4]=V.elements[3],S.__data[5]=V.elements[4],S.__data[6]=V.elements[5],S.__data[7]=0,S.__data[8]=V.elements[6],S.__data[9]=V.elements[7],S.__data[10]=V.elements[8],S.__data[11]=0):(V.toArray(S.__data,D),D+=j.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,S.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(M,x,_,P){const T=M.value,E=x+"_"+_;if(P[E]===void 0)return typeof T=="number"||typeof T=="boolean"?P[E]=T:P[E]=T.clone(),!0;{const w=P[E];if(typeof T=="number"||typeof T=="boolean"){if(w!==T)return P[E]=T,!0}else if(w.equals(T)===!1)return w.copy(T),!0}return!1}function g(M){const x=M.uniforms;let _=0;const P=16;for(let E=0,w=x.length;E<w;E++){const b=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,S=b.length;y<S;y++){const L=b[y],U=Array.isArray(L.value)?L.value:[L.value];for(let D=0,B=U.length;D<B;D++){const V=U[D],j=v(V),z=_%P,F=z%j.boundary,H=z+F;_+=F,H!==0&&P-H<j.storage&&(_+=P-H),L.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=_,_+=j.storage}}}const T=_%P;return T>0&&(_+=P-T),M.__size=_,M.__cache={},this}function v(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const M in s)n.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class q1{constructor(t={}){const{canvas:e=Up(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const g=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const M=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=on,this.toneMapping=Ci,this.toneMappingExposure=1;const _=this;let P=!1,T=0,E=0,w=null,b=-1,y=null;const S=new Ie,L=new Ie;let U=null;const D=new Pt(0);let B=0,V=e.width,j=e.height,z=1,F=null,H=null;const Y=new Ie(0,0,V,j),Q=new Ie(0,0,V,j);let et=!1;const N=new uc;let tt=!1,ot=!1;const it=new qt,dt=new qt,xt=new O,It=new Ie,ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function se(){return w===null?z:1}let W=i;function nn(C,q){return e.getContext(C,q)}try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sc}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),W===null){const q="webgl2";if(W=nn(q,C),W===null)throw nn(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Yt,Kt,Lt,ge,Dt,I,A,K,rt,lt,st,Ct,pt,yt,ee,ct,bt,Ut,Nt,St,Qt,Vt,pe,G;function ft(){Yt=new Zg(W),Yt.init(),Vt=new k1(W,Yt),Kt=new qg(W,Yt,t,Vt),Lt=new L1(W,Yt),Kt.reverseDepthBuffer&&d&&Lt.buffers.depth.setReversed(!0),ge=new tv(W),Dt=new x1,I=new U1(W,Yt,Lt,Dt,Kt,Vt,ge),A=new $g(_),K=new jg(_),rt=new o0(W),pe=new Vg(W,rt),lt=new Jg(W,rt,ge,pe),st=new nv(W,lt,rt,ge),Nt=new ev(W,Kt,I),ct=new Xg(Dt),Ct=new v1(_,A,K,Yt,Kt,pe,ct),pt=new V1(_,Dt),yt=new M1,ee=new A1(Yt),Ut=new Gg(_,A,K,Lt,st,f,l),bt=new P1(_,st,Kt),G=new W1(W,ge,Kt,Lt),St=new Wg(W,Yt,ge),Qt=new Qg(W,Yt,ge),ge.programs=Ct.programs,_.capabilities=Kt,_.extensions=Yt,_.properties=Dt,_.renderLists=yt,_.shadowMap=bt,_.state=Lt,_.info=ge}ft();const nt=new H1(_,W);this.xr=nt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const C=Yt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Yt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(V,j,!1))},this.getSize=function(C){return C.set(V,j)},this.setSize=function(C,q,Z=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=C,j=q,e.width=Math.floor(C*z),e.height=Math.floor(q*z),Z===!0&&(e.style.width=C+"px",e.style.height=q+"px"),this.setViewport(0,0,C,q)},this.getDrawingBufferSize=function(C){return C.set(V*z,j*z).floor()},this.setDrawingBufferSize=function(C,q,Z){V=C,j=q,z=Z,e.width=Math.floor(C*Z),e.height=Math.floor(q*Z),this.setViewport(0,0,C,q)},this.getCurrentViewport=function(C){return C.copy(S)},this.getViewport=function(C){return C.copy(Y)},this.setViewport=function(C,q,Z,J){C.isVector4?Y.set(C.x,C.y,C.z,C.w):Y.set(C,q,Z,J),Lt.viewport(S.copy(Y).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,q,Z,J){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,q,Z,J),Lt.scissor(L.copy(Q).multiplyScalar(z).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(C){Lt.setScissorTest(et=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(C=!0,q=!0,Z=!0){let J=0;if(C){let X=!1;if(w!==null){const ht=w.texture.format;X=ht===hc||ht===cc||ht===lc}if(X){const ht=w.texture.type,gt=ht===Kn||ht===is||ht===br||ht===Xs||ht===ac||ht===oc,Tt=Ut.getClearColor(),At=Ut.getClearAlpha(),zt=Tt.r,Ot=Tt.g,wt=Tt.b;gt?(g[0]=zt,g[1]=Ot,g[2]=wt,g[3]=At,W.clearBufferuiv(W.COLOR,0,g)):(v[0]=zt,v[1]=Ot,v[2]=wt,v[3]=At,W.clearBufferiv(W.COLOR,0,v))}else J|=W.COLOR_BUFFER_BIT}q&&(J|=W.DEPTH_BUFFER_BIT),Z&&(J|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),yt.dispose(),ee.dispose(),Dt.dispose(),A.dispose(),K.dispose(),st.dispose(),pe.dispose(),G.dispose(),Ct.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",bc),nt.removeEventListener("sessionend",Sc),Di.stop()};function at(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const C=ge.autoReset,q=bt.enabled,Z=bt.autoUpdate,J=bt.needsUpdate,X=bt.type;ft(),ge.autoReset=C,bt.enabled=q,bt.autoUpdate=Z,bt.needsUpdate=J,bt.type=X}function mt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ft(C){const q=C.target;q.removeEventListener("dispose",Ft),Ce(q)}function Ce(C){Xe(C),Dt.remove(C)}function Xe(C){const q=Dt.get(C).programs;q!==void 0&&(q.forEach(function(Z){Ct.releaseProgram(Z)}),C.isShaderMaterial&&Ct.releaseShaderCache(C))}this.renderBufferDirect=function(C,q,Z,J,X,ht){q===null&&(q=ce);const gt=X.isMesh&&X.matrixWorld.determinant()<0,Tt=Ku(C,q,Z,J,X);Lt.setMaterial(J,gt);let At=Z.index,zt=1;if(J.wireframe===!0){if(At=lt.getWireframeAttribute(Z),At===void 0)return;zt=2}const Ot=Z.drawRange,wt=Z.attributes.position;let ie=Ot.start*zt,me=(Ot.start+Ot.count)*zt;ht!==null&&(ie=Math.max(ie,ht.start*zt),me=Math.min(me,(ht.start+ht.count)*zt)),At!==null?(ie=Math.max(ie,0),me=Math.min(me,At.count)):wt!=null&&(ie=Math.max(ie,0),me=Math.min(me,wt.count));const ve=me-ie;if(ve<0||ve===1/0)return;pe.setup(X,J,Tt,Z,At);let sn,re=St;if(At!==null&&(sn=rt.get(At),re=Qt,re.setIndex(sn)),X.isMesh)J.wireframe===!0?(Lt.setLineWidth(J.wireframeLinewidth*se()),re.setMode(W.LINES)):re.setMode(W.TRIANGLES);else if(X.isLine){let Rt=J.linewidth;Rt===void 0&&(Rt=1),Lt.setLineWidth(Rt*se()),X.isLineSegments?re.setMode(W.LINES):X.isLineLoop?re.setMode(W.LINE_LOOP):re.setMode(W.LINE_STRIP)}else X.isPoints?re.setMode(W.POINTS):X.isSprite&&re.setMode(W.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)re.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(Yt.get("WEBGL_multi_draw"))re.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Rt=X._multiDrawStarts,Zn=X._multiDrawCounts,ae=X._multiDrawCount,wn=At?rt.get(At).bytesPerElement:1,ls=Dt.get(J).currentProgram.getUniforms();for(let dn=0;dn<ae;dn++)ls.setValue(W,"_gl_DrawID",dn),re.render(Rt[dn]/wn,Zn[dn])}else if(X.isInstancedMesh)re.renderInstances(ie,ve,X.count);else if(Z.isInstancedBufferGeometry){const Rt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Zn=Math.min(Z.instanceCount,Rt);re.renderInstances(ie,ve,Zn)}else re.render(ie,ve)};function he(C,q,Z){C.transparent===!0&&C.side===oi&&C.forceSinglePass===!1?(C.side=tn,C.needsUpdate=!0,kr(C,q,Z),C.side=Pi,C.needsUpdate=!0,kr(C,q,Z),C.side=oi):kr(C,q,Z)}this.compile=function(C,q,Z=null){Z===null&&(Z=C),p=ee.get(Z),p.init(q),x.push(p),Z.traverseVisible(function(X){X.isLight&&X.layers.test(q.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),C!==Z&&C.traverseVisible(function(X){X.isLight&&X.layers.test(q.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();const J=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ht=X.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){const Tt=ht[gt];he(Tt,Z,X),J.add(Tt)}else he(ht,Z,X),J.add(ht)}),x.pop(),p=null,J},this.compileAsync=function(C,q,Z=null){const J=this.compile(C,q,Z);return new Promise(X=>{function ht(){if(J.forEach(function(gt){Dt.get(gt).currentProgram.isReady()&&J.delete(gt)}),J.size===0){X(C);return}setTimeout(ht,10)}Yt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let An=null;function jn(C){An&&An(C)}function bc(){Di.stop()}function Sc(){Di.start()}const Di=new du;Di.setAnimationLoop(jn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(C){An=C,nt.setAnimationLoop(C),C===null?Di.stop():Di.start()},nt.addEventListener("sessionstart",bc),nt.addEventListener("sessionend",Sc),this.render=function(C,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(q),q=nt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,q,w),p=ee.get(C,x.length),p.init(q),x.push(p),dt.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),N.setFromProjectionMatrix(dt),ot=this.localClippingEnabled,tt=ct.init(this.clippingPlanes,ot),m=yt.get(C,M.length),m.init(),M.push(m),nt.enabled===!0&&nt.isPresenting===!0){const ht=_.xr.getDepthSensingMesh();ht!==null&&no(ht,q,-1/0,_.sortObjects)}no(C,q,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(F,H),Gt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Gt&&Ut.addToRenderList(m,C),this.info.render.frame++,tt===!0&&ct.beginShadows();const Z=p.state.shadowsArray;bt.render(Z,C,q),tt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=m.opaque,X=m.transmissive;if(p.setupLights(),q.isArrayCamera){const ht=q.cameras;if(X.length>0)for(let gt=0,Tt=ht.length;gt<Tt;gt++){const At=ht[gt];Tc(J,X,C,At)}Gt&&Ut.render(C);for(let gt=0,Tt=ht.length;gt<Tt;gt++){const At=ht[gt];Ec(m,C,At,At.viewport)}}else X.length>0&&Tc(J,X,C,q),Gt&&Ut.render(C),Ec(m,C,q);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(_,C,q),pe.resetDefaultState(),b=-1,y=null,x.pop(),x.length>0?(p=x[x.length-1],tt===!0&&ct.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function no(C,q,Z,J){if(C.visible===!1)return;if(C.layers.test(q.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(q);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||N.intersectsSprite(C)){J&&It.setFromMatrixPosition(C.matrixWorld).applyMatrix4(dt);const gt=st.update(C),Tt=C.material;Tt.visible&&m.push(C,gt,Tt,Z,It.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||N.intersectsObject(C))){const gt=st.update(C),Tt=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),It.copy(C.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),It.copy(gt.boundingSphere.center)),It.applyMatrix4(C.matrixWorld).applyMatrix4(dt)),Array.isArray(Tt)){const At=gt.groups;for(let zt=0,Ot=At.length;zt<Ot;zt++){const wt=At[zt],ie=Tt[wt.materialIndex];ie&&ie.visible&&m.push(C,gt,ie,Z,It.z,wt)}}else Tt.visible&&m.push(C,gt,Tt,Z,It.z,null)}}const ht=C.children;for(let gt=0,Tt=ht.length;gt<Tt;gt++)no(ht[gt],q,Z,J)}function Ec(C,q,Z,J){const X=C.opaque,ht=C.transmissive,gt=C.transparent;p.setupLightsView(Z),tt===!0&&ct.setGlobalState(_.clippingPlanes,Z),J&&Lt.viewport(S.copy(J)),X.length>0&&Ur(X,q,Z),ht.length>0&&Ur(ht,q,Z),gt.length>0&&Ur(gt,q,Z),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Tc(C,q,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new ss(1,1,{generateMipmaps:!0,type:Yt.has("EXT_color_buffer_half_float")||Yt.has("EXT_color_buffer_float")?Ir:Kn,minFilter:Qi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const ht=p.state.transmissionRenderTarget[J.id],gt=J.viewport||S;ht.setSize(gt.z,gt.w);const Tt=_.getRenderTarget();_.setRenderTarget(ht),_.getClearColor(D),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),Gt&&Ut.render(Z);const At=_.toneMapping;_.toneMapping=Ci;const zt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),tt===!0&&ct.setGlobalState(_.clippingPlanes,J),Ur(C,Z,J),I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht),Yt.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let wt=0,ie=q.length;wt<ie;wt++){const me=q[wt],ve=me.object,sn=me.geometry,re=me.material,Rt=me.group;if(re.side===oi&&ve.layers.test(J.layers)){const Zn=re.side;re.side=tn,re.needsUpdate=!0,Ac(ve,Z,J,sn,re,Rt),re.side=Zn,re.needsUpdate=!0,Ot=!0}}Ot===!0&&(I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht))}_.setRenderTarget(Tt),_.setClearColor(D,B),zt!==void 0&&(J.viewport=zt),_.toneMapping=At}function Ur(C,q,Z){const J=q.isScene===!0?q.overrideMaterial:null;for(let X=0,ht=C.length;X<ht;X++){const gt=C[X],Tt=gt.object,At=gt.geometry,zt=J===null?gt.material:J,Ot=gt.group;Tt.layers.test(Z.layers)&&Ac(Tt,q,Z,At,zt,Ot)}}function Ac(C,q,Z,J,X,ht){C.onBeforeRender(_,q,Z,J,X,ht),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(_,q,Z,J,C,ht),X.transparent===!0&&X.side===oi&&X.forceSinglePass===!1?(X.side=tn,X.needsUpdate=!0,_.renderBufferDirect(Z,q,J,X,C,ht),X.side=Pi,X.needsUpdate=!0,_.renderBufferDirect(Z,q,J,X,C,ht),X.side=oi):_.renderBufferDirect(Z,q,J,X,C,ht),C.onAfterRender(_,q,Z,J,X,ht)}function kr(C,q,Z){q.isScene!==!0&&(q=ce);const J=Dt.get(C),X=p.state.lights,ht=p.state.shadowsArray,gt=X.state.version,Tt=Ct.getParameters(C,X.state,ht,q,Z),At=Ct.getProgramCacheKey(Tt);let zt=J.programs;J.environment=C.isMeshStandardMaterial?q.environment:null,J.fog=q.fog,J.envMap=(C.isMeshStandardMaterial?K:A).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?q.environmentRotation:C.envMapRotation,zt===void 0&&(C.addEventListener("dispose",Ft),zt=new Map,J.programs=zt);let Ot=zt.get(At);if(Ot!==void 0){if(J.currentProgram===Ot&&J.lightsStateVersion===gt)return Cc(C,Tt),Ot}else Tt.uniforms=Ct.getUniforms(C),C.onBeforeCompile(Tt,_),Ot=Ct.acquireProgram(Tt,At),zt.set(At,Ot),J.uniforms=Tt.uniforms;const wt=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(wt.clippingPlanes=ct.uniform),Cc(C,Tt),J.needsLights=Zu(C),J.lightsStateVersion=gt,J.needsLights&&(wt.ambientLightColor.value=X.state.ambient,wt.lightProbe.value=X.state.probe,wt.directionalLights.value=X.state.directional,wt.directionalLightShadows.value=X.state.directionalShadow,wt.spotLights.value=X.state.spot,wt.spotLightShadows.value=X.state.spotShadow,wt.rectAreaLights.value=X.state.rectArea,wt.ltc_1.value=X.state.rectAreaLTC1,wt.ltc_2.value=X.state.rectAreaLTC2,wt.pointLights.value=X.state.point,wt.pointLightShadows.value=X.state.pointShadow,wt.hemisphereLights.value=X.state.hemi,wt.directionalShadowMap.value=X.state.directionalShadowMap,wt.directionalShadowMatrix.value=X.state.directionalShadowMatrix,wt.spotShadowMap.value=X.state.spotShadowMap,wt.spotLightMatrix.value=X.state.spotLightMatrix,wt.spotLightMap.value=X.state.spotLightMap,wt.pointShadowMap.value=X.state.pointShadowMap,wt.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=Ot,J.uniformsList=null,Ot}function wc(C){if(C.uniformsList===null){const q=C.currentProgram.getUniforms();C.uniformsList=Ca.seqWithValue(q.seq,C.uniforms)}return C.uniformsList}function Cc(C,q){const Z=Dt.get(C);Z.outputColorSpace=q.outputColorSpace,Z.batching=q.batching,Z.batchingColor=q.batchingColor,Z.instancing=q.instancing,Z.instancingColor=q.instancingColor,Z.instancingMorph=q.instancingMorph,Z.skinning=q.skinning,Z.morphTargets=q.morphTargets,Z.morphNormals=q.morphNormals,Z.morphColors=q.morphColors,Z.morphTargetsCount=q.morphTargetsCount,Z.numClippingPlanes=q.numClippingPlanes,Z.numIntersection=q.numClipIntersection,Z.vertexAlphas=q.vertexAlphas,Z.vertexTangents=q.vertexTangents,Z.toneMapping=q.toneMapping}function Ku(C,q,Z,J,X){q.isScene!==!0&&(q=ce),I.resetTextureUnits();const ht=q.fog,gt=J.isMeshStandardMaterial?q.environment:null,Tt=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:js,At=(J.isMeshStandardMaterial?K:A).get(J.envMap||gt),zt=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ot=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),wt=!!Z.morphAttributes.position,ie=!!Z.morphAttributes.normal,me=!!Z.morphAttributes.color;let ve=Ci;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ve=_.toneMapping);const sn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,re=sn!==void 0?sn.length:0,Rt=Dt.get(J),Zn=p.state.lights;if(tt===!0&&(ot===!0||C!==y)){const xn=C===y&&J.id===b;ct.setState(J,C,xn)}let ae=!1;J.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Zn.state.version||Rt.outputColorSpace!==Tt||X.isBatchedMesh&&Rt.batching===!1||!X.isBatchedMesh&&Rt.batching===!0||X.isBatchedMesh&&Rt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Rt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Rt.instancing===!1||!X.isInstancedMesh&&Rt.instancing===!0||X.isSkinnedMesh&&Rt.skinning===!1||!X.isSkinnedMesh&&Rt.skinning===!0||X.isInstancedMesh&&Rt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Rt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Rt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Rt.instancingMorph===!1&&X.morphTexture!==null||Rt.envMap!==At||J.fog===!0&&Rt.fog!==ht||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==ct.numPlanes||Rt.numIntersection!==ct.numIntersection)||Rt.vertexAlphas!==zt||Rt.vertexTangents!==Ot||Rt.morphTargets!==wt||Rt.morphNormals!==ie||Rt.morphColors!==me||Rt.toneMapping!==ve||Rt.morphTargetsCount!==re)&&(ae=!0):(ae=!0,Rt.__version=J.version);let wn=Rt.currentProgram;ae===!0&&(wn=kr(J,q,X));let ls=!1,dn=!1,nr=!1;const xe=wn.getUniforms(),On=Rt.uniforms;if(Lt.useProgram(wn.program)&&(ls=!0,dn=!0,nr=!0),J.id!==b&&(b=J.id,dn=!0),ls||y!==C){Lt.buffers.depth.getReversed()?(it.copy(C.projectionMatrix),Np(it),zp(it),xe.setValue(W,"projectionMatrix",it)):xe.setValue(W,"projectionMatrix",C.projectionMatrix),xe.setValue(W,"viewMatrix",C.matrixWorldInverse);const pi=xe.map.cameraPosition;pi!==void 0&&pi.setValue(W,xt.setFromMatrixPosition(C.matrixWorld)),Kt.logarithmicDepthBuffer&&xe.setValue(W,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&xe.setValue(W,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,dn=!0,nr=!0)}if(X.isSkinnedMesh){xe.setOptional(W,X,"bindMatrix"),xe.setOptional(W,X,"bindMatrixInverse");const xn=X.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),xe.setValue(W,"boneTexture",xn.boneTexture,I))}X.isBatchedMesh&&(xe.setOptional(W,X,"batchingTexture"),xe.setValue(W,"batchingTexture",X._matricesTexture,I),xe.setOptional(W,X,"batchingIdTexture"),xe.setValue(W,"batchingIdTexture",X._indirectTexture,I),xe.setOptional(W,X,"batchingColorTexture"),X._colorsTexture!==null&&xe.setValue(W,"batchingColorTexture",X._colorsTexture,I));const ir=Z.morphAttributes;if((ir.position!==void 0||ir.normal!==void 0||ir.color!==void 0)&&Nt.update(X,Z,wn),(dn||Rt.receiveShadow!==X.receiveShadow)&&(Rt.receiveShadow=X.receiveShadow,xe.setValue(W,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(On.envMap.value=At,On.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&q.environment!==null&&(On.envMapIntensity.value=q.environmentIntensity),dn&&(xe.setValue(W,"toneMappingExposure",_.toneMappingExposure),Rt.needsLights&&ju(On,nr),ht&&J.fog===!0&&pt.refreshFogUniforms(On,ht),pt.refreshMaterialUniforms(On,J,z,j,p.state.transmissionRenderTarget[C.id]),Ca.upload(W,wc(Rt),On,I)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ca.upload(W,wc(Rt),On,I),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&xe.setValue(W,"center",X.center),xe.setValue(W,"modelViewMatrix",X.modelViewMatrix),xe.setValue(W,"normalMatrix",X.normalMatrix),xe.setValue(W,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const xn=J.uniformsGroups;for(let pi=0,mi=xn.length;pi<mi;pi++){const Rc=xn[pi];G.update(Rc,wn),G.bind(Rc,wn)}}return wn}function ju(C,q){C.ambientLightColor.needsUpdate=q,C.lightProbe.needsUpdate=q,C.directionalLights.needsUpdate=q,C.directionalLightShadows.needsUpdate=q,C.pointLights.needsUpdate=q,C.pointLightShadows.needsUpdate=q,C.spotLights.needsUpdate=q,C.spotLightShadows.needsUpdate=q,C.rectAreaLights.needsUpdate=q,C.hemisphereLights.needsUpdate=q}function Zu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,q,Z){Dt.get(C.texture).__webglTexture=q,Dt.get(C.depthTexture).__webglTexture=Z;const J=Dt.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||Yt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,q){const Z=Dt.get(C);Z.__webglFramebuffer=q,Z.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(C,q=0,Z=0){w=C,T=q,E=Z;let J=!0,X=null,ht=!1,gt=!1;if(C){const At=Dt.get(C);if(At.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(W.FRAMEBUFFER,null),J=!1;else if(At.__webglFramebuffer===void 0)I.setupRenderTarget(C);else if(At.__hasExternalTextures)I.rebindTextures(C,Dt.get(C.texture).__webglTexture,Dt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const wt=C.depthTexture;if(At.__boundDepthTexture!==wt){if(wt!==null&&Dt.has(wt)&&(C.width!==wt.image.width||C.height!==wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(C)}}const zt=C.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(gt=!0);const Ot=Dt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ot[q])?X=Ot[q][Z]:X=Ot[q],ht=!0):C.samples>0&&I.useMultisampledRTT(C)===!1?X=Dt.get(C).__webglMultisampledFramebuffer:Array.isArray(Ot)?X=Ot[Z]:X=Ot,S.copy(C.viewport),L.copy(C.scissor),U=C.scissorTest}else S.copy(Y).multiplyScalar(z).floor(),L.copy(Q).multiplyScalar(z).floor(),U=et;if(Lt.bindFramebuffer(W.FRAMEBUFFER,X)&&J&&Lt.drawBuffers(C,X),Lt.viewport(S),Lt.scissor(L),Lt.setScissorTest(U),ht){const At=Dt.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+q,At.__webglTexture,Z)}else if(gt){const At=Dt.get(C.texture),zt=q||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,At.__webglTexture,Z||0,zt)}b=-1},this.readRenderTargetPixels=function(C,q,Z,J,X,ht,gt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=Dt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Tt=Tt[gt]),Tt){Lt.bindFramebuffer(W.FRAMEBUFFER,Tt);try{const At=C.texture,zt=At.format,Ot=At.type;if(!Kt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=C.width-J&&Z>=0&&Z<=C.height-X&&W.readPixels(q,Z,J,X,Vt.convert(zt),Vt.convert(Ot),ht)}finally{const At=w!==null?Dt.get(w).__webglFramebuffer:null;Lt.bindFramebuffer(W.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(C,q,Z,J,X,ht,gt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=Dt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Tt=Tt[gt]),Tt){const At=C.texture,zt=At.format,Ot=At.type;if(!Kt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=C.width-J&&Z>=0&&Z<=C.height-X){Lt.bindFramebuffer(W.FRAMEBUFFER,Tt);const wt=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,wt),W.bufferData(W.PIXEL_PACK_BUFFER,ht.byteLength,W.STREAM_READ),W.readPixels(q,Z,J,X,Vt.convert(zt),Vt.convert(Ot),0);const ie=w!==null?Dt.get(w).__webglFramebuffer:null;Lt.bindFramebuffer(W.FRAMEBUFFER,ie);const me=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await kp(W,me,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,wt),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,ht),W.deleteBuffer(wt),W.deleteSync(me),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,q=null,Z=0){C.isTexture!==!0&&(gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Z),X=Math.floor(C.image.width*J),ht=Math.floor(C.image.height*J),gt=q!==null?q.x:0,Tt=q!==null?q.y:0;I.setTexture2D(C,0),W.copyTexSubImage2D(W.TEXTURE_2D,Z,0,0,gt,Tt,X,ht),Lt.unbindTexture()},this.copyTextureToTexture=function(C,q,Z=null,J=null,X=0){C.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],q=arguments[2],X=arguments[3]||0,Z=null);let ht,gt,Tt,At,zt,Ot,wt,ie,me;const ve=C.isCompressedTexture?C.mipmaps[X]:C.image;Z!==null?(ht=Z.max.x-Z.min.x,gt=Z.max.y-Z.min.y,Tt=Z.isBox3?Z.max.z-Z.min.z:1,At=Z.min.x,zt=Z.min.y,Ot=Z.isBox3?Z.min.z:0):(ht=ve.width,gt=ve.height,Tt=ve.depth||1,At=0,zt=0,Ot=0),J!==null?(wt=J.x,ie=J.y,me=J.z):(wt=0,ie=0,me=0);const sn=Vt.convert(q.format),re=Vt.convert(q.type);let Rt;q.isData3DTexture?(I.setTexture3D(q,0),Rt=W.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(I.setTexture2DArray(q,0),Rt=W.TEXTURE_2D_ARRAY):(I.setTexture2D(q,0),Rt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,q.unpackAlignment);const Zn=W.getParameter(W.UNPACK_ROW_LENGTH),ae=W.getParameter(W.UNPACK_IMAGE_HEIGHT),wn=W.getParameter(W.UNPACK_SKIP_PIXELS),ls=W.getParameter(W.UNPACK_SKIP_ROWS),dn=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,ve.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ve.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,At),W.pixelStorei(W.UNPACK_SKIP_ROWS,zt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Ot);const nr=C.isDataArrayTexture||C.isData3DTexture,xe=q.isDataArrayTexture||q.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const On=Dt.get(C),ir=Dt.get(q),xn=Dt.get(On.__renderTarget),pi=Dt.get(ir.__renderTarget);Lt.bindFramebuffer(W.READ_FRAMEBUFFER,xn.__webglFramebuffer),Lt.bindFramebuffer(W.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Tt;mi++)nr&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Dt.get(C).__webglTexture,X,Ot+mi),C.isDepthTexture?(xe&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Dt.get(q).__webglTexture,X,me+mi),W.blitFramebuffer(At,zt,ht,gt,wt,ie,ht,gt,W.DEPTH_BUFFER_BIT,W.NEAREST)):xe?W.copyTexSubImage3D(Rt,X,wt,ie,me+mi,At,zt,ht,gt):W.copyTexSubImage2D(Rt,X,wt,ie,me+mi,At,zt,ht,gt);Lt.bindFramebuffer(W.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else xe?C.isDataTexture||C.isData3DTexture?W.texSubImage3D(Rt,X,wt,ie,me,ht,gt,Tt,sn,re,ve.data):q.isCompressedArrayTexture?W.compressedTexSubImage3D(Rt,X,wt,ie,me,ht,gt,Tt,sn,ve.data):W.texSubImage3D(Rt,X,wt,ie,me,ht,gt,Tt,sn,re,ve):C.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,X,wt,ie,ht,gt,sn,re,ve.data):C.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,X,wt,ie,ve.width,ve.height,sn,ve.data):W.texSubImage2D(W.TEXTURE_2D,X,wt,ie,ht,gt,sn,re,ve);W.pixelStorei(W.UNPACK_ROW_LENGTH,Zn),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ae),W.pixelStorei(W.UNPACK_SKIP_PIXELS,wn),W.pixelStorei(W.UNPACK_SKIP_ROWS,ls),W.pixelStorei(W.UNPACK_SKIP_IMAGES,dn),X===0&&q.generateMipmaps&&W.generateMipmap(Rt),Lt.unbindTexture()},this.copyTextureToTexture3D=function(C,q,Z=null,J=null,X=0){return C.isTexture!==!0&&(gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,C=arguments[2],q=arguments[3],X=arguments[4]||0),gr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,q,Z,J,X)},this.initRenderTarget=function(C){Dt.get(C).__webglFramebuffer===void 0&&I.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?I.setTextureCube(C,0):C.isData3DTexture?I.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?I.setTexture2DArray(C,0):I.setTexture2D(C,0),Lt.unbindTexture()},this.resetState=function(){T=0,E=0,w=null,Lt.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}class pc{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Pt(t),this.near=e,this.far=i}clone(){return new pc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class X1 extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class _u extends en{constructor(t=null,e=1,i=1,s,r,a,o,l,c=gn,h=gn,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zh extends Le{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Es=new qt,Fh=new qt,aa=[],Oh=new as,$1=new qt,hr=new Ne,dr=new Js;class Pe extends Ne{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new zh(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,$1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new as),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Es),Oh.copy(t.boundingBox).applyMatrix4(Es),this.boundingBox.union(Oh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Js),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Es),dr.copy(t.boundingSphere).applyMatrix4(Es),this.boundingSphere.union(dr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dr.copy(this.boundingSphere),dr.applyMatrix4(i),t.ray.intersectsSphere(dr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Es),Fh.multiplyMatrices(i,Es),hr.matrixWorld=Fh,hr.raycast(t,aa);for(let a=0,o=aa.length;a<o;a++){const l=aa[a];l.instanceId=r,l.object=this,e.push(l)}aa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new zh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new _u(new Float32Array(s*this.count),s,this.count,Ya,Vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Y1 extends os{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Bh=new qt,Gl=new ja,oa=new Js,la=new O;class Mu extends Ve{constructor(t=new De,e=new Y1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(s),oa.radius+=r,t.ray.intersectsSphere(oa)===!1)return;Bh.copy(s).invert(),Gl.copy(t.ray).applyMatrix4(Bh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,v=f;g<v;g++){const m=c.getX(g);la.fromBufferAttribute(u,m),Hh(la,m,l,s,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,v=f;g<v;g++)la.fromBufferAttribute(u,g),Hh(la,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Hh(n,t,e,i,s,r,a){const o=Gl.distanceSqToPoint(n);if(o<e){const l=new O;Gl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class fi extends De{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const v=[],m=i/2;let p=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new de(u,3)),this.setAttribute("normal",new de(d,3)),this.setAttribute("uv",new de(f,2));function M(){const _=new O,P=new O;let T=0;const E=(e-t)/i;for(let w=0;w<=r;w++){const b=[],y=w/r,S=y*(e-t)+t;for(let L=0;L<=s;L++){const U=L/s,D=U*l+o,B=Math.sin(D),V=Math.cos(D);P.x=S*B,P.y=-y*i+m,P.z=S*V,u.push(P.x,P.y,P.z),_.set(B,E,V).normalize(),d.push(_.x,_.y,_.z),f.push(U,1-y),b.push(g++)}v.push(b)}for(let w=0;w<s;w++)for(let b=0;b<r;b++){const y=v[b][w],S=v[b+1][w],L=v[b+1][w+1],U=v[b][w+1];(t>0||b!==0)&&(h.push(y,S,U),T+=3),(e>0||b!==r-1)&&(h.push(S,L,U),T+=3)}c.addGroup(p,T,0),p+=T}function x(_){const P=g,T=new Jt,E=new O;let w=0;const b=_===!0?t:e,y=_===!0?1:-1;for(let L=1;L<=s;L++)u.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const S=g;for(let L=0;L<=s;L++){const D=L/s*l+o,B=Math.cos(D),V=Math.sin(D);E.x=b*V,E.y=m*y,E.z=b*B,u.push(E.x,E.y,E.z),d.push(0,y,0),T.x=B*.5+.5,T.y=V*.5*y+.5,f.push(T.x,T.y),g++}for(let L=0;L<s;L++){const U=P+L,D=S+L;_===!0?h.push(D,D+1,U):h.push(D+1,D,U),w+=3}c.addGroup(p,w,_===!0?1:2),p+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sr extends fi{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Sr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ja extends De{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new de(r,3)),this.setAttribute("normal",new de(r.slice(),3)),this.setAttribute("uv",new de(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const x=new O,_=new O,P=new O;for(let T=0;T<e.length;T+=3)f(e[T+0],x),f(e[T+1],_),f(e[T+2],P),l(x,_,P,M)}function l(M,x,_,P){const T=P+1,E=[];for(let w=0;w<=T;w++){E[w]=[];const b=M.clone().lerp(_,w/T),y=x.clone().lerp(_,w/T),S=T-w;for(let L=0;L<=S;L++)L===0&&w===T?E[w][L]=b:E[w][L]=b.clone().lerp(y,L/S)}for(let w=0;w<T;w++)for(let b=0;b<2*(T-w)-1;b++){const y=Math.floor(b/2);b%2===0?(d(E[w][y+1]),d(E[w+1][y]),d(E[w][y])):(d(E[w][y+1]),d(E[w+1][y+1]),d(E[w+1][y]))}}function c(M){const x=new O;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(M),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function h(){const M=new O;for(let x=0;x<r.length;x+=3){M.x=r[x+0],M.y=r[x+1],M.z=r[x+2];const _=m(M)/2/Math.PI+.5,P=p(M)/Math.PI+.5;a.push(_,1-P)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const x=a[M+0],_=a[M+2],P=a[M+4],T=Math.max(x,_,P),E=Math.min(x,_,P);T>.9&&E<.1&&(x<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),P<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,x){const _=M*3;x.x=t[_+0],x.y=t[_+1],x.z=t[_+2]}function g(){const M=new O,x=new O,_=new O,P=new O,T=new Jt,E=new Jt,w=new Jt;for(let b=0,y=0;b<r.length;b+=9,y+=6){M.set(r[b+0],r[b+1],r[b+2]),x.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),T.set(a[y+0],a[y+1]),E.set(a[y+2],a[y+3]),w.set(a[y+4],a[y+5]),P.copy(M).add(x).add(_).divideScalar(3);const S=m(P);v(T,y+0,M,S),v(E,y+2,x,S),v(w,y+4,_,S)}}function v(M,x,_,P){P<0&&M.x===1&&(a[x]=M.x-1),_.x===0&&_.z===0&&(a[x]=P/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ja(t.vertices,t.indices,t.radius,t.details)}}class mc extends Ja{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mc(t.radius,t.detail)}}class Qa extends Ja{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Qa(t.radius,t.detail)}}class to extends De{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/s,f=new O,g=new Jt;for(let v=0;v<=s;v++){for(let m=0;m<=i;m++){const p=r+m/i*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let v=0;v<s;v++){const m=v*(i+1);for(let p=0;p<i;p++){const M=p+m,x=M,_=M+i+1,P=M+i+2,T=M+1;o.push(x,_,T),o.push(_,P,T)}}this.setIndex(o),this.setAttribute("position",new de(l,3)),this.setAttribute("normal",new de(c,3)),this.setAttribute("uv",new de(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new to(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Er extends De{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new O,d=new O,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const M=[],x=p/i;let _=0;p===0&&a===0?_=.5/e:p===i&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){const T=P/e;u.x=-t*Math.cos(s+T*r)*Math.sin(a+x*o),u.y=t*Math.cos(a+x*o),u.z=t*Math.sin(s+T*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(T+_,1-x),M.push(c++)}h.push(M)}for(let p=0;p<i;p++)for(let M=0;M<e;M++){const x=h[p][M+1],_=h[p][M],P=h[p+1][M],T=h[p+1][M+1];(p!==0||a>0)&&f.push(x,_,T),(p!==i-1||l<Math.PI)&&f.push(_,P,T)}this.setIndex(f),this.setAttribute("position",new de(g,3)),this.setAttribute("normal",new de(v,3)),this.setAttribute("uv",new de(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Er(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class gc extends De{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new O,u=new O,d=new O;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const v=g/s*r,m=f/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(v),u.y=(t+e*Math.cos(m))*Math.sin(v),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const v=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,M=(s+1)*f+g;a.push(v,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new de(o,3)),this.setAttribute("normal",new de(l,3)),this.setAttribute("uv",new de(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class K1 extends os{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Pt(16777215),this.specular=new Pt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Xa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ra extends os{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new Jt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Xa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yu extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class j1 extends yu{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ko=new qt,Gh=new O,Vh=new O;class Z1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Jt(512,512),this.map=null,this.mapPass=null,this.matrix=new qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uc,this._frameExtents=new Jt(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Gh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Gh),Vh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vh),e.updateMatrixWorld(),ko.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ko),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ko)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class J1 extends Z1{constructor(){super(new uu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Q1 extends yu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new J1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sc);const yn=n=>new Pt(n),Me={uTime:{value:0},uFow:{value:null},uFowOn:{value:1},uWorld:{value:256},uSnow:{value:0},uSnowColor:{value:yn("#f4f7fa")},uGrassA:{value:yn("#6fa84a")},uGrassB:{value:yn("#93c25a")},uLeaf:{value:1},uLeafColor:{value:yn("#6fae46")},uCrop:{value:.35},uCropColor:{value:yn("#86c457")},uFlower:{value:1},uFruit:{value:1},uShallow:{value:yn("#5cb8b2")},uDeep:{value:yn("#1f6079")}},bu=`
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`,tx=`
uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uTime;
uniform float uSnow; uniform vec3 uSnowColor; uniform vec3 uGrassA; uniform vec3 uGrassB; uniform vec3 uLeafColor; uniform vec3 uCropColor;
uniform vec3 uShallow; uniform vec3 uDeep;
varying vec3 vFowW;
#ifdef TERRAIN
varying vec2 vGrass;
#endif
#ifdef WATER
varying float vDepth;
#endif
float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`,Su=`
#ifdef CANOPY
  transformed *= mix(0.1, 1.0, uLeaf);
#endif
#ifdef CROP
  transformed.y *= max(uCrop, 0.02);
#endif
#ifdef FLOWER
  transformed *= uFlower;
#endif
#ifdef FRUIT
  transformed *= uFruit;
#endif
#ifdef WIND
  { vec3 ip = vec3(0.0);
  #ifdef USE_INSTANCING
    ip = instanceMatrix[3].xyz;
  #endif
    float ph = ip.x * 0.37 + ip.z * 0.23;
    float k = WIND_AMP * (WIND_BYH ? max(position.y, 0.0) : 1.0);
    transformed.x += sin(uTime * 1.7 + ph) * k; transformed.z += cos(uTime * 1.3 + ph * 1.3) * k * 0.6; }
#endif
#ifdef WATER
  transformed.y += sin(position.x * 0.55 + uTime * 1.2) * 0.06 + cos(position.z * 0.45 + uTime * 0.9) * 0.06;
  vDepth = aDepth;
#endif`,ex=`
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`,nx=`
#ifdef TERRAIN
  diffuseColor.rgb *= mix(vec3(1.0), mix(uGrassA, uGrassB, vGrass.y), vGrass.x);
#endif
#ifdef LEAF
  diffuseColor.rgb *= uLeafColor;
#endif
#ifdef GRASSTUFT
  diffuseColor.rgb *= mix(uGrassA, uGrassB, 0.45) * 1.08;
#endif
#ifdef CROPCOL
  diffuseColor.rgb *= uCropColor;
#endif
#ifdef WATER
  { float d = clamp(vDepth, 0.0, 3.0);
    diffuseColor.rgb = mix(uShallow, uDeep, smoothstep(0.1, 2.4, d));
    diffuseColor.a = mix(0.55, 0.92, smoothstep(0.0, 1.4, d));
    float foam = 1.0 - smoothstep(0.0, 0.32, d + (vn(vFowW.xz * 1.4 + uTime * 0.35) - 0.5) * 0.22);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.93, 0.95, 0.94), foam * 0.85);
    diffuseColor.a = max(diffuseColor.a, foam * 0.9); }
#endif`,ix=`
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`,sx=`
  { float cl = smoothstep(0.56, 0.86, vn(vFowW.xz * 0.017 + vec2(uTime * 0.011, uTime * 0.005)));
    gl_FragColor.rgb *= 1.0 - cl * 0.13;
    float f = texture2D(uFow, vFowW.xz / uWorld).r;
    float n = vn(vFowW.xz * 0.09 + uTime * 0.05);
    float vis = smoothstep(0.62, 0.93, f);
    float ex = smoothstep(0.07, 0.42, f + (n - 0.5) * 0.14);
    vec3 c = gl_FragColor.rgb;
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    vec3 exc = mix(vec3(l), c, 0.55) * 0.58 + vec3(0.010, 0.014, 0.022);
    vec3 un = c * 0.07 + vec3(0.016, 0.020, 0.030) * (0.8 + n * 0.5);
    gl_FragColor.rgb = mix(c, mix(mix(un, exc, ex), c, vis), uFowOn); }`;function vc(n,t={}){const e={SNOW_K:"1.0",WIND_AMP:"0.0",WIND_BYH:"false",...t};return n.defines=Object.assign(n.defines||{},e),n.onBeforeCompile=i=>{for(const s in Me)i.uniforms[s]=Me[s];i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
`+bu).replace("#include <begin_vertex>",`#include <begin_vertex>
`+Su).replace("#include <project_vertex>",`#include <project_vertex>
`+ex),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
`+tx).replace("#include <color_fragment>",`#include <color_fragment>
`+nx).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
`+ix).replace("#include <opaque_fragment>",`#include <opaque_fragment>
`+sx)},n.customProgramCacheKey=()=>JSON.stringify(e),n}function Eu(n){const t=new xu({depthPacking:Qd});return t.defines={WIND_AMP:"0.0",WIND_BYH:"false",...n},t.onBeforeCompile=e=>{for(const i in Me)e.uniforms[i]=Me[i];e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
`+bu).replace("#include <begin_vertex>",`#include <begin_vertex>
`+Su)},t.customProgramCacheKey=()=>"d"+JSON.stringify(n),t}const We=(n={},t={})=>vc(new Ra({flatShading:!0,...n}),t);function rx(n){const t=n.hn-1;n.hstep;const e=n.size,i=new Li(e,e,t,t).rotateX(-Math.PI/2).translate(e/2,0,e/2),s=i.attributes.position;for(let p=0;p<s.count;p++)s.setY(p,n.heights[p]);const r=i.toNonIndexed(),a=r.attributes.position,o=a.count,l=new Float32Array(o*3),c=new Float32Array(o*2),h={bed:[.42,.4,.31],sand:[.82,.74,.55],rock:[.55,.53,.49],rock2:[.64,.61,.55]},u=p=>new Pt().setRGB(p[0],p[1],p[2],on),d=Object.fromEntries(Object.entries(h).map(([p,M])=>[p,u(M)])),f=new O,g=new O,v=new O;for(let p=0;p<o;p+=3){f.fromBufferAttribute(a,p),g.fromBufferAttribute(a,p+1),v.fromBufferAttribute(a,p+2);const M=(f.x+g.x+v.x)/3,x=(f.y+g.y+v.y)/3,_=(f.z+g.z+v.z)/3,P=Math.min(e-1,Math.max(0,Math.floor(M))),T=Math.min(e-1,Math.max(0,Math.floor(_))),E=n.terrain[T*e+P],w=Math.abs(new O().subVectors(v,g).cross(new O().subVectors(f,g)).normalize().y),b=.93+(p*2654435761>>>0)/4294967296*.14,y=Rs(M*.045,_*.045,5,2);let S=null,L=0;if(x<-.45)S=d.bed;else if(E===La||E===Bs||E===Ri||x<.5)S=d.sand;else if(E===es||w<.66)S=x>6?d.rock2:d.rock;else{L=1;const U=.86+y*.3-Math.min(1,Math.max(0,(x-4)/12))*.08;S=new Pt(U,U,U)}for(let U=0;U<3;U++){const D=(p+U)*3;l[D]=S.r*b,l[D+1]=S.g*b,l[D+2]=S.b*b,c[(p+U)*2]=L,c[(p+U)*2+1]=y}}r.setAttribute("color",new Le(l,3)),r.setAttribute("aGrass",new Le(c,2)),r.computeVertexNormals();const m=new Ne(r,We({vertexColors:!0},{TERRAIN:""}));return m.receiveShadow=!0,m.castShadow=!0,m}function ax(n){const t=n.size,e=Math.round(t/1.6),i=new Li(t,t,e,e).rotateX(-Math.PI/2).translate(t/2,0,t/2),s=i.attributes.position,r=new Float32Array(s.count);for(let o=0;o<s.count;o++)r[o]=-$t(n,s.getX(o),s.getZ(o));i.setAttribute("aDepth",new Le(r,1));const a=new Ne(i,vc(new K1({color:16777215,specular:10475744,shininess:70,flatShading:!0,transparent:!0,depthWrite:!1}),{WATER:"",NO_SNOW:""}));return a.receiveShadow=!0,a.renderOrder=2,a}const En=Math.PI*2,Wh=new vn,qh=new Ii,Xh=new O,$h=new O,ca=new O,ha=new Pt;function k(n=0,t=0,e=0,i=0,s=1,r=1,a=1,o=0,l=0){return Wh.set(o,i,l,"YXZ"),qh.setFromEuler(Wh),Xh.set(n,t,e),$h.set(s,r,a),new qt().compose(Xh,qh,$h)}function ox(){const n=[-.5,0,.5,.5,0,.5,0,1,.5,.5,0,-.5,-.5,0,-.5,0,1,-.5,-.5,0,.5,0,1,.5,0,1,-.5,-.5,0,.5,0,1,-.5,-.5,0,-.5,.5,0,.5,.5,0,-.5,0,1,-.5,.5,0,.5,0,1,-.5,0,1,.5],t=new De;return t.setAttribute("position",new de(n,3)),t}const da={box:new Fe(1,1,1).translate(0,.5,0),cyl5:new fi(.5,.5,1,5).translate(0,.5,0),cyl8:new fi(.5,.5,1,8).translate(0,.5,0),cone4:new Sr(.5,1,4).translate(0,.5,0),cone7:new Sr(.5,1,7).translate(0,.5,0),ico:new Qa(.5,0),dode:new mc(.5,0),prism:ox()},_r={};for(const n in da)_r[n]=da[n].index?da[n].toNonIndexed():da[n];class xc{constructor(t=Math.random){R(this,"pos",[]);R(this,"col",[]);this.rand=t}add(t,e,i,s=.06){const r=_r[t],a=r.attributes.position;ha.set(e);const o=1+(this.rand()-.5)*s;for(let l=0;l<a.count;l++)ca.fromBufferAttribute(a,l).applyMatrix4(i),this.pos.push(ca.x,ca.y,ca.z),this.col.push(ha.r*o,ha.g*o,ha.b*o);return this}build(){const t=new De;return t.setAttribute("position",new de(this.pos,3)),t.setAttribute("color",new de(this.col,3)),t.computeVertexNormals(),t.computeBoundingSphere(),t}}const fe=n=>{const t=new xc;return n(t),t.build()};function Tu(n){let t=n>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const ua=new qt().makeScale(0,0,0);function lx(n){const t=new Wn,e=Tu(n.seed*7+1),i=n.size,s={oakT:fe(S=>{S.add("cyl5","#6b4a32",k(0,0,0,0,.36,1.8,.36)),S.add("cyl5","#634430",k(.12,1.1,0,0,.14,.8,.14,0,-.9))}),oakC:fe(S=>{S.add("ico","#ffffff",k(0,0,0,0,2.4,2,2.4)),S.add("ico","#e6e6e6",k(.75,-.3,.3,.6,1.6,1.35,1.6)),S.add("ico","#f3f3f3",k(-.65,.15,-.45,1.2,1.7,1.45,1.7))}),pineT:fe(S=>{S.add("cyl5","#6e4d36",k(0,0,0,0,.3,2.3,.3,0,.07)),S.add("cyl5","#6e4d36",k(-.15,2.18,0,0,.24,1.4,.24,0,-.2))}),pineC:fe(S=>{S.add("ico","#ffffff",k(0,0,0,0,3.7,1.15,3.5)),S.add("ico","#e8e8e8",k(.45,.4,.2,.5,2.5,.85,2.4))}),firT:fe(S=>S.add("cyl5","#5d4330",k(0,0,0,0,.26,.9,.26))),firC:fe(S=>{S.add("cone7","#ffffff",k(0,.6,0,0,2.3,1.9,2.3)),S.add("cone7","#ececec",k(0,1.55,0,.4,1.75,1.7,1.75)),S.add("cone7","#f6f6f6",k(0,2.4,0,.8,1.2,1.5,1.2))})},r=We({vertexColors:!0}),a=[{kind:yd,t:s.oakT,c:s.oakC,mat:We({vertexColors:!0},{LEAF:"",CANOPY:"",WIND:"",WIND_AMP:"0.07"}),cy:2.35,depth:{CANOPY:"",WIND:"",WIND_AMP:"0.07"},s:.55},{kind:Yo,t:s.pineT,c:s.pineC,mat:We({vertexColors:!0,color:"#56803e"},{WIND:"",WIND_AMP:"0.05"}),cy:3.45,depth:null,s:.5},{kind:bd,t:s.firT,c:s.firC,mat:We({vertexColors:!0,color:"#3e6a42"},{WIND:"",WIND_AMP:"0.02",WIND_BYH:"true"}),cy:0,depth:null,s:.5}],o=[],l=new Map,c=new Map,h=3,u=(S,L)=>Math.min(h-1,Math.floor(S/i*h))*h+Math.min(h-1,Math.floor(L/i*h));for(const S of a){const L=[];for(let D=0;D<i*i;D++)n.tree[D]===S.kind&&L.push(D);for(let D=L.length-1;D>0;D--){const B=Math.floor(e()*(D+1)),V=L[D];L[D]=L[B],L[B]=V}const U=Array.from({length:h*h},()=>[]);for(const D of L){const B=D%i+.5+(e()-.5)*.4,V=Math.floor(D/i)+.5+(e()-.5)*.4,j=$t(n,B,V),z=S.s*(.85+e()*.45),F=e()*En;U[u(B,V)].push({mt:k(B,j-.1,V,F,z,z,z),mc:k(B,j-.1+S.cy*z,V,F,z,z,z),c:new Pt(.85+e()*.3,.85+e()*.3,.8+e()*.25),k:D})}for(const D of U){if(!D.length)continue;const B=new Pe(S.t,r,D.length),V=new Pe(S.c,S.mat,D.length);D.forEach((j,z)=>{B.setMatrixAt(z,j.mt),V.setMatrixAt(z,j.mc),V.setColorAt(z,j.c),l.set(j.k,{t:B,c:V,i:z})});for(const j of[B,V])j.castShadow=!0,j.receiveShadow=!0,j.computeBoundingSphere(),t.add(j);S.depth&&(V.customDepthMaterial=Eu(S.depth)),o.push({t:B,c:V,n:D.length})}}const d=[],f=(S,L,U,D,B=!0)=>{const V=new Pe(_r.dode,We(),Math.max(1,S.length*D));let j=0;for(const z of S)for(let F=0;F<D;F++){const H=z.x+.5+(e()-.5)*.7,Y=z.z+.5+(e()-.5)*.7,Q=U*(.6+e()*.6);if(V.setMatrixAt(j,k(H,$t(n,H,Y)+Q*.15,Y,e()*En,Q,Q*(.55+e()*.4),Q,e()*.5,e()*.5)),B){const et=z.z*i+z.x,N=c.get(et)??[];N.push({m:V,i:j}),c.set(et,N)}V.setColorAt(j++,new Pt(L).multiplyScalar(.85+e()*.3))}return V.count=j,V.castShadow=V.receiveShadow=!0,V.computeBoundingSphere(),t.add(V),V};f(n.res.filter(S=>S.kind===Yn),"#c4bdae",.75,2);const g=n.res.filter(S=>S.kind===Tn);d.push(f(g,"#7a6a58",.7,2),f(g,"#4fa58a",.32,2));const v=n.res.filter(S=>S.kind===Je),m=new Pe(_r.ico,We({color:"#4f7f3a"},{WIND:"",WIND_AMP:"0.03"}),Math.max(1,v.length)),p=new Pe(_r.ico,We({color:"#c0303a"},{NO_SNOW:"",FRUIT:""}),Math.max(1,v.length*6)),M=new Map,x=new Map;v.forEach((S,L)=>{const U=S.x+.5,D=S.z+.5,B=$t(n,U,D);m.setMatrixAt(L,k(U,B+.35,D,e()*En,1.05,.85,1.05));const V=[];for(let j=0;j<6;j++){const z=e()*En,F=k(U+Math.cos(z)*.45,B+.35+e()*.35,D+Math.sin(z)*.45,0,.11,.11,.11);p.setMatrixAt(L*6+j,F),V.push(F)}M.set(S.z*i+S.x,V),x.set(S.z*i+S.x,L*6)});for(const S of[m,p])S.castShadow=!0,S.computeBoundingSphere(),t.add(S);const _=fe(S=>{for(let L=0;L<3;L++)S.add("cone4","#ffffff",k((L-1)*.12,0,L%2*.1,L*2,.14,.5+L*.08,.14,(L-1)*.3,(L-1)*.25),.15)}),P=[];for(let S=0;S<3e4&&P.length<3200;S++){const L=e()*i,U=e()*i,D=Math.floor(U)*i+Math.floor(L);if(n.terrain[D]!==mr||n.tree[D])continue;const B=$t(n,L,U);B<.7||B>14||P.push(k(L,B-.02,U,e()*En,.6+e()*.6,.5+e()*.6,.6+e()*.6))}const T=new Pe(_,We({vertexColors:!0},{GRASSTUFT:"",WIND:"",WIND_AMP:"0.08",WIND_BYH:"true",SNOW_K:"0.6"}),Math.max(1,P.length));P.forEach((S,L)=>{T.setMatrixAt(L,S),T.setColorAt(L,new Pt(.85+e()*.3,.85+e()*.3,.85+e()*.3))}),T.receiveShadow=!0,T.computeBoundingSphere(),t.add(T);const E=(S,L)=>{for(const U of o)U.t.count=U.c.count=Math.floor(U.n*S);T.count=Math.floor(P.length*L)},w=S=>{const L=l.get(S);L&&(L.t.setMatrixAt(L.i,ua),L.c.setMatrixAt(L.i,ua),L.t.instanceMatrix.needsUpdate=L.c.instanceMatrix.needsUpdate=!0,l.delete(S))},b=S=>{y(S,!1);const L=c.get(S);if(L){for(const{m:U,i:D}of L)U.setMatrixAt(D,ua),U.instanceMatrix.needsUpdate=!0;c.delete(S)}},y=(S,L)=>{const U=M.get(S),D=x.get(S);!U||D===void 0||(U.forEach((B,V)=>p.setMatrixAt(D+V,L?B:ua)),p.instanceMatrix.needsUpdate=!0)};return{group:t,trees:o,metal:d,tufts:T,setDensity:E,removeTree:w,removeRes:b,setBerries:y}}function cx(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},a={},o=n[0].morphTargetsRelative,l=new De;let c=0;for(let h=0;h<n.length;++h){const u=n[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<n.length;++d){const f=n[d].index;for(let g=0;g<f.count;++g)u.push(f.getX(g)+h);h+=n[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=Yh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][d]);const g=Yh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}return l}function Yh(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Le(a,e,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let g=0;g<e;g++){const v=h.getComponent(d,g);o.setComponent(d+u,g,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Ln={emit:(n,t,e,i)=>{}},Bi=new qt().makeScale(0,0,0),hx=["#e3b98f","#d1a074","#b98559","#9a6a45"],dx=["#2a1c12","#3b2817","#5a3a1e","#1f1a17","#6b4a2a"],ux=["#7b5634","#8d6a43","#6a4a2c","#9a7a55"],fx=["#b9a27a","#a08a5c","#8f7a52","#c8b48a"],px=["#d9a43a","#7a5634","#bdb6a8","#4f9c85"],mx=["spear","club","axe","pick","mallet","bow","arrow","sword","sling"],Vl="#b5813e";function gx(n){const t=[],e=[],i=new Pt;for(const[r,a]of n){const o=r.index?r.toNonIndexed():r,l=o.attributes.position.array;i.set(a);for(let c=0;c<l.length;c+=3)t.push(l[c],l[c+1],l[c+2]),e.push(i.r,i.g,i.b)}const s=new De;return s.setAttribute("position",new de(t,3)),s.setAttribute("color",new de(e,3)),s.computeVertexNormals(),s}const No={leg:new Fe(.12,.44,.13).translate(0,-.22,0),skirt:new fi(.17,.22,.26,8).translate(0,-.13,0),torso:new Fe(.34,.42,.22).translate(0,.21,0),arm:new Fe(.09,.38,.09).translate(0,-.19,0),head:new Qa(.13,0),hair:cx([new Er(.142,8,2,0,Math.PI*2,0,Math.PI*.36),new Er(.142,6,2,Math.PI*.75,Math.PI*1.5,Math.PI*.36,Math.PI*.26)]),shield:new fi(.24,.24,.05,10).rotateX(Math.PI/2),spear:fe(n=>{n.add("cyl5","#7a5a3c",k(0,-.55,0,0,.04,1.75,.04),0),n.add("cone4","#9a948a",k(0,1.2,0,0,.07,.2,.07),0)}),club:fe(n=>{n.add("cyl5","#6b4a2f",k(0,-.1,0,0,.05,.5,.05),0),n.add("cyl5","#5a3d27",k(0,.35,0,0,.12,.3,.12),0)}),axe:fe(n=>{n.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.66,.045),0),n.add("box","#8d8a85",k(0,.43,.07,0,.045,.14,.15),0),n.add("box","#b9b4aa",k(0,.44,.15,0,.03,.12,.03),0)}),pick:fe(n=>{n.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.7,.045),0),n.add("box","#8d8a85",k(0,.55,.02,0,.055,.06,.24),0),n.add("cone4","#a29d94",k(0,.58,.14,0,.06,.13,.06,Math.PI/2),0)}),mallet:fe(n=>{n.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.62,.045),0),n.add("box","#8d8a85",k(0,.45,0,0,.12,.12,.26),0)}),arrow:fe(n=>{n.add("cyl5","#8a6a48",k(0,-.3,0,0,.018,.66,.018),0),n.add("cone4","#b9b4aa",k(0,.36,0,0,.045,.1,.045),0),n.add("box","#e8e2d4",k(0,-.3,0,0,.012,.1,.06),0)}),bow:gx([[new gc(.62,.02,4,10,1.1).rotateZ(-.55).rotateY(-Math.PI/2).translate(0,0,-.62),"#6b4a2f"],[new Fe(.008,.65,.008).translate(0,0,-.094),"#ddd6c6"]]),sword:fe(n=>{n.add("cyl5","#4a3326",k(0,-.09,0,0,.045,.17,.045),0),n.add("box",Vl,k(0,.07,0,0,.05,.04,.17),0),n.add("box","#c9965a",k(0,.1,0,0,.024,.33,.075),0),n.add("cone4","#c9965a",k(0,.43,0,Math.PI/4,.055,.08,.055),0)}),sling:fe(n=>{for(const t of[-1,1])n.add("box","#d8cfb8",k(t*.02,0,0,0,.01,.38,.01,0,-t*.05),0);n.add("box","#7a5634",k(0,.36,0,0,.09,.08,.06),0),n.add("dode","#8f8a80",k(0,.4,0,0,.07,.07,.07),0)}),carry:new Fe(.26,.26,.15)},Kh={body:new Fe(1,1,1),neck:new Fe(1,1,1).translate(0,.5,0),collar:new Fe(1,1,1),head:fe(n=>{n.add("box","#ffffff",k(0,-.5,0,0,1,1,.65),0),n.add("box","#e4e4e4",k(0,-.42,.55,0,.72,.66,.5),0)}),ears:fe(n=>{for(const t of[-1,1])n.add("cone4","#ffffff",k(t*.07,0,0,0,.07,.13,.05,0,-t*.35),0)}),leg:new Fe(1,1,1).translate(0,-.5,0),tail:new Fe(1,1,1).translate(0,-.5,0),antlers:fe(n=>{for(const t of[-1,1])n.add("cyl5","#d8c8a8",k(t*.08,0,0,0,.035,.42,.035,.25,-t*.5),0),n.add("cyl5","#d8c8a8",k(t*.2,.25,.04,0,.03,.26,.03,-.4,-t*.1),0),n.add("cyl5","#d8c8a8",k(t*.25,.3,-.02,0,.03,.22,.03,.5,-t*.9),0)}),horns:fe(n=>{for(const t of[-1,1])n.add("cyl5","#e8dcc0",k(t*.12,0,.02,0,.06,.28,.06,0,-t*1.3),0),n.add("cone4","#3a3530",k(t*.36,.08,.05,0,.07,.28,.07,.5,-t*.3),0)}),tusks:fe(n=>{for(const t of[-1,1])n.add("cone4","#f0eadc",k(t*.1,0,0,0,.05,.14,.05,0,-t*.5),0)})},zo={body:fe(n=>{for(const t of[-1,1])n.add("box","#6e4f37",k(t*.42,.3,0,0,.1,.1,1.6),0),n.add("box","#6e4f37",k(t*.42,.3,.75,0,.1,.26,.1),0),n.add("box","#6e4f37",k(t*.42,.3,-.75,0,.1,.26,.1),0);n.add("box","#6e4f37",k(0,.3,.75,0,.94,.1,.1),0),n.add("box","#6e4f37",k(0,.3,-.75,0,.94,.1,.1),0);for(const t of[-1,1])n.add("box",t<0?"#8d6a46":"#76573a",k(t*.26,.85,0,0,.9,.05,1.7,0,-t*.93),0);n.add("box","#4f3a2a",k(0,1.16,0,0,.1,.1,1.76),0),n.add("prism","#5e4431",k(0,.5,-.84,0,1.04,.7,.05),0),n.add("prism","#5e4431",k(0,.85,.84,0,.52,.35,.05),0)}),wheel:new fi(.22,.22,.08,9).rotateZ(Math.PI/2),log:fe(n=>{n.add("cyl8","#5e4431",k(0,0,-.9,0,.22,1.85,.22,Math.PI/2),0),n.add("box","#b5813e",k(0,-.14,.95,0,.3,.28,.26),0),n.add("cone4","#c9965a",k(0,0,1.08,Math.PI/4,.26,.2,.26,Math.PI/2),0);for(const t of[-1,1])n.add("box","#d8cfb8",k(0,0,t*.4,0,.02,.62,.02),0)}),cloth:new Fe(.13,.05,1.5).translate(0,1.25,0)},qn={deer:{body:[.34,.4,.95],leg:.72,legW:.075,head:[.17,.2,.36],neck:.32,tail:[.08,.12,.06],color:["#8a5a36","#7d5230","#93613b"],antl:!0},boar:{body:[.4,.42,.85],leg:.3,legW:.1,head:[.24,.26,.46],neck:.04,tail:[.04,.14,.04],color:["#3e3229","#4a3b30"],tusks:!0},wolf:{body:[.24,.28,.72],leg:.38,legW:.07,head:[.17,.18,.34],neck:.18,tail:[.07,.34,.07],color:["#77746f","#6a665f"]},aurochs:{body:[.58,.64,1.4],leg:.66,legW:.15,head:[.3,.32,.5],neck:.1,tail:[.06,.42,.06],color:["#2b221d","#3a2a20"],horns:!0},dog:{body:[.2,.24,.58],leg:.32,legW:.06,head:[.15,.16,.3],neck:.16,tail:[.05,.3,.05],color:["#7a6650","#5d4d3c","#8a7a62"]},horse:{body:[.36,.46,1.15],leg:.78,legW:.085,head:[.17,.22,.46],neck:.52,tail:[.08,.5,.08],color:["#6b4a32","#3b2a20","#8a5f3c","#5a3d28"],neckTilt:.72,headTilt:.85,neckW:1}},Au=qn.horse.leg+qn.horse.body[1],xr=n=>n*n*(3-2*n);function ur(n,t,e){if(n<.12)return e-.12*Math.sin(n/.12*Math.PI);if(n<.68)return e+(t-e)*xr((n-.12)/.56);if(n<.8)return t;const i=(n-.8)/.2;return t+(e-t)*i*i}const fr=n=>n>.85?(n-.85)/.15:n<.15?1-n/.15:0,Wl=2.6;function wu(n){const t=_t[n]?.key??"";if(t==="horseman")return qn.horse.leg+qn.horse.body[1]*.5;if(t==="ram")return .6;const e=qn[t];return e?e.leg+e.body[1]*.5:.72}function vx(n){const t=_t[n]?.key??"";if(t==="horseman")return Au+.1;if(t==="ram")return 1.15;const e=qn[t];return e?e.leg+e.body[1]+.06:1.15}const pr=n=>{let t=Math.imul(n^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),((t^t>>>16)>>>0)/4294967296},ii=(n,t)=>n[Math.floor(t*n.length)%n.length];class xx{constructor(t=720,e=160){R(this,"group",new Wn);R(this,"hm",{});R(this,"am",{});R(this,"rm",{});R(this,"slotR");R(this,"maxR",48);R(this,"ring");R(this,"barBg");R(this,"barFg");R(this,"slotH");R(this,"slotA");R(this,"lookKey",[]);R(this,"heading",new Float32Array(4096));R(this,"phase",new Float32Array(4096));R(this,"lastP",new Float32Array(4096));R(this,"lastCd",new Int16Array(4096));R(this,"lastCarry",new Int16Array(4096));R(this,"m",{b:new qt,hip:new qt,tor:new qt,l:new qt,t:new qt,al:new qt,ar:new qt,hd:new qt});R(this,"e",new vn);R(this,"q",new Ii);R(this,"p",new O);R(this,"s",new O);R(this,"v",new O);R(this,"c",new Pt);this.maxH=t,this.maxA=e;const i=We({},{NO_SNOW:""}),s=We({vertexColors:!0},{NO_SNOW:""});for(const o in No){const l=o==="leg"||o==="arm"?t*2:t,c=!!No[o].attributes.color,h=new Pe(No[o],c?s:i,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let u=0;u<l;u++)h.setColorAt(u,this.c.set("#ffffff"));this.group.add(h),this.hm[o]=h}for(const o in Kh){const l=o==="leg"?e*4:e,c=["head","ears","antlers","horns","tusks"].includes(o),h=new Pe(Kh[o],c?s:i,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let u=0;u<l;u++)h.setColorAt(u,this.c.set("#ffffff"));this.group.add(h),this.am[o]=h}for(const o in zo){const l=o==="wheel"?this.maxR*4:this.maxR,c=!!zo[o].attributes.color,h=new Pe(zo[o],c?s:i,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let u=0;u<l;u++)h.setColorAt(u,this.c.set(o==="wheel"?"#6b4a2f":"#ffffff"));this.group.add(h),this.rm[o]=h}this.slotR=new Int32Array(this.maxR).fill(-1);const r=new to(.36,.46,28).rotateX(-Math.PI/2);this.ring=new Pe(r,new ui({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,toneMapped:!1}),t);const a=new Li(1,.11);this.barBg=new Pe(a,new ui({color:1711900,transparent:!0,opacity:.75,depthTest:!1,toneMapped:!1}),400),this.barFg=new Pe(a.clone().translate(.5,0,0),new ui({color:16777215,transparent:!0,opacity:1,depthTest:!1,toneMapped:!1}),400);for(const o of[this.ring,this.barBg,this.barFg])o.instanceMatrix.setUsage(mn),o.frustumCulled=!1,o.count=0,this.group.add(o);this.ring.renderOrder=5,this.barBg.renderOrder=8,this.barFg.renderOrder=9;for(let o=0;o<t;o++)this.ring.setColorAt(o,this.c.set("#9dffc4"));for(let o=0;o<400;o++)this.barFg.setColorAt(o,this.c.set("#6fe08a"));this.slotH=new Int32Array(t).fill(-1),this.slotA=new Int32Array(e).fill(-1)}trs(t,e,i,s,r=0,a=0,o=0,l=1,c=l,h=l){return this.e.set(r,a,o,"YXZ"),this.q.setFromEuler(this.e),this.p.set(e,i,s),this.s.set(l,c,h),t.compose(this.p,this.q,this.s)}look(t,e){const i=pr(e*7+1),s=pr(e*13+5),r=t.owner[e],a=r>=0&&r<t.players.length?t.players[r].era:0,o=r===hi?"#4f6b4a":t.players[r]?.color??"#888",l=_t[t.kind[e]].key,c=ii(hx,i),h=ii(dx,s),u=ii(ux,s),d=ii(fx,i),f={skin:c,hair:h,tunic:u,skirt:o,legs:c,arms:c,weapon:null,shield:null,bigHair:!1,sc:.95+i*.08};switch(l){case"villager":return{...f,tunic:a?d:u,arms:a?c:u};case"warrior":return{...f,tunic:o,skirt:u,weapon:"club",sc:1.02};case"axeman":return{...f,tunic:o,skirt:d,weapon:"axe",sc:1.04};case"hunter":return{...f,weapon:"spear"};case"archer":return{...f,tunic:o,skirt:d,weapon:"bow"};case"spearman":return{...f,tunic:o,skirt:d,weapon:"spear",shield:a>=2?Vl:"#8a6a44",sc:1.04,helmet:a>=2};case"swordsman":return{...f,tunic:o,skirt:d,weapon:"sword",shield:"#8a6a44",sc:1.05,helmet:!0};case"slinger":return{...f,tunic:d,skirt:o,weapon:"sling",sc:.98};case"horseman":return{...f,tunic:o,skirt:d,weapon:"spear",helmet:!0,sc:1};case"barbarian":return{...f,tunic:ii(["#4f6b4a","#6b5a3a","#3f5a6a"],i),skirt:"#5a4d3c",legs:"#5a4d3c",weapon:"spear",shield:ii(["#3f6a4a","#8a6a3a"],s),hair:ii(["#c48a4a","#8a5a2a","#d9a35f"],i),bigHair:!0,sc:1.05}}return f}colorHuman(t,e){const i=this.hm,s=this.c;i.leg.setColorAt(t*2,s.set(e.legs)),i.leg.setColorAt(t*2+1,s),i.skirt.setColorAt(t,s.set(e.skirt)),i.torso.setColorAt(t,s.set(e.tunic)),i.arm.setColorAt(t*2,s.set(e.arms)),i.arm.setColorAt(t*2+1,s),i.head.setColorAt(t,s.set(e.skin)),i.hair.setColorAt(t,s.set(e.helmet?Vl:e.hair)),i.shield.setColorAt(t,s.set(e.shield??"#888"));for(const r in i)i[r].instanceColor&&(i[r].instanceColor.needsUpdate=!0)}speciesOf(t,e){const i=t.kind[e]===jt?t.sub[e]:t.kind[e];return _t[i]?.key??"deer"}update(t,e,i,s,r,a,o,l){const c=t.size,h=t.vis[r],u=this.hm,d=this.am,f=this.rm;let g=0,v=0,m=0,p=0,M=0;for(let x=0;x<t.top;x++){if(!t.alive[x])continue;const _=t.kind[x];if(_>=Zt){const z=be[_-Zt],F=t.x[x]/256,H=t.z[x]/256;if(a&&t.owner[x]!==r&&!h[Math.floor(H)*c+Math.floor(F)])continue;const Y=$t(t.map,F,H),Q=s.has(x);Q&&m<this.maxH&&this.ring.setMatrixAt(m++,k(F,Y+.08,H,0,z.size*.95,1,z.size*.95)),(Q||t.hp[x]<z.hp)&&p<400&&this.bar(p++,F,Y+2.3,H,t.hp[x]/z.hp,z.size*.6,l);continue}const P=(t.px[x]+(t.x[x]-t.px[x])*e)/256,T=(t.pz[x]+(t.z[x]-t.pz[x])*e)/256;if(a&&t.owner[x]!==r){const z=Math.floor(P),F=Math.floor(T);if(z<0||F<0||z>=c||F>=c||!h[F*c+z])continue}const E=t.x[x]-t.px[x],w=t.z[x]-t.pz[x],b=(E!==0||w!==0)&&t.state[x]===qe,y=$t(t.map,P,T);let S=this.heading[x];if(b)S=Math.atan2(E,w);else if(_!==jt&&(t.task[x]===we||t.task[x]===Xn||t.task[x]===Te)&&t.tgt[x]>=0){const z=t.tgt[x];let F,H;t.task[x]===we&&t.tgtTile[x]?(F=z%c+.5,H=Math.floor(z/c)+.5):(F=t.x[z]/256,H=t.z[z]/256),Math.abs(F-P)+Math.abs(H-T)>.05&&(S=Math.atan2(F-P,H-T))}const L=this.heading[x];this.heading[x]=L+Math.atan2(Math.sin(S-L),Math.cos(S-L))*Math.min(1,i*10);const U=this.heading[x],D=Math.hypot(E,w)/256*10,B=_===jt?"":_t[_].key,V=_===jt||t.owner[x]===le||B==="dog";if(B==="ram"){if(M>=this.maxR)continue;this.phase[x]+=b?i*D/.22:0,this.slotR[M]!==x*8+t.owner[x]+1&&(this.slotR[M]=x*8+t.owner[x]+1,f.cloth.setColorAt(M,this.c.set(t.players[t.owner[x]]?.color??"#888")),f.cloth.instanceColor&&(f.cloth.instanceColor.needsUpdate=!0)),this.poseRam(t,x,M,P,y,T,U,e),M++}else if(B==="horseman"){if(v>=this.maxA||g>=this.maxH)continue;const z=qn.horse,F=D>1.1;this.phase[x]+=b?i*D*2.6/z.leg:0;const H=x*64+_;if(this.slotA[v]!==H){this.slotA[v]=H;const tt=this.c.set(ii(z.color,pr(x)));for(const ot of["body","neck","head","ears","tail"])d[ot].setColorAt(v,tt);for(let ot=0;ot<4;ot++)d.leg.setColorAt(v*4+ot,tt);d.collar.setColorAt(v,this.c.set(t.players[t.owner[x]]?.color??"#888"));for(const ot in d)d[ot].instanceColor&&(d[ot].instanceColor.needsUpdate=!0)}this.poseAnimal(v,z,P,y,T,U,b,this.phase[x],o,!1,F,!1,1,!1,0,0,!0,!0),v++;const Y=t.owner[x],Q=`${_}:${Y}:${Y>=0&&Y<t.players.length?t.players[Y].era:0}`,et=this.look(t,x);(this.slotH[g]!==x||this.lookKey[g]!==Q)&&(this.slotH[g]=x,this.lookKey[g]=Q,this.colorHuman(g,et));const N=b?Math.abs(Math.cos(this.phase[x]))*(F?.06:.025):0;if(b&&F){const tt=this.phase[x]/Math.PI%2;tt<this.lastP[x]&&Ln.emit("animal.hooves",P,T,.5),this.lastP[x]=tt}this.poseHuman(t,x,g,et,P,y,T,U,b,o,e,Au+N-.44*et.sc),g++}else if(V){if(v>=this.maxA)continue;const z=this.speciesOf(t,x),F=qn[z]??qn.deer;this.phase[x]+=b?i*D*2.6/F.leg:0;const H=x*64+_;if(this.slotA[v]!==H){this.slotA[v]=H;const N=this.c.set(ii(F.color,pr(x)));_===jt&&N.multiplyScalar(.8);for(const tt of["body","neck","head","ears","tail"])d[tt].setColorAt(v,N);for(let tt=0;tt<4;tt++)d.leg.setColorAt(v*4+tt,N);d.collar.setColorAt(v,this.c.set(t.players[t.owner[x]]?.color??"#888"));for(const tt in d)d[tt].instanceColor&&(d[tt].instanceColor.needsUpdate=!0)}const Y=_!==jt&&t.task[x]===Te&&!b;let Q=0,et=0;if(Y){const N=1-Math.max(0,Math.min(1,(t.cd[x]-e)/_t[_].cd));Q=N>.8?(N-.8)/.2:N<.2?1-N/.2:0;const tt=t.tgt[x];if(tt>=0&&t.alive[tt]){const ot=Math.hypot(t.x[tt]-t.x[x],t.z[tt]-t.z[x])/256,it=F.body[2]*.5+F.neck*.3+F.head[2]*.85,dt=t.kind[tt]<jt?_t[t.kind[tt]].radius:.5;et=Math.max(0,Math.min(F.body[2]*.3,ot-it-dt*.95))}}Y&&t.cd[x]>this.lastCd[x]&&Ln.emit(z==="boar"?"hit.boar":z==="aurochs"?"hit.aurochs":"hit.bite",P,T),this.lastCd[x]=_===jt?0:t.cd[x],this.poseAnimal(v,F,P,y,T,U,b,this.phase[x],o,_===jt,t.fast[x]===1,z==="deer"&&pr(x*3)<.5,_===jt?1:1+(z==="aurochs"?.1:0),Y,Q,et,t.owner[x]>=0&&_!==jt),v++}else{if(g>=this.maxH)continue;this.phase[x]+=b?i*D*7.2:0;const z=t.owner[x],F=`${_}:${z}:${z>=0&&z<t.players.length?t.players[z].era:0}`,H=this.look(t,x);(this.slotH[g]!==x||this.lookKey[g]!==F)&&(this.slotH[g]=x,this.lookKey[g]=F,this.colorHuman(g,H)),this.poseHuman(t,x,g,H,P,y,T,U,b,o,e),g++}const j=B==="ram"?1.9:B==="horseman"?1.6:V?1.2:1;s.has(x)&&m<this.maxH&&this.ring.setMatrixAt(m++,k(P,y+.06,T,0,j,1,j)),_!==jt&&(s.has(x)||t.hp[x]<_t[_].hp)&&p<400&&this.bar(p++,P,y+(B==="horseman"?2.6:B==="ram"?1.75:V?1.3:1.55),T,t.hp[x]/_t[_].hp,B==="ram"||B==="horseman"?.9:.7,l)}for(const x in u)u[x].count=g,u[x].instanceMatrix.needsUpdate=!0;u.leg.count=u.arm.count=g*2;for(const x in d)d[x].count=v,d[x].instanceMatrix.needsUpdate=!0;d.leg.count=v*4;for(const x in f)f[x].count=M,f[x].instanceMatrix.needsUpdate=!0;f.wheel.count=M*4,this.ring.count=m,this.ring.instanceMatrix.needsUpdate=!0,this.barBg.count=this.barFg.count=p,this.barBg.instanceMatrix.needsUpdate=this.barFg.instanceMatrix.needsUpdate=!0,this.barFg.instanceColor&&(this.barFg.instanceColor.needsUpdate=!0)}bar(t,e,i,s,r,a,o){r=Math.max(0,Math.min(1,r)),this.p.set(e,i,s),this.s.set(a,1,1),this.barBg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.v.set(-a/2,0,0).applyQuaternion(o),this.p.set(e+this.v.x,i+this.v.y,s+this.v.z),this.s.set(a*r,1,1),this.barFg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.barFg.setColorAt(t,this.c.set(r>.6?"#6fe08a":r>.3?"#f2c14e":"#e0533c"))}gripTorso(t,e,i,s,r=0){return this.v.set(0,-.35,i).applyMatrix4(e),t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t,0,0,0,s,r))}poseHuman(t,e,i,s,r,a,o,l,c,h,u,d=0){const f=this.hm,g=this.m,v=this.phase[e],m=Math.sin(v),p=h+e*.37,M=d>0;let x=0,_=0,P=.05+Math.sin(p*1.3)*.03,T=-.05-Math.sin(p*1.3)*.03,E=.07,w=-.07,b=0,y=0,S=0,L=0,U=0,D=s.weapon,B=s.weapon==="spear"?"torso":s.weapon==="bow"?"left":"arm",V=s.weapon==="spear"?.12:s.weapon==="bow"?0:s.weapon==="sling"?Math.PI-.12:s.weapon==="sword"?Math.PI-.3:.79,j=0,z=!1,F=0;const H=()=>{w=-.42,E=.42,P=T+.06},Y=t.task[e];if(M&&(c||Y!==Te||t.state[e]===qe))P=-.75,E=.1,T=-.25,b=c?.14:.03;else if(c)x=m*.65,_=-m*.65,P=-m*.5,T=m*.5,y=Math.abs(Math.cos(v))*.035;else if(Y===we&&t.phase[e]===Fd){const Q=t.tgt[e],et=t.tgtTile[e]===1,N=et&&t.map.tree[Q]>0,tt=et&&t.resKind[Q]===1,ot=!et&&t.kind[Q]>=Zt,it=(dt,xt)=>{const It=p/dt%1;It<this.lastP[e]&&Ln.emit(xt,r,o),this.lastP[e]=It};if(N)T=ur(p/1%1,-2.75,-1.35),H(),b=.1+fr(p/1%1)*.12,D="axe",B="arm",V=Math.PI-.6,it(1,"work.chop");else if(et&&!tt)T=ur(p/1.15%1,-2.8,-.55),H(),b=.22+fr(p/1.15%1)*.14,D="pick",B="arm",V=Math.PI-.6,it(1.15,t.resKind[Q]===3?"work.pickMetal":"work.pick");else if(ot)T=ur(p/1.4%1,-1.95,-.35),H(),b=.32+fr(p/1.4%1)*.1,D="pick",B="arm",V=Math.PI-.7,it(1.4,"work.hoe");else if(tt){const dt=Math.sin(p*4.5);T=-.95+dt*.45,P=-.95-dt*.45,w=-.2,E=.2,b=.5,D=null,it(1.4,"work.rustle")}else T=-.55+Math.sin(p*7)*.3,P=-.4,b=.68,D=null,it(1.6,"work.rustle")}else if(Y===Xn&&t.state[e]!==qe){const Q=p/.75%1;T=ur(Q,-2.3,-.7),w=-.15,P=-.75,b=.15+fr(Q)*.08,D="mallet",B="arm",V=Math.PI-.75,Q<this.lastP[e]&&Ln.emit("work.mallet",r,o),this.lastP[e]=Q}else if(Y===Te&&t.state[e]!==qe){const Q=_t[t.kind[e]],et=1-Math.max(0,Math.min(1,(t.cd[e]-u)/Q.cd)),N=t.tgt[e],tt=!!Q.hunt&&N>=0&&t.owner[N]===le;if(t.cd[e]>this.lastCd[e]&&!Q.proj&&!(tt&&N>=0&&t.alive[N]&&t.reach(e,N,!1)/256>=Wl)){const it=N>=0&&t.kind[N]>=Zt;Ln.emit(it?"hit.wall":s.weapon==="sword"?"hit.sword":s.weapon==="axe"?"hit.axe":s.weapon==="spear"?"hit.spear":"hit.club",r,o)}const ot=N>=0&&t.alive[N]?t.reach(e,N,!1)/256:9;if(Q.proj==="arrow"||s.weapon==="bow")D="bow",B="left",V=0,P=-1.5,E=.2,w=-.3,b=-.04,T=et<.2?-.95-et/.2*.5:-1.45,z=et>=.25;else if(Q.proj==="stone")if(D="sling",B="arm",P=-.55,E=.18,b=-.03,et<.2){const it=et/.2;T=-.75-it*2.05,V=Math.PI/2+.7-it*.85}else if(et<.85)T=-2.8,w=-.18,V=Math.PI/2-.1,U=p*15;else{const it=(et-.85)/.15;T=-2.8+xr(it)*2.05,V=Math.PI/2-.1+it*.8,b=-.03+it*.12}else if((Q.proj==="spear"||tt)&&ot>=Wl)if(D=et<.3?null:"spear",B="torso",V=Math.PI/2-.25,j=.1,P=-1,b=-.05,et<.3)T=-1.25+et/.3*1.05,b=.12-et/.3*.17;else if(et<.75)T=-.2-xr((et-.3)/.45)*2.55;else if(et<.9)T=-2.75;else{const it=(et-.9)/.1;T=-2.75+it*it*1.5,b=-.05+it*.17}else if(s.weapon==="spear"||Q.proj==="spear"||tt){if(D="spear",B="torso",j=.05,P=s.shield?-.9:-.5,E=.15,et<.15)T=-1.25;else if(et<.85)T=-1.25+xr((et-.15)/.7)*.9;else{const se=(et-.85)/.15;T=-.35-se*se*.9}b=.06+(et>.85?(et-.85)/.15:et<.15?1-et/.15:0)*.12;let it=ot,dt=.72;const xt=N>=0?Math.hypot(t.x[N]-t.x[e],t.z[N]-t.z[e])/256:ot;if(N>=0&&t.alive[N]&&t.kind[N]<jt){const se=qn[_t[t.kind[N]].key];if(dt=wu(t.kind[N]),se){const W=Math.cos(Math.atan2(t.x[e]-t.x[N],t.z[e]-t.z[N])-this.heading[N]);it=xt-Math.max(se.body[0]*.55,se.body[2]*.5*Math.abs(W))}else{const W=_t[t.kind[N]].radius;it=xt-(W>.35?W*.85:.2)}}const It=.35*Math.sin(-T),ce=(.84-.35*Math.cos(T))*s.sc+d,Gt=Math.atan2(ce-dt,Math.max(.4,xt-It));V=Math.PI/2+Gt,F=Math.max(0,It+1.4*Math.cos(Gt)-it+.03)}else{D||(D="club");const dt=(N>=0&&t.alive[N]?t.kind[N]>=Zt?1:vx(t.kind[N]):.6)+(D==="sword"?.18:0);let xt=-.6;for(;xt>-2.2&&(.84-.35*Math.cos(xt)-.5*Math.cos(xt-.75))*s.sc+d<dt;)xt-=.05;B="arm",V=Math.PI-.75,T=ur(et,-2.6,Math.max(-2.25,xt)),w=-.15,P=-.5,b=.08+fr(et)*.12,D==="sword"&&(U=.22)}}M&&(x=_=-.38,S=.5,L=-.5),this.lastCd[e]=t.cd[e],this.lastCarry[e]>0&&t.carry[e]===0&&t.task[e]===we&&Ln.emit(["drop.food","drop.wood","drop.stone","drop.metal"][t.carryRes[e]]??"drop.food",r,o),this.lastCarry[e]=t.carry[e],this.trs(g.b,r,a+y+d,o,0,l,0,s.sc),g.hip.multiplyMatrices(g.b,this.trs(g.t,0,.46,0)),g.tor.multiplyMatrices(g.hip,this.trs(g.t,0,0,0,b)),f.torso.setMatrixAt(i,g.tor),f.leg.setMatrixAt(i*2,g.l.multiplyMatrices(g.hip,this.trs(g.t,.09,0,0,x,0,S))),f.leg.setMatrixAt(i*2+1,g.l.multiplyMatrices(g.hip,this.trs(g.t,-.09,0,0,_,0,L))),f.skirt.setMatrixAt(i,g.l.multiplyMatrices(g.hip,this.trs(g.t,0,.03,0,b*.35))),g.al.multiplyMatrices(g.tor,this.trs(g.t,.215,.38,0,P,0,-E)),f.arm.setMatrixAt(i*2,g.al),g.ar.multiplyMatrices(g.tor,this.trs(g.t,-.215,.38,0,T,0,-w)),f.arm.setMatrixAt(i*2+1,g.ar),g.hd.multiplyMatrices(g.tor,this.trs(g.t,0,.53,0,-b*.6)),f.head.setMatrixAt(i,g.hd),f.hair.setMatrixAt(i,g.l.multiplyMatrices(g.hd,this.trs(g.t,0,.03,-.012,0,0,0,s.bigHair?1.18:1))),s.shield?(this.v.set(.04,-.24,.13).applyMatrix4(g.al),f.shield.setMatrixAt(i,g.l.copy(g.tor).setPosition(this.v))):f.shield.setMatrixAt(i,Bi);for(const Q of mx)f[Q].setMatrixAt(i,Bi);D&&(B==="arm"?f[D].setMatrixAt(i,g.l.multiplyMatrices(g.ar,this.trs(g.t,0,-.35,0,V,U))):(this.gripTorso(g.l,B==="left"?g.al:g.ar,B==="left"?.02:0,V,B==="torso"?j:0),F&&g.l.multiply(this.trs(g.t,0,-F,0)),f[D].setMatrixAt(i,g.l))),z&&f.arrow.setMatrixAt(i,this.gripTorso(g.l,g.al,.02,Math.PI/2,-.12)),t.carry[e]>0?(f.carry.setMatrixAt(i,g.l.multiplyMatrices(g.tor,this.trs(g.t,0,.2,-.19))),f.carry.setColorAt(i,this.c.set(px[t.carryRes[e]]??"#888")),f.carry.instanceColor&&(f.carry.instanceColor.needsUpdate=!0)):f.carry.setMatrixAt(i,Bi)}poseAnimal(t,e,i,s,r,a,o,l,c,h,u,d,f,g=!1,v=0,m=0,p=!1,M=!1){const x=this.am,_=this.m,[P,T,E]=e.body,[w,b,y]=e.head,S=e.leg+T*.5,L=o?Math.sin(l)*(u?.8:.45):0,U=o?Math.abs(Math.cos(l))*(u?.06:.025):0;h?this.trs(_.b,i,s+P*.5-S*0,r,0,a,Math.PI/2,f):this.trs(_.b,i,s+U,r,0,a,0,f),h&&_.b.multiply(this.trs(_.t,0,-S+P*.1,0)),v>0&&_.b.multiply(this.trs(_.t,0,0,m*v,.1*v)),x.body.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S,0,0,0,0,P,T,E))),[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([z,F],H)=>x.leg.setMatrixAt(t*4+H,_.l.multiplyMatrices(_.b,this.trs(_.t,z*P*.32,e.leg,F*E*.36,z*F>0?L:-L,0,0,e.legW,e.leg,e.legW))));const D=h?.2:M?u?.22:o?.08:.12+Math.sin(c*1.3+i)*.04:g?.05+v*.55:o?u?.15:-.3:.9+Math.sin(c*1.7+i)*.08;_.hd.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.3,E*.46,D));const B=e.neckTilt??.29,V=e.neckW??.72;x.neck.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,-.04,0,B,0,0,w*V,e.neck*1.05+.1,b*V))),M?x.collar.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.5-.17,-E*.04,0,0,0,P*1.14,.22,E*.4))):x.collar.setMatrixAt(t,p?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,e.neck*.45,e.neck*.13,.29,0,0,w*.9,.06,b*.9)):Bi),_.hd.multiply(this.trs(_.t,0,e.neck*Math.cos(B)/Math.cos(.29),e.neck*Math.sin(B)*(.3/Math.sin(.29))+y*.3,-D*.6+(e.headTilt??0))),x.head.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,0,0,0,0,0,w,b,y)));const j=Math.min(w/.15,1.35);x.ears.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.5,-y*.2,-(e.headTilt??0)*.85,0,0,j,j,j))),x.antlers.setMatrixAt(t,d&&e.antl?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.45,-y*.12)):Bi),x.horns.setMatrixAt(t,e.horns?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.35,y*.02)):Bi),x.tusks.setMatrixAt(t,e.tusks?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,-b*.25,y*.72,-.6)):Bi),x.tail.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.32,-E*.5,-.4+(o?Math.sin(l*2)*.15:Math.sin(c*3+i)*.06),0,0,e.tail[0],e.tail[1],e.tail[2])))}poseRam(t,e,i,s,r,a,o,l){const c=this.rm,h=this.m,u=this.phase[e];t.task[e]===Te&&t.cd[e]>this.lastCd[e]&&Ln.emit("ram.boom",s,a),this.lastCd[e]=t.cd[e];{const v=u/Math.PI%2;v<this.lastP[e]&&Ln.emit("ram.creak",s,a,.7),this.lastP[e]=v}this.trs(h.b,s,r,a,0,o,0),c.body.setMatrixAt(i,h.b),c.cloth.setMatrixAt(i,h.b),[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([v,m],p)=>c.wheel.setMatrixAt(i*4+p,h.l.multiplyMatrices(h.b,this.trs(h.t,v*.5,.22,m*.55,u))));let d=0;if(t.task[e]===Te&&t.state[e]!==qe){const v=1-Math.max(0,Math.min(1,(t.cd[e]-l)/_t[t.kind[e]].cd));d=v<.15?.06*(1-v/.15):v<.85?xr((v-.15)/.7)*.5:.5*(1-((v-.85)/.15)**2)}let f=0;const g=t.tgt[e];if(t.task[e]===Te&&g>=0&&t.alive[g]&&t.kind[g]>=Zt){const v=Sx(t,g,s,a,Math.sin(o),Math.cos(o),.62);v!==null&&(f=Math.max(0,Math.min(.9,v-1.33)))}c.log.setMatrixAt(i,h.l.multiplyMatrices(h.b,this.trs(h.t,0,.62,.05+f-d)))}}const Ee="#6e4f37",Ke="#8a6545",Fo="#a0754c",Hi="#c9a75e",Ts="#b8954f",fa="#cdb48a",ql="#9b968c",jh="#b98b62",As="#b5813e",pa="#8a857c",ma="#a7a196";function ga(n,t,e,i,s,r,a){const o=a()*En;n.add("cone7",r,k(t,0,e,o,i*2,s,i*2));for(let l=0;l<3;l++){const c=l*En/3+o;n.add("cyl5",Ee,k(t+Math.cos(c)*.08,s-.3,e+Math.sin(c)*.08,0,.05,.6,.05,Math.sin(c)*.3,Math.cos(c)*.3))}n.add("box","#3b2b1f",k(t+Math.sin(o)*i*.95,0,e+Math.cos(o)*i*.95,o,.36,s*.4,.05,-Math.atan2(i,s)))}function Zh(n,t,e,i,s,r,a,o,l,c=0){n.add("cyl8",o,k(t,0,e,c,i*2,r,s*2)),n.add("cone7",l,k(t,r-.06,e,c,i*2+.44,a,s*2+.44));const h=r-.06+a*.86,u=Math.sin(c),d=Math.cos(c),f=Math.cos(c),g=-Math.sin(c);for(const v of[-1,1])n.add("cyl5",Ee,k(t+f*v*.05,h,e+g*v*.05,c,.045,.42,.045,0,v*.62));n.add("box","#3a2a1e",k(t+u*s*.94,0,e+d*s*.94,c,.42,r*.8,.08))}function Oo(n,t,e,i,s,r,a,o){const l=Math.cos(a),c=-Math.sin(a),h=Math.sin(a),u=Math.cos(a);for(const[d,f]of[[-1,-1],[1,-1],[-1,1],[1,1]])n.add("cyl5",Ee,k(t+l*d*i/2+h*f*s/2,0,e+c*d*i/2+u*f*s/2,0,.07,f>0?1.15:1.35,.07));n.add("box",r,k(t,1.24,e,a,i+.2,.05,s+.3,.18)),n.add("box",Ke,k(t+h*s*.3,0,e+u*s*.3,a,i*.9,.55,.32)),o.forEach((d,f)=>n.add(f%2?"ico":"cyl8",d,k(t+h*s*.3+l*(f-(o.length-1)/2)*.24,.55,e+u*s*.3+c*(f-(o.length-1)/2)*.24,0,.17,f%2?.17:.2,.17)))}function _x(n,t,e,i,s){const r=Math.sin(i),a=Math.cos(i),o=Math.cos(i),l=-Math.sin(i);n.add("box",s,k(t,.78,e,i,.34,.42,1));for(const[c,h]of[[-1,1],[1,1],[-1,-1],[1,-1]])n.add("box",s,k(t+o*c*.12+r*h*.36,0,e+l*c*.12+a*h*.36,i,.09,.8,.09));n.add("box",s,k(t+r*.52,1,e+a*.52,i,.16,.5,.2,.5)),n.add("box",s,k(t+r*.72,1.34,e+a*.72,i,.15,.17,.42,.25)),n.add("box","#2a211b",k(t+r*.5,1.1,e+a*.5,i,.05,.42,.12,.5)),n.add("box","#2a211b",k(t-r*.52,.55,e-a*.52,i,.07,.42,.07,-.25))}function Jh(n,t,e,i,s,r,a=0){n.add("cyl8","#6b4a2f",k(t,e+s*Math.cos(a),i,r,s*2,.08,s*2,0,Math.PI/2+a))}function va(n,t,e,i=1){for(let s=0;s<9;s++){const r=s/9*En;n.add("dode","#8a857c",k(t+Math.cos(r)*.5*i,.05,e+Math.sin(r)*.5*i,r,.24*i,.18*i,.24*i))}n.add("cyl5","#4a3526",k(t,.08,e,.3,.1,.8*i,.1,Math.PI/2,0)),n.add("cyl5","#4a3526",k(t,.1,e,1.9,.1,.8*i,.1,Math.PI/2,0))}function xa(n,t,e,i,s,r,a,o,l,c=0,h=0){n.add("box",o,k(t,h,e,c,i,r,s)),n.add("prism",l,k(t,h+r-.04,e,c,i+.4,a,s+.36)),n.add("box","#3a2a1e",k(t+Math.sin(c)*(s/2+.01),h,e+Math.cos(c)*(s/2+.01),c,Math.min(.5,i*.3),r*.72,.06))}function Qh(n,t,e,i){for(let s=0;s<e;s++){const r=s/e*En;n.add("box",ql,k(Math.cos(r)*t,0,Math.sin(r)*t,r,.3,i*(.8+s%3*.15),.22))}}function Mx(n,t){const e=Math.round(t*4);for(let i=0;i<=e;i++){const s=-t+i*2*t/e;for(const[r,a]of[[s,-t],[s,t],[-t,s],[t,s]])n.add("cyl5",Ee,k(r,0,a,0,.08,.6,.08))}for(const i of[.25,.48])n.add("box",Ke,k(0,i,-t,0,t*2,.05,.05)),n.add("box",Ke,k(0,i,t,0,t*2,.05,.05)),n.add("box",Ke,k(-t,i,0,0,.05,.05,t*2)),n.add("box",Ke,k(t,i,0,0,.05,.05,t*2))}function Bo(n,t,e,i){n.add("ico","#ece6d6",k(t,.32,e,i,.5,.36,.62)),n.add("box","#3a332e",k(t+Math.sin(i)*.32,.36,e+Math.cos(i)*.32,i,.13,.16,.2));for(const[s,r]of[[-.1,-.15],[.1,-.15],[-.1,.15],[.1,.15]])n.add("box","#3a332e",k(t+s,0,e+r,i,.05,.2,.05))}function yx(n,t,e){const i=new xc(e),s=Math.min(t,2);switch(n){case"center":if(s===0)va(i,0,0,1),[.4,1.5,2.6,3.6,4.7,5.6].forEach((r,a)=>ga(i,Math.cos(r)*1.45,Math.sin(r)*1.45,.48,1.25+a%2*.2,[Fo,"#8d6a46","#b58a5d"][a%3],e));else if(s===1)xa(i,0,-.4,2.2,3.2,1.3,1.5,fa,Hi,Math.PI/2),va(i,1.2,1.3,.6),i.add("cyl8","#a0654a",k(-1.3,0,1.3,0,.5,.55,.5));else{Zh(i,0,-.45,1.5,1.02,1.3,1.75,fa,Hi);for(const r of[-1,1])i.add("cyl5",Ee,k(r*.55,0,.95,0,.12,1.45,.12)),i.add("cyl8",As,k(r*.55,.95,1.02,0,.36,.05,.36,Math.PI/2));i.add("box",Ke,k(0,1.42,.85,0,1.4,.1,.36)),va(i,1.2,1.3,.6),i.add("cyl8","#a0654a",k(-1.3,0,1.3,0,.5,.55,.5)),i.add("cyl8","#8a5a40",k(-1,0,1.55,0,.32,.38,.32))}break;case"house":s===0?(ga(i,0,0,.8,1.5,Fo,e),i.add("box","#9a7148",k(.6,0,.6,.4,.3,.4,.03))):s===1?xa(i,0,0,1.3,1.6,1,.95,fa,Ts,e()<.5?0:Math.PI/2):(Zh(i,0,-.08,.66,.5,.85,1,jh,Ts),i.add("cyl8","#a0654a",k(.62,0,.62,0,.26,.32,.26)));break;case"depot":if(s===0){for(let r=0;r<6;r++)i.add("cyl5","#5e4431",k(-.3,.1+r%3*.18,-.35+Math.floor(r/3)*.18+r%3*.05,.2,.17,1.2,.17,Math.PI/2,0));i.add("prism",Fo,k(.35,0,.3,.3,1,.8,1.1)),i.add("cyl8","#b48a5c",k(.55,0,-.5,0,.3,.3,.3))}else if(s===1){for(const[r,a]of[[-.45,-.45],[.45,-.45],[-.45,.45],[.45,.45]])i.add("cyl5",Ee,k(r,0,a,0,.13,.6,.13));i.add("cyl8",fa,k(0,.6,0,0,1.3,.8,1.3)),i.add("cone7",Hi,k(0,1.38,0,0,1.8,.9,1.8))}else{for(const[r,a]of[[-.5,-.55],[.5,-.55],[-.5,.1],[.5,.1]])i.add("cyl5",Ee,k(r,0,a,0,.12,.5,.12));i.add("box",Ke,k(0,.5,-.22,0,1.25,.75,.9)),i.add("prism",Hi,k(0,1.22,-.22,Math.PI/2,1.2,.6,1.6)),i.add("cyl8","#a0654a",k(-.55,0,.62,0,.3,.42,.3)),i.add("cyl8","#8a5a40",k(-.22,0,.7,0,.26,.36,.26));for(let r=0;r<3;r++)i.add("box",As,k(.42,r*.07,.62+r%2*.03,r%2?.2:-.1,.36,.07,.12))}break;case"military":if(s===0){Qh(i,1.15,10,.32),ga(i,-.55,-.5,.5,1.2,"#8d6a46",e);for(let r=0;r<4;r++)i.add("cyl5","#8a6a48",k(.6+r*.12,0,.55,0,.04,1.3,.04,.12));i.add("cyl5",Ee,k(.5,0,-.6,0,.12,.9,.12))}else if(s===1){xa(i,-.3,-.2,1.8,2.2,1.2,1.2,"#c4a77c",Ts,0);for(let r=0;r<7;r++)i.add("cyl5",Ke,k(-1.3+r*.4,0,1.25,0,.14,.9+r%2*.15,.14));for(let r=0;r<3;r++)i.add("cyl5","#8a6a48",k(1,0,-.6+r*.25,0,.04,1.3,.04,0,.1))}else{i.add("box",pa,k(-.15,0,-.45,0,2.6,.25,1.35)),xa(i,-.15,-.45,1.25,2.5,.85,.85,"#9c7a52",Ts,Math.PI/2,.25),i.add("box",Ee,k(.9,0,.75,0,.9,.08,.1));for(let r=0;r<4;r++)i.add("cyl5","#8a6a48",k(.6+r*.2,0,.72,0,.04,1.35,.04,-.12));i.add("cyl5",Ee,k(-.9,0,.8,0,.1,1.2,.1)),i.add("box",Ee,k(-.9,.85,.8,0,.6,.08,.08)),i.add("cyl8",As,k(-.9,.62,.87,0,.42,.05,.42,Math.PI/2))}break;case"farm":i.add("box","#7d5f3e",k(0,-.02,0,0,3,.08,3),.02);for(let r=0;r<4;r++)i.add("box","#6b4f33",k(0,.03,-1.12+r*.75,0,2.8,.07,.28),.03);for(const[r,a]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])i.add("cyl5",Ke,k(r,0,a,0,.08,.5,.08));break;case"pen":Mx(i,1.35),Bo(i,-.5,-.3,.6),Bo(i,.45,.2,2.5),Bo(i,-.2,.65,4.1),i.add("box","#a0754c",k(.8,0,-.8,.3,.5,.2,.3));break;case"sanctuary":if(s<2)i.add("box","#a8a397",k(0,-.1,0,.3,.5,2,.35,.05)),Qh(i,.85,8,.45),i.add("dode","#8a857c",k(.5,0,.45,0,.4,.3,.4));else{for(const[r,a]of[[-.55,-.55],[.55,-.55],[-.55,.55],[.55,.55]])i.add("cyl5",Ee,k(r,0,a,0,.1,1.15,.1));i.add("cone4",Hi,k(0,1.1,0,Math.PI/4,1.9,.75,1.9)),i.add("box",ma,k(0,0,0,0,.6,.55,.45)),i.add("cyl8",As,k(0,.55,0,0,.32,.08,.32)),i.add("box","#a8a397",k(-.75,-.1,.75,.3,.3,1.2,.22,.05)),i.add("box","#a8a397",k(.78,-.1,.72,-.4,.26,1,.2,-.05))}break;case"camp":va(i,0,0,1);for(let r=0;r<4;r++){const a=r/4*En+.4;ga(i,Math.cos(a)*1.4,Math.sin(a)*1.4,.55,1.4,["#6b5a45","#5d5040","#7a6248"][r%3],e)}for(let r=0;r<9;r++){const a=-.9+r*.22;i.add("cyl5","#5a4030",k(Math.cos(a)*1.95,0,Math.sin(a)*1.95,0,.16,1.1+r%2*.2,.16))}break;case"forge":i.add("box",jh,k(0,0,-.75,0,1.8,1.05,.2));for(const r of[-1,1])i.add("cyl5",Ee,k(r*.82,0,.1,0,.1,1.05,.1));i.add("prism",Ts,k(0,1,-.3,0,2,.6,1.2)),i.add("ico","#a5603f",k(.45,.32,-.25,0,.75,.72,.7)),i.add("cyl5","#8f5236",k(.55,.5,-.45,0,.2,1.25,.2)),i.add("box","#2b1d16",k(.45,.12,.08,0,.26,.22,.06)),i.add("box",pa,k(-.42,0,.35,.3,.32,.38,.3)),i.add("box","#5c5a57",k(-.42,.38,.35,.3,.42,.1,.18));for(let r=0;r<3;r++)i.add("box",As,k(-.55+r*.05,r*.06,-.35,.1*r,.3,.06,.1));break;case"market":Oo(i,-.72,-.7,1.1,.8,"#b5523b",0,["#a0654a","#d9a43a","#8a5a40"]),Oo(i,.78,-.55,1,.8,"#d8b45a",-.25,["#bdb6a8","#7a5634","#a0654a"]),Oo(i,-.05,.85,1.2,.75,"#5b7f9a",Math.PI,[As,"#d9a43a","#bdb6a8"]),i.add("cyl8","#a0654a",k(.95,0,.75,0,.3,.45,.3)),i.add("cyl8","#c9a75e",k(1.15,0,.45,0,.32,.22,.32)),i.add("ico","#d6c49a",k(1.05,.15,1.05,0,.3,.3,.3));break;case"stable":i.add("box",Ke,k(0,0,-1.2,0,2.7,1,.16));for(const r of[-1,1])i.add("box",Ke,k(r*1.3,0,-.75,0,.14,1,.9));for(let r=0;r<4;r++)i.add("cyl5",Ee,k(-1.3+r*.866,0,-.32,0,.11,1,.11));i.add("prism",Hi,k(0,.97,-.76,0,3,.62,1.3));for(let r=0;r<5;r++)i.add("cyl5",Ee,k(-1.35+r*.675,0,1.35,0,.08,.62,.08));for(const r of[.28,.52])i.add("box",Ke,k(0,r,1.35,0,2.75,.05,.05));_x(i,.2,.55,-1.2,"#7a5236"),i.add("box","#d6b85a",k(-1,0,.6,.3,.5,.36,.38)),i.add("box","#c9ab50",k(-1.05,.36,.62,.4,.46,.32,.34));break;case"workshop":for(const[r,a]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,-.2],[1.2,-.2]])i.add("cyl5",Ee,k(r,0,a,0,.12,1.15,.12));i.add("prism",Ts,k(0,1.12,-.7,0,2.8,.6,1.4)),i.add("box",Ke,k(0,0,-1.25,0,2.5,.9,.12));for(const r of[-1,1])i.add("box",Ee,k(r*.32,.35,.55,0,.1,.1,1.5)),i.add("box",Ee,k(r*.32,.35,.55,0,.1,.75,.1));i.add("box",Ee,k(0,1.05,.55,0,.75,.1,.1)),i.add("cyl8","#5e4431",k(0,.65,.4,0,.26,1.5,.26,Math.PI/2));for(const r of[-1,1])for(const a of[-.1,1.2])i.add("box",Ke,k(r*.32,0,a,0,.16,.35,.16));i.add("cyl5","#4a3a2c",k(0,.77,.55,0,.03,.3,.03)),Jh(i,-.95,0,.9,.3,.4,-.12),Jh(i,1.05,.02,.35,.3,-.3,.1);for(let r=0;r<3;r++)i.add("cyl5","#5e4431",k(.9,.1+r%2*.16,-.65+r*.12,Math.PI/2,.18,1.1,.18,Math.PI/2));break;case"wall":i.add("box",pa,k(0,0,0,0,1,.55,1),.1);for(const[r,a,o]of[[-.25,-.25,ql],[.25,-.25,ma],[-.25,.25,ma],[.25,.25,ql]])i.add("box",o,k(r,.55,a,(r+a)*.4,.5,.36+Math.abs(r-a)*.2,.5),.12);i.add("dode",pa,k(0,.95,0,.4,.5,.3,.5));break;case"tower":i.add("cyl8","#b3ada2",k(0,0,0,.2,1.5,2.2,1.5)),i.add("cyl8",ma,k(0,0,0,.6,1.62,.4,1.62)),i.add("cyl8","#9d978b",k(0,1.15,0,.4,1.56,.12,1.56)),i.add("box","#2b211a",k(0,0,.7,0,.42,.8,.14)),i.add("box","#2b211a",k(.55,1.4,.48,.8,.08,.3,.12)),i.add("box",Ke,k(0,2.2,0,0,1.8,.14,1.8));for(let r=0;r<8;r++){const a=r/8*En;i.add("cyl5",Ee,k(Math.cos(a)*.84,2.3,Math.sin(a)*.84,0,.08,.95,.08))}for(const[r,a,o]of[[0,.85,0],[0,-.85,0],[.85,0,Math.PI/2],[-.85,0,Math.PI/2]])i.add("box",Ee,k(r,2.62,a,o,1.7,.08,.06));i.add("cone4",Hi,k(0,3.2,0,Math.PI/4,2.6,1,2.6));break}return i.build()}function bx(n,t,e){const i=[],s=[],r=new Pt,a=(u,d)=>$t(n,u,d),o=(u,d,f,g,v,m)=>{const p=[[u,d],[u,g],[f,g],[f,d]].map(([M,x])=>[M,a(M,x)+v,x]);r.set(m);for(const M of[0,1,3,1,2,3])i.push(...p[M]),s.push(r.r,r.g,r.b)};for(let u=0;u<6;u++)for(let d=0;d<6;d++){const f=t-1.5+u*.5,g=e-1.5+d*.5;o(f,g,f+.5,g+.5,.05,(u+d)%2?"#7d5f3e":"#795b3a")}for(let u=0;u<4;u++){const d=e-1.12+u*.75;for(let f=0;f<7;f++){const g=t-1.4+f*.4;o(g,d-.14,g+.4,d+.14,.09,"#6b4f33")}}const l=new xc;for(const[u,d]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])l.add("cyl5",Ke,k(t+u,a(t+u,e+d),e+d,0,.08,.5,.08));const c=l.build();i.push(...c.attributes.position.array),s.push(...c.attributes.color.array);const h=new De;return h.setAttribute("position",new de(i,3)),h.setAttribute("color",new de(s,3)),h.computeVertexNormals(),h.computeBoundingSphere(),h}const td=new Map;function Tr(n,t){const e=Math.min(t,2),i=n+e;let s=td.get(i);return s||(s=yx(n,e,Tu(n.length*31+e)),td.set(i,s)),s}const _a=new ja,ed=new O,nd=new O,id=new O,sd=new O;function Sx(n,t,e,i,s,r,a){const o=be[n.kind[t]-Zt],l=n.owner[t],c=Math.min(l>=0&&l<n.players.length?n.players[l].era:0,2),h=Tr(o.key,c),u=h.attributes.position.array,d=n.done[t]?1:Math.max(.12,Math.min(1,n.work[t]/(o.time*100))),f=n.x[t]/256,g=n.z[t]/256,v=o.key==="farm"?0:(t*2654435761>>>0)%4*Math.PI/2,m=Math.cos(v),p=Math.sin(v),M=e-f,x=i-g,_=M*m-x*p,P=M*p+x*m,T=s*m-r*p,E=s*p+r*m,w=Math.hypot(T,E)||1;let b=1/0;for(const y of[0,.1,-.1]){_a.origin.set(_-E/w*y,a/d,P+T/w*y),_a.direction.set(T/w,0,E/w);for(let S=0;S+8<u.length;S+=9){if(ed.set(u[S],u[S+1],u[S+2]),nd.set(u[S+3],u[S+4],u[S+5]),id.set(u[S+6],u[S+7],u[S+8]),!_a.intersectTriangle(ed,nd,id,!1,sd))continue;const L=sd.distanceTo(_a.origin);L<b&&(b=L)}}return b<1/0?b:null}const Ex=fe(n=>n.add("cyl5",Ee,k(0,0,0,0,.06,2,.06),0)),Tx=new Fe(.42,.34,.03).translate(.24,1.75,0);class Ax{constructor(){R(this,"group",new Wn);R(this,"meshes",new Map);R(this,"poles");R(this,"flags");R(this,"crops");R(this,"fair");R(this,"mat",We({vertexColors:!0}));R(this,"farms",new Map);R(this,"fires",[]);R(this,"smokes",[]);this.poles=new Pe(Ex,We({vertexColors:!0}),256),this.flags=new Pe(Tx,We({},{NO_SNOW:""}),256);const t=fe(i=>{for(let s=0;s<3;s++)i.add("cone4","#ffffff",k((s-1)*.1,0,s%2*.08,s,.1,.75,.1,(s-1)*.15,0),.1)});this.crops=new Pe(t,We({vertexColors:!0},{CROP:"",CROPCOL:"",WIND:"",WIND_AMP:"0.06",WIND_BYH:"true",SNOW_K:"0.5"}),2560),this.crops.customDepthMaterial=Eu({CROP:""});const e=fe(i=>{const s=[[-1.38,-1.38],[1.38,-1.38],[1.38,1.38],[-1.38,1.38]],r=["#e0533c","#f2c14e","#5bb39a","#5b7f9a","#efe6cf"];for(const[a,o]of s)i.add("cyl5",Ee,k(a,0,o,0,.07,2.05,.07),0);for(let a=0;a<4;a++){const[o,l]=s[a],[c,h]=s[(a+1)%4],u=Math.hypot(c-o,h-l),d=Math.atan2(c-o,h-l);i.add("box","#e8e2d4",k((o+c)/2,1.95,(l+h)/2,d,.015,.015,u),0);for(let f=1;f<8;f++){const g=f/8,v=Math.sin(g*Math.PI)*.18;i.add("cone4",r[(f+a)%r.length],k(o+(c-o)*g,1.95-v-.2,l+(h-l)*g,d,.16,.2,.03,Math.PI),0)}}});this.fair=new Pe(e,We({vertexColors:!0}),16);for(const i of[this.poles,this.flags,this.crops,this.fair])i.instanceMatrix.setUsage(mn),i.frustumCulled=!1,i.castShadow=!0,i.receiveShadow=!0,i.count=0,this.group.add(i);for(let i=0;i<256;i++)this.flags.setColorAt(i,new Pt("#ffffff"))}mesh(t,e){const i=t+e;let s=this.meshes.get(i);return s||(s=new Pe(Tr(t,e),this.mat,t==="center"||t==="camp"?8:64),s.instanceMatrix.setUsage(mn),s.frustumCulled=!1,s.castShadow=!0,s.receiveShadow=!0,s.count=0,this.meshes.set(i,s),this.group.add(s)),s}update(t,e,i,s=0){const r=new Map;let a=0,o=0,l=0;const c=t.size,h=t.explored[e];this.fires.length=0,this.smokes.length=0;const u=new Pt,d=new Set;for(let f=0;f<t.top;f++){if(!t.alive[f]||t.kind[f]<Zt)continue;const g=be[t.kind[f]-Zt],v=t.owner[f],m=t.x[f]/256,p=t.z[f]/256;if(i&&v!==e&&!h[Math.floor(p)*c+Math.floor(m)])continue;const M=v>=0&&v<t.players.length?t.players[v].era:0;if(g.key==="farm"){let b=this.farms.get(f);if(b&&(b.x!==m||b.z!==p)&&(this.group.remove(b.mesh),b.mesh.geometry.dispose(),b=void 0),!b){const y=new Ne(bx(t.map,m,p),this.mat);y.receiveShadow=y.castShadow=!0,this.group.add(y),b={mesh:y,x:m,z:p},this.farms.set(f,b)}if(b.mesh.visible=!0,d.add(f),t.done[f])for(let y=0;y<4;y++)for(let S=0;S<9&&o<this.crops.instanceMatrix.count;S++){const L=m-1.25+S*.31,U=p-1.12+y*.75;this.crops.setMatrixAt(o++,k(L,$t(t.map,L,U)+.08,U,(S*7+y)%6,1,.85+(S+y)%3*.12,1))}continue}const x=this.mesh(g.key,Math.min(M,2)),_=r.get(x)??0;if(_>=x.instanceMatrix.count)continue;const P=$t(t.map,m,p),T=t.done[f]===1,E=T?1:Math.max(.12,Math.min(1,t.work[f]/(g.time*100))),w=(f*2654435761>>>0)%4*Math.PI/2;if(x.setMatrixAt(_,k(m,P-.02,p,g.key==="farm"?0:w,1,E,1)),r.set(x,_+1),g.key!=="farm"&&!g.wall&&T&&a<256){const b=g.size/2-.25,y=m+b,S=p-b;this.poles.setMatrixAt(a,k(y,$t(t.map,y,S),S)),this.flags.setMatrixAt(a,k(y,$t(t.map,y,S),S,Math.sin(s*1.1+f)*.15)),this.flags.setColorAt(a,u.set(v===hi?"#efe6cf":t.players[v]?.color??"#888")),a++}if(T&&g.key==="forge"){const S=m+.45*Math.cos(w)+.12*Math.sin(w),L=p-.45*Math.sin(w)+.12*Math.cos(w),U=m+.55*Math.cos(w)-.45*Math.sin(w),D=p-.55*Math.sin(w)-.45*Math.cos(w);this.fires.push({x:S,y:$t(t.map,S,L)+.1,z:L,s:.16}),this.smokes.push({x:U,y:$t(t.map,U,D)+1.5,z:D,s:.6})}if(T&&g.market&&t.fair&&l<16&&this.fair.setMatrixAt(l++,k(m,P-.02,p,w)),T&&(g.key==="center"||g.key==="camp")){const b=M>=1&&g.key==="center",y=b?m+1.2*Math.cos(w)+1.3*Math.sin(w):m,S=b?p-1.2*Math.sin(w)+1.3*Math.cos(w):p;this.fires.push({x:y,y:$t(t.map,y,S)+.15,z:S,s:M>=1&&g.key==="center"?.42:.6}),this.smokes.push({x:y,y:$t(t.map,y,S)+.3,z:S,s:1})}}for(const f of this.meshes.values())f.count=r.get(f)??0,f.instanceMatrix.needsUpdate=!0;for(const[f,g]of this.farms)d.has(f)||(!t.alive[f]||t.kind[f]!==Zt+Ze.farm?(this.group.remove(g.mesh),g.mesh.geometry.dispose(),this.farms.delete(f)):g.mesh.visible=!1);this.poles.count=this.flags.count=a,this.poles.instanceMatrix.needsUpdate=this.flags.instanceMatrix.needsUpdate=!0,this.flags.instanceColor&&(this.flags.instanceColor.needsUpdate=!0),this.crops.count=o,this.crops.instanceMatrix.needsUpdate=!0,this.fair.count=l,this.fair.instanceMatrix.needsUpdate=!0}}class wx{constructor(t=48){R(this,"mesh");this.mesh=new Pe(new Sr(.32,1,6).translate(0,.5,0),vc(new ui({color:16777215,toneMapped:!1}),{NO_SNOW:""}),t),this.mesh.instanceMatrix.setUsage(mn),this.mesh.frustumCulled=!1;for(let e=0;e<t;e++)this.mesh.setColorAt(e,new Pt(e%2?"#ffd166":"#ff7b2e"))}update(t,e){let i=0;const s=this.mesh.instanceMatrix.count;for(const r of t){const a=.85+Math.sin(e*13+r.x)*.12+Math.sin(e*29+r.z)*.08;i<s&&this.mesh.setMatrixAt(i++,k(r.x,r.y,r.z,e*2+r.x,r.s,r.s*1.25*a,r.s)),i<s&&this.mesh.setMatrixAt(i++,k(r.x,r.y,r.z,-e*3,r.s*.55,r.s*.85*(2-a),r.s*.55))}this.mesh.count=i,this.mesh.instanceMatrix.needsUpdate=!0}}const Cx=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`,Rx=`varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class Px{constructor(t,e=500){R(this,"n");R(this,"pos");R(this,"a");R(this,"sz");R(this,"colr");R(this,"age");R(this,"life");R(this,"vel");R(this,"grow");R(this,"next",0);R(this,"acc",0);R(this,"geo",new De);R(this,"mat");R(this,"points");this.n=e,this.pos=new Float32Array(e*3),this.a=new Float32Array(e),this.sz=new Float32Array(e).fill(1),this.colr=new Float32Array(e*3),this.age=new Float32Array(e).fill(99),this.life=new Float32Array(e),this.vel=new Float32Array(e*3),this.grow=new Float32Array(e),this.geo.setAttribute("position",new Le(this.pos,3).setUsage(mn)),this.geo.setAttribute("aA",new Le(this.a,1).setUsage(mn)),this.geo.setAttribute("aS",new Le(this.sz,1).setUsage(mn)),this.geo.setAttribute("aC",new Le(this.colr,3).setUsage(mn)),this.mat=new Fn({transparent:!0,depthWrite:!1,uniforms:{...t,uPR:{value:1},uSize:{value:2.6}},vertexShader:Cx,fragmentShader:Rx}),this.points=new Mu(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=3}emit(t,e,i,s,r,a,o,l,c,h){const u=this.next;this.next=(this.next+1)%this.n,this.pos.set([t,e,i],u*3),this.vel.set([s,r,a],u*3),this.colr.set([h.r,h.g,h.b],u*3),this.age[u]=0,this.life[u]=o,this.sz[u]=l,this.grow[u]=c}smoke(t,e){this.acc+=t;const i=new Pt(.86,.85,.83);for(;this.acc>.2;){this.acc-=.2;for(const s of e)Math.random()<.5&&this.emit(s.x+(Math.random()-.5)*.2,s.y+.4,s.z+(Math.random()-.5)*.2,.2+Math.random()*.2,.6+Math.random()*.4,.1+Math.random()*.15,3.5+Math.random()*2,.5,1.6,i)}}puff(t,e,i,s){const r=new Pt(.62,.55,.45),a=s?22:9;for(let o=0;o<a;o++){const l=Math.random()*En,c=(s?1.4:.7)*(.4+Math.random());this.emit(t,e+.2,i,Math.cos(l)*c,.3+Math.random()*.6,Math.sin(l)*c,.9+Math.random()*.6,s?1.4:.8,1.2,r)}}update(t){for(let e=0;e<this.n;e++){if(this.age[e]>this.life[e]){this.a[e]=0;continue}this.age[e]+=t;const i=this.age[e]/this.life[e],s=1-Math.min(.9,t*1.5);this.vel[e*3]*=s,this.vel[e*3+2]*=s,this.pos[e*3]+=this.vel[e*3]*t,this.pos[e*3+1]+=this.vel[e*3+1]*t,this.pos[e*3+2]+=this.vel[e*3+2]*t,this.a[e]=Math.sin(Math.min(i,1)*Math.PI)*.4,this.sz[e]=this.sz[e]+this.grow[e]*t/this.life[e]*.5}for(const e of["position","aA","aS","aC"])this.geo.attributes[e].needsUpdate=!0}}class Ix{constructor(){R(this,"group",new Wn);R(this,"spears");R(this,"arrows");R(this,"stones");R(this,"list",[]);R(this,"ray",new ja);R(this,"ta",new O);R(this,"tb",new O);R(this,"tc",new O);R(this,"th",new O);const t=fe(r=>{r.add("cyl5","#7a5a3c",k(0,-1.88,0,0,.035,1.7,.035),0),r.add("cone4","#b9b4aa",k(0,-.18,0,0,.065,.18,.065),0)}).rotateX(Math.PI/2),e=fe(r=>{r.add("cyl5","#8a6a48",k(0,-.72,0,0,.018,.64,.018),0),r.add("cone4","#b9b4aa",k(0,-.1,0,0,.045,.1,.045),0),r.add("box","#e8e2d4",k(0,-.7,0,0,.012,.12,.07),0),r.add("box","#e8e2d4",k(0,-.7,0,0,.07,.12,.012),0)}).rotateX(Math.PI/2),i=fe(r=>r.add("dode","#8f8a80",k(0,0,-.05,0,.11,.1,.11),0)),s=We({vertexColors:!0},{NO_SNOW:""});this.spears=new Pe(t,s,96),this.arrows=new Pe(e,s,96),this.stones=new Pe(i,s,96);for(const r of[this.spears,this.arrows,this.stones])r.instanceMatrix.setUsage(mn),r.frustumCulled=!1,r.castShadow=!0,r.count=0,this.group.add(r)}add(t,e,i,s,r,a,o,l,c,h,u){const d=o==="arrow",f=o==="stone";if(o==="spear"&&l<Wl)return;let g,v,m;if(c>=Zt){const w=t.alive[h]?this.hitBuilding(t,h,e,i):null;w?(g=w.x,v=w.z,m=w.y):(g=s,v=r,m=$t(t.map,s,r)+.08)}else{const w=Math.hypot(s-e,r-i)||1,b=w-(_t[c]?.radius??.3)*.8;g=e+(s-e)/w*b,v=i+(r-i)/w*b,m=$t(t.map,g,v)+wu(c)}const p=Math.hypot(g-e,v-i)||1,M=(g-e)/p,x=(v-i)/p,_=u!==void 0?.9:d?.75:f?.3:1.7;if(p-_<.15)return;const P=e+M*_,T=i+x*_,E=u!==void 0?$t(t.map,e,i)+u:$t(t.map,P,T)+(d?.88:f?1.55:1.1);this.list.push({x0:P,z0:T,y0:E,x1:g,z1:v,y1:m,arc:(p-_)*(d?.1:f?.07:.18),t:0,dur:Math.max(.15,a/10),kind:o})}hitBuilding(t,e,i,s){const r=be[t.kind[e]-Zt],a=t.owner[e],o=Math.min(a>=0&&a<t.players.length?t.players[a].era:0,2),l=Tr(r.key,o),c=l.attributes.position.array,h=t.done[e]?1:Math.max(.12,Math.min(1,t.work[e]/(r.time*100))),u=t.x[e]/256,d=t.z[e]/256,f=$t(t.map,u,d)-.02,g=r.key==="farm"?0:(e*2654435761>>>0)%4*Math.PI/2,v=i-u,m=s-d,p=Math.cos(g),M=Math.sin(g),x=v*p-m*M,_=v*M+m*p,P=Math.hypot(x,_)||1,T=-x/P,E=-_/P,w=-E,b=T;let y=0,S=0,L=0,U=!1;for(const D of[0,.35,-.35,.7,-.7,1.05,-1.05,1.4,-1.4]){let B=1/0;for(const V of[.9,.6,.35]){const j=x+w*D,z=_+b*D,F=-(j*T+z*E);this.ray.origin.set(j,V/h,z),this.ray.direction.set(T,0,E);for(let H=0;H+8<c.length;H+=9){if(this.ta.set(c[H],c[H+1],c[H+2]),this.tb.set(c[H+3],c[H+4],c[H+5]),this.tc.set(c[H+6],c[H+7],c[H+8]),!this.ray.intersectTriangle(this.ta,this.tb,this.tc,!1,this.th))continue;const Y=this.th.distanceTo(this.ray.origin);Y>F+.1||Y>=B||(B=Y,y=this.th.x+T*.05,S=this.th.y,L=this.th.z+E*.05)}}if(B<1/0){U=!0;break}}return U?{x:u+y*p+L*M,y:f+S*h,z:d-y*M+L*p}:null}update(t){let e=0,i=0,s=0;const r=[],a=new Ii,o=new O,l=new O(1,1,1),c=new O,h=new O(0,0,1),u=new qt;for(const d of this.list){if(d.t+=t,d.t>d.dur+(d.kind==="stone"?.03:.35))continue;!d.hit&&d.t>=d.dur&&(d.hit=!0,Ln.emit(d.kind==="arrow"?"arrow.hit":d.kind==="stone"?"stone.hit":"spear.hit",d.x1,d.z1));const f=d.kind==="arrow"?this.arrows:d.kind==="stone"?this.stones:this.spears,g=d.kind==="arrow"?i:d.kind==="stone"?s:e;if(g>=96)continue;r.push(d);const v=Math.min(1,d.t/d.dur);o.set(d.x0+(d.x1-d.x0)*v,d.y0+(d.y1-d.y0)*v+Math.sin(v*Math.PI)*d.arc,d.z0+(d.z1-d.z0)*v),c.set(d.x1-d.x0,d.y1-d.y0+Math.cos(v*Math.PI)*d.arc*Math.PI,d.z1-d.z0).normalize(),a.setFromUnitVectors(h,c),f.setMatrixAt(g,u.compose(o,a,l)),d.kind==="arrow"?i++:d.kind==="stone"?s++:e++}this.list=r,this.spears.count=e,this.arrows.count=i,this.stones.count=s,this.spears.instanceMatrix.needsUpdate=this.arrows.instanceMatrix.needsUpdate=this.stones.instanceMatrix.needsUpdate=!0}}const Lx=(n,t,e)=>n+(t-n)*e,Dx=(n,t,e)=>{const i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};class Ux{constructor(t,e,i,s){R(this,"cam");R(this,"x");R(this,"z");R(this,"yaw");R(this,"dist");R(this,"tx");R(this,"tz");R(this,"tyaw");R(this,"tdist");R(this,"minD",14);R(this,"maxD",110);this.map=t,this.cam=new bn(42,1,.5,900),this.x=this.tx=e,this.z=this.tz=i,this.yaw=this.tyaw=s,this.dist=70,this.tdist=44}pitch(t=this.dist){return Lx(.66,1.12,Dx(this.minD,this.maxD,t))}update(t){const e=1-Math.exp(-t*9),i=this.map.size;this.tx=Math.min(i-8,Math.max(8,this.tx)),this.tz=Math.min(i-8,Math.max(8,this.tz)),this.tdist=Math.min(this.maxD,Math.max(this.minD,this.tdist)),this.x+=(this.tx-this.x)*e,this.z+=(this.tz-this.z)*e,this.yaw+=(this.tyaw-this.yaw)*e,this.dist+=(this.tdist-this.dist)*e;const s=this.pitch(),r=Math.max($t(this.map,this.x,this.z),0),a=Math.cos(s)*this.dist;this.cam.position.set(this.x+Math.sin(this.yaw)*a,r+Math.sin(s)*this.dist,this.z+Math.cos(this.yaw)*a),this.cam.lookAt(this.x,r+.6,this.z),this.cam.updateMatrixWorld()}pan(t,e,i){const s=this.pitch(),r=.77*this.dist/i,a=Math.cos(this.yaw),o=-Math.sin(this.yaw),l=-Math.sin(this.yaw),c=-Math.cos(this.yaw);this.tx+=(-t*a+e*l/Math.sin(s))*r,this.tz+=(-t*o+e*c/Math.sin(s))*r}setAspect(t,e){this.cam.aspect=t/e,this.cam.fov=t/e<1?55:42,this.cam.updateProjectionMatrix()}ground(t,e,i,s){const r=new O(t/i*2-1,-(e/s)*2+1,.5).unproject(this.cam),a=this.cam.position.clone(),o=r.sub(a).normalize();let l=0,c=0;const h=this.map.size;for(let u=0;u<400;u++){l+=.6+l*.01;const d=a.x+o.x*l,f=a.y+o.y*l,g=a.z+o.z*l;if(d<-20||g<-20||d>h+20||g>h+20||l>900)return null;if(f<=Math.max($t(this.map,d,g),-.1)){let v=c,m=l;for(let p=0;p<12;p++){const M=(v+m)/2;a.y+o.y*M<=Math.max($t(this.map,a.x+o.x*M,a.z+o.z*M),-.1)?m=M:v=M}return new O(a.x+o.x*m,a.y+o.y*m,a.z+o.z*m)}c=l}return null}toScreen(t,e,i,s,r,a){a.set(t,e,i).project(this.cam);const o=a.z<1;return a.set((a.x+1)/2*s,(1-a.y)/2*r,o?1:0),a}}const rd=[{grassA:"#6fa84a",grassB:"#93c25a",leaf:"#7cbc4c",leafAmt:1,crop:.32,cropC:"#86c457",flower:1,snow:0,sun:"#fff2dc",sunI:2.7,elev:.95,top:"#78ade0",hor:"#d3e6ef",hS:"#cfe6ff",hG:"#6b7a4a",hI:1,fog:"#cfe2eb",sh:"#5cb8b2",dp:"#1f6079",w:[0,0,1]},{grassA:"#86a845",grassB:"#bcae57",leaf:"#4f8a3a",leafAmt:1,crop:1,cropC:"#e3bf52",flower:.3,snow:0,sun:"#fff0d0",sunI:3,elev:1.1,top:"#64a2de",hor:"#d9e7ee",hS:"#d6ebff",hG:"#7a7a4a",hI:1.05,fog:"#d4e3ea",sh:"#62c0b4",dp:"#1d6a80",w:[0,0,0]},{grassA:"#8f9a4c",grassB:"#ad8b47",leaf:"#d4782f",leafAmt:.82,crop:.14,cropC:"#b99a5c",flower:0,snow:0,sun:"#ffd6a6",sunI:2.55,elev:.72,top:"#8aa8c6",hor:"#e6d9c4",hS:"#e8dccb",hG:"#7a5f3a",hI:1,fog:"#e0d4c2",sh:"#5aa9a2",dp:"#235a6e",w:[0,1,0]},{grassA:"#7e8a6c",grassB:"#8d9079",leaf:"#6b5a45",leafAmt:0,crop:0,cropC:"#9a8a6a",flower:0,snow:1,sun:"#e9f0ff",sunI:2.15,elev:.5,top:"#98b0c6",hor:"#e6ebee",hS:"#e6eef8",hG:"#8b9096",hI:1.2,fog:"#e1e7ec",sh:"#4f8f98",dp:"#1f4a5e",w:[1,0,0]}],ad=["grassA","grassB","leaf","cropC","sun","top","hor","hS","hG","fog","sh","dp"],od=["leafAmt","crop","flower","snow","sunI","elev","hI"];class kx{constructor(t){R(this,"c",{});R(this,"n",{});R(this,"w",[0,0,0]);R(this,"tmp",new Pt);const e=rd[t];for(const i of ad)this.c[i]=yn(e[i]);for(const i of od)this.n[i]=e[i];this.w=[...e.w]}update(t,e,i){const s=rd[e],r=1-Math.exp(-t*.3);for(const l of ad)this.c[l].lerp(this.tmp.set(s[l]),r);for(const l of od)this.n[l]+=(s[l]-this.n[l])*r;for(let l=0;l<3;l++)this.w[l]+=(s.w[l]-this.w[l])*r;const a=this.c,o=this.n;Me.uGrassA.value.copy(a.grassA),Me.uGrassB.value.copy(a.grassB),Me.uLeafColor.value.copy(a.leaf),Me.uCropColor.value.copy(a.cropC),Me.uLeaf.value=o.leafAmt,Me.uCrop.value=o.crop,Me.uFlower.value=o.flower,Me.uSnow.value=o.snow,Me.uFruit.value=Math.max(0,1-o.snow*1.6),Me.uShallow.value.copy(a.sh),Me.uDeep.value.copy(a.dp),i.sun.color.copy(a.sun),i.sun.intensity=o.sunI,i.hemi.color.copy(a.hS),i.hemi.groundColor.copy(a.hG),i.hemi.intensity=o.hI,i.sky.uniforms.uTop.value.copy(a.top),i.sky.uniforms.uHor.value.copy(a.hor),i.fog.color.copy(a.fog)}get elev(){return this.n.elev}}const Nx=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`,zx=`uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class Fx{constructor(t,e=1){R(this,"group",new Wn);R(this,"list");this.map=t,this.list=[this.make(Math.round(1500*e),.55,"#ffffff","#e8eef6",2.2,.4,30),this.make(Math.round(220*e),.85,"#d9772f","#b8452a",.9,1.4,11),this.make(Math.round(110*e),.62,"#f49ac0","#e2709c",.6,1.1,6)]}make(t,e,i,s,r,a,o){t=Math.max(1,t);const l=new Float32Array(t*3),c=new Float32Array(t),h=new Float32Array(t),u=new Float32Array(t);for(let v=0;v<t;v++)l[v*3]=(Math.random()-.5)*90,l[v*3+1]=-999,l[v*3+2]=(Math.random()-.5)*90,c[v]=Math.random(),h[v]=Math.random()*100,u[v]=.7+Math.random()*.6;const d=new De;d.setAttribute("position",new Le(l,3).setUsage(mn)),d.setAttribute("aK",new Le(c,1)),d.setAttribute("aS",new Le(u,1));const f=new Fn({transparent:!0,depthWrite:!1,uniforms:{uFow:Me.uFow,uFowOn:Me.uFowOn,uWorld:Me.uWorld,uPR:{value:1},uSize:{value:e},uColA:{value:yn(i)},uColB:{value:yn(s)},uAmt:{value:0}},vertexShader:Nx,fragmentShader:zx}),g=new Mu(d,f);return g.frustumCulled=!1,g.renderOrder=4,g.visible=!1,this.group.add(g),{p:g,pos:l,seed:h,n:t,use:t,fall:r,sway:a,m:f,hMax:o}}setScale(t){for(const e of this.list)e.use=Math.max(1,Math.round(e.n*t)),e.p.geometry.setDrawRange(0,e.use)}setPixelRatio(t){for(const e of this.list)e.m.uniforms.uPR.value=t}update(t,e,i,s,r){this.list.forEach((a,o)=>{if(a.m.uniforms.uAmt.value=i[o],i[o]<.01){a.p.visible=!1;return}a.p.visible=!0;for(let l=0;l<a.use;l++){const c=a.seed[l];let h=a.pos[l*3],u=a.pos[l*3+1],d=a.pos[l*3+2];u-=a.fall*t*(.7+c%1*.6),h+=(Math.sin(e+c)*a.sway+.4)*t,d+=Math.cos(e*.8+c)*a.sway*.5*t;const f=h-s,g=d-r;f>45&&(h-=90),f<-45&&(h+=90),g>45&&(d-=90),g<-45&&(d+=90);const v=$t(this.map,h,d);(u<v||u>v+a.hMax+4)&&(u=v+a.hMax*(.45+Math.random()*.55)),a.pos[l*3]=h,a.pos[l*3+1]=u,a.pos[l*3+2]=d}a.p.geometry.attributes.position.needsUpdate=!0})}}const Fa=[{key:"high",pr:2,shadow:2048,trees:1,tufts:1,weather:1},{key:"medium",pr:1.5,shadow:1024,trees:.75,tufts:.5,weather:.55},{key:"low",pr:1,shadow:0,trees:.55,tufts:0,weather:.25}],Ox={move:"#9dffc4",attack:"#ff7a5c",work:"#ffd166"};class Cu{constructor(t,e,i){R(this,"renderer");R(this,"scene",new X1);R(this,"camera");R(this,"sun");R(this,"hemi");R(this,"sky");R(this,"skyMat");R(this,"nature");R(this,"units",new xx);R(this,"buildings",new Ax);R(this,"flames",new wx);R(this,"particles");R(this,"projectiles",new Ix);R(this,"weather");R(this,"seasons");R(this,"fowTex");R(this,"fowData");R(this,"fogOn",!0);R(this,"ghost");R(this,"foot");R(this,"ghostKey","");R(this,"pings",[]);R(this,"pingI",0);R(this,"rally");R(this,"rallyFlag");R(this,"shadowExt",0);R(this,"lastFogTick",-1);R(this,"q",0);R(this,"metalOn",!1);R(this,"wallGhost",null);R(this,"wallGhostEra",-1);this.world=e,this.me=i;const s=e.map,r=s.size;this.renderer=t,this.scene.fog=new pc(13624043,130,360),this.fowData=new Uint8Array(new ArrayBuffer(r*r)),this.fowTex=new _u(this.fowData,r,r,Ya,Kn),this.fowTex.magFilter=this.fowTex.minFilter=kn,this.fowTex.needsUpdate=!0,Me.uFow.value=this.fowTex,Me.uWorld.value=r,this.skyMat=new Fn({side:tn,depthWrite:!1,fog:!1,uniforms:{uTop:{value:yn("#78ade0")},uHor:{value:yn("#d3e6ef")}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`}),this.sky=new Ne(new Er(600,24,12),this.skyMat),this.sky.renderOrder=-10,this.scene.add(this.sky),this.hemi=new j1(13625087,7043658,1),this.scene.add(this.hemi),this.sun=new Q1(16773852,2.7),this.sun.castShadow=!0,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target),this.scene.add(rx(s),ax(s)),this.nature=lx(s),this.scene.add(this.nature.group);for(const c of this.nature.metal)c.visible=e.players[i].era>=2;this.syncNature(),this.scene.add(this.buildings.group,this.flames.mesh,this.projectiles.group,this.units.group),this.particles=new Px({uFow:Me.uFow,uFowOn:Me.uFowOn,uWorld:Me.uWorld},600),this.scene.add(this.particles.points),this.weather=new Fx(s),this.scene.add(this.weather.group),this.seasons=new kx(e.season),this.ghost=new Ne(new De,new Ra({vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1,flatShading:!0})),this.ghost.visible=!1,this.ghost.renderOrder=7,this.foot=new Ne(new Li(1,1).rotateX(-Math.PI/2),new ui({color:7331978,transparent:!0,opacity:.35,depthTest:!1,depthWrite:!1,toneMapped:!1})),this.foot.visible=!1,this.foot.renderOrder=6,this.scene.add(this.ghost,this.foot);const a=new to(.3,.55,28).rotateX(-Math.PI/2);for(let c=0;c<4;c++){const h=new Ne(a,new ui({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));h.renderOrder=6,h.visible=!1,this.scene.add(h),this.pings.push({m:h,t:0})}this.rally=new Wn,this.rally.add(new Ne(new fi(.04,.04,1.6,5).translate(0,.8,0),new Ra({color:7229239}))),this.rallyFlag=new Ne(new Fe(.5,.34,.03).translate(.27,1.38,0),new ui({color:16777215,toneMapped:!1})),this.rally.add(this.rallyFlag),this.rally.visible=!1,this.scene.add(this.rally);const o=e.players[i].start,l=r/2;this.camera=new Ux(s,o.x+(l-o.x)*.06,o.z+(l-o.z)*.06,Math.atan2(o.x-l,o.z-l)),this.updateFog(!0)}static makeRenderer(t){const e=new q1({canvas:t,antialias:!0,powerPreference:"high-performance"});return e.outputColorSpace=on,e.toneMapping=Gd,e.toneMappingExposure=1.08,e.shadowMap.enabled=!0,e.shadowMap.type=Hd,e}syncNature(){const t=this.world;for(const e of t.map.res){const i=e.z*t.size+e.x;t.resKind[i]===0?this.nature.removeRes(i):t.resKind[i]===Je&&t.resAmt[i]<=0&&this.nature.setBerries(i,!1)}}setQuality(t){this.q=t;const e=Fa[t],i=Math.min(window.devicePixelRatio||1,e.pr);this.renderer.setPixelRatio(i),this.sun.castShadow=e.shadow>0,e.shadow>0&&this.sun.shadow.mapSize.x!==e.shadow&&(this.sun.shadow.mapSize.set(e.shadow,e.shadow),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.nature.setDensity(e.trees,e.tufts),this.particles.mat.uniforms.uPR.value=i,this.weather.setPixelRatio(i),this.weather.setScale(e.weather)}get quality(){return this.q}resize(t,e){this.renderer.setSize(t,e,!1),this.camera.setAspect(t,e)}setFog(t){this.fogOn=t,Me.uFowOn.value=t?1:0}seen(t,e){if(!this.fogOn)return!0;const i=this.world.size,s=Math.floor(t),r=Math.floor(e);return s>=0&&r>=0&&s<i&&r<i&&this.world.vis[this.me][r*i+s]===1}consume(t){const e=this.world,i=e.map;for(const s of t)switch(s.t){case"tree":this.nature.removeTree(s.k);break;case"res":{const r=s.k;e.resKind[r]===0?this.nature.removeRes(r):e.resKind[r]===Je&&this.nature.setBerries(r,e.resAmt[r]>0);break}case"death":if(s.kind<Zt){const r=s.x/256,a=s.z/256;this.seen(r,a)&&this.particles.puff(r,$t(i,r,a),a,!1)}break;case"built":case"gone":{const r=e.x[s.e]/256,a=e.z[s.e]/256;this.seen(r,a)&&this.particles.puff(r,$t(i,r,a),a,!0);break}case"proj":{const r=s.x0/256,a=s.z0/256,o=s.x1/256,l=s.z1/256;(this.seen(r,a)||this.seen(o,l))&&this.projectiles.add(e,r,a,o,l,s.ticks,s.kind,s.gap/256,s.tk,s.te,s.h);break}case"age":if(s.player===this.me&&s.era>=2)for(const r of this.nature.metal)r.visible=!0;break}}setWallGhost(t,e=[]){const i=this.world.players[this.me].era;(!this.wallGhost||this.wallGhostEra!==Math.min(i,2))&&(this.wallGhost&&(this.scene.remove(this.wallGhost),this.wallGhost.dispose()),this.wallGhost=new Pe(Tr("wall",i),new Ra({vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1,flatShading:!0}),40),this.wallGhost.renderOrder=7,this.wallGhost.frustumCulled=!1,this.wallGhostEra=Math.min(i,2),this.scene.add(this.wallGhost));const s=this.wallGhost,r=this.world.size,a=new Pt;let o=0;for(let l=0;t&&l<t.length&&o<40;l++){const c=t[l]%r+.5,h=Math.floor(t[l]/r)+.5;s.setMatrixAt(o,new qt().makeTranslation(c,$t(this.world.map,c,h),h)),s.setColorAt(o,a.set(e[l]?"#d8ffe2":"#ff8f80")),o++}s.count=o,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0)}setGhost(t,e=0,i=0,s=!0){if(!t){this.ghost.visible=this.foot.visible=!1;return}const r=be[Ze[t]],a=this.world.players[this.me].era,o=t+Math.min(a,2);o!==this.ghostKey&&(this.ghost.geometry=Tr(t,a),this.ghostKey=o);const l=e+r.size/2,c=i+r.size/2,h=$t(this.world.map,l,c);this.ghost.position.set(l,h,c),this.ghost.visible=!0,this.ghost.material.color.set(s?"#d8ffe2":"#ff8f80"),this.foot.position.set(l,h+.12,c),this.foot.scale.set(r.size,1,r.size),this.foot.visible=!0,this.foot.material.color.set(s?"#6fe08a":"#e0533c")}ping(t,e,i){const s=this.pings[this.pingI++%this.pings.length];s.t=.7,s.m.position.set(t,$t(this.world.map,t,e)+.08,e),s.m.material.color.set(Ox[i]),s.m.visible=!0}render(t,e,i,s){const r=this.world,a=this.camera;Me.uTime.value=s,a.update(t),this.seasons.update(t,r.season,{sun:this.sun,hemi:this.hemi,sky:this.skyMat,fog:this.scene.fog});const o=2.25,l=this.seasons.elev;this.sun.position.set(a.x+Math.cos(o)*Math.cos(l)*120,Math.sin(l)*120,a.z+Math.sin(o)*Math.cos(l)*120),this.sun.target.position.set(a.x,0,a.z),this.sun.target.updateMatrixWorld();const c=Math.round(Math.min(90,Math.max(28,a.dist*.95))/4)*4;if(c!==this.shadowExt){this.shadowExt=c;const d=this.sun.shadow.camera;d.left=-c,d.right=c,d.top=c,d.bottom=-c,d.near=1,d.far=300,d.updateProjectionMatrix()}this.sky.position.copy(a.cam.position),this.updateFog();const h=r.players[this.me].era>=2;if(h!==this.metalOn){this.metalOn=h;for(const d of this.nature.metal)d.visible=h}this.buildings.update(r,this.me,this.fogOn,s),this.units.update(r,e,t,i,this.me,this.fogOn,s,a.cam.quaternion),this.flames.update(this.buildings.fires,s),this.particles.smoke(t,this.buildings.smokes),this.particles.update(t),this.projectiles.update(t),this.weather.update(t,s,this.seasons.w,a.x,a.z);for(const d of this.pings)if(d.t>0){d.t-=t;const f=1-Math.max(0,d.t)/.7;d.m.scale.setScalar(1.4-f*.8),d.m.material.opacity=Math.max(0,1-f),d.t<=0&&(d.m.visible=!1)}let u=-1;if(i.size===1){const d=i.values().next().value;r.isBuilding(d)&&r.owner[d]===this.me&&r.rallyX[d]>=0&&(u=d)}if(u>=0){const d=r.rallyX[u]/256,f=r.rallyZ[u]/256;this.rally.position.set(d,$t(r.map,d,f),f),this.rally.visible=!0,this.rallyFlag.rotation.y=Math.sin(s*1.4)*.2,this.rallyFlag.material.color.set(r.players[this.me].color)}else this.rally.visible=!1;this.renderer.render(this.scene,a.cam)}updateFog(t=!1){const e=this.world;if(!t&&e.tick===this.lastFogTick)return;this.lastFogTick=e.tick;const i=e.vis[this.me],s=e.explored[this.me],r=this.fowData;for(let a=0;a<r.length;a++)r[a]=i[a]?255:s[a]?128:0;this.fowTex.needsUpdate=!0}dispose(){this.scene.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const i=e.material;Array.isArray(i)?i.forEach(s=>s.dispose()):i?.dispose()}),this.fowTex.dispose(),this.sun.shadow.map?.dispose(),this.renderer.renderLists.dispose()}}const Ru={"res.food":"Food","res.wood":"Wood","res.stone":"Stone","res.metal":"Metal","res.coins":"Coins","res.pop":"Population","pop.tip":"Population: {n} of {cap} (this era allows up to {max})","era.0":"Stone Age","era.1":"Neolithic","era.2":"Age of Metals","era.3":"Kingdom","era.4":"Republic","era.5":"Empire","era.1.to":"the Neolithic","era.2.to":"the Age of Metals","era.3.to":"the Kingdom","era.4.to":"the Republic","era.5.to":"the Empire","era.1.in":"the Neolithic","era.2.in":"the Age of Metals","era.3.in":"the Kingdom","era.4.in":"the Republic","era.5.in":"the Empire","season.0":"Spring","season.1":"Summer","season.2":"Autumn","season.3":"Winter","cal.year":"Year {y}","tribe.0":"Red tribe","tribe.1":"Blue tribe","tribe.2":"Yellow tribe","tribe.3":"Purple tribe","tribe.6":"Barbarians","tribe.wild":"Wild animal","tribe.you":"Your tribe","unit.villager":"Gatherer","unit.warrior":"Club Warrior","unit.hunter":"Hunter","unit.dog":"Dog","unit.axeman":"Axe Warrior","unit.archer":"Archer","unit.spearman":"Spearman","unit.deer":"Deer","unit.boar":"Wild Boar","unit.wolf":"Wolf","unit.aurochs":"Aurochs","unit.barbarian":"Barbarian","unit.carcass":"Hunted game","unit.villager.d":"Gathers food, wood and stone, hunts and builds.","unit.warrior.d":"Basic fighter with a club.","unit.hunter.d":"Throws spears from afar.","unit.dog.d":"Fast scout that sees far.","unit.axeman.d":"Stronger fighter with a stone axe.","unit.archer.d":"Shoots arrows from afar.","unit.spearman.d":"Strong against animals and horsemen.","unit.deer.d":"Runs away when hit. {food} food.","unit.boar.d":"Fights back! {food} food.","unit.wolf.d":"Dangerous. Hunts people who come close.","unit.aurochs.d":"Huge and strong. {food} food.","unit.barbarian.d":"Attacks every tribe.","unit.carcass.d":"Gatherers can take {food} food from it.","bld.center":"Village Center","bld.house":"House","bld.depot":"Storehouse","bld.military":"Training Ground","bld.farm":"Wheat Field","bld.pen":"Sheep Pen","bld.sanctuary":"Shrine","bld.camp":"Barbarian Camp","bld.center.d":"Trains gatherers and receives resources. Advance to the next era here.","bld.house.d":"Room for {n} more people.","bld.depot.d":"Gatherers drop resources here. Build it near trees or stone.","bld.military.d":"Trains warriors.","bld.farm.d":"One gatherer farms it. Gives food all year, except in winter.","bld.pen.d":"The sheep give food by themselves (not in winter).","bld.sanctuary.d":"Slowly heals your people nearby.","bld.camp.d":"Destroy it to take its loot.","do.idle":"Waiting for orders","do.forage":"Looking for food","do.move":"Walking","do.wood":"Cutting wood","do.berry":"Picking berries","do.stone":"Mining stone","do.metal":"Mining metal","do.farm":"Farming","do.meat":"Taking the meat","do.hunt":"Hunting","do.build":"Building","do.fight":"Fighting","do.return":"Carrying {n} {res} home","do.amove":"Marching","info.hp":"Health","info.building":"Under construction","info.queue":"Training","info.food":"Food","info.farmer":"Farmer: {who}","info.yes":"working","info.no":"nobody — send a gatherer","sel.none":"Nothing selected","sel.many":"{n} selected","sel.clear":"Clear selection","cmd.build":"Build","cmd.back":"Back","cmd.stop":"Stop","cmd.food":"Find food","cmd.food.d":"The gatherer looks for food by itself and does not stand still: meat on the ground, free fields and berries. In winter fields and berries rest, so it goes hunting deer.","cmd.food.off":"On: this gatherer looks for food by itself. Press again to turn it off.","cmd.rally":"Gather point","cmd.ageup":"Advance to {era}","cmd.aging":"Advancing to {era}…","cmd.cancelQueue":"Cancel the last one","cmd.place":"Build here","cmd.cancel":"Cancel","why.cost":"Not enough {res}.","why.pop":"Build more houses to train more people.","why.popEra":"Population limit of this era reached.","why.queue":"The line is full (5).","why.age":"First build 2 different kinds of buildings of this era ({n}/2).","why.ageBusy":"Already advancing.","why.villager":"Select a gatherer to build.","why.era":"Available in {era}.","why.maxEra":"More eras are coming in the next updates.","why.done":"Wait until it is built.","place.mouse":"Click where to build · right-click to cancel · hold Shift to build more","place.touch":"Tap where to build, then confirm","place.bad":"Can't build there.","rally.hint":"Tap where the new people should go","rally.set":"Gather point set.","btn.idle":"Idle","btn.army":"Army","btn.home":"Home","btn.fog":"Fog","btn.help":"Help","btn.menu":"Menu","q.high":"High","q.medium":"Medium","q.low":"Low","q.auto":"Graphics set to {q} ({fps} fps)","q.label":"Graphics","hint.mouse":"Left-click to select · right-click on a tree, bush, animal or the ground to give an order · drag to select many · WASD to move the view · wheel to zoom · Q/E to rotate","hint.touch":"Tap to select · then tap a tree, bush, animal or the ground to give an order · drag to move the view · hold and drag to select many · pinch to zoom","msg.built":"{b} is ready.","msg.hunger":"Hunger! There was not enough food for the winter: your people work slower.","msg.spring":"Spring: fields and bushes give food again.","msg.winter":"Winter: every person eats {n} food each month. Fields and berries rest.","msg.winterSoon":"Winter starts next month. Store food!","msg.underAttack":"We are under attack!","msg.campLoot":"Barbarian camp destroyed: +200 food and +150 wood!","msg.centerLost":"Our Village Center was destroyed!","msg.centerDanger":"Our Village Center is falling! Defend it or the tribe loses.","msg.popEra":"Population limit of this era reached.","msg.popHouses":"Build more houses so your tribe can grow.","msg.raidSoon":"Barbarians are coming!","msg.defeated":"{p} was defeated.","msg.youDefeated":"Your tribe was defeated.","msg.ageMe":"Your tribe entered {era}!","msg.ageOther":"{p} entered {era}.","msg.go":"See","menu.tagline":"From the Stone Age to the height of Rome","menu.continue":"Continue","menu.saved":"{era} · year {y} · {r} rivals","menu.new":"New game","menu.rivals":"Rival tribes","menu.difficulty":"Difficulty","diff.0":"Easy","diff.1":"Normal","diff.2":"Hard","menu.start":"Start","menu.back":"Back","menu.credits":"Made by Bento, Jojô and Pai","menu.local":"Your game is saved on this device.","menu.localCloud":"Your game is saved on this device and online, in your queres.games account.","menu.continueCloud":"Continue (online save)","cloud.login":"Sign in to save online","cloud.why":"With a queres.games account you can continue on another device.","cloud.account":"Account: {name} · saving online","pause.saving":"Saving…","pause.savedBoth":"Saved on this device and online.","pause.savedLocalOnly":"Saved on this device. The online save did not answer; it will try again.","pause.title":"Paused","pause.resume":"Back to the game","pause.save":"Save the game","pause.saved":"Game saved.","pause.saveFail":"Couldn't save on this device.","pause.quit":"Save and leave","pause.time":"{m} minutes played","end.victory":"Victory!","end.victory.d":"All rival tribes were defeated. Your people will be remembered.","end.defeat":"Defeat","end.defeat.d":"Your Village Center fell and your tribe was defeated. Try again!","end.watch":"Keep watching","end.menu":"Back to the menu","help.title":"How to play","help.close":"Back to the game","help.goal":"Goal: grow your tribe, survive the winters and destroy the Village Center of each rival tribe. If your Village Center falls, you lose. Reach the Neolithic to farm the land.","help.l1":"Select gatherers and send them to berries, trees, stone or animals: they bring everything home by themselves.","help.l2":"Build houses to grow, a storehouse near the trees and a training ground for warriors.","help.l5.touch":"Touch and hold an icon to see its name and what it does.","help.l5.mouse":"Rest the mouse on an icon to see its name and what it does.","help.l6":"Trees, stone, berries and animals run out and do not come back. Wheat fields never run out.","help.l7":'"Find food": the gatherer looks for food by itself; in winter it goes hunting.',"help.l3":"In winter each person eats food. Keep some stored!","help.l4":"When 2 kinds of buildings are ready, the Village Center can advance to the next era.","lang.label":"Language",loading:"Loading the world…","bld.forge":"Forge","bld.forge.d":"Research Bronze and Iron: stronger soldiers.","bld.market":"Market","bld.market.d":"Trade 100 of a resource for {get} of another. On fair days (the start of each season) you get {fair}. Research the Wheel here.","bld.stable":"Stable","bld.stable.d":"Trains horsemen.","bld.workshop":"Workshop","bld.workshop.d":"Builds battering rams.","bld.wall":"Stone Wall","bld.wall.d":"Blocks the way. Choose where it starts and where it ends.","bld.tower":"Tower","bld.tower.d":"Shoots arrows at enemies nearby.","bld.center.e2":"Chief's Hall","bld.military.e2":"Barracks","unit.swordsman":"Swordsman","unit.swordsman.d":"Strong fighter with a bronze sword. Beats spearmen.","unit.slinger":"Slinger","unit.slinger.d":"Throws stones with a sling. Good against fighters on foot.","unit.horseman":"Horseman","unit.horseman.d":"Fast. Beats ranged troops and rams. Weak against spearmen.","unit.ram":"Battering Ram","unit.ram.d":"Slow. Only attacks buildings, but hits very hard.","tech.bronze":"Bronze","tech.bronze.d":"+1 attack for soldiers.","tech.iron":"Iron","tech.iron.d":"+1 attack and +1 armor for soldiers.","tech.wheel":"Wheel","tech.wheel.d":"Gatherers carry 15 instead of 10.","trade.give":"Give {res}","trade.giveShort":"Give","trade.get":"Get {n} {res}","trade.fair":"Fair day!","why.techDone":"Already researched.","why.techQueued":"Already in the line.","why.needs":"First research {tech}.","why.trade":"You need 100 {res} to trade.","msg.tech":"Research done: {tech}!","msg.fair":"Fair day! Better trades at the Market for 30 seconds.","msg.metalSeen":"Metal appeared on the map! Gatherers can mine it.","place.wall1.mouse":"Click where the wall starts · right-click to cancel","place.wall1.touch":"Tap where the wall starts, then confirm","place.wall2.mouse":"Now click where the wall ends","place.wall2.touch":"Now tap where the wall ends, then confirm","snd.label":"Sound","snd.music":"Music","snd.sfx":"Effects","snd.amb":"Ambience","snd.l0":"Off","snd.l1":"Low","snd.l2":"Medium","snd.l3":"High","snd.mute":"Mute","snd.unmute":"Turn sound on"},Bx={"res.food":"Comida","res.wood":"Madeira","res.stone":"Pedra","res.metal":"Metal","res.coins":"Moedas","res.pop":"População","pop.tip":"População: {n} de {cap} (esta era permite até {max})","era.0":"Idade da Pedra","era.1":"Neolítico","era.2":"Idade dos Metais","era.3":"Reino","era.4":"República","era.5":"Império","era.1.to":"o Neolítico","era.2.to":"a Idade dos Metais","era.3.to":"o Reino","era.4.to":"a República","era.5.to":"o Império","era.1.in":"no Neolítico","era.2.in":"na Idade dos Metais","era.3.in":"no Reino","era.4.in":"na República","era.5.in":"no Império","season.0":"Primavera","season.1":"Verão","season.2":"Outono","season.3":"Inverno","cal.year":"Ano {y}","tribe.0":"Tribo vermelha","tribe.1":"Tribo azul","tribe.2":"Tribo amarela","tribe.3":"Tribo roxa","tribe.6":"Bárbaros","tribe.wild":"Animal selvagem","tribe.you":"Sua tribo","unit.villager":"Coletor","unit.warrior":"Guerreiro de clava","unit.hunter":"Caçador","unit.dog":"Cão","unit.axeman":"Guerreiro de machado","unit.archer":"Arqueiro","unit.spearman":"Lanceiro","unit.deer":"Cervo","unit.boar":"Javali","unit.wolf":"Lobo","unit.aurochs":"Auroque","unit.barbarian":"Bárbaro","unit.carcass":"Caça abatida","unit.villager.d":"Coleta comida, madeira e pedra, caça e constrói.","unit.warrior.d":"Lutador básico com clava.","unit.hunter.d":"Arremessa lanças de longe.","unit.dog.d":"Batedor rápido que enxerga longe.","unit.axeman.d":"Lutador mais forte, com machado de pedra.","unit.archer.d":"Atira flechas de longe.","unit.spearman.d":"Forte contra animais e cavaleiros.","unit.deer.d":"Foge quando é atingido. {food} de comida.","unit.boar.d":"Revida! {food} de comida.","unit.wolf.d":"Perigoso. Ataca quem chega perto.","unit.aurochs.d":"Enorme e forte. {food} de comida.","unit.barbarian.d":"Ataca todas as tribos.","unit.carcass.d":"Os coletores podem tirar {food} de comida daqui.","bld.center":"Centro da aldeia","bld.house":"Casa","bld.depot":"Depósito","bld.military":"Campo de treino","bld.farm":"Campo de trigo","bld.pen":"Curral","bld.sanctuary":"Santuário","bld.camp":"Acampamento bárbaro","bld.center.d":"Treina coletores e recebe recursos. Aqui se avança para a próxima era.","bld.house.d":"Espaço para mais {n} pessoas.","bld.depot.d":"Os coletores entregam recursos aqui. Construa perto de árvores ou pedras.","bld.military.d":"Treina guerreiros.","bld.farm.d":"Um coletor cultiva. Dá comida o ano todo, menos no inverno.","bld.pen.d":"As ovelhas dão comida sozinhas (menos no inverno).","bld.sanctuary.d":"Cura devagar o seu povo que estiver perto.","bld.camp.d":"Destrua para pegar o que eles guardam.","do.idle":"Esperando ordens","do.forage":"Procurando comida","do.move":"Andando","do.wood":"Cortando madeira","do.berry":"Colhendo frutos","do.stone":"Tirando pedra","do.metal":"Tirando metal","do.farm":"Cultivando","do.meat":"Pegando a carne","do.hunt":"Caçando","do.build":"Construindo","do.fight":"Lutando","do.return":"Levando {n} de {res} para casa","do.amove":"Marchando","info.hp":"Vida","info.building":"Em construção","info.queue":"Treinando","info.food":"Comida","info.farmer":"Lavrador: {who}","info.yes":"trabalhando","info.no":"ninguém — mande um coletor","sel.none":"Nada selecionado","sel.many":"{n} selecionados","sel.clear":"Limpar seleção","cmd.build":"Construir","cmd.back":"Voltar","cmd.stop":"Parar","cmd.food":"Buscar comida","cmd.food.d":"O coletor procura comida sozinho e não fica parado: carne no chão, campos livres e frutos. No inverno campos e frutos descansam, então ele vai caçar veados.","cmd.food.off":"Ligado: este coletor procura comida sozinho. Aperte de novo para desligar.","cmd.rally":"Ponto de encontro","cmd.ageup":"Avançar para {era}","cmd.aging":"Avançando para {era}…","cmd.cancelQueue":"Cancelar o último","cmd.place":"Construir aqui","cmd.cancel":"Cancelar","why.cost":"Falta {res}.","why.pop":"Construa mais casas para treinar mais gente.","why.popEra":"Limite de população desta era.","why.queue":"A fila está cheia (5).","why.age":"Antes, construa 2 tipos diferentes de construção desta era ({n}/2).","why.ageBusy":"Já está avançando.","why.villager":"Selecione um coletor para construir.","why.era":"Disponível {era}.","why.maxEra":"Mais eras chegam nas próximas atualizações.","why.done":"Espere terminar a construção.","place.mouse":"Clique onde construir · botão direito cancela · segure Shift para construir mais","place.touch":"Toque onde construir e depois confirme","place.bad":"Não dá para construir aí.","rally.hint":"Toque para onde as pessoas novas devem ir","rally.set":"Ponto de encontro marcado.","btn.idle":"Ocioso","btn.army":"Exército","btn.home":"Aldeia","btn.fog":"Névoa","btn.help":"Ajuda","btn.menu":"Menu","q.high":"Alta","q.medium":"Média","q.low":"Baixa","q.auto":"Gráficos ajustados para {q} ({fps} fps)","q.label":"Gráficos","hint.mouse":"Clique para selecionar · botão direito numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para selecionar vários · WASD move a vista · roda para zoom · Q/E para girar","hint.touch":"Toque para selecionar · depois toque numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para mover a vista · segure e arraste para selecionar vários · pinça para zoom","msg.built":"{b} ficou pronto.","msg.hunger":"Fome! Faltou comida no inverno: seu povo trabalha mais devagar.","msg.spring":"Primavera: os campos e os arbustos voltam a dar comida.","msg.winter":"Inverno: cada pessoa come {n} de comida por mês. Campos e frutos descansam.","msg.winterSoon":"O inverno começa no próximo mês. Guarde comida!","msg.underAttack":"Estamos sendo atacados!","msg.campLoot":"Acampamento bárbaro destruído: +200 de comida e +150 de madeira!","msg.centerLost":"Nosso Centro da aldeia foi destruído!","msg.centerDanger":"O Centro da aldeia está caindo! Defenda-o ou a tribo perde.","msg.popEra":"Limite de população desta era.","msg.popHouses":"Construa mais casas para a tribo crescer.","msg.raidSoon":"Os bárbaros estão vindo!","msg.defeated":"{p} foi derrotada.","msg.youDefeated":"Sua tribo foi derrotada.","msg.ageMe":"Sua tribo entrou {era}!","msg.ageOther":"{p} entrou {era}.","msg.go":"Ver","menu.tagline":"Da Idade da Pedra ao auge de Roma","menu.continue":"Continuar","menu.saved":"{era} · ano {y} · {r} rivais","menu.new":"Novo jogo","menu.rivals":"Tribos rivais","menu.difficulty":"Dificuldade","diff.0":"Fácil","diff.1":"Normal","diff.2":"Difícil","menu.start":"Começar","menu.back":"Voltar","menu.credits":"Feito por Bento, Jojô e Pai","menu.local":"Seu jogo fica salvo neste aparelho.","menu.localCloud":"Seu jogo fica salvo neste aparelho e na nuvem, na sua conta do queres.games.","menu.continueCloud":"Continuar (da nuvem)","cloud.login":"Entrar para salvar na nuvem","cloud.why":"Com uma conta do queres.games você continua em outro aparelho.","cloud.account":"Conta: {name} · salvando na nuvem","pause.saving":"Salvando…","pause.savedBoth":"Salvo neste aparelho e na nuvem.","pause.savedLocalOnly":"Salvo neste aparelho. A nuvem não respondeu; tento de novo depois.","pause.title":"Pausado","pause.resume":"Voltar ao jogo","pause.save":"Salvar o jogo","pause.saved":"Jogo salvo.","pause.saveFail":"Não deu para salvar neste aparelho.","pause.quit":"Salvar e sair","pause.time":"{m} minutos de jogo","end.victory":"Vitória!","end.victory.d":"Todas as tribos rivais foram derrotadas. Seu povo será lembrado.","end.defeat":"Derrota","end.defeat.d":"O Centro da aldeia caiu e sua tribo foi derrotada. Tente de novo!","end.watch":"Continuar olhando","end.menu":"Voltar ao menu","help.title":"Como jogar","help.close":"Voltar ao jogo","help.goal":"Objetivo: fazer sua tribo crescer, passar pelos invernos e destruir o Centro da aldeia de cada tribo rival. Se o seu Centro cair, você perde. Chegue ao Neolítico para plantar.","help.l1":"Selecione coletores e mande-os para frutos, árvores, pedras ou animais: eles levam tudo para casa sozinhos.","help.l2":"Construa casas para crescer, um depósito perto das árvores e um campo de treino para os guerreiros.","help.l5.touch":"Toque e segure um ícone para ver o nome e para que ele serve.","help.l5.mouse":"Pare o mouse em cima de um ícone para ver o nome e para que ele serve.","help.l6":"Árvores, pedras, frutos e animais acabam e não voltam. Os campos de trigo não acabam.","help.l7":'"Buscar comida": o coletor procura comida sozinho; no inverno, vai caçar.',"help.l3":"No inverno cada pessoa come. Deixe comida guardada!","help.l4":"Com 2 tipos de construção prontos, o Centro da aldeia pode avançar para a próxima era.","lang.label":"Idioma",loading:"Carregando o mundo…","bld.forge":"Forja","bld.forge.d":"Pesquise Bronze e Ferro: soldados mais fortes.","bld.market":"Mercado","bld.market.d":"Troque 100 de um recurso por {get} de outro. Nos dias de feira (no começo de cada estação), você recebe {fair}. Aqui se pesquisa a Roda.","bld.stable":"Estábulo","bld.stable.d":"Treina cavaleiros.","bld.workshop":"Oficina","bld.workshop.d":"Faz aríetes.","bld.wall":"Muralha","bld.wall.d":"Bloqueia a passagem. Escolha onde ela começa e onde termina.","bld.tower":"Torre","bld.tower.d":"Atira flechas nos inimigos por perto.","bld.center.e2":"Salão do chefe","bld.military.e2":"Quartel","unit.swordsman":"Espadachim","unit.swordsman.d":"Lutador forte, com espada de bronze. Vence lanceiros.","unit.slinger":"Fundeiro","unit.slinger.d":"Atira pedras com a funda. Bom contra lutadores a pé.","unit.horseman":"Cavaleiro","unit.horseman.d":"Rápido. Vence quem atira de longe e os aríetes. Fraco contra lanceiros.","unit.ram":"Aríete","unit.ram.d":"Lento. Só ataca construções, mas bate muito forte.","tech.bronze":"Bronze","tech.bronze.d":"+1 de ataque para os soldados.","tech.iron":"Ferro","tech.iron.d":"+1 de ataque e +1 de armadura para os soldados.","tech.wheel":"Roda","tech.wheel.d":"Os coletores levam 15 em vez de 10.","trade.give":"Dar {res}","trade.giveShort":"Dar","trade.get":"Receber {n} de {res}","trade.fair":"Dia de feira!","why.techDone":"Já pesquisado.","why.techQueued":"Já está na fila.","why.needs":"Primeiro pesquise {tech}.","why.trade":"Precisa de 100 de {res} para trocar.","msg.tech":"Pesquisa pronta: {tech}!","msg.fair":"Dia de feira! Trocas melhores no Mercado por 30 segundos.","msg.metalSeen":"O metal apareceu no mapa! Os coletores já podem minerar.","place.wall1.mouse":"Clique onde a muralha começa · botão direito cancela","place.wall1.touch":"Toque onde a muralha começa e confirme","place.wall2.mouse":"Agora clique onde a muralha termina","place.wall2.touch":"Agora toque onde ela termina e confirme","snd.label":"Som","snd.music":"Música","snd.sfx":"Efeitos","snd.amb":"Ambiente","snd.l0":"Desligado","snd.l1":"Baixo","snd.l2":"Médio","snd.l3":"Alto","snd.mute":"Silenciar","snd.unmute":"Ligar o som"},Hx={en:Ru,pt:Bx},Pu="origines_lang";let tr="en";try{const n=localStorage.getItem(Pu);(n==="pt"||n==="en")&&(tr=n)}catch{}const Pa=[],ri=()=>tr;function ld(n){tr=n;try{localStorage.setItem(Pu,n)}catch{}document.documentElement.lang=n==="pt"?"pt-BR":"en",Pa.forEach(t=>t())}const Iu=n=>(Pa.push(n),()=>{const t=Pa.indexOf(n);t>=0&&Pa.splice(t,1)});function $(n,t={}){let e=Hx[tr][n]??Ru[n]??n;for(const i in t)e=e.split(`{${i}}`).join(String(t[i]));return e}const Gx=n=>Math.floor(n).toLocaleString(tr==="pt"?"pt-BR":"en-US");typeof document<"u"&&(document.documentElement.lang=tr==="pt"?"pt-BR":"en");const Vx=(n,t="currentColor")=>`<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`,Xl={food:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 18c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 18c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/>',wood:'<ellipse cx="7" cy="12" rx="3" ry="5"/><path d="M7 7h11c1.7 0 3 2.2 3 5s-1.3 5-3 5H7"/><circle cx="7" cy="12" r="1.2"/>',stone:'<path d="M4 17l3-8 5-3 6 2 2 7-4 3H8z"/><path d="M7 9l4 3 7-4M11 12l1 8"/>',metal:'<path d="M3 16l3-7h12l3 7z"/><path d="M6 9l2 7M18 9l-2 7"/>',coins:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',pop:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',villager:'<circle cx="11" cy="5.5" r="2.8"/><path d="M6 21v-6a5 5 0 0 1 10 0v6"/><path d="M15 13h5.5l-1.2 5H16"/>',warrior:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/>',axeman:'<path d="M5 20L16.5 8.5"/><path d="M13.5 5.5c3-1.5 6 .5 6.5 4.5-2.5.5-4-.5-4-.5l-2-2s-1-1-.5-2z"/>',hunter:'<path d="M4 20L17 7"/><path d="M14.5 4.5H20v5.5z"/><path d="M7 14l3 3"/>',archer:'<path d="M6 3c7 2 12 7 14 15"/><path d="M6 3l14 15"/><path d="M12 9.5l5-1-1 5"/>',spearman:'<circle cx="9" cy="14" r="5"/><path d="M13 11L20.5 3.5"/><path d="M18 3.5h2.5V6"/>',dog:'<circle cx="6.5" cy="9.5" r="1.7"/><circle cx="10.5" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="18.5" cy="9.5" r="1.7"/><path d="M8 17c0-3 2-5.5 4.5-5.5S17 14 17 17c0 2.2-2 2.4-4.5 1.4C10 19.4 8 19.2 8 17z"/>',animal:'<path d="M7 4l2 4M17 4l-2 4"/><path d="M6 10c0-2 3-3 6-3s6 1 6 3l-1 6c-.4 2.5-2.5 4-5 4s-4.6-1.5-5-4z"/><circle cx="10" cy="13" r=".6"/><circle cx="14" cy="13" r=".6"/>',barbarian:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/><path d="M4 6l4 1-1 4"/>',carcass:'<path d="M7.5 15C4.5 15 3 13 3 11s3-6 8-6 8 3 8 6-3 5-6 5"/><path d="M13.5 16l4 4"/><circle cx="19" cy="21" r="1"/>',center:'<path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 3 3 3 0-3-1-5 0-7z"/>',house:'<path d="M3 20L12 4l9 16z"/><path d="M10 20v-5h4v5"/>',depot:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13.5h16M9 9V5h6v4"/>',military:'<path d="M5 5l14 14M19 5L5 19"/><path d="M4 8.5V4h4.5M20 8.5V4h-4.5"/>',farm:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/><path d="M3 21h18"/>',pen:'<ellipse cx="11" cy="12" rx="6.5" ry="4.5"/><circle cx="18.5" cy="10" r="2"/><path d="M7.5 16.5v3M14.5 16.5v3"/>',sanctuary:'<path d="M9 21V7l3-4 3 4v14"/><path d="M5 21h14"/>',camp:'<path d="M3 20L10 6l7 14z"/><path d="M14 9l7 11h-4"/>',ageup:'<path d="M12 3l5 7h-3.2v6h-3.6v-6H7z"/><path d="M5 20h14"/>',swordsman:'<path d="M5 19L17 7"/><path d="M17 7l2.5-3.5L16 6"/><path d="M6.5 14.5l3 3"/><path d="M4 20l1.5-1.5"/>',slinger:'<path d="M6 20c0-6 2-10 6-12"/><path d="M12 8c3-1 5-3 6-5"/><circle cx="18.5" cy="3.8" r="1.6"/><circle cx="7" cy="8" r="2.2"/>',horseman:'<path d="M4 20l2-6c1-3 4-4 7-4h3l3-4 1 3-2 3v8"/><path d="M8 14v6M16 14v6"/><circle cx="12" cy="5" r="2"/>',ram:'<path d="M3 13l5-6h8l5 6z"/><path d="M2 11h20"/><circle cx="7" cy="17" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',forge:'<path d="M4 15h11l3-3h2v3l-3 3H7z"/><path d="M8 18v3M14 18v3"/><path d="M10 11V4l3 2"/>',market:'<path d="M3 9l2-5h14l2 5"/><path d="M3 9c0 2 4 2 4 0 0 2 5 2 5 0 0 2 5 2 5 0 0 2 4 2 4 0"/><path d="M5 11v9h14v-9"/>',stable:'<path d="M3 11l9-6 9 6"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6"/>',workshop:'<path d="M4 19l7-7"/><path d="M10 7l3-3 5 5-3 3z"/><circle cx="17" cy="17" r="3"/><path d="M17 14v6M14 17h6"/>',wall:'<path d="M3 9h18v11H3z"/><path d="M3 14.5h18M8 9v5.5M15 9v5.5M11.5 14.5V20M5 9V6h3v3M10.5 9V6h3v3M16 9V6h3v3"/>',tower:'<path d="M7 21V9h10v12"/><path d="M5 9V4h3v2h3V4h2v2h3V4h3v5z"/><path d="M10.5 21v-4h3v4"/>',bronze:'<path d="M6 19L18 7"/><path d="M18 7l2-4-4 2"/><path d="M7.5 13.5l3 3"/><circle cx="6" cy="19" r="1.5"/>',iron:'<path d="M4 18h12l4-4H8z"/><path d="M8 14V9h8v5"/><path d="M12 9V5"/>',wheel:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v6M12 14v6M4 12h6M14 12h6"/>',trade:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',build:'<path d="M13.5 5.5l5 5-2.5 2.5-5-5z"/><path d="M11 8l-7 7 2.5 2.5 7-7"/><path d="M14 4l2-1 5 5-1 2"/>',rally:'<path d="M6 21V4"/><path d="M6 4h11l-2.2 4L17 12H6"/>',back:'<path d="M15 18l-6-6 6-6"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',idle:'<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',army:'<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',cancel:'<path d="M6 6l12 12M18 6L6 18"/>',"season.0":'<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',"season.1":'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',"season.2":'<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',"season.3":'<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'},Wx={food:"#d4a334",wood:"#b07a48",stone:"#a3a9b0",metal:"#5bb39a",coins:"#d6a84a",pop:"#ecf1ec"},qx=["#8fd16a","#f2c14e","#e08a3c","#a9d3f2"];function ze(n,t){const e=Xl[n]??Xl.animal;return!t&&n.startsWith("season.")&&(t=qx[Number(n.slice(7))]),Vx(e,t??Wx[n]??"currentColor")}function ws(n){return n in Xl?ze(n,"currentColor"):ze(["deer","boar","wolf","aurochs"].includes(n)?"animal":"villager","currentColor")}const Gi=[0,.2,.5,.85],cd="origines_som",hd={music:1,sfx:3,amb:2,muted:!1};class Xx{constructor(){R(this,"ctx",null);R(this,"opts",{...hd});R(this,"master");R(this,"duckG");R(this,"buses",{});R(this,"scene","menu");R(this,"paused",!1);R(this,"hidden",!1);R(this,"onReady",[]);R(this,"onChange",[]);R(this,"voices",[]);R(this,"maxVoices",16);R(this,"installed",!1);try{const t=JSON.parse(localStorage.getItem(cd)??"null");t&&typeof t=="object"&&(this.opts={...hd,...t})}catch{}}install(){if(this.installed)return;this.installed=!0;const t=()=>this.unlock();for(const e of["pointerdown","pointerup","touchend","click","keydown"])addEventListener(e,t,{capture:!0,passive:!0});document.addEventListener("visibilitychange",()=>this.setHidden(document.hidden)),addEventListener("pagehide",()=>this.setHidden(!0)),addEventListener("pageshow",()=>this.setHidden(document.hidden))}unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e({latencyHint:"interactive"})}catch{return}const i=this.ctx,s=i.createDynamicsCompressor();s.threshold.value=-12,s.knee.value=8,s.ratio.value=10,s.attack.value=.004,s.release.value=.25,s.connect(i.destination),this.master=i.createGain(),this.master.connect(s),this.duckG=i.createGain(),this.duckG.connect(this.master);for(const r of["music","amb","sfx","ui","alert"]){const a=i.createGain();a.gain.value=0,a.connect(r==="music"?this.duckG:this.master),this.buses[r]=a}this.apply(!0);for(const r of this.onReady.splice(0))r()}const t=this.ctx;if(t.state!=="running"&&t.state!=="closed"&&!this.hidden){t.resume().catch(()=>{});try{const e=t.createBufferSource();e.buffer=t.createBuffer(1,1,t.sampleRate),e.connect(t.destination),e.start(0)}catch{}}}whenRunning(t){const e=this.ctx;if(e){if(this.running){t();return}this.hidden||e.state==="closed"||e.resume().then(()=>{this.running&&t()}).catch(()=>{})}}ready(t){this.ctx?t():this.onReady.push(t)}changed(t){this.onChange.push(t)}out(t){return this.ctx?this.buses[t]:null}get now(){return this.ctx?.currentTime??0}get running(){return!!this.ctx&&this.ctx.state==="running"&&!this.hidden}setScene(t){this.scene=t,this.paused=!1,this.apply()}setPaused(t){this.paused=t,this.apply()}setOpts(t){this.opts={...this.opts,...t};try{localStorage.setItem(cd,JSON.stringify(this.opts))}catch{}this.apply();for(const e of this.onChange)e()}toggleMute(){this.setOpts({muted:!this.opts.muted})}level(t){const e=this.opts;if(e.muted)return 0;switch(t){case"music":return this.scene==="menu"?e.music?Math.max(Gi[2],Gi[e.music]):0:Gi[e.music];case"amb":return this.scene==="game"?Gi[e.amb]*(this.paused?.35:1):0;case"sfx":return Gi[e.sfx];case"ui":return Gi[e.sfx]*.8;case"alert":return e.sfx?Math.max(.5,Gi[e.sfx]):0}}apply(t=!1){if(!this.ctx)return;const e=this.ctx.currentTime;for(const i of Object.keys(this.buses)){const s=this.buses[i].gain;s.cancelScheduledValues(e),t?s.setValueAtTime(this.level(i),e):s.setTargetAtTime(this.level(i),e,i==="music"?.8:.15)}}duck(t=.55,e=2.2){if(!this.ctx)return;const i=this.duckG.gain,s=this.ctx.currentTime;i.cancelScheduledValues(s),i.setTargetAtTime(1-t,s,.05),i.setTargetAtTime(1,s+e,.6)}setHidden(t){this.hidden=t,this.ctx&&(t?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}voice(t){const e=this.now;return this.voices=this.voices.filter(i=>i>e),this.voices.length>=this.maxVoices?!1:(this.voices.push(e+t),!0)}}const Mt=new Xx,$x=["food","wood","stone","metal"],Yx=["I","II","III","IV","V","VI"],Mn=n=>n.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),qa=class qa{constructor(t,e,i,s,r){R(this,"root");R(this,"box");R(this,"minimap");R(this,"$",{});R(this,"cardMode","main");R(this,"cardFor","");R(this,"sigTop","");R(this,"sigSel","");R(this,"sigCard","");R(this,"sigMode","");R(this,"idleN",-1);R(this,"toasts",[]);R(this,"btns",[]);R(this,"progs",[]);R(this,"mode","normal");R(this,"placeOk",!0);R(this,"slow",0);R(this,"hintHidden",!1);R(this,"wallStep",0);R(this,"give","food");R(this,"tipEl");R(this,"tipTimer",0);R(this,"holdTimer",0);R(this,"hoverTimer",0);R(this,"tipHeld",!1);R(this,"placeKey","");R(this,"tipUp",t=>{clearTimeout(this.holdTimer),!(t.pointerType==="mouse"||this.tipEl.hidden)&&(clearTimeout(this.tipTimer),this.tipTimer=window.setTimeout(()=>this.hideTip(),this.tipHeld?4e3:2500))});R(this,"offLang");this.world=t,this.me=e,this.act=i,this.touch=s,this.selected=r,this.root=document.getElementById("hud"),this.box=document.createElement("div"),this.box.className="box",document.body.appendChild(this.box),this.minimap=document.createElement("canvas"),this.minimap.id="minimapa",this.tipEl=document.createElement("div"),this.tipEl.className="tip panel",this.tipEl.id="dica",this.tipEl.setAttribute("role","tooltip"),this.tipEl.hidden=!0,document.body.appendChild(this.tipEl),this.bindTips(),this.build(),this.offLang=Iu(()=>this.build()),Mt.changed(()=>{const a=document.getElementById("btn-som");if(!a)return;const o=Mt.opts.muted;a.innerHTML=ze(o?"mute":"sound"),a.title=$(o?"snd.unmute":"snd.mute"),a.setAttribute("aria-label",a.title),a.setAttribute("aria-pressed",String(o))})}dispose(){this.offLang(),this.root.innerHTML="",this.box.remove(),this.hideTip(),this.tipEl.remove(),removeEventListener("pointerup",this.tipUp),removeEventListener("pointercancel",this.tipUp)}bindTips(){const t=e=>e.target?.closest?.(qa.TIP_SEL)??null;this.root.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse")return;clearTimeout(this.holdTimer),this.tipHeld=!1;const i=t(e);i&&(i.classList.contains("cb")&&this.showTip(i),this.holdTimer=window.setTimeout(()=>{this.tipHeld=!0,this.showTip(i)},550))}),this.root.addEventListener("pointerover",e=>{if(e.pointerType!=="mouse")return;const i=t(e);i?.classList.contains("cb")&&(clearTimeout(this.hoverTimer),this.hoverTimer=window.setTimeout(()=>this.showTip(i),250))}),this.root.addEventListener("pointerout",e=>{if(e.pointerType!=="mouse")return;const i=t(e);i&&i.contains(e.relatedTarget)||(clearTimeout(this.hoverTimer),this.hideTip())}),this.root.addEventListener("click",e=>{this.tipHeld&&(this.tipHeld=!1,e.stopPropagation(),e.preventDefault())},!0),this.root.addEventListener("contextmenu",e=>{t(e)&&e.preventDefault()}),addEventListener("pointerup",this.tipUp),addEventListener("pointercancel",this.tipUp)}showTip(t){let e="";if(t.classList.contains("cb")){const l=this.btns[Number(t.dataset.i)];if(!l)return;e=this.tipHtml(l)}else{const l=t.getAttribute("title")??t.getAttribute("aria-label");if(!l)return;e=`<div class="tip-h"><b>${Mn(l)}</b></div>`}const i=this.tipEl;clearTimeout(this.tipTimer),i.innerHTML=e,i.hidden=!1;const s=t.getBoundingClientRect(),r=i.offsetWidth,a=i.offsetHeight;let o=s.top-a-8;o<8&&(o=s.bottom+8),i.style.left=`${Math.round(Math.max(8,Math.min(innerWidth-r-8,s.left+s.width/2-r/2)))}px`,i.style.top=`${Math.round(o)}px`}hideTip(){clearTimeout(this.tipTimer),clearTimeout(this.hoverTimer),this.tipEl.hidden=!0}tipHtml(t){return`<div class="tip-h"><span class="tip-ic">${ws(t.ic)}</span><b>${Mn(t.tip?.name??t.label)}</b>${t.cost?this.costHtml(t.cost):""}</div>`+(t.tip?.desc?`<p>${Mn(t.tip.desc)}</p>`:"")+(t.why?`<p class="tip-why">${Mn(t.why)}</p>`:"")}costHtml(t){const e=this.world.players[this.me].res;return`<span class="cost">${Ki.filter(i=>t[i]).map(i=>`<span class="c${e[i]<t[i]*100?" no":""}">${ze(i)}${t[i]}</span>`).join("")}</span>`}bldDesc(t,e){const i=be[Ze[t]];return $(`bld.${t}.d`,{n:i.pop?i.pop[Math.min(e,i.pop.length-1)]:0,get:Hn.get,fair:Hn.fair})}build(){const t=this.touch;this.root.innerHTML=`
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-som" title="${$(Mt.opts.muted?"snd.unmute":"snd.mute")}" aria-label="${$(Mt.opts.muted?"snd.unmute":"snd.mute")}" aria-pressed="${Mt.opts.muted}">${ze(Mt.opts.muted?"mute":"sound")}</button>
          <button id="btn-ajuda" title="${$("btn.help")}" aria-label="${$("btn.help")}">${ze("help")}</button>
          <button id="btn-menu" title="${$("btn.menu")}" aria-label="${$("btn.menu")}">${ze("menu")}<span class="btn-label">${$("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${ze("check")}<span>${$("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${ze("cancel")}<span>${$("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden?' style="opacity:0"':""}>${$(t?"hint.touch":"hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${$("btn.idle")}">${ze("idle")}<span class="btn-label">${$("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${$("btn.army")}">${ze("army")}<span class="btn-label">${$("btn.army")}</span></button>
            <button id="btn-aldeia" title="${$("btn.home")}">${ze("home")}<span class="btn-label">${$("btn.home")}</span></button>
          </div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${$("help.title")}</h2><p class="goal">${$("help.goal")}</p>
        <ul>${["help.l1","help.l6","help.l7","help.l2","help.l3","help.l4",t?"help.l5.touch":"help.l5.mouse"].map(i=>`<li>${$(i)}</li>`).join("")}</ul>
        <p class="hint-copy">${$(t?"hint.touch":"hint.mouse")}</p>
        <button id="btn-fechar-ajuda" class="primary">${$("help.close")}</button></div></div>`;for(const i of["era","res","cal","toasts","modebar","modebar-text","btn-confirmar-obra","hint","sel","cmd","mini","ajuda","idle-n"])this.$[i]=document.getElementById(i);this.$.mini.appendChild(this.minimap);const e=(i,s)=>{document.getElementById(i).onclick=s};e("btn-ajuda",()=>this.$.ajuda.dataset.open="true"),e("btn-fechar-ajuda",()=>this.$.ajuda.dataset.open="false"),e("btn-menu",()=>this.act.menu()),e("btn-som",()=>Mt.toggleMute()),e("btn-ocioso",()=>this.act.idle()),e("btn-exercito",()=>this.act.army()),e("btn-aldeia",()=>this.act.home()),e("btn-confirmar-obra",()=>this.act.placeConfirm()),e("btn-cancelar-modo",()=>this.act.cancelMode()),this.$.ajuda.onclick=i=>{i.target===this.$.ajuda&&(this.$.ajuda.dataset.open="false")},this.sigTop=this.sigSel=this.sigCard=this.sigMode="",this.idleN=-1,this.toasts=[],this.update(0,!0)}openHelp(){this.$.ajuda.dataset.open="true"}hideHint(){this.hintHidden||(this.hintHidden=!0,this.$.hint.style.opacity="0")}setMode(t,e=!0,i=0,s=""){this.mode=t,this.placeOk=e,this.wallStep=i,this.placeKey=s,t!=="normal"&&this.hideTip()}bldName(t,e){for(let i=e;i>=0;i--){const s=`bld.${t}.e${i}`,r=$(s);if(r!==s)return r}return $(`bld.${t}`)}resetCard(){this.cardMode="main"}toast(t,e,i,s=""){if(this.toasts.some(a=>a.text===t&&a.t>2.5))return;const r=document.createElement("button");for(r.className="toast panel",r.dataset.aviso=s||"info",r.innerHTML=`<span>${Mn(t)}</span>${e!==void 0?`<span class="go">${$("msg.go")}</span>`:""}`,r.onclick=()=>{e!==void 0&&i!==void 0&&this.act.jump(e,i),r.remove(),this.toasts=this.toasts.filter(a=>a.el!==r)},this.$.toasts.prepend(r),this.toasts.unshift({el:r,t:5,text:t});this.toasts.length>3;)this.toasts.pop().el.remove()}tribe(t){return t===this.me?$("tribe.you"):$(t===le?"tribe.wild":`tribe.${t===hi?6:t}`)}onEvents(t){for(const e of t){if(e.t==="age"){this.toast(e.player===this.me?$("msg.ageMe",{era:$(`era.${e.era}.in`)}):$("msg.ageOther",{p:this.tribe(e.player),era:$(`era.${e.era}.in`)}),void 0,void 0,"era");continue}if(e.t!=="msg"||e.player!==this.me)continue;const[i,s]=e.key.split("."),r=e.x!==void 0?e.x/256:void 0,a=e.z!==void 0?e.z/256:void 0;i==="built"?this.toast($("msg.built",{b:$(`bld.${s}`)}),r,a,"built"):i==="defeated"?this.toast(Number(s)===this.me?$("msg.youDefeated"):$("msg.defeated",{p:this.tribe(Number(s))}),void 0,void 0,"defeated"):i==="tech"?this.toast($("msg.tech",{tech:$(`tech.${s}`)}),r,a,"tech"):this.toast($(`msg.${i}`,{n:this.world.players[this.me].era<=1?1:2}),i==="underAttack"||i==="raidSoon"||i==="centerLost"||i==="centerDanger"||i==="campLoot"?r:void 0,a,i)}}update(t,e=!1){for(const i of this.toasts)(i.t-=t)<=0&&i.el.remove();this.toasts=this.toasts.filter(i=>i.t>0);for(const i of this.progs)i.el.style.width=`${Math.round(Math.max(0,Math.min(1,i.f()))*100)}%`;this.slow-=t,!(!e&&this.slow>0)&&(this.slow=.15,this.renderTop(),this.renderMode(),this.renderSel(),this.renderCard(),this.renderIdle())}renderTop(){const t=this.world,e=t.players[this.me],i=e.era,s=i>=2?["food","wood","stone","metal"]:["food","wood","stone"],r=t.pop(this.me),a=t.popCap(this.me),o=s.map(l=>Math.floor(e.res[l]/100)).join(",")+`|${r}|${a}|${i}|${e.aging>0}|${t.season}|${t.year}|${ri()}`;o!==this.sigTop&&(this.sigTop=o,this.$.res.innerHTML=s.map(l=>`<div class="r" title="${$(`res.${l}`)}">${ze(l)}<span>${Gx(e.res[l]/100)}</span></div>`).join("")+`<div class="r${r>=a?" full":""}" title="${$("pop.tip",{n:r,cap:a,max:Mr[i]})}">${ze("pop")}<span>${r}/${a}</span></div>`,this.$.era.innerHTML=`<span class="num">${Yx[i]}</span><span class="name">${$(`era.${i}`)}</span>${e.aging>0?'<span class="era-prog"><i data-p="aging"></i></span>':""}`,this.$.era.title=$(`era.${i}`),this.$.cal.innerHTML=`${ze(`season.${t.season}`)}<span class="name">${$(`season.${t.season}`)}</span><span class="yr">${$("cal.year",{y:t.year})}</span><span class="cal-prog"><i data-p="season"></i></span>`,this.$.cal.title=`${$(`season.${t.season}`)} · ${$("cal.year",{y:t.year})}`,this.$.cal.dataset.season=String(t.season),this.bindProgs())}renderMode(){const t=this.world.players[this.me].era,e=`${this.mode}|${this.placeOk}|${this.wallStep}|${this.placeKey}|${t}|${ri()}`;if(e===this.sigMode)return;this.sigMode=e;const i=this.$.modebar;i.hidden=this.mode==="normal",this.root.dataset.mode=this.mode,this.$["btn-confirmar-obra"].hidden=!(this.mode==="place"&&this.touch),this.$["btn-confirmar-obra"].setAttribute("aria-disabled",String(!this.placeOk));const s=this.touch?"touch":"mouse",r=this.mode==="place"?this.wallStep&&(this.placeOk||this.wallStep===2)?$(`place.wall${this.wallStep}.${s}`):this.placeOk?$(`place.${s}`):$("place.bad"):this.mode==="rally"?$("rally.hint"):"";this.$["modebar-text"].innerHTML=(this.mode==="place"&&this.placeKey?`<b class="mb-name">${Mn(this.bldName(this.placeKey,t))}</b> · `:"")+Mn(r)}renderIdle(){const t=this.world;let e=0;for(let i=0;i<t.top;i++)t.isUnit(i)&&t.owner[i]===this.me&&t.kind[i]===Xt.villager&&t.task[i]===0&&t.state[i]!==qe&&e++;e!==this.idleN&&(this.idleN=e,this.$["idle-n"].hidden=e===0,this.$["idle-n"].textContent=String(e))}doing(t){const e=this.world,i=e.task[t],s=e.tgt[t];return i===we?e.phase[t]===Pr?$("do.return",{n:Math.floor(e.carry[t]/100),res:$(`res.${$x[e.carryRes[t]]}`).toLowerCase()}):s<0?$("do.move"):e.tgtTile[t]?$(e.map.tree[s]?"do.wood":e.resKind[s]===Je?"do.berry":e.resKind[s]===Yn?"do.stone":"do.metal"):$(e.kind[s]===jt?"do.meat":"do.farm"):$(i===Xn?"do.build":i===Te?s>=0&&e.owner[s]===le?"do.hunt":"do.fight":i===rs?"do.amove":e.state[t]===qe?"do.move":e.foodMode[t]?"do.forage":"do.idle")}renderSel(){const t=this.world,e=[...this.selected].filter(a=>t.alive[a]);if(!e.length){this.sigSel!=="none"&&(this.sigSel="none",this.$.sel.hidden=!0);return}let i,s;if(e.length===1){const a=e[0],o=t.kind[a],l=t.owner[a],c=l===this.me;if(o>=Zt){const h=be[o-Zt],u=t.players[l]?.era??0,d=t.done[a]===1,f=t.queue[a],g=h.key==="farm"&&d?this.farmer(a):null;if(i=`b${a}|${t.hp[a]}|${d}|${f.join(",")}|${g}|${ri()}`,i===this.sigSel)return;const v=c?d?"":$("info.building"):this.tribe(l),m=this.bldDesc(h.key,u);s=this.head(ws(h.key),this.bldName(h.key,u),v,c)+this.hp(t.hp[a],h.hp)+(!d&&c?`<div class="prog"><i data-p="build:${a}"></i></div>`:"")+`<div class="sel-desc">${m}</div>`+(g!==null?`<div class="sel-line">${$("info.farmer",{who:$(g?"info.yes":"info.no")})}</div>`:"")+(f.length?`<div class="queue" aria-label="${$("info.queue")}">${f.map((p,M)=>{const x=p>=ln?ts[p-ln].key:_t[p].key;return`<span class="qi" title="${$(p>=ln?`tech.${x}`:`unit.${x}`)}">${ws(x)}${M===0?`<i class="qp" data-p="queue:${a}"></i>`:""}</span>`}).join("")}</div>`:"")}else if(o===jt){const h=Math.floor(t.work[a]/100);if(i=`c${a}|${h}|${ri()}`,i===this.sigSel)return;s=this.head(ze("carcass","currentColor"),$("unit.carcass"),$(`unit.${_t[t.sub[a]]?.key??"deer"}`),!1)+`<div class="sel-desc">${$("unit.carcass.d",{food:h})}</div>`}else{const h=_t[o],u=c?this.doing(a):this.tribe(l);if(i=`u${a}|${t.hp[a]}|${u}|${ri()}`,i===this.sigSel)return;s=this.head(ws(h.key),$(`unit.${h.key}`),u,c)+this.hp(t.hp[a],h.hp)+`<div class="sel-desc">${$(`unit.${h.key}.d`,{food:h.animal?.food??0})}</div>`}}else{const a=new Map;for(const l of e)a.set(t.kind[l],(a.get(t.kind[l])||0)+1);const o=[...a.entries()].sort((l,c)=>l[0]-c[0]);if(i="m"+o.map(([l,c])=>`${l}:${c}`).join(",")+ri(),i===this.sigSel)return;s=this.head(ze("pop","currentColor"),$("sel.many",{n:e.length}),"",!0)+`<div class="sel-icons">${o.map(([l,c])=>`<button data-selecionar="${_t[l]?.key??l}" title="${$(`unit.${_t[l]?.key}`)}">${ws(_t[l]?.key??"")}<span>${c}</span></button>`).join("")}</div>`}this.sigSel=i,this.$.sel.hidden=!1,this.$.sel.innerHTML=s,this.$.sel.querySelectorAll("[data-selecionar]").forEach(a=>a.onclick=()=>this.act.keepKind(Xt[a.dataset.selecionar]));const r=this.$.sel.querySelector("#btn-limpar-selecao");r&&(r.onclick=()=>this.act.clear()),this.bindProgs()}head(t,e,i,s){return`<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Mn(e)}</div>${i?`<div class="sel-sub">${Mn(i)}</div>`:""}</div><button id="btn-limpar-selecao" class="x" title="${$("sel.clear")}" aria-label="${$("sel.clear")}">${ze("close")}</button></div>`}hp(t,e){const i=Math.max(0,Math.min(1,t/e));return`<div class="hp" title="${$("info.hp")} ${Math.max(0,t)}/${e}"><i style="width:${Math.round(i*100)}%" class="${i>.6?"ok":i>.3?"mid":"low"}"></i></div>`}farmer(t){const e=this.world;for(let i=0;i<e.top;i++)if(e.isUnit(i)&&e.task[i]===we&&e.tgt[i]===t&&!e.tgtTile[i])return!0;return!1}missing(t){const e=this.world.players[this.me].res;return Ki.find(i=>e[i]<(t[i]??0)*100)}whyCost(t){const e=this.missing(t);return e?$("why.cost",{res:$(`res.${e}`).toLowerCase()}):void 0}buttons(){const t=this.world,e=this.me,i=t.players[e],s=[...this.selected].filter(m=>t.alive[m]),r=s.filter(m=>t.isUnit(m)&&t.owner[m]===e),a=r.filter(m=>t.kind[m]===Xt.villager),o=[];if(r.length){if(this.cardMode==="build"&&a.length){o.push({id:"btn-voltar-comandos",ic:"back",label:$("cmd.back"),act:()=>{this.cardMode="main",this.refresh()}});for(const m of be)if(m.buildable&&m.era<=i.era+1){const p=m.era>i.era?$("why.era",{era:$(`era.${m.era}.in`)}):this.whyCost(m.cost),M=this.bldName(m.key,i.era);o.push({data:["construir",m.key],ic:m.key,label:M,tip:{name:M,desc:this.bldDesc(m.key,i.era)},cost:m.cost,why:p,act:()=>this.act.startPlace(m.key)})}return o}if(a.length&&o.push({id:"btn-construir",ic:"build",label:$("cmd.build"),act:()=>{this.cardMode="build",this.refresh()}}),a.length){const m=a.every(p=>t.foodMode[p]>0);o.push({id:"btn-buscar-comida",ic:"food",label:$("cmd.food"),tip:{name:$("cmd.food"),desc:$(m?"cmd.food.off":"cmd.food.d")},pressed:m,act:()=>this.act.food(!m)})}return o.push({id:"btn-parar",ic:"stop",label:$("cmd.stop"),act:()=>this.act.stop()}),o}if(s.length!==1||!t.isBuilding(s[0])||t.owner[s[0]]!==e)return o;const l=s[0],c=t.bdef(l),h=t.done[l]===1,u=i.era;if(!h)return o;const d=ec(c,u),f=t.pop(e),g=t.popCap(e);let v=0;for(let m=0;m<t.top;m++)if(t.isBuilding(m)&&t.owner[m]===e)for(const p of t.queue[m])p<ln&&(v+=_t[p].pop);for(const m of d){const p=_t[Xt[m]],M=t.queue[l],x=M.length>=5?$("why.queue"):this.whyCost(p.cost)??(f+v+p.pop>g?$(g>=Mr[u]?"why.popEra":"why.pop"):void 0);o.push({data:["treinar",m],ic:m,label:$(`unit.${m}`),tip:{name:$(`unit.${m}`),desc:$(`unit.${m}.d`)},cost:p.cost,why:x,badge:M.filter(_=>_===Xt[m]).length,act:()=>this.act.train(l,m)})}for(const m of c.research??[]){const p=$o[m],M=ts[p],x=t.queue[l];if(t.hasTech(e,m))continue;const _=t.techQueued(e,p)?$("why.techQueued"):M.needs&&!t.hasTech(e,M.needs)?$("why.needs",{tech:$(`tech.${M.needs}`)}):x.length>=5?$("why.queue"):this.whyCost(M.cost);o.push({data:["pesquisar",m],ic:m,label:`${$(`tech.${m}`)}: ${$(`tech.${m}.d`)}`,tip:{name:$(`tech.${m}`),desc:$(`tech.${m}.d`)},cost:M.cost,why:_,act:()=>this.act.research(l,m)})}if(c.market){const m=t.fair?Hn.fair:Hn.get;for(const p of Ia)o.push({data:["dar",p],ic:p,label:$("trade.give",{res:$(`res.${p}`).toLowerCase()}),short:$("trade.giveShort"),pressed:this.give===p,act:()=>{this.give=p}});for(const p of Ia)if(p!==this.give){const M=i.res[this.give]<Hn.give*100?$("why.trade",{res:$(`res.${this.give}`).toLowerCase()}):void 0;o.push({data:["receber",p],ic:p,label:(t.fair?$("trade.fair")+" ":"")+$("trade.get",{n:m,res:$(`res.${p}`).toLowerCase()}),short:`+${m}`,cost:{[this.give]:Hn.give},why:M,act:()=>this.act.trade(l,this.give,p)})}}if(t.queue[l].length&&o.push({id:"btn-cancelar-fila",ic:"cancel",label:$("cmd.cancelQueue"),act:()=>this.act.cancelQueue(l)}),c.key==="center")if(i.aging>0)o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.aging",{era:$(`era.${u+1}.to`)}),why:$("why.ageBusy"),prog:()=>1-i.aging/(ji[u].time*10),act:()=>{}});else if(u<_d){const m=t.eraBuildingTypes(e),p=ji[u];o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.ageup",{era:$(`era.${u+1}.to`)}),tip:{name:$("cmd.ageup",{era:$(`era.${u+1}.to`)}),desc:$("help.l4")},cost:p.cost,why:m<2?$("why.age",{n:m}):this.whyCost(p.cost),act:()=>this.act.ageUp(l)})}else o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.ageup",{era:$(`era.${u+1}.to`)}),why:$("why.maxEra"),act:()=>{}});return d.length&&o.push({id:"btn-ponto-reuniao",ic:"rally",label:$("cmd.rally"),tip:{name:$("cmd.rally"),desc:$("rally.hint")},pressed:this.mode==="rally",act:()=>this.act.rally(l)}),o}refresh(){this.sigCard="",this.slow=0}renderCard(){const t=[...this.selected].filter(a=>this.world.alive[a]),e=t.slice(0,4).join(",");e!==this.cardFor&&(this.cardFor=e,this.cardMode="main");const i=this.buttons(),s=i.map(a=>`${a.id??a.data?.join("=")}|${a.label}|${a.why??""}|${a.badge??""}|${a.pressed??""}`).join(";")+ri();if(s===this.sigCard){this.btns=i;return}this.sigCard=s,this.btns=i;const r=this.$.cmd;r.hidden=i.length===0,r.innerHTML=i.map((a,o)=>{const l=a.id?`id="${a.id}"`:`data-${a.data[0]}="${a.data[1]}"`,c=a.cost?this.costHtml(a.cost):"";return`<button ${l} data-i="${o}" class="cb${a.why?" off":""}" aria-disabled="${!!a.why}" aria-pressed="${!!a.pressed}" aria-label="${Mn(a.label+(a.why?" — "+a.why:""))}"><span class="cb-ic">${ws(a.ic)}${a.badge?`<span class="badge">${a.badge}</span>`:""}</span><span class="cb-l">${Mn(a.label)}</span>${a.short?`<span class="cb-s">${Mn(a.short)}</span>`:""}${c}${a.prog?'<span class="cb-p"><i data-p="btn"></i></span>':""}</button>`}).join(""),r.querySelectorAll("button[data-i]").forEach(a=>a.onclick=()=>{const o=this.btns[Number(a.dataset.i)];if(o){if(o.why){this.tipEl.hidden&&this.toast(o.why,void 0,void 0,"why");return}o.act(),this.refresh()}}),this.bindProgs()}bindProgs(){const t=this.world,e=t.players[this.me];this.progs=[],this.root.querySelectorAll("[data-p]").forEach(i=>{const[s,r]=(i.dataset.p??"").split(":"),a=Number(r);let o=null;s==="aging"||s==="btn"?o=()=>e.aging>0?1-e.aging/(ji[Math.min(e.era,ji.length-1)].time*10):0:s==="season"?o=()=>t.tick%1800/1800:s==="build"?o=()=>t.alive[a]?t.work[a]/(t.bdef(a).time*100):0:s==="queue"&&(o=()=>{if(!t.alive[a]||!t.queue[a].length)return 0;const l=t.queue[a][0];return t.work[a]/((l>=ln?ts[l-ln].time:_t[l].time)*10)}),o&&this.progs.push({el:i,f:o})})}};R(qa,"TIP_SEL",".cb, .qi, .sel-icons button, .r, .era-chip, .cal, .tools button, .quick button");let $l=qa;class Kx{constructor(t,e,i,s){R(this,"ctx");R(this,"base");R(this,"img");R(this,"t",1);R(this,"metalOn",!1);this.world=e,this.me=i,this.cam=s;const r=e.size;t.width=t.height=r,this.ctx=t.getContext("2d"),this.base=this.ctx.createImageData(r,r),this.img=this.ctx.createImageData(r,r);const a=e.map,o=this.base.data;for(let h=0;h<r;h++)for(let u=0;u<r;u++){const d=h*r+u,f=a.terrain[d],g=a.heights[Math.round(h/a.hstep)*a.hn+Math.round(u/a.hstep)];let v=[104,150,72];if(f===Ri)v=[46,104,128];else if(f===Bs)v=[86,150,160];else if(f===La)v=[205,186,140];else if(f===es)v=[140,135,125];else{const m=Math.max(0,Math.min(1,(g-1)/12));v=[104+m*30,150-m*10,72+m*20]}a.tree[d]&&(v=[52,92,50]),o.set([v[0],v[1],v[2],255],d*4)}for(const h of a.res){const u=h.kind===Je?[200,60,70]:h.kind===Yn?[215,210,200]:h.kind===Tn?[90,190,160]:[255,255,255];h.kind===Tn||!e.resKind[h.z*r+h.x]||this.base.data.set([u[0],u[1],u[2],255],(h.z*r+h.x)*4)}let l=!1;const c=h=>{const u=t.getBoundingClientRect();this.cam.tx=(h.clientX-u.left)/u.width*r,this.cam.tz=(h.clientY-u.top)/u.height*r};t.addEventListener("pointerdown",h=>{l=!0,t.setPointerCapture(h.pointerId),c(h),h.stopPropagation()}),t.addEventListener("pointermove",h=>{l&&c(h)}),t.addEventListener("pointerup",()=>{l=!1}),t.addEventListener("pointercancel",()=>{l=!1})}clearTile(t){this.base.data.set([112,148,76,255],t*4),this.t=1}update(t,e,i,s){if((this.t+=t)<.25)return;if(this.t=0,!this.metalOn&&this.world.players[this.me].era>=2){this.metalOn=!0;const d=this.world.size;for(const f of this.world.map.res)f.kind===Tn&&this.world.resKind[f.z*d+f.x]===Tn&&this.base.data.set([90,190,160,255],(f.z*d+f.x)*4)}const r=this.world.size,a=this.base.data,o=this.img.data,l=this.world.vis[this.me],c=this.world.explored[this.me];for(let d=0;d<r*r;d++){const f=!e||l[d]?1:c[d]?.5:.08,g=d*4;o[g]=a[g]*f,o[g+1]=a[g+1]*f,o[g+2]=a[g+2]*f,o[g+3]=255}this.ctx.putImageData(this.img,0,0);const h=this.world;for(let d=0;d<h.top;d++){if(!h.alive[d])continue;const f=h.x[d]/256,g=h.z[d]/256,v=h.owner[d]===this.me;if(e&&!v&&!l[Math.floor(g)*r+Math.floor(f)]||h.kind[d]===jt)continue;const m=h.kind[d]>=Zt,p=h.owner[d],M=m?h.bdef(d).size===1?2:7:p===le?2:3;this.ctx.fillStyle=p===le?"#e8d9b0":p===hi?"#2f3b27":h.players[p]?.color??"#fff",this.ctx.fillRect(f-M/2,g-M/2,M,M),m&&M>2&&(this.ctx.strokeStyle="#fff",this.ctx.lineWidth=1,this.ctx.strokeRect(f-M/2,g-M/2,M,M))}const u=[[0,0],[i,0],[i,s],[0,s]].map(([d,f])=>this.cam.ground(d,f,i,s));u.every(d=>d)&&(this.ctx.strokeStyle="rgba(255,255,255,0.9)",this.ctx.lineWidth=1.5,this.ctx.beginPath(),u.forEach((d,f)=>f?this.ctx.lineTo(d.x,d.z):this.ctx.moveTo(d.x,d.z)),this.ctx.closePath(),this.ctx.stroke())}}class jx{constructor(t,e,i,s,r,a){R(this,"selected",new Set);R(this,"pointers",new Map);R(this,"gesture","none");R(this,"longTimer",0);R(this,"lastTap",{t:0,x:0,y:0});R(this,"keys",new Set);R(this,"v",new O);R(this,"v2",new O);R(this,"right",new O);R(this,"ac",new AbortController);this.canvas=t,this.world=e,this.me=i,this.cam=s,this.box=r,this.hooks=a;const o={signal:this.ac.signal};t.addEventListener("pointerdown",l=>this.down(l),o),t.addEventListener("pointermove",l=>this.move(l),o),t.addEventListener("pointerup",l=>this.up(l),o),t.addEventListener("pointercancel",l=>this.cancel(l),o),t.addEventListener("contextmenu",l=>l.preventDefault(),o),t.addEventListener("wheel",l=>{l.preventDefault(),this.cam.tdist*=Math.exp(l.deltaY*.0012),this.hooks.onInteract()},{passive:!1,signal:this.ac.signal}),addEventListener("keydown",l=>this.key(l),o),addEventListener("keyup",l=>this.keys.delete(l.key.toLowerCase()),o),addEventListener("blur",()=>this.keys.clear(),o)}dispose(){this.ac.abort(),clearTimeout(this.longTimer),this.hideBox()}get W(){return this.canvas.clientWidth}get H(){return this.canvas.clientHeight}key(t){if(!(t.target?.tagName==="BUTTON"&&(t.key===" "||t.key==="Enter"))){if(t.key==="Escape"){this.hooks.mode()!=="normal"?this.hooks.onCancel():this.selected.size&&(this.selected.clear(),this.hooks.onSelect());return}this.keys.add(t.key.toLowerCase())}}down(t){if(this.canvas.setPointerCapture(t.pointerId),this.hooks.onInteract(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,sx:t.clientX,sy:t.clientY,t:performance.now(),button:t.button,type:t.pointerType}),clearTimeout(this.longTimer),this.pointers.size===2){this.gesture="pinch",this.hideBox();return}t.pointerType==="mouse"?t.button===1||t.button===0&&t.altKey?this.gesture="rotate":this.gesture="none":(this.gesture="none",this.hooks.mode()==="normal"&&(this.longTimer=window.setTimeout(()=>{this.gesture==="none"&&this.pointers.size===1&&(this.gesture="box",this.drawBox())},380)))}move(t){const e=this.pointers.get(t.pointerId);if(!e){if(t.pointerType==="mouse"&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}return}const i=t.clientX-e.x,s=t.clientY-e.y,r=Math.hypot(t.clientX-e.sx,t.clientY-e.sy);if(this.gesture==="pinch"&&this.pointers.size===2){const a=[...this.pointers.entries()].find(([u])=>u!==t.pointerId)[1],o=Math.hypot(e.x-a.x,e.y-a.y),l=Math.hypot(t.clientX-a.x,t.clientY-a.y);l>10&&o>10&&(this.cam.tdist*=o/l);const c=Math.atan2(e.y-a.y,e.x-a.x),h=Math.atan2(t.clientY-a.y,t.clientX-a.x);this.cam.tyaw+=Math.atan2(Math.sin(h-c),Math.cos(h-c)),this.cam.pan(i*.5,s*.5,this.H)}else if(this.gesture==="rotate")this.cam.tyaw-=i*.006;else if(e.type==="mouse")if(e.button===0&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}else e.button===0&&(this.gesture==="box"||r>6)&&(this.gesture="box",this.drawBox(e,t));else this.gesture==="none"&&this.hooks.mode()==="normal"&&r>10&&performance.now()-e.t>=380&&Math.hypot(e.x-e.sx,e.y-e.sy)<10&&(this.gesture="box"),this.gesture==="box"?this.drawBox(e,t):(this.gesture==="pan"||r>10)&&(this.gesture="pan",clearTimeout(this.longTimer),this.cam.pan(i,s,this.H));e.x=t.clientX,e.y=t.clientY}up(t){const e=this.pointers.get(t.pointerId);if(this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),!e)return;if(this.gesture==="pinch"){this.pointers.size===0&&(this.gesture="none");return}if(this.gesture==="box"){this.selectBox(e.sx,e.sy,t.clientX,t.clientY,t.shiftKey),this.hideBox(),this.gesture="none";return}if(this.gesture==="pan"||this.gesture==="rotate"){this.gesture="none";return}this.gesture="none";const i=t.clientX,s=t.clientY,r=this.hooks.mode(),a=performance.now(),o=a-this.lastTap.t<320&&Math.hypot(i-this.lastTap.x,s-this.lastTap.y)<30;if(this.lastTap={t:a,x:i,y:s},e.type==="mouse"){if(e.button===2){if(r==="place"){this.hooks.onCancel();return}const d=this.cam.ground(i,s,this.W,this.H);if(!d)return;if(r==="rally"||this.singleOwnBuilding()>=0){this.hooks.onRally(d.x,d.z);return}this.ownUnitsSelected()&&this.hooks.onCommand(this.target(i,s,d))}else if(e.button===0){if(r==="place"){const d=this.cam.ground(i,s,this.W,this.H);d&&this.hooks.onPlaceAt(d.x,d.z),this.hooks.onPlaceConfirm(t.shiftKey);return}if(r==="rally"){const d=this.cam.ground(i,s,this.W,this.H);d&&this.hooks.onRally(d.x,d.z);return}this.clickSelect(i,s,t.shiftKey,o)}return}const l=this.cam.ground(i,s,this.W,this.H);if(r==="place"){l&&this.hooks.onPlaceAt(l.x,l.z);return}if(r==="rally"){l&&this.hooks.onRally(l.x,l.z);return}const c=this.target(i,s,l),h=this.world,u=this.ownUnitsSelected();if(c.kind==="unit"&&h.owner[c.e]===this.me&&h.kind[c.e]!==jt){this.clickSelect(i,s,!1,o);return}if(c.kind==="building"&&h.owner[c.e]===this.me){const d=!h.done[c.e]||be[h.kind[c.e]-Zt].walk;u&&d?this.hooks.onCommand(c):this.only(c.e);return}if(u&&l){this.hooks.onCommand(c);return}if(c.kind==="unit"||c.kind==="building"){this.only(c.e);return}this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}cancel(t){this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),this.hideBox(),this.gesture="none"}only(t){this.selected.clear(),this.selected.add(t),this.hooks.onSelect()}ownUnitsSelected(){for(const t of this.selected)if(this.world.isUnit(t)&&this.world.owner[t]===this.me)return!0;return!1}singleOwnBuilding(){if(this.selected.size!==1)return-1;const t=this.selected.values().next().value;return this.world.isBuilding(t)&&this.world.owner[t]===this.me?t:-1}seen(t,e,i=!1){if(!this.hooks.fogOn())return!0;const s=this.world.size,r=Math.floor(t),a=Math.floor(e);return r<0||a<0||r>=s||a>=s?!1:(i?this.world.explored:this.world.vis)[this.me][a*s+r]===1}pickUnit(t,e,i){const s=this.world,r=this.lastTouch?34:24;let a=-1,o=r*r;for(let l=0;l<s.top;l++){if(!s.alive[l]||s.kind[l]>=Zt)continue;const c=s.owner[l]===this.me;if(i&&!c)continue;const h=s.x[l]/256,u=s.z[l]/256;if(!c&&!this.seen(h,u)||(this.cam.toScreen(h,$t(s.map,h,u)+(s.kind[l]===jt?.2:.6),u,this.W,this.H,this.v),!this.v.z))continue;const d=(this.v.x-t)**2+(this.v.y-e)**2;d<o&&(o=d,a=l)}return[a,Math.sqrt(o)]}get lastTouch(){for(const t of this.pointers.values())return t.type!=="mouse";return matchMedia("(pointer: coarse)").matches}pickBuilding(t,e){const i=this.world;let s=-1,r=1;this.right.set(1,0,0).applyQuaternion(this.cam.cam.quaternion);for(let a=0;a<i.top;a++){if(!i.isBuilding(a))continue;const o=i.x[a]/256,l=i.z[a]/256;if(i.owner[a]!==this.me&&!this.seen(o,l,!0))continue;const c=be[i.kind[a]-Zt].size,h=$t(i.map,o,l)+(c>=3?.7:.5);if(this.cam.toScreen(o,h,l,this.W,this.H,this.v),!this.v.z)continue;this.cam.toScreen(o+this.right.x*c*.55,h,l+this.right.z*c*.55,this.W,this.H,this.v2);const u=Math.max(18,Math.hypot(this.v2.x-this.v.x,this.v2.y-this.v.y)),d=Math.hypot(this.v.x-t,this.v.y-e)/u;d<r&&(r=d,s=a)}return[s,r]}pickTile(t,e,i){const s=this.world,r=s.size,a=Math.floor(i.x),o=Math.floor(i.z),l=this.lastTouch?36:28;let c=-1,h=l*l;for(let u=-3;u<=2;u++)for(let d=-3;d<=3;d++){const f=a+d,g=o+u;if(f<0||g<0||f>=r||g>=r)continue;const v=g*r+f,m=s.map.tree[v]>0;if(!(!(m||s.resKind[v])||s.resAmt[v]<=0||!s.explored[this.me][v])&&!(s.resKind[v]===3&&s.players[this.me].era<2))for(const p of m?[.6,1.5,2.4]:[.3]){if(this.cam.toScreen(f+.5,$t(s.map,f+.5,g+.5)+p,g+.5,this.W,this.H,this.v),!this.v.z)continue;const M=(this.v.x-t)**2+(this.v.y-e)**2;M<h&&(h=M,c=v)}}return c}target(t,e,i=this.cam.ground(t,e,this.W,this.H)){const s=this.world,r=i?.x??0,a=i?.z??0,[o,l]=this.pickUnit(t,e,!1),[c,h]=this.pickBuilding(t,e);if(o>=0&&(c<0||l<14||h>.75))return{kind:"unit",e:o,k:-1,x:s.x[o]/256,z:s.z[o]/256};if(c>=0)return{kind:"building",e:c,k:-1,x:s.x[c]/256,z:s.z[c]/256};if(i){const u=this.pickTile(t,e,i);if(u>=0)return{kind:"tile",e:-1,k:u,x:u%s.size+.5,z:Math.floor(u/s.size)+.5}}return{kind:"ground",e:-1,k:-1,x:r,z:a}}clickSelect(t,e,i,s){const r=this.world,a=this.target(t,e,null),o=a.kind==="unit"?a.e:-1;if(i&&!this.ownUnitsSelected()&&this.selected.clear(),o>=0&&r.owner[o]===this.me&&r.kind[o]!==jt){if(i||this.selected.clear(),s){const l=r.kind[o];for(let c=0;c<r.top;c++)if(r.isUnit(c)&&r.owner[c]===this.me&&r.kind[c]===l){const h=r.x[c]/256,u=r.z[c]/256;this.cam.toScreen(h,$t(r.map,h,u),u,this.W,this.H,this.v),this.v.z&&this.v.x>=0&&this.v.y>=0&&this.v.x<=this.W&&this.v.y<=this.H&&this.selected.add(c)}}else i&&this.selected.has(o)?this.selected.delete(o):this.selected.add(o);this.hooks.onSelect();return}if(a.kind==="unit"||a.kind==="building"){this.only(a.e);return}!i&&this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}selectBox(t,e,i,s,r){const a=this.world,o=Math.min(t,i),l=Math.max(t,i),c=Math.min(e,s),h=Math.max(e,s);(!r||!this.ownUnitsSelected())&&this.selected.clear();for(let u=0;u<a.top;u++){if(!a.isUnit(u)||a.owner[u]!==this.me)continue;const d=a.x[u]/256,f=a.z[u]/256;this.cam.toScreen(d,$t(a.map,d,f)+.5,f,this.W,this.H,this.v),this.v.z&&this.v.x>=o&&this.v.x<=l&&this.v.y>=c&&this.v.y<=h&&this.selected.add(u)}this.hooks.onSelect()}drawBox(t,e){const i=this.box;if(i.style.display="block",!t||!e){const s=[...this.pointers.values()][0];if(!s)return;i.style.left=s.sx+"px",i.style.top=s.sy+"px",i.style.width=i.style.height="2px";return}i.style.left=Math.min(t.sx,e.clientX)+"px",i.style.top=Math.min(t.sy,e.clientY)+"px",i.style.width=Math.abs(e.clientX-t.sx)+"px",i.style.height=Math.abs(e.clientY-t.sy)+"px"}hideBox(){this.box.style.display="none"}update(t){const e=this.keys;let i=0,s=0;const r=900*t;(e.has("a")||e.has("arrowleft"))&&(i+=r),(e.has("d")||e.has("arrowright"))&&(i-=r),(e.has("w")||e.has("arrowup"))&&(s+=r),(e.has("s")||e.has("arrowdown"))&&(s-=r),(i||s)&&(this.cam.pan(i,s,this.H),this.hooks.onInteract()),e.has("q")&&(this.cam.tyaw+=t*1.6),e.has("e")&&(this.cam.tyaw-=t*1.6),(e.has("+")||e.has("="))&&(this.cam.tdist*=1-t*1.2),e.has("-")&&(this.cam.tdist*=1+t*1.2)}}const dd="origines_opts",Zx=n=>n.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class Jx{constructor(t){R(this,"root");R(this,"screen",null);R(this,"rivals",3);R(this,"diff",1);this.act=t,this.root=document.getElementById("menus");try{const e=JSON.parse(localStorage.getItem(dd)??"{}");e.rivals>=1&&e.rivals<=3&&(this.rivals=e.rivals),e.diff>=0&&e.diff<=2&&(this.diff=e.diff)}catch{}Iu(()=>this.render())}get open(){return this.screen!==null}get kind(){return this.screen?.k??null}showStart(t){this.screen={k:"start",info:t,step:"main"},this.render()}updateStart(t){this.screen?.k==="start"&&(this.screen.info=t,this.render())}showPause(t,e){this.screen={k:"pause",minutes:t,quality:e,saved:""},this.render()}showEnd(t,e,i){this.screen={k:"end",result:t,minutes:e,era:i},this.render()}hide(){this.screen=null,this.render()}lang(){return`<div class="seg" role="group" aria-label="${$("lang.label")}"><button id="btn-idioma-en" aria-pressed="${ri()==="en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${ri()==="pt"}">PT</button></div>`}render(){const t=this.screen,e=this.root;if(e.dataset.open=String(!!t),e.dataset.screen=t?.k??"",!t){e.innerHTML="";return}if(t.k==="start"){const r=t.info.meta,a=t.info.account,o=`${r?`<button id="btn-continuar" class="big primary">${$(t.info.fromCloud?"menu.continueCloud":"menu.continue")}<small>${$("menu.saved",{era:$(`era.${r.era}`),y:r.year,r:r.rivals})}</small></button>`:""}
        <button id="btn-novo-jogo" class="big${r?"":" primary"}">${$("menu.new")}</button>
        ${a?a.logado?`<button id="btn-perfil-conta" class="link">${$("cloud.account",{name:Zx(a.apelido??"")})}</button>`:`<button id="btn-entrar-conta" class="link strong">${$("cloud.login")}</button><p class="muted small">${$("cloud.why")}</p>`:""}`,l=`<div class="opt"><div class="opt-l">${$("menu.rivals")}</div><div class="seg">${[1,2,3].map(c=>`<button data-rivais="${c}" aria-pressed="${this.rivals===c}">${c}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${$("menu.difficulty")}</div><div class="seg">${[0,1,2].map(c=>`<button data-dificuldade="${c}" aria-pressed="${this.diff===c}">${$(`diff.${c}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${$("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${$("menu.back")}</button>`;e.innerHTML=`<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${$("menu.tagline")}</div></div>
        <div class="card panel">${t.step==="main"?o:l}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${$(Mt.opts.muted?"snd.unmute":"snd.mute")}" aria-label="${$(Mt.opts.muted?"snd.unmute":"snd.mute")}" aria-pressed="${Mt.opts.muted}">${ze(Mt.opts.muted?"mute":"sound")}</button><span class="credits">${$("menu.credits")}</span></div>
        <p class="local">${$(t.info.account?.logado?"menu.localCloud":"menu.local")}</p></div>`}else t.k==="pause"?e.innerHTML=`<div class="screen pause"><div class="card panel">
        <h2>${$("pause.title")}</h2><p class="muted">${$("pause.time",{m:t.minutes})}</p>
        <button id="btn-voltar-jogo" class="big primary">${$("pause.resume")}</button>
        <button id="btn-salvar" class="big">${$("pause.save")}</button>
        ${t.saved?`<p class="saved ${t.saved==="fail"?"fail":t.saved==="saving"?"":"ok"}">${$({saving:"pause.saving",both:"pause.savedBoth",local:"pause.saved",localOnly:"pause.savedLocalOnly",fail:"pause.saveFail"}[t.saved])}</p>`:""}
        <div class="opt"><div class="opt-l">${$("q.label")}</div><div class="seg">${Fa.map((r,a)=>`<button data-qualidade="${r.key}" aria-pressed="${t.quality===a}">${$(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${$("lang.label")}</div>${this.lang()}</div>
        ${["music","sfx","amb"].map(r=>`<div class="opt"><div class="opt-l">${$(`snd.${r}`)}</div><div class="seg">${[0,1,2,3].map(a=>`<button data-${{music:"musica",sfx:"efeitos",amb:"ambiente"}[r]}="${a}" aria-pressed="${Mt.opts[r]===a}">${$(`snd.l${a}`)}</button>`).join("")}</div></div>`).join("")}
        <div class="row2"><button id="btn-ajuda-pausa">${$("btn.help")}</button><button id="btn-sair">${$("pause.quit")}</button></div>
      </div></div>`:e.innerHTML=`<div class="screen end ${t.result}"><div class="card panel">
        <h2>${$(`end.${t.result}`)}</h2><p>${$(`end.${t.result}.d`)}</p><p class="muted">${$(`era.${t.era}`)} · ${$("pause.time",{m:t.minutes})}</p>
        <button id="btn-fim-menu" class="big primary">${$("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${$("end.watch")}</button>
      </div></div>`;const i=(r,a)=>e.querySelectorAll(r).forEach(o=>o.onclick=()=>a(o)),s=()=>{try{localStorage.setItem(dd,JSON.stringify({rivals:this.rivals,diff:this.diff}))}catch{}};i("#btn-idioma-en",()=>ld("en")),i("#btn-idioma-pt",()=>ld("pt")),i("#btn-continuar",()=>this.act.cont()),i("#btn-novo-jogo",()=>{this.screen?.k==="start"&&(this.screen.step="new",this.render())}),i("#btn-voltar-inicio",()=>{this.screen?.k==="start"&&(this.screen.step="main",this.render())}),i("[data-rivais]",r=>{this.rivals=Number(r.dataset.rivais),s(),this.render()}),i("[data-dificuldade]",r=>{this.diff=Number(r.dataset.dificuldade),s(),this.render()}),i("#btn-comecar",()=>this.act.start(this.rivals,this.diff)),i("#btn-voltar-jogo",()=>this.act.resume()),i("#btn-salvar",async()=>{if(this.screen?.k!=="pause"||this.screen.saved==="saving")return;this.screen.saved="saving",this.render();const r=await this.act.save();this.screen?.k==="pause"&&(this.screen.saved=r,this.render())}),i("#btn-entrar-conta",()=>this.act.login()),i("#btn-perfil-conta",()=>this.act.profile()),i("[data-qualidade]",r=>{const a=Fa.findIndex(o=>o.key===r.dataset.qualidade);a>=0&&this.screen?.k==="pause"&&(this.screen.quality=a,this.act.quality(a),this.render())}),i("#btn-ajuda-pausa",()=>this.act.help()),i("#btn-som-inicio",()=>{Mt.toggleMute(),this.render()}),i("[data-musica]",r=>{Mt.setOpts({music:Number(r.dataset.musica),muted:!1}),this.render()}),i("[data-efeitos]",r=>{Mt.setOpts({sfx:Number(r.dataset.efeitos),muted:!1}),this.render()}),i("[data-ambiente]",r=>{Mt.setOpts({amb:Number(r.dataset.ambiente),muted:!1}),this.render()}),i("#btn-sair",()=>this.act.quit()),i("#btn-fim-menu",()=>this.act.toMenu()),i("#btn-continuar-olhando",()=>this.act.watch()),e.querySelector(".primary")?.focus({preventScroll:!0})}}function Qx(n,t,e,i){const s=e.filter(h=>n.isUnit(h)&&n.owner[h]===t),r=s.filter(h=>n.kind[h]===Xt.villager),a=s.filter(h=>n.kind[h]!==Xt.villager),o=Math.round(i.x*256),l=Math.round(i.z*256),c=h=>h.length?[{type:"move",player:t,ids:h,x:o,z:l}]:[];if(i.kind==="tile"&&r.length)return{cmds:[{type:"gather",player:t,ids:r,k:i.k},...c(a)],ping:"work"};if(i.kind==="building"&&n.alive[i.e]){const h=i.e;return n.owner[h]===t?{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"}:{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}if(i.kind==="unit"&&n.alive[i.e]){const h=i.e;if(n.kind[h]===jt)return{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"};if(n.owner[h]!==t&&(n.owner[h]===le||n.hostile(t,n.owner[h])))return{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}return{cmds:c(s),ping:"move"}}const t_=(n,t)=>{for(const e of t)if(n.isUnit(e)&&n.kind[e]===Xt.villager)return!0;return!1},Lu=1,Du=["alive","kind","owner","x","z","hp","state","slotX","slotZ","task","tgt","tgtTile","phase","carry","carryRes","cd","work","done","sub","aggro","tmr","herd","fast","amx","amz","fails","frac","rallyX","rallyZ","dropB","ignoreT","ignoreUntil","stuck","best","foodMode"],ud=new WeakMap;function e_(n){let t=ud.get(n);if(t)return t;const e=Ed(n.map.seed,n.players.length),i=e.size*e.size,s=new Uint8Array(i),r=new Int32Array(i);for(let a=0;a<i;a++)e.tree[a]&&(r[a]=e.wood[a]*100);for(const a of e.res){const o=a.z*e.size+a.x;s[o]=a.kind,r[o]=a.amount*100}return t={tree:e.tree,kind:s,amt:r},ud.set(n,t),t}function n_(n){const t=[];let e=0,i=0;for(let s=0;s<n.length;s++){const r=n[s]?1:0;r===e?i++:(t.push(i),e=r,i=1)}return t.push(i),t}function fd(n,t){let e=0,i=0;for(const s of n)i&&t.fill(1,e,e+s),e+=s,i^=1}function i_(n){const t=e_(n),e=n.size,i=n.top,s={};for(const h of Du)s[h]=Array.from(n[h].subarray(0,i));const r=[];for(let h=0;h<i;h++)n.alive[h]&&n.queue[h].length&&r.push([h,n.queue[h].slice()]);const a=[],o=[],l=[];for(let h=0;h<e*e;h++)t.tree[h]&&!n.map.tree[h]&&a.push(h),n.resAmt[h]!==t.amt[h]&&o.push(h,n.resAmt[h]),n.resKind[h]!==t.kind[h]&&l.push(h,n.resKind[h]);const c=n.players.find(h=>!h.ai)??n.players[0];return{v:Lu,seed:n.map.seed,players:n.players.length,humans:n.players.filter(h=>!h.ai).length,difficulty:n.difficulty,tick:n.tick,rng:n.rng.save(),top:i,ent:s,queue:r,P:n.players.map(h=>({res:{...h.res},era:h.era,aging:h.aging,agingB:h.agingB,hunger:h.hunger,defeated:h.defeated,lastAlert:h.lastAlert,ai:h.ai,tech:h.tech})),ai:n.ai.map(h=>({...h})),barbNext:n.barbNext,barbWarned:n.barbWarned,outcome:n.outcome,cut:a,amt:o,kindDiff:l,explored:n.explored.map(n_),projectiles:n.projectiles.map(h=>({...h})),meta:{era:c.era,year:n.year,rivals:n.players.filter(h=>h.ai).length,difficulty:n.difficulty,minutes:Math.floor(n.tick/600)}}}function Uu(n){if(!n||n.v!==Lu)throw new Error("save version");const t=new Od(n.seed,n.players,{humans:n.humans,difficulty:n.difficulty}),e=t.size,i=e*e;for(const s of Du){const r=t[s];r.fill(s==="ignoreT"||s==="dropB"||s==="tgt"?-1:0),n.ent[s]&&r.set(n.ent[s])}t.top=n.top;for(let s=0;s<kt;s++)t.queue[s]=[],t.field[s]=null,t.path[s]=null;for(const[s,r]of n.queue)t.queue[s]=r.slice();if(t.px.set(t.x),t.pz.set(t.z),!n.ent.foodMode)for(let s=0;s<n.top;s++)t.alive[s]&&t.kind[s]===Zt+Ze.center&&(t.hp[s]=Math.min(be[Ze.center].hp,t.hp[s]*2));for(const s of n.cut)t.map.tree[s]=0,t.map.wood[s]=0;for(let s=0;s<n.amt.length;s+=2)t.resAmt[n.amt[s]]=n.amt[s+1];for(let s=0;s<n.kindDiff.length;s+=2)t.resKind[n.kindDiff[s]]=n.kindDiff[s+1];for(let s=0;s<i;s++)t.resKind[s]===Je&&t.resAmt[s]<=0&&(t.resKind[s]=0,t.resAmt[s]=0);t.bAt.fill(0);for(let s=0;s<i;s++){const r=t.map.terrain[s];t.blocked[s]=r===Ri||r===es||t.map.tree[s]||t.resKind[s]?1:0}for(let s=0;s<t.top;s++)if(t.alive[s]&&t.kind[s]>=Zt){const[r,a,o]=t.footprint(s),l=be[t.kind[s]-Zt].walk;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const u=(a+c)*e+r+h;t.bAt[u]=s+1,l||(t.blocked[u]=1)}}n.explored.forEach((s,r)=>{t.explored[r].fill(0),fd(s,t.explored[r])}),n.P.forEach((s,r)=>{const a=t.players[r];Object.assign(a.res,s.res),a.era=s.era,a.aging=s.aging,a.agingB=s.agingB,a.hunger=s.hunger,a.defeated=s.defeated,a.lastAlert=s.lastAlert,a.ai=s.ai,a.tech=s.tech??0}),t.ai=n.ai.map(s=>({...s})),t.barbNext=n.barbNext,t.barbWarned=n.barbWarned,t.outcome=n.outcome,t.tick=n.tick,t.rng.load(n.rng),t.projectiles=n.projectiles.map(s=>({...s})),t.events.length=0;for(let s=0;s<t.top;s++)t.alive[s]&&t.state[s]===qe&&(t.task[s]===Ae?t.goPoint(s,t.slotX[s],t.slotZ[s]):t.state[s]=Se);return t.updateFog(),n.explored.forEach((s,r)=>{t.explored[r].fill(0),fd(s,t.explored[r])}),t}const Dr="origines_save_v1",eo="origines_save_meta_v1";function Oa(n){const t=i_(n);t.meta.savedAt=Date.now();try{localStorage.setItem(Dr,JSON.stringify(t)),localStorage.setItem(eo,JSON.stringify(t.meta))}catch{}return t}function s_(n){try{localStorage.setItem(Dr,JSON.stringify(n)),localStorage.setItem(eo,JSON.stringify(n.meta))}catch{}}function r_(){try{const n=localStorage.getItem(eo);return n&&localStorage.getItem(Dr)?JSON.parse(n):null}catch{return null}}function a_(){try{const n=localStorage.getItem(Dr);return n?Uu(JSON.parse(n)):null}catch{return null}}function ku(){try{localStorage.removeItem(Dr),localStorage.removeItem(eo)}catch{}}const _c="/api/origines/save";let li=null,Fs=null;const Mc=[],o_=()=>Fs,l_=n=>{Mc.push(n)},er=()=>!!Fs?.logado;async function c_(){if(location.pathname.startsWith("/jogar/"))try{const n=window;if(n.QGConta||await new Promise((t,e)=>{const i=document.createElement("script");i.src="/conta.js?v=2",i.onload=()=>t(),i.onerror=()=>e(new Error("conta")),document.head.appendChild(i)}),li=n.QGConta??null,!li)return;Fs=await li.me(),li.aoMudar(t=>{Fs=t,Mc.forEach(e=>e())})}catch{li=null,Fs=null}}const h_=async()=>{li&&(await li.entrar(),Fs=await li.me(),Mc.forEach(n=>n()))},d_=()=>li?.perfil();async function u_(){if(!er())return null;try{const n=await fetch(_c,{credentials:"same-origin"});return n.ok?(await n.json()).save??null:null}catch{return null}}async function f_(){if(!er())return null;try{const n=await fetch(`${_c}?dados=1`,{credentials:"same-origin"});return n.ok?(await n.json()).dados??null:null}catch{return null}}const Nu=(n,t=!1)=>fetch(_c,{method:"POST",credentials:"same-origin",keepalive:t,headers:{"content-type":"application/json"},body:JSON.stringify(n)});async function Ba(n,t=!1){if(!er())return!1;try{const e={dados:n};return t&&JSON.stringify(e).length>6e4&&(t=!1),(await Nu(e,t)).ok}catch{return!1}}async function p_(){if(er())try{await Nu({apagar:!0})}catch{}}const m_=n=>({era:n.era,year:n.ano,rivals:n.rivais,difficulty:n.dificuldade,minutes:n.minutos,savedAt:n.salvoEm}),pd=new WeakMap;function yc(n){let t=pd.get(n);if(!t){const e=n.sampleRate*2,i=n.createBuffer(1,e,n.sampleRate),s=i.getChannelData(0);let r=22222;for(let a=0;a<e;a++)r=r*16807%2147483647,s[a]=r/10737418235e-1-1;t={noise:i,pluck:new Map},pd.set(n,t)}return t}function Os(n,t,e){const i=n.createBufferSource();return i.buffer=yc(n).noise,i.loop=!0,i.start(t,t*7.31%1.5),i.stop(t+e+.05),i}function ye(n,t,e,i,s,r=0){const a=n.createGain(),o=Math.max(2e-4,e);return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+i),r&&a.gain.setValueAtTime(o,t+i+r),a.gain.exponentialRampToValueAtTime(1e-4,t+i+r+s),a}function je(n,t,e,i=1){const s=n.createBiquadFilter();return s.type=t,s.frequency.value=e,s.Q.value=i,s}function Re(n,t,e,i,s){const r=n.createOscillator();return r.type=t,r.frequency.setValueAtTime(e,i),r.start(i),r.stop(i+s+.05),r}function oe(...n){for(let t=0;t<n.length-1;t++)n[t].connect(n[t+1]);return n[n.length-1]}function te(n,t,e,i,s,r,a,o,l=.004){const c=Re(n,i,s,e,a);c.frequency.exponentialRampToValueAtTime(Math.max(20,r),e+a),oe(c,ye(n,e,o,l,a),t)}function Bt(n,t,e,i,s,r,a,o,l=.003){oe(Os(n,e,a+l),je(n,i,s,r),ye(n,e,o,l,a),t)}function Ho(n,t,e,i,s){const r=Os(n,e,s.dur),a=je(n,"bandpass",s.f,3),o=n.createGain(),l=Re(n,"sine",s.lfo[0],e,s.dur),c=n.createGain();return l.frequency.linearRampToValueAtTime(s.lfo[1],e+s.dur*.9),c.gain.value=.5,o.gain.value=.5,l.connect(c).connect(o.gain),oe(r,a,o,ye(n,e,.1*i,s.dur*.22,s.dur*.73),t),Bt(n,t,e+s.snapAt,"bandpass",s.snapF,2,.03,(s.snap??.08)*i),Math.max(s.dur,s.snapAt+.06)}function pn(n,t,e,i,s,r=[1,2.4,3.6,5.1],a=1.6){r.forEach((o,l)=>oe(Re(n,"sine",i*o,e,a),ye(n,e,s/(1+l*.9),.003,a/(1+l*.6)),t))}function g_(n,t,e,i,s,r){const a=Re(n,"sine",i,e,r),o=Re(n,"sine",i*1.4,e,r),l=n.createGain();l.gain.setValueAtTime(i*1.6,e),l.gain.exponentialRampToValueAtTime(i*.1,e+r),o.connect(l).connect(a.frequency),oe(a,ye(n,e,s,.002,r),t);for(const[c,h]of[[2.756,.5],[5.404,.3],[8.933,.18]])for(const u of[1,1.007])oe(Re(n,"sine",i*c*u,e,r*.7),ye(n,e,s*h*.5,.002,r*(.7-c*.04)),t)}function v_(n,t){const e=Math.round(t*10),i=yc(n);let s=i.pluck.get(e);if(s)return s;const r=n.sampleRate,a=Math.floor(r*1.8),o=Math.max(2,Math.round(r/t));s=n.createBuffer(1,a,r);const l=s.getChannelData(0),c=new Float32Array(o);let h=e*7+1;for(let u=0;u<o;u++)h=h*16807%2147483647,c[u]=(h/10737418235e-1-1)*.6;for(let u=0,d=0;u<a;u++){const f=c[d],g=c[(d+1)%o];c[d]=.996*.5*(f+g),l[u]=f,d=(d+1)%o}return i.pluck.set(e,s),s}function x_(n,t,e,i,s,r=2600,a=1.6){const o=n.createBufferSource();o.buffer=v_(n,i),o.start(e),o.stop(e+a),oe(o,je(n,"lowpass",r,.7),ye(n,e,s,.002,a),t)}function In(n,t,e,i,s,r,a,o,l="sawtooth"){const c=n.createOscillator();c.type=l,c.frequency.setValueAtTime(s[0][1],e);for(const[f,g]of s.slice(1))c.frequency.linearRampToValueAtTime(g,e+f);const h=n.createOscillator(),u=n.createGain();h.frequency.value=a[0],u.gain.value=a[1],h.connect(u).connect(c.frequency),c.start(e),c.stop(e+i+.05),h.start(e),h.stop(e+i+.05);const d=ye(n,e,o,Math.min(.05,i*.2),i*.8,i*.1);for(const[f,g]of r){const v=n.createGain();v.gain.value=g,oe(c,je(n,"bandpass",f,6),v,d)}d.connect(t)}function Ma(n){const t=n.createBufferSource();return t.buffer=yc(n).noise,t.loop=!0,t.start(),t}function Yl(n,t,e,i,s){const r=3+s%4,a=2600+s*137%1600;for(let o=0;o<r;o++){const l=e+o*(.07+(s+o)%3*.02),c=a*(1+(s*(o+3)%7-3)*.06),h=Re(n,"sine",c,l,.07);h.frequency.exponentialRampToValueAtTime(c*(o%2?.8:1.35),l+.06),oe(h,ye(n,l,.05*i,.01,.05),t)}return r*.1}const Sn={"ui.click":(n,t,e,i)=>(te(n,t,e,"sine",700,420,.05,.2*i),Bt(n,t,e,"bandpass",2400,2,.025,.06*i),.08),"ui.denied":(n,t,e,i)=>{const s=Re(n,"sine",240,e,.15);return s.frequency.exponentialRampToValueAtTime(170,e+.14),oe(s,je(n,"lowpass",900),ye(n,e,.16*i,.006,.14),t),.16},"sel.villager":(n,t,e,i)=>(te(n,t,e,"triangle",560,480,.05,.12*i),te(n,t,e+.07,"triangle",700,600,.05,.1*i),.14),"sel.soldier":(n,t,e,i)=>(te(n,t,e,"sine",180,90,.12,.24*i),Bt(n,t,e,"lowpass",600,1,.04,.1*i),.14),"sel.building":(n,t,e,i)=>(te(n,t,e,"sine",300,220,.08,.18*i),te(n,t,e+.09,"sine",300,220,.08,.13*i),.2),"order.move":(n,t,e,i)=>(Bt(n,t,e,"lowpass",500,1,.05,.13*i),Bt(n,t,e+.11,"lowpass",450,1,.05,.11*i),.18),"order.work":(n,t,e,i)=>(Bt(n,t,e,"bandpass",2600,3,.03,.12*i),te(n,t,e,"sine",1500,1300,.02,.05*i),.05),"order.attack":(n,t,e,i)=>(te(n,t,e,"sine",150,70,.18,.28*i),Bt(n,t,e,"lowpass",800,1,.05,.1*i),.2),place:(n,t,e,i)=>(te(n,t,e,"sine",190,85,.2,.3*i),Bt(n,t,e,"lowpass",400,1,.08,.12*i),.22),"place.bad":(n,t,e,i)=>{const s=Re(n,"triangle",170,e,.17);return s.frequency.exponentialRampToValueAtTime(120,e+.16),oe(s,je(n,"lowpass",900),ye(n,e,.18*i,.005,.16),t),.18},trained:(n,t,e,i)=>(pn(n,t,e,880,.14*i,[1,1.5],.35),.4),built:(n,t,e,i)=>(te(n,t,e,"sine",180,100,.14,.2*i),te(n,t,e+.12,"sine",150,90,.14,.18*i),pn(n,t,e+.26,1046,.09*i,[1,1.5],.6),.9),tech:(n,t,e,i)=>(pn(n,t,e,660,.15*i,[1,2,2.76,4.07],1.6),pn(n,t,e+.18,990,.1*i,[1,2,2.76],1.2),1.8),metal:(n,t,e,i)=>([880,1108,1320].forEach((s,r)=>pn(n,t,e+r*.11,s,.09*i,[1,2.4,3.6],.9)),1.2),horn:(n,t,e,i)=>{const s=ye(n,e,.2*i,.18,.4,.9),r=je(n,"lowpass",1100,.7);for(const[a,o]of[[98,1],[98.7,.8],[147,.45]]){const l=Re(n,"sawtooth",a,e,1.6),c=n.createGain();c.gain.value=o,oe(l,c,r)}return oe(r,s,t),1.6},"drums.war":(n,t,e,i)=>([0,.45,.9,1.2,1.5,1.95,2.25,2.55].forEach((s,r)=>{te(n,t,e+s,"sine",95,55,.3,(.12+r*.025)*i),Bt(n,t,e+s,"lowpass",300,1,.05,.06*i)}),2.9),gong:(n,t,e,i)=>(pn(n,t,e,110,.22*i,[1,1.44,2.05,2.84,3.82],3),Bt(n,t,e,"lowpass",2e3,1,.05,.08*i),3),winter:(n,t,e,i)=>{const s=Os(n,e,1.8),r=je(n,"lowpass",300,.8);return r.frequency.linearRampToValueAtTime(900,e+.8),r.frequency.linearRampToValueAtTime(300,e+1.7),oe(s,r,ye(n,e,.1*i,.5,1.2),t),pn(n,t,e+.3,520,.1*i,[1,2.4,3.6],2),2.3},spring:(n,t,e,i)=>{for(let s=0;s<5;s++)Yl(n,t,e+s*.22,i*1.6,3+s*5);return 1.6},hunger:(n,t,e,i)=>(oe(Re(n,"sine",98,e,1.1),ye(n,e,.1*i,.1,.9),t),oe(Re(n,"sine",147,e,1.1),ye(n,e,.06*i,.1,.9),t),1.1),soft:(n,t,e,i)=>(pn(n,t,e,784,.07*i,[1,2],.5),.5),fair:(n,t,e,i)=>{[587,740,880,988,880].forEach((s,r)=>Ar(n,t,e+r*.14,s,.13,.1*i));for(let s=0;s<4;s++)Ha(n,t,e+s*.18,.5*i);return .9},"work.chop":(n,t,e,i)=>(Bt(n,t,e,"bandpass",1100,1.5,.05,.28*i),te(n,t,e,"sine",260,170,.06,.18*i),.08),"work.pick":(n,t,e,i)=>(pn(n,t,e,2100,.1*i,[1,1.45],.09),Bt(n,t,e,"highpass",3e3,1,.015,.06*i),.1),"work.pickMetal":(n,t,e,i)=>(pn(n,t,e,2600,.09*i,[1,1.5,2.04],.2),Bt(n,t,e,"highpass",3e3,1,.012,.05*i),.2),"work.hoe":(n,t,e,i)=>(Bt(n,t,e,"lowpass",350,1,.09,.22*i),te(n,t,e,"sine",120,80,.08,.12*i),.1),"work.mallet":(n,t,e,i)=>(te(n,t,e,"sine",330,240,.07,.22*i),Bt(n,t,e,"bandpass",900,1.5,.04,.1*i),.08),"work.rustle":(n,t,e,i)=>{for(const s of[0,.07,.15])Bt(n,t,e+s,"bandpass",4e3,1,.05,.06*i);return .22},"drop.wood":(n,t,e,i)=>(te(n,t,e,"sine",160,110,.12,.2*i),Bt(n,t,e,"lowpass",500,1,.06,.1*i),.14),"drop.stone":(n,t,e,i)=>{for(let s=0;s<4;s++)Bt(n,t,e+s*.035,"bandpass",1500+s*200,2,.03,.08*i);return .18},"drop.food":(n,t,e,i)=>{for(const s of[0,.06])Bt(n,t,e+s,"bandpass",2e3,1,.06,.07*i);return .14},"drop.metal":(n,t,e,i)=>(pn(n,t,e,2600,.07*i,[1,1.5],.15),pn(n,t,e+.07,2900,.06*i,[1,1.5],.15),.25),"tree.fall":(n,t,e,i)=>{const s=Re(n,"sawtooth",90,e,.45);return s.frequency.linearRampToValueAtTime(70,e+.45),oe(s,je(n,"bandpass",400,4),ye(n,e,.05*i,.05,.4),t),Bt(n,t,e+.4,"lowpass",700,1,.7,.18*i,.01),te(n,t,e+.4,"sine",70,45,.4,.16*i),1.2},"res.crumble":(n,t,e,i)=>{for(let s=0;s<5;s++)Bt(n,t,e+s*.09,"lowpass",900,1,.08,(.14-s*.02)*i);return .55},puff:(n,t,e,i)=>(Bt(n,t,e,"lowpass",600,.7,.3,.15*i,.02),te(n,t,e,"sine",150,100,.12,.05*i),.34),"fall.animal":(n,t,e,i)=>(te(n,t,e,"sine",95,50,.25,.22*i),Bt(n,t,e+.05,"lowpass",600,.7,.3,.12*i,.02),.4),crash:(n,t,e,i)=>{Bt(n,t,e,"lowpass",1200,.8,1.1,.26*i,.01);for(const s of[0,.18,.36])te(n,t,e+s,"sine",80,45,.25,.18*i);return 1.2},"hit.club":(n,t,e,i)=>(te(n,t,e,"sine",320,210,.07,.26*i),Bt(n,t,e,"bandpass",1600,1.5,.04,.1*i),.08),"hit.axe":(n,t,e,i)=>(Bt(n,t,e,"bandpass",1e3,2,.06,.26*i),te(n,t,e,"sine",240,160,.06,.16*i),.08),"hit.sword":(n,t,e,i)=>(g_(n,t,e,1250,.07*i,.55),Bt(n,t,e,"highpass",4500,.8,.05,.09*i),te(n,t,e,"sine",260,170,.05,.1*i),.55),"hit.spear":(n,t,e,i)=>{const s=Os(n,e,.12),r=je(n,"bandpass",2200,2);return r.frequency.exponentialRampToValueAtTime(900,e+.1),oe(s,r,ye(n,e,.12*i,.01,.1),t),te(n,t,e+.08,"sine",400,300,.03,.08*i),.13},"hit.wall":(n,t,e,i)=>(te(n,t,e,"sine",200,130,.09,.24*i),Bt(n,t,e,"lowpass",700,1,.05,.12*i),.1),"hit.bite":(n,t,e,i)=>(Bt(n,t,e,"bandpass",1500,2,.04,.12*i),te(n,t,e,"sine",500,300,.05,.08*i),In(n,t,e,.18,[[0,110],[.18,95]],[[400,1]],[22,8],.05*i),.2),"hit.boar":(n,t,e,i)=>(In(n,t,e,.1,[[0,140],[.1,120]],[[500,1],[1100,.4]],[30,10],.1*i),In(n,t,e+.13,.08,[[0,130],[.08,115]],[[500,1]],[30,10],.08*i),te(n,t,e,"sine",120,70,.12,.12*i),.25),"hit.aurochs":(n,t,e,i)=>(te(n,t,e,"sine",100,55,.2,.2*i),Bt(n,t,e,"bandpass",700,1.5,.12,.08*i),.22),throw:(n,t,e,i)=>{const s=Os(n,e,.36),r=je(n,"bandpass",500,1.2);return r.frequency.exponentialRampToValueAtTime(1600,e+.15),r.frequency.exponentialRampToValueAtTime(700,e+.34),oe(s,r,ye(n,e,.1*i,.08,.26),t),.36},bow:(n,t,e,i)=>Ho(n,t,e,i,{dur:.3,f:1800,lfo:[16,24],snapAt:0,snapF:2900,snap:.1}),tower:(n,t,e,i)=>Ho(n,t,e,i,{dur:.34,f:1500,lfo:[13,20],snapAt:0,snapF:2300,snap:.1}),sling:(n,t,e,i)=>Ho(n,t,e,i,{dur:.45,f:1400,lfo:[10,18],snapAt:.42,snapF:2500}),"arrow.hit":(n,t,e,i)=>(te(n,t,e,"sine",420,260,.04,.16*i),Bt(n,t,e,"bandpass",2200,2,.03,.08*i),.06),"spear.hit":(n,t,e,i)=>(te(n,t,e,"sine",300,180,.06,.2*i),Bt(n,t,e,"bandpass",1500,2,.04,.08*i),.08),"stone.hit":(n,t,e,i)=>(Bt(n,t,e,"bandpass",2600,4,.03,.16*i),te(n,t,e,"sine",950,800,.02,.06*i),.05),"ram.boom":(n,t,e,i)=>(te(n,t,e,"sine",72,42,.55,.42*i),Bt(n,t,e,"lowpass",350,1,.4,.24*i),Bt(n,t,e+.02,"bandpass",900,2,.08,.08*i),.6),"ram.creak":(n,t,e,i)=>{const s=Re(n,"sawtooth",140,e,.3);return s.frequency.linearRampToValueAtTime(120,e+.3),oe(s,je(n,"bandpass",600,5),ye(n,e,.03*i,.05,.25),t),.3},"animal.sheep":(n,t,e,i)=>(In(n,t,e,.7,[[0,330],[.6,300]],[[800,1],[1800,.5],[2600,.2]],[7,18],.07*i),.7),"animal.horse":(n,t,e,i)=>(In(n,t,e,.9,[[0,500],[.15,900],[.5,700],[.9,450]],[[1e3,1],[2200,.4]],[9,40],.05*i),.9),"animal.dog":(n,t,e,i)=>{for(const s of[0,.16])In(n,t,e+s,.1,[[0,420],[.09,300]],[[900,1],[1700,.5]],[0,0],.08*i);return .28},"animal.wolf":(n,t,e,i)=>(In(n,t,e,.45,[[0,95],[.45,90]],[[350,1]],[22,6],.06*i),.45),"animal.howl":(n,t,e,i)=>{for(const[s,r]of[[0,1],[.28,.3]]){const a=Re(n,"sine",420,e+s,1.6);a.frequency.linearRampToValueAtTime(620,e+s+.6),a.frequency.linearRampToValueAtTime(540,e+s+1.5),oe(a,je(n,"lowpass",1200),ye(n,e+s,.05*i*r,.25,1.2,.1),t)}return 1.9},"animal.boar":(n,t,e,i)=>(In(n,t,e,.12,[[0,125],[.12,110]],[[500,1]],[28,10],.07*i),In(n,t,e+.16,.1,[[0,120],[.1,105]],[[500,1]],[28,10],.06*i),.28),"animal.aurochs":(n,t,e,i)=>(In(n,t,e,1,[[0,120],[1,100]],[[350,1],[800,.4]],[4,3],.07*i),1),"animal.deer":(n,t,e,i)=>(Bt(n,t,e,"bandpass",1200,2,.12,.07*i),Bt(n,t,e+.05,"bandpass",600,2,.1,.05*i),.17),"animal.crow":(n,t,e,i)=>{for(const s of[0,.3])In(n,t,e+s,.18,[[0,620],[.18,520]],[[1300,1],[2600,.4]],[0,0],.04*i);return .5},"animal.hooves":(n,t,e,i)=>{for(const s of[0,.07,.2,.27])te(n,t,e+s,"sine",180,120,.04,.1*i),Bt(n,t,e+s,"lowpass",900,1,.02,.05*i);return .32},bird:(n,t,e,i)=>Yl(n,t,e,i,1+Math.floor(e*977%97))},__={"order.move":5,"order.work":3.5,"work.rustle":3,"drop.stone":5,"drop.food":4,sling:4,"ram.creak":5,throw:2.5,"stone.hit":2,"res.crumble":2,"hit.spear":1.5,"hit.bite":1.5,bow:4,tower:4,"animal.dog":3.5,"animal.wolf":4,"animal.boar":5,"animal.deer":5,"animal.crow":3,"animal.sheep":2.5,"animal.horse":2,"animal.aurochs":2,horn:.7,gong:.7,"ram.boom":.8};for(const[n,t]of Object.entries(__)){const e=Sn[n];Sn[n]=(i,s,r,a)=>e(i,s,r,a*t)}function ai(n,t,e,i,s){te(n,t,e,"sine",i*1.6,i,.4,.22*s),Bt(n,t,e,"lowpass",400,1,.05,.08*s)}function Ar(n,t,e,i,s,r,a=.22){const o=ye(n,e,.13*r,.05,.14,Math.max(0,s-.08)),l=Re(n,"sine",i,e,s+.3),c=Re(n,"triangle",i*2,e,s+.3),h=n.createGain();h.gain.value=a;const u=Re(n,"sine",5,e,s+.3),d=n.createGain();d.gain.setValueAtTime(0,e),d.gain.linearRampToValueAtTime(i*.006,e+.2),u.connect(d),d.connect(l.frequency),d.connect(c.frequency),oe(l,o),oe(c,h,o),o.connect(t),oe(Os(n,e,s+.1),je(n,"bandpass",i*2,8),ye(n,e,.02*r,.03,.1,Math.max(0,s-.05)),t)}function M_(n,t,e,i,s,r){Ar(n,t,e,i,s,r*.9,.05)}function y_(n,t,e,i,s){x_(n,t,e,i,.2*s)}function b_(n,t,e,i,s){oe(Re(n,"sine",i,e,.4),ye(n,e,.12*s,.002,.35),t),oe(Re(n,"sine",i*2.92,e,.2),ye(n,e,.04*s,.002,.15),t),Bt(n,t,e,"bandpass",3e3,3,.01,.03*s)}function Kl(n,t,e,i,s){pn(n,t,e,i,.08*s,[1,2.4,3.6,5.1],2)}function jl(n,t,e,i,s,r){const a=je(n,"lowpass",i*3,.8);a.frequency.linearRampToValueAtTime(i*6,e+.15),a.frequency.linearRampToValueAtTime(i*4,e+s);for(const o of[1,1.004])oe(Re(n,"sawtooth",i*o,e,s+.3),a);oe(a,ye(n,e,.07*r,.08,.2,Math.max(0,s-.1)),t)}function S_(n,t,e,i,s,r){const a=je(n,"lowpass",420,.7),o=n.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(.05*r,e+1.5),o.gain.setValueAtTime(.05*r,e+Math.max(1.5,s-1.5)),o.gain.linearRampToValueAtTime(1e-4,e+s);for(const l of[1,1.5])oe(Re(n,"sawtooth",i*l,e,s),a);oe(a,o,t)}function Ha(n,t,e,i){Bt(n,t,e,"highpass",5e3,1,.06,.05*i,.005)}const an=n=>440*Math.pow(2,(n-69)/12);function zu(n,t,e,i,s){const r=an(i.m),a=i.d*s;switch(i.i){case"drum":ai(n,t,e,r,i.v);break;case"drumHi":ai(n,t,e,r*1.8,i.v*.8);break;case"flute":Ar(n,t,e,r,a,i.v);break;case"ocarina":M_(n,t,e,r,a,i.v);break;case"lyre":y_(n,t,e,r,i.v);break;case"stones":b_(n,t,e,r,i.v);break;case"bells":Kl(n,t,e,r,i.v);break;case"horn":jl(n,t,e,r,a,i.v);break;case"drone":S_(n,t,e,r,a,i.v);break;case"shaker":Ha(n,t,e,i.v);break}}const wr=62,Zl=[[[0,2],[3,1],[5,1]],[[7,3],[5,1]],[[3,1],[5,1],[7,1],[10,1]],[[12,4]],[[10,2],[7,1],[5,1]],[[3,2],[5,2]],[[7,1],[5,1],[3,1],[2,1]],[[0,4]]],E_=[...Zl.slice(0,3),[[12,2],[10,1],[12,1]],...Zl.slice(4,7),[[0,2],[-5,1],[0,1]]],T_=[[[7,1],[10,1],[12,2]],[[14,2],[12,2]],[[10,1],[12,1],[14,1],[15,1]],[[17,3],[15,1]],[[14,2],[12,1],[10,1]],[[12,2],[7,2]],[[10,1],[9,1],[7,1],[5,1]],[[7,4]]],Cs=[[0,7,12,15],[0,7,12,15],[-2,5,10,14],[-2,5,10,14],[0,7,12,15],[7,14,19,22],[-2,5,10,14],[0,7,12,15]];function Jl(){const n=[];let t=0;const e=(i,s,r)=>i.forEach((a,o)=>{let l=0;for(const[c,h]of a)n.push({b:(t+o)*4+l,i:s,m:wr+c,d:h,v:r}),l+=h});for(let i=0;i<4;i++,t+=8){e(i===2?T_:i===1?E_:Zl,"flute",1);for(let s=0;s<8;s++){const r=(t+s)*4;if(n.push({b:r,i:"drum",m:38,d:1,v:.9},{b:r+2,i:"drum",m:43,d:1,v:.6}),i>=2){n.push({b:r+3.5,i:"drumHi",m:43,d:1,v:.4});for(let a=0;a<4;a++)n.push({b:r+a+.5,i:"shaker",m:0,d:.5,v:.7})}i>=1&&Cs[s].concat([Cs[s][2],Cs[s][1],Cs[s][2],Cs[s][1]]).forEach((a,o)=>n.push({b:r+o*.5,i:"lyre",m:50+a,d:.5,v:.7})),i===3&&n.push({b:r,i:"bells",m:74+Cs[s][0],d:2,v:.8})}i===2&&[[0,50],[8,45],[16,48],[24,50]].forEach(([s,r])=>n.push({b:t*4+s,i:"horn",m:r,d:7,v:.9}))}return n.push({b:128,i:"drum",m:38,d:1,v:1},{b:128,i:"flute",m:wr,d:3,v:.9}),{bpm:80,beats:132,notes:n}}const A_=[[0,3,5,7,10],[0,2,3,5,7,9,10],[0,2,4,5,7,9,10]];function w_(n){let t=n>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const md=[[1,1,2],[.5,.5,1,2],[1.5,.5,2],[2,1,1],[1,1,1,1],[3,1],[2,2]];function Fu(n,t,e,i){const s=Math.min(n,2),r=w_(i*97+s*13+t*5),a=A_[s],o=a.length,l=P=>wr+12*Math.floor(P/o)+a[(P%o+o)%o],c=t===1,h=e===3,u=Math.round([72,80,88][s]*(c?1.15:1)*(h?.85:e===2?.93:1)),d=[],f=P=>{const T=[];let E=P;for(let w=0;w<2;w++){const b=md[Math.floor(r()*md.length)],y=[];for(const S of b)y.push([E,S]),E=Math.max(-2,Math.min(o+3,E+[-2,-1,-1,1,1,2,0][Math.floor(r()*7)]));T.push(y)}return T},g=f(Math.floor(r()*3)),v=f(2+Math.floor(r()*3)),m=f(o),p=(P,T)=>P.map(E=>E.map(([w,b])=>[w+T,b])),M=[[[2,2],[1,2]],[[0,4]]],x=[...g,...p(g,1),...v,...M,...g,...p(g,-1),...m,...M,...m,...p(m,-1),...v,...M,...g,...v,...g,...M],_=s===0?"flute":s===1?"ocarina":"flute";return x.forEach((P,T)=>{let E=0;const w=T*4,b=!c&&T%8===7&&r()<.3;for(const[S,L]of P)!b&&!(h&&r()<.25)&&d.push({b:w+E,i:_,m:l(S)+(s===0?0:12*(e===1?1:0)),d:L*.95,v:.85}),E+=L;const y=h?.4:c?1:.7;if(s===0){if(d.push({b:w,i:"drum",m:38,d:1,v:.9}),r()<y&&d.push({b:w+2,i:"drum",m:43,d:1,v:.6}),c)for(let S=0;S<4;S++)d.push({b:w+S+.5,i:"shaker",m:0,d:.5,v:.6});T%4===3&&r()<y&&d.push({b:w+3,i:"drumHi",m:43,d:.5,v:.5},{b:w+3.5,i:"drumHi",m:43,d:.5,v:.4})}else if(s===1)T%8===0&&d.push({b:w,i:"drone",m:38,d:32,v:.9}),(T%2===0||c)&&d.push({b:w,i:"drum",m:38,d:1,v:.7}),r()<y&&[0,1.5,3].forEach((S,L)=>d.push({b:w+S,i:"stones",m:l([0,2,4][L]+T%2)-12,d:1,v:.6}));else{const S=T%8<4?0:T%8<6?-2:5,L=[S,S+7,S+12,S+16];r()<y+.2&&[0,1,2,3,2,1,2,1].forEach((U,D)=>d.push({b:w+D*.5,i:"lyre",m:50+L[U],d:.5,v:.6})),d.push({b:w,i:"drum",m:38,d:1,v:.8}),c&&d.push({b:w+2,i:"drum",m:43,d:1,v:.6},{b:w+3.5,i:"shaker",m:0,d:.5,v:.6}),T%8===0&&d.push({b:w,i:"bells",m:74+S,d:2,v:.7}),T%8===6&&r()<.7&&d.push({b:w,i:"horn",m:45+(r()<.5?0:5),d:6,v:.8})}}),{bpm:u,beats:x.length*4,notes:d}}class C_{constructor(){R(this,"base",null);R(this,"tens",null);R(this,"batt",null);R(this,"queue",[]);R(this,"qi",0);R(this,"mode","off");R(this,"pieceEnd",0);R(this,"nextStart",0);R(this,"pieceN",0);R(this,"seed",1);R(this,"tension",0);R(this,"battle",0);R(this,"layerT",0);R(this,"getEra",()=>0);R(this,"getSeason",()=>0);Mt.ready(()=>{const t=Mt.ctx,e=Mt.out("music");this.base=t.createGain(),this.tens=t.createGain(),this.batt=t.createGain();for(const i of[this.base,this.tens,this.batt])i.connect(e);this.tens.gain.value=this.batt.gain.value=0,setInterval(()=>this.tick(),200),this.mode==="menu"&&this.startMenu()})}menu(){this.mode!=="menu"&&(this.mode="menu",this.startMenu())}startMenu(){Mt.ctx&&(this.clear(),this.enqueue(Jl(),Mt.now+.4))}game(t,e){this.getEra=t,this.getSeason=e,this.mode="game",this.pieceN=0,this.seed=(Date.now()&65535)+1,Mt.ctx&&(this.clear(),this.nextStart=Mt.now+6)}stop(){this.mode="off",this.clear()}preview(t,e,i){this.mode="game",this.getEra=()=>t,this.getSeason=()=>i,this.pieceN=e,this.seed=7,Mt.ctx&&(this.clear(),this.nextStart=Mt.now+.5)}setTension(t){this.tension=t}setBattle(t){this.battle=t}clear(){const t=Mt.now;this.queue=[],this.qi=0,this.pieceEnd=t,this.base&&(this.base.gain.cancelScheduledValues(t),this.base.gain.setValueAtTime(this.base.gain.value,t),this.base.gain.linearRampToValueAtTime(0,t+.6),this.base.gain.linearRampToValueAtTime(1,t+1.6))}enqueue(t,e){const i=60/t.bpm;for(const s of t.notes)this.queue.push({t:e+s.b*i,n:s,spb:i,out:"base"});this.queue.sort((s,r)=>s.t-r.t),this.qi=0,this.pieceEnd=e+t.beats*i}tick(){if(!Mt.running||!this.base)return;const t=Mt.now,e=t+1.2;if(this.qi>=this.queue.length){if(this.mode==="menu"&&t>this.pieceEnd-.5)this.enqueue(Jl(),Math.max(t+.2,this.pieceEnd+3));else if(this.mode==="game"&&t>=this.nextStart-.5){const s=Fu(this.getEra(),this.pieceN%3,this.getSeason(),this.seed+this.pieceN);this.pieceN++,this.enqueue(s,Math.max(t+.2,this.nextStart)),this.nextStart=this.pieceEnd+60+(this.seed*7+this.pieceN*31)%90}}for(;this.qi<this.queue.length&&this.queue[this.qi].t<e;){const s=this.queue[this.qi++];s.t>=t-.05&&zu(Mt.ctx,this.base,Math.max(s.t,t),s.n,s.spb)}const i=Mt.ctx;if(this.tens.gain.setTargetAtTime(this.mode==="game"?this.tension:0,t,1.2),this.batt.gain.setTargetAtTime(this.mode==="game"?this.battle:0,t,this.battle>.05?.4:2.5),this.mode==="game"&&(this.tension>.02||this.battle>.02)){const s=.7142857142857143;for(this.layerT<t&&(this.layerT=t+.05);this.layerT<e;){const r=this.layerT,a=Math.round(r/s%4);this.tension>.02&&ai(i,this.tens,r,an(33),.8),this.battle>.02&&(ai(i,this.batt,r,an(a%2?43:38),.9),ai(i,this.batt,r+s/2,an(48),.55),Ha(i,this.batt,r+s/4,.8),Ha(i,this.batt,r+s*.75,.8)),this.layerT+=s}}}stinger(t,e=0){const i=Mt.ctx,s=Mt.out("alert");if(!i||!s||!Mt.voice(3))return;const r=i.currentTime+.05;if(Mt.duck(.7,3.5),t==="age"){for(let o=0;o<6;o++)ai(i,s,r+o*.12,an(38+o%2*5),.5+o*.08);[0,4,7,12].map(o=>wr+o+(e>=2?0:-12)).forEach((o,l)=>e>=2?jl(i,s,r+.75+l*.22,an(o-12),.3,1.4):Ar(i,s,r+.75+l*.2,an(o+12),.3,1.2)),e>=2?Kl(i,s,r+1.6,an(74),1.2):ai(i,s,r+1.6,an(38),1)}else if(t==="victory"){[0,4,7,12,7,12].forEach((a,o)=>jl(i,s,r+o*.25,an(50+a),o===5?1.2:.22,1.3));for(let a=0;a<8;a++)ai(i,s,r+a*.125,an(38+a%2*5),.7);Kl(i,s,r+1.3,an(74),1.3)}else[12,10,7,5,3,0].forEach((a,o)=>Ar(i,s,r+o*.35,an(wr+a),o===5?1.4:.32,.9)),ai(i,s,r+2.1,an(38),.6)}}const Ge=new C_,Go={theme:Jl,eraPiece:Fu,play:zu};class Ou{constructor(){R(this,"loops",{});R(this,"wf",null);R(this,"t",null);R(this,"next",{});R(this,"seed",1)}start(){const t=Mt.ctx,e=Mt.out("amb");if(!t||!e||this.loops.wind)return;const i=(s,r)=>{const a=t.createGain();a.gain.value=0,a.connect(e),this.loops[s]={g:a,stop:r(a)}};i("wind",s=>{const r=Ma(t),a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=380,a.Q.value=.6,this.wf=a;const o=t.createOscillator(),l=t.createGain();o.frequency.value=.07,l.gain.value=220,o.connect(l).connect(a.frequency);const c=t.createGain(),h=t.createOscillator(),u=t.createGain();return c.gain.value=.75,h.frequency.value=.11,u.gain.value=.25,h.connect(u).connect(c.gain),r.connect(a).connect(c).connect(s),o.start(),h.start(),()=>{r.stop(),o.stop(),h.stop()}}),i("water",s=>{const r=Ma(t),a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=700,a.Q.value=.9;const o=t.createGain(),l=t.createOscillator(),c=t.createGain();return o.gain.value=.8,l.frequency.value=.4,c.gain.value=.2,l.connect(c).connect(o.gain),r.connect(a).connect(o).connect(s),l.start(),()=>{r.stop(),l.stop()}}),i("fire",s=>{const r=Ma(t),a=t.createBiquadFilter();return a.type="lowpass",a.frequency.value=170,r.connect(a).connect(s),()=>r.stop()}),i("market",s=>{const r=Ma(t),a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=600,a.Q.value=3;const o=t.createOscillator(),l=t.createGain();return o.frequency.value=3.3,l.gain.value=250,o.connect(l).connect(a.frequency),r.connect(a).connect(s),o.start(),()=>{r.stop(),o.stop()}}),i("insects",s=>{const r=t.createOscillator();r.type="triangle",r.frequency.value=4300;const a=t.createGain(),o=t.createOscillator(),l=t.createGain();a.gain.value=.5,o.frequency.value=32,l.gain.value=.5,o.connect(l).connect(a.gain);const c=t.createGain(),h=t.createOscillator(),u=t.createGain();return c.gain.value=.5,h.frequency.value=.3,u.gain.value=.5,h.connect(u).connect(c.gain),r.connect(a).connect(c).connect(s),r.start(),o.start(),h.start(),()=>{r.stop(),o.stop(),h.stop()}})}stop(){const t=Mt.now;for(const e in this.loops){const i=this.loops[e];i.g.gain.setTargetAtTime(0,t,.3),setTimeout(()=>{try{i.stop()}catch{}},1500)}this.loops={},this.wf=null}set(t){this.t=t;const e=Mt.now,i=this.loops;if(!i.wind)return;const s=t.season,r=Math.min(1,Math.max(0,(t.zoom-20)/60)),a={wind:([.32,.22,.48,.7][s]??.3)*(.6+r*.6),water:t.water*.6*(1-r*.5),fire:t.fire*.5,market:t.market*(t.fair?.12:.06),insects:s===1?.012*(1-r*.5):0};for(const o in a)i[o]?.g.gain.setTargetAtTime(a[o],e,1);this.wf&&this.wf.frequency.setTargetAtTime(s===3?700:380,e,2)}tick(){const t=this.t,e=Mt.ctx,i=Mt.out("amb");if(!t||!e||!i||!Mt.running)return;const s=e.currentTime,r=t.season,a=()=>(this.seed=this.seed*16807%2147483647,this.seed/2147483647),o=(h,u)=>(this.next[h]??0)>s?!1:(this.next[h]=s+u(),!0),l=1-Math.min(1,Math.max(0,(t.zoom-20)/70)),c=[.9,.6,.25,0][r]*(.4+t.trees*.6);c>.05&&o("bird",()=>1.5+a()*4/c)&&Yl(e,i,s+.05,.9*l+.3,1+Math.floor(a()*90)),r===3&&o("crow",()=>9+a()*14)&&Sn["animal.crow"](e,i,s+.05,.6),r===2&&t.trees>.2&&o("leaves",()=>2+a()*4)&&Sn["work.rustle"](e,i,s+.05,.6*l),t.fire>.05&&o("crackle",()=>.08+a()*.35)&&Sn["stone.hit"](e,i,s+.02,.18*t.fire*(.5+a())),t.forge>.05&&o("forge",()=>1.1+a()*1.2)&&Sn["work.pickMetal"](e,i,s+.02,.8*t.forge),t.pens>.05&&o("sheep",()=>6+a()*10)&&Sn["animal.sheep"](e,i,s+.05,.9*t.pens),t.stables>.05&&o("horse",()=>9+a()*12)&&Sn["animal.horse"](e,i,s+.05,.8*t.stables)}}const Is=(n,t,e)=>Math.max(t,Math.min(e,n)),gd=new Map,Ql={};function Ga(n,t=1,e=0,i="sfx",s=.07){const r=Mt.ctx,a=Mt.out(i),o=Sn[n];if(!r||!a||!o||!Mt.running||t<.01)return;const l=r.currentTime;if((gd.get(n)??-9)>l-s||!Mt.voice(.35))return;gd.set(n,l),Ql[n]=(Ql[n]??0)+1;let c=a;if(e&&r.createStereoPanner){const h=r.createStereoPanner();h.pan.value=Is(e,-1,1),h.connect(a),c=h}o(r,c,l+.01,Is(t,0,1.2))}const Ei=n=>Mt.whenRunning(()=>Ga(n,1,0,"ui",.04));class R_{constructor(t,e,i){R(this,"amb",new Ou);R(this,"t",0);R(this,"slow",0);R(this,"raidUntil",0);R(this,"animalT",0);this.w=t,this.me=e,this.cam=i,Mt.setScene("game"),Ge.game(()=>t.players[e].era,()=>t.season),Ln.emit=(s,r,a,o)=>this.at(s,r,a,o),Mt.ready(()=>this.amb.start())}dispose(){Ln.emit=()=>{},this.amb.stop()}at(t,e,i,s=1){if(!Mt.running)return;const r=this.w,a=r.size,o=Math.floor(e),l=Math.floor(i);if(o<0||l<0||o>=a||l>=a||!r.vis[this.me][l*a+o])return;const c=this.cam,h=e-c.x,u=i-c.z,d=Math.hypot(h,u),f=Is(1-d/22,0,1),g=Is(1.25-c.dist/70,.3,1);if(f<.05)return;const v=(h*Math.cos(c.yaw)-u*Math.sin(c.yaw))/12;Ga(t,s*f*f*g,v)}alert(t){Ga(t,1,0,"alert",.5),(t==="horn"||t==="drums.war"||t==="gong")&&Mt.duck()}onEvents(t){const e=this.w,i=e.size;for(const s of t)switch(s.t){case"proj":this.at(s.h!==void 0?"tower":s.kind==="arrow"?"bow":s.kind==="stone"?"sling":"throw",s.x0/256,s.z0/256);break;case"death":{const r=s.x/256,a=s.z/256;this.at(s.kind>=Zt?"crash":s.owner===le?"fall.animal":"puff",r,a);break}case"built":e.alive[s.e]&&this.at("built",e.x[s.e]/256,e.z[s.e]/256);break;case"trained":e.alive[s.e]&&e.owner[s.e]===this.me&&this.at("trained",e.x[s.e]/256,e.z[s.e]/256,.8);break;case"tree":this.at("tree.fall",s.k%i+.5,Math.floor(s.k/i)+.5);break;case"res":e.resKind[s.k]===0&&this.at("res.crumble",s.k%i+.5,Math.floor(s.k/i)+.5);break;case"age":s.player===this.me&&Ge.stinger("age",s.era);break;case"end":Ge.stinger(s.result==="victory"?"victory":"defeat");break;case"msg":{if(s.player!==this.me)break;const r=s.key.split(".")[0],a={underAttack:"horn",raidSoon:"drums.war",centerLost:"gong",tech:"tech",fair:"fair",winter:"winter",spring:"spring",hunger:"hunger",winterSoon:"soft",metalSeen:"metal",campLoot:"metal"};a[r]&&this.alert(a[r]),r==="raidSoon"&&(this.raidUntil=this.w.tick+400);break}}}update(t,e){if(Mt.setPaused(e),this.t+=t,(this.slow-=t)>0||(this.slow=.25,!Mt.running))return;const i=this.w,s=this.me,r=i.size,a=this.cam,o=a.x,l=a.z,c=i.vis[s];let h=0,u=0,d=0;for(let T=-8;T<=8;T+=2)for(let E=-8;E<=8;E+=2){const w=Math.floor(o+E),b=Math.floor(l+T);if(w<0||b<0||w>=r||b>=r)continue;const y=b*r+w;d++;const S=i.map.terrain[y];(S===Ri||S===Bs)&&h++,i.map.tree[y]&&u++}let f=0,g=0,v=0,m=0,p=0,M=0,x=0;const _=[];for(let T=0;T<i.top;T++){if(!i.alive[T])continue;const E=i.x[T]/256,w=i.z[T]/256,b=Math.hypot(E-o,w-l);if(b>18||!c[Math.floor(w)*r+Math.floor(E)]&&i.owner[T]!==s)continue;const y=Is(1-b/16,0,1);if(i.kind[T]>=Zt){if(!i.done[T])continue;const S=be[i.kind[T]-Zt].key;S==="center"||S==="camp"?f=Math.max(f,y):S==="forge"?g=Math.max(g,y):S==="market"?v=Math.max(v,y):S==="pen"?m=Math.max(m,y):S==="stable"&&(p=Math.max(p,y))}else i.kind[T]<_t.length&&(i.owner[T]===le?b<14&&_.push(T):i.task[T]===Te&&(M++,i.owner[T]===s&&x++),_t[i.kind[T]].key==="horseman"&&(p=Math.max(p,y*.5)))}if(this.amb.set({season:i.season,zoom:a.dist,water:d?Math.min(1,h/d*3):0,fire:f,market:v,fair:i.fair,forge:g,pens:m,stables:p,trees:d?Math.min(1,u/d*2):0}),this.amb.tick(),_.length&&(this.animalT-=.25)<=0){const T=_[Math.floor(this.t*7.7%_.length)],E=_t[i.kind[T]].key,w=E==="wolf"?i.season===3?"animal.howl":"animal.wolf":`animal.${E}`;Sn[w]&&this.at(w,i.x[T]/256,i.z[T]/256,E==="wolf"&&i.season===3?.6:.8),this.animalT=5+this.t*13%7}let P=i.tick<this.raidUntil;if(!P&&Math.floor(this.t*4)%4===0){const T=i.players[s];for(let E=0;E<i.top&&!P;E++)if(i.isUnit(E)&&i.owner[E]!==s&&i.owner[E]!==le&&(i.owner[E]===hi||i.hostile(s,i.owner[E]))){const w=i.x[E]/256-T.start.x,b=i.z[E]/256-T.start.z;w*w+b*b<196&&(P=!0)}}Ge.setTension(P?.6:0),Ge.setBattle(x>0?Is((M-1)/8,.3,1):0)}}const Bu=[["Botões e ordens",["ui.click","ui.denied","sel.villager","sel.soldier","sel.building","order.move","order.work","order.attack","place","place.bad","trained","built"]],["Avisos",["horn","drums.war","gong","tech","metal","fair","winter","spring","hunger","soft"]],["Trabalho",["work.chop","work.pick","work.pickMetal","work.hoe","work.mallet","work.rustle","drop.wood","drop.stone","drop.food","drop.metal","tree.fall","res.crumble"]],["Batalha",["hit.club","hit.axe","hit.sword","hit.spear","hit.wall","hit.bite","hit.boar","hit.aurochs","throw","bow","tower","sling","arrow.hit","spear.hit","stone.hit","ram.boom","ram.creak","puff","fall.animal","crash"]],["Animais",["animal.sheep","animal.horse","animal.dog","animal.wolf","animal.howl","animal.boar","animal.aurochs","animal.deer","animal.crow","animal.hooves","bird"]]],P_={"ui.click":"Toque num botão","ui.denied":"Botão que não dá","sel.villager":"Escolher coletor","sel.soldier":"Escolher soldado","sel.building":"Escolher construção","order.move":"Ordem: andar","order.work":"Ordem: trabalhar","order.attack":"Ordem: atacar",place:"Construção colocada","place.bad":"Lugar ruim para construir",trained:"Unidade pronta",built:"Construção pronta",horn:"Trompa: ataque!","drums.war":"Tambores: bárbaros vindo",gong:"Gongo: Centro perdido",tech:"Pesquisa pronta",metal:"Metal encontrado",fair:"Dia de feira",winter:"Chegou o inverno",spring:"Chegou a primavera",hunger:"Fome",soft:"Aviso calmo","work.chop":"Machado na árvore","work.pick":"Picareta na pedra","work.pickMetal":"Picareta no metal","work.hoe":"Enxada na roça","work.mallet":"Martelo na obra","work.rustle":"Mexendo nas folhas","drop.wood":"Entrega de madeira","drop.stone":"Entrega de pedra","drop.food":"Entrega de comida","drop.metal":"Entrega de metal","tree.fall":"Árvore caindo","res.crumble":"Pedreira acabando","hit.club":"Golpe de clava","hit.axe":"Golpe de machado","hit.sword":"Golpe de espada","hit.spear":"Golpe de lança","hit.wall":"Golpe na construção","hit.bite":"Mordida","hit.boar":"Javali atacando","hit.aurochs":"Auroque atacando",throw:"Lança arremessada",bow:"Arco",tower:"Torre atirando",sling:"Funda","arrow.hit":"Flecha acertando","spear.hit":"Lança acertando","stone.hit":"Pedra acertando","ram.boom":"Aríete batendo","ram.creak":"Aríete andando",puff:"Alguém caiu","fall.animal":"Bicho caindo",crash:"Construção desabando","animal.sheep":"Ovelha","animal.horse":"Cavalo","animal.dog":"Cachorro","animal.wolf":"Lobo","animal.howl":"Uivo do lobo (inverno)","animal.boar":"Javali","animal.aurochs":"Auroque","animal.deer":"Cervo","animal.crow":"Corvo (inverno)","animal.hooves":"Cascos do cavalo",bird:"Passarinho"},I_=[["age:1","Chegou o Neolítico"],["age:2","Chegou a Idade dos Metais"],["victory","Vitória"],["defeat","Derrota"]],L_=["Pedra","Neolítico","Metais"],D_=["calma","animada","calma 2"],U_=["primavera","verão","outono","inverno"];function k_(){Mt.install(),Mt.setScene("menu");const n=new Ou,t=document.createElement("div");t.id="escuta",t.innerHTML=`<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${Bu.map(([l,c])=>`<h2>${l}</h2>${c.map(h=>`<button data-som="${h}" title="${h}">${P_[h]??h}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${L_.map((l,c)=>D_.map((h,u)=>`<button data-musica-teste="era:${c}:${u}">${l} · ${h}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${I_.map(([l,c])=>`<button data-vinheta="${l}">${c}</button>`).join("")}
    <h2>Ambiente</h2>${U_.map((l,c)=>`<button data-ambiente-teste="${c}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`,document.body.appendChild(t);const e={season:0,zoom:40,water:0,fire:0,market:0,fair:!1,forge:0,pens:0,stables:0,trees:.6};let i={...e},s=0;const r=l=>{Mt.setScene("game"),n.start(),i=l,n.set(l),s||(s=window.setInterval(()=>{n.set(i),n.tick()},250))};t.addEventListener("click",l=>{const c=l.target.closest("button");c&&(Mt.unlock(),t.querySelectorAll("[aria-pressed]").forEach(h=>h.removeAttribute("aria-pressed")),c.setAttribute("aria-pressed","true"),Mt.whenRunning(()=>o(c)))});const a=t.querySelector("#escuta-estado");window.setInterval(()=>{a.textContent=Mt.ctx?Mt.running?"Som: ligado.":"Som: ligando… se não tocar, toque de novo.":"Som: toque em qualquer botão para ligar."},400);function o(l){const c=l.dataset;if(c.som&&Ga(c.som,1,0,["horn","drums.war","gong","tech","metal","fair","winter","spring","hunger","soft"].includes(c.som)?"alert":"sfx",0),c.musicaTeste){const h=c.musicaTeste;if(Mt.setScene(h==="tema"?"menu":"game"),Mt.setOpts({music:Math.max(2,Mt.opts.music)}),h==="tema")Ge.stop(),Ge.menu();else if(h==="parar")Ge.stop();else if(h==="tensao")Ge.setTension(.6);else if(h==="batalha")Ge.setBattle(.9);else if(h==="inverno")Ge.preview(2,0,3);else{const[,u,d]=h.split(":").map(Number);Ge.setTension(0),Ge.setBattle(0),Ge.preview(u,d,0)}}if(c.vinheta){const[h,u]=c.vinheta.split(":");Ge.stinger(h,Number(u)||0)}if(c.ambienteTeste){const h=c.ambienteTeste;h==="parar"?(n.set({...e,season:1,trees:0}),i={...e,season:-1,trees:0}):r(h==="rio"?{...e,season:1,water:1,zoom:22}:h==="aldeia"?{...e,fire:1,forge:1,pens:1,zoom:22}:h==="feira"?{...e,market:1,fair:!0,zoom:22}:{...e,season:Number(h)})}}}async function N_(n){const e=new OfflineAudioContext(1,176400,44100);let i=0;if(Sn[n])i=Sn[n](e,e.destination,.01,1);else if(n.startsWith("musica:")){const[,c,h]=n.split(":"),u=c==="tema"?Go.theme():Go.eraPiece(Number(h),1,0,3),d=60/u.bpm;for(const f of u.notes)f.b*d<3.6&&Go.play(e,e.destination,.01+f.b*d,f,d);i=4}const s=await e.startRendering(),r=s.getChannelData(0);let a=0,o=0,l=0;for(let c=0;c<r.length;c++){const h=Math.abs(r[c]);h>a&&(a=h),c<Math.max(1,i)*44100&&(o+=r[c]*r[c],l++)}return{id:n,peak:a,rms:Math.sqrt(o/Math.max(1,l)),dur:i}}const z_=Bu.flatMap(n=>n[1]),Ks=new URLSearchParams(location.search),Va=(n,t)=>{const e=Number(Ks.get(n));return Ks.has(n)&&Number.isFinite(e)&&e>=0?e:t},Hu=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1,Gu=document.getElementById("scene"),Cr=Cu.makeRenderer(Gu),_e=0,Vo=1/xd;let Ti=Hu?1:0,Wa=!0;try{const n=localStorage.getItem("origines_q");n!==null&&(Ti=Math.min(2,Math.max(0,Number(n)||0)),Wa=!1)}catch{}const Vu=n=>{Ti=n;try{localStorage.setItem("origines_q",String(n))}catch{}};class F_{constructor(t){R(this,"scene");R(this,"hud");R(this,"input");R(this,"minimap");R(this,"snd");R(this,"sel",new Set);R(this,"paused",!1);R(this,"ended",!1);R(this,"acc",0);R(this,"time",0);R(this,"saveT",0);R(this,"idleCursor",0);R(this,"autoT",0);R(this,"autoN",0);R(this,"mode","normal");R(this,"placeKey","");R(this,"place",{tx:0,tz:0,ok:!1});R(this,"rallyB",-1);R(this,"wallA",null);R(this,"wallTiles",[]);this.world=t;const e=t;this.scene=new Cu(Cr,e,_e),this.scene.setQuality(Ti),Ks.get("fog")==="0"&&this.scene.setFog(!1),this.hud=new $l(e,_e,{idle:()=>{const i=this.own(r=>e.kind[r]===Xt.villager&&e.task[r]===0&&e.state[r]===0);if(!i.length)return;const s=i[this.idleCursor++%i.length];this.select([s]),this.focus([s])},army:()=>{const i=this.own(s=>e.kind[s]!==Xt.villager);this.select(i),this.focus(i)},home:()=>{const i=e.players[_e].start;this.scene.camera.tx=i.x,this.scene.camera.tz=i.z},menu:()=>this.pause(),keepKind:i=>{for(const s of[...this.sel])e.kind[s]!==i&&this.sel.delete(s)},clear:()=>{this.sel.clear(),this.setMode("normal")},stop:()=>{const i=this.own(s=>this.sel.has(s));i.length&&e.issue({type:"stop",player:_e,ids:i})},food:i=>{const s=this.own(r=>this.sel.has(r)&&e.kind[r]===Xt.villager);s.length&&e.issue({type:"food",player:_e,ids:s,on:i})},startPlace:i=>this.startPlace(i),train:(i,s)=>e.issue({type:"train",player:_e,building:i,key:s}),cancelQueue:i=>e.issue({type:"cancel",player:_e,building:i}),ageUp:i=>e.issue({type:"ageup",player:_e,building:i}),research:(i,s)=>e.issue({type:"research",player:_e,building:i,key:s}),trade:(i,s,r)=>e.issue({type:"trade",player:_e,building:i,give:s,get:r}),rally:i=>{this.rallyB=i,this.setMode(this.mode==="rally"?"normal":"rally")},placeConfirm:()=>this.confirmPlace(!1),cancelMode:()=>this.setMode("normal"),jump:(i,s)=>{this.scene.camera.tx=i,this.scene.camera.tz=s}},Hu,this.sel),this.minimap=new Kx(this.hud.minimap,e,_e,this.scene.camera),this.snd=new R_(e,_e,this.scene.camera),this.input=new jx(Gu,e,_e,this.scene.camera,this.hud.box,{onCommand:i=>{if(this.mode!=="normal")return;const{cmds:s,ping:r}=Qx(e,_e,[...this.sel],i);for(const a of s)e.issue(a);s.length&&(this.scene.ping(i.x,i.z,r),Ei(r==="attack"?"order.attack":r==="work"?"order.work":"order.move"))},onRally:(i,s)=>{const r=this.mode==="rally"&&e.alive[this.rallyB]?this.rallyB:this.input.singleOwnBuilding();r>=0&&(e.issue({type:"rally",player:_e,building:r,x:Math.round(i*256),z:Math.round(s*256)}),this.scene.ping(i,s,"move")),this.setMode("normal")},onPlaceAt:(i,s)=>this.movePlace(i,s),onPlaceConfirm:i=>this.confirmPlace(i),onCancel:()=>this.setMode("normal"),onSelect:()=>{this.mode==="place"&&!t_(e,this.sel)&&this.setMode("normal"),this.mode==="rally"&&this.setMode("normal"),this.selectSound()},onInteract:()=>this.hud.hideHint(),mode:()=>this.mode,fogOn:()=>this.scene.fogOn}),this.input.selected=this.sel,this.resize()}selectSound(){const t=this.world,e=[...this.sel][0];if(e===void 0||!t.alive[e]||t.owner[e]!==_e)return;if(t.isBuilding(e)){const s=t.bdef(e).key;Ei(s==="pen"?"animal.sheep":s==="stable"?"animal.horse":s==="forge"?"work.pickMetal":s==="market"?"soft":"sel.building");return}const i=t.kind[e];Ei(i===Xt.villager?"sel.villager":i===Xt.dog?"animal.dog":i===Xt.horseman?"animal.horse":"sel.soldier")}own(t){const e=this.world,i=[];for(let s=0;s<e.top;s++)e.isUnit(s)&&e.owner[s]===_e&&t(s)&&i.push(s);return i}select(t){this.sel.clear();for(const e of t)this.sel.add(e);this.setMode("normal")}focus(t){if(!t.length)return;let e=0,i=0;for(const s of t)e+=this.world.x[s]/256,i+=this.world.z[s]/256;this.scene.camera.tx=e/t.length,this.scene.camera.tz=i/t.length}setMode(t){this.mode=t,t!=="place"&&(this.scene.setGhost(null),this.scene.setWallGhost(null),this.wallA=null),this.hud.setMode(t,this.place.ok,t==="place"&&this.placeKey==="wall"?this.wallA?2:1:0,t==="place"?this.placeKey:""),this.hud.refresh()}startPlace(t){this.placeKey=t,this.mode="place",this.wallA=null,this.hud.resetCard(),this.movePlace(this.scene.camera.x,this.scene.camera.z)}wallLine(t,e,i,s){const r=this.world.size,a=[e*r+t],o=Math.sign(i-t),l=Math.sign(s-e),c=i-t,h=s-e,u=Math.hypot(c,h)||1,d=(v,m)=>Math.abs((v-t)*h-(m-e)*c)/u;let f=t,g=e;for(;(f!==i||g!==s)&&a.length<40;)f===i?g+=l:g===s||d(f+o,g)<=d(f,g+l)?f+=o:g+=l,a.push(g*r+f);return a}moveWall(t,e){const i=this.world,s=i.size,r=be[Ze.wall].cost.stone??0,a=Math.floor(t),o=Math.floor(e),l=this.wallA?this.wallLine(this.wallA.tx,this.wallA.tz,a,o):[o*s+a];let c=Math.floor(i.players[_e].res.stone/100/r);const h=l.map(u=>{const d=i.canPlace(_e,"wall",u%s,Math.floor(u/s))&&c>0;return d&&c--,d});this.wallTiles=l.filter((u,d)=>h[d]),this.place={tx:a,tz:o,ok:this.wallTiles.length>0},this.scene.setWallGhost(l,h),this.hud.setMode("place",this.place.ok,this.wallA?2:1,this.placeKey)}movePlace(t,e){if(this.mode!=="place")return;if(this.placeKey==="wall"){this.moveWall(t,e);return}const i=this.world,s=be[Ze[this.placeKey]],r=Math.round(t-s.size/2),a=Math.round(e-s.size/2),o=i.canPlace(_e,this.placeKey,r,a)&&i.canAfford(_e,s.cost);this.place={tx:r,tz:a,ok:o},this.scene.setGhost(this.placeKey,r,a,o),this.hud.setMode("place",o,0,this.placeKey)}confirmPlace(t){const e=this.world,i=this.own(r=>this.sel.has(r)&&e.kind[r]===Xt.villager);if(this.mode!=="place"||!i.length){this.setMode("normal");return}if(!this.place.ok){this.hud.toast($("place.bad"),void 0,void 0,"place"),Ei("place.bad");return}if(this.placeKey==="wall"){if(!this.wallA){this.wallA={tx:this.place.tx,tz:this.place.tz},this.moveWall(this.place.tx+.5,this.place.tz+.5),Ei("order.work");return}e.issue({type:"wall",player:_e,ids:i,tiles:this.wallTiles.slice()}),Ei("place");const r=this.wallTiles[this.wallTiles.length-1];this.scene.ping(r%e.size+.5,Math.floor(r/e.size)+.5,"work"),this.setMode("normal"),this.hud.resetCard();return}e.issue({type:"build",player:_e,ids:i,key:this.placeKey,tx:this.place.tx,tz:this.place.tz}),Ei("place");const s=be[Ze[this.placeKey]];this.scene.ping(this.place.tx+s.size/2,this.place.tz+s.size/2,"work"),t&&e.canAfford(_e,{wood:(s.cost.wood??0)*2,stone:(s.cost.stone??0)*2})?(this.place.ok=!1,this.scene.setGhost(this.placeKey,this.place.tx,this.place.tz,!1)):(this.setMode("normal"),this.hud.resetCard())}pause(){this.ended||(this.paused=!0,this.setMode("normal"),$n.showPause(Math.floor(this.world.tick/600),Ti))}resume(){this.paused=!1,$n.hide()}async save(){if(this.ended)return"fail";const t=Oa(this.world);return t?er()?await Ba(t)?"both":"localOnly":"local":"fail"}resize(){this.scene.resize(innerWidth,innerHeight)}frame(t){const e=this.world;if(!this.paused){this.acc+=t;let s=0;for(;this.acc>=Vo&&s<4;)e.step(),this.acc-=Vo,s++;s===4&&(this.acc=0)}const i=e.drain();if(i.length){this.scene.consume(i),this.hud.onEvents(i),this.snd.onEvents(i);for(const s of i)(s.t==="tree"||s.t==="res"&&e.resKind[s.k]===0)&&this.minimap.clearTile(s.k),s.t==="end"&&!this.ended&&this.end(s.result)}this.input.update(t);for(const s of[...this.sel])e.alive[s]||this.sel.delete(s);if(this.time+=t,this.scene.render(t,this.paused?1:this.acc/Vo,this.sel,this.time),this.minimap.update(t,this.scene.fogOn,innerWidth,innerHeight),this.hud.update(t),this.snd.update(t,this.paused),!this.paused&&!this.ended&&(this.saveT+=t)>300){this.saveT=0;const s=Oa(e);s&&Ba(s)}if(Wa&&!this.paused&&(this.autoT+=t,this.autoN++,this.autoT>4)){Wa=!1;const s=this.autoN/this.autoT;s<40&&Ti<2&&(Vu(Ti+1),this.scene.setQuality(Ti),this.hud.toast($("q.auto",{q:$(`q.${Fa[Ti].key}`),fps:Math.round(s)})))}}end(t){this.ended=!0,ku(),p_(),this.setMode("normal"),$n.showEnd(t,Math.floor(this.world.tick/600),this.world.players[_e].era)}dispose(){this.snd.dispose(),this.input.dispose(),this.hud.dispose(),this.scene.dispose()}}let ke=null;const Wu={cont:async()=>{if(qi.fromCloud){const t=await f_();let e=null;try{e=t?Uu(t):null}catch{e=null}if(e&&t){s_(t),Wo(e);return}}const n=a_();if(!n){ku(),Rr();return}Wo(n)},start:(n,t)=>Wo(new Od(Va("seed",Date.now()%1000000007>>>0),n+1,{humans:1,difficulty:t,testUnits:Math.min(600,Va("units",0))})),resume:()=>ke?.resume(),save:()=>ke?.save()??Promise.resolve("fail"),quit:()=>{if(ke&&!ke.ended){const n=Oa(ke.world);n&&Ba(n)}vd()},quality:n=>{Vu(n),Wa=!1,ke?.scene.setQuality(n)},help:()=>{ke?.resume(),ke?.hud.openHelp()},watch:()=>$n.hide(),toMenu:()=>vd(),login:()=>{h_()},profile:()=>d_()},$n=new Jx(Wu);function Wo(n){ke?.dispose(),ke=new F_(n),$n.hide();const t=ke;window.__origines={world:n,scene:t.scene,input:t.input,game:t,screen:(e,i,s=.5)=>{const r=t.scene.camera.cam.position.clone().set(e,$t(n.map,e,i)+s,i).project(t.scene.camera.cam);return[(r.x+1)/2*innerWidth,(1-r.y)/2*innerHeight,r.z<1?1:0]}}}function vd(){ke?.dispose(),ke=null,Mt.setScene("menu"),Ge.menu(),Cr.setClearColor(1911332,1),Cr.clear(),Rr()}let qi={meta:null,fromCloud:!1,account:null};async function Rr(){if(qi={meta:r_(),fromCloud:!1,account:o_()},$n.showStart(qi),!er())return;const n=await u_();if(!n||$n.kind!=="start")return;const t=qi.meta,e=m_(n);(!t||(e.savedAt??0)>(t.savedAt??0))&&(qi={...qi,meta:e,fromCloud:!0}),$n.updateStart(qi)}l_(()=>{$n.kind==="start"&&Rr()});addEventListener("resize",()=>{Cr.setSize(innerWidth,innerHeight,!1),ke?.resize()});Cr.setSize(innerWidth,innerHeight,!1);let tc=performance.now();const qu=()=>{if(ke&&!ke.ended){const n=Oa(ke.world);n&&Ba(n,!0)}};document.addEventListener("visibilitychange",()=>{tc=performance.now(),document.hidden&&qu()});addEventListener("pagehide",qu);let ya=0,qo=0,Xu=!1;Ks.get("autostart")==="1"&&(window.__clock={manual:n=>{Xu=n},step:n=>ke?.frame(n)});function $u(n){const t=Math.min(.1,(n-tc)/1e3);tc=n,ke&&!Xu&&ke.frame(t),qo++,ya+=t,ya>1&&(window.__fps=qo/ya,qo=0,ya=0),requestAnimationFrame($u)}requestAnimationFrame($u);const Yu=Ks.get("sons")==="1"||location.hash==="#sons";Mt.install();Yu||Ge.menu();document.addEventListener("click",n=>{const t=n.target?.closest?.("button");t&&t.closest("#hud, #menus")&&t.id!=="btn-som"&&t.id!=="btn-som-inicio"&&Ei(t.getAttribute("aria-disabled")==="true"?"ui.denied":"ui.click")},!0);window.__som={ids:z_,measure:N_,audio:Mt,played:Ql,music:Ge};Yu?k_():Ks.get("autostart")==="1"?Wu.start(Math.min(3,Math.max(1,Va("players",4)-1)),Math.min(2,Va("difficulty",1))):(Rr(),c_().then(()=>{$n.kind==="start"&&Rr()}));const Xo=document.getElementById("loading");Xo&&(Xo.style.opacity="0",setTimeout(()=>Xo.remove(),450));
