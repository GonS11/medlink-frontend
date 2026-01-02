<script setup lang="ts">
import {onMounted} from 'vue'
import {useUserManagement} from '@features/user/model/composables/useUserManagement'
import UsersTable from '@features/user/ui/UsersTable/UsersTable.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import UserDetailView from '@entities/user/ui/UserDetailView/UserDetailView.vue'
import type {UserTableAction} from '@features/user/model/types/user.feature.types'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import EntityManagementWrapper from "@shared/ui/components/layout/EntityManagementWrapper/EntityManagementWrapper.vue";

const management = useUserManagement()

onMounted(() => {
  management.initialize()
})

const handleTableAction = (action: UserTableAction) => {
  const handlers = {
    view: management.handleView,
    edit: management.handleEdit,
    delete: management.handleDelete,
    lock: management.handleLock,
    unlock: management.handleUnlock,
  }

  handlers[action.type](action.user)
}
</script>

<template>
  <EntityManagementWrapper
    :title="$t('entities.user.management')"
    :subtitle="$t('entities.user.managementDescription')"
    :show-create-button="management.permissions.canCreate.value"
    :create-button-text="$t('entities.user.create')"
    @create="management.handleCreate"
  >
    <!-- Tabla -->
    <template #table>
      <UsersTable
        :users="management.users.value"
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
        <UserDetailView
          v-if="management.viewModal.data.value"
          :user="management.viewModal.data.value"
        />
      </ModalComponent>

      <!-- Modal Editar -->
      <ModalComponent
        v-model:show="management.editModal.show.value"
        :title="management.editModal.options.value.title"
        :size="management.editModal.options.value.size"
      >
        <UserForm
          v-if="management.editModal.data.value"
          :user="management.editModal.data.value"
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
        <UserForm
          :loading="management.loading.value"
          mode="create"
          @submit="management.handleSubmitCreate"
          @cancel="management.createModal.close"
        />
      </ModalComponent>
    </template>
  </EntityManagementWrapper>
</template>
