$(document).ready(function() {
  /* Functions */
  checkLogged();
  getTipoGestion();
  getDetallePlaneacion();
  getTotal("#tipoPoblacion input[type=number]", true);
  getTotal("#caracteristicasPoblacion input[type=number]", false);
  showTab(currentTab); // Display the current tab
  document.getElementById("noEjecucion").checked = false;

  $('#horaInicio').timepicker({
    uiLibrary: 'bootstrap4'
  });

  $('#horaFin').timepicker({
    uiLibrary: 'bootstrap4'
  })

  $("#datepicker").datepicker({
    uiLibrary: "bootstrap4"
  });

  $("#datepickerNoEjecucion").datepicker({
    uiLibrary: "bootstrap4"
  });

  if (
    $("select").change(function() {
      if ($(this).hasClass("invalid")) {
        $(this).removeClass("invalid");
      }
    })
  );

  $("#tableCaracteristica").DataTable({
    scrollX: true,
    searching: false,
    lengthChange: false,
    info: false,
    paging: false
  });

  //Prevent from typing negative numbers
  $("input[type=number]").keydown(function(e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  });

  $("#tipoPoblacion")
    .find($("input[type=number]"))
    .change(() => {
      var element = "#tipoPoblacion input[type=number]";
      var index = true;
      getTotal(element, index);
    });

  $("#caracteristicasPoblacion")
    .find($("input[type=number]"))
    .change(() => {
      var element = "#caracteristicasPoblacion input[type=number]";
      var index = false;
      getTotal(element, index);
    });

  // When time input changes
  $("input[type=time]").change(function() {
    calcularDuracion();
  });

  //When window resizes
  $(window)
    .resize(resize)
    .trigger("resize");
});

var id_zona = getParam("id_zona");
let id_plan = getParam("id_plan");
let id_foc = getParam("id_foc");

function getParam(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getTipoGestion() {
  $.ajax({
    type: "POST",
    url: "server/getTipoGestion.php",
    data: {
      tipo_gestion: id_foc
    },
    dataType: "json",
    success: function(response) {
      if (response[0].id_tipo_gestion != 1) {
        $("#detalleCardContentGF").addClass("showNone");
        $("#colPoblacion").addClass("showNone");
      } else {
        $("#colActaReunion").addClass("showNone");
      }
    }
  });
}

var currentTab = 0; // Current tab is set to be the first tab (0)

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Guardar";
  } else {
    document.getElementById("nextBtn").innerHTML = "Siguiente";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    insertEjecucion();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByClassName("required");
  k = x[currentTab].getElementsByClassName("totales");
  //Verifies if spans have equal value
  if (k.length != 0) {
    if (parseInt(k[0].innerHTML) != parseInt(k[1].innerHTML)) {
      valid = false;
      swal({
        type: "error",
        title: "Los totales no concuerdan"
      });
    }
    if (parseInt($("input[name=ninguno]").val()) < 0) {
      valid = false;
      swal({
        icon: "error",
        title: "No puede haber un campo negativo"
      });
    }
  }

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].parentElement.parentElement.style.display != "none") {
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function getTotal(data, index) {
  let tipoInputObject = $(data);
  let tipoInputArray = tipoInputObject.get();
  var totalTipo = 0;
  var totalCaract = 0;
  let x = parseInt($("#tipoTotal").html());

  tipoInputArray.forEach(element => {
    if (index) {
      totalTipo += parseInt(element.value);
    } else if (!index) {
      if (element.name != "ninguno") {
        x = x - parseInt(element.value);
        if (x < 0) {
          x = 0;
        }
        $("input[name=ninguno]").val(`${x}`);
      }
      totalCaract += parseInt(element.value);
    }
  });

  if (index) {
    $("#tipoTotal").html(`${totalTipo}`);
    $("input[name=ninguno]").val(
      `${parseInt($("input[name=ninguno]").val()) +
        (parseInt($("#tipoTotal").html()) -
          parseInt($("#caractTotal").html()))}`
    );
    $("#caractTotal").html(`${totalTipo}`);
  }

  if (!index) {
    $("#caractTotal").html(`${totalCaract}`);
  }
}

var isChecked = false; // Sets that radio is unchecked for condition

function getChecked() {
  var radio = document.getElementById("noEjecucion");
  var alert = document.getElementById("divNoEjecucionDad");

  if (!isChecked) {
    radio.checked = true;
    isChecked = true;
    alert.classList.add("danger"); // Adds danger indicating that radio is active
    $("#modalNoEjecucion").modal({
      keyboard: false,
      backdrop: "static"
    }); //
  } else {
    radio.checked = false;
    isChecked = false;
    alert.classList.remove("danger");
  }
}

// When window resizes change class
function resize() {
  if ($(window).width() <= 1171) {
    $("#colCreateEjec")
      .removeClass("col-lg-8")
      .addClass("col-lg-12");
  } else {
    if ($("#colCreateEjec").hasClass("col-lg-12")) {
      $("#colCreateEjec")
        .removeClass("col-lg-12")
        .addClass("col-lg-8");
    }
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
      $('#homeBtn').attr('href', `home.html?user=${data.rol}&id_zona=${data.zona}`);
    }
  });
}

function insertEjecucion() {
  $(".loader").fadeIn();
  $.ajax({
    type: "POST",
    url: "server/insertEjecucion.php",
    data: `${$("#ejecForm").serialize()}&id_plan=${id_plan}`,
    dataType: "json",
    success: function(response) {
      if(!validarRegistros()){
        swal({
          type: "success",
          title: response.message
        }).then(function() {
          $(".loader").fadeOut();
          window.location.href = $('#homeBtn').attr('href');
        });
      }
    }
  });
}

function insertNoEjecucion() {
  var fechaPlan = $("#fechaDetallePlan").html().trim();

  if (
    $("textarea[name=descripcionNovedad]").val() == "" ||
    $("input[name=fechaAplazada]").val() == "") {

    swal({
      type: "error",
      title: "Debe digitar todos los campos para continuar"
    });
  } else {
    $(".loader").fadeIn();
    $.ajax({
      type: "POST",
      url: "server/insertNovedadNoEjecucion.php",
      data: `${$("#formNoEjec").serialize()}&id_plan=${id_plan}&no_ejec=&fecha_plan=${fechaPlan}`,
      dataType: "json",
      success: function(response) {
        swal({
          type: "success",
          title: response
        }).then(function() {
          $.ajax({
            type: "POST",
            url: "server/insertNovedadNoEjecucion.php",
            data: `${$("#formNoEjec").serialize()}&id_plan=${id_plan}&aplazar_plan=`,
            dataType: "json",
            success: function (response) {
              swal({
                type: "success",
                title: response
              }).then(function(){
                $(".loader").fadeOut();
                window.location.href = $("#homeBtn").attr("href");
              });
            }
          });
        });
      }
    });
  }
}

function getDetallePlaneacion() {
  $.ajax({
    type: "POST",
    url: "server/getPlaneaciones.php",
    data: {
      detallePlaneacion: id_plan
    },
    dataType: "json",
    success: function(response) {
      $('.detalleEjec').append(
        `<div id="detalleCardContentGI">
        <div class="row">
          <h5 class="title">
            Fecha de la planeación: &nbsp;<h6 id="fechaDetallePlan"> ${response[1].fecha}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Gestor: <h6> &nbsp; ${response[1].gestor}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Zona: <h6> &nbsp; ${response[1].zona}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Municipio: <h6> &nbsp; ${response[1].mun}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Entidad: <h6> &nbsp; ${response[1].entidad}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Comportamiento / Competencia: <h6> &nbsp; ${response[1].compor} / ${response[1].compe}</h6>
          </h5>
        </div>
      </div>
      <hr>
      <div id="detalleCardContentGF">
        <div class="row">
          <h5 class="title">
            Estrategias: <h6> &nbsp; ${response[1].estrategias}</h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Tacticos: <h6 id="tacticosList"> &nbsp; <ul></ul></h6>
          </h5>
        </div>
        <hr>
        <div class="row">
          <h5 class="title">
            Temas: <h6> &nbsp; ${response[1].temas}</h6>
          </h5>
        </div>
        <hr>
      </div>`
      )

      $('#detalleEjecModalBody ').append(
        `<div class="row rowForms">
          <div class="col-lg-12 col-md-12 col-sm-12 colBtnDetalle">
            <button id="cerrarDetalleModal" data-toggle="modal" data-target="#detalleEjecModal" type="button" class="btn btn-danger">Cerrar</button>
          </div>
        </div>`
      )

      var tactic = response[1].tacticos;
      for (let index = 0; index < tactic.length; index++) {
        const element = tactic[index];
        $('#tacticosList ul').append(
          `<li>${element}</li>`
        )
      }
    }
  });
}
