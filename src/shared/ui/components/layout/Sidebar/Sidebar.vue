<script setup lang="ts">
import {computed} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {useI18n} from 'vue-i18n'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import {useAuth} from '@features/auth/model/composables/useAuth'
import {useNavigation} from '@shared/composables/useNavigation'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import ChevronRightIcon from "@shared/ui/icons/ChevronRightIcon.vue"
import ChevronLeftIcon from "@shared/ui/icons/ChevronLeftIcon.vue"
import XIcon from "@shared/ui/icons/XIcon.vue"
import {ROUTES} from "@shared/constants/routes.constants.ts"
import {SidebarProps} from "@shared/types/layout.types.ts";
import LogoutIcon from "@shared/ui/icons/LogoutIcon.vue";

withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
  mobileOpen: false
})

const emit = defineEmits<{
  toggleCollapsed: []
  closeMobile: []
}>()

const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const {logout} = useAuth()
const {mainNavItems, footerNavItems} = useNavigation()

const isActive = (itemRoute: string) => {
  if (itemRoute === ROUTES.DASHBOARD) {
    return route.path === ROUTES.DASHBOARD
  }
  return route.path.startsWith(itemRoute)
}

const handleNavigation = (itemRoute: string) => {
  router.push(itemRoute)
  emit('closeMobile')
}

const userFullName = computed(() => {
  const user = authStore.user
  if (!user) return ''
  return user.secondLastName
    ? `${user.firstName} ${user.lastName} ${user.secondLastName}`
    : `${user.firstName} ${user.lastName}`
})
</script>

<template>
  <div
    class="sidebar-overlay"
    :class="{ 'sidebar-overlay--open': mobileOpen }"
    @click="$emit('closeMobile')"
  ></div>

  <aside
    class="sidebar"
    :class="{
      'sidebar--collapsed': collapsed,
      'sidebar--mobile-open': mobileOpen
    }"
  >
    <div class="sidebar__header">
      <h2 v-show="!collapsed || mobileOpen" class="sidebar__app-title">
        {{ t('app.name') }}
      </h2>

      <ButtonComponent
        variant="ghost"
        size="sm"
        icon-only
        class="sidebar__toggle-btn sidebar__toggle-btn--desktop"
        @click="$emit('toggleCollapsed')"
      >
        <template #icon>
          <ChevronRightIcon v-if="collapsed" :label="$t('common.expand')"/>
          <ChevronLeftIcon v-else :label="$t('common.collapse')"/>
        </template>
      </ButtonComponent>

      <ButtonComponent
        variant="ghost"
        size="sm"
        icon-only
        class="sidebar__toggle-btn sidebar__toggle-btn--mobile"
        @click="$emit('closeMobile')"
      >
        <template #icon>
          <XIcon :label="$t('common.close')"/>
        </template>
      </ButtonComponent>
    </div>

    <nav class="sidebar__nav">
      <template v-for="item in mainNavItems" :key="item.id">
        <div v-if="item.isDivider" class="sidebar__divider"></div>

        <ButtonComponent
          v-else
          variant="ghost"
          full-width
          :icon-only="collapsed && !mobileOpen"
          class="sidebar__nav-item"
          :class="{ 'sidebar__nav-item--active': isActive(item.route) }"
          @click="handleNavigation(item.route)"
        >
          <template #icon v-if="item.icon">
            <component :is="item.icon" :label="$t(item.label)"/>
          </template>
          <span v-if="!collapsed || mobileOpen" class="sidebar__nav-text">
            {{ $t(item.label) }}
          </span>
        </ButtonComponent>
      </template>
    </nav>

    <div class="sidebar__footer">
      <nav class="sidebar__nav-secondary">
        <template v-for="item in footerNavItems" :key="item.id">
          <ButtonComponent
            variant="ghost"
            full-width
            :icon-only="collapsed && !mobileOpen"
            class="sidebar__nav-item sidebar__nav-item--secondary"
            :class="{ 'sidebar__nav-item--active': isActive(item.route) }"
            @click="handleNavigation(item.route)"
          >
            <template #icon v-if="item.icon">
              <component :is="item.icon" :label="$t(item.label)"/>
            </template>
            <span v-if="!collapsed || mobileOpen" class="sidebar__nav-text">
              {{ $t(item.label) }}
            </span>
          </ButtonComponent>
        </template>
      </nav>

      <div class="sidebar__footer-divider"></div>

      <div v-if="(!collapsed || mobileOpen) && authStore.user" class="sidebar__user-card">
        <div class="sidebar__user-info">
          <p class="sidebar__user-name">{{ userFullName }}</p>
          <p class="sidebar__user-role">{{ $t(`roles.${authStore.user.role}`) }}</p>
        </div>
      </div>

      <ButtonComponent
        variant="ghost"
        size="sm"
        full-width
        :icon="LogoutIcon"
        :icon-only="collapsed && !mobileOpen"
        class="sidebar__logout-btn"
        @click="logout"
      >
        <span v-if="!collapsed || mobileOpen" class="sidebar__nav-text">
          {{ $t('auth.logout') }}
        </span>
      </ButtonComponent>
    </div>
  </aside>
</template>

<style scoped lang="scss" src="./Sidebar.scss"></style>
