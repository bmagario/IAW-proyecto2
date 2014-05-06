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

    function getGrupos() {
        return $this->database->select("grupos", "*");
    }

    function insertUser($user_id,$username,$email,$profile_url,$profile_image_url){
        $this->database->insert("social_users",
        [
            "google_id"=>$user_id,
            "google_name"=>$username,
            "google_email"=>$email,
            "google_link"=>$profile_url,
            "google_picture_link"=>$profile_image_url
            //"created_date"=>now()
            ]);
        return $this->database->max("social_users", "id");
    }
    
    function getUsuario($google_id) {
        return $this->database->count("social_users","id",[
	"google_id" =>$google_id]);
    }
    
    function getItemGol($user_id,$user_pronostico,$input_gol){
        return $this->database->get("goles", $input_gol, 
                                    ["AND" => 
                                          ["id_user" => $user_id ,
                                           "id_pronostico" => $user_pronostico]]);
    }
    function getItemGoles($user_id,$user_pronostico){
        $valor = $this->database->count("goles","id_pronostico",[
	"id_user" =>$user_id]);
        if($valor === 0){
             $this->database->insert("goles",["id_user"=>$user_id,"id_pronostico"=>$user_pronostico]);
        }
        return $this->database->get("goles", "*", 
                                    ["AND" => 
                                          ["id_user" => $user_id ,
                                           "id_pronostico" => $user_pronostico]]);
       
        
    }
    function setItemGol($user_id,$user_pronostico,$input_gol,$input_value){
        $array = [
                    $input_gol => $input_value,
                ];
        $this->database->update("goles", 
            $array,
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
    
    //new
    function setAllItems($user_id,$user_pronostico,$values){
        $this->database->update("goles", 
            $values,
            ["AND" =>[
                "id_user" => $user_id,
                "id_pronostico" => $user_pronostico,
                ]
            ]);
    }
    
    function getParticipantes() {
        return $this->database->select("participantes", "*");
    }
    
    function cargarPronosticosIDBD($user_id){
        return $valor = $this->database->count("goles",
                                    ["id_user" =>$user_id]);
    }
    
    function getLastPronoDB($user_id){
        return $this->database->max("goles", "id_pronostico",
                                    ["id_user" =>$user_id]);
    }
    
    
    function getPlayoff() {
        return $this->database->select("playoffs", "*");
    }
}





    
    
    