<script setup lang="ts">
import {computed, ref} from 'vue'
import {SwitchProps} from "@shared/types/form.types.ts";

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
  labelPosition: 'right',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const switchId = ref(`switch-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const switchClasses = computed(() => [
  'switch',
  `switch-${props.size}`,
  {
    'switch-checked': props.modelValue,
    'switch-disabled': props.disabled,
    'switch-focused': isFocused.value,
    'switch-error': props.error,
  },
])

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}

const handleFocus = () => {
  isFocused.value = true
}

const handleBlur = () => {
  isFocused.value = false
}
</script>

<template>
  <div class="switch-wrapper">
    <div
      class="switch-container"
      :class="`switch-container-label-${labelPosition}`"
    >
      <input
        :id="switchId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="switch-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <label
        v-if="label && labelPosition === 'left'"
        :for="switchId"
        class="switch-label-container"
      >
        <span class="switch-label">{{ label }}</span>
        <span v-if="description" class="switch-description">
          {{ description }}
        </span>
      </label>

      <div :class="switchClasses">
        <div class="switch-handle"/>
      </div>

      <label
        v-if="label && labelPosition === 'right'"
        :for="switchId"
        class="switch-label-container"
      >
        <span class="switch-label">{{ label }}</span>
        <span v-if="description" class="switch-description">
          {{ description }}
        </span>
      </label>
    </div>

    <p v-if="error" class="switch-error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss" src="./SwitchComponent.scss"></style>
