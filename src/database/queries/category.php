<?php
// database/queries/category.php

namespace App\Database\Queries;

final class Category
{
    public static function getRecipesByCategoryIdQuery(): string
    {
        return "SELECT * FROM recipes WHERE category_id = :categoryId";
    }
}

