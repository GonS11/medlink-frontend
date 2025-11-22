import {useUserStore} from '@entities/user/model/store/users.store'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import * as userService from '@entities/user/api/user.service'
import type {UpdateUserRequest, ChangePasswordRequest} from '@entities/user/model/user.types'
import type {PaginationParams} from '@shared/types/api.types'
import {useNotification} from '@shared/lib/notification'

export function useUser() {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const notification = useNotification()

  const fetchCurrentUser = async () => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      const user = await userService.getCurrentUser()
      userStore.setCurrentUserProfile(user)

      // Update auth store with latest user info
      if (authStore.user) {
        authStore.setUser({
          ...authStore.user,
          firstName: user.firstName,
          lastName: user.lastName,
          secondLastName: user.secondLastName,
          fullName: user.fullName,
          phone: user.phone,
          mobilePhone: user.mobilePhone,
          preferredLanguage: user.preferredLanguage,
          isActive: user.isActive,
          emailVerified: user.emailVerified,
          requiresPasswordChange: user.requiresPasswordChange,
        })
      }

      return user
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch user'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const fetchAllUsers = async (params?: PaginationParams) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      const response = await userService.getAllUsers(params)
      userStore.setUsers(response.content)
      userStore.setPagination(response)
      return response
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch users'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const updateUser = async (userId: number, data: UpdateUserRequest) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      const updatedUser = await userService.updateUser(userId, data)

      // Update current user if it's the same
      if (userStore.currentUserProfile?.id === userId) {
        userStore.setCurrentUserProfile(updatedUser)
      }

      // Update in users list
      userStore.updateUserInList(updatedUser)

      notification.success('User updated successfully')
      return updatedUser
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update user'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const deleteUser = async (userId: number) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      await userService.deleteUser(userId)
      userStore.removeUserFromList(userId)
      notification.success('User deleted successfully')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to delete user'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const changePassword = async (userId: number, data: ChangePasswordRequest) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      await userService.changePassword(userId, data)
      notification.success('Password changed successfully')
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to change password'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const lockAccount = async (userId: number, durationMinutes?: number, reason?: string) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      await userService.lockAccount(userId, {durationMinutes, reason})

      const message = durationMinutes
        ? `Account locked for ${durationMinutes} minutes`
        : 'Account locked indefinitely'

      notification.success(message)

      // Refresh user data
      await fetchAllUsers()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to lock account'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  const unlockAccount = async (userId: number) => {
    userStore.setLoading(true)
    userStore.setError(null)

    try {
      await userService.unlockAccount(userId)
      notification.success('Account unlocked successfully')

      // Refresh user data
      await fetchAllUsers()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to unlock account'
      userStore.setError(message)
      notification.error(message)
      throw err
    } finally {
      userStore.setLoading(false)
    }
  }

  return {
    // State
    users: userStore.users,
    currentUserProfile: userStore.currentUserProfile,
    loading: userStore.loading,
    error: userStore.error,
    pagination: userStore.pagination,

    // Actions
    fetchCurrentUser,
    fetchAllUsers,
    updateUser,
    deleteUser,
    changePassword,
    lockAccount,
    unlockAccount,
  }
}
