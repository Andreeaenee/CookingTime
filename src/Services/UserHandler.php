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

    public function addUser($request, $response)
    {
        try {
            $data = $request->getParsedBody();

            if (!isset($data['first_name']) || !isset($data['last_name']) || !isset($data['email']) || !isset($data['password'])) {
                return $response->withStatus(400)->write("Missing required fields");
            }

            $query = User::addUserQuery();

            // Hash the password before storing it
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

            // Execute the query to add a new user
            $statement = $this->pdo->prepare($query);
            $statement->execute([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => $hashedPassword
            ]);

            // Return success message
            return $response->status(201)->withJson(['message' => 'User added successfully']);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function updateUser($request, $response, $args)
    {
        try {
            $data = $request->getParsedBody();
            $userId = $args['userId'];
            if (isset($data['first_name']) || isset($data['last_name']) || isset($data['email']) || isset($data['password'])) {

                $query = User::updateUserQuery();
                $statement = $this->pdo->prepare($query);
                $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    
                $statement->bindParam(':userId', $userId);
                $statement->bindParam(':first_name', $data['first_name']);
                $statement->bindParam(':last_name', $data['last_name']);
                $statement->bindParam(':email', $data['email']);
                $statement->bindParam(':password', $hashedPassword);
              
    
                $statement->execute();
    
                return $response->withJson(['message' => 'User updated successfully']);
            } else {
                return $response->withStatus(400)->write("Missing required fields");
            }
            
           


        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function deleteUser($request, $response, $args)
    {
        try {
            $userId = $args['userId'];

            $query = User::deleteUserQuery();
            $statement = $this->pdo->prepare($query);
            $statement->execute(['userId' => $userId]);

            return $response->withJson(['message' => 'User deleted successfully']);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
    
}
