<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld');

    // Setup route for searching recipes by category
    $app->get('/recipes/byCategory/{categoryId}', '\App\Services\RecipeHandler:getRecipesByCategoryId');
    $app->get('/favorites', '\App\Services\FavoritesHandler:getFavorite');
    return $app;
};
