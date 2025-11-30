<script setup lang="ts">
import {globalLoading} from "@shared/lib/httpClient.ts";
</script>

<template>
  <Transition name="fade">
    <div v-if="globalLoading" class="global-loading">
      <div class="global-loading__bar"></div>
    </div>
  </Transition>
</template>

<style scoped lang="scss" src="./GlobalLoading.scss"></style>
