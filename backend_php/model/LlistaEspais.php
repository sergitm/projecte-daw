<?php

class LlistaEspais {

    public static function getAll(){
        $llistaEspais = array();

        $query = "SELECT * FROM espais;";

        Connection::connect();
        $stmt = Connection::execute($query);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $espai = new Espai($row['nom'], $row['id']);
                array_push($llistaEspais, $espai);
            }
        }

        return $llistaEspais;
    }

    public static function buscarEspais($criteri, $pagina, $qtEspais){
        $primer = ($pagina > 1) ? ($pagina - 1) * $qtEspais : 0;
        $llistaEspais = array();

        $query = "SELECT * FROM espais WHERE nom LIKE :criteri LIMIT :primer, :num;";

        
        Connection::connect();
        $stmt = Connection::prepare($query);

        $params = array(
            ":criteri" => "%$criteri%",
        );
        Connection::bind_str_params($stmt, $params);

        $params = array(
            ':primer' => $primer,
            ':num' => $qtEspais
        );
        Connection::bind_int_params($stmt, $params);
        $stmt = Connection::rawExecute($stmt);
        Connection::close();

        $num = $stmt->rowCount();
        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $espai = new Espai($row['nom'], $row['id']);
                array_push($llistaEspais, $espai);
            }
        }

        return $llistaEspais;
    }

    public static function numPagines($numPerPagina, $criteri){
        
        if ($criteri != '' && $criteri != null) {
            $query = "SELECT COUNT(*) FROM espais WHERE nom LIKE :criteri;";
            $params = array(
                ":criteri" => "%$criteri%",
            );

            Connection::connect();
            $stmt = Connection::execute($query, $params);
            
        } else {
            $params = array();
            $query = "SELECT COUNT(*) FROM espais;";
            
            Connection::connect();
            $stmt = Connection::execute($query, $params);
            
        }
        
        Connection::close();
        
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            $count = intval($row['COUNT(*)']);
            $numPagines = ($count % $numPerPagina > 0) ? floor($count / $numPerPagina + 1) : floor($count / $numPerPagina);
            return $numPagines;
        } else {
            return false;
        }
    }

    public static function getEspais($espais, $pagina){
        $primer = ($pagina > 1) ? ($pagina - 1) * $espais : 0;
        $llistaEspais = array();

        $query = "SELECT * FROM espais LIMIT :primer, :num;";

        $params = array(
            ':primer' => $primer,
            ':num' => $espais
        );

        Connection::connect();
        $stmt = Connection::execute_int_params($query, $params);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $espai = new Espai($row['nom'], $row['id']);
                array_push($llistaEspais, $espai);
            }
        }

        return $llistaEspais;
    }

    public static function createEspai($espai){
        $espai = new Espai($espai->nom);
        return $espai->save();
    }

    public static function getSingle($id){
        $query = "SELECT * FROM espais WHERE id = :id;";
        $params = array(
            ":id" => $id,
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            extract($row);
            $espai = new Espai($row['nom'], $row['id']);
            return $espai;
        } else {
            return false;
        }
    }

    public static function updateEspai($espai){
        $espaiOG = self::getSingle($espai->id);

        $nom = $espai->nom ?? $espaiOG->getNom();

        $newespai = new Espai($nom, $espai->id);

        return $newespai->update();
    }

    public static function deleteEspai($espai){
        $espaiDel = new Espai($espai->nom, $espai->id);
        if (Espai::existsId($espaiDel->getId())) {
            return $espaiDel->delete();
        }
    }

    public static function addPersonaEspai($id_espai, $id_persona){
        $query = "INSERT INTO espai_persona (id, id_espai, id_persona) 
                    VALUES (null, :id_espai, :id_persona);";

        $params = array(
            ':id_espai' => $id_espai,
            ':id_persona' => $id_persona
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        if ($stmt) {
            return true;
        } else {
            return false;
        }
    }

    public static function addDispositiuEspai($id_espai, $id_dispositiu){
        
        $query = "INSERT INTO espai_dispositiu (id, id_espai, id_dispositiu) 
                    VALUES (null, :id_espai, :id_dispositiu);";

        $params = array(
            ':id_espai' => $id_espai,
            ':id_dispositiu' => $id_dispositiu
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        if ($stmt) {
            return true;
        } else {
            return false;
        }
    }

    public static function getPersonesEspai($espai_id){
        $llistaUsuaris = array();
        $query = "SELECT * FROM persones p 
                    INNER JOIN espai_persona ep ON p.id = ep.id_persona 
                    INNER JOIN espais e ON e.id = ep.id_espai 
                    WHERE e.id = :id_espai;";

        $params = array(
            ':id_espai' => $espai_id
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $usuari = new Usuari($row['nom_cognoms'], $row['usuari'], $row['etapa'], $row['curs'], $row['grup'], $row['id_persona']);
                array_push($llistaUsuaris, $usuari);
            }
        }
        return $llistaUsuaris;
    }

    public static function getDispositiusEspai($espai_id){
        $llistaEspais = array();
        $query = "SELECT * FROM dispositius d 
                    INNER JOIN espai_dispositiu ed ON d.id = ed.id_dispositiu 
                    INNER JOIN espais e ON e.id = ed.id_espai 
                    WHERE e.id = :id_espai;";

        $params = array(
            ':id_espai' => $espai_id
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $espai = new Dispositiu($row['nom'], $row['tipus'], $row['estat'], $row['id_dispositiu']);
                array_push($llistaEspais, $espai);
            }
        }
        return $llistaEspais;
    }

    
    public static function deleteEspaiPersona($persona_id, $espai_id){
        
        $query = "DELETE FROM espai_persona WHERE id_espai = :id_espai AND id_persona = :id_persona;";
        $params = array(
            ':id_espai' => $espai_id,
            ':id_persona' => $persona_id
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();
        
        if ($stmt) {
            return true;
        } else {
            return false;
        }
    }

    public static function deleteDispositiuEspai($espai_id, $dispositiu_id){

        $query = "DELETE FROM espai_dispositiu WHERE id_dispositiu = :id_dispositiu AND id_espai = :id_espai;";
        $params = array(
            ':id_dispositiu' => $dispositiu_id,
            ':id_espai' => $espai_id
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();
        
        if ($stmt) {
            return true;
        } else {
            return false;
        }
    }
}

?>