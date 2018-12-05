<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['foc'])) {
    $json = $api->getPlaneacionesXFocalizacion($_POST['foc']);

    $newArray = array();
    $n = 0;

    foreach ($json as $key => $value) {

        if (!isset($newArray[$value['id_planeacion']])) {

            $newArray[$value['id_planeacion']] = [
                "id_planeacion" => $value['id_planeacion'],
                "tipo_gestion" => $value['tipo_gestion'],
                "nombre_estrategia" => [],
                "temas" => $value['temas'],
                "fecha_plan" => $value['fecha_plan'],
                "fecha_registro" => $value['fecha_registro'],
                "id_zona" => $value['id_zona'],
                "id_foc" => $value['id_focalizacion'],
            ];
        }

        if (empty($newArray[$value['id_planeacion']]['nombre_estrategia'])) {
            array_push($newArray[$value['id_planeacion']]['nombre_estrategia'], $value['nombre_estrategia']);
        } else {
            foreach ($newArray[$value['id_planeacion']]['nombre_estrategia'] as $k => $val) {
                if ($val != $value['nombre_estrategia']) {
                    array_push($newArray[$value['id_planeacion']]['nombre_estrategia'], $value['nombre_estrategia']);
                }
            }
        }

    }
}

if (isset($_POST['detallePlaneacion'])) {
    $json = $api->getDetallePlaneacionEjecucion($_POST['detallePlaneacion']);

    $newArray = array();
    $entro = true;
    foreach ($json as $key => $value) {

        if ($entro) {

            $newArray[1] = [
                "fecha" => $value['fecha_plan'],
                "mun" => $value['municipio'],
                "gestor" => $value['nombre'],
                "zona" => $value['zonas'],
                "entidad" => $value['nombre_entidad'],
                "compor" => $value['comportamientos'],
                "compe" => $value['competencia'],
                "estrategias" => $value['nombre_estrategia'],
                "tacticos" => [],
                "temas" => $value['temas'],
            ];

            $entro = false;
        }

        array_push($newArray[1]['tacticos'], $value['nombre_tactico']);

    }

}

echo json_encode($newArray);
