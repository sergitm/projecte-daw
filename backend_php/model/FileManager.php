<?php

class FileManager {

    public static function JsonConvert($fitxer) {
        
        $dades = file_get_contents($fitxer);
        $rows = preg_split("/\r\n|\n|\r/", $dades);
        $dades_alumnes = array();
        foreach ($rows as $fila) {
            $camps = preg_split("/\t+/", $fila);
            if ($camps[0] === 'Usuari') {
                continue;
            } else {
                array_push($dades_alumnes, array(
                    'usuari' => $camps[0],
                    'nomCognoms' => $camps[1],
                    'etapa' => $camps[2],
                    'curs' => $camps[3],
                    'grup' => $camps[4] ?? '',
                ));
            }            
        }
        $dadesJson = json_encode($dades_alumnes);
        file_put_contents('../../config/alumnes/dades_alumnes.json', $dadesJson);
    }

    public static function addAdmin($newAdmin){
        $authJson = json_decode(file_get_contents("../../config/auth.json"), true);
        array_push($authJson['admins'], $newAdmin);
        file_put_contents("../../config/auth.json", json_encode($authJson));
    }

    public static function addUser($newUser){
        $authJson = json_decode(file_get_contents("../../config/auth.json"), true);
        array_push($authJson['users'], $newUser);
        file_put_contents("../../config/auth.json", json_encode($authJson));
    }

    public static function deleteUser($user){
        $authJson = json_decode(file_get_contents("../../config/auth.json"), true);
        for ($i=0; $i < count($authJson['users']); $i++) { 
            if ($authJson['users'][$i] === $user) {
                array_splice($authJson['users'], $i, 1);
            }
        }
        file_put_contents("../../config/auth.json", json_encode($authJson));
    }

}

?>