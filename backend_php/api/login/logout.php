<?php

//headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: application/json');

session_start();
session_regenerate_id();
session_unset();
session_destroy();

header("Location: http://localhost:4200");

?>