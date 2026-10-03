/* ==========================================================
   Alcaldía Municipal de Valleclaro - main.js (versión "antes")
   Un solo archivo para todo el sitio.
   ========================================================== */

/* E18: la sesión del formulario PQRS expira a los 2 minutos sin aviso */
const TIEMPO_SESION_MS = 120000;

/* E11: el carrusel cambia cada 3 segundos */
const INTERVALO_CARRUSEL_MS = 3000;


/* ---------- Carrusel (inicio) ---------- */
const diapositivas = document.querySelectorAll('.carrusel img');

if (diapositivas.length > 0) {
  let actual = 0;
  /* E11: carrusel automático sin botón de pausa ni forma de detenerlo */
  setInterval(function () {
    diapositivas[actual].classList.remove('activa');
    actual = (actual + 1) % diapositivas.length;
    diapositivas[actual].classList.add('activa');
  }, INTERVALO_CARRUSEL_MS);
}


/* ---------- Preguntas frecuentes ---------- */
/* E20: acordeón con div onclick, no se puede abrir con el teclado */
function abrirPregunta(elemento) {
  elemento.parentNode.classList.toggle('abierta');
}


/* ---------- Formulario PQRS ---------- */
const formPqrs = document.getElementById('form-pqrs');

if (formPqrs) {
  const mensajeError = document.getElementById('mensaje-error');
  const anonimo = document.getElementById('anonimo');
  const datosPersonales = document.getElementById('datos-personales');
  const descripcion = document.getElementById('descripcion');
  const contador = document.getElementById('contador');

  anonimo.addEventListener('change', function () {
    datosPersonales.style.display = anonimo.checked ? 'none' : 'block';
  });

  descripcion.addEventListener('input', function () {
    contador.textContent = descripcion.value.length + ' / 1000';
  });

  function vaciarFormulario() {
    formPqrs.reset();
    datosPersonales.style.display = 'block';
    contador.textContent = '0 / 1000';
  }

  function estaVacio(id) {
    return document.getElementById(id).value.trim() === '';
  }

  function opcionMarcada(nombre) {
    return formPqrs.querySelector('input[name="' + nombre + '"]:checked') !== null;
  }

  function formularioValido() {
    if (!anonimo.checked) {
      if (!opcionMarcada('tipo_persona')) return false;
      if (estaVacio('tipo-documento')) return false;
      if (estaVacio('numero-documento')) return false;
      if (estaVacio('nombres')) return false;
      if (estaVacio('apellidos')) return false;
      if (estaVacio('correo')) return false;
      const correo = document.getElementById('correo').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) return false;
    }
    if (estaVacio('tipo-solicitud')) return false;
    if (estaVacio('asunto')) return false;
    if (estaVacio('descripcion')) return false;
    if (!opcionMarcada('medio_respuesta')) return false;
    if (!document.getElementById('autorizacion').checked) return false;
    return true;
  }

  formPqrs.addEventListener('submit', function (evento) {
    evento.preventDefault();

    if (!formularioValido()) {
      /* E17: un solo mensaje genérico arriba y se borran todos los datos escritos */
      mensajeError.style.display = 'block';
      vaciarFormulario();
      window.scrollTo(0, 0);
    } else {
      /* E19: el formulario se vacía sin confirmación, sin radicado ni plazo */
      mensajeError.style.display = 'none';
      vaciarFormulario();
    }
  });

  /* E18: a los 2 minutos se borra el formulario sin avisar ni permitir extender el tiempo */
  setTimeout(function () {
    vaciarFormulario();
  }, TIEMPO_SESION_MS);
}
