<?php

//headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: application/json');

session_start();

//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));

if (!empty($post) && !empty($post->accio) && $post->accio == 'logged') {
    // if (isset($_SESSION['usuari'])) {
    //     $response = array(
    //         "logged" => true,
    //         "user" => $_SESSION['usuari']
    //     );
    // } else {
    //     $response = array(
    //         "logged" => false
    //     );
    // }
    
}

echo json_encode($response);

?>