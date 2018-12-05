$(function () {

    traerNombre();

    $.get = function (key) {
        key = key.replace(/[\[]/, '\\[');
        key = key.replace(/[\]]/, '\\]');
        var pattern = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var url = unescape(window.location.href);
        var results = regex.exec(url);
        if (results === null) {
            return null;
        } else {
            return results[1];
        }
    }

    idZona = $.get("id_zona");

    intervencionesPorZona(idZona);

    $('#calendar').fullCalendar({
        defaultView: 'listWeek',
        events: {
            url: 'php/calendarEvents.php',
            type: 'POST', // Send post data,
            data: { id_zona: idZona },
            error: function (err) {
                alert('There was an error while fetching events.');
            }
        },
        eventClick: function (calEvent, jsEvent, view) {
            var year = calEvent.start._d.getFullYear() + "";
            var month = (calEvent.start._d.getMonth() + 1) + "";
            var day = calEvent.start._d.getDate() + "";
            var dateFormat = year + "-" + month + "-" + day;
            $('.modal-title').html(calEvent.title);
            $('#eventFecha').html(dateFormat);
            $('#eventLugar').html(calEvent.lugar);
            $('#eventDescripcion').html(calEvent.descripcion);
            $('#eventHora').html(calEvent.hora);
            $('#eventModal').modal();
        }
    });
});

function traerNombre() {

    $.post("php/CapturaVariableSession.php", {
        accion: 'traerNombre'


    },
        function (data) {
            if (data !=- "") {
                $('#Nombre').html(data);
            } else {
                swal(
                    '', //titulo
                    'Debes iniciar sesion!',
                    'error'
                );
                window.location.href = "welcome_Gestora.html";
            }
        }, "json");

}

function intervencionesPorZona(id_zona) {

    $.post("php/home_Gestora.php", {
        accion: 'intervencionesPorZona',
        id_zona: id_zona
    },
        function (data) {
            if (data.error != 1) {
                $('.interv-container').append(data.html);
            } else {
                swal(
                    'Error',
                    'No se cargaron los datos intentalo de nuevo',
                    'error'
                );
            }

            $('.loader').hide();
        }, "json");
}

function mostrarDetalleIntervencion(idIntervencion) {
    idZona = $.get("id_zona");
    window.location.href = "detalle_Intervencion_Gestora.html?idIntervencion=" + idIntervencion + "&id_zona=" + idZona;
}

function agregarIntervencion() {
    idZona = $.get("id_zona");
    window.location.href = "nueva_Intervencion_Gestora.html?id_zona=" + idZona;
}

function navegar_home() {
    idZona = $.get("id_zona");
    window.location.href = "home_Gestora.html?id_zona=" + idZona;
}