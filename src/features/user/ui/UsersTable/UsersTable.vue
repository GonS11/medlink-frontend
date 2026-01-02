<script setup lang="ts">
import {useUserPermissions} from '@features/user/model/composables/useUserPermissions'
import type {UserResponse} from '@entities/user/model/types/user.types'
import {userFormattersStatic} from '@entities/user/model/composables/useUserFormatters'
import DataTable from '@shared/ui/components/organisms/DataTable/DataTable.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue'
import type {
  UserTableProps,
  UserTableEmits,
  UserTableActionType
} from '@features/user/model/types/user.feature.types'
import {USER_ROLE_VARIANTS} from "@entities/user/model/config/useUserConfig.ts"
import EditIcon from "@shared/ui/icons/EditIcon.vue"
import DeleteIcon from "@shared/ui/icons/DeleteIcon.vue"
import type {SortConfig} from '@shared/types/table.types'
import DetailsIcon from "@shared/ui/icons/DetailsIcon.vue";
import LockIcon from "@shared/ui/icons/LockIcon.vue";
import UnlockIcon from "@shared/ui/icons/UnlockIcon.vue";

withDefaults(defineProps<UserTableProps>(), {
  loading: false,
  pagination: null,
})

const emit = defineEmits<UserTableEmits>()
const permissions = useUserPermissions()

const getRoleVariant = (role: string) => {
  return USER_ROLE_VARIANTS[role as keyof typeof USER_ROLE_VARIANTS] || 'secondary'
}

const canEditUser = (user: UserResponse) => permissions.canEditUser(user.role)
const canDeleteUser = (user: UserResponse) => permissions.canDeleteUser(user.role)
const canLockUser = (user: UserResponse) => permissions.canLockUser(user.role)
const showUnlock = (user: UserResponse) =>
  userFormattersStatic.isLocked(user) && permissions.canUnlockUsers.value

const emitAction = (type: UserTableActionType, user: UserResponse) => {
  emit('action', {type, user})
}

const handleRowClick = (user: UserResponse) => {
  emitAction('view', user)
}

const handleAction = (type: UserTableActionType, user: UserResponse, event: Event) => {
  event.stopPropagation()
  emitAction(type, user)
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
    class="users-table"
    :data="users"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    :empty-message="$t('entities.user.noUsers')"
    row-clickable
    @row-click="handleRowClick"
    @page-change="handlePageChange"
    @sort="handleSort"
  >
    <template #cell-fullName="{ row }">
      <div class="users-table__user-info">
        <span class="users-table__user-name">
          {{ userFormattersStatic.formatFullName(row).main }}
        </span>
        <span
          v-if="userFormattersStatic.formatFullName(row).secondary"
          class="users-table__user-id"
        >
          {{ userFormattersStatic.formatFullName(row).secondary }}
        </span>
      </div>
    </template>

    <template #cell-email="{ row }">
      <span class="users-table__text--primary">{{ row.email }}</span>
    </template>

    <template #cell-role="{ row }">
      <BadgeComponent :variant="getRoleVariant(row.role)" size="sm">
        {{ $t(`roles.${row.role}`) }}
      </BadgeComponent>
    </template>

    <template #cell-isActive="{ row }">
      <div class="users-table__status-group">
        <BadgeComponent
          :variant="userFormattersStatic.isActive(row) ? 'success' : 'secondary'"
          size="sm"
        >
          {{ userFormattersStatic.isActive(row) ? $t('common.active') : $t('common.inactive') }}
        </BadgeComponent>

        <BadgeComponent
          v-if="userFormattersStatic.isLocked(row)"
          variant="error"
          :icon="LockIcon"
          size="sm"
        >{{ $t('entities.user.locked') }}
        </BadgeComponent>
      </div>
    </template>

    <template #actions="{ row }">
      <div class="users-table__actions">
        <ButtonComponent
          variant="ghost"
          size="sm"
          class="users-table__action-btn"
          :icon="DetailsIcon"
          @click="handleAction('view', row, $event)"
          :title="$t('common.view')"
        />

        <ButtonComponent
          v-if="canEditUser(row)"
          variant="ghost"
          size="sm"
          class="users-table__action-btn"
          :icon="EditIcon"
          @click="handleAction('edit', row, $event)"
          :title="$t('common.edit')"
        />

        <ButtonComponent
          v-if="canLockUser(row) && !userFormattersStatic.isLocked(row)"
          variant="ghost"
          size="sm"
          class="users-table__action-btn"
          :icon="UnlockIcon"
          @click="handleAction('lock', row, $event)"
          :title="$t('entities.user.lock.action')"
        />

        <ButtonComponent
          v-if="showUnlock(row)"
          variant="ghost"
          size="sm"
          class="users-table__action-btn"
          :icon="LockIcon"
          @click="handleAction('unlock', row, $event)"
          :title="$t('entities.user.unlock')"
        />

        <ButtonComponent
          v-if="canDeleteUser(row)"
          variant="ghost"
          size="sm"
          class="users-table__action-btn users-table__action-btn--danger"
          :icon="DeleteIcon"
          @click="handleAction('delete', row, $event)"
          :title="$t('common.delete')"
        />
      </div>
    </template>
  </DataTable>
</template>

<style scoped lang="scss" src="./UsersTable.scss"></style>
