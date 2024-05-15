<?php
// database/queries/Ingredient.php

namespace App\Database\Queries;

final class Ingredient
{
    public static function getRecipesByIngredientQuery(): string
    {
        return "SELECT recipes.*, ingredients.name AS ingredient_name, recipes_has_ingredients.quantity 
        FROM recipes 
        LEFT JOIN recipes_has_ingredients ON recipes.id = recipes_has_ingredients.id_recipe
        LEFT JOIN ingredients ON recipes_has_ingredients.id_ingredient = ingredients.id WHERE ingredients.id = :ingredient";
    }

    public static function getIngredientsByRecipeIdQuery(): string
    {
        return "SELECT ingredients.name, recipes_has_ingredients.quantity
        FROM ingredients
        JOIN recipes_has_ingredients ON ingredients.id = recipes_has_ingredients.id_ingredient
        WHERE recipes_has_ingredients.id_recipe = :recipeId;
        ";
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
