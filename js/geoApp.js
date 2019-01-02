$(function () {
  checkLogged();

  $('#salir').click(() => {
    $('#logout').submit();
  });
});

var id_zona = getParam("id_zona");
let id_plan = getParam("id_plan");
let id_foc = getParam("id_foc");
let user = getParam("user");

function getParam(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ?
    "" :
    decodeURIComponent(results[1].replace(/\+/g, " "));
}

if (id_zona == "all") {
  getZonas();
} else {
  getPlaneaciones(id_zona);
}

function getZonas() {
  $.ajax({
    type: "POST",
    url: "server/getZonas.php",
    data: "",
    dataType: "json",
    success: function (response) {
      response.forEach(element => {
        $('#zona div').append(
          `<button type="button" onclick="getPlaneaciones(${element.id_zona})" class="btn zona">${element.zonas}</button>`
        );
      });
    }
  });
}

function getPlaneaciones(zona) {
  $('#planeaciones div').html('');
  $('#zona').addClass('hide');
  $.ajax({
    type: "POST",
    url: "server/getPlaneaciones.php",
    data: {
      geoAppPlan: zona
    },
    dataType: "json",
    success: function (response) {
      if (response == "") {
        if (id_zona == "all") {
          $('#planeaciones div').html(
            `<div class="alert alert-warning" role="alert">
              No hay planeaciones digitadas para hoy! <a class="btn btn-success" onclick="rtnBtn()" id="returnBtn">Regresar</a>
            </div>`
          );
        } else {
          $('#planeaciones div').html(
            `<div class="alert alert-warning" role="alert">
              No hay planeaciones digitadas para hoy!
            </div>`
          );
        }

      } else {
        response.forEach(element => {
          $('#divPlan').append(
            `<div id="card${element.id_planeacion}" class="card">
              <div class="card-header">
                ${element.municipio}
              </div>
              <div class="card-body">
                <h5 class="card-title">${element.comportamientos} - ${element.competencia}</h5>
                <p class="card-text">${element.nombre_estrategia}</p>
                <a class="btn btn-primary">Ver detalles <i class="fas fa-info-circle"></i></a>
                <a id="${element.id_planeacion}" onclick="getLocalizacion(${element.id_planeacion})" class="btn btn-success geoloc"> Iniciar actividad <i class="fas fa-map-marker-alt"></i></a>
                </div>
            </div>`
          );

          /* Switch for state of planeacion */
          switch (element.estado) {
            case "En Ejecución":
              $(`#${element.id_planeacion}`).addClass('en-ejecucion');
              $(`#${element.id_planeacion}`).html('Finalizar actividad <i class="fas fa-map-marker-alt"></i>');
              break;
            case "Ejecutado":
              $(`#${element.id_planeacion}`).remove();
              $(`#card${element.id_planeacion} .card-body`).append(
                `<div class="alert alert-success" role="alert">
                <i class="fas fa-check-circle" style="font-size: 2em;"></i>
                </div>`
              );
              break;

          }
        });
      }
    },
    complete: function () {
      $('#planeaciones').removeClass('hide');
    }
  });
}

function getLocalizacion(id_plan) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      $.ajax({
        type: "POST",
        url: "server/geoLocation.php",
        data: {
          id_plan: id_plan,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        dataType: "json",
        success: function (response) {
          if (response.etapa == "Iniciada") {
            $(`#${id_plan}`).addClass('en-ejecucion');
            $(`#${id_plan}`).html('Finalizar actividad <i class="fas fa-map-marker-alt"></i>');
          } else if (response.etapa == "Finalizada") {
            $(`#${id_plan}`).fadeOut();
            $(`#card${element.id_planeacion} .card-body`).append(
              `<div class="alert alert-success" role="alert">
              <i class="fas fa-check-circle" style="font-size: 2em;"></i>
              </div>`
            );
          }
        }
      });
    });
  } else {
    alert('La geolocalización no se encuentra disponible en este navegador');
  }
}

function checkLogged() {
  $.ajax({
    type: "POST",
    url: "server/checkLog.php",
    data: {
      zona: id_zona
    },
    dataType: "json"
  }).done(function (data) {
    if (data.error) {
      swal({
        type: "info",
        title: "Usuario",
        text: data.message
      }).then(function () {
        window.location.href = "iniciarSesion.html";
      });
    } else {
      $("#menu").click(function () {
        window.location.href = `home.html?user=${data.rol}&id_zona=${data.zona}`;
      });
      $('#nombre h3').html(`${data.nombre}`);
    }
  });
}


function rtnBtn() {
  $('#planeaciones').addClass('hide');
  $('#zona').removeClass('hide');
}