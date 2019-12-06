<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

// Read and decode POST data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Check if any required fields are empty
if (isset($request->user_id) && isset($request->title) && isset($request->start) && isset($request->end)) {
    // Extract variables from POST data
    $user_id = test_input($request->user_id);
    $title = test_input($request->title);
    $description = test_input($request->description);
    $start = test_input($request->start);
    $end = test_input($request->end);
    // Initialize status
    $status = 'pending';

    // Don't need to send ID since database will assign automatically
    $result = mysqli_query($con, "INSERT INTO `requests`(`user_id`, `title`, `status`, `description`, `start`, `end`) VALUES ('{$user_id}', '{$title}', '{$status}', '{$description}', '{$start}', '{$end}' )");
    // Echo back success message and ID of created request
    echo '{"success":"completed add request","new_id":"' . mysqli_insert_id($con) . '"}';
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
