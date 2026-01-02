import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useUserCrud} from '@entities/user/model/composables/useUserCrud'
import {useUserAdmin} from '@entities/user/model/composables/useUserAdmin'
import {useUserPermissions} from './useUserPermissions'
import {useUserTableConfig} from './useUserTableConfig'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import type {UserResponse} from '@entities/user/model/types/user.types'
import type {RegisterRequest} from '@entities/auth/model/types/auth.types'
import type {PaginationParams} from '@shared/types/api.types'
import type {SortConfig} from "@shared/types/table.types.ts"

export function useUserManagement() {
  const {t} = useI18n()
  const crud = useUserCrud()
  const admin = useUserAdmin()
  const permissions = useUserPermissions()
  const tableConfig = useUserTableConfig()
  const {confirm} = useConfirm()

  // --- Modales ---
  const viewModal = useModal<UserResponse>()
  const editModal = useModal<UserResponse>()
  const createModal = useModal()
  const lockModal = useModal<UserResponse>()

  // --- Estado Local ---
  const selectedUser = ref<UserResponse | null>(null)
  const sortConfig = ref<SortConfig | null>(null)

  // --- Computed Permissions ---
  const canCreate = computed(() => permissions.canCreateUsers.value)
  const canEdit = computed(() => permissions.canEditUsers.value)
  const canDelete = computed(() => permissions.canDeleteUsers.value)
  const canLock = computed(() => permissions.canLockUsers.value)

  // --- Helper para refetch ---
  const refetchCurrentPage = async () => {
    const params: PaginationParams = {
      page: crud.pagination.value?.number ?? 0,
      size: crud.currentPageSize.value
    }

    if (sortConfig.value) {
      params.sortBy = sortConfig.value.key
      params.direction = sortConfig.value.order === 'asc' ? 'ASC' : 'DESC'
    }

    await crud.fetchAll(params)
  }

  // --- Handlers ---
  const handleView = (user: UserResponse) => {
    selectedUser.value = user
    viewModal.open(user, {
      title: t('entities.user.view'),
      size: 'lg'
    })
  }

  const handleEdit = (user: UserResponse) => {
    if (!permissions.canEditUser(user.role)) {
      console.warn(`No tienes permiso para editar usuarios con rol ${user.role}`)
      return
    }

    selectedUser.value = user
    editModal.open(user, {
      title: t('entities.user.edit'),
      size: 'lg'
    })
  }

  const handleDelete = async (user: UserResponse) => {
    if (!permissions.canDeleteUser(user.role)) {
      console.warn(`No tienes permiso para eliminar usuarios con rol ${user.role}`)
      return
    }

    const confirmed = await confirm({
      title: t('common.confirm'),
      message: t('entities.user.deleteConfirm', {name: user.fullName}),
      variant: 'danger',
      confirmText: t('common.delete'),
    })

    if (confirmed) {
      const result = await crud.remove(user.id)
      if (result) {
        await refetchCurrentPage()
      }
    }
  }

  const handleLock = (user: UserResponse) => {
    if (!permissions.canLockUser(user.role)) {
      console.warn(`No tienes permiso para bloquear usuarios con rol ${user.role}`)
      return
    }

    selectedUser.value = user
    lockModal.open(user, {
      title: t('entities.user.lock.action'),
      size: 'md'
    })
  }

  const handleUnlock = async (user: UserResponse) => {
    if (!canLock.value) {
      console.warn('No tienes permiso para desbloquear usuarios')
      return
    }

    const confirmed = await confirm({
      title: t('common.confirm'),
      message: t('entities.user.unlockConfirm', {name: user.fullName}),
      variant: 'warning',
      confirmText: t('entities.user.unlock'),
    })

    if (confirmed) {
      const result = await admin.unlockUser(user.id)
      if (result) {
        await refetchCurrentPage()
      }
    }
  }

  const handleCreate = () => {
    if (!canCreate.value) {
      console.warn('No tienes permiso para crear usuarios')
      return
    }

    createModal.open(undefined, {
      title: t('entities.user.create'),
      size: 'lg'
    })
  }

  // --- Submit Handlers ---
  const handleSubmitCreate = async (data: RegisterRequest) => {
    if (!canCreate.value) {
      console.warn('❌ [handleSubmitCreate] No permission to create')
      return
    }

    const result = await crud.create(data)

    if (result) {
      createModal.close()
      await refetchCurrentPage()
    }
  }

  const handleSubmitEdit = async (data: any) => {
    if (!selectedUser.value) {
      console.warn('❌ [handleSubmitEdit] No user selected')
      return
    }

    if (!permissions.canEditUser(selectedUser.value.role)) {
      console.warn(`❌ [handleSubmitEdit] No permission for role ${selectedUser.value.role}`)
      return
    }

    const result = await crud.update(selectedUser.value.id, data)
    if (result) {
      editModal.close()
    }
  }

  const handleSubmitLock = async (data: { durationMinutes?: number; reason?: string }) => {
    if (!selectedUser.value) {
      console.warn('No hay usuario seleccionado para bloquear')
      return
    }

    if (!permissions.canLockUser(selectedUser.value.role)) {
      console.warn(`No tienes permiso para bloquear usuarios con rol ${selectedUser.value.role}`)
      return
    }

    const result = await admin.lockUser(selectedUser.value.id, data)
    if (result) {
      lockModal.close()
      await refetchCurrentPage()
    }
  }

  // --- Pagination ---
  const handlePageChange = async (page: number) => {
    const params: PaginationParams = {
      page,
      size: crud.currentPageSize.value
    }

    if (sortConfig.value) {
      params.sortBy = sortConfig.value.key
      params.direction = sortConfig.value.order === 'asc' ? 'ASC' : 'DESC'
    }

    await crud.fetchAll(params)
  }

  // --- Sorting ---
  const handleSort = async (config: SortConfig) => {
    sortConfig.value = config

    const params: PaginationParams = {
      page: 0,
      size: crud.currentPageSize.value,
      sortBy: config.key,
      direction: config.order === 'asc' ? 'ASC' : 'DESC'
    }

    await crud.fetchAll(params)
  }

  // --- Initial Load ---
  const initialize = async () => {
    await crud.fetchAll({page: 0, size: 20})
  }

  return {
    // Data
    users: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,

    // Permissions
    permissions: {
      canCreate,
      canEdit,
      canDelete,
      canLock,
    },

    // Table Config
    columns: tableConfig.visibleColumns,

    // Modals
    viewModal,
    editModal,
    createModal,
    lockModal,
    selectedUser,

    // Handlers
    handleView,
    handleEdit,
    handleDelete,
    handleLock,
    handleUnlock,
    handleCreate,
    handleSubmitCreate,
    handleSubmitEdit,
    handleSubmitLock,
    handlePageChange,
    handleSort,

    // Lifecycle
    initialize,
  }
}
