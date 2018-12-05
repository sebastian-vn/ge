<?php

include "lib.php";

$api = new geBanco();

$data = array('success' => 0, 'message' => '');

$competencia = $_POST['competencia'];
$indicador = $_POST['indicador'];
$tema = $_POST['tema'];
$zona = $_POST['zona'];
$codigo = $_POST['codigo'];
$archivo_fichero = $_FILES['fichero'];

$file_tmp = $archivo_fichero['tmp_name'];
$file_name = $archivo_fichero['name'];
$file_dest = '../recursos/ficheros/'. $zona . '/' . $file_name;


if($zona == 0){
  $zona = 'null';
  $file_dest = '../recursos/ficheros/' . $file_name;
}

$json = $api->subirFichero($competencia, $tema, $zona, $file_name, $codigo, 8, $indicador, $file_tmp, $file_dest);


echo json_encode($json);