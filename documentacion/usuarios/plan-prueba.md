# Plan de la prueba piloto con usuarios

Prueba piloto para comparar la versión `antes/` y la versión `despues/` del Portal de la Alcaldía de Valleclaro con 3 tareas tomadas del plan de evaluación (T1–T5, en [README.md](../../README.md#evaluación)).

## 1. Objetivo

Comprobar si las personas completan sin ayuda, más rápido y con menos errores, tres tareas clave en la versión después que en la versión antes.

## 2. Perfil de participantes

| Aspecto | Definición |
|---|---|
| Número | 3 participantes, identificados solo como **P1, P2 y P3** |
| Quiénes | Compañeros de la universidad, mayores de edad |
| Requisitos | Usan un navegador web con frecuencia; no participaron en el desarrollo del portal ni lo han visto antes |
| Datos que **no** se registran | Nombre, documento, correo, teléfono, edad exacta, rostro o voz |
| Datos que sí se registran | Código del participante, orden de las versiones, resultado de cada tarea, tiempo, número de errores y observaciones del facilitador |

**Limitación:** los participantes no tienen la necesidad de accesibilidad de la persona del proyecto ([Rosalba, baja visión](persona.md)). La prueba mide usabilidad general; no reemplaza una prueba con personas con discapacidad.

## 3. Tareas

Se leen en voz alta, una a la vez, y se entregan también impresas. Cada tarea empieza en la página de inicio de la versión correspondiente.

| Tarea | Origen | Lo que se le pide al participante | Respuesta o resultado correcto |
|---|---|---|---|
| **A** | T1 | «Encuentra cuánto cuesta y cuánto tarda el certificado de residencia.» | Gratuito; hasta 10 días hábiles |
| **B** | T2 | «Radica una queja por una lámpara de alumbrado dañada en tu calle. Usa los datos de la tarjeta.» | **Antes:** el formulario se envía sin el mensaje «Formulario inválido» (el facilitador lo verifica). **Después:** aparece «Tu solicitud fue radicada» con número de radicado |
| **C** | T3 | «Descarga el formato de permiso de espacio público y di qué tamaño tiene.» | Se descarga `formato-permiso-espacio-publico.pdf` y el participante dice un tamaño correcto: el que indica la página (después: «61 KB») o el del panel de descargas del navegador (antes: unos 182 KB, porque la página no lo indica) |

**Tarjeta de datos ficticios para la tarea B** (para que nadie escriba sus datos reales):

| Campo | Valor |
|---|---|
| Tipo de persona | Natural |
| Tipo de documento | Cédula de ciudadanía |
| Número de documento | 1000000001 |
| Nombres / Apellidos | Ana / Prueba |
| Correo | ana.prueba@correo.com |
| Tipo de solicitud | Queja |
| Asunto | Lámpara de alumbrado dañada |
| Descripción | La lámpara frente a la casa 12 de la Calle 7 no enciende desde hace una semana. |
| Medio de respuesta | Correo electrónico |
| Autorización de datos | Marcar |

## 4. Criterios de éxito por tarea

Una tarea es **exitosa** solo si se cumplen las tres condiciones: se completa sin ayuda, dentro del tiempo máximo y con el resultado correcto.

| Tarea | Completada sin ayuda | Tiempo máximo | Qué cuenta como error |
|---|---|---|---|
| A | Da las dos respuestas correctas sin que el facilitador intervenga | 90 s | Entrar a una página que no lleva a la respuesta y volver atrás; dar un costo o un plazo equivocado |
| B | Envía el formulario completo sin ayuda | 5 min | Cada envío rechazado; cada vez que se borran los datos (por error o por tiempo); entrar a una página equivocada |
| C | Descarga el archivo correcto y dice su tamaño sin ayuda | 90 s | Descargar otro documento; entrar a una página equivocada; no poder decir el tamaño |

**Escala por tarea:** Sí (sin ayuda y a tiempo), Con ayuda (el facilitador tuvo que intervenir o se pasó del tiempo) o No (abandonó).

**Reglas para el facilitador:**
- No se ayuda durante la tarea. Si el participante pide ayuda o se pasa del tiempo máximo, se anota «Con ayuda» y se le orienta para seguir.
- El cronómetro empieza cuando el participante termina de oír la tarea y para cuando da la respuesta o ve el resultado.
- En la tarea B de **antes**, la sesión del formulario dura 2 minutos desde que se abre la página. Si los datos se borran, se anota como error y el participante sigue intentando dentro del tiempo máximo.
- En la tarea B de **antes**, anotar también si el participante **sabe** si la queja se envió (columna de observaciones), porque esa versión no muestra confirmación (E19).

## 5. Orden de las versiones

Para que el aprendizaje no favorezca a una versión, se alterna el orden. Con 3 participantes no se puede dividir en mitades exactas: 2 empiezan por antes y 1 por después.

| Participante | Primera versión | Segunda versión | Orden de las tareas |
|---|---|---|---|
| P1 | Antes | Después | A, B, C |
| P2 | Después | Antes | A, B, C |
| P3 | Antes | Después | A, B, C |

## 6. Preparación y materiales

- El mismo computador, navegador (Chrome) y tamaño de ventana para los 3 participantes, con zoom al 100 %.
- Direcciones: https://aryeisor.github.io/portal_valleclaro/antes/ y https://aryeisor.github.io/portal_valleclaro/despues/ (o los archivos `antes/index.html` y `despues/index.html` del repositorio, abiertos en el navegador).
- Entre participantes: cerrar las pestañas, vaciar la carpeta de descargas y, en `despues/`, pulsar «Restablecer texto» y desactivar «Alto contraste».
- Cronómetro, esta hoja impresa, la tarjeta de datos ficticios y el [consentimiento informado](consentimiento.md) firmado antes de empezar.
- No se graba el rostro ni la voz. Si se graba la pantalla, solo se graba el navegador.

## 7. Procedimiento (unos 20 minutos por participante)

1. Bienvenida, explicación del propósito y firma del consentimiento (3 min).
2. Primera versión: tareas A, B y C (7 min).
3. Segunda versión: tareas A, B y C (7 min).
4. Pregunta final abierta: «¿Qué te costó más trabajo en cada versión?» Se anota la respuesta resumida, sin nombre (3 min).

## 8. Hoja de registro

**Fecha de la prueba:** ____________  **Facilitador:** ____________  **Observador:** ____________

Completada: **Sí** / **Con ayuda** / **No**. Tiempo en segundos. Errores: número.

| Participante | Orden | Versión | Tarea | Completada | Tiempo (s) | Errores | Observaciones |
|---|---|---|---|---|---|---|---|
| P1 | 1.ª | Antes | A |  |  |  |  |
| P1 | 1.ª | Antes | B |  |  |  |  |
| P1 | 1.ª | Antes | C |  |  |  |  |
| P1 | 2.ª | Después | A |  |  |  |  |
| P1 | 2.ª | Después | B |  |  |  |  |
| P1 | 2.ª | Después | C |  |  |  |  |
| P2 | 1.ª | Después | A |  |  |  |  |
| P2 | 1.ª | Después | B |  |  |  |  |
| P2 | 1.ª | Después | C |  |  |  |  |
| P2 | 2.ª | Antes | A |  |  |  |  |
| P2 | 2.ª | Antes | B |  |  |  |  |
| P2 | 2.ª | Antes | C |  |  |  |  |
| P3 | 1.ª | Antes | A |  |  |  |  |
| P3 | 1.ª | Antes | B |  |  |  |  |
| P3 | 1.ª | Antes | C |  |  |  |  |
| P3 | 2.ª | Después | A |  |  |  |  |
| P3 | 2.ª | Después | B |  |  |  |  |
| P3 | 2.ª | Después | C |  |  |  |  |

**Resumen** (se llena después de la prueba):

| Versión | Tareas exitosas (de 9) | Tiempo promedio A (s) | Tiempo promedio B (s) | Tiempo promedio C (s) | Errores totales |
|---|---|---|---|---|---|
| Antes |  |  |  |  |  |
| Después |  |  |  |  |  |

**Respuestas a la pregunta final (resumidas, sin nombres):**

- P1:
- P2:
- P3:
