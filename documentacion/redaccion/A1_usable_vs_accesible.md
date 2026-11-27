# A1: usable vs. accesible (caso del submenú)

## Definiciones breves

- **Usabilidad:** qué tan fácil es completar una tarea con una interfaz, para un usuario y un dispositivo de entrada concretos (por ejemplo, un mouse).
- **Accesibilidad:** qué tan fácil es completar esa misma tarea para *cualquier* usuario, sin importar el dispositivo de entrada (teclado, lector de pantalla, switch) ni la capacidad (visual, motora, cognitiva).
- **Diferencia clave:** algo puede ser usable para la mayoría y al mismo tiempo inaccesible para quien no usa mouse. La usabilidad se mide contra un perfil de uso típico; la accesibilidad exige que ese perfil no sea el único que funcione.

## El caso del submenú de Trámites

### Cómo funciona en `antes/`

HTML (`antes/index.html:36-44`):

```html
<!-- E06: submenú de Trámites que solo abre con el mouse (hover) -->
<li class="menu-desplegable">
  <a href="tramites.html">Trámites &#9662;</a>
  <ul class="submenu">
    <li><a href="tramite-certificado-residencia.html">Certificado de residencia</a></li>
    <li><a href="tramites.html#paz-y-salvo">Paz y salvo predial</a></li>
    <li><a href="tramites.html">Ver todos los trámites</a></li>
  </ul>
</li>
```

CSS (`antes/css/estilos.css:52-54`):

```css
.submenu { display: none; position: absolute; top: 100%; left: 0; min-width: 260px; background: #FFFFFF; box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15); z-index: 20; }
/* E06: el submenú solo se abre con :hover del mouse, no con el teclado */
.menu-desplegable:hover .submenu { display: block; }
```

El submenú (`<ul class="submenu">`) está oculto con `display: none` y solo se muestra cuando el mouse pasa por encima del `<li class="menu-desplegable">` (regla `:hover`). No hay JavaScript, no hay `aria-expanded`, y el elemento que abre el submenú es un enlace `<a>` normal, no un control pensado para abrir/cerrar algo.

### Por qué es usable con mouse pero no accesible por teclado

- **Con mouse:** mover el puntero sobre "Trámites" dispara `:hover` y el submenú aparece. Es inmediato y funciona bien para quien usa mouse o trackpad con control fino. Por eso es *usable* para ese perfil.
- **Con teclado:** `:hover` solo se activa con el puntero, nunca con el foco de teclado. Al llegar a "Trámites" con Tab, el submenú permanece con `display: none`; los enlaces "Certificado de residencia" y "Paz y salvo predial" quedan fuera del flujo de tabulación visible y no se pueden activar sin usar el mouse.
- **Usuarios afectados:**
  - **Motora:** personas que navegan solo con teclado (sin poder usar mouse con precisión, o usando un switch) no pueden llegar a esos dos enlaces del submenú.
  - **Baja visión:** quienes usan zoom o magnificadores suelen depender más del teclado para no perder la posición en pantalla; el mismo bloqueo les afecta.
  - **Lector de pantalla:** como no hay `aria-expanded`, `aria-controls` ni rol de botón, el software de lectura no anuncia que "Trámites" controla un submenú ni si está abierto o cerrado; aunque el DOM contuviera los enlaces, no hay forma semántica de saber que existen o cómo desplegarlos.

## Criterios WCAG implicados

| Criterio | Nivel | Por qué aplica |
|---|---|---|
| 2.1.1 Teclado | A | Toda la funcionalidad (abrir el submenú y llegar a sus enlaces) debe estar disponible desde el teclado; aquí depende exclusivamente de `:hover` del mouse. |
| 4.1.2 Nombre, función, valor | A | El control que abre/cierra el submenú es un `<a>` sin rol de botón ni estado expresado (`aria-expanded`), así que el software de accesibilidad no puede determinar su función ni su estado actual. |
| 1.4.13 Contenido en hover o foco | AA | No aplica aquí en sentido estricto porque el submenú no se dispara también con foco (solo con hover), pero es el criterio de referencia para exigir que cualquier contenido que aparece al pasar el mouse también aparezca y se pueda descartar con el teclado. |

## Cómo se resolvió en `despues/`

HTML (`despues/index.html:55-63`):

```html
<li class="menu-desplegable">
  <!-- E06 corregido: el submenú se abre con un botón con aria-expanded (Enter, Espacio, Escape y mouse; ver js/menu.js) -->
  <button type="button" class="menu-boton" aria-expanded="false" aria-controls="submenu-tramites">Trámites</button>
  <ul class="submenu" id="submenu-tramites">
  <li><a href="tramite-certificado-residencia.html">Certificado de residencia</a></li>
  <li><a href="tramites.html#paz-y-salvo">Paz y salvo predial</a></li>
  <li><a href="tramites.html">Ver todos los trámites</a></li>
  </ul>
</li>
```

JavaScript (`despues/js/menu.js:23-37` y `:53-59`):

```js
/* E06 corregido: el estado abierto/cerrado se comunica con aria-expanded */
function abrir() {
  boton.setAttribute('aria-expanded', 'true');
  submenu.hidden = false;
}

function cerrar() {
  boton.setAttribute('aria-expanded', 'false');
  submenu.hidden = true;
  abiertoPorMouse = false;
}
...
/* E06 corregido: Escape cierra el submenú y devuelve el foco al botón */
contenedor.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape' && estaAbierto()) {
    cerrar();
    boton.focus();
  }
});
```

El enlace se reemplazó por un `<button>` real con `aria-expanded` y `aria-controls`, de modo que es enfocable, operable con Enter y Espacio (comportamiento nativo de `<button>`), y comunica su estado abierto/cerrado. `menu.js` abre y cierra el submenú con clic, Enter/Espacio, cierra con Escape devolviendo el foco al botón, y también cierra al perder el foco (`focusout`) o al hacer clic fuera. El mouse sigue funcionando (`mouseenter`/`mouseleave`), así que no se perdió la interacción original.

## Tabla antes/después de comportamiento

| | `antes/` | `despues/` |
|---|---|---|
| Mouse | Abre al pasar por encima (`:hover`); se cierra al retirar el mouse. | Abre al pasar por encima o con clic; se cierra al salir o al hacer clic fuera. |
| Teclado | No se puede abrir ni llegar a los enlaces del submenú con Tab. | Tab llega al botón "Trámites"; Enter/Espacio abre; Tab recorre los enlaces; Escape cierra y devuelve el foco al botón. |
| Lector de pantalla | Anuncia "Trámites, enlace"; no informa que exista un submenú ni su estado. | Anuncia "Trámites, botón, contraído" o "expandido" (vía `aria-expanded`), y el submenú asociado por `aria-controls`. |

## Capturas que debo tomar

- `A1_antes_menu_hover.png` — en `antes/index.html`, el submenú de Trámites abierto al pasar el mouse sobre "Trámites" (mostrando los 3 enlaces visibles).
- `A1_antes_tab_no_abre.png` — en `antes/index.html`, navegando solo con Tab hasta el enlace "Trámites" (el foco llega al enlace, pero no hay contorno visible porque `antes/` también tiene el bug E05 de `outline: none`) mientras el submenú permanece cerrado/oculto.
- `A1_despues_menu_teclado.png` — en `despues/index.html`, con el botón "Trámites" enfocado por Tab y el submenú abierto tras Enter/Espacio, mostrando `aria-expanded="true"` en las herramientas de desarrollador o el submenú visible con los enlaces alcanzables.
