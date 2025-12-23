<script setup lang="ts">
import {computed, ref} from 'vue'
import {CheckboxProps} from "@shared/types/form.types.ts";
import CheckIcon from "@shared/ui/icons/CheckIcon.vue";

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  required: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const checkboxId = ref(`checkbox-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)

const checkboxClasses = computed(() => [
  'checkbox',
  `checkbox-${props.size}`,
  {
    'checkbox-checked': props.modelValue,
    'checkbox-error': props.error,
    'checkbox-disabled': props.disabled,
    'checkbox-focused': isFocused.value,
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
  <div class="checkbox-wrapper">
    <div class="checkbox-container">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="checkbox-input"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div :class="checkboxClasses">
        <CheckIcon :label="$t('icons.check')" :modelValue="modelValue"/>
      </div>

      <label :for="checkboxId" class="checkbox-label-container">
        <span v-if="label" class="checkbox-label">
          {{ label }}
          <span v-if="required" class="required">*</span>
        </span>
        <span v-if="description" class="checkbox-description">
          {{ description }}
        </span>
      </label>
    </div>

    <p v-if="error" class="checkbox-error">{{ error }}</p>
  </div>
</template>

<style scoped lang="scss" src="./CheckboxComponent.scss"></style>
