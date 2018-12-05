<?php

include "lib.php";

$api = new geBanco();

$recurso = $_POST['recurso'];

if (!empty($_FILES['files']['name'][0]) && !empty($recurso)) {

    $files = $_FILES['files'];
    $uploaded = array();
    $failed = array();
    $data = array('uploaded' => $uploaded, 'failed' => $failed);

    foreach ($files['name'] as $position => $file_name) {

        $file_tmp = $files['tmp_name'][$position];
        $file_size = $files['size'][$position];
        $file_error = $files['error'];
        $file_name = $files['name'][$position];

        switch ($recurso) {
            case '1':
                $file_destination = '../recursos/documentos/' . $file_name;
                break;
            case '2':
                $file_destination = '../recursos/videos/' . $file_name;
                break;
            case '3':
                $file_destination = '../recursos/imagenes/' . $file_name;
                break;
            case '4':
                $file_destination = '../recursos/presentaciones/' . $file_name;
                break;
            case '5':
                $file_destination = '../recursos/juegos/' . $file_name;
                break;
            case '6':
                $file_destination = '../recursos/manuales/' . $file_name;
                break;
            case '7':
                $file_destination = '../recursos/audios/' . $file_name;
                break;
            case '9':
                $file_destination = '../recursos/radio/' . $file_name;
                break;
        }

        $json = $api->subirArchivo($file_name, $recurso, $file_tmp, $file_destination);

    }

} else {
    $json = "Error al subir los archivos";
}

echo json_encode($json);
