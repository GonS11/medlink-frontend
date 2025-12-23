<script setup lang="ts">
import {onMounted} from 'vue'
import {useAuthStore} from '@entities/auth/model/store/auth.store'
import GlobalLoading from "@app/ui/GlobalLoading/GlobalLoading.vue";

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <GlobalLoading/>

  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
@use '@/shared/styles/main.scss';

#app {
  min-height: 100vh;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
