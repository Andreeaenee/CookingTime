import axiosFetch from './Axios'

export async function fetchRecipesData() {
    try {
      const response = await axiosFetch({
        method: 'GET',
        url: "http://localhost:3001/recipes",
      })
      console.log('Response: ', response)
      return response
    } catch (error) {
      console.log('Error: ', error)
      throw error
    }
  }