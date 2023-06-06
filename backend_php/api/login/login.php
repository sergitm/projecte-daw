<?php

// imports
require_once "../../config/database.php";
require_once "../../model/Session.php";

//headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: application/json');

session_start();

//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));

if (!empty($post) && !empty($post->accio) && $post->accio == 'logged') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        $response = array(
            "logged" => true,
            "user" => $session
        );
    } else {
        $response = array(
            "logged" => false,
            "user" => null
        );
    }
}

echo json_encode($response);

?>