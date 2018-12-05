<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['municipio'])) {

    $id_municipio = $_POST['municipio'];
    $json = $api->getFocalizacionesXZona($id_municipio);

} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);