<?php
include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
    if (isset($_POST['estrategia'])) {
        $id_estrat = $_POST['estrategia'];

        $json = $api->getTacticos($id_estrat);

    } else {
        $json = "No se recibieron los datos de manera adecuada";
    }
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
