// @features/user/model/useUser.ts
import {useUserStore} from '@entities/user/model/store/users.store'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import * as userService from '@entities/user/api/user.service'
import type {UpdateUserRequest, ChangePasswordRequest} from '@entities/user/model/user.types'
import type {PaginationParams} from '@shared/types/api.types'
import {useAsyncAction} from '@shared/composables/useAsyncAction'

export function useUser() {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const {loading, error, execute} = useAsyncAction()

  const fetchCurrentUser = async () => {
    return execute(
      async () => {
        const user = await userService.getCurrentUser()
        userStore.setCurrentUserProfile(user)

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
      },
      {
        errorMessage: 'Failed to fetch user',
        showSuccessNotification: false,
      }
    )
  }

  const fetchAllUsers = async (params?: PaginationParams) => {
    return execute(
      async () => {
        const response = await userService.getAllUsers(params)
        userStore.setUsers(response.content)
        userStore.setPagination(response)
        return response
      },
      {
        errorMessage: 'Failed to fetch users',
        showSuccessNotification: false,
      }
    )
  }

  const updateUser = async (userId: number, data: UpdateUserRequest) => {
    return execute(
      async () => {
        const updatedUser = await userService.updateUser(userId, data)

        if (userStore.currentUserProfile?.id === userId) {
          userStore.setCurrentUserProfile(updatedUser)
        }

        userStore.updateUserInList(updatedUser)
        return updatedUser
      },
      {
        successMessage: 'User updated successfully',
        errorMessage: 'Failed to update user',
      }
    )
  }

  const deleteUser = async (userId: number) => {
    return execute(
      async () => {
        await userService.deleteUser(userId)
        userStore.removeUserFromList(userId)
      },
      {
        successMessage: 'User deleted successfully',
        errorMessage: 'Failed to delete user',
      }
    )
  }

  const changePassword = async (userId: number, data: ChangePasswordRequest) => {
    return execute(
      () => userService.changePassword(userId, data),
      {
        successMessage: 'Password changed successfully',
        errorMessage: 'Failed to change password',
      }
    )
  }

  const lockAccount = async (userId: number, durationMinutes?: number, reason?: string) => {
    return execute(
      async () => {
        await userService.lockAccount(userId, {durationMinutes, reason})
        await fetchAllUsers()
      },
      {
        successMessage: durationMinutes
          ? `Account locked for ${durationMinutes} minutes`
          : 'Account locked indefinitely',
        errorMessage: 'Failed to lock account',
      }
    )
  }

  const unlockAccount = async (userId: number) => {
    return execute(
      async () => {
        await userService.unlockAccount(userId)
        await fetchAllUsers()
      },
      {
        successMessage: 'Account unlocked successfully',
        errorMessage: 'Failed to unlock account',
      }
    )
  }

  return {
    // State
    users: userStore.users,
    currentUserProfile: userStore.currentUserProfile,
    loading,
    error,
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
