<script setup lang="ts">
import {FormRowProps} from "@shared/types/form.types.ts";

withDefaults(defineProps<FormRowProps>(), {
  columns: 2,
  gap: 'lg',
  responsive: true,
})
</script>

<template>
  <div
    class="form-row"
    :class="[
      `form-row-gap-${gap}`,
      `form-row-columns-${columns}`,
      { 'form-row-responsive': responsive }
    ]"
  >
    <slot/>
  </div>
</template>

<style scoped lang="scss" src="./FormRowComponent.scss"></style>
