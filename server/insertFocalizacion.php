<?php

include 'lib.php';

$api = new gestionEducativa();

$fecha = (string) date("m-d-Y");

if (isset($_POST)) {
    if (isset($_POST['municipio'])) {
        $id_mun = $_POST['municipio'];
    } else {
        $id_mun = "null";
    }

    if (isset($_POST['tipoGestion'])) {
        $tipoGestion = $_POST['tipoGestion'];
    } else {
        $tipoGestion = "null";
    }

    if (isset($_POST['tipoFocalizacion'])) {
        $tipoFocalizacion = $_POST['tipoFocalizacion'];
    } else {
        $tipoFocalizacion = "null";
    }

    if (isset($_POST['comportamiento'])) {
        $comportamiento = $_POST['comportamiento'];
    } else {
        $comportamiento = "null";
    }

    $json = $api->insertFocalizacion($id_mun, $tipoGestion, $tipoFocalizacion, $fecha);

} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
