<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

return function ($app) {

    // Setup route using the RouteService
    $app->get('/', '\App\Services\RouteService:helloWorld'); //merge


    $app->group('/recipe', function () use ($app) {
        $app->post('/', '\App\Services\RecipeHandler:addRecipe'); // merge
        $app->put('/{recipeId}', '\App\Services\RecipeHandler:updateRecipe'); //slim error
    });
   
    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
        $app->get('/', '\App\Services\RecipeHandler:getRecipes'); 
        $app->get('/byCategory/{categoryId}', '\App\Services\RecipeHandler:getRecipesByCategoryId'); //merge
        $app->get('/{recipeId}', '\App\Services\RecipeHandler:getRecipeById'); //merge
        $app->get('/byIngredient/{ingredient}', '\App\Services\RecipeHandler:getRecipesByIngredient');  //trebuie adaptat la noul tabel
      
    });

    // Users routes
    $app->group('/user', function () use ($app) {
        $app->post('/', '\App\Services\UserHandler:addUser'); //slim error pt mine
        $app->put('/{userId}', '\App\Services\UserHandler:updateUser'); //merge
    });
    $app->group('/users', function () use ($app) {
        $app->get('/users/{userId}', '\App\Services\UserHandler:getUserById'); //merge
        $app->delete('/{userId}', '\App\Services\UserHandler:deleteUser'); //merge
    });

   
    //Favorites routes
    $app->post('/favorite', '\App\Services\FavoritesHandler:addFavorite');    //merge
    $app->group('/favorites', function () use ($app) {
        $app->get('/', '\App\Services\FavoritesHandler:getFavorite'); //merge
        $app->delete('/{Id}', '\App\Services\FavoritesHandler:deleteFavorite'); //merge
    });
    
    $app->group('/shopping_list', function () use ($app) {
        $app->get('/{id}', '\App\Services\ShoppingListHandler:getShoppingListId'); //merge
        $app->delete('/{id}', '\App\Services\ShoppingListHandler:deleteShoppingList'); //merge
    });
   
    return $app;
};
