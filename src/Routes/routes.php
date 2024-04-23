<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld');

    $app->get('/favorites', '\App\Services\FavoritesHandler:getFavorite');


    $app->group('/recipe', function () use ($app) {
        $app->post('/', '\App\Services\RecipeHandler:addRecipe');
        $app->put('/{recipeId}', '\App\Services\RecipeHandler:updateRecipe');
    });
   
    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
       
        $app->get('/byCategory/{categoryId}', '\App\Services\RecipeHandler:getRecipesByCategoryId');
        $app->get('/{recipeId}', '\App\Services\RecipeHandler:getRecipeById');

        $app->get('/byIngredient/{ingredient}', '\App\Services\RecipeHandler:getRecipesByIngredient');
      
    });
  
    $app->get('/users/{userId}', '\App\Services\UserHandler:getUserById');

    $app->get('/shopping_list/{id}', '\App\Services\ShoppingListHandler:getShoppingListId');
    return $app;
};
