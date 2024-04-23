<?php
require '../vendor/autoload.php'; // Make sure to autoload Composer dependencies
require './config/db.php'; 

// Instantiate App
$settings = require __DIR__ . '/settings.php';
$app = new \Slim\App($settings);
$corsOptions = array(
    "origin" => "*",
    "allowMethods" => array("POST, GET", "PATCH", "DELETE", "PUT"),
    );
$app->add(new \CorsSlim\CorsSlim($corsOptions));
$container = $app->getContainer();


// Include route definitions
(require_once __DIR__ . '/Routes/routes.php')($app);


// Run application
$app->run();
