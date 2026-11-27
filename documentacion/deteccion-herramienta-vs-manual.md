# Qué detectó la herramienta y qué solo la revisión manual

Clasificación de los 22 errores de `antes/` (E01–E22) según si los puede detectar **WAVE**, **Lighthouse** (categoría Accesibilidad, que usa reglas de axe-core) o **solo la revisión manual** (teclado, lector de pantalla, zoom o lectura del contenido).

## Cómo se hizo esta clasificación

- Cada marca se basa en **qué reglas tiene cada herramienta** y en el código de `antes/` que esas reglas revisarían.
- **El repositorio todavía no tiene capturas de WAVE ni de Lighthouse** (`documentacion/capturas/` y `documentacion/reportes/` están vacías). Por eso ninguna marca sale de una captura.
- Cuando no estamos seguros de que la herramienta lo marque, dice **«Por verificar»**. Hay que confirmarlo abriendo la página con la herramienta y guardar la captura.
- WAVE distingue **errores** (rojo) de **alertas** (amarillo). Se indica cuál de los dos es, porque una alerta no cuenta en el total de errores.
- Lighthouse solo se pasó en Inicio. Lo que Lighthouse pueda detectar en otras páginas no aparece en el puntaje que reportamos.

**Símbolos:** **Sí** = la herramienta lo marca. **No** = la herramienta no tiene una regla para ese problema. **Por verificar** = puede marcarlo, pero falta confirmarlo.

## Tabla

| Código | Error en `antes/` | WAVE | Lighthouse | Solo manual | Cómo se detecta a mano |
|---|---|---|---|---|---|
| E01 | `<html>` sin `lang` | **Sí** (error «Language missing or invalid») | **Sí** (`html-has-lang`) | — | Lector de pantalla (NVDA lee con reglas de otro idioma) |
| E02 | Todo con `div`, sin regiones ni jerarquía de encabezados | **Sí, como alertas** («Missing first level heading», «Skipped heading level», «No page regions»), no como errores | Por verificar (`heading-order`) | En parte: que un título visual sea un `div` solo se ve leyendo el código o con NVDA (tecla H) | Lector de pantalla, vista de estructura |
| E03 | Sin enlace para saltar al contenido | No | Por verificar: la regla `bypass` se da por cumplida si la página tiene algún encabezado, y el Inicio de `antes/` tiene `h4` | **Sí** | Teclado (primer Tab) |
| E04 | Texto `#AAAAAA` y enlaces `#4FC3F7` sobre blanco | **Sí** (errores «Very low contrast») | **Sí** (`color-contrast`) | — | Verificador de contraste ([calculo-contraste.md](calculo-contraste.md)) |
| E05 | `outline: none`, el foco no se ve | No | No (la revisión del foco visible es manual) | **Sí** | Teclado |
| E06 | Submenú que solo abre con `:hover` | No | No | **Sí** | Teclado |
| E07 | Todas las pestañas se titulan «Inicio» | No (solo revisa que exista un título) | No (`document-title` solo revisa que exista) | **Sí** | Lectura del contenido (comparar pestañas), NVDA (Insertar+T) |
| E08 | Ancho fijo de 1200 px | No | No (la categoría Accesibilidad no lo mide; la etiqueta `viewport` existe y pasa) | **Sí** | Zoom al 400 % o vista de 320 px |
| E09 | Enlaces «Clic aquí» y «Ver más» | Por verificar: alerta «Suspicious link text» (su lista de palabras está en inglés) y alerta «Redundant link» | No en Accesibilidad (`link-name` acepta cualquier texto). Por verificar en la categoría SEO (`link-text`) | En parte | Lector de pantalla (lista de enlaces, Insertar+F7) |
| E10 | Imágenes sin `alt` y texto del banner dentro de la imagen | **Sí** (errores «Missing alternative text», «Linked image missing alternative text», «Empty link») | **Sí** (`image-alt`, `link-name`) | El texto dentro de la imagen (WCAG 1.4.5) solo se detecta a mano | Lectura del contenido, lector de pantalla |
| E11 | Carrusel automático sin pausa | No | No | **Sí** | Observar la página 10 segundos |
| E12 | Categoría de la noticia solo por color | No | No | **Sí** | Lectura del contenido, emulación de acromatopsia en DevTools, NVDA |
| E13 | Todo el trámite en un solo párrafo | Por verificar: alerta «Justified text» por el `text-align: justify`. No detecta la falta de secciones | No | **Sí** | Lectura del contenido (evaluación heurística) |
| E14 | Sin migas de pan ni página actual marcada | No | No | **Sí** | Lectura del contenido, NVDA |
| E15 | Campos sin `label`, solo con placeholder | **Sí** (error «Missing form label») en casillas, opciones, listas y archivo. Por verificar en los campos de texto con placeholder | **Sí** (`label`, `select-name`) en casillas, opciones, listas y archivo. Por verificar en los campos con placeholder (axe puede aceptar el placeholder como nombre) | Que la etiqueta desaparezca al escribir solo se ve a mano | Lector de pantalla, uso del formulario |
| E16 | Obligatorios marcados solo en rojo | No (como uso del color). WAVE puede marcar el texto rojo `#E53935` por contraste (4.23:1), pero es otro problema | No | **Sí** | Emulación de acromatopsia, NVDA |
| E17 | «Formulario inválido» y datos borrados | No (ocurre al enviar) | No | **Sí** | Enviar el formulario con errores |
| E18 | La sesión expira a los 2 minutos sin aviso | No | No | **Sí** | Esperar 2 minutos con el formulario abierto |
| E19 | Sin confirmación al enviar | No | No | **Sí** | Enviar el formulario completo |
| E20 | Acordeón con `div onclick` | No | No | **Sí** | Teclado, NVDA |
| E21 | Enlaces «Descargar» sin formato ni tamaño; PDF escaneados | Por verificar: alerta «Link to PDF document». Señala que es un PDF, no que falte información | No | **Sí** (el PDF escaneado requiere abrirlo, PAC o Acrobat) | Lector de pantalla (lista de enlaces), seleccionar texto del PDF |
| E22 | Tabla armada con `div` | No | No | **Sí** | NVDA (tecla T), vista de estructura |

## Resumen

| Quién lo detecta | Errores | Cantidad |
|---|---|---|
| WAVE y Lighthouse | E01, E04, E10, E15 (en parte) | 4 |
| Solo WAVE, como alertas | E02; y por verificar E09, E13 y E21 | 1 seguro, 3 por verificar |
| Solo revisión manual | E03, E05, E06, E07, E08, E11, E12, E14, E16, E17, E18, E19, E20, E22 | 14 |

**Conclusión:** las herramientas automáticas detectan con seguridad 4 de los 22 errores como errores (E01, E04, E10 y E15) y E02 como alertas de WAVE. Los problemas de interacción (teclado, tiempo, mensajes al enviar), de comprensión del contenido (párrafo único, títulos repetidos, color como única señal) y de adaptación (zoom) solo aparecen con revisión manual. Por eso «0 errores en WAVE» y «100 en Lighthouse» en `despues/` no bastan por sí solos para decir que el sitio es accesible.

## Pendiente para cerrar este documento

- [ ] Abrir cada página de `antes/` con WAVE y guardar la captura en `documentacion/capturas/antes/` (por ejemplo `E02-antes.png`, `E09-antes.png`).
- [ ] Guardar el reporte de Lighthouse de Inicio en `documentacion/reportes/`.
- [ ] Cambiar cada «Por verificar» por «Sí» o «No» según la captura.
