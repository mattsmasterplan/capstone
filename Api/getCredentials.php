<?php

// Use config file to determine prod/dev environment and connect to appropriate database
include 'inc/config.php';

session_start();
header('Access-Control-Allow-Origin: *');

if (isset($_SESSION['loggedin'])) {
  echo  '{"id": "' . $_SESSION["id"] . '", "first_name": "' . $_SESSION["first_name"] . '", "last_name": "' . $_SESSION["last_name"] . '",
    "position": "' . $_SESSION["position"] . '", "email": "' . $_SESSION["email"] . '", "phone": "' . $_SESSION["phone"] . '", "username": "' . $_SESSION["username"] . '", "permission": "' . $_SESSION["permission"] . '" }';
} else {
  echo  '{"error": "failed to authenticate"}';
}
