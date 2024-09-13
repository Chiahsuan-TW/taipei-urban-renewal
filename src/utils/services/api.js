import axios from 'axios'

const apiService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 2 * 60 * 1000
})

apiService.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

apiService.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

export default apiService
