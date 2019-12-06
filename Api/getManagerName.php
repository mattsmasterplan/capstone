<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

// Read and decode POST data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Check if any required fields are empty
if (isset($request->manager_id)) {
    // Extract variables from POST data
    $manager_id = test_input($request->manager_id);

    $sql = "SELECT * FROM `users` WHERE id = '{$manager_id}' LIMIT 1";

    $result = mysqli_query($con, $sql);

    //Initialize array variable
    $dbdata = array();

    //Fetch into associative array
    while ($row = $result->fetch_assoc()) {
        $dbdata[] = $row;
    }

    //Print array in JSON format
    echo json_encode($dbdata);
} else {
    echo '{"error":"required field missing"}';
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

mysqli_close($con);
