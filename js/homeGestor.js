$(function() {
  checkLogged();

  $("#datepicker").datepicker({
    locale: "es-es",
    uiLibrary: "bootstrap4",
    format: "dd-mm-yyyy"
  });

  $(".imgProfile img").click(function() {
    if ($(".profileDropdown").hasClass("activeProfile")) {
      $(".profileDropdown").removeClass("activeProfile");
    } else {
      $(".profileDropdown").addClass("activeProfile");
    }
  });

  if (user == 3 || user == "Gestor") {
    $("#rightPortion").html(
      `<div class="center" id="loaderCalendar">
        <div class="pulse">
          <img src="img/logo-min.png" alt="">
        </div>
      </div>
      <div id="calendar"></div>`
    );
  }

  $("#logOut a").click(function() {
    $("#logOut").submit();
  });

  $("#btnCancelarTAdmin").click(function() {
    $("#modalTAdmin").modal("toggle");
  });
});

var id_zona = getParam("id_zona");
let id_plan = getParam("id_plan");
let id_foc = getParam("id_foc");
let user = getParam("user");

if (id_zona == "all") {
  getZona();
} else {
  getMunicipioXZona("all");
}

function getParam(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getZona() {
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
              <a onClick="getMunicipioXZona(${element.id_zona}, '${element.zonas}')"><i class="fas fa-arrow-circle-right arrow"></i></a>
            </div>`
        );
      });
    },
    complete: function() {
      $(".zonas").fadeIn();
      $(".zonas").removeClass("showNone");
      $("#homeBreadCrumbs").removeClass("showNone");
      $("#loaderList").fadeOut();
      determineRtnBtn();
    }
  });
}

function getMunicipioXZona(zona, nombre_zona) {
  $(".zonas").fadeOut();
  $(".zonas").addClass("showNone");
  $(".municipios").html("");
  $("#loaderList").fadeIn();
  determineBreadcrumb("zona", nombre_zona);

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
                  <a href="registrarFocalizacionG.html?id_zona=${
                    element.id_zona
                  }&id_mun=${
            element.id_municipio
          }" class="btn"><i class="fas fa-plus crear"></i> Focalizar</a>
                  <a onclick="trabajoAdministrativo(${
                    element.id_municipio
                  })" class="btn"><i class="fas fa-plus crear"></i> Trabajo Administrativo</a>
                </div>
              </div>
              <a href="#${element.municipio}" onClick="getFocalizacionesXZona(${
            element.id_municipio
          }, '${element.municipio}')"><i class="fas fa-arrow-circle-right arrow"></i></a>
            </div>`
        );
      });
    },
    complete: function() {
      if (!$(".zona").hasClass("showNone")) {
        $(".zonas").fadeOut();
        $(".zonas").addClass("showNone");
        $("#returnZona").removeClass("showNone");
      }

      $(".municipios").fadeIn();
      $(".municipios").removeClass("showNone");
      $("#homeBreadCrumbs").removeClass("showNone");
      $("#loaderList").fadeOut();
      determineRtnBtn();
    }
  });
}

function getFocalizacionesXZona(mun, nom_mun) {
  $("#loaderList").fadeIn();
  $(".municipios").fadeOut();
  determineBreadcrumb("municipio", nom_mun);

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
              }, 'Gestión Institucional')"><i class="fas fa-arrow-circle-right arrow"></i></a>
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
                  <p>Tipo de focalización: ${element.tipo_focalizacion}</p>
                  <a href="registrarPlaneacionG.html?id_zona=${
                    element.id_zona
                  }&id_mun=${element.id_municipio}&id_foc=${
              element.id_focalizacion
            }&comport=${
              element.id_comportamientos
            }" class="btn"><i class="fas fa-plus crear"></i> Planear</a>
                </div>
              </div>
              <a href="#${element.comportamientos}-${
              element.competencia
            }" onclick="getPlaneacionesXFocalizacion(${
              element.id_focalizacion
            }, '${
              element.competencia
            }')"><i class="fas fa-arrow-circle-right arrow"></i></a>
            </div>`
          );
        }
      });
    },
    complete: function() {
      $(".focalizaciones").fadeIn();
      $(".focalizaciones").removeClass("showNone");
      $(".municipios").addClass("showNone");
      $("#loaderList").fadeOut();
      determineRtnBtn();
    }
  });
}

function getPlaneacionesXFocalizacion(foc, comp) {
  $("#loaderList").fadeIn();
  $(".focalizaciones").fadeOut();
  determineBreadcrumb("focalizacion", comp);
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
                <a href="registrarEjecucionG.html?id_plan=${
                  element.id_planeacion
                }&id_zona=${element.id_zona}&id_foc=${element.id_foc}"
                class="btn"><i class="fas fa-plus crear"></i> Ejecutar</a>
              </div>
            </div>
          </div>`
        );
      }
    },
    complete: function() {
      $("#loaderList").fadeOut();
      $(".planeaciones").fadeIn();
      $(".planeaciones").removeClass("showNone");
      determineRtnBtn();
    }
  });
}

function trabajoAdministrativo(id_mun) {
  $("#getMun").html("");
  $("#getMun").append(
    `<input type="number" id="municipio" name="municipio" value="${id_mun}">`
  );
  $("#modalTAdmin").modal("toggle");
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
      $(".profileDropdown").html(
        `<h6>${data.nombre}</h6>
        </hr>
        <form action="server/logOut.php" id="logOut">
          <a class="nav-link active" style="color: red" onclick="document.getElementById('logOut').submit();" >Cerrar Sesión</a>
        </form>
        <hr>
        <div id="modoSeguimiento">
          <label for="pCompleta">Pantalla completa</label>
            <input id="pCompleta" type="checkbox" checked data-on="Activado" data-off="Desactivado">
        </div>`
      );

      $("#pCompleta").bootstrapToggle("off");

      $("#lastSideNav").html(
        `<a class="nav-link" href="home.html?user=${data.rol}&id_zona=${
          data.zona
        }><i class="fas fa-home"></i></a>
        <a class="nav-link" href="banco/"><i class="fas fa-book"></i></a>`
      );

      $("#pCompleta").change(function() {
        if ($(this).prop("checked")) {
          $("#leftPortion").fadeOut();
          $("#leftPortion").addClass("showNone");
          $("#rightPortion").switchClass(
            "col-md-6",
            "col-md-12",
            200,
            "linear"
          );
          $("#rightPortion").switchClass(
            "col-lg-7",
            "col-lg-12",
            200,
            "linear"
          );
        } else {
          if ($("#leftPortion").hasClass("showNone")) {
            $("#rightPortion").switchClass(
              "col-md-12",
              "col-md-6",
              200,
              "linear"
            );
            $("#rightPortion").switchClass(
              "col-lg-12",
              "col-lg-7",
              200,
              "linear"
            );
            setTimeout(() => {
              $("#leftPortion").fadeIn();
              $("#leftPortion").removeClass("showNone");
            }, 200);
          }
        }
      });
    }
  });
}

function insertTAdmin() {
  $("#modalLoader").fadeIn();
  $("#modalLoader").removeClass("showNone");
  $.ajax({
    type: "POST",
    url: "server/insertTrabajoAdministrativo.php",
    data: $("#formTAdmin").serialize(),
    dataType: "json",
    success: function(response) {
      insertLaboresXTAdmin();
    }
  });
}

function insertLaboresXTAdmin() {
  $.ajax({
    type: "POST",
    url: "server/insertTrabajoAdministrativo.php",
    data: "data",
    dataType: "json",
    success: function(response) {
      id_ta = response[0].max;
      arrayLabores = [];
      $("input[name=tAdmin]:checked").each(function() {
        arrayLabores.push($(this).val());
      });
      $.ajax({
        type: "POST",
        url: "server/insertLaboresXTrabajo.php",
        data: {
          labores: arrayLabores,
          id_ta: id_ta
        },
        dataType: "json",
        success: function(response) {
          swal({
            type: "success",
            title: response
          }).then(function() {
            document.getElementById("formTAdmin").reset();
            $("#modalTAdmin").modal("toggle");
          });
        },
        complete: function() {
          $("#modalLoader").fadeOut();
          $("#modalLoader").addClass("showNone");
          getPlaneacionesCalendar();
        }
      });
    }
  });
}

function returnMunicipio() {
  $(".focalizaciones").fadeOut();
  $(".focalizaciones").addClass("showNone");
  $(".municipios").fadeIn();
  $(".municipios").removeClass("showNone");
  determineRtnBtn();
  if($(".breadcrumb #municipio").length > 0) $(".breadcrumb #municipio").remove();
}

function returnFocalizacion() {
  $(".planeaciones").fadeOut();
  $(".planeaciones").addClass("showNone");
  $(".focalizaciones").fadeIn();
  determineRtnBtn();
  if($(".breadcrumb #focalizacion").length > 0) $(".breadcrumb #focalizacion").remove();
}

function returnZona() {
  $(".breadcrumb").html("");
  $(".municipios").fadeOut();
  $(".municipios").addClass("showNone");
  $(".zonas").fadeIn();
  $(".zonas").removeClass("showNone");
  determineRtnBtn();
  if($(".breadcrumb #zona").length > 0) $(".breadcrumb #zona").remove();
}

function determineBreadcrumb(column, name) {
  switch (column) {
    case "zona":
      $(".breadcrumb").html("");
      $(".breadcrumb").append(
        `<li class="breadcrumb-item" id="zona"><a href="#" onclick="returnMunicipio()">${name}</a></li>`
      );
      break;

    case "municipio":
      var selector = ".breadcrumb";
      if ($(".breadcrumb #municipio").length > 0) {
        selector = ".breadcrumb #municipio";
      }
      $(`${selector}`).append(
        `<li class="breadcrumb-item" id="municipio"><a href="#" onclick="returnFocalizacion()">${name}</a></li>`
      );
      break;

    case "focalizacion":
      var selector = ".breadcrumb";
      if ($(".breadcrumb #focalizacion").length > 0) {
        selector = ".breadcrumb #focalizacion";
      }
      $(`${selector}`).append(
        `<li class="breadcrumb-item" id="focalizacion"><a href="#" onclick="">${name}</a></li>`
      );
      break;
    default:
      break;
  }
}

function determineRtnBtn() {
  var homeCard = document.getElementsByClassName("homeCard");
  for (i = 0; i < homeCard.length; i++) {
    classList = homeCard[i].className.split(/\s+/);
    if (classList.indexOf("showNone") == -1) {
      var element = homeCard[i].id;
    }
  }

  switch (element) {
    case "municipios":
      showReturnBtn("returnZona");
      break;

    case "focalizaciones":
      showReturnBtn("returnMunicipio");
      break;

    case "planeaciones":
      showReturnBtn("returnFocalizacion");
      break;

    default:
      showReturnBtn("");
      break;
  }
}

function showReturnBtn(btn) {
  var rtnbtns = document.getElementsByClassName("returnBtn");
  for (i = 0; i < rtnbtns.length; i++) {
    if (rtnbtns[i].id == btn) {
      if (rtnbtns[i].classList.contains("showNone")) {
        rtnbtns[i].classList.remove("showNone");
      }
    } else if (!rtnbtns[i].classList.contains("showNone")) {
      rtnbtns[i].classList.add("showNone");
    }
  }
}
