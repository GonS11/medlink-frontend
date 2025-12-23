<script setup lang="ts">
import {computed} from 'vue'
import {FormSectionProps} from "@shared/types/form.structure.types.ts"

const props = withDefaults(defineProps<FormSectionProps>(), {
  variant: 'clean',
  disabled: false
})

const sectionClasses = computed(() => [
  'form-section',
  `form-section--${props.variant}`,
  {'form-section--disabled': props.disabled}
])
</script>

<template>
  <fieldset :class="sectionClasses" :disabled="disabled">
    <div v-if="title || description" class="form-section__header">
      <legend v-if="title" class="form-section__title">{{ title }}</legend>
      <p v-if="description" class="form-section__description">{{ description }}</p>
    </div>

    <div class="form-section__body">
      <slot/>
    </div>
  </fieldset>
</template>

<style scoped lang="scss" src="./FormSection.scss"></style>
