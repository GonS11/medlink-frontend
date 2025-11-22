<script setup lang="ts">
import {onMounted} from 'vue'
import {useAuthStore} from '@entities/auth/model/store/auth.store'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss">
@import '@/shared/styles/main.scss';

#app {
  min-height: 100vh;
}
</style>
