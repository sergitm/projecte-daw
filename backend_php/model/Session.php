<?php

class Session implements JsonSerializable {
    
    // PROPIETATS
    private $id;
    private $session_id;
    private $email;
    private $nom;
    private $cognoms;
    private $username;
    private $admin;
    private $access_token;
    private $token_type;
    private $refresh_token;
    private $expires_in;
    private $expires_at;

    // CONSTRUCTOR
    public function __construct($session_id, $email, $nom, $cognoms, $username, $admin = 0, $token, $id = null)
    {
        $this->session_id = $session_id;
        $this->email = $email;
        $this->nom = $nom;
        $this->cognoms = $cognoms;
        $this->username = $username;
        $this->admin = $admin;
        $this->access_token = $token['access_token'];
        $this->token_type = $token['token_type'];
        $this->refresh_token = $token['refresh_token'] ?? null;
        $this->expires_in = $token['expires_in'];
        $this->expires_at = $token['expires_at'];
        $this->id = $id;
    }

    // GETTERS
    public function getId(){
        return $this->id;
    }
    public function getSessionId(){
        return $this->session_id;
    }
    public function getEmail(){
        return $this->email;
    }
    public function getNom(){
        return $this->nom;
    }
    public function getCognoms(){
        return $this->cognoms;
    }
    public function getUsername(){
        return $this->username;
    }
    public function getAdmin(){
        return $this->admin;
    }
    public function getToken(){
        return [
            'access_token' => $this->access_token,
            'token_type' => $this->token_type,
            'refresh_token' => $this->refresh_token,
            'expires_in' => $this->expires_in,
            'expires_at' => $this->expires_at
        ];
    }

    // SETTERS
    public function setId($id){
        $this->id = $id;
    }
    public function setSessionId($session_id){
        $this->session_id = $session_id;
    }
    public function setEmail($email){
        $this->email = $email;
    }
    public function setNom($nom){
        $this->nom = $nom;
    }
    public function setCognoms($cognoms){
        $this->cognoms = $cognoms;
    }
    public function setUsername($username){
        $this->username = $username;
    }
    public function setAdmin($admin){
        $this->admin = $admin;
    }
    public function setToken($token){
        $this->access_token = $token['access_token'];
        $this->token_type = $token['token_type'];
        $this->refresh_token = $token['refresh_token'];
        $this->expires_in = $token['expires_in'];
        $this->expires_at = $token['expires_at'];
    }

    // SERIALIZE
    public function jsonSerialize()
    {
        return [
            'id' => $this->getId(),
            'session_id' => $this->getSessionId(),
            'email' => $this->getEmail(),
            'nom' => $this->getNom(),
            'cognoms' => $this->getCognoms(),
            'username' => $this->getUsername(),
            'admin' => $this->getAdmin(),
            'token' => $this->getToken()
        ];
    }

    // MÉTODES
    public function save(){
        $query = "INSERT INTO sessions (id, session_id, email, nom, cognoms, username, admin, access_token, token_type, refresh_token, expires_in, expires_at)
                    VALUES (:id, :session_id, :email, :nom, :cognoms, :username, :admin, :access_token, :token_type, :refresh_token, :expires_in, :expires_at)";

        $params = array(
            ':id' => $this->getId(),
            ':session_id' => $this->getSessionId(),
            ':email' => $this->getEmail(),
            ':nom' => $this->getNom(),
            ':cognoms' => $this->getCognoms(),
            ':username' => $this->getUsername(),
            ':admin' => $this->getAdmin(),
            ':access_token' => $this->getToken()['access_token'],
            ':token_type' => $this->getToken()['token_type'],
            ':refresh_token' => $this->getToken()['refresh_token'],
            ':expires_in' => $this->getToken()['expires_in'],
            ':expires_at' => $this->getToken()['expires_at'],
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

    public function destroy(){
        $query = "DELETE FROM sessions WHERE id = :id";
        $params = array(':id' => $this->getId());

        Connection::connect();
        $stmt = Connection::execute($query, $params);
        Connection::close();

        return $stmt;
    }

    public static function Get($param){
        
        foreach ($param as $key => $value) {
            if ($key === 'email') {
                $query = "SELECT * FROM sessions WHERE email = :valor";
                $params = array(':valor' => $value);
            } elseif ($key === 'session_id') {
                $query = "SELECT * FROM sessions WHERE session_id = :valor";
                $params = array(':valor' => $value);
            }
        }
        
        Connection::connect();
        $stmt = Connection::execute($query, $params);
        $result = $stmt->fetchAll();
        Connection::close();
        
        $num = count($result);

        if ($num > 0) {
            foreach ($result as $row) {
                extract($row);
                $token = [
                    'access_token' => $row['access_token'],
                    'token_type' => $row['token_type'],
                    'refresh_token' => $row['refresh_token'],
                    'expires_in' => $row['expires_in'],
                    'expires_at' => $row['expires_at']
                ];
                $session = new Session($row['session_id'], $row['email'], $row['nom'], $row['cognoms'], $row['username'], $row['admin'], $token, $row['id']);

                return $session;
            }
        } else {
            return null;
        }
    }
}

?>