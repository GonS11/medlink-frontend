<script setup lang="ts">
import {ref} from 'vue'
import {RadioGroupProps, RadioOption} from "@shared/types/form.types.ts";

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  required: false,
  direction: 'vertical',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  change: [value: string | number]
}>()

const groupName = ref(`radio-group-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (value: string | number) => {
  if (props.disabled) return
  emit('update:modelValue', value)
  emit('change', value)
}

const isOptionDisabled = (option: RadioOption) => {
  return props.disabled || option.disabled
}
</script>

<template>
  <div class="radio-group-wrapper">
    <label v-if="label" class="radio-group-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div
      class="radio-group"
      :class="[
        `radio-group-${direction}`,
        { 'radio-group-error': error }
      ]"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="radio-option"
        :class="[
          `radio-option-${size}`,
          {
            'radio-option-disabled': isOptionDisabled(option),
            'radio-option-checked': modelValue === option.value,
          }
        ]"
        @click="handleChange(option.value)"
      >
        <input
          :id="`${groupName}-${option.value}`"
          type="radio"
          :name="groupName"
          :value="option.value"
          :checked="modelValue === option.value"
          :disabled="isOptionDisabled(option)"
          class="radio-input"
          @change="() => handleChange(option.value)"
        />

        <div class="radio-button">
          <div class="radio-button-inner"/>
        </div>

        <label
          :for="`${groupName}-${option.value}`"
          class="radio-label-container"
        >
          <span class="radio-label">{{ option.label }}</span>
          <span v-if="option.description" class="radio-description">
            {{ option.description }}
          </span>
        </label>
      </div>
    </div>

    <p v-if="error" class="radio-group-error">{{ error }}</p>
    <p v-else-if="hint" class="radio-group-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./RadioGroupComponent.scss"></style>
