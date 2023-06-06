<?php

// imports
require_once "../../model/FileManager.php";
require_once "../../config/database.php";
require_once "../../model/Session.php";

//headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: application/json');

//Obtenir dades que arriven per post
$post = json_decode(file_get_contents('php://input'));

if (!empty($post) && !empty($post->accio) && $post->accio == 'addAdmin') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            FileManager::addAdmin($post->newAdmin);
            $response = array(
                "success" => true,
                "data" => null,
                "message" => "Administrador afegit correctament.",
            );
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al afegir l'administrador."
            );
        }
    } else {
        $response = array(
            "success" => false,
            "data" => null,
            "message" => "No estás loguejat."
        );
    }
} elseif (!empty($post) && !empty($post->accio) && $post->accio == 'addUser') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            FileManager::addUser($post->newUser);
            $response = array(
                "success" => true,
                "data" => null,
                "message" => "Usuari afegit correctament.",
            );
        } catch (\Throwable $th) {
            $response = array(
                "success" => false,
                "data" => null,
                "message" => "Error al afegir l'usuari."
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