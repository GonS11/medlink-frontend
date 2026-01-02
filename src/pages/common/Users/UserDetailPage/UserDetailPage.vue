<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useUserCrud} from '@entities/user/model/composables/useUserCrud'
import {useUserPermissions} from '@features/user/model/composables/useUserPermissions'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import {ROUTES} from "@shared/constants/routes.constants.ts"
import type {UserResponse} from '@entities/user/model/types/user.types'
import UserDetailView from '@entities/user/ui/UserDetailView/UserDetailView.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import DetailPageWrapper from "@shared/ui/components/layout/DetailPageWrapper/DetailPageWrapper.vue"
import UserIcon from "@shared/ui/icons/UserIcon.vue";

const {t} = useI18n()
const route = useRoute()
const {confirm} = useConfirm()
const editModal = useModal()

const {fetchById, remove, update, loading} = useUserCrud()
const permissions = useUserPermissions()

const user = ref<UserResponse | null>(null)
const userId = Number(route.params.id)

const canEdit = computed<boolean>(() => !!(user.value && permissions.canEditUser(user.value.role)))
const canDelete = computed<boolean>(() => !!(user.value && permissions.canDeleteUser(user.value.role)))
const showEmpty = computed<boolean>(() => !loading.value && !user.value)

onMounted(async () => {
  const result = await fetchById(userId)
  if (result) user.value = result
})

const handleEdit = () => {
  if (canEdit.value) editModal.open()
}

const handleEditSubmit = async (formData: any) => {
  if (!user.value || !canEdit.value) return
  const result = await update(userId, formData)
  if (result) {
    user.value = result
    editModal.close()
  }
}

const handleDelete = async () => {
  if (!user.value || !canDelete.value) return

  const confirmed = await confirm({
    title: t('common.confirm'),
    message: t('entities.user.deleteConfirm', {name: user.value.fullName}),
    confirmText: t('common.delete'),
    variant: 'danger',
  })

  if (confirmed) {
    await remove(userId)
  }
}
</script>

<template>
  <DetailPageWrapper
    :title="user?.fullName || $t('entities.user.details')"
    :subtitle="user?.email"
    :back-route="ROUTES.USERS"
    :loading="loading"
    :show-edit="canEdit"
    :show-delete="canDelete"
    :show-empty="showEmpty"
    entity-name="user"
    :empty-state-icon="UserIcon"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <UserDetailView v-if="user || loading" :user="user!" :loading="loading"/>

    <template #modals>
      <ModalComponent
        :show="editModal.show.value"
        :title="$t('entities.user.edit')"
        size="lg"
        :show-footer="false"
        @update:show="editModal.show.value = $event"
      >
        <UserForm
          v-if="user"
          :user="user"
          mode="edit"
          :loading="loading"
          @submit="handleEditSubmit"
          @cancel="editModal.close"
        />
      </ModalComponent>
    </template>
  </DetailPageWrapper>
</template>
