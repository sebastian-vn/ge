<?php

require 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){
    

    $json = $api->getInformes();

    $informe = array();
    foreach ($json as $key => $value) {
        $informe[$key] = [
            "name" => $value['zona'],
            "data" => [intval($value['sum'])]
        ];
    }
}

echo json_encode($informe);
