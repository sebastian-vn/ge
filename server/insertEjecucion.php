<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['fecha']) && isset($_POST['horaInicio']) &&
isset($_POST['horaFin']) && isset($_POST['ninios']) && isset($_POST['jovenes']) && isset($_POST['adultos'])
  && isset($_POST['resultadoEjecucion']) && isset($_POST['descResultado']) && isset($_POST['id_plan'])) {

    if(!is_null($_POST['descResultado'])){
      $desc = $_POST['descResultado'];
    }else{
      $desc = "null";
    }

    $fecha = $_POST['fecha'];
    $hora_inicio = $_POST['horaInicio'];
    $hora_fin = $_POST['horaFin'];
    $total_asist = $_POST['ninios'] + $_POST['jovenes'] + $_POST['adultos'];
    $id_planeacion = $_POST['id_plan'];
    $id_resultado = $_POST['resultadoEjecucion'];

    $json = $api->insertEjecucion($fecha, $hora_inicio, $hora_fin, $id_resultado, $desc, $id_planeacion, $total_asist);
}else{
  $json = "No se recibieron adecuadamente los datos";
}

echo json_encode($json);
