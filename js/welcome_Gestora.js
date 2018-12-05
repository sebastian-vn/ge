$(document).ready(function() {
  traerNombreGestora();
});

function traerNombreGestora() {
  $.post(
    "php/welcome_Gestora.php",
    {
      accion: "traerNombreGestora"
    },
    function(data) {
      if (data.error != 1) {
        $("#contenedor-select").html(`
									<select id="selectbasicSeleccionGestora" name="selectbasicSeleccionGestora" class="form-control">

									</select>`);
        $("#selectbasicSeleccionGestora").html(data.html);
      }
    },
    "json"
  );
}

$("#buttonGoUser").click(function() {
  if ($("#selectbasicSeleccionGestora").val() == 0) {
    swal(
      "", //titulo
      "Debes seleccionar un usuario!",
      "error"
    );
  } else {
    crearSesion();
  }
});

function crearSesion() {
  var valor = $("#selectbasicSeleccionGestora :selected").val();
  nombreSesion = $("#selectbasicSeleccionGestora :selected").text();
  var res = valor.split("_");
  var numeroIdentificacion = res[0];
  var id_zona = $($("#selectbasicSeleccionGestora :selected")[0]).attr(
    "id_zona"
  );
  var cargo = 4;

  $.post(
    "php/Session.php",
    {
      nombreSesion: nombreSesion,
      numeroIdentificacion: numeroIdentificacion,
      cargo: cargo,
      id_zona: id_zona
    },
    function(data) {
      window.location.href = "home_Gestora.html?id_zona=" + id_zona;
      // $('#Nombre').html(data);
    },
    "json"
  );
}
