$(document).ready(function() {

    /*Extrae los parametros que llegan en la url
     * parametro: 
     */
    $.get = function(key) {
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

    /* Get values from url */
    idZona = $.get("id_zona");
    id_planeacion = $.get("id_planeacion");
    traerNombre();
    cargarJornadas();
    cargarPoblacion();
    cargarEstrategias();
    cargarTipoEntidad();
    cargarEtapas();


    $("#planeacion2").hide();
    $("#planeacion3").hide();
    idEtapa = "";
    idPlaneacion = "";
    contacto = "";
    nombreContacto = "";
    cargoContacto = "";
    telefonoContacto = "";
    correoContacto = "";

    $("#btnBancoHerramientas").click(function() {

        // window.location.href = "Banco de Herramientas V2/index.html";
        window.open("Banco de Herramientas V2/index.html", '_blank');

    });

    var dateToday = new Date();
    var dates = $("#fecha_planeacion").datepicker({
        defaultDate: "+1w",
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        changeYear: true,
        numberOfMonths: 1,
        onSelect: function(selectedDate) {
            var option = this.id == "from" ? "minDate" : "maxDate",
                instance = $(this).data("datepicker"),
                date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });


    idIntervencion = $.get("idIntervencion");
    comportamientos = $.get("comportamientos");
    competencia = $.get("competencia");
    idComportamientos = $.get("idComportamientos");
    idCompetencia = $.get("idCompetencia");
    idEntidad = $.get("idEntidad");

    $("#spanComportamiento,#spanComportamientog").html(comportamientos);
    $("#spanCompetencia, #spanCompetenciag").html(competencia);
    cargarEntidades(idIntervencion);

    $('#btnNuevaEntidad').click(function() {
        $("#ex1").modal({
            fadeDuration: 500,
            fadeDelay: 0.50,
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
        $('.imagenGestora').removeClass('imagenGestora')

    })

    /* Set first radio to checked */
    $("#radiosComunidadEspecial-0").prop("checked", true);

    /* Verifies if the page is update o create if one of the values of the url exists */
    if (id_planeacion != null) {
        document.getElementById("buttonGuardarPlaneacion").style.display = "none";
        document.getElementById("buttonActualizar").style.display = "inline";
        setTimeout(cargarPlaneacionFormulario(id_planeacion), 5000);
    }

});

/*Consulta el nombre de la persona que inicio sesión
 * parametro: 
 */
function traerNombre() {

    $.post("php/CapturaVariableSession.php", {
            accion: 'traerNombre'


        },
        function(data) {
            if (data != "") {
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

/*Consulta las jornadas
 * parametro: 
 */
function cargarJornadas() {

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarJornadas'


        },
        function(data) {
            if (data != "") {
                $('#selectbasicJornada').html(data.html);
            }

        }, "json");
}

function cargarTipoEntidad() {
    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarTipoEntidad'
        },
        function(data) {
            if (data.error != 1) {
                $('#selectbasicTipoEntidad').html(data.html);
            }
        }, "json");
}

/*Consulta las jornadas
 * parametro: 
 */
function cargarPoblacion() {

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarPoblacion'


        },
        function(data) {
            if (data != "") {
                $('#selectbasicPoblacion').html(data.html);
            }

        }, "json");
}

/*Consulta las estrategias
 * parametro: 
 */
function cargarEstrategias() {
    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarEstrategias'


        },
        function(data) {
            if (data != "") {
                $('#selectbasicEstrategia,#selectbasicEstrategiare').html(data.html);
            }

        }, "json");
}

/*Consulta las entidades correspondientes al barrio y a la vereda de la intervencion
 * parametro: 
 */
function cargarEntidades(idIntervencion) {
    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarEntidades',
            idIntervencion: idIntervencion
        },
        function(data) {
            $('#selectbasicEntidad').html(data.html);
            $('.loader').hide();
        }, "json");
}

/*Dependiendo de la estrategia seleccionada se llena el tactico
 * parametro: 
 */
$("#selectbasicEstrategia,#selectbasicEstrategiare").change(function() {

    var idEstrategia = $('#selectbasicEstrategia').val();
    var idEstrategia1 = $('#selectbasicEstrategiare').val();

    if (idEstrategia != 0) {
        cargarTacticos(idEstrategia, "selectbasicEstrategia");
    } else if (idEstrategia1 != 0) {
        cargarTacticos(idEstrategia1, "selectbasicEstrategiare");
    }


});

/*Consulta las tacticos
 * parametro: 
 */
function cargarTacticos(idEstrategia, idSelEstrategia) {

    var tactico = "";
    if (idSelEstrategia == "selectbasicEstrategia") {
        tactico = "selectbasicTactico"
    } else {
        tactico = "selectbasicTacticore"
    }

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarTacticos',
            idEstrategia: idEstrategia


        },
        function(data) {
            if (data != "") {
                $('#' + tactico).html(data.html);
            }

        }, "json");

    cargarIndicadoresTacticos();
}

/*Consulta las etapas
 * parametro: 
 */
function cargarEtapas() {
    $.post("php/planeacion_Coordinadora.php", {
            accion: 'cargarEtapas'
        },
        function(data) {
            if (data != "") {
                $('#etapas').html(data.html);
                if (idComportamientos == 5) {
                    $('#btnGestion_3').hide();
                } else {
                    $('#btnGestion_2').hide();
                }
            }

            $('#btnGestion_1').hide(); //se oculta reconocimiento
        }, "json");
}

/*Dependiendo si seleccionan si cuenta con algun contacto
 * parametro: 
 */
$('#radiosContacto input:radio').click(function() {

    if ($(this).val() === '1') {
        $("#preguntaContacto").show();
    } else {
        $("#preguntaContacto").hide();
    }


});


$('#buttonGuardarPlaneacion').click(function() {

    $('.loader').show();

    if (!validarInformacion()) {
        $('.loader').hide();
        swal(
            '', //titulo
            'Debes ingresar todos los datos!',
            'error'
        );
    } else {


        //Verificar si se ingresa contacto
        if ($('input:radio[name=radiosAlgunContacto]:checked').val() == 1) {
            nombreContacto = $('#textinputNombreContacto').val();
            cargoContacto = $('#textinputCargoContacto').val();
            telefonoContacto = $('#textinputTelefonoContacto').val();
            correoContacto = $('#CorreoContacto').val();
        } else {
            nombreContacto = "";
            cargoContacto = "";
            telefonoContacto = "";
            correoContacto = "";
        }

        if ($('#selectbasicEntidad').val() == "0") {
            idEntidad = null;
        } else {
            idEntidad = $('#selectbasicEntidad').val();
        }

        $.post("php/planeacion_Coordinadora.php", {
                accion: 'guardarPlaneacion',
                nombreContacto: nombreContacto,
                cargoContacto: cargoContacto,
                telefonoContacto: telefonoContacto,
                correoContacto: correoContacto,
                fecha: $('#fecha_planeacion').val(),
                lugar: $('#textinputLugarEncuentro').val(),
                jornada: $('#selectbasicJornada').val(),
                comunidad: $('#comunidad input:radio[name=radiosComunidadEspecial]:checked').val(),
                poblacion: $('#selectbasicPoblacion').val(),
                observaciones: $('textarea[id="textareaObservaciones"]').val(),
                idIntervencion: idIntervencion,
                idEtapa: idEtapa,
                idEntidad: idEntidad,
                contacto: $('input:radio[name=radiosAlgunContacto]:checked').val()

            },
            function(data) {
                if (data.error == 1) {

                    swal(
                        '', //titulo
                        ' No se guardo la planeación, intententalo nuevamente',
                        'error'
                    );

                } else {

                    idPlaneacion = data.idPlaneacion;
                    //gestion de redes

                    if (idEtapa == 2) {
                        guardarGestionRedes();
                    } //gestion educativa
                    else if (idEtapa == 3) {
                        guardarGestionEducativa();
                    }

                }



            }, "json");
    }
});

function validarInformacion() {

    var valido = true;
    //select
    $("select[id^=selectbasic]").each(function(e) {
        if ($(this).val() == 0 && $(this).is(":visible")) {
            $("#buttonGuardarPlaneacion").removeAttr('disabled')
                //alert("sel"+$( this ).attr('id'));
            valido = false;
        }
    });
    //input 
    // $("input[id^=textinput]").each(function(e){  ("input[id^=textinput][id!=id_requerido]").each(fuanction(e){
    $("input[id^=textinput]").each(function(e) {
        if ($(this).val() == "" && $(this).is(":visible")) {
            $("#buttonGuardarPlaneacion").removeAttr('disabled');
            //alert("input"+$( this ).attr('id'));
            valido = false;
        }
    });

    if (idEtapa == "") {
        $("#buttonGuardarPlaneacion").removeAttr('disabled')
        valido = false;
    }

    if (idEtapa == 2) {
        if ($("#indicadoresre input:checkbox:checked").length == 0) {
            valido = false;
        }
    } //gestion educativa

    //Verificar si se ingresa contacto
    if ($('input:radio[name=radiosAlgunContacto]:checked').val() == 1) {
        nombreContacto = $('#textinputNombreContacto').val();
        cargoContacto = $('#textinputCargoContacto').val();
        telefonoContacto = $('#textinputTelefonoContacto').val();

        if (nombreContacto == "" || cargoContacto == "" || telefonoContacto == "") {
            valido = false;
        }
    }

    return valido;
}

/* $("#buttonCancelar").click(function () {
	window.location.href = "home_Gestora.html?id_zona=" + idZona;
}); */


function seleccionarEtapa(idEtapadb) {

    idEtapa = idEtapadb;

    consultarTemas();
    consultarIndicadoresGE();
    if (id_planeacion != null) {
        cargarGestionEducativa();
    }


    if (idEtapa == 1) {

    } //gestion de redes
    else if (idEtapa == 2) {
        $("#planeacion2").show();
        $("#planeacion3").hide();


    } //gestion educativa
    else if (idEtapa == 3) {
        $("#planeacion3").show();
        $("#planeacion2").hide();
    }

}

/*guarda gestion educativa
 * parametro: 
 */
function guardarGestionRedes() {

    //capturar indicadores
    var list = new Array();
    $("#indicadoresre input:checkbox:checked").each(function() {
        // alert("El checkbox con valor " + $(this).val() + " está seleccionado");
        list.push($(this).val());
    });

    //capturar los indicadores
    // var list = new Array();

    // $.each($('#selectbasicIndicadores :selected'), function() {

    // list.push($(this).val());

    // });

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'guardarGestionRedes',
            idPlaneacion: idPlaneacion,
            indicadores: list
        },
        function(data) {
            if (data.error != 1) {
                $('.loader').hide();
                swal(
                    '', //titulo
                    'Guardado Correctamente',
                    'success'
                ).then(function() {
                    window.location.href = "detalle_Intervencion_Gestora.html?idIntervencion=" + idIntervencion + "&id_zona=" + idZona;
                });

            } else {
                swal(
                    '', //titulo
                    'No se guardo la planeación, intentelo nuevamente',
                    'error'
                );
            }

        }, "json");
}

/*Guarda gestion educativa
 * parametro: 
 */
function guardarGestionEducativa() {


    //capturar indicadores
    var list = new Array();
    $("#indicadoresge input:checkbox:checked").each(function() {
        // alert("El checkbox con valor " + $(this).val() + " está seleccionado");
        list.push($(this).val());
    });

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'guardarGestionEducativa',
            idPlaneacion: idPlaneacion,
            idTema: $("#selectbasicTema").val(),
            indicadores: list,
            tactico: $("#selectbasicTactico").val()

        },
        function(data) {
            if (data.error != 1) {
                $('.loader').hide();
                swal(
                    '', //titulo
                    'Guardado Correctamente',
                    'success'
                ).then(function() {
                    window.location.href = "detalle_Intervencion_Gestora.html?idIntervencion=" + idIntervencion + "&id_zona=" + idZona;
                });

            } else {
                swal(
                    '', //titulo
                    'No se guardo la planeación, intentelo nuevamente',
                    'error'
                );
            }
        }, "json");
}

/*consulta los temas
 * parametro: 
 */
function consultarTemas() {

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'consultarTemas',
            idComportamientos: idComportamientos,
            idCompetencia: idCompetencia,
        },
        function(data) {
            if (data.error != 1) {
                $('#selectbasicTema,#selectbasicTemare').html(data.html);
            }

        }, "json");
}


/*consulta los indicadoresge
 * parametro: 
 */
function consultarIndicadoresGE() {
    $.post("php/planeacion_Coordinadora.php", {
            accion: 'consultarIndicadoresGE'
        },
        function(data) {
            if (data.error != 1) {
                $('#indicadoresge').html(data.html);
                $('#indicadoresre').html(data.indGr);
            }
        }, "json");
}

$("#buttonCancelar").click(function() {
    window.location.href = "detalle_Intervencion_Gestora.html?idIntervencion=" + idIntervencion + "&id_zona=" + idZona;

});



/*guardar una nueva entidad
 * parametro: 
 */
function guardarNuevaEntidad() {

    $('.loader').show();

    let idIntervencion = $.get("idIntervencion");
    let nombreEntidad = $('#textinputEntidadNueva').val();
    let direccion = $('#textinputDireccionEntidad').val();
    let telefono = $('#textinputTelefonoEntidad').val();
    let tipo_entidad = $('#selectbasicTipoEntidad').val();
    let nodo = $('#text_inputNodoEntidad').val();
    let url = "php/planeacion_Coordinadora.php";
    if (nombreEntidad != "" && direccion != "" && tipo_entidad != "0") {
        $.post(url, {
                accion: 'guardarNuevaEntidad',
                idIntervencion: idIntervencion,
                nombreEntidad: nombreEntidad,
                direccion: direccion,
                telefono: telefono,
                tipo_entidad: tipo_entidad,
                nodo: nodo
            },
            function(data) {
                if (data.error == 1) {
                    $('.loader').hide();
                    swal(
                        '', //titulo
                        ' No se guardo la entidad, intententalo nuevamente',
                        'error'
                    );
                } else {
                    $('.loader').hide();
                    swal(
                        '', //titulo
                        'Guardado Correctamente',
                        'success'
                    ).then(function() {
                        $.modal.close();
                        cargarEntidades(idIntervencion);
                    });
                }
            }, "json");
    } else {
        $('.loader').hide();
        swal(
            'Error',
            'Debes diligenciar todos los campos',
            'error'
        )
    }
}

function navegar_home() {
    idZona = $.get("id_zona")
    window.location.href = "home_Gestora.html?id_zona=" + idZona;
}

function actualizarPlaneacion() {
    $('.loader').show();

    if (!validarInformacion()) {
        $('.loader').hide();
        swal(
            '', //titulo
            'Debes ingresar todos los datos!',
            'error'
        );
    } else {
        var datos = {
            fecha: $("#fecha_planeacion").val(),
            lugar_encuentro: $("#textinputLugarEncuentro").val(),
            jornada: $("#selectbasicJornada").val(),
            comunidad: $('#comunidad input:radio[name=radiosComunidadEspecial]:checked').val(),
            poblacion: $("#selectbasicPoblacion").val(),
            observaciones: $("#textareaObservaciones").val()
        };

        var url = "php/planeacion_Coordinadora.php";
        $.post(url, {
                accion: "actualizarPlaneacion",
                datos: datos,
                id_planeacion: id_planeacion
            },
            function(data) {
                if (data.error != 1) {
                    //gestion de redes
                    if (idEtapa == 2) {
                        actualizarGestionRedes();
                    } //gestion educativa
                    else if (idEtapa == 3) {
                        actualizarGestionEducativa();
                    }
                } else {
                    /* $('.loader').hide(); */
                    swal('Error', 'Hubo un error al actualizar', 'error');
                }
            }, 'json');
    }
}

function cargarPlaneacionFormulario() {
    var url = "php/planeacion_Coordinadora.php";
    $.post(url, {
            accion: 'cargarPlaneacionFormulario',
            id_planeacion: id_planeacion
        },
        function(data) {
            if (data.error != 1) {
                $("#fecha_planeacion").val(data.html[0]['fecha']);
                $("#textinputLugarEncuentro").val(data.html[0]['lugarencuentro']);
                $("#selectbasicJornada").val(data.html[0]['id_jornada']);
                if (data.html[0]['comunidadespecial'] == 1) {} else {
                    $("#radiosComunidadEspecial-1").prop("checked", true);
                }
                $("#selectbasicPoblacion").val(data.html[0]['id_tipopoblacion']);
                $("#textareaObservaciones").val(data.html[0]['observaciones']);
            } else {

            }
        }, 'json');
}

function cargarGestionEducativa() {
    var url = "php/planeacion_Coordinadora.php";
    $.post(url, {
            accion: 'cargarGestionEducativa',
            id_planeacion: id_planeacion
        },
        function(data) {
            if (data.error != 1) {
                $("#selectbasicEntidad").val(data.html[0]['id_entidad']);
                $("#selectbasicEstrategia").val(data.html[0]['id_estrategia']);
                var idEstrategia = $('#selectbasicEstrategia').val();
                if (idEstrategia != 0) {
                    cargarTacticos(idEstrategia, "selectbasicEstrategia");
                }
            } else {
                swal("Error", "Error cargando datos", "error");
            }
        }, 'json')
}

function actualizarGestionEducativa() {
    //capturar indicadores
    var list = new Array();
    $("#indicadoresge input:checkbox:checked").each(function() {
        /* alert("El checkbox con valor " + $(this).val() + " está seleccionado"); */
        list.push($(this).val());
    });

    $.post("php/planeacion_Coordinadora.php", {
            accion: 'actualizarGestionEducativa',
            id_planeacion: id_planeacion,
            idTema: $("#selectbasicTema").val(),
            indicadores: list,
            tactico: $("#selectbasicTactico").val()

        },
        function(data) {
            if (data.error != 1) {
                $('.loader').hide();
                swal('Exito!', "Planeación actualizada", 'success').then(function() {
                    window.location.href = "detalle_Intervencion_Gestora.html?idIntervencion=" + idIntervencion + "&id_zona=" + idZona;
                });

            } else {
                swal(
                    '', //titulo
                    'No se actualizó la planeación, intentelo nuevamente',
                    'error'
                );
            }
        }, "json");
}

function cargarIndicadoresTacticos() {

    var url = "php/planeacion_Coordinadora.php";
    $.post(url, {
            accion: 'cargarGestionEducativa',
            id_planeacion: id_planeacion
        },
        function(data) {
            if (data.error != 1) {
                $("#selectbasicTactico").val(data.html[0]['id_tactico']);
                $("#selectbasicTema").val(data.html[0]['id_temas']);
                var indicador_length = data.html[0]['indicadores_id_indicador'].length;
                for (var i = 0; i < indicador_length; i++) {
                    if (data.html[0]['indicadores_id_indicador'][i] == document.getElementById("indicador" + (i + 1)).value) {
                        document.getElementById("indicador" + (i + 1)).checked = true;
                    }
                }
            } else {
                swal("Error", "Error cargando datos", "error");
            }
        }, 'json')
}