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


    public function getRecipes($request, $response, $args)
    {
        try {
            // Get the SQL query to retrieve all recipes with their ingredients
            $query = Recipe::getRecipesQuery();

            // Query database to retrieve all recipes with their ingredients
            $statement = $this->pdo->prepare($query);
            $statement->execute();
            $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);

            // Group recipes by ID and combine their ingredients
            $groupedRecipes = [];
            foreach ($recipes as $recipe) {
                $recipeId = $recipe['id'];
                if (!isset($groupedRecipes[$recipeId])) {
                    $groupedRecipes[$recipeId] = $recipe;
                    $groupedRecipes[$recipeId]['ingredients'] = [];
                }
                if (!empty($recipe['ingredient_name'])) {
                    $groupedRecipes[$recipeId]['ingredients'][] = [
                        'name' => $recipe['ingredient_name'],
                        'quantity' => $recipe['quantity']
                    ];
                }
                // Unset unnecessary field
                unset($groupedRecipes[$recipeId]['ingredient_name']);
                unset($groupedRecipes[$recipeId]['quantity']);
            }

            // Return the grouped recipes as JSON
            return $response->withJson(array_values($groupedRecipes));
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
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

             // Check if any recipes are found
            if (empty($recipes)) {
             // Return a custom message indicating that the category does not exist
             return $response->withStatus(404)->write("No recipes found for the given category ID.");
            }
     
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
            // Extract ingredient ID from the route parameters
            $ingredientId = $args['ingredient_id'];
    
            // Get the SQL query for retrieving recipes by ingredient
            $query = Ingredient::getRecipesByIngredientQueryy();
    
            // Query database to retrieve recipes by ingredient
            $statement = $this->pdo->prepare($query);
            $statement->execute(['ingredient' => "%$ingredientId%"]); // Use 'ingredient' instead of 'ingredientId'
            $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);
    
            // Check if any recipes are found
            if (empty($recipes)) {
                // Return custom response if no recipes are found for the ingredient
                return $response->withStatus(404)->write("No recipes found for the specified ingredient.");
            }
    
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
        // Checking if all required fields are present
        $requiredFields = ['imageId', 'description', 'title', 'steps', 'categoryId', 'userId', 'ingredients'];
        foreach ($requiredFields as $field) {
            if (!isset($parsedBody[$field])) {
                throw new \InvalidArgumentException("Missing required field: $field");
            }
        }
        $currentDate = date('Y-m-d');

        $recipeDetails = [
            'imageId' => $parsedBody['imageId'],
            'description' => $parsedBody['description'],
            'title' => $parsedBody['title'],
            'steps' => $parsedBody['steps'],
            'categoryId' => $parsedBody['categoryId'],
            'date' => $currentDate,
            'userId' => $parsedBody['userId']
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
        $statement->bindParam(':userId', $recipeDetails['userId']);

        $statement->execute();

        // Get the ID of the newly inserted recipe
        $recipeId = $this->pdo->lastInsertId();

        // Add ingredients to the recipe
        $ingredients = $parsedBody['ingredients'];
        foreach ($ingredients as $ingredient) {
            $ingredientName = $ingredient['name'];
            $quantity = $ingredient['quantity'];

            // Check if the ingredient already exists in the database
            $sql = Ingredient :: checkIngredientQuery();
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':name', $ingredientName);
            $stmt->execute();
            $existingIngredient = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($existingIngredient) {
                $ingredientId = $existingIngredient['id'];
            } else {
                // Insert the new ingredient
                $sql = Ingredient::addIngredientQuery();
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':name', $ingredientName);
                $stmt->execute();
                $ingredientId = $this->pdo->lastInsertId();
            }

            // Link the ingredient to the recipe
            $sql = Recipe::addRecipeIngredientQuery();
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':recipeId', $recipeId);
            $stmt->bindParam(':ingredientId', $ingredientId);
            $stmt->bindParam(':quantity', $quantity);
            $stmt->execute();
        }

        return $response->withJson(['message' => 'Recipe added successfully']);
    } catch (\InvalidArgumentException $e) {
        return $response->withStatus(400)->write($e->getMessage());
    } catch (\PDOException $e) {
        // Handle database errors
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    }
}


public function updateRecipe($request, $response, $args)
{
    try {
        $parsedBody = $request->getParsedBody();
        $recipeId = $args['recipeId'];
        $currentDate = date('Y-m-d');

        // Prepare the SQL statement to update a recipe
        $sql = Recipe::updateRecipeQuery();
        $statement = $this->pdo->prepare($sql);

        $statement->bindParam(':recipeId', $recipeId);
        $statement->bindParam(':imageId', $parsedBody['imageId']);
        $statement->bindParam(':description', $parsedBody['description']);
        $statement->bindParam(':title', $parsedBody['title']);
        $statement->bindParam(':steps', $parsedBody['steps']);
        $statement->bindParam(':categoryId', $parsedBody['categoryId']);
        $statement->bindParam(':date', $currentDate);

        $statement->execute();

        // Update recipe ingredients
        $this->updateRecipeIngredients($recipeId, $parsedBody['ingredients']);

        return $response->withJson(['message' => 'Recipe updated successfully']);
    } catch (\PDOException $e) {
        // Handle database errors
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    }
}

private function updateRecipeIngredients($recipeId, $ingredients)
{
    foreach ($ingredients as $ingredient) {
        $ingredientName = $ingredient['name'];
        $quantity = $ingredient['quantity'];

        // Check if the ingredient already exists in the database
        $sql = Ingredient::checkIngredientQuery();
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':name', $ingredientName);
        $stmt->execute();
        $existingIngredient = $stmt->fetch(\PDO::FETCH_ASSOC);

        if ($existingIngredient) {
            $ingredientId = $existingIngredient['id'];
        } else {
            // Insert the new ingredient
            $sql = Ingredient::addIngredientQuery();
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':name', $ingredientName);
            $stmt->execute();
            $ingredientId = $this->pdo->lastInsertId();
        }

        // Link the ingredient to the recipe
        $sql = Recipe::updateRecipeIngredientQuery();
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindParam(':recipeId', $recipeId);
        $stmt->bindParam(':ingredientId', $ingredientId);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->execute();
    }
}

}
