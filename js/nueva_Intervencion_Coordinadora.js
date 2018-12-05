$(document).ready(function () {

	$("#selectbasicVereda").attr('disabled');
	$("#selectbasicComuna").attr('disabled');
	$("#selectbasicBarrio").attr('disabled');

	$("#Rural").show();
	$("#Urbano").hide();
	traerNombre();
	nuevaentidad = "";


	$("#buttonCancelar").click(function () {
		window.location.href = "home_Coordinadora.html";
	});


	/*Dependiendo si seleccionan si cuenta con algun contacto
	 * parametro: 
	 */
	$('#UrbanoRural input:radio').click(function () {
		ubicacion = $(this).val();
		//rural
		if ($(this).val() == '1') {
			$("#Rural").show();
			$("#Urbano").hide();

			//se llama a la funcion que llena el combo de veredas
			cargarComunas_VeredaPorIdMunicipio($(this).val());
		} else {
			$("#Rural").hide();
			$("#Urbano").show();
			cargarComunas_VeredaPorIdMunicipio($(this).val());

		}


	});


	$('#btnNuevaVereda').click(function () {
		$("#ex2").modal({
			fadeDuration: 500,
			fadeDelay: 0.50,
			escapeClose: false,
			clickClose: false,
			showClose: false
		});
		$('.imagenCoordinadora').removeClass('imagenCoordinadora')

	})

	$('#btnNuevoBarrio').click(function () {
		$("#ex3").modal({
			fadeDuration: 500,
			fadeDelay: 0.50,
			escapeClose: false,
			clickClose: false,
			showClose: false
		});
		$('.imagenCoordinadora').removeClass('imagenCoordinadora')

	})

	$('#btnNuevaComuna').click(function () {
		$("#ex4").modal({
			fadeDuration: 500,
			fadeDelay: 0.50,
			escapeClose: false,
			clickClose: false,
			showClose: false
		});
		$('.imagenCoordinadora').removeClass('imagenCoordinadora')

	})

	$('.regresarImgCoordinadora').click(function () {
		$('.regresoImgCoordinadora').addClass('imagenCoordinadora')
	})



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


	idZona = $.get("idZona");
	initFileInput();
	cargarZonasPorId(idZona);
	cargarPorMunicipiosPorIdZona(idZona);
	cargarTipoIntervencion();
	cargarComportamientos();




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
				window.location.href = "welcome_Coordinadora.html";
			}
		}, "json");

}

function cargarZonasPorId(idZona) {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarZonasPorId',
			idZona: idZona
		},
		function (data) {
			if (data.error != 1) {

				$('#nombreZona').html(data.html);
			}
			// else{
			// mostrarPopUpError(data.error);
			// }


		}, "json");
}

function cargarPorMunicipiosPorIdZona(idZona) {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarMunicipiosPorIdZona',
			idZona: idZona
		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicMunicipio').html(data.html);
			}
			// else{
			// mostrarPopUpError(data.error);
			// }


		}, "json");
}

$("#selectbasicMunicipio").change(function () {

	$("#selectbasicVereda").removeAttr('disabled');
	$("#selectbasicComuna").removeAttr('disabled');

	$('#UrbanoRural input:radio').trigger('click');

});

function cargarComunas_VeredaPorIdMunicipio(ubicacion) {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarComunasPorIdMunicipio',
			idMunicipio: $('#selectbasicMunicipio').val(),
			ubicacion: ubicacion
		},
		function (data) {
			if (data.error != 1) {

				if (ubicacion == 2) {
					$('#selectbasicComuna').html(data.html);
				} else {
					$('#selectbasicVereda').html(data.html);
				}
			}
		}, "json");

}

$("#selectbasicVereda").change(function () {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarEntidadPorVereda',
			idVereda: $('#selectbasicVereda').val()
		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicEntidad').html(data.html);
			}



		}, "json");

});

$("#selectbasicComuna").change(function () {

	$("#selectbasicBarrio").removeAttr('disabled');


	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarBarriosPorComuna',
			idComuna: $('#selectbasicComuna').val()
		},
		function (data) {
			if (data.error != 1) {

				if (data.error != 1) {

					$('#selectbasicBarrio').html(data.html);
				}
			}
		}, "json");
});

$("#selectbasicBarrio").change(function () {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarEntidadesPorBarrio',
			idBarrio: $('#selectbasicBarrio').val()
		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicEntidad').html(data.html);
			}



		}, "json");

});


function cargarTipoIntervencion() {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarTipoIntervencion'

		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicTipoInvervencion').html(data.html);

			}
			// else{
			// mostrarPopUpError(data.error);
			// }


		}, "json");
}



function cargarComportamientos() {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarComportamientos'

		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicComportamiento').html(data.html);

			}
			// else{
			// mostrarPopUpError(data.error);
			// }

			$('.loader').hide();
		}, "json");
}


$("#selectbasicComportamiento").change(function () {

	$.post("php/nueva_Intervencion_Coordinadora.php", {
			accion: 'cargarIndicadoresChec',
			idIndicador: $('#selectbasicComportamiento').val()
		},
		function (data) {
			if (data.error != 1) {

				$('#selectbasicIndicadores').html(data.html);

			}
			// else{
			// mostrarPopUpError(data.error);
			// }


		}, "json");

});

function guardarIntervencion() {

	$('.loader').show();

	if (!validarInformacion()) {
		$('.loader').hide();
		swal(
			'', //titulo
			'Debes ingresar todos los datos!',
			'error'
		);
	} else {


		//capturar los indicadores
		var list = new Array();

		$.each($('#selectbasicIndicadores :selected'), function () {

			list.push($(this).val());

		});

		//fin capturar los indicadores

		let barrio = $('#selectbasicBarrio').val();
		let vereda = $('#selectbasicVereda').val();
		let ubicacion = $('#UrbanoRural input:radio:checked').val();


		$.post("php/nueva_Intervencion_Coordinadora.php", {
				accion: 'guardarIntervencion',
				idZona: idZona,
				barrio: barrio,
				vereda: vereda,
				ubicacion: ubicacion,
				idTipoIntervencion: $('#selectbasicTipoInvervencion').val(),
				indicadores: list
			},
			function (data) {
				$('.loader').hide();
				if (data.error == 1) {

					swal(
						'', //titulo
						' No se guardo la intervención, intententalo nuevamente',
						'error'
					);

				} else {

					var filesIntervencion = $('#upload_files_input').fileinput('getFileStack');
					if (filesIntervencion == 0) {
						swal(
							'', //titulo
							'Guardado Correctamente',
							'success'
						).then(function () {
							window.location.href = "detalle_Intervencion_Coordinadora.html?idIntervencion=" + data.idIntervencion;
						});
					} else {
						$('#upload_files_input').on('filebatchuploadcomplete', function (event, files, extra) {
							swal(
								'', //titulo
								'Guardado Correctamente',
								'success'
							).then(function () {
								window.location.href = "detalle_Intervencion_Coordinadora.html?idIntervencion=" + data.idIntervencion;
							});
						});
						$('#upload_files_input').fileinput('upload');
					}

				}
			}, "json");
	}
}

function validarInformacion() {
	var valido = true;
	//select
	$("select[id^=selectbasic]").each(function (e) {
		if ($(this).val() == 0 && $(this).is(":visible")) { //alert("sel"+$( this ).attr('id'));
			valido = false;
		}
	});


	return valido;
}



//Invocacion del archivo File Input para nueva intervencion coordinadora
function initFileInput() {
	$('#upload_files_input').fileinput({
		language: 'es',
		'theme': 'fa',
		uploadUrl: 'php/uploadImgNuevaInterv.php',
		showUpload: false,
		showcaption: false,
		showPreview: false,
		allowedFileExtensions: ['jpg', 'png', 'jpeg', 'bmp'],
		maxFileCount: 1
	});
}

function guardarNuevaComuna() {

	$('.loader').show();

	let nombreComuna = $('#textinputComuna').val();
	let municipio = $('#selectbasicMunicipio').val();
	let url = "php/nueva_Intervencion_Coordinadora.php";
	if (nombreComuna !== "") {
		$.post(url, {
				accion: 'guardarNuevaComuna',
				municipio: municipio,
				comuna: nombreComuna
			},
			function (data) {
				if (data.error == 1) {
					$('.loader').hide();
					swal(
						'', //titulo
						' No se guardo la comuna, intententalo nuevamente',
						'error'
					);
				} else {
					$('.loader').hide();
					swal(
						'', //titulo
						'Guardado Correctamente',
						'success'
					).then(function () {
						$.modal.close();
						let ubicacion = $('#UrbanoRural input:radio:checked').val();
						cargarComunas_VeredaPorIdMunicipio(ubicacion);
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


function guardarNuevoBarrio() {

	$('.loader').show();

	let nombreBarrio = $('#textinputBarrio').val();
	let latitud = $('#textinputBarrioLan').val();
	let longitud = $('#textinputBarrioLon').val();
	let comuna = $('#selectbasicComuna').val();
	let url = "php/nueva_Intervencion_Coordinadora.php";
	if (nombreBarrio != "") {
		$.post(url, {
				accion: 'guardarNuevoBarrio',
				barrio: nombreBarrio,
				comuna: comuna,
				latitud: latitud,
				longitud: longitud

			},
			function (data) {
				if (data.error == 1) {
					$('.loader').hide();
					swal(
						'', //titulo
						' No se guardo el barrio, intententalo nuevamente',
						'error'
					);
				} else {
					$('.loader').hide();
					swal(
						'', //titulo
						'Guardado Correctamente',
						'success'
					).then(function () {
						$.modal.close();
						$("#selectbasicComuna").trigger("change");
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

function guardarNuevaVereda() {

	$('.loader').show();


	let nombreVereda = $('#textinputVereda').val();
	let latitud = $('#textinputVeredaLan').val();
	let longitud = $('#textinputVeredaLon').val();
	let municipio = $('#selectbasicMunicipio').val();
	let url = "php/nueva_Intervencion_Coordinadora.php";
	if (nombreVereda != "") {
		$.post(url, {
				accion: 'guardarNuevaVereda',
				municipio: municipio,
				vereda: nombreVereda,
				latitud: latitud,
				longitud: longitud
			},
			function (data) {
				if (data.error == 1) {
					$('.loader').hide();
					swal(
						'', //titulo
						' No se guardo la vereda, intententalo nuevamente',
						'error'
					);
				} else {
					$('.loader').hide();
					swal(
						'', //titulo
						'Guardado Correctamente',
						'success'
					).then(function () {
						$.modal.close();
						let ubicacion = $('#UrbanoRural input:radio:checked').val();
						cargarComunas_VeredaPorIdMunicipio(ubicacion);
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