<?php
// database/queries/Ingredient.php

namespace App\Database\Queries;

final class Ingredient
{
    public static function getRecipesByIngredientQuery(): string
    {
        return "SELECT * FROM recipes WHERE list_ingredients LIKE '%' || :ingredient || '%'";
    }

    public static function checkIngredientQuery(): string
    {
        return "SELECT id FROM ingredients WHERE name = :name";
    }

    public static function addIngredientQuery(): string
    {
        return "INSERT INTO ingredients (name) VALUES (:name)";
    }
}
