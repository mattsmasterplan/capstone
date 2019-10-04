<?php



define('DB_SERVER', 'localhost');

define('DB_USERNAME', 'mattsmas_matt');

define('DB_PASSWORD', 'gGmDbNgE79f69TD');

define('DB_NAME', 'mattsmas_testdb');



$link = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);



/* check connection */

if ($link->connect_errno) {

    printf("Connect failed: %s\n", $con->connect_error);

    exit();

}





?>
