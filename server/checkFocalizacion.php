<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
  $id_mun = $_POST['id_mun'];
  $comp = $_POST['comportamiento'];
  $tipo = $_POST['tipoFocalizacion'];

  $check = $api->checkFocalizacion($id_mun, $comp, $tipo);

  if(count($check) > 0){
    $json = array('error' => 0, 'message' => "Ya existe una focalizacion de " . $check[0]['tipo_focalizacion'] . ", de " . $check[0]['competencia'] . " en " . $check[0]['municipio']);
  }else{
    $json = array('error' => 1, 'message' => "");
  }
}else{
  $json = "Error al recibir la información";
}

echo json_encode($json);