# Escenario de uso: Rosalba radica una queja por la lámpara dañada

> Escenario narrado con el arquetipo [Rosalba Méndez](persona.md) (no es una persona real). Describe cómo funciona cada versión según su código; **no es el resultado de una prueba con usuarios**. Los códigos E01–E22 remiten a [cambios-antes-despues.md](../cambios-antes-despues.md).

**Objetivo de Rosalba:** radicar una queja porque la lámpara del alumbrado público frente a su casa está dañada, y saber cuándo le responderán.

**Condiciones:** portátil con Chrome en una pantalla de 1366 px de ancho, zoom del navegador al 200 %, uso del mouse y a veces de Tab. Escribe despacio: llenar el formulario le toma más de 2 minutos.

## 1. Versión antes (`antes/`)

| Paso | Qué hace Rosalba | Qué pasa | Error |
|---|---|---|---|
| 1 | Abre el portal y amplía al 200 %. | La página mide al menos 1200 px de ancho fijos; al ampliarla no cabe en la ventana y aparece barra de desplazamiento horizontal. Tiene que moverse de lado a lado para leer cada línea. | E08 |
| 2 | Intenta leer la página de inicio. | El texto general es gris `#AAAAAA` sobre blanco (2.3:1) y de 14 px; la barra superior y el pie son de 12 px en el mismo gris. Le cuesta leer incluso ampliado. | E04 |
| 3 | Lee el banner principal. | El banner cambia solo cada 3 segundos y no se puede detener. El mensaje está dibujado dentro de la imagen; cuando va por la mitad, cambia. | E11, E10 |
| 4 | Busca cómo poner la queja. | Encuentra la tarjeta «Radicar una PQRS», pero el enlace dice «Clic aquí», en celeste `#4FC3F7` sin subrayar (2.0:1). Le cuesta verlo y no está segura de que sea un enlace. | E09, E04 |
| 5 | Entra al formulario. | Los campos no tienen etiqueta, solo texto de ejemplo dentro del cuadro (placeholder). En cuanto escribe en «Nombres», el texto de ayuda desaparece; al volver a revisar no sabe qué iba en cada cuadro. | E15 |
| 6 | Trata de saber qué es obligatorio. | Lo único que lo indica es un borde rojo en los cuadros y texto rojo en los grupos de opciones. No hay asterisco ni la palabra «obligatorio». | E16 |
| 7 | Pasa de un campo a otro con Tab. | El foco del teclado no se ve: no sabe en qué cuadro está escribiendo. | E05 |
| 8 | Sigue escribiendo la descripción. | **Bloqueo 1:** a los 2 minutos de abrir la página el formulario se vacía, sin aviso y sin opción de pedir más tiempo. Pierde todo lo escrito. | E18 |
| 9 | Vuelve a empezar, más rápido, y envía. Escribió mal el correo. | **Bloqueo 2:** aparece arriba «Formulario inválido», sin decir qué campo falla, y se borra todo lo que escribió. | E17 |
| 10 | Si logra enviarlo sin errores. | El formulario se vacía y no aparece ningún mensaje: no hay número de radicado ni plazo. No sabe si la queja llegó. | E19 |

**Resultado en antes:** Rosalba se bloquea en el formulario. Lo más probable es que abandone en el paso 8 o 9 y vaya en persona al Palacio Municipal. Si llega al paso 10, no tiene cómo comprobar que la queja llegó.

## 2. Versión después (`despues/`)

| Paso | Qué hace Rosalba | Qué pasa | Error corregido |
|---|---|---|---|
| 1 | Abre el portal y amplía al 200 %. | El contenedor es fluido (`max-width: 75rem`) y los tamaños están en `rem`: el contenido se reacomoda y no hay desplazamiento horizontal. También puede usar «Aumentar texto» (hasta 150 %) y «Alto contraste» en la barra superior. | E08 (y mejora de preferencias) |
| 2 | Lee la página de inicio. | El texto es `#1A1A1A` sobre blanco (17:1), con cuerpo de 16 px e interlineado 1.5. | E04 |
| 3 | Lee el banner. | El banner es estático y el mensaje del predial es texto HTML, no parte de la imagen. Lo lee a su ritmo. | E11, E10 |
| 4 | Busca cómo poner la queja. | En «Accesos rápidos», el título de la tarjeta es el enlace «Radicar una PQRS», azul `#1F4E79` (8.7:1) y subrayado. | E09, E04 |
| 5 | Entra al formulario. | El título dice qué significa la sigla: «Peticiones, quejas, reclamos, sugerencias y denuncias (PQRS)». Un aviso le dice que tiene 2 minutos y que le avisarán un minuto antes. Cada campo tiene etiqueta visible; la ayuda del asunto trae un ejemplo: «Lámpara de alumbrado dañada en la Calle 7». | E15, E02 |
| 6 | Revisa qué es obligatorio. | Una nota inicial explica «Los campos con * son obligatorios» y cada etiqueta dice «(obligatorio)» en texto. | E16 |
| 7 | Pasa de un campo a otro con Tab. | Cada campo enfocado muestra un borde amarillo de 3 px con sombra oscura. | E05 |
| 8 | Sigue escribiendo la descripción. | Al minuto aparece el aviso «Tu sesión está por terminar», con cuenta regresiva de 60 s y el foco en el botón «Necesito más tiempo». Lo pulsa: el aviso se cierra, el foco vuelve al campo donde estaba, el tiempo se reinicia y conserva lo escrito. | E18 |
| 9 | Envía con el correo mal escrito. | El foco va a un resumen «Revisa los campos marcados antes de enviar», con un enlace al campo. Junto al correo aparece «Escribe un correo válido, por ejemplo nombre@correo.com.». Sus demás datos siguen ahí; solo corrige el correo. | E17 |
| 10 | Envía de nuevo. | Aparece «Tu solicitud fue radicada», con el número de radicado (formato `VC-2026-NNNNNN`), el plazo de 15 días hábiles (Ley 1755 de 2015) y el resumen de lo enviado. Anota el número en su papel. | E19 |

**Resultado en después:** Rosalba completa la queja sola y sabe cuándo le responderán.

**Lo que sigue siendo una barrera:** la sesión todavía dura 2 minutos. Si Rosalba se levanta de la silla y no responde el aviso en 60 segundos, el formulario se borra; ahora con un mensaje que lo explica, pero los datos se pierden igual (ver `expirarSesion()` en [despues/js/pqrs.js](../../despues/js/pqrs.js)).

## Dónde verlo

| Versión | Archivos | En línea |
|---|---|---|
| Antes | [antes/index.html](../../antes/index.html), [antes/pqrs.html](../../antes/pqrs.html), [antes/js/main.js](../../antes/js/main.js), [antes/css/estilos.css](../../antes/css/estilos.css) | https://aryeisor.github.io/portal_valleclaro/antes/pqrs.html |
| Después | [despues/index.html](../../despues/index.html), [despues/pqrs.html](../../despues/pqrs.html), [despues/js/pqrs.js](../../despues/js/pqrs.js), [despues/css/base.css](../../despues/css/base.css) | https://aryeisor.github.io/portal_valleclaro/despues/pqrs.html |
