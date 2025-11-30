// @features/auth/model/useAuth.ts
import {useRouter} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store.ts'
import * as authService from '@entities/auth/api/auth.service.ts'
import type {LoginRequest, RegisterRequest} from '@entities/auth/model/auth.types.ts'
import {useAsyncAction} from '@shared/composables/useAsyncAction.ts'
import {ROUTES} from '@shared/constants/app.constants.ts'

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
        successMessage: 'Login successful!',
        errorMessage: 'Login failed',
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
        successMessage: 'Registration successful! Please login.',
        errorMessage: 'Registration failed',
        onError: (err) => {
          authStore.setError(err.response?.data?.message || 'Registration failed')
        }
      }
    )
  }

  const logout = async () => {
    authStore.clearAuth()
    await router.push(ROUTES.LOGIN)
    // Nota: La notificación de éxito se puede manejar aquí si quieres
  }

  return {
    login,
    register,
    logout,
    loading,
    error,
    isAuthenticated: authStore.isAuthenticated,
    currentUser: authStore.currentUser,
  }
}
