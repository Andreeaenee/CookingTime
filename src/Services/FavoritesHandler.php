<?php
// FavoritesHandler.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\Favorites; // Assuming you have a class to handle queries related to favorites
use fe\src\context\AuthContext;

require_once __DIR__ .  './../config/db.php';


final class FavoritesHandler
{
    private $pdo;

    public function __construct()
    {
        global $pdo; // Access the $pdo variable defined in db.php
        $this->pdo = $pdo;
    }

    public function getFavorite($request, $response, $args)
    {
        try {
            // Get the user ID from the request or from session, assuming it's available in $args
            $userId = $request->getQueryParams()['userId'];
            
            // Get the SQL query for retrieving favorite recipes for a specific user
            $query = Favorites::getFavoriteRecipeIdsQuery(); // Assuming you have a method to get the query for retrieving favorite recipes
                                
            // Query database to retrieve favorite recipes for the specific user
            $statement = $this->pdo->prepare($query);
            $statement->bindParam(':userId', $userId);
            $statement->execute();
            $favoriteRecipes = $statement->fetchAll(\PDO::FETCH_ASSOC);
            
            // Return the favorite recipes as JSON
            $responseJson = $response->withJson($favoriteRecipes);

            $responseBody = $responseJson->getBody()->getContents();
            echo $responseBody; // Print the JSON response
            return $response->withJson($favoriteRecipes);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
    

    public function addFavorite($request, $response)
    {
        try {
            $data = $request->getParsedBody();

            if (!isset($data['recipe_id']) || !isset($data['user_id'])) {
                return $response->withStatus(400)->write("Missing required fields");
            }

            $query1 = Favorites::checkFavoriteQuery();
            $statement1 = $this->pdo->prepare($query1);
            $statement1->bindParam(':recipeId', $data['recipe_id']);
            $statement1->bindParam(':userId', $data['user_id']);
            $statement1->execute();
            $existingFavorite = $statement1->fetch(\PDO::FETCH_ASSOC);

            if ($existingFavorite) {
                // Recipe is already a favorite, return a 409 Conflict response
                return $response->withStatus(409)->write("Recipe is already a favorite");
            }
            
            $query = Favorites::addFavoriteQuery(); 

            $statement = $this->pdo->prepare($query);
            $statement->bindParam(':recipeId', $data['recipe_id']);
            $statement->bindParam(':userId', $data['user_id']);
            $statement->execute();


            return $response->withStatus(201)->write("Favorite recipe added successfully");
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function deleteFavorite($request, $response, $args)
    {
        try {
            $id = $args['id'];

            if (empty($id)) {
                return $response->withStatus(404)->write("ID is missing");
            }

            $query = Favorites::deleteFavoriteQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute(['Id' => $id]);
            
            return $response->write("Favorite recipe deleted successfully");
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}



