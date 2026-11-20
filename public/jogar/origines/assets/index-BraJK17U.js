var xu=Object.defineProperty;var Mu=(n,t,e)=>t in n?xu(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var I=(n,t,e)=>Mu(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Ct=256;function Qi(n){if(n<=0)return 0;let t=Math.floor(Math.sqrt(n));for(;t*t>n;)t--;for(;(t+1)*(t+1)<=n;)t++;return t}const qn=(n,t)=>Math.trunc(n/t),Qc=10,Os=[30,60,90,115,135,150],ts=["food","wood","stone","metal","coins"],Pt=[{key:"villager",cls:"villager",hp:25,atk:3,armor:0,range:.6,cd:15,speed:.95,radius:.28,sight:8,pop:1,cost:{food:50},time:20,era:0,hunt:2.6},{key:"warrior",cls:"infantry",hp:40,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:40,wood:20},time:18,era:0,next:"axeman"},{key:"hunter",cls:"ranged",hp:30,atk:4,armor:0,range:5,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:30},time:20,era:0,next:"archer",proj:"spear"},{key:"dog",cls:"scout",hp:30,atk:2,armor:0,range:.6,cd:10,speed:1.9,radius:.25,sight:12,pop:1,cost:{food:40},time:15,era:0},{key:"axeman",cls:"infantry",hp:55,atk:7,armor:1,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:45,wood:25},time:18,era:1},{key:"archer",cls:"ranged",hp:32,atk:5,armor:0,range:6,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:40},time:22,era:1,proj:"arrow"},{key:"spearman",cls:"spear",hp:50,atk:5,armor:1,range:.9,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:35,wood:25},time:18,era:1,bonus:{vs:"animal",dmg:6}},{key:"deer",cls:"animal",hp:12,atk:0,armor:0,range:0,cd:10,speed:.9,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:150,mode:"flee",run:1.8}},{key:"boar",cls:"animal",hp:40,atk:3,armor:0,range:.7,cd:15,speed:.8,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:250,mode:"fight",run:1.6}},{key:"wolf",cls:"animal",hp:20,atk:3,armor:0,range:.7,cd:12,speed:1.1,radius:.3,sight:5,pop:0,cost:{},time:0,era:0,animal:{food:0,mode:"predator",run:2}},{key:"aurochs",cls:"animal",hp:60,atk:5,armor:1,range:.8,cd:15,speed:.7,radius:.45,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:400,mode:"fight",run:1.4}},{key:"barbarian",cls:"infantry",hp:45,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:0,cost:{},time:0,era:0}],le=Object.fromEntries(Pt.map((n,t)=>[n.key,t])),Jt=60,se=100,Te=[{key:"center",hp:600,size:4,sight:14,cost:{},time:0,era:0,pop:[8,10,10,10,10,10],drop:!0,trains:[["villager"],["villager"]]},{key:"house",hp:150,size:2,sight:5,cost:{wood:30},time:20,era:0,pop:[4,5,6,6,6,10],buildable:!0},{key:"depot",hp:200,size:2,sight:6,cost:{wood:60},time:25,era:0,drop:!0,buildable:!0},{key:"military",hp:300,size:3,sight:7,cost:{wood:100},time:40,era:0,trains:[["warrior","hunter","dog"],["axeman","spearman","archer","dog"]],buildable:!0},{key:"farm",hp:80,size:3,sight:3,cost:{wood:60},time:15,era:1,walk:!0,buildable:!0},{key:"pen",hp:150,size:3,sight:5,cost:{wood:80},time:30,era:1,buildable:!0},{key:"sanctuary",hp:250,size:2,sight:7,cost:{wood:40,stone:60},time:40,era:1,buildable:!0},{key:"camp",hp:400,size:4,sight:8,cost:{},time:0,era:0}],pn=Object.fromEntries(Te.map((n,t)=>[n.key,t])),es=[{cost:{food:400,wood:150},time:90},{cost:{food:900,wood:400,stone:200},time:120}],Ni={berry:.4,carcass:.5,farm:.33,wood:.37,stone:.3,metal:.28},El=10,yu=["#c0392b","#2e6fd8","#e0a526","#7c3fb0"],ii=6,pe=-1,Bn=60*Qc;function bi(n,t,e){let i=Math.imul(n|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,1442695041)|0;return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}const Tl=n=>n*n*(3-2*n);function Su(n,t,e){const i=Math.floor(n),s=Math.floor(t),r=n-i,a=t-s,o=Tl(r),l=Tl(a),c=bi(i,s,e),h=bi(i+1,s,e),u=bi(i,s+1,e),f=bi(i+1,s+1,e);return c+(h-c)*o+(u-c)*l+(c-h-u+f)*o*l}function Zi(n,t,e,i=4){let s=0,r=.5,a=1,o=0;for(let l=0;l<i;l++)s+=r*Su(n*a,t*a,e+l*31),o+=r,r*=.5,a*=2.03;return s/o}const is=(n,t,e)=>n<t?t:n>e?e:n,$n=(n,t,e)=>{const i=is((e-n)/(t-n),0,1);return i*i*(3-2*i)},bs=(n,t,e)=>n+(t-n)*e;class th{constructor(t){I(this,"a");I(this,"b");I(this,"c");I(this,"d");this.a=2654435769,this.b=608135816,this.c=3084996962,this.d=t>>>0;for(let e=0;e<16;e++)this.next()}next(){let t=this.a|0,e=this.b|0,i=this.c|0,s=this.d|0;const r=(t+e|0)+s|0;return s=s+1|0,t=e^e>>>9,e=i+(i<<3)|0,i=i<<21|i>>>11,i=i+r|0,this.a=t,this.b=e,this.c=i,this.d=s,r>>>0}int(t){return this.next()%t}float(){return this.next()/4294967296}save(){return[this.a,this.b,this.c,this.d]}load(t){[this.a,this.b,this.c,this.d]=t}}const Ns=0,Vr=1,Bs=2,Ci=3,Ri=4,eh=1,to=2,nh=3,Ge=1,An=2,Hs=3,xn=1.4142135623730951,Wr=1.7320508075688772,nr=(n,t)=>Math.sqrt(n*n+t*t),ih={2:[0,1],3:[.5,Wr/2],4:[xn/2,xn/2]},bu={2:[[0,1],[0,-1]],3:[[.5,Wr/2],[-1,0],[.5,-Wr/2]],4:[[xn/2,xn/2],[-xn/2,xn/2],[-xn/2,-xn/2],[xn/2,-xn/2]]};function Al(n,t,e){const[i,s]=ih[e];for(let r=0;r<24;r++){if(t<0){t=-t;continue}if(i*t-s*n>1e-9){const o=n*i+t*s;n=2*o*i-n,t=2*o*s-t;continue}break}return[n,t]}function sh(n,t){const e=is(t,2,4),i=e===2?192:256,s=i/2,r=2,a=i/r+1,o=new Float32Array(a*a),l=i*(e===2?.32:.36),c=13,h=i*.075,[u,f]=ih[e],p=[u*l,f*l],g=[i*.21,i*.4],_=(O,W)=>{const[$,Q]=Al(O,W,e),st=Math.sqrt($*$+Q*Q);let X=(Zi($*.02+7.3,Q*.02-3.1,n,4)-.28)*10+1.4+(Zi($*.08,Q*.08,n+9,2)-.5)*1.2;const et=Math.max(Math.abs(O),Math.abs(W))/s;X+=$n(.8,.98,et)*20*(.6+.4*Zi($*.04,Q*.04,n+3,2));const lt=Q,ut=2.5+(Zi($*.05,.5,n+21,2)-.5)*3*.45;if(st>h*.8){let Dt=0;for(const Vt of g)Dt=Math.max(Dt,1-$n(3,6,Math.abs(st-Vt)));const re=bs(-2.2,-.35,Dt);X=bs(X,Math.min(X,1),$n(ut+9,ut+3,lt)*.75),X=bs(re,X,$n(ut,ut+6.5,lt))}X=bs(-2.6,X,$n(h,h+10,st));const Et=nr($-p[0],Q-p[1]);return X=bs(2.2,X,$n(c,c+8,Et)),X};for(let O=0;O<a;O++)for(let W=0;W<a;W++)o[O*a+W]=_(W*r-s,O*r-s);const m=(O,W)=>{const $=is(O/r,0,a-1.001),Q=is(W/r,0,a-1.001),st=Math.floor($),X=Math.floor(Q),et=$-st,lt=Q-X,rt=o[X*a+st],ut=o[X*a+st+1],Et=o[(X+1)*a+st],Dt=o[(X+1)*a+st+1];return rt+(ut-rt)*et+(Et-rt)*lt+(rt-ut-Et+Dt)*et*lt},d=new Uint8Array(i*i),x=new Uint8Array(i*i),M=new Uint16Array(i*i),v=[];for(let O=0;O<i;O++)for(let W=0;W<i;W++){const $=m(W+.5,O+.5),Q=O*i+W,st=Math.abs(m(W+1,O+.5)-m(W,O+.5))+Math.abs(m(W+.5,O+1)-m(W+.5,O));$<-.9?d[Q]=Ci:$<-.05?d[Q]=Bs:$<.55?d[Q]=Vr:st>2.2?d[Q]=Ri:d[Q]=Ns}const w=bu[e].map(([O,W])=>({x:Math.round(s+O*l),z:Math.round(s+W*l),ux:O,uz:W})),C=(O,W,$)=>w.some(Q=>nr(O-Q.x,W-Q.z)<$);for(let O=1;O<i-1;O++)for(let W=1;W<i-1;W++){const $=O*i+W;if(d[$]!==Ns)continue;const[Q,st]=Al(W+.5-s,O+.5-s,e),X=nr(Q,st);let et=Zi(Q*.045+13,st*.045-7,n+5,3);const lt=nr(Q-u*(l+18),st-f*(l+18));et+=$n(16,6,lt)*.35,et+=$n(14,8,st)*-.25,X<h+10&&(et-=.3);const rt=m(W+.5,O+.5);et>.585&&!C(W,O,15)&&bi(Math.round(Q*4),Math.round(st*4),n+77)>.12?(x[$]=rt>9?nh:bi(Math.round(Q*3),Math.round(st*3),n+78)<.14?to:eh,M[$]=100):bi(Math.round(Q*2),Math.round(st*2),n+79)<.012&&!C(W,O,11)&&rt<8&&(x[$]=to,M[$]=100)}if(e===2||e===4){const O=($,Q)=>{let st=Math.abs(2*$-(i-1)),X=Math.abs(2*Q-(i-1));if(e===4&&X>st){const et=st;st=X,X=et}return(X+i-1)/2*i+(st+i-1)/2};for(let $=0;$<i;$++)for(let Q=0;Q<i;Q++){const st=$*i+Q,X=O(Q,$);X!==st&&(d[st]=d[X],x[st]=x[X],M[st]=M[X])}const W=(a-1)/2;for(let $=0;$<a;$++)for(let Q=0;Q<a;Q++){let st=Math.abs(Q-W),X=Math.abs($-W);if(e===4&&X>st){const et=st;st=X,X=et}o[$*a+Q]=o[(X+W)*a+st+W]}}const A=(O,W,$)=>{if(e===2)return O===0?[W,$]:[i-1-W,i-1-$];if(e===4){let lt=W,rt=$;for(let ut=0;ut<O;ut++){const Et=lt;lt=i-1-rt,rt=Et}return[lt,rt]}let Q=W+.5-s,st=$+.5-s;const X=-.5,et=Wr/2;for(let lt=0;lt<O;lt++){const rt=Q*X-st*et;st=Q*et+st*X,Q=rt}return[Math.floor(Q+s),Math.floor(st+s)]},P=[[0,0],[1,0],[0,1],[1,1],[-1,0],[0,-1],[-1,1],[2,0]],S=new th(n^24301),y=(O,W,$,Q)=>{if(W<1||$<1||W>=i-1||$>=i-1)return;const st=$*i+W;d[st]===Ci||d[st]===Bs||v.some(X=>X.x===W&&X.z===$)||(x[st]=0,M[st]=0,d[st]===Ri&&(d[st]=Ns),v.push({kind:O,x:W,z:$,amount:Q}))},E=w[0];-E.uz,E.ux;const D=(O,W,$,Q,st,X,et)=>{const lt=[];for(let rt=0;rt<et;rt++){const[ut,Et]=P[rt%P.length];lt.push([Math.round(O+$*(st+ut)+-Q*(X+Et)-.5),Math.round(W+Q*(st+ut)+$*(X+Et)-.5)])}return lt},U=[{kind:Ge,amount:125,tiles:D(E.x,E.z,E.ux,E.uz,-5,6,6)},{kind:An,amount:350,tiles:D(E.x,E.z,E.ux,E.uz,-9,-8,5)},{kind:Hs,amount:400,tiles:D(E.x,E.z,E.ux,E.uz,-15,14,5)},{kind:Hs,amount:800,tiles:D(s,s,E.ux,E.uz,h+12,0,6)},{kind:An,amount:500,tiles:D(s,s,E.ux,E.uz,h+22,6,4)}];for(let O=0;O<e;O++)for(const W of U)for(const[$,Q]of W.tiles){const[st,X]=A(O,$,Q);y(W.kind,st,X,W.amount)}for(const O of w)for(let W=-8;W<=7;W++)for(let $=-8;$<=7;$++){if(($+.5)**2+(W+.5)**2>=50)continue;const Q=(O.z+W)*i+O.x+$;x[Q]=0,M[Q]=0}S.next();const L=(O,W)=>O>1&&W>1&&O<i-2&&W<i-2&&(d[W*i+O]===Ns||d[W*i+O]===Vr)&&!x[W*i+O]&&!v.some($=>$.x===O&&$.z===W),F=(O,W)=>{for(let $=0;$<8;$++)for(let Q=-$;Q<=$;Q++)for(let st=-$;st<=$;st++)if(Math.max(Math.abs(st),Math.abs(Q))===$&&L(O+st,W+Q))return[O+st,W+Q];return[O,W]},z=[{kind:"deer",base:"s",u:-15,v:13,n:5,r:5},{kind:"boar",base:"s",u:3,v:-16,n:1,r:3},{kind:"wolf",base:"s",u:28,v:-22,n:2,r:5},{kind:"aurochs",base:"c",u:h+30,v:12,n:3,r:6}],q=[],N=[];for(let O=0;O<e;O++){for(const lt of z){const rt=lt.base==="s"?E.x:s,ut=lt.base==="s"?E.z:s,[Et,Dt]=D(rt,ut,E.ux,E.uz,lt.u,lt.v,1)[0],[re,Vt]=A(O,Et,Dt),fe=[];for(let H=0;H<lt.n;H++){const[Ve,Wt]=P[H%P.length],[Xt,wt]=A(O,Et+Ve,Dt+Wt);fe.push(F(Xt,wt))}q.push({kind:lt.kind,x:re+.5,z:Vt+.5,r:lt.r,spots:fe})}const[W,$]=D(s,s,E.ux,E.uz,h+36,0,1)[0],[Q,st]=A(O,W,$),[X,et]=F(Q,st);for(let lt=-4;lt<=4;lt++)for(let rt=-4;rt<=4;rt++){const ut=(et+lt)*i+X+rt;ut>=0&&ut<i*i&&(x[ut]=0,M[ut]=0)}N.push({x:X,z:et,player:O})}return{size:i,seed:n,players:e,hn:a,hstep:r,heights:o,terrain:d,tree:x,wood:M,res:v,starts:w,herds:q,camps:N}}function jt(n,t,e){const i=is(t/n.hstep,0,n.hn-1.001),s=is(e/n.hstep,0,n.hn-1.001),r=Math.floor(i),a=Math.floor(s),o=i-r,l=s-a,c=n.hn,h=n.heights,u=h[a*c+r],f=h[a*c+r+1],p=h[(a+1)*c+r],g=h[(a+1)*c+r+1];return o+l<=1?u+(f-u)*o+(p-u)*l:g+(p-g)*(1-o)+(f-g)*(1-l)}const Eu=["food","wood","stone","metal"],Xr=n=>n.season===3,yn=(n,t,e,i,s)=>{t>=0&&t<n.players.length&&n.events.push({t:"msg",player:t,key:e,x:i,z:s})};function Tu(n){Vu(n);for(let t=0;t<n.top;t++){if(!n.alive[t])continue;const e=n.kind[t];e>=se?Hu(n,t):e<Jt&&(n.owner[t]===pe?Ou(n,t):Au(n,t))}zu(n),Wu(n),n.tick%50===25&&Xu(n)}function Au(n,t){switch(n.cd[t]>0&&n.cd[t]--,n.task[t]){case Ie:Iu(n,t);break;case Vn:Uu(n,t);break;case Je:oh(n,t);break;case Ii:Ru(n,t);break;default:Cu(n,t)}}function rh(n,t,e,i=!1){const s=n.owner[t];let r=-1,a=1/0;if(n.near(n.x[t],n.z[t],e,o=>{if(o===t||!n.isUnit(o)||n.ignoreT[t]===o&&n.tick<n.ignoreUntil[t])return;const l=n.owner[o];let c=n.hostile(s,l);if(l===pe&&(c=Pt[n.kind[o]].animal?.mode==="predator"||n.aggro[o]>0&&n.owner[n.aggro[o]-1]===s),!c)return;const h=n.x[o]-n.x[t],u=n.z[o]-n.z[t],f=h*h+u*u;f<a&&(a=f,r=o)}),r<0&&i){const o=(e*Ct)**2;for(let l=0;l<n.top;l++)if(n.isBuilding(l)&&n.hostile(s,n.owner[l])&&!(n.ignoreT[t]===l&&n.tick<n.ignoreUntil[t])){const c=n.x[l]-n.x[t],h=n.z[l]-n.z[t],u=c*c+h*h;u<o&&u<a&&(a=u,r=l)}}return r}function Cu(n,t){if(n.kind[t]===le.villager||(n.tick+t)%5)return;const e=rh(n,t,Pt[n.kind[t]].sight);e>=0&&(n.task[t]=Je,n.tgt[t]=e,n.phase[t]=8,n.rallyX[t]=n.x[t],n.rallyZ[t]=n.z[t],n.fails[t]=0)}function Ru(n,t){if((n.tick+t)%5===0){const e=rh(n,t,Pt[n.kind[t]].sight,!0);if(e>=0){n.task[t]=Je,n.tgt[t]=e,n.phase[t]=9;return}}if(n.state[t]===ge){const e=n.amx[t]-n.x[t],i=n.amz[t]-n.z[t];e*e+i*i>(3*Ct)**2&&n.fails[t]++<6?n.goPoint(t,n.amx[t],n.amz[t]):n.task[t]=Me}}function wu(n,t){return(n.map.tree[t]>0||n.resKind[t]!==0)&&n.resAmt[t]>0}function eo(n,t){const e=n.tgt[t];return e<0?!1:n.tgtTile[t]?wu(n,e):n.alive[e]?n.kind[e]===Jt?n.work[e]>0:n.isBuilding(e)&&n.done[e]===1&&n.bdef(e).key==="farm"&&n.owner[e]===n.owner[t]:!1}function no(n,t,e=-1){let i=n.tgt[t];const s=n.size;if(i<-1&&(i=-1-i),!n.tgtTile[t]&&e<0&&i>=0&&(e=i),n.tgtTile[t]&&i>=0&&i<s*s){const r=n.map.tree[i]>0||n.carryRes[t]===Vs,a=n.resKind[i],o=i%s,l=(i-o)/s;for(const[c,h]of Ws){if(c*c+h*h>100)break;const u=o+c,f=l+h;if(u<0||f<0||u>=s||f>=s)continue;const p=f*s+u;if(!(p===e||!n.open(p))&&(r?n.map.tree[p]&&n.resAmt[p]>0:a&&n.resKind[p]===a&&(n.resAmt[p]>0||a===Ge&&!Xr(n)))){if(a===Ge&&n.resAmt[p]<=0)continue;return n.tgt[t]=p,n.tgtTile[t]=1,n.phase[t]=En,n.fails[t]=0,n.goNear(t,p,!0),!0}}}else if(i>=0&&n.kind[i]===Jt||n.carryRes[t]===Gs){let r=-1,a=(10*Ct)**2;for(let o=0;o<n.top;o++)if(o!==e&&n.alive[o]&&n.kind[o]===Jt&&n.work[o]>0){const l=n.x[o]-n.x[t],c=n.z[o]-n.z[t],h=l*l+c*c;h<a&&(a=h,r=o)}if(r>=0)return n.tgt[t]=r,n.tgtTile[t]=0,n.phase[t]=En,n.goNear(t,r,!1),!0}return!1}function ah(n,t){const e=n.owner[t];let i=-1,s=1/0;for(let r=0;r<n.top;r++)if(n.isBuilding(r)&&n.owner[r]===e&&n.done[r]&&n.bdef(r).drop){const a=n.x[r]-n.x[t],o=n.z[r]-n.z[t],l=a*a+o*o;l<s&&(s=l,i=r)}return i}function ua(n,t){const e=ah(n,t);if(n.dropB[t]=e,e<0){n.task[t]=Me;return}n.phase[t]=Qr,n.fails[t]=0,n.goNear(t,e,!1)}function Pu(n,t,e){const i=n.tgt[t];let s;e?s=Ni.farm:n.tgtTile[t]?n.map.tree[i]?s=Ni.wood:s=n.resKind[i]===Ge?Ni.berry:n.resKind[i]===An?Ni.stone:Ni.metal:s=Ni.carcass;let r=Math.round(s*1e3);return n.players[n.owner[t]]?.hunger&&(r=Math.floor(r*7/10)),n.players[n.owner[t]]?.ai&&(r=Math.floor(r*[80,100,115][n.difficulty]/100)),r}function Iu(n,t){if(n.phase[t]===Qr){Du(n,t);return}if(!eo(n,t)){n.carry[t]>0?ua(n,t):no(n,t)||(n.task[t]=Me);return}const e=n.tgt[t],i=n.tgtTile[t]===1,s=!i&&n.kind[e]>=se,r=n.reach(t,e,i);if(n.phase[t]===En){if(r<=(s?60:i?330:220))n.phase[t]=hh,n.state[t]=ge,n.path[t]=null,n.field[t]=null;else if(n.state[t]===ge&&(n.tick+t)%3===0){if(n.overBudget)return;if(!n.goNear(t,e,i)||n.lastPartial||++n.fails[t]>4){if(n.overBudget)return;n.fails[t]=0,n.tgt[t]=-1-e,no(n,t,e)||(n.task[t]=Me)}}return}if(r>(s?140:i?420:300)){n.phase[t]=En,n.goNear(t,e,i);return}if(s&&Xr(n))return;if(i&&n.resKind[e]===Ge&&Xr(n)){n.carry[t]>0?ua(n,t):n.task[t]=Me;return}const a=i?n.map.tree[e]?Vs:n.resKind[e]===Ge?Gs:n.resKind[e]===An?io:id:Gs;n.carry[t]>0&&n.carryRes[t]!==a&&(n.carry[t]=0),n.carryRes[t]=a,n.frac[t]+=Pu(n,t,s);let o=Math.floor(n.frac[t]/100);n.frac[t]%=100;const l=s?1e9:i?n.resAmt[e]:n.work[e];o=Math.min(o,l,El*100-n.carry[t]),o>0&&(n.carry[t]+=o,s||(i?n.resAmt[e]-=o:n.work[e]-=o,(i?n.resAmt[e]:n.work[e])<=0&&Lu(n,e,i))),(n.carry[t]>=El*100||!eo(n,t)&&n.carry[t]>0)&&ua(n,t)}function Lu(n,t,e){if(!e){n.remove(t);return}if(n.map.tree[t]){n.map.tree[t]=0,n.map.wood[t]=0,n.resAmt[t]=0,n.blocked[t]=0,n.events.push({t:"tree",k:t});return}if(n.resKind[t]===Ge){n.resAmt[t]=0,n.events.push({t:"res",k:t});return}n.resKind[t]=0,n.resAmt[t]=0,n.blocked[t]=0,n.events.push({t:"res",k:t})}function Du(n,t){let e=n.dropB[t];if(e<0||!n.isBuilding(e)||!n.done[e]||n.owner[e]!==n.owner[t]){if(e=ah(n,t),n.dropB[t]=e,e<0){n.task[t]=Me;return}n.goNear(t,e,!1)}if(n.reach(t,e,!1)<=200){const i=n.players[n.owner[t]];i&&(i.res[Eu[n.carryRes[t]]]+=n.carry[t]),n.carry[t]=0,n.state[t]=ge,n.path[t]=null,eo(n,t)?(n.phase[t]=En,n.fails[t]=0,n.goNear(t,n.tgt[t],n.tgtTile[t]===1)):no(n,t)||(n.task[t]=Me);return}n.state[t]===ge&&(++n.fails[t]>5?n.task[t]=Me:n.goNear(t,e,!1))}function Uu(n,t){const e=n.tgt[t];if(!n.isBuilding(e)||n.owner[e]!==n.owner[t]){n.task[t]=Me;return}if(n.done[e]){n.bdef(e).key==="farm"&&!Nu(n,e,t)?(n.task[t]=Ie,n.phase[t]=En,n.goNear(t,e,!1)):n.task[t]=Me;return}if(n.reach(t,e,!1)>230){n.state[t]===ge&&(++n.fails[t]>5?n.task[t]=Me:n.goNear(t,e,!1));return}n.state[t]=ge,n.path[t]=null,n.fails[t]=0;const i=(n.tick&16383)+1,s=n.tmr[e]!==i;n.tmr[e]=i,n.work[e]+=s?10:6;const r=n.bdef(e),a=r.time*100;n.hp[e]=Math.max(n.hp[e],Math.floor(r.hp*Math.min(1,n.work[e]/a))),n.work[e]>=a&&(n.done[e]=1,n.hp[e]=r.hp,n.work[e]=0,n.events.push({t:"built",e}),yn(n,n.owner[e],"built."+r.key,n.x[e],n.z[e]))}function Nu(n,t,e){for(let i=0;i<n.top;i++)if(i!==e&&n.isUnit(i)&&n.task[i]===Ie&&n.tgt[i]===t&&!n.tgtTile[i])return!0;return!1}function oh(n,t){const e=n.tgt[t];if(e<0||!n.alive[e]||e===t||n.kind[e]===Jt||n.isUnit(e)&&n.owner[e]===n.owner[t]){Cl(n,t);return}n.amx[t]=n.x[e],n.amz[t]=n.z[e];const i=Pt[n.kind[t]],s=i.hunt&&n.owner[e]===pe,r=Math.round((s?i.hunt:i.range)*Ct),a=n.reach(t,e,!1);if(a<=r+40){n.fails[t]=0,n.state[t]===Ze&&(n.state[t]=ge,n.path[t]=null,n.field[t]=null),n.cd[t]===0&&(Fu(n,t,e),n.cd[t]=i.cd);return}if(n.phase[t]===8&&n.owner[t]!==pe){const o=n.x[t]-n.rallyX[t],l=n.z[t]-n.rallyZ[t];if(o*o+l*l>(12*Ct)**2){n.task[t]=Me,n.phase[t]=0,n.goPoint(t,n.rallyX[t],n.rallyZ[t]);return}}if(n.state[t]===ge&&(n.tick+t)%4===0||(n.tick+t)%15===0){if(n.overBudget)return;if(n.fails[t]>8){n.fails[t]=0,n.ignoreT[t]=e,n.ignoreUntil[t]=n.tick+300,Cl(n,t);return}if(n.owner[t]===pe){const o=n.map.herds[n.herd[t]];if(o){const l=o.x*Ct-n.x[t],c=o.z*Ct-n.z[t];if(l*l+c*c>(16*Ct)**2){n.task[t]=Me,n.aggro[t]=0,n.fast[t]=0,n.goPoint(t,o.x*Ct,o.z*Ct);return}}}if((i.proj||s)&&a<=r+Ct*2&&n.state[t]===ge){n.goPoint(t,n.x[e],n.z[e]),n.fails[t]++;return}!n.goNear(t,e,!1)||n.lastPartial?n.fails[t]+=3:n.fails[t]++}}function Cl(n,t){if(n.kind[t]===le.villager){let e=-1,i=(3*Ct)**2;for(let s=0;s<n.top;s++)if(n.alive[s]&&n.kind[s]===Jt){const r=n.x[s]-n.amx[t],a=n.z[s]-n.amz[t],o=r*r+a*a;o<i&&(i=o,e=s)}if(e>=0){n.task[t]=Ie,n.tgt[t]=e,n.tgtTile[t]=0,n.phase[t]=En,n.goNear(t,e,!1);return}}if(n.phase[t]===9&&n.owner[t]!==pe){n.task[t]=Ii,n.phase[t]=0,n.fails[t]=0,n.goPoint(t,n.rallyX[t]>=0?n.rallyX[t]:n.x[t],n.rallyZ[t]>=0?n.rallyZ[t]:n.z[t]);return}n.task[t]=Me,n.tgt[t]=-1}function Fu(n,t,e){const i=Pt[n.kind[t]];let s=i.atk;if(n.isUnit(e)){const a=Pt[n.kind[e]];s-=a.armor,i.bonus&&a.cls===i.bonus.vs&&(s+=i.bonus.dmg)}s=Math.max(1,s);const r=i.proj??(i.hunt&&n.owner[e]===pe?"spear":void 0);if(r){const a=n.x[e]-n.x[t],o=n.z[e]-n.z[t],l=Qi(a*a+o*o),c=Math.max(3,Math.round(l/Ct));n.projectiles.push({target:e,dmg:s,at:n.tick+c,by:t,k:n.kind[e],o:n.owner[e]}),n.events.push({t:"proj",x0:n.x[t],z0:n.z[t],x1:n.x[e],z1:n.z[e],ticks:c,kind:r,tk:n.kind[e],gap:n.reach(t,e,!1),te:e})}else lh(n,e,s,t)}function zu(n){if(!n.projectiles.length)return;const t=[];for(const e of n.projectiles){if(e.at>n.tick){t.push(e);continue}n.alive[e.target]&&n.kind[e.target]===e.k&&n.owner[e.target]===e.o&&lh(n,e.target,e.dmg,e.by)}n.projectiles=t}function lh(n,t,e,i){n.hp[t]-=e;const s=n.owner[t];if(s===pe)n.alive[i]&&(n.aggro[t]=i+1);else if(n.isUnit(t)&&n.alive[i]){const a=n.kind[t]===le.villager;(!a&&(n.task[t]===Me||n.task[t]===Ii)||a&&n.owner[i]===pe&&n.task[t]!==Je)&&(n.task[t]=Je,n.tgt[t]=i,n.phase[t]=0)}const r=n.players[s];r&&n.tick-r.lastAlert>300&&n.owner[i]!==s&&(r.lastAlert=n.tick,yn(n,s,"underAttack",n.x[t],n.z[t])),n.hp[t]<=0&&ku(n,t,i)}function ku(n,t,e){if(n.events.push({t:"death",x:n.x[t],z:n.z[t],kind:n.kind[t],owner:n.owner[t]}),n.isUnit(t)){const i=Pt[n.kind[t]].animal;i&&i.food>0&&n.spawnCarcass(n.kind[t],n.x[t],n.z[t],i.food)}else if(n.isBuilding(t)){const i=n.bdef(t).key,s=n.owner[e];i==="camp"&&s>=0&&s<n.players.length&&(n.players[s].res.food+=2e4,n.players[s].res.wood+=15e3,yn(n,s,"campLoot",n.x[t],n.z[t])),i==="center"&&yn(n,n.owner[t],"centerLost")}n.remove(t)}function Ou(n,t){n.cd[t]>0&&n.cd[t]--;const e=Pt[n.kind[t]],i=e.animal,s=n.map.herds[n.herd[t]];if(n.task[t]===Je){oh(n,t);return}if(i.mode==="flee"){if(n.fast[t]){(--n.tmr[t]<=0||n.state[t]===ge)&&(n.fast[t]=0,n.tmr[t]=20);return}if((n.tick+t)%3===0){let r=-1;if(n.aggro[t]>0&&n.alive[n.aggro[t]-1]&&(r=n.aggro[t]-1),r>=0){let a=n.x[t]-n.x[r],o=n.z[t]-n.z[r];const l=Qi(a*a+o*o)||1;a=Math.trunc(a*4*Ct/l),o=Math.trunc(o*4*Ct/l),n.fast[t]=1,n.tmr[t]=18,n.aggro[t]=0,n.goPoint(t,n.x[t]+a,n.z[t]+o);return}}}else if(i.mode==="fight"){if(n.aggro[t]>0){const r=n.aggro[t]-1;if(n.aggro[t]=0,n.alive[r]&&n.isUnit(r)){n.task[t]=Je,n.tgt[t]=r,n.fast[t]=1;return}}}else if((n.tick+t)%10===0){const r=Bu(n,t,e.sight+(n.season===3?3:0));if(r>=0){n.task[t]=Je,n.tgt[t]=r,n.fast[t]=1;return}}if(n.fast[t]=0,n.state[t]===ge&&s){if(n.tmr[t]>0){n.tmr[t]--;return}const r=Math.max(1,s.r)*Ct,a=n.rng.int(2*r+1)-r,o=n.rng.int(2*r+1)-r;n.goPoint(t,Math.round(s.x*Ct)+a,Math.round(s.z*Ct)+o),n.tmr[t]=50+n.rng.int(90)}}function Bu(n,t,e){let i=-1,s=1/0;return n.near(n.x[t],n.z[t],e,r=>{if(!n.isUnit(r)||n.owner[r]===pe)return;const a=n.x[r]-n.x[t],o=n.z[r]-n.z[t],l=a*a+o*o;l<s&&(s=l,i=r)}),i}function Hu(n,t){if(!n.done[t])return;const e=n.owner[t],i=n.players[e];if(!i)return;const s=n.bdef(t).key;n.queue[t].length&&Gu(n,t,i),s==="pen"&&!Xr(n)&&n.tick%10===0&&(i.res.food+=20),s==="sanctuary"&&n.tick%20===0&&n.near(n.x[t],n.z[t],6,r=>{n.isUnit(r)&&n.owner[r]===e&&n.hp[r]<Pt[n.kind[r]].hp&&n.hp[r]++})}function Gu(n,t,e){if(e.hunger)return;const i=Pt[n.queue[t][0]];if(n.work[t]===0&&n.pop(e.id)+i.pop>n.popCap(e.id)){n.tick%300===0&&yn(n,e.id,n.popCap(e.id)>=Os[e.era]?"popEra":"popHouses");return}if(n.work[t]++,n.work[t]<i.time*10)return;n.work[t]=0;const s=n.queue[t].shift(),[r,a,o]=n.footprint(t),l=n.size/2,c=n.rallyX[t]>=0?n.rallyX[t]>>8:l,h=n.rallyZ[t]>=0?n.rallyZ[t]>>8:l,u=r+o/2,f=a+o/2,p=c-u,g=h-f,_=Math.sqrt(p*p+g*g)||1,m=n.nearestFree(Math.round(u+p/_*(o/2+1)),Math.round(f+g/_*(o/2+1)));if(m<0)return;const d=n.spawnUnit(e.id,Pt[s].key,m%n.size+.5,Math.floor(m/n.size)+.5);n.rallyX[t]>=0&&n.goPoint(d,n.rallyX[t],n.rallyZ[t])}function Vu(n){if(n.tick===0||n.tick%Bn!==0)return;const t=n.month;if(t===8)for(const e of n.players)yn(n,e.id,"winterSoon");if(t>=9){for(const e of n.players){if(e.defeated)continue;const i=n.pop(e.id)*(e.era<=1?1:e.era<=3?2:3)*100;e.res.food>=i?(e.res.food-=i,e.hunger&&(e.hunger=!1)):(e.res.food=0,e.hunger||yn(n,e.id,"hunger"),e.hunger=!0)}if(t===9)for(const e of n.players)yn(n,e.id,"winter")}if(t===0){for(const i of n.players)i.hunger=!1,yn(n,i.id,"spring");for(let i=0;i<n.resKind.length;i++)if(n.resKind[i]===Ge&&n.resAmt[i]<12500){const s=n.resAmt[i];n.resAmt[i]=12500,s<=0&&n.events.push({t:"res",k:i})}const e=new Map;for(let i=0;i<n.top;i++)if(n.isAnimal(i)&&n.herd[i]>=0){const s=e.get(n.herd[i])??[];s.push(i),e.set(n.herd[i],s)}for(const[i,s]of e){if(s.length<2)continue;const r=n.map.herds[i],a=Math.min(Math.floor(s.length/2),8-s.length);for(let o=0;o<a;o++){const l=n.nearestFree(Math.floor(r.x)+o%3-1,Math.floor(r.z)+Math.floor(o/3));if(l<0)continue;const c=n.spawnUnit(pe,r.kind,l%n.size+.5,Math.floor(l/n.size)+.5);n.herd[c]=i}}}}function Wu(n){for(const t of n.players)if(t.aging){if(!n.isBuilding(t.agingB)||n.owner[t.agingB]!==t.id){t.aging=0;continue}if(!(--t.aging>0)){t.era++;for(let e=0;e<n.top;e++)if(n.isUnit(e)&&n.owner[e]===t.id){const i=Pt[n.kind[e]].next;if(!i)continue;const s=Pt[n.kind[e]],r=Pt[le[i]];n.hp[e]=Math.round(n.hp[e]*r.hp/s.hp),n.kind[e]=le[i]}for(let e=0;e<n.top;e++)n.isBuilding(e)&&n.owner[e]===t.id&&(n.queue[e]=n.queue[e].map(i=>Pt[i].next?le[Pt[i].next]:i));n.events.push({t:"age",player:t.id,era:t.era})}}}function Xu(n){if(n.outcome!=="playing")return;for(const e of n.players){if(e.defeated)continue;let i=!1;for(let s=0;s<n.top&&!i;s++)n.alive[s]&&n.owner[s]===e.id&&(n.isBuilding(s)&&n.done[s]||n.kind[s]===le.villager)&&(i=!0);if(!i){e.defeated=!0;for(const s of n.players)yn(n,s.id,"defeated."+e.id);for(let s=0;s<n.top;s++)n.isUnit(s)&&n.owner[s]===e.id&&n.remove(s)}}const t=n.players.filter(e=>!e.ai);t.length&&t.every(e=>e.defeated)?(n.outcome="defeat",n.events.push({t:"end",result:"defeat"})):n.players.filter(e=>e.ai).every(e=>e.defeated)&&n.players.some(e=>e.ai)&&(n.outcome="victory",n.events.push({t:"end",result:"victory"}))}const Rl=[13,24],qu=[3,9],$u=[24,16,11],Yu=[10,7,5],Ku=[6,12,99];function ju(n){for(const t of n.players){if(!t.ai||t.defeated)continue;const e=n.ai[t.id];n.tick<e.next||(e.next=n.tick+10,Zu(n,t.id,e))}nd(n)}function Zu(n,t,e){const i=n.players[t],s=Math.min(i.era,1),r=[],a=[],o=[];for(let v=0;v<n.top;v++)!n.alive[v]||n.owner[v]!==t||(n.isBuilding(v)?o.push(v):n.isUnit(v)&&(n.kind[v]===le.villager?r:a).push(v));const l=o.find(v=>n.bdef(v).key==="center"&&n.done[v]);if(l===void 0)return;const c=(v,w=!1)=>o.filter(C=>n.bdef(C).key===v&&(!w||n.done[C])),h=r.length+a.length,u=n.popCap(t),f=o.filter(v=>!n.done[v]),p=n.tick/Bn,g=new Set,_=(v,w,C)=>{const A=td(n,t,v,l,r.filter(P=>!g.has(P)),w,C);return A>=0&&g.add(A),A>=0},m=i.era===0&&r.length>=Rl[0]&&!i.aging;if(r.length<Rl[s]&&!n.queue[l].length&&h<u&&!i.aging&&n.issue({type:"train",player:t,building:l,key:"villager"}),u-h<=3&&u<Os[i.era]&&!f.some(v=>n.bdef(v).key==="house")&&n.tick>=e.houseCd&&_("house",5,14)&&(e.houseCd=n.tick+150),r.length>=6&&!c("depot").length){const v=ed(n,t,l,r.filter(w=>!g.has(w)));v>=0&&g.add(v)}const d=c("military");r.length>=9&&!d.length&&_("military",7,16);const x=d.filter(v=>n.done[v]);if(x.length&&!m&&a.length<qu[s]+(i.era?Math.floor(p/8):0)&&!n.queue[x[0]].length&&h<u){const v=Te[pn.military].trains[s].filter(w=>w!=="dog");n.issue({type:"train",player:t,building:x[0],key:v[n.rng.int(v.length)]})}i.era===0&&!i.aging&&r.length>=10&&n.eraBuildingTypes(t)>=2&&n.canAfford(t,es[0].cost)&&n.issue({type:"ageup",player:t,building:l}),i.era>=1&&!f.length&&(c("farm").length<Math.min(6,Math.floor(r.length/4))?_("farm",6,15):c("pen").length?!c("sanctuary").length&&p>30&&_("sanctuary",6,14):_("pen",7,16));const M=r.filter(v=>n.task[v]===Me&&n.state[v]===ge&&!g.has(v));if(M.length){const v=[0,0,0];for(const C of r)if(n.task[C]===Ie){const A=n.tgt[C],P=n.tgtTile[C]?n.map.tree[A]?Vs:n.resKind[A]===An?io:Gs:Gs;v[P===io?2:P===Vs?1:0]++}const w=i.era===0?m?[.8,.15,.05]:[.62,.3,.08]:[.5,.35,.15];i.res.wood>4e4&&(w[0]+=w[1]-.1,w[1]=.1),i.res.stone>25e3&&(w[0]+=w[2],w[2]=0);for(const C of M){const A=v[0]+v[1]+v[2]+1;let P=0,S=-1;for(let y=0;y<3;y++){const E=w[y]-v[y]/A;E>S&&(S=E,P=y)}da(n,t,C,P,l)?v[P]++:da(n,t,C,1,l)&&v[1]++}}if(i.res.wood>4e4&&(n.tick+t*7)%200===0){const v=r.find(w=>n.task[w]===Ie&&n.tgtTile[w]&&n.map.tree[n.tgt[w]]>0&&!g.has(w));v!==void 0&&n.carry[v]===0&&da(n,t,v,0,l)}if((n.tick+t)%30===0){const v=Ju(n,t,l,18);if(v>=0){const w=a.filter(C=>n.task[C]!==Ii||!0);w.length&&n.issue({type:"attack",player:t,ids:w,target:v})}}if(e.attackAt||(e.attackAt=$u[n.difficulty]*Bn),n.tick>=e.attackAt&&a.length>=5){const v=Qu(n,t,l);v>=0&&n.issue({type:"amove",player:t,ids:a.slice(0,Ku[n.difficulty]),x:n.x[v],z:n.z[v]}),e.attackAt=n.tick+Yu[n.difficulty]*Bn}}function Ju(n,t,e,i){let s=-1,r=(i*Ct)**2;return n.near(n.x[e],n.z[e],i,a=>{if(!n.isUnit(a))return;const o=n.owner[a];if(o===t||o<0)return;const l=n.x[a]-n.x[e],c=n.z[a]-n.z[e],h=l*l+c*c;h<r&&(r=h,s=a)}),s}function Qu(n,t,e){let i=-1,s=1/0;for(let r=0;r<n.top;r++)if(n.isBuilding(r)&&n.bdef(r).key==="center"&&n.owner[r]!==t&&n.owner[r]>=0&&n.owner[r]<n.players.length){const a=!n.players[n.owner[r]].ai,o=n.x[r]-n.x[e],l=n.z[r]-n.z[e],c=(o*o+l*l)*(a&&n.difficulty===2?.6:1)*(1+.02*((n.owner[r]-t+n.players.length)%n.players.length));c<s&&(s=c,i=r)}return i}function td(n,t,e,i,s,r,a){const o=Te[pn[e]];if(!n.canAfford(t,o.cost)||!s.length)return-1;const l=n.x[i]>>8,c=n.z[i]>>8;for(const[h,u]of Ws){const f=h*h+u*u;if(f<r*r)continue;if(f>a*a)break;const p=l+h-(o.size>>1),g=c+u-(o.size>>1);if(!n.canPlace(t,e,p,g)||!ch(n,p,g,o.size))continue;const _=s.find(m=>n.task[m]!==Vn&&(n.carryRes[m]===Vs||n.task[m]===Me))??s.find(m=>n.task[m]!==Vn)??s[0];return n.issue({type:"build",player:t,ids:[_],key:e,tx:p,tz:g}),_}return-1}function ch(n,t,e,i){for(let s=e-1;s<=e+i;s++)for(let r=t-1;r<=t+i;r++){const a=s*n.size+r;if(n.bAt[a])return!1}return!0}function ed(n,t,e,i){const s=Te[pn.depot];if(!n.canAfford(t,s.cost)||!i.length)return-1;const r=n.x[e]>>8,a=n.z[e]>>8,o=n.size;for(const[l,c]of Ws){const h=r+l,u=a+c;if(!(l*l+c*c<36)&&!(h<2||u<2||h>=o-3||u>=o-3)&&n.map.tree[u*o+h])for(const[f,p]of[[2,0],[-3,0],[0,2],[0,-3],[2,2],[-3,-3],[2,-3],[-3,2]]){const g=h+f,_=u+p;if(n.canPlace(t,"depot",g,_)&&ch(n,g,_,2)){const m=i.find(d=>n.task[d]!==Vn)??i[0];return n.issue({type:"build",player:t,ids:[m],key:"depot",tx:g,tz:_}),m}}}return-1}function da(n,t,e,i,s){const r=n.size,a=n.x[s]>>8,o=n.z[s]>>8;if(i===0){for(let d=0;d<n.top;d++)if(n.isBuilding(d)&&n.owner[d]===t&&n.done[d]&&n.bdef(d).key==="farm"){let x=!1;for(let M=0;M<n.top;M++)if(n.isUnit(M)&&n.task[M]===Ie&&n.tgt[M]===d&&!n.tgtTile[M]){x=!0;break}if(!x)return n.issue({type:"work",player:t,ids:[e],target:d}),!0}let f=0;for(let d=0;d<n.top;d++)n.isUnit(d)&&n.owner[d]===t&&n.task[d]===Ie&&n.tgtTile[d]&&n.resKind[n.tgt[d]]===Ge&&f++;if(n.season!==3&&f<5)for(const[d,x]of Ws){if(d*d+x*x>196)break;const M=a+d,w=(o+x)*r+M;if(w>=0&&w<r*r&&n.resKind[w]===Ge&&n.resAmt[w]>0)return n.issue({type:"gather",player:t,ids:[e],k:w}),!0}let p=-1,g=(25*Ct)**2;for(let d=0;d<n.top;d++)if(n.alive[d]&&n.kind[d]===Jt&&n.work[d]>0){let x=0;for(let C=0;C<n.top;C++)n.isUnit(C)&&n.task[C]===Ie&&n.tgt[C]===d&&!n.tgtTile[C]&&x++;const M=n.x[d]-n.x[s],v=n.z[d]-n.z[s],w=M*M+v*v;x<4&&w<g&&(g=w,p=d)}if(p>=0)return n.issue({type:"work",player:t,ids:[e],target:p}),!0;let _=-1,m=(28*Ct)**2;for(let d=0;d<n.top;d++)if(n.isAnimal(d)&&Pt[n.kind[d]].animal.food>0&&Pt[n.kind[d]].key!=="aurochs"){const x=n.x[d]-n.x[s],M=n.z[d]-n.z[s],v=x*x+M*M;v<m&&(m=v,_=d)}return _>=0?(n.issue({type:"attack",player:t,ids:[e],target:_}),!0):!1}let l=a,c=o;if(i===1){for(let f=0;f<n.top;f++)if(n.isBuilding(f)&&n.owner[f]===t&&n.bdef(f).key==="depot"){l=n.x[f]>>8,c=n.z[f]>>8;break}}for(const[f,p]of Ws){const g=l+f,_=c+p;if(g<0||_<0||g>=r||_>=r)continue;const m=_*r+g;if((i===1?n.map.tree[m]>0:n.resKind[m]===An)&&n.open(m))return n.issue({type:"gather",player:t,ids:[e],k:m}),!0}let h=-1,u=1/0;for(let f=0;f<r*r;f+=3)if((i===1?n.map.tree[f]>0:n.resKind[f]===An)&&n.open(f)){const p=f%r,g=(f-p)/r,_=(p-l)**2+(g-c)**2;_<u&&(u=_,h=f)}return h>=0?(n.issue({type:"gather",player:t,ids:[e],k:h}),!0):!1}function nd(n){if(n.tick+300===n.barbNext&&!n.barbWarned){n.barbWarned=!0;for(let i=0;i<n.top;i++)if(n.isBuilding(i)&&n.owner[i]===ii){const s=wl(n,i);s>=0&&n.events.push({t:"msg",player:n.owner[s],key:"raidSoon",x:n.x[i],z:n.z[i]})}}if(n.tick!==n.barbNext)return;n.barbWarned=!1;const t=n.tick/Bn,e=Math.min(5,2+Math.floor(t/15));for(let i=0;i<n.top;i++){if(!n.isBuilding(i)||n.owner[i]!==ii)continue;const s=wl(n,i);if(s<0)continue;const r=[];for(let a=0;a<e;a++){const o=n.nearestFree((n.x[i]>>8)+a%3-1,(n.z[i]>>8)+3+Math.floor(a/3));o<0||r.push(n.spawnUnit(ii,"barbarian",o%n.size+.5,Math.floor(o/n.size)+.5))}for(const a of r)n.task[a]=Ii,n.amx[a]=n.x[s],n.amz[a]=n.z[s],n.rallyX[a]=n.x[s],n.rallyZ[a]=n.z[s];n.orderMove(r,n.x[s],n.z[s])}n.barbNext=n.tick+(8+n.rng.int(5))*Bn}function wl(n,t){let e=-1,i=1/0;for(let s=0;s<n.top;s++)if(n.isBuilding(s)&&n.bdef(s).key==="center"&&n.owner[s]>=0&&n.owner[s]<n.players.length&&!n.players[n.owner[s]].defeated){const r=n.x[s]-n.x[t],a=n.z[s]-n.z[t],o=r*r+a*a;o<i&&(i=o,e=s)}return e}const Nt=4096,ge=0,Ze=1,Me=0,Ie=1,Vn=2,Je=3,Ii=4,En=0,hh=1,Qr=2,Gs=0,Vs=1,io=2,id=3,ir=[1,-1,0,0,1,1,-1,-1],sr=[0,0,1,-1,1,-1,1,-1],Pl=[10,10,10,10,14,14,14,14],sd=4294967295;class rd{constructor(t,e){I(this,"dist");this.goal=t,this.dist=new Uint32Array(e).fill(sd)}}const ss=[];for(let n=-14;n<=14;n++)for(let t=-14;t<=14;t++)t*t+n*n<=196&&ss.push([t,n]);ss.sort((n,t)=>n[0]*n[0]+n[1]*n[1]-(t[0]*t[0]+t[1]*t[1])||n[1]-t[1]||n[0]-t[0]);const Ws=ss,Il=new Map;function ad(n){let t=Il.get(n);if(t)return t;const e=[];for(let i=-n;i<=n;i++)for(let s=-n;s<=n;s++)s*s+i*i<=n*n+n&&e.push(s,i);return t=new Int16Array(e),Il.set(n,t),t}class uh{constructor(t,e,i={}){I(this,"map");I(this,"size");I(this,"rng");I(this,"tick",0);I(this,"difficulty",1);I(this,"players",[]);I(this,"alive",new Uint8Array(Nt));I(this,"kind",new Uint8Array(Nt));I(this,"owner",new Int8Array(Nt));I(this,"x",new Int32Array(Nt));I(this,"z",new Int32Array(Nt));I(this,"px",new Int32Array(Nt));I(this,"pz",new Int32Array(Nt));I(this,"hp",new Int16Array(Nt));I(this,"state",new Uint8Array(Nt));I(this,"stuck",new Uint8Array(Nt));I(this,"best",new Int32Array(Nt));I(this,"slotX",new Int32Array(Nt));I(this,"slotZ",new Int32Array(Nt));I(this,"task",new Uint8Array(Nt));I(this,"tgt",new Int32Array(Nt));I(this,"tgtTile",new Uint8Array(Nt));I(this,"phase",new Uint8Array(Nt));I(this,"carry",new Int16Array(Nt));I(this,"carryRes",new Uint8Array(Nt));I(this,"cd",new Uint16Array(Nt));I(this,"work",new Int32Array(Nt));I(this,"done",new Uint8Array(Nt));I(this,"sub",new Uint8Array(Nt));I(this,"aggro",new Int32Array(Nt));I(this,"tmr",new Int16Array(Nt));I(this,"herd",new Int16Array(Nt));I(this,"fast",new Uint8Array(Nt));I(this,"amx",new Int32Array(Nt));I(this,"amz",new Int32Array(Nt));I(this,"fails",new Uint8Array(Nt));I(this,"frac",new Int32Array(Nt));I(this,"rallyX",new Int32Array(Nt));I(this,"rallyZ",new Int32Array(Nt));I(this,"dropB",new Int32Array(Nt));I(this,"ignoreT",new Int32Array(Nt).fill(-1));I(this,"ignoreUntil",new Int32Array(Nt));I(this,"queue",Array.from({length:Nt},()=>[]));I(this,"field",new Array(Nt).fill(null));I(this,"path",new Array(Nt).fill(null));I(this,"pathI",new Uint16Array(Nt));I(this,"top",0);I(this,"blocked");I(this,"bAt");I(this,"resKind");I(this,"resAmt");I(this,"vis",[]);I(this,"explored",[]);I(this,"projectiles",[]);I(this,"events",[]);I(this,"ai",[]);I(this,"barbNext",0);I(this,"barbWarned",!1);I(this,"outcome","playing");I(this,"pending",[]);I(this,"seq",0);I(this,"hashHead");I(this,"hashNext",new Int32Array(Nt));I(this,"hs");I(this,"pushX",new Int32Array(Nt));I(this,"pushZ",new Int32Array(Nt));I(this,"aStamp");I(this,"aG");I(this,"aFrom");I(this,"aClosed");I(this,"aId",0);I(this,"aHeap");I(this,"lastPartial",!1);I(this,"flowCache",new Map);I(this,"nodesTick",0);I(this,"overBudget",!1);this.map=sh(t,e),this.size=this.map.size,this.rng=new th(t),this.difficulty=i.difficulty??1;const s=this.size*this.size;this.blocked=new Uint8Array(s),this.bAt=new Int16Array(s),this.resKind=new Uint8Array(s),this.resAmt=new Int32Array(s);for(let a=0;a<s;a++){const o=this.map.terrain[a];(o===Ci||o===Ri||this.map.tree[a])&&(this.blocked[a]=1),this.map.tree[a]&&(this.resAmt[a]=this.map.wood[a]*100)}for(const a of this.map.res){const o=a.z*this.size+a.x;this.resKind[o]=a.kind,this.resAmt[o]=a.amount*100,this.blocked[o]=1}this.hs=this.size>>1,this.hashHead=new Int32Array(this.hs*this.hs),this.aStamp=new Int32Array(s),this.aG=new Int32Array(s),this.aFrom=new Int32Array(s),this.aClosed=new Int32Array(s),this.aHeap=new Float64Array(s*2);const r=i.humans??1;this.map.starts.forEach((a,o)=>{this.players.push({id:o,color:yu[o],start:{x:a.x,z:a.z},ai:o>=r,era:0,res:{food:2e4,wood:15e3,stone:5e3,metal:0,coins:0},aging:0,agingB:-1,hunger:!1,defeated:!1,lastAlert:-9999}),this.vis.push(new Uint8Array(s)),this.explored.push(new Uint8Array(s)),this.spawnBuilding(o,"center",a.x-2,a.z-2,!0);for(let l=0;l<4;l++)this.spawnUnit(o,"villager",a.x-a.ux*4+(l-1.5)*1.1,a.z-a.uz*4+l%2*.8);this.spawnUnit(o,"dog",a.x-a.ux*3-a.uz*3,a.z-a.uz*3+a.ux*3),this.ai.push({next:20+o*3,attackAt:0,phase:0,houseCd:0})}),this.map.herds.forEach((a,o)=>{for(const[l,c]of a.spots){const h=this.spawnUnit(pe,a.kind,l+.5,c+.5);this.herd[h]=o,this.tmr[h]=h*7%60}});for(const a of this.map.camps)this.spawnBuilding(ii,"camp",a.x-2,a.z-2,!0);if(this.barbNext=12*Bn,i.testUnits){const a=this.map.starts[0];let o=0;for(let l=0;l<40&&o<i.testUnits;l++)for(let c=0;c<20&&o<i.testUnits;c++){const h=a.x-a.ux*9+(c-10)*.9,u=a.z-a.uz*9-l*.9*(a.uz>=0?1:-1);this.blockedAt(Math.round(h*Ct),Math.round(u*Ct))||(this.spawnUnit(0,"warrior",h,u),o++)}}this.updateFog()}open(t){const e=this.size,i=t%e,s=(t-i)/e;for(let r=0;r<8;r++){const a=i+ir[r],o=s+sr[r];if(a>=0&&o>=0&&a<e&&o<e&&!this.blocked[o*e+a])return!0}return!1}udef(t){return Pt[this.kind[t]]}bdef(t){return Te[this.kind[t]-se]}isUnit(t){return this.alive[t]===1&&this.kind[t]<Jt}isBuilding(t){return this.alive[t]===1&&this.kind[t]>=se}isAnimal(t){return this.isUnit(t)&&this.owner[t]===pe}hostile(t,e){return!(t===e||t===pe||e===pe)}alloc(){for(let t=0;t<Nt;t++)if(!this.alive[t])return t>=this.top&&(this.top=t+1),t;throw new Error("entidades esgotadas")}reset(t){this.state[t]=ge,this.task[t]=Me,this.tgt[t]=-1,this.tgtTile[t]=0,this.phase[t]=0,this.carry[t]=0,this.cd[t]=0,this.work[t]=0,this.done[t]=0,this.sub[t]=0,this.aggro[t]=0,this.tmr[t]=0,this.herd[t]=-1,this.fast[t]=0,this.fails[t]=0,this.frac[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[],this.rallyX[t]=-1,this.rallyZ[t]=-1,this.stuck[t]=0,this.dropB[t]=-1,this.ignoreT[t]=-1}spawnUnit(t,e,i,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=le[e],this.owner[r]=t,this.x[r]=this.px[r]=Math.round(i*Ct),this.z[r]=this.pz[r]=Math.round(s*Ct),this.hp[r]=Pt[le[e]].hp,r}spawnCarcass(t,e,i,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=Jt,this.owner[r]=pe,this.sub[r]=t,this.x[r]=this.px[r]=e,this.z[r]=this.pz[r]=i,this.work[r]=s*100,this.hp[r]=1,r}spawnBuilding(t,e,i,s,r){const a=this.alloc();this.reset(a);const o=Te[pn[e]];this.alive[a]=1,this.kind[a]=se+pn[e],this.owner[a]=t,this.x[a]=this.px[a]=i*Ct+o.size*128,this.z[a]=this.pz[a]=s*Ct+o.size*128,this.done[a]=r?1:0,this.hp[a]=r?o.hp:Math.max(1,o.hp/10|0);for(let l=0;l<o.size;l++)for(let c=0;c<o.size;c++){const h=(s+l)*this.size+i+c;this.bAt[h]=a+1,o.walk||(this.blocked[h]=1)}return this.events.push({t:"placed",e:a}),a}footprint(t){const e=this.bdef(t).size;return[(this.x[t]>>8)-(e>>1),(this.z[t]>>8)-(e>>1),e]}remove(t){if(this.kind[t]>=se){const[e,i,s]=this.footprint(t),r=this.bdef(t).walk;for(let a=0;a<s;a++)for(let o=0;o<s;o++){const l=(i+a)*this.size+e+o;this.bAt[l]=0,r||(this.blocked[l]=0)}this.events.push({t:"gone",e:t})}this.alive[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[]}blockedAt(t,e){const i=t>>8,s=e>>8;return i<0||s<0||i>=this.size||s>=this.size?!0:this.blocked[s*this.size+i]===1}canPlace(t,e,i,s){const r=Te[pn[e]],a=this.size;if(i<1||s<1||i+r.size>=a-1||s+r.size>=a-1)return!1;for(let o=0;o<r.size;o++)for(let l=0;l<r.size;l++){const c=(s+o)*a+i+l,h=this.map.terrain[c];if(this.blocked[c]||this.bAt[c]||h===Ci||h===Bs||h===Ri||!this.explored[t][c])return!1}for(let o=0;o<this.top;o++)if(this.isUnit(o)){const l=this.x[o]>>8,c=this.z[o]>>8;if(l>=i&&l<i+r.size&&c>=s&&c<s+r.size&&this.state[o]===ge&&this.owner[o]!==t)return!1}return!0}canAfford(t,e){const i=this.players[t].res;return ts.every(s=>i[s]>=(e[s]??0)*100)}pay(t,e){const i=this.players[t].res;for(const s of ts)i[s]-=(e[s]??0)*100}refund(t,e){const i=this.players[t].res;for(const s of ts)i[s]+=(e[s]??0)*100}pop(t){let e=0;for(let i=0;i<this.top;i++)this.isUnit(i)&&this.owner[i]===t&&(e+=this.udef(i).pop);return e}popCap(t){const e=this.players[t].era;let i=0;for(let s=0;s<this.top;s++)if(this.isBuilding(s)&&this.owner[s]===t&&this.done[s]){const r=this.bdef(s).pop;r&&(i+=r[e])}return Math.min(Os[e],i)}eraBuildingTypes(t){const e=this.players[t].era,i=new Set;for(let s=0;s<this.top;s++)this.isBuilding(s)&&this.owner[s]===t&&this.done[s]&&this.bdef(s).buildable&&this.bdef(s).era===e&&i.add(this.bdef(s).key);return i.size}reach(t,e,i){let s,r,a,o;if(i){const h=e%this.size,u=(e-h)/this.size;s=h*Ct,r=u*Ct,a=s+Ct,o=r+Ct}else if(this.kind[e]>=se){const[h,u,f]=this.footprint(e);s=h*Ct,r=u*Ct,a=s+f*Ct,o=r+f*Ct}else{const h=this.x[e]-this.x[t],u=this.z[e]-this.z[t];return Math.max(0,Qi(h*h+u*u)-(this.kind[e]<Jt?Math.round(Pt[this.kind[e]].radius*Ct):64))}const l=Math.max(s-this.x[t],0,this.x[t]-a),c=Math.max(r-this.z[t],0,this.z[t]-o);return Qi(l*l+c*c)}nearestFree(t,e){for(const[i,s]of ss){const r=t+i,a=e+s;if(r>=0&&a>=0&&r<this.size&&a<this.size&&!this.blocked[a*this.size+r])return a*this.size+r}return-1}findPath(t,e,i,s,r,a=16e3){const o=this.size,l=this.blocked,c=++this.aId,h=this.aG,u=this.aFrom,f=this.aStamp,p=this.aClosed,g=this.aHeap;this.lastPartial=!1;const _=(U,L)=>{const F=Math.max(e-U,0,U-s),z=Math.max(i-L,0,L-r);return 15*Math.max(F,z)+6*Math.min(F,z)},m=t%o,d=(t-m)/o;if(m>=e&&m<=s&&d>=i&&d<=r)return[];let x=0;const M=U=>{let L=x++;for(g[L]=U;L>0;){const F=L-1>>1;if(g[F]<=g[L])break;const z=g[F];g[F]=g[L],g[L]=z,L=F}},v=()=>{const U=g[0];g[0]=g[--x];let L=0;for(;;){const F=L*2+1,z=F+1;let q=L;if(F<x&&g[F]<g[q]&&(q=F),z<x&&g[z]<g[q]&&(q=z),q===L)break;const N=g[q];g[q]=g[L],g[L]=N,L=q}return U};f[t]=c,h[t]=0,u[t]=-1,M(_(m,d)*65536+t);let w=t,C=_(m,d),A=-1,P=0;if(this.nodesTick>6e4)return this.overBudget=!0,this.lastPartial=!0,null;for(;x>0&&P<a;){const U=v(),L=U%65536;if(p[L]===c)continue;p[L]=c,P++;const F=L%o,z=(L-F)/o,q=_(F,z);if(q===0){A=L;break}q<C&&(C=q,w=L);for(let N=0;N<8;N++){const O=F+ir[N],W=z+sr[N];if(O<0||W<0||O>=o||W>=o)continue;const $=W*o+O;if(l[$]||p[$]===c||N>=4&&(l[z*o+O]||l[W*o+F]))continue;const Q=h[L]+Pl[N];(f[$]!==c||Q<h[$])&&(f[$]=c,h[$]=Q,u[$]=L,M((Q+_(O,W))*65536+$))}}this.lastPartial=A<0,this.nodesTick+=P;const S=A>=0?A:w;if(S===t)return A>=0?[]:null;const y=[];for(let U=S;U!==t&&U>=0;U=u[U])y.push(U);y.reverse();const E=[];let D=t;for(let U=0;U<y.length;){let L=Math.min(y.length-1,U+12);for(;L>U&&!this.clear(D,y[L]);)L--;E.push(y[L]),D=y[L],U=L+1}return E}clear(t,e){const i=this.size;let s=t%i,r=(t-s)/i;const a=e%i,o=(e-a)/i,l=Math.abs(a-s),c=Math.abs(o-r),h=s<a?1:-1,u=r<o?1:-1;let f=l-c;for(let p=0;p<64;p++){if(this.blocked[r*i+s])return!1;if(s===a&&r===o)return!0;const g=2*f;if(g>-c&&g<l&&(this.blocked[r*i+s+h]||this.blocked[(r+u)*i+s]))return!1;g>-c&&(f-=c,s+=h),g<l&&(f+=l,r+=u)}return!1}goTo(t,e,i,s,r,a,o,l=16e3){const c=(this.z[t]>>8)*this.size+(this.x[t]>>8),h=this.size;let u=!1;for(let m=Math.max(0,i);m<=Math.min(h-1,r)&&!u;m++)for(let d=Math.max(0,e);d<=Math.min(h-1,s);d++)if(!this.blocked[m*h+d]){u=!0;break}if(!u)return this.lastPartial=!0,this.state[t]=ge,!1;const f=this.findPath(c,e,i,s,r,l);if(this.field[t]=null,!f)return this.state[t]=ge,!1;this.path[t]=f,this.pathI[t]=0;const p=f.length?f[f.length-1]:c,g=p%this.size,_=(p-g)/this.size;return this.slotX[t]=a??g*Ct+128,this.slotZ[t]=o??_*Ct+128,this.state[t]=Ze,this.stuck[t]=0,this.best[t]=2147483647,!0}flowTo(t){const e=this.flowCache.get(t);if(e&&this.tick-e.t<600)return e.f;const i=this.buildFlow(t,[]);if(this.flowCache.set(t,{f:i,t:this.tick}),this.flowCache.size>12){let s=-1,r=1/0;for(const[a,o]of this.flowCache)o.t<r&&(r=o.t,s=a);this.flowCache.delete(s)}return i}goFar(t,e,i){const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,i>>8)));return s<0?!1:(this.field[t]=this.flowTo(s),this.path[t]=null,this.lastPartial=!1,this.slotX[t]=s%this.size*Ct+128,this.slotZ[t]=Math.floor(s/this.size)*Ct+128,this.state[t]=Ze,this.stuck[t]=0,this.best[t]=2147483647,!0)}far(t,e,i){const s=e-this.x[t],r=i-this.z[t];return s*s+r*r>(22*Ct)**2}goNear(t,e,i){if(!i&&this.far(t,this.x[e],this.z[e]))return this.goFar(t,this.x[e],this.z[e]);if(i){const a=e%this.size,o=(e-a)/this.size;return this.goTo(t,a-1,o-1,a+1,o+1,void 0,void 0,6e3)}if(this.kind[e]>=se){const[a,o,l]=this.footprint(e);if(this.bdef(e).walk){const c=l>>1;return this.goTo(t,a+c,o+c,a+c,o+c,this.x[e],this.z[e],8e3)}return this.goTo(t,a-1,o-1,a+l,o+l,void 0,void 0,8e3)}const s=this.x[e]>>8,r=this.z[e]>>8;return this.goTo(t,s-1,r-1,s+1,r+1,this.x[e],this.z[e],3e3)}goPoint(t,e,i){if(this.far(t,e,i)){this.goFar(t,e,i);return}const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,i>>8)));if(s<0)return;const r=s%this.size,a=(s-r)/this.size,o=!this.blocked[(i>>8)*this.size+(e>>8)];this.goTo(t,r,a,r,a,o?e:r*Ct+128,o?i:a*Ct+128)}issue(t){this.pending.push({...t,..."ids"in t?{ids:t.ids.slice()}:{},at:this.tick+1,seq:this.seq++})}own(t){return t.ids.filter(e=>this.isUnit(e)&&this.owner[e]===t.player)}apply(t){const e=this.players[t.player];if(!(!e||e.defeated))switch(t.type){case"move":case"amove":{const i=this.own(t);for(const s of i)this.task[s]=t.type==="amove"?Ii:Me,this.amx[s]=t.x,this.amz[s]=t.z,this.rallyX[s]=t.type==="amove"?t.x:-1,this.rallyZ[s]=t.type==="amove"?t.z:-1,this.tgt[s]=-1,this.aggro[s]=0,this.fails[s]=0;this.orderMove(i,t.x,t.z);break}case"stop":for(const i of this.own(t))this.task[i]=Me,this.state[i]=ge,this.path[i]=null,this.field[i]=null;break;case"gather":{if(t.k<0||t.k>=this.size*this.size||!this.map.tree[t.k]&&!this.resKind[t.k])return;for(const i of this.own(t))this.kind[i]===le.villager&&(this.task[i]=Ie,this.tgt[i]=t.k,this.tgtTile[i]=1,this.phase[i]=En,this.fails[i]=0,this.goNear(i,t.k,!0));break}case"work":case"attack":{const i=t.target;if(!this.alive[i])return;for(const s of this.own(t)){const r=this.kind[s]===le.villager;if(this.kind[i]>=se&&this.owner[i]===t.player){if(!r)continue;this.done[i]?this.bdef(i).key==="farm"?(this.task[s]=Ie,this.tgt[s]=i,this.tgtTile[s]=0,this.phase[s]=En,this.goNear(s,i,!1)):this.bdef(i).drop&&this.carry[s]>0&&(this.task[s]=Ie,this.phase[s]=Qr,this.tgt[s]=-1,this.goNear(s,i,!1)):(this.task[s]=Vn,this.tgt[s]=i,this.tgtTile[s]=0,this.goNear(s,i,!1));continue}if(this.kind[i]===Jt){r&&(this.task[s]=Ie,this.tgt[s]=i,this.tgtTile[s]=0,this.phase[s]=En,this.goNear(s,i,!1));continue}(this.owner[i]===pe||this.hostile(t.player,this.owner[i]))&&(this.task[s]=Je,this.tgt[s]=i,this.tgtTile[s]=0,this.goNear(s,i,!1))}break}case"build":{const i=this.own(t).filter(a=>this.kind[a]===le.villager),s=Te[pn[t.key]];if(!i.length||!s?.buildable||s.era>e.era||!this.canAfford(t.player,s.cost)||!this.canPlace(t.player,t.key,t.tx,t.tz))return;this.pay(t.player,s.cost);const r=this.spawnBuilding(t.player,t.key,t.tx,t.tz,!1);for(const a of i)this.task[a]=Vn,this.tgt[a]=r,this.tgtTile[a]=0,this.goNear(a,r,!1);break}case"train":{const i=t.building;if(!this.isBuilding(i)||this.owner[i]!==t.player||!this.done[i]||!(this.bdef(i).trains?.[Math.min(e.era,1)]??[]).includes(t.key)||this.queue[i].length>=5)return;const r=Pt[le[t.key]];if(!this.canAfford(t.player,r.cost))return;this.pay(t.player,r.cost),this.queue[i].push(le[t.key]);break}case"cancel":{const i=t.building;if(!this.isBuilding(i)||this.owner[i]!==t.player||!this.queue[i].length)return;const s=this.queue[i].pop();this.refund(t.player,Pt[s].cost),this.queue[i].length||(this.work[i]=0);break}case"ageup":{const i=t.building,s=es[e.era];if(!s||e.era>=1||e.aging||!this.isBuilding(i)||this.owner[i]!==t.player||this.bdef(i).key!=="center"||this.eraBuildingTypes(t.player)<2||!this.canAfford(t.player,s.cost))return;this.pay(t.player,s.cost),e.aging=s.time*10,e.agingB=i;break}case"rally":this.isBuilding(t.building)&&this.owner[t.building]===t.player&&(this.rallyX[t.building]=t.x,this.rallyZ[t.building]=t.z);break}}orderMove(t,e,i){if(!t.length)return;const s=this.size,r=this.nearestFree(Math.min(s-1,Math.max(0,e>>8)),Math.min(s-1,Math.max(0,i>>8)));if(r<0)return;if(t.length===1){this.goPoint(t[0],e,i);return}const a=this.blocked[(i>>8)*s+(e>>8)],o=a?r%s*Ct+128:e,l=a?Math.floor(r/s)*Ct+128:i;t.sort((u,f)=>{const p=(this.x[u]-o)**2+(this.z[u]-l)**2,g=(this.x[f]-o)**2+(this.z[f]-l)**2;return p-g||u-f});const c=this.buildFlow(r,t);let h=0;for(const u of t){let f=o,p=l;for(;h<ss.length;){const[g,_]=ss[h++],m=o+g*218,d=l+_*218;if(!this.blockedAt(m,d)){f=m,p=d;break}}this.slotX[u]=f,this.slotZ[u]=p,this.state[u]=Ze,this.field[u]=c,this.path[u]=null,this.stuck[u]=0,this.best[u]=2147483647}}buildFlow(t,e){const i=this.size,s=i*i,r=new rd(t,s),a=r.dist,o=this.blocked,l=new Set;for(const g of e)l.add((this.z[g]>>8)*i+(this.x[g]>>8));const c=this.aHeap;let h=0;const u=g=>{let _=h++;for(c[_]=g;_>0;){const m=_-1>>1;if(c[m]<=c[_])break;const d=c[m];c[m]=c[_],c[_]=d,_=m}},f=()=>{const g=c[0];c[0]=c[--h];let _=0;for(;;){const m=_*2+1,d=m+1;let x=_;if(m<h&&c[m]<c[x]&&(x=m),d<h&&c[d]<c[x]&&(x=d),x===_)break;const M=c[x];c[x]=c[_],c[_]=M,_=x}return g};a[t]=0,u(t);let p=e.length?l.size:-1;for(;h>0;){const g=f(),_=g%65536,m=(g-_)/65536;if(m>a[_])continue;if(p>0&&l.has(_)&&(l.delete(_),--p<=0&&m>400))break;const d=_%i,x=(_-d)/i;for(let M=0;M<8;M++){const v=d+ir[M],w=x+sr[M];if(v<0||w<0||v>=i||w>=i)continue;const C=w*i+v;if(o[C]||M>=4&&(o[x*i+v]||o[w*i+d]))continue;const A=m+Pl[M];A<a[C]&&(a[C]=A,u(A*65536+C))}}return r}step(){if(this.outcome!=="playing"&&this.players.every(t=>!t.ai||t.defeated),this.px.set(this.x),this.pz.set(this.z),this.nodesTick=0,this.overBudget=!1,this.pending.length){const t=this.pending.filter(e=>e.at<=this.tick).sort((e,i)=>e.seq-i.seq);this.pending=this.pending.filter(e=>e.at>this.tick);for(const e of t)this.apply(e)}this.buildHash(),ju(this),Tu(this),this.moveUnits(),this.separate(),this.tick%2===0&&this.updateFog(),this.tick++}speedOf(t){const e=Pt[this.kind[t]];return Math.round((this.fast[t]&&e.animal?e.animal.run:e.speed)*Ct/10)}moveUnits(){const t=this.size;for(let e=0;e<this.top;e++){if(!this.alive[e]||this.state[e]!==Ze||this.kind[e]>=Jt)continue;const i=this.x[e],s=this.z[e],r=this.speedOf(e);let a=this.slotX[e],o=this.slotZ[e];const l=this.path[e];if(l&&this.pathI[e]<l.length){const v=l[this.pathI[e]],w=v%t*Ct+128,C=Math.floor(v/t)*Ct+128;Math.abs(w-i)+Math.abs(C-s)<110&&this.pathI[e]<l.length-1&&this.pathI[e]++,(this.pathI[e]<l.length-1||Math.abs(w-i)+Math.abs(C-s)>=110)&&(a=w,o=C),this.pathI[e]===l.length-1&&Math.abs(w-i)+Math.abs(C-s)<110&&(this.path[e]=null,a=this.slotX[e],o=this.slotZ[e])}const c=this.slotX[e]-i,h=this.slotZ[e]-s,u=c*c+h*h;if(!this.path[e]&&u<=r*r){this.x[e]=this.slotX[e],this.z[e]=this.slotZ[e],this.state[e]=ge,this.field[e]=null;continue}const f=this.field[e];if(f&&!this.path[e]&&u>640*640){const v=i>>8,w=s>>8,C=w*t+v;let A=f.dist[C],P=-1,S=-1;for(let y=0;y<8;y++){const E=v+ir[y],D=w+sr[y];if(E<0||D<0||E>=t||D>=t)continue;const U=D*t+E;this.blocked[U]||y>=4&&(this.blocked[w*t+E]||this.blocked[D*t+v])||f.dist[U]<A&&(A=f.dist[U],P=E,S=D)}P>=0&&(a=P*Ct+128,o=S*Ct+128)}const p=a-i,g=o-s,_=Qi(p*p+g*g);if(_===0){this.state[e]=ge;continue}const m=Math.min(r,_);let d=i+qn(p*m,_),x=s+qn(g*m,_);this.blockedAt(d,x)&&(this.blockedAt(d,s)?this.blockedAt(i,x)?(d=i,x=s):d=i:x=s),this.x[e]=d,this.z[e]=x;const M=Math.abs(c)+Math.abs(h);M+24<this.best[e]?(this.best[e]=M,this.stuck[e]=0):this.stuck[e]=Math.min(255,this.stuck[e]+1),(this.stuck[e]>30||this.stuck[e]>10&&M<3*Ct&&!this.path[e])&&(this.state[e]=ge,this.field[e]=null,this.path[e]=null)}}buildHash(){const t=this.hs,e=this.hashHead,i=this.hashNext;e.fill(-1);for(let s=0;s<this.top;s++){if(!this.alive[s]||this.kind[s]>=Jt)continue;const r=Math.min(t-1,Math.max(0,this.z[s]>>9))*t+Math.min(t-1,Math.max(0,this.x[s]>>9));i[s]=e[r],e[r]=s}}near(t,e,i,s){const r=this.hs,a=Math.max(0,(t>>9)-Math.ceil(i/2)),o=Math.min(r-1,(t>>9)+Math.ceil(i/2)),l=Math.max(0,(e>>9)-Math.ceil(i/2)),c=Math.min(r-1,(e>>9)+Math.ceil(i/2)),h=i*Ct*(i*Ct);for(let u=l;u<=c;u++)for(let f=a;f<=o;f++)for(let p=this.hashHead[u*r+f];p!==-1;p=this.hashNext[p]){const g=this.x[p]-t,_=this.z[p]-e;g*g+_*_<=h&&this.alive[p]&&s(p)}}separate(){const t=this.hs,e=this.hashHead,i=this.hashNext;this.buildHash();for(let s=0;s<this.top;s++)this.pushX[s]=0,this.pushZ[s]=0;for(let s=0;s<this.top;s++){if(!this.isUnit(s))continue;const r=Math.round(Pt[this.kind[s]].radius*Ct),a=this.x[s]>>9,o=this.z[s]>>9;for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++){const h=a+c,u=o+l;if(!(h<0||u<0||h>=t||u>=t))for(let f=e[u*t+h];f!==-1;f=i[f]){if(f<=s||!this.isUnit(f))continue;const p=Math.round(Pt[this.kind[f]].radius*Ct),g=r+p;let _=this.x[f]-this.x[s],m=this.z[f]-this.z[s];if(_>=g||_<=-g||m>=g||m<=-g)continue;let d=_*_+m*m;if(d>=g*g)continue;d===0&&(_=1+s%3,m=1+f%3,d=_*_+m*m);const x=Qi(d)||1,M=g-x>>1,v=qn(_*M,x),w=qn(m*M,x),C=this.state[s]===Ze?1:2,A=this.state[f]===Ze?1:2;this.pushX[s]-=qn(v*C,2),this.pushZ[s]-=qn(w*C,2),this.pushX[f]+=qn(v*A,2),this.pushZ[f]+=qn(w*A,2)}}}for(let s=0;s<this.top;s++){if(!this.pushX[s]&&!this.pushZ[s])continue;const r=this.x[s]+this.pushX[s],a=this.z[s]+this.pushZ[s];this.blockedAt(r,a)?this.blockedAt(r,this.z[s])?this.blockedAt(this.x[s],a)||(this.z[s]=a):this.x[s]=r:(this.x[s]=r,this.z[s]=a)}}updateFog(){const t=this.size;for(let e=0;e<this.players.length;e++){const i=this.vis[e],s=this.explored[e];i.fill(0);for(let r=0;r<this.top;r++){if(!this.alive[r]||this.owner[r]!==e||this.kind[r]===Jt)continue;const a=this.kind[r]>=se?this.bdef(r).sight:Pt[this.kind[r]].sight,o=ad(a),l=this.x[r]>>8,c=this.z[r]>>8;for(let h=0;h<o.length;h+=2){const u=l+o[h],f=c+o[h+1];if(u<0||f<0||u>=t||f>=t)continue;const p=f*t+u;i[p]=1,s[p]=1}}}}get month(){return Math.floor(this.tick/Bn)%12}get season(){return Math.floor(this.month/3)}get year(){return Math.floor(this.tick/(Bn*12))+1}drain(){const t=this.events;return this.events=[],t}hash(){let t=2166136261;const e=i=>{for(let s=0;s<32;s+=8)t^=i>>>s&255,t=Math.imul(t,16777619)};e(this.tick);for(let i=0;i<this.top;i++)this.alive[i]&&(e(i),e(this.kind[i]),e(this.owner[i]),e(this.x[i]),e(this.z[i]),e(this.hp[i]),e(this.task[i]),e(this.carry[i]));for(const i of this.players)for(const s of ts)e(i.res[s]);return t>>>0}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zo="170",od=0,Ll=1,ld=2,dh=1,fh=2,Nn=3,ai=0,Be=1,zn=2,si=0,rs=1,Dl=2,Ul=3,Nl=4,cd=5,yi=100,hd=101,ud=102,dd=103,fd=104,pd=200,md=201,gd=202,_d=203,so=204,ro=205,vd=206,xd=207,Md=208,yd=209,Sd=210,bd=211,Ed=212,Td=213,Ad=214,ao=0,oo=1,lo=2,cs=3,co=4,ho=5,uo=6,fo=7,ta=0,Cd=1,Rd=2,ri=0,wd=1,Pd=2,Id=3,ph=4,Ld=5,Dd=6,Ud=7,mh=300,hs=301,us=302,po=303,mo=304,ea=306,go=1e3,Ei=1001,_o=1002,Qe=1003,Nd=1004,rr=1005,mn=1006,fa=1007,Ti=1008,Cn=1009,gh=1010,_h=1011,Xs=1012,Jo=1013,wi=1014,Sn=1015,Zs=1016,Qo=1017,tl=1018,ds=1020,vh=35902,xh=1021,Mh=1022,gn=1023,yh=1024,Sh=1025,as=1026,fs=1027,na=1028,el=1029,bh=1030,nl=1031,il=1033,Fr=33776,zr=33777,kr=33778,Or=33779,vo=35840,xo=35841,Mo=35842,yo=35843,So=36196,bo=37492,Eo=37496,To=37808,Ao=37809,Co=37810,Ro=37811,wo=37812,Po=37813,Io=37814,Lo=37815,Do=37816,Uo=37817,No=37818,Fo=37819,zo=37820,ko=37821,Br=36492,Oo=36494,Bo=36495,Eh=36283,Ho=36284,Go=36285,Vo=36286,Fd=3200,Th=3201,sl=0,zd=1,ni="",qe="srgb",ms="srgb-linear",ia="linear",ie="srgb",Fi=7680,Fl=519,kd=512,Od=513,Bd=514,Ah=515,Hd=516,Gd=517,Vd=518,Wd=519,zl=35044,an=35048,kl="300 es",On=2e3,qr=2001;class gs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pa=Math.PI/180,Wo=180/Math.PI;function Js(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function $e(n,t,e){return Math.max(t,Math.min(e,n))}function Xd(n,t){return(n%t+t)%t}function ma(n,t,e){return(1-e)*n+e*t}function Es(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xe(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class qt{constructor(t=0,e=0){qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ot{constructor(t,e,i,s,r,a,o,l,c){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],f=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],x=s[1],M=s[4],v=s[7],w=s[2],C=s[5],A=s[8];return r[0]=a*_+o*x+l*w,r[3]=a*m+o*M+l*C,r[6]=a*d+o*v+l*A,r[1]=c*_+h*x+u*w,r[4]=c*m+h*M+u*C,r[7]=c*d+h*v+u*A,r[2]=f*_+p*x+g*w,r[5]=f*m+p*M+g*C,r[8]=f*d+p*v+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,f=o*l-h*r,p=c*r-a*l,g=e*u+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*c-h*i)*_,t[2]=(o*i-s*a)*_,t[3]=f*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ga.makeScale(t,e)),this}rotate(t){return this.premultiply(ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ga=new Ot;function Ch(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function $r(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qd(){const n=$r("canvas");return n.style.display="block",n}const Ol={};function Fs(n){n in Ol||(Ol[n]=!0,console.warn(n))}function $d(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function Yd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Kd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Kt={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ie&&(n.r=Hn(n.r),n.g=Hn(n.g),n.b=Hn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ie&&(n.r=os(n.r),n.g=os(n.g),n.b=os(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===ni?ia:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Hn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function os(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Bl=[.64,.33,.3,.6,.15,.06],Hl=[.2126,.7152,.0722],Gl=[.3127,.329],Vl=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Kt.define({[ms]:{primaries:Bl,whitePoint:Gl,transfer:ia,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Hl,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:Bl,whitePoint:Gl,transfer:ie,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Hl,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}});let zi;class jd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{zi===void 0&&(zi=$r("canvas")),zi.width=t.width,zi.height=t.height;const i=zi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=zi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=$r("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Hn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Hn(e[i]/255)*255):e[i]=Hn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Zd=0;class Rh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=Js(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(_a(s[a].image)):r.push(_a(s[a]))}else r=_a(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function _a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?jd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Jd=0;class He extends gs{constructor(t=He.DEFAULT_IMAGE,e=He.DEFAULT_MAPPING,i=Ei,s=Ei,r=mn,a=Ti,o=gn,l=Cn,c=He.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=Js(),this.name="",this.source=new Rh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case go:t.x=t.x-Math.floor(t.x);break;case Ei:t.x=t.x<0?0:1;break;case _o:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case go:t.y=t.y-Math.floor(t.y);break;case Ei:t.y=t.y<0?0:1;break;case _o:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}He.DEFAULT_IMAGE=null;He.DEFAULT_MAPPING=mh;He.DEFAULT_ANISOTROPY=1;class ve{constructor(t=0,e=0,i=0,s=1){ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(p+1)/2,w=(d+1)/2,C=(h+f)/4,A=(u+_)/4,P=(g+m)/4;return M>v&&M>w?M<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(M),s=C/i,r=A/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=C/s,r=P/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=A/r,s=P/r),this.set(i,s,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-_)/x,this.z=(f-h)/x,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qd extends gs{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new He(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Rh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends Qd{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class wh extends He{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class tf extends He{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class li{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==p||h!==g){let m=1-o;const d=l*f+c*p+h*g+u*_,x=d>=0?1:-1,M=1-d*d;if(M>Number.EPSILON){const w=Math.sqrt(M),C=Math.atan2(w,d*x);m=Math.sin(m*C)/w,o=Math.sin(o*C)/w}const v=o*x;if(l=l*m+f*v,c=c*m+p*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*f,t[e+1]=l*g+h*f+c*u-o*p,t[e+2]=c*g+h*p+o*f-l*u,t[e+3]=h*g-o*u-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"YXZ":this._x=f*h*u+c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"ZXY":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u-f*p*g;break;case"ZYX":this._x=f*h*u-c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u+f*p*g;break;case"YZX":this._x=f*h*u+c*p*g,this._y=c*p*u+f*h*g,this._z=c*h*g-f*p*u,this._w=c*h*u-f*p*g;break;case"XZY":this._x=f*h*u-c*p*g,this._y=c*p*u-f*h*g,this._z=c*h*g+f*p*u,this._w=c*h*u+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=i+o+u;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($e(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=a*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,i=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return va.copy(this).projectOnVector(t),this.sub(va)}reflect(t){return this.sub(va.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos($e(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const va=new k,Xl=new li;class Li{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,cn):cn.fromBufferAttribute(r,a),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ar.copy(i.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ts),or.subVectors(this.max,Ts),ki.subVectors(t.a,Ts),Oi.subVectors(t.b,Ts),Bi.subVectors(t.c,Ts),Yn.subVectors(Oi,ki),Kn.subVectors(Bi,Oi),ui.subVectors(ki,Bi);let e=[0,-Yn.z,Yn.y,0,-Kn.z,Kn.y,0,-ui.z,ui.y,Yn.z,0,-Yn.x,Kn.z,0,-Kn.x,ui.z,0,-ui.x,-Yn.y,Yn.x,0,-Kn.y,Kn.x,0,-ui.y,ui.x,0];return!xa(e,ki,Oi,Bi,or)||(e=[1,0,0,0,1,0,0,0,1],!xa(e,ki,Oi,Bi,or))?!1:(lr.crossVectors(Yn,Kn),e=[lr.x,lr.y,lr.z],xa(e,ki,Oi,Bi,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Pn=[new k,new k,new k,new k,new k,new k,new k,new k],cn=new k,ar=new Li,ki=new k,Oi=new k,Bi=new k,Yn=new k,Kn=new k,ui=new k,Ts=new k,or=new k,lr=new k,di=new k;function xa(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){di.fromArray(n,r);const o=s.x*Math.abs(di.x)+s.y*Math.abs(di.y)+s.z*Math.abs(di.z),l=t.dot(di),c=e.dot(di),h=i.dot(di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ef=new Li,As=new k,Ma=new k;class _s{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ef.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;As.subVectors(t,this.center);const e=As.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(As,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ma.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(As.copy(t.center).add(Ma)),this.expandByPoint(As.copy(t.center).sub(Ma))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new k,ya=new k,cr=new k,jn=new k,Sa=new k,hr=new k,ba=new k;class rl{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ya.copy(t).add(e).multiplyScalar(.5),cr.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,a=-this.direction.dot(cr),o=jn.dot(this.direction),l=-jn.dot(cr),c=jn.lengthSq(),h=Math.abs(1-a*a);let u,f,p,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,p=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),p=-u*u+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ya).addScaledVector(cr,f),p}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,s,r){Sa.subVectors(e,t),hr.subVectors(i,t),ba.crossVectors(Sa,hr);let a=this.direction.dot(ba),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;jn.subVectors(this.origin,t);const l=o*this.direction.dot(hr.crossVectors(jn,hr));if(l<0)return null;const c=o*this.direction.dot(Sa.cross(jn));if(c<0||l+c>a)return null;const h=-o*jn.dot(ba);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gt{constructor(t,e,i,s,r,a,o,l,c,h,u,f,p,g,_,m){Gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,f,p,g,_,m)}set(t,e,i,s,r,a,o,l,c,h,u,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Hi.setFromMatrixColumn(t,0).length(),r=1/Hi.setFromMatrixColumn(t,1).length(),a=1/Hi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-o*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f+_*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=_+f*o,e[10]=a*l}else if(t.order==="ZXY"){const f=l*h,p=l*u,g=c*h,_=c*u;e[0]=f-_*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=_-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const f=a*h,p=a*u,g=o*h,_=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const f=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*l,p=a*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(nf,t,sf)}lookAt(t,e,i){const s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),Zn.crossVectors(i,Ke),Zn.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),Zn.crossVectors(i,Ke)),Zn.normalize(),ur.crossVectors(Ke,Zn),s[0]=Zn.x,s[4]=ur.x,s[8]=Ke.x,s[1]=Zn.y,s[5]=ur.y,s[9]=Ke.y,s[2]=Zn.z,s[6]=ur.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],x=i[3],M=i[7],v=i[11],w=i[15],C=s[0],A=s[4],P=s[8],S=s[12],y=s[1],E=s[5],D=s[9],U=s[13],L=s[2],F=s[6],z=s[10],q=s[14],N=s[3],O=s[7],W=s[11],$=s[15];return r[0]=a*C+o*y+l*L+c*N,r[4]=a*A+o*E+l*F+c*O,r[8]=a*P+o*D+l*z+c*W,r[12]=a*S+o*U+l*q+c*$,r[1]=h*C+u*y+f*L+p*N,r[5]=h*A+u*E+f*F+p*O,r[9]=h*P+u*D+f*z+p*W,r[13]=h*S+u*U+f*q+p*$,r[2]=g*C+_*y+m*L+d*N,r[6]=g*A+_*E+m*F+d*O,r[10]=g*P+_*D+m*z+d*W,r[14]=g*S+_*U+m*q+d*$,r[3]=x*C+M*y+v*L+w*N,r[7]=x*A+M*E+v*F+w*O,r[11]=x*P+M*D+v*z+w*W,r[15]=x*S+M*U+v*q+w*$,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*u-s*c*u-r*o*f+i*c*f+s*o*p-i*l*p)+_*(+e*l*p-e*c*f+r*a*f-s*a*p+s*c*h-r*l*h)+m*(+e*c*u-e*o*p-r*a*u+i*a*p+r*o*h-i*c*h)+d*(-s*o*h-e*l*u+e*o*f+s*a*u-i*a*f+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],x=u*m*c-_*f*c+_*l*p-o*m*p-u*l*d+o*f*d,M=g*f*c-h*m*c-g*l*p+a*m*p+h*l*d-a*f*d,v=h*_*c-g*u*c+g*o*p-a*_*p-h*o*d+a*u*d,w=g*u*l-h*_*l-g*o*f+a*_*f+h*o*m-a*u*m,C=e*x+i*M+s*v+r*w;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=x*A,t[1]=(_*f*r-u*m*r-_*s*p+i*m*p+u*s*d-i*f*d)*A,t[2]=(o*m*r-_*l*r+_*s*c-i*m*c-o*s*d+i*l*d)*A,t[3]=(u*l*r-o*f*r-u*s*c+i*f*c+o*s*p-i*l*p)*A,t[4]=M*A,t[5]=(h*m*r-g*f*r+g*s*p-e*m*p-h*s*d+e*f*d)*A,t[6]=(g*l*r-a*m*r-g*s*c+e*m*c+a*s*d-e*l*d)*A,t[7]=(a*f*r-h*l*r+h*s*c-e*f*c-a*s*p+e*l*p)*A,t[8]=v*A,t[9]=(g*u*r-h*_*r-g*i*p+e*_*p+h*i*d-e*u*d)*A,t[10]=(a*_*r-g*o*r+g*i*c-e*_*c-a*i*d+e*o*d)*A,t[11]=(h*o*r-a*u*r-h*i*c+e*u*c+a*i*p-e*o*p)*A,t[12]=w*A,t[13]=(h*_*s-g*u*s+g*i*f-e*_*f-h*i*m+e*u*m)*A,t[14]=(g*o*s-a*_*s-g*i*l+e*_*l+a*i*m-e*o*m)*A,t[15]=(a*u*s-h*o*s+h*i*l-e*u*l-a*i*f+e*o*f)*A,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,f=r*c,p=r*h,g=r*u,_=a*h,m=a*u,d=o*u,x=l*c,M=l*h,v=l*u,w=i.x,C=i.y,A=i.z;return s[0]=(1-(_+d))*w,s[1]=(p+v)*w,s[2]=(g-M)*w,s[3]=0,s[4]=(p-v)*C,s[5]=(1-(f+d))*C,s[6]=(m+x)*C,s[7]=0,s[8]=(g+M)*A,s[9]=(m-x)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Hi.set(s[0],s[1],s[2]).length();const a=Hi.set(s[4],s[5],s[6]).length(),o=Hi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],hn.copy(this);const c=1/r,h=1/a,u=1/o;return hn.elements[0]*=c,hn.elements[1]*=c,hn.elements[2]*=c,hn.elements[4]*=h,hn.elements[5]*=h,hn.elements[6]*=h,hn.elements[8]*=u,hn.elements[9]*=u,hn.elements[10]*=u,e.setFromRotationMatrix(hn),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=On){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s);let p,g;if(o===On)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===qr)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=On){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(a-r),f=(e+t)*c,p=(i+s)*h;let g,_;if(o===On)g=(a+r)*u,_=-2*u;else if(o===qr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Hi=new k,hn=new Gt,nf=new k(0,0,0),sf=new k(1,1,1),Zn=new k,ur=new k,Ke=new k,ql=new Gt,$l=new li;class tn{constructor(t=0,e=0,i=0,s=tn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($e(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-$e(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-$e(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ql,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return $l.setFromEuler(this),this.setFromQuaternion($l,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}tn.DEFAULT_ORDER="XYZ";class Ph{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let rf=0;const Yl=new k,Gi=new li,Ln=new Gt,dr=new k,Cs=new k,af=new k,of=new li,Kl=new k(1,0,0),jl=new k(0,1,0),Zl=new k(0,0,1),Jl={type:"added"},lf={type:"removed"},Vi={type:"childadded",child:null},Ea={type:"childremoved",child:null};class Le extends gs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=Js(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Le.DEFAULT_UP.clone();const t=new k,e=new tn,i=new li,s=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Gt},normalMatrix:{value:new Ot}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=Le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ph,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(t,e){return Gi.setFromAxisAngle(t,e),this.quaternion.premultiply(Gi),this}rotateX(t){return this.rotateOnAxis(Kl,t)}rotateY(t){return this.rotateOnAxis(jl,t)}rotateZ(t){return this.rotateOnAxis(Zl,t)}translateOnAxis(t,e){return Yl.copy(t).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kl,t)}translateY(t){return this.translateOnAxis(jl,t)}translateZ(t){return this.translateOnAxis(Zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ln.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?dr.copy(t):dr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ln.lookAt(Cs,dr,this.up):Ln.lookAt(dr,Cs,this.up),this.quaternion.setFromRotationMatrix(Ln),s&&(Ln.extractRotation(s.matrixWorld),Gi.setFromRotationMatrix(Ln),this.quaternion.premultiply(Gi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jl),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lf),Ea.child=t,this.dispatchEvent(Ea),Ea.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ln.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ln.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ln),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jl),Vi.child=t,this.dispatchEvent(Vi),Vi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,af),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,of,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Le.DEFAULT_UP=new k(0,1,0);Le.DEFAULT_MATRIX_AUTO_UPDATE=!0;Le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new k,Dn=new k,Ta=new k,Un=new k,Wi=new k,Xi=new k,Ql=new k,Aa=new k,Ca=new k,Ra=new k,wa=new ve,Pa=new ve,Ia=new ve;class dn{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){un.subVectors(s,e),Dn.subVectors(i,e),Ta.subVectors(t,e);const a=un.dot(un),o=un.dot(Dn),l=un.dot(Ta),c=Dn.dot(Dn),h=Dn.dot(Ta),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,p=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(a,Un.y),l.addScaledVector(o,Un.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return wa.setScalar(0),Pa.setScalar(0),Ia.setScalar(0),wa.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,i),Ia.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(wa,r.x),a.addScaledVector(Pa,r.y),a.addScaledVector(Ia,r.z),a}static isFrontFacing(t,e,i,s){return un.subVectors(i,e),Dn.subVectors(t,e),un.cross(Dn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),un.cross(Dn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return dn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;Wi.subVectors(s,i),Xi.subVectors(r,i),Aa.subVectors(t,i);const l=Wi.dot(Aa),c=Xi.dot(Aa);if(l<=0&&c<=0)return e.copy(i);Ca.subVectors(t,s);const h=Wi.dot(Ca),u=Xi.dot(Ca);if(h>=0&&u<=h)return e.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Wi,a);Ra.subVectors(t,r);const p=Wi.dot(Ra),g=Xi.dot(Ra);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Xi,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ql.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(Ql,o);const d=1/(m+_+f);return a=_*d,o=f*d,e.copy(i).addScaledVector(Wi,a).addScaledVector(Xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Jn={h:0,s:0,l:0},fr={h:0,s:0,l:0};function La(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Rt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=Xd(t,1),e=$e(e,0,1),i=$e(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=La(a,r,t+1/3),this.g=La(a,r,t),this.b=La(a,r,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const i=Ih[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hn(t.r),this.g=Hn(t.g),this.b=Hn(t.b),this}copyLinearToSRGB(t){return this.r=os(t.r),this.g=os(t.g),this.b=os(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return Kt.fromWorkingColorSpace(Fe.copy(this),t),Math.round($e(Fe.r*255,0,255))*65536+Math.round($e(Fe.g*255,0,255))*256+Math.round($e(Fe.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Fe.copy(this),e);const i=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=qe){Kt.fromWorkingColorSpace(Fe.copy(this),t);const e=Fe.r,i=Fe.g,s=Fe.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Jn),this.setHSL(Jn.h+t,Jn.s+e,Jn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Jn),t.getHSL(fr);const i=ma(Jn.h,fr.h,e),s=ma(Jn.s,fr.s,e),r=ma(Jn.l,fr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Rt;Rt.NAMES=Ih;let cf=0;class Di extends gs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=Js(),this.name="",this.blending=rs,this.side=ai,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Fl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(i.blending=this.blending),this.side!==ai&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==so&&(i.blendSrc=this.blendSrc),this.blendDst!==ro&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Fl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Gn extends Di{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new k,pr=new qt;class xe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=zl,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)pr.fromBufferAttribute(this,e),pr.applyMatrix3(t),this.setXY(e,pr.x,pr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Es(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Xe(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Es(e,this.array)),e}setX(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Es(e,this.array)),e}setY(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Es(e,this.array)),e}setW(t,e){return this.normalized&&(e=Xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Xe(e,this.array),i=Xe(i,this.array),s=Xe(s,this.array),r=Xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zl&&(t.usage=this.usage),t}}class Lh extends xe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Dh extends xe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ne extends xe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let hf=0;const nn=new Gt,Da=new Le,qi=new k,je=new Li,Rs=new Li,Re=new k;class Ee extends gs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=Js(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ch(t)?Dh:Lh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ot().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,i){return nn.makeTranslation(t,e,i),this.applyMatrix4(nn),this}scale(t,e,i){return nn.makeScale(t,e,i),this.applyMatrix4(nn),this}lookAt(t){return Da.lookAt(t),Da.updateMatrix(),this.applyMatrix4(Da.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qi).negate(),this.translate(qi.x,qi.y,qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ne(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const i=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Rs.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(je.min,Rs.min),je.expandByPoint(Re),Re.addVectors(je.max,Rs.max),je.expandByPoint(Re)):(je.expandByPoint(Rs.min),je.expandByPoint(Rs.max))}je.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(qi.fromBufferAttribute(t,c),Re.add(qi)),s=Math.max(s,i.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xe(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let P=0;P<i.count;P++)o[P]=new k,l[P]=new k;const c=new k,h=new k,u=new k,f=new qt,p=new qt,g=new qt,_=new k,m=new k;function d(P,S,y){c.fromBufferAttribute(i,P),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,y),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,S),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),p.sub(f),g.sub(f);const E=1/(p.x*g.y-g.x*p.y);isFinite(E)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(E),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(E),o[P].add(_),o[S].add(_),o[y].add(_),l[P].add(m),l[S].add(m),l[y].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let P=0,S=x.length;P<S;++P){const y=x[P],E=y.start,D=y.count;for(let U=E,L=E+D;U<L;U+=3)d(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const M=new k,v=new k,w=new k,C=new k;function A(P){w.fromBufferAttribute(s,P),C.copy(w);const S=o[P];M.copy(S),M.sub(w.multiplyScalar(w.dot(S))).normalize(),v.crossVectors(C,S);const E=v.dot(l[P])<0?-1:1;a.setXYZW(P,M.x,M.y,M.z,E)}for(let P=0,S=x.length;P<S;++P){const y=x[P],E=y.start,D=y.count;for(let U=E,L=E+D;U<L;U+=3)A(t.getX(U+0)),A(t.getX(U+1)),A(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new k,r=new k,a=new k,o=new k,l=new k,c=new k,h=new k,u=new k;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[p++]}return new xe(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ee,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,i);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],p=t(f,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tc=new Gt,fi=new rl,mr=new _s,ec=new k,gr=new k,_r=new k,vr=new k,Ua=new k,xr=new k,nc=new k,Mr=new k;class be extends Le{constructor(t=new Ee,e=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){xr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ua.fromBufferAttribute(u,t),a?xr.addScaledVector(Ua,h):xr.addScaledVector(Ua.sub(e),h))}e.add(xr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mr.copy(i.boundingSphere),mr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(mr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(mr,ec)===null||fi.origin.distanceToSquared(ec)>(t.far-t.near)**2))&&(tc.copy(r).invert(),fi.copy(t.ray).applyMatrix4(tc),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let v=x,w=M;v<w;v+=3){const C=o.getX(v),A=o.getX(v+1),P=o.getX(v+2);s=yr(this,d,t,i,c,h,u,C,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=o.getX(m),M=o.getX(m+1),v=o.getX(m+2);s=yr(this,a,t,i,c,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=a[m.materialIndex],x=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let v=x,w=M;v<w;v+=3){const C=v,A=v+1,P=v+2;s=yr(this,d,t,i,c,h,u,C,A,P),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const x=m,M=m+1,v=m+2;s=yr(this,a,t,i,c,h,u,x,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function uf(n,t,e,i,s,r,a,o){let l;if(t.side===Be?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===ai,o),l===null)return null;Mr.copy(o),Mr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Mr);return c<e.near||c>e.far?null:{distance:c,point:Mr.clone(),object:n}}function yr(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,gr),n.getVertexPosition(l,_r),n.getVertexPosition(c,vr);const h=uf(n,t,e,i,gr,_r,vr,nc);if(h){const u=new k;dn.getBarycoord(nc,gr,_r,vr,u),s&&(h.uv=dn.getInterpolatedAttribute(s,o,l,c,u,new qt)),r&&(h.uv1=dn.getInterpolatedAttribute(r,o,l,c,u,new qt)),a&&(h.normal=dn.getInterpolatedAttribute(a,o,l,c,u,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new k,materialIndex:0};dn.getNormal(gr,_r,vr,f.normal),h.face=f,h.barycoord=u}return h}class Pe extends Ee{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,p=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(u,2));function g(_,m,d,x,M,v,w,C,A,P,S){const y=v/A,E=w/P,D=v/2,U=w/2,L=C/2,F=A+1,z=P+1;let q=0,N=0;const O=new k;for(let W=0;W<z;W++){const $=W*E-U;for(let Q=0;Q<F;Q++){const st=Q*y-D;O[_]=st*x,O[m]=$*M,O[d]=L,c.push(O.x,O.y,O.z),O[_]=0,O[m]=0,O[d]=C>0?1:-1,h.push(O.x,O.y,O.z),u.push(Q/A),u.push(1-W/P),q+=1}}for(let W=0;W<P;W++)for(let $=0;$<A;$++){const Q=f+$+F*W,st=f+$+F*(W+1),X=f+($+1)+F*(W+1),et=f+($+1)+F*W;l.push(Q,st,et),l.push(st,X,et),N+=6}o.addGroup(p,N,S),p+=N,f+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ps(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Oe(n){const t={};for(let e=0;e<n.length;e++){const i=ps(n[e]);for(const s in i)t[s]=i[s]}return t}function df(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Uh(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const ff={clone:ps,merge:Oe};var pf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _n extends Di{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pf,this.fragmentShader=mf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=df(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Nh extends Le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new k,ic=new qt,sc=new qt;class rn extends Nh{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,ic,sc),e.subVectors(sc,ic)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(pa*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const $i=-90,Yi=1;class gf extends Le{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn($i,Yi,t,e);s.layers=this.layers,this.add(s);const r=new rn($i,Yi,t,e);r.layers=this.layers,this.add(r);const a=new rn($i,Yi,t,e);a.layers=this.layers,this.add(a);const o=new rn($i,Yi,t,e);o.layers=this.layers,this.add(o);const l=new rn($i,Yi,t,e);l.layers=this.layers,this.add(l);const c=new rn($i,Yi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===On)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===qr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Fh extends He{constructor(t,e,i,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:hs,super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _f extends Pi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Fh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:mn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Pe(5,5,5),r=new _n({name:"CubemapFromEquirect",uniforms:ps(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Be,blending:si});r.uniforms.tEquirect.value=e;const a=new be(s,r),o=e.minFilter;return e.minFilter===Ti&&(e.minFilter=mn),new gf(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}const Na=new k,vf=new k,xf=new Ot;class vi{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Na.subVectors(i,e).cross(vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||xf.getNormalMatrix(t),s=this.coplanarPoint(Na).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new _s,Sr=new k;class al{constructor(t=new vi,e=new vi,i=new vi,s=new vi,r=new vi,a=new vi){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=On){const i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],p=s[8],g=s[9],_=s[10],m=s[11],d=s[12],x=s[13],M=s[14],v=s[15];if(i[0].setComponents(l-r,f-c,m-p,v-d).normalize(),i[1].setComponents(l+r,f+c,m+p,v+d).normalize(),i[2].setComponents(l+a,f+h,m+g,v+x).normalize(),i[3].setComponents(l-a,f-h,m-g,v-x).normalize(),i[4].setComponents(l-o,f-u,m-_,v-M).normalize(),e===On)i[5].setComponents(l+o,f+u,m+_,v+M).normalize();else if(e===qr)i[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(t){return pi.center.set(0,0,0),pi.radius=.7071067811865476,pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Sr.x=s.normal.x>0?t.max.x:t.min.x,Sr.y=s.normal.y>0?t.max.y:t.min.y,Sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function zh(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Mf(n){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<u.length;p++){const g=u[f],_=u[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let p=0,g=u.length;p<g;p++){const _=u[p];n.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class ci extends Ee{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<h;d++){const x=d*f-a;for(let M=0;M<c;M++){const v=M*u-r;g.push(v,-x,0),_.push(0,0,1),m.push(M/o),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const M=x+c*d,v=x+c*(d+1),w=x+1+c*(d+1),C=x+1+c*d;p.push(M,v,C),p.push(v,w,C)}this.setIndex(p),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ci(t.width,t.height,t.widthSegments,t.heightSegments)}}var yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sf=`#ifdef USE_ALPHAHASH
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
#endif`,bf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ef=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Af=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cf=`#ifdef USE_AOMAP
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
#endif`,Rf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wf=`#ifdef USE_BATCHING
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
#endif`,Pf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,If=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Df=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Uf=`#ifdef USE_IRIDESCENCE
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
#endif`,Nf=`#ifdef USE_BUMPMAP
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
#endif`,Ff=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Of=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Wf=`#define PI 3.141592653589793
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
} // validated`,Xf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,qf=`vec3 transformedNormal = objectNormal;
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
#endif`,$f=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qf=`#ifdef USE_ENVMAP
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
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ep=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,rp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ap=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lp=`#ifdef USE_GRADIENTMAP
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
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,up=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dp=`uniform bool receiveShadow;
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
#endif`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vp=`PhysicalMaterial material;
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
#endif`,xp=`struct PhysicalMaterial {
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
}`,Mp=`
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
#endif`,yp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ep=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Pp=`#if defined( USE_POINTS_UV )
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
#endif`,Ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Up=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Np=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`#ifdef USE_MORPHTARGETS
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
#endif`,zp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Op=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vp=`#ifdef USE_NORMALMAP
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
#endif`,Wp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$p=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,tm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,em=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,im=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,rm=`float getShadowMask() {
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
}`,am=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,om=`#ifdef USE_SKINNING
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
#endif`,lm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,hm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,um=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pm=`#ifdef USE_TRANSMISSION
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
#endif`,mm=`#ifdef USE_TRANSMISSION
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
#endif`,gm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ym=`uniform sampler2D t2D;
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
}`,Sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`#include <common>
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
}`,Cm=`#if DEPTH_PACKING == 3200
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
}`,Rm=`#define DISTANCE
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
}`,wm=`#define DISTANCE
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
}`,Pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lm=`uniform float scale;
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
}`,Dm=`uniform vec3 diffuse;
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
}`,Um=`#include <common>
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
}`,Nm=`uniform vec3 diffuse;
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
}`,Fm=`#define LAMBERT
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
}`,zm=`#define LAMBERT
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
}`,km=`#define MATCAP
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
}`,Om=`#define MATCAP
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
}`,Bm=`#define NORMAL
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
}`,Hm=`#define NORMAL
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
}`,Gm=`#define PHONG
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
}`,Vm=`#define PHONG
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
}`,Wm=`#define STANDARD
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
}`,Xm=`#define STANDARD
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
}`,qm=`#define TOON
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
}`,$m=`#define TOON
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
}`,Ym=`uniform float size;
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
}`,Km=`uniform vec3 diffuse;
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
}`,jm=`#include <common>
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
}`,Zm=`uniform vec3 color;
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
}`,Jm=`uniform float rotation;
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
}`,Qm=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:yf,alphahash_pars_fragment:Sf,alphamap_fragment:bf,alphamap_pars_fragment:Ef,alphatest_fragment:Tf,alphatest_pars_fragment:Af,aomap_fragment:Cf,aomap_pars_fragment:Rf,batching_pars_vertex:wf,batching_vertex:Pf,begin_vertex:If,beginnormal_vertex:Lf,bsdfs:Df,iridescence_fragment:Uf,bumpmap_pars_fragment:Nf,clipping_planes_fragment:Ff,clipping_planes_pars_fragment:zf,clipping_planes_pars_vertex:kf,clipping_planes_vertex:Of,color_fragment:Bf,color_pars_fragment:Hf,color_pars_vertex:Gf,color_vertex:Vf,common:Wf,cube_uv_reflection_fragment:Xf,defaultnormal_vertex:qf,displacementmap_pars_vertex:$f,displacementmap_vertex:Yf,emissivemap_fragment:Kf,emissivemap_pars_fragment:jf,colorspace_fragment:Zf,colorspace_pars_fragment:Jf,envmap_fragment:Qf,envmap_common_pars_fragment:tp,envmap_pars_fragment:ep,envmap_pars_vertex:np,envmap_physical_pars_fragment:fp,envmap_vertex:ip,fog_vertex:sp,fog_pars_vertex:rp,fog_fragment:ap,fog_pars_fragment:op,gradientmap_pars_fragment:lp,lightmap_pars_fragment:cp,lights_lambert_fragment:hp,lights_lambert_pars_fragment:up,lights_pars_begin:dp,lights_toon_fragment:pp,lights_toon_pars_fragment:mp,lights_phong_fragment:gp,lights_phong_pars_fragment:_p,lights_physical_fragment:vp,lights_physical_pars_fragment:xp,lights_fragment_begin:Mp,lights_fragment_maps:yp,lights_fragment_end:Sp,logdepthbuf_fragment:bp,logdepthbuf_pars_fragment:Ep,logdepthbuf_pars_vertex:Tp,logdepthbuf_vertex:Ap,map_fragment:Cp,map_pars_fragment:Rp,map_particle_fragment:wp,map_particle_pars_fragment:Pp,metalnessmap_fragment:Ip,metalnessmap_pars_fragment:Lp,morphinstance_vertex:Dp,morphcolor_vertex:Up,morphnormal_vertex:Np,morphtarget_pars_vertex:Fp,morphtarget_vertex:zp,normal_fragment_begin:kp,normal_fragment_maps:Op,normal_pars_fragment:Bp,normal_pars_vertex:Hp,normal_vertex:Gp,normalmap_pars_fragment:Vp,clearcoat_normal_fragment_begin:Wp,clearcoat_normal_fragment_maps:Xp,clearcoat_pars_fragment:qp,iridescence_pars_fragment:$p,opaque_fragment:Yp,packing:Kp,premultiplied_alpha_fragment:jp,project_vertex:Zp,dithering_fragment:Jp,dithering_pars_fragment:Qp,roughnessmap_fragment:tm,roughnessmap_pars_fragment:em,shadowmap_pars_fragment:nm,shadowmap_pars_vertex:im,shadowmap_vertex:sm,shadowmask_pars_fragment:rm,skinbase_vertex:am,skinning_pars_vertex:om,skinning_vertex:lm,skinnormal_vertex:cm,specularmap_fragment:hm,specularmap_pars_fragment:um,tonemapping_fragment:dm,tonemapping_pars_fragment:fm,transmission_fragment:pm,transmission_pars_fragment:mm,uv_pars_fragment:gm,uv_pars_vertex:_m,uv_vertex:vm,worldpos_vertex:xm,background_vert:Mm,background_frag:ym,backgroundCube_vert:Sm,backgroundCube_frag:bm,cube_vert:Em,cube_frag:Tm,depth_vert:Am,depth_frag:Cm,distanceRGBA_vert:Rm,distanceRGBA_frag:wm,equirect_vert:Pm,equirect_frag:Im,linedashed_vert:Lm,linedashed_frag:Dm,meshbasic_vert:Um,meshbasic_frag:Nm,meshlambert_vert:Fm,meshlambert_frag:zm,meshmatcap_vert:km,meshmatcap_frag:Om,meshnormal_vert:Bm,meshnormal_frag:Hm,meshphong_vert:Gm,meshphong_frag:Vm,meshphysical_vert:Wm,meshphysical_frag:Xm,meshtoon_vert:qm,meshtoon_frag:$m,points_vert:Ym,points_frag:Km,shadow_vert:jm,shadow_frag:Zm,sprite_vert:Jm,sprite_frag:Qm},dt={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},Mn={basic:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Rt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Oe([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Oe([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Oe([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Rt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Oe([dt.points,dt.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Oe([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Oe([dt.common,dt.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Oe([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Oe([dt.sprite,dt.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Oe([dt.common,dt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Oe([dt.lights,dt.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};Mn.physical={uniforms:Oe([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const br={r:0,b:0,g:0},mi=new tn,t0=new Gt;function e0(n,t,e,i,s,r,a){const o=new Rt(0);let l=r===!0?0:1,c,h,u=null,f=0,p=null;function g(x){let M=x.isScene===!0?x.background:null;return M&&M.isTexture&&(M=(x.backgroundBlurriness>0?e:t).get(M)),M}function _(x){let M=!1;const v=g(x);v===null?d(o,l):v&&v.isColor&&(d(v,1),M=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===ea)?(h===void 0&&(h=new be(new Pe(1,1,1),new _n({name:"BackgroundCubeMaterial",uniforms:ps(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),mi.copy(M.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(t0.makeRotationFromEuler(mi)),h.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ie,(u!==v||f!==v.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,p=n.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new be(new ci(2,2),new _n({name:"BackgroundMaterial",uniforms:ps(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:ai,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(v.colorSpace)!==ie,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function d(x,M){x.getRGB(br,Uh(n)),i.buffers.color.setClear(br.r,br.g,br.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,d(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,d(o,l)},render:_,addToRenderList:m}}function n0(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,a=!1;function o(y,E,D,U,L){let F=!1;const z=u(U,D,E);r!==z&&(r=z,c(r.object)),F=p(y,U,D,L),F&&g(y,U,D,L),L!==null&&t.update(L,n.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,v(y,E,D,U),L!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(L).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function h(y){return n.deleteVertexArray(y)}function u(y,E,D){const U=D.wireframe===!0;let L=i[y.id];L===void 0&&(L={},i[y.id]=L);let F=L[E.id];F===void 0&&(F={},L[E.id]=F);let z=F[U];return z===void 0&&(z=f(l()),F[U]=z),z}function f(y){const E=[],D=[],U=[];for(let L=0;L<e;L++)E[L]=0,D[L]=0,U[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:D,attributeDivisors:U,object:y,attributes:{},index:null}}function p(y,E,D,U){const L=r.attributes,F=E.attributes;let z=0;const q=D.getAttributes();for(const N in q)if(q[N].location>=0){const W=L[N];let $=F[N];if($===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),W===void 0||W.attribute!==$||$&&W.data!==$.data)return!0;z++}return r.attributesNum!==z||r.index!==U}function g(y,E,D,U){const L={},F=E.attributes;let z=0;const q=D.getAttributes();for(const N in q)if(q[N].location>=0){let W=F[N];W===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&(W=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&(W=y.instanceColor));const $={};$.attribute=W,W&&W.data&&($.data=W.data),L[N]=$,z++}r.attributes=L,r.attributesNum=z,r.index=U}function _(){const y=r.newAttributes;for(let E=0,D=y.length;E<D;E++)y[E]=0}function m(y){d(y,0)}function d(y,E){const D=r.newAttributes,U=r.enabledAttributes,L=r.attributeDivisors;D[y]=1,U[y]===0&&(n.enableVertexAttribArray(y),U[y]=1),L[y]!==E&&(n.vertexAttribDivisor(y,E),L[y]=E)}function x(){const y=r.newAttributes,E=r.enabledAttributes;for(let D=0,U=E.length;D<U;D++)E[D]!==y[D]&&(n.disableVertexAttribArray(D),E[D]=0)}function M(y,E,D,U,L,F,z){z===!0?n.vertexAttribIPointer(y,E,D,L,F):n.vertexAttribPointer(y,E,D,U,L,F)}function v(y,E,D,U){_();const L=U.attributes,F=D.getAttributes(),z=E.defaultAttributeValues;for(const q in F){const N=F[q];if(N.location>=0){let O=L[q];if(O===void 0&&(q==="instanceMatrix"&&y.instanceMatrix&&(O=y.instanceMatrix),q==="instanceColor"&&y.instanceColor&&(O=y.instanceColor)),O!==void 0){const W=O.normalized,$=O.itemSize,Q=t.get(O);if(Q===void 0)continue;const st=Q.buffer,X=Q.type,et=Q.bytesPerElement,lt=X===n.INT||X===n.UNSIGNED_INT||O.gpuType===Jo;if(O.isInterleavedBufferAttribute){const rt=O.data,ut=rt.stride,Et=O.offset;if(rt.isInstancedInterleavedBuffer){for(let Dt=0;Dt<N.locationSize;Dt++)d(N.location+Dt,rt.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Dt=0;Dt<N.locationSize;Dt++)m(N.location+Dt);n.bindBuffer(n.ARRAY_BUFFER,st);for(let Dt=0;Dt<N.locationSize;Dt++)M(N.location+Dt,$/N.locationSize,X,W,ut*et,(Et+$/N.locationSize*Dt)*et,lt)}else{if(O.isInstancedBufferAttribute){for(let rt=0;rt<N.locationSize;rt++)d(N.location+rt,O.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let rt=0;rt<N.locationSize;rt++)m(N.location+rt);n.bindBuffer(n.ARRAY_BUFFER,st);for(let rt=0;rt<N.locationSize;rt++)M(N.location+rt,$/N.locationSize,X,W,$*et,$/N.locationSize*rt*et,lt)}}else if(z!==void 0){const W=z[q];if(W!==void 0)switch(W.length){case 2:n.vertexAttrib2fv(N.location,W);break;case 3:n.vertexAttrib3fv(N.location,W);break;case 4:n.vertexAttrib4fv(N.location,W);break;default:n.vertexAttrib1fv(N.location,W)}}}}x()}function w(){P();for(const y in i){const E=i[y];for(const D in E){const U=E[D];for(const L in U)h(U[L].object),delete U[L];delete E[D]}delete i[y]}}function C(y){if(i[y.id]===void 0)return;const E=i[y.id];for(const D in E){const U=E[D];for(const L in U)h(U[L].object),delete U[L];delete E[D]}delete i[y.id]}function A(y){for(const E in i){const D=i[E];if(D[y.id]===void 0)continue;const U=D[y.id];for(const L in U)h(U[L].object),delete U[L];delete D[y.id]}}function P(){S(),a=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:x}}function i0(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];e.update(p,i,1)}function l(c,h,u,f){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function s0(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==gn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const P=A===Zs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Cn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Sn&&!P)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),M=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,C=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:w,maxSamples:C}}function r0(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new vi,o=new Ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const x=r?0:i,M=x*4;let v=d.clippingState||null;l.value=v,v=h(g,f,M,p);for(let w=0;w!==M;++w)v[w]=e[w];d.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,x=f.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<d)&&(m=new Float32Array(d));for(let M=0,v=p;M!==_;++M,v+=4)a.copy(u[M]).applyMatrix4(x,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function a0(n){let t=new WeakMap;function e(a,o){return o===po?a.mapping=hs:o===mo&&(a.mapping=us),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===po||o===mo)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new _f(l.height);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class kh extends Nh{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ns=4,rc=[.125,.215,.35,.446,.526,.582],Si=20,Fa=new kh,ac=new Rt;let za=null,ka=0,Oa=0,Ba=!1;const xi=(1+Math.sqrt(5))/2,Ki=1/xi,oc=[new k(-xi,Ki,0),new k(xi,Ki,0),new k(-Ki,0,xi),new k(Ki,0,xi),new k(0,xi,-Ki),new k(0,xi,Ki),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class lc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){za=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=uc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(za,ka,Oa),this._renderer.xr.enabled=Ba,t.scissorTest=!1,Er(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===hs||t.mapping===us?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),za=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Zs,format:gn,colorSpace:ms,depthBuffer:!1},s=cc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=o0(r)),this._blurMaterial=l0(r,t,e)}return s}_compileMaterial(t){const e=new be(this._lodPlanes[0],t);this._renderer.compile(e,Fa)}_sceneToCubeUV(t,e,i,s){const o=new rn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(ac),h.toneMapping=ri,h.autoClear=!1;const p=new Gn({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),g=new be(new Pe,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(ac),_=!0);for(let d=0;d<6;d++){const x=d%3;x===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):x===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const M=this._cubeSize;Er(s,x*M,d>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===hs||t.mapping===us;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=uc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new be(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Er(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Fa)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=oc[(s-r-1)%oc.length];this._blur(t,r-1,r,a,o)}e.autoClear=i}_blur(t,e,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new be(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Si-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Si;m>Si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Si}`);const d=[];let x=0;for(let A=0;A<Si;++A){const P=A/_,S=Math.exp(-P*P/2);d.push(S),A===0?x+=S:A<m&&(x+=2*S)}for(let A=0;A<d.length;A++)d[A]=d[A]/x;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const v=this._sizeLods[s],w=3*v*(s>M-ns?s-M+ns:0),C=4*(this._cubeSize-v);Er(e,w,C,3*v,2*v),l.setRenderTarget(e),l.render(u,Fa)}}function o0(n){const t=[],e=[],i=[];let s=n;const r=n-ns+1+rc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-ns?l=rc[a-n+ns-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,d=1,x=new Float32Array(_*g*p),M=new Float32Array(m*g*p),v=new Float32Array(d*g*p);for(let C=0;C<p;C++){const A=C%3*2/3-1,P=C>2?0:-1,S=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];x.set(S,_*g*C),M.set(f,m*g*C);const y=[C,C,C,C,C,C];v.set(y,d*g*C)}const w=new Ee;w.setAttribute("position",new xe(x,_)),w.setAttribute("uv",new xe(M,m)),w.setAttribute("faceIndex",new xe(v,d)),t.push(w),s>ns&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function cc(n,t,e){const i=new Pi(n,t,e);return i.texture.mapping=ea,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Er(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function l0(n,t,e){const i=new Float32Array(Si),s=new k(0,1,0);return new _n({name:"SphericalGaussianBlur",defines:{n:Si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ol(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function hc(){return new _n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ol(),fragmentShader:`

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
		`,blending:si,depthTest:!1,depthWrite:!1})}function uc(){return new _n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:si,depthTest:!1,depthWrite:!1})}function ol(){return`

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
	`}function c0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===po||l===mo,h=l===hs||l===us;if(c||h){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new lc(n)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(e===null&&(e=new lc(n)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function h0(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Fs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function u0(n,t,e,i){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,d=_.length;m<d;m++)t.remove(_[m])}f.removeEventListener("dispose",a),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],n.ARRAY_BUFFER)}}function c(u){const f=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const x=p.array;_=p.version;for(let M=0,v=x.length;M<v;M+=3){const w=x[M+0],C=x[M+1],A=x[M+2];f.push(w,C,C,A,A,w)}}else if(g!==void 0){const x=g.array;_=g.version;for(let M=0,v=x.length/3-1;M<v;M+=3){const w=M+0,C=M+1,A=M+2;f.push(w,C,C,A,A,w)}}else return;const m=new(Ch(f)?Dh:Lh)(f,1);m.version=_;const d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){const f=r.get(u);if(f){const p=u.index;p!==null&&f.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function d0(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*a),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*a,g),e.update(p,i,g))}function h(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function u(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/a,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,_,0,g);let d=0;for(let x=0;x<g;x++)d+=p[x]*_[x];e.update(d,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function f0(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function p0(n,t,e){const i=new WeakMap,s=new ve;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let y=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",y)};var p=y;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let w=o.attributes.position.count*v,C=1;w>t.maxTextureSize&&(C=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*C*4*u),P=new wh(A,w,C,u);P.type=Sn,P.needsUpdate=!0;const S=v*4;for(let E=0;E<u;E++){const D=d[E],U=x[E],L=M[E],F=w*C*4*E;for(let z=0;z<D.count;z++){const q=z*S;g===!0&&(s.fromBufferAttribute(D,z),A[F+q+0]=s.x,A[F+q+1]=s.y,A[F+q+2]=s.z,A[F+q+3]=0),_===!0&&(s.fromBufferAttribute(U,z),A[F+q+4]=s.x,A[F+q+5]=s.y,A[F+q+6]=s.z,A[F+q+7]=0),m===!0&&(s.fromBufferAttribute(L,z),A[F+q+8]=s.x,A[F+q+9]=s.y,A[F+q+10]=s.z,A[F+q+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:P,size:new qt(w,C)},i.set(o,f),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function m0(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Oh extends He{constructor(t,e,i,s,r,a,o,l,c,h=as){if(h!==as&&h!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===as&&(i=wi),i===void 0&&h===fs&&(i=ds),super(null,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Qe,this.minFilter=l!==void 0?l:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Bh=new He,dc=new Oh(1,1),Hh=new wh,Gh=new tf,Vh=new Fh,fc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),_c=new Float32Array(4);function vs(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=fc[s];if(r===void 0&&(r=new Float32Array(s),fc[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ae(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ce(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function sa(n,t){let e=pc[t];e===void 0&&(e=new Int32Array(t),pc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function g0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function _0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2fv(this.addr,t),Ce(e,t)}}function v0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ae(e,t))return;n.uniform3fv(this.addr,t),Ce(e,t)}}function x0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4fv(this.addr,t),Ce(e,t)}}function M0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,i))return;_c.set(i),n.uniformMatrix2fv(this.addr,!1,_c),Ce(e,i)}}function y0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,i))return;gc.set(i),n.uniformMatrix3fv(this.addr,!1,gc),Ce(e,i)}}function S0(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ae(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ae(e,i))return;mc.set(i),n.uniformMatrix4fv(this.addr,!1,mc),Ce(e,i)}}function b0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function E0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2iv(this.addr,t),Ce(e,t)}}function T0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;n.uniform3iv(this.addr,t),Ce(e,t)}}function A0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4iv(this.addr,t),Ce(e,t)}}function C0(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function R0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ae(e,t))return;n.uniform2uiv(this.addr,t),Ce(e,t)}}function w0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ae(e,t))return;n.uniform3uiv(this.addr,t),Ce(e,t)}}function P0(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ae(e,t))return;n.uniform4uiv(this.addr,t),Ce(e,t)}}function I0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(dc.compareFunction=Ah,r=dc):r=Bh,e.setTexture2D(t||r,s)}function L0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Gh,s)}function D0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Vh,s)}function U0(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Hh,s)}function N0(n){switch(n){case 5126:return g0;case 35664:return _0;case 35665:return v0;case 35666:return x0;case 35674:return M0;case 35675:return y0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return T0;case 35669:case 35673:return A0;case 5125:return C0;case 36294:return R0;case 36295:return w0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}function F0(n,t){n.uniform1fv(this.addr,t)}function z0(n,t){const e=vs(t,this.size,2);n.uniform2fv(this.addr,e)}function k0(n,t){const e=vs(t,this.size,3);n.uniform3fv(this.addr,e)}function O0(n,t){const e=vs(t,this.size,4);n.uniform4fv(this.addr,e)}function B0(n,t){const e=vs(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function H0(n,t){const e=vs(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function G0(n,t){const e=vs(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function V0(n,t){n.uniform1iv(this.addr,t)}function W0(n,t){n.uniform2iv(this.addr,t)}function X0(n,t){n.uniform3iv(this.addr,t)}function q0(n,t){n.uniform4iv(this.addr,t)}function $0(n,t){n.uniform1uiv(this.addr,t)}function Y0(n,t){n.uniform2uiv(this.addr,t)}function K0(n,t){n.uniform3uiv(this.addr,t)}function j0(n,t){n.uniform4uiv(this.addr,t)}function Z0(n,t,e){const i=this.cache,s=t.length,r=sa(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Bh,r[a])}function J0(n,t,e){const i=this.cache,s=t.length,r=sa(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Gh,r[a])}function Q0(n,t,e){const i=this.cache,s=t.length,r=sa(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Vh,r[a])}function tg(n,t,e){const i=this.cache,s=t.length,r=sa(e,s);Ae(i,r)||(n.uniform1iv(this.addr,r),Ce(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Hh,r[a])}function eg(n){switch(n){case 5126:return F0;case 35664:return z0;case 35665:return k0;case 35666:return O0;case 35674:return B0;case 35675:return H0;case 35676:return G0;case 5124:case 35670:return V0;case 35667:case 35671:return W0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return $0;case 36294:return Y0;case 36295:return K0;case 36296:return j0;case 35678:case 36198:case 36298:case 36306:case 35682:return Z0;case 35679:case 36299:case 36307:return J0;case 35680:case 36300:case 36308:case 36293:return Q0;case 36289:case 36303:case 36311:case 36292:return tg}}class ng{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=N0(e.type)}}class ig{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=eg(e.type)}}class sg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Ha=/(\w+)(\])?(\[|\.)?/g;function vc(n,t){n.seq.push(t),n.map[t.id]=t}function rg(n,t,e){const i=n.name,s=i.length;for(Ha.lastIndex=0;;){const r=Ha.exec(i),a=Ha.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vc(e,c===void 0?new ng(o,n,t):new ig(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new sg(o),vc(e,u)),e=u}}}class Hr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);rg(r,a,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function xc(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const ag=37297;let og=0;function lg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Mc=new Ot;function cg(n){Kt._getMatrix(Mc,Kt.workingColorSpace,n);const t=`mat3( ${Mc.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(n)){case ia:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function yc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+lg(n.getShaderSource(t),a)}else return s}function hg(n,t){const e=cg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function ug(n,t){let e;switch(t){case wd:e="Linear";break;case Pd:e="Reinhard";break;case Id:e="Cineon";break;case ph:e="ACESFilmic";break;case Dd:e="AgX";break;case Ud:e="Neutral";break;case Ld:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Tr=new k;function dg(){Kt.getLuminanceCoefficients(Tr);const n=Tr.x.toFixed(4),t=Tr.y.toFixed(4),e=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zs).join(`
`)}function pg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function mg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function zs(n){return n!==""}function Sc(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(n){return n.replace(gg,vg)}const _g=new Map;function vg(n,t){let e=Ht[t];if(e===void 0){const i=_g.get(t);if(i!==void 0)e=Ht[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Xo(e)}const xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ec(n){return n.replace(xg,Mg)}function Mg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tc(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function yg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===dh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===fh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Nn&&(t="SHADOWMAP_TYPE_VSM"),t}function Sg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case hs:case us:t="ENVMAP_TYPE_CUBE";break;case ea:t="ENVMAP_TYPE_CUBE_UV";break}return t}function bg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case us:t="ENVMAP_MODE_REFRACTION";break}return t}function Eg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ta:t="ENVMAP_BLENDING_MULTIPLY";break;case Cd:t="ENVMAP_BLENDING_MIX";break;case Rd:t="ENVMAP_BLENDING_ADD";break}return t}function Tg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Ag(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=yg(e),c=Sg(e),h=bg(e),u=Eg(e),f=Tg(e),p=fg(e),g=pg(r),_=s.createProgram();let m,d,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(zs).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(zs).join(`
`),d.length>0&&(d+=`
`)):(m=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zs).join(`
`),d=[Tc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Ht.tonemapping_pars_fragment:"",e.toneMapping!==ri?ug("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,hg("linearToOutputTexel",e.outputColorSpace),dg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zs).join(`
`)),a=Xo(a),a=Sc(a,e),a=bc(a,e),o=Xo(o),o=Sc(o,e),o=bc(o,e),a=Ec(a),o=Ec(o),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+m+a,v=x+d+o,w=xc(s,s.VERTEX_SHADER,M),C=xc(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(E){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(_).trim(),U=s.getShaderInfoLog(w).trim(),L=s.getShaderInfoLog(C).trim();let F=!0,z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(F=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,C);else{const q=yc(s,w,"vertex"),N=yc(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+D+`
`+q+`
`+N)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(U===""||L==="")&&(z=!1);z&&(E.diagnostics={runnable:F,programLog:D,vertexShader:{log:U,prefix:m},fragmentShader:{log:L,prefix:d}})}s.deleteShader(w),s.deleteShader(C),P=new Hr(s,_),S=mg(s,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,ag)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=og++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=C,this}let Cg=0;class Rg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new wg(t),e.set(t,i)),i}}class wg{constructor(t){this.id=Cg++,this.code=t,this.usedTimes=0}}function Pg(n,t,e,i,s,r,a){const o=new Ph,l=new Rg,c=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function m(S,y,E,D,U){const L=D.fog,F=U.geometry,z=S.isMeshStandardMaterial?D.environment:null,q=(S.isMeshStandardMaterial?e:t).get(S.envMap||z),N=q&&q.mapping===ea?q.image.height:null,O=g[S.type];S.precision!==null&&(p=s.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const W=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,$=W!==void 0?W.length:0;let Q=0;F.morphAttributes.position!==void 0&&(Q=1),F.morphAttributes.normal!==void 0&&(Q=2),F.morphAttributes.color!==void 0&&(Q=3);let st,X,et,lt;if(O){const ee=Mn[O];st=ee.vertexShader,X=ee.fragmentShader}else st=S.vertexShader,X=S.fragmentShader,l.update(S),et=l.getVertexShaderID(S),lt=l.getFragmentShaderID(S);const rt=n.getRenderTarget(),ut=n.state.buffers.depth.getReversed(),Et=U.isInstancedMesh===!0,Dt=U.isBatchedMesh===!0,re=!!S.map,Vt=!!S.matcap,fe=!!q,H=!!S.aoMap,Ve=!!S.lightMap,Wt=!!S.bumpMap,Xt=!!S.normalMap,wt=!!S.displacementMap,ce=!!S.emissiveMap,It=!!S.metalnessMap,R=!!S.roughnessMap,b=S.anisotropy>0,Y=S.clearcoat>0,nt=S.dispersion>0,at=S.iridescence>0,tt=S.sheen>0,Tt=S.transmission>0,pt=b&&!!S.anisotropyMap,vt=Y&&!!S.clearcoatMap,Yt=Y&&!!S.clearcoatNormalMap,ct=Y&&!!S.clearcoatRoughnessMap,xt=at&&!!S.iridescenceMap,Lt=at&&!!S.iridescenceThicknessMap,Ut=tt&&!!S.sheenColorMap,Mt=tt&&!!S.sheenRoughnessMap,$t=!!S.specularMap,Bt=!!S.specularColorMap,ae=!!S.specularIntensityMap,B=Tt&&!!S.transmissionMap,ft=Tt&&!!S.thicknessMap,Z=!!S.gradientMap,it=!!S.alphaMap,_t=S.alphaTest>0,mt=!!S.alphaHash,zt=!!S.extensions;let me=ri;S.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(me=n.toneMapping);const Ue={shaderID:O,shaderType:S.type,shaderName:S.name,vertexShader:st,fragmentShader:X,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:lt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Dt,batchingColor:Dt&&U._colorsTexture!==null,instancing:Et,instancingColor:Et&&U.instanceColor!==null,instancingMorph:Et&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:rt===null?n.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:ms,alphaToCoverage:!!S.alphaToCoverage,map:re,matcap:Vt,envMap:fe,envMapMode:fe&&q.mapping,envMapCubeUVHeight:N,aoMap:H,lightMap:Ve,bumpMap:Wt,normalMap:Xt,displacementMap:f&&wt,emissiveMap:ce,normalMapObjectSpace:Xt&&S.normalMapType===zd,normalMapTangentSpace:Xt&&S.normalMapType===sl,metalnessMap:It,roughnessMap:R,anisotropy:b,anisotropyMap:pt,clearcoat:Y,clearcoatMap:vt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:ct,dispersion:nt,iridescence:at,iridescenceMap:xt,iridescenceThicknessMap:Lt,sheen:tt,sheenColorMap:Ut,sheenRoughnessMap:Mt,specularMap:$t,specularColorMap:Bt,specularIntensityMap:ae,transmission:Tt,transmissionMap:B,thicknessMap:ft,gradientMap:Z,opaque:S.transparent===!1&&S.blending===rs&&S.alphaToCoverage===!1,alphaMap:it,alphaTest:_t,alphaHash:mt,combine:S.combine,mapUv:re&&_(S.map.channel),aoMapUv:H&&_(S.aoMap.channel),lightMapUv:Ve&&_(S.lightMap.channel),bumpMapUv:Wt&&_(S.bumpMap.channel),normalMapUv:Xt&&_(S.normalMap.channel),displacementMapUv:wt&&_(S.displacementMap.channel),emissiveMapUv:ce&&_(S.emissiveMap.channel),metalnessMapUv:It&&_(S.metalnessMap.channel),roughnessMapUv:R&&_(S.roughnessMap.channel),anisotropyMapUv:pt&&_(S.anisotropyMap.channel),clearcoatMapUv:vt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ut&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Mt&&_(S.sheenRoughnessMap.channel),specularMapUv:$t&&_(S.specularMap.channel),specularColorMapUv:Bt&&_(S.specularColorMap.channel),specularIntensityMapUv:ae&&_(S.specularIntensityMap.channel),transmissionMapUv:B&&_(S.transmissionMap.channel),thicknessMapUv:ft&&_(S.thicknessMap.channel),alphaMapUv:it&&_(S.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(Xt||b),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!F.attributes.uv&&(re||it),fog:!!L,useFog:S.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ut,skinning:U.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:Q,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&E.length>0,shadowMapType:n.shadowMap.type,toneMapping:me,decodeVideoTexture:re&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===ie,decodeVideoTextureEmissive:ce&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===ie,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===zn,flipSided:S.side===Be,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:zt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(zt&&S.extensions.multiDraw===!0||Dt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ue.vertexUv1s=c.has(1),Ue.vertexUv2s=c.has(2),Ue.vertexUv3s=c.has(3),c.clear(),Ue}function d(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const E in S.defines)y.push(E),y.push(S.defines[E]);return S.isRawShaderMaterial===!1&&(x(y,S),M(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function x(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const y=g[S.type];let E;if(y){const D=Mn[y];E=ff.clone(D.uniforms)}else E=S.uniforms;return E}function w(S,y){let E;for(let D=0,U=h.length;D<U;D++){const L=h[D];if(L.cacheKey===y){E=L,++E.usedTimes;break}}return E===void 0&&(E=new Ag(n,y,S,r),h.push(E)),E}function C(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:w,releaseProgram:C,releaseShaderCache:A,programs:h,dispose:P}}function Ig(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Lg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Ac(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Cc(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(u,f,p,g,_,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=m),t++,d}function o(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(u,f,p,g,_,m){const d=a(u,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(u,f){e.length>1&&e.sort(u||Lg),i.length>1&&i.sort(f||Ac),s.length>1&&s.sort(f||Ac)}function h(){for(let u=t,f=n.length;u<f;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Dg(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new Cc,n.set(i,[a])):s>=r.length?(a=new Cc,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Ug(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new Rt};break;case"SpotLight":e={position:new k,direction:new k,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":e={color:new Rt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function Ng(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Fg=0;function zg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function kg(n){const t=new Ug,e=Ng(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new k);const s=new k,r=new Gt,a=new Gt;function o(c){let h=0,u=0,f=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,x=0,M=0,v=0,w=0,C=0,A=0;c.sort(zg);for(let S=0,y=c.length;S<y;S++){const E=c[S],D=E.color,U=E.intensity,L=E.distance,F=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=D.r*U,u+=D.g*U,f+=D.b*U;else if(E.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(E.sh.coefficients[z],U);A++}else if(E.isDirectionalLight){const z=t.get(E);if(z.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const q=E.shadow,N=e.get(E);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,i.directionalShadow[p]=N,i.directionalShadowMap[p]=F,i.directionalShadowMatrix[p]=E.shadow.matrix,x++}i.directional[p]=z,p++}else if(E.isSpotLight){const z=t.get(E);z.position.setFromMatrixPosition(E.matrixWorld),z.color.copy(D).multiplyScalar(U),z.distance=L,z.coneCos=Math.cos(E.angle),z.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),z.decay=E.decay,i.spot[_]=z;const q=E.shadow;if(E.map&&(i.spotLightMap[w]=E.map,w++,q.updateMatrices(E),E.castShadow&&C++),i.spotLightMatrix[_]=q.matrix,E.castShadow){const N=e.get(E);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,i.spotShadow[_]=N,i.spotShadowMap[_]=F,v++}_++}else if(E.isRectAreaLight){const z=t.get(E);z.color.copy(D).multiplyScalar(U),z.halfWidth.set(E.width*.5,0,0),z.halfHeight.set(0,E.height*.5,0),i.rectArea[m]=z,m++}else if(E.isPointLight){const z=t.get(E);if(z.color.copy(E.color).multiplyScalar(E.intensity),z.distance=E.distance,z.decay=E.decay,E.castShadow){const q=E.shadow,N=e.get(E);N.shadowIntensity=q.intensity,N.shadowBias=q.bias,N.shadowNormalBias=q.normalBias,N.shadowRadius=q.radius,N.shadowMapSize=q.mapSize,N.shadowCameraNear=q.camera.near,N.shadowCameraFar=q.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=E.shadow.matrix,M++}i.point[g]=z,g++}else if(E.isHemisphereLight){const z=t.get(E);z.skyColor.copy(E.color).multiplyScalar(U),z.groundColor.copy(E.groundColor).multiplyScalar(U),i.hemi[d]=z,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==m||P.hemiLength!==d||P.numDirectionalShadows!==x||P.numPointShadows!==M||P.numSpotShadows!==v||P.numSpotMaps!==w||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=v+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,P.directionalLength=p,P.pointLength=g,P.spotLength=_,P.rectAreaLength=m,P.hemiLength=d,P.numDirectionalShadows=x,P.numPointShadows=M,P.numSpotShadows=v,P.numSpotMaps=w,P.numLightProbes=A,i.version=Fg++)}function l(c,h){let u=0,f=0,p=0,g=0,_=0;const m=h.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const M=c[d];if(M.isDirectionalLight){const v=i.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=i.spot[p];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const v=i.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Rc(n){const t=new kg(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Og(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Rc(n),t.set(s,[o])):r>=a.length?(o=new Rc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}class Wh extends Di{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Bg extends Di{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Hg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gg=`uniform sampler2D shadow_pass;
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
}`;function Vg(n,t,e){let i=new al;const s=new qt,r=new qt,a=new ve,o=new Wh({depthPacking:Th}),l=new Bg,c={},h=e.maxTextureSize,u={[ai]:Be,[Be]:ai,[zn]:zn},f=new _n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:Hg,fragmentShader:Gg}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ee;g.setAttribute("position",new xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new be(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dh;let d=this.type;this.render=function(C,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const S=n.getRenderTarget(),y=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),D=n.state;D.setBlending(si),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=d!==Nn&&this.type===Nn,L=d===Nn&&this.type!==Nn;for(let F=0,z=C.length;F<z;F++){const q=C[F],N=q.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const O=N.getFrameExtents();if(s.multiply(O),r.copy(N.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,N.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,N.mapSize.y=r.y)),N.map===null||U===!0||L===!0){const $=this.type!==Nn?{minFilter:Qe,magFilter:Qe}:{};N.map!==null&&N.map.dispose(),N.map=new Pi(s.x,s.y,$),N.map.texture.name=q.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();const W=N.getViewportCount();for(let $=0;$<W;$++){const Q=N.getViewport($);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),D.viewport(a),N.updateMatrices(q,$),i=N.getFrustum(),v(A,P,N.camera,q,this.type)}N.isPointLightShadow!==!0&&this.type===Nn&&x(N,P),N.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(S,y,E)};function x(C,A){const P=t.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Pi(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(A,null,P,f,_,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(A,null,P,p,_,null)}function M(C,A,P,S){let y=null;const E=P.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(E!==void 0)y=E;else if(y=P.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const D=y.uuid,U=A.uuid;let L=c[D];L===void 0&&(L={},c[D]=L);let F=L[U];F===void 0&&(F=y.clone(),L[U]=F,A.addEventListener("dispose",w)),y=F}if(y.visible=A.visible,y.wireframe=A.wireframe,S===Nn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const D=n.properties.get(y);D.light=P}return y}function v(C,A,P,S,y){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&y===Nn)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,C.matrixWorld);const U=t.update(C),L=C.material;if(Array.isArray(L)){const F=U.groups;for(let z=0,q=F.length;z<q;z++){const N=F[z],O=L[N.materialIndex];if(O&&O.visible){const W=M(C,O,S,y);C.onBeforeShadow(n,C,A,P,U,W,N),n.renderBufferDirect(P,null,U,W,C,N),C.onAfterShadow(n,C,A,P,U,W,N)}}}else if(L.visible){const F=M(C,L,S,y);C.onBeforeShadow(n,C,A,P,U,F,null),n.renderBufferDirect(P,null,U,F,C,null),C.onAfterShadow(n,C,A,P,U,F,null)}}const D=C.children;for(let U=0,L=D.length;U<L;U++)v(D[U],A,P,S,y)}function w(C){C.target.removeEventListener("dispose",w);for(const P in c){const S=c[P],y=C.target.uuid;y in S&&(S[y].dispose(),delete S[y])}}}const Wg={[ao]:oo,[lo]:uo,[co]:fo,[cs]:ho,[oo]:ao,[uo]:lo,[fo]:co,[ho]:cs};function Xg(n,t){function e(){let B=!1;const ft=new ve;let Z=null;const it=new ve(0,0,0,0);return{setMask:function(_t){Z!==_t&&!B&&(n.colorMask(_t,_t,_t,_t),Z=_t)},setLocked:function(_t){B=_t},setClear:function(_t,mt,zt,me,Ue){Ue===!0&&(_t*=me,mt*=me,zt*=me),ft.set(_t,mt,zt,me),it.equals(ft)===!1&&(n.clearColor(_t,mt,zt,me),it.copy(ft))},reset:function(){B=!1,Z=null,it.set(-1,0,0,0)}}}function i(){let B=!1,ft=!1,Z=null,it=null,_t=null;return{setReversed:function(mt){if(ft!==mt){const zt=t.get("EXT_clip_control");ft?zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.ZERO_TO_ONE_EXT):zt.clipControlEXT(zt.LOWER_LEFT_EXT,zt.NEGATIVE_ONE_TO_ONE_EXT);const me=_t;_t=null,this.setClear(me)}ft=mt},getReversed:function(){return ft},setTest:function(mt){mt?rt(n.DEPTH_TEST):ut(n.DEPTH_TEST)},setMask:function(mt){Z!==mt&&!B&&(n.depthMask(mt),Z=mt)},setFunc:function(mt){if(ft&&(mt=Wg[mt]),it!==mt){switch(mt){case ao:n.depthFunc(n.NEVER);break;case oo:n.depthFunc(n.ALWAYS);break;case lo:n.depthFunc(n.LESS);break;case cs:n.depthFunc(n.LEQUAL);break;case co:n.depthFunc(n.EQUAL);break;case ho:n.depthFunc(n.GEQUAL);break;case uo:n.depthFunc(n.GREATER);break;case fo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}it=mt}},setLocked:function(mt){B=mt},setClear:function(mt){_t!==mt&&(ft&&(mt=1-mt),n.clearDepth(mt),_t=mt)},reset:function(){B=!1,Z=null,it=null,_t=null,ft=!1}}}function s(){let B=!1,ft=null,Z=null,it=null,_t=null,mt=null,zt=null,me=null,Ue=null;return{setTest:function(ee){B||(ee?rt(n.STENCIL_TEST):ut(n.STENCIL_TEST))},setMask:function(ee){ft!==ee&&!B&&(n.stencilMask(ee),ft=ee)},setFunc:function(ee,on,Rn){(Z!==ee||it!==on||_t!==Rn)&&(n.stencilFunc(ee,on,Rn),Z=ee,it=on,_t=Rn)},setOp:function(ee,on,Rn){(mt!==ee||zt!==on||me!==Rn)&&(n.stencilOp(ee,on,Rn),mt=ee,zt=on,me=Rn)},setLocked:function(ee){B=ee},setClear:function(ee){Ue!==ee&&(n.clearStencil(ee),Ue=ee)},reset:function(){B=!1,ft=null,Z=null,it=null,_t=null,mt=null,zt=null,me=null,Ue=null}}}const r=new e,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,v=null,w=null,C=null,A=new Rt(0,0,0),P=0,S=!1,y=null,E=null,D=null,U=null,L=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,q=0;const N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(N)[1]),z=q>=1):N.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),z=q>=2);let O=null,W={};const $=n.getParameter(n.SCISSOR_BOX),Q=n.getParameter(n.VIEWPORT),st=new ve().fromArray($),X=new ve().fromArray(Q);function et(B,ft,Z,it){const _t=new Uint8Array(4),mt=n.createTexture();n.bindTexture(B,mt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let zt=0;zt<Z;zt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(ft,0,n.RGBA,1,1,it,0,n.RGBA,n.UNSIGNED_BYTE,_t):n.texImage2D(ft+zt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_t);return mt}const lt={};lt[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),lt[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),lt[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),lt[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),rt(n.DEPTH_TEST),a.setFunc(cs),Wt(!1),Xt(Ll),rt(n.CULL_FACE),H(si);function rt(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function ut(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function Et(B,ft){return u[B]!==ft?(n.bindFramebuffer(B,ft),u[B]=ft,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ft),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ft),!0):!1}function Dt(B,ft){let Z=p,it=!1;if(B){Z=f.get(ft),Z===void 0&&(Z=[],f.set(ft,Z));const _t=B.textures;if(Z.length!==_t.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let mt=0,zt=_t.length;mt<zt;mt++)Z[mt]=n.COLOR_ATTACHMENT0+mt;Z.length=_t.length,it=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,it=!0);it&&n.drawBuffers(Z)}function re(B){return g!==B?(n.useProgram(B),g=B,!0):!1}const Vt={[yi]:n.FUNC_ADD,[hd]:n.FUNC_SUBTRACT,[ud]:n.FUNC_REVERSE_SUBTRACT};Vt[dd]=n.MIN,Vt[fd]=n.MAX;const fe={[pd]:n.ZERO,[md]:n.ONE,[gd]:n.SRC_COLOR,[so]:n.SRC_ALPHA,[Sd]:n.SRC_ALPHA_SATURATE,[Md]:n.DST_COLOR,[vd]:n.DST_ALPHA,[_d]:n.ONE_MINUS_SRC_COLOR,[ro]:n.ONE_MINUS_SRC_ALPHA,[yd]:n.ONE_MINUS_DST_COLOR,[xd]:n.ONE_MINUS_DST_ALPHA,[bd]:n.CONSTANT_COLOR,[Ed]:n.ONE_MINUS_CONSTANT_COLOR,[Td]:n.CONSTANT_ALPHA,[Ad]:n.ONE_MINUS_CONSTANT_ALPHA};function H(B,ft,Z,it,_t,mt,zt,me,Ue,ee){if(B===si){_===!0&&(ut(n.BLEND),_=!1);return}if(_===!1&&(rt(n.BLEND),_=!0),B!==cd){if(B!==m||ee!==S){if((d!==yi||v!==yi)&&(n.blendEquation(n.FUNC_ADD),d=yi,v=yi),ee)switch(B){case rs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dl:n.blendFunc(n.ONE,n.ONE);break;case Ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case rs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Dl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ul:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Nl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}x=null,M=null,w=null,C=null,A.set(0,0,0),P=0,m=B,S=ee}return}_t=_t||ft,mt=mt||Z,zt=zt||it,(ft!==d||_t!==v)&&(n.blendEquationSeparate(Vt[ft],Vt[_t]),d=ft,v=_t),(Z!==x||it!==M||mt!==w||zt!==C)&&(n.blendFuncSeparate(fe[Z],fe[it],fe[mt],fe[zt]),x=Z,M=it,w=mt,C=zt),(me.equals(A)===!1||Ue!==P)&&(n.blendColor(me.r,me.g,me.b,Ue),A.copy(me),P=Ue),m=B,S=!1}function Ve(B,ft){B.side===zn?ut(n.CULL_FACE):rt(n.CULL_FACE);let Z=B.side===Be;ft&&(Z=!Z),Wt(Z),B.blending===rs&&B.transparent===!1?H(si):H(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),a.setFunc(B.depthFunc),a.setTest(B.depthTest),a.setMask(B.depthWrite),r.setMask(B.colorWrite);const it=B.stencilWrite;o.setTest(it),it&&(o.setMask(B.stencilWriteMask),o.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),o.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),ce(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?rt(n.SAMPLE_ALPHA_TO_COVERAGE):ut(n.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(B){y!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),y=B)}function Xt(B){B!==od?(rt(n.CULL_FACE),B!==E&&(B===Ll?n.cullFace(n.BACK):B===ld?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ut(n.CULL_FACE),E=B}function wt(B){B!==D&&(z&&n.lineWidth(B),D=B)}function ce(B,ft,Z){B?(rt(n.POLYGON_OFFSET_FILL),(U!==ft||L!==Z)&&(n.polygonOffset(ft,Z),U=ft,L=Z)):ut(n.POLYGON_OFFSET_FILL)}function It(B){B?rt(n.SCISSOR_TEST):ut(n.SCISSOR_TEST)}function R(B){B===void 0&&(B=n.TEXTURE0+F-1),O!==B&&(n.activeTexture(B),O=B)}function b(B,ft,Z){Z===void 0&&(O===null?Z=n.TEXTURE0+F-1:Z=O);let it=W[Z];it===void 0&&(it={type:void 0,texture:void 0},W[Z]=it),(it.type!==B||it.texture!==ft)&&(O!==Z&&(n.activeTexture(Z),O=Z),n.bindTexture(B,ft||lt[B]),it.type=B,it.texture=ft)}function Y(){const B=W[O];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function nt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function tt(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Tt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function pt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function vt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Yt(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ut(B){st.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),st.copy(B))}function Mt(B){X.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),X.copy(B))}function $t(B,ft){let Z=c.get(ft);Z===void 0&&(Z=new WeakMap,c.set(ft,Z));let it=Z.get(B);it===void 0&&(it=n.getUniformBlockIndex(ft,B.name),Z.set(B,it))}function Bt(B,ft){const it=c.get(ft).get(B);l.get(ft)!==it&&(n.uniformBlockBinding(ft,it,B.__bindingPointIndex),l.set(ft,it))}function ae(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},O=null,W={},u={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,x=null,M=null,v=null,w=null,C=null,A=new Rt(0,0,0),P=0,S=!1,y=null,E=null,D=null,U=null,L=null,st.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:rt,disable:ut,bindFramebuffer:Et,drawBuffers:Dt,useProgram:re,setBlending:H,setMaterial:Ve,setFlipSided:Wt,setCullFace:Xt,setLineWidth:wt,setPolygonOffset:ce,setScissorTest:It,activeTexture:R,bindTexture:b,unbindTexture:Y,compressedTexImage2D:nt,compressedTexImage3D:at,texImage2D:xt,texImage3D:Lt,updateUBOMapping:$t,uniformBlockBinding:Bt,texStorage2D:Yt,texStorage3D:ct,texSubImage2D:tt,texSubImage3D:Tt,compressedTexSubImage2D:pt,compressedTexSubImage3D:vt,scissor:Ut,viewport:Mt,reset:ae}}function wc(n,t,e,i){const s=qg(i);switch(e){case xh:return n*t;case yh:return n*t;case Sh:return n*t*2;case na:return n*t/s.components*s.byteLength;case el:return n*t/s.components*s.byteLength;case bh:return n*t*2/s.components*s.byteLength;case nl:return n*t*2/s.components*s.byteLength;case Mh:return n*t*3/s.components*s.byteLength;case gn:return n*t*4/s.components*s.byteLength;case il:return n*t*4/s.components*s.byteLength;case Fr:case zr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case kr:case Or:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case xo:case yo:return Math.max(n,16)*Math.max(t,8)/4;case vo:case Mo:return Math.max(n,8)*Math.max(t,8)/2;case So:case bo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Eo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Co:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case wo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Io:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Lo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case No:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case zo:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ko:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case Br:case Oo:case Bo:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Eh:case Ho:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Go:case Vo:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function qg(n){switch(n){case Cn:case gh:return{byteLength:1,components:1};case Xs:case _h:case Zs:return{byteLength:2,components:1};case Qo:case tl:return{byteLength:2,components:4};case wi:case Jo:case Sn:return{byteLength:4,components:1};case vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function $g(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,h=new WeakMap;let u;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return p?new OffscreenCanvas(R,b):$r("canvas")}function _(R,b,Y){let nt=1;const at=It(R);if((at.width>Y||at.height>Y)&&(nt=Y/Math.max(at.width,at.height)),nt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const tt=Math.floor(nt*at.width),Tt=Math.floor(nt*at.height);u===void 0&&(u=g(tt,Tt));const pt=b?g(tt,Tt):u;return pt.width=tt,pt.height=Tt,pt.getContext("2d").drawImage(R,0,0,tt,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+tt+"x"+Tt+")."),pt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),R;return R}function m(R){return R.generateMipmaps}function d(R){n.generateMipmap(R)}function x(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function M(R,b,Y,nt,at=!1){if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let tt=b;if(b===n.RED&&(Y===n.FLOAT&&(tt=n.R32F),Y===n.HALF_FLOAT&&(tt=n.R16F),Y===n.UNSIGNED_BYTE&&(tt=n.R8)),b===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(tt=n.R8UI),Y===n.UNSIGNED_SHORT&&(tt=n.R16UI),Y===n.UNSIGNED_INT&&(tt=n.R32UI),Y===n.BYTE&&(tt=n.R8I),Y===n.SHORT&&(tt=n.R16I),Y===n.INT&&(tt=n.R32I)),b===n.RG&&(Y===n.FLOAT&&(tt=n.RG32F),Y===n.HALF_FLOAT&&(tt=n.RG16F),Y===n.UNSIGNED_BYTE&&(tt=n.RG8)),b===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(tt=n.RG8UI),Y===n.UNSIGNED_SHORT&&(tt=n.RG16UI),Y===n.UNSIGNED_INT&&(tt=n.RG32UI),Y===n.BYTE&&(tt=n.RG8I),Y===n.SHORT&&(tt=n.RG16I),Y===n.INT&&(tt=n.RG32I)),b===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(tt=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(tt=n.RGB16UI),Y===n.UNSIGNED_INT&&(tt=n.RGB32UI),Y===n.BYTE&&(tt=n.RGB8I),Y===n.SHORT&&(tt=n.RGB16I),Y===n.INT&&(tt=n.RGB32I)),b===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(tt=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(tt=n.RGBA16UI),Y===n.UNSIGNED_INT&&(tt=n.RGBA32UI),Y===n.BYTE&&(tt=n.RGBA8I),Y===n.SHORT&&(tt=n.RGBA16I),Y===n.INT&&(tt=n.RGBA32I)),b===n.RGB&&Y===n.UNSIGNED_INT_5_9_9_9_REV&&(tt=n.RGB9_E5),b===n.RGBA){const Tt=at?ia:Kt.getTransfer(nt);Y===n.FLOAT&&(tt=n.RGBA32F),Y===n.HALF_FLOAT&&(tt=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(tt=Tt===ie?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT_4_4_4_4&&(tt=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(tt=n.RGB5_A1)}return(tt===n.R16F||tt===n.R32F||tt===n.RG16F||tt===n.RG32F||tt===n.RGBA16F||tt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function v(R,b){let Y;return R?b===null||b===wi||b===ds?Y=n.DEPTH24_STENCIL8:b===Sn?Y=n.DEPTH32F_STENCIL8:b===Xs&&(Y=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===wi||b===ds?Y=n.DEPTH_COMPONENT24:b===Sn?Y=n.DEPTH_COMPONENT32F:b===Xs&&(Y=n.DEPTH_COMPONENT16),Y}function w(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==Qe&&R.minFilter!==mn?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function C(R){const b=R.target;b.removeEventListener("dispose",C),P(b),b.isVideoTexture&&h.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),y(b)}function P(R){const b=i.get(R);if(b.__webglInit===void 0)return;const Y=R.source,nt=f.get(Y);if(nt){const at=nt[b.__cacheKey];at.usedTimes--,at.usedTimes===0&&S(R),Object.keys(nt).length===0&&f.delete(Y)}i.remove(R)}function S(R){const b=i.get(R);n.deleteTexture(b.__webglTexture);const Y=R.source,nt=f.get(Y);delete nt[b.__cacheKey],a.memory.textures--}function y(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(b.__webglFramebuffer[nt]))for(let at=0;at<b.__webglFramebuffer[nt].length;at++)n.deleteFramebuffer(b.__webglFramebuffer[nt][at]);else n.deleteFramebuffer(b.__webglFramebuffer[nt]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[nt])}else{if(Array.isArray(b.__webglFramebuffer))for(let nt=0;nt<b.__webglFramebuffer.length;nt++)n.deleteFramebuffer(b.__webglFramebuffer[nt]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let nt=0;nt<b.__webglColorRenderbuffer.length;nt++)b.__webglColorRenderbuffer[nt]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[nt]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const Y=R.textures;for(let nt=0,at=Y.length;nt<at;nt++){const tt=i.get(Y[nt]);tt.__webglTexture&&(n.deleteTexture(tt.__webglTexture),a.memory.textures--),i.remove(Y[nt])}i.remove(R)}let E=0;function D(){E=0}function U(){const R=E;return R>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+s.maxTextures),E+=1,R}function L(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function F(R,b){const Y=i.get(R);if(R.isVideoTexture&&wt(R),R.isRenderTargetTexture===!1&&R.version>0&&Y.__version!==R.version){const nt=R.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(Y,R,b);return}}e.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+b)}function z(R,b){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){X(Y,R,b);return}e.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+b)}function q(R,b){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){X(Y,R,b);return}e.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+b)}function N(R,b){const Y=i.get(R);if(R.version>0&&Y.__version!==R.version){et(Y,R,b);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+b)}const O={[go]:n.REPEAT,[Ei]:n.CLAMP_TO_EDGE,[_o]:n.MIRRORED_REPEAT},W={[Qe]:n.NEAREST,[Nd]:n.NEAREST_MIPMAP_NEAREST,[rr]:n.NEAREST_MIPMAP_LINEAR,[mn]:n.LINEAR,[fa]:n.LINEAR_MIPMAP_NEAREST,[Ti]:n.LINEAR_MIPMAP_LINEAR},$={[kd]:n.NEVER,[Wd]:n.ALWAYS,[Od]:n.LESS,[Ah]:n.LEQUAL,[Bd]:n.EQUAL,[Vd]:n.GEQUAL,[Hd]:n.GREATER,[Gd]:n.NOTEQUAL};function Q(R,b){if(b.type===Sn&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===mn||b.magFilter===fa||b.magFilter===rr||b.magFilter===Ti||b.minFilter===mn||b.minFilter===fa||b.minFilter===rr||b.minFilter===Ti)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,O[b.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,O[b.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,O[b.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,W[b.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,W[b.minFilter]),b.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,$[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Qe||b.minFilter!==rr&&b.minFilter!==Ti||b.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function st(R,b){let Y=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",C));const nt=b.source;let at=f.get(nt);at===void 0&&(at={},f.set(nt,at));const tt=L(b);if(tt!==R.__cacheKey){at[tt]===void 0&&(at[tt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),at[tt].usedTimes++;const Tt=at[R.__cacheKey];Tt!==void 0&&(at[R.__cacheKey].usedTimes--,Tt.usedTimes===0&&S(b)),R.__cacheKey=tt,R.__webglTexture=at[tt].texture}return Y}function X(R,b,Y){let nt=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(nt=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(nt=n.TEXTURE_3D);const at=st(R,b),tt=b.source;e.bindTexture(nt,R.__webglTexture,n.TEXTURE0+Y);const Tt=i.get(tt);if(tt.version!==Tt.__version||at===!0){e.activeTexture(n.TEXTURE0+Y);const pt=Kt.getPrimaries(Kt.workingColorSpace),vt=b.colorSpace===ni?null:Kt.getPrimaries(b.colorSpace),Yt=b.colorSpace===ni||pt===vt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let ct=_(b.image,!1,s.maxTextureSize);ct=ce(b,ct);const xt=r.convert(b.format,b.colorSpace),Lt=r.convert(b.type);let Ut=M(b.internalFormat,xt,Lt,b.colorSpace,b.isVideoTexture);Q(nt,b);let Mt;const $t=b.mipmaps,Bt=b.isVideoTexture!==!0,ae=Tt.__version===void 0||at===!0,B=tt.dataReady,ft=w(b,ct);if(b.isDepthTexture)Ut=v(b.format===fs,b.type),ae&&(Bt?e.texStorage2D(n.TEXTURE_2D,1,Ut,ct.width,ct.height):e.texImage2D(n.TEXTURE_2D,0,Ut,ct.width,ct.height,0,xt,Lt,null));else if(b.isDataTexture)if($t.length>0){Bt&&ae&&e.texStorage2D(n.TEXTURE_2D,ft,Ut,$t[0].width,$t[0].height);for(let Z=0,it=$t.length;Z<it;Z++)Mt=$t[Z],Bt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,Mt.width,Mt.height,xt,Lt,Mt.data):e.texImage2D(n.TEXTURE_2D,Z,Ut,Mt.width,Mt.height,0,xt,Lt,Mt.data);b.generateMipmaps=!1}else Bt?(ae&&e.texStorage2D(n.TEXTURE_2D,ft,Ut,ct.width,ct.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ct.width,ct.height,xt,Lt,ct.data)):e.texImage2D(n.TEXTURE_2D,0,Ut,ct.width,ct.height,0,xt,Lt,ct.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Bt&&ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Ut,$t[0].width,$t[0].height,ct.depth);for(let Z=0,it=$t.length;Z<it;Z++)if(Mt=$t[Z],b.format!==gn)if(xt!==null)if(Bt){if(B)if(b.layerUpdates.size>0){const _t=wc(Mt.width,Mt.height,b.format,b.type);for(const mt of b.layerUpdates){const zt=Mt.data.subarray(mt*_t/Mt.data.BYTES_PER_ELEMENT,(mt+1)*_t/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,mt,Mt.width,Mt.height,1,xt,zt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,Mt.width,Mt.height,ct.depth,xt,Mt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,Ut,Mt.width,Mt.height,ct.depth,0,Mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,Mt.width,Mt.height,ct.depth,xt,Lt,Mt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Z,Ut,Mt.width,Mt.height,ct.depth,0,xt,Lt,Mt.data)}else{Bt&&ae&&e.texStorage2D(n.TEXTURE_2D,ft,Ut,$t[0].width,$t[0].height);for(let Z=0,it=$t.length;Z<it;Z++)Mt=$t[Z],b.format!==gn?xt!==null?Bt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,Mt.width,Mt.height,xt,Mt.data):e.compressedTexImage2D(n.TEXTURE_2D,Z,Ut,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,Mt.width,Mt.height,xt,Lt,Mt.data):e.texImage2D(n.TEXTURE_2D,Z,Ut,Mt.width,Mt.height,0,xt,Lt,Mt.data)}else if(b.isDataArrayTexture)if(Bt){if(ae&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ft,Ut,ct.width,ct.height,ct.depth),B)if(b.layerUpdates.size>0){const Z=wc(ct.width,ct.height,b.format,b.type);for(const it of b.layerUpdates){const _t=ct.data.subarray(it*Z/ct.data.BYTES_PER_ELEMENT,(it+1)*Z/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,it,ct.width,ct.height,1,xt,Lt,_t)}b.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,xt,Lt,ct.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ut,ct.width,ct.height,ct.depth,0,xt,Lt,ct.data);else if(b.isData3DTexture)Bt?(ae&&e.texStorage3D(n.TEXTURE_3D,ft,Ut,ct.width,ct.height,ct.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,xt,Lt,ct.data)):e.texImage3D(n.TEXTURE_3D,0,Ut,ct.width,ct.height,ct.depth,0,xt,Lt,ct.data);else if(b.isFramebufferTexture){if(ae)if(Bt)e.texStorage2D(n.TEXTURE_2D,ft,Ut,ct.width,ct.height);else{let Z=ct.width,it=ct.height;for(let _t=0;_t<ft;_t++)e.texImage2D(n.TEXTURE_2D,_t,Ut,Z,it,0,xt,Lt,null),Z>>=1,it>>=1}}else if($t.length>0){if(Bt&&ae){const Z=It($t[0]);e.texStorage2D(n.TEXTURE_2D,ft,Ut,Z.width,Z.height)}for(let Z=0,it=$t.length;Z<it;Z++)Mt=$t[Z],Bt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,xt,Lt,Mt):e.texImage2D(n.TEXTURE_2D,Z,Ut,xt,Lt,Mt);b.generateMipmaps=!1}else if(Bt){if(ae){const Z=It(ct);e.texStorage2D(n.TEXTURE_2D,ft,Ut,Z.width,Z.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,xt,Lt,ct)}else e.texImage2D(n.TEXTURE_2D,0,Ut,xt,Lt,ct);m(b)&&d(nt),Tt.__version=tt.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function et(R,b,Y){if(b.image.length!==6)return;const nt=st(R,b),at=b.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+Y);const tt=i.get(at);if(at.version!==tt.__version||nt===!0){e.activeTexture(n.TEXTURE0+Y);const Tt=Kt.getPrimaries(Kt.workingColorSpace),pt=b.colorSpace===ni?null:Kt.getPrimaries(b.colorSpace),vt=b.colorSpace===ni||Tt===pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);const Yt=b.isCompressedTexture||b.image[0].isCompressedTexture,ct=b.image[0]&&b.image[0].isDataTexture,xt=[];for(let it=0;it<6;it++)!Yt&&!ct?xt[it]=_(b.image[it],!0,s.maxCubemapSize):xt[it]=ct?b.image[it].image:b.image[it],xt[it]=ce(b,xt[it]);const Lt=xt[0],Ut=r.convert(b.format,b.colorSpace),Mt=r.convert(b.type),$t=M(b.internalFormat,Ut,Mt,b.colorSpace),Bt=b.isVideoTexture!==!0,ae=tt.__version===void 0||nt===!0,B=at.dataReady;let ft=w(b,Lt);Q(n.TEXTURE_CUBE_MAP,b);let Z;if(Yt){Bt&&ae&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,$t,Lt.width,Lt.height);for(let it=0;it<6;it++){Z=xt[it].mipmaps;for(let _t=0;_t<Z.length;_t++){const mt=Z[_t];b.format!==gn?Ut!==null?Bt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t,0,0,mt.width,mt.height,Ut,mt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t,$t,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t,0,0,mt.width,mt.height,Ut,Mt,mt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t,$t,mt.width,mt.height,0,Ut,Mt,mt.data)}}}else{if(Z=b.mipmaps,Bt&&ae){Z.length>0&&ft++;const it=It(xt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,ft,$t,it.width,it.height)}for(let it=0;it<6;it++)if(ct){Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,xt[it].width,xt[it].height,Ut,Mt,xt[it].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,$t,xt[it].width,xt[it].height,0,Ut,Mt,xt[it].data);for(let _t=0;_t<Z.length;_t++){const zt=Z[_t].image[it].image;Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t+1,0,0,zt.width,zt.height,Ut,Mt,zt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t+1,$t,zt.width,zt.height,0,Ut,Mt,zt.data)}}else{Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Ut,Mt,xt[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,$t,Ut,Mt,xt[it]);for(let _t=0;_t<Z.length;_t++){const mt=Z[_t];Bt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t+1,0,0,Ut,Mt,mt.image[it]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+it,_t+1,$t,Ut,Mt,mt.image[it])}}}m(b)&&d(n.TEXTURE_CUBE_MAP),tt.__version=at.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function lt(R,b,Y,nt,at,tt){const Tt=r.convert(Y.format,Y.colorSpace),pt=r.convert(Y.type),vt=M(Y.internalFormat,Tt,pt,Y.colorSpace),Yt=i.get(b),ct=i.get(Y);if(ct.__renderTarget=b,!Yt.__hasExternalTextures){const xt=Math.max(1,b.width>>tt),Lt=Math.max(1,b.height>>tt);at===n.TEXTURE_3D||at===n.TEXTURE_2D_ARRAY?e.texImage3D(at,tt,vt,xt,Lt,b.depth,0,Tt,pt,null):e.texImage2D(at,tt,vt,xt,Lt,0,Tt,pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),Xt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,nt,at,ct.__webglTexture,0,Wt(b)):(at===n.TEXTURE_2D||at>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,nt,at,ct.__webglTexture,tt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(R,b,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,R),b.depthBuffer){const nt=b.depthTexture,at=nt&&nt.isDepthTexture?nt.type:null,tt=v(b.stencilBuffer,at),Tt=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=Wt(b);Xt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt,tt,b.width,b.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt,tt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,tt,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Tt,n.RENDERBUFFER,R)}else{const nt=b.textures;for(let at=0;at<nt.length;at++){const tt=nt[at],Tt=r.convert(tt.format,tt.colorSpace),pt=r.convert(tt.type),vt=M(tt.internalFormat,Tt,pt,tt.colorSpace),Yt=Wt(b);Y&&Xt(b)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,vt,b.width,b.height):Xt(b)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Yt,vt,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,vt,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ut(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const nt=i.get(b.depthTexture);nt.__renderTarget=b,(!nt.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),F(b.depthTexture,0);const at=nt.__webglTexture,tt=Wt(b);if(b.depthTexture.format===as)Xt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,at,0);else if(b.depthTexture.format===fs)Xt(b)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0,tt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function Et(R){const b=i.get(R),Y=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const nt=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),nt){const at=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,nt.removeEventListener("dispose",at)};nt.addEventListener("dispose",at),b.__depthDisposeCallback=at}b.__boundDepthTexture=nt}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ut(b.__webglFramebuffer,R)}else if(Y){b.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[nt]),b.__webglDepthbuffer[nt]===void 0)b.__webglDepthbuffer[nt]=n.createRenderbuffer(),rt(b.__webglDepthbuffer[nt],R,!1);else{const at=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer[nt];n.bindRenderbuffer(n.RENDERBUFFER,tt),n.framebufferRenderbuffer(n.FRAMEBUFFER,at,n.RENDERBUFFER,tt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),rt(b.__webglDepthbuffer,R,!1);else{const nt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,at=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,at),n.framebufferRenderbuffer(n.FRAMEBUFFER,nt,n.RENDERBUFFER,at)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Dt(R,b,Y){const nt=i.get(R);b!==void 0&&lt(nt.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&Et(R)}function re(R){const b=R.texture,Y=i.get(R),nt=i.get(b);R.addEventListener("dispose",A);const at=R.textures,tt=R.isWebGLCubeRenderTarget===!0,Tt=at.length>1;if(Tt||(nt.__webglTexture===void 0&&(nt.__webglTexture=n.createTexture()),nt.__version=b.version,a.memory.textures++),tt){Y.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer[pt]=[];for(let vt=0;vt<b.mipmaps.length;vt++)Y.__webglFramebuffer[pt][vt]=n.createFramebuffer()}else Y.__webglFramebuffer[pt]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){Y.__webglFramebuffer=[];for(let pt=0;pt<b.mipmaps.length;pt++)Y.__webglFramebuffer[pt]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(Tt)for(let pt=0,vt=at.length;pt<vt;pt++){const Yt=i.get(at[pt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&Xt(R)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let pt=0;pt<at.length;pt++){const vt=at[pt];Y.__webglColorRenderbuffer[pt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[pt]);const Yt=r.convert(vt.format,vt.colorSpace),ct=r.convert(vt.type),xt=M(vt.internalFormat,Yt,ct,vt.colorSpace,R.isXRRenderTarget===!0),Lt=Wt(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Lt,xt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pt,n.RENDERBUFFER,Y.__webglColorRenderbuffer[pt])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),rt(Y.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(tt){e.bindTexture(n.TEXTURE_CUBE_MAP,nt.__webglTexture),Q(n.TEXTURE_CUBE_MAP,b);for(let pt=0;pt<6;pt++)if(b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)lt(Y.__webglFramebuffer[pt][vt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,vt);else lt(Y.__webglFramebuffer[pt],R,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(b)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let pt=0,vt=at.length;pt<vt;pt++){const Yt=at[pt],ct=i.get(Yt);e.bindTexture(n.TEXTURE_2D,ct.__webglTexture),Q(n.TEXTURE_2D,Yt),lt(Y.__webglFramebuffer,R,Yt,n.COLOR_ATTACHMENT0+pt,n.TEXTURE_2D,0),m(Yt)&&d(n.TEXTURE_2D)}e.unbindTexture()}else{let pt=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(pt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(pt,nt.__webglTexture),Q(pt,b),b.mipmaps&&b.mipmaps.length>0)for(let vt=0;vt<b.mipmaps.length;vt++)lt(Y.__webglFramebuffer[vt],R,b,n.COLOR_ATTACHMENT0,pt,vt);else lt(Y.__webglFramebuffer,R,b,n.COLOR_ATTACHMENT0,pt,0);m(b)&&d(pt),e.unbindTexture()}R.depthBuffer&&Et(R)}function Vt(R){const b=R.textures;for(let Y=0,nt=b.length;Y<nt;Y++){const at=b[Y];if(m(at)){const tt=x(R),Tt=i.get(at).__webglTexture;e.bindTexture(tt,Tt),d(tt),e.unbindTexture()}}}const fe=[],H=[];function Ve(R){if(R.samples>0){if(Xt(R)===!1){const b=R.textures,Y=R.width,nt=R.height;let at=n.COLOR_BUFFER_BIT;const tt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Tt=i.get(R),pt=b.length>1;if(pt)for(let vt=0;vt<b.length;vt++)e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let vt=0;vt<b.length;vt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(at|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(at|=n.STENCIL_BUFFER_BIT)),pt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Yt=i.get(b[vt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Yt,0)}n.blitFramebuffer(0,0,Y,nt,0,0,Y,nt,at,n.NEAREST),l===!0&&(fe.length=0,H.length=0,fe.push(n.COLOR_ATTACHMENT0+vt),R.depthBuffer&&R.resolveDepthBuffer===!1&&(fe.push(tt),H.push(tt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,H)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pt)for(let vt=0;vt<b.length;vt++){e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.RENDERBUFFER,Tt.__webglColorRenderbuffer[vt]);const Yt=i.get(b[vt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Tt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+vt,n.TEXTURE_2D,Yt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function Wt(R){return Math.min(s.maxSamples,R.samples)}function Xt(R){const b=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function wt(R){const b=a.render.frame;h.get(R)!==b&&(h.set(R,b),R.update())}function ce(R,b){const Y=R.colorSpace,nt=R.format,at=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||Y!==ms&&Y!==ni&&(Kt.getTransfer(Y)===ie?(nt!==gn||at!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),b}function It(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=D,this.setTexture2D=F,this.setTexture2DArray=z,this.setTexture3D=q,this.setTextureCube=N,this.rebindTextures=Dt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=Vt,this.updateMultisampleRenderTarget=Ve,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=lt,this.useMultisampledRTT=Xt}function Yg(n,t){function e(i,s=ni){let r;const a=Kt.getTransfer(s);if(i===Cn)return n.UNSIGNED_BYTE;if(i===Qo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===tl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===gh)return n.BYTE;if(i===_h)return n.SHORT;if(i===Xs)return n.UNSIGNED_SHORT;if(i===Jo)return n.INT;if(i===wi)return n.UNSIGNED_INT;if(i===Sn)return n.FLOAT;if(i===Zs)return n.HALF_FLOAT;if(i===xh)return n.ALPHA;if(i===Mh)return n.RGB;if(i===gn)return n.RGBA;if(i===yh)return n.LUMINANCE;if(i===Sh)return n.LUMINANCE_ALPHA;if(i===as)return n.DEPTH_COMPONENT;if(i===fs)return n.DEPTH_STENCIL;if(i===na)return n.RED;if(i===el)return n.RED_INTEGER;if(i===bh)return n.RG;if(i===nl)return n.RG_INTEGER;if(i===il)return n.RGBA_INTEGER;if(i===Fr||i===zr||i===kr||i===Or)if(a===ie)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===kr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Or)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===vo||i===xo||i===Mo||i===yo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Mo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===So||i===bo||i===Eo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===So||i===bo)return a===ie?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Eo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===To||i===Ao||i===Co||i===Ro||i===wo||i===Po||i===Io||i===Lo||i===Do||i===Uo||i===No||i===Fo||i===zo||i===ko)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===To)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ao)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Co)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ro)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Po)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Io)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Do)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===No)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zo)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ko)return a===ie?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Br||i===Oo||i===Bo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Br)return a===ie?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Oo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Eh||i===Ho||i===Go||i===Vo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Br)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Go)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Vo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ds?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Kg extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class bn extends Le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jg={type:"move"};class Ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(jg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new bn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const Zg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jg=`
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

}`;class Qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new He,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new _n({vertexShader:Zg,fragmentShader:Jg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new ci(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t_ extends gs{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,p=null,g=null;const _=new Qg,m=e.getContextAttributes();let d=null,x=null;const M=[],v=[],w=new qt;let C=null;const A=new rn;A.viewport=new ve;const P=new rn;P.viewport=new ve;const S=[A,P],y=new Kg;let E=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let et=M[X];return et===void 0&&(et=new Ga,M[X]=et),et.getTargetRaySpace()},this.getControllerGrip=function(X){let et=M[X];return et===void 0&&(et=new Ga,M[X]=et),et.getGripSpace()},this.getHand=function(X){let et=M[X];return et===void 0&&(et=new Ga,M[X]=et),et.getHandSpace()};function U(X){const et=v.indexOf(X.inputSource);if(et===-1)return;const lt=M[et];lt!==void 0&&(lt.update(X.inputSource,X.frame,c||a),lt.dispatchEvent({type:X.type,data:X.inputSource}))}function L(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",F);for(let X=0;X<M.length;X++){const et=v[X];et!==null&&(v[X]=null,M[X].disconnect(et))}E=null,D=null,_.reset(),t.setRenderTarget(d),p=null,f=null,u=null,s=null,x=null,st.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",L),s.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(w),s.renderState.layers===void 0){const et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Pi(p.framebufferWidth,p.framebufferHeight,{format:gn,type:Cn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let et=null,lt=null,rt=null;m.depth&&(rt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?fs:as,lt=m.stencil?ds:wi);const ut={colorFormat:e.RGBA8,depthFormat:rt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ut),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),x=new Pi(f.textureWidth,f.textureHeight,{format:gn,type:Cn,depthTexture:new Oh(f.textureWidth,f.textureHeight,lt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),st.setContext(s),st.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function F(X){for(let et=0;et<X.removed.length;et++){const lt=X.removed[et],rt=v.indexOf(lt);rt>=0&&(v[rt]=null,M[rt].disconnect(lt))}for(let et=0;et<X.added.length;et++){const lt=X.added[et];let rt=v.indexOf(lt);if(rt===-1){for(let Et=0;Et<M.length;Et++)if(Et>=v.length){v.push(lt),rt=Et;break}else if(v[Et]===null){v[Et]=lt,rt=Et;break}if(rt===-1)break}const ut=M[rt];ut&&ut.connect(lt)}}const z=new k,q=new k;function N(X,et,lt){z.setFromMatrixPosition(et.matrixWorld),q.setFromMatrixPosition(lt.matrixWorld);const rt=z.distanceTo(q),ut=et.projectionMatrix.elements,Et=lt.projectionMatrix.elements,Dt=ut[14]/(ut[10]-1),re=ut[14]/(ut[10]+1),Vt=(ut[9]+1)/ut[5],fe=(ut[9]-1)/ut[5],H=(ut[8]-1)/ut[0],Ve=(Et[8]+1)/Et[0],Wt=Dt*H,Xt=Dt*Ve,wt=rt/(-H+Ve),ce=wt*-H;if(et.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ce),X.translateZ(wt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),ut[10]===-1)X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const It=Dt+wt,R=re+wt,b=Wt-ce,Y=Xt+(rt-ce),nt=Vt*re/R*It,at=fe*re/R*It;X.projectionMatrix.makePerspective(b,Y,nt,at,It,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function O(X,et){et===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(et.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let et=X.near,lt=X.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(lt=_.depthFar)),y.near=P.near=A.near=et,y.far=P.far=A.far=lt,(E!==y.near||D!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,D=y.far),A.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,y.layers.mask=A.layers.mask|P.layers.mask;const rt=X.parent,ut=y.cameras;O(y,rt);for(let Et=0;Et<ut.length;Et++)O(ut[Et],rt);ut.length===2?N(y,A,P):y.projectionMatrix.copy(A.projectionMatrix),W(X,y,rt)};function W(X,et,lt){lt===null?X.matrix.copy(et.matrixWorld):(X.matrix.copy(lt.matrixWorld),X.matrix.invert(),X.matrix.multiply(et.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Wo*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let $=null;function Q(X,et){if(h=et.getViewerPose(c||a),g=et,h!==null){const lt=h.views;p!==null&&(t.setRenderTargetFramebuffer(x,p.framebuffer),t.setRenderTarget(x));let rt=!1;lt.length!==y.cameras.length&&(y.cameras.length=0,rt=!0);for(let Et=0;Et<lt.length;Et++){const Dt=lt[Et];let re=null;if(p!==null)re=p.getViewport(Dt);else{const fe=u.getViewSubImage(f,Dt);re=fe.viewport,Et===0&&(t.setRenderTargetTextures(x,fe.colorTexture,f.ignoreDepthValues?void 0:fe.depthStencilTexture),t.setRenderTarget(x))}let Vt=S[Et];Vt===void 0&&(Vt=new rn,Vt.layers.enable(Et),Vt.viewport=new ve,S[Et]=Vt),Vt.matrix.fromArray(Dt.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Dt.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(re.x,re.y,re.width,re.height),Et===0&&(y.matrix.copy(Vt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),rt===!0&&y.cameras.push(Vt)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const Et=u.getDepthInformation(lt[0]);Et&&Et.isValid&&Et.texture&&_.init(t,Et,s.renderState)}}for(let lt=0;lt<M.length;lt++){const rt=v[lt],ut=M[lt];rt!==null&&ut!==void 0&&ut.update(rt,et,c||a)}$&&$(X,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),g=null}const st=new zh;st.setAnimationLoop(Q),this.setAnimationLoop=function(X){$=X},this.dispose=function(){}}}const gi=new tn,e_=new Gt;function n_(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Uh(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,x,M,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?l(m,d,x,M):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Be&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Be&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const x=t.get(d),M=x.envMap,v=x.envMapRotation;M&&(m.envMap.value=M,gi.copy(v),gi.x*=-1,gi.y*=-1,gi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),m.envMapRotation.value.setFromMatrix4(e_.makeRotationFromEuler(gi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,x,M){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*x,m.scale.value=M*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,x){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Be&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const x=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function i_(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,M){const v=M.program;i.uniformBlockBinding(x,v)}function c(x,M){let v=s[x.id];v===void 0&&(g(x),v=h(x),s[x.id]=v,x.addEventListener("dispose",m));const w=M.program;i.updateUBOMapping(x,w);const C=t.render.frame;r[x.id]!==C&&(f(x),r[x.id]=C)}function h(x){const M=u();x.__bindingPointIndex=M;const v=n.createBuffer(),w=x.__size,C=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,w,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,v),v}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(x){const M=s[x.id],v=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let C=0,A=v.length;C<A;C++){const P=Array.isArray(v[C])?v[C]:[v[C]];for(let S=0,y=P.length;S<y;S++){const E=P[S];if(p(E,C,S,w)===!0){const D=E.__offset,U=Array.isArray(E.value)?E.value:[E.value];let L=0;for(let F=0;F<U.length;F++){const z=U[F],q=_(z);typeof z=="number"||typeof z=="boolean"?(E.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,D+L,E.__data)):z.isMatrix3?(E.__data[0]=z.elements[0],E.__data[1]=z.elements[1],E.__data[2]=z.elements[2],E.__data[3]=0,E.__data[4]=z.elements[3],E.__data[5]=z.elements[4],E.__data[6]=z.elements[5],E.__data[7]=0,E.__data[8]=z.elements[6],E.__data[9]=z.elements[7],E.__data[10]=z.elements[8],E.__data[11]=0):(z.toArray(E.__data,L),L+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,D,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(x,M,v,w){const C=x.value,A=M+"_"+v;if(w[A]===void 0)return typeof C=="number"||typeof C=="boolean"?w[A]=C:w[A]=C.clone(),!0;{const P=w[A];if(typeof C=="number"||typeof C=="boolean"){if(P!==C)return w[A]=C,!0}else if(P.equals(C)===!1)return P.copy(C),!0}return!1}function g(x){const M=x.uniforms;let v=0;const w=16;for(let A=0,P=M.length;A<P;A++){const S=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,E=S.length;y<E;y++){const D=S[y],U=Array.isArray(D.value)?D.value:[D.value];for(let L=0,F=U.length;L<F;L++){const z=U[L],q=_(z),N=v%w,O=N%q.boundary,W=N+O;v+=O,W!==0&&w-W<q.storage&&(v+=w-W),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=q.storage}}}const C=v%w;return C>0&&(v+=w-C),x.__size=v,x.__cache={},this}function _(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function m(x){const M=x.target;M.removeEventListener("dispose",m);const v=a.indexOf(M.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function d(){for(const x in s)n.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class s_{constructor(t={}){const{canvas:e=qd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qe,this.toneMapping=ri,this.toneMappingExposure=1;const v=this;let w=!1,C=0,A=0,P=null,S=-1,y=null;const E=new ve,D=new ve;let U=null;const L=new Rt(0);let F=0,z=e.width,q=e.height,N=1,O=null,W=null;const $=new ve(0,0,z,q),Q=new ve(0,0,z,q);let st=!1;const X=new al;let et=!1,lt=!1;const rt=new Gt,ut=new Gt,Et=new k,Dt=new ve,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Vt=!1;function fe(){return P===null?N:1}let H=i;function Ve(T,G){return e.getContext(T,G)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zo}`),e.addEventListener("webglcontextlost",it,!1),e.addEventListener("webglcontextrestored",_t,!1),e.addEventListener("webglcontextcreationerror",mt,!1),H===null){const G="webgl2";if(H=Ve(G,T),H===null)throw Ve(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Wt,Xt,wt,ce,It,R,b,Y,nt,at,tt,Tt,pt,vt,Yt,ct,xt,Lt,Ut,Mt,$t,Bt,ae,B;function ft(){Wt=new h0(H),Wt.init(),Bt=new Yg(H,Wt),Xt=new s0(H,Wt,t,Bt),wt=new Xg(H,Wt),Xt.reverseDepthBuffer&&f&&wt.buffers.depth.setReversed(!0),ce=new f0(H),It=new Ig,R=new $g(H,Wt,wt,It,Xt,Bt,ce),b=new a0(v),Y=new c0(v),nt=new Mf(H),ae=new n0(H,nt),at=new u0(H,nt,ce,ae),tt=new m0(H,at,nt,ce),Ut=new p0(H,Xt,R),ct=new r0(It),Tt=new Pg(v,b,Y,Wt,Xt,ae,ct),pt=new n_(v,It),vt=new Dg,Yt=new Og(Wt),Lt=new e0(v,b,Y,wt,tt,p,l),xt=new Vg(v,tt,Xt),B=new i_(H,ce,Xt,wt),Mt=new i0(H,Wt,ce),$t=new d0(H,Wt,ce),ce.programs=Tt.programs,v.capabilities=Xt,v.extensions=Wt,v.properties=It,v.renderLists=vt,v.shadowMap=xt,v.state=wt,v.info=ce}ft();const Z=new t_(v,H);this.xr=Z,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const T=Wt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Wt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(T){T!==void 0&&(N=T,this.setSize(z,q,!1))},this.getSize=function(T){return T.set(z,q)},this.setSize=function(T,G,K=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,q=G,e.width=Math.floor(T*N),e.height=Math.floor(G*N),K===!0&&(e.style.width=T+"px",e.style.height=G+"px"),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(z*N,q*N).floor()},this.setDrawingBufferSize=function(T,G,K){z=T,q=G,N=K,e.width=Math.floor(T*K),e.height=Math.floor(G*K),this.setViewport(0,0,T,G)},this.getCurrentViewport=function(T){return T.copy(E)},this.getViewport=function(T){return T.copy($)},this.setViewport=function(T,G,K,j){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,G,K,j),wt.viewport(E.copy($).multiplyScalar(N).round())},this.getScissor=function(T){return T.copy(Q)},this.setScissor=function(T,G,K,j){T.isVector4?Q.set(T.x,T.y,T.z,T.w):Q.set(T,G,K,j),wt.scissor(D.copy(Q).multiplyScalar(N).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(T){wt.setScissorTest(st=T)},this.setOpaqueSort=function(T){O=T},this.setTransparentSort=function(T){W=T},this.getClearColor=function(T){return T.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(T=!0,G=!0,K=!0){let j=0;if(T){let V=!1;if(P!==null){const ht=P.texture.format;V=ht===il||ht===nl||ht===el}if(V){const ht=P.texture.type,gt=ht===Cn||ht===wi||ht===Xs||ht===ds||ht===Qo||ht===tl,yt=Lt.getClearColor(),St=Lt.getClearAlpha(),Ft=yt.r,kt=yt.g,bt=yt.b;gt?(g[0]=Ft,g[1]=kt,g[2]=bt,g[3]=St,H.clearBufferuiv(H.COLOR,0,g)):(_[0]=Ft,_[1]=kt,_[2]=bt,_[3]=St,H.clearBufferiv(H.COLOR,0,_))}else j|=H.COLOR_BUFFER_BIT}G&&(j|=H.DEPTH_BUFFER_BIT),K&&(j|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",it,!1),e.removeEventListener("webglcontextrestored",_t,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),vt.dispose(),Yt.dispose(),It.dispose(),b.dispose(),Y.dispose(),tt.dispose(),ae.dispose(),B.dispose(),Tt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",gl),Z.removeEventListener("sessionend",_l),hi.stop()};function it(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function _t(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const T=ce.autoReset,G=xt.enabled,K=xt.autoUpdate,j=xt.needsUpdate,V=xt.type;ft(),ce.autoReset=T,xt.enabled=G,xt.autoUpdate=K,xt.needsUpdate=j,xt.type=V}function mt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function zt(T){const G=T.target;G.removeEventListener("dispose",zt),me(G)}function me(T){Ue(T),It.remove(T)}function Ue(T){const G=It.get(T).programs;G!==void 0&&(G.forEach(function(K){Tt.releaseProgram(K)}),T.isShaderMaterial&&Tt.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,K,j,V,ht){G===null&&(G=re);const gt=V.isMesh&&V.matrixWorld.determinant()<0,yt=gu(T,G,K,j,V);wt.setMaterial(j,gt);let St=K.index,Ft=1;if(j.wireframe===!0){if(St=at.getWireframeAttribute(K),St===void 0)return;Ft=2}const kt=K.drawRange,bt=K.attributes.position;let Zt=kt.start*Ft,oe=(kt.start+kt.count)*Ft;ht!==null&&(Zt=Math.max(Zt,ht.start*Ft),oe=Math.min(oe,(ht.start+ht.count)*Ft)),St!==null?(Zt=Math.max(Zt,0),oe=Math.min(oe,St.count)):bt!=null&&(Zt=Math.max(Zt,0),oe=Math.min(oe,bt.count));const he=oe-Zt;if(he<0||he===1/0)return;ae.setup(V,j,yt,K,St);let We,Qt=Mt;if(St!==null&&(We=nt.get(St),Qt=$t,Qt.setIndex(We)),V.isMesh)j.wireframe===!0?(wt.setLineWidth(j.wireframeLinewidth*fe()),Qt.setMode(H.LINES)):Qt.setMode(H.TRIANGLES);else if(V.isLine){let At=j.linewidth;At===void 0&&(At=1),wt.setLineWidth(At*fe()),V.isLineSegments?Qt.setMode(H.LINES):V.isLineLoop?Qt.setMode(H.LINE_LOOP):Qt.setMode(H.LINE_STRIP)}else V.isPoints?Qt.setMode(H.POINTS):V.isSprite&&Qt.setMode(H.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Qt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))Qt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const At=V._multiDrawStarts,wn=V._multiDrawCounts,te=V._multiDrawCount,ln=St?nt.get(St).bytesPerElement:1,Ui=It.get(j).currentProgram.getUniforms();for(let Ye=0;Ye<te;Ye++)Ui.setValue(H,"_gl_DrawID",Ye),Qt.render(At[Ye]/ln,wn[Ye])}else if(V.isInstancedMesh)Qt.renderInstances(Zt,he,V.count);else if(K.isInstancedBufferGeometry){const At=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,wn=Math.min(K.instanceCount,At);Qt.renderInstances(Zt,he,wn)}else Qt.render(Zt,he)};function ee(T,G,K){T.transparent===!0&&T.side===zn&&T.forceSinglePass===!1?(T.side=Be,T.needsUpdate=!0,er(T,G,K),T.side=ai,T.needsUpdate=!0,er(T,G,K),T.side=zn):er(T,G,K)}this.compile=function(T,G,K=null){K===null&&(K=T),d=Yt.get(K),d.init(G),M.push(d),K.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),T!==K&&T.traverseVisible(function(V){V.isLight&&V.layers.test(G.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights();const j=new Set;return T.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ht=V.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){const yt=ht[gt];ee(yt,K,V),j.add(yt)}else ee(ht,K,V),j.add(ht)}),M.pop(),d=null,j},this.compileAsync=function(T,G,K=null){const j=this.compile(T,G,K);return new Promise(V=>{function ht(){if(j.forEach(function(gt){It.get(gt).currentProgram.isReady()&&j.delete(gt)}),j.size===0){V(T);return}setTimeout(ht,10)}Wt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let on=null;function Rn(T){on&&on(T)}function gl(){hi.stop()}function _l(){hi.start()}const hi=new zh;hi.setAnimationLoop(Rn),typeof self<"u"&&hi.setContext(self),this.setAnimationLoop=function(T){on=T,Z.setAnimationLoop(T),T===null?hi.stop():hi.start()},Z.addEventListener("sessionstart",gl),Z.addEventListener("sessionend",_l),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(G),G=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,G,P),d=Yt.get(T,M.length),d.init(G),M.push(d),ut.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),X.setFromProjectionMatrix(ut),lt=this.localClippingEnabled,et=ct.init(this.clippingPlanes,lt),m=vt.get(T,x.length),m.init(),x.push(m),Z.enabled===!0&&Z.isPresenting===!0){const ht=v.xr.getDepthSensingMesh();ht!==null&&ha(ht,G,-1/0,v.sortObjects)}ha(T,G,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(O,W),Vt=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Vt&&Lt.addToRenderList(m,T),this.info.render.frame++,et===!0&&ct.beginShadows();const K=d.state.shadowsArray;xt.render(K,T,G),et===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,V=m.transmissive;if(d.setupLights(),G.isArrayCamera){const ht=G.cameras;if(V.length>0)for(let gt=0,yt=ht.length;gt<yt;gt++){const St=ht[gt];xl(j,V,T,St)}Vt&&Lt.render(T);for(let gt=0,yt=ht.length;gt<yt;gt++){const St=ht[gt];vl(m,T,St,St.viewport)}}else V.length>0&&xl(j,V,T,G),Vt&&Lt.render(T),vl(m,T,G);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),T.isScene===!0&&T.onAfterRender(v,T,G),ae.resetDefaultState(),S=-1,y=null,M.pop(),M.length>0?(d=M[M.length-1],et===!0&&ct.setGlobalState(v.clippingPlanes,d.state.camera)):d=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function ha(T,G,K,j){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){j&&Dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ut);const gt=tt.update(T),yt=T.material;yt.visible&&m.push(T,gt,yt,K,Dt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const gt=tt.update(T),yt=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Dt.copy(T.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Dt.copy(gt.boundingSphere.center)),Dt.applyMatrix4(T.matrixWorld).applyMatrix4(ut)),Array.isArray(yt)){const St=gt.groups;for(let Ft=0,kt=St.length;Ft<kt;Ft++){const bt=St[Ft],Zt=yt[bt.materialIndex];Zt&&Zt.visible&&m.push(T,gt,Zt,K,Dt.z,bt)}}else yt.visible&&m.push(T,gt,yt,K,Dt.z,null)}}const ht=T.children;for(let gt=0,yt=ht.length;gt<yt;gt++)ha(ht[gt],G,K,j)}function vl(T,G,K,j){const V=T.opaque,ht=T.transmissive,gt=T.transparent;d.setupLightsView(K),et===!0&&ct.setGlobalState(v.clippingPlanes,K),j&&wt.viewport(E.copy(j)),V.length>0&&tr(V,G,K),ht.length>0&&tr(ht,G,K),gt.length>0&&tr(gt,G,K),wt.buffers.depth.setTest(!0),wt.buffers.depth.setMask(!0),wt.buffers.color.setMask(!0),wt.setPolygonOffset(!1)}function xl(T,G,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[j.id]===void 0&&(d.state.transmissionRenderTarget[j.id]=new Pi(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?Zs:Cn,minFilter:Ti,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const ht=d.state.transmissionRenderTarget[j.id],gt=j.viewport||E;ht.setSize(gt.z,gt.w);const yt=v.getRenderTarget();v.setRenderTarget(ht),v.getClearColor(L),F=v.getClearAlpha(),F<1&&v.setClearColor(16777215,.5),v.clear(),Vt&&Lt.render(K);const St=v.toneMapping;v.toneMapping=ri;const Ft=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),d.setupLightsView(j),et===!0&&ct.setGlobalState(v.clippingPlanes,j),tr(T,K,j),R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let kt=!1;for(let bt=0,Zt=G.length;bt<Zt;bt++){const oe=G[bt],he=oe.object,We=oe.geometry,Qt=oe.material,At=oe.group;if(Qt.side===zn&&he.layers.test(j.layers)){const wn=Qt.side;Qt.side=Be,Qt.needsUpdate=!0,Ml(he,K,j,We,Qt,At),Qt.side=wn,Qt.needsUpdate=!0,kt=!0}}kt===!0&&(R.updateMultisampleRenderTarget(ht),R.updateRenderTargetMipmap(ht))}v.setRenderTarget(yt),v.setClearColor(L,F),Ft!==void 0&&(j.viewport=Ft),v.toneMapping=St}function tr(T,G,K){const j=G.isScene===!0?G.overrideMaterial:null;for(let V=0,ht=T.length;V<ht;V++){const gt=T[V],yt=gt.object,St=gt.geometry,Ft=j===null?gt.material:j,kt=gt.group;yt.layers.test(K.layers)&&Ml(yt,G,K,St,Ft,kt)}}function Ml(T,G,K,j,V,ht){T.onBeforeRender(v,G,K,j,V,ht),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(v,G,K,j,T,ht),V.transparent===!0&&V.side===zn&&V.forceSinglePass===!1?(V.side=Be,V.needsUpdate=!0,v.renderBufferDirect(K,G,j,V,T,ht),V.side=ai,V.needsUpdate=!0,v.renderBufferDirect(K,G,j,V,T,ht),V.side=zn):v.renderBufferDirect(K,G,j,V,T,ht),T.onAfterRender(v,G,K,j,V,ht)}function er(T,G,K){G.isScene!==!0&&(G=re);const j=It.get(T),V=d.state.lights,ht=d.state.shadowsArray,gt=V.state.version,yt=Tt.getParameters(T,V.state,ht,G,K),St=Tt.getProgramCacheKey(yt);let Ft=j.programs;j.environment=T.isMeshStandardMaterial?G.environment:null,j.fog=G.fog,j.envMap=(T.isMeshStandardMaterial?Y:b).get(T.envMap||j.environment),j.envMapRotation=j.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Ft===void 0&&(T.addEventListener("dispose",zt),Ft=new Map,j.programs=Ft);let kt=Ft.get(St);if(kt!==void 0){if(j.currentProgram===kt&&j.lightsStateVersion===gt)return Sl(T,yt),kt}else yt.uniforms=Tt.getUniforms(T),T.onBeforeCompile(yt,v),kt=Tt.acquireProgram(yt,St),Ft.set(St,kt),j.uniforms=yt.uniforms;const bt=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(bt.clippingPlanes=ct.uniform),Sl(T,yt),j.needsLights=vu(T),j.lightsStateVersion=gt,j.needsLights&&(bt.ambientLightColor.value=V.state.ambient,bt.lightProbe.value=V.state.probe,bt.directionalLights.value=V.state.directional,bt.directionalLightShadows.value=V.state.directionalShadow,bt.spotLights.value=V.state.spot,bt.spotLightShadows.value=V.state.spotShadow,bt.rectAreaLights.value=V.state.rectArea,bt.ltc_1.value=V.state.rectAreaLTC1,bt.ltc_2.value=V.state.rectAreaLTC2,bt.pointLights.value=V.state.point,bt.pointLightShadows.value=V.state.pointShadow,bt.hemisphereLights.value=V.state.hemi,bt.directionalShadowMap.value=V.state.directionalShadowMap,bt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,bt.spotShadowMap.value=V.state.spotShadowMap,bt.spotLightMatrix.value=V.state.spotLightMatrix,bt.spotLightMap.value=V.state.spotLightMap,bt.pointShadowMap.value=V.state.pointShadowMap,bt.pointShadowMatrix.value=V.state.pointShadowMatrix),j.currentProgram=kt,j.uniformsList=null,kt}function yl(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Hr.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Sl(T,G){const K=It.get(T);K.outputColorSpace=G.outputColorSpace,K.batching=G.batching,K.batchingColor=G.batchingColor,K.instancing=G.instancing,K.instancingColor=G.instancingColor,K.instancingMorph=G.instancingMorph,K.skinning=G.skinning,K.morphTargets=G.morphTargets,K.morphNormals=G.morphNormals,K.morphColors=G.morphColors,K.morphTargetsCount=G.morphTargetsCount,K.numClippingPlanes=G.numClippingPlanes,K.numIntersection=G.numClipIntersection,K.vertexAlphas=G.vertexAlphas,K.vertexTangents=G.vertexTangents,K.toneMapping=G.toneMapping}function gu(T,G,K,j,V){G.isScene!==!0&&(G=re),R.resetTextureUnits();const ht=G.fog,gt=j.isMeshStandardMaterial?G.environment:null,yt=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ms,St=(j.isMeshStandardMaterial?Y:b).get(j.envMap||gt),Ft=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,kt=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),bt=!!K.morphAttributes.position,Zt=!!K.morphAttributes.normal,oe=!!K.morphAttributes.color;let he=ri;j.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(he=v.toneMapping);const We=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Qt=We!==void 0?We.length:0,At=It.get(j),wn=d.state.lights;if(et===!0&&(lt===!0||T!==y)){const en=T===y&&j.id===S;ct.setState(j,T,en)}let te=!1;j.version===At.__version?(At.needsLights&&At.lightsStateVersion!==wn.state.version||At.outputColorSpace!==yt||V.isBatchedMesh&&At.batching===!1||!V.isBatchedMesh&&At.batching===!0||V.isBatchedMesh&&At.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&At.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&At.instancing===!1||!V.isInstancedMesh&&At.instancing===!0||V.isSkinnedMesh&&At.skinning===!1||!V.isSkinnedMesh&&At.skinning===!0||V.isInstancedMesh&&At.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&At.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&At.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&At.instancingMorph===!1&&V.morphTexture!==null||At.envMap!==St||j.fog===!0&&At.fog!==ht||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==ct.numPlanes||At.numIntersection!==ct.numIntersection)||At.vertexAlphas!==Ft||At.vertexTangents!==kt||At.morphTargets!==bt||At.morphNormals!==Zt||At.morphColors!==oe||At.toneMapping!==he||At.morphTargetsCount!==Qt)&&(te=!0):(te=!0,At.__version=j.version);let ln=At.currentProgram;te===!0&&(ln=er(j,G,V));let Ui=!1,Ye=!1,ys=!1;const ue=ln.getUniforms(),vn=At.uniforms;if(wt.useProgram(ln.program)&&(Ui=!0,Ye=!0,ys=!0),j.id!==S&&(S=j.id,Ye=!0),Ui||y!==T){wt.buffers.depth.getReversed()?(rt.copy(T.projectionMatrix),Yd(rt),Kd(rt),ue.setValue(H,"projectionMatrix",rt)):ue.setValue(H,"projectionMatrix",T.projectionMatrix),ue.setValue(H,"viewMatrix",T.matrixWorldInverse);const Wn=ue.map.cameraPosition;Wn!==void 0&&Wn.setValue(H,Et.setFromMatrixPosition(T.matrixWorld)),Xt.logarithmicDepthBuffer&&ue.setValue(H,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&ue.setValue(H,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Ye=!0,ys=!0)}if(V.isSkinnedMesh){ue.setOptional(H,V,"bindMatrix"),ue.setOptional(H,V,"bindMatrixInverse");const en=V.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),ue.setValue(H,"boneTexture",en.boneTexture,R))}V.isBatchedMesh&&(ue.setOptional(H,V,"batchingTexture"),ue.setValue(H,"batchingTexture",V._matricesTexture,R),ue.setOptional(H,V,"batchingIdTexture"),ue.setValue(H,"batchingIdTexture",V._indirectTexture,R),ue.setOptional(H,V,"batchingColorTexture"),V._colorsTexture!==null&&ue.setValue(H,"batchingColorTexture",V._colorsTexture,R));const Ss=K.morphAttributes;if((Ss.position!==void 0||Ss.normal!==void 0||Ss.color!==void 0)&&Ut.update(V,K,ln),(Ye||At.receiveShadow!==V.receiveShadow)&&(At.receiveShadow=V.receiveShadow,ue.setValue(H,"receiveShadow",V.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(vn.envMap.value=St,vn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&G.environment!==null&&(vn.envMapIntensity.value=G.environmentIntensity),Ye&&(ue.setValue(H,"toneMappingExposure",v.toneMappingExposure),At.needsLights&&_u(vn,ys),ht&&j.fog===!0&&pt.refreshFogUniforms(vn,ht),pt.refreshMaterialUniforms(vn,j,N,q,d.state.transmissionRenderTarget[T.id]),Hr.upload(H,yl(At),vn,R)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Hr.upload(H,yl(At),vn,R),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&ue.setValue(H,"center",V.center),ue.setValue(H,"modelViewMatrix",V.modelViewMatrix),ue.setValue(H,"normalMatrix",V.normalMatrix),ue.setValue(H,"modelMatrix",V.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const en=j.uniformsGroups;for(let Wn=0,Xn=en.length;Wn<Xn;Wn++){const bl=en[Wn];B.update(bl,ln),B.bind(bl,ln)}}return ln}function _u(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function vu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(T,G,K){It.get(T.texture).__webglTexture=G,It.get(T.depthTexture).__webglTexture=K;const j=It.get(T);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=K===void 0,j.__autoAllocateDepthBuffer||Wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,G){const K=It.get(T);K.__webglFramebuffer=G,K.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,K=0){P=T,C=G,A=K;let j=!0,V=null,ht=!1,gt=!1;if(T){const St=It.get(T);if(St.__useDefaultFramebuffer!==void 0)wt.bindFramebuffer(H.FRAMEBUFFER,null),j=!1;else if(St.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(St.__hasExternalTextures)R.rebindTextures(T,It.get(T.texture).__webglTexture,It.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const bt=T.depthTexture;if(St.__boundDepthTexture!==bt){if(bt!==null&&It.has(bt)&&(T.width!==bt.image.width||T.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Ft=T.texture;(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)&&(gt=!0);const kt=It.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(kt[G])?V=kt[G][K]:V=kt[G],ht=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?V=It.get(T).__webglMultisampledFramebuffer:Array.isArray(kt)?V=kt[K]:V=kt,E.copy(T.viewport),D.copy(T.scissor),U=T.scissorTest}else E.copy($).multiplyScalar(N).floor(),D.copy(Q).multiplyScalar(N).floor(),U=st;if(wt.bindFramebuffer(H.FRAMEBUFFER,V)&&j&&wt.drawBuffers(T,V),wt.viewport(E),wt.scissor(D),wt.setScissorTest(U),ht){const St=It.get(T.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+G,St.__webglTexture,K)}else if(gt){const St=It.get(T.texture),Ft=G||0;H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,St.__webglTexture,K||0,Ft)}S=-1},this.readRenderTargetPixels=function(T,G,K,j,V,ht,gt){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){wt.bindFramebuffer(H.FRAMEBUFFER,yt);try{const St=T.texture,Ft=St.format,kt=St.type;if(!Xt.textureFormatReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-j&&K>=0&&K<=T.height-V&&H.readPixels(G,K,j,V,Bt.convert(Ft),Bt.convert(kt),ht)}finally{const St=P!==null?It.get(P).__webglFramebuffer:null;wt.bindFramebuffer(H.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(T,G,K,j,V,ht,gt){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=It.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){const St=T.texture,Ft=St.format,kt=St.type;if(!Xt.textureFormatReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=T.width-j&&K>=0&&K<=T.height-V){wt.bindFramebuffer(H.FRAMEBUFFER,yt);const bt=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,bt),H.bufferData(H.PIXEL_PACK_BUFFER,ht.byteLength,H.STREAM_READ),H.readPixels(G,K,j,V,Bt.convert(Ft),Bt.convert(kt),0);const Zt=P!==null?It.get(P).__webglFramebuffer:null;wt.bindFramebuffer(H.FRAMEBUFFER,Zt);const oe=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await $d(H,oe,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,bt),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,ht),H.deleteBuffer(bt),H.deleteSync(oe),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,G=null,K=0){T.isTexture!==!0&&(Fs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1]);const j=Math.pow(2,-K),V=Math.floor(T.image.width*j),ht=Math.floor(T.image.height*j),gt=G!==null?G.x:0,yt=G!==null?G.y:0;R.setTexture2D(T,0),H.copyTexSubImage2D(H.TEXTURE_2D,K,0,0,gt,yt,V,ht),wt.unbindTexture()},this.copyTextureToTexture=function(T,G,K=null,j=null,V=0){T.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,T=arguments[1],G=arguments[2],V=arguments[3]||0,K=null);let ht,gt,yt,St,Ft,kt,bt,Zt,oe;const he=T.isCompressedTexture?T.mipmaps[V]:T.image;K!==null?(ht=K.max.x-K.min.x,gt=K.max.y-K.min.y,yt=K.isBox3?K.max.z-K.min.z:1,St=K.min.x,Ft=K.min.y,kt=K.isBox3?K.min.z:0):(ht=he.width,gt=he.height,yt=he.depth||1,St=0,Ft=0,kt=0),j!==null?(bt=j.x,Zt=j.y,oe=j.z):(bt=0,Zt=0,oe=0);const We=Bt.convert(G.format),Qt=Bt.convert(G.type);let At;G.isData3DTexture?(R.setTexture3D(G,0),At=H.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(R.setTexture2DArray(G,0),At=H.TEXTURE_2D_ARRAY):(R.setTexture2D(G,0),At=H.TEXTURE_2D),H.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,G.flipY),H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),H.pixelStorei(H.UNPACK_ALIGNMENT,G.unpackAlignment);const wn=H.getParameter(H.UNPACK_ROW_LENGTH),te=H.getParameter(H.UNPACK_IMAGE_HEIGHT),ln=H.getParameter(H.UNPACK_SKIP_PIXELS),Ui=H.getParameter(H.UNPACK_SKIP_ROWS),Ye=H.getParameter(H.UNPACK_SKIP_IMAGES);H.pixelStorei(H.UNPACK_ROW_LENGTH,he.width),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,he.height),H.pixelStorei(H.UNPACK_SKIP_PIXELS,St),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ft),H.pixelStorei(H.UNPACK_SKIP_IMAGES,kt);const ys=T.isDataArrayTexture||T.isData3DTexture,ue=G.isDataArrayTexture||G.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const vn=It.get(T),Ss=It.get(G),en=It.get(vn.__renderTarget),Wn=It.get(Ss.__renderTarget);wt.bindFramebuffer(H.READ_FRAMEBUFFER,en.__webglFramebuffer),wt.bindFramebuffer(H.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let Xn=0;Xn<yt;Xn++)ys&&H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,It.get(T).__webglTexture,V,kt+Xn),T.isDepthTexture?(ue&&H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,It.get(G).__webglTexture,V,oe+Xn),H.blitFramebuffer(St,Ft,ht,gt,bt,Zt,ht,gt,H.DEPTH_BUFFER_BIT,H.NEAREST)):ue?H.copyTexSubImage3D(At,V,bt,Zt,oe+Xn,St,Ft,ht,gt):H.copyTexSubImage2D(At,V,bt,Zt,oe+Xn,St,Ft,ht,gt);wt.bindFramebuffer(H.READ_FRAMEBUFFER,null),wt.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else ue?T.isDataTexture||T.isData3DTexture?H.texSubImage3D(At,V,bt,Zt,oe,ht,gt,yt,We,Qt,he.data):G.isCompressedArrayTexture?H.compressedTexSubImage3D(At,V,bt,Zt,oe,ht,gt,yt,We,he.data):H.texSubImage3D(At,V,bt,Zt,oe,ht,gt,yt,We,Qt,he):T.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,V,bt,Zt,ht,gt,We,Qt,he.data):T.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,V,bt,Zt,he.width,he.height,We,he.data):H.texSubImage2D(H.TEXTURE_2D,V,bt,Zt,ht,gt,We,Qt,he);H.pixelStorei(H.UNPACK_ROW_LENGTH,wn),H.pixelStorei(H.UNPACK_IMAGE_HEIGHT,te),H.pixelStorei(H.UNPACK_SKIP_PIXELS,ln),H.pixelStorei(H.UNPACK_SKIP_ROWS,Ui),H.pixelStorei(H.UNPACK_SKIP_IMAGES,Ye),V===0&&G.generateMipmaps&&H.generateMipmap(At),wt.unbindTexture()},this.copyTextureToTexture3D=function(T,G,K=null,j=null,V=0){return T.isTexture!==!0&&(Fs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,j=arguments[1]||null,T=arguments[2],G=arguments[3],V=arguments[4]||0),Fs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,G,K,j,V)},this.initRenderTarget=function(T){It.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),wt.unbindTexture()},this.resetState=function(){C=0,A=0,P=null,wt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class ll{constructor(t,e=1,i=1e3){this.isFog=!0,this.name="",this.color=new Rt(t),this.near=e,this.far=i}clone(){return new ll(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class r_ extends Le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new tn,this.environmentIntensity=1,this.environmentRotation=new tn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Xh extends He{constructor(t=null,e=1,i=1,s,r,a,o,l,c=Qe,h=Qe,u,f){super(null,a,o,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pc extends xe{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ji=new Gt,Ic=new Gt,Ar=[],Lc=new Li,a_=new Gt,ws=new be,Ps=new _s;class we extends be{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Pc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,a_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Li),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ji),Lc.copy(t.boundingBox).applyMatrix4(ji),this.boundingBox.union(Lc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new _s),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,ji),Ps.copy(t.boundingSphere).applyMatrix4(ji),this.boundingSphere.union(Ps)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(t,e){const i=this.matrixWorld,s=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ps.copy(this.boundingSphere),Ps.applyMatrix4(i),t.ray.intersectsSphere(Ps)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ji),Ic.multiplyMatrices(i,ji),ws.matrixWorld=Ic,ws.raycast(t,Ar);for(let a=0,o=Ar.length;a<o;a++){const l=Ar[a];l.instanceId=r,l.object=this,e.push(l)}Ar.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Pc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xh(new Float32Array(s*this.count),s,this.count,na,Sn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class o_ extends Di{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Dc=new Gt,qo=new rl,Cr=new _s,Rr=new k;class qh extends Le{constructor(t=new Ee,e=new o_){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cr.copy(i.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;Dc.copy(s).invert(),qo.copy(t.ray).applyMatrix4(Dc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=f,_=p;g<_;g++){const m=c.getX(g);Rr.fromBufferAttribute(u,m),Uc(Rr,m,l,s,t,e,this)}}else{const f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=f,_=p;g<_;g++)Rr.fromBufferAttribute(u,g),Uc(Rr,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Uc(n,t,e,i,s,r,a){const o=qo.distanceSqToPoint(n);if(o<e){const l=new k;qo.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class oi extends Ee{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],p=[];let g=0;const _=[],m=i/2;let d=0;x(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(f,3)),this.setAttribute("uv",new ne(p,2));function x(){const v=new k,w=new k;let C=0;const A=(e-t)/i;for(let P=0;P<=r;P++){const S=[],y=P/r,E=y*(e-t)+t;for(let D=0;D<=s;D++){const U=D/s,L=U*l+o,F=Math.sin(L),z=Math.cos(L);w.x=E*F,w.y=-y*i+m,w.z=E*z,u.push(w.x,w.y,w.z),v.set(F,A,z).normalize(),f.push(v.x,v.y,v.z),p.push(U,1-y),S.push(g++)}_.push(S)}for(let P=0;P<s;P++)for(let S=0;S<r;S++){const y=_[S][P],E=_[S+1][P],D=_[S+1][P+1],U=_[S][P+1];(t>0||S!==0)&&(h.push(y,E,U),C+=3),(e>0||S!==r-1)&&(h.push(E,D,U),C+=3)}c.addGroup(d,C,0),d+=C}function M(v){const w=g,C=new qt,A=new k;let P=0;const S=v===!0?t:e,y=v===!0?1:-1;for(let D=1;D<=s;D++)u.push(0,m*y,0),f.push(0,y,0),p.push(.5,.5),g++;const E=g;for(let D=0;D<=s;D++){const L=D/s*l+o,F=Math.cos(L),z=Math.sin(L);A.x=S*z,A.y=m*y,A.z=S*F,u.push(A.x,A.y,A.z),f.push(0,y,0),C.x=F*.5+.5,C.y=z*.5*y+.5,p.push(C.x,C.y),g++}for(let D=0;D<s;D++){const U=w+D,L=E+D;v===!0?h.push(L,L+1,U):h.push(L+1,L,U),P+=3}c.addGroup(d,P,v===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class qs extends oi{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new qs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ra extends Ee{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],a=[];o(s),c(i),h(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new k,v=new k,w=new k;for(let C=0;C<e.length;C+=3)p(e[C+0],M),p(e[C+1],v),p(e[C+2],w),l(M,v,w,x)}function l(x,M,v,w){const C=w+1,A=[];for(let P=0;P<=C;P++){A[P]=[];const S=x.clone().lerp(v,P/C),y=M.clone().lerp(v,P/C),E=C-P;for(let D=0;D<=E;D++)D===0&&P===C?A[P][D]=S:A[P][D]=S.clone().lerp(y,D/E)}for(let P=0;P<C;P++)for(let S=0;S<2*(C-P)-1;S++){const y=Math.floor(S/2);S%2===0?(f(A[P][y+1]),f(A[P+1][y]),f(A[P][y])):(f(A[P][y+1]),f(A[P+1][y+1]),f(A[P+1][y]))}}function c(x){const M=new k;for(let v=0;v<r.length;v+=3)M.x=r[v+0],M.y=r[v+1],M.z=r[v+2],M.normalize().multiplyScalar(x),r[v+0]=M.x,r[v+1]=M.y,r[v+2]=M.z}function h(){const x=new k;for(let M=0;M<r.length;M+=3){x.x=r[M+0],x.y=r[M+1],x.z=r[M+2];const v=m(x)/2/Math.PI+.5,w=d(x)/Math.PI+.5;a.push(v,1-w)}g(),u()}function u(){for(let x=0;x<a.length;x+=6){const M=a[x+0],v=a[x+2],w=a[x+4],C=Math.max(M,v,w),A=Math.min(M,v,w);C>.9&&A<.1&&(M<.2&&(a[x+0]+=1),v<.2&&(a[x+2]+=1),w<.2&&(a[x+4]+=1))}}function f(x){r.push(x.x,x.y,x.z)}function p(x,M){const v=x*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const x=new k,M=new k,v=new k,w=new k,C=new qt,A=new qt,P=new qt;for(let S=0,y=0;S<r.length;S+=9,y+=6){x.set(r[S+0],r[S+1],r[S+2]),M.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),C.set(a[y+0],a[y+1]),A.set(a[y+2],a[y+3]),P.set(a[y+4],a[y+5]),w.copy(x).add(M).add(v).divideScalar(3);const E=m(w);_(C,y+0,x,E),_(A,y+2,M,E),_(P,y+4,v,E)}}function _(x,M,v,w){w<0&&x.x===1&&(a[M]=x.x-1),v.x===0&&v.z===0&&(a[M]=w/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ra(t.vertices,t.indices,t.radius,t.details)}}class cl extends ra{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cl(t.radius,t.detail)}}class aa extends ra{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new aa(t.radius,t.detail)}}class oa extends Ee{constructor(t=.5,e=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=t;const f=(e-t)/s,p=new k,g=new qt;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const d=r+m/i*a;p.x=u*Math.cos(d),p.y=u*Math.sin(d),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const m=_*(i+1);for(let d=0;d<i;d++){const x=d+m,M=x,v=x+i+1,w=x+i+2,C=x+1;o.push(M,v,C),o.push(v,w,C)}}this.setIndex(o),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oa(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class la extends Ee{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new k,f=new k,p=[],g=[],_=[],m=[];for(let d=0;d<=i;d++){const x=[],M=d/i;let v=0;d===0&&a===0?v=.5/e:d===i&&l===Math.PI&&(v=-.5/e);for(let w=0;w<=e;w++){const C=w/e;u.x=-t*Math.cos(s+C*r)*Math.sin(a+M*o),u.y=t*Math.cos(a+M*o),u.z=t*Math.sin(s+C*r)*Math.sin(a+M*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(C+v,1-M),x.push(c++)}h.push(x)}for(let d=0;d<i;d++)for(let x=0;x<e;x++){const M=h[d][x+1],v=h[d][x],w=h[d+1][x],C=h[d+1][x+1];(d!==0||a>0)&&p.push(M,v,C),(d!==i-1||l<Math.PI)&&p.push(v,w,C)}this.setIndex(p),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new la(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hl extends Ee{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new k,u=new k,f=new k;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,d=(s+1)*(p-1)+g,x=(s+1)*p+g;a.push(_,m,x),a.push(m,d,x)}this.setIndex(a),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class l_ extends Di{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Rt(16777215),this.specular=new Rt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $o extends Di{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new tn,this.combine=ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $h extends Le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Rt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class c_ extends $h{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Rt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Va=new Gt,Nc=new k,Fc=new k;class h_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.map=null,this.mapPass=null,this.matrix=new Gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new al,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Nc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Nc),Fc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fc),e.updateMatrixWorld(),Va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Va),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class u_ extends h_{constructor(){super(new kh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class d_ extends $h{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Le.DEFAULT_UP),this.updateMatrix(),this.target=new Le,this.shadow=new u_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);const sn=n=>new Rt(n),de={uTime:{value:0},uFow:{value:null},uFowOn:{value:1},uWorld:{value:256},uSnow:{value:0},uSnowColor:{value:sn("#f4f7fa")},uGrassA:{value:sn("#6fa84a")},uGrassB:{value:sn("#93c25a")},uLeaf:{value:1},uLeafColor:{value:sn("#6fae46")},uCrop:{value:.35},uCropColor:{value:sn("#86c457")},uFlower:{value:1},uFruit:{value:1},uShallow:{value:sn("#5cb8b2")},uDeep:{value:sn("#1f6079")}},Yh=`
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`,f_=`
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`,Kh=`
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
#endif`,p_=`
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`,m_=`
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
#endif`,g_=`
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`,__=`
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
    gl_FragColor.rgb = mix(c, mix(mix(un, exc, ex), c, vis), uFowOn); }`;function ul(n,t={}){const e={SNOW_K:"1.0",WIND_AMP:"0.0",WIND_BYH:"false",...t};return n.defines=Object.assign(n.defines||{},e),n.onBeforeCompile=i=>{for(const s in de)i.uniforms[s]=de[s];i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
`+Yh).replace("#include <begin_vertex>",`#include <begin_vertex>
`+Kh).replace("#include <project_vertex>",`#include <project_vertex>
`+p_),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
`+f_).replace("#include <color_fragment>",`#include <color_fragment>
`+m_).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
`+g_).replace("#include <opaque_fragment>",`#include <opaque_fragment>
`+__)},n.customProgramCacheKey=()=>JSON.stringify(e),n}function jh(n){const t=new Wh({depthPacking:Th});return t.defines={WIND_AMP:"0.0",WIND_BYH:"false",...n},t.onBeforeCompile=e=>{for(const i in de)e.uniforms[i]=de[i];e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
`+Yh).replace("#include <begin_vertex>",`#include <begin_vertex>
`+Kh)},t.customProgramCacheKey=()=>"d"+JSON.stringify(n),t}const ke=(n={},t={})=>ul(new $o({flatShading:!0,...n}),t);function v_(n){const t=n.hn-1;n.hstep;const e=n.size,i=new ci(e,e,t,t).rotateX(-Math.PI/2).translate(e/2,0,e/2),s=i.attributes.position;for(let d=0;d<s.count;d++)s.setY(d,n.heights[d]);const r=i.toNonIndexed(),a=r.attributes.position,o=a.count,l=new Float32Array(o*3),c=new Float32Array(o*2),h={bed:[.42,.4,.31],sand:[.82,.74,.55],rock:[.55,.53,.49],rock2:[.64,.61,.55]},u=d=>new Rt().setRGB(d[0],d[1],d[2],qe),f=Object.fromEntries(Object.entries(h).map(([d,x])=>[d,u(x)])),p=new k,g=new k,_=new k;for(let d=0;d<o;d+=3){p.fromBufferAttribute(a,d),g.fromBufferAttribute(a,d+1),_.fromBufferAttribute(a,d+2);const x=(p.x+g.x+_.x)/3,M=(p.y+g.y+_.y)/3,v=(p.z+g.z+_.z)/3,w=Math.min(e-1,Math.max(0,Math.floor(x))),C=Math.min(e-1,Math.max(0,Math.floor(v))),A=n.terrain[C*e+w],P=Math.abs(new k().subVectors(_,g).cross(new k().subVectors(p,g)).normalize().y),S=.93+(d*2654435761>>>0)/4294967296*.14,y=Zi(x*.045,v*.045,5,2);let E=null,D=0;if(M<-.45)E=f.bed;else if(A===Vr||A===Bs||A===Ci||M<.5)E=f.sand;else if(A===Ri||P<.66)E=M>6?f.rock2:f.rock;else{D=1;const U=.86+y*.3-Math.min(1,Math.max(0,(M-4)/12))*.08;E=new Rt(U,U,U)}for(let U=0;U<3;U++){const L=(d+U)*3;l[L]=E.r*S,l[L+1]=E.g*S,l[L+2]=E.b*S,c[(d+U)*2]=D,c[(d+U)*2+1]=y}}r.setAttribute("color",new xe(l,3)),r.setAttribute("aGrass",new xe(c,2)),r.computeVertexNormals();const m=new be(r,ke({vertexColors:!0},{TERRAIN:""}));return m.receiveShadow=!0,m.castShadow=!0,m}function x_(n){const t=n.size,e=Math.round(t/1.6),i=new ci(t,t,e,e).rotateX(-Math.PI/2).translate(t/2,0,t/2),s=i.attributes.position,r=new Float32Array(s.count);for(let o=0;o<s.count;o++)r[o]=-jt(n,s.getX(o),s.getZ(o));i.setAttribute("aDepth",new xe(r,1));const a=new be(i,ul(new l_({color:16777215,specular:10475744,shininess:70,flatShading:!0,transparent:!0,depthWrite:!1}),{WATER:"",NO_SNOW:""}));return a.receiveShadow=!0,a.renderOrder=2,a}const fn=Math.PI*2,zc=new tn,kc=new li,Oc=new k,Bc=new k,wr=new k,Pr=new Rt;function ot(n=0,t=0,e=0,i=0,s=1,r=1,a=1,o=0,l=0){return zc.set(o,i,l,"YXZ"),kc.setFromEuler(zc),Oc.set(n,t,e),Bc.set(s,r,a),new Gt().compose(Oc,kc,Bc)}function M_(){const n=[-.5,0,.5,.5,0,.5,0,1,.5,.5,0,-.5,-.5,0,-.5,0,1,-.5,-.5,0,.5,0,1,.5,0,1,-.5,-.5,0,.5,0,1,-.5,-.5,0,-.5,.5,0,.5,.5,0,-.5,0,1,-.5,.5,0,.5,0,1,-.5,0,1,.5],t=new Ee;return t.setAttribute("position",new ne(n,3)),t}const Ir={box:new Pe(1,1,1).translate(0,.5,0),cyl5:new oi(.5,.5,1,5).translate(0,.5,0),cyl8:new oi(.5,.5,1,8).translate(0,.5,0),cone4:new qs(.5,1,4).translate(0,.5,0),cone7:new qs(.5,1,7).translate(0,.5,0),ico:new aa(.5,0),dode:new cl(.5,0),prism:M_()},ks={};for(const n in Ir)ks[n]=Ir[n].index?Ir[n].toNonIndexed():Ir[n];class dl{constructor(t=Math.random){I(this,"pos",[]);I(this,"col",[]);this.rand=t}add(t,e,i,s=.06){const r=ks[t],a=r.attributes.position;Pr.set(e);const o=1+(this.rand()-.5)*s;for(let l=0;l<a.count;l++)wr.fromBufferAttribute(a,l).applyMatrix4(i),this.pos.push(wr.x,wr.y,wr.z),this.col.push(Pr.r*o,Pr.g*o,Pr.b*o);return this}build(){const t=new Ee;return t.setAttribute("position",new ne(this.pos,3)),t.setAttribute("color",new ne(this.col,3)),t.computeVertexNormals(),t.computeBoundingSphere(),t}}const _e=n=>{const t=new dl;return n(t),t.build()};function Zh(n){let t=n>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const Lr=new Gt().makeScale(0,0,0);function y_(n){const t=new bn,e=Zh(n.seed*7+1),i=n.size,s={oakT:_e(E=>{E.add("cyl5","#6b4a32",ot(0,0,0,0,.36,1.8,.36)),E.add("cyl5","#634430",ot(.12,1.1,0,0,.14,.8,.14,0,-.9))}),oakC:_e(E=>{E.add("ico","#ffffff",ot(0,0,0,0,2.4,2,2.4)),E.add("ico","#e6e6e6",ot(.75,-.3,.3,.6,1.6,1.35,1.6)),E.add("ico","#f3f3f3",ot(-.65,.15,-.45,1.2,1.7,1.45,1.7))}),pineT:_e(E=>{E.add("cyl5","#6e4d36",ot(0,0,0,0,.3,2.3,.3,0,.07)),E.add("cyl5","#6e4d36",ot(-.15,2.18,0,0,.24,1.4,.24,0,-.2))}),pineC:_e(E=>{E.add("ico","#ffffff",ot(0,0,0,0,3.7,1.15,3.5)),E.add("ico","#e8e8e8",ot(.45,.4,.2,.5,2.5,.85,2.4))}),firT:_e(E=>E.add("cyl5","#5d4330",ot(0,0,0,0,.26,.9,.26))),firC:_e(E=>{E.add("cone7","#ffffff",ot(0,.6,0,0,2.3,1.9,2.3)),E.add("cone7","#ececec",ot(0,1.55,0,.4,1.75,1.7,1.75)),E.add("cone7","#f6f6f6",ot(0,2.4,0,.8,1.2,1.5,1.2))})},r=ke({vertexColors:!0}),a=[{kind:eh,t:s.oakT,c:s.oakC,mat:ke({vertexColors:!0},{LEAF:"",CANOPY:"",WIND:"",WIND_AMP:"0.07"}),cy:2.35,depth:{CANOPY:"",WIND:"",WIND_AMP:"0.07"},s:.55},{kind:to,t:s.pineT,c:s.pineC,mat:ke({vertexColors:!0,color:"#56803e"},{WIND:"",WIND_AMP:"0.05"}),cy:3.45,depth:null,s:.5},{kind:nh,t:s.firT,c:s.firC,mat:ke({vertexColors:!0,color:"#3e6a42"},{WIND:"",WIND_AMP:"0.02",WIND_BYH:"true"}),cy:0,depth:null,s:.5}],o=[],l=new Map,c=new Map,h=3,u=(E,D)=>Math.min(h-1,Math.floor(E/i*h))*h+Math.min(h-1,Math.floor(D/i*h));for(const E of a){const D=[];for(let L=0;L<i*i;L++)n.tree[L]===E.kind&&D.push(L);for(let L=D.length-1;L>0;L--){const F=Math.floor(e()*(L+1)),z=D[L];D[L]=D[F],D[F]=z}const U=Array.from({length:h*h},()=>[]);for(const L of D){const F=L%i+.5+(e()-.5)*.4,z=Math.floor(L/i)+.5+(e()-.5)*.4,q=jt(n,F,z),N=E.s*(.85+e()*.45),O=e()*fn;U[u(F,z)].push({mt:ot(F,q-.1,z,O,N,N,N),mc:ot(F,q-.1+E.cy*N,z,O,N,N,N),c:new Rt(.85+e()*.3,.85+e()*.3,.8+e()*.25),k:L})}for(const L of U){if(!L.length)continue;const F=new we(E.t,r,L.length),z=new we(E.c,E.mat,L.length);L.forEach((q,N)=>{F.setMatrixAt(N,q.mt),z.setMatrixAt(N,q.mc),z.setColorAt(N,q.c),l.set(q.k,{t:F,c:z,i:N})});for(const q of[F,z])q.castShadow=!0,q.receiveShadow=!0,q.computeBoundingSphere(),t.add(q);E.depth&&(z.customDepthMaterial=jh(E.depth)),o.push({t:F,c:z,n:L.length})}}const f=[],p=(E,D,U,L,F=!0)=>{const z=new we(ks.dode,ke(),Math.max(1,E.length*L));let q=0;for(const N of E)for(let O=0;O<L;O++){const W=N.x+.5+(e()-.5)*.7,$=N.z+.5+(e()-.5)*.7,Q=U*(.6+e()*.6);if(z.setMatrixAt(q,ot(W,jt(n,W,$)+Q*.15,$,e()*fn,Q,Q*(.55+e()*.4),Q,e()*.5,e()*.5)),F){const st=N.z*i+N.x,X=c.get(st)??[];X.push({m:z,i:q}),c.set(st,X)}z.setColorAt(q++,new Rt(D).multiplyScalar(.85+e()*.3))}return z.count=q,z.castShadow=z.receiveShadow=!0,z.computeBoundingSphere(),t.add(z),z};p(n.res.filter(E=>E.kind===An),"#c4bdae",.75,2);const g=n.res.filter(E=>E.kind===Hs);f.push(p(g,"#7a6a58",.7,2),p(g,"#4fa58a",.32,2));const _=n.res.filter(E=>E.kind===Ge),m=new we(ks.ico,ke({color:"#4f7f3a"},{WIND:"",WIND_AMP:"0.03"}),Math.max(1,_.length)),d=new we(ks.ico,ke({color:"#c0303a"},{NO_SNOW:"",FRUIT:""}),Math.max(1,_.length*6)),x=new Map,M=new Map;_.forEach((E,D)=>{const U=E.x+.5,L=E.z+.5,F=jt(n,U,L);m.setMatrixAt(D,ot(U,F+.35,L,e()*fn,1.05,.85,1.05));const z=[];for(let q=0;q<6;q++){const N=e()*fn,O=ot(U+Math.cos(N)*.45,F+.35+e()*.35,L+Math.sin(N)*.45,0,.11,.11,.11);d.setMatrixAt(D*6+q,O),z.push(O)}x.set(E.z*i+E.x,z),M.set(E.z*i+E.x,D*6)});for(const E of[m,d])E.castShadow=!0,E.computeBoundingSphere(),t.add(E);const v=_e(E=>{for(let D=0;D<3;D++)E.add("cone4","#ffffff",ot((D-1)*.12,0,D%2*.1,D*2,.14,.5+D*.08,.14,(D-1)*.3,(D-1)*.25),.15)}),w=[];for(let E=0;E<3e4&&w.length<3200;E++){const D=e()*i,U=e()*i,L=Math.floor(U)*i+Math.floor(D);if(n.terrain[L]!==Ns||n.tree[L])continue;const F=jt(n,D,U);F<.7||F>14||w.push(ot(D,F-.02,U,e()*fn,.6+e()*.6,.5+e()*.6,.6+e()*.6))}const C=new we(v,ke({vertexColors:!0},{GRASSTUFT:"",WIND:"",WIND_AMP:"0.08",WIND_BYH:"true",SNOW_K:"0.6"}),Math.max(1,w.length));return w.forEach((E,D)=>{C.setMatrixAt(D,E),C.setColorAt(D,new Rt(.85+e()*.3,.85+e()*.3,.85+e()*.3))}),C.receiveShadow=!0,C.computeBoundingSphere(),t.add(C),{group:t,trees:o,metal:f,tufts:C,setDensity:(E,D)=>{for(const U of o)U.t.count=U.c.count=Math.floor(U.n*E);C.count=Math.floor(w.length*D)},removeTree:E=>{const D=l.get(E);D&&(D.t.setMatrixAt(D.i,Lr),D.c.setMatrixAt(D.i,Lr),D.t.instanceMatrix.needsUpdate=D.c.instanceMatrix.needsUpdate=!0,l.delete(E))},removeRes:E=>{const D=c.get(E);if(D){for(const{m:U,i:L}of D)U.setMatrixAt(L,Lr),U.instanceMatrix.needsUpdate=!0;c.delete(E)}},setBerries:(E,D)=>{const U=x.get(E),L=M.get(E);!U||L===void 0||(U.forEach((F,z)=>d.setMatrixAt(L+z,D?F:Lr)),d.instanceMatrix.needsUpdate=!0)}}}const _i=new Gt().makeScale(0,0,0),S_=["#e3b98f","#d1a074","#b98559","#9a6a45"],b_=["#2a1c12","#3b2817","#5a3a1e","#1f1a17","#6b4a2a"],E_=["#7b5634","#8d6a43","#6a4a2c","#9a7a55"],T_=["#b9a27a","#a08a5c","#8f7a52","#c8b48a"],A_=["#d9a43a","#7a5634","#bdb6a8","#4f9c85"];function C_(n){const t=[],e=[],i=new Rt;for(const[r,a]of n){const o=r.index?r.toNonIndexed():r,l=o.attributes.position.array;i.set(a);for(let c=0;c<l.length;c+=3)t.push(l[c],l[c+1],l[c+2]),e.push(i.r,i.g,i.b)}const s=new Ee;return s.setAttribute("position",new ne(t,3)),s.setAttribute("color",new ne(e,3)),s.computeVertexNormals(),s}const Wa={leg:new Pe(.12,.44,.13).translate(0,-.22,0),skirt:new oi(.17,.22,.26,8).translate(0,-.13,0),torso:new Pe(.34,.42,.22).translate(0,.21,0),arm:new Pe(.09,.38,.09).translate(0,-.19,0),head:new aa(.13,0),hair:new la(.142,8,4,0,Math.PI*2,0,Math.PI*.55),shield:new oi(.24,.24,.05,10).rotateX(Math.PI/2),spear:_e(n=>{n.add("cyl5","#7a5a3c",ot(0,-.55,0,0,.04,1.75,.04),0),n.add("cone4","#9a948a",ot(0,1.2,0,0,.07,.2,.07),0)}),club:_e(n=>{n.add("cyl5","#6b4a2f",ot(0,-.1,0,0,.05,.5,.05),0),n.add("cyl5","#5a3d27",ot(0,.35,0,0,.12,.3,.12),0)}),axe:_e(n=>{n.add("cyl5","#7a5a3c",ot(0,-.08,0,0,.045,.66,.045),0),n.add("box","#8d8a85",ot(0,.43,.07,0,.045,.14,.15),0),n.add("box","#b9b4aa",ot(0,.44,.15,0,.03,.12,.03),0)}),pick:_e(n=>{n.add("cyl5","#7a5a3c",ot(0,-.08,0,0,.045,.7,.045),0),n.add("box","#8d8a85",ot(0,.55,.02,0,.055,.06,.24),0),n.add("cone4","#a29d94",ot(0,.58,.14,0,.06,.13,.06,Math.PI/2),0)}),mallet:_e(n=>{n.add("cyl5","#7a5a3c",ot(0,-.08,0,0,.045,.62,.045),0),n.add("box","#8d8a85",ot(0,.45,0,0,.12,.12,.26),0)}),arrow:_e(n=>{n.add("cyl5","#8a6a48",ot(0,-.3,0,0,.018,.66,.018),0),n.add("cone4","#b9b4aa",ot(0,.36,0,0,.045,.1,.045),0),n.add("box","#e8e2d4",ot(0,-.3,0,0,.012,.1,.06),0)}),bow:C_([[new hl(.62,.02,4,10,1.1).rotateZ(-.55).rotateY(-Math.PI/2).translate(0,0,-.62),"#6b4a2f"],[new Pe(.008,.65,.008).translate(0,0,-.094),"#ddd6c6"]]),carry:new Pe(.26,.26,.15)},Hc={body:new Pe(1,1,1),neck:new Pe(1,1,1).translate(0,.5,0),collar:new Pe(1,1,1),head:_e(n=>{n.add("box","#ffffff",ot(0,-.5,0,0,1,1,.65),0),n.add("box","#e4e4e4",ot(0,-.42,.55,0,.72,.66,.5),0)}),ears:_e(n=>{for(const t of[-1,1])n.add("cone4","#ffffff",ot(t*.07,0,0,0,.07,.13,.05,0,-t*.35),0)}),leg:new Pe(1,1,1).translate(0,-.5,0),tail:new Pe(1,1,1).translate(0,-.5,0),antlers:_e(n=>{for(const t of[-1,1])n.add("cyl5","#d8c8a8",ot(t*.08,0,0,0,.035,.42,.035,.25,-t*.5),0),n.add("cyl5","#d8c8a8",ot(t*.2,.25,.04,0,.03,.26,.03,-.4,-t*.1),0),n.add("cyl5","#d8c8a8",ot(t*.25,.3,-.02,0,.03,.22,.03,.5,-t*.9),0)}),horns:_e(n=>{for(const t of[-1,1])n.add("cyl5","#e8dcc0",ot(t*.12,0,.02,0,.06,.28,.06,0,-t*1.3),0),n.add("cone4","#3a3530",ot(t*.36,.08,.05,0,.07,.28,.07,.5,-t*.3),0)}),tusks:_e(n=>{for(const t of[-1,1])n.add("cone4","#f0eadc",ot(t*.1,0,0,0,.05,.14,.05,0,-t*.5),0)})},Ji={deer:{body:[.34,.4,.95],leg:.72,legW:.075,head:[.17,.2,.36],neck:.32,tail:[.08,.12,.06],color:["#8a5a36","#7d5230","#93613b"],antl:!0},boar:{body:[.4,.42,.85],leg:.3,legW:.1,head:[.24,.26,.46],neck:.04,tail:[.04,.14,.04],color:["#3e3229","#4a3b30"],tusks:!0},wolf:{body:[.24,.28,.72],leg:.38,legW:.07,head:[.17,.18,.34],neck:.18,tail:[.07,.34,.07],color:["#77746f","#6a665f"]},aurochs:{body:[.58,.64,1.4],leg:.66,legW:.15,head:[.3,.32,.5],neck:.1,tail:[.06,.42,.06],color:["#2b221d","#3a2a20"],horns:!0},dog:{body:[.2,.24,.58],leg:.32,legW:.06,head:[.15,.16,.3],neck:.16,tail:[.05,.3,.05],color:["#7a6650","#5d4d3c","#8a7a62"]}},Yo=n=>n*n*(3-2*n);function Is(n,t,e){if(n<.12)return e-.12*Math.sin(n/.12*Math.PI);if(n<.68)return e+(t-e)*Yo((n-.12)/.56);if(n<.8)return t;const i=(n-.8)/.2;return t+(e-t)*i*i}const Ls=n=>n>.85?(n-.85)/.15:n<.15?1-n/.15:0,Jh=2.6;function Qh(n){const t=Ji[Pt[n]?.key??""];return t?t.leg+t.body[1]*.5:.72}const Dr=n=>{let t=Math.imul(n^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),((t^t>>>16)>>>0)/4294967296},ti=(n,t)=>n[Math.floor(t*n.length)%n.length];class R_{constructor(t=720,e=160){I(this,"group",new bn);I(this,"hm",{});I(this,"am",{});I(this,"ring");I(this,"barBg");I(this,"barFg");I(this,"slotH");I(this,"slotA");I(this,"lookKey",[]);I(this,"heading",new Float32Array(4096));I(this,"phase",new Float32Array(4096));I(this,"m",{b:new Gt,hip:new Gt,tor:new Gt,l:new Gt,t:new Gt,al:new Gt,ar:new Gt,hd:new Gt});I(this,"e",new tn);I(this,"q",new li);I(this,"p",new k);I(this,"s",new k);I(this,"v",new k);I(this,"c",new Rt);this.maxH=t,this.maxA=e;const i=ke({},{NO_SNOW:""}),s=ke({vertexColors:!0},{NO_SNOW:""});for(const o in Wa){const l=o==="leg"||o==="arm"?t*2:t,c=!!Wa[o].attributes.color,h=new we(Wa[o],c?s:i,l);h.instanceMatrix.setUsage(an),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let u=0;u<l;u++)h.setColorAt(u,this.c.set("#ffffff"));this.group.add(h),this.hm[o]=h}for(const o in Hc){const l=o==="leg"?e*4:e,c=["head","ears","antlers","horns","tusks"].includes(o),h=new we(Hc[o],c?s:i,l);h.instanceMatrix.setUsage(an),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let u=0;u<l;u++)h.setColorAt(u,this.c.set("#ffffff"));this.group.add(h),this.am[o]=h}const r=new oa(.36,.46,28).rotateX(-Math.PI/2);this.ring=new we(r,new Gn({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,toneMapped:!1}),t);const a=new ci(1,.11);this.barBg=new we(a,new Gn({color:1711900,transparent:!0,opacity:.75,depthTest:!1,toneMapped:!1}),400),this.barFg=new we(a.clone().translate(.5,0,0),new Gn({color:16777215,transparent:!0,opacity:1,depthTest:!1,toneMapped:!1}),400);for(const o of[this.ring,this.barBg,this.barFg])o.instanceMatrix.setUsage(an),o.frustumCulled=!1,o.count=0,this.group.add(o);this.ring.renderOrder=5,this.barBg.renderOrder=8,this.barFg.renderOrder=9;for(let o=0;o<t;o++)this.ring.setColorAt(o,this.c.set("#9dffc4"));for(let o=0;o<400;o++)this.barFg.setColorAt(o,this.c.set("#6fe08a"));this.slotH=new Int32Array(t).fill(-1),this.slotA=new Int32Array(e).fill(-1)}trs(t,e,i,s,r=0,a=0,o=0,l=1,c=l,h=l){return this.e.set(r,a,o,"YXZ"),this.q.setFromEuler(this.e),this.p.set(e,i,s),this.s.set(l,c,h),t.compose(this.p,this.q,this.s)}look(t,e){const i=Dr(e*7+1),s=Dr(e*13+5),r=t.owner[e],a=r>=0&&r<t.players.length?t.players[r].era:0,o=r===ii?"#4f6b4a":t.players[r]?.color??"#888",l=Pt[t.kind[e]].key,c=ti(S_,i),h=ti(b_,s),u=ti(E_,s),f=ti(T_,i),p={skin:c,hair:h,tunic:u,skirt:o,legs:c,arms:c,weapon:null,shield:null,bigHair:!1,sc:.95+i*.08};switch(l){case"villager":return{...p,tunic:a?f:u,arms:a?c:u};case"warrior":return{...p,tunic:o,skirt:u,weapon:"club",sc:1.02};case"axeman":return{...p,tunic:o,skirt:f,weapon:"axe",sc:1.04};case"hunter":return{...p,weapon:"spear"};case"archer":return{...p,tunic:o,skirt:f,weapon:"bow"};case"spearman":return{...p,tunic:o,skirt:f,weapon:"spear",shield:"#8a6a44",sc:1.04};case"barbarian":return{...p,tunic:ti(["#4f6b4a","#6b5a3a","#3f5a6a"],i),skirt:"#5a4d3c",legs:"#5a4d3c",weapon:"spear",shield:ti(["#3f6a4a","#8a6a3a"],s),hair:ti(["#c48a4a","#8a5a2a","#d9a35f"],i),bigHair:!0,sc:1.05}}return p}colorHuman(t,e){const i=this.hm,s=this.c;i.leg.setColorAt(t*2,s.set(e.legs)),i.leg.setColorAt(t*2+1,s),i.skirt.setColorAt(t,s.set(e.skirt)),i.torso.setColorAt(t,s.set(e.tunic)),i.arm.setColorAt(t*2,s.set(e.arms)),i.arm.setColorAt(t*2+1,s),i.head.setColorAt(t,s.set(e.skin)),i.hair.setColorAt(t,s.set(e.hair)),i.shield.setColorAt(t,s.set(e.shield??"#888"));for(const r in i)i[r].instanceColor&&(i[r].instanceColor.needsUpdate=!0)}speciesOf(t,e){const i=t.kind[e]===Jt?t.sub[e]:t.kind[e];return Pt[i]?.key??"deer"}update(t,e,i,s,r,a,o,l){const c=t.size,h=t.vis[r],u=this.hm,f=this.am;let p=0,g=0,_=0,m=0;for(let d=0;d<t.top;d++){if(!t.alive[d])continue;const x=t.kind[d];if(x>=se){const L=Te[x-se],F=t.x[d]/256,z=t.z[d]/256;if(a&&t.owner[d]!==r&&!h[Math.floor(z)*c+Math.floor(F)])continue;const q=jt(t.map,F,z),N=s.has(d);N&&_<this.maxH&&this.ring.setMatrixAt(_++,ot(F,q+.08,z,0,L.size*.95,1,L.size*.95)),(N||t.hp[d]<L.hp)&&m<400&&this.bar(m++,F,q+2.3,z,t.hp[d]/L.hp,L.size*.6,l);continue}const M=(t.px[d]+(t.x[d]-t.px[d])*e)/256,v=(t.pz[d]+(t.z[d]-t.pz[d])*e)/256;if(a&&t.owner[d]!==r){const L=Math.floor(M),F=Math.floor(v);if(L<0||F<0||L>=c||F>=c||!h[F*c+L])continue}const w=t.x[d]-t.px[d],C=t.z[d]-t.pz[d],A=(w!==0||C!==0)&&t.state[d]===Ze,P=jt(t.map,M,v);let S=this.heading[d];if(A)S=Math.atan2(w,C);else if(x!==Jt&&(t.task[d]===Ie||t.task[d]===Vn||t.task[d]===Je)&&t.tgt[d]>=0){const L=t.tgt[d];let F,z;t.task[d]===Ie&&t.tgtTile[d]?(F=L%c+.5,z=Math.floor(L/c)+.5):(F=t.x[L]/256,z=t.z[L]/256),Math.abs(F-M)+Math.abs(z-v)>.05&&(S=Math.atan2(F-M,z-v))}const y=this.heading[d];this.heading[d]=y+Math.atan2(Math.sin(S-y),Math.cos(S-y))*Math.min(1,i*10);const E=this.heading[d],D=Math.hypot(w,C)/256*10,U=x===Jt||t.owner[d]===pe||Pt[x].key==="dog";if(U){if(g>=this.maxA)continue;const L=this.speciesOf(t,d),F=Ji[L]??Ji.deer;this.phase[d]+=A?i*D*2.6/F.leg:0;const z=d*64+x;if(this.slotA[g]!==z){this.slotA[g]=z;const W=this.c.set(ti(F.color,Dr(d)));x===Jt&&W.multiplyScalar(.8);for(const $ of["body","neck","head","ears","tail"])f[$].setColorAt(g,W);for(let $=0;$<4;$++)f.leg.setColorAt(g*4+$,W);f.collar.setColorAt(g,this.c.set(t.players[t.owner[d]]?.color??"#888"));for(const $ in f)f[$].instanceColor&&(f[$].instanceColor.needsUpdate=!0)}const q=x!==Jt&&t.task[d]===Je&&!A;let N=0,O=0;if(q){const W=1-Math.max(0,Math.min(1,(t.cd[d]-e)/Pt[x].cd));N=W>.8?(W-.8)/.2:W<.2?1-W/.2:0;const $=t.tgt[d];if($>=0&&t.alive[$]){const Q=Math.hypot(t.x[$]-t.x[d],t.z[$]-t.z[d])/256,st=F.body[2]*.5+F.neck*.3+F.head[2]*.85,X=t.kind[$]<Jt?Pt[t.kind[$]].radius:.5;O=Math.max(0,Math.min(F.body[2]*.3,Q-st-X*.95))}}this.poseAnimal(g,F,M,P,v,E,A,this.phase[d],o,x===Jt,t.fast[d]===1,L==="deer"&&Dr(d*3)<.5,x===Jt?1:1+(L==="aurochs"?.1:0),q,N,O,t.owner[d]>=0&&x!==Jt),g++}else{if(p>=this.maxH)continue;this.phase[d]+=A?i*D*7.2:0;const L=t.owner[d],F=`${x}:${L}:${L>=0&&L<t.players.length?t.players[L].era:0}`,z=this.look(t,d);(this.slotH[p]!==d||this.lookKey[p]!==F)&&(this.slotH[p]=d,this.lookKey[p]=F,this.colorHuman(p,z)),this.poseHuman(t,d,p,z,M,P,v,E,A,o,e),p++}if(s.has(d)&&_<this.maxH){const L=U?1.2:1;this.ring.setMatrixAt(_++,ot(M,P+.06,v,0,L,1,L))}x!==Jt&&(s.has(d)||t.hp[d]<Pt[x].hp)&&m<400&&this.bar(m++,M,P+(U?1.3:1.55),v,t.hp[d]/Pt[x].hp,.7,l)}for(const d in u)u[d].count=p,u[d].instanceMatrix.needsUpdate=!0;u.leg.count=u.arm.count=p*2;for(const d in f)f[d].count=g,f[d].instanceMatrix.needsUpdate=!0;f.leg.count=g*4,this.ring.count=_,this.ring.instanceMatrix.needsUpdate=!0,this.barBg.count=this.barFg.count=m,this.barBg.instanceMatrix.needsUpdate=this.barFg.instanceMatrix.needsUpdate=!0,this.barFg.instanceColor&&(this.barFg.instanceColor.needsUpdate=!0)}bar(t,e,i,s,r,a,o){r=Math.max(0,Math.min(1,r)),this.p.set(e,i,s),this.s.set(a,1,1),this.barBg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.v.set(-a/2,0,0).applyQuaternion(o),this.p.set(e+this.v.x,i+this.v.y,s+this.v.z),this.s.set(a*r,1,1),this.barFg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.barFg.setColorAt(t,this.c.set(r>.6?"#6fe08a":r>.3?"#f2c14e":"#e0533c"))}gripTorso(t,e,i,s,r=0){return this.v.set(0,-.35,i).applyMatrix4(e),t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t,0,0,0,s,r))}poseHuman(t,e,i,s,r,a,o,l,c,h,u){const f=this.hm,p=this.m,g=this.phase[e],_=Math.sin(g),m=h+e*.37;let d=0,x=0,M=.05+Math.sin(m*1.3)*.03,v=-.05-Math.sin(m*1.3)*.03,w=.07,C=-.07,A=0,P=0,S=s.weapon,y=s.weapon==="spear"?"torso":s.weapon==="bow"?"left":"arm",E=s.weapon==="spear"?.12:s.weapon==="bow"?0:.79,D=0,U=!1,L=0;const F=()=>{C=-.42,w=.42,M=v+.06},z=t.task[e];if(c)d=_*.65,x=-_*.65,M=-_*.5,v=_*.5,P=Math.abs(Math.cos(g))*.035;else if(z===Ie&&t.phase[e]===hh){const q=t.tgt[e],N=t.tgtTile[e]===1,O=N&&t.map.tree[q]>0,W=N&&t.resKind[q]===1,$=!N&&t.kind[q]>=se;if(O)v=Is(m/1%1,-2.75,-1.35),F(),A=.1+Ls(m/1%1)*.12,S="axe",y="arm",E=Math.PI-.6;else if(N&&!W)v=Is(m/1.15%1,-2.8,-.55),F(),A=.22+Ls(m/1.15%1)*.14,S="pick",y="arm",E=Math.PI-.6;else if($)v=Is(m/1.4%1,-1.95,-.35),F(),A=.32+Ls(m/1.4%1)*.1,S="pick",y="arm",E=Math.PI-.7;else if(W){const Q=Math.sin(m*4.5);v=-.95+Q*.45,M=-.95-Q*.45,C=-.2,w=.2,A=.5,S=null}else v=-.55+Math.sin(m*7)*.3,M=-.4,A=.68,S=null}else if(z===Vn&&t.state[e]!==Ze){const q=m/.75%1;v=Is(q,-2.3,-.7),C=-.15,M=-.75,A=.15+Ls(q)*.08,S="mallet",y="arm",E=Math.PI-.75}else if(z===Je&&t.state[e]!==Ze){const q=Pt[t.kind[e]],N=1-Math.max(0,Math.min(1,(t.cd[e]-u)/q.cd)),O=t.tgt[e],W=!!q.hunt&&O>=0&&t.owner[O]===pe,$=O>=0&&t.alive[O]?t.reach(e,O,!1)/256:9;if(q.proj==="arrow"||s.weapon==="bow")S="bow",y="left",E=0,M=-1.5,w=.2,C=-.3,A=-.04,v=N<.2?-.95-N/.2*.5:-1.45,U=N>=.25;else if((q.proj==="spear"||W)&&$>=Jh)if(S=N<.3?null:"spear",y="torso",E=Math.PI/2-.25,D=.1,M=-1,A=-.05,N<.3)v=-1.25+N/.3*1.05,A=.12-N/.3*.17;else if(N<.75)v=-.2-Yo((N-.3)/.45)*2.55;else if(N<.9)v=-2.75;else{const Q=(N-.9)/.1;v=-2.75+Q*Q*1.5,A=-.05+Q*.17}else if(s.weapon==="spear"||q.proj==="spear"||W){if(S="spear",y="torso",D=.05,M=s.shield?-.9:-.5,w=.15,N<.15)v=-1.25;else if(N<.85)v=-1.25+Yo((N-.15)/.7)*.9;else{const ut=(N-.85)/.15;v=-.35-ut*ut*.9}A=.06+(N>.85?(N-.85)/.15:N<.15?1-N/.15:0)*.12;let Q=$,st=.72;const X=O>=0?Math.hypot(t.x[O]-t.x[e],t.z[O]-t.z[e])/256:$;if(O>=0&&t.alive[O]&&t.kind[O]<Jt){const ut=Ji[Pt[t.kind[O]].key];if(st=Qh(t.kind[O]),ut){const Et=Math.cos(Math.atan2(t.x[e]-t.x[O],t.z[e]-t.z[O])-this.heading[O]);Q=X-Math.max(ut.body[0]*.55,ut.body[2]*.5*Math.abs(Et))}else Q=X-.2}const et=.35*Math.sin(-v),lt=(.84-.35*Math.cos(v))*s.sc,rt=Math.atan2(lt-st,Math.max(.4,X-et));E=Math.PI/2+rt,L=Math.max(0,et+1.4*Math.cos(rt)-Q+.03)}else{S||(S="club");const Q=O>=0&&t.alive[O]?t.kind[O]>=se?1:Ji[Pt[t.kind[O]]?.key??""]?(()=>{const X=Ji[Pt[t.kind[O]].key];return X.leg+X.body[1]+.06})():1.15:.6;let st=-.6;for(;st>-2.2&&(.84-.35*Math.cos(st)-.5*Math.cos(st-.75))*s.sc<Q;)st-=.05;y="arm",E=Math.PI-.75,v=Is(N,-2.6,Math.max(-2.25,st)),C=-.15,M=-.5,A=.08+Ls(N)*.12}}this.trs(p.b,r,a+P,o,0,l,0,s.sc),p.hip.multiplyMatrices(p.b,this.trs(p.t,0,.46,0)),p.tor.multiplyMatrices(p.hip,this.trs(p.t,0,0,0,A)),f.torso.setMatrixAt(i,p.tor),f.leg.setMatrixAt(i*2,p.l.multiplyMatrices(p.hip,this.trs(p.t,.09,0,0,d))),f.leg.setMatrixAt(i*2+1,p.l.multiplyMatrices(p.hip,this.trs(p.t,-.09,0,0,x))),f.skirt.setMatrixAt(i,p.l.multiplyMatrices(p.hip,this.trs(p.t,0,.03,0,A*.35))),p.al.multiplyMatrices(p.tor,this.trs(p.t,.215,.38,0,M,0,-w)),f.arm.setMatrixAt(i*2,p.al),p.ar.multiplyMatrices(p.tor,this.trs(p.t,-.215,.38,0,v,0,-C)),f.arm.setMatrixAt(i*2+1,p.ar),p.hd.multiplyMatrices(p.tor,this.trs(p.t,0,.56,0,-A*.6)),f.head.setMatrixAt(i,p.hd),f.hair.setMatrixAt(i,p.l.multiplyMatrices(p.hd,this.trs(p.t,0,.03,-.012,0,0,0,s.bigHair?1.18:1))),s.shield?(this.v.set(.04,-.24,.13).applyMatrix4(p.al),f.shield.setMatrixAt(i,p.l.copy(p.tor).setPosition(this.v))):f.shield.setMatrixAt(i,_i);for(const q of["spear","club","axe","pick","mallet","bow","arrow"])f[q].setMatrixAt(i,_i);S&&(y==="arm"?f[S].setMatrixAt(i,p.l.multiplyMatrices(p.ar,this.trs(p.t,0,-.35,0,E))):(this.gripTorso(p.l,y==="left"?p.al:p.ar,y==="left"?.02:0,E,y==="torso"?D:0),L&&p.l.multiply(this.trs(p.t,0,-L,0)),f[S].setMatrixAt(i,p.l))),U&&f.arrow.setMatrixAt(i,this.gripTorso(p.l,p.al,.02,Math.PI/2,-.12)),t.carry[e]>0?(f.carry.setMatrixAt(i,p.l.multiplyMatrices(p.tor,this.trs(p.t,0,.2,-.19))),f.carry.setColorAt(i,this.c.set(A_[t.carryRes[e]]??"#888")),f.carry.instanceColor&&(f.carry.instanceColor.needsUpdate=!0)):f.carry.setMatrixAt(i,_i)}poseAnimal(t,e,i,s,r,a,o,l,c,h,u,f,p,g=!1,_=0,m=0,d=!1){const x=this.am,M=this.m,[v,w,C]=e.body,[A,P,S]=e.head,y=e.leg+w*.5,E=o?Math.sin(l)*(u?.8:.45):0,D=o?Math.abs(Math.cos(l))*(u?.06:.025):0;h?this.trs(M.b,i,s+v*.5-y*0,r,0,a,Math.PI/2,p):this.trs(M.b,i,s+D,r,0,a,0,p),h&&M.b.multiply(this.trs(M.t,0,-y+v*.1,0)),_>0&&M.b.multiply(this.trs(M.t,0,0,m*_,.1*_)),x.body.setMatrixAt(t,M.l.multiplyMatrices(M.b,this.trs(M.t,0,y,0,0,0,0,v,w,C))),[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([F,z],q)=>x.leg.setMatrixAt(t*4+q,M.l.multiplyMatrices(M.b,this.trs(M.t,F*v*.32,e.leg,z*C*.36,F*z>0?E:-E,0,0,e.legW,e.leg,e.legW))));const U=h?.2:g?.05+_*.55:o?u?.15:-.3:.9+Math.sin(c*1.7+i)*.08;M.hd.multiplyMatrices(M.b,this.trs(M.t,0,y+w*.3,C*.46,U)),x.neck.setMatrixAt(t,M.l.multiplyMatrices(M.hd,this.trs(M.t,0,-.04,0,.29,0,0,A*.72,e.neck*1.05+.1,P*.72))),x.collar.setMatrixAt(t,d?M.l.multiplyMatrices(M.hd,this.trs(M.t,0,e.neck*.45,e.neck*.13,.29,0,0,A*.9,.06,P*.9)):_i),M.hd.multiply(this.trs(M.t,0,e.neck,e.neck*.3+S*.3,-U*.6)),x.head.setMatrixAt(t,M.l.multiplyMatrices(M.hd,this.trs(M.t,0,0,0,0,0,0,A,P,S)));const L=A/.15;x.ears.setMatrixAt(t,M.l.multiplyMatrices(M.hd,this.trs(M.t,0,P*.5,-S*.2,0,0,0,L,L,L))),x.antlers.setMatrixAt(t,f&&e.antl?M.l.multiplyMatrices(M.hd,this.trs(M.t,0,P*.45,-S*.12)):_i),x.horns.setMatrixAt(t,e.horns?M.l.multiplyMatrices(M.hd,this.trs(M.t,0,P*.35,S*.02)):_i),x.tusks.setMatrixAt(t,e.tusks?M.l.multiplyMatrices(M.hd,this.trs(M.t,0,-P*.25,S*.72,-.6)):_i),x.tail.setMatrixAt(t,M.l.multiplyMatrices(M.b,this.trs(M.t,0,y+w*.32,-C*.5,-.4+(o?Math.sin(l*2)*.15:Math.sin(c*3+i)*.06),0,0,e.tail[0],e.tail[1],e.tail[2])))}}const $s="#6e4f37",Ai="#8a6545",Xa="#a0754c",Gc="#c9a75e",Vc="#b8954f",qa="#cdb48a",w_="#9b968c";function Ur(n,t,e,i,s,r,a){const o=a()*fn;n.add("cone7",r,ot(t,0,e,o,i*2,s,i*2));for(let l=0;l<3;l++){const c=l*fn/3+o;n.add("cyl5",$s,ot(t+Math.cos(c)*.08,s-.3,e+Math.sin(c)*.08,0,.05,.6,.05,Math.sin(c)*.3,Math.cos(c)*.3))}n.add("box","#3b2b1f",ot(t+Math.cos(o)*i*.8,0,e-Math.sin(o)*i*.8,o,.36,s*.38,.06))}function $a(n,t,e,i=1){for(let s=0;s<9;s++){const r=s/9*fn;n.add("dode","#8a857c",ot(t+Math.cos(r)*.5*i,.05,e+Math.sin(r)*.5*i,r,.24*i,.18*i,.24*i))}n.add("cyl5","#4a3526",ot(t,.08,e,.3,.1,.8*i,.1,Math.PI/2,0)),n.add("cyl5","#4a3526",ot(t,.1,e,1.9,.1,.8*i,.1,Math.PI/2,0))}function Ya(n,t,e,i,s,r,a,o,l,c=0,h=0){n.add("box",o,ot(t,h,e,c,i,r,s)),n.add("prism",l,ot(t,h+r-.04,e,c,i+.4,a,s+.36)),n.add("box","#3a2a1e",ot(t+Math.sin(c)*(s/2+.01),h,e+Math.cos(c)*(s/2+.01),c,Math.min(.5,i*.3),r*.72,.06))}function Wc(n,t,e,i){for(let s=0;s<e;s++){const r=s/e*fn;n.add("box",w_,ot(Math.cos(r)*t,0,Math.sin(r)*t,r,.3,i*(.8+s%3*.15),.22))}}function P_(n,t){const e=Math.round(t*4);for(let i=0;i<=e;i++){const s=-t+i*2*t/e;for(const[r,a]of[[s,-t],[s,t],[-t,s],[t,s]])n.add("cyl5",$s,ot(r,0,a,0,.08,.6,.08))}for(const i of[.25,.48])n.add("box",Ai,ot(0,i,-t,0,t*2,.05,.05)),n.add("box",Ai,ot(0,i,t,0,t*2,.05,.05)),n.add("box",Ai,ot(-t,i,0,0,.05,.05,t*2)),n.add("box",Ai,ot(t,i,0,0,.05,.05,t*2))}function Ka(n,t,e,i){n.add("ico","#ece6d6",ot(t,.32,e,i,.5,.36,.62)),n.add("box","#3a332e",ot(t+Math.sin(i)*.32,.36,e+Math.cos(i)*.32,i,.13,.16,.2));for(const[s,r]of[[-.1,-.15],[.1,-.15],[-.1,.15],[.1,.15]])n.add("box","#3a332e",ot(t+s,0,e+r,i,.05,.2,.05))}function I_(n,t,e){const i=new dl(e),s=Math.min(t,1);switch(n){case"center":s===0?($a(i,0,0,1),[.4,1.5,2.6,3.6,4.7,5.6].forEach((r,a)=>Ur(i,Math.cos(r)*1.45,Math.sin(r)*1.45,.48,1.25+a%2*.2,[Xa,"#8d6a46","#b58a5d"][a%3],e))):(Ya(i,0,-.4,2.2,3.2,1.3,1.5,qa,Gc,Math.PI/2),$a(i,1.2,1.3,.6),i.add("cyl8","#a0654a",ot(-1.3,0,1.3,0,.5,.55,.5)));break;case"house":s===0?(Ur(i,0,0,.8,1.5,Xa,e),i.add("box","#9a7148",ot(.6,0,.6,.4,.3,.4,.03))):Ya(i,0,0,1.3,1.6,1,.95,qa,Vc,e()<.5?0:Math.PI/2);break;case"depot":if(s===0){for(let r=0;r<6;r++)i.add("cyl5","#5e4431",ot(-.3,.1+r%3*.18,-.35+Math.floor(r/3)*.18+r%3*.05,.2,.17,1.2,.17,Math.PI/2,0));i.add("prism",Xa,ot(.35,0,.3,.3,1,.8,1.1)),i.add("cyl8","#b48a5c",ot(.55,0,-.5,0,.3,.3,.3))}else{for(const[r,a]of[[-.45,-.45],[.45,-.45],[-.45,.45],[.45,.45]])i.add("cyl5",$s,ot(r,0,a,0,.13,.6,.13));i.add("cyl8",qa,ot(0,.6,0,0,1.3,.8,1.3)),i.add("cone7",Gc,ot(0,1.38,0,0,1.8,.9,1.8))}break;case"military":if(s===0){Wc(i,1.15,10,.32),Ur(i,-.55,-.5,.5,1.2,"#8d6a46",e);for(let r=0;r<4;r++)i.add("cyl5","#8a6a48",ot(.6+r*.12,0,.55,0,.04,1.3,.04,.12));i.add("cyl5",$s,ot(.5,0,-.6,0,.12,.9,.12))}else{Ya(i,-.3,-.2,1.8,2.2,1.2,1.2,"#c4a77c",Vc,0);for(let r=0;r<7;r++)i.add("cyl5",Ai,ot(-1.3+r*.4,0,1.25,0,.14,.9+r%2*.15,.14));for(let r=0;r<3;r++)i.add("cyl5","#8a6a48",ot(1,0,-.6+r*.25,0,.04,1.3,.04,0,.1))}break;case"farm":i.add("box","#7d5f3e",ot(0,-.02,0,0,3,.08,3),.02);for(let r=0;r<4;r++)i.add("box","#6b4f33",ot(0,.03,-1.12+r*.75,0,2.8,.07,.28),.03);for(const[r,a]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])i.add("cyl5",Ai,ot(r,0,a,0,.08,.5,.08));break;case"pen":P_(i,1.35),Ka(i,-.5,-.3,.6),Ka(i,.45,.2,2.5),Ka(i,-.2,.65,4.1),i.add("box","#a0754c",ot(.8,0,-.8,.3,.5,.2,.3));break;case"sanctuary":i.add("box","#a8a397",ot(0,-.1,0,.3,.5,2,.35,.05)),Wc(i,.85,8,.45),i.add("dode","#8a857c",ot(.5,0,.45,0,.4,.3,.4));break;case"camp":$a(i,0,0,1);for(let r=0;r<4;r++){const a=r/4*fn+.4;Ur(i,Math.cos(a)*1.4,Math.sin(a)*1.4,.55,1.4,["#6b5a45","#5d5040","#7a6248"][r%3],e)}for(let r=0;r<9;r++){const a=-.9+r*.22;i.add("cyl5","#5a4030",ot(Math.cos(a)*1.95,0,Math.sin(a)*1.95,0,.16,1.1+r%2*.2,.16))}break}return i.build()}function L_(n,t,e){const i=[],s=[],r=new Rt,a=(u,f)=>jt(n,u,f),o=(u,f,p,g,_,m)=>{const d=[[u,f],[u,g],[p,g],[p,f]].map(([x,M])=>[x,a(x,M)+_,M]);r.set(m);for(const x of[0,1,3,1,2,3])i.push(...d[x]),s.push(r.r,r.g,r.b)};for(let u=0;u<6;u++)for(let f=0;f<6;f++){const p=t-1.5+u*.5,g=e-1.5+f*.5;o(p,g,p+.5,g+.5,.05,(u+f)%2?"#7d5f3e":"#795b3a")}for(let u=0;u<4;u++){const f=e-1.12+u*.75;for(let p=0;p<7;p++){const g=t-1.4+p*.4;o(g,f-.14,g+.4,f+.14,.09,"#6b4f33")}}const l=new dl;for(const[u,f]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])l.add("cyl5",Ai,ot(t+u,a(t+u,e+f),e+f,0,.08,.5,.08));const c=l.build();i.push(...c.attributes.position.array),s.push(...c.attributes.color.array);const h=new Ee;return h.setAttribute("position",new ne(i,3)),h.setAttribute("color",new ne(s,3)),h.computeVertexNormals(),h.computeBoundingSphere(),h}const Xc=new Map;function fl(n,t){const e=Math.min(t,1),i=n+e;let s=Xc.get(i);return s||(s=I_(n,e,Zh(n.length*31+e)),Xc.set(i,s)),s}const D_=_e(n=>n.add("cyl5",$s,ot(0,0,0,0,.06,2,.06),0)),U_=new Pe(.42,.34,.03).translate(.24,1.75,0);class N_{constructor(){I(this,"group",new bn);I(this,"meshes",new Map);I(this,"poles");I(this,"flags");I(this,"crops");I(this,"mat",ke({vertexColors:!0}));I(this,"farms",new Map);I(this,"fires",[]);I(this,"smokes",[]);this.poles=new we(D_,ke({vertexColors:!0}),256),this.flags=new we(U_,ke({},{NO_SNOW:""}),256);const t=_e(e=>{for(let i=0;i<3;i++)e.add("cone4","#ffffff",ot((i-1)*.1,0,i%2*.08,i,.1,.75,.1,(i-1)*.15,0),.1)});this.crops=new we(t,ke({vertexColors:!0},{CROP:"",CROPCOL:"",WIND:"",WIND_AMP:"0.06",WIND_BYH:"true",SNOW_K:"0.5"}),2560),this.crops.customDepthMaterial=jh({CROP:""});for(const e of[this.poles,this.flags,this.crops])e.instanceMatrix.setUsage(an),e.frustumCulled=!1,e.castShadow=!0,e.receiveShadow=!0,e.count=0,this.group.add(e);for(let e=0;e<256;e++)this.flags.setColorAt(e,new Rt("#ffffff"))}mesh(t,e){const i=t+e;let s=this.meshes.get(i);return s||(s=new we(fl(t,e),this.mat,t==="center"||t==="camp"?8:64),s.instanceMatrix.setUsage(an),s.frustumCulled=!1,s.castShadow=!0,s.receiveShadow=!0,s.count=0,this.meshes.set(i,s),this.group.add(s)),s}update(t,e,i,s=0){const r=new Map;let a=0,o=0;const l=t.size,c=t.explored[e];this.fires.length=0,this.smokes.length=0;const h=new Rt,u=new Set;for(let f=0;f<t.top;f++){if(!t.alive[f]||t.kind[f]<se)continue;const p=Te[t.kind[f]-se],g=t.owner[f],_=t.x[f]/256,m=t.z[f]/256;if(i&&g!==e&&!c[Math.floor(m)*l+Math.floor(_)])continue;const d=g>=0&&g<t.players.length?t.players[g].era:0;if(p.key==="farm"){let P=this.farms.get(f);if(P&&(P.x!==_||P.z!==m)&&(this.group.remove(P.mesh),P.mesh.geometry.dispose(),P=void 0),!P){const S=new be(L_(t.map,_,m),this.mat);S.receiveShadow=S.castShadow=!0,this.group.add(S),P={mesh:S,x:_,z:m},this.farms.set(f,P)}if(P.mesh.visible=!0,u.add(f),t.done[f])for(let S=0;S<4;S++)for(let y=0;y<9&&o<this.crops.instanceMatrix.count;y++){const E=_-1.25+y*.31,D=m-1.12+S*.75;this.crops.setMatrixAt(o++,ot(E,jt(t.map,E,D)+.08,D,(y*7+S)%6,1,.85+(y+S)%3*.12,1))}continue}const x=this.mesh(p.key,Math.min(d,1)),M=r.get(x)??0;if(M>=x.instanceMatrix.count)continue;const v=jt(t.map,_,m),w=t.done[f]===1,C=w?1:Math.max(.12,Math.min(1,t.work[f]/(p.time*100))),A=(f*2654435761>>>0)%4*Math.PI/2;if(x.setMatrixAt(M,ot(_,v-.02,m,p.key==="farm"?0:A,1,C,1)),r.set(x,M+1),p.key!=="farm"&&w&&a<256){const P=p.size/2-.25,S=_+P,y=m-P;this.poles.setMatrixAt(a,ot(S,jt(t.map,S,y),y)),this.flags.setMatrixAt(a,ot(S,jt(t.map,S,y),y,Math.sin(s*1.1+f)*.15)),this.flags.setColorAt(a,h.set(g===ii?"#efe6cf":t.players[g]?.color??"#888")),a++}if(w&&(p.key==="center"||p.key==="camp")){const P=d>=1&&p.key==="center",S=P?_+1.2*Math.cos(A)+1.3*Math.sin(A):_,y=P?m-1.2*Math.sin(A)+1.3*Math.cos(A):m;this.fires.push({x:S,y:jt(t.map,S,y)+.15,z:y,s:d>=1&&p.key==="center"?.42:.6}),this.smokes.push({x:S,y:jt(t.map,S,y)+.3,z:y,s:1})}}for(const f of this.meshes.values())f.count=r.get(f)??0,f.instanceMatrix.needsUpdate=!0;for(const[f,p]of this.farms)u.has(f)||(!t.alive[f]||t.kind[f]!==se+pn.farm?(this.group.remove(p.mesh),p.mesh.geometry.dispose(),this.farms.delete(f)):p.mesh.visible=!1);this.poles.count=this.flags.count=a,this.poles.instanceMatrix.needsUpdate=this.flags.instanceMatrix.needsUpdate=!0,this.flags.instanceColor&&(this.flags.instanceColor.needsUpdate=!0),this.crops.count=o,this.crops.instanceMatrix.needsUpdate=!0}}class F_{constructor(t=48){I(this,"mesh");this.mesh=new we(new qs(.32,1,6).translate(0,.5,0),ul(new Gn({color:16777215,toneMapped:!1}),{NO_SNOW:""}),t),this.mesh.instanceMatrix.setUsage(an),this.mesh.frustumCulled=!1;for(let e=0;e<t;e++)this.mesh.setColorAt(e,new Rt(e%2?"#ffd166":"#ff7b2e"))}update(t,e){let i=0;const s=this.mesh.instanceMatrix.count;for(const r of t){const a=.85+Math.sin(e*13+r.x)*.12+Math.sin(e*29+r.z)*.08;i<s&&this.mesh.setMatrixAt(i++,ot(r.x,r.y,r.z,e*2+r.x,r.s,r.s*1.25*a,r.s)),i<s&&this.mesh.setMatrixAt(i++,ot(r.x,r.y,r.z,-e*3,r.s*.55,r.s*.85*(2-a),r.s*.55))}this.mesh.count=i,this.mesh.instanceMatrix.needsUpdate=!0}}const z_=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`,k_=`varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class O_{constructor(t,e=500){I(this,"n");I(this,"pos");I(this,"a");I(this,"sz");I(this,"colr");I(this,"age");I(this,"life");I(this,"vel");I(this,"grow");I(this,"next",0);I(this,"acc",0);I(this,"geo",new Ee);I(this,"mat");I(this,"points");this.n=e,this.pos=new Float32Array(e*3),this.a=new Float32Array(e),this.sz=new Float32Array(e).fill(1),this.colr=new Float32Array(e*3),this.age=new Float32Array(e).fill(99),this.life=new Float32Array(e),this.vel=new Float32Array(e*3),this.grow=new Float32Array(e),this.geo.setAttribute("position",new xe(this.pos,3).setUsage(an)),this.geo.setAttribute("aA",new xe(this.a,1).setUsage(an)),this.geo.setAttribute("aS",new xe(this.sz,1).setUsage(an)),this.geo.setAttribute("aC",new xe(this.colr,3).setUsage(an)),this.mat=new _n({transparent:!0,depthWrite:!1,uniforms:{...t,uPR:{value:1},uSize:{value:2.6}},vertexShader:z_,fragmentShader:k_}),this.points=new qh(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=3}emit(t,e,i,s,r,a,o,l,c,h){const u=this.next;this.next=(this.next+1)%this.n,this.pos.set([t,e,i],u*3),this.vel.set([s,r,a],u*3),this.colr.set([h.r,h.g,h.b],u*3),this.age[u]=0,this.life[u]=o,this.sz[u]=l,this.grow[u]=c}smoke(t,e){this.acc+=t;const i=new Rt(.86,.85,.83);for(;this.acc>.2;){this.acc-=.2;for(const s of e)Math.random()<.5&&this.emit(s.x+(Math.random()-.5)*.2,s.y+.4,s.z+(Math.random()-.5)*.2,.2+Math.random()*.2,.6+Math.random()*.4,.1+Math.random()*.15,3.5+Math.random()*2,.5,1.6,i)}}puff(t,e,i,s){const r=new Rt(.62,.55,.45),a=s?22:9;for(let o=0;o<a;o++){const l=Math.random()*fn,c=(s?1.4:.7)*(.4+Math.random());this.emit(t,e+.2,i,Math.cos(l)*c,.3+Math.random()*.6,Math.sin(l)*c,.9+Math.random()*.6,s?1.4:.8,1.2,r)}}update(t){for(let e=0;e<this.n;e++){if(this.age[e]>this.life[e]){this.a[e]=0;continue}this.age[e]+=t;const i=this.age[e]/this.life[e],s=1-Math.min(.9,t*1.5);this.vel[e*3]*=s,this.vel[e*3+2]*=s,this.pos[e*3]+=this.vel[e*3]*t,this.pos[e*3+1]+=this.vel[e*3+1]*t,this.pos[e*3+2]+=this.vel[e*3+2]*t,this.a[e]=Math.sin(Math.min(i,1)*Math.PI)*.4,this.sz[e]=this.sz[e]+this.grow[e]*t/this.life[e]*.5}for(const e of["position","aA","aS","aC"])this.geo.attributes[e].needsUpdate=!0}}class B_{constructor(){I(this,"group",new bn);I(this,"spears");I(this,"arrows");I(this,"list",[]);I(this,"ray",new rl);I(this,"ta",new k);I(this,"tb",new k);I(this,"tc",new k);I(this,"th",new k);const t=_e(s=>{s.add("cyl5","#7a5a3c",ot(0,-1.88,0,0,.035,1.7,.035),0),s.add("cone4","#b9b4aa",ot(0,-.18,0,0,.065,.18,.065),0)}).rotateX(Math.PI/2),e=_e(s=>{s.add("cyl5","#8a6a48",ot(0,-.72,0,0,.018,.64,.018),0),s.add("cone4","#b9b4aa",ot(0,-.1,0,0,.045,.1,.045),0),s.add("box","#e8e2d4",ot(0,-.7,0,0,.012,.12,.07),0),s.add("box","#e8e2d4",ot(0,-.7,0,0,.07,.12,.012),0)}).rotateX(Math.PI/2),i=ke({vertexColors:!0},{NO_SNOW:""});this.spears=new we(t,i,96),this.arrows=new we(e,i,96);for(const s of[this.spears,this.arrows])s.instanceMatrix.setUsage(an),s.frustumCulled=!1,s.castShadow=!0,s.count=0,this.group.add(s)}add(t,e,i,s,r,a,o,l,c,h){if(!o&&l<Jh)return;let u,f,p;if(c>=se){const v=t.alive[h]?this.hitBuilding(t,h,e,i):null;v?(u=v.x,f=v.z,p=v.y):(u=s,f=r,p=jt(t.map,s,r)+.08)}else{const v=Math.hypot(s-e,r-i)||1,w=v-(Pt[c]?.radius??.3)*.8;u=e+(s-e)/v*w,f=i+(r-i)/v*w,p=jt(t.map,u,f)+Qh(c)}const g=Math.hypot(u-e,f-i)||1,_=(u-e)/g,m=(f-i)/g,d=o?.75:1.7;if(g-d<.15)return;const x=e+_*d,M=i+m*d;this.list.push({x0:x,z0:M,y0:jt(t.map,x,M)+(o?.88:1.1),x1:u,z1:f,y1:p,arc:(g-d)*(o?.1:.18),t:0,dur:Math.max(.15,a/10),arrow:o})}hitBuilding(t,e,i,s){const r=Te[t.kind[e]-se],a=t.owner[e],o=Math.min(a>=0&&a<t.players.length?t.players[a].era:0,1),l=fl(r.key,o),c=l.attributes.position.array,h=t.done[e]?1:Math.max(.12,Math.min(1,t.work[e]/(r.time*100))),u=t.x[e]/256,f=t.z[e]/256,p=jt(t.map,u,f)-.02,g=r.key==="farm"?0:(e*2654435761>>>0)%4*Math.PI/2,_=i-u,m=s-f,d=Math.cos(g),x=Math.sin(g),M=_*d-m*x,v=_*x+m*d,w=Math.hypot(M,v)||1,C=-M/w,A=-v/w,P=-A,S=C;let y=0,E=0,D=0,U=!1;for(const L of[0,.35,-.35,.7,-.7,1.05,-1.05,1.4,-1.4]){let F=1/0;for(const z of[.9,.6,.35]){const q=M+P*L,N=v+S*L,O=-(q*C+N*A);this.ray.origin.set(q,z/h,N),this.ray.direction.set(C,0,A);for(let W=0;W+8<c.length;W+=9){if(this.ta.set(c[W],c[W+1],c[W+2]),this.tb.set(c[W+3],c[W+4],c[W+5]),this.tc.set(c[W+6],c[W+7],c[W+8]),!this.ray.intersectTriangle(this.ta,this.tb,this.tc,!1,this.th))continue;const $=this.th.distanceTo(this.ray.origin);$>O+.1||$>=F||(F=$,y=this.th.x+C*.05,E=this.th.y,D=this.th.z+A*.05)}}if(F<1/0){U=!0;break}}return U?{x:u+y*d+D*x,y:p+E*h,z:f-y*x+D*d}:null}update(t){let e=0,i=0;const s=[],r=new li,a=new k,o=new k(1,1,1),l=new k,c=new k(0,0,1),h=new Gt;for(const u of this.list){if(u.t+=t,u.t>u.dur+.35)continue;const f=u.arrow?this.arrows:this.spears,p=u.arrow?i:e;if(p>=96)continue;s.push(u);const g=Math.min(1,u.t/u.dur);a.set(u.x0+(u.x1-u.x0)*g,u.y0+(u.y1-u.y0)*g+Math.sin(g*Math.PI)*u.arc,u.z0+(u.z1-u.z0)*g),l.set(u.x1-u.x0,u.y1-u.y0+Math.cos(g*Math.PI)*u.arc*Math.PI,u.z1-u.z0).normalize(),r.setFromUnitVectors(c,l),f.setMatrixAt(p,h.compose(a,r,o)),u.arrow?i++:e++}this.list=s,this.spears.count=e,this.arrows.count=i,this.spears.instanceMatrix.needsUpdate=this.arrows.instanceMatrix.needsUpdate=!0}}const H_=(n,t,e)=>n+(t-n)*e,G_=(n,t,e)=>{const i=Math.min(1,Math.max(0,(e-n)/(t-n)));return i*i*(3-2*i)};class V_{constructor(t,e,i,s){I(this,"cam");I(this,"x");I(this,"z");I(this,"yaw");I(this,"dist");I(this,"tx");I(this,"tz");I(this,"tyaw");I(this,"tdist");I(this,"minD",14);I(this,"maxD",110);this.map=t,this.cam=new rn(42,1,.5,900),this.x=this.tx=e,this.z=this.tz=i,this.yaw=this.tyaw=s,this.dist=70,this.tdist=44}pitch(t=this.dist){return H_(.66,1.12,G_(this.minD,this.maxD,t))}update(t){const e=1-Math.exp(-t*9),i=this.map.size;this.tx=Math.min(i-8,Math.max(8,this.tx)),this.tz=Math.min(i-8,Math.max(8,this.tz)),this.tdist=Math.min(this.maxD,Math.max(this.minD,this.tdist)),this.x+=(this.tx-this.x)*e,this.z+=(this.tz-this.z)*e,this.yaw+=(this.tyaw-this.yaw)*e,this.dist+=(this.tdist-this.dist)*e;const s=this.pitch(),r=Math.max(jt(this.map,this.x,this.z),0),a=Math.cos(s)*this.dist;this.cam.position.set(this.x+Math.sin(this.yaw)*a,r+Math.sin(s)*this.dist,this.z+Math.cos(this.yaw)*a),this.cam.lookAt(this.x,r+.6,this.z),this.cam.updateMatrixWorld()}pan(t,e,i){const s=this.pitch(),r=.77*this.dist/i,a=Math.cos(this.yaw),o=-Math.sin(this.yaw),l=-Math.sin(this.yaw),c=-Math.cos(this.yaw);this.tx+=(-t*a+e*l/Math.sin(s))*r,this.tz+=(-t*o+e*c/Math.sin(s))*r}setAspect(t,e){this.cam.aspect=t/e,this.cam.fov=t/e<1?55:42,this.cam.updateProjectionMatrix()}ground(t,e,i,s){const r=new k(t/i*2-1,-(e/s)*2+1,.5).unproject(this.cam),a=this.cam.position.clone(),o=r.sub(a).normalize();let l=0,c=0;const h=this.map.size;for(let u=0;u<400;u++){l+=.6+l*.01;const f=a.x+o.x*l,p=a.y+o.y*l,g=a.z+o.z*l;if(f<-20||g<-20||f>h+20||g>h+20||l>900)return null;if(p<=Math.max(jt(this.map,f,g),-.1)){let _=c,m=l;for(let d=0;d<12;d++){const x=(_+m)/2;a.y+o.y*x<=Math.max(jt(this.map,a.x+o.x*x,a.z+o.z*x),-.1)?m=x:_=x}return new k(a.x+o.x*m,a.y+o.y*m,a.z+o.z*m)}c=l}return null}toScreen(t,e,i,s,r,a){a.set(t,e,i).project(this.cam);const o=a.z<1;return a.set((a.x+1)/2*s,(1-a.y)/2*r,o?1:0),a}}const qc=[{grassA:"#6fa84a",grassB:"#93c25a",leaf:"#7cbc4c",leafAmt:1,crop:.32,cropC:"#86c457",flower:1,snow:0,sun:"#fff2dc",sunI:2.7,elev:.95,top:"#78ade0",hor:"#d3e6ef",hS:"#cfe6ff",hG:"#6b7a4a",hI:1,fog:"#cfe2eb",sh:"#5cb8b2",dp:"#1f6079",w:[0,0,1]},{grassA:"#86a845",grassB:"#bcae57",leaf:"#4f8a3a",leafAmt:1,crop:1,cropC:"#e3bf52",flower:.3,snow:0,sun:"#fff0d0",sunI:3,elev:1.1,top:"#64a2de",hor:"#d9e7ee",hS:"#d6ebff",hG:"#7a7a4a",hI:1.05,fog:"#d4e3ea",sh:"#62c0b4",dp:"#1d6a80",w:[0,0,0]},{grassA:"#8f9a4c",grassB:"#ad8b47",leaf:"#d4782f",leafAmt:.82,crop:.14,cropC:"#b99a5c",flower:0,snow:0,sun:"#ffd6a6",sunI:2.55,elev:.72,top:"#8aa8c6",hor:"#e6d9c4",hS:"#e8dccb",hG:"#7a5f3a",hI:1,fog:"#e0d4c2",sh:"#5aa9a2",dp:"#235a6e",w:[0,1,0]},{grassA:"#7e8a6c",grassB:"#8d9079",leaf:"#6b5a45",leafAmt:0,crop:0,cropC:"#9a8a6a",flower:0,snow:1,sun:"#e9f0ff",sunI:2.15,elev:.5,top:"#98b0c6",hor:"#e6ebee",hS:"#e6eef8",hG:"#8b9096",hI:1.2,fog:"#e1e7ec",sh:"#4f8f98",dp:"#1f4a5e",w:[1,0,0]}],$c=["grassA","grassB","leaf","cropC","sun","top","hor","hS","hG","fog","sh","dp"],Yc=["leafAmt","crop","flower","snow","sunI","elev","hI"];class W_{constructor(t){I(this,"c",{});I(this,"n",{});I(this,"w",[0,0,0]);I(this,"tmp",new Rt);const e=qc[t];for(const i of $c)this.c[i]=sn(e[i]);for(const i of Yc)this.n[i]=e[i];this.w=[...e.w]}update(t,e,i){const s=qc[e],r=1-Math.exp(-t*.3);for(const l of $c)this.c[l].lerp(this.tmp.set(s[l]),r);for(const l of Yc)this.n[l]+=(s[l]-this.n[l])*r;for(let l=0;l<3;l++)this.w[l]+=(s.w[l]-this.w[l])*r;const a=this.c,o=this.n;de.uGrassA.value.copy(a.grassA),de.uGrassB.value.copy(a.grassB),de.uLeafColor.value.copy(a.leaf),de.uCropColor.value.copy(a.cropC),de.uLeaf.value=o.leafAmt,de.uCrop.value=o.crop,de.uFlower.value=o.flower,de.uSnow.value=o.snow,de.uFruit.value=Math.max(0,1-o.snow*1.6),de.uShallow.value.copy(a.sh),de.uDeep.value.copy(a.dp),i.sun.color.copy(a.sun),i.sun.intensity=o.sunI,i.hemi.color.copy(a.hS),i.hemi.groundColor.copy(a.hG),i.hemi.intensity=o.hI,i.sky.uniforms.uTop.value.copy(a.top),i.sky.uniforms.uHor.value.copy(a.hor),i.fog.color.copy(a.fog)}get elev(){return this.n.elev}}const X_=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`,q_=`uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class $_{constructor(t,e=1){I(this,"group",new bn);I(this,"list");this.map=t,this.list=[this.make(Math.round(1500*e),.55,"#ffffff","#e8eef6",2.2,.4,30),this.make(Math.round(220*e),.85,"#d9772f","#b8452a",.9,1.4,11),this.make(Math.round(110*e),.62,"#f49ac0","#e2709c",.6,1.1,6)]}make(t,e,i,s,r,a,o){t=Math.max(1,t);const l=new Float32Array(t*3),c=new Float32Array(t),h=new Float32Array(t),u=new Float32Array(t);for(let _=0;_<t;_++)l[_*3]=(Math.random()-.5)*90,l[_*3+1]=-999,l[_*3+2]=(Math.random()-.5)*90,c[_]=Math.random(),h[_]=Math.random()*100,u[_]=.7+Math.random()*.6;const f=new Ee;f.setAttribute("position",new xe(l,3).setUsage(an)),f.setAttribute("aK",new xe(c,1)),f.setAttribute("aS",new xe(u,1));const p=new _n({transparent:!0,depthWrite:!1,uniforms:{uFow:de.uFow,uFowOn:de.uFowOn,uWorld:de.uWorld,uPR:{value:1},uSize:{value:e},uColA:{value:sn(i)},uColB:{value:sn(s)},uAmt:{value:0}},vertexShader:X_,fragmentShader:q_}),g=new qh(f,p);return g.frustumCulled=!1,g.renderOrder=4,g.visible=!1,this.group.add(g),{p:g,pos:l,seed:h,n:t,use:t,fall:r,sway:a,m:p,hMax:o}}setScale(t){for(const e of this.list)e.use=Math.max(1,Math.round(e.n*t)),e.p.geometry.setDrawRange(0,e.use)}setPixelRatio(t){for(const e of this.list)e.m.uniforms.uPR.value=t}update(t,e,i,s,r){this.list.forEach((a,o)=>{if(a.m.uniforms.uAmt.value=i[o],i[o]<.01){a.p.visible=!1;return}a.p.visible=!0;for(let l=0;l<a.use;l++){const c=a.seed[l];let h=a.pos[l*3],u=a.pos[l*3+1],f=a.pos[l*3+2];u-=a.fall*t*(.7+c%1*.6),h+=(Math.sin(e+c)*a.sway+.4)*t,f+=Math.cos(e*.8+c)*a.sway*.5*t;const p=h-s,g=f-r;p>45&&(h-=90),p<-45&&(h+=90),g>45&&(f-=90),g<-45&&(f+=90);const _=jt(this.map,h,f);(u<_||u>_+a.hMax+4)&&(u=_+a.hMax*(.45+Math.random()*.55)),a.pos[l*3]=h,a.pos[l*3+1]=u,a.pos[l*3+2]=f}a.p.geometry.attributes.position.needsUpdate=!0})}}const Yr=[{key:"high",pr:2,shadow:2048,trees:1,tufts:1,weather:1},{key:"medium",pr:1.5,shadow:1024,trees:.75,tufts:.5,weather:.55},{key:"low",pr:1,shadow:0,trees:.55,tufts:0,weather:.25}],Y_={move:"#9dffc4",attack:"#ff7a5c",work:"#ffd166"};class tu{constructor(t,e,i){I(this,"renderer");I(this,"scene",new r_);I(this,"camera");I(this,"sun");I(this,"hemi");I(this,"sky");I(this,"skyMat");I(this,"nature");I(this,"units",new R_);I(this,"buildings",new N_);I(this,"flames",new F_);I(this,"particles");I(this,"projectiles",new B_);I(this,"weather");I(this,"seasons");I(this,"fowTex");I(this,"fowData");I(this,"fogOn",!0);I(this,"ghost");I(this,"foot");I(this,"ghostKey","");I(this,"pings",[]);I(this,"pingI",0);I(this,"rally");I(this,"rallyFlag");I(this,"shadowExt",0);I(this,"lastFogTick",-1);I(this,"q",0);this.world=e,this.me=i;const s=e.map,r=s.size;this.renderer=t,this.scene.fog=new ll(13624043,130,360),this.fowData=new Uint8Array(new ArrayBuffer(r*r)),this.fowTex=new Xh(this.fowData,r,r,na,Cn),this.fowTex.magFilter=this.fowTex.minFilter=mn,this.fowTex.needsUpdate=!0,de.uFow.value=this.fowTex,de.uWorld.value=r,this.skyMat=new _n({side:Be,depthWrite:!1,fog:!1,uniforms:{uTop:{value:sn("#78ade0")},uHor:{value:sn("#d3e6ef")}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`}),this.sky=new be(new la(600,24,12),this.skyMat),this.sky.renderOrder=-10,this.scene.add(this.sky),this.hemi=new c_(13625087,7043658,1),this.scene.add(this.hemi),this.sun=new d_(16773852,2.7),this.sun.castShadow=!0,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target),this.scene.add(v_(s),x_(s)),this.nature=y_(s),this.scene.add(this.nature.group);for(const c of this.nature.metal)c.visible=!1;this.syncNature(),this.scene.add(this.buildings.group,this.flames.mesh,this.projectiles.group,this.units.group),this.particles=new O_({uFow:de.uFow,uFowOn:de.uFowOn,uWorld:de.uWorld},600),this.scene.add(this.particles.points),this.weather=new $_(s),this.scene.add(this.weather.group),this.seasons=new W_(e.season),this.ghost=new be(new Ee,new $o({vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1,flatShading:!0})),this.ghost.visible=!1,this.ghost.renderOrder=7,this.foot=new be(new ci(1,1).rotateX(-Math.PI/2),new Gn({color:7331978,transparent:!0,opacity:.35,depthTest:!1,depthWrite:!1,toneMapped:!1})),this.foot.visible=!1,this.foot.renderOrder=6,this.scene.add(this.ghost,this.foot);const a=new oa(.3,.55,28).rotateX(-Math.PI/2);for(let c=0;c<4;c++){const h=new be(a,new Gn({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));h.renderOrder=6,h.visible=!1,this.scene.add(h),this.pings.push({m:h,t:0})}this.rally=new bn,this.rally.add(new be(new oi(.04,.04,1.6,5).translate(0,.8,0),new $o({color:7229239}))),this.rallyFlag=new be(new Pe(.5,.34,.03).translate(.27,1.38,0),new Gn({color:16777215,toneMapped:!1})),this.rally.add(this.rallyFlag),this.rally.visible=!1,this.scene.add(this.rally);const o=e.players[i].start,l=r/2;this.camera=new V_(s,o.x+(l-o.x)*.06,o.z+(l-o.z)*.06,Math.atan2(o.x-l,o.z-l)),this.updateFog(!0)}static makeRenderer(t){const e=new s_({canvas:t,antialias:!0,powerPreference:"high-performance"});return e.outputColorSpace=qe,e.toneMapping=ph,e.toneMappingExposure=1.08,e.shadowMap.enabled=!0,e.shadowMap.type=fh,e}syncNature(){const t=this.world;for(const e of t.map.res){const i=e.z*t.size+e.x;t.resKind[i]===0?this.nature.removeRes(i):t.resKind[i]===Ge&&t.resAmt[i]<=0&&this.nature.setBerries(i,!1)}}setQuality(t){this.q=t;const e=Yr[t],i=Math.min(window.devicePixelRatio||1,e.pr);this.renderer.setPixelRatio(i),this.sun.castShadow=e.shadow>0,e.shadow>0&&this.sun.shadow.mapSize.x!==e.shadow&&(this.sun.shadow.mapSize.set(e.shadow,e.shadow),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.nature.setDensity(e.trees,e.tufts),this.particles.mat.uniforms.uPR.value=i,this.weather.setPixelRatio(i),this.weather.setScale(e.weather)}get quality(){return this.q}resize(t,e){this.renderer.setSize(t,e,!1),this.camera.setAspect(t,e)}setFog(t){this.fogOn=t,de.uFowOn.value=t?1:0}seen(t,e){if(!this.fogOn)return!0;const i=this.world.size,s=Math.floor(t),r=Math.floor(e);return s>=0&&r>=0&&s<i&&r<i&&this.world.vis[this.me][r*i+s]===1}consume(t){const e=this.world,i=e.map;for(const s of t)switch(s.t){case"tree":this.nature.removeTree(s.k);break;case"res":{const r=s.k;e.resKind[r]===0?this.nature.removeRes(r):e.resKind[r]===Ge&&this.nature.setBerries(r,e.resAmt[r]>0);break}case"death":if(s.kind<se){const r=s.x/256,a=s.z/256;this.seen(r,a)&&this.particles.puff(r,jt(i,r,a),a,!1)}break;case"built":case"gone":{const r=e.x[s.e]/256,a=e.z[s.e]/256;this.seen(r,a)&&this.particles.puff(r,jt(i,r,a),a,!0);break}case"proj":{const r=s.x0/256,a=s.z0/256,o=s.x1/256,l=s.z1/256;(this.seen(r,a)||this.seen(o,l))&&this.projectiles.add(e,r,a,o,l,s.ticks,s.kind==="arrow",s.gap/256,s.tk,s.te);break}}}setGhost(t,e=0,i=0,s=!0){if(!t){this.ghost.visible=this.foot.visible=!1;return}const r=Te[pn[t]],a=this.world.players[this.me].era,o=t+Math.min(a,1);o!==this.ghostKey&&(this.ghost.geometry=fl(t,a),this.ghostKey=o);const l=e+r.size/2,c=i+r.size/2,h=jt(this.world.map,l,c);this.ghost.position.set(l,h,c),this.ghost.visible=!0,this.ghost.material.color.set(s?"#d8ffe2":"#ff8f80"),this.foot.position.set(l,h+.12,c),this.foot.scale.set(r.size,1,r.size),this.foot.visible=!0,this.foot.material.color.set(s?"#6fe08a":"#e0533c")}ping(t,e,i){const s=this.pings[this.pingI++%this.pings.length];s.t=.7,s.m.position.set(t,jt(this.world.map,t,e)+.08,e),s.m.material.color.set(Y_[i]),s.m.visible=!0}render(t,e,i,s){const r=this.world,a=this.camera;de.uTime.value=s,a.update(t),this.seasons.update(t,r.season,{sun:this.sun,hemi:this.hemi,sky:this.skyMat,fog:this.scene.fog});const o=2.25,l=this.seasons.elev;this.sun.position.set(a.x+Math.cos(o)*Math.cos(l)*120,Math.sin(l)*120,a.z+Math.sin(o)*Math.cos(l)*120),this.sun.target.position.set(a.x,0,a.z),this.sun.target.updateMatrixWorld();const c=Math.round(Math.min(90,Math.max(28,a.dist*.95))/4)*4;if(c!==this.shadowExt){this.shadowExt=c;const u=this.sun.shadow.camera;u.left=-c,u.right=c,u.top=c,u.bottom=-c,u.near=1,u.far=300,u.updateProjectionMatrix()}this.sky.position.copy(a.cam.position),this.updateFog(),this.buildings.update(r,this.me,this.fogOn,s),this.units.update(r,e,t,i,this.me,this.fogOn,s,a.cam.quaternion),this.flames.update(this.buildings.fires,s),this.particles.smoke(t,this.buildings.smokes),this.particles.update(t),this.projectiles.update(t),this.weather.update(t,s,this.seasons.w,a.x,a.z);for(const u of this.pings)if(u.t>0){u.t-=t;const f=1-Math.max(0,u.t)/.7;u.m.scale.setScalar(1.4-f*.8),u.m.material.opacity=Math.max(0,1-f),u.t<=0&&(u.m.visible=!1)}let h=-1;if(i.size===1){const u=i.values().next().value;r.isBuilding(u)&&r.owner[u]===this.me&&r.rallyX[u]>=0&&(h=u)}if(h>=0){const u=r.rallyX[h]/256,f=r.rallyZ[h]/256;this.rally.position.set(u,jt(r.map,u,f),f),this.rally.visible=!0,this.rallyFlag.rotation.y=Math.sin(s*1.4)*.2,this.rallyFlag.material.color.set(r.players[this.me].color)}else this.rally.visible=!1;this.renderer.render(this.scene,a.cam)}updateFog(t=!1){const e=this.world;if(!t&&e.tick===this.lastFogTick)return;this.lastFogTick=e.tick;const i=e.vis[this.me],s=e.explored[this.me],r=this.fowData;for(let a=0;a<r.length;a++)r[a]=i[a]?255:s[a]?128:0;this.fowTex.needsUpdate=!0}dispose(){this.scene.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const i=e.material;Array.isArray(i)?i.forEach(s=>s.dispose()):i?.dispose()}),this.fowTex.dispose(),this.sun.shadow.map?.dispose(),this.renderer.renderLists.dispose()}}const eu={"res.food":"Food","res.wood":"Wood","res.stone":"Stone","res.metal":"Metal","res.coins":"Coins","res.pop":"Population","pop.tip":"Population: {n} of {cap} (this era allows up to {max})","era.0":"Stone Age","era.1":"Neolithic","era.2":"Age of Metals","era.3":"Kingdom","era.4":"Republic","era.5":"Empire","era.1.to":"the Neolithic","era.2.to":"the Age of Metals","era.3.to":"the Kingdom","era.4.to":"the Republic","era.5.to":"the Empire","era.1.in":"the Neolithic","era.2.in":"the Age of Metals","era.3.in":"the Kingdom","era.4.in":"the Republic","era.5.in":"the Empire","season.0":"Spring","season.1":"Summer","season.2":"Autumn","season.3":"Winter","cal.year":"Year {y}","tribe.0":"Red tribe","tribe.1":"Blue tribe","tribe.2":"Yellow tribe","tribe.3":"Purple tribe","tribe.6":"Barbarians","tribe.wild":"Wild animal","tribe.you":"Your tribe","unit.villager":"Gatherer","unit.warrior":"Club Warrior","unit.hunter":"Hunter","unit.dog":"Dog","unit.axeman":"Axe Warrior","unit.archer":"Archer","unit.spearman":"Spearman","unit.deer":"Deer","unit.boar":"Wild Boar","unit.wolf":"Wolf","unit.aurochs":"Aurochs","unit.barbarian":"Barbarian","unit.carcass":"Hunted game","unit.villager.d":"Gathers food, wood and stone, hunts and builds.","unit.warrior.d":"Basic fighter with a club.","unit.hunter.d":"Throws spears from afar.","unit.dog.d":"Fast scout that sees far.","unit.axeman.d":"Stronger fighter with a stone axe.","unit.archer.d":"Shoots arrows from afar.","unit.spearman.d":"Strong against animals.","unit.deer.d":"Runs away when hit. {food} food.","unit.boar.d":"Fights back! {food} food.","unit.wolf.d":"Dangerous. Hunts people who come close.","unit.aurochs.d":"Huge and strong. {food} food.","unit.barbarian.d":"Attacks every tribe.","unit.carcass.d":"Gatherers can take {food} food from it.","bld.center":"Village Center","bld.house":"House","bld.depot":"Storehouse","bld.military":"Training Ground","bld.farm":"Wheat Field","bld.pen":"Sheep Pen","bld.sanctuary":"Shrine","bld.camp":"Barbarian Camp","bld.center.d":"Trains gatherers and receives resources. Advance to the next era here.","bld.house.d":"Room for {n} more people.","bld.depot.d":"Gatherers drop resources here. Build it near trees or stone.","bld.military.d":"Trains warriors.","bld.farm.d":"One gatherer farms it. Gives food all year, except in winter.","bld.pen.d":"The sheep give food by themselves (not in winter).","bld.sanctuary.d":"Slowly heals your people nearby.","bld.camp.d":"Destroy it to take its loot.","do.idle":"Waiting for orders","do.move":"Walking","do.wood":"Cutting wood","do.berry":"Picking berries","do.stone":"Mining stone","do.metal":"Mining metal","do.farm":"Farming","do.meat":"Taking the meat","do.hunt":"Hunting","do.build":"Building","do.fight":"Fighting","do.return":"Carrying {n} {res} home","do.amove":"Marching","info.hp":"Health","info.building":"Under construction","info.queue":"Training","info.food":"Food","info.farmer":"Farmer: {who}","info.yes":"working","info.no":"nobody — send a gatherer","sel.none":"Nothing selected","sel.many":"{n} selected","sel.clear":"Clear selection","cmd.build":"Build","cmd.back":"Back","cmd.stop":"Stop","cmd.rally":"Gather point","cmd.ageup":"Advance to {era}","cmd.aging":"Advancing to {era}…","cmd.cancelQueue":"Cancel the last one","cmd.place":"Build here","cmd.cancel":"Cancel","why.cost":"Not enough {res}.","why.pop":"Build more houses to train more people.","why.popEra":"Population limit of this era reached.","why.queue":"The line is full (5).","why.age":"First build 2 different kinds of buildings of this era ({n}/2).","why.ageBusy":"Already advancing.","why.villager":"Select a gatherer to build.","why.era":"Available in {era}.","why.maxEra":"More eras are coming in the next updates.","why.done":"Wait until it is built.","place.mouse":"Click where to build · right-click to cancel · hold Shift to build more","place.touch":"Tap where to build, then confirm","place.bad":"Can't build there.","rally.hint":"Tap where the new people should go","rally.set":"Gather point set.","btn.idle":"Idle","btn.army":"Army","btn.home":"Home","btn.fog":"Fog","btn.help":"Help","btn.menu":"Menu","q.high":"High","q.medium":"Medium","q.low":"Low","q.auto":"Graphics set to {q} ({fps} fps)","q.label":"Graphics","hint.mouse":"Left-click to select · right-click on a tree, bush, animal or the ground to give an order · drag to select many · WASD to move the view · wheel to zoom · Q/E to rotate","hint.touch":"Tap to select · then tap a tree, bush, animal or the ground to give an order · drag to move the view · hold and drag to select many · pinch to zoom","msg.built":"{b} is ready.","msg.hunger":"Hunger! There was not enough food for the winter: your people work slower.","msg.spring":"Spring: the berries are back and the herds grow.","msg.winter":"Winter: every person eats 1 food each month. Fields and berries rest.","msg.winterSoon":"Winter starts next month. Store food!","msg.underAttack":"We are under attack!","msg.campLoot":"Barbarian camp destroyed: +200 food and +150 wood!","msg.centerLost":"Our Village Center was destroyed!","msg.popEra":"Population limit of this era reached.","msg.popHouses":"Build more houses so your tribe can grow.","msg.raidSoon":"Barbarians are coming!","msg.defeated":"{p} was defeated.","msg.youDefeated":"Your tribe was defeated.","msg.ageMe":"Your tribe entered {era}!","msg.ageOther":"{p} entered {era}.","msg.go":"See","menu.tagline":"From the Stone Age to the height of Rome","menu.continue":"Continue","menu.saved":"{era} · year {y} · {r} rivals","menu.new":"New game","menu.rivals":"Rival tribes","menu.difficulty":"Difficulty","diff.0":"Easy","diff.1":"Normal","diff.2":"Hard","menu.start":"Start","menu.back":"Back","menu.credits":"Made by Bento, Jojô and Pai","menu.local":"Your game is saved on this device.","menu.localCloud":"Your game is saved on this device and online, in your queres.games account.","menu.continueCloud":"Continue (online save)","cloud.login":"Sign in to save online","cloud.why":"With a queres.games account you can continue on another device.","cloud.account":"Account: {name} · saving online","pause.saving":"Saving…","pause.savedBoth":"Saved on this device and online.","pause.savedLocalOnly":"Saved on this device. The online save did not answer; it will try again.","pause.title":"Paused","pause.resume":"Back to the game","pause.save":"Save the game","pause.saved":"Game saved.","pause.saveFail":"Couldn't save on this device.","pause.quit":"Save and leave","pause.time":"{m} minutes played","end.victory":"Victory!","end.victory.d":"All rival tribes were defeated. Your people will be remembered.","end.defeat":"Defeat","end.defeat.d":"Your tribe was defeated. Try again!","end.watch":"Keep watching","end.menu":"Back to the menu","help.title":"How to play","help.close":"Back to the game","help.goal":"Goal: grow your tribe, survive the winters and defeat the rival tribes. Reach the Neolithic to farm the land.","help.l1":"Select gatherers and send them to berries, trees, stone or animals: they bring everything home by themselves.","help.l2":"Build houses to grow, a storehouse near the trees and a training ground for warriors.","help.l3":"In winter each person eats food. Keep some stored!","help.l4":"When 2 kinds of buildings are ready, the Village Center can advance to the next era.","lang.label":"Language",loading:"Loading the world…"},K_={"res.food":"Comida","res.wood":"Madeira","res.stone":"Pedra","res.metal":"Metal","res.coins":"Moedas","res.pop":"População","pop.tip":"População: {n} de {cap} (esta era permite até {max})","era.0":"Idade da Pedra","era.1":"Neolítico","era.2":"Idade dos Metais","era.3":"Reino","era.4":"República","era.5":"Império","era.1.to":"o Neolítico","era.2.to":"a Idade dos Metais","era.3.to":"o Reino","era.4.to":"a República","era.5.to":"o Império","era.1.in":"no Neolítico","era.2.in":"na Idade dos Metais","era.3.in":"no Reino","era.4.in":"na República","era.5.in":"no Império","season.0":"Primavera","season.1":"Verão","season.2":"Outono","season.3":"Inverno","cal.year":"Ano {y}","tribe.0":"Tribo vermelha","tribe.1":"Tribo azul","tribe.2":"Tribo amarela","tribe.3":"Tribo roxa","tribe.6":"Bárbaros","tribe.wild":"Animal selvagem","tribe.you":"Sua tribo","unit.villager":"Coletor","unit.warrior":"Guerreiro de clava","unit.hunter":"Caçador","unit.dog":"Cão","unit.axeman":"Guerreiro de machado","unit.archer":"Arqueiro","unit.spearman":"Lanceiro","unit.deer":"Cervo","unit.boar":"Javali","unit.wolf":"Lobo","unit.aurochs":"Auroque","unit.barbarian":"Bárbaro","unit.carcass":"Caça abatida","unit.villager.d":"Coleta comida, madeira e pedra, caça e constrói.","unit.warrior.d":"Lutador básico com clava.","unit.hunter.d":"Arremessa lanças de longe.","unit.dog.d":"Batedor rápido que enxerga longe.","unit.axeman.d":"Lutador mais forte, com machado de pedra.","unit.archer.d":"Atira flechas de longe.","unit.spearman.d":"Forte contra animais.","unit.deer.d":"Foge quando é atingido. {food} de comida.","unit.boar.d":"Revida! {food} de comida.","unit.wolf.d":"Perigoso. Ataca quem chega perto.","unit.aurochs.d":"Enorme e forte. {food} de comida.","unit.barbarian.d":"Ataca todas as tribos.","unit.carcass.d":"Os coletores podem tirar {food} de comida daqui.","bld.center":"Centro da aldeia","bld.house":"Casa","bld.depot":"Depósito","bld.military":"Campo de treino","bld.farm":"Campo de trigo","bld.pen":"Curral","bld.sanctuary":"Santuário","bld.camp":"Acampamento bárbaro","bld.center.d":"Treina coletores e recebe recursos. Aqui se avança para a próxima era.","bld.house.d":"Espaço para mais {n} pessoas.","bld.depot.d":"Os coletores entregam recursos aqui. Construa perto de árvores ou pedras.","bld.military.d":"Treina guerreiros.","bld.farm.d":"Um coletor cultiva. Dá comida o ano todo, menos no inverno.","bld.pen.d":"As ovelhas dão comida sozinhas (menos no inverno).","bld.sanctuary.d":"Cura devagar o seu povo que estiver perto.","bld.camp.d":"Destrua para pegar o que eles guardam.","do.idle":"Esperando ordens","do.move":"Andando","do.wood":"Cortando madeira","do.berry":"Colhendo frutos","do.stone":"Tirando pedra","do.metal":"Tirando metal","do.farm":"Cultivando","do.meat":"Pegando a carne","do.hunt":"Caçando","do.build":"Construindo","do.fight":"Lutando","do.return":"Levando {n} de {res} para casa","do.amove":"Marchando","info.hp":"Vida","info.building":"Em construção","info.queue":"Treinando","info.food":"Comida","info.farmer":"Lavrador: {who}","info.yes":"trabalhando","info.no":"ninguém — mande um coletor","sel.none":"Nada selecionado","sel.many":"{n} selecionados","sel.clear":"Limpar seleção","cmd.build":"Construir","cmd.back":"Voltar","cmd.stop":"Parar","cmd.rally":"Ponto de encontro","cmd.ageup":"Avançar para {era}","cmd.aging":"Avançando para {era}…","cmd.cancelQueue":"Cancelar o último","cmd.place":"Construir aqui","cmd.cancel":"Cancelar","why.cost":"Falta {res}.","why.pop":"Construa mais casas para treinar mais gente.","why.popEra":"Limite de população desta era.","why.queue":"A fila está cheia (5).","why.age":"Antes, construa 2 tipos diferentes de construção desta era ({n}/2).","why.ageBusy":"Já está avançando.","why.villager":"Selecione um coletor para construir.","why.era":"Disponível {era}.","why.maxEra":"Mais eras chegam nas próximas atualizações.","why.done":"Espere terminar a construção.","place.mouse":"Clique onde construir · botão direito cancela · segure Shift para construir mais","place.touch":"Toque onde construir e depois confirme","place.bad":"Não dá para construir aí.","rally.hint":"Toque para onde as pessoas novas devem ir","rally.set":"Ponto de encontro marcado.","btn.idle":"Ocioso","btn.army":"Exército","btn.home":"Aldeia","btn.fog":"Névoa","btn.help":"Ajuda","btn.menu":"Menu","q.high":"Alta","q.medium":"Média","q.low":"Baixa","q.auto":"Gráficos ajustados para {q} ({fps} fps)","q.label":"Gráficos","hint.mouse":"Clique para selecionar · botão direito numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para selecionar vários · WASD move a vista · roda para zoom · Q/E para girar","hint.touch":"Toque para selecionar · depois toque numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para mover a vista · segure e arraste para selecionar vários · pinça para zoom","msg.built":"{b} ficou pronto.","msg.hunger":"Fome! Faltou comida no inverno: seu povo trabalha mais devagar.","msg.spring":"Primavera: os frutos voltaram e as manadas crescem.","msg.winter":"Inverno: cada pessoa come 1 de comida por mês. Campos e frutos descansam.","msg.winterSoon":"O inverno começa no próximo mês. Guarde comida!","msg.underAttack":"Estamos sendo atacados!","msg.campLoot":"Acampamento bárbaro destruído: +200 de comida e +150 de madeira!","msg.centerLost":"Nosso Centro da aldeia foi destruído!","msg.popEra":"Limite de população desta era.","msg.popHouses":"Construa mais casas para a tribo crescer.","msg.raidSoon":"Os bárbaros estão vindo!","msg.defeated":"{p} foi derrotada.","msg.youDefeated":"Sua tribo foi derrotada.","msg.ageMe":"Sua tribo entrou {era}!","msg.ageOther":"{p} entrou {era}.","msg.go":"Ver","menu.tagline":"Da Idade da Pedra ao auge de Roma","menu.continue":"Continuar","menu.saved":"{era} · ano {y} · {r} rivais","menu.new":"Novo jogo","menu.rivals":"Tribos rivais","menu.difficulty":"Dificuldade","diff.0":"Fácil","diff.1":"Normal","diff.2":"Difícil","menu.start":"Começar","menu.back":"Voltar","menu.credits":"Feito por Bento, Jojô e Pai","menu.local":"Seu jogo fica salvo neste aparelho.","menu.localCloud":"Seu jogo fica salvo neste aparelho e na nuvem, na sua conta do queres.games.","menu.continueCloud":"Continuar (da nuvem)","cloud.login":"Entrar para salvar na nuvem","cloud.why":"Com uma conta do queres.games você continua em outro aparelho.","cloud.account":"Conta: {name} · salvando na nuvem","pause.saving":"Salvando…","pause.savedBoth":"Salvo neste aparelho e na nuvem.","pause.savedLocalOnly":"Salvo neste aparelho. A nuvem não respondeu; tento de novo depois.","pause.title":"Pausado","pause.resume":"Voltar ao jogo","pause.save":"Salvar o jogo","pause.saved":"Jogo salvo.","pause.saveFail":"Não deu para salvar neste aparelho.","pause.quit":"Salvar e sair","pause.time":"{m} minutos de jogo","end.victory":"Vitória!","end.victory.d":"Todas as tribos rivais foram derrotadas. Seu povo será lembrado.","end.defeat":"Derrota","end.defeat.d":"Sua tribo foi derrotada. Tente de novo!","end.watch":"Continuar olhando","end.menu":"Voltar ao menu","help.title":"Como jogar","help.close":"Voltar ao jogo","help.goal":"Objetivo: fazer sua tribo crescer, passar pelos invernos e vencer as tribos rivais. Chegue ao Neolítico para plantar.","help.l1":"Selecione coletores e mande-os para frutos, árvores, pedras ou animais: eles levam tudo para casa sozinhos.","help.l2":"Construa casas para crescer, um depósito perto das árvores e um campo de treino para os guerreiros.","help.l3":"No inverno cada pessoa come. Deixe comida guardada!","help.l4":"Com 2 tipos de construção prontos, o Centro da aldeia pode avançar para a próxima era.","lang.label":"Idioma",loading:"Carregando o mundo…"},j_={en:eu,pt:K_},nu="origines_lang";let xs="en";try{const n=localStorage.getItem(nu);(n==="pt"||n==="en")&&(xs=n)}catch{}const Gr=[],Fn=()=>xs;function Kc(n){xs=n;try{localStorage.setItem(nu,n)}catch{}document.documentElement.lang=n==="pt"?"pt-BR":"en",Gr.forEach(t=>t())}const iu=n=>(Gr.push(n),()=>{const t=Gr.indexOf(n);t>=0&&Gr.splice(t,1)});function J(n,t={}){let e=j_[xs][n]??eu[n]??n;for(const i in t)e=e.split(`{${i}}`).join(String(t[i]));return e}const Z_=n=>Math.floor(n).toLocaleString(xs==="pt"?"pt-BR":"en-US");typeof document<"u"&&(document.documentElement.lang=xs==="pt"?"pt-BR":"en");const J_=(n,t="currentColor")=>`<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`,Ko={food:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 18c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 18c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/>',wood:'<ellipse cx="7" cy="12" rx="3" ry="5"/><path d="M7 7h11c1.7 0 3 2.2 3 5s-1.3 5-3 5H7"/><circle cx="7" cy="12" r="1.2"/>',stone:'<path d="M4 17l3-8 5-3 6 2 2 7-4 3H8z"/><path d="M7 9l4 3 7-4M11 12l1 8"/>',metal:'<path d="M3 16l3-7h12l3 7z"/><path d="M6 9l2 7M18 9l-2 7"/>',coins:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',pop:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',villager:'<circle cx="11" cy="5.5" r="2.8"/><path d="M6 21v-6a5 5 0 0 1 10 0v6"/><path d="M15 13h5.5l-1.2 5H16"/>',warrior:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/>',axeman:'<path d="M5 20L16.5 8.5"/><path d="M13.5 5.5c3-1.5 6 .5 6.5 4.5-2.5.5-4-.5-4-.5l-2-2s-1-1-.5-2z"/>',hunter:'<path d="M4 20L17 7"/><path d="M14.5 4.5H20v5.5z"/><path d="M7 14l3 3"/>',archer:'<path d="M6 3c7 2 12 7 14 15"/><path d="M6 3l14 15"/><path d="M12 9.5l5-1-1 5"/>',spearman:'<circle cx="9" cy="14" r="5"/><path d="M13 11L20.5 3.5"/><path d="M18 3.5h2.5V6"/>',dog:'<circle cx="6.5" cy="9.5" r="1.7"/><circle cx="10.5" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="18.5" cy="9.5" r="1.7"/><path d="M8 17c0-3 2-5.5 4.5-5.5S17 14 17 17c0 2.2-2 2.4-4.5 1.4C10 19.4 8 19.2 8 17z"/>',animal:'<path d="M7 4l2 4M17 4l-2 4"/><path d="M6 10c0-2 3-3 6-3s6 1 6 3l-1 6c-.4 2.5-2.5 4-5 4s-4.6-1.5-5-4z"/><circle cx="10" cy="13" r=".6"/><circle cx="14" cy="13" r=".6"/>',barbarian:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/><path d="M4 6l4 1-1 4"/>',carcass:'<path d="M7.5 15C4.5 15 3 13 3 11s3-6 8-6 8 3 8 6-3 5-6 5"/><path d="M13.5 16l4 4"/><circle cx="19" cy="21" r="1"/>',center:'<path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 3 3 3 0-3-1-5 0-7z"/>',house:'<path d="M3 20L12 4l9 16z"/><path d="M10 20v-5h4v5"/>',depot:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13.5h16M9 9V5h6v4"/>',military:'<path d="M5 5l14 14M19 5L5 19"/><path d="M4 8.5V4h4.5M20 8.5V4h-4.5"/>',farm:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/><path d="M3 21h18"/>',pen:'<ellipse cx="11" cy="12" rx="6.5" ry="4.5"/><circle cx="18.5" cy="10" r="2"/><path d="M7.5 16.5v3M14.5 16.5v3"/>',sanctuary:'<path d="M9 21V7l3-4 3 4v14"/><path d="M5 21h14"/>',camp:'<path d="M3 20L10 6l7 14z"/><path d="M14 9l7 11h-4"/>',ageup:'<path d="M12 3l5 7h-3.2v6h-3.6v-6H7z"/><path d="M5 20h14"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',build:'<path d="M13.5 5.5l5 5-2.5 2.5-5-5z"/><path d="M11 8l-7 7 2.5 2.5 7-7"/><path d="M14 4l2-1 5 5-1 2"/>',rally:'<path d="M6 21V4"/><path d="M6 4h11l-2.2 4L17 12H6"/>',back:'<path d="M15 18l-6-6 6-6"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',idle:'<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',army:'<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',cancel:'<path d="M6 6l12 12M18 6L6 18"/>',"season.0":'<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',"season.1":'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',"season.2":'<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',"season.3":'<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'},Q_={food:"#d4a334",wood:"#b07a48",stone:"#a3a9b0",metal:"#5bb39a",coins:"#d6a84a",pop:"#ecf1ec"},tv=["#8fd16a","#f2c14e","#e08a3c","#a9d3f2"];function ze(n,t){const e=Ko[n]??Ko.animal;return!t&&n.startsWith("season.")&&(t=tv[Number(n.slice(7))]),J_(e,t??Q_[n]??"currentColor")}function Ds(n){return n in Ko?ze(n,"currentColor"):ze(["deer","boar","wolf","aurochs"].includes(n)?"animal":"villager","currentColor")}const ev=["food","wood","stone","metal"],nv=["I","II","III","IV","V","VI"],iv=1,Us=n=>n.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class sv{constructor(t,e,i,s,r){I(this,"root");I(this,"box");I(this,"minimap");I(this,"$",{});I(this,"cardMode","main");I(this,"cardFor","");I(this,"sigTop","");I(this,"sigSel","");I(this,"sigCard","");I(this,"sigMode","");I(this,"idleN",-1);I(this,"toasts",[]);I(this,"btns",[]);I(this,"progs",[]);I(this,"mode","normal");I(this,"placeOk",!0);I(this,"slow",0);I(this,"hintHidden",!1);I(this,"offLang");this.world=t,this.me=e,this.act=i,this.touch=s,this.selected=r,this.root=document.getElementById("hud"),this.box=document.createElement("div"),this.box.className="box",document.body.appendChild(this.box),this.minimap=document.createElement("canvas"),this.minimap.id="minimapa",this.build(),this.offLang=iu(()=>this.build())}dispose(){this.offLang(),this.root.innerHTML="",this.box.remove()}build(){const t=this.touch;this.root.innerHTML=`
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-ajuda" title="${J("btn.help")}" aria-label="${J("btn.help")}">${ze("help")}</button>
          <button id="btn-menu" title="${J("btn.menu")}" aria-label="${J("btn.menu")}">${ze("menu")}<span class="btn-label">${J("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${ze("check")}<span>${J("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${ze("cancel")}<span>${J("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden?' style="opacity:0"':""}>${J(t?"hint.touch":"hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${J("btn.idle")}">${ze("idle")}<span class="btn-label">${J("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${J("btn.army")}">${ze("army")}<span class="btn-label">${J("btn.army")}</span></button>
            <button id="btn-aldeia" title="${J("btn.home")}">${ze("home")}<span class="btn-label">${J("btn.home")}</span></button>
          </div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${J("help.title")}</h2><p class="goal">${J("help.goal")}</p>
        <ul>${["help.l1","help.l2","help.l3","help.l4"].map(i=>`<li>${J(i)}</li>`).join("")}</ul>
        <p class="hint-copy">${J(t?"hint.touch":"hint.mouse")}</p>
        <button id="btn-fechar-ajuda" class="primary">${J("help.close")}</button></div></div>`;for(const i of["era","res","cal","toasts","modebar","modebar-text","btn-confirmar-obra","hint","sel","cmd","mini","ajuda","idle-n"])this.$[i]=document.getElementById(i);this.$.mini.appendChild(this.minimap);const e=(i,s)=>{document.getElementById(i).onclick=s};e("btn-ajuda",()=>this.$.ajuda.dataset.open="true"),e("btn-fechar-ajuda",()=>this.$.ajuda.dataset.open="false"),e("btn-menu",()=>this.act.menu()),e("btn-ocioso",()=>this.act.idle()),e("btn-exercito",()=>this.act.army()),e("btn-aldeia",()=>this.act.home()),e("btn-confirmar-obra",()=>this.act.placeConfirm()),e("btn-cancelar-modo",()=>this.act.cancelMode()),this.$.ajuda.onclick=i=>{i.target===this.$.ajuda&&(this.$.ajuda.dataset.open="false")},this.sigTop=this.sigSel=this.sigCard=this.sigMode="",this.idleN=-1,this.toasts=[],this.update(0,!0)}openHelp(){this.$.ajuda.dataset.open="true"}hideHint(){this.hintHidden||(this.hintHidden=!0,this.$.hint.style.opacity="0")}setMode(t,e=!0){this.mode=t,this.placeOk=e}resetCard(){this.cardMode="main"}toast(t,e,i,s=""){if(this.toasts.some(a=>a.text===t&&a.t>2.5))return;const r=document.createElement("button");for(r.className="toast panel",r.dataset.aviso=s||"info",r.innerHTML=`<span>${Us(t)}</span>${e!==void 0?`<span class="go">${J("msg.go")}</span>`:""}`,r.onclick=()=>{e!==void 0&&i!==void 0&&this.act.jump(e,i),r.remove(),this.toasts=this.toasts.filter(a=>a.el!==r)},this.$.toasts.prepend(r),this.toasts.unshift({el:r,t:5,text:t});this.toasts.length>3;)this.toasts.pop().el.remove()}tribe(t){return t===this.me?J("tribe.you"):J(t===pe?"tribe.wild":`tribe.${t===ii?6:t}`)}onEvents(t){for(const e of t){if(e.t==="age"){this.toast(e.player===this.me?J("msg.ageMe",{era:J(`era.${e.era}.in`)}):J("msg.ageOther",{p:this.tribe(e.player),era:J(`era.${e.era}.in`)}),void 0,void 0,"era");continue}if(e.t!=="msg"||e.player!==this.me)continue;const[i,s]=e.key.split("."),r=e.x!==void 0?e.x/256:void 0,a=e.z!==void 0?e.z/256:void 0;i==="built"?this.toast(J("msg.built",{b:J(`bld.${s}`)}),r,a,"built"):i==="defeated"?this.toast(Number(s)===this.me?J("msg.youDefeated"):J("msg.defeated",{p:this.tribe(Number(s))}),void 0,void 0,"defeated"):this.toast(J(`msg.${i}`),i==="underAttack"||i==="raidSoon"||i==="centerLost"||i==="campLoot"?r:void 0,a,i)}}update(t,e=!1){for(const i of this.toasts)(i.t-=t)<=0&&i.el.remove();this.toasts=this.toasts.filter(i=>i.t>0);for(const i of this.progs)i.el.style.width=`${Math.round(Math.max(0,Math.min(1,i.f()))*100)}%`;this.slow-=t,!(!e&&this.slow>0)&&(this.slow=.15,this.renderTop(),this.renderMode(),this.renderSel(),this.renderCard(),this.renderIdle())}renderTop(){const t=this.world,e=t.players[this.me],i=e.era,s=i>=2?["food","wood","stone","metal"]:["food","wood","stone"],r=t.pop(this.me),a=t.popCap(this.me),o=s.map(l=>Math.floor(e.res[l]/100)).join(",")+`|${r}|${a}|${i}|${e.aging>0}|${t.season}|${t.year}|${Fn()}`;o!==this.sigTop&&(this.sigTop=o,this.$.res.innerHTML=s.map(l=>`<div class="r" title="${J(`res.${l}`)}">${ze(l)}<span>${Z_(e.res[l]/100)}</span></div>`).join("")+`<div class="r${r>=a?" full":""}" title="${J("pop.tip",{n:r,cap:a,max:Os[i]})}">${ze("pop")}<span>${r}/${a}</span></div>`,this.$.era.innerHTML=`<span class="num">${nv[i]}</span><span class="name">${J(`era.${i}`)}</span>${e.aging>0?'<span class="era-prog"><i data-p="aging"></i></span>':""}`,this.$.era.title=J(`era.${i}`),this.$.cal.innerHTML=`${ze(`season.${t.season}`)}<span class="name">${J(`season.${t.season}`)}</span><span class="yr">${J("cal.year",{y:t.year})}</span><span class="cal-prog"><i data-p="season"></i></span>`,this.$.cal.title=`${J(`season.${t.season}`)} · ${J("cal.year",{y:t.year})}`,this.$.cal.dataset.season=String(t.season),this.bindProgs())}renderMode(){const t=`${this.mode}|${this.placeOk}|${Fn()}`;if(t===this.sigMode)return;this.sigMode=t;const e=this.$.modebar;e.hidden=this.mode==="normal",this.root.dataset.mode=this.mode,this.$["btn-confirmar-obra"].hidden=!(this.mode==="place"&&this.touch),this.$["btn-confirmar-obra"].setAttribute("aria-disabled",String(!this.placeOk)),this.$["modebar-text"].textContent=this.mode==="place"?this.placeOk?J(this.touch?"place.touch":"place.mouse"):J("place.bad"):this.mode==="rally"?J("rally.hint"):""}renderIdle(){const t=this.world;let e=0;for(let i=0;i<t.top;i++)t.isUnit(i)&&t.owner[i]===this.me&&t.kind[i]===le.villager&&t.task[i]===0&&t.state[i]!==Ze&&e++;e!==this.idleN&&(this.idleN=e,this.$["idle-n"].hidden=e===0,this.$["idle-n"].textContent=String(e))}doing(t){const e=this.world,i=e.task[t],s=e.tgt[t];return i===Ie?e.phase[t]===Qr?J("do.return",{n:Math.floor(e.carry[t]/100),res:J(`res.${ev[e.carryRes[t]]}`).toLowerCase()}):s<0?J("do.move"):e.tgtTile[t]?J(e.map.tree[s]?"do.wood":e.resKind[s]===Ge?"do.berry":e.resKind[s]===An?"do.stone":"do.metal"):J(e.kind[s]===Jt?"do.meat":"do.farm"):J(i===Vn?"do.build":i===Je?s>=0&&e.owner[s]===pe?"do.hunt":"do.fight":i===Ii?"do.amove":e.state[t]===Ze?"do.move":"do.idle")}renderSel(){const t=this.world,e=[...this.selected].filter(a=>t.alive[a]);if(!e.length){this.sigSel!=="none"&&(this.sigSel="none",this.$.sel.hidden=!0);return}let i,s;if(e.length===1){const a=e[0],o=t.kind[a],l=t.owner[a],c=l===this.me;if(o>=se){const h=Te[o-se],u=t.players[l]?.era??0,f=t.done[a]===1,p=t.queue[a],g=h.key==="farm"&&f?this.farmer(a):null;if(i=`b${a}|${t.hp[a]}|${f}|${p.join(",")}|${g}|${Fn()}`,i===this.sigSel)return;const _=c?f?"":J("info.building"):this.tribe(l),m=J(`bld.${h.key}.d`,{n:h.pop?h.pop[u]:0});s=this.head(Ds(h.key),J(`bld.${h.key}`),_,c)+this.hp(t.hp[a],h.hp)+(!f&&c?`<div class="prog"><i data-p="build:${a}"></i></div>`:"")+`<div class="sel-desc">${m}</div>`+(g!==null?`<div class="sel-line">${J("info.farmer",{who:J(g?"info.yes":"info.no")})}</div>`:"")+(p.length?`<div class="queue" aria-label="${J("info.queue")}">${p.map((d,x)=>`<span class="qi" title="${J(`unit.${Pt[d].key}`)}">${Ds(Pt[d].key)}${x===0?`<i class="qp" data-p="queue:${a}"></i>`:""}</span>`).join("")}</div>`:"")}else if(o===Jt){const h=Math.floor(t.work[a]/100);if(i=`c${a}|${h}|${Fn()}`,i===this.sigSel)return;s=this.head(ze("carcass","currentColor"),J("unit.carcass"),J(`unit.${Pt[t.sub[a]]?.key??"deer"}`),!1)+`<div class="sel-desc">${J("unit.carcass.d",{food:h})}</div>`}else{const h=Pt[o],u=c?this.doing(a):this.tribe(l);if(i=`u${a}|${t.hp[a]}|${u}|${Fn()}`,i===this.sigSel)return;s=this.head(Ds(h.key),J(`unit.${h.key}`),u,c)+this.hp(t.hp[a],h.hp)+`<div class="sel-desc">${J(`unit.${h.key}.d`,{food:h.animal?.food??0})}</div>`}}else{const a=new Map;for(const l of e)a.set(t.kind[l],(a.get(t.kind[l])||0)+1);const o=[...a.entries()].sort((l,c)=>l[0]-c[0]);if(i="m"+o.map(([l,c])=>`${l}:${c}`).join(",")+Fn(),i===this.sigSel)return;s=this.head(ze("pop","currentColor"),J("sel.many",{n:e.length}),"",!0)+`<div class="sel-icons">${o.map(([l,c])=>`<button data-selecionar="${Pt[l]?.key??l}" title="${J(`unit.${Pt[l]?.key}`)}">${Ds(Pt[l]?.key??"")}<span>${c}</span></button>`).join("")}</div>`}this.sigSel=i,this.$.sel.hidden=!1,this.$.sel.innerHTML=s,this.$.sel.querySelectorAll("[data-selecionar]").forEach(a=>a.onclick=()=>this.act.keepKind(le[a.dataset.selecionar]));const r=this.$.sel.querySelector("#btn-limpar-selecao");r&&(r.onclick=()=>this.act.clear()),this.bindProgs()}head(t,e,i,s){return`<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Us(e)}</div>${i?`<div class="sel-sub">${Us(i)}</div>`:""}</div><button id="btn-limpar-selecao" class="x" title="${J("sel.clear")}" aria-label="${J("sel.clear")}">${ze("close")}</button></div>`}hp(t,e){const i=Math.max(0,Math.min(1,t/e));return`<div class="hp" title="${J("info.hp")} ${Math.max(0,t)}/${e}"><i style="width:${Math.round(i*100)}%" class="${i>.6?"ok":i>.3?"mid":"low"}"></i></div>`}farmer(t){const e=this.world;for(let i=0;i<e.top;i++)if(e.isUnit(i)&&e.task[i]===Ie&&e.tgt[i]===t&&!e.tgtTile[i])return!0;return!1}missing(t){const e=this.world.players[this.me].res;return ts.find(i=>e[i]<(t[i]??0)*100)}whyCost(t){const e=this.missing(t);return e?J("why.cost",{res:J(`res.${e}`).toLowerCase()}):void 0}buttons(){const t=this.world,e=this.me,i=t.players[e],s=[...this.selected].filter(m=>t.alive[m]),r=s.filter(m=>t.isUnit(m)&&t.owner[m]===e),a=r.filter(m=>t.kind[m]===le.villager),o=[];if(r.length){if(this.cardMode==="build"&&a.length){o.push({id:"btn-voltar-comandos",ic:"back",label:J("cmd.back"),act:()=>{this.cardMode="main",this.refresh()}});for(const m of Te)if(m.buildable){const d=m.era>i.era?J("why.era",{era:J(`era.${m.era}.in`)}):this.whyCost(m.cost);o.push({data:["construir",m.key],ic:m.key,label:J(`bld.${m.key}`),cost:m.cost,why:d,act:()=>this.act.startPlace(m.key)})}return o}return a.length&&o.push({id:"btn-construir",ic:"build",label:J("cmd.build"),act:()=>{this.cardMode="build",this.refresh()}}),o.push({id:"btn-parar",ic:"stop",label:J("cmd.stop"),act:()=>this.act.stop()}),o}if(s.length!==1||!t.isBuilding(s[0])||t.owner[s[0]]!==e)return o;const l=s[0],c=t.bdef(l),h=t.done[l]===1,u=i.era;if(!h)return o;const f=c.trains?.[Math.min(u,1)]??[],p=t.pop(e),g=t.popCap(e);let _=0;for(let m=0;m<t.top;m++)if(t.isBuilding(m)&&t.owner[m]===e)for(const d of t.queue[m])_+=Pt[d].pop;for(const m of f){const d=Pt[le[m]],x=t.queue[l],M=x.length>=5?J("why.queue"):this.whyCost(d.cost)??(p+_+d.pop>g?J(g>=Os[u]?"why.popEra":"why.pop"):void 0);o.push({data:["treinar",m],ic:m,label:J(`unit.${m}`),cost:d.cost,why:M,badge:x.filter(v=>v===le[m]).length,act:()=>this.act.train(l,m)})}if(t.queue[l].length&&o.push({id:"btn-cancelar-fila",ic:"cancel",label:J("cmd.cancelQueue"),act:()=>this.act.cancelQueue(l)}),c.key==="center")if(i.aging>0)o.push({id:"btn-avancar-era",ic:"ageup",label:J("cmd.aging",{era:J(`era.${u+1}.to`)}),why:J("why.ageBusy"),prog:()=>1-i.aging/(es[u].time*10),act:()=>{}});else if(u<iv){const m=t.eraBuildingTypes(e),d=es[u];o.push({id:"btn-avancar-era",ic:"ageup",label:J("cmd.ageup",{era:J(`era.${u+1}.to`)}),cost:d.cost,why:m<2?J("why.age",{n:m}):this.whyCost(d.cost),act:()=>this.act.ageUp(l)})}else o.push({id:"btn-avancar-era",ic:"ageup",label:J("cmd.ageup",{era:J(`era.${u+1}.to`)}),why:J("why.maxEra"),act:()=>{}});return f.length&&o.push({id:"btn-ponto-reuniao",ic:"rally",label:J("cmd.rally"),pressed:this.mode==="rally",act:()=>this.act.rally(l)}),o}refresh(){this.sigCard="",this.slow=0}renderCard(){const t=[...this.selected].filter(a=>this.world.alive[a]),e=t.slice(0,4).join(",");e!==this.cardFor&&(this.cardFor=e,this.cardMode="main");const i=this.buttons(),s=i.map(a=>`${a.id??a.data?.join("=")}|${a.label}|${a.why??""}|${a.badge??""}|${a.pressed??""}`).join(";")+Fn();if(s===this.sigCard){this.btns=i;return}this.sigCard=s,this.btns=i;const r=this.$.cmd;r.hidden=i.length===0,r.innerHTML=i.map((a,o)=>{const l=a.id?`id="${a.id}"`:`data-${a.data[0]}="${a.data[1]}"`,c=a.cost?`<span class="cost">${ts.filter(h=>a.cost[h]).map(h=>`<span class="c${this.world.players[this.me].res[h]<a.cost[h]*100?" no":""}">${ze(h)}${a.cost[h]}</span>`).join("")}</span>`:"";return`<button ${l} data-i="${o}" class="cb${a.why?" off":""}" aria-disabled="${!!a.why}" aria-pressed="${!!a.pressed}" title="${Us(a.label+(a.why?" — "+a.why:""))}"><span class="cb-ic">${Ds(a.ic)}${a.badge?`<span class="badge">${a.badge}</span>`:""}</span><span class="cb-l">${Us(a.label)}</span>${c}${a.prog?'<span class="cb-p"><i data-p="btn"></i></span>':""}</button>`}).join(""),r.querySelectorAll("button[data-i]").forEach(a=>a.onclick=()=>{const o=this.btns[Number(a.dataset.i)];if(o){if(o.why){this.toast(o.why,void 0,void 0,"why");return}o.act(),this.refresh()}}),this.bindProgs()}bindProgs(){const t=this.world,e=t.players[this.me];this.progs=[],this.root.querySelectorAll("[data-p]").forEach(i=>{const[s,r]=(i.dataset.p??"").split(":"),a=Number(r);let o=null;s==="aging"||s==="btn"?o=()=>e.aging>0?1-e.aging/(es[Math.min(e.era,es.length-1)].time*10):0:s==="season"?o=()=>t.tick%1800/1800:s==="build"?o=()=>t.alive[a]?t.work[a]/(t.bdef(a).time*100):0:s==="queue"&&(o=()=>t.alive[a]&&t.queue[a].length?t.work[a]/(Pt[t.queue[a][0]].time*10):0),o&&this.progs.push({el:i,f:o})})}}class rv{constructor(t,e,i,s){I(this,"ctx");I(this,"base");I(this,"img");I(this,"t",1);this.world=e,this.me=i,this.cam=s;const r=e.size;t.width=t.height=r,this.ctx=t.getContext("2d"),this.base=this.ctx.createImageData(r,r),this.img=this.ctx.createImageData(r,r);const a=e.map,o=this.base.data;for(let h=0;h<r;h++)for(let u=0;u<r;u++){const f=h*r+u,p=a.terrain[f],g=a.heights[Math.round(h/a.hstep)*a.hn+Math.round(u/a.hstep)];let _=[104,150,72];if(p===Ci)_=[46,104,128];else if(p===Bs)_=[86,150,160];else if(p===Vr)_=[205,186,140];else if(p===Ri)_=[140,135,125];else{const m=Math.max(0,Math.min(1,(g-1)/12));_=[104+m*30,150-m*10,72+m*20]}a.tree[f]&&(_=[52,92,50]),o.set([_[0],_[1],_[2],255],f*4)}for(const h of a.res){const u=h.kind===Ge?[200,60,70]:h.kind===An?[215,210,200]:h.kind===Hs?[90,190,160]:[255,255,255];h.kind===Hs||!e.resKind[h.z*r+h.x]||this.base.data.set([u[0],u[1],u[2],255],(h.z*r+h.x)*4)}let l=!1;const c=h=>{const u=t.getBoundingClientRect();this.cam.tx=(h.clientX-u.left)/u.width*r,this.cam.tz=(h.clientY-u.top)/u.height*r};t.addEventListener("pointerdown",h=>{l=!0,t.setPointerCapture(h.pointerId),c(h),h.stopPropagation()}),t.addEventListener("pointermove",h=>{l&&c(h)}),t.addEventListener("pointerup",()=>{l=!1}),t.addEventListener("pointercancel",()=>{l=!1})}clearTile(t){this.base.data.set([112,148,76,255],t*4),this.t=1}update(t,e,i,s){if((this.t+=t)<.25)return;this.t=0;const r=this.world.size,a=this.base.data,o=this.img.data,l=this.world.vis[this.me],c=this.world.explored[this.me];for(let f=0;f<r*r;f++){const p=!e||l[f]?1:c[f]?.5:.08,g=f*4;o[g]=a[g]*p,o[g+1]=a[g+1]*p,o[g+2]=a[g+2]*p,o[g+3]=255}this.ctx.putImageData(this.img,0,0);const h=this.world;for(let f=0;f<h.top;f++){if(!h.alive[f])continue;const p=h.x[f]/256,g=h.z[f]/256,_=h.owner[f]===this.me;if(e&&!_&&!l[Math.floor(g)*r+Math.floor(p)]||h.kind[f]===Jt)continue;const m=h.kind[f]>=se,d=h.owner[f],x=m?7:d===pe?2:3;this.ctx.fillStyle=d===pe?"#e8d9b0":d===ii?"#2f3b27":h.players[d]?.color??"#fff",this.ctx.fillRect(p-x/2,g-x/2,x,x),m&&(this.ctx.strokeStyle="#fff",this.ctx.lineWidth=1,this.ctx.strokeRect(p-x/2,g-x/2,x,x))}const u=[[0,0],[i,0],[i,s],[0,s]].map(([f,p])=>this.cam.ground(f,p,i,s));u.every(f=>f)&&(this.ctx.strokeStyle="rgba(255,255,255,0.9)",this.ctx.lineWidth=1.5,this.ctx.beginPath(),u.forEach((f,p)=>p?this.ctx.lineTo(f.x,f.z):this.ctx.moveTo(f.x,f.z)),this.ctx.closePath(),this.ctx.stroke())}}class av{constructor(t,e,i,s,r,a){I(this,"selected",new Set);I(this,"pointers",new Map);I(this,"gesture","none");I(this,"longTimer",0);I(this,"lastTap",{t:0,x:0,y:0});I(this,"keys",new Set);I(this,"v",new k);I(this,"v2",new k);I(this,"right",new k);I(this,"ac",new AbortController);this.canvas=t,this.world=e,this.me=i,this.cam=s,this.box=r,this.hooks=a;const o={signal:this.ac.signal};t.addEventListener("pointerdown",l=>this.down(l),o),t.addEventListener("pointermove",l=>this.move(l),o),t.addEventListener("pointerup",l=>this.up(l),o),t.addEventListener("pointercancel",l=>this.cancel(l),o),t.addEventListener("contextmenu",l=>l.preventDefault(),o),t.addEventListener("wheel",l=>{l.preventDefault(),this.cam.tdist*=Math.exp(l.deltaY*.0012),this.hooks.onInteract()},{passive:!1,signal:this.ac.signal}),addEventListener("keydown",l=>this.key(l),o),addEventListener("keyup",l=>this.keys.delete(l.key.toLowerCase()),o),addEventListener("blur",()=>this.keys.clear(),o)}dispose(){this.ac.abort(),clearTimeout(this.longTimer),this.hideBox()}get W(){return this.canvas.clientWidth}get H(){return this.canvas.clientHeight}key(t){if(!(t.target?.tagName==="BUTTON"&&(t.key===" "||t.key==="Enter"))){if(t.key==="Escape"){this.hooks.mode()!=="normal"?this.hooks.onCancel():this.selected.size&&(this.selected.clear(),this.hooks.onSelect());return}this.keys.add(t.key.toLowerCase())}}down(t){if(this.canvas.setPointerCapture(t.pointerId),this.hooks.onInteract(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,sx:t.clientX,sy:t.clientY,t:performance.now(),button:t.button,type:t.pointerType}),clearTimeout(this.longTimer),this.pointers.size===2){this.gesture="pinch",this.hideBox();return}t.pointerType==="mouse"?t.button===1||t.button===0&&t.altKey?this.gesture="rotate":this.gesture="none":(this.gesture="none",this.hooks.mode()==="normal"&&(this.longTimer=window.setTimeout(()=>{this.gesture==="none"&&this.pointers.size===1&&(this.gesture="box",this.drawBox())},380)))}move(t){const e=this.pointers.get(t.pointerId);if(!e){if(t.pointerType==="mouse"&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}return}const i=t.clientX-e.x,s=t.clientY-e.y,r=Math.hypot(t.clientX-e.sx,t.clientY-e.sy);if(this.gesture==="pinch"&&this.pointers.size===2){const a=[...this.pointers.entries()].find(([u])=>u!==t.pointerId)[1],o=Math.hypot(e.x-a.x,e.y-a.y),l=Math.hypot(t.clientX-a.x,t.clientY-a.y);l>10&&o>10&&(this.cam.tdist*=o/l);const c=Math.atan2(e.y-a.y,e.x-a.x),h=Math.atan2(t.clientY-a.y,t.clientX-a.x);this.cam.tyaw+=Math.atan2(Math.sin(h-c),Math.cos(h-c)),this.cam.pan(i*.5,s*.5,this.H)}else if(this.gesture==="rotate")this.cam.tyaw-=i*.006;else if(e.type==="mouse")if(e.button===0&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}else e.button===0&&(this.gesture==="box"||r>6)&&(this.gesture="box",this.drawBox(e,t));else this.gesture==="none"&&this.hooks.mode()==="normal"&&r>10&&performance.now()-e.t>=380&&Math.hypot(e.x-e.sx,e.y-e.sy)<10&&(this.gesture="box"),this.gesture==="box"?this.drawBox(e,t):(this.gesture==="pan"||r>10)&&(this.gesture="pan",clearTimeout(this.longTimer),this.cam.pan(i,s,this.H));e.x=t.clientX,e.y=t.clientY}up(t){const e=this.pointers.get(t.pointerId);if(this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),!e)return;if(this.gesture==="pinch"){this.pointers.size===0&&(this.gesture="none");return}if(this.gesture==="box"){this.selectBox(e.sx,e.sy,t.clientX,t.clientY,t.shiftKey),this.hideBox(),this.gesture="none";return}if(this.gesture==="pan"||this.gesture==="rotate"){this.gesture="none";return}this.gesture="none";const i=t.clientX,s=t.clientY,r=this.hooks.mode(),a=performance.now(),o=a-this.lastTap.t<320&&Math.hypot(i-this.lastTap.x,s-this.lastTap.y)<30;if(this.lastTap={t:a,x:i,y:s},e.type==="mouse"){if(e.button===2){if(r==="place"){this.hooks.onCancel();return}const f=this.cam.ground(i,s,this.W,this.H);if(!f)return;if(r==="rally"||this.singleOwnBuilding()>=0){this.hooks.onRally(f.x,f.z);return}this.ownUnitsSelected()&&this.hooks.onCommand(this.target(i,s,f))}else if(e.button===0){if(r==="place"){const f=this.cam.ground(i,s,this.W,this.H);f&&this.hooks.onPlaceAt(f.x,f.z),this.hooks.onPlaceConfirm(t.shiftKey);return}if(r==="rally"){const f=this.cam.ground(i,s,this.W,this.H);f&&this.hooks.onRally(f.x,f.z);return}this.clickSelect(i,s,t.shiftKey,o)}return}const l=this.cam.ground(i,s,this.W,this.H);if(r==="place"){l&&this.hooks.onPlaceAt(l.x,l.z);return}if(r==="rally"){l&&this.hooks.onRally(l.x,l.z);return}const c=this.target(i,s,l),h=this.world,u=this.ownUnitsSelected();if(c.kind==="unit"&&h.owner[c.e]===this.me&&h.kind[c.e]!==Jt){this.clickSelect(i,s,!1,o);return}if(c.kind==="building"&&h.owner[c.e]===this.me){const f=!h.done[c.e]||Te[h.kind[c.e]-se].walk;u&&f?this.hooks.onCommand(c):this.only(c.e);return}if(u&&l){this.hooks.onCommand(c);return}if(c.kind==="unit"||c.kind==="building"){this.only(c.e);return}this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}cancel(t){this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),this.hideBox(),this.gesture="none"}only(t){this.selected.clear(),this.selected.add(t),this.hooks.onSelect()}ownUnitsSelected(){for(const t of this.selected)if(this.world.isUnit(t)&&this.world.owner[t]===this.me)return!0;return!1}singleOwnBuilding(){if(this.selected.size!==1)return-1;const t=this.selected.values().next().value;return this.world.isBuilding(t)&&this.world.owner[t]===this.me?t:-1}seen(t,e,i=!1){if(!this.hooks.fogOn())return!0;const s=this.world.size,r=Math.floor(t),a=Math.floor(e);return r<0||a<0||r>=s||a>=s?!1:(i?this.world.explored:this.world.vis)[this.me][a*s+r]===1}pickUnit(t,e,i){const s=this.world,r=this.lastTouch?34:24;let a=-1,o=r*r;for(let l=0;l<s.top;l++){if(!s.alive[l]||s.kind[l]>=se)continue;const c=s.owner[l]===this.me;if(i&&!c)continue;const h=s.x[l]/256,u=s.z[l]/256;if(!c&&!this.seen(h,u)||(this.cam.toScreen(h,jt(s.map,h,u)+(s.kind[l]===Jt?.2:.6),u,this.W,this.H,this.v),!this.v.z))continue;const f=(this.v.x-t)**2+(this.v.y-e)**2;f<o&&(o=f,a=l)}return[a,Math.sqrt(o)]}get lastTouch(){for(const t of this.pointers.values())return t.type!=="mouse";return matchMedia("(pointer: coarse)").matches}pickBuilding(t,e){const i=this.world;let s=-1,r=1;this.right.set(1,0,0).applyQuaternion(this.cam.cam.quaternion);for(let a=0;a<i.top;a++){if(!i.isBuilding(a))continue;const o=i.x[a]/256,l=i.z[a]/256;if(i.owner[a]!==this.me&&!this.seen(o,l,!0))continue;const c=Te[i.kind[a]-se].size,h=jt(i.map,o,l)+(c>=3?.7:.5);if(this.cam.toScreen(o,h,l,this.W,this.H,this.v),!this.v.z)continue;this.cam.toScreen(o+this.right.x*c*.55,h,l+this.right.z*c*.55,this.W,this.H,this.v2);const u=Math.max(18,Math.hypot(this.v2.x-this.v.x,this.v2.y-this.v.y)),f=Math.hypot(this.v.x-t,this.v.y-e)/u;f<r&&(r=f,s=a)}return[s,r]}pickTile(t,e,i){const s=this.world,r=s.size,a=Math.floor(i.x),o=Math.floor(i.z),l=this.lastTouch?36:28;let c=-1,h=l*l;for(let u=-3;u<=2;u++)for(let f=-3;f<=3;f++){const p=a+f,g=o+u;if(p<0||g<0||p>=r||g>=r)continue;const _=g*r+p,m=s.map.tree[_]>0;if(!(!(m||s.resKind[_])||s.resAmt[_]<=0||!s.explored[this.me][_])&&!(s.resKind[_]===3&&s.players[this.me].era<2))for(const d of m?[.6,1.5,2.4]:[.3]){if(this.cam.toScreen(p+.5,jt(s.map,p+.5,g+.5)+d,g+.5,this.W,this.H,this.v),!this.v.z)continue;const x=(this.v.x-t)**2+(this.v.y-e)**2;x<h&&(h=x,c=_)}}return c}target(t,e,i=this.cam.ground(t,e,this.W,this.H)){const s=this.world,r=i?.x??0,a=i?.z??0,[o,l]=this.pickUnit(t,e,!1),[c,h]=this.pickBuilding(t,e);if(o>=0&&(c<0||l<14||h>.75))return{kind:"unit",e:o,k:-1,x:s.x[o]/256,z:s.z[o]/256};if(c>=0)return{kind:"building",e:c,k:-1,x:s.x[c]/256,z:s.z[c]/256};if(i){const u=this.pickTile(t,e,i);if(u>=0)return{kind:"tile",e:-1,k:u,x:u%s.size+.5,z:Math.floor(u/s.size)+.5}}return{kind:"ground",e:-1,k:-1,x:r,z:a}}clickSelect(t,e,i,s){const r=this.world,a=this.target(t,e,null),o=a.kind==="unit"?a.e:-1;if(i&&!this.ownUnitsSelected()&&this.selected.clear(),o>=0&&r.owner[o]===this.me&&r.kind[o]!==Jt){if(i||this.selected.clear(),s){const l=r.kind[o];for(let c=0;c<r.top;c++)if(r.isUnit(c)&&r.owner[c]===this.me&&r.kind[c]===l){const h=r.x[c]/256,u=r.z[c]/256;this.cam.toScreen(h,jt(r.map,h,u),u,this.W,this.H,this.v),this.v.z&&this.v.x>=0&&this.v.y>=0&&this.v.x<=this.W&&this.v.y<=this.H&&this.selected.add(c)}}else i&&this.selected.has(o)?this.selected.delete(o):this.selected.add(o);this.hooks.onSelect();return}if(a.kind==="unit"||a.kind==="building"){this.only(a.e);return}!i&&this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}selectBox(t,e,i,s,r){const a=this.world,o=Math.min(t,i),l=Math.max(t,i),c=Math.min(e,s),h=Math.max(e,s);(!r||!this.ownUnitsSelected())&&this.selected.clear();for(let u=0;u<a.top;u++){if(!a.isUnit(u)||a.owner[u]!==this.me)continue;const f=a.x[u]/256,p=a.z[u]/256;this.cam.toScreen(f,jt(a.map,f,p)+.5,p,this.W,this.H,this.v),this.v.z&&this.v.x>=o&&this.v.x<=l&&this.v.y>=c&&this.v.y<=h&&this.selected.add(u)}this.hooks.onSelect()}drawBox(t,e){const i=this.box;if(i.style.display="block",!t||!e){const s=[...this.pointers.values()][0];if(!s)return;i.style.left=s.sx+"px",i.style.top=s.sy+"px",i.style.width=i.style.height="2px";return}i.style.left=Math.min(t.sx,e.clientX)+"px",i.style.top=Math.min(t.sy,e.clientY)+"px",i.style.width=Math.abs(e.clientX-t.sx)+"px",i.style.height=Math.abs(e.clientY-t.sy)+"px"}hideBox(){this.box.style.display="none"}update(t){const e=this.keys;let i=0,s=0;const r=900*t;(e.has("a")||e.has("arrowleft"))&&(i+=r),(e.has("d")||e.has("arrowright"))&&(i-=r),(e.has("w")||e.has("arrowup"))&&(s+=r),(e.has("s")||e.has("arrowdown"))&&(s-=r),(i||s)&&(this.cam.pan(i,s,this.H),this.hooks.onInteract()),e.has("q")&&(this.cam.tyaw+=t*1.6),e.has("e")&&(this.cam.tyaw-=t*1.6),(e.has("+")||e.has("="))&&(this.cam.tdist*=1-t*1.2),e.has("-")&&(this.cam.tdist*=1+t*1.2)}}const jc="origines_opts",ov=n=>n.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class lv{constructor(t){I(this,"root");I(this,"screen",null);I(this,"rivals",3);I(this,"diff",1);this.act=t,this.root=document.getElementById("menus");try{const e=JSON.parse(localStorage.getItem(jc)??"{}");e.rivals>=1&&e.rivals<=3&&(this.rivals=e.rivals),e.diff>=0&&e.diff<=2&&(this.diff=e.diff)}catch{}iu(()=>this.render())}get open(){return this.screen!==null}get kind(){return this.screen?.k??null}showStart(t){this.screen={k:"start",info:t,step:"main"},this.render()}updateStart(t){this.screen?.k==="start"&&(this.screen.info=t,this.render())}showPause(t,e){this.screen={k:"pause",minutes:t,quality:e,saved:""},this.render()}showEnd(t,e,i){this.screen={k:"end",result:t,minutes:e,era:i},this.render()}hide(){this.screen=null,this.render()}lang(){return`<div class="seg" role="group" aria-label="${J("lang.label")}"><button id="btn-idioma-en" aria-pressed="${Fn()==="en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${Fn()==="pt"}">PT</button></div>`}render(){const t=this.screen,e=this.root;if(e.dataset.open=String(!!t),e.dataset.screen=t?.k??"",!t){e.innerHTML="";return}if(t.k==="start"){const r=t.info.meta,a=t.info.account,o=`${r?`<button id="btn-continuar" class="big primary">${J(t.info.fromCloud?"menu.continueCloud":"menu.continue")}<small>${J("menu.saved",{era:J(`era.${r.era}`),y:r.year,r:r.rivals})}</small></button>`:""}
        <button id="btn-novo-jogo" class="big${r?"":" primary"}">${J("menu.new")}</button>
        ${a?a.logado?`<button id="btn-perfil-conta" class="link">${J("cloud.account",{name:ov(a.apelido??"")})}</button>`:`<button id="btn-entrar-conta" class="link strong">${J("cloud.login")}</button><p class="muted small">${J("cloud.why")}</p>`:""}`,l=`<div class="opt"><div class="opt-l">${J("menu.rivals")}</div><div class="seg">${[1,2,3].map(c=>`<button data-rivais="${c}" aria-pressed="${this.rivals===c}">${c}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${J("menu.difficulty")}</div><div class="seg">${[0,1,2].map(c=>`<button data-dificuldade="${c}" aria-pressed="${this.diff===c}">${J(`diff.${c}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${J("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${J("menu.back")}</button>`;e.innerHTML=`<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${J("menu.tagline")}</div></div>
        <div class="card panel">${t.step==="main"?o:l}</div>
        <div class="foot">${this.lang()}<span class="credits">${J("menu.credits")}</span></div>
        <p class="local">${J(t.info.account?.logado?"menu.localCloud":"menu.local")}</p></div>`}else t.k==="pause"?e.innerHTML=`<div class="screen pause"><div class="card panel">
        <h2>${J("pause.title")}</h2><p class="muted">${J("pause.time",{m:t.minutes})}</p>
        <button id="btn-voltar-jogo" class="big primary">${J("pause.resume")}</button>
        <button id="btn-salvar" class="big">${J("pause.save")}</button>
        ${t.saved?`<p class="saved ${t.saved==="fail"?"fail":t.saved==="saving"?"":"ok"}">${J({saving:"pause.saving",both:"pause.savedBoth",local:"pause.saved",localOnly:"pause.savedLocalOnly",fail:"pause.saveFail"}[t.saved])}</p>`:""}
        <div class="opt"><div class="opt-l">${J("q.label")}</div><div class="seg">${Yr.map((r,a)=>`<button data-qualidade="${r.key}" aria-pressed="${t.quality===a}">${J(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${J("lang.label")}</div>${this.lang()}</div>
        <div class="row2"><button id="btn-ajuda-pausa">${J("btn.help")}</button><button id="btn-sair">${J("pause.quit")}</button></div>
      </div></div>`:e.innerHTML=`<div class="screen end ${t.result}"><div class="card panel">
        <h2>${J(`end.${t.result}`)}</h2><p>${J(`end.${t.result}.d`)}</p><p class="muted">${J(`era.${t.era}`)} · ${J("pause.time",{m:t.minutes})}</p>
        <button id="btn-fim-menu" class="big primary">${J("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${J("end.watch")}</button>
      </div></div>`;const i=(r,a)=>e.querySelectorAll(r).forEach(o=>o.onclick=()=>a(o)),s=()=>{try{localStorage.setItem(jc,JSON.stringify({rivals:this.rivals,diff:this.diff}))}catch{}};i("#btn-idioma-en",()=>Kc("en")),i("#btn-idioma-pt",()=>Kc("pt")),i("#btn-continuar",()=>this.act.cont()),i("#btn-novo-jogo",()=>{this.screen?.k==="start"&&(this.screen.step="new",this.render())}),i("#btn-voltar-inicio",()=>{this.screen?.k==="start"&&(this.screen.step="main",this.render())}),i("[data-rivais]",r=>{this.rivals=Number(r.dataset.rivais),s(),this.render()}),i("[data-dificuldade]",r=>{this.diff=Number(r.dataset.dificuldade),s(),this.render()}),i("#btn-comecar",()=>this.act.start(this.rivals,this.diff)),i("#btn-voltar-jogo",()=>this.act.resume()),i("#btn-salvar",async()=>{if(this.screen?.k!=="pause"||this.screen.saved==="saving")return;this.screen.saved="saving",this.render();const r=await this.act.save();this.screen?.k==="pause"&&(this.screen.saved=r,this.render())}),i("#btn-entrar-conta",()=>this.act.login()),i("#btn-perfil-conta",()=>this.act.profile()),i("[data-qualidade]",r=>{const a=Yr.findIndex(o=>o.key===r.dataset.qualidade);a>=0&&this.screen?.k==="pause"&&(this.screen.quality=a,this.act.quality(a),this.render())}),i("#btn-ajuda-pausa",()=>this.act.help()),i("#btn-sair",()=>this.act.quit()),i("#btn-fim-menu",()=>this.act.toMenu()),i("#btn-continuar-olhando",()=>this.act.watch()),e.querySelector(".primary")?.focus({preventScroll:!0})}}function cv(n,t,e,i){const s=e.filter(h=>n.isUnit(h)&&n.owner[h]===t),r=s.filter(h=>n.kind[h]===le.villager),a=s.filter(h=>n.kind[h]!==le.villager),o=Math.round(i.x*256),l=Math.round(i.z*256),c=h=>h.length?[{type:"move",player:t,ids:h,x:o,z:l}]:[];if(i.kind==="tile"&&r.length)return{cmds:[{type:"gather",player:t,ids:r,k:i.k},...c(a)],ping:"work"};if(i.kind==="building"&&n.alive[i.e]){const h=i.e;return n.owner[h]===t?{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"}:{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}if(i.kind==="unit"&&n.alive[i.e]){const h=i.e;if(n.kind[h]===Jt)return{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"};if(n.owner[h]!==t&&(n.owner[h]===pe||n.hostile(t,n.owner[h])))return{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}return{cmds:c(s),ping:"move"}}const hv=(n,t)=>{for(const e of t)if(n.isUnit(e)&&n.kind[e]===le.villager)return!0;return!1},su=1,ru=["alive","kind","owner","x","z","hp","state","slotX","slotZ","task","tgt","tgtTile","phase","carry","carryRes","cd","work","done","sub","aggro","tmr","herd","fast","amx","amz","fails","frac","rallyX","rallyZ","dropB","ignoreT","ignoreUntil","stuck","best"],Zc=new WeakMap;function uv(n){let t=Zc.get(n);if(t)return t;const e=sh(n.map.seed,n.players.length),i=e.size*e.size,s=new Uint8Array(i),r=new Int32Array(i);for(let a=0;a<i;a++)e.tree[a]&&(r[a]=e.wood[a]*100);for(const a of e.res){const o=a.z*e.size+a.x;s[o]=a.kind,r[o]=a.amount*100}return t={tree:e.tree,kind:s,amt:r},Zc.set(n,t),t}function dv(n){const t=[];let e=0,i=0;for(let s=0;s<n.length;s++){const r=n[s]?1:0;r===e?i++:(t.push(i),e=r,i=1)}return t.push(i),t}function fv(n,t){let e=0,i=0;for(const s of n)i&&t.fill(1,e,e+s),e+=s,i^=1}function pv(n){const t=uv(n),e=n.size,i=n.top,s={};for(const h of ru)s[h]=Array.from(n[h].subarray(0,i));const r=[];for(let h=0;h<i;h++)n.alive[h]&&n.queue[h].length&&r.push([h,n.queue[h].slice()]);const a=[],o=[],l=[];for(let h=0;h<e*e;h++)t.tree[h]&&!n.map.tree[h]&&a.push(h),n.resAmt[h]!==t.amt[h]&&o.push(h,n.resAmt[h]),n.resKind[h]!==t.kind[h]&&l.push(h,n.resKind[h]);const c=n.players.find(h=>!h.ai)??n.players[0];return{v:su,seed:n.map.seed,players:n.players.length,humans:n.players.filter(h=>!h.ai).length,difficulty:n.difficulty,tick:n.tick,rng:n.rng.save(),top:i,ent:s,queue:r,P:n.players.map(h=>({res:{...h.res},era:h.era,aging:h.aging,agingB:h.agingB,hunger:h.hunger,defeated:h.defeated,lastAlert:h.lastAlert,ai:h.ai})),ai:n.ai.map(h=>({...h})),barbNext:n.barbNext,barbWarned:n.barbWarned,outcome:n.outcome,cut:a,amt:o,kindDiff:l,explored:n.explored.map(dv),projectiles:n.projectiles.map(h=>({...h})),meta:{era:c.era,year:n.year,rivals:n.players.filter(h=>h.ai).length,difficulty:n.difficulty,minutes:Math.floor(n.tick/600)}}}function au(n){if(!n||n.v!==su)throw new Error("save version");const t=new uh(n.seed,n.players,{humans:n.humans,difficulty:n.difficulty}),e=t.size,i=e*e;for(const s of ru){const r=t[s];r.fill(s==="ignoreT"||s==="dropB"||s==="tgt"?-1:0),r.set(n.ent[s])}t.top=n.top;for(let s=0;s<Nt;s++)t.queue[s]=[],t.field[s]=null,t.path[s]=null;for(const[s,r]of n.queue)t.queue[s]=r.slice();t.px.set(t.x),t.pz.set(t.z);for(const s of n.cut)t.map.tree[s]=0,t.map.wood[s]=0;for(let s=0;s<n.amt.length;s+=2)t.resAmt[n.amt[s]]=n.amt[s+1];for(let s=0;s<n.kindDiff.length;s+=2)t.resKind[n.kindDiff[s]]=n.kindDiff[s+1];t.bAt.fill(0);for(let s=0;s<i;s++){const r=t.map.terrain[s];t.blocked[s]=r===Ci||r===Ri||t.map.tree[s]||t.resKind[s]?1:0}for(let s=0;s<t.top;s++)if(t.alive[s]&&t.kind[s]>=se){const[r,a,o]=t.footprint(s),l=Te[t.kind[s]-se].walk;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const u=(a+c)*e+r+h;t.bAt[u]=s+1,l||(t.blocked[u]=1)}}n.explored.forEach((s,r)=>{t.explored[r].fill(0),fv(s,t.explored[r])}),n.P.forEach((s,r)=>{const a=t.players[r];Object.assign(a.res,s.res),a.era=s.era,a.aging=s.aging,a.agingB=s.agingB,a.hunger=s.hunger,a.defeated=s.defeated,a.lastAlert=s.lastAlert,a.ai=s.ai}),t.ai=n.ai.map(s=>({...s})),t.barbNext=n.barbNext,t.barbWarned=n.barbWarned,t.outcome=n.outcome,t.tick=n.tick,t.rng.load(n.rng),t.projectiles=n.projectiles.map(s=>({...s})),t.events.length=0;for(let s=0;s<t.top;s++)t.alive[s]&&t.state[s]===Ze&&(t.task[s]===Me?t.goPoint(s,t.slotX[s],t.slotZ[s]):t.state[s]=ge);return t.updateFog(),t}const Qs="origines_save_v1",ca="origines_save_meta_v1";function Kr(n){const t=pv(n);t.meta.savedAt=Date.now();try{localStorage.setItem(Qs,JSON.stringify(t)),localStorage.setItem(ca,JSON.stringify(t.meta))}catch{}return t}function mv(n){try{localStorage.setItem(Qs,JSON.stringify(n)),localStorage.setItem(ca,JSON.stringify(n.meta))}catch{}}function gv(){try{const n=localStorage.getItem(ca);return n&&localStorage.getItem(Qs)?JSON.parse(n):null}catch{return null}}function _v(){try{const n=localStorage.getItem(Qs);return n?au(JSON.parse(n)):null}catch{return null}}function ou(){try{localStorage.removeItem(Qs),localStorage.removeItem(ca)}catch{}}const pl="/api/origines/save";let kn=null,ls=null;const ml=[],vv=()=>ls,xv=n=>{ml.push(n)},Ms=()=>!!ls?.logado;async function Mv(){if(location.pathname.startsWith("/jogar/"))try{const n=window;if(n.QGConta||await new Promise((t,e)=>{const i=document.createElement("script");i.src="/conta.js?v=2",i.onload=()=>t(),i.onerror=()=>e(new Error("conta")),document.head.appendChild(i)}),kn=n.QGConta??null,!kn)return;ls=await kn.me(),kn.aoMudar(t=>{ls=t,ml.forEach(e=>e())})}catch{kn=null,ls=null}}const yv=async()=>{kn&&(await kn.entrar(),ls=await kn.me(),ml.forEach(n=>n()))},Sv=()=>kn?.perfil();async function bv(){if(!Ms())return null;try{const n=await fetch(pl,{credentials:"same-origin"});return n.ok?(await n.json()).save??null:null}catch{return null}}async function Ev(){if(!Ms())return null;try{const n=await fetch(`${pl}?dados=1`,{credentials:"same-origin"});return n.ok?(await n.json()).dados??null:null}catch{return null}}const lu=(n,t=!1)=>fetch(pl,{method:"POST",credentials:"same-origin",keepalive:t,headers:{"content-type":"application/json"},body:JSON.stringify(n)});async function jr(n,t=!1){if(!Ms())return!1;try{const e={dados:n};return t&&JSON.stringify(e).length>6e4&&(t=!1),(await lu(e,t)).ok}catch{return!1}}async function Tv(){if(Ms())try{await lu({apagar:!0})}catch{}}const Av=n=>({era:n.era,year:n.ano,rivals:n.rivais,difficulty:n.dificuldade,minutes:n.minutos,savedAt:n.salvoEm}),Ys=new URLSearchParams(location.search),Zr=(n,t)=>{const e=Number(Ys.get(n));return Ys.has(n)&&Number.isFinite(e)&&e>=0?e:t},cu=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1,hu=document.getElementById("scene"),Ks=tu.makeRenderer(hu),De=0,ja=1/Qc;let ei=cu?1:0,Jr=!0;try{const n=localStorage.getItem("origines_q");n!==null&&(ei=Math.min(2,Math.max(0,Number(n)||0)),Jr=!1)}catch{}const uu=n=>{ei=n;try{localStorage.setItem("origines_q",String(n))}catch{}};class Cv{constructor(t){I(this,"scene");I(this,"hud");I(this,"input");I(this,"minimap");I(this,"sel",new Set);I(this,"paused",!1);I(this,"ended",!1);I(this,"acc",0);I(this,"time",0);I(this,"saveT",0);I(this,"idleCursor",0);I(this,"autoT",0);I(this,"autoN",0);I(this,"mode","normal");I(this,"placeKey","");I(this,"place",{tx:0,tz:0,ok:!1});I(this,"rallyB",-1);this.world=t;const e=t;this.scene=new tu(Ks,e,De),this.scene.setQuality(ei),Ys.get("fog")==="0"&&this.scene.setFog(!1),this.hud=new sv(e,De,{idle:()=>{const i=this.own(r=>e.kind[r]===le.villager&&e.task[r]===0&&e.state[r]===0);if(!i.length)return;const s=i[this.idleCursor++%i.length];this.select([s]),this.focus([s])},army:()=>{const i=this.own(s=>e.kind[s]!==le.villager);this.select(i),this.focus(i)},home:()=>{const i=e.players[De].start;this.scene.camera.tx=i.x,this.scene.camera.tz=i.z},menu:()=>this.pause(),keepKind:i=>{for(const s of[...this.sel])e.kind[s]!==i&&this.sel.delete(s)},clear:()=>{this.sel.clear(),this.setMode("normal")},stop:()=>{const i=this.own(s=>this.sel.has(s));i.length&&e.issue({type:"stop",player:De,ids:i})},startPlace:i=>this.startPlace(i),train:(i,s)=>e.issue({type:"train",player:De,building:i,key:s}),cancelQueue:i=>e.issue({type:"cancel",player:De,building:i}),ageUp:i=>e.issue({type:"ageup",player:De,building:i}),rally:i=>{this.rallyB=i,this.setMode(this.mode==="rally"?"normal":"rally")},placeConfirm:()=>this.confirmPlace(!1),cancelMode:()=>this.setMode("normal"),jump:(i,s)=>{this.scene.camera.tx=i,this.scene.camera.tz=s}},cu,this.sel),this.minimap=new rv(this.hud.minimap,e,De,this.scene.camera),this.input=new av(hu,e,De,this.scene.camera,this.hud.box,{onCommand:i=>{if(this.mode!=="normal")return;const{cmds:s,ping:r}=cv(e,De,[...this.sel],i);for(const a of s)e.issue(a);s.length&&this.scene.ping(i.x,i.z,r)},onRally:(i,s)=>{const r=this.mode==="rally"&&e.alive[this.rallyB]?this.rallyB:this.input.singleOwnBuilding();r>=0&&(e.issue({type:"rally",player:De,building:r,x:Math.round(i*256),z:Math.round(s*256)}),this.scene.ping(i,s,"move")),this.setMode("normal")},onPlaceAt:(i,s)=>this.movePlace(i,s),onPlaceConfirm:i=>this.confirmPlace(i),onCancel:()=>this.setMode("normal"),onSelect:()=>{this.mode==="place"&&!hv(e,this.sel)&&this.setMode("normal"),this.mode==="rally"&&this.setMode("normal")},onInteract:()=>this.hud.hideHint(),mode:()=>this.mode,fogOn:()=>this.scene.fogOn}),this.input.selected=this.sel,this.resize()}own(t){const e=this.world,i=[];for(let s=0;s<e.top;s++)e.isUnit(s)&&e.owner[s]===De&&t(s)&&i.push(s);return i}select(t){this.sel.clear();for(const e of t)this.sel.add(e);this.setMode("normal")}focus(t){if(!t.length)return;let e=0,i=0;for(const s of t)e+=this.world.x[s]/256,i+=this.world.z[s]/256;this.scene.camera.tx=e/t.length,this.scene.camera.tz=i/t.length}setMode(t){this.mode=t,t!=="place"&&this.scene.setGhost(null),this.hud.setMode(t,this.place.ok),this.hud.refresh()}startPlace(t){this.placeKey=t,this.mode="place",this.hud.resetCard(),this.movePlace(this.scene.camera.x,this.scene.camera.z)}movePlace(t,e){if(this.mode!=="place")return;const i=this.world,s=Te[pn[this.placeKey]],r=Math.round(t-s.size/2),a=Math.round(e-s.size/2),o=i.canPlace(De,this.placeKey,r,a)&&i.canAfford(De,s.cost);this.place={tx:r,tz:a,ok:o},this.scene.setGhost(this.placeKey,r,a,o),this.hud.setMode("place",o)}confirmPlace(t){const e=this.world,i=this.own(r=>this.sel.has(r)&&e.kind[r]===le.villager);if(this.mode!=="place"||!i.length){this.setMode("normal");return}if(!this.place.ok){this.hud.toast(J("place.bad"),void 0,void 0,"place");return}e.issue({type:"build",player:De,ids:i,key:this.placeKey,tx:this.place.tx,tz:this.place.tz});const s=Te[pn[this.placeKey]];this.scene.ping(this.place.tx+s.size/2,this.place.tz+s.size/2,"work"),t&&e.canAfford(De,{wood:(s.cost.wood??0)*2,stone:(s.cost.stone??0)*2})?(this.place.ok=!1,this.scene.setGhost(this.placeKey,this.place.tx,this.place.tz,!1)):(this.setMode("normal"),this.hud.resetCard())}pause(){this.ended||(this.paused=!0,this.setMode("normal"),Tn.showPause(Math.floor(this.world.tick/600),ei))}resume(){this.paused=!1,Tn.hide()}async save(){if(this.ended)return"fail";const t=Kr(this.world);return t?Ms()?await jr(t)?"both":"localOnly":"local":"fail"}resize(){this.scene.resize(innerWidth,innerHeight)}frame(t){const e=this.world;if(!this.paused){this.acc+=t;let s=0;for(;this.acc>=ja&&s<4;)e.step(),this.acc-=ja,s++;s===4&&(this.acc=0)}const i=e.drain();if(i.length){this.scene.consume(i),this.hud.onEvents(i);for(const s of i)(s.t==="tree"||s.t==="res"&&e.resKind[s.k]===0)&&this.minimap.clearTile(s.k),s.t==="end"&&!this.ended&&this.end(s.result)}this.input.update(t);for(const s of[...this.sel])e.alive[s]||this.sel.delete(s);if(this.time+=t,this.scene.render(t,this.paused?1:this.acc/ja,this.sel,this.time),this.minimap.update(t,this.scene.fogOn,innerWidth,innerHeight),this.hud.update(t),!this.paused&&!this.ended&&(this.saveT+=t)>300){this.saveT=0;const s=Kr(e);s&&jr(s)}if(Jr&&!this.paused&&(this.autoT+=t,this.autoN++,this.autoT>4)){Jr=!1;const s=this.autoN/this.autoT;s<40&&ei<2&&(uu(ei+1),this.scene.setQuality(ei),this.hud.toast(J("q.auto",{q:J(`q.${Yr[ei].key}`),fps:Math.round(s)})))}}end(t){this.ended=!0,ou(),Tv(),this.setMode("normal"),Tn.showEnd(t,Math.floor(this.world.tick/600),this.world.players[De].era)}dispose(){this.input.dispose(),this.hud.dispose(),this.scene.dispose()}}let Se=null;const du={cont:async()=>{if(Mi.fromCloud){const t=await Ev();let e=null;try{e=t?au(t):null}catch{e=null}if(e&&t){mv(t),Za(e);return}}const n=_v();if(!n){ou(),js();return}Za(n)},start:(n,t)=>Za(new uh(Zr("seed",Date.now()%1000000007>>>0),n+1,{humans:1,difficulty:t,testUnits:Math.min(600,Zr("units",0))})),resume:()=>Se?.resume(),save:()=>Se?.save()??Promise.resolve("fail"),quit:()=>{if(Se&&!Se.ended){const n=Kr(Se.world);n&&jr(n)}Jc()},quality:n=>{uu(n),Jr=!1,Se?.scene.setQuality(n)},help:()=>{Se?.resume(),Se?.hud.openHelp()},watch:()=>Tn.hide(),toMenu:()=>Jc(),login:()=>{yv()},profile:()=>Sv()},Tn=new lv(du);function Za(n){Se?.dispose(),Se=new Cv(n),Tn.hide();const t=Se;window.__origines={world:n,scene:t.scene,input:t.input,game:t,screen:(e,i,s=.5)=>{const r=t.scene.camera.cam.position.clone().set(e,jt(n.map,e,i)+s,i).project(t.scene.camera.cam);return[(r.x+1)/2*innerWidth,(1-r.y)/2*innerHeight,r.z<1?1:0]}}}function Jc(){Se?.dispose(),Se=null,Ks.setClearColor(1911332,1),Ks.clear(),js()}let Mi={meta:null,fromCloud:!1,account:null};async function js(){if(Mi={meta:gv(),fromCloud:!1,account:vv()},Tn.showStart(Mi),!Ms())return;const n=await bv();if(!n||Tn.kind!=="start")return;const t=Mi.meta,e=Av(n);(!t||(e.savedAt??0)>(t.savedAt??0))&&(Mi={...Mi,meta:e,fromCloud:!0}),Tn.updateStart(Mi)}xv(()=>{Tn.kind==="start"&&js()});addEventListener("resize",()=>{Ks.setSize(innerWidth,innerHeight,!1),Se?.resize()});Ks.setSize(innerWidth,innerHeight,!1);let jo=performance.now();const fu=()=>{if(Se&&!Se.ended){const n=Kr(Se.world);n&&jr(n,!0)}};document.addEventListener("visibilitychange",()=>{jo=performance.now(),document.hidden&&fu()});addEventListener("pagehide",fu);let Nr=0,Ja=0,pu=!1;Ys.get("autostart")==="1"&&(window.__clock={manual:n=>{pu=n},step:n=>Se?.frame(n)});function mu(n){const t=Math.min(.1,(n-jo)/1e3);jo=n,Se&&!pu&&Se.frame(t),Ja++,Nr+=t,Nr>1&&(window.__fps=Ja/Nr,Ja=0,Nr=0),requestAnimationFrame(mu)}requestAnimationFrame(mu);Ys.get("autostart")==="1"?du.start(Math.min(3,Math.max(1,Zr("players",4)-1)),Math.min(2,Zr("difficulty",1))):(js(),Mv().then(()=>{Tn.kind==="start"&&js()}));const Qa=document.getElementById("loading");Qa&&(Qa.style.opacity="0",setTimeout(()=>Qa.remove(),450));
