<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['user_rol'])) {
    $json = $api->getUserRol();
}

if (isset($_POST)) {

    $addPaswd = 'GIkkU2Eeyw1@!8';

    if (isset($_POST['loginSubmit']) || isset($_POST['loginGeoApp'])) {

        $mailuid = $_POST['mailuid'];
        $pass = $_POST['passwd'] . $addPaswd;

        $json = $api->logIn($mailuid, $pass);

        if (!$json['error']) {
            if ($json['error_type' == "wrgpswd"]) {
                $json['message'] = "Contraseña incorrecta, ingrese nuevamente.";
            }
        } else {

            if ($json['user']['rol'] != 3) {
                $zona = 'all';
            } else {
                $zona = $json['user']['zona'];
            }

            if (isset($_POST['loginSubmit'])) {
                header("Location: ../opciones.html?user=" . $json['user']['rol'] . "&id_zona=all");
                exit();
            } else {
                if (isset($_POST['loginGeoApp'])) {
                    header("Location: ../geoApp.html?user=" . $json['user']['rol'] . "&id_zona=" . $zona);
                    exit();
                }
            }
        }

    }

    if (isset($_POST['loginGuest'])) {
        $mailuid = "";
        $pass = "";

        $json = $api->logIn($mailuid, $pass);

        header("Location: ../opciones.html?user=4&id_zona=all");
        exit();
    }
} else {

    header("Location: ../iniciarSesion.html");
    exit;

}

echo json_encode($json);
