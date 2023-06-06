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

if (!empty($post) && !empty($post->accio) && $post->accio == 'logout') {
    $session = Session::Get(['session_id' => $post->session_id]);
    $success = false;
    if ($session != null) {
        try {
            $session->destroy();
            session_regenerate_id();
            session_unset();
            session_destroy();
            $success = true;
            $response = array(
                "success" => true,
                "message" => 'Deslogat'
            );
        } catch (\Throwable $th) {
            $success = false;
            $response = array(
                "success" => false,
                "message" => "Hi ha hagut un error amb la base de dades."
            );
        }
    } else {
        $response = array(
            "success" => false,
            "message" => "No estàs logat."
        );
    }
}

echo json_encode($response);

?>