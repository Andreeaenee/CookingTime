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

    public static function getRecipesByIngredientQueryy(): string
    {
        return "
        SELECT 
        recipes.id, 
        recipes.title, 
        recipes.description, 
        recipes.steps, 
        recipes.category_id, 
        recipes.date, 
        recipes.user_id, 
        ingredients.name AS ingredient_name, 
        recipes_has_ingredients.quantity
    FROM 
        recipes
    INNER JOIN 
        recipes_has_ingredients ON recipes.id = recipes_has_ingredients.recipe_id
    INNER JOIN 
        ingredients ON recipes_has_ingredients.ingredient_id = ingredients.id
    WHERE 
        ingredients.name LIKE :ingredient
        ";
    }
    
    
    
    
}
