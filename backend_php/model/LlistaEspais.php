<?php

class LlistaEspais {

    public static function getAll(){
        $llistaUsuaris = array();

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

        return $llistaUsuaris;
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
}

?>