<?php

include "lib.php";

$api = new geBanco();

if(isset($_POST)){
  $json = $api->getListaRecursos();
}else{
  $json = "Hubo un error al recibir la informacion";
}

echo json_encode($json);