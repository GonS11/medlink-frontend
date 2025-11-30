<script setup lang="ts">
import {onMounted} from 'vue'
import {useRouter} from "vue-router";
import {useUser} from "@features/user/model/useUser.ts";
import {useAuthStore} from "@entities/auth/model/store/auth.store.ts";
import {UpdateUserFormData} from "@entities/user/model/validation/user.validation.ts";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";
import UserEditForm from "@entities/user/ui/UserEditForm/UserEditForm.vue";
import {getInitials} from "@shared/utils/format.utils.ts";

const {fetchCurrentUser, updateUser, currentUserProfile, loading} = useUser()
const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  await fetchCurrentUser()
})

const handleSubmit = async (data: UpdateUserFormData) => {
  const userId = authStore.user?.userId
  if (!userId) return

  await updateUser(userId, data)
  await fetchCurrentUser()
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>{{ $t('user.profile') }}</h1>
      <ButtonComponent variant="ghost" @click="router.back()">
        ← {{ $t('common.back') }}
      </ButtonComponent>
    </div>

    <CardComponent variant="shadow" padding="lg">
      <template #header>
        <h3>{{ $t('user.updateProfile') }}</h3>
      </template>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>{{ $t('common.loading') }}</p>
      </div>

      <div v-else-if="currentUserProfile" class="profile-content">
        <div class="profile-avatar">
          <div class="avatar">
            {{ getInitials(currentUserProfile.firstName, currentUserProfile.lastName) }}
          </div>
          <p class="avatar-name">{{ currentUserProfile.fullName }}</p>
          <p class="avatar-role">{{ $t(`roles.${currentUserProfile.role}`) }}</p>
        </div>

        <div class="profile-details">
          <div class="detail-row">
            <span class="detail-label">{{ $t('auth.email') }}:</span>
            <span class="detail-value">{{ currentUserProfile.email }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ $t('user.phone') }}:</span>
            <span class="detail-value">{{ currentUserProfile.phone || '-' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">{{ $t('user.mobilePhone') }}:</span>
            <span class="detail-value">{{ currentUserProfile.mobilePhone || '-' }}</span>
          </div>
        </div>

        <UserEditForm
          :user="currentUserProfile"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="router.back()"
        />
      </div>
    </CardComponent>
  </div>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;


.profile-page {
  padding: $spacing-2xl;
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: $spacing-2xl;

  h1 {
    font-size: $font-size-3xl;
    margin: 0;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-3xl;
  gap: $spacing-lg;

  .spinner {
    width: 40px;
    height: 40px;
  }
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xl;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-md;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-4xl;
  font-weight: $font-weight-bold;
  box-shadow: var(--shadow-lg);
}

.avatar-name {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  margin: 0;
}

.avatar-role {
  font-size: $font-size-base;
  color: var(--text-secondary);
  margin: 0;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: var(--bg-secondary);
  border-radius: $radius-lg;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: $spacing-sm 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
}

.detail-label {
  font-weight: $font-weight-medium;
  color: var(--text-secondary);
}

.detail-value {
  font-weight: $font-weight-medium;
  color: var(--text-primary);
}
</style>
