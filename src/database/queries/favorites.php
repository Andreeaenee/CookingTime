<?php
// database/queries/favorites.php

namespace App\Database\Queries;

final class Favorites
{
    public static function getFavoritesQuery(): string
    {
        return "SELECT * FROM favorites";
    }
    public static function getFavoriteRecipeIdsQuery(): string
    {
        return "SELECT recipe_id FROM favorites WHERE user_id = :userId";
    }
    public static function addFavoriteQuery(): string
    {
        return "INSERT INTO favorites (user_id, recipe_id)
        VALUES
            (:userId, :recipeId)";
    }

    public static function checkFavoriteQuery(): string
    {
        return "SELECT * FROM favorites WHERE user_id = :userId AND recipe_id = :recipeId";
    }

    public static function deleteFavoriteQuery(): string
    {
        return "DELETE FROM favorites WHERE id = :Id";
    }
}

