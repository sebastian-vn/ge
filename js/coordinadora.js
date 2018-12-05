$(document).ready(function(){   
	
		traerNombreCoordinadora();
		nada();
	// var data;
   // $.ajax({
      // data: {"accion": 'traerNombre'},
      // type: 'get',
      // datatype: 'json',
      // url: 'php/CapturaVariableSession.php',
      // success: function(data){
        
          // //datos = data;
          // var nombre = JSON.parse(data);
         // //var nombre =data;
		 // alert("nombre"+nombre);
          // $('#Nombre').html(nombre);
      // }
  // }); 
	traerNombreGestora();
	// mostrarIntervencion();
	 
});

/*nombre de la coordinadora
* para el select inicial donde se selecciona el usuario
*/
function nada()
{
	$.get("php/CapturaVariableSession.php",{
           accion:"traerNombre",
              				
         },
		 function (data) {
					alert("gg"+data);	
						$('#Nombre').html(data);
				}
          ,"json");
}





	


	/*Nombre de las gestoras por zona
	* para poner el el panel de la izquierda de home_coordinadora.html
	*/
function traerNombreGestora()
{
  
  $.post("php/coordinadora.php",{
         accion : 'traerNombre'
              				
         },
          function (data) {
						if(data.error != 1){
								// if(data.zonas =="Centro")
								 // {
									// $('#nombreGestoraCentro').text(data.nombre);
								 // }
								 // alert(data.html[0].Nombres);
								 console.log(data.html);
							}
							// else{
								// mostrarPopUpError(data.error);
							// }
							
						
				},"json");
}
function mostrarIntervencion()
{
     $.ajax({
      data: {"accion": 'traerIntervencionGestora'},
      type: 'post',
      datatype: 'json',
      url: 'php/coordinadora.php',
      success: function(data){
          //datos = data;              
          //var zona = JSON.parse(data);
          $('#IntervencionCentro').html(data);
      }
  });
}