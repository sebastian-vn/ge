<?php

require 'lib.php';

$api = new gestionEducativa();

if(isset($_POST)){

    if(isset($_POST['municipio'])){
        $json = $api->getMunicipioInforme();
    }

    if(isset($_POST['informe'])){
        $json = $api->getInformes();
        $informe = array();
        foreach ($json as $key => $value) {
            $informe[$key] = [
                "name" => $value['zona'],
                "data" => [intval($value['sum'])]
            ];
        }
        $json = $informe;
    }
}else{
    $json = 'No se recibieron los datos adecuadamente';
}

echo json_encode($json);