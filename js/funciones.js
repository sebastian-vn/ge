$(document).ready(function(){   
  //Carga información de las zonas    
   $.ajax({
        url: 'php/ConsultasDB.php?consulta=1',
        success: function(resp){
         $('#selectbasicZona').html(resp) 
         }
    });
   //Carga Información de los tipos de entidades
   $.ajax({
        url: 'php/ConsultasDB.php?consulta=7',
        success: function(resp){
         $('#selectbasicTipoEntidad').html(resp) 
         }
    });
  $.ajax({
      url: 'php/ConsultasDB.php?consulta=8',
      success: function(resp){
       $('#selectbasicTipoInvervencion').html(resp) 
       }
  });
   $.ajax({
      url: 'php/ConsultasDB.php?consulta=9',
      success: function(resp){
       $('#selectbasicComportamiento').html(resp) 
       }
  });
   $.ajax({
      url: 'php/ConsultasDB.php?consulta=11',
      success: function(resp){
       $('#selectbasicTipoDocumento').html(resp) 
       }
  });
   $.ajax({
      url: 'php/ConsultasDB.php?consulta=12',
      success: function(resp){
       $('#selectbasicJornada').html(resp) 
       }
  });
   $.ajax({
      url: 'php/ConsultasDB.php?consulta=13',
      success: function(resp){
       $('#selectbasicPoblacion').html(resp) 
       }
  });
    $.ajax({
      url: 'php/ConsultasDB.php?consulta=14',
      success: function(resp){
       $('#selectbasicEstrategia').html(resp) 
       }
  });
  $.ajax({
      url: 'php/ConsultasDB.php?consulta=10&Id_Comportamiento=1',
      success: function(resp){
       //$('#selectbasicEstrategia').html(resp) 
       $('.comportamiento').html(resp)
       }
  });
  $.ajax({
      url: 'php/ConsultasDB.php?consulta=18',
      success: function(resp){
       //$('#selectbasicEstrategia').html(resp) 
       $('#selectbasicSeleccionCoordinadora').html(resp)
       }
  });
  $.ajax({
      url: 'php/ConsultasDB.php?consulta=19',
      success: function(resp){
       //$('#selectbasicEstrategia').html(resp) 
       $('#selectbasicSeleccionGestora').html(resp)
       }
  });
  
  var data;
   $.ajax({
      data: {"accion": 'traerNombre'},
      type: 'get',
      datatype: 'json',
      url: 'php/CapturaVariableSession.php',
      success: function(data){
        
          //datos = data;
          var nombre = JSON.parse(data);
         //var nombre =data;
          $('#Nombre').html(nombre);
      }
  });      
});     

  $( "#NombreZona" ).change(function() {
      var texto = $('#NombreZona').text(); 
      var id='1';   
      //alert(texto);
      switch(texto)
      {

        case "Centro": id='1'; break;
        case "Suroccidente": id='2'; break;
        case "Occidente": id='3'; break;
        case "Noroccidente": id='4'; break;
        case "Oriente": id='5'; break;
      }
      $.ajax({
        url: 'php/ConsultasDB.php?consulta=16&Id_Zona='+id+'',
        success: function(resp){        
         $('#selectbasicMunicipio').html(resp) 
         }
    });
});






function recargarMunicipios(zona)
{
   //esperando la carga...
   $('#selectbasicMunicipio').html('<option value="">Cargando...aguarde</option>'); 
   //realizo la call via jquery ajax
   var parametros = {
                "Id_Zona" : zona,
                "consulta" : '2'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('#selectbasicMunicipio').html(resp) 
         }
    });
}


function recargarComunas(municipio)
{
   //esperando la carga...
   $('#selectbasicComuna').html('<option value="">Cargando...aguarde</option>'); 
   //realizo la call via jquery ajax
   var parametros = {
                "Id_Municipio" : municipio,
                "consulta" : '3'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('#selectbasicComuna').html(resp) 
         }
    });



   $('#selectbasicVereda').html('<option value="">Cargando...aguarde</option>'); 
   //realizo la call via jquery ajax
   var parametros = {
                "Id_Municipio" : municipio,
                "consulta" : '4'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('#selectbasicVereda').html(resp) 
         }
    });
}

function recargarBarrios(comuna)
{
   //esperando la carga...
   $('#selectbasicBarrio').html('<option value="">Cargando...aguarde</option>'); 
   //realizo la call via jquery ajax
   var parametros = {
                "Id_Comuna" : comuna,
                "consulta" : '5'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('#selectbasicBarrio').html(resp) 
         }
    });
}



function validarRadio(valor)
{
  if (valor == '1') {//rural
       document.getElementById("selectbasicVereda").disabled=false;
       document.getElementById("selectbasicBarrio").disabled=true;
  } 
  else {//urbano
        document.getElementById("selectbasicBarrio").disabled=false;
        document.getElementById("selectbasicVereda").disabled=true;
  }
}


  
function recargarIndicadores(comportamiento)
{
   //esperando la carga...
   var parametros = {
                "Id_Comportamiento" : comportamiento,
                "consulta" : '10'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('.comportamiento').html(resp)
         }
    });
}

function recargarTactico(estrategia)
{
   //esperando la carga...
   $('#selectbasicTactico').html('<option value="">Cargando...aguarde</option>'); 
   //realizo la call via jquery ajax
   var parametros = {
                "Id_Estrategia" : estrategia,
                "consulta" : '15'
        };
   $.ajax({    
        url: 'php/ConsultasDB.php',
        data: parametros,
        type:  'get',
        success: function(resp){
         $('#selectbasicTactico').html(resp) 
         }
    });
}

function buscarEntidad() { 
    //Al escribr dentro del input con id="service"
    $('#textinputNombreEntidad').keypress(function(){
        //Obtenemos el value del input
        var service = $(this).val(); 
         var selector = document.getElementById('selectbasicBarrio');
        var barrio = selector[selector.selectedIndex].value;
         var selector = document.getElementById('selectbasicVereda');
        var vereda = selector[selector.selectedIndex].value;
        //if(document.getElementById("selectbasicBarrio").disabled == false)
        if(barrio=="")
        {
          barrio=0;
        }
         if(vereda=="")
        {
          vereda=0;
        }       
        var dataString = 'service='+service;
        var consulta='6';
        //Le pasamos el valor del input al ajax
        $.ajax({
            type: "GET",
            url: "php/ConsultasDB.php?consulta="+consulta+"&barrio="+barrio+"&vereda="+vereda+"",
            data: dataString,
            success: function(data) {
                //Escribimos las sugerencias que nos manda la consulta
                $('#suggestions').fadeIn(1000).html(data);
                //Al hacer click en algua de las sugerencias
               $("a").on('click', function(){
                    //Obtenemos la id unica de la sugerencia pulsada
                    var id = $(this).attr('id');                    
                    var texto = $(this).text();                        
                    $('#textinputNombreEntidad').val(texto);
                    $("#id_Entidades").val(id);
                    mostrarInformacion(id);                     
                    //Hacemos desaparecer el resto de sugerencias
                    $('#suggestions').fadeOut(1000);
                });              
            }
        });
 });    
}

function mostrarInformacion(valor){
  
   var id_entidad = $("#id_Entidades").val(); 
  
     $.ajax({
          url: 'php/ConsultasDB.php?consulta=17&Id_Entidad='+id_entidad+'',
          success: function(resp){ 
           // resp = resp.replace("<br />","");
            resp = JSON.parse(resp);
            //alert(resp.length);            
              if(resp.length)
              {        
                direccion = resp[0];
                telefono = resp[1];
                 //$('#textinputTelefono').html(telefono) 
                 $("#textinputTelefono").val(telefono);
                 //$('#textinputDireccion').html(direccion) 
                 $("#textinputDireccion").val(direccion);
              }
           //$('#selectbasicEstrategia').html(resp) 
          // $('.comportamiento').html(resp)
           }
      });
 }
function validarUsuario(Id_Cargo, tipoCargo){  

  if(tipoCargo=='1')//Coordinadora
  {

      var parametros = {
          "Id_Coordinadora" : Id_Cargo
      };
      var url = "Home_Coordinadora.html";
  }
  else
  {
      if(tipoCargo=='2')//Gestora
      {       
          var parametros = {
              "Id_Gestora" : Id_Cargo
          };
          var url = "Home_Gestora.html";
      }
  }
  
  $.ajax({
          data:  parametros,
          url:   'php/Session.php',
          type:  'get',
          beforeSend: function (data) {            
                 
          },
          success:  function (response) { 
          //alert(response);
             //response = JSON.parse(response);            
            //resp = response.replace("<br />","");        
            resp = response.trim();              
              if(resp!=0)
              {         
                //var myvar='<?php session_start(); echo $_SESSION["Coordinadora"];?>';       
                window.location.href = "php/ValidarSesion.php";
                window.location.href = url; 
              }
          }
  });
}
/*
$("#button2id").click(function(){
    alert("Entro a guardar");
    $.post("php/GuardarRegistros.php",
        {
          //FALTA ENVIAR EL RESTO DE LAS VARIABLES DEL FORMULARIO
         accion    : 'guardarIntervencion'

          
        },
        function(data){
          if(data.error == 1)
          {
            alert("se presento un error");
          }
          else
          { 
            alert("guardado");
          }          
        },
         "json"
      );

});*/
 


        
   
   