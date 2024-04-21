<?php
// UserHandler.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\User; // Assuming you'll create a User query class

final class UserHandler
{
    private $pdo;

    public function __construct()
    {
        global $pdo; // Access the $pdo variable defined in db.php
        $this->pdo = $pdo;
    }

    public function getUserById($request, $response, $args)
    {
        try {
            // Extract user ID from the route parameters
            $userId = $args['userId'];

            // Get the SQL query for retrieving a user by their ID
            $query = User::getUserByIdQuery();

            // Query database to retrieve the user by their ID
            $statement = $this->pdo->prepare($query);
            $statement->execute(['userId' => $userId]);
            $user = $statement->fetch(\PDO::FETCH_ASSOC);

            // Check if user exists
            if (!$user) {
                return $response->withStatus(404)->write("User not found");
            }

            // Return the user as JSON
            return $response->withJson($user);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}
