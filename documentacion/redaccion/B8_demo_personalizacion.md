# B8: guion de demostración — personalización (1 minuto)

Panel de preferencias (`despues/js/preferencias.js`), presente en las 8 páginas: `index`, `tramites`, `tramite-certificado-residencia`, `pqrs`, `descargas`, `faq`, `noticias`, `accesibilidad`.

| Paso | Acción | Qué debe verse |
|---|---|---|
| 1 (0-10 s) | Abrir `index.html`. Señalar los 3 botones arriba a la derecha: "Aumentar texto", "Restablecer texto", "Alto contraste". | Los tres son botones reales, con foco visible al pasar Tab (anillo naranja). |
| 2 (10-25 s) | Con el mouse o Tab + Enter, pulsar "Aumentar texto" dos veces. | El texto crece en pasos (100→115→130 %) sin romper el diseño ni desbordar a los lados. Un mensaje oculto para lectores de pantalla anuncia "Tamaño de texto: 130 %." (puede mostrarse abriendo el lector de pantalla o el inspector en `#pref-estado`). |
| 3 (25-35 s) | Pulsar "Alto contraste". | La página cambia a fondo negro con texto blanco/amarillo; el botón queda marcado como activo (fondo amarillo) y `aria-pressed="true"`. |
| 4 (35-45 s) | Recargar la página (F5) o navegar a `tramites.html` con el menú. | El tamaño de texto ampliado y el alto contraste **persisten** sin parpadeo del tema original: se aplican antes de pintar porque el script se carga en el `<head>`. |
| 5 (45-55 s) | Pulsar "Restablecer texto" y luego "Alto contraste" otra vez para desactivarlo. | Vuelve a 100 % y a los colores normales; el cambio también se guarda. |
| 6 (55-60 s) | Mencionar en voz alta: "Si el sistema operativo pide más contraste (`prefers-contrast: more`), la página activa este mismo modo alto contraste automáticamente, y si el usuario activa 'reducir movimiento' en el sistema, aquí no se usan animaciones que lo ignoren." | No requiere acción en pantalla; es la cláusula de cierre del guion. |

Notas para quien presenta:
- Si localStorage está bloqueado (modo incógnito estricto), los botones igual funcionan durante la sesión; solo no persisten al recargar — esto es intencional (está en try/catch).
- Los tres controles se operan solo con teclado (Tab + Enter/Espacio), sin necesidad de mouse.
