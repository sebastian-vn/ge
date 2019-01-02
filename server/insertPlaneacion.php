<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {

    $fechaReg = (string) date("m-d-Y");

    if (isset($_POST['fecha']) && isset($_POST['jornada']) && isset($_POST['lugarEncuentro'])
        && isset($_POST['entidad']) && isset($_POST['id_foc'])) {

        #Create datetime of $_POST['fecha']
        $newDate = date_create($_POST['fecha']);
        #Change new date format
        $fechaPlan = date_format($newDate, "m-d-Y");
        $jornada = $_POST['jornada'];
        $lugarEncuentro = $_POST['lugarEncuentro'];
        $entidad = $_POST['entidad'];
        $id_foc = $_POST['id_foc'];
        $estado = "Planeado";
    }

    if (!empty($_POST['vereda'])) {
        $vereda = $_POST['vereda'];
    } else {
        $vereda = "null";
    }

    if (!empty($_POST['barrio'])) {
        $barrio = $_POST['barrio'];
    } else {
        $barrio = "null";
    }

    $json = $api->insertPlaneacion($jornada, $lugarEncuentro, $barrio,
        $vereda, $entidad, $fechaPlan, $fechaReg, $id_foc, $estado);

} else {
    $json = 'No se recibieron adecuadamente los datos.';
}

echo json_encode($json);
