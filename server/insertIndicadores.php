<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
  if(isset($_POST['id_foc']) && isset($_POST['indicadores'])){
    $id_foc = $_POST['id_foc'];
    $id_ind = $_POST['indicadores'];

    foreach ($id_ind as $key => $value) {
      $json = $api->insertIndicadoresXFocalizacion($id_foc, $value);
    }
  }else{
    $json = $api->getMaxIdFoc();
  }
}else{
  $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);