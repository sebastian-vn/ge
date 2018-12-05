$(document).ready(function() {
  traerNombre();
  intervencionesPorZona();

  // CALENDAR

  $("#calendar").fullCalendar({
    defaultView: 'listWeek',
      events: {
      url: "php/calendarEventsCoordinadora.php",
      type: "POST", // Send post data,
      error: function(err) {
        alert("There was an error while fetching events.");
      }
    },
    eventClick: function(calEvent, jsEvent, view) {
      var year = calEvent.start._d.getFullYear() + "";
      var month = calEvent.start._d.getMonth() + 1 + "";
      var day = calEvent.start._d.getDate() + "";
      var dateFormat = year + "-" + month + "-" + day;
      $(".modal-title").html(calEvent.title);
      $("#eventFecha").html(dateFormat);
      $("#eventLugar").html(calEvent.lugar);
      $("#eventDescripcion").html(calEvent.descripcion);
      $("#eventHora").html(calEvent.hora);
      $("#eventGestor").html(calEvent.gestor);
      $("#eventZona").html(calEvent.zona);
      $("#eventModal").modal();
    }
  });
});

function getUbicaciones() {
  $.post(
    "php/home_Coordinadora.php",
    {
      accion: "getUbicaciones"
    },
    function(data) {
      if (data.error != 1) {
        iniciarMapa(data.html);
      } else {
        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10,
          center: new google.maps.LatLng(5.067774, -75.517053),
          mapTypeId: "roadmap"
        });
        swal(
          "Error", //titulo
          data.mensaje,
          "error"
        );
      }
    },
    "json"
  );
}

//Inicializacion del mapa con punto de Referencia.
var map;

function iniciarMapa(data) {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(5.067774, -75.517053),
    mapTypeId: "roadmap"
  });

  //Inicializacion de variables para los iconos del mapa.
  var iconBase = "img/icons/";
  var features = Array();
  data.forEach((element, index) => {
    features.push({
      position: new google.maps.LatLng(element.latitud, element.longitud),
      type: "gestor" + index,
      contentString: '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h2 id="firstHeading" class="firstHeading">'+ element.nombre +'</h2>'+
      '<div id="bodyContent">'+
      '<p><h6>Ultima actualización: </h6>' + element.fecha + '</p>'+
      '<p><h6>Planeación: </h6> La planeación toma lugar en la entidad <b>'+ element.entidad +'</b> '+ 
      ' en el marco de la estrategia <b>'+ element.estrategia +'</b> por medio del táctico <b>'+ element.tactico +'</b>.</p>'+
      '<p>Competencia: <b>'+ element.competencia +'</b></p>'+
      '<p>Comportamiento: <b>'+ element.comportamiento +'</b></p>'+
      '<p>Temas a implementar: <b>'+ element.tema +'</b></p>'+
      '<p><h6>Municipio: </h6>' + element.municipio + '</p>'+
      '<p><h6>Estado de la planeación: </h6>' + element.tipo_registro + '</p>'+
      '</div>'+
      '</div>',

      //contentString: element.nombres + " " + element.apellidos,
      foto: element.icon
    });
  });

  // Creacion del contenido del marcador de cada gestora

  // Inicializacio de la ventana que tendra el contenido de cada marcador
  features.forEach(function(feature) {});

  // Creación de marcadores en el mapa.
  features.forEach(function(feature) {
    var infowindow = new google.maps.InfoWindow({
      content: feature.contentString
    });

    var marker = new google.maps.Marker({
      position: feature.position,
      icon: iconBase + feature.foto,
      map: map,
      draggable: false
    });

    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  });

  //Asignacion de los contenidos al marcador

  $("#btnInformes").click(function() {
    window.location.href = "dashboard_Coordinadora.html";
  });
}

function traerNombre() {
  $.post(
    "php/CapturaVariableSession.php",
    {
      accion: "traerNombre"
    },
    function(data) {
      if (data != "") {
        $("#Nombre").html(data);
      } else {
        swal(
          "", //titulo
          "Debes iniciar sesion!",
          "error"
        );
        window.location.href = "welcome_Coordinadora.html";
      }
    },
    "json"
  );
}

function intervencionesPorZona() {
  $.post(
    "php/home_Coordinadora.php",
    {
      accion: "intervencionesPorZona"
    },
    function(data) {
      if (data.error != 1) {
        $("#intervercionesPorZona").html(data.html);
      } else {
        swal("Error", "No se cargaron los datos intentalo de nuevo", "error");
      }
    },
    "json"
  );
}

function mostrarDetalleIntervencion(idIntervencion) {
  window.location.href =
    "detalle_Intervencion_Coordinadora.html?idIntervencion=" + idIntervencion;
}

function agregarIntervencion(idZona) {
  window.location.href =
    "nueva_Intervencion_Coordinadora.html?idZona=" + idZona;
}

$("#nav-home-tab").on("click", function(e) {
  e.preventDefault();
  $(this).tab("show");
});

$("#nav-profile").on("click", function(e) {
  e.preventDefault();
  $(this).tab("show");
});
