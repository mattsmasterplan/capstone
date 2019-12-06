<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

// Read and decode POST data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Check if any required fields are empty
if (isset($request->statusUpdate) && isset($request->request_id) && isset($request->managed_by)) {
    // Extract variables from POST data
    $statusUpdate = test_input($request->statusUpdate);
    $request_id = test_input($request->request_id);
    $managed_by = test_input($request->managed_by);

    $sql = "UPDATE `requests` SET `status` = '{$statusUpdate}', `managed_by` = '{$managed_by}' WHERE `requests`.`request_id` = '{$request_id}'";

    $result = mysqli_query($con, $sql);
    // Echo back success message and ID of created request
    echo '{"success":"completed update request"}';
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
