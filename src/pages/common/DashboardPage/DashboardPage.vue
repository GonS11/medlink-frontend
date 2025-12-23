<script setup lang="ts">
import {computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {useRole} from '@shared/composables/useUserRole'

// Components
import CardComponent from '@shared/ui/components/atoms/CardComponent/CardComponent.vue'
import StatCard from '@shared/ui/components/atoms/StatCard/StatCard.vue'
import BadgeComponent from '@shared/ui/components/atoms/BadgeComponent/BadgeComponent.vue' // <--- Importado

// Icons
import UsersIcon from '@shared/ui/icons/UsersIcon.vue'
import HealthCareCenterIcon from '@shared/ui/icons/HealthCareCenterIcon.vue'
import DepartmentIcon from '@shared/ui/icons/DepartmentIcon.vue'
import MedicalSimbolIcon from '@shared/ui/icons/MedicalSimbolIcon.vue'

const authStore = useAuthStore()
const {isAdmin} = useRole()
const {t} = useI18n()

const currentUser = computed(() => authStore.user)

const adminStats = computed(() => [
  {label: t('dashboard.totalUsers'), value: '-', icon: UsersIcon},
  {label: t('dashboard.healthCenters'), value: '-', icon: HealthCareCenterIcon},
  {label: t('dashboard.departments'), value: '-', icon: DepartmentIcon},
  {label: t('dashboard.specialties'), value: '-', icon: MedicalSimbolIcon},
])
</script>

<template>
  <div class="dashboard">
    <header class="dashboard__header">
      <h1 class="dashboard__title">{{ $t('nav.items.dashboard') }}</h1>
      <p class="dashboard__subtitle">
        {{ $t('dashboard.welcomeBack') }},
        <strong class="dashboard__username">{{ currentUser?.firstName }}</strong>!
      </p>
    </header>

    <div class="dashboard__grid">
      <CardComponent
        :title="$t('entities.user.profile')"
        variant="shadow"
        padding="lg"
        class="dashboard__card"
      >
        <div class="user-info">
          <div class="user-info__row">
            <span class="user-info__label">{{ $t('fields.email') }}:</span>
            <span class="user-info__value">{{ currentUser?.email }}</span>
          </div>

          <div class="user-info__row">
            <span class="user-info__label">{{ $t('fields.role') }}:</span>
            <span class="user-info__value">{{ $t(`roles.${currentUser?.role}`) }}</span>
          </div>

          <div class="user-info__row">
            <span class="user-info__label">{{ $t('common.status') }}:</span>

            <BadgeComponent
              :variant="currentUser?.isActive ? 'success' : 'error'"
              size="sm"
            >
              {{ currentUser?.isActive ? $t('common.active') : $t('common.inactive') }}
            </BadgeComponent>

          </div>
        </div>
      </CardComponent>

      <CardComponent
        :title="$t('dashboard.recentActivity')"
        variant="shadow"
        padding="lg"
        class="dashboard__card"
      >
        <div class="recent-activity">
          <p class="recent-activity__placeholder">
            {{ $t('dashboard.noRecentActivity') }}
          </p>
        </div>
      </CardComponent>
    </div>

    <section v-if="isAdmin" class="dashboard__section">
      <h2 class="dashboard__section-title">{{ $t('dashboard.adminPanel') }}</h2>

      <div class="dashboard__stats-grid">
        <CardComponent
          v-for="stat in adminStats"
          :key="stat.label"
          variant="borderless"
          padding="none"
        >
          <StatCard
            :label="stat.label"
            :value="stat.value"
            :icon="stat.icon"
          />
        </CardComponent>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss" src="./DashboardPage.scss"></style>
