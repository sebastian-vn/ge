<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {

    $id_planeacion = $_POST['id_plan'];
    $descripcion = $_POST['descripcionNovedad'];
    $fecha_aplazamiento = $_POST['fechaAplazada'];

    if (isset($_POST['no_ejec'])) {

        $fecha = date_create($_POST['fecha_plan']);
        $fecha_plan = date_format($fecha, 'm-d-Y');

        $json = $api->insertNovedadNoEjecucion($id_planeacion, $descripcion, $fecha_aplazamiento, $fecha_plan);

        if($json['error'] == 0){
            $json = "Novedad guardada!";
        }else{
            $json = "La novedad no se pudo guardar!";
        }

    }

    if (isset($_POST['aplazar_plan'])) {
        $json = $api->aplazarPlaneacion($id_planeacion, $fecha_aplazamiento);

        if($json['error'] == 0){
            $json = "Se aplazó la planeación existosamente";
        }else{
            $json = "No se pudo aplazar la planeación";
        }
    }

} else {
    $json = "No se recibieron adecuadamente los datos";
}

echo json_encode($json);
