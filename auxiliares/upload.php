<?php

function upload() {
    if ($_FILES["file"]["type"] == "") {
        return "./";
    }
    $error = null;

    $mail = filter_input(INPUT_POST, 'mail');
    // Controlar si son los tipos de archivo autorizados
    if (($_FILES["file"]["type"] == "image/jpeg") && ($_FILES["file"]["size"] < 20000)) { // menor a 20k
        if ($_FILES["file"]["error"] > 0) {
            $error = "Error: " . $_FILES["file"]["error"];
        } else {
            $carpeta_archivos = "fotos/";
            $file = $mail . ".jpg";
            move_uploaded_file($_FILES["file"]["tmp_name"], $carpeta_archivos . $file);
            return "./";
        }
    }
    else {
        if ($_FILES["file"]["type"] == "image/jpeg") {
            $error = "Error: Supera el tamaño máximo de 20k.";
        } else {
            $error = "Error: Formato no soportado: " . $_FILES["file"]["type"];
        }
    }
    $_SESSION['errorUpload'] = $error;
    return "./uploadError";
}

function getErrorUpload() {
    return isset($_SESSION['errorUpload'])? $_SESSION['errorUpload'] : "";
}
