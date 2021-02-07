<?php

class ConnectionManager {

    public function connect() {
        $servername = 'localhost';
        $username = 'root';
        $password = '';
        $dbname = 'shopping_club_db';
        $port = '3306';
        
        // Create connection
        $conn = new PDO("mysql:host=$servername;dbname=$dbname;port=$port", $username, $password);     
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // if fail, exception will be thrown

        // Return connection object
        return $conn;
    }

}