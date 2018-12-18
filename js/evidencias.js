$(function() {});

var uploadEF = new FileUploadWithPreview("evidenciasFotograficas");
var uploadAsis = new FileUploadWithPreview("evidenciasAsistencia");
var uploadActas = new FileUploadWithPreview("actasReunion");

function uploadAsistencias() {
  var form = new FormData();

  if($('#colEvidencia').css('display') != 'none'){
    /* Ciclo de evidencias fotograficas */
    for (i = 0; i < uploadEF.cachedFileArray.length; i++) {
      element = uploadEF.cachedFileArray[i];
      form.append('evidencias[]', element);
    }

        /* Ciclo de asistencias */
    for (i = 0; i < uploadAsis.cachedFileArray.length; i++) {
      element = uploadAsis.cachedFileArray[i];
      form.append('asistencias[]', element);
    }
  }

  if($('#colActaReunion').css('display') != 'none'){
    /* Ciclo de actas */
    for (i=0; i<uploadActas.cachedFileArray.length; i++){
      element = uploadActas.cachedFileArray[i];
      form.append('actas', element);
    }
  }

  /* Solicitudes educativas */

  form.append('id_plan', id_plan);

  $.ajax({
    type: "POST",
    url: "server/uploadRegistros.php",
    data: form,
    dataType: "json",
    processData: false,
    contentType: false,
    success: function(response) {
      if(response.error == 0){
        toggleSwal('error', response.mensaje, response.archivo, false);
      }else{
        var callback = document.getElementById('homeBtn').getAttribute('href');
        toggleSwal('success', 'Exito!', response.mensaje, callback);
      }
    }
  });
}

function validarRegistros(){
  var inputs = $('.custom-file-container:visible');
  var elements = false;

  for(i=0; i<inputs.length; i++){
    var input = inputs[i].getElementsByTagName('input');
    var length = input[0].files.length;

    if(length > 0){
      elements = true;
    }
  }

  if(elements){
    uploadAsistencias();
    return elements;
  }else{
    return false;
  }
}

function toggleSwal(type, title, text, callback){
  swal({
    type: type,
    title: title,
    text: text
  }).then(function(){
    if(callback != ""){
      window.location.href = callback;
    }
  });
}
