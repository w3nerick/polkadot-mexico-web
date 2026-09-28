# Arquitectura

Cómo funciona el sitio por dentro. Para agregar contenido basta la
[guía de contenido](content-guide.md); esto es para cambiar el comportamiento.

- [Principios](#principios)
- [Orden de carga](#orden-de-carga)
- [Pestañas](#pestañas)
- [Loader](#loader)
- [Galería y lightbox](#galería-y-lightbox)
- [Marquees de tweets y spaces](#marquees-de-tweets-y-spaces)
- [Slideshow, contadores y reveal](#slideshow-contadores-y-reveal)
- [SEO](#seo)
- [Rendimiento](#rendimiento)

## Principios

- **Sin build ni dependencias.** Lo que está en el repo es lo que se publica. No hay
  `package.json`: Vercel sirve los archivos tal cual (preset «Other»).
- **Una sola página.** Las cinco secciones están en `index.html` y se muestran u
  ocultan con JavaScript. No hay router ni URLs por sección.
- **Scripts clásicos, sin módulos.** Los botones usan `onclick="showPage('galeria')"`,
  así que las funciones tienen que ser globales. Por eso `js/*.js` no usa
  `type="module"`, `defer` ni `async`.

## Orden de carga

```
<head>
  metas, Open Graph, JSON-LD
  css/styles.css          ← bloquea el render, como cualquier CSS
<body>
  #pk-loader              ← el loader se pinta primero
  js/loader.js            ← arranca la animación de inmediato
  nav, 5 pestañas, lightbox, CTA y footer
  js/main.js              ← al final: todo el DOM ya existe
```

`js/loader.js` va justo después del HTML del loader y antes del resto del contenido:
necesita `#pk-canvas` y `#pk-img-color`, y tiene que animar mientras se descarga lo
demás. `js/main.js` va al final del `<body>` porque busca elementos de todas las
pestañas al ejecutarse. Si mueves cualquiera de los dos, respeta ese orden.

## Pestañas

Cada sección es un `<div class="page" id="page-<id>">` con id `home`, `mision`,
`galeria`, `eventos` o `comunidad`. `showPage(id)` en `js/main.js`:

1. quita `.active` a todas las páginas y se la pone a `page-<id>`;
2. deja siempre activo `page-cta-footer` (CTA + footer);
3. marca el enlace del nav con `data-page="<id>"`;
4. sube al inicio y vuelve a observar los elementos `.rv` para la animación de entrada;
5. cierra el menú del celular.

Al cargar o refrescar siempre se abre Home (`showPage('home')` al final de
`js/main.js`, con `history.scrollRestoration = 'manual'`). `goAlbum(id)` abre la
Galería directo en un álbum; lo usan las filas de Eventos.

## Loader

`#pk-loader` cubre la pantalla al menos 4 s y luego se desvanece en 650 ms. Tiene dos
capas:

- **Grano:** un `<canvas>` con ruido y un brillo que se mueve despacio. Solo en
  escritorio; en celulares (≤ 768 px o ≤ 2 núcleos) es un degradado fijo para ahorrar
  batería.
- **Bocas:** sobre el logo en blanco y negro (`assets/brand/loader-mexico.png`) se
  iluminan en secuencia las seis bocas del logo y la palabra MÉXICO. Cada zona es un
  polígono en `OVALS` (coordenadas sobre un lienzo de 280 × 353) que recorta la versión
  a color de la misma imagen.

`ISX` e `ISY` convierten esas coordenadas al tamaño real de la imagen y están fijas
en 4409 × 5558 px. Si cambias la imagen por otra de distinto tamaño, cámbialas por
`SRC.naturalWidth / W` y `SRC.naturalHeight / H` o las bocas quedarán desfasadas.

## Galería y lightbox

- **Datos:** `gData` en `js/main.js` guarda las rutas de cada álbum; la cuadrícula
  del HTML repite las mismas fotos. El lightbox navega con `gData`; la cuadrícula es
  lo que se ve. `scripts/check.mjs` verifica que coincidan foto por foto.
- **Pestañas:** `switchG(id, btn)` activa la pestaña y su cuadrícula. En el celular
  la tira de pestañas se desliza para dejar la activa al centro.
- **Lightbox:** `openLB(album, i)`, `navLB(±1)` y `closeLB()`. Teclado: ← → y Esc.
  En el celular se desliza entre fotos.
- **Swipe entre álbumes:** deslizar sobre la cuadrícula en el celular pasa al álbum
  anterior o siguiente según `tabOrder`.
- **Estilo:** fotos en blanco y negro que pasan a color con el hover.

## Marquees de tweets y spaces

Dos filas de tweets (`tweets-row1`, `tweets-row2`) y una de spaces (`spaces-row1`)
se desplazan en loop con una animación CSS. Al cargar, `js/main.js`:

1. baraja las tarjetas de cada fila de tweets (Fisher–Yates), así las dos filas nunca
   se ven iguales;
2. clona las tarjetas al final de la fila (con `aria-hidden`) para que el loop no
   tenga corte;
3. calcula la duración según el ancho real: `ancho / PX_PER_SECOND` (6 px/s en
   tweets, `SPACES_PX_PER_SECOND` = 5 en spaces). Agregar tarjetas no acelera la fila.

Por eso las tarjetas se escriben una sola vez por fila en el HTML.

## Slideshow, contadores y reveal

- **Slideshow** (Misión): fundido entre `<img class="slide">` cada 4.2 s. Se pausa
  con el mouse encima o al tocarlo, y se desliza en el celular. Los puntos se generan
  a partir de las fotos.
- **Contadores** (Home): cada `.stat-n` anima de 0 a `data-count` cuando entra en
  pantalla y le agrega `data-suffix`.
- **Reveal:** los elementos `.rv` aparecen con una transición la primera vez que
  entran en pantalla (`IntersectionObserver`, umbral 7 %).

## SEO

- `<title>`, `description`, Open Graph y Twitter Card con `assets/brand/og-image.jpg`
  (1200 × 630).
- `canonical`, `robots.txt` y `sitemap.xml`.
- JSON-LD `Organization` con logo, fecha de fundación y redes (`sameAs`).

Todas las URLs absolutas usan el mismo dominio; `scripts/check.mjs` falla si alguna
no coincide con `canonical`. Para cambiar de dominio, ver
[deploy.md](deploy.md#cambiar-de-dominio).

## Rendimiento

| Recurso | Formato | Límite (lo revisa `scripts/check.mjs`) |
| --- | --- | --- |
| Fotos de galería | JPEG progresivo, calidad 80 | ≤ 1200 px por lado, ≤ 500 KB |
| Tweets | WebP con transparencia | ≤ 600 px de ancho, ≤ 200 KB |
| Spaces | WebP | ≤ 800 px de ancho, ≤ 150 KB |

- Las fotos de galería y los tweets usan `loading="lazy"`.
- El grano del loader se apaga en celulares.
- Fuentes: DM Serif Display, DM Sans y Space Mono desde Google Fonts; Space Mono y
  Space Grotesk también locales en `assets/fonts/`, con `font-display: swap`.
- Sin límite, a propósito: `assets/brand/loader-mexico.png` (4.6 MB; se dejó a
  resolución completa para no arriesgar la animación del loader) y
  `assets/video/hero.mp4` (48 MB, pendiente de recomprimir).
