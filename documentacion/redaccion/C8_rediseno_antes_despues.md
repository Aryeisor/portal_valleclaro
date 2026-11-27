# C8 · Rediseño antes/después: PQRS y trámite de certificado de residencia

Comparativa de dos secciones críticas del portal: el formulario de **PQRS** (`pqrs.html`) y el **detalle del trámite de certificado de residencia** (`tramite-certificado-residencia.html`). Referencia completa de los 22 errores en [`cambios-antes-despues.md`](../cambios-antes-despues.md).

## 1. PQRS (`pqrs.html`)

### Resumen del problema en el "antes"

El formulario de PQRS en `antes/pqrs.html` tiene barreras reales para una persona con baja visión o que usa lector de pantalla o teclado:

- **E15** – Los campos solo tienen `placeholder` (por ejemplo `placeholder="Nombres"`), no `<label>`. Al escribir, el texto de ayuda desaparece, y los radios y la casilla ("Tipo de persona", "Enviar de forma anónima") no tienen el texto asociado al control. Criterio: WCAG 1.3.1, 3.3.2, 4.1.2 (A).
- **E16** – Lo único que marca un campo como obligatorio es el borde rojo (`class="obligatorio"`, `border-color: #E53935`) o texto rojo en los grupos de opciones. Quien no distingue el rojo no se entera. Criterio: WCAG 1.4.1, 3.3.2 (A).
- **E17** – Si falta un dato, aparece arriba un único mensaje genérico ("Formulario inválido") y **se borra todo lo escrito** (`vaciarFormulario()` en `js/main.js`). No dice qué campo falla. Criterio: WCAG 3.3.1 (A), 3.3.3 (AA); Nielsen 5 y 9.
- **E18** – La sesión expira a los 2 minutos y el formulario se vacía sin ningún aviso ni opción de pedir más tiempo. Criterio: WCAG 2.2.1 (A).
- **E19** – Al enviar correctamente no hay confirmación: el formulario se vacía sin radicado ni plazo, y la persona no sabe si su solicitud llegó. Criterio: WCAG 4.1.3 (AA); Nielsen 1.

A esto se suman los errores comunes a todas las páginas que también afectan a PQRS: sin `lang` (E01), estructura hecha con `div` en vez de `header`/`nav`/`main`/`footer` (E02), sin enlace para saltar al contenido (E03), pestaña titulada "Inicio" (E07), logo sin `alt` (E10), menú sin marcar la página actual ni migas de pan (E14), y enlaces "clic aquí" en el pie (E09).

### Tabla de cambios

| Problema | Antes (código real) | Después (código real) | Criterio WCAG | Nivel | Commit |
|---|---|---|---|---|---|
| E15 — campos sin label | `antes/pqrs.html:96`<br>`<input type="text" id="nombres" name="nombres" placeholder="Nombres" class="obligatorio">` | `despues/pqrs.html:194-196`<br>`<label for="nombres">Nombres <span class="obligatorio">…</span></label>`<br>`<input type="text" id="nombres" name="nombres" autocomplete="given-name">` | 1.3.1, 3.3.2, 4.1.2 (A) | A | `7ffad21` fix(E15-E19) |
| E16 — obligatorio solo en rojo | `antes/pqrs.html:85-96` (clase `obligatorio` con borde rojo, sin texto) | `despues/pqrs.html:137` y `:172`<br>`<p class="nota-obligatorios">Los campos con * son obligatorios.</p>`<br>`<span class="obligatorio"><span aria-hidden="true">*</span> (obligatorio)</span>` | 1.4.1, 3.3.2 (A) | A | `7ffad21` fix(E15-E19) |
| E17 — error genérico, datos borrados | `antes/pqrs.html:62-63`<br>`<div class="mensaje-error" id="mensaje-error">Formulario inválido</div>` (y `vaciarFormulario()` en `js/main.js`) | `despues/pqrs.html:131-134`<br>`<div class="resumen-errores" id="resumen-errores" tabindex="-1" aria-labelledby="titulo-resumen" hidden><h2 id="titulo-resumen">Revisa los campos marcados antes de enviar</h2>…</div>`, mensaje por campo con `aria-invalid`/`aria-describedby` en `js/pqrs.js` | 3.3.1 (A), 3.3.3 (AA) | A/AA | `7ffad21` fix(E15-E19) |
| E18 — sesión expira sin aviso | `antes/js/main.js`<br>`const TIEMPO_SESION_MS = 120000;` → `setTimeout(vaciarFormulario, TIEMPO_SESION_MS)` | `despues/pqrs.html:306-311`<br>`<dialog class="aviso-sesion" role="alertdialog" aria-labelledby="titulo-aviso-sesion" …><button id="mas-tiempo">Necesito más tiempo</button></dialog>` | 2.2.1 (A) | A | `7ffad21` fix(E15-E19); ampliado a sesión de 20 min en `219c100` B7 |
| E19 — sin confirmación al enviar | `antes/js/main.js`<br>`mensajeError.style.display = 'none'; vaciarFormulario();` (sin radicado) | `despues/pqrs.html:303`<br>`<div class="confirmacion" id="confirmacion" role="status"></div>`, llenado en `js/pqrs.js` con número de radicado (`VC-2026-NNNNNN`) y plazo | 4.1.3 (AA) | AA | `7ffad21` fix(E15-E19) |
| E01/E02/E03/E07/E09 (comunes) | `antes/pqrs.html:3,8,13-20,174-195` (sin `lang`, `<title>Inicio</title>`, todo en `div`, "clic aquí") | `despues/pqrs.html:3,8,17-21,336-338` (`<html lang="es">`, título propio, `header`/`nav`/`main`/`footer`, enlaces descriptivos) | 3.1.1, 1.3.1/2.4.6, 2.4.1, 2.4.2, 2.4.4 (A) | A | `d7ab149` fix(E01-E09) |
| E10 — logo sin alt | `antes/pqrs.html:24`<br>`<img src="img/logo.svg" width="380" height="96">` | `despues/pqrs.html:39`<br>`<img src="img/logo.svg" alt="" width="92" height="100">` + `<span class="marca-texto">Alcaldía de Valleclaro</span>` como texto real | 1.1.1, 1.4.5 (A/AA) | A/AA | `6ab21e7` fix(E10-E12) |
| E14 — sin migas de pan ni página actual | `antes/pqrs.html:34-49` (menú sin `aria-current`, sin migas) | `despues/pqrs.html:65,77-82`<br>`<a href="pqrs.html" aria-current="page">PQRS</a>`; `<nav class="migas" aria-label="Migas de pan">…</nav>` | 2.4.8 (AAA, buena práctica) | AAA | `316742c` fix(E13-E14) |

### Capturas

- `C8_pqrs_antes.png` — `antes/pqrs.html` a 1280 px: debe verse el formulario con placeholders (sin labels visibles), los bordes rojos como única marca de obligatorio y el mensaje "Formulario inválido" arriba.
- `C8_pqrs_despues.png` — `despues/pqrs.html` a 1280 px: debe verse el formulario con labels visibles, el asterisco + "(obligatorio)" en cada campo requerido, la nota "Los campos con * son obligatorios" y la estructura con encabezado/menú/migas de pan.

### Impacto en el usuario

Para **Rosalba Méndez** (baja visión), el "antes" es casi inoperable: sin labels persistentes no puede confirmar qué escribió en cada campo al alejarse del texto, y el borde rojo como única señal de "obligatorio" se pierde con su nivel de contraste. En el "después", el asterisco con texto "(obligatorio)" y los labels fijos le permiten revisar el formulario sin depender del color. Para una persona con discapacidad motora o cognitiva, el cambio más relevante es que en el "antes" un error hace que todo el formulario se vacíe —obligando a escribir todo de nuevo, un costo alto si usa un teclado adaptado o le toma más tiempo—, y la sesión de 2 minutos puede expirar sin aviso en medio del llenado; en el "después" el resumen de errores señala exactamente qué corregir sin perder lo ya escrito, y el aviso de sesión con el botón "Necesito más tiempo" evita perder el trabajo por una pausa.

---

## 2. Trámite: certificado de residencia (`tramite-certificado-residencia.html`)

### Resumen del problema en el "antes"

- **E13** – Todo el trámite (qué es, quién lo pide, requisitos, pasos, costo, tiempo) está en **un solo párrafo justificado** de unas 200 palabras (`antes/tramite-certificado-residencia.html:62`). El costo ("no tiene costo") y el plazo ("diez días hábiles") quedan escondidos a mitad del texto, sin resaltar. Criterio: Nielsen 6 (reconocer antes que recordar) y 8 (diseño minimalista); WCAG 1.3.1 (A).
- **E14** – No hay migas de pan ni el menú indica en qué página está la persona. Criterio: Nielsen 1; WCAG 2.4.8 (AAA).

A esto se suman los errores comunes: sin `lang` (E01), título "Inicio" (E07), estructura con `div` en vez de `header`/`main`/`footer` (E02), sin enlace para saltar al contenido (E03), enlaces "clic aquí"/"aquí" dentro del párrafo y en el pie (E09), y logo sin `alt` (E10).

### Tabla de cambios

| Problema | Antes (código real) | Después (código real) | Criterio WCAG | Nivel | Commit |
|---|---|---|---|---|---|
| E13 — todo en un párrafo | `antes/tramite-certificado-residencia.html:62`<br>`<p class="parrafo-largo">El certificado de residencia es el documento … se informa que el trámite no tiene costo y que la respuesta se da en un plazo de hasta diez días hábiles …</p>` | `despues/tramite-certificado-residencia.html:90-153`<br>7 secciones con `<h2>`: "Qué es", "Quién lo puede pedir", "Requisitos" (`<ul>`), "Costo y tiempo" (`<dl class="datos-destacados">` con `Gratuito` / `Hasta 10 días hábiles`), "Paso a paso" (`<ol class="pasos">`), "Descargas", "¿Tienes dudas?" | Nielsen 6, 8; 1.3.1 (A) | A | `316742c` fix(E13-E14) |
| E14 — sin migas de pan ni página actual | `antes/tramite-certificado-residencia.html:34-49` (sin `aria-current`); sin bloque de migas | `despues/tramite-certificado-residencia.html:59,76-82`<br>`<a href="tramite-certificado-residencia.html" aria-current="page">Certificado de residencia</a>` dentro del submenú; `<nav class="migas" aria-label="Migas de pan"><ol><li>Inicio</li><li>Trámites</li><li aria-current="page">Certificado de residencia</li></ol></nav>` | Nielsen 1; 2.4.8 (AAA) | AAA | `316742c` fix(E13-E14) |
| E09 — enlaces "clic aquí"/"aquí" | `antes/tramite-certificado-residencia.html:62`<br>`<a href="docs/formato-certificado-residencia.pdf">haciendo clic aquí</a>` … `<a href="faq.html">aquí</a>` … `<a href="pqrs.html">aquí</a>` | `despues/tramite-certificado-residencia.html:137,145-146`<br>`<a href="docs/formato-certificado-residencia.pdf">Descargar formato de solicitud de certificado de residencia (PDF, 60 KB, 2 páginas)</a>`; `<a href="faq.html#preguntas-tramites">Consulta las preguntas frecuentes sobre trámites</a>`; `<a href="pqrs.html">Radica una PQRS si necesitas orientación</a>` | 2.4.4 (A) | A | `d7ab149` fix(E01-E09) |
| E01/E02/E03/E07 (comunes) | `antes/tramite-certificado-residencia.html:3,8,13-20` (sin `lang`, `<title>Inicio</title>`, todo en `div`) | `despues/tramite-certificado-residencia.html:3,8,17-20` (`<html lang="es">`, `<title>Certificado de residencia – Alcaldía de Valleclaro</title>`, `header`/`main`/`footer`, enlace "Saltar al contenido principal") | 3.1.1, 1.3.1/2.4.6, 2.4.1, 2.4.2 (A) | A | `d7ab149` fix(E01-E09) |
| E10 — logo sin alt | `antes/tramite-certificado-residencia.html:24`<br>`<img src="img/logo.svg" width="380" height="96">` | `despues/tramite-certificado-residencia.html:38`<br>`<img src="img/logo.svg" alt="" width="92" height="100">` + nombre como texto real | 1.1.1, 1.4.5 (A/AA) | A/AA | `6ab21e7` fix(E10-E12) |

### Capturas

- `C8_tramite_antes.png` — `antes/tramite-certificado-residencia.html` a 1280 px: debe verse el título "Expedición de certificación de residencia" y el único párrafo largo, sin secciones, sin lista de requisitos ni recuadro de costo/tiempo.
- `C8_tramite_despues.png` — `despues/tramite-certificado-residencia.html` a 1280 px: debe verse el título "Certificado de residencia", las migas de pan (Inicio > Trámites > Certificado de residencia), y las secciones separadas con `h2`, incluido el recuadro destacado de "Costo y tiempo" (Gratuito / Hasta 10 días hábiles).

### Impacto en el usuario

Para **Rosalba Méndez** (baja visión), un párrafo largo y justificado es más difícil de escanear: con zoom alto, las líneas se alargan y pierde la referencia de dónde quedó leyendo, y el dato que más necesita (si el trámite tiene costo y cuánto tarda) queda enterrado a mitad del texto. En el "después", el recuadro de "Costo y tiempo" con `<dl>` le permite ubicar ese dato de un vistazo, sin depender de leer todo el párrafo. Para una persona con discapacidad cognitiva, dividir el trámite en secciones con encabezados y una lista numerada de pasos reduce la carga de memoria: no necesita retener todo el procedimiento en la cabeza, puede volver a una sección puntual (por ejemplo "Requisitos") sin releer el resto, y las migas de pan le confirman en todo momento dónde está dentro del sitio.

---

## Notas de verificación

- Los commits se identificaron con `git log` sobre `despues/pqrs.html` y `despues/tramite-certificado-residencia.html`; están confirmados contra el historial real del repositorio, no inventados.
- Las 4 capturas se tomaron con Playwright contra el Live Server del usuario (`http://127.0.0.1:5500`), con el viewport a 1280 px de ancho, página completa (`fullPage`): `capturas/antes/C8_pqrs_antes.png`, `capturas/despues/C8_pqrs_despues.png`, `capturas/antes/C8_tramite_antes.png`, `capturas/despues/C8_tramite_despues.png`.
