#!/usr/bin/env node
// Revisa el sitio antes de publicarlo. Sin dependencias: node scripts/check.mjs
//
//   1. Toda ruta local (HTML, CSS, JS, URLs absolutas del sitio) existe, con
//      las mayúsculas exactas: la Mac no las distingue, Vercel sí.
//   2. Todo archivo versionado en assets/ se usa en alguna parte.
//   3. La galería del HTML coincide foto por foto con gData y con las pestañas.
//   4. canonical, og:url, JSON-LD, sitemap y robots apuntan al mismo dominio.
//   5. Las fotos, tweets y spaces respetan su peso y tamaño máximos.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8');
const errors = [];
const passed = [];
const check = (label, problems) => (problems.length ? errors.push(`✗ ${label}`, ...problems.map((p) => `    ${p}`)) : passed.push(`✓ ${label}`));

const tracked = new Set(execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8' }).split('\0').filter(Boolean));
const html = read('index.html');
const cssFiles = readdirSync(join(ROOT, 'css')).filter((f) => f.endsWith('.css')).map((f) => `css/${f}`);
const jsFiles = readdirSync(join(ROOT, 'js')).filter((f) => f.endsWith('.js')).map((f) => `js/${f}`);
const mainJs = read('js/main.js');

// ── 1. Rutas locales ──
const listings = new Map();
function existsExact(path) {
  let dir = ROOT;
  for (const part of path.split('/')) {
    if (!listings.has(dir)) {
      try { listings.set(dir, new Set(readdirSync(dir))); } catch { listings.set(dir, new Set()); }
    }
    if (!listings.get(dir).has(part)) return false;
    dir = join(dir, part);
  }
  return true;
}

const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.replace(/\/$/, '');
if (!canonical) throw new Error('index.html no tiene <link rel="canonical">');
const refs = new Map(); // ruta local → dónde aparece
const addRef = (path, from) => {
  const clean = decodeURI(path.split(/[?#]/)[0]);
  if (!refs.has(clean)) refs.set(clean, from);
};
const isExternal = (u) => /^(https?:|\/\/|#|mailto:|tel:|data:|javascript:)/.test(u);

for (const [, url] of html.matchAll(/\b(?:src|href|poster)="([^"]*)"/g)) if (url && !isExternal(url)) addRef(url, 'index.html');
for (const f of ['index.html', 'sitemap.xml', 'robots.txt']) {
  for (const [, path] of read(f).matchAll(new RegExp(`${canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/([^"'<\\s]*)`, 'g'))) addRef(path || 'index.html', f);
}
for (const f of cssFiles) {
  for (const [, url] of read(f).matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) if (!isExternal(url)) addRef(posix.normalize(posix.join('css', url)), f);
}
for (const f of jsFiles) {
  for (const [, path] of read(f).matchAll(/['"`](assets\/[^'"`]+)['"`]/g)) addRef(path, f);
}
check(`${refs.size} rutas locales existen (con mayúsculas exactas)`, [...refs].flatMap(([path, from]) => {
  if (!existsExact(path)) return [`${path} (en ${from}) no existe`];
  if (!tracked.has(path)) return [`${path} (en ${from}) no está en git: falta git add`];
  return [];
}));

// ── 2. Assets sin usar ──
const assets = [...tracked].filter((f) => f.startsWith('assets/'));
check(`${assets.length} archivos de assets/ en uso`, assets.filter((f) => !refs.has(f)).map((f) => `${f} no se usa: bórralo o muévelo a brand-kit/`));

// ── 3. Galería ──
const gData = {};
const gBody = mainJs.match(/const gData = \{([\s\S]*?)\n\};/)?.[1] ?? '';
for (const [, album, list] of gBody.matchAll(/(\w+):\s*\[([\s\S]*?)\]/g)) gData[album] = [...list.matchAll(/'([^']+)'/g)].map((m) => m[1]);
const albums = Object.keys(gData);
const tabs = [...html.matchAll(/switchG\('(\w+)',this\)/g)].map((m) => m[1]);
const tabOrder = [...(mainJs.match(/const tabOrder = \[([^\]]*)\]/)?.[1] ?? '').matchAll(/'(\w+)'/g)].map((m) => m[1]);
const galleryProblems = [];
if (tabs.join() !== albums.join()) galleryProblems.push(`pestañas del HTML [${tabs}] ≠ gData [${albums}]`);
if (tabOrder.join() !== albums.join()) galleryProblems.push(`tabOrder [${tabOrder}] ≠ gData [${albums}]`);
for (const album of albums) {
  const grid = html.match(new RegExp(`id="gallery-${album}">([\\s\\S]*?)\\n    </div>`))?.[1];
  if (!grid) { galleryProblems.push(`falta <div id="gallery-${album}"> en index.html`); continue; }
  const items = [...grid.matchAll(/openLB\('(\w+)',(\d+)\)"><img src="([^"]+)"/g)];
  items.forEach(([, a, i, src], n) => {
    if (a !== album || Number(i) !== n) galleryProblems.push(`gallery-${album}, foto ${n + 1}: dice openLB('${a}',${i}), debe ser openLB('${album}',${n})`);
    if (src !== gData[album][n]) galleryProblems.push(`gallery-${album}, foto ${n + 1}: HTML ${src} ≠ gData ${gData[album][n] ?? '(falta)'}`);
  });
  if (items.length !== gData[album].length) galleryProblems.push(`gallery-${album}: ${items.length} fotos en el HTML, ${gData[album].length} en gData`);
}
for (const [, album] of html.matchAll(/goAlbum\('(\w+)'\)/g)) if (!gData[album]) galleryProblems.push(`goAlbum('${album}') apunta a un álbum que no existe`);
const photos = Object.values(gData).flat().length;
check(`Galería: ${albums.length} álbumes, ${photos} fotos, HTML = gData = pestañas`, galleryProblems);

// ── 4. Dominio ──
const seo = {
  'og:url': html.match(/property="og:url" content="([^"]+)"/)?.[1],
  'JSON-LD url': html.match(/"url": "([^"]+)"/)?.[1],
  'sitemap.xml': read('sitemap.xml').match(/<loc>([^<]+)<\/loc>/)?.[1],
  'robots.txt': read('robots.txt').match(/Sitemap: (\S+)/)?.[1]?.replace(/\/sitemap\.xml$/, ''),
};
check(`Dominio: todo apunta a ${canonical}`, Object.entries(seo)
  .filter(([, url]) => url?.replace(/\/$/, '') !== canonical)
  .map(([where, url]) => `${where} dice ${url ?? '(nada)'}`));

// ── 5. Peso y tamaño ──
function imageSize(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    for (let i = 2; i < buf.length - 8;) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return { type: 'jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { type: 'webp', width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { type: 'webp', width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') return { type: 'webp', width: 1 + (((buf[22] & 0x3f) << 8) | buf[21]), height: 1 + (((buf[24] & 0x0f) << 10) | (buf[23] << 2) | ((buf[22] & 0xc0) >> 6)) };
  }
  return { type: 'otro' };
}
const BUDGETS = [
  { dir: 'assets/images/', type: 'jpeg', ext: '.jpg', kb: 500, side: 1200, label: 'fotos' },
  { dir: 'assets/tweets/', type: 'webp', ext: '.webp', kb: 200, side: 1400, width: 600, label: 'tweets' },
  { dir: 'assets/spaces/', type: 'webp', ext: '.webp', kb: 150, side: 1200, width: 800, label: 'spaces' },
];
const weightProblems = [];
for (const b of BUDGETS) {
  for (const f of assets.filter((a) => a.startsWith(b.dir))) {
    const buf = readFileSync(join(ROOT, f));
    const img = imageSize(buf);
    const kb = Math.round(statSync(join(ROOT, f)).size / 1024);
    if (!f.endsWith(b.ext) || img.type !== b.type) weightProblems.push(`${f}: debe ser ${b.type} con extensión ${b.ext}`);
    if (kb > b.kb) weightProblems.push(`${f}: ${kb} KB (máx ${b.kb} KB)`);
    if (Math.max(img.width, img.height) > b.side || (b.width && img.width > b.width)) weightProblems.push(`${f}: ${img.width}×${img.height} px (máx ${b.width ? `${b.width} de ancho` : `${b.side} por lado`})`);
  }
}
check(`Peso: ${BUDGETS.map((b) => `${b.label} ≤ ${b.kb} KB y ≤ ${b.width ?? b.side} px`).join(', ')}`, weightProblems);

console.log([...passed, ...errors].join('\n'));
if (errors.length) {
  console.log('\nArregla lo marcado con ✗ antes de publicar. Guía: docs/content-guide.md');
  process.exit(1);
}
