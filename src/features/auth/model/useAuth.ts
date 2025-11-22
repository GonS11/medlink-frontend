import {useRouter} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import * as authService from '@entities/auth/api/auth.service'
import type {LoginRequest, RegisterRequest} from '@entities/auth/model/auth.types'
import {useNotification} from '@shared/lib/notification'
import {ROUTES} from '@shared/constants/app.constants'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const notification = useNotification()

  const login = async (credentials: LoginRequest) => {
    authStore.setLoading(true)
    authStore.setError(null)

    try {
      const response = await authService.login(credentials)

      authStore.setTokens(response.accessToken, response.refreshToken)
      authStore.setUser(response.user)

      notification.success('Login successful!')

      await router.push(ROUTES.DASHBOARD)

      return response
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed'
      authStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      authStore.setLoading(false)
    }
  }

  const register = async (data: RegisterRequest) => {
    authStore.setLoading(true)
    authStore.setError(null)

    try {
      const response = await authService.register(data)
      notification.success('Registration successful! Please login.')

      await router.push(ROUTES.LOGIN)

      return response
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed'
      authStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      authStore.setLoading(false)
    }
  }

  const logout = () => {
    authStore.clearAuth()
    notification.success('Logged out successfully')
    router.push(ROUTES.LOGIN)
  }

  return {
    login,
    register,
    logout,
    loading: authStore.loading,
    error: authStore.error,
    isAuthenticated: authStore.isAuthenticated,
    currentUser: authStore.currentUser,
  }
}
