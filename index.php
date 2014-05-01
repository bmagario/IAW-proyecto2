<?php

ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__FILE__) . '/error_log.txt');
error_reporting(E_ALL);

include_once './auxiliares/login.php';
include_once './auxiliares/medoodb.php';
include_once './auxiliares/datos.php';


$vista = './vistas/principal.phtml';

// route the request internally
$uri = filter_input(INPUT_SERVER, 'REQUEST_URI');
//$uri = substr($uri, 13); //remove /~mariano/php
$uri = substr($uri, 14); //remove   /IAW-proyecto2
//session_destroy();
if (isLoggedIn()) {
    if ($uri === '/logout') {
        session_start();
	session_destroy();
	header("Location: ./");
    }
} else {
    if ($uri === '/login') {
        if (checkLogin()) {
            redirect("./");
        } else {
            $vista = './vistas/loginForm.phtml';
        }
    }
}
   // echo $uri;

if($uri === '/readme'){
    
    $vista = './vistas/readme.phtml';

}
else{
        if($uri === '/como_jugar'){ 
            $vista = './vistas/como_jugar.phtml';
        }
    }
    
include $vista;

