<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
  $json = $api->getZonas();
}else{
  $json = "No se recibieron adecuadamente los datos";
}

echo json_encode($json);