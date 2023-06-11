<?php

// imports
require_once "../../config/database.php";
require_once "../../model/Session.php";

//headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: application/json');

//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));

if (!empty($post) && !empty($post->accio) && $post->accio == 'getClasses') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $classes = json_decode(file_get_contents("../../config/classes.json"), true);
            $response = array(
                "success" => true,
                "data" => $classes,
                "message" => "Lectura realitzada correctament.",
            );
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al realitzar la lectura."
            );
        }
    } else {
        $response = array(
            "success" => false,
            "data" => null,
            "message" => "No estás loguejat."
        );
    }
}

echo json_encode($response);

?>