# Declaración de accesibilidad

La Alcaldía Municipal de Valleclaro quiere que todas las personas puedan usar este portal, incluidas las personas con discapacidad y quienes usan lectores de pantalla, solo el teclado, ampliación de pantalla o celular.

## Compromiso y alcance

Este portal es un **sitio académico ficticio**, desarrollado para un proyecto universitario de accesibilidad y usabilidad. No pertenece a ninguna alcaldía real. Esta declaración cubre las 8 páginas de esta versión (`despues/`): Inicio, Noticias, Trámites, el trámite de certificado de residencia, PQRS, Preguntas frecuentes, Descargas y esta misma página.

## Estado de conformidad

Este portal busca cumplir las **Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA**, el mismo nivel que la Resolución 1519 de 2020 del Ministerio TIC toma como referencia para las entidades públicas en Colombia.

**Estado:** cumple en las páginas y los criterios que se revisaron (ver «Cómo se evaluó»). No se afirma conformidad total ni se ha verificado cada criterio de WCAG 2.1 AA; las excepciones conocidas y lo que falta por revisar están en «Limitaciones conocidas».

## Cómo se evaluó

- **Herramientas automáticas:** revisión con Lighthouse y WAVE.
- **Contraste de color:** cálculo manual de cada combinación de texto y fondo con la fórmula de WCAG 2.1, con un mínimo de 4.5:1 para texto y 3:1 para bordes de campos y botones (ver [documentacion/calculo-contraste.md](../calculo-contraste.md)).
- **Revisión manual con teclado:** que todo se alcance con Tab, que el foco siempre se vea y que el menú, el acordeón y el formulario funcionen con Enter, Espacio y Escape.
- **Revisión manual del código:** estructura semántica (encabezados, regiones, etiquetas de formulario) y lectura del contenido de cada página.

## Limitaciones conocidas

- No se ha hecho prueba con lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack). Es un procedimiento de verificación propuesto, pero no se ha ejecutado ni hay evidencia registrada.
- No se ha hecho prueba con personas usuarias. El plan de prueba existe en [documentacion/usuarios/plan-prueba.md](../usuarios/plan-prueba.md), pero no se ha realizado.
- No se ha verificado zoom al 200 % ni pantallas desde 320 píxeles de ancho de forma sistemática en las 8 páginas.
- No se ha ejecutado el validador HTML del W3C sobre las páginas de esta versión.
- La tabla de documentos de la página Descargas se desplaza horizontalmente dentro de su recuadro en pantallas angostas. La página completa no se desplaza.
- El formulario PQRS es una simulación académica: no envía datos y el número de radicado es ficticio.
- La sesión del formulario PQRS dura 2 minutos con fines de demostración. Un minuto antes aparece un aviso para pedir más tiempo.
- Las preferencias de tamaño de texto y alto contraste se guardan solo en este navegador. Si el navegador bloquea el almacenamiento, se pierden al cerrar la página.

## Fecha de la última revisión

Esta declaración se revisó el 26 de noviembre de 2026.

## Cómo reportar un problema de accesibilidad

Si encuentras una barrera para usar el portal, cuéntanos qué página era y qué pasó. Te responderemos en un plazo máximo de 15 días hábiles.

- [Reportar un problema de accesibilidad con una PQRS](../../despues/pqrs.html) (elige el tipo «Queja» o «Sugerencia» y escribe «Accesibilidad» en el asunto).
- Correo: contactenos@valleclaro.ejemplo
- Teléfono: (000) 123 4567, lunes a viernes, 7:30 a. m. a 12:00 m. y 2:00 p. m. a 5:30 p. m.

## Marco normativo

- **Ley 1618 de 2013:** garantiza los derechos de las personas con discapacidad, incluido el acceso a la información.
- **NTC 5854:** norma técnica colombiana de accesibilidad para páginas web.
- **Resolución 1519 de 2020 del Ministerio TIC:** lineamientos de accesibilidad web para entidades públicas.
- **Ley 1712 de 2014:** transparencia y acceso a la información pública.
