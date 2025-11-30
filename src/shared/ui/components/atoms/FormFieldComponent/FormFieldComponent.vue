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

const fieldClasses = computed(() => {
  if (isSection.value) {
    return [
      'form-field',
      'form-field--section',
      `form-field--${props.variant}`,
    ]
  }

  if (isGroup.value) {
    return [
      'form-field',
      'form-field--group',
      `form-field--gap-${props.gap}`,
      {
        'form-field--responsive': props.responsive,
      },
    ]
  }

  return ['form-field', `form-field--gap-${props.gap}`]
})

const groupStyles = computed(() => {
  if (!isGroup.value) return {}
  return {gridTemplateColumns: `repeat(${props.columns}, 1fr)`}
})
</script>

<template>
  <fieldset v-if="isSection" :class="fieldClasses">
    <legend class="form-field__legend">{{ legend }}</legend>
    <p v-if="description" class="form-field__description">{{ description }}</p>
    <div class="form-field__content">
      <slot/>
    </div>
  </fieldset>

  <div v-else-if="isGroup" :class="fieldClasses" :style="groupStyles">
    <slot/>
  </div>

  <div v-else :class="fieldClasses">
    <slot/>
  </div>
</template>

<style scoped lang="scss" src="./FormFieldComponent.scss"></style>
