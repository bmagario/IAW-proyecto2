<?php

session_start();

function redirect($url) {
    header("Location: $url");
    die();
}

function isLoggedIn() {
    return isset($_SESSION['user']['token']);
}

function isAdmin(){
    if(isset($_SESSION['user']['rol'])){
        return $_SESSION['user']['rol'] === 'admin';
    }
    return false;
}

function checkLogin(){
    
}

function printUserData() {
    include_once '/google.php';
         
}