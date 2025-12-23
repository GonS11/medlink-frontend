<script setup lang="ts">
import {StatCardProps} from "@shared/types/general.types.ts";

defineProps<StatCardProps>()
</script>

<template>
  <div class="stat-card">
    <div class="stat-card__icon">
      <component :is="icon" :label="label"/>
    </div>
    <div class="stat-card__content">
      <span class="stat-card__label">{{ label }}</span>
      <span class="stat-card__value">
        {{ loading ? '...' : value }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./StatCard.scss"></style>
