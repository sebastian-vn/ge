//Invocacion del archivo File Input Ejecucion Coordinadora
$(function() {
  traerNombre();
	cargarTipoCedula();
	getTipopoblacion();
	getCaracteristicasPoblacion();

  /*Extrae los parametros que llegan en la url
	 * parametro: 
	 */
  $.get = function(key) {
    key = key.replace(/[\[]/, "\\[");
    key = key.replace(/[\]]/, "\\]");
    var pattern = "[\\?&]" + key + "=([^&#]*)";
    var regex = new RegExp(pattern);
    var url = unescape(window.location.href);
    var results = regex.exec(url);
    if (results === null) {
      return null;
    } else {
      return results[1];
    }
  };

  idZona = $.get("id_zona");

  idPlaneacion = $.get("idPlaneacion");
  idIntervencion = $.get("idIntervencion");
  isEjecutada = $.get("isEjecutada");
  nCumplimiento = "";
	cargarDatosPlaneacion();

	lista_asistentes = [];
	
  var table_asistentes = $("#tabla-asistente").dataTable({
		data: lista_asistentes,
    columnDefs: [
      {
        targets: -1,
        render: function(data, type, row) {
          return '<input type="number" class="input_cant" id="inputcantidad' + data.id_tipopoblacion + '" value=0 min=0>';
				}
      }
    ],
    columns: [
      {
        data: "tipopoblacion",
        title: "Tipo de Población"
      },
      {
        data: null,
        title: "Cantidad"
      }
		],
		searching: false,
    paging: false,
    ordering: false,
		select: false,
		info: false
	});
	
  var table_caracteristicas = $("#tabla-caracteristica").dataTable({
		data: lista_asistentes,
    columnDefs: [
      {
        targets: -1,
        render: function(data, type, row) {
          return '<input type="number" class="input_caract" id="caracteristica' + data.id_caracteristica + '" value=0 min=0>';
				}
      }
    ],
    columns: [
      {
        data: "caracteristica",
        title: "Características Población"
      },
      {
        data: null,
        title: "Cantidad"
      }
		],
		searching: false,
    paging: false,
    ordering: false,
		select: false,
		info: false
	});
	
	

  var table = $("#ejecucion_coordinadora_asistencia").DataTable({
    data: arrayAsistentes,
    columns: [
      {
        data: "nombres",
        title: "Nombre"
      },
      {
        data: "apellidos",
        title: "Apellidos"
      },
      {
        data: "movil",
        title: "Móvil"
      }
    ],
    language: {
      sProcessing: "Procesando...",
      sLengthMenu: "Mostrar _MENU_ registros",
      sZeroRecords: "No se encontraron resultados",
      sEmptyTable: "Ningún dato disponible en esta tabla",
      sInfo:
        "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
      sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
      sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
      sInfoPostFix: "",
      sSearch: "Buscar:",
      sUrl: "",
      sInfoThousands: ",",
      sLoadingRecords: "Cargando...",
      oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior"
      },
      oAria: {
        sSortAscending:
          ": Activar para ordenar la columna de manera ascendente",
        sSortDescending:
          ": Activar para ordenar la columna de manera descendente"
      }
    },

    searching: true,
    paging: true,
    ordering: true,
    select: true,
    scrollY: 200
  });

  var dateToday = new Date();
  var dates = $("#textFecha").datepicker({
    defaultDate: "+1w",
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 1
  });

  var dateToday = new Date();

  $("#file_fotograficas").fileinput({
    language: "es",
    theme: "fa",
    uploadUrl: "php/uploadEvidencias.php",
    showUpload: false,
    allowedFileExtensions: [
      "jpg",
      "png",
      "jpeg",
      "bmp",
      "mp4",
      "avi",
      "mpeg4",
      "mkv",
      "mov",
      "pdf",
      "docx",
      "flv",
      "mpeg",
      "xlsx"
    ]
  });

  $("#file_asistencias").fileinput({
    language: "es",
    theme: "fa",
    uploadUrl: "php/uploadAsistencias.php",
    showUpload: false,
    allowedFileExtensions: [
      "jpg",
      "png",
      "jpeg",
      "bmp",
      "pdf",
      "xlsx",
      "xls",
      "doc",
      "docx"
    ]
  });

  $("#file_fotograficas, #file_asistencias").on("fileloaded", function(
    event,
    file,
    previewId,
    index,
    reader
  ) {
    $("div.file-footer-buttons").hide();
  });

  bindEvents();
});

function bindEvents() {
  /*Dependiendo si seleccionan si cuenta con algun contacto
	 * parametro: 
	 */
  $("#radiosAlgunContacto input:radio").click(function() {
    //si contacto
    if ($(this).val() == "siContacto") {
      contacto = $(this).val();
    } else {
      contacto = $(this).val();
    }
  });

  /*el detalle cumplimiento
	 * parametro: 
	 */
  $("#detalleNivelCumplimiento input:radio").click(function() {});

  $("body").keypress(function(event) {
    if (event.keyCode === 10 || event.keyCode === 13) event.preventDefault();
  });

  $("#btnnueva_asistencia_coordinadora").click(function() {
    $("#ex5").modal({
      fadeDuration: 500,
      fadeDelay: 0.5,
      escapeClose: false,
      clickClose: false,
      showClose: false
    });
  });

  $("#buttonEnviar").click(function() {
    guardarAsistencia();
  });
}

/*Consulta el nombre de la persona que inicio sesión
 * parametro: 
 */
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
      }
    },
    "json"
  );
}

function cargarDatosPlaneacion() {
  //TODO PENDIENTE LLAMADO A BACKEND DE YA EJECUTADAS
  if (isEjecutada == 1) {
    $.post(
      "php/ejecucion_Coordinadora.php",
      {
        accion: "cargarDatosPlaneacion",
        idPlaneacion: idPlaneacion,
        isEjecutada: true
      },
      function(data) {
        if (data.error == 0) {
          $("#fechaInd").html(data.html.fecha);
          $("#lugarInd").html(data.html.lugar);
          $("#municipioInd").html(data.html.municipio);
          $("#comportamientoInd").html(data.html.comportamiento);
          $("#competenciaInd").html(data.html.competencia);
          $("#estrategiaInd").html(data.html.estrategia);
          $("#tacticoInd").html(data.html.tactico);
          $("#indicadoresInd").html(data.html.indicador);

          //datos de la ejecucion registrada
          let valor = data.html.datosEjec.horafinalizacion.split(":");
          $("#textFecha")
            .val(data.html.datosEjec.fecha)
            .attr("disabled", "disabled");
          $("#selectbasicHoraEje")
            .val(valor[0])
            .attr("disabled", "disabled");
          $("#selectbasicMinEje")
            .val(valor[1])
            .attr("disabled", "disabled");
          $("#textinputAsisNum")
            .val(data.html.datosEjec.numeroasistentes)
            .attr("disabled", "disabled");
          $(
            "input:radio[value=" + data.html.datosEjec.nivel_cumplimiento + "]"
          )[0].checked = true;
          $("input:radio").attr("disabled", "disabled");
          $("#textareaObservaciones")
            .val(data.html.datosEjec.observaciones)
            .attr("disabled", "disabled");
          data.html.datosEjec.detalle_nivel.forEach((element, index) => {
            $(
              "input:radio[name=detalle_" +
                String(index + 1) +
                "][value=" +
                element +
                "]"
            )[0].checked = true;
          });

          var table = $("#ejecucion_coordinadora_asistencia");
          table.dataTable().fnClearTable();
          table.dataTable().fnAddData(data.html.datosEjec.asistentes);

          $(".esconder, #button2id").hide();
          $("#button1id")
            .html("Atras")
            .removeClass("btn-danger")
            .addClass("btn-warning");
        } else {
          swal(
            "", //titulo
            "Debes iniciar sesion!",
            "error"
          );
        }
        $(".loader").hide();
      },
      "json"
    );
  } else {
    $.post(
      "php/ejecucion_Coordinadora.php",
      {
        accion: "cargarDatosPlaneacion",
        idPlaneacion: idPlaneacion,
        isEjecutada: false
      },
      function(data) {
        if (data.error == 0) {
          $("#fechaInd").html(data.html.fecha);
          $("#lugarInd").html(data.html.lugar);
          $("#municipioInd").html(data.html.municipio);
          $("#comportamientoInd").html(data.html.comportamiento);
          $("#competenciaInd").html(data.html.competencia);
          $("#estrategiaInd").html(data.html.estrategia);
          $("#tacticoInd").html(data.html.tactico);
          $("#indicadoresInd").html(data.html.indicador);
        } else {
          swal(
            "", //titulo
            "Debes iniciar sesion!",
            "error"
          );
        }
        $(".loader").hide();
      },
      "json"
    );
  }
}

function guardarEjecucion() {
  $(".loader").show();

  if (!validarInformacion()[0]) {
		if(validarInformacion()[1] != ""){
			$(".loader").hide();
    swal(
      "Error", //titulo
      validarInformacion()[1],
      "error"
    );
		}else{
			$(".loader").hide();
    swal(
      "", //titulo
      "Debes ingresar todos los datos!",
      "error"
    );
		}
    
  } else {
		//detalleNivelCumplimiento
		var list_tipopoblacion = [];

		$.each($('.input_cant'), function(){
			list_tipopoblacion.push($(this).val());
		});

		var list_caracteristica = [];

		$.each($('.input_caract'), function(){
			list_caracteristica.push($(this).val());
		});	

    var list = [];

    $.each($("#detalleNivelCumplimiento :checked"), function() {
      list.push($(this).val());
    });

    //Verificar si se ingresa contacto
    if ($("input:radio[name=radiosAlgunContacto]:checked").val() == 1) {
      nombreContacto = $("#textinputNombreContacto").val();
      cargoContacto = $("#textinputCargoContacto").val();
      telefonoContacto = $("#textinputTelefonoContacto").val();
      correoContacto = $("#inputCorreoContacto").val();
    } else {
      nombreContacto = "";
      cargoContacto = "";
      telefonoContacto = "";
      correoContacto = "";
    }

    //Verificar si el registro de ejecución no tiene asistentes.
    if (arrayAsistentes.length == 0) {
      arrayAsistentes = ["1"];
    }

    $.post(
      "php/ejecucion_Coordinadora.php",
      {
        accion: "guardarEjecucion",
        fecha: $("#textFecha").val(),
        hora:
          $("#selectbasicHoraEje").val() + ":" + $("#selectbasicMinEje").val(),
				asistentes: parseInt($("#total").text()),
				tipopoblacion_asis: list_tipopoblacion,
				caracteristicas_asis: list_caracteristica,
        detalleCumplimiento: list,
        nCumplimiento: $("input:radio[name=nCumplimiento]:checked").val(),
        observaciones: $("#textareaObservaciones").val(),
        idPlaneacion: idPlaneacion,
        idIntervencion: idIntervencion,
        arrayAsistentes: arrayAsistentes,
        nombreContacto: nombreContacto,
        cargoContacto: cargoContacto,
        telefonoContacto: telefonoContacto,
        correoContacto: correoContacto,
        contacto: $("input:radio[name=radiosAlgunContacto]:checked").val()
      },
      function(data) {
        if (data.error == 1) {
          $(".loader").hide();
          swal(
            "", //titulo
            " No se guardo la ejecución, intententalo nuevamente",
            "error"
          );
        } else {
          // Valida la existencia de archivos para subir
          var filesEvidencias = $("#file_fotograficas").fileinput(
            "getFileStack"
          );
          var filesAsistencia = $("#file_asistencias").fileinput(
            "getFileStack"
          );
          if (filesEvidencias.length == 0 && filesAsistencia.length == 0) {
            $(".loader").hide();
            swal(
              "", //titulo
              "Guardado Correctamente",
              "success"
            ).then(function() {
              window.location.href =
                "detalle_Intervencion_Gestora.html?idIntervencion=" +
                idIntervencion +
                "&id_zona=" +
                idZona;
            });
          } else {
            if (filesAsistencia.length == 0) {
              $("#file_fotograficas").on("filebatchuploadcomplete", function(
                event,
                files,
                extra
              ) {
                $(".loader").hide();
                swal(
                  "", //titulo
                  "Guardado Correctamente",
                  "success"
                ).then(function() {
                  window.location.href =
                    "detalle_Intervencion_Gestora.html?idIntervencion=" +
                    idIntervencion +
                    "&id_zona=" +
                    idZona;
                });
              });
              $("#file_fotograficas").fileinput("upload");
            } else {
              if (filesEvidencias.length == 0) {
                $("#file_asistencias").on("filebatchuploadcomplete", function(
                  event,
                  files,
                  extra
                ) {
                  $(".loader").hide();
                  swal(
                    "", //titulo
                    "Guardado Correctamente",
                    "success"
                  ).then(function() {
                    window.location.href =
                      "detalle_Intervencion_Gestora.html?idIntervencion=" +
                      idIntervencion +
                      "&id_zona=" +
                      idZona;
                  });
                });
                $("#file_asistencias").fileinput("upload");
              } else {
                $("#file_fotograficas").on("filebatchuploadcomplete", function(
                  event,
                  files,
                  extra
                ) {
                  $("#file_asistencias").fileinput("upload");
                });
                $("#file_asistencias").on("filebatchuploadcomplete", function(
                  event,
                  files,
                  extra
                ) {
                  $(".loader").hide();
                  swal(
                    "", //titulo
                    "Guardado Correctamente",
                    "success"
                  ).then(function() {
                    window.location.href =
                      "detalle_Intervencion_Gestora.html?idIntervencion=" +
                      idIntervencion +
                      "&id_zona=" +
                      idZona;
                  });
                });
                $("#file_asistencias").fileinput("upload");
              }
            }
          }
        }
      },
      "json"
    );
  }
}

function validarInformacion() {
	var valido = true;
	var mensaje = "";
  //Verificar si se ingresa contacto
  if ($("input:radio[name=radiosAlgunContacto]:checked").val() == 1) {
    nombreContacto = $("#textinputNombreContacto").val();
    cargoContacto = $("#textinputCargoContacto").val();
    telefonoContacto = $("#textinputTelefonoContacto").val();

    if (nombreContacto == "" || cargoContacto == "" || telefonoContacto == "") {
      valido = false;
    }
  } else {
    valido = true;
  }
  //radio
  cont = 0;
  $("#detalleNivelCumplimiento input:radio[name^=detalle_]:checked").each(
    function(e) {
      cont++;
    }
  );
  if (cont == 4) {
  } else {
    valido = false;
	}
	
	if(parseInt($("#total-genero").text()) != parseInt($("#total").text())){
		valido = false;
		mensaje = "El total de tipo de población no coincide con el total de las características de la población.";
	}

  $("input[id^=text]").each(function(e) {
    if ($(this).val() == "" && $(this).is(":visible")) {
      //alert("input"+$( this ).attr('id'));
      valido = false;
    }
  });

  var filesEvidencias = $("#file_fotograficas").fileinput("getFileStack");
  var filesAsistencia = $("#file_asistencias").fileinput("getFileStack");
  /* if(filesAsistencia.length == 0/*  || filesEvidencias.length == 0){
		valido = false;
	} */

  return [valido, mensaje];
}

function cargarTipoCedula() {
  var url = "php/ejecucion_Coordinadora.php";
  $.post(
    url,
    {
      accion: "cargarTipoCedula"
    },
    function(data) {
      var arrayData = JSON.parse(data);
      arrayData.response.forEach(element => {
        $("#selectbasicTipoDocumento").append(
          '<option value="' +
            element.id_tipo_documento +
            '">' +
            element.tipo_documento +
            "</option>"
        );
      });
    }
  );
}

var arrayAsistentes = [];

function guardarAsistencia() {
  $(".loader").show();

  if (
    $("#selectbasicTipoDocumento").val() == "" ||
    $("#inputDocumento").val() == "" ||
    $("#textinputNombres").val() == "" ||
    $("#textinputApellidos").val() == "" ||
    $("#FechainputNacimientoAsis").val() == ""
  ) {
    $(".loader").hide();
    swal(
      "Error", //titulo
      "Debes diligenciar todos los campos",
      "error"
    );
  } else {
    var datos_formulario = {
      tipo_documento: $("#selectbasicTipoDocumento").val(),
      numero_documento: $("#inputDocumento").val(),
      nombres: $("#textinputNombres").val(),
      apellidos: $("#textinputApellidos").val(),
      genero: $('input[name="radiosSexo"]:checked').val(),
      cuenta_CHEC: $("#textinputCuentaCHEC").val(),
      telefono: $("#textinputTelefonoAsis").val(),
      movil: $("#textinputMovilAsis").val(),
      direccion: $("#textinputDireccionAsis").val(),
      correo_electronico: $("#textinputCorreoAsis").val(),
      rol: $("#textinputRolAsis").val(),
      fecha_asistencia: $("#FechainputNacimientoAsis").val(),
      manejo_datos: $('input[name="radiosManejoDatos"]:checked').val(),
      sesiones: $('input[name="radiosSesionesForma"]:checked').val()
    };

    arrayAsistentes.push(datos_formulario);

    var table = $("#ejecucion_coordinadora_asistencia");
    table.dataTable().fnClearTable();
    table.dataTable().fnAddData(arrayAsistentes);
    $(".loader").hide();
    swal({
      position: "top-right",
      type: "success",
      title: "Información guardada",
      showConfirmButton: false,
      timer: 1500
    });

    $.modal.close();
    $("#selectbasicTipoDocumento").val("1");
    $("#inputDocumento").val("");
    $("#textinputNombres").val("");
    $("#textinputApellidos").val("");
    $("#textinputCuentaCHEC").val("");
    $("#textinputTelefonoAsis").val("");
    $("#textinputMovilAsis").val("");
    $("#textinputDireccionAsis").val("");
    $("#textinputCorreoAsis").val("");
    $("#textinputRolAsis").val("");
    $("#FechainputNacimientoAsis").val("");
  }
}

/*Dependiendo si seleccionan si cuenta con algun contacto
 * parametro: 
 */
$("#radiosContacto input:radio").click(function() {
  if ($(this).val() === "1") {
    $("#preguntaContacto").show();
  } else {
    $("#preguntaContacto").hide();
  }
});

function navegar_home() {
  idZona = $.get("id_zona");
  window.location.href = "home_Gestora.html?id_zona=" + idZona;
}

function confirmGuardar() {
  swal({
    title: "¿Estás seguro?",
    text: "Confirma para guardar toda la información",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(willDelete => {
    if (willDelete) {
      guardarEjecucion();
    } else {
    }
  });
}

function getTipopoblacion() {
  var url = "php/ejecucion_Coordinadora.php";

  $.post(url, { accion: "getTipopoblacion" }, function(data) {
		asistentes = data.html;
		if(data.html){
			var table_asistentes = $('#tabla-asistente');
			table_asistentes.dataTable().fnAddData(asistentes);
		}
		$(".input_cant").change(function() {
			getTotalAsistentes();
		});
	}, "json");
}

function getCaracteristicasPoblacion() {
  var url = "php/ejecucion_Coordinadora.php";

  $.post(url, { accion: "getCaracteristicasPoblacion" }, function(data) {
		caract = data.html;
		if(data.html){
			var table_caracteristicas = $('#tabla-caracteristica');
			table_caracteristicas.dataTable().fnAddData(caract);
		}
		$(".input_caract").change(function() {
			getCaracteristicas();
		});		
	}, "json");
}

// If value of td tabla-asistente changes

function getTotalAsistentes() {
  var asist = 0;
  for (var i = 1; i < 4; i++) {
    if ($("#inputcantidad" + i).val() == "") {
      $("#inputcantidad" + i).val(0);
    }
  }
  asist +=
    parseInt($("#inputcantidad1").val()) +
    parseInt($("#inputcantidad2").val()) +
    parseInt($("#inputcantidad3").val());

  $("#total").text(asist);
}

// If value of table genero changes

function getCaracteristicas() {
  var asist = 0;
  for (var i = 1; i < 3; i++) {
    if ($("#caracteristica" + i).val() == "") {
      $("#caracteristica" + i).val(0);
    }
  }
  asist +=
		parseInt($("#caracteristica1").val()) + parseInt($("#caracteristica2").val()) + 
		parseInt($("#caracteristica3").val()) + parseInt($("#caracteristica4").val()) + parseInt($("#caracteristica5").val());

  $("#total-genero").text(asist);
}

$('#each_input').click(function(){
	$('.input_cant').each(function(){
		alert(parseInt($(this).val()));
	});
});
