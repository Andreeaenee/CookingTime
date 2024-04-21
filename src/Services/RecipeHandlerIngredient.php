<?php
// RecipeHandler.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\Ingredient;

require_once __DIR__ .  './../config/db.php';

final class RecipeHandlerIngredient
{
    private $pdo;

    public function __construct()
    {
        global $pdo; // Access the $pdo variable defined in db.php
        $this->pdo = $pdo;
    }

    public function getRecipesByIngredient($request, $response, $args)
    {
        try {
            // Extract ingredient from the query parameters
            $ingredient = $args['ingredient'];

            // Get the SQL query for retrieving recipes by ingredient
            $query = Ingredient::getRecipesByIngredientQuery();

            // Query database to retrieve recipes by ingredient
            $statement = $this->pdo->prepare($query);
            $statement->execute(['ingredient' => "%$ingredient%"]); // Using LIKE for partial matches
            $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);

            // Return the recipes as JSON
            return $response->withJson($recipes);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}