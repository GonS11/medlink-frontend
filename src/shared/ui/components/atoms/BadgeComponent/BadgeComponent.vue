<script setup lang="ts">
import {BadgeProps} from "@shared/types/component.atoms.types.ts";

withDefaults(defineProps<BadgeProps>(), {
  variant: 'primary',
  size: 'md'
})
</script>

<template>
  <span :class="['badge', `badge--${variant}`, `badge--${size}`]">
    <span v-if="icon" class="badge__icon">
      <component :is="icon"/>
    </span>
    <slot/>
  </span>
</template>

<style scoped lang="scss" src="./BadgeComponent.scss"></style>
