<?php

include 'lib.php';

$api = new gestionEducativa();

if (isset($_POST['user_rol'])) {
    $json = $api->getUserRol();
}

if (isset($_POST)) {
    if (isset($_POST['loginSubmit'])) {

        $mailuid = $_POST['mailuid'];
        $pass = $_POST['passwd'] . $addPaswd;

        if (empty($mailuid) || empty($pass)) {
            header("Location: ../iniciarSesion.html?error=emptyFields");
            exit;
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
    }
} else {

    header("Location: ../iniciarSesion.html");
    exit;

}

echo json_encode($json);
