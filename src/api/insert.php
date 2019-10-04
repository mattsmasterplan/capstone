<?php


$postdata = file_get_contents("php://input");



    $con = new mysqli("localhost", "mattsmas_matt", "gGmDbNgE79f69TD", "mattsmas_testdb");

    /* check connection */
    if ($con->connect_errno) {
        printf("Connect failed: %s\n", $con->connect_error);
        exit();
    }


$result = mysqli_query($con, "INSERT INTO `employees`(`ID`, `NAME`) VALUES (0990,'Frank')");


mysqli_close($con);







