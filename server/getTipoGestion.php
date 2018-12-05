<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['tipo_gestion'])) {

    $id_foc = $_POST['tipo_gestion'];
    $json = $api->getTipoGestion($id_foc);

} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);