import axios from 'axios'

export default function axiosFetch(options) {
  if (!options.headers) {
    options.headers = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }

  if (!options.method) {
    options.method = 'get'
  }

  return axios(options)
    .then((response) => {
      return { statusCode: response.status, responseData: response.data }
    })
    .catch((error) => {
      console.error('Error:', error)

      throw error
    })
}
