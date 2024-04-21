<?php
// database/queries/Ingredient.php

namespace App\Database\Queries;

final class Ingredient
{
    public static function getRecipesByIngredientQuery(): string
    {
        return "SELECT * FROM recipes WHERE list_ingredients LIKE '%' || :ingredient || '%'";
    }
}
