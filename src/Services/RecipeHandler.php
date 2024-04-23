<?php
// RecipeHandler.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\Category;
use App\Database\Queries\Recipe;
use App\Database\Queries\Ingredient;

require_once __DIR__ .  './../config/db.php';


final class RecipeHandler
{
    private $pdo;

    public function __construct()
    {
        global $pdo; // Access the $pdo variable defined in db.php
        $this->pdo = $pdo;
    }


    public function getRecipesByCategoryId($request, $response, $args)
    {
        try {
            // Extract categoryId from the route parameters
            $categoryId = $args['categoryId'];
    
            // Get the SQL query for retrieving recipes by category ID
            $query = Category::getRecipesByCategoryIdQuery();
    
            // Query database to retrieve recipes by category ID
            $statement = $this->pdo->prepare($query);
            $statement->execute(['categoryId' => $categoryId]);
            $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
            // Return the recipes as JSON
            return $response->withJson($recipes);
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
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

    public function getRecipesByIngredient($request, $response, $args)
    {
        try {
            // Extract ingredient from the query parameters
            $queryParams = $request->getQueryParams();
            $ingredient = $queryParams['ingredient'] ?? '';

            // Check if ingredient is missing
            if (empty($ingredient)) {
                return $response->withStatus(404)->write("Ingredient is missing");
            }

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

    public function addRecipe($request, $response, $args)
{
    try {
        $parsedBody = $request->getParsedBody();
        //Checking if all required fields are present
        $requiredFields = ['imageId', 'description', 'title', 'steps', 'categoryId'];
        foreach ($requiredFields as $field) {
            if (!isset($parsedBody[$field])) {
                throw new \InvalidArgumentException("Missing required field: $field");
            }
        }

        $recipeDetails = [
            'imageId' => $parsedBody['imageId'],
            'description' => $parsedBody['description'],
            'title' => $parsedBody['title'],
            'steps' => $parsedBody['steps'],
            'categoryId' => $parsedBody['categoryId'],
            'date' => date('Y-m-d')
        ];

        // Prepare the SQL statement to add a recipe
        $sql = Recipe::addRecipeQuery();
        $statement = $this->pdo->prepare($sql);

        $statement->bindParam(':imageId', $recipeDetails['imageId']);
        $statement->bindParam(':description', $recipeDetails['description']);
        $statement->bindParam(':title', $recipeDetails['title']);
        $statement->bindParam(':steps', $recipeDetails['steps']);
        $statement->bindParam(':categoryId', $recipeDetails['categoryId']);
        $statement->bindParam(':date', $recipeDetails['date']);

        $statement->execute();

        return $response->withJson(['message' => 'Recipe added successfully']);
    }catch (\InvalidArgumentException $e) {
        return $response->withStatus(400)->write($e->getMessage());
    }
     catch (\PDOException $e) {
        // Handle database errors
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    }
}


}
