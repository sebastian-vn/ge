<?php
include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    $json = $api->getComportamientos();
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
