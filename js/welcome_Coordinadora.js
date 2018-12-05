$(document).ready(function(){   

traerNombreCoordinadora();	
		
	 
});

function traerNombreCoordinadora(){
				
		$.post("php/welcome_Coordinadora.php",{
              accion : 'traerNombreCoordinadora' 				
         },
          function (data) {
						if(data.error != 1){
								$('#contenedor-select').html(`
								<select id="selectbasicSeleccionCoordinadora" name="selectbasicSeleccionCoordinadora" class="form-control">
								
								</select>`);
								$('#selectbasicSeleccionCoordinadora').html(data.html)
								
							}
							
							
						
				},"json");
	
}

$("#buttonGoUser").click(function(){ 
        
		if ($("#selectbasicSeleccionCoordinadora").val() == 0){
			swal(
				  '', //titulo
				  'Debes seleccionar un usuario!',
				  'error'
				);
			
		}
		else{
			crearSesion();
			
			
		}
    });
	
function crearSesion(){
				
		var valor= $("#selectbasicSeleccionCoordinadora :selected").val();
		nombreSesion=$("#selectbasicSeleccionCoordinadora :selected").text();
		var res = valor.split("_");
		var numeroIdentificacion=res[0];
		var cargo=res[1];
		
		
		$.post("php/Session.php",{
           nombreSesion:nombreSesion,
		   numeroIdentificacion:numeroIdentificacion,
		   cargo:cargo
              				
         },
		 function (data) {
				window.location.href = "home_Coordinadora.html";		
						// $('#Nombre').html(data);
				}
          ,"json");
		 
	
}
