<?php

function getGoles(){
    //$_SESSION['id_pronostico'] = 3;
    $user_id = isset($_SESSION['user']['userid']) ? $_SESSION['user']['userid'] : -1;
    $user_pronostico = isset($_SESSION['id_pronostico']) ? $_SESSION['id_pronostico'] : getLastPronoId($user_id);
    echo "id: ".$user_id."</br>";
    echo "pron: ".$user_pronostico."</br>";
    $info_goles = DB::getInstance()->getItemGoles($user_id,$user_pronostico);
    $_SESSION['goles'] = $info_goles; 
}

function buildGroups(){
    $my_array = [];
    if(!isset($_SESSION['grupos'])){
        $my_array = [];
        $my_array_grupo = [];
        $grupos = DB::getInstance()->getGrupos();
        for($y=0;$y<count($grupos);$y++){
            if((($y+1)%6) !== 0){
                $new_data = ['id_partido'=>$grupos[$y]['id_partido'],
                             'date' => $grupos[$y]['date'],
                             'place' => $grupos[$y]['place'],
                             'team_left' => $grupos[$y]['team_left'],
                             'team_right' => $grupos[$y]['team_right']
                        ];
                array_push($my_array_grupo,$new_data); 
            }
            else{
                $new_data = ['id_partido'=>$grupos[$y]['id_partido'],
                             'date' => $grupos[$y]['date'],
                             'place' => $grupos[$y]['place'],
                             'team_left' => $grupos[$y]['team_left'],
                             'team_right' => $grupos[$y]['team_right']
                        ];
                array_push($my_array_grupo,$new_data);
                array_push($my_array,$my_array_grupo);
                $my_array_grupo = [];
            }   
            
        }
       $_SESSION['grupos'] = $my_array;
    }
    /*for($x=0;$x<count($_SESSION['grupos']);$x++){
        echo "tabla numeroº:" .$x;
        for($p=0;$p<count($_SESSION['grupos'][$x]);$p++){
            echo "partido nº: ".$_SESSION['grupos'][$x][$p]['id_partido'];
        }
    }*/
    if(!isset($_SESSION['participantes'])){
        $my_array_p = [];
        $array2 = [];
        foreach(DB::getInstance()->getParticipantes() as $participante){
            $array2 = ['id' => $participante['id'],
                       'name' => $participante['name'],
                       'image' => $participante['image'],
                       'flag' => $participante['flag'],
                       'description' => $participante['description']
                    ];
            
            array_push($my_array_p,$array2);
        }
        
        $_SESSION['participantes'] = $my_array_p;
    }
    //session_destroy();
  
      
  $ids = ['A','B','C','D','E','F','G','H'];
  $grupos_actuales = $_SESSION['grupos'];
  $participantes_actuales = $_SESSION['participantes'];
  
  echo '<div class="container my-container">';
           
  for($i=0;$i<count($grupos_actuales);$i++){
    $id_grupo = $ids[$i];
    echo '<div class="row widget" id="grupo'.$id_grupo.'">'.
            '<div class="col-md-12 col-lg-12">'.
            '<div class="row">'.
            '<div class="col-md-12 col-lg-12">'.
            '<span class="group-title fa fa-chevron-up">Grupo'.$id_grupo.'</span>'.
            '</div>'.
            '</div>'.
            '<div class="row main">'.
            '<div class="col-md-12 col-lg-12">'.
            '<div class="row row-coats">'.
            '<div class="col-md-8 col-lg-8 col-md-offset-2">';

    $coat;
    $desc1;
    $desc2;
    for($h=0;$h<4;$h++){
      $id = ($i*4)+($h+1)-1;
      $coat = $participantes_actuales[$id]['image'];
      $desc1 = $participantes_actuales[$id]['description'];
      $desc1 = substr($desc1,0, strpos($desc1,':'));
      $desc2 = $participantes_actuales[$id]['description'];
      $desc2 = substr($desc2,strpos($desc2,(':'))+1,strlen($desc2)-1);
      echo '<img class="coat" src="images/coats/'.$coat.'" alt= "'.$desc1.'"title="'.$desc2.'">';
    }
    
      echo '</div>'.
           '</div>'.
           '<div class="row" id="grupo'.$id_grupo.'Partidos">'; //Begin Section Partidos
              
    $partidos = $grupos_actuales[$i];
    for($j=0;$j<6;$j++){
        $date = $partidos[$j]['date'];
        $place = $partidos[$j]['place'];
        $left = $partidos[$j]['team_left'];
        $right = $partidos[$j]['team_right'];
        $number = $partidos[$j]['id_partido'];

        $flag_l = '';
        $flag_r = '';
        //$flag = $participantes_actuales[$j]['flag'];
        $left_right = '';
        for($p=0;$p<32;$p++){
          $left_right = $participantes_actuales[$p]['name'];
          if($left === $left_right) {$flag_l = $participantes_actuales[$p]['flag'];}
          if($right === $left_right) {$flag_r = $participantes_actuales[$p]['flag'];}
        }
      echo '<div class="col-md-4 col-lg-4">'.
              '<div class="row estiloPartido">'.
              '<div class="col-md-12 col-lg-12">'.
              '<div class="row">'.
              '<div class="col-md-12 col-lg-12 match_number">Partido nº '.$number.'</div>'.
              '</div>'.
              '<div class="row">'.
              '<div class="col-md-12 col-lg-12 match_date-place">'.$date.'</div>'.
              '</div>'.
              '<div class="row">'.
              '<div class="col-md-12 col-lg-12 match_date-place">'.$place.'</div>'.
              '</div>';//End place
        
      $game1 = 1 . '' . $i . '' . $j . '' . 101;
      $game2 = 1 . '' . $i . '' . $j . '' . 102;
      
      $game1_val = !isset($_SESSION['goles']['p_'.$game1])|| $_SESSION['goles']['p_'.$game1] === '-1' ? '' : $_SESSION['goles']['p_'.$game1];
      $game2_val = !isset($_SESSION['goles']['p_'.$game2])|| $_SESSION['goles']['p_'.$game2] === '-1' ? '' : $_SESSION['goles']['p_'.$game2];
      echo    '<div class="row centrar">'.
              '<div class="col-md-5 col-lg-4 cero">'.
              '<img class="flag flag-margin-right" src="images/flags/'.$flag_l .'">'.
              '<label class="control-label name_left">'.$left.'</label>'.
              '</div>'.
              '<div class="col-md-1 col-lg-1 input_goles">'.
              '<input value="'.$game1_val.'" type="text" name="'.$game1.'" id="'.$game1.'" class="form-control grupos_i">'.
              '</div>'.
              '<div class="col-md-1 col-lg-1 input_goles">'.
              '<input value="'.$game2_val.'" type="text" name="" id="'.$game2.'" class="form-control grupos_i">'.
              '</div>'.
              '<div class="col-md-5 col-lg-4 cero">'.
              '<label class="control-label name_right">'.$right.'</label>'.
              '<img class="flag flag-margin-left" src="images/flags/'.$flag_r .'">'.
              '</div>'.
              '</div>'.
              '</div>'.
              '</div>'.
              '</div>';//End a match
    }
      echo '</div>'.
              '</div>'.
              '<div class="row" id="grupo'.$id_grupo.'Posiciones">'.                                          
              '<div class="col-md-6 col-md-offset-3">'.              
              '<table class="table" id="table'.$i.'">'.
              '<thead><tr><th>POS</th><th>Equipo</th><th>PJ</th><th>PG</th>'.
              '<th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>PTS</th></tr>'.
              '</thead>'.
              '<tbody>';

    //Aca tengo que poner el tema de los participantes
    $name;
    $flag_team;
    $name_split;
    for($m=0;$m<4;$m++){
      $id = ($i*4)+($m+1)-1;
      $name = $participantes_actuales[$id]['name'];
      if(strpos($name,' ') !== ''){
        $name_split = str_replace (" ","_",$name);
      }
      else 
      {
        $name_split = $name;
      }
      $flag_team = $participantes_actuales[$id]['flag'];
      echo '<tr id="'.$name_split.'"><td>'.($m+1).'</td><td class="equipo"><img class="flag flag-margin-right" src="images/flags/'.$flag_team .'">'.$name.'</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>';
    }
        
      echo '</tbody>'.
              '</table>'.
              '</div>'.
              '</div>'.                  
              '</div>'.
              '</div>'.
              '</div>';//End row widget and section posiciones
  }
  echo '</div>';
}

function buildPlayoff()
{
    if(!isset($_SESSION['playoff']))
    {
        $my_array_playoff = [];
        $playoff = DB::getInstance()->getPlayoff();
        
        for($y=0;$y<count($playoff);$y++)
        {
             $dato = ['id_playoff'=>  $playoff[$y]['id_playoff'],
                      'id_partido'=>  $playoff[$y]['id_partido'],
                           'date' =>  $playoff[$y]['date'],
                          'place' =>  $playoff[$y]['place'],
                      'team_left' =>  $playoff[$y]['team_left'],
                     'team_right' =>  $playoff[$y]['team_right'],
                     'image_left' =>  $playoff[$y]['image_left'],
                    'image_right' =>  $playoff[$y]['image_right']];
             
             array_push($my_array_playoff,$dato);
        }
        
        $_SESSION['playoff'] = $my_array_playoff;       
    }
    
    $playoff_actuales = $_SESSION['playoff'];
        
    echo '<article id="PlayOff">'.
         '<div class="container my-container-playoff"> '.
         '<div class="row widget">'.
         '<div class="col-md-12">'.
            
         '<div class="col-md-2">'.
         '<span class="grupom"> Octavos </span>';
         generarCuadrado("octavos1", $playoff_actuales);                
         echo 
         '</div>'.
            
         '<div class="col-md-2">'.
         '<span class="grupom"> Cuartos </span>';                
         generarCuadrado("cuartos1", $playoff_actuales);
         echo 
         '</div>'.
            
         '<div class="col-md-2">'.
         '<span class="grupom"> Semifinal </span>';                
         generarCuadrado("semifinal1", $playoff_actuales);    
         echo 
         '</div>'.

         '<div class="col-md-2">'.
         '<span class="grupom"> Semifinal </span>';                
         generarCuadrado("semifinal2", $playoff_actuales);    
         echo 
         '</div>'.

         '<div class="col-md-2">'.
         '<span class="grupom"> Cuartos </span>';                
         generarCuadrado("cuartos2", $playoff_actuales);    
         echo 
         '</div>'.
            
         '<div class="col-md-2">'.
         '<span class="grupom"> Octavos </span>';                
         generarCuadrado("octavos2", $playoff_actuales);    
         echo 
         '</div>'.               
         '</div>'.
         '</div>'.   

         '<div class="row widget">'.
         '<div class="col-md-12">'.
         '<div class="col-md-4"><br><img id="copita1" src="images/copa.png" alt=""></div><br>'.
         '<div class="col-md-4">'.                                             
         '<span class="grupom"> Final </span>';
         generarCuadrado("final", $playoff_actuales);
         echo
         '</div>'.                        
         '<div class="col-md-4"><img id="copita2" src="images/copa.png" alt=""></div><br>'.
         '</div>'.
         '</div>'.

         '</div>'.
         '</article>';        
}

function generarCuadrado($variable, $playoff_actuales)
{
    if($variable != "final")
    {       
        $cant = 0;
        $numero = 0; 
        $num = 0;
        
        switch ($variable) 
        { 
            case "octavos1":   $cant = 4; $numero = 1;  $num = 0; break;   
            case "octavos2":   $cant = 4; $numero = 9;  $num = 4; break;
            case "cuartos1":   $cant = 2; $numero = 17; $num = 8; break;
            case "cuartos2":   $cant = 2; $numero = 21; $num = 10; break;
            case "semifinal1": $cant = 1; $numero = 25; $num = 12; break;
            case "semifinal2": $cant = 1; $numero = 27; $num = 13; break;
        }                
        
        for($y=0;$y<$cant;$y++)
        {
            $fecha = $playoff_actuales[$num+$y]['date'];
            $place = $playoff_actuales[$num+$y]['place'];
            $left = $playoff_actuales[$num+$y]['team_left'];
            $right = $playoff_actuales[$num+$y]['team_right'];
            $imageleft = $playoff_actuales[$num+$y]['image_left'];
            $imageright = $playoff_actuales[$num+$y]['image_right'];
            
            $j = $y+$y+$numero;
            $h = $j+1;  
            
            if($variable === "semifinal1" || $variable === "semifinal2") echo '<div class="estiloPartidoNo3"></div>';
            else if($variable !== "octavos1" && $variable !== "octavos2")
            {
                if($y === 0) echo '<div class="estiloPartidoNo1"></div>';
                else if($y === 1) echo '<div class="estiloPartidoNo2"></div>';
            }
           
            echo
            '<div class="estiloPartido ancho-play">'.
            '<span class="fecha"> '.$fecha.' <br> '.$place.' </span><br>'.
            '<br class="brStyleClear">'.
            '<div class="row">'.
            '<div class="col-md-6"><img class="imagen100" id="Imagen'.$j.'" src="'.$imageleft.'"></div>'.
            '<div class="col-md-6"><img class="imagen100" id="Imagen'.$h.'" src="'.$imageright.'"></div>'.
            '</div>'.

            '<br class="brStyleClear">'.        
            '<div class="row">'.
            '<div class="col-md-6"><span class="claseSpan"><strong> <div id="Partido'.$j.'"> '.$left.' </div> </strong></span></div>'. 
            '<div class="col-md-6"><span class="claseSpan"><strong> <div id="Partido'.$h.'"> '.$right.' </div> </strong></span></div>'. 
            '</div>'.

            '<br class="brStyleClear">'.
            '<div class="row">'.
            '<div class="col-md-6"> <input id="'.$j.'" class="form-control type="text" disabled></div>'.
            '<div class="col-md-6"> <input id="'.$h.'" class="form-control type="text" disabled></div>'.
            '</div>'.                       
            '</div>';
        }
    }
    else 
    {
            $fecha = $playoff_actuales[14]['date'];
            $place = $playoff_actuales[14]['place'];
            $left = $playoff_actuales[14]['team_left'];
            $right = $playoff_actuales[14]['team_right'];
            $imageleft = $playoff_actuales[14]['image_left'];
            $imageright = $playoff_actuales[14]['image_right'];
            
            echo
            '<div class="estiloPartido2">'.
            '<span class="fecha"> '.$fecha.' <br> '.$place.' </span><br>'.
            '<div class="row">'.
            '<div class="col-md-3"> <img class="imagen100" id="Imagen29" src="'.$imageleft.'"></div>'.
            '<div class="col-md-3"> <input id="29" class="form-control final" type="text" disabled></div>'.
            '<div class="col-md-3"> <input id="30" class="form-control final" type="text" disabled></div>'.
            '<div class="col-md-3"> <img class="imagen100" id="Imagen30" src="'.$imageright.'"></div>'.
            '</div>'.

            '<br class="brStyleClear">'.
            '<div  class="floatLeftDiv"> <span class="claseSpan"><strong> <div id="Partido29"> '.$left.' </div></strong></span></div>'.
            '<div  class="floatRightDiv"> <span class="claseSpan"><strong> <div id="Partido30"> '.$right.' </div></strong></span></div>'.
            '</div>';

    }
}

function cargarPronosticosID(){
    $user_id = isset($_SESSION['user']['userid']) ? $_SESSION['user']['userid'] : -1;
    $valor = DB::getInstance()->cargarPronosticosIDBD($user_id);
    for($i=1;$i<=$valor;$i++){
        echo '<li><div id="prono_'.$i.'" class="getprono btn">Pronostico nº '.$i.'</div></li>';
    }
}

function getLastPronoId($user_id){
    return DB::getInstance()->getLastPronoDB($user_id);
}