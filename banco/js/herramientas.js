$(function() {
  $(document).foundation();
  getCompetencias();
  getZonas();
  getIndicadores();
  getFicheros();

  /* ONCLICKS */
  $(".a_download").click(function() {
    var url = window.location.hash.substr(1);
    getPDF(url);
  });
  /* ------------------------------------------------------------------ */

  $("#generar-cod").click(function(e) {
    e.preventDefault();
    verificarCodigo();
  });
  /* ------------------------------------------------------------------ */

  /* Desabilitar botón en el momento que comienza y termina un ajax. */
  $(document).ajaxStart(function() {
    $("#generar-cod").attr("disabled", true);
    $("#generalidades-button").attr("disabled", true);
  });
  $(document).ajaxComplete(function() {
    $("#generar-cod").attr("disabled", false);
    $("#generalidades-button").attr("disabled", false);
  });
  /* ------------------------------------------------------------------ */
});

function load() {
  $("body").addClass("animated fadeIn");
}
/* ------------------------------------------------------------------------------------------ */

$(".filtros_competencia").change(function() {
  var competencia = $(this).val();
  getTemas(competencia);
});
/* ------------------------------------------------------------------------------------------ */

/* Si cambian los filtros el nombre de la codificacion debe removerse */
$(".sf").change(function() {
  if ($("input[name=codigo]").val() != "") {
    $("input[name=codigo]").val("");
  }
});
/* ------------------------------------------------------------------------------------------ */

/* Llama funcion por cada cambio en el filtro */
$(".fp").change(function() {
  var competencia = $("#competencia").val();
  var tema = $("#tema").val();
  var zona = $("#zona").val();
  var indicador = $("#indicador").val();

  getFicheros(competencia, tema, zona, indicador);
});
/* ------------------------------------------------------------------------------------------ */

function getPDF(src) {
  $("#pdf").html(
    `<embed src="${src}" type="application/pdf" width="90%" height="90%">`
  );
}
/* ------------------------------------------------------------------------------------------ */

function getCompetencias() {
  $(".filtros_competencia").html(
    '<option value="" selected>No filtro</option>'
  );
  $.ajax({
    type: "POST",
    url: "server/getCompetencias.php",
    data: "",
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        var comp = element.competencia;
        var first = comp.charAt();
        $(".filtros_competencia").append(
          `<option value="${element.id_competencia}"> ${first} - ${
            element.competencia
          } </option>`
        );
      });
    }
  });
}
/* ------------------------------------------------------------------------------------------ */

/* Verifica que los filtros anteriores se hallan seleccionado para generar una codificacion */
function verificarCodigo() {
  $competencia = $("#sfichero_competencia").val();
  $tema = $("#sfichero_tema").val();
  $zona = $("#sfichero_zona").val();
  $indicador = $("#sfichero_indicador").val();

  if ($competencia == "" || $tema == "" || $zona == "" || $indicador == "") {
    swal({
      icon: "error",
      title: "Oops...",
      text: "Debes llenar los filtros señalados"
    });
  } else {
    countFicheros();
  }
}
/* ------------------------------------------------------------------------------------------ */

/* Genera la codificacion para contar los ficheros por cada zona y asi enumerarlo */
function countFicheros() {
  var data = {
    zona: $("#sfichero_zona").val()
  };
  $.ajax({
    type: "POST",
    url: "server/getFicheros.php",
    data: data,
    dataType: "json",
    success: function(response) {
      var length =
        response.length; /* Longitud del arreglo para determinar la el numero de fichero */

      var competencia = $("#sfichero_competencia option:selected").text();
      var tema = $("#sfichero_tema").val();
      var zona = $("#sfichero_zona").val();
      var indicador = $("#sfichero_indicador option:selected").text();

      $("#codigo").val(
        `${competencia.charAt(1)}_${indicador.charAt(1)}${tema}_${length +
          1}_Z${zona}` /* codigo del fichero */
        /* competencia & indicador=extrae el primer caracter del valor que esta seleccionado en el filtro */
        /* length= suma un valor mas de la cantidad que se trae de la consulta*/
      );
      $("#codigo").addClass(
        "jackInTheBox animated"
      ); /* Devuelve el codigo del fichero con animacion */
    }
  });
  $("#codigo").removeClass();
}
/* ------------------------------------------------------------------------------------------ */

/* Function para enviar el formulario de cargar archivo una vez se presione el botón submit */
$("#form-sfichero").submit(function(event) {
  event.preventDefault();
  showLoader();
  if ($("#codigo").val() != "") {
    $.ajax({
      type: "POST",
      url: "server/uploadFichero.php",
      data: new FormData(this),
      dataType: "json",
      encode: true,
      contentType: false,
      processData: false
    }).done(function(data) {
      if (data.success == 0) {
        removeLoader();
        swal({
          icon: "success",
          title: "Fichero subido!",
          text: data.message
        }).then(() => {
          $("input[name=fichero]").val("");
          $("input[name=codigo]").val("");
          location.reload();
        });
      } else {
        removeLoader();
        swal({
          icon: "error",
          title: "Problema al subir el fichero!",
          text: data.message
        });
      }
    });
  } else {
    swal({
      icon: "error",
      title: "Oops...",
      text: "No se ha generado el codigo del fichero!"
    });
  }
});
/* ------------------------------------------------------------------------------------------ */

/* Llama a las zonas para listarlas en los select */
function getZonas() {
  $(".filtros_zona").html('<option value="">No filtro</option>');
  $(".filtros_zona").append('<option value="0" >Z0 - Sin zona</option>');
  $.ajax({
    type: "POST",
    url: "server/getZonas.php",
    data: "",
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        $(".filtros_zona").append(
          `<option value="${element.id_zona}"> Z${element.id_zona} - ${
            element.zonas
          } </option>`
        );
      });
    }
  });
}
/* ------------------------------------------------------------------------------------------ */

/* Llama a los temas una vez se halla seleccionado la competencia en los filtros */
function getTemas(competencia) {
  $(".filtros_tema").html('<option value="" >No filtro</option>');
  $.ajax({
    type: "POST",
    url: "server/getTemas.php",
    data: {
      competencia: competencia
    },
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        $(".filtros_tema").append(
          `<option value="${element.id_temas}"> ${element.id_temas} - ${
            element.temas
          } </option>`
        );
      });
    }
  });
}
/* ------------------------------------------------------------------------------------------ */

/* Llama indicadores y los ubica en el filtro */
function getIndicadores() {
  $(".filtros_indicador").html('<option value="" >No filtro</option>');
  $.ajax({
    type: "POST",
    url: "server/getIndicadores.php",
    data: "",
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        var ind = element.indicador;
        var first = ind.charAt();
        $(".filtros_indicador").append(
          `<option value="${element.id_indicador}"> ${first} - ${
            element.indicador
          } </option>`
        );
      });
    }
  });
}
/* ------------------------------------------------------------------------------------------ */

/* Llama ficheros de acuerdo a los filtros y los imprime en el menú */
function getFicheros(competencia, tema) {
  $("#area-ficheros").html(
    `<img id="codificacion-img" src="img/codificacion.PNG" alt="">`
  );
  $("#pdf").html("");
  $.ajax({
    type: "POST",
    url: "server/getFicheros.php",
    data: {
      competencia: competencia,
      tema: tema
    },
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        $("#area-ficheros").append(
          `<a class="a_download" href="#${element.fichero_url}">${
            element.nombre
          }</a>`
        );
      });

      fichas();
      htmlString = $("#area-ficheros").text();
      if (htmlString.trim() == "") {
        $("#area-ficheros").html(
          '<p class="p-card">No hay ficheros para este filtro</p>'
        );
        $("#pdf").html('<p class="p-card">No hay pdfs</p>');
      }
    }
  });
}
/* ------------------------------------------------------------------------------------------ */

function fichas() {
  $(".a_download").click(function() {
    if ($(".a_download").hasClass("selected")) {
      $(".a_download").removeClass("selected");
      $(this).addClass("selected");
    } else {
      $(this).addClass("selected");
    }
    var url = $(this).attr('href');
    var urrl = url.substr(1);
    console.log(urrl);
    $("#pdf").html(
      `<embed src="${urrl}" type="application/pdf" width="90%" height="90%">`
    );
  });
}

function showLoader(){
  $('#request-loader').removeClass('hide');
  $('#request-loader').addClass('show');
}

function removeLoader(){
  $('#request-loader').addClass('hide');
  $('#request-loader').removeClass('show');
}
