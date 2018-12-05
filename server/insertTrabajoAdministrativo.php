<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    if (isset($_POST['fecha']) && isset($_POST['horaInicio']) && isset($_POST['horaFin']) && isset($_POST['municipio'])) {

        $fecha = $_POST['fecha'];
        $hora_fin = $_POST['horaFin'];
        $hora_inicio = $_POST['horaInicio'];
        $id_municipio = $_POST['municipio'];
        $descripcion = "null";

        $json = $api->insertTrabajoAdministrativo($hora_inicio, $hora_fin, $id_municipio, $fecha, $descripcion);
    } else {
        $json = $api->getMaxIdTAdmin();
    }

} else {
    $json = "No se recibieron adecuadamente los datos";
}
echo json_encode($json);
