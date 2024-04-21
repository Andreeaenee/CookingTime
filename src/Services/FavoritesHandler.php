<?php
// FavoritesHandler.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\Favorites; // Assuming you have a class to handle queries related to favorites

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
            // Get the SQL query for retrieving favorite recipes
            $query = Favorites::getFavoritesQuery(); // Assuming you have a method to get the query for retrieving favorite recipes
    
            // Query database to retrieve favorite recipes
            $statement = $this->pdo->prepare($query);
            $statement->execute();
            $favoriteRecipes = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
            // Return the favorite recipes as JSON
            return $response->withJson($favoriteRecipes);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}