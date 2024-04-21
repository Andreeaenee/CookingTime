<?php
// User.php

namespace App\Database\Queries;

final class User
{
    public static function getUserByIdQuery(): string
    {
        return "SELECT * FROM \"user\" WHERE id = :userId";
    }
}
