# Portal Alcaldía de Valleclaro – Proyecto de Accesibilidad y Usabilidad

Proyecto académico de la materia **Accesibilidad y Usabilidad**. Se construyó el portal web de una alcaldía ficticia, la **Alcaldía Municipal de Valleclaro**, en dos versiones con el mismo contenido:

- **`antes/`**: tiene **22 errores de accesibilidad y usabilidad sembrados a propósito**, como los de un sitio hecho con prisa.
- **`despues/`**: corrige esos 22 errores uno por uno y agrega una declaración de accesibilidad.

El objetivo es demostrar, con evidencia medible, cómo mejora un portal de servicios al ciudadano cuando se aplican las pautas **WCAG 2.1 nivel AA** y las **10 heurísticas de usabilidad de Nielsen**.

> Valleclaro es un municipio inventado. Todos los datos (dirección, teléfonos, trámites, noticias, documentos) son ficticios y no imitan a ninguna entidad real.

## Contenido

- [Cómo abrir el proyecto](#cómo-abrir-el-proyecto)
- [Páginas del portal](#páginas-del-portal)
- [Los 22 errores](#los-22-errores)
- [Qué mejora en la versión después](#qué-mejora-en-la-versión-después)
- [Cómo comparar las dos versiones](#cómo-comparar-las-dos-versiones)
- [Evaluación](#evaluación)
- [Marco normativo](#marco-normativo)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Convenciones](#convenciones)
- [Integrantes](#integrantes)

## Cómo abrir el proyecto

No necesita servidor, base de datos ni instalación: es HTML, CSS y JavaScript puro.

1. Clona o descarga el repositorio:

   ```bash
   git clone https://github.com/Aryeisor/portal_valleclaro.git
   ```

2. Abre `index.html` (la portada del proyecto) en el navegador. Desde ahí se entra a cada versión.

También se pueden abrir directamente `antes/index.html` o `despues/index.html`.

El sitio está pensado para publicarse en GitHub Pages desde la rama `main`; las dos versiones quedan en `/antes/` y `/despues/` del mismo enlace.

**Fuera de alcance:** inicio de sesión, base de datos, pagos en línea y envío real de correos. El formulario PQRS simula el envío con JavaScript y genera un número de radicado ficticio (por ejemplo `VC-2026-000123`).

## Páginas del portal

| Página | Archivo | Qué contiene |
| --- | --- | --- |
| Inicio | `index.html` | Banner del impuesto predial, accesos rápidos, últimas noticias y canales de atención |
| Noticias | `noticias.html` | 6 noticias ficticias con fecha, categoría y resumen |
| Trámites | `tramites.html` | Catálogo de 6 trámites con costo y tiempo de respuesta |
| Detalle del trámite | `tramite-certificado-residencia.html` | Certificado de residencia: requisitos, costo, pasos y descargas (página clave de usabilidad) |
| PQRS | `pqrs.html` | Formulario de peticiones, quejas, reclamos, sugerencias y denuncias (página clave de accesibilidad) |
| Preguntas frecuentes | `faq.html` | 10 preguntas en 4 categorías, en acordeón |
| Descargas | `descargas.html` | Tabla con 6 documentos PDF |
| Declaración de accesibilidad | `accesibilidad.html` | Solo en `despues/`: nivel de conformidad, qué se probó, limitaciones y cómo reportar un problema |

## Los 22 errores

Cada error tiene un código de **E01 a E22**. Ese código aparece en el código fuente, en las capturas y en el documento, para que todo se pueda rastrear.

| Código | Dónde | Error en `antes/` | Corrección en `despues/` | Criterio |
| --- | --- | --- | --- | --- |
| E01 | Todas | `<html>` sin atributo `lang` | `<html lang="es">` | WCAG 3.1.1 (A) |
| E02 | Todas | Todo con `<div>`, sin regiones ni jerarquía de encabezados | `header`, `nav`, `main`, `footer`; un `h1` y orden h2–h3 | WCAG 1.3.1 (A), 2.4.6 (AA) |
| E03 | Todas | Sin enlace para saltar al contenido | Enlace «Saltar al contenido principal» | WCAG 2.4.1 (A) |
| E04 | Todas | Texto gris `#AAAAAA` sobre blanco (2.3:1) | Texto `#1A1A1A`, mínimo 4.5:1 | WCAG 1.4.3 (AA) |
| E05 | Todas | `outline: none`, el foco no se ve | Foco visible de 3 px | WCAG 2.4.7 (AA) |
| E06 | Menú | Submenú que abre solo con el mouse | Botón con `aria-expanded`, abre con Enter y Espacio | WCAG 2.1.1 (A) |
| E07 | Todas | Todas las pestañas se titulan «Inicio» | Título único por página | WCAG 2.4.2 (A) |
| E08 | Todas | Ancho fijo de 1200 px | Diseño adaptable, sin scroll horizontal a 320 px | WCAG 1.4.10 (AA) |
| E09 | Todas | Enlaces «Clic aquí» y «Ver más» | Enlaces que dicen a dónde llevan | WCAG 2.4.4 (A) |
| E10 | Inicio | Imágenes sin `alt` y texto del banner dentro de la imagen | `alt` descriptivo (o vacío si es decorativa) y texto real | WCAG 1.1.1 (A), 1.4.5 (AA) |
| E11 | Inicio | Carrusel automático sin pausa | Banner estático | WCAG 2.2.2 (A) |
| E12 | Noticias | Categoría indicada solo por color | Etiqueta con el texto de la categoría | WCAG 1.4.1 (A) |
| E13 | Trámite | Todo el trámite en un solo párrafo | Secciones, requisitos en lista, pasos numerados, recuadro de costo y tiempo | Nielsen 6 y 8; WCAG 1.3.1 (A) |
| E14 | Trámite | Sin migas de pan ni página actual marcada | Migas de pan y `aria-current` en el menú | Nielsen 1; WCAG 2.4.8 (AAA) |
| E15 | PQRS | Campos sin `<label>`, solo con placeholder | `<label for>` visible en cada campo, grupos con `fieldset` | WCAG 1.3.1, 3.3.2, 4.1.2 (A) |
| E16 | PQRS | Obligatorios marcados solo en rojo | Asterisco más «(obligatorio)» y nota al inicio | WCAG 1.4.1, 3.3.2 (A) |
| E17 | PQRS | «Formulario inválido» arriba y se borran los datos | Mensaje junto a cada campo, resumen con enlaces, datos conservados | WCAG 3.3.1 (A), 3.3.3 (AA); Nielsen 5 y 9 |
| E18 | PQRS | La sesión expira sin aviso | Aviso previo con opción «Necesito más tiempo» | WCAG 2.2.1 (A) |
| E19 | PQRS | Sin confirmación tras enviar | Número de radicado, resumen y plazo, anunciados con `role="status"` | WCAG 4.1.3 (AA); Nielsen 1 |
| E20 | Preguntas frecuentes | Acordeón con `<div onclick>` | Acordeón operable con teclado | WCAG 2.1.1, 4.1.2 (A) |
| E21 | Descargas | Enlaces «Descargar» sin formato ni tamaño; PDF escaneados | «Formato de PQRS (PDF, 95 KB)»; PDF con texto real | WCAG 2.4.4 (A), 1.1.1 (A) |
| E22 | Descargas | Tabla armada con `<div>` | `<table>` con `<caption>` y `<th scope>` | WCAG 1.3.1 (A) |

La ficha completa de cada error (problema, criterio, código antes, código después, cómo verificarlo y evidencia sugerida) está en [`documentacion/cambios-antes-despues.md`](documentacion/cambios-antes-despues.md).

## Qué mejora en la versión después

Además de corregir los 22 errores, `despues/` incluye:

- **Declaración de accesibilidad** (`accesibilidad.html`), enlazada desde el pie de página.
- **Preferencias de lectura**: tamaño de texto y alto contraste (`js/preferencias.js`).
- **Filtro de trámites** para buscar por nombre (`js/tramites.js`).
- **PDF accesibles**, con texto real en lugar de imágenes escaneadas.
- **Paleta verificada** contra fondo blanco: azul institucional `#1F4E79` (8.7:1), texto `#1A1A1A` (17:1), rojo de error `#B00020` (7.3:1) y foco amarillo `#F9A825` con sombra oscura.
- **CSS organizado** en tres archivos (`base.css`, `componentes.css`, `formularios.css`), mobile-first y en unidades `rem` para que el zoom funcione.

## Cómo comparar las dos versiones

- Abre la misma página en las dos versiones e intenta usarla **solo con el teclado** (Tab, Enter, Espacio y Escape).
- Prueba el **formulario PQRS**: envíalo vacío, con un correo mal escrito y completo.
- Mira las páginas en el **celular** o con el **zoom del navegador al 200 %**.
- Busca un código de error (por ejemplo `E15`) en `antes/` y en `despues/` para ver el código exacto de cada versión.

## Evaluación

Las dos versiones se evalúan con las mismas herramientas, tareas y personas para que la comparación sea justa.

**Herramientas:** Lighthouse, WAVE, axe DevTools, WebAIM Contrast Checker, Validador W3C, navegación solo con teclado, lector de pantalla NVDA y zoom al 200 % / vista de celular.

**Prueba con usuarios** (3 a 5 personas; la mitad empieza por `antes/` y la otra mitad por `despues/`):

| Tarea | Descripción |
| --- | --- |
| T1 | Encuentra cuánto cuesta y cuánto tarda el certificado de residencia |
| T2 | Radica una queja por una lámpara de alumbrado dañada en tu calle |
| T3 | Descarga el formato de permiso de espacio público y di qué tamaño tiene |
| T4 | Averigua el horario de atención del Palacio Municipal |
| T5 | Encuentra en cuántos días deben responderte una petición |

Por tarea se mide éxito, tiempo y número de errores; al final de cada versión se aplica el cuestionario **SUS** (System Usability Scale). Además se hace una **evaluación heurística** con las 10 heurísticas de Nielsen y gravedad de 0 a 4.

La evidencia se guarda en `documentacion/` (capturas, reportes, pruebas con usuarios y videos).

## Marco normativo

- **Ley 1618 de 2013**: derechos de las personas con discapacidad, incluido el acceso a la información.
- **NTC 5854**: norma técnica colombiana de accesibilidad para páginas web.
- **Resolución 1519 de 2020 (MinTIC)**: lineamientos de accesibilidad web para entidades públicas, con WCAG 2.1 AA como referencia.
- **Ley 1712 de 2014**: transparencia y acceso a la información pública.
- **Ley 1755 de 2015**: derecho de petición y plazos de respuesta.
- **Ley 1581 de 2012**: tratamiento de datos personales (casilla de autorización del formulario PQRS).

## Estructura de carpetas

Cada versión es independiente: tiene sus propios estilos, scripts, imágenes y PDF. La duplicación es intencional, porque el CSS y los PDF de `antes/` son malos a propósito.

```
portal_valleclaro/
├── index.html                  ← portada del proyecto, enlaza a ambas versiones
├── README.md
├── antes/                      ← versión con los 22 errores
│   ├── index.html
│   ├── noticias.html
│   ├── tramites.html
│   ├── tramite-certificado-residencia.html
│   ├── pqrs.html
│   ├── faq.html
│   ├── descargas.html
│   ├── css/
│   │   └── estilos.css         ← un solo archivo, ancho fijo, outline: none
│   ├── js/
│   │   └── main.js             ← carrusel, menú por hover, acordeón con div, sesión sin aviso
│   ├── img/                    ← logo, banners con texto incrustado, imágenes de noticias
│   └── docs/                   ← PDF escaneados (imagen)
├── despues/                    ← versión corregida
│   ├── index.html
│   ├── noticias.html
│   ├── tramites.html
│   ├── tramite-certificado-residencia.html
│   ├── pqrs.html
│   ├── faq.html
│   ├── descargas.html
│   ├── accesibilidad.html      ← declaración de accesibilidad (nueva)
│   ├── css/
│   │   ├── base.css            ← variables de color, tipografía, foco
│   │   ├── componentes.css     ← encabezado, menú, tarjetas, botones, tabla, acordeón
│   │   └── formularios.css     ← campos, errores, avisos
│   ├── js/
│   │   ├── menu.js             ← submenú con teclado y aria-expanded
│   │   ├── pqrs.js             ← validación, mensajes de error, radicado, aviso de sesión
│   │   ├── tramites.js         ← filtro de trámites
│   │   └── preferencias.js     ← tamaño de texto y alto contraste
│   ├── img/                    ← banner sin texto incrustado
│   └── docs/                   ← PDF con texto real
└── documentacion/
    ├── cambios-antes-despues.md  ← ficha de cada error, E01 a E22
    ├── capturas/
    │   ├── antes/              ← E01-antes.png, E15-antes.png…
    │   └── despues/            ← E01-despues.png, E15-despues.png…
    ├── reportes/               ← Lighthouse, WAVE y axe de cada versión
    ├── pruebas-usuarios/       ← guion de tareas, resultados y cuestionarios SUS
    ├── redaccion/              ← documento escrito del proyecto
    └── videos/                 ← navegación con teclado y NVDA, antes y después
```

## Convenciones

- **Nombres de archivo** en minúsculas, con guiones, sin tildes, sin ñ y sin espacios.
- **Errores marcados en el código**: en `antes/` con un comentario como `<!-- E15: campo sin label -->` y en `despues/` con `<!-- E15 corregido: label asociado -->`.
- **Capturas** con el código del error y la versión: `E17-antes.png`, `E17-despues.png`, tomadas al mismo tamaño de ventana.
- **Commits** por corrección o grupo de correcciones, por ejemplo `fix(E15-E19): formulario PQRS accesible`. El historial de Git sirve como evidencia del proceso.

## Integrantes

Miguel Madariaga
Crishian Robles
Dani Carvajal
Sitio académico ficticio. Proyecto de Accesibilidad y Usabilidad.
