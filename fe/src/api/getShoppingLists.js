import axiosFetch from './Axios';

// Post a shopping list
export async function postShoppingList(data) {
  try {
    const response = await axiosFetch({
      method: 'POST',
      url: 'http://localhost:8080/shoppingLists',
      data: data,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

// Get shopping lists
export async function getShoppingLists() {
  try {
    const response = await axiosFetch({
      method: 'GET',
      url: 'http://localhost:8080/shoppingLists',
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function updateShoppingList(data, id, combine) {
  try {
    const response = await axiosFetch({
      method: 'PUT',
      url: 'http://localhost:8080/shoppingLists/' + id + '?combine=' + combine,
      data: data,
    });
    console.log('Updated List: ', data);
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}

export async function deleteShoppingList(id) {
  try {
    const response = await axiosFetch({
      method: 'DELETE',
      url: 'http://localhost:8080/shoppingLists/' + id,
    });
    return response.responseData;
  } catch (error) {
    console.log('Error: ', error);
    throw error;
  }
}
