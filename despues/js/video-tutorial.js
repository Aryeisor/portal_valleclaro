// B6: respaldo si tutorial-pqrs.mp4 falla al cargar (archivo movido, dañado o navegador sin soporte); oculta el reproductor y muestra un aviso.
(function () {
  var video = document.getElementById('video-tutorial-pqrs');
  var aviso = document.getElementById('video-aviso');
  if (!video || !aviso) return;
  video.addEventListener('error', function () {
    video.hidden = true;
    aviso.hidden = false;
  }, true);
}());
