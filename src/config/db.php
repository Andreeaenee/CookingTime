<?php
// db.php

$host = 'localhost'; 
$dbname = 'cookingtime'; 
$username = 'postgres'; 
$password = 'postgres'; 

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    // Set PDO to throw exceptions on error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection errors
    die("Error connecting to the database: " . $e->getMessage());
}
