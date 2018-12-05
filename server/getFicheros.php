<?php
include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST)) {
  $json = $api->getFicheros();
} else {
  $json = "No se recibieronlos datos de manera adecuada";
}

echo json_encode($json);