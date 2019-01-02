<?php

include 'lib.php';

$api = new gestionEducativa();
date_default_timezone_set("America/Bogota");

if(isset($_POST)){
  $id_plan = $_POST['id_plan'];
  $fecha = (string) date("m-d-Y");
  $hora = date("H:i:s");
  $lat = $_POST['latitude'];
  $long = $_POST['longitude'];
  $id_plan = $_POST['id_plan'];

  $estado = $api->getEtapaPlaneacion($id_plan);

  if(count($estado) < 1){
    $etapa_plan = "Iniciada";
    $estado = "En Ejecución";
  }

  $json = array("sql" => $api->insertGeoLocation($lat, $long, $fecha, $hora, $id_plan, $etapa_plan),
  "etapa" => $etapa_plan);

}

echo json_encode($json);