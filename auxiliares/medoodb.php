<?php

include_once 'medoo.php';

class DB {
      
    private $database;
    
    // singleton instance 
    private static $instance; 
  
    // getInstance method 
    public static function getInstance() { 
        if(!self::$instance) { 
            self::$instance = new self(); 
        } 
        return self::$instance; 
    } 

    function __construct() {
        $this->database = new medoo([
            'database_type' => 'mysql',
            'database_name' => 'fixture-interactivo',
            'server' => 'localhost',
            'username' => 'root',
            'password' => 'iaw',

        ]);
    }

    function eliminarContacto($mail) {
        $this->database->delete("contacto", [ "mail" => $mail]);
    }

    function agregarContacto($mail, $apellido, $nombre, $direccion, $telefono) {
        $this->database->insert("contacto", [
            "mail" => $mail,
            "apellido" => $apellido,
            "nombre" => $nombre,
            "direccion" => $direccion,
            "telefono" => $telefono,
        ]);
    }

    function getListaContactos($columna, $orden) {
        return $this->database->select("contacto", "*", [
            "ORDER" => $columna." ".strtoupper($orden)
        ]);
    }
    
    function getGrupos() {
        return $this->database->select("grupos", "*");
    }

    function getParticipantes() {
        return $this->database->select("participantes", "*");
    }
    
    function getUsuario($usuario) {
        return $this->database->get("usuario", "*", ["usuario" => $usuario]);
    }
    
    function getItemGol($user_id,$user_pronostico,$input_gol){
        return $this->database->get("goles", $input_gol, 
                                    ["AND" => 
                                          ["id_user" => $user_id ,
                                           "id_pronostico" => $user_pronostico]]);
    }
    function getItemGoles($user_id,$user_pronostico){
        return $this->database->get("goles", "*", 
                                    ["AND" => 
                                          ["id_user" => $user_id ,
                                           "id_pronostico" => $user_pronostico]]);
    }
    function setItemGol($user_id,$user_pronostico,$input_gol,$input_value){
        $this->database->update("goles", 
            [
                $input_gol => $input_value,
            ],
            ["AND" =>[
                "id_user" => $user_id,
                "id_pronostico" => $user_pronostico,
                ]
            ]);
    }
    
    function setCleanItems($user_id,$user_pronostico){
        $this->database->delete("goles", ["AND" =>[
                "id_user" => $user_id,
                "id_pronostico" => $user_pronostico,
                ]
            ]);
        
        $this->database->insert("goles",["id_user"=>$user_id,"id_pronostico"=>$user_pronostico]);
    }
}



