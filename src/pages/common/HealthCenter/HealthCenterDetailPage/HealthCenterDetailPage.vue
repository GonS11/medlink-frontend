<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useHealthCenterCrud} from '@entities/healthCenter/model/composables/useHealthCenterCrud'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import {ROUTES} from "@shared/constants/routes.constants"
import type {HealthCenterResponse} from '@entities/healthCenter/model/types/healthCenter.types'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import {useHealthCenterPermissions} from "@features/healthCenter/model/composables/useHealtCenterPermissions.ts"
import HealthCenterDetailView from "@entities/healthCenter/ui/HealthCenterDetailView/HealthCenterDetailView.vue"
import HealthCenterForm from "@entities/healthCenter/ui/HealthCenterForm/HealthCenterForm.vue"
import EntityDetailPageWrapper from "@shared/ui/components/layout/EntityDetailPageWrapper/EntityDetailPageWrapper.vue"
import DepartmentIcon from "@shared/ui/icons/DepartmentIcon.vue"
import StatsIcon from "@shared/ui/icons/StatsIcon.vue"

const {t} = useI18n()
const route = useRoute()
const {confirm} = useConfirm()
const editModal = useModal()
const statisticsModal = useModal()

const {fetchById, remove, update, loading} = useHealthCenterCrud()
const permissions = useHealthCenterPermissions()

const healthCenter = ref<HealthCenterResponse | null>(null)
const healthCenterId = Number(route.params.id)

const canEdit = computed<boolean>(() =>
  !!(healthCenter.value && permissions.canEditHealthCenter(healthCenterId))
)
const canDelete = computed<boolean>(() =>
  !!(healthCenter.value && permissions.canDeleteHealthCenter(healthCenterId))
)

const canViewStatistics = computed<boolean>(() =>
  permissions.canViewHealthCenterStatistics(healthCenterId)
)
const canManageDepartments = computed<boolean>(() =>
  permissions.canManageDepartments(healthCenterId)
)

const showEmpty = computed<boolean>(() => !loading.value && !healthCenter.value)

const subtitle = computed(() => {
  if (!healthCenter.value) return ''
  return `${healthCenter.value.city}, ${healthCenter.value.province} - ${t(`autonomousCommunities.${healthCenter.value.autonomousCommunity}`)}`
})

onMounted(async () => {
  const result = await fetchById(healthCenterId)
  if (result) healthCenter.value = result
})

const handleEdit = () => {
  if (canEdit.value) editModal.open()
}

const handleEditSubmit = async (formData: any) => {
  if (!healthCenter.value || !canEdit.value) return
  const result = await update(healthCenterId, formData)
  if (result) {
    healthCenter.value = result
    editModal.close()
  }
}

const handleDelete = async () => {
  if (!healthCenter.value || !canDelete.value) return

  const confirmed = await confirm({
    title: t('common.confirm'),
    message: t('entities.healthCenter.deleteConfirm', {name: healthCenter.value.name}),
    confirmText: t('common.delete'),
    variant: 'danger',
  })

  if (confirmed) {
    const success = await remove(healthCenterId)
    if (success) {
      // router.push handled by wrapper
    }
  }
}

const handleViewStatistics = () => {
  if (canViewStatistics.value) statisticsModal.open()
}

const handleManageDepartments = () => {
  if (canManageDepartments.value) {
    console.log('Gestionar departamentos de:', healthCenter.value?.name)
  }
}
</script>

<template>
  <EntityDetailPageWrapper
    :title="healthCenter?.name || $t('entities.healthCenter.details')"
    :subtitle="subtitle"
    :back-route="ROUTES.HEALTH_CENTERS"
    :loading="loading"
    :show-edit="canEdit"
    :show-delete="canDelete"
    :show-empty="showEmpty"
    entity-name="healthCenter"
    :empty-state-icon="DepartmentIcon"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <!-- Acciones adicionales en el header -->
    <template #header-actions>
      <ButtonComponent
        v-if="canViewStatistics"
        variant="info"
        :icon="StatsIcon"
        size="sm"
        @click="handleViewStatistics"
      >
        {{ $t('healthCenter.statistics') }}
      </ButtonComponent>

      <ButtonComponent
        v-if="canManageDepartments"
        variant="info"
        :icon="DepartmentIcon"
        size="sm"
        @click="handleManageDepartments"
      >
        {{ $t('healthCenter.manageDepartments') }}
      </ButtonComponent>
    </template>

    <!-- Vista de detalle -->
    <HealthCenterDetailView
      v-if="healthCenter || loading"
      :health-center="healthCenter"
      :loading="loading"
    />

    <!-- Modales -->
    <template #modals>
      <!-- Modal Editar -->
      <ModalComponent
        :show="editModal.show.value"
        :title="$t('entities.healthCenter.edit')"
        size="xl"
        :show-footer="false"
        @update:show="editModal.show.value = $event"
      >
        <HealthCenterForm
          v-if="healthCenter"
          :health-center="healthCenter"
          mode="edit"
          :loading="loading"
          @submit="handleEditSubmit"
          @cancel="editModal.close"
        />
      </ModalComponent>

      <!-- Modal Estadísticas -->
      <ModalComponent
        :show="statisticsModal.show.value"
        :title="$t('healthCenter.statistics') + ' - ' + healthCenter?.name"
        size="xl"
        @update:show="statisticsModal.show.value = $event"
      >
        <div>
          <p>{{ $t('healthCenter.statisticsComingSoon') }}</p>
        </div>
      </ModalComponent>
    </template>
  </EntityDetailPageWrapper>
</template>
