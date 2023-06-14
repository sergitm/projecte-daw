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
$response = null;

if (!empty($post) && !empty($post->accio) && $post->accio == 'getDispositiu') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $dispositiu = LlistaDispositius::getSingle($post->dispositiu_id);
            if ($dispositiu) {
                $response = array(
                    "success" => true,
                    "data" => $dispositiu,
                    "message" => "Dispositiu retornat.",
                );
            } else {
                $response = array(
                    "success" => false,
                    "data" => null,
                    "message" => "No s'ha trobat cap dispositiu.",
                );
            }
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al retornar els dispositius."
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