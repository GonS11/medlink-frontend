<script setup lang="ts">
import SkeletonLoader from "@shared/ui/components/atoms/SkeletonLoader/SkeletonLoader.vue"
import {StatCardProps} from "@shared/types/component.molecules.types.ts";

defineProps<StatCardProps>()
</script>

<template>
  <article class="stat-card">
    <div class="stat-card__icon">
      <component :is="icon"/>
    </div>

    <div class="stat-card__content">
      <span class="stat-card__label">{{ label }}</span>

      <div v-if="loading" class="stat-card__loader">
        <SkeletonLoader width="60%" height="2rem"/>
      </div>
      <span v-else class="stat-card__value">
        {{ value }}
      </span>
    </div>
  </article>
</template>

<style scoped lang="scss" src="./StatCard.scss"></style>
