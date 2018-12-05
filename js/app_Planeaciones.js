$(function () {
    
    /*Extrae los parametros que llegan en la url
	 * parametro: 
	 */
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

    //evento para cambiar la funcion del boton iniciar ejecución de actividad a finalizar.

    $('#iniciar_ejecucion').click(function () {
        registrarUbicacion();
    });

    idPlaneacion = $.get('id_planeacion');
    traerNombre();
    cargarInfoPlaneacion(idPlaneacion);

});

function traerNombre() {

    $.post("php/CapturaVariableSession.php", {
        accion: 'traerNombre'


    },
        function (data) {
            if (data != "") {
                $('#Nombre').html(data);
            } else {
                swal(
                    '', //titulo
                    'Debes iniciar sesion!',
                    'error'
                );
                window.location.href = "app_Login.html";
            }
        }, "json");

}

function cargarInfoPlaneacion(idPlaneacion){
    $.post("php/app_gestora.php", {
        accion: 'detallesPlaneacion',
        id_planeacion: idPlaneacion
    },function (data) {
        if (data.error != 1) {
            $('#municipio').html(data.html.municipio);
            $('#tipo').html(data.html.tipo_intervencion);
            $('#comportamiento').html(data.html.comportamientos);
            $('#fecha').html(data.html.fecha);
            $('#jornada').html(data.html.jornada);
            $('#estrategia').html(data.html.nombreestrategia);
            $('#tactico').html(data.html.nombretactico);
            if(data.html.nombreentidad){
                $('#entidad').html(data.html.nombreentidad);
            }else{
                $('.esconder').hide();
            }
            if(data.html.tipo_registro){
                $("#iniciar_ejecucion")
                            .removeClass("btn-success")
                            .addClass("btn-danger")
                            .html('<i class="fa fa-map-marker" aria-hidden="true"></i> Finalizar Ejecución de Actividad');
            }


        } else {
            swal(
                'Error',
                data.mensaje,
                'error'
            ).then(function(){window.location.href = "app_Login.html";});
        }
        $('.loader').hide();
    }, "json");
}

function navegarIntervenciones(){
    idZona = $.get('id_zona');
    window.location.href='app_Intervenciones.html?id_zona='+idZona;
}

function registrarUbicacion(){
    $('.loader').show();
    idPlaneacion = $.get('id_planeacion');
    if($("#iniciar_ejecucion").hasClass('btn-success')){
        var registro = 'Inicio';
    }else{
        var registro = 'Finalización';
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            $.post("php/app_gestora.php", {
                accion: 'guardarUbicacion',
                id_planeacion: idPlaneacion,
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
                tipo_registro: registro
            },function (data) {
                if (data.error != 1) {
                    $('.loader').hide();
                    if(registro=='Inicio'){
                        $("#iniciar_ejecucion")
                            .removeClass("btn-success")
                            .addClass("btn-danger")
                            .html('<i class="fa fa-map-marker" aria-hidden="true"></i> Finalizar Ejecución de Actividad');
                    }else{
                        navegarIntervenciones();
                    }
                } else {
                    $('.loader').hide();
                    swal(
                        'Error',
                        data.mensaje,
                        'error'
                    ).then(function(){window.location.href = "app_Login.html";});
                    
                }
            }, "json");
          });
    } else {
        alert("Geolocation is not supported by this browser.");
    }




    
}



