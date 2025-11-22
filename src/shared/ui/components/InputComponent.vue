<script setup lang="ts">
import {computed, ref} from 'vue'

interface Props {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  label?: string
  placeholder?: string
  error?: string
  hint?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const inputClasses = computed(() => [
  'input',
  {
    'input-error-state': props.error,
    'input-focused': isFocused.value,
    'input-disabled': props.disabled,
  },
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
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
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-container">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <p v-if="error" class="input-error">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>


<style scoped lang="scss">
@import '@/shared/styles/variables.scss';

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.input-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $text-primary;

  .required {
    color: $error;
  }
}

.input-container {
  position: relative;
}

.input {
  width: 100%;
  padding: $spacing-md;
  font-family: $font-family-base;
  font-size: $font-size-base;
  color: $text-primary;
  background-color: $bg-primary;
  border: 2px solid $border-color;
  border-radius: $radius-lg;
  transition: all $transition-base;

  &::placeholder {
    color: $text-muted;
  }

  &:hover:not(:disabled) {
    border-color: darken($border-color, 10%);
  }

  &:focus {
    outline: none;
    border-color: $primary;
    box-shadow: 0 0 0 3px rgba($primary, 0.1);
  }

  &-error-state {
    border-color: $error;

    &:focus {
      border-color: $error;
      box-shadow: 0 0 0 3px rgba($error, 0.1);
    }
  }

  &-disabled {
    background-color: $bg-tertiary;
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.input-error {
  font-size: $font-size-sm;
  color: $error;
  margin: 0;
}

.input-hint {
  font-size: $font-size-sm;
  color: $text-muted;
  margin: 0;
}
</style>
