<script setup lang="ts">
import {computed} from 'vue'
import {FormLayoutProps} from "@shared/types/form.structure.types.ts"

const props = withDefaults(defineProps<FormLayoutProps>(), {
  columns: 1,
  gap: 'md',
  responsive: true,
  align: 'start'
})

const layoutClasses = computed(() => [
  'form-layout',
  `form-layout--gap-${props.gap}`,
  `form-layout--align-${props.align}`,
  {'form-layout--responsive': props.responsive}
])

const layoutStyle = computed(() => {
  if (props.columns === 'auto') {
    return {gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}
  }
  return {gridTemplateColumns: `repeat(${props.columns}, 1fr)`}
})
</script>

<template>
  <div :class="layoutClasses" :style="layoutStyle">
    <slot/>
  </div>
</template>

<style scoped lang="scss" src="./FormLayout.scss"></style>
