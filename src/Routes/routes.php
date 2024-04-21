<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld');

    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
        // Setup route for searching recipes by category
        $app->get('/byCategory/{categoryId}', '\App\Services\RecipeHandler:getRecipesByCategoryId');

        // Setup route for getting recipe by ID
        $app->get('/{recipeId}', '\App\Services\RecipeHandlerId:getRecipeById');
    });

    return $app;
};
