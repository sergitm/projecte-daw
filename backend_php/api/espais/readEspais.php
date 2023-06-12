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
if (!empty($post) && !empty($post->accio) && $post->accio == 'readEspais') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        if ($post->espais === 'all') {
            try {
                $llistaEspais = LlistaEspais::getAll();
                $response = array(
                    "success" => true,
                    "data" => $llistaEspais,
                    "message" => "Totes els espais retornats.",
                );
            } catch (\Throwable $th) {
                $response = array(
                    "success" => false,
                    "data" => null,
                    "message" => "Error al retornar els espais."
                );
            }
        } else {
            try {
                $llistaEspais = LlistaEspais::getEspais($post->espais, $post->pagina);
                $response = array(
                    "success" => true,
                    "data" => $llistaEspais,
                    "message" => "Resultat retornat satisfactòriament.",
                );
            } catch (\Throwable $th) {
                $response = array(
                    "success" => false,
                    "data" => null,
                    "message" => "Error al retornar les persones."
                );
            }
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