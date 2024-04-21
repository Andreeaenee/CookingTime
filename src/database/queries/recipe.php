<?php
// database/queries/Recipe.php

namespace App\Database\Queries;

final class Recipe
{
    public static function getRecipeByIdQuery(): string
    {
        return "SELECT * FROM recipes WHERE id = :recipeId";
    }
}
