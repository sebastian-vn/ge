$(function() {
  checkLogged();
});

var id_zona = getParam("id_zona");
let id_plan = getParam("id_plan");
let id_foc = getParam("id_foc");
let user = getParam("user");

function getParam(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$("#focalizacion").click(function() {
  if (id_zona == "all") {
    getZona("focalizacion");
  } else {
    getMunicipioXZona(id_zona, "focalizacion");
  }
});

$("#ejecucion").click(function() {
  if (id_zona == "all") {
    getZona("planeacion");
  } else {
    getMunicipioXZona(id_zona, "planeacion");
  }
});

$("#planeacion").click(function() {
  if (id_zona == "all") {
    getZona("ejecucion");
  } else {
    getMunicipioXZona(id_zona, "ejecucion");
  }
});

$('#evaluacion').click(function(){
  $('.modEvaluacion').removeClass('showNone');
  $('#welcome1').addClass('showNone');
});

$('#return').click(function(){
  $('.modEvaluacion').addClass('showNone');
  $('#welcome1').removeClass('showNone');
})

function getZona(btn) {
  $("#opcionesTitulo").html("Seleccione la zona");
  $(".zonas").html("");
  $.ajax({
    type: "POST",
    url: "server/getZonas.php",
    data: "",
    dataType: "json",
    success: function(response) {
      response.forEach(element => {
        $(".zonas").append(
          ` <div>
              <div class="card">
                <div class="card-header">
                  Zona ${element.id_zona}: ${element.zonas}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Gestor: ${element.nombre}</h5>
                </div>
              </div>
              <a onClick="getMunicipioXZona(${
                element.id_zona
              }, '${btn}')"><i class="fa fa-arrow-circle-right"></i></a>
            </div>`
        );
      });
    },
    complete: function() {
      $("#opcionesModal").modal({ backdrop: "static" });
      $(".zonas").fadeIn();
      $(".zonas").removeClass("showNone");
    }
  });
}

function getMunicipioXZona(zona, btn) {
  $("#opcionesTitulo").html("Seleccione el municipio");
  $(".zonas").fadeOut();
  $(".zonas").addClass("showNone");
  $(".municipios").html("");

  if (zona == "all") zona = id_zona;
  $.ajax({
    type: "POST",
    url: "server/getMunicipios.php",
    data: {
      zona: zona
    },
    dataType: "json",
    success: function(data) {
      data.forEach(element => {
        $(".municipios").append(
          ` <div>
              <div class="card">
                <div class="card-header">
                  ${element.zonas}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${element.municipio}</h5>
                </div>
              </div>
              <a id="${
                element.municipio
              }"><i class="fa fa-arrow-circle-right"></i></a>
            </div>`
        );

        $(`#${element.municipio}`).click(function() {
          if (btn != "focalizacion") {
            getFocalizacionesXZona(`${element.id_municipio}`, `'${btn}'`);
          } else {
            window.location.href = `registrarFocalizacionG.html?id_zona=${
              element.id_zona
            }&id_mun=${element.id_municipio}`;
          }
        });
      });
    },
    complete: function() {
      if (id_zona != "all") {
        $("#opcionesModal").modal({ backdrop: "static" });
      }
      $(".zonas").addClass("showNone");
      $(".municipios").fadeIn();
      $(".municipios").removeClass("showNone");
    }
  });
}

function getFocalizacionesXZona(mun, btn) {
  $('#opcionesTitulo').html('Seleccione la focalización');
  $.ajax({
    type: "POST",
    url: "server/getFocalizaciones.php",
    data: {
      municipio: mun
    },
    dataType: "json",
    success: function(data) {
      $(".focalizaciones").html("");
      data.forEach(element => {
        if (element.id_tipo_gestion == 2) {
          $(".focalizaciones").append(
            `<div>
              <div class="card">
                <div class="card-header">
                  Fecha registro: ${element.fecha}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Gestión Institucional</h5>
                  <a href="registrarPlaneacionG.html?id_zona=${
                    element.id_zona
                  }&id_mun=${element.id_municipio}&id_foc=${
              element.id_focalizacion
            }" class="btn"><i class="fas fa-plus crear"></i> Planear</a>
                </div>
              </div>
              <a onclick="getPlaneacionesXFocalizacion(${
                element.id_focalizacion
              }, 'Gestión Institucional')"><i class="fa fa-arrow-circle-right"></i></a>
            </div>`
          );
        } else {
          $(".focalizaciones").append(
            `<div>
              <div class="card">
                <div class="card-header">
                Fecha registro: ${element.fecha}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${element.comportamientos} - ${
              element.competencia
            }</h5>
                  <p>Tipo de focalización: ${element.tipo_foc}</p>

                </div>
              </div>
              <a id="${
                element.competencia
              }"><i class="fa fa-arrow-circle-right"></i></a>
            </div>`
          );
        }

        $(`#${element.competencia}`).click(function() {
          if(btn != "planeacion"){
            getPlaneacionesXFocalizacion(element.id_focalizacion);
          }else{
            window.location.href = `registrarPlaneacionG.html?id_zona=${
              element.id_zona
            }&id_mun=${element.id_municipio}&id_foc=${element.id_focalizacion}&comport=${element.id_comportamientos}`;;
          }
        });
      });
    },
    complete: function() {
      $(".focalizaciones").fadeIn();
      $(".focalizaciones").removeClass("showNone");
      $(".municipios").fadeOut();
      $(".municipios").addClass("showNone");
    }
  });
}

function getPlaneacionesXFocalizacion(foc, comp) {
  console.log(foc);
  $('#opcionesTitulo').html('Seleccione la planeación');
  $.ajax({
    type: "POST",
    url: "server/getPlaneaciones.php",
    data: {
      foc: foc
    },
    dataType: "json",
    success: function(response) {
      $(".planeaciones").html("");
      for (var arrayIndex in response) {
        var element = response[arrayIndex];
        var arrEstrategia = response[arrayIndex].nombre_estrategia;
        var estrategias = arrEstrategia.join(" - ");

        $(".planeaciones").append(
          `<div>
            <div class="card">
              <div class="card-header">
                Fecha de planeación : ${element.fecha_plan} </br>
                Fecha de registro : ${element.fecha_registro}
              </div>
              <div class="card-body">
                <h5 class="card-title"> ${estrategias}</h5>
                <p>Tipo : ${element.tipo_gestion}</p>
                <p>Tema : ${element.temas}</p>
              </div>
            </div>
            <a href="registrarEjecucionG.html?id_plan=${
              element.id_planeacion
            }&id_zona=${element.id_zona}&id_foc=${element.id_foc}"
            class="btn"><i class="fa fa-arrow-circle-right"></i></a>
          </div>`
        );
      }
    },
    complete: function() {
      $('.focalizaciones').fadeOut();
      $('.focalizaciones').addClass('showNone');
      $(".planeaciones").fadeIn();
      $(".planeaciones").removeClass("showNone");
    }
  });
}

function checkLogged() {
  $.ajax({
    type: "POST",
    url: "server/checkLog.php",
    data: {
      zona: id_zona
    },
    dataType: "json"
  }).done(function(data) {
    if (data.error) {
      swal({
        type: "info",
        title: "Usuario",
        text: data.message
      }).then(function() {
        window.location.href = "iniciarSesion.html";
      });
    } else {
      $("#menu").click(function () {
        window.location.href = `home.html?user=${data.rol}&id_zona=${data.zona}`;
      });
    }
  });
}
