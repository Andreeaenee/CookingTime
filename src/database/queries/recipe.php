<?php
// database/queries/Recipe.php

namespace App\Database\Queries;

final class Recipe
{
    public static function getRecipeByIdQuery(): string
    {
        return "SELECT recipes.*, ingredients.name AS ingredient_name, recipes_has_ingredients.quantity 
        FROM recipes 
        LEFT JOIN recipes_has_ingredients ON recipes.id = recipes_has_ingredients.id_recipe
        LEFT JOIN ingredients ON recipes_has_ingredients.id_ingredient = ingredients.id WHERE recipes.id = :recipeId";
    }
    public static function getRecipesQuery(): string
    {
        return "SELECT recipes.*, ingredients.name AS ingredient_name, recipes_has_ingredients.quantity 
        FROM recipes 
        LEFT JOIN recipes_has_ingredients ON recipes.id = recipes_has_ingredients.id_recipe
        LEFT JOIN ingredients ON recipes_has_ingredients.id_ingredient = ingredients.id";
    }

    public static function addRecipeQuery(): string
    {
        return "INSERT INTO recipes (image_id, description, title, steps, category_id, date, user_id)
        VALUES
            (:imageId, :description, :title, :steps, :categoryId, :date, :userId)";
    }

    public static function updateRecipeQuery(): string
    {
        return "UPDATE recipes
        SET
            image_id = :imageId,
            description = :description,
            title = :title,
            steps = :steps,
            category_id = :categoryId,
            date = :date
        WHERE id = :recipeId";
    }

    public static function addRecipeIngredientQuery(): string
    {
        return "INSERT INTO recipes_has_ingredients (id_recipe, id_ingredient, quantity) VALUES (:recipeId, :ingredientId, :quantity)";
    }

    public static function updateRecipeIngredientQuery(): string
    {
        return "INSERT INTO recipes_has_ingredients (id_recipe, id_ingredient, quantity) 
                VALUES (:recipeId, :ingredientId, :quantity)
                ON CONFLICT (id_recipe, id_ingredient) 
                DO UPDATE SET quantity = EXCLUDED.quantity";
    }

    public static function getRecipeByUserQuery(): string
    {
        return "SELECT recipes.*, ingredients.name AS ingredient_name, recipes_has_ingredients.quantity 
        FROM recipes 
        LEFT JOIN recipes_has_ingredients ON recipes.id = recipes_has_ingredients.id_recipe
        LEFT JOIN ingredients ON recipes_has_ingredients.id_ingredient = ingredients.id WHERE recipes.user_id = :userId";
    }

}

