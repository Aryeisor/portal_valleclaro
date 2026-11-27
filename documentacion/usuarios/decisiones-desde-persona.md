# Decisiones de diseño que responden a la persona

> Persona: [Rosalba Méndez](persona.md), arquetipo de una adulta mayor con baja visión que quiere radicar una queja (no es una persona real).
>
> **Nota de honestidad:** la versión `despues/` se construyó a partir del catálogo de 22 errores. La persona se documentó después, así que esta tabla no muestra el orden en que se tomaron las decisiones. Muestra qué decisiones ya implementadas responden a sus necesidades.

| # | Necesidad de Rosalba | Decisión de diseño en `despues/` | Error corregido | Archivo(s) |
|---|---|---|---|---|
| 1 | Ampliar la página al 200 % sin moverse de lado a lado | Contenedor fluido (`width: 100%; max-width: 75rem`), estilos mobile-first y tamaños en `rem`, en lugar del ancho fijo de 1200 px | E08 | [despues/css/base.css](../../despues/css/base.css) |
| 2 | Leer el texto y distinguir los enlaces | Paleta con contraste mínimo de 4.5:1: texto `#1A1A1A` (17:1), texto suave `#4A4A4A` (8.9:1), enlaces `#1F4E79` (8.7:1) subrayados; cuerpo de 16 px e interlineado 1.5 | E04 | [despues/css/base.css](../../despues/css/base.css), [despues/css/componentes.css](../../despues/css/componentes.css) |
| 3 | Leer el banner a su ritmo | Banner estático con el mensaje como texto HTML, en lugar del carrusel automático de 3 s con el texto dentro de la imagen | E11, E10 | [despues/index.html](../../despues/index.html) |
| 4 | Saber qué va en cada campo aunque ya haya escrito | Etiqueta visible `<label for>` en cada campo, grupos con `fieldset`/`legend` y ayudas con ejemplo («Ej.: nombre@correo.com») | E15 | [despues/pqrs.html](../../despues/pqrs.html), [despues/css/formularios.css](../../despues/css/formularios.css) |
| 5 | Saber qué es obligatorio sin depender del color rojo | Asterisco más la palabra «(obligatorio)» en la etiqueta, y nota inicial «Los campos con * son obligatorios» | E16 | [despues/pqrs.html](../../despues/pqrs.html) |
| 6 | Escribir despacio sin perder lo escrito por tiempo | Aviso previo de la sesión al empezar, diálogo 1 minuto antes de que expire con el botón «Necesito más tiempo» y el foco en ese botón | E18 | [despues/js/pqrs.js](../../despues/js/pqrs.js), [despues/pqrs.html](../../despues/pqrs.html) |
| 7 | No empezar de nuevo si se equivoca, y saber qué corregir | Los datos se conservan; mensaje junto a cada campo con la forma de corregirlo y resumen de errores con enlaces | E17 | [despues/js/pqrs.js](../../despues/js/pqrs.js), [despues/css/formularios.css](../../despues/css/formularios.css) |
| 8 | Saber que la queja llegó y cuándo le responderán | Confirmación con número de radicado, plazo de 15 días hábiles y resumen de lo enviado | E19 | [despues/js/pqrs.js](../../despues/js/pqrs.js) |
| 9 | Ajustar el tamaño y el contraste sin saber usar el zoom del navegador | Botones «Aumentar texto» (hasta 150 %), «Restablecer texto» y «Alto contraste» en la barra superior de las 8 páginas | No es un error del catálogo (mejora adicional) | [despues/js/preferencias.js](../../despues/js/preferencias.js) |

## Cómo comprobarlo

- **Decisión 1:** abrir [despues/index.html](../../despues/index.html) con zoom al 200 % y compararla con [antes/index.html](../../antes/index.html) (en antes aparece la barra horizontal).
- **Decisiones 4 a 8:** recorrer el [escenario](escenario.md) en `antes/pqrs.html` y `despues/pqrs.html`. Para ver el aviso de sesión sin esperar, ver el procedimiento de E18 en [cambios-antes-despues.md](../cambios-antes-despues.md#e18--la-sesión-expira-sin-aviso).
- **Decisión 9:** pulsar «Aumentar texto» y «Alto contraste» en cualquier página de `despues/`.

## Necesidad de Rosalba que no está resuelta del todo

La sesión del PQRS sigue durando 2 minutos (`TIEMPO_SESION_MS = 120000` en [despues/js/pqrs.js](../../despues/js/pqrs.js)). Cumple WCAG 2.2.1 porque avisa y deja extender el tiempo, pero obliga a Rosalba a responder el aviso en 60 segundos. Una mejora posible es una sesión más larga o que se renueve sola mientras la persona escribe.
