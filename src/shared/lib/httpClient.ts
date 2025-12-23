import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios'
import type {ApiResponse} from '@shared/types/api.types'
import {APP_CONFIG, STORAGE_KEYS} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'
import {ROUTES} from "@shared/constants/routes.constants"
import {useUiStore} from '@shared/stores/ui.store'

const PUBLIC_API_PATHS = [
  '/auth/login',
  '/auth/register'
]

const httpClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Iniciamos carga global
    const uiStore = useUiStore()
    uiStore.startLoading()

    // 2. Inyectamos token
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    const uiStore = useUiStore()
    uiStore.stopLoading()
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    // Petición exitosa, decrementamos carga
    const uiStore = useUiStore()
    uiStore.stopLoading()
    return response
  },
  async (error: AxiosError<ApiResponse>) => {
    // Petición fallida, decrementamos carga
    const uiStore = useUiStore()
    uiStore.stopLoading()

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Evitar crash si error.config es undefined
    if (!originalRequest) {
      return Promise.reject(error)
    }

    const requestPath = originalRequest.url || ''
    const isPublicRequest = PUBLIC_API_PATHS.some(path => requestPath.endsWith(path))

    // Manejo de 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isPublicRequest) {
        originalRequest._retry = true

        // Limpieza y redirección
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
        storage.remove(STORAGE_KEYS.USER)

        // Redirección forzada (Hard reload para limpiar estado de memoria)
        window.location.href = ROUTES.LOGIN
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
