<?php
// ShoppingListHandlerId.php

namespace App\Services;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Database\Queries\shoppinglist;

require_once __DIR__ .  './../config/db.php';

final class ShoppingListHandler
{
    private $pdo;

    public function __construct()
    {
        global $pdo; 
        $this->pdo = $pdo;
    }

    public function getShoppingListId($request, $response, $args)
    {
        try {

            $id = $args['id'] ?? '';


            if (empty($id)) {
                return $response->withStatus(404)->write("Id is missing");
            }


            $query = ShoppingList::getShoppingListIdQuery();


            $statement = $this->pdo->prepare($query);
            $statement->execute(['id' => $id]);
            $shoppingList = $statement->fetchAll(\PDO::FETCH_ASSOC);

            if (empty($shoppingList)) {
                return $response->withStatus(404)->write("Shopping list not found for id: $id");
            }


            return $response->withJson($shoppingList);
        } catch (\PDOException $e) {

            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function deleteShoppingList($request, $response, $args)
    {
        try {
            $id = $args['id'];

            if (empty($id)) {
                return $response->withStatus(404)->write("Id is missing");
            }

            $query = ShoppingList::deleteShoppingListQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute(['id' => $id]);

            return $response->withStatus(204);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function addShoppingList($request, $response, $args)
    {
        try {
            $data = $request->getParsedBody();

            $userId = $data['user_id'] ?? '';
            $name = $data['name'] ?? '';

            if (empty($userId) || empty($name)) {
                return $response->withStatus(400)->write("Missing required fields");
            }

            $query = ShoppingList::addShoppingListQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute(['user_id' => $userId, 'name' => $name]);

            return $response->withStatus(201);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function getShoppingList($request, $response, $args)
    {
        try {
            $query = ShoppingList::getShoppingListQuery();

            $statement = $this->pdo->prepare($query);
            $statement->execute();
            $shoppingList = $statement->fetchAll(\PDO::FETCH_ASSOC);

            return $response->withJson($shoppingList);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }

    public function updateShoppingList($request, $response, $args)
    {
        try {
            $id = $args['id'];
            $data = $request->getParsedBody();
            $newIngredients = $data['ingredients'] ?? '';
    
            if (empty($id) || empty($newIngredients)) {
                return $response->withStatus(400)->write("Missing required fields");
            }
    
            // Fetch the existing ingredients
            $query = "SELECT ingredients FROM shopping_list WHERE id = :id";
            $statement = $this->pdo->prepare($query);
            $statement->execute(['id' => $id]);
            $existingIngredients = $statement->fetchColumn();
    
            if ($existingIngredients === false) {
                return $response->withStatus(404)->write("Shopping list not found");
            }
    
            // Decode the existing and new ingredients
            $existingIngredientsArray = json_decode($existingIngredients, true) ?? [];
            $newIngredientsArray = json_decode($newIngredients, true) ?? [];
    
            // Merge the ingredients arrays
            $mergedIngredientsArray = array_merge($existingIngredientsArray, $newIngredientsArray);
    
            // Encode the merged ingredients back to JSON
            $mergedIngredientsJson = json_encode($mergedIngredientsArray);
    
            // Update the shopping list with the new ingredients
            $updateQuery = ShoppingList::updateShoppingListQuery();
            $updateStatement = $this->pdo->prepare($updateQuery);
            $updateStatement->execute(['id' => $id, 'ingredients' => $mergedIngredientsJson]);
    
            return $response->withStatus(204);
        } catch (\PDOException $e) {
            return $response->withStatus(500)->write("Database error: " . $e->getMessage());
        }
    }
    
}
