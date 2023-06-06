<?php

class LlistaUsuaris {

    public static function crearUsuarisDelFitxer($dades) {
        foreach ($dades as $usuari) {
            $persona = new Usuari($usuari->nomCognoms, $usuari->usuari, $usuari->etapa, $usuari->curs, $usuari->grup);
            if (Usuari::exists($persona->getUsuari())) {
                $persona->update();
            } else {
                $persona->save();
            }
        }
    }
}

?>