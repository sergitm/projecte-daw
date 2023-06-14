<?php

class LlistaDispositius {

    public static function getAll(){
        $llistaDispositius = array();

        $query = "SELECT * FROM dispositius;";

        Connection::connect();
        $stmt = Connection::execute($query);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $dispositiu = new Dispositiu($row['nom'], $row['tipus'], $row['estat'], $row['id']);
                array_push($llistaDispositius, $dispositiu);
            }
        }

        return $llistaDispositius;
    }

    public static function buscarDispositius($criteri, $pagina, $qtDispositius){
        $primer = ($pagina > 1) ? ($pagina - 1) * $qtDispositius : 0;
        $llistaDispositius = array();

        $query = "SELECT * FROM dispositius WHERE nom LIKE :criteri OR tipus LIKE :criteri OR estat LIKE :criteri LIMIT :primer, :num;";

        
        Connection::connect();
        $stmt = Connection::prepare($query);

        $params = array(
            ":criteri" => "%$criteri%",
        );
        Connection::bind_str_params($stmt, $params);

        $params = array(
            ':primer' => $primer,
            ':num' => $qtDispositius
        );
        Connection::bind_int_params($stmt, $params);
        $stmt = Connection::rawExecute($stmt);
        Connection::close();

        $num = $stmt->rowCount();
        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $dispositiu = new Dispositiu($row['nom'], $row['tipus'], $row['estat'], $row['id']);
                array_push($llistaDispositius, $dispositiu);
            }
        }

        return $llistaDispositius;
    }

    public static function numPagines($numPerPagina, $criteri){
        
        if ($criteri != '' && $criteri != null) {
            $query = "SELECT COUNT(*) FROM dispositius WHERE nom LIKE :criteri OR tipus LIKE :criteri OR estat LIKE :criteri;";
            $params = array(
                ":criteri" => "%$criteri%",
            );

            Connection::connect();
            $stmt = Connection::execute($query, $params);
            
        } else {
            $params = array();
            $query = "SELECT COUNT(*) FROM dispositius;";
            
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

    public static function getDispositius($dispositius, $pagina){
        $primer = ($pagina > 1) ? ($pagina - 1) * $dispositius : 0;
        $llistaDispositius = array();

        $query = "SELECT * FROM dispositius LIMIT :primer, :num;";

        $params = array(
            ':primer' => $primer,
            ':num' => $dispositius
        );

        Connection::connect();
        $stmt = Connection::execute_int_params($query, $params);
        Connection::close();

        $num = $stmt->rowCount();

        if ($num > 0) {
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                extract($row);

                $dispositiu = new Dispositiu($row['nom'], $row['tipus'], $row['estat'], $row['id']);
                array_push($llistaDispositius, $dispositiu);
            }
        }

        return $llistaDispositius;
    }

    public static function createDispositiu($dispositiu){
        $dispositiu = new Dispositiu($dispositiu->nom, $dispositiu->tipus, $dispositiu->estat);

        return $dispositiu->save();
    }

    public static function getSingle($id){
        $query = "SELECT * FROM dispositius WHERE id = :id;";
        $params = array(
            ":id" => $id,
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row) {
            extract($row);
            $dispositiu = new Dispositiu($row['nom'], $row['tipus'], $row['estat'], $row['id']);
            return $dispositiu;
        } else {
            return false;
        }
    }

    public static function updateDispositiu($dispositiu){
        $dispositiuOG = self::getSingle($dispositiu->id);

        $nom = $dispositiu->nom ?? $dispositiuOG->getNom();
        $tipus = $dispositiu->tipus ?? $dispositiuOG->getTipus();
        $estat = $dispositiu->estat ?? $dispositiuOG->getEstat();

        $newDispositiu = new Dispositiu($nom, $tipus, $estat, $dispositiu->id);

        return $newDispositiu->update();
    }

    public static function deleteDispositiu($dispositiu){
        $dispositiuDel = new Dispositiu($dispositiu->nom, $dispositiu->tipus,$dispositiu->estat, $dispositiu->id);
        if (Dispositiu::exists($dispositiuDel->getId())) {
            return $dispositiuDel->delete();
        }
    }

    public static function addPersonaDispositiu($id_dispositiu, $id_persona){
        $query = "INSERT INTO persona_dispositiu (id, id_persona, id_dispositiu) 
                    VALUES (null, :id_persona, :id_dispositiu);";

        $params = array(
            ':id_persona' => $id_persona,
            ':id_dispositiu' => $id_dispositiu,
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

    public static function getPersonesDispositiu($id_dispositiu){
        $llistaUsuaris = array();
        $query = "SELECT * FROM persones p 
                    INNER JOIN persona_dispositiu pd ON p.id = pd.id_persona 
                    INNER JOIN dispositius d ON d.id = pd.id_dispositiu 
                    WHERE d.id = :id_dispositiu;";

        $params = array(
            ':id_dispositiu' => $id_dispositiu
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

    public static function getEspaisDispositiu($id_dispositiu){
        $llistaEspais = array();
        $query = "SELECT e.id, e.nom FROM espais e 
                    INNER JOIN espai_dispositiu ed ON e.id = ed.id_espai 
                    INNER JOIN dispositius d ON d.id = ed.id_dispositiu 
                    WHERE d.id = :id_dispositiu;";

        $params = array(
            ':id_dispositiu' => $id_dispositiu
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
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

    
    public static function deletePersonaDispositiu($persona_id, $id_dispositiu){
        
        $query = "DELETE FROM persona_dispositiu WHERE id_dispositiu = :id_dispositiu AND id_persona = :id_persona;";
        $params = array(
            ':id_dispositiu' => $id_dispositiu,
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