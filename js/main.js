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
    'assets/images/satellite-2023/DSC00203.JPG','assets/images/satellite-2023/DSC00202.JPG',
    'assets/images/satellite-2023/DSC00266.JPG','assets/images/satellite-2023/DSC00354.JPG',
    'assets/images/satellite-2023/DSC00352.JPG','assets/images/satellite-2023/DSC00351.JPG',
    'assets/images/satellite-2023/DSC00307.JPG','assets/images/satellite-2023/DSC00285.jpg',
    'assets/images/satellite-2023/DSC00190.jpg','assets/images/satellite-2023/DSC00215.jpg',
    'assets/images/satellite-2023/DSC00204.jpg','assets/images/satellite-2023/DSC00237.JPG',
    'assets/images/satellite-2023/DSC00238.JPG','assets/images/satellite-2023/DSC00223.JPG',
    'assets/images/satellite-2023/DSC00224.JPG','assets/images/satellite-2023/DSC00265.JPG',
    'assets/images/satellite-2023/DSC00221.JPG','assets/images/satellite-2023/DSC00252.JPG',
    'assets/images/satellite-2023/DSC00256.jpg','assets/images/satellite-2023/DSC00229.JPG'
  ],
  talent: [
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6901(2).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6953.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6993.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6938.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_7013.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6914.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6943(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6967(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6920(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6908.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6961.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6964(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6980(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6986.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_7022(2).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6903(3).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6904.jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6956(2).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_7006(1).jpg',
    'assets/images/talent-land-2023/Talent Land 2023/IMG_6977(1).jpg'
  ],
  hacker: [
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-32.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-33(1).jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-35(2).jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-36(1).jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-37(1).jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-43-09.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-49(1).jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-50.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-56.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-57.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-52-03.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-53-00.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-43-14.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-53.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-54.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-43-20.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-21-10-33.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-43-03.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-43-05.jpg',
    'assets/images/hacker-garage-2024/PHOTO-2024-04-06-23-51-58.jpg'
  ],
  gaming: [
    'assets/images/gaming-event-2024/photo_3_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_5_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_14_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_2_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_11_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_13_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_4_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_7_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_20_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_26_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_25_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_23_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_17_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_24_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_30_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_28_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_6_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_16_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_22_2024-11-26_11-20-49.jpg',
    'assets/images/gaming-event-2024/photo_27_2024-11-26_11-20-49.jpg'
  ],
  tl25d1: [
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.33.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.34.13.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.35.02.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.35.07.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.35.20.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.35.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.35.39.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.38.36.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.39.13.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.39.23.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.39.26.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.40.20.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.40.50.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.41.06.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.41.22.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.42.43.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.44.50.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 12.45.29.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 16.55.13.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 1/photo_2025-04-29 19.05.46.jpeg'
  ],
  tl25d2: [
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.52.31.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.52.51.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.54.40.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.55.04.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.56.05.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 12.56.22.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.00.46.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.00.49.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.02.39.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.02.43.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.05.40.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.05.47.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.06.18.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.06.25.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.09.00.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.09.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.09.32.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.09.36.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.11.19.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 2/photo_2025-04-29 13.11.22.jpeg'
  ],
  tl25d3: [
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.44.46.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.45.03.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.45.18.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.45.22.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.45.25.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.45.29.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.48.30.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.49.31.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.49.38.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.50.30.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.50.41.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.50.56.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.51.01.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.51.24.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.51.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.51.31.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.51.40.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.52.02.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.52.10.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 3/photo_2025-04-29 13.47.11.jpeg'
  ],
  tl25d4: [
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 12.56.11.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.51.01.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.52.06.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.52.12.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.53.00.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.53.15.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.54.24.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.54.47.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.55.01.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.55.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.56.29.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.57.11.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.57.27.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.57.36.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.58.01.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 16.58.56.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 19.05.39.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 19.05.41.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 19.06.12.jpeg',
    'assets/images/talent-land-2025/Talent Land Day 4/photo_2025-04-29 19.08.59.jpeg'
  ],
  uvp: [
    'assets/images/uvp-workshop-2025/uvp-01.jpg',
    'assets/images/uvp-workshop-2025/uvp-02.jpg',
    'assets/images/uvp-workshop-2025/uvp-03.jpg',
    'assets/images/uvp-workshop-2025/uvp-04.jpg',
    'assets/images/uvp-workshop-2025/uvp-05.jpg',
    'assets/images/uvp-workshop-2025/uvp-06.jpg',
    'assets/images/uvp-workshop-2025/uvp-07.jpg',
    'assets/images/uvp-workshop-2025/uvp-08.jpg',
    'assets/images/uvp-workshop-2025/uvp-09.jpg',
    'assets/images/uvp-workshop-2025/uvp-10.jpg',
    'assets/images/uvp-workshop-2025/uvp-11.jpg',
    'assets/images/uvp-workshop-2025/uvp-12.jpg',
    'assets/images/uvp-workshop-2025/uvp-13.jpg',
    'assets/images/uvp-workshop-2025/uvp-14.jpg',
    'assets/images/uvp-workshop-2025/uvp-15.jpg',
    'assets/images/uvp-workshop-2025/uvp-16.jpg',
    'assets/images/uvp-workshop-2025/uvp-17.jpg',
    'assets/images/uvp-workshop-2025/uvp-18.jpg',
    'assets/images/uvp-workshop-2025/uvp-19.jpg',
    'assets/images/uvp-workshop-2025/uvp-20.jpg'
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
