# Cambios entre la versión antes y la versión después

Portal de la Alcaldía Municipal de Valleclaro (sitio académico ficticio). Este documento registra los 22 errores sembrados en `antes/` y cómo se corrigió cada uno en `despues/`. En el código, cada error está marcado con un comentario `E01:` … `E22:` en `antes/` y con `E01 corregido:` … `E22 corregido:` en `despues/`. Para encontrar un error, busca su código en la carpeta correspondiente.

Las capturas van en `documentacion/capturas/antes/` y `documentacion/capturas/despues/`; los videos, en `documentacion/videos/`.

## a) Resumen de los 22 errores

| Código | Página | Criterio | Archivo(s) corregido(s) en `despues/` |
|---|---|---|---|
| E01 | Todas | WCAG 3.1.1 (A) | Las 8 páginas `.html` |
| E02 | Todas | WCAG 1.3.1 (A), 2.4.6 (AA) | Las 8 páginas `.html` |
| E03 | Todas | WCAG 2.4.1 (A) | Las 8 páginas `.html`, `css/componentes.css` |
| E04 | Todas | WCAG 1.4.3 (AA) | `css/base.css`, `css/componentes.css` |
| E05 | Todas | WCAG 2.4.7 (AA) | `css/base.css` |
| E06 | Menú (todas) | WCAG 2.1.1 (A) | Las 8 páginas `.html`, `js/menu.js` |
| E07 | Todas | WCAG 2.4.2 (A) | Las 8 páginas `.html` |
| E08 | Todas | WCAG 1.4.10 (AA) | `css/base.css` (los demás estilos son mobile-first) |
| E09 | Todas | WCAG 2.4.4 (A) | Las 8 páginas `.html` |
| E10 | Inicio (y logo en todas) | WCAG 1.1.1 (A), 1.4.5 (AA) | Las 8 páginas `.html`, `img/logo.svg`, `img/banner-predial.svg`, `css/componentes.css` |
| E11 | Inicio | WCAG 2.2.2 (A) | `index.html`, `css/componentes.css` |
| E12 | Noticias | WCAG 1.4.1 (A) | `noticias.html`, `css/componentes.css` |
| E13 | Detalle del trámite | Nielsen 6 y 8; WCAG 1.3.1 (A) | `tramite-certificado-residencia.html`, `tramites.html`, `css/componentes.css` |
| E14 | Detalle del trámite (y páginas internas) | Nielsen 1; WCAG 2.4.8 (AAA, buena práctica) | Las 8 páginas `.html`, `css/componentes.css` |
| E15 | PQRS | WCAG 1.3.1, 3.3.2, 4.1.2 (A) | `pqrs.html`, `css/formularios.css` |
| E16 | PQRS | WCAG 1.4.1, 3.3.2 (A) | `pqrs.html`, `css/formularios.css` |
| E17 | PQRS | WCAG 3.3.1 (A), 3.3.3 (AA); Nielsen 5 y 9 | `pqrs.html`, `js/pqrs.js`, `css/formularios.css` |
| E18 | PQRS | WCAG 2.2.1 (A) | `pqrs.html`, `js/pqrs.js`, `css/formularios.css` |
| E19 | PQRS | WCAG 4.1.3 (AA); Nielsen 1 | `pqrs.html`, `js/pqrs.js`, `css/formularios.css` |
| E20 | Preguntas frecuentes | WCAG 2.1.1, 4.1.2 (A) | `faq.html` |
| E21 | Descargas | WCAG 2.4.4 (A), 1.1.1 (A) | `descargas.html`, `docs/` (PDF accesibles) |
| E22 | Descargas | WCAG 1.3.1 (A) | `descargas.html`, `css/componentes.css` |

## b) Fichas por error

### E01 · Página sin idioma declarado

- **Problema en antes/:** el elemento `<html>` no tiene atributo `lang`. El lector de pantalla no sabe en qué idioma leer y puede pronunciar el español con reglas de otro idioma.
- **Criterio:** WCAG 3.1.1 Idioma de la página (A).

**Código antes** (`antes/index.html`, igual en las 7 páginas):

```html
<!DOCTYPE html>
<!-- E01: html sin atributo lang -->
<html>
```

**Código después** (`despues/index.html`, igual en las 8 páginas):

```html
<!DOCTYPE html>
<!-- E01 corregido: idioma de la página declarado -->
<html lang="es">
```

- **Cómo verificar:** Lighthouse, auditoría «`<html>` element has a `[lang]` attribute»; WAVE marca «Language missing or invalid» solo en antes. Con NVDA, la página se lee con la voz en español.
- **Evidencia sugerida:** `E01-antes.png` / `E01-despues.png` (resultado de Lighthouse o WAVE).

### E02 · Todo hecho con `div`, sin regiones ni jerarquía de encabezados

- **Problema en antes/:** encabezado, menú, contenido y pie son `<div>`. No hay `h1`; los títulos de sección son `div` con estilo y las tarjetas usan `h4` y `h5` sin niveles anteriores. Quien usa lector de pantalla no puede saltar por regiones ni por títulos.
- **Criterio:** WCAG 1.3.1 Información y relaciones (A), 2.4.6 Encabezados y etiquetas (AA).

**Código antes** (`antes/index.html`):

```html
<!-- E02: encabezado hecho con div, sin header -->
<div class="encabezado"> …
<!-- E02: menú hecho con div, sin nav -->
<div class="menu"> …
<!-- E02: contenido principal en div, sin main ni h1 -->
<div class="contenido">
    <!-- E02: título de sección hecho con div, sin h2 -->
    <div class="titulo-seccion">Accesos rápidos</div>
        <!-- E02: salto de jerarquía, se usa h4 sin h1, h2 ni h3 -->
        <h4>Certificado de residencia</h4>
```

**Código después** (`despues/index.html`):

```html
<header> …
  <nav class="menu" aria-label="Principal"> … </nav>
</header>
<main id="contenido" class="contenido">
  <h1 class="visualmente-oculto">Portal de la Alcaldía Municipal de Valleclaro</h1>
  <section class="seccion" aria-labelledby="titulo-accesos">
    <h2 id="titulo-accesos">Accesos rápidos</h2>
    … <h3><a href="tramite-certificado-residencia.html">Solicitar certificado de residencia</a></h3>
  </section>
</main>
<footer class="pie"> … </footer>
```

- **Cómo verificar:** vista «Structure» de WAVE o la extensión HeadingsMap: en antes no hay `h1` y aparecen saltos de nivel; en después hay un `h1` y niveles h2–h3 en orden. Con NVDA, la tecla D recorre las regiones y la tecla H los encabezados. axe: reglas `page-has-heading-one`, `region` y `heading-order`.
- **Evidencia sugerida:** `E02-antes.png` / `E02-despues.png` (vista de estructura de WAVE).

### E03 · Sin enlace para saltar al contenido

- **Problema en antes/:** quien navega con teclado debe recorrer la barra superior, el logo y los 6 elementos del menú en cada página antes de llegar al contenido.
- **Criterio:** WCAG 2.4.1 Evitar bloques (A).

**Código antes** (`antes/index.html`):

```html
<body>

<!-- E03: no hay enlace para saltar al contenido -->
<!-- E02: barra superior hecha con div -->
<div class="barra-superior">
```

**Código después** (`despues/index.html` y `css/componentes.css`):

```html
<!-- E03 corregido: enlace para saltar al contenido principal, primer elemento de la página -->
<a class="saltar" href="#contenido">Saltar al contenido principal</a>
…
<main id="contenido" class="contenido">
```

```css
/* E03 corregido: enlace para saltar al contenido, visible al recibir foco con Tab */
.saltar { position: absolute; top: 0.5rem; left: 0.5rem; transform: translateY(-200%); … }
.saltar:focus { transform: translateY(0); }
```

- **Cómo verificar:** abrir la página y pulsar Tab una vez: en después aparece «Saltar al contenido principal»; con Enter, el siguiente Tab ya está dentro del contenido. En antes, el primer Tab va al logo.
- **Evidencia sugerida:** `E03-antes.png` / `E03-despues.png` (primer Tab); video `videos/teclado-navegacion-antes.mp4` / `videos/teclado-navegacion-despues.mp4`.

### E04 · Texto gris sin contraste suficiente

- **Problema en antes/:** el texto general, la barra superior y el pie son `#AAAAAA` sobre blanco (2.3:1), y los enlaces son celestes `#4FC3F7` sobre blanco (2.0:1). Ambos están por debajo del mínimo de 4.5:1.
- **Criterio:** WCAG 1.4.3 Contraste mínimo (AA).

**Código antes** (`antes/css/estilos.css`):

```css
body {
  /* E04: texto gris #AAAAAA sobre blanco (2.3:1) */
  color: #AAAAAA;
}
/* E04: enlaces celestes sobre blanco, contraste insuficiente */
a { color: #4FC3F7; text-decoration: none; }
/* E04: texto gris pequeño en el pie de página */
.pie { background: #F4F4F4; color: #AAAAAA; font-size: 12px; … }
```

**Código después** (`despues/css/base.css` y `css/componentes.css`):

```css
/* E04 corregido: paleta con contraste mínimo de 4.5:1 sobre blanco */
:root {
  --color-primario: #1F4E79;        /* 8.7:1 sobre blanco */
  --color-texto: #1A1A1A;           /* 17:1 sobre blanco */
  --color-texto-suave: #4A4A4A;     /* 8.9:1 sobre blanco */
}
/* E04 corregido: enlaces en azul institucional (8.7:1) y subrayados */
a { color: var(--color-primario); text-decoration: underline; }
/* E04 corregido: pie con texto de tamaño normal y contraste suficiente */
.pie { background: var(--color-primario-oscuro); color: var(--color-sobre-oscuro); font-size: 0.9375rem; }
```

- **Cómo verificar:** WebAIM Contrast Checker con cada par de colores (`#AAAAAA`/`#FFFFFF` = 2.3:1 en antes; `#1A1A1A`/`#FFFFFF` = 17:1 en después). Lighthouse, auditoría «Background and foreground colors have a sufficient contrast ratio», y los errores de contraste de WAVE.
- **Evidencia sugerida:** `E04-antes.png` / `E04-despues.png` (errores de contraste en WAVE) y una tabla de colores con su relación en `reportes/`.

### E05 · El foco del teclado no se ve

- **Problema en antes/:** el CSS quita el contorno de foco a todos los elementos. Quien navega con teclado no sabe dónde está.
- **Criterio:** WCAG 2.4.7 Foco visible (AA).

**Código antes** (`antes/css/estilos.css`):

```css
/* E05: outline none, el foco del teclado no se ve */
*:focus { outline: none; }

/* E05: outline none también en enlaces, botones y campos */
a:focus, button:focus, input:focus, select:focus, textarea:focus { outline: 0; }
```

**Código después** (`despues/css/base.css`):

```css
/* E05 corregido: foco visible de 3 px amarillo con sombra oscura, se ve sobre fondos claros y oscuros */
:focus-visible {
  outline: 3px solid var(--color-foco);
  outline-offset: 0;
  box-shadow: 0 0 0 6px var(--color-foco-sombra);
}
```

- **Cómo verificar:** recorrer cada página solo con Tab: en después cada elemento enfocado muestra un borde amarillo de 3 px con sombra oscura, tanto sobre blanco como sobre el azul del encabezado y del pie.
- **Evidencia sugerida:** `E05-antes.png` / `E05-despues.png` (un enlace del menú enfocado); video `videos/teclado-navegacion-antes.mp4` / `videos/teclado-navegacion-despues.mp4`.

### E06 · Submenú de Trámites que solo abre con el mouse

- **Problema en antes/:** el submenú se muestra con `:hover`. Con teclado no se puede abrir, y sus enlaces (Certificado de residencia, Paz y salvo predial) no se pueden alcanzar.
- **Criterio:** WCAG 2.1.1 Teclado (A).

**Código antes** (`antes/index.html` y `antes/css/estilos.css`):

```html
<!-- E06: submenú de Trámites que solo abre con el mouse (hover) -->
<li class="menu-desplegable">
  <a href="tramites.html">Trámites &#9662;</a>
  <ul class="submenu"> … </ul>
```

```css
/* E06: el submenú solo se abre con :hover del mouse, no con el teclado */
.menu-desplegable:hover .submenu { display: block; }
```

**Código después** (`despues/tramites.html` y `despues/js/menu.js`):

```html
<!-- E06 corregido: el submenú se abre con un botón con aria-expanded (Enter, Espacio, Escape y mouse; ver js/menu.js) -->
<button type="button" class="menu-boton es-actual" aria-expanded="false" aria-controls="submenu-tramites">Trámites</button>
<ul class="submenu" id="submenu-tramites"> … </ul>
```

```js
/* E06 corregido: Escape cierra el submenú y devuelve el foco al botón */
contenedor.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && estaAbierto()) {
    cerrar();
    boton.focus();
  }
});
```

- **Cómo verificar:** solo con teclado, llegar a «Trámites», pulsar Enter o Espacio (se abre y `aria-expanded` pasa a `true`), entrar con Tab a los enlaces, salir con Escape (el foco vuelve al botón). Con NVDA se anuncia «Trámites, botón, contraído/expandido».
- **Evidencia sugerida:** `E06-antes.png` / `E06-despues.png` (submenú abierto con teclado); video `videos/teclado-menu-antes.mp4` / `videos/teclado-menu-despues.mp4`.

### E07 · Todas las pestañas se titulan «Inicio»

- **Problema en antes/:** las 7 páginas tienen `<title>Inicio</title>`. Con varias pestañas abiertas, o en el historial, no se distinguen, y el lector de pantalla anuncia «Inicio» en todas.
- **Criterio:** WCAG 2.4.2 Titulado de páginas (A).

**Código antes** (`antes/tramites.html`, igual en las 7 páginas):

```html
<!-- E07: todas las pestañas se titulan "Inicio" -->
<title>Inicio</title>
```

**Código después** (`despues/tramites.html`):

```html
<!-- E07 corregido: título único por página -->
<title>Trámites – Alcaldía de Valleclaro</title>
```

- **Cómo verificar:** abrir las 8 páginas en pestañas y comparar los títulos; con NVDA, Insertar+T lee el título. Patrón esperado: «Nombre de la página – Alcaldía de Valleclaro».
- **Evidencia sugerida:** `E07-antes.png` / `E07-despues.png` (barra de pestañas con varias páginas abiertas).

### E08 · Ancho fijo de 1200 px

- **Problema en antes/:** el cuerpo y el contenedor miden 1200 px fijos. En celular, o con zoom alto, aparece desplazamiento horizontal y hay que moverse en dos direcciones para leer.
- **Criterio:** WCAG 1.4.10 Reajuste del contenido (AA).

**Código antes** (`antes/css/estilos.css`):

```css
body {
  /* E08: ancho mínimo fijo de 1200 px, no se adapta al celular */
  min-width: 1200px;
}
/* E08: contenedor de ancho fijo de 1200 px */
.contenedor { width: 1200px; margin: 0 auto; padding: 0 20px; }
```

**Código después** (`despues/css/base.css`; los demás estilos son mobile-first, con `min-width` en rem):

```css
/* E08 corregido: contenedor fluido con ancho máximo, sin scroll horizontal a 320 px */
.contenedor {
  width: 100%;
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1rem;
}
```

- **Cómo verificar:** en las DevTools, modo de dispositivo a 320 px de ancho, o zoom al 400 % en una ventana de 1280 px. En después no hay barra de desplazamiento horizontal en ninguna página (la tabla de Descargas se desplaza dentro de su propio recuadro, lo que permite la excepción de 1.4.10 para tablas de datos).
- **Evidencia sugerida:** `E08-antes.png` / `E08-despues.png` (vista de 320 px o zoom al 400 %).

### E09 · Enlaces «Clic aquí» y «Ver más»

- **Problema en antes/:** muchos enlaces dicen «Clic aquí», «Ver más» o «aquí». En la lista de enlaces del lector de pantalla aparecen 10 o más con el mismo texto y no se sabe a dónde lleva cada uno.
- **Criterio:** WCAG 2.4.4 Propósito de los enlaces (A).

**Código antes** (`antes/index.html` y pie de las 7 páginas):

```html
<!-- E09: enlace "Clic aquí" -->
<a href="tramite-certificado-residencia.html">Clic aquí</a>
…
<!-- E09: enlace "Ver más" -->
<a href="noticias.html">Ver más</a>
…
<!-- E09: enlaces "clic aquí" en el pie de página -->
<p>Peticiones, quejas y reclamos: <a href="pqrs.html">clic aquí</a></p>
```

**Código después** (`despues/index.html` y pie de las 8 páginas):

```html
<!-- E09 corregido: el enlace dice a dónde lleva, en lugar de "Clic aquí" -->
<h3><a href="tramite-certificado-residencia.html">Solicitar certificado de residencia</a></h3>
…
<!-- E09 corregido: el título es el enlace y dice a dónde lleva, en lugar de "Ver más" -->
<h3 class="noticia-titulo"><a href="noticias.html#noticia-predial">Descuento del 10 % por pronto pago del predial</a></h3>
…
<!-- E09 corregido: enlaces que dicen a dónde llevan, en lugar de "clic aquí" -->
<li><a href="pqrs.html">Radicar una petición, queja o reclamo (PQRS)</a></li>
```

- **Cómo verificar:** con NVDA, Insertar+F7 muestra la lista de enlaces: en antes se repiten «Clic aquí» y «Ver más»; en después cada enlace se entiende fuera de contexto. WAVE marca «Suspicious link text» y «Redundant link» en antes.
- **Evidencia sugerida:** `E09-antes.png` / `E09-despues.png` (lista de enlaces de NVDA); video `videos/nvda-enlaces-antes.mp4` / `videos/nvda-enlaces-despues.mp4`.

### E10 · Imágenes sin texto alternativo y texto del banner dentro de la imagen

- **Problema en antes/:** el logo, los banners y las fotos de noticias no tienen `alt`. El nombre de la alcaldía y los mensajes del carrusel están dibujados dentro de las imágenes, así que no se pueden leer con lector de pantalla, ampliar sin pixelarse ni traducir.
- **Criterio:** WCAG 1.1.1 Contenido no textual (A), 1.4.5 Imágenes de texto (AA).

**Código antes** (`antes/index.html`):

```html
<!-- E10: logo sin alt, el nombre de la alcaldía está dentro de la imagen -->
<img src="img/logo.svg" width="380" height="96">
…
<!-- E10: imagen sin alt y con el texto del banner dentro de la imagen -->
<img src="img/banner-1.svg" class="activa" width="1200" height="400">
…
<!-- E10: imagen de noticia sin alt -->
<img src="img/noticia-1.svg" width="600" height="400">
```

**Código después** (`despues/index.html`):

```html
<!-- E10 corregido: el escudo es decorativo dentro del enlace (alt=""), el nombre de la alcaldía es texto real … -->
<a class="marca" href="index.html">
  <img src="img/logo.svg" alt="" width="92" height="100">
  <span class="marca-texto"><span class="marca-pre">Alcaldía de</span> <span class="marca-nombre">Valleclaro</span></span>
</a>
…
<!-- E10 corregido: imagen decorativa con alt vacío; el mensaje está como texto HTML -->
<img src="img/banner-predial.svg" alt="" width="1200" height="400">
<h2 id="titulo-banner">Paga tu impuesto predial con <span class="resaltado">10 % de descuento</span> hasta el 30 de noviembre</h2>
…
<!-- E10 corregido: imagen de noticia con texto alternativo descriptivo -->
<img src="img/noticia-1.svg" alt="Ilustración de un recibo del impuesto predial con el símbolo de porcentaje" width="600" height="400">
```

- **Cómo verificar:** WAVE marca «Missing alternative text» en antes. Lighthouse, auditoría «Image elements have `[alt]` attributes». Al hacer zoom al 200 %, el texto del banner de después sigue nítido; en antes es parte de la imagen. Con NVDA, el enlace del logo se lee «Alcaldía de Valleclaro».
- **Evidencia sugerida:** `E10-antes.png` / `E10-despues.png` (íconos de WAVE sobre las imágenes).

### E11 · Carrusel automático sin pausa

- **Problema en antes/:** el banner cambia solo cada 3 segundos y no hay forma de detenerlo. No da tiempo de leer, distrae y puede afectar a personas con dificultades de atención.
- **Criterio:** WCAG 2.2.2 Pausar, detener, ocultar (A).

**Código antes** (`antes/js/main.js`):

```js
/* E11: el carrusel cambia cada 3 segundos */
const INTERVALO_CARRUSEL_MS = 3000;
…
/* E11: carrusel automático sin botón de pausa ni forma de detenerlo */
setInterval(function () {
  diapositivas[actual].classList.remove('activa');
  actual = (actual + 1) % diapositivas.length;
  diapositivas[actual].classList.add('activa');
}, INTERVALO_CARRUSEL_MS);
```

**Código después** (`despues/index.html`; no hay JavaScript de carrusel):

```html
<!-- E11 corregido: banner estático en lugar del carrusel automático -->
<section class="banner" aria-labelledby="titulo-banner">
  <img src="img/banner-predial.svg" alt="" width="1200" height="400">
  <div class="banner-texto">
    <h2 id="titulo-banner">Paga tu impuesto predial con …</h2>
    <p><a class="boton" href="faq.html#pago-predial">Ver cómo pagar el impuesto predial</a></p>
  </div>
</section>
```

- **Cómo verificar:** dejar la página de inicio abierta 10 segundos: en antes el banner cambia 3 veces; en después no se mueve. Los otros dos mensajes del carrusel (vacunación y feria de empleo) siguen en «Últimas noticias» y en la página de noticias.
- **Evidencia sugerida:** video corto `videos/carrusel-antes.mp4`; `E11-antes.png` / `E11-despues.png`.

### E12 · Categoría de la noticia indicada solo por color

- **Problema en antes/:** cada noticia tiene una franja de color y una leyenda que relaciona colores con categorías. Quien no distingue colores, o usa lector de pantalla, no sabe la categoría.
- **Criterio:** WCAG 1.4.1 Uso del color (A).

**Código antes** (`antes/noticias.html`):

```html
<!-- E12: categoría indicada solo por el color de la franja -->
<span class="etiqueta-cat cat-impuestos"></span>
```

**Código después** (`despues/noticias.html` y `css/componentes.css`):

```html
<!-- E12 corregido: categoría escrita como texto; el color solo acompaña -->
<p class="etiqueta cat-impuestos"><span class="visualmente-oculto">Categoría: </span>Impuestos</p>
```

```css
/* E12 corregido: la categoría se escribe como texto; el color solo acompaña (texto blanco con contraste de 5:1 o más) */
.etiqueta { … font-size: 0.875rem; font-weight: bold; color: var(--color-sobre-oscuro); }
.cat-impuestos { background: #B71C1C; }  /* 6.6:1 con texto blanco */
```

- **Cómo verificar:** en las DevTools, panel Rendering, «Emulate vision deficiencies» (acromatopsia): en antes las franjas se ven iguales; en después cada tarjeta dice su categoría. Con NVDA se lee «Categoría: Impuestos».
- **Evidencia sugerida:** `E12-antes.png` / `E12-despues.png` (página de noticias en escala de grises).

### E13 · Todo el trámite en un solo párrafo

- **Problema en antes/:** el detalle del certificado de residencia es un único párrafo justificado de unas 200 palabras. Requisitos, pasos, costo y tiempo están mezclados; el costo («no tiene costo») y el plazo («hasta diez días hábiles») quedan escondidos a mitad del texto.
- **Criterio:** Nielsen 6 (reconocer antes que recordar) y 8 (diseño estético y minimalista); WCAG 1.3.1 (A).

**Código antes** (`antes/tramite-certificado-residencia.html`):

```html
<!-- E02: título de la página hecho con div, sin h1 -->
<div class="titulo-pagina">Expedición de certificación de residencia</div>

<!-- E13: todo el trámite en un solo párrafo, sin secciones, sin pasos numerados y sin costo ni tiempo destacados -->
<p class="parrafo-largo">El certificado de residencia es el documento mediante el cual la Alcaldía
Municipal de Valleclaro certifica que una persona reside en la jurisdicción del municipio, y puede ser
solicitado por las personas mayores de edad … se informa que el trámite no tiene costo y que la
respuesta se da en un plazo de hasta diez días hábiles … </p>
```

**Código después** (`despues/tramite-certificado-residencia.html`):

```html
<!-- E13 corregido: requisitos en lista -->
<ul class="lista">
  <li>Copia de la cédula de ciudadanía.</li> …
</ul>
<!-- E13 corregido: costo y tiempo destacados en un recuadro -->
<section class="seccion recuadro" aria-labelledby="costo-tiempo">
  <h2 id="costo-tiempo">Costo y tiempo</h2>
  <dl class="datos-tramite datos-destacados">
    <div><dt>Costo</dt><dd>Gratuito</dd></div>
    <div><dt>Tiempo de respuesta</dt><dd>Hasta 10 días hábiles</dd></div>
  </dl>
</section>
<!-- E13 corregido: pasos en lista numerada -->
<ol class="lista pasos"> <li><strong>Descarga el formato de solicitud</strong> y diligéncialo.</li> … </ol>
```

- **Cómo verificar:** tarea T1 de la prueba con usuarios («Encuentra cuánto cuesta y cuánto tarda el certificado de residencia»): comparar el tiempo y el éxito entre versiones. Evaluación heurística (gravedad del problema en antes frente a después). Con NVDA, la tecla H salta entre las 7 secciones.
- **Evidencia sugerida:** `E13-antes.png` / `E13-despues.png` (página completa); `pruebas-usuarios/` (resultados de la tarea T1).

### E14 · Sin migas de pan ni página actual marcada

- **Problema en antes/:** en las páginas internas no hay migas de pan, y el menú no indica en qué página está la persona.
- **Criterio:** Nielsen 1 (visibilidad del estado del sistema); WCAG 2.4.8 Ubicación (AAA, buena práctica).

**Código antes** (`antes/tramite-certificado-residencia.html`):

```html
<!-- E14: el menú no marca la página actual -->
<ul class="menu-lista">
  <li><a href="index.html">Inicio</a></li> …
</ul>
…
<!-- E14: sin migas de pan (Inicio > Trámites > Certificado de residencia) ni indicación de dónde está el usuario -->
```

**Código después** (`despues/tramite-certificado-residencia.html`):

```html
<!-- E14 corregido: migas de pan que indican dónde está el usuario -->
<nav class="migas" aria-label="Migas de pan">
  <ol>
    <li><a href="index.html">Inicio</a></li>
    <li><a href="tramites.html">Trámites</a></li>
    <li><a href="tramite-certificado-residencia.html" aria-current="page">Certificado de residencia</a></li>
  </ol>
</nav>
```

En el menú, el enlace de la página actual lleva `aria-current="page"` y se marca con negrita y un borde amarillo inferior, no solo con color.

- **Cómo verificar:** a simple vista, las migas de pan aparecen en las 7 páginas internas y el menú resalta la sección actual. Con NVDA, la tecla D encuentra la región «Migas de pan» y el enlace actual se anuncia como «página actual».
- **Evidencia sugerida:** `E14-antes.png` / `E14-despues.png` (parte superior de la página del certificado).

### E15 · Campos sin `label`, solo con placeholder

- **Problema en antes/:** los campos del formulario PQRS solo tienen placeholder. Al escribir, el texto de ayuda desaparece; el lector de pantalla puede no anunciar el nombre del campo, y las casillas y botones de opción no tienen etiqueta asociada.
- **Criterio:** WCAG 1.3.1 (A), 3.3.2 Etiquetas o instrucciones (A), 4.1.2 Nombre, función, valor (A).

**Código antes** (`antes/pqrs.html`):

```html
<!-- E16: obligatorio marcado solo en rojo -->
<!-- E15: campo sin label, solo con placeholder -->
<input type="text" id="nombres" name="nombres" placeholder="Nombres" class="obligatorio">
…
<!-- E15: opciones sin label, el texto no está asociado a cada radio -->
Tipo de persona:
<input type="radio" name="tipo_persona" value="natural"> Natural
```

**Código después** (`despues/pqrs.html`):

```html
<!-- E15 corregido: los campos se agrupan con fieldset y legend -->
<fieldset class="grupo">
  <legend>Datos del solicitante</legend>
  …
  <!-- E15 corregido: label visible asociado al campo -->
  <label for="nombres">Nombres <span class="obligatorio"><span aria-hidden="true">*</span> (obligatorio)</span></label>
  <p class="mensaje-error-campo" id="error-nombres" hidden></p>
  <input type="text" id="nombres" name="nombres" autocomplete="given-name">
```

- **Cómo verificar:** axe, regla `label`; WAVE, «Missing form label». Con NVDA, al recorrer el formulario con Tab cada campo anuncia su nombre, si es obligatorio y su ayuda. Hacer clic en el texto de una casilla la marca.
- **Evidencia sugerida:** `E15-antes.png` / `E15-despues.png` (formulario con los íconos de WAVE); video `videos/nvda-pqrs-antes.mp4` / `videos/nvda-pqrs-despues.mp4`.

### E16 · Obligatorios marcados solo en rojo

- **Problema en antes/:** la única señal de que un campo es obligatorio es su borde rojo, o el texto en rojo en los grupos de opciones. Quien no distingue el rojo, o usa lector de pantalla, no lo sabe.
- **Criterio:** WCAG 1.4.1 Uso del color (A), 3.3.2 Etiquetas o instrucciones (A).

**Código antes** (`antes/css/estilos.css`):

```css
/* E16: los campos obligatorios se marcan solo con borde rojo */
.formulario input.obligatorio,
.formulario select.obligatorio,
.formulario textarea.obligatorio { border-color: #E53935; }
/* E16: grupos de opciones obligatorios marcados solo con texto rojo */
.texto-obligatorio { color: #E53935; }
```

**Código después** (`despues/pqrs.html`):

```html
<!-- E16 corregido: nota inicial que explica cómo se marcan los campos obligatorios -->
<p class="nota-obligatorios" id="nota-obligatorios">Los campos con * son obligatorios.</p>
…
<!-- E16 corregido: obligatorio con asterisco y texto "(obligatorio)" -->
<label for="tipo-documento">Tipo de documento <span class="obligatorio"><span aria-hidden="true">*</span> (obligatorio)</span></label>
…
<label for="telefono">Teléfono (opcional)</label>
```

- **Cómo verificar:** ver el formulario con la emulación de acromatopsia de las DevTools: en antes no se distingue qué es obligatorio; en después cada etiqueta lo dice. Con NVDA se lee «Nombres, obligatorio».
- **Evidencia sugerida:** `E16-antes.png` / `E16-despues.png` (formulario en escala de grises).

### E17 · Error genérico y datos borrados al enviar

- **Problema en antes/:** al enviar con errores aparece arriba «Formulario inválido», sin decir qué campo falla, y se borra todo lo escrito.
- **Criterio:** WCAG 3.3.1 Identificación de errores (A), 3.3.3 Sugerencias ante errores (AA); Nielsen 5 (prevención de errores) y 9 (ayudar a reconocer y corregir errores).

**Código antes** (`antes/js/main.js`):

```js
if (!formularioValido()) {
  /* E17: un solo mensaje genérico arriba y se borran todos los datos escritos */
  mensajeError.style.display = 'block';
  vaciarFormulario();
  window.scrollTo(0, 0);
}
```

**Código después** (`despues/js/pqrs.js`):

```js
const errores = validarTodo();
if (errores.length > 0) {
  /* E17 corregido: los datos se conservan; el foco va al resumen de errores */
  pintarResumen(errores);
  resumen.focus();
  return;
}
…
/* E17 corregido: mensaje junto al campo, aria-invalid y aria-describedby apuntando al error */
function mostrarError(regla, mensaje) { … campo.setAttribute('aria-invalid', 'true'); … }
```

Cada mensaje explica cómo corregir. Por ejemplo: «Escribe un correo válido, por ejemplo nombre@correo.com.»

- **Cómo verificar:** 1) enviar el formulario vacío: aparece el resumen con un enlace por campo, el foco va al resumen y cada campo muestra su mensaje. 2) Llenar todo con un correo sin @ y enviar: solo falla el correo y los demás datos se conservan. Con NVDA, el resumen se lee al recibir el foco y cada campo anuncia su error. axe no debe reportar errores en el formulario.
- **Evidencia sugerida:** `E17-antes.png` / `E17-despues.png` (formulario después de enviar con errores); video `videos/nvda-pqrs-antes.mp4` / `videos/nvda-pqrs-despues.mp4`.

### E18 · La sesión expira sin aviso

- **Problema en antes/:** a los 2 minutos el formulario se vacía sin avisar y sin opción de pedir más tiempo.
- **Criterio:** WCAG 2.2.1 Tiempo ajustable (A).

**Código antes** (`antes/js/main.js`):

```js
/* E18: la sesión del formulario PQRS expira a los 2 minutos sin aviso */
const TIEMPO_SESION_MS = 120000;
…
/* E18: a los 2 minutos se borra el formulario sin avisar ni permitir extender el tiempo */
setTimeout(function () {
  vaciarFormulario();
}, TIEMPO_SESION_MS);
```

**Código después** (`despues/js/pqrs.js` y `despues/pqrs.html`):

```js
/* E18 corregido: la sesión dura 2 minutos y se avisa 1 minuto antes de que expire */
const TIEMPO_SESION_MS = 120000;
const AVISO_ANTES_MS = 60000;
…
/* E18 corregido: aviso accesible (role="alertdialog") y el foco pasa al botón "Necesito más tiempo" */
function mostrarAviso() {
  focoPrevio = document.activeElement;
  …
  abrirAviso();
  botonMasTiempo.focus();
}
```

```html
<dialog class="aviso-sesion" id="aviso-sesion" role="alertdialog" aria-labelledby="titulo-aviso-sesion" aria-describedby="texto-aviso-sesion">
```

- **Cómo verificar:** para no esperar 2 minutos, en una copia local cambiar las constantes a `20000` y `10000` (no subir ese cambio). A los 10 s aparece el aviso con el foco en «Necesito más tiempo»; al pulsarlo, el aviso se cierra, el foco vuelve al campo donde estaba y el tiempo se reinicia. Con NVDA, el aviso se lee al abrirse.
- **Evidencia sugerida:** `E18-antes.png` / `E18-despues.png` (formulario vacío tras expirar / aviso abierto); video `videos/sesion-pqrs-despues.mp4`.

### E19 · Sin confirmación al enviar

- **Problema en antes/:** al enviar un formulario válido, los campos se vacían y no aparece ningún mensaje: no hay número de radicado ni plazo, y la persona no sabe si su solicitud llegó.
- **Criterio:** WCAG 4.1.3 Mensajes de estado (AA); Nielsen 1 (visibilidad del estado del sistema).

**Código antes** (`antes/js/main.js`):

```js
} else {
  /* E19: el formulario se vacía sin confirmación, sin radicado ni plazo */
  mensajeError.style.display = 'none';
  vaciarFormulario();
}
```

**Código después** (`despues/pqrs.html` y `despues/js/pqrs.js`):

```html
<!-- E19 corregido: confirmación anunciada con role="status"; pqrs.js la llena al enviar -->
<div class="confirmacion" id="confirmacion" role="status"></div>
```

```js
/* E19 corregido: confirmación con radicado, resumen y plazo; se anuncia con role="status" y el foco va al título */
function mostrarConfirmacion() {
  const radicado = generarRadicado();          // VC-2026-NNNNNN
  …
  pPlazo.textContent = 'Recibirás respuesta en un plazo máximo de ' + PLAZO_DIAS_HABILES +
    ' días hábiles, según la Ley 1755 de 2015. …';
  …
  titulo.focus();
}
```

- **Cómo verificar:** enviar el formulario completo: aparece «Tu solicitud fue radicada» con el número de radicado (formato VC-2026-000123), el resumen de lo enviado y el plazo de 15 días hábiles. Con NVDA se lee la confirmación. Tarea T2 de la prueba con usuarios («Radica una queja…»).
- **Evidencia sugerida:** `E19-antes.png` / `E19-despues.png` (pantalla después de enviar); video `videos/nvda-pqrs-despues.mp4`.

### E20 · Acordeón hecho con `div onclick`

- **Problema en antes/:** las preguntas frecuentes son `div` con `onclick`. No reciben foco con Tab, no se abren con teclado y el lector de pantalla no sabe que se pueden desplegar ni si están abiertas.
- **Criterio:** WCAG 2.1.1 Teclado (A), 4.1.2 Nombre, función, valor (A).

**Código antes** (`antes/faq.html` y `antes/js/main.js`):

```html
<!-- E20: pregunta con div onclick, no se puede abrir con el teclado -->
<div class="faq-pregunta" onclick="abrirPregunta(this)">¿Cuánto tarda la respuesta?</div>
<div class="faq-respuesta">Las peticiones se responden en máximo 15 días hábiles, …</div>
```

```js
/* E20: acordeón con div onclick, no se puede abrir con el teclado */
function abrirPregunta(elemento) {
  elemento.parentNode.classList.toggle('abierta');
}
```

**Código después** (`despues/faq.html`, sin JavaScript):

```html
<!-- E20 corregido: acordeón nativo con details/summary; abre y cierra con Enter, Espacio y clic -->
<details class="acordeon-item">
  <summary>¿Cuánto tarda la respuesta?</summary>
  <div class="acordeon-respuesta">
    <p>Las peticiones se responden en máximo 15 días hábiles, según la Ley 1755 de 2015. …</p>
  </div>
</details>
```

- **Cómo verificar:** solo con teclado: Tab llega a cada pregunta; Enter y Espacio la abren y la cierran. Con NVDA se anuncia «¿Cuánto tarda la respuesta?, contraído» y, al abrir, «expandido». Tarea T5 de la prueba con usuarios.
- **Evidencia sugerida:** `E20-antes.png` / `E20-despues.png` (pregunta enfocada y abierta con teclado); video `videos/teclado-faq-antes.mp4` / `videos/teclado-faq-despues.mp4`.

### E21 · Enlaces «Descargar» sin formato ni tamaño; PDF escaneados

- **Problema en antes/:** los 6 enlaces de la página de Descargas dicen solo «Descargar». No indican qué documento es, en qué formato está ni cuánto pesa. Además, los PDF de `antes/docs/` son imágenes escaneadas (de 106 a 190 KB) sin texto real, así que el lector de pantalla no los puede leer.
- **Criterio:** WCAG 2.4.4 Propósito de los enlaces (A), 1.1.1 Contenido no textual (A).

**Código antes** (`antes/descargas.html`):

```html
<div class="fila">
  <div class="celda col-doc">Formato de PQRS para radicación presencial</div>
  <div class="celda col-cat">Atención al ciudadano</div>
  <!-- E21: enlace "Descargar" sin formato ni tamaño -->
  <div class="celda col-acc"><a href="docs/formato-pqrs-presencial.pdf">Descargar</a></div>
</div>
```

**Código después** (`despues/descargas.html`):

```html
<tr>
  <th scope="row">Formato de PQRS para radicación presencial</th>
  <td>Atención al ciudadano</td>
  <td>PDF, 60 KB, 2 páginas</td>
  <!-- E21 corregido: enlace descriptivo con formato, tamaño y páginas -->
  <td><a href="docs/formato-pqrs-presencial.pdf">Descargar formato de PQRS (PDF, 60 KB, 2 páginas)</a></td>
</tr>
```

Los PDF de `despues/docs/` tienen texto real y etiquetas, y pesan de 53 a 69 KB.

- **Cómo verificar:** lista de enlaces de NVDA (Insertar+F7): en antes aparecen 6 «Descargar» iguales. Abrir cada PDF y tratar de seleccionar texto, o revisarlo con el comprobador de accesibilidad de Adobe Acrobat o con PAC: los de antes no tienen texto; los de después sí. Tarea T3 de la prueba con usuarios («Descarga el formato de permiso de espacio público y di qué tamaño tiene»).
- **Evidencia sugerida:** `E21-antes.png` / `E21-despues.png` (lista de enlaces de NVDA); `E21-pdf-antes.png` / `E21-pdf-despues.png` (resultado del comprobador de PDF).

### E22 · Tabla armada con `div`

- **Problema en antes/:** la tabla de documentos es una rejilla de `div` con estilos. El lector de pantalla no la anuncia como tabla, no se puede recorrer por filas y columnas, y las celdas no se relacionan con sus encabezados.
- **Criterio:** WCAG 1.3.1 Información y relaciones (A).

**Código antes** (`antes/descargas.html`):

```html
<!-- E22: tabla armada con div, sin table, caption ni th -->
<div class="tabla-div">
  <div class="fila fila-titulos">
    <div class="celda col-doc">Documento</div>
    <div class="celda col-cat">Categoría</div>
    <div class="celda col-acc"></div>
  </div>
  …
</div>
```

**Código después** (`despues/descargas.html`):

```html
<!-- E22 corregido: tabla real con caption y encabezados th con scope -->
<table class="tabla tabla-descargas">
  <caption id="titulo-tabla-descargas"><span class="caption-fijo">Documentos disponibles para descargar</span></caption>
  <thead>
    <tr>
      <th scope="col">Documento</th>
      <th scope="col">Categoría</th>
      <th scope="col">Formato y tamaño</th>
      <th scope="col">Descarga</th>
    </tr>
  </thead>
  <tbody> <tr> <th scope="row">Formato de solicitud de certificado de residencia</th> … </tr> … </tbody>
</table>
```

- **Cómo verificar:** con NVDA, la tecla T salta a la tabla («Documentos disponibles para descargar, tabla con 7 filas y 4 columnas»); con Ctrl+Alt+flechas, cada celda se lee junto con su encabezado de fila y de columna. Vista de estructura de WAVE.
- **Evidencia sugerida:** `E22-antes.png` / `E22-despues.png` (vista de estructura de WAVE); video `videos/nvda-descargas-antes.mp4` / `videos/nvda-descargas-despues.mp4`.

## c) Mejoras adicionales

Estas mejoras no están en el catálogo de 22 errores, pero forman parte de la versión después.

- **Declaración de accesibilidad** (`despues/accesibilidad.html`): nivel de conformidad buscado (WCAG 2.1 AA), qué se probó, limitaciones conocidas, fecha de la última revisión, cómo reportar un problema (enlace a PQRS) y marco normativo. Se enlaza desde el pie de todas las páginas. Debe actualizarse con los resultados de la auditoría de la versión después.
- **Preferencias de tamaño de texto y alto contraste** (`despues/js/preferencias.js`): botones «Aumentar texto», «Restablecer texto» y «Alto contraste» en la barra superior de las 8 páginas. El tamaño sube por pasos hasta 150 %; el alto contraste usa fondo negro, texto blanco y enlaces en amarillo. El botón de contraste informa su estado con `aria-pressed` y cada cambio se anuncia en una región `role="status"`. La preferencia se guarda en `localStorage` dentro de `try/catch`, así que la página funciona aunque el navegador bloquee el almacenamiento. Sin JavaScript, los botones no se muestran.
- **Filtro de trámites** (`despues/js/tramites.js`): campo «Buscar trámite» que filtra el catálogo sin distinguir tildes ni mayúsculas, y anuncia en una región `role="status"` cuántos trámites coinciden. Espera una pausa al escribir para no saturar al lector de pantalla (Nielsen 7: flexibilidad y eficiencia).
- **PDF accesibles** (`despues/docs/`): los 6 documentos tienen texto real y etiquetas, en lugar de imágenes escaneadas, y la página de descargas informa su formato, tamaño y número de páginas.
- **Consistencia en el tono, «tú» en todo el sitio** (Nielsen 4: consistencia y estándares): las respuestas de preguntas frecuentes de la versión antes usaban «usted» («Comuníquese…», «marque la casilla…»), mientras el resto del sitio habla de «tú». En después se unificaron a «tú» sin cambiar la información de ninguna respuesta.
- **Lenguaje ciudadano** (Nielsen 2: relación con el mundo real): el título «Expedición de certificación de residencia» pasó a «Certificado de residencia», con la frase «Pide tu certificado de residencia».
- **Control y libertad** (Nielsen 3): botón «Volver al catálogo de trámites» en el detalle del trámite, botón «Quitar archivo» en el adjunto del PQRS y la tecla Escape en el aviso de sesión, que pide más tiempo en lugar de dejar que la sesión expire.
- **Prevención de errores en el PQRS** (Nielsen 5): ejemplos de formato en cada campo (por ejemplo, «Ej.: nombre@correo.com»), límites del adjunto (PDF o JPG, máximo 5 MB) informados antes de subir y validados al elegir el archivo, y un contador de caracteres de la descripción que avisa al lector de pantalla cuando quedan 100, 50 y 0 caracteres.
- **Envío anónimo coherente:** al marcar «Enviar de forma anónima» se ocultan los datos personales y el medio de respuesta, y se explica que la respuesta se publicará en la cartelera de la alcaldía.
- **Movimiento reducido:** con la preferencia del sistema «reducir movimiento», se desactivan las transiciones (`prefers-reduced-motion`).
- **Áreas de clic de 44 × 44 px** en enlaces del menú, botones, casillas, opciones y enlaces de listas.
