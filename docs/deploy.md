# Deploy

El sitio vive en Vercel, proyecto `polkadot-mexico`, en
<https://polkadot-mexico.vercel.app>.

- [Cómo se publica](#cómo-se-publica)
- [Antes de publicar](#antes-de-publicar)
- [Qué se publica](#qué-se-publica)
- [Después de publicar](#después-de-publicar)
- [Volver atrás](#volver-atrás)
- [Cambiar de dominio](#cambiar-de-dominio)
- [Configuración de Vercel](#configuración-de-vercel)

## Cómo se publica

El repo está conectado a Vercel por la integración de GitHub:

| Acción | Resultado |
| --- | --- |
| `git push` a `master` | Deploy a **producción** (polkadot-mexico.vercel.app) |
| `git push` a cualquier otra rama o un pull request | Deploy de **preview** con URL propia |

Para cambios grandes, trabaja en una rama, revisa el preview y después haz merge a
`master`. Para cambios chicos basta:

```bash
node scripts/check.mjs
git push origin master
```

`vercel --prod --yes` también publica desde la carpeta local (sube lo que haya en
disco, esté o no en git), pero con la integración activa crea un deploy duplicado:
úsalo solo si GitHub no está disponible.

## Antes de publicar

1. `node scripts/check.mjs`: todo en ✓.
2. Revisión local con `python3 -m http.server 8000` a 1280 px y a 390 px: las cinco
   pestañas, un álbum en el lightbox y los marquees.
3. `git status`: que no quede ninguna imagen nueva sin `git add`. Vercel publica lo
   que está en git.

## Qué se publica

`.vercelignore` funciona como lista blanca: ignora todo (`/*`) y vuelve a incluir
solo lo que forma el sitio.

| Se publica | No se publica |
| --- | --- |
| `index.html`, `css/`, `js/` | `docs/`, `scripts/`, `.github/` |
| `assets/` (menos `assets/videos/` y crudos `.MOV`, `.HEIC`, `.mp4` en `images/`) | `brand-kit/` |
| `favicon.ico`, `robots.txt`, `sitemap.xml` | `README.md`, `LICENSE`, archivos de configuración |

Si agregas un archivo nuevo en la raíz que el sitio necesite, súmalo a la lista
blanca con una línea `!archivo`.

## Después de publicar

Revisa el estado del deploy y que el sitio responda:

```bash
gh api repos/w3nerick/polkadot-mexico-web/commits/master/status \
  --jq '.statuses[] | .context + ": " + .state'          # Vercel: success

SITE=https://polkadot-mexico.vercel.app
for p in "" css/styles.css js/loader.js js/main.js assets/brand/og-image.jpg favicon.ico; do
  curl -so /dev/null -w "%{http_code}  /$p\n" "$SITE/$p"   # todo 200
done
curl -so /dev/null -w "%{http_code}  /README.md (debe ser 404)\n" "$SITE/README.md"
```

Abre el sitio en el celular y en una ventana privada (sin caché). Vercel sirve los
archivos con `max-age=0, must-revalidate`, así que los cambios se ven al recargar.

## Volver atrás

En el dashboard de Vercel: **Deployments** → el deploy anterior → **Instant
Rollback**. Desde la terminal:

```bash
vercel ls polkadot-mexico          # lista de deploys
vercel rollback <url-del-deploy>   # vuelve a ese deploy
```

Después arregla el problema en git: el siguiente push a `master` vuelve a publicar
lo que haya en la rama.

## Cambiar de dominio

1. En Vercel, **Settings → Domains**: agrega el dominio y configura el DNS que pide.
   Deja `polkadot-mexico.vercel.app` redirigiendo al dominio nuevo.
2. En `index.html`, cambia la URL en:
   - `<link rel="canonical">`
   - `og:url`, `og:image` y `twitter:image`
   - el JSON-LD: `url` y `logo`
3. En `sitemap.xml`, cambia `<loc>` y actualiza `<lastmod>`.
4. En `robots.txt`, cambia la línea `Sitemap:`.
5. `node scripts/check.mjs`: falla si alguna URL sigue apuntando al dominio viejo.

## Configuración de Vercel

| Ajuste | Valor |
| --- | --- |
| Framework Preset | Other |
| Root Directory | `.` |
| Build Command | ninguno (no hay `package.json`) |
| Output Directory | la raíz del repo |

No agregues una carpeta `public/`: Vercel publicaría solo esa carpeta. Tampoco un
`package.json` con script `build`: Vercel intentaría compilar.
