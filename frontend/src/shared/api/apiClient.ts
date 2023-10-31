import axios from 'axios'
import { PATH_AUTH, env } from '@/shared/config'
import { removeFieldsFromLocalStorage, setLocalStorageValues } from '@/shared/lib/hooks/useLocalStorage'
import { $apiAccountsApi } from '.'

const refreshAuthToken = async (refresh: string) => {
  const response = await $apiAccountsApi.accountsAuthTokenRefreshCreate({ refresh })
  return response
}

// Create an Axios instance
const ApiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
ApiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
ApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token') as string
        if (!refreshToken || refreshToken === 'undefined') {
          window.location.href = PATH_AUTH.logIn
          removeFieldsFromLocalStorage(['access_token', 'refresh_token'])
          // No refresh token available, reject the promise
          return Promise.reject(error)
        }

        // Send a request to refresh tokens
        const response = await refreshAuthToken(refreshToken)

        if (response.status === 200) {
          // Update access_token and refresh_token in local storage

          setLocalStorageValues({
            access_token: response.data.access,
            refresh_token: response.data.refresh,
          })

          // Update the Authorization header with the new access token
          originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access

          // Retry the original request with the updated access token
          return ApiClient(originalRequest)
        } else {
          // Unable to refresh tokens, reject the promise
          return Promise.reject(error)
        }
      } catch (err) {
        // An error occurred while refreshing tokens, reject the promise
        return Promise.reject(error)
      }
    }

    // For other errors, reject the promise with the error
    return Promise.reject(error)
  },
)

export default ApiClient
