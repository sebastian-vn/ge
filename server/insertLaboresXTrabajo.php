<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST['labores']) && isset($_POST['id_ta'])){
  $id_ta = $_POST['id_ta'];
  $labores = $_POST['labores'];
  foreach ($labores as $key => $value) {
    $json = $api->insertLaborXTrabajoAdministrativo($value, $id_ta);
  }
}else{
  $json = "No se recibieron adecuadamente los datos";
}

echo json_encode($json);