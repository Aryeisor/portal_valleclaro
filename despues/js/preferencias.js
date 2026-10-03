/* ==========================================================
   Alcaldía Municipal de Valleclaro - preferencias.js (versión "después")
   Tamaño de texto y alto contraste. Se carga en el <head> para aplicar
   la preferencia guardada antes de pintar la página.
   La preferencia se guarda en localStorage dentro de try/catch: si el
   navegador lo bloquea, los botones siguen funcionando en la página actual.
   ========================================================== */

(function () {
  'use strict';

  const TAMANOS = [100, 115, 130, 150]; /* porcentaje del tamaño de letra base */
  const CLAVE_TAMANO = 'valleclaro-tamano-texto';
  const CLAVE_CONTRASTE = 'valleclaro-alto-contraste';
  const raiz = document.documentElement;

  function leer(clave) {
    try {
      return window.localStorage.getItem(clave);
    } catch (error) {
      return null;
    }
  }

  function guardar(clave, valor) {
    try {
      window.localStorage.setItem(clave, valor);
    } catch (error) {
      /* Sin almacenamiento la preferencia solo dura mientras la página esté abierta */
    }
  }

  let indiceTamano = Math.max(0, TAMANOS.indexOf(Number(leer(CLAVE_TAMANO))));
  let altoContraste = leer(CLAVE_CONTRASTE) === 'si';

  function aplicar() {
    raiz.style.fontSize = indiceTamano === 0 ? '' : TAMANOS[indiceTamano] + '%';
    raiz.classList.toggle('alto-contraste', altoContraste);
  }

  /* Se aplica de inmediato, antes de que exista el <body> */
  aplicar();

  document.addEventListener('DOMContentLoaded', function () {
    const grupo = document.getElementById('preferencias');
    const aumentar = document.getElementById('pref-aumentar');
    const restablecer = document.getElementById('pref-restablecer');
    const contraste = document.getElementById('pref-contraste');
    const estado = document.getElementById('pref-estado');
    if (!grupo || !aumentar || !restablecer || !contraste || !estado) return;

    /* Sin JavaScript los botones no harían nada, por eso solo se muestran cuando este archivo carga */
    grupo.hidden = false;
    contraste.setAttribute('aria-pressed', String(altoContraste));

    /* Anuncia el cambio en la región role="status"; se vacía antes para que un mensaje repetido se vuelva a leer */
    function anunciar(mensaje) {
      estado.textContent = '';
      setTimeout(function () { estado.textContent = mensaje; }, 50);
    }

    aumentar.addEventListener('click', function () {
      if (indiceTamano < TAMANOS.length - 1) {
        indiceTamano++;
        aplicar();
        guardar(CLAVE_TAMANO, String(TAMANOS[indiceTamano]));
        anunciar('Tamaño de texto: ' + TAMANOS[indiceTamano] + ' %.');
      } else {
        anunciar('El texto ya está en el tamaño máximo (' + TAMANOS[indiceTamano] + ' %).');
      }
    });

    restablecer.addEventListener('click', function () {
      indiceTamano = 0;
      aplicar();
      guardar(CLAVE_TAMANO, '100');
      anunciar('Tamaño de texto restablecido (100 %).');
    });

    contraste.addEventListener('click', function () {
      altoContraste = !altoContraste;
      aplicar();
      contraste.setAttribute('aria-pressed', String(altoContraste));
      guardar(CLAVE_CONTRASTE, altoContraste ? 'si' : 'no');
      anunciar(altoContraste ? 'Alto contraste activado.' : 'Alto contraste desactivado.');
    });
  });
})();
