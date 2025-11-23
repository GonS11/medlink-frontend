import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {UserInfo} from '@entities/user/model/user.types'
import {STORAGE_KEYS} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(storage.get<UserInfo>(STORAGE_KEYS.USER))
  const loading = ref(false)
  const error = ref<string | null>(null)
  const accessToken = ref<string | null>(storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN))

  const isAuthenticated = computed(() => {
    return !!accessToken.value && !!user.value
  })

  const currentUser = computed(() => user.value)
  const userRole = computed(() => user.value?.role)

  function setUser(userData: UserInfo | null) {
    user.value = userData
    if (userData) {
      storage.set(STORAGE_KEYS.USER, userData)
    } else {
      storage.remove(STORAGE_KEYS.USER)
    }
  }

  function setTokens(newAccessToken: string, refreshToken: string) {
    accessToken.value = newAccessToken
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken)
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }

  function clearAuth() {
    user.value = null
    accessToken.value = null
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
    storage.remove(STORAGE_KEYS.USER)
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(value: string | null) {
    error.value = value
  }

  function initialize() {
    if (!isAuthenticated.value) {
      clearAuth()
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    currentUser,
    userRole,
    setUser,
    setTokens,
    clearAuth,
    setLoading,
    setError,
    initialize,
  }
})
