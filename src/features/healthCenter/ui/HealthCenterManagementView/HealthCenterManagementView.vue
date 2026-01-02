<script setup lang="ts">
import {onMounted} from 'vue'
import HealthCentersTable from '@features/healthCenter/ui/HealthCentersTable/HealthCentersTable.vue'
import HealthCenterForm from '@entities/healthCenter/ui/HealthCenterForm/HealthCenterForm.vue'
import HealthCenterDetailView from '@entities/healthCenter/ui/HealthCenterDetailView/HealthCenterDetailView.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import type {HealthCenterTableAction} from '@features/healthCenter/model/types/healthCenter.feature.types'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import {useHealthCenterManagement} from "@features/healthCenter/model/composables/useHealtCenterManagement.ts";
import EntityManagementWrapper from "@shared/ui/components/layout/EntityManagementWrapper/EntityManagementWrapper.vue";

const management = useHealthCenterManagement()

onMounted(() => {
  management.initialize()
})

const handleTableAction = (action: HealthCenterTableAction) => {
  const handlers = {
    view: management.handleView,
    edit: management.handleEdit,
    delete: management.handleDelete,
    statistics: management.handleViewStatistics,
    departments: management.handleManageDepartments,
    export: () => management.handleExportData(action.healthCenter),
  }

  handlers[action.type]?.(action.healthCenter)
}
</script>

<template>
  <EntityManagementWrapper
    :title="$t('entities.healthCenter.management')"
    :subtitle="$t('entities.healthCenter.managementDescription')"
    :show-create-button="management.permissions.canCreate.value"
    :create-button-text="$t('entities.healthCenter.create')"
    :show-header-actions="management.permissions.canViewStatistics.value"
    @create="management.handleCreate"
  >
    <!-- Acciones adicionales del header -->
    <template #header-actions>
      <ButtonComponent
        v-if="management.permissions.canViewStatistics.value"
        variant="secondary"
        @click="management.handleViewStatistics()"
      >
        📊 {{ $t('healthCenter.globalStatistics') }}
      </ButtonComponent>
    </template>

    <!-- Tabla -->
    <template #table>
      <HealthCentersTable
        :health-centers="management.healthCenters.value"
        :columns="management.columns.value"
        :loading="management.loading.value"
        :pagination="management.pagination.value"
        @action="handleTableAction"
        @page-change="management.handlePageChange"
        @sort="management.handleSort"
      />
    </template>

    <!-- Modales -->
    <template #modals>
      <!-- Modal Ver -->
      <ModalComponent
        v-model:show="management.viewModal.show.value"
        :title="management.viewModal.options.value.title"
        :size="management.viewModal.options.value.size"
      >
        <HealthCenterDetailView
          v-if="management.viewModal.data.value"
          :health-center="management.viewModal.data.value"
        />
      </ModalComponent>

      <!-- Modal Editar -->
      <ModalComponent
        v-model:show="management.editModal.show.value"
        :title="management.editModal.options.value.title"
        :size="management.editModal.options.value.size"
      >
        <HealthCenterForm
          v-if="management.editModal.data.value"
          :health-center="management.editModal.data.value"
          :loading="management.loading.value"
          mode="edit"
          @submit="management.handleSubmitEdit"
          @cancel="management.editModal.close"
        />
      </ModalComponent>

      <!-- Modal Crear -->
      <ModalComponent
        v-model:show="management.createModal.show.value"
        :title="management.createModal.options.value.title"
        :size="management.createModal.options.value.size"
      >
        <HealthCenterForm
          :loading="management.loading.value"
          mode="create"
          @submit="management.handleSubmitCreate"
          @cancel="management.createModal.close"
        />
      </ModalComponent>
    </template>
  </EntityManagementWrapper>
</template>
