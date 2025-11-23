<script setup lang="ts">
import {computed} from 'vue'

const props = withDefaults(defineProps<{
  legend?: string
  description?: string
  variant?: 'default' | 'bordered' | 'filled'
}>(), {
  variant: 'default',
})

const fieldsetClasses = computed(() => [
  'form-fieldset',
  `form-fieldset-${props.variant}`
])
</script>

<template>
  <fieldset :class="fieldsetClasses">
    <div v-if="legend || description" class="form-fieldset-header">
      <legend v-if="legend" class="form-fieldset-legend">{{ legend }}</legend>
      <p v-if="description" class="form-fieldset-description">{{ description }}</p>
    </div>

    <div class="form-fieldset-content">
      <slot/>
    </div>
  </fieldset>
</template>

<style scoped lang="scss" src="./FormFieldsetComponent.scss"></style>
