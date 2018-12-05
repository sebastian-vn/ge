<?php
include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    if (isset($_POST['mun'])) {
        $id_mun = $_POST['mun'];
        $json = $api->getEntidades($id_mun);
    }else{
        $json = "No se recibieron los datos de manera adecuada";
    }
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
