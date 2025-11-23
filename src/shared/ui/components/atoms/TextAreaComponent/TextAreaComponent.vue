<script setup lang="ts">
import {computed, ref} from 'vue'
import {TextAreaProps} from "@shared/types/form.types.ts";

const props = withDefaults(defineProps<TextAreaProps>(), {
  disabled: false,
  readonly: false,
  required: false,
  rows: 4,
  showCounter: false,
  resize: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const textareaId = ref(`textarea-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const textareaClasses = computed(() => [
  'textarea',
  `textarea-resize-${props.resize}`,
  {
    'textarea-error-state': props.error,
    'textarea-focused': isFocused.value,
    'textarea-disabled': props.disabled,
  },
])

const characterCount = computed(() => {
  return props.modelValue?.length || 0
})

const showCharacterCount = computed(() => {
  return props.showCounter || props.maxLength
})

const counterClasses = computed(() => ({
  'counter-warning': props.maxLength && characterCount.value > props.maxLength * 0.9,
  'counter-error': props.maxLength && characterCount.value > props.maxLength,
}))

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
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
  <div class="textarea-wrapper">
    <label v-if="label" :for="textareaId" class="textarea-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="textarea-container">
      <textarea
        :id="textareaId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :maxlength="maxLength"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div v-if="showCharacterCount" class="textarea-footer">
        <span class="character-counter" :class="counterClasses">
          {{ characterCount }}{{ maxLength ? ` / ${maxLength}` : '' }}
        </span>
      </div>
    </div>

    <p v-if="error" class="textarea-error">{{ error }}</p>
    <p v-else-if="hint" class="textarea-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./TextAreaComponent.scss"></style>
