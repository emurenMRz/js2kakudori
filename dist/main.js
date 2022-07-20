(()=>{"use strict";const t=17;class e{constructor(){const t=new Array(12);for(let e=0;e<t.length;++e){t[e]=new Array(21);for(let s=0;s<t[e].length;++s)t[e][s]=-2}this.grid=t}toJSON(){return{grid:this.grid}}isEmpty(t,e){return-1==this.grid[e][t]}setEmpty(t,e){return this.grid[e][t]=-1}getTileId(t,e){return this.grid[e+2][t+2]}init(e){if(e)this.grid=e.grid;else{for(let t=1;t<11;++t)for(let e=1;e<20;++e)this.grid[t][e]=-1;for(let e=0;e<4;++e)for(let e=0;e<34;++e){let s,i;do{s=Math.random()*t+2|0,i=8*Math.random()+2|0}while(-1!=this.grid[i][s]);this.grid[i][s]=e}}}findSimilarTiles(t,e){const s=this.grid[e][t];if(-1==s)return null;const i=[];for(let l=2;l<10;++l)for(let n=2;n<19;++n)n==t&&l==e||this.grid[l][n]!=s||i.push({x:n,y:l});return i}shuffle(){for(let e=2;e<10;++e)for(let s=2;s<19;++s)if(this.grid[e][s]>=0){let i,l;do{i=Math.random()*t+2|0,l=8*Math.random()+2|0}while(this.grid[l][i]<0||i==s&&l==e);const n=this.grid[e][s];this.grid[e][s]=this.grid[l][i],this.grid[l][i]=n}}tileRemains(){for(let t=2;t<10;++t)for(let e=2;e<19;++e)if(this.grid[t][e]>=0)return!0;return!1}tileMap(){const t={};for(let e=2;e<10;++e)for(let s=2;s<19;++s){const i=this.grid[e][s];i>=0&&(t[i]?t[i].push({x:s,y:e}):t[i]=[{x:s,y:e}])}return t}tileImage(t,e){const s=void 0===e?t:this.grid[e+2][t+2];return"images/tile/"+"mpsj"[s/9|0]+(s%9+1|0)+".png"}}class s{constructor(){this.context=null,this.centerX=0,this.centerY=0,this.gridWidth=0,this.gridHeight=0}init(t,e,s,i,l,n,a){const o=document.getElementById("connect");o&&o.getContext&&(o.width=0|t,o.height=0|e,this.context=o.getContext("2d"),this.context.strokeStyle="rgba(0, 255, 0, 0.5)",this.context.lineWidth=a,this.centerX=s,this.centerY=i,this.gridWidth=l,this.gridHeight=n)}clear(){document.getElementById("connect").style.display="none";const t=this.context;t&&t.clearRect(0,0,t.canvas.width,t.canvas.height)}draw(t){const e=this.context;if(!e)return;const s=this.centerX,i=this.centerY,l=this.gridWidth,n=this.gridHeight;e.beginPath(),e.moveTo((t[0][0]-2)*l+s+l/2,(t[0][1]-2)*n+i+n/2);for(let a=1;a<t.length;++a)e.lineTo((t[a][0]-2)*l+s+l/2,(t[a][1]-2)*n+i+n/2);e.stroke(),document.getElementById("connect").style.display="block"}}class i{constructor(t,e,s,i){this.id=t;const l=document.getElementById(this.id);if(l.className="button",l.style.backgroundImage=`url("images/${this.id}.png")`,i&&l.addEventListener("click",i),s){const t=document.createElement("span");t.className="cost-frame",t.textContent=s,l.appendChild(t)}this.resize(e)}resize(t){const e=document.getElementById(this.id);e.style.width=160*t+"px",e.style.height=92*t+"px",e.hasChildNodes()&&(e.childNodes[0].style.fontSize=32*t+"px")}enable(t){const e=document.getElementById(this.id);t?e.classList.remove("disable"):e.classList.add("disable")}}class l{constructor(){const t=document.getElementById("message");for(let e=0;e<4;++e){const s=document.createElement("img");s.className="character",s.src=`images/gameover${e+1}.png`,t.appendChild(s)}this.beginTime=0,this.maxWidth=160,this.maxHeight=160}init(){const t=document.getElementById("base"),e=t.clientWidth,s=t.clientHeight/2-this.maxHeight/2,i=this.maxHeight,l=document.getElementById("message");for(let t=0;t<l.childNodes.length;++t){const n=l.childNodes[t];n.dataset.x=e/2+(t-2)*this.maxWidth+this.maxWidth/2,n.style.left=`${n.dataset.x}px`,n.style.top=`${s}px`,n.style.width="0px",n.style.height=`${i}px`}l.style.display="block",this.beginTime=Date.now(),setTimeout((()=>this.update()),16)}clear(){document.getElementById("message").style.display="none"}update(){const t=document.getElementById("message"),e=Date.now()-this.beginTime;for(let s=0;s<t.childNodes.length;++s){const i=t.childNodes[s],l=e-300*s;if(l>=0){const t=l<1e3?l/1e3*this.maxWidth:this.maxWidth,e=0|i.dataset.x;i.style.left=e-t/2+"px",i.style.width=`${t}px`}}e<1900&&setTimeout((()=>this.update()),16)}resize(t){this.ratio=t,this.maxWidth=160*t,this.maxHeight=160*t;const e=Date.now()-this.beginTime,s=document.getElementById("base"),i=s.clientWidth,l=s.clientHeight/2-this.maxHeight/2,n=this.maxHeight,a=document.getElementById("message");for(let t=0;t<a.childNodes.length;++t){const s=a.childNodes[t],o=e-300*t;if(o>=0){s.dataset.x=i/2+(t-2)*this.maxWidth+this.maxWidth/2;const e=o<1e3?o/1e3*this.maxWidth:this.maxWidth,a=0|s.dataset.x;s.style.left=a-e/2+"px",s.style.top=`${l}px`,s.style.width=`${e}px`,s.style.height=`${n}px`}}}}class n{constructor(){this.score=0,this.resize(1),this.update()}toJSON(){return{score:this.score}}restore(t){this.score=t.score,this.update()}init(){this.score=0,this.update()}add(t){this.score+=t,this.update()}resize(t){document.getElementById("score").style.fontSize=32*t+"px"}update(){document.getElementById("score").textContent=`得点: ${this.score}`}}class a{constructor(){this.restOfBalls=10,this.ballWidth=32,this.ballHeight=32}toJSON(){return{restOfBalls:this.restOfBalls}}init(t,e){this.restOfBalls=e?e.restOfBalls:10,void 0!==t&&(this.ballWidth=32*t,this.ballHeight=32*t);const s=document.getElementById("basket"),i=s.parentElement.clientWidth>s.parentElement.clientHeight;s.textContent="",s.style.width=i?"auto":`${Math.ceil(5*this.ballWidth)}px`,s.style.height=i?`${this.ballHeight}px`:"auto",this.addAnime(this.restOfBalls)}resize(t){this.ballWidth=32*t,this.ballHeight=32*t;const e=document.getElementById("basket"),s=e.parentElement.clientWidth>e.parentElement.clientHeight;e.style.width=s?"auto":`${Math.ceil(5*this.ballWidth)}px`,e.style.height=s?`${this.ballHeight}px`:"auto";for(let t=0;t<e.childNodes.length;++t){const s=e.childNodes[t];s.style.width=`${this.ballWidth}px`,s.style.height=`${this.ballHeight}px`}}add(t){t=Math.abs(t),this.restOfBalls+=t,this.addAnime(t)}remove(t){if((t=Math.abs(t))>this.restOfBalls)return!1;const e=this.restOfBalls;this.restOfBalls-=t;const s=document.getElementById("basket");for(let t=e-1;t>=this.restOfBalls;--t)s.childNodes[t].classList.add("eliminate");return!0}addAnime(t,e){if(e&&e.classList.remove("brightly"),t<=0)return;const s=document.getElementById("basket");let i=s.childNodes.length?s.childNodes[this.restOfBalls-t]:null;if(i&&i.classList.contains("eliminate"))i.classList.remove("eliminate"),i.classList.add("brightly"),i.style.width=`${this.ballWidth}px`,i.style.height=`${this.ballHeight}px`;else{const t=document.createElement("span");t.className="ball brightly",t.style.width=`${this.ballWidth}px`,t.style.height=`${this.ballHeight}px`,document.getElementById("basket").appendChild(t),i=t}setTimeout((()=>this.addAnime(t-1,i)),50)}}!function(){let o,r,d=1,c=64,h=86,g=64,u=104,m=24,y=16;let f=0,p=0,x=!1;const b=new e,E=new s,B=[],T=new l,I=new n,$=new a;function w(t,e){const s=t/1280,i=e/800;return s<i?s:i}function W(e,s){return d=w(e,s),c=64*d,h=86*d,g=64*d,u=104*d,m=24*d,y=16*d,o=e/2-c*t/2,r=s/2-8*h/2,d}function k(t,e){return`grid${t}-${e}`}function H(t,e){return document.getElementById(k(t,e))}const v=new class{constructor(){this.selectedTile=null}get isEmpty(){return null==this.selectedTile}get gridId(){return this.selectedTile.id}get tileType(){return this.selectedTile.dataset.tileType}get gridX(){return 0|this.selectedTile.dataset.gx}get gridY(){return 0|this.selectedTile.dataset.gy}detach(){const t=this.selectedTile;return this.selectedTile=null,t}set(t){E.clear();const e=this.selectedTile;e&&(e.style.top=`${((0|e.dataset.gy)-2)*h+r}px`),t.style.top=((0|t.dataset.gy)-2)*h+r-y+"px",this.selectedTile=t}clear(){E.clear();const t=this.selectedTile;t&&(t.style.top=`${((0|t.dataset.gy)-2)*h+r}px`),this.selectedTile=null}};function N(){B[1].enable($.restOfBalls>=1),B[2].enable($.restOfBalls>=5)}const O=function(){const t=new Array(12);for(let e=0;e<t.length;++e)t[e]=new Array(21);const e=[0,1,0,-1],s=[-1,0,1,0],i=(i,l,n,a)=>{for(;i+=e[n],!t[l+=s[n]][i];)a&&(t[l][i]=1);return t[l][i]>0?[[i,l]]:null},l=(l,n,a)=>{for(;l+=e[a],!t[n+=s[a]][l];){t[n][l]=1;let e=(a+1)%4,s=i(l,n,e,!1);if(s)return s.concat([[l,n]]);if(e=(e+2)%4,s=i(l,n,e,!1),s)return s.concat([[l,n]])}return t[n][l]>0?[[l,n]]:null};return function(e,s,n,a){for(let e=0;e<t.length;++e)for(let s=0;s<t[e].length;++s)t[e][s]=b.isEmpty(s,e)?0:-1;t[s][e]=1,t[a][n]=1;const o=[[e,s]];let r=null;if(null!=(r=i(e,s,0,!0))||null!=(r=i(e,s,1,!0))||null!=(r=i(e,s,2,!0))||null!=(r=i(e,s,3,!0)))return o.concat(r);const d=n-e,c=a-s;let h,g,u,m;return Math.abs(d)>=Math.abs(c)?(d>=0?(h=3,m=1):(h=1,m=3),c>=0?(g=0,u=2):(g=2,u=0)):(c>=0?(h=0,m=2):(h=2,m=0),d>=0?(g=3,u=1):(g=1,u=3)),null!=(r=l(n,a,h))||null!=(r=l(n,a,g))||null!=(r=l(n,a,u))||null!=(r=l(n,a,m))?o.concat(r).concat([[n,a]]):null}}();function S(){for(let t=2;t<10;++t)for(let e=2;e<19;++e){const s=b.findSimilarTiles(e,t);if(s)for(let i=0;i<s.length;++i){const l=O(e,t,s[i].x,s[i].y);if(l)return{pair:[{x:e,y:t},s[i]],line:l}}}return null}function z(t){const e=[];let s=!1;for(const i in t){const l=t[i];for(let t=0;t<l.length-1;++t)for(let i=t+1;i<l.length;++i){const n=O(l[t].x,l[t].y,l[i].x,l[i].y);n?e.push({pair:[l[t],l[i]],line:n}):s=!0}}return{canTaken:e,canAllTaken:!s}}function L(t){if(!t||x)return;x=!0;const e=t.pair,s=t.line,i=H(e[0].x-2,e[0].y-2),l=H(e[1].x-2,e[1].y-2);i.style.top=((0|i.dataset.gy)-2)*h+r-y+"px",l.style.top=((0|l.dataset.gy)-2)*h+r-y+"px",E.draw(s),setTimeout((()=>A(i,l,y)),16)}function M(e){v.clear(),b.init(e?.grid);for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=H(s,e);t&&(t.dataset.tileType=b.getTileId(s,e),t.style.top=`${e*h+r}px`,t.style.display="inline",t.style.opacity=1,t.style.backgroundImage=`url("${b.tileImage(s,e)}")`)}$.add(p),N(),p=0,f=void 0!==e?.gamePhase?e.gamePhase:1}function A(t,e,s){if(s>0){let i=y-s;i*=i,i+=y;const l=t=>{const e=0|t.dataset.gy;t.style.top=(e-2)*h+r-i+"px",t.style.opacity=s/y};return l(t),l(e),--s,void setTimeout((()=>A(t,e,s)),16)}const i=t=>{b.setEmpty(t.dataset.gx,t.dataset.gy),t.dataset.tileType=-1,t.style.display="none"};i(t),i(e),x=!1,E.clear(),function(){const t=b.tileMap();let e=0;for(const s in t)e+=t[s].length;if(!e)return f=3,void M();const s=z(t);s.canTaken.length?s.canAllTaken&&(f=4,++p,I.add(p),L(s.canTaken[0])):(S()&&alert("checkRestOfTile: tile remains."),f=2,T.init())}()}function C(){T.clear(),I.init(),$.init(),M()}function D(){if(!$.remove(1))return;N();const t=z(b.tileMap());for(let e=0;e<t.canTaken.length;++e){const s=t.canTaken[e].pair;H(s[0].x-2,s[0].y-2).classList.add("hint"),H(s[1].x-2,s[1].y-2).classList.add("hint")}v.clear()}function J(){$.remove(5)&&(N(),T.clear(),function(){v.clear(),b.shuffle();for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=H(s,e);t&&(t.dataset.tileType=b.getTileId(s,e),t.style.top=`${e*h+r}px`,t.style.opacity=1,t.style.backgroundImage=`url("${b.tileImage(s,e)}")`)}}(),f=1)}addEventListener("load",(()=>{const e={gamePhase:1,bonusScore:0,grid:void 0,scoreBoard:0,basket:0},s=localStorage.getItem("gameData");s&&(Object.assign(e,JSON.parse(s)),localStorage.clear()),p=e.bonusScore,I.restore(e.scoreBoard);const l=document.getElementById("base"),n=w(l.clientWidth,l.clientHeight);document.getElementById("control-box").style.padding=`${96*n}px 0 ${48*n}px`,I.resize(n),B.push(new i("reset",n,0,C)),B.push(new i("hint",n,1,D)),B.push(new i("shuffle",n,5,J)),$.init(n,e.basket),T.resize(n);const a=document.getElementById("mat"),d=a.clientWidth,x=a.clientHeight;W(d,x),E.init(d,x,o,r,c,h,m);const N=function(){if(1==f&&-1!=this.dataset.tileType)if(v.isEmpty)v.set(this);else if(this.id==v.gridId)v.clear();else if(this.dataset.tileType===v.tileType){const e=O(v.gridX,v.gridY,0|this.dataset.gx,0|this.dataset.gy);if(e){const s=v.detach(),i=this;i.style.top=((0|i.dataset.gy)-2)*h+r-y+"px",I.add(1),E.draw(e),setTimeout((()=>A(s,i,y)),16);for(let e=0;e<8;++e)for(let s=0;s<t;++s)H(s,e).classList.remove("hint")}}else v.set(this)},S=document.getElementById("connect");for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=document.createElement("div");t.id=k(s,e),t.className="tile",t.dataset.gx=s+2,t.dataset.gy=e+2,t.dataset.tileType=-1,t.style.width=`${g}px`,t.style.height=`${u}px`,t.style.left=`${s*c+o}px`,t.style.top=`${e*h+r}px`,t.style.backgroundImage=`url("${b.tileImage(0)}")`,t.onclick=N,a.insertBefore(t,S)}M(e),2==f&&T.init()})),addEventListener("resize",(()=>{const e=document.getElementById("base"),s=w(e.clientWidth,e.clientHeight);document.getElementById("control-box").style.padding=`${96*s}px 0 ${48*s}px`,I.resize(s);for(let t=0;t<B.length;++t)B[t].resize(s);$.resize(s),T.resize(s);const i=document.getElementById("mat"),l=i.clientWidth,n=i.clientHeight;W(l,n),E.init(l,n,o,r,c,h,m),v.clear();for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=H(s,e);t.style.width=`${g}px`,t.style.height=`${u}px`,t.style.left=`${s*c+o}px`,t.style.top=`${e*h+r}px`}})),addEventListener("keydown",(t=>{"c"==t.key&&1==f&&(console.log("[chart] auto take."),L(S()))})),addEventListener("unload",(()=>{localStorage.setItem("gameData",JSON.stringify({gamePhase:f,bonusScore:p,grid:b,scoreBoard:I,basket:$}))}))}()})();