<?php

class Dispositiu implements JsonSerializable {

    // PROPIETATS
    private $id;
    private $nom;
    private $tipus;
    private $estat;

    // CONSTRUCTOR
    public function __construct($nom, $tipus, $estat, $id = null)
    {
        $this->nom = $nom;
        $this->tipus = $tipus;
        $this->estat = $estat;
        $this->id = $id;
    }

     // GETTERS
     public function getId(){
        return $this->id;
    }
    public function getNom(){
        return $this->nom;
    }
    public function getTipus(){
        return $this->tipus;
    }
    public function getEstat(){
        return $this->estat;
    }

     // SETTERS
     public function setId($id){
        $this->id = $id;
    }
    public function setNomCognoms($nom){
        $this->nom = $nom;
    }
    public function settipus($tipus){
        $this->tipus = $tipus;
    }
    public function setestat($estat){
        $this->estat = $estat;
    }

    // SERIALIZE
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'nom' => $this->getNom(),
            'tipus' => $this->getTipus(),
            'estat' => $this->getEstat(),
        ];
    }

    // MÉTODES
    public function save(){
        $query = "INSERT INTO dispositius (id, nom, tipus, estat)
                    VALUES (:id, :nom, :tipus, :estat)";

        $params = array(
            ':id' => $this->getId(),
            ':nom' => $this->getNom(),
            ':tipus' => $this->getTipus(),
            ':estat' => $this->getEstat(),
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
        $query = "UPDATE dispositius SET nom = :nom, estat = :estat, tipus = :tipus WHERE id = :id";

            $params = array(':nom' => $this->getNom(), 
                            ':estat' => $this->getEstat(),
                            ':tipus' => $this->getTipus(),
                            ':id' => $this->getId(),
            );

            Connection::connect();
            $stmt = Connection::execute($query, $params);
            Connection::close();
            
            if ($stmt) {
                return TRUE;
            } else {
                return FALSE;
            }
    }

    public static function exists($id){
        $query = "SELECT * FROM dispositius WHERE id = :id";
        $params = array(
            ':id' => $id
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