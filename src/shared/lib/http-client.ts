import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios'
import type {ApiResponse} from '@shared/types/api.types'
import {APP_CONFIG, STORAGE_KEYS, ROUTES} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle errors
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ApiResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // Clear tokens and redirect to login
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
      storage.remove(STORAGE_KEYS.USER)

      window.location.href = ROUTES.LOGIN
    }

    return Promise.reject(error)
  }
)

export default httpClient
