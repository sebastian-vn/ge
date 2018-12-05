<?php
include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    if (isset($_POST['comportamiento'])) {
        $id_comport = $_POST['comportamiento'];
        $json = $api->getTemas($id_comport);
    } else {
        $json = "No se recibieron los datos de manera adecuada";
    }
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
