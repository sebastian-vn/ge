 $(function () {
	traerNombre();


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


	idIntervencion = $.get("idIntervencion");
	comportamientos = "";
	competencia = "";
	idComportamientos = "";
	idCompetencia = "";
	idEntidad = "";
	cargarDetalleIntervencion(idIntervencion);
	cargarPlaneacionesPorIntrevencion(idIntervencion);
	initFileInput(idIntervencion);

});

//Invocacion del archivo File Input para nueva intervencion coordinadora
function initFileInput(idIntervencion) {
	$('.upload_files_input').fileinput({
		language: 'es',
		'theme': 'fa',
		uploadUrl: 'php/uploadImgDetalleInterv.php',
		uploadExtraData: { idIntervencion: idIntervencion },
		allowedFileExtensions: ['jpg', 'png']
	});

	$('.upload_files_input').on('filebatchuploadcomplete', function (event, files, extra) {
		location.reload();
	});
}


/*Consulta el nombre de la persona que inicio sesión
 * parametro: 
 */
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

/*Consulta el detalle de la intervención  
 * parametro: idIntervencion
 */
function cargarDetalleIntervencion(idIntervencion) {

	$.post("php/detalle_Intervencion_Coordinadora.php", {
		accion: 'cargarDetalleIntervencion',
		idIntervencion: idIntervencion

	},
		function (data) {
			if (data.error == 0) {
				comportamientos = data.html.comportamientos;
				competencia = data.html.competencia;
				idCompetencia = data.html.id_competencia;
				idComportamientos = data.html.id_comportamientos;


				$('#lblMunicipio').html("<b>Municipio</b>: " + data.html.municipio);
				$('#lblCoportamiento').html("<b>Comportamiento</b>: " + data.html.comportamientos);
				$('#lblCompetencia').html("<b>Competencia</b>: " + data.html.competencia);
				$('#lblTipoIntervencion').html("<b>Tipo Intervención</b>: " + data.html.tipo_intervencion);
				$("#indicadoresChec").html("<b>Indicadores</b>: ");
				$("#indicadoresChec").append(data.html.indicador);
				$('#fecha_estado_base').append(data.html.fecha);
				$('#img_estado_base').attr('src', data.html.img_url);


				if (data.html.evolucion[0].img_url) {
					data.html.evolucion.forEach(function (element, index) {
						if (index == 0) {
							$('.carousel-inner').append(`
								<div class="carousel-item active">
									<img class="d-block w-100" src="${element.img_url}">
									<div class="carousel-caption d-none d-md-block">
										<h5 style="color: #1e7e34">${element.fecha}</h5>
									</div>
								</div>
							`)
						} else {
							$('.carousel-inner').append(`
								<div class="carousel-item">
									<img class="d-block w-100" src="${element.img_url}" >
									<div class="carousel-caption d-none d-md-block">
										<h5 style="color: #1e7e34">${element.fecha}</h5>
									</div>
								</div>
							`)
						}
					})
				} else {
					$('.carousel-inner').append(`
						<div class="carousel-item active">
							<img class="d-block w-100" src="img/default-image.jpg" >
						</div>
					`);
				}

				$('#carouselExampleIndicators').carousel()

			} else {
				swal(
					'', //titulo
					'No se cargo la información',
					'error'
				);
			}



		}, "json");
}

/*Consulta las planeaciones por intervencion
* parametro: idIntervencion
*/
function cargarPlaneacionesPorIntrevencion(idIntervencion) {

	$.post("php/detalle_Intervencion_Coordinadora.php", {
		accion: 'cargarPlaneacionesPorIntrevencion',
		idIntervencion: idIntervencion

	},
		function (data) {
			if (data.error != 1) {
				$.post("php/detalle_Intervencion_Coordinadora.php", {
					accion: 'checkPlaneacionesEjecutadas'
				},
					function (ejecutadas) {
						cargarInformacionEnTabla(data);
						setTimeout(() => {
							identificarEjecutadas(data, JSON.parse(ejecutadas));
							$('.loader').hide();
						}, 1000);
						

					})

			}
		}, "json");
}

/*Carga la respuesta de la base de datos en el datatable
* parametro: data
*/
function cargarInformacionEnTabla(data) { //alert(data);
	table = $('#coordinadora_tabla').DataTable({
		"data": data,
		columns: [
			{ title: "Id", className: "idColEjec" },
			{ title: "Etapa" },
			{ title: "Estrategia" },
			{ title: "Táctico" },
			{ title: "Tema" },
			{ title: "Fecha" },
			{ title: "Registrar Ejecución", data: null, className: "dt-center", defaultContent: '<a href="#" class="ejecucion ejec_btn btn btn-sm btn-success" alt="Ejecución"><span class="ejec fa fa-book"></span></a>' },
			{ title: "Opciones", data: null, className: "dt-center", defaultContent: dropdown_button},
			{ title: "Registrar Asistencia", data: null, className: "dt-center", defaultContent: '<a href="#" class="disabled asistencia ejec_btn btn btn-sm btn-success" alt="Asistencia"><span class="ejec fa fa-calendar-check-o"></span></a>' },
			{ title: "Registrar Evaluación", data: null, className: "dt-center", defaultContent: '<a href="menu_Evaluacion_Coordinadora.html" id="evaluacion" class="evaluacion disabled eval_btn btn btn-sm btn-success" alt="Ejecución"><span class="eval fa fa-book"></span></a>' },
		],
		/* Disable paging */
		"paging": false,
		"info": false,
		"columnDefs": [
			{ "className": "dt-left", "targets": "_all" }, //alinear texto a la izquierda
			{ "className": "idColEjec", "targets": 0 },
			{ "width": "13%", "targets": 1 }//se le da ancho al td de estudiante
			//{ "width": "8%", "targets": 8 }, //se le da ancho al td de total horas
			//{ "width": "8%", "targets": 9 } //se le da ancho al td de observacion
		],
		"scrollY": "500px",
		"scrollX": true,
		"scrollCollapse": true,
		"language": {
			"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
			"sSearch": "Filtrar:",
			"zeroRecords": "Ningún resultado encontrado",
			"infoEmpty": "No hay registros disponibles",
			"Search:": "Filtrar"
		}
	});
}

function identificarEjecutadas(data, ejecutadas) {
	var isEjecutada;
	data.forEach(function (element, index) {
		isEjecutada = false;
		ejecutadas.forEach(ej => {
			if (element[0] == ej) {
				isEjecutada = true;
			}
		})
		if (isEjecutada) {
			$($('#coordinadora_tabla tbody').children()[index]).addClass('rowEjecutada');
			$($('#coordinadora_tabla tbody').children()[index]).find('span.ejec').removeClass('fa-book');
			$($('#coordinadora_tabla tbody').children()[index]).find('span.ejec').addClass('fa-search');

			//Esta es para el perfil de gestora
			/* $($('#coordinadora_tabla tbody').children()[index]).find('span.ejec').addClass('fa-check');
			$($('#coordinadora_tabla tbody').children()[index]).find('a.ejec_btn').addClass('disabled'); */

			$($('#coordinadora_tabla tbody').children()[index]).find('a.ejecucion').click(function(){
				let data = table.row($(this).parents('tr')).data();
				idPlaneacion = data[0];
				window.location.href = "ejecucion_Coordinadora.html?isEjecutada=1&idPlaneacion=" + idPlaneacion + "&idIntervencion=" + idIntervencion;
			})
			$($('#coordinadora_tabla tbody').children()[index]).find('a.asistencia').removeClass('disabled');
			$($('#coordinadora_tabla tbody').children()[index]).find('a.evaluacion').removeClass('disabled');
		}else{
			$($('#coordinadora_tabla tbody').children()[index]).find('a.ejecucion').click(function(){
				let data = table.row($(this).parents('tr')).data();
				idPlaneacion = data[0];
				window.location.href = "ejecucion_Coordinadora.html?idPlaneacion=" + idPlaneacion + "&idIntervencion=" + idIntervencion;
			})
		}
		$($('#coordinadora_tabla tbody').children()[index]).find('a.asistencia').click(function(){
			let data = table.row($(this).parents('tr')).data();
			idPlaneacion = data[0];
			window.location.href = "registro_Asistencia_Coordinadora.html?idPlaneacion=" + idPlaneacion + "&idIntervencion=" + idIntervencion;
		})
		$($('#coordinadora_tabla tbody').children()[index]).find('button.elplan').click(function(){
			let data = table.row($(this).parents('tr')).data();
			idPlaneacion = data[0];
			eliminarPlaneacion(idPlaneacion);
		})
		$($('#coordinadora_tabla tbody').children()[index]).find('button.elejec').click(function(){
			let data = table.row($(this).parents('tr')).data();
			idPlaneacion = data[0];
			eliminarEjecucion(idPlaneacion);
		})
		$($('#coordinadora_tabla tbody').children()[index]).find('button.edplan').click(function(){
			let data = table.row($(this).parents('tr')).data();
			idPlaneacion = data[0];
			cargarPlaneacionFormulario(idPlaneacion);
		})
		$($('#coordinadora_tabla tbody').children()[index]).find('button.edejec').click(function(){
			let data = table.row($(this).parents('tr')).data();
			idPlaneacion = data[0];
		})
	});

	//Evento para ver detalle ejecucion//
/* 	$('.ejecucion').click(function () {
		var data = table.row($(this).parents('tr')).data();
		var iconEjec = $(this).find('span').attr('class')
		idPlaneacion = data[0];
		if (data[0] != "") {
			if (iconEjec !== "fa fa-check") {
				window.location.href = "ejecucion_Coordinadora.html?idPlaneacion=" + idPlaneacion + "&idIntervencion=" + idIntervencion;
			} else {
				window.location.href = "ejecucion_Coordinadora.html?isEjecutada=1&idPlaneacion=" + idPlaneacion + "&idIntervencion=" + idIntervencion;
			}

		}
	}) */
}

$("#btnNuevaPlaneacion").click(function () {

	window.location.href = "planeacion_Coordinadora.html?idIntervencion=" + idIntervencion 
	+ "&comportamientos=" + comportamientos + "&competencia=" 
	+ competencia + "&idComportamientos=" + idComportamientos 
	+ "&idCompetencia=" + idCompetencia;
});

function navegar_home(){
    idZona = $.get("id_zona")
    window.location.href = "home_Coordinadora.html";
}

// Dropdown button defined for being called by table
var dropdown_button = 
'<div class="dropdown">'
 +'<button class="btn btn-secondary dropdown-toggle btn-success" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="ejec fa fa-gears"></span>&nbsp; Seleccione</button>'
  +'<div class="dropdown-menu" aria-labelledby="dropdownMenu2">'
   + '<button class="elplan dropdown-item" type="button"><span class="plan fa fa-close"></span>&nbsp; Planeación</button>'
    +'<button class="edplan dropdown-item" type="button"><span class="plan fa fa-edit"></span>&nbsp; Planeación</button>'
	+'<button class="elejec dropdown-item" type="button"><span class="ejecu fa fa-close"></span>&nbsp; Ejecución</button>'
	+'<button class="edejec dropdown-item" type="button"><span class="ejecu fa fa-edit"></span>&nbsp; Ejecución</button>'
  +'</div>'
+'</div>';
   

function eliminarPlaneacion(idPlaneacion) {
	swal('Eliminarás una planeación', '¿Estas seguro?', 'warning', {
		buttons: {cancel: "Cancelar", confirm: "Si"}, dangerMode: true
	}).then((willDelete) => {	
		if(willDelete){
			var url = "php/detalle_Intervencion_Coordinadora.php";
			$.post(url, {
				accion: 'eliminarPlaneacion',
				idPlaneacion: idPlaneacion
			},
			function (data) {
				if (data.error != 1) {
					swal({
						title: "Exítoso!",
						text: data.mensaje,
						icon: "success",
					}).then(function(){
						location.reload();
					});
				} else {
					swal({
						title: "Hay un problema",
						text: data.mensaje,
						icon: "error"
					});
				}
			}, 'json');
		}		
	});
}

// Se elimina la ejecucion no por id ejecucion sino por id planeacion
function eliminarEjecucion(idPlaneacion) {
	swal('Eliminarás una ejecución', '¿Estas seguro?', 'warning', {
		buttons: {cancel: "Cancelar", confirm: "Si"}, dangerMode: true
	}).then((willDelete) => {	
		if(willDelete){
			var url = "php/ejecucion_Coordinadora.php";
			$.post(url, {
				accion: 'eliminarEjecucion',
				idPlaneacion: idPlaneacion
			},
			function (data) {
				if (data.error != 1) {
					swal({
						title: "Exítoso!",
						text: data.mensaje,
						icon: "success"
					}).then(function(){
						location.reload();
					});
				} else {
					swal({
						title: "Hay un problema",
						text: data.mensaje,
						icon: "error"
					});
				}
			}, 'json');
		}
	});
}

function cargarPlaneacionFormulario(idPlaneacion){
	window.location.href = "planeacion_Coordinadora.html?idIntervencion=" + idIntervencion + "&comportamientos=" 
	+ comportamientos + "&competencia=" + competencia + "&idComportamientos=" + idComportamientos 
	+ "&idCompetencia=" + idCompetencia + "&id_planeacion=" + idPlaneacion;
}

function editarEjecucion(){
	swal("Muy pronto!", "Estamos haciendo unos cambios antes de actualizar", "warning");
}

function reloadpage(){
	location.reload();
}

