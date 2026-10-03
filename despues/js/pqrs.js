/* ==========================================================
   Alcaldía Municipal de Valleclaro - pqrs.js (versión "después")
   Validación del formulario PQRS, mensajes de error, contador,
   adjunto, aviso de sesión y confirmación con radicado.
   ========================================================== */

/* E18 corregido: la sesión dura 2 minutos y se avisa 1 minuto antes de que expire */
const TIEMPO_SESION_MS = 120000;
const AVISO_ANTES_MS = 60000;

(function () {
  'use strict';

  const form = document.getElementById('form-pqrs');
  if (!form) return;

  const MAX_DESCRIPCION = 1000;
  const MAX_ADJUNTO_BYTES = 5 * 1024 * 1024;
  const PLAZO_DIAS_HABILES = 15;

  const $ = function (id) { return document.getElementById(id); };

  const anonimo = $('anonimo');
  const datosPersonales = $('datos-personales');
  const grupoMedio = $('grupo-medio-respuesta');
  const notaMedioAnonimo = $('nota-medio-anonimo');
  const resumen = $('resumen-errores');
  const tituloResumen = $('titulo-resumen');
  const listaErrores = $('lista-errores');
  const descripcion = $('descripcion');
  const contador = $('contador');
  const anuncioContador = $('anuncio-contador');
  const adjunto = $('adjunto');
  const quitarAdjunto = $('quitar-adjunto');
  const confirmacion = $('confirmacion');
  const avisoExpirado = $('aviso-expirado');

  let intentoEnviar = false;

  /* ---------- Utilidades ---------- */

  function vacio(id) {
    return $(id).value.trim() === '';
  }

  function opcionMarcada(nombre) {
    return form.querySelector('input[name="' + nombre + '"]:checked');
  }

  function formatoNumero(numero) {
    return numero.toLocaleString('es-CO');
  }

  /* ---------- Reglas de validación ---------- */
  /* E17 corregido: cada regla devuelve un mensaje concreto que explica cómo corregir el campo */

  const reglas = [
    {
      error: 'error-tipo-persona',
      campos: ['tipo-persona-natural', 'tipo-persona-juridica'],
      personal: true,
      validar: function () {
        return opcionMarcada('tipo_persona') ? '' : 'Elige si eres persona natural o jurídica.';
      }
    },
    {
      error: 'error-tipo-documento',
      campos: ['tipo-documento'],
      personal: true,
      validar: function () {
        return vacio('tipo-documento') ? 'Elige tu tipo de documento.' : '';
      }
    },
    {
      error: 'error-numero-documento',
      campos: ['numero-documento'],
      personal: true,
      validar: function () {
        const valor = $('numero-documento').value.trim();
        if (valor === '') return 'Escribe tu número de documento.';
        if (!/^[A-Za-z0-9]{5,15}$/.test(valor)) {
          return 'Escribe el número sin puntos, espacios ni guiones, por ejemplo 1098765432.';
        }
        return '';
      }
    },
    {
      error: 'error-nombres',
      campos: ['nombres'],
      personal: true,
      validar: function () {
        return vacio('nombres') ? 'Escribe tus nombres.' : '';
      }
    },
    {
      error: 'error-apellidos',
      campos: ['apellidos'],
      personal: true,
      validar: function () {
        return vacio('apellidos') ? 'Escribe tus apellidos.' : '';
      }
    },
    {
      error: 'error-correo',
      campos: ['correo'],
      personal: true,
      validar: function () {
        const valor = $('correo').value.trim();
        if (valor === '') return 'Escribe tu correo electrónico, por ejemplo nombre@correo.com.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
          return 'Escribe un correo válido, por ejemplo nombre@correo.com.';
        }
        return '';
      }
    },
    {
      error: 'error-telefono',
      campos: ['telefono'],
      personal: true,
      validar: function () {
        const valor = $('telefono').value.trim();
        if (valor !== '' && !/^\d{7,10}$/.test(valor)) {
          return 'Escribe solo números, entre 7 y 10, por ejemplo 3001234567, o deja el teléfono vacío.';
        }
        return '';
      }
    },
    {
      error: 'error-tipo-solicitud',
      campos: ['tipo-solicitud'],
      validar: function () {
        return vacio('tipo-solicitud') ? 'Elige el tipo de solicitud: petición, queja, reclamo, sugerencia o denuncia.' : '';
      }
    },
    {
      error: 'error-asunto',
      campos: ['asunto'],
      validar: function () {
        return vacio('asunto') ? 'Escribe el asunto de tu solicitud en una frase.' : '';
      }
    },
    {
      error: 'error-descripcion',
      campos: ['descripcion'],
      validar: function () {
        return vacio('descripcion') ? 'Describe tu solicitud: qué pasó, dónde y desde cuándo. Puedes escribir hasta 1.000 caracteres.' : '';
      }
    },
    {
      error: 'error-adjunto',
      campos: ['adjunto'],
      validar: validarAdjunto
    },
    {
      error: 'error-medio-respuesta',
      campos: ['medio-correo', 'medio-direccion'],
      medio: true,
      validar: function () {
        return opcionMarcada('medio_respuesta') ? '' : 'Elige cómo quieres recibir la respuesta: por correo electrónico o en una dirección física.';
      }
    },
    {
      error: 'error-autorizacion',
      campos: ['autorizacion'],
      validar: function () {
        return $('autorizacion').checked ? '' : 'Para radicar la solicitud debes autorizar el tratamiento de tus datos personales.';
      }
    }
  ];

  function validarAdjunto() {
    const archivo = adjunto.files && adjunto.files[0];
    if (!archivo) return '';
    if (!/\.(pdf|jpe?g)$/i.test(archivo.name)) {
      return 'El archivo «' + archivo.name + '» no es PDF ni JPG. Elige un archivo PDF o JPG, o quita el adjunto.';
    }
    if (archivo.size > MAX_ADJUNTO_BYTES) {
      const megas = (archivo.size / (1024 * 1024)).toLocaleString('es-CO', { maximumFractionDigits: 1 });
      return 'El archivo pesa ' + megas + ' MB y el máximo es 5 MB. Elige un archivo más liviano o quita el adjunto.';
    }
    return '';
  }

  /* Una regla se omite si su campo está oculto por la casilla de envío anónimo */
  function reglaActiva(regla) {
    if (!anonimo.checked) return true;
    return !regla.personal && !regla.medio;
  }

  /* ---------- Mostrar y quitar errores junto a cada campo ---------- */

  /* E17 corregido: mensaje junto al campo, aria-invalid y aria-describedby apuntando al error */
  function mostrarError(regla, mensaje) {
    const elError = $(regla.error);
    elError.textContent = mensaje;
    elError.hidden = false;
    regla.campos.forEach(function (id) {
      const campo = $(id);
      campo.setAttribute('aria-invalid', 'true');
      const ids = (campo.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      if (ids.indexOf(regla.error) === -1) {
        campo.setAttribute('aria-describedby', [regla.error].concat(ids).join(' '));
      }
    });
  }

  function limpiarError(regla) {
    const elError = $(regla.error);
    elError.textContent = '';
    elError.hidden = true;
    regla.campos.forEach(function (id) {
      const campo = $(id);
      campo.removeAttribute('aria-invalid');
      const ids = (campo.getAttribute('aria-describedby') || '').split(' ').filter(function (i) {
        return i && i !== regla.error;
      });
      if (ids.length) {
        campo.setAttribute('aria-describedby', ids.join(' '));
      } else {
        campo.removeAttribute('aria-describedby');
      }
    });
  }

  function validarRegla(regla) {
    const mensaje = reglaActiva(regla) ? regla.validar() : '';
    if (mensaje) {
      mostrarError(regla, mensaje);
    } else {
      limpiarError(regla);
    }
    return mensaje;
  }

  function validarTodo() {
    const errores = [];
    reglas.forEach(function (regla) {
      const mensaje = validarRegla(regla);
      if (mensaje) errores.push({ regla: regla, mensaje: mensaje });
    });
    return errores;
  }

  /* ---------- Resumen de errores ---------- */

  /* E17 corregido: resumen arriba con un enlace a cada campo con error */
  function pintarResumen(errores) {
    listaErrores.textContent = '';
    if (errores.length === 0) {
      resumen.hidden = true;
      return;
    }
    tituloResumen.textContent = errores.length === 1
      ? 'Revisa 1 campo antes de enviar'
      : 'Revisa ' + errores.length + ' campos antes de enviar';
    errores.forEach(function (item) {
      const li = document.createElement('li');
      const enlace = document.createElement('a');
      enlace.href = '#' + item.regla.campos[0];
      enlace.textContent = item.mensaje;
      li.appendChild(enlace);
      listaErrores.appendChild(li);
    });
    resumen.hidden = false;
  }

  /* Al elegir un error del resumen, el foco va directo al campo */
  listaErrores.addEventListener('click', function (evento) {
    const enlace = evento.target.closest('a');
    if (!enlace) return;
    evento.preventDefault();
    const campo = $(enlace.getAttribute('href').slice(1));
    if (campo) {
      campo.focus();
      campo.scrollIntoView({ block: 'center' });
    }
  });

  /* Después del primer intento, cada campo se revalida al cambiar para quitar el error apenas se corrige */
  form.addEventListener('change', function (evento) {
    if (!intentoEnviar) return;
    const id = evento.target.id;
    reglas.forEach(function (regla) {
      if (regla.campos.indexOf(id) !== -1) validarRegla(regla);
    });
    const pendientes = reglas
      .filter(function (regla) { return !$(regla.error).hidden; })
      .map(function (regla) { return { regla: regla, mensaje: $(regla.error).textContent }; });
    pintarResumen(pendientes);
  });

  /* ---------- Envío anónimo ---------- */

  /* Oculta los datos personales y les quita la obligatoriedad */
  function aplicarAnonimo() {
    const esAnonimo = anonimo.checked;
    datosPersonales.hidden = esAnonimo;
    grupoMedio.hidden = esAnonimo;
    notaMedioAnonimo.hidden = !esAnonimo;
    reglas.forEach(function (regla) {
      if (!reglaActiva(regla)) limpiarError(regla);
    });
  }
  anonimo.addEventListener('change', aplicarAnonimo);

  /* ---------- Contador de caracteres ---------- */

  /* El contador visible se actualiza siempre; al lector de pantalla solo se le avisa
     cuando quedan 100, 50 o 0 caracteres, para no interrumpir en cada tecla */
  let tramoAnunciado = null;

  function actualizarContador() {
    const usados = descripcion.value.length;
    const restantes = MAX_DESCRIPCION - usados;
    contador.textContent = formatoNumero(usados) + ' de ' + formatoNumero(MAX_DESCRIPCION) + ' caracteres';

    let tramo = null;
    if (restantes <= 0) tramo = 0;
    else if (restantes <= 50) tramo = 50;
    else if (restantes <= 100) tramo = 100;

    if (tramo !== null && tramo !== tramoAnunciado) {
      anuncioContador.textContent = tramo === 0
        ? 'Llegaste al máximo de 1.000 caracteres.'
        : 'Te quedan ' + restantes + ' caracteres.';
    }
    tramoAnunciado = tramo;
  }
  descripcion.addEventListener('input', actualizarContador);

  /* ---------- Archivo adjunto ---------- */

  /* El archivo se valida apenas se elige, sin esperar al envío */
  adjunto.addEventListener('change', function () {
    quitarAdjunto.hidden = !(adjunto.files && adjunto.files.length);
    validarRegla(reglas.find(function (r) { return r.error === 'error-adjunto'; }));
  });

  quitarAdjunto.addEventListener('click', function () {
    adjunto.value = '';
    quitarAdjunto.hidden = true;
    limpiarError(reglas.find(function (r) { return r.error === 'error-adjunto'; }));
    adjunto.focus();
  });

  /* ---------- Envío ---------- */

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    intentoEnviar = true;
    avisoExpirado.hidden = true;

    const errores = validarTodo();
    if (errores.length > 0) {
      /* E17 corregido: los datos se conservan; el foco va al resumen de errores */
      pintarResumen(errores);
      resumen.focus();
      return;
    }

    pintarResumen([]);
    mostrarConfirmacion();
  });

  /* ---------- Confirmación ---------- */

  function generarRadicado() {
    const anio = new Date().getFullYear();
    const consecutivo = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    return 'VC-' + anio + '-' + consecutivo;
  }

  function agregarDato(lista, termino, valor) {
    const fila = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = termino;
    dd.textContent = valor;
    fila.appendChild(dt);
    fila.appendChild(dd);
    lista.appendChild(fila);
  }

  /* E19 corregido: confirmación con radicado, resumen y plazo; se anuncia con role="status" y el foco va al título */
  function mostrarConfirmacion() {
    const radicado = generarRadicado();
    const esAnonimo = anonimo.checked;
    const medio = opcionMarcada('medio_respuesta');
    const archivo = adjunto.files && adjunto.files[0];
    const fecha = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

    const bloque = document.createElement('div');

    const titulo = document.createElement('h2');
    titulo.id = 'titulo-confirmacion';
    titulo.tabIndex = -1;
    titulo.textContent = 'Tu solicitud fue radicada';
    bloque.appendChild(titulo);

    const pRadicado = document.createElement('p');
    pRadicado.className = 'radicado';
    pRadicado.textContent = 'Número de radicado: ' + radicado;
    bloque.appendChild(pRadicado);

    const pPlazo = document.createElement('p');
    pPlazo.textContent = 'Recibirás respuesta en un plazo máximo de ' + PLAZO_DIAS_HABILES +
      ' días hábiles, según la Ley 1755 de 2015. Guarda el número de radicado para consultar el estado de tu solicitud.';
    bloque.appendChild(pPlazo);

    const subtitulo = document.createElement('h3');
    subtitulo.textContent = 'Resumen de lo enviado';
    bloque.appendChild(subtitulo);

    const datos = document.createElement('dl');
    datos.className = 'resumen-envio';
    agregarDato(datos, 'Fecha de radicación', fecha);
    agregarDato(datos, 'Tipo de solicitud', $('tipo-solicitud').value);
    agregarDato(datos, 'Asunto', $('asunto').value.trim());
    if (esAnonimo) {
      agregarDato(datos, 'Solicitante', 'Anónimo');
      agregarDato(datos, 'Medio de respuesta', 'Cartelera de la alcaldía');
    } else {
      agregarDato(datos, 'Solicitante', $('nombres').value.trim() + ' ' + $('apellidos').value.trim());
      agregarDato(datos, 'Documento', $('tipo-documento').value + ' ' + $('numero-documento').value.trim());
      agregarDato(datos, 'Correo electrónico', $('correo').value.trim());
      agregarDato(datos, 'Medio de respuesta', medio ? medio.value : '');
    }
    agregarDato(datos, 'Archivo adjunto', archivo ? archivo.name : 'Ninguno');
    bloque.appendChild(datos);

    const acciones = document.createElement('p');
    acciones.className = 'acciones';
    const otra = document.createElement('a');
    otra.className = 'boton';
    otra.href = 'pqrs.html';
    otra.textContent = 'Radicar otra solicitud';
    const inicio = document.createElement('a');
    inicio.className = 'boton boton-secundario';
    inicio.href = 'index.html';
    inicio.textContent = 'Volver al inicio';
    acciones.appendChild(otra);
    acciones.appendChild(inicio);
    bloque.appendChild(acciones);

    /* Se ocultan el formulario y sus notas; la confirmación entra en la región role="status" */
    detenerSesion();
    form.hidden = true;
    resumen.hidden = true;
    $('intro-pqrs').hidden = true;
    $('nota-sesion').hidden = true;
    $('nota-obligatorios').hidden = true;

    confirmacion.textContent = '';
    confirmacion.appendChild(bloque);
    confirmacion.classList.add('visible');
    titulo.focus();
  }

  /* ---------- Sesión ---------- */

  const aviso = $('aviso-sesion');
  const botonMasTiempo = $('mas-tiempo');
  const cuentaRegresiva = $('cuenta-regresiva');
  const textoAviso = $('texto-aviso-sesion');

  let temporizadorAviso = null;
  let temporizadorExpira = null;
  let intervaloCuenta = null;
  let focoPrevio = null;

  function textoTiempo(ms) {
    const segundos = Math.round(ms / 1000);
    if (segundos % 60 === 0) {
      const minutos = segundos / 60;
      return minutos === 1 ? '1 minuto' : minutos + ' minutos';
    }
    return segundos + ' segundos';
  }

  textoAviso.textContent = 'Por seguridad, el formulario se borrará en ' + textoTiempo(AVISO_ANTES_MS) +
    '. Si necesitas más tiempo para terminar, pulsa el botón.';

  function detenerSesion() {
    clearTimeout(temporizadorAviso);
    clearTimeout(temporizadorExpira);
    clearInterval(intervaloCuenta);
  }

  function iniciarSesion() {
    detenerSesion();
    temporizadorAviso = setTimeout(mostrarAviso, TIEMPO_SESION_MS - AVISO_ANTES_MS);
    temporizadorExpira = setTimeout(expirarSesion, TIEMPO_SESION_MS);
  }

  function abrirAviso() {
    if (typeof aviso.showModal === 'function') {
      aviso.showModal();
    } else {
      aviso.setAttribute('open', '');
    }
  }

  function cerrarAviso() {
    clearInterval(intervaloCuenta);
    if (typeof aviso.close === 'function' && aviso.open) {
      aviso.close();
    } else {
      aviso.removeAttribute('open');
    }
  }

  /* E18 corregido: aviso accesible (role="alertdialog") y el foco pasa al botón "Necesito más tiempo" */
  function mostrarAviso() {
    focoPrevio = document.activeElement;
    const fin = Date.now() + AVISO_ANTES_MS;
    cuentaRegresiva.textContent = String(Math.round(AVISO_ANTES_MS / 1000));
    intervaloCuenta = setInterval(function () {
      cuentaRegresiva.textContent = String(Math.max(0, Math.round((fin - Date.now()) / 1000)));
    }, 1000);
    abrirAviso();
    botonMasTiempo.focus();
  }

  /* E18 corregido: "Necesito más tiempo" reinicia la sesión y devuelve el foco donde estaba */
  function extenderSesion() {
    cerrarAviso();
    iniciarSesion();
    if (focoPrevio && focoPrevio !== document.body && document.contains(focoPrevio)) {
      focoPrevio.focus();
    } else {
      $('anonimo').focus();
    }
  }

  botonMasTiempo.addEventListener('click', extenderSesion);

  /* Escape no deja que la sesión expire sin querer: también pide más tiempo */
  aviso.addEventListener('cancel', function (evento) {
    evento.preventDefault();
    extenderSesion();
  });

  function expirarSesion() {
    cerrarAviso();
    form.reset();
    reglas.forEach(limpiarError);
    aplicarAnonimo();
    actualizarContador();
    quitarAdjunto.hidden = true;
    resumen.hidden = true;
    intentoEnviar = false;
    avisoExpirado.hidden = false;
    avisoExpirado.focus();
    iniciarSesion();
  }

  /* ---------- Inicio ---------- */
  aplicarAnonimo();
  actualizarContador();
  iniciarSesion();
})();
