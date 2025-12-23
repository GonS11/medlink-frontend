<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useUserCrud} from '@entities/user/model/composables/useUserCrud'
import {useUserPermissions} from '@features/user/model/composables/useUserPermissions'
import {useModal} from '@shared/composables/useModal'
import {useConfirm} from '@shared/composables/useConfirm'
import {ROUTES} from "@shared/constants/routes.constants.ts"
import type {UserResponse} from '@entities/user/model/types/user.types'

// Components
import DetailPageLayout from '@shared/ui/components/layout/PageLayout/DetailPageLayout.vue'
import UserDetailView from '@entities/user/ui/UserDetailView/UserDetailView.vue'
import UserForm from '@entities/user/ui/UserForm/UserForm.vue'
import ModalComponent from "@shared/ui/components/molecules/ModalComponent/ModalComponent.vue"
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue' // Para el estado de error

const {t} = useI18n()
const route = useRoute()
const router = useRouter()
const {confirm} = useConfirm()
const editModal = useModal()

const {fetchById, remove, update, loading} = useUserCrud()
const permissions = useUserPermissions()

const user = ref<UserResponse | null>(null)
const userId = Number(route.params.id)

// Computed
const canEdit = computed(() => user.value && permissions.canEditUser(user.value.role))
const canDelete = computed(() => user.value && permissions.canDeleteUser(user.value.role))
const userNotFound = computed(() => !loading.value && !user.value)

// Lifecycle
onMounted(async () => {
  const result = await fetchById(userId)
  if (result) user.value = result
})

// Handlers
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
    router.push(ROUTES.USERS)
  }
}
</script>

<template>
  <DetailPageLayout
    class="user-detail-page"
    :title="user?.fullName || $t('entities.user.details')"
    :subtitle="user?.email"
    :loading="loading"
    :show-edit="!!canEdit"
    :show-delete="!!canDelete"
    @back="router.push(ROUTES.USERS)"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <UserDetailView
      v-if="user || loading"
      :user="user!"
      :loading="loading"
    />

    <div v-else-if="userNotFound" class="user-detail-page__empty-state">
      <div class="user-detail-page__icon">🕵️‍♂️</div>
      <h3 class="user-detail-page__title">{{ $t('entities.user.notFound') }}</h3>
      <p class="user-detail-page__description">{{ $t('entities.user.notFoundDesc') }}</p>
      <ButtonComponent @click="router.push(ROUTES.USERS)">
        {{ $t('common.goBack') }}
      </ButtonComponent>
    </div>

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
  </DetailPageLayout>
</template>

<style scoped lang="scss" src="./UserDetailPage.scss"></style>
