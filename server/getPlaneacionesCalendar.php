<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {

    if (isset($_POST['no_ejec'])) {
        $json = $api->getNovedadesNoEjecucion();

        foreach ($json as $key => $value) {

            $json[$key] = array(
                'id' => $value['id_planeacion'],
                'title' => 'No ejecucion / ' . $value['comportamientos'] . ' - ' . $value['competencia'],
                'start' => $value['fecha_no_ejecutada'],
                'proximo' => $value['fecha_plan'],

                'description' =>
                'Municipio : ' . $value['municipio'] . '</br>' .
                'Fecha de la actividad no ejecutada : ' . $value['fecha_no_ejecutada'] . '</br>' .
                'Nueva fecha para la ejecución de la actividad : ' . $value['fecha_plan'] . '</br>' .
                'Zona : ' . $value['zonas'] . '</br>' .
                'Gestor : ' . $value['nombre'] . '</br>' .
                'Tema : ' . $value['temas'] . '</br>' .
                'Estrategia : ' . $value['nombre_estrategia'] . '</br>',

                'editable' => false,
                'color' => '#a2a1a0',
                'textColor' => "white",
                'zona' => $value['zonas'],
            );
        }

    }

    /* -------------------------------------------------------------------------------- */

    if (isset($_POST['planEjec_cal'])) {
        $json = $api->getPlaneacionesEjecutadosOEnEjecucion();

        $newArray = array();
        $n = 0;

        foreach ($json as $key => $value) {

            if (!isset($newArray[$value['id_planeacion']])) {

                $newArray[$value['id_planeacion']] = [
                    "id_planeacion" => $value['id_planeacion'],
                    "fecha_plan" => $value['fecha_plan'],
                    "jornada" => $value['jornada'],
                    "lugar_encuentro" => $value['lugar_encuentro'],
                    "municipio" => $value['municipio'],
                    "comportamientos" => $value['comportamientos'],
                    "competencia" => $value['competencia'],
                    "zonas" => $value['zonas'],
                    "nombre_estrategia" => $value['nombre_estrategia'],
                    "tacticos" => [],
                    "temas" => $value['temas'],
                    "gestor" => $value['nombre'],
                    "hora" => [],
                    "estado" => $value['estado'],
                ];
            }

            if (empty($newArray[$value['id_planeacion']]['tacticos'])) {
                array_push($newArray[$value['id_planeacion']]['tacticos'], $value['nombre_tactico']);
            } else {
                $valid = true;
                foreach ($newArray[$value['id_planeacion']]['tacticos'] as $k => $val) {
                    if ($val == $value['nombre_tactico']) {
                        $valid = false;
                        break;
                    }
                }

                if ($valid) {
                    array_push($newArray[$value['id_planeacion']]['tacticos'], $value['nombre_tactico']);
                }
            }

            /* Set time */
            if ($value['etapa_planeacion'] == "Iniciada") {
                $newArray[$value['id_planeacion']]['hora']['hora_inicio'] = $value['hora'];
            } else {
                $newArray[$value['id_planeacion']]['hora']['hora_fin'] = $value['hora'];
            }
        }

        /* Set variables for when planeacion is fully executed */
        $requisitos = array();
        $list = "";
        foreach ($newArray as $key => $value) {

            if ($value['estado'] != 'Ejecutado') {
                if (empty($value['hora']['hora_fin'])) {
                    $value['hora']['hora_fin'] = '--:--';
                    $validEjec = false;
                    $validReg = false;
                } else {
                    $ejecuciones = $api->ejecucion_planeacion($value['id_planeacion']);
                    $registros = $api->checkRegistros($value['id_planeacion']);

                    if (empty($ejecuciones)) {
                        array_push($requisitos, 'Registrar la ejecución de la actividad');
                        $validEjec = false;
                    } else {
                        $validEjec = true;
                    }

                    if (empty($registros)) {
                        $validReg = false;
                        array_push($requisitos, 'Adjuntar evidencias');
                        array_push($requisitos, 'Adjuntar asistencia');
                        array_push($requisitos, 'Adjuntar acta');
                    } else {

                    }

                    for ($i = 0; $i < count($requisitos); $i++) {
                        $list .= '<li>' . $requisitos[$i] . '</li>';
                    }

                }
            }

            if ($value['estado'] != 'Ejecutado') {
                $color = '#edbe00';
                $icon = 'fas fa-minus-circle';
            } else {
                $color = '#269226';
                $icon = 'fas fa-check-circle';
            }

            $tacticos = implode(", ", $value['tacticos']);

            $newArray[$key] = array(

                'id' => $value['id_planeacion'],
                'title' => $value['comportamientos'] . ' - ' . $value['municipio'],
                'start' => $value['fecha_plan'],

                'description' =>
                '<ul>' .
                '<li> Fecha : ' . $value['fecha_plan'] . '</li>' .
                '<li> Jornada : ' . $value['jornada'] . '</li>' .
                '<li> Lugar de encuentro : ' . $value['lugar_encuentro'] . '</li>' .
                '<li> Municipio : ' . $value['municipio'] . '</li>' .
                '<li> Estrategias : ' . $value['nombre_estrategia'] . '</li>' .
                '<li> Tacticos : ' . $tacticos . '</li>' .
                '<li> Temas : ' . $value['temas'] . '</li>' .
                '<li> Zona : ' . $value['zonas'] . '</li>' .
                '<li> Gestor : ' . $value['gestor'] . '</li>' .
                '</ul>',

                'editable' => false,
                'color' => $color,
                'textColor' => "white",
                'zona' => $value['zonas'],

                'estado' =>

                '<i class="' . $icon . '" style="font-size: 3em;color: ' . $color . ';align-self: center;"></i>' .
                '<div>' .
                '<div class="row">' .
                '<h4>Hora de Inicio: </h4>' .
                '<h3>  ' . $value['hora']['hora_inicio'] . '</h3>' .
                '</div>' .
                '<div class="row">' .
                '<h4>Hora de Finalización: </h4>' .
                '<h3> ' . $value['hora']['hora_fin'] . ' </h3>' .
                '</div>' .
                '</div>' .
                '<div class="accordion" id="requisitosPlan">' .
                '<div class="card">' .
                '<div class="card-header" id="headingOne">' .
                ' <h2 class="mb-0">' .
                '<button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Mira lo que falta para ejecutar por completo la planeación</button>' .
                '</h2>' .
                '</div>' .

                '<div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#requisitosPlan">' .
                '<div class="card-body">' .
                '<ul>' .
                $list .
                '</ul>' .
                '</div>' .
                '</div>' .
                '</div>' .
                '</div>',

            );

            $requisitos = array();
            $list = "";
        }

        $json = array_values($newArray);
    }

    /* ------------------------------------------------------------------------------------------------------- */

    if (isset($_POST['plan_cal'])) {

        $arrayPlaneaciones = $_POST['plan_cal'];

        $json = $api->getPlaneacionesCalendar();

        if (empty($json)) {
            $json = array("message" => "No hay nada planeado", "error" => 1);
        } else {
            $newArray = array();
            $n = 0;

            foreach ($json as $key => $value) {

                if (!isset($newArray[$value['id_planeacion']])) {

                    $newArray[$value['id_planeacion']] = [
                        "id_planeacion" => $value['id_planeacion'],
                        "fecha_plan" => $value['fecha_plan'],
                        "jornada" => $value['jornada'],
                        "lugar_encuentro" => $value['lugar_encuentro'],
                        "municipio" => $value['municipio'],
                        "comportamientos" => $value['comportamientos'],
                        "competencia" => $value['competencia'],
                        "zonas" => $value['zonas'],
                        "nombre_estrategia" => $value['nombre_estrategia'],
                        "tacticos" => [],
                        "temas" => $value['temas'],
                        "gestor" => $value['nombre'],
                        "solicitud_interventora" => $value['solicitud_interventora'],
                    ];
                }

                if (empty($newArray[$value['id_planeacion']]['tacticos'])) {
                    array_push($newArray[$value['id_planeacion']]['tacticos'], $value['nombre_tactico']);
                } else {
                    foreach ($newArray[$value['id_planeacion']]['tacticos'] as $k => $val) {
                        if ($val != $value['nombre_tactico']) {
                            array_push($newArray[$value['id_planeacion']]['tacticos'], $value['nombre_tactico']);
                        }
                    }
                }

            }

            foreach ($newArray as $key => $value) {

                $tacticos = implode(", ", $value['tacticos']);

                if ($value['solicitud_interventora']) {
                    $color = "#7704df";
                } else {
                    $color = "red";
                }

                $newArray[$key] = array(

                    'id' => $value['id_planeacion'],
                    'title' => $value['comportamientos'] . ' - ' . $value['municipio'],
                    'start' => $value['fecha_plan'],

                    'description' =>
                    '<ul>' .
                    '<li> Fecha : ' . $value['fecha_plan'] . '</li>' .
                    '<li> Jornada : ' . $value['jornada'] . '</li>' .
                    '<li> Lugar de encuentro : ' . $value['lugar_encuentro'] . '</li>' .
                    '<li> Municipio : ' . $value['municipio'] . '</li>' .
                    '<li> Estrategias : ' . $value['nombre_estrategia'] . '</li>' .
                    '<li> Tacticos : ' . $tacticos . '</li>' .
                    '<li> Temas : ' . $value['temas'] . '</li>' .
                    '<li> Zona : ' . $value['zonas'] . '</li>' .
                    '<li> Gestor : ' . $value['gestor'] . '</li>' .
                    '</ul>',

                    'editable' => false,

                    'color' => $color,
                    'textColor' => "white",
                    'zona' => $value['zonas'],
                );
            }

            $json = array_values($newArray);
        }

    }

} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
