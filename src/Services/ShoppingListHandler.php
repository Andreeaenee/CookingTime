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
}
