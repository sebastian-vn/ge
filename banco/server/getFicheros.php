<?php
include 'lib.php';

$api = new geBanco();

if(isset($_POST['competencia']) && $_POST['competencia'] != 0){
    $competencia = $_POST['competencia'];
}else{
    $competencia = null;
}

if(isset($_POST['tema']) && $_POST['tema'] != 0){
    $tema = $_POST['tema'];
}else{
    $tema = null;
}

if(isset($_POST['zona']) && $_POST['zona'] != ""){
    $zona = $_POST['zona'];
}else{
    $zona = null;
}

if(isset($_POST['indicador']) && $_POST['indicador'] != 0){
    $indicador = $_POST['indicador'];
}else{
    $indicador = null;
}

$json = $api->getFicheros($competencia, $tema, $zona, $indicador);

echo json_encode($json);
