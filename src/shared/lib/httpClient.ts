import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios'
import type {ApiResponse} from '@shared/types/api.types'
import {APP_CONFIG, STORAGE_KEYS} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'
import {ROUTES} from "@shared/constants/routes.constants"
import {useUiStore} from '@shared/stores/ui.store'
import {transformFromBackend, transformToBackend} from "@shared/lib/fields-transformers.ts";

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

// ========================================
// REQUEST INTERCEPTOR
// ========================================

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const uiStore = useUiStore()
    uiStore.startLoading()

    // Inyectar token
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // ✅ Transformar TODOS los campos automáticamente
    if (config.data) {
      config.data = transformToBackend(config.data)
    }

    return config
  },
  (error: AxiosError) => {
    const uiStore = useUiStore()
    uiStore.stopLoading()
    return Promise.reject(error)
  }
)

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

httpClient.interceptors.response.use(
  (response) => {
    const uiStore = useUiStore()
    uiStore.stopLoading()

    // ✅ Transformar TODOS los campos automáticamente
    if (response.data?.data) {
      transformFromBackend(response.data.data)
    }

    return response
  },
  async (error: AxiosError<ApiResponse>) => {
    const uiStore = useUiStore()
    uiStore.stopLoading()

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const requestPath = originalRequest.url || ''
    const isPublicRequest = PUBLIC_API_PATHS.some(path => requestPath.endsWith(path))

    // Manejo de 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isPublicRequest) {
        originalRequest._retry = true

        storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
        storage.remove(STORAGE_KEYS.USER)

        window.location.href = ROUTES.LOGIN
      }
    }
    return Promise.reject(error)
  }
)

export default httpClient
