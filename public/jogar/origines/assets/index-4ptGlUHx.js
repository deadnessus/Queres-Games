var Nd=Object.defineProperty;var zd=(i,t,e)=>t in i?Nd(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var R=(i,t,e)=>zd(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const wt=256;function Yi(i){if(i<=0)return 0;let t=Math.floor(Math.sqrt(i));for(;t*t>i;)t--;for(;(t+1)*(t+1)<=i;)t++;return t}const gi=(i,t)=>Math.trunc(i/t),cu=10,hu=2,vr=[30,60,90,115,135,150],Ki=["food","wood","stone","metal","coins"],yt=[{key:"villager",cls:"villager",hp:25,atk:3,armor:0,range:.6,cd:15,speed:.95,radius:.28,sight:8,pop:1,cost:{food:50},time:20,era:0,hunt:2.6},{key:"warrior",cls:"infantry",hp:40,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:40,wood:20},time:18,era:0,next:"axeman"},{key:"hunter",cls:"ranged",hp:30,atk:4,armor:0,range:5,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:30},time:20,era:0,next:"archer",proj:"spear"},{key:"dog",cls:"scout",hp:30,atk:2,armor:0,range:.6,cd:10,speed:1.9,radius:.25,sight:12,pop:1,cost:{food:40},time:15,era:0},{key:"axeman",cls:"infantry",hp:55,atk:7,armor:1,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:45,wood:25},time:18,era:1,next:"swordsman"},{key:"archer",cls:"ranged",hp:32,atk:5,armor:0,range:6,cd:20,speed:1,radius:.28,sight:8,pop:1,cost:{food:30,wood:40},time:22,era:1,next:"slinger",proj:"arrow"},{key:"spearman",cls:"spear",hp:50,atk:5,armor:1,range:.9,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:35,wood:25},time:18,era:1,bonus:[{vs:"animal",dmg:6},{vs:"cavalry",dmg:8}]},{key:"deer",cls:"animal",hp:12,atk:0,armor:0,range:0,cd:10,speed:.9,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:150,mode:"flee",run:1.8}},{key:"boar",cls:"animal",hp:40,atk:3,armor:0,range:.7,cd:15,speed:.8,radius:.32,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:250,mode:"fight",run:1.6}},{key:"wolf",cls:"animal",hp:20,atk:3,armor:0,range:.7,cd:12,speed:1.1,radius:.3,sight:5,pop:0,cost:{},time:0,era:0,animal:{food:0,mode:"predator",run:2}},{key:"aurochs",cls:"animal",hp:60,atk:5,armor:1,range:.8,cd:15,speed:.7,radius:.45,sight:6,pop:0,cost:{},time:0,era:0,animal:{food:400,mode:"fight",run:1.4}},{key:"barbarian",cls:"infantry",hp:45,atk:5,armor:0,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:0,cost:{},time:0,era:0},{key:"swordsman",cls:"infantry",hp:60,atk:8,armor:1,range:.7,cd:15,speed:.95,radius:.3,sight:7,pop:1,cost:{food:45,metal:20},time:20,era:2,bonus:[{vs:"spear",dmg:3}]},{key:"slinger",cls:"ranged",hp:32,atk:5,armor:0,range:6,cd:18,speed:1.05,radius:.28,sight:8,pop:1,cost:{food:30,stone:25},time:20,era:2,proj:"stone",bonus:[{vs:"infantry",dmg:2}]},{key:"horseman",cls:"cavalry",hp:90,atk:8,armor:1,range:.8,cd:15,speed:1.75,radius:.45,sight:9,pop:2,cost:{food:60,metal:35},time:26,era:2,bonus:[{vs:"ranged",dmg:4},{vs:"siege",dmg:10}]},{key:"ram",cls:"siege",hp:160,atk:35,armor:4,range:1.15,cd:30,speed:.5,radius:.6,sight:5,pop:3,cost:{wood:150,metal:30},time:35,era:2,siege:!0}],ie=Object.fromEntries(yt.map((i,t)=>[i.key,t])),Qt=60,jt=100,be=[{key:"center",hp:600,size:4,sight:14,cost:{},time:0,era:0,pop:[8,10,10,10,10,10],drop:!0,trains:[["villager"],["villager"],["villager"]]},{key:"house",hp:150,size:2,sight:5,cost:{wood:30},time:20,era:0,pop:[4,5,6,6,6,10],buildable:!0},{key:"depot",hp:200,size:2,sight:6,cost:{wood:60},time:25,era:0,drop:!0,buildable:!0},{key:"military",hp:300,size:3,sight:7,cost:{wood:100},time:40,era:0,trains:[["warrior","hunter","dog"],["axeman","spearman","archer","dog"],["swordsman","spearman","slinger","dog"]],buildable:!0},{key:"farm",hp:80,size:3,sight:3,cost:{wood:60},time:15,era:1,walk:!0,buildable:!0},{key:"pen",hp:150,size:3,sight:5,cost:{wood:80},time:30,era:1,buildable:!0},{key:"sanctuary",hp:250,size:2,sight:7,cost:{wood:40,stone:60},time:40,era:1,buildable:!0},{key:"camp",hp:400,size:4,sight:8,cost:{},time:0,era:0},{key:"forge",hp:350,size:2,sight:6,cost:{wood:100,stone:60},time:40,era:2,buildable:!0,research:["bronze","iron"]},{key:"market",hp:350,size:3,sight:7,cost:{wood:150,stone:40},time:45,era:2,buildable:!0,market:!0,research:["wheel"]},{key:"stable",hp:350,size:3,sight:7,cost:{wood:150},time:45,era:2,buildable:!0,trains:[[],[],["horseman"]]},{key:"workshop",hp:350,size:3,sight:6,cost:{wood:175},time:45,era:2,buildable:!0,trains:[[],[],["ram"]]},{key:"wall",hp:300,size:1,sight:2,cost:{stone:8},time:6,era:2,buildable:!0,wall:!0},{key:"tower",hp:450,size:2,sight:9,cost:{wood:60,stone:120},time:50,era:2,buildable:!0,tower:{atk:6,range:7,cd:20}}],cn=Object.fromEntries(be.map((i,t)=>[i.key,t])),Zl=(i,t)=>i.trains?.[Math.min(t,i.trains.length-1)]??[],ji=[{cost:{food:400,wood:150},time:90},{cost:{food:900,wood:400,stone:200},time:120},{cost:{food:1400,wood:700,stone:500,metal:400},time:150}],ts=[{key:"bronze",cost:{food:120,metal:60},time:40,at:"forge"},{key:"iron",cost:{food:180,metal:120},time:60,at:"forge",needs:"bronze"},{key:"wheel",cost:{wood:120,metal:40},time:40,at:"market"}],on=200,qo=Object.fromEntries(ts.map((i,t)=>[i.key,t])),Bn={give:100,get:60,fair:85},Fd=300,wa=["food","wood","stone","metal"],ls={berry:.4,carcass:.5,farm:.33,wood:.37,stone:.3,metal:.28},Od=10,Bd=["#c0392b","#2e6fd8","#e0a526","#7c3fb0"],ci=6,fe=-1,Ln=60*cu;function Zi(i,t,e){let n=Math.imul(i|0,374761393)+Math.imul(t|0,668265263)+Math.imul(e|0,1442695041)|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}const Ec=i=>i*i*(3-2*i);function Hd(i,t,e){const n=Math.floor(i),s=Math.floor(t),r=i-n,a=t-s,o=Ec(r),l=Ec(a),c=Zi(n,s,e),h=Zi(n+1,s,e),d=Zi(n,s+1,e),u=Zi(n+1,s+1,e);return c+(h-c)*o+(d-c)*l+(c-h-d+u)*o*l}function Cs(i,t,e,n=4){let s=0,r=.5,a=1,o=0;for(let l=0;l<n;l++)s+=r*Hd(i*a,t*a,e+l*31),o+=r,r*=.5,a*=2.03;return s/o}const Is=(i,t,e)=>i<t?t:i>e?e:i,vi=(i,t,e)=>{const n=Is((e-i)/(t-i),0,1);return n*n*(3-2*n)},er=(i,t,e)=>i+(t-i)*e;class uu{constructor(t){R(this,"a");R(this,"b");R(this,"c");R(this,"d");this.a=2654435769,this.b=608135816,this.c=3084996962,this.d=t>>>0;for(let e=0;e<16;e++)this.next()}next(){let t=this.a|0,e=this.b|0,n=this.c|0,s=this.d|0;const r=(t+e|0)+s|0;return s=s+1|0,t=e^e>>>9,e=n+(n<<3)|0,n=n<<21|n>>>11,n=n+r|0,this.a=t,this.b=e,this.c=n,this.d=s,r>>>0}int(t){return this.next()%t}float(){return this.next()/4294967296}save(){return[this.a,this.b,this.c,this.d]}load(t){[this.a,this.b,this.c,this.d]=t}}const dr=0,Ca=1,Fs=2,Ri=3,es=4,du=1,Xo=2,fu=3,tn=1,di=2,Un=3,On=1.4142135623730951,Ra=1.7320508075688772,Dr=(i,t)=>Math.sqrt(i*i+t*t),pu={2:[0,1],3:[.5,Ra/2],4:[On/2,On/2]},Gd={2:[[0,1],[0,-1]],3:[[.5,Ra/2],[-1,0],[.5,-Ra/2]],4:[[On/2,On/2],[-On/2,On/2],[-On/2,-On/2],[On/2,-On/2]]};function Tc(i,t,e){const[n,s]=pu[e];for(let r=0;r<24;r++){if(t<0){t=-t;continue}if(n*t-s*i>1e-9){const o=i*n+t*s;i=2*o*n-i,t=2*o*s-t;continue}break}return[i,t]}function mu(i,t){const e=Is(t,2,4),n=e===2?192:256,s=n/2,r=2,a=n/r+1,o=new Float32Array(a*a),l=n*(e===2?.32:.36),c=13,h=n*.075,[d,u]=pu[e],f=[d*l,u*l],m=[n*.21,n*.4],v=(F,H)=>{const[Y,Q]=Tc(F,H,e),et=Math.sqrt(Y*Y+Q*Q);let N=(Cs(Y*.02+7.3,Q*.02-3.1,i,4)-.28)*10+1.4+(Cs(Y*.08,Q*.08,i+9,2)-.5)*1.2;const tt=Math.max(Math.abs(F),Math.abs(H))/s;N+=vi(.8,.98,tt)*20*(.6+.4*Cs(Y*.04,Q*.04,i+3,2));const ot=Q,ut=2.5+(Cs(Y*.05,.5,i+21,2)-.5)*3*.45;if(et>h*.8){let It=0;for(const Gt of m)It=Math.max(It,1-vi(3,6,Math.abs(et-Gt)));const le=er(-2.2,-.35,It);N=er(N,Math.min(N,1),vi(ut+9,ut+3,ot)*.75),N=er(le,N,vi(ut,ut+6.5,ot))}N=er(-2.6,N,vi(h,h+10,et));const xt=Dr(Y-f[0],Q-f[1]);return N=er(2.2,N,vi(c,c+8,xt)),N};for(let F=0;F<a;F++)for(let H=0;H<a;H++)o[F*a+H]=v(H*r-s,F*r-s);const g=(F,H)=>{const Y=Is(F/r,0,a-1.001),Q=Is(H/r,0,a-1.001),et=Math.floor(Y),N=Math.floor(Q),tt=Y-et,ot=Q-N,it=o[N*a+et],ut=o[N*a+et+1],xt=o[(N+1)*a+et],It=o[(N+1)*a+et+1];return it+(ut-it)*tt+(xt-it)*ot+(it-ut-xt+It)*tt*ot},p=new Uint8Array(n*n),M=new Uint8Array(n*n),x=new Uint16Array(n*n),_=[];for(let F=0;F<n;F++)for(let H=0;H<n;H++){const Y=g(H+.5,F+.5),Q=F*n+H,et=Math.abs(g(H+1,F+.5)-g(H,F+.5))+Math.abs(g(H+.5,F+1)-g(H+.5,F));Y<-.9?p[Q]=Ri:Y<-.05?p[Q]=Fs:Y<.55?p[Q]=Ca:et>2.2?p[Q]=es:p[Q]=dr}const P=Gd[e].map(([F,H])=>({x:Math.round(s+F*l),z:Math.round(s+H*l),ux:F,uz:H})),T=(F,H,Y)=>P.some(Q=>Dr(F-Q.x,H-Q.z)<Y);for(let F=1;F<n-1;F++)for(let H=1;H<n-1;H++){const Y=F*n+H;if(p[Y]!==dr)continue;const[Q,et]=Tc(H+.5-s,F+.5-s,e),N=Dr(Q,et);let tt=Cs(Q*.045+13,et*.045-7,i+5,3);const ot=Dr(Q-d*(l+18),et-u*(l+18));tt+=vi(16,6,ot)*.35,tt+=vi(14,8,et)*-.25,N<h+10&&(tt-=.3);const it=g(H+.5,F+.5);tt>.585&&!T(H,F,15)&&Zi(Math.round(Q*4),Math.round(et*4),i+77)>.12?(M[Y]=it>9?fu:Zi(Math.round(Q*3),Math.round(et*3),i+78)<.14?Xo:du,x[Y]=100):Zi(Math.round(Q*2),Math.round(et*2),i+79)<.012&&!T(H,F,11)&&it<8&&(M[Y]=Xo,x[Y]=100)}if(e===2||e===4){const F=(Y,Q)=>{let et=Math.abs(2*Y-(n-1)),N=Math.abs(2*Q-(n-1));if(e===4&&N>et){const tt=et;et=N,N=tt}return(N+n-1)/2*n+(et+n-1)/2};for(let Y=0;Y<n;Y++)for(let Q=0;Q<n;Q++){const et=Y*n+Q,N=F(Q,Y);N!==et&&(p[et]=p[N],M[et]=M[N],x[et]=x[N])}const H=(a-1)/2;for(let Y=0;Y<a;Y++)for(let Q=0;Q<a;Q++){let et=Math.abs(Q-H),N=Math.abs(Y-H);if(e===4&&N>et){const tt=et;et=N,N=tt}o[Y*a+Q]=o[(N+H)*a+et+H]}}const E=(F,H,Y)=>{if(e===2)return F===0?[H,Y]:[n-1-H,n-1-Y];if(e===4){let ot=H,it=Y;for(let ut=0;ut<F;ut++){const xt=ot;ot=n-1-it,it=xt}return[ot,it]}let Q=H+.5-s,et=Y+.5-s;const N=-.5,tt=Ra/2;for(let ot=0;ot<F;ot++){const it=Q*N-et*tt;et=Q*tt+et*N,Q=it}return[Math.floor(Q+s),Math.floor(et+s)]},w=[[0,0],[1,0],[0,1],[1,1],[-1,0],[0,-1],[-1,1],[2,0]],b=new uu(i^24301),y=(F,H,Y,Q)=>{if(H<1||Y<1||H>=n-1||Y>=n-1)return;const et=Y*n+H;p[et]===Ri||p[et]===Fs||_.some(N=>N.x===H&&N.z===Y)||(M[et]=0,x[et]=0,p[et]===es&&(p[et]=dr),_.push({kind:F,x:H,z:Y,amount:Q}))},S=P[0];-S.uz,S.ux;const L=(F,H,Y,Q,et,N,tt)=>{const ot=[];for(let it=0;it<tt;it++){const[ut,xt]=w[it%w.length];ot.push([Math.round(F+Y*(et+ut)+-Q*(N+xt)-.5),Math.round(H+Q*(et+ut)+Y*(N+xt)-.5)])}return ot},D=[{kind:tn,amount:125,tiles:L(S.x,S.z,S.ux,S.uz,-5,6,6)},{kind:di,amount:350,tiles:L(S.x,S.z,S.ux,S.uz,-9,-8,5)},{kind:Un,amount:400,tiles:L(S.x,S.z,S.ux,S.uz,-15,14,5)},{kind:Un,amount:800,tiles:L(s,s,S.ux,S.uz,h+12,0,6)},{kind:di,amount:500,tiles:L(s,s,S.ux,S.uz,h+22,6,4)}];for(let F=0;F<e;F++)for(const H of D)for(const[Y,Q]of H.tiles){const[et,N]=E(F,Y,Q);y(H.kind,et,N,H.amount)}for(const F of P)for(let H=-8;H<=7;H++)for(let Y=-8;Y<=7;Y++){if((Y+.5)**2+(H+.5)**2>=50)continue;const Q=(F.z+H)*n+F.x+Y;M[Q]=0,x[Q]=0}b.next();const U=(F,H)=>F>1&&H>1&&F<n-2&&H<n-2&&(p[H*n+F]===dr||p[H*n+F]===Ca)&&!M[H*n+F]&&!_.some(Y=>Y.x===F&&Y.z===H),B=(F,H)=>{for(let Y=0;Y<8;Y++)for(let Q=-Y;Q<=Y;Q++)for(let et=-Y;et<=Y;et++)if(Math.max(Math.abs(et),Math.abs(Q))===Y&&U(F+et,H+Q))return[F+et,H+Q];return[F,H]},V=[{kind:"deer",base:"s",u:-15,v:13,n:5,r:5},{kind:"boar",base:"s",u:3,v:-16,n:1,r:3},{kind:"wolf",base:"s",u:28,v:-22,n:2,r:5},{kind:"aurochs",base:"c",u:h+30,v:12,n:3,r:6}],j=[],z=[];for(let F=0;F<e;F++){for(const ot of V){const it=ot.base==="s"?S.x:s,ut=ot.base==="s"?S.z:s,[xt,It]=L(it,ut,S.ux,S.uz,ot.u,ot.v,1)[0],[le,Gt]=E(F,xt,It),se=[];for(let W=0;W<ot.n;W++){const[en,$t]=w[W%w.length],[Yt,Lt]=E(F,xt+en,It+$t);se.push(B(Yt,Lt))}j.push({kind:ot.kind,x:le+.5,z:Gt+.5,r:ot.r,spots:se})}const[H,Y]=L(s,s,S.ux,S.uz,h+36,0,1)[0],[Q,et]=E(F,H,Y),[N,tt]=B(Q,et);for(let ot=-4;ot<=4;ot++)for(let it=-4;it<=4;it++){const ut=(tt+ot)*n+N+it;ut>=0&&ut<n*n&&(M[ut]=0,x[ut]=0)}z.push({x:N,z:tt,player:F})}return{size:n,seed:i,players:e,hn:a,hstep:r,heights:o,terrain:p,tree:M,wood:x,res:_,starts:P,herds:j,camps:z}}function Xt(i,t,e){const n=Is(t/i.hstep,0,i.hn-1.001),s=Is(e/i.hstep,0,i.hn-1.001),r=Math.floor(n),a=Math.floor(s),o=n-r,l=s-a,c=i.hn,h=i.heights,d=h[a*c+r],u=h[a*c+r+1],f=h[(a+1)*c+r],m=h[(a+1)*c+r+1];return o+l<=1?d+(u-d)*o+(f-d)*l:m+(f-m)*(1-o)+(u-m)*(1-l)}const Vd=["food","wood","stone","metal"],Pa=i=>i.season===3,pn=(i,t,e,n,s)=>{t>=0&&t<i.players.length&&i.events.push({t:"msg",player:t,key:e,x:n,z:s})};function Wd(i){uf(i);for(let t=0;t<i.top;t++){if(!i.alive[t])continue;const e=i.kind[t];e>=jt?lf(i,t):e<Qt&&(i.owner[t]===fe?af(i,t):qd(i,t))}sf(i),ff(i),i.tick%50===25&&pf(i)}function qd(i,t){switch(i.cd[t]>0&&i.cd[t]--,i.task[t]){case ze:jd(i,t);break;case qn:Qd(i,t);break;case Ge:xu(i,t);break;case ss:$d(i,t);break;default:Xd(i,t)}}function gu(i,t,e,n=!1){const s=i.owner[t];let r=-1,a=1/0;const o=yt[i.kind[t]].siege;if(o&&(n=!0),o||i.near(i.x[t],i.z[t],e,l=>{if(l===t||!i.isUnit(l)||i.ignoreT[t]===l&&i.tick<i.ignoreUntil[t])return;const c=i.owner[l];let h=i.hostile(s,c);if(c===fe&&(h=yt[i.kind[l]].animal?.mode==="predator"||i.aggro[l]>0&&i.owner[i.aggro[l]-1]===s),!h)return;const d=i.x[l]-i.x[t],u=i.z[l]-i.z[t],f=d*d+u*u;f<a&&(a=f,r=l)}),r<0&&n){const l=(e*wt)**2;for(let c=0;c<i.top;c++)if(i.isBuilding(c)&&i.hostile(s,i.owner[c])&&!(i.ignoreT[t]===c&&i.tick<i.ignoreUntil[t])){const h=i.x[c]-i.x[t],d=i.z[c]-i.z[t],u=h*h+d*d;u<l&&u<a&&(a=u,r=c)}}return r}function Xd(i,t){if(i.kind[t]===ie.villager||(i.tick+t)%5)return;const e=gu(i,t,yt[i.kind[t]].siege?3:yt[i.kind[t]].sight);e>=0&&(i.task[t]=Ge,i.tgt[t]=e,i.phase[t]=8,i.rallyX[t]=i.x[t],i.rallyZ[t]=i.z[t],i.fails[t]=0)}function $d(i,t){if((i.tick+t)%5===0){const e=gu(i,t,yt[i.kind[t]].sight,!0);if(e>=0){i.task[t]=Ge,i.tgt[t]=e,i.phase[t]=9;return}}if(i.state[t]===Te){const e=i.amx[t]-i.x[t],n=i.amz[t]-i.z[t];e*e+n*n>(3*wt)**2&&i.fails[t]++<6?i.goPoint(t,i.amx[t],i.amz[t]):i.task[t]=Re}}function Yd(i,t){return(i.map.tree[t]>0||i.resKind[t]!==0)&&i.resAmt[t]>0}function $o(i,t){const e=i.tgt[t];return e<0?!1:i.tgtTile[t]?Yd(i,e):i.alive[e]?i.kind[e]===Qt?i.work[e]>0:i.isBuilding(e)&&i.done[e]===1&&i.bdef(e).key==="farm"&&i.owner[e]===i.owner[t]:!1}function Yo(i,t,e=-1){let n=i.tgt[t];const s=i.size;if(n<-1&&(n=-1-n),!i.tgtTile[t]&&e<0&&n>=0&&(e=n),i.tgtTile[t]&&n>=0&&n<s*s){const r=i.map.tree[n]>0||i.carryRes[t]===_r,a=i.resKind[n],o=n%s,l=(n-o)/s;for(const[c,h]of Os){if(c*c+h*h>100)break;const d=o+c,u=l+h;if(d<0||u<0||d>=s||u>=s)continue;const f=u*s+d;if(!(f===e||!i.open(f))&&(r?i.map.tree[f]&&i.resAmt[f]>0:a&&i.resKind[f]===a&&(i.resAmt[f]>0||a===tn&&!Pa(i)))){if(a===tn&&i.resAmt[f]<=0)continue;return i.tgt[t]=f,i.tgtTile[t]=1,i.phase[t]=Xn,i.fails[t]=0,i.goNear(t,f,!0),!0}}}else if(n>=0&&i.kind[n]===Qt||i.carryRes[t]===xr){let r=-1,a=(10*wt)**2;for(let o=0;o<i.top;o++)if(o!==e&&i.alive[o]&&i.kind[o]===Qt&&i.work[o]>0){const l=i.x[o]-i.x[t],c=i.z[o]-i.z[t],h=l*l+c*c;h<a&&(a=h,r=o)}if(r>=0)return i.tgt[t]=r,i.tgtTile[t]=0,i.phase[t]=Xn,i.goNear(t,r,!1),!0}return!1}function vu(i,t){const e=i.owner[t];let n=-1,s=1/0;for(let r=0;r<i.top;r++)if(i.isBuilding(r)&&i.owner[r]===e&&i.done[r]&&i.bdef(r).drop){const a=i.x[r]-i.x[t],o=i.z[r]-i.z[t],l=a*a+o*o;l<s&&(s=l,n=r)}return n}function Qa(i,t){const e=vu(i,t);if(i.dropB[t]=e,e<0){i.task[t]=Re;return}i.phase[t]=Ha,i.fails[t]=0,i.goNear(t,e,!1)}function Kd(i,t,e){const n=i.tgt[t];let s;e?s=ls.farm:i.tgtTile[t]?i.map.tree[n]?s=ls.wood:s=i.resKind[n]===tn?ls.berry:i.resKind[n]===di?ls.stone:ls.metal:s=ls.carcass;let r=Math.round(s*1e3);return i.players[i.owner[t]]?.hunger&&(r=Math.floor(r*7/10)),i.players[i.owner[t]]?.ai&&(r=Math.floor(r*[80,100,115][i.difficulty]/100)),r}function jd(i,t){if(i.phase[t]===Ha){Jd(i,t);return}if(!$o(i,t)){i.carry[t]>0?Qa(i,t):Yo(i,t)||(i.task[t]=Re);return}const e=i.tgt[t],n=i.tgtTile[t]===1,s=!n&&i.kind[e]>=jt,r=i.reach(t,e,n);if(i.phase[t]===Xn){if(r<=(s?60:n?330:220))i.phase[t]=bu,i.state[t]=Te,i.path[t]=null,i.field[t]=null;else if(i.state[t]===Te&&(i.tick+t)%3===0){if(i.overBudget)return;if(!i.goNear(t,e,n)||i.lastPartial||++i.fails[t]>4){if(i.overBudget)return;i.fails[t]=0,i.tgt[t]=-1-e,Yo(i,t,e)||(i.task[t]=Re)}}return}if(r>(s?140:n?420:300)){i.phase[t]=Xn,i.goNear(t,e,n);return}if(s&&Pa(i))return;if(n&&i.resKind[e]===tn&&Pa(i)){i.carry[t]>0?Qa(i,t):i.task[t]=Re;return}const a=n?i.map.tree[e]?_r:i.resKind[e]===tn?xr:i.resKind[e]===di?Ko:jo:xr;i.carry[t]>0&&i.carryRes[t]!==a&&(i.carry[t]=0),i.carryRes[t]=a,i.frac[t]+=Kd(i,t,s);let o=Math.floor(i.frac[t]/100);i.frac[t]%=100;const l=s?1e9:n?i.resAmt[e]:i.work[e],c=i.carryCap(t);o=Math.min(o,l,c-i.carry[t]),o>0&&(i.carry[t]+=o,s||(n?i.resAmt[e]-=o:i.work[e]-=o,(n?i.resAmt[e]:i.work[e])<=0&&Zd(i,e,n))),(i.carry[t]>=c||!$o(i,t)&&i.carry[t]>0)&&Qa(i,t)}function Zd(i,t,e){if(!e){i.remove(t);return}if(i.map.tree[t]){i.map.tree[t]=0,i.map.wood[t]=0,i.resAmt[t]=0,i.blocked[t]=0,i.events.push({t:"tree",k:t});return}if(i.resKind[t]===tn){i.resAmt[t]=0,i.events.push({t:"res",k:t});return}i.resKind[t]=0,i.resAmt[t]=0,i.blocked[t]=0,i.events.push({t:"res",k:t})}function Jd(i,t){let e=i.dropB[t];if(e<0||!i.isBuilding(e)||!i.done[e]||i.owner[e]!==i.owner[t]){if(e=vu(i,t),i.dropB[t]=e,e<0){i.task[t]=Re;return}i.goNear(t,e,!1)}if(i.reach(t,e,!1)<=200){const n=i.players[i.owner[t]];n&&(n.res[Vd[i.carryRes[t]]]+=i.carry[t]),i.carry[t]=0,i.state[t]=Te,i.path[t]=null,$o(i,t)?(i.phase[t]=Xn,i.fails[t]=0,i.goNear(t,i.tgt[t],i.tgtTile[t]===1)):Yo(i,t)||(i.task[t]=Re);return}i.state[t]===Te&&(++i.fails[t]>5?i.task[t]=Re:i.goNear(t,e,!1))}function Qd(i,t){const e=i.tgt[t];if(!i.isBuilding(e)||i.owner[e]!==i.owner[t]){i.task[t]=Re;return}if(i.done[e]){if(i.bdef(e).key==="farm"&&!ef(i,e,t))i.task[t]=ze,i.phase[t]=Xn,i.goNear(t,e,!1);else if(i.bdef(e).wall){const o=tf(i,t,e);o>=0?(i.tgt[t]=o,i.fails[t]=0,i.goNear(t,o,!1)):i.task[t]=Re}else i.task[t]=Re;return}if(i.reach(t,e,!1)>230){i.state[t]===Te&&(++i.fails[t]>5?i.task[t]=Re:i.goNear(t,e,!1));return}i.state[t]=Te,i.path[t]=null,i.fails[t]=0;const n=(i.tick&16383)+1,s=i.tmr[e]!==n;i.tmr[e]=n,i.work[e]+=s?10:6;const r=i.bdef(e),a=r.time*100;i.hp[e]=Math.max(i.hp[e],Math.floor(r.hp*Math.min(1,i.work[e]/a))),i.work[e]>=a&&(i.done[e]=1,i.hp[e]=r.hp,i.work[e]=0,i.events.push({t:"built",e}),pn(i,i.owner[e],"built."+r.key,i.x[e],i.z[e]))}function tf(i,t,e){let n=-1,s=(10*wt)**2;for(let r=0;r<i.top;r++)if(i.isBuilding(r)&&!i.done[r]&&i.owner[r]===i.owner[t]&&i.bdef(r).wall){const a=i.x[r]-i.x[e],o=i.z[r]-i.z[e],l=a*a+o*o;l<s&&(s=l,n=r)}return n}function ef(i,t,e){for(let n=0;n<i.top;n++)if(n!==e&&i.isUnit(n)&&i.task[n]===ze&&i.tgt[n]===t&&!i.tgtTile[n])return!0;return!1}function xu(i,t){const e=i.tgt[t];if(e<0||!i.alive[e]||e===t||i.kind[e]===Qt||i.isUnit(e)&&i.owner[e]===i.owner[t]){Ac(i,t);return}i.amx[t]=i.x[e],i.amz[t]=i.z[e];const n=yt[i.kind[t]],s=n.hunt&&i.owner[e]===fe,r=Math.round((s?n.hunt:n.range)*wt),a=i.reach(t,e,!1);if(a<=r+40){i.fails[t]=0,i.state[t]===Ze&&(i.state[t]=Te,i.path[t]=null,i.field[t]=null),i.cd[t]===0&&(nf(i,t,e),i.cd[t]=n.cd);return}if(i.phase[t]===8&&i.owner[t]!==fe){const o=i.x[t]-i.rallyX[t],l=i.z[t]-i.rallyZ[t];if(o*o+l*l>(12*wt)**2){i.task[t]=Re,i.phase[t]=0,i.goPoint(t,i.rallyX[t],i.rallyZ[t]);return}}if(i.state[t]===Te&&(i.tick+t)%4===0||(i.tick+t)%15===0){if(i.overBudget)return;if(i.fails[t]>8){i.fails[t]=0,i.ignoreT[t]=e,i.ignoreUntil[t]=i.tick+300,Ac(i,t);return}if(i.owner[t]===fe){const o=i.map.herds[i.herd[t]];if(o){const l=o.x*wt-i.x[t],c=o.z*wt-i.z[t];if(l*l+c*c>(16*wt)**2){i.task[t]=Re,i.aggro[t]=0,i.fast[t]=0,i.goPoint(t,o.x*wt,o.z*wt);return}}}if((n.proj||s)&&a<=r+wt*2&&i.state[t]===Te){i.goPoint(t,i.x[e],i.z[e]),i.fails[t]++;return}!i.goNear(t,e,!1)||i.lastPartial?i.fails[t]+=3:i.fails[t]++}}function Ac(i,t){if(i.kind[t]===ie.villager){let e=-1,n=(3*wt)**2;for(let s=0;s<i.top;s++)if(i.alive[s]&&i.kind[s]===Qt){const r=i.x[s]-i.amx[t],a=i.z[s]-i.amz[t],o=r*r+a*a;o<n&&(n=o,e=s)}if(e>=0){i.task[t]=ze,i.tgt[t]=e,i.tgtTile[t]=0,i.phase[t]=Xn,i.goNear(t,e,!1);return}}if(i.phase[t]===9&&i.owner[t]!==fe){i.task[t]=ss,i.phase[t]=0,i.fails[t]=0,i.goPoint(t,i.rallyX[t]>=0?i.rallyX[t]:i.x[t],i.rallyZ[t]>=0?i.rallyZ[t]:i.z[t]);return}i.task[t]=Re,i.tgt[t]=-1}function nf(i,t,e){const n=yt[i.kind[t]];if(n.siege&&!i.isBuilding(e))return;let s=i.atkOf(t);if(i.isUnit(e)){const a=yt[i.kind[e]];s-=i.armorOf(e);for(const o of n.bonus??[])a.cls===o.vs&&(s+=o.dmg)}s=Math.max(1,s);const r=n.proj??(n.hunt&&i.owner[e]===fe?"spear":void 0);if(r){const a=i.x[e]-i.x[t],o=i.z[e]-i.z[t],l=Yi(a*a+o*o),c=Math.max(3,Math.round(l/wt));i.projectiles.push({target:e,dmg:s,at:i.tick+c,by:t,k:i.kind[e],o:i.owner[e]}),i.events.push({t:"proj",x0:i.x[t],z0:i.z[t],x1:i.x[e],z1:i.z[e],ticks:c,kind:r,tk:i.kind[e],gap:i.reach(t,e,!1),te:e})}else _u(i,e,s,t)}function sf(i){if(!i.projectiles.length)return;const t=[];for(const e of i.projectiles){if(e.at>i.tick){t.push(e);continue}i.alive[e.target]&&i.kind[e.target]===e.k&&i.owner[e.target]===e.o&&_u(i,e.target,e.dmg,e.by)}i.projectiles=t}function _u(i,t,e,n){i.hp[t]-=e;const s=i.owner[t];if(s===fe)i.alive[n]&&(i.aggro[t]=n+1);else if(i.isUnit(t)&&i.alive[n]){const a=i.kind[t]===ie.villager;!yt[i.kind[t]].siege&&(!a&&(i.task[t]===Re||i.task[t]===ss)||a&&i.owner[n]===fe&&i.task[t]!==Ge)&&(i.task[t]=Ge,i.tgt[t]=n,i.phase[t]=0)}const r=i.players[s];r&&i.tick-r.lastAlert>300&&i.owner[n]!==s&&(r.lastAlert=i.tick,pn(i,s,"underAttack",i.x[t],i.z[t])),i.hp[t]<=0&&rf(i,t,n)}function rf(i,t,e){if(i.events.push({t:"death",x:i.x[t],z:i.z[t],kind:i.kind[t],owner:i.owner[t]}),i.isUnit(t)){const n=yt[i.kind[t]].animal;n&&n.food>0&&i.spawnCarcass(i.kind[t],i.x[t],i.z[t],n.food)}else if(i.isBuilding(t)){const n=i.bdef(t).key,s=i.owner[e];n==="camp"&&s>=0&&s<i.players.length&&(i.players[s].res.food+=2e4,i.players[s].res.wood+=15e3,pn(i,s,"campLoot",i.x[t],i.z[t])),n==="center"&&pn(i,i.owner[t],"centerLost")}i.remove(t)}function af(i,t){i.cd[t]>0&&i.cd[t]--;const e=yt[i.kind[t]],n=e.animal,s=i.map.herds[i.herd[t]];if(i.task[t]===Ge){xu(i,t);return}if(n.mode==="flee"){if(i.fast[t]){(--i.tmr[t]<=0||i.state[t]===Te)&&(i.fast[t]=0,i.tmr[t]=20);return}if((i.tick+t)%3===0){let r=-1;if(i.aggro[t]>0&&i.alive[i.aggro[t]-1]&&(r=i.aggro[t]-1),r>=0){let a=i.x[t]-i.x[r],o=i.z[t]-i.z[r];const l=Yi(a*a+o*o)||1;a=Math.trunc(a*4*wt/l),o=Math.trunc(o*4*wt/l),i.fast[t]=1,i.tmr[t]=18,i.aggro[t]=0,i.goPoint(t,i.x[t]+a,i.z[t]+o);return}}}else if(n.mode==="fight"){if(i.aggro[t]>0){const r=i.aggro[t]-1;if(i.aggro[t]=0,i.alive[r]&&i.isUnit(r)){i.task[t]=Ge,i.tgt[t]=r,i.fast[t]=1;return}}}else if((i.tick+t)%10===0){const r=of(i,t,e.sight+(i.season===3?3:0));if(r>=0){i.task[t]=Ge,i.tgt[t]=r,i.fast[t]=1;return}}if(i.fast[t]=0,i.state[t]===Te&&s){if(i.tmr[t]>0){i.tmr[t]--;return}const r=Math.max(1,s.r)*wt,a=i.rng.int(2*r+1)-r,o=i.rng.int(2*r+1)-r;i.goPoint(t,Math.round(s.x*wt)+a,Math.round(s.z*wt)+o),i.tmr[t]=50+i.rng.int(90)}}function of(i,t,e){let n=-1,s=1/0;return i.near(i.x[t],i.z[t],e,r=>{if(!i.isUnit(r)||i.owner[r]===fe)return;const a=i.x[r]-i.x[t],o=i.z[r]-i.z[t],l=a*a+o*o;l<s&&(s=l,n=r)}),n}function lf(i,t){if(!i.done[t])return;const e=i.owner[t],n=i.players[e];if(!n)return;const s=i.bdef(t),r=s.key;i.queue[t].length&&hf(i,t,n),s.tower&&cf(i,t,s.tower),r==="pen"&&!Pa(i)&&i.tick%10===0&&(n.res.food+=20),r==="sanctuary"&&i.tick%20===0&&i.near(i.x[t],i.z[t],6,a=>{i.isUnit(a)&&i.owner[a]===e&&i.hp[a]<yt[i.kind[a]].hp&&i.hp[a]++})}function cf(i,t,e){if(i.cd[t]>0){i.cd[t]--;return}if((i.tick+t)%3)return;const n=i.owner[t];let s=-1,r=1/0;if(i.near(i.x[t],i.z[t],e.range+1,h=>{if(!i.isUnit(h)||!i.hostile(n,i.owner[h]))return;const d=i.reach(t,h,!1);d<=e.range*wt&&d<r&&(r=d,s=h)}),s<0)return;const a=Math.max(1,e.atk-i.armorOf(s)),o=i.x[s]-i.x[t],l=i.z[s]-i.z[t],c=Math.max(3,Math.round(Yi(o*o+l*l)/wt));i.projectiles.push({target:s,dmg:a,at:i.tick+c,by:t,k:i.kind[s],o:i.owner[s]}),i.events.push({t:"proj",x0:i.x[t],z0:i.z[t],x1:i.x[s],z1:i.z[s],ticks:c,kind:"arrow",tk:i.kind[s],gap:i.reach(t,s,!1),te:s,h:3.2}),i.cd[t]=e.cd}function hf(i,t,e){if(e.hunger)return;const n=i.queue[t][0];if(n>=on){const x=ts[n-on];if(++i.work[t]<x.time*10)return;i.work[t]=0,i.queue[t].shift(),e.tech|=1<<n-on,pn(i,e.id,"tech."+x.key,i.x[t],i.z[t]);return}const s=yt[n];if(i.work[t]===0&&i.pop(e.id)+s.pop>i.popCap(e.id)){i.tick%300===0&&pn(i,e.id,i.popCap(e.id)>=vr[e.era]?"popEra":"popHouses");return}if(i.work[t]++,i.work[t]<s.time*10)return;i.work[t]=0;const r=i.queue[t].shift(),[a,o,l]=i.footprint(t),c=i.size/2,h=i.rallyX[t]>=0?i.rallyX[t]>>8:c,d=i.rallyZ[t]>=0?i.rallyZ[t]>>8:c,u=a+l/2,f=o+l/2,m=h-u,v=d-f,g=Math.sqrt(m*m+v*v)||1,p=i.nearestFree(Math.round(u+m/g*(l/2+1)),Math.round(f+v/g*(l/2+1)));if(p<0)return;const M=i.spawnUnit(e.id,yt[r].key,p%i.size+.5,Math.floor(p/i.size)+.5);i.events.push({t:"trained",e:M}),i.rallyX[t]>=0&&i.goPoint(M,i.rallyX[t],i.rallyZ[t])}function uf(i){if(i.tick===0||i.tick%Ln!==0)return;const t=i.month;if(t%3===0)for(const e of i.players)!e.defeated&&e.era>=2&&df(i,e.id)&&pn(i,e.id,"fair");if(t===8)for(const e of i.players)pn(i,e.id,"winterSoon");if(t>=9){for(const e of i.players){if(e.defeated)continue;const n=i.pop(e.id)*(e.era<=1?1:e.era<=3?2:3)*100;e.res.food>=n?(e.res.food-=n,e.hunger&&(e.hunger=!1)):(e.res.food=0,e.hunger||pn(i,e.id,"hunger"),e.hunger=!0)}if(t===9)for(const e of i.players)pn(i,e.id,"winter")}if(t===0){for(const n of i.players)n.hunger=!1,pn(i,n.id,"spring");for(let n=0;n<i.resKind.length;n++)if(i.resKind[n]===tn&&i.resAmt[n]<12500){const s=i.resAmt[n];i.resAmt[n]=12500,s<=0&&i.events.push({t:"res",k:n})}const e=new Map;for(let n=0;n<i.top;n++)if(i.isAnimal(n)&&i.herd[n]>=0){const s=e.get(i.herd[n])??[];s.push(n),e.set(i.herd[n],s)}for(const[n,s]of e){if(s.length<2)continue;const r=i.map.herds[n],a=Math.min(Math.floor(s.length/2),8-s.length);for(let o=0;o<a;o++){const l=i.nearestFree(Math.floor(r.x)+o%3-1,Math.floor(r.z)+Math.floor(o/3));if(l<0)continue;const c=i.spawnUnit(fe,r.kind,l%i.size+.5,Math.floor(l/i.size)+.5);i.herd[c]=n}}}}function df(i,t){for(let e=0;e<i.top;e++)if(i.isBuilding(e)&&i.owner[e]===t&&i.done[e]&&i.bdef(e).market)return!0;return!1}function ff(i){for(const t of i.players)if(t.aging){if(!i.isBuilding(t.agingB)||i.owner[t.agingB]!==t.id){t.aging=0;continue}if(!(--t.aging>0)){t.era++;for(let e=0;e<i.top;e++)if(i.isUnit(e)&&i.owner[e]===t.id){const n=yt[i.kind[e]].next;if(!n)continue;const s=yt[i.kind[e]],r=yt[ie[n]];i.hp[e]=Math.round(i.hp[e]*r.hp/s.hp),i.kind[e]=ie[n]}for(let e=0;e<i.top;e++)i.isBuilding(e)&&i.owner[e]===t.id&&(i.queue[e]=i.queue[e].map(n=>n<on&&yt[n].next?ie[yt[n].next]:n));i.events.push({t:"age",player:t.id,era:t.era}),t.era===2&&pn(i,t.id,"metalSeen")}}}function pf(i){if(i.outcome!=="playing")return;for(const e of i.players){if(e.defeated)continue;let n=!1;for(let s=0;s<i.top&&!n;s++)i.alive[s]&&i.owner[s]===e.id&&(i.isBuilding(s)&&i.done[s]||i.kind[s]===ie.villager)&&(n=!0);if(!n){e.defeated=!0;for(const s of i.players)pn(i,s.id,"defeated."+e.id);for(let s=0;s<i.top;s++)i.isUnit(s)&&i.owner[s]===e.id&&i.remove(s)}}const t=i.players.filter(e=>!e.ai);t.length&&t.every(e=>e.defeated)?(i.outcome="defeat",i.events.push({t:"end",result:"defeat"})):i.players.filter(e=>e.ai).every(e=>e.defeated)&&i.players.some(e=>e.ai)&&(i.outcome="victory",i.events.push({t:"end",result:"victory"}))}const to=[13,24,30],mf=[3,9,14],wc=[42,36,30],gf=[24,16,11],vf=[10,7,5],xf=[6,12,99];function _f(i){for(const t of i.players){if(!t.ai||t.defeated)continue;const e=i.ai[t.id];i.tick<e.next||(e.next=i.tick+10,Mf(i,t.id,e))}Tf(i)}function Mf(i,t,e){const n=i.players[t],s=Math.min(n.era,2),r=[],a=[],o=[];for(let E=0;E<i.top;E++)!i.alive[E]||i.owner[E]!==t||(i.isBuilding(E)?o.push(E):i.isUnit(E)&&(i.kind[E]===ie.villager?r:a).push(E));const l=o.find(E=>i.bdef(E).key==="center"&&i.done[E]);if(l===void 0)return;const c=(E,w=!1)=>o.filter(b=>i.bdef(b).key===E&&(!w||i.done[b])),h=r.length+a.length,d=i.popCap(t),u=o.filter(E=>!i.done[E]),f=i.tick/Ln,m=new Set,v=(E,w,b)=>{const y=Sf(i,t,E,l,r.filter(S=>!m.has(S)),w,b);return y>=0&&m.add(y),y>=0},g=!n.aging&&(n.era===0&&r.length>=to[0]||n.era===1&&r.length>=to[1]-2&&f>=wc[i.difficulty]-6&&i.eraBuildingTypes(t)>=2);if(r.length<to[s]&&!i.queue[l].length&&h<d&&!n.aging&&i.issue({type:"train",player:t,building:l,key:"villager"}),d-h<=3&&d<vr[n.era]&&!u.some(E=>i.bdef(E).key==="house")&&i.tick>=e.houseCd&&v("house",5,14)&&(e.houseCd=i.tick+150),r.length>=6&&!c("depot").length){const E=Ef(i,t,l,r.filter(w=>!m.has(w)));E>=0&&m.add(E)}if(n.era>=2&&c("depot").length<2){const E=yu(i,t,l,r.filter(w=>!m.has(w)),w=>i.resKind[w]===Un);E>=0&&m.add(E)}const p=c("military");r.length>=9&&!p.length&&v("military",7,16);const M=p.filter(E=>i.done[E]),x=mf[s]+(n.era?Math.floor(f/8):0),_={};n.era>=2&&(_.stone=(c("forge").length?0:60)+(c("market").length?0:40)+(c("tower").length?0:120),_.metal=(!i.hasTech(t,"bronze")&&c("forge",!0).length?60:0)+(c("stable",!0).length?35:0));const P=(E,w)=>Ki.every(b=>n.res[b]>=((E[b]??0)+(w[b]??0))*100);if(M.length&&!g&&a.length<x&&!i.queue[M[0]].length&&h<d){const E=Zl(be[cn.military],n.era).filter(w=>w!=="dog"&&P(yt[ie[w]].cost,_));E.length&&i.issue({type:"train",player:t,building:M[0],key:E[i.rng.int(E.length)]})}if(n.era>=2&&!g){const E=c("stable",!0)[0],w=c("workshop",!0)[0];E!==void 0&&a.length<x&&!i.queue[E].length&&h+2<=d&&P(yt[ie.horseman].cost,{stone:_.stone,metal:!i.hasTech(t,"bronze")&&c("forge",!0).length?60:0})&&i.issue({type:"train",player:t,building:E,key:"horseman"});const b=a.filter(L=>yt[i.kind[L]].siege).length;w!==void 0&&b<2&&!i.queue[w].length&&h+3<=d&&i.issue({type:"train",player:t,building:w,key:"ram"});const y=c("forge",!0)[0],S=c("market",!0)[0];if(y!==void 0&&!i.queue[y].length&&(i.hasTech(t,"bronze")?!i.hasTech(t,"iron")&&n.res.metal>3e4&&i.issue({type:"research",player:t,building:y,key:"iron"}):i.issue({type:"research",player:t,building:y,key:"bronze"})),S!==void 0&&!i.queue[S].length&&!i.hasTech(t,"wheel")&&n.res.metal>15e3&&i.issue({type:"research",player:t,building:S,key:"wheel"}),S!==void 0&&(i.tick+t)%30===0&&n.res.wood>(i.fair?5e4:9e4)){const L=n.res.stone<2e4?"stone":n.res.metal<25e3?"metal":n.res.food<3e4?"food":null;L&&i.issue({type:"trade",player:t,building:S,give:"wood",get:L})}}n.era===0&&!n.aging&&r.length>=10&&i.eraBuildingTypes(t)>=2&&i.canAfford(t,ji[0].cost)&&i.issue({type:"ageup",player:t,building:l}),n.era===1&&!n.aging&&r.length>=18&&f>=wc[i.difficulty]&&i.eraBuildingTypes(t)>=2&&i.canAfford(t,ji[1].cost)&&i.issue({type:"ageup",player:t,building:l}),n.era>=1&&!u.length&&(c("farm").length<Math.min(n.era>=2?8:6,Math.floor(r.length/4))?v("farm",6,15):c("pen").length?!c("sanctuary").length&&f>30?v("sanctuary",6,14):n.era>=2&&(c("stable").length?c("forge").length?!c("market").length&&(f>50||n.res.wood>6e4)?v("market",7,16):c("tower").length?!c("workshop").length&&f>58&&v("workshop",7,16):v("tower",5,10):v("forge",6,14):v("stable",7,16)):v("pen",7,16));const T=r.filter(E=>i.task[E]===Re&&i.state[E]===Te&&!m.has(E));if(T.length){const E=[0,0,0,0];for(const b of r)if(i.task[b]===ze){const y=i.tgt[b],S=i.tgtTile[b]?i.map.tree[y]?_r:i.resKind[y]===di?Ko:i.resKind[y]===Un?jo:xr:xr;E[S===jo?3:S===Ko?2:S===_r?1:0]++}const w=n.era===0?g?[.8,.15,.05,0]:[.62,.3,.08,0]:n.era===1?g?[.55,.25,.2,0]:[.5,.35,.15,0]:[.42,.25,.13,.2];n.res.wood>4e4&&(w[0]+=w[1]-.1,w[1]=.1),n.res.stone>25e3&&(w[0]+=w[2],w[2]=0),n.res.metal>4e4&&(w[0]+=w[3],w[3]=0);for(const b of T){const y=E[0]+E[1]+E[2]+E[3]+1;let S=0,L=-1;for(let D=0;D<4;D++){const U=w[D]-E[D]/y;U>L&&(L=U,S=D)}eo(i,t,b,S,l)?E[S]++:eo(i,t,b,1,l)&&E[1]++}}if(n.res.wood>4e4&&(i.tick+t*7)%200===0){const E=r.find(w=>i.task[w]===ze&&i.tgtTile[w]&&i.map.tree[i.tgt[w]]>0&&!m.has(w));E!==void 0&&i.carry[E]===0&&eo(i,t,E,0,l)}if((i.tick+t)%30===0){const E=yf(i,t,l,18);if(E>=0){const w=a.filter(b=>i.task[b]!==ss||!0);w.length&&i.issue({type:"attack",player:t,ids:w,target:E})}}if(e.attackAt||(e.attackAt=gf[i.difficulty]*Ln),i.tick>=e.attackAt&&a.length>=5){const E=bf(i,t,l);E>=0&&i.issue({type:"amove",player:t,ids:a.slice(0,xf[i.difficulty]),x:i.x[E],z:i.z[E]}),e.attackAt=i.tick+vf[i.difficulty]*Ln}}function yf(i,t,e,n){let s=-1,r=(n*wt)**2;return i.near(i.x[e],i.z[e],n,a=>{if(!i.isUnit(a))return;const o=i.owner[a];if(o===t||o<0)return;const l=i.x[a]-i.x[e],c=i.z[a]-i.z[e],h=l*l+c*c;h<r&&(r=h,s=a)}),s}function bf(i,t,e){let n=-1,s=1/0;for(let r=0;r<i.top;r++)if(i.isBuilding(r)&&i.bdef(r).key==="center"&&i.owner[r]!==t&&i.owner[r]>=0&&i.owner[r]<i.players.length){const a=!i.players[i.owner[r]].ai,o=i.x[r]-i.x[e],l=i.z[r]-i.z[e],c=(o*o+l*l)*(a&&i.difficulty===2?.6:1)*(1+.02*((i.owner[r]-t+i.players.length)%i.players.length));c<s&&(s=c,n=r)}return n}function Sf(i,t,e,n,s,r,a){const o=be[cn[e]];if(!i.canAfford(t,o.cost)||!s.length)return-1;const l=i.x[n]>>8,c=i.z[n]>>8;for(const[h,d]of Os){const u=h*h+d*d;if(u<r*r)continue;if(u>a*a)break;const f=l+h-(o.size>>1),m=c+d-(o.size>>1);if(!i.canPlace(t,e,f,m)||!Mu(i,f,m,o.size))continue;const v=s.find(g=>i.task[g]!==qn&&(i.carryRes[g]===_r||i.task[g]===Re))??s.find(g=>i.task[g]!==qn)??s[0];return i.issue({type:"build",player:t,ids:[v],key:e,tx:f,tz:m}),v}return-1}function Mu(i,t,e,n){for(let s=e-1;s<=e+n;s++)for(let r=t-1;r<=t+n;r++){const a=s*i.size+r;if(i.bAt[a])return!1}return!0}function Ef(i,t,e,n){return yu(i,t,e,n,s=>i.map.tree[s]>0)}function yu(i,t,e,n,s){const r=be[cn.depot];if(!i.canAfford(t,r.cost)||!n.length)return-1;const a=i.x[e]>>8,o=i.z[e]>>8,l=i.size;let c=Os;if(!Os.some(([h,d])=>{const u=a+h,f=o+d;return u>=0&&f>=0&&u<l&&f<l&&s(f*l+u)})){let h=-1,d=1/0;for(let u=0;u<l*l;u+=2)if(s(u)){const f=u%l,m=(u-f)/l,v=(f-a)**2+(m-o)**2;v<d&&(d=v,h=u)}if(h<0)return-1;c=[[h%l-a,Math.floor(h/l)-o]]}for(const[h,d]of c){const u=a+h,f=o+d;if(!(h*h+d*d<36)&&!(u<2||f<2||u>=l-3||f>=l-3)&&s(f*l+u))for(const[m,v]of[[2,0],[-3,0],[0,2],[0,-3],[2,2],[-3,-3],[2,-3],[-3,2]]){const g=u+m,p=f+v;if(i.canPlace(t,"depot",g,p)&&Mu(i,g,p,2)){const M=n.find(x=>i.task[x]!==qn)??n[0];return i.issue({type:"build",player:t,ids:[M],key:"depot",tx:g,tz:p}),M}}}return-1}function eo(i,t,e,n,s){const r=i.size,a=i.x[s]>>8,o=i.z[s]>>8;if(n===0){for(let M=0;M<i.top;M++)if(i.isBuilding(M)&&i.owner[M]===t&&i.done[M]&&i.bdef(M).key==="farm"){let x=!1;for(let _=0;_<i.top;_++)if(i.isUnit(_)&&i.task[_]===ze&&i.tgt[_]===M&&!i.tgtTile[_]){x=!0;break}if(!x)return i.issue({type:"work",player:t,ids:[e],target:M}),!0}let f=0;for(let M=0;M<i.top;M++)i.isUnit(M)&&i.owner[M]===t&&i.task[M]===ze&&i.tgtTile[M]&&i.resKind[i.tgt[M]]===tn&&f++;if(i.season!==3&&f<5)for(const[M,x]of Os){if(M*M+x*x>196)break;const _=a+M,T=(o+x)*r+_;if(T>=0&&T<r*r&&i.resKind[T]===tn&&i.resAmt[T]>0)return i.issue({type:"gather",player:t,ids:[e],k:T}),!0}let m=-1,v=(25*wt)**2;for(let M=0;M<i.top;M++)if(i.alive[M]&&i.kind[M]===Qt&&i.work[M]>0){let x=0;for(let E=0;E<i.top;E++)i.isUnit(E)&&i.task[E]===ze&&i.tgt[E]===M&&!i.tgtTile[E]&&x++;const _=i.x[M]-i.x[s],P=i.z[M]-i.z[s],T=_*_+P*P;x<4&&T<v&&(v=T,m=M)}if(m>=0)return i.issue({type:"work",player:t,ids:[e],target:m}),!0;let g=-1,p=(28*wt)**2;for(let M=0;M<i.top;M++)if(i.isAnimal(M)&&yt[i.kind[M]].animal.food>0&&yt[i.kind[M]].key!=="aurochs"){const x=i.x[M]-i.x[s],_=i.z[M]-i.z[s],P=x*x+_*_;P<p&&(p=P,g=M)}return g>=0?(i.issue({type:"attack",player:t,ids:[e],target:g}),!0):!1}if(n===3&&i.players[t].era<2)return!1;const l=f=>n===1?i.map.tree[f]>0:n===2?i.resKind[f]===di:i.resKind[f]===Un;let c=a,h=o;if(n===1){for(let f=0;f<i.top;f++)if(i.isBuilding(f)&&i.owner[f]===t&&i.bdef(f).key==="depot"){c=i.x[f]>>8,h=i.z[f]>>8;break}}for(const[f,m]of Os){const v=c+f,g=h+m;if(v<0||g<0||v>=r||g>=r)continue;const p=g*r+v;if(l(p)&&i.open(p))return i.issue({type:"gather",player:t,ids:[e],k:p}),!0}let d=-1,u=1/0;for(let f=0;f<r*r;f+=3)if(l(f)&&i.open(f)){const m=f%r,v=(f-m)/r,g=(m-c)**2+(v-h)**2;g<u&&(u=g,d=f)}return d>=0?(i.issue({type:"gather",player:t,ids:[e],k:d}),!0):!1}function Tf(i){if(i.tick+300===i.barbNext&&!i.barbWarned){i.barbWarned=!0;for(let s=0;s<i.top;s++)if(i.isBuilding(s)&&i.owner[s]===ci){const r=Cc(i,s);r>=0&&i.events.push({t:"msg",player:i.owner[r],key:"raidSoon",x:i.x[s],z:i.z[s]})}}if(i.tick!==i.barbNext)return;i.barbWarned=!1;const t=i.tick/Ln,n=Math.max(...i.players.map(s=>s.era))>=2?Math.min(7,3+Math.floor(t/15)):Math.min(5,2+Math.floor(t/15));for(let s=0;s<i.top;s++){if(!i.isBuilding(s)||i.owner[s]!==ci)continue;const r=Cc(i,s);if(r<0)continue;const a=[];for(let o=0;o<n;o++){const l=i.nearestFree((i.x[s]>>8)+o%3-1,(i.z[s]>>8)+3+Math.floor(o/3));l<0||a.push(i.spawnUnit(ci,"barbarian",l%i.size+.5,Math.floor(l/i.size)+.5))}for(const o of a)i.task[o]=ss,i.amx[o]=i.x[r],i.amz[o]=i.z[r],i.rallyX[o]=i.x[r],i.rallyZ[o]=i.z[r];i.orderMove(a,i.x[r],i.z[r])}i.barbNext=i.tick+(8+i.rng.int(5))*Ln}function Cc(i,t){let e=-1,n=1/0;for(let s=0;s<i.top;s++)if(i.isBuilding(s)&&i.bdef(s).key==="center"&&i.owner[s]>=0&&i.owner[s]<i.players.length&&!i.players[i.owner[s]].defeated){const r=i.x[s]-i.x[t],a=i.z[s]-i.z[t],o=r*r+a*a;o<n&&(n=o,e=s)}return e}const Nt=4096,Te=0,Ze=1,Re=0,ze=1,qn=2,Ge=3,ss=4,Xn=0,bu=1,Ha=2,xr=0,_r=1,Ko=2,jo=3,Ur=[1,-1,0,0,1,1,-1,-1],kr=[0,0,1,-1,1,-1,1,-1],Rc=[10,10,10,10,14,14,14,14],Af=4294967295;class wf{constructor(t,e){R(this,"dist");this.goal=t,this.dist=new Uint32Array(e).fill(Af)}}const Ls=[];for(let i=-14;i<=14;i++)for(let t=-14;t<=14;t++)t*t+i*i<=196&&Ls.push([t,i]);Ls.sort((i,t)=>i[0]*i[0]+i[1]*i[1]-(t[0]*t[0]+t[1]*t[1])||i[1]-t[1]||i[0]-t[0]);const Os=Ls,Pc=new Map;function Cf(i){let t=Pc.get(i);if(t)return t;const e=[];for(let n=-i;n<=i;n++)for(let s=-i;s<=i;s++)s*s+n*n<=i*i+i&&e.push(s,n);return t=new Int16Array(e),Pc.set(i,t),t}class Su{constructor(t,e,n={}){R(this,"map");R(this,"size");R(this,"rng");R(this,"tick",0);R(this,"difficulty",1);R(this,"players",[]);R(this,"alive",new Uint8Array(Nt));R(this,"kind",new Uint8Array(Nt));R(this,"owner",new Int8Array(Nt));R(this,"x",new Int32Array(Nt));R(this,"z",new Int32Array(Nt));R(this,"px",new Int32Array(Nt));R(this,"pz",new Int32Array(Nt));R(this,"hp",new Int16Array(Nt));R(this,"state",new Uint8Array(Nt));R(this,"stuck",new Uint8Array(Nt));R(this,"best",new Int32Array(Nt));R(this,"slotX",new Int32Array(Nt));R(this,"slotZ",new Int32Array(Nt));R(this,"task",new Uint8Array(Nt));R(this,"tgt",new Int32Array(Nt));R(this,"tgtTile",new Uint8Array(Nt));R(this,"phase",new Uint8Array(Nt));R(this,"carry",new Int16Array(Nt));R(this,"carryRes",new Uint8Array(Nt));R(this,"cd",new Uint16Array(Nt));R(this,"work",new Int32Array(Nt));R(this,"done",new Uint8Array(Nt));R(this,"sub",new Uint8Array(Nt));R(this,"aggro",new Int32Array(Nt));R(this,"tmr",new Int16Array(Nt));R(this,"herd",new Int16Array(Nt));R(this,"fast",new Uint8Array(Nt));R(this,"amx",new Int32Array(Nt));R(this,"amz",new Int32Array(Nt));R(this,"fails",new Uint8Array(Nt));R(this,"frac",new Int32Array(Nt));R(this,"rallyX",new Int32Array(Nt));R(this,"rallyZ",new Int32Array(Nt));R(this,"dropB",new Int32Array(Nt));R(this,"ignoreT",new Int32Array(Nt).fill(-1));R(this,"ignoreUntil",new Int32Array(Nt));R(this,"queue",Array.from({length:Nt},()=>[]));R(this,"field",new Array(Nt).fill(null));R(this,"path",new Array(Nt).fill(null));R(this,"pathI",new Uint16Array(Nt));R(this,"top",0);R(this,"blocked");R(this,"bAt");R(this,"resKind");R(this,"resAmt");R(this,"vis",[]);R(this,"explored",[]);R(this,"projectiles",[]);R(this,"events",[]);R(this,"ai",[]);R(this,"barbNext",0);R(this,"barbWarned",!1);R(this,"outcome","playing");R(this,"pending",[]);R(this,"seq",0);R(this,"hashHead");R(this,"hashNext",new Int32Array(Nt));R(this,"hs");R(this,"pushX",new Int32Array(Nt));R(this,"pushZ",new Int32Array(Nt));R(this,"aStamp");R(this,"aG");R(this,"aFrom");R(this,"aClosed");R(this,"aId",0);R(this,"aHeap");R(this,"lastPartial",!1);R(this,"flowCache",new Map);R(this,"nodesTick",0);R(this,"overBudget",!1);this.map=mu(t,e),this.size=this.map.size,this.rng=new uu(t),this.difficulty=n.difficulty??1;const s=this.size*this.size;this.blocked=new Uint8Array(s),this.bAt=new Int16Array(s),this.resKind=new Uint8Array(s),this.resAmt=new Int32Array(s);for(let a=0;a<s;a++){const o=this.map.terrain[a];(o===Ri||o===es||this.map.tree[a])&&(this.blocked[a]=1),this.map.tree[a]&&(this.resAmt[a]=this.map.wood[a]*100)}for(const a of this.map.res){const o=a.z*this.size+a.x;this.resKind[o]=a.kind,this.resAmt[o]=a.amount*100,this.blocked[o]=1}this.hs=this.size>>1,this.hashHead=new Int32Array(this.hs*this.hs),this.aStamp=new Int32Array(s),this.aG=new Int32Array(s),this.aFrom=new Int32Array(s),this.aClosed=new Int32Array(s),this.aHeap=new Float64Array(s*2);const r=n.humans??1;this.map.starts.forEach((a,o)=>{this.players.push({id:o,color:Bd[o],start:{x:a.x,z:a.z},ai:o>=r,era:0,res:{food:2e4,wood:15e3,stone:5e3,metal:0,coins:0},aging:0,agingB:-1,hunger:!1,defeated:!1,lastAlert:-9999,tech:0}),this.vis.push(new Uint8Array(s)),this.explored.push(new Uint8Array(s)),this.spawnBuilding(o,"center",a.x-2,a.z-2,!0);for(let l=0;l<4;l++)this.spawnUnit(o,"villager",a.x-a.ux*4+(l-1.5)*1.1,a.z-a.uz*4+l%2*.8);this.spawnUnit(o,"dog",a.x-a.ux*3-a.uz*3,a.z-a.uz*3+a.ux*3),this.ai.push({next:20+o*3,attackAt:0,phase:0,houseCd:0})}),this.map.herds.forEach((a,o)=>{for(const[l,c]of a.spots){const h=this.spawnUnit(fe,a.kind,l+.5,c+.5);this.herd[h]=o,this.tmr[h]=h*7%60}});for(const a of this.map.camps)this.spawnBuilding(ci,"camp",a.x-2,a.z-2,!0);if(this.barbNext=12*Ln,n.testUnits){const a=this.map.starts[0];let o=0;for(let l=0;l<40&&o<n.testUnits;l++)for(let c=0;c<20&&o<n.testUnits;c++){const h=a.x-a.ux*9+(c-10)*.9,d=a.z-a.uz*9-l*.9*(a.uz>=0?1:-1);this.blockedAt(Math.round(h*wt),Math.round(d*wt))||(this.spawnUnit(0,"warrior",h,d),o++)}}this.updateFog()}open(t){const e=this.size,n=t%e,s=(t-n)/e;for(let r=0;r<8;r++){const a=n+Ur[r],o=s+kr[r];if(a>=0&&o>=0&&a<e&&o<e&&!this.blocked[o*e+a])return!0}return!1}udef(t){return yt[this.kind[t]]}bdef(t){return be[this.kind[t]-jt]}isUnit(t){return this.alive[t]===1&&this.kind[t]<Qt}isBuilding(t){return this.alive[t]===1&&this.kind[t]>=jt}isAnimal(t){return this.isUnit(t)&&this.owner[t]===fe}hostile(t,e){return!(t===e||t===fe||e===fe)}hasTech(t,e){const n=this.players[t];return!!n&&(n.tech&1<<qo[e])!==0}techQueued(t,e){for(let n=0;n<this.top;n++)if(this.isBuilding(n)&&this.owner[n]===t&&this.queue[n].includes(on+e))return!0;return!1}soldier(t){const e=yt[this.kind[t]].cls;return e!=="villager"&&e!=="animal"&&this.owner[t]>=0&&this.owner[t]<this.players.length}atkOf(t){const e=yt[this.kind[t]];if(!this.soldier(t))return e.atk;const n=this.owner[t];return e.atk+(this.hasTech(n,"bronze")?1:0)+(this.hasTech(n,"iron")?1:0)}armorOf(t){return yt[this.kind[t]].armor+(this.soldier(t)&&this.hasTech(this.owner[t],"iron")?1:0)}carryCap(t){return(Od+(this.hasTech(this.owner[t],"wheel")?5:0))*100}get fair(){return this.tick>=3*Ln&&this.tick%(3*Ln)<Fd}alloc(){for(let t=0;t<Nt;t++)if(!this.alive[t])return t>=this.top&&(this.top=t+1),t;throw new Error("entidades esgotadas")}reset(t){this.state[t]=Te,this.task[t]=Re,this.tgt[t]=-1,this.tgtTile[t]=0,this.phase[t]=0,this.carry[t]=0,this.cd[t]=0,this.work[t]=0,this.done[t]=0,this.sub[t]=0,this.aggro[t]=0,this.tmr[t]=0,this.herd[t]=-1,this.fast[t]=0,this.fails[t]=0,this.frac[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[],this.rallyX[t]=-1,this.rallyZ[t]=-1,this.stuck[t]=0,this.dropB[t]=-1,this.ignoreT[t]=-1}spawnUnit(t,e,n,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=ie[e],this.owner[r]=t,this.x[r]=this.px[r]=Math.round(n*wt),this.z[r]=this.pz[r]=Math.round(s*wt),this.hp[r]=yt[ie[e]].hp,r}spawnCarcass(t,e,n,s){const r=this.alloc();return this.reset(r),this.alive[r]=1,this.kind[r]=Qt,this.owner[r]=fe,this.sub[r]=t,this.x[r]=this.px[r]=e,this.z[r]=this.pz[r]=n,this.work[r]=s*100,this.hp[r]=1,r}spawnBuilding(t,e,n,s,r){const a=this.alloc();this.reset(a);const o=be[cn[e]];this.alive[a]=1,this.kind[a]=jt+cn[e],this.owner[a]=t,this.x[a]=this.px[a]=n*wt+o.size*128,this.z[a]=this.pz[a]=s*wt+o.size*128,this.done[a]=r?1:0,this.hp[a]=r?o.hp:Math.max(1,o.hp/10|0);for(let l=0;l<o.size;l++)for(let c=0;c<o.size;c++){const h=(s+l)*this.size+n+c;this.bAt[h]=a+1,o.walk||(this.blocked[h]=1)}return this.events.push({t:"placed",e:a}),a}footprint(t){const e=this.bdef(t).size;return[(this.x[t]>>8)-(e>>1),(this.z[t]>>8)-(e>>1),e]}remove(t){if(this.kind[t]>=jt){const[e,n,s]=this.footprint(t),r=this.bdef(t).walk;for(let a=0;a<s;a++)for(let o=0;o<s;o++){const l=(n+a)*this.size+e+o;this.bAt[l]=0,r||(this.blocked[l]=0)}this.events.push({t:"gone",e:t})}this.alive[t]=0,this.field[t]=null,this.path[t]=null,this.queue[t]=[]}blockedAt(t,e){const n=t>>8,s=e>>8;return n<0||s<0||n>=this.size||s>=this.size?!0:this.blocked[s*this.size+n]===1}canPlace(t,e,n,s){const r=be[cn[e]],a=this.size;if(n<1||s<1||n+r.size>=a-1||s+r.size>=a-1)return!1;for(let o=0;o<r.size;o++)for(let l=0;l<r.size;l++){const c=(s+o)*a+n+l,h=this.map.terrain[c];if(this.blocked[c]||this.bAt[c]||h===Ri||h===Fs||h===es||!this.explored[t][c])return!1}for(let o=0;o<this.top;o++)if(this.isUnit(o)){const l=this.x[o]>>8,c=this.z[o]>>8;if(l>=n&&l<n+r.size&&c>=s&&c<s+r.size&&this.state[o]===Te&&this.owner[o]!==t)return!1}return!0}canAfford(t,e){const n=this.players[t].res;return Ki.every(s=>n[s]>=(e[s]??0)*100)}pay(t,e){const n=this.players[t].res;for(const s of Ki)n[s]-=(e[s]??0)*100}refund(t,e){const n=this.players[t].res;for(const s of Ki)n[s]+=(e[s]??0)*100}pop(t){let e=0;for(let n=0;n<this.top;n++)this.isUnit(n)&&this.owner[n]===t&&(e+=this.udef(n).pop);return e}popCap(t){const e=this.players[t].era;let n=0;for(let s=0;s<this.top;s++)if(this.isBuilding(s)&&this.owner[s]===t&&this.done[s]){const r=this.bdef(s).pop;r&&(n+=r[e])}return Math.min(vr[e],n)}eraBuildingTypes(t){const e=this.players[t].era,n=new Set;for(let s=0;s<this.top;s++)this.isBuilding(s)&&this.owner[s]===t&&this.done[s]&&this.bdef(s).buildable&&this.bdef(s).era===e&&n.add(this.bdef(s).key);return n.size}reach(t,e,n){let s,r,a,o;if(n){const h=e%this.size,d=(e-h)/this.size;s=h*wt,r=d*wt,a=s+wt,o=r+wt}else if(this.kind[e]>=jt){const[h,d,u]=this.footprint(e);s=h*wt,r=d*wt,a=s+u*wt,o=r+u*wt}else{const h=this.x[e]-this.x[t],d=this.z[e]-this.z[t];return Math.max(0,Yi(h*h+d*d)-(this.kind[e]<Qt?Math.round(yt[this.kind[e]].radius*wt):64))}const l=Math.max(s-this.x[t],0,this.x[t]-a),c=Math.max(r-this.z[t],0,this.z[t]-o);return Yi(l*l+c*c)}nearestFree(t,e){for(const[n,s]of Ls){const r=t+n,a=e+s;if(r>=0&&a>=0&&r<this.size&&a<this.size&&!this.blocked[a*this.size+r])return a*this.size+r}return-1}findPath(t,e,n,s,r,a=16e3){const o=this.size,l=this.blocked,c=++this.aId,h=this.aG,d=this.aFrom,u=this.aStamp,f=this.aClosed,m=this.aHeap;this.lastPartial=!1;const v=(D,U)=>{const B=Math.max(e-D,0,D-s),V=Math.max(n-U,0,U-r);return 15*Math.max(B,V)+6*Math.min(B,V)},g=t%o,p=(t-g)/o;if(g>=e&&g<=s&&p>=n&&p<=r)return[];let M=0;const x=D=>{let U=M++;for(m[U]=D;U>0;){const B=U-1>>1;if(m[B]<=m[U])break;const V=m[B];m[B]=m[U],m[U]=V,U=B}},_=()=>{const D=m[0];m[0]=m[--M];let U=0;for(;;){const B=U*2+1,V=B+1;let j=U;if(B<M&&m[B]<m[j]&&(j=B),V<M&&m[V]<m[j]&&(j=V),j===U)break;const z=m[j];m[j]=m[U],m[U]=z,U=j}return D};u[t]=c,h[t]=0,d[t]=-1,x(v(g,p)*65536+t);let P=t,T=v(g,p),E=-1,w=0;if(this.nodesTick>6e4)return this.overBudget=!0,this.lastPartial=!0,null;for(;M>0&&w<a;){const D=_(),U=D%65536;if(f[U]===c)continue;f[U]=c,w++;const B=U%o,V=(U-B)/o,j=v(B,V);if(j===0){E=U;break}j<T&&(T=j,P=U);for(let z=0;z<8;z++){const F=B+Ur[z],H=V+kr[z];if(F<0||H<0||F>=o||H>=o)continue;const Y=H*o+F;if(l[Y]||f[Y]===c||z>=4&&(l[V*o+F]||l[H*o+B]))continue;const Q=h[U]+Rc[z];(u[Y]!==c||Q<h[Y])&&(u[Y]=c,h[Y]=Q,d[Y]=U,x((Q+v(F,H))*65536+Y))}}this.lastPartial=E<0,this.nodesTick+=w;const b=E>=0?E:P;if(b===t)return E>=0?[]:null;const y=[];for(let D=b;D!==t&&D>=0;D=d[D])y.push(D);y.reverse();const S=[];let L=t;for(let D=0;D<y.length;){let U=Math.min(y.length-1,D+12);for(;U>D&&!this.clear(L,y[U]);)U--;S.push(y[U]),L=y[U],D=U+1}return S}clear(t,e){const n=this.size;let s=t%n,r=(t-s)/n;const a=e%n,o=(e-a)/n,l=Math.abs(a-s),c=Math.abs(o-r),h=s<a?1:-1,d=r<o?1:-1;let u=l-c;for(let f=0;f<64;f++){if(this.blocked[r*n+s])return!1;if(s===a&&r===o)return!0;const m=2*u;if(m>-c&&m<l&&(this.blocked[r*n+s+h]||this.blocked[(r+d)*n+s]))return!1;m>-c&&(u-=c,s+=h),m<l&&(u+=l,r+=d)}return!1}goTo(t,e,n,s,r,a,o,l=16e3){const c=(this.z[t]>>8)*this.size+(this.x[t]>>8),h=this.size;let d=!1;for(let g=Math.max(0,n);g<=Math.min(h-1,r)&&!d;g++)for(let p=Math.max(0,e);p<=Math.min(h-1,s);p++)if(!this.blocked[g*h+p]){d=!0;break}if(!d)return this.lastPartial=!0,this.state[t]=Te,!1;const u=this.findPath(c,e,n,s,r,l);if(this.field[t]=null,!u)return this.state[t]=Te,!1;this.path[t]=u,this.pathI[t]=0;const f=u.length?u[u.length-1]:c,m=f%this.size,v=(f-m)/this.size;return this.slotX[t]=a??m*wt+128,this.slotZ[t]=o??v*wt+128,this.state[t]=Ze,this.stuck[t]=0,this.best[t]=2147483647,!0}flowTo(t){const e=this.flowCache.get(t);if(e&&this.tick-e.t<600)return e.f;const n=this.buildFlow(t,[]);if(this.flowCache.set(t,{f:n,t:this.tick}),this.flowCache.size>12){let s=-1,r=1/0;for(const[a,o]of this.flowCache)o.t<r&&(r=o.t,s=a);this.flowCache.delete(s)}return n}goFar(t,e,n){const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,n>>8)));return s<0?!1:(this.field[t]=this.flowTo(s),this.path[t]=null,this.lastPartial=!1,this.slotX[t]=s%this.size*wt+128,this.slotZ[t]=Math.floor(s/this.size)*wt+128,this.state[t]=Ze,this.stuck[t]=0,this.best[t]=2147483647,!0)}far(t,e,n){const s=e-this.x[t],r=n-this.z[t];return s*s+r*r>(22*wt)**2}goNear(t,e,n){if(!n&&this.far(t,this.x[e],this.z[e]))return this.goFar(t,this.x[e],this.z[e]);if(n){const a=e%this.size,o=(e-a)/this.size;return this.goTo(t,a-1,o-1,a+1,o+1,void 0,void 0,6e3)}if(this.kind[e]>=jt){const[a,o,l]=this.footprint(e);if(this.bdef(e).walk){const c=l>>1;return this.goTo(t,a+c,o+c,a+c,o+c,this.x[e],this.z[e],8e3)}return this.goTo(t,a-1,o-1,a+l,o+l,void 0,void 0,8e3)}const s=this.x[e]>>8,r=this.z[e]>>8;return this.goTo(t,s-1,r-1,s+1,r+1,this.x[e],this.z[e],3e3)}goPoint(t,e,n){if(this.far(t,e,n)){this.goFar(t,e,n);return}const s=this.nearestFree(Math.min(this.size-1,Math.max(0,e>>8)),Math.min(this.size-1,Math.max(0,n>>8)));if(s<0)return;const r=s%this.size,a=(s-r)/this.size,o=!this.blocked[(n>>8)*this.size+(e>>8)];this.goTo(t,r,a,r,a,o?e:r*wt+128,o?n:a*wt+128)}issue(t){this.pending.push({...t,..."ids"in t?{ids:t.ids.slice()}:{},at:this.tick+1,seq:this.seq++})}own(t){return t.ids.filter(e=>this.isUnit(e)&&this.owner[e]===t.player)}apply(t){const e=this.players[t.player];if(!(!e||e.defeated))switch(t.type){case"move":case"amove":{const n=this.own(t);for(const s of n)this.task[s]=t.type==="amove"?ss:Re,this.amx[s]=t.x,this.amz[s]=t.z,this.rallyX[s]=t.type==="amove"?t.x:-1,this.rallyZ[s]=t.type==="amove"?t.z:-1,this.tgt[s]=-1,this.aggro[s]=0,this.fails[s]=0;this.orderMove(n,t.x,t.z);break}case"stop":for(const n of this.own(t))this.task[n]=Re,this.state[n]=Te,this.path[n]=null,this.field[n]=null;break;case"gather":{if(t.k<0||t.k>=this.size*this.size||!this.map.tree[t.k]&&!this.resKind[t.k]||this.resKind[t.k]===Un&&e.era<2)return;for(const n of this.own(t))this.kind[n]===ie.villager&&(this.task[n]=ze,this.tgt[n]=t.k,this.tgtTile[n]=1,this.phase[n]=Xn,this.fails[n]=0,this.goNear(n,t.k,!0));break}case"work":case"attack":{const n=t.target;if(!this.alive[n])return;for(const s of this.own(t)){const r=this.kind[s]===ie.villager;if(this.kind[n]>=jt&&this.owner[n]===t.player){if(!r)continue;this.done[n]?this.bdef(n).key==="farm"?(this.task[s]=ze,this.tgt[s]=n,this.tgtTile[s]=0,this.phase[s]=Xn,this.goNear(s,n,!1)):this.bdef(n).drop&&this.carry[s]>0&&(this.task[s]=ze,this.phase[s]=Ha,this.tgt[s]=-1,this.goNear(s,n,!1)):(this.task[s]=qn,this.tgt[s]=n,this.tgtTile[s]=0,this.goNear(s,n,!1));continue}if(this.kind[n]===Qt){r&&(this.task[s]=ze,this.tgt[s]=n,this.tgtTile[s]=0,this.phase[s]=Xn,this.goNear(s,n,!1));continue}yt[this.kind[s]].siege&&this.kind[n]<jt||(this.owner[n]===fe||this.hostile(t.player,this.owner[n]))&&(this.task[s]=Ge,this.tgt[s]=n,this.tgtTile[s]=0,this.goNear(s,n,!1))}break}case"build":{const n=this.own(t).filter(a=>this.kind[a]===ie.villager),s=be[cn[t.key]];if(!n.length||!s?.buildable||s.era>e.era||!this.canAfford(t.player,s.cost)||!this.canPlace(t.player,t.key,t.tx,t.tz))return;this.pay(t.player,s.cost);const r=this.spawnBuilding(t.player,t.key,t.tx,t.tz,!1);for(const a of n)this.task[a]=qn,this.tgt[a]=r,this.tgtTile[a]=0,this.goNear(a,r,!1);break}case"train":{const n=t.building;if(!this.isBuilding(n)||this.owner[n]!==t.player||!this.done[n]||!Zl(this.bdef(n),e.era).includes(t.key)||this.queue[n].length>=5)return;const r=yt[ie[t.key]];if(!this.canAfford(t.player,r.cost))return;this.pay(t.player,r.cost),this.queue[n].push(ie[t.key]);break}case"cancel":{const n=t.building;if(!this.isBuilding(n)||this.owner[n]!==t.player||!this.queue[n].length)return;const s=this.queue[n].pop();this.refund(t.player,s>=on?ts[s-on].cost:yt[s].cost),this.queue[n].length||(this.work[n]=0);break}case"ageup":{const n=t.building,s=ji[e.era];if(!s||e.era>=hu||e.aging||!this.isBuilding(n)||this.owner[n]!==t.player||this.bdef(n).key!=="center"||this.eraBuildingTypes(t.player)<2||!this.canAfford(t.player,s.cost))return;this.pay(t.player,s.cost),e.aging=s.time*10,e.agingB=n;break}case"rally":this.isBuilding(t.building)&&this.owner[t.building]===t.player&&(this.rallyX[t.building]=t.x,this.rallyZ[t.building]=t.z);break;case"research":{const n=t.building,s=qo[t.key],r=ts[s];if(!r||!this.isBuilding(n)||this.owner[n]!==t.player||!this.done[n]||!(this.bdef(n).research??[]).includes(t.key)||e.era<2||this.hasTech(t.player,t.key)||this.techQueued(t.player,s)||r.needs&&!this.hasTech(t.player,r.needs)||this.queue[n].length>=5||!this.canAfford(t.player,r.cost))return;this.pay(t.player,r.cost),this.queue[n].push(on+s);break}case"trade":{const n=t.building;if(!this.isBuilding(n)||this.owner[n]!==t.player||!this.done[n]||!this.bdef(n).market||t.give===t.get||!wa.includes(t.give)||!wa.includes(t.get)||e.res[t.give]<Bn.give*100)return;e.res[t.give]-=Bn.give*100,e.res[t.get]+=(this.fair?Bn.fair:Bn.get)*100;break}case"wall":{const n=this.own(t).filter(a=>this.kind[a]===ie.villager),s=be[cn.wall];if(!n.length||s.era>e.era)return;const r=[];for(const a of t.tiles.slice(0,40)){if(!this.canAfford(t.player,s.cost))break;const o=a%this.size,l=(a-o)/this.size;this.canPlace(t.player,"wall",o,l)&&(this.pay(t.player,s.cost),r.push(this.spawnBuilding(t.player,"wall",o,l,!1)))}if(!r.length)return;for(const a of n){let o=r[0],l=1/0;for(const c of r){const h=this.x[c]-this.x[a],d=this.z[c]-this.z[a],u=h*h+d*d;u<l&&(l=u,o=c)}this.task[a]=qn,this.tgt[a]=o,this.tgtTile[a]=0,this.goNear(a,o,!1)}break}}}orderMove(t,e,n){if(!t.length)return;const s=this.size,r=this.nearestFree(Math.min(s-1,Math.max(0,e>>8)),Math.min(s-1,Math.max(0,n>>8)));if(r<0)return;if(t.length===1){this.goPoint(t[0],e,n);return}const a=this.blocked[(n>>8)*s+(e>>8)],o=a?r%s*wt+128:e,l=a?Math.floor(r/s)*wt+128:n;t.sort((d,u)=>{const f=(this.x[d]-o)**2+(this.z[d]-l)**2,m=(this.x[u]-o)**2+(this.z[u]-l)**2;return f-m||d-u});const c=this.buildFlow(r,t);let h=0;for(const d of t){let u=o,f=l;for(;h<Ls.length;){const[m,v]=Ls[h++],g=o+m*218,p=l+v*218;if(!this.blockedAt(g,p)){u=g,f=p;break}}this.slotX[d]=u,this.slotZ[d]=f,this.state[d]=Ze,this.field[d]=c,this.path[d]=null,this.stuck[d]=0,this.best[d]=2147483647}}buildFlow(t,e){const n=this.size,s=n*n,r=new wf(t,s),a=r.dist,o=this.blocked,l=new Set;for(const m of e)l.add((this.z[m]>>8)*n+(this.x[m]>>8));const c=this.aHeap;let h=0;const d=m=>{let v=h++;for(c[v]=m;v>0;){const g=v-1>>1;if(c[g]<=c[v])break;const p=c[g];c[g]=c[v],c[v]=p,v=g}},u=()=>{const m=c[0];c[0]=c[--h];let v=0;for(;;){const g=v*2+1,p=g+1;let M=v;if(g<h&&c[g]<c[M]&&(M=g),p<h&&c[p]<c[M]&&(M=p),M===v)break;const x=c[M];c[M]=c[v],c[v]=x,v=M}return m};a[t]=0,d(t);let f=e.length?l.size:-1;for(;h>0;){const m=u(),v=m%65536,g=(m-v)/65536;if(g>a[v])continue;if(f>0&&l.has(v)&&(l.delete(v),--f<=0&&g>400))break;const p=v%n,M=(v-p)/n;for(let x=0;x<8;x++){const _=p+Ur[x],P=M+kr[x];if(_<0||P<0||_>=n||P>=n)continue;const T=P*n+_;if(o[T]||x>=4&&(o[M*n+_]||o[P*n+p]))continue;const E=g+Rc[x];E<a[T]&&(a[T]=E,d(E*65536+T))}}return r}step(){if(this.outcome!=="playing"&&this.players.every(t=>!t.ai||t.defeated),this.px.set(this.x),this.pz.set(this.z),this.nodesTick=0,this.overBudget=!1,this.pending.length){const t=this.pending.filter(e=>e.at<=this.tick).sort((e,n)=>e.seq-n.seq);this.pending=this.pending.filter(e=>e.at>this.tick);for(const e of t)this.apply(e)}this.buildHash(),_f(this),Wd(this),this.moveUnits(),this.separate(),this.tick%2===0&&this.updateFog(),this.tick++}speedOf(t){const e=yt[this.kind[t]];return Math.round((this.fast[t]&&e.animal?e.animal.run:e.speed)*wt/10)}moveUnits(){const t=this.size;for(let e=0;e<this.top;e++){if(!this.alive[e]||this.state[e]!==Ze||this.kind[e]>=Qt)continue;const n=this.x[e],s=this.z[e],r=this.speedOf(e);let a=this.slotX[e],o=this.slotZ[e];const l=this.path[e];if(l&&this.pathI[e]<l.length){const _=l[this.pathI[e]],P=_%t*wt+128,T=Math.floor(_/t)*wt+128;Math.abs(P-n)+Math.abs(T-s)<110&&this.pathI[e]<l.length-1&&this.pathI[e]++,(this.pathI[e]<l.length-1||Math.abs(P-n)+Math.abs(T-s)>=110)&&(a=P,o=T),this.pathI[e]===l.length-1&&Math.abs(P-n)+Math.abs(T-s)<110&&(this.path[e]=null,a=this.slotX[e],o=this.slotZ[e])}const c=this.slotX[e]-n,h=this.slotZ[e]-s,d=c*c+h*h;if(!this.path[e]&&d<=r*r){this.x[e]=this.slotX[e],this.z[e]=this.slotZ[e],this.state[e]=Te,this.field[e]=null;continue}const u=this.field[e];if(u&&!this.path[e]&&d>640*640){const _=n>>8,P=s>>8,T=P*t+_;let E=u.dist[T],w=-1,b=-1;for(let y=0;y<8;y++){const S=_+Ur[y],L=P+kr[y];if(S<0||L<0||S>=t||L>=t)continue;const D=L*t+S;this.blocked[D]||y>=4&&(this.blocked[P*t+S]||this.blocked[L*t+_])||u.dist[D]<E&&(E=u.dist[D],w=S,b=L)}w>=0&&(a=w*wt+128,o=b*wt+128)}const f=a-n,m=o-s,v=Yi(f*f+m*m);if(v===0){this.state[e]=Te;continue}const g=Math.min(r,v);let p=n+gi(f*g,v),M=s+gi(m*g,v);this.blockedAt(p,M)&&(this.blockedAt(p,s)?this.blockedAt(n,M)?(p=n,M=s):p=n:M=s),this.x[e]=p,this.z[e]=M;const x=Math.abs(c)+Math.abs(h);x+24<this.best[e]?(this.best[e]=x,this.stuck[e]=0):this.stuck[e]=Math.min(255,this.stuck[e]+1),(this.stuck[e]>30||this.stuck[e]>10&&x<3*wt&&!this.path[e])&&(this.state[e]=Te,this.field[e]=null,this.path[e]=null)}}buildHash(){const t=this.hs,e=this.hashHead,n=this.hashNext;e.fill(-1);for(let s=0;s<this.top;s++){if(!this.alive[s]||this.kind[s]>=Qt)continue;const r=Math.min(t-1,Math.max(0,this.z[s]>>9))*t+Math.min(t-1,Math.max(0,this.x[s]>>9));n[s]=e[r],e[r]=s}}near(t,e,n,s){const r=this.hs,a=Math.max(0,(t>>9)-Math.ceil(n/2)),o=Math.min(r-1,(t>>9)+Math.ceil(n/2)),l=Math.max(0,(e>>9)-Math.ceil(n/2)),c=Math.min(r-1,(e>>9)+Math.ceil(n/2)),h=n*wt*(n*wt);for(let d=l;d<=c;d++)for(let u=a;u<=o;u++)for(let f=this.hashHead[d*r+u];f!==-1;f=this.hashNext[f]){const m=this.x[f]-t,v=this.z[f]-e;m*m+v*v<=h&&this.alive[f]&&s(f)}}separate(){const t=this.hs,e=this.hashHead,n=this.hashNext;this.buildHash();for(let s=0;s<this.top;s++)this.pushX[s]=0,this.pushZ[s]=0;for(let s=0;s<this.top;s++){if(!this.isUnit(s))continue;const r=Math.round(yt[this.kind[s]].radius*wt),a=this.x[s]>>9,o=this.z[s]>>9;for(let l=-1;l<=1;l++)for(let c=-1;c<=1;c++){const h=a+c,d=o+l;if(!(h<0||d<0||h>=t||d>=t))for(let u=e[d*t+h];u!==-1;u=n[u]){if(u<=s||!this.isUnit(u))continue;const f=Math.round(yt[this.kind[u]].radius*wt),m=r+f;let v=this.x[u]-this.x[s],g=this.z[u]-this.z[s];if(v>=m||v<=-m||g>=m||g<=-m)continue;let p=v*v+g*g;if(p>=m*m)continue;p===0&&(v=1+s%3,g=1+u%3,p=v*v+g*g);const M=Yi(p)||1,x=m-M>>1,_=gi(v*x,M),P=gi(g*x,M),T=this.state[s]===Ze?1:2,E=this.state[u]===Ze?1:2;this.pushX[s]-=gi(_*T,2),this.pushZ[s]-=gi(P*T,2),this.pushX[u]+=gi(_*E,2),this.pushZ[u]+=gi(P*E,2)}}}for(let s=0;s<this.top;s++){if(!this.pushX[s]&&!this.pushZ[s])continue;const r=this.x[s]+this.pushX[s],a=this.z[s]+this.pushZ[s];this.blockedAt(r,a)?this.blockedAt(r,this.z[s])?this.blockedAt(this.x[s],a)||(this.z[s]=a):this.x[s]=r:(this.x[s]=r,this.z[s]=a)}}updateFog(){const t=this.size;for(let e=0;e<this.players.length;e++){const n=this.vis[e],s=this.explored[e];n.fill(0);for(let r=0;r<this.top;r++){if(!this.alive[r]||this.owner[r]!==e||this.kind[r]===Qt)continue;const a=this.kind[r]>=jt?this.bdef(r).sight:yt[this.kind[r]].sight,o=Cf(a),l=this.x[r]>>8,c=this.z[r]>>8;for(let h=0;h<o.length;h+=2){const d=l+o[h],u=c+o[h+1];if(d<0||u<0||d>=t||u>=t)continue;const f=u*t+d;n[f]=1,s[f]=1}}}}get month(){return Math.floor(this.tick/Ln)%12}get season(){return Math.floor(this.month/3)}get year(){return Math.floor(this.tick/(Ln*12))+1}drain(){const t=this.events;return this.events=[],t}hash(){let t=2166136261;const e=n=>{for(let s=0;s<32;s+=8)t^=n>>>s&255,t=Math.imul(t,16777619)};e(this.tick);for(let n=0;n<this.top;n++)this.alive[n]&&(e(n),e(this.kind[n]),e(this.owner[n]),e(this.x[n]),e(this.z[n]),e(this.hp[n]),e(this.task[n]),e(this.carry[n]));for(const n of this.players)for(const s of Ki)e(n.res[s]);return t>>>0}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jl="170",Rf=0,Ic=1,Pf=2,Eu=1,Tu=2,ii=3,Pi=0,Je=1,ai=2,wi=0,Ds=1,Lc=2,Dc=3,Uc=4,If=5,Xi=100,Lf=101,Df=102,Uf=103,kf=104,Nf=200,zf=201,Ff=202,Of=203,Zo=204,Jo=205,Bf=206,Hf=207,Gf=208,Vf=209,Wf=210,qf=211,Xf=212,$f=213,Yf=214,Qo=0,tl=1,el=2,Bs=3,nl=4,il=5,sl=6,rl=7,Ga=0,Kf=1,jf=2,Ci=0,Zf=1,Jf=2,Qf=3,Au=4,tp=5,ep=6,np=7,wu=300,Hs=301,Gs=302,al=303,ol=304,Va=306,ll=1e3,Ji=1001,cl=1002,gn=1003,ip=1004,Nr=1005,kn=1006,no=1007,Qi=1008,Yn=1009,Cu=1010,Ru=1011,Mr=1012,Ql=1013,ns=1014,Gn=1015,Cr=1016,tc=1017,ec=1018,Vs=1020,Pu=35902,Iu=1021,Lu=1022,Nn=1023,Du=1024,Uu=1025,Us=1026,Ws=1027,Wa=1028,nc=1029,ku=1030,ic=1031,sc=1033,_a=33776,Ma=33777,ya=33778,ba=33779,hl=35840,ul=35841,dl=35842,fl=35843,pl=36196,ml=37492,gl=37496,vl=37808,xl=37809,_l=37810,Ml=37811,yl=37812,bl=37813,Sl=37814,El=37815,Tl=37816,Al=37817,wl=37818,Cl=37819,Rl=37820,Pl=37821,Sa=36492,Il=36494,Ll=36495,Nu=36283,Dl=36284,Ul=36285,kl=36286,sp=3200,zu=3201,rc=0,rp=1,Ai="",an="srgb",$s="srgb-linear",qa="linear",ue="srgb",cs=7680,kc=519,ap=512,op=513,lp=514,Fu=515,cp=516,hp=517,up=518,dp=519,Nc=35044,mn=35048,zc="300 es",li=2e3,Ia=2001;class Ys{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Xe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],io=Math.PI/180,Nl=180/Math.PI;function Rr(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xe[i&255]+Xe[i>>8&255]+Xe[i>>16&255]+Xe[i>>24&255]+"-"+Xe[t&255]+Xe[t>>8&255]+"-"+Xe[t>>16&15|64]+Xe[t>>24&255]+"-"+Xe[e&63|128]+Xe[e>>8&255]+"-"+Xe[e>>16&255]+Xe[e>>24&255]+Xe[n&255]+Xe[n>>8&255]+Xe[n>>16&255]+Xe[n>>24&255]).toLowerCase()}function ln(i,t,e){return Math.max(t,Math.min(e,i))}function fp(i,t){return(i%t+t)%t}function so(i,t,e){return(1-e)*i+e*t}function nr(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function sn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Kt{constructor(t=0,e=0){Kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ln(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ht{constructor(t,e,n,s,r,a,o,l,c){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],v=s[0],g=s[3],p=s[6],M=s[1],x=s[4],_=s[7],P=s[2],T=s[5],E=s[8];return r[0]=a*v+o*M+l*P,r[3]=a*g+o*x+l*T,r[6]=a*p+o*_+l*E,r[1]=c*v+h*M+d*P,r[4]=c*g+h*x+d*T,r[7]=c*p+h*_+d*E,r[2]=u*v+f*M+m*P,r[5]=u*g+f*x+m*T,r[8]=u*p+f*_+m*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=e*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=u*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(ro.makeScale(t,e)),this}rotate(t){return this.premultiply(ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ro=new Ht;function Ou(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function La(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function pp(){const i=La("canvas");return i.style.display="block",i}const Fc={};function fr(i){i in Fc||(Fc[i]=!0,console.warn(i))}function mp(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function gp(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function vp(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ee={enabled:!0,workingColorSpace:$s,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(i.r=hi(i.r),i.g=hi(i.g),i.b=hi(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(i.r=ks(i.r),i.g=ks(i.g),i.b=ks(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?qa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ks(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Oc=[.64,.33,.3,.6,.15,.06],Bc=[.2126,.7152,.0722],Hc=[.3127,.329],Gc=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ee.define({[$s]:{primaries:Oc,whitePoint:Hc,transfer:qa,toXYZ:Gc,fromXYZ:Vc,luminanceCoefficients:Bc,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:Oc,whitePoint:Hc,transfer:ue,toXYZ:Gc,fromXYZ:Vc,luminanceCoefficients:Bc,outputColorSpaceConfig:{drawingBufferColorSpace:an}}});let hs;class xp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{hs===void 0&&(hs=La("canvas")),hs.width=t.width,hs.height=t.height;const n=hs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=hs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=La("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _p=0;class Bu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_p++}),this.uuid=Rr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ao(s[a].image)):r.push(ao(s[a]))}else r=ao(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function ao(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Mp=0;class Qe extends Ys{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,n=Ji,s=Ji,r=kn,a=Qi,o=Nn,l=Yn,c=Qe.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Mp++}),this.uuid=Rr(),this.name="",this.source=new Bu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ll:t.x=t.x-Math.floor(t.x);break;case Ji:t.x=t.x<0?0:1;break;case cl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ll:t.y=t.y-Math.floor(t.y);break;case Ji:t.y=t.y<0?0:1;break;case cl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=wu;Qe.DEFAULT_ANISOTROPY=1;class Ce{constructor(t=0,e=0,n=0,s=1){Ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,_=(f+1)/2,P=(p+1)/2,T=(h+u)/4,E=(d+v)/4,w=(m+g)/4;return x>_&&x>P?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=E/n):_>P?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=w/s):P<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),n=E/r,s=w/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(d-v)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yp extends Ys{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ce(0,0,t,e),this.scissorTest=!1,this.viewport=new Ce(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class is extends yp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Hu extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class bp extends Qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=Ji,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ii{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==m){let g=1-o;const p=l*u+c*f+h*m+d*v,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),T=Math.atan2(P,p*M);g=Math.sin(g*T)/P,o=Math.sin(o*T)/P}const _=o*M;if(l=l*g+u*_,c=c*g+f*_,h=h*g+m*_,d=d*g+v*_,g===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=P,c*=P,h*=P,d*=P}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return t[e]=o*m+h*d+l*f-c*u,t[e+1]=l*m+h*u+c*d-o*f,t[e+2]=c*m+h*f+o*u-l*d,t[e+3]=h*m-o*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ln(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Wc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Wc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oo.copy(this).projectOnVector(t),this.sub(oo)}reflect(t){return this.sub(oo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ln(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oo=new O,Wc=new Ii;class rs{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,wn):wn.fromBufferAttribute(r,a),wn.applyMatrix4(t.matrixWorld),this.expandByPoint(wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),zr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(t.matrixWorld),this.union(zr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wn),wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ir),Fr.subVectors(this.max,ir),us.subVectors(t.a,ir),ds.subVectors(t.b,ir),fs.subVectors(t.c,ir),xi.subVectors(ds,us),_i.subVectors(fs,ds),Ui.subVectors(us,fs);let e=[0,-xi.z,xi.y,0,-_i.z,_i.y,0,-Ui.z,Ui.y,xi.z,0,-xi.x,_i.z,0,-_i.x,Ui.z,0,-Ui.x,-xi.y,xi.x,0,-_i.y,_i.x,0,-Ui.y,Ui.x,0];return!lo(e,us,ds,fs,Fr)||(e=[1,0,0,0,1,0,0,0,1],!lo(e,us,ds,fs,Fr))?!1:(Or.crossVectors(xi,_i),e=[Or.x,Or.y,Or.z],lo(e,us,ds,fs,Fr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Zn=[new O,new O,new O,new O,new O,new O,new O,new O],wn=new O,zr=new rs,us=new O,ds=new O,fs=new O,xi=new O,_i=new O,Ui=new O,ir=new O,Fr=new O,Or=new O,ki=new O;function lo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ki.fromArray(i,r);const o=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),l=t.dot(ki),c=e.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Sp=new rs,sr=new O,co=new O;class Ks{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;sr.subVectors(t,this.center);const e=sr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(sr,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(co.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(sr.copy(t.center).add(co)),this.expandByPoint(sr.copy(t.center).sub(co))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Jn=new O,ho=new O,Br=new O,Mi=new O,uo=new O,Hr=new O,fo=new O;class Xa{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ho.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(ho);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Br),o=Mi.dot(this.direction),l=-Mi.dot(Br),c=Mi.lengthSq(),h=Math.abs(1-a*a);let d,u,f,m;if(h>0)if(d=a*l-o,u=a*o-l,m=r*h,d>=0)if(u>=-m)if(u<=m){const v=1/h;d*=v,u*=v,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ho).addScaledVector(Br,u),f}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);const n=Jn.dot(this.direction),s=Jn.dot(Jn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,n,s,r){uo.subVectors(e,t),Hr.subVectors(n,t),fo.crossVectors(uo,Hr);let a=this.direction.dot(fo),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Mi.subVectors(this.origin,t);const l=o*this.direction.dot(Hr.crossVectors(Mi,Hr));if(l<0)return null;const c=o*this.direction.dot(uo.cross(Mi));if(c<0||l+c>a)return null;const h=-o*Mi.dot(fo);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qt{constructor(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g){qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g)}set(t,e,n,s,r,a,o,l,c,h,d,u,f,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ps.setFromMatrixColumn(t,0).length(),r=1/ps.setFromMatrixColumn(t,1).length(),a=1/ps.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,m=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+m*c,e[5]=u-v*c,e[9]=-o*l,e[2]=v-u*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,m=c*h,v=c*d;e[0]=u+v*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=v+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,m=c*h,v=c*d;e[0]=u-v*o,e[4]=-a*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=v-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,f=a*d,m=o*h,v=o*d;e[0]=l*h,e[4]=m*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=v-u*d,e[8]=m*d+f,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*d+m,e[10]=u-v*d}else if(t.order==="XZY"){const u=a*l,f=a*c,m=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=a*h,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ep,t,Tp)}lookAt(t,e,n){const s=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),yi.crossVectors(n,un),yi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),yi.crossVectors(n,un)),yi.normalize(),Gr.crossVectors(un,yi),s[0]=yi.x,s[4]=Gr.x,s[8]=un.x,s[1]=yi.y,s[5]=Gr.y,s[9]=un.y,s[2]=yi.z,s[6]=Gr.z,s[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],v=n[6],g=n[10],p=n[14],M=n[3],x=n[7],_=n[11],P=n[15],T=s[0],E=s[4],w=s[8],b=s[12],y=s[1],S=s[5],L=s[9],D=s[13],U=s[2],B=s[6],V=s[10],j=s[14],z=s[3],F=s[7],H=s[11],Y=s[15];return r[0]=a*T+o*y+l*U+c*z,r[4]=a*E+o*S+l*B+c*F,r[8]=a*w+o*L+l*V+c*H,r[12]=a*b+o*D+l*j+c*Y,r[1]=h*T+d*y+u*U+f*z,r[5]=h*E+d*S+u*B+f*F,r[9]=h*w+d*L+u*V+f*H,r[13]=h*b+d*D+u*j+f*Y,r[2]=m*T+v*y+g*U+p*z,r[6]=m*E+v*S+g*B+p*F,r[10]=m*w+v*L+g*V+p*H,r[14]=m*b+v*D+g*j+p*Y,r[3]=M*T+x*y+_*U+P*z,r[7]=M*E+x*S+_*B+P*F,r[11]=M*w+x*L+_*V+P*H,r[15]=M*b+x*D+_*j+P*Y,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*l*d-s*c*d-r*o*u+n*c*u+s*o*f-n*l*f)+v*(+e*l*f-e*c*u+r*a*u-s*a*f+s*c*h-r*l*h)+g*(+e*c*d-e*o*f-r*a*d+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-e*l*d+e*o*u+s*a*d-n*a*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],m=t[12],v=t[13],g=t[14],p=t[15],M=d*g*c-v*u*c+v*l*f-o*g*f-d*l*p+o*u*p,x=m*u*c-h*g*c-m*l*f+a*g*f+h*l*p-a*u*p,_=h*v*c-m*d*c+m*o*f-a*v*f-h*o*p+a*d*p,P=m*d*l-h*v*l-m*o*u+a*v*u+h*o*g-a*d*g,T=e*M+n*x+s*_+r*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return t[0]=M*E,t[1]=(v*u*r-d*g*r-v*s*f+n*g*f+d*s*p-n*u*p)*E,t[2]=(o*g*r-v*l*r+v*s*c-n*g*c-o*s*p+n*l*p)*E,t[3]=(d*l*r-o*u*r-d*s*c+n*u*c+o*s*f-n*l*f)*E,t[4]=x*E,t[5]=(h*g*r-m*u*r+m*s*f-e*g*f-h*s*p+e*u*p)*E,t[6]=(m*l*r-a*g*r-m*s*c+e*g*c+a*s*p-e*l*p)*E,t[7]=(a*u*r-h*l*r+h*s*c-e*u*c-a*s*f+e*l*f)*E,t[8]=_*E,t[9]=(m*d*r-h*v*r-m*n*f+e*v*f+h*n*p-e*d*p)*E,t[10]=(a*v*r-m*o*r+m*n*c-e*v*c-a*n*p+e*o*p)*E,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*f-e*o*f)*E,t[12]=P*E,t[13]=(h*v*s-m*d*s+m*n*u-e*v*u-h*n*g+e*d*g)*E,t[14]=(m*o*s-a*v*s-m*n*l+e*v*l+a*n*g-e*o*g)*E,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*u+e*o*u)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,m=r*d,v=a*h,g=a*d,p=o*d,M=l*c,x=l*h,_=l*d,P=n.x,T=n.y,E=n.z;return s[0]=(1-(v+p))*P,s[1]=(f+_)*P,s[2]=(m-x)*P,s[3]=0,s[4]=(f-_)*T,s[5]=(1-(u+p))*T,s[6]=(g+M)*T,s[7]=0,s[8]=(m+x)*E,s[9]=(g-M)*E,s[10]=(1-(u+v))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ps.set(s[0],s[1],s[2]).length();const a=ps.set(s[4],s[5],s[6]).length(),o=ps.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Cn.copy(this);const c=1/r,h=1/a,d=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=h,Cn.elements[5]*=h,Cn.elements[6]*=h,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,e.setFromRotationMatrix(Cn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=li){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let f,m;if(o===li)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Ia)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=li){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),u=(e+t)*c,f=(n+s)*h;let m,v;if(o===li)m=(a+r)*d,v=-2*d;else if(o===Ia)m=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ps=new O,Cn=new qt,Ep=new O(0,0,0),Tp=new O(1,1,1),yi=new O,Gr=new O,un=new O,qc=new qt,Xc=new Ii;class vn{constructor(t=0,e=0,n=0,s=vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ln(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ln(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ln(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ln(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ln(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ln(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Xc.setFromEuler(this),this.setFromQuaternion(Xc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vn.DEFAULT_ORDER="XYZ";class Gu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ap=0;const $c=new O,ms=new Ii,Qn=new qt,Vr=new O,rr=new O,wp=new O,Cp=new Ii,Yc=new O(1,0,0),Kc=new O(0,1,0),jc=new O(0,0,1),Zc={type:"added"},Rp={type:"removed"},gs={type:"childadded",child:null},po={type:"childremoved",child:null};class Ve extends Ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ap++}),this.uuid=Rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new O,e=new vn,n=new Ii,s=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new Ht}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.multiply(ms),this}rotateOnWorldAxis(t,e){return ms.setFromAxisAngle(t,e),this.quaternion.premultiply(ms),this}rotateX(t){return this.rotateOnAxis(Yc,t)}rotateY(t){return this.rotateOnAxis(Kc,t)}rotateZ(t){return this.rotateOnAxis(jc,t)}translateOnAxis(t,e){return $c.copy(t).applyQuaternion(this.quaternion),this.position.add($c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Yc,t)}translateY(t){return this.translateOnAxis(Kc,t)}translateZ(t){return this.translateOnAxis(jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Vr.copy(t):Vr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(rr,Vr,this.up):Qn.lookAt(Vr,rr,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),ms.setFromRotationMatrix(Qn),this.quaternion.premultiply(ms.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zc),gs.child=t,this.dispatchEvent(gs),gs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rp),po.child=t,this.dispatchEvent(po),po.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Qn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Qn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zc),gs.child=t,this.dispatchEvent(gs),gs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,t,wp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Cp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ve.DEFAULT_UP=new O(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new O,ti=new O,mo=new O,ei=new O,vs=new O,xs=new O,Jc=new O,go=new O,vo=new O,xo=new O,_o=new Ce,Mo=new Ce,yo=new Ce;class Dn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Rn.subVectors(t,e),s.cross(Rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Rn.subVectors(s,e),ti.subVectors(n,e),mo.subVectors(t,e);const a=Rn.dot(Rn),o=Rn.dot(ti),l=Rn.dot(mo),c=ti.dot(ti),h=ti.dot(mo),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ei)===null?!1:ei.x>=0&&ei.y>=0&&ei.x+ei.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,ei)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ei.x),l.addScaledVector(a,ei.y),l.addScaledVector(o,ei.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return _o.setScalar(0),Mo.setScalar(0),yo.setScalar(0),_o.fromBufferAttribute(t,e),Mo.fromBufferAttribute(t,n),yo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(_o,r.x),a.addScaledVector(Mo,r.y),a.addScaledVector(yo,r.z),a}static isFrontFacing(t,e,n,s){return Rn.subVectors(n,e),ti.subVectors(t,e),Rn.cross(ti).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Rn.subVectors(this.c,this.b),ti.subVectors(this.a,this.b),Rn.cross(ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Dn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Dn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Dn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Dn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Dn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;vs.subVectors(s,n),xs.subVectors(r,n),go.subVectors(t,n);const l=vs.dot(go),c=xs.dot(go);if(l<=0&&c<=0)return e.copy(n);vo.subVectors(t,s);const h=vs.dot(vo),d=xs.dot(vo);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(vs,a);xo.subVectors(t,r);const f=vs.dot(xo),m=xs.dot(xo);if(m>=0&&f<=m)return e.copy(r);const v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(n).addScaledVector(xs,o);const g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return Jc.subVectors(r,s),o=(d-h)/(d-h+(f-m)),e.copy(s).addScaledVector(Jc,o);const p=1/(g+v+u);return a=v*p,o=u*p,e.copy(n).addScaledVector(vs,a).addScaledVector(xs,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},Wr={h:0,s:0,l:0};function bo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Pt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=an){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=fp(t,1),e=ln(e,0,1),n=ln(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=bo(a,r,t+1/3),this.g=bo(a,r,t),this.b=bo(a,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=an){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=an){const n=Vu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=ks(t.r),this.g=ks(t.g),this.b=ks(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=an){return ee.fromWorkingColorSpace($e.copy(this),t),Math.round(ln($e.r*255,0,255))*65536+Math.round(ln($e.g*255,0,255))*256+Math.round(ln($e.b*255,0,255))}getHexString(t=an){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace($e.copy(this),e);const n=$e.r,s=$e.g,r=$e.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=an){ee.fromWorkingColorSpace($e.copy(this),t);const e=$e.r,n=$e.g,s=$e.b;return t!==an?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(bi),this.setHSL(bi.h+t,bi.s+e,bi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(bi),t.getHSL(Wr);const n=so(bi.h,Wr.h,e),s=so(bi.s,Wr.s,e),r=so(bi.l,Wr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $e=new Pt;Pt.NAMES=Vu;let Pp=0;class as extends Ys{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Rr(),this.name="",this.blending=Ds,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zo,this.blendDst=Jo,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pt(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=kc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cs,this.stencilZFail=cs,this.stencilZPass=cs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ds&&(n.blending=this.blending),this.side!==Pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Zo&&(n.blendSrc=this.blendSrc),this.blendDst!==Jo&&(n.blendDst=this.blendDst),this.blendEquation!==Xi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Bs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==kc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==cs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==cs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==cs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ui extends as{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Le=new O,qr=new Kt;class Pe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Nc,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)qr.fromBufferAttribute(this,e),qr.applyMatrix3(t),this.setXY(e,qr.x,qr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=nr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=nr(e,this.array)),e}setX(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=nr(e,this.array)),e}setY(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=nr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=nr(e,this.array)),e}setW(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),s=sn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Nc&&(t.usage=this.usage),t}}class Wu extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qu extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class he extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ip=0;const _n=new qt,So=new Ve,_s=new O,dn=new rs,ar=new rs,Be=new O;class Ie extends Ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Rr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ou(t)?qu:Wu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ht().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return _n.makeRotationFromQuaternion(t),this.applyMatrix4(_n),this}rotateX(t){return _n.makeRotationX(t),this.applyMatrix4(_n),this}rotateY(t){return _n.makeRotationY(t),this.applyMatrix4(_n),this}rotateZ(t){return _n.makeRotationZ(t),this.applyMatrix4(_n),this}translate(t,e,n){return _n.makeTranslation(t,e,n),this.applyMatrix4(_n),this}scale(t,e,n){return _n.makeScale(t,e,n),this.applyMatrix4(_n),this}lookAt(t){return So.lookAt(t),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new he(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(dn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ar.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(dn.min,ar.min),dn.expandByPoint(Be),Be.addVectors(dn.max,ar.max),dn.expandByPoint(Be)):(dn.expandByPoint(ar.min),dn.expandByPoint(ar.max))}dn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(_s.fromBufferAttribute(t,c),Be.add(_s)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let w=0;w<n.count;w++)o[w]=new O,l[w]=new O;const c=new O,h=new O,d=new O,u=new Kt,f=new Kt,m=new Kt,v=new O,g=new O;function p(w,b,y){c.fromBufferAttribute(n,w),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,y),u.fromBufferAttribute(r,w),f.fromBufferAttribute(r,b),m.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),m.sub(u);const S=1/(f.x*m.y-m.x*f.y);isFinite(S)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(S),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(S),o[w].add(v),o[b].add(v),o[y].add(v),l[w].add(g),l[b].add(g),l[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let w=0,b=M.length;w<b;++w){const y=M[w],S=y.start,L=y.count;for(let D=S,U=S+L;D<U;D+=3)p(t.getX(D+0),t.getX(D+1),t.getX(D+2))}const x=new O,_=new O,P=new O,T=new O;function E(w){P.fromBufferAttribute(s,w),T.copy(P);const b=o[w];x.copy(b),x.sub(P.multiplyScalar(P.dot(b))).normalize(),_.crossVectors(T,b);const S=_.dot(l[w])<0?-1:1;a.setXYZW(w,x.x,x.y,x.z,S)}for(let w=0,b=M.length;w<b;++w){const y=M[w],S=y.start,L=y.count;for(let D=S,U=S+L;D<U;D+=3)E(t.getX(D+0)),E(t.getX(D+1)),E(t.getX(D+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,h=new O,d=new O;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,g),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let v=0,g=l.length;v<g;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new Pe(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ie,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qc=new qt,Ni=new Xa,Xr=new Ks,th=new O,$r=new O,Yr=new O,Kr=new O,Eo=new O,jr=new O,eh=new O,Zr=new O;class Ue extends Ve{constructor(t=new Ie,e=new ui){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(Eo.fromBufferAttribute(d,t),a?jr.addScaledVector(Eo,h):jr.addScaledVector(Eo.sub(e),h))}e.add(jr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xr.copy(n.boundingSphere),Xr.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(Xr.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(Xr,th)===null||Ni.origin.distanceToSquared(th)>(t.far-t.near)**2))&&(Qc.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(Qc),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){const T=o.getX(_),E=o.getX(_+1),w=o.getX(_+2);s=Jr(this,p,t,n,c,h,d,T,E,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const M=o.getX(g),x=o.getX(g+1),_=o.getX(g+2);s=Jr(this,a,t,n,c,h,d,M,x,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=u.length;m<v;m++){const g=u[m],p=a[g.materialIndex],M=Math.max(g.start,f.start),x=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let _=M,P=x;_<P;_+=3){const T=_,E=_+1,w=_+2;s=Jr(this,p,t,n,c,h,d,T,E,w),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=m,p=v;g<p;g+=3){const M=g,x=g+1,_=g+2;s=Jr(this,a,t,n,c,h,d,M,x,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Lp(i,t,e,n,s,r,a,o){let l;if(t.side===Je?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Pi,o),l===null)return null;Zr.copy(o),Zr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Zr);return c<e.near||c>e.far?null:{distance:c,point:Zr.clone(),object:i}}function Jr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,$r),i.getVertexPosition(l,Yr),i.getVertexPosition(c,Kr);const h=Lp(i,t,e,n,$r,Yr,Kr,eh);if(h){const d=new O;Dn.getBarycoord(eh,$r,Yr,Kr,d),s&&(h.uv=Dn.getInterpolatedAttribute(s,o,l,c,d,new Kt)),r&&(h.uv1=Dn.getInterpolatedAttribute(r,o,l,c,d,new Kt)),a&&(h.normal=Dn.getInterpolatedAttribute(a,o,l,c,d,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new O,materialIndex:0};Dn.getNormal($r,Yr,Kr,u.normal),h.face=u,h.barycoord=d}return h}class Ne extends Ie{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,n,e,t,a,r,0),m("z","y","x",1,-1,n,e,-t,a,r,1),m("x","z","y",1,1,t,n,e,s,a,2),m("x","z","y",1,-1,t,n,-e,s,a,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new he(c,3)),this.setAttribute("normal",new he(h,3)),this.setAttribute("uv",new he(d,2));function m(v,g,p,M,x,_,P,T,E,w,b){const y=_/E,S=P/w,L=_/2,D=P/2,U=T/2,B=E+1,V=w+1;let j=0,z=0;const F=new O;for(let H=0;H<V;H++){const Y=H*S-D;for(let Q=0;Q<B;Q++){const et=Q*y-L;F[v]=et*M,F[g]=Y*x,F[p]=U,c.push(F.x,F.y,F.z),F[v]=0,F[g]=0,F[p]=T>0?1:-1,h.push(F.x,F.y,F.z),d.push(Q/E),d.push(1-H/w),j+=1}}for(let H=0;H<w;H++)for(let Y=0;Y<E;Y++){const Q=u+Y+B*H,et=u+Y+B*(H+1),N=u+(Y+1)+B*(H+1),tt=u+(Y+1)+B*H;l.push(Q,et,tt),l.push(et,N,tt),z+=6}o.addGroup(f,z,b),f+=z,u+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function qs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function je(i){const t={};for(let e=0;e<i.length;e++){const n=qs(i[e]);for(const s in n)t[s]=n[s]}return t}function Dp(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Xu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ee.workingColorSpace}const Up={clone:qs,merge:je};var kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Np=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zn extends as{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kp,this.fragmentShader=Np,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=qs(t.uniforms),this.uniformsGroups=Dp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class $u extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new O,nh=new Kt,ih=new Kt;class bn extends $u{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Nl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nl*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Si.x,Si.y).multiplyScalar(-t/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-t/Si.z)}getViewSize(t,e){return this.getViewBounds(t,nh,ih),e.subVectors(ih,nh)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(io*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ms=-90,ys=1;class zp extends Ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new bn(Ms,ys,t,e);s.layers=this.layers,this.add(s);const r=new bn(Ms,ys,t,e);r.layers=this.layers,this.add(r);const a=new bn(Ms,ys,t,e);a.layers=this.layers,this.add(a);const o=new bn(Ms,ys,t,e);o.layers=this.layers,this.add(o);const l=new bn(Ms,ys,t,e);l.layers=this.layers,this.add(l);const c=new bn(Ms,ys,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ia)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Yu extends Qe{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Hs,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Fp extends is{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Yu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:kn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ne(5,5,5),r=new zn({name:"CubemapFromEquirect",uniforms:qs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:wi});r.uniforms.tEquirect.value=e;const a=new Ue(s,r),o=e.minFilter;return e.minFilter===Qi&&(e.minFilter=kn),new zp(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const To=new O,Op=new O,Bp=new Ht;class Vi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=To.subVectors(n,e).cross(Op.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(To),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Bp.getNormalMatrix(t),s=this.coplanarPoint(To).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new Ks,Qr=new O;class ac{constructor(t=new Vi,e=new Vi,n=new Vi,s=new Vi,r=new Vi,a=new Vi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=li){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],m=s[9],v=s[10],g=s[11],p=s[12],M=s[13],x=s[14],_=s[15];if(n[0].setComponents(l-r,u-c,g-f,_-p).normalize(),n[1].setComponents(l+r,u+c,g+f,_+p).normalize(),n[2].setComponents(l+a,u+h,g+m,_+M).normalize(),n[3].setComponents(l-a,u-h,g-m,_-M).normalize(),n[4].setComponents(l-o,u-d,g-v,_-x).normalize(),e===li)n[5].setComponents(l+o,u+d,g+v,_+x).normalize();else if(e===Ia)n[5].setComponents(o,d,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(t){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Qr.x=s.normal.x>0?t.max.x:t.min.x,Qr.y=s.normal.y>0?t.max.y:t.min.y,Qr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ku(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Hp(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const v=d[f];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Li extends Ie{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,f=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const M=p*u-a;for(let x=0;x<c;x++){const _=x*d-r;m.push(_,-M,0),v.push(0,0,1),g.push(x/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const x=M+c*p,_=M+c*(p+1),P=M+1+c*(p+1),T=M+1+c*p;f.push(x,_,T),f.push(_,P,T)}this.setIndex(f),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Li(t.width,t.height,t.widthSegments,t.heightSegments)}}var Gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Vp=`#ifdef USE_ALPHAHASH
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
#endif`,Wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$p=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yp=`#ifdef USE_AOMAP
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
#endif`,Kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jp=`#ifdef USE_BATCHING
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
#endif`,Zp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Jp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Qp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,t0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,e0=`#ifdef USE_IRIDESCENCE
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
#endif`,n0=`#ifdef USE_BUMPMAP
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
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,s0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,r0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,l0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,c0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,h0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,u0=`#define PI 3.141592653589793
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
} // validated`,d0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,f0=`vec3 transformedNormal = objectNormal;
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
#endif`,p0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,m0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,g0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,v0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,x0="gl_FragColor = linearToOutputTexel( gl_FragColor );",_0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,M0=`#ifdef USE_ENVMAP
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
#endif`,y0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,b0=`#ifdef USE_ENVMAP
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
#endif`,S0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,E0=`#ifdef USE_ENVMAP
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
#endif`,T0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,A0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,w0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,C0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,R0=`#ifdef USE_GRADIENTMAP
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
}`,P0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,I0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,L0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,D0=`uniform bool receiveShadow;
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
#endif`,U0=`#ifdef USE_ENVMAP
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
#endif`,k0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,N0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,z0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,O0=`PhysicalMaterial material;
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
#endif`,B0=`struct PhysicalMaterial {
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
}`,H0=`
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
#endif`,G0=`#if defined( RE_IndirectDiffuse )
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
#endif`,V0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,W0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,q0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,X0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,j0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Z0=`#if defined( USE_POINTS_UV )
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
#endif`,J0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Q0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,tm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,em=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,nm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,im=`#ifdef USE_MORPHTARGETS
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
#endif`,sm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,am=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,cm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,hm=`#ifdef USE_NORMALMAP
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
#endif`,um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,dm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,pm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,_m=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ym=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,bm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Am=`float getShadowMask() {
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
}`,wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Cm=`#ifdef USE_SKINNING
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
#endif`,Rm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Pm=`#ifdef USE_SKINNING
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
#endif`,Im=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Lm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Dm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Um=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,km=`#ifdef USE_TRANSMISSION
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
#endif`,Nm=`#ifdef USE_TRANSMISSION
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Bm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Hm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Gm=`uniform sampler2D t2D;
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
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Wm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`#include <common>
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
}`,Ym=`#if DEPTH_PACKING == 3200
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
}`,Km=`#define DISTANCE
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
}`,jm=`#define DISTANCE
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
}`,Zm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Jm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qm=`uniform float scale;
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#include <common>
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#define LAMBERT
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
}`,sg=`#define LAMBERT
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
}`,rg=`#define MATCAP
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
}`,ag=`#define MATCAP
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
}`,og=`#define NORMAL
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
}`,lg=`#define NORMAL
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
}`,cg=`#define PHONG
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
}`,hg=`#define PHONG
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
}`,ug=`#define STANDARD
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
}`,dg=`#define STANDARD
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
}`,fg=`#define TOON
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
}`,pg=`#define TOON
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
}`,mg=`uniform float size;
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
}`,gg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,xg=`uniform vec3 color;
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
}`,_g=`uniform float rotation;
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
}`,Mg=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:Gp,alphahash_pars_fragment:Vp,alphamap_fragment:Wp,alphamap_pars_fragment:qp,alphatest_fragment:Xp,alphatest_pars_fragment:$p,aomap_fragment:Yp,aomap_pars_fragment:Kp,batching_pars_vertex:jp,batching_vertex:Zp,begin_vertex:Jp,beginnormal_vertex:Qp,bsdfs:t0,iridescence_fragment:e0,bumpmap_pars_fragment:n0,clipping_planes_fragment:i0,clipping_planes_pars_fragment:s0,clipping_planes_pars_vertex:r0,clipping_planes_vertex:a0,color_fragment:o0,color_pars_fragment:l0,color_pars_vertex:c0,color_vertex:h0,common:u0,cube_uv_reflection_fragment:d0,defaultnormal_vertex:f0,displacementmap_pars_vertex:p0,displacementmap_vertex:m0,emissivemap_fragment:g0,emissivemap_pars_fragment:v0,colorspace_fragment:x0,colorspace_pars_fragment:_0,envmap_fragment:M0,envmap_common_pars_fragment:y0,envmap_pars_fragment:b0,envmap_pars_vertex:S0,envmap_physical_pars_fragment:U0,envmap_vertex:E0,fog_vertex:T0,fog_pars_vertex:A0,fog_fragment:w0,fog_pars_fragment:C0,gradientmap_pars_fragment:R0,lightmap_pars_fragment:P0,lights_lambert_fragment:I0,lights_lambert_pars_fragment:L0,lights_pars_begin:D0,lights_toon_fragment:k0,lights_toon_pars_fragment:N0,lights_phong_fragment:z0,lights_phong_pars_fragment:F0,lights_physical_fragment:O0,lights_physical_pars_fragment:B0,lights_fragment_begin:H0,lights_fragment_maps:G0,lights_fragment_end:V0,logdepthbuf_fragment:W0,logdepthbuf_pars_fragment:q0,logdepthbuf_pars_vertex:X0,logdepthbuf_vertex:$0,map_fragment:Y0,map_pars_fragment:K0,map_particle_fragment:j0,map_particle_pars_fragment:Z0,metalnessmap_fragment:J0,metalnessmap_pars_fragment:Q0,morphinstance_vertex:tm,morphcolor_vertex:em,morphnormal_vertex:nm,morphtarget_pars_vertex:im,morphtarget_vertex:sm,normal_fragment_begin:rm,normal_fragment_maps:am,normal_pars_fragment:om,normal_pars_vertex:lm,normal_vertex:cm,normalmap_pars_fragment:hm,clearcoat_normal_fragment_begin:um,clearcoat_normal_fragment_maps:dm,clearcoat_pars_fragment:fm,iridescence_pars_fragment:pm,opaque_fragment:mm,packing:gm,premultiplied_alpha_fragment:vm,project_vertex:xm,dithering_fragment:_m,dithering_pars_fragment:Mm,roughnessmap_fragment:ym,roughnessmap_pars_fragment:bm,shadowmap_pars_fragment:Sm,shadowmap_pars_vertex:Em,shadowmap_vertex:Tm,shadowmask_pars_fragment:Am,skinbase_vertex:wm,skinning_pars_vertex:Cm,skinning_vertex:Rm,skinnormal_vertex:Pm,specularmap_fragment:Im,specularmap_pars_fragment:Lm,tonemapping_fragment:Dm,tonemapping_pars_fragment:Um,transmission_fragment:km,transmission_pars_fragment:Nm,uv_pars_fragment:zm,uv_pars_vertex:Fm,uv_vertex:Om,worldpos_vertex:Bm,background_vert:Hm,background_frag:Gm,backgroundCube_vert:Vm,backgroundCube_frag:Wm,cube_vert:qm,cube_frag:Xm,depth_vert:$m,depth_frag:Ym,distanceRGBA_vert:Km,distanceRGBA_frag:jm,equirect_vert:Zm,equirect_frag:Jm,linedashed_vert:Qm,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:sg,meshmatcap_vert:rg,meshmatcap_frag:ag,meshnormal_vert:og,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:gg,shadow_vert:vg,shadow_frag:xg,sprite_vert:_g,sprite_frag:Mg},dt={common:{diffuse:{value:new Pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new Pt(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},Hn={basic:{uniforms:je([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:je([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:je([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)},specular:{value:new Pt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:je([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:je([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Pt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:je([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:je([dt.points,dt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:je([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:je([dt.common,dt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:je([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:je([dt.sprite,dt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:je([dt.common,dt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:je([dt.lights,dt.fog,{color:{value:new Pt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Hn.physical={uniforms:je([Hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new Pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new Pt(0)},specularColor:{value:new Pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const ta={r:0,b:0,g:0},Fi=new vn,yg=new qt;function bg(i,t,e,n,s,r,a){const o=new Pt(0);let l=r===!0?0:1,c,h,d=null,u=0,f=null;function m(M){let x=M.isScene===!0?M.background:null;return x&&x.isTexture&&(x=(M.backgroundBlurriness>0?e:t).get(x)),x}function v(M){let x=!1;const _=m(M);_===null?p(o,l):_&&_.isColor&&(p(_,1),x=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,x){const _=m(x);_&&(_.isCubeTexture||_.mapping===Va)?(h===void 0&&(h=new Ue(new Ne(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:qs(Hn.backgroundCube.uniforms),vertexShader:Hn.backgroundCube.vertexShader,fragmentShader:Hn.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Fi.copy(x.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(yg.makeRotationFromEuler(Fi)),h.material.toneMapped=ee.getTransfer(_.colorSpace)!==ue,(d!==_||u!==_.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=_,u=_.version,f=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Ue(new Li(2,2),new zn({name:"BackgroundMaterial",uniforms:qs(Hn.background.uniforms),vertexShader:Hn.background.vertexShader,fragmentShader:Hn.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=ee.getTransfer(_.colorSpace)!==ue,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||u!==_.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,d=_,u=_.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,x){M.getRGB(ta,Xu(i)),n.buffers.color.setClear(ta.r,ta.g,ta.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(M,x=1){o.set(M),l=x,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,p(o,l)},render:v,addToRenderList:g}}function Sg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function o(y,S,L,D,U){let B=!1;const V=d(D,L,S);r!==V&&(r=V,c(r.object)),B=f(y,D,L,U),B&&m(y,D,L,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,_(y,S,L,D),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function d(y,S,L){const D=L.wireframe===!0;let U=n[y.id];U===void 0&&(U={},n[y.id]=U);let B=U[S.id];B===void 0&&(B={},U[S.id]=B);let V=B[D];return V===void 0&&(V=u(l()),B[D]=V),V}function u(y){const S=[],L=[],D=[];for(let U=0;U<e;U++)S[U]=0,L[U]=0,D[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:S,enabledAttributes:L,attributeDivisors:D,object:y,attributes:{},index:null}}function f(y,S,L,D){const U=r.attributes,B=S.attributes;let V=0;const j=L.getAttributes();for(const z in j)if(j[z].location>=0){const H=U[z];let Y=B[z];if(Y===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(Y=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(Y=y.instanceColor)),H===void 0||H.attribute!==Y||Y&&H.data!==Y.data)return!0;V++}return r.attributesNum!==V||r.index!==D}function m(y,S,L,D){const U={},B=S.attributes;let V=0;const j=L.getAttributes();for(const z in j)if(j[z].location>=0){let H=B[z];H===void 0&&(z==="instanceMatrix"&&y.instanceMatrix&&(H=y.instanceMatrix),z==="instanceColor"&&y.instanceColor&&(H=y.instanceColor));const Y={};Y.attribute=H,H&&H.data&&(Y.data=H.data),U[z]=Y,V++}r.attributes=U,r.attributesNum=V,r.index=D}function v(){const y=r.newAttributes;for(let S=0,L=y.length;S<L;S++)y[S]=0}function g(y){p(y,0)}function p(y,S){const L=r.newAttributes,D=r.enabledAttributes,U=r.attributeDivisors;L[y]=1,D[y]===0&&(i.enableVertexAttribArray(y),D[y]=1),U[y]!==S&&(i.vertexAttribDivisor(y,S),U[y]=S)}function M(){const y=r.newAttributes,S=r.enabledAttributes;for(let L=0,D=S.length;L<D;L++)S[L]!==y[L]&&(i.disableVertexAttribArray(L),S[L]=0)}function x(y,S,L,D,U,B,V){V===!0?i.vertexAttribIPointer(y,S,L,U,B):i.vertexAttribPointer(y,S,L,D,U,B)}function _(y,S,L,D){v();const U=D.attributes,B=L.getAttributes(),V=S.defaultAttributeValues;for(const j in B){const z=B[j];if(z.location>=0){let F=U[j];if(F===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(F=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(F=y.instanceColor)),F!==void 0){const H=F.normalized,Y=F.itemSize,Q=t.get(F);if(Q===void 0)continue;const et=Q.buffer,N=Q.type,tt=Q.bytesPerElement,ot=N===i.INT||N===i.UNSIGNED_INT||F.gpuType===Ql;if(F.isInterleavedBufferAttribute){const it=F.data,ut=it.stride,xt=F.offset;if(it.isInstancedInterleavedBuffer){for(let It=0;It<z.locationSize;It++)p(z.location+It,it.meshPerAttribute);y.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let It=0;It<z.locationSize;It++)g(z.location+It);i.bindBuffer(i.ARRAY_BUFFER,et);for(let It=0;It<z.locationSize;It++)x(z.location+It,Y/z.locationSize,N,H,ut*tt,(xt+Y/z.locationSize*It)*tt,ot)}else{if(F.isInstancedBufferAttribute){for(let it=0;it<z.locationSize;it++)p(z.location+it,F.meshPerAttribute);y.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let it=0;it<z.locationSize;it++)g(z.location+it);i.bindBuffer(i.ARRAY_BUFFER,et);for(let it=0;it<z.locationSize;it++)x(z.location+it,Y/z.locationSize,N,H,Y*tt,Y/z.locationSize*it*tt,ot)}}else if(V!==void 0){const H=V[j];if(H!==void 0)switch(H.length){case 2:i.vertexAttrib2fv(z.location,H);break;case 3:i.vertexAttrib3fv(z.location,H);break;case 4:i.vertexAttrib4fv(z.location,H);break;default:i.vertexAttrib1fv(z.location,H)}}}}M()}function P(){w();for(const y in n){const S=n[y];for(const L in S){const D=S[L];for(const U in D)h(D[U].object),delete D[U];delete S[L]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const S=n[y.id];for(const L in S){const D=S[L];for(const U in D)h(D[U].object),delete D[U];delete S[L]}delete n[y.id]}function E(y){for(const S in n){const L=n[S];if(L[y.id]===void 0)continue;const D=L[y.id];for(const U in D)h(D[U].object),delete D[U];delete L[y.id]}}function w(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:w,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function Eg(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let f=0;for(let m=0;m<d;m++)f+=h[m];e.update(f,n,1)}function l(c,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let m=0;for(let v=0;v<d;v++)m+=h[v]*u[v];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Tg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==Nn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const w=E===Cr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Yn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Gn&&!w)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:P,maxSamples:T}}function Ag(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new Vi,o=new Ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{const M=r?0:n,x=M*4;let _=p.clippingState||null;l.value=_,_=h(m,u,x,f);for(let P=0;P!==x;++P)_[P]=e[P];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,m){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,m!==!0||g===null){const p=f+v*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,_=f;x!==v;++x,_+=4)a.copy(d[x]).applyMatrix4(M,o),a.normal.toArray(g,_),g[_+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function wg(i){let t=new WeakMap;function e(a,o){return o===al?a.mapping=Hs:o===ol&&(a.mapping=Gs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===al||o===ol)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Fp(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ju extends $u{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Rs=4,sh=[.125,.215,.35,.446,.526,.582],$i=20,Ao=new ju,rh=new Pt;let wo=null,Co=0,Ro=0,Po=!1;const Wi=(1+Math.sqrt(5))/2,bs=1/Wi,ah=[new O(-Wi,bs,0),new O(Wi,bs,0),new O(-bs,0,Wi),new O(bs,0,Wi),new O(0,Wi,-bs),new O(0,Wi,bs),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class oh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){wo=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ch(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(wo,Co,Ro),this._renderer.xr.enabled=Po,t.scissorTest=!1,ea(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Hs||t.mapping===Gs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),wo=this._renderer.getRenderTarget(),Co=this._renderer.getActiveCubeFace(),Ro=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:Cr,format:Nn,colorSpace:$s,depthBuffer:!1},s=lh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lh(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cg(r)),this._blurMaterial=Rg(r,t,e)}return s}_compileMaterial(t){const e=new Ue(this._lodPlanes[0],t);this._renderer.compile(e,Ao)}_sceneToCubeUV(t,e,n,s){const o=new bn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(rh),h.toneMapping=Ci,h.autoClear=!1;const f=new ui({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),m=new Ue(new Ne,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(rh),v=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;ea(s,M*x,p>2?x:0,x,x),h.setRenderTarget(s),v&&h.render(m,o),h.render(t,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Hs||t.mapping===Gs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ch());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Ue(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;ea(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Ao)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=ah[(s-r-1)%ah.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Ue(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*$i-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):$i;g>$i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${$i}`);const p=[];let M=0;for(let E=0;E<$i;++E){const w=E/v,b=Math.exp(-w*w/2);p.push(b),E===0?M+=b:E<g&&(M+=2*b)}for(let E=0;E<p.length;E++)p[E]=p[E]/M;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=m,u.mipInt.value=x-n;const _=this._sizeLods[s],P=3*_*(s>x-Rs?s-x+Rs:0),T=4*(this._cubeSize-_);ea(e,P,T,3*_,2*_),l.setRenderTarget(e),l.render(d,Ao)}}function Cg(i){const t=[],e=[],n=[];let s=i;const r=i-Rs+1+sh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-Rs?l=sh[a-i+Rs-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,m=6,v=3,g=2,p=1,M=new Float32Array(v*m*f),x=new Float32Array(g*m*f),_=new Float32Array(p*m*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,w=T>2?0:-1,b=[E,w,0,E+2/3,w,0,E+2/3,w+1,0,E,w,0,E+2/3,w+1,0,E,w+1,0];M.set(b,v*m*T),x.set(u,g*m*T);const y=[T,T,T,T,T,T];_.set(y,p*m*T)}const P=new Ie;P.setAttribute("position",new Pe(M,v)),P.setAttribute("uv",new Pe(x,g)),P.setAttribute("faceIndex",new Pe(_,p)),t.push(P),s>Rs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function lh(i,t,e){const n=new is(i,t,e);return n.texture.mapping=Va,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ea(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Rg(i,t,e){const n=new Float32Array($i),s=new O(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:$i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:oc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function ch(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

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
		`,blending:wi,depthTest:!1,depthWrite:!1})}function hh(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wi,depthTest:!1,depthWrite:!1})}function oc(){return`

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
	`}function Pg(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===al||l===ol,h=l===Hs||l===Gs;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new oh(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new oh(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function Ig(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&fr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Lg(i,t,e,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);for(const m in u.morphAttributes){const v=u.morphAttributes[m];for(let g=0,p=v.length;g<p;g++)t.remove(v[g])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const m in u)t.update(u[m],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const m in f){const v=f[m];for(let g=0,p=v.length;g<p;g++)t.update(v[g],i.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,m=d.attributes.position;let v=0;if(f!==null){const M=f.array;v=f.version;for(let x=0,_=M.length;x<_;x+=3){const P=M[x+0],T=M[x+1],E=M[x+2];u.push(P,T,T,E,E,P)}}else if(m!==void 0){const M=m.array;v=m.version;for(let x=0,_=M.length/3-1;x<_;x+=3){const P=x+0,T=x+1,E=x+2;u.push(P,T,T,E,E,P)}}else return;const g=new(Ou(u)?qu:Wu)(u,1);g.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function Dg(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*a),e.update(f,n,1)}function c(u,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,u*a,m),e.update(f,n,m))}function h(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function d(u,f,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)c(u[p]/a,f[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,u,0,v,0,m);let p=0;for(let M=0;M<m;M++)p+=f[M]*v[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function Ug(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function kg(i,t,e){const n=new WeakMap,s=new Ce;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let y=function(){w.dispose(),n.delete(o),o.removeEventListener("dispose",y)};var f=y;u!==void 0&&u.texture.dispose();const m=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let _=0;m===!0&&(_=1),v===!0&&(_=2),g===!0&&(_=3);let P=o.attributes.position.count*_,T=1;P>t.maxTextureSize&&(T=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const E=new Float32Array(P*T*4*d),w=new Hu(E,P,T,d);w.type=Gn,w.needsUpdate=!0;const b=_*4;for(let S=0;S<d;S++){const L=p[S],D=M[S],U=x[S],B=P*T*4*S;for(let V=0;V<L.count;V++){const j=V*b;m===!0&&(s.fromBufferAttribute(L,V),E[B+j+0]=s.x,E[B+j+1]=s.y,E[B+j+2]=s.z,E[B+j+3]=0),v===!0&&(s.fromBufferAttribute(D,V),E[B+j+4]=s.x,E[B+j+5]=s.y,E[B+j+6]=s.z,E[B+j+7]=0),g===!0&&(s.fromBufferAttribute(U,V),E[B+j+8]=s.x,E[B+j+9]=s.y,E[B+j+10]=s.z,E[B+j+11]=U.itemSize===4?s.w:1)}}u={count:d,texture:w,size:new Kt(P,T)},n.set(o,u),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const v=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function Ng(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class Zu extends Qe{constructor(t,e,n,s,r,a,o,l,c,h=Us){if(h!==Us&&h!==Ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Us&&(n=ns),n===void 0&&h===Ws&&(n=Vs),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ju=new Qe,uh=new Zu(1,1),Qu=new Hu,td=new bp,ed=new Yu,dh=[],fh=[],ph=new Float32Array(16),mh=new Float32Array(9),gh=new Float32Array(4);function js(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dh[s];if(r===void 0&&(r=new Float32Array(s),dh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $a(i,t){let e=fh[t];e===void 0&&(e=new Int32Array(t),fh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function zg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Fg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function Og(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function Bg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function Hg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;gh.set(n),i.uniformMatrix2fv(this.addr,!1,gh),Oe(e,n)}}function Gg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;mh.set(n),i.uniformMatrix3fv(this.addr,!1,mh),Oe(e,n)}}function Vg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;ph.set(n),i.uniformMatrix4fv(this.addr,!1,ph),Oe(e,n)}}function Wg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function qg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function Xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function $g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function Yg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Kg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function Zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function Jg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uh.compareFunction=Fu,r=uh):r=Ju,e.setTexture2D(t||r,s)}function Qg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||td,s)}function tv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ed,s)}function ev(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Qu,s)}function nv(i){switch(i){case 5126:return zg;case 35664:return Fg;case 35665:return Og;case 35666:return Bg;case 35674:return Hg;case 35675:return Gg;case 35676:return Vg;case 5124:case 35670:return Wg;case 35667:case 35671:return qg;case 35668:case 35672:return Xg;case 35669:case 35673:return $g;case 5125:return Yg;case 36294:return Kg;case 36295:return jg;case 36296:return Zg;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return Qg;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return ev}}function iv(i,t){i.uniform1fv(this.addr,t)}function sv(i,t){const e=js(t,this.size,2);i.uniform2fv(this.addr,e)}function rv(i,t){const e=js(t,this.size,3);i.uniform3fv(this.addr,e)}function av(i,t){const e=js(t,this.size,4);i.uniform4fv(this.addr,e)}function ov(i,t){const e=js(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function lv(i,t){const e=js(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function cv(i,t){const e=js(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function hv(i,t){i.uniform1iv(this.addr,t)}function uv(i,t){i.uniform2iv(this.addr,t)}function dv(i,t){i.uniform3iv(this.addr,t)}function fv(i,t){i.uniform4iv(this.addr,t)}function pv(i,t){i.uniform1uiv(this.addr,t)}function mv(i,t){i.uniform2uiv(this.addr,t)}function gv(i,t){i.uniform3uiv(this.addr,t)}function vv(i,t){i.uniform4uiv(this.addr,t)}function xv(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Ju,r[a])}function _v(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||td,r[a])}function Mv(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ed,r[a])}function yv(i,t,e){const n=this.cache,s=t.length,r=$a(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Qu,r[a])}function bv(i){switch(i){case 5126:return iv;case 35664:return sv;case 35665:return rv;case 35666:return av;case 35674:return ov;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return dv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return gv;case 36296:return vv;case 35678:case 36198:case 36298:case 36306:case 35682:return xv;case 35679:case 36299:case 36307:return _v;case 35680:case 36300:case 36308:case 36293:return Mv;case 36289:case 36303:case 36311:case 36292:return yv}}class Sv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=nv(e.type)}}class Ev{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=bv(e.type)}}class Tv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Io=/(\w+)(\])?(\[|\.)?/g;function vh(i,t){i.seq.push(t),i.map[t.id]=t}function Av(i,t,e){const n=i.name,s=n.length;for(Io.lastIndex=0;;){const r=Io.exec(n),a=Io.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){vh(e,c===void 0?new Sv(o,i,t):new Ev(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new Tv(o),vh(e,d)),e=d}}}class Ea{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Av(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function xh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const wv=37297;let Cv=0;function Rv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const _h=new Ht;function Pv(i){ee._getMatrix(_h,ee.workingColorSpace,i);const t=`mat3( ${_h.elements.map(e=>e.toFixed(4))} )`;switch(ee.getTransfer(i)){case qa:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Mh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Rv(i.getShaderSource(t),a)}else return s}function Iv(i,t){const e=Pv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Lv(i,t){let e;switch(t){case Zf:e="Linear";break;case Jf:e="Reinhard";break;case Qf:e="Cineon";break;case Au:e="ACESFilmic";break;case ep:e="AgX";break;case np:e="Neutral";break;case tp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const na=new O;function Dv(){ee.getLuminanceCoefficients(na);const i=na.x.toFixed(4),t=na.y.toFixed(4),e=na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function kv(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Nv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function pr(i){return i!==""}function yh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zv=/^[ \t]*#include +<([\w\d./]+)>/gm;function zl(i){return i.replace(zv,Ov)}const Fv=new Map;function Ov(i,t){let e=Wt[t];if(e===void 0){const n=Fv.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return zl(e)}const Bv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Sh(i){return i.replace(Bv,Hv)}function Hv(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Eh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Gv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Eu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Tu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ii&&(t="SHADOWMAP_TYPE_VSM"),t}function Vv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Hs:case Gs:t="ENVMAP_TYPE_CUBE";break;case Va:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Wv(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Gs:t="ENVMAP_MODE_REFRACTION";break}return t}function qv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ga:t="ENVMAP_BLENDING_MULTIPLY";break;case Kf:t="ENVMAP_BLENDING_MIX";break;case jf:t="ENVMAP_BLENDING_ADD";break}return t}function Xv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function $v(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Gv(e),c=Vv(e),h=Wv(e),d=qv(e),u=Xv(e),f=Uv(e),m=kv(r),v=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(pr).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(pr).join(`
`),p.length>0&&(p+=`
`)):(g=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),p=[Eh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ci?"#define TONE_MAPPING":"",e.toneMapping!==Ci?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Ci?Lv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Iv("linearToOutputTexel",e.outputColorSpace),Dv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(pr).join(`
`)),a=zl(a),a=yh(a,e),a=bh(a,e),o=zl(o),o=yh(o,e),o=bh(o,e),a=Sh(a),o=Sh(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===zc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===zc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=M+g+a,_=M+p+o,P=xh(s,s.VERTEX_SHADER,x),T=xh(s,s.FRAGMENT_SHADER,_);s.attachShader(v,P),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function E(S){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(v).trim(),D=s.getShaderInfoLog(P).trim(),U=s.getShaderInfoLog(T).trim();let B=!0,V=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,P,T);else{const j=Mh(s,P,"vertex"),z=Mh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+S.name+`
Material Type: `+S.type+`

Program Info Log: `+L+`
`+j+`
`+z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(D===""||U==="")&&(V=!1);V&&(S.diagnostics={runnable:B,programLog:L,vertexShader:{log:D,prefix:g},fragmentShader:{log:U,prefix:p}})}s.deleteShader(P),s.deleteShader(T),w=new Ea(s,v),b=Nv(s,v)}let w;this.getUniforms=function(){return w===void 0&&E(this),w};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,wv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Cv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=T,this}let Yv=0;class Kv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new jv(t),e.set(t,n)),n}}class jv{constructor(t){this.id=Yv++,this.code=t,this.usedTimes=0}}function Zv(i,t,e,n,s,r,a){const o=new Gu,l=new Kv,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,y,S,L,D){const U=L.fog,B=D.geometry,V=b.isMeshStandardMaterial?L.environment:null,j=(b.isMeshStandardMaterial?e:t).get(b.envMap||V),z=j&&j.mapping===Va?j.image.height:null,F=m[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const H=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Y=H!==void 0?H.length:0;let Q=0;B.morphAttributes.position!==void 0&&(Q=1),B.morphAttributes.normal!==void 0&&(Q=2),B.morphAttributes.color!==void 0&&(Q=3);let et,N,tt,ot;if(F){const ce=Hn[F];et=ce.vertexShader,N=ce.fragmentShader}else et=b.vertexShader,N=b.fragmentShader,l.update(b),tt=l.getVertexShaderID(b),ot=l.getFragmentShaderID(b);const it=i.getRenderTarget(),ut=i.state.buffers.depth.getReversed(),xt=D.isInstancedMesh===!0,It=D.isBatchedMesh===!0,le=!!b.map,Gt=!!b.matcap,se=!!j,W=!!b.aoMap,en=!!b.lightMap,$t=!!b.bumpMap,Yt=!!b.normalMap,Lt=!!b.displacementMap,ge=!!b.emissiveMap,Dt=!!b.metalnessMap,I=!!b.roughnessMap,A=b.anisotropy>0,K=b.clearcoat>0,rt=b.dispersion>0,lt=b.iridescence>0,st=b.sheen>0,Ct=b.transmission>0,pt=A&&!!b.anisotropyMap,Mt=K&&!!b.clearcoatMap,te=K&&!!b.clearcoatNormalMap,ct=K&&!!b.clearcoatRoughnessMap,bt=lt&&!!b.iridescenceMap,Ut=lt&&!!b.iridescenceThicknessMap,kt=st&&!!b.sheenColorMap,St=st&&!!b.sheenRoughnessMap,Zt=!!b.specularMap,Vt=!!b.specularColorMap,pe=!!b.specularIntensityMap,G=Ct&&!!b.transmissionMap,ft=Ct&&!!b.thicknessMap,nt=!!b.gradientMap,at=!!b.alphaMap,vt=b.alphaTest>0,mt=!!b.alphaHash,Ft=!!b.extensions;let Ee=Ci;b.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(Ee=i.toneMapping);const qe={shaderID:F,shaderType:b.type,shaderName:b.name,vertexShader:et,fragmentShader:N,defines:b.defines,customVertexShaderID:tt,customFragmentShaderID:ot,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:It,batchingColor:It&&D._colorsTexture!==null,instancing:xt,instancingColor:xt&&D.instanceColor!==null,instancingMorph:xt&&D.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:$s,alphaToCoverage:!!b.alphaToCoverage,map:le,matcap:Gt,envMap:se,envMapMode:se&&j.mapping,envMapCubeUVHeight:z,aoMap:W,lightMap:en,bumpMap:$t,normalMap:Yt,displacementMap:u&&Lt,emissiveMap:ge,normalMapObjectSpace:Yt&&b.normalMapType===rp,normalMapTangentSpace:Yt&&b.normalMapType===rc,metalnessMap:Dt,roughnessMap:I,anisotropy:A,anisotropyMap:pt,clearcoat:K,clearcoatMap:Mt,clearcoatNormalMap:te,clearcoatRoughnessMap:ct,dispersion:rt,iridescence:lt,iridescenceMap:bt,iridescenceThicknessMap:Ut,sheen:st,sheenColorMap:kt,sheenRoughnessMap:St,specularMap:Zt,specularColorMap:Vt,specularIntensityMap:pe,transmission:Ct,transmissionMap:G,thicknessMap:ft,gradientMap:nt,opaque:b.transparent===!1&&b.blending===Ds&&b.alphaToCoverage===!1,alphaMap:at,alphaTest:vt,alphaHash:mt,combine:b.combine,mapUv:le&&v(b.map.channel),aoMapUv:W&&v(b.aoMap.channel),lightMapUv:en&&v(b.lightMap.channel),bumpMapUv:$t&&v(b.bumpMap.channel),normalMapUv:Yt&&v(b.normalMap.channel),displacementMapUv:Lt&&v(b.displacementMap.channel),emissiveMapUv:ge&&v(b.emissiveMap.channel),metalnessMapUv:Dt&&v(b.metalnessMap.channel),roughnessMapUv:I&&v(b.roughnessMap.channel),anisotropyMapUv:pt&&v(b.anisotropyMap.channel),clearcoatMapUv:Mt&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:te&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:kt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:St&&v(b.sheenRoughnessMap.channel),specularMapUv:Zt&&v(b.specularMap.channel),specularColorMapUv:Vt&&v(b.specularColorMap.channel),specularIntensityMapUv:pe&&v(b.specularIntensityMap.channel),transmissionMapUv:G&&v(b.transmissionMap.channel),thicknessMapUv:ft&&v(b.thicknessMap.channel),alphaMapUv:at&&v(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Yt||A),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!B.attributes.uv&&(le||at),fog:!!U,useFog:b.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:ut,skinning:D.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:Q,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&S.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ee,decodeVideoTexture:le&&b.map.isVideoTexture===!0&&ee.getTransfer(b.map.colorSpace)===ue,decodeVideoTextureEmissive:ge&&b.emissiveMap.isVideoTexture===!0&&ee.getTransfer(b.emissiveMap.colorSpace)===ue,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ai,flipSided:b.side===Je,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ft&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ft&&b.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return qe.vertexUv1s=c.has(1),qe.vertexUv2s=c.has(2),qe.vertexUv3s=c.has(3),c.clear(),qe}function p(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const S in b.defines)y.push(S),y.push(b.defines[S]);return b.isRawShaderMaterial===!1&&(M(y,b),x(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function M(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function x(b,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reverseDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),b.push(o.mask)}function _(b){const y=m[b.type];let S;if(y){const L=Hn[y];S=Up.clone(L.uniforms)}else S=b.uniforms;return S}function P(b,y){let S;for(let L=0,D=h.length;L<D;L++){const U=h[L];if(U.cacheKey===y){S=U,++S.usedTimes;break}}return S===void 0&&(S=new $v(i,y,b,r),h.push(S)),S}function T(b){if(--b.usedTimes===0){const y=h.indexOf(b);h[y]=h[h.length-1],h.pop(),b.destroy()}}function E(b){l.remove(b)}function w(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:P,releaseProgram:T,releaseShaderCache:E,programs:h,dispose:w}}function Jv(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Qv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Th(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ah(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,u,f,m,v,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:v,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=v,p.group=g),t++,p}function o(d,u,f,m,v,g){const p=a(d,u,f,m,v,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,m,v,g){const p=a(d,u,f,m,v,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||Qv),n.length>1&&n.sort(u||Th),s.length>1&&s.sort(u||Th)}function h(){for(let d=t,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function t1(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Ah,i.set(n,[a])):s>=r.length?(a=new Ah,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function e1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Pt};break;case"SpotLight":e={position:new O,direction:new O,color:new Pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Pt,groundColor:new Pt};break;case"RectAreaLight":e={color:new Pt,position:new O,halfWidth:new O,halfHeight:new O};break}return i[t.id]=e,e}}}function n1(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let i1=0;function s1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function r1(i){const t=new e1,e=n1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);const s=new O,r=new qt,a=new qt;function o(c){let h=0,d=0,u=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,m=0,v=0,g=0,p=0,M=0,x=0,_=0,P=0,T=0,E=0;c.sort(s1);for(let b=0,y=c.length;b<y;b++){const S=c[b],L=S.color,D=S.intensity,U=S.distance,B=S.shadow&&S.shadow.map?S.shadow.map.texture:null;if(S.isAmbientLight)h+=L.r*D,d+=L.g*D,u+=L.b*D;else if(S.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(S.sh.coefficients[V],D);E++}else if(S.isDirectionalLight){const V=t.get(S);if(V.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){const j=S.shadow,z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=S.shadow.matrix,M++}n.directional[f]=V,f++}else if(S.isSpotLight){const V=t.get(S);V.position.setFromMatrixPosition(S.matrixWorld),V.color.copy(L).multiplyScalar(D),V.distance=U,V.coneCos=Math.cos(S.angle),V.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),V.decay=S.decay,n.spot[v]=V;const j=S.shadow;if(S.map&&(n.spotLightMap[P]=S.map,P++,j.updateMatrices(S),S.castShadow&&T++),n.spotLightMatrix[v]=j.matrix,S.castShadow){const z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=B,_++}v++}else if(S.isRectAreaLight){const V=t.get(S);V.color.copy(L).multiplyScalar(D),V.halfWidth.set(S.width*.5,0,0),V.halfHeight.set(0,S.height*.5,0),n.rectArea[g]=V,g++}else if(S.isPointLight){const V=t.get(S);if(V.color.copy(S.color).multiplyScalar(S.intensity),V.distance=S.distance,V.decay=S.decay,S.castShadow){const j=S.shadow,z=e.get(S);z.shadowIntensity=j.intensity,z.shadowBias=j.bias,z.shadowNormalBias=j.normalBias,z.shadowRadius=j.radius,z.shadowMapSize=j.mapSize,z.shadowCameraNear=j.camera.near,z.shadowCameraFar=j.camera.far,n.pointShadow[m]=z,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=S.shadow.matrix,x++}n.point[m]=V,m++}else if(S.isHemisphereLight){const V=t.get(S);V.skyColor.copy(S.color).multiplyScalar(D),V.groundColor.copy(S.groundColor).multiplyScalar(D),n.hemi[p]=V,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const w=n.hash;(w.directionalLength!==f||w.pointLength!==m||w.spotLength!==v||w.rectAreaLength!==g||w.hemiLength!==p||w.numDirectionalShadows!==M||w.numPointShadows!==x||w.numSpotShadows!==_||w.numSpotMaps!==P||w.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+P-T,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=E,w.directionalLength=f,w.pointLength=m,w.spotLength=v,w.rectAreaLength=g,w.hemiLength=p,w.numDirectionalShadows=M,w.numPointShadows=x,w.numSpotShadows=_,w.numSpotMaps=P,w.numLightProbes=E,n.version=i1++)}function l(c,h){let d=0,u=0,f=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const x=c[p];if(x.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(x.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),a.identity(),r.copy(x.matrixWorld),r.premultiply(g),a.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){const _=n.point[u];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(g),u++}else if(x.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:o,setupView:l,state:n}}function wh(i){const t=new r1(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function a1(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new wh(i),t.set(s,[o])):r>=a.length?(o=new wh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class nd extends as{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=sp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class o1 extends as{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const l1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c1=`uniform sampler2D shadow_pass;
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
}`;function h1(i,t,e){let n=new ac;const s=new Kt,r=new Kt,a=new Ce,o=new nd({depthPacking:zu}),l=new o1,c={},h=e.maxTextureSize,d={[Pi]:Je,[Je]:Pi,[ai]:ai},u=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:l1,fragmentShader:c1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ie;m.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ue(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eu;let p=this.type;this.render=function(T,E,w){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),S=i.getActiveMipmapLevel(),L=i.state;L.setBlending(wi),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const D=p!==ii&&this.type===ii,U=p===ii&&this.type!==ii;for(let B=0,V=T.length;B<V;B++){const j=T[B],z=j.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const F=z.getFrameExtents();if(s.multiply(F),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,z.mapSize.y=r.y)),z.map===null||D===!0||U===!0){const Y=this.type!==ii?{minFilter:gn,magFilter:gn}:{};z.map!==null&&z.map.dispose(),z.map=new is(s.x,s.y,Y),z.map.texture.name=j.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const H=z.getViewportCount();for(let Y=0;Y<H;Y++){const Q=z.getViewport(Y);a.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),L.viewport(a),z.updateMatrices(j,Y),n=z.getFrustum(),_(E,w,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===ii&&M(z,w),z.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(b,y,S)};function M(T,E){const w=t.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new is(s.x,s.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(E,null,w,u,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(E,null,w,f,v,null)}function x(T,E,w,b){let y=null;const S=w.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(S!==void 0)y=S;else if(y=w.isPointLight===!0?l:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const L=y.uuid,D=E.uuid;let U=c[L];U===void 0&&(U={},c[L]=U);let B=U[D];B===void 0&&(B=y.clone(),U[D]=B,E.addEventListener("dispose",P)),y=B}if(y.visible=E.visible,y.wireframe=E.wireframe,b===ii?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,w.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const L=i.properties.get(y);L.light=w}return y}function _(T,E,w,b,y){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===ii)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,T.matrixWorld);const D=t.update(T),U=T.material;if(Array.isArray(U)){const B=D.groups;for(let V=0,j=B.length;V<j;V++){const z=B[V],F=U[z.materialIndex];if(F&&F.visible){const H=x(T,F,b,y);T.onBeforeShadow(i,T,E,w,D,H,z),i.renderBufferDirect(w,null,D,H,T,z),T.onAfterShadow(i,T,E,w,D,H,z)}}}else if(U.visible){const B=x(T,U,b,y);T.onBeforeShadow(i,T,E,w,D,B,null),i.renderBufferDirect(w,null,D,B,T,null),T.onAfterShadow(i,T,E,w,D,B,null)}}const L=T.children;for(let D=0,U=L.length;D<U;D++)_(L[D],E,w,b,y)}function P(T){T.target.removeEventListener("dispose",P);for(const w in c){const b=c[w],y=T.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const u1={[Qo]:tl,[el]:sl,[nl]:rl,[Bs]:il,[tl]:Qo,[sl]:el,[rl]:nl,[il]:Bs};function d1(i,t){function e(){let G=!1;const ft=new Ce;let nt=null;const at=new Ce(0,0,0,0);return{setMask:function(vt){nt!==vt&&!G&&(i.colorMask(vt,vt,vt,vt),nt=vt)},setLocked:function(vt){G=vt},setClear:function(vt,mt,Ft,Ee,qe){qe===!0&&(vt*=Ee,mt*=Ee,Ft*=Ee),ft.set(vt,mt,Ft,Ee),at.equals(ft)===!1&&(i.clearColor(vt,mt,Ft,Ee),at.copy(ft))},reset:function(){G=!1,nt=null,at.set(-1,0,0,0)}}}function n(){let G=!1,ft=!1,nt=null,at=null,vt=null;return{setReversed:function(mt){if(ft!==mt){const Ft=t.get("EXT_clip_control");ft?Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.ZERO_TO_ONE_EXT):Ft.clipControlEXT(Ft.LOWER_LEFT_EXT,Ft.NEGATIVE_ONE_TO_ONE_EXT);const Ee=vt;vt=null,this.setClear(Ee)}ft=mt},getReversed:function(){return ft},setTest:function(mt){mt?it(i.DEPTH_TEST):ut(i.DEPTH_TEST)},setMask:function(mt){nt!==mt&&!G&&(i.depthMask(mt),nt=mt)},setFunc:function(mt){if(ft&&(mt=u1[mt]),at!==mt){switch(mt){case Qo:i.depthFunc(i.NEVER);break;case tl:i.depthFunc(i.ALWAYS);break;case el:i.depthFunc(i.LESS);break;case Bs:i.depthFunc(i.LEQUAL);break;case nl:i.depthFunc(i.EQUAL);break;case il:i.depthFunc(i.GEQUAL);break;case sl:i.depthFunc(i.GREATER);break;case rl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}at=mt}},setLocked:function(mt){G=mt},setClear:function(mt){vt!==mt&&(ft&&(mt=1-mt),i.clearDepth(mt),vt=mt)},reset:function(){G=!1,nt=null,at=null,vt=null,ft=!1}}}function s(){let G=!1,ft=null,nt=null,at=null,vt=null,mt=null,Ft=null,Ee=null,qe=null;return{setTest:function(ce){G||(ce?it(i.STENCIL_TEST):ut(i.STENCIL_TEST))},setMask:function(ce){ft!==ce&&!G&&(i.stencilMask(ce),ft=ce)},setFunc:function(ce,Tn,Kn){(nt!==ce||at!==Tn||vt!==Kn)&&(i.stencilFunc(ce,Tn,Kn),nt=ce,at=Tn,vt=Kn)},setOp:function(ce,Tn,Kn){(mt!==ce||Ft!==Tn||Ee!==Kn)&&(i.stencilOp(ce,Tn,Kn),mt=ce,Ft=Tn,Ee=Kn)},setLocked:function(ce){G=ce},setClear:function(ce){qe!==ce&&(i.clearStencil(ce),qe=ce)},reset:function(){G=!1,ft=null,nt=null,at=null,vt=null,mt=null,Ft=null,Ee=null,qe=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,M=null,x=null,_=null,P=null,T=null,E=new Pt(0,0,0),w=0,b=!1,y=null,S=null,L=null,D=null,U=null;const B=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,j=0;const z=i.getParameter(i.VERSION);z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=j>=1):z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=j>=2);let F=null,H={};const Y=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),et=new Ce().fromArray(Y),N=new Ce().fromArray(Q);function tt(G,ft,nt,at){const vt=new Uint8Array(4),mt=i.createTexture();i.bindTexture(G,mt),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ft=0;Ft<nt;Ft++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ft,0,i.RGBA,1,1,at,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(ft+Ft,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return mt}const ot={};ot[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),it(i.DEPTH_TEST),a.setFunc(Bs),$t(!1),Yt(Ic),it(i.CULL_FACE),W(wi);function it(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function ut(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function xt(G,ft){return d[G]!==ft?(i.bindFramebuffer(G,ft),d[G]=ft,G===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ft),G===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ft),!0):!1}function It(G,ft){let nt=f,at=!1;if(G){nt=u.get(ft),nt===void 0&&(nt=[],u.set(ft,nt));const vt=G.textures;if(nt.length!==vt.length||nt[0]!==i.COLOR_ATTACHMENT0){for(let mt=0,Ft=vt.length;mt<Ft;mt++)nt[mt]=i.COLOR_ATTACHMENT0+mt;nt.length=vt.length,at=!0}}else nt[0]!==i.BACK&&(nt[0]=i.BACK,at=!0);at&&i.drawBuffers(nt)}function le(G){return m!==G?(i.useProgram(G),m=G,!0):!1}const Gt={[Xi]:i.FUNC_ADD,[Lf]:i.FUNC_SUBTRACT,[Df]:i.FUNC_REVERSE_SUBTRACT};Gt[Uf]=i.MIN,Gt[kf]=i.MAX;const se={[Nf]:i.ZERO,[zf]:i.ONE,[Ff]:i.SRC_COLOR,[Zo]:i.SRC_ALPHA,[Wf]:i.SRC_ALPHA_SATURATE,[Gf]:i.DST_COLOR,[Bf]:i.DST_ALPHA,[Of]:i.ONE_MINUS_SRC_COLOR,[Jo]:i.ONE_MINUS_SRC_ALPHA,[Vf]:i.ONE_MINUS_DST_COLOR,[Hf]:i.ONE_MINUS_DST_ALPHA,[qf]:i.CONSTANT_COLOR,[Xf]:i.ONE_MINUS_CONSTANT_COLOR,[$f]:i.CONSTANT_ALPHA,[Yf]:i.ONE_MINUS_CONSTANT_ALPHA};function W(G,ft,nt,at,vt,mt,Ft,Ee,qe,ce){if(G===wi){v===!0&&(ut(i.BLEND),v=!1);return}if(v===!1&&(it(i.BLEND),v=!0),G!==If){if(G!==g||ce!==b){if((p!==Xi||_!==Xi)&&(i.blendEquation(i.FUNC_ADD),p=Xi,_=Xi),ce)switch(G){case Ds:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lc:i.blendFunc(i.ONE,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Ds:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Lc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Dc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}M=null,x=null,P=null,T=null,E.set(0,0,0),w=0,g=G,b=ce}return}vt=vt||ft,mt=mt||nt,Ft=Ft||at,(ft!==p||vt!==_)&&(i.blendEquationSeparate(Gt[ft],Gt[vt]),p=ft,_=vt),(nt!==M||at!==x||mt!==P||Ft!==T)&&(i.blendFuncSeparate(se[nt],se[at],se[mt],se[Ft]),M=nt,x=at,P=mt,T=Ft),(Ee.equals(E)===!1||qe!==w)&&(i.blendColor(Ee.r,Ee.g,Ee.b,qe),E.copy(Ee),w=qe),g=G,b=!1}function en(G,ft){G.side===ai?ut(i.CULL_FACE):it(i.CULL_FACE);let nt=G.side===Je;ft&&(nt=!nt),$t(nt),G.blending===Ds&&G.transparent===!1?W(wi):W(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),a.setFunc(G.depthFunc),a.setTest(G.depthTest),a.setMask(G.depthWrite),r.setMask(G.colorWrite);const at=G.stencilWrite;o.setTest(at),at&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),ge(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function $t(G){y!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),y=G)}function Yt(G){G!==Rf?(it(i.CULL_FACE),G!==S&&(G===Ic?i.cullFace(i.BACK):G===Pf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ut(i.CULL_FACE),S=G}function Lt(G){G!==L&&(V&&i.lineWidth(G),L=G)}function ge(G,ft,nt){G?(it(i.POLYGON_OFFSET_FILL),(D!==ft||U!==nt)&&(i.polygonOffset(ft,nt),D=ft,U=nt)):ut(i.POLYGON_OFFSET_FILL)}function Dt(G){G?it(i.SCISSOR_TEST):ut(i.SCISSOR_TEST)}function I(G){G===void 0&&(G=i.TEXTURE0+B-1),F!==G&&(i.activeTexture(G),F=G)}function A(G,ft,nt){nt===void 0&&(F===null?nt=i.TEXTURE0+B-1:nt=F);let at=H[nt];at===void 0&&(at={type:void 0,texture:void 0},H[nt]=at),(at.type!==G||at.texture!==ft)&&(F!==nt&&(i.activeTexture(nt),F=nt),i.bindTexture(G,ft||ot[G]),at.type=G,at.texture=ft)}function K(){const G=H[F];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function rt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function st(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ct(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function te(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ct(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function kt(G){et.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),et.copy(G))}function St(G){N.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),N.copy(G))}function Zt(G,ft){let nt=c.get(ft);nt===void 0&&(nt=new WeakMap,c.set(ft,nt));let at=nt.get(G);at===void 0&&(at=i.getUniformBlockIndex(ft,G.name),nt.set(G,at))}function Vt(G,ft){const at=c.get(ft).get(G);l.get(ft)!==at&&(i.uniformBlockBinding(ft,at,G.__bindingPointIndex),l.set(ft,at))}function pe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},F=null,H={},d={},u=new WeakMap,f=[],m=null,v=!1,g=null,p=null,M=null,x=null,_=null,P=null,T=null,E=new Pt(0,0,0),w=0,b=!1,y=null,S=null,L=null,D=null,U=null,et.set(0,0,i.canvas.width,i.canvas.height),N.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:it,disable:ut,bindFramebuffer:xt,drawBuffers:It,useProgram:le,setBlending:W,setMaterial:en,setFlipSided:$t,setCullFace:Yt,setLineWidth:Lt,setPolygonOffset:ge,setScissorTest:Dt,activeTexture:I,bindTexture:A,unbindTexture:K,compressedTexImage2D:rt,compressedTexImage3D:lt,texImage2D:bt,texImage3D:Ut,updateUBOMapping:Zt,uniformBlockBinding:Vt,texStorage2D:te,texStorage3D:ct,texSubImage2D:st,texSubImage3D:Ct,compressedTexSubImage2D:pt,compressedTexSubImage3D:Mt,scissor:kt,viewport:St,reset:pe}}function Ch(i,t,e,n){const s=f1(n);switch(e){case Iu:return i*t;case Du:return i*t;case Uu:return i*t*2;case Wa:return i*t/s.components*s.byteLength;case nc:return i*t/s.components*s.byteLength;case ku:return i*t*2/s.components*s.byteLength;case ic:return i*t*2/s.components*s.byteLength;case Lu:return i*t*3/s.components*s.byteLength;case Nn:return i*t*4/s.components*s.byteLength;case sc:return i*t*4/s.components*s.byteLength;case _a:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ya:case ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ul:case fl:return Math.max(i,16)*Math.max(t,8)/4;case hl:case dl:return Math.max(i,8)*Math.max(t,8)/2;case pl:case ml:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case gl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case vl:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xl:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case _l:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ml:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case yl:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case bl:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Sl:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case El:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Tl:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Al:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case wl:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Cl:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Rl:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Pl:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Sa:case Il:case Ll:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Nu:case Dl:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ul:case kl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function f1(i){switch(i){case Yn:case Cu:return{byteLength:1,components:1};case Mr:case Ru:case Cr:return{byteLength:2,components:1};case tc:case ec:return{byteLength:2,components:4};case ns:case Ql:case Gn:return{byteLength:4,components:1};case Pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function p1(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Kt,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,A){return f?new OffscreenCanvas(I,A):La("canvas")}function v(I,A,K){let rt=1;const lt=Dt(I);if((lt.width>K||lt.height>K)&&(rt=K/Math.max(lt.width,lt.height)),rt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const st=Math.floor(rt*lt.width),Ct=Math.floor(rt*lt.height);d===void 0&&(d=m(st,Ct));const pt=A?m(st,Ct):d;return pt.width=st,pt.height=Ct,pt.getContext("2d").drawImage(I,0,0,st,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+st+"x"+Ct+")."),pt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(I,A,K,rt,lt=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let st=A;if(A===i.RED&&(K===i.FLOAT&&(st=i.R32F),K===i.HALF_FLOAT&&(st=i.R16F),K===i.UNSIGNED_BYTE&&(st=i.R8)),A===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(st=i.R8UI),K===i.UNSIGNED_SHORT&&(st=i.R16UI),K===i.UNSIGNED_INT&&(st=i.R32UI),K===i.BYTE&&(st=i.R8I),K===i.SHORT&&(st=i.R16I),K===i.INT&&(st=i.R32I)),A===i.RG&&(K===i.FLOAT&&(st=i.RG32F),K===i.HALF_FLOAT&&(st=i.RG16F),K===i.UNSIGNED_BYTE&&(st=i.RG8)),A===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(st=i.RG8UI),K===i.UNSIGNED_SHORT&&(st=i.RG16UI),K===i.UNSIGNED_INT&&(st=i.RG32UI),K===i.BYTE&&(st=i.RG8I),K===i.SHORT&&(st=i.RG16I),K===i.INT&&(st=i.RG32I)),A===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(st=i.RGB8UI),K===i.UNSIGNED_SHORT&&(st=i.RGB16UI),K===i.UNSIGNED_INT&&(st=i.RGB32UI),K===i.BYTE&&(st=i.RGB8I),K===i.SHORT&&(st=i.RGB16I),K===i.INT&&(st=i.RGB32I)),A===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(st=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(st=i.RGBA16UI),K===i.UNSIGNED_INT&&(st=i.RGBA32UI),K===i.BYTE&&(st=i.RGBA8I),K===i.SHORT&&(st=i.RGBA16I),K===i.INT&&(st=i.RGBA32I)),A===i.RGB&&K===i.UNSIGNED_INT_5_9_9_9_REV&&(st=i.RGB9_E5),A===i.RGBA){const Ct=lt?qa:ee.getTransfer(rt);K===i.FLOAT&&(st=i.RGBA32F),K===i.HALF_FLOAT&&(st=i.RGBA16F),K===i.UNSIGNED_BYTE&&(st=Ct===ue?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(st=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(st=i.RGB5_A1)}return(st===i.R16F||st===i.R32F||st===i.RG16F||st===i.RG32F||st===i.RGBA16F||st===i.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function _(I,A){let K;return I?A===null||A===ns||A===Vs?K=i.DEPTH24_STENCIL8:A===Gn?K=i.DEPTH32F_STENCIL8:A===Mr&&(K=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ns||A===Vs?K=i.DEPTH_COMPONENT24:A===Gn?K=i.DEPTH_COMPONENT32F:A===Mr&&(K=i.DEPTH_COMPONENT16),K}function P(I,A){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==gn&&I.minFilter!==kn?Math.log2(Math.max(A.width,A.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?A.mipmaps.length:1}function T(I){const A=I.target;A.removeEventListener("dispose",T),w(A),A.isVideoTexture&&h.delete(A)}function E(I){const A=I.target;A.removeEventListener("dispose",E),y(A)}function w(I){const A=n.get(I);if(A.__webglInit===void 0)return;const K=I.source,rt=u.get(K);if(rt){const lt=rt[A.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&b(I),Object.keys(rt).length===0&&u.delete(K)}n.remove(I)}function b(I){const A=n.get(I);i.deleteTexture(A.__webglTexture);const K=I.source,rt=u.get(K);delete rt[A.__cacheKey],a.memory.textures--}function y(I){const A=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(A.__webglFramebuffer[rt]))for(let lt=0;lt<A.__webglFramebuffer[rt].length;lt++)i.deleteFramebuffer(A.__webglFramebuffer[rt][lt]);else i.deleteFramebuffer(A.__webglFramebuffer[rt]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[rt])}else{if(Array.isArray(A.__webglFramebuffer))for(let rt=0;rt<A.__webglFramebuffer.length;rt++)i.deleteFramebuffer(A.__webglFramebuffer[rt]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let rt=0;rt<A.__webglColorRenderbuffer.length;rt++)A.__webglColorRenderbuffer[rt]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[rt]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const K=I.textures;for(let rt=0,lt=K.length;rt<lt;rt++){const st=n.get(K[rt]);st.__webglTexture&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),n.remove(K[rt])}n.remove(I)}let S=0;function L(){S=0}function D(){const I=S;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),S+=1,I}function U(I){const A=[];return A.push(I.wrapS),A.push(I.wrapT),A.push(I.wrapR||0),A.push(I.magFilter),A.push(I.minFilter),A.push(I.anisotropy),A.push(I.internalFormat),A.push(I.format),A.push(I.type),A.push(I.generateMipmaps),A.push(I.premultiplyAlpha),A.push(I.flipY),A.push(I.unpackAlignment),A.push(I.colorSpace),A.join()}function B(I,A){const K=n.get(I);if(I.isVideoTexture&&Lt(I),I.isRenderTargetTexture===!1&&I.version>0&&K.__version!==I.version){const rt=I.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{N(K,I,A);return}}e.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+A)}function V(I,A){const K=n.get(I);if(I.version>0&&K.__version!==I.version){N(K,I,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+A)}function j(I,A){const K=n.get(I);if(I.version>0&&K.__version!==I.version){N(K,I,A);return}e.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+A)}function z(I,A){const K=n.get(I);if(I.version>0&&K.__version!==I.version){tt(K,I,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+A)}const F={[ll]:i.REPEAT,[Ji]:i.CLAMP_TO_EDGE,[cl]:i.MIRRORED_REPEAT},H={[gn]:i.NEAREST,[ip]:i.NEAREST_MIPMAP_NEAREST,[Nr]:i.NEAREST_MIPMAP_LINEAR,[kn]:i.LINEAR,[no]:i.LINEAR_MIPMAP_NEAREST,[Qi]:i.LINEAR_MIPMAP_LINEAR},Y={[ap]:i.NEVER,[dp]:i.ALWAYS,[op]:i.LESS,[Fu]:i.LEQUAL,[lp]:i.EQUAL,[up]:i.GEQUAL,[cp]:i.GREATER,[hp]:i.NOTEQUAL};function Q(I,A){if(A.type===Gn&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===kn||A.magFilter===no||A.magFilter===Nr||A.magFilter===Qi||A.minFilter===kn||A.minFilter===no||A.minFilter===Nr||A.minFilter===Qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,F[A.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,F[A.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,F[A.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,H[A.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,H[A.minFilter]),A.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Y[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===gn||A.minFilter!==Nr&&A.minFilter!==Qi||A.type===Gn&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const K=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function et(I,A){let K=!1;I.__webglInit===void 0&&(I.__webglInit=!0,A.addEventListener("dispose",T));const rt=A.source;let lt=u.get(rt);lt===void 0&&(lt={},u.set(rt,lt));const st=U(A);if(st!==I.__cacheKey){lt[st]===void 0&&(lt[st]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,K=!0),lt[st].usedTimes++;const Ct=lt[I.__cacheKey];Ct!==void 0&&(lt[I.__cacheKey].usedTimes--,Ct.usedTimes===0&&b(A)),I.__cacheKey=st,I.__webglTexture=lt[st].texture}return K}function N(I,A,K){let rt=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(rt=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(rt=i.TEXTURE_3D);const lt=et(I,A),st=A.source;e.bindTexture(rt,I.__webglTexture,i.TEXTURE0+K);const Ct=n.get(st);if(st.version!==Ct.__version||lt===!0){e.activeTexture(i.TEXTURE0+K);const pt=ee.getPrimaries(ee.workingColorSpace),Mt=A.colorSpace===Ai?null:ee.getPrimaries(A.colorSpace),te=A.colorSpace===Ai||pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ct=v(A.image,!1,s.maxTextureSize);ct=ge(A,ct);const bt=r.convert(A.format,A.colorSpace),Ut=r.convert(A.type);let kt=x(A.internalFormat,bt,Ut,A.colorSpace,A.isVideoTexture);Q(rt,A);let St;const Zt=A.mipmaps,Vt=A.isVideoTexture!==!0,pe=Ct.__version===void 0||lt===!0,G=st.dataReady,ft=P(A,ct);if(A.isDepthTexture)kt=_(A.format===Ws,A.type),pe&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,kt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,kt,ct.width,ct.height,0,bt,Ut,null));else if(A.isDataTexture)if(Zt.length>0){Vt&&pe&&e.texStorage2D(i.TEXTURE_2D,ft,kt,Zt[0].width,Zt[0].height);for(let nt=0,at=Zt.length;nt<at;nt++)St=Zt[nt],Vt?G&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,St.width,St.height,bt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,nt,kt,St.width,St.height,0,bt,Ut,St.data);A.generateMipmaps=!1}else Vt?(pe&&e.texStorage2D(i.TEXTURE_2D,ft,kt,ct.width,ct.height),G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct.width,ct.height,bt,Ut,ct.data)):e.texImage2D(i.TEXTURE_2D,0,kt,ct.width,ct.height,0,bt,Ut,ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Vt&&pe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,kt,Zt[0].width,Zt[0].height,ct.depth);for(let nt=0,at=Zt.length;nt<at;nt++)if(St=Zt[nt],A.format!==Nn)if(bt!==null)if(Vt){if(G)if(A.layerUpdates.size>0){const vt=Ch(St.width,St.height,A.format,A.type);for(const mt of A.layerUpdates){const Ft=St.data.subarray(mt*vt/St.data.BYTES_PER_ELEMENT,(mt+1)*vt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,mt,St.width,St.height,1,bt,Ft)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ct.depth,bt,St.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,nt,kt,St.width,St.height,ct.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Vt?G&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,nt,0,0,0,St.width,St.height,ct.depth,bt,Ut,St.data):e.texImage3D(i.TEXTURE_2D_ARRAY,nt,kt,St.width,St.height,ct.depth,0,bt,Ut,St.data)}else{Vt&&pe&&e.texStorage2D(i.TEXTURE_2D,ft,kt,Zt[0].width,Zt[0].height);for(let nt=0,at=Zt.length;nt<at;nt++)St=Zt[nt],A.format!==Nn?bt!==null?Vt?G&&e.compressedTexSubImage2D(i.TEXTURE_2D,nt,0,0,St.width,St.height,bt,St.data):e.compressedTexImage2D(i.TEXTURE_2D,nt,kt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?G&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,St.width,St.height,bt,Ut,St.data):e.texImage2D(i.TEXTURE_2D,nt,kt,St.width,St.height,0,bt,Ut,St.data)}else if(A.isDataArrayTexture)if(Vt){if(pe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ft,kt,ct.width,ct.height,ct.depth),G)if(A.layerUpdates.size>0){const nt=Ch(ct.width,ct.height,A.format,A.type);for(const at of A.layerUpdates){const vt=ct.data.subarray(at*nt/ct.data.BYTES_PER_ELEMENT,(at+1)*nt/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,at,ct.width,ct.height,1,bt,Ut,vt)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,bt,Ut,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,ct.width,ct.height,ct.depth,0,bt,Ut,ct.data);else if(A.isData3DTexture)Vt?(pe&&e.texStorage3D(i.TEXTURE_3D,ft,kt,ct.width,ct.height,ct.depth),G&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,bt,Ut,ct.data)):e.texImage3D(i.TEXTURE_3D,0,kt,ct.width,ct.height,ct.depth,0,bt,Ut,ct.data);else if(A.isFramebufferTexture){if(pe)if(Vt)e.texStorage2D(i.TEXTURE_2D,ft,kt,ct.width,ct.height);else{let nt=ct.width,at=ct.height;for(let vt=0;vt<ft;vt++)e.texImage2D(i.TEXTURE_2D,vt,kt,nt,at,0,bt,Ut,null),nt>>=1,at>>=1}}else if(Zt.length>0){if(Vt&&pe){const nt=Dt(Zt[0]);e.texStorage2D(i.TEXTURE_2D,ft,kt,nt.width,nt.height)}for(let nt=0,at=Zt.length;nt<at;nt++)St=Zt[nt],Vt?G&&e.texSubImage2D(i.TEXTURE_2D,nt,0,0,bt,Ut,St):e.texImage2D(i.TEXTURE_2D,nt,kt,bt,Ut,St);A.generateMipmaps=!1}else if(Vt){if(pe){const nt=Dt(ct);e.texStorage2D(i.TEXTURE_2D,ft,kt,nt.width,nt.height)}G&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Ut,ct)}else e.texImage2D(i.TEXTURE_2D,0,kt,bt,Ut,ct);g(A)&&p(rt),Ct.__version=st.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function tt(I,A,K){if(A.image.length!==6)return;const rt=et(I,A),lt=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+K);const st=n.get(lt);if(lt.version!==st.__version||rt===!0){e.activeTexture(i.TEXTURE0+K);const Ct=ee.getPrimaries(ee.workingColorSpace),pt=A.colorSpace===Ai?null:ee.getPrimaries(A.colorSpace),Mt=A.colorSpace===Ai||Ct===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const te=A.isCompressedTexture||A.image[0].isCompressedTexture,ct=A.image[0]&&A.image[0].isDataTexture,bt=[];for(let at=0;at<6;at++)!te&&!ct?bt[at]=v(A.image[at],!0,s.maxCubemapSize):bt[at]=ct?A.image[at].image:A.image[at],bt[at]=ge(A,bt[at]);const Ut=bt[0],kt=r.convert(A.format,A.colorSpace),St=r.convert(A.type),Zt=x(A.internalFormat,kt,St,A.colorSpace),Vt=A.isVideoTexture!==!0,pe=st.__version===void 0||rt===!0,G=lt.dataReady;let ft=P(A,Ut);Q(i.TEXTURE_CUBE_MAP,A);let nt;if(te){Vt&&pe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Zt,Ut.width,Ut.height);for(let at=0;at<6;at++){nt=bt[at].mipmaps;for(let vt=0;vt<nt.length;vt++){const mt=nt[vt];A.format!==Nn?kt!==null?Vt?G&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,0,0,mt.width,mt.height,kt,mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,Zt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,0,0,mt.width,mt.height,kt,St,mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt,Zt,mt.width,mt.height,0,kt,St,mt.data)}}}else{if(nt=A.mipmaps,Vt&&pe){nt.length>0&&ft++;const at=Dt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ft,Zt,at.width,at.height)}for(let at=0;at<6;at++)if(ct){Vt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,bt[at].width,bt[at].height,kt,St,bt[at].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Zt,bt[at].width,bt[at].height,0,kt,St,bt[at].data);for(let vt=0;vt<nt.length;vt++){const Ft=nt[vt].image[at].image;Vt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,0,0,Ft.width,Ft.height,kt,St,Ft.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,Zt,Ft.width,Ft.height,0,kt,St,Ft.data)}}else{Vt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,kt,St,bt[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Zt,kt,St,bt[at]);for(let vt=0;vt<nt.length;vt++){const mt=nt[vt];Vt?G&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,0,0,kt,St,mt.image[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,vt+1,Zt,kt,St,mt.image[at])}}}g(A)&&p(i.TEXTURE_CUBE_MAP),st.__version=lt.version,A.onUpdate&&A.onUpdate(A)}I.__version=A.version}function ot(I,A,K,rt,lt,st){const Ct=r.convert(K.format,K.colorSpace),pt=r.convert(K.type),Mt=x(K.internalFormat,Ct,pt,K.colorSpace),te=n.get(A),ct=n.get(K);if(ct.__renderTarget=A,!te.__hasExternalTextures){const bt=Math.max(1,A.width>>st),Ut=Math.max(1,A.height>>st);lt===i.TEXTURE_3D||lt===i.TEXTURE_2D_ARRAY?e.texImage3D(lt,st,Mt,bt,Ut,A.depth,0,Ct,pt,null):e.texImage2D(lt,st,Mt,bt,Ut,0,Ct,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Yt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,lt,ct.__webglTexture,0,$t(A)):(lt===i.TEXTURE_2D||lt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,rt,lt,ct.__webglTexture,st),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(I,A,K){if(i.bindRenderbuffer(i.RENDERBUFFER,I),A.depthBuffer){const rt=A.depthTexture,lt=rt&&rt.isDepthTexture?rt.type:null,st=_(A.stencilBuffer,lt),Ct=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=$t(A);Yt(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,st,A.width,A.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,st,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,st,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ct,i.RENDERBUFFER,I)}else{const rt=A.textures;for(let lt=0;lt<rt.length;lt++){const st=rt[lt],Ct=r.convert(st.format,st.colorSpace),pt=r.convert(st.type),Mt=x(st.internalFormat,Ct,pt,st.colorSpace),te=$t(A);K&&Yt(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,te,Mt,A.width,A.height):Yt(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,te,Mt,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ut(I,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const rt=n.get(A.depthTexture);rt.__renderTarget=A,(!rt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),B(A.depthTexture,0);const lt=rt.__webglTexture,st=$t(A);if(A.depthTexture.format===Us)Yt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,lt,0);else if(A.depthTexture.format===Ws)Yt(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function xt(I){const A=n.get(I),K=I.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==I.depthTexture){const rt=I.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),rt){const lt=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,rt.removeEventListener("dispose",lt)};rt.addEventListener("dispose",lt),A.__depthDisposeCallback=lt}A.__boundDepthTexture=rt}if(I.depthTexture&&!A.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");ut(A.__webglFramebuffer,I)}else if(K){A.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[rt]),A.__webglDepthbuffer[rt]===void 0)A.__webglDepthbuffer[rt]=i.createRenderbuffer(),it(A.__webglDepthbuffer[rt],I,!1);else{const lt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=A.__webglDepthbuffer[rt];i.bindRenderbuffer(i.RENDERBUFFER,st),i.framebufferRenderbuffer(i.FRAMEBUFFER,lt,i.RENDERBUFFER,st)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),it(A.__webglDepthbuffer,I,!1);else{const rt=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,lt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function It(I,A,K){const rt=n.get(I);A!==void 0&&ot(rt.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&xt(I)}function le(I){const A=I.texture,K=n.get(I),rt=n.get(A);I.addEventListener("dispose",E);const lt=I.textures,st=I.isWebGLCubeRenderTarget===!0,Ct=lt.length>1;if(Ct||(rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture()),rt.__version=A.version,a.memory.textures++),st){K.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer[pt]=[];for(let Mt=0;Mt<A.mipmaps.length;Mt++)K.__webglFramebuffer[pt][Mt]=i.createFramebuffer()}else K.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){K.__webglFramebuffer=[];for(let pt=0;pt<A.mipmaps.length;pt++)K.__webglFramebuffer[pt]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(Ct)for(let pt=0,Mt=lt.length;pt<Mt;pt++){const te=n.get(lt[pt]);te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&Yt(I)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let pt=0;pt<lt.length;pt++){const Mt=lt[pt];K.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[pt]);const te=r.convert(Mt.format,Mt.colorSpace),ct=r.convert(Mt.type),bt=x(Mt.internalFormat,te,ct,Mt.colorSpace,I.isXRRenderTarget===!0),Ut=$t(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,bt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,K.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),it(K.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(st){e.bindTexture(i.TEXTURE_CUBE_MAP,rt.__webglTexture),Q(i.TEXTURE_CUBE_MAP,A);for(let pt=0;pt<6;pt++)if(A.mipmaps&&A.mipmaps.length>0)for(let Mt=0;Mt<A.mipmaps.length;Mt++)ot(K.__webglFramebuffer[pt][Mt],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt);else ot(K.__webglFramebuffer[pt],I,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(A)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let pt=0,Mt=lt.length;pt<Mt;pt++){const te=lt[pt],ct=n.get(te);e.bindTexture(i.TEXTURE_2D,ct.__webglTexture),Q(i.TEXTURE_2D,te),ot(K.__webglFramebuffer,I,te,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),g(te)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,rt.__webglTexture),Q(pt,A),A.mipmaps&&A.mipmaps.length>0)for(let Mt=0;Mt<A.mipmaps.length;Mt++)ot(K.__webglFramebuffer[Mt],I,A,i.COLOR_ATTACHMENT0,pt,Mt);else ot(K.__webglFramebuffer,I,A,i.COLOR_ATTACHMENT0,pt,0);g(A)&&p(pt),e.unbindTexture()}I.depthBuffer&&xt(I)}function Gt(I){const A=I.textures;for(let K=0,rt=A.length;K<rt;K++){const lt=A[K];if(g(lt)){const st=M(I),Ct=n.get(lt).__webglTexture;e.bindTexture(st,Ct),p(st),e.unbindTexture()}}}const se=[],W=[];function en(I){if(I.samples>0){if(Yt(I)===!1){const A=I.textures,K=I.width,rt=I.height;let lt=i.COLOR_BUFFER_BIT;const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ct=n.get(I),pt=A.length>1;if(pt)for(let Mt=0;Mt<A.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let Mt=0;Mt<A.length;Mt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(lt|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(lt|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[Mt]);const te=n.get(A[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,te,0)}i.blitFramebuffer(0,0,K,rt,0,0,K,rt,lt,i.NEAREST),l===!0&&(se.length=0,W.length=0,se.push(i.COLOR_ATTACHMENT0+Mt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(se.push(st),W.push(st),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,W)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,se))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Mt=0;Mt<A.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,Ct.__webglColorRenderbuffer[Mt]);const te=n.get(A[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ct.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,te,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const A=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function $t(I){return Math.min(s.maxSamples,I.samples)}function Yt(I){const A=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Lt(I){const A=a.render.frame;h.get(I)!==A&&(h.set(I,A),I.update())}function ge(I,A){const K=I.colorSpace,rt=I.format,lt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||K!==$s&&K!==Ai&&(ee.getTransfer(K)===ue?(rt!==Nn||lt!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),A}function Dt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=D,this.resetTextureUnits=L,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=z,this.rebindTextures=It,this.setupRenderTarget=le,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=en,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Yt}function m1(i,t){function e(n,s=Ai){let r;const a=ee.getTransfer(s);if(n===Yn)return i.UNSIGNED_BYTE;if(n===tc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ec)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Cu)return i.BYTE;if(n===Ru)return i.SHORT;if(n===Mr)return i.UNSIGNED_SHORT;if(n===Ql)return i.INT;if(n===ns)return i.UNSIGNED_INT;if(n===Gn)return i.FLOAT;if(n===Cr)return i.HALF_FLOAT;if(n===Iu)return i.ALPHA;if(n===Lu)return i.RGB;if(n===Nn)return i.RGBA;if(n===Du)return i.LUMINANCE;if(n===Uu)return i.LUMINANCE_ALPHA;if(n===Us)return i.DEPTH_COMPONENT;if(n===Ws)return i.DEPTH_STENCIL;if(n===Wa)return i.RED;if(n===nc)return i.RED_INTEGER;if(n===ku)return i.RG;if(n===ic)return i.RG_INTEGER;if(n===sc)return i.RGBA_INTEGER;if(n===_a||n===Ma||n===ya||n===ba)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===_a)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===_a)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ya)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===hl||n===ul||n===dl||n===fl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===hl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ul)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===dl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===fl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===pl||n===ml||n===gl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===pl||n===ml)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===gl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===vl||n===xl||n===_l||n===Ml||n===yl||n===bl||n===Sl||n===El||n===Tl||n===Al||n===wl||n===Cl||n===Rl||n===Pl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===vl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_l)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ml)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===bl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===El)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Tl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Al)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Cl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Rl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pl)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sa||n===Il||n===Ll)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Sa)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Il)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Nu||n===Dl||n===Ul||n===kl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Sa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ul)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class g1 extends bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vn extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const v1={type:"move"};class Lo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(v1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const x1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_1=`
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

}`;class M1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new zn({vertexShader:x1,fragmentShader:_1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ue(new Li(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class y1 extends Ys{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null;const v=new M1,g=e.getContextAttributes();let p=null,M=null;const x=[],_=[],P=new Kt;let T=null;const E=new bn;E.viewport=new Ce;const w=new bn;w.viewport=new Ce;const b=[E,w],y=new g1;let S=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let tt=x[N];return tt===void 0&&(tt=new Lo,x[N]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(N){let tt=x[N];return tt===void 0&&(tt=new Lo,x[N]=tt),tt.getGripSpace()},this.getHand=function(N){let tt=x[N];return tt===void 0&&(tt=new Lo,x[N]=tt),tt.getHandSpace()};function D(N){const tt=_.indexOf(N.inputSource);if(tt===-1)return;const ot=x[tt];ot!==void 0&&(ot.update(N.inputSource,N.frame,c||a),ot.dispatchEvent({type:N.type,data:N.inputSource}))}function U(){s.removeEventListener("select",D),s.removeEventListener("selectstart",D),s.removeEventListener("selectend",D),s.removeEventListener("squeeze",D),s.removeEventListener("squeezestart",D),s.removeEventListener("squeezeend",D),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",B);for(let N=0;N<x.length;N++){const tt=_[N];tt!==null&&(_[N]=null,x[N].disconnect(tt))}S=null,L=null,v.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,M=null,et.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){r=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){o=N,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(N){c=N},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(N){if(s=N,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",D),s.addEventListener("selectstart",D),s.addEventListener("selectend",D),s.addEventListener("squeeze",D),s.addEventListener("squeezestart",D),s.addEventListener("squeezeend",D),s.addEventListener("end",U),s.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(P),s.renderState.layers===void 0){const tt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new is(f.framebufferWidth,f.framebufferHeight,{format:Nn,type:Yn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let tt=null,ot=null,it=null;g.depth&&(it=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=g.stencil?Ws:Us,ot=g.stencil?Vs:ns);const ut={colorFormat:e.RGBA8,depthFormat:it,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(ut),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new is(u.textureWidth,u.textureHeight,{format:Nn,type:Yn,depthTexture:new Zu(u.textureWidth,u.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(N){for(let tt=0;tt<N.removed.length;tt++){const ot=N.removed[tt],it=_.indexOf(ot);it>=0&&(_[it]=null,x[it].disconnect(ot))}for(let tt=0;tt<N.added.length;tt++){const ot=N.added[tt];let it=_.indexOf(ot);if(it===-1){for(let xt=0;xt<x.length;xt++)if(xt>=_.length){_.push(ot),it=xt;break}else if(_[xt]===null){_[xt]=ot,it=xt;break}if(it===-1)break}const ut=x[it];ut&&ut.connect(ot)}}const V=new O,j=new O;function z(N,tt,ot){V.setFromMatrixPosition(tt.matrixWorld),j.setFromMatrixPosition(ot.matrixWorld);const it=V.distanceTo(j),ut=tt.projectionMatrix.elements,xt=ot.projectionMatrix.elements,It=ut[14]/(ut[10]-1),le=ut[14]/(ut[10]+1),Gt=(ut[9]+1)/ut[5],se=(ut[9]-1)/ut[5],W=(ut[8]-1)/ut[0],en=(xt[8]+1)/xt[0],$t=It*W,Yt=It*en,Lt=it/(-W+en),ge=Lt*-W;if(tt.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(ge),N.translateZ(Lt),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert(),ut[10]===-1)N.projectionMatrix.copy(tt.projectionMatrix),N.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Dt=It+Lt,I=le+Lt,A=$t-ge,K=Yt+(it-ge),rt=Gt*le/I*Dt,lt=se*le/I*Dt;N.projectionMatrix.makePerspective(A,K,rt,lt,Dt,I),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}}function F(N,tt){tt===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(tt.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(s===null)return;let tt=N.near,ot=N.far;v.texture!==null&&(v.depthNear>0&&(tt=v.depthNear),v.depthFar>0&&(ot=v.depthFar)),y.near=w.near=E.near=tt,y.far=w.far=E.far=ot,(S!==y.near||L!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),S=y.near,L=y.far),E.layers.mask=N.layers.mask|2,w.layers.mask=N.layers.mask|4,y.layers.mask=E.layers.mask|w.layers.mask;const it=N.parent,ut=y.cameras;F(y,it);for(let xt=0;xt<ut.length;xt++)F(ut[xt],it);ut.length===2?z(y,E,w):y.projectionMatrix.copy(E.projectionMatrix),H(N,y,it)};function H(N,tt,ot){ot===null?N.matrix.copy(tt.matrixWorld):(N.matrix.copy(ot.matrixWorld),N.matrix.invert(),N.matrix.multiply(tt.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(tt.projectionMatrix),N.projectionMatrixInverse.copy(tt.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=Nl*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(N){l=N,u!==null&&(u.fixedFoveation=N),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=N)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let Y=null;function Q(N,tt){if(h=tt.getViewerPose(c||a),m=tt,h!==null){const ot=h.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let it=!1;ot.length!==y.cameras.length&&(y.cameras.length=0,it=!0);for(let xt=0;xt<ot.length;xt++){const It=ot[xt];let le=null;if(f!==null)le=f.getViewport(It);else{const se=d.getViewSubImage(u,It);le=se.viewport,xt===0&&(t.setRenderTargetTextures(M,se.colorTexture,u.ignoreDepthValues?void 0:se.depthStencilTexture),t.setRenderTarget(M))}let Gt=b[xt];Gt===void 0&&(Gt=new bn,Gt.layers.enable(xt),Gt.viewport=new Ce,b[xt]=Gt),Gt.matrix.fromArray(It.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(It.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(le.x,le.y,le.width,le.height),xt===0&&(y.matrix.copy(Gt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),it===!0&&y.cameras.push(Gt)}const ut=s.enabledFeatures;if(ut&&ut.includes("depth-sensing")){const xt=d.getDepthInformation(ot[0]);xt&&xt.isValid&&xt.texture&&v.init(t,xt,s.renderState)}}for(let ot=0;ot<x.length;ot++){const it=_[ot],ut=x[ot];it!==null&&ut!==void 0&&ut.update(it,tt,c||a)}Y&&Y(N,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),m=null}const et=new Ku;et.setAnimationLoop(Q),this.setAnimationLoop=function(N){Y=N},this.dispose=function(){}}}const Oi=new vn,b1=new qt;function S1(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Xu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,x,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,M,x):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Je&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Je&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),x=M.envMap,_=M.envMapRotation;x&&(g.envMap.value=x,Oi.copy(_),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),g.envMapRotation.value.setFromMatrix4(b1.makeRotationFromEuler(Oi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,M,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=x*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function E1(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,x){const _=x.program;n.uniformBlockBinding(M,_)}function c(M,x){let _=s[M.id];_===void 0&&(m(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",g));const P=x.program;n.updateUBOMapping(M,P);const T=t.render.frame;r[M.id]!==T&&(u(M),r[M.id]=T)}function h(M){const x=d();M.__bindingPointIndex=x;const _=i.createBuffer(),P=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,_),_}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const x=s[M.id],_=M.uniforms,P=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,E=_.length;T<E;T++){const w=Array.isArray(_[T])?_[T]:[_[T]];for(let b=0,y=w.length;b<y;b++){const S=w[b];if(f(S,T,b,P)===!0){const L=S.__offset,D=Array.isArray(S.value)?S.value:[S.value];let U=0;for(let B=0;B<D.length;B++){const V=D[B],j=v(V);typeof V=="number"||typeof V=="boolean"?(S.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,L+U,S.__data)):V.isMatrix3?(S.__data[0]=V.elements[0],S.__data[1]=V.elements[1],S.__data[2]=V.elements[2],S.__data[3]=0,S.__data[4]=V.elements[3],S.__data[5]=V.elements[4],S.__data[6]=V.elements[5],S.__data[7]=0,S.__data[8]=V.elements[6],S.__data[9]=V.elements[7],S.__data[10]=V.elements[8],S.__data[11]=0):(V.toArray(S.__data,U),U+=j.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,L,S.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,x,_,P){const T=M.value,E=x+"_"+_;if(P[E]===void 0)return typeof T=="number"||typeof T=="boolean"?P[E]=T:P[E]=T.clone(),!0;{const w=P[E];if(typeof T=="number"||typeof T=="boolean"){if(w!==T)return P[E]=T,!0}else if(w.equals(T)===!1)return w.copy(T),!0}return!1}function m(M){const x=M.uniforms;let _=0;const P=16;for(let E=0,w=x.length;E<w;E++){const b=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,S=b.length;y<S;y++){const L=b[y],D=Array.isArray(L.value)?L.value:[L.value];for(let U=0,B=D.length;U<B;U++){const V=D[U],j=v(V),z=_%P,F=z%j.boundary,H=z+F;_+=F,H!==0&&P-H<j.storage&&(_+=P-H),L.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=_,_+=j.storage}}}const T=_%P;return T>0&&(_+=P-T),M.__size=_,M.__cache={},this}function v(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function g(M){const x=M.target;x.removeEventListener("dispose",g);const _=a.indexOf(x.__bindingPointIndex);a.splice(_,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class T1{constructor(t={}){const{canvas:e=pp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const M=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=an,this.toneMapping=Ci,this.toneMappingExposure=1;const _=this;let P=!1,T=0,E=0,w=null,b=-1,y=null;const S=new Ce,L=new Ce;let D=null;const U=new Pt(0);let B=0,V=e.width,j=e.height,z=1,F=null,H=null;const Y=new Ce(0,0,V,j),Q=new Ce(0,0,V,j);let et=!1;const N=new ac;let tt=!1,ot=!1;const it=new qt,ut=new qt,xt=new O,It=new Ce,le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function se(){return w===null?z:1}let W=n;function en(C,q){return e.getContext(C,q)}try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Jl}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),W===null){const q="webgl2";if(W=en(q,C),W===null)throw en(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let $t,Yt,Lt,ge,Dt,I,A,K,rt,lt,st,Ct,pt,Mt,te,ct,bt,Ut,kt,St,Zt,Vt,pe,G;function ft(){$t=new Ig(W),$t.init(),Vt=new m1(W,$t),Yt=new Tg(W,$t,t,Vt),Lt=new d1(W,$t),Yt.reverseDepthBuffer&&u&&Lt.buffers.depth.setReversed(!0),ge=new Ug(W),Dt=new Jv,I=new p1(W,$t,Lt,Dt,Yt,Vt,ge),A=new wg(_),K=new Pg(_),rt=new Hp(W),pe=new Sg(W,rt),lt=new Lg(W,rt,ge,pe),st=new Ng(W,lt,rt,ge),kt=new kg(W,Yt,I),ct=new Ag(Dt),Ct=new Zv(_,A,K,$t,Yt,pe,ct),pt=new S1(_,Dt),Mt=new t1,te=new a1($t),Ut=new bg(_,A,K,Lt,st,f,l),bt=new h1(_,st,Yt),G=new E1(W,ge,Yt,Lt),St=new Eg(W,$t,ge),Zt=new Dg(W,$t,ge),ge.programs=Ct.programs,_.capabilities=Yt,_.extensions=$t,_.properties=Dt,_.renderLists=Mt,_.shadowMap=bt,_.state=Lt,_.info=ge}ft();const nt=new y1(_,W);this.xr=nt,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){const C=$t.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=$t.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(C){C!==void 0&&(z=C,this.setSize(V,j,!1))},this.getSize=function(C){return C.set(V,j)},this.setSize=function(C,q,Z=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=C,j=q,e.width=Math.floor(C*z),e.height=Math.floor(q*z),Z===!0&&(e.style.width=C+"px",e.style.height=q+"px"),this.setViewport(0,0,C,q)},this.getDrawingBufferSize=function(C){return C.set(V*z,j*z).floor()},this.setDrawingBufferSize=function(C,q,Z){V=C,j=q,z=Z,e.width=Math.floor(C*Z),e.height=Math.floor(q*Z),this.setViewport(0,0,C,q)},this.getCurrentViewport=function(C){return C.copy(S)},this.getViewport=function(C){return C.copy(Y)},this.setViewport=function(C,q,Z,J){C.isVector4?Y.set(C.x,C.y,C.z,C.w):Y.set(C,q,Z,J),Lt.viewport(S.copy(Y).multiplyScalar(z).round())},this.getScissor=function(C){return C.copy(Q)},this.setScissor=function(C,q,Z,J){C.isVector4?Q.set(C.x,C.y,C.z,C.w):Q.set(C,q,Z,J),Lt.scissor(L.copy(Q).multiplyScalar(z).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(C){Lt.setScissorTest(et=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){H=C},this.getClearColor=function(C){return C.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(C=!0,q=!0,Z=!0){let J=0;if(C){let X=!1;if(w!==null){const ht=w.texture.format;X=ht===sc||ht===ic||ht===nc}if(X){const ht=w.texture.type,gt=ht===Yn||ht===ns||ht===Mr||ht===Vs||ht===tc||ht===ec,Et=Ut.getClearColor(),Tt=Ut.getClearAlpha(),zt=Et.r,Ot=Et.g,At=Et.b;gt?(m[0]=zt,m[1]=Ot,m[2]=At,m[3]=Tt,W.clearBufferuiv(W.COLOR,0,m)):(v[0]=zt,v[1]=Ot,v[2]=At,v[3]=Tt,W.clearBufferiv(W.COLOR,0,v))}else J|=W.COLOR_BUFFER_BIT}q&&(J|=W.DEPTH_BUFFER_BIT),Z&&(J|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),Mt.dispose(),te.dispose(),Dt.dispose(),A.dispose(),K.dispose(),st.dispose(),pe.dispose(),G.dispose(),Ct.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",gc),nt.removeEventListener("sessionend",vc),Di.stop()};function at(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const C=ge.autoReset,q=bt.enabled,Z=bt.autoUpdate,J=bt.needsUpdate,X=bt.type;ft(),ge.autoReset=C,bt.enabled=q,bt.autoUpdate=Z,bt.needsUpdate=J,bt.type=X}function mt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ft(C){const q=C.target;q.removeEventListener("dispose",Ft),Ee(q)}function Ee(C){qe(C),Dt.remove(C)}function qe(C){const q=Dt.get(C).programs;q!==void 0&&(q.forEach(function(Z){Ct.releaseProgram(Z)}),C.isShaderMaterial&&Ct.releaseShaderCache(C))}this.renderBufferDirect=function(C,q,Z,J,X,ht){q===null&&(q=le);const gt=X.isMesh&&X.matrixWorld.determinant()<0,Et=Dd(C,q,Z,J,X);Lt.setMaterial(J,gt);let Tt=Z.index,zt=1;if(J.wireframe===!0){if(Tt=lt.getWireframeAttribute(Z),Tt===void 0)return;zt=2}const Ot=Z.drawRange,At=Z.attributes.position;let ne=Ot.start*zt,me=(Ot.start+Ot.count)*zt;ht!==null&&(ne=Math.max(ne,ht.start*zt),me=Math.min(me,(ht.start+ht.count)*zt)),Tt!==null?(ne=Math.max(ne,0),me=Math.min(me,Tt.count)):At!=null&&(ne=Math.max(ne,0),me=Math.min(me,At.count));const ve=me-ne;if(ve<0||ve===1/0)return;pe.setup(X,J,Et,Z,Tt);let nn,re=St;if(Tt!==null&&(nn=rt.get(Tt),re=Zt,re.setIndex(nn)),X.isMesh)J.wireframe===!0?(Lt.setLineWidth(J.wireframeLinewidth*se()),re.setMode(W.LINES)):re.setMode(W.TRIANGLES);else if(X.isLine){let Rt=J.linewidth;Rt===void 0&&(Rt=1),Lt.setLineWidth(Rt*se()),X.isLineSegments?re.setMode(W.LINES):X.isLineLoop?re.setMode(W.LINE_LOOP):re.setMode(W.LINE_STRIP)}else X.isPoints?re.setMode(W.POINTS):X.isSprite&&re.setMode(W.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)re.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))re.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Rt=X._multiDrawStarts,jn=X._multiDrawCounts,ae=X._multiDrawCount,An=Tt?rt.get(Tt).bytesPerElement:1,os=Dt.get(J).currentProgram.getUniforms();for(let hn=0;hn<ae;hn++)os.setValue(W,"_gl_DrawID",hn),re.render(Rt[hn]/An,jn[hn])}else if(X.isInstancedMesh)re.renderInstances(ne,ve,X.count);else if(Z.isInstancedBufferGeometry){const Rt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,jn=Math.min(Z.instanceCount,Rt);re.renderInstances(ne,ve,jn)}else re.render(ne,ve)};function ce(C,q,Z){C.transparent===!0&&C.side===ai&&C.forceSinglePass===!1?(C.side=Je,C.needsUpdate=!0,Lr(C,q,Z),C.side=Pi,C.needsUpdate=!0,Lr(C,q,Z),C.side=ai):Lr(C,q,Z)}this.compile=function(C,q,Z=null){Z===null&&(Z=C),p=te.get(Z),p.init(q),x.push(p),Z.traverseVisible(function(X){X.isLight&&X.layers.test(q.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),C!==Z&&C.traverseVisible(function(X){X.isLight&&X.layers.test(q.layers)&&(p.pushLight(X),X.castShadow&&p.pushShadow(X))}),p.setupLights();const J=new Set;return C.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const ht=X.material;if(ht)if(Array.isArray(ht))for(let gt=0;gt<ht.length;gt++){const Et=ht[gt];ce(Et,Z,X),J.add(Et)}else ce(ht,Z,X),J.add(ht)}),x.pop(),p=null,J},this.compileAsync=function(C,q,Z=null){const J=this.compile(C,q,Z);return new Promise(X=>{function ht(){if(J.forEach(function(gt){Dt.get(gt).currentProgram.isReady()&&J.delete(gt)}),J.size===0){X(C);return}setTimeout(ht,10)}$t.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let Tn=null;function Kn(C){Tn&&Tn(C)}function gc(){Di.stop()}function vc(){Di.start()}const Di=new Ku;Di.setAnimationLoop(Kn),typeof self<"u"&&Di.setContext(self),this.setAnimationLoop=function(C){Tn=C,nt.setAnimationLoop(C),C===null?Di.stop():Di.start()},nt.addEventListener("sessionstart",gc),nt.addEventListener("sessionend",vc),this.render=function(C,q){if(q!==void 0&&q.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(q),q=nt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,q,w),p=te.get(C,x.length),p.init(q),x.push(p),ut.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),N.setFromProjectionMatrix(ut),ot=this.localClippingEnabled,tt=ct.init(this.clippingPlanes,ot),g=Mt.get(C,M.length),g.init(),M.push(g),nt.enabled===!0&&nt.isPresenting===!0){const ht=_.xr.getDepthSensingMesh();ht!==null&&Ja(ht,q,-1/0,_.sortObjects)}Ja(C,q,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(F,H),Gt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,Gt&&Ut.addToRenderList(g,C),this.info.render.frame++,tt===!0&&ct.beginShadows();const Z=p.state.shadowsArray;bt.render(Z,C,q),tt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=g.opaque,X=g.transmissive;if(p.setupLights(),q.isArrayCamera){const ht=q.cameras;if(X.length>0)for(let gt=0,Et=ht.length;gt<Et;gt++){const Tt=ht[gt];_c(J,X,C,Tt)}Gt&&Ut.render(C);for(let gt=0,Et=ht.length;gt<Et;gt++){const Tt=ht[gt];xc(g,C,Tt,Tt.viewport)}}else X.length>0&&_c(J,X,C,q),Gt&&Ut.render(C),xc(g,C,q);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),C.isScene===!0&&C.onAfterRender(_,C,q),pe.resetDefaultState(),b=-1,y=null,x.pop(),x.length>0?(p=x[x.length-1],tt===!0&&ct.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Ja(C,q,Z,J){if(C.visible===!1)return;if(C.layers.test(q.layers)){if(C.isGroup)Z=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(q);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||N.intersectsSprite(C)){J&&It.setFromMatrixPosition(C.matrixWorld).applyMatrix4(ut);const gt=st.update(C),Et=C.material;Et.visible&&g.push(C,gt,Et,Z,It.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||N.intersectsObject(C))){const gt=st.update(C),Et=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),It.copy(C.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),It.copy(gt.boundingSphere.center)),It.applyMatrix4(C.matrixWorld).applyMatrix4(ut)),Array.isArray(Et)){const Tt=gt.groups;for(let zt=0,Ot=Tt.length;zt<Ot;zt++){const At=Tt[zt],ne=Et[At.materialIndex];ne&&ne.visible&&g.push(C,gt,ne,Z,It.z,At)}}else Et.visible&&g.push(C,gt,Et,Z,It.z,null)}}const ht=C.children;for(let gt=0,Et=ht.length;gt<Et;gt++)Ja(ht[gt],q,Z,J)}function xc(C,q,Z,J){const X=C.opaque,ht=C.transmissive,gt=C.transparent;p.setupLightsView(Z),tt===!0&&ct.setGlobalState(_.clippingPlanes,Z),J&&Lt.viewport(S.copy(J)),X.length>0&&Ir(X,q,Z),ht.length>0&&Ir(ht,q,Z),gt.length>0&&Ir(gt,q,Z),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function _c(C,q,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[J.id]===void 0&&(p.state.transmissionRenderTarget[J.id]=new is(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?Cr:Yn,minFilter:Qi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ee.workingColorSpace}));const ht=p.state.transmissionRenderTarget[J.id],gt=J.viewport||S;ht.setSize(gt.z,gt.w);const Et=_.getRenderTarget();_.setRenderTarget(ht),_.getClearColor(U),B=_.getClearAlpha(),B<1&&_.setClearColor(16777215,.5),_.clear(),Gt&&Ut.render(Z);const Tt=_.toneMapping;_.toneMapping=Ci;const zt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),p.setupLightsView(J),tt===!0&&ct.setGlobalState(_.clippingPlanes,J),Ir(C,Z,J),I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht),$t.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let At=0,ne=q.length;At<ne;At++){const me=q[At],ve=me.object,nn=me.geometry,re=me.material,Rt=me.group;if(re.side===ai&&ve.layers.test(J.layers)){const jn=re.side;re.side=Je,re.needsUpdate=!0,Mc(ve,Z,J,nn,re,Rt),re.side=jn,re.needsUpdate=!0,Ot=!0}}Ot===!0&&(I.updateMultisampleRenderTarget(ht),I.updateRenderTargetMipmap(ht))}_.setRenderTarget(Et),_.setClearColor(U,B),zt!==void 0&&(J.viewport=zt),_.toneMapping=Tt}function Ir(C,q,Z){const J=q.isScene===!0?q.overrideMaterial:null;for(let X=0,ht=C.length;X<ht;X++){const gt=C[X],Et=gt.object,Tt=gt.geometry,zt=J===null?gt.material:J,Ot=gt.group;Et.layers.test(Z.layers)&&Mc(Et,q,Z,Tt,zt,Ot)}}function Mc(C,q,Z,J,X,ht){C.onBeforeRender(_,q,Z,J,X,ht),C.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),X.onBeforeRender(_,q,Z,J,C,ht),X.transparent===!0&&X.side===ai&&X.forceSinglePass===!1?(X.side=Je,X.needsUpdate=!0,_.renderBufferDirect(Z,q,J,X,C,ht),X.side=Pi,X.needsUpdate=!0,_.renderBufferDirect(Z,q,J,X,C,ht),X.side=ai):_.renderBufferDirect(Z,q,J,X,C,ht),C.onAfterRender(_,q,Z,J,X,ht)}function Lr(C,q,Z){q.isScene!==!0&&(q=le);const J=Dt.get(C),X=p.state.lights,ht=p.state.shadowsArray,gt=X.state.version,Et=Ct.getParameters(C,X.state,ht,q,Z),Tt=Ct.getProgramCacheKey(Et);let zt=J.programs;J.environment=C.isMeshStandardMaterial?q.environment:null,J.fog=q.fog,J.envMap=(C.isMeshStandardMaterial?K:A).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?q.environmentRotation:C.envMapRotation,zt===void 0&&(C.addEventListener("dispose",Ft),zt=new Map,J.programs=zt);let Ot=zt.get(Tt);if(Ot!==void 0){if(J.currentProgram===Ot&&J.lightsStateVersion===gt)return bc(C,Et),Ot}else Et.uniforms=Ct.getUniforms(C),C.onBeforeCompile(Et,_),Ot=Ct.acquireProgram(Et,Tt),zt.set(Tt,Ot),J.uniforms=Et.uniforms;const At=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(At.clippingPlanes=ct.uniform),bc(C,Et),J.needsLights=kd(C),J.lightsStateVersion=gt,J.needsLights&&(At.ambientLightColor.value=X.state.ambient,At.lightProbe.value=X.state.probe,At.directionalLights.value=X.state.directional,At.directionalLightShadows.value=X.state.directionalShadow,At.spotLights.value=X.state.spot,At.spotLightShadows.value=X.state.spotShadow,At.rectAreaLights.value=X.state.rectArea,At.ltc_1.value=X.state.rectAreaLTC1,At.ltc_2.value=X.state.rectAreaLTC2,At.pointLights.value=X.state.point,At.pointLightShadows.value=X.state.pointShadow,At.hemisphereLights.value=X.state.hemi,At.directionalShadowMap.value=X.state.directionalShadowMap,At.directionalShadowMatrix.value=X.state.directionalShadowMatrix,At.spotShadowMap.value=X.state.spotShadowMap,At.spotLightMatrix.value=X.state.spotLightMatrix,At.spotLightMap.value=X.state.spotLightMap,At.pointShadowMap.value=X.state.pointShadowMap,At.pointShadowMatrix.value=X.state.pointShadowMatrix),J.currentProgram=Ot,J.uniformsList=null,Ot}function yc(C){if(C.uniformsList===null){const q=C.currentProgram.getUniforms();C.uniformsList=Ea.seqWithValue(q.seq,C.uniforms)}return C.uniformsList}function bc(C,q){const Z=Dt.get(C);Z.outputColorSpace=q.outputColorSpace,Z.batching=q.batching,Z.batchingColor=q.batchingColor,Z.instancing=q.instancing,Z.instancingColor=q.instancingColor,Z.instancingMorph=q.instancingMorph,Z.skinning=q.skinning,Z.morphTargets=q.morphTargets,Z.morphNormals=q.morphNormals,Z.morphColors=q.morphColors,Z.morphTargetsCount=q.morphTargetsCount,Z.numClippingPlanes=q.numClippingPlanes,Z.numIntersection=q.numClipIntersection,Z.vertexAlphas=q.vertexAlphas,Z.vertexTangents=q.vertexTangents,Z.toneMapping=q.toneMapping}function Dd(C,q,Z,J,X){q.isScene!==!0&&(q=le),I.resetTextureUnits();const ht=q.fog,gt=J.isMeshStandardMaterial?q.environment:null,Et=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:$s,Tt=(J.isMeshStandardMaterial?K:A).get(J.envMap||gt),zt=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Ot=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),At=!!Z.morphAttributes.position,ne=!!Z.morphAttributes.normal,me=!!Z.morphAttributes.color;let ve=Ci;J.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ve=_.toneMapping);const nn=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,re=nn!==void 0?nn.length:0,Rt=Dt.get(J),jn=p.state.lights;if(tt===!0&&(ot===!0||C!==y)){const xn=C===y&&J.id===b;ct.setState(J,C,xn)}let ae=!1;J.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==jn.state.version||Rt.outputColorSpace!==Et||X.isBatchedMesh&&Rt.batching===!1||!X.isBatchedMesh&&Rt.batching===!0||X.isBatchedMesh&&Rt.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Rt.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Rt.instancing===!1||!X.isInstancedMesh&&Rt.instancing===!0||X.isSkinnedMesh&&Rt.skinning===!1||!X.isSkinnedMesh&&Rt.skinning===!0||X.isInstancedMesh&&Rt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Rt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Rt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Rt.instancingMorph===!1&&X.morphTexture!==null||Rt.envMap!==Tt||J.fog===!0&&Rt.fog!==ht||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==ct.numPlanes||Rt.numIntersection!==ct.numIntersection)||Rt.vertexAlphas!==zt||Rt.vertexTangents!==Ot||Rt.morphTargets!==At||Rt.morphNormals!==ne||Rt.morphColors!==me||Rt.toneMapping!==ve||Rt.morphTargetsCount!==re)&&(ae=!0):(ae=!0,Rt.__version=J.version);let An=Rt.currentProgram;ae===!0&&(An=Lr(J,q,X));let os=!1,hn=!1,Qs=!1;const xe=An.getUniforms(),Fn=Rt.uniforms;if(Lt.useProgram(An.program)&&(os=!0,hn=!0,Qs=!0),J.id!==b&&(b=J.id,hn=!0),os||y!==C){Lt.buffers.depth.getReversed()?(it.copy(C.projectionMatrix),gp(it),vp(it),xe.setValue(W,"projectionMatrix",it)):xe.setValue(W,"projectionMatrix",C.projectionMatrix),xe.setValue(W,"viewMatrix",C.matrixWorldInverse);const pi=xe.map.cameraPosition;pi!==void 0&&pi.setValue(W,xt.setFromMatrixPosition(C.matrixWorld)),Yt.logarithmicDepthBuffer&&xe.setValue(W,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&xe.setValue(W,"isOrthographic",C.isOrthographicCamera===!0),y!==C&&(y=C,hn=!0,Qs=!0)}if(X.isSkinnedMesh){xe.setOptional(W,X,"bindMatrix"),xe.setOptional(W,X,"bindMatrixInverse");const xn=X.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),xe.setValue(W,"boneTexture",xn.boneTexture,I))}X.isBatchedMesh&&(xe.setOptional(W,X,"batchingTexture"),xe.setValue(W,"batchingTexture",X._matricesTexture,I),xe.setOptional(W,X,"batchingIdTexture"),xe.setValue(W,"batchingIdTexture",X._indirectTexture,I),xe.setOptional(W,X,"batchingColorTexture"),X._colorsTexture!==null&&xe.setValue(W,"batchingColorTexture",X._colorsTexture,I));const tr=Z.morphAttributes;if((tr.position!==void 0||tr.normal!==void 0||tr.color!==void 0)&&kt.update(X,Z,An),(hn||Rt.receiveShadow!==X.receiveShadow)&&(Rt.receiveShadow=X.receiveShadow,xe.setValue(W,"receiveShadow",X.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Fn.envMap.value=Tt,Fn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&q.environment!==null&&(Fn.envMapIntensity.value=q.environmentIntensity),hn&&(xe.setValue(W,"toneMappingExposure",_.toneMappingExposure),Rt.needsLights&&Ud(Fn,Qs),ht&&J.fog===!0&&pt.refreshFogUniforms(Fn,ht),pt.refreshMaterialUniforms(Fn,J,z,j,p.state.transmissionRenderTarget[C.id]),Ea.upload(W,yc(Rt),Fn,I)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(Ea.upload(W,yc(Rt),Fn,I),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&xe.setValue(W,"center",X.center),xe.setValue(W,"modelViewMatrix",X.modelViewMatrix),xe.setValue(W,"normalMatrix",X.normalMatrix),xe.setValue(W,"modelMatrix",X.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const xn=J.uniformsGroups;for(let pi=0,mi=xn.length;pi<mi;pi++){const Sc=xn[pi];G.update(Sc,An),G.bind(Sc,An)}}return An}function Ud(C,q){C.ambientLightColor.needsUpdate=q,C.lightProbe.needsUpdate=q,C.directionalLights.needsUpdate=q,C.directionalLightShadows.needsUpdate=q,C.pointLights.needsUpdate=q,C.pointLightShadows.needsUpdate=q,C.spotLights.needsUpdate=q,C.spotLightShadows.needsUpdate=q,C.rectAreaLights.needsUpdate=q,C.hemisphereLights.needsUpdate=q}function kd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(C,q,Z){Dt.get(C.texture).__webglTexture=q,Dt.get(C.depthTexture).__webglTexture=Z;const J=Dt.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Z===void 0,J.__autoAllocateDepthBuffer||$t.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,q){const Z=Dt.get(C);Z.__webglFramebuffer=q,Z.__useDefaultFramebuffer=q===void 0},this.setRenderTarget=function(C,q=0,Z=0){w=C,T=q,E=Z;let J=!0,X=null,ht=!1,gt=!1;if(C){const Tt=Dt.get(C);if(Tt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(W.FRAMEBUFFER,null),J=!1;else if(Tt.__webglFramebuffer===void 0)I.setupRenderTarget(C);else if(Tt.__hasExternalTextures)I.rebindTextures(C,Dt.get(C.texture).__webglTexture,Dt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const At=C.depthTexture;if(Tt.__boundDepthTexture!==At){if(At!==null&&Dt.has(At)&&(C.width!==At.image.width||C.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(C)}}const zt=C.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(gt=!0);const Ot=Dt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ot[q])?X=Ot[q][Z]:X=Ot[q],ht=!0):C.samples>0&&I.useMultisampledRTT(C)===!1?X=Dt.get(C).__webglMultisampledFramebuffer:Array.isArray(Ot)?X=Ot[Z]:X=Ot,S.copy(C.viewport),L.copy(C.scissor),D=C.scissorTest}else S.copy(Y).multiplyScalar(z).floor(),L.copy(Q).multiplyScalar(z).floor(),D=et;if(Lt.bindFramebuffer(W.FRAMEBUFFER,X)&&J&&Lt.drawBuffers(C,X),Lt.viewport(S),Lt.scissor(L),Lt.setScissorTest(D),ht){const Tt=Dt.get(C.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+q,Tt.__webglTexture,Z)}else if(gt){const Tt=Dt.get(C.texture),zt=q||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Tt.__webglTexture,Z||0,zt)}b=-1},this.readRenderTargetPixels=function(C,q,Z,J,X,ht,gt){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=Dt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){Lt.bindFramebuffer(W.FRAMEBUFFER,Et);try{const Tt=C.texture,zt=Tt.format,Ot=Tt.type;if(!Yt.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}q>=0&&q<=C.width-J&&Z>=0&&Z<=C.height-X&&W.readPixels(q,Z,J,X,Vt.convert(zt),Vt.convert(Ot),ht)}finally{const Tt=w!==null?Dt.get(w).__webglFramebuffer:null;Lt.bindFramebuffer(W.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(C,q,Z,J,X,ht,gt){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=Dt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&gt!==void 0&&(Et=Et[gt]),Et){const Tt=C.texture,zt=Tt.format,Ot=Tt.type;if(!Yt.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(q>=0&&q<=C.width-J&&Z>=0&&Z<=C.height-X){Lt.bindFramebuffer(W.FRAMEBUFFER,Et);const At=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,At),W.bufferData(W.PIXEL_PACK_BUFFER,ht.byteLength,W.STREAM_READ),W.readPixels(q,Z,J,X,Vt.convert(zt),Vt.convert(Ot),0);const ne=w!==null?Dt.get(w).__webglFramebuffer:null;Lt.bindFramebuffer(W.FRAMEBUFFER,ne);const me=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await mp(W,me,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,At),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,ht),W.deleteBuffer(At),W.deleteSync(me),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,q=null,Z=0){C.isTexture!==!0&&(fr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),q=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Z),X=Math.floor(C.image.width*J),ht=Math.floor(C.image.height*J),gt=q!==null?q.x:0,Et=q!==null?q.y:0;I.setTexture2D(C,0),W.copyTexSubImage2D(W.TEXTURE_2D,Z,0,0,gt,Et,X,ht),Lt.unbindTexture()},this.copyTextureToTexture=function(C,q,Z=null,J=null,X=0){C.isTexture!==!0&&(fr("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],q=arguments[2],X=arguments[3]||0,Z=null);let ht,gt,Et,Tt,zt,Ot,At,ne,me;const ve=C.isCompressedTexture?C.mipmaps[X]:C.image;Z!==null?(ht=Z.max.x-Z.min.x,gt=Z.max.y-Z.min.y,Et=Z.isBox3?Z.max.z-Z.min.z:1,Tt=Z.min.x,zt=Z.min.y,Ot=Z.isBox3?Z.min.z:0):(ht=ve.width,gt=ve.height,Et=ve.depth||1,Tt=0,zt=0,Ot=0),J!==null?(At=J.x,ne=J.y,me=J.z):(At=0,ne=0,me=0);const nn=Vt.convert(q.format),re=Vt.convert(q.type);let Rt;q.isData3DTexture?(I.setTexture3D(q,0),Rt=W.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(I.setTexture2DArray(q,0),Rt=W.TEXTURE_2D_ARRAY):(I.setTexture2D(q,0),Rt=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,q.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,q.unpackAlignment);const jn=W.getParameter(W.UNPACK_ROW_LENGTH),ae=W.getParameter(W.UNPACK_IMAGE_HEIGHT),An=W.getParameter(W.UNPACK_SKIP_PIXELS),os=W.getParameter(W.UNPACK_SKIP_ROWS),hn=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,ve.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ve.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Tt),W.pixelStorei(W.UNPACK_SKIP_ROWS,zt),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Ot);const Qs=C.isDataArrayTexture||C.isData3DTexture,xe=q.isDataArrayTexture||q.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const Fn=Dt.get(C),tr=Dt.get(q),xn=Dt.get(Fn.__renderTarget),pi=Dt.get(tr.__renderTarget);Lt.bindFramebuffer(W.READ_FRAMEBUFFER,xn.__webglFramebuffer),Lt.bindFramebuffer(W.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let mi=0;mi<Et;mi++)Qs&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Dt.get(C).__webglTexture,X,Ot+mi),C.isDepthTexture?(xe&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,Dt.get(q).__webglTexture,X,me+mi),W.blitFramebuffer(Tt,zt,ht,gt,At,ne,ht,gt,W.DEPTH_BUFFER_BIT,W.NEAREST)):xe?W.copyTexSubImage3D(Rt,X,At,ne,me+mi,Tt,zt,ht,gt):W.copyTexSubImage2D(Rt,X,At,ne,me+mi,Tt,zt,ht,gt);Lt.bindFramebuffer(W.READ_FRAMEBUFFER,null),Lt.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else xe?C.isDataTexture||C.isData3DTexture?W.texSubImage3D(Rt,X,At,ne,me,ht,gt,Et,nn,re,ve.data):q.isCompressedArrayTexture?W.compressedTexSubImage3D(Rt,X,At,ne,me,ht,gt,Et,nn,ve.data):W.texSubImage3D(Rt,X,At,ne,me,ht,gt,Et,nn,re,ve):C.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,X,At,ne,ht,gt,nn,re,ve.data):C.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,X,At,ne,ve.width,ve.height,nn,ve.data):W.texSubImage2D(W.TEXTURE_2D,X,At,ne,ht,gt,nn,re,ve);W.pixelStorei(W.UNPACK_ROW_LENGTH,jn),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ae),W.pixelStorei(W.UNPACK_SKIP_PIXELS,An),W.pixelStorei(W.UNPACK_SKIP_ROWS,os),W.pixelStorei(W.UNPACK_SKIP_IMAGES,hn),X===0&&q.generateMipmaps&&W.generateMipmap(Rt),Lt.unbindTexture()},this.copyTextureToTexture3D=function(C,q,Z=null,J=null,X=0){return C.isTexture!==!0&&(fr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,J=arguments[1]||null,C=arguments[2],q=arguments[3],X=arguments[4]||0),fr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,q,Z,J,X)},this.initRenderTarget=function(C){Dt.get(C).__webglFramebuffer===void 0&&I.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?I.setTextureCube(C,0):C.isData3DTexture?I.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?I.setTexture2DArray(C,0):I.setTexture2D(C,0),Lt.unbindTexture()},this.resetState=function(){T=0,E=0,w=null,Lt.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ee._getDrawingBufferColorSpace(t),e.unpackColorSpace=ee._getUnpackColorSpace()}}class lc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Pt(t),this.near=e,this.far=n}clone(){return new lc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class A1 extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vn,this.environmentIntensity=1,this.environmentRotation=new vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class id extends Qe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=gn,h=gn,d,u){super(null,a,o,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Rh extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ss=new qt,Ph=new qt,ia=[],Ih=new rs,w1=new qt,or=new Ue,lr=new Ks;class we extends Ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Rh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,w1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new rs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ss),Ih.copy(t.boundingBox).applyMatrix4(Ss),this.boundingBox.union(Ih)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ks),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ss),lr.copy(t.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(lr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(or.geometry=this.geometry,or.material=this.material,or.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lr.copy(this.boundingSphere),lr.applyMatrix4(n),t.ray.intersectsSphere(lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ss),Ph.multiplyMatrices(n,Ss),or.matrixWorld=Ph,or.raycast(t,ia);for(let a=0,o=ia.length;a<o;a++){const l=ia[a];l.instanceId=r,l.object=this,e.push(l)}ia.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Rh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new id(new Float32Array(s*this.count),s,this.count,Wa,Gn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class C1 extends as{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Lh=new qt,Fl=new Xa,sa=new Ks,ra=new O;class sd extends Ve{constructor(t=new Ie,e=new C1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),sa.copy(n.boundingSphere),sa.applyMatrix4(s),sa.radius+=r,t.ray.intersectsSphere(sa)===!1)return;Lh.copy(s).invert(),Fl.copy(t.ray).applyMatrix4(Lh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,v=f;m<v;m++){const g=c.getX(m);ra.fromBufferAttribute(d,g),Dh(ra,g,l,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=u,v=f;m<v;m++)ra.fromBufferAttribute(d,m),Dh(ra,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Dh(i,t,e,n,s,r,a){const o=Fl.distanceSqToPoint(i);if(o<e){const l=new O;Fl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class fi extends Ie{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let m=0;const v=[],g=n/2;let p=0;M(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new he(d,3)),this.setAttribute("normal",new he(u,3)),this.setAttribute("uv",new he(f,2));function M(){const _=new O,P=new O;let T=0;const E=(e-t)/n;for(let w=0;w<=r;w++){const b=[],y=w/r,S=y*(e-t)+t;for(let L=0;L<=s;L++){const D=L/s,U=D*l+o,B=Math.sin(U),V=Math.cos(U);P.x=S*B,P.y=-y*n+g,P.z=S*V,d.push(P.x,P.y,P.z),_.set(B,E,V).normalize(),u.push(_.x,_.y,_.z),f.push(D,1-y),b.push(m++)}v.push(b)}for(let w=0;w<s;w++)for(let b=0;b<r;b++){const y=v[b][w],S=v[b+1][w],L=v[b+1][w+1],D=v[b][w+1];(t>0||b!==0)&&(h.push(y,S,D),T+=3),(e>0||b!==r-1)&&(h.push(S,L,D),T+=3)}c.addGroup(p,T,0),p+=T}function x(_){const P=m,T=new Kt,E=new O;let w=0;const b=_===!0?t:e,y=_===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),m++;const S=m;for(let L=0;L<=s;L++){const U=L/s*l+o,B=Math.cos(U),V=Math.sin(U);E.x=b*V,E.y=g*y,E.z=b*B,d.push(E.x,E.y,E.z),u.push(0,y,0),T.x=B*.5+.5,T.y=V*.5*y+.5,f.push(T.x,T.y),m++}for(let L=0;L<s;L++){const D=P+L,U=S+L;_===!0?h.push(U,U+1,D):h.push(U+1,U,D),w+=3}c.addGroup(p,w,_===!0?1:2),p+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class yr extends fi{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new yr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ya extends Ie{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new he(r,3)),this.setAttribute("normal",new he(r.slice(),3)),this.setAttribute("uv",new he(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const x=new O,_=new O,P=new O;for(let T=0;T<e.length;T+=3)f(e[T+0],x),f(e[T+1],_),f(e[T+2],P),l(x,_,P,M)}function l(M,x,_,P){const T=P+1,E=[];for(let w=0;w<=T;w++){E[w]=[];const b=M.clone().lerp(_,w/T),y=x.clone().lerp(_,w/T),S=T-w;for(let L=0;L<=S;L++)L===0&&w===T?E[w][L]=b:E[w][L]=b.clone().lerp(y,L/S)}for(let w=0;w<T;w++)for(let b=0;b<2*(T-w)-1;b++){const y=Math.floor(b/2);b%2===0?(u(E[w][y+1]),u(E[w+1][y]),u(E[w][y])):(u(E[w][y+1]),u(E[w+1][y+1]),u(E[w+1][y]))}}function c(M){const x=new O;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(M),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function h(){const M=new O;for(let x=0;x<r.length;x+=3){M.x=r[x+0],M.y=r[x+1],M.z=r[x+2];const _=g(M)/2/Math.PI+.5,P=p(M)/Math.PI+.5;a.push(_,1-P)}m(),d()}function d(){for(let M=0;M<a.length;M+=6){const x=a[M+0],_=a[M+2],P=a[M+4],T=Math.max(x,_,P),E=Math.min(x,_,P);T>.9&&E<.1&&(x<.2&&(a[M+0]+=1),_<.2&&(a[M+2]+=1),P<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,x){const _=M*3;x.x=t[_+0],x.y=t[_+1],x.z=t[_+2]}function m(){const M=new O,x=new O,_=new O,P=new O,T=new Kt,E=new Kt,w=new Kt;for(let b=0,y=0;b<r.length;b+=9,y+=6){M.set(r[b+0],r[b+1],r[b+2]),x.set(r[b+3],r[b+4],r[b+5]),_.set(r[b+6],r[b+7],r[b+8]),T.set(a[y+0],a[y+1]),E.set(a[y+2],a[y+3]),w.set(a[y+4],a[y+5]),P.copy(M).add(x).add(_).divideScalar(3);const S=g(P);v(T,y+0,M,S),v(E,y+2,x,S),v(w,y+4,_,S)}}function v(M,x,_,P){P<0&&M.x===1&&(a[x]=M.x-1),_.x===0&&_.z===0&&(a[x]=P/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ya(t.vertices,t.indices,t.radius,t.details)}}class cc extends Ya{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cc(t.radius,t.detail)}}class Ka extends Ya{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ka(t.radius,t.detail)}}class ja extends Ie{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/s,f=new O,m=new Kt;for(let v=0;v<=s;v++){for(let g=0;g<=n;g++){const p=r+g/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}d+=u}for(let v=0;v<s;v++){const g=v*(n+1);for(let p=0;p<n;p++){const M=p+g,x=M,_=M+n+1,P=M+n+2,T=M+1;o.push(x,_,T),o.push(_,P,T)}}this.setIndex(o),this.setAttribute("position",new he(l,3)),this.setAttribute("normal",new he(c,3)),this.setAttribute("uv",new he(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ja(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class br extends Ie{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],d=new O,u=new O,f=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const M=[],x=p/n;let _=0;p===0&&a===0?_=.5/e:p===n&&l===Math.PI&&(_=-.5/e);for(let P=0;P<=e;P++){const T=P/e;d.x=-t*Math.cos(s+T*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+x*o),m.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(T+_,1-x),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const x=h[p][M+1],_=h[p][M],P=h[p+1][M],T=h[p+1][M+1];(p!==0||a>0)&&f.push(x,_,T),(p!==n-1||l<Math.PI)&&f.push(_,P,T)}this.setIndex(f),this.setAttribute("position",new he(m,3)),this.setAttribute("normal",new he(v,3)),this.setAttribute("uv",new he(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new br(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class hc extends Ie{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new O,d=new O,u=new O;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const v=m/s*r,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),o.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const v=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,M=(s+1)*f+m;a.push(v,g,M),a.push(g,p,M)}this.setIndex(a),this.setAttribute("position",new he(o,3)),this.setAttribute("normal",new he(l,3)),this.setAttribute("uv",new he(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hc(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class R1 extends as{static get type(){return"MeshPhongMaterial"}constructor(t){super(),this.isMeshPhongMaterial=!0,this.color=new Pt(16777215),this.specular=new Pt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ta extends as{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vn,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class rd extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class P1 extends rd{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Do=new qt,Uh=new O,kh=new O;class I1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kt(512,512),this.map=null,this.mapPass=null,this.matrix=new qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ac,this._frameExtents=new Kt(1,1),this._viewportCount=1,this._viewports=[new Ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Uh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uh),kh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(kh),e.updateMatrixWorld(),Do.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Do),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Do)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class L1 extends I1{constructor(){super(new ju(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class D1 extends rd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new L1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jl);const yn=i=>new Pt(i),_e={uTime:{value:0},uFow:{value:null},uFowOn:{value:1},uWorld:{value:256},uSnow:{value:0},uSnowColor:{value:yn("#f4f7fa")},uGrassA:{value:yn("#6fa84a")},uGrassB:{value:yn("#93c25a")},uLeaf:{value:1},uLeafColor:{value:yn("#6fae46")},uCrop:{value:.35},uCropColor:{value:yn("#86c457")},uFlower:{value:1},uFruit:{value:1},uShallow:{value:yn("#5cb8b2")},uDeep:{value:yn("#1f6079")}},ad=`
uniform float uTime; uniform float uLeaf; uniform float uCrop; uniform float uFlower; uniform float uFruit;
varying vec3 vFowW;
#ifdef TERRAIN
attribute vec2 aGrass; varying vec2 vGrass;
#endif
#ifdef WATER
attribute float aDepth; varying float vDepth;
#endif`,U1=`
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
  return mix(mix(h21(i), h21(i + vec2(1,0)), f.x), mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y); }`,od=`
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
#endif`,k1=`
  { vec4 w = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    w = instanceMatrix * w;
  #endif
    w = modelMatrix * w; vFowW = w.xyz; }
#ifdef TERRAIN
  vGrass = aGrass;
#endif`,N1=`
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
#endif`,z1=`
#ifndef NO_SNOW
  { vec3 wn = inverseTransformDirection(normal, viewMatrix);
    float up = smoothstep(0.42, 0.82, wn.y);
    float patchy = smoothstep(0.2, 0.62, vn(vFowW.xz * 0.33) * 0.55 + 0.45 * uSnow);
    float s = uSnow * up * patchy * SNOW_K;
  #ifdef TERRAIN
    s *= smoothstep(-0.2, 0.7, vFowW.y);
  #endif
    diffuseColor.rgb = mix(diffuseColor.rgb, uSnowColor, clamp(s, 0.0, 1.0)); }
#endif`,F1=`
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
    gl_FragColor.rgb = mix(c, mix(mix(un, exc, ex), c, vis), uFowOn); }`;function uc(i,t={}){const e={SNOW_K:"1.0",WIND_AMP:"0.0",WIND_BYH:"false",...t};return i.defines=Object.assign(i.defines||{},e),i.onBeforeCompile=n=>{for(const s in _e)n.uniforms[s]=_e[s];n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
`+ad).replace("#include <begin_vertex>",`#include <begin_vertex>
`+od).replace("#include <project_vertex>",`#include <project_vertex>
`+k1),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
`+U1).replace("#include <color_fragment>",`#include <color_fragment>
`+N1).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
`+z1).replace("#include <opaque_fragment>",`#include <opaque_fragment>
`+F1)},i.customProgramCacheKey=()=>JSON.stringify(e),i}function ld(i){const t=new nd({depthPacking:zu});return t.defines={WIND_AMP:"0.0",WIND_BYH:"false",...i},t.onBeforeCompile=e=>{for(const n in _e)e.uniforms[n]=_e[n];e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
`+ad).replace("#include <begin_vertex>",`#include <begin_vertex>
`+od)},t.customProgramCacheKey=()=>"d"+JSON.stringify(i),t}const We=(i={},t={})=>uc(new Ta({flatShading:!0,...i}),t);function O1(i){const t=i.hn-1;i.hstep;const e=i.size,n=new Li(e,e,t,t).rotateX(-Math.PI/2).translate(e/2,0,e/2),s=n.attributes.position;for(let p=0;p<s.count;p++)s.setY(p,i.heights[p]);const r=n.toNonIndexed(),a=r.attributes.position,o=a.count,l=new Float32Array(o*3),c=new Float32Array(o*2),h={bed:[.42,.4,.31],sand:[.82,.74,.55],rock:[.55,.53,.49],rock2:[.64,.61,.55]},d=p=>new Pt().setRGB(p[0],p[1],p[2],an),u=Object.fromEntries(Object.entries(h).map(([p,M])=>[p,d(M)])),f=new O,m=new O,v=new O;for(let p=0;p<o;p+=3){f.fromBufferAttribute(a,p),m.fromBufferAttribute(a,p+1),v.fromBufferAttribute(a,p+2);const M=(f.x+m.x+v.x)/3,x=(f.y+m.y+v.y)/3,_=(f.z+m.z+v.z)/3,P=Math.min(e-1,Math.max(0,Math.floor(M))),T=Math.min(e-1,Math.max(0,Math.floor(_))),E=i.terrain[T*e+P],w=Math.abs(new O().subVectors(v,m).cross(new O().subVectors(f,m)).normalize().y),b=.93+(p*2654435761>>>0)/4294967296*.14,y=Cs(M*.045,_*.045,5,2);let S=null,L=0;if(x<-.45)S=u.bed;else if(E===Ca||E===Fs||E===Ri||x<.5)S=u.sand;else if(E===es||w<.66)S=x>6?u.rock2:u.rock;else{L=1;const D=.86+y*.3-Math.min(1,Math.max(0,(x-4)/12))*.08;S=new Pt(D,D,D)}for(let D=0;D<3;D++){const U=(p+D)*3;l[U]=S.r*b,l[U+1]=S.g*b,l[U+2]=S.b*b,c[(p+D)*2]=L,c[(p+D)*2+1]=y}}r.setAttribute("color",new Pe(l,3)),r.setAttribute("aGrass",new Pe(c,2)),r.computeVertexNormals();const g=new Ue(r,We({vertexColors:!0},{TERRAIN:""}));return g.receiveShadow=!0,g.castShadow=!0,g}function B1(i){const t=i.size,e=Math.round(t/1.6),n=new Li(t,t,e,e).rotateX(-Math.PI/2).translate(t/2,0,t/2),s=n.attributes.position,r=new Float32Array(s.count);for(let o=0;o<s.count;o++)r[o]=-Xt(i,s.getX(o),s.getZ(o));n.setAttribute("aDepth",new Pe(r,1));const a=new Ue(n,uc(new R1({color:16777215,specular:10475744,shininess:70,flatShading:!0,transparent:!0,depthWrite:!1}),{WATER:"",NO_SNOW:""}));return a.receiveShadow=!0,a.renderOrder=2,a}const En=Math.PI*2,Nh=new vn,zh=new Ii,Fh=new O,Oh=new O,aa=new O,oa=new Pt;function k(i=0,t=0,e=0,n=0,s=1,r=1,a=1,o=0,l=0){return Nh.set(o,n,l,"YXZ"),zh.setFromEuler(Nh),Fh.set(i,t,e),Oh.set(s,r,a),new qt().compose(Fh,zh,Oh)}function H1(){const i=[-.5,0,.5,.5,0,.5,0,1,.5,.5,0,-.5,-.5,0,-.5,0,1,-.5,-.5,0,.5,0,1,.5,0,1,-.5,-.5,0,.5,0,1,-.5,-.5,0,-.5,.5,0,.5,.5,0,-.5,0,1,-.5,.5,0,.5,0,1,-.5,0,1,.5],t=new Ie;return t.setAttribute("position",new he(i,3)),t}const la={box:new Ne(1,1,1).translate(0,.5,0),cyl5:new fi(.5,.5,1,5).translate(0,.5,0),cyl8:new fi(.5,.5,1,8).translate(0,.5,0),cone4:new yr(.5,1,4).translate(0,.5,0),cone7:new yr(.5,1,7).translate(0,.5,0),ico:new Ka(.5,0),dode:new cc(.5,0),prism:H1()},gr={};for(const i in la)gr[i]=la[i].index?la[i].toNonIndexed():la[i];class dc{constructor(t=Math.random){R(this,"pos",[]);R(this,"col",[]);this.rand=t}add(t,e,n,s=.06){const r=gr[t],a=r.attributes.position;oa.set(e);const o=1+(this.rand()-.5)*s;for(let l=0;l<a.count;l++)aa.fromBufferAttribute(a,l).applyMatrix4(n),this.pos.push(aa.x,aa.y,aa.z),this.col.push(oa.r*o,oa.g*o,oa.b*o);return this}build(){const t=new Ie;return t.setAttribute("position",new he(this.pos,3)),t.setAttribute("color",new he(this.col,3)),t.computeVertexNormals(),t.computeBoundingSphere(),t}}const de=i=>{const t=new dc;return i(t),t.build()};function cd(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const ca=new qt().makeScale(0,0,0);function G1(i){const t=new Vn,e=cd(i.seed*7+1),n=i.size,s={oakT:de(S=>{S.add("cyl5","#6b4a32",k(0,0,0,0,.36,1.8,.36)),S.add("cyl5","#634430",k(.12,1.1,0,0,.14,.8,.14,0,-.9))}),oakC:de(S=>{S.add("ico","#ffffff",k(0,0,0,0,2.4,2,2.4)),S.add("ico","#e6e6e6",k(.75,-.3,.3,.6,1.6,1.35,1.6)),S.add("ico","#f3f3f3",k(-.65,.15,-.45,1.2,1.7,1.45,1.7))}),pineT:de(S=>{S.add("cyl5","#6e4d36",k(0,0,0,0,.3,2.3,.3,0,.07)),S.add("cyl5","#6e4d36",k(-.15,2.18,0,0,.24,1.4,.24,0,-.2))}),pineC:de(S=>{S.add("ico","#ffffff",k(0,0,0,0,3.7,1.15,3.5)),S.add("ico","#e8e8e8",k(.45,.4,.2,.5,2.5,.85,2.4))}),firT:de(S=>S.add("cyl5","#5d4330",k(0,0,0,0,.26,.9,.26))),firC:de(S=>{S.add("cone7","#ffffff",k(0,.6,0,0,2.3,1.9,2.3)),S.add("cone7","#ececec",k(0,1.55,0,.4,1.75,1.7,1.75)),S.add("cone7","#f6f6f6",k(0,2.4,0,.8,1.2,1.5,1.2))})},r=We({vertexColors:!0}),a=[{kind:du,t:s.oakT,c:s.oakC,mat:We({vertexColors:!0},{LEAF:"",CANOPY:"",WIND:"",WIND_AMP:"0.07"}),cy:2.35,depth:{CANOPY:"",WIND:"",WIND_AMP:"0.07"},s:.55},{kind:Xo,t:s.pineT,c:s.pineC,mat:We({vertexColors:!0,color:"#56803e"},{WIND:"",WIND_AMP:"0.05"}),cy:3.45,depth:null,s:.5},{kind:fu,t:s.firT,c:s.firC,mat:We({vertexColors:!0,color:"#3e6a42"},{WIND:"",WIND_AMP:"0.02",WIND_BYH:"true"}),cy:0,depth:null,s:.5}],o=[],l=new Map,c=new Map,h=3,d=(S,L)=>Math.min(h-1,Math.floor(S/n*h))*h+Math.min(h-1,Math.floor(L/n*h));for(const S of a){const L=[];for(let U=0;U<n*n;U++)i.tree[U]===S.kind&&L.push(U);for(let U=L.length-1;U>0;U--){const B=Math.floor(e()*(U+1)),V=L[U];L[U]=L[B],L[B]=V}const D=Array.from({length:h*h},()=>[]);for(const U of L){const B=U%n+.5+(e()-.5)*.4,V=Math.floor(U/n)+.5+(e()-.5)*.4,j=Xt(i,B,V),z=S.s*(.85+e()*.45),F=e()*En;D[d(B,V)].push({mt:k(B,j-.1,V,F,z,z,z),mc:k(B,j-.1+S.cy*z,V,F,z,z,z),c:new Pt(.85+e()*.3,.85+e()*.3,.8+e()*.25),k:U})}for(const U of D){if(!U.length)continue;const B=new we(S.t,r,U.length),V=new we(S.c,S.mat,U.length);U.forEach((j,z)=>{B.setMatrixAt(z,j.mt),V.setMatrixAt(z,j.mc),V.setColorAt(z,j.c),l.set(j.k,{t:B,c:V,i:z})});for(const j of[B,V])j.castShadow=!0,j.receiveShadow=!0,j.computeBoundingSphere(),t.add(j);S.depth&&(V.customDepthMaterial=ld(S.depth)),o.push({t:B,c:V,n:U.length})}}const u=[],f=(S,L,D,U,B=!0)=>{const V=new we(gr.dode,We(),Math.max(1,S.length*U));let j=0;for(const z of S)for(let F=0;F<U;F++){const H=z.x+.5+(e()-.5)*.7,Y=z.z+.5+(e()-.5)*.7,Q=D*(.6+e()*.6);if(V.setMatrixAt(j,k(H,Xt(i,H,Y)+Q*.15,Y,e()*En,Q,Q*(.55+e()*.4),Q,e()*.5,e()*.5)),B){const et=z.z*n+z.x,N=c.get(et)??[];N.push({m:V,i:j}),c.set(et,N)}V.setColorAt(j++,new Pt(L).multiplyScalar(.85+e()*.3))}return V.count=j,V.castShadow=V.receiveShadow=!0,V.computeBoundingSphere(),t.add(V),V};f(i.res.filter(S=>S.kind===di),"#c4bdae",.75,2);const m=i.res.filter(S=>S.kind===Un);u.push(f(m,"#7a6a58",.7,2),f(m,"#4fa58a",.32,2));const v=i.res.filter(S=>S.kind===tn),g=new we(gr.ico,We({color:"#4f7f3a"},{WIND:"",WIND_AMP:"0.03"}),Math.max(1,v.length)),p=new we(gr.ico,We({color:"#c0303a"},{NO_SNOW:"",FRUIT:""}),Math.max(1,v.length*6)),M=new Map,x=new Map;v.forEach((S,L)=>{const D=S.x+.5,U=S.z+.5,B=Xt(i,D,U);g.setMatrixAt(L,k(D,B+.35,U,e()*En,1.05,.85,1.05));const V=[];for(let j=0;j<6;j++){const z=e()*En,F=k(D+Math.cos(z)*.45,B+.35+e()*.35,U+Math.sin(z)*.45,0,.11,.11,.11);p.setMatrixAt(L*6+j,F),V.push(F)}M.set(S.z*n+S.x,V),x.set(S.z*n+S.x,L*6)});for(const S of[g,p])S.castShadow=!0,S.computeBoundingSphere(),t.add(S);const _=de(S=>{for(let L=0;L<3;L++)S.add("cone4","#ffffff",k((L-1)*.12,0,L%2*.1,L*2,.14,.5+L*.08,.14,(L-1)*.3,(L-1)*.25),.15)}),P=[];for(let S=0;S<3e4&&P.length<3200;S++){const L=e()*n,D=e()*n,U=Math.floor(D)*n+Math.floor(L);if(i.terrain[U]!==dr||i.tree[U])continue;const B=Xt(i,L,D);B<.7||B>14||P.push(k(L,B-.02,D,e()*En,.6+e()*.6,.5+e()*.6,.6+e()*.6))}const T=new we(_,We({vertexColors:!0},{GRASSTUFT:"",WIND:"",WIND_AMP:"0.08",WIND_BYH:"true",SNOW_K:"0.6"}),Math.max(1,P.length));return P.forEach((S,L)=>{T.setMatrixAt(L,S),T.setColorAt(L,new Pt(.85+e()*.3,.85+e()*.3,.85+e()*.3))}),T.receiveShadow=!0,T.computeBoundingSphere(),t.add(T),{group:t,trees:o,metal:u,tufts:T,setDensity:(S,L)=>{for(const D of o)D.t.count=D.c.count=Math.floor(D.n*S);T.count=Math.floor(P.length*L)},removeTree:S=>{const L=l.get(S);L&&(L.t.setMatrixAt(L.i,ca),L.c.setMatrixAt(L.i,ca),L.t.instanceMatrix.needsUpdate=L.c.instanceMatrix.needsUpdate=!0,l.delete(S))},removeRes:S=>{const L=c.get(S);if(L){for(const{m:D,i:U}of L)D.setMatrixAt(U,ca),D.instanceMatrix.needsUpdate=!0;c.delete(S)}},setBerries:(S,L)=>{const D=M.get(S),U=x.get(S);!D||U===void 0||(D.forEach((B,V)=>p.setMatrixAt(U+V,L?B:ca)),p.instanceMatrix.needsUpdate=!0)}}}function V1(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ie;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let m=0;m<f.count;++m)d.push(f.getX(m)+h);h+=i[u].attributes.position.count}l.setIndex(d)}for(const h in r){const d=Bh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<a[h].length;++v)f.push(a[h][v][u]);const m=Bh(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Bh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Pe(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let u=0,f=h.count;u<f;u++)for(let m=0;m<e;m++){const v=h.getComponent(u,m);o.setComponent(u+d,m,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const In={emit:(i,t,e,n)=>{}},Bi=new qt().makeScale(0,0,0),W1=["#e3b98f","#d1a074","#b98559","#9a6a45"],q1=["#2a1c12","#3b2817","#5a3a1e","#1f1a17","#6b4a2a"],X1=["#7b5634","#8d6a43","#6a4a2c","#9a7a55"],$1=["#b9a27a","#a08a5c","#8f7a52","#c8b48a"],Y1=["#d9a43a","#7a5634","#bdb6a8","#4f9c85"],K1=["spear","club","axe","pick","mallet","bow","arrow","sword","sling"],Ol="#b5813e";function j1(i){const t=[],e=[],n=new Pt;for(const[r,a]of i){const o=r.index?r.toNonIndexed():r,l=o.attributes.position.array;n.set(a);for(let c=0;c<l.length;c+=3)t.push(l[c],l[c+1],l[c+2]),e.push(n.r,n.g,n.b)}const s=new Ie;return s.setAttribute("position",new he(t,3)),s.setAttribute("color",new he(e,3)),s.computeVertexNormals(),s}const Uo={leg:new Ne(.12,.44,.13).translate(0,-.22,0),skirt:new fi(.17,.22,.26,8).translate(0,-.13,0),torso:new Ne(.34,.42,.22).translate(0,.21,0),arm:new Ne(.09,.38,.09).translate(0,-.19,0),head:new Ka(.13,0),hair:V1([new br(.142,8,2,0,Math.PI*2,0,Math.PI*.36),new br(.142,6,2,Math.PI*.75,Math.PI*1.5,Math.PI*.36,Math.PI*.26)]),shield:new fi(.24,.24,.05,10).rotateX(Math.PI/2),spear:de(i=>{i.add("cyl5","#7a5a3c",k(0,-.55,0,0,.04,1.75,.04),0),i.add("cone4","#9a948a",k(0,1.2,0,0,.07,.2,.07),0)}),club:de(i=>{i.add("cyl5","#6b4a2f",k(0,-.1,0,0,.05,.5,.05),0),i.add("cyl5","#5a3d27",k(0,.35,0,0,.12,.3,.12),0)}),axe:de(i=>{i.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.66,.045),0),i.add("box","#8d8a85",k(0,.43,.07,0,.045,.14,.15),0),i.add("box","#b9b4aa",k(0,.44,.15,0,.03,.12,.03),0)}),pick:de(i=>{i.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.7,.045),0),i.add("box","#8d8a85",k(0,.55,.02,0,.055,.06,.24),0),i.add("cone4","#a29d94",k(0,.58,.14,0,.06,.13,.06,Math.PI/2),0)}),mallet:de(i=>{i.add("cyl5","#7a5a3c",k(0,-.08,0,0,.045,.62,.045),0),i.add("box","#8d8a85",k(0,.45,0,0,.12,.12,.26),0)}),arrow:de(i=>{i.add("cyl5","#8a6a48",k(0,-.3,0,0,.018,.66,.018),0),i.add("cone4","#b9b4aa",k(0,.36,0,0,.045,.1,.045),0),i.add("box","#e8e2d4",k(0,-.3,0,0,.012,.1,.06),0)}),bow:j1([[new hc(.62,.02,4,10,1.1).rotateZ(-.55).rotateY(-Math.PI/2).translate(0,0,-.62),"#6b4a2f"],[new Ne(.008,.65,.008).translate(0,0,-.094),"#ddd6c6"]]),sword:de(i=>{i.add("cyl5","#4a3326",k(0,-.09,0,0,.045,.17,.045),0),i.add("box",Ol,k(0,.07,0,0,.05,.04,.17),0),i.add("box","#c9965a",k(0,.1,0,0,.024,.33,.075),0),i.add("cone4","#c9965a",k(0,.43,0,Math.PI/4,.055,.08,.055),0)}),sling:de(i=>{for(const t of[-1,1])i.add("box","#d8cfb8",k(t*.02,0,0,0,.01,.38,.01,0,-t*.05),0);i.add("box","#7a5634",k(0,.36,0,0,.09,.08,.06),0),i.add("dode","#8f8a80",k(0,.4,0,0,.07,.07,.07),0)}),carry:new Ne(.26,.26,.15)},Hh={body:new Ne(1,1,1),neck:new Ne(1,1,1).translate(0,.5,0),collar:new Ne(1,1,1),head:de(i=>{i.add("box","#ffffff",k(0,-.5,0,0,1,1,.65),0),i.add("box","#e4e4e4",k(0,-.42,.55,0,.72,.66,.5),0)}),ears:de(i=>{for(const t of[-1,1])i.add("cone4","#ffffff",k(t*.07,0,0,0,.07,.13,.05,0,-t*.35),0)}),leg:new Ne(1,1,1).translate(0,-.5,0),tail:new Ne(1,1,1).translate(0,-.5,0),antlers:de(i=>{for(const t of[-1,1])i.add("cyl5","#d8c8a8",k(t*.08,0,0,0,.035,.42,.035,.25,-t*.5),0),i.add("cyl5","#d8c8a8",k(t*.2,.25,.04,0,.03,.26,.03,-.4,-t*.1),0),i.add("cyl5","#d8c8a8",k(t*.25,.3,-.02,0,.03,.22,.03,.5,-t*.9),0)}),horns:de(i=>{for(const t of[-1,1])i.add("cyl5","#e8dcc0",k(t*.12,0,.02,0,.06,.28,.06,0,-t*1.3),0),i.add("cone4","#3a3530",k(t*.36,.08,.05,0,.07,.28,.07,.5,-t*.3),0)}),tusks:de(i=>{for(const t of[-1,1])i.add("cone4","#f0eadc",k(t*.1,0,0,0,.05,.14,.05,0,-t*.5),0)})},ko={body:de(i=>{for(const t of[-1,1])i.add("box","#6e4f37",k(t*.42,.3,0,0,.1,.1,1.6),0),i.add("box","#6e4f37",k(t*.42,.3,.75,0,.1,.26,.1),0),i.add("box","#6e4f37",k(t*.42,.3,-.75,0,.1,.26,.1),0);i.add("box","#6e4f37",k(0,.3,.75,0,.94,.1,.1),0),i.add("box","#6e4f37",k(0,.3,-.75,0,.94,.1,.1),0);for(const t of[-1,1])i.add("box",t<0?"#8d6a46":"#76573a",k(t*.26,.85,0,0,.9,.05,1.7,0,-t*.93),0);i.add("box","#4f3a2a",k(0,1.16,0,0,.1,.1,1.76),0),i.add("prism","#5e4431",k(0,.5,-.84,0,1.04,.7,.05),0),i.add("prism","#5e4431",k(0,.85,.84,0,.52,.35,.05),0)}),wheel:new fi(.22,.22,.08,9).rotateZ(Math.PI/2),log:de(i=>{i.add("cyl8","#5e4431",k(0,0,-.9,0,.22,1.85,.22,Math.PI/2),0),i.add("box","#b5813e",k(0,-.14,.95,0,.3,.28,.26),0),i.add("cone4","#c9965a",k(0,0,1.08,Math.PI/4,.26,.2,.26,Math.PI/2),0);for(const t of[-1,1])i.add("box","#d8cfb8",k(0,0,t*.4,0,.02,.62,.02),0)}),cloth:new Ne(.13,.05,1.5).translate(0,1.25,0)},Wn={deer:{body:[.34,.4,.95],leg:.72,legW:.075,head:[.17,.2,.36],neck:.32,tail:[.08,.12,.06],color:["#8a5a36","#7d5230","#93613b"],antl:!0},boar:{body:[.4,.42,.85],leg:.3,legW:.1,head:[.24,.26,.46],neck:.04,tail:[.04,.14,.04],color:["#3e3229","#4a3b30"],tusks:!0},wolf:{body:[.24,.28,.72],leg:.38,legW:.07,head:[.17,.18,.34],neck:.18,tail:[.07,.34,.07],color:["#77746f","#6a665f"]},aurochs:{body:[.58,.64,1.4],leg:.66,legW:.15,head:[.3,.32,.5],neck:.1,tail:[.06,.42,.06],color:["#2b221d","#3a2a20"],horns:!0},dog:{body:[.2,.24,.58],leg:.32,legW:.06,head:[.15,.16,.3],neck:.16,tail:[.05,.3,.05],color:["#7a6650","#5d4d3c","#8a7a62"]},horse:{body:[.36,.46,1.15],leg:.78,legW:.085,head:[.17,.22,.46],neck:.52,tail:[.08,.5,.08],color:["#6b4a32","#3b2a20","#8a5f3c","#5a3d28"],neckTilt:.72,headTilt:.85,neckW:1}},hd=Wn.horse.leg+Wn.horse.body[1],mr=i=>i*i*(3-2*i);function cr(i,t,e){if(i<.12)return e-.12*Math.sin(i/.12*Math.PI);if(i<.68)return e+(t-e)*mr((i-.12)/.56);if(i<.8)return t;const n=(i-.8)/.2;return t+(e-t)*n*n}const hr=i=>i>.85?(i-.85)/.15:i<.15?1-i/.15:0,Bl=2.6;function ud(i){const t=yt[i]?.key??"";if(t==="horseman")return Wn.horse.leg+Wn.horse.body[1]*.5;if(t==="ram")return .6;const e=Wn[t];return e?e.leg+e.body[1]*.5:.72}function Z1(i){const t=yt[i]?.key??"";if(t==="horseman")return hd+.1;if(t==="ram")return 1.15;const e=Wn[t];return e?e.leg+e.body[1]+.06:1.15}const ur=i=>{let t=Math.imul(i^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),((t^t>>>16)>>>0)/4294967296},ni=(i,t)=>i[Math.floor(t*i.length)%i.length];class J1{constructor(t=720,e=160){R(this,"group",new Vn);R(this,"hm",{});R(this,"am",{});R(this,"rm",{});R(this,"slotR");R(this,"maxR",48);R(this,"ring");R(this,"barBg");R(this,"barFg");R(this,"slotH");R(this,"slotA");R(this,"lookKey",[]);R(this,"heading",new Float32Array(4096));R(this,"phase",new Float32Array(4096));R(this,"lastP",new Float32Array(4096));R(this,"lastCd",new Int16Array(4096));R(this,"lastCarry",new Int16Array(4096));R(this,"m",{b:new qt,hip:new qt,tor:new qt,l:new qt,t:new qt,al:new qt,ar:new qt,hd:new qt});R(this,"e",new vn);R(this,"q",new Ii);R(this,"p",new O);R(this,"s",new O);R(this,"v",new O);R(this,"c",new Pt);this.maxH=t,this.maxA=e;const n=We({},{NO_SNOW:""}),s=We({vertexColors:!0},{NO_SNOW:""});for(const o in Uo){const l=o==="leg"||o==="arm"?t*2:t,c=!!Uo[o].attributes.color,h=new we(Uo[o],c?s:n,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let d=0;d<l;d++)h.setColorAt(d,this.c.set("#ffffff"));this.group.add(h),this.hm[o]=h}for(const o in Hh){const l=o==="leg"?e*4:e,c=["head","ears","antlers","horns","tusks"].includes(o),h=new we(Hh[o],c?s:n,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let d=0;d<l;d++)h.setColorAt(d,this.c.set("#ffffff"));this.group.add(h),this.am[o]=h}for(const o in ko){const l=o==="wheel"?this.maxR*4:this.maxR,c=!!ko[o].attributes.color,h=new we(ko[o],c?s:n,l);h.instanceMatrix.setUsage(mn),h.frustumCulled=!1,h.castShadow=!0,h.count=0;for(let d=0;d<l;d++)h.setColorAt(d,this.c.set(o==="wheel"?"#6b4a2f":"#ffffff"));this.group.add(h),this.rm[o]=h}this.slotR=new Int32Array(this.maxR).fill(-1);const r=new ja(.36,.46,28).rotateX(-Math.PI/2);this.ring=new we(r,new ui({color:16777215,transparent:!0,opacity:.95,depthWrite:!1,toneMapped:!1}),t);const a=new Li(1,.11);this.barBg=new we(a,new ui({color:1711900,transparent:!0,opacity:.75,depthTest:!1,toneMapped:!1}),400),this.barFg=new we(a.clone().translate(.5,0,0),new ui({color:16777215,transparent:!0,opacity:1,depthTest:!1,toneMapped:!1}),400);for(const o of[this.ring,this.barBg,this.barFg])o.instanceMatrix.setUsage(mn),o.frustumCulled=!1,o.count=0,this.group.add(o);this.ring.renderOrder=5,this.barBg.renderOrder=8,this.barFg.renderOrder=9;for(let o=0;o<t;o++)this.ring.setColorAt(o,this.c.set("#9dffc4"));for(let o=0;o<400;o++)this.barFg.setColorAt(o,this.c.set("#6fe08a"));this.slotH=new Int32Array(t).fill(-1),this.slotA=new Int32Array(e).fill(-1)}trs(t,e,n,s,r=0,a=0,o=0,l=1,c=l,h=l){return this.e.set(r,a,o,"YXZ"),this.q.setFromEuler(this.e),this.p.set(e,n,s),this.s.set(l,c,h),t.compose(this.p,this.q,this.s)}look(t,e){const n=ur(e*7+1),s=ur(e*13+5),r=t.owner[e],a=r>=0&&r<t.players.length?t.players[r].era:0,o=r===ci?"#4f6b4a":t.players[r]?.color??"#888",l=yt[t.kind[e]].key,c=ni(W1,n),h=ni(q1,s),d=ni(X1,s),u=ni($1,n),f={skin:c,hair:h,tunic:d,skirt:o,legs:c,arms:c,weapon:null,shield:null,bigHair:!1,sc:.95+n*.08};switch(l){case"villager":return{...f,tunic:a?u:d,arms:a?c:d};case"warrior":return{...f,tunic:o,skirt:d,weapon:"club",sc:1.02};case"axeman":return{...f,tunic:o,skirt:u,weapon:"axe",sc:1.04};case"hunter":return{...f,weapon:"spear"};case"archer":return{...f,tunic:o,skirt:u,weapon:"bow"};case"spearman":return{...f,tunic:o,skirt:u,weapon:"spear",shield:a>=2?Ol:"#8a6a44",sc:1.04,helmet:a>=2};case"swordsman":return{...f,tunic:o,skirt:u,weapon:"sword",shield:"#8a6a44",sc:1.05,helmet:!0};case"slinger":return{...f,tunic:u,skirt:o,weapon:"sling",sc:.98};case"horseman":return{...f,tunic:o,skirt:u,weapon:"spear",helmet:!0,sc:1};case"barbarian":return{...f,tunic:ni(["#4f6b4a","#6b5a3a","#3f5a6a"],n),skirt:"#5a4d3c",legs:"#5a4d3c",weapon:"spear",shield:ni(["#3f6a4a","#8a6a3a"],s),hair:ni(["#c48a4a","#8a5a2a","#d9a35f"],n),bigHair:!0,sc:1.05}}return f}colorHuman(t,e){const n=this.hm,s=this.c;n.leg.setColorAt(t*2,s.set(e.legs)),n.leg.setColorAt(t*2+1,s),n.skirt.setColorAt(t,s.set(e.skirt)),n.torso.setColorAt(t,s.set(e.tunic)),n.arm.setColorAt(t*2,s.set(e.arms)),n.arm.setColorAt(t*2+1,s),n.head.setColorAt(t,s.set(e.skin)),n.hair.setColorAt(t,s.set(e.helmet?Ol:e.hair)),n.shield.setColorAt(t,s.set(e.shield??"#888"));for(const r in n)n[r].instanceColor&&(n[r].instanceColor.needsUpdate=!0)}speciesOf(t,e){const n=t.kind[e]===Qt?t.sub[e]:t.kind[e];return yt[n]?.key??"deer"}update(t,e,n,s,r,a,o,l){const c=t.size,h=t.vis[r],d=this.hm,u=this.am,f=this.rm;let m=0,v=0,g=0,p=0,M=0;for(let x=0;x<t.top;x++){if(!t.alive[x])continue;const _=t.kind[x];if(_>=jt){const z=be[_-jt],F=t.x[x]/256,H=t.z[x]/256;if(a&&t.owner[x]!==r&&!h[Math.floor(H)*c+Math.floor(F)])continue;const Y=Xt(t.map,F,H),Q=s.has(x);Q&&g<this.maxH&&this.ring.setMatrixAt(g++,k(F,Y+.08,H,0,z.size*.95,1,z.size*.95)),(Q||t.hp[x]<z.hp)&&p<400&&this.bar(p++,F,Y+2.3,H,t.hp[x]/z.hp,z.size*.6,l);continue}const P=(t.px[x]+(t.x[x]-t.px[x])*e)/256,T=(t.pz[x]+(t.z[x]-t.pz[x])*e)/256;if(a&&t.owner[x]!==r){const z=Math.floor(P),F=Math.floor(T);if(z<0||F<0||z>=c||F>=c||!h[F*c+z])continue}const E=t.x[x]-t.px[x],w=t.z[x]-t.pz[x],b=(E!==0||w!==0)&&t.state[x]===Ze,y=Xt(t.map,P,T);let S=this.heading[x];if(b)S=Math.atan2(E,w);else if(_!==Qt&&(t.task[x]===ze||t.task[x]===qn||t.task[x]===Ge)&&t.tgt[x]>=0){const z=t.tgt[x];let F,H;t.task[x]===ze&&t.tgtTile[x]?(F=z%c+.5,H=Math.floor(z/c)+.5):(F=t.x[z]/256,H=t.z[z]/256),Math.abs(F-P)+Math.abs(H-T)>.05&&(S=Math.atan2(F-P,H-T))}const L=this.heading[x];this.heading[x]=L+Math.atan2(Math.sin(S-L),Math.cos(S-L))*Math.min(1,n*10);const D=this.heading[x],U=Math.hypot(E,w)/256*10,B=_===Qt?"":yt[_].key,V=_===Qt||t.owner[x]===fe||B==="dog";if(B==="ram"){if(M>=this.maxR)continue;this.phase[x]+=b?n*U/.22:0,this.slotR[M]!==x*8+t.owner[x]+1&&(this.slotR[M]=x*8+t.owner[x]+1,f.cloth.setColorAt(M,this.c.set(t.players[t.owner[x]]?.color??"#888")),f.cloth.instanceColor&&(f.cloth.instanceColor.needsUpdate=!0)),this.poseRam(t,x,M,P,y,T,D,e),M++}else if(B==="horseman"){if(v>=this.maxA||m>=this.maxH)continue;const z=Wn.horse,F=U>1.1;this.phase[x]+=b?n*U*2.6/z.leg:0;const H=x*64+_;if(this.slotA[v]!==H){this.slotA[v]=H;const tt=this.c.set(ni(z.color,ur(x)));for(const ot of["body","neck","head","ears","tail"])u[ot].setColorAt(v,tt);for(let ot=0;ot<4;ot++)u.leg.setColorAt(v*4+ot,tt);u.collar.setColorAt(v,this.c.set(t.players[t.owner[x]]?.color??"#888"));for(const ot in u)u[ot].instanceColor&&(u[ot].instanceColor.needsUpdate=!0)}this.poseAnimal(v,z,P,y,T,D,b,this.phase[x],o,!1,F,!1,1,!1,0,0,!0,!0),v++;const Y=t.owner[x],Q=`${_}:${Y}:${Y>=0&&Y<t.players.length?t.players[Y].era:0}`,et=this.look(t,x);(this.slotH[m]!==x||this.lookKey[m]!==Q)&&(this.slotH[m]=x,this.lookKey[m]=Q,this.colorHuman(m,et));const N=b?Math.abs(Math.cos(this.phase[x]))*(F?.06:.025):0;if(b&&F){const tt=this.phase[x]/Math.PI%2;tt<this.lastP[x]&&In.emit("animal.hooves",P,T,.5),this.lastP[x]=tt}this.poseHuman(t,x,m,et,P,y,T,D,b,o,e,hd+N-.44*et.sc),m++}else if(V){if(v>=this.maxA)continue;const z=this.speciesOf(t,x),F=Wn[z]??Wn.deer;this.phase[x]+=b?n*U*2.6/F.leg:0;const H=x*64+_;if(this.slotA[v]!==H){this.slotA[v]=H;const N=this.c.set(ni(F.color,ur(x)));_===Qt&&N.multiplyScalar(.8);for(const tt of["body","neck","head","ears","tail"])u[tt].setColorAt(v,N);for(let tt=0;tt<4;tt++)u.leg.setColorAt(v*4+tt,N);u.collar.setColorAt(v,this.c.set(t.players[t.owner[x]]?.color??"#888"));for(const tt in u)u[tt].instanceColor&&(u[tt].instanceColor.needsUpdate=!0)}const Y=_!==Qt&&t.task[x]===Ge&&!b;let Q=0,et=0;if(Y){const N=1-Math.max(0,Math.min(1,(t.cd[x]-e)/yt[_].cd));Q=N>.8?(N-.8)/.2:N<.2?1-N/.2:0;const tt=t.tgt[x];if(tt>=0&&t.alive[tt]){const ot=Math.hypot(t.x[tt]-t.x[x],t.z[tt]-t.z[x])/256,it=F.body[2]*.5+F.neck*.3+F.head[2]*.85,ut=t.kind[tt]<Qt?yt[t.kind[tt]].radius:.5;et=Math.max(0,Math.min(F.body[2]*.3,ot-it-ut*.95))}}Y&&t.cd[x]>this.lastCd[x]&&In.emit(z==="boar"?"hit.boar":z==="aurochs"?"hit.aurochs":"hit.bite",P,T),this.lastCd[x]=_===Qt?0:t.cd[x],this.poseAnimal(v,F,P,y,T,D,b,this.phase[x],o,_===Qt,t.fast[x]===1,z==="deer"&&ur(x*3)<.5,_===Qt?1:1+(z==="aurochs"?.1:0),Y,Q,et,t.owner[x]>=0&&_!==Qt),v++}else{if(m>=this.maxH)continue;this.phase[x]+=b?n*U*7.2:0;const z=t.owner[x],F=`${_}:${z}:${z>=0&&z<t.players.length?t.players[z].era:0}`,H=this.look(t,x);(this.slotH[m]!==x||this.lookKey[m]!==F)&&(this.slotH[m]=x,this.lookKey[m]=F,this.colorHuman(m,H)),this.poseHuman(t,x,m,H,P,y,T,D,b,o,e),m++}const j=B==="ram"?1.9:B==="horseman"?1.6:V?1.2:1;s.has(x)&&g<this.maxH&&this.ring.setMatrixAt(g++,k(P,y+.06,T,0,j,1,j)),_!==Qt&&(s.has(x)||t.hp[x]<yt[_].hp)&&p<400&&this.bar(p++,P,y+(B==="horseman"?2.6:B==="ram"?1.75:V?1.3:1.55),T,t.hp[x]/yt[_].hp,B==="ram"||B==="horseman"?.9:.7,l)}for(const x in d)d[x].count=m,d[x].instanceMatrix.needsUpdate=!0;d.leg.count=d.arm.count=m*2;for(const x in u)u[x].count=v,u[x].instanceMatrix.needsUpdate=!0;u.leg.count=v*4;for(const x in f)f[x].count=M,f[x].instanceMatrix.needsUpdate=!0;f.wheel.count=M*4,this.ring.count=g,this.ring.instanceMatrix.needsUpdate=!0,this.barBg.count=this.barFg.count=p,this.barBg.instanceMatrix.needsUpdate=this.barFg.instanceMatrix.needsUpdate=!0,this.barFg.instanceColor&&(this.barFg.instanceColor.needsUpdate=!0)}bar(t,e,n,s,r,a,o){r=Math.max(0,Math.min(1,r)),this.p.set(e,n,s),this.s.set(a,1,1),this.barBg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.v.set(-a/2,0,0).applyQuaternion(o),this.p.set(e+this.v.x,n+this.v.y,s+this.v.z),this.s.set(a*r,1,1),this.barFg.setMatrixAt(t,this.m.l.compose(this.p,o,this.s)),this.barFg.setColorAt(t,this.c.set(r>.6?"#6fe08a":r>.3?"#f2c14e":"#e0533c"))}gripTorso(t,e,n,s,r=0){return this.v.set(0,-.35,n).applyMatrix4(e),t.copy(this.m.tor).setPosition(this.v).multiply(this.trs(this.m.t,0,0,0,s,r))}poseHuman(t,e,n,s,r,a,o,l,c,h,d,u=0){const f=this.hm,m=this.m,v=this.phase[e],g=Math.sin(v),p=h+e*.37,M=u>0;let x=0,_=0,P=.05+Math.sin(p*1.3)*.03,T=-.05-Math.sin(p*1.3)*.03,E=.07,w=-.07,b=0,y=0,S=0,L=0,D=0,U=s.weapon,B=s.weapon==="spear"?"torso":s.weapon==="bow"?"left":"arm",V=s.weapon==="spear"?.12:s.weapon==="bow"?0:s.weapon==="sling"?Math.PI-.12:s.weapon==="sword"?Math.PI-.3:.79,j=0,z=!1,F=0;const H=()=>{w=-.42,E=.42,P=T+.06},Y=t.task[e];if(M&&(c||Y!==Ge||t.state[e]===Ze))P=-.75,E=.1,T=-.25,b=c?.14:.03;else if(c)x=g*.65,_=-g*.65,P=-g*.5,T=g*.5,y=Math.abs(Math.cos(v))*.035;else if(Y===ze&&t.phase[e]===bu){const Q=t.tgt[e],et=t.tgtTile[e]===1,N=et&&t.map.tree[Q]>0,tt=et&&t.resKind[Q]===1,ot=!et&&t.kind[Q]>=jt,it=(ut,xt)=>{const It=p/ut%1;It<this.lastP[e]&&In.emit(xt,r,o),this.lastP[e]=It};if(N)T=cr(p/1%1,-2.75,-1.35),H(),b=.1+hr(p/1%1)*.12,U="axe",B="arm",V=Math.PI-.6,it(1,"work.chop");else if(et&&!tt)T=cr(p/1.15%1,-2.8,-.55),H(),b=.22+hr(p/1.15%1)*.14,U="pick",B="arm",V=Math.PI-.6,it(1.15,t.resKind[Q]===3?"work.pickMetal":"work.pick");else if(ot)T=cr(p/1.4%1,-1.95,-.35),H(),b=.32+hr(p/1.4%1)*.1,U="pick",B="arm",V=Math.PI-.7,it(1.4,"work.hoe");else if(tt){const ut=Math.sin(p*4.5);T=-.95+ut*.45,P=-.95-ut*.45,w=-.2,E=.2,b=.5,U=null,it(1.4,"work.rustle")}else T=-.55+Math.sin(p*7)*.3,P=-.4,b=.68,U=null,it(1.6,"work.rustle")}else if(Y===qn&&t.state[e]!==Ze){const Q=p/.75%1;T=cr(Q,-2.3,-.7),w=-.15,P=-.75,b=.15+hr(Q)*.08,U="mallet",B="arm",V=Math.PI-.75,Q<this.lastP[e]&&In.emit("work.mallet",r,o),this.lastP[e]=Q}else if(Y===Ge&&t.state[e]!==Ze){const Q=yt[t.kind[e]],et=1-Math.max(0,Math.min(1,(t.cd[e]-d)/Q.cd)),N=t.tgt[e],tt=!!Q.hunt&&N>=0&&t.owner[N]===fe;if(t.cd[e]>this.lastCd[e]&&!Q.proj&&!(tt&&N>=0&&t.alive[N]&&t.reach(e,N,!1)/256>=Bl)){const it=N>=0&&t.kind[N]>=jt;In.emit(it?"hit.wall":s.weapon==="sword"?"hit.sword":s.weapon==="axe"?"hit.axe":s.weapon==="spear"?"hit.spear":"hit.club",r,o)}const ot=N>=0&&t.alive[N]?t.reach(e,N,!1)/256:9;if(Q.proj==="arrow"||s.weapon==="bow")U="bow",B="left",V=0,P=-1.5,E=.2,w=-.3,b=-.04,T=et<.2?-.95-et/.2*.5:-1.45,z=et>=.25;else if(Q.proj==="stone")if(U="sling",B="arm",P=-.55,E=.18,b=-.03,et<.2){const it=et/.2;T=-.75-it*2.05,V=Math.PI/2+.7-it*.85}else if(et<.85)T=-2.8,w=-.18,V=Math.PI/2-.1,D=p*15;else{const it=(et-.85)/.15;T=-2.8+mr(it)*2.05,V=Math.PI/2-.1+it*.8,b=-.03+it*.12}else if((Q.proj==="spear"||tt)&&ot>=Bl)if(U=et<.3?null:"spear",B="torso",V=Math.PI/2-.25,j=.1,P=-1,b=-.05,et<.3)T=-1.25+et/.3*1.05,b=.12-et/.3*.17;else if(et<.75)T=-.2-mr((et-.3)/.45)*2.55;else if(et<.9)T=-2.75;else{const it=(et-.9)/.1;T=-2.75+it*it*1.5,b=-.05+it*.17}else if(s.weapon==="spear"||Q.proj==="spear"||tt){if(U="spear",B="torso",j=.05,P=s.shield?-.9:-.5,E=.15,et<.15)T=-1.25;else if(et<.85)T=-1.25+mr((et-.15)/.7)*.9;else{const se=(et-.85)/.15;T=-.35-se*se*.9}b=.06+(et>.85?(et-.85)/.15:et<.15?1-et/.15:0)*.12;let it=ot,ut=.72;const xt=N>=0?Math.hypot(t.x[N]-t.x[e],t.z[N]-t.z[e])/256:ot;if(N>=0&&t.alive[N]&&t.kind[N]<Qt){const se=Wn[yt[t.kind[N]].key];if(ut=ud(t.kind[N]),se){const W=Math.cos(Math.atan2(t.x[e]-t.x[N],t.z[e]-t.z[N])-this.heading[N]);it=xt-Math.max(se.body[0]*.55,se.body[2]*.5*Math.abs(W))}else{const W=yt[t.kind[N]].radius;it=xt-(W>.35?W*.85:.2)}}const It=.35*Math.sin(-T),le=(.84-.35*Math.cos(T))*s.sc+u,Gt=Math.atan2(le-ut,Math.max(.4,xt-It));V=Math.PI/2+Gt,F=Math.max(0,It+1.4*Math.cos(Gt)-it+.03)}else{U||(U="club");const ut=(N>=0&&t.alive[N]?t.kind[N]>=jt?1:Z1(t.kind[N]):.6)+(U==="sword"?.18:0);let xt=-.6;for(;xt>-2.2&&(.84-.35*Math.cos(xt)-.5*Math.cos(xt-.75))*s.sc+u<ut;)xt-=.05;B="arm",V=Math.PI-.75,T=cr(et,-2.6,Math.max(-2.25,xt)),w=-.15,P=-.5,b=.08+hr(et)*.12,U==="sword"&&(D=.22)}}M&&(x=_=-.38,S=.5,L=-.5),this.lastCd[e]=t.cd[e],this.lastCarry[e]>0&&t.carry[e]===0&&t.task[e]===ze&&In.emit(["drop.food","drop.wood","drop.stone","drop.metal"][t.carryRes[e]]??"drop.food",r,o),this.lastCarry[e]=t.carry[e],this.trs(m.b,r,a+y+u,o,0,l,0,s.sc),m.hip.multiplyMatrices(m.b,this.trs(m.t,0,.46,0)),m.tor.multiplyMatrices(m.hip,this.trs(m.t,0,0,0,b)),f.torso.setMatrixAt(n,m.tor),f.leg.setMatrixAt(n*2,m.l.multiplyMatrices(m.hip,this.trs(m.t,.09,0,0,x,0,S))),f.leg.setMatrixAt(n*2+1,m.l.multiplyMatrices(m.hip,this.trs(m.t,-.09,0,0,_,0,L))),f.skirt.setMatrixAt(n,m.l.multiplyMatrices(m.hip,this.trs(m.t,0,.03,0,b*.35))),m.al.multiplyMatrices(m.tor,this.trs(m.t,.215,.38,0,P,0,-E)),f.arm.setMatrixAt(n*2,m.al),m.ar.multiplyMatrices(m.tor,this.trs(m.t,-.215,.38,0,T,0,-w)),f.arm.setMatrixAt(n*2+1,m.ar),m.hd.multiplyMatrices(m.tor,this.trs(m.t,0,.53,0,-b*.6)),f.head.setMatrixAt(n,m.hd),f.hair.setMatrixAt(n,m.l.multiplyMatrices(m.hd,this.trs(m.t,0,.03,-.012,0,0,0,s.bigHair?1.18:1))),s.shield?(this.v.set(.04,-.24,.13).applyMatrix4(m.al),f.shield.setMatrixAt(n,m.l.copy(m.tor).setPosition(this.v))):f.shield.setMatrixAt(n,Bi);for(const Q of K1)f[Q].setMatrixAt(n,Bi);U&&(B==="arm"?f[U].setMatrixAt(n,m.l.multiplyMatrices(m.ar,this.trs(m.t,0,-.35,0,V,D))):(this.gripTorso(m.l,B==="left"?m.al:m.ar,B==="left"?.02:0,V,B==="torso"?j:0),F&&m.l.multiply(this.trs(m.t,0,-F,0)),f[U].setMatrixAt(n,m.l))),z&&f.arrow.setMatrixAt(n,this.gripTorso(m.l,m.al,.02,Math.PI/2,-.12)),t.carry[e]>0?(f.carry.setMatrixAt(n,m.l.multiplyMatrices(m.tor,this.trs(m.t,0,.2,-.19))),f.carry.setColorAt(n,this.c.set(Y1[t.carryRes[e]]??"#888")),f.carry.instanceColor&&(f.carry.instanceColor.needsUpdate=!0)):f.carry.setMatrixAt(n,Bi)}poseAnimal(t,e,n,s,r,a,o,l,c,h,d,u,f,m=!1,v=0,g=0,p=!1,M=!1){const x=this.am,_=this.m,[P,T,E]=e.body,[w,b,y]=e.head,S=e.leg+T*.5,L=o?Math.sin(l)*(d?.8:.45):0,D=o?Math.abs(Math.cos(l))*(d?.06:.025):0;h?this.trs(_.b,n,s+P*.5-S*0,r,0,a,Math.PI/2,f):this.trs(_.b,n,s+D,r,0,a,0,f),h&&_.b.multiply(this.trs(_.t,0,-S+P*.1,0)),v>0&&_.b.multiply(this.trs(_.t,0,0,g*v,.1*v)),x.body.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S,0,0,0,0,P,T,E))),[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([z,F],H)=>x.leg.setMatrixAt(t*4+H,_.l.multiplyMatrices(_.b,this.trs(_.t,z*P*.32,e.leg,F*E*.36,z*F>0?L:-L,0,0,e.legW,e.leg,e.legW))));const U=h?.2:M?d?.22:o?.08:.12+Math.sin(c*1.3+n)*.04:m?.05+v*.55:o?d?.15:-.3:.9+Math.sin(c*1.7+n)*.08;_.hd.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.3,E*.46,U));const B=e.neckTilt??.29,V=e.neckW??.72;x.neck.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,-.04,0,B,0,0,w*V,e.neck*1.05+.1,b*V))),M?x.collar.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.5-.17,-E*.04,0,0,0,P*1.14,.22,E*.4))):x.collar.setMatrixAt(t,p?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,e.neck*.45,e.neck*.13,.29,0,0,w*.9,.06,b*.9)):Bi),_.hd.multiply(this.trs(_.t,0,e.neck*Math.cos(B)/Math.cos(.29),e.neck*Math.sin(B)*(.3/Math.sin(.29))+y*.3,-U*.6+(e.headTilt??0))),x.head.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,0,0,0,0,0,w,b,y)));const j=Math.min(w/.15,1.35);x.ears.setMatrixAt(t,_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.5,-y*.2,-(e.headTilt??0)*.85,0,0,j,j,j))),x.antlers.setMatrixAt(t,u&&e.antl?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.45,-y*.12)):Bi),x.horns.setMatrixAt(t,e.horns?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,b*.35,y*.02)):Bi),x.tusks.setMatrixAt(t,e.tusks?_.l.multiplyMatrices(_.hd,this.trs(_.t,0,-b*.25,y*.72,-.6)):Bi),x.tail.setMatrixAt(t,_.l.multiplyMatrices(_.b,this.trs(_.t,0,S+T*.32,-E*.5,-.4+(o?Math.sin(l*2)*.15:Math.sin(c*3+n)*.06),0,0,e.tail[0],e.tail[1],e.tail[2])))}poseRam(t,e,n,s,r,a,o,l){const c=this.rm,h=this.m,d=this.phase[e];t.task[e]===Ge&&t.cd[e]>this.lastCd[e]&&In.emit("ram.boom",s,a),this.lastCd[e]=t.cd[e];{const v=d/Math.PI%2;v<this.lastP[e]&&In.emit("ram.creak",s,a,.7),this.lastP[e]=v}this.trs(h.b,s,r,a,0,o,0),c.body.setMatrixAt(n,h.b),c.cloth.setMatrixAt(n,h.b),[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([v,g],p)=>c.wheel.setMatrixAt(n*4+p,h.l.multiplyMatrices(h.b,this.trs(h.t,v*.5,.22,g*.55,d))));let u=0;if(t.task[e]===Ge&&t.state[e]!==Ze){const v=1-Math.max(0,Math.min(1,(t.cd[e]-l)/yt[t.kind[e]].cd));u=v<.15?.06*(1-v/.15):v<.85?mr((v-.15)/.7)*.5:.5*(1-((v-.85)/.15)**2)}let f=0;const m=t.tgt[e];if(t.task[e]===Ge&&m>=0&&t.alive[m]&&t.kind[m]>=jt){const v=ix(t,m,s,a,Math.sin(o),Math.cos(o),.62);v!==null&&(f=Math.max(0,Math.min(.9,v-1.33)))}c.log.setMatrixAt(n,h.l.multiplyMatrices(h.b,this.trs(h.t,0,.62,.05+f-u)))}}const Se="#6e4f37",Ye="#8a6545",No="#a0754c",Hi="#c9a75e",Es="#b8954f",ha="#cdb48a",Hl="#9b968c",Gh="#b98b62",Ts="#b5813e",ua="#8a857c",da="#a7a196";function fa(i,t,e,n,s,r,a){const o=a()*En;i.add("cone7",r,k(t,0,e,o,n*2,s,n*2));for(let l=0;l<3;l++){const c=l*En/3+o;i.add("cyl5",Se,k(t+Math.cos(c)*.08,s-.3,e+Math.sin(c)*.08,0,.05,.6,.05,Math.sin(c)*.3,Math.cos(c)*.3))}i.add("box","#3b2b1f",k(t+Math.sin(o)*n*.95,0,e+Math.cos(o)*n*.95,o,.36,s*.4,.05,-Math.atan2(n,s)))}function Vh(i,t,e,n,s,r,a,o,l,c=0){i.add("cyl8",o,k(t,0,e,c,n*2,r,s*2)),i.add("cone7",l,k(t,r-.06,e,c,n*2+.44,a,s*2+.44));const h=r-.06+a*.86,d=Math.sin(c),u=Math.cos(c),f=Math.cos(c),m=-Math.sin(c);for(const v of[-1,1])i.add("cyl5",Se,k(t+f*v*.05,h,e+m*v*.05,c,.045,.42,.045,0,v*.62));i.add("box","#3a2a1e",k(t+d*s*.94,0,e+u*s*.94,c,.42,r*.8,.08))}function zo(i,t,e,n,s,r,a,o){const l=Math.cos(a),c=-Math.sin(a),h=Math.sin(a),d=Math.cos(a);for(const[u,f]of[[-1,-1],[1,-1],[-1,1],[1,1]])i.add("cyl5",Se,k(t+l*u*n/2+h*f*s/2,0,e+c*u*n/2+d*f*s/2,0,.07,f>0?1.15:1.35,.07));i.add("box",r,k(t,1.24,e,a,n+.2,.05,s+.3,.18)),i.add("box",Ye,k(t+h*s*.3,0,e+d*s*.3,a,n*.9,.55,.32)),o.forEach((u,f)=>i.add(f%2?"ico":"cyl8",u,k(t+h*s*.3+l*(f-(o.length-1)/2)*.24,.55,e+d*s*.3+c*(f-(o.length-1)/2)*.24,0,.17,f%2?.17:.2,.17)))}function Q1(i,t,e,n,s){const r=Math.sin(n),a=Math.cos(n),o=Math.cos(n),l=-Math.sin(n);i.add("box",s,k(t,.78,e,n,.34,.42,1));for(const[c,h]of[[-1,1],[1,1],[-1,-1],[1,-1]])i.add("box",s,k(t+o*c*.12+r*h*.36,0,e+l*c*.12+a*h*.36,n,.09,.8,.09));i.add("box",s,k(t+r*.52,1,e+a*.52,n,.16,.5,.2,.5)),i.add("box",s,k(t+r*.72,1.34,e+a*.72,n,.15,.17,.42,.25)),i.add("box","#2a211b",k(t+r*.5,1.1,e+a*.5,n,.05,.42,.12,.5)),i.add("box","#2a211b",k(t-r*.52,.55,e-a*.52,n,.07,.42,.07,-.25))}function Wh(i,t,e,n,s,r,a=0){i.add("cyl8","#6b4a2f",k(t,e+s*Math.cos(a),n,r,s*2,.08,s*2,0,Math.PI/2+a))}function pa(i,t,e,n=1){for(let s=0;s<9;s++){const r=s/9*En;i.add("dode","#8a857c",k(t+Math.cos(r)*.5*n,.05,e+Math.sin(r)*.5*n,r,.24*n,.18*n,.24*n))}i.add("cyl5","#4a3526",k(t,.08,e,.3,.1,.8*n,.1,Math.PI/2,0)),i.add("cyl5","#4a3526",k(t,.1,e,1.9,.1,.8*n,.1,Math.PI/2,0))}function ma(i,t,e,n,s,r,a,o,l,c=0,h=0){i.add("box",o,k(t,h,e,c,n,r,s)),i.add("prism",l,k(t,h+r-.04,e,c,n+.4,a,s+.36)),i.add("box","#3a2a1e",k(t+Math.sin(c)*(s/2+.01),h,e+Math.cos(c)*(s/2+.01),c,Math.min(.5,n*.3),r*.72,.06))}function qh(i,t,e,n){for(let s=0;s<e;s++){const r=s/e*En;i.add("box",Hl,k(Math.cos(r)*t,0,Math.sin(r)*t,r,.3,n*(.8+s%3*.15),.22))}}function tx(i,t){const e=Math.round(t*4);for(let n=0;n<=e;n++){const s=-t+n*2*t/e;for(const[r,a]of[[s,-t],[s,t],[-t,s],[t,s]])i.add("cyl5",Se,k(r,0,a,0,.08,.6,.08))}for(const n of[.25,.48])i.add("box",Ye,k(0,n,-t,0,t*2,.05,.05)),i.add("box",Ye,k(0,n,t,0,t*2,.05,.05)),i.add("box",Ye,k(-t,n,0,0,.05,.05,t*2)),i.add("box",Ye,k(t,n,0,0,.05,.05,t*2))}function Fo(i,t,e,n){i.add("ico","#ece6d6",k(t,.32,e,n,.5,.36,.62)),i.add("box","#3a332e",k(t+Math.sin(n)*.32,.36,e+Math.cos(n)*.32,n,.13,.16,.2));for(const[s,r]of[[-.1,-.15],[.1,-.15],[-.1,.15],[.1,.15]])i.add("box","#3a332e",k(t+s,0,e+r,n,.05,.2,.05))}function ex(i,t,e){const n=new dc(e),s=Math.min(t,2);switch(i){case"center":if(s===0)pa(n,0,0,1),[.4,1.5,2.6,3.6,4.7,5.6].forEach((r,a)=>fa(n,Math.cos(r)*1.45,Math.sin(r)*1.45,.48,1.25+a%2*.2,[No,"#8d6a46","#b58a5d"][a%3],e));else if(s===1)ma(n,0,-.4,2.2,3.2,1.3,1.5,ha,Hi,Math.PI/2),pa(n,1.2,1.3,.6),n.add("cyl8","#a0654a",k(-1.3,0,1.3,0,.5,.55,.5));else{Vh(n,0,-.45,1.5,1.02,1.3,1.75,ha,Hi);for(const r of[-1,1])n.add("cyl5",Se,k(r*.55,0,.95,0,.12,1.45,.12)),n.add("cyl8",Ts,k(r*.55,.95,1.02,0,.36,.05,.36,Math.PI/2));n.add("box",Ye,k(0,1.42,.85,0,1.4,.1,.36)),pa(n,1.2,1.3,.6),n.add("cyl8","#a0654a",k(-1.3,0,1.3,0,.5,.55,.5)),n.add("cyl8","#8a5a40",k(-1,0,1.55,0,.32,.38,.32))}break;case"house":s===0?(fa(n,0,0,.8,1.5,No,e),n.add("box","#9a7148",k(.6,0,.6,.4,.3,.4,.03))):s===1?ma(n,0,0,1.3,1.6,1,.95,ha,Es,e()<.5?0:Math.PI/2):(Vh(n,0,-.08,.66,.5,.85,1,Gh,Es),n.add("cyl8","#a0654a",k(.62,0,.62,0,.26,.32,.26)));break;case"depot":if(s===0){for(let r=0;r<6;r++)n.add("cyl5","#5e4431",k(-.3,.1+r%3*.18,-.35+Math.floor(r/3)*.18+r%3*.05,.2,.17,1.2,.17,Math.PI/2,0));n.add("prism",No,k(.35,0,.3,.3,1,.8,1.1)),n.add("cyl8","#b48a5c",k(.55,0,-.5,0,.3,.3,.3))}else if(s===1){for(const[r,a]of[[-.45,-.45],[.45,-.45],[-.45,.45],[.45,.45]])n.add("cyl5",Se,k(r,0,a,0,.13,.6,.13));n.add("cyl8",ha,k(0,.6,0,0,1.3,.8,1.3)),n.add("cone7",Hi,k(0,1.38,0,0,1.8,.9,1.8))}else{for(const[r,a]of[[-.5,-.55],[.5,-.55],[-.5,.1],[.5,.1]])n.add("cyl5",Se,k(r,0,a,0,.12,.5,.12));n.add("box",Ye,k(0,.5,-.22,0,1.25,.75,.9)),n.add("prism",Hi,k(0,1.22,-.22,Math.PI/2,1.2,.6,1.6)),n.add("cyl8","#a0654a",k(-.55,0,.62,0,.3,.42,.3)),n.add("cyl8","#8a5a40",k(-.22,0,.7,0,.26,.36,.26));for(let r=0;r<3;r++)n.add("box",Ts,k(.42,r*.07,.62+r%2*.03,r%2?.2:-.1,.36,.07,.12))}break;case"military":if(s===0){qh(n,1.15,10,.32),fa(n,-.55,-.5,.5,1.2,"#8d6a46",e);for(let r=0;r<4;r++)n.add("cyl5","#8a6a48",k(.6+r*.12,0,.55,0,.04,1.3,.04,.12));n.add("cyl5",Se,k(.5,0,-.6,0,.12,.9,.12))}else if(s===1){ma(n,-.3,-.2,1.8,2.2,1.2,1.2,"#c4a77c",Es,0);for(let r=0;r<7;r++)n.add("cyl5",Ye,k(-1.3+r*.4,0,1.25,0,.14,.9+r%2*.15,.14));for(let r=0;r<3;r++)n.add("cyl5","#8a6a48",k(1,0,-.6+r*.25,0,.04,1.3,.04,0,.1))}else{n.add("box",ua,k(-.15,0,-.45,0,2.6,.25,1.35)),ma(n,-.15,-.45,1.25,2.5,.85,.85,"#9c7a52",Es,Math.PI/2,.25),n.add("box",Se,k(.9,0,.75,0,.9,.08,.1));for(let r=0;r<4;r++)n.add("cyl5","#8a6a48",k(.6+r*.2,0,.72,0,.04,1.35,.04,-.12));n.add("cyl5",Se,k(-.9,0,.8,0,.1,1.2,.1)),n.add("box",Se,k(-.9,.85,.8,0,.6,.08,.08)),n.add("cyl8",Ts,k(-.9,.62,.87,0,.42,.05,.42,Math.PI/2))}break;case"farm":n.add("box","#7d5f3e",k(0,-.02,0,0,3,.08,3),.02);for(let r=0;r<4;r++)n.add("box","#6b4f33",k(0,.03,-1.12+r*.75,0,2.8,.07,.28),.03);for(const[r,a]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])n.add("cyl5",Ye,k(r,0,a,0,.08,.5,.08));break;case"pen":tx(n,1.35),Fo(n,-.5,-.3,.6),Fo(n,.45,.2,2.5),Fo(n,-.2,.65,4.1),n.add("box","#a0754c",k(.8,0,-.8,.3,.5,.2,.3));break;case"sanctuary":if(s<2)n.add("box","#a8a397",k(0,-.1,0,.3,.5,2,.35,.05)),qh(n,.85,8,.45),n.add("dode","#8a857c",k(.5,0,.45,0,.4,.3,.4));else{for(const[r,a]of[[-.55,-.55],[.55,-.55],[-.55,.55],[.55,.55]])n.add("cyl5",Se,k(r,0,a,0,.1,1.15,.1));n.add("cone4",Hi,k(0,1.1,0,Math.PI/4,1.9,.75,1.9)),n.add("box",da,k(0,0,0,0,.6,.55,.45)),n.add("cyl8",Ts,k(0,.55,0,0,.32,.08,.32)),n.add("box","#a8a397",k(-.75,-.1,.75,.3,.3,1.2,.22,.05)),n.add("box","#a8a397",k(.78,-.1,.72,-.4,.26,1,.2,-.05))}break;case"camp":pa(n,0,0,1);for(let r=0;r<4;r++){const a=r/4*En+.4;fa(n,Math.cos(a)*1.4,Math.sin(a)*1.4,.55,1.4,["#6b5a45","#5d5040","#7a6248"][r%3],e)}for(let r=0;r<9;r++){const a=-.9+r*.22;n.add("cyl5","#5a4030",k(Math.cos(a)*1.95,0,Math.sin(a)*1.95,0,.16,1.1+r%2*.2,.16))}break;case"forge":n.add("box",Gh,k(0,0,-.75,0,1.8,1.05,.2));for(const r of[-1,1])n.add("cyl5",Se,k(r*.82,0,.1,0,.1,1.05,.1));n.add("prism",Es,k(0,1,-.3,0,2,.6,1.2)),n.add("ico","#a5603f",k(.45,.32,-.25,0,.75,.72,.7)),n.add("cyl5","#8f5236",k(.55,.5,-.45,0,.2,1.25,.2)),n.add("box","#2b1d16",k(.45,.12,.08,0,.26,.22,.06)),n.add("box",ua,k(-.42,0,.35,.3,.32,.38,.3)),n.add("box","#5c5a57",k(-.42,.38,.35,.3,.42,.1,.18));for(let r=0;r<3;r++)n.add("box",Ts,k(-.55+r*.05,r*.06,-.35,.1*r,.3,.06,.1));break;case"market":zo(n,-.72,-.7,1.1,.8,"#b5523b",0,["#a0654a","#d9a43a","#8a5a40"]),zo(n,.78,-.55,1,.8,"#d8b45a",-.25,["#bdb6a8","#7a5634","#a0654a"]),zo(n,-.05,.85,1.2,.75,"#5b7f9a",Math.PI,[Ts,"#d9a43a","#bdb6a8"]),n.add("cyl8","#a0654a",k(.95,0,.75,0,.3,.45,.3)),n.add("cyl8","#c9a75e",k(1.15,0,.45,0,.32,.22,.32)),n.add("ico","#d6c49a",k(1.05,.15,1.05,0,.3,.3,.3));break;case"stable":n.add("box",Ye,k(0,0,-1.2,0,2.7,1,.16));for(const r of[-1,1])n.add("box",Ye,k(r*1.3,0,-.75,0,.14,1,.9));for(let r=0;r<4;r++)n.add("cyl5",Se,k(-1.3+r*.866,0,-.32,0,.11,1,.11));n.add("prism",Hi,k(0,.97,-.76,0,3,.62,1.3));for(let r=0;r<5;r++)n.add("cyl5",Se,k(-1.35+r*.675,0,1.35,0,.08,.62,.08));for(const r of[.28,.52])n.add("box",Ye,k(0,r,1.35,0,2.75,.05,.05));Q1(n,.2,.55,-1.2,"#7a5236"),n.add("box","#d6b85a",k(-1,0,.6,.3,.5,.36,.38)),n.add("box","#c9ab50",k(-1.05,.36,.62,.4,.46,.32,.34));break;case"workshop":for(const[r,a]of[[-1.2,-1.2],[1.2,-1.2],[-1.2,-.2],[1.2,-.2]])n.add("cyl5",Se,k(r,0,a,0,.12,1.15,.12));n.add("prism",Es,k(0,1.12,-.7,0,2.8,.6,1.4)),n.add("box",Ye,k(0,0,-1.25,0,2.5,.9,.12));for(const r of[-1,1])n.add("box",Se,k(r*.32,.35,.55,0,.1,.1,1.5)),n.add("box",Se,k(r*.32,.35,.55,0,.1,.75,.1));n.add("box",Se,k(0,1.05,.55,0,.75,.1,.1)),n.add("cyl8","#5e4431",k(0,.65,.4,0,.26,1.5,.26,Math.PI/2));for(const r of[-1,1])for(const a of[-.1,1.2])n.add("box",Ye,k(r*.32,0,a,0,.16,.35,.16));n.add("cyl5","#4a3a2c",k(0,.77,.55,0,.03,.3,.03)),Wh(n,-.95,0,.9,.3,.4,-.12),Wh(n,1.05,.02,.35,.3,-.3,.1);for(let r=0;r<3;r++)n.add("cyl5","#5e4431",k(.9,.1+r%2*.16,-.65+r*.12,Math.PI/2,.18,1.1,.18,Math.PI/2));break;case"wall":n.add("box",ua,k(0,0,0,0,1,.55,1),.1);for(const[r,a,o]of[[-.25,-.25,Hl],[.25,-.25,da],[-.25,.25,da],[.25,.25,Hl]])n.add("box",o,k(r,.55,a,(r+a)*.4,.5,.36+Math.abs(r-a)*.2,.5),.12);n.add("dode",ua,k(0,.95,0,.4,.5,.3,.5));break;case"tower":n.add("cyl8","#b3ada2",k(0,0,0,.2,1.5,2.2,1.5)),n.add("cyl8",da,k(0,0,0,.6,1.62,.4,1.62)),n.add("cyl8","#9d978b",k(0,1.15,0,.4,1.56,.12,1.56)),n.add("box","#2b211a",k(0,0,.7,0,.42,.8,.14)),n.add("box","#2b211a",k(.55,1.4,.48,.8,.08,.3,.12)),n.add("box",Ye,k(0,2.2,0,0,1.8,.14,1.8));for(let r=0;r<8;r++){const a=r/8*En;n.add("cyl5",Se,k(Math.cos(a)*.84,2.3,Math.sin(a)*.84,0,.08,.95,.08))}for(const[r,a,o]of[[0,.85,0],[0,-.85,0],[.85,0,Math.PI/2],[-.85,0,Math.PI/2]])n.add("box",Se,k(r,2.62,a,o,1.7,.08,.06));n.add("cone4",Hi,k(0,3.2,0,Math.PI/4,2.6,1,2.6));break}return n.build()}function nx(i,t,e){const n=[],s=[],r=new Pt,a=(d,u)=>Xt(i,d,u),o=(d,u,f,m,v,g)=>{const p=[[d,u],[d,m],[f,m],[f,u]].map(([M,x])=>[M,a(M,x)+v,x]);r.set(g);for(const M of[0,1,3,1,2,3])n.push(...p[M]),s.push(r.r,r.g,r.b)};for(let d=0;d<6;d++)for(let u=0;u<6;u++){const f=t-1.5+d*.5,m=e-1.5+u*.5;o(f,m,f+.5,m+.5,.05,(d+u)%2?"#7d5f3e":"#795b3a")}for(let d=0;d<4;d++){const u=e-1.12+d*.75;for(let f=0;f<7;f++){const m=t-1.4+f*.4;o(m,u-.14,m+.4,u+.14,.09,"#6b4f33")}}const l=new dc;for(const[d,u]of[[-1.45,-1.45],[1.45,-1.45],[-1.45,1.45],[1.45,1.45]])l.add("cyl5",Ye,k(t+d,a(t+d,e+u),e+u,0,.08,.5,.08));const c=l.build();n.push(...c.attributes.position.array),s.push(...c.attributes.color.array);const h=new Ie;return h.setAttribute("position",new he(n,3)),h.setAttribute("color",new he(s,3)),h.computeVertexNormals(),h.computeBoundingSphere(),h}const Xh=new Map;function Sr(i,t){const e=Math.min(t,2),n=i+e;let s=Xh.get(n);return s||(s=ex(i,e,cd(i.length*31+e)),Xh.set(n,s)),s}const ga=new Xa,$h=new O,Yh=new O,Kh=new O,jh=new O;function ix(i,t,e,n,s,r,a){const o=be[i.kind[t]-jt],l=i.owner[t],c=Math.min(l>=0&&l<i.players.length?i.players[l].era:0,2),h=Sr(o.key,c),d=h.attributes.position.array,u=i.done[t]?1:Math.max(.12,Math.min(1,i.work[t]/(o.time*100))),f=i.x[t]/256,m=i.z[t]/256,v=o.key==="farm"?0:(t*2654435761>>>0)%4*Math.PI/2,g=Math.cos(v),p=Math.sin(v),M=e-f,x=n-m,_=M*g-x*p,P=M*p+x*g,T=s*g-r*p,E=s*p+r*g,w=Math.hypot(T,E)||1;let b=1/0;for(const y of[0,.1,-.1]){ga.origin.set(_-E/w*y,a/u,P+T/w*y),ga.direction.set(T/w,0,E/w);for(let S=0;S+8<d.length;S+=9){if($h.set(d[S],d[S+1],d[S+2]),Yh.set(d[S+3],d[S+4],d[S+5]),Kh.set(d[S+6],d[S+7],d[S+8]),!ga.intersectTriangle($h,Yh,Kh,!1,jh))continue;const L=jh.distanceTo(ga.origin);L<b&&(b=L)}}return b<1/0?b:null}const sx=de(i=>i.add("cyl5",Se,k(0,0,0,0,.06,2,.06),0)),rx=new Ne(.42,.34,.03).translate(.24,1.75,0);class ax{constructor(){R(this,"group",new Vn);R(this,"meshes",new Map);R(this,"poles");R(this,"flags");R(this,"crops");R(this,"fair");R(this,"mat",We({vertexColors:!0}));R(this,"farms",new Map);R(this,"fires",[]);R(this,"smokes",[]);this.poles=new we(sx,We({vertexColors:!0}),256),this.flags=new we(rx,We({},{NO_SNOW:""}),256);const t=de(n=>{for(let s=0;s<3;s++)n.add("cone4","#ffffff",k((s-1)*.1,0,s%2*.08,s,.1,.75,.1,(s-1)*.15,0),.1)});this.crops=new we(t,We({vertexColors:!0},{CROP:"",CROPCOL:"",WIND:"",WIND_AMP:"0.06",WIND_BYH:"true",SNOW_K:"0.5"}),2560),this.crops.customDepthMaterial=ld({CROP:""});const e=de(n=>{const s=[[-1.38,-1.38],[1.38,-1.38],[1.38,1.38],[-1.38,1.38]],r=["#e0533c","#f2c14e","#5bb39a","#5b7f9a","#efe6cf"];for(const[a,o]of s)n.add("cyl5",Se,k(a,0,o,0,.07,2.05,.07),0);for(let a=0;a<4;a++){const[o,l]=s[a],[c,h]=s[(a+1)%4],d=Math.hypot(c-o,h-l),u=Math.atan2(c-o,h-l);n.add("box","#e8e2d4",k((o+c)/2,1.95,(l+h)/2,u,.015,.015,d),0);for(let f=1;f<8;f++){const m=f/8,v=Math.sin(m*Math.PI)*.18;n.add("cone4",r[(f+a)%r.length],k(o+(c-o)*m,1.95-v-.2,l+(h-l)*m,u,.16,.2,.03,Math.PI),0)}}});this.fair=new we(e,We({vertexColors:!0}),16);for(const n of[this.poles,this.flags,this.crops,this.fair])n.instanceMatrix.setUsage(mn),n.frustumCulled=!1,n.castShadow=!0,n.receiveShadow=!0,n.count=0,this.group.add(n);for(let n=0;n<256;n++)this.flags.setColorAt(n,new Pt("#ffffff"))}mesh(t,e){const n=t+e;let s=this.meshes.get(n);return s||(s=new we(Sr(t,e),this.mat,t==="center"||t==="camp"?8:64),s.instanceMatrix.setUsage(mn),s.frustumCulled=!1,s.castShadow=!0,s.receiveShadow=!0,s.count=0,this.meshes.set(n,s),this.group.add(s)),s}update(t,e,n,s=0){const r=new Map;let a=0,o=0,l=0;const c=t.size,h=t.explored[e];this.fires.length=0,this.smokes.length=0;const d=new Pt,u=new Set;for(let f=0;f<t.top;f++){if(!t.alive[f]||t.kind[f]<jt)continue;const m=be[t.kind[f]-jt],v=t.owner[f],g=t.x[f]/256,p=t.z[f]/256;if(n&&v!==e&&!h[Math.floor(p)*c+Math.floor(g)])continue;const M=v>=0&&v<t.players.length?t.players[v].era:0;if(m.key==="farm"){let b=this.farms.get(f);if(b&&(b.x!==g||b.z!==p)&&(this.group.remove(b.mesh),b.mesh.geometry.dispose(),b=void 0),!b){const y=new Ue(nx(t.map,g,p),this.mat);y.receiveShadow=y.castShadow=!0,this.group.add(y),b={mesh:y,x:g,z:p},this.farms.set(f,b)}if(b.mesh.visible=!0,u.add(f),t.done[f])for(let y=0;y<4;y++)for(let S=0;S<9&&o<this.crops.instanceMatrix.count;S++){const L=g-1.25+S*.31,D=p-1.12+y*.75;this.crops.setMatrixAt(o++,k(L,Xt(t.map,L,D)+.08,D,(S*7+y)%6,1,.85+(S+y)%3*.12,1))}continue}const x=this.mesh(m.key,Math.min(M,2)),_=r.get(x)??0;if(_>=x.instanceMatrix.count)continue;const P=Xt(t.map,g,p),T=t.done[f]===1,E=T?1:Math.max(.12,Math.min(1,t.work[f]/(m.time*100))),w=(f*2654435761>>>0)%4*Math.PI/2;if(x.setMatrixAt(_,k(g,P-.02,p,m.key==="farm"?0:w,1,E,1)),r.set(x,_+1),m.key!=="farm"&&!m.wall&&T&&a<256){const b=m.size/2-.25,y=g+b,S=p-b;this.poles.setMatrixAt(a,k(y,Xt(t.map,y,S),S)),this.flags.setMatrixAt(a,k(y,Xt(t.map,y,S),S,Math.sin(s*1.1+f)*.15)),this.flags.setColorAt(a,d.set(v===ci?"#efe6cf":t.players[v]?.color??"#888")),a++}if(T&&m.key==="forge"){const S=g+.45*Math.cos(w)+.12*Math.sin(w),L=p-.45*Math.sin(w)+.12*Math.cos(w),D=g+.55*Math.cos(w)-.45*Math.sin(w),U=p-.55*Math.sin(w)-.45*Math.cos(w);this.fires.push({x:S,y:Xt(t.map,S,L)+.1,z:L,s:.16}),this.smokes.push({x:D,y:Xt(t.map,D,U)+1.5,z:U,s:.6})}if(T&&m.market&&t.fair&&l<16&&this.fair.setMatrixAt(l++,k(g,P-.02,p,w)),T&&(m.key==="center"||m.key==="camp")){const b=M>=1&&m.key==="center",y=b?g+1.2*Math.cos(w)+1.3*Math.sin(w):g,S=b?p-1.2*Math.sin(w)+1.3*Math.cos(w):p;this.fires.push({x:y,y:Xt(t.map,y,S)+.15,z:S,s:M>=1&&m.key==="center"?.42:.6}),this.smokes.push({x:y,y:Xt(t.map,y,S)+.3,z:S,s:1})}}for(const f of this.meshes.values())f.count=r.get(f)??0,f.instanceMatrix.needsUpdate=!0;for(const[f,m]of this.farms)u.has(f)||(!t.alive[f]||t.kind[f]!==jt+cn.farm?(this.group.remove(m.mesh),m.mesh.geometry.dispose(),this.farms.delete(f)):m.mesh.visible=!1);this.poles.count=this.flags.count=a,this.poles.instanceMatrix.needsUpdate=this.flags.instanceMatrix.needsUpdate=!0,this.flags.instanceColor&&(this.flags.instanceColor.needsUpdate=!0),this.crops.count=o,this.crops.instanceMatrix.needsUpdate=!0,this.fair.count=l,this.fair.instanceMatrix.needsUpdate=!0}}class ox{constructor(t=48){R(this,"mesh");this.mesh=new we(new yr(.32,1,6).translate(0,.5,0),uc(new ui({color:16777215,toneMapped:!1}),{NO_SNOW:""}),t),this.mesh.instanceMatrix.setUsage(mn),this.mesh.frustumCulled=!1;for(let e=0;e<t;e++)this.mesh.setColorAt(e,new Pt(e%2?"#ffd166":"#ff7b2e"))}update(t,e){let n=0;const s=this.mesh.instanceMatrix.count;for(const r of t){const a=.85+Math.sin(e*13+r.x)*.12+Math.sin(e*29+r.z)*.08;n<s&&this.mesh.setMatrixAt(n++,k(r.x,r.y,r.z,e*2+r.x,r.s,r.s*1.25*a,r.s)),n<s&&this.mesh.setMatrixAt(n++,k(r.x,r.y,r.z,-e*3,r.s*.55,r.s*.85*(2-a),r.s*.55))}this.mesh.count=n,this.mesh.instanceMatrix.needsUpdate=!0}}const lx=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aA; attribute float aS; attribute vec3 aC; varying float vA; varying vec3 vC;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r;
  vA = aA * mix(1.0, smoothstep(0.35, 0.75, f), uFowOn); vC = aC;
  gl_PointSize = uSize * aS * uPR * 260.0 / -mv.z; }`,cx=`varying float vA; varying vec3 vC;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d) * vA; if (a < 0.01) discard; gl_FragColor = vec4(vC, a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class hx{constructor(t,e=500){R(this,"n");R(this,"pos");R(this,"a");R(this,"sz");R(this,"colr");R(this,"age");R(this,"life");R(this,"vel");R(this,"grow");R(this,"next",0);R(this,"acc",0);R(this,"geo",new Ie);R(this,"mat");R(this,"points");this.n=e,this.pos=new Float32Array(e*3),this.a=new Float32Array(e),this.sz=new Float32Array(e).fill(1),this.colr=new Float32Array(e*3),this.age=new Float32Array(e).fill(99),this.life=new Float32Array(e),this.vel=new Float32Array(e*3),this.grow=new Float32Array(e),this.geo.setAttribute("position",new Pe(this.pos,3).setUsage(mn)),this.geo.setAttribute("aA",new Pe(this.a,1).setUsage(mn)),this.geo.setAttribute("aS",new Pe(this.sz,1).setUsage(mn)),this.geo.setAttribute("aC",new Pe(this.colr,3).setUsage(mn)),this.mat=new zn({transparent:!0,depthWrite:!1,uniforms:{...t,uPR:{value:1},uSize:{value:2.6}},vertexShader:lx,fragmentShader:cx}),this.points=new sd(this.geo,this.mat),this.points.frustumCulled=!1,this.points.renderOrder=3}emit(t,e,n,s,r,a,o,l,c,h){const d=this.next;this.next=(this.next+1)%this.n,this.pos.set([t,e,n],d*3),this.vel.set([s,r,a],d*3),this.colr.set([h.r,h.g,h.b],d*3),this.age[d]=0,this.life[d]=o,this.sz[d]=l,this.grow[d]=c}smoke(t,e){this.acc+=t;const n=new Pt(.86,.85,.83);for(;this.acc>.2;){this.acc-=.2;for(const s of e)Math.random()<.5&&this.emit(s.x+(Math.random()-.5)*.2,s.y+.4,s.z+(Math.random()-.5)*.2,.2+Math.random()*.2,.6+Math.random()*.4,.1+Math.random()*.15,3.5+Math.random()*2,.5,1.6,n)}}puff(t,e,n,s){const r=new Pt(.62,.55,.45),a=s?22:9;for(let o=0;o<a;o++){const l=Math.random()*En,c=(s?1.4:.7)*(.4+Math.random());this.emit(t,e+.2,n,Math.cos(l)*c,.3+Math.random()*.6,Math.sin(l)*c,.9+Math.random()*.6,s?1.4:.8,1.2,r)}}update(t){for(let e=0;e<this.n;e++){if(this.age[e]>this.life[e]){this.a[e]=0;continue}this.age[e]+=t;const n=this.age[e]/this.life[e],s=1-Math.min(.9,t*1.5);this.vel[e*3]*=s,this.vel[e*3+2]*=s,this.pos[e*3]+=this.vel[e*3]*t,this.pos[e*3+1]+=this.vel[e*3+1]*t,this.pos[e*3+2]+=this.vel[e*3+2]*t,this.a[e]=Math.sin(Math.min(n,1)*Math.PI)*.4,this.sz[e]=this.sz[e]+this.grow[e]*t/this.life[e]*.5}for(const e of["position","aA","aS","aC"])this.geo.attributes[e].needsUpdate=!0}}class ux{constructor(){R(this,"group",new Vn);R(this,"spears");R(this,"arrows");R(this,"stones");R(this,"list",[]);R(this,"ray",new Xa);R(this,"ta",new O);R(this,"tb",new O);R(this,"tc",new O);R(this,"th",new O);const t=de(r=>{r.add("cyl5","#7a5a3c",k(0,-1.88,0,0,.035,1.7,.035),0),r.add("cone4","#b9b4aa",k(0,-.18,0,0,.065,.18,.065),0)}).rotateX(Math.PI/2),e=de(r=>{r.add("cyl5","#8a6a48",k(0,-.72,0,0,.018,.64,.018),0),r.add("cone4","#b9b4aa",k(0,-.1,0,0,.045,.1,.045),0),r.add("box","#e8e2d4",k(0,-.7,0,0,.012,.12,.07),0),r.add("box","#e8e2d4",k(0,-.7,0,0,.07,.12,.012),0)}).rotateX(Math.PI/2),n=de(r=>r.add("dode","#8f8a80",k(0,0,-.05,0,.11,.1,.11),0)),s=We({vertexColors:!0},{NO_SNOW:""});this.spears=new we(t,s,96),this.arrows=new we(e,s,96),this.stones=new we(n,s,96);for(const r of[this.spears,this.arrows,this.stones])r.instanceMatrix.setUsage(mn),r.frustumCulled=!1,r.castShadow=!0,r.count=0,this.group.add(r)}add(t,e,n,s,r,a,o,l,c,h,d){const u=o==="arrow",f=o==="stone";if(o==="spear"&&l<Bl)return;let m,v,g;if(c>=jt){const w=t.alive[h]?this.hitBuilding(t,h,e,n):null;w?(m=w.x,v=w.z,g=w.y):(m=s,v=r,g=Xt(t.map,s,r)+.08)}else{const w=Math.hypot(s-e,r-n)||1,b=w-(yt[c]?.radius??.3)*.8;m=e+(s-e)/w*b,v=n+(r-n)/w*b,g=Xt(t.map,m,v)+ud(c)}const p=Math.hypot(m-e,v-n)||1,M=(m-e)/p,x=(v-n)/p,_=d!==void 0?.9:u?.75:f?.3:1.7;if(p-_<.15)return;const P=e+M*_,T=n+x*_,E=d!==void 0?Xt(t.map,e,n)+d:Xt(t.map,P,T)+(u?.88:f?1.55:1.1);this.list.push({x0:P,z0:T,y0:E,x1:m,z1:v,y1:g,arc:(p-_)*(u?.1:f?.07:.18),t:0,dur:Math.max(.15,a/10),kind:o})}hitBuilding(t,e,n,s){const r=be[t.kind[e]-jt],a=t.owner[e],o=Math.min(a>=0&&a<t.players.length?t.players[a].era:0,2),l=Sr(r.key,o),c=l.attributes.position.array,h=t.done[e]?1:Math.max(.12,Math.min(1,t.work[e]/(r.time*100))),d=t.x[e]/256,u=t.z[e]/256,f=Xt(t.map,d,u)-.02,m=r.key==="farm"?0:(e*2654435761>>>0)%4*Math.PI/2,v=n-d,g=s-u,p=Math.cos(m),M=Math.sin(m),x=v*p-g*M,_=v*M+g*p,P=Math.hypot(x,_)||1,T=-x/P,E=-_/P,w=-E,b=T;let y=0,S=0,L=0,D=!1;for(const U of[0,.35,-.35,.7,-.7,1.05,-1.05,1.4,-1.4]){let B=1/0;for(const V of[.9,.6,.35]){const j=x+w*U,z=_+b*U,F=-(j*T+z*E);this.ray.origin.set(j,V/h,z),this.ray.direction.set(T,0,E);for(let H=0;H+8<c.length;H+=9){if(this.ta.set(c[H],c[H+1],c[H+2]),this.tb.set(c[H+3],c[H+4],c[H+5]),this.tc.set(c[H+6],c[H+7],c[H+8]),!this.ray.intersectTriangle(this.ta,this.tb,this.tc,!1,this.th))continue;const Y=this.th.distanceTo(this.ray.origin);Y>F+.1||Y>=B||(B=Y,y=this.th.x+T*.05,S=this.th.y,L=this.th.z+E*.05)}}if(B<1/0){D=!0;break}}return D?{x:d+y*p+L*M,y:f+S*h,z:u-y*M+L*p}:null}update(t){let e=0,n=0,s=0;const r=[],a=new Ii,o=new O,l=new O(1,1,1),c=new O,h=new O(0,0,1),d=new qt;for(const u of this.list){if(u.t+=t,u.t>u.dur+(u.kind==="stone"?.03:.35))continue;!u.hit&&u.t>=u.dur&&(u.hit=!0,In.emit(u.kind==="arrow"?"arrow.hit":u.kind==="stone"?"stone.hit":"spear.hit",u.x1,u.z1));const f=u.kind==="arrow"?this.arrows:u.kind==="stone"?this.stones:this.spears,m=u.kind==="arrow"?n:u.kind==="stone"?s:e;if(m>=96)continue;r.push(u);const v=Math.min(1,u.t/u.dur);o.set(u.x0+(u.x1-u.x0)*v,u.y0+(u.y1-u.y0)*v+Math.sin(v*Math.PI)*u.arc,u.z0+(u.z1-u.z0)*v),c.set(u.x1-u.x0,u.y1-u.y0+Math.cos(v*Math.PI)*u.arc*Math.PI,u.z1-u.z0).normalize(),a.setFromUnitVectors(h,c),f.setMatrixAt(m,d.compose(o,a,l)),u.kind==="arrow"?n++:u.kind==="stone"?s++:e++}this.list=r,this.spears.count=e,this.arrows.count=n,this.stones.count=s,this.spears.instanceMatrix.needsUpdate=this.arrows.instanceMatrix.needsUpdate=this.stones.instanceMatrix.needsUpdate=!0}}const dx=(i,t,e)=>i+(t-i)*e,fx=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};class px{constructor(t,e,n,s){R(this,"cam");R(this,"x");R(this,"z");R(this,"yaw");R(this,"dist");R(this,"tx");R(this,"tz");R(this,"tyaw");R(this,"tdist");R(this,"minD",14);R(this,"maxD",110);this.map=t,this.cam=new bn(42,1,.5,900),this.x=this.tx=e,this.z=this.tz=n,this.yaw=this.tyaw=s,this.dist=70,this.tdist=44}pitch(t=this.dist){return dx(.66,1.12,fx(this.minD,this.maxD,t))}update(t){const e=1-Math.exp(-t*9),n=this.map.size;this.tx=Math.min(n-8,Math.max(8,this.tx)),this.tz=Math.min(n-8,Math.max(8,this.tz)),this.tdist=Math.min(this.maxD,Math.max(this.minD,this.tdist)),this.x+=(this.tx-this.x)*e,this.z+=(this.tz-this.z)*e,this.yaw+=(this.tyaw-this.yaw)*e,this.dist+=(this.tdist-this.dist)*e;const s=this.pitch(),r=Math.max(Xt(this.map,this.x,this.z),0),a=Math.cos(s)*this.dist;this.cam.position.set(this.x+Math.sin(this.yaw)*a,r+Math.sin(s)*this.dist,this.z+Math.cos(this.yaw)*a),this.cam.lookAt(this.x,r+.6,this.z),this.cam.updateMatrixWorld()}pan(t,e,n){const s=this.pitch(),r=.77*this.dist/n,a=Math.cos(this.yaw),o=-Math.sin(this.yaw),l=-Math.sin(this.yaw),c=-Math.cos(this.yaw);this.tx+=(-t*a+e*l/Math.sin(s))*r,this.tz+=(-t*o+e*c/Math.sin(s))*r}setAspect(t,e){this.cam.aspect=t/e,this.cam.fov=t/e<1?55:42,this.cam.updateProjectionMatrix()}ground(t,e,n,s){const r=new O(t/n*2-1,-(e/s)*2+1,.5).unproject(this.cam),a=this.cam.position.clone(),o=r.sub(a).normalize();let l=0,c=0;const h=this.map.size;for(let d=0;d<400;d++){l+=.6+l*.01;const u=a.x+o.x*l,f=a.y+o.y*l,m=a.z+o.z*l;if(u<-20||m<-20||u>h+20||m>h+20||l>900)return null;if(f<=Math.max(Xt(this.map,u,m),-.1)){let v=c,g=l;for(let p=0;p<12;p++){const M=(v+g)/2;a.y+o.y*M<=Math.max(Xt(this.map,a.x+o.x*M,a.z+o.z*M),-.1)?g=M:v=M}return new O(a.x+o.x*g,a.y+o.y*g,a.z+o.z*g)}c=l}return null}toScreen(t,e,n,s,r,a){a.set(t,e,n).project(this.cam);const o=a.z<1;return a.set((a.x+1)/2*s,(1-a.y)/2*r,o?1:0),a}}const Zh=[{grassA:"#6fa84a",grassB:"#93c25a",leaf:"#7cbc4c",leafAmt:1,crop:.32,cropC:"#86c457",flower:1,snow:0,sun:"#fff2dc",sunI:2.7,elev:.95,top:"#78ade0",hor:"#d3e6ef",hS:"#cfe6ff",hG:"#6b7a4a",hI:1,fog:"#cfe2eb",sh:"#5cb8b2",dp:"#1f6079",w:[0,0,1]},{grassA:"#86a845",grassB:"#bcae57",leaf:"#4f8a3a",leafAmt:1,crop:1,cropC:"#e3bf52",flower:.3,snow:0,sun:"#fff0d0",sunI:3,elev:1.1,top:"#64a2de",hor:"#d9e7ee",hS:"#d6ebff",hG:"#7a7a4a",hI:1.05,fog:"#d4e3ea",sh:"#62c0b4",dp:"#1d6a80",w:[0,0,0]},{grassA:"#8f9a4c",grassB:"#ad8b47",leaf:"#d4782f",leafAmt:.82,crop:.14,cropC:"#b99a5c",flower:0,snow:0,sun:"#ffd6a6",sunI:2.55,elev:.72,top:"#8aa8c6",hor:"#e6d9c4",hS:"#e8dccb",hG:"#7a5f3a",hI:1,fog:"#e0d4c2",sh:"#5aa9a2",dp:"#235a6e",w:[0,1,0]},{grassA:"#7e8a6c",grassB:"#8d9079",leaf:"#6b5a45",leafAmt:0,crop:0,cropC:"#9a8a6a",flower:0,snow:1,sun:"#e9f0ff",sunI:2.15,elev:.5,top:"#98b0c6",hor:"#e6ebee",hS:"#e6eef8",hG:"#8b9096",hI:1.2,fog:"#e1e7ec",sh:"#4f8f98",dp:"#1f4a5e",w:[1,0,0]}],Jh=["grassA","grassB","leaf","cropC","sun","top","hor","hS","hG","fog","sh","dp"],Qh=["leafAmt","crop","flower","snow","sunI","elev","hI"];class mx{constructor(t){R(this,"c",{});R(this,"n",{});R(this,"w",[0,0,0]);R(this,"tmp",new Pt);const e=Zh[t];for(const n of Jh)this.c[n]=yn(e[n]);for(const n of Qh)this.n[n]=e[n];this.w=[...e.w]}update(t,e,n){const s=Zh[e],r=1-Math.exp(-t*.3);for(const l of Jh)this.c[l].lerp(this.tmp.set(s[l]),r);for(const l of Qh)this.n[l]+=(s[l]-this.n[l])*r;for(let l=0;l<3;l++)this.w[l]+=(s.w[l]-this.w[l])*r;const a=this.c,o=this.n;_e.uGrassA.value.copy(a.grassA),_e.uGrassB.value.copy(a.grassB),_e.uLeafColor.value.copy(a.leaf),_e.uCropColor.value.copy(a.cropC),_e.uLeaf.value=o.leafAmt,_e.uCrop.value=o.crop,_e.uFlower.value=o.flower,_e.uSnow.value=o.snow,_e.uFruit.value=Math.max(0,1-o.snow*1.6),_e.uShallow.value.copy(a.sh),_e.uDeep.value.copy(a.dp),n.sun.color.copy(a.sun),n.sun.intensity=o.sunI,n.hemi.color.copy(a.hS),n.hemi.groundColor.copy(a.hG),n.hemi.intensity=o.hI,n.sky.uniforms.uTop.value.copy(a.top),n.sky.uniforms.uHor.value.copy(a.hor),n.fog.color.copy(a.fog)}get elev(){return this.n.elev}}const gx=`uniform sampler2D uFow; uniform float uFowOn; uniform float uWorld; uniform float uPR; uniform float uSize;
attribute float aK; attribute float aS; varying float vK; varying float vF;
void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv;
  float f = texture2D(uFow, position.xz / uWorld).r; vF = mix(1.0, 0.3 + 0.7 * smoothstep(0.35, 0.75, f), uFowOn); vK = aK;
  gl_PointSize = min(uSize * aS * uPR * 260.0 / -mv.z, 14.0 * uPR); }`,vx=`uniform vec3 uColA; uniform vec3 uColB; uniform float uAmt; varying float vK; varying float vF;
void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.3, d) * uAmt * vF;
  if (a < 0.01) discard; gl_FragColor = vec4(mix(uColA, uColB, vK), a);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;class xx{constructor(t,e=1){R(this,"group",new Vn);R(this,"list");this.map=t,this.list=[this.make(Math.round(1500*e),.55,"#ffffff","#e8eef6",2.2,.4,30),this.make(Math.round(220*e),.85,"#d9772f","#b8452a",.9,1.4,11),this.make(Math.round(110*e),.62,"#f49ac0","#e2709c",.6,1.1,6)]}make(t,e,n,s,r,a,o){t=Math.max(1,t);const l=new Float32Array(t*3),c=new Float32Array(t),h=new Float32Array(t),d=new Float32Array(t);for(let v=0;v<t;v++)l[v*3]=(Math.random()-.5)*90,l[v*3+1]=-999,l[v*3+2]=(Math.random()-.5)*90,c[v]=Math.random(),h[v]=Math.random()*100,d[v]=.7+Math.random()*.6;const u=new Ie;u.setAttribute("position",new Pe(l,3).setUsage(mn)),u.setAttribute("aK",new Pe(c,1)),u.setAttribute("aS",new Pe(d,1));const f=new zn({transparent:!0,depthWrite:!1,uniforms:{uFow:_e.uFow,uFowOn:_e.uFowOn,uWorld:_e.uWorld,uPR:{value:1},uSize:{value:e},uColA:{value:yn(n)},uColB:{value:yn(s)},uAmt:{value:0}},vertexShader:gx,fragmentShader:vx}),m=new sd(u,f);return m.frustumCulled=!1,m.renderOrder=4,m.visible=!1,this.group.add(m),{p:m,pos:l,seed:h,n:t,use:t,fall:r,sway:a,m:f,hMax:o}}setScale(t){for(const e of this.list)e.use=Math.max(1,Math.round(e.n*t)),e.p.geometry.setDrawRange(0,e.use)}setPixelRatio(t){for(const e of this.list)e.m.uniforms.uPR.value=t}update(t,e,n,s,r){this.list.forEach((a,o)=>{if(a.m.uniforms.uAmt.value=n[o],n[o]<.01){a.p.visible=!1;return}a.p.visible=!0;for(let l=0;l<a.use;l++){const c=a.seed[l];let h=a.pos[l*3],d=a.pos[l*3+1],u=a.pos[l*3+2];d-=a.fall*t*(.7+c%1*.6),h+=(Math.sin(e+c)*a.sway+.4)*t,u+=Math.cos(e*.8+c)*a.sway*.5*t;const f=h-s,m=u-r;f>45&&(h-=90),f<-45&&(h+=90),m>45&&(u-=90),m<-45&&(u+=90);const v=Xt(this.map,h,u);(d<v||d>v+a.hMax+4)&&(d=v+a.hMax*(.45+Math.random()*.55)),a.pos[l*3]=h,a.pos[l*3+1]=d,a.pos[l*3+2]=u}a.p.geometry.attributes.position.needsUpdate=!0})}}const Da=[{key:"high",pr:2,shadow:2048,trees:1,tufts:1,weather:1},{key:"medium",pr:1.5,shadow:1024,trees:.75,tufts:.5,weather:.55},{key:"low",pr:1,shadow:0,trees:.55,tufts:0,weather:.25}],_x={move:"#9dffc4",attack:"#ff7a5c",work:"#ffd166"};class dd{constructor(t,e,n){R(this,"renderer");R(this,"scene",new A1);R(this,"camera");R(this,"sun");R(this,"hemi");R(this,"sky");R(this,"skyMat");R(this,"nature");R(this,"units",new J1);R(this,"buildings",new ax);R(this,"flames",new ox);R(this,"particles");R(this,"projectiles",new ux);R(this,"weather");R(this,"seasons");R(this,"fowTex");R(this,"fowData");R(this,"fogOn",!0);R(this,"ghost");R(this,"foot");R(this,"ghostKey","");R(this,"pings",[]);R(this,"pingI",0);R(this,"rally");R(this,"rallyFlag");R(this,"shadowExt",0);R(this,"lastFogTick",-1);R(this,"q",0);R(this,"metalOn",!1);R(this,"wallGhost",null);R(this,"wallGhostEra",-1);this.world=e,this.me=n;const s=e.map,r=s.size;this.renderer=t,this.scene.fog=new lc(13624043,130,360),this.fowData=new Uint8Array(new ArrayBuffer(r*r)),this.fowTex=new id(this.fowData,r,r,Wa,Yn),this.fowTex.magFilter=this.fowTex.minFilter=kn,this.fowTex.needsUpdate=!0,_e.uFow.value=this.fowTex,_e.uWorld.value=r,this.skyMat=new zn({side:Je,depthWrite:!1,fog:!1,uniforms:{uTop:{value:yn("#78ade0")},uHor:{value:yn("#d3e6ef")}},vertexShader:"varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:`uniform vec3 uTop; uniform vec3 uHor; varying vec3 vD; void main(){ float t = pow(clamp(vD.y, 0.0, 1.0), 0.55); gl_FragColor = vec4(mix(uHor, uTop, t), 1.0);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`}),this.sky=new Ue(new br(600,24,12),this.skyMat),this.sky.renderOrder=-10,this.scene.add(this.sky),this.hemi=new P1(13625087,7043658,1),this.scene.add(this.hemi),this.sun=new D1(16773852,2.7),this.sun.castShadow=!0,this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.04,this.scene.add(this.sun,this.sun.target),this.scene.add(O1(s),B1(s)),this.nature=G1(s),this.scene.add(this.nature.group);for(const c of this.nature.metal)c.visible=e.players[n].era>=2;this.syncNature(),this.scene.add(this.buildings.group,this.flames.mesh,this.projectiles.group,this.units.group),this.particles=new hx({uFow:_e.uFow,uFowOn:_e.uFowOn,uWorld:_e.uWorld},600),this.scene.add(this.particles.points),this.weather=new xx(s),this.scene.add(this.weather.group),this.seasons=new mx(e.season),this.ghost=new Ue(new Ie,new Ta({vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1,flatShading:!0})),this.ghost.visible=!1,this.ghost.renderOrder=7,this.foot=new Ue(new Li(1,1).rotateX(-Math.PI/2),new ui({color:7331978,transparent:!0,opacity:.35,depthTest:!1,depthWrite:!1,toneMapped:!1})),this.foot.visible=!1,this.foot.renderOrder=6,this.scene.add(this.ghost,this.foot);const a=new ja(.3,.55,28).rotateX(-Math.PI/2);for(let c=0;c<4;c++){const h=new Ue(a,new ui({color:16777215,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!1}));h.renderOrder=6,h.visible=!1,this.scene.add(h),this.pings.push({m:h,t:0})}this.rally=new Vn,this.rally.add(new Ue(new fi(.04,.04,1.6,5).translate(0,.8,0),new Ta({color:7229239}))),this.rallyFlag=new Ue(new Ne(.5,.34,.03).translate(.27,1.38,0),new ui({color:16777215,toneMapped:!1})),this.rally.add(this.rallyFlag),this.rally.visible=!1,this.scene.add(this.rally);const o=e.players[n].start,l=r/2;this.camera=new px(s,o.x+(l-o.x)*.06,o.z+(l-o.z)*.06,Math.atan2(o.x-l,o.z-l)),this.updateFog(!0)}static makeRenderer(t){const e=new T1({canvas:t,antialias:!0,powerPreference:"high-performance"});return e.outputColorSpace=an,e.toneMapping=Au,e.toneMappingExposure=1.08,e.shadowMap.enabled=!0,e.shadowMap.type=Tu,e}syncNature(){const t=this.world;for(const e of t.map.res){const n=e.z*t.size+e.x;t.resKind[n]===0?this.nature.removeRes(n):t.resKind[n]===tn&&t.resAmt[n]<=0&&this.nature.setBerries(n,!1)}}setQuality(t){this.q=t;const e=Da[t],n=Math.min(window.devicePixelRatio||1,e.pr);this.renderer.setPixelRatio(n),this.sun.castShadow=e.shadow>0,e.shadow>0&&this.sun.shadow.mapSize.x!==e.shadow&&(this.sun.shadow.mapSize.set(e.shadow,e.shadow),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.nature.setDensity(e.trees,e.tufts),this.particles.mat.uniforms.uPR.value=n,this.weather.setPixelRatio(n),this.weather.setScale(e.weather)}get quality(){return this.q}resize(t,e){this.renderer.setSize(t,e,!1),this.camera.setAspect(t,e)}setFog(t){this.fogOn=t,_e.uFowOn.value=t?1:0}seen(t,e){if(!this.fogOn)return!0;const n=this.world.size,s=Math.floor(t),r=Math.floor(e);return s>=0&&r>=0&&s<n&&r<n&&this.world.vis[this.me][r*n+s]===1}consume(t){const e=this.world,n=e.map;for(const s of t)switch(s.t){case"tree":this.nature.removeTree(s.k);break;case"res":{const r=s.k;e.resKind[r]===0?this.nature.removeRes(r):e.resKind[r]===tn&&this.nature.setBerries(r,e.resAmt[r]>0);break}case"death":if(s.kind<jt){const r=s.x/256,a=s.z/256;this.seen(r,a)&&this.particles.puff(r,Xt(n,r,a),a,!1)}break;case"built":case"gone":{const r=e.x[s.e]/256,a=e.z[s.e]/256;this.seen(r,a)&&this.particles.puff(r,Xt(n,r,a),a,!0);break}case"proj":{const r=s.x0/256,a=s.z0/256,o=s.x1/256,l=s.z1/256;(this.seen(r,a)||this.seen(o,l))&&this.projectiles.add(e,r,a,o,l,s.ticks,s.kind,s.gap/256,s.tk,s.te,s.h);break}case"age":if(s.player===this.me&&s.era>=2)for(const r of this.nature.metal)r.visible=!0;break}}setWallGhost(t,e=[]){const n=this.world.players[this.me].era;(!this.wallGhost||this.wallGhostEra!==Math.min(n,2))&&(this.wallGhost&&(this.scene.remove(this.wallGhost),this.wallGhost.dispose()),this.wallGhost=new we(Sr("wall",n),new Ta({vertexColors:!0,transparent:!0,opacity:.62,depthWrite:!1,flatShading:!0}),40),this.wallGhost.renderOrder=7,this.wallGhost.frustumCulled=!1,this.wallGhostEra=Math.min(n,2),this.scene.add(this.wallGhost));const s=this.wallGhost,r=this.world.size,a=new Pt;let o=0;for(let l=0;t&&l<t.length&&o<40;l++){const c=t[l]%r+.5,h=Math.floor(t[l]/r)+.5;s.setMatrixAt(o,new qt().makeTranslation(c,Xt(this.world.map,c,h),h)),s.setColorAt(o,a.set(e[l]?"#d8ffe2":"#ff8f80")),o++}s.count=o,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0)}setGhost(t,e=0,n=0,s=!0){if(!t){this.ghost.visible=this.foot.visible=!1;return}const r=be[cn[t]],a=this.world.players[this.me].era,o=t+Math.min(a,2);o!==this.ghostKey&&(this.ghost.geometry=Sr(t,a),this.ghostKey=o);const l=e+r.size/2,c=n+r.size/2,h=Xt(this.world.map,l,c);this.ghost.position.set(l,h,c),this.ghost.visible=!0,this.ghost.material.color.set(s?"#d8ffe2":"#ff8f80"),this.foot.position.set(l,h+.12,c),this.foot.scale.set(r.size,1,r.size),this.foot.visible=!0,this.foot.material.color.set(s?"#6fe08a":"#e0533c")}ping(t,e,n){const s=this.pings[this.pingI++%this.pings.length];s.t=.7,s.m.position.set(t,Xt(this.world.map,t,e)+.08,e),s.m.material.color.set(_x[n]),s.m.visible=!0}render(t,e,n,s){const r=this.world,a=this.camera;_e.uTime.value=s,a.update(t),this.seasons.update(t,r.season,{sun:this.sun,hemi:this.hemi,sky:this.skyMat,fog:this.scene.fog});const o=2.25,l=this.seasons.elev;this.sun.position.set(a.x+Math.cos(o)*Math.cos(l)*120,Math.sin(l)*120,a.z+Math.sin(o)*Math.cos(l)*120),this.sun.target.position.set(a.x,0,a.z),this.sun.target.updateMatrixWorld();const c=Math.round(Math.min(90,Math.max(28,a.dist*.95))/4)*4;if(c!==this.shadowExt){this.shadowExt=c;const u=this.sun.shadow.camera;u.left=-c,u.right=c,u.top=c,u.bottom=-c,u.near=1,u.far=300,u.updateProjectionMatrix()}this.sky.position.copy(a.cam.position),this.updateFog();const h=r.players[this.me].era>=2;if(h!==this.metalOn){this.metalOn=h;for(const u of this.nature.metal)u.visible=h}this.buildings.update(r,this.me,this.fogOn,s),this.units.update(r,e,t,n,this.me,this.fogOn,s,a.cam.quaternion),this.flames.update(this.buildings.fires,s),this.particles.smoke(t,this.buildings.smokes),this.particles.update(t),this.projectiles.update(t),this.weather.update(t,s,this.seasons.w,a.x,a.z);for(const u of this.pings)if(u.t>0){u.t-=t;const f=1-Math.max(0,u.t)/.7;u.m.scale.setScalar(1.4-f*.8),u.m.material.opacity=Math.max(0,1-f),u.t<=0&&(u.m.visible=!1)}let d=-1;if(n.size===1){const u=n.values().next().value;r.isBuilding(u)&&r.owner[u]===this.me&&r.rallyX[u]>=0&&(d=u)}if(d>=0){const u=r.rallyX[d]/256,f=r.rallyZ[d]/256;this.rally.position.set(u,Xt(r.map,u,f),f),this.rally.visible=!0,this.rallyFlag.rotation.y=Math.sin(s*1.4)*.2,this.rallyFlag.material.color.set(r.players[this.me].color)}else this.rally.visible=!1;this.renderer.render(this.scene,a.cam)}updateFog(t=!1){const e=this.world;if(!t&&e.tick===this.lastFogTick)return;this.lastFogTick=e.tick;const n=e.vis[this.me],s=e.explored[this.me],r=this.fowData;for(let a=0;a<r.length;a++)r[a]=n[a]?255:s[a]?128:0;this.fowTex.needsUpdate=!0}dispose(){this.scene.traverse(t=>{const e=t;e.geometry&&e.geometry.dispose();const n=e.material;Array.isArray(n)?n.forEach(s=>s.dispose()):n?.dispose()}),this.fowTex.dispose(),this.sun.shadow.map?.dispose(),this.renderer.renderLists.dispose()}}const fd={"res.food":"Food","res.wood":"Wood","res.stone":"Stone","res.metal":"Metal","res.coins":"Coins","res.pop":"Population","pop.tip":"Population: {n} of {cap} (this era allows up to {max})","era.0":"Stone Age","era.1":"Neolithic","era.2":"Age of Metals","era.3":"Kingdom","era.4":"Republic","era.5":"Empire","era.1.to":"the Neolithic","era.2.to":"the Age of Metals","era.3.to":"the Kingdom","era.4.to":"the Republic","era.5.to":"the Empire","era.1.in":"the Neolithic","era.2.in":"the Age of Metals","era.3.in":"the Kingdom","era.4.in":"the Republic","era.5.in":"the Empire","season.0":"Spring","season.1":"Summer","season.2":"Autumn","season.3":"Winter","cal.year":"Year {y}","tribe.0":"Red tribe","tribe.1":"Blue tribe","tribe.2":"Yellow tribe","tribe.3":"Purple tribe","tribe.6":"Barbarians","tribe.wild":"Wild animal","tribe.you":"Your tribe","unit.villager":"Gatherer","unit.warrior":"Club Warrior","unit.hunter":"Hunter","unit.dog":"Dog","unit.axeman":"Axe Warrior","unit.archer":"Archer","unit.spearman":"Spearman","unit.deer":"Deer","unit.boar":"Wild Boar","unit.wolf":"Wolf","unit.aurochs":"Aurochs","unit.barbarian":"Barbarian","unit.carcass":"Hunted game","unit.villager.d":"Gathers food, wood and stone, hunts and builds.","unit.warrior.d":"Basic fighter with a club.","unit.hunter.d":"Throws spears from afar.","unit.dog.d":"Fast scout that sees far.","unit.axeman.d":"Stronger fighter with a stone axe.","unit.archer.d":"Shoots arrows from afar.","unit.spearman.d":"Strong against animals and horsemen.","unit.deer.d":"Runs away when hit. {food} food.","unit.boar.d":"Fights back! {food} food.","unit.wolf.d":"Dangerous. Hunts people who come close.","unit.aurochs.d":"Huge and strong. {food} food.","unit.barbarian.d":"Attacks every tribe.","unit.carcass.d":"Gatherers can take {food} food from it.","bld.center":"Village Center","bld.house":"House","bld.depot":"Storehouse","bld.military":"Training Ground","bld.farm":"Wheat Field","bld.pen":"Sheep Pen","bld.sanctuary":"Shrine","bld.camp":"Barbarian Camp","bld.center.d":"Trains gatherers and receives resources. Advance to the next era here.","bld.house.d":"Room for {n} more people.","bld.depot.d":"Gatherers drop resources here. Build it near trees or stone.","bld.military.d":"Trains warriors.","bld.farm.d":"One gatherer farms it. Gives food all year, except in winter.","bld.pen.d":"The sheep give food by themselves (not in winter).","bld.sanctuary.d":"Slowly heals your people nearby.","bld.camp.d":"Destroy it to take its loot.","do.idle":"Waiting for orders","do.move":"Walking","do.wood":"Cutting wood","do.berry":"Picking berries","do.stone":"Mining stone","do.metal":"Mining metal","do.farm":"Farming","do.meat":"Taking the meat","do.hunt":"Hunting","do.build":"Building","do.fight":"Fighting","do.return":"Carrying {n} {res} home","do.amove":"Marching","info.hp":"Health","info.building":"Under construction","info.queue":"Training","info.food":"Food","info.farmer":"Farmer: {who}","info.yes":"working","info.no":"nobody — send a gatherer","sel.none":"Nothing selected","sel.many":"{n} selected","sel.clear":"Clear selection","cmd.build":"Build","cmd.back":"Back","cmd.stop":"Stop","cmd.rally":"Gather point","cmd.ageup":"Advance to {era}","cmd.aging":"Advancing to {era}…","cmd.cancelQueue":"Cancel the last one","cmd.place":"Build here","cmd.cancel":"Cancel","why.cost":"Not enough {res}.","why.pop":"Build more houses to train more people.","why.popEra":"Population limit of this era reached.","why.queue":"The line is full (5).","why.age":"First build 2 different kinds of buildings of this era ({n}/2).","why.ageBusy":"Already advancing.","why.villager":"Select a gatherer to build.","why.era":"Available in {era}.","why.maxEra":"More eras are coming in the next updates.","why.done":"Wait until it is built.","place.mouse":"Click where to build · right-click to cancel · hold Shift to build more","place.touch":"Tap where to build, then confirm","place.bad":"Can't build there.","rally.hint":"Tap where the new people should go","rally.set":"Gather point set.","btn.idle":"Idle","btn.army":"Army","btn.home":"Home","btn.fog":"Fog","btn.help":"Help","btn.menu":"Menu","q.high":"High","q.medium":"Medium","q.low":"Low","q.auto":"Graphics set to {q} ({fps} fps)","q.label":"Graphics","hint.mouse":"Left-click to select · right-click on a tree, bush, animal or the ground to give an order · drag to select many · WASD to move the view · wheel to zoom · Q/E to rotate","hint.touch":"Tap to select · then tap a tree, bush, animal or the ground to give an order · drag to move the view · hold and drag to select many · pinch to zoom","msg.built":"{b} is ready.","msg.hunger":"Hunger! There was not enough food for the winter: your people work slower.","msg.spring":"Spring: the berries are back and the herds grow.","msg.winter":"Winter: every person eats {n} food each month. Fields and berries rest.","msg.winterSoon":"Winter starts next month. Store food!","msg.underAttack":"We are under attack!","msg.campLoot":"Barbarian camp destroyed: +200 food and +150 wood!","msg.centerLost":"Our Village Center was destroyed!","msg.popEra":"Population limit of this era reached.","msg.popHouses":"Build more houses so your tribe can grow.","msg.raidSoon":"Barbarians are coming!","msg.defeated":"{p} was defeated.","msg.youDefeated":"Your tribe was defeated.","msg.ageMe":"Your tribe entered {era}!","msg.ageOther":"{p} entered {era}.","msg.go":"See","menu.tagline":"From the Stone Age to the height of Rome","menu.continue":"Continue","menu.saved":"{era} · year {y} · {r} rivals","menu.new":"New game","menu.rivals":"Rival tribes","menu.difficulty":"Difficulty","diff.0":"Easy","diff.1":"Normal","diff.2":"Hard","menu.start":"Start","menu.back":"Back","menu.credits":"Made by Bento, Jojô and Pai","menu.local":"Your game is saved on this device.","menu.localCloud":"Your game is saved on this device and online, in your queres.games account.","menu.continueCloud":"Continue (online save)","cloud.login":"Sign in to save online","cloud.why":"With a queres.games account you can continue on another device.","cloud.account":"Account: {name} · saving online","pause.saving":"Saving…","pause.savedBoth":"Saved on this device and online.","pause.savedLocalOnly":"Saved on this device. The online save did not answer; it will try again.","pause.title":"Paused","pause.resume":"Back to the game","pause.save":"Save the game","pause.saved":"Game saved.","pause.saveFail":"Couldn't save on this device.","pause.quit":"Save and leave","pause.time":"{m} minutes played","end.victory":"Victory!","end.victory.d":"All rival tribes were defeated. Your people will be remembered.","end.defeat":"Defeat","end.defeat.d":"Your tribe was defeated. Try again!","end.watch":"Keep watching","end.menu":"Back to the menu","help.title":"How to play","help.close":"Back to the game","help.goal":"Goal: grow your tribe, survive the winters and defeat the rival tribes. Reach the Neolithic to farm the land.","help.l1":"Select gatherers and send them to berries, trees, stone or animals: they bring everything home by themselves.","help.l2":"Build houses to grow, a storehouse near the trees and a training ground for warriors.","help.l5.touch":"Touch and hold an icon to see its name and what it does.","help.l5.mouse":"Rest the mouse on an icon to see its name and what it does.","help.l3":"In winter each person eats food. Keep some stored!","help.l4":"When 2 kinds of buildings are ready, the Village Center can advance to the next era.","lang.label":"Language",loading:"Loading the world…","bld.forge":"Forge","bld.forge.d":"Research Bronze and Iron: stronger soldiers.","bld.market":"Market","bld.market.d":"Trade 100 of a resource for {get} of another. On fair days (the start of each season) you get {fair}. Research the Wheel here.","bld.stable":"Stable","bld.stable.d":"Trains horsemen.","bld.workshop":"Workshop","bld.workshop.d":"Builds battering rams.","bld.wall":"Stone Wall","bld.wall.d":"Blocks the way. Choose where it starts and where it ends.","bld.tower":"Tower","bld.tower.d":"Shoots arrows at enemies nearby.","bld.center.e2":"Chief's Hall","bld.military.e2":"Barracks","unit.swordsman":"Swordsman","unit.swordsman.d":"Strong fighter with a bronze sword. Beats spearmen.","unit.slinger":"Slinger","unit.slinger.d":"Throws stones with a sling. Good against fighters on foot.","unit.horseman":"Horseman","unit.horseman.d":"Fast. Beats ranged troops and rams. Weak against spearmen.","unit.ram":"Battering Ram","unit.ram.d":"Slow. Only attacks buildings, but hits very hard.","tech.bronze":"Bronze","tech.bronze.d":"+1 attack for soldiers.","tech.iron":"Iron","tech.iron.d":"+1 attack and +1 armor for soldiers.","tech.wheel":"Wheel","tech.wheel.d":"Gatherers carry 15 instead of 10.","trade.give":"Give {res}","trade.giveShort":"Give","trade.get":"Get {n} {res}","trade.fair":"Fair day!","why.techDone":"Already researched.","why.techQueued":"Already in the line.","why.needs":"First research {tech}.","why.trade":"You need 100 {res} to trade.","msg.tech":"Research done: {tech}!","msg.fair":"Fair day! Better trades at the Market for 30 seconds.","msg.metalSeen":"Metal appeared on the map! Gatherers can mine it.","place.wall1.mouse":"Click where the wall starts · right-click to cancel","place.wall1.touch":"Tap where the wall starts, then confirm","place.wall2.mouse":"Now click where the wall ends","place.wall2.touch":"Now tap where the wall ends, then confirm","snd.label":"Sound","snd.music":"Music","snd.sfx":"Effects","snd.amb":"Ambience","snd.l0":"Off","snd.l1":"Low","snd.l2":"Medium","snd.l3":"High","snd.mute":"Mute","snd.unmute":"Turn sound on"},Mx={"res.food":"Comida","res.wood":"Madeira","res.stone":"Pedra","res.metal":"Metal","res.coins":"Moedas","res.pop":"População","pop.tip":"População: {n} de {cap} (esta era permite até {max})","era.0":"Idade da Pedra","era.1":"Neolítico","era.2":"Idade dos Metais","era.3":"Reino","era.4":"República","era.5":"Império","era.1.to":"o Neolítico","era.2.to":"a Idade dos Metais","era.3.to":"o Reino","era.4.to":"a República","era.5.to":"o Império","era.1.in":"no Neolítico","era.2.in":"na Idade dos Metais","era.3.in":"no Reino","era.4.in":"na República","era.5.in":"no Império","season.0":"Primavera","season.1":"Verão","season.2":"Outono","season.3":"Inverno","cal.year":"Ano {y}","tribe.0":"Tribo vermelha","tribe.1":"Tribo azul","tribe.2":"Tribo amarela","tribe.3":"Tribo roxa","tribe.6":"Bárbaros","tribe.wild":"Animal selvagem","tribe.you":"Sua tribo","unit.villager":"Coletor","unit.warrior":"Guerreiro de clava","unit.hunter":"Caçador","unit.dog":"Cão","unit.axeman":"Guerreiro de machado","unit.archer":"Arqueiro","unit.spearman":"Lanceiro","unit.deer":"Cervo","unit.boar":"Javali","unit.wolf":"Lobo","unit.aurochs":"Auroque","unit.barbarian":"Bárbaro","unit.carcass":"Caça abatida","unit.villager.d":"Coleta comida, madeira e pedra, caça e constrói.","unit.warrior.d":"Lutador básico com clava.","unit.hunter.d":"Arremessa lanças de longe.","unit.dog.d":"Batedor rápido que enxerga longe.","unit.axeman.d":"Lutador mais forte, com machado de pedra.","unit.archer.d":"Atira flechas de longe.","unit.spearman.d":"Forte contra animais e cavaleiros.","unit.deer.d":"Foge quando é atingido. {food} de comida.","unit.boar.d":"Revida! {food} de comida.","unit.wolf.d":"Perigoso. Ataca quem chega perto.","unit.aurochs.d":"Enorme e forte. {food} de comida.","unit.barbarian.d":"Ataca todas as tribos.","unit.carcass.d":"Os coletores podem tirar {food} de comida daqui.","bld.center":"Centro da aldeia","bld.house":"Casa","bld.depot":"Depósito","bld.military":"Campo de treino","bld.farm":"Campo de trigo","bld.pen":"Curral","bld.sanctuary":"Santuário","bld.camp":"Acampamento bárbaro","bld.center.d":"Treina coletores e recebe recursos. Aqui se avança para a próxima era.","bld.house.d":"Espaço para mais {n} pessoas.","bld.depot.d":"Os coletores entregam recursos aqui. Construa perto de árvores ou pedras.","bld.military.d":"Treina guerreiros.","bld.farm.d":"Um coletor cultiva. Dá comida o ano todo, menos no inverno.","bld.pen.d":"As ovelhas dão comida sozinhas (menos no inverno).","bld.sanctuary.d":"Cura devagar o seu povo que estiver perto.","bld.camp.d":"Destrua para pegar o que eles guardam.","do.idle":"Esperando ordens","do.move":"Andando","do.wood":"Cortando madeira","do.berry":"Colhendo frutos","do.stone":"Tirando pedra","do.metal":"Tirando metal","do.farm":"Cultivando","do.meat":"Pegando a carne","do.hunt":"Caçando","do.build":"Construindo","do.fight":"Lutando","do.return":"Levando {n} de {res} para casa","do.amove":"Marchando","info.hp":"Vida","info.building":"Em construção","info.queue":"Treinando","info.food":"Comida","info.farmer":"Lavrador: {who}","info.yes":"trabalhando","info.no":"ninguém — mande um coletor","sel.none":"Nada selecionado","sel.many":"{n} selecionados","sel.clear":"Limpar seleção","cmd.build":"Construir","cmd.back":"Voltar","cmd.stop":"Parar","cmd.rally":"Ponto de encontro","cmd.ageup":"Avançar para {era}","cmd.aging":"Avançando para {era}…","cmd.cancelQueue":"Cancelar o último","cmd.place":"Construir aqui","cmd.cancel":"Cancelar","why.cost":"Falta {res}.","why.pop":"Construa mais casas para treinar mais gente.","why.popEra":"Limite de população desta era.","why.queue":"A fila está cheia (5).","why.age":"Antes, construa 2 tipos diferentes de construção desta era ({n}/2).","why.ageBusy":"Já está avançando.","why.villager":"Selecione um coletor para construir.","why.era":"Disponível {era}.","why.maxEra":"Mais eras chegam nas próximas atualizações.","why.done":"Espere terminar a construção.","place.mouse":"Clique onde construir · botão direito cancela · segure Shift para construir mais","place.touch":"Toque onde construir e depois confirme","place.bad":"Não dá para construir aí.","rally.hint":"Toque para onde as pessoas novas devem ir","rally.set":"Ponto de encontro marcado.","btn.idle":"Ocioso","btn.army":"Exército","btn.home":"Aldeia","btn.fog":"Névoa","btn.help":"Ajuda","btn.menu":"Menu","q.high":"Alta","q.medium":"Média","q.low":"Baixa","q.auto":"Gráficos ajustados para {q} ({fps} fps)","q.label":"Gráficos","hint.mouse":"Clique para selecionar · botão direito numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para selecionar vários · WASD move a vista · roda para zoom · Q/E para girar","hint.touch":"Toque para selecionar · depois toque numa árvore, arbusto, animal ou no chão para dar uma ordem · arraste para mover a vista · segure e arraste para selecionar vários · pinça para zoom","msg.built":"{b} ficou pronto.","msg.hunger":"Fome! Faltou comida no inverno: seu povo trabalha mais devagar.","msg.spring":"Primavera: os frutos voltaram e as manadas crescem.","msg.winter":"Inverno: cada pessoa come {n} de comida por mês. Campos e frutos descansam.","msg.winterSoon":"O inverno começa no próximo mês. Guarde comida!","msg.underAttack":"Estamos sendo atacados!","msg.campLoot":"Acampamento bárbaro destruído: +200 de comida e +150 de madeira!","msg.centerLost":"Nosso Centro da aldeia foi destruído!","msg.popEra":"Limite de população desta era.","msg.popHouses":"Construa mais casas para a tribo crescer.","msg.raidSoon":"Os bárbaros estão vindo!","msg.defeated":"{p} foi derrotada.","msg.youDefeated":"Sua tribo foi derrotada.","msg.ageMe":"Sua tribo entrou {era}!","msg.ageOther":"{p} entrou {era}.","msg.go":"Ver","menu.tagline":"Da Idade da Pedra ao auge de Roma","menu.continue":"Continuar","menu.saved":"{era} · ano {y} · {r} rivais","menu.new":"Novo jogo","menu.rivals":"Tribos rivais","menu.difficulty":"Dificuldade","diff.0":"Fácil","diff.1":"Normal","diff.2":"Difícil","menu.start":"Começar","menu.back":"Voltar","menu.credits":"Feito por Bento, Jojô e Pai","menu.local":"Seu jogo fica salvo neste aparelho.","menu.localCloud":"Seu jogo fica salvo neste aparelho e na nuvem, na sua conta do queres.games.","menu.continueCloud":"Continuar (da nuvem)","cloud.login":"Entrar para salvar na nuvem","cloud.why":"Com uma conta do queres.games você continua em outro aparelho.","cloud.account":"Conta: {name} · salvando na nuvem","pause.saving":"Salvando…","pause.savedBoth":"Salvo neste aparelho e na nuvem.","pause.savedLocalOnly":"Salvo neste aparelho. A nuvem não respondeu; tento de novo depois.","pause.title":"Pausado","pause.resume":"Voltar ao jogo","pause.save":"Salvar o jogo","pause.saved":"Jogo salvo.","pause.saveFail":"Não deu para salvar neste aparelho.","pause.quit":"Salvar e sair","pause.time":"{m} minutos de jogo","end.victory":"Vitória!","end.victory.d":"Todas as tribos rivais foram derrotadas. Seu povo será lembrado.","end.defeat":"Derrota","end.defeat.d":"Sua tribo foi derrotada. Tente de novo!","end.watch":"Continuar olhando","end.menu":"Voltar ao menu","help.title":"Como jogar","help.close":"Voltar ao jogo","help.goal":"Objetivo: fazer sua tribo crescer, passar pelos invernos e vencer as tribos rivais. Chegue ao Neolítico para plantar.","help.l1":"Selecione coletores e mande-os para frutos, árvores, pedras ou animais: eles levam tudo para casa sozinhos.","help.l2":"Construa casas para crescer, um depósito perto das árvores e um campo de treino para os guerreiros.","help.l5.touch":"Toque e segure um ícone para ver o nome e para que ele serve.","help.l5.mouse":"Pare o mouse em cima de um ícone para ver o nome e para que ele serve.","help.l3":"No inverno cada pessoa come. Deixe comida guardada!","help.l4":"Com 2 tipos de construção prontos, o Centro da aldeia pode avançar para a próxima era.","lang.label":"Idioma",loading:"Carregando o mundo…","bld.forge":"Forja","bld.forge.d":"Pesquise Bronze e Ferro: soldados mais fortes.","bld.market":"Mercado","bld.market.d":"Troque 100 de um recurso por {get} de outro. Nos dias de feira (no começo de cada estação), você recebe {fair}. Aqui se pesquisa a Roda.","bld.stable":"Estábulo","bld.stable.d":"Treina cavaleiros.","bld.workshop":"Oficina","bld.workshop.d":"Faz aríetes.","bld.wall":"Muralha","bld.wall.d":"Bloqueia a passagem. Escolha onde ela começa e onde termina.","bld.tower":"Torre","bld.tower.d":"Atira flechas nos inimigos por perto.","bld.center.e2":"Salão do chefe","bld.military.e2":"Quartel","unit.swordsman":"Espadachim","unit.swordsman.d":"Lutador forte, com espada de bronze. Vence lanceiros.","unit.slinger":"Fundeiro","unit.slinger.d":"Atira pedras com a funda. Bom contra lutadores a pé.","unit.horseman":"Cavaleiro","unit.horseman.d":"Rápido. Vence quem atira de longe e os aríetes. Fraco contra lanceiros.","unit.ram":"Aríete","unit.ram.d":"Lento. Só ataca construções, mas bate muito forte.","tech.bronze":"Bronze","tech.bronze.d":"+1 de ataque para os soldados.","tech.iron":"Ferro","tech.iron.d":"+1 de ataque e +1 de armadura para os soldados.","tech.wheel":"Roda","tech.wheel.d":"Os coletores levam 15 em vez de 10.","trade.give":"Dar {res}","trade.giveShort":"Dar","trade.get":"Receber {n} de {res}","trade.fair":"Dia de feira!","why.techDone":"Já pesquisado.","why.techQueued":"Já está na fila.","why.needs":"Primeiro pesquise {tech}.","why.trade":"Precisa de 100 de {res} para trocar.","msg.tech":"Pesquisa pronta: {tech}!","msg.fair":"Dia de feira! Trocas melhores no Mercado por 30 segundos.","msg.metalSeen":"O metal apareceu no mapa! Os coletores já podem minerar.","place.wall1.mouse":"Clique onde a muralha começa · botão direito cancela","place.wall1.touch":"Toque onde a muralha começa e confirme","place.wall2.mouse":"Agora clique onde a muralha termina","place.wall2.touch":"Agora toque onde ela termina e confirme","snd.label":"Som","snd.music":"Música","snd.sfx":"Efeitos","snd.amb":"Ambiente","snd.l0":"Desligado","snd.l1":"Baixo","snd.l2":"Médio","snd.l3":"Alto","snd.mute":"Silenciar","snd.unmute":"Ligar o som"},yx={en:fd,pt:Mx},pd="origines_lang";let Zs="en";try{const i=localStorage.getItem(pd);(i==="pt"||i==="en")&&(Zs=i)}catch{}const Aa=[],si=()=>Zs;function tu(i){Zs=i;try{localStorage.setItem(pd,i)}catch{}document.documentElement.lang=i==="pt"?"pt-BR":"en",Aa.forEach(t=>t())}const md=i=>(Aa.push(i),()=>{const t=Aa.indexOf(i);t>=0&&Aa.splice(t,1)});function $(i,t={}){let e=yx[Zs][i]??fd[i]??i;for(const n in t)e=e.split(`{${n}}`).join(String(t[n]));return e}const bx=i=>Math.floor(i).toLocaleString(Zs==="pt"?"pt-BR":"en-US");typeof document<"u"&&(document.documentElement.lang=Zs==="pt"?"pt-BR":"en");const Sx=(i,t="currentColor")=>`<svg viewBox="0 0 24 24" fill="none" stroke="${t}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,Gl={food:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 18c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 18c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/>',wood:'<ellipse cx="7" cy="12" rx="3" ry="5"/><path d="M7 7h11c1.7 0 3 2.2 3 5s-1.3 5-3 5H7"/><circle cx="7" cy="12" r="1.2"/>',stone:'<path d="M4 17l3-8 5-3 6 2 2 7-4 3H8z"/><path d="M7 9l4 3 7-4M11 12l1 8"/>',metal:'<path d="M3 16l3-7h12l3 7z"/><path d="M6 9l2 7M18 9l-2 7"/>',coins:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/>',pop:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15.5 14.2c3 .2 5.5 2.4 5.5 5.8"/>',villager:'<circle cx="11" cy="5.5" r="2.8"/><path d="M6 21v-6a5 5 0 0 1 10 0v6"/><path d="M15 13h5.5l-1.2 5H16"/>',warrior:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/>',axeman:'<path d="M5 20L16.5 8.5"/><path d="M13.5 5.5c3-1.5 6 .5 6.5 4.5-2.5.5-4-.5-4-.5l-2-2s-1-1-.5-2z"/>',hunter:'<path d="M4 20L17 7"/><path d="M14.5 4.5H20v5.5z"/><path d="M7 14l3 3"/>',archer:'<path d="M6 3c7 2 12 7 14 15"/><path d="M6 3l14 15"/><path d="M12 9.5l5-1-1 5"/>',spearman:'<circle cx="9" cy="14" r="5"/><path d="M13 11L20.5 3.5"/><path d="M18 3.5h2.5V6"/>',dog:'<circle cx="6.5" cy="9.5" r="1.7"/><circle cx="10.5" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="18.5" cy="9.5" r="1.7"/><path d="M8 17c0-3 2-5.5 4.5-5.5S17 14 17 17c0 2.2-2 2.4-4.5 1.4C10 19.4 8 19.2 8 17z"/>',animal:'<path d="M7 4l2 4M17 4l-2 4"/><path d="M6 10c0-2 3-3 6-3s6 1 6 3l-1 6c-.4 2.5-2.5 4-5 4s-4.6-1.5-5-4z"/><circle cx="10" cy="13" r=".6"/><circle cx="14" cy="13" r=".6"/>',barbarian:'<path d="M5 20l8.5-8.5"/><path d="M13 11.5c.5-3.5 3.5-6.5 6.5-6 .5 3-2.5 6-6.5 6.5z"/><path d="M4 6l4 1-1 4"/>',carcass:'<path d="M7.5 15C4.5 15 3 13 3 11s3-6 8-6 8 3 8 6-3 5-6 5"/><path d="M13.5 16l4 4"/><circle cx="19" cy="21" r="1"/>',center:'<path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-3 2-4 3-6 1 2 2 3 3 3 0-3-1-5 0-7z"/>',house:'<path d="M3 20L12 4l9 16z"/><path d="M10 20v-5h4v5"/>',depot:'<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M4 13.5h16M9 9V5h6v4"/>',military:'<path d="M5 5l14 14M19 5L5 19"/><path d="M4 8.5V4h4.5M20 8.5V4h-4.5"/>',farm:'<path d="M12 21V8"/><path d="M12 8c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 8c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4zM12 13c-2.5 0-4-1.8-4-4 2.5 0 4 1.8 4 4zM12 13c2.5 0 4-1.8 4-4-2.5 0-4 1.8-4 4z"/><path d="M3 21h18"/>',pen:'<ellipse cx="11" cy="12" rx="6.5" ry="4.5"/><circle cx="18.5" cy="10" r="2"/><path d="M7.5 16.5v3M14.5 16.5v3"/>',sanctuary:'<path d="M9 21V7l3-4 3 4v14"/><path d="M5 21h14"/>',camp:'<path d="M3 20L10 6l7 14z"/><path d="M14 9l7 11h-4"/>',ageup:'<path d="M12 3l5 7h-3.2v6h-3.6v-6H7z"/><path d="M5 20h14"/>',swordsman:'<path d="M5 19L17 7"/><path d="M17 7l2.5-3.5L16 6"/><path d="M6.5 14.5l3 3"/><path d="M4 20l1.5-1.5"/>',slinger:'<path d="M6 20c0-6 2-10 6-12"/><path d="M12 8c3-1 5-3 6-5"/><circle cx="18.5" cy="3.8" r="1.6"/><circle cx="7" cy="8" r="2.2"/>',horseman:'<path d="M4 20l2-6c1-3 4-4 7-4h3l3-4 1 3-2 3v8"/><path d="M8 14v6M16 14v6"/><circle cx="12" cy="5" r="2"/>',ram:'<path d="M3 13l5-6h8l5 6z"/><path d="M2 11h20"/><circle cx="7" cy="17" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',forge:'<path d="M4 15h11l3-3h2v3l-3 3H7z"/><path d="M8 18v3M14 18v3"/><path d="M10 11V4l3 2"/>',market:'<path d="M3 9l2-5h14l2 5"/><path d="M3 9c0 2 4 2 4 0 0 2 5 2 5 0 0 2 5 2 5 0 0 2 4 2 4 0"/><path d="M5 11v9h14v-9"/>',stable:'<path d="M3 11l9-6 9 6"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6M9 14l6 6M15 14l-6 6"/>',workshop:'<path d="M4 19l7-7"/><path d="M10 7l3-3 5 5-3 3z"/><circle cx="17" cy="17" r="3"/><path d="M17 14v6M14 17h6"/>',wall:'<path d="M3 9h18v11H3z"/><path d="M3 14.5h18M8 9v5.5M15 9v5.5M11.5 14.5V20M5 9V6h3v3M10.5 9V6h3v3M16 9V6h3v3"/>',tower:'<path d="M7 21V9h10v12"/><path d="M5 9V4h3v2h3V4h2v2h3V4h3v5z"/><path d="M10.5 21v-4h3v4"/>',bronze:'<path d="M6 19L18 7"/><path d="M18 7l2-4-4 2"/><path d="M7.5 13.5l3 3"/><circle cx="6" cy="19" r="1.5"/>',iron:'<path d="M4 18h12l4-4H8z"/><path d="M8 14V9h8v5"/><path d="M12 9V5"/>',wheel:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 4v6M12 14v6M4 12h6M14 12h6"/>',trade:'<path d="M4 8h13l-3-3M20 16H7l3 3"/>',sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',mute:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',build:'<path d="M13.5 5.5l5 5-2.5 2.5-5-5z"/><path d="M11 8l-7 7 2.5 2.5 7-7"/><path d="M14 4l2-1 5 5-1 2"/>',rally:'<path d="M6 21V4"/><path d="M6 4h11l-2.2 4L17 12H6"/>',back:'<path d="M15 18l-6-6 6-6"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',check:'<path d="M5 12.5l4.5 4.5L19 7"/>',menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5v.01"/>',idle:'<circle cx="12" cy="7" r="3"/><path d="M7 21v-4a5 5 0 0 1 10 0v4"/><path d="M19 4l2-2M21 6h2"/>',army:'<path d="M14.5 17.5L3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',cancel:'<path d="M6 6l12 12M18 6L6 18"/>',"season.0":'<path d="M12 21V11"/><path d="M12 11c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 14c0-3-2.5-5.5-6-5.5 0 3.5 2.5 5.5 6 5.5z"/>',"season.1":'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',"season.2":'<path d="M5 19c0-9 6-14 15-15-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',"season.3":'<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><path d="M9 4l3 2 3-2M9 20l3-2 3 2"/>'},Ex={food:"#d4a334",wood:"#b07a48",stone:"#a3a9b0",metal:"#5bb39a",coins:"#d6a84a",pop:"#ecf1ec"},Tx=["#8fd16a","#f2c14e","#e08a3c","#a9d3f2"];function ke(i,t){const e=Gl[i]??Gl.animal;return!t&&i.startsWith("season.")&&(t=Tx[Number(i.slice(7))]),Sx(e,t??Ex[i]??"currentColor")}function As(i){return i in Gl?ke(i,"currentColor"):ke(["deer","boar","wolf","aurochs"].includes(i)?"animal":"villager","currentColor")}const Gi=[0,.2,.5,.85],eu="origines_som",nu={music:1,sfx:3,amb:2,muted:!1};class Ax{constructor(){R(this,"ctx",null);R(this,"opts",{...nu});R(this,"master");R(this,"duckG");R(this,"buses",{});R(this,"scene","menu");R(this,"paused",!1);R(this,"hidden",!1);R(this,"onReady",[]);R(this,"onChange",[]);R(this,"voices",[]);R(this,"maxVoices",16);R(this,"installed",!1);try{const t=JSON.parse(localStorage.getItem(eu)??"null");t&&typeof t=="object"&&(this.opts={...nu,...t})}catch{}}install(){if(this.installed)return;this.installed=!0;const t=()=>this.unlock();for(const e of["pointerdown","pointerup","touchend","click","keydown"])addEventListener(e,t,{capture:!0,passive:!0});document.addEventListener("visibilitychange",()=>this.setHidden(document.hidden)),addEventListener("pagehide",()=>this.setHidden(!0)),addEventListener("pageshow",()=>this.setHidden(document.hidden))}unlock(){if(!this.ctx){const e=window.AudioContext??window.webkitAudioContext;if(!e)return;try{this.ctx=new e({latencyHint:"interactive"})}catch{return}const n=this.ctx,s=n.createDynamicsCompressor();s.threshold.value=-12,s.knee.value=8,s.ratio.value=10,s.attack.value=.004,s.release.value=.25,s.connect(n.destination),this.master=n.createGain(),this.master.connect(s),this.duckG=n.createGain(),this.duckG.connect(this.master);for(const r of["music","amb","sfx","ui","alert"]){const a=n.createGain();a.gain.value=0,a.connect(r==="music"?this.duckG:this.master),this.buses[r]=a}this.apply(!0);for(const r of this.onReady.splice(0))r()}const t=this.ctx;if(t.state!=="running"&&t.state!=="closed"&&!this.hidden){t.resume().catch(()=>{});try{const e=t.createBufferSource();e.buffer=t.createBuffer(1,1,t.sampleRate),e.connect(t.destination),e.start(0)}catch{}}}whenRunning(t){const e=this.ctx;if(e){if(this.running){t();return}this.hidden||e.state==="closed"||e.resume().then(()=>{this.running&&t()}).catch(()=>{})}}ready(t){this.ctx?t():this.onReady.push(t)}changed(t){this.onChange.push(t)}out(t){return this.ctx?this.buses[t]:null}get now(){return this.ctx?.currentTime??0}get running(){return!!this.ctx&&this.ctx.state==="running"&&!this.hidden}setScene(t){this.scene=t,this.paused=!1,this.apply()}setPaused(t){this.paused=t,this.apply()}setOpts(t){this.opts={...this.opts,...t};try{localStorage.setItem(eu,JSON.stringify(this.opts))}catch{}this.apply();for(const e of this.onChange)e()}toggleMute(){this.setOpts({muted:!this.opts.muted})}level(t){const e=this.opts;if(e.muted)return 0;switch(t){case"music":return this.scene==="menu"?e.music?Math.max(Gi[2],Gi[e.music]):0:Gi[e.music];case"amb":return this.scene==="game"?Gi[e.amb]*(this.paused?.35:1):0;case"sfx":return Gi[e.sfx];case"ui":return Gi[e.sfx]*.8;case"alert":return e.sfx?Math.max(.5,Gi[e.sfx]):0}}apply(t=!1){if(!this.ctx)return;const e=this.ctx.currentTime;for(const n of Object.keys(this.buses)){const s=this.buses[n].gain;s.cancelScheduledValues(e),t?s.setValueAtTime(this.level(n),e):s.setTargetAtTime(this.level(n),e,n==="music"?.8:.15)}}duck(t=.55,e=2.2){if(!this.ctx)return;const n=this.duckG.gain,s=this.ctx.currentTime;n.cancelScheduledValues(s),n.setTargetAtTime(1-t,s,.05),n.setTargetAtTime(1,s+e,.6)}setHidden(t){this.hidden=t,this.ctx&&(t?this.ctx.suspend().catch(()=>{}):this.ctx.resume().catch(()=>{}))}voice(t){const e=this.now;return this.voices=this.voices.filter(n=>n>e),this.voices.length>=this.maxVoices?!1:(this.voices.push(e+t),!0)}}const _t=new Ax,wx=["food","wood","stone","metal"],Cx=["I","II","III","IV","V","VI"],Mn=i=>i.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]),Ba=class Ba{constructor(t,e,n,s,r){R(this,"root");R(this,"box");R(this,"minimap");R(this,"$",{});R(this,"cardMode","main");R(this,"cardFor","");R(this,"sigTop","");R(this,"sigSel","");R(this,"sigCard","");R(this,"sigMode","");R(this,"idleN",-1);R(this,"toasts",[]);R(this,"btns",[]);R(this,"progs",[]);R(this,"mode","normal");R(this,"placeOk",!0);R(this,"slow",0);R(this,"hintHidden",!1);R(this,"wallStep",0);R(this,"give","food");R(this,"tipEl");R(this,"tipTimer",0);R(this,"holdTimer",0);R(this,"hoverTimer",0);R(this,"tipHeld",!1);R(this,"placeKey","");R(this,"tipUp",t=>{clearTimeout(this.holdTimer),!(t.pointerType==="mouse"||this.tipEl.hidden)&&(clearTimeout(this.tipTimer),this.tipTimer=window.setTimeout(()=>this.hideTip(),this.tipHeld?4e3:2500))});R(this,"offLang");this.world=t,this.me=e,this.act=n,this.touch=s,this.selected=r,this.root=document.getElementById("hud"),this.box=document.createElement("div"),this.box.className="box",document.body.appendChild(this.box),this.minimap=document.createElement("canvas"),this.minimap.id="minimapa",this.tipEl=document.createElement("div"),this.tipEl.className="tip panel",this.tipEl.id="dica",this.tipEl.setAttribute("role","tooltip"),this.tipEl.hidden=!0,document.body.appendChild(this.tipEl),this.bindTips(),this.build(),this.offLang=md(()=>this.build()),_t.changed(()=>{const a=document.getElementById("btn-som");if(!a)return;const o=_t.opts.muted;a.innerHTML=ke(o?"mute":"sound"),a.title=$(o?"snd.unmute":"snd.mute"),a.setAttribute("aria-label",a.title),a.setAttribute("aria-pressed",String(o))})}dispose(){this.offLang(),this.root.innerHTML="",this.box.remove(),this.hideTip(),this.tipEl.remove(),removeEventListener("pointerup",this.tipUp),removeEventListener("pointercancel",this.tipUp)}bindTips(){const t=e=>e.target?.closest?.(Ba.TIP_SEL)??null;this.root.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse")return;clearTimeout(this.holdTimer),this.tipHeld=!1;const n=t(e);n&&(n.classList.contains("cb")&&this.showTip(n),this.holdTimer=window.setTimeout(()=>{this.tipHeld=!0,this.showTip(n)},550))}),this.root.addEventListener("pointerover",e=>{if(e.pointerType!=="mouse")return;const n=t(e);n?.classList.contains("cb")&&(clearTimeout(this.hoverTimer),this.hoverTimer=window.setTimeout(()=>this.showTip(n),250))}),this.root.addEventListener("pointerout",e=>{if(e.pointerType!=="mouse")return;const n=t(e);n&&n.contains(e.relatedTarget)||(clearTimeout(this.hoverTimer),this.hideTip())}),this.root.addEventListener("click",e=>{this.tipHeld&&(this.tipHeld=!1,e.stopPropagation(),e.preventDefault())},!0),this.root.addEventListener("contextmenu",e=>{t(e)&&e.preventDefault()}),addEventListener("pointerup",this.tipUp),addEventListener("pointercancel",this.tipUp)}showTip(t){let e="";if(t.classList.contains("cb")){const l=this.btns[Number(t.dataset.i)];if(!l)return;e=this.tipHtml(l)}else{const l=t.getAttribute("title")??t.getAttribute("aria-label");if(!l)return;e=`<div class="tip-h"><b>${Mn(l)}</b></div>`}const n=this.tipEl;clearTimeout(this.tipTimer),n.innerHTML=e,n.hidden=!1;const s=t.getBoundingClientRect(),r=n.offsetWidth,a=n.offsetHeight;let o=s.top-a-8;o<8&&(o=s.bottom+8),n.style.left=`${Math.round(Math.max(8,Math.min(innerWidth-r-8,s.left+s.width/2-r/2)))}px`,n.style.top=`${Math.round(o)}px`}hideTip(){clearTimeout(this.tipTimer),clearTimeout(this.hoverTimer),this.tipEl.hidden=!0}tipHtml(t){return`<div class="tip-h"><span class="tip-ic">${As(t.ic)}</span><b>${Mn(t.tip?.name??t.label)}</b>${t.cost?this.costHtml(t.cost):""}</div>`+(t.tip?.desc?`<p>${Mn(t.tip.desc)}</p>`:"")+(t.why?`<p class="tip-why">${Mn(t.why)}</p>`:"")}costHtml(t){const e=this.world.players[this.me].res;return`<span class="cost">${Ki.filter(n=>t[n]).map(n=>`<span class="c${e[n]<t[n]*100?" no":""}">${ke(n)}${t[n]}</span>`).join("")}</span>`}bldDesc(t,e){const n=be[cn[t]];return $(`bld.${t}.d`,{n:n.pop?n.pop[Math.min(e,n.pop.length-1)]:0,get:Bn.get,fair:Bn.fair})}build(){const t=this.touch;this.root.innerHTML=`
      <header class="row top">
        <div class="era-chip panel" id="era"></div>
        <div class="res panel" id="res"></div>
        <div class="cal panel" id="cal"></div>
        <div class="spacer"></div>
        <div class="tools panel">
          <button id="btn-som" title="${$(_t.opts.muted?"snd.unmute":"snd.mute")}" aria-label="${$(_t.opts.muted?"snd.unmute":"snd.mute")}" aria-pressed="${_t.opts.muted}">${ke(_t.opts.muted?"mute":"sound")}</button>
          <button id="btn-ajuda" title="${$("btn.help")}" aria-label="${$("btn.help")}">${ke("help")}</button>
          <button id="btn-menu" title="${$("btn.menu")}" aria-label="${$("btn.menu")}">${ke("menu")}<span class="btn-label">${$("btn.menu")}</span></button>
        </div>
      </header>
      <div class="middle">
        <div class="toasts" id="toasts" aria-live="polite"></div>
        <div class="modebar panel" id="modebar" hidden><span id="modebar-text"></span>
          <button id="btn-confirmar-obra" class="primary" hidden>${ke("check")}<span>${$("cmd.place")}</span></button>
          <button id="btn-cancelar-modo">${ke("cancel")}<span>${$("cmd.cancel")}</span></button></div>
        <p class="hint panel" id="hint"${this.hintHidden?' style="opacity:0"':""}>${$(t?"hint.touch":"hint.mouse")}</p>
      </div>
      <footer class="bottom">
        <section class="sel panel" id="sel" hidden></section>
        <section class="cmd panel" id="cmd" hidden></section>
        <div class="side">
          <div class="quick panel">
            <button id="btn-ocioso" title="${$("btn.idle")}">${ke("idle")}<span class="btn-label">${$("btn.idle")}</span><span class="badge" id="idle-n" hidden></span></button>
            <button id="btn-exercito" title="${$("btn.army")}">${ke("army")}<span class="btn-label">${$("btn.army")}</span></button>
            <button id="btn-aldeia" title="${$("btn.home")}">${ke("home")}<span class="btn-label">${$("btn.home")}</span></button>
          </div>
          <div class="mini panel" id="mini"></div>
        </div>
      </footer>
      <div class="modal" id="ajuda" data-open="false"><div class="card panel">
        <h2>${$("help.title")}</h2><p class="goal">${$("help.goal")}</p>
        <ul>${["help.l1","help.l2","help.l3","help.l4",t?"help.l5.touch":"help.l5.mouse"].map(n=>`<li>${$(n)}</li>`).join("")}</ul>
        <p class="hint-copy">${$(t?"hint.touch":"hint.mouse")}</p>
        <button id="btn-fechar-ajuda" class="primary">${$("help.close")}</button></div></div>`;for(const n of["era","res","cal","toasts","modebar","modebar-text","btn-confirmar-obra","hint","sel","cmd","mini","ajuda","idle-n"])this.$[n]=document.getElementById(n);this.$.mini.appendChild(this.minimap);const e=(n,s)=>{document.getElementById(n).onclick=s};e("btn-ajuda",()=>this.$.ajuda.dataset.open="true"),e("btn-fechar-ajuda",()=>this.$.ajuda.dataset.open="false"),e("btn-menu",()=>this.act.menu()),e("btn-som",()=>_t.toggleMute()),e("btn-ocioso",()=>this.act.idle()),e("btn-exercito",()=>this.act.army()),e("btn-aldeia",()=>this.act.home()),e("btn-confirmar-obra",()=>this.act.placeConfirm()),e("btn-cancelar-modo",()=>this.act.cancelMode()),this.$.ajuda.onclick=n=>{n.target===this.$.ajuda&&(this.$.ajuda.dataset.open="false")},this.sigTop=this.sigSel=this.sigCard=this.sigMode="",this.idleN=-1,this.toasts=[],this.update(0,!0)}openHelp(){this.$.ajuda.dataset.open="true"}hideHint(){this.hintHidden||(this.hintHidden=!0,this.$.hint.style.opacity="0")}setMode(t,e=!0,n=0,s=""){this.mode=t,this.placeOk=e,this.wallStep=n,this.placeKey=s,t!=="normal"&&this.hideTip()}bldName(t,e){for(let n=e;n>=0;n--){const s=`bld.${t}.e${n}`,r=$(s);if(r!==s)return r}return $(`bld.${t}`)}resetCard(){this.cardMode="main"}toast(t,e,n,s=""){if(this.toasts.some(a=>a.text===t&&a.t>2.5))return;const r=document.createElement("button");for(r.className="toast panel",r.dataset.aviso=s||"info",r.innerHTML=`<span>${Mn(t)}</span>${e!==void 0?`<span class="go">${$("msg.go")}</span>`:""}`,r.onclick=()=>{e!==void 0&&n!==void 0&&this.act.jump(e,n),r.remove(),this.toasts=this.toasts.filter(a=>a.el!==r)},this.$.toasts.prepend(r),this.toasts.unshift({el:r,t:5,text:t});this.toasts.length>3;)this.toasts.pop().el.remove()}tribe(t){return t===this.me?$("tribe.you"):$(t===fe?"tribe.wild":`tribe.${t===ci?6:t}`)}onEvents(t){for(const e of t){if(e.t==="age"){this.toast(e.player===this.me?$("msg.ageMe",{era:$(`era.${e.era}.in`)}):$("msg.ageOther",{p:this.tribe(e.player),era:$(`era.${e.era}.in`)}),void 0,void 0,"era");continue}if(e.t!=="msg"||e.player!==this.me)continue;const[n,s]=e.key.split("."),r=e.x!==void 0?e.x/256:void 0,a=e.z!==void 0?e.z/256:void 0;n==="built"?this.toast($("msg.built",{b:$(`bld.${s}`)}),r,a,"built"):n==="defeated"?this.toast(Number(s)===this.me?$("msg.youDefeated"):$("msg.defeated",{p:this.tribe(Number(s))}),void 0,void 0,"defeated"):n==="tech"?this.toast($("msg.tech",{tech:$(`tech.${s}`)}),r,a,"tech"):this.toast($(`msg.${n}`,{n:this.world.players[this.me].era<=1?1:2}),n==="underAttack"||n==="raidSoon"||n==="centerLost"||n==="campLoot"?r:void 0,a,n)}}update(t,e=!1){for(const n of this.toasts)(n.t-=t)<=0&&n.el.remove();this.toasts=this.toasts.filter(n=>n.t>0);for(const n of this.progs)n.el.style.width=`${Math.round(Math.max(0,Math.min(1,n.f()))*100)}%`;this.slow-=t,!(!e&&this.slow>0)&&(this.slow=.15,this.renderTop(),this.renderMode(),this.renderSel(),this.renderCard(),this.renderIdle())}renderTop(){const t=this.world,e=t.players[this.me],n=e.era,s=n>=2?["food","wood","stone","metal"]:["food","wood","stone"],r=t.pop(this.me),a=t.popCap(this.me),o=s.map(l=>Math.floor(e.res[l]/100)).join(",")+`|${r}|${a}|${n}|${e.aging>0}|${t.season}|${t.year}|${si()}`;o!==this.sigTop&&(this.sigTop=o,this.$.res.innerHTML=s.map(l=>`<div class="r" title="${$(`res.${l}`)}">${ke(l)}<span>${bx(e.res[l]/100)}</span></div>`).join("")+`<div class="r${r>=a?" full":""}" title="${$("pop.tip",{n:r,cap:a,max:vr[n]})}">${ke("pop")}<span>${r}/${a}</span></div>`,this.$.era.innerHTML=`<span class="num">${Cx[n]}</span><span class="name">${$(`era.${n}`)}</span>${e.aging>0?'<span class="era-prog"><i data-p="aging"></i></span>':""}`,this.$.era.title=$(`era.${n}`),this.$.cal.innerHTML=`${ke(`season.${t.season}`)}<span class="name">${$(`season.${t.season}`)}</span><span class="yr">${$("cal.year",{y:t.year})}</span><span class="cal-prog"><i data-p="season"></i></span>`,this.$.cal.title=`${$(`season.${t.season}`)} · ${$("cal.year",{y:t.year})}`,this.$.cal.dataset.season=String(t.season),this.bindProgs())}renderMode(){const t=this.world.players[this.me].era,e=`${this.mode}|${this.placeOk}|${this.wallStep}|${this.placeKey}|${t}|${si()}`;if(e===this.sigMode)return;this.sigMode=e;const n=this.$.modebar;n.hidden=this.mode==="normal",this.root.dataset.mode=this.mode,this.$["btn-confirmar-obra"].hidden=!(this.mode==="place"&&this.touch),this.$["btn-confirmar-obra"].setAttribute("aria-disabled",String(!this.placeOk));const s=this.touch?"touch":"mouse",r=this.mode==="place"?this.wallStep&&(this.placeOk||this.wallStep===2)?$(`place.wall${this.wallStep}.${s}`):this.placeOk?$(`place.${s}`):$("place.bad"):this.mode==="rally"?$("rally.hint"):"";this.$["modebar-text"].innerHTML=(this.mode==="place"&&this.placeKey?`<b class="mb-name">${Mn(this.bldName(this.placeKey,t))}</b> · `:"")+Mn(r)}renderIdle(){const t=this.world;let e=0;for(let n=0;n<t.top;n++)t.isUnit(n)&&t.owner[n]===this.me&&t.kind[n]===ie.villager&&t.task[n]===0&&t.state[n]!==Ze&&e++;e!==this.idleN&&(this.idleN=e,this.$["idle-n"].hidden=e===0,this.$["idle-n"].textContent=String(e))}doing(t){const e=this.world,n=e.task[t],s=e.tgt[t];return n===ze?e.phase[t]===Ha?$("do.return",{n:Math.floor(e.carry[t]/100),res:$(`res.${wx[e.carryRes[t]]}`).toLowerCase()}):s<0?$("do.move"):e.tgtTile[t]?$(e.map.tree[s]?"do.wood":e.resKind[s]===tn?"do.berry":e.resKind[s]===di?"do.stone":"do.metal"):$(e.kind[s]===Qt?"do.meat":"do.farm"):$(n===qn?"do.build":n===Ge?s>=0&&e.owner[s]===fe?"do.hunt":"do.fight":n===ss?"do.amove":e.state[t]===Ze?"do.move":"do.idle")}renderSel(){const t=this.world,e=[...this.selected].filter(a=>t.alive[a]);if(!e.length){this.sigSel!=="none"&&(this.sigSel="none",this.$.sel.hidden=!0);return}let n,s;if(e.length===1){const a=e[0],o=t.kind[a],l=t.owner[a],c=l===this.me;if(o>=jt){const h=be[o-jt],d=t.players[l]?.era??0,u=t.done[a]===1,f=t.queue[a],m=h.key==="farm"&&u?this.farmer(a):null;if(n=`b${a}|${t.hp[a]}|${u}|${f.join(",")}|${m}|${si()}`,n===this.sigSel)return;const v=c?u?"":$("info.building"):this.tribe(l),g=this.bldDesc(h.key,d);s=this.head(As(h.key),this.bldName(h.key,d),v,c)+this.hp(t.hp[a],h.hp)+(!u&&c?`<div class="prog"><i data-p="build:${a}"></i></div>`:"")+`<div class="sel-desc">${g}</div>`+(m!==null?`<div class="sel-line">${$("info.farmer",{who:$(m?"info.yes":"info.no")})}</div>`:"")+(f.length?`<div class="queue" aria-label="${$("info.queue")}">${f.map((p,M)=>{const x=p>=on?ts[p-on].key:yt[p].key;return`<span class="qi" title="${$(p>=on?`tech.${x}`:`unit.${x}`)}">${As(x)}${M===0?`<i class="qp" data-p="queue:${a}"></i>`:""}</span>`}).join("")}</div>`:"")}else if(o===Qt){const h=Math.floor(t.work[a]/100);if(n=`c${a}|${h}|${si()}`,n===this.sigSel)return;s=this.head(ke("carcass","currentColor"),$("unit.carcass"),$(`unit.${yt[t.sub[a]]?.key??"deer"}`),!1)+`<div class="sel-desc">${$("unit.carcass.d",{food:h})}</div>`}else{const h=yt[o],d=c?this.doing(a):this.tribe(l);if(n=`u${a}|${t.hp[a]}|${d}|${si()}`,n===this.sigSel)return;s=this.head(As(h.key),$(`unit.${h.key}`),d,c)+this.hp(t.hp[a],h.hp)+`<div class="sel-desc">${$(`unit.${h.key}.d`,{food:h.animal?.food??0})}</div>`}}else{const a=new Map;for(const l of e)a.set(t.kind[l],(a.get(t.kind[l])||0)+1);const o=[...a.entries()].sort((l,c)=>l[0]-c[0]);if(n="m"+o.map(([l,c])=>`${l}:${c}`).join(",")+si(),n===this.sigSel)return;s=this.head(ke("pop","currentColor"),$("sel.many",{n:e.length}),"",!0)+`<div class="sel-icons">${o.map(([l,c])=>`<button data-selecionar="${yt[l]?.key??l}" title="${$(`unit.${yt[l]?.key}`)}">${As(yt[l]?.key??"")}<span>${c}</span></button>`).join("")}</div>`}this.sigSel=n,this.$.sel.hidden=!1,this.$.sel.innerHTML=s,this.$.sel.querySelectorAll("[data-selecionar]").forEach(a=>a.onclick=()=>this.act.keepKind(ie[a.dataset.selecionar]));const r=this.$.sel.querySelector("#btn-limpar-selecao");r&&(r.onclick=()=>this.act.clear()),this.bindProgs()}head(t,e,n,s){return`<div class="sel-head"><span class="sel-ic">${t}</span><div class="sel-name"><div class="sel-title">${Mn(e)}</div>${n?`<div class="sel-sub">${Mn(n)}</div>`:""}</div><button id="btn-limpar-selecao" class="x" title="${$("sel.clear")}" aria-label="${$("sel.clear")}">${ke("close")}</button></div>`}hp(t,e){const n=Math.max(0,Math.min(1,t/e));return`<div class="hp" title="${$("info.hp")} ${Math.max(0,t)}/${e}"><i style="width:${Math.round(n*100)}%" class="${n>.6?"ok":n>.3?"mid":"low"}"></i></div>`}farmer(t){const e=this.world;for(let n=0;n<e.top;n++)if(e.isUnit(n)&&e.task[n]===ze&&e.tgt[n]===t&&!e.tgtTile[n])return!0;return!1}missing(t){const e=this.world.players[this.me].res;return Ki.find(n=>e[n]<(t[n]??0)*100)}whyCost(t){const e=this.missing(t);return e?$("why.cost",{res:$(`res.${e}`).toLowerCase()}):void 0}buttons(){const t=this.world,e=this.me,n=t.players[e],s=[...this.selected].filter(g=>t.alive[g]),r=s.filter(g=>t.isUnit(g)&&t.owner[g]===e),a=r.filter(g=>t.kind[g]===ie.villager),o=[];if(r.length){if(this.cardMode==="build"&&a.length){o.push({id:"btn-voltar-comandos",ic:"back",label:$("cmd.back"),act:()=>{this.cardMode="main",this.refresh()}});for(const g of be)if(g.buildable&&g.era<=n.era+1){const p=g.era>n.era?$("why.era",{era:$(`era.${g.era}.in`)}):this.whyCost(g.cost),M=this.bldName(g.key,n.era);o.push({data:["construir",g.key],ic:g.key,label:M,tip:{name:M,desc:this.bldDesc(g.key,n.era)},cost:g.cost,why:p,act:()=>this.act.startPlace(g.key)})}return o}return a.length&&o.push({id:"btn-construir",ic:"build",label:$("cmd.build"),act:()=>{this.cardMode="build",this.refresh()}}),o.push({id:"btn-parar",ic:"stop",label:$("cmd.stop"),act:()=>this.act.stop()}),o}if(s.length!==1||!t.isBuilding(s[0])||t.owner[s[0]]!==e)return o;const l=s[0],c=t.bdef(l),h=t.done[l]===1,d=n.era;if(!h)return o;const u=Zl(c,d),f=t.pop(e),m=t.popCap(e);let v=0;for(let g=0;g<t.top;g++)if(t.isBuilding(g)&&t.owner[g]===e)for(const p of t.queue[g])p<on&&(v+=yt[p].pop);for(const g of u){const p=yt[ie[g]],M=t.queue[l],x=M.length>=5?$("why.queue"):this.whyCost(p.cost)??(f+v+p.pop>m?$(m>=vr[d]?"why.popEra":"why.pop"):void 0);o.push({data:["treinar",g],ic:g,label:$(`unit.${g}`),tip:{name:$(`unit.${g}`),desc:$(`unit.${g}.d`)},cost:p.cost,why:x,badge:M.filter(_=>_===ie[g]).length,act:()=>this.act.train(l,g)})}for(const g of c.research??[]){const p=qo[g],M=ts[p],x=t.queue[l];if(t.hasTech(e,g))continue;const _=t.techQueued(e,p)?$("why.techQueued"):M.needs&&!t.hasTech(e,M.needs)?$("why.needs",{tech:$(`tech.${M.needs}`)}):x.length>=5?$("why.queue"):this.whyCost(M.cost);o.push({data:["pesquisar",g],ic:g,label:`${$(`tech.${g}`)}: ${$(`tech.${g}.d`)}`,tip:{name:$(`tech.${g}`),desc:$(`tech.${g}.d`)},cost:M.cost,why:_,act:()=>this.act.research(l,g)})}if(c.market){const g=t.fair?Bn.fair:Bn.get;for(const p of wa)o.push({data:["dar",p],ic:p,label:$("trade.give",{res:$(`res.${p}`).toLowerCase()}),short:$("trade.giveShort"),pressed:this.give===p,act:()=>{this.give=p}});for(const p of wa)if(p!==this.give){const M=n.res[this.give]<Bn.give*100?$("why.trade",{res:$(`res.${this.give}`).toLowerCase()}):void 0;o.push({data:["receber",p],ic:p,label:(t.fair?$("trade.fair")+" ":"")+$("trade.get",{n:g,res:$(`res.${p}`).toLowerCase()}),short:`+${g}`,cost:{[this.give]:Bn.give},why:M,act:()=>this.act.trade(l,this.give,p)})}}if(t.queue[l].length&&o.push({id:"btn-cancelar-fila",ic:"cancel",label:$("cmd.cancelQueue"),act:()=>this.act.cancelQueue(l)}),c.key==="center")if(n.aging>0)o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.aging",{era:$(`era.${d+1}.to`)}),why:$("why.ageBusy"),prog:()=>1-n.aging/(ji[d].time*10),act:()=>{}});else if(d<hu){const g=t.eraBuildingTypes(e),p=ji[d];o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.ageup",{era:$(`era.${d+1}.to`)}),tip:{name:$("cmd.ageup",{era:$(`era.${d+1}.to`)}),desc:$("help.l4")},cost:p.cost,why:g<2?$("why.age",{n:g}):this.whyCost(p.cost),act:()=>this.act.ageUp(l)})}else o.push({id:"btn-avancar-era",ic:"ageup",label:$("cmd.ageup",{era:$(`era.${d+1}.to`)}),why:$("why.maxEra"),act:()=>{}});return u.length&&o.push({id:"btn-ponto-reuniao",ic:"rally",label:$("cmd.rally"),tip:{name:$("cmd.rally"),desc:$("rally.hint")},pressed:this.mode==="rally",act:()=>this.act.rally(l)}),o}refresh(){this.sigCard="",this.slow=0}renderCard(){const t=[...this.selected].filter(a=>this.world.alive[a]),e=t.slice(0,4).join(",");e!==this.cardFor&&(this.cardFor=e,this.cardMode="main");const n=this.buttons(),s=n.map(a=>`${a.id??a.data?.join("=")}|${a.label}|${a.why??""}|${a.badge??""}|${a.pressed??""}`).join(";")+si();if(s===this.sigCard){this.btns=n;return}this.sigCard=s,this.btns=n;const r=this.$.cmd;r.hidden=n.length===0,r.innerHTML=n.map((a,o)=>{const l=a.id?`id="${a.id}"`:`data-${a.data[0]}="${a.data[1]}"`,c=a.cost?this.costHtml(a.cost):"";return`<button ${l} data-i="${o}" class="cb${a.why?" off":""}" aria-disabled="${!!a.why}" aria-pressed="${!!a.pressed}" aria-label="${Mn(a.label+(a.why?" — "+a.why:""))}"><span class="cb-ic">${As(a.ic)}${a.badge?`<span class="badge">${a.badge}</span>`:""}</span><span class="cb-l">${Mn(a.label)}</span>${a.short?`<span class="cb-s">${Mn(a.short)}</span>`:""}${c}${a.prog?'<span class="cb-p"><i data-p="btn"></i></span>':""}</button>`}).join(""),r.querySelectorAll("button[data-i]").forEach(a=>a.onclick=()=>{const o=this.btns[Number(a.dataset.i)];if(o){if(o.why){this.tipEl.hidden&&this.toast(o.why,void 0,void 0,"why");return}o.act(),this.refresh()}}),this.bindProgs()}bindProgs(){const t=this.world,e=t.players[this.me];this.progs=[],this.root.querySelectorAll("[data-p]").forEach(n=>{const[s,r]=(n.dataset.p??"").split(":"),a=Number(r);let o=null;s==="aging"||s==="btn"?o=()=>e.aging>0?1-e.aging/(ji[Math.min(e.era,ji.length-1)].time*10):0:s==="season"?o=()=>t.tick%1800/1800:s==="build"?o=()=>t.alive[a]?t.work[a]/(t.bdef(a).time*100):0:s==="queue"&&(o=()=>{if(!t.alive[a]||!t.queue[a].length)return 0;const l=t.queue[a][0];return t.work[a]/((l>=on?ts[l-on].time:yt[l].time)*10)}),o&&this.progs.push({el:n,f:o})})}};R(Ba,"TIP_SEL",".cb, .qi, .sel-icons button, .r, .era-chip, .cal, .tools button, .quick button");let Vl=Ba;class Rx{constructor(t,e,n,s){R(this,"ctx");R(this,"base");R(this,"img");R(this,"t",1);R(this,"metalOn",!1);this.world=e,this.me=n,this.cam=s;const r=e.size;t.width=t.height=r,this.ctx=t.getContext("2d"),this.base=this.ctx.createImageData(r,r),this.img=this.ctx.createImageData(r,r);const a=e.map,o=this.base.data;for(let h=0;h<r;h++)for(let d=0;d<r;d++){const u=h*r+d,f=a.terrain[u],m=a.heights[Math.round(h/a.hstep)*a.hn+Math.round(d/a.hstep)];let v=[104,150,72];if(f===Ri)v=[46,104,128];else if(f===Fs)v=[86,150,160];else if(f===Ca)v=[205,186,140];else if(f===es)v=[140,135,125];else{const g=Math.max(0,Math.min(1,(m-1)/12));v=[104+g*30,150-g*10,72+g*20]}a.tree[u]&&(v=[52,92,50]),o.set([v[0],v[1],v[2],255],u*4)}for(const h of a.res){const d=h.kind===tn?[200,60,70]:h.kind===di?[215,210,200]:h.kind===Un?[90,190,160]:[255,255,255];h.kind===Un||!e.resKind[h.z*r+h.x]||this.base.data.set([d[0],d[1],d[2],255],(h.z*r+h.x)*4)}let l=!1;const c=h=>{const d=t.getBoundingClientRect();this.cam.tx=(h.clientX-d.left)/d.width*r,this.cam.tz=(h.clientY-d.top)/d.height*r};t.addEventListener("pointerdown",h=>{l=!0,t.setPointerCapture(h.pointerId),c(h),h.stopPropagation()}),t.addEventListener("pointermove",h=>{l&&c(h)}),t.addEventListener("pointerup",()=>{l=!1}),t.addEventListener("pointercancel",()=>{l=!1})}clearTile(t){this.base.data.set([112,148,76,255],t*4),this.t=1}update(t,e,n,s){if((this.t+=t)<.25)return;if(this.t=0,!this.metalOn&&this.world.players[this.me].era>=2){this.metalOn=!0;const u=this.world.size;for(const f of this.world.map.res)f.kind===Un&&this.world.resKind[f.z*u+f.x]===Un&&this.base.data.set([90,190,160,255],(f.z*u+f.x)*4)}const r=this.world.size,a=this.base.data,o=this.img.data,l=this.world.vis[this.me],c=this.world.explored[this.me];for(let u=0;u<r*r;u++){const f=!e||l[u]?1:c[u]?.5:.08,m=u*4;o[m]=a[m]*f,o[m+1]=a[m+1]*f,o[m+2]=a[m+2]*f,o[m+3]=255}this.ctx.putImageData(this.img,0,0);const h=this.world;for(let u=0;u<h.top;u++){if(!h.alive[u])continue;const f=h.x[u]/256,m=h.z[u]/256,v=h.owner[u]===this.me;if(e&&!v&&!l[Math.floor(m)*r+Math.floor(f)]||h.kind[u]===Qt)continue;const g=h.kind[u]>=jt,p=h.owner[u],M=g?h.bdef(u).size===1?2:7:p===fe?2:3;this.ctx.fillStyle=p===fe?"#e8d9b0":p===ci?"#2f3b27":h.players[p]?.color??"#fff",this.ctx.fillRect(f-M/2,m-M/2,M,M),g&&M>2&&(this.ctx.strokeStyle="#fff",this.ctx.lineWidth=1,this.ctx.strokeRect(f-M/2,m-M/2,M,M))}const d=[[0,0],[n,0],[n,s],[0,s]].map(([u,f])=>this.cam.ground(u,f,n,s));d.every(u=>u)&&(this.ctx.strokeStyle="rgba(255,255,255,0.9)",this.ctx.lineWidth=1.5,this.ctx.beginPath(),d.forEach((u,f)=>f?this.ctx.lineTo(u.x,u.z):this.ctx.moveTo(u.x,u.z)),this.ctx.closePath(),this.ctx.stroke())}}class Px{constructor(t,e,n,s,r,a){R(this,"selected",new Set);R(this,"pointers",new Map);R(this,"gesture","none");R(this,"longTimer",0);R(this,"lastTap",{t:0,x:0,y:0});R(this,"keys",new Set);R(this,"v",new O);R(this,"v2",new O);R(this,"right",new O);R(this,"ac",new AbortController);this.canvas=t,this.world=e,this.me=n,this.cam=s,this.box=r,this.hooks=a;const o={signal:this.ac.signal};t.addEventListener("pointerdown",l=>this.down(l),o),t.addEventListener("pointermove",l=>this.move(l),o),t.addEventListener("pointerup",l=>this.up(l),o),t.addEventListener("pointercancel",l=>this.cancel(l),o),t.addEventListener("contextmenu",l=>l.preventDefault(),o),t.addEventListener("wheel",l=>{l.preventDefault(),this.cam.tdist*=Math.exp(l.deltaY*.0012),this.hooks.onInteract()},{passive:!1,signal:this.ac.signal}),addEventListener("keydown",l=>this.key(l),o),addEventListener("keyup",l=>this.keys.delete(l.key.toLowerCase()),o),addEventListener("blur",()=>this.keys.clear(),o)}dispose(){this.ac.abort(),clearTimeout(this.longTimer),this.hideBox()}get W(){return this.canvas.clientWidth}get H(){return this.canvas.clientHeight}key(t){if(!(t.target?.tagName==="BUTTON"&&(t.key===" "||t.key==="Enter"))){if(t.key==="Escape"){this.hooks.mode()!=="normal"?this.hooks.onCancel():this.selected.size&&(this.selected.clear(),this.hooks.onSelect());return}this.keys.add(t.key.toLowerCase())}}down(t){if(this.canvas.setPointerCapture(t.pointerId),this.hooks.onInteract(),this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY,sx:t.clientX,sy:t.clientY,t:performance.now(),button:t.button,type:t.pointerType}),clearTimeout(this.longTimer),this.pointers.size===2){this.gesture="pinch",this.hideBox();return}t.pointerType==="mouse"?t.button===1||t.button===0&&t.altKey?this.gesture="rotate":this.gesture="none":(this.gesture="none",this.hooks.mode()==="normal"&&(this.longTimer=window.setTimeout(()=>{this.gesture==="none"&&this.pointers.size===1&&(this.gesture="box",this.drawBox())},380)))}move(t){const e=this.pointers.get(t.pointerId);if(!e){if(t.pointerType==="mouse"&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}return}const n=t.clientX-e.x,s=t.clientY-e.y,r=Math.hypot(t.clientX-e.sx,t.clientY-e.sy);if(this.gesture==="pinch"&&this.pointers.size===2){const a=[...this.pointers.entries()].find(([d])=>d!==t.pointerId)[1],o=Math.hypot(e.x-a.x,e.y-a.y),l=Math.hypot(t.clientX-a.x,t.clientY-a.y);l>10&&o>10&&(this.cam.tdist*=o/l);const c=Math.atan2(e.y-a.y,e.x-a.x),h=Math.atan2(t.clientY-a.y,t.clientX-a.x);this.cam.tyaw+=Math.atan2(Math.sin(h-c),Math.cos(h-c)),this.cam.pan(n*.5,s*.5,this.H)}else if(this.gesture==="rotate")this.cam.tyaw-=n*.006;else if(e.type==="mouse")if(e.button===0&&this.hooks.mode()==="place"){const a=this.cam.ground(t.clientX,t.clientY,this.W,this.H);a&&this.hooks.onPlaceAt(a.x,a.z)}else e.button===0&&(this.gesture==="box"||r>6)&&(this.gesture="box",this.drawBox(e,t));else this.gesture==="none"&&this.hooks.mode()==="normal"&&r>10&&performance.now()-e.t>=380&&Math.hypot(e.x-e.sx,e.y-e.sy)<10&&(this.gesture="box"),this.gesture==="box"?this.drawBox(e,t):(this.gesture==="pan"||r>10)&&(this.gesture="pan",clearTimeout(this.longTimer),this.cam.pan(n,s,this.H));e.x=t.clientX,e.y=t.clientY}up(t){const e=this.pointers.get(t.pointerId);if(this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),!e)return;if(this.gesture==="pinch"){this.pointers.size===0&&(this.gesture="none");return}if(this.gesture==="box"){this.selectBox(e.sx,e.sy,t.clientX,t.clientY,t.shiftKey),this.hideBox(),this.gesture="none";return}if(this.gesture==="pan"||this.gesture==="rotate"){this.gesture="none";return}this.gesture="none";const n=t.clientX,s=t.clientY,r=this.hooks.mode(),a=performance.now(),o=a-this.lastTap.t<320&&Math.hypot(n-this.lastTap.x,s-this.lastTap.y)<30;if(this.lastTap={t:a,x:n,y:s},e.type==="mouse"){if(e.button===2){if(r==="place"){this.hooks.onCancel();return}const u=this.cam.ground(n,s,this.W,this.H);if(!u)return;if(r==="rally"||this.singleOwnBuilding()>=0){this.hooks.onRally(u.x,u.z);return}this.ownUnitsSelected()&&this.hooks.onCommand(this.target(n,s,u))}else if(e.button===0){if(r==="place"){const u=this.cam.ground(n,s,this.W,this.H);u&&this.hooks.onPlaceAt(u.x,u.z),this.hooks.onPlaceConfirm(t.shiftKey);return}if(r==="rally"){const u=this.cam.ground(n,s,this.W,this.H);u&&this.hooks.onRally(u.x,u.z);return}this.clickSelect(n,s,t.shiftKey,o)}return}const l=this.cam.ground(n,s,this.W,this.H);if(r==="place"){l&&this.hooks.onPlaceAt(l.x,l.z);return}if(r==="rally"){l&&this.hooks.onRally(l.x,l.z);return}const c=this.target(n,s,l),h=this.world,d=this.ownUnitsSelected();if(c.kind==="unit"&&h.owner[c.e]===this.me&&h.kind[c.e]!==Qt){this.clickSelect(n,s,!1,o);return}if(c.kind==="building"&&h.owner[c.e]===this.me){const u=!h.done[c.e]||be[h.kind[c.e]-jt].walk;d&&u?this.hooks.onCommand(c):this.only(c.e);return}if(d&&l){this.hooks.onCommand(c);return}if(c.kind==="unit"||c.kind==="building"){this.only(c.e);return}this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}cancel(t){this.pointers.delete(t.pointerId),clearTimeout(this.longTimer),this.hideBox(),this.gesture="none"}only(t){this.selected.clear(),this.selected.add(t),this.hooks.onSelect()}ownUnitsSelected(){for(const t of this.selected)if(this.world.isUnit(t)&&this.world.owner[t]===this.me)return!0;return!1}singleOwnBuilding(){if(this.selected.size!==1)return-1;const t=this.selected.values().next().value;return this.world.isBuilding(t)&&this.world.owner[t]===this.me?t:-1}seen(t,e,n=!1){if(!this.hooks.fogOn())return!0;const s=this.world.size,r=Math.floor(t),a=Math.floor(e);return r<0||a<0||r>=s||a>=s?!1:(n?this.world.explored:this.world.vis)[this.me][a*s+r]===1}pickUnit(t,e,n){const s=this.world,r=this.lastTouch?34:24;let a=-1,o=r*r;for(let l=0;l<s.top;l++){if(!s.alive[l]||s.kind[l]>=jt)continue;const c=s.owner[l]===this.me;if(n&&!c)continue;const h=s.x[l]/256,d=s.z[l]/256;if(!c&&!this.seen(h,d)||(this.cam.toScreen(h,Xt(s.map,h,d)+(s.kind[l]===Qt?.2:.6),d,this.W,this.H,this.v),!this.v.z))continue;const u=(this.v.x-t)**2+(this.v.y-e)**2;u<o&&(o=u,a=l)}return[a,Math.sqrt(o)]}get lastTouch(){for(const t of this.pointers.values())return t.type!=="mouse";return matchMedia("(pointer: coarse)").matches}pickBuilding(t,e){const n=this.world;let s=-1,r=1;this.right.set(1,0,0).applyQuaternion(this.cam.cam.quaternion);for(let a=0;a<n.top;a++){if(!n.isBuilding(a))continue;const o=n.x[a]/256,l=n.z[a]/256;if(n.owner[a]!==this.me&&!this.seen(o,l,!0))continue;const c=be[n.kind[a]-jt].size,h=Xt(n.map,o,l)+(c>=3?.7:.5);if(this.cam.toScreen(o,h,l,this.W,this.H,this.v),!this.v.z)continue;this.cam.toScreen(o+this.right.x*c*.55,h,l+this.right.z*c*.55,this.W,this.H,this.v2);const d=Math.max(18,Math.hypot(this.v2.x-this.v.x,this.v2.y-this.v.y)),u=Math.hypot(this.v.x-t,this.v.y-e)/d;u<r&&(r=u,s=a)}return[s,r]}pickTile(t,e,n){const s=this.world,r=s.size,a=Math.floor(n.x),o=Math.floor(n.z),l=this.lastTouch?36:28;let c=-1,h=l*l;for(let d=-3;d<=2;d++)for(let u=-3;u<=3;u++){const f=a+u,m=o+d;if(f<0||m<0||f>=r||m>=r)continue;const v=m*r+f,g=s.map.tree[v]>0;if(!(!(g||s.resKind[v])||s.resAmt[v]<=0||!s.explored[this.me][v])&&!(s.resKind[v]===3&&s.players[this.me].era<2))for(const p of g?[.6,1.5,2.4]:[.3]){if(this.cam.toScreen(f+.5,Xt(s.map,f+.5,m+.5)+p,m+.5,this.W,this.H,this.v),!this.v.z)continue;const M=(this.v.x-t)**2+(this.v.y-e)**2;M<h&&(h=M,c=v)}}return c}target(t,e,n=this.cam.ground(t,e,this.W,this.H)){const s=this.world,r=n?.x??0,a=n?.z??0,[o,l]=this.pickUnit(t,e,!1),[c,h]=this.pickBuilding(t,e);if(o>=0&&(c<0||l<14||h>.75))return{kind:"unit",e:o,k:-1,x:s.x[o]/256,z:s.z[o]/256};if(c>=0)return{kind:"building",e:c,k:-1,x:s.x[c]/256,z:s.z[c]/256};if(n){const d=this.pickTile(t,e,n);if(d>=0)return{kind:"tile",e:-1,k:d,x:d%s.size+.5,z:Math.floor(d/s.size)+.5}}return{kind:"ground",e:-1,k:-1,x:r,z:a}}clickSelect(t,e,n,s){const r=this.world,a=this.target(t,e,null),o=a.kind==="unit"?a.e:-1;if(n&&!this.ownUnitsSelected()&&this.selected.clear(),o>=0&&r.owner[o]===this.me&&r.kind[o]!==Qt){if(n||this.selected.clear(),s){const l=r.kind[o];for(let c=0;c<r.top;c++)if(r.isUnit(c)&&r.owner[c]===this.me&&r.kind[c]===l){const h=r.x[c]/256,d=r.z[c]/256;this.cam.toScreen(h,Xt(r.map,h,d),d,this.W,this.H,this.v),this.v.z&&this.v.x>=0&&this.v.y>=0&&this.v.x<=this.W&&this.v.y<=this.H&&this.selected.add(c)}}else n&&this.selected.has(o)?this.selected.delete(o):this.selected.add(o);this.hooks.onSelect();return}if(a.kind==="unit"||a.kind==="building"){this.only(a.e);return}!n&&this.selected.size&&(this.selected.clear(),this.hooks.onSelect())}selectBox(t,e,n,s,r){const a=this.world,o=Math.min(t,n),l=Math.max(t,n),c=Math.min(e,s),h=Math.max(e,s);(!r||!this.ownUnitsSelected())&&this.selected.clear();for(let d=0;d<a.top;d++){if(!a.isUnit(d)||a.owner[d]!==this.me)continue;const u=a.x[d]/256,f=a.z[d]/256;this.cam.toScreen(u,Xt(a.map,u,f)+.5,f,this.W,this.H,this.v),this.v.z&&this.v.x>=o&&this.v.x<=l&&this.v.y>=c&&this.v.y<=h&&this.selected.add(d)}this.hooks.onSelect()}drawBox(t,e){const n=this.box;if(n.style.display="block",!t||!e){const s=[...this.pointers.values()][0];if(!s)return;n.style.left=s.sx+"px",n.style.top=s.sy+"px",n.style.width=n.style.height="2px";return}n.style.left=Math.min(t.sx,e.clientX)+"px",n.style.top=Math.min(t.sy,e.clientY)+"px",n.style.width=Math.abs(e.clientX-t.sx)+"px",n.style.height=Math.abs(e.clientY-t.sy)+"px"}hideBox(){this.box.style.display="none"}update(t){const e=this.keys;let n=0,s=0;const r=900*t;(e.has("a")||e.has("arrowleft"))&&(n+=r),(e.has("d")||e.has("arrowright"))&&(n-=r),(e.has("w")||e.has("arrowup"))&&(s+=r),(e.has("s")||e.has("arrowdown"))&&(s-=r),(n||s)&&(this.cam.pan(n,s,this.H),this.hooks.onInteract()),e.has("q")&&(this.cam.tyaw+=t*1.6),e.has("e")&&(this.cam.tyaw-=t*1.6),(e.has("+")||e.has("="))&&(this.cam.tdist*=1-t*1.2),e.has("-")&&(this.cam.tdist*=1+t*1.2)}}const iu="origines_opts",Ix=i=>i.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);class Lx{constructor(t){R(this,"root");R(this,"screen",null);R(this,"rivals",3);R(this,"diff",1);this.act=t,this.root=document.getElementById("menus");try{const e=JSON.parse(localStorage.getItem(iu)??"{}");e.rivals>=1&&e.rivals<=3&&(this.rivals=e.rivals),e.diff>=0&&e.diff<=2&&(this.diff=e.diff)}catch{}md(()=>this.render())}get open(){return this.screen!==null}get kind(){return this.screen?.k??null}showStart(t){this.screen={k:"start",info:t,step:"main"},this.render()}updateStart(t){this.screen?.k==="start"&&(this.screen.info=t,this.render())}showPause(t,e){this.screen={k:"pause",minutes:t,quality:e,saved:""},this.render()}showEnd(t,e,n){this.screen={k:"end",result:t,minutes:e,era:n},this.render()}hide(){this.screen=null,this.render()}lang(){return`<div class="seg" role="group" aria-label="${$("lang.label")}"><button id="btn-idioma-en" aria-pressed="${si()==="en"}">EN</button><button id="btn-idioma-pt" aria-pressed="${si()==="pt"}">PT</button></div>`}render(){const t=this.screen,e=this.root;if(e.dataset.open=String(!!t),e.dataset.screen=t?.k??"",!t){e.innerHTML="";return}if(t.k==="start"){const r=t.info.meta,a=t.info.account,o=`${r?`<button id="btn-continuar" class="big primary">${$(t.info.fromCloud?"menu.continueCloud":"menu.continue")}<small>${$("menu.saved",{era:$(`era.${r.era}`),y:r.year,r:r.rivals})}</small></button>`:""}
        <button id="btn-novo-jogo" class="big${r?"":" primary"}">${$("menu.new")}</button>
        ${a?a.logado?`<button id="btn-perfil-conta" class="link">${$("cloud.account",{name:Ix(a.apelido??"")})}</button>`:`<button id="btn-entrar-conta" class="link strong">${$("cloud.login")}</button><p class="muted small">${$("cloud.why")}</p>`:""}`,l=`<div class="opt"><div class="opt-l">${$("menu.rivals")}</div><div class="seg">${[1,2,3].map(c=>`<button data-rivais="${c}" aria-pressed="${this.rivals===c}">${c}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${$("menu.difficulty")}</div><div class="seg">${[0,1,2].map(c=>`<button data-dificuldade="${c}" aria-pressed="${this.diff===c}">${$(`diff.${c}`)}</button>`).join("")}</div></div>
        <button id="btn-comecar" class="big primary">${$("menu.start")}</button>
        <button id="btn-voltar-inicio" class="link">${$("menu.back")}</button>`;e.innerHTML=`<div class="screen start">
        <div class="brand"><div class="logo">Origines</div><div class="tag">${$("menu.tagline")}</div></div>
        <div class="card panel">${t.step==="main"?o:l}</div>
        <div class="foot">${this.lang()}<button id="btn-som-inicio" class="snd" title="${$(_t.opts.muted?"snd.unmute":"snd.mute")}" aria-label="${$(_t.opts.muted?"snd.unmute":"snd.mute")}" aria-pressed="${_t.opts.muted}">${ke(_t.opts.muted?"mute":"sound")}</button><span class="credits">${$("menu.credits")}</span></div>
        <p class="local">${$(t.info.account?.logado?"menu.localCloud":"menu.local")}</p></div>`}else t.k==="pause"?e.innerHTML=`<div class="screen pause"><div class="card panel">
        <h2>${$("pause.title")}</h2><p class="muted">${$("pause.time",{m:t.minutes})}</p>
        <button id="btn-voltar-jogo" class="big primary">${$("pause.resume")}</button>
        <button id="btn-salvar" class="big">${$("pause.save")}</button>
        ${t.saved?`<p class="saved ${t.saved==="fail"?"fail":t.saved==="saving"?"":"ok"}">${$({saving:"pause.saving",both:"pause.savedBoth",local:"pause.saved",localOnly:"pause.savedLocalOnly",fail:"pause.saveFail"}[t.saved])}</p>`:""}
        <div class="opt"><div class="opt-l">${$("q.label")}</div><div class="seg">${Da.map((r,a)=>`<button data-qualidade="${r.key}" aria-pressed="${t.quality===a}">${$(`q.${r.key}`)}</button>`).join("")}</div></div>
        <div class="opt"><div class="opt-l">${$("lang.label")}</div>${this.lang()}</div>
        ${["music","sfx","amb"].map(r=>`<div class="opt"><div class="opt-l">${$(`snd.${r}`)}</div><div class="seg">${[0,1,2,3].map(a=>`<button data-${{music:"musica",sfx:"efeitos",amb:"ambiente"}[r]}="${a}" aria-pressed="${_t.opts[r]===a}">${$(`snd.l${a}`)}</button>`).join("")}</div></div>`).join("")}
        <div class="row2"><button id="btn-ajuda-pausa">${$("btn.help")}</button><button id="btn-sair">${$("pause.quit")}</button></div>
      </div></div>`:e.innerHTML=`<div class="screen end ${t.result}"><div class="card panel">
        <h2>${$(`end.${t.result}`)}</h2><p>${$(`end.${t.result}.d`)}</p><p class="muted">${$(`era.${t.era}`)} · ${$("pause.time",{m:t.minutes})}</p>
        <button id="btn-fim-menu" class="big primary">${$("end.menu")}</button>
        <button id="btn-continuar-olhando" class="big">${$("end.watch")}</button>
      </div></div>`;const n=(r,a)=>e.querySelectorAll(r).forEach(o=>o.onclick=()=>a(o)),s=()=>{try{localStorage.setItem(iu,JSON.stringify({rivals:this.rivals,diff:this.diff}))}catch{}};n("#btn-idioma-en",()=>tu("en")),n("#btn-idioma-pt",()=>tu("pt")),n("#btn-continuar",()=>this.act.cont()),n("#btn-novo-jogo",()=>{this.screen?.k==="start"&&(this.screen.step="new",this.render())}),n("#btn-voltar-inicio",()=>{this.screen?.k==="start"&&(this.screen.step="main",this.render())}),n("[data-rivais]",r=>{this.rivals=Number(r.dataset.rivais),s(),this.render()}),n("[data-dificuldade]",r=>{this.diff=Number(r.dataset.dificuldade),s(),this.render()}),n("#btn-comecar",()=>this.act.start(this.rivals,this.diff)),n("#btn-voltar-jogo",()=>this.act.resume()),n("#btn-salvar",async()=>{if(this.screen?.k!=="pause"||this.screen.saved==="saving")return;this.screen.saved="saving",this.render();const r=await this.act.save();this.screen?.k==="pause"&&(this.screen.saved=r,this.render())}),n("#btn-entrar-conta",()=>this.act.login()),n("#btn-perfil-conta",()=>this.act.profile()),n("[data-qualidade]",r=>{const a=Da.findIndex(o=>o.key===r.dataset.qualidade);a>=0&&this.screen?.k==="pause"&&(this.screen.quality=a,this.act.quality(a),this.render())}),n("#btn-ajuda-pausa",()=>this.act.help()),n("#btn-som-inicio",()=>{_t.toggleMute(),this.render()}),n("[data-musica]",r=>{_t.setOpts({music:Number(r.dataset.musica),muted:!1}),this.render()}),n("[data-efeitos]",r=>{_t.setOpts({sfx:Number(r.dataset.efeitos),muted:!1}),this.render()}),n("[data-ambiente]",r=>{_t.setOpts({amb:Number(r.dataset.ambiente),muted:!1}),this.render()}),n("#btn-sair",()=>this.act.quit()),n("#btn-fim-menu",()=>this.act.toMenu()),n("#btn-continuar-olhando",()=>this.act.watch()),e.querySelector(".primary")?.focus({preventScroll:!0})}}function Dx(i,t,e,n){const s=e.filter(h=>i.isUnit(h)&&i.owner[h]===t),r=s.filter(h=>i.kind[h]===ie.villager),a=s.filter(h=>i.kind[h]!==ie.villager),o=Math.round(n.x*256),l=Math.round(n.z*256),c=h=>h.length?[{type:"move",player:t,ids:h,x:o,z:l}]:[];if(n.kind==="tile"&&r.length)return{cmds:[{type:"gather",player:t,ids:r,k:n.k},...c(a)],ping:"work"};if(n.kind==="building"&&i.alive[n.e]){const h=n.e;return i.owner[h]===t?{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"}:{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}if(n.kind==="unit"&&i.alive[n.e]){const h=n.e;if(i.kind[h]===Qt)return{cmds:[...r.length?[{type:"work",player:t,ids:r,target:h}]:[],...c(a)],ping:r.length?"work":"move"};if(i.owner[h]!==t&&(i.owner[h]===fe||i.hostile(t,i.owner[h])))return{cmds:[{type:"attack",player:t,ids:s,target:h}],ping:"attack"}}return{cmds:c(s),ping:"move"}}const Ux=(i,t)=>{for(const e of t)if(i.isUnit(e)&&i.kind[e]===ie.villager)return!0;return!1},gd=1,vd=["alive","kind","owner","x","z","hp","state","slotX","slotZ","task","tgt","tgtTile","phase","carry","carryRes","cd","work","done","sub","aggro","tmr","herd","fast","amx","amz","fails","frac","rallyX","rallyZ","dropB","ignoreT","ignoreUntil","stuck","best"],su=new WeakMap;function kx(i){let t=su.get(i);if(t)return t;const e=mu(i.map.seed,i.players.length),n=e.size*e.size,s=new Uint8Array(n),r=new Int32Array(n);for(let a=0;a<n;a++)e.tree[a]&&(r[a]=e.wood[a]*100);for(const a of e.res){const o=a.z*e.size+a.x;s[o]=a.kind,r[o]=a.amount*100}return t={tree:e.tree,kind:s,amt:r},su.set(i,t),t}function Nx(i){const t=[];let e=0,n=0;for(let s=0;s<i.length;s++){const r=i[s]?1:0;r===e?n++:(t.push(n),e=r,n=1)}return t.push(n),t}function zx(i,t){let e=0,n=0;for(const s of i)n&&t.fill(1,e,e+s),e+=s,n^=1}function Fx(i){const t=kx(i),e=i.size,n=i.top,s={};for(const h of vd)s[h]=Array.from(i[h].subarray(0,n));const r=[];for(let h=0;h<n;h++)i.alive[h]&&i.queue[h].length&&r.push([h,i.queue[h].slice()]);const a=[],o=[],l=[];for(let h=0;h<e*e;h++)t.tree[h]&&!i.map.tree[h]&&a.push(h),i.resAmt[h]!==t.amt[h]&&o.push(h,i.resAmt[h]),i.resKind[h]!==t.kind[h]&&l.push(h,i.resKind[h]);const c=i.players.find(h=>!h.ai)??i.players[0];return{v:gd,seed:i.map.seed,players:i.players.length,humans:i.players.filter(h=>!h.ai).length,difficulty:i.difficulty,tick:i.tick,rng:i.rng.save(),top:n,ent:s,queue:r,P:i.players.map(h=>({res:{...h.res},era:h.era,aging:h.aging,agingB:h.agingB,hunger:h.hunger,defeated:h.defeated,lastAlert:h.lastAlert,ai:h.ai,tech:h.tech})),ai:i.ai.map(h=>({...h})),barbNext:i.barbNext,barbWarned:i.barbWarned,outcome:i.outcome,cut:a,amt:o,kindDiff:l,explored:i.explored.map(Nx),projectiles:i.projectiles.map(h=>({...h})),meta:{era:c.era,year:i.year,rivals:i.players.filter(h=>h.ai).length,difficulty:i.difficulty,minutes:Math.floor(i.tick/600)}}}function xd(i){if(!i||i.v!==gd)throw new Error("save version");const t=new Su(i.seed,i.players,{humans:i.humans,difficulty:i.difficulty}),e=t.size,n=e*e;for(const s of vd){const r=t[s];r.fill(s==="ignoreT"||s==="dropB"||s==="tgt"?-1:0),r.set(i.ent[s])}t.top=i.top;for(let s=0;s<Nt;s++)t.queue[s]=[],t.field[s]=null,t.path[s]=null;for(const[s,r]of i.queue)t.queue[s]=r.slice();t.px.set(t.x),t.pz.set(t.z);for(const s of i.cut)t.map.tree[s]=0,t.map.wood[s]=0;for(let s=0;s<i.amt.length;s+=2)t.resAmt[i.amt[s]]=i.amt[s+1];for(let s=0;s<i.kindDiff.length;s+=2)t.resKind[i.kindDiff[s]]=i.kindDiff[s+1];t.bAt.fill(0);for(let s=0;s<n;s++){const r=t.map.terrain[s];t.blocked[s]=r===Ri||r===es||t.map.tree[s]||t.resKind[s]?1:0}for(let s=0;s<t.top;s++)if(t.alive[s]&&t.kind[s]>=jt){const[r,a,o]=t.footprint(s),l=be[t.kind[s]-jt].walk;for(let c=0;c<o;c++)for(let h=0;h<o;h++){const d=(a+c)*e+r+h;t.bAt[d]=s+1,l||(t.blocked[d]=1)}}i.explored.forEach((s,r)=>{t.explored[r].fill(0),zx(s,t.explored[r])}),i.P.forEach((s,r)=>{const a=t.players[r];Object.assign(a.res,s.res),a.era=s.era,a.aging=s.aging,a.agingB=s.agingB,a.hunger=s.hunger,a.defeated=s.defeated,a.lastAlert=s.lastAlert,a.ai=s.ai,a.tech=s.tech??0}),t.ai=i.ai.map(s=>({...s})),t.barbNext=i.barbNext,t.barbWarned=i.barbWarned,t.outcome=i.outcome,t.tick=i.tick,t.rng.load(i.rng),t.projectiles=i.projectiles.map(s=>({...s})),t.events.length=0;for(let s=0;s<t.top;s++)t.alive[s]&&t.state[s]===Ze&&(t.task[s]===Re?t.goPoint(s,t.slotX[s],t.slotZ[s]):t.state[s]=Te);return t.updateFog(),t}const Pr="origines_save_v1",Za="origines_save_meta_v1";function Ua(i){const t=Fx(i);t.meta.savedAt=Date.now();try{localStorage.setItem(Pr,JSON.stringify(t)),localStorage.setItem(Za,JSON.stringify(t.meta))}catch{}return t}function Ox(i){try{localStorage.setItem(Pr,JSON.stringify(i)),localStorage.setItem(Za,JSON.stringify(i.meta))}catch{}}function Bx(){try{const i=localStorage.getItem(Za);return i&&localStorage.getItem(Pr)?JSON.parse(i):null}catch{return null}}function Hx(){try{const i=localStorage.getItem(Pr);return i?xd(JSON.parse(i)):null}catch{return null}}function _d(){try{localStorage.removeItem(Pr),localStorage.removeItem(Za)}catch{}}const fc="/api/origines/save";let oi=null,Ns=null;const pc=[],Gx=()=>Ns,Vx=i=>{pc.push(i)},Js=()=>!!Ns?.logado;async function Wx(){if(location.pathname.startsWith("/jogar/"))try{const i=window;if(i.QGConta||await new Promise((t,e)=>{const n=document.createElement("script");n.src="/conta.js?v=2",n.onload=()=>t(),n.onerror=()=>e(new Error("conta")),document.head.appendChild(n)}),oi=i.QGConta??null,!oi)return;Ns=await oi.me(),oi.aoMudar(t=>{Ns=t,pc.forEach(e=>e())})}catch{oi=null,Ns=null}}const qx=async()=>{oi&&(await oi.entrar(),Ns=await oi.me(),pc.forEach(i=>i()))},Xx=()=>oi?.perfil();async function $x(){if(!Js())return null;try{const i=await fetch(fc,{credentials:"same-origin"});return i.ok?(await i.json()).save??null:null}catch{return null}}async function Yx(){if(!Js())return null;try{const i=await fetch(`${fc}?dados=1`,{credentials:"same-origin"});return i.ok?(await i.json()).dados??null:null}catch{return null}}const Md=(i,t=!1)=>fetch(fc,{method:"POST",credentials:"same-origin",keepalive:t,headers:{"content-type":"application/json"},body:JSON.stringify(i)});async function ka(i,t=!1){if(!Js())return!1;try{const e={dados:i};return t&&JSON.stringify(e).length>6e4&&(t=!1),(await Md(e,t)).ok}catch{return!1}}async function Kx(){if(Js())try{await Md({apagar:!0})}catch{}}const jx=i=>({era:i.era,year:i.ano,rivals:i.rivais,difficulty:i.dificuldade,minutes:i.minutos,savedAt:i.salvoEm}),ru=new WeakMap;function mc(i){let t=ru.get(i);if(!t){const e=i.sampleRate*2,n=i.createBuffer(1,e,i.sampleRate),s=n.getChannelData(0);let r=22222;for(let a=0;a<e;a++)r=r*16807%2147483647,s[a]=r/10737418235e-1-1;t={noise:n,pluck:new Map},ru.set(i,t)}return t}function zs(i,t,e){const n=i.createBufferSource();return n.buffer=mc(i).noise,n.loop=!0,n.start(t,t*7.31%1.5),n.stop(t+e+.05),n}function Me(i,t,e,n,s,r=0){const a=i.createGain(),o=Math.max(2e-4,e);return a.gain.setValueAtTime(1e-4,t),a.gain.exponentialRampToValueAtTime(o,t+n),r&&a.gain.setValueAtTime(o,t+n+r),a.gain.exponentialRampToValueAtTime(1e-4,t+n+r+s),a}function Ke(i,t,e,n=1){const s=i.createBiquadFilter();return s.type=t,s.frequency.value=e,s.Q.value=n,s}function Ae(i,t,e,n,s){const r=i.createOscillator();return r.type=t,r.frequency.setValueAtTime(e,n),r.start(n),r.stop(n+s+.05),r}function oe(...i){for(let t=0;t<i.length-1;t++)i[t].connect(i[t+1]);return i[i.length-1]}function Jt(i,t,e,n,s,r,a,o,l=.004){const c=Ae(i,n,s,e,a);c.frequency.exponentialRampToValueAtTime(Math.max(20,r),e+a),oe(c,Me(i,e,o,l,a),t)}function Bt(i,t,e,n,s,r,a,o,l=.003){oe(zs(i,e,a+l),Ke(i,n,s,r),Me(i,e,o,l,a),t)}function Oo(i,t,e,n,s){const r=zs(i,e,s.dur),a=Ke(i,"bandpass",s.f,3),o=i.createGain(),l=Ae(i,"sine",s.lfo[0],e,s.dur),c=i.createGain();return l.frequency.linearRampToValueAtTime(s.lfo[1],e+s.dur*.9),c.gain.value=.5,o.gain.value=.5,l.connect(c).connect(o.gain),oe(r,a,o,Me(i,e,.1*n,s.dur*.22,s.dur*.73),t),Bt(i,t,e+s.snapAt,"bandpass",s.snapF,2,.03,(s.snap??.08)*n),Math.max(s.dur,s.snapAt+.06)}function fn(i,t,e,n,s,r=[1,2.4,3.6,5.1],a=1.6){r.forEach((o,l)=>oe(Ae(i,"sine",n*o,e,a),Me(i,e,s/(1+l*.9),.003,a/(1+l*.6)),t))}function Zx(i,t,e,n,s,r){const a=Ae(i,"sine",n,e,r),o=Ae(i,"sine",n*1.4,e,r),l=i.createGain();l.gain.setValueAtTime(n*1.6,e),l.gain.exponentialRampToValueAtTime(n*.1,e+r),o.connect(l).connect(a.frequency),oe(a,Me(i,e,s,.002,r),t);for(const[c,h]of[[2.756,.5],[5.404,.3],[8.933,.18]])for(const d of[1,1.007])oe(Ae(i,"sine",n*c*d,e,r*.7),Me(i,e,s*h*.5,.002,r*(.7-c*.04)),t)}function Jx(i,t){const e=Math.round(t*10),n=mc(i);let s=n.pluck.get(e);if(s)return s;const r=i.sampleRate,a=Math.floor(r*1.8),o=Math.max(2,Math.round(r/t));s=i.createBuffer(1,a,r);const l=s.getChannelData(0),c=new Float32Array(o);let h=e*7+1;for(let d=0;d<o;d++)h=h*16807%2147483647,c[d]=(h/10737418235e-1-1)*.6;for(let d=0,u=0;d<a;d++){const f=c[u],m=c[(u+1)%o];c[u]=.996*.5*(f+m),l[d]=f,u=(u+1)%o}return n.pluck.set(e,s),s}function Qx(i,t,e,n,s,r=2600,a=1.6){const o=i.createBufferSource();o.buffer=Jx(i,n),o.start(e),o.stop(e+a),oe(o,Ke(i,"lowpass",r,.7),Me(i,e,s,.002,a),t)}function Pn(i,t,e,n,s,r,a,o,l="sawtooth"){const c=i.createOscillator();c.type=l,c.frequency.setValueAtTime(s[0][1],e);for(const[f,m]of s.slice(1))c.frequency.linearRampToValueAtTime(m,e+f);const h=i.createOscillator(),d=i.createGain();h.frequency.value=a[0],d.gain.value=a[1],h.connect(d).connect(c.frequency),c.start(e),c.stop(e+n+.05),h.start(e),h.stop(e+n+.05);const u=Me(i,e,o,Math.min(.05,n*.2),n*.8,n*.1);for(const[f,m]of r){const v=i.createGain();v.gain.value=m,oe(c,Ke(i,"bandpass",f,6),v,u)}u.connect(t)}function va(i){const t=i.createBufferSource();return t.buffer=mc(i).noise,t.loop=!0,t.start(),t}function Wl(i,t,e,n,s){const r=3+s%4,a=2600+s*137%1600;for(let o=0;o<r;o++){const l=e+o*(.07+(s+o)%3*.02),c=a*(1+(s*(o+3)%7-3)*.06),h=Ae(i,"sine",c,l,.07);h.frequency.exponentialRampToValueAtTime(c*(o%2?.8:1.35),l+.06),oe(h,Me(i,l,.05*n,.01,.05),t)}return r*.1}const Sn={"ui.click":(i,t,e,n)=>(Jt(i,t,e,"sine",700,420,.05,.2*n),Bt(i,t,e,"bandpass",2400,2,.025,.06*n),.08),"ui.denied":(i,t,e,n)=>{const s=Ae(i,"sine",240,e,.15);return s.frequency.exponentialRampToValueAtTime(170,e+.14),oe(s,Ke(i,"lowpass",900),Me(i,e,.16*n,.006,.14),t),.16},"sel.villager":(i,t,e,n)=>(Jt(i,t,e,"triangle",560,480,.05,.12*n),Jt(i,t,e+.07,"triangle",700,600,.05,.1*n),.14),"sel.soldier":(i,t,e,n)=>(Jt(i,t,e,"sine",180,90,.12,.24*n),Bt(i,t,e,"lowpass",600,1,.04,.1*n),.14),"sel.building":(i,t,e,n)=>(Jt(i,t,e,"sine",300,220,.08,.18*n),Jt(i,t,e+.09,"sine",300,220,.08,.13*n),.2),"order.move":(i,t,e,n)=>(Bt(i,t,e,"lowpass",500,1,.05,.13*n),Bt(i,t,e+.11,"lowpass",450,1,.05,.11*n),.18),"order.work":(i,t,e,n)=>(Bt(i,t,e,"bandpass",2600,3,.03,.12*n),Jt(i,t,e,"sine",1500,1300,.02,.05*n),.05),"order.attack":(i,t,e,n)=>(Jt(i,t,e,"sine",150,70,.18,.28*n),Bt(i,t,e,"lowpass",800,1,.05,.1*n),.2),place:(i,t,e,n)=>(Jt(i,t,e,"sine",190,85,.2,.3*n),Bt(i,t,e,"lowpass",400,1,.08,.12*n),.22),"place.bad":(i,t,e,n)=>{const s=Ae(i,"triangle",170,e,.17);return s.frequency.exponentialRampToValueAtTime(120,e+.16),oe(s,Ke(i,"lowpass",900),Me(i,e,.18*n,.005,.16),t),.18},trained:(i,t,e,n)=>(fn(i,t,e,880,.14*n,[1,1.5],.35),.4),built:(i,t,e,n)=>(Jt(i,t,e,"sine",180,100,.14,.2*n),Jt(i,t,e+.12,"sine",150,90,.14,.18*n),fn(i,t,e+.26,1046,.09*n,[1,1.5],.6),.9),tech:(i,t,e,n)=>(fn(i,t,e,660,.15*n,[1,2,2.76,4.07],1.6),fn(i,t,e+.18,990,.1*n,[1,2,2.76],1.2),1.8),metal:(i,t,e,n)=>([880,1108,1320].forEach((s,r)=>fn(i,t,e+r*.11,s,.09*n,[1,2.4,3.6],.9)),1.2),horn:(i,t,e,n)=>{const s=Me(i,e,.2*n,.18,.4,.9),r=Ke(i,"lowpass",1100,.7);for(const[a,o]of[[98,1],[98.7,.8],[147,.45]]){const l=Ae(i,"sawtooth",a,e,1.6),c=i.createGain();c.gain.value=o,oe(l,c,r)}return oe(r,s,t),1.6},"drums.war":(i,t,e,n)=>([0,.45,.9,1.2,1.5,1.95,2.25,2.55].forEach((s,r)=>{Jt(i,t,e+s,"sine",95,55,.3,(.12+r*.025)*n),Bt(i,t,e+s,"lowpass",300,1,.05,.06*n)}),2.9),gong:(i,t,e,n)=>(fn(i,t,e,110,.22*n,[1,1.44,2.05,2.84,3.82],3),Bt(i,t,e,"lowpass",2e3,1,.05,.08*n),3),winter:(i,t,e,n)=>{const s=zs(i,e,1.8),r=Ke(i,"lowpass",300,.8);return r.frequency.linearRampToValueAtTime(900,e+.8),r.frequency.linearRampToValueAtTime(300,e+1.7),oe(s,r,Me(i,e,.1*n,.5,1.2),t),fn(i,t,e+.3,520,.1*n,[1,2.4,3.6],2),2.3},spring:(i,t,e,n)=>{for(let s=0;s<5;s++)Wl(i,t,e+s*.22,n*1.6,3+s*5);return 1.6},hunger:(i,t,e,n)=>(oe(Ae(i,"sine",98,e,1.1),Me(i,e,.1*n,.1,.9),t),oe(Ae(i,"sine",147,e,1.1),Me(i,e,.06*n,.1,.9),t),1.1),soft:(i,t,e,n)=>(fn(i,t,e,784,.07*n,[1,2],.5),.5),fair:(i,t,e,n)=>{[587,740,880,988,880].forEach((s,r)=>Er(i,t,e+r*.14,s,.13,.1*n));for(let s=0;s<4;s++)Na(i,t,e+s*.18,.5*n);return .9},"work.chop":(i,t,e,n)=>(Bt(i,t,e,"bandpass",1100,1.5,.05,.28*n),Jt(i,t,e,"sine",260,170,.06,.18*n),.08),"work.pick":(i,t,e,n)=>(fn(i,t,e,2100,.1*n,[1,1.45],.09),Bt(i,t,e,"highpass",3e3,1,.015,.06*n),.1),"work.pickMetal":(i,t,e,n)=>(fn(i,t,e,2600,.09*n,[1,1.5,2.04],.2),Bt(i,t,e,"highpass",3e3,1,.012,.05*n),.2),"work.hoe":(i,t,e,n)=>(Bt(i,t,e,"lowpass",350,1,.09,.22*n),Jt(i,t,e,"sine",120,80,.08,.12*n),.1),"work.mallet":(i,t,e,n)=>(Jt(i,t,e,"sine",330,240,.07,.22*n),Bt(i,t,e,"bandpass",900,1.5,.04,.1*n),.08),"work.rustle":(i,t,e,n)=>{for(const s of[0,.07,.15])Bt(i,t,e+s,"bandpass",4e3,1,.05,.06*n);return .22},"drop.wood":(i,t,e,n)=>(Jt(i,t,e,"sine",160,110,.12,.2*n),Bt(i,t,e,"lowpass",500,1,.06,.1*n),.14),"drop.stone":(i,t,e,n)=>{for(let s=0;s<4;s++)Bt(i,t,e+s*.035,"bandpass",1500+s*200,2,.03,.08*n);return .18},"drop.food":(i,t,e,n)=>{for(const s of[0,.06])Bt(i,t,e+s,"bandpass",2e3,1,.06,.07*n);return .14},"drop.metal":(i,t,e,n)=>(fn(i,t,e,2600,.07*n,[1,1.5],.15),fn(i,t,e+.07,2900,.06*n,[1,1.5],.15),.25),"tree.fall":(i,t,e,n)=>{const s=Ae(i,"sawtooth",90,e,.45);return s.frequency.linearRampToValueAtTime(70,e+.45),oe(s,Ke(i,"bandpass",400,4),Me(i,e,.05*n,.05,.4),t),Bt(i,t,e+.4,"lowpass",700,1,.7,.18*n,.01),Jt(i,t,e+.4,"sine",70,45,.4,.16*n),1.2},"res.crumble":(i,t,e,n)=>{for(let s=0;s<5;s++)Bt(i,t,e+s*.09,"lowpass",900,1,.08,(.14-s*.02)*n);return .55},puff:(i,t,e,n)=>(Bt(i,t,e,"lowpass",600,.7,.3,.15*n,.02),Jt(i,t,e,"sine",150,100,.12,.05*n),.34),"fall.animal":(i,t,e,n)=>(Jt(i,t,e,"sine",95,50,.25,.22*n),Bt(i,t,e+.05,"lowpass",600,.7,.3,.12*n,.02),.4),crash:(i,t,e,n)=>{Bt(i,t,e,"lowpass",1200,.8,1.1,.26*n,.01);for(const s of[0,.18,.36])Jt(i,t,e+s,"sine",80,45,.25,.18*n);return 1.2},"hit.club":(i,t,e,n)=>(Jt(i,t,e,"sine",320,210,.07,.26*n),Bt(i,t,e,"bandpass",1600,1.5,.04,.1*n),.08),"hit.axe":(i,t,e,n)=>(Bt(i,t,e,"bandpass",1e3,2,.06,.26*n),Jt(i,t,e,"sine",240,160,.06,.16*n),.08),"hit.sword":(i,t,e,n)=>(Zx(i,t,e,1250,.07*n,.55),Bt(i,t,e,"highpass",4500,.8,.05,.09*n),Jt(i,t,e,"sine",260,170,.05,.1*n),.55),"hit.spear":(i,t,e,n)=>{const s=zs(i,e,.12),r=Ke(i,"bandpass",2200,2);return r.frequency.exponentialRampToValueAtTime(900,e+.1),oe(s,r,Me(i,e,.12*n,.01,.1),t),Jt(i,t,e+.08,"sine",400,300,.03,.08*n),.13},"hit.wall":(i,t,e,n)=>(Jt(i,t,e,"sine",200,130,.09,.24*n),Bt(i,t,e,"lowpass",700,1,.05,.12*n),.1),"hit.bite":(i,t,e,n)=>(Bt(i,t,e,"bandpass",1500,2,.04,.12*n),Jt(i,t,e,"sine",500,300,.05,.08*n),Pn(i,t,e,.18,[[0,110],[.18,95]],[[400,1]],[22,8],.05*n),.2),"hit.boar":(i,t,e,n)=>(Pn(i,t,e,.1,[[0,140],[.1,120]],[[500,1],[1100,.4]],[30,10],.1*n),Pn(i,t,e+.13,.08,[[0,130],[.08,115]],[[500,1]],[30,10],.08*n),Jt(i,t,e,"sine",120,70,.12,.12*n),.25),"hit.aurochs":(i,t,e,n)=>(Jt(i,t,e,"sine",100,55,.2,.2*n),Bt(i,t,e,"bandpass",700,1.5,.12,.08*n),.22),throw:(i,t,e,n)=>{const s=zs(i,e,.36),r=Ke(i,"bandpass",500,1.2);return r.frequency.exponentialRampToValueAtTime(1600,e+.15),r.frequency.exponentialRampToValueAtTime(700,e+.34),oe(s,r,Me(i,e,.1*n,.08,.26),t),.36},bow:(i,t,e,n)=>Oo(i,t,e,n,{dur:.3,f:1800,lfo:[16,24],snapAt:0,snapF:2900,snap:.1}),tower:(i,t,e,n)=>Oo(i,t,e,n,{dur:.34,f:1500,lfo:[13,20],snapAt:0,snapF:2300,snap:.1}),sling:(i,t,e,n)=>Oo(i,t,e,n,{dur:.45,f:1400,lfo:[10,18],snapAt:.42,snapF:2500}),"arrow.hit":(i,t,e,n)=>(Jt(i,t,e,"sine",420,260,.04,.16*n),Bt(i,t,e,"bandpass",2200,2,.03,.08*n),.06),"spear.hit":(i,t,e,n)=>(Jt(i,t,e,"sine",300,180,.06,.2*n),Bt(i,t,e,"bandpass",1500,2,.04,.08*n),.08),"stone.hit":(i,t,e,n)=>(Bt(i,t,e,"bandpass",2600,4,.03,.16*n),Jt(i,t,e,"sine",950,800,.02,.06*n),.05),"ram.boom":(i,t,e,n)=>(Jt(i,t,e,"sine",72,42,.55,.42*n),Bt(i,t,e,"lowpass",350,1,.4,.24*n),Bt(i,t,e+.02,"bandpass",900,2,.08,.08*n),.6),"ram.creak":(i,t,e,n)=>{const s=Ae(i,"sawtooth",140,e,.3);return s.frequency.linearRampToValueAtTime(120,e+.3),oe(s,Ke(i,"bandpass",600,5),Me(i,e,.03*n,.05,.25),t),.3},"animal.sheep":(i,t,e,n)=>(Pn(i,t,e,.7,[[0,330],[.6,300]],[[800,1],[1800,.5],[2600,.2]],[7,18],.07*n),.7),"animal.horse":(i,t,e,n)=>(Pn(i,t,e,.9,[[0,500],[.15,900],[.5,700],[.9,450]],[[1e3,1],[2200,.4]],[9,40],.05*n),.9),"animal.dog":(i,t,e,n)=>{for(const s of[0,.16])Pn(i,t,e+s,.1,[[0,420],[.09,300]],[[900,1],[1700,.5]],[0,0],.08*n);return .28},"animal.wolf":(i,t,e,n)=>(Pn(i,t,e,.45,[[0,95],[.45,90]],[[350,1]],[22,6],.06*n),.45),"animal.howl":(i,t,e,n)=>{for(const[s,r]of[[0,1],[.28,.3]]){const a=Ae(i,"sine",420,e+s,1.6);a.frequency.linearRampToValueAtTime(620,e+s+.6),a.frequency.linearRampToValueAtTime(540,e+s+1.5),oe(a,Ke(i,"lowpass",1200),Me(i,e+s,.05*n*r,.25,1.2,.1),t)}return 1.9},"animal.boar":(i,t,e,n)=>(Pn(i,t,e,.12,[[0,125],[.12,110]],[[500,1]],[28,10],.07*n),Pn(i,t,e+.16,.1,[[0,120],[.1,105]],[[500,1]],[28,10],.06*n),.28),"animal.aurochs":(i,t,e,n)=>(Pn(i,t,e,1,[[0,120],[1,100]],[[350,1],[800,.4]],[4,3],.07*n),1),"animal.deer":(i,t,e,n)=>(Bt(i,t,e,"bandpass",1200,2,.12,.07*n),Bt(i,t,e+.05,"bandpass",600,2,.1,.05*n),.17),"animal.crow":(i,t,e,n)=>{for(const s of[0,.3])Pn(i,t,e+s,.18,[[0,620],[.18,520]],[[1300,1],[2600,.4]],[0,0],.04*n);return .5},"animal.hooves":(i,t,e,n)=>{for(const s of[0,.07,.2,.27])Jt(i,t,e+s,"sine",180,120,.04,.1*n),Bt(i,t,e+s,"lowpass",900,1,.02,.05*n);return .32},bird:(i,t,e,n)=>Wl(i,t,e,n,1+Math.floor(e*977%97))},t_={"order.move":5,"order.work":3.5,"work.rustle":3,"drop.stone":5,"drop.food":4,sling:4,"ram.creak":5,throw:2.5,"stone.hit":2,"res.crumble":2,"hit.spear":1.5,"hit.bite":1.5,bow:4,tower:4,"animal.dog":3.5,"animal.wolf":4,"animal.boar":5,"animal.deer":5,"animal.crow":3,"animal.sheep":2.5,"animal.horse":2,"animal.aurochs":2,horn:.7,gong:.7,"ram.boom":.8};for(const[i,t]of Object.entries(t_)){const e=Sn[i];Sn[i]=(n,s,r,a)=>e(n,s,r,a*t)}function ri(i,t,e,n,s){Jt(i,t,e,"sine",n*1.6,n,.4,.22*s),Bt(i,t,e,"lowpass",400,1,.05,.08*s)}function Er(i,t,e,n,s,r,a=.22){const o=Me(i,e,.13*r,.05,.14,Math.max(0,s-.08)),l=Ae(i,"sine",n,e,s+.3),c=Ae(i,"triangle",n*2,e,s+.3),h=i.createGain();h.gain.value=a;const d=Ae(i,"sine",5,e,s+.3),u=i.createGain();u.gain.setValueAtTime(0,e),u.gain.linearRampToValueAtTime(n*.006,e+.2),d.connect(u),u.connect(l.frequency),u.connect(c.frequency),oe(l,o),oe(c,h,o),o.connect(t),oe(zs(i,e,s+.1),Ke(i,"bandpass",n*2,8),Me(i,e,.02*r,.03,.1,Math.max(0,s-.05)),t)}function e_(i,t,e,n,s,r){Er(i,t,e,n,s,r*.9,.05)}function n_(i,t,e,n,s){Qx(i,t,e,n,.2*s)}function i_(i,t,e,n,s){oe(Ae(i,"sine",n,e,.4),Me(i,e,.12*s,.002,.35),t),oe(Ae(i,"sine",n*2.92,e,.2),Me(i,e,.04*s,.002,.15),t),Bt(i,t,e,"bandpass",3e3,3,.01,.03*s)}function ql(i,t,e,n,s){fn(i,t,e,n,.08*s,[1,2.4,3.6,5.1],2)}function Xl(i,t,e,n,s,r){const a=Ke(i,"lowpass",n*3,.8);a.frequency.linearRampToValueAtTime(n*6,e+.15),a.frequency.linearRampToValueAtTime(n*4,e+s);for(const o of[1,1.004])oe(Ae(i,"sawtooth",n*o,e,s+.3),a);oe(a,Me(i,e,.07*r,.08,.2,Math.max(0,s-.1)),t)}function s_(i,t,e,n,s,r){const a=Ke(i,"lowpass",420,.7),o=i.createGain();o.gain.setValueAtTime(1e-4,e),o.gain.linearRampToValueAtTime(.05*r,e+1.5),o.gain.setValueAtTime(.05*r,e+Math.max(1.5,s-1.5)),o.gain.linearRampToValueAtTime(1e-4,e+s);for(const l of[1,1.5])oe(Ae(i,"sawtooth",n*l,e,s),a);oe(a,o,t)}function Na(i,t,e,n){Bt(i,t,e,"highpass",5e3,1,.06,.05*n,.005)}const rn=i=>440*Math.pow(2,(i-69)/12);function yd(i,t,e,n,s){const r=rn(n.m),a=n.d*s;switch(n.i){case"drum":ri(i,t,e,r,n.v);break;case"drumHi":ri(i,t,e,r*1.8,n.v*.8);break;case"flute":Er(i,t,e,r,a,n.v);break;case"ocarina":e_(i,t,e,r,a,n.v);break;case"lyre":n_(i,t,e,r,n.v);break;case"stones":i_(i,t,e,r,n.v);break;case"bells":ql(i,t,e,r,n.v);break;case"horn":Xl(i,t,e,r,a,n.v);break;case"drone":s_(i,t,e,r,a,n.v);break;case"shaker":Na(i,t,e,n.v);break}}const Tr=62,$l=[[[0,2],[3,1],[5,1]],[[7,3],[5,1]],[[3,1],[5,1],[7,1],[10,1]],[[12,4]],[[10,2],[7,1],[5,1]],[[3,2],[5,2]],[[7,1],[5,1],[3,1],[2,1]],[[0,4]]],r_=[...$l.slice(0,3),[[12,2],[10,1],[12,1]],...$l.slice(4,7),[[0,2],[-5,1],[0,1]]],a_=[[[7,1],[10,1],[12,2]],[[14,2],[12,2]],[[10,1],[12,1],[14,1],[15,1]],[[17,3],[15,1]],[[14,2],[12,1],[10,1]],[[12,2],[7,2]],[[10,1],[9,1],[7,1],[5,1]],[[7,4]]],ws=[[0,7,12,15],[0,7,12,15],[-2,5,10,14],[-2,5,10,14],[0,7,12,15],[7,14,19,22],[-2,5,10,14],[0,7,12,15]];function Yl(){const i=[];let t=0;const e=(n,s,r)=>n.forEach((a,o)=>{let l=0;for(const[c,h]of a)i.push({b:(t+o)*4+l,i:s,m:Tr+c,d:h,v:r}),l+=h});for(let n=0;n<4;n++,t+=8){e(n===2?a_:n===1?r_:$l,"flute",1);for(let s=0;s<8;s++){const r=(t+s)*4;if(i.push({b:r,i:"drum",m:38,d:1,v:.9},{b:r+2,i:"drum",m:43,d:1,v:.6}),n>=2){i.push({b:r+3.5,i:"drumHi",m:43,d:1,v:.4});for(let a=0;a<4;a++)i.push({b:r+a+.5,i:"shaker",m:0,d:.5,v:.7})}n>=1&&ws[s].concat([ws[s][2],ws[s][1],ws[s][2],ws[s][1]]).forEach((a,o)=>i.push({b:r+o*.5,i:"lyre",m:50+a,d:.5,v:.7})),n===3&&i.push({b:r,i:"bells",m:74+ws[s][0],d:2,v:.8})}n===2&&[[0,50],[8,45],[16,48],[24,50]].forEach(([s,r])=>i.push({b:t*4+s,i:"horn",m:r,d:7,v:.9}))}return i.push({b:128,i:"drum",m:38,d:1,v:1},{b:128,i:"flute",m:Tr,d:3,v:.9}),{bpm:80,beats:132,notes:i}}const o_=[[0,3,5,7,10],[0,2,3,5,7,9,10],[0,2,4,5,7,9,10]];function l_(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const au=[[1,1,2],[.5,.5,1,2],[1.5,.5,2],[2,1,1],[1,1,1,1],[3,1],[2,2]];function bd(i,t,e,n){const s=Math.min(i,2),r=l_(n*97+s*13+t*5),a=o_[s],o=a.length,l=P=>Tr+12*Math.floor(P/o)+a[(P%o+o)%o],c=t===1,h=e===3,d=Math.round([72,80,88][s]*(c?1.15:1)*(h?.85:e===2?.93:1)),u=[],f=P=>{const T=[];let E=P;for(let w=0;w<2;w++){const b=au[Math.floor(r()*au.length)],y=[];for(const S of b)y.push([E,S]),E=Math.max(-2,Math.min(o+3,E+[-2,-1,-1,1,1,2,0][Math.floor(r()*7)]));T.push(y)}return T},m=f(Math.floor(r()*3)),v=f(2+Math.floor(r()*3)),g=f(o),p=(P,T)=>P.map(E=>E.map(([w,b])=>[w+T,b])),M=[[[2,2],[1,2]],[[0,4]]],x=[...m,...p(m,1),...v,...M,...m,...p(m,-1),...g,...M,...g,...p(g,-1),...v,...M,...m,...v,...m,...M],_=s===0?"flute":s===1?"ocarina":"flute";return x.forEach((P,T)=>{let E=0;const w=T*4,b=!c&&T%8===7&&r()<.3;for(const[S,L]of P)!b&&!(h&&r()<.25)&&u.push({b:w+E,i:_,m:l(S)+(s===0?0:12*(e===1?1:0)),d:L*.95,v:.85}),E+=L;const y=h?.4:c?1:.7;if(s===0){if(u.push({b:w,i:"drum",m:38,d:1,v:.9}),r()<y&&u.push({b:w+2,i:"drum",m:43,d:1,v:.6}),c)for(let S=0;S<4;S++)u.push({b:w+S+.5,i:"shaker",m:0,d:.5,v:.6});T%4===3&&r()<y&&u.push({b:w+3,i:"drumHi",m:43,d:.5,v:.5},{b:w+3.5,i:"drumHi",m:43,d:.5,v:.4})}else if(s===1)T%8===0&&u.push({b:w,i:"drone",m:38,d:32,v:.9}),(T%2===0||c)&&u.push({b:w,i:"drum",m:38,d:1,v:.7}),r()<y&&[0,1.5,3].forEach((S,L)=>u.push({b:w+S,i:"stones",m:l([0,2,4][L]+T%2)-12,d:1,v:.6}));else{const S=T%8<4?0:T%8<6?-2:5,L=[S,S+7,S+12,S+16];r()<y+.2&&[0,1,2,3,2,1,2,1].forEach((D,U)=>u.push({b:w+U*.5,i:"lyre",m:50+L[D],d:.5,v:.6})),u.push({b:w,i:"drum",m:38,d:1,v:.8}),c&&u.push({b:w+2,i:"drum",m:43,d:1,v:.6},{b:w+3.5,i:"shaker",m:0,d:.5,v:.6}),T%8===0&&u.push({b:w,i:"bells",m:74+S,d:2,v:.7}),T%8===6&&r()<.7&&u.push({b:w,i:"horn",m:45+(r()<.5?0:5),d:6,v:.8})}}),{bpm:d,beats:x.length*4,notes:u}}class c_{constructor(){R(this,"base",null);R(this,"tens",null);R(this,"batt",null);R(this,"queue",[]);R(this,"qi",0);R(this,"mode","off");R(this,"pieceEnd",0);R(this,"nextStart",0);R(this,"pieceN",0);R(this,"seed",1);R(this,"tension",0);R(this,"battle",0);R(this,"layerT",0);R(this,"getEra",()=>0);R(this,"getSeason",()=>0);_t.ready(()=>{const t=_t.ctx,e=_t.out("music");this.base=t.createGain(),this.tens=t.createGain(),this.batt=t.createGain();for(const n of[this.base,this.tens,this.batt])n.connect(e);this.tens.gain.value=this.batt.gain.value=0,setInterval(()=>this.tick(),200),this.mode==="menu"&&this.startMenu()})}menu(){this.mode!=="menu"&&(this.mode="menu",this.startMenu())}startMenu(){_t.ctx&&(this.clear(),this.enqueue(Yl(),_t.now+.4))}game(t,e){this.getEra=t,this.getSeason=e,this.mode="game",this.pieceN=0,this.seed=(Date.now()&65535)+1,_t.ctx&&(this.clear(),this.nextStart=_t.now+6)}stop(){this.mode="off",this.clear()}preview(t,e,n){this.mode="game",this.getEra=()=>t,this.getSeason=()=>n,this.pieceN=e,this.seed=7,_t.ctx&&(this.clear(),this.nextStart=_t.now+.5)}setTension(t){this.tension=t}setBattle(t){this.battle=t}clear(){const t=_t.now;this.queue=[],this.qi=0,this.pieceEnd=t,this.base&&(this.base.gain.cancelScheduledValues(t),this.base.gain.setValueAtTime(this.base.gain.value,t),this.base.gain.linearRampToValueAtTime(0,t+.6),this.base.gain.linearRampToValueAtTime(1,t+1.6))}enqueue(t,e){const n=60/t.bpm;for(const s of t.notes)this.queue.push({t:e+s.b*n,n:s,spb:n,out:"base"});this.queue.sort((s,r)=>s.t-r.t),this.qi=0,this.pieceEnd=e+t.beats*n}tick(){if(!_t.running||!this.base)return;const t=_t.now,e=t+1.2;if(this.qi>=this.queue.length){if(this.mode==="menu"&&t>this.pieceEnd-.5)this.enqueue(Yl(),Math.max(t+.2,this.pieceEnd+3));else if(this.mode==="game"&&t>=this.nextStart-.5){const s=bd(this.getEra(),this.pieceN%3,this.getSeason(),this.seed+this.pieceN);this.pieceN++,this.enqueue(s,Math.max(t+.2,this.nextStart)),this.nextStart=this.pieceEnd+60+(this.seed*7+this.pieceN*31)%90}}for(;this.qi<this.queue.length&&this.queue[this.qi].t<e;){const s=this.queue[this.qi++];s.t>=t-.05&&yd(_t.ctx,this.base,Math.max(s.t,t),s.n,s.spb)}const n=_t.ctx;if(this.tens.gain.setTargetAtTime(this.mode==="game"?this.tension:0,t,1.2),this.batt.gain.setTargetAtTime(this.mode==="game"?this.battle:0,t,this.battle>.05?.4:2.5),this.mode==="game"&&(this.tension>.02||this.battle>.02)){const s=.7142857142857143;for(this.layerT<t&&(this.layerT=t+.05);this.layerT<e;){const r=this.layerT,a=Math.round(r/s%4);this.tension>.02&&ri(n,this.tens,r,rn(33),.8),this.battle>.02&&(ri(n,this.batt,r,rn(a%2?43:38),.9),ri(n,this.batt,r+s/2,rn(48),.55),Na(n,this.batt,r+s/4,.8),Na(n,this.batt,r+s*.75,.8)),this.layerT+=s}}}stinger(t,e=0){const n=_t.ctx,s=_t.out("alert");if(!n||!s||!_t.voice(3))return;const r=n.currentTime+.05;if(_t.duck(.7,3.5),t==="age"){for(let o=0;o<6;o++)ri(n,s,r+o*.12,rn(38+o%2*5),.5+o*.08);[0,4,7,12].map(o=>Tr+o+(e>=2?0:-12)).forEach((o,l)=>e>=2?Xl(n,s,r+.75+l*.22,rn(o-12),.3,1.4):Er(n,s,r+.75+l*.2,rn(o+12),.3,1.2)),e>=2?ql(n,s,r+1.6,rn(74),1.2):ri(n,s,r+1.6,rn(38),1)}else if(t==="victory"){[0,4,7,12,7,12].forEach((a,o)=>Xl(n,s,r+o*.25,rn(50+a),o===5?1.2:.22,1.3));for(let a=0;a<8;a++)ri(n,s,r+a*.125,rn(38+a%2*5),.7);ql(n,s,r+1.3,rn(74),1.3)}else[12,10,7,5,3,0].forEach((a,o)=>Er(n,s,r+o*.35,rn(Tr+a),o===5?1.4:.32,.9)),ri(n,s,r+2.1,rn(38),.6)}}const He=new c_,Bo={theme:Yl,eraPiece:bd,play:yd};class Sd{constructor(){R(this,"loops",{});R(this,"wf",null);R(this,"t",null);R(this,"next",{});R(this,"seed",1)}start(){const t=_t.ctx,e=_t.out("amb");if(!t||!e||this.loops.wind)return;const n=(s,r)=>{const a=t.createGain();a.gain.value=0,a.connect(e),this.loops[s]={g:a,stop:r(a)}};n("wind",s=>{const r=va(t),a=t.createBiquadFilter();a.type="lowpass",a.frequency.value=380,a.Q.value=.6,this.wf=a;const o=t.createOscillator(),l=t.createGain();o.frequency.value=.07,l.gain.value=220,o.connect(l).connect(a.frequency);const c=t.createGain(),h=t.createOscillator(),d=t.createGain();return c.gain.value=.75,h.frequency.value=.11,d.gain.value=.25,h.connect(d).connect(c.gain),r.connect(a).connect(c).connect(s),o.start(),h.start(),()=>{r.stop(),o.stop(),h.stop()}}),n("water",s=>{const r=va(t),a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=700,a.Q.value=.9;const o=t.createGain(),l=t.createOscillator(),c=t.createGain();return o.gain.value=.8,l.frequency.value=.4,c.gain.value=.2,l.connect(c).connect(o.gain),r.connect(a).connect(o).connect(s),l.start(),()=>{r.stop(),l.stop()}}),n("fire",s=>{const r=va(t),a=t.createBiquadFilter();return a.type="lowpass",a.frequency.value=170,r.connect(a).connect(s),()=>r.stop()}),n("market",s=>{const r=va(t),a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=600,a.Q.value=3;const o=t.createOscillator(),l=t.createGain();return o.frequency.value=3.3,l.gain.value=250,o.connect(l).connect(a.frequency),r.connect(a).connect(s),o.start(),()=>{r.stop(),o.stop()}}),n("insects",s=>{const r=t.createOscillator();r.type="triangle",r.frequency.value=4300;const a=t.createGain(),o=t.createOscillator(),l=t.createGain();a.gain.value=.5,o.frequency.value=32,l.gain.value=.5,o.connect(l).connect(a.gain);const c=t.createGain(),h=t.createOscillator(),d=t.createGain();return c.gain.value=.5,h.frequency.value=.3,d.gain.value=.5,h.connect(d).connect(c.gain),r.connect(a).connect(c).connect(s),r.start(),o.start(),h.start(),()=>{r.stop(),o.stop(),h.stop()}})}stop(){const t=_t.now;for(const e in this.loops){const n=this.loops[e];n.g.gain.setTargetAtTime(0,t,.3),setTimeout(()=>{try{n.stop()}catch{}},1500)}this.loops={},this.wf=null}set(t){this.t=t;const e=_t.now,n=this.loops;if(!n.wind)return;const s=t.season,r=Math.min(1,Math.max(0,(t.zoom-20)/60)),a={wind:([.32,.22,.48,.7][s]??.3)*(.6+r*.6),water:t.water*.6*(1-r*.5),fire:t.fire*.5,market:t.market*(t.fair?.12:.06),insects:s===1?.012*(1-r*.5):0};for(const o in a)n[o]?.g.gain.setTargetAtTime(a[o],e,1);this.wf&&this.wf.frequency.setTargetAtTime(s===3?700:380,e,2)}tick(){const t=this.t,e=_t.ctx,n=_t.out("amb");if(!t||!e||!n||!_t.running)return;const s=e.currentTime,r=t.season,a=()=>(this.seed=this.seed*16807%2147483647,this.seed/2147483647),o=(h,d)=>(this.next[h]??0)>s?!1:(this.next[h]=s+d(),!0),l=1-Math.min(1,Math.max(0,(t.zoom-20)/70)),c=[.9,.6,.25,0][r]*(.4+t.trees*.6);c>.05&&o("bird",()=>1.5+a()*4/c)&&Wl(e,n,s+.05,.9*l+.3,1+Math.floor(a()*90)),r===3&&o("crow",()=>9+a()*14)&&Sn["animal.crow"](e,n,s+.05,.6),r===2&&t.trees>.2&&o("leaves",()=>2+a()*4)&&Sn["work.rustle"](e,n,s+.05,.6*l),t.fire>.05&&o("crackle",()=>.08+a()*.35)&&Sn["stone.hit"](e,n,s+.02,.18*t.fire*(.5+a())),t.forge>.05&&o("forge",()=>1.1+a()*1.2)&&Sn["work.pickMetal"](e,n,s+.02,.8*t.forge),t.pens>.05&&o("sheep",()=>6+a()*10)&&Sn["animal.sheep"](e,n,s+.05,.9*t.pens),t.stables>.05&&o("horse",()=>9+a()*12)&&Sn["animal.horse"](e,n,s+.05,.8*t.stables)}}const Ps=(i,t,e)=>Math.max(t,Math.min(e,i)),ou=new Map,Kl={};function za(i,t=1,e=0,n="sfx",s=.07){const r=_t.ctx,a=_t.out(n),o=Sn[i];if(!r||!a||!o||!_t.running||t<.01)return;const l=r.currentTime;if((ou.get(i)??-9)>l-s||!_t.voice(.35))return;ou.set(i,l),Kl[i]=(Kl[i]??0)+1;let c=a;if(e&&r.createStereoPanner){const h=r.createStereoPanner();h.pan.value=Ps(e,-1,1),h.connect(a),c=h}o(r,c,l+.01,Ps(t,0,1.2))}const Ei=i=>_t.whenRunning(()=>za(i,1,0,"ui",.04));class h_{constructor(t,e,n){R(this,"amb",new Sd);R(this,"t",0);R(this,"slow",0);R(this,"raidUntil",0);R(this,"animalT",0);this.w=t,this.me=e,this.cam=n,_t.setScene("game"),He.game(()=>t.players[e].era,()=>t.season),In.emit=(s,r,a,o)=>this.at(s,r,a,o),_t.ready(()=>this.amb.start())}dispose(){In.emit=()=>{},this.amb.stop()}at(t,e,n,s=1){if(!_t.running)return;const r=this.w,a=r.size,o=Math.floor(e),l=Math.floor(n);if(o<0||l<0||o>=a||l>=a||!r.vis[this.me][l*a+o])return;const c=this.cam,h=e-c.x,d=n-c.z,u=Math.hypot(h,d),f=Ps(1-u/22,0,1),m=Ps(1.25-c.dist/70,.3,1);if(f<.05)return;const v=(h*Math.cos(c.yaw)-d*Math.sin(c.yaw))/12;za(t,s*f*f*m,v)}alert(t){za(t,1,0,"alert",.5),(t==="horn"||t==="drums.war"||t==="gong")&&_t.duck()}onEvents(t){const e=this.w,n=e.size;for(const s of t)switch(s.t){case"proj":this.at(s.h!==void 0?"tower":s.kind==="arrow"?"bow":s.kind==="stone"?"sling":"throw",s.x0/256,s.z0/256);break;case"death":{const r=s.x/256,a=s.z/256;this.at(s.kind>=jt?"crash":s.owner===fe?"fall.animal":"puff",r,a);break}case"built":e.alive[s.e]&&this.at("built",e.x[s.e]/256,e.z[s.e]/256);break;case"trained":e.alive[s.e]&&e.owner[s.e]===this.me&&this.at("trained",e.x[s.e]/256,e.z[s.e]/256,.8);break;case"tree":this.at("tree.fall",s.k%n+.5,Math.floor(s.k/n)+.5);break;case"res":e.resKind[s.k]===0&&this.at("res.crumble",s.k%n+.5,Math.floor(s.k/n)+.5);break;case"age":s.player===this.me&&He.stinger("age",s.era);break;case"end":He.stinger(s.result==="victory"?"victory":"defeat");break;case"msg":{if(s.player!==this.me)break;const r=s.key.split(".")[0],a={underAttack:"horn",raidSoon:"drums.war",centerLost:"gong",tech:"tech",fair:"fair",winter:"winter",spring:"spring",hunger:"hunger",winterSoon:"soft",metalSeen:"metal",campLoot:"metal"};a[r]&&this.alert(a[r]),r==="raidSoon"&&(this.raidUntil=this.w.tick+400);break}}}update(t,e){if(_t.setPaused(e),this.t+=t,(this.slow-=t)>0||(this.slow=.25,!_t.running))return;const n=this.w,s=this.me,r=n.size,a=this.cam,o=a.x,l=a.z,c=n.vis[s];let h=0,d=0,u=0;for(let T=-8;T<=8;T+=2)for(let E=-8;E<=8;E+=2){const w=Math.floor(o+E),b=Math.floor(l+T);if(w<0||b<0||w>=r||b>=r)continue;const y=b*r+w;u++;const S=n.map.terrain[y];(S===Ri||S===Fs)&&h++,n.map.tree[y]&&d++}let f=0,m=0,v=0,g=0,p=0,M=0,x=0;const _=[];for(let T=0;T<n.top;T++){if(!n.alive[T])continue;const E=n.x[T]/256,w=n.z[T]/256,b=Math.hypot(E-o,w-l);if(b>18||!c[Math.floor(w)*r+Math.floor(E)]&&n.owner[T]!==s)continue;const y=Ps(1-b/16,0,1);if(n.kind[T]>=jt){if(!n.done[T])continue;const S=be[n.kind[T]-jt].key;S==="center"||S==="camp"?f=Math.max(f,y):S==="forge"?m=Math.max(m,y):S==="market"?v=Math.max(v,y):S==="pen"?g=Math.max(g,y):S==="stable"&&(p=Math.max(p,y))}else n.kind[T]<yt.length&&(n.owner[T]===fe?b<14&&_.push(T):n.task[T]===Ge&&(M++,n.owner[T]===s&&x++),yt[n.kind[T]].key==="horseman"&&(p=Math.max(p,y*.5)))}if(this.amb.set({season:n.season,zoom:a.dist,water:u?Math.min(1,h/u*3):0,fire:f,market:v,fair:n.fair,forge:m,pens:g,stables:p,trees:u?Math.min(1,d/u*2):0}),this.amb.tick(),_.length&&(this.animalT-=.25)<=0){const T=_[Math.floor(this.t*7.7%_.length)],E=yt[n.kind[T]].key,w=E==="wolf"?n.season===3?"animal.howl":"animal.wolf":`animal.${E}`;Sn[w]&&this.at(w,n.x[T]/256,n.z[T]/256,E==="wolf"&&n.season===3?.6:.8),this.animalT=5+this.t*13%7}let P=n.tick<this.raidUntil;if(!P&&Math.floor(this.t*4)%4===0){const T=n.players[s];for(let E=0;E<n.top&&!P;E++)if(n.isUnit(E)&&n.owner[E]!==s&&n.owner[E]!==fe&&(n.owner[E]===ci||n.hostile(s,n.owner[E]))){const w=n.x[E]/256-T.start.x,b=n.z[E]/256-T.start.z;w*w+b*b<196&&(P=!0)}}He.setTension(P?.6:0),He.setBattle(x>0?Ps((M-1)/8,.3,1):0)}}const Ed=[["Botões e ordens",["ui.click","ui.denied","sel.villager","sel.soldier","sel.building","order.move","order.work","order.attack","place","place.bad","trained","built"]],["Avisos",["horn","drums.war","gong","tech","metal","fair","winter","spring","hunger","soft"]],["Trabalho",["work.chop","work.pick","work.pickMetal","work.hoe","work.mallet","work.rustle","drop.wood","drop.stone","drop.food","drop.metal","tree.fall","res.crumble"]],["Batalha",["hit.club","hit.axe","hit.sword","hit.spear","hit.wall","hit.bite","hit.boar","hit.aurochs","throw","bow","tower","sling","arrow.hit","spear.hit","stone.hit","ram.boom","ram.creak","puff","fall.animal","crash"]],["Animais",["animal.sheep","animal.horse","animal.dog","animal.wolf","animal.howl","animal.boar","animal.aurochs","animal.deer","animal.crow","animal.hooves","bird"]]],u_={"ui.click":"Toque num botão","ui.denied":"Botão que não dá","sel.villager":"Escolher coletor","sel.soldier":"Escolher soldado","sel.building":"Escolher construção","order.move":"Ordem: andar","order.work":"Ordem: trabalhar","order.attack":"Ordem: atacar",place:"Construção colocada","place.bad":"Lugar ruim para construir",trained:"Unidade pronta",built:"Construção pronta",horn:"Trompa: ataque!","drums.war":"Tambores: bárbaros vindo",gong:"Gongo: Centro perdido",tech:"Pesquisa pronta",metal:"Metal encontrado",fair:"Dia de feira",winter:"Chegou o inverno",spring:"Chegou a primavera",hunger:"Fome",soft:"Aviso calmo","work.chop":"Machado na árvore","work.pick":"Picareta na pedra","work.pickMetal":"Picareta no metal","work.hoe":"Enxada na roça","work.mallet":"Martelo na obra","work.rustle":"Mexendo nas folhas","drop.wood":"Entrega de madeira","drop.stone":"Entrega de pedra","drop.food":"Entrega de comida","drop.metal":"Entrega de metal","tree.fall":"Árvore caindo","res.crumble":"Pedreira acabando","hit.club":"Golpe de clava","hit.axe":"Golpe de machado","hit.sword":"Golpe de espada","hit.spear":"Golpe de lança","hit.wall":"Golpe na construção","hit.bite":"Mordida","hit.boar":"Javali atacando","hit.aurochs":"Auroque atacando",throw:"Lança arremessada",bow:"Arco",tower:"Torre atirando",sling:"Funda","arrow.hit":"Flecha acertando","spear.hit":"Lança acertando","stone.hit":"Pedra acertando","ram.boom":"Aríete batendo","ram.creak":"Aríete andando",puff:"Alguém caiu","fall.animal":"Bicho caindo",crash:"Construção desabando","animal.sheep":"Ovelha","animal.horse":"Cavalo","animal.dog":"Cachorro","animal.wolf":"Lobo","animal.howl":"Uivo do lobo (inverno)","animal.boar":"Javali","animal.aurochs":"Auroque","animal.deer":"Cervo","animal.crow":"Corvo (inverno)","animal.hooves":"Cascos do cavalo",bird:"Passarinho"},d_=[["age:1","Chegou o Neolítico"],["age:2","Chegou a Idade dos Metais"],["victory","Vitória"],["defeat","Derrota"]],f_=["Pedra","Neolítico","Metais"],p_=["calma","animada","calma 2"],m_=["primavera","verão","outono","inverno"];function g_(){_t.install(),_t.setScene("menu");const i=new Sd,t=document.createElement("div");t.id="escuta",t.innerHTML=`<style>#escuta{position:fixed;inset:0;overflow:auto;background:#141a17;color:#e8ede9;font:15px system-ui,sans-serif;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));z-index:50}
    #escuta h1{font-size:20px;margin:0 0 4px}#escuta h2{font-size:15px;margin:18px 0 6px;color:#f2c14e}#escuta p{margin:0 0 8px;color:#a9b8b0;max-width:720px}
    #escuta button{margin:3px;padding:8px 12px;border-radius:8px;border:1px solid #3b4a42;background:#22302a;color:#e8ede9;font:inherit;cursor:pointer}
    #escuta button[aria-pressed=true]{background:#f2c14e;color:#141a17}</style>
    <h1>Origines · página de escuta</h1><p>Toque em cada botão para ouvir. Tudo é feito por código, sem arquivos de som. Os volumes são os do jogo (efeitos no "alto").</p>
    <p id="escuta-estado" role="status">Som: toque em qualquer botão para ligar.</p><p>No iPhone, com a chavinha do modo silencioso ligada, esta página fica muda (como o jogo).</p>
    ${Ed.map(([l,c])=>`<h2>${l}</h2>${c.map(h=>`<button data-som="${h}" title="${h}">${u_[h]??h}</button>`).join("")}`).join("")}
    <h2>Música</h2><button data-musica-teste="tema">Tema da tela inicial</button>
    ${f_.map((l,c)=>p_.map((h,d)=>`<button data-musica-teste="era:${c}:${d}">${l} · ${h}</button>`).join("")).join("")}
    <button data-musica-teste="inverno">Metais no inverno</button><button data-musica-teste="tensao">+ tensão</button><button data-musica-teste="batalha">+ batalha</button><button data-musica-teste="parar">Parar a música</button>
    <h2>Vinhetas</h2>${d_.map(([l,c])=>`<button data-vinheta="${l}">${c}</button>`).join("")}
    <h2>Ambiente</h2>${m_.map((l,c)=>`<button data-ambiente-teste="${c}">${l}</button>`).join("")}<button data-ambiente-teste="rio">perto do rio</button><button data-ambiente-teste="aldeia">aldeia (fogueira, forja, ovelhas)</button><button data-ambiente-teste="feira">mercado em dia de feira</button><button data-ambiente-teste="parar">parar</button>`,document.body.appendChild(t);const e={season:0,zoom:40,water:0,fire:0,market:0,fair:!1,forge:0,pens:0,stables:0,trees:.6};let n={...e},s=0;const r=l=>{_t.setScene("game"),i.start(),n=l,i.set(l),s||(s=window.setInterval(()=>{i.set(n),i.tick()},250))};t.addEventListener("click",l=>{const c=l.target.closest("button");c&&(_t.unlock(),t.querySelectorAll("[aria-pressed]").forEach(h=>h.removeAttribute("aria-pressed")),c.setAttribute("aria-pressed","true"),_t.whenRunning(()=>o(c)))});const a=t.querySelector("#escuta-estado");window.setInterval(()=>{a.textContent=_t.ctx?_t.running?"Som: ligado.":"Som: ligando… se não tocar, toque de novo.":"Som: toque em qualquer botão para ligar."},400);function o(l){const c=l.dataset;if(c.som&&za(c.som,1,0,["horn","drums.war","gong","tech","metal","fair","winter","spring","hunger","soft"].includes(c.som)?"alert":"sfx",0),c.musicaTeste){const h=c.musicaTeste;if(_t.setScene(h==="tema"?"menu":"game"),_t.setOpts({music:Math.max(2,_t.opts.music)}),h==="tema")He.stop(),He.menu();else if(h==="parar")He.stop();else if(h==="tensao")He.setTension(.6);else if(h==="batalha")He.setBattle(.9);else if(h==="inverno")He.preview(2,0,3);else{const[,d,u]=h.split(":").map(Number);He.setTension(0),He.setBattle(0),He.preview(d,u,0)}}if(c.vinheta){const[h,d]=c.vinheta.split(":");He.stinger(h,Number(d)||0)}if(c.ambienteTeste){const h=c.ambienteTeste;h==="parar"?(i.set({...e,season:1,trees:0}),n={...e,season:-1,trees:0}):r(h==="rio"?{...e,season:1,water:1,zoom:22}:h==="aldeia"?{...e,fire:1,forge:1,pens:1,zoom:22}:h==="feira"?{...e,market:1,fair:!0,zoom:22}:{...e,season:Number(h)})}}}async function v_(i){const e=new OfflineAudioContext(1,176400,44100);let n=0;if(Sn[i])n=Sn[i](e,e.destination,.01,1);else if(i.startsWith("musica:")){const[,c,h]=i.split(":"),d=c==="tema"?Bo.theme():Bo.eraPiece(Number(h),1,0,3),u=60/d.bpm;for(const f of d.notes)f.b*u<3.6&&Bo.play(e,e.destination,.01+f.b*u,f,u);n=4}const s=await e.startRendering(),r=s.getChannelData(0);let a=0,o=0,l=0;for(let c=0;c<r.length;c++){const h=Math.abs(r[c]);h>a&&(a=h),c<Math.max(1,n)*44100&&(o+=r[c]*r[c],l++)}return{id:i,peak:a,rms:Math.sqrt(o/Math.max(1,l)),dur:n}}const x_=Ed.flatMap(i=>i[1]),Xs=new URLSearchParams(location.search),Fa=(i,t)=>{const e=Number(Xs.get(i));return Xs.has(i)&&Number.isFinite(e)&&e>=0?e:t},Td=matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>1,Ad=document.getElementById("scene"),Ar=dd.makeRenderer(Ad),ye=0,Ho=1/cu;let Ti=Td?1:0,Oa=!0;try{const i=localStorage.getItem("origines_q");i!==null&&(Ti=Math.min(2,Math.max(0,Number(i)||0)),Oa=!1)}catch{}const wd=i=>{Ti=i;try{localStorage.setItem("origines_q",String(i))}catch{}};class __{constructor(t){R(this,"scene");R(this,"hud");R(this,"input");R(this,"minimap");R(this,"snd");R(this,"sel",new Set);R(this,"paused",!1);R(this,"ended",!1);R(this,"acc",0);R(this,"time",0);R(this,"saveT",0);R(this,"idleCursor",0);R(this,"autoT",0);R(this,"autoN",0);R(this,"mode","normal");R(this,"placeKey","");R(this,"place",{tx:0,tz:0,ok:!1});R(this,"rallyB",-1);R(this,"wallA",null);R(this,"wallTiles",[]);this.world=t;const e=t;this.scene=new dd(Ar,e,ye),this.scene.setQuality(Ti),Xs.get("fog")==="0"&&this.scene.setFog(!1),this.hud=new Vl(e,ye,{idle:()=>{const n=this.own(r=>e.kind[r]===ie.villager&&e.task[r]===0&&e.state[r]===0);if(!n.length)return;const s=n[this.idleCursor++%n.length];this.select([s]),this.focus([s])},army:()=>{const n=this.own(s=>e.kind[s]!==ie.villager);this.select(n),this.focus(n)},home:()=>{const n=e.players[ye].start;this.scene.camera.tx=n.x,this.scene.camera.tz=n.z},menu:()=>this.pause(),keepKind:n=>{for(const s of[...this.sel])e.kind[s]!==n&&this.sel.delete(s)},clear:()=>{this.sel.clear(),this.setMode("normal")},stop:()=>{const n=this.own(s=>this.sel.has(s));n.length&&e.issue({type:"stop",player:ye,ids:n})},startPlace:n=>this.startPlace(n),train:(n,s)=>e.issue({type:"train",player:ye,building:n,key:s}),cancelQueue:n=>e.issue({type:"cancel",player:ye,building:n}),ageUp:n=>e.issue({type:"ageup",player:ye,building:n}),research:(n,s)=>e.issue({type:"research",player:ye,building:n,key:s}),trade:(n,s,r)=>e.issue({type:"trade",player:ye,building:n,give:s,get:r}),rally:n=>{this.rallyB=n,this.setMode(this.mode==="rally"?"normal":"rally")},placeConfirm:()=>this.confirmPlace(!1),cancelMode:()=>this.setMode("normal"),jump:(n,s)=>{this.scene.camera.tx=n,this.scene.camera.tz=s}},Td,this.sel),this.minimap=new Rx(this.hud.minimap,e,ye,this.scene.camera),this.snd=new h_(e,ye,this.scene.camera),this.input=new Px(Ad,e,ye,this.scene.camera,this.hud.box,{onCommand:n=>{if(this.mode!=="normal")return;const{cmds:s,ping:r}=Dx(e,ye,[...this.sel],n);for(const a of s)e.issue(a);s.length&&(this.scene.ping(n.x,n.z,r),Ei(r==="attack"?"order.attack":r==="work"?"order.work":"order.move"))},onRally:(n,s)=>{const r=this.mode==="rally"&&e.alive[this.rallyB]?this.rallyB:this.input.singleOwnBuilding();r>=0&&(e.issue({type:"rally",player:ye,building:r,x:Math.round(n*256),z:Math.round(s*256)}),this.scene.ping(n,s,"move")),this.setMode("normal")},onPlaceAt:(n,s)=>this.movePlace(n,s),onPlaceConfirm:n=>this.confirmPlace(n),onCancel:()=>this.setMode("normal"),onSelect:()=>{this.mode==="place"&&!Ux(e,this.sel)&&this.setMode("normal"),this.mode==="rally"&&this.setMode("normal"),this.selectSound()},onInteract:()=>this.hud.hideHint(),mode:()=>this.mode,fogOn:()=>this.scene.fogOn}),this.input.selected=this.sel,this.resize()}selectSound(){const t=this.world,e=[...this.sel][0];if(e===void 0||!t.alive[e]||t.owner[e]!==ye)return;if(t.isBuilding(e)){const s=t.bdef(e).key;Ei(s==="pen"?"animal.sheep":s==="stable"?"animal.horse":s==="forge"?"work.pickMetal":s==="market"?"soft":"sel.building");return}const n=t.kind[e];Ei(n===ie.villager?"sel.villager":n===ie.dog?"animal.dog":n===ie.horseman?"animal.horse":"sel.soldier")}own(t){const e=this.world,n=[];for(let s=0;s<e.top;s++)e.isUnit(s)&&e.owner[s]===ye&&t(s)&&n.push(s);return n}select(t){this.sel.clear();for(const e of t)this.sel.add(e);this.setMode("normal")}focus(t){if(!t.length)return;let e=0,n=0;for(const s of t)e+=this.world.x[s]/256,n+=this.world.z[s]/256;this.scene.camera.tx=e/t.length,this.scene.camera.tz=n/t.length}setMode(t){this.mode=t,t!=="place"&&(this.scene.setGhost(null),this.scene.setWallGhost(null),this.wallA=null),this.hud.setMode(t,this.place.ok,t==="place"&&this.placeKey==="wall"?this.wallA?2:1:0,t==="place"?this.placeKey:""),this.hud.refresh()}startPlace(t){this.placeKey=t,this.mode="place",this.wallA=null,this.hud.resetCard(),this.movePlace(this.scene.camera.x,this.scene.camera.z)}wallLine(t,e,n,s){const r=this.world.size,a=[e*r+t],o=Math.sign(n-t),l=Math.sign(s-e),c=n-t,h=s-e,d=Math.hypot(c,h)||1,u=(v,g)=>Math.abs((v-t)*h-(g-e)*c)/d;let f=t,m=e;for(;(f!==n||m!==s)&&a.length<40;)f===n?m+=l:m===s||u(f+o,m)<=u(f,m+l)?f+=o:m+=l,a.push(m*r+f);return a}moveWall(t,e){const n=this.world,s=n.size,r=be[cn.wall].cost.stone??0,a=Math.floor(t),o=Math.floor(e),l=this.wallA?this.wallLine(this.wallA.tx,this.wallA.tz,a,o):[o*s+a];let c=Math.floor(n.players[ye].res.stone/100/r);const h=l.map(d=>{const u=n.canPlace(ye,"wall",d%s,Math.floor(d/s))&&c>0;return u&&c--,u});this.wallTiles=l.filter((d,u)=>h[u]),this.place={tx:a,tz:o,ok:this.wallTiles.length>0},this.scene.setWallGhost(l,h),this.hud.setMode("place",this.place.ok,this.wallA?2:1,this.placeKey)}movePlace(t,e){if(this.mode!=="place")return;if(this.placeKey==="wall"){this.moveWall(t,e);return}const n=this.world,s=be[cn[this.placeKey]],r=Math.round(t-s.size/2),a=Math.round(e-s.size/2),o=n.canPlace(ye,this.placeKey,r,a)&&n.canAfford(ye,s.cost);this.place={tx:r,tz:a,ok:o},this.scene.setGhost(this.placeKey,r,a,o),this.hud.setMode("place",o,0,this.placeKey)}confirmPlace(t){const e=this.world,n=this.own(r=>this.sel.has(r)&&e.kind[r]===ie.villager);if(this.mode!=="place"||!n.length){this.setMode("normal");return}if(!this.place.ok){this.hud.toast($("place.bad"),void 0,void 0,"place"),Ei("place.bad");return}if(this.placeKey==="wall"){if(!this.wallA){this.wallA={tx:this.place.tx,tz:this.place.tz},this.moveWall(this.place.tx+.5,this.place.tz+.5),Ei("order.work");return}e.issue({type:"wall",player:ye,ids:n,tiles:this.wallTiles.slice()}),Ei("place");const r=this.wallTiles[this.wallTiles.length-1];this.scene.ping(r%e.size+.5,Math.floor(r/e.size)+.5,"work"),this.setMode("normal"),this.hud.resetCard();return}e.issue({type:"build",player:ye,ids:n,key:this.placeKey,tx:this.place.tx,tz:this.place.tz}),Ei("place");const s=be[cn[this.placeKey]];this.scene.ping(this.place.tx+s.size/2,this.place.tz+s.size/2,"work"),t&&e.canAfford(ye,{wood:(s.cost.wood??0)*2,stone:(s.cost.stone??0)*2})?(this.place.ok=!1,this.scene.setGhost(this.placeKey,this.place.tx,this.place.tz,!1)):(this.setMode("normal"),this.hud.resetCard())}pause(){this.ended||(this.paused=!0,this.setMode("normal"),$n.showPause(Math.floor(this.world.tick/600),Ti))}resume(){this.paused=!1,$n.hide()}async save(){if(this.ended)return"fail";const t=Ua(this.world);return t?Js()?await ka(t)?"both":"localOnly":"local":"fail"}resize(){this.scene.resize(innerWidth,innerHeight)}frame(t){const e=this.world;if(!this.paused){this.acc+=t;let s=0;for(;this.acc>=Ho&&s<4;)e.step(),this.acc-=Ho,s++;s===4&&(this.acc=0)}const n=e.drain();if(n.length){this.scene.consume(n),this.hud.onEvents(n),this.snd.onEvents(n);for(const s of n)(s.t==="tree"||s.t==="res"&&e.resKind[s.k]===0)&&this.minimap.clearTile(s.k),s.t==="end"&&!this.ended&&this.end(s.result)}this.input.update(t);for(const s of[...this.sel])e.alive[s]||this.sel.delete(s);if(this.time+=t,this.scene.render(t,this.paused?1:this.acc/Ho,this.sel,this.time),this.minimap.update(t,this.scene.fogOn,innerWidth,innerHeight),this.hud.update(t),this.snd.update(t,this.paused),!this.paused&&!this.ended&&(this.saveT+=t)>300){this.saveT=0;const s=Ua(e);s&&ka(s)}if(Oa&&!this.paused&&(this.autoT+=t,this.autoN++,this.autoT>4)){Oa=!1;const s=this.autoN/this.autoT;s<40&&Ti<2&&(wd(Ti+1),this.scene.setQuality(Ti),this.hud.toast($("q.auto",{q:$(`q.${Da[Ti].key}`),fps:Math.round(s)})))}}end(t){this.ended=!0,_d(),Kx(),this.setMode("normal"),$n.showEnd(t,Math.floor(this.world.tick/600),this.world.players[ye].era)}dispose(){this.snd.dispose(),this.input.dispose(),this.hud.dispose(),this.scene.dispose()}}let De=null;const Cd={cont:async()=>{if(qi.fromCloud){const t=await Yx();let e=null;try{e=t?xd(t):null}catch{e=null}if(e&&t){Ox(t),Go(e);return}}const i=Hx();if(!i){_d(),wr();return}Go(i)},start:(i,t)=>Go(new Su(Fa("seed",Date.now()%1000000007>>>0),i+1,{humans:1,difficulty:t,testUnits:Math.min(600,Fa("units",0))})),resume:()=>De?.resume(),save:()=>De?.save()??Promise.resolve("fail"),quit:()=>{if(De&&!De.ended){const i=Ua(De.world);i&&ka(i)}lu()},quality:i=>{wd(i),Oa=!1,De?.scene.setQuality(i)},help:()=>{De?.resume(),De?.hud.openHelp()},watch:()=>$n.hide(),toMenu:()=>lu(),login:()=>{qx()},profile:()=>Xx()},$n=new Lx(Cd);function Go(i){De?.dispose(),De=new __(i),$n.hide();const t=De;window.__origines={world:i,scene:t.scene,input:t.input,game:t,screen:(e,n,s=.5)=>{const r=t.scene.camera.cam.position.clone().set(e,Xt(i.map,e,n)+s,n).project(t.scene.camera.cam);return[(r.x+1)/2*innerWidth,(1-r.y)/2*innerHeight,r.z<1?1:0]}}}function lu(){De?.dispose(),De=null,_t.setScene("menu"),He.menu(),Ar.setClearColor(1911332,1),Ar.clear(),wr()}let qi={meta:null,fromCloud:!1,account:null};async function wr(){if(qi={meta:Bx(),fromCloud:!1,account:Gx()},$n.showStart(qi),!Js())return;const i=await $x();if(!i||$n.kind!=="start")return;const t=qi.meta,e=jx(i);(!t||(e.savedAt??0)>(t.savedAt??0))&&(qi={...qi,meta:e,fromCloud:!0}),$n.updateStart(qi)}Vx(()=>{$n.kind==="start"&&wr()});addEventListener("resize",()=>{Ar.setSize(innerWidth,innerHeight,!1),De?.resize()});Ar.setSize(innerWidth,innerHeight,!1);let jl=performance.now();const Rd=()=>{if(De&&!De.ended){const i=Ua(De.world);i&&ka(i,!0)}};document.addEventListener("visibilitychange",()=>{jl=performance.now(),document.hidden&&Rd()});addEventListener("pagehide",Rd);let xa=0,Vo=0,Pd=!1;Xs.get("autostart")==="1"&&(window.__clock={manual:i=>{Pd=i},step:i=>De?.frame(i)});function Id(i){const t=Math.min(.1,(i-jl)/1e3);jl=i,De&&!Pd&&De.frame(t),Vo++,xa+=t,xa>1&&(window.__fps=Vo/xa,Vo=0,xa=0),requestAnimationFrame(Id)}requestAnimationFrame(Id);const Ld=Xs.get("sons")==="1"||location.hash==="#sons";_t.install();Ld||He.menu();document.addEventListener("click",i=>{const t=i.target?.closest?.("button");t&&t.closest("#hud, #menus")&&t.id!=="btn-som"&&t.id!=="btn-som-inicio"&&Ei(t.getAttribute("aria-disabled")==="true"?"ui.denied":"ui.click")},!0);window.__som={ids:x_,measure:v_,audio:_t,played:Kl,music:He};Ld?g_():Xs.get("autostart")==="1"?Cd.start(Math.min(3,Math.max(1,Fa("players",4)-1)),Math.min(2,Fa("difficulty",1))):(wr(),Wx().then(()=>{$n.kind==="start"&&wr()}));const Wo=document.getElementById("loading");Wo&&(Wo.style.opacity="0",setTimeout(()=>Wo.remove(),450));
