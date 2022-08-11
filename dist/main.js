(()=>{"use strict";const t=17;class e{constructor(){const t=new Array(12);for(let e=0;e<t.length;++e){t[e]=new Array(21);for(let s=0;s<t[e].length;++s)t[e][s]=-2}this.grid=t}toJSON(){return{grid:this.grid}}isEmpty(t,e){return-1==this.grid[e][t]}setEmpty(t,e){return this.grid[e][t]=-1}getTileId(t,e){return this.grid[e+2][t+2]}init(e){if(e&&void 0!==e.grid)this.grid=e.grid;else{for(let t=1;t<11;++t)for(let e=1;e<20;++e)this.grid[t][e]=-1;for(let e=0;e<4;++e)for(let e=0;e<34;++e){let s,i;do{s=Math.random()*t+2|0,i=8*Math.random()+2|0}while(-1!=this.grid[i][s]);this.grid[i][s]=e}}}findSimilarTiles(t,e){const s=this.grid[e][t];if(-1==s)return null;const i=[];for(let l=2;l<10;++l)for(let n=2;n<19;++n)n==t&&l==e||this.grid[l][n]!=s||i.push({x:n,y:l});return i}shuffle(){for(let e=2;e<10;++e)for(let s=2;s<19;++s)if(this.grid[e][s]>=0){let i,l;do{i=Math.random()*t+2|0,l=8*Math.random()+2|0}while(this.grid[l][i]<0||i==s&&l==e);const n=this.grid[e][s];this.grid[e][s]=this.grid[l][i],this.grid[l][i]=n}}tileRemains(){for(let t=2;t<10;++t)for(let e=2;e<19;++e)if(this.grid[t][e]>=0)return!0;return!1}tileMap(){const t={};for(let e=2;e<10;++e)for(let s=2;s<19;++s){const i=this.grid[e][s];i>=0&&(t[i]?t[i].push({x:s,y:e}):t[i]=[{x:s,y:e}])}return t}tileImage(t,e){const s=void 0===e?t:this.grid[e+2][t+2];return"images/tile/"+"mpsj"[s/9|0]+(s%9+1|0)+".png"}}class s{constructor(){this.context=null,this.centerX=0,this.centerY=0,this.gridWidth=0,this.gridHeight=0}init(t,e,s,i,l,n,a){const o=document.getElementById("connect");o&&o.getContext&&(o.width=0|t,o.height=0|e,this.context=o.getContext("2d"),this.context.strokeStyle="rgba(0, 255, 0, 0.5)",this.context.lineWidth=a,this.centerX=s,this.centerY=i,this.gridWidth=l,this.gridHeight=n)}clear(){document.getElementById("connect").style.display="none";const t=this.context;t&&t.clearRect(0,0,t.canvas.width,t.canvas.height)}draw(t){const e=this.context;if(!e)return;const s=this.centerX,i=this.centerY,l=this.gridWidth,n=this.gridHeight;e.beginPath(),e.moveTo((t[0][0]-2)*l+s+l/2,(t[0][1]-2)*n+i+n/2);for(let a=1;a<t.length;++a)e.lineTo((t[a][0]-2)*l+s+l/2,(t[a][1]-2)*n+i+n/2);e.stroke(),document.getElementById("connect").style.display="block"}}class i{constructor(t,e,s,i){this.id=t;const l=document.getElementById(this.id);if(l.className="button",l.style.backgroundImage=`url("images/${this.id}.png")`,i&&l.addEventListener("click",i),s){const t=document.createElement("span");t.className="cost-frame",t.textContent=s,l.appendChild(t)}this.resize(e)}resize(t){const e=document.getElementById(this.id);e.style.width=160*t+"px",e.style.height=92*t+"px",e.hasChildNodes()&&(e.childNodes[0].style.fontSize=32*t+"px")}enable(t){const e=document.getElementById(this.id);t?e.classList.remove("disable"):e.classList.add("disable")}}class l{#t=160;#e=64;constructor(t,e,s){this.id=t;const i=document.getElementById(this.id);i.style.backgroundImage='url("images/swap.png")',i.addEventListener("click",s),this.resize(e)}resize(t){const e=document.getElementById(this.id);e.style.width=this.#t*t+"px",e.style.height=this.#e*t+"px"}}class n{constructor(){const t=document.getElementById("message");for(let e=0;e<4;++e){const s=document.createElement("img");s.className="character",s.src=`images/gameover${e+1}.png`,t.appendChild(s)}this.beginTime=0,this.maxWidth=160,this.maxHeight=160}init(){const t=document.getElementById("base"),e=t.clientWidth,s=t.clientHeight/2-this.maxHeight/2,i=this.maxHeight,l=document.getElementById("message");for(let t=0;t<l.childNodes.length;++t){const n=l.childNodes[t];n.dataset.x=e/2+(t-2)*this.maxWidth+this.maxWidth/2,n.style.left=`${n.dataset.x}px`,n.style.top=`${s}px`,n.style.width="0px",n.style.height=`${i}px`}l.style.display="block",this.beginTime=Date.now(),setTimeout((()=>this.update()),16)}clear(){document.getElementById("message").style.display="none"}update(){const t=document.getElementById("message"),e=Date.now()-this.beginTime;for(let s=0;s<t.childNodes.length;++s){const i=t.childNodes[s],l=e-300*s;if(l>=0){const t=l<1e3?l/1e3*this.maxWidth:this.maxWidth,e=0|i.dataset.x;i.style.left=e-t/2+"px",i.style.width=`${t}px`}}e<1900&&setTimeout((()=>this.update()),16)}resize(t){this.ratio=t,this.maxWidth=160*t,this.maxHeight=160*t;const e=Date.now()-this.beginTime,s=document.getElementById("base"),i=s.clientWidth,l=s.clientHeight/2-this.maxHeight/2,n=this.maxHeight,a=document.getElementById("message");for(let t=0;t<a.childNodes.length;++t){const s=a.childNodes[t],o=e-300*t;if(o>=0){s.dataset.x=i/2+(t-2)*this.maxWidth+this.maxWidth/2;const e=o<1e3?o/1e3*this.maxWidth:this.maxWidth,a=0|s.dataset.x;s.style.left=a-e/2+"px",s.style.top=`${l}px`,s.style.width=`${e}px`,s.style.height=`${n}px`}}}}class a{constructor(){this.score=0,this.resize(1),this.update()}toJSON(){return{score:this.score}}restore(t){this.score=t.score,this.update()}get initValue(){return{score:0}}init(){this.score=0,this.update()}add(t){this.score+=t,this.update()}resize(t){document.getElementById("score").style.fontSize=32*t+"px"}update(){document.getElementById("score").textContent=`得点: ${this.score}`}}class o{constructor(){this.restOfBalls=10,this.ballWidth=32,this.ballHeight=32}toJSON(){return{restOfBalls:this.restOfBalls}}get initValue(){return{restOfBalls:10}}init(t,e){this.restOfBalls=e?e.restOfBalls:10,void 0!==t&&(this.ballWidth=32*t,this.ballHeight=32*t);const s=document.getElementById("basket"),i=s.parentElement.clientWidth>s.parentElement.clientHeight;s.textContent="",s.style.width=i?"auto":`${Math.ceil(5*this.ballWidth)}px`,s.style.height=i?`${this.ballHeight}px`:"auto",this.addAnime(this.restOfBalls)}resize(t){this.ballWidth=32*t,this.ballHeight=32*t;const e=document.getElementById("basket"),s=e.parentElement.clientWidth>e.parentElement.clientHeight;e.style.width=s?"auto":`${Math.ceil(5*this.ballWidth)}px`,e.style.height=s?`${this.ballHeight}px`:"auto";for(let t=0;t<e.childNodes.length;++t){const s=e.childNodes[t];s.style.width=`${this.ballWidth}px`,s.style.height=`${this.ballHeight}px`}}add(t){t=Math.abs(t),this.restOfBalls+=t,this.addAnime(t)}remove(t){if((t=Math.abs(t))>this.restOfBalls)return!1;const e=this.restOfBalls;this.restOfBalls-=t;const s=document.getElementById("basket");for(let t=e-1;t>=this.restOfBalls;--t)s.childNodes[t].classList.add("eliminate");return!0}addAnime(t,e){if(e&&e.classList.remove("brightly"),t<=0)return;const s=document.getElementById("basket");let i=s.childNodes.length?s.childNodes[this.restOfBalls-t]:null;if(i&&i.classList.contains("eliminate"))i.classList.remove("eliminate"),i.classList.add("brightly"),i.style.width=`${this.ballWidth}px`,i.style.height=`${this.ballHeight}px`;else{const t=document.createElement("span");t.className="ball brightly",t.style.width=`${this.ballWidth}px`,t.style.height=`${this.ballHeight}px`,document.getElementById("basket").appendChild(t),i=t}setTimeout((()=>this.addAnime(t-1,i)),50)}}!function(){let r,c,d=1,h=64,g=86,u=64,m=104,y=24,p=16;let f=0,x=0,b="L-status",I=!1;const B=new e,E=new s,T=[],w=new n,$=new a,k=new o;function W(t,e){const s=t/1280,i=e/800;return s<i?s:i}function N(e,s){return d=W(e,s),h=64*d,g=86*d,u=64*d,m=104*d,y=24*d,p=16*d,r=e/2-h*t/2,c=s/2-8*g/2,d}function S(t,e){return`grid${t}-${e}`}function L(t,e){return document.getElementById(S(t,e))}const O=new class{constructor(){this.selectedTile=null}get isEmpty(){return null==this.selectedTile}get gridId(){return this.selectedTile.id}get tileType(){return this.selectedTile.dataset.tileType}get gridX(){return 0|this.selectedTile.dataset.gx}get gridY(){return 0|this.selectedTile.dataset.gy}detach(){const t=this.selectedTile;return this.selectedTile=null,t}set(t){E.clear();const e=this.selectedTile;e&&(e.style.top=`${((0|e.dataset.gy)-2)*g+c}px`),t.style.top=((0|t.dataset.gy)-2)*g+c-p+"px",this.selectedTile=t}clear(){E.clear();const t=this.selectedTile;t&&(t.style.top=`${((0|t.dataset.gy)-2)*g+c}px`),this.selectedTile=null}};function v(){T[1].enable(k.restOfBalls>=1),T[2].enable(k.restOfBalls>=5)}const H=function(){const t=new Array(12);for(let e=0;e<t.length;++e)t[e]=new Array(21);const e=[0,1,0,-1],s=[-1,0,1,0],i=(i,l,n,a)=>{for(;i+=e[n],!t[l+=s[n]][i];)a&&(t[l][i]=1);return t[l][i]>0?[[i,l]]:null},l=(l,n,a)=>{for(;l+=e[a],!t[n+=s[a]][l];){t[n][l]=1;let e=(a+1)%4,s=i(l,n,e,!1);if(s)return s.concat([[l,n]]);if(e=(e+2)%4,s=i(l,n,e,!1),s)return s.concat([[l,n]])}return t[n][l]>0?[[l,n]]:null};return function(e,s,n,a){for(let e=0;e<t.length;++e)for(let s=0;s<t[e].length;++s)t[e][s]=B.isEmpty(s,e)?0:-1;t[s][e]=1,t[a][n]=1;const o=[[e,s]];let r=null;if(null!=(r=i(e,s,0,!0))||null!=(r=i(e,s,1,!0))||null!=(r=i(e,s,2,!0))||null!=(r=i(e,s,3,!0)))return o.concat(r);const c=n-e,d=a-s;let h,g,u,m;return Math.abs(c)>=Math.abs(d)?(c>=0?(h=3,m=1):(h=1,m=3),d>=0?(g=0,u=2):(g=2,u=0)):(d>=0?(h=0,m=2):(h=2,m=0),c>=0?(g=3,u=1):(g=1,u=3)),null!=(r=l(n,a,h))||null!=(r=l(n,a,g))||null!=(r=l(n,a,u))||null!=(r=l(n,a,m))?o.concat(r).concat([[n,a]]):null}}();function z(){for(let t=2;t<10;++t)for(let e=2;e<19;++e){const s=B.findSimilarTiles(e,t);if(s)for(let i=0;i<s.length;++i){const l=H(e,t,s[i].x,s[i].y);if(l)return{pair:[{x:e,y:t},s[i]],line:l}}}return null}function M(t){const e=[];let s=!1;for(const i in t){const l=t[i];for(let t=0;t<l.length-1;++t)for(let i=t+1;i<l.length;++i){const n=H(l[t].x,l[t].y,l[i].x,l[i].y);n?e.push({pair:[l[t],l[i]],line:n}):s=!0}}return{canTaken:e,canAllTaken:!s}}function A(t){if(!t||I)return;I=!0;const e=t.pair,s=t.line,i=L(e[0].x-2,e[0].y-2),l=L(e[1].x-2,e[1].y-2);i.style.top=((0|i.dataset.gy)-2)*g+c-p+"px",l.style.top=((0|l.dataset.gy)-2)*g+c-p+"px",E.draw(s),setTimeout((()=>C(i,l,p)),16)}function J(e){O.clear(),B.init(e?.grid);for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=L(s,e);t&&(t.dataset.tileType=B.getTileId(s,e),t.style.top=`${e*g+c}px`,t.style.display="inline",t.style.opacity=1,t.style.backgroundImage=`url("${B.tileImage(s,e)}")`)}k.add(x),v(),x=0,f=void 0!==e?.gamePhase?e.gamePhase:1}function C(t,e,s){if(s>0){let i=p-s;i*=i,i+=p;const l=t=>{const e=0|t.dataset.gy;t.style.top=(e-2)*g+c-i+"px",t.style.opacity=s/p};return l(t),l(e),--s,void setTimeout((()=>C(t,e,s)),16)}const i=t=>{B.setEmpty(t.dataset.gx,t.dataset.gy),t.dataset.tileType=-1,t.style.display="none"};i(t),i(e),I=!1,E.clear(),function(){const t=B.tileMap();let e=0;for(const s in t)e+=t[s].length;if(!e)return f=3,void J();const s=M(t);s.canTaken.length?s.canAllTaken&&(f=4,++x,$.add(x),A(s.canTaken[0])):(z()&&alert("checkRestOfTile: tile remains."),f=2,w.init())}()}function P(){w.clear(),$.init(),k.init(),J()}function R(){if(!k.remove(1))return;v();const t=M(B.tileMap());for(let e=0;e<t.canTaken.length;++e){const s=t.canTaken[e].pair;L(s[0].x-2,s[0].y-2).classList.add("hint"),L(s[1].x-2,s[1].y-2).classList.add("hint")}O.clear()}function X(){k.remove(5)&&(v(),w.clear(),function(){O.clear(),B.shuffle();for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=L(s,e);t&&(t.dataset.tileType=B.getTileId(s,e),t.style.top=`${e*g+c}px`,t.style.opacity=1,t.style.backgroundImage=`url("${B.tileImage(s,e)}")`)}}(),f=1)}function Y(){const t=document.getElementById("basic-layout");t.classList.contains("L-status")?(t.classList.replace("L-status","R-status"),b="R-status"):(t.classList.replace("R-status","L-status"),b="L-status")}addEventListener("load",(()=>{const e=(t,e)=>{const s=localStorage.getItem(t);return null!==s?JSON.parse(s):e},s={gamePhase:e("gamePhase",1),bonusScore:e("bonusScore",0),grid:e("grid",void 0),scoreBoard:e("scoreBoard",$.initValue),basket:e("basket",k.initValue),layout:e("layout","L-status")};localStorage.clear(),x=s.bonusScore,b=s.layout,$.restore(s.scoreBoard);const n=document.getElementById("base"),a=W(n.clientWidth,n.clientHeight);document.getElementById("control-box").style.padding=`${96*a}px 0 ${48*a}px`,$.resize(a),T.push(new i("reset",a,0,P)),T.push(new i("hint",a,1,R)),T.push(new i("shuffle",a,5,X)),T.push(new l("swap",a,Y)),k.init(a,s.basket),w.resize(a),document.getElementById("basic-layout").classList.add(b);const o=document.getElementById("mat"),d=o.clientWidth,I=o.clientHeight;N(d,I),E.init(d,I,r,c,h,g,y);const v=function(){if(1==f&&-1!=this.dataset.tileType)if(O.isEmpty)O.set(this);else if(this.id==O.gridId)O.clear();else if(this.dataset.tileType===O.tileType){const e=H(O.gridX,O.gridY,0|this.dataset.gx,0|this.dataset.gy);if(e){const s=O.detach(),i=this;i.style.top=((0|i.dataset.gy)-2)*g+c-p+"px",$.add(1),E.draw(e),setTimeout((()=>C(s,i,p)),16);for(let e=0;e<8;++e)for(let s=0;s<t;++s)L(s,e).classList.remove("hint")}}else O.set(this)},z=document.getElementById("connect");for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=document.createElement("div");t.id=S(s,e),t.className="tile",t.dataset.gx=s+2,t.dataset.gy=e+2,t.dataset.tileType=-1,t.style.width=`${u}px`,t.style.height=`${m}px`,t.style.left=`${s*h+r}px`,t.style.top=`${e*g+c}px`,t.style.backgroundImage=`url("${B.tileImage(0)}")`,t.onclick=v,o.insertBefore(t,z)}J(s),2==f&&w.init()})),addEventListener("resize",(()=>{const e=document.getElementById("base"),s=W(e.clientWidth,e.clientHeight);document.getElementById("control-box").style.padding=`${96*s}px 0 ${48*s}px`,$.resize(s);for(let t=0;t<T.length;++t)T[t].resize(s);k.resize(s),w.resize(s);const i=document.getElementById("mat"),l=i.clientWidth,n=i.clientHeight;N(l,n),E.init(l,n,r,c,h,g,y),O.clear();for(let e=0;e<8;++e)for(let s=0;s<t;++s){const t=L(s,e);t.style.width=`${u}px`,t.style.height=`${m}px`,t.style.left=`${s*h+r}px`,t.style.top=`${e*g+c}px`}})),addEventListener("keydown",(t=>{"c"==t.key&&1==f&&(console.log("[chart] auto take."),A(z()))})),addEventListener("unload",(()=>{localStorage.setItem("gamePhase",JSON.stringify(f)),localStorage.setItem("bonusScore",JSON.stringify(x)),localStorage.setItem("grid",JSON.stringify(B)),localStorage.setItem("scoreBoard",JSON.stringify($)),localStorage.setItem("basket",JSON.stringify(k)),localStorage.setItem("layout",JSON.stringify(b))}))}()})();