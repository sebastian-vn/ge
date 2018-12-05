<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['comportamiento'])) {
    $json = $api->getIndicadoresChec($_POST['comportamiento']);
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
