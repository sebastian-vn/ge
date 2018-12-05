<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {

    $json = $api->getTrabajosAdministrativosCalendar();

    $newArray = array();
    $n = 0;

    foreach ($json as $key => $value) {

        if (!isset($newArray[$value['id_trabajo_administrativo']])) {

            $newArray[$value['id_trabajo_administrativo']] = [
                "id_trabajo_administrativo" => $value['id_trabajo_administrativo'],
                "municipio" => $value['municipio'],
                "fecha" => $value['fecha'],
                "hora_inicio" => $value['hora_inicio'],
                "hora_fin" => $value['hora_fin'],
                "zonas" => $value['zonas'],
                "labores" => [],
                "gestor" => $value['nombre']
            ];
        }

        if (empty($newArray[$value['id_trabajo_administrativo']]['labores'])) {
            array_push($newArray[$value['id_trabajo_administrativo']]['labores'], $value['labor']);
        } else {
            foreach ($newArray[$value['id_trabajo_administrativo']]['labores'] as $k => $val) {
                if ($val != $value['labor']) {
                    array_push($newArray[$value['id_trabajo_administrativo']]['labores'], $value['labor']);
                }
            }
        }

    }

    foreach ($newArray as $key => $value) {

      $labores = implode(" - ", $value['labores']);

        $newArray[$key] = array(

            'id' => $value['id_trabajo_administrativo'],
            'title' => 'T. Administrativo - ' . $value['municipio'],
            'start' => $value['fecha'],

            'description' => 'Fecha : ' . $value['fecha'] . '</br>' .
            'Hora de inicio : ' . $value['hora_inicio'] . '</br>' .
            'Hora de finalización : ' . $value['hora_fin'] . '</br>' .
            'Zona : ' . $value['zonas'] . '</br>' .
            'Gestor : ' . $value['gestor'] . '</br>' .
            'Labores realizados : ' . $labores . '</br>',

            'hora_in' => $value['hora_inicio'],
            'hora_fin' => $value['hora_fin'],
            'editable' => false,
            'color' => 'blue',
            'textColor' => "white",
            'zona' => $value['zonas']
        );
    }

    $orgArray = array_values($newArray);
} else {
    $json = "No se recibieron los dato adecuadamente";
}

echo json_encode($orgArray);
