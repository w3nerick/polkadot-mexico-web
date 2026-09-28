# Sistema de diseño

Editorial en blanco, negro y crema, con acentos de pixel art (sombras sólidas,
animaciones en pasos y tramas tipo dither). Sin colores de acento: el color lo ponen
las fotos al pasar el mouse, las capturas de tweets y spaces, y el logo del loader.
Todo vive en `css/styles.css`.

## Colores

| Token | Valor | Uso |
| --- | --- | --- |
| `--bg` | `#f5f2eb` | Fondo crema de las secciones y del nav |
| `--black` | `#111` | Texto, bordes fuertes, sombras, pestaña activa |
| `--accent` | `#555` | Definido, sin uso por ahora |
| `--mid` | `#777` | Etiquetas, eyebrows, enlaces del nav en reposo |
| `--border` | `#ccc9c0` | Divisores y bordes suaves |
| — | `#edeae2` | Secciones alternas (`.section-alt`) y hover de tarjetas |
| — | `#000` / `#fff` | Hero, cita, tarjetas de video, CTA y footer |

## Tipografía

| Familia | Rol | Ejemplos |
| --- | --- | --- |
| **DM Serif Display** | Títulos y números | `h1`–`h6`, `.hero-h1`, `.sec-title`, `.stat-n`, títulos de eventos |
| **DM Sans** | Texto corrido | `body`, párrafos, `.hero-p` |
| **Space Mono** | Etiquetas en mayúsculas | nav, botones, `.eyebrow`, badges, pestañas, ticker |
| **Space Grotesk** | Detalle | `.hero-eyebrow` |

Reglas:

- Etiquetas en Space Mono: mayúsculas, 10–13 px, `letter-spacing` de .1em a .22em.
- Títulos grandes con `clamp()` para escalar sin breakpoints:
  `.hero-h1` de 3.2 rem a 8 rem y `.sec-title` de 36 px a 68 px.
- El título del hero lleva un contorno hecho con `text-shadow` en 8 direcciones para
  leerse sobre el video.

## Componentes

**Botones** (`.btn-dark`, `.btn-ghost`). Borde de 2 px y sombra sólida de 6 px sin
difuminar. Al pasar el mouse bajan 2 px y la sombra se reduce a 3 px; al presionar
bajan 6 px y se invierten los colores. Las transiciones duran 90 ms en
`steps(4,end)`: se mueven en saltos, como pixel art.

**Eyebrow + título** (`.eyebrow`, `.sec-title`). Cada sección abre con una etiqueta
pequeña en Space Mono y un título centrado en DM Serif Display.

**Bento** (`.bento`, `.b-card`). Cuadrícula 7fr / 5fr con separación de 3 px; al
pasar el mouse la tarjeta sube 2 px y gana una sombra sólida de 4 px.

**Banda dither** (`.dither-band`). Franja de 24 px con una trama Bayer de 4 × 4 en
SVG, `image-rendering: pixelated` y 8 % de opacidad. Separa secciones.

**Tarjetas de video** (`.vid-block`). Fondo negro, borde de 2 px y sombra de 4 px
que se reduce al pasar el mouse.

**Galería** (`.photo-item`). Fotos 4:3 en blanco y negro (`grayscale(1)`); con el
mouse pasan a color y crecen 4 %. Pestañas con borde y la activa en negro.

**Filas de eventos** (`.ev-row`). Fecha a la izquierda, título y lugar, badge
`Próximo`/`Pasado` y flecha. Las filas que son enlaces se invierten a negro con el
hover; las que no, no reaccionan.

## Layout y breakpoints

- Ancho máximo del contenido: `--max` = 1080 px. Secciones con 108 px de padding
  vertical y 48 px lateral.
- **≤ 768 px** (celular y tablet vertical): menú hamburguesa, bento y videos en una
  columna, galería de 4 a 2 columnas, pestañas de galería en una tira horizontal
  deslizable y paddings reducidos.
- **≤ 390 px** (iPhone SE y similares): pestañas de galería, tarjetas de tweets
  (180 px) y de spaces (250 px) más compactas.

Prueba siempre a 1280 px y a 390 px.

## Movimiento

| Qué | Cómo | Duración |
| --- | --- | --- |
| Loader | Bocas del logo que se iluminan en secuencia | ciclo de 2.2 s, mínimo 4 s en pantalla |
| Botones y tarjetas | `steps(4,end)` | 90 ms |
| Reveal de secciones | Transición al entrar en pantalla | una vez por elemento |
| Slideshow | Fundido entre fotos | cada 4.2 s |
| Marquees | Desplazamiento lineal continuo | 6 px/s tweets, 5 px/s spaces |

Los movimientos son lentos a propósito: el sitio se lee, no se persigue.
