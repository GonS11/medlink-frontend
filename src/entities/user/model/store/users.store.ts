import {defineStore} from 'pinia'
import {ref, computed} from 'vue' // Importar computed
import type {UserResponse} from '../user.types'
import type {PageResponse} from '@shared/types/api.types'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserResponse[]>([])
  const currentUserProfile = ref<UserResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref<PageResponse<UserResponse> | null>(null)

  const totalUsers = computed(() => pagination.value?.totalElements ?? 0)

  function setUsers(data: UserResponse[]) {
    users.value = data
  }

  function setCurrentUserProfile(data: UserResponse | null) {
    currentUserProfile.value = data
  }

  function setPagination(data: PageResponse<UserResponse> | null) {
    pagination.value = data
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function setError(value: string | null) {
    error.value = value
  }

  function updateUserInList(updatedUser: UserResponse) {
    const index = users.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  function removeUserFromList(userId: number) {
    users.value = users.value.filter(user => user.id !== userId)
  }

  return {
    users,
    currentUserProfile,
    loading,
    error,
    pagination,
    totalUsers,
    setUsers,
    setCurrentUserProfile,
    setPagination,
    setLoading,
    setError,
    updateUserInList,
    removeUserFromList,
  }
})
