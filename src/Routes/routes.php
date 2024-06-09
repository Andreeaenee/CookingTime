<?php
// routes/routes.php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


return function ($app) {
    
    //add the image middleware
    $app->add(new \App\Services\ImageMiddleware());

    // Group for recipes routes
    $app->group('/recipes', function () use ($app) {
        $app->get('/categories', \App\Services\RecipeHandler::class . ':getCategories');
        $app->get('/ingredients', \App\Services\RecipeHandler::class . ':getIngredients');
        $app->get('/{id}', \App\Services\RecipeHandler::class . ':getRecipeById');
        $app->post('', \App\Services\RecipeHandler::class . ':addRecipe');
        $app->get('', \App\Services\RecipeHandler::class . ':getFilteredRecipes');
        $app->put('/{id}', \App\Services\RecipeHandler::class . ':updateRecipe');
        $app->delete('/{id}', \App\Services\RecipeHandler::class . ':deleteRecipe');
    });

    // Group for users routes
    $app->group('/users', function () use ($app) {
        $app->post('', \App\Services\UserHandler::class . ':addUser');
        $app->put('/{userId}', \App\Services\UserHandler::class . ':updateUser');
        $app->get('/{userId}', \App\Services\UserHandler::class . ':getUserById');
        $app->delete('/{userId}', \App\Services\UserHandler::class . ':deleteUser');
    });

    // Favorites routes  
    $app->group('/favorites', function () use ($app) {
        $app->post('', \App\Services\FavoritesHandler::class . ':addFavorite');
        $app->get('', \App\Services\FavoritesHandler::class . ':getFavorite');
        $app->delete('/{id}', \App\Services\FavoritesHandler::class . ':deleteFavorite');
    });

    // Shopping Lists routes
    $app->group('/shoppingLists', function () use ($app) {
        $app->post('', \App\Services\ShoppingListHandler::class . ':addShoppingList');
        $app->get('', \App\Services\ShoppingListHandler::class . ':getShoppingList');
        $app->put('/{id}', \App\Services\ShoppingListHandler::class . ':updateShoppingList');
        $app->get('/{id}', \App\Services\ShoppingListHandler::class . ':getShoppingListId');
        $app->delete('/{id}', \App\Services\ShoppingListHandler::class . ':deleteShoppingList');
    });

    // Login post
    $app->post('/login', \App\Services\UserHandler::class . ':login');


    $app->post('/logout', '\App\Services\UserHandler:logout');




    return $app; 
};
