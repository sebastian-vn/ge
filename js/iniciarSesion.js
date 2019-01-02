$(function () {
  /* Set  */
  userRol();

});

var userArray;

//Change functions
$('#inputEmail').change(function(){
  verifyUserRol();
});

function userRol() {
  $.ajax({
    type: "POST",
    url: "server/logIn.php",
    data: {
      user_rol: ""
    },
    dataType: "json",
    success: function (response) {
      userArray = response;
    }
  });
}

function verifyUserRol() {
  var user = $('input[name=mailuid]').val();
  var exists = false;
  var rol;
  userArray.some(element => {
    if (user == element.email || user == element.usuario) {
      rol = element.id_rol;
      return exists = true;
    }
  });

  if (exists && rol == 2 || rol == 3) {
    $('#btnIngresarApp').prop("disabled", false);
  } else {
    if (!$('#btnIngresarApp').prop("disabled")) {
      $('#btnIngresarApp').prop("disabled", true);
    }
  }
}