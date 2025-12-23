import {useRouter} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import * as authService from '@entities/auth/api/auth.service'
import type {LoginRequest, RegisterRequest} from '@entities/auth/model/types/auth.types'
import {useAsyncAction} from '@shared/composables/useAsyncAction'
import {ROUTES} from "@shared/constants/routes.constants.ts";

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const {loading, error, execute} = useAsyncAction()

  const login = async (credentials: LoginRequest) => {
    return execute(
      async () => {
        const response = await authService.login(credentials)

        authStore.setTokens(response.accessToken, response.refreshToken)
        authStore.setUser(response.user)

        await router.push(ROUTES.DASHBOARD)

        return response
      },
      {
        successMessage: 'auth.loginSuccess',
        errorMessage: 'auth.loginError',
        onError: (err) => {
          authStore.setError(err.response?.data?.message || 'Login failed')
        }
      }
    )
  }

  const register = async (data: RegisterRequest) => {
    return execute(
      async () => {
        const response = await authService.register(data)
        await router.push(ROUTES.LOGIN)
        return response
      },
      {
        successMessage: 'auth.registerSuccess',
        errorMessage: 'auth.registerError',
        onError: (err) => {
          authStore.setError(err.response?.data?.message || 'Registration failed')
        }
      }
    )
  }

  const logout = async () => {
    authStore.clearAuth()
    await router.push(ROUTES.LOGIN)
  }

  return {
    // Actions
    login,
    register,
    logout,

    // State
    loading,
    error,
    isAuthenticated: authStore.isAuthenticated,
    currentUser: authStore.currentUser,
    userRole: authStore.userRole,
  }
}
