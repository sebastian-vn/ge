<?php

include 'lib.php';

$api = new gestionEducativa();


if (isset($_POST)) {
    if (isset($_POST['tema'])) {
      $id_tema = $_POST['tema'];
        $json = $api->getSubtemasXTema($id_tema);
    } else {
        $json = "No se recibieron los datos adecuadamente";
    }
}else{
  $json = "No se recibieron los datos adecuadamente";
}

echo json_encode($json);