# Guía de contenido

Cómo agregar fotos, álbumes, eventos, tweets, spaces y videos sin romper nada.
Todo se edita a mano en `index.html` y `js/main.js`; no hay CMS ni build.

- [Antes de empezar](#antes-de-empezar)
- [Agregar fotos a un álbum](#agregar-fotos-a-un-álbum)
- [Crear un álbum](#crear-un-álbum)
- [Agregar un evento](#agregar-un-evento)
- [Agregar un tweet](#agregar-un-tweet)
- [Agregar un Twitter Space](#agregar-un-twitter-space)
- [Videos, slideshow, cifras y ticker](#videos-slideshow-cifras-y-ticker)
- [Al terminar](#al-terminar)

## Antes de empezar

- **ImageMagick** para optimizar imágenes: `brew install imagemagick`.
- **Servidor local** para probar: `python3 -m http.server 8000` y abrir <http://localhost:8000>.
- **Nada crudo en el repo.** Fotos de cámara o celular sin procesar, `.MOV`, `.HEIC`
  y videos largos se quedan fuera. `assets/videos/` está ignorada por git y por
  Vercel para guardar material local.
- **Nombres sin espacios ni mayúsculas.** `02.jpg`, `tweet-usuario.webp`,
  `space-tema-mes2025.webp`. macOS no distingue mayúsculas; Vercel sí, y una foto
  que se ve en la Mac puede faltar en producción. `node scripts/check.mjs` lo detecta.

## Agregar fotos a un álbum

Cada foto aparece en **dos lugares** que deben coincidir en el mismo orden: la
cuadrícula del HTML (lo que se ve) y `gData` en `js/main.js` (lo que usa el lightbox
para pasar de una foto a otra).

**1. Optimiza la foto** con el siguiente número libre del álbum:

```bash
magick original.jpg -auto-orient -resize '1200x1200>' -strip -quality 80 -interlace Plane \
  assets/images/uvp-workshop-2025/21.jpg
```

`-auto-orient` endereza fotos de celular, `-resize '1200x1200>'` solo reduce (nunca
agranda), `-strip` quita metadatos (GPS, modelo de cámara) y `-interlace Plane`
genera un JPEG progresivo que se ve mientras carga.

**2. Agrégala a la cuadrícula** en `index.html`, al final de `<div id="gallery-<id>">`.
El número de `openLB` es la posición empezando en 0, o sea, el número de la foto menos 1:

```html
<div class="photo-item" onclick="openLB('uvp',20)"><img src="assets/images/uvp-workshop-2025/21.jpg" loading="lazy" alt=""></div>
```

**3. Agrégala a `gData`** en `js/main.js`, en la misma posición:

```js
uvp: [
  'assets/images/uvp-workshop-2025/01.jpg', …,
  'assets/images/uvp-workshop-2025/21.jpg'
],
```

**4. Corre `node scripts/check.mjs`.** Si el HTML y `gData` no coinciden, dice en qué
foto.

Para **quitar** una foto: bórrala de los dos lugares, renumera los `openLB` que
siguen y borra el archivo. Para **reordenar**: mueve las líneas en los dos lugares y
ajusta los `openLB`. No hace falta renombrar archivos; el número del nombre es el
orden en que entró la foto, no su posición.

Los `cover.jpg` son fotos que se usan fuera de la galería: la portada de una
tarjeta del blog y la primera foto del slideshow.

## Crear un álbum

Un álbum vive en **cinco lugares**. El check verifica que los cuatro últimos
tengan los mismos álbumes en el mismo orden.

| # | Qué | Dónde |
| --- | --- | --- |
| 1 | Carpeta con las fotos `01.jpg`, `02.jpg`… | `assets/images/<evento-año>/` |
| 2 | Botón de la pestaña | `index.html`, dentro de `<div class="g-tabs">` |
| 3 | Cuadrícula | `index.html`, después del último `<div class="photo-grid">` |
| 4 | Lista de fotos | `js/main.js`, objeto `gData` |
| 5 | Orden para el swipe entre álbumes en el celular | `js/main.js`, arreglo `tabOrder` |

Elige un id corto sin espacios (por ejemplo `uanl26`) y úsalo igual en todos:

```html
<!-- 2. Pestaña -->
<button class="g-tab" onclick="switchG('uanl26',this)">UANL 2026</button>

<!-- 3. Cuadrícula -->
<div class="photo-grid" id="gallery-uanl26">
  <div class="photo-item" onclick="openLB('uanl26',0)"><img src="assets/images/uanl-2026/01.jpg" loading="lazy" alt=""></div>
  <div class="photo-item" onclick="openLB('uanl26',1)"><img src="assets/images/uanl-2026/02.jpg" loading="lazy" alt=""></div>
</div>
```

```js
// 4. gData
uanl26: [
  'assets/images/uanl-2026/01.jpg','assets/images/uanl-2026/02.jpg'
],

// 5. tabOrder
const tabOrder = ['satellite', …, 'uvp', 'uanl26'];
```

Para que un evento abra el álbum, usa `goAlbum('uanl26')` (ver
[Agregar un evento](#agregar-un-evento)). Las pestañas nuevas van al final; la tira
de pestañas se desliza sola en el celular.

## Agregar un evento

La pestaña Eventos va del más reciente al más antiguo, con un separador por año.
Copia la fila que se parezca más a la que necesitas:

**Evento con álbum** (toda la fila abre la galería):

```html
<a href="#" class="ev-row" onclick="goAlbum('uvp');return false">
  <div class="ev-date"><div class="ev-mo">Jul</div><div class="ev-dy">25</div></div>
  <div class="ev-info"><span class="ev-title">Workshop El Futuro es Web3 - Universidad del Valle de Puebla</span><span class="ev-where">Puebla, Puebla</span></div>
  <span class="ev-badge past">Pasado</span><span class="ev-arrow">&#8594;</span>
</a>
```

**Evento de varios días:** agrega `ev-dy-range` al día, por ejemplo
`<div class="ev-dy ev-dy-range">14–17</div>` (con guion largo `–`).

**Evento sin álbum:** usa `<div class="ev-row">` en lugar de `<a>` y oculta la flecha,
así la fila no reacciona al pasar el mouse:

```html
<div class="ev-row">
  <div class="ev-date"><div class="ev-mo">Sep</div><div class="ev-dy">04</div></div>
  <div class="ev-info"><span class="ev-title">Workshop AntiSAT - IPN Politécnico</span><span class="ev-where">Instituto Politécnico Nacional, CDMX</span></div>
  <span class="ev-badge past">Pasado</span><span class="ev-arrow" aria-hidden="true" style="visibility:hidden">&#8594;</span>
</div>
```

**Año nuevo:** `<div class="ev-year"><span>2026</span></div>` antes del primer evento de ese año.

**Próximo evento:** la primera fila usa `<span class="ev-badge up">Próximo</span>` y
enlaza a donde se anuncia. Cuando el evento pase, cámbiala a `past`, muévela a su año
y deja una fila «Próximo» nueva.

Revisa también si cambian las cifras de Home («Eventos», «Universidades»; ver
[abajo](#videos-slideshow-cifras-y-ticker)).

## Agregar un tweet

Los tweets son capturas, no embeds: cargan rápido y no dependen de X.

**1. Toma la captura** del tweet en modo claro y recorta los bordes:

```bash
magick captura.png -fuzz 8% -trim +repage recorte.png
```

Si la captura trae «Read N replies» o «Read more on X» al final, recórtalo antes.
Revisa que se vean la fecha y los likes: nunca uses `-crop` con una altura fija sin
mirar el resultado.

**2. Redondea las esquinas** (16 px):

```bash
magick recorte.png \
  \( +clone -alpha extract \
     -draw 'fill black polygon 0,0 0,16 16,0 fill white circle 16,16 16,0' \
     \( +clone -flip \) -compose Multiply -composite \
     \( +clone -flop \) -compose Multiply -composite \) \
  -alpha off -compose CopyOpacity -composite redondeado.png
```

**3. Conviértela a WebP** de 600 px de ancho:

```bash
magick redondeado.png -resize '600x>' -strip -quality 85 -define webp:alpha-quality=100 \
  assets/tweets/tweet-usuario.webp
```

**4. Agrega la tarjeta a las dos filas**, `tweets-row1` y `tweets-row2`. Copia una
tarjeta existente y cambia `href`, `src` y `alt`:

```html
<a class="tweet-card" href="https://x.com/usuario/status/123" target="_blank" rel="noopener"><img src="assets/tweets/tweet-usuario.webp" alt="@usuario" loading="lazy"><div class="tweet-card-overlay"><span class="tweet-card-cta"><svg …></svg>Ver en X</span></div></a>
```

No dupliques tarjetas dentro de una fila: `js/main.js` baraja cada fila y la clona
para que el loop no tenga cortes. La velocidad sale de `PX_PER_SECOND` (6 px/s),
así que agregar tweets no la cambia.

## Agregar un Twitter Space

**1. Optimiza la portada** a WebP de 800 px:

```bash
magick portada.jpeg -trim -resize '800x>' -strip -quality 82 \
  assets/spaces/space-tema-mes2026.webp
```

**2. Agrega la tarjeta** en `<div class="spaces-marquee" id="spaces-row1">`:

```html
<a class="sp-card" href="https://x.com/i/spaces/…" target="_blank" rel="noopener">
  <img class="sp-card-img" src="assets/spaces/space-tema-mes2026.webp" alt="Título del space">
  <div class="sp-card-body">
    <span class="sp-chip">// Twitter Space</span>
    <h3>Título del space</h3>
    <span class="sp-date">Jueves 6 de agosto, 2026</span>
    <p>De qué se habló y con quién.</p>
  </div>
</a>
```

Hay una sola fila de spaces; su velocidad es `SPACES_PX_PER_SECOND` (5 px/s).

## Videos, slideshow, cifras y ticker

**Videos de YouTube** (pestaña Misión). Cambia el id del video en el `src` del
`iframe` y el pie:

```html
<div class="vid-block">
  <div class="vid-ratio"><iframe src="https://www.youtube.com/embed/ZqEkGA6GtQI" …></iframe></div>
  <div class="vid-cap"><h4>Satellite Event 2023</h4><p>Ciudad de México - Julio 2023</p></div>
</div>
```

**Slideshow «La comunidad en acción»** (Misión). Una `<img class="slide">` por foto
dentro del slideshow; la primera lleva `class="slide active"`. Los puntos se generan
solos y cambia de foto cada 4.2 s. Usa fotos que ya estén en `assets/images/`.

**Cifras de Home.** El número final va en `data-count` y el sufijo en `data-suffix`;
el contador anima de 0 a ese número cuando aparece en pantalla:

```html
<div class="stat"><span class="stat-n" data-count="10" data-suffix="+">0</span><span class="stat-l">Eventos</span></div>
```

**Ticker de Home.** Una línea de `<span class="ticker-item">` dentro de
`.ticker-track`.

## Al terminar

```bash
node scripts/check.mjs            # todo en ✓
python3 -m http.server 8000       # revisa en escritorio y en el celular (390 px)
git add -A && git commit -m "Galería: fotos del workshop UANL"
git push origin master            # Vercel publica solo
```

Más detalles del deploy en [deploy.md](deploy.md).
