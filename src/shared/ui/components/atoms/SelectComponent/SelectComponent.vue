<script setup lang="ts">
import {computed, ref} from 'vue'
import {SelectProps} from "@shared/types/form.types.ts";
import ChevronDownIcon from "@shared/ui/icons/ChevronDownIcon.vue";

const props = withDefaults(defineProps<SelectProps>(), {
  disabled: false,
  required: false,
  placeholder: 'Selecciona una opción',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  change: [value: string | number | null]
}>()

const selectId = ref(`select-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const selectClasses = computed(() => [
  'select',
  {
    'select-error-state': props.error,
    'select-focused': isFocused.value,
    'select-disabled': props.disabled,
  },
])

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value === '' ? null : target.value
  emit('update:modelValue', value)
  emit('change', value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}
</script>

<template>
  <div class="select-wrapper">
    <label v-if="label" :for="selectId" class="select-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="select-container">
      <select
        :id="selectId"
        :value="modelValue"
        :disabled="disabled"
        :class="selectClasses"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option value="">{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="select-icon">
        <ChevronDownIcon :label="$t('icon.chevronDown')"/>
      </div>
    </div>

    <p v-if="error" class="select-error">{{ error }}</p>
    <p v-else-if="hint" class="select-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./SelectComponent.scss"></style>
