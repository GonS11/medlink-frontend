<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import ListPageLayout from '@shared/ui/components/layout/PageLayout/ListPageLayout.vue'
import HealthCentersTable from '@features/healthCenter/ui/HealthCentersTable/HealthCentersTable.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import type {HealthCenterTableAction} from '@features/healthCenter/model/types/healthCenter.feature.types'
import type {SortConfig} from '@shared/types/table.types'
import {ROUTES} from '@shared/constants/routes.constants'
import type {HealthCenterResponse} from "@entities/healthCenter/model/types/healthCenter.types"
import {useHealthCenterManagement} from "@features/healthCenter/model/composables/useHealtCenterManagement.ts";
import HealthCenterForm from "@entities/healthCenter/ui/HealthCenterForm/HealthCenterForm.vue";

const management = useHealthCenterManagement()
const router = useRouter()

onMounted(() => {
  management.initialize()
})

const handleTableAction = (action: HealthCenterTableAction) => {
  const handlers = {
    view: (healthCenter: HealthCenterResponse) => {
      router.push(ROUTES.HEALTH_CENTERS_DETAIL(healthCenter.id))
    },
    edit: management.handleEdit,
    delete: management.handleDelete,
    statistics: management.handleViewStatistics,
    departments: management.handleManageDepartments,
    export: () => management.handleExportData(action.healthCenter),
  }
  handlers[action.type]?.(action.healthCenter)
}

const handleSort = (config: SortConfig) => {
  management.handleSort(config)
}
</script>

<template>
  <ListPageLayout
    class="health-center-page"
    :title="$t('nav.items.healthCenters')"
    :subtitle="management.permissions.canCreate.value ? $t('entities.healthCenter.manage') : $t('entities.healthCenter.view')"
    :show-create="management.permissions.canCreate.value"
    @create="management.handleCreate"
  >
    <HealthCentersTable
      :health-centers="management.healthCenters.value"
      :columns="management.columns.value"
      :loading="management.loading.value"
      :pagination="management.pagination.value"
      @action="handleTableAction"
      @page-change="management.handlePageChange"
      @sort="handleSort"
    />

    <ModalComponent
      :show="management.createModal.show.value"
      :title="$t('entities.healthCenter.create')"
      size="xl"
      :show-footer="false"
      @update:show="management.createModal.show.value = $event"
    >
      <HealthCenterForm
        mode="create"
        :loading="management.loading.value"
        @submit="management.handleSubmitCreate"
        @cancel="management.createModal.close"
      />
    </ModalComponent>

    <ModalComponent
      :show="management.editModal.show.value"
      :title="$t('entities.healthCenter.edit')"
      size="xl"
      :show-footer="false"
      @update:show="management.editModal.show.value = $event"
    >
      <HealthCenterForm
        v-if="management.editModal.data.value"
        :health-center="management.editModal.data.value"
        mode="edit"
        :loading="management.loading.value"
        @submit="management.handleSubmitEdit"
        @cancel="management.editModal.close"
      />
    </ModalComponent>
  </ListPageLayout>
</template>
