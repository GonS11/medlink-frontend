<script setup lang="ts">
import {SkeletonProps} from "@shared/types/component.atom.types.ts";

withDefaults(defineProps<SkeletonProps>(), {
  width: '100%',
  height: '1rem',
  count: 1,
  circle: false,
  spacing: '0.75rem'
})
</script>

<template>
  <div class="skeleton" aria-hidden="true">
    <div
      v-for="i in count"
      :key="i"
      class="skeleton__item"
      :class="{ 'skeleton__item--circle': circle }"
      :style="{
        width: width,
        height: height,
        marginTop: i > 1 ? spacing : '0'
      }"
    />
  </div>
</template>

<style scoped lang="scss" src="./SkeletonLoader.scss"></style>
