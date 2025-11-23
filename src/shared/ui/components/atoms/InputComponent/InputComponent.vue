<script setup lang="ts">
import {computed, ref, useSlots} from 'vue'
import PasswordIcon from "@shared/ui/icons/PasswordIcon.vue";
import ClearButtonIcon from "@shared/ui/icons/ClearButtonIcon.vue";
import {InputProps} from "@shared/types/form.types.ts"; // Asumo que InputProps define las propiedades

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  showPasswordToggle: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  clear: []
  'prefix-click': []
  'suffix-click': []
}>()

const slots = useSlots() // Asegurarse de importar useSlots para verificar si la ranura 'icon' está presente
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)
const isPasswordVisible = ref(false)

const hasIconSlot = computed(() => !!slots.icon); // Renombrado a 'icon'
const hasPrefixOrIcon = computed(() => props.prefix || hasIconSlot.value); // Usa la ranura 'icon' como prefijo

const inputType = computed(() => {
  if (props.type === 'password' && props.showPasswordToggle) {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const inputClasses = computed(() => [
  'input',
  {
    'input-error-state': props.error,
    'input-focused': isFocused.value,
    'input-disabled': props.disabled,
    // Se corrige 'prefixIcon' por el chequeo de la ranura 'icon'
    'input-with-prefix': hasPrefixOrIcon.value,
    // Se corrige 'suffixIcon' por el chequeo de la ranura 'suffix' o acciones internas
    'input-with-suffix': props.suffix || props.clearable || (props.type === 'password' && props.showPasswordToggle),
  },
])

const showClearButton = computed(() => {
  return props.clearable && props.modelValue && !props.disabled && !props.readonly
})

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

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-container">
      <div
        v-if="hasPrefixOrIcon"
        class="input-addon input-prefix"
        @click="emit('prefix-click')"
      >
        <slot name="icon">
          <span v-if="prefix" class="input-addon-text">{{ prefix }}</span>
        </slot>
      </div>

      <input
        :id="inputId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxLength"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div
        v-if="props.suffix || showClearButton || (type === 'password' && showPasswordToggle)"
        class="input-addon input-suffix"
      >
        <button
          v-if="showClearButton"
          type="button"
          class="input-action-button"
          @click="handleClear"
        >
          <ClearButtonIcon :label="$t('icon.clearButton')"/>
        </button>

        <button
          v-else-if="type === 'password' && showPasswordToggle"
          type="button"
          class="input-action-button"
          @click="togglePasswordVisibility"
        >
          <PasswordIcon :label="$t('icon.password')" :isPasswordVisible="isPasswordVisible"/>
        </button>

        <slot v-else name="suffix">
          <span v-if="suffix" class="input-addon-text" @click="emit('suffix-click')">
            {{ suffix }}
          </span>
        </slot>
      </div>
    </div>

    <p v-if="error" class="input-error">{{ error }}</p>
    <p v-else-if="hint" class="input-hint">{{ hint }}</p>
  </div>
</template>

<style scoped lang="scss" src="./InputComponent.scss"></style>
