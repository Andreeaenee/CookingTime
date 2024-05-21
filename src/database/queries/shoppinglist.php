<?php
// database/queries/shoppinglist.php

namespace App\Database\Queries;

final class ShoppingList
{
    public static function getShoppingListIdQuery(): string
    {
        return "SELECT * FROM shopping_list WHERE id = :id";
    }

    public static function deleteShoppingListQuery(): string
    {
        return "DELETE FROM shopping_list WHERE id = :id";
    }

    public static function addShoppingListQuery(): string
    {
        return "INSERT INTO shopping_list (user_id, name) VALUES (:user_id, :name)";
    }

    public static function getShoppingListQuery(): string
    {
        return "SELECT * FROM shopping_list";
    }

    public static function updateShoppingListQuery(): string
    {
        return "UPDATE shopping_list SET ingredients = :ingredients WHERE id = :id";
    }
}
