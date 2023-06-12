<?php

class Espai implements JsonSerializable {

    // PROPIETATS
    private $id;
    private $nom;

    // CONSTRUCTOR
    public function __construct($nom, $id = null)
    {
        $this->nom = $nom;
        $this->id = $id;
    }

     // GETTERS
     public function getId(){
        return $this->id;
    }
    public function getNom(){
        return $this->nom;
    }
    

     // SETTERS
     public function setId($id){
        $this->id = $id;
    }
    public function setNom($nom){
        $this->nom = $nom;
    }
    

    // SERIALIZE
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'nom' => $this->getNom()
        ];
    }

    // MÉTODES
    public function save(){
        $query = "INSERT INTO espais (id, nom)
                    VALUES (:id, :nom)";

        $params = array(
            ':id' => $this->getId(),
            ':nom' => $this->getNom()
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
        $query = "UPDATE espais SET nom = :nom WHERE id = :id";

            $params = array(':nom' => $this->getNom(),
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

    public static function exists($nom){
        $query = "SELECT * FROM espais WHERE nom = :nom";
        $params = array(
            ':nom' => $nom
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