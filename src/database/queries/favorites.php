<?php
// database/queries/favorites.php

namespace App\Database\Queries;

final class Favorites
{
    public static function getFavoritesQuery(): string
    {
        return "SELECT * FROM favorites";
    }
}

