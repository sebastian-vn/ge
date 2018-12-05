<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    if (isset($_POST['subtema'])) {
      $arraySubtema = $_POST['subtema'];
      $json = $api->getIndicadoresGEXSubtema($arraySubtema);
    } else {
        $json = "No se recibieron los datos de manera adecuada";
    }
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
