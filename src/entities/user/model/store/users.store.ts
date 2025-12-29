import {defineStore} from 'pinia'
import {ref, computed} from 'vue'
import type {UserResponse} from '../types/user.types'
import type {PageResponse} from '@shared/types/api.types'
import * as userService from '@entities/user/api/user.service.ts'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserResponse[]>([])
  const currentUserProfile = ref<UserResponse | null>(null)
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

  function updateUserInList(updatedUser: UserResponse) {
    const index = users.value.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  }

  function removeUserFromList(userId: number) {
    users.value = users.value.filter(user => user.id !== userId)
  }

  // ✅ Acción asíncrona para cargar usuarios
  async function getAllUsers(page = 0, size = 10) {
    try {
      // Usamos el servicio importado.
      // Nota: Pasamos params como objeto { page, size }
      const response = await userService.getAllUsers({page, size})

      users.value = response.content
      pagination.value = response
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  return {
    users,
    currentUserProfile,
    pagination,
    totalUsers,
    setUsers,
    setCurrentUserProfile,
    setPagination,
    updateUserInList,
    removeUserFromList,
    getAllUsers
  }
})
