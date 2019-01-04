<?php

include 'lib.php';

$api = new gestionEducativa();
date_default_timezone_set("America/Bogota");

if(isset($_POST['estado'])){
  $sql = $api->getEtapaPlaneacion($_POST['estado']);
  
  if(!empty($sql)){
    if(count($sql) < 1){
      $estado = "En Ejecución";
    }else{
      $estado = "Ejecutado";
    }
  }

  $json = array('sql' => $sql, 'estado' => $estado);
}

if(isset($_POST['geo'])){
  $id_plan = $_POST['geo']['id_plan'];
  $fecha = (string) date("m-d-Y");
  $hora = date("H:i:s");
  $lat = $_POST['geo']['latitude'];
  $long = $_POST['geo']['longitude'];
  $id_plan = $_POST['geo']['id_plan'];

  $estado = $api->getEtapaPlaneacion($id_plan);

  if(count($estado) < 1){
    $etapa_plan = "Iniciada";
    $estado = "En Ejecución";
  }else{
    $etapa_plan = "Finalizada";
    $estado = "En Ejecución";
  }

  $sql = $api->insertGeoLocation($lat, $long, $fecha, $hora, $id_plan, $etapa_plan);

  if($sql['error'] != 1){
    $sql = $api->updateEstadoPlaneacion($estado, $id_plan);
  }

  $json = array("sql" => $sql,
  "etapa" => $etapa_plan);

}

echo json_encode($json);