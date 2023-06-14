<?php

class Usuari implements JsonSerializable {

    // PROPIETATS
    private $id;
    private $nom_cognoms;
    private $usuari;
    private $etapa;
    private $curs;
    private $grup;
    private $categoria;

    // CONSTRUCTOR
    public function __construct($nom_cognoms, $usuari, $etapa, $curs, $grup, $id = null)
    {
        $this->nom_cognoms = $nom_cognoms;
        $this->usuari = $usuari;
        $this->etapa = $etapa;
        $this->curs = $curs;
        $this->grup = $grup;
        $this->categoria = (strpos($this->usuari, '.')) ? 'alumne' : 'professor';
        $this->id = $id;
    }

     // GETTERS
     public function getId(){
        return $this->id;
    }
    public function getNomCognoms(){
        return $this->nom_cognoms;
    }
    public function getUsuari(){
        return $this->usuari;
    }
    public function getEtapa(){
        return $this->etapa;
    }
    public function getCurs(){
        return $this->curs;
    }
    public function getGrup(){
        return $this->grup;
    }
    public function getCategoria(){
        return $this->categoria;
    }

     // SETTERS
     public function setId($id){
        $this->id = $id;
    }
    public function setNomCognoms($nom_cognoms){
        $this->nom_cognoms = $nom_cognoms;
    }
    public function setUsuari($usuari){
        $this->usuari = $usuari;
    }
    public function setEtapa($etapa){
        $this->etapa = $etapa;
    }
    public function setCurs($curs){
        $this->curs = $curs;
    }
    public function setGrup($grup){
        $this->grup = $grup;
    }

    // SERIALIZE
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'nom_cognoms' => $this->getNomCognoms(),
            'usuari' => $this->getUsuari(),
            'etapa' => $this->getEtapa(),
            'curs' => $this->getCurs(),
            'grup' => $this->getGrup(),
            'categoria' => $this->getCategoria(),
        ];
    }

    // MÉTODES
    public function save(){
        $query = "INSERT INTO persones (id, nom_cognoms, usuari, etapa, curs, grup, categoria)
                    VALUES (:id, :nom_cognoms, :usuari, :etapa, :curs, :grup, :categoria)";

        $params = array(
            ':id' => $this->getId(),
            ':nom_cognoms' => $this->getNomCognoms(),
            ':usuari' => $this->getUsuari(),
            ':etapa' => $this->getEtapa(),
            ':curs' => $this->getCurs(),
            ':grup' => $this->getGrup(),
            ':categoria' => $this->getCategoria(),
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

    public function update(){
        $query = "UPDATE persones SET nom_cognoms = :nom_cognoms, etapa = :etapa, curs = :curs, grup = :grup, categoria = :categoria WHERE usuari = :usuari";

            $params = array(':nom_cognoms' => $this->getNomCognoms(), 
                            ':etapa' => $this->getEtapa(), 
                            ':curs' => $this->getCurs(),
                            ':grup' => $this->getGrup(), 
                            ':categoria' => $this->getCategoria(),
                            ':usuari' => $this->getUsuari(),
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

    public function delete(){
        $query = "DELETE FROM persones WHERE id = :id;";
        $params = array(
            ':id' => $this->getId()
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

    public static function exists($usuari){
        $query = "SELECT * FROM persones WHERE usuari = :usuari";
        $params = array(
            ':usuari' => $usuari
        );

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        $result = $stmt->fetchAll();
        Connection::close();
        
        $num = count($result);

        if ($num > 0) {
            return true;
        } else {
            return false;
        }
    }
    
}

?>