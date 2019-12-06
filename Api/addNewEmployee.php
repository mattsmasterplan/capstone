<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

// Read and decode POST data
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


// Check if any required fields are empty
if (isset($request->firstName) && isset($request->lastName) && isset($request->userName) && isset($request->password) && isset($request->position) && isset($request->email) && isset($request->phone)) {
    // Extract variables from POST data
    $firstName = test_input($request->firstName);
    $lastName = test_input($request->lastName);
    $position = test_input($request->position);
    $email = test_input($request->email);
    $phone = test_input($request->phone);
    $userName = test_input($request->userName);
    $password = test_input($request->password);

    // Determine permissions level
    if ($position == 'Shift Leader' || $position == 'Store Manager' || $position == 'District Manager') {
        // Admin permissions
        $permission = 1;
    } else {
        // User permissions
        $permission = 0;
    }

    // hash password
    $hashedPass = password_hash($password, PASSWORD_DEFAULT);

    // Don't need to send ID since database will assign automatically
    $result = mysqli_query($con, "INSERT INTO `users`(`first_name`, `last_name`, `position`, `email`, `phone`, `username`, `pass`, `permission`) 
    VALUES ('{$firstName}', '{$lastName}', '{$position}', '{$email}', '{$phone}', '{$userName}', '{$hashedPass}', '{$permission}')");
    echo '{"success":"completed add user script"}';
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
