import {ref, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useMedicalSpecialityCrud} from '@entities/medicalSpeciality/model/composables/useMedicalSpecialityCrud'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import type {
  MedicalSpecialityResponse,
  CreateMedicalSpecialityRequest,
  UpdateMedicalSpecialityRequest
} from '@entities/medicalSpeciality/model/types/medicalSpeciality.types'
import type {PaginationParams} from '@shared/types/api.types'
import {
  useMedicalSpecialityPermissions
} from '@features/medicalSpeciality/model/composables/useMedicalSpecialityPermissions'

export function useMedicalSpecialityManagement() {
  const {t} = useI18n()
  const crud = useMedicalSpecialityCrud()
  const permissions = useMedicalSpecialityPermissions()
  const {confirm} = useConfirm()

  // --- Modales ---
  const editModal = useModal<MedicalSpecialityResponse>()
  const createModal = useModal()

  // --- Estado Local ---
  const selectedMedicalSpeciality = ref<MedicalSpecialityResponse | null>(null)

  // --- Computed Permissions ---
  const canCreate = computed(() => permissions.canCreateMedicalSpeciality())
  const canManage = computed(() => permissions.canManageMedicalSpecialities.value)

  // --- Helper para refetch ---
  const refetchCurrentPage = async () => {
    const params: PaginationParams = {
      page: crud.pagination.value?.number ?? 0,
      size: crud.currentPageSize.value
    }

    await crud.fetchAll(params)
  }

  // --- Handlers ---
  const handleEdit = (medicalSpeciality: MedicalSpecialityResponse) => {
    if (!permissions.canEditMedicalSpeciality(medicalSpeciality.id)) {
      return
    }

    selectedMedicalSpeciality.value = medicalSpeciality
    editModal.open(medicalSpeciality, {
      title: t('entities.medicalSpeciality.edit'),
      size: 'lg'
    })
  }

  const handleDelete = async (medicalSpeciality: MedicalSpecialityResponse) => {
    if (!permissions.canDeleteMedicalSpeciality(medicalSpeciality.id)) {
      console.warn('No tienes permiso para eliminar esta especialidad médica')
      return
    }

    const confirmed = await confirm({
      title: t('common.confirm'),
      message: t('entities.medicalSpeciality.deleteConfirm', {name: medicalSpeciality.name}),
      variant: 'danger',
      confirmText: t('common.delete'),
    })

    if (confirmed) {
      const result = await crud.remove(medicalSpeciality.id)
      if (result) {
        await refetchCurrentPage()
      }
    }
  }

  const handleCreate = () => {
    if (!canCreate.value) {
      console.warn('No tienes permiso para crear especialidades médicas')
      return
    }

    createModal.open(undefined, {
      title: t('entities.medicalSpeciality.create'),
      size: 'lg'
    })
  }

  // --- Submit Handlers ---
  const handleSubmitCreate = async (data: CreateMedicalSpecialityRequest) => {
    if (!canCreate.value) {
      console.warn('No tienes permiso para crear especialidades médicas')
      return
    }

    const result = await crud.create(data)
    if (result) {
      createModal.close()
      await refetchCurrentPage()
    }
  }

  const handleSubmitEdit = async (data: UpdateMedicalSpecialityRequest) => {
    if (!selectedMedicalSpeciality.value) {
      console.warn('No hay especialidad seleccionada para editar')
      return
    }

    if (!permissions.canEditMedicalSpeciality(selectedMedicalSpeciality.value.id)) {
      console.warn('No tienes permiso para editar esta especialidad médica')
      return
    }

    const result = await crud.update(selectedMedicalSpeciality.value.id, data)
    if (result) {
      editModal.close()
      await refetchCurrentPage()
    }
  }

  // --- Pagination ---
  const handleLoadMore = async () => {
    if (crud.pagination.value?.last) return

    const nextPage = (crud.pagination.value?.number ?? 0) + 1
    const params: PaginationParams = {
      page: nextPage,
      size: crud.currentPageSize.value
    }

    await crud.fetchAll(params)
  }

  // --- Initial Load ---
  const initialize = async () => {
    await crud.fetchAll({page: 0, size: 50}) // Cargamos más items para el carousel
  }

  return {
    // Data
    medicalSpecialities: crud.items,
    pagination: crud.pagination,
    loading: crud.loading,

    // Permissions
    permissions: {
      canCreate,
      canManage,
    },

    // Modals
    editModal,
    createModal,
    selectedMedicalSpeciality,

    // Handlers
    handleEdit,
    handleDelete,
    handleCreate,
    handleSubmitCreate,
    handleSubmitEdit,
    handleLoadMore,

    // Lifecycle
    initialize,
  }
}
