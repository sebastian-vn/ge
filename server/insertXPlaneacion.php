<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
  if(isset($_POST['tacticos']) && isset($_POST['id_plan']) && isset($_POST['contactos']) && isset($_POST['subtemas'])){

    $id_plan = $_POST['id_plan'];

    foreach ($_POST['tacticos'] as $key => $value) {
      $name = $_POST['tacticos'][$key]['name'];
      $value = $_POST['tacticos'][$key]['value'];

      $json = $api->insertXPlaneacion($value, $id_plan, $name);

    }

    foreach ($_POST['contactos'] as $key => $value) {
      $name = $_POST['contactos'][$key]['name'];
      $value = $_POST['contactos'][$key]['value'];

      $json = $api->insertXPlaneacion($value, $id_plan, $name);
    }

    foreach ($_POST['subtemas'] as $key => $value) {
      $name = $_POST['subtemas'][$key]['name'];
      $value = $_POST['subtemas'][$key]['value'];

      $json = $api->insertXPlaneacion($value, $id_plan, $name);
    }

  }else{
    $json = $api->getMaxPlanFoc();
  }
}else{
  $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);