<?php

//DEV
$database = "d4asqdqb9dlt9p";
$uid = "ntafkvnrqqlbig";
$pwd = "300113b0978731b5003f9916b2684ec44d7eafdeb2f3a36dca99bfcd115f33f1";
$host = "ec2-54-197-233-123.compute-1.amazonaws.com";

/*         //PRODUCCION
$database = "gestjjlg_gestion_educativa";
$uid = "gestjjlg_usr_gestion";
$pwd = "r!Hh7XNv22E(";
$host = "127.0.0.1";  */

//establecer la conexión
$con = new PDO("pgsql:host=$host;port=5432;dbname=$database;user=$uid;password=$pwd");
if (!$con) {
    die('error de conexión');
}

$arrayPasswd = [
    '1053807497' => password_hash('1053807497GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '1053816364' => password_hash('1053816364GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '30225533' => password_hash('30225533GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '1053778250' => password_hash('1053778250GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '1053766384' => password_hash('1053766384GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '30239536' => password_hash('30239536GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '1007006223' => password_hash('magnetic67GIkkU2Eeyw1@!8', PASSWORD_DEFAULT),
    '111111111' => password_hash('1234GIkkU2Eeyw1@!8', PASSWORD_DEFAULT)

];

foreach ($arrayPasswd as $key => $value) {
    $sql = "UPDATE personas SET passwd = '$value' WHERE cedula = '$key'";
    var_dump($sql);

    if ($con) {

        if ($con->query($sql)) {
            echo 'done';
        } else {
            echo 'not done';
            print_r($con->errorInfo());
        }
    }
    echo $key, ' - ', $value, '</br>';
}

/* echo json_encode ($arrayPasswd); */
