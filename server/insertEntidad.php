<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){

  if(isset($_POST['nombre'])){
    $nombre = $_POST['nombre'];
  }else{
    $nombre = "null";
  }

  if(isset($_POST['direccion'])){
    $direccion = $_POST['direccion'];
  }else{
    $direccion = "null";
  }

  if(isset($_POST['tipoEntidad'])){
    $tipoEntidad = $_POST['tipoEntidad'];
  }else{
    $tipoEntidad = "null";
  }

  if(isset($_POST['telefono'])){
    $telefono = $_POST['telefono'];
  }else{
    $telefono = "null";
  }

  if(isset($_POST['municipio'])){
    $municipio = $_POST['municipio'];
  }else{
    $municipio = "null";
  }

  $json = $api->insertEntidad($nombre, $direccion, $telefono, $tipoEntidad, $municipio);


}else{
  $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);