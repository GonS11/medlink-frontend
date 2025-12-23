<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useUserManagement} from '@features/user/model/composables/useUserManagement'
import ListPageLayout from '@shared/ui/components/layout/PageLayout/ListPageLayout.vue'
import UsersTable from '@features/user/ui/UsersTable/UsersTable.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import LockForm from '@entities/user/ui/LockForm/LockForm.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import type {UserTableAction} from '@features/user/model/types/user.feature.types'
import type {SortConfig} from '@shared/types/table.types'
import {ROUTES} from '@shared/constants/routes.constants'
import {UserResponse} from "@entities/user/model/types/user.types.ts"
import {LockFormData} from "@entities/user/model/types/user.ui.types.ts";

const management = useUserManagement()
const router = useRouter()

onMounted(() => {
  management.initialize()
})

const handleTableAction = (action: UserTableAction) => {
  const handlers = {
    view: (user: UserResponse) => {
      router.push(ROUTES.USERS_DETAIL(user.id))
    },
    edit: management.handleEdit,
    delete: management.handleDelete,
    lock: (user: UserResponse) => {
      management.handleLock(user)
    },
    unlock: management.handleUnlock,
  }
  handlers[action.type](action.user)
}

const handleLockConfirm = async (data: LockFormData) => {
  await management.handleSubmitLock({
    durationMinutes: data.durationMinutes,
    reason: data.reason,
  })
}

const handleSort = (config: SortConfig) => {
  management.handleSort(config)
}
</script>

<template>
  <ListPageLayout
    class="user-page"
    :title="$t('nav.items.users')"
    :subtitle="management.permissions.canCreate.value ? $t('entities.user.manage') : $t('entities.user.view')"
    :show-create="management.permissions.canCreate.value"
    @create="management.handleCreate"
  >
    <UsersTable
      :users="management.users.value"
      :columns="management.columns.value"
      :loading="management.loading.value"
      :pagination="management.pagination.value"
      @action="handleTableAction"
      @page-change="management.handlePageChange"
      @sort="handleSort"
    />

    <ModalComponent
      :show="management.createModal.show.value"
      :title="$t('entities.user.create')"
      size="lg"
      :show-footer="false"
      @update:show="management.createModal.show.value = $event"
    >
      <UserForm
        mode="create"
        :loading="management.loading.value"
        @submit="management.handleSubmitCreate"
        @cancel="management.createModal.close"
      />
    </ModalComponent>

    <ModalComponent
      :show="management.editModal.show.value"
      :title="$t('entities.user.edit')"
      size="lg"
      :show-footer="false"
      @update:show="management.editModal.show.value = $event"
    >
      <UserForm
        v-if="management.editModal.data.value"
        :user="management.editModal.data.value"
        mode="edit"
        :loading="management.loading.value"
        @submit="management.handleSubmitEdit"
        @cancel="management.editModal.close"
      />
    </ModalComponent>

    <ModalComponent
      :show="management.lockModal.show.value"
      :title="$t('entities.user.lock.action')"
      variant="danger"
      size="md"
      :show-footer="false"
      @update:show="management.lockModal.show.value = $event"
    >
      <LockForm
        :loading="management.loading.value"
        @submit="handleLockConfirm"
        @cancel="management.lockModal.close"
      />
    </ModalComponent>
  </ListPageLayout>
</template>
