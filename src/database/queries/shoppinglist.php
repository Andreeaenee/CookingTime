<?php
// database/queries/shoppinglist.php

namespace App\Database\Queries;

final class ShoppingList
{
    public static function getShoppingListIdQuery(): string
    {
        return "SELECT * FROM shopping_list WHERE id = :id";
    }
}

