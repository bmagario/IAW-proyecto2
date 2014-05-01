<?php

session_start();
include_once './medoodb.php';
$user_id = $_SESSION['userid'];
$user_pronostico = $_SESSION['id_pronostico'];
if(filter_input(INPUT_POST, 'Case') === "get"){
    $input_gol = filter_input(INPUT_POST, 'id_gol');
    $gol = $_SESSION['goles'][$input_gol];
    //$gol =5;
    echo $gol;
}
else{
    if(filter_input(INPUT_POST, 'Case') === "set"){
        $input_gol = filter_input(INPUT_POST, 'id_gol');
        $input_value = filter_input(INPUT_POST, 'value');
        DB::getInstance()->setItemGol($user_id,$user_pronostico,$input_gol,$input_value);
        $_SESSION['goles'][$input_gol] = $input_value;
        echo "input guardado";
    }
    else{
    if(filter_input(INPUT_POST, 'Case') === "cleanAll"){
        DB::getInstance()->setCleanItems($user_id,$user_pronostico);
        $goles = $_SESSION['goles'];
        unset($_SESSION['goles']);
        //$info_goles = DB::getInstance()->getItemGoles($user_id,$user_pronostico);
        //$_SESSION['goles'] = $info_goles;
        echo "clean all satisfactorio";
    }
}
}

        
 ?>

