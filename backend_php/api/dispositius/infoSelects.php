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

if (!empty($post) && !empty($post->accio) && $post->accio == 'infoEstats') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $estats = json_decode(file_get_contents("../../config/estats.json"), true);
            $response = array(
                "success" => true,
                "data" => $estats,
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
} elseif (!empty($post) && !empty($post->accio) && $post->accio == 'infoTipus') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $tipus = json_decode(file_get_contents("../../config/tipus.json"), true);
            $response = array(
                "success" => true,
                "data" => $tipus,
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