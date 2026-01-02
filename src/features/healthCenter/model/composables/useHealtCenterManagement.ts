import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useHealthCenterCrud} from '@entities/healthCenter/model/composables/useHealthCenterCrud'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import type {
  HealthCenterResponse,
  CreateHealthCenterRequest,
  UpdateHealthCenterRequest
} from '@entities/healthCenter/model/types/healthCenter.types'
import type {PaginationParams} from '@shared/types/api.types'
import type {SortConfig} from '@shared/types/table.types'
import {useHealthCenterPermissions} from "@features/healthCenter/model/composables/useHealtCenterPermissions.ts";
import {useHealthCenterTableConfig} from "@features/healthCenter/model/composables/useHealtCenterTableConfig.ts";

export function useHealthCenterManagement() {
  const {t} = useI18n()
  const crud = useHealthCenterCrud()
  const permissions = useHealthCenterPermissions()
  const tableConfig = useHealthCenterTableConfig()
  const {confirm} = useConfirm()

  // --- Modales ---
  const viewModal = useModal<HealthCenterResponse>()
  const editModal = useModal<HealthCenterResponse>()
  const createModal = useModal()

  // --- Estado Local ---
  const selectedHealthCenter = ref<HealthCenterResponse | null>(null)
  const sortConfig = ref<SortConfig | null>(null)

  // --- Computed Permissions ---
  const canCreate = computed(() => permissions.canCreateHealthCenter())
  const canManage = computed(() => permissions.canManageHealthCenters.value)
  const canViewStatistics = computed(() => permissions.canViewHealthCenterStatistics())
  const canViewOperational = computed(() => permissions.canViewOperationalInfo())

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
  const handleView = (healthCenter: HealthCenterResponse) => {
    selectedHealthCenter.value = healthCenter
    viewModal.open(healthCenter, {
      title: t('entities.healthCenter.view'),
      size: 'lg'
    })
  }

  const handleEdit = (healthCenter: HealthCenterResponse) => {
    if (!permissions.canEditHealthCenter()) {
      return
    }

    selectedHealthCenter.value = healthCenter
    editModal.open(healthCenter, {
      title: t('entities.healthCenter.edit'),
      size: 'lg'
    })
  }

  const handleDelete = async (healthCenter: HealthCenterResponse) => {
    if (!permissions.canDeleteHealthCenter()) {
      console.warn('No tienes permiso para eliminar este centro de salud')
      return
    }

    // Mostrar advertencia especial para hospitales
    const isHospital = healthCenter.type === 'HOSPITAL'
    const warningMessage = isHospital
      ? t('entities.healthCenter.deleteHospitalWarning', {name: healthCenter.name})
      : t('entities.healthCenter.deleteConfirm', {name: healthCenter.name})

    const confirmed = await confirm({
      title: t('common.confirm'),
      message: warningMessage,
      variant: 'danger',
      confirmText: t('common.delete'),
    })

    if (confirmed) {
      const result = await crud.remove(healthCenter.id)
      if (result) {
        await refetchCurrentPage()
      }
    }
  }

  const handleCreate = () => {
    if (!canCreate.value) {
      console.warn('No tienes permiso para crear centros de salud')
      return
    }

    createModal.open(undefined, {
      title: t('entities.healthCenter.create'),
      size: 'lg'
    })
  }

  const handleViewStatistics = (healthCenter: HealthCenterResponse) => {
    if (!permissions.canViewHealthCenterStatistics()) {
      console.warn('No tienes permiso para ver estadísticas de este centro')
      return
    }

    // TODO: Abrir modal o navegar a página de estadísticas
    console.log('Ver estadísticas de:', healthCenter.name)
  }

  const handleManageDepartments = (healthCenter: HealthCenterResponse) => {
    if (!permissions.canManageDepartments()) {
      console.warn('No tienes permiso para gestionar departamentos de este centro')
      return
    }

    // TODO: Navegar a gestión de departamentos
    console.log('Gestionar departamentos de:', healthCenter.name)
  }

  const handleExportData = async (healthCenter?: HealthCenterResponse) => {
    if (!permissions.canExportHealthCenterData()) {
      console.warn('No tienes permiso para exportar datos')
      return
    }

    // TODO: Implementar exportación
    console.log('Exportar datos:', healthCenter ? healthCenter.name : 'todos')
  }

  // --- Submit Handlers ---
  const handleSubmitCreate = async (data: CreateHealthCenterRequest) => {
    if (!canCreate.value) {
      console.warn('No tienes permiso para crear centros de salud')
      return
    }

    const result = await crud.create(data)
    if (result) {
      createModal.close()
      await refetchCurrentPage()
    }
  }

  const handleSubmitEdit = async (data: UpdateHealthCenterRequest) => {
    if (!selectedHealthCenter.value) {
      console.warn('No hay centro seleccionado para editar')
      return
    }

    if (!permissions.canEditHealthCenter()) {
      console.warn('No tienes permiso para editar este centro de salud')
      return
    }

    const result = await crud.update(selectedHealthCenter.value.id, data)
    if (result) {
      editModal.close()
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
    healthCenters: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,

    // Permissions
    permissions: {
      canCreate,
      canManage,
      canViewStatistics,
      canViewOperational,
    },

    // Table Config
    columns: tableConfig.visibleColumns,

    // Modals
    viewModal,
    editModal,
    createModal,
    selectedHealthCenter,

    // Handlers
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleViewStatistics,
    handleManageDepartments,
    handleExportData,
    handleSubmitCreate,
    handleSubmitEdit,
    handlePageChange,
    handleSort,

    // Lifecycle
    initialize,
  }
}
