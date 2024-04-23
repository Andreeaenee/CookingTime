<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld');


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

    // Users routes
    $app->group('/user', function () use ($app) {
        $app->post('/', '\App\Services\UserHandler:addUser');
        $app->put('/{userId}', '\App\Services\UserHandler:updateUser');
    });
    $app->group('/users', function () use ($app) {
        $app->get('/users/{userId}', '\App\Services\UserHandler:getUserById');
        $app->delete('/{userId}', '\App\Services\UserHandler:deleteUser');
    });

   
    //Favorites routes
    $app->post('/favorite', '\App\Services\FavoritesHandler:addFavorite');    
    $app->group('/favorites', function () use ($app) {
        $app->get('/', '\App\Services\FavoritesHandler:getFavorite');
        $app->delete('/{Id}', '\App\Services\FavoritesHandler:deleteFavorite');
    });
    
    $app->group('/shopping_list', function () use ($app) {
        $app->get('/{id}', '\App\Services\ShoppingListHandler:getShoppingListId');
        $app->delete('/{id}', '\App\Services\ShoppingListHandler:deleteShoppingList');
    });
   
    return $app;
};
