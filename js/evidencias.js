$(function(){
});

var uploadEF = new FileUploadWithPreview('evidenciasFotograficas');

var uploadAsis = new FileUploadWithPreview('evidenciasAsistencia');

function uploadAsistencias(){
  var fotograficas = uploadEF.cachedFileArray;
  var asistencias = uploadAsis.cachedFileArray;

  console.log(asistencias, fotograficas);
  var formData = new FormData();
  formData.append(asistencias);
  $(selector).append(content);
  formData.append(fotograficas);
  $.ajax({
    type: "POST",
    url: "server/uploadRegistros.php",
    data: formData,
    dataType: "json",
    processData: false, 
    contentType: false,
    success: function (response) {
      
    }
  });
}