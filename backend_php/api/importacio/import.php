<?php
// imports
require_once "../../config/database.php";
require_once "../../model/Session.php";
require_once "../../model/FileManager.php";
require_once "../../model/LlistaUsuaris.php";
require_once "../../model/Usuari.php";

// headers
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, X-Requested-With');
header('Content-Type: multipart/form-data');
header('Accept: application/json');

// Obtenir dades que arriven per post
$post = (object) $_POST;
$fitxer = $_FILES['dades_alumnes'];
$uploadPath = '../../config/alumnes/';

if (!empty($post) && !empty($post->accio) && $post->accio == 'import') {
    $session = Session::Get(['session_id' => $post->session_id]);
    if ($session != null) {
        try {
            move_uploaded_file($fitxer['tmp_name'], $uploadPath . 'dades_alumnes.tsv');
            FileManager::JsonConvert($uploadPath . 'dades_alumnes.tsv');
            $success = true;
        } catch (\Throwable $th) {
            $success = false;
            $message = "Hi ha hagut un problema al pujar el fitxer.";
        }
        try {
            $dadesJson = json_decode(file_get_contents('../../config/alumnes/dades_alumnes.json'));
            LlistaUsuaris::crearUsuarisDelFitxer($dadesJson);
            $success = true;
        } catch (\Throwable $th) {
            $success = false;
            $message = "Hi ha hagut un problema al importar les dades.";
        }
    } else {
        die();
    }
}

if ($success) {
    $response = array(
        'success' => true,
        'message' => "Importació realitzada correctament."
    );
} else {
    $response = array(
        'success' => false,
        'message' => $message ?? "Petició incorrecta."
    );
}
echo json_encode($response);
?>