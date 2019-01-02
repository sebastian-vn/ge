$(function () {
  var containerEl = $("#calendar");
  getPlaneacionesCalendar();
  containerEl.fullCalendar({
    themeSystem: "bootstrap4",
    customButtons: {
      detalles: {
        text: "Indicador Calendario",
        click: function () {
          $("#modalCalendarDetails").modal("toggle");
        }
      }
    },
    height: getCalendarHeight(),
    header: {
      left: "prev,next, today, detalles",
      center: "title",
      right: "month,listWeek,agendaDay"
    },
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    draggable: false,
    eventLimit: true, // allow "more" link when too many events

    eventRender: function eventRender(event, element, view) {
      return ["0", event.zona].indexOf($("#calendarSelect").val()) >= 0;
    },
    eventClick: function (event, jsEvent, view) {
      document.getElementById(
        "modalEventHeader"
      ).style.cssText = `background-color: ${event.color} !important`;
      setModal(event.color)
      $("#modalEventTitle").html(event.title);
      $("#modalEventTitle").css('color', 'white');
      $("#modalEventDescription #left").html(event.description);
      $("#modalEventDescription #right").html(event.estado);
      $("#modalEventsCalendar").modal();
    }
  });

  //
  $(window).resize(function () {
    $('#calendar').fullCalendar('option', 'height', getCalendarHeight());
  });

  //Adds showNone to calendar class when created.
  var calendar = document.getElementById("calendar");
  calendar.className += " showNone";
});

/* PARAMETERS */
id_zona = getParam("id_zona");

function getParam(param) {
  param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null ?
    "" :
    decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getPlaneacionesCalendar() {
  $("#loaderCalendar").fadeIn();
  $.ajax({
    type: "POST",
    url: "server/getPlaneacionesCalendar.php",
    data: {
      planEjec_cal: ""
    },
    dataType: "json",
    success: function (dataEjecutado) {
      $("#calendar").fullCalendar("addEventSource", dataEjecutado);

      $.ajax({
        type: "POST",
        url: "server/getPlaneacionesCalendar.php",
        data: {
          no_ejec: ""
        },
        dataType: "json",
        success: function (dataNoEjecutado) {
          $("#calendar").fullCalendar("addEventSource", dataNoEjecutado);
          var fullArrayPlans = dataEjecutado;

          if (fullArrayPlans == "") {
            fullArrayPlans = "";
          }

          $.ajax({
            type: "POST",
            url: "server/getPlaneacionesCalendar.php",
            data: {
              plan_cal: fullArrayPlans
            },
            dataType: "json",
            success: function (dataPlans) {
              if (!dataPlans.error) {
                $("#calendar").fullCalendar("addEventSource", dataPlans);
              }
              getTrabajoAdministrativo();
            }
          });
        }
      });
    }
  });
}

function getTrabajoAdministrativo() {
  $.ajax({
    type: "POST",
    url: "server/getTAdministrativos.php",
    data: "",
    dataType: "json",
    success: function (response) {
      $("#calendar").fullCalendar("addEventSource", response);
      $("#calendar").fullCalendar("rerenderEvents");
    },
    complete: function () {
      $("#calendar").fadeIn();
      $("#calendar").removeClass("showNone");
      $("#loaderCalendar").fadeOut();

      /* Append filter for calendar to choose specific zones */
      $(".fc-left").append(
        `<select class="custom-select" id="calendarSelect">
          <option value="0" selected>Todos</option>
          <option value="Centro">Centro</option>
          <option value="Suroccidente">Suroccidente</option>
          <option value="Occidente">Occidente</option>
          <option value="Noroccidente">Noroccidente</option>
          <option value="Oriente">Oriente</option>
        </select>`
      );

      $("#calendarSelect").on("change", function () {
        $("#calendar").fullCalendar("rerenderEvents");
      });

      $("#calendar").fullCalendar("rerenderEvents");
      getCalendarEventsZona();
    }
  });
}

function getCalendarHeight() {
  return $(window).height() - 151;
}

function getCalendarEventsZona() {
  if (id_zona != "all") {
    var zonas = {
      1: "Centro",
      2: "Suroccidente",
      3: "Occidente",
      4: "Noroccidente",
      5: "Oriente"
    }

    $('#calendarSelect').val(zonas[id_zona]);
    $("#calendar").fullCalendar("rerenderEvents");
  }
}

function setModal(color){
  if (color != '#edbe00' && color != '#269226') {
    if (!$("#modalEventDescription #left").hasClass('planeado')) {
      $("#modalEventDescription #left").addClass('planeado');
      $("#modalEventDescription #right").addClass('showNone');
    }
  } else {
    if ($("#modalEventDescription #left").hasClass('planeado')) {
      $("#modalEventDescription #left").removeClass('planeado');
      $("#modalEventDescription #right").removeClass('showNone');
    }
  }
}