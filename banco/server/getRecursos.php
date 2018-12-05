<?php
include 'lib.php';

$api = new geBanco();

if (isset($_POST)) {
    $json = $api->getRecursos();
} else {
    $json = "No se recibieron los datos adecuados";
}

echo json_encode($json);
