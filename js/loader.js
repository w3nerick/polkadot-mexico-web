(function() {
  // ── GRAIN (skip on mobile/low-end to save battery) ──
  const isMobile = window.innerWidth <= 768 || navigator.hardwareConcurrency <= 2;
  const GC = document.getElementById('pk-grain');
  if (!isMobile) {
    const GX = GC.getContext('2d');
    function resizeG() { GC.width = window.innerWidth; GC.height = window.innerHeight; }
    resizeG(); window.addEventListener('resize', resizeG);
    let lx = window.innerWidth*.5, ly = window.innerHeight*.5, tlx=lx, tly=ly;
    function newT() { tlx=window.innerWidth*(0.15+Math.random()*.7); tly=window.innerHeight*(0.15+Math.random()*.7); }
    newT();
    function grain() {
      const W=GC.width,H=GC.height;
      lx+=(tlx-lx)*.008; ly+=(tly-ly)*.008;
      if(Math.hypot(lx-tlx,ly-tly)<15) newT();
      const img=GX.createImageData(W,H),d=img.data;
      for(let y=0;y<H;y++) for(let x=0;x<W;x++){
        const i=(y*W+x)*4, dist=Math.hypot(x-lx,y-ly);
        const glow=Math.max(0,1-dist/(Math.min(W,H)*.55));
        const v=Math.min(255,Math.max(0,glow*60+((Math.random()*28|0)-14)));
        d[i]=d[i+1]=d[i+2]=v; d[i+3]=255;
      }
      GX.putImageData(img,0,0); requestAnimationFrame(grain);
    }
    requestAnimationFrame(grain);
  } else {
    // mobile: fondo estático oscuro, sin RAF costoso
    GC.style.background = 'radial-gradient(ellipse at 50% 40%, #1a1a1a 0%, #000 70%)';
  }

  // ── BOCAS ──
  const CNV = document.getElementById('pk-canvas');
  const ctx = CNV.getContext('2d');
  const SRC = document.getElementById('pk-img-color');
  const W=280, H=353;
  const DPR = window.devicePixelRatio||2;
  CNV.width=W*DPR; CNV.height=H*DPR;
  CNV.style.width=W+'px'; CNV.style.height=H+'px';
  ctx.scale(DPR,DPR);
  ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';

  const OVALS = [
    { label:'TOP',       pts:[{x:140,y:20},{x:157,y:23},{x:169,y:30},{x:174,y:40},{x:165,y:43},{x:140,y:42},{x:123,y:43},{x:107,y:42},{x:112,y:29},{x:126,y:22}] },
    { label:'TOP-RIGHT', pts:[{x:211,y:59},{x:225,y:62},{x:240,y:75},{x:249,y:93},{x:249,y:113},{x:242,y:120},{x:236,y:113},{x:229,y:97},{x:218,y:80},{x:209,y:68}] },
    { label:'BOT-RIGHT', pts:[{x:244,y:160},{x:250,y:173},{x:248,y:189},{x:240,y:205},{x:225,y:218},{x:208,y:219},{x:212,y:208},{x:225,y:189},{x:231,y:177},{x:237,y:165}] },
    { label:'BOTTOM',    pts:[{x:140,y:238},{x:153,y:238},{x:169,y:236},{x:174,y:243},{x:159,y:256},{x:133,y:259},{x:115,y:253},{x:106,y:242},{x:111,y:236},{x:129,y:238}] },
    { label:'BOT-LEFT',  pts:[{x:37,y:160},{x:44,y:167},{x:49,y:178},{x:56,y:192},{x:67,y:208},{x:72,y:218},{x:62,y:221},{x:44,y:210},{x:32,y:191},{x:30,y:171}] },
    { label:'TOP-LEFT',  pts:[{x:68,y:59},{x:72,y:66},{x:63,y:79},{x:53,y:94},{x:46,y:109},{x:39,y:120},{x:30,y:110},{x:34,y:85},{x:45,y:70},{x:60,y:60}] },
    { label:'MEXICO',    pts:[{x:142,y:288},{x:174,y:287},{x:203,y:288},{x:214,y:297},{x:227,y:306},{x:235,y:327},{x:217,y:350},{x:172,y:352},{x:157,y:350},{x:148,y:351},{x:138,y:352},{x:132,y:352},{x:122,y:352},{x:110,y:352},{x:83,y:352},{x:71,y:349},{x:46,y:340},{x:50,y:314},{x:66,y:292},{x:87,y:286}] },
  ];
  const ISX=4409/W, ISY=5558/H;
  OVALS.forEach(ov=>{
    const xs=ov.pts.map(p=>p.x), ys=ov.pts.map(p=>p.y), PAD=6;
    ov.bbx=Math.max(0,Math.min(...xs)-PAD); ov.bby=Math.max(0,Math.min(...ys)-PAD);
    ov.bbw=Math.min(W,Math.max(...xs)+PAD)-ov.bbx; ov.bbh=Math.min(H,Math.max(...ys)+PAD)-ov.bby;
  });

  function catmullPath(pts){
    const n=pts.length; ctx.beginPath(); ctx.moveTo(pts[0].x,pts[0].y);
    for(let i=0;i<n;i++){
      const p0=pts[(i-1+n)%n],p1=pts[i],p2=pts[(i+1)%n],p3=pts[(i+2)%n];
      ctx.bezierCurveTo(p1.x+(p2.x-p0.x)/6,p1.y+(p2.y-p0.y)/6,p2.x-(p3.x-p1.x)/6,p2.y-(p3.y-p1.y)/6,p2.x,p2.y);
    }
    ctx.closePath();
  }
  function drawOval(ov,alpha){
    if(alpha<=0.004) return;
    ctx.save(); ctx.globalAlpha=alpha;
    ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality='high';
    catmullPath(ov.pts); ctx.clip();
    ctx.drawImage(SRC,ov.bbx*ISX,ov.bby*ISY,ov.bbw*ISX,ov.bbh*ISY,ov.bbx,ov.bby,ov.bbw,ov.bbh);
    ctx.restore();
  }

  const BOCAS=OVALS.slice(0,6), MEXICO=OVALS[6];
  const CYCLE=2.2, WIN=0.55, SEG=1/BOCAS.length;
  let rafId=null;

  function draw(ts){
    ctx.clearRect(0,0,W,H);
    const phase=(ts/1000/CYCLE)%1;
    BOCAS.forEach((ov,i)=>{
      const op=(phase-i*SEG+2)%1; let a=0;
      if(op<WIN){ const t=op/WIN;
        if(t<0.15) a=t/0.15; else if(t<0.55) a=1; else a=1-Math.pow((t-0.55)/0.45,0.8);
      }
      drawOval(ov,a);
    });
    const mexA=0.3+0.7*Math.sin(((ts/1000/CYCLE)+0.08)*Math.PI);
    drawOval(MEXICO,Math.max(0,mexA));
    rafId=requestAnimationFrame(draw);
  }

  function hideLoader(){
    const el=document.getElementById('pk-loader');
    el.classList.add('hide');
    setTimeout(()=>{ cancelAnimationFrame(rafId); el.style.display='none'; document.body.style.background='#f5f2eb'; /* cream bg */ document.body.style.overflowY='auto'; },650);
  }

  // Bloquear scroll mientras dura el loader
  document.body.style.overflow='hidden';

  // Mínimo 4s de animación
  let hidden=false;
  function tryHide(){ if(!hidden){ hidden=true; hideLoader(); } }
  setTimeout(tryHide, 4000);
  window.addEventListener('load', ()=>{ setTimeout(tryHide, 4000); });

  SRC.onload = ()=>{ rafId=requestAnimationFrame(draw); };
  if(SRC.complete){ rafId=requestAnimationFrame(draw); }
})();
