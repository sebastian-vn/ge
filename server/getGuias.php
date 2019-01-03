<?php

include 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
  $subtemas = implode(',', $_POST['subtema']);

  $json = $api->getGuiasPlaneacion($subtemas);

}

echo json_encode($json);