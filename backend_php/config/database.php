<?php
    class Database {
        // DB Params
        private $host = 'localhost';
        private $db_name = 'projecte_daw';
        private $username = 'root';
        private $pwd = '';
        private $conn;

        // DB Connect
        public function connect(){
            $this->conn = null;

            try {
                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                    $this->username, $this->pwd);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $e){
                echo 'Connection Error: ' . $e->getMessage();
            }

            return $this->conn;
        }
    }

    class Connection {
        private static $conn;

        // Constructor 
        public static function connect() {
            // Connect only if not connected
            if(!isset(self::$conn)){
                $db = new Database();
                self::$conn = $db->connect();
            }
        }

        public static function prepare($query){
            // Prepare
            $stmt = self::$conn->prepare($query);
            return $stmt;
        }

        public static function bind_int_params($stmt, $params = array()){
            foreach ($params as $key => $value) {
                $stmt->bindParam($key, $params[$key], PDO::PARAM_INT);
            }
        }

        public static function bind_str_params($stmt, $params = array()){
            foreach ($params as $key => $value) {
                $stmt->bindParam($key, $value);
            }
        }

        public static function rawExecute($stmt){
            // Execute query
            if($stmt->execute()){
                return $stmt;
            } else {
                return false;
            }
        }

        public static function execute($query, $params = array()){
            // Prepare
            $stmt = self::$conn->prepare($query);

            // Execute query
            if($stmt->execute($params)){

                return $stmt;

            } else {

                return false;
            }
        }

        public static function execute_int_params($query, $params){
            // Prepare
            $stmt = self::$conn->prepare($query);

            foreach ($params as $key => $value) {
                $stmt->bindParam($key, $params[$key], PDO::PARAM_INT);
            }

            // Execute query
            if($stmt->execute()){
                return $stmt;
            } else {
                return false;
            }
        }
        
        public static function close(){
            self::$conn = null;
        }
    }


?>