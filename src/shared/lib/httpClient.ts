import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios'
import type {ApiResponse} from '@shared/types/api.types'
import {APP_CONFIG, STORAGE_KEYS, ROUTES} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'

const PUBLIC_API_PATHS = [
  '/auth/login',
  '/auth/register'
]

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
    const requestPath = originalRequest.url || '' // Obtenemos la ruta de la solicitud (e.g., '/auth/login')

    // 🚨 Nueva condición: No redirigir si la solicitud fallida fue a una ruta pública (Login/Register)
    const isPublicRequest = PUBLIC_API_PATHS.some(path => requestPath.endsWith(path))

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {

      // 1. Si NO es una solicitud pública, forzamos el cierre de sesión y la recarga
      if (!isPublicRequest) {
        originalRequest._retry = true

        // Clear tokens and redirect to login
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
        storage.remove(STORAGE_KEYS.USER)

        window.location.href = ROUTES.LOGIN
      }

      // 2. Si ES una solicitud pública (login fallido), solo rechazamos la promesa.
      // La notificación y el manejo del error serán gestionados por el try/catch de useAuth.
    }

    // Siempre rechazamos la promesa para que el error llegue al bloque try/catch en useAuth/login
    return Promise.reject(error)
  }
)

export default httpClient
