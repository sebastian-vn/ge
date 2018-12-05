$(function(){
});

var uploadEF = new FileUploadWithPreview('evidenciasFotograficas');

var uploadAsis = new FileUploadWithPreview('evidenciasAsistencia');

function uploadAsistencias(){
  var fotograficas = uploadEF.cachedFileArray;
  var asistencias = uploadAsis.cachedFileArray;

  console.log(asistencias, fotograficas);

  $.ajax({
    type: "POST",
    url: "server/uploadRegistros.php",
    data: {
      ef : fotograficas,
      asis : asistencias
    },
    dataType: "json",
    processData: false, 
    contentType: false,
    success: function (response) {
      
    }
  });
}