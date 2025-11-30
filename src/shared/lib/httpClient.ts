import axios, {AxiosInstance, AxiosError, InternalAxiosRequestConfig} from 'axios'
import type {ApiResponse} from '@shared/types/api.types'
import {APP_CONFIG, STORAGE_KEYS, ROUTES} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'
import {ref} from 'vue'

const PUBLIC_API_PATHS = [
  '/auth/login',
  '/auth/register'
]

export const globalLoading = ref(false)
let pendingRequests = 0

const httpClient: AxiosInstance = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: APP_CONFIG.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    pendingRequests++
    globalLoading.value = true

    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    pendingRequests--
    if (pendingRequests === 0) {
      globalLoading.value = false
    }
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    pendingRequests--
    if (pendingRequests === 0) {
      globalLoading.value = false
    }
    return response
  },
  async (error: AxiosError<ApiResponse>) => {
    pendingRequests--
    if (pendingRequests === 0) {
      globalLoading.value = false
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const requestPath = originalRequest.url || ''

    const isPublicRequest = PUBLIC_API_PATHS.some(path => requestPath.endsWith(path))

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (!isPublicRequest) {
        originalRequest._retry = true

        // Clear tokens and redirect to login
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
