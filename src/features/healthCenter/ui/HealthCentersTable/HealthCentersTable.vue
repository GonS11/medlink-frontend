<script setup lang="ts">
import type {HealthCenterResponse} from '@entities/healthCenter/model/types/healthCenter.types'
import DataTable from '@shared/ui/components/organisms/DataTable/DataTable.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import type {
  HealthCenterTableProps,
  HealthCenterTableEmits,
  HealthCenterTableActionType
} from '@features/healthCenter/model/types/healthCenter.feature.types'
import EditIcon from "@shared/ui/icons/EditIcon.vue"
import DeleteIcon from "@shared/ui/icons/DeleteIcon.vue"
import type {SortConfig} from '@shared/types/table.types'
import {
  getHealthCenterTypeVariant,
  getHealthCenterLevelVariant
} from "@entities/healthCenter/model/config/useHealthCenterConfig.ts"
import {useHealthCenterPermissions} from "@features/healthCenter/model/composables/useHealtCenterPermissions.ts";
import DetailsIcon from "@shared/ui/icons/DetailsIcon.vue";
import EmergencyIcon from "@shared/ui/icons/EmergencyIcon.vue";
import ICUIcon from "@shared/ui/icons/ICUIcon.vue";
import HeliportIcon from "@shared/ui/icons/HeliportIcon.vue";

withDefaults(defineProps<HealthCenterTableProps>(), {
  loading: false,
  pagination: null,
})

const emit = defineEmits<HealthCenterTableEmits>()
const permissions = useHealthCenterPermissions()

const canEditHealthCenter = (healthCenter: HealthCenterResponse) =>
  permissions.canEditHealthCenter(healthCenter.id)
const canDeleteHealthCenter = (healthCenter: HealthCenterResponse) =>
  permissions.canDeleteHealthCenter(healthCenter.id)

const emitAction = (type: HealthCenterTableActionType, healthCenter: HealthCenterResponse) => {
  emit('action', {type, healthCenter})
}

const handleRowClick = (healthCenter: HealthCenterResponse) => {
  emitAction('view', healthCenter)
}

const handleAction = (type: HealthCenterTableActionType, healthCenter: HealthCenterResponse, event: Event) => {
  event.stopPropagation()
  emitAction(type, healthCenter)
}

const handlePageChange = (page: number) => {
  emit('page-change', page)
}

const handleSort = (config: SortConfig) => {
  emit('sort', config)
}
</script>

<template>
  <DataTable
    class="health-centers-table"
    :data="healthCenters"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    :empty-message="$t('entities.healthCenter.noHealthCenters')"
    row-clickable
    @row-click="handleRowClick"
    @page-change="handlePageChange"
    @sort="handleSort"
  >
    <!-- Código del centro -->
    <template #cell-code="{ row }">
      <div class="health-centers-table__code-cell">
        <span class="health-centers-table__code">{{ row.code }}</span>
      </div>
    </template>

    <!-- Nombre del centro con ubicación -->
    <template #cell-name="{ row }">
      <div class="health-centers-table__name-cell">
        <span class="health-centers-table__name">{{ row.name }}</span>
        <span class="health-centers-table__subtitle">
          {{ row.city }}, {{ row.province }}
        </span>
      </div>
    </template>

    <!-- Tipo de centro -->
    <template #cell-type="{ row }">
      <BadgeComponent :variant="getHealthCenterTypeVariant(row.type)" size="sm">
        {{ $t(`healthCenter.types.${row.type}`) }}
      </BadgeComponent>
    </template>

    <!-- Nivel asistencial -->
    <template #cell-level="{ row }">
      <BadgeComponent :variant="getHealthCenterLevelVariant(row.level)" size="sm">
        {{ $t(`healthCenter.levels.${row.level}`) }}
      </BadgeComponent>
    </template>

    <!-- Ubicación (ciudad + provincia) -->
    <template #cell-city="{ row }">
      <div class="health-centers-table__location">
        <span class="health-centers-table__location-main">{{ row.city }}</span>
        <span class="health-centers-table__location-sub">{{ row.province }}</span>
      </div>
    </template>

    <!-- Servicios disponibles (Emergencia, UCI, Helipuerto) -->
    <template #cell-hasEmergency="{ row }">
      <div class="health-centers-table__services">
        <BadgeComponent
          v-if="row.hasEmergency"
          variant="error"
          size="sm"
          :icon="EmergencyIcon"
          :title="$t('fields.hasEmergency')"
        />
        <BadgeComponent
          v-if="row.hasICU"
          variant="warning"
          size="sm"
          :icon="ICUIcon"
          :title="$t('fields.hasICU')"
        />
        <BadgeComponent
          v-if="row.hasHeliport"
          variant="info"
          size="sm"
          :icon="HeliportIcon"
          :title="$t('fields.hasHeliport')"
        />
        <span
          v-if="!row.hasEmergency && !row.hasICU && !row.hasHeliport"
          class="health-centers-table__no-services"
        >
          —
        </span>
      </div>
    </template>

    <!-- Público/Privado -->
    <template #cell-isPublic="{ row }">
      <BadgeComponent
        :variant="row.isPublic ? 'success' : 'secondary'"
        size="sm"
      >
        {{ row.isPublic ? $t('healthCenter.public') : $t('healthCenter.private') }}
      </BadgeComponent>
    </template>

    <!-- Acciones -->
    <template #actions="{ row }">
      <div class="health-centers-table__actions">
        <ButtonComponent
          variant="ghost"
          size="sm"
          class="health-centers-table__action-btn"
          :icon="DetailsIcon"
          :title="$t('common.view')"
          @click="handleAction('view', row, $event)"
        />

        <ButtonComponent
          v-if="canEditHealthCenter(row)"
          variant="ghost"
          size="sm"
          class="health-centers-table__action-btn"
          :icon="EditIcon"
          :title="$t('common.edit')"
          @click="handleAction('edit', row, $event)"
        />

        <ButtonComponent
          v-if="canDeleteHealthCenter(row)"
          variant="ghost"
          size="sm"
          class="health-centers-table__action-btn health-centers-table__action-btn--danger"
          :icon="DeleteIcon"
          :title="$t('common.delete')"
          @click="handleAction('delete', row, $event)"
        />
      </div>
    </template>
  </DataTable>
</template>

<style scoped lang="scss" src="./HealthCentersTable.scss"></style>
