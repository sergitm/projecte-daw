<?php

// imports
require_once "../../config/database.php";
require_once "../../model/Session.php";
require_once "../../model/LlistaEspais.php";
require_once "../../model/Espai.php";

// headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: multipart/form-data');
header('Accept: application/json');


//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));
$response = null;

if (!empty($post) && !empty($post->accio) && $post->accio == 'getEspai') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            $espai = LlistaEspais::getSingle($post->espai_id);
            if ($espai) {
                $response = array(
                    "success" => true,
                    "data" => $espai,
                    "message" => "Espai retornat.",
                );
            } else {
                $response = array(
                    "success" => false,
                    "data" => null,
                    "message" => "No s'ha trobat cap espai.",
                );
            }
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al retornar els espais."
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