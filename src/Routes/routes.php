<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld'); 
   
    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
        $app->get('/categories', '\App\Services\RecipeHandler:getCategories');
        $app->get('/ingredients', '\App\Services\RecipeHandler:getIngredients');
        $app->get('/{id}', '\App\Services\RecipeHandler:getRecipeById'); 
        $app->post('', '\App\Services\RecipeHandler:addRecipe');
        $app->get('', '\App\Services\RecipeHandler:getFilteredRecipes'); 
        $app->put('/{id}', '\App\Services\RecipeHandler:updateRecipe'); 
        //$app->delete('/{id}', '\App\Services\RecipeHandler:deleteRecipe');
    });
    
    // Users routes
    // Single user routes
    $app->group('/user', function () use ($app) {
        $app->post('/', '\App\Services\UserHandler:addUser'); //slim error FIXed IT
        $app->put('/{userId}', '\App\Services\UserHandler:updateUser'); 
    });

    // Group for users routes
    $app->group('/users', function () use ($app) {
        $app->get('/{userId}', '\App\Services\UserHandler:getUserById'); 
        $app->delete('/{userId}', '\App\Services\UserHandler:deleteUser'); 
    });

    //Favorites routes  
    $app->group('/favorites', function () use ($app) {
        $app->post('', '\App\Services\FavoritesHandler:addFavorite');
        $app->get('', '\App\Services\FavoritesHandler:getFavorite'); 
        $app->delete('/{id}', '\App\Services\FavoritesHandler:deleteFavorite'); 
    });
    
    //Shopping Lists routes
    $app->group('/shopping_lists', function () use ($app) {
        $app->get('/{id}', '\App\Services\ShoppingListHandler:getShoppingListId'); 
        $app->delete('/{id}', '\App\Services\ShoppingListHandler:deleteShoppingList'); 
    });
   
    //login post
    $app->post('/login', '\App\Services\UserHandler:login');
    return $app;
};
