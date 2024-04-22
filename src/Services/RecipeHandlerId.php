<?php
// RecipeHandlerId.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\Recipe;

require_once __DIR__ .  './../config/db.php';

final class RecipeHandlerId
{
    private $pdo;

    public function __construct()
    {
        global $pdo; // Access the $pdo variable defined in db.php
        $this->pdo = $pdo;
    }

    public function getRecipeById($request, $response, $args)
    {
        try {
            // Extract recipe ID from the route parameters
            $recipeId = $args['recipeId'];

            // Get the SQL query for retrieving a recipe by its ID
            $query = Recipe::getRecipeByIdQuery();

            // Query database to retrieve the recipe by its ID
            $statement = $this->pdo->prepare($query);
            $statement->execute(['recipeId' => $recipeId]);
            $recipe = $statement->fetch(\PDO::FETCH_ASSOC);

            // Check if recipe exists
            if (!$recipe) {
                return $response->withStatus(404)->write("Recipe not found");
            }

            // Return the recipe as JSON
            return $response->withJson($recipe);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}