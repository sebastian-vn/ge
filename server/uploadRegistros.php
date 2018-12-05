<?php

if(isset($_POST['asis']) && isset($_POST['ef'])){
  $asistencias = $_POST['asis'];
  $evidenciasFot = $_POST['ef'];

  print_r($_POST['asis']);
  echo '<br>';
  print_r($_POST['ef']);
}