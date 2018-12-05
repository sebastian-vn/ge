function emergente() {
  var miForm = null;

  //Carga de la página, donde creamos formularios emergentes

  // EJEMPLO DEL FORMULARIO PARA ENVIO DE DATOS -----
  //Creamos otro emergente para envío de datos
  miForm = new formEmerge(
    "miForm",
    "Enviar datos",
    true,
    3,
    "marco",
    "miform.php",
    "post"
  );
  //Componemos un literal HTML para la primera pestaña
  var html1 =
    "<label>Nombre:<input type='text' name='nombre' value='' " +
    "size='35' class='fuente-mi-form' />" +
    "</label><br />" +
    "<label>Dirección:<input type='text' name='direccion' value='' " +
    "size='35' class='fuente-mi-form' />" +
    "</label><br />" +
    "<label>E-mail:<input type='text' name='email' value='' " +
    "size='35' class='fuente-mi-form' />" +
    "</label><br />" +
    "<label>Cuestión:<br /><textarea name='cuestion' rows='7' cols='40' " +
    "class='fuente-mi-form'></textarea>" +
    "</label>";
  //Componemos otro literal para la segunda pestaña
  var html2 =
    "<label>Edad:<input type='text' name='edad' value='' " +
    "size='10' class='fuente-mi-form' />" +
    "</label><br />" +
    "<label>Profesión:<input type='text' name='profesion' value='' " +
    "size='35' class='fuente-mi-form' />" +
    "</label><br />" +
    "<label>Aficiones:<input type='text' name='aficiones' value='' " +
    "size='35' class='fuente-mi-form' />" +
    "</label><br />";
  //Llenamos un array con los nombres de las pestañas
  var arrayPestanyas = new Array("Personales", "Otros datos");
  // Llenamos una array con los contenidos
  var arrayHtmls = new Array(html1, html2);
  // Creamos las pestañas con esos dos array y les damos
  //ancho, alto y "auto" para la propiedad overflow
  miForm.creaTabs(arrayPestanyas, arrayHtmls, "23em", "14em", "auto");
}
