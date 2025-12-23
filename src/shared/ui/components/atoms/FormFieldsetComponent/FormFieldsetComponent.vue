<script setup lang="ts">
import {computed} from 'vue'

interface Props {
  legend?: string
  description?: string
  variant?: 'default' | 'bordered' | 'filled'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const fieldsetClasses = computed(() => [
  'form-fieldset',
  `form-fieldset--variant-${props.variant}`
])
</script>

<template>
  <fieldset :class="fieldsetClasses">
    <div v-if="legend || description" class="form-fieldset__header">
      <legend v-if="legend" class="form-fieldset__legend">{{ legend }}</legend>
      <p v-if="description" class="form-fieldset__description">{{ description }}</p>
    </div>

    <div class="form-fieldset__content">
      <slot/>
    </div>
  </fieldset>
</template>

<style scoped lang="scss" src="./FormFieldsetComponent.scss"></style>
