<?php
// database/queries/Recipe.php

namespace App\Database\Queries;

final class Recipe
{
    public static function getRecipeByIdQuery(): string
    {
        return "SELECT * FROM recipes WHERE id = :recipeId";
    }

    public static function addRecipeQuery(): string
    {
        return "INSERT INTO recipes (image_id, description, title, steps, category_id, date)
        VALUES
            (:imageId, :description, :title, :steps, :categoryId, :date)";
    }

}
