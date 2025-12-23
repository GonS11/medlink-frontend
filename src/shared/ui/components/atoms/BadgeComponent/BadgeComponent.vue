<script setup lang="ts">
import {BadgeProps} from "@shared/types/component.atom.types.ts";

withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<template>
  <span :class="['badge', `badge--${variant}`, `badge--${size}`]">
    <slot/>
  </span>
</template>

<style scoped lang="scss" src="./BadgeComponent.scss"></style>
