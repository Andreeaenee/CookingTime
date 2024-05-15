<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld'); 
   
    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
        $app->post('', '\App\Services\RecipeHandler:addRecipe'); // este
        $app->get('', '\App\Services\RecipeHandler:getFilteredRecipes'); // este
        $app->put('/{id}', '\App\Services\RecipeHandler:updateRecipe'); // este
        $app->get('/{id}', '\App\Services\RecipeHandler:getRecipeById'); // este
    });

    // Users routes
    $app->group('/users', function () use ($app) {
        $app->post('/', '\App\Services\UserHandler:addUser'); //slim error 
        $app->put('/{id}', '\App\Services\UserHandler:updateUser'); 
        $app->get('/{id}', '\App\Services\UserHandler:getUserById'); 
        $app->delete('/{id}', '\App\Services\UserHandler:deleteUser'); 
    });

    //Favorites routes  
    $app->group('/favorites', function () use ($app) {
        $app->post('', '\App\Services\FavoritesHandler:addFavorite');
        $app->get('', '\App\Services\FavoritesHandler:getFavorite'); 
        $app->delete('/{id}', '\App\Services\FavoritesHandler:deleteFavorite'); 
    });
    
    $app->group('/shopping_lists', function () use ($app) {
        $app->get('/{id}', '\App\Services\ShoppingListHandler:getShoppingListId'); 
        $app->delete('/{id}', '\App\Services\ShoppingListHandler:deleteShoppingList'); 
    });
   
    return $app;
};
