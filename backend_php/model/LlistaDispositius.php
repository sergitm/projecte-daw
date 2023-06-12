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
}

?>