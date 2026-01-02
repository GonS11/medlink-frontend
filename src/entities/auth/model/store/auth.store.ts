import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {UserInfo} from '@entities/user/model/types/user.types'
import {storage} from '@shared/lib/storage.ts'
import {STORAGE_KEYS} from "@/app";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserInfo | null>(storage.get<UserInfo>(STORAGE_KEYS.USER))
  const accessToken = ref<string | null>(storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN))
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
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
    error.value = null
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN)
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN)
    storage.remove(STORAGE_KEYS.USER)
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
    // State
    user,
    accessToken,
    error,

    // Computed
    isAuthenticated,
    currentUser,
    userRole,

    // Actions
    setUser,
    setTokens,
    clearAuth,
    setError,
    initialize,
  }
})
