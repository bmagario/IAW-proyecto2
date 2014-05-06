<?php

session_start();
include_once './medoodb.php';
$user_id = $_SESSION['user']['userid'];
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
        $input = $input_value;
        if($input_value === ''){
            $input_value = -1;
        }
        DB::getInstance()->setItemGol($user_id,$user_pronostico,$input_gol,$input_value);
        $_SESSION['goles'][$input_gol] = $input;
        echo "input guardado";
    }
    else{
        if(filter_input(INPUT_POST, 'Case') === "cleanAll"){
            DB::getInstance()->setCleanItems($user_id,$user_pronostico);
            unset($_SESSION['goles']);
            echo "clean all satisfactorio";
        }//new
        else{
            if(filter_input(INPUT_POST, 'Case') === "cargarAll"){
                $array_goles = [];
                for($i=0;$i<8;$i++){
                    for($j=0;$j<6;$j++){
                       $game1 = 'p_1' . $i . $j . '101';
                       $array_goles[$game1] = mt_rand(0, 7);
                       $game2 = 'p_1' . $i . $j . '102';
                       $array_goles[$game2] = mt_rand(0, 7);
                    }
                }
                for($h=1;$h<=30;$h++){
                    $playoff = 'p_'.$h;
                    $array_goles[$playoff] = mt_rand(0, 7);
                }
                DB::getInstance()->setAllItems($user_id,$user_pronostico,$array_goles);
                
                echo json_encode($array_goles);
            }
        }        
    }
}

        
 ?>

