<script setup lang="ts">
import {computed} from 'vue'
import MinusIcon from "@shared/ui/icons/MinusIcon.vue";
import CheckIcon from "@shared/ui/icons/CheckIcon.vue";

interface CheckProps {
  modelValue?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  label?: string
  error?: boolean
}

const props = withDefaults(defineProps<CheckProps>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  size: 'md',
  error: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const handleChange = (event: Event) => {
  if (props.disabled) return

  const target = event.target as HTMLInputElement
  const newValue = target.checked

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const classes = computed(() => [
  'check',
  `check--${props.size}`,
  {
    'check--checked': props.modelValue,
    'check--indeterminate': props.indeterminate,
    'check--disabled': props.disabled,
    'check--error': props.error
  }
])
</script>

<template>
  <label :class="classes">
    <input
      type="checkbox"
      class="check__input"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      @change="handleChange"
    />

    <span class="check__box">
      <MinusIcon :label="$t('icons.minus')" v-if="indeterminate" class="check__icon"/>
      <CheckIcon :label="$t('icons.check')" v-else-if="modelValue" class="check__icon"/>
    </span>

    <span v-if="label" class="check__label">
      {{ label }}
    </span>
  </label>
</template>

<style scoped lang="scss" src="./CheckComponent.scss"></style>
