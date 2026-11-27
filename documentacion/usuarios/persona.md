# Persona: Rosalba Méndez

> **Arquetipo, no una persona real.** Rosalba es un personaje construido para el diseño del Portal de la Alcaldía de Valleclaro. Su nombre, sus datos y sus frases son inventados. No representa a ningún participante de las pruebas.

## Datos

| Dato | Valor |
|---|---|
| Nombre | Rosalba Méndez |
| Edad | 67 años |
| Ocupación | Docente de primaria pensionada |
| Vive en | Un barrio residencial de Valleclaro (municipio ficticio) |
| Necesidad de accesibilidad | **Baja visión** por la edad: lee con gafas y aun así necesita el texto ampliado (zoom del navegador al 200 %) y buen contraste. No usa lector de pantalla. |

## Contexto

Rosalba vive sola desde que su hija se mudó a otra ciudad. Antes hacía todas sus diligencias en la ventanilla del Palacio Municipal, pero el viaje en bus y las filas la cansan, y su hija le insiste en que haga los trámites «por internet». Hace un mes se dañó la lámpara del alumbrado público frente a su casa y la calle queda oscura de noche; quiere poner una queja ante la alcaldía.

## Tecnología que usa

- Un portátil que le dejó su hija, con Chrome. Amplía la página con Ctrl y + hasta que puede leer (alrededor de 200 %).
- Un celular Android con el tamaño de letra del sistema en el máximo. Lo usa sobre todo para WhatsApp y llamadas.
- Usa el mouse; el teclado solo para escribir y, a veces, Tab para pasar de un campo a otro.
- Escribe despacio, con dos dedos, y relee lo que escribe antes de enviarlo.

## Objetivos

1. Radicar una queja por la lámpara dañada sin tener que ir al Palacio Municipal.
2. Saber que la queja llegó y en cuánto tiempo le van a responder.
3. Hacerlo sola, sin pedirle ayuda a su hija por teléfono.

## Frustraciones

- Letras grises y pequeñas que no alcanza a leer ni con gafas.
- Páginas que, al ampliarlas, se salen de la pantalla y la obligan a moverse de lado a lado.
- Imágenes que cambian solas antes de que termine de leerlas.
- Formularios en los que el nombre del campo desaparece cuando empieza a escribir.
- Perder lo que escribió: le ha pasado que una página «se reinicia» y tiene que empezar de nuevo.
- No saber si lo que envió llegó o no.

## Necesidad de accesibilidad (concreta)

Rosalba necesita **leer y diligenciar el formulario PQRS con el texto ampliado al 200 % y con contraste alto, a su propio ritmo, sin perder lo que escribió**. En términos de WCAG 2.1 esto toca, sobre todo:

| Necesidad | Criterio WCAG relacionado | Error del catálogo |
|---|---|---|
| Ampliar al 200 % sin desplazarse de lado | 1.4.10 Reajuste del contenido (AA) | E08 |
| Texto y enlaces con contraste suficiente | 1.4.3 Contraste mínimo (AA) | E04 |
| Que el banner no cambie solo mientras lee | 2.2.2 Pausar, detener, ocultar (A) | E11 |
| Etiquetas visibles en cada campo | 3.3.2 Etiquetas o instrucciones (A) | E15, E16 |
| Tiempo suficiente para terminar el formulario | 2.2.1 Tiempo ajustable (A) | E18 |
| No perder los datos si se equivoca, y saber qué corregir | 3.3.1 y 3.3.3 (A, AA) | E17 |
| Confirmación de que la queja llegó | 4.1.3 Mensajes de estado (AA) | E19 |

## De dónde sale este arquetipo

Rosalba se construyó a partir de lo que ya existe en el proyecto:

- El público que nombra la declaración de accesibilidad: personas que usan «ampliación de pantalla o celular» ([despues/accesibilidad.html](../../despues/accesibilidad.html)).
- La pregunta frecuente «¿Hay atención para personas con discapacidad?» ([despues/faq.html](../../despues/faq.html)).
- La tarea T2 del plan de pruebas («Radica una queja por una lámpara de alumbrado dañada en tu calle»), en [README.md](../../README.md#evaluación).
- Los errores E04, E08, E11 y E15–E19 del catálogo ([cambios-antes-despues.md](../cambios-antes-despues.md)).

Ver también: [mapa de empatía](mapa-empatia.md), [escenario de uso](escenario.md) y [decisiones de diseño](decisiones-desde-persona.md).
