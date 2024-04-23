<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld');

    $app->get('/favorites', '\App\Services\FavoritesHandler:getFavorite');


    $app->post('/recipe', '\App\Services\RecipeHandler:addRecipe');
    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
       
        $app->get('/byCategory/{categoryId}', '\App\Services\RecipeHandler:getRecipesByCategoryId');
        $app->get('/{recipeId}', '\App\Services\RecipeHandler:getRecipeById');

        $app->get('/byIngredient/{ingredient}', '\App\Services\RecipeHandler:getRecipesByIngredient');
      
    });
  
    $app->get('/users/{userId}', '\App\Services\UserHandler:getUserById');

    return $app;
};
