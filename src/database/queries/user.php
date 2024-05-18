<?php
// User.php

namespace App\Database\Queries;

final class User
{
    public static function getUserByIdQuery(): string
    {
        return "SELECT * FROM \"user\" WHERE id = :userId";
    }

    public static function addUserQuery() {
        return 'INSERT INTO "user" (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)';
    }

    public static function updateUserQuery(): string
    {
        return "UPDATE \"user\"
        SET
            first_name = :first_name,
            last_name = :last_name,
            email = :email,
            password = :password
        WHERE id = :userId";
    }

    public static function deleteUserQuery(): string
    {
        return "DELETE FROM \"user\" WHERE id = :userId";
    }
}
