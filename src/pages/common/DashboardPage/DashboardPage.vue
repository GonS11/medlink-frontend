<script setup lang="ts">
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@entities/auth/model/store/auth.store.ts'
import {useAuth} from '@features/auth/model/composables/useAuth.ts'
import CardComponent from "@shared/ui/components/atoms/CardComponent/CardComponent.vue";
import ButtonComponent from "@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue";
import {useRole} from "@shared/composables/useUserRole.ts";

const router = useRouter()
const authStore = useAuthStore()
const {logout} = useAuth()
const {isAdmin} = useRole()

const currentUser = computed(() => authStore.user)

const handleLogout = () => {
  logout()
}
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <h1>{{ $t('nav.dashboard') }}</h1>
      <p class="welcome-message">
        Welcome back, <strong>{{ currentUser?.firstName }}</strong>!
      </p>
    </div>

    <div class="dashboard-grid">
      <CardComponent variant="shadow" padding="lg">
        <template #header>
          <h3>User Information</h3>
        </template>
        <div class="user-info">
          <p><strong>Email:</strong> {{ currentUser?.email }}</p>
          <p><strong>Role:</strong> {{ $t(`roles.${currentUser?.role}`) }}</p>
          <p><strong>Status:</strong> {{ currentUser?.isActive ? 'Active' : 'Inactive' }}</p>
        </div>
      </CardComponent>

      <CardComponent variant="shadow" padding="lg">
        <template #header>
          <h3>Quick Actions</h3>
        </template>
        <div class="quick-actions">
          <ButtonComponent variant="primary" @click="router.push('/profile')">
            {{ $t('nav.profile') }}
          </ButtonComponent>
          <ButtonComponent variant="secondary" @click="router.push('/settings')">
            {{ $t('nav.settings') }}
          </ButtonComponent>

          <ButtonComponent v-if="isAdmin" variant="outline" @click="router.push('/users')">
            {{ $t('nav.users') }}
          </ButtonComponent>

          <ButtonComponent variant="ghost" @click="handleLogout">
            {{ $t('auth.logout') }}
          </ButtonComponent>
        </div>
      </CardComponent>
    </div>
  </div>
</template>


<style scoped lang="scss">
@use '@/shared/styles/_variables' as *;


.dashboard-page {
  padding: $spacing-2xl;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: $spacing-2xl;

  h1 {
    font-size: $font-size-4xl;
    margin-bottom: $spacing-sm;
  }

  .welcome-message {
    font-size: $font-size-lg;
    color: var(--text-secondary);
  }
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-xl;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  p {
    margin: 0;
  }
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}
</style>
