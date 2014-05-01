<?php

session_start();

function redirect($url) {
    header("Location: $url");
    die();
}

function isLoggedIn() {
    return isset($_SESSION['userid']);
}

function isAdmin(){
    if(isset($_SESSION['rol'])){
        return getRol() === 'admin';
    }
    return false;
}
function checkLogin() {
    
    if (!filter_has_var(INPUT_POST, 'username')) {
        return false;
    }
    
    $username = filter_input(INPUT_POST, 'username');

    if (validateUser($username, filter_input(INPUT_POST, 'password'))) {
        $_SESSION['userid'] = $username;
        unset($_SESSION['errorLogin']);
        return true;
    } else {
        $_SESSION['errorLogin'] = "Usuario o Clave incorrectas.";
    }

    return false;
}

function hayError() {
    return isset($_SESSION['errorLogin']);
}

function getError() {
    return $_SESSION['errorLogin'];
}

function getRol(){
    return $_SESSION['rol'];
}
function validateUser($user, $pass) {
    $usuario = DB::getInstance()->getUsuario($user);
    $claveEncriptada = $usuario['clave'];
    return strcmp($claveEncriptada, md5($pass)) == 0;
}

function printUserData() {
    if (isLoggedIn()) {
        echo "<a href='./logout' title='Logout' class='userData'>";
        echo $_SESSION['userid'];
        echo "</a>";
    } else {
        echo "<a href='./login' class='userData'>Ingresar Con Google</a>";
    }
}

function getErrorLogin() {
    return isset($_SESSION['errorLogin'])? $_SESSION['errorLogin'] : "";
}

