<?php

function getColumna() {
    return filter_has_var(INPUT_GET,'col') ? filter_input(INPUT_GET, 'col') : "apellido";
}

function getOrden() {
    return filter_has_var(INPUT_GET,'ord') ? filter_input(INPUT_GET, 'ord') : "asc";
}

function isOrderedBy($columna) {
    return (getColumna() == $columna);
}

function inverseOrder($order) {
    if ($order == "asc") {
        return "desc";
    } else {
        return "asc";
    }
}

function getOrder($columna) {
    if (isOrderedBy($columna)) {
        return inverseOrder(getOrden());
    } else {
        return "asc";
    }
}

