<?php
require '../vendor/autoload.php'; // Make sure to autoload Composer dependencies
require './config/db.php'; 

// Instantiate App
$settings = require __DIR__ . '/settings.php';
$app = new \Slim\App($settings);
$container = $app->getContainer();


// Include route definitions
(require_once __DIR__ . '/Routes/routes.php')($app);

// $user_routes = require __DIR__ . '/routs/user_routes.php';
//$routes($app);
//an example of get
//  $app->get('/', function ($request, $response, $args) use ($pdo) {
//     // Use the database connection $pdo here
//     // Example query:
//     $stmt = $pdo->query('SELECT * FROM your_table');
//     // Example fetching data:
//     $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
//     // Example rendering data:
//     return $response->withJson($data);
// });

// Run application
$app->run();
