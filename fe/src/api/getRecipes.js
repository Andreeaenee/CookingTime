import axiosFetch from './Axios'

export async function fetchRecipesData() {
    try {
      const response = await axiosFetch({
        method: 'GET',
        url: "http://localhost:8080/recipes/",
      })
      return response.responseData
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }