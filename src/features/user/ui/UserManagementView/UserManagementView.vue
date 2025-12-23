<script setup lang="ts">
import {onMounted} from 'vue'
import {useUserManagement} from '@features/user/model/composables/useUserManagement'
import UsersTable from '@features/user/ui/UsersTable/UsersTable.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import UserDetailView from '@entities/user/ui/UserDetailView/UserDetailView.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import type {UserTableAction} from '@features/user/model/types/user.feature.types'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue";

const management = useUserManagement()

// --- Lifecycle ---
onMounted(() => {
  management.initialize()
})

// --- Action Handler ---
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
  <div class="user-management">
    <header class="user-management__header">
      <div class="user-management__header-content">
        <h1 class="user-management__title">{{ $t('entities.user.management') }}</h1>
        <p class="user-management__subtitle">{{ $t('entities.user.managementDescription') }}</p>
      </div>

      <ButtonComponent
        v-if="management.permissions.canCreate.value"
        variant="primary"
        class="user-management__create-btn"
        @click="management.handleCreate"
      >
        ➕ {{ $t('entities.user.create') }}
      </ButtonComponent>
    </header>

    <section class="user-management__table-container">
      <UsersTable
        :users="management.users.value"
        :columns="management.columns.value"
        :loading="management.loading.value"
        :pagination="management.pagination.value"
        @action="handleTableAction"
        @page-change="management.handlePageChange"
      />
    </section>

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

    <ModalComponent
      v-model:show="management.createModal.show.value"
      :title="management.createModal.options.value.title"
      :size="management.createModal.options.value.size"
    >
      <UserForm
        :loading="management.loading.value"
        mode="create"
        @submit="management.handleSubmitEdit"
        @cancel="management.createModal.close"
      />
    </ModalComponent>

    <ModalComponent
      v-model:show="management.lockModal.show.value"
      :title="management.lockModal.options.value.title"
      size="sm"
    >
      <div v-if="management.lockModal.data.value" class="user-management__lock-container">
        <p>{{ $t('entities.user.lock.reason') }} para {{ management.lockModal.data.value.fullName }}</p>
      </div>
    </ModalComponent>
  </div>
</template>

<style scoped lang="scss" src="./UserManagementView.scss"></style>
