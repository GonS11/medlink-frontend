<script setup lang="ts">
import {computed} from 'vue'
import {FormFieldProps} from "@shared/types/form.types.ts";

const props = withDefaults(defineProps<FormFieldProps>(), {
  gap: 'md',
  responsive: true,
  variant: 'default',
})

const isGroup = computed(() => props.columns !== undefined)
const isSection = computed(() => props.legend !== undefined)

const fieldClasses = computed(() => [
  'form-field',
  {
    'form-field--section': isSection.value,
    'form-field--group': isGroup.value,
    [`form-field--variant-${props.variant}`]: isSection.value,
    [`form-field--gap-${props.gap}`]: true,
    'form-field--responsive': props.responsive
  }
])

const groupStyles = computed(() => {
  if (!isGroup.value) return {}
  return {gridTemplateColumns: `repeat(${props.columns}, 1fr)`}
})
</script>

<template>
  <fieldset v-if="isSection" :class="fieldClasses">
    <legend class="form-field__legend">{{ legend }}</legend>
    <p v-if="description" class="form-field__description">{{ description }}</p>
    <div class="form-field__grid">
      <slot/>
    </div>
  </fieldset>

  <div v-else :class="fieldClasses" :style="groupStyles">
    <slot/>
  </div>
</template>

<style scoped lang="scss" src="./FormFieldComponent.scss"></style>
