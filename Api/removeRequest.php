<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int) $_GET['id'] > 0) ? mysqli_real_escape_string($con, (int) $_GET['id']) : false;

if (!$id) {
    return http_response_code(400);
}

// Send delete command with user ID
$sql = "DELETE FROM `requests` WHERE `request_id` = '{$id}' LIMIT 1";

if (mysqli_query($con, $sql)) {
    http_response_code(204);
} else {
    return http_response_code(422);
}
