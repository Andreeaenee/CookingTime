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

export async function fetchFavoriteRecipesByUser(userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?userId=${userId}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchFavoriteRecipesByCategory(category, userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?filter=category&id=${category}&userId=${userId}`,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function fetchFavoriteRecipesByIngredients(ingredient, userId) {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: `http://localhost:8080/favorites?filter=ingredient&id=${ingredient}&userId=${userId}`,
       });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
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
