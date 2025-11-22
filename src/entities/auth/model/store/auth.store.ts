import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {UserInfo} from '@entities/user/model/user.types'
import {STORAGE_KEYS} from '@shared/constants/app.constants'
import {storage} from '@shared/utils/storage.utils'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(storage.get<UserInfo>(STORAGE_KEYS.USER))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => {
    const token = storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN)
    return !!token && !!user.value
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

  function setTokens(accessToken: string, refreshToken: string) {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken)
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }

  function clearAuth() {
    user.value = null
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
    loading,
    error,
    isAuthenticated,
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
