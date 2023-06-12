<?php

// imports
require_once "../../config/database.php";
require_once "../../model/Session.php";
require_once "../../model/LlistaDispositius.php";
require_once "../../model/Dispositiu.php";

// headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: multipart/form-data');
header('Accept: application/json');


//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));
if (!empty($post) && !empty($post->accio) && $post->accio == 'createDispositiu') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $resultat = LlistaDispositius::createDispositiu($post->dispositiu);
            if ($resultat) {
                $response = array(
                    "success" => true,
                    "data" => null,
                    "message" => "Dispositiu creat correctament.",
                );
            } else {
                $response = array(
                    "success" => false,
                    "data" => null,
                    "message" => "Hi ha hagut un problema al crear el dispositiu.",
                );
            }
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al crear l'espai."
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