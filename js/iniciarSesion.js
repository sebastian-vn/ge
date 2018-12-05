$(function () {
  /* Set  */
  verifyUserRol();
  
});

function verifyUserRol() {
  var user = $('input[name=mailuid]').val();
  $.ajax({
    type: "POST",
    url: "server/logIn.php",
    data: {
      user_rol: user
    },
    dataType: "json",
    success: function (response) {
      rol = response[0].id_rol;
      if(rol == 2 || rol == 3){
        $('#btnIngresarApp').prop("disabled", false);
      }else{
        if(!$('#btnIngresarApp').prop("disabled")){
          $('#btnIngresarApp').prop("disabled", true);
        }
      }
    }
  });
}