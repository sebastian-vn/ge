<?php

include "lib.php";

$api = new geBanco();

if (isset($_POST['competencia'])) {
    $json = $api->getTemas($_POST['competencia']);
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);