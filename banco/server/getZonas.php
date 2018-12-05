<?php

include "lib.php";

$api = new geBanco();

if (isset($_POST)) {
    $json = $api->getZonas();
} else {
    $json = "No se recibieron los datos de manera adecuada";
}

echo json_encode($json);
