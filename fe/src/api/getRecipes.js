import axiosFetch from './Axios';

export async function fetchRecipesData() {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: 'http://localhost:8080/recipes',
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchRecipesCategory() {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: 'http://localhost:8080/recipes/categories',
    });
    
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
  
}

export async function fetchRecipesIngredients() {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: 'http://localhost:8080/recipes/ingredients',
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchRecipesByCategory(category) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/recipes?filter=category&id=${category}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchRecipesByIngredients(ingredient) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/recipes?filter=ingredient&id=${ingredient}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchRecipesByUser(userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: 'http://localhost:8080/recipes?filter=user&id=' + userId,
    });
    
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    console.log('Response:', userId);
    throw error;
  }
}

export async function fetchRecipesByCategoryByUser(category, userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/recipes?filter=category&id=${category}&userId=${userId}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}


export async function fetchRecipesByIngredientsByUser(ingredient, userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/recipes?filter=ingredient&id=${ingredient}&userId=${userId}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchFavoriteRecipesByCategory(category, userId) {
  try {
    // First, fetch the favorite recipe IDs for the user
    const favoriteRecipeIdsResponse = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?userId=${userId}`,
    });

    // Extract the recipe IDs from the response
    const favoriteRecipeIds = favoriteRecipeIdsResponse.data.map(favorite => favorite.recipe_id);

    // Now fetch the details of each favorite recipe using the recipe IDs
    const recipesDetails = await Promise.all(favoriteRecipeIds.map(async (recipeId) => {
      const recipeDetailsResponse = await axiosFetch({
        method: 'GET',
        url: `http://localhost:8080/recipes/${recipeId}`,
      });
      return recipeDetailsResponse.data;
    }));

    // Filter recipes by the provided category
    const recipesByCategory = recipesDetails.filter(recipe => {
      // Check if the recipe belongs to the provided category
      return recipe.category.toLowerCase() === category.toLowerCase();
    });

    return recipesByCategory;
  } catch (error) {
    console.error('Error fetching favorite recipes by category:', error);
    throw error;
  }
}


export async function fetchFavoriteRecipesByIngredients(ingredient, userId) {
  try {
    // First, fetch the favorite recipe IDs for the user
    const favoriteRecipeIdsResponse = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?userId=${userId}`,
    });

    // Extract the recipe IDs from the response
    const favoriteRecipeIds = favoriteRecipeIdsResponse.data.map(favorite => favorite.recipe_id);
    console.log('Favorite recipe IDs:', favoriteRecipeIds);
    // Now fetch the details of each favorite recipe using the recipe IDs
    const recipesDetails = await Promise.all(favoriteRecipeIds.map(async (recipeId) => {
      const recipeDetailsResponse = await axiosFetch({
        method: 'GET',
        url: `http://localhost:8080/recipes/${recipeId}`,
      });
      return recipeDetailsResponse.data;
    }));
    
    // Filter recipes by the provided ingredient
    const recipesByIngredient = recipesDetails.filter(recipe => {
      // Check if the recipe contains the provided ingredient
      return recipe.ingredients.some(ingredientItem => ingredientItem.name.toLowerCase() === ingredient.toLowerCase());
    });

    return recipesByIngredient;
  } catch (error) {
    console.error('Error fetching favorite recipes by ingredients:', error);
    throw error;
  }
}

// Funcția pentru adăugarea unei rețete la favorite
export const addToFavorites = async (recipeId, userId) => {
  try {
    const response = await axiosFetch({
      method: 'POST',
      url: `http://localhost:8080/favorites`,
      data: {
        recipe_id: recipeId,
        user_id: userId, // Înlocuiește cu ID-ul real al utilizatorului
      },
    });
    return response;
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    throw error;
  }
};

// Funcția pentru eliminarea unei rețete din favorite
export const removeFromFavorites = async (recipeId) => {
  try {
    const response = await axiosFetch({
      method: 'DELETE',
      url: `http://localhost:8080/favorites`,
      data: {
        recipe_id: recipeId,
        user_id: 2, // Înlocuiește cu ID-ul real al utilizatorului
      },
    });
    return response;
  } catch (error) {
    console.error('Error removing recipe from favorites:', error);
    throw error;
  }
};

export async function deleteRecipe(recipeId) {
  try {
    const response = await fetch(`http://localhost:8080/recipes/${recipeId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the recipe. Status: ${response.status}`);
    }

    console.log('Recipe deleted successfully');
  } catch (error) {
    console.error('Error deleting the recipe:', error);
    throw error;
  }
}



  
export async function fetchRecipeDetails(id) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/recipes/${id}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchFavoriteRecipeIds(userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?userId=${userId}`,
    });
    return response.responseData.map(favorite => favorite.recipe_id);
    console.log('Favorite recipe IDs:', response);
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchFavoriteRecipesDetails(userId) {
  try {
    const recipeIds = await fetchFavoriteRecipeIds(userId);

    console.log('Recipe IDs:', recipeIds);
    const recipesDetails = await Promise.all(recipeIds.map(async (recipeId) => {
      const recipeDetailsResponse = await axiosFetch({
        method: 'GET',
        url: `http://localhost:8080/recipes/${recipeId}`,
      });
      return recipeDetailsResponse.responseData;
    }));

    return recipesDetails;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function updateRecipeData(recipe) {
  try {
    console.log('Sending recipe data to server:', recipe); // Add this line
    const response = await axiosFetch({
      method: 'PUT',
      url: `http://localhost:8080/recipes/${recipe.id}`,
      data: recipe
    });

    console.log('Server response:', response.responseData); // Add this line
    return response.responseData;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
}