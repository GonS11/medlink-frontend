<script setup lang="ts">
import {computed} from 'vue'
import {FormRowProps} from "@shared/types/form.types.ts";

const props = withDefaults(defineProps<FormRowProps>(), {
  columns: 2,
  gap: 'lg',
  responsive: true,
})

const rowClasses = computed(() => [
  `form-row--cols-${props.columns}`,
  `form-row--gap-${props.gap}`,
  {'form-row--responsive': props.responsive}
])
</script>

<template>
  <div class="form-row" :class="rowClasses">
    <slot/>
  </div>
</template>

<style scoped lang="scss" src="./FormRowComponent.scss"></style>
