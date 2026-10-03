/* ==========================================================
   Alcaldía Municipal de Valleclaro - menu.js (versión "después")
   Submenú de Trámites accesible con teclado y con mouse.
   ========================================================== */

(function () {
  'use strict';

  const menu = document.querySelector('.menu');
  const boton = document.querySelector('.menu-boton');
  if (!menu || !boton) return;

  const submenu = document.getElementById(boton.getAttribute('aria-controls'));
  const contenedor = boton.parentElement;
  if (!submenu) return;

  /* Sin JavaScript el submenú se ve como lista anidada; con JavaScript se vuelve desplegable */
  menu.classList.add('menu-js');
  submenu.hidden = true;

  let abiertoPorMouse = false;

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

  function estaAbierto() {
    return boton.getAttribute('aria-expanded') === 'true';
  }

  /* E06 corregido: es un <button>, así que abre con clic, Enter y Espacio */
  boton.addEventListener('click', function () {
    if (abiertoPorMouse) {
      /* Si el mouse ya lo abrió, el clic lo deja abierto en vez de cerrarlo */
      abiertoPorMouse = false;
      return;
    }
    if (estaAbierto()) {
      cerrar();
    } else {
      abrir();
    }
  });

  /* E06 corregido: Escape cierra el submenú y devuelve el foco al botón */
  contenedor.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && estaAbierto()) {
      cerrar();
      boton.focus();
    }
  });

  /* E06 corregido: se cierra cuando el foco sale del botón y del submenú */
  contenedor.addEventListener('focusout', function (evento) {
    if (!contenedor.contains(evento.relatedTarget)) {
      cerrar();
    }
  });

  /* También funciona con el mouse: abre al pasar por encima y cierra al salir */
  contenedor.addEventListener('mouseenter', function () {
    if (!estaAbierto()) {
      abrir();
      abiertoPorMouse = true;
    }
  });

  contenedor.addEventListener('mouseleave', function () {
    if (estaAbierto() && !contenedor.contains(document.activeElement)) {
      cerrar();
    }
  });

  /* Clic fuera del menú: cierra el submenú */
  document.addEventListener('click', function (evento) {
    if (estaAbierto() && !contenedor.contains(evento.target)) {
      cerrar();
    }
  });
})();
