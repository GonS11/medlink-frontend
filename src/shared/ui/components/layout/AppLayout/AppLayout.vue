<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {storeToRefs} from "pinia"
import Sidebar from '@shared/ui/components/layout/Sidebar/Sidebar.vue'
import ButtonComponent from '@shared/ui/components/atoms/ButtonComponent/ButtonComponent.vue'
import ConfirmDialog from '@shared/ui/components/molecules/ConfirmDialog/ConfirmDialog.vue'
import MenuIcon from "@shared/ui/icons/MenuIcon.vue"
import {useConfirmStore} from "@shared/composables/useConfirm"

const {t} = useI18n()
const sidebarCollapsed = ref(false)
const mobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}
const toggleMobileSidebar = () => {
  mobileSidebarOpen.value = !mobileSidebarOpen.value
}
const closeMobileSidebar = () => {
  mobileSidebarOpen.value = false
}

const confirmStore = useConfirmStore()
const {showConfirm, confirmOptions} = storeToRefs(confirmStore)

const handleConfirm = () => {
  confirmStore.resolve(true)
}

const handleCancel = () => {
  confirmStore.resolve(false)
}
</script>

<template>
  <div class="app-layout" :class="{ 'app-layout--collapsed': sidebarCollapsed }">
    <div
      v-if="mobileSidebarOpen"
      class="app-layout__overlay"
      @click="closeMobileSidebar"
    ></div>

    <Sidebar
      :collapsed="sidebarCollapsed"
      :mobile-open="mobileSidebarOpen"
      @toggle-collapsed="toggleSidebar"
      @close-mobile="closeMobileSidebar"
    />

    <main class="app-layout__main">
      <header class="app-layout__mobile-header">
        <ButtonComponent
          variant="ghost"
          size="sm"
          @click="toggleMobileSidebar"
          :title="t('nav.openMenu')"
        >
          <MenuIcon :label="$t('icons.menu')"/>
        </ButtonComponent>
        <h1 class="app-layout__mobile-title">{{ t('app.name') }}</h1>
      </header>

      <section class="app-layout__content">
        <router-view v-slot="{ Component }">
          <transition name="fade-page" mode="out-in">
            <component :is="Component"/>
          </transition>
        </router-view>
      </section>
    </main>

    <ConfirmDialog
      :show="showConfirm"
      :title="confirmOptions?.title"
      :message="confirmOptions?.message"
      :confirm-text="confirmOptions?.confirmText"
      :cancel-text="confirmOptions?.cancelText"
      :variant="confirmOptions?.variant"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @update:show="(val) => { if(!val) handleCancel() }"
    />
  </div>
</template>

<style scoped lang="scss" src="./AppLayout.scss"></style>
