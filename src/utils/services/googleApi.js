import axios from 'axios'

const googleApiService = axios.create({
  baseURL: import.meta.env.VITE_APP_GOOGLE_API_URL,
  timeout: 2 * 60 * 1000
})

googleApiService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

googleApiService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default googleApiService
