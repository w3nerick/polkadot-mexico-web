function toggleMenu() { document.getElementById('navlinks').classList.toggle('open'); }
document.querySelectorAll('#navlinks a').forEach(a => a.addEventListener('click', () => document.getElementById('navlinks').classList.remove('open')));

let currentG = 'satellite';
function goAlbum(id) {
  showPage('galeria');
  const btn = document.querySelector('.g-tab[onclick*="\'' + id + '\'"]');
  if (btn) switchG(id, btn);
}
function switchG(id, btn) {
  document.querySelectorAll('.g-tab').forEach(t => t.classList.remove('on'));
  btn.classList.add('on');
  // centra la pestaña activa en la tira (mobile: scroll horizontal)
  const strip = btn.parentElement;
  if (strip.scrollWidth > strip.clientWidth) {
    const left = btn.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    strip.scrollTo({ left: left - (strip.clientWidth - btn.offsetWidth) / 2, behavior: 'smooth' });
  }
  document.querySelectorAll('.photo-grid').forEach(g => g.classList.remove('on'));
  document.getElementById('gallery-' + id).classList.add('on');
  currentG = id;
}

let currentIdx = 0;
const gData = {
  satellite: [
    'assets/images/satellite-2023/01.jpg','assets/images/satellite-2023/02.jpg',
    'assets/images/satellite-2023/03.jpg','assets/images/satellite-2023/04.jpg',
    'assets/images/satellite-2023/05.jpg','assets/images/satellite-2023/06.jpg',
    'assets/images/satellite-2023/07.jpg','assets/images/satellite-2023/08.jpg',
    'assets/images/satellite-2023/09.jpg','assets/images/satellite-2023/10.jpg',
    'assets/images/satellite-2023/11.jpg','assets/images/satellite-2023/12.jpg',
    'assets/images/satellite-2023/13.jpg','assets/images/satellite-2023/14.jpg',
    'assets/images/satellite-2023/15.jpg','assets/images/satellite-2023/16.jpg',
    'assets/images/satellite-2023/17.jpg','assets/images/satellite-2023/18.jpg',
    'assets/images/satellite-2023/19.jpg','assets/images/satellite-2023/20.jpg'
  ],
  talent: [
    'assets/images/talent-land-2023/01.jpg',
    'assets/images/talent-land-2023/02.jpg',
    'assets/images/talent-land-2023/03.jpg',
    'assets/images/talent-land-2023/04.jpg',
    'assets/images/talent-land-2023/05.jpg',
    'assets/images/talent-land-2023/06.jpg',
    'assets/images/talent-land-2023/07.jpg',
    'assets/images/talent-land-2023/08.jpg',
    'assets/images/talent-land-2023/09.jpg',
    'assets/images/talent-land-2023/10.jpg',
    'assets/images/talent-land-2023/11.jpg',
    'assets/images/talent-land-2023/12.jpg',
    'assets/images/talent-land-2023/13.jpg',
    'assets/images/talent-land-2023/14.jpg',
    'assets/images/talent-land-2023/15.jpg',
    'assets/images/talent-land-2023/16.jpg',
    'assets/images/talent-land-2023/17.jpg',
    'assets/images/talent-land-2023/18.jpg',
    'assets/images/talent-land-2023/19.jpg',
    'assets/images/talent-land-2023/20.jpg'
  ],
  hacker: [
    'assets/images/hacker-garage-2024/01.jpg',
    'assets/images/hacker-garage-2024/02.jpg',
    'assets/images/hacker-garage-2024/03.jpg',
    'assets/images/hacker-garage-2024/04.jpg',
    'assets/images/hacker-garage-2024/05.jpg',
    'assets/images/hacker-garage-2024/06.jpg',
    'assets/images/hacker-garage-2024/07.jpg',
    'assets/images/hacker-garage-2024/08.jpg',
    'assets/images/hacker-garage-2024/09.jpg',
    'assets/images/hacker-garage-2024/10.jpg',
    'assets/images/hacker-garage-2024/11.jpg',
    'assets/images/hacker-garage-2024/12.jpg',
    'assets/images/hacker-garage-2024/13.jpg',
    'assets/images/hacker-garage-2024/14.jpg',
    'assets/images/hacker-garage-2024/15.jpg',
    'assets/images/hacker-garage-2024/16.jpg',
    'assets/images/hacker-garage-2024/17.jpg',
    'assets/images/hacker-garage-2024/18.jpg',
    'assets/images/hacker-garage-2024/19.jpg',
    'assets/images/hacker-garage-2024/20.jpg'
  ],
  gaming: [
    'assets/images/gaming-event-2024/01.jpg',
    'assets/images/gaming-event-2024/02.jpg',
    'assets/images/gaming-event-2024/03.jpg',
    'assets/images/gaming-event-2024/04.jpg',
    'assets/images/gaming-event-2024/05.jpg',
    'assets/images/gaming-event-2024/06.jpg',
    'assets/images/gaming-event-2024/07.jpg',
    'assets/images/gaming-event-2024/08.jpg',
    'assets/images/gaming-event-2024/09.jpg',
    'assets/images/gaming-event-2024/10.jpg',
    'assets/images/gaming-event-2024/11.jpg',
    'assets/images/gaming-event-2024/12.jpg',
    'assets/images/gaming-event-2024/13.jpg',
    'assets/images/gaming-event-2024/14.jpg',
    'assets/images/gaming-event-2024/15.jpg',
    'assets/images/gaming-event-2024/16.jpg',
    'assets/images/gaming-event-2024/17.jpg',
    'assets/images/gaming-event-2024/18.jpg',
    'assets/images/gaming-event-2024/19.jpg',
    'assets/images/gaming-event-2024/20.jpg'
  ],
  tl25d1: [
    'assets/images/talent-land-2025/day-1/01.jpg',
    'assets/images/talent-land-2025/day-1/02.jpg',
    'assets/images/talent-land-2025/day-1/03.jpg',
    'assets/images/talent-land-2025/day-1/04.jpg',
    'assets/images/talent-land-2025/day-1/05.jpg',
    'assets/images/talent-land-2025/day-1/06.jpg',
    'assets/images/talent-land-2025/day-1/07.jpg',
    'assets/images/talent-land-2025/day-1/08.jpg',
    'assets/images/talent-land-2025/day-1/09.jpg',
    'assets/images/talent-land-2025/day-1/10.jpg',
    'assets/images/talent-land-2025/day-1/11.jpg',
    'assets/images/talent-land-2025/day-1/12.jpg',
    'assets/images/talent-land-2025/day-1/13.jpg',
    'assets/images/talent-land-2025/day-1/14.jpg',
    'assets/images/talent-land-2025/day-1/15.jpg',
    'assets/images/talent-land-2025/day-1/16.jpg',
    'assets/images/talent-land-2025/day-1/17.jpg',
    'assets/images/talent-land-2025/day-1/18.jpg',
    'assets/images/talent-land-2025/day-1/19.jpg',
    'assets/images/talent-land-2025/day-1/20.jpg'
  ],
  tl25d2: [
    'assets/images/talent-land-2025/day-2/01.jpg',
    'assets/images/talent-land-2025/day-2/02.jpg',
    'assets/images/talent-land-2025/day-2/03.jpg',
    'assets/images/talent-land-2025/day-2/04.jpg',
    'assets/images/talent-land-2025/day-2/05.jpg',
    'assets/images/talent-land-2025/day-2/06.jpg',
    'assets/images/talent-land-2025/day-2/07.jpg',
    'assets/images/talent-land-2025/day-2/08.jpg',
    'assets/images/talent-land-2025/day-2/09.jpg',
    'assets/images/talent-land-2025/day-2/10.jpg',
    'assets/images/talent-land-2025/day-2/11.jpg',
    'assets/images/talent-land-2025/day-2/12.jpg',
    'assets/images/talent-land-2025/day-2/13.jpg',
    'assets/images/talent-land-2025/day-2/14.jpg',
    'assets/images/talent-land-2025/day-2/15.jpg',
    'assets/images/talent-land-2025/day-2/16.jpg',
    'assets/images/talent-land-2025/day-2/17.jpg',
    'assets/images/talent-land-2025/day-2/18.jpg',
    'assets/images/talent-land-2025/day-2/19.jpg',
    'assets/images/talent-land-2025/day-2/20.jpg'
  ],
  tl25d3: [
    'assets/images/talent-land-2025/day-3/01.jpg',
    'assets/images/talent-land-2025/day-3/02.jpg',
    'assets/images/talent-land-2025/day-3/03.jpg',
    'assets/images/talent-land-2025/day-3/04.jpg',
    'assets/images/talent-land-2025/day-3/05.jpg',
    'assets/images/talent-land-2025/day-3/06.jpg',
    'assets/images/talent-land-2025/day-3/07.jpg',
    'assets/images/talent-land-2025/day-3/08.jpg',
    'assets/images/talent-land-2025/day-3/09.jpg',
    'assets/images/talent-land-2025/day-3/10.jpg',
    'assets/images/talent-land-2025/day-3/11.jpg',
    'assets/images/talent-land-2025/day-3/12.jpg',
    'assets/images/talent-land-2025/day-3/13.jpg',
    'assets/images/talent-land-2025/day-3/14.jpg',
    'assets/images/talent-land-2025/day-3/15.jpg',
    'assets/images/talent-land-2025/day-3/16.jpg',
    'assets/images/talent-land-2025/day-3/17.jpg',
    'assets/images/talent-land-2025/day-3/18.jpg',
    'assets/images/talent-land-2025/day-3/19.jpg',
    'assets/images/talent-land-2025/day-3/20.jpg'
  ],
  tl25d4: [
    'assets/images/talent-land-2025/day-4/01.jpg',
    'assets/images/talent-land-2025/day-4/02.jpg',
    'assets/images/talent-land-2025/day-4/03.jpg',
    'assets/images/talent-land-2025/day-4/04.jpg',
    'assets/images/talent-land-2025/day-4/05.jpg',
    'assets/images/talent-land-2025/day-4/06.jpg',
    'assets/images/talent-land-2025/day-4/07.jpg',
    'assets/images/talent-land-2025/day-4/08.jpg',
    'assets/images/talent-land-2025/day-4/09.jpg',
    'assets/images/talent-land-2025/day-4/10.jpg',
    'assets/images/talent-land-2025/day-4/11.jpg',
    'assets/images/talent-land-2025/day-4/12.jpg',
    'assets/images/talent-land-2025/day-4/13.jpg',
    'assets/images/talent-land-2025/day-4/14.jpg',
    'assets/images/talent-land-2025/day-4/15.jpg',
    'assets/images/talent-land-2025/day-4/16.jpg',
    'assets/images/talent-land-2025/day-4/17.jpg',
    'assets/images/talent-land-2025/day-4/18.jpg',
    'assets/images/talent-land-2025/day-4/19.jpg',
    'assets/images/talent-land-2025/day-4/20.jpg'
  ],
  uvp: [
    'assets/images/uvp-workshop-2025/01.jpg',
    'assets/images/uvp-workshop-2025/02.jpg',
    'assets/images/uvp-workshop-2025/03.jpg',
    'assets/images/uvp-workshop-2025/04.jpg',
    'assets/images/uvp-workshop-2025/05.jpg',
    'assets/images/uvp-workshop-2025/06.jpg',
    'assets/images/uvp-workshop-2025/07.jpg',
    'assets/images/uvp-workshop-2025/08.jpg',
    'assets/images/uvp-workshop-2025/09.jpg',
    'assets/images/uvp-workshop-2025/10.jpg',
    'assets/images/uvp-workshop-2025/11.jpg',
    'assets/images/uvp-workshop-2025/12.jpg',
    'assets/images/uvp-workshop-2025/13.jpg',
    'assets/images/uvp-workshop-2025/14.jpg',
    'assets/images/uvp-workshop-2025/15.jpg',
    'assets/images/uvp-workshop-2025/16.jpg',
    'assets/images/uvp-workshop-2025/17.jpg',
    'assets/images/uvp-workshop-2025/18.jpg',
    'assets/images/uvp-workshop-2025/19.jpg',
    'assets/images/uvp-workshop-2025/20.jpg'
  ]
};
function openLB(g,i){
  currentG=g; currentIdx=i;
  const img = document.getElementById('lb-img');
  img.src = gData[g][i];
  img.style.transform = 'translateX(0)';
  img.style.opacity = '1';
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLB(){document.getElementById('lb').classList.remove('open');document.body.style.overflow='auto';}
function closeLBBg(e){if(e.target===document.getElementById('lb'))closeLB();}
function navLB(d, fromSwipe){
  const imgs=gData[currentG];
  const newIdx=(currentIdx+d+imgs.length)%imgs.length;
  const img = document.getElementById('lb-img');
  const outX = d > 0 ? '-60px' : '60px';
  const inX  = d > 0 ? '60px' : '-60px';
  img.style.transition = 'opacity 120ms ease, transform 120ms ease';
  img.style.transform = 'translateX('+outX+')';
  img.style.opacity = '0';
  setTimeout(()=>{
    currentIdx = newIdx;
    img.src = imgs[currentIdx];
    img.style.transition = 'none';
    img.style.transform = 'translateX('+inX+')';
    img.style.opacity = '0';
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{
        img.style.transition = 'opacity 140ms ease, transform 140ms ease';
        img.style.transform = 'translateX(0)';
        img.style.opacity = '1';
      });
    });
  }, 130);
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB();if(e.key==='ArrowRight')navLB(1);if(e.key==='ArrowLeft')navLB(-1);});

// ── LIGHTBOX SWIPE ──
(function(){
  const lb = document.getElementById('lb');
  let sx=0, sy=0, moved=false;
  lb.addEventListener('touchstart', e=>{
    sx=e.touches[0].clientX; sy=e.touches[0].clientY; moved=false;
  },{passive:true});
  lb.addEventListener('touchmove', e=>{
    moved=true;
  },{passive:true});
  lb.addEventListener('touchend', e=>{
    if(!moved) return;
    const dx=e.changedTouches[0].clientX-sx;
    const dy=e.changedTouches[0].clientY-sy;
    if(Math.abs(dx)>Math.abs(dy)*1.5 && Math.abs(dx)>40){
      navLB(dx<0?1:-1, true);
    }
  },{passive:true});
})();

// ── GALLERY SWIPE (cambiar álbum deslizando la galería) ──
(function(){
  const gallerySection = document.getElementById('page-galeria');
  if (!gallerySection) return;
  const tabOrder = ['satellite','talent','hacker','gaming','tl25d1','tl25d2','tl25d3','tl25d4','uvp'];
  let gSX=0, gSY=0, gMoved=false;

  gallerySection.addEventListener('touchstart', e=>{
    // solo activo si el touch empieza en una photo-grid o g-tabs
    const target = e.target.closest('.photo-grid, .g-tabs');
    if(!target) return;
    gSX=e.touches[0].clientX; gSY=e.touches[0].clientY; gMoved=false;
  },{passive:true});
  gallerySection.addEventListener('touchmove', e=>{
    gMoved=true;
  },{passive:true});
  gallerySection.addEventListener('touchend', e=>{
    if(!gMoved) return;
    const target = e.target.closest('.photo-grid, .g-tabs');
    if(!target) return;
    const dx=e.changedTouches[0].clientX-gSX;
    const dy=e.changedTouches[0].clientY-gSY;
    if(Math.abs(dx)>Math.abs(dy)*1.4 && Math.abs(dx)>50){
      const curIdx=tabOrder.indexOf(currentG);
      const nextIdx=curIdx+(dx<0?1:-1);
      if(nextIdx>=0 && nextIdx<tabOrder.length){
        const nextId=tabOrder[nextIdx];
        const btn=document.querySelector('.g-tab[onclick*="\''+nextId+'\'"]');
        if(btn) switchG(nextId, btn);
      }
    }
  },{passive:true});
})();

// Spaces marquee — same engine as tweets
var SPACES_PX_PER_SECOND = 5;
['spaces-row1'].forEach(function(id){
  var row = document.getElementById(id);
  if (!row) return;
  var origCards = Array.from(row.children);
  origCards.forEach(function(c){
    var cl = c.cloneNode(true);
    cl.setAttribute('aria-hidden','true');
    row.appendChild(cl);
  });
  var totalWidth = origCards.reduce(function(acc, c){ return acc + c.offsetWidth + 16; }, 0);
  var duration = totalWidth / SPACES_PX_PER_SECOND;
  row.style.animationDuration = duration + 's';
});

// Reveal on scroll
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target);}});
},{threshold:0.07});
document.querySelectorAll('.rv').forEach(el=>obs.observe(el));

// ── TAB NAVIGATION ──
const pages = ['home','mision','galeria','eventos','comunidad'];

function showPage(id) {
  // hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // show selected
  const target = document.getElementById('page-' + id);
  if (target) target.classList.add('active');
  // always show footer/cta
  document.getElementById('page-cta-footer').classList.add('active');
  // update nav active state
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  // scroll to top
  window.scrollTo(0, 0);
  // re-trigger reveals on newly shown page
  setTimeout(() => {
    document.querySelectorAll('#page-' + id + ' .rv:not(.in)').forEach(el => obs.observe(el));
  }, 50);
  // close mobile menu
  document.getElementById('navlinks').classList.remove('open');
}

// Shuffle + clone + velocidad proporcional al número de cards
var PX_PER_SECOND = 6; // pixels por segundo — ajusta este valor para cambiar velocidad global
['tweets-row1','tweets-row2'].forEach(function(id){
  var row = document.getElementById(id);
  if (!row) return;
  // Fisher-Yates shuffle
  var cards = Array.from(row.children);
  for (var i = cards.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    row.insertBefore(cards[j], cards[i]);
    var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
  }
  // Clonar para loop continuo
  var origCards = Array.from(row.children);
  origCards.forEach(function(c){
    var cl = c.cloneNode(true);
    cl.setAttribute('aria-hidden','true');
    row.appendChild(cl);
  });
  // Calcular duración según ancho total de contenido original
  var totalWidth = origCards.reduce(function(acc, c){ return acc + c.offsetWidth + 16; }, 0);
  var duration = totalWidth / PX_PER_SECOND;
  row.style.animationDuration = duration + 's';
});

// ── COUNTER ANIMATION ──
(function(){
  function easeOutCubic(t){ return 1 - Math.pow(1-t, 3); }
  function animateCounter(el){
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    function step(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(easeOutCubic(progress) * target);
      el.textContent = val;
      // re-append the <em> suffix
      const em = document.createElement('em');
      em.textContent = suffix;
      el.appendChild(em);
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('.stat-n[data-count]');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        animateCounter(e.target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObs.observe(el));
})();

// ── COMMUNITY SLIDESHOW ──
(function(){
  const ss = document.getElementById('community-slideshow');
  if(!ss) return;
  const slides = Array.from(ss.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('slide-dots');
  let current = 0;
  let timer = null;
  let paused = false;

  // build dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'slide-dot' + (i===0?' on':'');
    d.setAttribute('aria-label', 'Foto '+(i+1));
    d.addEventListener('click', () => { goTo(i); resetTimer(); });
    dotsContainer.appendChild(d);
  });

  function goTo(idx){
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('on');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('on');
  }

  function next(){ goTo(current + 1); }

  function resetTimer(){
    clearInterval(timer);
    if(!paused) timer = setInterval(next, 4200);
  }

  // pause on hover/touch
  ss.addEventListener('mouseenter', () => { paused=true; clearInterval(timer); });
  ss.addEventListener('mouseleave', () => { paused=false; resetTimer(); });
  ss.addEventListener('touchstart', () => { paused=true; clearInterval(timer); }, {passive:true});
  ss.addEventListener('touchend',   () => { paused=false; resetTimer(); }, {passive:true});

  // swipe to change slide
  let ssx=0;
  ss.addEventListener('touchstart', e=>{ ssx=e.touches[0].clientX; },{passive:true});
  ss.addEventListener('touchend', e=>{
    const dx=e.changedTouches[0].clientX-ssx;
    if(Math.abs(dx)>40){ goTo(current+(dx<0?1:-1)); resetTimer(); }
  },{passive:true});

  resetTimer();
})();

// lazy-load Twitter only when Comunidad tab is opened

// logo goes home
document.querySelector('.nav-logo').addEventListener('click', () => showPage('home'));

// init — always start at home on load/refresh
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
showPage('home');
