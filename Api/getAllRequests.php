<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

$result = mysqli_query($con, "SELECT * FROM `requests`");

//Initialize array variable
$dbdata = array();

//Fetch into associative array
while ($row = $result->fetch_assoc()) {
    $dbdata[] = $row;
}

//Print array in JSON format
echo json_encode($dbdata);

mysqli_close($con);

