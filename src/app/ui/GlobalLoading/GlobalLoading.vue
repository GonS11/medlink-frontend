<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useUiStore} from '@app/stores/ui.store.ts'

const uiStore = useUiStore()
const {isLoading} = storeToRefs(uiStore)
</script>

<template>
  <Transition name="loading-fade">
    <div v-if="isLoading" class="global-loader" role="progressbar" aria-busy="true">
      <div class="global-loader__progress"></div>
    </div>
  </Transition>
</template>

<style scoped lang="scss" src="./GlobalLoading.scss"></style>
