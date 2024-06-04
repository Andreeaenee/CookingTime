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

    public function getFilteredRecipes($request, $response, $args) 
    {
        $queryParams = $request->getQueryParams();
        $filter = $queryParams['filter'] ?? null;
        $filterId = $queryParams['id'] ?? null;
        
        switch ($filter) {
            case 'category':
                return $this->getRecipesByCategoryId($request, $response, $filterId);
                break;
            case 'ingredient':
                return $this->getRecipesByIngredient($request, $response, $filterId);
                break;
            case 'user':
                return $this->getRecipesByUserId($request, $response, $filterId);
                break;
            default:
                return $this->getRecipes($request, $response, $args);
                break;
        }
    }
public function getRecipesByUserId($request, $response, $filterId)
{
    try{
    $query = Recipe::getRecipeByUserQuery();
    $statement = $this->pdo->prepare($query);
    $statement->execute(['userId' => $filterId]);
    $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);
    if (empty($recipes)) {
        return $response->withStatus(404)->write("No recipes found for the given user ID.");
    }
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

    // Return the recipes as JSON
    return $response->withJson(array_values($groupedRecipes));
} catch (\PDOException $e) {
    return $response->withStatus(500)->write($e->getMessage());
}

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


    public function getRecipesByCategoryId($request, $response, $filterId)
    {
        try {    
            // Get the SQL query for retrieving recipes by category ID
            $query = Category::getRecipesByCategoryIdQuery();
    
            // Query database to retrieve recipes by category ID
            $statement = $this->pdo->prepare($query);
            $statement->execute(['categoryId' => $filterId]);
            $recipes = $statement->fetchAll(\PDO::FETCH_ASSOC);

             // Check if any recipes are found
            if (empty($recipes)) {
             // Return a custom message indicating that the category does not exist
             return $response->withStatus(404)->write("No recipes found for the given category ID.");
            }
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
     
            // Return the recipes as JSON
            return $response->withJson(array_values($groupedRecipes));
        } catch (\PDOException $e) {
            // Handle database errors
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function getRecipeById($request, $response, $args)
{
    try {
        // Extract recipe ID from the route parameters
        $recipeId = $args['id'];

        // Get the SQL query for retrieving a recipe by its ID
        $recipeQuery = Recipe::getRecipeByIdQuery();
        $ingredientQuery = Ingredient::getIngredientsByRecipeIdQuery();

        // Query database to retrieve the recipe by its ID
        $recipeStatement = $this->pdo->prepare($recipeQuery);
        $recipeStatement->execute(['recipeId' => $recipeId]);
        $recipe = $recipeStatement->fetch(\PDO::FETCH_ASSOC);

        // Check if recipe exists
        if (!$recipe) {
            return $response->withStatus(404)->write("Recipe not found");
        }

        // Query database to retrieve ingredients for the recipe
        $ingredientStatement = $this->pdo->prepare($ingredientQuery);
        $ingredientStatement->execute(['recipeId' => $recipeId]);
        $ingredients = $ingredientStatement->fetchAll(\PDO::FETCH_ASSOC);

        // Add the ingredients to the recipe details
        $recipe['ingredients'] = $ingredients;

        // Remove the redundant ingredient name and quantity from the recipe details
        unset($recipe['ingredient_name']);
        unset($recipe['quantity']);

        // Return the recipe with ingredients as JSON
        return $response->withJson($recipe);
    } catch (\PDOException $e) {
        // Handle database errors
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    }
}

public function deleteRecipe($request, $response, $args)
{
    try {
        // Extract recipe ID from the route parameters
        $recipeId = $args['id'];

        // Log the recipe ID to be deleted
        error_log("Attempting to delete recipe with ID: $recipeId");

        // Ensure the recipe exists before attempting to delete
        $checkQuery = Recipe::getRecipeByIdQuery();
        $checkStatement = $this->pdo->prepare($checkQuery);
        $checkStatement->execute(['recipeId' => $recipeId]);
        $recipe = $checkStatement->fetch(\PDO::FETCH_ASSOC);

        if (!$recipe) {
            error_log("Recipe with ID: $recipeId not found.");
            return $response->withStatus(404)->write("Recipe not found");
        }

        // Start a transaction
        $this->pdo->beginTransaction();

        // Delete related records in the recipes_has_ingredients table
        $deleteIngredientsQuery = "DELETE FROM recipes_has_ingredients WHERE id_recipe = :recipeId";
        $deleteIngredientsStatement = $this->pdo->prepare($deleteIngredientsQuery);
        $deleteIngredientsStatement->execute(['recipeId' => $recipeId]);

        // Log the deletion of ingredients
        error_log("Deleted ingredients for recipe ID: $recipeId");

        // Get the SQL queries to delete the recipe from all related tables
        $queries = Recipe::deleteRecipeQuery();

        // Prepare and execute the SQL statements
        foreach ($queries as $query) {
            $statement = $this->pdo->prepare($query);
            $statement->execute(['recipeId' => $recipeId]);
        }

        // Commit the transaction
        $this->pdo->commit();

        error_log("Recipe with ID: $recipeId deleted successfully.");
        return $response->withJson(['message' => 'Recipe deleted successfully']);

    } catch (\PDOException $e) {
        // Rollback the transaction in case of error
        $this->pdo->rollBack();
        
        // Handle database errors
        error_log("Database error: " . $e->getMessage());
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    } catch (\Exception $e) {
        // Rollback the transaction in case of any other error
        $this->pdo->rollBack();

        // Handle other types of errors
        error_log("Error: " . $e->getMessage());
        return $response->withStatus(500)->write("Error: " . $e->getMessage());
    }
}

public function addRecipe($request, $response, $args)
{
    try {
        $uploadedFiles = $request->getUploadedFiles();
        $parsedBody = $request->getParsedBody();

        // Check if image file is uploaded
        if (!isset($uploadedFiles['image'])) {  // Key should match frontend
            throw new \InvalidArgumentException("Image file is required");
        }

        $imageFile = $uploadedFiles['image'];
        if ($imageFile->getError() !== UPLOAD_ERR_OK) {
            throw new \RuntimeException("Failed to upload image");
        }

        // Generate unique ID for the image
        $imageId = uniqid();
        $uploadPath = './uploads';
        $imageFileName = $imageFile->getClientFilename();
        $imageFile->moveTo("$uploadPath/$imageId.jpeg");

        // Check if all required fields are present
        $requiredFields = ['description', 'title', 'steps', 'categoryId', 'userId', 'ingredients'];
        foreach ($requiredFields as $field) {
            if (!isset($parsedBody[$field])) {
                throw new \InvalidArgumentException("Missing required field: $field");
            }
        }

        // Insert recipe details into the database
        $currentDate = date('Y-m-d');
        $sqlInsertRecipe = Recipe::addRecipeQuery();
        $statement = $this->pdo->prepare($sqlInsertRecipe);
        $statement->bindParam(':imageId', $imageId);  // Binding the image ID
        $statement->bindParam(':description', $parsedBody['description']);
        $statement->bindParam(':title', $parsedBody['title']);
        $statement->bindParam(':steps', $parsedBody['steps']);
        $statement->bindParam(':categoryId', $parsedBody['categoryId']);
        $statement->bindParam(':date', $currentDate);
        $statement->bindParam(':userId', $parsedBody['userId']);
        $statement->execute();

        // Get the ID of the newly inserted recipe
        $recipeId = $this->pdo->lastInsertId();

        // Add ingredients to the recipe
        $ingredients = $parsedBody['ingredients'];
        foreach ($ingredients as $ingredient) {
            $ingredientId = $ingredient['id'];
            $quantity = $ingredient['quantity'];

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
        $recipeId = $args['id'];
        $currentDate = date('Y-m-d');

        // Debugging: Log the incoming request payload
        error_log('Updating recipe with ID: ' . $recipeId);
        error_log('Received data: ' . json_encode($parsedBody));

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
        // Debugging: Log the database error
        error_log('Database error: ' . $e->getMessage());
        // Handle database errors
        return $response->withStatus(500)->write("Database error: " . $e->getMessage());
    }
}

private function updateRecipeIngredients($recipeId, $ingredients)
{
    try {
        // Start a transaction
        $this->pdo->beginTransaction();

        // Remove existing links for the recipe (if needed)
        $sqlDeleteExistingLinks = "DELETE FROM recipes_has_ingredients WHERE id_recipe = :recipeId";
        $stmtDeleteExistingLinks = $this->pdo->prepare($sqlDeleteExistingLinks);
        $stmtDeleteExistingLinks->bindParam(':recipeId', $recipeId);
        $stmtDeleteExistingLinks->execute();

        // Insert the new links
        foreach ($ingredients as $ingredient) {
            $ingredientId = $ingredient['id'];
            $quantity = $ingredient['quantity'];

            // Debugging: Log each ingredient being processed
            error_log('Processing ingredient ID: ' . $ingredientId . ' with quantity: ' . $quantity);

            // Check if the ingredient ID is valid
            $sqlCheckIngredient = "SELECT * FROM ingredients WHERE id = :ingredientId";
            $stmtCheckIngredient = $this->pdo->prepare($sqlCheckIngredient);
            $stmtCheckIngredient->bindParam(':ingredientId', $ingredientId);
            $stmtCheckIngredient->execute();
            $existingIngredient = $stmtCheckIngredient->fetch(\PDO::FETCH_ASSOC);

            if ($existingIngredient) {
                error_log('Ingredient exists with ID: ' . $ingredientId);

                // Insert the new ingredient link
                $sqlAddIngredientLink = "INSERT INTO recipes_has_ingredients (id_recipe, id_ingredient, quantity) VALUES (:recipeId, :ingredientId, :quantity)";
                $stmtAddIngredientLink = $this->pdo->prepare($sqlAddIngredientLink);
                $stmtAddIngredientLink->bindParam(':recipeId', $recipeId);
                $stmtAddIngredientLink->bindParam(':ingredientId', $ingredientId);
                $stmtAddIngredientLink->bindParam(':quantity', $quantity);
                $stmtAddIngredientLink->execute();

                error_log('New ingredient linked to recipe');
            } else {
                error_log('Ingredient ID ' . $ingredientId . ' does not exist');
            }
        }

        // Commit the transaction
        $this->pdo->commit();
    } catch (Exception $e) {
        // Rollback the transaction if any error occurs
        $this->pdo->rollBack();
        error_log('Error processing ingredients: ' . $e->getMessage());
    }
}






    public function getCategories($request, $response, $args)
    {
        try {
            $query = Category::getCategoriesQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute();
            $categories = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (empty($categories)) {
                return $response->withStatus(404)->write("No categories found");
            }

            return $response->withJson($categories);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function getIngredients($request, $response, $args)
    {
        try {
            $query = Ingredient::getIngredientsQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute();
            $ingredients = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (empty($ingredients)) {
                return $response->withStatus(404)->write("No ingredients found");
            }

            return $response->withJson($ingredients);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
}
