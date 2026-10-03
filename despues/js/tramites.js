/* ==========================================================
   Alcaldía Municipal de Valleclaro - tramites.js (versión "después")
   Filtro de texto del catálogo de trámites (Nielsen 7: flexibilidad
   y eficiencia). El resultado se anuncia en una región aria-live.
   ========================================================== */

(function () {
  'use strict';

  const filtro = document.getElementById('filtro-tramites');
  const campo = document.getElementById('buscar-tramite');
  const resultado = document.getElementById('resultado-filtro');
  const lista = document.getElementById('lista-tramites');
  if (!filtro || !campo || !resultado || !lista) return;

  const tramites = Array.from(lista.children);
  const total = tramites.length;

  /* Espera a que la persona deje de escribir antes de anunciar, para no saturar al lector de pantalla */
  const ESPERA_ANUNCIO_MS = 500;
  let temporizador = null;

  /* Sin JavaScript el filtro no sirve, por eso solo se muestra cuando este archivo carga */
  filtro.hidden = false;

  /* Compara sin tildes ni mayúsculas: "construccion" encuentra "construcción" */
  function normalizar(texto) {
    return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  }

  function filtrar() {
    const consulta = normalizar(campo.value);
    let visibles = 0;

    tramites.forEach(function (tramite) {
      const coincide = consulta === '' || normalizar(tramite.textContent).includes(consulta);
      tramite.hidden = !coincide;
      if (coincide) visibles++;
    });

    return { consulta: campo.value.trim(), visibles: visibles };
  }

  function anunciar(estado) {
    if (estado.consulta === '') {
      resultado.textContent = 'Se muestran los ' + total + ' trámites.';
    } else if (estado.visibles === 0) {
      resultado.textContent = 'Ningún trámite coincide con «' + estado.consulta + '». Prueba con otra palabra o radica una PQRS para pedir orientación.';
    } else if (estado.visibles === 1) {
      resultado.textContent = '1 trámite coincide con «' + estado.consulta + '».';
    } else {
      resultado.textContent = estado.visibles + ' trámites coinciden con «' + estado.consulta + '».';
    }
  }

  campo.addEventListener('input', function () {
    /* La lista se filtra de inmediato; el mensaje se actualiza cuando la persona hace una pausa */
    const estado = filtrar();
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      anunciar(estado);
    }, ESPERA_ANUNCIO_MS);
  });
})();
